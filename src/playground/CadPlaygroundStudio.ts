import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import {
  CAD_SELECT_SENTINEL,
  PG_ERROR_SELECT_SENTINEL,
  PG_WARN_SELECT_SENTINEL,
  ResourceCache,
} from '../core/resource_cache';
import {
  CatalogPartEntry,
  ExtractedPartBlueprint,
  PartGeometryExtractor,
  PG_ROLE_CHIP_BITS,
  QuantizedGeoPack,
} from './PartGeometryExtractor';
import {
  CAMERA_PROFILE_LABELS,
  CameraDesignProfile,
  CameraEngineeringReport,
  PlacedPartSnapshot,
  renderEngineeringRadarSvg,
} from './CameraEngineeringGrader';
import {
  buildPlyaReportFromDeepPhysics,
  ExamStrictnessMode,
  generatePlaygroundCalculiXDeck,
  generatePlaygroundExamWorkspaceJson,
  generatePlaygroundKiCadSchematic,
  generatePlaygroundNgspiceNetlist,
  PlyaPipelineReport,
  runPlyaVerificationPipeline,
  serializeSnapshotsForExamEngine,
} from './PlyaVerificationPipeline';
import { resolvePlaygroundMaterial } from './exam_core/MaterialPhysicsDb';
import {
  V11SealVerification,
  verifyPlaygroundV11Seal,
} from '../core/v11_seal_verifier';
import type { V11CertificateRecord } from '../units/v1_1_certificates.gen';
import type { ExamWorkerRequest, ExamWorkerResponse } from './exam_core/ExamPlaygroundWorker';

export interface PlaygroundHostBridge {
  readonly renderer: THREE.WebGLRenderer;
  readonly container: HTMLElement;
  setCustomSceneRenderer: (
    renderFn: ((renderer: THREE.WebGLRenderer, dt: number) => boolean | void) | null
  ) => void;
  requestRender: () => void;
  onClosePlayground: () => void;
}

export type PlaygroundTemplateId = 'a7iv' | 'zve1' | 'fx3' | 'wlk220' | 'empty';
export type PlaygroundCameraView = 'iso' | 'front' | 'side' | 'top' | 'back';
export type PlaygroundShadingMode = 'solid' | 'xray' | 'wireframe';
export type PlaygroundMotionStage = 'sharp' | 'lite' | 'fast';

interface PlacedInstance {
  readonly uid: string;
  readonly entry: CatalogPartEntry;
  readonly blueprint: ExtractedPartBlueprint;
  /** Lightweight 0-mesh TransformControls anchor (no child meshes -> O(1) world matrix!) */
  readonly anchor: THREE.Object3D;
  opaqueBatchId: number;
  glassBatchId: number;
  hidden: boolean;
  locked: boolean;
  /** Cached inverse matrix & epoch for O(1) zero-invert raycast picking */
  readonly invMatrix: THREE.Matrix4;
  transformEpoch: number;
  invMatrixEpoch: number;
  /** Last uploaded color sentinel code (0=norm,1=warn,2=err,3=sel,4=sel+warn,5=sel+err) */
  lastColorCode: number;
  /** Reusable zero-GC PLYA evaluation snapshot updated in-place */
  readonly cachedSnap: PlacedPartSnapshot;
}

interface SerializedPartState {
  uid: string;
  key: string;
  pos: [number, number, number];
  rot: [number, number, number];
  scale: [number, number, number];
  hidden?: boolean;
  locked?: boolean;
}

type RoleFilterKey = keyof typeof PG_ROLE_CHIP_BITS;

const ROLE_FILTER_CHIPS: ReadonlyArray<{ readonly key: RoleFilterKey; readonly label: string }> = [
  { key: 'all', label: 'すべて' },
  { key: 'optics', label: '光学' },
  { key: 'sensor', label: '撮像' },
  { key: 'shutter', label: '露光' },
  { key: 'processor', label: '基板' },
  { key: 'power', label: '電源' },
  { key: 'storage', label: '記録' },
  { key: 'body', label: '筐体' },
  { key: 'viewfinder', label: 'EVF/LCD' },
  { key: 'audio_io', label: '音響/I/O' },
  { key: 'welcome', label: 'ようこそ220p' },
];

const MAX_UNDO_STEPS = 60;
const CATALOG_ROW_HEIGHT = 44;
const CATALOG_POOL_SIZE = 16;
const OVERLAY_MAX_SEGMENTS = 1200;

// Module-scoped zero-GC scratch objects (never allocated inside interaction / render / pick loops)
const _pgMat = new THREE.Matrix4();
const _pgNormalColor = new THREE.Color().setRGB(1, 1, 1);
const _pgWarnColor = new THREE.Color().setRGB(0, 2.5, 0);
const _pgErrorColor = new THREE.Color().setRGB(2.5, 0, 0);
const _pgSelectColor = new THREE.Color().setRGB(
  CAD_SELECT_SENTINEL[0],
  CAD_SELECT_SENTINEL[1],
  CAD_SELECT_SENTINEL[2]
);
const _pgWarnSelectColor = new THREE.Color().setRGB(
  PG_WARN_SELECT_SENTINEL[0],
  PG_WARN_SELECT_SENTINEL[1],
  PG_WARN_SELECT_SENTINEL[2]
);
const _pgErrorSelectColor = new THREE.Color().setRGB(
  PG_ERROR_SELECT_SENTINEL[0],
  PG_ERROR_SELECT_SENTINEL[1],
  PG_ERROR_SELECT_SENTINEL[2]
);
const _pgRayOrigin = new THREE.Vector3();
const _pgRayDir = new THREE.Vector3();
const _pgTmpBox = new THREE.Box3();
const _pgTmpCenter = new THREE.Vector3();
const _pgTmpSize = new THREE.Vector3();

interface PickCandidate {
  inst: PlacedInstance;
  tMin: number;
}

interface CatalogRowSlot {
  readonly btn: HTMLButtonElement;
  readonly swatch: HTMLSpanElement;
  readonly titleText: Text;
  readonly subText: Text;
  visible: boolean;
  topPx: number;
  boundKey: string;
}

function fmt1(v: number): string {
  const n = Math.abs(v) < 0.05 ? 0 : v;
  return n.toFixed(1);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Compose `anchor.matrixWorld * T(cx, cy, cz) * S(scale, scale, scale)` directly into `out`
 * in 18 multiplies and 9 adds with ZERO allocations.
 */
function composeQuantizedWorldMatrix(
  worldMat: THREE.Matrix4,
  cx: number,
  cy: number,
  cz: number,
  scale: number,
  out: THREE.Matrix4
): THREE.Matrix4 {
  const w = worldMat.elements;
  const o = out.elements;
  o[0] = w[0] * scale;
  o[1] = w[1] * scale;
  o[2] = w[2] * scale;
  o[3] = 0;
  o[4] = w[4] * scale;
  o[5] = w[5] * scale;
  o[6] = w[6] * scale;
  o[7] = 0;
  o[8] = w[8] * scale;
  o[9] = w[9] * scale;
  o[10] = w[10] * scale;
  o[11] = 0;
  o[12] = w[0] * cx + w[4] * cy + w[8] * cz + w[12];
  o[13] = w[1] * cx + w[5] * cy + w[9] * cz + w[13];
  o[14] = w[2] * cx + w[6] * cy + w[10] * cz + w[14];
  o[15] = 1;
  return out;
}

/**
 * Analytical O(1) OBB -> World AABB from anchor.matrixWorld and centered blueprint.halfExtents.
 * Exact for axis-aligned / 90deg-rotated parts and tight analytical bound for arbitrary rotations!
 */
function computeInstanceWorldBoxInto(inst: PlacedInstance, outBox: THREE.Box3): THREE.Box3 {
  const m = inst.anchor.matrixWorld.elements;
  const hx = inst.blueprint.halfExtents.x;
  const hy = inst.blueprint.halfExtents.y;
  const hz = inst.blueprint.halfExtents.z;

  const ex = Math.abs(m[0]) * hx + Math.abs(m[4]) * hy + Math.abs(m[8]) * hz;
  const ey = Math.abs(m[1]) * hx + Math.abs(m[5]) * hy + Math.abs(m[9]) * hz;
  const ez = Math.abs(m[2]) * hx + Math.abs(m[6]) * hy + Math.abs(m[10]) * hz;
  const cx = m[12];
  const cy = m[13];
  const cz = m[14];

  outBox.min.set(cx - ex, cy - ey, cz - ez);
  outBox.max.set(cx + ex, cy + ey, cz + ez);
  return outBox;
}

/**
 * Zero-GC Möller-Trumbore ray-triangle test directly against an SNORM16 QuantizedGeoPack!
 * Transforms the anchor-local ray into raw Int16 coordinate space ONCE so the inner triangle
 * loop reads Int16 values directly with ZERO divisions per vertex and returns exact world-space `t`!
 */
function intersectQuantizedPack(
  pack: QuantizedGeoPack,
  oxLocal: number,
  oyLocal: number,
  ozLocal: number,
  dxLocal: number,
  dyLocal: number,
  dzLocal: number,
  maxT: number
): number {
  const posAttr = pack.geometry.getAttribute('position');
  const idxAttr = pack.geometry.getIndex();
  if (!posAttr || !idxAttr) return maxT;

  const posArr = posAttr.array as Int16Array | Float32Array;
  const idxArr = idxAttr.array as Uint16Array | Uint32Array;
  const isNormalizedI16 = posAttr.normalized && posArr instanceof Int16Array;

  const invScale = isNormalizedI16 ? 32767.0 / pack.scale : 1.0 / pack.scale;
  const ox = (oxLocal - pack.cx) * invScale;
  const oy = (oyLocal - pack.cy) * invScale;
  const oz = (ozLocal - pack.cz) * invScale;
  const dx = dxLocal * invScale;
  const dy = dyLocal * invScale;
  const dz = dzLocal * invScale;

  let bestT = maxT;
  const iLen = idxArr.length;
  for (let i = 0; i < iLen; i += 3) {
    const a3 = idxArr[i] * 3;
    const b3 = idxArr[i + 1] * 3;
    const c3 = idxArr[i + 2] * 3;

    const v0x = posArr[a3];
    const v0y = posArr[a3 + 1];
    const v0z = posArr[a3 + 2];

    const e1x = posArr[b3] - v0x;
    const e1y = posArr[b3 + 1] - v0y;
    const e1z = posArr[b3 + 2] - v0z;

    const e2x = posArr[c3] - v0x;
    const e2y = posArr[c3 + 1] - v0y;
    const e2z = posArr[c3 + 2] - v0z;

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
    if (u < 0.0 || u > 1.0) continue;

    const qx = ty * e1z - tz * e1y;
    const qy = tz * e1x - tx * e1z;
    const qz = tx * e1y - ty * e1x;

    const v = (dx * qx + dy * qy + dz * qz) * invDet;
    if (v < 0.0 || u + v > 1.0) continue;

    const t = (e2x * qx + e2y * qy + e2z * qz) * invDet;
    if (t > 1e-4 && t < bestT) {
      bestT = t;
    }
  }
  return bestT;
}

/**
 * Play Ground 1.1 Hyper-Engine — Ultra-Low-Overhead 3D CAD Studio (`CAD STUDIO 1.1`) + `PLYA` Multi-Engine Pipeline.
 *
 * Key Hyper-Optimizations:
 *  - 2-DC Unified Mega-BatchedMesh (opaque + glass) with Dual-Atlas 6-ALU MatCap (0 dynamic lights!)
 *    and in-shader per-instance 3D Red Error / Amber Warning highlight (0 material swaps!).
 *  - 1-DC Unified Dynamic `LineSegments` for Grid, Optical Axis, Sensor/Flange Frame, CoG Crosshair,
 *    Selection Wireframe, and Diagnostic Red/Amber Boxes.
 *  - Demand-Driven Zero-Load Idle Loop (`return moved` -> 0.0 draws/s when stationary!).
 *  - Zero-GC OBB + Scalar SNORM16 Triangle Click Picker.
 *  - Analytical O(1) OBB->AABB `buildSnapshots()` + `sceneEpoch` Memoized PLYA Evaluation.
 *  - O(1) Synchronous Differential Undo/Redo (`restoreSnapshot`).
 *  - Fixed-Pool 24-Row Virtualized Catalog Scroller across all 2,404 parts.
 */
export class CadPlaygroundStudio {
  private readonly host: PlaygroundHostBridge;
  private readonly extractor = new PartGeometryExtractor();
  private readonly pgCache = new ResourceCache();

  private active = false;
  private openSessionToken = 0;
  private historyBusy = false;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private orbit: OrbitControls;
  private transform: TransformControls;
  private transformHelper: THREE.Object3D;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private pointerDown = new THREE.Vector2();

  // Unified Hyper-Engine Scene Objects (2 Mega-Batches + 1 Unified Overlay LineSegments + 1 Optical Cone)
  private partsGroup: THREE.Group;
  private opaqueMegaBatch: THREE.BatchedMesh | null = null;
  private glassMegaBatch: THREE.BatchedMesh | null = null;
  private opaqueGeoIdByKey = new Map<string, number>();
  private glassGeoIdByKey = new Map<string, number>();
  private opaqueCapInst = 0;
  private opaqueCapVerts = 0;
  private opaqueCapIndices = 0;
  private opaqueUsedInst = 0;
  private opaqueUsedVerts = 0;
  private opaqueUsedIndices = 0;
  private glassCapInst = 0;
  private glassCapVerts = 0;
  private glassCapIndices = 0;
  private glassUsedInst = 0;
  private glassUsedVerts = 0;
  private glassUsedIndices = 0;

  private overlayLines: THREE.LineSegments;
  private overlayPosArr: Float32Array;
  private overlayColArr: Uint8Array;
  private overlayVertCursor = 0;
  private staticOverlayVertCount = 0;
  private staticOverlayDirty = true;

  // Play Ground 3-Stage Adaptive Rendering (PG_SHARP <-> PG_LITE <-> PG_FAST 0.55x FBO Blit!)
  private pgMotionStage: PlaygroundMotionStage = 'sharp';
  private pgFastTarget: THREE.WebGLRenderTarget | null = null;
  private pgFastW = 0;
  private pgFastH = 0;
  private pgBlitScene: THREE.Scene | null = null;
  private pgBlitCamera: THREE.OrthographicCamera | null = null;
  private pgBlitGeo: THREE.BufferGeometry | null = null;
  private pgBlitQuad: THREE.Mesh | null = null;
  private pgBlitMat: THREE.ShaderMaterial | null = null;
  private prevPgCamPos = new THREE.Vector3();
  private prevPgCamQuat = new THREE.Quaternion();
  private prevPgCamInit = false;
  private pgEmaRenderMs = 10;
  private pgFastCooldown = 0;
  private isSoftwareGl = false;

  private placed: PlacedInstance[] = [];
  private selectedUid: string | null = null;
  private uidSeq = 1;
  private sceneEpoch = 1;
  private partsGroupMatrixDirty = true;
  private lastEvaluatedEpoch = -1;
  private lastEvaluatedProfile: CameraDesignProfile | null = null;
  private lastEvaluatedStrictness: ExamStrictnessMode | null = null;
  private lastReport: CameraEngineeringReport | null = null;
  private lastPlyaReport: PlyaPipelineReport | null = null;
  private cogPos: [number, number, number] = [0, 0, 0];

  private designProfile: CameraDesignProfile = 'auto';
  private examStrictness: ExamStrictnessMode = 'design';
  private shadingMode: PlaygroundShadingMode = 'solid';
  private showDiagnostics3D = true;
  private showOpticalAxis = true;
  private showCogMarker = true;
  private showGrid = true;

  private examWorker: Worker | null = null;
  private workerRequestEpoch = 0;
  private workerDebounceTimer = 0;

  private undoStack: SerializedPartState[][] = [];
  private redoStack: SerializedPartState[][] = [];
  private isApplyingHistory = false;

  // Reusable zero-GC pick candidates & snapshot array
  private readonly pickCandidates: PickCandidate[] = [];
  private readonly reusableSnapArray: PlacedPartSnapshot[] = [];

  // Shared Dual-Atlas MatCap + 0-texture FAST Vertex-Lit materials from pgCache (0 dynamic lights!)
  private readonly matSolidOpaque: THREE.Material;
  private readonly matSolidGlass: THREE.Material;
  private readonly matXray: THREE.Material;
  private readonly matWireframe: THREE.Material;
  private readonly matFastOpaque: THREE.Material;

  // UI Root & Elements
  private rootEl: HTMLElement;
  private catalogListEl!: HTMLElement;
  private catalogSpacerEl!: HTMLElement;
  private catalogPool: CatalogRowSlot[] = [];
  private filteredIndices = new Int32Array(0);
  private filteredCount = 0;

  private catalogSearchEl!: HTMLInputElement;
  private catalogUnitSelectEl!: HTMLSelectElement;
  private catalogCountEl!: HTMLElement;
  private roleChipsEl!: HTMLElement;
  private placedListEl!: HTMLElement;
  private liveStripEl!: HTMLElement;
  private viewportAlertEl!: HTMLElement;
  private inspectorBodyEl!: HTMLElement;
  private reportModalEl!: HTMLElement;
  private reportContentEl!: HTMLElement;
  private shortcutModalEl!: HTMLElement;
  private scoreBadgeEl!: HTMLElement;
  private profileSelectEl!: HTMLSelectElement;
  private strictnessSelectEl!: HTMLSelectElement;
  private templateSelectEl!: HTMLSelectElement;
  private statusToastEl!: HTMLElement;
  private loadingOverlayEl!: HTMLElement;

  private modeBtns: Record<'translate' | 'rotate' | 'scale', HTMLButtonElement> = {} as Record<
    'translate' | 'rotate' | 'scale',
    HTMLButtonElement
  >;
  private shadingBtns: Record<PlaygroundShadingMode, HTMLButtonElement> = {} as Record<
    PlaygroundShadingMode,
    HTMLButtonElement
  >;
  private spaceBtn!: HTMLButtonElement;
  private snapSelectEl!: HTMLSelectElement;
  private rotSnapSelectEl!: HTMLSelectElement;
  private axisToggleBtn!: HTMLButtonElement;
  private cogToggleBtn!: HTMLButtonElement;
  private diagToggleBtn!: HTMLButtonElement;
  private gridToggleBtn!: HTMLButtonElement;
  private undoBtn!: HTMLButtonElement;
  private redoBtn!: HTMLButtonElement;

  private activeFilterUnit = 'all';
  private activeRoleChip: RoleFilterKey = 'all';
  private activeSearch = '';
  private mobileTab: 'viewport' | 'catalog' | 'inspector' = 'viewport';
  private toastTimer = 0;
  private deferredRenderTimer = 0;

  // Zero-reflow cached DOM & renderer state (shadow-string diff caches skip redundant DOM mutations!)
  private cachedCanvasRect: DOMRect | null = null;
  private lastSpacerHeight = -1;
  private lastCatalogCountText = '';
  private lastCatalogScrollTop = 0;
  private lastAlertCls = '';
  private lastAlertText = '';
  private lastScoreText = '';
  private lastScoreStatus = '';
  private lastLiveStripSig = '';
  private lastV11BadgeSig = '';
  private importedV11Cert: (V11CertificateRecord & { solverManifestSha256?: string }) | null = null;
  private lastV11Seal: V11SealVerification | null = null;
  private v11SealBadgeEl!: HTMLButtonElement;
  private certFileInputEl!: HTMLInputElement;
  private savedShadowEnabled = false;
  private savedToneMapping: THREE.ToneMapping = THREE.ACESFilmicToneMapping;
  private savedPixelRatio = 1.0;
  private activePgPixelRatio = 1.0;
  private liveStripRefs: {
    top: HTMLElement;
    score: HTMLElement;
    rank: HTMLElement;
    prof: HTMLElement;
    mass: HTMLElement;
    ffd: HTMLElement;
    vig: HTMLElement;
    col: HTMLElement;
    boot: HTMLElement;
    yieldPct: HTMLElement;
  } | null = null;
  private placedRowByUid = new Map<string, HTMLElement>();
  private lastPlacedStructureSig = '';
  private lastSelectedRowUid: string | null = null;
  private inspectorRefs: {
    emptyEl: HTMLElement;
    formEl: HTMLElement;
    title: HTMLElement;
    sub: HTMLElement;
    alert: HTMLElement;
    inputs: Record<'px' | 'py' | 'pz' | 'rx' | 'ry' | 'rz' | 'sx' | 'sy' | 'sz', HTMLInputElement>;
    lockBtns: HTMLButtonElement[];
  } | null = null;
  private inspectorShowingEmpty = true;
  private lastInspectorRenderKey = '';

  private boundPointerDown = (e: PointerEvent) => this.onCanvasPointerDown(e);
  private boundPointerUp = (e: PointerEvent) => this.onCanvasPointerUp(e);
  private boundKeyDown = (e: KeyboardEvent) => this.onKeyDown(e);
  private boundResize = () => this.handleResize();

  constructor(appRoot: HTMLElement, host: PlaygroundHostBridge) {
    this.host = host;

    try {
      const gl = host.renderer.getContext();
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const rend = String(
        dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) || ''
      );
      this.isSoftwareGl = /SwiftShader|llvmpipe|Software|Mesa OffScreen/i.test(rend);
    } catch {
      this.isSoftwareGl = false;
    }

    // Acquire 0-light Dual-Atlas MatCap + 0-texture Vertex-Lit FAST materials (5 shared materials total!)
    this.matSolidOpaque = this.pgCache.acquirePlaygroundMatcapMaterial('solid_opaque');
    this.matSolidGlass = this.pgCache.acquirePlaygroundMatcapMaterial('solid_glass');
    this.matXray = this.pgCache.acquirePlaygroundMatcapMaterial('xray');
    this.matWireframe = this.pgCache.acquirePlaygroundMatcapMaterial('wireframe');
    this.matFastOpaque = this.pgCache.acquireFastProxyMaterial([], 0, true);

    // 1. Setup Industrial CAD Scene (0 Dynamic Lights — Dual-Atlas MatCap is self-lit!)
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf3f6fb);

    const w = Math.max(1, host.container.clientWidth);
    const h = Math.max(1, host.container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(34, w / h, 1.0, 1800);
    this.camera.position.set(-148, 92, 188);

    this.orbit = new OrbitControls(this.camera, host.renderer.domElement);
    this.orbit.enableDamping = true;
    this.orbit.dampingFactor = 0.08;
    // Finer macro zoom (minDistance=1.0mm) + tighter max zoom-out (680mm vs 1400mm)!
    this.orbit.minDistance = 1.0;
    this.orbit.maxDistance = 680;
    this.orbit.zoomSpeed = 0.62;
    this.orbit.target.set(0, 10, 8);
    this.orbit.enabled = false;
    this.orbit.addEventListener('change', () => {
      if (this.active) this.host.requestRender();
    });

    this.transform = new TransformControls(this.camera, host.renderer.domElement);
    this.transform.setSize(0.84);
    this.transform.enabled = false;
    this.transform.addEventListener('dragging-changed', (ev) => {
      this.orbit.enabled = this.active && !(ev as unknown as { value: boolean }).value;
      if (!(ev as unknown as { value: boolean }).value) {
        this.markSceneDirty();
        this.pushHistorySnapshot();
        this.refreshInspectorValues();
        this.refreshLiveBadge(false);
      }
      this.host.requestRender();
    });
    this.transform.addEventListener('objectChange', () => {
      const sel = this.getSelectedInstance();
      if (sel) {
        sel.anchor.updateMatrixWorld();
        sel.transformEpoch++;
        this.syncInstanceMatrix(sel);
        this.markSceneDirty();
        this.rebuildOverlayLines(false);
        this.scheduleWorkerEvaluation();
      }
      this.refreshInspectorValues();
      this.host.requestRender();
    });
    // TransformControls helper is mounted lazily ONLY while a part is selected (saves 67 meshes / 22 mats / 14 DCs / 0.45MB VBO!)
    this.transformHelper = this.transform.getHelper();

    // 2. Unified 1-DC Split Static+Dynamic Overlay LineSegments (Grid + Optical Axis + Cone Ribs + Flange + CoG + Hull + Repair Vectors + Diagnostics!)
    const maxVerts = OVERLAY_MAX_SEGMENTS * 2;
    this.overlayPosArr = new Float32Array(maxVerts * 3);
    this.overlayColArr = new Uint8Array(maxVerts * 3);
    const overlayGeo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(this.overlayPosArr, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    const colAttr = new THREE.BufferAttribute(this.overlayColArr, 3, true);
    colAttr.setUsage(THREE.DynamicDrawUsage);
    overlayGeo.setAttribute('position', posAttr);
    overlayGeo.setAttribute('color', colAttr);
    overlayGeo.setDrawRange(0, 0);

    const overlayMat = this.pgCache.acquireLineMaterial('pg_unified_overlay', {
      color: 0xffffff,
      opacity: 1.0,
      vertexColors: true,
    });
    overlayMat.transparent = false;
    this.overlayLines = new THREE.LineSegments(overlayGeo, overlayMat);
    this.overlayLines.frustumCulled = false;
    this.overlayLines.renderOrder = 10;
    this.scene.add(this.overlayLines);

    this.partsGroup = new THREE.Group();
    this.scene.add(this.partsGroup);

    this.rebuildOverlayLines(true);

    // 3. Build Play Ground 1.1 Industrial CAD Studio UI Overlay
    this.rootEl = document.createElement('div');
    this.rootEl.className = 'pg-studio-overlay';
    this.rootEl.dataset.mobileTab = 'viewport';
    this.rootEl.setAttribute('aria-hidden', 'true');
    this.buildDom();
    appRoot.appendChild(this.rootEl);
    this.initExamWorker();
  }

  private markSceneDirty(): void {
    this.sceneEpoch++;
    if (this.importedV11Cert) {
      this.refreshPlaygroundV11Seal(this.buildSnapshots(), true);
    }
  }

  private scheduleDeferredRender(delayMs = 12): void {
    if (this.deferredRenderTimer) {
      window.clearTimeout(this.deferredRenderTimer);
    }
    this.deferredRenderTimer = window.setTimeout(() => {
      this.deferredRenderTimer = 0;
      if (this.active) this.host.requestRender();
    }, delayMs);
  }

  // =========================================================================
  // Unified 1-DC Split Static/Dynamic Line Overlay Builder (Partial GPU Upload!)
  // =========================================================================
  private pushOverlaySeg(
    x0: number,
    y0: number,
    z0: number,
    x1: number,
    y1: number,
    z1: number,
    r: number,
    g: number,
    b: number
  ): void {
    const vc = this.overlayVertCursor;
    if (vc + 2 > OVERLAY_MAX_SEGMENTS * 2) return;
    const o = vc * 3;
    const p = this.overlayPosArr;
    const c = this.overlayColArr;
    p[o] = x0;
    p[o + 1] = y0;
    p[o + 2] = z0;
    p[o + 3] = x1;
    p[o + 4] = y1;
    p[o + 5] = z1;
    c[o] = r;
    c[o + 1] = g;
    c[o + 2] = b;
    c[o + 3] = r;
    c[o + 4] = g;
    c[o + 5] = b;
    this.overlayVertCursor = vc + 2;
  }

  private pushOverlayBox(box: THREE.Box3, r: number, g: number, b: number): void {
    const x0 = box.min.x, y0 = box.min.y, z0 = box.min.z;
    const x1 = box.max.x, y1 = box.max.y, z1 = box.max.z;
    // Bottom face
    this.pushOverlaySeg(x0, y0, z0, x1, y0, z0, r, g, b);
    this.pushOverlaySeg(x1, y0, z0, x1, y0, z1, r, g, b);
    this.pushOverlaySeg(x1, y0, z1, x0, y0, z1, r, g, b);
    this.pushOverlaySeg(x0, y0, z1, x0, y0, z0, r, g, b);
    // Top face
    this.pushOverlaySeg(x0, y1, z0, x1, y1, z0, r, g, b);
    this.pushOverlaySeg(x1, y1, z0, x1, y1, z1, r, g, b);
    this.pushOverlaySeg(x1, y1, z1, x0, y1, z1, r, g, b);
    this.pushOverlaySeg(x0, y1, z1, x0, y1, z0, r, g, b);
    // Vertical edges
    this.pushOverlaySeg(x0, y0, z0, x0, y1, z0, r, g, b);
    this.pushOverlaySeg(x1, y0, z0, x1, y1, z0, r, g, b);
    this.pushOverlaySeg(x1, y0, z1, x1, y1, z1, r, g, b);
    this.pushOverlaySeg(x0, y0, z1, x0, y1, z1, r, g, b);
  }

  private rebuildStaticOverlayPrefix(): void {
    this.overlayVertCursor = 0;

    // 1. Clean Millimeter CAD Build Plate & Reference Grid (240x240mm @ 20mm major + 120x120mm @ 10mm fine + XYZ axes)
    if (this.showGrid) {
      const yMaj = -48.0;
      for (let i = -6; i <= 6; i++) {
        const v = i * 20;
        const isCenter = i === 0;
        const r = isCenter ? 148 : 216;
        const g = isCenter ? 163 : 224;
        const b = isCenter ? 184 : 235;
        this.pushOverlaySeg(-120, yMaj, v, 120, yMaj, v, r, g, b);
        this.pushOverlaySeg(v, yMaj, -120, v, yMaj, 120, r, g, b);
      }
      const yFine = -47.95;
      for (let i = -6; i <= 6; i++) {
        if (i % 2 === 0) continue;
        const v = i * 10;
        this.pushOverlaySeg(-60, yFine, v, 60, yFine, v, 230, 236, 244);
        this.pushOverlaySeg(v, yFine, -60, v, yFine, 60, 230, 236, 244);
      }
      // Corner RGB AxesHelper (36mm)
      this.pushOverlaySeg(-112, -47.8, -112, -76, -47.8, -112, 239, 68, 68);
      this.pushOverlaySeg(-112, -47.8, -112, -112, -11.8, -112, 34, 197, 94);
      this.pushOverlaySeg(-112, -47.8, -112, -112, -47.8, -76, 59, 130, 246);
    }

    // 2. Sony E-Mount Optical Axis + Sensor Frame + 18mm Flange Ring + 8-Rib Optical Cone (replaces separate 1-DC mesh!)
    if (this.showOpticalAxis) {
      for (let z = -80; z < 142; z += 10) {
        this.pushOverlaySeg(0, 0, z, 0, 0, Math.min(144, z + 5.8), 230, 90, 40);
      }
      // 36x24mm Full-Frame Sensor Focal Plane Frame (Z = 0)
      this.pushOverlaySeg(-18, -12, 0, 18, -12, 0, 2, 132, 199);
      this.pushOverlaySeg(18, -12, 0, 18, 12, 0, 2, 132, 199);
      this.pushOverlaySeg(18, 12, 0, -18, 12, 0, 2, 132, 199);
      this.pushOverlaySeg(-18, 12, 0, -18, -12, 0, 2, 132, 199);
      // E-Mount 18.0mm Flange Ring (Ø46.1mm, Z = +18mm)
      const segs = 28;
      const rad = 23.05;
      let px = rad;
      let py = 0;
      for (let i = 1; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const nx = Math.cos(a) * rad;
        const ny = Math.sin(a) * rad;
        this.pushOverlaySeg(px, py, 18.0, nx, ny, 18.0, 230, 90, 40);
        px = nx;
        py = ny;
      }
      // Lightweight 8-rib Optical Frustum Cone + Front Aperture Ring (Z=0 -> Z=62mm, 0 extra draw calls!)
      const rRear = 15.5;
      const rFront = 23.5;
      let fx0 = rFront;
      let fy0 = 0;
      for (let i = 0; i < 16; i++) {
        const a1 = ((i + 1) / 16) * Math.PI * 2;
        const fx1 = Math.cos(a1) * rFront;
        const fy1 = Math.sin(a1) * rFront;
        this.pushOverlaySeg(fx0, fy0, 62.0, fx1, fy1, 62.0, 56, 189, 248);
        if ((i & 1) === 0) {
          const a0 = (i / 16) * Math.PI * 2;
          this.pushOverlaySeg(
            Math.cos(a0) * rRear,
            Math.sin(a0) * rRear,
            0.0,
            fx0,
            fy0,
            62.0,
            56,
            189,
            248
          );
        }
        fx0 = fx1;
        fy0 = fy1;
      }
    }

    this.staticOverlayVertCount = this.overlayVertCursor;
    this.staticOverlayDirty = false;
  }

  private rebuildOverlayLines(forceStatic = false): void {
    const needStatic = forceStatic || this.staticOverlayDirty;
    if (needStatic) {
      this.rebuildStaticOverlayPrefix();
    } else {
      this.overlayVertCursor = this.staticOverlayVertCount;
    }

    const dynStartVert = this.staticOverlayVertCount;

    // 3. Industrial 3D Center-of-Gravity (CoG) Crosshair + Diamond Ring + 2D Convex-Hull Support Polygon
    if (this.showCogMarker && this.placed.length > 0) {
      const [gx, gy, gz] = this.cogPos;
      this.pushOverlaySeg(gx - 10, gy, gz, gx + 10, gy, gz, 217, 119, 6);
      this.pushOverlaySeg(gx, gy - 10, gz, gx, gy + 10, gz, 217, 119, 6);
      this.pushOverlaySeg(gx, gy, gz - 10, gx, gy, gz + 10, 217, 119, 6);
      const r = 6.5;
      let px = gx + r;
      let py = gy;
      for (let i = 1; i <= 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const nx = gx + Math.cos(a) * r;
        const ny = gy + Math.sin(a) * r;
        this.pushOverlaySeg(px, py, gz, nx, ny, gz, 234, 179, 8);
        px = nx;
        py = ny;
      }

      const overlays = this.lastPlyaReport?.deepReport.overlays;
      if (overlays && overlays.supportHullXZ.length >= 3) {
        const sy = overlays.supportMinY + 0.15;
        const tipDeg = this.lastPlyaReport?.industrialMetrics.tippingAngleDeg ?? 30;
        const hr = tipDeg >= 20 ? 16 : tipDeg >= 10 ? 245 : 239;
        const hg = tipDeg >= 20 ? 185 : tipDeg >= 10 ? 158 : 68;
        const hb = tipDeg >= 20 ? 129 : tipDeg >= 10 ? 11 : 68;
        const hull = overlays.supportHullXZ;
        for (let i = 0; i < hull.length; i++) {
          const a = hull[i];
          const b = hull[(i + 1) % hull.length];
          this.pushOverlaySeg(a[0], sy, a[1], b[0], sy, b[1], hr, hg, hb);
        }
        // CoG vertical plumb line down to support polygon plane + landing cross
        this.pushOverlaySeg(gx, gy, gz, gx, sy, gz, hr, hg, hb);
        this.pushOverlaySeg(gx - 5, sy, gz, gx + 5, sy, gz, hr, hg, hb);
        this.pushOverlaySeg(gx, sy, gz - 5, gx, sy, gz + 5, hr, hg, hb);
      }
    }

    const snapFresh = this.lastEvaluatedEpoch === this.sceneEpoch;

    // 4. Vivid Electric-Blue Selection Wireframe Box
    const sel = this.getSelectedInstance();
    if (sel && !sel.hidden) {
      const box = snapFresh ? sel.cachedSnap.worldBox : computeInstanceWorldBoxInto(sel, _pgTmpBox);
      this.pushOverlayBox(box, 0, 102, 255);
    }

    // 5. Diagnostic 3D Red / Amber Wireframe Boxes + EXAM Minimum Repair Shift Vectors
    if (this.showDiagnostics3D && this.lastReport) {
      const diagMap = this.lastReport.partDiagnostics;
      const repairMap = this.lastPlyaReport?.deepReport.overlays.repairShiftsMm;
      for (let i = 0; i < this.placed.length; i++) {
        const inst = this.placed[i];
        if (inst.hidden) continue;
        const flag = diagMap.get(inst.uid);
        if (!flag || flag.severity === 'ok') continue;
        const box = snapFresh ? inst.cachedSnap.worldBox : computeInstanceWorldBoxInto(inst, _pgTmpBox);
        if (flag.severity === 'error') {
          this.pushOverlayBox(box, 239, 68, 68);
        } else {
          this.pushOverlayBox(box, 245, 158, 11);
        }
        const shift = repairMap?.[inst.uid];
        if (shift && (Math.abs(shift[0]) > 0.02 || Math.abs(shift[1]) > 0.02 || Math.abs(shift[2]) > 0.02)) {
          const cx = 0.5 * (box.min.x + box.max.x);
          const cy = 0.5 * (box.min.y + box.max.y);
          const cz = 0.5 * (box.min.z + box.max.z);
          const tx = cx + shift[0];
          const ty = cy + shift[1];
          const tz = cz + shift[2];
          this.pushOverlaySeg(cx, cy, cz, tx, ty, tz, 6, 182, 212);
          this.pushOverlaySeg(tx - 3.5, ty, tz, tx + 3.5, ty, tz, 6, 182, 212);
          this.pushOverlaySeg(tx, ty - 3.5, tz, tx, ty + 3.5, tz, 6, 182, 212);
          this.pushOverlaySeg(tx, ty, tz - 3.5, tx, ty, tz + 3.5, 6, 182, 212);
        }
      }
    }

    const geo = this.overlayLines.geometry;
    geo.setDrawRange(0, this.overlayVertCursor);
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const colAttr = geo.getAttribute('color') as THREE.BufferAttribute;
    posAttr.clearUpdateRanges();
    colAttr.clearUpdateRanges();
    if (needStatic) {
      if (this.overlayVertCursor > 0) {
        posAttr.addUpdateRange(0, this.overlayVertCursor * 3);
        colAttr.addUpdateRange(0, this.overlayVertCursor * 3);
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
      }
    } else {
      const dynCount = this.overlayVertCursor - dynStartVert;
      if (dynCount > 0) {
        posAttr.addUpdateRange(dynStartVert * 3, dynCount * 3);
        colAttr.addUpdateRange(dynStartVert * 3, dynCount * 3);
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
      }
    }
  }

  // =========================================================================
  // 2-DC Unified Mega-BatchedMesh Management (Tight-Fitted VBOs!)
  // =========================================================================
  private disposeMegaBatches(): void {
    if (this.opaqueMegaBatch) {
      this.scene.remove(this.opaqueMegaBatch);
      this.opaqueMegaBatch.dispose();
      this.opaqueMegaBatch = null;
    }
    if (this.glassMegaBatch) {
      this.scene.remove(this.glassMegaBatch);
      this.glassMegaBatch.dispose();
      this.glassMegaBatch = null;
    }
    this.opaqueGeoIdByKey.clear();
    this.glassGeoIdByKey.clear();
    this.opaqueCapInst = 0;
    this.opaqueCapVerts = 0;
    this.opaqueCapIndices = 0;
    this.opaqueUsedInst = 0;
    this.opaqueUsedVerts = 0;
    this.opaqueUsedIndices = 0;
    this.glassCapInst = 0;
    this.glassCapVerts = 0;
    this.glassCapIndices = 0;
    this.glassUsedInst = 0;
    this.glassUsedVerts = 0;
    this.glassUsedIndices = 0;
  }

  private getCurrentBatchMaterial(isGlass: boolean): THREE.Material {
    if (this.shadingMode === 'xray') return this.matXray;
    if (this.shadingMode === 'wireframe') return this.matWireframe;
    if (!isGlass && this.pgMotionStage === 'fast') return this.matFastOpaque;
    return isGlass ? this.matSolidGlass : this.matSolidOpaque;
  }

  private syncInstanceMatrix(inst: PlacedInstance): void {
    const bp = inst.blueprint;
    if (this.opaqueMegaBatch && inst.opaqueBatchId >= 0 && bp.opaque) {
      composeQuantizedWorldMatrix(
        inst.anchor.matrixWorld,
        bp.opaque.cx,
        bp.opaque.cy,
        bp.opaque.cz,
        bp.opaque.scale,
        _pgMat
      );
      this.opaqueMegaBatch.setMatrixAt(inst.opaqueBatchId, _pgMat);
    }
    if (this.glassMegaBatch && inst.glassBatchId >= 0 && bp.glass) {
      composeQuantizedWorldMatrix(
        inst.anchor.matrixWorld,
        bp.glass.cx,
        bp.glass.cy,
        bp.glass.cz,
        bp.glass.scale,
        _pgMat
      );
      this.glassMegaBatch.setMatrixAt(inst.glassBatchId, _pgMat);
    }
  }

  private syncInstanceVisibility(inst: PlacedInstance): void {
    const vis = !inst.hidden;
    if (this.opaqueMegaBatch && inst.opaqueBatchId >= 0) {
      this.opaqueMegaBatch.setVisibleAt(inst.opaqueBatchId, vis);
    }
    if (this.glassMegaBatch && inst.glassBatchId >= 0) {
      this.glassMegaBatch.setVisibleAt(inst.glassBatchId, vis);
    }
  }

  private rebuildMegaBatches(): void {
    this.disposeMegaBatches();
    if (this.placed.length === 0) return;

    this.partsGroup.updateMatrixWorld(true);
    this.partsGroupMatrixDirty = false;

    const uniqueOpaque = new Map<string, QuantizedGeoPack>();
    const uniqueGlass = new Map<string, QuantizedGeoPack>();
    let opInst = 0, opVerts = 0, opIdx = 0;
    let glInst = 0, glVerts = 0, glIdx = 0;

    for (let i = 0; i < this.placed.length; i++) {
      const inst = this.placed[i];
      const bp = inst.blueprint;
      if (bp.opaque) {
        opInst++;
        if (!uniqueOpaque.has(inst.entry.key)) {
          uniqueOpaque.set(inst.entry.key, bp.opaque);
          opVerts += bp.opaque.vertCount;
          opIdx += bp.opaque.indexCount;
        }
      }
      if (bp.glass) {
        glInst++;
        if (!uniqueGlass.has(inst.entry.key)) {
          uniqueGlass.set(inst.entry.key, bp.glass);
          glVerts += bp.glass.vertCount;
          glIdx += bp.glass.indexCount;
        }
      }
    }

    if (opInst > 0 && opVerts > 0 && opIdx > 0) {
      const capInst = Math.max(20, Math.ceil(opInst * 1.15));
      const capVerts = Math.max(128, Math.ceil(opVerts * 1.08));
      const capIdx = Math.max(384, Math.ceil(opIdx * 1.08));
      const bm = new THREE.BatchedMesh(capInst, capVerts, capIdx, this.getCurrentBatchMaterial(false));
      bm.frustumCulled = false;
      bm.sortObjects = false;
      bm.perObjectFrustumCulled = false;

      for (const [key, pack] of uniqueOpaque.entries()) {
        const gid = bm.addGeometry(pack.geometry);
        this.opaqueGeoIdByKey.set(key, gid);
      }

      this.opaqueMegaBatch = bm;
      this.opaqueCapInst = capInst;
      this.opaqueCapVerts = capVerts;
      this.opaqueCapIndices = capIdx;
      this.opaqueUsedVerts = opVerts;
      this.opaqueUsedIndices = opIdx;
      this.opaqueUsedInst = 0;
      this.scene.add(bm);
    }

    if (glInst > 0 && glVerts > 0 && glIdx > 0) {
      const capInst = Math.max(8, Math.ceil(glInst * 1.15));
      const capVerts = Math.max(64, Math.ceil(glVerts * 1.08));
      const capIdx = Math.max(192, Math.ceil(glIdx * 1.08));
      const bm = new THREE.BatchedMesh(capInst, capVerts, capIdx, this.getCurrentBatchMaterial(true));
      bm.frustumCulled = false;
      bm.sortObjects = false;
      bm.perObjectFrustumCulled = false;
      bm.renderOrder = 2;

      for (const [key, pack] of uniqueGlass.entries()) {
        const gid = bm.addGeometry(pack.geometry);
        this.glassGeoIdByKey.set(key, gid);
      }

      this.glassMegaBatch = bm;
      this.glassCapInst = capInst;
      this.glassCapVerts = capVerts;
      this.glassCapIndices = capIdx;
      this.glassUsedVerts = glVerts;
      this.glassUsedIndices = glIdx;
      this.glassUsedInst = 0;
      this.scene.add(bm);
    }

    for (let i = 0; i < this.placed.length; i++) {
      const inst = this.placed[i];
      inst.opaqueBatchId = -1;
      inst.glassBatchId = -1;
      inst.lastColorCode = -1;
      inst.transformEpoch++;
      const bp = inst.blueprint;

      if (this.opaqueMegaBatch && bp.opaque) {
        const gid = this.opaqueGeoIdByKey.get(inst.entry.key);
        if (gid !== undefined) {
          const bid = this.opaqueMegaBatch.addInstance(gid);
          inst.opaqueBatchId = bid;
          this.opaqueUsedInst++;
          this.opaqueMegaBatch.setColorAt(bid, _pgNormalColor);
          this.opaqueMegaBatch.setVisibleAt(bid, !inst.hidden);
        }
      }
      if (this.glassMegaBatch && bp.glass) {
        const gid = this.glassGeoIdByKey.get(inst.entry.key);
        if (gid !== undefined) {
          const bid = this.glassMegaBatch.addInstance(gid);
          inst.glassBatchId = bid;
          this.glassUsedInst++;
          this.glassMegaBatch.setColorAt(bid, _pgNormalColor);
          this.glassMegaBatch.setVisibleAt(bid, !inst.hidden);
        }
      }
      this.syncInstanceMatrix(inst);
    }

    if (this.glassMegaBatch) {
      this.glassMegaBatch.visible = this.glassUsedInst > 0 && this.pgMotionStage !== 'fast';
    }
    this.applyAllVisualMaterials(true);
  }

  /** Try O(1) incremental append to existing MegaBatches; rebuild cleanly only if capacity exceeded. */
  private attachInstanceToMegaBatches(inst: PlacedInstance): void {
    const bp = inst.blueprint;
    const key = inst.entry.key;

    if (bp.opaque) {
      if (!this.opaqueMegaBatch) {
        this.rebuildMegaBatches();
        return;
      }
      const needNewGeo = !this.opaqueGeoIdByKey.has(key);
      if (
        this.opaqueUsedInst + 1 > this.opaqueCapInst ||
        (needNewGeo &&
          (this.opaqueUsedVerts + bp.opaque.vertCount > this.opaqueCapVerts ||
            this.opaqueUsedIndices + bp.opaque.indexCount > this.opaqueCapIndices))
      ) {
        this.rebuildMegaBatches();
        return;
      }
    }

    if (bp.glass) {
      if (!this.glassMegaBatch) {
        this.rebuildMegaBatches();
        return;
      }
      const needNewGeo = !this.glassGeoIdByKey.has(key);
      if (
        this.glassUsedInst + 1 > this.glassCapInst ||
        (needNewGeo &&
          (this.glassUsedVerts + bp.glass.vertCount > this.glassCapVerts ||
            this.glassUsedIndices + bp.glass.indexCount > this.glassCapIndices))
      ) {
        this.rebuildMegaBatches();
        return;
      }
    }

    inst.anchor.updateMatrixWorld();

    if (bp.opaque && this.opaqueMegaBatch) {
      let gid = this.opaqueGeoIdByKey.get(key);
      if (gid === undefined) {
        gid = this.opaqueMegaBatch.addGeometry(bp.opaque.geometry);
        this.opaqueGeoIdByKey.set(key, gid);
        this.opaqueUsedVerts += bp.opaque.vertCount;
        this.opaqueUsedIndices += bp.opaque.indexCount;
      }
      const bid = this.opaqueMegaBatch.addInstance(gid);
      inst.opaqueBatchId = bid;
      this.opaqueUsedInst++;
      this.opaqueMegaBatch.setColorAt(bid, _pgNormalColor);
      this.opaqueMegaBatch.setVisibleAt(bid, !inst.hidden);
    }

    if (bp.glass && this.glassMegaBatch) {
      let gid = this.glassGeoIdByKey.get(key);
      if (gid === undefined) {
        gid = this.glassMegaBatch.addGeometry(bp.glass.geometry);
        this.glassGeoIdByKey.set(key, gid);
        this.glassUsedVerts += bp.glass.vertCount;
        this.glassUsedIndices += bp.glass.indexCount;
      }
      const bid = this.glassMegaBatch.addInstance(gid);
      inst.glassBatchId = bid;
      this.glassUsedInst++;
      this.glassMegaBatch.setColorAt(bid, _pgNormalColor);
      this.glassMegaBatch.setVisibleAt(bid, !inst.hidden);
    }

    this.syncInstanceMatrix(inst);
  }

  private buildDom(): void {
    const profileOptions = (Object.keys(CAMERA_PROFILE_LABELS) as CameraDesignProfile[])
      .map((k) => `<option value="${k}">${CAMERA_PROFILE_LABELS[k]}</option>`)
      .join('');

    const roleChipHtml = ROLE_FILTER_CHIPS.map(
      (c) =>
        `<button type="button" class="pg-role-chip${c.key === 'all' ? ' is-active' : ''}" data-role-chip="${c.key}">${c.label}</button>`
    ).join('');

    this.rootEl.innerHTML = `
      <header class="pg-topbar">
        <div class="pg-topbar-left">
          <button type="button" class="pg-btn pg-btn-exit" data-action="exit" title="通常ビューへ戻る (Esc)">
            <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            <span>戻る</span>
          </button>
          <div class="pg-brand">
            <span class="pg-brand-badge">CAD STUDIO 1.1</span>
            <span class="pg-brand-title">Play Ground</span>
          </div>
          <div class="pg-sep"></div>
          <div class="pg-tool-seg" role="group" aria-label="トランスフォームモード">
            <button type="button" class="pg-seg-btn is-active" data-tmode="translate" title="移動 (W)">移動 <em>W</em></button>
            <button type="button" class="pg-seg-btn" data-tmode="rotate" title="回転 (E)">回転 <em>E</em></button>
            <button type="button" class="pg-seg-btn" data-tmode="scale" title="スケール (S)">拡縮 <em>S</em></button>
          </div>
          <button type="button" class="pg-btn pg-btn-sm" data-action="space" title="座標系切替 (Q)">World</button>
          <label class="pg-snap-field" title="移動グリッドスナップ">
            <span>Snap</span>
            <select data-field="gridSnap">
              <option value="0">OFF</option>
              <option value="0.5">0.5mm</option>
              <option value="1" selected>1mm</option>
              <option value="2">2mm</option>
              <option value="5">5mm</option>
              <option value="10">10mm</option>
            </select>
          </label>
          <label class="pg-snap-field" title="角度スナップ">
            <span>Rot</span>
            <select data-field="rotSnap">
              <option value="0">OFF</option>
              <option value="5">5°</option>
              <option value="15" selected>15°</option>
              <option value="45">45°</option>
            </select>
          </label>
          <div class="pg-sep"></div>
          <button type="button" class="pg-btn pg-btn-icon" data-action="undo" title="元に戻す (Ctrl+Z)" disabled>
            <svg viewBox="0 0 24 24"><path d="M9 14L4 9l5-5"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>
          </button>
          <button type="button" class="pg-btn pg-btn-icon" data-action="redo" title="やり直す (Ctrl+Y)" disabled>
            <svg viewBox="0 0 24 24"><path d="M15 14l5-5-5-5"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>
          </button>
        </div>

        <div class="pg-topbar-right">
          <label class="pg-snap-field pg-profile-field" title="カメラ設計プロファイル（採点基準を自由に切替）">
            <span>目標</span>
            <select data-field="profileSelect">${profileOptions}</select>
          </label>
          <label class="pg-snap-field pg-strictness-field" title="PLYA V2.1 (THE LAST EXAM V1.1継承 · 24ソルバ / 256項目) 厳格度モード">
            <span>EXAM</span>
            <select data-field="strictnessSelect">
              <option value="design" selected>標準</option>
              <option value="exam_strict">極限</option>
            </select>
          </label>
          <label class="pg-snap-field pg-template-field" title="スターターカメラ構成を読込">
            <span>雛形</span>
            <select data-field="templateSelect">
              <option value="a7iv">α7 IV 一眼</option>
              <option value="zve1">ZV-E1 VLOG</option>
              <option value="fx3">FX3 シネマ</option>
              <option value="wlk220">ようこそ WLK-220</option>
              <option value="empty">白紙クリア</option>
            </select>
          </label>
          <button type="button" class="pg-btn pg-btn-sm" data-action="exportJson" title="設計JSONを保存">保存</button>
          <button type="button" class="pg-btn pg-btn-sm" data-action="importJson" title="設計JSON / V1.1証明書を読込">読込</button>
          <button type="button" class="v11-seal-pill pg-v11-seal-pill" data-field="v11SealBadge" data-status="UNVERIFIED" title="クリックで V1.1証明 (.v1_1.cert.json) を読込・検証（3D編集で即時剥奪）">
            <span class="v11-seal-dot"></span>
            <span data-field="v11SealText">V1.1 未刻印</span>
          </button>
          <button type="button" class="pg-btn pg-btn-grade pg-btn-plya" data-action="evaluate" title="PLYA V2.1 一括検査（THE LAST EXAM V1.1継承 · 実3D三角形BVH・起動シーケンス・制御安定・SI/ESD・量産Cpk 全24ソルバ / 256項目＆1000点採点）">
            <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>PLYA V2.1</span>
            <strong class="pg-score-pill" data-field="scoreBadge">-- / 1000</strong>
          </button>
        </div>
      </header>

      <button type="button" class="pg-viewport-alert" data-field="viewportAlert" title="クリックでPLYA V2.1 (EXAM V1.1継承) 詳細レポートを表示"></button>

      <aside class="pg-left-panel" aria-label="全パーツカタログ">
        <div class="pg-panel-head">
          <span class="pg-panel-title">全パーツライブラリ</span>
          <span class="pg-panel-meta" data-field="catalogCount">読込中...</span>
        </div>
        <div class="pg-role-chips" data-field="roleChips">${roleChipHtml}</div>
        <div class="pg-catalog-filters">
          <select class="pg-select" data-field="unitFilter"></select>
          <input type="search" class="pg-search" data-field="searchInput" placeholder="パーツ名・IDで検索 (例: lens, bionz, W01)..." />
        </div>
        <div class="pg-catalog-list" data-field="catalogList"></div>
      </aside>

      <aside class="pg-right-panel" aria-label="CADインスペクター">
        <div class="pg-live-strip" data-field="liveStrip"></div>
        <div class="pg-panel-head">
          <span class="pg-panel-title">配置ツリー &amp; 精密座標</span>
          <button type="button" class="pg-btn-mini" data-action="autoAlignOptics" title="光学系を18.0mm Eマウント基準へ自動整列">18mm自動整列</button>
        </div>
        <div class="pg-placed-list" data-field="placedList"></div>
        <div class="pg-inspector-body" data-field="inspectorBody"></div>
      </aside>

      <div class="pg-viewport-bar" role="toolbar" aria-label="3Dビューポート操作">
        <div class="pg-vbar-group">
          <button type="button" class="pg-vbar-btn" data-camview="iso" title="アイソメ図 (1)">ISO</button>
          <button type="button" class="pg-vbar-btn" data-camview="front" title="正面図 (2)">正面</button>
          <button type="button" class="pg-vbar-btn" data-camview="side" title="側面図 (3)">側面</button>
          <button type="button" class="pg-vbar-btn" data-camview="top" title="上面図 (4)">上面</button>
          <button type="button" class="pg-vbar-btn" data-camview="back" title="背面図 (5)">背面</button>
          <button type="button" class="pg-vbar-btn" data-action="fitCamera" title="全体フィット (F)">フィット</button>
        </div>
        <div class="pg-vbar-sep"></div>
        <div class="pg-vbar-group">
          <button type="button" class="pg-vbar-btn is-active" data-shade="solid" title="ソリッド表示">ソリッド</button>
          <button type="button" class="pg-vbar-btn" data-shade="xray" title="X-Ray内部透視">X-Ray</button>
          <button type="button" class="pg-vbar-btn" data-shade="wireframe" title="ワイヤーフレーム表示">ワイヤー</button>
        </div>
        <div class="pg-vbar-sep"></div>
        <div class="pg-vbar-group">
          <button type="button" class="pg-vbar-btn is-active" data-action="toggleAxis" title="光軸・18mmフランジ・光束コーン表示">光束コーン</button>
          <button type="button" class="pg-vbar-btn is-active" data-action="toggleCog" title="3D質量重心 (CoG) マーカー表示">重心CoG</button>
          <button type="button" class="pg-vbar-btn is-active" data-action="toggleDiag" title="エラー部品を赤色・注意部品を黄色で3D表示">エラー赤表示</button>
          <button type="button" class="pg-vbar-btn is-active" data-action="toggleGrid" title="ミリ基準グリッド表示">グリッド</button>
          <button type="button" class="pg-vbar-btn" data-action="toggleShortcuts" title="キーボードショートカット一覧 (?)">?</button>
        </div>
      </div>

      <nav class="pg-mobile-tabs" aria-label="モバイル切替">
        <button type="button" class="pg-mob-tab is-active" data-mob-tab="viewport">3D CAD</button>
        <button type="button" class="pg-mob-tab" data-mob-tab="catalog">パーツ庫</button>
        <button type="button" class="pg-mob-tab" data-mob-tab="inspector">座標・採点</button>
      </nav>

      <div class="pg-report-modal" data-field="reportModal" aria-hidden="true">
        <div class="pg-report-card" role="dialog" aria-modal="true" aria-label="PLYA V2.1 EXAM V1.1継承 24ソルバ / 256項目 評価レポート">
          <div class="pg-report-head">
            <div>
              <div class="pg-report-kicker">THE LAST EXAM V1.1 INHERITED ENGINE · 12 PILLARS · PLAY GROUND 1.1</div>
              <h2 class="pg-report-title">PLYA V2.1 全24ソルバ / 256項目 実3D物理検証・実機起動保証 ＆ 1,000点評価レポート</h2>
            </div>
            <button type="button" class="pg-btn pg-btn-icon" data-action="closeReport" aria-label="閉じる">
              <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="pg-report-content" data-field="reportContent"></div>
        </div>
      </div>

      <div class="pg-shortcut-modal" data-field="shortcutModal" aria-hidden="true">
        <div class="pg-shortcut-card">
          <div class="pg-shortcut-head">
            <strong>CAD STUDIO 1.1 ショートカット</strong>
            <button type="button" class="pg-btn-mini" data-action="closeShortcuts">閉じる</button>
          </div>
          <div class="pg-shortcut-grid">
            <div><kbd>W</kbd> / <kbd>G</kbd></div><div>移動ギズモ</div>
            <div><kbd>E</kbd> / <kbd>R</kbd></div><div>回転ギズモ</div>
            <div><kbd>S</kbd></div><div>拡縮ギズモ</div>
            <div><kbd>Q</kbd></div><div>World / Local 座標系切替</div>
            <div><kbd>1</kbd>–<kbd>5</kbd></div><div>ISO / 正面 / 側面 / 上面 / 背面</div>
            <div><kbd>F</kbd></div><div>全体フィット / 選択ズーム</div>
            <div><kbd>Ctrl+D</kbd></div><div>選択パーツを複製</div>
            <div><kbd>Ctrl+Z</kbd> / <kbd>Y</kbd></div><div>元に戻す / やり直す</div>
            <div><kbd>Del</kbd></div><div>選択パーツを削除</div>
            <div><kbd>?</kbd> / <kbd>Esc</kbd></div><div>ヘルプ / 閉じる</div>
          </div>
        </div>
      </div>

      <div class="pg-toast" data-field="toast"></div>
      <div class="pg-loading" data-field="loading"><span>3D CADジオメトリ抽出中...</span></div>
      <input type="file" accept=".json,application/json" style="display:none" data-field="fileInput" />
      <input type="file" accept=".json,.cert.json,application/json" style="display:none" data-field="certFileInput" />
    `;

    this.catalogListEl = this.rootEl.querySelector('[data-field="catalogList"]') as HTMLElement;
    this.catalogSearchEl = this.rootEl.querySelector('[data-field="searchInput"]') as HTMLInputElement;
    this.catalogUnitSelectEl = this.rootEl.querySelector('[data-field="unitFilter"]') as HTMLSelectElement;
    this.catalogCountEl = this.rootEl.querySelector('[data-field="catalogCount"]') as HTMLElement;
    this.roleChipsEl = this.rootEl.querySelector('[data-field="roleChips"]') as HTMLElement;
    this.placedListEl = this.rootEl.querySelector('[data-field="placedList"]') as HTMLElement;
    this.liveStripEl = this.rootEl.querySelector('[data-field="liveStrip"]') as HTMLElement;
    this.viewportAlertEl = this.rootEl.querySelector('[data-field="viewportAlert"]') as HTMLElement;
    this.inspectorBodyEl = this.rootEl.querySelector('[data-field="inspectorBody"]') as HTMLElement;
    this.reportModalEl = this.rootEl.querySelector('[data-field="reportModal"]') as HTMLElement;
    this.reportContentEl = this.rootEl.querySelector('[data-field="reportContent"]') as HTMLElement;
    this.shortcutModalEl = this.rootEl.querySelector('[data-field="shortcutModal"]') as HTMLElement;
    this.scoreBadgeEl = this.rootEl.querySelector('[data-field="scoreBadge"]') as HTMLElement;
    this.v11SealBadgeEl = this.rootEl.querySelector('[data-field="v11SealBadge"]') as HTMLButtonElement;
    this.profileSelectEl = this.rootEl.querySelector('[data-field="profileSelect"]') as HTMLSelectElement;
    this.strictnessSelectEl = this.rootEl.querySelector('[data-field="strictnessSelect"]') as HTMLSelectElement;
    this.templateSelectEl = this.rootEl.querySelector('[data-field="templateSelect"]') as HTMLSelectElement;
    this.statusToastEl = this.rootEl.querySelector('[data-field="toast"]') as HTMLElement;
    this.loadingOverlayEl = this.rootEl.querySelector('[data-field="loading"]') as HTMLElement;

    this.modeBtns.translate = this.rootEl.querySelector('[data-tmode="translate"]') as HTMLButtonElement;
    this.modeBtns.rotate = this.rootEl.querySelector('[data-tmode="rotate"]') as HTMLButtonElement;
    this.modeBtns.scale = this.rootEl.querySelector('[data-tmode="scale"]') as HTMLButtonElement;
    this.shadingBtns.solid = this.rootEl.querySelector('[data-shade="solid"]') as HTMLButtonElement;
    this.shadingBtns.xray = this.rootEl.querySelector('[data-shade="xray"]') as HTMLButtonElement;
    this.shadingBtns.wireframe = this.rootEl.querySelector('[data-shade="wireframe"]') as HTMLButtonElement;

    this.spaceBtn = this.rootEl.querySelector('[data-action="space"]') as HTMLButtonElement;
    this.snapSelectEl = this.rootEl.querySelector('[data-field="gridSnap"]') as HTMLSelectElement;
    this.rotSnapSelectEl = this.rootEl.querySelector('[data-field="rotSnap"]') as HTMLSelectElement;
    this.axisToggleBtn = this.rootEl.querySelector('[data-action="toggleAxis"]') as HTMLButtonElement;
    this.cogToggleBtn = this.rootEl.querySelector('[data-action="toggleCog"]') as HTMLButtonElement;
    this.diagToggleBtn = this.rootEl.querySelector('[data-action="toggleDiag"]') as HTMLButtonElement;
    this.gridToggleBtn = this.rootEl.querySelector('[data-action="toggleGrid"]') as HTMLButtonElement;
    this.undoBtn = this.rootEl.querySelector('[data-action="undo"]') as HTMLButtonElement;
    this.redoBtn = this.rootEl.querySelector('[data-action="redo"]') as HTMLButtonElement;
    const fileInput = this.rootEl.querySelector('[data-field="fileInput"]') as HTMLInputElement;
    this.certFileInputEl = this.rootEl.querySelector('[data-field="certFileInput"]') as HTMLInputElement;

    // Initialize fixed-pool 24-row virtualized catalog scroller (ZERO DOM rebuilds per keystroke!)
    this.initVirtualCatalog();

    // Default snap values
    this.transform.setTranslationSnap(1);
    this.transform.setRotationSnap(THREE.MathUtils.degToRad(15));

    // Topbar bindings
    this.rootEl.querySelector('[data-action="exit"]')?.addEventListener('click', () => this.close());
    (['translate', 'rotate', 'scale'] as const).forEach((m) => {
      this.modeBtns[m].addEventListener('click', () => this.setTransformMode(m));
    });
    this.spaceBtn.addEventListener('click', () => this.toggleSpace());
    this.snapSelectEl.addEventListener('change', () => {
      const v = Number(this.snapSelectEl.value);
      this.transform.setTranslationSnap(v > 0 ? v : null);
    });
    this.rotSnapSelectEl.addEventListener('change', () => {
      const v = Number(this.rotSnapSelectEl.value);
      this.transform.setRotationSnap(v > 0 ? THREE.MathUtils.degToRad(v) : null);
    });
    this.undoBtn.addEventListener('click', () => void this.undo());
    this.redoBtn.addEventListener('click', () => void this.redo());

    this.profileSelectEl.addEventListener('change', () => {
      this.setDesignProfile(this.profileSelectEl.value as CameraDesignProfile);
    });
    this.strictnessSelectEl.addEventListener('change', () => {
      this.setExamStrictness(this.strictnessSelectEl.value as ExamStrictnessMode);
    });
    this.templateSelectEl.addEventListener('change', () => {
      const tpl = this.templateSelectEl.value as PlaygroundTemplateId;
      void this.loadTemplate(tpl);
    });

    this.rootEl.querySelector('[data-action="exportJson"]')?.addEventListener('click', () => {
      this.exportBlueprintJson();
    });
    this.rootEl.querySelector('[data-action="importJson"]')?.addEventListener('click', () => {
      fileInput.click();
    });
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (file) void this.importBlueprintFile(file);
      fileInput.value = '';
    });
    this.v11SealBadgeEl.addEventListener('click', () => {
      if (this.importedV11Cert) {
        this.runPlyaPipeline(true);
      } else {
        this.certFileInputEl.click();
      }
    });
    this.certFileInputEl.addEventListener('change', () => {
      const file = this.certFileInputEl.files?.[0];
      if (file) void this.importV11CertificateFile(file);
      this.certFileInputEl.value = '';
    });
    this.rootEl.querySelector('[data-action="evaluate"]')?.addEventListener('click', () => {
      this.runPlyaPipeline(true);
    });
    this.viewportAlertEl.addEventListener('click', () => {
      this.runPlyaPipeline(true);
    });
    this.rootEl.querySelector('[data-action="autoAlignOptics"]')?.addEventListener('click', () => {
      this.autoAlignOpticalChain();
    });

    // Bottom viewport bar bindings
    this.rootEl.querySelectorAll<HTMLButtonElement>('[data-camview]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setCameraView(btn.dataset.camview as PlaygroundCameraView);
      });
    });
    this.rootEl.querySelector('[data-action="fitCamera"]')?.addEventListener('click', () => {
      this.fitCameraToWorkspace();
    });
    (['solid', 'xray', 'wireframe'] as const).forEach((sm) => {
      this.shadingBtns[sm].addEventListener('click', () => this.setShadingMode(sm));
    });
    this.axisToggleBtn.addEventListener('click', () => {
      this.showOpticalAxis = !this.showOpticalAxis;
      this.axisToggleBtn.classList.toggle('is-active', this.showOpticalAxis);
      this.staticOverlayDirty = true;
      this.rebuildOverlayLines(true);
      this.host.requestRender();
    });
    this.cogToggleBtn.addEventListener('click', () => {
      this.showCogMarker = !this.showCogMarker;
      this.cogToggleBtn.classList.toggle('is-active', this.showCogMarker);
      this.rebuildOverlayLines(false);
      this.host.requestRender();
    });
    this.diagToggleBtn.addEventListener('click', () => {
      this.showDiagnostics3D = !this.showDiagnostics3D;
      this.diagToggleBtn.classList.toggle('is-active', this.showDiagnostics3D);
      this.applyAllVisualMaterials(false);
      this.rebuildOverlayLines(false);
      this.host.requestRender();
    });
    this.gridToggleBtn.addEventListener('click', () => {
      this.showGrid = !this.showGrid;
      this.gridToggleBtn.classList.toggle('is-active', this.showGrid);
      this.staticOverlayDirty = true;
      this.rebuildOverlayLines(true);
      this.host.requestRender();
    });
    this.rootEl.querySelector('[data-action="toggleShortcuts"]')?.addEventListener('click', () => {
      const open = !this.shortcutModalEl.classList.contains('is-open');
      this.shortcutModalEl.classList.toggle('is-open', open);
      this.shortcutModalEl.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
    this.rootEl.querySelector('[data-action="closeShortcuts"]')?.addEventListener('click', () => {
      this.shortcutModalEl.classList.remove('is-open');
      this.shortcutModalEl.setAttribute('aria-hidden', 'true');
    });
    this.shortcutModalEl.addEventListener('click', (e) => {
      if (e.target === this.shortcutModalEl) {
        this.shortcutModalEl.classList.remove('is-open');
        this.shortcutModalEl.setAttribute('aria-hidden', 'true');
      }
    });

    // Report modal close
    this.rootEl.querySelector('[data-action="closeReport"]')?.addEventListener('click', () => {
      this.closeEvaluationReport();
    });
    this.reportModalEl.addEventListener('click', (e) => {
      if (e.target === this.reportModalEl) this.closeEvaluationReport();
    });

    // Left catalog filters + role chips
    this.roleChipsEl.querySelectorAll<HTMLButtonElement>('[data-role-chip]').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.activeRoleChip = chip.dataset.roleChip as RoleFilterKey;
        this.roleChipsEl.querySelectorAll('.pg-role-chip').forEach((el) => {
          el.classList.toggle('is-active', el === chip);
        });
        this.renderCatalogList();
      });
    });
    this.catalogUnitSelectEl.addEventListener('change', () => {
      this.activeFilterUnit = this.catalogUnitSelectEl.value;
      this.renderCatalogList();
    });
    this.catalogSearchEl.addEventListener('input', () => {
      this.activeSearch = this.catalogSearchEl.value.trim().toLowerCase();
      this.renderCatalogList();
    });

    // Mobile tab switcher
    this.rootEl.querySelectorAll<HTMLButtonElement>('[data-mob-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.mobileTab = btn.dataset.mobTab as 'viewport' | 'catalog' | 'inspector';
        this.rootEl.dataset.mobileTab = this.mobileTab;
        this.rootEl.querySelectorAll('[data-mob-tab]').forEach((b) => {
          b.classList.toggle('is-active', b === btn);
        });
      });
    });

    this.renderPlacedList();
    this.renderInspector();
  }

  private initVirtualCatalog(): void {
    this.catalogListEl.innerHTML = '';
    const spacer = document.createElement('div');
    spacer.className = 'pg-cat-virtual-spacer';
    this.catalogListEl.appendChild(spacer);
    this.catalogSpacerEl = spacer;
    this.catalogPool = [];

    for (let i = 0; i < CATALOG_POOL_SIZE; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pg-cat-item pg-cat-vrow';
      btn.style.visibility = 'hidden';
      btn.style.transform = 'translate3d(0, -9999px, 0)';

      const swatch = document.createElement('span');
      swatch.className = 'pg-cat-swatch';
      const info = document.createElement('span');
      info.className = 'pg-cat-info';
      const titleEl = document.createElement('span');
      titleEl.className = 'pg-cat-title';
      const titleText = document.createTextNode('');
      titleEl.appendChild(titleText);
      const subEl = document.createElement('span');
      subEl.className = 'pg-cat-sub';
      const subText = document.createTextNode('');
      subEl.appendChild(subText);
      info.append(titleEl, subEl);
      const addEl = document.createElement('span');
      addEl.className = 'pg-cat-add';
      addEl.textContent = '+';

      btn.append(swatch, info, addEl);
      spacer.appendChild(btn);
      this.catalogPool.push({
        btn,
        swatch,
        titleText,
        subText,
        visible: false,
        topPx: -9999,
        boundKey: '',
      });
    }

    // Single delegated click listener for all 2,404 catalog items!
    this.catalogListEl.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>('.pg-cat-item');
      const key = target?.dataset.pgKey;
      if (key) void this.spawnPart(key);
    });

    this.catalogListEl.addEventListener(
      'scroll',
      () => {
        const st = this.catalogListEl.scrollTop;
        this.lastCatalogScrollTop = st;
        this.renderVisibleCatalogRows(st);
      },
      { passive: true }
    );
  }

  public isOpen(): boolean {
    return this.active;
  }

  public getPlaygroundMotionStage(): PlaygroundMotionStage {
    return this.pgMotionStage;
  }

  public getCameraZoomBounds(): { minDistance: number; maxDistance: number; distance: number } {
    return {
      minDistance: this.orbit.minDistance,
      maxDistance: this.orbit.maxDistance,
      distance: this.camera.position.distanceTo(this.orbit.target),
    };
  }

  public setPlaygroundMotionStage(stage: PlaygroundMotionStage): boolean {
    if (stage === this.pgMotionStage) return false;
    this.pgMotionStage = stage;
    if (this.opaqueMegaBatch && this.shadingMode === 'solid') {
      this.opaqueMegaBatch.material = this.getCurrentBatchMaterial(false);
    }
    if (this.glassMegaBatch) {
      this.glassMegaBatch.visible = this.glassUsedInst > 0 && stage !== 'fast';
    }
    // Cap pixelRatio dynamically (1.0 during motion, crisp settledDpr on stop!)
    const nativeDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const settledDpr = this.isSoftwareGl ? 1.0 : Math.min(nativeDpr, 1.35);
    const targetDpr = stage === 'sharp' ? settledDpr : 1.0;
    if (Math.abs(targetDpr - this.activePgPixelRatio) > 0.01) {
      this.activePgPixelRatio = targetDpr;
      this.host.renderer.setPixelRatio(targetDpr);
    }
    return true;
  }

  private ensurePgFastBlitResources(cssW: number, cssH: number): boolean {
    if (!this.host.renderer.capabilities.isWebGL2) return false;
    if (!this.pgBlitScene) {
      this.pgBlitScene = new THREE.Scene();
      this.pgBlitCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      this.pgBlitGeo = new THREE.BufferGeometry();
      this.pgBlitGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
      );
      this.pgBlitGeo.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2)
      );
      this.pgBlitMat = this.pgCache.acquirePostProcessMaterial('fast_blit');
      this.pgBlitQuad = new THREE.Mesh(this.pgBlitGeo, this.pgBlitMat);
      this.pgBlitQuad.frustumCulled = false;
      this.pgBlitScene.add(this.pgBlitQuad);
    }
    const fw = Math.max(64, Math.round(cssW * 0.55));
    const fh = Math.max(64, Math.round(cssH * 0.55));
    if (fw !== this.pgFastW || fh !== this.pgFastH || !this.pgFastTarget) {
      if (this.pgFastTarget) {
        this.pgFastTarget.dispose();
        this.pgFastTarget = null;
      }
      this.pgFastW = fw;
      this.pgFastH = fh;
      this.pgFastTarget = new THREE.WebGLRenderTarget(fw, fh, {
        type: THREE.UnsignedByteType,
        format: THREE.RGBAFormat,
        colorSpace: THREE.SRGBColorSpace,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: true,
        stencilBuffer: false,
        samples: 0,
      });
    }
    return true;
  }

  private disposePgFastBlitResources(): void {
    if (this.pgFastTarget) {
      this.pgFastTarget.dispose();
      this.pgFastTarget = null;
    }
    this.pgFastW = 0;
    this.pgFastH = 0;
    if (this.pgBlitMat) {
      this.pgCache.releaseMaterialInstance(this.pgBlitMat);
      this.pgBlitMat = null;
    }
    if (this.pgBlitGeo) {
      this.pgBlitGeo.dispose();
      this.pgBlitGeo = null;
    }
    this.pgBlitQuad = null;
    this.pgBlitScene = null;
    this.pgBlitCamera = null;
  }

  private updatePgDynamicClipPlanes(): void {
    const dist = Math.max(this.orbit.minDistance, this.camera.position.distanceTo(this.orbit.target));
    const targetNear = THREE.MathUtils.clamp(dist * 0.015, 0.08, 4.0);
    if (Math.abs(targetNear - this.camera.near) / Math.max(0.05, this.camera.near) > 0.04) {
      this.camera.near = targetNear;
      this.camera.updateProjectionMatrix();
    }
  }

  public async open(): Promise<void> {
    if (this.active) return;
    const session = ++this.openSessionToken;
    this.active = true;
    this.rootEl.classList.add('is-open');
    this.rootEl.setAttribute('aria-hidden', 'false');

    // Save host renderer state & optimize pixelRatio/shadowMap/toneMapping for Play Ground!
    this.savedShadowEnabled = this.host.renderer.shadowMap.enabled;
    this.savedToneMapping = this.host.renderer.toneMapping;
    this.savedPixelRatio = this.host.renderer.getPixelRatio();
    this.host.renderer.shadowMap.enabled = false;
    this.host.renderer.toneMapping = THREE.NoToneMapping;

    const nativeDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    this.activePgPixelRatio = this.isSoftwareGl ? 1.0 : Math.min(nativeDpr, 1.35);
    this.host.renderer.setPixelRatio(this.activePgPixelRatio);

    this.pgMotionStage = 'sharp';
    this.prevPgCamInit = false;
    this.pgFastCooldown = 0;
    this.orbit.enabled = true;
    this.transform.enabled = true;
    this.handleResize();

    // Demand-Driven Zero-Load + 3-Stage Adaptive PG_SHARP <-> PG_LITE <-> PG_FAST Loop!
    this.host.setCustomSceneRenderer((renderer, dt) => {
      const moved = this.orbit.update();

      let camMoved = moved;
      let motionScore = 0;
      if (this.prevPgCamInit) {
        const posDelta = this.camera.position.distanceTo(this.prevPgCamPos);
        const camDist = Math.max(1.0, this.camera.position.distanceTo(this.orbit.target));
        const clampedDot = Math.min(1, Math.abs(this.camera.quaternion.dot(this.prevPgCamQuat)));
        const angDelta = 2 * Math.acos(clampedDot);
        if (posDelta > 1e-3 || angDelta > 1e-4) {
          camMoved = true;
          const dtSafe = Math.max(0.008, dt);
          motionScore = Math.max(angDelta / dtSafe / 1.45, posDelta / camDist / dtSafe / 1.15);
        }
      } else {
        this.prevPgCamInit = true;
      }
      this.prevPgCamPos.copy(this.camera.position);
      this.prevPgCamQuat.copy(this.camera.quaternion);

      if (camMoved) {
        this.updatePgDynamicClipPlanes();
        const violent =
          motionScore >= 1.45 || (motionScore >= 0.72 && this.pgEmaRenderMs > 26.0);
        const calmed = motionScore < 0.75 && this.pgEmaRenderMs < 28.0;
        if (violent) {
          this.setPlaygroundMotionStage('fast');
          this.pgFastCooldown = 3;
        } else if (this.pgMotionStage === 'fast') {
          if (this.pgFastCooldown > 0) this.pgFastCooldown--;
          else if (calmed) this.setPlaygroundMotionStage('lite');
        } else {
          this.setPlaygroundMotionStage('lite');
        }
      } else if (this.pgMotionStage !== 'sharp') {
        this.pgFastCooldown = 0;
        this.setPlaygroundMotionStage('sharp');
      }

      const r0 = typeof performance !== 'undefined' ? performance.now() : 0;
      if (
        this.pgMotionStage === 'fast' &&
        this.shadingMode === 'solid' &&
        this.ensurePgFastBlitResources(
          Math.max(1, this.host.container.clientWidth),
          Math.max(1, this.host.container.clientHeight)
        ) &&
        this.pgFastTarget &&
        this.pgBlitScene &&
        this.pgBlitCamera &&
        this.pgBlitMat
      ) {
        renderer.setRenderTarget(this.pgFastTarget);
        renderer.clear(true, true, false);
        renderer.render(this.scene, this.camera);
        this.pgBlitMat.uniforms.tDiffuse.value = this.pgFastTarget.texture;
        renderer.setRenderTarget(null);
        renderer.render(this.pgBlitScene, this.pgBlitCamera);
      } else {
        renderer.render(this.scene, this.camera);
      }
      const r1 = typeof performance !== 'undefined' ? performance.now() : 0;
      this.pgEmaRenderMs = this.pgEmaRenderMs * 0.78 + (r1 - r0) * 0.22;

      return camMoved || this.pgMotionStage !== 'sharp';
    });

    const dom = this.host.renderer.domElement;
    dom.addEventListener('pointerdown', this.boundPointerDown);
    dom.addEventListener('pointerup', this.boundPointerUp);
    window.addEventListener('keydown', this.boundKeyDown, true);
    window.addEventListener('resize', this.boundResize);

    const { units, entries } = await this.extractor.ensureCatalogLoaded();
    if (session !== this.openSessionToken || !this.active) return;
    if (this.filteredIndices.length < entries.length) {
      this.filteredIndices = new Int32Array(entries.length);
    }
    this.populateUnitFilter(units, entries.length);
    this.renderCatalogList();

    if (this.placed.length === 0) {
      await this.loadTemplate('a7iv');
      if (session !== this.openSessionToken || !this.active) return;
    } else {
      this.refreshLiveBadge(false);
    }
    this.host.requestRender();
  }

  public close(): void {
    if (!this.active) return;
    this.openSessionToken++;
    this.active = false;
    this.historyBusy = false;
    if (this.deferredRenderTimer) {
      window.clearTimeout(this.deferredRenderTimer);
      this.deferredRenderTimer = 0;
    }
    if (this.toastTimer) {
      window.clearTimeout(this.toastTimer);
      this.toastTimer = 0;
    }
    this.closeEvaluationReport();
    this.shortcutModalEl.classList.remove('is-open');
    this.shortcutModalEl.setAttribute('aria-hidden', 'true');
    this.rootEl.classList.remove('is-open');
    this.rootEl.setAttribute('aria-hidden', 'true');
    this.orbit.enabled = false;
    this.transform.enabled = false;
    this.transform.detach();
    if (this.transformHelper.parent === this.scene) {
      this.scene.remove(this.transformHelper);
    }
    this.setPlaygroundMotionStage('sharp');
    this.disposePgFastBlitResources();

    // Restore host renderer state (including exact DPR!)
    this.host.renderer.shadowMap.enabled = this.savedShadowEnabled;
    this.host.renderer.toneMapping = this.savedToneMapping;
    this.host.renderer.setPixelRatio(this.savedPixelRatio);
    const w = Math.max(1, this.host.container.clientWidth);
    const h = Math.max(1, this.host.container.clientHeight);
    this.host.renderer.setSize(w, h);

    const dom = this.host.renderer.domElement;
    dom.removeEventListener('pointerdown', this.boundPointerDown);
    dom.removeEventListener('pointerup', this.boundPointerUp);
    window.removeEventListener('keydown', this.boundKeyDown, true);
    window.removeEventListener('resize', this.boundResize);

    this.host.setCustomSceneRenderer(null);
    this.host.onClosePlayground();
  }

  private handleResize(): void {
    const w = Math.max(1, this.host.container.clientWidth);
    const h = Math.max(1, this.host.container.clientHeight);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.cachedCanvasRect = this.host.renderer.domElement.getBoundingClientRect();
    this.host.requestRender();
  }

  public setDesignProfile(profile: CameraDesignProfile): CameraEngineeringReport {
    this.designProfile = profile;
    this.profileSelectEl.value = profile;
    const rep = this.runEngineeringEvaluation();
    if (this.reportModalEl.classList.contains('is-open')) {
      this.renderReportModal(rep);
    }
    this.showToast(`設計目標プロファイル: ${CAMERA_PROFILE_LABELS[profile]}`);
    return rep;
  }

  public setExamStrictness(mode: ExamStrictnessMode): CameraEngineeringReport {
    this.examStrictness = mode;
    if (this.strictnessSelectEl) this.strictnessSelectEl.value = mode;
    const rep = this.runEngineeringEvaluation(true);
    if (this.reportModalEl.classList.contains('is-open')) {
      this.renderReportModal(rep, this.lastPlyaReport);
    }
    this.showToast(
      mode === 'exam_strict'
        ? 'PLYA V2.1: EXAM極限モード（THE LAST EXAM V1.1厳格閾値）へ切替'
        : 'PLYA V2.1: 標準設計モードへ切替'
    );
    return rep;
  }

  public applyExamAutoRepair(): number {
    if (!this.lastPlyaReport) {
      this.runEngineeringEvaluation(true);
    }
    const shifts = this.lastPlyaReport?.deepReport.overlays.repairShiftsMm;
    if (!shifts) {
      this.showToast('自動修復対象の浮き・干渉シフトはありません');
      return 0;
    }
    let repairedCount = 0;
    for (let i = 0; i < this.placed.length; i++) {
      const inst = this.placed[i];
      if (inst.locked) continue;
      const vec = shifts[inst.uid];
      if (!vec) continue;
      if (Math.abs(vec[0]) < 0.01 && Math.abs(vec[1]) < 0.01 && Math.abs(vec[2]) < 0.01) continue;
      inst.anchor.position.x += vec[0];
      inst.anchor.position.y += vec[1];
      inst.anchor.position.z += vec[2];
      inst.anchor.updateMatrixWorld();
      inst.transformEpoch++;
      this.syncInstanceMatrix(inst);
      repairedCount++;
    }
    if (repairedCount === 0) {
      this.showToast('ロックされていない修復対象パーツがありません');
      return 0;
    }
    this.markSceneDirty();
    this.pushHistorySnapshot();
    this.refreshInspectorValues();
    const rep = this.runEngineeringEvaluation(true);
    if (this.reportModalEl.classList.contains('is-open')) {
      this.renderReportModal(rep, this.lastPlyaReport);
    }
    const plya = this.lastPlyaReport;
    this.showToast(
      `EXAM自動修復完了: ${repairedCount}部品を着座/分離 → ${rep.totalScore}/1000 (${plya ? `${plya.assertionPassCount}/${plya.assertionTotalCount}` : '--'}項目PASS)`
    );
    this.host.requestRender();
    return repairedCount;
  }

  private initExamWorker(): void {
    if (typeof Worker === 'undefined') return;
    try {
      const worker = new Worker(new URL('./exam_core/ExamPlaygroundWorker.ts', import.meta.url), {
        type: 'module',
      });
      worker.onmessage = (ev: MessageEvent<ExamWorkerResponse>) => {
        const { epoch, report } = ev.data;
        // Drop stale responses if user kept moving parts or synchronous eval already superseded it
        if (epoch !== this.workerRequestEpoch || this.lastEvaluatedEpoch === this.sceneEpoch) return;
        const snaps = this.buildSnapshots();
        const plya = buildPlyaReportFromDeepPhysics(snaps, this.designProfile, report);
        this.applyPlyaReport(plya, snaps, true);
        if (this.reportModalEl.classList.contains('is-open')) {
          this.renderReportModal(plya.engineeringReport, plya);
        }
      };
      worker.onerror = () => {
        // Fallback gracefully to synchronous evaluation if module worker fails
        this.examWorker = null;
      };
      this.examWorker = worker;
    } catch {
      this.examWorker = null;
    }
  }

  private scheduleWorkerEvaluation(): void {
    if (!this.examWorker || !this.active || this.placed.length === 0) return;
    if (this.workerDebounceTimer) {
      window.clearTimeout(this.workerDebounceTimer);
    }
    this.workerDebounceTimer = window.setTimeout(() => {
      this.workerDebounceTimer = 0;
      if (!this.examWorker || !this.active || this.lastEvaluatedEpoch === this.sceneEpoch) return;
      const snaps = this.buildSnapshots();
      const serialized = serializeSnapshotsForExamEngine(snaps);
      const epoch = ++this.workerRequestEpoch;
      const req: ExamWorkerRequest = {
        epoch,
        strictness: this.examStrictness,
        parts: serialized,
        webCtx: {
          isOnline: typeof navigator !== 'undefined' ? navigator.onLine !== false : true,
          webgl2: this.host.renderer.capabilities.isWebGL2,
          totalTriangles: this.estimateSceneTriangles(),
        },
      };
      this.examWorker.postMessage(req);
    }, 140);
  }

  public setShadingMode(mode: PlaygroundShadingMode): void {
    this.shadingMode = mode;
    (['solid', 'xray', 'wireframe'] as const).forEach((sm) => {
      this.shadingBtns[sm].classList.toggle('is-active', sm === mode);
    });
    this.applyAllVisualMaterials(false);
    this.host.requestRender();
  }

  /**
   * O(changed) Zero-Material-Swap 3D Shading + Vivid Electric-Blue Selection + Error/Warning Highlight:
   *  - Swaps material ONCE on the 2 MegaBatches for solid/xray/wireframe/fast.
   *  - Encodes per-instance Vivid Blue Selection, Red Error, Amber Warning, and combined Selected+Error/Warn
   *    directly into BatchedMesh Float32 `_colorsTexture` with diff-skip -> 0 redundant uploads!
   */
  private applyAllVisualMaterials(forceColor = false): void {
    if (this.opaqueMegaBatch) {
      const mat = this.getCurrentBatchMaterial(false);
      if (this.opaqueMegaBatch.material !== mat) this.opaqueMegaBatch.material = mat;
    }
    if (this.glassMegaBatch) {
      const mat = this.getCurrentBatchMaterial(true);
      if (this.glassMegaBatch.material !== mat) this.glassMegaBatch.material = mat;
    }

    const diagMap = this.showDiagnostics3D ? this.lastReport?.partDiagnostics : undefined;
    const selUid = this.selectedUid;
    for (let i = 0; i < this.placed.length; i++) {
      const inst = this.placed[i];
      const flag = diagMap?.get(inst.uid);
      const isSel = inst.uid === selUid;
      const sev = flag?.severity;
      const code = isSel
        ? sev === 'error'
          ? 5
          : sev === 'warn'
            ? 4
            : 3
        : sev === 'error'
          ? 2
          : sev === 'warn'
            ? 1
            : 0;
      if (!forceColor && inst.lastColorCode === code) continue;
      inst.lastColorCode = code;

      const col =
        code === 5
          ? _pgErrorSelectColor
          : code === 4
            ? _pgWarnSelectColor
            : code === 3
              ? _pgSelectColor
              : code === 2
                ? _pgErrorColor
                : code === 1
                  ? _pgWarnColor
                  : _pgNormalColor;
      if (this.opaqueMegaBatch && inst.opaqueBatchId >= 0) {
        this.opaqueMegaBatch.setColorAt(inst.opaqueBatchId, col);
      }
      if (this.glassMegaBatch && inst.glassBatchId >= 0) {
        this.glassMegaBatch.setColorAt(inst.glassBatchId, col);
      }
    }
  }

  private computeWorkspaceBounds(outBox: THREE.Box3): THREE.Box3 {
    if (this.placed.length === 0) {
      return outBox.set(new THREE.Vector3(-60, -40, -40), new THREE.Vector3(60, 50, 65));
    }
    if (this.partsGroupMatrixDirty) {
      this.partsGroup.updateMatrixWorld(true);
      this.partsGroupMatrixDirty = false;
    }
    outBox.makeEmpty();
    for (let i = 0; i < this.placed.length; i++) {
      computeInstanceWorldBoxInto(this.placed[i], _pgTmpBox);
      outBox.union(_pgTmpBox);
    }
    return outBox;
  }

  public setCameraView(view: PlaygroundCameraView): void {
    const box = this.computeWorkspaceBounds(new THREE.Box3());
    box.getCenter(_pgTmpCenter);
    box.getSize(_pgTmpSize);
    const dist = Math.max(115, _pgTmpSize.length() * 1.48);

    this.orbit.target.copy(_pgTmpCenter);
    if (view === 'iso') {
      this.camera.position.set(
        _pgTmpCenter.x - dist * 0.62,
        _pgTmpCenter.y + dist * 0.36,
        _pgTmpCenter.z + dist * 0.74
      );
    } else if (view === 'front') {
      this.camera.position.set(_pgTmpCenter.x, _pgTmpCenter.y + 4, _pgTmpCenter.z + dist * 1.05);
    } else if (view === 'side') {
      this.camera.position.set(_pgTmpCenter.x - dist * 1.08, _pgTmpCenter.y + 4, _pgTmpCenter.z);
    } else if (view === 'top') {
      this.camera.position.set(_pgTmpCenter.x, _pgTmpCenter.y + dist * 1.15, _pgTmpCenter.z + 10);
    } else {
      this.camera.position.set(_pgTmpCenter.x, _pgTmpCenter.y + 4, _pgTmpCenter.z - dist * 1.05);
    }
    this.orbit.update();
    this.updatePgDynamicClipPlanes();
    this.host.requestRender();
  }

  private populateUnitFilter(
    units: readonly { unitId: string; nameJa: string; count: number }[],
    totalParts: number
  ): void {
    if (this.catalogUnitSelectEl.options.length > 0) return;
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = `全ユニット (${totalParts}パーツ)`;
    this.catalogUnitSelectEl.appendChild(allOpt);
    for (const u of units) {
      const opt = document.createElement('option');
      opt.value = u.unitId;
      opt.textContent = `${u.nameJa} (${u.count})`;
      this.catalogUnitSelectEl.appendChild(opt);
    }
  }

  /**
   * Zero-Allocation Flat-Index Catalog Filter + Fixed-Pool 24-Row Virtualizer (~0.1ms for 2,404 parts!).
   */
  private renderCatalogList(): void {
    const all = this.extractor.getAllEntries();
    const n = all.length;
    if (this.filteredIndices.length < n) {
      this.filteredIndices = new Int32Array(n);
    }

    const masks = this.extractor.roleChipMasks;
    const uIndices = this.extractor.unitIndices;
    const haystacks = this.extractor.searchHaystacks;
    const chipBit = PG_ROLE_CHIP_BITS[this.activeRoleChip];
    const targetUnitIdx =
      this.activeFilterUnit === 'all' ? -1 : this.extractor.getUnitIndex(this.activeFilterUnit);
    const q = this.activeSearch;
    const hasQ = q.length > 0;

    let count = 0;
    const out = this.filteredIndices;
    for (let i = 0; i < n; i++) {
      if ((masks[i] & chipBit) === 0) continue;
      if (targetUnitIdx !== -1 && uIndices[i] !== targetUnitIdx) continue;
      if (hasQ && !haystacks[i].includes(q)) continue;
      out[count++] = i;
    }

    this.filteredCount = count;
    const countText = `${count} / ${n}件`;
    if (countText !== this.lastCatalogCountText) {
      this.lastCatalogCountText = countText;
      this.catalogCountEl.textContent = countText;
    }
    const nextHeight = count * CATALOG_ROW_HEIGHT;
    if (nextHeight !== this.lastSpacerHeight) {
      this.lastSpacerHeight = nextHeight;
      this.catalogSpacerEl.style.height = `${nextHeight}px`;
    }
    if (this.lastCatalogScrollTop !== 0) {
      this.catalogListEl.scrollTop = 0;
      this.lastCatalogScrollTop = 0;
    }
    // Pass known scrollTop=0 directly so Chrome NEVER performs forced synchronous layout reflow!
    this.renderVisibleCatalogRows(0);
  }

  private renderVisibleCatalogRows(overrideScrollTop?: number): void {
    const all = this.extractor.getAllEntries();
    const count = this.filteredCount;
    const scrollTop = overrideScrollTop !== undefined ? overrideScrollTop : this.catalogListEl.scrollTop;
    const startIdx = Math.max(0, Math.floor(scrollTop / CATALOG_ROW_HEIGHT) - 2);
    const pool = this.catalogPool;

    for (let s = 0; s < pool.length; s++) {
      const slot = pool[s];
      const fi = startIdx + s;
      if (fi >= count) {
        if (slot.visible) {
          slot.btn.style.visibility = 'hidden';
          slot.btn.style.transform = 'translate3d(0, -9999px, 0)';
          slot.visible = false;
          slot.topPx = -9999;
        }
        continue;
      }

      const entry = all[this.filteredIndices[fi]];
      const topPx = fi * CATALOG_ROW_HEIGHT;
      if (!slot.visible) {
        slot.btn.style.visibility = 'visible';
        slot.visible = true;
      }
      if (slot.topPx !== topPx) {
        slot.btn.style.transform = `translate3d(0, ${topPx}px, 0)`;
        slot.topPx = topPx;
      }
      if (slot.boundKey !== entry.key) {
        slot.boundKey = entry.key;
        slot.btn.dataset.pgKey = entry.key;
        slot.swatch.style.background = entry.swatchColor;
        slot.titleText.nodeValue = entry.title;
        slot.subText.nodeValue = `${entry.unitId.toUpperCase()} · ${entry.category}`;
      }
    }
  }

  private showToast(msg: string): void {
    this.statusToastEl.textContent = msg;
    this.statusToastEl.classList.add('is-visible');
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      this.statusToastEl.classList.remove('is-visible');
    }, 2400);
  }

  private setLoading(loading: boolean): void {
    this.loadingOverlayEl.classList.toggle('is-visible', loading);
  }

  private createPlacedInstanceSync(
    blueprint: ExtractedPartBlueprint,
    uid: string,
    overridePos?: [number, number, number],
    overrideRot?: [number, number, number],
    overrideScale?: [number, number, number],
    hidden = false,
    locked = false
  ): PlacedInstance {
    const anchor = new THREE.Object3D();
    anchor.name = `pg_part_${uid}`;
    anchor.userData.pgInstanceId = uid;

    if (overridePos) {
      anchor.position.set(overridePos[0], overridePos[1], overridePos[2]);
    } else {
      const nc = blueprint.naturalCenter;
      anchor.position.set(
        Math.abs(nc.x) < 160 ? nc.x : 0,
        Math.abs(nc.y) < 120 ? nc.y : 0,
        Math.abs(nc.z) < 180 ? nc.z : 0
      );
    }
    if (overrideRot) anchor.rotation.set(overrideRot[0], overrideRot[1], overrideRot[2]);
    if (overrideScale) anchor.scale.set(overrideScale[0], overrideScale[1], overrideScale[2]);
    anchor.visible = !hidden;

    this.partsGroup.add(anchor);
    this.partsGroupMatrixDirty = true;
    const inst: PlacedInstance = {
      uid,
      entry: blueprint.entry,
      blueprint,
      anchor,
      opaqueBatchId: -1,
      glassBatchId: -1,
      hidden,
      locked,
      invMatrix: new THREE.Matrix4(),
      transformEpoch: 1,
      invMatrixEpoch: -1,
      lastColorCode: -1,
      cachedSnap: {
        uid,
        entry: blueprint.entry,
        worldBox: new THREE.Box3(),
        worldCenter: new THREE.Vector3(),
        worldSize: new THREE.Vector3(),
        position: new THREE.Vector3(),
        rotationEuler: new THREE.Euler(),
        scale: new THREE.Vector3(1, 1, 1),
      },
    };
    this.placed.push(inst);
    return inst;
  }

  public async spawnPart(
    key: string,
    overridePos?: [number, number, number],
    overrideRot?: [number, number, number],
    overrideScale?: [number, number, number],
    recordHistory = true,
    hidden = false,
    locked = false
  ): Promise<PlacedInstance | null> {
    const cached = this.extractor.getBlueprintSync(key);
    if (!cached) this.setLoading(true);
    try {
      const blueprint = cached ?? (await this.extractor.getBlueprint(key));
      if (!blueprint) return null;

      const uid = `pg_${this.uidSeq++}`;
      const inst = this.createPlacedInstanceSync(
        blueprint,
        uid,
        overridePos,
        overrideRot,
        overrideScale,
        hidden,
        locked
      );
      this.attachInstanceToMegaBatches(inst);
      this.markSceneDirty();
      this.selectInstance(uid);

      if (recordHistory) {
        this.pushHistorySnapshot();
        this.showToast(`配置: ${blueprint.entry.title}`);
      }
      this.renderPlacedList();
      this.refreshLiveBadge(false);
      this.host.requestRender();
      return inst;
    } finally {
      if (!cached) this.setLoading(false);
    }
  }

  public async loadTemplate(templateId: PlaygroundTemplateId): Promise<void> {
    this.templateSelectEl.value = templateId;
    if (templateId === 'empty') {
      this.clearAllParts(true);
      return;
    }

    this.setLoading(true);
    try {
      await this.extractor.ensureCatalogLoaded();
      const entries = this.extractor.getAllEntries();
      const pick = (unitId: string, hints: string[]): CatalogPartEntry | undefined => {
        const list = entries.filter((e) => e.unitId === unitId);
        for (const h of hints) {
          const found = list.find((e) => `${e.partId} ${e.title}`.toLowerCase().includes(h.toLowerCase()));
          if (found) return found;
        }
        return list[0];
      };
      const byId = (unitId: string, id: string, fallbackHints: string[]): CatalogPartEntry | undefined => {
        const exact = entries.find((e) => e.unitId === unitId && e.partId === id);
        return exact ?? pick(unitId, fallbackHints);
      };

      type PlanItem = {
        entry?: CatalogPartEntry;
        pos: [number, number, number];
        rot?: [number, number, number];
        scale?: [number, number, number];
      };

      let plan: PlanItem[] = [];
      let toastLabel = '';

      if (templateId === 'a7iv') {
        toastLabel = 'α7 IV 一眼ミラーレス構成';
        plan = [
          { entry: byId('body', 'body-mg-front-shell', ['mg-front', 'chassis']), pos: [0, 0, -2] },
          { entry: byId('body', 'body-top-deck', ['top-deck', 'トップ']), pos: [0, 42, -4] },
          { entry: byId('mount', 'mount-flange-ring', ['flange', 'bayonet']), pos: [0, 0, 18] },
          { entry: byId('lens', 'lens-front-cell-mount', ['front-cell', 'barrel']), pos: [0, 0, 44] },
          { entry: byId('lens', 'lens-front-xa', ['front-xa', '前玉']), pos: [0, 0, 62] },
          { entry: byId('shutter', 'shutter-curtain-1', ['curtain', '幕']), pos: [0, 0, 10] },
          { entry: pick('sensor', ['stacked', 'cmos', 'photodiode']), pos: [0, 0, 0] },
          { entry: byId('mainboard', 'mb-vapor-chamber', ['vapor', 'graphite']), pos: [0, 0, -10] },
          { entry: byId('mainboard', 'mb-sigma-graphite', ['sigma', 'graphite', 'sheet']), pos: [0, 0, -14] },
          { entry: pick('mainboard', ['hdi', 'pcb', 'substrate']), pos: [0, 0, -19] },
          { entry: byId('bionz', 'xr-nickel-cu-ihs', ['ihs', 'package']), pos: [14, 2, -26], rot: [Math.PI / 2, 0, 0] },
          { entry: byId('battery', 'bat-outer-shell-front', ['outer-shell', 'cell']), pos: [-56, -4, 4] },
          { entry: byId('cfexpress', 'cfe-top-metal-armor', ['top-metal', 'armor']), pos: [50, -2, -16] },
          { entry: byId('evf', 'evf-eyecup', ['eyecup', 'oled']), pos: [0, 44, -22] },
          { entry: byId('lcd', 'lcd-ips-panel', ['ips-panel', 'panel']), pos: [0, -4, -38] },
          { entry: byId('mishoe', 'mi-shoe-shell-plate', ['shell-plate', 'rail']), pos: [0, 58, 2] },
          { entry: byId('mic', 'mc-top-grille-holes', ['grille', 'capsule']), pos: [0, 68, 12] },
        ];
      } else if (templateId === 'zve1') {
        toastLabel = 'ZV-E1 コンパクトVLOG構成（EVFレス・電子シャッター）';
        plan = [
          { entry: byId('body', 'body-mg-front-shell', ['mg-front', 'chassis']), pos: [0, 0, -2], scale: [0.9, 0.88, 0.9] },
          { entry: byId('mount', 'mount-flange-ring', ['flange', 'bayonet']), pos: [0, 0, 18] },
          { entry: byId('lens', 'lens-front-xa', ['front-xa', '前玉']), pos: [0, 0, 40], scale: [0.85, 0.85, 0.85] },
          { entry: pick('sensor', ['stacked', 'cmos', 'photodiode']), pos: [0, 0, 0] },
          { entry: byId('mainboard', 'mb-vapor-chamber', ['vapor', 'graphite']), pos: [0, 0, -10] },
          { entry: pick('mainboard', ['hdi', 'pcb', 'substrate']), pos: [0, 0, -18] },
          { entry: byId('bionz', 'xr-nickel-cu-ihs', ['ihs', 'package']), pos: [12, 0, -25], rot: [Math.PI / 2, 0, 0] },
          { entry: byId('battery', 'bat-outer-shell-front', ['outer-shell', 'cell']), pos: [-50, -3, 2] },
          { entry: byId('cfexpress', 'cfe-top-metal-armor', ['top-metal', 'armor']), pos: [46, -2, -14] },
          { entry: byId('lcd', 'lcd-ips-panel', ['ips-panel', 'panel']), pos: [0, -2, -35] },
          { entry: byId('mishoe', 'mi-shoe-shell-plate', ['shell-plate', 'rail']), pos: [0, 40, 2] },
          { entry: byId('mic', 'mc-top-grille-holes', ['grille', 'capsule']), pos: [0, 50, 10] },
        ];
      } else if (templateId === 'fx3') {
        toastLabel = 'FX3 シネマライン構成（強化放熱・EVFレス・MI音響）';
        plan = [
          { entry: byId('body', 'body-mg-front-shell', ['mg-front', 'chassis']), pos: [0, 0, -2] },
          { entry: byId('body', 'body-top-deck', ['top-deck', 'トップ']), pos: [0, 40, -4] },
          { entry: byId('mount', 'mount-flange-ring', ['flange', 'bayonet']), pos: [0, 0, 18] },
          { entry: byId('lens', 'lens-front-cell-mount', ['front-cell', 'barrel']), pos: [0, 0, 44] },
          { entry: byId('lens', 'lens-front-xa', ['front-xa', '前玉']), pos: [0, 0, 62] },
          { entry: pick('sensor', ['stacked', 'cmos', 'photodiode']), pos: [0, 0, 0] },
          { entry: byId('mainboard', 'mb-vapor-chamber', ['vapor', 'graphite']), pos: [0, 0, -9] },
          { entry: byId('mainboard', 'mb-sigma-graphite', ['sigma', 'graphite', 'sheet']), pos: [0, 0, -14] },
          { entry: pick('mainboard', ['hdi', 'pcb', 'substrate']), pos: [0, 0, -20] },
          { entry: byId('bionz', 'xr-nickel-cu-ihs', ['ihs', 'package']), pos: [14, 2, -27], rot: [Math.PI / 2, 0, 0] },
          { entry: byId('battery', 'bat-outer-shell-front', ['outer-shell', 'cell']), pos: [-56, -4, 4] },
          { entry: byId('cfexpress', 'cfe-top-metal-armor', ['top-metal', 'armor']), pos: [50, -2, -16] },
          { entry: byId('lcd', 'lcd-ips-panel', ['ips-panel', 'panel']), pos: [0, -4, -39] },
          { entry: byId('mishoe', 'mi-shoe-shell-plate', ['shell-plate', 'rail']), pos: [0, 52, 2] },
          { entry: byId('mic', 'mc-top-grille-holes', ['grille', 'capsule']), pos: [0, 62, 12] },
        ];
      } else if (templateId === 'wlk220') {
        toastLabel = 'ようこそ WLK-220 光学キネティック装置（産業5検証適合）';
        const wIds = [
          'welcome-plinth-mg-chassis',
          'welcome-plinth-top-datum-plate',
          'welcome-plinth-bottom-weight',
          'welcome-plinth-usbc-pd-port',
          'welcome-plinth-pmic-3rail-board',
          'welcome-plinth-lifepo4-battery',
          'welcome-plinth-mainboard',
          'welcome-plinth-cortex-m7-mcu',
          'welcome-plinth-tof-presence-sensor',
          'welcome-plinth-ambient-lux-sensor',
          'welcome-plinth-cinnabar-status-bar',
          'welcome-plinth-welcome-speaker',
          'welcome-yo-cnc-chassis',
          'welcome-yo-sapphire-diffuser-lens',
          'welcome-u-cnc-chassis',
          'welcome-u-sapphire-diffuser-lens',
          'welcome-u-crest-cnc-frame',
          'welcome-u-quartz-support-post',
          'welcome-ko-cnc-chassis',
          'welcome-ko-sapphire-diffuser-lens',
          'welcome-ko-top-cnc-frame',
          'welcome-ko-quartz-col-left',
          'welcome-ko-quartz-col-right',
          'welcome-so-cnc-chassis',
          'welcome-so-sapphire-diffuser-lens',
        ];
        plan = wIds.map((wid) => ({
          entry: byId('welcome', wid, [wid]),
          pos: [NaN, NaN, NaN] as [number, number, number],
        }));
      }

      // Parallel selective extraction across ALL required units in 1 single batch!
      const keys = plan.map((p) => p.entry?.key).filter((k): k is string => Boolean(k));
      await this.extractor.extractPartsBatch(keys);

      this.clearAllPartsInternal();
      for (let i = 0; i < plan.length; i++) {
        const item = plan[i];
        if (!item.entry) continue;
        const bp = this.extractor.getBlueprintSync(item.entry.key);
        if (!bp) continue;
        const useNatural = Number.isNaN(item.pos[0]);
        this.createPlacedInstanceSync(
          bp,
          `pg_${this.uidSeq++}`,
          useNatural ? undefined : item.pos,
          item.rot ?? [0, 0, 0],
          item.scale ?? [1, 1, 1],
          false,
          false
        );
      }

      this.rebuildMegaBatches();
      this.markSceneDirty();
      this.selectedUid = null;
      this.syncTransformAttachment();

      this.pushHistorySnapshot();
      this.fitCameraToWorkspace();
      this.refreshLiveBadge(false);
      this.showToast(`${toastLabel} (${this.placed.length}モジュール) を配置しました`);
    } finally {
      this.setLoading(false);
    }
  }

  public async loadStarterCameraKit(): Promise<void> {
    await this.loadTemplate('a7iv');
  }

  private syncTransformAttachment(): void {
    const sel = this.getSelectedInstance();
    if (sel && !sel.locked && !sel.hidden) {
      if (this.transformHelper.parent !== this.scene) {
        this.scene.add(this.transformHelper);
      }
      this.transform.attach(sel.anchor);
    } else {
      this.transform.detach();
      if (this.transformHelper.parent === this.scene) {
        this.scene.remove(this.transformHelper);
      }
    }
  }

  private clearAllPartsInternal(): void {
    this.selectedUid = null;
    this.syncTransformAttachment();
    for (let i = 0; i < this.placed.length; i++) {
      this.partsGroup.remove(this.placed[i].anchor);
    }
    this.placed = [];
    this.lastReport = null;
    this.lastPlyaReport = null;
    this.placedRowByUid.clear();
    this.lastPlacedStructureSig = '';
    this.lastSelectedRowUid = null;
    this.disposeMegaBatches();
  }

  public clearAllParts(recordHistory = true): void {
    this.clearAllPartsInternal();
    this.markSceneDirty();
    if (recordHistory) {
      this.pushHistorySnapshot();
      this.showToast('ワークスペースをクリアしました');
    }
    this.rebuildOverlayLines();
    this.renderPlacedList();
    this.renderInspector();
    this.refreshLiveBadge(false);
    this.host.requestRender();
  }

  private getSelectedInstance(): PlacedInstance | null {
    if (!this.selectedUid) return null;
    for (let i = 0; i < this.placed.length; i++) {
      if (this.placed[i].uid === this.selectedUid) return this.placed[i];
    }
    return null;
  }

  public selectInstance(uid: string | null): void {
    if (uid === this.selectedUid) return;
    this.selectedUid = uid;
    this.syncTransformAttachment();
    this.applyAllVisualMaterials(false);
    this.rebuildOverlayLines(false);
    this.syncPlacedSelection();
    this.renderInspector();
    this.host.requestRender();
  }

  private toggleHidePart(uid: string): void {
    const inst = this.placed.find((p) => p.uid === uid);
    if (!inst) return;
    inst.hidden = !inst.hidden;
    inst.anchor.visible = !inst.hidden;
    this.syncInstanceVisibility(inst);
    if (inst.uid === this.selectedUid) {
      this.syncTransformAttachment();
    }
    this.rebuildOverlayLines(false);
    this.renderPlacedList();
    this.host.requestRender();
  }

  private toggleLockPart(uid: string): void {
    const inst = this.placed.find((p) => p.uid === uid);
    if (!inst) return;
    inst.locked = !inst.locked;
    if (inst.uid === this.selectedUid) {
      this.syncTransformAttachment();
    }
    this.renderPlacedList();
    this.renderInspector();
    this.host.requestRender();
  }

  /** 1-Click Auto-Align all optical chain parts (Sensor Z=0, Shutter Z=+10, Mount Z=+18, Lens Z=+44/+62) */
  private autoAlignOpticalChain(): void {
    if (this.placed.length === 0) return;
    let lensIdx = 0;
    let moved = 0;
    for (let i = 0; i < this.placed.length; i++) {
      const inst = this.placed[i];
      if (inst.locked) continue;
      const r = inst.entry.role;
      let changed = false;
      if (r === 'sensor') {
        inst.anchor.position.set(0, 0, 0);
        inst.anchor.rotation.set(0, 0, 0);
        changed = true;
      } else if (r === 'shutter') {
        inst.anchor.position.set(0, 0, 10);
        inst.anchor.rotation.set(0, 0, 0);
        changed = true;
      } else if (r === 'mount') {
        inst.anchor.position.set(0, 0, 18);
        inst.anchor.rotation.set(0, 0, 0);
        changed = true;
      } else if (r === 'lens') {
        inst.anchor.position.set(0, 0, 44 + lensIdx * 18);
        inst.anchor.rotation.set(0, 0, 0);
        lensIdx++;
        changed = true;
      }
      if (changed) {
        inst.anchor.updateMatrixWorld();
        inst.transformEpoch++;
        this.syncInstanceMatrix(inst);
        moved++;
      }
    }
    if (moved > 0) {
      this.markSceneDirty();
      this.refreshInspectorValues();
      this.pushHistorySnapshot();
      this.refreshLiveBadge(false);
      this.showToast(`光学系 ${moved}点を Eマウント 18.0mm フランジ光軸へ自動整列しました`);
      this.host.requestRender();
    } else {
      this.showToast('整列対象の光学パーツがありません');
    }
  }

  /** Snap selected part cleanly flush against the nearest other part with +1.5mm clearance */
  private snapSelectedAdjacent(): void {
    const sel = this.getSelectedInstance();
    if (!sel || sel.locked || this.placed.length < 2) return;
    if (this.partsGroupMatrixDirty) {
      this.partsGroup.updateMatrixWorld(true);
      this.partsGroupMatrixDirty = false;
    }
    const selBox = computeInstanceWorldBoxInto(sel, new THREE.Box3());
    const selC = selBox.getCenter(new THREE.Vector3());
    const selSize = selBox.getSize(new THREE.Vector3());

    let nearest: PlacedInstance | null = null;
    let bestDist = Infinity;
    const nearBox = new THREE.Box3();
    for (let i = 0; i < this.placed.length; i++) {
      const p = this.placed[i];
      if (p.uid === sel.uid) continue;
      computeInstanceWorldBoxInto(p, _pgTmpBox);
      _pgTmpBox.getCenter(_pgTmpCenter);
      const d = _pgTmpCenter.distanceTo(selC);
      if (d < bestDist) {
        bestDist = d;
        nearest = p;
        nearBox.copy(_pgTmpBox);
      }
    }
    if (!nearest) return;

    const nearC = nearBox.getCenter(new THREE.Vector3());
    const nearSize = nearBox.getSize(new THREE.Vector3());
    const dx = selC.x - nearC.x;
    const dy = selC.y - nearC.y;
    const dz = selC.z - nearC.z;
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);
    const az = Math.abs(dz);

    if (ax >= ay && ax >= az) {
      const sign = dx >= 0 ? 1 : -1;
      const targetX = nearC.x + sign * (nearSize.x * 0.5 + selSize.x * 0.5 + 1.5);
      sel.anchor.position.x += targetX - selC.x;
    } else if (ay >= ax && ay >= az) {
      const sign = dy >= 0 ? 1 : -1;
      const targetY = nearC.y + sign * (nearSize.y * 0.5 + selSize.y * 0.5 + 1.5);
      sel.anchor.position.y += targetY - selC.y;
    } else {
      const sign = dz >= 0 ? 1 : -1;
      const targetZ = nearC.z + sign * (nearSize.z * 0.5 + selSize.z * 0.5 + 1.5);
      sel.anchor.position.z += targetZ - selC.z;
    }

    sel.anchor.updateMatrixWorld();
    sel.transformEpoch++;
    this.syncInstanceMatrix(sel);
    this.markSceneDirty();
    this.refreshInspectorValues();
    this.pushHistorySnapshot();
    this.refreshLiveBadge(false);
    this.showToast(`「${nearest.entry.partId}」に隣接スナップしました (+1.5mmクリアランス)`);
    this.host.requestRender();
  }

  private setTransformMode(mode: 'translate' | 'rotate' | 'scale'): void {
    this.transform.setMode(mode);
    (['translate', 'rotate', 'scale'] as const).forEach((m) => {
      this.modeBtns[m].classList.toggle('is-active', m === mode);
    });
    this.host.requestRender();
  }

  private toggleSpace(): void {
    const next = this.transform.space === 'world' ? 'local' : 'world';
    this.transform.setSpace(next);
    this.spaceBtn.textContent = next === 'world' ? 'World' : 'Local';
    this.host.requestRender();
  }

  private renderLiveTelemetryStrip(r: CameraEngineeringReport): void {
    const ffd = r.metrics.flangeDistanceMm !== null ? `${r.metrics.flangeDistanceMm.toFixed(1)}mm` : '--';
    const im = this.lastPlyaReport?.industrialMetrics;
    const bootTxt = im ? `${im.bootReadinessPct.toFixed(0)}%` : '--';
    const yieldTxt = im ? `${im.mfgYieldPct.toFixed(1)}%` : '--';
    const cls = r.canOperate ? 'pg-live-top is-pass' : 'pg-live-top is-fail';
    const sig = `${cls}|${r.totalScore}|${r.rank}|${r.resolvedProfileLabel}|${r.telemetry.estimatedMassG}|${ffd}|${r.telemetry.vignettingPct}|${r.metrics.severeCollisionCount}|${bootTxt}|${yieldTxt}`;
    if (this.liveStripRefs && sig === this.lastLiveStripSig) return;
    this.lastLiveStripSig = sig;
    if (!this.liveStripRefs) {
      this.liveStripEl.innerHTML = `
        <div class="${cls}" data-ls="top">
          <span class="pg-live-score"><strong data-ls="score"></strong><em>/1000</em></span>
          <span class="pg-live-rank" data-ls="rank"></span>
          <span class="pg-live-prof" data-ls="prof"></span>
        </div>
        <div class="pg-live-grid">
          <div><span>質量</span><strong data-ls="mass"></strong></div>
          <div><span>フランジ</span><strong data-ls="ffd"></strong></div>
          <div><span>起動確実</span><strong data-ls="boot"></strong></div>
          <div><span>量産歩留</span><strong data-ls="yieldPct"></strong></div>
          <div><span>ケラレ</span><strong data-ls="vig"></strong></div>
          <div><span>干渉</span><strong data-ls="col"></strong></div>
        </div>
      `;
      this.liveStripRefs = {
        top: this.liveStripEl.querySelector('[data-ls="top"]') as HTMLElement,
        score: this.liveStripEl.querySelector('[data-ls="score"]') as HTMLElement,
        rank: this.liveStripEl.querySelector('[data-ls="rank"]') as HTMLElement,
        prof: this.liveStripEl.querySelector('[data-ls="prof"]') as HTMLElement,
        mass: this.liveStripEl.querySelector('[data-ls="mass"]') as HTMLElement,
        ffd: this.liveStripEl.querySelector('[data-ls="ffd"]') as HTMLElement,
        vig: this.liveStripEl.querySelector('[data-ls="vig"]') as HTMLElement,
        col: this.liveStripEl.querySelector('[data-ls="col"]') as HTMLElement,
        boot: this.liveStripEl.querySelector('[data-ls="boot"]') as HTMLElement,
        yieldPct: this.liveStripEl.querySelector('[data-ls="yieldPct"]') as HTMLElement,
      };
    }
    const refs = this.liveStripRefs;
    if (refs.top.className !== cls) refs.top.className = cls;
    refs.score.textContent = String(r.totalScore);
    refs.rank.textContent = r.rank;
    refs.prof.textContent = r.resolvedProfileLabel;
    refs.mass.textContent = `${r.telemetry.estimatedMassG}g`;
    refs.ffd.textContent = ffd;
    refs.boot.textContent = bootTxt;
    refs.yieldPct.textContent = yieldTxt;
    refs.vig.textContent = `${r.telemetry.vignettingPct}%`;
    refs.col.textContent = `${r.metrics.severeCollisionCount}件`;
  }

  private syncPlacedSelection(): void {
    if (this.lastSelectedRowUid === this.selectedUid) return;
    if (this.lastSelectedRowUid) {
      this.placedRowByUid.get(this.lastSelectedRowUid)?.classList.remove('is-selected');
    }
    if (this.selectedUid) {
      this.placedRowByUid.get(this.selectedUid)?.classList.add('is-selected');
    }
    this.lastSelectedRowUid = this.selectedUid;
  }

  private renderPlacedList(): void {
    if (this.placed.length === 0) {
      if (this.lastPlacedStructureSig !== '__EMPTY__' || !this.placedListEl.firstChild) {
        this.placedRowByUid.clear();
        this.lastPlacedStructureSig = '__EMPTY__';
        this.lastSelectedRowUid = null;
        this.placedListEl.innerHTML =
          '<div class="pg-empty-hint">上部の雛形（α7 IV / ZV-E1 / FX3）または左のカタログからパーツを追加してください。</div>';
      }
      return;
    }

    let sig = '';
    for (let i = 0; i < this.placed.length; i++) {
      const p = this.placed[i];
      const diag = this.lastReport?.partDiagnostics.get(p.uid);
      const sevChar = diag?.severity === 'error' ? 'e' : diag?.severity === 'warn' ? 'w' : 'o';
      sig += `${p.uid}:${p.hidden ? 1 : 0}${p.locked ? 1 : 0}${sevChar};`;
    }
    if (sig === this.lastPlacedStructureSig) {
      this.syncPlacedSelection();
      return;
    }

    this.placedRowByUid.clear();
    const frag = document.createDocumentFragment();
    for (let i = 0; i < this.placed.length; i++) {
      const p = this.placed[i];
      const diag = this.lastReport?.partDiagnostics.get(p.uid);
      const sevClass =
        diag?.severity === 'error'
          ? 'is-err'
          : diag?.severity === 'warn'
            ? 'is-warn'
            : '';

      const row = document.createElement('div');
      row.className = `pg-placed-item ${p.uid === this.selectedUid ? 'is-selected' : ''} ${sevClass} ${p.hidden ? 'is-hidden' : ''}`;
      row.innerHTML = `
        <button type="button" class="pg-placed-select" title="${escapeHtml(p.entry.title)}">
          <span class="pg-cat-swatch" style="background:${escapeHtml(p.entry.swatchColor)}"></span>
          <span class="pg-placed-name">${escapeHtml(p.entry.title)}</span>
          ${diag && diag.severity !== 'ok' ? `<span class="pg-diag-dot ${sevClass}" title="${escapeHtml(diag.reason)}">!</span>` : ''}
        </button>
        <div class="pg-placed-ctrls">
          <button type="button" class="pg-mini-ico${p.hidden ? ' is-off' : ''}" data-p-hide title="${p.hidden ? '表示する' : '一時非表示'}">${p.hidden ? '○' : '●'}</button>
          <button type="button" class="pg-mini-ico${p.locked ? ' is-locked' : ''}" data-p-lock title="${p.locked ? 'ロック解除' : '位置をロック'}">${p.locked ? '🔒' : '🔓'}</button>
        </div>
      `;
      row.querySelector('.pg-placed-select')?.addEventListener('click', () => this.selectInstance(p.uid));
      row.querySelector('[data-p-hide]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleHidePart(p.uid);
      });
      row.querySelector('[data-p-lock]')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleLockPart(p.uid);
      });
      this.placedRowByUid.set(p.uid, row);
      frag.appendChild(row);
    }
    this.placedListEl.innerHTML = '';
    this.placedListEl.appendChild(frag);
    this.lastPlacedStructureSig = sig;
    this.lastSelectedRowUid = this.selectedUid;
  }

  private renderInspector(): void {
    if (!this.inspectorRefs) {
      this.inspectorBodyEl.innerHTML = `
        <div class="pg-inspector-empty" data-ins-el="empty">3Dビューまたは上の一覧からパーツを選択すると、精密数値座標（mm / °）と自動整列ツールが使えます。</div>
        <div class="pg-inspector-form" data-ins-el="form" style="display:none">
          <div class="pg-ins-head">
            <div class="pg-ins-title" data-ins-el="title"></div>
            <div class="pg-ins-sub" data-ins-el="sub"></div>
            <div class="pg-ins-alert" data-ins-el="alert" style="display:none"></div>
          </div>

          <div class="pg-ins-grid">
            <span class="pg-ins-lbl">位置 (mm)</span>
            <label class="pg-num-field"><em>X</em><input type="number" step="0.5" data-prop="px" /></label>
            <label class="pg-num-field"><em>Y</em><input type="number" step="0.5" data-prop="py" /></label>
            <label class="pg-num-field"><em>Z</em><input type="number" step="0.5" data-prop="pz" /></label>

            <span class="pg-ins-lbl">回転 (°)</span>
            <label class="pg-num-field"><em>Rx</em><input type="number" step="5" data-prop="rx" /></label>
            <label class="pg-num-field"><em>Ry</em><input type="number" step="5" data-prop="ry" /></label>
            <label class="pg-num-field"><em>Rz</em><input type="number" step="5" data-prop="rz" /></label>

            <span class="pg-ins-lbl">倍率</span>
            <label class="pg-num-field"><em>Sx</em><input type="number" step="0.05" min="0.1" max="5" data-prop="sx" /></label>
            <label class="pg-num-field"><em>Sy</em><input type="number" step="0.05" min="0.1" max="5" data-prop="sy" /></label>
            <label class="pg-num-field"><em>Sz</em><input type="number" step="0.05" min="0.1" max="5" data-prop="sz" /></label>
          </div>

          <div class="pg-ins-actions">
            <button type="button" class="pg-btn pg-btn-sm" data-ins="alignAxis">光軸Z整列</button>
            <button type="button" class="pg-btn pg-btn-sm" data-ins="snapAdj">隣接スナップ</button>
            <button type="button" class="pg-btn pg-btn-sm" data-ins="mirrorX">X反転</button>
            <button type="button" class="pg-btn pg-btn-sm" data-ins="duplicate">複製</button>
            <button type="button" class="pg-btn pg-btn-sm" data-ins="focus">ズーム</button>
            <button type="button" class="pg-btn pg-btn-sm" data-ins="resetOrigin">原点戻</button>
            <button type="button" class="pg-btn pg-btn-sm pg-btn-danger-ghost" data-ins="delete">削除</button>
          </div>
        </div>
      `;

      const emptyEl = this.inspectorBodyEl.querySelector('[data-ins-el="empty"]') as HTMLElement;
      const formEl = this.inspectorBodyEl.querySelector('[data-ins-el="form"]') as HTMLElement;
      const inputs = {
        px: formEl.querySelector('input[data-prop="px"]') as HTMLInputElement,
        py: formEl.querySelector('input[data-prop="py"]') as HTMLInputElement,
        pz: formEl.querySelector('input[data-prop="pz"]') as HTMLInputElement,
        rx: formEl.querySelector('input[data-prop="rx"]') as HTMLInputElement,
        ry: formEl.querySelector('input[data-prop="ry"]') as HTMLInputElement,
        rz: formEl.querySelector('input[data-prop="rz"]') as HTMLInputElement,
        sx: formEl.querySelector('input[data-prop="sx"]') as HTMLInputElement,
        sy: formEl.querySelector('input[data-prop="sy"]') as HTMLInputElement,
        sz: formEl.querySelector('input[data-prop="sz"]') as HTMLInputElement,
      };
      const lockBtns = Array.from(
        formEl.querySelectorAll<HTMLButtonElement>(
          '[data-ins="alignAxis"], [data-ins="snapAdj"], [data-ins="mirrorX"], [data-ins="resetOrigin"]'
        )
      );
      this.inspectorRefs = {
        emptyEl,
        formEl,
        title: formEl.querySelector('[data-ins-el="title"]') as HTMLElement,
        sub: formEl.querySelector('[data-ins-el="sub"]') as HTMLElement,
        alert: formEl.querySelector('[data-ins-el="alert"]') as HTMLElement,
        inputs,
        lockBtns,
      };
      formEl.style.display = '';
      this.inspectorBodyEl.replaceChildren(emptyEl);
      this.inspectorShowingEmpty = true;

      (Object.keys(inputs) as Array<keyof typeof inputs>).forEach((prop) => {
        const inp = inputs[prop];
        inp.addEventListener('change', () => {
          const cur = this.getSelectedInstance();
          if (!cur || cur.locked) return;
          const val = Number(inp.value);
          if (!Number.isFinite(val)) return;
          const g = cur.anchor;
          if (prop === 'px') g.position.x = val;
          else if (prop === 'py') g.position.y = val;
          else if (prop === 'pz') g.position.z = val;
          else if (prop === 'rx') g.rotation.x = THREE.MathUtils.degToRad(val);
          else if (prop === 'ry') g.rotation.y = THREE.MathUtils.degToRad(val);
          else if (prop === 'rz') g.rotation.z = THREE.MathUtils.degToRad(val);
          else if (prop === 'sx') g.scale.x = Math.max(0.1, val);
          else if (prop === 'sy') g.scale.y = Math.max(0.1, val);
          else if (prop === 'sz') g.scale.z = Math.max(0.1, val);
          g.updateMatrixWorld();
          cur.transformEpoch++;
          this.syncInstanceMatrix(cur);
          this.markSceneDirty();
          this.pushHistorySnapshot();
          this.refreshLiveBadge(false);
          this.host.requestRender();
        });
      });

      formEl.querySelector('[data-ins="alignAxis"]')?.addEventListener('click', () => {
        const cur = this.getSelectedInstance();
        if (!cur || cur.locked) return;
        const g = cur.anchor;
        g.position.x = 0;
        g.position.y = 0;
        g.rotation.set(0, 0, 0);
        g.updateMatrixWorld();
        cur.transformEpoch++;
        this.syncInstanceMatrix(cur);
        this.markSceneDirty();
        this.refreshInspectorValues();
        this.pushHistorySnapshot();
        this.refreshLiveBadge(false);
        this.showToast('光軸中心 (X=0, Y=0) に整列しました');
        this.host.requestRender();
      });
      formEl.querySelector('[data-ins="snapAdj"]')?.addEventListener('click', () => {
        this.snapSelectedAdjacent();
      });
      formEl.querySelector('[data-ins="mirrorX"]')?.addEventListener('click', () => {
        const cur = this.getSelectedInstance();
        if (!cur || cur.locked) return;
        cur.anchor.position.x = -cur.anchor.position.x;
        cur.anchor.updateMatrixWorld();
        cur.transformEpoch++;
        this.syncInstanceMatrix(cur);
        this.markSceneDirty();
        this.refreshInspectorValues();
        this.pushHistorySnapshot();
        this.refreshLiveBadge(false);
        this.host.requestRender();
      });
      formEl.querySelector('[data-ins="resetOrigin"]')?.addEventListener('click', () => {
        const cur = this.getSelectedInstance();
        if (!cur || cur.locked) return;
        cur.anchor.position.set(0, 0, 0);
        cur.anchor.rotation.set(0, 0, 0);
        cur.anchor.scale.set(1, 1, 1);
        cur.anchor.updateMatrixWorld();
        cur.transformEpoch++;
        this.syncInstanceMatrix(cur);
        this.markSceneDirty();
        this.refreshInspectorValues();
        this.pushHistorySnapshot();
        this.refreshLiveBadge(false);
        this.host.requestRender();
      });
      formEl.querySelector('[data-ins="duplicate"]')?.addEventListener('click', () => {
        void this.duplicateSelected();
      });
      formEl.querySelector('[data-ins="focus"]')?.addEventListener('click', () => {
        const cur = this.getSelectedInstance();
        if (cur) this.focusOnInstance(cur);
      });
      formEl.querySelector('[data-ins="delete"]')?.addEventListener('click', () => {
        this.deleteSelected();
      });
    }

    const sel = this.getSelectedInstance();
    if (!sel) {
      if (!this.inspectorShowingEmpty) {
        this.inspectorBodyEl.replaceChildren(this.inspectorRefs.emptyEl);
        this.inspectorShowingEmpty = true;
      }
      return;
    }
    if (this.inspectorShowingEmpty) {
      this.inspectorBodyEl.replaceChildren(this.inspectorRefs.formEl);
      this.inspectorShowingEmpty = false;
    }

    const diag = this.lastReport?.partDiagnostics.get(sel.uid);
    const renderKey = `${sel.uid}|${sel.locked ? 1 : 0}|${diag?.severity ?? 'ok'}|${diag?.reason ?? ''}`;
    if (renderKey !== this.lastInspectorRenderKey) {
      this.lastInspectorRenderKey = renderKey;
      const refs = this.inspectorRefs;
      refs.title.textContent = sel.entry.title;
      refs.sub.textContent = `${sel.entry.unitId.toUpperCase()} · ${sel.entry.role} · ${sel.blueprint.naturalSize.x.toFixed(1)}×${sel.blueprint.naturalSize.y.toFixed(1)}×${sel.blueprint.naturalSize.z.toFixed(1)}mm${sel.locked ? ' · 🔒LOCKED' : ''}`;
      if (diag && diag.severity !== 'ok') {
        refs.alert.className = `pg-ins-alert is-${diag.severity}`;
        refs.alert.textContent = diag.reason;
        refs.alert.style.display = '';
      } else {
        refs.alert.style.display = 'none';
      }
      const inputs = refs.inputs;
      inputs.px.disabled = sel.locked;
      inputs.py.disabled = sel.locked;
      inputs.pz.disabled = sel.locked;
      inputs.rx.disabled = sel.locked;
      inputs.ry.disabled = sel.locked;
      inputs.rz.disabled = sel.locked;
      inputs.sx.disabled = sel.locked;
      inputs.sy.disabled = sel.locked;
      inputs.sz.disabled = sel.locked;
      for (let i = 0; i < refs.lockBtns.length; i++) {
        refs.lockBtns[i].disabled = sel.locked;
      }
    }

    this.refreshInspectorValues();
  }

  private refreshInspectorValues(): void {
    const sel = this.getSelectedInstance();
    if (!sel || !this.inspectorRefs) return;
    const g = sel.anchor;
    const inputs = this.inspectorRefs.inputs;
    const activeEl = document.activeElement;
    if (activeEl !== inputs.px) inputs.px.value = fmt1(g.position.x);
    if (activeEl !== inputs.py) inputs.py.value = fmt1(g.position.y);
    if (activeEl !== inputs.pz) inputs.pz.value = fmt1(g.position.z);
    if (activeEl !== inputs.rx) inputs.rx.value = fmt1(THREE.MathUtils.radToDeg(g.rotation.x));
    if (activeEl !== inputs.ry) inputs.ry.value = fmt1(THREE.MathUtils.radToDeg(g.rotation.y));
    if (activeEl !== inputs.rz) inputs.rz.value = fmt1(THREE.MathUtils.radToDeg(g.rotation.z));
    if (activeEl !== inputs.sx) inputs.sx.value = g.scale.x.toFixed(2);
    if (activeEl !== inputs.sy) inputs.sy.value = g.scale.y.toFixed(2);
    if (activeEl !== inputs.sz) inputs.sz.value = g.scale.z.toFixed(2);
  }

  private async duplicateSelected(): Promise<void> {
    const sel = this.getSelectedInstance();
    if (!sel) return;
    const g = sel.anchor;
    await this.spawnPart(
      sel.entry.key,
      [g.position.x + 12, g.position.y, g.position.z],
      [g.rotation.x, g.rotation.y, g.rotation.z],
      [g.scale.x, g.scale.y, g.scale.z],
      true
    );
  }

  private deleteSelected(): void {
    const sel = this.getSelectedInstance();
    if (!sel) return;
    this.partsGroup.remove(sel.anchor);
    if (this.opaqueMegaBatch && sel.opaqueBatchId >= 0) {
      this.opaqueMegaBatch.setVisibleAt(sel.opaqueBatchId, false);
    }
    if (this.glassMegaBatch && sel.glassBatchId >= 0) {
      this.glassMegaBatch.setVisibleAt(sel.glassBatchId, false);
    }
    this.placed = this.placed.filter((p) => p.uid !== sel.uid);
    if (this.placed.length === 0) {
      this.disposeMegaBatches();
    }
    this.markSceneDirty();
    const nextUid = this.placed[this.placed.length - 1]?.uid ?? null;
    this.selectInstance(nextUid);
    this.pushHistorySnapshot();
    this.refreshLiveBadge(false);
    this.showToast(`削除: ${sel.entry.title}`);
  }

  private focusOnInstance(inst: PlacedInstance): void {
    inst.anchor.updateMatrixWorld();
    computeInstanceWorldBoxInto(inst, _pgTmpBox);
    _pgTmpBox.getCenter(_pgTmpCenter);
    _pgTmpBox.getSize(_pgTmpSize);
    const dist = Math.max(45, _pgTmpSize.length() * 2.1);
    this.orbit.target.copy(_pgTmpCenter);
    this.camera.position.set(
      _pgTmpCenter.x - dist * 0.55,
      _pgTmpCenter.y + dist * 0.35,
      _pgTmpCenter.z + dist * 0.78
    );
    this.orbit.update();
    this.updatePgDynamicClipPlanes();
    this.host.requestRender();
  }

  public fitCameraToWorkspace(): void {
    this.setCameraView('iso');
  }

  // =========================================================================
  // Chief Engineer 1,000-Point Evaluation (v1.1) — Zero-GC In-Place + Epoch Memoized!
  // =========================================================================
  private buildSnapshots(): PlacedPartSnapshot[] {
    if (this.partsGroupMatrixDirty) {
      this.partsGroup.updateMatrixWorld(true);
      this.partsGroupMatrixDirty = false;
    }
    const n = this.placed.length;
    const out = this.reusableSnapArray;
    out.length = n;
    for (let i = 0; i < n; i++) {
      const p = this.placed[i];
      const snap = p.cachedSnap;
      const wb = computeInstanceWorldBoxInto(p, snap.worldBox);
      snap.worldCenter.set(
        0.5 * (wb.min.x + wb.max.x),
        0.5 * (wb.min.y + wb.max.y),
        0.5 * (wb.min.z + wb.max.z)
      );
      snap.worldSize.set(wb.max.x - wb.min.x, wb.max.y - wb.min.y, wb.max.z - wb.min.z);
      snap.position.copy(p.anchor.position);
      snap.rotationEuler.copy(p.anchor.rotation);
      snap.scale.copy(p.anchor.scale);
      snap.blueprint = p.blueprint;
      snap.worldMatrixElements = p.anchor.matrixWorld.elements;
      out[i] = snap;
    }
    return out;
  }

  private estimateSceneTriangles(): number {
    let tris = 0;
    for (let i = 0; i < this.placed.length; i++) {
      tris += this.placed[i].blueprint.triCount;
    }
    return tris;
  }

  public getPlacedSummary(): Array<{ uid: string; partId: string; role: string; pos: [number, number, number] }> {
    return this.placed.map((p) => ({
      uid: p.uid,
      partId: p.entry.partId,
      role: p.entry.role,
      pos: [p.anchor.position.x, p.anchor.position.y, p.anchor.position.z],
    }));
  }

  public movePartByUid(uid: string, x: number, y: number, z: number): boolean {
    const inst = this.placed.find((p) => p.uid === uid);
    if (!inst) return false;
    inst.anchor.position.set(x, y, z);
    inst.anchor.updateMatrixWorld();
    inst.transformEpoch++;
    this.syncInstanceMatrix(inst);
    this.markSceneDirty();
    this.runEngineeringEvaluation(false, false);
    return true;
  }

  private applyPlyaReport(
    plya: PlyaPipelineReport,
    snaps: readonly PlacedPartSnapshot[],
    deferRender: boolean
  ): CameraEngineeringReport {
    const report = plya.engineeringReport;
    this.lastPlyaReport = plya;
    this.lastReport = report;
    this.lastEvaluatedEpoch = this.sceneEpoch;
    this.lastEvaluatedProfile = this.designProfile;
    this.lastEvaluatedStrictness = this.examStrictness;

    // Update 3D Center-of-Gravity position & Unified 1-DC Dynamic Overlays + O(changed) Error/Selection Colors
    const [gx, gy, gz] = report.telemetry.centerOfGravityMm;
    this.cogPos[0] = gx;
    this.cogPos[1] = gy;
    this.cogPos[2] = gz;

    let errorPartCount = 0;
    let warnPartCount = 0;
    for (let i = 0; i < snaps.length; i++) {
      const flag = report.partDiagnostics.get(snaps[i].uid);
      if (flag && flag.severity !== 'ok') {
        if (flag.severity === 'error') errorPartCount++;
        else warnPartCount++;
      }
    }

    this.applyAllVisualMaterials(false);
    this.rebuildOverlayLines(false);

    // Shadow-string diff cache eliminates redundant DOM style/text writes on every PLYA tick!
    const solverTotal = plya.tools.length;
    let nextAlertCls = 'pg-viewport-alert';
    let nextAlertText = '';
    if (snaps.length === 0) {
      nextAlertCls = 'pg-viewport-alert';
    } else if (errorPartCount > 0) {
      nextAlertCls = 'pg-viewport-alert is-visible is-error';
      nextAlertText = `🔴 PLYA V2.1 (EXAM V1.1): エラー部品 ${errorPartCount}個 · ${plya.assertionPassCount}/${plya.assertionTotalCount}項目 · 起動${plya.industrialMetrics.bootReadinessPct.toFixed(0)}% — クリックで詳細＆自動修復`;
    } else if (warnPartCount > 0 || plya.failCount > 0) {
      nextAlertCls = 'pg-viewport-alert is-visible is-warn';
      nextAlertText = `⚠️ PLYA V2.1 (EXAM V1.1): 注意 ${warnPartCount}部品 / ${plya.passCount}/${solverTotal}ソルバ (${plya.assertionPassCount}/${plya.assertionTotalCount}項目) · 起動${plya.industrialMetrics.bootReadinessPct.toFixed(0)}%`;
    } else {
      nextAlertCls = 'pg-viewport-alert is-visible is-ok';
      nextAlertText = `✅ PLYA V2.1 全${solverTotal}ソルバ / ${plya.assertionPassCount}/${plya.assertionTotalCount}項目合格 · 起動${plya.industrialMetrics.bootReadinessPct.toFixed(0)}% · ${report.totalScore}/1000 (${report.rank})`;
    }
    if (nextAlertCls !== this.lastAlertCls) {
      this.lastAlertCls = nextAlertCls;
      this.viewportAlertEl.className = nextAlertCls;
    }
    if (nextAlertText !== this.lastAlertText) {
      this.lastAlertText = nextAlertText;
      this.viewportAlertEl.textContent = nextAlertText;
    }

    const nextScoreText = `${report.totalScore} / 1000 (${report.rank})`;
    const nextScoreStatus = report.canOperate ? 'pass' : 'fail';
    if (nextScoreText !== this.lastScoreText) {
      this.lastScoreText = nextScoreText;
      this.scoreBadgeEl.textContent = nextScoreText;
    }
    if (nextScoreStatus !== this.lastScoreStatus) {
      this.lastScoreStatus = nextScoreStatus;
      this.scoreBadgeEl.dataset.status = nextScoreStatus;
    }

    this.refreshPlaygroundV11Seal(snaps, true, plya.industrialMetrics.canonical3dSha256);
    this.renderLiveTelemetryStrip(report);
    this.renderPlacedList();
    this.renderInspector();
    if (deferRender) {
      this.scheduleDeferredRender(45);
    } else {
      this.host.requestRender();
    }
    return report;
  }

  public getV11SealStatus(): V11SealVerification {
    if (!this.lastV11Seal) {
      return this.refreshPlaygroundV11Seal(this.buildSnapshots(), false);
    }
    return this.lastV11Seal;
  }

  public importV11Certificate(
    cert: V11CertificateRecord & { solverManifestSha256?: string }
  ): V11SealVerification {
    this.importedV11Cert = cert;
    const res = this.refreshPlaygroundV11Seal(this.buildSnapshots(), false);
    if (res.valid) {
      this.showToast(`✅ V1.1証明 刻印確認 (${cert.certId.slice(0, 32)}...) — 3D変更時は即時剥奪されます`);
    } else {
      this.showToast(`⚠️ V1.1証明 検証NG [${res.status}]: ${res.reason}`);
    }
    if (this.reportModalEl.classList.contains('is-open') && this.lastReport) {
      this.renderReportModal(this.lastReport, this.lastPlyaReport);
    }
    return res;
  }

  private async importV11CertificateFile(file: File): Promise<void> {
    try {
      const text = await file.text();
      if (!this.active) return;
      const parsed = JSON.parse(text) as V11CertificateRecord & {
        schema?: string;
        solverManifestSha256?: string;
      };
      if (!parsed || typeof parsed !== 'object' || !parsed.certId || !parsed.primarySha256) {
        throw new Error('not a V1.1 certificate');
      }
      this.importV11Certificate(parsed);
    } catch {
      this.showToast('V1.1証明ファイル (.v1_1.cert.json) の形式が正しくありません');
    }
  }

  private refreshPlaygroundV11Seal(
    snaps: readonly PlacedPartSnapshot[],
    notifyOnRevoke = true,
    precomputedSha?: string
  ): V11SealVerification {
    const prevStatus = this.lastV11Seal?.status ?? 'UNVERIFIED';
    let verification: V11SealVerification;
    if (!this.importedV11Cert && precomputedSha) {
      verification = {
        status: 'UNVERIFIED',
        valid: false,
        unitId: 'playground',
        badgeLabel: 'V1.1 未刻印',
        reason: 'EX48(.tlx11.json)出力 → EXAM V1.1 100%合格 → 証明書読込で刻印',
        livePrimarySha256: precomputedSha,
        cert: null,
      };
    } else {
      const serialized = serializeSnapshotsForExamEngine(snaps);
      const canonParts = serialized.map((s) => {
        const mat = resolvePlaygroundMaterial(s.entry);
        return {
          id: `${s.entry.partId}_${s.uid.slice(-4)}`,
          matKey: mat.preset,
          assembledPos: s.position,
          explodeOffset: [0, 0, 0] as const,
          box: s.box,
          tris: s.tris,
          volumeMm3: s.volumeMm3,
          massG: (s.volumeMm3 / 1000) * mat.rho,
        };
      });
      verification = verifyPlaygroundV11Seal(this.importedV11Cert, canonParts);
    }

    this.lastV11Seal = verification;
    const sig = `${verification.status}|${verification.badgeLabel}`;
    if (this.v11SealBadgeEl && sig !== this.lastV11BadgeSig) {
      this.lastV11BadgeSig = sig;
      this.v11SealBadgeEl.dataset.status = verification.status;
      this.v11SealBadgeEl.title = `${verification.badgeLabel} — ${verification.reason}`;
      const txtEl = this.v11SealBadgeEl.querySelector('[data-field="v11SealText"]');
      if (txtEl) txtEl.textContent = verification.badgeLabel;
    }

    // INSTANT AUTOMATIC REVOCATION ALERT: whenever an active CERTIFIED seal drifts even by 0.0001mm!
    if (notifyOnRevoke && prevStatus === 'CERTIFIED' && verification.status === 'REVOKED_GEOMETRY_DRIFT') {
      this.showToast(
        '⚠️ 3Dデータ変更検知 — V1.1証明を即時剥奪しました！再刻印には EXAM V1.1 全1,080項目 100%合格が必要です'
      );
    }
    return verification;
  }

  public runEngineeringEvaluation(force = false, deferRender = false): CameraEngineeringReport {
    if (
      !force &&
      this.lastReport &&
      this.lastPlyaReport &&
      this.lastEvaluatedEpoch === this.sceneEpoch &&
      this.lastEvaluatedProfile === this.designProfile &&
      this.lastEvaluatedStrictness === this.examStrictness
    ) {
      return this.lastReport;
    }

    const snaps = this.buildSnapshots();
    const plya = runPlyaVerificationPipeline(
      snaps,
      this.designProfile,
      {
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine !== false : true,
        webgl2: this.host.renderer.capabilities.isWebGL2,
        totalTriangles: this.estimateSceneTriangles(),
      },
      this.examStrictness
    );
    return this.applyPlyaReport(plya, snaps, deferRender);
  }

  public runPlyaPipeline(openModal = true): PlyaPipelineReport {
    this.runEngineeringEvaluation(false);
    const plya = this.lastPlyaReport!;
    if (openModal) {
      this.renderReportModal(plya.engineeringReport, plya);
      this.reportModalEl.classList.add('is-open');
      this.reportModalEl.setAttribute('aria-hidden', 'false');
    }
    this.showToast(
      `PLYA V2.1完了 (${plya.totalDurationMs.toFixed(1)}ms): ${plya.passCount}/${plya.tools.length}ソルバ · ${plya.assertionPassCount}/${plya.assertionTotalCount}項目 · 起動${plya.industrialMetrics.bootReadinessPct.toFixed(0)}% · ${plya.engineeringReport.totalScore}点`
    );
    return plya;
  }

  private refreshLiveBadge(openModal: boolean, deferRender = false): void {
    const rep = this.runEngineeringEvaluation(false, deferRender);
    if (openModal) this.renderReportModal(rep, this.lastPlyaReport);
  }

  public openEvaluationReport(): CameraEngineeringReport {
    return this.runPlyaPipeline(true).engineeringReport;
  }

  public closeEvaluationReport(): void {
    this.reportModalEl.classList.remove('is-open');
    this.reportModalEl.setAttribute('aria-hidden', 'true');
  }

  private renderReportModal(
    r: CameraEngineeringReport,
    plya: PlyaPipelineReport | null = this.lastPlyaReport
  ): void {
    const pct = Math.round((r.totalScore / r.maxScore) * 100);
    const verdictClass = r.canOperate ? 'is-pass' : 'is-fail';
    const ffdText =
      r.metrics.flangeDistanceMm !== null ? `${r.metrics.flangeDistanceMm.toFixed(1)} mm` : '未計測';
    const eccText =
      r.metrics.opticalEccentricityMm !== null
        ? `${r.metrics.opticalEccentricityMm.toFixed(1)} mm`
        : '未計測';
    const cogText = `(${r.telemetry.centerOfGravityMm.map((v) => v.toFixed(0)).join(', ')}) mm`;
    const radarSvg = renderEngineeringRadarSvg(r);
    const solverTotal = plya?.tools.length ?? 24;
    const v11Seal = this.getV11SealStatus();

    const repairCount = plya
      ? Object.values(plya.deepReport.overlays.repairShiftsMm).filter(
          (v) => Math.abs(v[0]) > 0.01 || Math.abs(v[1]) > 0.01 || Math.abs(v[2]) > 0.01
        ).length
      : 0;
    const repairBtnHtml =
      repairCount > 0
        ? `<button type="button" class="pg-btn pg-btn-repair" data-action="applyExamRepair" title="EXAM V1.1接触グラフから算出した最小修復ベクトルで浮き・干渉部品を1クリック自動修正">⚡ EXAM自動修復 (${repairCount}部品)</button>`
        : '';

    const headlineHtml = plya
      ? `
      <div class="pg-plya-headline ${verdictClass}">
        <span>${escapeHtml(plya.simpleHeadline)}</span>
        <div class="pg-plya-head-right">
          ${repairBtnHtml}
          <span class="pg-plya-speed">PLYA V2.1 (EXAM V1.1継承) · ${plya.totalDurationMs.toFixed(1)}ms · ${plya.passCount}/${solverTotal}ソルバ · ${plya.assertionPassCount}/${plya.assertionTotalCount}項目</span>
        </div>
      </div>`
      : '';

    const v11BannerHtml = `
      <div class="pg-v11-cert-banner" data-status="${escapeHtml(v11Seal.status)}">
        <div class="pg-v11-cert-left">
          <span class="v11-seal-pill" data-status="${escapeHtml(v11Seal.status)}"><span class="v11-seal-dot"></span>${escapeHtml(v11Seal.badgeLabel)}</span>
          <span class="pg-v11-cert-reason">${escapeHtml(v11Seal.reason)}</span>
        </div>
        <div class="pg-v11-cert-meta">
          <code>3D-SHA256: ${(v11Seal.livePrimarySha256 || plya?.industrialMetrics.canonical3dSha256 || '--').slice(0, 16)}</code>
          <button type="button" class="pg-btn pg-btn-sm" data-action="importV11Cert">V1.1証明 読込 (.v1_1.cert.json)</button>
        </div>
      </div>`;

    const plyaToolsHtml = plya
      ? `
      <div class="pg-plya-tools-grid">
        ${plya.tools
          .map((t) => {
            const ico = t.status === 'pass' ? '✅' : t.status === 'warn' ? '⚠️' : '❌';
            const focusBtn =
              t.flaggedUids.length > 0
                ? `<button type="button" class="pg-plya-focus-btn" data-focus-uid="${escapeHtml(t.flaggedUids[0])}">対象部品を3Dで見る</button>`
                : '';
            const aPass = t.assertions.filter((a) => a.status === 'pass').length;
            const assertRows = t.assertions
              .map((a) => {
                const aIco = a.status === 'pass' ? '✓' : a.status === 'warn' ? '!' : '✕';
                return `
                  <div class="pg-plya-assert-row is-${a.status}">
                    <span class="pg-plya-assert-id">${escapeHtml(a.id)}</span>
                    <span class="pg-plya-assert-ico">${aIco}</span>
                    <span class="pg-plya-assert-lbl">${escapeHtml(a.labelJa)}</span>
                    <span class="pg-plya-assert-val">${escapeHtml(a.actual)} <em>(${escapeHtml(a.limit)})</em></span>
                  </div>`;
              })
              .join('');
            return `
            <div class="pg-plya-tool is-${t.status}">
              <div class="pg-plya-tool-head">
                <span class="pg-plya-tool-icon">${ico}</span>
                <span class="pg-plya-tool-name">${escapeHtml(t.toolName)}</span>
                <span class="pg-plya-exam-tag">${escapeHtml(t.examSource)}</span>
                <span class="pg-plya-tool-badge">${escapeHtml(t.metricBadge)}</span>
              </div>
              <div class="pg-plya-tool-sub">${escapeHtml(t.domainJa)} · ${t.score}/100 · ${t.durationMs.toFixed(1)}ms</div>
              <div class="pg-plya-tool-verdict">${escapeHtml(t.plainVerdict)}</div>
              <div class="pg-plya-tool-foot">
                <span class="pg-plya-tool-fix">${t.status === 'pass' ? '✓ ' : '→ '}${escapeHtml(t.fixHint)}</span>
                ${focusBtn}
              </div>
              <details class="pg-plya-assertions">
                <summary>原子テスト ${aPass}/${t.assertions.length} PASS（クリックで詳細展開）</summary>
                <div class="pg-plya-assert-list">${assertRows}</div>
              </details>
            </div>`;
          })
          .join('')}
      </div>`
      : '';

    const quickFixes = plya?.quickFixes ?? r.topActions;
    const actionsHtml =
      quickFixes.length > 0
        ? `<div class="pg-rep-actions"><h4>ここだけ直せばOK（EXAM V1.1 優先修正リスト）</h4><ul>${quickFixes
            .map((a) => `<li>${escapeHtml(a)}</li>`)
            .join('')}</ul></div>`
        : `<div class="pg-rep-actions is-ok"><h4>全${solverTotal}ソルバ / ${plya?.assertionTotalCount ?? 256}項目クリア！実機製造＆EXAM V1.1「V1.1証明」刻印へ投入可能です</h4><p>実3D三角形BVH干渉・ゼロ浮き・電源コールド起動・閉ループ制御・デジタルタイミング・SI/ESD・過渡熱・輸送PSD・Six-Sigma歩留り・ヘルツ摩耗・ポカヨケの全12分野で合格基準を達成しています。</p></div>`;

    const catHtml = r.categories
      .map(
        (c) => `
      <div class="pg-rep-cat is-${c.status}">
        <div class="pg-rep-cat-top">
          <span class="pg-rep-cat-name">${escapeHtml(c.nameJa)}</span>
          <strong class="pg-rep-cat-score">${c.score}<em>/100</em></strong>
        </div>
        <div class="pg-rep-bar"><span style="width:${c.score}%"></span></div>
        <div class="pg-rep-finding">${escapeHtml(c.finding)}</div>
      </div>
    `
      )
      .join('');

    const im = plya?.industrialMetrics;
    const extraTelemetryHtml = im
      ? `
        <div><span>実機起動確実性 / 量産歩留り</span><strong>${im.bootReadinessPct.toFixed(1)}% · ${im.mfgYieldPct.toFixed(2)}%</strong></div>
        <div><span>重心 / 転倒限界角</span><strong>${cogText} · θ=${im.tippingAngleDeg.toFixed(1)}°</strong></div>
        <div><span>FEA安全率 / たわみ / f1</span><strong>SF ${im.feaSafetyFactor.toFixed(1)} · ${im.maxDeflectionUm.toFixed(1)}µm · ${im.modalF1Hz.toFixed(0)}Hz</strong></div>
        <div><span>接触熱 Tj / 外装Tsurf</span><strong>${im.socJunctionC.toFixed(1)}°C / ${im.chassisSurfaceC.toFixed(1)}°C</strong></div>
        <div><span>MNA IRドロップ / 3.3V</span><strong>${im.spiceIrDropMv.toFixed(0)}mV / ${im.spiceMcu3v3MinV.toFixed(2)}V</strong></div>
        <div><span>最大浮き / 3D配線長</span><strong>${im.maxSeatGapMm.toFixed(2)}mm · ${im.maxWiringRouteMm.toFixed(0)}mm</strong></div>
        <div><span>電食ペア / 推定MTBF</span><strong>${im.galvanicSevereCount}組 · ${(im.mtbfHours / 1000).toFixed(1)}kh</strong></div>
      `
      : `
        <div><span>3D重心 (CoG)</span><strong>${cogText}</strong></div>
        <div><span>ピント距離 / ズレ</span><strong>${ffdText} / ${eccText}</strong></div>
      `;

    this.reportContentEl.innerHTML = `
      ${headlineHtml}
      ${v11BannerHtml}
      <div class="pg-rep-hero pg-rep-hero-v11">
        <div class="pg-rep-dial ${verdictClass}" style="--pg-pct:${pct}%">
          <div class="pg-rep-dial-inner">
            <span class="pg-rep-score-big">${r.totalScore}</span>
            <span class="pg-rep-score-max">/ 1000 点</span>
            <span class="pg-rep-rank">RANK ${escapeHtml(r.rank)}</span>
          </div>
        </div>

        <div class="pg-rep-radar-box">
          ${radarSvg}
        </div>

        <div class="pg-rep-verdict-box">
          <div class="pg-rep-pills-row">
            <div class="pg-rep-verdict-pill ${verdictClass}">${escapeHtml(r.operationalVerdict)}</div>
            <div class="pg-rep-profile-pill">設計モード: ${escapeHtml(r.resolvedProfileLabel)}</div>
          </div>
          <div class="pg-rep-telemetry pg-rep-telemetry-v11 pg-rep-telemetry-v2">
            <div><span>構成 / 実体積質量</span><strong>${r.metrics.partCount}点 · ${r.telemetry.estimatedMassG} g</strong></div>
            <div><span>ピント / 2000光線ケラレ</span><strong>${ffdText} (${eccText}) · ${r.telemetry.vignettingPct}%</strong></div>
            ${extraTelemetryHtml}
          </div>
        </div>
      </div>
      ${plyaToolsHtml}
      ${actionsHtml}
      ${
        plya
          ? `<div class="pg-eda-export-row">
              <span class="pg-eda-export-label">実産業ツール＆THE LAST EXAM V1.1連携（5操作）：</span>
              <button type="button" class="pg-btn pg-btn-sm" data-action="exportKiCad">KiCad (.kicad_sch)</button>
              <button type="button" class="pg-btn pg-btn-sm" data-action="exportSpice">ngspice (.cir)</button>
              <button type="button" class="pg-btn pg-btn-sm" data-action="exportCalculix">CalculiX FEA (.inp)</button>
              <button type="button" class="pg-btn pg-btn-sm pg-btn-exam-export" data-action="exportExamWorkspace">THE LAST EXAM V1.1 (.tlx11.json)</button>
              <button type="button" class="pg-btn pg-btn-sm" data-action="importV11CertRow">V1.1証明 読込</button>
            </div>`
          : ''
      }
      <details class="pg-rep-details">
        <summary>詳細データ：技術者 12分野スコア内訳 (クリックで展開)</summary>
        <div class="pg-rep-cats">${catHtml}</div>
      </details>
    `;

    this.reportContentEl.querySelector('[data-action="applyExamRepair"]')?.addEventListener('click', () => {
      this.applyExamAutoRepair();
    });
    this.reportContentEl.querySelector('[data-action="importV11Cert"]')?.addEventListener('click', () => {
      this.certFileInputEl.click();
    });
    this.reportContentEl.querySelector('[data-action="importV11CertRow"]')?.addEventListener('click', () => {
      this.certFileInputEl.click();
    });
    this.reportContentEl.querySelector('[data-action="exportKiCad"]')?.addEventListener('click', () => {
      if (!plya) return;
      const snaps = this.buildSnapshots();
      const sch = generatePlaygroundKiCadSchematic(snaps, plya);
      this.downloadTextFile('playground-v21-exam.kicad_sch', sch, 'text/plain;charset=utf-8');
      this.showToast('実KiCad 7.0 回路図 (.kicad_sch) を出力しました');
    });
    this.reportContentEl.querySelector('[data-action="exportSpice"]')?.addEventListener('click', () => {
      if (!plya) return;
      const snaps = this.buildSnapshots();
      const cir = generatePlaygroundNgspiceNetlist(snaps, plya);
      this.downloadTextFile('playground-v21-power-thermal.cir', cir, 'text/plain;charset=utf-8');
      this.showToast('実ngspice 電源・連成熱解析ネットリスト (.cir) を出力しました');
    });
    this.reportContentEl.querySelector('[data-action="exportCalculix"]')?.addEventListener('click', () => {
      if (!plya) return;
      const snaps = this.buildSnapshots();
      const inp = generatePlaygroundCalculiXDeck(snaps, plya);
      this.downloadTextFile('playground-v21-fea.inp', inp, 'text/plain;charset=utf-8');
      this.showToast('実CalculiX C3D8 3D構造FEAデッキ (.inp) を出力しました');
    });
    this.reportContentEl.querySelector('[data-action="exportExamWorkspace"]')?.addEventListener('click', () => {
      if (!plya) return;
      const snaps = this.buildSnapshots();
      const json = generatePlaygroundExamWorkspaceJson(snaps, plya);
      this.downloadTextFile('playground-v21-exam.tlx11.json', json, 'application/json;charset=utf-8');
      this.showToast('EXAM V1.1 出力完了 → node scripts/exam.mjs --playground=playground-v21-exam.tlx11.json');
    });

    this.reportContentEl.querySelectorAll<HTMLButtonElement>('[data-focus-uid]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const uid = btn.dataset.focusUid;
        if (!uid) return;
        const inst = this.placed.find((p) => p.uid === uid);
        if (inst) {
          this.closeEvaluationReport();
          this.selectInstance(uid);
          this.focusOnInstance(inst);
          this.showToast(`対象部品へフォーカス: ${inst.entry.title}`);
        }
      });
    });
  }

  // =========================================================================
  // O(1) Synchronous Differential Undo / Redo & Blueprint JSON Save/Load
  // =========================================================================
  private serializeWorkspace(): SerializedPartState[] {
    const out = new Array<SerializedPartState>(this.placed.length);
    for (let i = 0; i < this.placed.length; i++) {
      const p = this.placed[i];
      out[i] = {
        uid: p.uid,
        key: p.entry.key,
        pos: [p.anchor.position.x, p.anchor.position.y, p.anchor.position.z],
        rot: [p.anchor.rotation.x, p.anchor.rotation.y, p.anchor.rotation.z],
        scale: [p.anchor.scale.x, p.anchor.scale.y, p.anchor.scale.z],
        hidden: p.hidden,
        locked: p.locked,
      };
    }
    return out;
  }

  private pushHistorySnapshot(): void {
    if (this.isApplyingHistory) return;
    this.undoStack.push(this.serializeWorkspace());
    if (this.undoStack.length > MAX_UNDO_STEPS) this.undoStack.shift();
    this.redoStack.length = 0;
    this.syncUndoRedoButtons();
  }

  private syncUndoRedoButtons(): void {
    this.undoBtn.disabled = this.undoStack.length <= 1;
    this.redoBtn.disabled = this.redoStack.length === 0;
  }

  private findMissingBlueprintKeys(state: SerializedPartState[]): string[] {
    const missingKeys: string[] = [];
    for (let i = 0; i < state.length; i++) {
      if (!this.extractor.getBlueprintSync(state[i].key)) {
        missingKeys.push(state[i].key);
      }
    }
    return missingKeys;
  }

  private restoreSnapshotSync(state: SerializedPartState[], deferRender = false): void {
    this.isApplyingHistory = true;
    try {
      // Fast-path O(1) in-place differential update when exact same UID/key topology exists!
      let sameTopology = state.length === this.placed.length;
      if (sameTopology) {
        for (let i = 0; i < state.length; i++) {
          if (this.placed[i].uid !== state[i].uid || this.placed[i].entry.key !== state[i].key) {
            sameTopology = false;
            break;
          }
        }
      }

      if (sameTopology) {
        for (let i = 0; i < state.length; i++) {
          const item = state[i];
          const inst = this.placed[i];
          const a = inst.anchor;
          const nextHidden = Boolean(item.hidden);
          const nextLocked = Boolean(item.locked);
          const xformChanged =
            a.position.x !== item.pos[0] ||
            a.position.y !== item.pos[1] ||
            a.position.z !== item.pos[2] ||
            a.rotation.x !== item.rot[0] ||
            a.rotation.y !== item.rot[1] ||
            a.rotation.z !== item.rot[2] ||
            a.scale.x !== item.scale[0] ||
            a.scale.y !== item.scale[1] ||
            a.scale.z !== item.scale[2];
          const visChanged = inst.hidden !== nextHidden;
          inst.locked = nextLocked;
          if (xformChanged) {
            a.position.set(item.pos[0], item.pos[1], item.pos[2]);
            a.rotation.set(item.rot[0], item.rot[1], item.rot[2]);
            a.scale.set(item.scale[0], item.scale[1], item.scale[2]);
            a.updateMatrixWorld();
            inst.transformEpoch++;
            this.syncInstanceMatrix(inst);
          }
          if (visChanged) {
            inst.hidden = nextHidden;
            a.visible = !nextHidden;
            this.syncInstanceVisibility(inst);
          }
        }
      } else {
        // Reconcile topology synchronously and rebuild MegaBatches ONCE
        const existingByUid = new Map<string, PlacedInstance>();
        for (let i = 0; i < this.placed.length; i++) {
          existingByUid.set(this.placed[i].uid, this.placed[i]);
        }
        const nextPlaced: PlacedInstance[] = [];
        const keepUids = new Set<string>();

        for (let i = 0; i < state.length; i++) {
          const item = state[i];
          const existing = existingByUid.get(item.uid);
          if (existing && existing.entry.key === item.key) {
            existing.anchor.position.set(item.pos[0], item.pos[1], item.pos[2]);
            existing.anchor.rotation.set(item.rot[0], item.rot[1], item.rot[2]);
            existing.anchor.scale.set(item.scale[0], item.scale[1], item.scale[2]);
            existing.hidden = Boolean(item.hidden);
            existing.locked = Boolean(item.locked);
            existing.anchor.visible = !existing.hidden;
            existing.transformEpoch++;
            nextPlaced.push(existing);
            keepUids.add(existing.uid);
          } else {
            const bp = this.extractor.getBlueprintSync(item.key);
            if (!bp) continue;
            const anchor = new THREE.Object3D();
            anchor.name = `pg_part_${item.uid}`;
            anchor.userData.pgInstanceId = item.uid;
            anchor.position.set(item.pos[0], item.pos[1], item.pos[2]);
            anchor.rotation.set(item.rot[0], item.rot[1], item.rot[2]);
            anchor.scale.set(item.scale[0], item.scale[1], item.scale[2]);
            anchor.visible = !item.hidden;
            this.partsGroup.add(anchor);
            nextPlaced.push({
              uid: item.uid,
              entry: bp.entry,
              blueprint: bp,
              anchor,
              opaqueBatchId: -1,
              glassBatchId: -1,
              hidden: Boolean(item.hidden),
              locked: Boolean(item.locked),
              invMatrix: new THREE.Matrix4(),
              transformEpoch: 1,
              invMatrixEpoch: -1,
              lastColorCode: -1,
              cachedSnap: {
                uid: item.uid,
                entry: bp.entry,
                worldBox: new THREE.Box3(),
                worldCenter: new THREE.Vector3(),
                worldSize: new THREE.Vector3(),
                position: new THREE.Vector3(),
                rotationEuler: new THREE.Euler(),
                scale: new THREE.Vector3(1, 1, 1),
              },
            });
            keepUids.add(item.uid);
          }
        }

        for (let i = 0; i < this.placed.length; i++) {
          if (!keepUids.has(this.placed[i].uid)) {
            this.partsGroup.remove(this.placed[i].anchor);
          }
        }
        this.placed = nextPlaced;
        this.partsGroupMatrixDirty = true;
        this.rebuildMegaBatches();
      }

      this.markSceneDirty();
      const prevSel = this.selectedUid;
      const stillExists = this.placed.some((p) => p.uid === this.selectedUid);
      this.selectedUid = stillExists
        ? this.selectedUid
        : (this.placed[this.placed.length - 1]?.uid ?? null);
      if (this.selectedUid !== prevSel || !sameTopology) {
        this.syncTransformAttachment();
      }

      this.refreshLiveBadge(false, deferRender);
    } finally {
      this.isApplyingHistory = false;
      this.syncUndoRedoButtons();
    }
  }

  private async restoreSnapshot(state: SerializedPartState[]): Promise<void> {
    const missingKeys = this.findMissingBlueprintKeys(state);
    if (missingKeys.length > 0) {
      await this.extractor.extractPartsBatch(missingKeys);
      if (!this.active) return;
    }
    this.restoreSnapshotSync(state, false);
  }

  public async undo(): Promise<void> {
    if (this.historyBusy || this.undoStack.length <= 1) return;
    this.historyBusy = true;
    const current = this.undoStack.pop()!;
    this.redoStack.push(current);
    try {
      const prev = this.undoStack[this.undoStack.length - 1];
      const missing = this.findMissingBlueprintKeys(prev);
      if (missing.length === 0) {
        this.restoreSnapshotSync(prev, true);
      } else {
        await this.extractor.extractPartsBatch(missing);
        if (!this.active) return;
        this.restoreSnapshotSync(prev, true);
      }
      this.showToast('元に戻しました');
    } catch {
      // Restore stack if async geometry extraction failed
      this.redoStack.pop();
      this.undoStack.push(current);
      this.showToast('元に戻す処理に失敗しました');
    } finally {
      this.historyBusy = false;
    }
  }

  public async redo(): Promise<void> {
    if (this.historyBusy || this.redoStack.length === 0) return;
    this.historyBusy = true;
    const next = this.redoStack.pop()!;
    this.undoStack.push(next);
    try {
      const missing = this.findMissingBlueprintKeys(next);
      if (missing.length === 0) {
        this.restoreSnapshotSync(next, true);
      } else {
        await this.extractor.extractPartsBatch(missing);
        if (!this.active) return;
        this.restoreSnapshotSync(next, true);
      }
      this.showToast('やり直しました');
    } catch {
      this.undoStack.pop();
      this.redoStack.push(next);
      this.showToast('やり直し処理に失敗しました');
    } finally {
      this.historyBusy = false;
    }
  }

  private downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8'): void {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  private exportBlueprintJson(): void {
    const payload = {
      format: 'sony-a7iv-playground-cad-v1.1',
      profile: this.designProfile,
      createdAt: new Date().toISOString(),
      parts: this.serializeWorkspace(),
    };
    this.downloadTextFile(
      'custom-camera-cad-v1.1-blueprint.json',
      JSON.stringify(payload, null, 2),
      'application/json'
    );
    this.showToast('設計JSONブループリント (v1.1) を保存しました');
  }

  private sanitizeImportedParts(rawParts: unknown[]): SerializedPartState[] {
    const MAX_IMPORT_PARTS = 500;
    const clampVec3 = (
      raw: unknown,
      fallback: [number, number, number],
      min: number,
      max: number
    ): [number, number, number] => {
      if (!Array.isArray(raw) || raw.length < 3) return fallback;
      const out: [number, number, number] = [fallback[0], fallback[1], fallback[2]];
      for (let i = 0; i < 3; i++) {
        const n = Number(raw[i]);
        out[i] = Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback[i];
      }
      return out;
    };

    const sanitized: SerializedPartState[] = [];
    const usedUids = new Set<string>();
    const limit = Math.min(rawParts.length, MAX_IMPORT_PARTS);
    for (let i = 0; i < limit; i++) {
      const item = rawParts[i] as Record<string, unknown> | null;
      if (!item || typeof item !== 'object') continue;
      if (typeof item.key !== 'string' || item.key.trim().length === 0 || item.key.length > 256) continue;
      const rawUid =
        typeof item.uid === 'string' && item.uid.trim().length > 0 && item.uid.length <= 128
          ? item.uid.trim()
          : `imp-${i + 1}`;
      let uid = rawUid;
      let suffix = 1;
      while (usedUids.has(uid)) {
        uid = `${rawUid}-${++suffix}`;
      }
      usedUids.add(uid);
      sanitized.push({
        uid,
        key: item.key,
        pos: clampVec3(item.pos, [0, 0, 0], -2000, 2000),
        rot: clampVec3(item.rot, [0, 0, 0], -3600, 3600),
        scale: clampVec3(item.scale, [1, 1, 1], 0.05, 20),
        hidden: Boolean(item.hidden),
        locked: Boolean(item.locked),
      });
    }
    return sanitized;
  }

  private async importBlueprintFile(file: File): Promise<void> {
    try {
      const text = await file.text();
      if (!this.active) return;
      const parsed = JSON.parse(text) as {
        schema?: string;
        certId?: string;
        primarySha256?: string;
        profile?: CameraDesignProfile;
        parts?: unknown[];
      };
      if (parsed && typeof parsed === 'object' && parsed.certId && parsed.primarySha256 && !Array.isArray(parsed.parts)) {
        this.importV11Certificate(parsed as unknown as V11CertificateRecord & { solverManifestSha256?: string });
        return;
      }
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.parts)) {
        throw new Error('invalid');
      }
      const cleanParts = this.sanitizeImportedParts(parsed.parts);
      if (parsed.parts.length > 0 && cleanParts.length === 0) {
        throw new Error('no valid parts');
      }
      if (parsed.profile && parsed.profile in CAMERA_PROFILE_LABELS) {
        this.designProfile = parsed.profile;
        this.profileSelectEl.value = parsed.profile;
      }
      await this.restoreSnapshot(cleanParts);
      if (!this.active) return;
      this.pushHistorySnapshot();
      this.fitCameraToWorkspace();
      this.showToast(`${cleanParts.length}パーツの設計JSONを読み込みました`);
    } catch {
      this.showToast('設計JSONの読み込みに失敗しました');
    }
  }

  // =========================================================================
  // Zero-GC Cached-Inverse OBB + Scalar SNORM16 Triangle Click Picker & Hotkeys
  // =========================================================================
  private onCanvasPointerDown(e: PointerEvent): void {
    this.pointerDown.set(e.clientX, e.clientY);
  }

  private onCanvasPointerUp(e: PointerEvent): void {
    if (!this.active) return;
    if ((this.transform as unknown as { dragging?: boolean }).dragging) return;
    if (Math.hypot(e.clientX - this.pointerDown.x, e.clientY - this.pointerDown.y) > 5) return;

    const rect =
      this.cachedCanvasRect ?? (this.cachedCanvasRect = this.host.renderer.domElement.getBoundingClientRect());
    if (rect.width <= 0 || rect.height <= 0) return;
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const wOrigin = this.raycaster.ray.origin;
    const wDir = this.raycaster.ray.direction;

    // 1. Broad-phase OBB slab test using cached per-instance inverse matrix (0 redundant invert() calls!)
    const cands = this.pickCandidates;
    let candCount = 0;

    for (let i = 0; i < this.placed.length; i++) {
      const inst = this.placed[i];
      if (inst.hidden) continue;

      if (inst.invMatrixEpoch !== inst.transformEpoch) {
        inst.invMatrix.copy(inst.anchor.matrixWorld).invert();
        inst.invMatrixEpoch = inst.transformEpoch;
      }
      const m = inst.invMatrix.elements;
      const ox = m[0] * wOrigin.x + m[4] * wOrigin.y + m[8] * wOrigin.z + m[12];
      const oy = m[1] * wOrigin.x + m[5] * wOrigin.y + m[9] * wOrigin.z + m[13];
      const oz = m[2] * wOrigin.x + m[6] * wOrigin.y + m[10] * wOrigin.z + m[14];
      const dx = m[0] * wDir.x + m[4] * wDir.y + m[8] * wDir.z;
      const dy = m[1] * wDir.x + m[5] * wDir.y + m[9] * wDir.z;
      const dz = m[2] * wDir.x + m[6] * wDir.y + m[10] * wDir.z;

      const he = inst.blueprint.halfExtents;
      let tMin = 0.0;
      let tMax = Infinity;

      // X slab
      if (Math.abs(dx) < 1e-8) {
        if (ox < -he.x || ox > he.x) continue;
      } else {
        const inv = 1.0 / dx;
        let t1 = (-he.x - ox) * inv;
        let t2 = (he.x - ox) * inv;
        if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
        if (t1 > tMin) tMin = t1;
        if (t2 < tMax) tMax = t2;
        if (tMin > tMax) continue;
      }
      // Y slab
      if (Math.abs(dy) < 1e-8) {
        if (oy < -he.y || oy > he.y) continue;
      } else {
        const inv = 1.0 / dy;
        let t1 = (-he.y - oy) * inv;
        let t2 = (he.y - oy) * inv;
        if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
        if (t1 > tMin) tMin = t1;
        if (t2 < tMax) tMax = t2;
        if (tMin > tMax) continue;
      }
      // Z slab
      if (Math.abs(dz) < 1e-8) {
        if (oz < -he.z || oz > he.z) continue;
      } else {
        const inv = 1.0 / dz;
        let t1 = (-he.z - oz) * inv;
        let t2 = (he.z - oz) * inv;
        if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
        if (t1 > tMin) tMin = t1;
        if (t2 < tMax) tMax = t2;
        if (tMin > tMax) continue;
      }

      if (candCount < cands.length) {
        cands[candCount].inst = inst;
        cands[candCount].tMin = tMin;
      } else {
        cands.push({ inst, tMin });
      }
      candCount++;
    }

    if (candCount === 0) {
      this.selectInstance(null);
      return;
    }

    // Insertion-sort candidates front-to-back (zero allocations, candCount is tiny ~1..6)
    for (let i = 1; i < candCount; i++) {
      const curInst = cands[i].inst;
      const curT = cands[i].tMin;
      let j = i - 1;
      while (j >= 0 && cands[j].tMin > curT) {
        cands[j + 1].inst = cands[j].inst;
        cands[j + 1].tMin = cands[j].tMin;
        j--;
      }
      cands[j + 1].inst = curInst;
      cands[j + 1].tMin = curT;
    }

    // 2. Narrow-phase scalar Möller-Trumbore directly on SNORM16 geometry reusing cached inst.invMatrix!
    let bestT = Infinity;
    let bestUid: string | null = null;
    for (let i = 0; i < candCount; i++) {
      if (cands[i].tMin >= bestT) break;
      const inst = cands[i].inst;
      const m = inst.invMatrix.elements;
      _pgRayOrigin.set(
        m[0] * wOrigin.x + m[4] * wOrigin.y + m[8] * wOrigin.z + m[12],
        m[1] * wOrigin.x + m[5] * wOrigin.y + m[9] * wOrigin.z + m[13],
        m[2] * wOrigin.x + m[6] * wOrigin.y + m[10] * wOrigin.z + m[14]
      );
      _pgRayDir.set(
        m[0] * wDir.x + m[4] * wDir.y + m[8] * wDir.z,
        m[1] * wDir.x + m[5] * wDir.y + m[9] * wDir.z,
        m[2] * wDir.x + m[6] * wDir.y + m[10] * wDir.z
      );

      let t = bestT;
      if (inst.blueprint.opaque) {
        t = intersectQuantizedPack(
          inst.blueprint.opaque,
          _pgRayOrigin.x,
          _pgRayOrigin.y,
          _pgRayOrigin.z,
          _pgRayDir.x,
          _pgRayDir.y,
          _pgRayDir.z,
          t
        );
      }
      if (inst.blueprint.glass) {
        t = intersectQuantizedPack(
          inst.blueprint.glass,
          _pgRayOrigin.x,
          _pgRayOrigin.y,
          _pgRayOrigin.z,
          _pgRayDir.x,
          _pgRayDir.y,
          _pgRayDir.z,
          t
        );
      }
      if (t < bestT) {
        bestT = t;
        bestUid = inst.uid;
      }
    }

    if (bestUid !== this.selectedUid) {
      this.selectInstance(bestUid);
    }
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (!this.active) return;
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (this.shortcutModalEl.classList.contains('is-open')) {
        this.shortcutModalEl.classList.remove('is-open');
        this.shortcutModalEl.setAttribute('aria-hidden', 'true');
      } else if (this.reportModalEl.classList.contains('is-open')) {
        this.closeEvaluationReport();
      } else {
        this.close();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) void this.redo();
      else void this.undo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      void this.redo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      void this.duplicateSelected();
      return;
    }

    const k = e.key.toLowerCase();
    if (k === 'w' || k === 'g') this.setTransformMode('translate');
    else if (k === 'e' || k === 'r') this.setTransformMode('rotate');
    else if (k === 's') this.setTransformMode('scale');
    else if (k === 'q') this.toggleSpace();
    else if (k === '1') this.setCameraView('iso');
    else if (k === '2') this.setCameraView('front');
    else if (k === '3') this.setCameraView('side');
    else if (k === '4') this.setCameraView('top');
    else if (k === '5') this.setCameraView('back');
    else if (k === 'f') {
      const sel = this.getSelectedInstance();
      if (sel) this.focusOnInstance(sel);
      else this.fitCameraToWorkspace();
    } else if (e.key === '?') {
      const open = !this.shortcutModalEl.classList.contains('is-open');
      this.shortcutModalEl.classList.toggle('is-open', open);
      this.shortcutModalEl.setAttribute('aria-hidden', open ? 'false' : 'true');
    } else if (k === 'delete' || k === 'backspace') {
      this.deleteSelected();
    }
  }

  public dispose(): void {
    this.close();
    if (this.toastTimer) {
      window.clearTimeout(this.toastTimer);
      this.toastTimer = 0;
    }
    if (this.workerDebounceTimer) {
      window.clearTimeout(this.workerDebounceTimer);
      this.workerDebounceTimer = 0;
    }
    if (this.examWorker) {
      this.examWorker.terminate();
      this.examWorker = null;
    }
    this.clearAllPartsInternal();
    this.disposePgFastBlitResources();
    this.overlayLines.geometry.dispose();
    const overlayMat = this.overlayLines.material;
    if (Array.isArray(overlayMat)) {
      for (const m of overlayMat) m.dispose();
    } else {
      overlayMat.dispose();
    }
    this.pgCache.disposeAll();
    this.extractor.dispose();
    this.transform.dispose();
    this.orbit.dispose();
    this.rootEl.remove();
  }
}
