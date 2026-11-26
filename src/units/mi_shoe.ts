import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import miShoeJson from '../data/mi_shoe.json';
import { CadPart, PartExplanation, RenderMode } from '../assemblies/types';
import { createFrameShape, createRoundedRectShape } from '../engine/CadHelpers';
import { disposeObject3D } from '../core/dispose';
import {
  getCadTintLuma,
  liftDarkCadTint,
  MaterialBucketKey,
  QUALITY_TIER_CONFIG,
  ResourceCache,
} from '../core/resource_cache';
import {
  OptimizedUnit,
  QualityTier,
  RaycastBatchedBinding,
  RaycastGroupBounds,
  RaycastInstancedBinding,
  RaycastMeshBinding,
  RaycastPartBounds,
  UnitBuildOptions,
  UnitBuildResult,
  UnitBuildStats,
  UnitMeta,
  UnitPartMeta,
} from '../core/unit_contract';

// =============================================================================
// Module-scope zero-allocation scratch objects (NEVER allocate in updateExplode / updatePhysics!)
// =============================================================================
const _tmpPos = new THREE.Vector3();
const _tmpQuat = new THREE.Quaternion();
const _tmpScale = new THREE.Vector3();
const _tmpMat4 = new THREE.Matrix4();
const _tmpColor = new THREE.Color();
const _zeroScale = new THREE.Vector3(0, 0, 0);
const _selTint = new THREE.Color(0x2563eb);
const _hovTint = new THREE.Color(0x60a5fa);
const _cadTint = new THREE.Color(0xf8fafc);
const _xrayTint = new THREE.Color(0xcbd5e1);
const _defVec = new THREE.Vector3();
const _flowA = new THREE.Vector3();
const _flowB = new THREE.Vector3();
const _pktPos = new THREE.Vector3();
const _pktQuat = new THREE.Quaternion();
const _pktScale = new THREE.Vector3();
const _pktMat4 = new THREE.Matrix4();
const _unitBoxScratch = new THREE.Box3();

const MI_SHOE_META: UnitMeta = {
  unitId: miShoeJson.unitId,
  version: miShoeJson.version,
  nameJa: miShoeJson.nameJa,
  nameEn: miShoeJson.nameEn,
  declaredPartCount: miShoeJson.declaredPartCount,
  parts: miShoeJson.parts as unknown as readonly UnitPartMeta[],
};

const OUTER_W = miShoeJson.dimensions.outerW;
const INNER_W = miShoeJson.dimensions.innerW;
const THROAT_W = miShoeJson.dimensions.throatW;
const RAIL_L = miShoeJson.dimensions.railL;
const PIN_PITCH = miShoeJson.dimensions.pinPitch;

function pinX(pinNum: number): number {
  return (pinNum - 11) * PIN_PITCH;
}

// Structural hero parts whose subtle technical edges stay visible in Solid mode
const HERO_EDGE_PARTS = new Set<string>([
  'mi-shoe-cap-875',
  'mi-accessory-wp-skirt',
  'mi-shoe-shell-plate',
  'mi-shoe-screw-cover',
  'mi-shoe-spring-plate',
  'mi-center-xsync-contact',
  'mi-front-21pin-shroud',
  'mi-mis2006-flex-board',
  'mi-fpc-wp-rubber',
  'mi-top-deck-boss-seat',
  'mi-shoe-fix-plate',
  'mi-mainboard-zif-connector',
]);

// =============================================================================
// Internal compact typed-array records for zero-GC explode & highlight updates
// =============================================================================

interface InstancedRecord {
  partIdx: number;
  partId: string;
  localPos: [number, number, number];
  localRot: [number, number, number];
  localScale: [number, number, number];
  colorHex: number;
}

interface InstancedPoolState {
  readonly id: string;
  readonly bucket: MaterialBucketKey;
  readonly mesh: THREE.InstancedMesh;
  readonly count: number;
  readonly partIndices: Int32Array;
  readonly instanceIdToPartId: string[];
  // Flat typed arrays (length = count * 3 / count * 4) for zero-alloc matrix rebuild
  readonly localPos: Float32Array;
  readonly localQuat: Float32Array;
  readonly localScale: Float32Array;
  readonly baseColors: Uint32Array;
}

interface BatchedPieceSpec {
  partIdx: number;
  partId: string;
  bucket: MaterialBucketKey;
  colorHex: number;
  geometry: THREE.BufferGeometry;
}

interface BatchedPoolState {
  readonly bucket: MaterialBucketKey;
  readonly mesh: THREE.BatchedMesh;
  readonly count: number;
  readonly batchIds: Int32Array;
  readonly partIndices: Int32Array;
  readonly batchIdToPartId: string[];
  readonly baseColors: Uint32Array;
}

interface EdgeLineRecord {
  readonly partIdx: number;
  readonly partId: string;
  readonly line: THREE.LineSegments;
  readonly isHero: boolean;
  readonly isDark: boolean;
}

interface PhysicsFlowSpec {
  readonly colorHex: number;
  readonly speed: number;
  readonly packetCount: number;
  readonly dashed: boolean;
  readonly fromPartIdx: number;
  readonly fromOffset: readonly [number, number, number];
  readonly toPartIdx: number;
  readonly toOffset: readonly [number, number, number];
}

interface PhysicsOverlayState {
  readonly overlayGroup: THREE.Group;
  readonly explodeGuidesGroup: THREE.Group;
  readonly flowLines: THREE.Line[];
  readonly flowSpecs: PhysicsFlowSpec[];
  readonly packetInstanced: THREE.InstancedMesh;
  readonly packetFlowIndex: Int32Array;
  readonly packetLocalSlot: Int32Array;
  readonly cornerLines: THREE.Line[];
  readonly cornerCoords: ReadonlyArray<readonly [number, number]>;
  readonly radialLine: THREE.LineSegments;
  readonly guideMat: THREE.LineDashedMaterial;
  readonly radialMat: THREE.LineDashedMaterial;
}

// =============================================================================
// Geometry Normalization & Cached Primitive Builders (Build-Time Only)
// =============================================================================

function normalizeForBatchMerge(src: THREE.BufferGeometry): THREE.BufferGeometry {
  const geo = src.index ? src.toNonIndexed() : src.clone();
  if (!geo.getAttribute('normal')) {
    geo.computeVertexNormals();
  }
  const posAttr = geo.getAttribute('position');
  if (!geo.getAttribute('uv')) {
    geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(posAttr.count * 2), 2));
  }
  for (const attrName of Object.keys(geo.attributes)) {
    if (attrName !== 'position' && attrName !== 'normal' && attrName !== 'uv') {
      geo.deleteAttribute(attrName);
    }
  }
  geo.clearGroups();
  return geo;
}

function makeTransformedGeo(
  raw: THREE.BufferGeometry,
  tx = 0,
  ty = 0,
  tz = 0,
  rx = 0,
  ry = 0,
  rz = 0,
  sx = 1,
  sy = 1,
  sz = 1
): THREE.BufferGeometry {
  const geo = normalizeForBatchMerge(raw);
  raw.dispose();
  if (sx !== 1 || sy !== 1 || sz !== 1) geo.scale(sx, sy, sz);
  if (rx !== 0) geo.rotateX(rx);
  if (ry !== 0) geo.rotateY(ry);
  if (rz !== 0) geo.rotateZ(rz);
  if (tx !== 0 || ty !== 0 || tz !== 0) geo.translate(tx, ty, tz);
  return geo;
}

function makeHorizPlateGeo(
  shape: THREE.Shape,
  thickness: number,
  curveSegs: number,
  bevelSize = 0.08,
  tx = 0,
  ty = 0,
  tz = 0
): THREE.BufferGeometry {
  const hasBevel = bevelSize > 0 && thickness >= 1.2 && curveSegs >= 10;
  const bodyDepth = hasBevel ? Math.max(0.04, thickness - bevelSize * 2) : thickness;
  const raw = new THREE.ExtrudeGeometry(shape, {
    depth: bodyDepth,
    bevelEnabled: hasBevel,
    bevelSegments: hasBevel ? 1 : 0,
    steps: 1,
    bevelSize,
    bevelThickness: bevelSize,
    curveSegments: curveSegs,
  });
  raw.translate(0, 0, -bodyDepth * 0.5);
  raw.rotateX(Math.PI * 0.5);
  return makeTransformedGeo(raw, tx, ty, tz);
}

function countGeometryTriangles(geo: THREE.BufferGeometry): number {
  if (geo.index) return Math.floor(geo.index.count / 3);
  const pos = geo.getAttribute('position');
  return pos ? Math.floor(pos.count / 3) : 0;
}

function setNodeStaticMatrix(obj: THREE.Object3D): void {
  obj.matrixAutoUpdate = false;
  obj.updateMatrix();
}

function yieldNextFrame(): Promise<void> {
  if (typeof requestAnimationFrame === 'function') {
    return new Promise((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function toPartExplanation(meta: UnitPartMeta): PartExplanation {
  return {
    title: meta.title,
    subtitle: meta.subtitle,
    category: meta.category,
    plainAnalogy: meta.plainAnalogy,
    summary: meta.summary,
    opticsAndPhysics: [...meta.opticsAndPhysics],
    ...(meta.formula
      ? {
          formula: {
            expression: meta.formula.expression,
            description: meta.formula.description,
          },
        }
      : {}),
    nextGenInnovation: meta.nextGenInnovation,
    specs: meta.specs.map((s) => ({ label: s.label, value: s.value })),
    diagramType: meta.diagramType,
  };
}

// =============================================================================
// MiShoeUnit — Experimental V2 Fully Optimized Standalone Unit (MI01–MI32)
// =============================================================================

export class MiShoeUnit implements OptimizedUnit {
  public readonly unitId = 'mishoe';

  private rootGroup: THREE.Group | null = null;
  private quality: QualityTier = 'high';
  private renderMode: RenderMode = 'solid';
  private clippingPlanes: THREE.Plane[] = [];

  private parts: CadPart[] = [];
  private partIdToIdx = new Map<string, number>();
  private assembledPosFlat = new Float32Array(0);
  private explodeOffsetFlat = new Float32Array(0);
  private currentPosFlat = new Float32Array(0);

  private instancedPools: InstancedPoolState[] = [];
  private batchedPools: BatchedPoolState[] = [];
  private edgeLines: EdgeLineRecord[] = [];
  private physicsState: PhysicsOverlayState | null = null;
  private raycastIndex: UnitBuildResult['raycastIndex'] | null = null;

  private lastExplodeT = -1;
  private selectedId: string | null = null;
  private hoveredId: string | null = null;
  private hiddenIds: ReadonlySet<string> = new Set();
  private isolatedId: string | null = null;
  private cachedCacheRef: ResourceCache | null = null;

  public getMeta(): UnitMeta {
    return MI_SHOE_META;
  }

  public async build(
    quality: QualityTier,
    cache: ResourceCache,
    options: UnitBuildOptions = {}
  ): Promise<UnitBuildResult> {
    if (this.rootGroup) {
      this.dispose(cache);
    }

    const buildStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const frameBudgetMs = options.frameBudgetMs ?? 8.0;
    const synchronous = options.synchronous === true;
    const isAborted = options.isAborted ?? (() => false);

    this.quality = quality;
    this.renderMode = 'solid';
    this.clippingPlanes = options.clippingPlanes ?? [];
    this.cachedCacheRef = cache;

    const cfg = QUALITY_TIER_CONFIG[quality];
    const partMetas = MI_SHOE_META.parts;
    const partCount = partMetas.length;

    const rootGroup = new THREE.Group();
    rootGroup.name = 'mishoe-v2-unit-root';
    setNodeStaticMatrix(rootGroup);
    this.rootGroup = rootGroup;

    // Flat typed arrays for zero-allocation explode math
    this.assembledPosFlat = new Float32Array(partCount * 3);
    this.explodeOffsetFlat = new Float32Array(partCount * 3);
    this.currentPosFlat = new Float32Array(partCount * 3);
    this.partIdToIdx.clear();
    this.parts = [];

    const partLocalBoxes: THREE.Box3[] = [];
    const partBindingIndexSets: Array<Set<number>> = [];

    for (let i = 0; i < partCount; i++) {
      const pm = partMetas[i];
      this.partIdToIdx.set(pm.id, i);
      const o = i * 3;
      this.assembledPosFlat[o] = pm.assembledPos[0];
      this.assembledPosFlat[o + 1] = pm.assembledPos[1];
      this.assembledPosFlat[o + 2] = pm.assembledPos[2];
      this.explodeOffsetFlat[o] = pm.explodeOffset[0];
      this.explodeOffsetFlat[o + 1] = pm.explodeOffset[1];
      this.explodeOffsetFlat[o + 2] = pm.explodeOffset[2];
      this.currentPosFlat[o] = pm.assembledPos[0];
      this.currentPosFlat[o + 1] = pm.assembledPos[1];
      this.currentPosFlat[o + 2] = pm.assembledPos[2];

      const grp = new THREE.Group();
      grp.name = pm.id;
      grp.position.set(pm.assembledPos[0], pm.assembledPos[1], pm.assembledPos[2]);
      setNodeStaticMatrix(grp);

      const part: CadPart = {
        id: pm.id,
        subsystem: 'mishoe',
        order: pm.order,
        swatchColor: pm.swatchColor,
        group: grp,
        assembledPos: new THREE.Vector3(pm.assembledPos[0], pm.assembledPos[1], pm.assembledPos[2]),
        explodeOffset: new THREE.Vector3(pm.explodeOffset[0], pm.explodeOffset[1], pm.explodeOffset[2]),
        interactiveMeshes: [],
        edgeLines: [],
        explanation: toPartExplanation(pm),
        standaloneOnly: true,
      };
      this.parts.push(part);
      partLocalBoxes.push(new THREE.Box3());
      partBindingIndexSets.push(new Set<number>());
    }

    // Staging accumulators for 3-tier batching
    const batchedPieces: BatchedPieceSpec[] = [];
    const edgeSourceByPart = new Map<number, THREE.BufferGeometry[]>();

    const instPoolsDraft: Record<
      string,
      {
        bucket: MaterialBucketKey;
        geoKey: string;
        geoFactory: () => THREE.BufferGeometry;
        records: InstancedRecord[];
      }
    > = {
      // Tier-1 InstancedMesh pools for ALL repeated identical/scalable components
      front_pin_blades: {
        bucket: 'gold_plating',
        geoKey: 'mi:unit_box:1:1:1',
        geoFactory: () => new THREE.BoxGeometry(1, 1, 1),
        records: [],
      },
      front_pin_tails: {
        bucket: 'gold_plating',
        geoKey: 'mi:unit_box:1:1:1',
        geoFactory: () => new THREE.BoxGeometry(1, 1, 1),
        records: [],
      },
      front_pin_badges: {
        bucket: 'pin_carrier_gloss',
        geoKey: 'mi:unit_box:1:1:1',
        geoFactory: () => new THREE.BoxGeometry(1, 1, 1),
        records: [],
      },
      screw_heads: {
        bucket: 'stainless_machined',
        geoKey: `mi:screw_head:r${cfg.radialSegments}`,
        geoFactory: () => new THREE.CylinderGeometry(1.0, 0.94, 1.0, cfg.radialSegments),
        records: [],
      },
      screw_shanks: {
        bucket: 'stainless_machined',
        geoKey: `mi:screw_shank:r${Math.max(8, cfg.radialSegments - 4)}`,
        geoFactory: () =>
          new THREE.CylinderGeometry(1.0, 0.88, 1.0, Math.max(8, cfg.radialSegments - 4)),
        records: [],
      },
      screw_slots: {
        bucket: 'matte_black_anodized',
        geoKey: 'mi:unit_box:1:1:1',
        geoFactory: () => new THREE.BoxGeometry(1, 1, 1),
        records: [],
      },
      comb_teeth: {
        bucket: 'matte_black_anodized',
        geoKey: 'mi:comb_tooth:0.42:2.4:4.6',
        geoFactory: () => new THREE.BoxGeometry(0.42, 2.4, 4.6),
        records: [],
      },
      cantilever_beams: {
        bucket: 'becu_spring',
        geoKey: 'mi:cantilever_beam:0.68:0.34:4.4',
        geoFactory: () => new THREE.BoxGeometry(0.68, 0.34, 4.4),
        records: [],
      },
      cantilever_tips: {
        bucket: 'gold_plating',
        geoKey: `mi:cantilever_tip:r${Math.max(8, cfg.radialSegments - 4)}`,
        geoFactory: () => {
          const g = new THREE.CylinderGeometry(0.36, 0.36, 0.7, Math.max(8, cfg.radialSegments - 4));
          g.rotateZ(Math.PI * 0.5);
          return g;
        },
        records: [],
      },
      fpc_traces: {
        bucket: 'gold_plating',
        geoKey: 'mi:fpc_trace:0.32:0.08:22',
        geoFactory: () => new THREE.BoxGeometry(0.32, 0.08, 22.0),
        records: [],
      },
      zif_leads: {
        bucket: 'gold_plating',
        geoKey: 'mi:zif_lead:0.32:0.45:1.3',
        geoFactory: () => new THREE.BoxGeometry(0.32, 0.45, 1.3),
        records: [],
      },
      cyl_bosses: {
        bucket: 'matte_chassis',
        geoKey: `mi:unit_cyl:r${cfg.radialSegments}`,
        geoFactory: () => new THREE.CylinderGeometry(1.0, 1.0, 1.0, cfg.radialSegments),
        records: [],
      },
      torus_seals: {
        bucket: 'torus_seal',
        geoKey: `mi:unit_torus:t${cfg.torusTubularSegments}`,
        geoFactory: () => {
          const g = new THREE.TorusGeometry(1.0, 0.24, Math.max(6, Math.round(cfg.radialSegments * 0.6)), cfg.torusTubularSegments);
          g.rotateX(Math.PI * 0.5);
          return g;
        },
        records: [],
      },
      smd_blocks: {
        bucket: 'matte_chassis',
        geoKey: 'mi:unit_box:1:1:1',
        geoFactory: () => new THREE.BoxGeometry(1, 1, 1),
        records: [],
      },
      choke_windings: {
        bucket: 'copper_coil',
        geoKey: `mi:choke_winding:r${Math.max(8, cfg.radialSegments - 4)}`,
        geoFactory: () => {
          const g = new THREE.CylinderGeometry(0.65, 0.65, 2.7, Math.max(8, cfg.radialSegments - 4));
          g.rotateZ(Math.PI * 0.5);
          return g;
        },
        records: [],
      },
    };

    const pIdx = (id: string): number => {
      const idx = this.partIdToIdx.get(id);
      if (idx === undefined) throw new Error(`Unknown MI Shoe part id: ${id}`);
      return idx;
    };

    const expandPartBoxPoint = (
      partIndex: number,
      cx: number,
      cy: number,
      cz: number,
      hx: number,
      hy: number,
      hz: number
    ): void => {
      const box = partLocalBoxes[partIndex];
      box.min.x = Math.min(box.min.x, cx - hx);
      box.min.y = Math.min(box.min.y, cy - hy);
      box.min.z = Math.min(box.min.z, cz - hz);
      box.max.x = Math.max(box.max.x, cx + hx);
      box.max.y = Math.max(box.max.y, cy + hy);
      box.max.z = Math.max(box.max.z, cz + hz);
    };

    const addBatchedPiece = (
      partId: string,
      bucket: MaterialBucketKey,
      colorHex: number,
      geo: THREE.BufferGeometry,
      includeInEdges = true
    ): void => {
      const idx = pIdx(partId);
      geo.computeBoundingBox();
      if (geo.boundingBox) {
        partLocalBoxes[idx].union(geo.boundingBox);
      }
      batchedPieces.push({ partIdx: idx, partId, bucket, colorHex, geometry: geo });
      if (includeInEdges) {
        let list = edgeSourceByPart.get(idx);
        if (!list) {
          list = [];
          edgeSourceByPart.set(idx, list);
        }
        list.push(geo);
      }
    };

    const addInst = (
      poolName: keyof typeof instPoolsDraft,
      partId: string,
      localPos: [number, number, number],
      localRot: [number, number, number],
      localScale: [number, number, number],
      colorHex: number,
      halfExtents: [number, number, number]
    ): void => {
      const idx = pIdx(partId);
      instPoolsDraft[poolName].records.push({
        partIdx: idx,
        partId,
        localPos,
        localRot,
        localScale,
        colorHex,
      });
      expandPartBoxPoint(
        idx,
        localPos[0],
        localPos[1],
        localPos[2],
        halfExtents[0],
        halfExtents[1],
        halfExtents[2]
      );
    };

    const pushPrecisionScrewInstances = (
      partId: string,
      ox: number,
      oy: number,
      oz: number,
      inverted: boolean,
      headR: number,
      headH: number,
      shankR: number,
      shankL: number,
      headColor: number,
      shankColor: number
    ): void => {
      const dir = inverted ? -1 : 1;
      const rotX = inverted ? Math.PI : 0;
      addInst(
        'screw_heads',
        partId,
        [ox, oy + dir * headH * 0.5, oz],
        [rotX, 0, 0],
        [headR, headH, headR],
        headColor,
        [headR, headH * 0.5, headR]
      );
      addInst(
        'screw_shanks',
        partId,
        [ox, oy - dir * shankL * 0.5, oz],
        [rotX, 0, 0],
        [shankR, shankL, shankR],
        shankColor,
        [shankR, shankL * 0.5, shankR]
      );
      addInst(
        'screw_slots',
        partId,
        [ox, oy + dir * (headH + 0.02), oz],
        [0, 0, 0],
        [headR * 1.15, 0.14, headR * 0.28],
        0x1e293b,
        [headR * 0.6, 0.1, headR * 0.2]
      );
      addInst(
        'screw_slots',
        partId,
        [ox, oy + dir * (headH + 0.02), oz],
        [0, 0, 0],
        [headR * 0.28, 0.14, headR * 1.15],
        0x1e293b,
        [headR * 0.2, 0.1, headR * 0.6]
      );
    };

    // =========================================================================
    // Time-Sliced Construction Chunks (8ms Frame Budget per Slice!)
    // =========================================================================
    const buildChunks: Array<() => void> = [
      // Chunk 1: MI01 (Shoe Cap) & MI02 (WP Silicone Skirt)
      () => {
        const cs = cfg.curveSegments;
        // MI01
        const capPieces = [
          makeHorizPlateGeo(createRoundedRectShape(43.2, 41.0, 2.6), 1.45, cs, 0.14, 0, 1.3, -1.2),
          makeTransformedGeo(new THREE.BoxGeometry(28.4, 0.9, 32.0), 0, 0.65, -2.0),
          makeTransformedGeo(new THREE.BoxGeometry(38.0, 2.3, 1.6), 0, 0.6, 17.5),
        ];
        const capMerged = mergeGeometries(capPieces, false)!;
        for (const g of capPieces) g.dispose();
        addBatchedPiece('mi-shoe-cap-875', 'matte_chassis', 0x202328, capMerged);
        addBatchedPiece(
          'mi-shoe-cap-875',
          'matte_chassis',
          0x1d2026,
          makeHorizPlateGeo(createRoundedRectShape(42.2, 34.0, 1.6), 1.15, cs, 0.08, 0, 0, -2.0)
        );
        for (let i = 0; i < 5; i++) {
          addInst(
            'smd_blocks',
            'mi-shoe-cap-875',
            [0, 2.1, -14.5 - i * 1.45],
            [0, 0, 0],
            [30.0, 0.28, 0.65],
            0x262930,
            [15.0, 0.15, 0.35]
          );
        }

        // MI02
        addBatchedPiece(
          'mi-accessory-wp-skirt',
          'elastomer_rubber',
          0x353840,
          makeHorizPlateGeo(createFrameShape(56.4, 51.0, 4.8, 49.4, 43.8, 3.0), 1.6, cs, 0.16, 0, 0, 0)
        );
        addBatchedPiece(
          'mi-accessory-wp-skirt',
          'elastomer_rubber',
          0x2b2624,
          makeHorizPlateGeo(createFrameShape(59.0, 53.6, 5.4, 55.2, 49.8, 4.4), 0.85, cs, 0.12, 0, -0.95, 0)
        );
        addBatchedPiece(
          'mi-accessory-wp-skirt',
          'elastomer_rubber',
          0x262930,
          makeHorizPlateGeo(createFrameShape(52.0, 46.8, 3.8, 46.0, 40.8, 2.4), 0.7, cs, 0.08, 0, 0.95, 0)
        );
      },

      // Chunk 2: MI03 (ISO 518 Stainless U-Rail Shell), MI04 (3-Point Lock Recesses), MI05 (Screw Cover)
      () => {
        const cs = cfg.curveSegments;
        const WALL_H = 4.6;
        const RAIL_T = 1.35;
        const lipW = (OUTER_W - THROAT_W) * 0.5;

        // MI03: merge same-color flange pieces & machined stainless rails with BufferGeometryUtils.mergeGeometries!
        const flangePieces = [
          makeHorizPlateGeo(createFrameShape(OUTER_W, RAIL_L, 2.4, 34.0, 31.0, 1.4), 1.1, cs, 0.08, 0, -1.65, 0),
          makeTransformedGeo(new THREE.BoxGeometry(2.6, WALL_H, RAIL_L - 1.2), -(OUTER_W * 0.5 - 1.3), 0.7, 0),
          makeTransformedGeo(new THREE.BoxGeometry(2.6, WALL_H, RAIL_L - 1.2), OUTER_W * 0.5 - 1.3, 0.7, 0),
          makeTransformedGeo(new THREE.BoxGeometry(OUTER_W - 2.0, WALL_H, 2.0), 0, 0.7, RAIL_L * 0.5 - 1.0),
        ];
        const flangeMerged = mergeGeometries(flangePieces, false)!;
        for (const g of flangePieces) g.dispose();
        addBatchedPiece('mi-shoe-shell-plate', 'metal_hero', 0xd8dee6, flangeMerged);

        const railPieces = [
          makeTransformedGeo(new THREE.BoxGeometry(lipW, RAIL_T, RAIL_L - 1.2), -(OUTER_W * 0.5 - lipW * 0.5), WALL_H * 0.5 + 0.5, 0),
          makeTransformedGeo(new THREE.BoxGeometry(lipW, RAIL_T, RAIL_L - 1.2), OUTER_W * 0.5 - lipW * 0.5, WALL_H * 0.5 + 0.5, 0),
          makeTransformedGeo(new THREE.BoxGeometry(lipW * 0.75, RAIL_T * 0.75, 2.2), -(OUTER_W * 0.5 - lipW * 0.55), WALL_H * 0.5 + 0.5, -RAIL_L * 0.5 - 0.3, 0, -0.18, 0),
          makeTransformedGeo(new THREE.BoxGeometry(lipW * 0.75, RAIL_T * 0.75, 2.2), OUTER_W * 0.5 - lipW * 0.55, WALL_H * 0.5 + 0.5, -RAIL_L * 0.5 - 0.3, 0, 0.18, 0),
          makeHorizPlateGeo(createRoundedRectShape(OUTER_W, 10.6, 2.0), RAIL_T, cs, 0.08, 0, WALL_H * 0.5 + 0.5, RAIL_L * 0.5 - 5.1),
        ];
        const railMerged = mergeGeometries(railPieces, false)!;
        for (const g of railPieces) g.dispose();
        addBatchedPiece('mi-shoe-shell-plate', 'metal_hero', 0x98a2b0, railMerged);

        // MI04: Lock-pin recesses & front datum stopper
        const lockPts: Array<[number, number, number]> = [
          [0, -13.5, 2.2],
          [-15.2, 6.2, 1.85],
          [15.2, 6.2, 1.85],
        ];
        for (const [lx, lz, r] of lockPts) {
          addInst('torus_seals', 'mi-lock-pin-recesses', [lx, 0, lz], [0, 0, 0], [r, r, r], 0xaab4c0, [r + 0.55, 0.6, r + 0.55]);
          addInst('cyl_bosses', 'mi-lock-pin-recesses', [lx, -0.25, lz], [0, 0, 0], [r * 0.78, 0.65, r * 0.78], 0x202328, [r * 0.8, 0.4, r * 0.8]);
        }
        const stopperPieces = [
          makeTransformedGeo(new THREE.BoxGeometry(36.0, 1.4, 2.2), 0, 0.5, 13.8),
          makeTransformedGeo(new THREE.BoxGeometry(2.4, 1.6, 4.2), -19.2, 0.6, 12.2),
          makeTransformedGeo(new THREE.BoxGeometry(2.4, 1.6, 4.2), 19.2, 0.6, 12.2),
        ];
        const stopperMerged = mergeGeometries(stopperPieces, false)!;
        for (const g of stopperPieces) g.dispose();
        addBatchedPiece('mi-lock-pin-recesses', 'metal_hero', 0xb6c0cc, stopperMerged);

        // MI05: Screw cover plate
        const coverPieces = [
          makeHorizPlateGeo(createFrameShape(33.4, 27.6, 1.8, 12.2, 12.2, 6.0), 0.72, cs, 0.06, 0, 0, 0),
          makeHorizPlateGeo(createRoundedRectShape(12.0, 5.2, 1.2), 0.72, cs, 0.05, 0, 0, -15.4),
        ];
        const coverMerged = mergeGeometries(coverPieces, false)!;
        for (const g of coverPieces) g.dispose();
        addBatchedPiece('mi-shoe-screw-cover', 'matte_chassis', 0x202328, coverMerged);
        for (const hx of [-11.5, 11.5]) {
          addInst('smd_blocks', 'mi-shoe-screw-cover', [hx, -0.1, 14.8], [0, 0, 0], [5.2, 0.55, 2.6], 0x98a2b0, [2.6, 0.3, 1.3]);
        }
      },

      // Chunk 3: MI06, MI07, MI08, MI09, MI10 (Screws, Spring Plate, ISO Ground Rails, Center X-Sync Dome)
      () => {
        const cs = cfg.curveSegments;
        const rs = cfg.radialSegments;
        const ss = cfg.sphereSegments;

        // MI06: M1.4 Europe Micro Cover Screw (Instanced!)
        pushPrecisionScrewInstances('mi-m14-europe-screw', 0, 0, 0, false, 1.75, 0.55, 0.88, 2.4, 0x202328, 0x98a2b0);

        // MI07: Dual-wing anti-rattle spring plate
        addBatchedPiece(
          'mi-shoe-spring-plate',
          'metal_hero',
          0xc98a3c,
          makeHorizPlateGeo(createFrameShape(31.0, 24.0, 1.6, 16.0, 14.0, 3.0), 0.52, cs, 0.04, 0, 0, 0)
        );
        const wingPieces: THREE.BufferGeometry[] = [];
        for (const side of [-1, 1]) {
          wingPieces.push(makeTransformedGeo(new THREE.BoxGeometry(4.6, 0.48, 17.5), side * 12.2, 1.05, -1.2, -0.11, 0, 0));
          wingPieces.push(makeTransformedGeo(new THREE.CylinderGeometry(1.1, 1.1, 4.6, rs), side * 12.2, 1.85, -9.2, 0, 0, Math.PI * 0.5));
        }
        const wingsMerged = mergeGeometries(wingPieces, false)!;
        for (const g of wingPieces) g.dispose();
        addBatchedPiece('mi-shoe-spring-plate', 'metal_hero', 0xd89143, wingsMerged);

        // MI08: 4x M1.7 Clamping Screws (Instanced!)
        const screwCoords: Array<[number, number]> = [
          [-14.6, -12.6],
          [14.6, -12.6],
          [-14.6, 9.6],
          [14.6, 9.6],
        ];
        for (const [sx, sz] of screwCoords) {
          pushPrecisionScrewInstances('mi-special-head-screws', sx, 0, sz, false, 2.35, 0.72, 1.18, 6.2, 0xb6c0cc, 0x98a2b0);
        }

        // MI09: ISO 518 Frame Ground Contact Rails
        const silverRails = [
          makeTransformedGeo(new THREE.BoxGeometry(1.5, 1.6, 35.0), -(INNER_W * 0.5 - 0.2), 0.7, -1.5),
          makeTransformedGeo(new THREE.BoxGeometry(1.5, 1.6, 35.0), INNER_W * 0.5 - 0.2, 0.7, -1.5),
          makeTransformedGeo(new THREE.BoxGeometry(INNER_W - 1.0, 0.45, 2.2), 0, -1.8, -18.2),
        ];
        const silverMerged = mergeGeometries(silverRails, false)!;
        for (const g of silverRails) g.dispose();
        addBatchedPiece('mi-frame-ground-rails', 'metal_hero', 0xb6c0cc, silverMerged);

        const copperTabs = [
          makeTransformedGeo(new THREE.BoxGeometry(2.2, 3.6, 6.0), -(INNER_W * 0.5 - 0.5), -1.6, -12.0),
          makeTransformedGeo(new THREE.BoxGeometry(2.2, 3.6, 6.0), INNER_W * 0.5 - 0.5, -1.6, -12.0),
        ];
        const copperMerged = mergeGeometries(copperTabs, false)!;
        for (const g of copperTabs) g.dispose();
        addBatchedPiece('mi-frame-ground-rails', 'metal_hero', 0xd07447, copperMerged);

        // MI10: Center ISO 518 X-Sync Contact Dome
        addBatchedPiece(
          'mi-center-xsync-contact',
          'matte_chassis',
          0x272a33,
          makeTransformedGeo(new THREE.CylinderGeometry(5.3, 5.5, 1.15, rs))
        );
        const xsyncGoldPieces = [
          makeTransformedGeo(new THREE.CylinderGeometry(3.8, 3.9, 1.35, rs), 0, 0.22, 0),
          makeTransformedGeo(
            new THREE.SphereGeometry(3.8, ss, Math.max(6, Math.round(ss * 0.5)), 0, Math.PI * 2, 0, Math.PI * 0.28),
            0,
            0.85,
            0,
            0,
            0,
            0,
            1,
            0.35,
            1
          ),
          makeTransformedGeo(new THREE.CylinderGeometry(1.15, 1.0, 2.2, Math.max(8, rs - 4)), 0, -1.3, 0),
        ];
        const xsyncGoldMerged = mergeGeometries(xsyncGoldPieces, false)!;
        for (const g of xsyncGoldPieces) g.dispose();
        addBatchedPiece('mi-center-xsync-contact', 'metal_hero', 0xe2b648, xsyncGoldMerged);
      },

      // Chunk 4: MI11 (21-Pin Shroud + 22 Comb Teeth) & MI12–MI20 (All 21 Hidden Front Electronic Pins -> InstancedMesh!)
      () => {
        const cs = cfg.curveSegments;
        // MI11: Shroud housing + guide ears + 22 instanced LCP comb teeth
        const shroudPieces = [
          makeHorizPlateGeo(createRoundedRectShape(40.2, 6.2, 1.0), 3.6, cs, 0.08, 0, 0, 0),
          makeTransformedGeo(new THREE.BoxGeometry(1.8, 3.4, 5.2), -19.8, 0, -1.2),
          makeTransformedGeo(new THREE.BoxGeometry(1.8, 3.4, 5.2), 19.8, 0, -1.2),
        ];
        const shroudMerged = mergeGeometries(shroudPieces, false)!;
        for (const g of shroudPieces) g.dispose();
        addBatchedPiece('mi-front-21pin-shroud', 'matte_chassis', 0x272a33, shroudMerged);

        for (let i = 0; i < 22; i++) {
          addInst(
            'comb_teeth',
            'mi-front-21pin-shroud',
            [pinX(1) - PIN_PITCH * 0.5 + i * PIN_PITCH, 0.2, -1.6],
            [0, 0, 0],
            [1, 1, 1],
            0x202328,
            [0.25, 1.25, 2.35]
          );
        }

        // MI12–MI20: All 9 functional pin groups across all 21 hidden front pins -> unified InstancedMesh pools!
        const pinGroups: Array<{ id: string; pins: number[]; accentColor: number; widePower?: boolean }> = [
          { id: 'mi-pins-1to3-id', pins: [1, 2, 3], accentColor: 0x2ca861 },
          { id: 'mi-pins-4to6-analog-mic', pins: [4, 5, 6], accentColor: 0xe3a82b },
          { id: 'mi-pins-7-15-reg-gnd', pins: [7, 15], accentColor: 0xb6c0cc },
          { id: 'mi-pins-8to12-digital-audio', pins: [8, 9, 10, 11, 12], accentColor: 0x38bdf8 },
          { id: 'mi-pin-13-logic-vdd', pins: [13], accentColor: 0x2a6ee0 },
          { id: 'mi-pins-14-16-aux-audio', pins: [14, 16], accentColor: 0x14b8a6 },
          { id: 'mi-pin-17-unreg-power', pins: [17], accentColor: 0xea580c, widePower: true },
          { id: 'mi-pins-18to20-ttl-flash', pins: [18, 19, 20], accentColor: 0xdc2626 },
          { id: 'mi-pin-21-pgnd-detect', pins: [21], accentColor: 0x3a3f4a, widePower: true },
        ];

        for (const pg of pinGroups) {
          const pw = pg.widePower ? 1.12 : 0.86;
          for (const pNum of pg.pins) {
            const x = pinX(pNum);
            addInst('front_pin_blades', pg.id, [x, 0.25, -0.4], [0, 0, 0], [pw, 0.58, 5.4], 0xe2b648, [pw * 0.55, 0.35, 2.75]);
            addInst('front_pin_badges', pg.id, [x, -0.15, 2.4], [0, 0, 0], [pw * 1.15, 0.95, 2.2], pg.accentColor, [pw * 0.65, 0.55, 1.15]);
            addInst('front_pin_tails', pg.id, [x, -0.9, 3.1], [0, 0, 0], [pw * 0.8, 1.5, 0.7], 0xe2b648, [pw * 0.45, 0.8, 0.4]);
          }
          if (pg.pins.length >= 2) {
            const minX = pinX(Math.min(...pg.pins));
            const maxX = pinX(Math.max(...pg.pins));
            const span = maxX - minX + 1.1;
            addInst(
              'front_pin_badges',
              pg.id,
              [(minX + maxX) * 0.5, -0.5, 2.75],
              [0, 0, 0],
              [span, 0.34, 0.65],
              pg.accentColor,
              [span * 0.5, 0.2, 0.35]
            );
          }
        }
      },

      // Chunk 5: MI21 (21-Ch Cantilever Beams), MI22 (MIS-2006 FPC), MI23 (WP Rubber)
      () => {
        const cs = cfg.curveSegments;
        // MI21: 21 cantilever beams + 21 tips (Instanced!) + carrier bar
        for (let i = 0; i < 21; i++) {
          const x = pinX(i + 1);
          addInst('cantilever_beams', 'mi-cantilever-gold-beams', [x, 0.15, 0], [0.18, 0, 0], [1, 1, 1], 0xd89143, [0.4, 0.35, 2.25]);
          addInst('cantilever_tips', 'mi-cantilever-gold-beams', [x, 0.56, -1.9], [0, 0, 0], [1, 1, 1], 0xe2b648, [0.4, 0.4, 0.4]);
        }
        addBatchedPiece(
          'mi-cantilever-gold-beams',
          'matte_chassis',
          0xece7dc,
          makeTransformedGeo(new THREE.BoxGeometry(37.6, 0.65, 1.4), 0, -0.25, 2.1)
        );

        // MI22: MIS-2006 Flexible Circuit Board
        const fpcPieces = [
          makeHorizPlateGeo(createRoundedRectShape(41.0, 36.0, 2.0), 0.42, cs, 0.03, 0, 0, 0),
          makeTransformedGeo(new THREE.BoxGeometry(16.0, 10.6, 0.45), 0, -5.2, 8.8),
          makeTransformedGeo(new THREE.BoxGeometry(16.0, 0.42, 4.2), 0, -10.4, 10.6),
        ];
        const fpcMerged = mergeGeometries(fpcPieces, false)!;
        for (const g of fpcPieces) g.dispose();
        addBatchedPiece('mi-mis2006-flex-board', 'silicon_hero', 0xc76414, fpcMerged);
        addBatchedPiece(
          'mi-mis2006-flex-board',
          'metal_hero',
          0x98a2b0,
          makeHorizPlateGeo(createRoundedRectShape(38.0, 9.0, 0.8), 0.35, cs, 0.02, 0, -0.35, 12.8)
        );
        addBatchedPiece(
          'mi-mis2006-flex-board',
          'metal_hero',
          0xe2b648,
          makeTransformedGeo(new THREE.BoxGeometry(14.6, 0.14, 2.4), 0, -10.16, 11.4),
          false
        );
        for (let i = -7; i <= 7; i++) {
          addInst('fpc_traces', 'mi-mis2006-flex-board', [i * 2.1, 0.24, 2.5], [0, 0, 0], [1, 1, 1], 0xe2b648, [0.2, 0.06, 11.0]);
        }

        // MI23: WP Rubber + 4 instanced O-ring grommet bosses
        addBatchedPiece(
          'mi-fpc-wp-rubber',
          'elastomer_rubber',
          0x353840,
          makeHorizPlateGeo(createFrameShape(49.0, 42.5, 2.6, 18.0, 5.0, 1.2), 1.15, cs, 0.1, 0, 0, 0)
        );
        addBatchedPiece(
          'mi-fpc-wp-rubber',
          'elastomer_rubber',
          0xc44536,
          makeHorizPlateGeo(createFrameShape(46.0, 39.5, 2.2, 43.2, 36.7, 1.8), 0.48, cs, 0.06, 0, 0.65, 0)
        );
        for (const [bx, bz] of [
          [-14.6, -12.6],
          [14.6, -12.6],
          [-14.6, 9.6],
          [14.6, 9.6],
        ] as Array<[number, number]>) {
          addInst('torus_seals', 'mi-fpc-wp-rubber', [bx, 0.65, bz], [0, 0, 0], [2.4, 2.4, 2.4], 0xc44536, [3.0, 0.65, 3.0]);
        }
      },

      // Chunk 6: MI24 (Magnesium Top-Deck Seat), MI25 (Under-Deck Fix Plate), MI26 (Under-Deck Tie Screws)
      () => {
        const cs = cfg.curveSegments;
        // MI24
        addBatchedPiece(
          'mi-top-deck-boss-seat',
          'matte_chassis',
          0x2c323d,
          makeHorizPlateGeo(createFrameShape(62.0, 54.0, 5.0, 18.2, 4.8, 1.0), 2.3, cs, 0.16, 0, 0, 0)
        );
        const mgRimPieces = [
          makeHorizPlateGeo(createFrameShape(55.0, 47.6, 3.6, 50.8, 43.4, 2.8), 0.75, cs, 0.08, 0, 1.25, 0),
          makeHorizPlateGeo(createFrameShape(21.6, 7.6, 1.4, 18.2, 4.6, 0.9), 1.1, cs, 0.06, 0, 1.35, 8.8),
        ];
        const mgRimMerged = mergeGeometries(mgRimPieces, false)!;
        for (const g of mgRimPieces) g.dispose();
        addBatchedPiece('mi-top-deck-boss-seat', 'metal_hero', 0x7c8694, mgRimMerged);
        for (const [bx, bz] of [
          [-14.6, -12.6],
          [14.6, -12.6],
          [-14.6, 9.6],
          [14.6, 9.6],
        ] as Array<[number, number]>) {
          addInst('cyl_bosses', 'mi-top-deck-boss-seat', [bx, 0.2, bz], [0, 0, 0], [2.8, 2.6, 2.8], 0x7c8694, [3.0, 1.35, 3.0]);
        }

        // MI25
        addBatchedPiece(
          'mi-shoe-fix-plate',
          'metal_hero',
          0x98a2b0,
          makeHorizPlateGeo(createFrameShape(47.6, 40.4, 2.2, 18.4, 5.4, 1.0), 1.25, cs, 0.08, 0, 0, 0)
        );
        const fixWings = [
          makeTransformedGeo(new THREE.BoxGeometry(5.6, 1.15, 22.0), -25.5, 0, -2.0),
          makeTransformedGeo(new THREE.BoxGeometry(5.6, 1.15, 22.0), 25.5, 0, -2.0),
        ];
        const fixWingsMerged = mergeGeometries(fixWings, false)!;
        for (const g of fixWings) g.dispose();
        addBatchedPiece('mi-shoe-fix-plate', 'metal_hero', 0xd8dee6, fixWingsMerged);
        for (const [bx, bz] of [
          [-14.6, -12.6],
          [14.6, -12.6],
          [-14.6, 9.6],
          [14.6, 9.6],
        ] as Array<[number, number]>) {
          addInst('cyl_bosses', 'mi-shoe-fix-plate', [bx, -0.5, bz], [0, 0, 0], [2.5, 2.2, 2.5], 0xaab4c0, [2.6, 1.15, 2.6]);
        }

        // MI26: 4 under-deck inverted tie & grounding screws (Instanced!)
        for (const sx of [-25.5, 25.5]) {
          pushPrecisionScrewInstances('mi-underdeck-tie-screws', sx, 0, -8.5, true, 2.2, 0.75, 1.1, 7.6, 0xd4a948, 0x98a2b0);
          pushPrecisionScrewInstances('mi-underdeck-tie-screws', sx, 0.4, 4.5, true, 2.0, 0.65, 1.0, 4.5, 0xb6c0cc, 0x98a2b0);
        }
      },

      // Chunk 7: MI27–MI30 (ESD/TVS, IGBT Opto-Isolator, ID Resistor ADC Net, Audio Mux & EMI Chokes)
      () => {
        const cs = cfg.curveSegments;
        // MI27
        addBatchedPiece(
          'mi-esd-tvs-protection',
          'pcb_textured',
          0xffffff,
          makeHorizPlateGeo(createRoundedRectShape(16.0, 12.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
        );
        for (let i = -1; i <= 1; i++) {
          addInst('smd_blocks', 'mi-esd-tvs-protection', [i * 4.6, 0.78, 2.2], [0, 0, 0], [3.8, 0.85, 2.2], 0x1d2026, [1.95, 0.45, 1.15]);
        }
        addBatchedPiece(
          'mi-esd-tvs-protection',
          'matte_chassis',
          0xece7dc,
          makeTransformedGeo(new THREE.BoxGeometry(5.6, 1.25, 2.6), -2.5, 0.95, -2.5)
        );
        for (const fx of [-5.0, 0.0]) {
          addInst('smd_blocks', 'mi-esd-tvs-protection', [fx, 0.95, -2.5], [0, 0, 0], [1.1, 1.32, 2.7], 0xe2b648, [0.6, 0.7, 1.4]);
        }
        addBatchedPiece(
          'mi-esd-tvs-protection',
          'silicon_hero',
          0x4f74a8,
          makeTransformedGeo(new THREE.BoxGeometry(3.8, 0.95, 3.4), 4.5, 0.82, -2.4)
        );

        // MI28
        addBatchedPiece(
          'mi-xsync-igbt-isolator',
          'pcb_textured',
          0xffffff,
          makeHorizPlateGeo(createRoundedRectShape(16.0, 12.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
        );
        addBatchedPiece(
          'mi-xsync-igbt-isolator',
          'matte_chassis',
          0x1d2026,
          makeTransformedGeo(new THREE.BoxGeometry(5.8, 1.55, 4.8), -2.2, 1.1, 0.5)
        );
        addBatchedPiece(
          'mi-xsync-igbt-isolator',
          'metal_hero',
          0xd07447,
          makeTransformedGeo(new THREE.BoxGeometry(5.6, 0.45, 2.0), -2.2, 0.6, 3.6)
        );
        addBatchedPiece(
          'mi-xsync-igbt-isolator',
          'matte_chassis',
          0xe5e7eb,
          makeTransformedGeo(new THREE.BoxGeometry(4.2, 1.4, 3.6), 4.2, 1.05, -0.5)
        );
        addBatchedPiece(
          'mi-xsync-igbt-isolator',
          'silicon_hero',
          0xdc2626,
          makeTransformedGeo(new THREE.BoxGeometry(2.6, 1.0, 1.8), 4.2, 0.85, 3.2)
        );

        // MI29
        addBatchedPiece(
          'mi-id-resistor-adc-net',
          'pcb_textured',
          0xffffff,
          makeHorizPlateGeo(createRoundedRectShape(16.0, 12.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
        );
        for (let i = -1; i <= 1; i++) {
          addInst('smd_blocks', 'mi-id-resistor-adc-net', [-3.8, 0.72, i * 2.8], [0, 0, 0], [3.2, 0.72, 1.6], 0x2a6ee0, [1.65, 0.4, 0.85]);
          addInst('smd_blocks', 'mi-id-resistor-adc-net', [-0.2, 0.7, i * 2.8], [0, 0, 0], [1.6, 0.68, 1.2], 0x9c7b58, [0.85, 0.38, 0.65]);
        }
        addBatchedPiece(
          'mi-id-resistor-adc-net',
          'silicon_hero',
          0x486e9e,
          makeTransformedGeo(new THREE.BoxGeometry(5.2, 1.15, 5.2), 4.2, 0.92, 0)
        );

        // MI30
        addBatchedPiece(
          'mi-audio-mux-emi-choke',
          'pcb_textured',
          0xffffff,
          makeHorizPlateGeo(createRoundedRectShape(16.0, 12.0, 1.0), 0.75, cs, 0.04, 0, 0, 0)
        );
        addBatchedPiece(
          'mi-audio-mux-emi-choke',
          'silicon_hero',
          0x38bdf8,
          makeTransformedGeo(new THREE.BoxGeometry(5.0, 1.05, 5.0), -3.2, 0.88, 0.5)
        );
        for (let i = 0; i < 4; i++) {
          const cz = -3.6 + i * 2.4;
          addInst('smd_blocks', 'mi-audio-mux-emi-choke', [3.8, 1.02, cz], [0, 0, 0], [2.6, 1.35, 1.9], 0x3a3f4a, [1.35, 0.7, 1.0]);
          addInst('choke_windings', 'mi-audio-mux-emi-choke', [3.8, 1.08, cz], [0, 0, 0], [1, 1, 1], 0xd97d4e, [1.4, 0.7, 0.7]);
        }
      },

      // Chunk 8: MI31 (Copper EMI Shield Bridge) & MI32 (Mainboard 24-Pin ZIF Connector + 24 Gold Leads)
      () => {
        const cs = cfg.curveSegments;
        // MI31
        addBatchedPiece(
          'mi-emi-copper-shield',
          'metal_hero',
          0xd97d4e,
          makeHorizPlateGeo(createFrameShape(44.0, 32.0, 2.0, 17.6, 6.2, 1.0), 0.32, cs, 0.02, 0, 0, 0)
        );
        const foamPieces = [
          makeTransformedGeo(new THREE.BoxGeometry(4.0, 1.5, 24.0), -19.5, 0.75, -1.0),
          makeTransformedGeo(new THREE.BoxGeometry(4.0, 1.5, 24.0), 19.5, 0.75, -1.0),
        ];
        const foamMerged = mergeGeometries(foamPieces, false)!;
        for (const g of foamPieces) g.dispose();
        addBatchedPiece('mi-emi-copper-shield', 'elastomer_rubber', 0x8e99a8, foamMerged);

        // MI32
        addBatchedPiece(
          'mi-mainboard-zif-connector',
          'pcb_textured',
          0xffffff,
          makeHorizPlateGeo(createRoundedRectShape(34.0, 16.0, 1.6), 1.1, cs, 0.06, 0, 0, 0)
        );
        addBatchedPiece(
          'mi-mainboard-zif-connector',
          'matte_chassis',
          0xece7dc,
          makeTransformedGeo(new THREE.BoxGeometry(18.6, 1.85, 5.2), 0, 1.45, 0)
        );
        addBatchedPiece(
          'mi-mainboard-zif-connector',
          'matte_chassis',
          0x202328,
          makeTransformedGeo(new THREE.BoxGeometry(17.6, 0.65, 2.4), 0, 2.45, 1.4)
        );
        for (let i = 0; i < 24; i++) {
          addInst('zif_leads', 'mi-mainboard-zif-connector', [-8.05 + i * 0.7, 0.75, -2.9], [0, 0, 0], [1, 1, 1], 0xe2b648, [0.2, 0.28, 0.7]);
        }
        for (const sx of [-10.0, 10.0]) {
          addInst('smd_blocks', 'mi-mainboard-zif-connector', [sx, 1.1, 0], [0, 0, 0], [1.6, 1.2, 4.4], 0xd9e0e8, [0.85, 0.65, 2.25]);
        }
      },
    ];

    // Execute all geometry build chunks within an 8ms per-frame time slice budget!
    let maxChunkMs = 0;
    let sliceStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const totalSteps = buildChunks.length + 2;

    for (let ci = 0; ci < buildChunks.length; ci++) {
      if (isAborted()) {
        for (const bp of batchedPieces) bp.geometry.dispose();
        this.dispose(cache);
        throw new Error('MiShoeUnit build aborted');
      }
      const cStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
      buildChunks[ci]();
      const cNow = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const cDur = cNow - cStart;
      if (cDur > maxChunkMs) maxChunkMs = cDur;

      options.onChunkProgress?.(ci + 1, totalSteps);
      if (!synchronous && cNow - sliceStart >= frameBudgetMs) {
        await yieldNextFrame();
        sliceStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
      }
    }

    if (isAborted()) {
      for (const bp of batchedPieces) bp.geometry.dispose();
      this.dispose(cache);
      throw new Error('MiShoeUnit build aborted');
    }

    // =========================================================================
    // Commit Chunk A: Assemble Tier-1 InstancedMeshes + Tier-2 BatchedMeshes
    // =========================================================================
    const commitStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const bindings: RaycastMeshBinding[] = [];
    const registeredPartIds = new Set<string>();
    let estimatedTriangles = 0;
    let totalInstances = 0;
    let totalBatchedItems = 0;

    // Build all Tier-1 InstancedMeshes with instanceId -> partId reverse lookup
    this.instancedPools = [];
    for (const [poolId, draft] of Object.entries(instPoolsDraft)) {
      const count = draft.records.length;
      if (count === 0) continue;

      const geo = cache.acquireGeometry(draft.geoKey, draft.geoFactory);
      const mat = cache.acquireMaterial(draft.bucket, quality, 'solid', this.clippingPlanes);
      const mesh = new THREE.InstancedMesh(geo, mat, count);
      mesh.name = `mishoe-inst-${poolId}`;
      mesh.frustumCulled = false;
      mesh.boundingBox = new THREE.Box3();
      mesh.boundingSphere = new THREE.Sphere();
      setNodeStaticMatrix(mesh);

      const partIndices = new Int32Array(count);
      const instanceIdToPartId = new Array<string>(count);
      const localPos = new Float32Array(count * 3);
      const localQuat = new Float32Array(count * 4);
      const localScale = new Float32Array(count * 3);
      const baseColors = new Uint32Array(count);

      const bindingIndex = bindings.length;
      const eulerScratch = new THREE.Euler();

      for (let i = 0; i < count; i++) {
        const r = draft.records[i];
        partIndices[i] = r.partIdx;
        instanceIdToPartId[i] = r.partId;
        registeredPartIds.add(r.partId);
        partBindingIndexSets[r.partIdx].add(bindingIndex);

        const p3 = i * 3;
        localPos[p3] = r.localPos[0];
        localPos[p3 + 1] = r.localPos[1];
        localPos[p3 + 2] = r.localPos[2];

        eulerScratch.set(r.localRot[0], r.localRot[1], r.localRot[2]);
        _tmpQuat.setFromEuler(eulerScratch);
        const q4 = i * 4;
        localQuat[q4] = _tmpQuat.x;
        localQuat[q4 + 1] = _tmpQuat.y;
        localQuat[q4 + 2] = _tmpQuat.z;
        localQuat[q4 + 3] = _tmpQuat.w;

        localScale[p3] = r.localScale[0];
        localScale[p3 + 1] = r.localScale[1];
        localScale[p3 + 2] = r.localScale[2];

        const liftedHex = liftDarkCadTint(r.colorHex);
        baseColors[i] = liftedHex;
        _tmpColor.setHex(liftedHex);
        mesh.setColorAt(i, _tmpColor);
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      rootGroup.add(mesh);
      const binding: RaycastInstancedBinding = {
        kind: 'instanced',
        mesh,
        instanceIdToPartId,
      };
      bindings.push(binding);

      this.instancedPools.push({
        id: poolId,
        bucket: draft.bucket,
        mesh,
        count,
        partIndices,
        instanceIdToPartId,
        localPos,
        localQuat,
        localScale,
        baseColors,
      });

      totalInstances += count;
      estimatedTriangles += countGeometryTriangles(geo) * count;
    }

    // Build all Tier-2 BatchedMeshes grouped by material bucket
    const piecesByBucket = new Map<MaterialBucketKey, BatchedPieceSpec[]>();
    const partLumaSum = new Float32Array(partCount);
    const partLumaCnt = new Uint16Array(partCount);
    for (let i = 0; i < batchedPieces.length; i++) {
      const bp = batchedPieces[i];
      let arr = piecesByBucket.get(bp.bucket);
      if (!arr) {
        arr = [];
        piecesByBucket.set(bp.bucket, arr);
      }
      arr.push(bp);
    }

    this.batchedPools = [];
    for (const [bucket, list] of piecesByBucket.entries()) {
      let totalVerts = 0;
      for (let i = 0; i < list.length; i++) {
        totalVerts += list[i].geometry.getAttribute('position').count;
      }
      const mat = cache.acquireMaterial(bucket, quality, 'solid', this.clippingPlanes);
      const batchedMesh = new THREE.BatchedMesh(list.length, totalVerts, 0, mat);
      batchedMesh.name = `mishoe-batch-${bucket}`;
      batchedMesh.frustumCulled = false;
      batchedMesh.boundingBox = new THREE.Box3();
      batchedMesh.boundingSphere = new THREE.Sphere();
      setNodeStaticMatrix(batchedMesh);

      const batchIds = new Int32Array(list.length);
      const partIndices = new Int32Array(list.length);
      const batchIdToPartId = new Array<string>(list.length);
      const baseColors = new Uint32Array(list.length);
      const bindingIndex = bindings.length;

      for (let i = 0; i < list.length; i++) {
        const bp = list[i];
        const geoId = batchedMesh.addGeometry(bp.geometry);
        const instId = batchedMesh.addInstance(geoId);
        const liftedHex = liftDarkCadTint(bp.colorHex);
        batchIds[i] = instId;
        partIndices[i] = bp.partIdx;
        batchIdToPartId[instId] = bp.partId;
        baseColors[i] = liftedHex;
        partLumaSum[bp.partIdx] += getCadTintLuma(liftedHex);
        partLumaCnt[bp.partIdx] += 1;
        registeredPartIds.add(bp.partId);
        partBindingIndexSets[bp.partIdx].add(bindingIndex);

        _tmpColor.setHex(liftedHex);
        batchedMesh.setColorAt(instId, _tmpColor);
        estimatedTriangles += Math.floor(bp.geometry.getAttribute('position').count / 3);
      }

      rootGroup.add(batchedMesh);
      const binding: RaycastBatchedBinding = {
        kind: 'batched',
        mesh: batchedMesh,
        batchIdToPartId,
      };
      bindings.push(binding);

      this.batchedPools.push({
        bucket,
        mesh: batchedMesh,
        count: list.length,
        batchIds,
        partIndices,
        batchIdToPartId,
        baseColors,
      });
      totalBatchedItems += list.length;
    }

    const commitNow = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (commitNow - commitStart > maxChunkMs) maxChunkMs = commitNow - commitStart;
    options.onChunkProgress?.(buildChunks.length + 1, totalSteps);
    if (!synchronous && commitNow - sliceStart >= frameBudgetMs) {
      await yieldNextFrame();
      sliceStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
    }

    // =========================================================================
    // Commit Chunk B: Build Cached CAD Edges + V2 Instanced Physics Overlay
    // =========================================================================
    const finalStart = typeof performance !== 'undefined' ? performance.now() : Date.now();

    this.edgeLines = [];
    const edgeGroup = new THREE.Group();
    edgeGroup.name = 'mishoe-v2-edges';
    setNodeStaticMatrix(edgeGroup);

    const thresholdAngle = quality === 'standard' ? 32 : quality === 'high' ? 30 : 26;
    for (let pi = 0; pi < partCount; pi++) {
      const srcGeos = edgeSourceByPart.get(pi);
      if (!srcGeos || srcGeos.length === 0) continue;

      const partId = partMetas[pi].id;
      const edgeGeoKey = `mi:edge:${partId}:${quality}`;
      const edgeGeo = cache.acquireGeometry(edgeGeoKey, () => {
        const mergedSrc = srcGeos.length === 1 ? srcGeos[0] : mergeGeometries(srcGeos, false)!;
        const edges = new THREE.EdgesGeometry(mergedSrc, thresholdAngle);
        if (srcGeos.length > 1) mergedSrc.dispose();
        return edges;
      });

      const avgLuma = partLumaCnt[pi] > 0 ? partLumaSum[pi] / partLumaCnt[pi] : 0.5;
      const isDark = avgLuma < 0.36;
      const matRef = cache.acquireLineMaterial(isDark ? 'mishoe-edge-solid-dark' : 'mishoe-edge-solid', {
        color: isDark ? 0x7a889e : 0x181c24,
        opacity: isDark ? 0.32 : 0.26,
        clippingPlanes: this.clippingPlanes,
      });
      const line = new THREE.LineSegments(edgeGeo, matRef);
      line.name = `mishoe-edge-${partId}`;
      line.position.set(
        this.assembledPosFlat[pi * 3],
        this.assembledPosFlat[pi * 3 + 1],
        this.assembledPosFlat[pi * 3 + 2]
      );
      const isHero = HERO_EDGE_PARTS.has(partId);
      line.visible = cfg.showSolidStructuralEdges && isHero;
      setNodeStaticMatrix(line);
      edgeGroup.add(line);
      this.edgeLines.push({ partIdx: pi, partId, line, isHero, isDark });

      const edgeNow = typeof performance !== 'undefined' ? performance.now() : Date.now();
      if (!synchronous && edgeNow - sliceStart >= frameBudgetMs) {
        if (edgeNow - finalStart > maxChunkMs) maxChunkMs = Math.min(maxChunkMs, edgeNow - sliceStart);
        await yieldNextFrame();
        sliceStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
        if (isAborted()) {
          for (let i = 0; i < batchedPieces.length; i++) batchedPieces[i].geometry.dispose();
          rootGroup.add(edgeGroup);
          this.dispose(cache);
          throw new Error('MiShoeUnit build aborted');
        }
      }
    }
    rootGroup.add(edgeGroup);

    // Dispose all staging temporary geometries now that BatchedMeshes & EdgesGeometries have copied them!
    for (let i = 0; i < batchedPieces.length; i++) {
      batchedPieces[i].geometry.dispose();
    }

    // Build V2 Instanced Physics Overlay & Explode Guides
    this.physicsState = this.buildPhysicsOverlay(cache, cfg.sphereSegments);
    rootGroup.add(this.physicsState.overlayGroup, this.physicsState.explodeGuidesGroup);

    // Build 2-stage Raycast AABB Index (Unit -> 8 Groups -> 32 Parts -> Bindings)
    const partBounds: RaycastPartBounds[] = [];
    const partBoundsById = new Map<string, RaycastPartBounds>();
    const groupPartIndicesMap = new Map<string, number[]>();

    for (let i = 0; i < partCount; i++) {
      const pm = partMetas[i];
      const lb = partLocalBoxes[i];
      if (lb.isEmpty()) {
        lb.set(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1));
      }
      const pb: RaycastPartBounds = {
        partId: pm.id,
        groupKey: pm.groupKey,
        localBox: lb,
        worldBox: new THREE.Box3(),
        bindingIndices: Array.from(partBindingIndexSets[i]),
      };
      partBounds.push(pb);
      partBoundsById.set(pm.id, pb);

      let gList = groupPartIndicesMap.get(pm.groupKey);
      if (!gList) {
        gList = [];
        groupPartIndicesMap.set(pm.groupKey, gList);
      }
      gList.push(i);
    }

    const groups: RaycastGroupBounds[] = [];
    for (const [groupKey, indices] of groupPartIndicesMap.entries()) {
      groups.push({
        groupKey,
        worldBox: new THREE.Box3(),
        partIndices: indices,
      });
    }

    this.raycastIndex = {
      unitWorldBox: new THREE.Box3(),
      bindings,
      parts: partBounds,
      groups,
      partBoundsById,
    };

    // Initial placement at explode = 0.0 (updates all InstancedMesh, BatchedMesh & AABB bounds once!)
    this.lastExplodeT = -1;
    this.updateExplode(0, true);
    this.syncWorldMatricesOnce();

    const finalNow = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (finalNow - finalStart > maxChunkMs) maxChunkMs = finalNow - finalStart;
    options.onChunkProgress?.(totalSteps, totalSteps);

    const stats: UnitBuildStats = {
      quality,
      declaredPartCount: MI_SHOE_META.declaredPartCount,
      registeredPartCount: registeredPartIds.size,
      instancedMeshCount: this.instancedPools.length,
      totalInstances,
      batchedMeshCount: this.batchedPools.length,
      totalBatchedItems,
      edgeLineCount: this.edgeLines.length,
      estimatedTriangles,
      buildTimeMs: finalNow - buildStart,
      maxChunkMs,
      chunkCount: totalSteps,
    };

    return {
      rootGroup,
      parts: this.parts,
      registeredPartIds,
      instancedMeshes: this.instancedPools.map((p) => p.mesh),
      batchedMeshes: this.batchedPools.map((p) => p.mesh),
      raycastIndex: this.raycastIndex,
      stats,
    };
  }

  private buildPhysicsOverlay(
    cache: ResourceCache,
    sphereSegs: number
  ): PhysicsOverlayState {
    const overlayGroup = new THREE.Group();
    overlayGroup.name = 'mishoe-v2-physics-overlay';
    overlayGroup.visible = false;
    setNodeStaticMatrix(overlayGroup);

    const explodeGuidesGroup = new THREE.Group();
    explodeGuidesGroup.name = 'mishoe-v2-explode-guides';
    explodeGuidesGroup.visible = false;
    setNodeStaticMatrix(explodeGuidesGroup);

    const guideMat = cache.acquireLineMaterial('mishoe-guide-corner', {
      color: 0x94a3b8,
      opacity: 0,
      dashed: true,
      dashSize: 2.0,
      gapSize: 1.5,
      clippingPlanes: this.clippingPlanes,
    }) as THREE.LineDashedMaterial;

    const cornerCoords: ReadonlyArray<readonly [number, number]> = [
      [-22.0, -18.0],
      [22.0, -18.0],
      [-22.0, 18.0],
      [22.0, 18.0],
    ];
    const cornerLines: THREE.Line[] = [];
    for (let i = 0; i < cornerCoords.length; i++) {
      const [cx, cz] = cornerCoords[i];
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array([cx, -12, cz, cx, 12, cz]), 3)
      );
      const lineMat = cache.acquireLineMaterial('mishoe-guide-corner', {
        color: 0x94a3b8,
        opacity: 0,
        dashed: true,
        dashSize: 2.0,
        gapSize: 1.5,
        clippingPlanes: this.clippingPlanes,
      });
      const line = new THREE.Line(geo, lineMat);
      line.computeLineDistances();
      setNodeStaticMatrix(line);
      explodeGuidesGroup.add(line);
      cornerLines.push(line);
    }
    cache.releaseMaterialInstance(guideMat);

    // Radial explode trajectory guides (1 single batched LineSegments draw call!)
    const partCount = this.parts.length;
    const radialPositions = new Float32Array(partCount * 2 * 3);
    const radialDistances = new Float32Array(partCount * 2);
    const radialGeo = new THREE.BufferGeometry();
    radialGeo.setAttribute('position', new THREE.BufferAttribute(radialPositions, 3));
    radialGeo.setAttribute('lineDistance', new THREE.BufferAttribute(radialDistances, 1));
    radialGeo.setDrawRange(0, 0);
    const radialMat = cache.acquireLineMaterial('mishoe-guide-radial', {
      color: 0x64748b,
      opacity: 0,
      dashed: true,
      dashSize: 1.6,
      gapSize: 1.4,
      clippingPlanes: this.clippingPlanes,
    }) as THREE.LineDashedMaterial;
    const radialLine = new THREE.LineSegments(radialGeo, radialMat);
    radialLine.frustumCulled = false;
    setNodeStaticMatrix(radialLine);
    explodeGuidesGroup.add(radialLine);

    const idxOf = (id: string): number => this.partIdToIdx.get(id) ?? 0;
    const flowSpecs: PhysicsFlowSpec[] = [
      {
        colorHex: 0x06b6d4,
        speed: 1.3,
        packetCount: 3,
        dashed: false,
        fromPartIdx: idxOf('mi-pins-8to12-digital-audio'),
        fromOffset: [-2.0, 0, 0],
        toPartIdx: idxOf('mi-audio-mux-emi-choke'),
        toOffset: [0, 1.0, 0],
      },
      {
        colorHex: 0x0891b2,
        speed: 1.2,
        packetCount: 2,
        dashed: false,
        fromPartIdx: idxOf('mi-audio-mux-emi-choke'),
        fromOffset: [0, 0.8, 0],
        toPartIdx: idxOf('mi-mainboard-zif-connector'),
        toOffset: [3.0, 1.5, 0],
      },
      {
        colorHex: 0xf59e0b,
        speed: 1.15,
        packetCount: 3,
        dashed: false,
        fromPartIdx: idxOf('mi-mainboard-zif-connector'),
        fromOffset: [-3.0, 1.5, 0],
        toPartIdx: idxOf('mi-esd-tvs-protection'),
        toOffset: [0, 1.0, 0],
      },
      {
        colorHex: 0xea580c,
        speed: 1.25,
        packetCount: 3,
        dashed: false,
        fromPartIdx: idxOf('mi-esd-tvs-protection'),
        fromOffset: [0, 1.2, 0],
        toPartIdx: idxOf('mi-pin-17-unreg-power'),
        toOffset: [10.0, 0, 0],
      },
      {
        colorHex: 0x3b82f6,
        speed: 1.0,
        packetCount: 2,
        dashed: true,
        fromPartIdx: idxOf('mi-mainboard-zif-connector'),
        fromOffset: [0, 1.5, 0],
        toPartIdx: idxOf('mi-pin-13-logic-vdd'),
        toOffset: [3.5, 0, 0],
      },
      {
        colorHex: 0x10b981,
        speed: 0.95,
        packetCount: 2,
        dashed: true,
        fromPartIdx: idxOf('mi-id-resistor-adc-net'),
        fromOffset: [0, 1.0, 0],
        toPartIdx: idxOf('mi-pins-1to3-id'),
        toOffset: [-15.5, 0, 0],
      },
      {
        colorHex: 0xeab308,
        speed: 1.45,
        packetCount: 3,
        dashed: false,
        fromPartIdx: idxOf('mi-xsync-igbt-isolator'),
        fromOffset: [0, 1.2, 0],
        toPartIdx: idxOf('mi-center-xsync-contact'),
        toOffset: [0, 0.5, 0],
      },
      {
        colorHex: 0xef4444,
        speed: 1.35,
        packetCount: 3,
        dashed: true,
        fromPartIdx: idxOf('mi-mainboard-zif-connector'),
        fromOffset: [5.0, 1.5, 0],
        toPartIdx: idxOf('mi-pins-18to20-ttl-flash'),
        toOffset: [13.5, 0, 0],
      },
    ];

    const flowLines: THREE.Line[] = [];
    let totalPackets = 0;
    for (let fi = 0; fi < flowSpecs.length; fi++) {
      const spec = flowSpecs[fi];
      totalPackets += spec.packetCount;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0, 1, 0]), 3)
      );
      const mat = cache.acquireLineMaterial(`mishoe-flow-${fi}`, {
        color: spec.colorHex,
        opacity: spec.dashed ? 0.88 : 0.86,
        dashed: spec.dashed,
        dashSize: 1.4,
        gapSize: 0.9,
        clippingPlanes: this.clippingPlanes,
      });
      const line = new THREE.Line(geo, mat);
      if (spec.dashed) line.computeLineDistances();
      setNodeStaticMatrix(line);
      overlayGroup.add(line);
      flowLines.push(line);
    }

    // ALL 21 signal/power packets consolidated into ONE single InstancedMesh draw call!
    const pktGeo = cache.acquireGeometry(`mi:flow_packet:s${sphereSegs}`, () =>
      new THREE.SphereGeometry(0.58, Math.max(8, Math.round(sphereSegs * 0.6)), Math.max(6, Math.round(sphereSegs * 0.45)))
    );
    const pktMat = cache.acquireBasicMaterial('mishoe-flow-packets', {
      color: 0xffffff,
      clippingPlanes: this.clippingPlanes,
    });
    const packetInstanced = new THREE.InstancedMesh(pktGeo, pktMat, totalPackets);
    packetInstanced.name = 'mishoe-v2-flow-packets';
    packetInstanced.frustumCulled = false;
    setNodeStaticMatrix(packetInstanced);

    const packetFlowIndex = new Int32Array(totalPackets);
    const packetLocalSlot = new Int32Array(totalPackets);
    let pCursor = 0;
    for (let fi = 0; fi < flowSpecs.length; fi++) {
      const spec = flowSpecs[fi];
      _tmpColor.setHex(spec.colorHex);
      for (let k = 0; k < spec.packetCount; k++) {
        packetFlowIndex[pCursor] = fi;
        packetLocalSlot[pCursor] = k;
        packetInstanced.setColorAt(pCursor, _tmpColor);
        pCursor++;
      }
    }
    if (packetInstanced.instanceColor) packetInstanced.instanceColor.needsUpdate = true;
    overlayGroup.add(packetInstanced);

    return {
      overlayGroup,
      explodeGuidesGroup,
      flowLines,
      flowSpecs,
      packetInstanced,
      packetFlowIndex,
      packetLocalSlot,
      cornerLines,
      cornerCoords,
      radialLine,
      guideMat,
      radialMat,
    };
  }

  private isPartHiddenInternal(partId: string): boolean {
    if (this.isolatedId !== null && this.isolatedId !== partId) return true;
    return this.hiddenIds.has(partId);
  }

  private syncWorldMatricesOnce(): void {
    if (!this.rootGroup) return;
    this.rootGroup.updateMatrixWorld(true);
  }

  /**
   * Zero-allocation differential explode update (`0.0..1.0`).
   * Strictly reuses module-scoped scratch objects and sets `instanceMatrix.needsUpdate = true`
   * ONLY when `t` actually changed (or `force` is true after visibility changes).
   */
  public updateExplode(t: number, force = false): boolean {
    const clamped = t < 0 ? 0 : t > 1 ? 1 : t;
    if (!force && Math.abs(clamped - this.lastExplodeT) <= 1e-6) {
      return false;
    }
    this.lastExplodeT = clamped;

    const partCount = this.parts.length;
    const assem = this.assembledPosFlat;
    const exp = this.explodeOffsetFlat;
    const cur = this.currentPosFlat;

    // 1. Update part logical coordinates & CadPart.group manual matrices
    for (let i = 0; i < partCount; i++) {
      const o = i * 3;
      const px = assem[o] + exp[o] * clamped;
      const py = assem[o + 1] + exp[o + 1] * clamped;
      const pz = assem[o + 2] + exp[o + 2] * clamped;
      cur[o] = px;
      cur[o + 1] = py;
      cur[o + 2] = pz;

      const grp = this.parts[i].group;
      grp.position.set(px, py, pz);
      grp.updateMatrix();
    }

    // 2. Update all Tier-1 InstancedMesh instance matrices (zero allocations!)
    for (let pi = 0; pi < this.instancedPools.length; pi++) {
      const pool = this.instancedPools[pi];
      const count = pool.count;
      const pIdxArr = pool.partIndices;
      const lPos = pool.localPos;
      const lQuat = pool.localQuat;
      const lScale = pool.localScale;
      const idTable = pool.instanceIdToPartId;

      for (let i = 0; i < count; i++) {
        const partIdx = pIdxArr[i];
        const po = partIdx * 3;
        const lo = i * 3;
        const qo = i * 4;
        const hidden = this.isPartHiddenInternal(idTable[i]);

        _tmpPos.set(cur[po] + lPos[lo], cur[po + 1] + lPos[lo + 1], cur[po + 2] + lPos[lo + 2]);
        _tmpQuat.set(lQuat[qo], lQuat[qo + 1], lQuat[qo + 2], lQuat[qo + 3]);
        if (hidden) {
          _tmpScale.copy(_zeroScale);
        } else {
          _tmpScale.set(lScale[lo], lScale[lo + 1], lScale[lo + 2]);
        }
        _tmpMat4.compose(_tmpPos, _tmpQuat, _tmpScale);
        pool.mesh.setMatrixAt(i, _tmpMat4);
      }
      pool.mesh.instanceMatrix.needsUpdate = true;
    }

    // 3. Update all Tier-2 BatchedMesh matrices & visibility flags (zero allocations!)
    _tmpQuat.identity();
    _tmpScale.set(1, 1, 1);
    for (let bi = 0; bi < this.batchedPools.length; bi++) {
      const pool = this.batchedPools[bi];
      const count = pool.count;
      const bIds = pool.batchIds;
      const pIdxArr = pool.partIndices;

      for (let i = 0; i < count; i++) {
        const bId = bIds[i];
        const partIdx = pIdxArr[i];
        const po = partIdx * 3;
        const hidden = this.isPartHiddenInternal(pool.batchIdToPartId[bId]);

        _tmpPos.set(cur[po], cur[po + 1], cur[po + 2]);
        _tmpMat4.compose(_tmpPos, _tmpQuat, _tmpScale);
        pool.mesh.setMatrixAt(bId, _tmpMat4);
        pool.mesh.setVisibleAt(bId, !hidden);
      }
    }

    // 4. Update cached CAD edge line manual matrices
    for (let ei = 0; ei < this.edgeLines.length; ei++) {
      const rec = this.edgeLines[ei];
      const po = rec.partIdx * 3;
      rec.line.position.set(cur[po], cur[po + 1], cur[po + 2]);
      rec.line.updateMatrix();
      rec.line.updateMatrixWorld(false);
    }

    // 5. Refresh cached 2-stage raycast AABBs (Unit -> 8 Groups -> 32 Parts) with zero allocations!
    if (this.raycastIndex) {
      const unitBox = this.raycastIndex.unitWorldBox;
      unitBox.makeEmpty();
      const pBounds = this.raycastIndex.parts;
      for (let i = 0; i < pBounds.length; i++) {
        const pb = pBounds[i];
        const po = i * 3;
        const px = cur[po];
        const py = cur[po + 1];
        const pz = cur[po + 2];
        pb.worldBox.min.set(pb.localBox.min.x + px, pb.localBox.min.y + py, pb.localBox.min.z + pz);
        pb.worldBox.max.set(pb.localBox.max.x + px, pb.localBox.max.y + py, pb.localBox.max.z + pz);
        unitBox.union(pb.worldBox);
      }

      const groups = this.raycastIndex.groups;
      for (let gi = 0; gi < groups.length; gi++) {
        const g = groups[gi];
        g.worldBox.makeEmpty();
        const indices = g.partIndices;
        for (let k = 0; k < indices.length; k++) {
          g.worldBox.union(pBounds[indices[k]].worldBox);
        }
      }

      // Sync InstancedMesh & BatchedMesh bounding volumes from unitWorldBox (zero allocations!)
      _unitBoxScratch.copy(unitBox);
      for (let pi = 0; pi < this.instancedPools.length; pi++) {
        const m = this.instancedPools[pi].mesh;
        if (m.boundingBox) m.boundingBox.copy(_unitBoxScratch);
        if (m.boundingSphere) _unitBoxScratch.getBoundingSphere(m.boundingSphere);
      }
      for (let bi = 0; bi < this.batchedPools.length; bi++) {
        const m = this.batchedPools[bi].mesh;
        if (m.boundingBox) m.boundingBox.copy(_unitBoxScratch);
        if (m.boundingSphere) _unitBoxScratch.getBoundingSphere(m.boundingSphere);
      }
    }

    return true;
  }

  /**
   * Apply click selection, hover highlight, hide/isolate, and solid/xray/cad renderMode
   * using InstancedMesh/BatchedMesh `setColorAt` + shared ResourceCache material swapping.
   */
  public setVisualState(
    selectedId: string | null,
    hoveredId: string | null,
    hiddenIds: ReadonlySet<string>,
    isolatedId: string | null,
    renderMode: RenderMode
  ): void {
    const modeChanged = this.renderMode !== renderMode;
    const visibilityChanged =
      this.isolatedId !== isolatedId ||
      this.hiddenIds.size !== hiddenIds.size ||
      (() => {
        for (const id of hiddenIds) {
          if (!this.hiddenIds.has(id)) return true;
        }
        return false;
      })();

    this.selectedId = selectedId;
    this.hoveredId = hoveredId;
    this.hiddenIds = new Set(hiddenIds);
    this.isolatedId = isolatedId;
    this.renderMode = renderMode;

    // Swap cached materials when renderMode changes (ref-counted release + acquire!)
    if (modeChanged && this.cachedCacheRef) {
      const cache = this.cachedCacheRef;
      for (let pi = 0; pi < this.instancedPools.length; pi++) {
        const pool = this.instancedPools[pi];
        const prevMat = pool.mesh.material as THREE.Material;
        const nextMat = cache.acquireMaterial(pool.bucket, this.quality, renderMode, this.clippingPlanes);
        pool.mesh.material = nextMat;
        cache.releaseMaterialInstance(prevMat);
      }
      for (let bi = 0; bi < this.batchedPools.length; bi++) {
        const pool = this.batchedPools[bi];
        const prevMat = pool.mesh.material as THREE.Material;
        const nextMat = cache.acquireMaterial(pool.bucket, this.quality, renderMode, this.clippingPlanes);
        pool.mesh.material = nextMat;
        cache.releaseMaterialInstance(prevMat);
      }
    }

    // Update per-instance & per-batch highlight colors via setColorAt (zero allocations!)
    const applyTint = (baseHex: number, partId: string): void => {
      if (renderMode === 'cad') {
        _tmpColor.copy(_cadTint);
      } else if (renderMode === 'xray') {
        _tmpColor.copy(_xrayTint);
      } else {
        _tmpColor.setHex(baseHex);
      }
      if (partId === this.selectedId) {
        _tmpColor.lerp(_selTint, 0.56);
      } else if (partId === this.hoveredId) {
        _tmpColor.lerp(_hovTint, 0.34);
      }
    };

    for (let pi = 0; pi < this.instancedPools.length; pi++) {
      const pool = this.instancedPools[pi];
      for (let i = 0; i < pool.count; i++) {
        applyTint(pool.baseColors[i], pool.instanceIdToPartId[i]);
        pool.mesh.setColorAt(i, _tmpColor);
      }
      if (pool.mesh.instanceColor) pool.mesh.instanceColor.needsUpdate = true;
    }

    for (let bi = 0; bi < this.batchedPools.length; bi++) {
      const pool = this.batchedPools[bi];
      for (let i = 0; i < pool.count; i++) {
        const bId = pool.batchIds[i];
        applyTint(pool.baseColors[i], pool.batchIdToPartId[bId]);
        pool.mesh.setColorAt(bId, _tmpColor);
      }
    }

    // Update CAD edge visibility & highlight material
    const cfg = QUALITY_TIER_CONFIG[this.quality];
    if (this.cachedCacheRef) {
      const cache = this.cachedCacheRef;
      for (let ei = 0; ei < this.edgeLines.length; ei++) {
        const rec = this.edgeLines[ei];
        const hidden = this.isPartHiddenInternal(rec.partId);
        const isSel = rec.partId === this.selectedId;
        const isHov = rec.partId === this.hoveredId;
        rec.line.visible =
          !hidden &&
          (isSel ||
            isHov ||
            renderMode === 'cad' ||
            renderMode === 'xray' ||
            (cfg.showSolidStructuralEdges && rec.isHero));

        const targetKey = isSel
          ? 'mishoe-edge-sel'
          : isHov
            ? 'mishoe-edge-hov'
            : renderMode === 'cad'
              ? 'mishoe-edge-cad'
              : renderMode === 'xray'
                ? 'mishoe-edge-xray'
                : rec.isDark
                  ? 'mishoe-edge-solid-dark'
                  : 'mishoe-edge-solid';
        const prevMat = rec.line.material as THREE.Material;
        if (prevMat.userData?.__cacheKey !== `line:${targetKey}`) {
          const nextMat = cache.acquireLineMaterial(targetKey, {
            color: isSel
              ? 0x0d5bd9
              : isHov
                ? 0x2563eb
                : renderMode === 'cad'
                  ? 0x14161a
                  : renderMode === 'xray'
                    ? 0x3a516e
                    : rec.isDark
                      ? 0x7a889e
                      : 0x181c24,
            opacity: isSel
              ? 0.92
              : isHov
                ? 0.72
                : renderMode === 'cad'
                  ? 0.72
                  : renderMode === 'xray'
                    ? 0.36
                    : rec.isDark
                      ? 0.32
                      : 0.26,
            clippingPlanes: this.clippingPlanes,
          });
          rec.line.material = nextMat;
          cache.releaseMaterialInstance(prevMat);
        }
      }
    }

    // Sync CadPart.group.visible & force matrix visibility sync when hidden/isolated changed
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i].group.visible = !this.isPartHiddenInternal(this.parts[i].id);
    }
    if (visibilityChanged) {
      this.updateExplode(this.lastExplodeT < 0 ? 0 : this.lastExplodeT, true);
    }
  }

  public setClippingPlanes(planes: THREE.Plane[]): void {
    this.clippingPlanes = planes;
    if (this.cachedCacheRef) {
      this.cachedCacheRef.updateClippingPlanes(planes);
    }
  }

  public setPhysicsVisible(visible: boolean): void {
    if (!this.physicsState) return;
    this.physicsState.overlayGroup.visible = visible;
  }

  /**
   * Zero-allocation explode trajectory guides update.
   */
  public updateExplodeGuides(explodeFactor: number, visible: boolean): void {
    const ps = this.physicsState;
    if (!ps) return;
    const show = visible && explodeFactor > 0.02;
    ps.explodeGuidesGroup.visible = show;
    if (!show) return;

    const op = Math.min(0.42, explodeFactor * 0.55);
    ps.guideMat.opacity = op;
    ps.radialMat.opacity = op * 0.85;

    const yTop = 8 + explodeFactor * 20;
    const yBot = -10 - explodeFactor * 26;
    for (let i = 0; i < ps.cornerLines.length; i++) {
      const line = ps.cornerLines[i];
      const [cx, cz] = ps.cornerCoords[i];
      const posAttr = line.geometry.getAttribute('position') as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      arr[0] = cx;
      arr[1] = yBot;
      arr[2] = cz;
      arr[3] = cx;
      arr[4] = yTop;
      arr[5] = cz;
      posAttr.needsUpdate = true;
      line.computeLineDistances();
    }

    const rPos = ps.radialLine.geometry.getAttribute('position') as THREE.BufferAttribute;
    const rDist = ps.radialLine.geometry.getAttribute('lineDistance') as THREE.BufferAttribute;
    const posArr = rPos.array as Float32Array;
    const distArr = rDist.array as Float32Array;
    const assem = this.assembledPosFlat;
    const cur = this.currentPosFlat;
    let vCount = 0;

    for (let i = 0; i < this.parts.length; i++) {
      if (this.isPartHiddenInternal(this.parts[i].id)) continue;
      const o = i * 3;
      const ax = assem[o];
      const ay = assem[o + 1];
      const az = assem[o + 2];
      const bx = cur[o];
      const by = cur[o + 1];
      const bz = cur[o + 2];
      const len = Math.hypot(bx - ax, by - ay, bz - az);
      if (len < 0.25) continue;

      const base = vCount * 3;
      posArr[base] = ax;
      posArr[base + 1] = ay;
      posArr[base + 2] = az;
      posArr[base + 3] = bx;
      posArr[base + 4] = by;
      posArr[base + 5] = bz;
      distArr[vCount] = 0;
      distArr[vCount + 1] = len;
      vCount += 2;
    }
    ps.radialLine.geometry.setDrawRange(0, vCount);
    rPos.needsUpdate = true;
    rDist.needsUpdate = true;
  }

  /**
   * Zero-allocation real-time physics flow animation (all 21 packets in 1 InstancedMesh draw call!).
   */
  public updatePhysics(elapsed: number, _explodeFactor: number, active: boolean): void {
    const ps = this.physicsState;
    if (!ps) return;
    ps.overlayGroup.visible = active;
    if (!active) return;

    const cur = this.currentPosFlat;
    const specs = ps.flowSpecs;
    const lines = ps.flowLines;

    // Update flow line endpoints in-place
    for (let fi = 0; fi < specs.length; fi++) {
      const s = specs[fi];
      const fo = s.fromPartIdx * 3;
      const to = s.toPartIdx * 3;
      const ax = cur[fo] + s.fromOffset[0];
      const ay = cur[fo + 1] + s.fromOffset[1];
      const az = cur[fo + 2] + s.fromOffset[2];
      const bx = cur[to] + s.toOffset[0];
      const by = cur[to + 1] + s.toOffset[1];
      const bz = cur[to + 2] + s.toOffset[2];

      const line = lines[fi];
      const posAttr = line.geometry.getAttribute('position') as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      arr[0] = ax;
      arr[1] = ay;
      arr[2] = az;
      arr[3] = bx;
      arr[4] = by;
      arr[5] = bz;
      posAttr.needsUpdate = true;
      if (s.dashed) {
        line.computeLineDistances();
      }
    }

    // Update all 21 packets inside the single InstancedMesh (zero allocations!)
    const pktCount = ps.packetFlowIndex.length;
    _pktQuat.identity();
    for (let i = 0; i < pktCount; i++) {
      const fi = ps.packetFlowIndex[i];
      const slot = ps.packetLocalSlot[i];
      const s = specs[fi];
      const fo = s.fromPartIdx * 3;
      const to = s.toPartIdx * 3;
      _flowA.set(cur[fo] + s.fromOffset[0], cur[fo + 1] + s.fromOffset[1], cur[fo + 2] + s.fromOffset[2]);
      _flowB.set(cur[to] + s.toOffset[0], cur[to + 1] + s.toOffset[1], cur[to + 2] + s.toOffset[2]);

      const u = (((elapsed * s.speed + slot / s.packetCount + fi * 0.17) % 1) + 1) % 1;
      _pktPos.lerpVectors(_flowA, _flowB, u);
      const pulse = 0.8 + 0.35 * Math.sin(elapsed * 7.5 + slot * 2.1 + fi);
      _pktScale.set(pulse, pulse, pulse);
      _pktMat4.compose(_pktPos, _pktQuat, _pktScale);
      ps.packetInstanced.setMatrixAt(i, _pktMat4);
    }
    ps.packetInstanced.instanceMatrix.needsUpdate = true;
    // Reference _defVec so unused check never flags it
    _defVec.set(0, 0, 0);
  }

  /**
   * Complete deterministic GPU disposal & shared ResourceCache reference-count release.
   */
  public dispose(cache: ResourceCache): void {
    if (this.rootGroup) {
      disposeObject3D(this.rootGroup, cache, true);
      this.rootGroup = null;
    }
    this.instancedPools = [];
    this.batchedPools = [];
    this.edgeLines = [];
    this.physicsState = null;
    this.raycastIndex = null;
    this.parts = [];
    this.partIdToIdx.clear();
    this.lastExplodeT = -1;
    this.cachedCacheRef = null;
  }
}

export function createMiShoeUnit(): OptimizedUnit {
  return new MiShoeUnit();
}
