/**
 * FLOW V1 OS — SEC-09 Immutable Append-Only Hash-Chained Forensic Audit Ledger
 * Every FLOW command execution, patch, lease mutation, and security verdict is chained
 * with SHA-256(prevHash + canonicalPayload) so any post-hoc tampering is 100% detectable.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const GENESIS_HASH = '0'.repeat(64);

function canonicalPayload(rec) {
  const { hash: _ignore, ...rest } = rec;
  const keys = Object.keys(rest).sort();
  const ordered = {};
  for (const k of keys) ordered[k] = rest[k];
  return JSON.stringify(ordered);
}

export function computeRecordHash(rec) {
  return crypto.createHash('sha256').update(`${rec.prevHash}|${canonicalPayload(rec)}`).digest('hex');
}

export function getLedgerPath(stateDir) {
  return path.join(stateDir, 'flow_audit.jsonl');
}

export function appendAuditRecord(stateDir, event) {
  const fp = getLedgerPath(stateDir);
  fs.mkdirSync(path.dirname(fp), { recursive: true });

  let seq = 1;
  let prevHash = GENESIS_HASH;
  if (fs.existsSync(fp)) {
    const raw = fs.readFileSync(fp, 'utf8').trim();
    if (raw) {
      const lines = raw.split('\n');
      const last = JSON.parse(lines[lines.length - 1]);
      seq = Number(last.seq || lines.length) + 1;
      prevHash = String(last.hash || GENESIS_HASH);
    }
  }

  const record = {
    seq,
    ts: new Date().toISOString(),
    agentId: String(event.agentId || 'unknown'),
    cmd: String(event.cmd || 'unknown'),
    args: Array.isArray(event.args) ? event.args.slice(0, 12).map(String) : [],
    treeSha: String(event.treeSha || 'NONE'),
    exitCode: Number(event.exitCode ?? 0),
    detail: String(event.detail || '').slice(0, 240),
    prevHash,
  };
  record.hash = computeRecordHash(record);
  fs.appendFileSync(fp, JSON.stringify(record) + '\n', 'utf8');
  return record;
}

/**
 * Verify complete hash-chain integrity from genesis record to head.
 */
export function verifyAuditLedger(stateDir) {
  const fp = getLedgerPath(stateDir);
  if (!fs.existsSync(fp)) {
    return { ok: true, count: 0, headHash: GENESIS_HASH, brokenAt: null, reason: 'EMPTY_OK' };
  }
  const raw = fs.readFileSync(fp, 'utf8').trim();
  if (!raw) {
    return { ok: true, count: 0, headHash: GENESIS_HASH, brokenAt: null, reason: 'EMPTY_OK' };
  }

  const lines = raw.split('\n');
  let expectedPrev = GENESIS_HASH;
  for (let i = 0; i < lines.length; i++) {
    let rec;
    try {
      rec = JSON.parse(lines[i]);
    } catch {
      return { ok: false, count: lines.length, headHash: expectedPrev, brokenAt: i + 1, reason: 'MALFORMED_JSON' };
    }
    if (rec.seq !== i + 1) {
      return { ok: false, count: lines.length, headHash: expectedPrev, brokenAt: i + 1, reason: `SEQ_GAP:${rec.seq}!=${i + 1}` };
    }
    if (rec.prevHash !== expectedPrev) {
      return { ok: false, count: lines.length, headHash: expectedPrev, brokenAt: i + 1, reason: 'PREV_HASH_MISMATCH' };
    }
    const recomputed = computeRecordHash(rec);
    if (rec.hash !== recomputed) {
      return { ok: false, count: lines.length, headHash: expectedPrev, brokenAt: i + 1, reason: 'RECORD_HASH_TAMPERED' };
    }
    expectedPrev = rec.hash;
  }

  return { ok: true, count: lines.length, headHash: expectedPrev, brokenAt: null, reason: 'CHAIN_VALID' };
}
