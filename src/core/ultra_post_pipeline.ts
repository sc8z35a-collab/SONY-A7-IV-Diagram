import * as THREE from 'three';
import { GPU_PROFILE } from '../engine/GpuOptimizer';
import { ResourceCache } from './resource_cache';

export type OpticalBokehMode = 'auto' | 'on' | 'off';
export type OpticalBokehStatus = 'active' | 'bypassed_swgl' | 'bypassed_load' | 'disabled';

// 2D Halton (base 2, base 3) low-discrepancy subpixel jitter sequence in [-0.5, +0.5] px
// Sample 0 is exact center (0, 0) so Frame 0 upon camera stop is razor-sharp with zero shift!
const HALTON_X = [0.0, -0.25, 0.25, -0.375, 0.125, -0.125, 0.375, -0.4375] as const;
const HALTON_Y = [0.0, -0.16667, 0.16667, -0.38889, -0.05556, 0.27778, -0.27778, 0.05556] as const;

const _savedClearColor = new THREE.Color();

/**
 * Stationary ULTRA Zero-Jaggy Anti-Aliasing + Conditional Load-Guarded F1.2 Bokeh + 0.5x FAST Blit Pipeline.
 *
 * Anti-Aliasing stack (Stationary ULTRA ONLY — 0ms impact during camera movement or idle!):
 *  1. WebGL2 Hardware MSAA HDR RenderTarget (samples = min(8, MAX_SAMPLES) — works even on mobile with antialias:false!)
 *  2. Supersampled render scale (1.5x-2.25x on hardware GPU; 1.0x on SwiftShader)
 *  3. Progressive Halton(2,3) 8x Subpixel SSAA Accumulation (up to 64x effective supersampling!)
 *     - Immediately resets on any camera/explode/visual change; auto-stops after N samples -> 0.0 draws/s idle!
 *  4. Conditional Load-Guarded F1.2 Optical Focus Bokeh (16-tap Vogel-Disk rotated per Halton sample = 128-tap!)
 *     - Reuses existing MSAA DepthTexture (0 extra scene geometry passes!)
 *     - Auto-bypasses on SwiftShader OR if pure bokeh pass cost exceeds 6.0ms ("処理負荷があまり変わらない場合限定")!
 *  5. Premultiplied-Alpha ACES Filmic + Linear->sRGB + Dither Resolve over pure #FFFFFF studio backdrop!
 *
 * FAST Mode Low-Res Blit:
 *  - Pre-allocated 0.5x FBO + 1-triangle bilinear blit eliminates 75% of pixel fillrate with 0 swapchain resize stalls!
 *
 * Strict CI Gate 3-1/3-2/3-3 & VRAM Zero-Leak Compliance:
 *  - ZERO `new THREE.ShaderMaterial` calls here (all acquired via ResourceCache.acquirePostProcessMaterial)
 *  - ZERO per-frame allocations inside `renderUltraStationary` / `renderFastBlit`
 *  - Complete deterministic disposal in `dispose(cache)` -> Δg=0, Δt=0, Refs=0!
 */
export class UltraPostPipeline {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly isWebGL2: boolean;
  private readonly isSoftwareGl: boolean;
  private readonly maxSamples: number;
  private readonly colorType: THREE.TextureDataType;

  private postScene: THREE.Scene | null = null;
  private postCamera: THREE.OrthographicCamera | null = null;
  private postGeo: THREE.BufferGeometry | null = null;
  private postQuad: THREE.Mesh | null = null;

  private accumMat: THREE.ShaderMaterial | null = null;
  private bokehMat: THREE.ShaderMaterial | null = null;
  private resolveMat: THREE.ShaderMaterial | null = null;
  private blitMat: THREE.ShaderMaterial | null = null;

  private msaaTarget: THREE.WebGLRenderTarget | null = null;
  private bokehTarget: THREE.WebGLRenderTarget | null = null;
  private accumA: THREE.WebGLRenderTarget | null = null;
  private accumB: THREE.WebGLRenderTarget | null = null;
  private fastTarget: THREE.WebGLRenderTarget | null = null;

  private rtWidth = 0;
  private rtHeight = 0;
  private fastW = 0;
  private fastH = 0;

  // Stationary Halton Accumulation State
  private sampleIndex = 0;
  private maxSamplesTarget = 8;
  private accumStartMs = 0;
  private accumReadA = true;
  private enabled = true;

  // F1.2 Bokeh State & Load Guard
  private bokehMode: OpticalBokehMode = 'auto';
  private bokehStatus: OpticalBokehStatus = 'active';
  private lastBokehMs = 0;
  private bokehLoadTripped = false;

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
    this.isWebGL2 = renderer.capabilities.isWebGL2;
    this.maxSamples = this.isWebGL2 ? Math.min(8, renderer.capabilities.maxSamples || 4) : 0;

    let swGl = false;
    let hasHalfFloat = false;
    try {
      const gl = renderer.getContext();
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const rend = String(
        dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) || ''
      );
      swGl = /SwiftShader|llvmpipe|Software|Mesa OffScreen/i.test(rend);
      hasHalfFloat = Boolean(
        gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float')
      );
    } catch {
      swGl = false;
      hasHalfFloat = false;
    }
    this.isSoftwareGl = swGl;
    this.colorType = this.isWebGL2 && hasHalfFloat ? THREE.HalfFloatType : THREE.UnsignedByteType;
    this.maxSamplesTarget = swGl ? 1 : GPU_PROFILE.isMobile ? 4 : 8;
    this.bokehStatus = swGl ? 'bypassed_swgl' : 'active';
  }

  public isEnabled(): boolean {
    return this.enabled && this.isWebGL2;
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.resetAccumulation();
  }

  public setOpticalBokehMode(mode: OpticalBokehMode): void {
    this.bokehMode = mode;
    this.bokehLoadTripped = false;
    this.updateBokehStatus();
    this.resetAccumulation();
  }

  public getOpticalBokehMode(): OpticalBokehMode {
    return this.bokehMode;
  }

  public getOpticalBokehStatus(): OpticalBokehStatus {
    return this.bokehStatus;
  }

  public getLastBokehMs(): number {
    return this.lastBokehMs;
  }

  public getSampleProgress(): { current: number; target: number; complete: boolean } {
    return {
      current: this.sampleIndex,
      target: this.maxSamplesTarget,
      complete: this.sampleIndex >= this.maxSamplesTarget,
    };
  }

  public needsMoreStationarySamples(): boolean {
    if (!this.isEnabled()) return false;
    if (this.sampleIndex <= 0) return true;
    if (this.sampleIndex >= this.maxSamplesTarget) return false;
    const elapsed = (typeof performance !== 'undefined' ? performance.now() : 0) - this.accumStartMs;
    // Hard wall-clock cap (180ms total) guarantees rapid convergence into 0.0 draws/s idle!
    return elapsed < 180;
  }

  public resetAccumulation(): void {
    this.sampleIndex = 0;
    this.accumReadA = true;
    this.accumStartMs = 0;
  }

  private updateBokehStatus(): void {
    if (this.bokehMode === 'off') {
      this.bokehStatus = 'disabled';
    } else if (this.bokehMode === 'on') {
      this.bokehStatus = 'active';
    } else if (this.isSoftwareGl) {
      this.bokehStatus = 'bypassed_swgl';
    } else if (this.bokehLoadTripped) {
      this.bokehStatus = 'bypassed_load';
    } else {
      this.bokehStatus = 'active';
    }
  }

  private ensureResources(cache: ResourceCache, cssW: number, cssH: number): boolean {
    if (!this.isWebGL2) return false;

    if (!this.postScene) {
      this.postScene = new THREE.Scene();
      this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Single fullscreen clip-space triangle (3 verts, 0 seams, 0 index buffer!)
      this.postGeo = new THREE.BufferGeometry();
      this.postGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
      );
      this.postGeo.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2)
      );

      this.accumMat = cache.acquirePostProcessMaterial('ultra_accum');
      this.bokehMat = cache.acquirePostProcessMaterial('ultra_bokeh');
      this.resolveMat = cache.acquirePostProcessMaterial('ultra_resolve');
      this.blitMat = cache.acquirePostProcessMaterial('fast_blit');

      this.postQuad = new THREE.Mesh(this.postGeo, this.resolveMat);
      this.postQuad.frustumCulled = false;
      this.postScene.add(this.postQuad);
    }

    // Supersampled internal resolution for crisp edge reconstruction even on 1.0 DPR monitors!
    const nativeDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const renderScale = this.isSoftwareGl
      ? 1.0
      : GPU_PROFILE.isMobile
        ? Math.min(2.0, Math.max(nativeDpr, 1.5))
        : Math.min(2.25, Math.max(nativeDpr, 1.5));

    const targetW = Math.max(64, Math.min(3840, Math.round(cssW * renderScale)));
    const targetH = Math.max(64, Math.min(2160, Math.round(cssH * renderScale)));

    if (targetW !== this.rtWidth || targetH !== this.rtHeight || !this.msaaTarget) {
      this.disposeRenderTargetsOnly();
      this.rtWidth = targetW;
      this.rtHeight = targetH;

      const depthTex = new THREE.DepthTexture(targetW, targetH, THREE.UnsignedIntType);
      depthTex.format = THREE.DepthFormat;
      depthTex.minFilter = THREE.NearestFilter;
      depthTex.magFilter = THREE.NearestFilter;

      this.msaaTarget = new THREE.WebGLRenderTarget(targetW, targetH, {
        type: this.colorType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        samples: this.maxSamples,
        depthBuffer: true,
        stencilBuffer: false,
        depthTexture: depthTex,
      });

      this.bokehTarget = new THREE.WebGLRenderTarget(targetW, targetH, {
        type: this.colorType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: false,
        stencilBuffer: false,
      });

      this.accumA = new THREE.WebGLRenderTarget(targetW, targetH, {
        type: this.colorType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: false,
        stencilBuffer: false,
      });

      this.accumB = new THREE.WebGLRenderTarget(targetW, targetH, {
        type: this.colorType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: false,
        stencilBuffer: false,
      });

      this.resetAccumulation();
    }

    return true;
  }

  private ensureFastTarget(cache: ResourceCache, cssW: number, cssH: number): boolean {
    if (!this.isWebGL2) return false;
    if (!this.postScene) {
      this.ensureResources(cache, cssW, cssH);
    }
    const fw = Math.max(64, Math.round(cssW * 0.5));
    const fh = Math.max(64, Math.round(cssH * 0.5));
    if (fw !== this.fastW || fh !== this.fastH || !this.fastTarget) {
      if (this.fastTarget) {
        this.fastTarget.dispose();
        this.fastTarget = null;
      }
      this.fastW = fw;
      this.fastH = fh;
      this.fastTarget = new THREE.WebGLRenderTarget(fw, fh, {
        type: THREE.UnsignedByteType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: true,
        stencilBuffer: false,
        samples: 0,
      });
    }
    return true;
  }

  /**
   * Render ONE stationary ULTRA pass (WebGL2 MSAA + Halton subpixel jitter + load-guarded F1.2 Bokeh +
   * Premultiplied HDR Accumulation + ACES Filmic/sRGB Dither Resolve).
   * Strictly zero heap allocations!
   */
  public renderUltraStationary(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    cache: ResourceCache,
    cssW: number,
    cssH: number,
    focusDist: number
  ): boolean {
    if (!this.isEnabled() || !this.ensureResources(cache, cssW, cssH)) {
      return false;
    }
    const msaa = this.msaaTarget;
    const bokehRt = this.bokehTarget;
    const accA = this.accumA;
    const accB = this.accumB;
    const quad = this.postQuad;
    const postScene = this.postScene;
    const postCam = this.postCamera;
    if (!msaa || !bokehRt || !accA || !accB || !quad || !postScene || !postCam) {
      return false;
    }
    if (!this.accumMat || !this.bokehMat || !this.resolveMat) return false;

    this.updateBokehStatus();
    const k = this.sampleIndex < this.maxSamplesTarget ? this.sampleIndex : this.maxSamplesTarget - 1;
    if (this.sampleIndex === 0) {
      this.accumStartMs = typeof performance !== 'undefined' ? performance.now() : 0;
    }

    // 1. Apply exact 2D Halton subpixel jitter via camera.setViewOffset (cleared immediately after render!)
    const jx = HALTON_X[k % HALTON_X.length];
    const jy = HALTON_Y[k % HALTON_Y.length];
    if (k > 0) {
      camera.setViewOffset(this.rtWidth, this.rtHeight, jx, jy, this.rtWidth, this.rtHeight);
    } else {
      camera.clearViewOffset();
    }

    // 2. Render ULTRA 3D scene into WebGL2 MSAA HDR FBO with premultiplied-alpha clear (0, 0, 0, 0)
    const prevBg = scene.background;
    const prevTone = this.renderer.toneMapping;
    const prevExp = this.renderer.toneMappingExposure;
    this.renderer.getClearColor(_savedClearColor);
    const prevClearAlpha = this.renderer.getClearAlpha();

    scene.background = null;
    this.renderer.setRenderTarget(msaa);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.clear(true, true, false);
    this.renderer.render(scene, camera);

    // Restore camera & scene background immediately
    camera.clearViewOffset();
    scene.background = prevBg;

    // 3. Optional Load-Guarded F1.2 Optical Focus Bokeh (0 extra scene passes, reuses msaa.depthTexture!)
    let sampleColorTex: THREE.Texture = msaa.texture;
    if (this.bokehStatus === 'active' && msaa.depthTexture && focusDist > 0.1) {
      const tb0 = typeof performance !== 'undefined' ? performance.now() : 0;
      const bu = this.bokehMat.uniforms;
      bu.tColor.value = msaa.texture;
      bu.tDepth.value = msaa.depthTexture;
      (bu.uTexelSize.value as THREE.Vector2).set(1 / this.rtWidth, 1 / this.rtHeight);
      bu.uCameraNear.value = camera.near;
      bu.uCameraFar.value = camera.far;
      bu.uFocusDist.value = focusDist;
      bu.uApertureScale.value = 11.5;
      bu.uMaxCocPx.value = Math.min(10.0, Math.max(5.5, this.rtHeight * 0.0085));
      bu.uRotationAngle.value = k * 0.78539816; // Rotate Vogel disk per Halton sample -> 128-tap smoothness!

      quad.material = this.bokehMat;
      this.renderer.setRenderTarget(bokehRt);
      this.renderer.render(postScene, postCam);
      const tb1 = typeof performance !== 'undefined' ? performance.now() : 0;
      this.lastBokehMs = +(tb1 - tb0).toFixed(2);

      // Strict "処理負荷があまり変わらない場合限定" guard: auto-bypass if bokeh pass exceeds 6ms!
      if (this.bokehMode === 'auto' && this.lastBokehMs > 6.0) {
        this.bokehLoadTripped = true;
        this.bokehStatus = 'bypassed_load';
      } else {
        sampleColorTex = bokehRt.texture;
      }
    }

    // 4. Premultiplied HDR Ping-Pong Accumulation (k=0 -> weight 1.0, k>0 -> 1/(k+1))
    const srcAccum = this.accumReadA ? accA : accB;
    const dstAccum = this.accumReadA ? accB : accA;
    const au = this.accumMat.uniforms;
    au.tPrev.value = srcAccum.texture;
    au.tCurr.value = sampleColorTex;
    au.uWeight.value = k === 0 ? 1.0 : 1.0 / (k + 1);

    quad.material = this.accumMat;
    this.renderer.setRenderTarget(dstAccum);
    this.renderer.render(postScene, postCam);
    this.accumReadA = !this.accumReadA;
    this.sampleIndex = Math.min(this.maxSamplesTarget, k + 1);

    // 5. Final ACES Filmic + Linear->sRGB + Dither Resolve over pure #FFFFFF studio backdrop!
    this.renderer.toneMapping = THREE.NoToneMapping;
    const ru = this.resolveMat.uniforms;
    ru.tDiffuse.value = dstAccum.texture;
    ru.uExposure.value = prevExp;

    quad.material = this.resolveMat;
    this.renderer.setRenderTarget(null);
    this.renderer.setClearColor(_savedClearColor, prevClearAlpha);
    this.renderer.render(postScene, postCam);
    this.renderer.toneMapping = prevTone;
    return true;
  }

  /**
   * Render FAST Mode scene into pre-allocated 0.5x FBO and bilinearly blit to screen
   * (4.0x fewer rasterized pixels with ZERO swapchain reallocation!).
   */
  public renderFastHalfResBlit(
    scene: THREE.Scene,
    camera: THREE.Camera,
    cache: ResourceCache,
    cssW: number,
    cssH: number
  ): boolean {
    if (!this.isWebGL2 || !this.ensureFastTarget(cache, cssW, cssH)) {
      return false;
    }
    const ft = this.fastTarget;
    const quad = this.postQuad;
    const postScene = this.postScene;
    const postCam = this.postCamera;
    if (!ft || !quad || !postScene || !postCam || !this.blitMat) {
      return false;
    }

    const prevTone = this.renderer.toneMapping;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.setRenderTarget(ft);
    this.renderer.clear(true, true, false);
    this.renderer.render(scene, camera);

    this.blitMat.uniforms.tDiffuse.value = ft.texture;
    quad.material = this.blitMat;
    this.renderer.setRenderTarget(null);
    this.renderer.render(postScene, postCam);
    this.renderer.toneMapping = prevTone;
    return true;
  }

  private disposeRenderTargetsOnly(): void {
    if (this.msaaTarget) {
      if (this.msaaTarget.depthTexture) {
        this.msaaTarget.depthTexture.dispose();
        this.msaaTarget.depthTexture = null;
      }
      this.msaaTarget.dispose();
      this.msaaTarget = null;
    }
    if (this.bokehTarget) {
      this.bokehTarget.dispose();
      this.bokehTarget = null;
    }
    if (this.accumA) {
      this.accumA.dispose();
      this.accumA = null;
    }
    if (this.accumB) {
      this.accumB.dispose();
      this.accumB = null;
    }
    this.rtWidth = 0;
    this.rtHeight = 0;
  }

  /** Complete zero-leak GPU resource disposal (guarantees Δg=0, Δt=0, Refs=0 on unit switch!). */
  public dispose(cache: ResourceCache): void {
    this.disposeRenderTargetsOnly();
    if (this.fastTarget) {
      this.fastTarget.dispose();
      this.fastTarget = null;
    }
    this.fastW = 0;
    this.fastH = 0;

    if (this.accumMat) {
      cache.releaseMaterialInstance(this.accumMat);
      this.accumMat = null;
    }
    if (this.bokehMat) {
      cache.releaseMaterialInstance(this.bokehMat);
      this.bokehMat = null;
    }
    if (this.resolveMat) {
      cache.releaseMaterialInstance(this.resolveMat);
      this.resolveMat = null;
    }
    if (this.blitMat) {
      cache.releaseMaterialInstance(this.blitMat);
      this.blitMat = null;
    }
    if (this.postGeo) {
      this.postGeo.dispose();
      this.postGeo = null;
    }
    this.postQuad = null;
    this.postScene = null;
    this.postCamera = null;
    this.resetAccumulation();
  }
}
