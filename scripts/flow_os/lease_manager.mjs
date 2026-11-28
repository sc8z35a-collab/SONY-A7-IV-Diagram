/**
 * FLOW V1 OS — Parallel AI Agent Capability-Based Lease Manager & Workspace Isolator
 * Prevents two concurrent AI agents from editing the same unit/scope or colliding on Chrome/cache ports.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  EXIT_BLOCKED,
  EXIT_OK,
  atomicWriteSync,
} from './kernel_config.mjs';

function getLeasesDir(stateDir) {
  const dir = path.join(stateDir, 'leases');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function leaseFilePath(stateDir, scope) {
  const safe = String(scope).replace(/[^A-Za-z0-9_.-]/g, '_');
  return path.join(getLeasesDir(stateDir), `${safe}.json`);
}

function isLeaseActive(lease, nowMs = Date.now()) {
  if (!lease || !lease.expiresAt) return false;
  return Date.parse(lease.expiresAt) > nowMs;
}

export function listLeases(stateDir) {
  const dir = getLeasesDir(stateDir);
  const now = Date.now();
  const active = [];
  const expired = [];
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    try {
      const l = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      if (isLeaseActive(l, now)) active.push(l);
      else expired.push(l);
    } catch {
      // ignore malformed
    }
  }
  return { active, expired };
}

/**
 * Acquire exclusive atomic lease for a unit/scope.
 * Uses exclusive file creation lock to avoid TOCTOU races between parallel agents.
 */
export function acquireLease(ctx, { scope, agentId, role = 'worker', branch = '', agentWs = '' }) {
  const ttlSec = ctx.cfg.parallel?.leaseTtlSec || 1800;
  const fp = leaseFilePath(ctx.stateDir, scope);
  const lockFp = `${fp}.lock`;
  const now = Date.now();

  let lockFd = null;
  try {
    lockFd = fs.openSync(lockFp, 'wx');
  } catch {
    // Check if stale lock (> 10s old)
    try {
      const st = fs.statSync(lockFp);
      if (now - st.mtimeMs > 10_000) {
        fs.unlinkSync(lockFp);
        lockFd = fs.openSync(lockFp, 'wx');
      } else {
        return { ok: false, exitCode: EXIT_BLOCKED, reason: 'LEASE_LOCK_CONTENTION', scope };
      }
    } catch {
      return { ok: false, exitCode: EXIT_BLOCKED, reason: 'LEASE_LOCK_CONTENTION', scope };
    }
  }

  try {
    if (fs.existsSync(fp)) {
      const existing = JSON.parse(fs.readFileSync(fp, 'utf8'));
      if (isLeaseActive(existing, now) && existing.agentId !== agentId) {
        return {
          ok: false,
          exitCode: EXIT_BLOCKED,
          reason: 'LEASE_CONFLICT',
          scope,
          holder: existing.agentId,
          holderBranch: existing.branch,
          expiresAt: existing.expiresAt,
        };
      }
    }

    const lease = {
      scope,
      agentId,
      role,
      branch,
      agentWs,
      acquiredAt: new Date(now).toISOString(),
      heartbeatAt: new Date(now).toISOString(),
      expiresAt: new Date(now + ttlSec * 1000).toISOString(),
    };
    atomicWriteSync(fp, JSON.stringify(lease, null, 2) + '\n');
    return { ok: true, exitCode: EXIT_OK, lease };
  } finally {
    if (lockFd !== null) fs.closeSync(lockFd);
    try { fs.unlinkSync(lockFp); } catch { /* ignore */ }
  }
}

export function heartbeatLease(ctx, { scope, agentId }) {
  const fp = leaseFilePath(ctx.stateDir, scope);
  if (!fs.existsSync(fp)) return { ok: false, reason: 'NO_LEASE' };
  const lease = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (lease.agentId !== agentId) return { ok: false, reason: 'NOT_OWNER', holder: lease.agentId };
  const ttlSec = ctx.cfg.parallel?.leaseTtlSec || 1800;
  const now = Date.now();
  lease.heartbeatAt = new Date(now).toISOString();
  lease.expiresAt = new Date(now + ttlSec * 1000).toISOString();
  atomicWriteSync(fp, JSON.stringify(lease, null, 2) + '\n');
  return { ok: true, lease };
}

export function releaseLease(ctx, { scope, agentId, force = false }) {
  const fp = leaseFilePath(ctx.stateDir, scope);
  if (!fs.existsSync(fp)) return { ok: true, released: false };
  const lease = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (!force && lease.agentId !== agentId) {
    return { ok: false, exitCode: EXIT_BLOCKED, reason: 'NOT_OWNER', holder: lease.agentId };
  }
  fs.unlinkSync(fp);
  return { ok: true, released: true, scope };
}

export function releaseAllAgentLeases(ctx, agentId) {
  const { active, expired } = listLeases(ctx.stateDir);
  let count = 0;
  for (const l of [...active, ...expired]) {
    if (l.agentId === agentId) {
      const fp = leaseFilePath(ctx.stateDir, l.scope);
      if (fs.existsSync(fp)) {
        fs.unlinkSync(fp);
        count++;
      }
    }
  }
  return count;
}
