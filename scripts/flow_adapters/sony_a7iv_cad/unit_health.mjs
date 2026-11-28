/**
 * FLOW V1.1 Instant Comprehension — Pre-Computed 23-Mode Unit Spatial Health Ledger (`unit_health.mjs`)
 *
 * Eliminates 2-3 minute full-repo `sp audit` cold-start waits during `/plan` by persisting
 * deterministic baseline spatial metrics (`sp_clash`, `ex02_gap08`, `sp_float`, `sp_smt`, `sp_explode`)
 * plus dependency DAG and per-unit source SHA-256 fingerprints into `catalog/UNIT_HEALTH.tsv`.
 *
 * Crucial EXAM parity fix: `sp_float` (>4.0mm) alone misses `EX02` (`SEAT_MAX_MM = 0.08mm`)
 * cascading failures (200+ downstream tests). `ex02_gap08` computes the exact grounded BFS
 * unseated count at <=0.08mm AABB tolerance so `flow status` never falsely reports unseated units as clean.
 *
 * At runtime, `readUnitHealthCatalog(ctx)` loads the ledger in <35ms (with deduplicated file-hash
 * caching) and overlays live certificates, pose override rows, and source SHA-256 staleness.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { atomicWriteSync } from '../../flow_os/kernel_config.mjs';

export const HEALTH_TSV_REL = 'catalog/UNIT_HEALTH.tsv';

export const EXCLUDED_EXAM_UNITS = Object.freeze(new Set(['mirai_2028', 'sensor_fab']));

export const COMPOSITE_DEPS = Object.freeze({
  camera_body: ['mount', 'body', 'evf', 'shutter', 'sensor', 'mainboard', 'lcd'],
  integrated: ['lens', 'mount', 'body', 'evf', 'shutter', 'sensor', 'mainboard', 'lcd'],
});

const UNIT_ASSEMBLY_SPEC = Object.freeze({
  mishoe: { dir: 'src/assemblies/mishoe' },
  sensor_fab: { dir: 'src/assemblies/sensorFab' },
  mirai_2028: { dir: 'src/assemblies/mirai2028' },
  micro: { files: ['src/assemblies/sensor/microPixelParts.ts', 'src/assemblies/sensor/physicsOverlay.ts'] },
  micro_v2: {
    files: [
      'src/assemblies/sensor/microPixelV2Parts.ts',
      'src/assemblies/sensor/microPixelV2DeepParts.ts',
      'src/assemblies/sensor/microPixelV2PhysicsOverlay.ts',
    ],
  },
  camera_body: { files: ['src/units/camera_macro_shared.ts'] },
  integrated: { files: ['src/units/camera_macro_shared.ts'] },
});

function readTsvRows(absPath) {
  if (!fs.existsSync(absPath)) return [];
  const lines = fs.readFileSync(absPath, 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#'));
  if (lines.length < 2) return [];
  const hdr = lines[0].split('\t');
  return lines.slice(1).map((l) => {
    const cols = l.split('\t');
    const obj = {};
    for (let i = 0; i < hdr.length; i++) obj[hdr[i]] = cols[i] ?? '';
    return obj;
  });
}

function collectFilesInDirSorted(absDir) {
  if (!fs.existsSync(absDir)) return [];
  const out = [];
  for (const e of fs.readdirSync(absDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const p = path.join(absDir, e.name);
    if (e.isDirectory()) out.push(...collectFilesInDirSorted(p));
    else if (e.isFile() && (e.name.endsWith('.ts') || e.name.endsWith('.json'))) out.push(p);
  }
  return out;
}

export function countLivePoseRows(repoRoot, unitId) {
  const p = path.join(repoRoot, 'src/units', `${unitId}.pose.tsv`);
  if (!fs.existsSync(p)) return 0;
  return fs
    .readFileSync(p, 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('#')).length;
}

export function readLiveCertStatus(repoRoot, unitId) {
  if (EXCLUDED_EXAM_UNITS.has(unitId)) return 'EXCL';
  const certPath = path.join(repoRoot, 'verification/certificates', `${unitId}.v1_1.cert.json`);
  if (!fs.existsSync(certPath)) return 'UNVERIFIED';
  try {
    const parsed = JSON.parse(fs.readFileSync(certPath, 'utf8'));
    if (parsed.status === 'CERTIFIED') return 'CERTIFIED';
    if (String(parsed.status || '').startsWith('REVOKED')) return 'REVOKED';
    return 'UNVERIFIED';
  } catch {
    return 'REVOKED';
  }
}

function resolveUnitSourceFiles(repoRoot, unitId, indexByUnit, visited = new Set()) {
  if (visited.has(unitId)) return [];
  visited.add(unitId);
  const files = [];
  const idx = indexByUnit.get(unitId);
  if (idx?.unit_file) files.push(path.join(repoRoot, idx.unit_file));
  if (idx?.data_file) files.push(path.join(repoRoot, idx.data_file));
  const poseAbs = path.join(repoRoot, 'src/units', `${unitId}.pose.tsv`);
  if (fs.existsSync(poseAbs)) files.push(poseAbs);

  const spec = UNIT_ASSEMBLY_SPEC[unitId];
  if (spec?.files) {
    for (const rel of spec.files) files.push(path.join(repoRoot, rel));
  } else {
    const dirRel = spec?.dir || `src/assemblies/${unitId}`;
    files.push(...collectFilesInDirSorted(path.join(repoRoot, dirRel)));
  }

  for (const dep of COMPOSITE_DEPS[unitId] || []) {
    files.push(...resolveUnitSourceFiles(repoRoot, dep, indexByUnit, visited));
  }
  return files;
}

function getFileDigest(absPath, cache) {
  if (cache && cache.has(absPath)) return cache.get(absPath);
  const dig = crypto.createHash('sha256').update(fs.readFileSync(absPath)).digest('hex');
  if (cache) cache.set(absPath, dig);
  return dig;
}

export function computeUnitSourceSha(repoRoot, unitId, indexByUnit, fileHashCache = null) {
  const uniqueFiles = [...new Set(resolveUnitSourceFiles(repoRoot, unitId, indexByUnit))]
    .filter((f) => fs.existsSync(f))
    .sort();
  const h = crypto.createHash('sha256');
  for (const abs of uniqueFiles) {
    const rel = path.relative(repoRoot, abs).replace(/\\/g, '/');
    h.update(rel);
    h.update('\0');
    h.update(getFileDigest(abs, fileHashCache));
    h.update('\0');
  }
  return h.digest('hex').slice(0, 12);
}

/**
 * Exact EX02 grounded contact-graph reachability check at `SEAT_MAX_MM = 0.08mm` (AABB Euclidean gap).
 * Matches `ir_compiler.mjs` ground-root rule (`minY + 1.2mm` or foot/base within `minY + 2.5mm`).
 * Runs in <3ms per unit and exposes the true EX02 unseated count that causes 200+ cascading EXAM FAILs.
 */
export function computeEx02UnseatedCount(scene, seatMaxMm = 0.08) {
  const parts = (scene?.parts || []).filter((p) => (p.meshCount ?? 1) > 0 && Array.isArray(p.box));
  const n = parts.length;
  if (n <= 1) return 0;

  let minY = Infinity;
  for (const p of parts) {
    if (p.box[1] < minY) minY = p.box[1];
  }

  const roots = [];
  for (let i = 0; i < n; i++) {
    const p = parts[i];
    const hay = `${p.id} ${p.title || ''} ${p.role || ''}`.toLowerCase();
    const isFoot = /rubber-feet|foot|feet|base-pad|tripod-socket|bottom-weight|leveling/.test(hay);
    if (p.box[1] <= minY + 1.2 || (isFoot && p.box[1] <= minY + 2.5)) {
      roots.push(i);
    }
  }
  if (roots.length === 0) roots.push(0);

  const tolSq = seatMaxMm * seatMaxMm;
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    const a = parts[i].box;
    for (let j = i + 1; j < n; j++) {
      const b = parts[j].box;
      const dx = Math.max(0, a[0] - b[3], b[0] - a[3]);
      if (dx > seatMaxMm) continue;
      const dy = Math.max(0, a[1] - b[4], b[1] - a[4]);
      if (dy > seatMaxMm) continue;
      const dz = Math.max(0, a[2] - b[5], b[2] - a[5]);
      if (dx * dx + dy * dy + dz * dz <= tolSq) {
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }

  const visited = new Uint8Array(n);
  const queue = [];
  for (const r of roots) {
    visited[r] = 1;
    queue.push(r);
  }
  for (let qi = 0; qi < queue.length; qi++) {
    const u = queue[qi];
    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = 1;
        queue.push(v);
      }
    }
  }

  let unseated = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) unseated++;
  }
  return unseated;
}

function loadIndexRows(repoRoot) {
  const rows = readTsvRows(path.join(repoRoot, 'catalog/INDEX.tsv'));
  const byUnit = new Map();
  for (const r of rows) byUnit.set(r.mode, r);
  return { rows, byUnit };
}

function serializeHealthTsv(rows) {
  const header = 'unit\tkind\texam\tparts\tpose_rows\tcert\tsp_clash\tex02_gap08\tsp_float\tsp_smt\tsp_explode\tdeps\tsrc_sha';
  const body = rows.map((r) =>
    [
      r.unit,
      r.kind,
      r.exam,
      r.parts,
      r.pose_rows,
      r.cert,
      r.sp_clash,
      r.ex02_gap08,
      r.sp_float,
      r.sp_smt,
      r.sp_explode,
      r.deps,
      r.src_sha,
    ].join('\t')
  );
  const examRows = rows.filter((r) => r.exam === 'YES');
  const cleanCnt = examRows.filter(
    (r) =>
      Number(r.sp_clash) === 0 &&
      Number(r.ex02_gap08) === 0 &&
      Number(r.sp_float) === 0 &&
      Number(r.sp_explode) === 0
  ).length;
  const clashZeroCnt = examRows.filter((r) => Number(r.sp_clash) === 0 && Number(r.sp_explode) === 0).length;
  const footer = `# schema=flow-unit-health/v1.2\texam_units=${examRows.length}\tclean=${cleanCnt}\tclash0=${clashZeroCnt}\tdirty_geom=${examRows.length - cleanCnt}`;
  return [header, ...body, footer].join('\n') + '\n';
}

/**
 * Recompute spatial health metrics for either a single unit (`opts.unit`) or ALL 23 modes,
 * then atomically persist `catalog/UNIT_HEALTH.tsv`.
 * Note: Uses SPB3 cache (`noCache: false`, which already keys on transitive source + `pose.tsv` hash)
 * so single-unit updates finish in seconds and full refreshes stay fast.
 */
export async function refreshUnitHealthCatalog(ctx, { unit = null, noCache = false } = {}) {
  const t0 = performance.now();
  const root = ctx.repoRoot;
  const { rows: idxRows, byUnit: idxMap } = loadIndexRows(root);
  if (idxRows.length === 0) {
    return { ok: false, error: 'MISSING_CATALOG_INDEX', refreshed: 0, elapsedMs: 0 };
  }

  const targetSet = unit ? new Set([unit]) : null;
  if (unit && !idxMap.has(unit)) {
    return { ok: false, error: `UNKNOWN_UNIT:${unit}`, refreshed: 0, elapsedMs: 0 };
  }

  const existingMap = new Map();
  for (const r of readTsvRows(path.join(root, HEALTH_TSV_REL))) {
    existingMap.set(r.unit, r);
  }

  const { loadSpatialScene } = await import('../../spatial_engine/scene_extractor.mjs');
  const { runUnitAudit } = await import('../../spatial_engine/audit_physics.mjs');

  const fileHashCache = new Map();
  const outRows = [];
  let refreshedCount = 0;

  for (const idx of idxRows) {
    const unitId = idx.mode;
    const examActive = !EXCLUDED_EXAM_UNITS.has(unitId);
    const depsList = COMPOSITE_DEPS[unitId] || [];
    const depsStr = depsList.length > 0 ? depsList.join(',') : '-';
    const poseRows = countLivePoseRows(root, unitId);
    const certStatus = readLiveCertStatus(root, unitId);
    const srcSha = computeUnitSourceSha(root, unitId, idxMap, fileHashCache);

    const prev = existingMap.get(unitId);
    const prevHasGap08 = prev && prev.ex02_gap08 !== undefined && prev.ex02_gap08 !== '';
    const shouldMeasure = !targetSet || targetSet.has(unitId) || !prev || !prevHasGap08;

    if (!examActive) {
      outRows.push({
        unit: unitId,
        kind: idx.kind === 'composite' ? 'comp' : 'indiv',
        exam: 'NO',
        parts: Number(idx.parts || 0),
        pose_rows: poseRows,
        cert: 'EXCL',
        sp_clash: '-',
        ex02_gap08: '-',
        sp_float: '-',
        sp_smt: '-',
        sp_explode: '-',
        deps: depsStr,
        src_sha: srcSha,
      });
      if (shouldMeasure) refreshedCount++;
      continue;
    }

    if (!shouldMeasure && prev) {
      outRows.push({
        ...prev,
        parts: Number(idx.parts || prev.parts || 0),
        pose_rows: poseRows,
        cert: certStatus,
        deps: depsStr,
      });
      continue;
    }

    const scene = await loadSpatialScene(unitId, { quality: 'ultra', noCache });
    const audit = runUnitAudit(scene, { explodeSteps: 8, checkFloating: true });
    const ex02Gap08 = computeEx02UnseatedCount(scene, 0.08);

    outRows.push({
      unit: unitId,
      kind: idx.kind === 'composite' ? 'comp' : 'indiv',
      exam: 'YES',
      parts: Number(idx.parts || scene.parts.length || 0),
      pose_rows: poseRows,
      cert: certStatus,
      sp_clash: audit.collisions.length,
      ex02_gap08: ex02Gap08,
      sp_float: audit.floating.length,
      sp_smt: audit.smtSeatingCount,
      sp_explode: audit.explodeCollisions.length,
      deps: depsStr,
      src_sha: srcSha,
    });
    refreshedCount++;
  }

  atomicWriteSync(path.join(root, HEALTH_TSV_REL), serializeHealthTsv(outRows));
  const summary = readUnitHealthCatalog(ctx);
  return {
    ok: true,
    refreshed: refreshedCount,
    elapsedMs: Math.round(performance.now() - t0),
    file: HEALTH_TSV_REL,
    summary,
  };
}

/**
 * Fast (<35ms) live-overlaid read of `catalog/UNIT_HEALTH.tsv` with deduplicated SHA-256 caching.
 */
export function readUnitHealthCatalog(ctx) {
  const root = ctx.repoRoot || ctx;
  const abs = path.join(root, HEALTH_TSV_REL);
  if (!fs.existsSync(abs)) {
    return {
      exists: false,
      rows: [],
      examRows: [],
      excludedUnits: [...EXCLUDED_EXAM_UNITS],
      stage1Count: 0,
      stage2Units: Object.keys(COMPOSITE_DEPS),
      certifiedUnits: [],
      cleanUnits: [],
      clashZeroUnits: [],
      dirtyUnits: [],
      staleUnits: [],
      topClashes: [],
      totals: { clash: 0, ex02Gap08: 0, float: 0, smt: 0, explode: 0, poseRows: 0, poseUnits: 0 },
    };
  }

  const { byUnit: idxMap } = loadIndexRows(root);
  const rawRows = readTsvRows(abs);
  const fileHashCache = new Map();
  const rows = rawRows.map((r) => {
    const unitId = r.unit;
    const examActive = r.exam === 'YES';
    const liveCert = readLiveCertStatus(root, unitId);
    const livePoseRows = countLivePoseRows(root, unitId);
    const liveSha = idxMap.has(unitId) ? computeUnitSourceSha(root, unitId, idxMap, fileHashCache) : r.src_sha;
    const stale = Boolean(r.src_sha && liveSha && r.src_sha !== liveSha);
    const clash = examActive ? Number(r.sp_clash || 0) : null;
    const ex02Gap08 = examActive ? Number(r.ex02_gap08 ?? 0) : null;
    const floatCnt = examActive ? Number(r.sp_float || 0) : null;
    const smt = examActive ? Number(r.sp_smt || 0) : null;
    const explode = examActive ? Number(r.sp_explode || 0) : null;
    return {
      unit: unitId,
      kind: r.kind,
      exam: examActive,
      parts: Number(r.parts || 0),
      poseRows: livePoseRows,
      cert: liveCert,
      clash,
      ex02Gap08,
      float: floatCnt,
      smt,
      explode,
      deps: r.deps && r.deps !== '-' ? r.deps.split(',') : [],
      srcSha: r.src_sha,
      liveSha,
      stale,
    };
  });

  const examRows = rows.filter((r) => r.exam);
  const excludedUnits = rows.filter((r) => !r.exam).map((r) => r.unit);
  const stage1Count = examRows.filter((r) => r.kind === 'indiv').length;
  const stage2Units = examRows.filter((r) => r.kind === 'comp').map((r) => r.unit);
  const certifiedUnits = examRows.filter((r) => r.cert === 'CERTIFIED').map((r) => r.unit);
  const cleanUnits = examRows
    .filter((r) => r.clash === 0 && r.ex02Gap08 === 0 && r.float === 0 && r.explode === 0)
    .map((r) => r.unit);
  const clashZeroUnits = examRows
    .filter((r) => r.clash === 0 && r.explode === 0)
    .map((r) => r.unit);
  const dirtyUnits = examRows
    .filter((r) => r.clash > 0 || r.ex02Gap08 > 0 || r.float > 0 || r.explode > 0)
    .map((r) => r.unit);
  const staleUnits = examRows.filter((r) => r.stale).map((r) => r.unit);

  const topClashes = [...examRows]
    .filter((r) => r.clash > 0)
    .sort((a, b) => b.clash - a.clash || a.unit.localeCompare(b.unit))
    .slice(0, 5)
    .map((r) => `${r.unit}:${r.clash}`);

  const totals = {
    clash: examRows.reduce((s, r) => s + (r.clash || 0), 0),
    ex02Gap08: examRows.reduce((s, r) => s + (r.ex02Gap08 || 0), 0),
    float: examRows.reduce((s, r) => s + (r.float || 0), 0),
    smt: examRows.reduce((s, r) => s + (r.smt || 0), 0),
    explode: examRows.reduce((s, r) => s + (r.explode || 0), 0),
    poseRows: examRows.reduce((s, r) => s + r.poseRows, 0),
    poseUnits: examRows.filter((r) => r.poseRows > 0).length,
  };

  return {
    exists: true,
    rows,
    examRows,
    excludedUnits,
    stage1Count,
    stage2Units,
    certifiedUnits,
    cleanUnits,
    clashZeroUnits,
    dirtyUnits,
    staleUnits,
    topClashes,
    totals,
  };
}

/**
 * Format ultra-compact, zero-spill wire lines for `flow status` (strictly <= 440 tok total).
 * Encodes ALL 21 EXAM units' exact `clash/ex02_gap08/smt/explode` counts without truncation.
 */
export function formatCompactHealthLines(summary, { unit = null } = {}) {
  if (!summary.exists) {
    return ['HEALTH|status=MISSING_CATALOG|fix=npm run flow -- status --refresh-health'];
  }

  if (unit) {
    const r = summary.rows.find((x) => x.unit === unit);
    if (!r) return [`UNIT_HEALTH|unit=${unit}|status=NOT_FOUND`];
    return [
      `UNIT_HEALTH|unit=${r.unit}|kind=${r.kind}|exam=${r.exam ? 'YES' : 'NO'}|parts=${r.parts}|cert=${r.cert}|pose=${r.poseRows}|clash=${r.clash ?? '-'}|gap08=${r.ex02Gap08 ?? '-'}|float4=${r.float ?? '-'}|smt=${r.smt ?? '-'}|exp=${r.explode ?? '-'}|deps=${r.deps.join(',') || '-'}|stale=${r.stale ? 1 : 0}`,
    ];
  }

  const lines = [];
  const examN = summary.examRows.length;
  lines.push(
    `HEALTH|cert=${summary.certifiedUnits.length}/${examN}|s1=${summary.stage1Count}|s2=camera_body(7),integrated(8)|excl=${summary.excludedUnits.join(',')}|clean=${summary.cleanUnits.length}|clash0=${summary.clashZeroUnits.length}|stale=${summary.staleUnits.length}|pose=${summary.totals.poseRows}|tot=${summary.totals.clash}c${summary.totals.ex02Gap08}g${summary.totals.smt}s${summary.totals.explode}e`
  );

  // Compact suffix notation: c=clash, g=ex02_gap>0.08mm, s=smt, e=explode (0=clean; +pN=pose, *C=cert, !S=stale)
  const cells = summary.examRows.map((r) => {
    const segs = [];
    if (r.clash > 0) segs.push(`${r.clash}c`);
    if (r.ex02Gap08 > 0) segs.push(`${r.ex02Gap08}g`);
    if (r.smt > 0) segs.push(`${r.smt}s`);
    if (r.explode > 0) segs.push(`${r.explode}e`);
    const body = segs.length > 0 ? segs.join('') : '0';
    const flags = `${r.poseRows > 0 ? `+p${r.poseRows}` : ''}${r.cert === 'CERTIFIED' ? '*C' : ''}${r.stale ? '!S' : ''}`;
    return `${r.unit}:${body}${flags}`;
  });
  lines.push(`U(c/g08/s/e)|${cells.slice(0, 7).join(' ')}`);
  lines.push(`U|${cells.slice(7, 14).join(' ')}`);
  lines.push(`U|${cells.slice(14).join(' ')}`);
  return lines;
}
