import * as THREE from 'three';
import { CadPart, RenderMode } from '../assemblies/types';
import { loadRegisteredUnit } from '../units/registry';
import { disposeObject3D, VramLeakMonitor, VramLeakVerification } from './dispose';
import { MiShoePerfHud, PerfHudSnapshot } from './perf_hud';
import { TwoStageRaycaster } from './raycast_engine';
import { QUALITY_TIER_CONFIG, ResourceCache } from './resource_cache';
import {
  OptimizedUnit,
  QualityTier,
  UnitBuildResult,
  UnitBuildStats,
  UnitRaycastIndex,
} from './unit_contract';

export interface MiShoeV2RuntimeCallbacks {
  onBuildComplete: (parts: CadPart[]) => void;
  onRequestRender: () => void;
  onQualityFallback: (quality: QualityTier) => void;
}

export interface MiShoeV2Diagnostics {
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
}

/**
 * Isolated V2 Rendering Core exclusively for the experimental MI Shoe individual phase ('mishoe').
 * Completely decoupled from all other camera anatomy assemblies and GpuMegaBatch pipelines.
 */
export class MiShoeV2Runtime {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly container: HTMLElement;
  private readonly clippingPlane: THREE.Plane;
  private readonly callbacks: MiShoeV2RuntimeCallbacks;

  private readonly scene: THREE.Scene;
  private readonly lightGroup: THREE.Group;
  private readonly cache = new ResourceCache();
  private readonly raycaster = new TwoStageRaycaster(33.3);
  private readonly vramMonitor = new VramLeakMonitor();
  private readonly perfHud: MiShoePerfHud;

  private active = false;
  private ready = false;
  private activationToken = 0;
  private activeUnit: OptimizedUnit | null = null;
  private buildResult: UnitBuildResult | null = null;
  private partById = new Map<string, CadPart>();
  private studioEnvRenderTarget: THREE.WebGLRenderTarget | null = null;
  private savedExternalPixelRatio = 1.0;

  private quality: QualityTier = 'high';
  private renderMode: RenderMode = 'solid';
  private explodeFactor = 0;
  private physicsActive = false;
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
    callbacks: MiShoeV2RuntimeCallbacks
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
    this.lightGroup.name = 'mishoe-v2-studio-lights';
    this.lightGroup.matrixAutoUpdate = false;
    this.lightGroup.updateMatrix();
    this.scene.add(this.lightGroup);

    const urlParams =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const autoOpenHud = urlParams?.get('perfhud') === '1';
    this.perfHud = new MiShoePerfHud(container, autoOpenHud);
  }

  public isActive(): boolean {
    return this.active;
  }

  public isReady(): boolean {
    return this.active && this.ready;
  }

  public getQuality(): QualityTier {
    return this.quality;
  }

  public getParts(): CadPart[] {
    return this.buildResult ? this.buildResult.parts : [];
  }

  public getPartById(partId: string): CadPart | null {
    return this.partById.get(partId) ?? null;
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

    const hemi = new THREE.HemisphereLight(0xf8fbff, 0xdce3ee, quality === 'standard' ? 1.15 : 0.92);
    hemi.position.set(0, 60, 0);
    hemi.matrixAutoUpdate = false;
    hemi.updateMatrix();

    const key = new THREE.DirectionalLight(0xffffff, quality === 'standard' ? 1.45 : 1.75);
    key.position.set(-62, 86, 55);
    key.matrixAutoUpdate = false;
    key.updateMatrix();

    const fill = new THREE.DirectionalLight(0xf1f5ff, quality === 'standard' ? 0.55 : 0.72);
    fill.position.set(65, 68, 75);
    fill.matrixAutoUpdate = false;
    fill.updateMatrix();

    const rim = new THREE.DirectionalLight(0xeef6ff, quality === 'standard' ? 0.45 : 0.95);
    rim.position.set(78, 44, -80);
    rim.matrixAutoUpdate = false;
    rim.updateMatrix();

    this.lightGroup.add(hemi, key, fill, rim);
    this.lightGroup.updateMatrixWorld(true);

    if (cfg.enableStudioEnv) {
      // Explicit PMREM bake + immediate pmrem.dispose() prevents Three.js WebGLCubeUVMaps
      // from retaining 8 internal LOD plane geometries + 1 pingPong texture permanently!
      const rawEnvTex = this.cache.acquireTexture('studio_env');
      const pmrem = new THREE.PMREMGenerator(this.renderer);
      const envRt = pmrem.fromEquirectangular(rawEnvTex);
      pmrem.dispose();
      this.cache.releaseTexture('studio_env');
      this.studioEnvRenderTarget = envRt;
      this.scene.environment = envRt.texture;
    } else {
      this.scene.environment = null;
      this.studioEnvRenderTarget = null;
    }
  }

  private teardownStudioLighting(): void {
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
   * Enter MI Shoe V2 mode:
   * - Captures VRAM baseline
   * - Dynamically imports MiShoeUnit via registry
   * - Runs 8ms time-sliced quality-tiered build
   * - Pre-compiles shaders before first visible frame
   */
  public async activate(
    quality: QualityTier,
    camera: THREE.Camera,
    initialState: {
      explode: number;
      renderMode: RenderMode;
      physicsActive: boolean;
      sectionActive: boolean;
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
    this.quality = quality;
    this.explodeFactor = initialState.explode;
    this.renderMode = initialState.renderMode;
    this.physicsActive = initialState.physicsActive;
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
      const unit = await loadRegisteredUnit('mishoe');
      if (token !== this.activationToken || !this.active) {
        return;
      }

      const planes = initialState.sectionActive ? [this.clippingPlane] : [];
      const built = await unit.build(quality, this.cache, {
        frameBudgetMs: 8.0,
        clippingPlanes: planes,
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
      if (this.physicsActive) {
        unit.updatePhysics?.(0, this.explodeFactor, true);
      }

      // Pre-compile all active MI Shoe V2 shader programs BEFORE first visible frame (0 Shader Hitch!)
      if (!this.contextLost) {
        this.shaderWarmupMs = this.cache.warmupShaders(this.renderer, this.scene, camera);
      }

      this.ready = true;
      this.vramMonitor.recordActivePeak(this.renderer);
      this.callbacks.onBuildComplete(built.parts);
      this.callbacks.onRequestRender();
      this.refreshHud(true);
    } catch (err) {
      if (token === this.activationToken && this.active) {
        console.error('[MI Shoe V2] Unit build failed:', err);
      }
    }
  }

  /**
   * Leave MI Shoe V2 mode:
   * - Cancels in-flight builds
   * - Recursively disposes ALL MI Shoe GPU buffers, geometries, materials, textures & lights
   * - Runs automatic VRAM leak verification against pre-entry baseline
   * - Restores external renderer DPR
   */
  public deactivate(): VramLeakVerification | null {
    this.activationToken++;
    if (!this.active) return this.vramMonitor.getLastVerification();

    this.active = false;
    this.perfHud.setModeVisible(false);
    this.disposeActiveUnitResources();
    const verification = this.vramMonitor.verifyAfterDispose(this.renderer, this.cache);

    // Restore CadViewport's previous pixel ratio cleanly
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
    if (!this.active) {
      this.quality = quality;
      return;
    }
    if (this.quality === quality && this.ready) return;

    const prevSelected = this.selectedId;
    const prevHovered = this.hoveredId;
    const prevHidden = new Set(this.hiddenIds);
    const prevIsolated = this.isolatedId;
    const prevRenderMode = this.renderMode;
    const prevExplode = this.explodeFactor;
    const prevPhysics = this.physicsActive;

    await this.activate(quality, camera, {
      explode: prevExplode,
      renderMode: prevRenderMode,
      physicsActive: prevPhysics,
      sectionActive,
    });

    if (this.active && this.ready && this.activeUnit) {
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
      this.callbacks.onRequestRender();
      this.refreshHud(true);
    }
  }

  public syncExplode(t: number, force = false): boolean {
    this.explodeFactor = t;
    if (!this.activeUnit || !this.ready) return false;
    const changed = this.activeUnit.updateExplode(t, force);
    if (changed) {
      this.activeUnit.updateExplodeGuides?.(t, true);
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
    this.selectedId = selectedId;
    this.hoveredId = hoveredId;
    this.hiddenIds = hiddenIds;
    this.isolatedId = isolatedId;
    this.renderMode = renderMode;
    if (!this.activeUnit || !this.ready) return;
    this.activeUnit.setVisualState(selectedId, hoveredId, hiddenIds, isolatedId, renderMode);
    this.activeUnit.updateExplodeGuides?.(this.explodeFactor, true);
  }

  public syncSectionPlane(active: boolean): void {
    if (!this.activeUnit || !this.ready) return;
    this.activeUnit.setClippingPlanes?.(active ? [this.clippingPlane] : []);
  }

  public syncPhysicsActive(active: boolean): void {
    this.physicsActive = active;
    if (!this.activeUnit || !this.ready) return;
    this.activeUnit.setPhysicsVisible?.(active);
  }

  public stepPhysics(elapsed: number): void {
    if (!this.activeUnit || !this.ready) return;
    this.activeUnit.updatePhysics?.(elapsed, this.explodeFactor, this.physicsActive);
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
      isPartHidden,
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
      isPartHidden,
      clippingPlane
    );
  }

  /**
   * On-demand render execution for MI Shoe V2 scene (strictly zero allocations in render path!).
   */
  public render(camera: THREE.Camera): void {
    if (!this.active || this.contextLost) return;
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
   * Automatic fallback to STD quality upon WebGL context loss/restoration in MI Shoe mode!
   */
  public async handleContextRestored(camera: THREE.Camera, sectionActive: boolean): Promise<void> {
    this.contextLost = false;
    this.contextLostRecoveryCount++;
    if (!this.active) return;

    this.quality = 'standard';
    this.callbacks.onQualityFallback('standard');
    await this.activate('standard', camera, {
      explode: this.explodeFactor,
      renderMode: this.renderMode,
      physicsActive: this.physicsActive,
      sectionActive,
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

  public getDiagnostics(): MiShoeV2Diagnostics {
    const info = this.renderer.info;
    return {
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
    };
  }

  private refreshHud(force: boolean): void {
    const info = this.renderer.info;
    const snap: PerfHudSnapshot = {
      drawCalls: this.lastDrawCalls,
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
