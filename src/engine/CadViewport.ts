import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  AssemblyController,
  CadPart,
  CameraPreset,
  GraphicsQuality,
  LensSection,
  RenderMode,
  ScaleMode,
  SectionAxis,
} from '../assemblies/types';
import { createMaterialLibrary, MaterialLibrary } from './Materials';
import { GPU_PROFILE } from './GpuOptimizer';
import {
  advanceMegaBatchRenderEpoch,
  compileMegaBatchChunk,
  compileUnifiedMacroBatch,
  computePartWorldBox,
  invalidateRaycastTlas,
  MacroGroupKey,
  MaterialLutRegistry,
  MAX_PARTS_CAPACITY,
  MegaBatchChunk,
  PartPickRecord,
  PartStateTextureBuffer,
  pickPartTwoPhase,
  UnifiedMacroBatch,
} from './GpuMegaBatch';
import { bakeAssembledVisibilityMask, computeActiveOracleViewBits } from './OcclusionOracle';
import { buildPrebakedOcclusionMask } from './PrebakedPvsOracle';
import { OverlaySource, PhysicsOverlayBatcher } from './PhysicsOverlayBatcher';
import { UltraRaytraceHdrPipeline } from './UltraRaytraceHdrPipeline';
import { createLensAssembly } from '../assemblies/lens';
import { sharedLensOpticalSim } from '../assemblies/lens/lensOpticalSim';
import { createMountAssembly } from '../assemblies/mount';
import { createShutterAssembly } from '../assemblies/shutter';
import { createSensorAssemblies } from '../assemblies/sensor';
import { createMainboardAssembly } from '../assemblies/mainboard';
import { createEvfAssembly } from '../assemblies/evf';
import { createLcdAssembly } from '../assemblies/lcd';
import { createBodyAssembly } from '../assemblies/body';
import { createBatteryAssembly } from '../assemblies/battery';
import { createCfexpressAssembly } from '../assemblies/cfexpress';
import { createBionzAssembly } from '../assemblies/bionz';
import { createMiShoeAssembly } from '../assemblies/mishoe';
import { createMicAssembly } from '../assemblies/mic';

export interface ViewportCallbacks {
  onSelectPart: (part: CadPart | null) => void;
  onHoverPart: (partId: string | null) => void;
  onVisibilityChanged: () => void;
  onQualityChanged?: (quality: GraphicsQuality) => void;
}

type SubsystemKey = CadPart['subsystem'];

interface SubsystemChunks {
  standalone: MegaBatchChunk[];
  /** For lens 3-section fast GPU culling: maps chunk -> lensSection (1|2|3) */
  chunkSection: Map<MegaBatchChunk, LensSection>;
}

const _focusBox = new THREE.Box3();
const _focusCenter = new THREE.Vector3();
const _focusOffset = new THREE.Vector3();
const _bonePos = new THREE.Vector3();
const _boneQuat = new THREE.Quaternion();
const _boneScale = new THREE.Vector3();

// Zero-alloc scratch buffers for OMEGA-6 & OMEGA-10 Dynamic Front-to-Back Visibility Compactor
const _visSlots = new Int32Array(MAX_PARTS_CAPACITY);
const _visDistSq = new Float32Array(MAX_PARTS_CAPACITY);
const _straddleSlots = new Int32Array(MAX_PARTS_CAPACITY);
const _straddleDistSq = new Float32Array(MAX_PARTS_CAPACITY);
const _edgeSlots = new Int32Array(MAX_PARTS_CAPACITY);
const _straddleEdgeSlots = new Int32Array(MAX_PARTS_CAPACITY);
const _frustum = new THREE.Frustum();
const _frustumPlanesFlat = new Float32Array(24);
const _projScreen = new THREE.Matrix4();
const _camDir = new THREE.Vector3();

// OMEGA-10 O(N) 32-Bin Linear Distance Histogram Counting Sort Scratch
const SORT_BINS = 32;
const _binCounts = new Int32Array(SORT_BINS);
const _binOffsets = new Int32Array(SORT_BINS);
const _binIdxScratch = new Uint8Array(MAX_PARTS_CAPACITY);
const _sortOutSlots = new Int32Array(MAX_PARTS_CAPACITY);

function sortSlotsFrontToBackFast(slots: Int32Array, distSq: Float32Array, count: number): void {
  if (count <= 1) return;
  if (count <= 28) {
    for (let i = 1; i < count; i++) {
      const keyD = distSq[i];
      const keyS = slots[i];
      let j = i - 1;
      while (j >= 0 && distSq[j] > keyD) {
        distSq[j + 1] = distSq[j];
        slots[j + 1] = slots[j];
        j--;
      }
      distSq[j + 1] = keyD;
      slots[j + 1] = keyS;
    }
    return;
  }

  let minD = distSq[0];
  let maxD = distSq[0];
  for (let i = 1; i < count; i++) {
    const d = distSq[i];
    if (d < minD) minD = d;
    else if (d > maxD) maxD = d;
  }
  const span = maxD - minD;
  if (span < 1e-4) return;

  _binCounts.fill(0);
  const scale = (SORT_BINS - 1) / span;
  for (let i = 0; i < count; i++) {
    const b = ((distSq[i] - minD) * scale) | 0;
    _binIdxScratch[i] = b;
    _binCounts[b]++;
  }
  let sum = 0;
  for (let b = 0; b < SORT_BINS; b++) {
    _binOffsets[b] = sum;
    sum += _binCounts[b];
  }
  for (let i = 0; i < count; i++) {
    const b = _binIdxScratch[i];
    _sortOutSlots[_binOffsets[b]++] = slots[i];
  }
  slots.set(_sortOutSlots.subarray(0, count), 0);
}

// Precomputed linear RGB edge highlight colors for Mega-Edge GPU state texture
const EDGE_COL_SELECTED = new THREE.Color(0x0d5bd9);
const EDGE_COL_HOVERED = new THREE.Color(0x2563eb);
const EDGE_COL_CAD = new THREE.Color(0x14161a);
const EDGE_COL_XRAY = new THREE.Color(0x3a516e);
const EDGE_COL_SOLID = new THREE.Color(0x181c24);

export class CadViewport {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private materials: MaterialLibrary;
  private lensAssembly: AssemblyController;
  private mountAssembly: AssemblyController;
  private shutterAssembly: AssemblyController;
  private sensorAssembly: AssemblyController;
  private mainboardAssembly: AssemblyController;
  private evfAssembly: AssemblyController;
  private lcdAssembly: AssemblyController;
  private bodyAssembly: AssemblyController;
  private microAssembly: AssemblyController;
  private batteryAssembly: AssemblyController;
  private cfexpressAssembly: AssemblyController;
  private bionzAssembly: AssemblyController;
  private mishoeAssembly: AssemblyController;
  private micAssembly: AssemblyController;
  private assemblyBySubsystem: Record<SubsystemKey, AssemblyController>;
  private allParts: CadPart[] = [];
  private partById = new Map<string, CadPart>();
  private callbacks: ViewportCallbacks;

  // OMEGA-CAD v7 Engine
  private partStateBuf: PartStateTextureBuffer;
  private matRegistry: MaterialLutRegistry;
  private macroBatch!: UnifiedMacroBatch;
  private overlayBatcher: PhysicsOverlayBatcher;
  private guideOverlaySources: OverlaySource[] = [];
  private physicsOverlaySources: OverlaySource[] = [];
  private subsystemChunks: Record<SubsystemKey, SubsystemChunks>;
  private allChunks: MegaBatchChunk[] = [];
  private activeChunks: MegaBatchChunk[] = [];
  private pickRecords: PartPickRecord[] = [];
  private pickRecordByPartId = new Map<string, PartPickRecord>();
  private activePickRecords: PartPickRecord[] = [];

  // 16-View Directional Hemisphere Bitmask PVS Oracle masks
  private assembledIntegratedMask: Uint16Array | null = null;
  private assembledBodyMask: Uint16Array | null = null;
  private inOracleBake = false;
  private inSubPass = false;
  private ultraPipeline: UltraRaytraceHdrPipeline;
  private drawBufSize = new THREE.Vector2(1, 1);

  // OMEGA-4 & OMEGA-10: Dual-Channel Overlay + Temporal Visibility Memoization state
  private visibilityDirty = true;
  private guidesDirty = true;
  private physicsOverlaysDirty = true;
  private lastAnalyticalIntegrated: boolean | null = null;
  private lastSortCamPos = new THREE.Vector3(1e9, 1e9, 1e9);
  private lastSortCamDir = new THREE.Vector3(0, 0, 1);
  private lastSortCamDist = -1;
  private lastSortMode: ScaleMode | null = null;
  private lastSortWasAssembled = true;
  private lastOracleViewBits = 0xffff;
  private lastVisCamPos = new THREE.Vector3(1e9, 1e9, 1e9);
  private lastVisCamQuat = new THREE.Quaternion();
  private lastVisExplode = -1;
  private lastVisSectionAxis: SectionAxis = 'off';
  private lastVisSectionVal = -1;
  private lastVisSelSlot = -2;
  private lastVisHovSlot = -2;

  private clippingPlane: THREE.Plane;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private pointerDownPos = new THREE.Vector2();
  private hoverRaycastPending = false;

  // State — opens directly onto the COMPLETE 305-macro-layer assembled flagship mirrorless camera!
  private mode: ScaleMode = 'integrated';
  /** Active lightweight 1/3 standalone GM lens section: 1 = Rear (default), 2 = Middle, 3 = Front */
  private lensSection: LensSection = 1;
  private renderMode: RenderMode = 'solid';
  private quality: GraphicsQuality = GPU_PROFILE.isMobile ? 'high' : 'ultra';
  private sectionAxis: SectionAxis = 'off';
  private sectionValue = 0.5;
  private targetExplode = 0;
  private currentExplode = 0;
  private physicsActive = false;

  private selectedPartId: string | null = null;
  private hoveredPartId: string | null = null;
  private isolatedPartId: string | null = null;
  private hiddenPartIds = new Set<string>();

  // Smooth camera transition
  private camAnimActive = false;
  private camStartPos = new THREE.Vector3();
  private camEndPos = new THREE.Vector3();
  private camStartTarget = new THREE.Vector3();
  private camEndTarget = new THREE.Vector3();
  private camAnimT = 0;

  // Dirty-Delta Kinematic Scheduler (skips all 305-part math & GPU uploads during static orbit!)
  private kinematicsDirty = true;
  private lastSyncedExplode = -1;
  private lastSyncedIntegrated = false;
  private lastSyncedPhysics = false;

  private resizeObserver: ResizeObserver | null = null;
  private boundHandleResize = () => this.handleResize();

  // GPU stability, WebGL context-loss recovery & mobile adaptive interaction scaling
  private currentMaxPixelRatio = GPU_PROFILE.maxPixelRatio;
  private interactionScaleActive = false;
  private interactionRestoreTimer: number | null = null;
  private contextLost = false;
  private contextLossCount = 0;
  private pageHidden = false;
  private recoveryOverlay: HTMLElement;
  private boundVisibilityChange = () => this.handleVisibilityChange();
  private boundContextLost = (e: Event) => this.handleContextLost(e);
  private boundContextRestored = () => this.handleContextRestored();

  private clock = new THREE.Clock();
  private rafId = 0;
  private dirtyFrames = 1;
  private idleFrameStreak = 0;
  private disposed = false;
  private cachedDomRect: DOMRect | null = null;

  constructor(container: HTMLElement, callbacks: ViewportCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    // Renderer configured for crisp industrial CAD look on pure white (#FFFFFF)
    this.renderer = new THREE.WebGLRenderer({
      antialias: GPU_PROFILE.antialias,
      alpha: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    // Keep one-time shader compile/link diagnostics enabled so driver errors are never silently swallowed
    this.renderer.debug.checkShaderErrors = true;
    this.renderer.shadowMap.enabled = false;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.currentMaxPixelRatio));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.localClippingEnabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.09;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    // Zero-text SVG recovery spinner overlay (only shown if OS/GPU triggers webglcontextlost)
    this.recoveryOverlay = document.createElement('div');
    this.recoveryOverlay.className = 'gpu-recovery-overlay';
    this.recoveryOverlay.setAttribute('aria-hidden', 'true');
    this.recoveryOverlay.innerHTML =
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" opacity="0.22"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>';
    container.appendChild(this.recoveryOverlay);

    // Pure solid white scene (Studio lighting & softbox reflections are evaluated analytically inside
    // our ultra-lean StudioCadPbrShader — ZERO PMREM CubeUV renders & ZERO monolithic Three.js PBR shaders!)
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // Camera & OrbitControls (supports ultra-close watchmaker micro-zoom down to 7 mm with 7x sharper depth precision!)
    const aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(32, aspect, 0.85, 4200);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.065;
    this.controls.minDistance = 7;
    this.controls.maxDistance = 2600;
    this.controls.addEventListener('change', () => {
      this.markDirty(2);
      if (GPU_PROFILE.isMobile) {
        this.beginMobileInteractionScale();
      }
    });

    // Shared real-time CAD section-cut clipping plane (disabled at +Infinity when off)
    this.clippingPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 10000);
    this.materials = createMaterialLibrary([this.clippingPlane]);

    // Initialize Breakthrough GPU Kinematic State Texture, Dual-Tier Texture2DArray LUT & Overlay Batcher
    this.partStateBuf = new PartStateTextureBuffer();
    this.matRegistry = new MaterialLutRegistry(this.partStateBuf.texture, [this.clippingPlane]);
    // Breakthrough #22/30: Single-shot native-res pre-pack of all 19 procedural CanvasTextures into Texture2DArray
    this.matRegistry.prepackAllMaterials(this.materials.allMaterials);
    this.overlayBatcher = new PhysicsOverlayBatcher(
      this.matRegistry.uniforms.uViewProj,
      this.matRegistry.uniforms.uClipPlane
    );

    // Initialize 3-Tier Studio Shadow / Ray Tracing / Planar Reflection / 16-Bit HDR Pipeline
    this.ultraPipeline = new UltraRaytraceHdrPipeline(this.renderer, this.matRegistry);
    this.scene.add(this.ultraPipeline.getHighFloorMesh());

    // Hook WebGLRenderer.render() automatically so EVERY render updates uViewProj, overlays & front-to-back IBO compaction!
    this.scene.onBeforeRender = (_renderer, _scene, camera) => {
      this.prepareFrameForRender(camera);
    };

    // Build ALL 14 subsystem controllers (305 macro parts built upfront; 627 standalone-only, micro,
    // battery, cfexpress, bionz, mishoe & mic parts lazily hydrated on first visit — ALL 932 parts 100% preserved!)
    this.lensAssembly = createLensAssembly(this.materials);
    this.mountAssembly = createMountAssembly(this.materials);
    this.shutterAssembly = createShutterAssembly(this.materials);
    const { sensor, micro } = createSensorAssemblies(this.materials);
    this.sensorAssembly = sensor;
    this.microAssembly = micro;
    this.mainboardAssembly = createMainboardAssembly(this.materials);
    this.evfAssembly = createEvfAssembly(this.materials);
    this.lcdAssembly = createLcdAssembly(this.materials);
    this.bodyAssembly = createBodyAssembly(this.materials);
    this.batteryAssembly = createBatteryAssembly(this.materials);
    this.cfexpressAssembly = createCfexpressAssembly(this.materials);
    this.bionzAssembly = createBionzAssembly(this.materials);
    this.mishoeAssembly = createMiShoeAssembly(this.materials);
    this.micAssembly = createMicAssembly(this.materials);

    this.assemblyBySubsystem = {
      lens: this.lensAssembly,
      mount: this.mountAssembly,
      shutter: this.shutterAssembly,
      sensor: this.sensorAssembly,
      mainboard: this.mainboardAssembly,
      evf: this.evfAssembly,
      lcd: this.lcdAssembly,
      body: this.bodyAssembly,
      micro: this.microAssembly,
      battery: this.batteryAssembly,
      cfexpress: this.cfexpressAssembly,
      bionz: this.bionzAssembly,
      mishoe: this.mishoeAssembly,
      mic: this.micAssembly,
    };

    const emptyChunks = (): SubsystemChunks => ({
      standalone: [],
      chunkSection: new Map(),
    });
    this.subsystemChunks = {
      lens: emptyChunks(),
      mount: emptyChunks(),
      shutter: emptyChunks(),
      sensor: emptyChunks(),
      mainboard: emptyChunks(),
      evf: emptyChunks(),
      lcd: emptyChunks(),
      body: emptyChunks(),
      micro: emptyChunks(),
      battery: emptyChunks(),
      cfexpress: emptyChunks(),
      bionz: emptyChunks(),
      mishoe: emptyChunks(),
      mic: emptyChunks(),
    };

    this.scene.add(
      this.lensAssembly.rootGroup,
      this.mountAssembly.rootGroup,
      this.shutterAssembly.rootGroup,
      this.sensorAssembly.rootGroup,
      this.mainboardAssembly.rootGroup,
      this.evfAssembly.rootGroup,
      this.lcdAssembly.rootGroup,
      this.bodyAssembly.rootGroup,
      this.microAssembly.rootGroup,
      this.batteryAssembly.rootGroup,
      this.cfexpressAssembly.rootGroup,
      this.bionzAssembly.rootGroup,
      this.mishoeAssembly.rootGroup,
      this.micAssembly.rootGroup
    );

    // Breakthrough #17/27: Compile ALL 305 startup macro parts into ONE Unified Compactable VBO/IBO!
    const groupedMacro: Record<MacroGroupKey, CadPart[]> = {
      lens_1: this.lensAssembly.parts.filter((p) => (p.lensSection ?? 2) === 1),
      lens_2: this.lensAssembly.parts.filter((p) => (p.lensSection ?? 2) === 2),
      lens_3: this.lensAssembly.parts.filter((p) => (p.lensSection ?? 2) === 3),
      mount: this.mountAssembly.parts,
      shutter: this.shutterAssembly.parts,
      sensor: this.sensorAssembly.parts,
      mainboard: this.mainboardAssembly.parts,
      evf: this.evfAssembly.parts,
      lcd: this.lcdAssembly.parts,
      body: this.bodyAssembly.parts,
    };
    for (const grpParts of Object.values(groupedMacro)) {
      for (const p of grpParts) {
        this.allParts.push(p);
        this.partById.set(p.id, p);
      }
    }

    this.macroBatch = compileUnifiedMacroBatch(groupedMacro, this.partStateBuf, this.matRegistry);
    this.scene.add(this.macroBatch.group);
    this.registerChunkRecords(this.macroBatch);
    this.matRegistry.texPacker.releaseScratchCanvases();

    // OMEGA-4A: Intercept & split detached physics overlays vs static/explode trajectory guides
    for (const asm of Object.values(this.assemblyBySubsystem)) {
      const remaining = [...asm.rootGroup.children];
      for (const child of remaining) {
        child.removeFromParent();
        const isGuide =
          child.userData.__isExplodeGuides === true ||
          child.children.some((c) => c.userData.__isExplodeGuides === true);
        const entry: OverlaySource = {
          isAssemblyVisible: () => asm.rootGroup.visible,
          root: child,
        };
        if (isGuide) {
          this.guideOverlaySources.push(entry);
        } else {
          this.physicsOverlaySources.push(entry);
        }
      }
    }
    this.scene.add(this.overlayBatcher.group);

    this.syncAssemblyVisibility();
    this.stepActiveAssemblies(0, 0);
    this.applyVisibilityAndStyles();
    this.syncGpuPartTransforms(true);
    // Zero-millisecond Pre-Baked 16-View Directional Hemisphere PVS Oracle (0 GPU readbacks!)
    this.assembledIntegratedMask = buildPrebakedOcclusionMask(
      'integrated',
      this.macroBatch.partRecords,
      this.macroBatch.transparentPartSlots,
      MAX_PARTS_CAPACITY
    );
    this.assembledBodyMask = buildPrebakedOcclusionMask(
      'camera_body',
      this.macroBatch.partRecords,
      this.macroBatch.transparentPartSlots,
      MAX_PARTS_CAPACITY
    );
    this.setCameraPreset('iso', true);
    this.bindEvents();
    this.wakeLoop();
  }

  private readonly subsystemHydrateInflight = new Map<SubsystemKey, Promise<void>>();
  private pendingSelectAfterHydrate: { partId: string; focusCamera: boolean } | null = null;

  private registerStandaloneParts(subsystem: SubsystemKey, parts: CadPart[]): void {
    if (parts.length === 0) return;

    for (const p of parts) {
      this.allParts.push(p);
      this.partById.set(p.id, p);
    }

    const asm = this.assemblyBySubsystem[subsystem];
    const bucket = this.subsystemChunks[subsystem];

    if (subsystem === 'lens') {
      for (const sec of [1, 2, 3] as LensSection[]) {
        const secParts = parts.filter((p) => (p.lensSection ?? 2) === sec);
        if (secParts.length === 0) continue;
        const chunk = compileMegaBatchChunk(
          secParts,
          this.partStateBuf,
          this.matRegistry,
          [this.clippingPlane]
        );
        asm.rootGroup.add(chunk.group);
        bucket.standalone.push(chunk);
        bucket.chunkSection.set(chunk, sec);
        this.registerChunkRecords(chunk);
      }
    } else {
      const chunk = compileMegaBatchChunk(
        parts,
        this.partStateBuf,
        this.matRegistry,
        [this.clippingPlane]
      );
      asm.rootGroup.add(chunk.group);
      bucket.standalone.push(chunk);
      this.registerChunkRecords(chunk);
    }
    this.matRegistry.texPacker.releaseScratchCanvases();
    this.lastAnalyticalIntegrated = null;
  }

  private registerChunkRecords(chunk: MegaBatchChunk): void {
    this.allChunks.push(chunk);
    for (const rec of chunk.partRecords) {
      this.pickRecords.push(rec);
      this.pickRecordByPartId.set(rec.part.id, rec);
    }
    chunk.syncMaterials(this.matRegistry);
    chunk.setXrayActive(this.renderMode === 'xray');
    this.visibilityDirty = true;
    invalidateRaycastTlas();
  }

  private finalizeSubsystemHydration(
    subsystem: SubsystemKey,
    newlyBuilt: CadPart[],
    quiet = false
  ): void {
    if (newlyBuilt.length === 0) return;
    this.registerStandaloneParts(subsystem, newlyBuilt);
    this.kinematicsDirty = true;
    if (quiet) return;
    this.syncAssemblyVisibility();
    this.stepActiveAssemblies(this.clock.getElapsedTime(), 0);
    this.updateActiveExplodeGuides();
    this.applyVisibilityAndStyles();
    this.syncGpuPartTransforms(true);
    this.callbacks.onVisibilityChanged();
    if (this.pendingSelectAfterHydrate && this.partById.has(this.pendingSelectAfterHydrate.partId)) {
      const pending = this.pendingSelectAfterHydrate;
      this.pendingSelectAfterHydrate = null;
      this.selectPart(pending.partId, pending.focusCamera);
    }
  }

  private hydrateSubsystemIfNeeded(subsystem: SubsystemKey, quiet = false): Promise<void> {
    const existing = this.subsystemHydrateInflight.get(subsystem);
    if (existing) return existing;

    const asm = this.assemblyBySubsystem[subsystem];
    if (!asm.hydrateStandalone || (asm.deferredStandaloneCount ?? 0) === 0) {
      return Promise.resolve();
    }

    const res = asm.hydrateStandalone();
    if (Array.isArray(res)) {
      this.finalizeSubsystemHydration(subsystem, res, quiet);
      return Promise.resolve();
    }

    const promise = res
      .then((newlyBuilt) => {
        this.subsystemHydrateInflight.delete(subsystem);
        this.finalizeSubsystemHydration(subsystem, newlyBuilt, quiet);
      })
      .catch(() => {
        this.subsystemHydrateInflight.delete(subsystem);
      });
    this.subsystemHydrateInflight.set(subsystem, promise);
    return promise;
  }

  /** Total canonical dissectible part count across all 14 subsystems (always 932 — zero parts removed!). */
  public getTotalPartCount(): number {
    let deferred = 0;
    for (const asm of Object.values(this.assemblyBySubsystem)) {
      deferred += asm.deferredStandaloneCount ?? 0;
    }
    return this.allParts.length + deferred;
  }

  /** Force-hydrate every deferred standalone/micro subsystem immediately (resolves to 932). */
  public async ensureAllHydrated(): Promise<number> {
    const subs = Object.keys(this.assemblyBySubsystem) as SubsystemKey[];
    await Promise.all(subs.map((sub) => this.hydrateSubsystemIfNeeded(sub, true)));
    this.syncAssemblyVisibility();
    this.applyVisibilityAndStyles();
    this.syncGpuPartTransforms(true);
    return this.allParts.length;
  }

  private beginMobileInteractionScale(): void {
    if (!this.interactionScaleActive && this.currentMaxPixelRatio > 1.15) {
      this.interactionScaleActive = true;
      const interactiveDpr = Math.max(1.0, this.currentMaxPixelRatio * 0.78);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, interactiveDpr));
    }
    if (this.interactionRestoreTimer !== null) {
      window.clearTimeout(this.interactionRestoreTimer);
    }
    this.interactionRestoreTimer = window.setTimeout(() => {
      this.interactionRestoreTimer = null;
      if (this.interactionScaleActive) {
        this.interactionScaleActive = false;
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.currentMaxPixelRatio));
        this.markDirty(2);
      }
    }, 160);
  }

  private isStandaloneMicroMode(mode: ScaleMode = this.mode): boolean {
    return (
      mode === 'micro' ||
      mode === 'battery' ||
      mode === 'cfexpress' ||
      mode === 'bionz' ||
      mode === 'mishoe' ||
      mode === 'mic'
    );
  }

  private isPartInCurrentMode(part: CadPart): boolean {
    const isUltraStandalone =
      part.subsystem === 'micro' ||
      part.subsystem === 'battery' ||
      part.subsystem === 'cfexpress' ||
      part.subsystem === 'bionz' ||
      part.subsystem === 'mishoe' ||
      part.subsystem === 'mic';
    if (this.mode === 'integrated') {
      return !isUltraStandalone && !part.standaloneOnly;
    }
    if (this.mode === 'camera_body') {
      return !isUltraStandalone && part.subsystem !== 'lens' && !part.standaloneOnly;
    }
    if (this.mode === 'lens') {
      if (part.subsystem !== 'lens') return false;
      if (sharedLensOpticalSim.studioOpen) {
        return !part.standaloneOnly;
      }
      return (part.lensSection ?? 2) === this.lensSection;
    }
    return part.subsystem === this.mode;
  }

  private syncChunkVisibility(): void {
    const isAllBody = this.mode === 'integrated' || this.mode === 'camera_body';
    this.activeChunks.length = 0;

    if (this.isStandaloneMicroMode()) {
      this.macroBatch.setHidden();
    } else {
      this.macroBatch.group.visible = true;
      this.activeChunks.push(this.macroBatch);
    }

    // Standalone / Micro / Battery / CFexpress / BIONZ / MI Shoe / Mic lazily hydrated chunks
    for (const sub of Object.keys(this.subsystemChunks) as SubsystemKey[]) {
      const chunks = this.subsystemChunks[sub];
      const asmVisible = this.assemblyBySubsystem[sub].rootGroup.visible;

      if (!asmVisible) {
        for (const c of chunks.standalone) c.group.visible = false;
        continue;
      }

      if (sub === 'lens') {
        const showStandalone = this.mode === 'lens' && !sharedLensOpticalSim.studioOpen;
        for (const c of chunks.standalone) {
          c.group.visible = showStandalone && chunks.chunkSection.get(c) === this.lensSection;
          if (c.group.visible) this.activeChunks.push(c);
        }
      } else {
        const showStandalone = !isAllBody && this.mode === sub;
        for (const c of chunks.standalone) {
          c.group.visible = showStandalone;
          if (showStandalone) this.activeChunks.push(c);
        }
      }
    }

    // Rebuild compact activePickRecords cache for instant Two-Phase BVH raycasting!
    this.activePickRecords.length = 0;
    for (let i = 0; i < this.pickRecords.length; i++) {
      const rec = this.pickRecords[i];
      if (this.isPartInCurrentMode(rec.part)) {
        this.activePickRecords.push(rec);
      }
    }
    this.visibilityDirty = true;
    invalidateRaycastTlas();
  }

  private updateActiveExplodeGuides(): void {
    this.lensAssembly.updateExplodeGuides(this.currentExplode, this.lensAssembly.rootGroup.visible);
    this.mountAssembly.updateExplodeGuides(this.currentExplode, this.mountAssembly.rootGroup.visible);
    this.shutterAssembly.updateExplodeGuides(this.currentExplode, this.shutterAssembly.rootGroup.visible);
    this.sensorAssembly.updateExplodeGuides(this.currentExplode, this.sensorAssembly.rootGroup.visible);
    this.mainboardAssembly.updateExplodeGuides(this.currentExplode, this.mainboardAssembly.rootGroup.visible);
    this.evfAssembly.updateExplodeGuides(this.currentExplode, this.evfAssembly.rootGroup.visible);
    this.lcdAssembly.updateExplodeGuides(this.currentExplode, this.lcdAssembly.rootGroup.visible);
    this.bodyAssembly.updateExplodeGuides(this.currentExplode, this.bodyAssembly.rootGroup.visible);
    this.microAssembly.updateExplodeGuides(this.currentExplode, this.microAssembly.rootGroup.visible);
    this.batteryAssembly.updateExplodeGuides(this.currentExplode, this.batteryAssembly.rootGroup.visible);
    this.cfexpressAssembly.updateExplodeGuides(
      this.currentExplode,
      this.cfexpressAssembly.rootGroup.visible
    );
    this.bionzAssembly.updateExplodeGuides(this.currentExplode, this.bionzAssembly.rootGroup.visible);
    this.mishoeAssembly.updateExplodeGuides(this.currentExplode, this.mishoeAssembly.rootGroup.visible);
    this.micAssembly.updateExplodeGuides(this.currentExplode, this.micAssembly.rootGroup.visible);
    this.guidesDirty = true;
  }

  private syncAssemblyVisibility(): void {
    const isAllBody = this.mode === 'integrated' || this.mode === 'camera_body';
    const showLens = this.mode === 'lens' || this.mode === 'integrated';
    const showMount = this.mode === 'mount' || isAllBody;
    const showShutter = this.mode === 'shutter' || isAllBody;
    const showSensor = this.mode === 'sensor' || isAllBody;
    const showMainboard = this.mode === 'mainboard' || isAllBody;
    const showEvf = this.mode === 'evf' || isAllBody;
    const showLcd = this.mode === 'lcd' || isAllBody;
    const showBody = this.mode === 'body' || isAllBody;
    const showMicro = this.mode === 'micro';
    const showBattery = this.mode === 'battery';
    const showCfexpress = this.mode === 'cfexpress';
    const showBionz = this.mode === 'bionz';
    const showMiShoe = this.mode === 'mishoe';
    const showMic = this.mode === 'mic';

    this.lensAssembly.rootGroup.visible = showLens;
    this.mountAssembly.rootGroup.visible = showMount;
    this.shutterAssembly.rootGroup.visible = showShutter;
    this.sensorAssembly.rootGroup.visible = showSensor;
    this.mainboardAssembly.rootGroup.visible = showMainboard;
    this.evfAssembly.rootGroup.visible = showEvf;
    this.lcdAssembly.rootGroup.visible = showLcd;
    this.bodyAssembly.rootGroup.visible = showBody;
    this.microAssembly.rootGroup.visible = showMicro;
    this.batteryAssembly.rootGroup.visible = showBattery;
    this.cfexpressAssembly.rootGroup.visible = showCfexpress;
    this.bionzAssembly.rootGroup.visible = showBionz;
    this.mishoeAssembly.rootGroup.visible = showMiShoe;
    this.micAssembly.rootGroup.visible = showMic;

    for (const part of this.allParts) {
      part.group.visible = this.isPartInCurrentMode(part) && !this.isPartHidden(part.id);
    }

    this.syncChunkVisibility();

    this.lensAssembly.setPhysicsVisible((this.physicsActive || sharedLensOpticalSim.studioOpen) && showLens);
    this.mountAssembly.setPhysicsVisible(this.physicsActive && showMount);
    this.shutterAssembly.setPhysicsVisible(this.physicsActive && showShutter);
    this.sensorAssembly.setPhysicsVisible(this.physicsActive && showSensor);
    this.mainboardAssembly.setPhysicsVisible(this.physicsActive && showMainboard);
    this.evfAssembly.setPhysicsVisible(this.physicsActive && showEvf);
    this.lcdAssembly.setPhysicsVisible(this.physicsActive && showLcd);
    this.bodyAssembly.setPhysicsVisible(this.physicsActive && showBody);
    this.microAssembly.setPhysicsVisible(this.physicsActive && showMicro);
    this.batteryAssembly.setPhysicsVisible(this.physicsActive && showBattery);
    this.cfexpressAssembly.setPhysicsVisible(this.physicsActive && showCfexpress);
    this.bionzAssembly.setPhysicsVisible(this.physicsActive && showBionz);
    this.mishoeAssembly.setPhysicsVisible(this.physicsActive && showMiShoe);
    this.micAssembly.setPhysicsVisible(this.physicsActive && showMic);
    this.physicsOverlaysDirty = true;

    this.updateActiveExplodeGuides();
  }

  public getPartsForCurrentMode(): CadPart[] {
    const subOrder: Record<CadPart['subsystem'], number> = {
      lens: 0,
      mount: 1,
      body: 2,
      evf: 3,
      shutter: 4,
      sensor: 5,
      mainboard: 6,
      lcd: 7,
      micro: 8,
      battery: 9,
      cfexpress: 10,
      bionz: 11,
      mishoe: 12,
      mic: 13,
    };
    return this.allParts
      .filter((p) => this.isPartInCurrentMode(p))
      .sort((a, b) => {
        if (a.subsystem !== b.subsystem) return subOrder[a.subsystem] - subOrder[b.subsystem];
        if ((this.mode === 'integrated' || this.mode === 'camera_body') && a.subsystem === 'mainboard') {
          return b.order - a.order;
        }
        return a.order - b.order;
      });
  }

  public getSelectedPart(): CadPart | null {
    if (!this.selectedPartId) return null;
    return this.partById.get(this.selectedPartId) ?? null;
  }

  public isPartHidden(partId: string): boolean {
    if (this.isolatedPartId && this.isolatedPartId !== partId) return true;
    return this.hiddenPartIds.has(partId);
  }

  public isIsolated(): boolean {
    return this.isolatedPartId !== null;
  }

  public hasAnyHidden(): boolean {
    return this.isolatedPartId !== null || this.hiddenPartIds.size > 0;
  }

  public getMode(): ScaleMode {
    return this.mode;
  }

  public getLensSection(): LensSection {
    return this.lensSection;
  }

  public refreshVisibility(): void {
    this.kinematicsDirty = true;
    this.syncAssemblyVisibility();
    this.stepActiveAssemblies(this.clock.getElapsedTime(), 0);
    this.updateActiveExplodeGuides();
    this.applyVisibilityAndStyles();
    this.markDirty();
  }

  public setLensSection(section: LensSection, immediateCamera = false): void {
    const changed = this.lensSection !== section;
    this.lensSection = section;
    if (this.mode !== 'lens') return;
    if (!changed && !immediateCamera) {
      this.setCameraPreset('iso', false);
      return;
    }

    this.hydrateSubsystemIfNeeded('lens');

    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.kinematicsDirty = true;

    this.syncAssemblyVisibility();
    this.stepActiveAssemblies(this.clock.getElapsedTime(), 0);
    this.updateActiveExplodeGuides();
    this.applyVisibilityAndStyles();
    this.renderer.renderLists.dispose();
    this.updateClippingPlane();
    this.setCameraPreset('iso', immediateCamera);

    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public setMode(nextMode: ScaleMode, immediateCamera = false): void {
    if (this.mode === nextMode) return;
    this.mode = nextMode;
    if (nextMode === 'lens') {
      this.lensSection = 1;
    }

    // Lazily hydrate standalone micro-parts on first visit to any standalone or micro subsystem!
    if (nextMode !== 'integrated' && nextMode !== 'camera_body') {
      this.hydrateSubsystemIfNeeded(nextMode);
    }

    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.kinematicsDirty = true;

    this.syncAssemblyVisibility();
    this.stepActiveAssemblies(this.clock.getElapsedTime(), 0);
    this.updateActiveExplodeGuides();
    this.applyVisibilityAndStyles();
    this.renderer.renderLists.dispose();
    this.updateClippingPlane();
    this.setCameraPreset('iso', immediateCamera);

    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public setExplode(value: number, immediate = false): void {
    this.targetExplode = THREE.MathUtils.clamp(value, 0, 1);
    this.kinematicsDirty = true;
    invalidateRaycastTlas();
    if (immediate) {
      this.currentExplode = this.targetExplode;
      this.matRegistry.uniforms.uExplode.value = this.currentExplode;
      this.stepActiveAssemblies(this.clock.getElapsedTime(), 0);
      this.updateActiveExplodeGuides();
    }
    if ((this.currentExplode < 0.005) !== this.lastSortWasAssembled) {
      this.visibilityDirty = true;
    }
    this.markDirty();
  }

  public getExplode(): number {
    return this.targetExplode;
  }

  public setRenderMode(mode: RenderMode): void {
    this.renderMode = mode;
    this.matRegistry.setRenderMode(mode);
    const isXray = mode === 'xray';
    for (const chunk of this.allChunks) {
      chunk.syncMaterials(this.matRegistry);
      chunk.setXrayActive(isXray);
    }
    this.visibilityDirty = true;
    this.applyVisibilityAndStyles();
  }

  public setQuality(quality: GraphicsQuality): void {
    if (this.quality === quality) return;
    this.quality = quality;
    if (GPU_PROFILE.isMobile) {
      const targetMax = quality === 'ultra' ? 1.6 : 1.5;
      if (this.contextLossCount === 0) {
        this.currentMaxPixelRatio = targetMax;
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.currentMaxPixelRatio));
      }
    }
    this.callbacks.onQualityChanged?.(quality);
    this.markDirty(1);
  }

  public getQuality(): GraphicsQuality {
    return this.quality;
  }

  public setSection(axis: SectionAxis, normalizedValue?: number): void {
    this.sectionAxis = axis;
    if (typeof normalizedValue === 'number') {
      this.sectionValue = THREE.MathUtils.clamp(normalizedValue, 0, 1);
    }
    this.updateClippingPlane();
  }

  public setPhysicsActive(active: boolean): void {
    this.physicsActive = active;
    this.kinematicsDirty = true;
    this.syncAssemblyVisibility();
    this.markDirty();
  }

  public selectPart(partId: string | null, focusCamera = true): void {
    if (partId === null) {
      this.pendingSelectAfterHydrate = null;
    } else {
      const candidate = this.partById.get(partId);
      if (!candidate) {
        if (this.subsystemHydrateInflight.size > 0) {
          this.pendingSelectAfterHydrate = { partId, focusCamera };
        }
        return;
      }
      if (!this.isPartInCurrentMode(candidate)) return;
      this.pendingSelectAfterHydrate = null;
    }
    if (partId === this.selectedPartId) return;
    const prevSelected = this.selectedPartId;
    this.selectedPartId = partId;

    let fullVisibilityChanged = false;
    if (partId && this.hiddenPartIds.has(partId)) {
      this.hiddenPartIds.delete(partId);
      fullVisibilityChanged = true;
    }
    if (partId && this.isolatedPartId && this.isolatedPartId !== partId) {
      this.isolatedPartId = partId;
      fullVisibilityChanged = true;
    }

    if (fullVisibilityChanged) {
      this.applyVisibilityAndStyles();
    } else {
      this.applyHoverOrSelectDelta(prevSelected, partId);
    }
    const part = this.getSelectedPart();
    if (part && focusCamera) {
      this.focusOnPart(part);
    }
    this.callbacks.onSelectPart(part);
    this.callbacks.onVisibilityChanged();
  }

  public setHoveredPartFromUI(partId: string | null): void {
    if (this.hoveredPartId === partId) return;
    const prev = this.hoveredPartId;
    this.hoveredPartId = partId;
    this.applyHoverOrSelectDelta(prev, partId);
  }

  public togglePartHidden(partId: string): void {
    if (this.isolatedPartId) {
      const prevIso = this.isolatedPartId;
      this.isolatedPartId = null;
      if (partId === prevIso) {
        this.hiddenPartIds.add(partId);
      }
    } else if (this.hiddenPartIds.has(partId)) {
      this.hiddenPartIds.delete(partId);
    } else {
      this.hiddenPartIds.add(partId);
    }

    if (this.selectedPartId && this.isPartHidden(this.selectedPartId)) {
      this.selectedPartId = null;
      this.callbacks.onSelectPart(null);
    }

    this.applyVisibilityAndStyles();
    this.callbacks.onVisibilityChanged();
  }

  public toggleIsolateSelected(): void {
    if (!this.selectedPartId) return;
    if (this.isolatedPartId === this.selectedPartId) {
      this.isolatedPartId = null;
    } else {
      this.isolatedPartId = this.selectedPartId;
      this.hiddenPartIds.delete(this.selectedPartId);
    }
    this.applyVisibilityAndStyles();
    this.callbacks.onVisibilityChanged();
  }

  public resetAllVisibility(): void {
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.applyVisibilityAndStyles();
    this.callbacks.onVisibilityChanged();
  }

  public stepSelectedPart(delta: -1 | 1): void {
    const list = this.getPartsForCurrentMode();
    if (list.length === 0) return;
    const idx = list.findIndex((p) => p.id === this.selectedPartId);
    const nextIdx = idx < 0 ? 0 : (idx + delta + list.length) % list.length;
    this.selectPart(list[nextIdx].id, true);
  }

  public setCameraPreset(preset: CameraPreset, immediate = false): void {
    const e = this.targetExplode;
    let d: number;
    let target: THREE.Vector3;

    if (this.mode === 'lens') {
      if (sharedLensOpticalSim.studioOpen) {
        d = 266 + e * 1080;
        target = new THREE.Vector3(0 + e * 124.0, -2.0 * (1 - e), 80.0 + e * 160.0);
      } else if (this.lensSection === 1) {
        d = 186 + e * 625;
        target = new THREE.Vector3(0 + e * 54.0, -1.5 + e * 10.0, 47.0 - e * 102.0);
      } else if (this.lensSection === 2) {
        d = 198 + e * 665;
        target = new THREE.Vector3(0 + e * 64.0, -1.0 - e * 8.0, 76.5 + e * 76.0);
      } else {
        d = 212 + e * 795;
        target = new THREE.Vector3(0 + e * 96.0, -1.0 + e * 4.0, 108.0 + e * 212.0);
      }
    } else if (this.mode === 'camera_body') {
      d = 335 + e * 565;
      target = new THREE.Vector3(-8.0 - e * 8.0, 3.0 + e * 9.0, -10.0 - e * 18.0);
    } else if (this.mode === 'lcd') {
      d = 174 + e * 355;
      target = new THREE.Vector3(8.0 - e * 18.0, -7.0, -32.0 - e * 32.0);
    } else if (this.mode === 'body') {
      d = 290 + e * 515;
      target = new THREE.Vector3(-6.0 + e * 14.0, 4.0 - e * 2.0, 0.0 + e * 12.0);
    } else if (this.mode === 'mount') {
      d = 188 + e * 375;
      target = new THREE.Vector3(2.0 + e * 44.0, -2.0 - e * 2.0, 25.0 + e * 22.0);
    } else if (this.mode === 'evf') {
      d = 140 + e * 380;
      target = new THREE.Vector3(1.5 * (1 - e) - e * 14.0, 38.6 + e * 1.5, -16.5 + e * 12.0);
    } else if (this.mode === 'mainboard') {
      d = 192 + e * 340;
      target = new THREE.Vector3(-18.0 * e, 0.0 + e * 2.0, -22.0 - e * 4.0);
    } else if (this.mode === 'shutter') {
      d = 194 + e * 430;
      target = new THREE.Vector3(6.0 + e * 44.0, -2.5 + e * 2.0, 14.0 - e * 6.0);
    } else if (this.mode === 'integrated') {
      d = 390 + e * 1290;
      target = new THREE.Vector3(-8.0 - e * 6.0, 6.0 + e * 10.0, 34.0 + e * 96.0);
    } else if (this.mode === 'sensor') {
      d = 168 + e * 475;
      target = new THREE.Vector3(10.0 * e, -2.0, -4.0 - e * 46.0);
    } else if (this.mode === 'battery') {
      d = 104 + e * 310;
      target = new THREE.Vector3(e * 8.0, e * 3.0, e * 4.0);
    } else if (this.mode === 'cfexpress') {
      d = 108 + e * 305;
      target = new THREE.Vector3(0.0, e * 2.0, e * 4.0);
    } else if (this.mode === 'bionz') {
      d = 78 + e * 190;
      target = new THREE.Vector3(0, 1.5 + e * 1.5, 0);
    } else if (this.mode === 'mishoe') {
      d = 114 + e * 165;
      target = new THREE.Vector3(0, -1.5 - e * 2.5, 2.5 + e * 4.0);
    } else if (this.mode === 'mic') {
      d = 94 + e * 172;
      target = new THREE.Vector3(0, 1.5 - e * 1.5, 0.5);
    } else {
      d = 96 + e * 235;
      target = new THREE.Vector3(20.0 * e, 1.5 * e, -3.0 - e * 16.0);
    }

    if (this.camera.aspect < 1.0) {
      d *= Math.min(2.05, 1.04 / Math.max(this.camera.aspect, 0.48));
    }

    let offset: THREE.Vector3;
    if (this.mode === 'evf') {
      const isoX = e > 0.25 ? -0.88 : -0.78;
      const isoY = e > 0.25 ? 0.17 : 0.24;
      const isoZ = e > 0.25 ? -0.44 : -0.58;
      switch (preset) {
        case 'front':
          offset = new THREE.Vector3(0, 2, -d);
          break;
        case 'side':
          offset = new THREE.Vector3(-d * 1.05, 4, 0);
          break;
        case 'back':
          offset = new THREE.Vector3(d * 0.65, d * 0.28, d * 0.72);
          break;
        case 'iso':
        default:
          offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
          break;
      }
    } else if (this.mode === 'mainboard' || this.mode === 'lcd') {
      const isoX = this.mode === 'lcd' ? (e > 0.25 ? 0.56 : 0.42) : e > 0.25 ? -0.68 : -0.44;
      const isoZ = this.mode === 'lcd' ? (e > 0.25 ? -0.78 : -0.86) : e > 0.25 ? -0.66 : -0.84;
      switch (preset) {
        case 'front':
          offset = new THREE.Vector3(0, 2, -d);
          break;
        case 'side':
          offset = new THREE.Vector3(-d * 1.04, 8, 0);
          break;
        case 'back':
          offset = new THREE.Vector3(d * 0.52, d * 0.30, d * 0.80);
          break;
        case 'iso':
        default:
          offset = new THREE.Vector3(d * isoX, d * 0.26, d * isoZ);
          break;
      }
    } else {
      switch (preset) {
        case 'front':
          offset = new THREE.Vector3(0, 4, d);
          break;
        case 'side':
          offset = new THREE.Vector3(-d * 1.04, 8, 0);
          break;
        case 'back':
          offset = new THREE.Vector3(-d * 0.42, d * 0.26, -d * 0.88);
          break;
        case 'iso':
        default:
          if (this.mode === 'integrated') {
            const isoX = e > 0.25 ? -0.82 : -0.62;
            const isoY = e > 0.25 ? 0.23 : 0.27;
            const isoZ = e > 0.25 ? 0.52 : 0.74;
            offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
          } else if (this.mode === 'camera_body') {
            const isoX = e > 0.25 ? -0.78 : -0.62;
            const isoY = e > 0.25 ? 0.24 : 0.27;
            const isoZ = e > 0.25 ? 0.57 : 0.74;
            offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
          } else if (this.mode === 'lens') {
            const isoX = e > 0.25 ? -0.84 : -0.68;
            const isoZ = e > 0.25 ? 0.48 : 0.69;
            offset = new THREE.Vector3(d * isoX, d * 0.25, d * isoZ);
          } else if (this.mode === 'body') {
            const isoX = e > 0.25 ? -0.74 : -0.64;
            const isoZ = e > 0.25 ? 0.62 : 0.72;
            offset = new THREE.Vector3(d * isoX, d * 0.28, d * isoZ);
          } else if (this.mode === 'mount') {
            const isoX = e > 0.25 ? 0.80 : 0.58;
            const isoZ = e > 0.25 ? 0.56 : 0.76;
            offset = new THREE.Vector3(d * isoX, d * 0.22, d * isoZ);
          } else if (this.mode === 'shutter') {
            offset = new THREE.Vector3(d * 0.52, d * 0.28, d * 0.81);
          } else if (this.mode === 'sensor') {
            const isoX = e > 0.25 ? 0.82 : 0.64;
            const isoY = e > 0.25 ? 0.26 : 0.38;
            const isoZ = e > 0.25 ? 0.51 : 0.72;
            offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
          } else if (this.mode === 'battery' || this.mode === 'cfexpress') {
            offset = new THREE.Vector3(d * 0.58, d * 0.30, d * 0.76);
          } else if (this.mode === 'bionz') {
            offset = new THREE.Vector3(d * 0.62, d * 0.46, d * 0.64);
          } else if (this.mode === 'mishoe') {
            offset = new THREE.Vector3(d * 0.58, d * 0.42, d * 0.70);
          } else if (this.mode === 'mic') {
            offset = new THREE.Vector3(-d * 0.50, d * 0.36, d * 0.78);
          } else {
            offset = new THREE.Vector3(d * 0.68, d * 0.44, d * 0.66);
          }
          break;
      }
    }

    const pos = target.clone().add(offset);

    if (immediate) {
      this.camAnimActive = false;
      this.camera.position.copy(pos);
      this.controls.target.copy(target);
      this.controls.update();
      this.markDirty();
    } else {
      this.animateCameraTo(pos, target);
    }
  }

  private focusOnPart(part: CadPart): void {
    const rec = this.pickRecordByPartId.get(part.id);
    if (rec) {
      computePartWorldBox(rec, _focusBox);
    } else {
      _focusBox.setFromObject(part.group);
    }
    _focusBox.getCenter(_focusCenter);

    _focusOffset.subVectors(this.camera.position, this.controls.target);
    const isMicro =
      this.mode === 'micro' ||
      this.mode === 'bionz' ||
      this.mode === 'mishoe' ||
      this.mode === 'mic';
    const isCompactStandalone = this.mode === 'battery' || this.mode === 'cfexpress';
    const maxDist = isMicro
      ? 72
      : isCompactStandalone
        ? 98
        : this.mode === 'evf'
          ? 112
          : this.mode === 'integrated' || this.mode === 'camera_body'
            ? 280
            : 168;
    const minDist = isMicro ? 34 : isCompactStandalone ? 38 : this.mode === 'evf' ? 44 : 56;
    const desiredDist = Math.min(_focusOffset.length(), maxDist);
    _focusOffset.setLength(Math.max(desiredDist, minDist));

    const nextPos = _focusCenter.clone().add(_focusOffset);
    this.animateCameraTo(nextPos, _focusCenter.clone());
  }

  private wakeLoop(): void {
    this.idleFrameStreak = 0;
    if (this.rafId === 0 && !this.disposed && !this.contextLost && !this.pageHidden) {
      this.clock.getDelta();
      this.rafId = requestAnimationFrame(this.animate);
    }
  }

  private animateCameraTo(pos: THREE.Vector3, target: THREE.Vector3): void {
    this.camStartPos.copy(this.camera.position);
    this.camEndPos.copy(pos);
    this.camStartTarget.copy(this.controls.target);
    this.camEndTarget.copy(target);
    this.camAnimT = 0;
    this.camAnimActive = true;
    this.wakeLoop();
  }

  private markDirty(frames = 3): void {
    this.dirtyFrames = Math.max(this.dirtyFrames, frames);
    this.wakeLoop();
  }

  public requestRenderFrame(): void {
    this.kinematicsDirty = true;
    this.markDirty(2);
  }

  public frameLensForOpticsStudio(immediate = false): void {
    const target = new THREE.Vector3(0, -36, 74);
    const pos = new THREE.Vector3(-348, 56, 178);
    this.kinematicsDirty = true;
    this.syncAssemblyVisibility();
    this.applyVisibilityAndStyles();
    this.syncGpuPartTransforms(true);
    if (immediate) {
      this.camAnimActive = false;
      this.camera.position.copy(pos);
      this.controls.target.copy(target);
      this.controls.update();
      this.markDirty();
    } else {
      this.animateCameraTo(pos, target);
    }
  }

  public handleResize(): void {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.currentMaxPixelRatio));
    this.renderer.setSize(w, h);
    this.cachedDomRect = this.renderer.domElement.getBoundingClientRect();
    this.markDirty();
  }

  private updateClippingPlane(): void {
    const prevActive = this.matRegistry.sectionCutActive;

    if (this.sectionAxis === 'off') {
      this.clippingPlane.normal.set(-1, 0, 0);
      this.clippingPlane.constant = 10000;
      this.matRegistry.syncClippingPlane();
      this.matRegistry.setSectionCutActive(false);
      if (prevActive) {
        this.overlayBatcher.setSectionCutActive(false);
        for (const chunk of this.allChunks) {
          chunk.releaseSectionStraddle();
          chunk.syncMaterials(this.matRegistry);
        }
      }
      this.visibilityDirty = true;
      this.markDirty();
      return;
    }

    let minCoord = -48;
    let maxCoord = 48;
    if (this.mode === 'micro') {
      minCoord = -13;
      maxCoord = 13;
    } else if (this.mode === 'battery' || this.mode === 'cfexpress') {
      minCoord = -30;
      maxCoord = 30;
    } else if (this.mode === 'bionz') {
      if (this.sectionAxis === 'x') {
        minCoord = -20;
        maxCoord = 20;
      } else {
        minCoord = -16;
        maxCoord = 18;
      }
    } else if (this.mode === 'mishoe') {
      if (this.sectionAxis === 'x') {
        minCoord = -32;
        maxCoord = 32;
      } else {
        minCoord = -15;
        maxCoord = 12;
      }
    } else if (this.mode === 'mic') {
      if (this.sectionAxis === 'x') {
        minCoord = -30;
        maxCoord = 30;
      } else {
        minCoord = -16;
        maxCoord = 20;
      }
    } else if (this.mode === 'lens') {
      minCoord = -46;
      maxCoord = 46;
    } else if (this.mode === 'lcd') {
      if (this.sectionAxis === 'x') {
        minCoord = -34;
        maxCoord = 50;
      } else {
        minCoord = -34;
        maxCoord = 22;
      }
    } else if (this.mode === 'body' || this.mode === 'camera_body' || this.mode === 'integrated') {
      if (this.sectionAxis === 'x') {
        minCoord = -74;
        maxCoord = 60;
      } else {
        minCoord = -42;
        maxCoord = 64;
      }
    } else if (this.mode === 'mount') {
      if (this.sectionAxis === 'x') {
        minCoord = -46;
        maxCoord = 46;
      } else {
        minCoord = -40;
        maxCoord = 40;
      }
    } else if (this.mode === 'evf') {
      if (this.sectionAxis === 'x') {
        minCoord = -24;
        maxCoord = 24;
      } else {
        minCoord = 18;
        maxCoord = 60;
      }
    } else if (this.mode === 'mainboard') {
      if (this.sectionAxis === 'x') {
        minCoord = -50;
        maxCoord = 50;
      } else {
        minCoord = -36;
        maxCoord = 36;
      }
    } else if (this.mode === 'shutter') {
      if (this.sectionAxis === 'x') {
        minCoord = -48;
        maxCoord = 50;
      } else {
        minCoord = -35;
        maxCoord = 35;
      }
    }

    const coord = THREE.MathUtils.lerp(minCoord, maxCoord, this.sectionValue);

    if (this.sectionAxis === 'x') {
      this.clippingPlane.normal.set(-1, 0, 0);
      this.clippingPlane.constant = coord;
    } else {
      this.clippingPlane.normal.set(0, -1, 0);
      this.clippingPlane.constant = coord;
    }
    this.matRegistry.syncClippingPlane();
    this.matRegistry.setSectionCutActive(true);
    if (!prevActive) {
      this.overlayBatcher.setSectionCutActive(true);
      for (const chunk of this.allChunks) chunk.syncMaterials(this.matRegistry);
    }
    this.visibilityDirty = true;
    this.markDirty();
  }

  /**
   * Breakthrough #25: Bake exact 16-view Hardware WebGL2 ID-Buffer visibility mask for assembled views.
   * Disposes all temporary FBO/shader resources immediately (0 ongoing VRAM!).
   */
  private bakeOcclusionMask(targetMode: 'integrated' | 'camera_body'): void {
    this.inOracleBake = true;
    this.macroBatch.resetFullRangeForOracle();
    const mask = bakeAssembledVisibilityMask({
      renderer: this.renderer,
      partStateTex: this.partStateBuf.texture,
      opaqueMeshes: this.macroBatch.opaqueMeshesForOracle,
      slotToParentSlot: this.partStateBuf.slotToParentSlot,
      alwaysVisibleSlots: this.macroBatch.transparentPartSlots,
      center:
        targetMode === 'integrated'
          ? new THREE.Vector3(-4, 4, 34)
          : new THREE.Vector3(-8, 4, -8),
      distance: targetMode === 'integrated' ? 320 : 250,
      capacity: MAX_PARTS_CAPACITY,
    });
    if (targetMode === 'integrated') {
      this.assembledIntegratedMask = mask;
    } else {
      this.assembledBodyMask = mask;
    }
    this.inOracleBake = false;
    this.visibilityDirty = true;
  }

  private prepareFrameForRender(camera: THREE.Camera): void {
    if (this.inOracleBake || this.inSubPass) return;

    const epoch = advanceMegaBatchRenderEpoch();
    this.overlayBatcher.advanceFrameEpoch(epoch);

    this.partStateBuf.flushIfDirty(this.matRegistry.uniforms.uPartStateTex);
    this.matRegistry.syncViewProj(camera);
    this.matRegistry.uniforms.uExplode.value = this.currentExplode;

    if (
      this.mode === 'camera_body' &&
      !this.assembledBodyMask &&
      this.currentExplode < 0.005 &&
      !this.hasAnyHidden() &&
      this.sectionAxis === 'off' &&
      this.renderMode !== 'xray'
    ) {
      this.bakeOcclusionMask('camera_body');
    }

    // OMEGA-4A: Independent Guide vs Live-Physics Overlay Channels!
    if (this.guidesDirty) {
      this.overlayBatcher.syncGuides(this.guideOverlaySources);
      this.guidesDirty = false;
    }
    if (this.physicsOverlaysDirty) {
      this.overlayBatcher.syncPhysics(this.physicsOverlaySources);
      this.physicsOverlaysDirty = false;
    }

    this.updateCompactedFrameVisibility(camera);
  }

  /**
   * OMEGA-6 + OMEGA-7 + OMEGA-10:
   * - Temporal Camera-Coherence Memoization (0.000 ms fast-exit when camera & state unchanged!)
   * - Inline Scalar 6-Plane Frustum Test
   * - Section-Cut Dual-Range Plane-Straddling Split (`_visSlots` Zero-Discard FrontSide Early-Z vs `_straddleSlots` DoubleSide Clipped!)
   * - Whole-Camera X-Ray Sub-Pixel Internal Clutter Filter
   * - O(N) 32-Bin Linear Distance Histogram Counting Sort
   */
  private updateCompactedFrameVisibility(camera: THREE.Camera): void {
    const camPos = camera.position;
    const camQuat = camera.quaternion;
    const selSlot = this.selectedPartId
      ? (this.pickRecordByPartId.get(this.selectedPartId)?.slot ?? -1)
      : -1;
    const hovSlot = this.hoveredPartId
      ? (this.pickRecordByPartId.get(this.hoveredPartId)?.slot ?? -1)
      : -1;

    // OMEGA-10A: Zero-work temporal memoization when camera, explode, section & highlight haven't changed!
    if (
      !this.visibilityDirty &&
      this.lastSortMode === this.mode &&
      this.lastVisExplode === this.currentExplode &&
      this.lastVisSectionAxis === this.sectionAxis &&
      this.lastVisSectionVal === this.sectionValue &&
      this.lastVisSelSlot === selSlot &&
      this.lastVisHovSlot === hovSlot &&
      camPos.distanceToSquared(this.lastVisCamPos) < 0.04 &&
      Math.abs(camQuat.dot(this.lastVisCamQuat)) > 0.99995
    ) {
      return;
    }

    this.lastVisCamPos.copy(camPos);
    this.lastVisCamQuat.copy(camQuat);
    this.lastVisExplode = this.currentExplode;
    this.lastVisSectionAxis = this.sectionAxis;
    this.lastVisSectionVal = this.sectionValue;
    this.lastVisSelSlot = selSlot;
    this.lastVisHovSlot = hovSlot;

    _projScreen.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    _frustum.setFromProjectionMatrix(_projScreen);
    const fPlanes = _frustum.planes;
    for (let pi = 0; pi < 6; pi++) {
      const pl = fPlanes[pi];
      const po = pi * 4;
      _frustumPlanesFlat[po] = pl.normal.x;
      _frustumPlanesFlat[po + 1] = pl.normal.y;
      _frustumPlanesFlat[po + 2] = pl.normal.z;
      _frustumPlanesFlat[po + 3] = pl.constant;
    }

    camera.getWorldDirection(_camDir);
    const camDist = camPos.distanceTo(this.controls.target);

    const isXray = this.renderMode === 'xray';
    const isSolid = this.renderMode === 'solid';
    const isWholeCameraMode = this.mode === 'integrated' || this.mode === 'camera_body';
    const isAssembled = this.currentExplode < 0.005;
    const useSectionCull = this.sectionAxis !== 'off';
    const useStraddleSplit = useSectionCull && !isXray;
    const useAssembledOcclusion =
      isWholeCameraMode && isAssembled && !useSectionCull && !isXray && !this.hasAnyHidden();
    const activeMask = useAssembledOcclusion
      ? this.mode === 'integrated'
        ? this.assembledIntegratedMask
        : this.assembledBodyMask
      : null;

    const activeViewBits = activeMask
      ? computeActiveOracleViewBits(
          camPos.x,
          camPos.y,
          camPos.z,
          this.mode === 'integrated' ? -4 : -8,
          4,
          this.mode === 'integrated' ? 34 : -8
        )
      : 0xffff;

    const needSortRefresh =
      this.visibilityDirty ||
      this.lastSortMode !== this.mode ||
      this.lastSortWasAssembled !== isAssembled ||
      this.lastOracleViewBits !== activeViewBits ||
      _camDir.dot(this.lastSortCamDir) < 0.965 ||
      Math.abs(camDist - this.lastSortCamDist) > Math.max(12, this.lastSortCamDist * 0.14);

    if (needSortRefresh) {
      this.lastSortCamPos.copy(camPos);
      this.lastSortCamDir.copy(_camDir);
      this.lastSortCamDist = camDist;
      this.lastSortMode = this.mode;
      this.lastSortWasAssembled = isAssembled;
      this.lastOracleViewBits = activeViewBits;
      this.visibilityDirty = false;
    }

    const sortX = this.lastSortCamPos.x;
    const sortY = this.lastSortCamPos.y;
    const sortZ = this.lastSortCamPos.z;
    const camX = camPos.x;
    const camY = camPos.y;
    const camZ = camPos.z;

    const cpNx = this.clippingPlane.normal.x;
    const cpNy = this.clippingPlane.normal.y;
    const cpNz = this.clippingPlane.normal.z;
    const cpConst = this.clippingPlane.constant;

    const hideMobileSolidEdges = GPU_PROFILE.isMobile && isWholeCameraMode && isSolid;
    const persp = camera as THREE.PerspectiveCamera;
    const fovRad = ((persp.fov || 32) * Math.PI) / 180;
    const projScale = Math.max(240, this.container.clientHeight) / (2 * Math.tan(fovRad * 0.5));
    const distT = THREE.MathUtils.clamp((camDist - 500) / 600, 0, 1);
    const solidMinPx = isWholeCameraMode ? 2.4 + distT * 2.6 : 1.8;
    const edgeMinPxSq = solidMinPx * solidMinPx;

    const e = this.currentExplode;
    const eSort = isAssembled ? 0 : 0.5;
    const integrated = isWholeCameraMode;
    const livePhysics = this.physicsActive;

    for (let ci = 0; ci < this.activeChunks.length; ci++) {
      const chunk = this.activeChunks[ci];
      const recs = chunk.partRecords;
      let visCount = 0;
      let straddleCount = 0;
      let edgeCount = 0;
      let straddleEdgeCount = 0;

      for (let i = 0; i < recs.length; i++) {
        const rec = recs[i];
        const part = rec.part;
        if (!this.isPartInCurrentMode(part) || this.isPartHidden(part.id)) continue;

        const slot = rec.slot;
        const isHighlighted = slot === selSlot || slot === hovSlot;

        if (
          activeMask &&
          !isHighlighted &&
          !(livePhysics && part.subsystem === 'lcd') &&
          (activeMask[slot] & activeViewBits) === 0
        ) {
          continue;
        }

        let cx: number;
        let cy: number;
        let cz: number;
        let scx: number;
        let scy: number;
        let scz: number;
        if (rec.canUseAnalyticalExplode) {
          const offset =
            integrated && part.integratedExplodeOffset
              ? part.integratedExplodeOffset
              : part.explodeOffset;
          const bx = rec.localSphere.center.x + part.assembledPos.x;
          const by = rec.localSphere.center.y + part.assembledPos.y;
          const bz = rec.localSphere.center.z + part.assembledPos.z;
          cx = bx + offset.x * e;
          cy = by + offset.y * e;
          cz = bz + offset.z * e;
          scx = bx + offset.x * eSort;
          scy = by + offset.y * eSort;
          scz = bz + offset.z * eSort;
        } else {
          const p = part.group.position;
          cx = rec.localSphere.center.x + p.x;
          cy = rec.localSphere.center.y + p.y;
          cz = rec.localSphere.center.z + p.z;
          scx = cx;
          scy = cy;
          scz = cz;
        }

        const hasBones = rec.boneSlices.length > 0;
        const rawR = rec.localSphere.radius;
        const r = hasBones ? Math.max(rawR, 34) : Math.max(rawR, 1.5);

        // Inline scalar 6-plane frustum test (0 Vector3/Sphere allocations or method calls!)
        if (
          _frustumPlanesFlat[0] * cx + _frustumPlanesFlat[1] * cy + _frustumPlanesFlat[2] * cz + _frustumPlanesFlat[3] < -r ||
          _frustumPlanesFlat[4] * cx + _frustumPlanesFlat[5] * cy + _frustumPlanesFlat[6] * cz + _frustumPlanesFlat[7] < -r ||
          _frustumPlanesFlat[8] * cx + _frustumPlanesFlat[9] * cy + _frustumPlanesFlat[10] * cz + _frustumPlanesFlat[11] < -r ||
          _frustumPlanesFlat[12] * cx + _frustumPlanesFlat[13] * cy + _frustumPlanesFlat[14] * cz + _frustumPlanesFlat[15] < -r ||
          _frustumPlanesFlat[16] * cx + _frustumPlanesFlat[17] * cy + _frustumPlanesFlat[18] * cz + _frustumPlanesFlat[19] < -r ||
          _frustumPlanesFlat[20] * cx + _frustumPlanesFlat[21] * cy + _frustumPlanesFlat[22] * cz + _frustumPlanesFlat[23] < -r
        ) {
          continue;
        }

        let isStraddling = false;
        if (useSectionCull) {
          const planeDist = cpNx * cx + cpNy * cy + cpNz * cz + cpConst;
          if (planeDist < -r - 0.5) continue;
          if (useStraddleSplit && (hasBones || planeDist <= r + 0.5)) {
            isStraddling = true;
          }
        }

        const cdx = cx - camX;
        const cdy = cy - camY;
        const cdz = cz - camZ;
        const camDistSq = cdx * cdx + cdy * cdy + cdz * cdz;
        const rProjActual = Math.max(rawR, 0.35) * projScale;

        // OMEGA-7: Skip sub-pixel (<6.4px dia) internal micro-fasteners in 305-part whole-camera X-Ray ghost pass
        if (isXray && isWholeCameraMode && !isHighlighted && !hasBones && rProjActual * rProjActual < camDistSq * 10.24) {
          continue;
        }

        const sdx = scx - sortX;
        const sdy = scy - sortY;
        const sdz = scz - sortZ;
        const sortDistSq = sdx * sdx + sdy * sdy + sdz * sdz;

        if (isStraddling) {
          _straddleSlots[straddleCount] = slot;
          _straddleDistSq[straddleCount] = sortDistSq;
          straddleCount++;
        } else {
          _visSlots[visCount] = slot;
          _visDistSq[visCount] = sortDistSq;
          visCount++;
        }

        let wantEdge = false;
        if (isHighlighted) {
          wantEdge = true;
        } else if (!hideMobileSolidEdges) {
          if (isSolid || (isXray && isWholeCameraMode)) {
            const rProj = r * projScale;
            const minPxSq = isXray ? 144.0 : edgeMinPxSq;
            wantEdge = rProj * rProj >= camDistSq * minPxSq;
          } else {
            wantEdge = true;
          }
        }

        if (wantEdge) {
          if (isStraddling) {
            _straddleEdgeSlots[straddleEdgeCount++] = slot;
          } else {
            _edgeSlots[edgeCount++] = slot;
          }
        }
      }

      // OMEGA-10B: O(N) 32-Bin Linear Histogram Front-to-Back Sort!
      sortSlotsFrontToBackFast(_visSlots, _visDistSq, visCount);
      if (straddleCount > 1) {
        sortSlotsFrontToBackFast(_straddleSlots, _straddleDistSq, straddleCount);
      }

      let partHash = (2166136261 ^ visCount) | 0;
      for (let i = 0; i < visCount; i++) {
        partHash = Math.imul(partHash ^ _visSlots[i], 16777619);
      }
      let edgeHash = (2166136261 ^ edgeCount) | 0;
      for (let i = 0; i < edgeCount; i++) {
        edgeHash = Math.imul(edgeHash ^ _edgeSlots[i], 16777619);
      }
      let straddleHash = 0;
      if (straddleCount > 0) {
        straddleHash = (2166136261 ^ straddleCount) | 0;
        for (let i = 0; i < straddleCount; i++) {
          straddleHash = Math.imul(straddleHash ^ _straddleSlots[i], 16777619);
        }
      }
      let straddleEdgeHash = 0;
      if (straddleEdgeCount > 0) {
        straddleEdgeHash = (2166136261 ^ straddleEdgeCount) | 0;
        for (let i = 0; i < straddleEdgeCount; i++) {
          straddleEdgeHash = Math.imul(straddleEdgeHash ^ _straddleEdgeSlots[i], 16777619);
        }
      }

      chunk.applyCompactedVisibility(
        _visSlots,
        visCount,
        partHash,
        _edgeSlots,
        edgeCount,
        edgeHash,
        isXray,
        selSlot,
        hovSlot,
        _straddleSlots,
        straddleCount,
        straddleHash,
        _straddleEdgeSlots,
        straddleEdgeCount,
        straddleEdgeHash
      );
    }
  }

  private syncAnalyticalPartOffsets(forceAll = false): void {
    const integrated = this.mode === 'integrated' || this.mode === 'camera_body';
    if (!forceAll && this.lastAnalyticalIntegrated === integrated) return;
    this.lastAnalyticalIntegrated = integrated;

    for (let i = 0; i < this.pickRecords.length; i++) {
      const rec = this.pickRecords[i];
      if (!rec.canUseAnalyticalExplode) continue;
      const part = rec.part;
      const offset =
        integrated && part.integratedExplodeOffset ? part.integratedExplodeOffset : part.explodeOffset;
      this.partStateBuf.writeAnalyticalExplodeTransform(rec.slot, part.assembledPos, offset);
    }
  }

  private syncGpuPartTransforms(forceAll = false): void {
    this.syncAnalyticalPartOffsets(forceAll);

    const list = forceAll ? this.pickRecords : this.activePickRecords;
    for (let i = 0; i < list.length; i++) {
      const rec = list[i];
      if (rec.canUseAnalyticalExplode) continue;
      const g = rec.part.group;
      this.partStateBuf.writePartTransform(rec.slot, g.position, g.quaternion, g.scale);
    }

    const chunks = forceAll ? this.allChunks : this.activeChunks;
    for (let ci = 0; ci < chunks.length; ci++) {
      const chunk = chunks[ci];
      const bParts = chunk.boneBearingParts;
      for (let pi = 0; pi < bParts.length; pi++) {
        bParts[pi].group.updateMatrixWorld(true);
      }
      const bones = chunk.bones;
      for (let bi = 0; bi < bones.length; bi++) {
        const b = bones[bi];
        b.boneObj.matrixWorld.decompose(_bonePos, _boneQuat, _boneScale);
        this.partStateBuf.writePartTransform(b.boneSlot, _bonePos, _boneQuat, _boneScale);
      }
      this.syncChunkGlows(chunk);
    }

    this.partStateBuf.flushIfDirty(this.matRegistry.uniforms.uPartStateTex);
  }

  private syncChunkGlows(chunk: MegaBatchChunk): void {
    const glows = chunk.glows;
    for (let gi = 0; gi < glows.length; gi++) {
      const gl = glows[gi];
      const part = gl.parentPart;
      if (!part.group.visible || !this.isPartInCurrentMode(part) || this.renderMode !== 'solid') {
        this.partStateBuf.writePartStyle(gl.glowSlot, 0, 0, 0, 0, 0);
        continue;
      }
      const mat = gl.glowMesh.material as THREE.MeshBasicMaterial;
      const op = mat.transparent ? mat.opacity : 1.0;
      if (op < 0.01) {
        this.partStateBuf.writePartStyle(gl.glowSlot, 0, 0, 0, 0, 0);
        continue;
      }
      if (gl.ownerBone) {
        gl.ownerBone.matrixWorld.decompose(_bonePos, _boneQuat, _boneScale);
        this.partStateBuf.writePartTransform(gl.glowSlot, _bonePos, _boneQuat, _boneScale);
      } else {
        const pg = part.group;
        this.partStateBuf.writePartTransform(gl.glowSlot, pg.position, pg.quaternion, pg.scale);
      }
      const isSel = part.id === this.selectedPartId;
      const isHov = part.id === this.hoveredPartId;
      const vFlag = isSel ? 3 : isHov ? 2 : 1;
      this.partStateBuf.writePartStyle(gl.glowSlot, vFlag, mat.color.r, mat.color.g, mat.color.b, op);
    }
  }

  private writeSinglePartStyle(part: CadPart, isWholeCameraMode: boolean): void {
    const slot = part.group.userData.partSlot as number | undefined;
    const boneSlots = part.group.userData.boneSlots as number[] | undefined;

    if (!this.isPartInCurrentMode(part)) {
      part.group.visible = false;
      if (slot !== undefined) {
        this.partStateBuf.writePartStyle(slot, 0, 0, 0, 0, 0);
      }
      if (boneSlots && boneSlots.length > 0) {
        for (let bi = 0; bi < boneSlots.length; bi++) {
          this.partStateBuf.writePartStyle(boneSlots[bi], 0, 0, 0, 0, 0);
        }
      }
      return;
    }

    const hidden = this.isPartHidden(part.id);
    part.group.visible = !hidden;

    const isSelected = part.id === this.selectedPartId;
    const isHovered = part.id === this.hoveredPartId;

    const hideUnselectedMobileEdges =
      GPU_PROFILE.isMobile &&
      isWholeCameraMode &&
      this.renderMode === 'solid' &&
      !isSelected &&
      !isHovered;

    if (slot !== undefined) {
      const visFlag = hidden ? 0 : isSelected ? 3 : isHovered ? 2 : 1;
      let ec = EDGE_COL_SOLID;
      let edgeAlphaEncoded = -1.0;
      if (hidden || hideUnselectedMobileEdges) {
        edgeAlphaEncoded = 0.0;
      } else if (isSelected) {
        ec = EDGE_COL_SELECTED;
        edgeAlphaEncoded = 0.92;
      } else if (isHovered) {
        ec = EDGE_COL_HOVERED;
        edgeAlphaEncoded = 0.72;
      } else if (this.renderMode === 'cad') {
        ec = EDGE_COL_CAD;
        edgeAlphaEncoded = 0.72;
      } else if (this.renderMode === 'xray') {
        ec = EDGE_COL_XRAY;
        edgeAlphaEncoded = 0.34;
      }
      this.partStateBuf.writePartStyle(slot, visFlag, ec.r, ec.g, ec.b, edgeAlphaEncoded);
      if (boneSlots && boneSlots.length > 0) {
        for (let bi = 0; bi < boneSlots.length; bi++) {
          this.partStateBuf.writePartStyle(
            boneSlots[bi],
            visFlag,
            ec.r,
            ec.g,
            ec.b,
            edgeAlphaEncoded
          );
        }
      }
    }
  }

  /** OMEGA-12: O(1) Hover / Select Style Delta — updates ONLY 1..2 parts instead of looping over 652! */
  private applyHoverOrSelectDelta(prevId: string | null, nextId: string | null): void {
    const isWholeCameraMode = this.mode === 'integrated' || this.mode === 'camera_body';
    if (prevId) {
      const p = this.partById.get(prevId);
      if (p) this.writeSinglePartStyle(p, isWholeCameraMode);
    }
    if (nextId && nextId !== prevId) {
      const n = this.partById.get(nextId);
      if (n) this.writeSinglePartStyle(n, isWholeCameraMode);
    }
    for (let ci = 0; ci < this.activeChunks.length; ci++) {
      this.syncChunkGlows(this.activeChunks[ci]);
    }
    this.partStateBuf.flushIfDirty(this.matRegistry.uniforms.uPartStateTex);
    this.visibilityDirty = true;
    this.markDirty(2);
  }

  private applyVisibilityAndStyles(): void {
    const isWholeCameraMode = this.mode === 'integrated' || this.mode === 'camera_body';

    for (let i = 0; i < this.allParts.length; i++) {
      this.writeSinglePartStyle(this.allParts[i], isWholeCameraMode);
    }

    for (let ci = 0; ci < this.allChunks.length; ci++) {
      this.syncChunkGlows(this.allChunks[ci]);
    }

    this.partStateBuf.flushIfDirty(this.matRegistry.uniforms.uPartStateTex);
    this.visibilityDirty = true;
    invalidateRaycastTlas();
    this.markDirty();
  }

  private bindEvents(): void {
    const dom = this.renderer.domElement;
    this.cachedDomRect = dom.getBoundingClientRect();

    this.controls.addEventListener('start', () => {
      this.wakeLoop();
    });

    dom.addEventListener('pointerdown', (e) => {
      this.pointerDownPos.set(e.clientX, e.clientY);
      this.camAnimActive = false;
      this.markDirty();
    });

    dom.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const rect = this.cachedDomRect ?? (this.cachedDomRect = dom.getBoundingClientRect());
      if (rect.width <= 0 || rect.height <= 0) return;
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.hoverRaycastPending = true;
      this.wakeLoop();
    });

    dom.addEventListener('pointerleave', () => {
      this.hoverRaycastPending = false;
      if (this.hoveredPartId !== null) {
        const prev = this.hoveredPartId;
        this.hoveredPartId = null;
        this.container.classList.remove('is-hovering');
        this.applyHoverOrSelectDelta(prev, null);
        this.callbacks.onHoverPart(null);
      }
    });

    dom.addEventListener('pointerup', (e) => {
      const dist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
      if (dist > 5) return;

      const rect = this.cachedDomRect ?? (this.cachedDomRect = dom.getBoundingClientRect());
      if (rect.width <= 0 || rect.height <= 0) return;
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const hitPartId = this.pickPartAtPointer();
      if (hitPartId) {
        this.selectPart(hitPartId, true);
      } else if (this.selectedPartId) {
        this.selectPart(null, false);
      }
    });

    dom.addEventListener('wheel', () => this.wakeLoop(), { passive: true });
    dom.addEventListener('touchstart', () => this.wakeLoop(), { passive: true });

    dom.addEventListener('webglcontextlost', this.boundContextLost, false);
    dom.addEventListener('webglcontextrestored', this.boundContextRestored, false);
    document.addEventListener('visibilitychange', this.boundVisibilityChange);

    window.addEventListener('resize', this.boundHandleResize);
    document.addEventListener('fullscreenchange', this.boundHandleResize);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.boundHandleResize);
      this.resizeObserver.observe(this.container);
    }
  }

  private handleContextLost(event: Event): void {
    event.preventDefault();
    this.contextLost = true;
    this.contextLossCount++;
    this.recoveryOverlay.classList.add('is-visible');
  }

  private handleContextRestored(): void {
    this.currentMaxPixelRatio = Math.max(1.0, Number((this.currentMaxPixelRatio * 0.85).toFixed(2)));
    // Auto-step quality down on WebGL context loss so memory-constrained mobile devices never loop into a blank screen!
    if (this.quality === 'ultra') {
      this.quality = 'high';
      this.callbacks.onQualityChanged?.(this.quality);
    } else if (this.quality === 'high' && this.contextLossCount >= 2) {
      this.quality = 'standard';
      this.callbacks.onQualityChanged?.(this.quality);
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.currentMaxPixelRatio));
    this.renderer.setSize(
      Math.max(1, this.container.clientWidth),
      Math.max(1, this.container.clientHeight)
    );
    const drawBuf = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.ultraPipeline.setSize(drawBuf.x, drawBuf.y);
    this.cachedDomRect = this.renderer.domElement.getBoundingClientRect();
    this.partStateBuf.refreshAfterContextRestore();
    this.matRegistry.uniforms.uPartStateTex.value = this.partStateBuf.texture;
    this.matRegistry.refreshAfterContextRestore();
    this.overlayBatcher.refreshAfterContextRestore();
    this.ultraPipeline.handleContextRestored();
    for (const chunk of this.allChunks) {
      chunk.syncMaterials(this.matRegistry);
      for (const b of chunk.buckets) {
        b.mainRing.lastHash = -1;
        if (b.straddleRing) b.straddleRing.lastHash = -1;
        b.lastHighlightHash = -1;
      }
      if (chunk.edgeBucket) {
        chunk.edgeBucket.mainRing.lastHash = -1;
        if (chunk.edgeBucket.straddleRing) chunk.edgeBucket.straddleRing.lastHash = -1;
      }
    }
    this.contextLost = false;
    this.recoveryOverlay.classList.remove('is-visible');
    this.applyVisibilityAndStyles();
    this.syncGpuPartTransforms(true);
    this.visibilityDirty = true;
    this.guidesDirty = true;
    this.physicsOverlaysDirty = true;
    this.markDirty(4);
    this.renderFrame();
  }

  private renderFrame(): void {
    const useEnhanced =
      this.renderMode === 'solid' &&
      this.quality !== 'standard' &&
      this.ultraPipeline.healthy;

    if (!useEnhanced) {
      this.matRegistry.uniforms.uQualityTier.value = 0;
      this.matRegistry.uniforms.uHdrLinearOutput.value = 0;
      this.matRegistry.uniforms.uShadowMap.value = this.matRegistry.dummyShadowTex;
      this.ultraPipeline.getHighFloorMesh().visible = false;
      this.renderer.render(this.scene, this.camera);
      return;
    }

    this.camera.updateMatrixWorld();
    this.prepareFrameForRender(this.camera);
    this.renderer.getDrawingBufferSize(this.drawBufSize);
    this.ultraPipeline.setSize(this.drawBufSize.x, this.drawBufSize.y);
    this.ultraPipeline.render({
      quality: this.quality,
      scene: this.scene,
      camera: this.camera,
      controlsTarget: this.controls.target,
      activeChunks: this.activeChunks,
      activePickRecords: this.activePickRecords,
      isPartVisible: (partId) => !this.isPartHidden(partId),
      matRegistry: this.matRegistry,
      overlayGroup: this.overlayBatcher.group,
      explode: this.currentExplode,
      sectionActive: this.sectionAxis !== 'off',
      setSubPass: (flag) => {
        this.inSubPass = flag;
      },
    });
  }

  private handleVisibilityChange(): void {
    this.pageHidden = document.hidden;
    if (!this.pageHidden && !this.contextLost) {
      this.clock.getDelta();
      this.markDirty(3);
    }
  }

  public getGpuStats(): {
    profile: typeof GPU_PROFILE;
    quality: GraphicsQuality;
    ultraHealthy: boolean;
    pixelRatio: number;
    contextLost: boolean;
    contextLossCount: number;
    calls: number;
    triangles: number;
    lines: number;
    geometries: number;
    textures: number;
    programs: number;
    hydratedParts: number;
    totalParts: number;
    megaBatches: number;
    kinematicBones: number;
  } {
    const info = this.renderer.info;
    let boneCount = 0;
    for (let i = 0; i < this.allChunks.length; i++) {
      boneCount += this.allChunks[i].bones.length;
    }
    return {
      profile: GPU_PROFILE,
      quality: this.quality,
      ultraHealthy: this.ultraPipeline.healthy,
      pixelRatio: this.renderer.getPixelRatio(),
      contextLost: this.contextLost,
      contextLossCount: this.contextLossCount,
      calls: info.render.calls,
      triangles: info.render.triangles,
      lines: info.render.lines,
      geometries: info.memory.geometries,
      textures: info.memory.textures,
      programs: info.programs ? info.programs.length : 0,
      hydratedParts: this.allParts.length,
      totalParts: this.getTotalPartCount(),
      megaBatches: this.allChunks.length,
      kinematicBones: boneCount,
    };
  }

  private pickPartAtPointer(): string | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    return pickPartTwoPhase(
      this.raycaster,
      this.activePickRecords,
      (part) => !this.isPartHidden(part.id),
      this.sectionAxis !== 'off' ? this.clippingPlane : null
    );
  }

  private updateHoverFromRaycast(): void {
    const hitId = this.pickPartAtPointer();
    if (hitId !== this.hoveredPartId) {
      const prev = this.hoveredPartId;
      this.hoveredPartId = hitId;
      this.container.classList.toggle('is-hovering', hitId !== null);
      this.applyHoverOrSelectDelta(prev, hitId);
      this.callbacks.onHoverPart(hitId);
    }
  }

  private stepActiveAssemblies(elapsed: number, delta: number): void {
    const integrated = this.mode === 'integrated' || this.mode === 'camera_body';
    const liveDynamic = this.physicsActive || sharedLensOpticalSim.studioOpen;

    if (
      !this.kinematicsDirty &&
      !liveDynamic &&
      this.currentExplode === this.lastSyncedExplode &&
      integrated === this.lastSyncedIntegrated &&
      this.physicsActive === this.lastSyncedPhysics
    ) {
      return;
    }

    this.matRegistry.uniforms.uExplode.value = this.currentExplode;

    const macroAssemblies = [
      this.lensAssembly,
      this.mountAssembly,
      this.shutterAssembly,
      this.sensorAssembly,
      this.mainboardAssembly,
      this.evfAssembly,
      this.lcdAssembly,
      this.bodyAssembly,
    ];
    for (const asm of macroAssemblies) {
      if (asm.rootGroup.visible) {
        const asmPhysics =
          asm === this.lensAssembly
            ? this.physicsActive || sharedLensOpticalSim.studioOpen
            : this.physicsActive;
        asm.updateAnimation(elapsed, delta, this.currentExplode, asmPhysics, integrated);
      }
    }
    const standaloneUltraAssemblies = [
      this.microAssembly,
      this.bionzAssembly,
      this.mishoeAssembly,
      this.micAssembly,
    ];
    for (const asm of standaloneUltraAssemblies) {
      if (asm.rootGroup.visible) {
        asm.updateAnimation(elapsed, delta, this.currentExplode, this.physicsActive, false);
      }
    }
    if (this.batteryAssembly.rootGroup.visible) {
      this.batteryAssembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        false
      );
    }
    if (this.cfexpressAssembly.rootGroup.visible) {
      this.cfexpressAssembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        false
      );
    }

    this.syncGpuPartTransforms(false);
    invalidateRaycastTlas();
    if (liveDynamic) {
      this.physicsOverlaysDirty = true;
    }
    if (this.currentExplode !== this.lastSyncedExplode) {
      this.guidesDirty = true;
    }
    this.lastSyncedExplode = this.currentExplode;
    this.lastSyncedIntegrated = integrated;
    this.lastSyncedPhysics = this.physicsActive;
    this.kinematicsDirty = false;
  }

  private animate = (): void => {
    this.rafId = 0;
    if (this.disposed || this.contextLost || this.pageHidden) return;

    if (this.hoverRaycastPending) {
      this.hoverRaycastPending = false;
      this.updateHoverFromRaycast();
    }

    const delta = Math.min(this.clock.getDelta(), 0.05);
    const elapsed = this.clock.getElapsedTime();

    let active = this.physicsActive || sharedLensOpticalSim.studioOpen || this.dirtyFrames > 0;
    let explodeMoved = false;

    const diff = this.targetExplode - this.currentExplode;
    if (Math.abs(diff) > 0.0005) {
      this.currentExplode += diff * Math.min(1, delta * 10.0);
      explodeMoved = true;
      this.kinematicsDirty = true;
      if ((this.currentExplode < 0.005) !== this.lastSortWasAssembled) {
        this.visibilityDirty = true;
      }
      active = true;
    } else if (this.currentExplode !== this.targetExplode) {
      this.currentExplode = this.targetExplode;
      explodeMoved = true;
      this.kinematicsDirty = true;
      if ((this.currentExplode < 0.005) !== this.lastSortWasAssembled) {
        this.visibilityDirty = true;
      }
      active = true;
    }

    if (this.camAnimActive) {
      this.camAnimT = Math.min(1, this.camAnimT + delta * 2.8);
      const ease = 1 - Math.pow(1 - this.camAnimT, 3);
      this.camera.position.lerpVectors(this.camStartPos, this.camEndPos, ease);
      this.controls.target.lerpVectors(this.camStartTarget, this.camEndTarget, ease);
      if (this.camAnimT >= 1) {
        this.camAnimActive = false;
      }
      active = true;
    }

    const controlsChanged = this.controls.update();
    if (controlsChanged) {
      active = true;
    }

    if (active) {
      this.idleFrameStreak = 0;
      const needsGuideUpdate = explodeMoved;
      this.stepActiveAssemblies(elapsed, delta);
      if (needsGuideUpdate) {
        this.updateActiveExplodeGuides();
      }
      this.renderFrame();
      if (this.dirtyFrames > 0) this.dirtyFrames--;
    } else {
      this.idleFrameStreak++;
    }

    if (
      active ||
      this.hoverRaycastPending ||
      this.physicsActive ||
      sharedLensOpticalSim.studioOpen ||
      this.camAnimActive ||
      this.dirtyFrames > 0 ||
      this.idleFrameStreak < 12
    ) {
      this.rafId = requestAnimationFrame(this.animate);
    }
  };

  public dispose(): void {
    this.disposed = true;
    if (this.rafId !== 0) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    if (this.interactionRestoreTimer !== null) {
      window.clearTimeout(this.interactionRestoreTimer);
    }
    const dom = this.renderer.domElement;
    dom.removeEventListener('webglcontextlost', this.boundContextLost);
    dom.removeEventListener('webglcontextrestored', this.boundContextRestored);
    document.removeEventListener('visibilitychange', this.boundVisibilityChange);
    window.removeEventListener('resize', this.boundHandleResize);
    document.removeEventListener('fullscreenchange', this.boundHandleResize);
    this.resizeObserver?.disconnect();
    this.ultraPipeline.dispose();
    this.partStateBuf.dispose();
    this.matRegistry.dispose();
    this.overlayBatcher.dispose();
    for (const chunk of this.allChunks) {
      for (const g of chunk.geometries) g.dispose();
    }
    this.recoveryOverlay.remove();
    this.controls.dispose();
    this.renderer.dispose();
  }
}
