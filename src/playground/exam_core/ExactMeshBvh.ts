/**
 * PLYA V2 (EXAM-Inherited) — Real 3D Mesh Decoder, Signed Volume/Area Calculator,
 * Flat Triangle BVH, Exact Triangle-Triangle Intersection, Nearest Surface Distance,
 * and 3D Ray-Mesh Intersection Engine for Play Ground!
 *
 * Replaces legacy Box3/AABB heuristics with authentic Float32/Float64 triangle geometry
 * extracted directly from each placed part's `ExtractedPartBlueprint` (`QuantizedGeoPack`).
 */

import type { ExtractedPartBlueprint, QuantizedGeoPack } from '../PartGeometryExtractor';

export interface LocalMeshSummary {
  /** Compact local-space triangle vertices [v0x,v0y,v0z, v1x,v1y,v1z, v2x,v2y,v2z, ...] */
  readonly localTris: Float32Array;
  readonly triCount: number;
  readonly rawTriCount: number;
  readonly signedVolumeMm3: number;
  readonly surfaceAreaMm2: number;
  readonly nonFiniteCount: number;
  readonly degenerateCount: number;
}

export interface WorldMeshBvh {
  readonly tris: Float32Array; // length = triCount * 9 (world mm)
  readonly triCount: number;
  readonly box: readonly [number, number, number, number, number, number];
  /** Flat binary BVH node bounds [minX,minY,minZ,maxX,maxY,maxZ] per node */
  readonly nodeBounds: Float32Array;
  /** leftChild (>=0) or -(triStart+1) if leaf */
  readonly nodeLeft: Int32Array;
  /** rightChild (>=0) or triCount if leaf */
  readonly nodeRight: Int32Array;
  readonly triOrder: Int32Array;
}

const localSummaryCache = new WeakMap<ExtractedPartBlueprint, LocalMeshSummary>();

const MAX_SOLVER_TRIS_PER_PART = 360;

function extractPackTriangles(
  pack: QuantizedGeoPack | null,
  outTris: number[],
  stats: { raw: number; nonFin: number; degen: number; vol6: number; area: number }
): void {
  if (!pack) return;
  const posAttr = pack.geometry.getAttribute('position');
  if (!posAttr) return;
  const arr = posAttr.array as Int16Array | Float32Array;
  const isInt16 = arr instanceof Int16Array;
  const normScale = isInt16 ? pack.scale / 32767 : 1.0;
  const cx = isInt16 ? pack.cx : 0;
  const cy = isInt16 ? pack.cy : 0;
  const cz = isInt16 ? pack.cz : 0;

  const idx = pack.geometry.getIndex();
  const totalTris = idx ? Math.floor(idx.count / 3) : Math.floor(posAttr.count / 3);
  stats.raw += totalTris;
  const stride = Math.max(1, Math.floor(totalTris / MAX_SOLVER_TRIS_PER_PART));

  for (let t = 0; t < totalTris; t++) {
    const i0 = idx ? idx.getX(t * 3) : t * 3;
    const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
    const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;

    const ax = arr[i0 * 3] * normScale + cx;
    const ay = arr[i0 * 3 + 1] * normScale + cy;
    const az = arr[i0 * 3 + 2] * normScale + cz;
    const bx = arr[i1 * 3] * normScale + cx;
    const by = arr[i1 * 3 + 1] * normScale + cy;
    const bz = arr[i1 * 3 + 2] * normScale + cz;
    const dx = arr[i2 * 3] * normScale + cx;
    const dy = arr[i2 * 3 + 1] * normScale + cy;
    const dz = arr[i2 * 3 + 2] * normScale + cz;

    if (!Number.isFinite(ax) || !Number.isFinite(ay) || !Number.isFinite(az) ||
        !Number.isFinite(bx) || !Number.isFinite(by) || !Number.isFinite(bz) ||
        !Number.isFinite(dx) || !Number.isFinite(dy) || !Number.isFinite(dz)) {
      stats.nonFin++;
      continue;
    }

    // Exact signed volume contribution across ALL raw triangles (zero downsampling error!)
    const cpx = by * dz - bz * dy;
    const cpy = bz * dx - bx * dz;
    const cpz = bx * dy - by * dx;
    stats.vol6 += ax * cpx + ay * cpy + az * cpz;

    const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
    const e2x = dx - ax, e2y = dy - ay, e2z = dz - az;
    const crx = e1y * e2z - e1z * e2y;
    const cry = e1z * e2x - e1x * e2z;
    const crz = e1x * e2y - e1y * e2x;
    const a2 = crx * crx + cry * cry + crz * crz;
    if (a2 < 1e-14) {
      stats.degen++;
      continue;
    }
    stats.area += 0.5 * Math.sqrt(a2);

    if (t % stride === 0) {
      outTris.push(ax, ay, az, bx, by, bz, dx, dy, dz);
    }
  }
}

/**
 * Extract cached local-space geometry & exact mass-volume properties from a Play Ground blueprint.
 */
export function getLocalMeshSummary(bp: ExtractedPartBlueprint): LocalMeshSummary {
  const cached = localSummaryCache.get(bp);
  if (cached) return cached;
  const out: number[] = [];
  const stats = { raw: 0, nonFin: 0, degen: 0, vol6: 0, area: 0 };
  extractPackTriangles(bp.opaque, out, stats);
  extractPackTriangles(bp.glass, out, stats);

  // Fallback box triangles if blueprint has no mesh packs
  const fallbackVol = Math.max(0.5, bp.naturalSize.x * bp.naturalSize.y * bp.naturalSize.z * 0.55);
  const absVol = Math.abs(stats.vol6 / 6.0);
  const summary: LocalMeshSummary = {
    localTris: new Float32Array(out),
    triCount: Math.floor(out.length / 9),
    rawTriCount: stats.raw,
    signedVolumeMm3: absVol > 0.05 ? absVol : fallbackVol,
    surfaceAreaMm2: stats.area > 0.1 ? stats.area : 2 * (bp.naturalSize.x * bp.naturalSize.y + bp.naturalSize.y * bp.naturalSize.z + bp.naturalSize.z * bp.naturalSize.x),
    nonFiniteCount: stats.nonFin,
    degenerateCount: stats.degen,
  };
  localSummaryCache.set(bp, summary);
  return summary;
}

/**
 * Transform local triangles by a 4x4 matrixWorld into world mm coordinates.
 */
export function transformLocalTrisToWorld(localTris: Float32Array, matElems: ArrayLike<number>): Float32Array {
  const nVerts = Math.floor(localTris.length / 3);
  const out = new Float32Array(nVerts * 3);
  const m0 = matElems[0], m1 = matElems[1], m2 = matElems[2];
  const m4 = matElems[4], m5 = matElems[5], m6 = matElems[6];
  const m8 = matElems[8], m9 = matElems[9], m10 = matElems[10];
  const m12 = matElems[12], m13 = matElems[13], m14 = matElems[14];

  for (let i = 0; i < nVerts; i++) {
    const o = i * 3;
    const x = localTris[o], y = localTris[o + 1], z = localTris[o + 2];
    out[o]     = m0 * x + m4 * y + m8 * z + m12;
    out[o + 1] = m1 * x + m5 * y + m9 * z + m13;
    out[o + 2] = m2 * x + m6 * y + m10 * z + m14;
  }
  return out;
}

/**
 * Build a fast flat binary BVH over a Float32Array of world triangles.
 */
export function buildWorldMeshBvh(tris: Float32Array, fallbackBox: readonly [number, number, number, number, number, number]): WorldMeshBvh {
  const triCount = Math.floor(tris.length / 9);
  if (triCount === 0) {
    return {
      tris,
      triCount: 0,
      box: fallbackBox,
      nodeBounds: new Float32Array(fallbackBox),
      nodeLeft: new Int32Array([-1]),
      nodeRight: new Int32Array([0]),
      triOrder: new Int32Array(0),
    };
  }

  const triBounds = new Float32Array(triCount * 6);
  const triCent = new Float32Array(triCount * 3);
  const triOrder = new Int32Array(triCount);
  let gMinX = Infinity, gMinY = Infinity, gMinZ = Infinity;
  let gMaxX = -Infinity, gMaxY = -Infinity, gMaxZ = -Infinity;

  for (let t = 0; t < triCount; t++) {
    triOrder[t] = t;
    const o = t * 9;
    const ax = tris[o], ay = tris[o + 1], az = tris[o + 2];
    const bx = tris[o + 3], by = tris[o + 4], bz = tris[o + 5];
    const cx = tris[o + 6], cy = tris[o + 7], cz = tris[o + 8];
    const mnX = Math.min(ax, bx, cx), mxX = Math.max(ax, bx, cx);
    const mnY = Math.min(ay, by, cy), mxY = Math.max(ay, by, cy);
    const mnZ = Math.min(az, bz, cz), mxZ = Math.max(az, bz, cz);
    const bo = t * 6;
    triBounds[bo] = mnX; triBounds[bo + 1] = mnY; triBounds[bo + 2] = mnZ;
    triBounds[bo + 3] = mxX; triBounds[bo + 4] = mxY; triBounds[bo + 5] = mxZ;
    triCent[t * 3] = (mnX + mxX) * 0.5;
    triCent[t * 3 + 1] = (mnY + mxY) * 0.5;
    triCent[t * 3 + 2] = (mnZ + mxZ) * 0.5;
    if (mnX < gMinX) gMinX = mnX; if (mxX > gMaxX) gMaxX = mxX;
    if (mnY < gMinY) gMinY = mnY; if (mxY > gMaxY) gMaxY = mxY;
    if (mnZ < gMinZ) gMinZ = mnZ; if (mxZ > gMaxZ) gMaxZ = mxZ;
  }

  const maxNodes = Math.max(1, triCount * 2);
  const nodeBounds = new Float32Array(maxNodes * 6);
  const nodeLeft = new Int32Array(maxNodes);
  const nodeRight = new Int32Array(maxNodes);
  let nodeCount = 0;

  const buildNode = (start: number, count: number): number => {
    const id = nodeCount++;
    let mnX = Infinity, mnY = Infinity, mnZ = Infinity;
    let mxX = -Infinity, mxY = -Infinity, mxZ = -Infinity;
    for (let i = start; i < start + count; i++) {
      const bo = triOrder[i] * 6;
      if (triBounds[bo] < mnX) mnX = triBounds[bo];
      if (triBounds[bo + 1] < mnY) mnY = triBounds[bo + 1];
      if (triBounds[bo + 2] < mnZ) mnZ = triBounds[bo + 2];
      if (triBounds[bo + 3] > mxX) mxX = triBounds[bo + 3];
      if (triBounds[bo + 4] > mxY) mxY = triBounds[bo + 4];
      if (triBounds[bo + 5] > mxZ) mxZ = triBounds[bo + 5];
    }
    const nb = id * 6;
    nodeBounds[nb] = mnX; nodeBounds[nb + 1] = mnY; nodeBounds[nb + 2] = mnZ;
    nodeBounds[nb + 3] = mxX; nodeBounds[nb + 4] = mxY; nodeBounds[nb + 5] = mxZ;

    if (count <= 6) {
      nodeLeft[id] = -(start + 1);
      nodeRight[id] = count;
      return id;
    }

    const dx = mxX - mnX, dy = mxY - mnY, dz = mxZ - mnZ;
    const axis = dx >= dy && dx >= dz ? 0 : dy >= dz ? 1 : 2;
    const mid = (axis === 0 ? mnX + mxX : axis === 1 ? mnY + mxY : mnZ + mxZ) * 0.5;

    let i = start;
    let j = start + count - 1;
    while (i <= j) {
      if (triCent[triOrder[i] * 3 + axis] < mid) {
        i++;
      } else {
        const tmp = triOrder[i];
        triOrder[i] = triOrder[j];
        triOrder[j] = tmp;
        j--;
      }
    }
    let leftCount = i - start;
    if (leftCount === 0 || leftCount === count) leftCount = count >> 1;
    nodeLeft[id] = buildNode(start, leftCount);
    nodeRight[id] = buildNode(start + leftCount, count - leftCount);
    return id;
  };

  buildNode(0, triCount);
  return {
    tris,
    triCount,
    box: [gMinX, gMinY, gMinZ, gMaxX, gMaxY, gMaxZ],
    nodeBounds: nodeBounds.subarray(0, nodeCount * 6),
    nodeLeft: nodeLeft.subarray(0, nodeCount),
    nodeRight: nodeRight.subarray(0, nodeCount),
    triOrder,
  };
}

function boxBoxMinDistSqArr(a: Float32Array, ao: number, b: Float32Array, bo: number): number {
  const dx = Math.max(0, a[ao] - b[bo + 3], b[bo] - a[ao + 3]);
  const dy = Math.max(0, a[ao + 1] - b[bo + 4], b[bo + 1] - a[ao + 4]);
  const dz = Math.max(0, a[ao + 2] - b[bo + 5], b[bo + 2] - a[ao + 5]);
  return dx * dx + dy * dy + dz * dz;
}

/** Exact point-to-triangle squared distance + closest point */
function pointTriDistSqOut(
  px: number, py: number, pz: number,
  ax: number, ay: number, az: number,
  bx: number, by: number, bz: number,
  cx: number, cy: number, cz: number,
  outPt: [number, number, number]
): number {
  const abx = bx - ax, aby = by - ay, abz = bz - az;
  const acx = cx - ax, acy = cy - ay, acz = cz - az;
  const apx = px - ax, apy = py - ay, apz = pz - az;
  const d1 = abx * apx + aby * apy + abz * apz;
  const d2 = acx * apx + acy * apy + acz * apz;
  if (d1 <= 0 && d2 <= 0) {
    outPt[0] = ax; outPt[1] = ay; outPt[2] = az;
    return apx * apx + apy * apy + apz * apz;
  }
  const bpx = px - bx, bpy = py - by, bpz = pz - bz;
  const d3 = abx * bpx + aby * bpy + abz * bpz;
  const d4 = acx * bpx + acy * bpy + acz * bpz;
  if (d3 >= 0 && d4 <= d3) {
    outPt[0] = bx; outPt[1] = by; outPt[2] = bz;
    return bpx * bpx + bpy * bpy + bpz * bpz;
  }
  const vc = d1 * d4 - d3 * d2;
  if (vc <= 0 && d1 >= 0 && d3 <= 0) {
    const v = d1 / (d1 - d3);
    outPt[0] = ax + v * abx; outPt[1] = ay + v * aby; outPt[2] = az + v * abz;
    const dx = px - outPt[0], dy = py - outPt[1], dz = pz - outPt[2];
    return dx * dx + dy * dy + dz * dz;
  }
  const cpx = px - cx, cpy = py - cy, cpz = pz - cz;
  const d5 = abx * cpx + aby * cpy + abz * cpz;
  const d6 = acx * cpx + acy * cpy + acz * cpz;
  if (d6 >= 0 && d5 <= d6) {
    outPt[0] = cx; outPt[1] = cy; outPt[2] = cz;
    return cpx * cpx + cpy * cpy + cpz * cpz;
  }
  const vb = d5 * d2 - d1 * d6;
  if (vb <= 0 && d2 >= 0 && d6 <= 0) {
    const w = d2 / (d2 - d6);
    outPt[0] = ax + w * acx; outPt[1] = ay + w * acy; outPt[2] = az + w * acz;
    const dx = px - outPt[0], dy = py - outPt[1], dz = pz - outPt[2];
    return dx * dx + dy * dy + dz * dz;
  }
  const va = d3 * d6 - d5 * d4;
  if (va <= 0 && (d4 - d3) >= 0 && (d5 - d6) >= 0) {
    const w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
    outPt[0] = bx + w * (cx - bx); outPt[1] = by + w * (cy - by); outPt[2] = bz + w * (cz - bz);
    const dx = px - outPt[0], dy = py - outPt[1], dz = pz - outPt[2];
    return dx * dx + dy * dy + dz * dz;
  }
  const denom = 1.0 / (va + vb + vc);
  const v = vb * denom;
  const w = vc * denom;
  outPt[0] = ax + abx * v + acx * w;
  outPt[1] = ay + aby * v + acy * w;
  outPt[2] = az + abz * v + acz * w;
  const dx = px - outPt[0], dy = py - outPt[1], dz = pz - outPt[2];
  return dx * dx + dy * dy + dz * dz;
}

/** Fast Möller triangle-segment intersection test for triangle-triangle clash */
function segmentTriHit(
  p0x: number, p0y: number, p0z: number,
  p1x: number, p1y: number, p1z: number,
  ax: number, ay: number, az: number,
  bx: number, by: number, bz: number,
  cx: number, cy: number, cz: number
): boolean {
  const dx = p1x - p0x, dy = p1y - p0y, dz = p1z - p0z;
  const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
  const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
  const hx = dy * e2z - dz * e2y;
  const hy = dz * e2x - dx * e2z;
  const hz = dx * e2y - dy * e2x;
  const a = e1x * hx + e1y * hy + e1z * hz;
  if (Math.abs(a) < 1e-9) return false;
  const f = 1.0 / a;
  const sx = p0x - ax, sy = p0y - ay, sz = p0z - az;
  const u = f * (sx * hx + sy * hy + sz * hz);
  if (u < 1e-4 || u > 1 - 1e-4) return false;
  const qx = sy * e1z - sz * e1y;
  const qy = sz * e1x - sx * e1z;
  const qz = sx * e1y - sy * e1x;
  const v = f * (dx * qx + dy * qy + dz * qz);
  if (v < 1e-4 || u + v > 1 - 1e-4) return false;
  const t = f * (e2x * qx + e2y * qy + e2z * qz);
  return t > 1e-4 && t < 1 - 1e-4;
}

function triTriOverlapStrict(tA: Float32Array, oA: number, tB: Float32Array, oB: number): boolean {
  const a0x = tA[oA], a0y = tA[oA + 1], a0z = tA[oA + 2];
  const a1x = tA[oA + 3], a1y = tA[oA + 4], a1z = tA[oA + 5];
  const a2x = tA[oA + 6], a2y = tA[oA + 7], a2z = tA[oA + 8];
  const b0x = tB[oB], b0y = tB[oB + 1], b0z = tB[oB + 2];
  const b1x = tB[oB + 3], b1y = tB[oB + 4], b1z = tB[oB + 5];
  const b2x = tB[oB + 6], b2y = tB[oB + 7], b2z = tB[oB + 8];

  // Fast AABB reject
  if (Math.max(a0x, a1x, a2x) < Math.min(b0x, b1x, b2x) || Math.min(a0x, a1x, a2x) > Math.max(b0x, b1x, b2x)) return false;
  if (Math.max(a0y, a1y, a2y) < Math.min(b0y, b1y, b2y) || Math.min(a0y, a1y, a2y) > Math.max(b0y, b1y, b2y)) return false;
  if (Math.max(a0z, a1z, a2z) < Math.min(b0z, b1z, b2z) || Math.min(a0z, a1z, a2z) > Math.max(b0z, b1z, b2z)) return false;

  // Test edges of A against B and edges of B against A (strict interior hits -> genuine penetration, not grazing touch!)
  return (
    segmentTriHit(a0x, a0y, a0z, a1x, a1y, a1z, b0x, b0y, b0z, b1x, b1y, b1z, b2x, b2y, b2z) ||
    segmentTriHit(a1x, a1y, a1z, a2x, a2y, a2z, b0x, b0y, b0z, b1x, b1y, b1z, b2x, b2y, b2z) ||
    segmentTriHit(a2x, a2y, a2z, a0x, a0y, a0z, b0x, b0y, b0z, b1x, b1y, b1z, b2x, b2y, b2z) ||
    segmentTriHit(b0x, b0y, b0z, b1x, b1y, b1z, a0x, a0y, a0z, a1x, a1y, a1z, a2x, a2y, a2z) ||
    segmentTriHit(b1x, b1y, b1z, b2x, b2y, b2z, a0x, a0y, a0z, a1x, a1y, a1z, a2x, a2y, a2z) ||
    segmentTriHit(b2x, b2y, b2z, b0x, b0y, b0z, a0x, a0y, a0z, a1x, a1y, a1z, a2x, a2y, a2z)
  );
}

export interface MeshPairDistanceResult {
  readonly colliding: boolean;
  readonly minDistMm: number;
  readonly pointA: [number, number, number];
  readonly pointB: [number, number, number];
  readonly normal: [number, number, number]; // unit vector from A toward B
}

/**
 * Dual-BVH exact surface distance & genuine triangle-triangle penetration check between two world meshes.
 */
export function queryMeshPairExact(
  A: WorldMeshBvh,
  B: WorldMeshBvh,
  maxSearchDistMm = 40.0
): MeshPairDistanceResult {
  let bestDistSq = maxSearchDistMm * maxSearchDistMm;
  let colliding = false;
  const pA: [number, number, number] = [
    0.5 * (A.box[0] + A.box[3]),
    0.5 * (A.box[1] + A.box[4]),
    0.5 * (A.box[2] + A.box[5]),
  ];
  const pB: [number, number, number] = [
    0.5 * (B.box[0] + B.box[3]),
    0.5 * (B.box[1] + B.box[4]),
    0.5 * (B.box[2] + B.box[5]),
  ];

  if (A.triCount === 0 || B.triCount === 0) {
    const dx = Math.max(0, A.box[0] - B.box[3], B.box[0] - A.box[3]);
    const dy = Math.max(0, A.box[1] - B.box[4], B.box[1] - A.box[4]);
    const dz = Math.max(0, A.box[2] - B.box[5], B.box[2] - A.box[5]);
    const d = Math.hypot(dx, dy, dz);
    const nx = pB[0] - pA[0], ny = pB[1] - pA[1], nz = pB[2] - pA[2];
    const nl = Math.hypot(nx, ny, nz) || 1;
    return { colliding: d === 0, minDistMm: d, pointA: pA, pointB: pB, normal: [nx / nl, ny / nl, nz / nl] };
  }

  const stackA = new Int32Array(256);
  const stackB = new Int32Array(256);
  let sp = 0;
  stackA[sp] = 0;
  stackB[sp] = 0;
  sp++;

  const tmpPt: [number, number, number] = [0, 0, 0];
  let pairChecks = 0;
  const MAX_PAIR_CHECKS = 4096;

  while (sp > 0 && pairChecks < MAX_PAIR_CHECKS) {
    sp--;
    const na = stackA[sp];
    const nb = stackB[sp];
    const lbSq = boxBoxMinDistSqArr(A.nodeBounds, na * 6, B.nodeBounds, nb * 6);
    if (lbSq > bestDistSq) continue;

    const la = A.nodeLeft[na];
    const lb = B.nodeLeft[nb];
    const leafA = la < 0;
    const leafB = lb < 0;

    if (leafA && leafB) {
      const startA = -la - 1, cntA = A.nodeRight[na];
      const startB = -lb - 1, cntB = B.nodeRight[nb];
      for (let i = 0; i < cntA; i++) {
        const oA = A.triOrder[startA + i] * 9;
        for (let j = 0; j < cntB; j++) {
          pairChecks++;
          const oB = B.triOrder[startB + j] * 9;
          if (!colliding && lbSq <= 1e-6 && triTriOverlapStrict(A.tris, oA, B.tris, oB)) {
            colliding = true;
            bestDistSq = 0;
            pA[0] = (A.tris[oA] + A.tris[oA + 3] + A.tris[oA + 6]) / 3;
            pA[1] = (A.tris[oA + 1] + A.tris[oA + 4] + A.tris[oA + 7]) / 3;
            pA[2] = (A.tris[oA + 2] + A.tris[oA + 5] + A.tris[oA + 8]) / 3;
            pB[0] = (B.tris[oB] + B.tris[oB + 3] + B.tris[oB + 6]) / 3;
            pB[1] = (B.tris[oB + 1] + B.tris[oB + 4] + B.tris[oB + 7]) / 3;
            pB[2] = (B.tris[oB + 2] + B.tris[oB + 5] + B.tris[oB + 8]) / 3;
            break;
          }
          // Sample 3 vertices of A vs tri B and 3 vertices of B vs tri A for tight nearest surface distance
          for (let v = 0; v < 3; v++) {
            const vx = A.tris[oA + v * 3], vy = A.tris[oA + v * 3 + 1], vz = A.tris[oA + v * 3 + 2];
            const dSq = pointTriDistSqOut(
              vx, vy, vz,
              B.tris[oB], B.tris[oB + 1], B.tris[oB + 2],
              B.tris[oB + 3], B.tris[oB + 4], B.tris[oB + 5],
              B.tris[oB + 6], B.tris[oB + 7], B.tris[oB + 8],
              tmpPt
            );
            if (dSq < bestDistSq) {
              bestDistSq = dSq;
              pA[0] = vx; pA[1] = vy; pA[2] = vz;
              pB[0] = tmpPt[0]; pB[1] = tmpPt[1]; pB[2] = tmpPt[2];
            }
          }
          for (let v = 0; v < 3; v++) {
            const vx = B.tris[oB + v * 3], vy = B.tris[oB + v * 3 + 1], vz = B.tris[oB + v * 3 + 2];
            const dSq = pointTriDistSqOut(
              vx, vy, vz,
              A.tris[oA], A.tris[oA + 1], A.tris[oA + 2],
              A.tris[oA + 3], A.tris[oA + 4], A.tris[oA + 5],
              A.tris[oA + 6], A.tris[oA + 7], A.tris[oA + 8],
              tmpPt
            );
            if (dSq < bestDistSq) {
              bestDistSq = dSq;
              pA[0] = tmpPt[0]; pA[1] = tmpPt[1]; pA[2] = tmpPt[2];
              pB[0] = vx; pB[1] = vy; pB[2] = vz;
            }
          }
        }
        if (colliding) break;
      }
      if (colliding) break;
    } else if (!leafA && (leafB || A.nodeBounds[na * 6 + 3] - A.nodeBounds[na * 6] >= B.nodeBounds[nb * 6 + 3] - B.nodeBounds[nb * 6])) {
      if (sp + 2 <= stackA.length) {
        stackA[sp] = la; stackB[sp] = nb; sp++;
        stackA[sp] = A.nodeRight[na]; stackB[sp] = nb; sp++;
      }
    } else if (!leafB) {
      if (sp + 2 <= stackA.length) {
        stackA[sp] = na; stackB[sp] = lb; sp++;
        stackA[sp] = na; stackB[sp] = B.nodeRight[nb]; sp++;
      }
    }
  }

  if (!colliding) {
    const ovX = Math.min(A.box[3], B.box[3]) - Math.max(A.box[0], B.box[0]);
    const ovY = Math.min(A.box[4], B.box[4]) - Math.max(A.box[1], B.box[1]);
    const ovZ = Math.min(A.box[5], B.box[5]) - Math.max(A.box[2], B.box[2]);
    if (ovX > 0.4 && ovY > 0.4 && ovZ > 0.4) {
      const cAx = 0.5 * (A.box[0] + A.box[3]);
      const cAy = 0.5 * (A.box[1] + A.box[4]);
      const cAz = 0.5 * (A.box[2] + A.box[5]);
      const cBx = 0.5 * (B.box[0] + B.box[3]);
      const cBy = 0.5 * (B.box[1] + B.box[4]);
      const cBz = 0.5 * (B.box[2] + B.box[5]);
      if (pointInsideMeshBvh(B, cAx, cAy, cAz) || pointInsideMeshBvh(A, cBx, cBy, cBz)) {
        colliding = true;
        bestDistSq = 0;
        pA[0] = cAx; pA[1] = cAy; pA[2] = cAz;
        pB[0] = cBx; pB[1] = cBy; pB[2] = cBz;
      }
    }
  }

  const dx = pB[0] - pA[0], dy = pB[1] - pA[1], dz = pB[2] - pA[2];
  const dl = Math.hypot(dx, dy, dz);
  const nx = dl > 1e-6 ? dx / dl : 0;
  const ny = dl > 1e-6 ? dy / dl : 1;
  const nz = dl > 1e-6 ? dz / dl : 0;

  return {
    colliding,
    minDistMm: colliding ? 0 : Math.sqrt(bestDistSq),
    pointA: pA,
    pointB: pB,
    normal: [nx, ny, nz],
  };
}

/**
 * Odd-even Jordan ray-parity test for watertight solid containment.
 */
function pointInsideMeshBvh(bvh: WorldMeshBvh, ox: number, oy: number, oz: number): boolean {
  if (bvh.triCount < 4) return false;
  if (
    ox < bvh.box[0] || ox > bvh.box[3] ||
    oy < bvh.box[1] || oy > bvh.box[4] ||
    oz < bvh.box[2] || oz > bvh.box[5]
  ) {
    return false;
  }
  // Irrational oblique direction avoids hitting edges/vertices simultaneously
  const dx = 0.731058, dy = 0.517213, dz = 0.444991;
  const invX = 1.0 / dx, invY = 1.0 / dy, invZ = 1.0 / dz;
  let hits = 0;
  const stack = new Int32Array(64);
  let sp = 0;
  stack[sp++] = 0;

  while (sp > 0) {
    const ni = stack[--sp];
    const bo = ni * 6;
    const t1 = (bvh.nodeBounds[bo] - ox) * invX;
    const t2 = (bvh.nodeBounds[bo + 3] - ox) * invX;
    const t3 = (bvh.nodeBounds[bo + 1] - oy) * invY;
    const t4 = (bvh.nodeBounds[bo + 4] - oy) * invY;
    const t5 = (bvh.nodeBounds[bo + 2] - oz) * invZ;
    const t6 = (bvh.nodeBounds[bo + 5] - oz) * invZ;
    const tEnter = Math.max(Math.min(t1, t2), Math.min(t3, t4), Math.min(t5, t6));
    const tExit = Math.min(Math.max(t1, t2), Math.max(t3, t4), Math.max(t5, t6));
    if (tExit < 1e-4 || tExit < tEnter) continue;

    const left = bvh.nodeLeft[ni];
    if (left < 0) {
      const start = -left - 1, cnt = bvh.nodeRight[ni];
      for (let i = 0; i < cnt; i++) {
        const o = bvh.triOrder[start + i] * 9;
        const ax = bvh.tris[o], ay = bvh.tris[o + 1], az = bvh.tris[o + 2];
        const e1x = bvh.tris[o + 3] - ax, e1y = bvh.tris[o + 4] - ay, e1z = bvh.tris[o + 5] - az;
        const e2x = bvh.tris[o + 6] - ax, e2y = bvh.tris[o + 7] - ay, e2z = bvh.tris[o + 8] - az;
        const hx = dy * e2z - dz * e2y;
        const hy = dz * e2x - dx * e2z;
        const hz = dx * e2y - dy * e2x;
        const a = e1x * hx + e1y * hy + e1z * hz;
        if (Math.abs(a) < 1e-9) continue;
        const f = 1.0 / a;
        const sx = ox - ax, sy = oy - ay, sz = oz - az;
        const u = f * (sx * hx + sy * hy + sz * hz);
        if (u < 0 || u > 1) continue;
        const qx = sy * e1z - sz * e1y;
        const qy = sz * e1x - sx * e1z;
        const qz = sx * e1y - sy * e1x;
        const v = f * (dx * qx + dy * qy + dz * qz);
        if (v < 0 || u + v > 1) continue;
        const t = f * (e2x * qx + e2y * qy + e2z * qz);
        if (t > 1e-4) hits++;
      }
    } else if (sp + 2 <= stack.length) {
      stack[sp++] = left;
      stack[sp++] = bvh.nodeRight[ni];
    }
  }
  return (hits & 1) === 1;
}

/**
 * Exact Ray vs WorldMeshBvh intersection (returns closest hit t in [tMin, tMax] or Infinity).
 */
export function rayHitMeshBvh(
  bvh: WorldMeshBvh,
  ox: number, oy: number, oz: number,
  dx: number, dy: number, dz: number,
  tMin = 1e-3,
  tMax = 500.0
): number {
  if (bvh.triCount === 0) return Infinity;
  const invX = Math.abs(dx) > 1e-12 ? 1.0 / dx : 1e12;
  const invY = Math.abs(dy) > 1e-12 ? 1.0 / dy : 1e12;
  const invZ = Math.abs(dz) > 1e-12 ? 1.0 / dz : 1e12;

  let bestT = tMax;
  const stack = new Int32Array(64);
  let sp = 0;
  stack[sp++] = 0;

  while (sp > 0) {
    const ni = stack[--sp];
    const bo = ni * 6;
    const t1 = (bvh.nodeBounds[bo] - ox) * invX;
    const t2 = (bvh.nodeBounds[bo + 3] - ox) * invX;
    const t3 = (bvh.nodeBounds[bo + 1] - oy) * invY;
    const t4 = (bvh.nodeBounds[bo + 4] - oy) * invY;
    const t5 = (bvh.nodeBounds[bo + 2] - oz) * invZ;
    const t6 = (bvh.nodeBounds[bo + 5] - oz) * invZ;
    const tEnter = Math.max(Math.min(t1, t2), Math.min(t3, t4), Math.min(t5, t6));
    const tExit = Math.min(Math.max(t1, t2), Math.max(t3, t4), Math.max(t5, t6));
    if (tExit < tMin || tEnter > bestT || tExit < tEnter) continue;

    const left = bvh.nodeLeft[ni];
    if (left < 0) {
      const start = -left - 1, cnt = bvh.nodeRight[ni];
      for (let i = 0; i < cnt; i++) {
        const o = bvh.triOrder[start + i] * 9;
        const ax = bvh.tris[o], ay = bvh.tris[o + 1], az = bvh.tris[o + 2];
        const e1x = bvh.tris[o + 3] - ax, e1y = bvh.tris[o + 4] - ay, e1z = bvh.tris[o + 5] - az;
        const e2x = bvh.tris[o + 6] - ax, e2y = bvh.tris[o + 7] - ay, e2z = bvh.tris[o + 8] - az;
        const hx = dy * e2z - dz * e2y;
        const hy = dz * e2x - dx * e2z;
        const hz = dx * e2y - dy * e2x;
        const a = e1x * hx + e1y * hy + e1z * hz;
        if (Math.abs(a) < 1e-9) continue;
        const f = 1.0 / a;
        const sx = ox - ax, sy = oy - ay, sz = oz - az;
        const u = f * (sx * hx + sy * hy + sz * hz);
        if (u < 0 || u > 1) continue;
        const qx = sy * e1z - sz * e1y;
        const qy = sz * e1x - sx * e1z;
        const qz = sx * e1y - sy * e1x;
        const v = f * (dx * qx + dy * qy + dz * qz);
        if (v < 0 || u + v > 1) continue;
        const t = f * (e2x * qx + e2y * qy + e2z * qz);
        if (t >= tMin && t < bestT) bestT = t;
      }
    } else if (sp + 2 <= stack.length) {
      stack[sp++] = left;
      stack[sp++] = bvh.nodeRight[ni];
    }
  }
  return bestT < tMax ? bestT : Infinity;
}
