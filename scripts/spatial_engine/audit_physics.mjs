/**
 * `sp` — Pre-Collision Sim, Full 4-Tier Audit (incl. SMT_SOLDER_SEAT separation,
 * Explode-Trajectory Sweeps & Floating Detection), Sightline Cone Raycasting,
 * Thermal/CoG/Tipping Physics, Snapshot Diff & 20-Case Mathematical Oracle Selftest.
 */

import fs from 'node:fs';
import {
  PRECISION_MM,
  boxBoxMinDistSq,
  boxesOverlap,
  buildBoxMesh,
  buildCandidateMesh,
  buildCapsuleMesh,
  buildCylinderMesh,
  buildFlatBvh,
  buildSphereMesh,
  computeMeshSignedVolumeAndCentroid,
  exactMeshPairMinDistance,
  meshPairExactCheck,
  pointInMeshWinding,
  pointToMeshSignedDist,
  queryBvhBox,
  rayMeshHit,
  translateMesh,
} from './exact_geometry.mjs';
import { RAY_PRESETS } from './scene_extractor.mjs';
import { evaluateCandidateExact, getFrameOrigin, solveAutoFix } from './voxel_pockets.mjs';

export const SP_EXIT_PASS = 0;
export const SP_EXIT_ERROR = 1;
export const SP_EXIT_FAIL = 2;
export const SP_EXIT_WARN = 3;

function isSmtSolderSeatPair(partA, partB, penMm) {
  if (penMm > 0.25) return false;
  const rA = partA.role;
  const rB = partB.role;
  const isPcbSide = (r) => r === 'pcb';
  const isCompSide = (r) => r === 'smt_ic' || r === 'heat_source' || r === 'thermal_sensitive';
  return (isPcbSide(rA) && isCompSide(rB)) || (isPcbSide(rB) && isCompSide(rA));
}

/**
 * Full exact triangle-level static, explode-trajectory, and floating audit on a loaded scene.
 */
export function runUnitAudit(scene, opts = {}) {
  const t0 = performance.now();
  const group = opts.group || null;
  const nearMissMm = Number(opts.nearMissMm ?? 0.15);
  const explodeSteps = Math.max(0, Number(opts.explodeSteps ?? 0));
  const checkFloating = Boolean(opts.checkFloating);

  // Filter parts & meshes by group if specified
  const partMask = new Set();
  for (let i = 0; i < scene.parts.length; i++) {
    if (!group || scene.parts[i].groupKey === group) partMask.add(i);
  }
  const activeMeshes = scene.meshes.filter((m) => partMask.has(m.partIdx));
  const activeBvh = buildFlatBvh(activeMeshes.map((m) => m.box), 6);

  const collisions = [];
  const smtSeating = [];
  const nearMisses = [];
  let kissingCount = 0;
  const seenPairs = new Set();

  for (let i = 0; i < activeMeshes.length; i++) {
    const mA = activeMeshes[i];
    const hits = queryBvhBox(activeBvh, mA.box, nearMissMm, []);
    for (let k = 0; k < hits.length; k++) {
      const j = hits[k];
      if (j <= i) continue;
      const mB = activeMeshes[j];
      if (mA.partIdx === mB.partIdx) continue;

      const pLow = Math.min(mA.partIdx, mB.partIdx);
      const pHigh = Math.max(mA.partIdx, mB.partIdx);
      const pairKey = `${pLow}:${pHigh}`;

      if (boxesOverlap(mA.box, mB.box, 0)) {
        const res = meshPairExactCheck(mA, mB, { computeMinDist: false });
        if (res.intersects) {
          const pA = scene.parts[pLow];
          const pB = scene.parts[pHigh];
          if (res.penMm <= 0.002) {
            kissingCount++;
            continue;
          }
          if (seenPairs.has(`COL:${pairKey}`)) continue;
          seenPairs.add(`COL:${pairKey}`);

          const record = {
            cause: res.contained ? `CONTAINMENT_${res.contained}` : 'SOLID_PENETRATION',
            partA: `${pA.code} (${pA.id})`,
            partB: `${pB.code} (${pB.id})`,
            penMm: res.penMm,
            volMm3: res.volMm3,
            centroidLocal: res.centroid,
          };
          if (isSmtSolderSeatPair(pA, pB, res.penMm)) {
            smtSeating.push({ ...record, cause: 'SMT_SOLDER_SEAT' });
          } else {
            collisions.push(record);
          }
          continue;
        }
      }

      if (nearMisses.length < 40 && !seenPairs.has(`NM:${pairKey}`) && !seenPairs.has(`COL:${pairKey}`)) {
        const d = exactMeshPairMinDistance(mA, mB, nearMissMm);
        if (d > 0.002 && d < nearMissMm) {
          seenPairs.add(`NM:${pairKey}`);
          const pA = scene.parts[pLow];
          const pB = scene.parts[pHigh];
          nearMisses.push({
            partA: `${pA.code} (${pA.id})`,
            partB: `${pB.code} (${pB.id})`,
            gapMm: Number(d.toFixed(4)),
          });
        }
      }
    }
  }

  // Optional floating-part check: a part is floating if its distance to ALL other parts > 4.0 mm
  const floating = [];
  if (checkFloating) {
    const activeParts = scene.parts.filter((_p, idx) => partMask.has(idx));
    const pBvh = buildFlatBvh(activeParts.map((p) => p.box), 6);
    for (let i = 0; i < activeParts.length; i++) {
      const p = activeParts[i];
      if (p.meshCount === 0) continue;
      const nearby = queryBvhBox(pBvh, p.box, 4.0, []);
      let connected = false;
      for (const ni of nearby) {
        if (ni === i) continue;
        if (boxBoxMinDistSq(p.box, activeParts[ni].box) <= 16.0) {
          connected = true;
          break;
        }
      }
      if (!connected) {
        floating.push(`${p.code} (${p.id})`);
      }
    }
  }

  // Optional explode-trajectory collision sweep (t = 1/N .. 1.0)
  const explodeCollisions = [];
  if (explodeSteps > 0) {
    const expSeen = new Set();
    for (let s = 1; s <= explodeSteps; s++) {
      const t = s / explodeSteps;
      const movedMeshes = activeMeshes.map((m) => {
        const e = scene.parts[m.partIdx].explodeOffset;
        return translateMesh(m, e[0] * t, e[1] * t, e[2] * t);
      });
      const mBvh = buildFlatBvh(movedMeshes.map((m) => m.box), 6);
      for (let i = 0; i < movedMeshes.length; i++) {
        const mA = movedMeshes[i];
        const hits = queryBvhBox(mBvh, mA.box, 0, []);
        for (let k = 0; k < hits.length; k++) {
          const j = hits[k];
          if (j <= i) continue;
          const mB = movedMeshes[j];
          if (mA.partIdx === mB.partIdx) continue;
          const pLow = Math.min(mA.partIdx, mB.partIdx);
          const pHigh = Math.max(mA.partIdx, mB.partIdx);
          const pairKey = `${pLow}:${pHigh}`;
          if (seenPairs.has(`COL:${pairKey}`) || expSeen.has(pairKey)) continue;
          const res = meshPairExactCheck(mA, mB, { computeMinDist: false });
          if (res.intersects && res.penMm > 0.05) {
            expSeen.add(pairKey);
            const pA = scene.parts[pLow];
            const pB = scene.parts[pHigh];
            explodeCollisions.push({
              partA: `${pA.code} (${pA.id})`,
              partB: `${pB.code} (${pB.id})`,
              t: Number(t.toFixed(3)),
              penMm: res.penMm,
            });
          }
        }
      }
    }
  }

  collisions.sort((a, b) => b.penMm - a.penMm);
  const failed = collisions.length > 0 || explodeCollisions.length > 0 || floating.length > 0;
  const elapsedMs = Number((performance.now() - t0).toFixed(1));

  return {
    verdict: failed ? 'FAIL' : 'PASS',
    exitCode: failed ? SP_EXIT_FAIL : SP_EXIT_PASS,
    unitId: scene.unitId,
    quality: scene.quality,
    partCount: scene.parts.length,
    meshCount: activeMeshes.length,
    triCount: scene.totalTris,
    precisionMm: PRECISION_MM,
    collisions,
    smtSeating,
    smtSeatingCount: smtSeating.length,
    nearMisses,
    nearMissTotal: nearMisses.length,
    kissingCount,
    floating,
    explodeCollisions,
    elapsedMs,
  };
}

/**
 * Sightline & RF Emission Cone Raycasting (BG/SP Ray Mode).
 */
export function runRayConeCheck(scene, coneSpec, extraMeshes = []) {
  const t0 = performance.now();
  const [ox, oy, oz] = coneSpec.origin;
  const dLen = Math.hypot(coneSpec.dir[0], coneSpec.dir[1], coneSpec.dir[2]) || 1;
  const dx0 = coneSpec.dir[0] / dLen, dy0 = coneSpec.dir[1] / dLen, dz0 = coneSpec.dir[2] / dLen;
  const halfAngleRad = ((coneSpec.fovDeg || 60) * 0.5 * Math.PI) / 180;
  const rangeMm = coneSpec.rangeMm || 120;

  // Orthonormal basis (u, v, d)
  const up = Math.abs(dy0) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  let ux = up[1] * dz0 - up[2] * dy0;
  let uy = up[2] * dx0 - up[0] * dz0;
  let uz = up[0] * dy0 - up[1] * dx0;
  const uLen = Math.hypot(ux, uy, uz) || 1;
  ux /= uLen; uy /= uLen; uz /= uLen;
  const vx = dy0 * uz - dz0 * uy;
  const vy = dz0 * ux - dx0 * uz;
  const vz = dx0 * uy - dy0 * ux;

  // Build uniform Fibonacci / concentric-ring ray fan inside the cone
  const rays = [[dx0, dy0, dz0]];
  const rings = coneSpec.fovDeg <= 70 ? 6 : 5;
  for (let r = 1; r <= rings; r++) {
    const theta = (r / rings) * halfAngleRad;
    const sinT = Math.sin(theta), cosT = Math.cos(theta);
    const nAz = Math.max(8, Math.round(r * 7));
    for (let a = 0; a < nAz; a++) {
      const phi = (a / nAz) * Math.PI * 2;
      const cP = Math.cos(phi), sP = Math.sin(phi);
      rays.push([
        dx0 * cosT + (ux * cP + vx * sP) * sinT,
        dy0 * cosT + (uy * cP + vy * sP) * sinT,
        dz0 * cosT + (uz * cP + vz * sP) * sinT,
      ]);
    }
  }

  const ignoreIds = new Set(coneSpec.ignoreIds || []);
  const ignoreSubs = (coneSpec.ignoreSubstrings || []).map((s) => s.toLowerCase());
  const isIgnored = (m) => {
    if (ignoreIds.has(m.partId)) return true;
    const low = m.partId.toLowerCase();
    return ignoreSubs.some((s) => low.includes(s));
  };

  const occluders = new Map();
  let occludedCount = 0;

  for (const [rx, ry, rz] of rays) {
    let hitPart = null;
    let bestT = rangeMm;
    for (let i = 0; i < scene.meshes.length; i++) {
      const m = scene.meshes[i];
      if (isIgnored(m)) continue;
      const t = rayMeshHit(m, ox, oy, oz, rx, ry, rz, 0.2, bestT);
      if (t !== null && t < bestT) {
        bestT = t;
        hitPart = `${m.code} (${m.partId})`;
      }
    }
    for (const em of extraMeshes) {
      const t = rayMeshHit(em, ox, oy, oz, rx, ry, rz, 0.2, bestT);
      if (t !== null && t < bestT) {
        bestT = t;
        hitPart = `${em.code || 'CAND'} (${em.partId || 'candidate'})`;
      }
    }
    if (hitPart) {
      occludedCount++;
      occluders.set(hitPart, (occluders.get(hitPart) || 0) + 1);
    }
  }

  const pct = Number(((occludedCount / rays.length) * 100).toFixed(3));
  return {
    verdict: occludedCount === 0 ? 'PASS' : 'FAIL',
    exitCode: occludedCount === 0 ? SP_EXIT_PASS : SP_EXIT_FAIL,
    name: coneSpec.name || 'Custom Cone',
    fovDeg: coneSpec.fovDeg,
    rayCount: rays.length,
    occludedCount,
    occludedPct: pct,
    occluders: [...occluders.entries()].map(([part, count]) => ({ part, count })),
    elapsedMs: Number((performance.now() - t0).toFixed(1)),
  };
}

/**
 * Candidate Pre-Collision Simulation (sim) + optional Sightline Cone + --auto-fix solver.
 */
export function runCandidateSim(scene, candidates, opts = {}) {
  const t0 = performance.now();
  const origin = getFrameOrigin(scene, opts);
  const minClear = Number(opts.minClearance ?? 0.2);
  const conePresets = (opts.rayPresets || []).map((k) => RAY_PRESETS[k]).filter(Boolean);
  const results = [];
  let anyFail = false;

  for (const cand of candidates) {
    const candMesh = buildCandidateMesh(cand, origin);
    const ev = evaluateCandidateExact(scene, candMesh, {
      group: opts.group,
      minClearance: minClear,
      searchPad: 6.0,
      insidePartId: opts.insidePartId,
      ignoreIds: cand.ignoreIds || [],
    });

    const rayFailures = [];
    for (const preset of conePresets) {
      const rc = runRayConeCheck(scene, preset, [candMesh]);
      if (rc.occludedCount > 0) rayFailures.push(rc);
    }

    const ok = ev.collisionFree && ev.minGapMm >= minClear && rayFailures.length === 0;
    let autoFix = null;
    if (!ok && opts.autoFix) {
      autoFix = solveAutoFix(scene, cand, {
        group: opts.group,
        minClearance: minClear,
        insidePartId: opts.insidePartId,
        ignoreIds: cand.ignoreIds || [],
        rayGuard:
          conePresets.length > 0
            ? (movedMesh) => conePresets.every((pr) => runRayConeCheck(scene, pr, [movedMesh]).occludedCount === 0)
            : null,
      });
    }
    if (!ok) anyFail = true;
    results.push({
      id: cand.id || 'candidate',
      verdict: ok ? 'PASS' : 'FAIL',
      minGapMm: ev.minGapMm,
      nearestPart: ev.nearestPart,
      hits: ev.hits,
      outsideShell: ev.outsideShell,
      rayFailures,
      autoFix,
    });
  }

  return {
    verdict: anyFail ? 'FAIL' : 'PASS',
    exitCode: anyFail ? SP_EXIT_FAIL : SP_EXIT_PASS,
    results,
    elapsedMs: Number((performance.now() - t0).toFixed(1)),
  };
}

/**
 * Thermal Proximity, Mass, Volume, Center of Gravity & Tipping Angle Analysis.
 */
export function runThermalCogAnalysis(scene) {
  const t0 = performance.now();
  let totalVolMm3 = 0;
  let totalMassG = 0;
  let cx = 0, cy = 0, cz = 0;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, minZ = Infinity, maxZ = -Infinity;

  for (const p of scene.parts) {
    totalVolMm3 += p.volumeMm3 || 0;
    totalMassG += p.massG || 0;
    cx += (p.cog?.[0] || 0) * (p.massG || 0);
    cy += (p.cog?.[1] || 0) * (p.massG || 0);
    cz += (p.cog?.[2] || 0) * (p.massG || 0);
    if (p.box[1] < minY) minY = p.box[1];
  }

  // Footprint polygon from lowest 3 mm band (feet / baseplate)
  for (const p of scene.parts) {
    if (p.box[1] <= minY + 3.0) {
      if (p.box[0] < minX) minX = p.box[0];
      if (p.box[3] > maxX) maxX = p.box[3];
      if (p.box[2] < minZ) minZ = p.box[2];
      if (p.box[5] > maxZ) maxZ = p.box[5];
    }
  }

  const cogWorld = totalMassG > 1e-9 ? [cx / totalMassG, cy / totalMassG, cz / totalMassG] : [0, 0, 0];
  const hCog = Math.max(0.1, cogWorld[1] - minY);
  const radToDeg = 180 / Math.PI;
  const tipFront = Math.atan2(Math.max(0, maxZ - cogWorld[2]), hCog) * radToDeg;
  const tipRear = Math.atan2(Math.max(0, cogWorld[2] - minZ), hCog) * radToDeg;
  const tipLeft = Math.atan2(Math.max(0, cogWorld[0] - minX), hCog) * radToDeg;
  const tipRight = Math.atan2(Math.max(0, maxX - cogWorld[0]), hCog) * radToDeg;
  const minTip = Math.min(tipFront, tipRear, tipLeft, tipRight);

  // Closest heat-source <-> thermal-sensitive exact distances
  const sources = scene.parts.filter((p) => p.role === 'heat_source' || p.role === 'thermal_source');
  const sensitives = scene.parts.filter((p) => p.role === 'thermal_sensitive');
  const thermalPairs = [];
  for (const hs of sources) {
    for (const sp of sensitives) {
      if (hs.id === sp.id) continue;
      if (boxBoxMinDistSq(hs.box, sp.box) > 100) continue; // > 10mm skip
      let minD = Infinity;
      for (let i = hs.meshStart; i < hs.meshStart + hs.meshCount; i++) {
        for (let j = sp.meshStart; j < sp.meshStart + sp.meshCount; j++) {
          const d = exactMeshPairMinDistance(scene.meshes[i], scene.meshes[j], minD);
          if (d < minD) minD = d;
        }
      }
      if (Number.isFinite(minD)) {
        thermalPairs.push({
          distMm: Number(minD.toFixed(3)),
          status: minD < 2.0 ? 'TIGHT_THERMAL' : 'OK',
          source: `${hs.code} (${hs.id})`,
          sensitive: `${sp.code} (${sp.id})`,
        });
      }
    }
  }
  thermalPairs.sort((a, b) => a.distMm - b.distMm);

  return {
    verdict: minTip >= 15 ? 'PASS' : 'WARN',
    exitCode: minTip >= 15 ? SP_EXIT_PASS : SP_EXIT_WARN,
    unitId: scene.unitId,
    massG: Number(totalMassG.toFixed(3)),
    volumeCm3: Number((totalVolMm3 / 1000).toFixed(3)),
    cogWorld: cogWorld.map((v) => Number(v.toFixed(3))),
    hCogMm: Number(hCog.toFixed(3)),
    tippingDeg: {
      front: Number(tipFront.toFixed(3)),
      rear: Number(tipRear.toFixed(3)),
      left: Number(tipLeft.toFixed(3)),
      right: Number(tipRight.toFixed(3)),
      min: Number(minTip.toFixed(3)),
    },
    thermalPairs: thermalPairs.slice(0, 8),
    elapsedMs: Number((performance.now() - t0).toFixed(1)),
  };
}

export function saveSnapshot(scene, outPath) {
  const tc = runThermalCogAnalysis(scene);
  const snap = {
    schema: 'sp-snapshot/v1',
    unitId: scene.unitId,
    quality: scene.quality,
    partCount: scene.parts.length,
    triCount: scene.totalTris,
    massG: tc.massG,
    volumeCm3: tc.volumeCm3,
    cogWorld: tc.cogWorld,
    partIds: scene.parts.map((p) => p.id),
  };
  fs.writeFileSync(outPath, JSON.stringify(snap, null, 2));
  return snap;
}

export function diffSnapshot(scene, snapPath) {
  const base = JSON.parse(fs.readFileSync(snapPath, 'utf8'));
  const cur = runThermalCogAnalysis(scene);
  return {
    verdict: 'PASS',
    exitCode: SP_EXIT_PASS,
    from: `${base.unitId}(${base.partCount}p)`,
    to: `${scene.unitId}(${scene.parts.length}p)`,
    deltaParts: scene.parts.length - base.partCount,
    deltaTris: scene.totalTris - base.triCount,
    deltaMassG: Number((cur.massG - base.massG).toFixed(3)),
    deltaVolCm3: Number((cur.volumeCm3 - base.volumeCm3).toFixed(3)),
    deltaCog: [
      Number((cur.cogWorld[0] - base.cogWorld[0]).toFixed(3)),
      Number((cur.cogWorld[1] - base.cogWorld[1]).toFixed(3)),
      Number((cur.cogWorld[2] - base.cogWorld[2]).toFixed(3)),
    ],
  };
}

/**
 * 20-Case Mathematical Oracle Self-Test Suite (0.001 mm certified).
 */
export function runSpatialSelfTest() {
  const t0 = performance.now();
  const cases = [];
  const assert = (c, m) => { if (!c) throw new Error(m); };
  const run = (id, name, fn) => {
    const s = performance.now();
    try {
      fn();
      cases.push({ id, name, ok: true, ms: Number((performance.now() - s).toFixed(2)) });
    } catch (e) {
      cases.push({ id, name, ok: false, ms: Number((performance.now() - s).toFixed(2)), error: e.message });
    }
  };

  run('M01', '0.001 mm exact separation PASS (no false positive)', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10]);
    const b = buildBoxMesh([10.001, 0, 0], [10, 10, 10]);
    const r = meshPairExactCheck(a, b, { computeMinDist: true });
    assert(!r.intersects && Math.abs(r.minDistMm - 0.001) < 1e-6, `got ${JSON.stringify(r)}`);
  });

  run('M02', '0.001 mm exact penetration FAIL (no false negative)', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10]);
    const b = buildBoxMesh([9.999, 0, 0], [10, 10, 10]);
    const r = meshPairExactCheck(a, b);
    assert(r.intersects && Math.abs(r.penMm - 0.001) < 0.0005, `got ${JSON.stringify(r)}`);
  });

  run('M03', '45° rotated prism exact clearance (0.6569 mm)', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 45, 0]);
    const b = buildBoxMesh([12.728, 0, 0], [10, 10, 10]);
    const expected = 12.728 - 5 - 5 * Math.SQRT2;
    const r = meshPairExactCheck(a, b, { computeMinDist: true });
    assert(!r.intersects && Math.abs(r.minDistMm - expected) < 0.001, `got ${r.minDistMm} vs ${expected}`);
  });

  run('M04', 'Coplanar overlapping faces detected via 2D SAT', () => {
    const a = buildBoxMesh([0, 0, 0], [10, 10, 10]);
    const b = buildBoxMesh([5, 0, 0], [10, 10, 10]);
    const r = meshPairExactCheck(a, b);
    assert(r.intersects, 'coplanar overlap missed');
  });

  run('M05', 'Strict full containment A inside B (Generalized Winding Number)', () => {
    const outer = buildBoxMesh([0, 0, 0], [20, 20, 20]);
    const inner = buildBoxMesh([0, 0, 0], [4, 4, 4]);
    const r = meshPairExactCheck(inner, outer);
    assert(r.intersects && r.contained === 'A_IN_B', `got ${JSON.stringify(r)}`);
  });

  run('M06', 'Strict full containment B inside A (symmetric)', () => {
    const outer = buildBoxMesh([0, 0, 0], [20, 20, 20]);
    const inner = buildBoxMesh([0, 0, 0], [4, 4, 4]);
    const r = meshPairExactCheck(outer, inner);
    assert(r.intersects && r.contained === 'B_IN_A', `got ${JSON.stringify(r)}`);
  });

  run('M07', 'Non-watertight mesh containment resilience (missing 1 face)', () => {
    const box = buildBoxMesh([0, 0, 0], [20, 20, 20]);
    const openMesh = { ...box, tris: box.tris.subarray(0, box.tris.length - 18), _triBvh: null };
    assert(pointInMeshWinding(openMesh, 0, 0, 0) === true, 'center should still be inside');
    assert(pointInMeshWinding(openMesh, 15, 0, 0) === false, 'exterior should be outside');
  });

  run('M08', 'Hollow cavity clearance PASS (part nested inside open frame)', () => {
    const wallL = buildBoxMesh([-10, 0, 0], [2, 20, 10]);
    const wallR = buildBoxMesh([10, 0, 0], [2, 20, 10]);
    const inner = buildBoxMesh([0, 0, 0], [10, 10, 4]);
    assert(!meshPairExactCheck(inner, wallL).intersects && !meshPairExactCheck(inner, wallR).intersects, 'false hit in cavity');
  });

  run('M09', 'Hollow cavity wall penetration by 0.001 mm FAIL', () => {
    const wallR = buildBoxMesh([10, 0, 0], [2, 20, 10]); // x in [9, 11]
    const inner = buildBoxMesh([4.001, 0, 0], [10, 10, 4]); // x max = 9.001
    const r = meshPairExactCheck(inner, wallR);
    assert(r.intersects, '0.001mm wall graze missed');
  });

  run('M10', 'Cylinder exact clearance & collision', () => {
    const c1 = buildCylinderMesh([0, 0, 0], 5, 10, 'y', [0, 0, 0], 48);
    const c2 = buildCylinderMesh([10.05, 0, 0], 5, 10, 'y', [0, 0, 0], 48);
    const c3 = buildCylinderMesh([9.9, 0, 0], 5, 10, 'y', [0, 0, 0], 48);
    assert(!meshPairExactCheck(c1, c2).intersects, 'separated cylinders collided');
    assert(meshPairExactCheck(c1, c3).intersects, 'overlapping cylinders missed');
  });

  run('M11', 'Sphere exact separation & overlap', () => {
    const s1 = buildSphereMesh([0, 0, 0], 5, 32);
    const s2 = buildSphereMesh([10.1, 0, 0], 5, 32);
    const s3 = buildSphereMesh([9.8, 0, 0], 5, 32);
    assert(!meshPairExactCheck(s1, s2).intersects && meshPairExactCheck(s1, s3).intersects, 'sphere check failed');
  });

  run('M12', 'Capsule exact separation & overlap', () => {
    const k1 = buildCapsuleMesh([0, 0, 0], 2, 10, 'x');
    const k2 = buildCapsuleMesh([0, 4.1, 0], 2, 10, 'x');
    const k3 = buildCapsuleMesh([0, 3.8, 0], 2, 10, 'x');
    assert(!meshPairExactCheck(k1, k2).intersects && meshPairExactCheck(k1, k3).intersects, 'capsule check failed');
  });

  run('M13', 'Continuous SDF sign & magnitude at ±0.005 mm across surface', () => {
    const b = buildBoxMesh([0, 0, 0], [10, 10, 10]); // x = ±5
    const sOut = pointToMeshSignedDist(b, 5.005, 0, 0);
    const sIn = pointToMeshSignedDist(b, 4.995, 0, 0);
    assert(Math.abs(sOut - 0.005) < 1e-5, `sOut=${sOut}`);
    assert(Math.abs(sIn + 0.005) < 1e-5, `sIn=${sIn}`);
  });

  run('M14', 'Divergence-theorem exact volume (10×20×30 = 6000.0000 mm³)', () => {
    const b = buildBoxMesh([3, -4, 5], [10, 20, 30]);
    const v = computeMeshSignedVolumeAndCentroid(b.tris);
    assert(Math.abs(v.volumeMm3 - 6000) < 1e-5, `vol=${v.volumeMm3}`);
    assert(Math.abs(v.centroid[0] - 3) < 1e-5 && Math.abs(v.centroid[1] + 4) < 1e-5, `cog=${v.centroid}`);
  });

  run('M15', 'Moller-Trumbore 63° sightline cone detects blocker & passes clear cone', () => {
    const blocker = buildBoxMesh([0, 0, 30], [4, 4, 2], [0, 0, 0], { partId: 'blk', code: 'BLK' });
    const mockScene = { meshes: [blocker] };
    const rHit = runRayConeCheck(mockScene, { name: 'test', origin: [0, 0, 0], dir: [0, 0, 1], fovDeg: 63, rangeMm: 80 });
    assert(rHit.occludedCount > 0, 'ray cone missed blocker');
    const rClr = runRayConeCheck({ meshes: [] }, { name: 'test', origin: [0, 0, 0], dir: [0, 0, 1], fovDeg: 63, rangeMm: 80 });
    assert(rClr.occludedCount === 0, 'empty cone occluded');
  });

  run('M16', '--auto-fix 26-dir binary search finds exact minimal escape displacement', () => {
    const obs = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 0, partId: 'obs', code: 'OBS', groupKey: 'g' });
    const mockScene = {
      meshes: [obs],
      parts: [{ id: 'obs', code: 'OBS', box: obs.box }],
      sceneBvh: buildFlatBvh([obs.box]),
      groupOrigins: { g: [0, 0, 0] },
    };
    const fix = solveAutoFix(mockScene, { shape: 'box', pos: [4, 0, 0], size: [4, 4, 4] }, { minClearance: 0.5, group: 'g' });
    assert(fix && Math.abs(fix.shiftMm - 3.5) < 0.05 && fix.minGapMm >= 0.49, `bad fix=${JSON.stringify(fix)}`);
  });

  run('M17', 'SMT_SOLDER_SEAT <= 0.25mm separated from solid collisions in audit', () => {
    const pcb = buildBoxMesh([0, 0, 0], [20, 1.6, 20], [0, 0, 0], { partIdx: 0, partId: 'p1', code: 'W1', groupKey: 'g', role: 'pcb' });
    const ic = buildBoxMesh([0, 1.25, 0], [4, 1.0, 4], [0, 0, 0], { partIdx: 1, partId: 'p2', code: 'W2', groupKey: 'g', role: 'smt_ic' }); // overlaps 0.05mm
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'p1', code: 'W1', groupKey: 'g', role: 'pcb', explodeOffset: [0, 0, 0], box: pcb.box, meshStart: 0, meshCount: 1 },
        { id: 'p2', code: 'W2', groupKey: 'g', role: 'smt_ic', explodeOffset: [0, 5, 0], box: ic.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [pcb, ic],
    };
    const a = runUnitAudit(mockScene);
    assert(a.collisions.length === 0 && a.smtSeatingCount === 1, `smt not separated: ${JSON.stringify(a)}`);
  });

  run('M18', 'Explode trajectory sweep catches mid-flight crossing collision', () => {
    const mA = buildBoxMesh([-5, 0, 0], [4, 4, 4], [0, 0, 0], { partIdx: 0, partId: 'a', code: 'A', groupKey: 'g', role: 'mechanical' });
    const mB = buildBoxMesh([5, 0, 0], [4, 4, 4], [0, 0, 0], { partIdx: 1, partId: 'b', code: 'B', groupKey: 'g', role: 'mechanical' });
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'a', code: 'A', groupKey: 'g', role: 'mechanical', explodeOffset: [20, 0, 0], box: mA.box, meshStart: 0, meshCount: 1 },
        { id: 'b', code: 'B', groupKey: 'g', role: 'mechanical', explodeOffset: [-20, 0, 0], box: mB.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [mA, mB],
    };
    const a = runUnitAudit(mockScene, { explodeSteps: 8 });
    assert(a.collisions.length === 0 && a.explodeCollisions.length === 1, `explode hit missed: ${JSON.stringify(a)}`);
  });

  run('M19', 'Floating part detector flags isolated part > 4 mm from neighbors', () => {
    const mA = buildBoxMesh([0, 0, 0], [10, 10, 10], [0, 0, 0], { partIdx: 0, partId: 'a', code: 'A', groupKey: 'g', role: 'chassis' });
    const mB = buildBoxMesh([30, 0, 0], [4, 4, 4], [0, 0, 0], { partIdx: 1, partId: 'b', code: 'B', groupKey: 'g', role: 'mechanical' });
    const mockScene = {
      unitId: 'test', quality: 'ultra', totalTris: 24,
      parts: [
        { id: 'a', code: 'A', groupKey: 'g', role: 'chassis', explodeOffset: [0, 0, 0], box: mA.box, meshStart: 0, meshCount: 1 },
        { id: 'b', code: 'B', groupKey: 'g', role: 'mechanical', explodeOffset: [0, 0, 0], box: mB.box, meshStart: 1, meshCount: 1 },
      ],
      meshes: [mA, mB],
    };
    const a = runUnitAudit(mockScene, { checkFloating: true });
    assert(a.floating.length === 2, `floating not detected: ${JSON.stringify(a.floating)}`);
  });

  run('M20', 'Outer-shell containment check catches protrusion outside envelope', () => {
    const shell = buildBoxMesh([0, 0, 0], [20, 20, 20], [0, 0, 0], { partIdx: 0, partId: 'shell', code: 'SH', groupKey: 'g' });
    const mockScene = {
      meshes: [],
      parts: [{ id: 'shell', code: 'SH', box: shell.box }],
      sceneBvh: buildFlatBvh([]),
    };
    const cand = buildBoxMesh([12, 0, 0], [4, 4, 4]);
    const ev = evaluateCandidateExact(mockScene, cand, { insidePartId: 'shell' });
    assert(ev.outsideShell === true && ev.collisionFree === false, `outside shell missed: ${JSON.stringify(ev)}`);
  });

  const passed = cases.filter((c) => c.ok).length;
  return {
    verdict: passed === cases.length ? 'PASS' : 'FAIL',
    exitCode: passed === cases.length ? SP_EXIT_PASS : SP_EXIT_FAIL,
    precisionMm: PRECISION_MM,
    passed,
    total: cases.length,
    elapsedMs: Number((performance.now() - t0).toFixed(1)),
    cases,
  };
}
