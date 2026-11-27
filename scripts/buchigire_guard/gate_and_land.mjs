/**
 * Buchigire Guard v1 (bg) — Pre-Claim Completion Gatekeeper, Tree-SHA Receipts,
 * Destructive-Op Interlocks, Virtual Merge Simulator, Git Hooks Manager & Atomic Landing.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  EXIT_BLOCKED,
  EXIT_OK,
  EXIT_WARN,
  atomicWriteFileSync,
  buildWorkingManifest,
  getPorcelainStatus,
  isGhAvailable,
  listWorkingFiles,
  runGit,
  runGitOrThrow,
  runShell,
  sha256String,
  simulateVirtualMerge,
} from './git_plumbing.mjs';
import {
  evaluateScopePolicy,
  scanConflictMarkers,
  scanHygieneAndBloat,
  scanSecrets,
  scanShrinkage,
} from './safety_scanners.mjs';
import { computeStatus, createSnapshot, runGc } from './vault_engine.mjs';

const RECEIPTS_FILE = 'check_receipts.json';

function readReceipts(ctx) {
  const p = path.join(ctx.vaultDir, RECEIPTS_FILE);
  if (!fs.existsSync(p)) return {};
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return {};
  }
}

function writeReceipts(ctx, data) {
  atomicWriteFileSync(path.join(ctx.vaultDir, RECEIPTS_FILE), JSON.stringify(data, null, 2) + '\n');
}

/**
 * Compute deterministic current working-tree content SHA (BG-16).
 */
export function computeWorktreeFingerprint(ctx) {
  const { liveFiles, deletedFiles, skippedLarge } = listWorkingFiles(ctx.repoRoot, ctx.cfg);
  const manifest = buildWorkingManifest(ctx.repoRoot, liveFiles, deletedFiles, '');
  return { fingerprint: manifest.fingerprint, liveFiles, deletedFiles, skippedLarge };
}

/**
 * Run a verification command and bind its PASS receipt to the EXACT current tree fingerprint (BG-16).
 */
export function runAndRecordCheck(ctx, name, command) {
  const { fingerprint } = computeWorktreeFingerprint(ctx);
  const t0 = performance.now();
  const res = runShell(command, { cwd: ctx.repoRoot });
  const elapsedMs = Number((performance.now() - t0).toFixed(1));
  const passed = res.status === 0;

  // Recompute fingerprint after command (some commands like npm run catalog or npm run build legitimately update generated files)
  const postFp = computeWorktreeFingerprint(ctx).fingerprint;

  const receipts = readReceipts(ctx);
  receipts[name] = {
    name,
    command,
    passed,
    exitCode: res.status,
    preFingerprint: fingerprint,
    fingerprint: postFp,
    headSha: ctx.headSha,
    elapsedMs,
    recordedAt: new Date().toISOString(),
    tailOutput: (res.stdout + '\n' + res.stderr).trim().split('\n').slice(-12).join('\n'),
  };
  writeReceipts(ctx, receipts);

  return receipts[name];
}

/**
 * BG-24: Non-destructive in-memory virtual merge simulation against origin/<defaultBranch>.
 */
export function runSyncCheck(ctx, opts = {}) {
  const targetBranch = opts.target || ctx.defaultBranch;
  const targetRef = ctx.hasRemote ? `${ctx.remote}/${targetBranch}` : targetBranch;

  if (ctx.hasRemote && !opts.noFetch) {
    runGit(['fetch', '--prune', ctx.remote], { cwd: ctx.repoRoot });
  }

  let ahead = 0;
  let behind = 0;
  const ab = runGit(['rev-list', '--left-right', '--count', `HEAD...${targetRef}`], { cwd: ctx.repoRoot });
  if (ab.status === 0) {
    const [a, b] = ab.stdout.trim().split(/\s+/).map(Number);
    ahead = a || 0;
    behind = b || 0;
  }

  const mergeSim = simulateVirtualMerge(ctx.repoRoot, 'HEAD', targetRef);

  return {
    exitCode: !mergeSim.clean ? EXIT_BLOCKED : behind > 0 ? EXIT_WARN : EXIT_OK,
    verdict: !mergeSim.clean ? 'MERGE_CONFLICT_PREDICTED' : behind > 0 ? 'BEHIND_UPSTREAM_CLEAN' : 'IN_SYNC',
    branch: ctx.branch,
    targetRef,
    ahead,
    behind,
    cleanMerge: mergeSim.clean,
    conflicts: mergeSim.conflicts,
    messages: mergeSim.messages,
  };
}

/**
 * BG-14..BG-19: Mandatory 8-Invariant Pre-Claim Completion Gatekeeper.
 * Emits tamper-evident BG-RECEIPT only when ALL invariants pass!
 */
export function runGate(ctx, opts = {}) {
  const policyName = opts.policy || (ctx.cfg.policies?.worker ? 'worker' : 'default');
  const checks = [];
  const addCheck = (id, status, detail, extra = {}) => {
    checks.push({ id, status, detail, ...extra });
  };

  // Optional auto-run configured policy checks BEFORE evaluating receipts
  if (opts.runChecks) {
    const policy = (ctx.cfg.policies && ctx.cfg.policies[policyName]) || { checks: [] };
    for (const cmd of policy.checks || []) {
      const checkKey = cmd.replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 40);
      const r = runAndRecordCheck(ctx, checkKey, cmd);
      if (!r.passed) break;
    }
  }

  const st = computeStatus(ctx);
  const por = getPorcelainStatus(ctx.repoRoot);
  const { fingerprint, liveFiles, skippedLarge } = computeWorktreeFingerprint(ctx);

  // Collect all paths changed relative to origin/<defaultBranch> PLUS current dirty files
  const branchChanged = new Set(por.allDirty.map((d) => d.path));
  if (ctx.hasRemote && ctx.headSha) {
    const diffRes = runGit(['diff', '--name-only', `${ctx.remote}/${ctx.defaultBranch}...HEAD`], { cwd: ctx.repoRoot });
    if (diffRes.status === 0) {
      for (const p of diffRes.stdout.trim().split('\n').filter(Boolean)) branchChanged.add(p);
    }
  }
  const allChangedPaths = [...branchChanged].sort();

  // Invariant 1: OFF_VM_DURABLE (BG-01..BG-06)
  if (st.offVmDurable) {
    addCheck(
      '1_OFF_VM_DURABLE',
      'PASS',
      st.branchHeadPushed && por.isClean
        ? `Branch ${ctx.branch} clean & pushed to ${ctx.remote} (${ctx.headSha?.slice(0, 10)})`
        : `All changes verified on remote vault ${st.lastRemote?.remoteRef} (${st.lastRemote?.commitOid?.slice(0, 10)})`
    );
  } else {
    addCheck(
      '1_OFF_VM_DURABLE',
      'FAIL',
      `UNPUSHED WORK AT RISK: ${por.allDirty.length} dirty item(s), branchHeadPushed=${st.branchHeadPushed}, vaultMatchesCurrent=${st.vaultMatchesCurrent}. Run 'npm run bg -- seal' or push branch first!`
    );
  }

  // Invariant 2: BRANCH_SAFETY (BG-14, BG-22)
  const onDefaultDirty = ctx.branch === ctx.defaultBranch && !por.isClean && !opts.allowMain;
  if (ctx.isDetached) {
    addCheck('2_BRANCH_SAFETY', 'FAIL', 'HEAD is detached; switch to a feature branch.');
  } else if (onDefaultDirty) {
    addCheck('2_BRANCH_SAFETY', 'FAIL', `Dirty uncommitted changes directly on default branch '${ctx.defaultBranch}'.`);
  } else {
    addCheck('2_BRANCH_SAFETY', 'PASS', `Branch '${ctx.branch}' (${por.isClean ? 'clean' : `${por.allDirty.length} dirty vaulted`})`);
  }

  // Invariant 3: ZERO_SECRETS (BG-18)
  const secretFindings = scanSecrets(ctx.repoRoot, liveFiles);
  if (secretFindings.length > 0) {
    addCheck('3_ZERO_SECRETS', 'FAIL', `Detected ${secretFindings.length} secret(s) in working files!`, { findings: secretFindings });
  } else {
    addCheck('3_ZERO_SECRETS', 'PASS', `0 secrets detected across ${liveFiles.length} file(s)`);
  }

  // Invariant 4: ZERO_CONFLICT_MARKERS (BG-14)
  const conflictMarkers = scanConflictMarkers(ctx.repoRoot, allChangedPaths);
  if (conflictMarkers.length > 0) {
    addCheck('4_CONFLICT_MARKERS', 'FAIL', `Found ${conflictMarkers.length} unresolved conflict marker(s)`, { findings: conflictMarkers });
  } else {
    addCheck('4_CONFLICT_MARKERS', 'PASS', `0 conflict markers in ${allChangedPaths.length} changed file(s)`);
  }

  // Invariant 5: HYGIENE_AND_BLOAT (BG-14, BG-29)
  const hygiene = scanHygieneAndBloat(ctx.repoRoot, allChangedPaths, skippedLarge, ctx.cfg);
  const hygieneIssues = hygiene.rootClutter.length + hygiene.zeroByteFiles.length + hygiene.oversizedFiles.length;
  if (hygieneIssues > 0) {
    addCheck(
      '5_HYGIENE_AND_BLOAT',
      'FAIL',
      `clutter=${hygiene.rootClutter.length} zeroByte=${hygiene.zeroByteFiles.length} oversized=${hygiene.oversizedFiles.length}`,
      hygiene
    );
  } else {
    addCheck('5_HYGIENE_AND_BLOAT', 'PASS', `0 stray root files, 0 empty source files, 0 oversized (> ${ctx.cfg.maxFileMb} MB) files`);
  }

  // Invariant 6: SCOPE_POLICY & SHRINKAGE (BG-15, BG-17)
  const scope = evaluateScopePolicy(allChangedPaths, ctx.cfg, policyName);
  const shrinkage = scanShrinkage(ctx.repoRoot, [...new Set([...por.modified, ...por.staged])], ctx.headSha);
  if (scope.violations.length > 0) {
    addCheck(
      '6_SCOPE_AND_DIFF',
      'FAIL',
      `Policy '${policyName}' violation: ${scope.violations.length} protected path(s) modified (${scope.violations.map((v) => v.path).join(', ')})`,
      { violations: scope.violations }
    );
  } else if (shrinkage.length > 0 && !opts.allowShrinkage) {
    addCheck(
      '6_SCOPE_AND_DIFF',
      'WARN',
      `Potential catastrophic shrinkage in ${shrinkage.length} file(s) (${shrinkage.map((s) => s.path).join(', ')})`,
      { shrinkage }
    );
  } else {
    addCheck('6_SCOPE_AND_DIFF', 'PASS', `Policy '${policyName}' compliant (${allChangedPaths.length} path(s)), 0 shrinkage regressions`);
  }

  // Invariant 7: UPSTREAM_VIRTUAL_MERGE (BG-24)
  if (ctx.hasRemote && !opts.skipSync) {
    const sync = runSyncCheck(ctx, { noFetch: opts.noFetch });
    if (!sync.cleanMerge) {
      addCheck('7_UPSTREAM_MERGE', 'FAIL', `Predicted conflict against ${sync.targetRef}: ${sync.conflicts.join(', ')}`, {
        conflicts: sync.conflicts,
      });
    } else if (sync.behind > 0) {
      addCheck('7_UPSTREAM_MERGE', 'WARN', `Branch is ${sync.behind} commit(s) behind ${sync.targetRef}, but virtual merge is CLEAN`);
    } else {
      addCheck('7_UPSTREAM_MERGE', 'PASS', `Up-to-date & clean virtual merge with ${sync.targetRef}`);
    }
  } else {
    addCheck('7_UPSTREAM_MERGE', 'PASS', 'Skipped (no remote or --skip-sync)');
  }

  // Invariant 8: FRESH_TREE_BOUND_RECEIPTS (BG-16)
  const receipts = readReceipts(ctx);
  const policyChecks = scope.checks || [];
  const staleReceipts = [];
  const failedReceipts = [];
  const missingChecks = [];
  const validReceipts = [];

  const validCommands = new Set();
  for (const [k, r] of Object.entries(receipts)) {
    if (r.fingerprint !== fingerprint) {
      staleReceipts.push(k);
    } else if (!r.passed) {
      failedReceipts.push(k);
    } else {
      validReceipts.push(k);
      if (r.command) validCommands.add(r.command);
    }
  }
  if (opts.requireChecks) {
    for (const cmd of policyChecks) {
      const key = cmd.replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 40);
      if (!validReceipts.includes(key) && !validCommands.has(cmd)) missingChecks.push(cmd);
    }
  }

  if (failedReceipts.length > 0) {
    addCheck('8_VERIFICATION_RECEIPTS', 'FAIL', `Failed verification check(s): ${failedReceipts.join(', ')}`);
  } else if (opts.requireChecks && (missingChecks.length > 0 || staleReceipts.length > 0)) {
    addCheck(
      '8_VERIFICATION_RECEIPTS',
      'FAIL',
      `STALE_OR_MISSING receipts for current tree (${fingerprint.slice(0, 8)}): missing=[${missingChecks.join('; ')}] stale=[${staleReceipts.join(', ')}]. Re-run with --run-checks!`
    );
  } else if (staleReceipts.length > 0) {
    addCheck(
      '8_VERIFICATION_RECEIPTS',
      'WARN',
      `${staleReceipts.length} stale receipt(s) invalidated by recent edits (${staleReceipts.join(', ')})`
    );
  } else {
    addCheck(
      '8_VERIFICATION_RECEIPTS',
      'PASS',
      validReceipts.length > 0
        ? `${validReceipts.length} fresh tree-bound receipt(s) verified (${validReceipts.join(', ')})`
        : 'No stale or failed receipts (pass --run-checks to enforce build/test receipts)'
    );
  }

  const fails = checks.filter((c) => c.status === 'FAIL');
  const warns = checks.filter((c) => c.status === 'WARN');
  const passedAll = fails.length === 0;

  let receipt = null;
  if (passedAll) {
    const remoteRef = st.branchHeadPushed && por.isClean
      ? `${ctx.remote}/${ctx.branch}`
      : st.lastRemote?.remoteRef || 'local';
    const treeShort = fingerprint.slice(0, 8);
    const sig = sha256String(`${fingerprint}|${remoteRef}|${policyName}|${checks.length}|PASS`).slice(0, 8);
    receipt = `BG-RECEIPT:${treeShort}:${remoteRef}:${policyName}:${sig}`;
  }

  return {
    exitCode: passedAll ? EXIT_OK : EXIT_BLOCKED,
    verdict: passedAll ? 'PASS' : 'BLOCKED',
    policy: policyName,
    passedCount: checks.filter((c) => c.status === 'PASS').length,
    warnCount: warns.length,
    failCount: fails.length,
    totalChecks: checks.length,
    treeFingerprint: fingerprint,
    receipt,
    checks,
  };
}

/**
 * BG-20: Destructive-Operation Interlock Wrapper.
 * Captures an off-VM safety snapshot BEFORE running a risky command.
 */
export function runGuardExec(ctx, cmdArgs, opts = {}) {
  if (!cmdArgs || cmdArgs.length === 0) {
    return { exitCode: EXIT_BLOCKED, verdict: 'NO_COMMAND', message: 'Usage: bg guard-exec -- <command...>' };
  }

  const preSnap = createSnapshot(ctx, {
    reason: `pre_guard_exec:${cmdArgs[0]}`,
    note: cmdArgs.join(' ').slice(0, 120),
    force: true,
    localOnly: Boolean(opts.localOnly),
  });
  if (preSnap.exitCode === EXIT_BLOCKED) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'PRE_SNAP_BLOCKED',
      message: preSnap.message || 'Safety pre-snapshot blocked execution.',
      preSnap,
    };
  }

  const cmdString = cmdArgs.join(' ');
  const proc =
    cmdArgs.length === 1
      ? spawnSync(cmdArgs[0], { cwd: ctx.repoRoot, shell: true, stdio: 'inherit' })
      : spawnSync(cmdArgs[0], cmdArgs.slice(1), { cwd: ctx.repoRoot, shell: false, stdio: 'inherit' });
  const cmdExit = proc.status ?? 1;

  return {
    exitCode: cmdExit === 0 ? EXIT_OK : cmdExit,
    verdict: cmdExit === 0 ? 'COMMAND_OK' : 'COMMAND_FAILED_ROLLBACK_READY',
    command: cmdString,
    commandExitCode: cmdExit,
    safetyOid: preSnap.commitOid,
    safetyRemoteVerified: preSnap.remoteVerified,
    rollbackCommand: `npm run bg -- recover --mode=worktree --oid=${preSnap.commitOid}`,
  };
}

/**
 * BG-21 & BG-22: Managed Local Git Hooks Installer (chain-preserving).
 */
export function manageHooks(ctx, action = 'status') {
  const hooksDir = path.join(ctx.gitDir, 'hooks');
  fs.mkdirSync(hooksDir, { recursive: true });
  const markerStart = '# >>> BUCHIGIRE-GUARD-V1 START >>>';
  const markerEnd = '# <<< BUCHIGIRE-GUARD-V1 END <<<';

  const hookSpecs = {
    'pre-commit': `${markerStart}
# Buchigire Guard v1: Secret leak + conflict marker + bloat guard
node "${path.join(ctx.repoRoot, 'scripts/bg.mjs')}" hook-check --stage=pre-commit || exit 2
${markerEnd}`,
    'pre-push': `${markerStart}
# Buchigire Guard v1: Protected branch force-push shield
while read local_ref local_sha remote_ref remote_sha; do
  if [ "$remote_ref" = "refs/heads/${ctx.defaultBranch}" ] || [ "$remote_ref" = "refs/heads/master" ]; then
    if [ -n "$remote_sha" ] && [ "$remote_sha" != "0000000000000000000000000000000000000000" ]; then
      if ! git merge-base --is-ancestor "$remote_sha" "$local_sha" 2>/dev/null; then
        echo "[bg pre-push BLOCKED] Force-push / non-fast-forward push to protected branch $remote_ref is forbidden (BG-22)!" >&2
        exit 2
      fi
    fi
  fi
done
${markerEnd}`,
  };

  const results = {};
  for (const [name, snippet] of Object.entries(hookSpecs)) {
    const filePath = path.join(hooksDir, name);
    const exists = fs.existsSync(filePath);
    const cur = exists ? fs.readFileSync(filePath, 'utf8') : '';
    const installed = cur.includes(markerStart);

    if (action === 'status') {
      results[name] = installed ? 'INSTALLED' : 'NOT_INSTALLED';
    } else if (action === 'install') {
      let next = cur;
      if (installed) {
        next = cur.replace(new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, 'm'), snippet);
      } else if (exists) {
        next = `${cur.trimEnd()}\n\n${snippet}\n`;
      } else {
        next = `#!/usr/bin/env bash\nset -e\n\n${snippet}\n`;
      }
      atomicWriteFileSync(filePath, next);
      fs.chmodSync(filePath, 0o755);
      results[name] = 'INSTALLED';
    } else if (action === 'uninstall') {
      if (installed) {
        const cleaned = cur.replace(new RegExp(`\\n*${markerStart}[\\s\\S]*?${markerEnd}\\n*`, 'm'), '\n').trim();
        if (!cleaned || cleaned === '#!/usr/bin/env bash' || cleaned === '#!/usr/bin/env bash\nset -e') {
          fs.unlinkSync(filePath);
        } else {
          atomicWriteFileSync(filePath, cleaned + '\n');
          fs.chmodSync(filePath, 0o755);
        }
      }
      results[name] = 'REMOVED';
    }
  }

  return { exitCode: EXIT_OK, verdict: `HOOKS_${action.toUpperCase()}`, hooks: results };
}

/**
 * Lightweight pre-commit hook check invoked by managed pre-commit hook.
 */
export function runHookCheck(ctx) {
  const stagedOut = runGit(['diff', '--cached', '--name-only', '--diff-filter=ACMR'], { cwd: ctx.repoRoot });
  const stagedPaths = stagedOut.stdout.trim().split('\n').filter(Boolean);
  if (stagedPaths.length === 0) return { exitCode: EXIT_OK, verdict: 'PASS' };

  const secrets = scanSecrets(ctx.repoRoot, stagedPaths);
  const conflicts = scanConflictMarkers(ctx.repoRoot, stagedPaths);
  const maxBytes = Math.max(1, Number(ctx.cfg.maxFileMb || 25)) * 1024 * 1024;
  const oversized = [];
  for (const rel of stagedPaths) {
    try {
      const st = fs.lstatSync(path.join(ctx.repoRoot, rel));
      if (st.isFile() && st.size > maxBytes) oversized.push({ path: rel, bytes: st.size });
    } catch {
      // ignore
    }
  }

  if (secrets.length > 0 || conflicts.length > 0 || oversized.length > 0) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'HOOK_BLOCKED',
      secrets,
      conflicts,
      oversized,
    };
  }
  return { exitCode: EXIT_OK, verdict: 'HOOK_PASS', checked: stagedPaths.length };
}

/**
 * BG-25: Atomic PR Creation & Safe Merge Orchestrator (`bg land`).
 */
export function runLand(ctx, opts = {}) {
  const por = getPorcelainStatus(ctx.repoRoot);
  if (!por.isClean) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'DIRTY_WORKTREE',
      message: `Working tree has ${por.allDirty.length} uncommitted item(s). Commit changes cleanly before 'bg land'.`,
    };
  }
  if (ctx.isDetached || ctx.branch === ctx.defaultBranch) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'INVALID_BRANCH',
      message: `Cannot land from '${ctx.branch}'. Switch to a feature branch first.`,
    };
  }

  // 1. Push branch first and verify remote OID read-back (BG-05)
  const pushRes = runGit(['push', '-u', ctx.remote, ctx.branch], { cwd: ctx.repoRoot });
  if (pushRes.status !== 0) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'PUSH_FAILED',
      message: pushRes.stderr.trim() || pushRes.stdout.trim(),
    };
  }
  const lsRes = runGit(['ls-remote', ctx.remote, `refs/heads/${ctx.branch}`], { cwd: ctx.repoRoot });
  const remoteOid = (lsRes.stdout.trim().split('\t')[0] || '').trim();
  if (remoteOid !== ctx.headSha) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'READBACK_MISMATCH',
      message: `Remote branch HEAD (${remoteOid}) !== local HEAD (${ctx.headSha})`,
    };
  }

  // 2. Run full Pre-Claim Completion Gatekeeper
  const gate = runGate(ctx, {
    policy: opts.policy || 'integrator',
    runChecks: Boolean(opts.runChecks),
    requireChecks: Boolean(opts.requireChecks || opts.runChecks),
  });
  if (gate.exitCode !== EXIT_OK) {
    return {
      exitCode: EXIT_BLOCKED,
      verdict: 'GATE_BLOCKED',
      gate,
      message: 'Gatekeeper blocked landing. Fix failing invariants before creating/merging PR.',
    };
  }

  // 3. Create or locate PR via gh CLI
  if (!isGhAvailable(ctx.repoRoot)) {
    return {
      exitCode: EXIT_WARN,
      verdict: 'PUSHED_NO_GH',
      branch: ctx.branch,
      headSha: ctx.headSha,
      receipt: gate.receipt,
      message: 'Branch pushed & gate passed, but gh CLI is not authenticated.',
    };
  }

  let prUrl = null;
  let prNumber = null;
  const existing = spawnSync(
    'gh',
    ['pr', 'list', '--head', ctx.branch, '--state', 'open', '--json', 'number,url'],
    { cwd: ctx.repoRoot, encoding: 'utf8' }
  );
  if (existing.status === 0) {
    try {
      const list = JSON.parse(existing.stdout);
      if (Array.isArray(list) && list.length > 0) {
        prNumber = list[0].number;
        prUrl = list[0].url;
      }
    } catch {
      // ignore
    }
  }

  if (!prUrl) {
    const title = opts.title || runGitOrThrow(['log', '-1', '--pretty=%s'], { cwd: ctx.repoRoot }).trim();
    const bodyText =
      (opts.body || `Automated safe landing from branch \`${ctx.branch}\`.`) +
      `\n\n---\n**Buchigire Guard v1 Verification Receipt**: \`${gate.receipt}\`\n`;
    const created = spawnSync(
      'gh',
      ['pr', 'create', '--base', ctx.defaultBranch, '--head', ctx.branch, '--title', title, '--body', bodyText],
      { cwd: ctx.repoRoot, encoding: 'utf8' }
    );
    if (created.status !== 0) {
      return {
        exitCode: EXIT_BLOCKED,
        verdict: 'PR_CREATE_FAILED',
        message: created.stderr.trim() || created.stdout.trim(),
        receipt: gate.receipt,
      };
    }
    prUrl = created.stdout.trim().split('\n').pop();
    const m = prUrl.match(/\/pull\/(\d+)/);
    prNumber = m ? Number(m[1]) : null;
  }

  let merged = false;
  if (opts.mergePr && prUrl) {
    const mergeMethod = opts.mergeMethod || 'squash';
    const mergeArgs = ['pr', 'merge', String(prNumber || prUrl), `--${mergeMethod}`];
    if (!opts.keepBranch) mergeArgs.push('--delete-branch');
    const mRes = spawnSync('gh', mergeArgs, { cwd: ctx.repoRoot, encoding: 'utf8' });
    if (mRes.status !== 0) {
      return {
        exitCode: EXIT_BLOCKED,
        verdict: 'PR_MERGE_FAILED',
        prUrl,
        prNumber,
        receipt: gate.receipt,
        message: mRes.stderr.trim() || mRes.stdout.trim(),
      };
    }
    merged = true;
    // Prune obsolete vault ref for this merged branch
    runGc(ctx, { slug: ctx.slug, dryRun: false });
  }

  return {
    exitCode: EXIT_OK,
    verdict: merged ? 'LANDED_AND_MERGED' : 'PR_OPENED',
    branch: ctx.branch,
    headSha: ctx.headSha,
    prNumber,
    prUrl,
    merged,
    receipt: gate.receipt,
  };
}
