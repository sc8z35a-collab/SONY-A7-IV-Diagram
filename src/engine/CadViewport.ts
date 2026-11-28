import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  CadPart,
  CameraPreset,
  ExtendedCameraPreset,
  GraphicsQuality,
  LensSection,
  RenderMode,
  ScaleMode,
  SectionAxis,
  SensorFabStage,
  SensorFabVolume,
} from '../assemblies/types';
import { GPU_PROFILE } from './GpuOptimizer';
import { sharedLensOpticalSim } from '../assemblies/lens/lensOpticalSim';
import { UnitV2Runtime } from '../core/unit_v2_runtime';
import { hasRegisteredUnit, listRegisteredUnits, loadRegisteredUnitMeta } from '../units/registry';

export interface ViewportCallbacks {
  onSelectPart: (part: CadPart | null) => void;
  onHoverPart: (partId: string | null) => void;
  onVisibilityChanged: () => void;
  onQualityChanged?: (quality: GraphicsQuality) => void;
}

const COMPOSITE_UNIT_IDS = new Set(['integrated', 'camera_body']);
const _focusBox = new THREE.Box3();
const _focusCenter = new THREE.Vector3();
const _focusOffset = new THREE.Vector3();
const _fitBox = new THREE.Box3();
const _fitPartBox = new THREE.Box3();
const _fitCenter = new THREE.Vector3();
const _fitSize = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _camRight = new THREE.Vector3();
const _camUp = new THREE.Vector3();
const _camProj = new THREE.Vector3();
const _rollQuat = new THREE.Quaternion();
const _worldUp = new THREE.Vector3(0, 1, 0);
const _metaEmptyGroup = new THREE.Group();
const _metaZeroVec = new THREE.Vector3(0, 0, 0);

/**
 * Pure V2 Universal CAD Viewport Shell.
 *
 * All 20 modes (18 individual assemblies = 1,650 parts + 2 composite camera modes `integrated` / `camera_body`)
 * run exclusively through `UnitV2Runtime` with:
 * - Dynamic lazy-loaded chunks per unit (`src/units/<mode>.ts` + `src/data/<mode>.json`)
 * - 8ms time-sliced chunked compilation + abort cancellation
 * - 38-bucket shared `ResourceCache` PBR materials + Tier-1 InstancedMesh + Tier-2 BatchedMesh + Tier-3 BatchedEdgeLines
 * - Explicit PMREM studio baking & immediate disposal + verified Δg=0 / Δt=0 VRAM round-trip safety
 * - Dirty-flag on-demand rendering (true 0% GPU idle)
 * - Automatic STD quality recovery on `webglcontextlost` / `webglcontextrestored`
 */
export class CadViewport {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private callbacks: ViewportCallbacks;
  private v2Runtime: UnitV2Runtime;

  private clippingPlane: THREE.Plane;
  private pointer = new THREE.Vector2();
  private pointerDownPos = new THREE.Vector2();
  private hoverRaycastPending = false;

  private mode: ScaleMode = 'welcome';
  private lensSection: LensSection = 1;
  private sensorFabVolume: SensorFabVolume = 0;
  private miraiSubView = 1;
  private originalSubView = 1;
  private renderMode: RenderMode = 'solid';
  private quality: GraphicsQuality = 'ultra';
  private sectionAxis: SectionAxis = 'off';
  private sectionValue = 0.5;
  private customClipPlaneActive = false;
  private targetExplode = 0;
  private currentExplode = 0;
  private physicsActive = false;

  private selectedPartId: string | null = null;
  private hoveredPartId: string | null = null;
  private isolatedPartId: string | null = null;
  private hiddenPartIds = new Set<string>();
  private pendingSelectAfterHydrate: { partId: string; focusCamera: boolean } | null = null;

  private initialActivated = false;
  private captureControlled = false;
  private metaOnlyMode: ScaleMode | null = null;
  private metaOnlyParts: CadPart[] = [];
  private metaOnlyPartById = new Map<string, CadPart>();

  // Smooth camera transition & Multi-Stage Adaptive FAST <-> LITE <-> ULTRA tracking
  private camAnimActive = false;
  private camStartPos = new THREE.Vector3();
  private camEndPos = new THREE.Vector3();
  private camStartTarget = new THREE.Vector3();
  private camEndTarget = new THREE.Vector3();
  private camAnimT = 0;
  private wheelMotionFrames = 0;
  private prevCamPos = new THREE.Vector3();
  private prevCamQuat = new THREE.Quaternion();
  private prevCamInitialized = false;
  private emaRenderMs = 12;
  private fastStageCooldown = 0;
  private baseHeroDist = 228;

  private resizeObserver: ResizeObserver | null = null;
  private boundHandleResize = () => this.handleResize();

  // WebGL context-loss & visibility lifecycle
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
  private customSceneRenderer:
    | ((renderer: THREE.WebGLRenderer, dt: number) => boolean | void)
    | null = null;

  constructor(container: HTMLElement, callbacks: ViewportCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    const search = typeof window !== 'undefined' ? window.location.search : '';
    const isPpCapture = search.includes('pp=1');
    const wantAlpha = search.includes('alpha=1');

    this.renderer = new THREE.WebGLRenderer({
      antialias: GPU_PROFILE.antialias,
      alpha: wantAlpha,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: isPpCapture,
    });
    this.renderer.debug.checkShaderErrors = true;
    this.renderer.shadowMap.enabled = false;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, GPU_PROFILE.maxPixelRatio));
    this.renderer.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight));
    this.renderer.setClearColor(0xffffff, wantAlpha ? 0 : 1);
    this.renderer.localClippingEnabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    // Zero-text SVG recovery spinner overlay (only shown if OS/GPU triggers webglcontextlost)
    this.recoveryOverlay = document.createElement('div');
    this.recoveryOverlay.className = 'gpu-recovery-overlay';
    this.recoveryOverlay.setAttribute('aria-hidden', 'true');
    this.recoveryOverlay.innerHTML =
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" opacity="0.22"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>';
    container.appendChild(this.recoveryOverlay);

    const aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(32, aspect, 0.25, 2400);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.065;
    // 16x deeper & finer macro zoom (7 / 16 = 0.4375mm) + tighter unit-aware maxDistance!
    this.controls.minDistance = 0.4375;
    this.controls.maxDistance = 480;
    this.controls.zoomSpeed = 0.56;
    this.controls.addEventListener('change', () => {
      this.markDirty(2);
    });

    this.clippingPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 10000);

    this.v2Runtime = new UnitV2Runtime(
      this.renderer,
      this.container,
      this.clippingPlane,
      {
        onBuildComplete: (unitId) => {
          if (this.mode === unitId) {
            this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode));
            this.v2Runtime.syncExplode(this.currentExplode);
            this.v2Runtime.syncPhysicsActive(this.physicsActive);
            this.v2Runtime.syncSectionPlane(this.isSectionActive());
            this.v2Runtime.syncVisualState(
              this.selectedPartId,
              this.hoveredPartId,
              this.hiddenPartIds,
              this.isolatedPartId,
              this.renderMode
            );
            this.markDirty(2);
          }
          this.callbacks.onVisibilityChanged();
          if (
            this.mode === unitId &&
            this.pendingSelectAfterHydrate &&
            this.v2Runtime.getPartById(this.pendingSelectAfterHydrate.partId)
          ) {
            const pending = this.pendingSelectAfterHydrate;
            this.pendingSelectAfterHydrate = null;
            this.selectPart(pending.partId, pending.focusCamera);
          }
        },
        onRequestRender: () => {
          this.markDirty(2);
        },
        onQualityFallback: (fallbackQuality) => {
          this.quality = fallbackQuality;
          this.callbacks.onQualityChanged?.(fallbackQuality);
        },
      }
    );

    this.setCameraPreset('iso', true);
    this.bindEvents();
    if (isPpCapture) {
      this.captureControlled = true;
    } else {
      this.wakeLoop();
      // Defer initial activation by one microtask so synchronous URL ?quality= / ?preset= setup
      // in main.ts applies before the first dynamic chunk import & GPU compile begins!
      queueMicrotask(() => {
        if (!this.disposed && !this.initialActivated && !this.customSceneRenderer) {
          this.activateCurrentMode();
        }
      });
    }
  }

  private isSectionActive(): boolean {
    return this.sectionAxis !== 'off' || this.customClipPlaneActive;
  }

  private activateCurrentMode(): void {
    this.initialActivated = true;
    this.metaOnlyMode = null;
    this.metaOnlyParts = [];
    this.metaOnlyPartById.clear();
    const mode = this.mode;
    void this.v2Runtime.activate(mode, this.quality, this.camera, {
      explode: this.currentExplode,
      renderMode: this.renderMode,
      physicsActive: this.physicsActive,
      sectionActive: this.isSectionActive(),
      subView: this.getActiveSubViewForMode(mode),
      integratedMode: mode === 'integrated' || mode === 'camera_body',
    });
  }

  /**
   * Capture-controlled freeze mode for `pp1.1` 0-1 render commit pipeline.
   * Prevents redundant background rAF loops while state mutations are applied in batch.
   */
  public setCaptureControlled(enabled: boolean): void {
    this.captureControlled = enabled;
    if (enabled) {
      if (this.rafId !== 0) {
        cancelAnimationFrame(this.rafId);
        this.rafId = 0;
      }
    } else {
      this.markDirty(1);
    }
  }

  /**
   * Single-pass atomic V2 activation for `pp1.1`: sets mode, quality & subView simultaneously
   * without triggering double-builds or redundant motion-proxy builds.
   */
  public async activateAtomic(
    nextMode: ScaleMode,
    quality: GraphicsQuality,
    opts?: {
      explode?: number;
      renderMode?: RenderMode;
      physicsActive?: boolean;
      sectionActive?: boolean;
      subView?: number;
      skipMotionProxy?: boolean;
      deferShaderWarmup?: boolean;
    }
  ): Promise<void> {
    const subViewChanged =
      typeof opts?.subView === 'number' && opts.subView !== this.getActiveSubViewForMode(nextMode);
    if (typeof opts?.subView === 'number') {
      if (nextMode === 'lens') {
        this.lensSection = Math.max(1, Math.min(3, Math.round(opts.subView))) as LensSection;
      } else if (nextMode === 'sensor_fab') {
        this.sensorFabVolume = Math.max(0, Math.min(5, Math.round(opts.subView))) as SensorFabVolume;
      } else if (nextMode === 'mirai_2028') {
        this.miraiSubView = Math.max(1, Math.min(8, Math.round(opts.subView)));
      }
    } else if (nextMode === 'lens' && this.mode !== 'lens') {
      this.lensSection = 1;
    }

    const alreadyWarm =
      this.v2Runtime.isActive() &&
      this.v2Runtime.isReady() &&
      this.v2Runtime.getActiveUnitId() === nextMode &&
      this.v2Runtime.getQuality() === quality;

    this.mode = nextMode;
    this.quality = quality;
    this.initialActivated = true;
    this.metaOnlyMode = null;
    this.metaOnlyParts = [];
    this.metaOnlyPartById.clear();

    if (typeof opts?.explode === 'number') {
      this.targetExplode = THREE.MathUtils.clamp(opts.explode, 0, 1);
      this.currentExplode = this.targetExplode;
    }
    if (opts?.renderMode) {
      this.renderMode = opts.renderMode;
    }
    if (typeof opts?.physicsActive === 'boolean') {
      this.physicsActive = opts.physicsActive;
    }

    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.pendingSelectAfterHydrate = null;
    this.callbacks.onQualityChanged?.(quality);

    if (alreadyWarm) {
      if (subViewChanged) {
        this.v2Runtime.setSubView(this.getActiveSubViewForMode(nextMode));
      }
      this.v2Runtime.syncExplode(this.currentExplode, true);
      this.v2Runtime.syncPhysicsActive(this.physicsActive);
      this.v2Runtime.syncSectionPlane(Boolean(opts?.sectionActive ?? this.isSectionActive()));
      this.v2Runtime.syncVisualState(null, null, this.hiddenPartIds, null, this.renderMode);
      this.callbacks.onSelectPart(null);
      this.callbacks.onHoverPart(null);
      this.callbacks.onVisibilityChanged();
      return;
    }

    await this.v2Runtime.activate(nextMode, quality, this.camera, {
      explode: this.currentExplode,
      renderMode: this.renderMode,
      physicsActive: this.physicsActive,
      sectionActive: Boolean(opts?.sectionActive ?? this.isSectionActive()),
      subView: this.getActiveSubViewForMode(nextMode),
      integratedMode: nextMode === 'integrated' || nextMode === 'camera_body',
      synchronous: true,
      skipMotionProxy: opts?.skipMotionProxy ?? true,
      deferShaderWarmup: Boolean(opts?.deferShaderWarmup),
      skipRenderCallback: true,
    });
    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  /**
   * 0-WebGL Metadata-Only Hydration for `ui`, `diagram`, and `explanation` modes:
   * Loads pure unit JSON metadata in ~2ms with ZERO WebGL geometry, ZERO shaders, ZERO draws!
   */
  public async hydrateMetaOnly(
    nextMode: ScaleMode,
    quality?: GraphicsQuality,
    subView?: number
  ): Promise<void> {
    if (typeof subView === 'number') {
      if (nextMode === 'lens') {
        this.lensSection = Math.max(1, Math.min(3, Math.round(subView))) as LensSection;
      } else if (nextMode === 'sensor_fab') {
        this.sensorFabVolume = Math.max(0, Math.min(5, Math.round(subView))) as SensorFabVolume;
      } else if (nextMode === 'mirai_2028') {
        this.miraiSubView = Math.max(1, Math.min(8, Math.round(subView)));
      }
    }
    this.mode = nextMode;
    if (quality) {
      this.quality = quality;
      this.callbacks.onQualityChanged?.(quality);
    }
    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.pendingSelectAfterHydrate = null;

    // If WebGL already holds this exact unit ready, reuse its parts directly!
    if (this.v2Runtime.isReady() && this.v2Runtime.getActiveUnitId() === nextMode) {
      this.metaOnlyMode = null;
      this.metaOnlyParts = [];
      this.metaOnlyPartById.clear();
      this.callbacks.onSelectPart(null);
      this.callbacks.onHoverPart(null);
      this.callbacks.onVisibilityChanged();
      return;
    }

    const meta = await loadRegisteredUnitMeta(nextMode);
    this.metaOnlyMode = nextMode;
    this.metaOnlyParts = [];
    this.metaOnlyPartById.clear();
    if (meta) {
      const activeSubView = this.getActiveSubViewForMode(nextMode);
      const isComposite = nextMode === 'integrated' || nextMode === 'camera_body';
      const inferCompositeSubsystem = (id: string): CadPart['subsystem'] => {
        if (id.startsWith('lens-')) return 'lens';
        if (id.startsWith('mount-')) return 'mount';
        if (id.startsWith('body-')) return 'body';
        if (id.startsWith('shutter-')) return 'shutter';
        if (id.startsWith('mb-')) return 'mainboard';
        if (id.startsWith('evf-')) return 'evf';
        if (id.startsWith('lcd-')) return 'lcd';
        if (id.startsWith('mi-')) return 'mishoe';
        return 'sensor';
      };
      for (let i = 0; i < meta.parts.length; i++) {
        const pm = meta.parts[i];
        if (nextMode === 'lens' && typeof pm.lensSection === 'number' && activeSubView > 0 && pm.lensSection !== activeSubView) {
          continue;
        }
        if (nextMode === 'sensor_fab' && typeof pm.fabVolume === 'number' && pm.fabVolume !== activeSubView) {
          continue;
        }
        if (nextMode === 'mirai_2028' && typeof pm.miraiSubView === 'number' && pm.miraiSubView !== activeSubView) {
          continue;
        }
        const subsystem = (isComposite ? inferCompositeSubsystem(pm.id) : nextMode) as CadPart['subsystem'];
        const stub: CadPart = {
          id: pm.id,
          subsystem,
          order: pm.order,
          swatchColor: pm.swatchColor,
          group: _metaEmptyGroup,
          assembledPos: _metaZeroVec,
          explodeOffset: _metaZeroVec,
          interactiveMeshes: [],
          edgeLines: [],
          standaloneOnly: pm.standaloneOnly,
          lensSection: pm.lensSection,
          fabVolume: pm.fabVolume,
          miraiSubView: pm.miraiSubView,
          explanation: {
            title: pm.title,
            subtitle: pm.subtitle,
            category: pm.category,
            plainAnalogy: pm.plainAnalogy,
            summary: pm.summary,
            opticsAndPhysics: [...pm.opticsAndPhysics],
            formula: pm.formula ? { ...pm.formula } : undefined,
            nextGenInnovation: pm.nextGenInnovation,
            specs: pm.specs.map((s) => ({ label: s.label, value: s.value })),
            references: pm.references ? [...pm.references] : undefined,
            mirai: pm.mirai,
            diagramType: pm.diagramType,
          },
        };
        this.metaOnlyParts.push(stub);
        this.metaOnlyPartById.set(stub.id, stub);
      }
    }
    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public isMetaOnlyActive(): boolean {
    return (
      this.metaOnlyMode === this.mode &&
      (!this.v2Runtime.isReady() || this.v2Runtime.getActiveUnitId() !== this.mode)
    );
  }

  /**
   * Synchronous exact-1-frame render commit for `pp1.1` (zero proxy-flash, zero extra rAF!).
   */
  public renderCaptureFrameNow(): void {
    if (this.disposed || this.contextLost) return;
    if (this.customSceneRenderer) {
      this.customSceneRenderer(this.renderer, 0.016);
      return;
    }
    this.camAnimActive = false;
    this.wheelMotionFrames = 0;
    this.updateDynamicClipPlanes();
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld(true);
    this.prevCamPos.copy(this.camera.position);
    this.prevCamQuat.copy(this.camera.quaternion);
    this.prevCamInitialized = true;
    this.v2Runtime.setUltraMotionProxyActive(false);
    this.v2Runtime.ensureShadersWarmed(this.camera);
    this.v2Runtime.syncExplode(this.currentExplode);
    this.v2Runtime.render(this.camera);
  }

  public isV2Mode(mode: ScaleMode = this.mode): boolean {
    return hasRegisteredUnit(mode);
  }

  public getV2Runtime(): UnitV2Runtime {
    return this.v2Runtime;
  }

  /** Backward-compatible alias */
  public getMiShoeV2Runtime(): UnitV2Runtime {
    return this.v2Runtime;
  }

  private getActiveSubViewForMode(mode: ScaleMode): number {
    if (mode === 'lens') return sharedLensOpticalSim.studioOpen ? -1 : this.lensSection;
    if (mode === 'sensor_fab') return this.sensorFabVolume;
    if (mode === 'mirai_2028') return this.miraiSubView;
    if (mode === 'original') return this.originalSubView;
    return 0;
  }

  /** Total canonical dissectible part count across all 18 individual assemblies (1,650 parts). */
  public getTotalPartCount(): number {
    let total = 0;
    for (const entry of listRegisteredUnits()) {
      if (!COMPOSITE_UNIT_IDS.has(entry.unitId)) {
        total += entry.declaredPartCount;
      }
    }
    return total;
  }

  public async ensureAllHydrated(): Promise<number> {
    return this.getTotalPartCount();
  }

  public getPartsForCurrentMode(): CadPart[] {
    if (this.isMetaOnlyActive()) {
      return this.metaOnlyParts;
    }
    return this.v2Runtime.getParts();
  }

  public getSelectedPart(): CadPart | null {
    if (!this.selectedPartId) return null;
    if (this.isMetaOnlyActive()) {
      return this.metaOnlyPartById.get(this.selectedPartId) ?? null;
    }
    return this.v2Runtime.getPartById(this.selectedPartId);
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
    this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode));
    this.v2Runtime.syncVisualState(
      this.selectedPartId,
      this.hoveredPartId,
      this.hiddenPartIds,
      this.isolatedPartId,
      this.renderMode
    );
    this.updateClippingPlane();
    this.markDirty(2);
  }

  public setLensSection(section: LensSection, immediateCamera = false): void {
    const changed = this.lensSection !== section;
    this.lensSection = section;
    if (this.mode !== 'lens') return;
    if (!changed && !immediateCamera) {
      this.setCameraPreset('iso', false);
      return;
    }
    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.v2Runtime.setSubView(section);
    this.v2Runtime.syncVisualState(null, null, this.hiddenPartIds, null, this.renderMode);
    this.updateClippingPlane();
    this.setCameraPreset('iso', immediateCamera);
    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public getSensorFabVolume(): SensorFabVolume {
    return this.sensorFabVolume;
  }

  public setSensorFabVolume(vol: SensorFabVolume, immediateCamera = false): void {
    const changed = this.sensorFabVolume !== vol;
    this.sensorFabVolume = vol;
    if (this.mode !== 'sensor_fab') return;
    if (!changed && !immediateCamera) {
      this.setCameraPreset('iso', false);
      return;
    }
    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.v2Runtime.setSubView(vol);
    this.v2Runtime.syncVisualState(null, null, this.hiddenPartIds, null, this.renderMode);
    this.updateClippingPlane();
    this.setCameraPreset('iso', immediateCamera);
    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public getMiraiSubView(): number {
    return this.miraiSubView;
  }

  public setMiraiSubView(subView: number, immediateCamera = false): void {
    const clamped = Math.max(1, Math.min(8, Math.round(subView || 1)));
    const changed = this.miraiSubView !== clamped;
    this.miraiSubView = clamped;
    if (this.mode !== 'mirai_2028') return;
    if (!changed && !immediateCamera) {
      this.setCameraPreset('iso', false);
      return;
    }
    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.v2Runtime.setSubView(clamped);
    this.v2Runtime.syncVisualState(null, null, this.hiddenPartIds, null, this.renderMode);
    this.updateClippingPlane();
    this.setCameraPreset('iso', immediateCamera);
    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public getOriginalSubView(): number {
    return this.originalSubView;
  }

  public setOriginalSubView(subView: number, immediateCamera = false): void {
    const clamped = Math.max(1, Math.round(subView || 1));
    const changed = this.originalSubView !== clamped;
    this.originalSubView = clamped;
    if (this.mode !== 'original') return;
    if (!changed && !immediateCamera) {
      this.setCameraPreset('iso', false);
      return;
    }
    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.v2Runtime.setSubView(clamped);
    this.v2Runtime.syncVisualState(null, null, this.hiddenPartIds, null, this.renderMode);
    this.updateClippingPlane();
    this.setCameraPreset('iso', immediateCamera);
    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public setMode(nextMode: ScaleMode, immediateCamera = false): void {
    if (this.mode === nextMode && this.initialActivated) return;
    this.mode = nextMode;
    if (nextMode === 'lens') {
      this.lensSection = 1;
    }

    this.selectedPartId = null;
    this.hoveredPartId = null;
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    this.pendingSelectAfterHydrate = null;

    this.updateClippingPlane();
    this.setCameraPreset('iso', immediateCamera);
    this.activateCurrentMode();

    this.callbacks.onSelectPart(null);
    this.callbacks.onHoverPart(null);
    this.callbacks.onVisibilityChanged();
  }

  public setExplode(value: number, immediate = false): void {
    this.targetExplode = THREE.MathUtils.clamp(value, 0, 1);
    if (immediate) {
      this.currentExplode = this.targetExplode;
      this.v2Runtime.syncExplode(this.currentExplode);
    }
    this.updateTightMaxDistance();
    this.markDirty();
  }

  public getExplode(): number {
    return this.targetExplode;
  }

  public setKineMode(enabled: boolean): boolean {
    const changed = this.v2Runtime.setKineMode(enabled);
    if (changed) this.markDirty(2);
    return changed;
  }

  public isKineMode(): boolean {
    return this.v2Runtime.isKineMode();
  }

  public getKineStats() {
    return this.v2Runtime.getKineStats();
  }

  public getCameraZoomBounds(): {
    minDistance: number;
    maxDistance: number;
    distance: number;
    near: number;
    far: number;
  } {
    return {
      minDistance: this.controls.minDistance,
      maxDistance: this.controls.maxDistance,
      distance: this.camera.position.distanceTo(this.controls.target),
      near: this.camera.near,
      far: this.camera.far,
    };
  }

  public setRenderMode(mode: RenderMode): void {
    this.renderMode = mode;
    this.applyVisibilityAndStyles();
  }

  public setQuality(quality: GraphicsQuality): void {
    if (this.quality === quality) return;
    this.quality = quality;
    if (this.initialActivated) {
      void this.v2Runtime.setQuality(quality, this.camera, this.sectionAxis !== 'off');
    }
    this.callbacks.onQualityChanged?.(quality);
    this.markDirty(2);
  }

  public getQuality(): GraphicsQuality {
    return this.quality;
  }

  public setSection(axis: SectionAxis, normalizedValue?: number): void {
    this.customClipPlaneActive = false;
    this.sectionAxis = axis;
    if (typeof normalizedValue === 'number') {
      this.sectionValue = THREE.MathUtils.clamp(normalizedValue, 0, 1);
    }
    this.updateClippingPlane();
  }

  public setArbitraryClipPlane(normal: [number, number, number], constant: number): void {
    this.customClipPlaneActive = true;
    this.sectionAxis = 'off';
    const len = Math.hypot(normal[0], normal[1], normal[2]) || 1;
    this.clippingPlane.normal.set(normal[0] / len, normal[1] / len, normal[2] / len);
    this.clippingPlane.constant = constant;
    this.v2Runtime.syncSectionPlane(true);
    this.markDirty();
  }

  public clearArbitraryClipPlane(): void {
    if (!this.customClipPlaneActive) return;
    this.customClipPlaneActive = false;
    this.updateClippingPlane();
  }

  public setStudioBackground(colorHex: number | null): void {
    this.v2Runtime.setBackground(colorHex);
    this.markDirty();
  }

  public stepPhysicsAtTime(sec: number): void {
    this.v2Runtime.stepPhysics(sec, 0.016);
    this.markDirty();
  }

  public setPhysicsActive(active: boolean): void {
    this.physicsActive = active;
    this.v2Runtime.syncPhysicsActive(active);
    if (this.v2Runtime.needsContinuousAnimation(active)) {
      this.markDirty();
    }
  }

  public selectPart(partId: string | null, _focusCamera = false): void {
    const metaOnly = this.isMetaOnlyActive();
    if (partId === null) {
      this.pendingSelectAfterHydrate = null;
    } else if (metaOnly) {
      const candidate = this.metaOnlyPartById.get(partId);
      if (!candidate) return;
      this.pendingSelectAfterHydrate = null;
    } else {
      const candidate = this.v2Runtime.getPartById(partId);
      if (!candidate) {
        if (!this.v2Runtime.isReady()) {
          this.pendingSelectAfterHydrate = { partId, focusCamera: false };
        }
        return;
      }
      if (this.v2Runtime.isPartCulledBySubView(partId)) return;
      this.pendingSelectAfterHydrate = null;
    }
    if (partId === this.selectedPartId) return;
    this.selectedPartId = partId;

    if (partId && this.hiddenPartIds.has(partId)) {
      this.hiddenPartIds.delete(partId);
    }
    if (partId && this.isolatedPartId && this.isolatedPartId !== partId) {
      this.isolatedPartId = partId;
    }

    if (!metaOnly) {
      this.applyVisibilityAndStyles();
    }
    const part = this.getSelectedPart();
    // Strict camera lock: opening/switching part details NEVER moves, pans, zooms, or rotates the camera!
    void _focusCamera;
    this.callbacks.onSelectPart(part);
    this.callbacks.onVisibilityChanged();
  }

  public setHoveredPartFromUI(partId: string | null): void {
    if (this.hoveredPartId === partId) return;
    this.hoveredPartId = partId;
    this.applyVisibilityAndStyles();
  }

  public setVisibleOnlyParts(partIds: string[] | null): void {
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    if (partIds && partIds.length > 0) {
      const allow = new Set(partIds);
      const allParts = this.v2Runtime.getAllBuiltParts();
      for (let i = 0; i < allParts.length; i++) {
        if (!allow.has(allParts[i].id)) {
          this.hiddenPartIds.add(allParts[i].id);
        }
      }
    }
    this.applyVisibilityAndStyles();
    this.callbacks.onVisibilityChanged();
  }

  public setHiddenParts(partIds: string[]): void {
    this.isolatedPartId = null;
    this.hiddenPartIds.clear();
    for (let i = 0; i < partIds.length; i++) {
      this.hiddenPartIds.add(partIds[i]);
    }
    this.applyVisibilityAndStyles();
    this.callbacks.onVisibilityChanged();
  }

  public setIsolatedPart(partId: string | null): void {
    this.isolatedPartId = partId;
    if (partId) {
      this.hiddenPartIds.delete(partId);
    }
    this.applyVisibilityAndStyles();
    this.callbacks.onVisibilityChanged();
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
    // Strict zero camera movement when stepping through parts / opening details!
    this.selectPart(list[nextIdx].id, false);
  }

  private updateTightMaxDistance(heroDistOverride?: number): void {
    if (typeof heroDistOverride === 'number' && heroDistOverride > 0) {
      this.baseHeroDist = heroDistOverride;
    }
    const e = Math.max(this.targetExplode, this.currentExplode);
    // Tighter max zoom-out envelope: ~1.88x of current unit hero distance (assembled ~165-540mm, exploded <= 1450mm)
    const explodeBoost = 1 + e * (this.mode === 'integrated' || this.mode === 'lens' ? 1.8 : 0.95);
    const estDist =
      typeof heroDistOverride === 'number' ? heroDistOverride : this.baseHeroDist * explodeBoost;
    this.controls.maxDistance = THREE.MathUtils.clamp(estDist * 1.88, 165, 1450);
    this.updateDynamicClipPlanes();
  }

  private updateDynamicClipPlanes(): void {
    const dist = Math.max(this.controls.minDistance, this.camera.position.distanceTo(this.controls.target));
    const targetNear = THREE.MathUtils.clamp(dist * 0.015, 0.025, 2.0);
    const targetFar = Math.max(dist * 14.0, this.controls.maxDistance * 2.8, 1200);
    const nearRel = Math.abs(targetNear - this.camera.near) / Math.max(0.01, this.camera.near);
    const farRel = Math.abs(targetFar - this.camera.far) / Math.max(1, this.camera.far);
    if (nearRel > 0.03 || farRel > 0.05) {
      this.camera.near = targetNear;
      this.camera.far = targetFar;
      this.camera.updateProjectionMatrix();
    }
  }

  public setCameraPreset(preset: CameraPreset, immediate = false): void {
    const e = this.targetExplode;
    let d: number;
    let target: THREE.Vector3;

    if (this.mode === 'welcome') {
      d = 228 + e * 142;
      target = new THREE.Vector3(0, 1.5, 0);
    } else if (this.mode === 'lens') {
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
      d = 174 + e * 635;
      target = new THREE.Vector3(14.0 - e * 4.0, -4.0 + e * 18.0, -32.0 - e * 14.0);
    } else if (this.mode === 'body') {
      d = 290 + e * 515;
      target = new THREE.Vector3(-6.0 + e * 14.0, 4.0 - e * 2.0, 0.0 + e * 12.0);
    } else if (this.mode === 'mount') {
      d = 188 + e * 515;
      target = new THREE.Vector3(2.0 + e * 8.0, -2.0 - e * 4.0, 25.0 + e * 38.0);
    } else if (this.mode === 'evf') {
      d = 140 + e * 380;
      target = new THREE.Vector3(1.5 * (1 - e) - e * 14.0, 38.6 + e * 1.5, -16.5 + e * 12.0);
    } else if (this.mode === 'mainboard') {
      d = 192 + e * 340;
      target = new THREE.Vector3(-18.0 * e, 0.0 + e * 2.0, -22.0 - e * 4.0);
    } else if (this.mode === 'shutter') {
      d = 194 + e * 565;
      target = new THREE.Vector3(6.0 + e * 14.0, -2.5 + e * 0.0, 14.0 + e * 14.0);
    } else if (this.mode === 'integrated') {
      d = 390 + e * 1290;
      target = new THREE.Vector3(-8.0 - e * 6.0, 6.0 + e * 10.0, 34.0 + e * 96.0);
    } else if (this.mode === 'sensor') {
      d = 168 + e * 475;
      target = new THREE.Vector3(10.0 * e, -2.0, -4.0 - e * 46.0);
    } else if (this.mode === 'battery') {
      d = 104 + e * 492;
      target = new THREE.Vector3(e * 4.0, e * -16.0, e * 2.0);
    } else if (this.mode === 'cfexpress') {
      d = 136 + e * 475;
      target = new THREE.Vector3(0.0, -0.8 + e * 1.5, e * 4.0);
    } else if (this.mode === 'bionz') {
      d = 122 + e * 245;
      target = new THREE.Vector3(0, -1.0 + e * 1.0, 0);
    } else if (this.mode === 'bionz_v2') {
      d = 142 + e * 320;
      target = new THREE.Vector3(0, -2.6 + e * 1.2, 0);
    } else if (this.mode === 'mirai_2028') {
      if (this.miraiSubView === 3) {
        // FH08: Cylindrical Ø68x28mm 50mm F1.4 Meta-Optics Pancake Lens (explodes along Z + Y)
        d = 202 + e * 136;
        target = new THREE.Vector3(0, e * 2.0, e * 2.0);
      } else if (this.miraiSubView === 4) {
        // FH32: Horizontal 66x48x9.6mm IP68 Ultrasonic MEMS Cooler (explodes along Y + rear duct)
        d = 148 + e * 168;
        target = new THREE.Vector3(e * 2.0, 0.2 + e * 5.0, -1.0 - e * 2.5);
      } else if (this.miraiSubView === 5) {
        // FH25: 48x38x46mm 30,000-nit True-RGB Tandem Pancake EVF (optical axis Z, right cutaway)
        d = 158 + e * 195;
        target = new THREE.Vector3(0, e * 3.0, 1.5 - e * 3.0);
      } else if (this.miraiSubView === 6) {
        // FH20: 42x42x6.4mm 2nm/A16 GAA + BSPDN 1,000 TOPS Heterogeneous Chiplet SoC (explodes along Y + optical fibers)
        d = 132 + e * 145;
        target = new THREE.Vector3(-1.5 + e * 2.0, 0.5 + e * 6.5, 0);
      } else if (this.miraiSubView === 7) {
        // FH17: 76x64x15.5mm Earth-Rotation + MagLev 10–11 Stop IBIS & ±2° Micro-Tilt (explodes along Z + IMU/Hall flanks)
        d = 215 + e * 185;
        target = new THREE.Vector3(-3.5, -1.5 * e, 0);
      } else if (this.miraiSubView === 8) {
        // FH48: 128x90x58mm Dec 2028 ~800g · 10–15W Post-Camera Integrated Flagship Machine
        d = 304 + e * 250;
        target = new THREE.Vector3(0, 6.0 + e * 4.0, 2.0);
      } else {
        d = 166 + e * 185;
        target = new THREE.Vector3(e * 3.0 + (1 - e) * 3.5, 0.2 + e * 2.5, e * 1.5);
      }
    } else if (this.mode === 'original') {
      // Original #01 RIIMOS E1: W216xH265xD130mm chassis + 390mm X-radial 4-leg stance (accounts for 0.70..0.86 hero lerp)
      d = 880 + e * 480;
      target = new THREE.Vector3(0, 128 + e * 10, 0);
    } else if (this.mode === 'micro_v2') {
      d = 114 + e * 270;
      target = new THREE.Vector3(0, -1.0 - e * 2.0, 0);
    } else if (this.mode === 'mishoe') {
      d = 114 + e * 165;
      target = new THREE.Vector3(0, -1.5 - e * 2.5, 2.5 + e * 4.0);
    } else if (this.mode === 'mic') {
      d = 94 + e * 336;
      target = new THREE.Vector3(0, 1.5 - e * 2.5, 0.5 + e * 1.5);
    } else if (this.mode === 'sensor_fab') {
      if (this.sensorFabVolume === 5) {
        d = 248 + e * 238;
        target = new THREE.Vector3(0, -1.0 + e * 1.5, 2.0);
      } else if (this.sensorFabVolume === 4) {
        d = 252 + e * 240;
        target = new THREE.Vector3(0, -1.5 + e * 1.5, 6.5);
      } else if (this.sensorFabVolume === 3) {
        d = 248 + e * 238;
        target = new THREE.Vector3(0, -1.5 + e * 1.5, 6.5);
      } else if (this.sensorFabVolume === 2) {
        d = 228 + e * 228;
        target = new THREE.Vector3(0, 2.0 + e * 1.5, 0.5);
      } else {
        d = 212 + e * 220;
        target = new THREE.Vector3(0, 1.5 + e * 2.5, -2.5);
      }
    } else if (this.mode === 'drybox') {
      d = 242 + e * 212;
      target = new THREE.Vector3(0, -3.5, -2.0 * e);
    } else {
      d = 96 + e * 235;
      target = new THREE.Vector3(20.0 * e, 1.5 * e, -3.0 - e * 16.0);
    }

    // Closer hero zoom-in on assembled startup (~0.70x) blending cleanly toward ~0.86x when fully exploded
    if (this.mode !== 'welcome') {
      d *= THREE.MathUtils.lerp(0.70, 0.86, e);
    }

    if (this.camera.aspect < 1.0) {
      const portraitCap = this.mode === 'welcome' ? 2.72 : 1.88;
      d *= Math.min(portraitCap, (this.mode === 'welcome' ? 1.24 : 0.92) / Math.max(this.camera.aspect, 0.44));
    }

    let offset: THREE.Vector3;
    if (this.mode === 'welcome') {
      switch (preset) {
        case 'front':
          offset = new THREE.Vector3(0, 2, d);
          break;
        case 'side':
          offset = new THREE.Vector3(-d * 0.96, d * 0.08, d * 0.24);
          break;
        case 'back':
          offset = new THREE.Vector3(d * 0.16, d * 0.12, -d * 0.98);
          break;
        case 'iso':
        default:
          offset = new THREE.Vector3(-d * 0.16, d * 0.13, d * 0.98);
          break;
      }
    } else if (this.mode === 'evf') {
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
          } else if (this.mode === 'bionz_v2') {
            offset = new THREE.Vector3(d * 0.62, d * 0.36, d * 0.68);
          } else if (this.mode === 'mirai_2028') {
            if (this.miraiSubView === 3) {
              // FH08 Lens: front-right 3/4 view when assembled, swinging wider along X when exploded to showcase full Z-axis stack
              const isoX = 0.56 + e * 0.28;
              const isoY = 0.32 - e * 0.08;
              const isoZ = 0.76 - e * 0.26;
              offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
            } else if (this.miraiSubView === 4) {
              // FH32 MEMS Cooler: crisp overhead 3/4 view revealing louvers, cutaway MEMS chip, copper impingement & isolation wall
              offset = new THREE.Vector3(d * 0.58, d * 0.42, d * 0.69);
            } else if (this.miraiSubView === 5) {
              // FH25 Pancake EVF: wider +X 3/4 angle peering directly into right cutaway (45° mirror, pancake optics & True-RGB die!)
              const isoX = 0.68 + e * 0.14;
              const isoY = 0.30 - e * 0.06;
              const isoZ = 0.66 - e * 0.16;
              offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
            } else if (this.miraiSubView === 6) {
              // FH20 2nm Chiplet SoC: overhead front-right 3/4 peering directly into cutaway IHS (NPU, BSPDN, HBM & optical fibers!)
              offset = new THREE.Vector3(d * 0.58, d * 0.44, d * 0.68);
            } else if (this.miraiSubView === 7) {
              // FH17 MagLev IBIS: front 3/4 when assembled, swinging wider along X when exploded to showcase full Z gimbal stack
              const isoX = 0.54 + e * 0.24;
              const isoY = 0.26 - e * 0.04;
              const isoZ = 0.80 - e * 0.22;
              offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
            } else if (this.miraiSubView === 8) {
              // FH48 Post-Camera Flagship: classic mirrorless front-right 3/4 showcasing contactless mount, lattice cutaway, EVF & grip
              const isoX = 0.55 + e * 0.16;
              const isoY = 0.30 - e * 0.04;
              const isoZ = 0.78 - e * 0.14;
              offset = new THREE.Vector3(d * isoX, d * isoY, d * isoZ);
            } else {
              offset = new THREE.Vector3(d * 0.56, d * 0.44, d * 0.70);
            }
          } else if (this.mode === 'original') {
            // RIIMOS E1: elevated front-right 3/4 hero angle revealing red battery, black L-mag, 4 front muzzles, camera dome & X-legs
            offset = new THREE.Vector3(d * 0.54, d * 0.46, d * 0.70);
          } else if (this.mode === 'micro_v2') {
            offset = new THREE.Vector3(d * 0.64, d * 0.34, d * 0.68);
          } else if (this.mode === 'mishoe') {
            offset = new THREE.Vector3(d * 0.58, d * 0.42, d * 0.70);
          } else if (this.mode === 'mic') {
            offset = new THREE.Vector3(-d * 0.50, d * 0.36, d * 0.78);
          } else if (this.mode === 'sensor_fab') {
            offset = new THREE.Vector3(d * 0.38, d * 0.44, d * 0.81);
          } else if (this.mode === 'drybox') {
            offset = new THREE.Vector3(d * 0.56, d * 0.24, d * 0.79);
          } else {
            offset = new THREE.Vector3(d * 0.68, d * 0.44, d * 0.66);
          }
          break;
      }
    }

    const pos = target.clone().add(offset);
    this.updateTightMaxDistance(d);

    if (immediate) {
      this.camAnimActive = false;
      this.camera.up.copy(_worldUp);
      this.camera.position.copy(pos);
      this.controls.target.copy(target);
      this.controls.update();
      this.updateDynamicClipPlanes();
      this.prevCamPos.copy(this.camera.position);
      this.prevCamQuat.copy(this.camera.quaternion);
      this.prevCamInitialized = true;
      this.wheelMotionFrames = 0;
      this.fastStageCooldown = 0;
      this.v2Runtime.setMotionStage(this.quality === 'standard_lite' ? 'lite' : 'ultra');
      this.markDirty();
    } else {
      this.animateCameraTo(pos, target);
    }
  }

  public resetCameraUpAndFov(fov = 32): void {
    this.camera.up.copy(_worldUp);
    if (Math.abs(this.camera.fov - fov) > 1e-4) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
  }

  private commitCameraImmediate(
    pos: THREE.Vector3,
    target: THREE.Vector3,
    up?: THREE.Vector3,
    fov?: number,
    rollDeg?: number
  ): void {
    this.camAnimActive = false;
    this.wheelMotionFrames = 0;
    this.camera.position.copy(pos);
    this.controls.target.copy(target);
    if (typeof fov === 'number' && Number.isFinite(fov)) {
      this.camera.fov = THREE.MathUtils.clamp(fov, 5, 120);
      this.camera.updateProjectionMatrix();
    }
    if (up) {
      this.camera.up.copy(up).normalize();
    } else {
      this.camera.up.copy(_worldUp);
    }
    _camDir.subVectors(target, pos);
    if (_camDir.lengthSq() > 1e-8) {
      _camDir.normalize();
      // Guard against collinearity with up vector for exact top/bottom views
      if (Math.abs(_camDir.dot(this.camera.up)) > 0.999) {
        this.camera.up.set(0, 0, _camDir.y < 0 ? -1 : 1);
      }
      if (typeof rollDeg === 'number' && Math.abs(rollDeg) > 1e-4) {
        _rollQuat.setFromAxisAngle(_camDir, THREE.MathUtils.degToRad(rollDeg));
        this.camera.up.applyQuaternion(_rollQuat).normalize();
      }
    }
    this.camera.lookAt(target);
    this.camera.updateMatrixWorld(true);
    this.prevCamPos.copy(this.camera.position);
    this.prevCamQuat.copy(this.camera.quaternion);
    this.prevCamInitialized = true;
    this.v2Runtime.setUltraMotionProxyActive(false);
    this.markDirty();
  }

  /**
   * Extended 12-Preset Studio Camera System for `pp1.1`:
   *   iso | front | side | back | top | bottom | left | right | iso_back | iso_top | iso_low | hero_macro
   */
  public setExtendedCameraPreset(preset: ExtendedCameraPreset, immediate = true): void {
    if (preset === 'iso' || preset === 'front' || preset === 'side' || preset === 'back') {
      this.setCameraPreset(preset, immediate);
      return;
    }
    // Derive exact baseline framing distance & target from canonical 'iso' preset
    this.setCameraPreset('iso', true);
    const target = this.controls.target.clone();
    const dist = Math.max(10, this.camera.position.distanceTo(target));
    const dir = new THREE.Vector3();
    let distScale = 1.0;

    switch (preset) {
      case 'top':
        dir.set(0, 0.999, 0.044);
        break;
      case 'bottom':
        dir.set(0, -0.999, 0.044);
        break;
      case 'left':
        dir.set(-1, 0.06, 0);
        break;
      case 'right':
        dir.set(1, 0.06, 0);
        break;
      case 'iso_back':
        dir.set(-0.62, 0.28, -0.73);
        break;
      case 'iso_top':
        dir.set(0.46, 0.72, 0.52);
        break;
      case 'iso_low':
        dir.set(-0.58, -0.14, 0.80);
        break;
      case 'hero_macro':
        dir.set(-0.48, 0.16, 0.86);
        distScale = 0.58;
        break;
    }
    dir.normalize().multiplyScalar(dist * distScale);
    const nextPos = target.clone().add(dir);
    if (immediate) {
      this.commitCameraImmediate(nextPos, target);
    } else {
      this.animateCameraTo(nextPos, target);
    }
  }

  /**
   * Spherical & Relative Orbit Camera Rig (`pp1.1` Free-Form Camera Work):
   * - `azimuthDeg`: horizontal orbit angle in degrees (0° = +Z front, +90° = +X right, -90° = -X left, 180° = -Z back)
   * - `elevationDeg`: vertical elevation angle in degrees (-89° bottom .. 0° horizon .. +89° top)
   * - `dAzimuthDeg` / `dElevationDeg`: incremental offset from current camera pose
   * - `distance` / `zoom`: exact radial distance or multiplicative zoom (`>1` zooms in closer, `<1` pulls back)
   * - `target` / `panX` / `panY`: target override and screen-space pan in mm
   * - `fov` / `rollDeg`: vertical FOV in degrees (e.g. 18° telephoto .. 65° wide) and optical-axis roll
   */
  public setCameraSpherical(opts: {
    azimuthDeg?: number;
    elevationDeg?: number;
    distance?: number;
    zoom?: number;
    dAzimuthDeg?: number;
    dElevationDeg?: number;
    target?: [number, number, number];
    panX?: number;
    panY?: number;
    fov?: number;
    rollDeg?: number;
  }): void {
    const target = opts.target
      ? new THREE.Vector3(opts.target[0], opts.target[1], opts.target[2])
      : this.controls.target.clone();
    const rel = this.camera.position.clone().sub(this.controls.target);
    let dist = Math.max(1e-3, rel.length());
    let az = Math.atan2(rel.x, rel.z);
    let el = Math.asin(THREE.MathUtils.clamp(rel.y / dist, -0.9999, 0.9999));

    if (typeof opts.azimuthDeg === 'number' && Number.isFinite(opts.azimuthDeg)) {
      az = THREE.MathUtils.degToRad(opts.azimuthDeg);
    }
    if (typeof opts.elevationDeg === 'number' && Number.isFinite(opts.elevationDeg)) {
      el = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(opts.elevationDeg, -89.5, 89.5));
    }
    if (typeof opts.dAzimuthDeg === 'number' && Number.isFinite(opts.dAzimuthDeg)) {
      az += THREE.MathUtils.degToRad(opts.dAzimuthDeg);
    }
    if (typeof opts.dElevationDeg === 'number' && Number.isFinite(opts.dElevationDeg)) {
      el = THREE.MathUtils.clamp(
        el + THREE.MathUtils.degToRad(opts.dElevationDeg),
        THREE.MathUtils.degToRad(-89.5),
        THREE.MathUtils.degToRad(89.5)
      );
    }
    if (typeof opts.distance === 'number' && Number.isFinite(opts.distance) && opts.distance > 0) {
      dist = opts.distance;
    }
    if (typeof opts.zoom === 'number' && Number.isFinite(opts.zoom) && opts.zoom > 0) {
      dist = dist / opts.zoom;
    }
    dist = THREE.MathUtils.clamp(dist, 1.5, 3800);

    const cosEl = Math.cos(el);
    const offset = new THREE.Vector3(
      dist * cosEl * Math.sin(az),
      dist * Math.sin(el),
      dist * cosEl * Math.cos(az)
    );

    // Optional screen-space pan (panX right, panY up in mm)
    if (
      (typeof opts.panX === 'number' && opts.panX !== 0) ||
      (typeof opts.panY === 'number' && opts.panY !== 0)
    ) {
      _camDir.copy(offset).negate().normalize();
      _camRight.crossVectors(_camDir, _worldUp);
      if (_camRight.lengthSq() < 1e-6) _camRight.set(1, 0, 0);
      else _camRight.normalize();
      _camUp.crossVectors(_camRight, _camDir).normalize();
      if (opts.panX) target.addScaledVector(_camRight, opts.panX);
      if (opts.panY) target.addScaledVector(_camUp, opts.panY);
    }

    const pos = target.clone().add(offset);
    this.commitCameraImmediate(pos, target, undefined, opts.fov, opts.rollDeg);
  }

  /**
   * Direct 6-DoF World-Space Camera Pose (`--cam-pos`, `--cam-target`, `--cam-up`, `--fov`, `--roll`).
   */
  public setCameraPose(opts: {
    position: [number, number, number];
    target: [number, number, number];
    up?: [number, number, number];
    fov?: number;
    rollDeg?: number;
  }): void {
    const pos = new THREE.Vector3(opts.position[0], opts.position[1], opts.position[2]);
    const target = new THREE.Vector3(opts.target[0], opts.target[1], opts.target[2]);
    const up = opts.up ? new THREE.Vector3(opts.up[0], opts.up[1], opts.up[2]) : undefined;
    this.commitCameraImmediate(pos, target, up, opts.fov, opts.rollDeg);
  }

  /**
   * Exact Analytical Multi-Part Bounding-Box Perspective Auto-Fit (`--fit-part`, `--fit-parts`, `--fit-pad`).
   * Computes exact union AABB of requested part IDs (or whole active unit if empty), projects along the
   * chosen viewing direction, and frames the bounding sphere tightly with configurable margin padding.
   */
  public focusOnParts(
    partIds: string[],
    opts?: {
      preset?: ExtendedCameraPreset;
      azimuthDeg?: number;
      elevationDeg?: number;
      padding?: number;
      fov?: number;
      zoom?: number;
      rollDeg?: number;
    }
  ): boolean {
    _fitBox.makeEmpty();
    let matched = 0;
    if (partIds.length > 0) {
      for (let i = 0; i < partIds.length; i++) {
        if (this.v2Runtime.getPartWorldBox(partIds[i], _fitPartBox)) {
          _fitBox.union(_fitPartBox);
          matched++;
        }
      }
    }
    if (matched === 0) {
      if (!this.v2Runtime.getUnitWorldBox(_fitBox)) {
        return false;
      }
    }

    if (opts?.preset) {
      this.setExtendedCameraPreset(opts.preset, true);
    }
    if (typeof opts?.fov === 'number' && Number.isFinite(opts.fov)) {
      this.camera.fov = THREE.MathUtils.clamp(opts.fov, 5, 120);
      this.camera.updateProjectionMatrix();
    }

    _fitBox.getCenter(_fitCenter);
    _fitBox.getSize(_fitSize);

    // Compute viewing direction from explicit spherical angles or current camera vector
    const viewDir = new THREE.Vector3();
    if (typeof opts?.azimuthDeg === 'number' || typeof opts?.elevationDeg === 'number') {
      const rel = this.camera.position.clone().sub(this.controls.target);
      const rLen = Math.max(1e-3, rel.length());
      const az =
        typeof opts.azimuthDeg === 'number'
          ? THREE.MathUtils.degToRad(opts.azimuthDeg)
          : Math.atan2(rel.x, rel.z);
      const el =
        typeof opts.elevationDeg === 'number'
          ? THREE.MathUtils.degToRad(THREE.MathUtils.clamp(opts.elevationDeg, -89.5, 89.5))
          : Math.asin(THREE.MathUtils.clamp(rel.y / rLen, -0.9999, 0.9999));
      const cosEl = Math.cos(el);
      viewDir.set(cosEl * Math.sin(az), Math.sin(el), cosEl * Math.cos(az)).normalize();
    } else {
      viewDir.subVectors(this.camera.position, this.controls.target);
      if (viewDir.lengthSq() < 1e-6) viewDir.set(-0.55, 0.28, 0.78);
      viewDir.normalize();
    }

    // Exact projected extents onto camera right/up/forward basis for tight non-spherical framing
    _camDir.copy(viewDir).negate();
    _camRight.crossVectors(_camDir, _worldUp);
    if (_camRight.lengthSq() < 1e-6) _camRight.set(1, 0, 0);
    else _camRight.normalize();
    _camUp.crossVectors(_camRight, _camDir).normalize();

    const hx = _fitSize.x * 0.5;
    const hy = _fitSize.y * 0.5;
    const hz = _fitSize.z * 0.5;
    const projHalfW =
      Math.abs(_camRight.x) * hx + Math.abs(_camRight.y) * hy + Math.abs(_camRight.z) * hz;
    const projHalfH =
      Math.abs(_camUp.x) * hx + Math.abs(_camUp.y) * hy + Math.abs(_camUp.z) * hz;
    const projHalfD =
      Math.abs(_camDir.x) * hx + Math.abs(_camDir.y) * hy + Math.abs(_camDir.z) * hz;

    const vFovRad = THREE.MathUtils.degToRad(this.camera.fov);
    const tanHalfV = Math.max(0.05, Math.tan(vFovRad * 0.5));
    const tanHalfH = tanHalfV * Math.max(0.25, this.camera.aspect);
    const pad = typeof opts?.padding === 'number' && opts.padding > 0 ? opts.padding : 1.18;

    let dist = Math.max(projHalfH / tanHalfV, projHalfW / tanHalfH) * pad + projHalfD * 0.92;
    if (typeof opts?.zoom === 'number' && opts.zoom > 0) {
      dist = dist / opts.zoom;
    }
    dist = THREE.MathUtils.clamp(dist, 4.0, 3600);

    const nextPos = _fitCenter.clone().addScaledVector(viewDir, dist);
    this.commitCameraImmediate(nextPos, _fitCenter.clone(), undefined, opts?.fov, opts?.rollDeg);
    return true;
  }

  public getCameraState(): {
    position: [number, number, number];
    target: [number, number, number];
    up: [number, number, number];
    fov: number;
    azimuthDeg: number;
    elevationDeg: number;
    distance: number;
  } {
    const p = this.camera.position;
    const t = this.controls.target;
    const u = this.camera.up;
    const dx = p.x - t.x;
    const dy = p.y - t.y;
    const dz = p.z - t.z;
    const dist = Math.max(1e-6, Math.hypot(dx, dy, dz));
    const azDeg = THREE.MathUtils.radToDeg(Math.atan2(dx, dz));
    const elDeg = THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(dy / dist, -1, 1)));
    return {
      position: [Number(p.x.toFixed(3)), Number(p.y.toFixed(3)), Number(p.z.toFixed(3))],
      target: [Number(t.x.toFixed(3)), Number(t.y.toFixed(3)), Number(t.z.toFixed(3))],
      up: [Number(u.x.toFixed(4)), Number(u.y.toFixed(4)), Number(u.z.toFixed(4))],
      fov: Number(this.camera.fov.toFixed(2)),
      azimuthDeg: Number(azDeg.toFixed(2)),
      elevationDeg: Number(elDeg.toFixed(2)),
      distance: Number(dist.toFixed(3)),
    };
  }

  public getUnitWorldBoxTuple(): {
    min: [number, number, number];
    max: [number, number, number];
    center: [number, number, number];
    size: [number, number, number];
  } | null {
    if (!this.v2Runtime.getUnitWorldBox(_fitBox)) return null;
    _fitBox.getCenter(_fitCenter);
    _fitBox.getSize(_fitSize);
    return {
      min: [Number(_fitBox.min.x.toFixed(2)), Number(_fitBox.min.y.toFixed(2)), Number(_fitBox.min.z.toFixed(2))],
      max: [Number(_fitBox.max.x.toFixed(2)), Number(_fitBox.max.y.toFixed(2)), Number(_fitBox.max.z.toFixed(2))],
      center: [Number(_fitCenter.x.toFixed(2)), Number(_fitCenter.y.toFixed(2)), Number(_fitCenter.z.toFixed(2))],
      size: [Number(_fitSize.x.toFixed(2)), Number(_fitSize.y.toFixed(2)), Number(_fitSize.z.toFixed(2))],
    };
  }

  /**
   * Project visible part centers onto 2D viewport pixel coordinates for `--annotate` callout pins.
   */
  public getPartScreenAnnotations(
    maxLabels = 12
  ): Array<{ id: string; title: string; x: number; y: number; color: string }> {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    const parts = this.getPartsForCurrentMode();
    const candidates: Array<{ id: string; title: string; x: number; y: number; color: string; vol: number }> = [];

    this.camera.updateMatrixWorld(true);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (this.isPartHidden(part.id)) continue;
      if (!this.v2Runtime.getPartWorldBox(part.id, _fitPartBox)) continue;
      _fitPartBox.getCenter(_camProj);
      _fitPartBox.getSize(_fitSize);
      const vol = Math.max(0.01, _fitSize.x * _fitSize.y * _fitSize.z);
      _camProj.project(this.camera);
      if (_camProj.z < -1 || _camProj.z > 1) continue;
      const sx = (_camProj.x * 0.5 + 0.5) * w;
      const sy = (-_camProj.y * 0.5 + 0.5) * h;
      if (sx < 16 || sx > w - 16 || sy < 16 || sy > h - 16) continue;
      candidates.push({
        id: part.id,
        title: part.explanation?.title || part.id,
        x: Math.round(sx),
        y: Math.round(sy),
        color: part.swatchColor || '#0ea5e9',
        vol,
      });
    }
    // Sort by largest physical volume & spread out so labels don't overlap
    candidates.sort((a, b) => b.vol - a.vol);
    const picked: Array<{ id: string; title: string; x: number; y: number; color: string }> = [];
    for (let i = 0; i < candidates.length && picked.length < maxLabels; i++) {
      const c = candidates[i];
      let tooClose = false;
      for (let j = 0; j < picked.length; j++) {
        if (Math.hypot(c.x - picked[j].x, c.y - picked[j].y) < 64) {
          tooClose = true;
          break;
        }
      }
      if (!tooClose) {
        picked.push({ id: c.id, title: c.title, x: c.x, y: c.y, color: c.color });
      }
    }
    return picked;
  }

  /** Smoothly frame thematic sculptural zones inside Sensor Manufacturing Process (Vol.0–Vol.4) */
  public focusSensorFabStage(stage: SensorFabStage, immediate = false): void {
    if (this.mode !== 'sensor_fab') return;
    if (
      stage === 'overview' ||
      stage === 'v1_overview' ||
      stage === 'v2_overview' ||
      stage === 'v3_overview' ||
      stage === 'v4_overview' ||
      stage === 'v5_overview'
    ) {
      this.setCameraPreset('iso', immediate);
      return;
    }

    const e = this.targetExplode;
    const aspectScale =
      this.camera.aspect < 1.0 ? Math.min(2.05, 1.04 / Math.max(this.camera.aspect, 0.48)) : 1.0;

    let target: THREE.Vector3;
    let offset: THREE.Vector3;
    if (stage === 'phases') {
      const d = (155 + e * 145) * aspectScale;
      target = new THREE.Vector3(0, 2.2 + e * 12.0, 2.5 + e * 5.0);
      offset = new THREE.Vector3(d * 0.14, d * 0.46, d * 0.88);
    } else if (stage === 'litho') {
      const d = (138 + e * 135) * aspectScale;
      target = new THREE.Vector3(0, -11.5 - e * 26.0, 2.0);
      offset = new THREE.Vector3(d * 0.22, d * 0.34, d * 0.91);
    } else if (stage === 'variants') {
      const d = (104 + e * 85) * aspectScale;
      target = new THREE.Vector3(10.0 + e * 8.0, 3.6 + e * 18.0, -24.0 - e * 24.0);
      offset = new THREE.Vector3(d * 0.16, d * 0.34, d * 0.92);
    } else if (stage === 'v1_photonics') {
      const d = (118 + e * 110) * aspectScale;
      target = new THREE.Vector3(-19.0 - e * 14.0, 2.8 + e * 12.0, 9.5 + e * 14.0);
      offset = new THREE.Vector3(d * 0.16, d * 0.42, d * 0.89);
    } else if (stage === 'v1_archs') {
      const d = (122 + e * 95) * aspectScale;
      target = new THREE.Vector3(2.0, 3.6 + e * 16.0, -20.0 - e * 22.0);
      offset = new THREE.Vector3(d * 0.12, d * 0.34, d * 0.93);
    } else if (stage === 'v1_duel') {
      const d = (128 + e * 110) * aspectScale;
      target = new THREE.Vector3(7.0 + e * 8.0, 2.6 + e * 14.0, 4.0 + e * 8.0);
      offset = new THREE.Vector3(d * 0.14, d * 0.42, d * 0.89);
    } else if (stage === 'v1_wall') {
      const d = (146 + e * 125) * aspectScale;
      target = new THREE.Vector3(8.0 + e * 6.0, -8.5 - e * 18.0, 9.0 + e * 12.0);
      offset = new THREE.Vector3(d * 0.18, d * 0.34, d * 0.92);
    } else if (stage === 'v2_refine') {
      const d = (138 + e * 105) * aspectScale;
      target = new THREE.Vector3(0, 4.2 + e * 10.0, -21.5 - e * 14.0);
      offset = new THREE.Vector3(d * 0.14, d * 0.34, d * 0.93);
    } else if (stage === 'v2_mcz') {
      const d = (118 + e * 98) * aspectScale;
      target = new THREE.Vector3(-22.0 - e * 6.0, 4.8 + e * 11.0, -2.0 - e * 2.0);
      offset = new THREE.Vector3(d * 0.16, d * 0.34, d * 0.93);
    } else if (stage === 'v2_wafer') {
      const d = (138 + e * 110) * aspectScale;
      target = new THREE.Vector3(-4.0 - e * 4.0, 3.2 + e * 10.0, 10.0 + e * 8.0);
      offset = new THREE.Vector3(d * 0.15, d * 0.38, d * 0.91);
    } else if (stage === 'v2_epi_ship') {
      const d = (150 + e * 120) * aspectScale;
      target = new THREE.Vector3(14.0 + e * 5.0, -4.5 - e * 4.0, 14.0 + e * 12.0);
      offset = new THREE.Vector3(d * 0.16, d * 0.32, d * 0.93);
    } else if (stage === 'v3_tcad') {
      const d = (136 + e * 105) * aspectScale;
      target = new THREE.Vector3(0, 3.5 + e * 14.0, -29.0 - e * 16.0);
      offset = new THREE.Vector3(d * 0.14, d * 0.36, d * 0.92);
    } else if (stage === 'v3_layout') {
      const d = (140 + e * 108) * aspectScale;
      target = new THREE.Vector3(0, 3.0 + e * 11.0, -12.0 - e * 3.0);
      offset = new THREE.Vector3(d * 0.15, d * 0.38, d * 0.91);
    } else if (stage === 'v3_opc') {
      const d = (136 + e * 105) * aspectScale;
      target = new THREE.Vector3(0, 3.2 + e * 8.0, 5.0 + e * 14.0);
      offset = new THREE.Vector3(d * 0.16, d * 0.36, d * 0.92);
    } else if (stage === 'v3_maskfab') {
      const d = (158 + e * 128) * aspectScale;
      target = new THREE.Vector3(0, -6.2 - e * 18.0, 33.5 + e * 14.0);
      offset = new THREE.Vector3(d * 0.18, d * 0.34, d * 0.92);
    } else if (stage === 'v4_sti_dti') {
      const d = (142 + e * 108) * aspectScale;
      target = new THREE.Vector3(0, 3.6 + e * 15.0, -29.0 - e * 16.0);
      offset = new THREE.Vector3(d * 0.14, d * 0.36, d * 0.92);
    } else if (stage === 'v4_ppd_mev') {
      const d = (146 + e * 112) * aspectScale;
      target = new THREE.Vector3(0, 3.4 + e * 12.0, -12.0 - e * 3.0);
      offset = new THREE.Vector3(d * 0.15, d * 0.38, d * 0.91);
    } else if (stage === 'v4_vtg_gate') {
      const d = (138 + e * 105) * aspectScale;
      target = new THREE.Vector3(0, 3.4 + e * 10.0, 5.0 + e * 14.0);
      offset = new THREE.Vector3(d * 0.16, d * 0.36, d * 0.92);
    } else if (stage === 'v4_pin_sab') {
      const d = (158 + e * 125) * aspectScale;
      target = new THREE.Vector3(0, -6.5 - e * 11.0, 33.5 + e * 14.0);
      offset = new THREE.Vector3(d * 0.18, d * 0.34, d * 0.92);
    } else if (stage === 'v5_w_m1') {
      const d = (142 + e * 108) * aspectScale;
      target = new THREE.Vector3(0, 3.6 + e * 14.0, -29.0 - e * 15.0);
      offset = new THREE.Vector3(d * 0.14, d * 0.36, d * 0.92);
    } else if (stage === 'v5_m2_m4') {
      const d = (146 + e * 112) * aspectScale;
      target = new THREE.Vector3(0, 3.4 + e * 11.0, -12.0 - e * 3.0);
      offset = new THREE.Vector3(d * 0.15, d * 0.38, d * 0.91);
    } else if (stage === 'v5_m5_wat') {
      const d = (138 + e * 105) * aspectScale;
      target = new THREE.Vector3(0, 3.4 + e * 9.0, 5.0 + e * 12.0);
      offset = new THREE.Vector3(d * 0.16, d * 0.36, d * 0.92);
    } else {
      const d = (144 + e * 112) * aspectScale;
      target = new THREE.Vector3(0, -6.5 - e * 10.0, 29.0 + e * 14.0);
      offset = new THREE.Vector3(d * 0.18, d * 0.34, d * 0.92);
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

  public focusOnPart(part: CadPart): void {
    if (!this.v2Runtime.getPartWorldBox(part.id, _focusBox)) {
      _focusBox.setFromObject(part.group);
    }
    _focusBox.getCenter(_focusCenter);

    _focusOffset.subVectors(this.camera.position, this.controls.target);
    const isMicro =
      this.mode === 'micro' ||
      this.mode === 'micro_v2' ||
      this.mode === 'bionz' ||
      this.mode === 'bionz_v2' ||
      this.mode === 'mirai_2028' ||
      this.mode === 'mishoe' ||
      this.mode === 'mic';
    const isCompactStandalone = this.mode === 'battery' || this.mode === 'cfexpress';
    const isSensorFab = this.mode === 'sensor_fab';
    const isDrybox = this.mode === 'drybox';
    const maxDist = isMicro
      ? 72
      : isSensorFab
        ? 68
        : isDrybox
          ? 148
          : isCompactStandalone
            ? 98
            : this.mode === 'evf'
              ? 112
              : this.mode === 'integrated' || this.mode === 'camera_body'
                ? 280
                : 168;
    const minDist = isMicro
      ? 34
      : isSensorFab
        ? 28
        : isDrybox
          ? 48
          : isCompactStandalone
            ? 38
            : this.mode === 'evf'
              ? 44
              : 56;
    const desiredDist = Math.min(_focusOffset.length(), maxDist);
    _focusOffset.setLength(Math.max(desiredDist, minDist));

    const nextPos = _focusCenter.clone().add(_focusOffset);
    this.animateCameraTo(nextPos, _focusCenter.clone());
  }

  private wakeLoop(): void {
    this.idleFrameStreak = 0;
    if (
      this.rafId === 0 &&
      !this.captureControlled &&
      !this.disposed &&
      !this.contextLost &&
      !this.pageHidden
    ) {
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
    this.markDirty(2);
  }

  public frameLensForOpticsStudio(immediate = false): void {
    const target = new THREE.Vector3(0, -36, 74);
    const pos = new THREE.Vector3(-348, 56, 178);
    this.refreshVisibility();
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
    this.v2Runtime.handleResize();
    this.cachedDomRect = this.renderer.domElement.getBoundingClientRect();
    this.markDirty();
  }

  private updateClippingPlane(): void {
    if (this.customClipPlaneActive) {
      this.v2Runtime.syncSectionPlane(true);
      this.markDirty();
      return;
    }
    if (this.sectionAxis === 'off') {
      this.clippingPlane.normal.set(-1, 0, 0);
      this.clippingPlane.constant = 10000;
      this.v2Runtime.syncSectionPlane(false);
      this.markDirty();
      return;
    }

    let minCoord = -48;
    let maxCoord = 48;
    if (this.mode === 'micro') {
      minCoord = -13;
      maxCoord = 13;
    } else if (this.mode === 'micro_v2') {
      minCoord = -16;
      maxCoord = 16;
    } else if (this.mode === 'battery' || this.mode === 'cfexpress') {
      minCoord = -30;
      maxCoord = 30;
    } else if (this.mode === 'bionz') {
      if (this.sectionAxis === 'x') {
        minCoord = -48;
        maxCoord = 48;
      } else {
        minCoord = -16;
        maxCoord = 18;
      }
    } else if (this.mode === 'bionz_v2') {
      if (this.sectionAxis === 'x') {
        minCoord = -24;
        maxCoord = 24;
      } else {
        minCoord = -26;
        maxCoord = 22;
      }
    } else if (this.mode === 'mirai_2028') {
      if (this.miraiSubView === 3) {
        minCoord = -38;
        maxCoord = 38;
      } else if (this.miraiSubView === 4) {
        if (this.sectionAxis === 'x') {
          minCoord = -38;
          maxCoord = 38;
        } else {
          minCoord = -10;
          maxCoord = 12;
        }
      } else if (this.miraiSubView === 5) {
        if (this.sectionAxis === 'x') {
          minCoord = -28;
          maxCoord = 28;
        } else {
          minCoord = -22;
          maxCoord = 22;
        }
      } else if (this.miraiSubView === 6) {
        if (this.sectionAxis === 'x') {
          minCoord = -34;
          maxCoord = 34;
        } else {
          minCoord = -10;
          maxCoord = 12;
        }
      } else if (this.miraiSubView === 7) {
        if (this.sectionAxis === 'x') {
          minCoord = -52;
          maxCoord = 46;
        } else {
          minCoord = -38;
          maxCoord = 38;
        }
      } else if (this.miraiSubView === 8) {
        if (this.sectionAxis === 'x') {
          minCoord = -68;
          maxCoord = 68;
        } else {
          minCoord = -46;
          maxCoord = 62;
        }
      } else if (this.sectionAxis === 'x') {
        minCoord = -46;
        maxCoord = 46;
      } else {
        minCoord = -34;
        maxCoord = 42;
      }
    } else if (this.mode === 'original') {
      if (this.sectionAxis === 'x') {
        minCoord = -195;
        maxCoord = 195;
      } else {
        minCoord = 0;
        maxCoord = 270;
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
    } else if (this.mode === 'sensor_fab') {
      if (this.sectionAxis === 'x') {
        minCoord = -54;
        maxCoord = 54;
      } else {
        minCoord = -18;
        maxCoord = 24;
      }
    } else if (this.mode === 'drybox') {
      if (this.sectionAxis === 'x') {
        minCoord = -30;
        maxCoord = 30;
      } else {
        minCoord = -55;
        maxCoord = 55;
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
        minCoord = -50;
        maxCoord = 50;
      } else {
        minCoord = -44;
        maxCoord = 46;
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
    this.v2Runtime.syncSectionPlane(true);
    this.markDirty();
  }

  private applyVisibilityAndStyles(): void {
    this.v2Runtime.syncVisualState(
      this.selectedPartId,
      this.hoveredPartId,
      this.hiddenPartIds,
      this.isolatedPartId,
      this.renderMode
    );
    this.markDirty(2);
  }

  private bindEvents(): void {
    const dom = this.renderer.domElement;
    this.cachedDomRect = dom.getBoundingClientRect();

    this.controls.addEventListener('start', () => {
      this.v2Runtime.setCameraDragging(true);
      this.wakeLoop();
    });

    this.controls.addEventListener('end', () => {
      this.v2Runtime.setCameraDragging(false);
      this.markDirty(2);
    });

    dom.addEventListener('pointerdown', (e) => {
      if (this.customSceneRenderer) return;
      this.pointerDownPos.set(e.clientX, e.clientY);
      this.camAnimActive = false;
      this.markDirty();
    });

    dom.addEventListener('pointermove', (e) => {
      if (this.customSceneRenderer) return;
      if (e.pointerType === 'touch') return;
      const rect = this.cachedDomRect ?? (this.cachedDomRect = dom.getBoundingClientRect());
      if (rect.width <= 0 || rect.height <= 0) return;
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.hoverRaycastPending = true;
      this.wakeLoop();
    });

    dom.addEventListener('pointerleave', () => {
      if (this.customSceneRenderer) return;
      this.hoverRaycastPending = false;
      if (this.hoveredPartId !== null) {
        this.hoveredPartId = null;
        this.container.classList.remove('is-hovering');
        this.applyVisibilityAndStyles();
        this.callbacks.onHoverPart(null);
      }
    });

    dom.addEventListener('pointerup', (e) => {
      if (this.customSceneRenderer) return;
      const dist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
      if (dist > 5) return;

      const rect = this.cachedDomRect ?? (this.cachedDomRect = dom.getBoundingClientRect());
      if (rect.width <= 0 || rect.height <= 0) return;
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const hitPartId = this.v2Runtime.pickClick(
        this.pointer,
        this.camera,
        (partId) => this.isPartHidden(partId),
        this.sectionAxis !== 'off' ? this.clippingPlane : null
      );
      if (hitPartId) {
        // Strict zero camera movement when selecting a part / opening its detail view!
        this.selectPart(hitPartId, false);
      } else if (this.selectedPartId) {
        this.selectPart(null, false);
      }
    });

    dom.addEventListener(
      'wheel',
      () => {
        if (!this.customSceneRenderer) {
          this.wheelMotionFrames = 2;
          if (this.quality === 'ultra' && this.v2Runtime.getMotionStage() === 'ultra') {
            this.v2Runtime.setMotionStage('lite');
          }
        }
        this.markDirty(2);
      },
      { passive: true }
    );
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

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  public getContainer(): HTMLElement {
    return this.container;
  }

  public setCustomSceneRenderer(
    fn: ((renderer: THREE.WebGLRenderer, dt: number) => boolean | void) | null
  ): void {
    this.customSceneRenderer = fn;
    this.controls.enabled = fn === null;
    this.hoverRaycastPending = false;
    this.container.classList.remove('is-hovering');
    if (fn !== null) {
      if (this.v2Runtime.isActive() && !this.v2Runtime.isReady()) {
        this.v2Runtime.deactivate();
        this.initialActivated = false;
      }
    } else {
      this.prevCamPos.copy(this.camera.position);
      this.prevCamQuat.copy(this.camera.quaternion);
      this.prevCamInitialized = true;
      this.fastStageCooldown = 0;
      this.v2Runtime.setMotionStage(this.quality === 'standard_lite' ? 'lite' : 'ultra');
      if (!this.v2Runtime.isActive()) {
        this.activateCurrentMode();
      }
    }
    this.markDirty(3);
  }

  private handleContextLost(event: Event): void {
    event.preventDefault();
    this.contextLost = true;
    this.contextLossCount++;
    this.v2Runtime.handleContextLost();
    this.recoveryOverlay.classList.add('is-visible');
  }

  private handleContextRestored(): void {
    this.contextLost = false;
    this.recoveryOverlay.classList.remove('is-visible');
    this.cachedDomRect = this.renderer.domElement.getBoundingClientRect();
    void this.v2Runtime.handleContextRestored(this.camera, this.sectionAxis !== 'off');
    this.markDirty(2);
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
    const v2Diag = this.v2Runtime.getDiagnostics();
    return {
      profile: GPU_PROFILE,
      quality: this.quality,
      ultraHealthy: true,
      pixelRatio: this.renderer.getPixelRatio(),
      contextLost: this.contextLost,
      contextLossCount: this.contextLossCount,
      calls: v2Diag.drawCalls,
      triangles: v2Diag.triangles,
      lines: info.render.lines,
      geometries: info.memory.geometries,
      textures: info.memory.textures,
      programs: info.programs ? info.programs.length : 0,
      hydratedParts: v2Diag.ready ? this.v2Runtime.getParts().length : 0,
      totalParts: this.getTotalPartCount(),
      megaBatches: 0,
      kinematicBones: 0,
    };
  }

  private updateHoverFromRaycast(): void {
    const hoverRes = this.v2Runtime.pickHover(
      this.pointer,
      this.camera,
      (partId) => this.isPartHidden(partId),
      this.sectionAxis !== 'off' ? this.clippingPlane : null
    );
    if (hoverRes.skipped) return;
    const hitId = hoverRes.partId;
    if (hitId !== this.hoveredPartId) {
      this.hoveredPartId = hitId;
      this.container.classList.toggle('is-hovering', hitId !== null);
      this.applyVisibilityAndStyles();
      this.callbacks.onHoverPart(hitId);
    }
  }

  private animate = (): void => {
    this.rafId = 0;
    if (this.disposed || this.contextLost || this.pageHidden) return;

    const rawDelta = this.clock.getDelta();
    const delta = Math.min(rawDelta, 0.05);

    // Demand-Driven Zero-Load Play Ground Loop: sleeps at 0.0 draws/s when orbit damping settles!
    if (this.customSceneRenderer) {
      const keepAlive = this.customSceneRenderer(this.renderer, delta) === true;
      if (this.dirtyFrames > 0) this.dirtyFrames--;
      if (keepAlive || this.dirtyFrames > 0) {
        this.rafId = requestAnimationFrame(this.animate);
      }
      return;
    }

    if (this.hoverRaycastPending) {
      this.hoverRaycastPending = false;
      this.updateHoverFromRaycast();
    }

    let active = this.dirtyFrames > 0;

    // Explode slider transition (NOTE: NEVER triggers ULTRA->LITE/FAST motion proxy — maintains ULTRA!)
    const diff = this.targetExplode - this.currentExplode;
    if (Math.abs(diff) > 0.0005) {
      this.currentExplode += diff * Math.min(1, delta * 10.0);
      this.updateTightMaxDistance();
      active = true;
    } else if (this.currentExplode !== this.targetExplode) {
      this.currentExplode = this.targetExplode;
      this.updateTightMaxDistance();
      active = true;
    }

    if (this.camAnimActive) {
      this.camAnimT = Math.min(1, this.camAnimT + Math.min(rawDelta, 0.16) * 2.8);
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

    // Multi-Stage Adaptive Rendering Ladder: FAST (5x-15x lighter) <-> STD LITE v2 <-> ULTRA
    // Computes exact angular + distance-normalized linear camera velocity + EMA frame load
    let cameraMoved = false;
    let motionScore = 0;
    if (this.prevCamInitialized) {
      const posDelta = this.camera.position.distanceTo(this.prevCamPos);
      const camDist = Math.max(0.5, this.camera.position.distanceTo(this.controls.target));
      const clampedDot = Math.min(1, Math.abs(this.camera.quaternion.dot(this.prevCamQuat)));
      const angDelta = 2 * Math.acos(clampedDot);
      cameraMoved = posDelta > 1e-3 || angDelta > 1e-4;
      if (cameraMoved) {
        const dtSafe = Math.max(0.008, delta);
        const angSpeed = angDelta / dtSafe;
        const linSpeed = posDelta / camDist / dtSafe;
        motionScore = Math.max(angSpeed / 1.45, linSpeed / 1.15);
      }
    } else {
      this.prevCamInitialized = true;
    }
    this.prevCamPos.copy(this.camera.position);
    this.prevCamQuat.copy(this.camera.quaternion);

    const wheelActive = this.wheelMotionFrames > 0;
    if (wheelActive) this.wheelMotionFrames--;

    // Trigger strictly on actual camera viewpoint motion (drag, wheel, pinch, camera anim),
    // never on motionless clicks and never on Explode slider!
    const cameraInMotion = this.camAnimActive || cameraMoved || wheelActive;

    if (cameraInMotion) {
      this.updateDynamicClipPlanes();
      const violentMotion =
        motionScore >= 1.45 || (motionScore >= 0.72 && this.emaRenderMs > 28.0);
      const calmedToLite = motionScore < 0.75 && this.emaRenderMs < 30.0;
      const curStage = this.v2Runtime.getMotionStage();

      if (violentMotion) {
        this.v2Runtime.setMotionStage('fast');
        this.fastStageCooldown = 3;
      } else if (curStage === 'fast') {
        if (this.fastStageCooldown > 0) {
          this.fastStageCooldown--;
        } else if (calmedToLite) {
          this.v2Runtime.setMotionStage('lite');
        }
      } else if (this.quality === 'ultra') {
        this.v2Runtime.setMotionStage('lite');
      }
      active = true;
    } else {
      this.fastStageCooldown = 0;
      const settledStage = this.quality === 'standard_lite' ? 'lite' : 'ultra';
      if (this.v2Runtime.getMotionStage() !== settledStage) {
        // Camera viewpoint stopped -> immediately restore full settled quality (ULTRA or LITE)!
        this.v2Runtime.setMotionStage(settledStage);
        active = true;
      } else if (this.v2Runtime.needsStationaryRefinement()) {
        // Progressive Halton(2,3) 8x SSAA accumulation for zero-jaggy stationary ULTRA (auto-stops -> 0% idle!)
        active = true;
      }
    }

    if (active) {
      this.idleFrameStreak = 0;
      this.v2Runtime.syncExplode(this.currentExplode);
      const r0 = typeof performance !== 'undefined' ? performance.now() : 0;
      this.v2Runtime.render(this.camera, this.controls.target);
      const r1 = typeof performance !== 'undefined' ? performance.now() : 0;
      const renderMs = r1 - r0;
      this.emaRenderMs = this.emaRenderMs * 0.78 + renderMs * 0.22;
      if (this.dirtyFrames > 0) this.dirtyFrames--;
    } else {
      this.idleFrameStreak++;
    }

    const needMoreRefine = !cameraInMotion && this.v2Runtime.needsStationaryRefinement();
    const settledStageAfter = this.quality === 'standard_lite' ? 'lite' : 'ultra';
    if (
      active ||
      cameraInMotion ||
      needMoreRefine ||
      this.v2Runtime.getMotionStage() !== settledStageAfter ||
      this.hoverRaycastPending ||
      this.camAnimActive ||
      this.dirtyFrames > 0 ||
      this.idleFrameStreak < 1
    ) {
      this.rafId = requestAnimationFrame(this.animate);
    } else {
      this.v2Runtime.markIdle();
    }
  };

  public dispose(): void {
    this.disposed = true;
    if (this.rafId !== 0) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    const dom = this.renderer.domElement;
    dom.removeEventListener('webglcontextlost', this.boundContextLost);
    dom.removeEventListener('webglcontextrestored', this.boundContextRestored);
    document.removeEventListener('visibilitychange', this.boundVisibilityChange);
    window.removeEventListener('resize', this.boundHandleResize);
    document.removeEventListener('fullscreenchange', this.boundHandleResize);
    this.resizeObserver?.disconnect();
    this.v2Runtime.dispose();
    this.recoveryOverlay.remove();
    this.controls.dispose();
    this.renderer.dispose();
  }
}
