import * as THREE from 'three';
import { CadPart, RenderMode } from '../assemblies/types';
import { loadRegisteredUnit } from '../units/registry';
import { disposeObject3D, VramLeakMonitor, VramLeakVerification } from './dispose';
import { PerfHudSnapshot, UnitPerfHud } from './perf_hud';
import { TwoStageRaycaster } from './raycast_engine';
import { QUALITY_TIER_CONFIG, ResourceCache } from './resource_cache';
import {
  OptimizedUnit,
  QualityTier,
  UnitBuildResult,
  UnitBuildStats,
  UnitRaycastIndex,
} from './unit_contract';

export interface UnitV2RuntimeCallbacks {
  onBuildComplete: (unitId: string, parts: CadPart[]) => void;
  onRequestRender: () => void;
  onQualityFallback: (quality: QualityTier) => void;
}

export interface UnitV2Diagnostics {
  unitId: string | null;
  active: boolean;
  ready: boolean;
  quality: QualityTier;
  pixelRatio: number;
  idle: boolean;
  drawCalls: number;
  triangles: number;
  geometries: number;
  textures: number;
  frameTimeMs: number;
  avgFrameTimeMs: number;
  shaderWarmupMs: number;
  buildStats: UnitBuildStats | null;
  vramCheck: VramLeakVerification | null;
  vramSwitchCount: number;
  cacheStats: ReturnType<ResourceCache['getStats']>;
  raycastDiagnostics: ReturnType<TwoStageRaycaster['getDiagnostics']>;
  contextLostRecoveryCount: number;
  renderFrameCount: number;
}

// Module-scoped zero-GC scratch objects for ULTRA tight-frustum shadow fitting
const _shadowCenter = new THREE.Vector3();
const _shadowSize = new THREE.Vector3();

/**
 * Universal V2 Rendering Core for ANY unit registered in `src/units/registry.ts`.
 * Unifies:
 * - Dynamic lazy loading & time-sliced chunked build with abort cancellation
 * - 4-Tier Pipeline: STD LITE (Zero-Light MatCap + Mega-Bucket Fusion), STD (Lambert+Phong),
 *   HIGH (PBR + PMREM), ULTRA (512x256 Softbox Cyclorama + PCFSoftShadowMap + Ground Contact Shadow)
 * - Quality-tier DPR capping (LITE/STD <=1.0, HIGH <=1.5, ULTRA <=2.0) & shader warmup
 * - Dirty-flag on-demand rendering (0% idle GPU)
 * - Front-to-back two-stage zero-GC AABB raycasting (camera-drag hover pause + 30Hz throttle)
 * - Automatic STD fallback recovery upon webglcontextlost / webglcontextrestored
 * - Automatic VRAM leak verification (Δg=0, Δt=0, cacheRemainingRefs=0)
 */
export class UnitV2Runtime {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly container: HTMLElement;
  private readonly clippingPlane: THREE.Plane;
  private readonly callbacks: UnitV2RuntimeCallbacks;

  private readonly scene: THREE.Scene;
  private readonly lightGroup: THREE.Group;
  private readonly cache = new ResourceCache();
  private readonly raycaster = new TwoStageRaycaster(33.3);
  private readonly vramMonitor = new VramLeakMonitor();
  private readonly perfHud: UnitPerfHud;

  private active = false;
  private ready = false;
  private activeUnitId: string | null = null;
  private activationToken = 0;
  private activeUnit: OptimizedUnit | null = null;
  private buildResult: UnitBuildResult | null = null;
  private partById = new Map<string, CadPart>();
  private studioEnvRenderTarget: THREE.WebGLRenderTarget | null = null;
  private ultraKeyLight: THREE.DirectionalLight | null = null;
  private ultraShadowCatcher: THREE.Mesh | null = null;
  private savedExternalPixelRatio = 1.0;

  private quality: QualityTier = 'high';
  private renderMode: RenderMode = 'solid';
  private explodeFactor = 0;
  private physicsActive = false;
  private subView = 0;
  private integratedMode = false;
  private selectedId: string | null = null;
  private hoveredId: string | null = null;
  private hiddenIds: ReadonlySet<string> = new Set();
  private isolatedId: string | null = null;

  private lastDrawCalls = 0;
  private lastTriangles = 0;
  private lastFrameTimeMs = 0;
  private avgFrameTimeMs = 0;
  private frameSampleCount = 0;
  private shaderWarmupMs = 0;
  private isIdle = true;
  private contextLost = false;
  private contextLostRecoveryCount = 0;

  constructor(
    renderer: THREE.WebGLRenderer,
    container: HTMLElement,
    clippingPlane: THREE.Plane,
    callbacks: UnitV2RuntimeCallbacks
  ) {
    this.renderer = renderer;
    this.container = container;
    this.clippingPlane = clippingPlane;
    this.callbacks = callbacks;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    this.scene.matrixAutoUpdate = false;
    this.scene.updateMatrix();

    this.lightGroup = new THREE.Group();
    this.lightGroup.name = 'unit-v2-studio-lights';
    this.lightGroup.matrixAutoUpdate = false;
    this.lightGroup.updateMatrix();
    this.scene.add(this.lightGroup);

    const urlParams =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const autoOpenHud = urlParams?.get('perfhud') === '1';
    this.perfHud = new UnitPerfHud(container, autoOpenHud);
  }

  public isActive(): boolean {
    return this.active;
  }

  public isReady(): boolean {
    return this.active && this.ready;
  }

  public getActiveUnitId(): string | null {
    return this.activeUnitId;
  }

  public getQuality(): QualityTier {
    return this.quality;
  }

  public getParts(): CadPart[] {
    if (!this.buildResult) return [];
    if (this.activeUnit?.getActiveParts) {
      return this.activeUnit.getActiveParts();
    }
    return this.buildResult.parts;
  }

  public getAllBuiltParts(): CadPart[] {
    return this.buildResult ? this.buildResult.parts : [];
  }

  public getPartById(partId: string): CadPart | null {
    return this.partById.get(partId) ?? null;
  }

  public isPartCulledBySubView(partId: string): boolean {
    return this.activeUnit?.isPartCulledBySubView?.(partId) ?? false;
  }

  public needsContinuousAnimation(physicsActive: boolean): boolean {
    if (!this.active || !this.ready) return false;
    if (this.activeUnit?.needsContinuousAnimation) {
      return this.activeUnit.needsContinuousAnimation(physicsActive);
    }
    return physicsActive;
  }

  public getRaycastIndex(): UnitRaycastIndex | null {
    return this.buildResult ? this.buildResult.raycastIndex : null;
  }

  public getPartWorldBox(partId: string, out: THREE.Box3): boolean {
    const idx = this.buildResult?.raycastIndex;
    if (!idx) return false;
    const pb = idx.partBoundsById.get(partId);
    if (!pb || pb.worldBox.isEmpty()) return false;
    out.copy(pb.worldBox);
    return true;
  }

  private setupStudioLighting(quality: QualityTier): void {
    this.teardownStudioLighting();

    const cfg = QUALITY_TIER_CONFIG[quality];

    // STD LITE uses pre-integrated Studio MatCap shaders -> ZERO dynamic scene lights needed!
    if (quality === 'standard_lite') {
      this.scene.environment = null;
      this.studioEnvRenderTarget = null;
      return;
    }

    const isStd = quality === 'standard';
    const isUltra = quality === 'ultra';

    // Physically-based Three.js r174 light units (useLegacyLights=false):
    // - STD has no PMREM IBL, so boost omnidirectional hemisphere & 3-point lights to match HIGH brightness (0% crushed blacks)
    // - ULTRA pairs crisp directional key shadow + architectural rim separation with our 512x256 softbox cyclorama
    const hemi = new THREE.HemisphereLight(
      0xffffff,
      isStd ? 0xeef3fa : isUltra ? 0xe8eef8 : 0xedf2fa,
      isStd ? 2.85 : isUltra ? 0.96 : 1.08
    );
    hemi.position.set(0, 80, 0);
    hemi.matrixAutoUpdate = false;
    hemi.updateMatrix();

    const key = new THREE.DirectionalLight(
      isUltra ? 0xfffdf9 : 0xffffff,
      isStd ? 2.05 : isUltra ? 2.15 : 1.78
    );
    key.position.set(-72, 112, 68);
    key.matrixAutoUpdate = false;
    key.updateMatrix();
    key.target.matrixAutoUpdate = false;
    key.target.updateMatrix();

    if (isUltra && cfg.shadowsEnabled) {
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.bias = -0.00035;
      key.shadow.normalBias = 0.08;
      key.shadow.radius = 3.0;
      this.ultraKeyLight = key;

      // Subtle grounded studio contact-shadow catcher plane (cached & auto-disposed, zero leak!)
      const planeGeo = this.cache.acquireGeometry('ultra:shadow-catcher-plane', () => {
        const g = new THREE.PlaneGeometry(1, 1);
        g.rotateX(-Math.PI / 2);
        return g;
      });
      const shadowMat = this.cache.acquireShadowMaterial('ultra-ground', {
        color: 0x0f172a,
        opacity: 0.16,
      });
      const catcher = new THREE.Mesh(planeGeo, shadowMat);
      catcher.name = 'ultra-studio-shadow-catcher';
      catcher.receiveShadow = true;
      catcher.castShadow = false;
      catcher.matrixAutoUpdate = false;
      catcher.updateMatrix();
      catcher.visible = this.renderMode === 'solid';
      this.ultraShadowCatcher = catcher;
      this.lightGroup.add(catcher);
    }

    const fill = new THREE.DirectionalLight(
      0xf4f8ff,
      isStd ? 1.45 : isUltra ? 0.86 : 0.92
    );
    fill.position.set(66, 24, 86);
    fill.matrixAutoUpdate = false;
    fill.updateMatrix();

    const rim = new THREE.DirectionalLight(
      isUltra ? 0xe0f2fe : 0xeef6ff,
      isStd ? 1.35 : isUltra ? 1.32 : 1.02
    );
    rim.position.set(82, 48, -84);
    rim.matrixAutoUpdate = false;
    rim.updateMatrix();

    this.lightGroup.add(hemi, key, key.target, fill, rim);
    this.lightGroup.updateMatrixWorld(true);

    if (cfg.enableStudioEnv) {
      // Explicit PMREM bake + immediate pmrem.dispose() prevents Three.js WebGLCubeUVMaps
      // from retaining 8 internal LOD plane geometries + 1 pingPong texture permanently!
      const envKey = isUltra ? 'studio_env_ultra' : 'studio_env';
      const rawEnvTex = this.cache.acquireTexture(envKey);
      const pmrem = new THREE.PMREMGenerator(this.renderer);
      const envRt = pmrem.fromEquirectangular(rawEnvTex);
      pmrem.dispose();
      this.cache.releaseTexture(envKey);
      this.studioEnvRenderTarget = envRt;
      this.scene.environment = envRt.texture;
    } else {
      this.scene.environment = null;
      this.studioEnvRenderTarget = null;
    }
  }

  /**
   * Tightly fit ULTRA's 2048x2048 PCFSoftShadowMap frustum & studio contact-shadow floor
   * to the active unit's exact world bounding box (razor-sharp mechanical shadows + 0 wasted texels!).
   */
  private fitUltraShadowRig(): void {
    if (this.quality !== 'ultra' || !this.ultraKeyLight) return;
    const box = this.buildResult?.raycastIndex.unitWorldBox;
    if (!box || box.isEmpty()) return;

    box.getCenter(_shadowCenter);
    box.getSize(_shadowSize);
    const radius = Math.max(12, Math.hypot(_shadowSize.x, _shadowSize.y, _shadowSize.z) * 0.56);

    const key = this.ultraKeyLight;
    key.target.position.copy(_shadowCenter);
    key.target.updateMatrix();
    key.position.set(
      _shadowCenter.x - radius * 1.15,
      _shadowCenter.y + radius * 1.85,
      _shadowCenter.z + radius * 1.05
    );
    key.updateMatrix();

    const sc = key.shadow.camera;
    const extent = radius * 1.28;
    sc.left = -extent;
    sc.right = extent;
    sc.top = extent;
    sc.bottom = -extent;
    sc.near = Math.max(1, radius * 0.25);
    sc.far = radius * 5.2;
    sc.updateProjectionMatrix();

    if (this.ultraShadowCatcher) {
      const floorSize = Math.max(60, radius * 4.8);
      this.ultraShadowCatcher.position.set(_shadowCenter.x, box.min.y - 0.18, _shadowCenter.z);
      this.ultraShadowCatcher.scale.set(floorSize, 1, floorSize);
      this.ultraShadowCatcher.visible = this.renderMode === 'solid';
      this.ultraShadowCatcher.updateMatrix();
    }

    this.lightGroup.updateMatrixWorld(true);
    this.renderer.shadowMap.needsUpdate = true;
  }

  private teardownStudioLighting(): void {
    if (this.ultraKeyLight?.shadow?.map) {
      this.ultraKeyLight.shadow.map.dispose();
      this.ultraKeyLight.shadow.map = null;
    }
    this.ultraKeyLight = null;
    this.ultraShadowCatcher = null;
    if (this.lightGroup.children.length > 0) {
      disposeObject3D(this.lightGroup, this.cache, false);
    }
    if (this.studioEnvRenderTarget) {
      this.scene.environment = null;
      this.studioEnvRenderTarget.dispose();
      this.studioEnvRenderTarget = null;
    }
  }

  private applyQualityRendererCaps(quality: QualityTier): void {
    const cfg = QUALITY_TIER_CONFIG[quality];
    this.renderer.shadowMap.enabled = cfg.shadowsEnabled;
    if (cfg.shadowsEnabled) {
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      // On-demand shadow baking: bake shadows only when geometry/explode/subView changes (0% orbit overhead!)
      this.renderer.shadowMap.autoUpdate = false;
      this.renderer.shadowMap.needsUpdate = true;
    } else {
      this.renderer.shadowMap.autoUpdate = false;
    }
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const targetDpr = Math.min(dpr, cfg.maxPixelRatio);
    this.renderer.setPixelRatio(targetDpr);
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h);
  }

  private disposeActiveUnitResources(): void {
    if (this.activeUnit) {
      this.activeUnit.dispose(this.cache);
      this.activeUnit = null;
    }
    this.buildResult = null;
    this.partById.clear();
    this.ready = false;
    this.teardownStudioLighting();
    this.renderer.renderLists.dispose();
  }

  /**
   * Enter (or switch to) any registered V2 unit:
   * - Disposes any prior V2 unit and verifies Δg=0, Δt=0 before capturing new baseline
   * - Dynamically imports the target unit via registry.ts
   * - Runs 8ms time-sliced quality-tiered build
   * - Pre-compiles shaders before first visible frame
   */
  public async activate(
    unitId: string,
    quality: QualityTier,
    camera: THREE.Camera,
    initialState: {
      explode: number;
      renderMode: RenderMode;
      physicsActive: boolean;
      sectionActive: boolean;
      subView?: number;
      integratedMode?: boolean;
    }
  ): Promise<void> {
    const token = ++this.activationToken;
    const wasActive = this.active;
    if (!wasActive) {
      this.savedExternalPixelRatio = this.renderer.getPixelRatio();
      this.vramMonitor.captureBaseline(this.renderer);
    } else {
      this.disposeActiveUnitResources();
      this.vramMonitor.verifyAfterDispose(this.renderer, this.cache);
      this.vramMonitor.captureBaseline(this.renderer);
    }

    this.active = true;
    this.ready = false;
    this.activeUnitId = unitId;
    this.quality = quality;
    this.explodeFactor = initialState.explode;
    this.renderMode = initialState.renderMode;
    this.physicsActive = initialState.physicsActive;
    this.subView = initialState.subView ?? (unitId === 'lens' ? 1 : 0);
    this.integratedMode = initialState.integratedMode ?? (unitId === 'integrated' || unitId === 'camera_body');
    this.selectedId = null;
    this.hoveredId = null;
    this.hiddenIds = new Set();
    this.isolatedId = null;
    this.frameSampleCount = 0;
    this.avgFrameTimeMs = 0;

    this.perfHud.setModeVisible(true);
    this.applyQualityRendererCaps(quality);
    this.setupStudioLighting(quality);

    try {
      const unit = await loadRegisteredUnit(unitId);
      if (token !== this.activationToken || !this.active) {
        return;
      }

      const planes = initialState.sectionActive ? [this.clippingPlane] : [];
      const built = await unit.build(quality, this.cache, {
        frameBudgetMs: 14.0,
        clippingPlanes: planes,
        subView: this.subView,
        integratedMode: this.integratedMode,
        isAborted: () => token !== this.activationToken || !this.active,
      });

      if (token !== this.activationToken || !this.active) {
        unit.dispose(this.cache);
        return;
      }

      this.activeUnit = unit;
      this.buildResult = built;
      this.partById.clear();
      for (let i = 0; i < built.parts.length; i++) {
        this.partById.set(built.parts[i].id, built.parts[i]);
      }

      this.scene.add(built.rootGroup);
      unit.setClippingPlanes?.(planes);
      unit.setSubView?.(this.subView);
      unit.updateExplode(this.explodeFactor, true);
      unit.setVisualState(
        this.selectedId,
        this.hoveredId,
        this.hiddenIds,
        this.isolatedId,
        this.renderMode
      );
      unit.setPhysicsVisible?.(this.physicsActive);
      unit.updateExplodeGuides?.(this.explodeFactor, true);
      if (this.physicsActive || unit.needsContinuousAnimation?.(this.physicsActive)) {
        unit.updatePhysics?.(0, this.explodeFactor, this.physicsActive, 0);
      }

      this.fitUltraShadowRig();

      // Pre-compile all active V2 shader programs BEFORE first visible frame (0 Shader Hitch!)
      if (!this.contextLost) {
        this.shaderWarmupMs = this.cache.warmupShaders(this.renderer, this.scene, camera);
      }

      this.ready = true;
      this.vramMonitor.recordActivePeak(this.renderer);
      this.callbacks.onBuildComplete(unitId, this.getParts());
      this.callbacks.onRequestRender();
      this.refreshHud(true);
    } catch (err) {
      if (token === this.activationToken && this.active) {
        console.error(`[UnitV2Runtime:${unitId}] Unit build failed:`, err);
      }
    }
  }

  /**
   * Leave V2 mode completely:
   * - Cancels in-flight builds
   * - Recursively disposes ALL active unit GPU buffers, geometries, materials, textures & lights
   * - Runs automatic VRAM leak verification against pre-entry baseline
   * - Restores external renderer DPR
   */
  public deactivate(): VramLeakVerification | null {
    this.activationToken++;
    if (!this.active) return this.vramMonitor.getLastVerification();

    this.active = false;
    this.activeUnitId = null;
    this.perfHud.setModeVisible(false);
    this.disposeActiveUnitResources();
    const verification = this.vramMonitor.verifyAfterDispose(this.renderer, this.cache);

    this.renderer.setPixelRatio(this.savedExternalPixelRatio);
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h);
    return verification;
  }

  public async setQuality(
    quality: QualityTier,
    camera: THREE.Camera,
    sectionActive: boolean
  ): Promise<void> {
    if (!this.active || !this.activeUnitId) {
      this.quality = quality;
      return;
    }
    if (this.quality === quality && this.ready) return;

    const unitId = this.activeUnitId;
    const prevSelected = this.selectedId;
    const prevHovered = this.hoveredId;
    const prevHidden = new Set(this.hiddenIds);
    const prevIsolated = this.isolatedId;
    const prevRenderMode = this.renderMode;
    const prevExplode = this.explodeFactor;
    const prevPhysics = this.physicsActive;
    const prevSubView = this.subView;
    const prevIntegrated = this.integratedMode;

    await this.activate(unitId, quality, camera, {
      explode: prevExplode,
      renderMode: prevRenderMode,
      physicsActive: prevPhysics,
      sectionActive,
      subView: prevSubView,
      integratedMode: prevIntegrated,
    });

    if (this.active && this.ready && this.activeUnit && this.activeUnitId === unitId) {
      this.selectedId = prevSelected;
      this.hoveredId = prevHovered;
      this.hiddenIds = prevHidden;
      this.isolatedId = prevIsolated;
      this.activeUnit.setVisualState(
        this.selectedId,
        this.hoveredId,
        this.hiddenIds,
        this.isolatedId,
        this.renderMode
      );
      this.activeUnit.updateExplode(this.explodeFactor, true);
      this.activeUnit.updateExplodeGuides?.(this.explodeFactor, true);
      this.fitUltraShadowRig();
      this.callbacks.onRequestRender();
      this.refreshHud(true);
    }
  }

  public setSubView(subView: number): void {
    this.subView = subView;
    if (!this.activeUnit || !this.ready) return;
    this.activeUnit.setSubView?.(subView);
    this.activeUnit.updateExplodeGuides?.(this.explodeFactor, true);
    this.fitUltraShadowRig();
    this.callbacks.onRequestRender();
    this.refreshHud(true);
  }

  public syncExplode(t: number, force = false): boolean {
    this.explodeFactor = t;
    if (!this.activeUnit || !this.ready) return false;
    const changed = this.activeUnit.updateExplode(t, force);
    if (changed) {
      this.activeUnit.updateExplodeGuides?.(t, true);
      this.fitUltraShadowRig();
    }
    return changed;
  }

  public syncVisualState(
    selectedId: string | null,
    hoveredId: string | null,
    hiddenIds: ReadonlySet<string>,
    isolatedId: string | null,
    renderMode: RenderMode
  ): void {
    const guidesNeedSync =
      this.isolatedId !== isolatedId ||
      this.renderMode !== renderMode ||
      this.hiddenIds.size !== hiddenIds.size ||
      this.hiddenIds !== hiddenIds;

    this.selectedId = selectedId;
    this.hoveredId = hoveredId;
    this.hiddenIds = hiddenIds;
    this.isolatedId = isolatedId;
    this.renderMode = renderMode;
    if (!this.activeUnit || !this.ready) return;
    this.activeUnit.setVisualState(selectedId, hoveredId, hiddenIds, isolatedId, renderMode);
    if (guidesNeedSync) {
      if (this.explodeFactor >= 0.02) {
        this.activeUnit.updateExplodeGuides?.(this.explodeFactor, true);
      }
      if (this.quality === 'ultra') {
        this.fitUltraShadowRig();
      }
    }
  }

  public syncSectionPlane(active: boolean): void {
    if (!this.activeUnit || !this.ready) return;
    this.activeUnit.setClippingPlanes?.(active ? [this.clippingPlane] : []);
    if (this.quality === 'ultra') {
      this.renderer.shadowMap.needsUpdate = true;
    }
  }

  public syncPhysicsActive(active: boolean): void {
    this.physicsActive = active;
    if (!this.activeUnit || !this.ready) return;
    this.activeUnit.setPhysicsVisible?.(active);
    if (this.quality === 'ultra') {
      this.renderer.shadowMap.needsUpdate = true;
    }
  }

  public stepPhysics(elapsed: number, delta = 0.016): boolean {
    if (!this.activeUnit || !this.ready) return false;
    const res = this.activeUnit.updatePhysics?.(elapsed, this.explodeFactor, this.physicsActive, delta);
    const activeMoved = res !== false && (this.physicsActive || Boolean(res));
    if (activeMoved && this.quality === 'ultra') {
      this.renderer.shadowMap.needsUpdate = true;
    }
    return activeMoved;
  }

  public handleResize(): void {
    if (!this.active) return;
    this.applyQualityRendererCaps(this.quality);
    this.refreshHud(true);
  }

  public setCameraDragging(dragging: boolean): void {
    this.raycaster.setCameraDragging(dragging);
  }

  public pickHover(
    ndcPointer: THREE.Vector2,
    camera: THREE.Camera,
    isPartHidden: (partId: string) => boolean,
    clippingPlane: THREE.Plane | null
  ): { skipped: boolean; partId: string | null } {
    return this.raycaster.pickHover(
      ndcPointer,
      camera,
      this.buildResult?.raycastIndex ?? null,
      (id) => isPartHidden(id) || this.isPartCulledBySubView(id),
      clippingPlane
    );
  }

  public pickClick(
    ndcPointer: THREE.Vector2,
    camera: THREE.Camera,
    isPartHidden: (partId: string) => boolean,
    clippingPlane: THREE.Plane | null
  ): string | null {
    return this.raycaster.pickClick(
      ndcPointer,
      camera,
      this.buildResult?.raycastIndex ?? null,
      (id) => isPartHidden(id) || this.isPartCulledBySubView(id),
      clippingPlane
    );
  }

  /**
   * On-demand render execution for active V2 scene (strictly zero allocations in render path!).
   */
  public render(camera: THREE.Camera): void {
    if (!this.active || !this.ready || this.contextLost) return;
    this.isIdle = false;
    const t0 = typeof performance !== 'undefined' ? performance.now() : 0;
    this.renderer.render(this.scene, camera);
    const t1 = typeof performance !== 'undefined' ? performance.now() : 0;

    this.lastFrameTimeMs = t1 - t0;
    this.frameSampleCount++;
    if (
      this.frameSampleCount === 1 ||
      (this.frameSampleCount <= 4 && this.avgFrameTimeMs > this.lastFrameTimeMs * 10)
    ) {
      this.avgFrameTimeMs = this.lastFrameTimeMs;
    } else {
      this.avgFrameTimeMs = this.avgFrameTimeMs * 0.8 + this.lastFrameTimeMs * 0.2;
    }
    this.lastDrawCalls = this.renderer.info.render.calls;
    this.lastTriangles = this.renderer.info.render.triangles;
    this.vramMonitor.recordActivePeak(this.renderer);
    this.refreshHud(false);
  }

  public markIdle(): void {
    if (!this.active || this.isIdle) return;
    this.isIdle = true;
    this.refreshHud(true);
  }

  public handleContextLost(): void {
    this.contextLost = true;
  }

  /**
   * Automatic fallback to STD quality upon WebGL context loss/restoration in any V2 mode!
   */
  public async handleContextRestored(camera: THREE.Camera, sectionActive: boolean): Promise<void> {
    this.contextLost = false;
    this.contextLostRecoveryCount++;
    if (!this.active || !this.activeUnitId) return;

    this.quality = 'standard';
    this.callbacks.onQualityFallback('standard');
    await this.activate(this.activeUnitId, 'standard', camera, {
      explode: this.explodeFactor,
      renderMode: this.renderMode,
      physicsActive: this.physicsActive,
      sectionActive,
      subView: this.subView,
      integratedMode: this.integratedMode,
    });
  }

  public togglePerfHud(): boolean {
    const next = this.perfHud.toggle();
    if (next) this.refreshHud(true);
    return next;
  }

  public setPerfHudVisible(expanded: boolean): void {
    this.perfHud.setExpanded(expanded);
    if (expanded) this.refreshHud(true);
  }

  public getDiagnostics(): UnitV2Diagnostics {
    const info = this.renderer.info;
    return {
      unitId: this.activeUnitId,
      active: this.active,
      ready: this.ready,
      quality: this.quality,
      pixelRatio: this.renderer.getPixelRatio(),
      idle: this.isIdle,
      drawCalls: this.lastDrawCalls,
      triangles: this.lastTriangles,
      geometries: info.memory.geometries,
      textures: info.memory.textures,
      frameTimeMs: this.lastFrameTimeMs,
      avgFrameTimeMs: this.avgFrameTimeMs,
      shaderWarmupMs: this.shaderWarmupMs,
      buildStats: this.buildResult?.stats ?? null,
      vramCheck: this.vramMonitor.getLastVerification(),
      vramSwitchCount: this.vramMonitor.getSwitchCount(),
      cacheStats: this.cache.getStats(),
      raycastDiagnostics: this.raycaster.getDiagnostics(),
      contextLostRecoveryCount: this.contextLostRecoveryCount,
      renderFrameCount: this.frameSampleCount,
    };
  }

  private refreshHud(force: boolean): void {
    const info = this.renderer.info;
    const snap: PerfHudSnapshot = {
      unitId: this.activeUnitId ?? 'v2',
      drawCalls: this.lastDrawCalls,
      maxDrawCallsBudget: this.activeUnit?.getMeta().maxDrawCallsBudget ?? 100,
      triangles: this.lastTriangles,
      geometries: info.memory.geometries,
      textures: info.memory.textures,
      frameTimeMs: this.lastFrameTimeMs,
      avgFrameTimeMs: this.avgFrameTimeMs,
      quality: this.quality,
      pixelRatio: this.renderer.getPixelRatio(),
      idle: this.isIdle,
      shaderWarmupMs: this.shaderWarmupMs,
      buildStats: this.buildResult?.stats ?? null,
      vramCheck: this.vramMonitor.getLastVerification(),
      vramSwitchCount: this.vramMonitor.getSwitchCount(),
    };
    this.perfHud.update(snap, force);
  }

  public dispose(): void {
    this.deactivate();
    this.cache.disposeAll();
    this.perfHud.dispose();
  }
}

/** Backward-compatible type aliases */
export type MiShoeV2Runtime = UnitV2Runtime;
export type MiShoeV2Diagnostics = UnitV2Diagnostics;
export type MiShoeV2RuntimeCallbacks = UnitV2RuntimeCallbacks;
