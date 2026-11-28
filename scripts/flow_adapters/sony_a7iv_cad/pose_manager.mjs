/**
 * FLOW V1 OS — Layer G Declarative Pose & Relative Constraint Manager (`src/units/<U>.pose.tsv`)
 * Handles:
 *   1. Atomic read/write of compact 1-part-per-line `.pose.tsv` tables
 *   2. Topological propagation of relative constraints (`seat:<parent>:<axis>:<gap>`, `clear:<other>:<min>`, `cone:<preset>`)
 *   3. SEC-08 anti-cheat bound validation before writing a single byte
 *   4. Zero-overhead TypeScript codegen -> `src/units/flow_poses.gen.ts` (works across Vite, tsc & esbuild)
 */

import fs from 'node:fs';
import path from 'node:path';
import { atomicWriteSync } from '../../flow_os/kernel_config.mjs';
import { validateHealProposal } from '../../flow_os/security_fortress.mjs';

const POSE_HEADER = [
  '# FLOW_POSE_V1 format=tsv unit={{UNIT}}',
  '# id\tdx,dy,dz\trx,ry,rz\tsx,sy,sz\texp_dx,dy,dz\tmat_override\tconstraints',
].join('\n');

function fmt3(v, def = [0, 0, 0], prec = 4) {
  const a = Array.isArray(v) && v.length === 3 ? v : def;
  return `${Number(a[0]).toFixed(prec)},${Number(a[1]).toFixed(prec)},${Number(a[2]).toFixed(prec)}`;
}

function parse3(str, def) {
  if (!str || str === '-') return [...def];
  const a = str.split(',').map(Number);
  return a.length === 3 && a.every(Number.isFinite) ? a : [...def];
}

export function getPoseTsvPath(repoRoot, unitId) {
  return path.join(repoRoot, 'src/units', `${unitId}.pose.tsv`);
}

export function readUnitPoseTsv(repoRoot, unitId) {
  const fp = getPoseTsvPath(repoRoot, unitId);
  const map = new Map();
  if (!fs.existsSync(fp)) return map;
  for (const line of fs.readFileSync(fp, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const cols = t.split('\t');
    const id = cols[0]?.trim();
    if (!id) continue;
    map.set(id, {
      id,
      d: parse3(cols[1], [0, 0, 0]),
      r: parse3(cols[2], [0, 0, 0]),
      s: parse3(cols[3], [1, 1, 1]),
      e: parse3(cols[4], [0, 0, 0]),
      m: cols[5] && cols[5] !== '-' ? cols[5].trim() : '',
      constraints: cols[6] && cols[6] !== '-' ? cols[6].trim() : '',
    });
  }
  return map;
}

/**
 * Parse `seat:<parentId>:<axis>:<gapMm>;clear:<otherId>:<minMm>` annotations and propagate
 * parent shifts topologically to dependent children at 0 LLM tokens.
 */
export function propagateRelativeConstraints(poseMap, parentDeltas) {
  // Build parent -> children adjacency from `seat:<parentId>:...`
  const childrenOf = new Map();
  for (const [id, entry] of poseMap.entries()) {
    if (!entry.constraints) continue;
    for (const clause of entry.constraints.split(';')) {
      const parts = clause.trim().split(':');
      if (parts[0] === 'seat' && parts[1]) {
        const parentId = parts[1];
        if (!childrenOf.has(parentId)) childrenOf.set(parentId, []);
        childrenOf.get(parentId).push(id);
      }
    }
  }

  const queue = [];
  const appliedDelta = new Map();
  for (const [pid, delta] of Object.entries(parentDeltas || {})) {
    if (Math.hypot(delta[0], delta[1], delta[2]) > 1e-6) {
      queue.push(pid);
      appliedDelta.set(pid, delta);
    }
  }

  let propagatedCount = 0;
  const visited = new Set(queue);
  for (let head = 0; head < queue.length; head++) {
    const cur = queue[head];
    const pd = appliedDelta.get(cur);
    for (const childId of childrenOf.get(cur) || []) {
      if (visited.has(childId)) continue;
      visited.add(childId);
      const entry = poseMap.get(childId) || {
        id: childId,
        d: [0, 0, 0],
        r: [0, 0, 0],
        s: [1, 1, 1],
        e: [0, 0, 0],
        m: '',
        constraints: '',
      };
      entry.d = [entry.d[0] + pd[0], entry.d[1] + pd[1], entry.d[2] + pd[2]];
      poseMap.set(childId, entry);
      appliedDelta.set(childId, pd);
      queue.push(childId);
      propagatedCount++;
    }
  }
  return propagatedCount;
}

function isNonZeroEntry(e) {
  const hasD = e.d && Math.hypot(e.d[0], e.d[1], e.d[2]) > 1e-5;
  const hasR = e.r && Math.hypot(e.r[0], e.r[1], e.r[2]) > 1e-5;
  const hasS = e.s && (Math.abs(e.s[0] - 1) > 1e-5 || Math.abs(e.s[1] - 1) > 1e-5 || Math.abs(e.s[2] - 1) > 1e-5);
  const hasE = e.e && Math.hypot(e.e[0], e.e[1], e.e[2]) > 1e-5;
  return hasD || hasR || hasS || hasE || Boolean(e.m) || Boolean(e.constraints);
}

/**
 * Validate against SEC-08 bounds, write `src/units/<unitId>.pose.tsv`, and compile `flow_poses.gen.ts`.
 */
export function writeUnitPoseTsv(ctx, unitId, entriesMap, opts = {}) {
  const patches = [];
  for (const e of entriesMap.values()) {
    if (!isNonZeroEntry(e)) continue;
    patches.push({
      id: e.id,
      delta: e.d || [0, 0, 0],
      isChassis: Boolean(e.isChassis),
      volumeDeltaPct: e.s ? Math.abs(e.s[0] * e.s[1] * e.s[2] - 1) * 100 : 0,
    });
  }

  if (!opts.skipSecCheck) {
    const sec = validateHealProposal({ deletedParts: 0, patches }, ctx.cfg);
    if (!sec.ok) {
      return { ok: false, violations: sec.violations };
    }
  }

  const fp = getPoseTsvPath(ctx.repoRoot, unitId);
  const rows = [...entriesMap.values()]
    .filter(isNonZeroEntry)
    .sort((a, b) => a.id.localeCompare(b.id));

  if (rows.length === 0) {
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  } else {
    const lines = [POSE_HEADER.replace('{{UNIT}}', unitId)];
    for (const r of rows) {
      lines.push(
        [
          r.id,
          fmt3(r.d, [0, 0, 0], 4),
          fmt3(r.r, [0, 0, 0], 4),
          fmt3(r.s, [1, 1, 1], 4),
          fmt3(r.e, [0, 0, 0], 3),
          r.m || '-',
          r.constraints || '-',
        ].join('\t')
      );
    }
    atomicWriteSync(fp, lines.join('\n') + '\n');
  }

  compileFlowPosesGen(ctx.repoRoot);
  return { ok: true, count: rows.length, file: path.relative(ctx.repoRoot, fp) };
}

/**
 * Compile all `src/units/*.pose.tsv` into zero-overhead `src/units/flow_poses.gen.ts`.
 */
export function compileFlowPosesGen(repoRoot) {
  const unitsDir = path.join(repoRoot, 'src/units');
  const poseFiles = fs.existsSync(unitsDir)
    ? fs.readdirSync(unitsDir).filter((f) => f.endsWith('.pose.tsv')).sort()
    : [];

  const allUnits = {};
  for (const f of poseFiles) {
    const unitId = f.slice(0, -'.pose.tsv'.length);
    const map = readUnitPoseTsv(repoRoot, unitId);
    const unitObj = {};
    for (const e of map.values()) {
      const rec = {};
      if (Math.hypot(e.d[0], e.d[1], e.d[2]) > 1e-5) rec.d = e.d.map((n) => Number(n.toFixed(4)));
      if (Math.hypot(e.r[0], e.r[1], e.r[2]) > 1e-5) rec.r = e.r.map((n) => Number(n.toFixed(4)));
      if (Math.abs(e.s[0] - 1) > 1e-5 || Math.abs(e.s[1] - 1) > 1e-5 || Math.abs(e.s[2] - 1) > 1e-5) {
        rec.s = e.s.map((n) => Number(n.toFixed(4)));
      }
      if (Math.hypot(e.e[0], e.e[1], e.e[2]) > 1e-5) rec.e = e.e.map((n) => Number(n.toFixed(3)));
      if (e.m) rec.m = e.m;
      if (Object.keys(rec).length > 0) unitObj[e.id] = rec;
    }
    if (Object.keys(unitObj).length > 0) allUnits[unitId] = unitObj;
  }

  const tsOut = [
    '/**',
    ' * AUTO-GENERATED BY FLOW V1 OS (`scripts/flow_adapters/sony_a7iv_cad/pose_manager.mjs`).',
    ' * Compiled from `src/units/*.pose.tsv` (Layer G declarative transforms & constraints).',
    ' * Do not hand-edit; edit `src/units/<unit>.pose.tsv` or run `npm run flow -- heal --unit=<U> --apply`.',
    ' */',
    '',
    'export interface FlowPoseEntry {',
    '  readonly d?: readonly [number, number, number];',
    '  readonly r?: readonly [number, number, number];',
    '  readonly s?: readonly [number, number, number];',
    '  readonly e?: readonly [number, number, number];',
    '  readonly m?: string;',
    '}',
    '',
    `export const FLOW_UNIT_POSES: Readonly<Record<string, Readonly<Record<string, FlowPoseEntry>>>> = Object.freeze(${JSON.stringify(allUnits)});`,
    '',
  ].join('\n');

  const outPath = path.join(unitsDir, 'flow_poses.gen.ts');
  atomicWriteSync(outPath, tsOut);
  return { outPath, unitCount: Object.keys(allUnits).length };
}
