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
  motionProxyActive: boolean;
}

// Module-scoped zero-GC scratch objects for ULTRA tight-frustum shadow fitting & studio background
const _shadowCenter = new THREE.Vector3();
const _shadowSize = new THREE.Vector3();
const _bgColor = new THREE.Color(0xffffff);
const PMREM_LUT_MAGIC = 0x504d5231; // 'PMR1'

/**
 * Universal V2 Rendering Core for ANY unit registered in `src/units/registry.ts`.
 * Unifies:
 * - Dynamic lazy loading & time-sliced chunked build with abort cancellation
 * - 4-Tier Pipeline: STD LITE v2 (Dual-Atlas MatCap + GPU Explode), STD (Lambert+Phong),
 *   HIGH (PBR + PMREM), ULTRA 2.5x (1024x512 Softbox Cyclorama + 4096px PCFSoftShadowMap +
 *   Zero-Lag Dual-Resident Motion-Adaptive STD LITE v2 Proxy on camera movement!)
 * - Quality-tier DPR capping (LITE/STD <=1.0, HIGH <=1.5, ULTRA <=2.0) & dual shader warmup
 * - Dirty-flag on-demand rendering (0% idle GPU)
 * - Front-to-back flat BVH zero-GC raycasting (camera-drag hover pause + 30Hz throttle)
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
  // Co-resident STD LITE v2 motion proxy for Zero-Lag Motion-Adaptive ULTRA
  private liteProxyUnit: OptimizedUnit | null = null;
  private liteProxyBuildResult: UnitBuildResult | null = null;
  private ultraMotionProxyActive = false;
  private partById = new Map<string, CadPart>();
  private studioEnvRenderTarget: THREE.WebGLRenderTarget | null = null;
  private studioEnvDataTex: THREE.DataTexture | null = null;
  private cachedEnvQuality: QualityTier | null = null;
  private baselineEnvTexCount = 0;
  private shadersWarmed = false;
  private envDeferred = false;
  private ultraKeyLight: THREE.DirectionalLight | null = null;
  private ultraShadowCatcher: THREE.Mesh | null = null;
  private savedExternalPixelRatio = 1.0;

  private quality: QualityTier = 'ultra';
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

  public needsContinuousAnimation(_physicsActive: boolean): boolean {
    // Dynamic continuous motion execution disabled at runtime (system API retained).
    return false;
  }

  public isUltraMotionProxyActive(): boolean {
    return this.ultraMotionProxyActive;
  }

  /**
   * Zero-Lag Motion-Adaptive ULTRA <-> STD LITE v2 swap (~0.001ms visibility/uniform flip!).
   * Invoked ONLY on camera viewpoint movement (Drag / Wheel / Pinch / Camera Anim) — NEVER during Explode slider!
   * Both ULTRA and STD LITE v2 roots + shader programs stay co-resident in VRAM so transitions have ZERO lag/flash.
   */
  public setUltraMotionProxyActive(moving: boolean): boolean {
    if (
      this.quality !== 'ultra' ||
      !this.ready ||
      !this.buildResult ||
      !this.liteProxyBuildResult
    ) {
      this.ultraMotionProxyActive = false;
      return false;
    }
    if (moving === this.ultraMotionProxyActive) return false;
    this.ultraMotionProxyActive = moving;
    if (moving) {
      this.buildResult.rootGroup.visible = false;
      this.liteProxyBuildResult.rootGroup.visible = true;
      this.lightGroup.visible = false;
      this.scene.environment = null;
      this.renderer.shadowMap.enabled = false;
    } else {
      this.liteProxyBuildResult.rootGroup.visible = false;
      this.buildResult.rootGroup.visible = true;
      this.lightGroup.visible = true;
      this.scene.environment = this.studioEnvDataTex ?? this.studioEnvRenderTarget?.texture ?? null;
      this.renderer.shadowMap.enabled = QUALITY_TIER_CONFIG.ultra.shadowsEnabled;
    }
    return true;
  }

  public getRaycastIndex(): UnitRaycastIndex | null {
    return this.buildResult ? this.buildResult.raycastIndex : null;
  }

  public getUnitWorldBox(out: THREE.Box3): boolean {
    const ri = this.buildResult?.raycastIndex;
    if (!ri) return false;
    if (ri.boundsDirty && ri.syncBounds) ri.syncBounds();
    const box = ri.unitWorldBox;
    if (!box || box.isEmpty()) return false;
    out.copy(box);
    return true;
  }

  public setBackground(colorHex: number | null): void {
    if (colorHex === null) {
      this.scene.background = null;
      this.renderer.setClearAlpha(0);
    } else {
      _bgColor.setHex(colorHex);
      if (this.scene.background instanceof THREE.Color) {
        this.scene.background.copy(_bgColor);
      } else {
        this.scene.background = _bgColor;
      }
      this.renderer.setClearAlpha(1);
    }
  }

  public getPartWorldBox(partId: string, out: THREE.Box3): boolean {
    const idx = this.buildResult?.raycastIndex;
    if (!idx) return false;
    const pb = idx.partBoundsById.get(partId);
    if (!pb || pb.worldBox.isEmpty()) return false;
    out.copy(pb.worldBox);
    return true;
  }

  private isPpCaptureUrl(): boolean {
    if (typeof window === 'undefined') return false;
    return window.location.search.includes('pp=1');
  }

  private async tryFetchPrebakedPmrem(quality: QualityTier): Promise<THREE.DataTexture | null> {
    if (!this.isPpCaptureUrl() || typeof fetch === 'undefined') return null;
    try {
      const resp = await fetch(`/__pp_pmrem/${quality}.bin`, { cache: 'force-cache' });
      if (!resp.ok || resp.status === 204) return null;
      const buf = await resp.arrayBuffer();
      if (buf.byteLength < 16) return null;
      const hdr = new Uint32Array(buf, 0, 4);
      if (hdr[0] !== PMREM_LUT_MAGIC) return null;
      const w = hdr[1];
      const h = hdr[2];
      const kind = hdr[3]; // 1 = HalfFloatType (Uint16Array), 2 = UnsignedByteType (Uint8Array)
      if (w < 64 || h < 64 || w > 4096 || h > 4096) return null;
      if (kind === 1 && buf.byteLength === 16 + w * h * 4 * 2) {
        const pixels = new Uint16Array(buf, 16);
        const tex = new THREE.DataTexture(
          pixels,
          w,
          h,
          THREE.RGBAFormat,
          THREE.HalfFloatType,
          undefined,
          THREE.ClampToEdgeWrapping,
          THREE.ClampToEdgeWrapping,
          THREE.LinearFilter,
          THREE.LinearFilter
        );
        tex.mapping = THREE.CubeUVReflectionMapping;
        tex.generateMipmaps = false;
        tex.flipY = false;
        tex.colorSpace = THREE.LinearSRGBColorSpace;
        tex.needsUpdate = true;
        return tex;
      }
      if (kind === 2 && buf.byteLength === 16 + w * h * 4) {
        const pixels = new Uint8Array(buf, 16);
        const tex = new THREE.DataTexture(
          pixels,
          w,
          h,
          THREE.RGBAFormat,
          THREE.UnsignedByteType,
          undefined,
          THREE.ClampToEdgeWrapping,
          THREE.ClampToEdgeWrapping,
          THREE.LinearFilter,
          THREE.LinearFilter
        );
        tex.mapping = THREE.CubeUVReflectionMapping;
        tex.generateMipmaps = false;
        tex.flipY = false;
        tex.colorSpace = THREE.LinearSRGBColorSpace;
        tex.needsUpdate = true;
        return tex;
      }
    } catch {
      // Fall back to standard PMREM bake
    }
    return null;
  }

  private tryPersistBakedPmrem(quality: QualityTier, envRt: THREE.WebGLRenderTarget): void {
    if (!this.isPpCaptureUrl() || typeof fetch === 'undefined') return;
    try {
      const w = envRt.width;
      const h = envRt.height;
      const gl = this.renderer.getContext();
      const isHalf = envRt.texture.type === THREE.HalfFloatType;
      const isU8 = envRt.texture.type === THREE.UnsignedByteType;
      if (!isHalf && !isU8) return;
      const elemBytes = isHalf ? 2 : 1;
      const packet = new ArrayBuffer(16 + w * h * 4 * elemBytes);
      const hdr = new Uint32Array(packet, 0, 4);
      hdr[0] = PMREM_LUT_MAGIC;
      hdr[1] = w;
      hdr[2] = h;
      hdr[3] = isHalf ? 1 : 2;
      const pixels = isHalf ? new Uint16Array(packet, 16) : new Uint8Array(packet, 16);
      // Drain prior GL error state
      while (gl.getError() !== gl.NO_ERROR) {}
      this.renderer.readRenderTargetPixels(envRt, 0, 0, w, h, pixels);
      let readOk = gl.getError() === gl.NO_ERROR;
      if (!readOk && isHalf && gl instanceof WebGL2RenderingContext) {
        // WebGL2 spec guarantees (RGBA, FLOAT) readback on RGBA16F attachments
        const prevRt = this.renderer.getRenderTarget();
        this.renderer.setRenderTarget(envRt);
        const f32 = new Float32Array(w * h * 4);
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.FLOAT, f32);
        readOk = gl.getError() === gl.NO_ERROR;
        this.renderer.setRenderTarget(prevRt);
        if (readOk) {
          const out16 = pixels as Uint16Array;
          for (let i = 0; i < f32.length; i++) {
            out16[i] = THREE.DataUtils.toHalfFloat(f32[i]);
          }
        }
      }
      if (!readOk) return;
      // Sanity check non-zero content before uploading
      let nonZero = 0;
      const step = Math.max(1, Math.floor(pixels.length / 256));
      for (let i = 0; i < pixels.length; i += step) {
        if (pixels[i] !== 0) {
          nonZero++;
          break;
        }
      }
      if (nonZero === 0) return;
      void fetch(`/__pp_pmrem/${quality}.bin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: packet,
      }).catch(() => {});
    } catch {
      // Optional optimization; ignore readback errors
    }
  }

  private attachStudioEnvironment(
    quality: QualityTier,
    preloadedTex: THREE.DataTexture | null = null
  ): void {
    const cfg = QUALITY_TIER_CONFIG[quality];
    if (!cfg.enableStudioEnv) {
      this.disposeStudioEnvironment();
      return;
    }
    // Reuse already-resident PMREM environment when staying at the same quality tier (0ms!)
    if (this.cachedEnvQuality === quality && (this.studioEnvDataTex || this.studioEnvRenderTarget)) {
      this.scene.environment = this.studioEnvDataTex ?? this.studioEnvRenderTarget?.texture ?? null;
      return;
    }
    this.disposeStudioEnvironment();

    if (preloadedTex) {
      this.studioEnvDataTex = preloadedTex;
      this.cachedEnvQuality = quality;
      this.scene.environment = preloadedTex;
      return;
    }

    // Explicit PMREM bake + immediate pmrem.dispose() prevents Three.js WebGLCubeUVMaps
    // from retaining 8 internal LOD plane geometries + 1 pingPong texture permanently!
    const isUltra = quality === 'ultra';
    const envKey = isUltra ? 'studio_env_ultra' : 'studio_env';
    const rawEnvTex = this.cache.acquireTexture(envKey);
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const envRt = pmrem.fromEquirectangular(rawEnvTex);
    pmrem.dispose();
    this.cache.releaseTexture(envKey);
    this.studioEnvRenderTarget = envRt;
    this.cachedEnvQuality = quality;
    this.scene.environment = envRt.texture;
    this.tryPersistBakedPmrem(quality, envRt);
  }

  private disposeStudioEnvironment(): void {
    this.scene.environment = null;
    if (this.studioEnvRenderTarget) {
      this.studioEnvRenderTarget.dispose();
      this.studioEnvRenderTarget = null;
    }
    if (this.studioEnvDataTex) {
      this.studioEnvDataTex.dispose();
      this.studioEnvDataTex = null;
    }
    this.cachedEnvQuality = null;
  }

  private setupStudioLighting(
    quality: QualityTier,
    deferEnv = false,
    preloadedEnvTex: THREE.DataTexture | null = null
  ): void {
    const keepEnv =
      !deferEnv &&
      QUALITY_TIER_CONFIG[quality].enableStudioEnv &&
      this.cachedEnvQuality === quality &&
      Boolean(this.studioEnvDataTex || this.studioEnvRenderTarget);
    this.teardownStudioLighting(!keepEnv);

    const cfg = QUALITY_TIER_CONFIG[quality];

    // STD LITE uses pre-integrated Studio MatCap shaders -> ZERO dynamic scene lights needed!
    if (quality === 'standard_lite') {
      this.disposeStudioEnvironment();
      this.envDeferred = false;
      return;
    }

    const isStd = quality === 'standard';
    const isUltra = quality === 'ultra';

    // Physically-based Three.js r174 light units (useLegacyLights=false):
    // - STD has no PMREM IBL, so boost omnidirectional hemisphere & 3-point lights to match HIGH brightness (0% crushed blacks)
    // - ULTRA 2.5x pairs 4096px PCFSoftShadowMap key + razor-sharp architectural rim separation + 1024x512 Hasselblad softbox cyclorama
    const hemi = new THREE.HemisphereLight(
      0xffffff,
      isStd ? 0xeef3fa : isUltra ? 0xe2eaf6 : 0xedf2fa,
      isStd ? 2.85 : isUltra ? 0.92 : 1.08
    );
    hemi.position.set(0, 80, 0);
    hemi.matrixAutoUpdate = false;
    hemi.updateMatrix();

    const key = new THREE.DirectionalLight(
      isUltra ? 0xfffdf8 : 0xffffff,
      isStd ? 2.05 : isUltra ? 2.28 : 1.78
    );
    key.position.set(-72, 112, 68);
    key.matrixAutoUpdate = false;
    key.updateMatrix();
    key.target.matrixAutoUpdate = false;
    key.target.updateMatrix();

    if (isUltra && cfg.shadowsEnabled) {
      const maxTex = this.renderer.capabilities.maxTextureSize || 2048;
      let isSoftwareGl = false;
      try {
        const gl = this.renderer.getContext();
        const dbg = gl.getExtension('WEBGL_debug_renderer_info');
        const rend = String(dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) || '');
        isSoftwareGl = /SwiftShader|llvmpipe|Software|Mesa OffScreen/i.test(rend);
      } catch {
        isSoftwareGl = false;
      }
      const shadowRes = isSoftwareGl ? Math.min(2048, maxTex) : Math.min(4096, maxTex >= 4096 ? 4096 : 2048);
      key.castShadow = true;
      key.shadow.mapSize.set(shadowRes, shadowRes);
      key.shadow.bias = -0.00028;
      key.shadow.normalBias = 0.05;
      key.shadow.radius = 2.4;
      this.ultraKeyLight = key;

      // Subtle grounded studio contact-shadow catcher plane (cached & auto-disposed, zero leak!)
      const planeGeo = this.cache.acquireGeometry('ultra:shadow-catcher-plane', () => {
        const g = new THREE.PlaneGeometry(1, 1);
        g.rotateX(-Math.PI / 2);
        return g;
      });
      const shadowMat = this.cache.acquireShadowMaterial('ultra-ground', {
        color: 0x0f172a,
        opacity: 0.18,
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
      isUltra ? 0xebf4ff : 0xf4f8ff,
      isStd ? 1.45 : isUltra ? 0.84 : 0.92
    );
    fill.position.set(66, 24, 86);
    fill.matrixAutoUpdate = false;
    fill.updateMatrix();

    const rim = new THREE.DirectionalLight(
      isUltra ? 0xdbeafe : 0xeef6ff,
      isStd ? 1.35 : isUltra ? 1.48 : 1.02
    );
    rim.position.set(82, 48, -84);
    rim.matrixAutoUpdate = false;
    rim.updateMatrix();

    this.lightGroup.add(hemi, key, key.target, fill, rim);
    this.lightGroup.visible = true;
    this.lightGroup.updateMatrixWorld(true);

    if (cfg.enableStudioEnv) {
      if (deferEnv) {
        this.envDeferred = true;
        this.scene.environment = null;
      } else {
        this.envDeferred = false;
        this.attachStudioEnvironment(quality, preloadedEnvTex);
      }
    } else {
      this.envDeferred = false;
      this.disposeStudioEnvironment();
    }
  }

  public ensureShadersWarmed(camera: THREE.Camera): void {
    if (!this.active || !this.ready || this.contextLost) return;
    if (this.envDeferred && QUALITY_TIER_CONFIG[this.quality].enableStudioEnv) {
      this.envDeferred = false;
      this.attachStudioEnvironment(this.quality, null);
    }
    if (!this.shadersWarmed) {
      this.shaderWarmupMs = this.cache.warmupShaders(this.renderer, this.scene, camera);
      this.shadersWarmed = true;
    }
  }

  /**
   * Tightly fit ULTRA's 2048x2048 PCFSoftShadowMap frustum & studio contact-shadow floor
   * to the active unit's exact world bounding box (razor-sharp mechanical shadows + 0 wasted texels!).
   */
  private fitUltraShadowRig(): void {
    if (this.quality !== 'ultra' || !this.ultraKeyLight) return;
    const ri = this.buildResult?.raycastIndex;
    if (!ri) return;
    if (ri.boundsDirty && ri.syncBounds) ri.syncBounds();
    const box = ri.unitWorldBox;
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

  private teardownStudioLighting(disposeEnv = true): void {
    if (this.ultraKeyLight?.shadow?.map) {
      this.ultraKeyLight.shadow.map.dispose();
      this.ultraKeyLight.shadow.map = null;
    }
    this.ultraKeyLight = null;
    this.ultraShadowCatcher = null;
    if (this.lightGroup.children.length > 0) {
      disposeObject3D(this.lightGroup, this.cache, false);
    }
    if (disposeEnv) {
      this.disposeStudioEnvironment();
    }
  }

  private applyQualityRendererCaps(quality: QualityTier): void {
    const cfg = QUALITY_TIER_CONFIG[quality];
    this.renderer.shadowMap.enabled = cfg.shadowsEnabled && !this.ultraMotionProxyActive;
    if (cfg.shadowsEnabled) {
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      // On-demand shadow baking: bake shadows only when geometry/explode/subView changes (0% orbit overhead!)
      this.renderer.shadowMap.autoUpdate = false;
      this.renderer.shadowMap.needsUpdate = true;
    } else {
      this.renderer.shadowMap.autoUpdate = false;
    }
    this.renderer.toneMappingExposure = quality === 'ultra' ? 1.18 : 1.15;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const targetDpr = Math.min(dpr, cfg.maxPixelRatio);
    this.renderer.setPixelRatio(targetDpr);
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h);
  }

  private disposeActiveUnitResources(disposeEnv = true): void {
    this.ultraMotionProxyActive = false;
    this.shadersWarmed = false;
    if (this.liteProxyUnit) {
      this.liteProxyUnit.dispose(this.cache);
      this.liteProxyUnit = null;
    }
    this.liteProxyBuildResult = null;
    if (this.activeUnit) {
      this.activeUnit.dispose(this.cache);
      this.activeUnit = null;
    }
    this.buildResult = null;
    this.partById.clear();
    this.ready = false;
    this.teardownStudioLighting(disposeEnv);
    this.lightGroup.visible = true;
    this.renderer.renderLists.dispose();
  }

  /**
   * Enter (or switch to) any registered V2 unit:
   * - Disposes any prior V2 unit and verifies Δg=0, Δt=0 before capturing new baseline
   * - Dynamically imports the target unit via registry.ts
   * - Runs time-sliced quality-tiered build (and co-resident STD LITE v2 motion proxy when quality === 'ultra')
   * - Pre-compiles shaders for BOTH ULTRA and STD LITE v2 before first visible frame (0 Shader Hitch!)
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
      synchronous?: boolean;
      skipMotionProxy?: boolean;
      deferShaderWarmup?: boolean;
      skipRenderCallback?: boolean;
    }
  ): Promise<void> {
    const token = ++this.activationToken;
    const wasActive = this.active;
    const reuseSameQualityEnv =
      wasActive &&
      !initialState.deferShaderWarmup &&
      QUALITY_TIER_CONFIG[quality].enableStudioEnv &&
      this.cachedEnvQuality === quality &&
      Boolean(this.studioEnvDataTex || this.studioEnvRenderTarget);

    if (!wasActive) {
      this.savedExternalPixelRatio = this.renderer.getPixelRatio();
      this.vramMonitor.captureBaseline(this.renderer);
      this.baselineEnvTexCount = this.studioEnvDataTex || this.studioEnvRenderTarget ? 1 : 0;
    } else {
      this.disposeActiveUnitResources(!reuseSameQualityEnv);
      const retainedEnvTex = this.studioEnvDataTex || this.studioEnvRenderTarget ? 1 : 0;
      this.vramMonitor.verifyAfterDispose(
        this.renderer,
        this.cache,
        retainedEnvTex - this.baselineEnvTexCount
      );
      this.vramMonitor.captureBaseline(this.renderer);
      this.baselineEnvTexCount = retainedEnvTex;
    }

    this.active = true;
    this.ready = false;
    this.shadersWarmed = false;
    this.ultraMotionProxyActive = false;
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

    // Fetch pre-baked lossless PMREM binary LUT concurrently with unit module import when in ?pp=1 mode!
    const needEnvFetch =
      !initialState.deferShaderWarmup &&
      !reuseSameQualityEnv &&
      QUALITY_TIER_CONFIG[quality].enableStudioEnv;

    try {
      const [unit, preloadedEnvTex] = await Promise.all([
        loadRegisteredUnit(unitId),
        needEnvFetch ? this.tryFetchPrebakedPmrem(quality) : Promise.resolve(null),
      ]);
      if (token !== this.activationToken || !this.active) {
        preloadedEnvTex?.dispose();
        return;
      }

      this.setupStudioLighting(quality, Boolean(initialState.deferShaderWarmup), preloadedEnvTex);

      const planes = initialState.sectionActive ? [this.clippingPlane] : [];
      const built = await unit.build(quality, this.cache, {
        frameBudgetMs: 14.0,
        synchronous: Boolean(initialState.synchronous),
        clippingPlanes: planes,
        subView: this.subView,
        integratedMode: this.integratedMode,
        isAborted: () => token !== this.activationToken || !this.active,
      });

      if (token !== this.activationToken || !this.active) {
        unit.dispose(this.cache);
        return;
      }

      // When quality === 'ultra', co-build a resident STD LITE v2 motion proxy for interactive camera motion
      // (bypassed during static deterministic captures via skipMotionProxy for 2x faster ULTRA builds!).
      let proxyUnit: OptimizedUnit | null = null;
      let proxyBuilt: UnitBuildResult | null = null;
      if (quality === 'ultra' && !initialState.skipMotionProxy) {
        const candidateProxy = await loadRegisteredUnit(unitId);
        if (token !== this.activationToken || !this.active) {
          unit.dispose(this.cache);
          return;
        }
        const candidateProxyBuilt = await candidateProxy.build('standard_lite', this.cache, {
          frameBudgetMs: 14.0,
          synchronous: Boolean(initialState.synchronous),
          clippingPlanes: planes,
          subView: this.subView,
          integratedMode: this.integratedMode,
          isAborted: () => token !== this.activationToken || !this.active,
        });
        if (token !== this.activationToken || !this.active) {
          candidateProxy.dispose(this.cache);
          unit.dispose(this.cache);
          return;
        }
        proxyUnit = candidateProxy;
        proxyBuilt = candidateProxyBuilt;
      }

      this.activeUnit = unit;
      this.buildResult = built;
      this.liteProxyUnit = proxyUnit;
      this.liteProxyBuildResult = proxyBuilt;
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
      unit.setPhysicsVisible?.(false);
      unit.updateExplodeGuides?.(this.explodeFactor, true);

      if (proxyUnit && proxyBuilt) {
        this.scene.add(proxyBuilt.rootGroup);
        proxyUnit.setClippingPlanes?.(planes);
        proxyUnit.setSubView?.(this.subView);
        proxyUnit.updateExplode(this.explodeFactor, true);
        proxyUnit.setVisualState(
          this.selectedId,
          this.hoveredId,
          this.hiddenIds,
          this.isolatedId,
          this.renderMode
        );
        proxyUnit.setPhysicsVisible?.(false);
        proxyUnit.updateExplodeGuides?.(this.explodeFactor, true);
        // Keep proxy visible ONLY during shader pre-compilation so first drag has 0.00ms compile hitch!
        proxyBuilt.rootGroup.visible = true;
      }

      this.fitUltraShadowRig();

      // Pre-compile all active V2 shader programs (unless explicitly deferred for non-3D capture modes)
      if (!this.contextLost && !initialState.deferShaderWarmup) {
        this.shaderWarmupMs = this.cache.warmupShaders(this.renderer, this.scene, camera);
        this.shadersWarmed = true;
      }

      if (proxyBuilt) {
        proxyBuilt.rootGroup.visible = false;
      }

      this.ready = true;
      this.vramMonitor.recordActivePeak(this.renderer);
      this.callbacks.onBuildComplete(unitId, this.getParts());
      if (!initialState.skipRenderCallback) {
        this.callbacks.onRequestRender();
      }
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
    this.disposeActiveUnitResources(true);
    const verification = this.vramMonitor.verifyAfterDispose(
      this.renderer,
      this.cache,
      -this.baselineEnvTexCount
    );
    this.baselineEnvTexCount = 0;

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
      if (this.liteProxyUnit) {
        this.liteProxyUnit.setVisualState(
          this.selectedId,
          this.hoveredId,
          this.hiddenIds,
          this.isolatedId,
          this.renderMode
        );
        this.liteProxyUnit.updateExplode(this.explodeFactor, true);
        this.liteProxyUnit.updateExplodeGuides?.(this.explodeFactor, true);
      }
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
    if (this.liteProxyUnit) {
      this.liteProxyUnit.setSubView?.(subView);
      this.liteProxyUnit.updateExplodeGuides?.(this.explodeFactor, true);
    }
    this.fitUltraShadowRig();
    this.callbacks.onRequestRender();
    this.refreshHud(true);
  }

  public syncExplode(t: number, force = false): boolean {
    this.explodeFactor = t;
    if (!this.activeUnit || !this.ready) return false;
    const changed = this.activeUnit.updateExplode(t, force);
    if (this.liteProxyUnit) {
      this.liteProxyUnit.updateExplode(t, force);
    }
    if (changed) {
      this.activeUnit.updateExplodeGuides?.(t, true);
      if (this.liteProxyUnit) {
        this.liteProxyUnit.updateExplodeGuides?.(t, true);
      }
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
    if (this.liteProxyUnit) {
      this.liteProxyUnit.setVisualState(selectedId, hoveredId, hiddenIds, isolatedId, renderMode);
    }
    if (guidesNeedSync) {
      if (this.explodeFactor >= 0.02) {
        this.activeUnit.updateExplodeGuides?.(this.explodeFactor, true);
        if (this.liteProxyUnit) {
          this.liteProxyUnit.updateExplodeGuides?.(this.explodeFactor, true);
        }
      }
      if (this.quality === 'ultra') {
        this.fitUltraShadowRig();
      }
    }
  }

  public syncSectionPlane(active: boolean): void {
    if (!this.activeUnit || !this.ready) return;
    const planes = active ? [this.clippingPlane] : [];
    this.activeUnit.setClippingPlanes?.(planes);
    if (this.liteProxyUnit) {
      this.liteProxyUnit.setClippingPlanes?.(planes);
    }
    if (this.quality === 'ultra') {
      this.renderer.shadowMap.needsUpdate = true;
    }
  }

  public syncPhysicsActive(active: boolean): void {
    // Store flag for API compatibility while keeping runtime dynamic physics disabled
    this.physicsActive = active;
    if (!this.activeUnit || !this.ready) return;
    this.activeUnit.setPhysicsVisible?.(false);
    if (this.liteProxyUnit) {
      this.liteProxyUnit.setPhysicsVisible?.(false);
    }
  }

  public stepPhysics(_elapsed: number, _delta = 0.016): boolean {
    // Dynamic physics motion execution disabled at runtime (system code retained).
    return false;
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
      motionProxyActive: this.ultraMotionProxyActive,
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
