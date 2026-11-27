import * as THREE from 'three';
import { RaycastMeshBinding, UnitRaycastIndex } from './unit_contract';

// Module-scoped zero-allocation scratch buffers (STRICT ZERO-GC inside pickWithRay)
const _hitScratch: THREE.Intersection[] = [];
const _candPartIndices = new Int32Array(2048);
const _candEntryDistSq = new Float64Array(2048);
const _bvhStack = new Int32Array(128);
let _bvhCentroidsX = new Float32Array(1024);
let _bvhCentroidsY = new Float32Array(1024);
let _bvhCentroidsZ = new Float32Array(1024);
const _bvhBuildFirst = new Int32Array(128);
const _bvhBuildCount = new Int32Array(128);
const _bvhBuildParent = new Int32Array(128);
const _bvhBuildIsRight = new Uint8Array(128);

// Narrow-phase candidate-only intersection scratch objects (DoubleSide for forgiving CAD picking)
const _rayMat = new THREE.Material();
_rayMat.side = THREE.DoubleSide;
const _rayBatchBox = new THREE.Box3();
const _rayBatchSphere = new THREE.Sphere();
const _rayBatchGeo = new THREE.BufferGeometry();
const _rayBatchMesh = new THREE.Mesh(_rayBatchGeo, _rayMat);
const _rayInstMesh = new THREE.Mesh(_rayBatchGeo, _rayMat);
const _invWorldMat = new THREE.Matrix4();
const _worldHitPt = new THREE.Vector3();
const _rangeScratch = {
  vertexStart: 0,
  vertexCount: 0,
  reservedVertexCount: 0,
  indexStart: 0,
  indexCount: 0,
  reservedIndexCount: 0,
  start: 0,
  count: 0,
};

/**
 * Zero-GC iterative in-place rebuild of `UnitRaycastIndex` flat 8-float binary AABB-BVH.
 * Called lazily ONLY when `bvhDirty === true` on the first hover/click after explode/visibility change.
 */
function rebuildFlatPartBvhInPlace(index: UnitRaycastIndex): void {
  const parts = index.parts;
  const n = parts.length;
  if (n === 0) {
    index.bvhNodeCount = 0;
    index.bvhDirty = false;
    return;
  }

  let order = index.bvhPartOrder;
  if (!order || order.length < n) {
    order = new Int32Array(n);
    index.bvhPartOrder = order;
  }
  const maxNodes = Math.max(1, n * 2);
  let nodes = index.bvhNodes;
  if (!nodes || nodes.length < maxNodes * 8) {
    nodes = new Float32Array(maxNodes * 8);
    index.bvhNodes = nodes;
  }
  if (_bvhCentroidsX.length < n) {
    _bvhCentroidsX = new Float32Array(n * 2);
    _bvhCentroidsY = new Float32Array(n * 2);
    _bvhCentroidsZ = new Float32Array(n * 2);
  }

  let validCount = 0;
  for (let i = 0; i < n; i++) {
    const b = parts[i].worldBox;
    if (!b.isEmpty()) {
      order[validCount++] = i;
      _bvhCentroidsX[i] = (b.min.x + b.max.x) * 0.5;
      _bvhCentroidsY[i] = (b.min.y + b.max.y) * 0.5;
      _bvhCentroidsZ[i] = (b.min.z + b.max.z) * 0.5;
    }
  }
  if (validCount === 0) {
    index.bvhNodeCount = 0;
    index.bvhDirty = false;
    return;
  }

  let nextNode = 0;
  let sp = 0;
  _bvhBuildFirst[0] = 0;
  _bvhBuildCount[0] = validCount;
  _bvhBuildParent[0] = -1;
  _bvhBuildIsRight[0] = 0;
  sp = 1;

  while (sp > 0) {
    sp--;
    const first = _bvhBuildFirst[sp];
    const count = _bvhBuildCount[sp];
    const parent = _bvhBuildParent[sp];
    const isRight = _bvhBuildIsRight[sp];

    const nodeIdx = nextNode++;
    const off = nodeIdx * 8;
    if (parent >= 0) {
      if (isRight) {
        nodes[parent * 8 + 7] = -nodeIdx;
      } else {
        nodes[parent * 8 + 6] = nodeIdx;
      }
    }

    let mnX = Infinity, mnY = Infinity, mnZ = Infinity;
    let mxX = -Infinity, mxY = -Infinity, mxZ = -Infinity;
    let cMnX = Infinity, cMnY = Infinity, cMnZ = Infinity;
    let cMxX = -Infinity, cMxY = -Infinity, cMxZ = -Infinity;

    for (let i = first; i < first + count; i++) {
      const pIdx = order[i];
      const b = parts[pIdx].worldBox;
      if (b.min.x < mnX) mnX = b.min.x;
      if (b.min.y < mnY) mnY = b.min.y;
      if (b.min.z < mnZ) mnZ = b.min.z;
      if (b.max.x > mxX) mxX = b.max.x;
      if (b.max.y > mxY) mxY = b.max.y;
      if (b.max.z > mxZ) mxZ = b.max.z;
      const cx = _bvhCentroidsX[pIdx];
      const cy = _bvhCentroidsY[pIdx];
      const cz = _bvhCentroidsZ[pIdx];
      if (cx < cMnX) cMnX = cx;
      if (cy < cMnY) cMnY = cy;
      if (cz < cMnZ) cMnZ = cz;
      if (cx > cMxX) cMxX = cx;
      if (cy > cMxY) cMxY = cy;
      if (cz > cMxZ) cMxZ = cz;
    }

    nodes[off] = mnX;
    nodes[off + 1] = mnY;
    nodes[off + 2] = mnZ;
    nodes[off + 3] = mxX;
    nodes[off + 4] = mxY;
    nodes[off + 5] = mxZ;

    if (count <= 4 || sp + 2 >= _bvhBuildFirst.length) {
      nodes[off + 6] = first;
      nodes[off + 7] = count;
      continue;
    }

    const dx = cMxX - cMnX;
    const dy = cMxY - cMnY;
    const dz = cMxZ - cMnZ;
    const axis = dx >= dy && dx >= dz ? 0 : dy >= dx && dy >= dz ? 1 : 2;
    const cArr = axis === 0 ? _bvhCentroidsX : axis === 1 ? _bvhCentroidsY : _bvhCentroidsZ;
    const splitPos =
      axis === 0 ? (cMnX + cMxX) * 0.5 : axis === 1 ? (cMnY + cMxY) * 0.5 : (cMnZ + cMxZ) * 0.5;

    let i = first;
    let j = first + count - 1;
    while (i <= j) {
      if (cArr[order[i]] < splitPos) {
        i++;
      } else {
        const tmp = order[i];
        order[i] = order[j];
        order[j] = tmp;
        j--;
      }
    }

    let leftCount = i - first;
    if (leftCount === 0 || leftCount === count) {
      leftCount = count >> 1;
    }

    // Push right then left so left is popped first
    _bvhBuildFirst[sp] = first + leftCount;
    _bvhBuildCount[sp] = count - leftCount;
    _bvhBuildParent[sp] = nodeIdx;
    _bvhBuildIsRight[sp] = 1;
    sp++;

    _bvhBuildFirst[sp] = first;
    _bvhBuildCount[sp] = leftCount;
    _bvhBuildParent[sp] = nodeIdx;
    _bvhBuildIsRight[sp] = 0;
    sp++;
  }

  index.bvhNodeCount = nextNode;
  index.bvhDirty = false;
}

/**
 * Inline 6-plane AABB ray slab test returning entry distance >= 0 or -1 on miss (ZERO allocations!).
 */
function intersectAabbSlab(
  ox: number,
  oy: number,
  oz: number,
  invDx: number,
  invDy: number,
  invDz: number,
  mnX: number,
  mnY: number,
  mnZ: number,
  mxX: number,
  mxY: number,
  mxZ: number
): number {
  const tx1 = (mnX - ox) * invDx;
  const tx2 = (mxX - ox) * invDx;
  let tmin = tx1 < tx2 ? tx1 : tx2;
  let tmax = tx1 > tx2 ? tx1 : tx2;

  const ty1 = (mnY - oy) * invDy;
  const ty2 = (mxY - oy) * invDy;
  const tyMin = ty1 < ty2 ? ty1 : ty2;
  const tyMax = ty1 > ty2 ? ty1 : ty2;
  if (tyMin > tmin) tmin = tyMin;
  if (tyMax < tmax) tmax = tyMax;
  if (tmax < tmin) return -1;

  const tz1 = (mnZ - oz) * invDz;
  const tz2 = (mxZ - oz) * invDz;
  const tzMin = tz1 < tz2 ? tz1 : tz2;
  const tzMax = tz1 > tz2 ? tz1 : tz2;
  if (tzMin > tmin) tmin = tzMin;
  if (tzMax < tmax) tmax = tzMax;

  if (tmax < tmin || tmax < 0) return -1;
  return tmin > 0 ? tmin : 0;
}

const TRI_CHUNK_INDICES = 60; // 20 triangles per leaf chunk AABB (3.2x tighter than 64-tri!)
const SUPER_CHUNK_LEAVES = 8; // 8 leaf chunks = 160 triangles per super-chunk AABB
interface ChunkHierarchyCache {
  readonly leaves: Float32Array; // numLeaves * 6
  readonly supers: Float32Array; // numSupers * 6
  readonly numLeaves: number;
  readonly numSupers: number;
}
const _geoChunkCache = new WeakMap<THREE.BufferGeometry, Map<number, ChunkHierarchyCache>>();
const _chunkHitOrder = new Int32Array(256);
const _chunkHitDist = new Float64Array(256);

function getOrBuildChunkHierarchy(
  geo: THREE.BufferGeometry,
  drawStart: number,
  drawCount: number,
  posArr: Int16Array | Float32Array,
  idxArr: Uint16Array | Uint32Array | null
): ChunkHierarchyCache {
  let map = _geoChunkCache.get(geo);
  if (!map) {
    map = new Map<number, ChunkHierarchyCache>();
    _geoChunkCache.set(geo, map);
  }
  let entry = map.get(drawStart);
  if (entry) return entry;

  const end = drawStart + drawCount;
  const numLeaves = Math.ceil(drawCount / TRI_CHUNK_INDICES);
  const leaves = new Float32Array(numLeaves * 6);

  for (let c = 0; c < numLeaves; c++) {
    const cStart = drawStart + c * TRI_CHUNK_INDICES;
    const cEnd = cStart + TRI_CHUNK_INDICES < end ? cStart + TRI_CHUNK_INDICES : end;
    let mnX = Infinity, mnY = Infinity, mnZ = Infinity;
    let mxX = -Infinity, mxY = -Infinity, mxZ = -Infinity;
    for (let i = cStart; i < cEnd; i++) {
      const vi = (idxArr ? idxArr[i] : i) * 3;
      const x = posArr[vi];
      const y = posArr[vi + 1];
      const z = posArr[vi + 2];
      if (x < mnX) mnX = x;
      if (y < mnY) mnY = y;
      if (z < mnZ) mnZ = z;
      if (x > mxX) mxX = x;
      if (y > mxY) mxY = y;
      if (z > mxZ) mxZ = z;
    }
    const o = c * 6;
    leaves[o] = mnX;
    leaves[o + 1] = mnY;
    leaves[o + 2] = mnZ;
    leaves[o + 3] = mxX;
    leaves[o + 4] = mxY;
    leaves[o + 5] = mxZ;
  }

  const numSupers = Math.ceil(numLeaves / SUPER_CHUNK_LEAVES);
  const supers = new Float32Array(numSupers * 6);
  for (let s = 0; s < numSupers; s++) {
    const lStart = s * SUPER_CHUNK_LEAVES;
    const lEnd = Math.min(numLeaves, lStart + SUPER_CHUNK_LEAVES);
    let mnX = Infinity, mnY = Infinity, mnZ = Infinity;
    let mxX = -Infinity, mxY = -Infinity, mxZ = -Infinity;
    for (let c = lStart; c < lEnd; c++) {
      const o = c * 6;
      if (leaves[o] < mnX) mnX = leaves[o];
      if (leaves[o + 1] < mnY) mnY = leaves[o + 1];
      if (leaves[o + 2] < mnZ) mnZ = leaves[o + 2];
      if (leaves[o + 3] > mxX) mxX = leaves[o + 3];
      if (leaves[o + 4] > mxY) mxY = leaves[o + 4];
      if (leaves[o + 5] > mxZ) mxZ = leaves[o + 5];
    }
    const so = s * 6;
    supers[so] = mnX;
    supers[so + 1] = mnY;
    supers[so + 2] = mnZ;
    supers[so + 3] = mxX;
    supers[so + 4] = mxY;
    supers[so + 5] = mxZ;
  }

  entry = { leaves, supers, numLeaves, numSupers };
  map.set(drawStart, entry);
  return entry;
}

/**
 * Strictly monomorphic Int16Array + Uint16Array triangle range loop with unnormalized ray (t === exact world distance!).
 */
function scanTrianglesI16U16(
  posArr: Int16Array,
  idxArr: Uint16Array,
  start: number,
  end: number,
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
  bestDist: number,
  worldRay: THREE.Ray,
  clippingPlane: THREE.Plane | null
): number {
  let best = bestDist;
  for (let i = start; i + 2 < end; i += 3) {
    const i0 = idxArr[i] * 3;
    const i1 = idxArr[i + 1] * 3;
    const i2 = idxArr[i + 2] * 3;

    const v0x = posArr[i0];
    const v0y = posArr[i0 + 1];
    const v0z = posArr[i0 + 2];
    const e1x = posArr[i1] - v0x;
    const e1y = posArr[i1 + 1] - v0y;
    const e1z = posArr[i1 + 2] - v0z;
    const e2x = posArr[i2] - v0x;
    const e2y = posArr[i2 + 1] - v0y;
    const e2z = posArr[i2 + 2] - v0z;

    const px = dy * e2z - dz * e2y;
    const py = dz * e2x - dx * e2z;
    const pz = dx * e2y - dy * e2x;
    const det = e1x * px + e1y * py + e1z * pz;
    if (det > -1e-6 && det < 1e-6) continue;

    const invDet = 1.0 / det;
    const tx = ox - v0x;
    const ty = oy - v0y;
    const tz = oz - v0z;
    const u = (tx * px + ty * py + tz * pz) * invDet;
    if (u < 0 || u > 1) continue;

    const qx = ty * e1z - tz * e1y;
    const qy = tz * e1x - tx * e1z;
    const qz = tx * e1y - ty * e1x;
    const v = (dx * qx + dy * qy + dz * qz) * invDet;
    if (v < 0 || u + v > 1) continue;

    const t = (e2x * qx + e2y * qy + e2z * qz) * invDet;
    if (t <= 1e-4 || t >= best) continue;

    if (clippingPlane) {
      _worldHitPt.set(
        worldRay.origin.x + worldRay.direction.x * t,
        worldRay.origin.y + worldRay.direction.y * t,
        worldRay.origin.z + worldRay.direction.z * t
      );
      if (clippingPlane.distanceToPoint(_worldHitPt) < 0) continue;
    }
    best = t;
  }
  return best;
}

function scanTrianglesGeneric(
  posArr: Int16Array | Float32Array,
  idxArr: Uint16Array | Uint32Array | null,
  start: number,
  end: number,
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
  bestDist: number,
  worldRay: THREE.Ray,
  clippingPlane: THREE.Plane | null
): number {
  let best = bestDist;
  for (let i = start; i + 2 < end; i += 3) {
    const i0 = (idxArr ? idxArr[i] : i) * 3;
    const i1 = (idxArr ? idxArr[i + 1] : i + 1) * 3;
    const i2 = (idxArr ? idxArr[i + 2] : i + 2) * 3;

    const v0x = posArr[i0];
    const v0y = posArr[i0 + 1];
    const v0z = posArr[i0 + 2];
    const e1x = posArr[i1] - v0x;
    const e1y = posArr[i1 + 1] - v0y;
    const e1z = posArr[i1 + 2] - v0z;
    const e2x = posArr[i2] - v0x;
    const e2y = posArr[i2 + 1] - v0y;
    const e2z = posArr[i2 + 2] - v0z;

    const px = dy * e2z - dz * e2y;
    const py = dz * e2x - dx * e2z;
    const pz = dx * e2y - dy * e2x;
    const det = e1x * px + e1y * py + e1z * pz;
    if (det > -1e-6 && det < 1e-6) continue;

    const invDet = 1.0 / det;
    const tx = ox - v0x;
    const ty = oy - v0y;
    const tz = oz - v0z;
    const u = (tx * px + ty * py + tz * pz) * invDet;
    if (u < 0 || u > 1) continue;

    const qx = ty * e1z - tz * e1y;
    const qy = tz * e1x - tx * e1z;
    const qz = tx * e1y - ty * e1x;
    const v = (dx * qx + dy * qy + dz * qz) * invDet;
    if (v < 0 || u + v > 1) continue;

    const t = (e2x * qx + e2y * qy + e2z * qz) * invDet;
    if (t <= 1e-4 || t >= best) continue;

    if (clippingPlane) {
      _worldHitPt.set(
        worldRay.origin.x + worldRay.direction.x * t,
        worldRay.origin.y + worldRay.direction.y * t,
        worldRay.origin.z + worldRay.direction.z * t
      );
      if (clippingPlane.distanceToPoint(_worldHitPt) < 0) continue;
    }
    best = t;
  }
  return best;
}

/**
 * STD LITE v2 Zero-GC 2-Level Chunk-AABB Accelerated Scalar Möller-Trumbore Intersector.
 * - O(1) diagonal-affine fast inverse for unrotated BatchedMesh items (zero 4x4 cofactor inversion!)
 * - 2-level 160-tri super-chunk + 20-tri leaf chunk AABB hierarchy with front-to-back early-break!
 */
function intersectTrianglesScalarFast(
  geo: THREE.BufferGeometry,
  worldRay: THREE.Ray,
  matrixWorld: THREE.Matrix4,
  localBox: THREE.Box3 | null,
  posArr: Int16Array | Float32Array,
  isNormInt16: boolean,
  idxArr: Uint16Array | Uint32Array | null,
  drawStart: number,
  drawCount: number,
  maxWorldDist: number,
  clippingPlane: THREE.Plane | null
): number {
  const me = matrixWorld.elements;
  const wox = worldRay.origin.x;
  const woy = worldRay.origin.y;
  const woz = worldRay.origin.z;
  const wdx = worldRay.direction.x;
  const wdy = worldRay.direction.y;
  const wdz = worldRay.direction.z;

  let lox: number, loy: number, loz: number;
  let ldx: number, ldy: number, ldz: number;

  // Fast-path O(1) inverse for pure scale + translation matrices (99.9% of V2 BatchedMesh items!)
  if (
    me[1] === 0 &&
    me[2] === 0 &&
    me[4] === 0 &&
    me[6] === 0 &&
    me[8] === 0 &&
    me[9] === 0 &&
    me[0] !== 0 &&
    me[5] !== 0 &&
    me[10] !== 0
  ) {
    const ix = 1.0 / me[0];
    const iy = 1.0 / me[5];
    const iz = 1.0 / me[10];
    lox = (wox - me[12]) * ix;
    loy = (woy - me[13]) * iy;
    loz = (woz - me[14]) * iz;
    ldx = wdx * ix;
    ldy = wdy * iy;
    ldz = wdz * iz;
  } else {
    _invWorldMat.copy(matrixWorld).invert();
    const m = _invWorldMat.elements;
    lox = m[0] * wox + m[4] * woy + m[8] * woz + m[12];
    loy = m[1] * wox + m[5] * woy + m[9] * woz + m[13];
    loz = m[2] * wox + m[6] * woy + m[10] * woz + m[14];
    ldx = m[0] * wdx + m[4] * wdy + m[8] * wdz;
    ldy = m[1] * wdx + m[5] * wdy + m[9] * wdz;
    ldz = m[2] * wdx + m[6] * wdy + m[10] * wdz;
  }

  const invLdx = ldx !== 0 ? 1.0 / ldx : 1e30;
  const invLdy = ldy !== 0 ? 1.0 / ldy : 1e30;
  const invLdz = ldz !== 0 ? 1.0 / ldz : 1e30;

  if (localBox && !localBox.isEmpty()) {
    const bt = intersectAabbSlab(
      lox, loy, loz, invLdx, invLdy, invLdz,
      localBox.min.x, localBox.min.y, localBox.min.z,
      localBox.max.x, localBox.max.y, localBox.max.z
    );
    if (bt < 0 || bt >= maxWorldDist) return Infinity;
  }

  // Pre-scale BOTH origin and unnormalized direction into raw Int16 space -> `t` stays exact world distance!
  const posScale = isNormInt16 ? 32767.0 : 1.0;
  const ox = lox * posScale;
  const oy = loy * posScale;
  const oz = loz * posScale;
  const dx = ldx * posScale;
  const dy = ldy * posScale;
  const dz = ldz * posScale;

  let bestDist = maxWorldDist;
  const end = drawStart + drawCount;
  const fastI16U16 = isNormInt16 && posArr instanceof Int16Array && idxArr instanceof Uint16Array;

  if (drawCount > TRI_CHUNK_INDICES * 3) {
    const hier = getOrBuildChunkHierarchy(geo, drawStart, drawCount, posArr, idxArr);
    const invDx = dx !== 0 ? 1.0 / dx : 1e30;
    const invDy = dy !== 0 ? 1.0 / dy : 1e30;
    const invDz = dz !== 0 ? 1.0 / dz : 1e30;
    const supers = hier.supers;
    const leaves = hier.leaves;
    const numSupers = hier.numSupers;
    const numLeaves = hier.numLeaves;

    let hitChunkCount = 0;
    const maxHits = _chunkHitOrder.length;
    for (let s = 0; s < numSupers; s++) {
      const so = s * 6;
      const st = intersectAabbSlab(
        ox, oy, oz, invDx, invDy, invDz,
        supers[so], supers[so + 1], supers[so + 2],
        supers[so + 3], supers[so + 4], supers[so + 5]
      );
      if (st < 0 || st >= bestDist) continue;
      const lStart = s * SUPER_CHUNK_LEAVES;
      const lEnd = lStart + SUPER_CHUNK_LEAVES < numLeaves ? lStart + SUPER_CHUNK_LEAVES : numLeaves;
      for (let c = lStart; c < lEnd; c++) {
        const o = c * 6;
        const ct = intersectAabbSlab(
          ox, oy, oz, invDx, invDy, invDz,
          leaves[o], leaves[o + 1], leaves[o + 2],
          leaves[o + 3], leaves[o + 4], leaves[o + 5]
        );
        if (ct < 0 || ct >= bestDist) continue;
        if (hitChunkCount < maxHits) {
          _chunkHitOrder[hitChunkCount] = c;
          _chunkHitDist[hitChunkCount] = ct;
          hitChunkCount++;
        } else {
          const cStart = drawStart + c * TRI_CHUNK_INDICES;
          const cEnd = cStart + TRI_CHUNK_INDICES < end ? cStart + TRI_CHUNK_INDICES : end;
          bestDist = fastI16U16
            ? scanTrianglesI16U16(posArr, idxArr, cStart, cEnd, ox, oy, oz, dx, dy, dz, bestDist, worldRay, clippingPlane)
            : scanTrianglesGeneric(posArr, idxArr, cStart, cEnd, ox, oy, oz, dx, dy, dz, bestDist, worldRay, clippingPlane);
        }
      }
    }

    // Insertion-sort hit leaf chunks front-to-back for immediate occluded-chunk early break!
    for (let i = 1; i < hitChunkCount; i++) {
      const kC = _chunkHitOrder[i];
      const kD = _chunkHitDist[i];
      let j = i - 1;
      while (j >= 0 && _chunkHitDist[j] > kD) {
        _chunkHitOrder[j + 1] = _chunkHitOrder[j];
        _chunkHitDist[j + 1] = _chunkHitDist[j];
        j--;
      }
      _chunkHitOrder[j + 1] = kC;
      _chunkHitDist[j + 1] = kD;
    }

    for (let i = 0; i < hitChunkCount; i++) {
      if (_chunkHitDist[i] >= bestDist) break;
      const c = _chunkHitOrder[i];
      const cStart = drawStart + c * TRI_CHUNK_INDICES;
      const cEnd = cStart + TRI_CHUNK_INDICES < end ? cStart + TRI_CHUNK_INDICES : end;
      bestDist = fastI16U16
        ? scanTrianglesI16U16(posArr, idxArr, cStart, cEnd, ox, oy, oz, dx, dy, dz, bestDist, worldRay, clippingPlane)
        : scanTrianglesGeneric(posArr, idxArr, cStart, cEnd, ox, oy, oz, dx, dy, dz, bestDist, worldRay, clippingPlane);
    }
  } else {
    bestDist = fastI16U16
      ? scanTrianglesI16U16(posArr, idxArr, drawStart, end, ox, oy, oz, dx, dy, dz, bestDist, worldRay, clippingPlane)
      : scanTrianglesGeneric(posArr, idxArr, drawStart, end, ox, oy, oz, dx, dy, dz, bestDist, worldRay, clippingPlane);
  }

  return bestDist < maxWorldDist ? bestDist : Infinity;
}

// Lazily built per-binding reverse index: partId -> list of batchIds / instanceIds
const _bindingPartToIds = new WeakMap<RaycastMeshBinding, Map<string, number[]>>();

function getBindingPartIdMap(binding: RaycastMeshBinding): Map<string, number[]> {
  let map = _bindingPartToIds.get(binding);
  if (map) return map;
  map = new Map<string, number[]>();
  const ids = binding.kind === 'instanced' ? binding.instanceIdToPartId : binding.batchIdToPartId;
  for (let i = 0; i < ids.length; i++) {
    const pid = ids[i];
    if (!pid) continue;
    let arr = map.get(pid);
    if (!arr) {
      arr = [];
      map.set(pid, arr);
    }
    arr.push(i);
  }
  _bindingPartToIds.set(binding, map);
  return map;
}

export interface HoverRaycastResult {
  readonly skipped: boolean;
  readonly partId: string | null;
}

/**
 * Two-stage zero-GC raycaster for V2 OptimizedUnits:
 *   - Stage 1 (Broad-Phase): O(log N) Flat TypedArray Binary AABB-BVH (with lazy GPU-explode sync)
 *     or Group -> Part AABB fallback + front-to-back entry-distance sort
 *   - Stage 2 (Narrow-Phase): Intersect ONLY exact candidate batchIds / instanceIds in nearest-first order
 *     with immediate early-break once candidate AABB entry distance >= closest triangle hit!
 *   - STD LITE v2 Fast-Path: Zero-GC inline scalar Möller-Trumbore directly on Int16/Float32 TypedArrays
 *     with GPU-explode offset parity.
 *   - Hover Protection: Stops hover raycasting during camera drag & throttles hover tests to ~30Hz (33ms).
 */
export class TwoStageRaycaster {
  private readonly raycaster = new THREE.Raycaster();
  private readonly hoverThrottleMs: number;
  private isDragging = false;
  private lastHoverTimestampMs = -Infinity;
  private lastHoverPartId: string | null = null;
  private hoverChecksPerformed = 0;
  private hoverChecksSkipped = 0;

  constructor(hoverThrottleMs = 33.3) {
    this.hoverThrottleMs = hoverThrottleMs;
  }

  public setCameraDragging(dragging: boolean): void {
    this.isDragging = dragging;
  }

  public isCameraDragging(): boolean {
    return this.isDragging;
  }

  public resetHoverThrottle(): void {
    this.lastHoverTimestampMs = -Infinity;
  }

  public getDiagnostics(): { performed: number; skipped: number } {
    return {
      performed: this.hoverChecksPerformed,
      skipped: this.hoverChecksSkipped,
    };
  }

  /**
   * Throttled (~30Hz) hover raycast that completely pauses while OrbitControls is dragging.
   */
  public pickHover(
    ndcPointer: THREE.Vector2,
    camera: THREE.Camera,
    index: UnitRaycastIndex | null,
    isPartHidden: (partId: string) => boolean,
    clippingPlane: THREE.Plane | null,
    nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now()
  ): HoverRaycastResult {
    if (!index || this.isDragging) {
      this.hoverChecksSkipped++;
      return { skipped: true, partId: this.lastHoverPartId };
    }
    if (nowMs - this.lastHoverTimestampMs < this.hoverThrottleMs) {
      this.hoverChecksSkipped++;
      return { skipped: true, partId: this.lastHoverPartId };
    }
    this.lastHoverTimestampMs = nowMs;
    this.hoverChecksPerformed++;
    this.raycaster.setFromCamera(ndcPointer, camera);
    const hitId = this.pickWithRay(this.raycaster, index, isPartHidden, clippingPlane);
    this.lastHoverPartId = hitId;
    return { skipped: false, partId: hitId };
  }

  /**
   * Unthrottled click raycast for immediate selection response.
   */
  public pickClick(
    ndcPointer: THREE.Vector2,
    camera: THREE.Camera,
    index: UnitRaycastIndex | null,
    isPartHidden: (partId: string) => boolean,
    clippingPlane: THREE.Plane | null
  ): string | null {
    if (!index) return null;
    this.raycaster.setFromCamera(ndcPointer, camera);
    return this.pickWithRay(this.raycaster, index, isPartHidden, clippingPlane);
  }

  /**
   * Direct ray-based two-stage pick (also callable from headless unit verification without a camera).
   */
  public pickWithRay(
    raycaster: THREE.Raycaster,
    index: UnitRaycastIndex,
    isPartHidden: (partId: string) => boolean,
    clippingPlane: THREE.Plane | null
  ): string | null {
    // Lazy sync of bounds & flat BVH after O(1) GPU Explode slider movement
    if (index.boundsDirty && index.syncBounds) {
      index.syncBounds();
    }
    if (index.bvhDirty && index.bvhNodes) {
      rebuildFlatPartBvhInPlace(index);
    }

    const ray = raycaster.ray;
    const origin = ray.origin;
    const ox = origin.x;
    const oy = origin.y;
    const oz = origin.z;
    const invDx = ray.direction.x !== 0 ? 1.0 / ray.direction.x : 1e30;
    const invDy = ray.direction.y !== 0 ? 1.0 / ray.direction.y : 1e30;
    const invDz = ray.direction.z !== 0 ? 1.0 / ray.direction.z : 1e30;

    // Stage 1A: Unit-level AABB fast reject
    const ub = index.unitWorldBox;
    if (
      ub.isEmpty() ||
      intersectAabbSlab(ox, oy, oz, invDx, invDy, invDz, ub.min.x, ub.min.y, ub.min.z, ub.max.x, ub.max.y, ub.max.z) < 0
    ) {
      return null;
    }

    // Stage 1B: O(log N) Flat TypedArray Binary AABB-BVH Traversal (or Group->Part fallback)
    let candCount = 0;
    const parts = index.parts;
    const maxCands = _candPartIndices.length;
    const bvhNodes = index.bvhNodes;
    const bvhOrder = index.bvhPartOrder;
    const bvhNodeCount = index.bvhNodeCount ?? 0;

    if (bvhNodes && bvhOrder && bvhNodeCount > 0) {
      let sp = 1;
      _bvhStack[0] = 0;
      while (sp > 0) {
        const nodeIdx = _bvhStack[--sp];
        const off = nodeIdx * 8;
        const nodeT = intersectAabbSlab(
          ox, oy, oz, invDx, invDy, invDz,
          bvhNodes[off], bvhNodes[off + 1], bvhNodes[off + 2],
          bvhNodes[off + 3], bvhNodes[off + 4], bvhNodes[off + 5]
        );
        if (nodeT < 0) continue;

        const leftOrFirst = bvhNodes[off + 6] | 0;
        const countOrRight = bvhNodes[off + 7] | 0;
        if (countOrRight > 0) {
          const end = leftOrFirst + countOrRight;
          for (let i = leftOrFirst; i < end; i++) {
            const partIdx = bvhOrder[i];
            const pb = parts[partIdx];
            if (isPartHidden(pb.partId)) continue;
            const wb = pb.worldBox;
            if (wb.isEmpty()) continue;
            const entryT = intersectAabbSlab(
              ox, oy, oz, invDx, invDy, invDz,
              wb.min.x, wb.min.y, wb.min.z,
              wb.max.x, wb.max.y, wb.max.z
            );
            if (entryT < 0) continue;
            if (candCount >= maxCands) break;
            _candPartIndices[candCount] = partIdx;
            _candEntryDistSq[candCount] = entryT * entryT;
            candCount++;
          }
        } else {
          const leftIdx = leftOrFirst;
          const rightIdx = -countOrRight;
          const lOff = leftIdx * 8;
          const rOff = rightIdx * 8;
          const tL = intersectAabbSlab(
            ox, oy, oz, invDx, invDy, invDz,
            bvhNodes[lOff], bvhNodes[lOff + 1], bvhNodes[lOff + 2],
            bvhNodes[lOff + 3], bvhNodes[lOff + 4], bvhNodes[lOff + 5]
          );
          const tR = intersectAabbSlab(
            ox, oy, oz, invDx, invDy, invDz,
            bvhNodes[rOff], bvhNodes[rOff + 1], bvhNodes[rOff + 2],
            bvhNodes[rOff + 3], bvhNodes[rOff + 4], bvhNodes[rOff + 5]
          );
          if (tL >= 0 && tR >= 0) {
            if (tL <= tR) {
              _bvhStack[sp++] = rightIdx;
              _bvhStack[sp++] = leftIdx;
            } else {
              _bvhStack[sp++] = leftIdx;
              _bvhStack[sp++] = rightIdx;
            }
          } else if (tL >= 0) {
            _bvhStack[sp++] = leftIdx;
          } else if (tR >= 0) {
            _bvhStack[sp++] = rightIdx;
          }
        }
      }
    } else {
      const groups = index.groups;
      for (let gi = 0; gi < groups.length; gi++) {
        const grp = groups[gi];
        const gb = grp.worldBox;
        if (
          gb.isEmpty() ||
          intersectAabbSlab(ox, oy, oz, invDx, invDy, invDz, gb.min.x, gb.min.y, gb.min.z, gb.max.x, gb.max.y, gb.max.z) < 0
        ) {
          continue;
        }
        const pIndices = grp.partIndices;
        for (let pi = 0; pi < pIndices.length; pi++) {
          const partIdx = pIndices[pi];
          const pb = parts[partIdx];
          if (isPartHidden(pb.partId)) continue;
          const wb = pb.worldBox;
          if (wb.isEmpty()) continue;
          const entryT = intersectAabbSlab(
            ox, oy, oz, invDx, invDy, invDz,
            wb.min.x, wb.min.y, wb.min.z,
            wb.max.x, wb.max.y, wb.max.z
          );
          if (entryT < 0) continue;
          if (candCount >= maxCands) break;
          _candPartIndices[candCount] = partIdx;
          _candEntryDistSq[candCount] = entryT * entryT;
          candCount++;
        }
      }
    }

    if (candCount === 0) return null;

    // Front-to-back insertion sort (candCount is typically 2..20 -> zero allocations, ~80ns!)
    for (let i = 1; i < candCount; i++) {
      const keyIdx = _candPartIndices[i];
      const keyDist = _candEntryDistSq[i];
      let j = i - 1;
      while (j >= 0 && _candEntryDistSq[j] > keyDist) {
        _candPartIndices[j + 1] = _candPartIndices[j];
        _candEntryDistSq[j + 1] = _candEntryDistSq[j];
        j--;
      }
      _candPartIndices[j + 1] = keyIdx;
      _candEntryDistSq[j + 1] = keyDist;
    }

    // Stage 2: Front-to-back narrow-phase triangle test with immediate occluded-part early break!
    let closestDist = Infinity;
    let closestDistSq = Infinity;
    let closestPartId: string | null = null;
    const bindings = index.bindings;
    const useScalarFast = Boolean(index.fastLiteRaycast);

    for (let ci = 0; ci < candCount; ci++) {
      // Every remaining candidate starts further away than our closest confirmed triangle hit!
      if (_candEntryDistSq[ci] >= closestDistSq) {
        break;
      }
      const pb = parts[_candPartIndices[ci]];
      const partId = pb.partId;
      const bList = pb.bindingIndices;

      for (let bi = 0; bi < bList.length; bi++) {
        const binding = bindings[bList[bi]];
        if (!binding || !binding.mesh.visible) continue;
        const partToIds = getBindingPartIdMap(binding);
        const elemIds = partToIds.get(partId);
        if (!elemIds) continue;
        const gpuOff = binding.gpuExplodeOffsets;
        const gpuF = binding.gpuExplodeFactor ?? 0;
        const applyGpuOff = Boolean(gpuOff && gpuF > 1e-6);

        if (binding.kind === 'batched') {
          const bm = binding.mesh;
          const batchGeo = bm.geometry;

          if (useScalarFast) {
            const posAttr = batchGeo.getAttribute('position');
            if (!posAttr) continue;
            const posArr = posAttr.array as Int16Array | Float32Array;
            const isNormInt16 = Boolean(posAttr.normalized && posArr instanceof Int16Array);
            const idxArr = batchGeo.index ? (batchGeo.index.array as Uint16Array | Uint32Array) : null;

            for (let k = 0; k < elemIds.length; k++) {
              const batchId = elemIds[k];
              if (!bm.getVisibleAt(batchId)) continue;
              const geoId = bm.getGeometryIdAt(batchId);
              const range = bm.getGeometryRangeAt(geoId, _rangeScratch);
              if (!range || range.count <= 0) continue;

              bm.getMatrixAt(batchId, _rayBatchMesh.matrixWorld).premultiply(bm.matrixWorld);
              if (applyGpuOff && gpuOff) {
                const eo = batchId * 3;
                const me = _rayBatchMesh.matrixWorld.elements;
                me[12] += gpuOff[eo] * gpuF;
                me[13] += gpuOff[eo + 1] * gpuF;
                me[14] += gpuOff[eo + 2] * gpuF;
              }
              const lBox = bm.getBoundingBoxAt(geoId, _rayBatchBox);
              const dist = intersectTrianglesScalarFast(
                batchGeo,
                ray,
                _rayBatchMesh.matrixWorld,
                lBox,
                posArr,
                isNormInt16,
                idxArr,
                range.start,
                range.count,
                closestDist,
                clippingPlane
              );
              if (dist < closestDist) {
                closestDist = dist;
                closestDistSq = dist * dist;
                closestPartId = partId;
              }
            }
          } else {
            _rayBatchGeo.index = batchGeo.index;
            _rayBatchGeo.attributes = batchGeo.attributes;

            for (let k = 0; k < elemIds.length; k++) {
              const batchId = elemIds[k];
              if (!bm.getVisibleAt(batchId)) continue;
              const geoId = bm.getGeometryIdAt(batchId);
              const range = bm.getGeometryRangeAt(geoId, _rangeScratch);
              if (!range || range.count <= 0) continue;

              _rayBatchGeo.setDrawRange(range.start, range.count);
              bm.getMatrixAt(batchId, _rayBatchMesh.matrixWorld).premultiply(bm.matrixWorld);
              if (applyGpuOff && gpuOff) {
                const eo = batchId * 3;
                const me = _rayBatchMesh.matrixWorld.elements;
                me[12] += gpuOff[eo] * gpuF;
                me[13] += gpuOff[eo + 1] * gpuF;
                me[14] += gpuOff[eo + 2] * gpuF;
              }
              _rayBatchGeo.boundingBox = bm.getBoundingBoxAt(geoId, _rayBatchBox);
              _rayBatchGeo.boundingSphere = bm.getBoundingSphereAt(geoId, _rayBatchSphere);

              _hitScratch.length = 0;
              _rayBatchMesh.raycast(raycaster, _hitScratch);

              for (let hi = 0; hi < _hitScratch.length; hi++) {
                const hit = _hitScratch[hi];
                if (hit.distance >= closestDist) continue;
                if (clippingPlane && clippingPlane.distanceToPoint(hit.point) < 0) continue;
                closestDist = hit.distance;
                closestDistSq = closestDist * closestDist;
                closestPartId = partId;
              }
            }

            _rayBatchGeo.index = null;
            _rayBatchGeo.attributes = {};
            _rayBatchGeo.boundingBox = null;
            _rayBatchGeo.boundingSphere = null;
          }
        } else {
          const inst = binding.mesh;
          const instGeo = inst.geometry;
          if (!instGeo) continue;

          if (useScalarFast) {
            const posAttr = instGeo.getAttribute('position');
            if (!posAttr) continue;
            const posArr = posAttr.array as Int16Array | Float32Array;
            const isNormInt16 = Boolean(posAttr.normalized && posArr instanceof Int16Array);
            const idxArr = instGeo.index ? (instGeo.index.array as Uint16Array | Uint32Array) : null;
            const drawCount = idxArr ? idxArr.length : posAttr.count;
            if (!instGeo.boundingBox) instGeo.computeBoundingBox();

            for (let k = 0; k < elemIds.length; k++) {
              const iid = elemIds[k];
              inst.getMatrixAt(iid, _rayInstMesh.matrixWorld);
              _rayInstMesh.matrixWorld.premultiply(inst.matrixWorld);
              const me = _rayInstMesh.matrixWorld.elements;
              if (
                me[0] === 0 &&
                me[1] === 0 &&
                me[2] === 0 &&
                me[4] === 0 &&
                me[5] === 0 &&
                me[6] === 0
              ) {
                continue;
              }
              if (applyGpuOff && gpuOff) {
                const eo = iid * 3;
                me[12] += gpuOff[eo] * gpuF;
                me[13] += gpuOff[eo + 1] * gpuF;
                me[14] += gpuOff[eo + 2] * gpuF;
              }
              const dist = intersectTrianglesScalarFast(
                instGeo,
                ray,
                _rayInstMesh.matrixWorld,
                instGeo.boundingBox,
                posArr,
                isNormInt16,
                idxArr,
                0,
                drawCount,
                closestDist,
                clippingPlane
              );
              if (dist < closestDist) {
                closestDist = dist;
                closestDistSq = dist * dist;
                closestPartId = partId;
              }
            }
          } else {
            _rayInstMesh.geometry = instGeo;

            for (let k = 0; k < elemIds.length; k++) {
              const iid = elemIds[k];
              inst.getMatrixAt(iid, _rayInstMesh.matrixWorld);
              _rayInstMesh.matrixWorld.premultiply(inst.matrixWorld);
              const me = _rayInstMesh.matrixWorld.elements;
              if (
                me[0] === 0 &&
                me[1] === 0 &&
                me[2] === 0 &&
                me[4] === 0 &&
                me[5] === 0 &&
                me[6] === 0
              ) {
                continue;
              }
              if (applyGpuOff && gpuOff) {
                const eo = iid * 3;
                me[12] += gpuOff[eo] * gpuF;
                me[13] += gpuOff[eo + 1] * gpuF;
                me[14] += gpuOff[eo + 2] * gpuF;
              }

              _hitScratch.length = 0;
              _rayInstMesh.raycast(raycaster, _hitScratch);

              for (let hi = 0; hi < _hitScratch.length; hi++) {
                const hit = _hitScratch[hi];
                if (hit.distance >= closestDist) continue;
                if (clippingPlane && clippingPlane.distanceToPoint(hit.point) < 0) continue;
                closestDist = hit.distance;
                closestDistSq = closestDist * closestDist;
                closestPartId = partId;
              }
            }

            _rayInstMesh.geometry = _rayBatchGeo;
          }
        }
      }
    }

    _hitScratch.length = 0;
    return closestPartId;
  }
}
