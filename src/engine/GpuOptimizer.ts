import * as THREE from 'three';

export interface GpuProfile {
  /** True on Android / iOS / Capacitor APK / narrow touch devices (or ?gpu=mobile) */
  isMobile: boolean;
  /** Maximum canvas devicePixelRatio cap (prevents 1.5K/2K Adreno GMEM tile overflow) */
  maxPixelRatio: number;
  /** WebGL MSAA flag (disabled on high-DPI mobile phones to save 75% GMEM/VRAM) */
  antialias: boolean;
  /** Procedural CanvasTexture resolution scale (0.5 on mobile -> 4x VRAM reduction) */
  textureScale: number;
  /** Maximum texture anisotropy */
  maxAnisotropy: number;
  /** Geometry curve/radial segment scale (0.62 on mobile -> ~40% fewer triangles) */
  curveScale: number;
  /** Extra angle threshold for CAD EdgesGeometry on mobile (reduces tiny noisy bevel lines) */
  edgeThresholdBoost: number;
  /** Consolidate secondary iridescent/clearcoat shader permutations on mobile Adreno */
  simplifyPhysicalShaders: boolean;
  /** Studio directional light count (reduced on mobile to shorten GLSL fragment compilation) */
  lightRigMode: 'full' | 'mobile';
}

function detectGpuProfile(): GpuProfile {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isMobile: false,
      maxPixelRatio: 2.0,
      antialias: true,
      textureScale: 1.0,
      maxAnisotropy: 4,
      curveScale: 1.0,
      edgeThresholdBoost: 0,
      simplifyPhysicalShaders: false,
      lightRigMode: 'full',
    };
  }

  const params = new URLSearchParams(window.location.search);
  const override = params.get('gpu');

  const ua = navigator.userAgent || '';
  const isCapacitor = Boolean((window as unknown as { Capacitor?: unknown }).Capacitor);
  const uaMobile = /Android|iPhone|iPad|iPod|Mobile|wv\)|POCO|Xiaomi|MIUI|HyperOS/i.test(ua);
  const narrowTouch =
    (navigator.maxTouchPoints ?? 0) > 0 && Math.min(window.screen.width, window.screen.height) <= 1024;

  const isMobile =
    override === 'mobile' ? true : override === 'desktop' ? false : isCapacitor || uaMobile || narrowTouch;

  if (isMobile) {
    return {
      isMobile: true,
      maxPixelRatio: 1.5,
      antialias: false,
      textureScale: 0.55,
      maxAnisotropy: 2,
      curveScale: 0.62,
      edgeThresholdBoost: 6,
      simplifyPhysicalShaders: true,
      lightRigMode: 'mobile',
    };
  }

  return {
    isMobile: false,
    maxPixelRatio: 2.0,
    antialias: true,
    textureScale: 1.0,
    maxAnisotropy: 4,
    curveScale: 1.0,
    edgeThresholdBoost: 0,
    simplifyPhysicalShaders: false,
    lightRigMode: 'full',
  };
}

/** Singleton GPU profile evaluated once at startup so geometry, materials & renderer match. */
export const GPU_PROFILE: GpuProfile = detectGpuProfile();

/** Shared native Power-of-Two Texture2DArray dimensions (single source of truth for Materials + GpuMegaBatch).
 *  Lean POT dimensions keep total Texture2DArray GPU VRAM safe on both mobile Adreno & desktop with ULTRA HDR FBOs! */
export const NATIVE_HI_TEX_W = 512;
export const NATIVE_HI_TEX_H = 512;
export const NATIVE_TILE_TEX_SIZE = GPU_PROFILE.isMobile ? 128 : 256;

/** Scale a geometry segment count cleanly according to the active GPU profile. */
export function scaleSegments(segments: number, minSegments = 6): number {
  if (GPU_PROFILE.curveScale >= 0.999) return segments;
  return Math.max(minSegments, Math.round(segments * GPU_PROFILE.curveScale));
}

/**
 * Downscale procedural CanvasTextures & consolidate heavy mobile PBR shader variants
 * so Adreno / mobile GPUs keep VRAM low and compile GLSL programs without Watchdog stalls.
 */
export function optimizeMaterialsForGpu(
  allMaterials: THREE.Material[],
  heroOpticalMaterials: Set<THREE.Material>,
  profile: GpuProfile
): { texturesOptimized: number; shadersSimplified: number } {
  const seenTextures = new Set<THREE.Texture>();
  const texturesOptimized = 0;
  let shadersSimplified = 0;

  const texSlots = [
    'map',
    'bumpMap',
    'roughnessMap',
    'metalnessMap',
    'emissiveMap',
    'alphaMap',
    'normalMap',
  ] as const;

  for (const mat of allMaterials) {
    const std = mat as THREE.MeshStandardMaterial;
    for (const slot of texSlots) {
      const tex = std[slot];
      if (!tex || seenTextures.has(tex)) continue;
      seenTextures.add(tex);
      tex.anisotropy = Math.min(tex.anisotropy || 1, profile.maxAnisotropy);
    }

    if (mat.userData.bumpChannel && std.bumpMap) {
      mat.userData.lutBumpScale = std.bumpScale;
      std.bumpMap = null;
      mat.needsUpdate = true;
      shadersSimplified++;
    }

    if (mat instanceof THREE.MeshPhysicalMaterial) {
      const isHero = heroOpticalMaterials.has(mat);
      let touched = false;
      if (!isHero && mat.iridescence > 0) {
        mat.userData.lutIridescence = mat.iridescence;
        mat.userData.lutIridescenceIOR = mat.iridescenceIOR;
        mat.iridescence = 0;
        touched = true;
      }
      if (!isHero && !mat.transparent && mat.clearcoat > 0) {
        mat.userData.lutClearcoat = mat.clearcoat;
        mat.userData.lutClearcoatRoughness = mat.clearcoatRoughness;
        mat.clearcoat = 0;
        touched = true;
      }
      if (touched) {
        mat.needsUpdate = true;
        shadersSimplified++;
      }
    }
  }

  return { texturesOptimized, shadersSimplified };
}

/**
 * Mark all CanvasTextures & Materials dirty after a WebGL context restore so every surface
 * immediately re-uploads cleanly to the new GPU context.
 */
export function refreshMaterialsAfterContextRestore(allMaterials: THREE.Material[]): void {
  const seenTextures = new Set<THREE.Texture>();
  const texSlots = [
    'map',
    'bumpMap',
    'roughnessMap',
    'metalnessMap',
    'emissiveMap',
    'alphaMap',
    'normalMap',
  ] as const;

  for (const mat of allMaterials) {
    const std = mat as THREE.MeshStandardMaterial;
    for (const slot of texSlots) {
      const tex = std[slot];
      if (tex && !seenTextures.has(tex)) {
        seenTextures.add(tex);
        tex.needsUpdate = true;
      }
    }
    mat.needsUpdate = true;
  }
}
