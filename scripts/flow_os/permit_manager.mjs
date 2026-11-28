/**
 * FLOW Security — Edit Permit Gate (`flow permit`) & Containment / Recovery Engine
 *
 * Pre-edit gatekeeper required before `bg` workspace mutations, `flow ship`, `flow finish`,
 * and local Git pre-commit/pre-push hooks.
 *
 * Honest Privilege Boundary Notice:
 *   - Inside a VM where the agent runs as the same OS user (or with sudo), local permit checks
 *     are Class-B enforcement (stopping accidental edits, prompt-injection derailments, and
 *     rogue worker scope leaks).
 *   - Hard Class-C tamper-proof enforcement against an adversarial agent is anchored outside the VM
 *     via `.github/workflows/flow-security.yml` + GitHub `main` Branch Protection + external Ed25519 key.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {
  EXIT_BLOCKED,
  EXIT_ERROR,
  EXIT_OK,
  EXIT_SECURITY_BLOCKED,
  atomicWriteSync,
  getGitMeta,
  loadFlowConfig,
  matchAnyGlob,
} from './kernel_config.mjs';
import { isAgentQuarantined, quarantineAgent } from './security_fortress.mjs';
import { releaseAllAgentLeases } from './lease_manager.mjs';
import { computeTreeFingerprint } from './receipt_chain.mjs';
import { formatFlowHeader, formatRecord } from './wire_protocol.mjs';

const PERMIT_SCHEMA = 'flow-permit/v1.1';
const MAX_TTL_SEC = 1800;

function permitsDir(stateDir) {
  return path.join(stateDir, 'permits');
}

export function getPermitPath(stateDir, agentId) {
  return path.join(permitsDir(stateDir), `${agentId}.permit.json`);
}

function revokedLogPath(stateDir) {
  return path.join(stateDir, 'revoked_permits.jsonl');
}

function permitDigest(p) {
  const canonical = [
    PERMIT_SCHEMA,
    p.permitId,
    p.agentId,
    p.role,
    p.unit || '*',
    p.bgBranch,
    p.baseTreeSha,
    (p.allowedGlobs || []).join(','),
    (p.forbiddenGlobs || []).join(','),
    p.issuedAt,
    p.expiresAt,
    p.nonce,
  ].join('|');
  return crypto.createHash('sha256').update(canonical).digest('hex');
}

function buildScopeGlobs(ctx, { role, unit }) {
  if (role === 'integrator') {
    return {
      allowedGlobs: ['**'],
      forbiddenGlobs: ['.git/hooks/**', '.env', '.env.*'],
    };
  }
  const forbiddenGlobs = [
    ...(ctx.cfg.policies?.worker?.protectedPaths || []),
    '.git/hooks/**',
    '.env',
    '.env.*',
  ];
  if (unit) {
    const unitHint = unit === 'mishoe' ? 'mishoe' : unit === 'sensor_fab' ? 'sensorFab' : unit === 'mirai_2028' ? 'mirai2028' : unit;
    const unitFile = unit === 'mishoe' ? 'src/units/mi_shoe.ts' : `src/units/${unit}.ts`;
    const dataFile = unit === 'mishoe' ? 'src/data/mi_shoe.json' : `src/data/${unit}.json`;
    const poseFile = `src/units/${unit}.pose.tsv`;
    return {
      allowedGlobs: [unitFile, dataFile, poseFile, `src/assemblies/${unitHint}/**`],
      forbiddenGlobs,
    };
  }
  return {
    allowedGlobs: ['src/**', 'scripts/exam/custom/ai_*.mjs', '.flow/macros/ai-*.macro.json'],
    forbiddenGlobs,
  };
}

/**
 * Issue a short-lived Edit Permit (~15-40 tokens output).
 * Default role is strictly least-privilege `worker`.
 * Elevating to `integrator` requires explicit `elevateIntegrator: true` + non-empty `reason`.
 */
export function issuePermit(ctx, {
  agentId,
  unit = null,
  role = 'worker',
  elevateIntegrator = false,
  reason = '',
  ttlSec = 1800,
  allowMain = false,
} = {}) {
  if (isAgentQuarantined(ctx.stateDir, agentId)) {
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      reason: 'AGENT_QUARANTINED',
      lines: [formatFlowHeader({ cmd: 'permit:issue', status: 'SEC_BLOCK', rule: 'AGENT_QUARANTINED', agent: agentId })],
    };
  }

  let effectiveRole = String(role || 'worker');
  if (effectiveRole === 'integrator') {
    if (!elevateIntegrator || String(reason).trim().length < 6) {
      return {
        ok: false,
        exitCode: EXIT_SECURITY_BLOCKED,
        reason: 'SELF_ELEVATION_BLOCKED',
        lines: [
          formatFlowHeader({
            cmd: 'permit:issue',
            status: 'SEC_BLOCK',
            rule: 'SELF_ELEVATION_BLOCKED',
            hint: 'default=worker; integrator requires --elevate-integrator --reason="<6+ chars>"',
          }),
        ],
      };
    }
  } else {
    effectiveRole = 'worker';
  }

  const git = getGitMeta(ctx.repoRoot);
  const defaultBranch = ctx.cfg.defaultBranch || 'main';
  if (!allowMain && (git.branch === defaultBranch || git.branch === 'main' || git.branch === 'master')) {
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      reason: 'PERMIT_FORBIDDEN_ON_DEFAULT_BRANCH',
      lines: [
        formatFlowHeader({
          cmd: 'permit:issue',
          status: 'SEC_BLOCK',
          rule: 'PERMIT_ON_MAIN_FORBIDDEN',
          branch: git.branch,
          hint: 'Create a feature branch before issuing an Edit Permit',
        }),
      ],
    };
  }

  const ttl = Math.max(60, Math.min(MAX_TTL_SEC, Number(ttlSec) || MAX_TTL_SEC));
  const now = Date.now();
  const nonce = crypto.randomBytes(8).toString('hex');
  const { allowedGlobs, forbiddenGlobs } = buildScopeGlobs(ctx, { role: effectiveRole, unit });
  const baseTreeSha = computeTreeFingerprint(ctx.repoRoot);

  const permit = {
    schema: PERMIT_SCHEMA,
    permitId: `PRM-${agentId.slice(0, 12)}-${nonce.slice(0, 8)}`,
    agentId,
    role: effectiveRole,
    unit: unit || null,
    reason: String(reason || (unit ? `edit:${unit}` : 'scoped_work')).slice(0, 120),
    bgBranch: git.branch,
    baseTreeSha,
    allowedGlobs,
    forbiddenGlobs,
    issuedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + ttl * 1000).toISOString(),
    nonce,
    attestation: 'LOCAL_PERMIT',
  };
  permit.integritySha256 = permitDigest(permit);

  fs.mkdirSync(permitsDir(ctx.stateDir), { recursive: true, mode: 0o700 });
  const pPath = getPermitPath(ctx.stateDir, agentId);
  atomicWriteSync(pPath, JSON.stringify(permit, null, 2) + '\n');
  try {
    fs.chmodSync(pPath, 0o600);
  } catch {
    // ignore
  }

  return {
    ok: true,
    exitCode: EXIT_OK,
    permit,
    lines: [
      formatFlowHeader({
        cmd: 'permit:issue',
        status: 'ISSUED',
        id: permit.permitId,
        role: permit.role,
        branch: permit.bgBranch,
        ttl_s: ttl,
        unit: permit.unit || '*',
      }),
    ],
  };
}

export function readPermit(stateDir, agentId) {
  const pPath = getPermitPath(stateDir, agentId);
  if (!fs.existsSync(pPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(pPath, 'utf8'));
  } catch {
    return { corrupted: true };
  }
}

export function revokePermit(ctx, agentId, reason = 'manual_revoke') {
  const pPath = getPermitPath(ctx.stateDir, agentId);
  const existing = readPermit(ctx.stateDir, agentId);
  if (fs.existsSync(pPath)) {
    try {
      fs.unlinkSync(pPath);
    } catch {
      // ignore
    }
  }
  fs.mkdirSync(ctx.stateDir, { recursive: true });
  const entry = {
    revokedAt: new Date().toISOString(),
    agentId,
    permitId: existing?.permitId || 'NONE',
    reason,
  };
  fs.appendFileSync(revokedLogPath(ctx.stateDir), JSON.stringify(entry) + '\n', { mode: 0o600 });
  return { ok: true, revoked: Boolean(existing && !existing.corrupted), entry };
}

/**
 * Automatic containment executed immediately on any SEC violation / unauthorized edit.
 */
export function triggerContainment(ctx, agentId, rule, findings = []) {
  revokePermit(ctx, agentId, `CONTAINMENT:${rule}`);
  const releasedLeases = releaseAllAgentLeases(ctx, agentId);
  const qPath = quarantineAgent(ctx.stateDir, agentId, rule, findings);
  return { quarantined: true, qPath, releasedLeases };
}

/**
 * Verify that `agentId` holds a valid, unexpired, untampered Edit Permit covering `dirtyFiles`
 * on the bound `bg` feature branch. Automatically contains & revokes on breach!
 */
export function verifyPermit(ctx, {
  agentId,
  dirtyFiles = null,
  requirePermit = true,
  autoContain = true,
} = {}) {
  if (isAgentQuarantined(ctx.stateDir, agentId)) {
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      rule: 'AGENT_QUARANTINED',
      msg: `Agent '${agentId}' is quarantined; run 'flow security recover' after restoring clean state`,
    };
  }

  const git = getGitMeta(ctx.repoRoot);
  const files = dirtyFiles ?? git.dirtyFiles;
  const permit = readPermit(ctx.stateDir, agentId);

  if (!permit) {
    if (!requirePermit && files.length === 0) {
      return { ok: true, exitCode: EXIT_OK, status: 'CLEAN_NO_PERMIT', permit: null };
    }
    if (autoContain && files.length > 0) {
      triggerContainment(ctx, agentId, 'MISSING_EDIT_PERMIT', [{ layer: 'SEC-10', rule: 'MISSING_EDIT_PERMIT', file: files[0], line: 1, msg: 'Dirty edits without Edit Permit' }]);
    }
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      rule: 'MISSING_EDIT_PERMIT',
      msg: 'No active Edit Permit. Run `flow permit issue [--unit=<U>]` before editing.',
    };
  }

  if (permit.corrupted || permit.integritySha256 !== permitDigest(permit)) {
    if (autoContain) triggerContainment(ctx, agentId, 'PERMIT_TAMPERED');
    return { ok: false, exitCode: EXIT_SECURITY_BLOCKED, rule: 'PERMIT_TAMPERED', msg: 'Permit JSON integrity hash mismatch' };
  }

  const expMs = Date.parse(permit.expiresAt);
  if (!Number.isFinite(expMs) || Date.now() > expMs) {
    revokePermit(ctx, agentId, 'PERMIT_EXPIRED');
    return { ok: false, exitCode: EXIT_SECURITY_BLOCKED, rule: 'PERMIT_EXPIRED', msg: `Permit ${permit.permitId} expired at ${permit.expiresAt}` };
  }

  if (git.branch && permit.bgBranch && git.branch !== permit.bgBranch) {
    if (autoContain) triggerContainment(ctx, agentId, 'PERMIT_BRANCH_MISMATCH');
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      rule: 'PERMIT_BRANCH_MISMATCH',
      msg: `Permit bound to '${permit.bgBranch}', current branch is '${git.branch}'`,
    };
  }

  const outOfScope = [];
  for (const rel of files) {
    if (rel.startsWith('docs/') || rel.startsWith('dist/')) continue;
    const forbid = matchAnyGlob(rel, permit.forbiddenGlobs || []);
    if (forbid) {
      outOfScope.push({ file: rel, reason: `FORBIDDEN:${forbid}` });
      continue;
    }
    const allow = matchAnyGlob(rel, permit.allowedGlobs || []);
    if (!allow) {
      outOfScope.push({ file: rel, reason: 'OUTSIDE_PERMIT_SCOPE' });
    }
  }

  if (outOfScope.length > 0) {
    if (autoContain) {
      triggerContainment(
        ctx,
        agentId,
        'PERMIT_SCOPE_BREACH',
        outOfScope.map((o) => ({ layer: 'SEC-10', rule: 'PERMIT_SCOPE_BREACH', file: o.file, line: 1, msg: o.reason }))
      );
    }
    return {
      ok: false,
      exitCode: EXIT_SECURITY_BLOCKED,
      rule: 'PERMIT_SCOPE_BREACH',
      outOfScope,
      msg: `${outOfScope.length} dirty file(s) outside permit scope: ${outOfScope[0].file} (${outOfScope[0].reason})`,
    };
  }

  return { ok: true, exitCode: EXIT_OK, status: 'VALID', permit };
}

/**
 * Controlled recovery from quarantine: requires clean working tree (0 dirty files) or explicit ack.
 */
export function recoverQuarantinedAgent(ctx, { agentId, allowDirty = false } = {}) {
  const qPath = path.join(ctx.stateDir, 'quarantine', `${agentId}.json`);
  if (!fs.existsSync(qPath)) {
    return { ok: true, exitCode: EXIT_OK, lines: [formatFlowHeader({ cmd: 'security:recover', status: 'NOT_QUARANTINED', agent: agentId })] };
  }
  const git = getGitMeta(ctx.repoRoot);
  if (!allowDirty && git.dirtyFiles.length > 0) {
    return {
      ok: false,
      exitCode: EXIT_BLOCKED,
      lines: [
        formatFlowHeader({
          cmd: 'security:recover',
          status: 'BLOCKED_DIRTY_TREE',
          agent: agentId,
          dirty: git.dirtyFiles.length,
          hint: 'Restore clean tree via `bg recover` or revert unauthorized edits before clearing quarantine',
        }),
      ],
    };
  }
  fs.unlinkSync(qPath);
  revokePermit(ctx, agentId, 'RECOVERY_RESET');
  return {
    ok: true,
    exitCode: EXIT_OK,
    lines: [formatFlowHeader({ cmd: 'security:recover', status: 'RECOVERED', agent: agentId, next: 'Issue fresh permit via `flow permit issue`' })],
  };
}

/**
 * Install local Git pre-commit & pre-push hooks enforcing Edit Permit + non-main guard.
 */
export function installPermitGitHooks(ctx) {
  const hooksDir = path.join(ctx.repoRoot, 'scripts/flow_os/git_hooks');
  fs.mkdirSync(hooksDir, { recursive: true });
  const preCommit = `#!/usr/bin/env bash
set -euo pipefail
node scripts/flow_os/flow.mjs permit verify --hook=pre-commit --raw
`;
  const prePush = `#!/usr/bin/env bash
set -euo pipefail
BR="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BR" == "main" || "$BR" == "master" ]]; then
  echo "FLOW_SEC_BLOCK|rule=DIRECT_PUSH_MAIN_FORBIDDEN|hint=Use feature branch + PR" >&2
  exit 6
fi
node scripts/flow_os/flow.mjs security audit --raw
`;
  fs.writeFileSync(path.join(hooksDir, 'pre-commit'), preCommit, { mode: 0o755 });
  fs.writeFileSync(path.join(hooksDir, 'pre-push'), prePush, { mode: 0o755 });
  return { ok: true, hooksDir };
}

export function runPermitSelftest() {
  const t0 = performance.now();
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'flow_permit_st_'));
  const results = [];
  const check = (id, ok, detail) => results.push({ id, ok: Boolean(ok), detail });

  try {
    fs.mkdirSync(path.join(sandbox, '.git', 'flow_os'), { recursive: true });
    const ctx = loadFlowConfig(sandbox);
    ctx.cfg.defaultBranch = 'main';
    // Inject synthetic git branch via HEAD file so getGitMeta sees a feature branch
    fs.writeFileSync(path.join(sandbox, '.git', 'HEAD'), 'ref: refs/heads/feat/test-permit\n');

    // P01: Missing permit with dirty edit -> BLOCK + auto-quarantine
    const vMiss = verifyPermit(ctx, { agentId: 'a1', dirtyFiles: ['src/units/evf.ts'] });
    check('P01', !vMiss.ok && vMiss.exitCode === EXIT_SECURITY_BLOCKED && isAgentQuarantined(ctx.stateDir, 'a1'), 'Missing permit blocks & quarantines');

    // P02: Recovery lifts quarantine cleanly
    const rec = recoverQuarantinedAgent(ctx, { agentId: 'a1', allowDirty: true });
    check('P02', rec.ok && !isAgentQuarantined(ctx.stateDir, 'a1'), 'Controlled recovery lifts quarantine');

    // P03: Self-elevation to integrator without explicit reason blocked
    const selfEl = issuePermit(ctx, { agentId: 'a2', role: 'integrator', allowMain: true });
    check('P03', !selfEl.ok && selfEl.reason === 'SELF_ELEVATION_BLOCKED', 'Self-elevation to integrator blocked');

    // P04: Valid worker permit for unit evf allows evf edits & blocks outside-scope edits + auto-revokes
    const iss = issuePermit(ctx, { agentId: 'a3', unit: 'evf', role: 'worker', ttlSec: 600, allowMain: true });
    const vOk = verifyPermit(ctx, { agentId: 'a3', dirtyFiles: ['src/units/evf.pose.tsv'] });
    check('P04', iss.ok && vOk.ok, 'Valid unit worker permit passes in-scope edit');

    const vBreach = verifyPermit(ctx, { agentId: 'a3', dirtyFiles: ['src/core/v2_unit_compiler.ts'] });
    check(
      'P05',
      !vBreach.ok && vBreach.rule === 'PERMIT_SCOPE_BREACH' && isAgentQuarantined(ctx.stateDir, 'a3') && !readPermit(ctx.stateDir, 'a3'),
      'Out-of-scope edit triggers EXIT 6 + auto-quarantine + auto-revoke'
    );

    // P06: Tampered permit integrity hash blocked
    const iss4 = issuePermit(ctx, { agentId: 'a4', unit: 'evf', role: 'worker', ttlSec: 600, allowMain: true });
    const p4Path = getPermitPath(ctx.stateDir, 'a4');
    const raw4 = JSON.parse(fs.readFileSync(p4Path, 'utf8'));
    raw4.role = 'integrator';
    fs.writeFileSync(p4Path, JSON.stringify(raw4));
    const vTam = verifyPermit(ctx, { agentId: 'a4', dirtyFiles: ['src/units/evf.pose.tsv'] });
    check('P06', iss4.ok && !vTam.ok && vTam.rule === 'PERMIT_TAMPERED', 'Tampered permit role detected & blocked');
  } finally {
    fs.rmSync(sandbox, { recursive: true, force: true });
  }

  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);
  return {
    ok: failed.length === 0,
    exitCode: failed.length === 0 ? EXIT_OK : EXIT_BLOCKED,
    passed,
    total: results.length,
    failed,
    elapsedMs: Math.round(performance.now() - t0),
  };
}
