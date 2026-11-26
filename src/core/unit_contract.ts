import * as THREE from 'three';
import { CadPart, GraphicsQuality, PartExplanation, RenderMode } from '../assemblies/types';
import type { ResourceCache } from './resource_cache';

export type QualityTier = GraphicsQuality; // 'standard' | 'high' | 'ultra'

export interface UnitPartMeta {
  readonly id: string;
  readonly order: number;
  readonly swatchColor: string;
  readonly groupKey: string;
  readonly assembledPos: readonly [number, number, number];
  readonly explodeOffset: readonly [number, number, number];
  readonly edgeOpacity: number;
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
  readonly diagramType: PartExplanation['diagramType'];
}

export interface UnitMeta {
  readonly unitId: string;
  readonly version: string;
  readonly nameJa: string;
  readonly nameEn: string;
  readonly declaredPartCount: number;
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
}

export interface RaycastInstancedBinding {
  readonly kind: 'instanced';
  readonly mesh: THREE.InstancedMesh;
  /** O(1) instanceId -> partId reverse lookup table */
  readonly instanceIdToPartId: readonly string[];
}

export interface RaycastBatchedBinding {
  readonly kind: 'batched';
  readonly mesh: THREE.BatchedMesh;
  /** O(1) batchId (instanceId in BatchedMesh) -> partId reverse lookup table */
  readonly batchIdToPartId: readonly string[];
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

export interface UnitBuildResult {
  readonly rootGroup: THREE.Group;
  readonly parts: CadPart[];
  readonly registeredPartIds: ReadonlySet<string>;
  readonly instancedMeshes: readonly THREE.InstancedMesh[];
  readonly batchedMeshes: readonly THREE.BatchedMesh[];
  readonly raycastIndex: UnitRaycastIndex;
  readonly stats: UnitBuildStats;
}

/**
 * Unified V2 Optimized Unit Contract.
 * Every experimental V2 unit MUST strictly adhere to this interface so core/ never needs unit-specific edits.
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
  /** Optional zero-allocation physics overlay step */
  updatePhysics?(elapsed: number, explodeFactor: number, active: boolean): void;
  /** Optional physics visibility toggle */
  setPhysicsVisible?(visible: boolean): void;
  /** Optional explode trajectory guides update */
  updateExplodeGuides?(explodeFactor: number, visible: boolean): void;
  /** Sync shared clipping planes onto active cached materials */
  setClippingPlanes?(planes: THREE.Plane[]): void;
  /** Dispose unit-owned GPU resources and decrement shared cache reference counts */
  dispose(cache: ResourceCache): void;
}
