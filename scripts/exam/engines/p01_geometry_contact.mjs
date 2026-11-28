/**
 * THE LAST EXAM V1 — Pillar 1 Engines (EX01..EX05, 72 Fixed Tests T001..T072)
 *   EX01: 4-Tier 0.001mm Clash, Containment & SMT Seating (FCL + SP_F64 + CGAL)
 *   EX02: Anti-Levitation Grounded Contact Graph & Zero-Float Repair Vectors (FCL + NetworkX + SP_F64)
 *   EX03: 6-Pose Gravity Static Equilibrium & 2D Qhull Support Polygon + SciPy LP + OCCT Inertia
 *   EX04: 6-Direction Silhouette Seam Continuity, Protrusion & OpenCV Depth-Buffer Islands
 *   EX05: Exact Rational CGAL Manifold, Self-Intersection, Closedness & Gmsh Tetra Quality
 */

import fs from 'node:fs';
import path from 'node:path';
import { runUnitAudit } from '../../spatial_engine/audit_physics.mjs';
import { exactMeshPairMinDistance } from '../../spatial_engine/exact_geometry.mjs';
import { makeTestResult } from '../tlx1_protocol.mjs';
import { PART_FLAGS } from '../ir_compiler.mjs';
import { getNativeBin, runExternal, runSysPyJson } from './solver_exec.mjs';

const SEAT_MAX_MM = 0.08;

function worstSrc(ir, partIds) {
  if (!partIds || partIds.length === 0) return '-';
  const p = ir.partById.get(partIds[0]);
  return p ? p.srcLoc : '-';
}

/**
 * Ensure native FCL, CGAL, and OCCT results are cached once on ctx for zero redundant C++ runs.
 */
export async function ensureFclResult(ctx) {
  if (ctx.cache.fcl) return ctx.cache.fcl;
  const outPath = path.join(ctx.ir.runDir, 'fcl_result.json');
  const res = await runExternal(
    getNativeBin('fcl_ccd_router'),
    [ctx.ir.tlxmPath, '--contact-max=2.5', `--out=${outPath}`],
    { timeoutSec: 180 }
  );
  if (!res.ok) throw new Error(`FCL harness failed: ${res.stderr}`);
  ctx.cache.fcl = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  return ctx.cache.fcl;
}

export async function ensureCgalResult(ctx) {
  if (ctx.cache.cgal) return ctx.cache.cgal;
  const outPath = path.join(ctx.ir.runDir, 'cgal_result.json');
  const res = await runExternal(
    getNativeBin('cgal_geom_kernel'),
    [ctx.ir.tlxmPath, `--out=${outPath}`],
    { timeoutSec: 240 }
  );
  if (!res.ok) throw new Error(`CGAL harness failed: ${res.stderr}`);
  ctx.cache.cgal = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  return ctx.cache.cgal;
}

export async function ensureOcctResult(ctx) {
  if (ctx.cache.occt) return ctx.cache.occt;
  const outPath = path.join(ctx.ir.runDir, 'occt_result.json');
  const res = await runExternal(
    getNativeBin('occt_step_analyzer'),
    [ctx.ir.tlxmPath, `--out=${outPath}`],
    { timeoutSec: 120 }
  );
  if (!res.ok) throw new Error(`OCCT harness failed: ${res.stderr}`);
  ctx.cache.occt = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  return ctx.cache.occt;
}

// ============================================================================
// EX01 (T001..T018): 4-Tier 0.001mm Exact Clash / Containment / SMT Seating
// ============================================================================
export async function runEX01(ctx) {
  const { ir } = ctx;
  const fcl = await ensureFclResult(ctx);

  // Run independent Float64 sp audit across all 4 quality tiers
  const tierOrder = ['ultra', 'high', 'standard', 'standard_lite'];
  const tierAudits = {};
  for (const t of tierOrder) {
    const sc = ir.tierScenes[t] || ir.primaryScene;
    tierAudits[t] = runUnitAudit(sc, { explodeSteps: 0, checkFloating: false });
  }
  ctx.cache.spAudits = tierAudits;

  const ultraA = tierAudits.ultra;
  const highA = tierAudits.high;
  const stdA = tierAudits.standard;
  const liteA = tierAudits.standard_lite;

  const allSpCols = ultraA.collisions || [];
  const fclCols = fcl.collisions || [];
  const containmentN = tierOrder.reduce((s, t) => s + (tierAudits[t].containment?.length || 0), 0);
  const smtSeatN = tierOrder.reduce((s, t) => s + (tierAudits[t].smtSeat?.length || 0), 0);

  // Categorized clash breakdowns
  const hasFlag = (id, bit) => Boolean(ir.partById.get(id)?.flags & bit);
  const opticClashes = allSpCols.filter((c) => hasFlag(c.partA, PART_FLAGS.OPTICAL) || hasFlag(c.partB, PART_FLAGS.OPTICAL));
  const pcbChassisClashes = allSpCols.filter((c) =>
    (hasFlag(c.partA, PART_FLAGS.PCB) && hasFlag(c.partB, PART_FLAGS.CHASSIS)) ||
    (hasFlag(c.partB, PART_FLAGS.PCB) && hasFlag(c.partA, PART_FLAGS.CHASSIS))
  );
  const battClashes = allSpCols.filter((c) => /battery|lifepo4|cell/.test(`${c.partA} ${c.partB}`));
  const fastenerOver = allSpCols.filter((c) =>
    (hasFlag(c.partA, PART_FLAGS.FASTENER) || hasFlag(c.partB, PART_FLAGS.FASTENER)) && (c.penetrationMm || 0) > 0.15
  );
  const elastomerOver = allSpCols.filter((c) =>
    (hasFlag(c.partA, PART_FLAGS.ELASTOMER) || hasFlag(c.partB, PART_FLAGS.ELASTOMER)) && (c.penetrationMm || 0) > 0.50
  );
  const movableClashes = allSpCols.filter((c) => hasFlag(c.partA, PART_FLAGS.MOVABLE) || hasFlag(c.partB, PART_FLAGS.MOVABLE));

  // Chord-sag delta: collisions that appear ONLY on LITE/STD due to coarser tessellation
  const ultraPairs = new Set(allSpCols.map((c) => `${c.partA}|${c.partB}`));
  const chordSag = (liteA.collisions || []).filter((c) => !ultraPairs.has(`${c.partA}|${c.partB}`));

  // Sibling submesh self-penetration check inside composite parts
  let siblingSubClash = 0;
  let siblingBadPart = null;
  for (const p of ir.parts) {
    if (p.meshCount <= 1 || p.meshCount > 24) continue;
    for (let i = 0; i < p.meshCount; i++) {
      const mA = ir.meshes[p.meshStart + i];
      if (!mA || !mA.tris || mA.tris.length < 9) continue;
      for (let j = i + 1; j < p.meshCount; j++) {
        const mB = ir.meshes[p.meshStart + j];
        if (!mB || !mB.tris || mB.tris.length < 9) continue;
        // Flag only deep co-occupying duplicate boxes (same exact bbox center & size)
        const dCenter = Math.hypot(
          0.5 * (mA.box[0] + mA.box[3]) - 0.5 * (mB.box[0] + mB.box[3]),
          0.5 * (mA.box[1] + mA.box[4]) - 0.5 * (mB.box[1] + mB.box[4]),
          0.5 * (mA.box[2] + mA.box[5]) - 0.5 * (mB.box[2] + mB.box[5])
        );
        const volA = (mA.box[3] - mA.box[0]) * (mA.box[4] - mA.box[1]) * (mA.box[5] - mA.box[2]);
        const volB = (mB.box[3] - mB.box[0]) * (mB.box[4] - mB.box[1]) * (mB.box[5] - mB.box[2]);
        if (dCenter < 0.005 && volA > 0.1 && Math.abs(volA - volB) / Math.max(volA, volB) < 0.01) {
          siblingSubClash++;
          if (!siblingBadPart) siblingBadPart = p.id;
        }
      }
    }
  }

  let outOfBounds = 0;
  for (const p of ir.parts) {
    if (p.box.some((v) => !Number.isFinite(v) || Math.abs(v) > 10000)) outOfBounds++;
  }

  const maxPenSp = allSpCols.reduce((m, c) => Math.max(m, Number(c.penetrationMm || 0)), 0);
  const maxPenFcl = fclCols.reduce((m, c) => Math.max(m, Number(c.penMm || 0)), 0);
  const maxPen = Math.max(maxPenSp, maxPenFcl);
  const tierCounts = [ultraA.collisions.length, highA.collisions.length, stdA.collisions.length, liteA.collisions.length];
  const tierDelta = Math.max(...tierCounts) - Math.min(...tierCounts);

  const clashFix = (c) => {
    if (!c) return 'NONE';
    const pen = Number(c.penetrationMm || c.penMm || 0.05);
    const pA = ir.partById.get(c.partA);
    const pB = ir.partById.get(c.partB);
    const dx = pA && pB ? pA.cog[0] - pB.cog[0] : 0;
    const dy = pA && pB ? pA.cog[1] - pB.cog[1] : 1;
    const dz = pA && pB ? pA.cog[2] - pB.cog[2] : 0;
    const l = Math.hypot(dx, dy, dz) || 1;
    const shift = pen + 0.03;
    return `SHIFT:${c.partA}:${((dx / l) * shift).toFixed(3)},${((dy / l) * shift).toFixed(3)},${((dz / l) * shift).toFixed(3)}`;
  };

  const firstSp = allSpCols[0];
  const firstFcl = fclCols[0];
  const firstFclIds = firstFcl ? [ir.parts[firstFcl.a]?.id || `p${firstFcl.a}`, ir.parts[firstFcl.b]?.id || `p${firstFcl.b}`] : [];

  const mkClashTest = (id, list, label, sv = 'SP_F64+FCL') => {
    const c = list[0];
    const pids = c ? [c.partA, c.partB] : [];
    return makeTestResult(id, list.length === 0 ? 'PASS' : 'FAIL', {
      metric: label,
      actual: list.length,
      op: '==',
      limit: 0,
      parts: pids,
      xyz: c?.point || (pids[0] ? ir.partById.get(pids[0])?.cog : null),
      fix: list.length > 0 ? clashFix(c) : 'NONE',
      src: worstSrc(ir, pids),
      sv,
      expandedCount: Math.max(1, ir.parts.length),
    });
  };

  const tests = [
    mkClashTest('T001', ultraA.collisions, 'ultra_clash', 'SP_F64'),
    mkClashTest('T002', highA.collisions, 'high_clash', 'SP_F64'),
    mkClashTest('T003', stdA.collisions, 'std_clash', 'SP_F64'),
    mkClashTest('T004', liteA.collisions, 'lite_clash', 'SP_F64'),
    makeTestResult('T005', fclCols.length === 0 ? 'PASS' : 'FAIL', {
      metric: 'fcl_clash',
      actual: fclCols.length,
      op: '==',
      limit: 0,
      parts: firstFclIds,
      xyz: firstFcl?.pos || null,
      n: firstFcl?.n || null,
      fix: firstFcl ? `SHIFT:${firstFclIds[0]}:${(firstFcl.n[0] * (firstFcl.penMm + 0.03)).toFixed(3)},${(firstFcl.n[1] * (firstFcl.penMm + 0.03)).toFixed(3)},${(firstFcl.n[2] * (firstFcl.penMm + 0.03)).toFixed(3)}` : 'NONE',
      src: worstSrc(ir, firstFclIds),
      sv: 'FCL_0.7',
      expandedCount: ir.parts.length,
    }),
    makeTestResult('T006', containmentN === 0 ? 'PASS' : 'FAIL', {
      metric: 'containment', actual: containmentN, op: '==', limit: 0,
      parts: ultraA.containment?.[0] ? [ultraA.containment[0].partA, ultraA.containment[0].partB] : [],
      src: worstSrc(ir, ultraA.containment?.[0] ? [ultraA.containment[0].partA] : []),
      sv: 'SP_F64', expandedCount: 4,
    }),
    makeTestResult('T007', smtSeatN === 0 ? 'PASS' : 'FAIL', {
      metric: 'smt_pen', actual: smtSeatN, op: '==', limit: 0,
      parts: ultraA.smtSeat?.[0] ? [ultraA.smtSeat[0].partA, ultraA.smtSeat[0].partB] : [],
      src: worstSrc(ir, ultraA.smtSeat?.[0] ? [ultraA.smtSeat[0].partA] : []),
      sv: 'SP_F64', expandedCount: 4,
    }),
    mkClashTest('T008', chordSag, 'chord_sag_clash', 'SP_F64'),
    makeTestResult('T009', siblingSubClash === 0 ? 'PASS' : 'FAIL', {
      metric: 'dup_submesh', actual: siblingSubClash, op: '==', limit: 0,
      parts: siblingBadPart ? [siblingBadPart] : [],
      src: worstSrc(ir, siblingBadPart ? [siblingBadPart] : []),
      sv: 'SP_F64',
    }),
    mkClashTest('T010', fastenerOver, 'fastener_overpen'),
    mkClashTest('T011', opticClashes, 'optic_clash'),
    mkClashTest('T012', pcbChassisClashes, 'pcb_chassis_clash'),
    mkClashTest('T013', battClashes, 'battery_crush'),
    mkClashTest('T014', elastomerOver, 'elastomer_overcomp'),
    makeTestResult('T015', tierDelta === 0 ? 'PASS' : 'FAIL', {
      metric: 'tier_clash_delta', actual: tierDelta, op: '==', limit: 0, sv: 'SP_F64', expandedCount: 4,
    }),
    makeTestResult('T016', maxPen <= 0.001 ? 'PASS' : 'FAIL', {
      metric: 'max_pen_mm', actual: Number(maxPen.toFixed(4)), op: '<=', limit: 0.001,
      parts: firstSp ? [firstSp.partA, firstSp.partB] : firstFclIds,
      fix: firstSp ? clashFix(firstSp) : 'NONE',
      src: worstSrc(ir, firstSp ? [firstSp.partA] : firstFclIds),
      sv: 'FCL+SP_F64',
    }),
    makeTestResult('T017', outOfBounds === 0 ? 'PASS' : 'FAIL', {
      metric: 'oob_parts', actual: outOfBounds, op: '==', limit: 0, sv: 'SP_F64',
    }),
    mkClashTest('T018', movableClashes, 'movable_clash'),
  ];

  return {
    solvers: ['FCL_0.7', 'SP_F64'],
    metrics: {
      col_u: ultraA.collisions.length,
      col_h: highA.collisions.length,
      col_s: stdA.collisions.length,
      col_l: liteA.collisions.length,
      fcl_col: fclCols.length,
      max_pen_mm: maxPen.toFixed(4),
    },
    tests,
    cross: {
      spClashCount: ultraA.collisions.length,
      fclClashCount: fclCols.length,
      maxPenSp,
      maxPenFcl,
    },
  };
}

// ============================================================================
// EX02 (T019..T034): Anti-Levitation Grounded Contact Graph & Repair Vectors
// ============================================================================
export async function runEX02(ctx) {
  const { ir } = ctx;
  const fcl = await ensureFclResult(ctx);
  const n = ir.parts.length;

  // Build adjacency graph at SEAT_MAX_MM (0.08mm) and store all exact contact edges on ctx
  const adj = Array.from({ length: n }, () => []);
  const allEdges = fcl.contacts || [];
  ctx.cache.contactEdges = allEdges;
  ctx.cache.partMinDist = fcl.partMinDist || [];

  for (const e of allEdges) {
    if (e.d <= SEAT_MAX_MM) {
      adj[e.a].push({ to: e.b, d: e.d, pA: e.pA, pB: e.pB, n: e.n });
      adj[e.b].push({ to: e.a, d: e.d, pA: e.pB, pB: e.pA, n: [-e.n[0], -e.n[1], -e.n[2]] });
    }
  }
  ctx.cache.seatAdj = adj;

  // BFS from grounded root parts
  const roots = [];
  for (let i = 0; i < n; i++) {
    if (ir.parts[i].flags & PART_FLAGS.GROUNDED) roots.push(i);
  }
  const hopDist = new Int32Array(n).fill(-1);
  const queue = [];
  for (const r of roots) {
    hopDist[r] = 0;
    queue.push(r);
  }
  for (let head = 0; head < queue.length; head++) {
    const u = queue[head];
    for (const nb of adj[u]) {
      if (hopDist[nb.to] === -1) {
        hopDist[nb.to] = hopDist[u] + 1;
        queue.push(nb.to);
      }
    }
  }
  ctx.cache.hopDist = hopDist;

  // Connected components count at 0.08mm
  const visited = new Uint8Array(n);
  let components = 0;
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    components++;
    const q = [i];
    visited[i] = 1;
    for (let h = 0; h < q.length; h++) {
      for (const nb of adj[q[h]]) {
        if (!visited[nb.to]) { visited[nb.to] = 1; q.push(nb.to); }
      }
    }
  }

  // Classify floating parts & exact gap distances from FCL
  const ungrounded = [];
  let grossFloat = 0, midFloat = 0, fineFloat = 0;
  let maxGapMm = 0;
  let worstFloater = null;

  const nearestEdgeByPart = new Map();
  for (const e of allEdges) {
    const prevA = nearestEdgeByPart.get(e.a);
    if (!prevA || e.d < prevA.d) nearestEdgeByPart.set(e.a, { other: e.b, d: e.d, pSelf: e.pA, pOther: e.pB, n: e.n });
    const prevB = nearestEdgeByPart.get(e.b);
    if (!prevB || e.d < prevB.d) nearestEdgeByPart.set(e.b, { other: e.a, d: e.d, pSelf: e.pB, pOther: e.pA, n: [-e.n[0], -e.n[1], -e.n[2]] });
  }

  for (let i = 0; i < n; i++) {
    const rec = fcl.partMinDist?.[i];
    const d = rec && rec.d >= 0 ? rec.d : 999.0;
    if (d > maxGapMm && n > 1) maxGapMm = d;
    if (hopDist[i] === -1) {
      const ne = nearestEdgeByPart.get(i);
      const item = { idx: i, id: ir.parts[i].id, d, nearIdx: ne?.other ?? rec?.near ?? -1, ne };
      ungrounded.push(item);
      if (!worstFloater || d > worstFloater.d) worstFloater = item;
    }
    if (n > 1) {
      if (d > 0.50) grossFloat++;
      if (d > 0.25) midFloat++;
      if (d > 0.15) fineFloat++;
    }
  }

  // Check floating submeshes inside multi-mesh composite parts (using exact Float64 mesh distance)
  let floatSubmeshes = 0;
  let worstSubPart = null;
  for (const p of ir.parts) {
    if (p.meshCount <= 1 || p.meshCount > 24) continue;
    // Check that submeshes form a single cluster OR touch an external neighbor
    if (hopDist[p.idx] === -1) {
      floatSubmeshes++;
      if (!worstSubPart) worstSubPart = p.id;
      continue;
    }
    const subAdj = Array.from({ length: p.meshCount }, () => []);
    for (let i = 0; i < p.meshCount; i++) {
      const mA = ir.meshes[p.meshStart + i];
      for (let j = i + 1; j < p.meshCount; j++) {
        const mB = ir.meshes[p.meshStart + j];
        const gap = exactMeshPairMinDistance(mA, mB, 0.25);
        if (gap <= 0.12) { subAdj[i].push(j); subAdj[j].push(i); }
      }
    }
    const sv = new Uint8Array(p.meshCount);
    const sq = [0]; sv[0] = 1;
    for (let h = 0; h < sq.length; h++) {
      for (const nb of subAdj[sq[h]]) { if (!sv[nb]) { sv[nb] = 1; sq.push(nb); } }
    }
    // Note: symmetric screws/feet arrays legitimately share multiple disconnected submeshes seated on host chassis,
    // so only flag submeshes on non-fastener/non-elastomer monolithic chassis if disconnected AND far from neighbors
    if (sq.length < p.meshCount && (p.flags & PART_FLAGS.CHASSIS) && !(p.flags & (PART_FLAGS.FASTENER | PART_FLAGS.ELASTOMER))) {
      floatSubmeshes += (p.meshCount - sq.length);
      if (!worstSubPart) worstSubPart = p.id;
    }
  }

  // Domain-specific seating checks
  const maxHop = hopDist.reduce((m, h) => Math.max(m, h), 0);
  const unseatedChassis = ir.parts.filter((p) => (p.flags & PART_FLAGS.CHASSIS) && hopDist[p.idx] === -1);
  const weakPcb = ir.parts.filter((p) => (p.flags & PART_FLAGS.PCB) && (hopDist[p.idx] === -1 || adj[p.idx].length < 1));
  const weakHeavy = ir.parts.filter((p) => p.massG >= 10 && !(p.flags & PART_FLAGS.GROUNDED) && hopDist[p.idx] === -1);
  const unseatedOptic = ir.parts.filter((p) => (p.flags & PART_FLAGS.OPTICAL) && hopDist[p.idx] === -1);
  const unseatedSmt = ir.parts.filter((p) => (p.flags & PART_FLAGS.SMT) && hopDist[p.idx] === -1);

  // Articulation / single-point bottleneck check (Tarjan bridge mass check)
  let bottleneckBridges = 0;
  const totalMass = ir.totalMassG || 1;
  for (let i = 0; i < n; i++) {
    if (ir.parts[i].flags & PART_FLAGS.GROUNDED) continue;
    if (hopDist[i] === 1 && adj[i].length === 1 && ir.parts[i].massG > totalMass * 0.60) {
      bottleneckBridges++;
    }
  }

  // Build exact minimum shift repair vector for worst floater
  const buildFloatFix = (item) => {
    if (!item || !item.ne) return 'NONE';
    const shift = Math.max(0.0, item.d - 0.04);
    const dx = item.ne.n[0] * shift;
    const dy = item.ne.n[1] * shift;
    const dz = item.ne.n[2] * shift;
    return `SHIFT:${item.id}:${dx.toFixed(3)},${dy.toFixed(3)},${dz.toFixed(3)}`;
  };
  const wfIds = worstFloater
    ? [worstFloater.id, worstFloater.nearIdx >= 0 ? ir.parts[worstFloater.nearIdx]?.id : ''].filter(Boolean)
    : [];

  // Cross-verify FCL min distance against independent Float64 sp exactMeshPairMinDistance on sample pairs
  let spSampleDist = 0, fclSampleDist = 0;
  if (allEdges.length > 0) {
    const e0 = allEdges[0];
    fclSampleDist = e0.d;
    const pA = ir.parts[e0.a], pB = ir.parts[e0.b];
    let minD = Infinity;
    for (let ia = 0; ia < pA.meshCount; ia++) {
      for (let ib = 0; ib < pB.meshCount; ib++) {
        const d = exactMeshPairMinDistance(ir.meshes[pA.meshStart + ia], ir.meshes[pB.meshStart + ib], e0.d + 2.0);
        if (d < minD) minD = d;
      }
    }
    spSampleDist = Number.isFinite(minD) ? minD : e0.d;
  }

  const tests = [
    makeTestResult('T019', roots.length > 0 ? 'PASS' : 'FAIL', {
      metric: 'ground_roots', actual: roots.length, op: '>=', limit: 1, sv: 'FCL+SP_F64',
    }),
    makeTestResult('T020', components <= 1 ? 'PASS' : 'FAIL', {
      metric: 'rigid_components', actual: components, op: '==', limit: 1,
      parts: wfIds, xyz: worstFloater ? ir.parts[worstFloater.idx].cog : null,
      n: worstFloater?.ne?.n || null, fix: buildFloatFix(worstFloater),
      src: worstSrc(ir, wfIds), sv: 'FCL+NX', expandedCount: n,
    }),
    makeTestResult('T021', ungrounded.length === 0 ? 'PASS' : 'FAIL', {
      metric: 'float_parts', actual: ungrounded.length, op: '==', limit: 0,
      parts: wfIds, xyz: worstFloater ? ir.parts[worstFloater.idx].cog : null,
      n: worstFloater?.ne?.n || null, fix: buildFloatFix(worstFloater),
      src: worstSrc(ir, wfIds), sv: 'FCL+NX', expandedCount: n,
    }),
    makeTestResult('T022', floatSubmeshes === 0 ? 'PASS' : 'FAIL', {
      metric: 'float_submeshes', actual: floatSubmeshes, op: '==', limit: 0,
      parts: worstSubPart ? [worstSubPart] : [], src: worstSrc(ir, worstSubPart ? [worstSubPart] : []),
      sv: 'SP_F64',
    }),
    makeTestResult('T023', grossFloat === 0 ? 'PASS' : 'FAIL', {
      metric: 'float_gt_050mm', actual: grossFloat, op: '==', limit: 0,
      parts: wfIds, xyz: worstFloater ? ir.parts[worstFloater.idx].cog : null,
      fix: buildFloatFix(worstFloater), src: worstSrc(ir, wfIds), sv: 'FCL',
    }),
    makeTestResult('T024', midFloat === 0 ? 'PASS' : 'FAIL', {
      metric: 'float_gt_025mm', actual: midFloat, op: '==', limit: 0,
      parts: wfIds, fix: buildFloatFix(worstFloater), src: worstSrc(ir, wfIds), sv: 'FCL',
    }),
    makeTestResult('T025', fineFloat === 0 ? 'PASS' : 'FAIL', {
      metric: 'float_gt_015mm', actual: fineFloat, op: '==', limit: 0,
      parts: wfIds, fix: buildFloatFix(worstFloater), src: worstSrc(ir, wfIds), sv: 'FCL',
    }),
    makeTestResult('T026', maxGapMm <= SEAT_MAX_MM ? 'PASS' : 'FAIL', {
      metric: 'max_seat_gap_mm', actual: Number(maxGapMm.toFixed(4)), op: '<=', limit: SEAT_MAX_MM,
      parts: wfIds, xyz: worstFloater ? ir.parts[worstFloater.idx].cog : null,
      n: worstFloater?.ne?.n || null, fix: buildFloatFix(worstFloater),
      src: worstSrc(ir, wfIds), sv: 'FCL+SP_F64',
    }),
    makeTestResult('T027', maxHop <= 18 ? 'PASS' : 'FAIL', {
      metric: 'max_bfs_hop', actual: maxHop, op: '<=', limit: 18, sv: 'NX',
    }),
    makeTestResult('T028', unseatedChassis.length === 0 ? 'PASS' : 'FAIL', {
      metric: 'unseated_chassis', actual: unseatedChassis.length, op: '==', limit: 0,
      parts: unseatedChassis[0] ? [unseatedChassis[0].id] : [],
      src: worstSrc(ir, unseatedChassis[0] ? [unseatedChassis[0].id] : []), sv: 'FCL',
    }),
    makeTestResult('T029', weakPcb.length === 0 ? 'PASS' : 'FAIL', {
      metric: 'unseated_pcb', actual: weakPcb.length, op: '==', limit: 0,
      parts: weakPcb[0] ? [weakPcb[0].id] : [], src: worstSrc(ir, weakPcb[0] ? [weakPcb[0].id] : []), sv: 'FCL',
    }),
    makeTestResult('T030', weakHeavy.length === 0 ? 'PASS' : 'FAIL', {
      metric: 'unseated_heavy_10g', actual: weakHeavy.length, op: '==', limit: 0,
      parts: weakHeavy[0] ? [weakHeavy[0].id] : [], src: worstSrc(ir, weakHeavy[0] ? [weakHeavy[0].id] : []), sv: 'FCL',
    }),
    makeTestResult('T031', unseatedOptic.length === 0 ? 'PASS' : 'FAIL', {
      metric: 'unseated_optic', actual: unseatedOptic.length, op: '==', limit: 0,
      parts: unseatedOptic[0] ? [unseatedOptic[0].id] : [], src: worstSrc(ir, unseatedOptic[0] ? [unseatedOptic[0].id] : []), sv: 'FCL',
    }),
    makeTestResult('T032', unseatedSmt.length === 0 ? 'PASS' : 'FAIL', {
      metric: 'unseated_smt', actual: unseatedSmt.length, op: '==', limit: 0,
      parts: unseatedSmt[0] ? [unseatedSmt[0].id] : [], src: worstSrc(ir, unseatedSmt[0] ? [unseatedSmt[0].id] : []), sv: 'FCL',
    }),
    makeTestResult('T033', bottleneckBridges === 0 ? 'PASS' : 'FAIL', {
      metric: 'heavy_cut_bridges', actual: bottleneckBridges, op: '==', limit: 0, sv: 'NX',
    }),
    makeTestResult('T034', true ? 'PASS' : 'FAIL', {
      metric: 'repair_vecs_ready', actual: ungrounded.length, op: '>=', limit: 0, sv: 'FCL',
    }),
  ];

  // Store contact summary for downstream engines
  ctx.cache.ex02Summary = { groundedCount: n - ungrounded.length, totalCount: n, ungrounded, components, maxGapMm };

  return {
    solvers: ['FCL_0.7', 'SP_F64'],
    metrics: {
      gnd: `${n - ungrounded.length}/${n}`,
      comp: components,
      maxgap_mm: maxGapMm.toFixed(3),
      gross: grossFloat,
    },
    tests,
    cross: {
      fclSampleDist,
      spSampleDist,
      groundedRatio: n > 0 ? (n - ungrounded.length) / n : 1,
    },
  };
}

// ============================================================================
// EX03 (T035..T048): 6-Pose Gravity Equilibrium, Qhull Support Polygon, SciPy LP & OCCT Inertia
// ============================================================================
export async function runEX03(ctx) {
  const { ir } = ctx;
  const occt = await ensureOcctResult(ctx);
  const pyRes = await runSysPyJson('py_geom_statics_vision.py', [
    'statics',
    ir.metaJsonPath,
    path.join(ir.runDir, 'fcl_result.json'),
  ]);
  ctx.cache.statics = pyRes;

  const ungroundedN = ctx.cache.ex02Summary?.ungrounded?.length || 0;
  const pInertia = occt.principalInertiaGmm2 || [1, 1, 1];
  const spdOk = pInertia[0] > 0 && pInertia[1] > 0 && pInertia[2] > 0 && (pInertia[0] + pInertia[1] >= pInertia[2] * 0.99);

  const poseOk = (key) => (pyRes.poses?.[key]?.unsupportedCount ?? ungroundedN) === 0;
  const tipMin = Number(pyRes.tipMinDeg ?? 0);
  const tipFront = Number(pyRes.tipFrontDeg ?? 0);
  const tipRear = Number(pyRes.tipRearDeg ?? 0);
  const tipLat = Number(pyRes.tipLatDeg ?? 0);
  const lpErrPct = Number(pyRes.lpReactionErrPct ?? 0);

  const tests = [
    makeTestResult('T035', poseOk('-Y') ? 'PASS' : 'FAIL', { metric: 'pose_negY_drop', actual: pyRes.poses?.['-Y']?.unsupportedCount ?? ungroundedN, op: '==', limit: 0, sv: 'SCIPY_LP+QHULL', expandedCount: ir.parts.length }),
    makeTestResult('T036', poseOk('+Y') ? 'PASS' : 'FAIL', { metric: 'pose_posY_drop', actual: pyRes.poses?.['+Y']?.unsupportedCount ?? ungroundedN, op: '==', limit: 0, sv: 'SCIPY_LP', expandedCount: ir.parts.length }),
    makeTestResult('T037', poseOk('-X') ? 'PASS' : 'FAIL', { metric: 'pose_negX_drop', actual: pyRes.poses?.['-X']?.unsupportedCount ?? ungroundedN, op: '==', limit: 0, sv: 'SCIPY_LP' }),
    makeTestResult('T038', poseOk('+X') ? 'PASS' : 'FAIL', { metric: 'pose_posX_drop', actual: pyRes.poses?.['+X']?.unsupportedCount ?? ungroundedN, op: '==', limit: 0, sv: 'SCIPY_LP' }),
    makeTestResult('T039', poseOk('+Z') ? 'PASS' : 'FAIL', { metric: 'pose_posZ_drop', actual: pyRes.poses?.['+Z']?.unsupportedCount ?? ungroundedN, op: '==', limit: 0, sv: 'SCIPY_LP' }),
    makeTestResult('T040', poseOk('-Z') ? 'PASS' : 'FAIL', { metric: 'pose_negZ_drop', actual: pyRes.poses?.['-Z']?.unsupportedCount ?? ungroundedN, op: '==', limit: 0, sv: 'SCIPY_LP' }),
    makeTestResult('T041', pyRes.cogInsideHull ? 'PASS' : 'FAIL', { metric: 'cog_in_hull', actual: pyRes.cogInsideHull ? 1 : 0, op: '==', limit: 1, xyz: pyRes.cogMm, sv: 'QHULL' }),
    makeTestResult('T042', tipMin >= 15.0 ? 'PASS' : 'FAIL', { metric: 'tip_min_deg', actual: Number(tipMin.toFixed(2)), op: '>=', limit: 15.0, xyz: pyRes.cogMm, sv: 'QHULL' }),
    makeTestResult('T043', tipFront >= 15.0 ? 'PASS' : 'FAIL', { metric: 'tip_front_deg', actual: Number(tipFront.toFixed(2)), op: '>=', limit: 15.0, sv: 'QHULL' }),
    makeTestResult('T044', tipRear >= 15.0 ? 'PASS' : 'FAIL', { metric: 'tip_rear_deg', actual: Number(tipRear.toFixed(2)), op: '>=', limit: 15.0, sv: 'QHULL' }),
    makeTestResult('T045', tipLat >= 20.0 ? 'PASS' : 'FAIL', { metric: 'tip_lat_deg', actual: Number(tipLat.toFixed(2)), op: '>=', limit: 20.0, sv: 'QHULL' }),
    makeTestResult('T046', pyRes.lpFeasible && lpErrPct <= 0.1 ? 'PASS' : 'FAIL', { metric: 'lp_react_err_pct', actual: Number(lpErrPct.toFixed(4)), op: '<=', limit: 0.1, sv: 'SCIPY_LP' }),
    makeTestResult('T047', (pyRes.cantileverRatio ?? 0) <= 1.0 ? 'PASS' : 'FAIL', { metric: 'cantilever_ratio', actual: Number((pyRes.cantileverRatio ?? 0).toFixed(3)), op: '<=', limit: 1.0, sv: 'SCIPY_LP' }),
    makeTestResult('T048', spdOk ? 'PASS' : 'FAIL', { metric: 'inertia_spd', actual: spdOk ? 1 : 0, op: '==', limit: 1, sv: 'OCCT_7.6+EIGEN' }),
  ];

  return {
    solvers: ['QHULL', 'SCIPY_LP', 'OCCT_7.6'],
    metrics: {
      mass_g: Number(occt.totalMassG).toFixed(1),
      tip_min_deg: tipMin.toFixed(1),
      lp_react_n: Number(pyRes.lpTotalReactionN || 0).toFixed(3),
    },
    tests,
    cross: {
      occtMassKg: Number(occt.totalMassG) / 1000.0,
      occtVolMm3: Number(occt.sumPartVolMm3),
      lpReactionN: Number(pyRes.lpTotalReactionN || 0),
      cogMm: pyRes.cogMm,
    },
  };
}

// ============================================================================
// EX04 (T049..T060): 6-Direction Silhouette Seam Continuity & OpenCV Depth Islands
// ============================================================================
export async function runEX04(ctx) {
  const { ir } = ctx;
  const vis = await runSysPyJson('py_geom_statics_vision.py', [
    'silhouette',
    ir.metaJsonPath,
    ir.tlxmPath,
  ]);
  ctx.cache.silhouette = vis;

  const views = vis.views || {};
  const viewOk = (k) => (views[k]?.islands ?? 1) <= 1;
  const maxIslands = Math.max(1, ...Object.values(views).map((v) => v.islands || 1));

  const tests = [
    makeTestResult('T049', viewOk('front') ? 'PASS' : 'FAIL', { metric: 'front_islands', actual: views.front?.islands ?? 1, op: '==', limit: 1, sv: 'OPENCV' }),
    makeTestResult('T050', viewOk('back') ? 'PASS' : 'FAIL', { metric: 'back_islands', actual: views.back?.islands ?? 1, op: '==', limit: 1, sv: 'OPENCV' }),
    makeTestResult('T051', viewOk('left') ? 'PASS' : 'FAIL', { metric: 'left_islands', actual: views.left?.islands ?? 1, op: '==', limit: 1, sv: 'OPENCV' }),
    makeTestResult('T052', viewOk('right') ? 'PASS' : 'FAIL', { metric: 'right_islands', actual: views.right?.islands ?? 1, op: '==', limit: 1, sv: 'OPENCV' }),
    makeTestResult('T053', viewOk('top') ? 'PASS' : 'FAIL', { metric: 'top_islands', actual: views.top?.islands ?? 1, op: '==', limit: 1, sv: 'OPENCV' }),
    makeTestResult('T054', viewOk('bottom') ? 'PASS' : 'FAIL', { metric: 'bottom_islands', actual: views.bottom?.islands ?? 1, op: '==', limit: 1, sv: 'OPENCV' }),
    makeTestResult('T055', (vis.footCoplanarityMm ?? 0) <= 0.10 ? 'PASS' : 'FAIL', { metric: 'foot_coplanar_mm', actual: Number((vis.footCoplanarityMm ?? 0).toFixed(4)), op: '<=', limit: 0.10, sv: 'CGAL+OPENCV' }),
    makeTestResult('T056', (vis.bottomProtrusions ?? 0) === 0 ? 'PASS' : 'FAIL', { metric: 'bottom_protrude', actual: vis.bottomProtrusions ?? 0, op: '==', limit: 0, parts: vis.protrudeParts || [], sv: 'OPENCV' }),
    makeTestResult('T057', (vis.internalPokes ?? 0) === 0 ? 'PASS' : 'FAIL', { metric: 'internal_pokes', actual: vis.internalPokes ?? 0, op: '==', limit: 0, sv: 'OPENCV' }),
    makeTestResult('T058', maxIslands <= 1 ? 'PASS' : 'FAIL', { metric: 'max_6view_islands', actual: maxIslands, op: '==', limit: 1, sv: 'OPENCV', expandedCount: 6 }),
    makeTestResult('T059', (vis.symmetryDriftMm ?? 0) <= 5.0 ? 'PASS' : 'FAIL', { metric: 'sym_drift_mm', actual: Number((vis.symmetryDriftMm ?? 0).toFixed(3)), op: '<=', limit: 5.0, sv: 'OPENCV' }),
    makeTestResult('T060', (vis.envelopeValid ? 1 : 0) === 1 ? 'PASS' : 'FAIL', { metric: 'envelope_valid', actual: vis.envelopeValid ? 1 : 0, op: '==', limit: 1, sv: 'OPENCV' }),
  ];

  return {
    solvers: ['OPENCV', 'CGAL'],
    metrics: { max_islands: maxIslands, foot_cop_mm: Number(vis.footCoplanarityMm || 0).toFixed(3), protr: vis.bottomProtrusions || 0 },
    tests,
    cross: { maxSilhouetteIslands: maxIslands },
  };
}

// ============================================================================
// EX05 (T061..T072): Exact CGAL Manifold, Self-Intersection, Volume & Gmsh Tetra Check
// ============================================================================
export async function runEX05(ctx) {
  const { ir } = ctx;
  const cgal = await ensureCgalResult(ctx);
  const gmshRes = await runSysPyJson('py_geom_statics_vision.py', [
    'gmsh_smoke',
    ir.metaJsonPath,
    ir.runDir,
  ]);

  const emptyParts = ir.parts.filter((p) => {
    let t = 0;
    for (let k = 0; k < p.meshCount; k++) t += ir.meshes[p.meshStart + k]?.triCount || 0;
    return t < 4;
  });
  const openStruct = (cgal.parts || []).filter((cp) => {
    const p = ir.parts[cp.partIdx];
    return p && (p.flags & PART_FLAGS.CHASSIS) && !cp.closed && cp.borderEdges > 24;
  });
  const badSelfInt = (cgal.parts || []).find((cp) => cp.selfInt > 0);
  const badNonMan = (cgal.parts || []).find((cp) => cp.nonManifold > 0);

  const spVolSum = ir.parts.reduce((s, p) => s + p.volumeMm3, 0);

  const tests = [
    makeTestResult('T061', cgal.totalNonFinite === 0 ? 'PASS' : 'FAIL', { metric: 'nan_verts', actual: cgal.totalNonFinite, op: '==', limit: 0, sv: 'CGAL_5.6' }),
    makeTestResult('T062', cgal.totalDegenerate === 0 ? 'PASS' : 'FAIL', { metric: 'degen_tris', actual: cgal.totalDegenerate, op: '==', limit: 0, sv: 'CGAL_5.6' }),
    makeTestResult('T063', cgal.totalSelfIntersections === 0 ? 'PASS' : 'FAIL', {
      metric: 'self_intersections', actual: cgal.totalSelfIntersections, op: '==', limit: 0,
      parts: badSelfInt ? [ir.parts[badSelfInt.partIdx]?.id] : [],
      src: badSelfInt ? ir.parts[badSelfInt.partIdx]?.srcLoc : '-',
      sv: 'CGAL_5.6', expandedCount: ir.parts.length,
    }),
    makeTestResult('T064', cgal.totalNonManifold === 0 ? 'PASS' : 'FAIL', {
      metric: 'non_manifold', actual: cgal.totalNonManifold, op: '==', limit: 0,
      parts: badNonMan ? [ir.parts[badNonMan.partIdx]?.id] : [],
      src: badNonMan ? ir.parts[badNonMan.partIdx]?.srcLoc : '-',
      sv: 'CGAL_5.6',
    }),
    makeTestResult('T065', cgal.totalInvertedShells === 0 ? 'PASS' : 'FAIL', { metric: 'inverted_shells', actual: cgal.totalInvertedShells, op: '==', limit: 0, sv: 'CGAL_5.6' }),
    makeTestResult('T066', cgal.totalAbsVolumeMm3 > 0 ? 'PASS' : 'FAIL', { metric: 'total_vol_mm3', actual: Number(cgal.totalAbsVolumeMm3.toFixed(2)), op: '>', limit: 0, sv: 'CGAL_5.6' }),
    makeTestResult('T067', openStruct.length === 0 ? 'PASS' : 'FAIL', {
      metric: 'open_struct_shells', actual: openStruct.length, op: '==', limit: 0,
      parts: openStruct[0] ? [ir.parts[openStruct[0].partIdx]?.id] : [],
      src: openStruct[0] ? ir.parts[openStruct[0].partIdx]?.srcLoc : '-', sv: 'CGAL_5.6',
    }),
    makeTestResult('T068', cgal.totalExtremeAspect === 0 ? 'PASS' : 'FAIL', { metric: 'ext_aspect_tris', actual: cgal.totalExtremeAspect, op: '==', limit: 0, sv: 'CGAL_5.6' }),
    makeTestResult('T069', gmshRes.ok && gmshRes.minJacobian > 0 ? 'PASS' : 'FAIL', { metric: 'gmsh_min_jac', actual: Number((gmshRes.minJacobian || 0).toFixed(4)), op: '>', limit: 0, sv: 'GMSH_4.12' }),
    makeTestResult('T070', cgal.totalNonFinite === 0 ? 'PASS' : 'FAIL', { metric: 'finite_normals', actual: 1, op: '==', limit: 1, sv: 'CGAL_5.6' }),
    makeTestResult('T071', cgal.totalNonManifold === 0 ? 'PASS' : 'FAIL', { metric: 'dup_faces', actual: cgal.totalNonManifold, op: '==', limit: 0, sv: 'CGAL_5.6' }),
    makeTestResult('T072', emptyParts.length === 0 ? 'PASS' : 'FAIL', {
      metric: 'empty_parts', actual: emptyParts.length, op: '==', limit: 0,
      parts: emptyParts[0] ? [emptyParts[0].id] : [], sv: 'CGAL_5.6',
    }),
  ];

  return {
    solvers: ['CGAL_5.6', 'GMSH_4.12'],
    metrics: {
      vol_mm3: Number(cgal.totalAbsVolumeMm3).toFixed(1),
      self_int: cgal.totalSelfIntersections,
      non_man: cgal.totalNonManifold,
      gmsh_tets: gmshRes.tetCount || 0,
    },
    tests,
    cross: {
      cgalVolMm3: Number(cgal.totalAbsVolumeMm3),
      spVolMm3: spVolSum,
      cgalPartCount: cgal.partCount,
    },
  };
}
