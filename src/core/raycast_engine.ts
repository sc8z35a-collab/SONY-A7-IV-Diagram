import * as THREE from 'three';
import { RaycastMeshBinding, UnitRaycastIndex } from './unit_contract';

// Module-scoped zero-allocation scratch buffers (STRICT ZERO-GC inside pickWithRay)
const _boxHitPt = new THREE.Vector3();
const _hitScratch: THREE.Intersection[] = [];
const _candPartIndices = new Int32Array(2048);
const _candEntryDistSq = new Float64Array(2048);

// Narrow-phase candidate-only intersection scratch objects (DoubleSide for forgiving CAD picking)
const _rayMat = new THREE.Material();
_rayMat.side = THREE.DoubleSide;
const _rayBatchBox = new THREE.Box3();
const _rayBatchSphere = new THREE.Sphere();
const _rayBatchGeo = new THREE.BufferGeometry();
const _rayBatchMesh = new THREE.Mesh(_rayBatchGeo, _rayMat);
const _rayInstMesh = new THREE.Mesh(_rayBatchGeo, _rayMat);
const _invWorldMat = new THREE.Matrix4();
const _localRay = new THREE.Ray();
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
 * STD LITE Zero-GC Scalar Möller-Trumbore Triangle Range Intersector.
 * Transforms the ray ONCE into local geometry space, rejects via local AABB, and scans raw
 * Float32 position + Uint16/Uint32 index TypedArrays in registers (ZERO Vector3/Intersection allocs!).
 */
function intersectTrianglesScalarFast(
  worldRay: THREE.Ray,
  matrixWorld: THREE.Matrix4,
  localBox: THREE.Box3 | null,
  posArr: Float32Array,
  idxArr: ArrayLike<number> | null,
  drawStart: number,
  drawCount: number,
  maxWorldDist: number,
  clippingPlane: THREE.Plane | null
): number {
  _invWorldMat.copy(matrixWorld).invert();
  _localRay.copy(worldRay).applyMatrix4(_invWorldMat);
  if (localBox && !localBox.isEmpty() && !_localRay.intersectBox(localBox, _boxHitPt)) {
    return Infinity;
  }

  const ox = _localRay.origin.x;
  const oy = _localRay.origin.y;
  const oz = _localRay.origin.z;
  const dx = _localRay.direction.x;
  const dy = _localRay.direction.y;
  const dz = _localRay.direction.z;
  const me = matrixWorld.elements;
  const rox = worldRay.origin.x;
  const roy = worldRay.origin.y;
  const roz = worldRay.origin.z;

  let bestDist = maxWorldDist;
  const end = drawStart + drawCount;

  for (let i = drawStart; i + 2 < end; i += 3) {
    const i0 = idxArr ? idxArr[i] * 3 : i * 3;
    const i1 = idxArr ? idxArr[i + 1] * 3 : (i + 1) * 3;
    const i2 = idxArr ? idxArr[i + 2] * 3 : (i + 2) * 3;

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
    if (det > -1e-7 && det < 1e-7) continue;

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

    const tLocal = (e2x * qx + e2y * qy + e2z * qz) * invDet;
    if (tLocal <= 0) continue;

    const lx = ox + dx * tLocal;
    const ly = oy + dy * tLocal;
    const lz = oz + dz * tLocal;
    const wx = me[0] * lx + me[4] * ly + me[8] * lz + me[12];
    const wy = me[1] * lx + me[5] * ly + me[9] * lz + me[13];
    const wz = me[2] * lx + me[6] * ly + me[10] * lz + me[14];
    const wDist = Math.hypot(wx - rox, wy - roy, wz - roz);
    if (wDist >= bestDist) continue;
    if (clippingPlane) {
      _worldHitPt.set(wx, wy, wz);
      if (clippingPlane.distanceToPoint(_worldHitPt) < 0) continue;
    }
    bestDist = wDist;
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
 *   - Stage 1 (Broad-Phase): Unit AABB -> Logical Group AABB -> Part AABB rejection + front-to-back entry-distance sort
 *   - Stage 2 (Narrow-Phase): Intersect ONLY exact candidate batchIds / instanceIds in nearest-first order
 *     with immediate early-break once candidate AABB entry distance >= closest triangle hit!
 *   - STD LITE Fast-Path: Zero-GC inline scalar Möller-Trumbore triangle intersection directly on packed TypedArrays.
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
    const ray = raycaster.ray;
    const origin = ray.origin;

    // Stage 1A: Unit-level AABB fast reject
    if (index.unitWorldBox.isEmpty() || !ray.intersectBox(index.unitWorldBox, _boxHitPt)) {
      return null;
    }

    // Stage 1B + 1C: Group-level AABB -> Part-level AABB candidate filtering + entry distance capture
    let candCount = 0;
    const groups = index.groups;
    const parts = index.parts;
    const maxCands = _candPartIndices.length;

    for (let gi = 0; gi < groups.length; gi++) {
      const grp = groups[gi];
      if (grp.worldBox.isEmpty() || !ray.intersectBox(grp.worldBox, _boxHitPt)) {
        continue;
      }
      const pIndices = grp.partIndices;
      for (let pi = 0; pi < pIndices.length; pi++) {
        const partIdx = pIndices[pi];
        const pb = parts[partIdx];
        if (isPartHidden(pb.partId)) continue;
        if (pb.worldBox.isEmpty() || !ray.intersectBox(pb.worldBox, _boxHitPt)) {
          continue;
        }
        if (candCount >= maxCands) break;
        const entryDistSq = pb.worldBox.containsPoint(origin)
          ? 0
          : origin.distanceToSquared(_boxHitPt);
        _candPartIndices[candCount] = partIdx;
        _candEntryDistSq[candCount] = entryDistSq;
        candCount++;
      }
    }

    if (candCount === 0) return null;

    // Front-to-back insertion sort (candCount is typically 2..25 -> zero allocations, ~100ns!)
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

        if (binding.kind === 'batched') {
          const bm = binding.mesh;
          const batchGeo = bm.geometry;

          if (useScalarFast) {
            const posAttr = batchGeo.getAttribute('position');
            if (!posAttr) continue;
            const posArr = posAttr.array as Float32Array;
            const idxArr = batchGeo.index ? batchGeo.index.array : null;

            for (let k = 0; k < elemIds.length; k++) {
              const batchId = elemIds[k];
              if (!bm.getVisibleAt(batchId)) continue;
              const geoId = bm.getGeometryIdAt(batchId);
              const range = bm.getGeometryRangeAt(geoId, _rangeScratch);
              if (!range || range.count <= 0) continue;

              bm.getMatrixAt(batchId, _rayBatchMesh.matrixWorld).premultiply(bm.matrixWorld);
              const lBox = bm.getBoundingBoxAt(geoId, _rayBatchBox);
              const dist = intersectTrianglesScalarFast(
                ray,
                _rayBatchMesh.matrixWorld,
                lBox,
                posArr,
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
            const posArr = posAttr.array as Float32Array;
            const idxArr = instGeo.index ? instGeo.index.array : null;
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
              const dist = intersectTrianglesScalarFast(
                ray,
                _rayInstMesh.matrixWorld,
                instGeo.boundingBox,
                posArr,
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
