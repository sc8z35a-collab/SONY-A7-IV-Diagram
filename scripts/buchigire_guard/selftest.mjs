/**
 * Buchigire Guard v1 (bg) — 20-Case Adversarial Chaos Self-Test Oracle Suite (BG-35)
 * Runs completely isolated inside /tmp/bg_selftest_<pid>/ with real bare remotes,
 * real `rm -rf` VM destruction simulations, real hook rejections, and SHA-256 verification.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {
  EXIT_BLOCKED,
  EXIT_OK,
  EXIT_WARN,
  exportOfflineBundle,
  getRepoContext,
  runGitOrThrow,
  sha256File,
} from './git_plumbing.mjs';
import {
  createSnapshot,
  runBoot,
  runGc,
  runRecover,
  runStart,
} from './vault_engine.mjs';
import {
  manageHooks,
  runAndRecordCheck,
  runGate,
  runGuardExec,
  runHookCheck,
  runSyncCheck,
} from './gate_and_land.mjs';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function initGitUser(cwd) {
  runGitOrThrow(['config', 'user.name', 'BG Test'], { cwd });
  runGitOrThrow(['config', 'user.email', 'bg-test@local'], { cwd });
}

function createTestRepoPair(baseDir, label) {
  const bare = path.join(baseDir, `${label}_remote.git`);
  const work = path.join(baseDir, `${label}_work`);
  fs.mkdirSync(bare, { recursive: true });
  runGitOrThrow(['init', '--bare', '--initial-branch=main'], { cwd: bare });
  runGitOrThrow(['clone', bare, work], { cwd: baseDir });
  initGitUser(work);
  fs.writeFileSync(path.join(work, 'README.md'), '# Test Repo\nInitial baseline line.\n');
  fs.mkdirSync(path.join(work, 'src'), { recursive: true });
  fs.writeFileSync(path.join(work, 'src', 'app.ts'), 'export const version = 1;\n'.repeat(80));
  fs.writeFileSync(
    path.join(work, '.bgrc.json'),
    JSON.stringify(
      {
        schema: 'bg-config/v1',
        defaultBranch: 'main',
        remote: 'origin',
        maxFileMb: 1,
        policies: {
          worker: { protectedPaths: ['src/protected.ts'], checks: ['node -e "process.exit(0)"'] },
          integrator: { protectedPaths: [], checks: ['node -e "process.exit(0)"'] },
        },
      },
      null,
      2
    )
  );
  fs.writeFileSync(path.join(work, 'src', 'protected.ts'), 'export const locked = true;\n');
  runGitOrThrow(['add', '.'], { cwd: work });
  runGitOrThrow(['commit', '-m', 'chore: initial commit'], { cwd: work });
  runGitOrThrow(['push', '-u', 'origin', 'main'], { cwd: work });
  return { bare, work };
}

export function runSelfTest() {
  const rootTmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bg_selftest_'));
  const tStart = performance.now();
  const cases = [];

  const test = (id, name, fn) => {
    const t0 = performance.now();
    try {
      fn();
      cases.push({ id, name, ok: true, ms: Number((performance.now() - t0).toFixed(1)) });
    } catch (err) {
      cases.push({ id, name, ok: false, ms: Number((performance.now() - t0).toFixed(1)), error: err.message });
    }
  };

  try {
    const { bare, work } = createTestRepoPair(rootTmp, 'main_chaos');
    const artDir = path.join(rootTmp, 'artifacts_src');
    fs.mkdirSync(artDir, { recursive: true });
    fs.writeFileSync(path.join(artDir, 'plan.md'), '# Recovery Plan\n100% survived VM wipe.\n');

    let firstSnapOid = null;
    let secondSnapOid = null;
    let expectedTrackedSha = null;
    let expectedUntrackedSha = null;

    // T01: Shadow snapshot captures modified + untracked without mutating HEAD or staging index
    test('T01', 'Non-intrusive shadow snapshot (tracked + untracked, 0 HEAD/index mutation)', () => {
      runGitOrThrow(['checkout', '-b', 'feat/alpha'], { cwd: work });
      const headBefore = runGitOrThrow(['rev-parse', 'HEAD'], { cwd: work }).trim();
      fs.appendFileSync(path.join(work, 'src', 'app.ts'), 'export const feature = "alpha";\n');
      fs.mkdirSync(path.join(work, 'src', 'nested'), { recursive: true });
      fs.writeFileSync(path.join(work, 'src', 'nested', 'new_module.ts'), 'export const fresh = 42;\n');
      expectedTrackedSha = sha256File(path.join(work, 'src', 'app.ts'));
      expectedUntrackedSha = sha256File(path.join(work, 'src', 'nested', 'new_module.ts'));

      const ctx = getRepoContext(work);
      const res = createSnapshot(ctx, {
        reason: 'milestone_1',
        goal: 'Build alpha module',
        nextStep: 'Run integration tests',
        artifactsDir: artDir,
      });
      assert(res.exitCode === EXIT_OK, `expected EXIT_OK, got ${res.exitCode}`);
      assert(res.remoteVerified === true, `expected remoteVerified=true, error=${res.pushError}`);
      assert(res.tier === 'tier1_custom_ref', `expected tier1_custom_ref, got ${res.tier}`);
      const headAfter = runGitOrThrow(['rev-parse', 'HEAD'], { cwd: work }).trim();
      const stagedAfter = runGitOrThrow(['diff', '--cached', '--name-only'], { cwd: work }).trim();
      assert(headBefore === headAfter, 'HEAD mutated!');
      assert(stagedAfter === '', 'Staging index mutated!');
      firstSnapOid = res.commitOid;
    });

    // T02: Remote ls-remote OID read-back verification
    test('T02', 'Remote ls-remote read-back SHA match (BG-05)', () => {
      const ls = runGitOrThrow(['ls-remote', bare, 'refs/bg-vault/feat-alpha'], { cwd: rootTmp }).trim();
      assert(ls.startsWith(firstSnapOid), `ls-remote OID mismatch: ${ls} vs ${firstSnapOid}`);
    });

    // T03: No-Op deduplication (< 40ms skip when unchanged)
    test('T03', 'No-Op deduplication skips redundant remote push (BG-28)', () => {
      const ctx = getRepoContext(work);
      const res = createSnapshot(ctx, { reason: 'dup_check', artifactsDir: artDir });
      assert(res.skipped === true && res.verdict === 'NO_CHANGE', `expected NO_CHANGE skip, got ${res.verdict}`);
      assert(res.commitOid === firstSnapOid, 'OID changed on no-op!');
    });

    // T04: Chained multi-generation snapshot (BG-13)
    test('T04', 'Multi-generation parent-chained vault history (BG-13)', () => {
      fs.writeFileSync(path.join(work, 'src', 'nested', 'new_module.ts'), 'export const fresh = 99;\n');
      const ctx = getRepoContext(work);
      const res = createSnapshot(ctx, {
        reason: 'milestone_2',
        nextStep: 'Final polish',
        artifactsDir: artDir,
      });
      assert(res.remoteVerified === true, 'second snap failed remote push');
      assert(res.parentOid === firstSnapOid, `expected parent ${firstSnapOid}, got ${res.parentOid}`);
      secondSnapOid = res.commitOid;
    });

    // T05: REAL VM WIPE (`rm -rf`) -> fresh clone -> `bg boot` detects orphaned remote vault (exit 3)
    const freshVm = path.join(rootTmp, 'fresh_vm_after_wipe');
    test('T05', 'Real VM wipe (rm -rf) -> fresh clone -> bg boot detects orphan vault (exit 3)', () => {
      fs.rmSync(work, { recursive: true, force: true });
      assert(!fs.existsSync(work), 'old VM still exists');
      runGitOrThrow(['clone', bare, freshVm], { cwd: rootTmp });
      initGitUser(freshVm);
      const ctx = getRepoContext(freshVm);
      const boot = runBoot(ctx);
      assert(boot.exitCode === EXIT_WARN, `expected EXIT_WARN(3), got ${boot.exitCode}`);
      assert(boot.verdict === 'RECOVERY_AVAILABLE', `expected RECOVERY_AVAILABLE, got ${boot.verdict}`);
      assert(boot.orphanedVaults.length >= 1 && boot.orphanedVaults[0].slug === 'feat-alpha', 'orphan not detected');
    });

    // T06: Exact disaster recovery (`--mode=worktree` + `--rev=1` time-machine + SHA-256 verification)
    const recoveredArts = path.join(rootTmp, 'recovered_arts');
    test('T06', 'Disaster recovery (--rev=1 time-machine + 100% SHA-256 manifest match)', () => {
      const ctx = getRepoContext(freshVm);
      const rec = runRecover(ctx, {
        slug: 'feat-alpha',
        mode: 'worktree',
        rev: 1,
        withArtifacts: true,
        artifactsDir: recoveredArts,
      });
      assert(rec.exitCode === EXIT_OK && rec.verdict === 'RECOVERED_VERIFIED', `recover failed: ${JSON.stringify(rec)}`);
      assert(sha256File(path.join(freshVm, 'src', 'app.ts')) === expectedTrackedSha, 'tracked SHA mismatch');
      assert(sha256File(path.join(freshVm, 'src', 'nested', 'new_module.ts')) === expectedUntrackedSha, 'untracked SHA mismatch');
    });

    // T07: Flight Recorder + Artifact MD round-trip survival across VM wipe
    test('T07', 'Flight Recorder & Artifact MD survive total VM wipe (BG-11, BG-12)', () => {
      const ctx = getRepoContext(freshVm);
      const rec = runRecover(ctx, { slug: 'feat-alpha', mode: 'inspect' });
      assert(rec.flight?.goal === 'Build alpha module', `lost goal: ${JSON.stringify(rec.flight)}`);
      assert(rec.flight?.nextStep === 'Final polish', `lost nextStep: ${rec.flight?.nextStep}`);
      const restoredPlan = path.join(recoveredArts, 'plan.md');
      assert(fs.existsSync(restoredPlan), 'plan.md artifact not restored');
      assert(fs.readFileSync(restoredPlan, 'utf8').includes('100% survived VM wipe'), 'artifact content mismatch');
    });

    // T08: 3-way disaster recovery over an ADVANCED upstream origin/main (parallel PR #51 scenario!)
    test('T08', '3-way recovery cleanly merges dead-VM vault onto advanced origin/main (BG-09)', () => {
      // Simulate another worker merging PR #51 to origin/main while VM was dead
      const peer = path.join(rootTmp, 'peer_pr51');
      runGitOrThrow(['clone', bare, peer], { cwd: rootTmp });
      initGitUser(peer);
      fs.writeFileSync(path.join(peer, 'src', 'pr51_mirai.ts'), 'export const mirai = 2028;\n');
      runGitOrThrow(['add', '.'], { cwd: peer });
      runGitOrThrow(['commit', '-m', 'feat: concurrent PR #51'], { cwd: peer });
      runGitOrThrow(['push', 'origin', 'main'], { cwd: peer });

      // Fresh VM #2 clones latest origin/main (has pr51_mirai.ts, missing feat-alpha)
      const freshVm2 = path.join(rootTmp, 'fresh_vm2_3way');
      runGitOrThrow(['clone', bare, freshVm2], { cwd: rootTmp });
      initGitUser(freshVm2);
      const ctx2 = getRepoContext(freshVm2);
      const rec3 = runRecover(ctx2, { slug: 'feat-alpha', mode: 'three-way' });
      assert(rec3.exitCode === EXIT_OK && rec3.verdict === 'RECOVERED_VERIFIED', `3-way failed: ${JSON.stringify(rec3)}`);
      // BOTH upstream PR #51 file AND recovered dead-VM files exist!
      assert(fs.existsSync(path.join(freshVm2, 'src', 'pr51_mirai.ts')), 'upstream PR #51 file lost!');
      assert(fs.existsSync(path.join(freshVm2, 'src', 'nested', 'new_module.ts')), 'dead-VM untracked file lost!');
      assert(fs.readFileSync(path.join(freshVm2, 'src', 'nested', 'new_module.ts'), 'utf8').includes('99'), 'latest vault rev not applied');
    });

    // T09: Tier 1 custom ref rejection triggers automatic Tier 2 fallback (refs/heads/bg-vault/*)
    test('T09', 'Tier 1 ref rejection auto-falls back to Tier 2 refs/heads/bg-vault/* (BG-02)', () => {
      const { bare: bare2, work: work2 } = createTestRepoPair(rootTmp, 'fallback_test');
      // Install pre-receive hook rejecting refs/bg-vault/*
      const hookPath = path.join(bare2, 'hooks', 'pre-receive');
      fs.writeFileSync(
        hookPath,
        '#!/usr/bin/env bash\nwhile read old new ref; do\n  case "$ref" in refs/bg-vault/*) echo "custom ref blocked" >&2; exit 1;; esac\ndone\n'
      );
      fs.chmodSync(hookPath, 0o755);

      runGitOrThrow(['checkout', '-b', 'feat/fb'], { cwd: work2 });
      fs.writeFileSync(path.join(work2, 'src', 'fb.ts'), 'export const fb = true;\n');
      const ctx = getRepoContext(work2);
      const res = createSnapshot(ctx, { reason: 'fallback_drill' });
      assert(res.remoteVerified === true, `fallback failed: ${res.pushError}`);
      assert(res.tier === 'tier2_fallback_branch', `expected tier2_fallback_branch, got ${res.tier}`);
      assert(res.remoteRef === 'refs/heads/bg-vault/feat-fb', `unexpected ref ${res.remoteRef}`);
    });

    // T10: Secret leak hard abort (zero bytes pushed!)
    test('T10', 'Zero-leak secret scanner hard-aborts push on GitHub PAT / PEM key (BG-18)', () => {
      const { work: wSec } = createTestRepoPair(rootTmp, 'secret_test');
      runGitOrThrow(['checkout', '-b', 'feat/sec'], { cwd: wSec });
      const fakePat = 'gh' + 'p_' + 'AbCdEfGhIjKlMnOpQrStUvWxYz123456';
      fs.writeFileSync(path.join(wSec, 'src', 'leak.ts'), `export const k = "${fakePat}";\n`);
      const ctx = getRepoContext(wSec);
      const snap = createSnapshot(ctx, { reason: 'should_block' });
      assert(snap.exitCode === EXIT_BLOCKED && snap.verdict === 'BLOCKED_SECRET_LEAK', `secret not blocked: ${snap.verdict}`);
      const gate = runGate(ctx, { skipSync: true });
      assert(gate.exitCode === EXIT_BLOCKED, 'gate failed to block secret');
      assert(gate.checks.some((c) => c.id === '3_ZERO_SECRETS' && c.status === 'FAIL'), '3_ZERO_SECRETS not FAIL');
    });

    // T11: Conflict markers block gate
    test('T11', 'Unresolved Git conflict markers block bg gate (BG-14)', () => {
      const { work: wConf } = createTestRepoPair(rootTmp, 'conflict_marker');
      runGitOrThrow(['checkout', '-b', 'feat/cm'], { cwd: wConf });
      fs.writeFileSync(path.join(wConf, 'src', 'bad.ts'), '<<<<<<< HEAD\nconst a = 1;\n=======\nconst a = 2;\n>>>>>>> main\n');
      const ctx = getRepoContext(wConf);
      createSnapshot(ctx, { reason: 'cm_snap' });
      const gate = runGate(ctx, { skipSync: true });
      assert(gate.exitCode === EXIT_BLOCKED, 'gate did not block conflict marker');
      assert(gate.checks.some((c) => c.id === '4_CONFLICT_MARKERS' && c.status === 'FAIL'), '4_CONFLICT_MARKERS not FAIL');
    });

    // T12: Root clutter & oversized binary guard
    test('T12', 'Root clutter (*.png) & oversized binary (> maxFileMb) caught by gate (BG-29)', () => {
      const { work: wBloat } = createTestRepoPair(rootTmp, 'bloat_test');
      runGitOrThrow(['checkout', '-b', 'feat/bloat'], { cwd: wBloat });
      fs.writeFileSync(path.join(wBloat, 'debug_shot.png'), Buffer.alloc(128, 0x89));
      fs.writeFileSync(path.join(wBloat, 'huge.bin'), Buffer.alloc(1.2 * 1024 * 1024, 0x41));
      const ctx = getRepoContext(wBloat);
      const gate = runGate(ctx, { skipSync: true });
      assert(gate.exitCode === EXIT_BLOCKED, 'gate did not block bloat/clutter');
      assert(gate.checks.some((c) => c.id === '5_HYGIENE_AND_BLOAT' && c.status === 'FAIL'), '5_HYGIENE_AND_BLOAT not FAIL');
    });

    // T13: Catastrophic shrinkage warning (> 50% deleted)
    test('T13', 'Catastrophic file shrinkage (>50% deleted) detected (BG-17)', () => {
      const { work: wShr } = createTestRepoPair(rootTmp, 'shrink_test');
      runGitOrThrow(['checkout', '-b', 'feat/shrink'], { cwd: wShr });
      fs.writeFileSync(path.join(wShr, 'src', 'app.ts'), 'export const version = 2;\n'); // shrunk > 95%
      const ctx = getRepoContext(wShr);
      createSnapshot(ctx, { reason: 'shrink_snap' });
      const gate = runGate(ctx, { skipSync: true });
      assert(gate.checks.some((c) => c.id === '6_SCOPE_AND_DIFF' && c.status === 'WARN'), 'shrinkage WARN missing');
    });

    // T14: Tree-SHA-bound command receipt auto-invalidates on 1-byte edit (STALE_RECEIPT)
    test('T14', 'Tree-SHA command receipt auto-invalidates on 1-byte edit (BG-16)', () => {
      const { work: wRec } = createTestRepoPair(rootTmp, 'receipt_test');
      runGitOrThrow(['checkout', '-b', 'feat/rcpt'], { cwd: wRec });
      const ctx = getRepoContext(wRec);
      createSnapshot(ctx, { reason: 'pre_check' });
      const r = runAndRecordCheck(ctx, 'node__e__process_exit_0_', 'node -e "process.exit(0)"');
      assert(r.passed === true, 'check failed');
      const gateFresh = runGate(ctx, { policy: 'integrator', requireChecks: true, skipSync: true });
      assert(gateFresh.exitCode === EXIT_OK && gateFresh.receipt?.startsWith('BG-RECEIPT:'), `expected fresh PASS, got ${gateFresh.verdict}`);

      // Edit 1 single byte -> receipt MUST become stale!
      fs.appendFileSync(path.join(wRec, 'src', 'app.ts'), ' ');
      createSnapshot(ctx, { reason: 'post_1byte_edit' });
      const gateStale = runGate(ctx, { policy: 'integrator', requireChecks: true, skipSync: true });
      assert(gateStale.exitCode === EXIT_BLOCKED, 'stale receipt was not blocked!');
      assert(gateStale.checks.some((c) => c.id === '8_VERIFICATION_RECEIPTS' && c.status === 'FAIL'), '8_VERIFICATION_RECEIPTS not FAIL');
    });

    // T15: Unpushed work blocks `gate`, then `seal` flips `gate` to PASS & emits tamper-evident BG-RECEIPT
    test('T15', 'Unpushed work blocks gate (exit 2) -> seal -> PASS + BG-RECEIPT (BG-06, BG-14)', () => {
      const { work: wGate } = createTestRepoPair(rootTmp, 'gate_seal_test');
      runGitOrThrow(['checkout', '-b', 'feat/gate'], { cwd: wGate });
      fs.writeFileSync(path.join(wGate, 'src', 'clean.ts'), 'export const ok = 1;\n');
      const ctx = getRepoContext(wGate);
      const g1 = runGate(ctx, { policy: 'worker', skipSync: true });
      assert(g1.exitCode === EXIT_BLOCKED, 'unpushed work was NOT blocked by gate!');
      assert(g1.receipt === null, 'receipt emitted for unpushed work!');

      const sealed = createSnapshot(ctx, { reason: 'seal', requireRemote: true, nextStep: 'Ready for user' });
      assert(sealed.exitCode === EXIT_OK && sealed.remoteVerified === true, 'seal failed');

      const g2 = runGate(ctx, { policy: 'worker', skipSync: true });
      assert(g2.exitCode === EXIT_OK && g2.receipt?.startsWith('BG-RECEIPT:'), `gate after seal failed: ${JSON.stringify(g2)}`);
    });

    // T16: Worker vs Integrator policy scope enforcement
    test('T16', 'Worker policy blocks protected path; Integrator policy allows it (BG-15)', () => {
      const { work: wPol } = createTestRepoPair(rootTmp, 'policy_test');
      runGitOrThrow(['checkout', '-b', 'feat/pol'], { cwd: wPol });
      fs.appendFileSync(path.join(wPol, 'src', 'protected.ts'), '// edited\n');
      const ctx = getRepoContext(wPol);
      createSnapshot(ctx, { reason: 'pol_snap' });
      const gw = runGate(ctx, { policy: 'worker', skipSync: true });
      assert(gw.exitCode === EXIT_BLOCKED, 'worker policy allowed protected path!');
      const gi = runGate(ctx, { policy: 'integrator', skipSync: true });
      assert(gi.exitCode === EXIT_OK, `integrator policy blocked valid change: ${JSON.stringify(gi.checks)}`);
    });

    // T17: Zero-mutation virtual merge-tree predicts conflict BEFORE touching worktree (BG-24)
    test('T17', 'bg sync predicts merge conflict via merge-tree with 0 worktree mutation (BG-24)', () => {
      const { bare: bSync, work: wSync } = createTestRepoPair(rootTmp, 'sync_test');
      runGitOrThrow(['checkout', '-b', 'feat/conf'], { cwd: wSync });
      fs.writeFileSync(path.join(wSync, 'README.md'), '# Branch Version\nChanged line A.\n');
      runGitOrThrow(['add', 'README.md'], { cwd: wSync });
      runGitOrThrow(['commit', '-m', 'branch edit'], { cwd: wSync });

      const peer = path.join(rootTmp, 'sync_peer');
      runGitOrThrow(['clone', bSync, peer], { cwd: rootTmp });
      initGitUser(peer);
      fs.writeFileSync(path.join(peer, 'README.md'), '# Main Version\nChanged line B.\n');
      runGitOrThrow(['add', 'README.md'], { cwd: peer });
      runGitOrThrow(['commit', '-m', 'main edit'], { cwd: peer });
      runGitOrThrow(['push', 'origin', 'main'], { cwd: peer });

      const ctx = getRepoContext(wSync);
      const sync = runSyncCheck(ctx);
      assert(sync.exitCode === EXIT_BLOCKED && sync.cleanMerge === false, `expected conflict, got ${JSON.stringify(sync)}`);
      assert(sync.conflicts.includes('README.md'), `README.md not listed in conflicts: ${sync.conflicts}`);
      assert(fs.readFileSync(path.join(wSync, 'README.md'), 'utf8').includes('Branch Version'), 'worktree was mutated!');
    });

    // T18: guard-exec wraps destructive failure and recovers cleanly via 1-step rollback (BG-20)
    test('T18', 'guard-exec auto-vaults before destructive failure & restores cleanly (BG-20)', () => {
      const { work: wGe } = createTestRepoPair(rootTmp, 'guard_exec_test');
      runGitOrThrow(['checkout', '-b', 'feat/ge'], { cwd: wGe });
      const valuable = path.join(wGe, 'src', 'precious.ts');
      fs.writeFileSync(valuable, 'export const priceless = 1000;\n');
      const shaPre = sha256File(valuable);

      const ctx = getRepoContext(wGe);
      const ge = runGuardExec(ctx, ['node', '-e', 'require("fs").unlinkSync("src/precious.ts"); process.exit(7)']);
      assert(ge.exitCode === 7 && ge.safetyOid, `guard-exec unexpected result: ${JSON.stringify(ge)}`);
      assert(!fs.existsSync(valuable), 'destructive cmd did not delete file');

      const rec = runRecover(ctx, { oid: ge.safetyOid, mode: 'worktree' });
      assert(rec.exitCode === EXIT_OK && fs.existsSync(valuable), 'rollback failed!');
      assert(sha256File(valuable) === shaPre, 'restored file hash mismatch');
    });

    // T19: Managed Git hooks install/check/uninstall + bg start bootstrapper (BG-21, BG-23)
    test('T19', 'Managed Git hooks & safe bg start bootstrapper (BG-21, BG-23)', () => {
      const { work: wHk } = createTestRepoPair(rootTmp, 'hooks_test');
      const ctx = getRepoContext(wHk);
      const started = runStart(ctx, 'my-feature', { goal: 'Test start' });
      assert(started.exitCode === EXIT_OK && started.branch === 'feat/my-feature' && started.branchPushed, 'bg start failed');

      const ctx2 = getRepoContext(wHk);
      const inst = manageHooks(ctx2, 'install');
      assert(inst.hooks['pre-commit'] === 'INSTALLED' && inst.hooks['pre-push'] === 'INSTALLED', 'hooks not installed');

      // Stage a conflict marker and verify hook-check blocks it
      fs.writeFileSync(path.join(wHk, 'src', 'staged_bad.ts'), '<<<<<<< HEAD\nx\n=======\ny\n>>>>>>> main\n');
      runGitOrThrow(['add', 'src/staged_bad.ts'], { cwd: wHk });
      const hc = runHookCheck(ctx2);
      assert(hc.exitCode === EXIT_BLOCKED, 'hook-check failed to block staged conflict marker');
      const uninst = manageHooks(ctx2, 'uninstall');
      assert(uninst.hooks['pre-commit'] === 'REMOVED', 'hook uninstall failed');
    });

    // T20: Offline .bgbundle export + SHA-256 verification + Vault GC cleanup (BG-07, BG-30)
    test('T20', 'Offline .bgbundle SHA-256 export & automated remote Vault GC (BG-07, BG-30)', () => {
      const ctx = getRepoContext(freshVm);
      const bundleOut = path.join(rootTmp, 'offline_test.bgbundle');
      const exp = exportOfflineBundle(freshVm, 'refs/bg-remote/feat-alpha', bundleOut);
      assert(fs.existsSync(exp.bundlePath) && fs.existsSync(exp.shaPath) && exp.bytes > 0, 'bundle export failed');
      const verify = runGitOrThrow(['bundle', 'verify', exp.bundlePath], { cwd: freshVm });
      assert(
        verify.includes('records a complete history') || verify.includes('is okay'),
        `bundle verify failed: ${verify}`
      );

      const gc = runGc(ctx, { slug: 'feat-alpha', dryRun: false });
      assert(gc.prunedRemote.length === 1, `expected 1 pruned remote vault, got ${gc.prunedRemote.length}`);
      const lsAfter = runGitOrThrow(['ls-remote', bare, 'refs/bg-vault/feat-alpha'], { cwd: rootTmp }).trim();
      assert(lsAfter === '', `remote vault ref still exists after GC: ${lsAfter}`);
    });
  } finally {
    try {
      fs.rmSync(rootTmp, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }

  const passed = cases.filter((c) => c.ok).length;
  const total = cases.length;
  const elapsedMs = Number((performance.now() - tStart).toFixed(1));
  return {
    exitCode: passed === total ? EXIT_OK : EXIT_BLOCKED,
    verdict: passed === total ? 'PASS' : 'FAIL',
    passed,
    total,
    elapsedMs,
    cases,
  };
}
