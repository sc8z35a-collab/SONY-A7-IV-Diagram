import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { CadPart, PartExplanation, RenderMode } from '../assemblies/types';
import { disposeObject3D } from './dispose';
import { setActiveBuildQuality } from './geometry_quality';
import {
  getCadTintLuma,
  HeroMaterialSpec,
  liftDarkCadTint,
  MaterialBucketKey,
  QUALITY_TIER_CONFIG,
  ResourceCache,
} from './resource_cache';
import {
  OptimizedUnit,
  QualityTier,
  RaycastGroupBounds,
  RaycastMeshBinding,
  RaycastPartBounds,
  UnitBuildOptions,
  UnitBuildResult,
  UnitBuildStats,
  UnitMeta,
  UnitPartMeta,
  UnitRaycastIndex,
} from './unit_contract';
import {
  createV2MaterialProxy,
  getV2MaterialTag,
  V2MaterialLibrary,
} from './v2_material_catalog';

// Module-scoped zero-allocation scratch objects (STRICT ZERO-GC in all hot paths)
const _scratchMat = new THREE.Matrix4();
const _scratchMat2 = new THREE.Matrix4();
const _scratchInv = new THREE.Matrix4();
const _scratchPos = new THREE.Vector3();
const _scratchColor = new THREE.Color();
const _scratchColor2 = new THREE.Color();
const _scratchBox = new THREE.Box3();
const _zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0);

const COL_CAD_BASE = 0xf4f6fa;
const COL_XRAY_BASE = 0xcbdcf5;

const MAX_BATCHED_VERTS = 240000;
const MAX_INSTANCED_POOLS = 22;
const MAX_TOTAL_EDGE_SEGMENTS = 26000;

interface RawMeshCapture {
  readonly partIndex: number;
  readonly partId: string;
  readonly geometry: THREE.BufferGeometry;
  readonly localMatrix: THREE.Matrix4;
  readonly bucket: MaterialBucketKey;
  readonly heroKey?: string;
  readonly heroSpec?: HeroMaterialSpec;
  readonly tint: number;
  readonly noEdges: boolean;
  readonly edgeOpacity: number;
  readonly fromInstanced: boolean;
  readonly dynamicNode: THREE.Object3D | null;
}

interface CompiledInstancedEntry {
  readonly partIndex: number;
  readonly partId: string;
  readonly baseLocalMatrix: THREE.Matrix4;
  readonly baseColor: number;
  readonly dynamicNode: THREE.Object3D | null;
}

interface CompiledInstancedPool {
  readonly bucket: MaterialBucketKey;
  readonly heroKey?: string;
  readonly heroSpec?: HeroMaterialSpec;
  readonly mesh: THREE.InstancedMesh;
  readonly entries: CompiledInstancedEntry[];
  readonly instanceIdToPartId: string[];
  hasDynamicNodes: boolean;
}

interface CompiledBatchedEntry {
  readonly batchId: number;
  readonly partIndex: number;
  readonly partId: string;
  readonly baseColor: number;
  readonly dynamicNode: THREE.Object3D | null;
  readonly baseLocalMatrix: THREE.Matrix4 | null;
}

interface CompiledBatchedPool {
  readonly bucket: MaterialBucketKey;
  readonly heroKey?: string;
  readonly heroSpec?: HeroMaterialSpec;
  readonly mesh: THREE.BatchedMesh;
  readonly entries: CompiledBatchedEntry[];
  readonly batchIdToPartId: string[];
  hasDynamicNodes: boolean;
}

interface BatchedEdgePartSpan {
  readonly partIndex: number;
  readonly partId: string;
  readonly vertexOffset: number;
  readonly vertexCount: number;
  readonly edgeOpacity: number;
  readonly darkBase: boolean;
}

interface BatchedEdgeBundle {
  readonly lines: THREE.LineSegments;
  readonly basePositions: Float32Array;
  readonly livePositions: Float32Array;
  readonly liveColors: Float32Array;
  readonly posAttr: THREE.BufferAttribute;
  readonly colAttr: THREE.BufferAttribute;
  readonly spans: BatchedEdgePartSpan[];
  readonly solidMatKey: string;
  readonly cadMatKey: string;
  readonly xrayMatKey: string;
}

interface CompiledPartState {
  readonly index: number;
  readonly id: string;
  readonly meta: UnitPartMeta;
  readonly cadPart: CadPart;
  readonly assembledPos: THREE.Vector3;
  readonly explodeOffset: THREE.Vector3;
  readonly localBox: THREE.Box3;
  readonly partGroup: THREE.Group;
  curX: number;
  curY: number;
  curZ: number;
  visible: boolean;
  culledBySubView: boolean;
}

export interface CompiledUnitRawBuild {
  readonly parts: CadPart[];
  /** Optional dynamic rig object whose groups/children animate during physics or Optics Studio */
  readonly animatedNodes?: ReadonlySet<THREE.Object3D>;
  /** Optional custom per-frame step for rigs + physics overlays. Returns true if matrices/overlay changed. */
  readonly stepRigAndOverlay?: (
    elapsed: number,
    delta: number,
    explodeFactor: number,
    physicsActive: boolean,
    integrated: boolean,
    activeParts: CadPart[]
  ) => boolean;
  /** Optional predicate when continuous rendering is required even if physicsActive is false (e.g. LensOpticsStudio) */
  readonly needsContinuousAnimation?: (physicsActive: boolean) => boolean;
  /** Optional physics overlay group adopted onto ResourceCache */
  readonly overlayGroup?: THREE.Object3D | null;
  /** Optional explode trajectory guides group adopted onto ResourceCache */
  readonly explodeGuides?: THREE.Object3D | null;
  /** Optional visibility sync for overlay */
  readonly setOverlayVisible?: (visible: boolean) => void;
  /** Optional guide updater */
  readonly updateGuides?: (explodeFactor: number, visible: boolean, parts: CadPart[]) => void;
  /** Optional sub-view filter callback (e.g. sensorFab setActiveVolume) */
  readonly onSubViewChange?: (subView: number) => void;
  /** Optional cleanup hook for non-GPU references */
  readonly onDispose?: () => void;
}

export interface CompiledV2UnitConfig {
  readonly unitId: string;
  readonly meta: UnitMeta;
  readonly subsystem: CadPart['subsystem'];
  readonly heroSpecs?: Readonly<Record<string, HeroMaterialSpec>>;
  /** Optional sub-view predicate returning true if part is visible in the given subView */
  readonly isPartInSubView?: (meta: UnitPartMeta, subView: number) => boolean;
  /** Build raw CadPart geometry using ONLY the provided V2 ResourceCache-backed MaterialLibrary proxy */
  readonly buildRaw: (
    mats: V2MaterialLibrary,
    quality: QualityTier,
    options: {
      integratedMode: boolean;
      subView: number;
      cache: ResourceCache;
      clippingPlanes: THREE.Plane[];
      dryboxPalette: Record<string, THREE.Material>;
    }
  ) => Promise<CompiledUnitRawBuild> | CompiledUnitRawBuild;
}

function yieldNextFrame(): Promise<void> {
  if (typeof requestAnimationFrame === 'function') {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function nowMs(): number {
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

function buildPartExplanationFromMeta(m: UnitPartMeta): PartExplanation {
  return {
    title: m.title,
    subtitle: m.subtitle,
    category: m.category,
    plainAnalogy: m.plainAnalogy,
    summary: m.summary,
    opticsAndPhysics: [...m.opticsAndPhysics],
    formula: m.formula
      ? { expression: m.formula.expression, description: m.formula.description }
      : undefined,
    nextGenInnovation: m.nextGenInnovation,
    specs: m.specs.map((s) => ({ label: s.label, value: s.value })),
    diagramType: m.diagramType,
  };
}

/**
 * Produce a normalized non-indexed BufferGeometry with clean `position`, `normal`, and `uv` attributes,
 * strictly free of NaN/Infinity values and ready for BufferGeometryUtils.mergeGeometries / BatchedMesh.
 */
function normalizeGeometry(
  source: THREE.BufferGeometry,
  bakeMatrix: THREE.Matrix4 | null
): THREE.BufferGeometry | null {
  const srcPos = source.getAttribute('position');
  if (!srcPos || srcPos.count < 3) return null;

  const working = source.index ? source.toNonIndexed() : source.clone();
  if (bakeMatrix) {
    working.applyMatrix4(bakeMatrix);
  }

  const posAttr = working.getAttribute('position');
  if (!posAttr || posAttr.count < 3) {
    working.dispose();
    return null;
  }

  const vCount = posAttr.count;
  const posArr = new Float32Array(vCount * 3);
  for (let i = 0; i < vCount; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const o = i * 3;
    posArr[o] = Number.isFinite(x) ? x : 0;
    posArr[o + 1] = Number.isFinite(y) ? y : 0;
    posArr[o + 2] = Number.isFinite(z) ? z : 0;
  }

  if (!working.getAttribute('normal')) {
    working.computeVertexNormals();
  }
  const normAttr = working.getAttribute('normal');
  const normArr = new Float32Array(vCount * 3);
  if (normAttr && normAttr.count === vCount) {
    for (let i = 0; i < vCount; i++) {
      const nx = normAttr.getX(i);
      const ny = normAttr.getY(i);
      const nz = normAttr.getZ(i);
      const o = i * 3;
      const valid = Number.isFinite(nx) && Number.isFinite(ny) && Number.isFinite(nz);
      normArr[o] = valid ? nx : 0;
      normArr[o + 1] = valid ? ny : 1;
      normArr[o + 2] = valid ? nz : 0;
    }
  } else {
    for (let i = 0; i < vCount; i++) {
      normArr[i * 3 + 1] = 1;
    }
  }

  const uvAttr = working.getAttribute('uv');
  const uvArr = new Float32Array(vCount * 2);
  if (uvAttr && uvAttr.count === vCount) {
    for (let i = 0; i < vCount; i++) {
      const u = uvAttr.getX(i);
      const v = uvAttr.getY(i);
      const o = i * 2;
      uvArr[o] = Number.isFinite(u) ? u : 0;
      uvArr[o + 1] = Number.isFinite(v) ? v : 0;
    }
  } else {
    // Triplanar box projection fallback so procedural textures render cleanly on every geometry
    const inv = 1 / 16.0;
    for (let i = 0; i < vCount; i++) {
      const po = i * 3;
      const ax = Math.abs(normArr[po]);
      const ay = Math.abs(normArr[po + 1]);
      const az = Math.abs(normArr[po + 2]);
      const uo = i * 2;
      if (az >= ax && az >= ay) {
        uvArr[uo] = posArr[po] * inv;
        uvArr[uo + 1] = posArr[po + 1] * inv;
      } else if (ax >= ay && ax >= az) {
        uvArr[uo] = posArr[po + 2] * inv;
        uvArr[uo + 1] = posArr[po + 1] * inv;
      } else {
        uvArr[uo] = posArr[po] * inv;
        uvArr[uo + 1] = posArr[po + 2] * inv;
      }
    }
  }

  working.dispose();

  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(normArr, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2));
  out.computeBoundingBox();
  out.computeBoundingSphere();
  return out;
}

function quant(v: unknown): string {
  if (typeof v === 'number') return String(Math.round(v * 1000));
  if (typeof v === 'boolean') return v ? '1' : '0';
  return '';
}

function computeCanonicalGeoKey(geo: THREE.BufferGeometry, quality: QualityTier): string {
  if (geo.userData?.__cacheKey) {
    return `${geo.userData.__cacheKey}:${quality}`;
  }
  const type = geo.type || 'BufferGeometry';
  const params = (geo as unknown as { parameters?: Record<string, unknown> }).parameters;
  if (params && type !== 'ExtrudeGeometry' && type !== 'LatheGeometry' && type !== 'TubeGeometry') {
    const keys = Object.keys(params).sort();
    let sig = `${type}:${quality}`;
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const v = params[k];
      if (typeof v === 'number' || typeof v === 'boolean') {
        sig += `:${k}=${quant(v)}`;
      }
    }
    const pAttr = geo.getAttribute('position');
    sig += `:vc=${pAttr ? pAttr.count : 0}`;
    return sig;
  }
  return `uuid:${geo.uuid}`;
}

function extractColorFromMaterial(mat: THREE.Material | null | undefined): number {
  const tag = getV2MaterialTag(mat);
  if (tag) return tag.tint;
  const col = (mat as THREE.MeshStandardMaterial | undefined)?.color;
  return col && typeof col.getHex === 'function' ? col.getHex() : 0x8b95a5;
}

function classifyMaterialFallback(mat: THREE.Material | null | undefined): {
  bucket: MaterialBucketKey;
  tint: number;
  heroKey?: string;
  heroSpec?: HeroMaterialSpec;
} {
  const tag = getV2MaterialTag(mat);
  if (tag) {
    return {
      bucket: tag.bucket,
      tint: tag.heroKey ? tag.tint : liftDarkCadTint(tag.tint),
      heroKey: tag.heroKey,
      heroSpec: tag.heroSpec,
    };
  }
  const tint = liftDarkCadTint(extractColorFromMaterial(mat));
  if (mat && mat.transparent) {
    return { bucket: 'optical_glass_clear', tint };
  }
  const m = mat as THREE.MeshStandardMaterial | undefined;
  if (m && typeof m.metalness === 'number' && m.metalness >= 0.7) {
    return { bucket: 'metal_hero', tint };
  }
  return { bucket: 'matte_chassis', tint };
}

/**
 * Adopt a legacy physics overlay or explode-guide subtree onto ResourceCache so ZERO uncached
 * materials remain and disposeObject3D frees 100% of GPU buffers cleanly.
 */
export function adoptOverlaySubtreeToCache(
  root: THREE.Object3D,
  cache: ResourceCache,
  unitId: string,
  clippingPlanes: THREE.Plane[],
  allowMatrixAutoUpdate = true
): void {
  let matSeq = 0;
  root.traverse((obj) => {
    if (!allowMatrixAutoUpdate) {
      obj.matrixAutoUpdate = false;
      obj.updateMatrix();
    }
    if ((obj as THREE.Mesh).isMesh || (obj as THREE.InstancedMesh).isInstancedMesh) {
      const mesh = obj as THREE.Mesh;
      const oldMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      if (oldMat && !oldMat.userData?.__cacheKey) {
        const col = extractColorFromMaterial(oldMat);
        const op = typeof oldMat.opacity === 'number' ? oldMat.opacity : 1;
        const tr = Boolean(oldMat.transparent || op < 0.99);
        const key = `${unitId}-ovm-${col.toString(16)}-${Math.round(op * 100)}-${tr ? 1 : 0}-${matSeq++}`;
        const cached = cache.acquireBasicMaterial(key, {
          color: col,
          transparent: tr,
          opacity: op,
          side: oldMat.side,
          depthWrite: oldMat.depthWrite,
          clippingPlanes,
        });
        mesh.material = cached;
        oldMat.dispose();
      }
    } else if ((obj as THREE.Line).isLine) {
      const line = obj as THREE.Line;
      const oldMat = Array.isArray(line.material) ? line.material[0] : line.material;
      if (oldMat && !oldMat.userData?.__cacheKey) {
        const col = extractColorFromMaterial(oldMat);
        const op = typeof oldMat.opacity === 'number' ? oldMat.opacity : 0.7;
        const isDashed = (oldMat as THREE.LineDashedMaterial).isLineDashedMaterial === true;
        const dashSize = isDashed ? (oldMat as THREE.LineDashedMaterial).dashSize : undefined;
        const gapSize = isDashed ? (oldMat as THREE.LineDashedMaterial).gapSize : undefined;
        const key = `${unitId}-ovl-${col.toString(16)}-${Math.round(op * 100)}-${isDashed ? 'd' : 's'}-${matSeq++}`;
        const cached = cache.acquireLineMaterial(key, {
          color: col,
          opacity: op,
          dashed: isDashed,
          dashSize,
          gapSize,
          clippingPlanes,
        });
        line.material = cached;
        oldMat.dispose();
      }
    } else if ((obj as THREE.Points).isPoints) {
      const pts = obj as THREE.Points;
      const oldMat = Array.isArray(pts.material) ? pts.material[0] : pts.material;
      if (oldMat && !oldMat.userData?.__cacheKey) {
        const col = extractColorFromMaterial(oldMat);
        const op = typeof oldMat.opacity === 'number' ? oldMat.opacity : 0.85;
        const size = (oldMat as THREE.PointsMaterial).size ?? 1.2;
        const key = `${unitId}-ovp-${col.toString(16)}-${Math.round(size * 10)}-${matSeq++}`;
        const cached = cache.acquirePointsMaterial(key, {
          color: col,
          size,
          transparent: true,
          opacity: op,
          vertexColors: Boolean((oldMat as THREE.PointsMaterial).vertexColors),
          clippingPlanes,
        });
        pts.material = cached;
        oldMat.dispose();
      }
    }
  });
}

function disposeTemporaryRawTree(
  parts: CadPart[],
  keepTransformSkeleton: boolean
): void {
  const seenGeos = new Set<THREE.BufferGeometry>();
  const seenMats = new Set<THREE.Material>();

  for (let i = 0; i < parts.length; i++) {
    const grp = parts[i].group;
    const toRemove: THREE.Object3D[] = [];
    grp.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh || (obj as THREE.Line).isLine) {
        const renderable = obj as THREE.Mesh | THREE.Line;
        const g = renderable.geometry;
        if (g && !g.userData?.__pooled && !g.userData?.__cacheKey && !seenGeos.has(g)) {
          seenGeos.add(g);
          g.dispose();
        }
        const m = renderable.material;
        const mats = Array.isArray(m) ? m : m ? [m] : [];
        for (let k = 0; k < mats.length; k++) {
          const mat = mats[k];
          if (
            mat &&
            !mat.userData?.__cacheKey &&
            !(mat as unknown as { __v2Tag?: unknown }).__v2Tag &&
            !seenMats.has(mat)
          ) {
            seenMats.add(mat);
            mat.dispose();
          }
        }
        if ((renderable as THREE.InstancedMesh).isInstancedMesh) {
          (renderable as THREE.InstancedMesh).dispose();
        }
        if (!keepTransformSkeleton) {
          toRemove.push(renderable);
        }
      }
    });
    if (!keepTransformSkeleton) {
      for (let r = 0; r < toRemove.length; r++) {
        toRemove[r].parent?.remove(toRemove[r]);
      }
    }
  }
}

function setStaticMatrixRecursively(root: THREE.Object3D): void {
  root.traverse((obj) => {
    obj.matrixAutoUpdate = false;
    obj.updateMatrix();
  });
  root.updateMatrixWorld(true);
}

/**
 * Universal V2 OptimizedUnit engine supporting ALL 18 camera anatomy assemblies + composite views.
 * Enforces every V2 invariant automatically:
 * - 8ms time-sliced build with abort cancellation
 * - Tier-1 InstancedMesh + Tier-2 mergeGeometries/BatchedMesh + Tier-3 1-draw-call BatchedEdgeLines
 * - 100% ResourceCache materials/geometries/textures (zero inline material leaks)
 * - 100% matrixAutoUpdate = false on all rendered scene nodes
 * - Zero-allocation updateExplode / updatePhysics / setVisualState
 * - Two-stage AABB RaycastIndex with O(1) reverse lookup
 * - Complete recursive disposeObject3D + zero post-dispose cache refs
 */
export class CompiledV2Unit implements OptimizedUnit {
  public readonly unitId: string;
  private readonly cfg: CompiledV2UnitConfig;

  private rootGroup: THREE.Group | null = null;
  private rigSkeletonRoot: THREE.Group | null = null;
  private cache: ResourceCache | null = null;
  private quality: QualityTier = 'high';
  private renderMode: RenderMode = 'solid';
  private clippingPlanes: THREE.Plane[] = [];
  private subView = 0;
  private integratedMode = false;

  private partsState: CompiledPartState[] = [];
  private partById = new Map<string, CompiledPartState>();
  private instancedPools: CompiledInstancedPool[] = [];
  private batchedPools: CompiledBatchedPool[] = [];
  private edgeBundle: BatchedEdgeBundle | null = null;
  private raycastIndex: UnitRaycastIndex | null = null;

  private rawBuild: CompiledUnitRawBuild | null = null;
  private hasDynamicRig = false;

  private lastExplodeT = -1;
  private selectedId: string | null = null;
  private hoveredId: string | null = null;
  private hiddenIds: ReadonlySet<string> = new Set();
  private isolatedId: string | null = null;
  private physicsVisible = false;

  constructor(cfg: CompiledV2UnitConfig) {
    this.unitId = cfg.unitId;
    this.cfg = cfg;
  }

  public getMeta(): UnitMeta {
    return this.cfg.meta;
  }

  public async build(
    quality: QualityTier,
    cache: ResourceCache,
    options: UnitBuildOptions = {}
  ): Promise<UnitBuildResult> {
    this.dispose(cache);

    const tStart = nowMs();
    const frameBudgetMs = options.frameBudgetMs ?? 8.0;
    const synchronous = options.synchronous ?? false;
    const isAborted = options.isAborted ?? (() => false);

    this.cache = cache;
    this.quality = quality;
    this.renderMode = 'solid';
    this.clippingPlanes = options.clippingPlanes ?? [];
    this.subView = options.subView ?? (this.unitId === 'lens' ? 1 : 0);
    this.integratedMode = options.integratedMode ?? false;
    this.lastExplodeT = -1;

    const rootGroup = new THREE.Group();
    rootGroup.name = `${this.unitId}-v2-root`;
    rootGroup.matrixAutoUpdate = false;
    rootGroup.updateMatrix();
    this.rootGroup = rootGroup;

    let maxChunkMs = 0;
    let chunkCount = 0;
    let chunkStart = nowMs();

    const maybeYield = async (completedChunks: number, totalChunks: number): Promise<boolean> => {
      const elapsed = nowMs() - chunkStart;
      if (elapsed > maxChunkMs) maxChunkMs = elapsed;
      chunkCount++;
      options.onChunkProgress?.(completedChunks, totalChunks);
      if (isAborted()) return true;
      if (!synchronous && elapsed >= frameBudgetMs) {
        await yieldNextFrame();
        chunkStart = nowMs();
        if (isAborted()) return true;
      }
      return false;
    };

    const proxy = createV2MaterialProxy(
      cache,
      quality,
      'solid',
      this.clippingPlanes,
      this.cfg.heroSpecs
    );

    let rawBuild: CompiledUnitRawBuild;
    setActiveBuildQuality(quality);
    try {
      rawBuild = await this.cfg.buildRaw(proxy.library, quality, {
        integratedMode: this.integratedMode,
        subView: this.subView,
        cache,
        clippingPlanes: this.clippingPlanes,
        dryboxPalette: proxy.dryboxPalette,
      });
    } finally {
      setActiveBuildQuality(null);
    }

    if (isAborted()) {
      disposeTemporaryRawTree(rawBuild.parts, false);
      proxy.releaseAll();
      this.dispose(cache);
      throw new Error(`${this.unitId} build aborted`);
    }

    this.rawBuild = rawBuild;
    const metaById = new Map<string, UnitPartMeta>();
    for (let i = 0; i < this.cfg.meta.parts.length; i++) {
      metaById.set(this.cfg.meta.parts[i].id, this.cfg.meta.parts[i]);
    }

    // Step 1: Capture every mesh across all raw parts (in time-sliced chunks)
    const captures: RawMeshCapture[] = [];
    const partStates: CompiledPartState[] = [];
    const animatedNodes = rawBuild.animatedNodes;
    this.hasDynamicRig = Boolean(rawBuild.stepRigAndOverlay);

    const rigSkeletonRoot = new THREE.Group();
    rigSkeletonRoot.name = `${this.unitId}-rig-skeleton`;
    rigSkeletonRoot.visible = false;
    rigSkeletonRoot.matrixAutoUpdate = false;
    rigSkeletonRoot.updateMatrix();
    this.rigSkeletonRoot = rigSkeletonRoot;

    const rawParts = rawBuild.parts;
    const totalParts = rawParts.length;

    for (let pi = 0; pi < totalParts; pi++) {
      const rp = rawParts[pi];
      const meta = metaById.get(rp.id);
      if (!meta) continue;

      const assembledPos = new THREE.Vector3(
        meta.assembledPos[0],
        meta.assembledPos[1],
        meta.assembledPos[2]
      );
      const offArr =
        this.integratedMode && meta.integratedExplodeOffset
          ? meta.integratedExplodeOffset
          : meta.explodeOffset;
      const explodeOffset = new THREE.Vector3(offArr[0], offArr[1], offArr[2]);

      const culledBySubView = this.cfg.isPartInSubView
        ? !this.cfg.isPartInSubView(meta, this.subView)
        : false;

      // Update raw part's local matrix tree relative to part.group origin (0,0,0)
      rp.group.position.set(0, 0, 0);
      rp.group.updateMatrixWorld(true);
      _scratchInv.copy(rp.group.matrixWorld).invert();

      const partLocalBox = new THREE.Box3();
      const idx = partStates.length;

      const findDynamicAncestor = (obj: THREE.Object3D): THREE.Object3D | null => {
        if (!this.hasDynamicRig) return null;
        if (animatedNodes && animatedNodes.size > 0) {
          let cur: THREE.Object3D | null = obj;
          while (cur && cur !== rp.group.parent) {
            if (animatedNodes.has(cur)) return cur;
            cur = cur.parent;
          }
          return null;
        }
        return rp.group;
      };

      rp.group.traverse((node) => {
        if ((node as THREE.InstancedMesh).isInstancedMesh) {
          const inst = node as THREE.InstancedMesh;
          const geo = inst.geometry;
          if (!geo || inst.count <= 0) return;
          const mat = Array.isArray(inst.material) ? inst.material[0] : inst.material;
          const matInfo = classifyMaterialFallback(mat);
          const dynNode = findDynamicAncestor(inst);
          const nodeLocal = _scratchMat2.multiplyMatrices(_scratchInv, inst.matrixWorld);
          if (!geo.boundingBox) geo.computeBoundingBox();

          for (let ii = 0; ii < inst.count; ii++) {
            inst.getMatrixAt(ii, _scratchMat);
            const fullLocal = new THREE.Matrix4().multiplyMatrices(nodeLocal, _scratchMat);
            let tint = matInfo.tint;
            if (inst.instanceColor) {
              inst.getColorAt(ii, _scratchColor);
              const icHex = _scratchColor.getHex();
              if (icHex !== 0xffffff) {
                _scratchColor2.setHex(icHex);
                _scratchColor.setHex(matInfo.tint).multiply(_scratchColor2);
                tint = _scratchColor.getHex();
              }
            }
            if (geo.boundingBox) {
              _scratchBox.copy(geo.boundingBox).applyMatrix4(fullLocal);
              partLocalBox.union(_scratchBox);
            }
            captures.push({
              partIndex: idx,
              partId: rp.id,
              geometry: geo,
              localMatrix: fullLocal,
              bucket: matInfo.bucket,
              heroKey: matInfo.heroKey,
              heroSpec: matInfo.heroSpec,
              tint,
              noEdges: true,
              edgeOpacity: meta.edgeOpacity,
              fromInstanced: true,
              dynamicNode: dynNode,
            });
          }
          return;
        }

        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          const geo = mesh.geometry;
          if (!geo) return;
          const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
          const matInfo = classifyMaterialFallback(mat);
          const dynNode = findDynamicAncestor(mesh);
          const localMat = new THREE.Matrix4().multiplyMatrices(_scratchInv, mesh.matrixWorld);
          if (!geo.boundingBox) geo.computeBoundingBox();
          if (geo.boundingBox) {
            _scratchBox.copy(geo.boundingBox).applyMatrix4(localMat);
            partLocalBox.union(_scratchBox);
          }
          captures.push({
            partIndex: idx,
            partId: rp.id,
            geometry: geo,
            localMatrix: localMat,
            bucket: matInfo.bucket,
            heroKey: matInfo.heroKey,
            heroSpec: matInfo.heroSpec,
            tint: matInfo.tint,
            noEdges: Boolean(mesh.userData?.noEdges),
            edgeOpacity: (mesh.userData?.edgeOpacity as number | undefined) ?? meta.edgeOpacity,
            fromInstanced: false,
            dynamicNode: dynNode,
          });
        }
      });

      // Restore part group to assembledPos for rig skeleton tracking
      rp.group.position.copy(assembledPos);
      rp.group.updateMatrix();
      if (this.hasDynamicRig) {
        rigSkeletonRoot.add(rp.group);
      }

      const v2CadPart: CadPart = {
        id: meta.id,
        subsystem: rp.subsystem ?? this.cfg.subsystem,
        order: meta.order,
        swatchColor: meta.swatchColor,
        group: rp.group,
        assembledPos,
        explodeOffset,
        integratedExplodeOffset: meta.integratedExplodeOffset
          ? new THREE.Vector3(
              meta.integratedExplodeOffset[0],
              meta.integratedExplodeOffset[1],
              meta.integratedExplodeOffset[2]
            )
          : explodeOffset.clone(),
        interactiveMeshes: [],
        edgeLines: [],
        explanation: buildPartExplanationFromMeta(meta),
        standaloneOnly: meta.standaloneOnly,
        lensSection: meta.lensSection,
        fabVolume: meta.fabVolume,
        ibisMovable: rp.ibisMovable,
        ultrasonicElement: rp.ultrasonicElement,
      };

      const st: CompiledPartState = {
        index: idx,
        id: meta.id,
        meta,
        cadPart: v2CadPart,
        assembledPos,
        explodeOffset,
        localBox: partLocalBox,
        partGroup: rp.group,
        curX: assembledPos.x,
        curY: assembledPos.y,
        curZ: assembledPos.z,
        visible: !culledBySubView,
        culledBySubView,
      };
      partStates.push(st);
      this.partById.set(meta.id, st);

      if ((pi + 1) % 24 === 0) {
        if (await maybeYield(pi + 1, totalParts + 3)) {
          disposeTemporaryRawTree(rawParts, false);
          proxy.releaseAll();
          this.dispose(cache);
          throw new Error(`${this.unitId} build aborted`);
        }
      }
    }

    this.partsState = partStates;

    // Step 2: Partition captures into Tier-1 InstancedMesh candidates vs Tier-2 BatchedMesh static merges
    const instGroups = new Map<
      string,
      {
        geoKey: string;
        bucket: MaterialBucketKey;
        heroKey?: string;
        heroSpec?: HeroMaterialSpec;
        canonicalGeo: THREE.BufferGeometry;
        items: RawMeshCapture[];
        forceInstance: boolean;
        triCount: number;
      }
    >();

    for (let i = 0; i < captures.length; i++) {
      const cap = captures[i];
      const geoKey = computeCanonicalGeoKey(cap.geometry, quality);
      const matGroupKey = cap.heroKey ? `hero:${cap.heroKey}` : `b:${cap.bucket}`;
      const groupId = `${geoKey}|${matGroupKey}`;
      let grp = instGroups.get(groupId);
      if (!grp) {
        const pos = cap.geometry.getAttribute('position');
        const triCount = cap.geometry.index
          ? Math.floor(cap.geometry.index.count / 3)
          : pos
            ? Math.floor(pos.count / 3)
            : 0;
        grp = {
          geoKey,
          bucket: cap.bucket,
          heroKey: cap.heroKey,
          heroSpec: cap.heroSpec,
          canonicalGeo: cap.geometry,
          items: [],
          forceInstance: false,
          triCount,
        };
        instGroups.set(groupId, grp);
      }
      if (cap.fromInstanced) grp.forceInstance = true;
      grp.items.push(cap);
    }

    const chosenInstGroups: Array<typeof instGroups extends Map<string, infer V> ? V : never> = [];
    const batchedCaptures: RawMeshCapture[] = [];

    const candidateList = Array.from(instGroups.values()).filter(
      (g) => g.forceInstance || g.items.length >= 4 || (g.items.length >= 2 && g.triCount >= 28)
    );
    candidateList.sort((a, b) => {
      if (a.forceInstance !== b.forceInstance) return a.forceInstance ? -1 : 1;
      const savedA = (a.items.length - 1) * Math.max(12, a.triCount);
      const savedB = (b.items.length - 1) * Math.max(12, b.triCount);
      return savedB - savedA;
    });

    const selectedSet = new Set(candidateList.slice(0, MAX_INSTANCED_POOLS));
    for (const grp of instGroups.values()) {
      if (selectedSet.has(grp)) {
        chosenInstGroups.push(grp);
      } else {
        for (let i = 0; i < grp.items.length; i++) {
          batchedCaptures.push(grp.items[i]);
        }
      }
    }

    // Step 3: Build Tier-1 InstancedMesh pools
    let totalInstances = 0;
    let estimatedTriangles = 0;
    const partBindingIndexSets: Set<number>[] = partStates.map(() => new Set<number>());
    const bindings: RaycastMeshBinding[] = [];
    const instancedMeshes: THREE.InstancedMesh[] = [];

    for (let gi = 0; gi < chosenInstGroups.length; gi++) {
      const grp = chosenInstGroups[gi];
      const normGeoKey = `v2inst:${this.unitId}:${grp.geoKey}`;
      const cachedGeo = cache.acquireGeometry(normGeoKey, () => {
        const ng = normalizeGeometry(grp.canonicalGeo, null);
        return ng ?? new THREE.BoxGeometry(0.1, 0.1, 0.1);
      });
      const mat = grp.heroKey && grp.heroSpec
        ? cache.acquireHeroMaterial(grp.heroKey, grp.heroSpec, quality, 'solid', this.clippingPlanes)
        : cache.acquireMaterial(grp.bucket, quality, 'solid', this.clippingPlanes);

      const count = grp.items.length;
      const instMesh = new THREE.InstancedMesh(cachedGeo, mat, count);
      instMesh.name = `${this.unitId}-inst-${gi}-${grp.bucket}`;
      instMesh.matrixAutoUpdate = false;
      instMesh.updateMatrix();
      instMesh.frustumCulled = false;

      const entries: CompiledInstancedEntry[] = [];
      const idToPart: string[] = new Array(count);
      const bindingIdx = bindings.length;
      let hasDynamic = false;

      for (let ii = 0; ii < count; ii++) {
        const cap = grp.items[ii];
        const pst = partStates[cap.partIndex];
        idToPart[ii] = cap.partId;
        partBindingIndexSets[cap.partIndex].add(bindingIdx);
        if (cap.dynamicNode) hasDynamic = true;

        let localMat = cap.localMatrix;
        if (cap.dynamicNode && cap.dynamicNode !== pst.partGroup) {
          // Store matrix relative to the animated node so rig transforms compose cleanly
          _scratchInv.copy(cap.dynamicNode.matrixWorld).invert();
          const partWorld = pst.partGroup.matrixWorld;
          _scratchMat2.multiplyMatrices(partWorld, cap.localMatrix);
          localMat = new THREE.Matrix4().multiplyMatrices(_scratchInv, _scratchMat2);
        }

        entries.push({
          partIndex: cap.partIndex,
          partId: cap.partId,
          baseLocalMatrix: localMat,
          baseColor: cap.tint,
          dynamicNode: cap.dynamicNode,
        });

        _scratchMat.copy(localMat);
        _scratchMat.elements[12] += pst.curX;
        _scratchMat.elements[13] += pst.curY;
        _scratchMat.elements[14] += pst.curZ;
        instMesh.setMatrixAt(ii, pst.visible ? _scratchMat : _zeroMatrix);
        _scratchColor.setHex(cap.tint);
        instMesh.setColorAt(ii, _scratchColor);
      }
      instMesh.instanceMatrix.needsUpdate = true;
      if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;

      rootGroup.add(instMesh);
      instancedMeshes.push(instMesh);
      bindings.push({
        kind: 'instanced',
        mesh: instMesh,
        instanceIdToPartId: idToPart,
      });
      this.instancedPools.push({
        bucket: grp.bucket,
        heroKey: grp.heroKey,
        heroSpec: grp.heroSpec,
        mesh: instMesh,
        entries,
        instanceIdToPartId: idToPart,
        hasDynamicNodes: hasDynamic,
      });

      totalInstances += count;
      const gPos = cachedGeo.getAttribute('position');
      const gTris = cachedGeo.index
        ? Math.floor(cachedGeo.index.count / 3)
        : gPos
          ? Math.floor(gPos.count / 3)
          : 0;
      estimatedTriangles += gTris * count;
    }

    if (await maybeYield(totalParts + 1, totalParts + 3)) {
      disposeTemporaryRawTree(rawParts, false);
      proxy.releaseAll();
      this.dispose(cache);
      throw new Error(`${this.unitId} build aborted`);
    }

    // Step 4: Group remaining captures by (materialKey -> (partIndex, dynamicNode, tint)) and build Tier-2 BatchedMeshes
    interface SubBatchItem {
      readonly partIndex: number;
      readonly partId: string;
      readonly tint: number;
      readonly dynamicNode: THREE.Object3D | null;
      readonly mergedGeo: THREE.BufferGeometry;
      readonly vertCount: number;
      readonly noEdges: boolean;
      readonly edgeOpacity: number;
    }

    const materialBuckets = new Map<
      string,
      {
        bucket: MaterialBucketKey;
        heroKey?: string;
        heroSpec?: HeroMaterialSpec;
        subMap: Map<string, { partIndex: number; partId: string; tint: number; dynamicNode: THREE.Object3D | null; geos: THREE.BufferGeometry[]; noEdges: boolean; edgeOpacity: number }>;
      }
    >();

    // Track per-part merged geometries & average luminance for brightness-adaptive BatchedEdgeLines
    const partEdgeSourceGeos: Array<{
      partIndex: number;
      partId: string;
      geos: THREE.BufferGeometry[];
      edgeOpacity: number;
      lumaSum: number;
      lumaCount: number;
    }> = partStates.map((st) => ({
      partIndex: st.index,
      partId: st.id,
      geos: [],
      edgeOpacity: st.meta.edgeOpacity,
      lumaSum: 0,
      lumaCount: 0,
    }));

    const dynNodeIds = new WeakMap<THREE.Object3D, number>();
    let nextDynNodeId = 1;
    const getDynId = (node: THREE.Object3D | null): number => {
      if (!node) return 0;
      let id = dynNodeIds.get(node);
      if (!id) {
        id = nextDynNodeId++;
        dynNodeIds.set(node, id);
      }
      return id;
    };

    for (let i = 0; i < batchedCaptures.length; i++) {
      const cap = batchedCaptures[i];
      const matKey = cap.heroKey ? `hero:${cap.heroKey}` : `b:${cap.bucket}`;
      let mb = materialBuckets.get(matKey);
      if (!mb) {
        mb = {
          bucket: cap.bucket,
          heroKey: cap.heroKey,
          heroSpec: cap.heroSpec,
          subMap: new Map(),
        };
        materialBuckets.set(matKey, mb);
      }

      const pst = partStates[cap.partIndex];
      let bakeMat = cap.localMatrix;
      if (cap.dynamicNode && cap.dynamicNode !== pst.partGroup) {
        _scratchInv.copy(cap.dynamicNode.matrixWorld).invert();
        _scratchMat2.multiplyMatrices(pst.partGroup.matrixWorld, cap.localMatrix);
        bakeMat = new THREE.Matrix4().multiplyMatrices(_scratchInv, _scratchMat2);
      }

      const normGeo = normalizeGeometry(cap.geometry, bakeMat);
      if (!normGeo) continue;

      const dId = getDynId(cap.dynamicNode);
      const subKey = `${cap.partIndex}:${dId}:${cap.tint}`;
      let sub = mb.subMap.get(subKey);
      if (!sub) {
        sub = {
          partIndex: cap.partIndex,
          partId: cap.partId,
          tint: cap.tint,
          dynamicNode: cap.dynamicNode,
          geos: [],
          noEdges: true,
          edgeOpacity: cap.edgeOpacity,
        };
        mb.subMap.set(subKey, sub);
      }
      sub.geos.push(normGeo);
      if (!cap.noEdges) {
        sub.noEdges = false;
        sub.edgeOpacity = Math.max(sub.edgeOpacity, cap.edgeOpacity);
        // Only collect edges for static part-level geometries (non-child-animated) so BatchedEdgeLines stays exact
        if (!cap.dynamicNode || cap.dynamicNode === pst.partGroup) {
          const holder = partEdgeSourceGeos[cap.partIndex];
          holder.geos.push(normGeo);
          holder.edgeOpacity = Math.max(holder.edgeOpacity, cap.edgeOpacity);
          holder.lumaSum += getCadTintLuma(cap.tint);
          holder.lumaCount += 1;
        }
      }
    }

    const batchedMeshes: THREE.BatchedMesh[] = [];
    let totalBatchedItems = 0;

    for (const [, mb] of materialBuckets.entries()) {
      const mergedItems: SubBatchItem[] = [];
      for (const sub of mb.subMap.values()) {
        if (sub.geos.length === 0) continue;
        const merged =
          sub.geos.length === 1 ? sub.geos[0] : mergeGeometries(sub.geos, false);
        if (!merged) continue;
        // Dispose individual normalized pieces if mergeGeometries created a new BufferGeometry
        if (sub.geos.length > 1) {
          // Keep references if needed by partEdgeSourceGeos? Replace in edge list first!
          const edgeHolder = partEdgeSourceGeos[sub.partIndex];
          const keptInEdge = sub.geos.some((g) => edgeHolder.geos.includes(g));
          if (keptInEdge) {
            edgeHolder.geos = edgeHolder.geos.filter((g) => !sub.geos.includes(g));
            edgeHolder.geos.push(merged);
          }
          for (let g = 0; g < sub.geos.length; g++) {
            sub.geos[g].dispose();
          }
        }
        const vCount = merged.getAttribute('position')?.count ?? 0;
        if (vCount < 3) {
          merged.dispose();
          continue;
        }
        mergedItems.push({
          partIndex: sub.partIndex,
          partId: sub.partId,
          tint: sub.tint,
          dynamicNode: sub.dynamicNode,
          mergedGeo: merged,
          vertCount: vCount,
          noEdges: sub.noEdges,
          edgeOpacity: sub.edgeOpacity,
        });
      }

      if (mergedItems.length === 0) continue;

      // Split into vertex-budget chunks for WebGL2 / mobile GPU buffer safety
      const chunks: SubBatchItem[][] = [];
      let curChunk: SubBatchItem[] = [];
      let curVerts = 0;
      for (let i = 0; i < mergedItems.length; i++) {
        const it = mergedItems[i];
        if (curChunk.length > 0 && curVerts + it.vertCount > MAX_BATCHED_VERTS) {
          chunks.push(curChunk);
          curChunk = [];
          curVerts = 0;
        }
        curChunk.push(it);
        curVerts += it.vertCount;
      }
      if (curChunk.length > 0) chunks.push(curChunk);

      for (let ci = 0; ci < chunks.length; ci++) {
        const chunkItems = chunks[ci];
        let totalVerts = 0;
        for (let i = 0; i < chunkItems.length; i++) {
          totalVerts += chunkItems[i].vertCount;
        }
        const maxVerts = Math.max(64, totalVerts + 32);
        const maxIndices = Math.max(64, totalVerts + 32);

        const mat =
          mb.heroKey && mb.heroSpec
            ? cache.acquireHeroMaterial(
                mb.heroKey,
                mb.heroSpec,
                quality,
                'solid',
                this.clippingPlanes
              )
            : cache.acquireMaterial(mb.bucket, quality, 'solid', this.clippingPlanes);

        const batched = new THREE.BatchedMesh(chunkItems.length, maxVerts, maxIndices, mat);
        batched.name = `${this.unitId}-batch-${mb.heroKey ?? mb.bucket}-${ci}`;
        batched.matrixAutoUpdate = false;
        batched.updateMatrix();
        batched.frustumCulled = false;
        batched.perObjectFrustumCulled = false;
        batched.sortObjects = Boolean(mat.transparent);

        const entries: CompiledBatchedEntry[] = [];
        const batchIdToPartId: string[] = [];
        const bindingIdx = bindings.length;
        let hasDynamic = false;

        for (let i = 0; i < chunkItems.length; i++) {
          const it = chunkItems[i];
          const pst = partStates[it.partIndex];
          const geoId = batched.addGeometry(it.mergedGeo);
          const batchId = batched.addInstance(geoId);
          batchIdToPartId[batchId] = it.partId;
          partBindingIndexSets[it.partIndex].add(bindingIdx);
          if (it.dynamicNode) hasDynamic = true;

          _scratchMat.makeTranslation(pst.curX, pst.curY, pst.curZ);
          batched.setMatrixAt(batchId, _scratchMat);
          batched.setVisibleAt(batchId, pst.visible);
          _scratchColor.setHex(it.tint);
          batched.setColorAt(batchId, _scratchColor);

          entries.push({
            batchId,
            partIndex: it.partIndex,
            partId: it.partId,
            baseColor: it.tint,
            dynamicNode: it.dynamicNode,
            baseLocalMatrix: null,
          });

          estimatedTriangles += Math.floor(it.vertCount / 3);
        }

        batched.computeBoundingBox();
        batched.computeBoundingSphere();

        rootGroup.add(batched);
        batchedMeshes.push(batched);
        bindings.push({
          kind: 'batched',
          mesh: batched,
          batchIdToPartId,
        });
        this.batchedPools.push({
          bucket: mb.bucket,
          heroKey: mb.heroKey,
          heroSpec: mb.heroSpec,
          mesh: batched,
          entries,
          batchIdToPartId,
          hasDynamicNodes: hasDynamic,
        });
        totalBatchedItems += chunkItems.length;
      }

      // Extract edge geometries cleanly before disposing merged CPU geometries!
      // (Edge extraction happens right below while partEdgeSourceGeos still holds live refs)
    }

    if (await maybeYield(totalParts + 2, totalParts + 3)) {
      disposeTemporaryRawTree(rawParts, false);
      proxy.releaseAll();
      this.dispose(cache);
      throw new Error(`${this.unitId} build aborted`);
    }

    // Step 5: Build Tier-3 Single-Draw-Call BatchedEdgeLines (1 dc across STD/HIGH/ULTRA/CAD/XRAY)
    const edgeSpans: BatchedEdgePartSpan[] = [];
    const edgeChunks: Float32Array[] = [];
    let totalEdgeVerts = 0;
    const maxEdgeVerts = MAX_TOTAL_EDGE_SEGMENTS * 2;
    const edgeAngle = quality === 'ultra' ? 30 : quality === 'high' ? 32 : 33;

    for (let pi = 0; pi < partEdgeSourceGeos.length; pi++) {
      const holder = partEdgeSourceGeos[pi];
      if (holder.geos.length === 0 || holder.edgeOpacity <= 0.01 || totalEdgeVerts >= maxEdgeVerts) {
        continue;
      }
      const partStartVert = totalEdgeVerts;
      for (let g = 0; g < holder.geos.length; g++) {
        if (totalEdgeVerts >= maxEdgeVerts) break;
        const src = holder.geos[g];
        const srcPosCount = src.getAttribute('position')?.count ?? 0;
        if (srcPosCount > 15000) continue;
        const eGeo = new THREE.EdgesGeometry(src, edgeAngle);
        const ePos = eGeo.getAttribute('position');
        if (ePos && ePos.count >= 2) {
          const allowed = Math.min(ePos.count, maxEdgeVerts - totalEdgeVerts);
          const evenCount = allowed - (allowed % 2);
          if (evenCount >= 2) {
            const arr = new Float32Array(evenCount * 3);
            for (let k = 0; k < evenCount * 3; k++) {
              arr[k] = (ePos.array as Float32Array)[k];
            }
            edgeChunks.push(arr);
            totalEdgeVerts += evenCount;
          }
        }
        eGeo.dispose();
      }
      if (totalEdgeVerts > partStartVert) {
        const avgLuma = holder.lumaCount > 0 ? holder.lumaSum / holder.lumaCount : 0.5;
        edgeSpans.push({
          partIndex: holder.partIndex,
          partId: holder.partId,
          vertexOffset: partStartVert,
          vertexCount: totalEdgeVerts - partStartVert,
          edgeOpacity: holder.edgeOpacity,
          darkBase: avgLuma < 0.36,
        });
      }
    }

    // Dispose ALL temporary normalized/merged CPU geometries now that BatchedMesh + EdgesGeometry copied them!
    const disposedMerged = new Set<THREE.BufferGeometry>();
    for (const [, mb] of materialBuckets.entries()) {
      for (const sub of mb.subMap.values()) {
        for (let g = 0; g < sub.geos.length; g++) {
          const geo = sub.geos[g];
          if (!disposedMerged.has(geo)) {
            disposedMerged.add(geo);
            geo.dispose();
          }
        }
      }
    }
    for (let pi = 0; pi < partEdgeSourceGeos.length; pi++) {
      for (let g = 0; g < partEdgeSourceGeos[pi].geos.length; g++) {
        const geo = partEdgeSourceGeos[pi].geos[g];
        if (!disposedMerged.has(geo)) {
          disposedMerged.add(geo);
          geo.dispose();
        }
      }
      partEdgeSourceGeos[pi].geos.length = 0;
    }

    if (totalEdgeVerts >= 2) {
      const basePositions = new Float32Array(totalEdgeVerts * 3);
      const livePositions = new Float32Array(totalEdgeVerts * 3);
      const liveColors = new Float32Array(totalEdgeVerts * 3);

      let cursor = 0;
      for (let c = 0; c < edgeChunks.length; c++) {
        basePositions.set(edgeChunks[c], cursor);
        cursor += edgeChunks[c].length;
      }

      // Initialize livePositions to assembled positions & brightness-adaptive CAD contour colors
      for (let s = 0; s < edgeSpans.length; s++) {
        const sp = edgeSpans[s];
        const pst = partStates[sp.partIndex];
        const start = sp.vertexOffset * 3;
        const end = (sp.vertexOffset + sp.vertexCount) * 3;
        if (pst.visible) {
          for (let k = start; k < end; k += 3) {
            livePositions[k] = basePositions[k] + pst.curX;
            livePositions[k + 1] = basePositions[k + 1] + pst.curY;
            livePositions[k + 2] = basePositions[k + 2] + pst.curZ;
          }
        }
        const cr = sp.darkBase ? 0.46 : 0.11;
        const cg = sp.darkBase ? 0.52 : 0.14;
        const cb = sp.darkBase ? 0.60 : 0.19;
        for (let k = start; k < end; k += 3) {
          liveColors[k] = cr;
          liveColors[k + 1] = cg;
          liveColors[k + 2] = cb;
        }
      }

      const edgeGeo = new THREE.BufferGeometry();
      const posAttr = new THREE.BufferAttribute(livePositions, 3);
      posAttr.setUsage(THREE.DynamicDrawUsage);
      const colAttr = new THREE.BufferAttribute(liveColors, 3);
      colAttr.setUsage(THREE.DynamicDrawUsage);
      edgeGeo.setAttribute('position', posAttr);
      edgeGeo.setAttribute('color', colAttr);

      const solidMatKey = `${this.unitId}-v2-edges-solid`;
      const cadMatKey = `${this.unitId}-v2-edges-cad`;
      const xrayMatKey = `${this.unitId}-v2-edges-xray`;
      const edgeMat = cache.acquireLineMaterial(solidMatKey, {
        color: 0xffffff,
        opacity: 0.28,
        vertexColors: true,
        clippingPlanes: this.clippingPlanes,
      });

      const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
      edgeLines.name = `${this.unitId}-batched-edges`;
      edgeLines.matrixAutoUpdate = false;
      edgeLines.updateMatrix();
      edgeLines.frustumCulled = false;
      edgeLines.visible = QUALITY_TIER_CONFIG[quality].showSolidStructuralEdges;

      rootGroup.add(edgeLines);
      this.edgeBundle = {
        lines: edgeLines,
        basePositions,
        livePositions,
        liveColors,
        posAttr,
        colAttr,
        spans: edgeSpans,
        solidMatKey,
        cadMatKey,
        xrayMatKey,
      };
    }

    // Step 6: Adopt optional physics overlay & explode guides onto ResourceCache
    if (rawBuild.overlayGroup || rawBuild.explodeGuides) {
      const ovRoot = new THREE.Group();
      ovRoot.name = `${this.unitId}-v2-overlays`;
      ovRoot.matrixAutoUpdate = false;
      ovRoot.updateMatrix();
      if (rawBuild.overlayGroup) {
        adoptOverlaySubtreeToCache(
          rawBuild.overlayGroup,
          cache,
          `${this.unitId}-ov`,
          this.clippingPlanes,
          false
        );
        ovRoot.add(rawBuild.overlayGroup);
      }
      if (rawBuild.explodeGuides) {
        adoptOverlaySubtreeToCache(
          rawBuild.explodeGuides,
          cache,
          `${this.unitId}-gd`,
          this.clippingPlanes,
          false
        );
        ovRoot.add(rawBuild.explodeGuides);
      }
      rootGroup.add(ovRoot);
    }

    // Step 7: Dispose all raw build geometries & temporary proxy material refs (zero VRAM bloat!)
    disposeTemporaryRawTree(rawParts, this.hasDynamicRig);
    proxy.releaseAll();

    // Ensure 100% of scene nodes have matrixAutoUpdate = false
    setStaticMatrixRecursively(rootGroup);

    // Step 8: Build 2-stage AABB RaycastIndex (Unit -> Group -> Part -> Instanced/Batched bindings)
    const raycastParts: RaycastPartBounds[] = [];
    const partBoundsById = new Map<string, RaycastPartBounds>();
    const groupMap = new Map<string, number[]>();
    const unitWorldBox = new THREE.Box3();

    for (let i = 0; i < partStates.length; i++) {
      const st = partStates[i];
      const worldBox = st.localBox.clone();
      if (!worldBox.isEmpty()) {
        worldBox.translate(st.assembledPos);
        if (st.visible) unitWorldBox.union(worldBox);
      }
      const pb: RaycastPartBounds = {
        partId: st.id,
        groupKey: st.meta.groupKey,
        localBox: st.localBox.clone(),
        worldBox,
        bindingIndices: Array.from(partBindingIndexSets[i]),
      };
      raycastParts.push(pb);
      partBoundsById.set(st.id, pb);
      let grpArr = groupMap.get(st.meta.groupKey);
      if (!grpArr) {
        grpArr = [];
        groupMap.set(st.meta.groupKey, grpArr);
      }
      grpArr.push(i);
    }

    const raycastGroups: RaycastGroupBounds[] = [];
    for (const [groupKey, partIndices] of groupMap.entries()) {
      const gBox = new THREE.Box3();
      for (let i = 0; i < partIndices.length; i++) {
        const pb = raycastParts[partIndices[i]];
        if (!pb.worldBox.isEmpty()) gBox.union(pb.worldBox);
      }
      raycastGroups.push({ groupKey, worldBox: gBox, partIndices });
    }

    this.raycastIndex = {
      unitWorldBox,
      bindings,
      parts: raycastParts,
      groups: raycastGroups,
      partBoundsById,
    };

    const totalBuildMs = nowMs() - tStart;
    const stats: UnitBuildStats = {
      quality,
      declaredPartCount: this.cfg.meta.declaredPartCount,
      registeredPartCount: partStates.length,
      instancedMeshCount: instancedMeshes.length,
      totalInstances,
      batchedMeshCount: batchedMeshes.length,
      totalBatchedItems,
      edgeLineCount: this.edgeBundle ? 1 : 0,
      estimatedTriangles,
      buildTimeMs: totalBuildMs,
      maxChunkMs,
      chunkCount,
    };

    const registeredPartIds = new Set<string>();
    const cadParts: CadPart[] = new Array(partStates.length);
    for (let i = 0; i < partStates.length; i++) {
      registeredPartIds.add(partStates[i].id);
      cadParts[i] = partStates[i].cadPart;
    }

    // Apply initial explode=0 & visibility cleanly
    this.updateExplode(0, true);

    return {
      rootGroup,
      parts: cadParts,
      registeredPartIds,
      instancedMeshes,
      batchedMeshes,
      raycastIndex: this.raycastIndex,
      stats,
    };
  }

  public setSubView(subView: number): void {
    if (this.subView === subView) return;
    this.subView = subView;
    this.rawBuild?.onSubViewChange?.(subView);
    if (this.cfg.isPartInSubView) {
      for (let i = 0; i < this.partsState.length; i++) {
        const st = this.partsState[i];
        st.culledBySubView = !this.cfg.isPartInSubView(st.meta, subView);
      }
      this.setVisualState(
        this.selectedId,
        this.hoveredId,
        this.hiddenIds,
        this.isolatedId,
        this.renderMode
      );
      this.refreshRaycastBounds();
    }
  }

  public getActiveParts(): CadPart[] {
    if (!this.cfg.isPartInSubView) {
      const out: CadPart[] = new Array(this.partsState.length);
      for (let i = 0; i < this.partsState.length; i++) out[i] = this.partsState[i].cadPart;
      return out;
    }
    const filtered: CadPart[] = [];
    for (let i = 0; i < this.partsState.length; i++) {
      if (!this.partsState[i].culledBySubView) {
        filtered.push(this.partsState[i].cadPart);
      }
    }
    return filtered;
  }

  public isPartCulledBySubView(partId: string): boolean {
    const st = this.partById.get(partId);
    return st ? st.culledBySubView : false;
  }

  /**
   * Strictly zero-allocation differential explode update for t in [0.0, 1.0].
   */
  public updateExplode(t: number, force = false): boolean {
    const clamped = t < 0 ? 0 : t > 1 ? 1 : t;
    if (!force && Math.abs(clamped - this.lastExplodeT) < 1e-6) {
      return false;
    }
    this.lastExplodeT = clamped;

    const states = this.partsState;
    for (let i = 0; i < states.length; i++) {
      const st = states[i];
      st.curX = st.assembledPos.x + st.explodeOffset.x * clamped;
      st.curY = st.assembledPos.y + st.explodeOffset.y * clamped;
      st.curZ = st.assembledPos.z + st.explodeOffset.z * clamped;
      st.partGroup.position.set(st.curX, st.curY, st.curZ);
      st.partGroup.updateMatrix();
    }

    // Update Tier-1 InstancedMesh transforms (zero allocations)
    for (let p = 0; p < this.instancedPools.length; p++) {
      const pool = this.instancedPools[p];
      const entries = pool.entries;
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i];
        const st = states[e.partIndex];
        if (!st.visible) {
          pool.mesh.setMatrixAt(i, _zeroMatrix);
        } else {
          _scratchMat.copy(e.baseLocalMatrix);
          _scratchMat.elements[12] += st.curX;
          _scratchMat.elements[13] += st.curY;
          _scratchMat.elements[14] += st.curZ;
          pool.mesh.setMatrixAt(i, _scratchMat);
        }
      }
      pool.mesh.instanceMatrix.needsUpdate = true;
    }

    // Update Tier-2 BatchedMesh transforms (zero allocations)
    for (let p = 0; p < this.batchedPools.length; p++) {
      const pool = this.batchedPools[p];
      const entries = pool.entries;
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i];
        const st = states[e.partIndex];
        _scratchMat.makeTranslation(st.curX, st.curY, st.curZ);
        pool.mesh.setMatrixAt(e.batchId, _scratchMat);
      }
    }

    // Update Tier-3 BatchedEdgeLines positions in-place (zero allocations)
    this.syncBatchedEdgePositions();

    // Update 2-stage AABB world bounding boxes (zero allocations)
    this.refreshRaycastBounds();
    return true;
  }

  private syncBatchedEdgePositions(): void {
    const eb = this.edgeBundle;
    if (!eb) return;
    const base = eb.basePositions;
    const live = eb.livePositions;
    const spans = eb.spans;
    const states = this.partsState;

    for (let s = 0; s < spans.length; s++) {
      const sp = spans[s];
      const st = states[sp.partIndex];
      const start = sp.vertexOffset * 3;
      const end = (sp.vertexOffset + sp.vertexCount) * 3;
      if (!st.visible) {
        for (let k = start; k < end; k++) live[k] = 0;
      } else {
        const ox = st.curX;
        const oy = st.curY;
        const oz = st.curZ;
        for (let k = start; k < end; k += 3) {
          live[k] = base[k] + ox;
          live[k + 1] = base[k + 1] + oy;
          live[k + 2] = base[k + 2] + oz;
        }
      }
    }
    eb.posAttr.needsUpdate = true;
  }

  private refreshRaycastBounds(): void {
    const idx = this.raycastIndex;
    if (!idx) return;
    idx.unitWorldBox.makeEmpty();

    const states = this.partsState;
    for (let i = 0; i < idx.parts.length; i++) {
      const pb = idx.parts[i];
      const st = states[i];
      if (!pb.localBox.isEmpty() && st.visible) {
        _scratchPos.set(st.curX, st.curY, st.curZ);
        pb.worldBox.copy(pb.localBox).translate(_scratchPos);
        idx.unitWorldBox.union(pb.worldBox);
      } else {
        pb.worldBox.makeEmpty();
      }
    }

    for (let gi = 0; gi < idx.groups.length; gi++) {
      const grp = idx.groups[gi];
      grp.worldBox.makeEmpty();
      const pIdxs = grp.partIndices;
      for (let k = 0; k < pIdxs.length; k++) {
        const pb = idx.parts[pIdxs[k]];
        if (!pb.worldBox.isEmpty()) {
          grp.worldBox.union(pb.worldBox);
        }
      }
    }
  }

  public setVisualState(
    selectedId: string | null,
    hoveredId: string | null,
    hiddenIds: ReadonlySet<string>,
    isolatedId: string | null,
    renderMode: RenderMode
  ): void {
    const modeChanged = this.renderMode !== renderMode;
    this.selectedId = selectedId;
    this.hoveredId = hoveredId;
    this.hiddenIds = hiddenIds;
    this.isolatedId = isolatedId;
    this.renderMode = renderMode;

    const states = this.partsState;
    let visChanged = false;
    for (let i = 0; i < states.length; i++) {
      const st = states[i];
      const nextVis =
        !st.culledBySubView &&
        !hiddenIds.has(st.id) &&
        (isolatedId === null || isolatedId === st.id);
      if (st.visible !== nextVis) {
        st.visible = nextVis;
        st.partGroup.visible = nextVis;
        visChanged = true;
      }
    }

    // Swap cached materials cleanly on renderMode change (solid / xray / cad)
    if (modeChanged && this.cache) {
      const cache = this.cache;
      for (let p = 0; p < this.instancedPools.length; p++) {
        const pool = this.instancedPools[p];
        const oldMat = pool.mesh.material as THREE.Material;
        const nextMat =
          pool.heroKey && pool.heroSpec
            ? cache.acquireHeroMaterial(
                pool.heroKey,
                pool.heroSpec,
                this.quality,
                renderMode,
                this.clippingPlanes
              )
            : cache.acquireMaterial(pool.bucket, this.quality, renderMode, this.clippingPlanes);
        pool.mesh.material = nextMat;
        cache.releaseMaterialInstance(oldMat);
      }
      for (let p = 0; p < this.batchedPools.length; p++) {
        const pool = this.batchedPools[p];
        const oldMat = pool.mesh.material as THREE.Material;
        const nextMat =
          pool.heroKey && pool.heroSpec
            ? cache.acquireHeroMaterial(
                pool.heroKey,
                pool.heroSpec,
                this.quality,
                renderMode,
                this.clippingPlanes
              )
            : cache.acquireMaterial(pool.bucket, this.quality, renderMode, this.clippingPlanes);
        pool.mesh.material = nextMat;
        pool.mesh.sortObjects = Boolean(nextMat.transparent);
        cache.releaseMaterialInstance(oldMat);
      }
      if (this.edgeBundle) {
        const eb = this.edgeBundle;
        const oldMat = eb.lines.material as THREE.Material;
        const nextKey =
          renderMode === 'cad'
            ? eb.cadMatKey
            : renderMode === 'xray'
              ? eb.xrayMatKey
              : eb.solidMatKey;
        const nextOp = renderMode === 'cad' ? 0.62 : renderMode === 'xray' ? 0.34 : 0.28;
        const nextMat = cache.acquireLineMaterial(nextKey, {
          color: 0xffffff,
          opacity: nextOp,
          vertexColors: true,
          clippingPlanes: this.clippingPlanes,
        });
        eb.lines.material = nextMat;
        cache.releaseMaterialInstance(oldMat);
        eb.lines.visible =
          renderMode === 'cad' ||
          renderMode === 'xray' ||
          QUALITY_TIER_CONFIG[this.quality].showSolidStructuralEdges;
      }
    }

    const computeHighlightColor = (partId: string, baseHex: number): void => {
      if (partId === selectedId) {
        _scratchColor.setHex(baseHex);
        const r = _scratchColor.r * 0.48 + 0.102 * 0.52;
        const g = _scratchColor.g * 0.48 + 0.451 * 0.52;
        const b = _scratchColor.b * 0.48 + 0.910 * 0.52;
        _scratchColor.setRGB(r, g, b);
      } else if (partId === hoveredId) {
        _scratchColor.setHex(baseHex);
        const r = _scratchColor.r * 0.62 + 0.231 * 0.38;
        const g = _scratchColor.g * 0.62 + 0.510 * 0.38;
        const b = _scratchColor.b * 0.62 + 0.965 * 0.38;
        _scratchColor.setRGB(r, g, b);
      } else if (renderMode === 'cad') {
        _scratchColor.setHex(COL_CAD_BASE);
      } else if (renderMode === 'xray') {
        _scratchColor.setHex(COL_XRAY_BASE);
      } else {
        _scratchColor.setHex(baseHex);
      }
    };

    // Update Tier-1 InstancedMesh colors & visibility
    for (let p = 0; p < this.instancedPools.length; p++) {
      const pool = this.instancedPools[p];
      const entries = pool.entries;
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i];
        const st = states[e.partIndex];
        computeHighlightColor(e.partId, e.baseColor);
        pool.mesh.setColorAt(i, _scratchColor);
        if (visChanged) {
          if (!st.visible) {
            pool.mesh.setMatrixAt(i, _zeroMatrix);
          } else {
            _scratchMat.copy(e.baseLocalMatrix);
            _scratchMat.elements[12] += st.curX;
            _scratchMat.elements[13] += st.curY;
            _scratchMat.elements[14] += st.curZ;
            pool.mesh.setMatrixAt(i, _scratchMat);
          }
        }
      }
      if (pool.mesh.instanceColor) pool.mesh.instanceColor.needsUpdate = true;
      if (visChanged) pool.mesh.instanceMatrix.needsUpdate = true;
    }

    // Update Tier-2 BatchedMesh colors & visibility
    for (let p = 0; p < this.batchedPools.length; p++) {
      const pool = this.batchedPools[p];
      const entries = pool.entries;
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i];
        const st = states[e.partIndex];
        pool.mesh.setVisibleAt(e.batchId, st.visible);
        computeHighlightColor(e.partId, e.baseColor);
        pool.mesh.setColorAt(e.batchId, _scratchColor);
      }
    }

    // Update Tier-3 BatchedEdgeLines colors & visibility
    if (this.edgeBundle) {
      const eb = this.edgeBundle;
      const cols = eb.liveColors;
      const spans = eb.spans;
      for (let s = 0; s < spans.length; s++) {
        const sp = spans[s];
        let cr = sp.darkBase ? 0.46 : 0.11;
        let cg = sp.darkBase ? 0.52 : 0.14;
        let cb = sp.darkBase ? 0.60 : 0.19;
        if (sp.partId === selectedId) {
          cr = 0.05;
          cg = 0.36;
          cb = 0.85;
        } else if (sp.partId === hoveredId) {
          cr = 0.15;
          cg = 0.39;
          cb = 0.92;
        } else if (renderMode === 'xray') {
          cr = 0.23;
          cg = 0.32;
          cb = 0.43;
        } else if (renderMode === 'cad') {
          cr = 0.08;
          cg = 0.09;
          cb = 0.10;
        }
        const start = sp.vertexOffset * 3;
        const end = (sp.vertexOffset + sp.vertexCount) * 3;
        for (let k = start; k < end; k += 3) {
          cols[k] = cr;
          cols[k + 1] = cg;
          cols[k + 2] = cb;
        }
      }
      eb.colAttr.needsUpdate = true;
      if (visChanged) {
        this.syncBatchedEdgePositions();
      }
    }
  }

  public needsContinuousAnimation(physicsActive: boolean): boolean {
    if (physicsActive) return true;
    return this.rawBuild?.needsContinuousAnimation?.(physicsActive) ?? false;
  }

  public setPhysicsVisible(visible: boolean): void {
    this.physicsVisible = visible;
    this.rawBuild?.setOverlayVisible?.(visible);
    if (this.rawBuild?.overlayGroup) {
      this.rawBuild.overlayGroup.visible = visible;
    }
    if (!visible && this.hasDynamicRig && !this.needsContinuousAnimation(false) && this.lastExplodeT >= 0) {
      this.updateExplode(this.lastExplodeT, true);
    }
  }

  public updateExplodeGuides(explodeFactor: number, visible: boolean): void {
    if (!this.rawBuild?.updateGuides) return;
    this.rawBuild.updateGuides(explodeFactor, visible, this.getActiveParts());
    if (this.rawBuild.explodeGuides) {
      this.rawBuild.explodeGuides.traverse((obj) => obj.updateMatrix());
      this.rawBuild.explodeGuides.updateMatrixWorld(true);
    }
  }

  public updatePhysics(
    elapsed: number,
    explodeFactor: number,
    active: boolean,
    delta = 0.016
  ): boolean {
    const rb = this.rawBuild;
    if (!rb?.stepRigAndOverlay) return false;
    const continuous = active || (rb.needsContinuousAnimation?.(active) ?? false);
    if (!continuous && !this.physicsVisible) return false;

    const changed = rb.stepRigAndOverlay(
      elapsed,
      delta,
      explodeFactor,
      active,
      this.integratedMode,
      this.getActiveParts()
    );

    if (changed && this.hasDynamicRig && this.rigSkeletonRoot) {
      this.rigSkeletonRoot.traverse((obj) => obj.updateMatrix());
      this.rigSkeletonRoot.updateMatrixWorld(true);
      this.syncDynamicRigMatrices();
    }
    if (rb.overlayGroup && rb.overlayGroup.visible) {
      rb.overlayGroup.traverse((obj) => obj.updateMatrix());
      rb.overlayGroup.updateMatrixWorld(true);
    }
    return changed || active;
  }

  private syncDynamicRigMatrices(): void {
    const states = this.partsState;
    for (let p = 0; p < this.instancedPools.length; p++) {
      const pool = this.instancedPools[p];
      if (!pool.hasDynamicNodes) continue;
      const entries = pool.entries;
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i];
        const st = states[e.partIndex];
        if (!st.visible) {
          pool.mesh.setMatrixAt(i, _zeroMatrix);
        } else if (e.dynamicNode) {
          _scratchMat.multiplyMatrices(e.dynamicNode.matrixWorld, e.baseLocalMatrix);
          pool.mesh.setMatrixAt(i, _scratchMat);
        }
      }
      pool.mesh.instanceMatrix.needsUpdate = true;
    }

    for (let p = 0; p < this.batchedPools.length; p++) {
      const pool = this.batchedPools[p];
      if (!pool.hasDynamicNodes) continue;
      const entries = pool.entries;
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i];
        const st = states[e.partIndex];
        if (st.visible && e.dynamicNode) {
          pool.mesh.setMatrixAt(e.batchId, e.dynamicNode.matrixWorld);
        }
      }
    }
  }

  public setClippingPlanes(planes: THREE.Plane[]): void {
    this.clippingPlanes = planes;
    this.cache?.updateClippingPlanes(planes);
  }

  public dispose(cache: ResourceCache): void {
    if (this.rootGroup) {
      disposeObject3D(this.rootGroup, cache, true);
      this.rootGroup = null;
    }
    if (this.rigSkeletonRoot) {
      this.rigSkeletonRoot.clear();
      this.rigSkeletonRoot = null;
    }
    this.rawBuild?.onDispose?.();
    this.rawBuild = null;
    this.partsState = [];
    this.partById.clear();
    this.instancedPools = [];
    this.batchedPools = [];
    this.edgeBundle = null;
    this.raycastIndex = null;
    this.cache = null;
    this.lastExplodeT = -1;
  }
}
