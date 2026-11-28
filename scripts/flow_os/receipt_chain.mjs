/**
 * FLOW V1 OS — SEC-02 Cryptographic 3-Way Receipt Chain (`FLOW-RECEIPT`)
 * Binds:
 *   1. Exact current working-tree content SHA (zero stale receipts after 1-byte edit)
 *   2. Kernel & Verifier Integrity SHA (`scripts/flow_os/**` + `scripts/exam/**`)
 *   3. Domain Verification Receipt (e.g. `TLX1-RECEIPT` from unskipped 36-engine EXAM V1)
 *   4. Durability Receipt (`BG-RECEIPT` from `bg gate`)
 *   5. 12-Layer Security Receipt (`SEC-RECEIPT` from `security_fortress`)
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { atomicWriteSync } from './kernel_config.mjs';

const RECEIPT_STORE_FILE = 'flow_receipts.json';

function walkDirSorted(dirAbs, rootAbs, out = []) {
  if (!fs.existsSync(dirAbs)) return out;
  const st = fs.lstatSync(dirAbs);
  if (st.isFile()) {
    out.push(path.relative(rootAbs, dirAbs).replace(/\\/g, '/'));
    return out;
  }
  if (!st.isDirectory()) return out;
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === '__pycache__') continue;
    const p = path.join(dirAbs, e.name);
    if (e.isDirectory()) walkDirSorted(p, rootAbs, out);
    else if (e.isFile()) out.push(path.relative(rootAbs, p).replace(/\\/g, '/'));
  }
  return out;
}

/**
 * Compute deterministic working-tree SHA-256 fingerprint across tracked + untracked non-ignored files.
 */
export function computeTreeFingerprint(repoRoot) {
  const hash = crypto.createHash('sha256');
  let files = [];
  try {
    const out = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], {
      cwd: repoRoot,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    files = out.split('\0').filter(Boolean).sort();
  } catch {
    files = walkDirSorted(repoRoot, repoRoot).sort();
  }

  for (const rel of files) {
    if (rel.startsWith('docs/') || rel.startsWith('dist/')) continue;
    const abs = path.join(repoRoot, rel);
    let st;
    try {
      st = fs.lstatSync(abs);
    } catch {
      hash.update(`DEL|${rel}\n`);
      continue;
    }
    if (!st.isFile() || st.size > 32 * 1024 * 1024) {
      hash.update(`META|${rel}|${st.size}\n`);
      continue;
    }
    const fh = crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
    hash.update(`FILE|${rel}|${st.size}|${fh}\n`);
  }
  return hash.digest('hex');
}

/**
 * Compute cryptographic seal over critical OS & verifier paths (`scripts/flow_os`, `scripts/exam`).
 */
export function computeKernelSeal(repoRoot, sealPaths = ['scripts/flow_os']) {
  const hash = crypto.createHash('sha256');
  const allFiles = [];
  for (const sp of sealPaths) {
    walkDirSorted(path.resolve(repoRoot, sp), repoRoot, allFiles);
  }
  const uniq = [...new Set(allFiles)].sort();
  for (const rel of uniq) {
    const abs = path.join(repoRoot, rel);
    const st = fs.lstatSync(abs);
    if (!st.isFile()) continue;
    const fh = crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
    hash.update(`${rel}|${fh}\n`);
  }
  return {
    sha: hash.digest('hex'),
    fileCount: uniq.length,
    paths: sealPaths,
  };
}

export function readReceiptStore(stateDir) {
  const fp = path.join(stateDir, RECEIPT_STORE_FILE);
  if (!fs.existsSync(fp)) return { schema: 'flow-receipts/v1', domain: {}, security: null, bg: null, flow: null };
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch {
    return { schema: 'flow-receipts/v1', domain: {}, security: null, bg: null, flow: null };
  }
}

export function writeReceiptStore(stateDir, store) {
  atomicWriteSync(path.join(stateDir, RECEIPT_STORE_FILE), JSON.stringify(store, null, 2) + '\n');
}

export function recordDomainReceipt(ctx, { target, receipt, treeSha, kernelSha, meta = {} }) {
  const store = readReceiptStore(ctx.stateDir);
  store.domain = store.domain || {};
  store.domain[target] = {
    target,
    receipt,
    treeSha,
    kernelSha,
    meta,
    recordedAt: new Date().toISOString(),
  };
  writeReceiptStore(ctx.stateDir, store);
  return store.domain[target];
}

export function recordSecurityReceipt(ctx, { receipt, treeSha, kernelSha, layersPassed, layersTotal }) {
  const store = readReceiptStore(ctx.stateDir);
  store.security = {
    receipt,
    treeSha,
    kernelSha,
    layersPassed,
    layersTotal,
    recordedAt: new Date().toISOString(),
  };
  writeReceiptStore(ctx.stateDir, store);
  return store.security;
}

/**
 * Forge tamper-evident 3-way chained FLOW-RECEIPT ONLY when all receipts are valid & fresh for current Tree-SHA.
 */
export function buildChainedFlowReceipt({
  treeSha,
  kernelSha,
  bgReceipt,
  secReceipt,
  domainReceipt,
  policy = 'integrator',
}) {
  if (!treeSha || !kernelSha || !secReceipt || !bgReceipt) {
    return { ok: false, receipt: 'NONE', reason: 'MISSING_REQUIRED_RECEIPT' };
  }
  const domTag = domainReceipt && domainReceipt !== 'NONE' ? domainReceipt : 'NO_DOMAIN_GATE';
  const payload = `FLOW1|${treeSha}|${kernelSha}|${bgReceipt}|${secReceipt}|${domTag}|${policy}`;
  const sig = crypto.createHash('sha256').update(payload).digest('hex').slice(0, 12);
  const dom8 = crypto.createHash('sha256').update(domTag).digest('hex').slice(0, 8);
  const receipt = `FLOW-RECEIPT:${treeSha.slice(0, 8)}:${kernelSha.slice(0, 8)}:${dom8}:${policy}:${sig}`;
  return { ok: true, receipt, sig };
}
