import * as THREE from 'three';
import {
  CadPart,
  GraphicsQuality,
  MiraiExplanationExtension,
  PartExplanation,
  RenderMode,
} from '../assemblies/types';
import type { ResourceCache } from './resource_cache';

export type QualityTier = GraphicsQuality; // 'standard_lite' | 'standard' | 'high' | 'ultra'

export interface UnitPartMeta {
  readonly id: string;
  readonly order: number;
  readonly swatchColor: string;
  readonly groupKey: string;
  readonly assembledPos: readonly [number, number, number];
  readonly explodeOffset: readonly [number, number, number];
  readonly integratedExplodeOffset?: readonly [number, number, number];
  readonly edgeOpacity: number;
  readonly lensSection?: 1 | 2 | 3;
  readonly fabVolume?: 0 | 1 | 2 | 3 | 4;
  readonly miraiSubView?: number;
  readonly originalSubView?: number;
  readonly standaloneOnly?: boolean;
  readonly title: string;
  readonly subtitle: string;
  readonly category: string;
  readonly plainAnalogy: string;
  readonly summary: string;
  readonly opticsAndPhysics: readonly string[];
  readonly formula?: {
    readonly expression: string;
    readonly description: string;
  };
  readonly nextGenInnovation: string;
  readonly specs: ReadonlyArray<{ readonly label: string; readonly value: string }>;
  readonly references?: readonly string[];
  readonly mirai?: MiraiExplanationExtension;
  readonly diagramType: PartExplanation['diagramType'];
}

export interface UnitMeta {
  readonly unitId: string;
  readonly version: string;
  readonly nameJa: string;
  readonly nameEn: string;
  readonly declaredPartCount: number;
  /** Optional explicit Solid draw-call ceiling with rationale for ultra-large composite units */
  readonly maxDrawCallsBudget?: number;
  readonly budgetRationale?: string;
  readonly parts: readonly UnitPartMeta[];
}

export interface UnitBuildOptions {
  /** Maximum CPU time per chunk before yielding to browser (ms). Default: 8. */
  frameBudgetMs?: number;
  /** Abort predicate checked between chunks (cancels & cleans up partial build). */
  isAborted?: () => boolean;
  /** Optional progress callback invoked after each time-sliced chunk. */
  onChunkProgress?: (completedChunks: number, totalChunks: number) => void;
  /** Active clipping planes shared with WebGLRenderer. */
  clippingPlanes?: THREE.Plane[];
  /** Disable async frame yields (useful for deterministic headless verification). */
  synchronous?: boolean;
  /** Initial active sub-view index (e.g. lensSection 1|2|3 or sensorFabVolume 0..4). */
  subView?: number;
  /** Build in integrated camera layout mode (uses integratedExplodeOffset). */
  integratedMode?: boolean;
  /** Optional selective compilation filter (Play Ground hyper-extractor): compile ONLY these part IDs! */
  onlyPartIds?: ReadonlySet<string>;
}

export interface RaycastInstancedBinding {
  readonly kind: 'instanced';
  readonly mesh: THREE.InstancedMesh;
  /** O(1) instanceId -> partId reverse lookup table */
  readonly instanceIdToPartId: readonly string[];
  /** Optional flat per-instance explode offset [dx,dy,dz,...] when GPU vertex-shader explode is active */
  gpuExplodeOffsets?: Float32Array;
  /** Current GPU vertex-shader explode factor [0..1] synced by updateExplode() */
  gpuExplodeFactor?: number;
}

export interface RaycastBatchedBinding {
  readonly kind: 'batched';
  readonly mesh: THREE.BatchedMesh;
  /** O(1) batchId (instanceId in BatchedMesh) -> partId reverse lookup table */
  readonly batchIdToPartId: readonly string[];
  /** Optional flat per-batchId explode offset [dx,dy,dz,...] when GPU vertex-shader explode is active */
  gpuExplodeOffsets?: Float32Array;
  /** Current GPU vertex-shader explode factor [0..1] synced by updateExplode() */
  gpuExplodeFactor?: number;
}

export type RaycastMeshBinding = RaycastInstancedBinding | RaycastBatchedBinding;

export interface RaycastPartBounds {
  readonly partId: string;
  readonly groupKey: string;
  /** Local-space bounding box relative to part origin (0,0,0) */
  readonly localBox: THREE.Box3;
  /** Cached world-space bounding box updated only when explode factor changes */
  readonly worldBox: THREE.Box3;
  /** Indices into unit's bindings array that contain geometry for this part */
  readonly bindingIndices: readonly number[];
}

export interface RaycastGroupBounds {
  readonly groupKey: string;
  readonly worldBox: THREE.Box3;
  readonly partIndices: readonly number[];
}

export interface UnitRaycastIndex {
  readonly unitWorldBox: THREE.Box3;
  readonly bindings: readonly RaycastMeshBinding[];
  readonly parts: readonly RaycastPartBounds[];
  readonly groups: readonly RaycastGroupBounds[];
  readonly partBoundsById: ReadonlyMap<string, RaycastPartBounds>;
  /** Enable zero-GC inline Möller-Trumbore scalar triangle picking fast-path (STD LITE) */
  readonly fastLiteRaycast?: boolean;
  /** Current GPU vertex-shader explode factor [0..1] when hardware GPU explode is active */
  gpuExplodeFactor?: number;
  /** Flat TypedArray binary AABB-BVH over parts for O(log N) zero-GC raycast broad-phase:
   *  stride = 8 floats per node: [minX, minY, minZ, maxX, maxY, maxZ, leftOrFirst, countOrRight]
   *  countOrRight > 0 => leaf (bvhPartOrder[leftOrFirst .. leftOrFirst + countOrRight])
   *  countOrRight <= 0 => internal (left = leftOrFirst, right = -countOrRight)
   */
  bvhNodes?: Float32Array;
  bvhPartOrder?: Int32Array;
  bvhNodeCount?: number;
  bvhDirty?: boolean;
  /** True when GPU explode updated uExplode without eagerly shifting CPU AABBs; syncBounds() flushes on demand */
  boundsDirty?: boolean;
  syncBounds?: () => void;
}

export interface UnitBuildStats {
  readonly quality: QualityTier;
  readonly declaredPartCount: number;
  readonly registeredPartCount: number;
  readonly instancedMeshCount: number;
  readonly totalInstances: number;
  readonly batchedMeshCount: number;
  readonly totalBatchedItems: number;
  readonly edgeLineCount: number;
  readonly estimatedTriangles: number;
  readonly buildTimeMs: number;
  readonly maxChunkMs: number;
  readonly chunkCount: number;
}

export type MotionStage = 'ultra' | 'lite' | 'fast';

/**
 * Conservative solid inner occluder box extracted during V2 compilation for KINE Mode Tier-3 Hi-Z occlusion culling.
 * Coordinates are local to part origin (assembledPos + explodeOffset * explodeFactor).
 */
export interface KineOccluderSpec {
  readonly partIndex: number;
  readonly minX: number;
  readonly minY: number;
  readonly minZ: number;
  readonly maxX: number;
  readonly maxY: number;
  readonly maxZ: number;
  readonly volume: number;
}

export interface KineCullingStats {
  readonly enabled: boolean;
  readonly totalParts: number;
  readonly visibleParts: number;
  readonly frustumCulled: number;
  readonly subpixelCulled: number;
  readonly occlusionCulled: number;
  readonly totalCulled: number;
  readonly evalMs: number;
}

export interface UnitBuildResult {
  readonly rootGroup: THREE.Group;
  readonly parts: CadPart[];
  readonly registeredPartIds: ReadonlySet<string>;
  readonly instancedMeshes: readonly THREE.InstancedMesh[];
  readonly batchedMeshes: readonly THREE.BatchedMesh[];
  readonly raycastIndex: UnitRaycastIndex;
  readonly stats: UnitBuildStats;
  /** Conservative solid convex inner occluder boxes for KINE Tier-3 Hi-Z occlusion culling */
  readonly kineOccluders?: readonly KineOccluderSpec[];
}

/**
 * Unified V2 Optimized Unit Contract.
 * Every V2 unit MUST strictly adhere to this interface so core/ never needs unit-specific edits.
 */
export interface OptimizedUnit {
  readonly unitId: string;
  /** Return pure unit metadata and declared part count */
  getMeta(): UnitMeta;
  /** Time-sliced quality-tiered 3D construction using shared ResourceCache */
  build(
    quality: QualityTier,
    cache: ResourceCache,
    options?: UnitBuildOptions
  ): Promise<UnitBuildResult>;
  /** Zero-allocation differential explode update for t in [0.0, 1.0]. Returns true if matrices changed. */
  updateExplode(t: number, force?: boolean): boolean;
  /** Update selection/hover/visibility/renderMode state via setColorAt & zero-alloc matrix/visibility flags */
  setVisualState(
    selectedId: string | null,
    hoveredId: string | null,
    hiddenIds: ReadonlySet<string>,
    isolatedId: string | null,
    renderMode: RenderMode
  ): void;
  /** Apply orthogonal KINE visibility culling mask (1 = culled, 0 = visible; null = restore all). Returns changed count. */
  applyKineCulling?(culledMask: Uint8Array | null): number;
  /** Optional accessor for solid inner occluder boxes */
  getKineOccluders?(): readonly KineOccluderSpec[];
  /** Optional sub-view filter hook (e.g. lensSection 1|2|3 or sensorFabVolume 0..4) */
  setSubView?(subView: number): void;
  /** Optional active-parts accessor filtered by current sub-view (defaults to all parts) */
  getActiveParts?(): CadPart[];
  /** Optional predicate telling raycaster whether a part is culled by the active sub-view */
  isPartCulledBySubView?(partId: string): boolean;
  /** Optional zero-allocation physics & dynamic rig step. Returns true if scene changed & needs render. */
  updatePhysics?(
    elapsed: number,
    explodeFactor: number,
    active: boolean,
    delta?: number
  ): boolean | void;
  /** Optional predicate indicating continuous animation is active (e.g. LensOpticsStudio open) */
  needsContinuousAnimation?(physicsActive: boolean): boolean;
  /** Optional physics visibility toggle */
  setPhysicsVisible?(visible: boolean): void;
  /** Optional explode trajectory guides update */
  updateExplodeGuides?(explodeFactor: number, visible: boolean): void;
  /** Sync shared clipping planes onto active cached materials */
  setClippingPlanes?(planes: THREE.Plane[]): void;
  /** Dispose unit-owned GPU resources and decrement shared cache reference counts */
  dispose(cache: ResourceCache): void;
}
