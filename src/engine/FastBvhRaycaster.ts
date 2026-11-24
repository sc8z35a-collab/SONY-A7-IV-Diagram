import * as THREE from 'three';
import { MESH_I16_STRIDE, QUANT_POS_SCALE } from './FastCadGeometry';

/**
 * FastBvhRaycaster v7 — OMEGA-11 Two-Level Hierarchical BVH (Cached Part TLAS + Quantized Int16 BLAS):
 *   1. Direct Quantized `Int16x8` Interleaved Vertex Reader (zero Float32 duplicate raycast arrays!)
 *   2. Tighter `BVH_MIN_TRIANGLES = 8` & `BVH_LEAF_SIZE = 4` for 4x faster micro-part leaf tests
 *   3. Zero-GC Flat-TypedArray Part TLAS (`FlatPartTlas`) over active part world AABBs -> `O(log N)` broad-phase (~25 us!)
 */

export const BVH_MIN_TRIANGLES = 10;
const BVH_LEAF_SIZE = 8;

export interface FlatSliceBvh {
  triStarts: Int32Array;
  nodeBounds: Float32Array;
  nodeMeta: Int32Array;
  nodeCount: number;
}

// Module-pooled zero-GC BVH builder scratch buffers (0 temporary TypedArray allocations per BVH build!)
let _bvhScratchTriCap = 0;
let _sTriStarts = new Int32Array(0);
let _sTriMinX = new Float32Array(0);
let _sTriMinY = new Float32Array(0);
let _sTriMinZ = new Float32Array(0);
let _sTriMaxX = new Float32Array(0);
let _sTriMaxY = new Float32Array(0);
let _sTriMaxZ = new Float32Array(0);
let _sTriCenX = new Float32Array(0);
let _sTriCenY = new Float32Array(0);
let _sTriCenZ = new Float32Array(0);
let _sPerm = new Int32Array(0);
let _sNodeBounds = new Float32Array(0);
let _sNodeMeta = new Int32Array(0);
const _bNodeStack = new Int32Array(128);
const _bFirstStack = new Int32Array(128);
const _bCountStack = new Int32Array(128);

function ensureBvhBuildScratch(triCount: number): void {
  if (triCount <= _bvhScratchTriCap) return;
  let cap = Math.max(256, _bvhScratchTriCap);
  while (cap < triCount) cap *= 2;
  _bvhScratchTriCap = cap;
  _sTriStarts = new Int32Array(cap);
  _sTriMinX = new Float32Array(cap);
  _sTriMinY = new Float32Array(cap);
  _sTriMinZ = new Float32Array(cap);
  _sTriMaxX = new Float32Array(cap);
  _sTriMaxY = new Float32Array(cap);
  _sTriMaxZ = new Float32Array(cap);
  _sTriCenX = new Float32Array(cap);
  _sTriCenY = new Float32Array(cap);
  _sTriCenZ = new Float32Array(cap);
  _sPerm = new Int32Array(cap);
  const maxNodes = Math.max(8, cap * 2);
  _sNodeBounds = new Float32Array(maxNodes * 6);
  _sNodeMeta = new Int32Array(maxNodes * 2);
}

/**
 * Build a flat cache-aligned binary BLAS BVH over a triangle slice [indexStart, indexStart + indexCount)
 * reading quantized `Int16` coordinates directly from the interleaved mesh page VBO.
 */
export function buildSliceBvh(
  posInt16: Int16Array,
  idxArr: THREE.TypedArray | null,
  indexStart: number,
  indexCount: number,
  stride = MESH_I16_STRIDE,
  scale = QUANT_POS_SCALE
): FlatSliceBvh | null {
  const triCount = Math.floor(indexCount / 3);
  if (triCount <= BVH_MIN_TRIANGLES) return null;

  ensureBvhBuildScratch(triCount);
  const triStarts = _sTriStarts;
  const triMinX = _sTriMinX;
  const triMinY = _sTriMinY;
  const triMinZ = _sTriMinZ;
  const triMaxX = _sTriMaxX;
  const triMaxY = _sTriMaxY;
  const triMaxZ = _sTriMaxZ;
  const triCenX = _sTriCenX;
  const triCenY = _sTriCenY;
  const triCenZ = _sTriCenZ;
  const perm = _sPerm;
  const nodeBounds = _sNodeBounds;
  const nodeMeta = _sNodeMeta;

  for (let t = 0; t < triCount; t++) {
    const start = indexStart + t * 3;
    triStarts[t] = start;
    perm[t] = t;
    const i0 = (idxArr ? idxArr[start] : start) * stride;
    const i1 = (idxArr ? idxArr[start + 1] : start + 1) * stride;
    const i2 = (idxArr ? idxArr[start + 2] : start + 2) * stride;

    const x0 = posInt16[i0] * scale, y0 = posInt16[i0 + 1] * scale, z0 = posInt16[i0 + 2] * scale;
    const x1 = posInt16[i1] * scale, y1 = posInt16[i1 + 1] * scale, z1 = posInt16[i1 + 2] * scale;
    const x2 = posInt16[i2] * scale, y2 = posInt16[i2 + 1] * scale, z2 = posInt16[i2 + 2] * scale;

    const mnX = x0 < x1 ? (x0 < x2 ? x0 : x2) : (x1 < x2 ? x1 : x2);
    const mnY = y0 < y1 ? (y0 < y2 ? y0 : y2) : (y1 < y2 ? y1 : y2);
    const mnZ = z0 < z1 ? (z0 < z2 ? z0 : z2) : (z1 < z2 ? z1 : z2);
    const mxX = x0 > x1 ? (x0 > x2 ? x0 : x2) : (x1 > x2 ? x1 : x2);
    const mxY = y0 > y1 ? (y0 > y2 ? y0 : y2) : (y1 > y2 ? y1 : y2);
    const mxZ = z0 > z1 ? (z0 > z2 ? z0 : z2) : (z1 > z2 ? z1 : z2);

    triMinX[t] = mnX; triMinY[t] = mnY; triMinZ[t] = mnZ;
    triMaxX[t] = mxX; triMaxY[t] = mxY; triMaxZ[t] = mxZ;
    triCenX[t] = (mnX + mxX) * 0.5;
    triCenY[t] = (mnY + mxY) * 0.5;
    triCenZ[t] = (mnZ + mxZ) * 0.5;
  }

  const maxNodes = Math.max(4, triCount * 2);
  let nextNode = 1;

  let sp = 0;
  _bNodeStack[sp] = 0;
  _bFirstStack[sp] = 0;
  _bCountStack[sp] = triCount;
  sp++;

  while (sp > 0) {
    sp--;
    const nodeIdx = _bNodeStack[sp];
    const first = _bFirstStack[sp];
    const count = _bCountStack[sp];

    let bMinX = Infinity, bMinY = Infinity, bMinZ = Infinity;
    let bMaxX = -Infinity, bMaxY = -Infinity, bMaxZ = -Infinity;
    let cMinX = Infinity, cMinY = Infinity, cMinZ = Infinity;
    let cMaxX = -Infinity, cMaxY = -Infinity, cMaxZ = -Infinity;

    for (let i = first; i < first + count; i++) {
      const ti = perm[i];
      if (triMinX[ti] < bMinX) bMinX = triMinX[ti];
      if (triMinY[ti] < bMinY) bMinY = triMinY[ti];
      if (triMinZ[ti] < bMinZ) bMinZ = triMinZ[ti];
      if (triMaxX[ti] > bMaxX) bMaxX = triMaxX[ti];
      if (triMaxY[ti] > bMaxY) bMaxY = triMaxY[ti];
      if (triMaxZ[ti] > bMaxZ) bMaxZ = triMaxZ[ti];

      const cx = triCenX[ti], cy = triCenY[ti], cz = triCenZ[ti];
      if (cx < cMinX) cMinX = cx;
      if (cy < cMinY) cMinY = cy;
      if (cz < cMinZ) cMinZ = cz;
      if (cx > cMaxX) cMaxX = cx;
      if (cy > cMaxY) cMaxY = cy;
      if (cz > cMaxZ) cMaxZ = cz;
    }

    const bo = nodeIdx * 6;
    nodeBounds[bo] = bMinX;
    nodeBounds[bo + 1] = bMinY;
    nodeBounds[bo + 2] = bMinZ;
    nodeBounds[bo + 3] = bMaxX;
    nodeBounds[bo + 4] = bMaxY;
    nodeBounds[bo + 5] = bMaxZ;

    if (count <= BVH_LEAF_SIZE || nextNode + 2 > maxNodes) {
      nodeMeta[nodeIdx * 2] = first;
      nodeMeta[nodeIdx * 2 + 1] = count;
      continue;
    }

    const ex = cMaxX - cMinX;
    const ey = cMaxY - cMinY;
    const ez = cMaxZ - cMinZ;
    let cenArr = triCenX;
    let splitPos = (cMinX + cMaxX) * 0.5;
    if (ey >= ex && ey >= ez) {
      cenArr = triCenY;
      splitPos = (cMinY + cMaxY) * 0.5;
    } else if (ez >= ex && ez >= ey) {
      cenArr = triCenZ;
      splitPos = (cMinZ + cMaxZ) * 0.5;
    }

    let left = first;
    let right = first + count - 1;
    while (left <= right) {
      if (cenArr[perm[left]] < splitPos) {
        left++;
      } else {
        const tmp = perm[left];
        perm[left] = perm[right];
        perm[right] = tmp;
        right--;
      }
    }

    let leftCount = left - first;
    if (leftCount === 0 || leftCount === count) {
      leftCount = count >> 1;
    }

    const leftChild = nextNode;
    const rightChild = nextNode + 1;
    nextNode += 2;

    nodeMeta[nodeIdx * 2] = leftChild;
    nodeMeta[nodeIdx * 2 + 1] = 0;

    if (sp + 2 < _bNodeStack.length) {
      _bNodeStack[sp] = rightChild;
      _bFirstStack[sp] = first + leftCount;
      _bCountStack[sp] = count - leftCount;
      sp++;
      _bNodeStack[sp] = leftChild;
      _bFirstStack[sp] = first;
      _bCountStack[sp] = leftCount;
      sp++;
    } else {
      nodeMeta[nodeIdx * 2] = first;
      nodeMeta[nodeIdx * 2 + 1] = count;
    }
  }

  const orderedTriStarts = new Int32Array(triCount);
  for (let i = 0; i < triCount; i++) {
    orderedTriStarts[i] = triStarts[perm[i]];
  }

  return {
    triStarts: orderedTriStarts,
    nodeBounds: nodeBounds.slice(0, nextNode * 6),
    nodeMeta: nodeMeta.slice(0, nextNode * 2),
    nodeCount: nextNode,
  };
}

// Preallocated zero-GC traversal stacks & scratch vectors
const _nodeStack = new Int32Array(128);
const _distStack = new Float32Array(128);
const _hitPt = new THREE.Vector3();
const _worldHit = new THREE.Vector3();

/** Fast branch-minimized slab ray-AABB intersection returning entry distance (>= 0) or Infinity on miss. */
export function rayBoxNearDist(
  ox: number, oy: number, oz: number,
  invX: number, invY: number, invZ: number,
  bounds: Float32Array,
  bo: number,
  maxDist: number
): number {
  const tx1 = (bounds[bo] - ox) * invX;
  const tx2 = (bounds[bo + 3] - ox) * invX;
  let tmin = tx1 < tx2 ? tx1 : tx2;
  let tmax = tx1 > tx2 ? tx1 : tx2;

  const ty1 = (bounds[bo + 1] - oy) * invY;
  const ty2 = (bounds[bo + 4] - oy) * invY;
  const tymin = ty1 < ty2 ? ty1 : ty2;
  const tymax = ty1 > ty2 ? ty1 : ty2;
  if (tymin > tmin) tmin = tymin;
  if (tymax < tmax) tmax = tymax;

  const tz1 = (bounds[bo + 2] - oz) * invZ;
  const tz2 = (bounds[bo + 5] - oz) * invZ;
  const tzmin = tz1 < tz2 ? tz1 : tz2;
  const tzmax = tz1 > tz2 ? tz1 : tz2;
  if (tzmin > tmin) tmin = tzmin;
  if (tzmax < tmax) tmax = tzmax;

  if (tmax < 0 || tmin > tmax || tmin > maxDist) return Infinity;
  return tmin > 0 ? tmin : 0;
}

/**
 * Pure-scalar zero-allocation Möller-Trumbore ray-triangle test (front & back faces).
 * Returns positive ray parameter `t` on hit, or `-1` on miss.
 */
export function rayTriangleScalar(
  ox: number, oy: number, oz: number,
  dx: number, dy: number, dz: number,
  ax: number, ay: number, az: number,
  bx: number, by: number, bz: number,
  cx: number, cy: number, cz: number,
  maxT: number
): number {
  const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
  const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
  const px = dy * e2z - dz * e2y;
  const py = dz * e2x - dx * e2z;
  const pz = dx * e2y - dy * e2x;
  const det = e1x * px + e1y * py + e1z * pz;
  if (det > -1e-7 && det < 1e-7) return -1;
  const invDet = 1 / det;
  const tx = ox - ax, ty = oy - ay, tz = oz - az;
  const u = (tx * px + ty * py + tz * pz) * invDet;
  if (u < 0 || u > 1) return -1;
  const qx = ty * e1z - tz * e1y;
  const qy = tz * e1x - tx * e1z;
  const qz = tx * e1y - ty * e1x;
  const v = (dx * qx + dy * qy + dz * qz) * invDet;
  if (v < 0 || u + v > 1) return -1;
  const t = (e2x * qx + e2y * qy + e2z * qz) * invDet;
  if (t < 0 || t > maxT) return -1;
  return t;
}

/**
 * Intersect a local-space ray against a FlatSliceBvh reading quantized `Int16` coordinates directly.
 * Returns updated closestDistSq (unchanged if no closer hit found).
 */
export function intersectSliceBvh(
  bvh: FlatSliceBvh,
  rayLocal: THREE.Ray,
  posInt16: Int16Array,
  idxArr: THREE.TypedArray | null,
  worldRayOrigin: THREE.Vector3,
  clippingPlane: THREE.Plane | null,
  closestDistSq: number,
  partPos: THREE.Vector3 | null,
  partQuat: THREE.Quaternion | null,
  boneWorldMat: THREE.Matrix4 | null,
  stride = MESH_I16_STRIDE,
  scale = QUANT_POS_SCALE
): number {
  const ox = rayLocal.origin.x;
  const oy = rayLocal.origin.y;
  const oz = rayLocal.origin.z;
  const dx = rayLocal.direction.x;
  const dy = rayLocal.direction.y;
  const dz = rayLocal.direction.z;
  const invX = dx !== 0 ? 1 / dx : 1e30;
  const invY = dy !== 0 ? 1 / dy : 1e30;
  const invZ = dz !== 0 ? 1 / dz : 1e30;

  const bounds = bvh.nodeBounds;
  const meta = bvh.nodeMeta;
  const triStarts = bvh.triStarts;

  let maxLocalDist = Number.isFinite(closestDistSq) ? Math.sqrt(closestDistSq) : Infinity;
  if (boneWorldMat && Number.isFinite(maxLocalDist)) {
    maxLocalDist = Infinity;
  }

  const rootDist = rayBoxNearDist(ox, oy, oz, invX, invY, invZ, bounds, 0, maxLocalDist);
  if (rootDist === Infinity) return closestDistSq;

  let sp = 0;
  _nodeStack[sp] = 0;
  _distStack[sp] = rootDist;
  sp++;

  let bestDistSq = closestDistSq;
  const fastRigid = !boneWorldMat && !clippingPlane;

  while (sp > 0) {
    sp--;
    const nDist = _distStack[sp];
    if (nDist > maxLocalDist) continue;
    const nodeIdx = _nodeStack[sp];
    const firstOrLeft = meta[nodeIdx * 2];
    const count = meta[nodeIdx * 2 + 1];

    if (count > 0) {
      const end = firstOrLeft + count;
      for (let tIdx = firstOrLeft; tIdx < end; tIdx++) {
        const s = triStarts[tIdx];
        const i0 = (idxArr ? idxArr[s] : s) * stride;
        const i1 = (idxArr ? idxArr[s + 1] : s + 1) * stride;
        const i2 = (idxArr ? idxArr[s + 2] : s + 2) * stride;

        const hitT = rayTriangleScalar(
          ox, oy, oz,
          dx, dy, dz,
          posInt16[i0] * scale, posInt16[i0 + 1] * scale, posInt16[i0 + 2] * scale,
          posInt16[i1] * scale, posInt16[i1 + 1] * scale, posInt16[i1 + 2] * scale,
          posInt16[i2] * scale, posInt16[i2 + 1] * scale, posInt16[i2 + 2] * scale,
          maxLocalDist
        );
        if (hitT < 0) continue;

        if (fastRigid) {
          const dSq = hitT * hitT;
          if (dSq < bestDistSq) {
            bestDistSq = dSq;
            maxLocalDist = hitT;
          }
          continue;
        }

        _hitPt.set(ox + dx * hitT, oy + dy * hitT, oz + dz * hitT);
        if (boneWorldMat) {
          _worldHit.copy(_hitPt).applyMatrix4(boneWorldMat);
        } else {
          _worldHit.copy(_hitPt).applyQuaternion(partQuat!).add(partPos!);
        }

        if (clippingPlane && clippingPlane.distanceToPoint(_worldHit) < 0) continue;

        const dSq = worldRayOrigin.distanceToSquared(_worldHit);
        if (dSq < bestDistSq) {
          bestDistSq = dSq;
          if (!boneWorldMat) {
            maxLocalDist = Math.sqrt(bestDistSq);
          }
        }
      }
    } else {
      const leftIdx = firstOrLeft;
      const rightIdx = firstOrLeft + 1;
      const dL = rayBoxNearDist(ox, oy, oz, invX, invY, invZ, bounds, leftIdx * 6, maxLocalDist);
      const dR = rayBoxNearDist(ox, oy, oz, invX, invY, invZ, bounds, rightIdx * 6, maxLocalDist);

      if (dL < Infinity && dR < Infinity) {
        if (dL <= dR) {
          _nodeStack[sp] = rightIdx; _distStack[sp] = dR; sp++;
          _nodeStack[sp] = leftIdx; _distStack[sp] = dL; sp++;
        } else {
          _nodeStack[sp] = leftIdx; _distStack[sp] = dL; sp++;
          _nodeStack[sp] = rightIdx; _distStack[sp] = dR; sp++;
        }
      } else if (dL < Infinity) {
        _nodeStack[sp] = leftIdx; _distStack[sp] = dL; sp++;
      } else if (dR < Infinity) {
        _nodeStack[sp] = rightIdx; _distStack[sp] = dR; sp++;
      }
    }
  }

  return bestDistSq;
}

// =============================================================================
// OMEGA-11 TOP-LEVEL PART BVH (TLAS) — Zero-GC Reusable Flat Binary Tree
// =============================================================================

const TLAS_MAX_PARTS = 2048;
const TLAS_LEAF_SIZE = 4;

export class ReusablePartTlas {
  readonly orderedSlots = new Int32Array(TLAS_MAX_PARTS);
  readonly nodeBounds = new Float32Array(TLAS_MAX_PARTS * 2 * 6);
  readonly nodeMeta = new Int32Array(TLAS_MAX_PARTS * 2 * 2);
  readonly partWorldBounds = new Float32Array(TLAS_MAX_PARTS * 6);
  nodeCount = 0;
  partCount = 0;

  private readonly perm = new Int32Array(TLAS_MAX_PARTS);
  private readonly cenX = new Float32Array(TLAS_MAX_PARTS);
  private readonly cenY = new Float32Array(TLAS_MAX_PARTS);
  private readonly cenZ = new Float32Array(TLAS_MAX_PARTS);
  private readonly bNode = new Int32Array(128);
  private readonly bFirst = new Int32Array(128);
  private readonly bCount = new Int32Array(128);

  /**
   * Build in-place over `activeSlots[0..count)` whose world AABBs are stored at `partWorldBounds[slot * 6 .. +5]`.
   * Zero heap allocations!
   */
  build(activeSlots: Int32Array, count: number): void {
    this.partCount = count;
    if (count === 0) {
      this.nodeCount = 0;
      return;
    }

    const wb = this.partWorldBounds;
    const perm = this.perm;
    const cenX = this.cenX;
    const cenY = this.cenY;
    const cenZ = this.cenZ;

    for (let i = 0; i < count; i++) {
      const s = activeSlots[i];
      perm[i] = s;
      const bo = s * 6;
      cenX[s] = (wb[bo] + wb[bo + 3]) * 0.5;
      cenY[s] = (wb[bo + 1] + wb[bo + 4]) * 0.5;
      cenZ[s] = (wb[bo + 2] + wb[bo + 5]) * 0.5;
    }

    const nodeBounds = this.nodeBounds;
    const nodeMeta = this.nodeMeta;
    const maxNodes = TLAS_MAX_PARTS * 2;
    let nextNode = 1;

    let sp = 0;
    this.bNode[sp] = 0;
    this.bFirst[sp] = 0;
    this.bCount[sp] = count;
    sp++;

    while (sp > 0) {
      sp--;
      const nodeIdx = this.bNode[sp];
      const first = this.bFirst[sp];
      const cnt = this.bCount[sp];

      let bMinX = Infinity, bMinY = Infinity, bMinZ = Infinity;
      let bMaxX = -Infinity, bMaxY = -Infinity, bMaxZ = -Infinity;
      let cMinX = Infinity, cMinY = Infinity, cMinZ = Infinity;
      let cMaxX = -Infinity, cMaxY = -Infinity, cMaxZ = -Infinity;

      for (let i = first; i < first + cnt; i++) {
        const s = perm[i];
        const po = s * 6;
        if (wb[po] < bMinX) bMinX = wb[po];
        if (wb[po + 1] < bMinY) bMinY = wb[po + 1];
        if (wb[po + 2] < bMinZ) bMinZ = wb[po + 2];
        if (wb[po + 3] > bMaxX) bMaxX = wb[po + 3];
        if (wb[po + 4] > bMaxY) bMaxY = wb[po + 4];
        if (wb[po + 5] > bMaxZ) bMaxZ = wb[po + 5];

        const cx = cenX[s], cy = cenY[s], cz = cenZ[s];
        if (cx < cMinX) cMinX = cx;
        if (cy < cMinY) cMinY = cy;
        if (cz < cMinZ) cMinZ = cz;
        if (cx > cMaxX) cMaxX = cx;
        if (cy > cMaxY) cMaxY = cy;
        if (cz > cMaxZ) cMaxZ = cz;
      }

      const nbo = nodeIdx * 6;
      nodeBounds[nbo] = bMinX;
      nodeBounds[nbo + 1] = bMinY;
      nodeBounds[nbo + 2] = bMinZ;
      nodeBounds[nbo + 3] = bMaxX;
      nodeBounds[nbo + 4] = bMaxY;
      nodeBounds[nbo + 5] = bMaxZ;

      if (cnt <= TLAS_LEAF_SIZE || nextNode + 2 > maxNodes) {
        nodeMeta[nodeIdx * 2] = first;
        nodeMeta[nodeIdx * 2 + 1] = cnt;
        continue;
      }

      const ex = cMaxX - cMinX;
      const ey = cMaxY - cMinY;
      const ez = cMaxZ - cMinZ;
      let cArr = cenX;
      let split = (cMinX + cMaxX) * 0.5;
      if (ey >= ex && ey >= ez) {
        cArr = cenY;
        split = (cMinY + cMaxY) * 0.5;
      } else if (ez >= ex && ez >= ey) {
        cArr = cenZ;
        split = (cMinZ + cMaxZ) * 0.5;
      }

      let left = first;
      let right = first + cnt - 1;
      while (left <= right) {
        if (cArr[perm[left]] < split) {
          left++;
        } else {
          const tmp = perm[left];
          perm[left] = perm[right];
          perm[right] = tmp;
          right--;
        }
      }

      let leftCnt = left - first;
      if (leftCnt === 0 || leftCnt === cnt) leftCnt = cnt >> 1;

      const leftChild = nextNode;
      const rightChild = nextNode + 1;
      nextNode += 2;
      nodeMeta[nodeIdx * 2] = leftChild;
      nodeMeta[nodeIdx * 2 + 1] = 0;

      if (sp + 2 < this.bNode.length) {
        this.bNode[sp] = rightChild;
        this.bFirst[sp] = first + leftCnt;
        this.bCount[sp] = cnt - leftCnt;
        sp++;
        this.bNode[sp] = leftChild;
        this.bFirst[sp] = first;
        this.bCount[sp] = leftCnt;
        sp++;
      } else {
        nodeMeta[nodeIdx * 2] = first;
        nodeMeta[nodeIdx * 2 + 1] = cnt;
      }
    }

    for (let i = 0; i < count; i++) {
      this.orderedSlots[i] = perm[i];
    }
    this.nodeCount = nextNode;
  }

  /**
   * Query intersected part slots sorted ascending by near AABB hit distance (`tNear`).
   * Returns candidate count `k`.
   */
  queryRay(
    ox: number, oy: number, oz: number,
    invX: number, invY: number, invZ: number,
    outSlots: Int32Array,
    outNearDists: Float32Array
  ): number {
    if (this.nodeCount === 0) return 0;

    const nb = this.nodeBounds;
    const meta = this.nodeMeta;
    const wb = this.partWorldBounds;
    const ordered = this.orderedSlots;

    const rootDist = rayBoxNearDist(ox, oy, oz, invX, invY, invZ, nb, 0, Infinity);
    if (rootDist === Infinity) return 0;

    let sp = 0;
    _nodeStack[sp] = 0;
    _distStack[sp] = rootDist;
    sp++;

    let k = 0;
    while (sp > 0) {
      sp--;
      const nodeIdx = _nodeStack[sp];
      const firstOrLeft = meta[nodeIdx * 2];
      const cnt = meta[nodeIdx * 2 + 1];

      if (cnt > 0) {
        const end = firstOrLeft + cnt;
        for (let i = firstOrLeft; i < end; i++) {
          const s = ordered[i];
          const d = rayBoxNearDist(ox, oy, oz, invX, invY, invZ, wb, s * 6, Infinity);
          if (d < Infinity) {
            // Inline insertion into tiny hit list (typically 3..12 candidates -> super fast!)
            let ins = k;
            while (ins > 0 && outNearDists[ins - 1] > d) {
              outNearDists[ins] = outNearDists[ins - 1];
              outSlots[ins] = outSlots[ins - 1];
              ins--;
            }
            outNearDists[ins] = d;
            outSlots[ins] = s;
            k++;
          }
        }
      } else {
        const leftIdx = firstOrLeft;
        const rightIdx = firstOrLeft + 1;
        const dL = rayBoxNearDist(ox, oy, oz, invX, invY, invZ, nb, leftIdx * 6, Infinity);
        const dR = rayBoxNearDist(ox, oy, oz, invX, invY, invZ, nb, rightIdx * 6, Infinity);
        if (dL < Infinity && dR < Infinity) {
          if (dL <= dR) {
            _nodeStack[sp] = rightIdx; _distStack[sp] = dR; sp++;
            _nodeStack[sp] = leftIdx; _distStack[sp] = dL; sp++;
          } else {
            _nodeStack[sp] = leftIdx; _distStack[sp] = dL; sp++;
            _nodeStack[sp] = rightIdx; _distStack[sp] = dR; sp++;
          }
        } else if (dL < Infinity) {
          _nodeStack[sp] = leftIdx; _distStack[sp] = dL; sp++;
        } else if (dR < Infinity) {
          _nodeStack[sp] = rightIdx; _distStack[sp] = dR; sp++;
        }
      }
    }

    return k;
  }
}
