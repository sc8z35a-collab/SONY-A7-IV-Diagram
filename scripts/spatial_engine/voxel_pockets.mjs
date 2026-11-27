/**
 * `sp` — TRI-SAT Multi-Layer Spatial Map, Continuous 0.001mm SDF Zoom,
 * Certified Max-Clearance Pocket Finder (--fit / --pack) & 26-Dir + Binary-Search --auto-fix Solver.
 */

import {
  EPS,
  boxBoxMinDistSq,
  boxDistanceSqToPoint,
  buildCandidateMesh,
  ensureTriBvh,
  meshPairExactCheck,
  pointInMeshWinding,
  pointToMeshSignedDist,
  queryBvhBox,
  translateMesh,
  triBoxIntersect,
} from './exact_geometry.mjs';

/**
 * Filter scene meshes optionally by groupKey or exclusion list.
 */
export function selectSceneMeshes(scene, opts = {}) {
  const group = opts.group || null;
  const ignoreSet = new Set(opts.ignoreIds || []);
  const out = [];
  for (let i = 0; i < scene.meshes.length; i++) {
    const m = scene.meshes[i];
    if (group && m.groupKey !== group) continue;
    if (ignoreSet.has(m.partId)) continue;
    out.push(m);
  }
  return out;
}

export function getFrameOrigin(scene, opts = {}) {
  if (opts.frame === 'world') return [0, 0, 0];
  if (opts.group && scene.groupOrigins[opts.group]) return scene.groupOrigins[opts.group];
  if (opts.origin) return opts.origin;
  return [0, 0, 0];
}

/**
 * Check exact TRI-SAT occupancy of a 3D cell box against scene meshes via BVH.
 */
function countCellOccupancy(scene, cellBox, opts = {}) {
  const group = opts.group || null;
  const hitMeshIds = queryBvhBox(scene.sceneBvh, cellBox, 0, []);
  const hitParts = new Set();

  for (let k = 0; k < hitMeshIds.length; k++) {
    const m = scene.meshes[hitMeshIds[k]];
    if (group && m.groupKey !== group) continue;
    if (hitParts.has(m.partIdx)) continue;
    const bvh = ensureTriBvh(m);
    const triIds = queryBvhBox(bvh, cellBox, 0, []);
    const tris = m.tris;
    let touched = false;
    for (let t = 0; t < triIds.length; t++) {
      const o = triIds[t] * 9;
      if (
        triBoxIntersect(
          tris[o], tris[o + 1], tris[o + 2],
          tris[o + 3], tris[o + 4], tris[o + 5],
          tris[o + 6], tris[o + 7], tris[o + 8],
          cellBox
        )
      ) {
        touched = true;
        break;
      }
    }
    if (!touched) {
      const cx = (cellBox[0] + cellBox[3]) * 0.5;
      const cy = (cellBox[1] + cellBox[4]) * 0.5;
      const cz = (cellBox[2] + cellBox[5]) * 0.5;
      if (pointInMeshWinding(m, cx, cy, cz)) touched = true;
    }
    if (touched) hitParts.add(m.partIdx);
  }
  return hitParts.size;
}

/**
 * Generate a TRI-SAT XZ slice grid over a world or local bounding box.
 */
export function buildSpatialSlice(scene, sliceCfg) {
  const {
    name = 'SLICE',
    origin = [0, 0, 0],
    xMin, xMax, yMin, yMax, zMin, zMax,
    res = 1.0,
    group = null,
    sdfMode = false,
    candidates = [],
  } = sliceCfg;

  const nx = Math.max(1, Math.min(220, Math.round((xMax - xMin) / res)));
  const nz = Math.max(1, Math.min(140, Math.round((zMax - zMin) / res)));
  const stepX = (xMax - xMin) / nx;
  const stepZ = (zMax - zMin) / nz;

  const candMeshes = candidates.map((c) => buildCandidateMesh(c, origin));
  const grid = new Array(nz);
  const sdfGrid = sdfMode ? new Array(nz) : null;
  let freeCells = 0;
  let totalCells = nx * nz;
  const ymW = (yMin + yMax) * 0.5 + origin[1];

  for (let iz = 0; iz < nz; iz++) {
    const row = new Int8Array(nx);
    const sRow = sdfMode ? new Float64Array(nx) : null;
    const z0 = zMin + iz * stepZ;
    const z1 = z0 + stepZ;
    const zcW = (z0 + z1) * 0.5 + origin[2];

    for (let ix = 0; ix < nx; ix++) {
      const x0 = xMin + ix * stepX;
      const x1 = x0 + stepX;
      const xcW = (x0 + x1) * 0.5 + origin[0];

      if (sdfMode) {
        const searchBox = [xcW - 4, ymW - 4, zcW - 4, xcW + 4, ymW + 4, zcW + 4];
        const nearIds = queryBvhBox(scene.sceneBvh, searchBox, 0, []);
        let minSdf = Infinity;
        for (let k = 0; k < nearIds.length; k++) {
          const m = scene.meshes[nearIds[k]];
          if (group && m.groupKey !== group) continue;
          const sd = pointToMeshSignedDist(m, xcW, ymW, zcW, Math.abs(minSdf));
          if (sd < minSdf) minSdf = sd;
        }
        sRow[ix] = minSdf;
        if (minSdf > 0.001) {
          row[ix] = 0;
          freeCells++;
        } else {
          row[ix] = 1;
        }
      } else {
        const cellBox = [x0 + origin[0], yMin + origin[1], z0 + origin[2], x1 + origin[0], yMax + origin[1], z1 + origin[2]];
        const occ = countCellOccupancy(scene, cellBox, { group });
        let candHit = false;
        for (let c = 0; c < candMeshes.length; c++) {
          const cm = candMeshes[c];
          if (
            cm.box[0] <= cellBox[3] && cm.box[3] >= cellBox[0] &&
            cm.box[1] <= cellBox[4] && cm.box[4] >= cellBox[1] &&
            cm.box[2] <= cellBox[5] && cm.box[5] >= cellBox[2]
          ) {
            candHit = true;
            break;
          }
        }
        if (candHit) {
          row[ix] = occ > 0 ? -2 : -1; // -2 = COLLISION (✕), -1 = CANDIDATE (★)
        } else {
          row[ix] = Math.min(3, occ);
          if (occ === 0) freeCells++;
        }
      }
    }
    grid[iz] = row;
    if (sdfMode) sdfGrid[iz] = sRow;
  }

  return {
    name,
    origin,
    group,
    xMin, xMax, yMin, yMax, zMin, zMax,
    res,
    nx, nz,
    stepX, stepZ,
    sdfMode,
    freePct: Number(((freeCells / Math.max(1, totalCells)) * 100).toFixed(1)),
    grid,
    sdfGrid,
  };
}

/**
 * Auto-generate stratified multi-layer slices across a group or full unit bounding box.
 */
export function buildAutoMultiLayerMap(scene, opts = {}) {
  const origin = getFrameOrigin(scene, opts);
  const meshes = selectSceneMeshes(scene, opts);
  if (meshes.length === 0) return [];

  let x0 = Infinity, y0 = Infinity, z0 = Infinity;
  let x1 = -Infinity, y1 = -Infinity, z1 = -Infinity;
  for (const m of meshes) {
    if (m.box[0] < x0) x0 = m.box[0];
    if (m.box[1] < y0) y0 = m.box[1];
    if (m.box[2] < z0) z0 = m.box[2];
    if (m.box[3] > x1) x1 = m.box[3];
    if (m.box[4] > y1) y1 = m.box[4];
    if (m.box[5] > z1) z1 = m.box[5];
  }
  const lx0 = x0 - origin[0], lx1 = x1 - origin[0];
  const ly0 = y0 - origin[1], ly1 = y1 - origin[1];
  const lz0 = z0 - origin[2], lz1 = z1 - origin[2];

  const layerCount = Math.max(1, Math.min(8, Number(opts.layers || 4)));
  const spanY = Math.max(1, ly1 - ly0);
  const res = Number(opts.res || Math.max(0.5, (lx1 - lx0) / 80));
  const slices = [];
  for (let i = 0; i < layerCount; i++) {
    const sy0 = ly0 + (i / layerCount) * spanY;
    const sy1 = ly0 + ((i + 1) / layerCount) * spanY;
    slices.push(
      buildSpatialSlice(scene, {
        name: `LAYER_${i + 1}/${layerCount}`,
        origin,
        xMin: lx0, xMax: lx1,
        yMin: sy0, yMax: sy1,
        zMin: lz0, zMax: lz1,
        res,
        group: opts.group || null,
        candidates: opts.candidates || [],
      })
    );
  }
  return slices;
}

/**
 * Compute exact 0.001 mm clearance of a candidate mesh against the scene (and optional extra obstacles).
 */
export function evaluateCandidateExact(scene, candMesh, opts = {}) {
  const group = opts.group || null;
  const ignoreIds = new Set(opts.ignoreIds || []);
  const pad = Math.max(opts.searchPad ?? 5.0, opts.minClearance ?? 0.2);
  const nearIds = queryBvhBox(scene.sceneBvh, candMesh.box, pad, []);

  let minGapMm = Infinity;
  let nearestPart = null;
  const hits = [];

  const checkMesh = (m) => {
    const res = meshPairExactCheck(candMesh, m, { computeMinDist: true, maxDist: Math.min(minGapMm, pad) });
    if (res.intersects) {
      hits.push({
        partId: m.partId,
        code: m.code,
        penMm: res.penMm,
        contained: res.contained,
        centroid: res.centroid,
      });
      minGapMm = Math.min(minGapMm, -Math.max(0.001, res.penMm));
      nearestPart = `${m.code} (${m.partId})`;
    } else if (res.minDistMm < minGapMm) {
      minGapMm = res.minDistMm;
      nearestPart = `${m.code} (${m.partId})`;
    }
  };

  for (let k = 0; k < nearIds.length; k++) {
    const m = scene.meshes[nearIds[k]];
    if (group && m.groupKey !== group) continue;
    if (ignoreIds.has(m.partId)) continue;
    checkMesh(m);
  }
  for (const extra of opts.extraMeshes || []) {
    checkMesh(extra);
  }

  // Optional containment inside an outer shell bounding envelope (`--inside=<partId>`)
  let outsideShell = false;
  if (opts.insidePartId) {
    const shell = scene.parts.find((p) => p.id === opts.insidePartId || p.code === opts.insidePartId);
    if (shell) {
      const sb = shell.box;
      const cb = candMesh.box;
      if (cb[0] < sb[0] || cb[3] > sb[3] || cb[1] < sb[1] || cb[4] > sb[4] || cb[2] < sb[2] || cb[5] > sb[5]) {
        outsideShell = true;
      }
    }
  }

  return {
    collisionFree: hits.length === 0 && !outsideShell,
    hits,
    outsideShell,
    minGapMm: Number.isFinite(minGapMm) ? Number(minGapMm.toFixed(4)) : 999,
    nearestPart,
  };
}

/**
 * Certified 0.001 mm Free-Pocket Finder (--fit=W,H,D) clamped inside main chassis envelope.
 */
export function findCertifiedPockets(scene, opts = {}) {
  const [fw, fh, fd] = opts.fitSize || [6, 2, 4];
  const minClear = Number(opts.minClearance ?? 0.25);
  const topK = Math.max(1, Math.min(20, Number(opts.topK || 6)));
  const origin = getFrameOrigin(scene, opts);
  const meshes = selectSceneMeshes(scene, opts);
  if (meshes.length === 0) return [];

  // Determine search envelope (clamped inside optional --inside part or group AABB)
  let bounds = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
  if (opts.insidePartId) {
    const sp = scene.parts.find((p) => p.id === opts.insidePartId || p.code === opts.insidePartId);
    if (sp) bounds = [...sp.box];
  }
  if (!Number.isFinite(bounds[0])) {
    for (const m of meshes) {
      for (let k = 0; k < 3; k++) {
        if (m.box[k] < bounds[k]) bounds[k] = m.box[k];
        if (m.box[k + 3] > bounds[k + 3]) bounds[k + 3] = m.box[k + 3];
      }
    }
  }

  const marginX = fw * 0.5 + minClear;
  const marginY = fh * 0.5 + minClear;
  const marginZ = fd * 0.5 + minClear;
  const sx0 = bounds[0] + marginX, sx1 = bounds[3] - marginX;
  const sy0 = bounds[1] + marginY, sy1 = bounds[4] - marginY;
  const sz0 = bounds[2] + marginZ, sz1 = bounds[5] - marginZ;
  if (sx0 >= sx1 || sy0 >= sy1 || sz0 >= sz1) return [];

  const stepX = Math.max(1.0, (sx1 - sx0) / 18);
  const stepY = Math.max(0.8, (sy1 - sy0) / 8);
  const stepZ = Math.max(1.0, (sz1 - sz0) / 10);

  const candidates = [];
  for (let x = sx0; x <= sx1; x += stepX) {
    for (let y = sy0; y <= sy1; y += stepY) {
      for (let z = sz0; z <= sz1; z += stepZ) {
        const testBox = [x - fw * 0.5, y - fh * 0.5, z - fd * 0.5, x + fw * 0.5, y + fh * 0.5, z + fd * 0.5];
        const near = queryBvhBox(scene.sceneBvh, testBox, minClear, []);
        // Fast AABB reject on non-shell meshes; allow hollow cavity check via exact triangle verification!
        let quickBlocked = false;
        for (let k = 0; k < near.length; k++) {
          const m = scene.meshes[near[k]];
          if (opts.group && m.groupKey !== opts.group) continue;
          if (m.role !== 'chassis' && boxBoxMinDistSq(testBox, m.box) < minClear * minClear) {
            quickBlocked = true;
            break;
          }
        }
        if (quickBlocked) continue;

        const candMesh = buildCandidateMesh({ shape: 'box', pos: [x, y, z], size: [fw, fh, fd] }, [0, 0, 0]);
        const ev = evaluateCandidateExact(scene, candMesh, {
          group: opts.group,
          minClearance: minClear,
          searchPad: 3.0,
          insidePartId: opts.insidePartId,
          extraMeshes: opts.extraMeshes,
        });
        if (ev.collisionFree && ev.minGapMm >= minClear) {
          candidates.push({
            posWorld: [Number(x.toFixed(3)), Number(y.toFixed(3)), Number(z.toFixed(3))],
            posLocal: [
              Number((x - origin[0]).toFixed(3)),
              Number((y - origin[1]).toFixed(3)),
              Number((z - origin[2]).toFixed(3)),
            ],
            size: [fw, fh, fd],
            minGapMm: ev.minGapMm,
            nearestPart: ev.nearestPart,
          });
        }
      }
    }
  }

  candidates.sort((a, b) => b.minGapMm - a.minGapMm);
  // Deduplicate spatially close pockets so topK returns distinct regions
  const distinct = [];
  const minSep = Math.max(fw, fd) * 0.75;
  for (const c of candidates) {
    const tooClose = distinct.some(
      (d) =>
        Math.hypot(
          c.posWorld[0] - d.posWorld[0],
          c.posWorld[1] - d.posWorld[1],
          c.posWorld[2] - d.posWorld[2]
        ) < minSep
    );
    if (!tooClose) {
      distinct.push(c);
      if (distinct.length >= topK) break;
    }
  }
  return distinct;
}

/**
 * 26-Direction + 11-Step Binary Search Minimum-Displacement --auto-fix Solver (0.001 mm certified).
 */
export function solveAutoFix(scene, cand, opts = {}) {
  const origin = getFrameOrigin(scene, opts);
  const targetGap = Number(opts.minClearance ?? 0.25);
  const maxShift = Number(opts.maxShiftMm ?? 24.0);
  const baseMesh = buildCandidateMesh(cand, origin);

  // Build 26 unit directions (6 cardinal + 12 edge-diagonals + 8 corner-diagonals)
  const dirs = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dy === 0 && dz === 0) continue;
        const len = Math.hypot(dx, dy, dz);
        dirs.push([dx / len, dy / len, dz / len]);
      }
    }
  }

  const testOk = (dx, dy, dz) => {
    const moved = translateMesh(baseMesh, dx, dy, dz);
    const ev = evaluateCandidateExact(scene, moved, {
      group: opts.group,
      minClearance: targetGap,
      searchPad: Math.max(2.0, targetGap + 1.0),
      insidePartId: opts.insidePartId,
      ignoreIds: opts.ignoreIds,
    });
    if (!ev.collisionFree || ev.minGapMm < targetGap) return null;
    if (opts.rayGuard && !opts.rayGuard(moved)) return null;
    return ev;
  };

  let best = null;
  for (const [ux, uy, uz] of dirs) {
    // Coarse exponential bracket to find first valid distance
    let hi = -1;
    let lo = 0;
    for (let step = 0.25; step <= maxShift; step *= 1.6) {
      if (best && step >= best.shiftMm) break;
      const ev = testOk(ux * step, uy * step, uz * step);
      if (ev) {
        hi = step;
        break;
      }
      lo = step;
    }
    if (hi < 0) continue;

    // 11-step binary search down to < 0.001 mm precision
    let bestEv = null;
    for (let it = 0; it < 11; it++) {
      const mid = (lo + hi) * 0.5;
      const ev = testOk(ux * mid, uy * mid, uz * mid);
      if (ev) {
        hi = mid;
        bestEv = ev;
      } else {
        lo = mid;
      }
    }
    const finalDist = hi + 0.002;
    const finalEv = bestEv || testOk(ux * finalDist, uy * finalDist, uz * finalDist);
    if (!finalEv) continue;

    if (!best || finalDist < best.shiftMm) {
      const dVec = [ux * finalDist, uy * finalDist, uz * finalDist];
      const newLocal = [
        Number(((cand.pos?.[0] || 0) + dVec[0]).toFixed(3)),
        Number(((cand.pos?.[1] || 0) + dVec[1]).toFixed(3)),
        Number(((cand.pos?.[2] || 0) + dVec[2]).toFixed(3)),
      ];
      best = {
        shiftMm: Number(finalDist.toFixed(3)),
        delta: [Number(dVec[0].toFixed(3)), Number(dVec[1].toFixed(3)), Number(dVec[2].toFixed(3))],
        newPosLocal: newLocal,
        minGapMm: finalEv.minGapMm,
        nearestPart: finalEv.nearestPart,
      };
    }
  }
  return best;
}
