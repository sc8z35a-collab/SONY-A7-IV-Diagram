import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  CadPart,
  CameraPreset,
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
import { hasRegisteredUnit, listRegisteredUnits } from '../units/registry';

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
  private renderMode: RenderMode = 'solid';
  private quality: GraphicsQuality = GPU_PROFILE.isMobile ? 'standard' : 'high';
  private sectionAxis: SectionAxis = 'off';
  private sectionValue = 0.5;
  private targetExplode = 0;
  private currentExplode = 0;
  private physicsActive = false;

  private selectedPartId: string | null = null;
  private hoveredPartId: string | null = null;
  private isolatedPartId: string | null = null;
  private hiddenPartIds = new Set<string>();
  private pendingSelectAfterHydrate: { partId: string; focusCamera: boolean } | null = null;

  private initialActivated = false;

  // Smooth camera transition
  private camAnimActive = false;
  private camStartPos = new THREE.Vector3();
  private camEndPos = new THREE.Vector3();
  private camStartTarget = new THREE.Vector3();
  private camEndTarget = new THREE.Vector3();
  private camAnimT = 0;

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
  private customSceneRenderer: ((renderer: THREE.WebGLRenderer, dt: number) => void) | null = null;

  constructor(container: HTMLElement, callbacks: ViewportCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    this.renderer = new THREE.WebGLRenderer({
      antialias: GPU_PROFILE.antialias,
      alpha: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.renderer.debug.checkShaderErrors = true;
    this.renderer.shadowMap.enabled = false;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, GPU_PROFILE.maxPixelRatio));
    this.renderer.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight));
    this.renderer.setClearColor(0xffffff, 1);
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
    this.camera = new THREE.PerspectiveCamera(32, aspect, 0.85, 4200);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.065;
    this.controls.minDistance = 7;
    this.controls.maxDistance = 2600;
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
            this.v2Runtime.syncSectionPlane(this.sectionAxis !== 'off');
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
    this.wakeLoop();

    // Defer initial activation by one microtask so synchronous URL ?quality= / ?preset= setup
    // in main.ts applies before the first dynamic chunk import & GPU compile begins!
    queueMicrotask(() => {
      if (!this.disposed && !this.initialActivated) {
        this.activateCurrentMode();
      }
    });
  }

  private activateCurrentMode(): void {
    this.initialActivated = true;
    const mode = this.mode;
    void this.v2Runtime.activate(mode, this.quality, this.camera, {
      explode: this.currentExplode,
      renderMode: this.renderMode,
      physicsActive: this.physicsActive,
      sectionActive: this.sectionAxis !== 'off',
      subView: this.getActiveSubViewForMode(mode),
      integratedMode: mode === 'integrated' || mode === 'camera_body',
    });
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
    return this.v2Runtime.getParts();
  }

  public getSelectedPart(): CadPart | null {
    if (!this.selectedPartId) return null;
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
    this.markDirty();
  }

  public getExplode(): number {
    return this.targetExplode;
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
    this.sectionAxis = axis;
    if (typeof normalizedValue === 'number') {
      this.sectionValue = THREE.MathUtils.clamp(normalizedValue, 0, 1);
    }
    this.updateClippingPlane();
  }

  public setPhysicsActive(active: boolean): void {
    this.physicsActive = active;
    this.v2Runtime.syncPhysicsActive(active);
    this.markDirty();
  }

  public selectPart(partId: string | null, focusCamera = true): void {
    if (partId === null) {
      this.pendingSelectAfterHydrate = null;
    } else {
      const candidate = this.v2Runtime.getPartById(partId);
      if (!candidate) {
        if (!this.v2Runtime.isReady()) {
          this.pendingSelectAfterHydrate = { partId, focusCamera };
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

  private focusOnPart(part: CadPart): void {
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

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  public getContainer(): HTMLElement {
    return this.container;
  }

  public setCustomSceneRenderer(
    fn: ((renderer: THREE.WebGLRenderer, dt: number) => void) | null
  ): void {
    this.customSceneRenderer = fn;
    this.controls.enabled = fn === null;
    this.hoverRaycastPending = false;
    this.container.classList.remove('is-hovering');
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

    const delta = Math.min(this.clock.getDelta(), 0.05);

    if (this.customSceneRenderer) {
      this.customSceneRenderer(this.renderer, delta);
      if (this.dirtyFrames > 0) this.dirtyFrames--;
      this.rafId = requestAnimationFrame(this.animate);
      return;
    }

    if (this.hoverRaycastPending) {
      this.hoverRaycastPending = false;
      this.updateHoverFromRaycast();
    }

    const elapsed = this.clock.getElapsedTime();

    const continuousAnim = this.v2Runtime.needsContinuousAnimation(this.physicsActive);
    let active = continuousAnim || this.dirtyFrames > 0;

    const diff = this.targetExplode - this.currentExplode;
    if (Math.abs(diff) > 0.0005) {
      this.currentExplode += diff * Math.min(1, delta * 10.0);
      active = true;
    } else if (this.currentExplode !== this.targetExplode) {
      this.currentExplode = this.targetExplode;
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
      this.v2Runtime.syncExplode(this.currentExplode);
      if (this.physicsActive || continuousAnim) {
        this.v2Runtime.stepPhysics(elapsed, delta);
      }
      this.v2Runtime.render(this.camera);
      if (this.dirtyFrames > 0) this.dirtyFrames--;
    } else {
      this.idleFrameStreak++;
    }

    if (
      active ||
      this.hoverRaycastPending ||
      continuousAnim ||
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
