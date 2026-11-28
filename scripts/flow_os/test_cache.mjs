/**
 * FLOW V1.1 Speedup — Content-Hash Subsystem Test & Build Cache (`test_cache.mjs`)
 *
 * Eliminates redundant re-execution of unchanged subsystems during intermediate development loops
 * by binding each PASS cache entry to the exact SHA-256 of its transitive source files.
 *
 * IRON ANTI-CHEAT GUARD:
 *   - Cache is HARD-DISABLED (`allowCache = false`) on:
 *       1. `flow finish` (final PR/merge gate)
 *       2. `V1.1証明` engraving / `exam.mjs` official certification runs
 *       3. `flow ship --full-exam`
 *       4. Any invocation with `--no-cache` or `FLOW_NO_CACHE=1`
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { atomicWriteSync } from './kernel_config.mjs';

const CACHE_FILE = 'test_cache.json';
const CACHE_SCHEMA = 'flow-test-cache/v1.1';

export const SUBSYSTEM_INPUT_PATHS = Object.freeze({
  flow_selftest: ['scripts/flow_os', '.flowrc.json', 'AGENTS.md', 'README.md', 'catalog/UNIT_HEALTH.tsv'],
  bg_selftest: ['scripts/bg.mjs', 'scripts/buchigire_guard'],
  dx_selftest: ['scripts/dx.mjs', 'scripts/dx_engine'],
  sp_selftest: ['scripts/sp.mjs', 'scripts/spatial_engine'],
  exam_selftest: ['scripts/exam.mjs', 'scripts/exam', 'scripts/spatial_engine'],
  tsc: ['tsconfig.json', 'src'],
  catalog: ['scripts/generate_catalogs.mjs', 'src/units', 'src/data'],
  validate_parts: ['scripts/validate_parts.mjs', 'src/units', 'src/data', 'src/assemblies'],
  dx_atlas: ['scripts/dx.mjs', 'scripts/dx_engine', 'src'],
});

function walkFilesSorted(absPath, rootAbs, out = []) {
  if (!fs.existsSync(absPath)) return out;
  const st = fs.lstatSync(absPath);
  if (st.isFile()) {
    out.push(path.relative(rootAbs, absPath).replace(/\\/g, '/'));
    return out;
  }
  if (!st.isDirectory()) return out;
  const entries = fs.readdirSync(absPath, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === '__pycache__' || e.name === 'dist' || e.name === 'docs') continue;
    const child = path.join(absPath, e.name);
    if (e.isDirectory()) walkFilesSorted(child, rootAbs, out);
    else if (e.isFile()) out.push(path.relative(rootAbs, child).replace(/\\/g, '/'));
  }
  return out;
}

/**
 * Compute deterministic content SHA-256 across all source files belonging to `subsystem`.
 */
export function computeSubsystemContentHash(repoRoot, subsystem, extraPaths = []) {
  const roots = [...(SUBSYSTEM_INPUT_PATHS[subsystem] || []), ...extraPaths];
  const files = [];
  for (const rel of roots) {
    walkFilesSorted(path.resolve(repoRoot, rel), repoRoot, files);
  }
  const uniq = [...new Set(files)].sort();
  const h = crypto.createHash('sha256');
  h.update(`SUBSYS|${subsystem}|files=${uniq.length}\n`);
  for (const rel of uniq) {
    const abs = path.join(repoRoot, rel);
    try {
      const st = fs.lstatSync(abs);
      if (!st.isFile()) continue;
      // Fast metadata+content hash (files > 8MB hash size+mtime+head/tail, normal files full content)
      if (st.size <= 8 * 1024 * 1024) {
        const fh = crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
        h.update(`${rel}|${st.size}|${fh}\n`);
      } else {
        h.update(`${rel}|${st.size}|${Math.floor(st.mtimeMs)}\n`);
      }
    } catch {
      h.update(`MISS|${rel}\n`);
    }
  }
  return { sha: h.digest('hex'), fileCount: uniq.length };
}

export function readTestCache(stateDir) {
  const fp = path.join(stateDir, CACHE_FILE);
  if (!fs.existsSync(fp)) return { schema: CACHE_SCHEMA, entries: {} };
  try {
    const parsed = JSON.parse(fs.readFileSync(fp, 'utf8'));
    if (parsed?.schema !== CACHE_SCHEMA || !parsed.entries) return { schema: CACHE_SCHEMA, entries: {} };
    return parsed;
  } catch {
    return { schema: CACHE_SCHEMA, entries: {} };
  }
}

export function clearTestCache(stateDir) {
  const fp = path.join(stateDir, CACHE_FILE);
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
  return { ok: true };
}

export function lookupCachedPass(stateDir, repoRoot, subsystem, { allowCache = false, maxAgeSec = 86400 } = {}) {
  if (!allowCache || process.env.FLOW_NO_CACHE === '1') {
    return { hit: false, reason: 'CACHE_DISABLED_BY_GATE' };
  }
  const { sha, fileCount } = computeSubsystemContentHash(repoRoot, subsystem);
  const store = readTestCache(stateDir);
  const entry = store.entries[subsystem];
  if (!entry || entry.sha !== sha || entry.status !== 'PASS') {
    return { hit: false, sha, fileCount, reason: entry ? 'CONTENT_CHANGED' : 'COLD' };
  }
  const ageSec = (Date.now() - Date.parse(entry.recordedAt || 0)) / 1000;
  if (!Number.isFinite(ageSec) || ageSec > maxAgeSec) {
    return { hit: false, sha, fileCount, reason: 'EXPIRED' };
  }
  return { hit: true, sha, fileCount, entry, ageSec: Math.round(ageSec) };
}

export function recordCachedPass(stateDir, repoRoot, subsystem, { summary = 'PASS', ms = 0, sha = null } = {}) {
  const digest = sha || computeSubsystemContentHash(repoRoot, subsystem).sha;
  const store = readTestCache(stateDir);
  store.entries[subsystem] = {
    subsystem,
    sha: digest,
    status: 'PASS',
    summary: String(summary).slice(0, 160),
    lastMs: Math.round(ms),
    recordedAt: new Date().toISOString(),
  };
  atomicWriteSync(path.join(stateDir, CACHE_FILE), JSON.stringify(store, null, 2) + '\n');
  return store.entries[subsystem];
}
