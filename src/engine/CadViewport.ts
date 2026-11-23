import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  AssemblyController,
  CadPart,
  CameraPreset,
  LensSection,
  RenderMode,
  ScaleMode,
  SectionAxis,
} from '../assemblies/types';
import { createMaterialLibrary, MaterialLibrary } from './Materials';
import { GPU_PROFILE } from './GpuOptimizer';
import {
  compileMegaBatchChunk,
  compileUnifiedMacroBatch,
  computePartWorldBox,
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
import { createLensAssembly } from '../assemblies/lens';
import { sharedLensOpticalSim } from '../assemblies/lens/lensOpticalSim';
import { createMountAssembly } from '../assemblies/mount';
import { createShutterAssembly } from '../assemblies/shutter';
import { createSensorAssemblies } from '../assemblies/sensor';
import { createMainboardAssembly } from '../assemblies/mainboard';
import { createEvfAssembly } from '../assemblies/evf';
import { createLcdAssembly } from '../assemblies/lcd';
import { createBodyAssembly } from '../assemblies/body';

export interface ViewportCallbacks {
  onSelectPart: (part: CadPart | null) => void;
  onHoverPart: (partId: string | null) => void;
  onVisibilityChanged: () => void;
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

// Zero-alloc scratch buffers for Breakthrough #27 Dynamic Front-to-Back Visibility Compactor
const _visSlots = new Int32Array(MAX_PARTS_CAPACITY);
const _visDistSq = new Float32Array(MAX_PARTS_CAPACITY);
const _edgeSlots = new Int32Array(MAX_PARTS_CAPACITY);
const _frustum = new THREE.Frustum();
const _projScreen = new THREE.Matrix4();
const _partSphere = new THREE.Sphere();
const _camDir = new THREE.Vector3();

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
  private assemblyBySubsystem: Record<SubsystemKey, AssemblyController>;
  private allParts: CadPart[] = [];
  private partById = new Map<string, CadPart>();
  private callbacks: ViewportCallbacks;

  // HYPERION-CAD v5 Engine (Zero-Texture L2-SH PBR + Directional PVS Oracle + Ping-Pong IBO Compactor!)
  private partStateBuf: PartStateTextureBuffer;
  private matRegistry: MaterialLutRegistry;
  private macroBatch!: UnifiedMacroBatch;
  private overlayBatcher: PhysicsOverlayBatcher;
  private overlaySources: OverlaySource[] = [];
  private subsystemChunks: Record<SubsystemKey, SubsystemChunks>;
  private allChunks: MegaBatchChunk[] = [];
  private activeChunks: MegaBatchChunk[] = [];
  private pickRecords: PartPickRecord[] = [];
  private pickRecordByPartId = new Map<string, PartPickRecord>();
  private activePickRecords: PartPickRecord[] = [];

  // Breakthrough #25 + #34: Exact 16-View Directional Hemisphere Bitmask PVS Oracle masks
  private assembledIntegratedMask: Uint16Array | null = null;
  private assembledBodyMask: Uint16Array | null = null;
  private inOracleBake = false;

  // Breakthrough #27/28/35: Visibility Compactor & Analytical Explode state
  private visibilityDirty = true;
  private overlaysDirty = true;
  private lastAnalyticalIntegrated: boolean | null = null;
  private lastSortCamPos = new THREE.Vector3(1e9, 1e9, 1e9);
  private lastSortCamDir = new THREE.Vector3(0, 0, 1);
  private lastSortCamDist = -1;
  private lastSortMode: ScaleMode | null = null;
  private lastSortWasAssembled = true;
  private lastOracleViewBits = 0xffff;

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
  private dirtyFrames = 2;
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
    // Eliminate synchronous gl.getProgramInfoLog() pipeline stalls during WebGL shader linking!
    this.renderer.debug.checkShaderErrors = false;
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

    // Camera & OrbitControls (supports ultra-close watchmaker micro-zoom down to 7 mm!)
    const aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(32, aspect, 0.12, 4800);

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

    // Hook WebGLRenderer.render() automatically so EVERY render updates uViewProj, overlays & front-to-back IBO compaction!
    this.scene.onBeforeRender = (_renderer, _scene, camera) => {
      this.prepareFrameForRender(camera);
    };

    // Build ALL 9 subsystem controllers (305 macro parts built upfront; 322 standalone-only & micro parts
    // lazily hydrated on first visit to each standalone mode — ALL 627 parts 100% preserved!)
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
      this.microAssembly.rootGroup
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

    // Breakthrough #18: Intercept ALL detached physics overlays & explode guides from all 9 subsystems
    // into our 2-draw-call GLSL3 PhysicsOverlayBatcher (298 overlay/guide draw calls -> 2 draw calls!)
    for (const asm of Object.values(this.assemblyBySubsystem)) {
      const remaining = [...asm.rootGroup.children];
      for (const child of remaining) {
        child.removeFromParent();
        this.overlaySources.push({
          isAssemblyVisible: () => asm.rootGroup.visible,
          root: child,
        });
      }
    }
    this.scene.add(this.overlayBatcher.group);

    this.syncAssemblyVisibility();
    this.stepActiveAssemblies(0, 0);
    this.applyVisibilityAndStyles();
    this.syncGpuPartTransforms(true);
    // Breakthrough #40: Zero-millisecond Pre-Baked 16-View Directional Hemisphere PVS Oracle (0 GPU readbacks!)
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
    this.animate();
  }

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
  }

  private hydrateSubsystemIfNeeded(subsystem: SubsystemKey): void {
    const asm = this.assemblyBySubsystem[subsystem];
    if (!asm.hydrateStandalone) return;
    const newlyBuilt = asm.hydrateStandalone();
    if (newlyBuilt.length > 0) {
      this.registerStandaloneParts(subsystem, newlyBuilt);
      this.kinematicsDirty = true;
    }
  }

  /** Total canonical dissectible part count across all 9 subsystems (always 627 — zero parts removed!). */
  public getTotalPartCount(): number {
    let deferred = 0;
    for (const asm of Object.values(this.assemblyBySubsystem)) {
      deferred += asm.deferredStandaloneCount ?? 0;
    }
    return this.allParts.length + deferred;
  }

  /** Force-hydrate every deferred standalone/micro subsystem immediately (returns 652). */
  public ensureAllHydrated(): number {
    for (const sub of Object.keys(this.assemblyBySubsystem) as SubsystemKey[]) {
      this.hydrateSubsystemIfNeeded(sub);
    }
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

  private isPartInCurrentMode(part: CadPart): boolean {
    if (this.mode === 'integrated') {
      return part.subsystem !== 'micro' && !part.standaloneOnly;
    }
    if (this.mode === 'camera_body') {
      return part.subsystem !== 'micro' && part.subsystem !== 'lens' && !part.standaloneOnly;
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

    if (this.mode === 'micro') {
      this.macroBatch.setHidden();
    } else {
      this.macroBatch.group.visible = true;
      this.activeChunks.push(this.macroBatch);
    }

    // Standalone / Micro lazily hydrated chunks
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
    this.overlaysDirty = true;
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

    this.lensAssembly.rootGroup.visible = showLens;
    this.mountAssembly.rootGroup.visible = showMount;
    this.shutterAssembly.rootGroup.visible = showShutter;
    this.sensorAssembly.rootGroup.visible = showSensor;
    this.mainboardAssembly.rootGroup.visible = showMainboard;
    this.evfAssembly.rootGroup.visible = showEvf;
    this.lcdAssembly.rootGroup.visible = showLcd;
    this.bodyAssembly.rootGroup.visible = showBody;
    this.microAssembly.rootGroup.visible = showMicro;

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
    if (partId) {
      const candidate = this.partById.get(partId);
      if (!candidate || !this.isPartInCurrentMode(candidate)) return;
    }
    if (partId === this.selectedPartId) return;
    this.selectedPartId = partId;

    if (partId && this.hiddenPartIds.has(partId)) {
      this.hiddenPartIds.delete(partId);
    }
    if (partId && this.isolatedPartId && this.isolatedPartId !== partId) {
      this.isolatedPartId = partId;
    }

    this.applyVisibilityAndStyles();
    const part = this.getSelectedPart();
    if (part && focusCamera) {
      this.focusOnPart(part);
    }
    this.callbacks.onSelectPart(part);
    this.callbacks.onVisibilityChanged();
  }

  public setHoveredPartFromUI(partId: string | null): void {
    if (this.hoveredPartId === partId) return;
    this.hoveredPartId = partId;
    this.applyVisibilityAndStyles();
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
      d = 168 + e * 435;
      target = new THREE.Vector3(14.0 * e, -2.0, -4.0 - e * 56.0);
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
    const isMicro = this.mode === 'micro';
    const maxDist = isMicro
      ? 66
      : this.mode === 'evf'
        ? 112
        : this.mode === 'integrated' || this.mode === 'camera_body'
          ? 280
          : 168;
    const minDist = isMicro ? 34 : this.mode === 'evf' ? 44 : 56;
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
        for (const chunk of this.allChunks) chunk.syncMaterials(this.matRegistry);
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

  /**
   * Runs automatically inside `scene.onBeforeRender` on EVERY `renderer.render(scene, camera)` call!
   * Keeps `uViewProj`, `uExplode`, overlays, and Front-to-Back Dynamic IBO Compaction 100% synchronized.
   */
  private prepareFrameForRender(camera: THREE.Camera): void {
    if (this.inOracleBake) return;

    this.matRegistry.syncViewProj(camera);
    this.matRegistry.uniforms.uExplode.value = this.currentExplode;

    // Lazily bake camera_body occlusion mask on first assembled visit
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

    // Flush detached physics overlays & explode guides at most ONCE per rendered frame!
    if (this.overlaysDirty) {
      this.overlayBatcher.sync(this.overlaySources);
      this.overlaysDirty = false;
    }

    this.updateCompactedFrameVisibility(camera);
  }

  /**
   * Breakthrough #27 + #34 + #35:
   * Zero-Alloc Front-to-Back Frustum + 16-View Directional Hemisphere PVS + Section-Plane + Sub-Pixel Edge Compactor.
   * Builds exact minimal visible IBOs sorted near-to-far for 95%+ Hardware Early-Z rejection,
   * and skips IBO uploads entirely when the visible set & angular sort bucket are unchanged!
   */
  private updateCompactedFrameVisibility(camera: THREE.Camera): void {
    _projScreen.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    _frustum.setFromProjectionMatrix(_projScreen);

    const camPos = camera.position;
    camera.getWorldDirection(_camDir);
    const camDist = camPos.distanceTo(this.controls.target);

    const isXray = this.renderMode === 'xray';
    const isSolid = this.renderMode === 'solid';
    const isWholeCameraMode = this.mode === 'integrated' || this.mode === 'camera_body';
    const isAssembled = this.currentExplode < 0.005;
    const useSectionCull = this.sectionAxis !== 'off';
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

    const hideMobileSolidEdges = GPU_PROFILE.isMobile && isWholeCameraMode && isSolid;
    const persp = camera as THREE.PerspectiveCamera;
    const fovRad = ((persp.fov || 32) * Math.PI) / 180;
    const projScale = Math.max(240, this.container.clientHeight) / (2 * Math.tan(fovRad * 0.5));
    // Smooth distance-adaptive edge budget: crisp close-up (2.4px), clean zoomed-out exploded (5.0px)
    const distT = THREE.MathUtils.clamp((camDist - 500) / 600, 0, 1);
    const solidMinPx = isWholeCameraMode ? 2.4 + distT * 2.6 : 1.8;
    const edgeMinPxSq = solidMinPx * solidMinPx;

    const selSlot = this.selectedPartId
      ? (this.pickRecordByPartId.get(this.selectedPartId)?.slot ?? -1)
      : -1;
    const hovSlot = this.hoveredPartId
      ? (this.pickRecordByPartId.get(this.hoveredPartId)?.slot ?? -1)
      : -1;

    const e = this.currentExplode;
    const eSort = isAssembled ? 0 : 0.5;
    const integrated = isWholeCameraMode;

    for (let ci = 0; ci < this.activeChunks.length; ci++) {
      const chunk = this.activeChunks[ci];
      const recs = chunk.partRecords;
      let visCount = 0;
      let edgeCount = 0;

      for (let i = 0; i < recs.length; i++) {
        const rec = recs[i];
        const part = rec.part;
        if (!this.isPartInCurrentMode(part) || this.isPartHidden(part.id)) continue;

        const slot = rec.slot;
        const isHighlighted = slot === selSlot || slot === hovSlot;

        // Breakthrough #34: 1-instruction Directional Hemisphere Bitmask PVS culling!
        if (activeMask && (activeMask[slot] & activeViewBits) === 0 && !isHighlighted) {
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

        const r =
          rec.boneSlices.length > 0
            ? Math.max(rec.localSphere.radius, 34)
            : Math.max(rec.localSphere.radius, 1.5);

        _partSphere.center.set(cx, cy, cz);
        _partSphere.radius = r;

        if (!_frustum.intersectsSphere(_partSphere)) continue;

        // Exact section-plane part culling: skip parts 100% on clipped side (saves ~45% tris & fragments!)
        if (useSectionCull && this.clippingPlane.distanceToPoint(_partSphere.center) < -r - 0.5) {
          continue;
        }

        const sdx = scx - sortX;
        const sdy = scy - sortY;
        const sdz = scz - sortZ;
        _visSlots[visCount] = slot;
        _visDistSq[visCount] = sdx * sdx + sdy * sdy + sdz * sdz;
        visCount++;

        // Edge stream filtering: drop unselected mobile solid edges & sub-pixel micro-edges in solid/whole-camera X-Ray
        if (isHighlighted) {
          _edgeSlots[edgeCount++] = slot;
        } else if (!hideMobileSolidEdges) {
          if (isSolid || (isXray && isWholeCameraMode)) {
            const cdx = cx - camX;
            const cdy = cy - camY;
            const cdz = cz - camZ;
            const distSq = cdx * cdx + cdy * cdy + cdz * cdz;
            const rProj = r * projScale;
            const minPxSq = isXray ? 81.0 : edgeMinPxSq;
            if (rProj * rProj >= distSq * minPxSq) {
              _edgeSlots[edgeCount++] = slot;
            }
          } else {
            _edgeSlots[edgeCount++] = slot;
          }
        }
      }

      // Fast insertion sort FRONT-TO-BACK (near -> far) for maximum Hardware Early-Z rejection!
      for (let i = 1; i < visCount; i++) {
        const keyD = _visDistSq[i];
        const keyS = _visSlots[i];
        let j = i - 1;
        while (j >= 0 && _visDistSq[j] > keyD) {
          _visDistSq[j + 1] = _visDistSq[j];
          _visSlots[j + 1] = _visSlots[j];
          j--;
        }
        _visDistSq[j + 1] = keyD;
        _visSlots[j + 1] = keyS;
      }

      // Deterministic 32-bit FNV-1a hashes so unchanged frames do ZERO copies & ZERO GPU uploads!
      let partHash = (2166136261 ^ visCount) | 0;
      for (let i = 0; i < visCount; i++) {
        partHash = Math.imul(partHash ^ _visSlots[i], 16777619);
      }
      let edgeHash = (2166136261 ^ edgeCount) | 0;
      for (let i = 0; i < edgeCount; i++) {
        edgeHash = Math.imul(edgeHash ^ _edgeSlots[i], 16777619);
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
        hovSlot
      );
    }
  }

  /**
   * Breakthrough #28: Upload static `(assembledPos, explodeOffset)` ONCE per mode switch for ~90% of parts.
   * Subsequent explode changes only update 1 scalar float uniform (`uExplode`) with ZERO CPU loops & ZERO uploads!
   */
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

  /**
   * Stream ONLY dynamic non-analytical parts (~25), 62 kinematic bones, and 16 dynamicGlow LEDs
   * to the 64 KB GPU State Texture (0 uploads for the ~585 analytical rigid parts!).
   */
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

    this.partStateBuf.flushIfDirty();
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

  private applyVisibilityAndStyles(): void {
    const isWholeCameraMode = this.mode === 'integrated' || this.mode === 'camera_body';

    for (let i = 0; i < this.allParts.length; i++) {
      const part = this.allParts[i];
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
        continue;
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

      // Update Mega-Batch GPU Kinematic State Texture (0 CPU material swaps across ALL 627 parts + 62 bones!)
      if (slot !== undefined) {
        const visFlag = hidden ? 0 : isSelected ? 3 : isHovered ? 2 : 1;
        let ec = EDGE_COL_SOLID;
        let edgeAlphaEncoded = -1.0; // Negative => multiply vertex baseOpacity by |val|
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

    for (let ci = 0; ci < this.allChunks.length; ci++) {
      this.syncChunkGlows(this.allChunks[ci]);
    }

    this.partStateBuf.flushIfDirty();
    this.visibilityDirty = true;
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
      // Coalesce high-frequency pointermove events to at most 1 raycast per animation frame!
      this.hoverRaycastPending = true;
      this.wakeLoop();
    });

    dom.addEventListener('pointerleave', () => {
      this.hoverRaycastPending = false;
      if (this.hoveredPartId !== null) {
        this.hoveredPartId = null;
        this.container.classList.remove('is-hovering');
        this.applyVisibilityAndStyles();
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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.currentMaxPixelRatio));
    this.renderer.setSize(
      Math.max(1, this.container.clientWidth),
      Math.max(1, this.container.clientHeight)
    );
    this.cachedDomRect = this.renderer.domElement.getBoundingClientRect();
    this.partStateBuf.markDirty();
    this.partStateBuf.flushIfDirty();
    this.matRegistry.refreshAfterContextRestore();
    this.overlayBatcher.refreshAfterContextRestore();
    for (const chunk of this.allChunks) {
      chunk.syncMaterials(this.matRegistry);
      for (const b of chunk.buckets) {
        b.lastHash = -1;
        b.lastHighlightHash = -1;
      }
      if (chunk.edgeBucket) chunk.edgeBucket.lastHash = -1;
    }
    this.contextLost = false;
    this.recoveryOverlay.classList.remove('is-visible');
    this.applyVisibilityAndStyles();
    this.syncGpuPartTransforms(true);
    this.visibilityDirty = true;
    this.overlaysDirty = true;
    this.markDirty(4);
    this.renderer.render(this.scene, this.camera);
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
      this.hoveredPartId = hitId;
      this.container.classList.toggle('is-hovering', hitId !== null);
      this.applyVisibilityAndStyles();
      this.callbacks.onHoverPart(hitId);
    }
  }

  private stepActiveAssemblies(elapsed: number, delta: number): void {
    const integrated = this.mode === 'integrated' || this.mode === 'camera_body';
    const liveDynamic = this.physicsActive || sharedLensOpticalSim.studioOpen;

    // Dirty-Delta Kinematic Scheduler: skip redundant math & GPU uploads during static orbit!
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
    if (this.microAssembly.rootGroup.visible) {
      this.microAssembly.updateAnimation(
        elapsed,
        delta,
        this.currentExplode,
        this.physicsActive,
        false
      );
    }

    this.syncGpuPartTransforms(false);
    if (liveDynamic || this.currentExplode !== this.lastSyncedExplode) {
      this.overlaysDirty = true;
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
      const needsGuideUpdate = explodeMoved || this.kinematicsDirty;
      this.stepActiveAssemblies(elapsed, delta);
      if (needsGuideUpdate) {
        this.updateActiveExplodeGuides();
      }
      this.renderer.render(this.scene, this.camera);
      if (this.dirtyFrames > 0) this.dirtyFrames--;
    } else {
      this.idleFrameStreak++;
    }

    // Breakthrough #21: Zero-Wakeup On-Demand rAF Hibernation (0% idle CPU/battery after 12 quiet frames!)
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
    this.partStateBuf.dispose();
    this.matRegistry.dispose();
    this.overlayBatcher.dispose();
    for (const chunk of this.allChunks) {
      for (const g of chunk.geometries) g.dispose();
      for (const b of chunk.buckets) b.xrayHighlightGeo?.dispose();
    }
    this.recoveryOverlay.remove();
    this.controls.dispose();
    this.renderer.dispose();
  }
}
