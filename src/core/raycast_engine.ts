import * as THREE from 'three';
import { UnitRaycastIndex } from './unit_contract';

// Module-scoped zero-allocation scratch buffers
const _boxHitPt = new THREE.Vector3();
const _hitScratch: THREE.Intersection[] = [];
const _candidatePartIds = new Set<string>();
const _candidateBindingMarks = new Uint8Array(256);

export interface HoverRaycastResult {
  readonly skipped: boolean;
  readonly partId: string | null;
}

/**
 * Two-stage zero-GC raycaster for V2 OptimizedUnits:
 *   - Stage 1 (Broad-Phase): Unit AABB -> Logical Group AABB -> Part AABB rejection
 *   - Stage 2 (Narrow-Phase): Intersect ONLY candidate InstancedMesh / BatchedMesh bindings
 *     with O(1) `instanceId -> partId` and `batchId -> partId` reverse lookup + clipping plane filter.
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

    // Stage 1A: Unit-level AABB fast reject
    if (index.unitWorldBox.isEmpty() || !ray.intersectBox(index.unitWorldBox, _boxHitPt)) {
      return null;
    }

    // Stage 1B + 1C: Group-level AABB -> Part-level AABB candidate filtering
    _candidatePartIds.clear();
    const bindingCount = index.bindings.length;
    for (let bi = 0; bi < bindingCount; bi++) {
      _candidateBindingMarks[bi] = 0;
    }

    let hasAnyCandidate = false;
    const groups = index.groups;
    const parts = index.parts;

    for (let gi = 0; gi < groups.length; gi++) {
      const grp = groups[gi];
      if (grp.worldBox.isEmpty() || !ray.intersectBox(grp.worldBox, _boxHitPt)) {
        continue;
      }
      const pIndices = grp.partIndices;
      for (let pi = 0; pi < pIndices.length; pi++) {
        const pb = parts[pIndices[pi]];
        if (isPartHidden(pb.partId)) continue;
        if (pb.worldBox.isEmpty() || !ray.intersectBox(pb.worldBox, _boxHitPt)) {
          continue;
        }
        _candidatePartIds.add(pb.partId);
        hasAnyCandidate = true;
        const bList = pb.bindingIndices;
        for (let k = 0; k < bList.length; k++) {
          const bIdx = bList[k];
          if (bIdx < _candidateBindingMarks.length) {
            _candidateBindingMarks[bIdx] = 1;
          }
        }
      }
    }

    if (!hasAnyCandidate) return null;

    // Stage 2: Narrow-phase triangle test ONLY against candidate InstancedMesh / BatchedMesh bindings
    let closestDist = Infinity;
    let closestPartId: string | null = null;

    for (let bi = 0; bi < bindingCount; bi++) {
      if (_candidateBindingMarks[bi] === 0) continue;
      const binding = index.bindings[bi];
      if (!binding.mesh.visible) continue;

      _hitScratch.length = 0;
      raycaster.intersectObject(binding.mesh, false, _hitScratch);

      for (let hi = 0; hi < _hitScratch.length; hi++) {
        const hit = _hitScratch[hi];
        if (hit.distance >= closestDist) continue;

        let partId: string | undefined;
        if (binding.kind === 'instanced') {
          if (hit.instanceId === undefined) continue;
          partId = binding.instanceIdToPartId[hit.instanceId];
        } else {
          if (hit.batchId === undefined) continue;
          partId = binding.batchIdToPartId[hit.batchId];
        }

        if (!partId || !_candidatePartIds.has(partId) || isPartHidden(partId)) {
          continue;
        }
        if (clippingPlane && clippingPlane.distanceToPoint(hit.point) < 0) {
          continue;
        }

        closestDist = hit.distance;
        closestPartId = partId;
      }
    }

    _hitScratch.length = 0;
    return closestPartId;
  }
}
