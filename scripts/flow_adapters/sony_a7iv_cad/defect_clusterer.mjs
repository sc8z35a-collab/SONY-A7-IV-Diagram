/**
 * FLOW V1 OS — Full-Defect Extractor & Causal Root-Cause Clusterer
 * Extracts ALL defects across all 10 EXAM pillars (zero `list[0]` truncation),
 * decomposes coupled parts into independent spatial islands, identifies parent-shift cascades,
 * and classifies Tier-A (0-LLM-token coupled auto-solvable) vs Tier-B (shape redesign).
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { runRayConeCheck, runUnitAudit } from '../../spatial_engine/audit_physics.mjs';
import { exactMeshPairMinDistance } from '../../spatial_engine/exact_geometry.mjs';
import { RAY_PRESETS } from '../../spatial_engine/scene_extractor.mjs';
import { writeTlxmBinary } from '../../exam/ir_compiler.mjs';
import { getNativeBin } from '../../exam/engines/solver_exec.mjs';

const SEAT_MAX_MM = 0.08;
const TIM_MAX_MM = 0.04;

function runFastNativeFclContacts(scene) {
  if (!scene || (scene.parts.length <= 120 && (scene.totalTris || 0) <= 25000)) return null;
  let fclBin;
  try {
    fclBin = getNativeBin('fcl_ccd_router');
    if (!fs.existsSync(fclBin)) return null;
  } catch {
    return null;
  }
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'flow_fcl_'));
  const tlxmPath = path.join(tmpDir, 'scene.tlxm');
  const outPath = path.join(tmpDir, 'fcl.json');
  try {
    const irLike = {
      parts: scene.parts.map((p) => ({
        massG: p.massG || 1,
        volumeMm3: p.volumeMm3 || 1,
        cog: p.cog || [0, 0, 0],
        box: p.box || [0, 0, 0, 0, 0, 0],
        explodeVec: p.explodeOffset || [0, 0, 0],
        flags: 0,
        mat: { E: 70000, sy: 160, k: 120, cte: 23, mu: 0.25 },
      })),
      meshes: scene.meshes.map((m) => ({ partIdx: m.partIdx, tris: m.tris })),
    };
    writeTlxmBinary(tlxmPath, irLike);
    const res = spawnSync(fclBin, [tlxmPath, '--contact-max=2.5', `--out=${outPath}`], {
      encoding: 'utf8',
      timeout: 60_000,
    });
    if (res.status !== 0 || !fs.existsSync(outPath)) return null;
    const data = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    return data.contacts || null;
  } catch {
    return null;
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

export function classifyPartPriority(part, sceneMinY) {
  const hay = `${part.id} ${part.title || ''} ${part.role || ''}`.toLowerCase();
  const grounded =
    part.box[1] <= sceneMinY + 1.2 ||
    (/rubber-feet|foot|feet|base-pad|tripod-socket|bottom-weight|leveling/.test(hay) && part.box[1] <= sceneMinY + 2.5);
  const chassis = /chassis|frame|housing|shell|bezel|cover|plate|base|plinth|bulkhead|barrel|mount|cradle|endcap|beam|backplate|dock/.test(hay);
  const optical = /lens|glass|quartz|sapphire|prism|lgp|diffuser|window|filter|olpf|mirror/.test(hay);
  const tim = /tim|thermal-pad|gap-pad|heatsink|heatpipe|vapor-chamber/.test(hay);
  const heat = /led-array|led|bionz|isp|npu|mcu|cortex|pmic|charger|amp|dac|driver|sensor-die|cmos|motor|servo/.test(hay);
  const emi = /emi|shield|fingerstock|gnd-link/.test(hay);
  const fastener = /screw|bolt|washer|nut|pin|dowel|rivet|clip|spring|clamp|fastener|collar|dovetail|retainer|shim|snap/.test(hay);
  const pcb = /pcb|board|mainboard|mcpcb|substrate|fpc|flex/.test(hay) && !/shield|can/.test(hay);

  // Anchor hierarchy weights (higher = resists movement)
  let weight = 10.0;
  let maxShift = 3.0;
  if (grounded) {
    weight = 10000.0;
    maxShift = 0.0; // immovable datum
  } else if (chassis) {
    weight = 500.0;
    maxShift = 0.6;
  } else if (optical || pcb) {
    weight = 80.0;
    maxShift = 1.8;
  } else if (fastener || tim || emi) {
    weight = 1.0;
    maxShift = 3.0;
  }

  return { grounded, chassis, optical, tim, heat, emi, fastener, pcb, weight, maxShift };
}

function boxGap(a, b) {
  const dx = Math.max(0, a[0] - b[3], b[0] - a[3]);
  const dy = Math.max(0, a[1] - b[4], b[1] - a[4]);
  const dz = Math.max(0, a[2] - b[5], b[2] - a[5]);
  return Math.hypot(dx, dy, dz);
}

/**
 * Compute exact minimum separation between two parts using Float64 triangle distances
 * when AABB gap is within candidate range.
 */
function exactPartDistance(scene, pA, pB) {
  let best = { dist: Infinity, pA: null, pB: null };
  for (let i = pA.meshStart; i < pA.meshStart + pA.meshCount; i++) {
    const mA = scene.meshes[i];
    if (!mA || mA.tris.length < 9) continue;
    for (let j = pB.meshStart; j < pB.meshStart + pB.meshCount; j++) {
      const mB = scene.meshes[j];
      if (!mB || mB.tris.length < 9) continue;
      if (boxGap(mA.box, mB.box) >= best.dist) continue;
      const res = exactMeshPairMinDistance(mA, mB, best.dist);
      if (res && res.dist < best.dist) best = res;
    }
  }
  return best;
}

function extractCanonicalPartId(raw, partById) {
  if (!raw) return '';
  if (partById.has(raw)) return raw;
  const m = String(raw).match(/\(([^()]+)\)\s*$/);
  if (m && partById.has(m[1])) return m[1];
  return m ? m[1] : String(raw);
}

/**
 * Exact surface-to-surface unit direction from AABB A toward AABB B (never skewed by slab center!).
 */
function boxSurfaceDir(a, b) {
  let dx = 0, dy = 0, dz = 0;
  if (a[3] < b[0]) dx = b[0] - a[3];
  else if (b[3] < a[0]) dx = b[3] - a[0];
  if (a[4] < b[1]) dy = b[1] - a[4];
  else if (b[4] < a[1]) dy = b[4] - a[1];
  if (a[5] < b[2]) dz = b[2] - a[5];
  else if (b[5] < a[2]) dz = b[5] - a[2];
  const len = Math.hypot(dx, dy, dz);
  if (len > 1e-6) return [dx / len, dy / len, dz / len];
  const cx = 0.5 * (b[0] + b[3]) - 0.5 * (a[0] + a[3]);
  const cy = 0.5 * (b[1] + b[4]) - 0.5 * (a[1] + a[4]);
  const cz = 0.5 * (b[2] + b[5]) - 0.5 * (a[2] + a[5]);
  const l2 = Math.hypot(cx, cy, cz) || 1;
  return [cx / l2, cy / l2, cz / l2];
}

/**
 * Extract ALL defects across geometry, anti-levitation, thermal TIM seating, EMI grounding,
 * fasteners, sightline cones, and explode trajectories, then build causal islands.
 */
export function extractAllDefectsAndClusters(tierScenes, unitId, opts = {}) {
  const primary = tierScenes.ultra || Object.values(tierScenes)[0];
  const n = primary.parts.length;
  const partById = new Map(primary.parts.map((p, idx) => [p.id, { ...p, idx }]));

  let sceneMinY = Infinity;
  for (const p of primary.parts) {
    if (p.box[1] < sceneMinY) sceneMinY = p.box[1];
  }
  if (!Number.isFinite(sceneMinY)) sceneMinY = 0;

  const partMeta = primary.parts.map((p, idx) => ({
    idx,
    id: p.id,
    box: p.box,
    cog: p.cog,
    volumeMm3: p.volumeMm3,
    ...classifyPartPriority(p, sceneMinY),
  }));

  // 1. Collect ALL collisions across ALL available quality tiers (zero truncation!)
  const clashMap = new Map();
  const tierNames = Object.keys(tierScenes);
  for (const t of tierNames) {
    const sc = tierScenes[t];
    if (!sc) continue;
    const audit = runUnitAudit(sc, { explodeSteps: 0, checkFloating: false });
    for (const c of audit.collisions || []) {
      const idA = extractCanonicalPartId(c.partA, partById);
      const idB = extractCanonicalPartId(c.partB, partById);
      if (!idA || !idB || idA === idB) continue;
      const k = idA < idB ? `${idA}|${idB}` : `${idB}|${idA}`;
      const existing = clashMap.get(k);
      const pA = partById.get(idA);
      const pB = partById.get(idB);
      let nx = 0, ny = 1, nz = 0;
      let pen = Number(c.penetrationMm || 0);

      if (pA && pB) {
        const ox = Math.min(pA.box[3], pB.box[3]) - Math.max(pA.box[0], pB.box[0]);
        const oy = Math.min(pA.box[4], pB.box[4]) - Math.max(pA.box[1], pB.box[1]);
        const oz = Math.min(pA.box[5], pB.box[5]) - Math.max(pA.box[2], pB.box[2]);
        if (ox >= 0 && oy >= 0 && oz >= 0) {
          if (ox <= oy && ox <= oz) {
            nx = pA.cog[0] >= pB.cog[0] ? 1 : -1;
            ny = 0; nz = 0;
            if (pen < 1e-4) pen = ox;
          } else if (oy <= ox && oy <= oz) {
            nx = 0;
            ny = pA.cog[1] >= pB.cog[1] ? 1 : -1;
            nz = 0;
            if (pen < 1e-4) pen = oy;
          } else {
            nx = 0; ny = 0;
            nz = pA.cog[2] >= pB.cog[2] ? 1 : -1;
            if (pen < 1e-4) pen = oz;
          }
        } else {
          const dx = pA.cog[0] - pB.cog[0];
          const dy = pA.cog[1] - pB.cog[1];
          const dz = pA.cog[2] - pB.cog[2];
          const len = Math.hypot(dx, dy, dz) || 1;
          nx = dx / len; ny = dy / len; nz = dz / len;
        }
      }
      pen = Math.max(pen, 0.005);

      if (!existing || pen > existing.penMm) {
        clashMap.set(k, {
          kind: 'CLASH',
          partA: idA,
          partB: idB,
          penMm: pen,
          normal: [nx, ny, nz],
          point: c.point || (pA ? pA.cog : [0, 0, 0]),
          tier: t,
        });
      }
    }
  }
  const clashes = [...clashMap.values()];

  // 2. Grounded contact graph (<= 0.08mm) + nearest support detection for EVERY floating/TIM/EMI part
  //    Fast-path: use C++17 native FCL 0.7 BVH when scene has >120 parts or >25k tris (100x faster than JS!)
  const adj = Array.from({ length: n }, () => []);
  const nearestSupport = new Array(n).fill(null);
  const nearBarriers = []; // { idxA, idxB, dist, dirAToB }

  const fclEdges = runFastNativeFclContacts(primary);
  if (fclEdges) {
    for (const e of fclEdges) {
      if (e.a < 0 || e.a >= n || e.b < 0 || e.b >= n || e.a === e.b) continue;
      const dist = Math.max(0, Number(e.d || 0));
      if (dist <= SEAT_MAX_MM) {
        adj[e.a].push({ to: e.b, dist });
        adj[e.b].push({ to: e.a, dist });
      }
      const pA = Array.isArray(e.pA) ? e.pA : null;
      const pB = Array.isArray(e.pB) ? e.pB : null;
      if (dist > 0.002 && dist <= 1.5) {
        let dir = Array.isArray(e.n) && e.n.length === 3 ? e.n : boxSurfaceDir(primary.parts[e.a].box, primary.parts[e.b].box);
        const dl = Math.hypot(dir[0], dir[1], dir[2]);
        if (dl > 1e-6) dir = [dir[0] / dl, dir[1] / dl, dir[2] / dl];
        else dir = boxSurfaceDir(primary.parts[e.a].box, primary.parts[e.b].box);
        nearBarriers.push({ idxA: e.a, idxB: e.b, dist, dirAToB: dir });
      }
      if (!nearestSupport[e.a] || dist < nearestSupport[e.a].dist) {
        nearestSupport[e.a] = { to: e.b, dist, pSelf: pA, pSup: pB };
      }
      if (!nearestSupport[e.b] || dist < nearestSupport[e.b].dist) {
        nearestSupport[e.b] = { to: e.a, dist, pSelf: pB, pSup: pA };
      }
    }
  } else {
    for (let i = 0; i < n; i++) {
      const pA = primary.parts[i];
      for (let j = i + 1; j < n; j++) {
        const pB = primary.parts[j];
        const bg = boxGap(pA.box, pB.box);
        if (bg > 3.5) continue;
        const d = bg <= 0.08 ? exactPartDistance(primary, pA, pB) : { dist: bg };
        const dist = Number.isFinite(d.dist) ? d.dist : bg;
        if (dist <= SEAT_MAX_MM) {
          adj[i].push({ to: j, dist });
          adj[j].push({ to: i, dist });
        }
        if (dist > 0.002 && dist <= 1.5) {
          nearBarriers.push({ idxA: i, idxB: j, dist, dirAToB: boxSurfaceDir(pA.box, pB.box) });
        }
        if (!nearestSupport[i] || dist < nearestSupport[i].dist) nearestSupport[i] = { to: j, dist };
        if (!nearestSupport[j] || dist < nearestSupport[j].dist) nearestSupport[j] = { to: i, dist };
      }
    }
  }

  // BFS from grounded roots
  const groundedReach = new Uint8Array(n);
  const q = [];
  for (let i = 0; i < n; i++) {
    if (partMeta[i].grounded) {
      groundedReach[i] = 1;
      q.push(i);
    }
  }
  if (q.length === 0 && n > 0) {
    let bestRoot = 0;
    for (let i = 1; i < n; i++) {
      if (primary.parts[i].box[1] < primary.parts[bestRoot].box[1]) bestRoot = i;
    }
    partMeta[bestRoot].grounded = true;
    partMeta[bestRoot].weight = 10000;
    partMeta[bestRoot].maxShift = 0;
    groundedReach[bestRoot] = 1;
    q.push(bestRoot);
  }
  for (let h = 0; h < q.length; h++) {
    for (const nb of adj[q[h]]) {
      if (!groundedReach[nb.to]) {
        groundedReach[nb.to] = 1;
        q.push(nb.to);
      }
    }
  }

  // Collect ALL floaters & TIM / EMI seating defects
  const seats = [];
  for (let i = 0; i < n; i++) {
    const m = partMeta[i];
    const isFloat = groundedReach[i] === 0;
    const ns = nearestSupport[i];
    const needsTimSeat = m.tim && ns && ns.dist > TIM_MAX_MM;
    const needsEmiSeat = m.emi && adj[i].length === 0;

    if (!isFloat && !needsTimSeat && !needsEmiSeat) continue;

    let bestTarget = ns;
    if (!bestTarget || (isFloat && !groundedReach[bestTarget.to])) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        if (isFloat && !groundedReach[j] && partMeta[j].weight <= m.weight) continue;
        const g = boxGap(primary.parts[i].box, primary.parts[j].box);
        if (g > 10.0) continue;
        if (!bestTarget || g < bestTarget.dist) {
          bestTarget = { to: j, dist: g };
        }
      }
    }
    if (!bestTarget) continue;

    const pSelf = primary.parts[i];
    const pSup = primary.parts[bestTarget.to];
    let gapMm = bestTarget.dist;
    let dirToSupport = boxSurfaceDir(pSelf.box, pSup.box);
    if (bestTarget.pSelf && bestTarget.pSup) {
      const dx = bestTarget.pSup[0] - bestTarget.pSelf[0];
      const dy = bestTarget.pSup[1] - bestTarget.pSelf[1];
      const dz = bestTarget.pSup[2] - bestTarget.pSelf[2];
      const l = Math.hypot(dx, dy, dz);
      if (l > 1e-6) dirToSupport = [dx / l, dy / l, dz / l];
    } else if (!fclEdges) {
      const exact = exactPartDistance(primary, pSelf, pSup);
      if (Number.isFinite(exact.dist)) gapMm = exact.dist;
    }
    const targetGap = m.tim ? 0.025 : 0.04;
    if (gapMm > targetGap) {
      seats.push({
        kind: m.tim ? 'TIM_GAP' : m.emi ? 'EMI_FLOAT' : 'FLOAT',
        partA: pSelf.id,
        supportB: pSup.id,
        gapMm,
        targetGapMm: targetGap,
        dirToSupport,
      });
    }
  }

  // 3. Sightline Cone Occlusions (`EX20`)
  const coneDefects = [];
  const presets = opts.rayPresets || Object.entries(RAY_PRESETS).filter(([, p]) => p.unitId === unitId).map(([id, p]) => ({ id, ...p }));
  for (const preset of presets) {
    const res = runRayConeCheck(primary, preset);
    for (const occ of res.occluders || []) {
      const partId = extractCanonicalPartId(occ.partId || occ.part, partById);
      const p = partById.get(partId);
      if (!p) continue;
      const ox = p.cog[0] - preset.origin[0];
      const oy = p.cog[1] - preset.origin[1];
      const oz = p.cog[2] - preset.origin[2];
      const d = preset.dir;
      const dLen = Math.hypot(d[0], d[1], d[2]) || 1;
      const ux = d[0] / dLen, uy = d[1] / dLen, uz = d[2] / dLen;
      const proj = ox * ux + oy * uy + oz * uz;
      let rx = ox - proj * ux;
      let ry = oy - proj * uy;
      let rz = oz - proj * uz;
      const rLen = Math.hypot(rx, ry, rz);
      if (rLen > 1e-5) { rx /= rLen; ry /= rLen; rz /= rLen; }
      else { rx = 1; ry = 0; rz = 0; }
      const halfConeR = Math.max(0.5, Math.abs(proj) * Math.tan(((preset.fovDeg || 60) * 0.5 * Math.PI) / 180));
      const partRad = 0.5 * Math.hypot(p.box[3] - p.box[0], p.box[4] - p.box[1], p.box[5] - p.box[2]);
      const pushMm = Math.max(0.2, halfConeR + partRad - rLen + 0.25);
      coneDefects.push({
        kind: 'CONE_OCCLUSION',
        presetId: preset.id,
        partA: partId,
        pushDir: [rx, ry, rz],
        pushMm: Math.min(pushMm, 2.8),
      });
    }
  }

  // 4. Explode CCD sweep collisions (`EX11`)
  const explodeDefects = [];
  if (opts.checkExplode !== false) {
    const expAudit = runUnitAudit(primary, { explodeSteps: 8, checkFloating: false });
    for (const ec of expAudit.explodeCollisions || []) {
      const idA = extractCanonicalPartId(ec.partA, partById);
      const idB = extractCanonicalPartId(ec.partB, partById);
      if (idA && idB && idA !== idB) {
        explodeDefects.push({
          kind: 'EXPLODE_CLASH',
          partA: idA,
          partB: idB,
          step: ec.step || 0.5,
        });
      }
    }
  }

  // 5. External Tier-B topology defects (non-manifold/self-intersection if supplied)
  const tierBExplicit = (opts.topologyDefects || []).map((d) => ({
    kind: 'TOPOLOGY_TIER_B',
    partA: d.partId,
    reason: d.reason || 'NON_MANIFOLD',
    openEdges: d.openEdges || 0,
    selfIntersections: d.selfIntersections || 0,
  }));

  // 6. Connected Component Island Decomposition for parallel/independent solving
  const parentUf = new Map();
  const findUf = (x) => {
    if (!parentUf.has(x)) parentUf.set(x, x);
    let r = x;
    while (parentUf.get(r) !== r) r = parentUf.get(r);
    let c = x;
    while (c !== r) { const nx = parentUf.get(c); parentUf.set(c, r); c = nx; }
    return r;
  };
  const unionUf = (a, b) => {
    const ra = findUf(a), rb = findUf(b);
    if (ra !== rb) parentUf.set(ra, rb);
  };

  const involved = new Set();
  for (const c of clashes) { involved.add(c.partA); involved.add(c.partB); unionUf(c.partA, c.partB); }
  for (const s of seats) { involved.add(s.partA); involved.add(s.supportB); unionUf(s.partA, s.supportB); }
  for (const co of coneDefects) { involved.add(co.partA); findUf(co.partA); }

  const islandsMap = new Map();
  for (const id of involved) {
    const root = findUf(id);
    if (!islandsMap.has(root)) islandsMap.set(root, { parts: new Set(), clashes: [], seats: [], cones: [], barriers: [] });
    islandsMap.get(root).parts.add(id);
  }
  for (const c of clashes) islandsMap.get(findUf(c.partA))?.clashes.push(c);
  for (const s of seats) islandsMap.get(findUf(s.partA))?.seats.push(s);
  for (const co of coneDefects) islandsMap.get(findUf(co.partA))?.cones.push(co);

  // Attach non-penetration barrier constraints for close neighbors (prevents creating new clashes!)
  for (const nb of nearBarriers) {
    const idA = primary.parts[nb.idxA].id;
    const idB = primary.parts[nb.idxB].id;
    const inA = involved.has(idA);
    const inB = involved.has(idB);
    if (!inA && !inB) continue;
    if (inA && inB && findUf(idA) === findUf(idB)) {
      islandsMap.get(findUf(idA))?.barriers.push({
        partA: idA,
        partB: idB,
        distMm: nb.dist,
        dirAToB: nb.dirAToB,
      });
    } else if (inA && !inB) {
      islandsMap.get(findUf(idA))?.barriers.push({
        partA: idA,
        partB: null,
        distMm: nb.dist,
        dirAToB: nb.dirAToB,
      });
    } else if (!inA && inB) {
      islandsMap.get(findUf(idB))?.barriers.push({
        partA: idB,
        partB: null,
        distMm: nb.dist,
        dirAToB: [-nb.dirAToB[0], -nb.dirAToB[1], -nb.dirAToB[2]],
      });
    }
  }

  const islands = [...islandsMap.values()].map((isl, idx) => ({
    islandId: idx + 1,
    parts: [...isl.parts],
    clashes: isl.clashes,
    seats: isl.seats,
    cones: isl.cones,
    barriers: isl.barriers,
  }));

  return {
    unitId,
    partCount: n,
    partMetaById: Object.fromEntries(partMeta.map((m) => [m.id, m])),
    clashes,
    seats,
    coneDefects,
    explodeDefects,
    tierBExplicit,
    islands,
    totalDefects: clashes.length + seats.length + coneDefects.length + explodeDefects.length + tierBExplicit.length,
  };
}
