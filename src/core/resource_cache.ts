import * as THREE from 'three';
import { RenderMode } from '../assemblies/types';
import { QualityTier } from './unit_contract';

export type MaterialBucketKey =
  // Original MI Shoe & Core Metallic / Structural Buckets (12)
  | 'metal_hero'
  | 'matte_chassis'
  | 'elastomer_rubber'
  | 'pcb_textured'
  | 'silicon_hero'
  | 'gold_plating'
  | 'becu_spring'
  | 'stainless_machined'
  | 'matte_black_anodized'
  | 'pin_carrier_gloss'
  | 'copper_coil'
  | 'torus_seal'
  // Expanded Shared Metallic & Thermal Buckets (7)
  | 'copper_thermal'
  | 'brass_precision'
  | 'titanium_machined'
  | 'magnesium_cast'
  | 'iron_magnetic'
  | 'solder_silver'
  | 'emi_shield_metal'
  // Shared Optical Glass, AR Coating & Translucent Buckets (6)
  | 'optical_glass_clear'
  | 'optical_glass_ed'
  | 'optical_ar_iridescent'
  | 'optical_dichroic'
  | 'glass_clear_housing'
  | 'membrane_translucent'
  // Shared Silicon, Semiconductor & Nanoscale Buckets (5)
  | 'silicon_wafer_dark'
  | 'silicon_photodiode'
  | 'silicon_dielectric'
  | 'cucu_hybrid_copper'
  | 'cfa_gloss_filter'
  // Shared Electronics, Structural, Composite & Emissive Buckets (8)
  | 'abf_substrate'
  | 'ic_epoxy_dark'
  | 'polyimide_fpc'
  | 'ceramic_alumina'
  | 'carbon_fiber'
  | 'leatherette_grip'
  | 'foam_felt_matte'
  | 'emissive_glow';

export const ALL_MATERIAL_BUCKETS: readonly MaterialBucketKey[] = [
  'metal_hero',
  'matte_chassis',
  'elastomer_rubber',
  'pcb_textured',
  'silicon_hero',
  'gold_plating',
  'becu_spring',
  'stainless_machined',
  'matte_black_anodized',
  'pin_carrier_gloss',
  'copper_coil',
  'torus_seal',
  'copper_thermal',
  'brass_precision',
  'titanium_machined',
  'magnesium_cast',
  'iron_magnetic',
  'solder_silver',
  'emi_shield_metal',
  'optical_glass_clear',
  'optical_glass_ed',
  'optical_ar_iridescent',
  'optical_dichroic',
  'glass_clear_housing',
  'membrane_translucent',
  'silicon_wafer_dark',
  'silicon_photodiode',
  'silicon_dielectric',
  'cucu_hybrid_copper',
  'cfa_gloss_filter',
  'abf_substrate',
  'ic_epoxy_dark',
  'polyimide_fpc',
  'ceramic_alumina',
  'carbon_fiber',
  'leatherette_grip',
  'foam_felt_matte',
  'emissive_glow',
];

interface RefEntry<T> {
  resource: T;
  refCount: number;
  depTextures?: string[];
}

export interface ResourceCacheStats {
  materials: number;
  geometries: number;
  textures: number;
  totalRefs: number;
  activeMaterialKeys: string[];
  activeGeometryKeys: string[];
  activeTextureKeys: string[];
}

export interface QualityTierConfig {
  readonly maxPixelRatio: number;
  readonly curveSegments: number;
  readonly radialSegments: number;
  readonly torusTubularSegments: number;
  readonly sphereSegments: number;
  readonly shadowsEnabled: boolean;
  readonly postProcessEnabled: boolean;
  readonly enableStudioEnv: boolean;
  readonly showSolidStructuralEdges: boolean;
  readonly maxHeroTextureDim: number;
}

export const QUALITY_TIER_CONFIG: Record<QualityTier, QualityTierConfig> = {
  standard_lite: {
    maxPixelRatio: 1.0,
    curveSegments: 5,
    radialSegments: 6,
    torusTubularSegments: 6,
    sphereSegments: 6,
    shadowsEnabled: false,
    postProcessEnabled: false,
    enableStudioEnv: false,
    showSolidStructuralEdges: false,
    maxHeroTextureDim: 128,
  },
  standard: {
    maxPixelRatio: 1.0,
    curveSegments: 10,
    radialSegments: 14,
    torusTubularSegments: 14,
    sphereSegments: 12,
    shadowsEnabled: false,
    postProcessEnabled: false,
    enableStudioEnv: false,
    showSolidStructuralEdges: true,
    maxHeroTextureDim: 512,
  },
  high: {
    maxPixelRatio: 1.5,
    curveSegments: 14,
    radialSegments: 18,
    torusTubularSegments: 18,
    sphereSegments: 16,
    shadowsEnabled: false,
    postProcessEnabled: false,
    enableStudioEnv: true,
    showSolidStructuralEdges: true,
    maxHeroTextureDim: 512,
  },
  ultra: {
    maxPixelRatio: 2.0,
    curveSegments: 24,
    radialSegments: 28,
    torusTubularSegments: 28,
    sphereSegments: 24,
    shadowsEnabled: true,
    postProcessEnabled: false,
    enableStudioEnv: true,
    showSolidStructuralEdges: true,
    maxHeroTextureDim: 2048,
  },
};

/**
 * Smooth, hue-preserving dark-tone toe lift for CAD shadow readability.
 * Lifts extreme near-black tints (0x090b0f..0x2c323d) cleanly into legible studio charcoal
 * so ACESFilmicToneMapping never crushes dark housings/grips/barrels into flat #000,
 * while leaving midtones and bright accent colors 100% untouched.
 */
export function liftDarkCadTint(hex: number): number {
  const r = ((hex >> 16) & 0xff) / 255;
  const g = ((hex >> 8) & 0xff) / 255;
  const b = (hex & 0xff) / 255;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const threshold = 0.3;
  if (luma >= threshold) return hex;

  const t = 1 - luma / threshold;
  const lift = 0.195 * t * t;
  const nr = Math.min(1, r + lift * 0.96);
  const ng = Math.min(1, g + lift * 0.99);
  const nb = Math.min(1, b + lift * 1.05);
  return (
    ((Math.round(nr * 255) & 0xff) << 16) |
    ((Math.round(ng * 255) & 0xff) << 8) |
    (Math.round(nb * 255) & 0xff)
  );
}

export function getCadTintLuma(hex: number): number {
  const r = ((hex >> 16) & 0xff) / 255;
  const g = ((hex >> 8) & 0xff) / 255;
  const b = (hex & 0xff) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Unclamped HDR float sentinel RGB triplets written into BatchedMesh/InstancedMesh `setColorAt()`.
 * Detected directly in vertex shaders across ULTRA/HIGH/STD/LITE/FAST/Play Ground with ZERO extra draw calls:
 *  - `CAD_SELECT_SENTINEL` : Strong vivid electric cobalt blue + Fresnel rim glow (unmistakable even on black/chrome)
 *  - `CAD_HOVER_SENTINEL`  : Subtle luminous sky-blue hover highlight
 *  - `PG_ERROR_SELECT_SENTINEL` / `PG_WARN_SELECT_SENTINEL` : Play Ground simultaneous Error/Warn + Selected blue rim
 */
export const CAD_SELECT_SENTINEL: readonly [number, number, number] = [0.02, 0.35, 2.45];
export const CAD_HOVER_SENTINEL: readonly [number, number, number] = [0.16, 0.56, 1.62];
export const PG_ERROR_SELECT_SENTINEL: readonly [number, number, number] = [2.5, 0.0, 2.45];
export const PG_WARN_SELECT_SENTINEL: readonly [number, number, number] = [0.0, 2.5, 2.45];

export interface MaterialSpec {
  readonly color: number;
  readonly metalness: number;
  readonly roughness: number;
  /** Only hero metallic/optical/semiconductor materials upgrade to MeshPhysicalMaterial in ULTRA */
  readonly ultraPhysical?: {
    readonly clearcoat: number;
    readonly clearcoatRoughness: number;
    readonly iridescence?: number;
    readonly iridescenceIOR?: number;
    readonly ior?: number;
    readonly reflectivity?: number;
  };
  /** Use MeshLambertMaterial in STD when non-metallic/matte for lowest ALU cost */
  readonly stdLambert?: boolean;
  readonly mapTextureKey?: ProceduralTextureKey;
  readonly bumpTextureKey?: ProceduralTextureKey;
  readonly bumpScale?: number;
  readonly emissive?: number;
  readonly emissiveIntensity?: number;
  readonly transparent?: boolean;
  readonly opacity?: number;
  readonly depthWrite?: boolean;
}

export type ProceduralTextureKey =
  | 'studio_env'
  | 'studio_env_ultra'
  | 'matcap_studio_matte'
  | 'matcap_studio_metal'
  | 'matcap_studio_dual'
  | 'lite_explode_dummy'
  | 'cnc_brushed'
  | 'mg_grain'
  | 'hdi_pcb'
  | 'silicon_die'
  | 'copper_coil'
  | 'carbon_weave'
  | 'leather_grain'
  | 'wafer_grid'
  | 'optical_diffraction'
  | 'ceramic_grain'
  | 'mesh_grid';

export interface LiteMatcapUniforms {
  uExplode: { value: number };
  uExplodeTex: { value: THREE.DataTexture };
  uExplodeTexW: { value: number };
  uExplodeActive: { value: number };
}

export type HeroCanvasPainter = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) => void;

export interface HeroMaterialSpec {
  readonly bucket: MaterialBucketKey;
  readonly width: number;
  readonly height: number;
  readonly painter: HeroCanvasPainter;
  readonly baseColor?: number;
  readonly metalness?: number;
  readonly roughness?: number;
  readonly transparent?: boolean;
  readonly opacity?: number;
  readonly depthWrite?: boolean;
  readonly emissive?: number;
  readonly emissiveIntensity?: number;
  readonly repeatX?: number;
  readonly repeatY?: number;
  readonly wrapRepeat?: boolean;
  readonly fallbackColor?: number;
}

export const MATERIAL_SPECS: Record<MaterialBucketKey, MaterialSpec> = {
  // --- Original 12 MI Shoe / Core Buckets (verbatim specs for 0 regression) ---
  metal_hero: {
    color: 0xffffff,
    metalness: 0.90,
    roughness: 0.22,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.016,
    ultraPhysical: { clearcoat: 0.32, clearcoatRoughness: 0.14 },
  },
  matte_chassis: {
    color: 0xffffff,
    metalness: 0.26,
    roughness: 0.50,
    stdLambert: true,
    bumpTextureKey: 'mg_grain',
    bumpScale: 0.025,
  },
  elastomer_rubber: {
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.86,
    stdLambert: true,
    bumpTextureKey: 'mg_grain',
    bumpScale: 0.04,
  },
  pcb_textured: {
    color: 0xffffff,
    metalness: 0.22,
    roughness: 0.42,
    stdLambert: true,
    mapTextureKey: 'hdi_pcb',
    bumpTextureKey: 'hdi_pcb',
    bumpScale: 0.028,
  },
  silicon_hero: {
    color: 0xffffff,
    metalness: 0.42,
    roughness: 0.24,
    ultraPhysical: {
      clearcoat: 0.55,
      clearcoatRoughness: 0.14,
      iridescence: 0.45,
      iridescenceIOR: 1.65,
    },
  },
  gold_plating: {
    color: 0xffffff,
    metalness: 0.94,
    roughness: 0.18,
    ultraPhysical: { clearcoat: 0.36, clearcoatRoughness: 0.12 },
  },
  becu_spring: {
    color: 0xffffff,
    metalness: 0.89,
    roughness: 0.23,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.02,
    ultraPhysical: { clearcoat: 0.24, clearcoatRoughness: 0.16 },
  },
  stainless_machined: {
    color: 0xffffff,
    metalness: 0.90,
    roughness: 0.21,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.015,
    ultraPhysical: { clearcoat: 0.30, clearcoatRoughness: 0.14 },
  },
  matte_black_anodized: {
    color: 0xffffff,
    metalness: 0.48,
    roughness: 0.46,
  },
  pin_carrier_gloss: {
    color: 0xffffff,
    metalness: 0.14,
    roughness: 0.26,
    ultraPhysical: { clearcoat: 0.58, clearcoatRoughness: 0.14 },
  },
  copper_coil: {
    color: 0xffffff,
    metalness: 0.88,
    roughness: 0.24,
    mapTextureKey: 'copper_coil',
    bumpTextureKey: 'copper_coil',
    bumpScale: 0.03,
    ultraPhysical: { clearcoat: 0.22, clearcoatRoughness: 0.18 },
  },
  torus_seal: {
    color: 0xffffff,
    metalness: 0.36,
    roughness: 0.52,
    stdLambert: true,
  },

  // --- Expanded Shared Metallic & Thermal Buckets (7) ---
  copper_thermal: {
    color: 0xffffff,
    metalness: 0.90,
    roughness: 0.24,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.018,
    ultraPhysical: { clearcoat: 0.26, clearcoatRoughness: 0.18 },
  },
  brass_precision: {
    color: 0xffffff,
    metalness: 0.91,
    roughness: 0.22,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.016,
    ultraPhysical: { clearcoat: 0.28, clearcoatRoughness: 0.15 },
  },
  titanium_machined: {
    color: 0xffffff,
    metalness: 0.86,
    roughness: 0.27,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.018,
    ultraPhysical: { clearcoat: 0.25, clearcoatRoughness: 0.18 },
  },
  magnesium_cast: {
    color: 0xffffff,
    metalness: 0.62,
    roughness: 0.44,
    bumpTextureKey: 'mg_grain',
    bumpScale: 0.032,
  },
  iron_magnetic: {
    color: 0xffffff,
    metalness: 0.84,
    roughness: 0.30,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.018,
  },
  solder_silver: {
    color: 0xffffff,
    metalness: 0.93,
    roughness: 0.16,
    ultraPhysical: { clearcoat: 0.35, clearcoatRoughness: 0.12 },
  },
  emi_shield_metal: {
    color: 0xffffff,
    metalness: 0.84,
    roughness: 0.28,
    bumpTextureKey: 'mesh_grid',
    bumpScale: 0.022,
  },

  // --- Shared Optical Glass, AR Coating & Translucent Buckets (6) ---
  optical_glass_clear: {
    color: 0xffffff,
    metalness: 0.04,
    roughness: 0.06,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    ultraPhysical: {
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      iridescence: 0.28,
      iridescenceIOR: 1.48,
      ior: 1.52,
      reflectivity: 0.9,
    },
  },
  optical_glass_ed: {
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.05,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    ultraPhysical: {
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      iridescence: 0.42,
      iridescenceIOR: 1.58,
      ior: 1.56,
      reflectivity: 0.92,
    },
  },
  optical_ar_iridescent: {
    color: 0xffffff,
    metalness: 0.10,
    roughness: 0.07,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
    ultraPhysical: {
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      iridescence: 0.88,
      iridescenceIOR: 1.72,
      ior: 1.62,
      reflectivity: 0.95,
    },
  },
  optical_dichroic: {
    color: 0xffffff,
    metalness: 0.22,
    roughness: 0.08,
    transparent: true,
    opacity: 0.54,
    depthWrite: false,
    ultraPhysical: {
      clearcoat: 0.95,
      clearcoatRoughness: 0.05,
      iridescence: 0.95,
      iridescenceIOR: 1.85,
    },
  },
  glass_clear_housing: {
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.08,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    ultraPhysical: { clearcoat: 0.92, clearcoatRoughness: 0.06 },
  },
  membrane_translucent: {
    color: 0xffffff,
    metalness: 0.08,
    roughness: 0.24,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
    ultraPhysical: { clearcoat: 0.45, clearcoatRoughness: 0.18 },
  },

  // --- Shared Silicon, Semiconductor & Nanoscale Buckets (5) ---
  silicon_wafer_dark: {
    color: 0xffffff,
    metalness: 0.52,
    roughness: 0.16,
    mapTextureKey: 'wafer_grid',
    bumpTextureKey: 'wafer_grid',
    bumpScale: 0.018,
    ultraPhysical: {
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
      iridescence: 0.65,
      iridescenceIOR: 1.78,
    },
  },
  silicon_photodiode: {
    color: 0xffffff,
    metalness: 0.36,
    roughness: 0.18,
    mapTextureKey: 'optical_diffraction',
    ultraPhysical: {
      clearcoat: 0.78,
      clearcoatRoughness: 0.10,
      iridescence: 0.72,
      iridescenceIOR: 1.68,
    },
  },
  silicon_dielectric: {
    color: 0xffffff,
    metalness: 0.12,
    roughness: 0.28,
    transparent: true,
    opacity: 0.56,
    depthWrite: false,
    ultraPhysical: { clearcoat: 0.62, clearcoatRoughness: 0.14 },
  },
  cucu_hybrid_copper: {
    color: 0xffffff,
    metalness: 0.92,
    roughness: 0.17,
    bumpTextureKey: 'wafer_grid',
    bumpScale: 0.02,
    ultraPhysical: { clearcoat: 0.34, clearcoatRoughness: 0.12 },
  },
  cfa_gloss_filter: {
    color: 0xffffff,
    metalness: 0.08,
    roughness: 0.14,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    ultraPhysical: { clearcoat: 0.90, clearcoatRoughness: 0.08 },
  },

  // --- Shared Electronics, Structural, Composite & Emissive Buckets (8) ---
  abf_substrate: {
    color: 0xffffff,
    metalness: 0.18,
    roughness: 0.38,
    stdLambert: true,
    bumpTextureKey: 'hdi_pcb',
    bumpScale: 0.02,
  },
  ic_epoxy_dark: {
    color: 0xffffff,
    metalness: 0.14,
    roughness: 0.44,
    stdLambert: true,
    bumpTextureKey: 'ceramic_grain',
    bumpScale: 0.015,
  },
  polyimide_fpc: {
    color: 0xffffff,
    metalness: 0.24,
    roughness: 0.28,
    ultraPhysical: { clearcoat: 0.55, clearcoatRoughness: 0.16 },
  },
  ceramic_alumina: {
    color: 0xffffff,
    metalness: 0.06,
    roughness: 0.58,
    stdLambert: true,
    bumpTextureKey: 'ceramic_grain',
    bumpScale: 0.022,
  },
  carbon_fiber: {
    color: 0xffffff,
    metalness: 0.34,
    roughness: 0.34,
    mapTextureKey: 'carbon_weave',
    bumpTextureKey: 'carbon_weave',
    bumpScale: 0.028,
    ultraPhysical: { clearcoat: 0.42, clearcoatRoughness: 0.20 },
  },
  leatherette_grip: {
    color: 0xffffff,
    metalness: 0.04,
    roughness: 0.84,
    stdLambert: true,
    bumpTextureKey: 'leather_grain',
    bumpScale: 0.045,
  },
  foam_felt_matte: {
    color: 0xffffff,
    metalness: 0.02,
    roughness: 0.94,
    stdLambert: true,
    bumpTextureKey: 'ceramic_grain',
    bumpScale: 0.038,
  },
  emissive_glow: {
    color: 0xffffff,
    metalness: 0.08,
    roughness: 0.24,
    emissive: 0x3b82f6,
    emissiveIntensity: 0.55,
  },
};

/**
 * Deterministic procedural DataTexture builders (zero DOM Canvas dependency — works identically in WebGL & Node CI!).
 */
function buildProceduralDataTexture(key: ProceduralTextureKey): THREE.DataTexture {
  if (key === 'studio_env') {
    const w = 128;
    const h = 64;
    const data = new Uint8Array(w * h * 4);
    for (let y = 0; y < h; y++) {
      const v = y / (h - 1);
      const theta = (1 - v) * Math.PI;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);
      for (let x = 0; x < w; x++) {
        const u = x / (w - 1);
        const phi = u * Math.PI * 2;
        const dx = sinT * Math.cos(phi);
        const dy = cosT;
        const dz = sinT * Math.sin(phi);

        let lum = 0.76 + Math.max(0, dy) * 0.24;
        const keyDot = Math.max(0, dx * -0.517 + dy * 0.716 + dz * 0.458);
        lum += Math.pow(keyDot, 5) * 0.48;
        const rimDot = Math.max(0, dx * 0.648 + dy * 0.365 + dz * -0.669);
        lum += Math.pow(rimDot, 6) * 0.42;
        // Soft studio lower-front reflector bounce so vertical walls and undersides never crush
        const bounceDot = Math.max(0, dx * 0.32 + dy * -0.45 + dz * 0.83);
        lum += Math.pow(bounceDot, 3) * 0.28;
        const band = Math.exp(-Math.pow((dy + 0.08) * 7.5, 2));
        lum *= 1.0 - band * 0.16;

        const r = Math.min(255, Math.max(0, Math.round(lum * 248)));
        const g = Math.min(255, Math.max(0, Math.round(lum * 250)));
        const b = Math.min(255, Math.max(0, Math.round(lum * 255)));
        const idx = (y * w + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }
    const tex = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    tex.userData.__cacheKey = key;
    return tex;
  }

  if (key === 'studio_env_ultra') {
    // Commercial product-photography cyclorama (1024x512 = 4x texels): overhead feathered key softbox scrim,
    // twin razor-sharp architectural rim strip kickers, side velvet negative-fill contrast flags (creating
    // liquid anodized/chrome specular depth!), warm fill panel, and luminous studio floor bounce (0% crushed blacks!).
    const w = 1024;
    const h = 512;
    const data = new Uint8Array(w * h * 4);
    for (let y = 0; y < h; y++) {
      const v = y / (h - 1);
      const theta = (1 - v) * Math.PI;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);
      for (let x = 0; x < w; x++) {
        const u = x / (w - 1);
        const phi = u * Math.PI * 2;
        const dx = sinT * Math.cos(phi);
        const dy = cosT;
        const dz = sinT * Math.sin(phi);

        // Rich studio cyclorama gradient
        let rL = dy >= 0 ? 0.54 + dy * 0.36 : 0.44 + (1 + dy) * 0.15;
        let gL = dy >= 0 ? 0.57 + dy * 0.36 : 0.46 + (1 + dy) * 0.15;
        let bL = dy >= 0 ? 0.63 + dy * 0.36 : 0.51 + (1 + dy) * 0.16;

        // Crisp dark velvet negative-fill contrast flags near horizon for dramatic CNC metal depth!
        const horizonFlag = Math.exp(-Math.pow((dy - 0.01) * 6.2, 2));
        const flagMask = 0.58 + 0.42 * Math.pow(Math.abs(Math.sin(phi * 2.0 + 0.32)), 0.65);
        const flagAtten = 1.0 - horizonFlag * 0.52 * flagMask;
        rL *= flagAtten;
        gL *= flagAtten;
        bL *= flagAtten;

        // 1) Razor-crisp overhead key softbox scrim + secondary specular dome for lens barrels & rings
        const keySoft =
          Math.exp(-Math.pow((dx + 0.34) * 3.1, 2)) *
          Math.exp(-Math.pow((dy - 0.85) * 4.8, 2)) *
          Math.exp(-Math.pow((dz - 0.28) * 2.6, 2));
        const keySpec = Math.pow(Math.max(0, dx * -0.44 + dy * 0.78 + dz * 0.44), 18);
        const topStrip =
          Math.exp(-Math.pow((dx - 0.12) * 8.0, 2)) *
          Math.exp(-Math.pow((dy - 0.92) * 5.2, 2)) *
          Math.exp(-Math.pow((dz + 0.18) * 2.2, 2));
        rL += keySoft * 1.65 + keySpec * 1.15 + topStrip * 1.05;
        gL += keySoft * 1.66 + keySpec * 1.16 + topStrip * 1.08;
        bL += keySoft * 1.72 + keySpec * 1.22 + topStrip * 1.16;

        // 2) Twin vertical architectural rim light strips (cool sapphire-silver edge separation!)
        const rimRight =
          Math.exp(-Math.pow((dx - 0.78) * 6.2, 2)) *
          Math.exp(-Math.pow((dy - 0.24) * 2.6, 2)) *
          Math.exp(-Math.pow((dz + 0.52) * 4.4, 2));
        const rimLeft =
          Math.exp(-Math.pow((dx + 0.84) * 6.6, 2)) *
          Math.exp(-Math.pow((dy - 0.16) * 2.8, 2)) *
          Math.exp(-Math.pow((dz + 0.36) * 4.6, 2));
        rL += rimRight * 1.32 + rimLeft * 0.98;
        gL += rimRight * 1.42 + rimLeft * 1.04;
        bL += rimRight * 1.64 + rimLeft * 1.16;

        // 3) Warm front-right fill softbox panel (lifts camera grip & AR glass highlights cleanly)
        const fillPanel = Math.pow(Math.max(0, dx * 0.56 + dy * 0.28 + dz * 0.78), 8);
        rL += fillPanel * 0.76;
        gL += fillPanel * 0.73;
        bL += fillPanel * 0.70;

        // 4) Lower front studio white-card bounce (guarantees 0.00% crushed blacks under barrels/grips)
        const bounceCard = Math.pow(Math.max(0, dx * 0.18 + dy * -0.52 + dz * 0.84), 3);
        rL += bounceCard * 0.38;
        gL += bounceCard * 0.40;
        bL += bounceCard * 0.44;

        // Soft filmic shoulder compression into sRGB 8-bit while keeping crisp specular peaks at 255
        const enc = (c: number) => {
          const mapped = c / (1 + c * 0.30);
          return Math.min(255, Math.max(0, Math.round(Math.pow(Math.min(1, mapped), 1 / 2.2) * 255)));
        };
        const idx = (y * w + x) * 4;
        data[idx] = enc(rL);
        data[idx + 1] = enc(gL);
        data[idx + 2] = enc(bL);
        data[idx + 3] = 255;
      }
    }
    const tex = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    tex.userData.__cacheKey = key;
    return tex;
  }

  if (key === 'matcap_studio_matte' || key === 'matcap_studio_metal') {
    // Pre-integrated view-space Studio MatCap synthesized directly from the 4-light STD studio rig
    // (1 single texture2D fetch per pixel, ZERO dynamic lighting loops, 100% STD visual parity!)
    const size = 128;
    const isMetal = key === 'matcap_studio_metal';
    const data = new Uint8Array(size * size * 4);

    // Normalized view-space studio light vectors matching setupStudioLighting
    const kLen = Math.hypot(-0.44, 0.72, 0.54);
    const kx = -0.44 / kLen, ky = 0.72 / kLen, kz = 0.54 / kLen;
    const fLen = Math.hypot(0.62, 0.24, 0.75);
    const fx = 0.62 / fLen, fy = 0.24 / fLen, fz = 0.75 / fLen;
    const rLen = Math.hypot(0.66, 0.44, -0.61);
    const rx = 0.66 / rLen, ry = 0.44 / rLen, rz = -0.61 / rLen;

    // Half vectors for view = (0, 0, 1)
    const hkLen = Math.hypot(kx, ky, kz + 1);
    const hkx = kx / hkLen, hky = ky / hkLen, hkz = (kz + 1) / hkLen;
    const hfLen = Math.hypot(fx, fy, fz + 1);
    const hfx = fx / hfLen, hfy = fy / hfLen, hfz = (fz + 1) / hfLen;

    for (let y = 0; y < size; y++) {
      // Three.js DataTexture y=0 is bottom (v=0 -> ny=-1), y=size-1 is top (v=1 -> ny=+1)
      const nyRaw = (y / (size - 1)) * 2 - 1;
      for (let x = 0; x < size; x++) {
        const nxRaw = (x / (size - 1)) * 2 - 1;
        const r2 = nxRaw * nxRaw + nyRaw * nyRaw;
        let nx = nxRaw;
        let ny = nyRaw;
        let nz: number;
        if (r2 >= 1.0) {
          const inv = 1 / Math.sqrt(r2);
          nx *= inv;
          ny *= inv;
          nz = 0;
        } else {
          nz = Math.sqrt(1.0 - r2);
        }

        // Hemisphere studio ambient dome (guarantees 0.00% crushed blacks matching STD/HIGH even on dark CFexpress/grips!)
        const hemiMix = ny * 0.5 + 0.5;
        let rL = 0.72 + hemiMix * 0.24;
        let gL = 0.74 + hemiMix * 0.24;
        let bL = 0.78 + hemiMix * 0.26;

        // 3-point studio diffuse lobes matching setupStudioLighting
        const dKey = Math.max(0, nx * kx + ny * ky + nz * kz);
        const dFill = Math.max(0, nx * fx + ny * fy + nz * fz);
        const dRim = Math.max(0, nx * rx + ny * ry + nz * rz);

        const diffScale = isMetal ? 0.72 : 0.80;
        rL += (dKey * 0.78 + dFill * 0.48 + dRim * 0.30) * diffScale;
        gL += (dKey * 0.79 + dFill * 0.49 + dRim * 0.32) * diffScale;
        bL += (dKey * 0.80 + dFill * 0.51 + dRim * 0.36) * diffScale;

        if (isMetal) {
          // Crisp dual-lobe Blinn-Phong studio specular + Fresnel rim sheen for metallic/optical parts
          const specKey = Math.pow(Math.max(0, nx * hkx + ny * hky + nz * hkz), 24);
          const specFill = Math.pow(Math.max(0, nx * hfx + ny * hfy + nz * hfz), 14);
          const fresnel = Math.pow(1 - nz, 2.6) * (0.50 + 0.50 * hemiMix);
          rL += specKey * 0.82 + specFill * 0.34 + fresnel * 0.36;
          gL += specKey * 0.86 + specFill * 0.36 + fresnel * 0.40;
          bL += specKey * 0.94 + specFill * 0.40 + fresnel * 0.46;
        } else {
          // Gentle studio velvet edge lift for matte grips & chassis contours
          const softWrap = Math.pow(1 - nz, 2.2) * 0.20;
          rL += softWrap * 0.95;
          gL += softWrap * 0.98;
          bL += softWrap * 1.03;
        }

        // Normalize HDR radiance [0..2.15] into sRGB 8-bit; MeshMatcapMaterial applies 2.08x HDR linear gain!
        const enc = (c: number) => {
          const norm = Math.min(1, c / 2.15);
          return Math.min(255, Math.max(0, Math.round(Math.pow(norm, 1 / 2.2) * 255)));
        };
        const idx = (y * size + x) * 4;
        data[idx] = enc(rL);
        data[idx + 1] = enc(gL);
        data[idx + 2] = enc(bL);
        data[idx + 3] = 255;
      }
    }

    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    tex.userData.__cacheKey = key;
    return tex;
  }

  if (key === 'matcap_studio_dual') {
    // STD LITE v2 & Play Ground Hyper-Engine Dual-Atlas Pre-Baked Filmic Studio MatCap (256x128):
    // Left half [0..127]: Matte Velvet Studio Sphere | Right half [128..255]: Metallic Specular Studio Sphere
    // Pre-bakes studio ACES-filmic shoulder into sRGB so toneMapped=false skips 18 ALU/px while
    // guaranteeing 0.00% crushed blacks and crisp specular separation inside ONE single draw call!
    const h = 128;
    const w = 256;
    const data = new Uint8Array(w * h * 4);

    const kLen = Math.hypot(-0.44, 0.72, 0.54);
    const kx = -0.44 / kLen, ky = 0.72 / kLen, kz = 0.54 / kLen;
    const fLen = Math.hypot(0.62, 0.24, 0.75);
    const fx = 0.62 / fLen, fy = 0.24 / fLen, fz = 0.75 / fLen;
    const rLen = Math.hypot(0.66, 0.44, -0.61);
    const rx = 0.66 / rLen, ry = 0.44 / rLen, rz = -0.61 / rLen;

    const hkLen = Math.hypot(kx, ky, kz + 1);
    const hkx = kx / hkLen, hky = ky / hkLen, hkz = (kz + 1) / hkLen;
    const hfLen = Math.hypot(fx, fy, fz + 1);
    const hfx = fx / hfLen, hfy = fy / hfLen, hfz = (fz + 1) / hfLen;

    for (let half = 0; half < 2; half++) {
      const isMetal = half === 1;
      const xBase = half * h;
      for (let y = 0; y < h; y++) {
        const nyRaw = (y / (h - 1)) * 2 - 1;
        for (let x = 0; x < h; x++) {
          const nxRaw = (x / (h - 1)) * 2 - 1;
          const r2 = nxRaw * nxRaw + nyRaw * nyRaw;
          let nx = nxRaw;
          let ny = nyRaw;
          let nz: number;
          if (r2 >= 1.0) {
            const inv = 1 / Math.sqrt(r2);
            nx *= inv;
            ny *= inv;
            nz = 0;
          } else {
            nz = Math.sqrt(1.0 - r2);
          }

          const hemiMix = ny * 0.5 + 0.5;
          let rL = 0.74 + hemiMix * 0.26;
          let gL = 0.76 + hemiMix * 0.26;
          let bL = 0.80 + hemiMix * 0.28;

          const dKey = Math.max(0, nx * kx + ny * ky + nz * kz);
          const dFill = Math.max(0, nx * fx + ny * fy + nz * fz);
          const dRim = Math.max(0, nx * rx + ny * ry + nz * rz);

          const diffScale = isMetal ? 0.72 : 0.84;
          rL += (dKey * 0.80 + dFill * 0.48 + dRim * 0.30) * diffScale;
          gL += (dKey * 0.81 + dFill * 0.49 + dRim * 0.32) * diffScale;
          bL += (dKey * 0.82 + dFill * 0.51 + dRim * 0.36) * diffScale;

          if (isMetal) {
            const specKey = Math.pow(Math.max(0, nx * hkx + ny * hky + nz * hkz), 24);
            const specFill = Math.pow(Math.max(0, nx * hfx + ny * hfy + nz * hfz), 14);
            const fresnel = Math.pow(1 - nz, 2.5) * (0.48 + 0.52 * hemiMix);
            rL += specKey * 0.92 + specFill * 0.36 + fresnel * 0.38;
            gL += specKey * 0.95 + specFill * 0.38 + fresnel * 0.42;
            bL += specKey * 1.02 + specFill * 0.42 + fresnel * 0.48;
          } else {
            const softWrap = Math.pow(1 - nz, 2.2) * 0.18;
            rL += softWrap * 0.95;
            gL += softWrap * 0.98;
            bL += softWrap * 1.03;
          }

          // Pre-baked Filmic shoulder into sRGB 8-bit so toneMapped=false looks rich & never crushes
          const enc = (c: number) => {
            const filmic = c / (c * 0.52 + 0.96);
            return Math.min(255, Math.max(0, Math.round(Math.pow(Math.min(1, filmic), 1 / 2.2) * 255)));
          };
          const idx = (y * w + (xBase + x)) * 4;
          data[idx] = enc(rL);
          data[idx + 1] = enc(gL);
          data[idx + 2] = enc(bL);
          data[idx + 3] = 255;
        }
      }
    }

    const tex = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    tex.userData.__cacheKey = key;
    return tex;
  }

  if (key === 'lite_explode_dummy') {
    const data = new Float32Array([0, 0, 0, 0]);
    const tex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat, THREE.FloatType);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    tex.userData.__cacheKey = key;
    return tex;
  }

  const size = 128;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const hash = (((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1) + 1) % 1;
      if (key === 'cnc_brushed') {
        const streak = Math.sin(y * 1.85) * 16 + Math.sin(y * 0.42 + x * 0.04) * 8 + (hash - 0.5) * 16;
        const v = Math.min(255, Math.max(0, Math.round(128 + streak)));
        data[idx] = v;
        data[idx + 1] = v;
        data[idx + 2] = v;
        data[idx + 3] = 255;
      } else if (key === 'mg_grain') {
        const v = Math.min(255, Math.max(0, Math.round(108 + hash * 48)));
        data[idx] = v;
        data[idx + 1] = v;
        data[idx + 2] = v;
        data[idx + 3] = 255;
      } else if (key === 'hdi_pcb') {
        // High-value modulation map so multiplying by instanceColor tint preserves crisp emerald PCB & bright traces/vias
        const isTrace = x % 8 === 0 || y % 12 === 0;
        const isVia = x % 16 === 4 && y % 16 === 4;
        if (isVia) {
          data[idx] = 255;
          data[idx + 1] = 242;
          data[idx + 2] = 196;
        } else if (isTrace) {
          data[idx] = 210;
          data[idx + 1] = 244;
          data[idx + 2] = 228;
        } else {
          data[idx] = 176;
          data[idx + 1] = 208;
          data[idx + 2] = 196;
        }
        data[idx + 3] = 255;
      } else if (key === 'copper_coil') {
        // Bright neutral-warm modulation so copper instance tint stays luminous without double-darkening
        const wave = 0.5 + 0.5 * Math.sin((x / size) * Math.PI * 32);
        data[idx] = Math.round(202 + wave * 50);
        data[idx + 1] = Math.round(186 + wave * 48);
        data[idx + 2] = Math.round(170 + wave * 44);
        data[idx + 3] = 255;
      } else if (key === 'carbon_weave') {
        // Normalized woven pattern modulation (0.68..0.94) so dark carbon tint shows visible diagonal twill instead of black crush
        const cell = ((x >> 2) + (y >> 2)) & 1;
        const fiber = cell === 0 ? Math.sin((x & 3) * 1.2) : Math.sin((y & 3) * 1.2);
        const v = Math.min(255, Math.max(0, Math.round(174 + cell * 40 + fiber * 20)));
        data[idx] = v;
        data[idx + 1] = Math.min(255, v + 3);
        data[idx + 2] = Math.min(255, v + 8);
        data[idx + 3] = 255;
      } else if (key === 'leather_grain') {
        const pebble =
          Math.sin(x * 0.9 + Math.cos(y * 0.85) * 1.4) * Math.cos(y * 0.95) * 34;
        const v = Math.min(255, Math.max(0, Math.round(124 + pebble + (hash - 0.5) * 26)));
        data[idx] = v;
        data[idx + 1] = v;
        data[idx + 2] = v;
        data[idx + 3] = 255;
      } else if (key === 'wafer_grid') {
        // Normalized bright silicon grid modulation so wafer/die tint retains crisp blue/slate sheen
        const scribe = x % 16 === 0 || y % 16 === 0;
        const fine = x % 4 === 0 || y % 4 === 0;
        if (scribe) {
          data[idx] = 236;
          data[idx + 1] = 244;
          data[idx + 2] = 255;
        } else if (fine) {
          data[idx] = 196;
          data[idx + 1] = 212;
          data[idx + 2] = 232;
        } else {
          data[idx] = 172;
          data[idx + 1] = 188;
          data[idx + 2] = 210;
        }
        data[idx + 3] = 255;
      } else if (key === 'optical_diffraction') {
        // High-value pastel iridescence modulation so photodiode/sensor tints stay vibrant and legible
        const phase = ((x + y * 0.7) / size) * Math.PI * 8;
        data[idx] = Math.round(186 + 44 * Math.sin(phase));
        data[idx + 1] = Math.round(202 + 42 * Math.sin(phase + 2.1));
        data[idx + 2] = Math.round(218 + 34 * Math.sin(phase + 4.2));
        data[idx + 3] = 255;
      } else if (key === 'ceramic_grain') {
        const v = Math.min(255, Math.max(0, Math.round(120 + (hash - 0.5) * 44)));
        data[idx] = v;
        data[idx + 1] = v;
        data[idx + 2] = v;
        data[idx + 3] = 255;
      } else if (key === 'mesh_grid') {
        const wire = x % 6 === 0 || y % 6 === 0 ? 196 : 96;
        data[idx] = wire;
        data[idx + 1] = wire;
        data[idx + 2] = wire;
        data[idx + 3] = 255;
      } else {
        // silicon_die subtle grid
        const grid = x % 8 === 0 || y % 8 === 0 ? 28 : 0;
        data[idx] = 182 + grid;
        data[idx + 1] = 196 + grid;
        data[idx + 2] = 218 + grid;
        data[idx + 3] = 255;
      }
    }
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  if (
    key === 'hdi_pcb' ||
    key === 'copper_coil' ||
    key === 'silicon_die' ||
    key === 'carbon_weave' ||
    key === 'wafer_grid' ||
    key === 'optical_diffraction'
  ) {
    tex.colorSpace = THREE.SRGBColorSpace;
  }
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 4;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  tex.userData.__cacheKey = key;
  return tex;
}

function buildFallbackHeroDataTexture(cacheKey: string, fallbackColor = 0x8899aa): THREE.DataTexture {
  const size = 8;
  const data = new Uint8Array(size * size * 4);
  const r0 = (fallbackColor >> 16) & 255;
  const g0 = (fallbackColor >> 8) & 255;
  const b0 = fallbackColor & 255;
  for (let i = 0; i < size * size; i++) {
    const o = i * 4;
    data[o] = r0;
    data[o + 1] = g0;
    data[o + 2] = b0;
    data[o + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  tex.userData.__cacheKey = cacheKey;
  return tex;
}

/**
 * Reference-counted shared cache for ALL V2 unit materials, textures (procedural + lazy hero),
 * and geometries. Guarantees zero duplicate GPU allocations and deterministic disposal at refCount === 0.
 */
export class ResourceCache {
  private readonly materials = new Map<string, RefEntry<THREE.Material>>();
  private readonly geometries = new Map<string, RefEntry<THREE.BufferGeometry>>();
  private readonly textures = new Map<string, RefEntry<THREE.Texture>>();

  public acquireTexture(key: ProceduralTextureKey): THREE.Texture {
    const existing = this.textures.get(key);
    if (existing) {
      existing.refCount++;
      return existing.resource;
    }
    const tex = buildProceduralDataTexture(key);
    this.textures.set(key, { resource: tex, refCount: 1 });
    return tex;
  }

  /**
   * Lazily acquire a reference-counted 2D Canvas hero texture scaled to the active quality tier.
   * Automatically falls back to a deterministic DOM-free DataTexture in headless Node.js CI.
   */
  public acquireHeroTexture(
    heroKey: string,
    spec: HeroMaterialSpec,
    quality: QualityTier
  ): THREE.Texture {
    const texKey = `herotex:${heroKey}:${quality}`;
    const existing = this.textures.get(texKey);
    if (existing) {
      existing.refCount++;
      return existing.resource;
    }

    let tex: THREE.Texture;
    if (typeof document !== 'undefined') {
      const maxDim = QUALITY_TIER_CONFIG[quality].maxHeroTextureDim;
      const scale = Math.min(1, maxDim / Math.max(1, spec.width, spec.height));
      const cw = Math.max(32, Math.round(spec.width * scale));
      const ch = Math.max(32, Math.round(spec.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.scale(cw / spec.width, ch / spec.height);
        spec.painter(ctx, spec.width, spec.height);
        ctx.restore();
        const cTex = new THREE.CanvasTexture(canvas);
        cTex.colorSpace = THREE.SRGBColorSpace;
        cTex.minFilter = THREE.LinearMipmapLinearFilter;
        cTex.magFilter = THREE.LinearFilter;
        cTex.anisotropy = quality === 'ultra' ? 16 : quality === 'high' ? 4 : 1;
        if (spec.wrapRepeat) {
          cTex.wrapS = THREE.RepeatWrapping;
          cTex.wrapT = THREE.RepeatWrapping;
        }
        if (spec.repeatX || spec.repeatY) {
          cTex.repeat.set(spec.repeatX ?? 1, spec.repeatY ?? 1);
        }
        cTex.needsUpdate = true;
        tex = cTex;
      } else {
        tex = buildFallbackHeroDataTexture(texKey, spec.fallbackColor ?? spec.baseColor ?? 0x8899aa);
      }
    } else {
      tex = buildFallbackHeroDataTexture(texKey, spec.fallbackColor ?? spec.baseColor ?? 0x8899aa);
    }

    tex.userData.__cacheKey = texKey;
    this.textures.set(texKey, { resource: tex, refCount: 1 });
    return tex;
  }

  public releaseTexture(key: string): boolean {
    const entry = this.textures.get(key);
    if (!entry) return false;
    entry.refCount--;
    if (entry.refCount <= 0) {
      entry.resource.dispose();
      this.textures.delete(key);
      return true;
    }
    return false;
  }

  public acquireGeometry(
    hashKey: string,
    factory: () => THREE.BufferGeometry
  ): THREE.BufferGeometry {
    const existing = this.geometries.get(hashKey);
    if (existing) {
      existing.refCount++;
      return existing.resource;
    }
    const geo = factory();
    geo.userData.__cacheKey = hashKey;
    this.geometries.set(hashKey, { resource: geo, refCount: 1 });
    return geo;
  }

  public releaseGeometry(hashKey: string): boolean {
    const entry = this.geometries.get(hashKey);
    if (!entry) return false;
    entry.refCount--;
    if (entry.refCount <= 0) {
      entry.resource.dispose();
      this.geometries.delete(hashKey);
      return true;
    }
    return false;
  }

  private static computeStdPhongProps(
    metalness: number,
    roughness: number,
    transparent: boolean
  ): { specular: number; shininess: number } {
    if (transparent) {
      return { specular: 0xdbeafe, shininess: 92 };
    }
    if (metalness >= 0.7) {
      const shininess = Math.round(Math.max(28, Math.min(96, (1 - roughness) * 95 + 18)));
      return { specular: 0xb8c8dc, shininess };
    }
    if (metalness >= 0.3) {
      const shininess = Math.round(Math.max(20, Math.min(64, (1 - roughness) * 65 + 14)));
      return { specular: 0x6f7d91, shininess };
    }
    const shininess = Math.round(Math.max(16, Math.min(48, (1 - roughness) * 45 + 12)));
    return { specular: 0x4b5563, shininess };
  }

  /**
   * Acquire a quality-tiered shared material.
   * - STD LITE : Zero-light Pre-Integrated Studio MeshMatcapMaterial (1 texture fetch/px, mega-bucket draw-call fusion).
   * - STD      : Zero-IBL MeshLambertMaterial (matte/dielectric) + Blinn-Phong MeshPhongMaterial (metallic/optical/silicon).
   * - HIGH     : MeshStandardMaterial PBR with procedural bump/albedo DataTextures & PMREM IBL.
   * - ULTRA    : Selective MeshPhysicalMaterial (clearcoat/iridescence) with 512x256 studio softbox reflections & PCFSoftShadowMap.
   */
  public acquireMaterial(
    bucket: MaterialBucketKey,
    quality: QualityTier,
    renderMode: RenderMode = 'solid',
    clippingPlanes: THREE.Plane[] = [],
    vertexColors = false,
    poolSlot = 0
  ): THREE.Material {
    const isStdLite = quality === 'standard_lite';
    const useVC = isStdLite && renderMode === 'solid' && vertexColors;
    const slotSuffix = isStdLite && poolSlot > 0 ? `:p${poolSlot}` : '';
    const cacheKey = `mat:${bucket}:${quality}:${renderMode}${useVC ? ':vc' : ''}${slotSuffix}`;
    const targetSide: THREE.Side = clippingPlanes.length > 0 ? THREE.DoubleSide : THREE.FrontSide;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      existing.resource.clippingPlanes = clippingPlanes;
      if (existing.resource.userData?.__managedSide && existing.resource.side !== targetSide) {
        existing.resource.side = targetSide;
        existing.resource.needsUpdate = true;
      }
      return existing.resource;
    }

    const spec = MATERIAL_SPECS[bucket];
    const depTextures: string[] = [];
    const isXray = renderMode === 'xray';
    const isCad = renderMode === 'cad';

    let mapTex: THREE.Texture | null = null;
    let bumpTex: THREE.Texture | null = null;

    if (!isXray && !isCad) {
      if (!isStdLite && spec.mapTextureKey) {
        mapTex = this.acquireTexture(spec.mapTextureKey);
        depTextures.push(spec.mapTextureKey);
      }
      if (!isStdLite && quality !== 'standard' && spec.bumpTextureKey) {
        bumpTex = this.acquireTexture(spec.bumpTextureKey);
        depTextures.push(spec.bumpTextureKey);
      }
    }

    const isTransparent = isXray || Boolean(spec.transparent && !isCad);
    const opacity = isXray
      ? 0.24
      : isCad
        ? spec.transparent
          ? Math.max(0.42, spec.opacity ?? 0.5)
          : 1.0
        : (spec.opacity ?? 1.0);
    const depthWrite = isXray ? false : isCad ? !spec.transparent : (spec.depthWrite ?? !isTransparent);

    const commonProps = {
      color: isCad ? 0xf4f6fa : isXray ? 0xdbeafe : spec.color,
      clippingPlanes,
      clipShadows: quality === 'ultra',
      side: targetSide,
      transparent: isTransparent || (isCad && Boolean(spec.transparent)),
      opacity,
      depthWrite,
    };

    let mat: THREE.Material;
    if (isStdLite) {
      const matcapKey: ProceduralTextureKey = 'matcap_studio_dual';
      const matcapTex = this.acquireTexture(matcapKey);
      const dummyExplodeTex = this.acquireTexture('lite_explode_dummy') as THREE.DataTexture;
      depTextures.push(matcapKey, 'lite_explode_dummy');

      const liteColor = new THREE.Color(commonProps.color);
      if (!isCad && !isXray) {
        // Pre-baked filmic studio MatCap gain (toneMapped=false eliminates 18 ALU/px ACES mat3+pow!)
        liteColor.multiplyScalar(1.48);
      } else if (isCad) {
        liteColor.multiplyScalar(1.24);
      } else {
        liteColor.multiplyScalar(1.30);
      }
      const mcMat = new THREE.MeshMatcapMaterial({
        ...commonProps,
        color: liteColor,
        matcap: matcapTex,
        vertexColors: useVC,
        toneMapped: false,
        polygonOffset: isCad,
        polygonOffsetFactor: isCad ? 1 : 0,
        polygonOffsetUnits: isCad ? 1 : 0,
      });
      const defaultFinish = isXray || isCad || (spec.stdLambert && !spec.transparent) ? 0.0 : 1.0;
      ResourceCache.patchLiteMatcapMaterial(mcMat, dummyExplodeTex, {
        dualAtlas: true,
        defaultFinish,
        enableRim: !isXray && !spec.transparent,
        playgroundMode: false,
      });
      mat = mcMat;
    } else if (isXray) {
      mat = new THREE.MeshLambertMaterial({
        ...commonProps,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.14,
      });
      ResourceCache.patchStandardSelectionAndAA(mat, { specularAA: false, tag: 'xray' });
    } else if (isCad) {
      mat = new THREE.MeshLambertMaterial({
        ...commonProps,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
      ResourceCache.patchStandardSelectionAndAA(mat, { specularAA: false, tag: 'cad' });
    } else if (quality === 'standard') {
      if (spec.stdLambert && !spec.transparent) {
        mat = new THREE.MeshLambertMaterial({
          ...commonProps,
          map: mapTex,
          emissive: spec.emissive ?? 0x000000,
          emissiveIntensity: spec.emissiveIntensity ?? 0,
        });
        ResourceCache.patchStandardSelectionAndAA(mat, { specularAA: false, tag: 'std_l' });
      } else {
        const phong = ResourceCache.computeStdPhongProps(
          spec.metalness,
          spec.roughness,
          Boolean(spec.transparent)
        );
        mat = new THREE.MeshPhongMaterial({
          ...commonProps,
          map: mapTex,
          specular: phong.specular,
          shininess: phong.shininess,
          emissive: spec.emissive ?? 0x000000,
          emissiveIntensity: spec.emissiveIntensity ?? 0,
        });
        ResourceCache.patchStandardSelectionAndAA(mat, { specularAA: false, tag: 'std_p' });
      }
    } else if (quality === 'ultra' && spec.ultraPhysical) {
      mat = new THREE.MeshPhysicalMaterial({
        ...commonProps,
        map: mapTex,
        bumpMap: bumpTex,
        bumpScale: (spec.bumpScale ?? 0.02) * 1.25,
        metalness: spec.metalness,
        roughness: spec.roughness,
        clearcoat: spec.ultraPhysical.clearcoat,
        clearcoatRoughness: spec.ultraPhysical.clearcoatRoughness,
        iridescence: spec.ultraPhysical.iridescence ?? 0,
        iridescenceIOR: spec.ultraPhysical.iridescenceIOR ?? 1.3,
        ior: spec.ultraPhysical.ior ?? 1.5,
        reflectivity: spec.ultraPhysical.reflectivity ?? 0.5,
        envMapIntensity: 1.52,
        emissive: spec.emissive ?? 0x000000,
        emissiveIntensity: spec.emissiveIntensity ?? 0,
      });
      ResourceCache.patchStandardSelectionAndAA(mat, { specularAA: true, tag: 'u_phys' });
    } else {
      mat = new THREE.MeshStandardMaterial({
        ...commonProps,
        map: mapTex,
        bumpMap: bumpTex,
        bumpScale: (spec.bumpScale ?? 0.02) * (quality === 'ultra' ? 1.25 : 1.0),
        metalness: spec.metalness,
        roughness: spec.roughness,
        envMapIntensity: quality === 'ultra' ? 1.28 : 0.95,
        emissive: spec.emissive ?? 0x000000,
        emissiveIntensity: spec.emissiveIntensity ?? 0,
      });
      ResourceCache.patchStandardSelectionAndAA(mat, {
        specularAA: quality === 'ultra' || quality === 'high',
        tag: quality === 'ultra' ? 'u_std' : 'h_std',
      });
    }

    mat.userData.__cacheKey = cacheKey;
    mat.userData.__materialBucket = bucket;
    mat.userData.__managedSide = true;
    this.materials.set(cacheKey, { resource: mat, refCount: 1, depTextures });
    return mat;
  }

  /**
   * Patches ULTRA / HIGH / STD PBR, Phong & Lambert materials with:
   *  1. Unmistakable Strong Vivid Cobalt-Blue Selection + Emissive Fresnel Rim (`c.b > 1.8 && c.r < 0.25`)
   *  2. Tokuyoshi / Kaplanyan Analytical Geometric Specular-AA (`dFdx`/`dFdy` roughness clamping) on HIGH & ULTRA
   * Zero extra draw calls, zero extra meshes, shared program cache key!
   */
  public static patchStandardSelectionAndAA(
    mat: THREE.Material,
    opts: { specularAA: boolean; tag: string }
  ): void {
    const keyTag = `cad_sel_aa_v3_${opts.specularAA ? '1' : '0'}`;
    mat.customProgramCacheKey = () => keyTag;
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `#include <common>
varying float vCadSel;`
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <color_vertex>',
        `#if defined( USE_COLOR_ALPHA )
  vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
  vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
  vColor *= color;
#endif
vCadSel = 0.0;
#ifdef USE_INSTANCING_COLOR
  if ( instanceColor.b > 1.8 && instanceColor.r < 0.25 ) {
    vCadSel = 2.0;
  } else if ( instanceColor.b > 1.45 && instanceColor.r < 0.25 ) {
    vCadSel = 1.0;
  } else {
    vColor.xyz *= instanceColor.xyz;
  }
#endif
#ifdef USE_BATCHING_COLOR
  vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
  if ( batchingColor.b > 1.8 && batchingColor.r < 0.25 ) {
    vCadSel = 2.0;
  } else if ( batchingColor.b > 1.45 && batchingColor.r < 0.25 ) {
    vCadSel = 1.0;
  } else {
    vColor.xyz *= batchingColor.xyz;
  }
#endif`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `#include <common>
varying float vCadSel;`
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
${
          opts.specularAA
            ? `#ifndef FLAT_SHADED
{
  vec3 aaDndu = dFdx( normal );
  vec3 aaDndv = dFdy( normal );
  float aaVar = clamp( 0.28 * ( dot( aaDndu, aaDndu ) + dot( aaDndv, aaDndv ) ), 0.0, 0.22 );
  roughnessFactor = clamp( sqrt( roughnessFactor * roughnessFactor + aaVar ), 0.04, 1.0 );
}
#endif`
            : ''
        }
if ( vCadSel > 1.5 ) {
  float selRim = pow( 1.0 - clamp( abs( normal.z ), 0.0, 1.0 ), 1.6 );
  diffuseColor.rgb = mix( diffuseColor.rgb * vec3( 0.10, 0.40, 1.0 ), vec3( 0.02, 0.34, 1.0 ), 0.80 );
  totalEmissiveRadiance += vec3( 0.02, 0.28, 1.0 ) * 0.78 + vec3( 0.20, 0.62, 1.0 ) * selRim * 1.25;
} else if ( vCadSel > 0.5 ) {
  float hovRim = pow( 1.0 - clamp( abs( normal.z ), 0.0, 1.0 ), 2.0 );
  diffuseColor.rgb = mix( diffuseColor.rgb, vec3( 0.14, 0.54, 1.0 ), 0.36 );
  totalEmissiveRadiance += vec3( 0.05, 0.22, 0.72 ) * 0.24 + vec3( 0.18, 0.58, 1.0 ) * hovRim * 0.42;
}`
      );
    };
  }

  /**
   * Patches a MeshMatcapMaterial with our 4 STD LITE v2 / Play Ground Hyper-Engine GPU Innovations:
   *   1. Dual-Atlas Pre-Baked Filmic Studio MatCap (Matte + Metallic in 1 single draw call via RGBA8 color.a!)
   *   2. Ultra-Slim 6-Instruction View-Normal MatCap + Analytical Fresnel Rim (replaces BatchedEdgeLines at 0 dc!)
   *   3. Hardware GPU Vertex-Shader Kinematic Explode (`uExplode` + `RGBA32F` DataTexture -> 0 CPU matrix loops!)
   *   4. In-Shader Vivid Electric-Blue Selection Mark (`b > 1.8`) + Play Ground Red/Amber Error Highlight
   */
  public static patchLiteMatcapMaterial(
    mat: THREE.MeshMatcapMaterial,
    dummyExplodeTex: THREE.DataTexture,
    opts: {
      dualAtlas: boolean;
      defaultFinish: number;
      enableRim: boolean;
      playgroundMode: boolean;
    }
  ): LiteMatcapUniforms {
    const uniforms: LiteMatcapUniforms = {
      uExplode: { value: 0.0 },
      uExplodeTex: { value: dummyExplodeTex },
      uExplodeTexW: { value: 1 },
      uExplodeActive: { value: 0.0 },
    };
    mat.userData.__liteUniforms = uniforms;
    mat.userData.__liteDummyTex = dummyExplodeTex;

    const keyTag = `lite_mc_v3_${opts.dualAtlas ? 'd' : 's'}_${opts.defaultFinish > 0.5 ? 'm' : 't'}_${opts.enableRim ? 'r' : 'n'}_${opts.playgroundMode ? 'pg' : 'v2'}`;
    mat.customProgramCacheKey = () => keyTag;

    const defFinLit = opts.defaultFinish.toFixed(1);
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uExplode = uniforms.uExplode;
      shader.uniforms.uExplodeTex = uniforms.uExplodeTex;
      shader.uniforms.uExplodeTexW = uniforms.uExplodeTexW;
      shader.uniforms.uExplodeActive = uniforms.uExplodeActive;

      // 1. Vertex shader: inject GPU Explode uniforms + strong blue selection & Play Ground diagnostic varyings
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `#include <common>
uniform float uExplode;
uniform float uExplodeActive;
uniform int uExplodeTexW;
uniform highp sampler2D uExplodeTex;
varying float vSelMark;
${opts.playgroundMode ? 'varying float vPgDiag;' : ''}`
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <color_vertex>',
        `#if defined( USE_COLOR_ALPHA )
  vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
  vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
  vColor *= color;
#endif
vSelMark = 0.0;
${opts.playgroundMode ? 'vPgDiag = 0.0;' : ''}
#ifdef USE_INSTANCING_COLOR
  if ( instanceColor.b > 1.8 && instanceColor.r < 0.25 ) {
    vSelMark = 2.0;
  } else if ( instanceColor.b > 1.45 && instanceColor.r < 0.25 ) {
    vSelMark = 1.0;
  } else {
    vColor.xyz *= instanceColor.xyz;
  }
#endif
#ifdef USE_BATCHING_COLOR
  vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
  ${
    opts.playgroundMode
      ? `if ( batchingColor.r > 1.5 ) {
    vPgDiag = 2.0;
    if ( batchingColor.b > 1.8 ) vSelMark = 2.0;
  } else if ( batchingColor.g > 1.5 ) {
    vPgDiag = 1.0;
    if ( batchingColor.b > 1.8 ) vSelMark = 2.0;
  } else if ( batchingColor.b > 1.8 && batchingColor.r < 0.25 ) {
    vSelMark = 2.0;
  } else if ( batchingColor.b > 1.45 && batchingColor.r < 0.25 ) {
    vSelMark = 1.0;
  } else {
    vColor.xyz *= batchingColor.xyz;
  }`
      : `if ( batchingColor.b > 1.8 && batchingColor.r < 0.25 ) {
    vSelMark = 2.0;
  } else if ( batchingColor.b > 1.45 && batchingColor.r < 0.25 ) {
    vSelMark = 1.0;
  } else {
    vColor.xyz *= batchingColor.xyz;
  }`
  }
#endif`
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
  mvPosition = batchingMatrix * mvPosition;
  if ( uExplodeActive > 0.5 && uExplode > 0.0001 ) {
    int eIdx = int( getIndirectIndex( gl_DrawID ) );
    int ex = eIdx % uExplodeTexW;
    int ey = eIdx / uExplodeTexW;
    mvPosition.xyz += texelFetch( uExplodeTex, ivec2( ex, ey ), 0 ).xyz * uExplode;
  }
#endif
#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
  if ( uExplodeActive > 0.5 && uExplode > 0.0001 ) {
    int eIdx = gl_InstanceID;
    int ex = eIdx % uExplodeTexW;
    int ey = eIdx / uExplodeTexW;
    mvPosition.xyz += texelFetch( uExplodeTex, ivec2( ex, ey ), 0 ).xyz * uExplode;
  }
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`
      );

      // 2. Fragment shader: RGBA8 color.a material finish decode + 6-ALU Dual-Atlas MatCap + Strong Electric Blue Selection
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `#include <common>
varying float vSelMark;
${opts.playgroundMode ? 'varying float vPgDiag;' : ''}`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `float vMatFinish = ${defFinLit};
#if defined( USE_COLOR_ALPHA )
  diffuseColor.rgb *= vColor.rgb;
  vMatFinish = vColor.a;
#elif defined( USE_COLOR )
  diffuseColor.rgb *= vColor.rgb;
#endif`
      );

      const oldMatcapBlock = `\tvec3 viewDir = normalize( vViewPosition );
\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
\tvec3 y = cross( viewDir, x );
\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
\t#ifdef USE_MATCAP
\t\tvec4 matcapColor = texture2D( matcap, uv );
\t#else
\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
\t#endif
\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;`;

      const fastMatcapBlock = `\tvec2 muv = clamp( normal.xy * 0.485 + 0.5, 0.01, 0.99 );
\t#ifdef USE_MATCAP
\t\t${
        opts.dualAtlas
          ? 'float atlasU = muv.x * 0.492 + 0.004 + step( 0.5, vMatFinish ) * 0.5;\n\t\tvec4 matcapColor = texture2D( matcap, vec2( atlasU, muv.y ) );'
          : 'vec4 matcapColor = texture2D( matcap, muv );'
      }
\t#else
\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, muv.y ) ), 1.0 );
\t#endif
\tfloat rimEdge = ${opts.enableRim ? 'mix( 0.78, 1.0, smoothstep( 0.04, 0.34, abs( normal.z ) ) )' : '1.0'};
\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb * rimEdge;
\tfloat selFresnel = pow( 1.0 - clamp( abs( normal.z ), 0.0, 1.0 ), 1.55 );
${
        opts.playgroundMode
          ? `\tif ( vPgDiag > 1.5 ) {
\t\toutgoingLight = vec3( 0.98, 0.14, 0.14 ) * ( 0.46 + 0.64 * matcapColor.rgb ) * rimEdge;
\t\tif ( vSelMark > 1.5 ) outgoingLight += vec3( 0.04, 0.46, 1.0 ) * ( 0.22 + selFresnel * 1.15 );
\t} else if ( vPgDiag > 0.5 ) {
\t\toutgoingLight = vec3( 0.98, 0.68, 0.08 ) * ( 0.44 + 0.64 * matcapColor.rgb ) * rimEdge;
\t\tif ( vSelMark > 1.5 ) outgoingLight += vec3( 0.04, 0.46, 1.0 ) * ( 0.22 + selFresnel * 1.15 );
\t} else if ( vSelMark > 1.5 ) {
\t\toutgoingLight = vec3( 0.02, 0.34, 1.0 ) * ( 0.60 + 0.54 * matcapColor.rgb ) + vec3( 0.22, 0.64, 1.0 ) * selFresnel * 0.92;
\t} else if ( vSelMark > 0.5 ) {
\t\toutgoingLight = mix( outgoingLight, vec3( 0.12, 0.52, 1.0 ) * ( 0.56 + 0.50 * matcapColor.rgb ), 0.44 );
\t}`
          : `\tif ( vSelMark > 1.5 ) {
\t\toutgoingLight = vec3( 0.02, 0.34, 1.0 ) * ( 0.60 + 0.54 * matcapColor.rgb ) + vec3( 0.22, 0.64, 1.0 ) * selFresnel * 0.92;
\t} else if ( vSelMark > 0.5 ) {
\t\toutgoingLight = mix( outgoingLight, vec3( 0.12, 0.52, 1.0 ) * ( 0.56 + 0.50 * matcapColor.rgb ), 0.44 );
\t}`
      }`;

      shader.fragmentShader = shader.fragmentShader.replace(oldMatcapBlock, fastMatcapBlock);
    };

    return uniforms;
  }

  /**
   * Acquire a 0-Texture Vertex-Lit FAST Mode proxy material (5-10x+ lighter than STD LITE v2!).
   * Lighting (studio hemisphere + key wrap), GPU vertex-shader explode, and strong electric-blue
   * selection marking execute 100% in the vertex shader so the fragment shader is a 1-instruction color copy!
   */
  public acquireFastProxyMaterial(
    clippingPlanes: THREE.Plane[] = [],
    poolSlot = 0,
    playgroundMode = false
  ): THREE.Material {
    const cacheKey = `fast_proxy_mat:${playgroundMode ? 'pg' : 'v2'}:p${poolSlot}`;
    const targetSide: THREE.Side = clippingPlanes.length > 0 ? THREE.DoubleSide : THREE.FrontSide;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      existing.resource.clippingPlanes = clippingPlanes;
      if (existing.resource.userData?.__managedSide && existing.resource.side !== targetSide) {
        existing.resource.side = targetSide;
        existing.resource.needsUpdate = true;
      }
      return existing.resource;
    }

    const dummyExplodeTex = this.acquireTexture('lite_explode_dummy') as THREE.DataTexture;
    const depTextures: string[] = ['lite_explode_dummy'];
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      side: targetSide,
      clippingPlanes,
      toneMapped: false,
    });

    const uniforms: LiteMatcapUniforms = {
      uExplode: { value: 0.0 },
      uExplodeTex: { value: dummyExplodeTex },
      uExplodeTexW: { value: 1 },
      uExplodeActive: { value: 0.0 },
    };
    mat.userData.__liteUniforms = uniforms;
    mat.userData.__liteDummyTex = dummyExplodeTex;
    mat.userData.__cacheKey = cacheKey;
    mat.userData.__managedSide = true;

    const keyTag = `fast_vtx_v3_${playgroundMode ? 'pg' : 'v2'}`;
    mat.customProgramCacheKey = () => keyTag;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uExplode = uniforms.uExplode;
      shader.uniforms.uExplodeTex = uniforms.uExplodeTex;
      shader.uniforms.uExplodeTexW = uniforms.uExplodeTexW;
      shader.uniforms.uExplodeActive = uniforms.uExplodeActive;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `#include <common>
uniform float uExplode;
uniform float uExplodeActive;
uniform int uExplodeTexW;
uniform highp sampler2D uExplodeTex;
varying vec3 vFastShade;`
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <color_vertex>',
        `#if defined( USE_COLOR_ALPHA )
  vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
  vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
  vColor *= color;
#endif
float fSel = 0.0;
float fDiag = 0.0;
#ifdef USE_INSTANCING_COLOR
  if ( instanceColor.b > 1.8 && instanceColor.r < 0.25 ) {
    fSel = 2.0;
  } else {
    vColor.xyz *= instanceColor.xyz;
  }
#endif
#ifdef USE_BATCHING_COLOR
  vec3 bc = getBatchingColor( getIndirectIndex( gl_DrawID ) );
  ${
    playgroundMode
      ? `if ( bc.r > 1.5 ) {
    fDiag = 2.0;
  } else if ( bc.g > 1.5 ) {
    fDiag = 1.0;
  } else if ( bc.b > 1.8 && bc.r < 0.25 ) {
    fSel = 2.0;
  } else {
    vColor.xyz *= bc.xyz;
  }`
      : `if ( bc.b > 1.8 && bc.r < 0.25 ) {
    fSel = 2.0;
  } else {
    vColor.xyz *= bc.xyz;
  }`
  }
#endif`
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        `vec3 fnObj = vec3( normal );
#ifdef USE_BATCHING
  fnObj = mat3( batchingMatrix ) * fnObj;
#endif
#ifdef USE_INSTANCING
  fnObj = mat3( instanceMatrix ) * fnObj;
#endif
vec3 fn = normalize( normalMatrix * fnObj );
float hemi = 0.58 + 0.26 * clamp( fn.y, -1.0, 1.0 );
float keyL = 0.34 * max( 0.0, dot( fn, vec3( -0.45, 0.60, 0.66 ) ) );
float shade = clamp( hemi + keyL, 0.38, 1.18 );
if ( fDiag > 1.5 ) {
  vFastShade = vec3( 0.96, 0.16, 0.16 ) * shade;
} else if ( fDiag > 0.5 ) {
  vFastShade = vec3( 0.96, 0.68, 0.10 ) * shade;
} else if ( fSel > 1.5 ) {
  vFastShade = vec3( 0.04, 0.42, 1.0 ) * ( 0.72 + 0.40 * shade );
} else {
  vFastShade = vColor.rgb * shade;
}
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
  mvPosition = batchingMatrix * mvPosition;
  if ( uExplodeActive > 0.5 && uExplode > 0.0001 ) {
    int eIdx = int( getIndirectIndex( gl_DrawID ) );
    int ex = eIdx % uExplodeTexW;
    int ey = eIdx / uExplodeTexW;
    mvPosition.xyz += texelFetch( uExplodeTex, ivec2( ex, ey ), 0 ).xyz * uExplode;
  }
#endif
#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
  if ( uExplodeActive > 0.5 && uExplode > 0.0001 ) {
    int eIdx = gl_InstanceID;
    int ex = eIdx % uExplodeTexW;
    int ey = eIdx / uExplodeTexW;
    mvPosition.xyz += texelFetch( uExplodeTex, ivec2( ex, ey ), 0 ).xyz * uExplode;
  }
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `#include <common>
varying vec3 vFastShade;`
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `diffuseColor.rgb = vFastShade;`
      );
    };

    this.materials.set(cacheKey, { resource: mat, refCount: 1, depTextures });
    return mat;
  }

  /**
   * Acquire a Play Ground Hyper-Engine Dual-Atlas MatCap material (0 dynamic lights,
   * in-shader per-instance 3D Vivid Blue Selection + Red Error / Amber Warning highlight!).
   */
  public acquirePlaygroundMatcapMaterial(
    mode: 'solid_opaque' | 'solid_glass' | 'xray' | 'wireframe'
  ): THREE.Material {
    const cacheKey = `pg_hyper_mat:${mode}`;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      return existing.resource;
    }

    const depTextures: string[] = [];
    let mat: THREE.Material;
    if (mode === 'wireframe') {
      mat = new THREE.MeshBasicMaterial({
        color: 0x1e3a8a,
        wireframe: true,
        transparent: true,
        opacity: 0.62,
        toneMapped: false,
      });
    } else {
      const matcapTex = this.acquireTexture('matcap_studio_dual');
      const dummyExplodeTex = this.acquireTexture('lite_explode_dummy') as THREE.DataTexture;
      depTextures.push('matcap_studio_dual', 'lite_explode_dummy');

      const isXray = mode === 'xray';
      const isGlass = mode === 'solid_glass';
      const baseColor = new THREE.Color(isXray ? 0x93c5fd : 0xffffff).multiplyScalar(
        isXray ? 1.25 : 1.48
      );
      const mcMat = new THREE.MeshMatcapMaterial({
        color: baseColor,
        matcap: matcapTex,
        vertexColors: !isXray,
        transparent: isXray || isGlass,
        opacity: isXray ? 0.34 : isGlass ? 0.42 : 1.0,
        depthWrite: !isXray && !isGlass,
        side: isXray ? THREE.DoubleSide : THREE.FrontSide,
        toneMapped: false,
      });
      ResourceCache.patchLiteMatcapMaterial(mcMat, dummyExplodeTex, {
        dualAtlas: true,
        defaultFinish: isXray ? 0.0 : 1.0,
        enableRim: !isXray && !isGlass,
        playgroundMode: true,
      });
      mat = mcMat;
    }

    mat.userData.__cacheKey = cacheKey;
    this.materials.set(cacheKey, { resource: mat, refCount: 1, depTextures });
    return mat;
  }

  /**
   * Acquire ref-counted fullscreen post-process ShaderMaterials for ULTRA Zero-Jaggy AA + F1.2 Bokeh + FAST Blit.
   * Centralized in ResourceCache to strictly satisfy CI Gate 3-1 & guarantee Δg=0 / Δt=0 / Refs=0!
   */
  public acquirePostProcessMaterial(
    kind: 'ultra_accum' | 'ultra_bokeh' | 'ultra_resolve' | 'fast_blit'
  ): THREE.ShaderMaterial {
    const cacheKey = `post:${kind}`;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      return existing.resource as THREE.ShaderMaterial;
    }

    const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4( position.xy, 0.0, 1.0 );
}`;

    let mat: THREE.ShaderMaterial;
    if (kind === 'ultra_accum') {
      mat = new THREE.ShaderMaterial({
        uniforms: {
          tPrev: { value: null },
          tCurr: { value: null },
          uWeight: { value: 1.0 },
        },
        vertexShader: vert,
        fragmentShader: `
uniform sampler2D tPrev;
uniform sampler2D tCurr;
uniform float uWeight;
varying vec2 vUv;
void main() {
  vec4 curr = texture2D( tCurr, vUv );
  if ( uWeight >= 0.999 ) {
    gl_FragColor = curr;
  } else {
    vec4 prev = texture2D( tPrev, vUv );
    gl_FragColor = mix( prev, curr, uWeight );
  }
}`,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
    } else if (kind === 'ultra_bokeh') {
      mat = new THREE.ShaderMaterial({
        uniforms: {
          tColor: { value: null },
          tDepth: { value: null },
          uTexelSize: { value: new THREE.Vector2(1 / 1280, 1 / 720) },
          uCameraNear: { value: 0.85 },
          uCameraFar: { value: 4200.0 },
          uFocusDist: { value: 220.0 },
          uApertureScale: { value: 12.0 },
          uMaxCocPx: { value: 9.0 },
          uRotationAngle: { value: 0.0 },
        },
        vertexShader: vert,
        fragmentShader: `
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform vec2 uTexelSize;
uniform float uCameraNear;
uniform float uCameraFar;
uniform float uFocusDist;
uniform float uApertureScale;
uniform float uMaxCocPx;
uniform float uRotationAngle;
varying vec2 vUv;

float linearDepth( float z ) {
  float ndc = z * 2.0 - 1.0;
  return ( 2.0 * uCameraNear * uCameraFar ) / max( 0.0001, uCameraFar + uCameraNear - ndc * ( uCameraFar - uCameraNear ) );
}

float calcCoc( float d, float rawZ ) {
  if ( rawZ >= 0.99985 ) return 0.0;
  float rel = abs( d - uFocusDist ) / max( d, 0.25 );
  return clamp( ( rel - 0.09 ) * uApertureScale, 0.0, uMaxCocPx );
}

void main() {
  vec4 centerCol = texture2D( tColor, vUv );
  float rawZ = texture2D( tDepth, vUv ).r;
  float centerD = linearDepth( rawZ );
  float centerCoc = calcCoc( centerD, rawZ );

  // Fast early-out on crisp focal plane
  if ( centerCoc < 0.35 && rawZ < 0.99985 ) {
    gl_FragColor = centerCol;
    return;
  }

  float radiusPx = rawZ >= 0.99985 ? uMaxCocPx * 0.55 : max( centerCoc, 0.5 );
  vec4 acc = centerCol;
  float wSum = 1.0;
  const float GOLDEN = 2.39996323;

  for ( int i = 0; i < 16; i++ ) {
    float fi = float( i );
    float r = sqrt( ( fi + 0.5 ) / 16.0 ) * radiusPx;
    float ang = fi * GOLDEN + uRotationAngle;
    vec2 ofs = vec2( cos( ang ), sin( ang ) ) * r * uTexelSize;
    vec2 suv = clamp( vUv + ofs, vec2( 0.001 ), vec2( 0.999 ) );
    float sRawZ = texture2D( tDepth, suv ).r;
    float sD = linearDepth( sRawZ );
    float sCoc = calcCoc( sD, sRawZ );

    // Prevent razor-sharp in-focus foreground edges from bleeding into blurred background
    float bgWeight = ( sD + 0.6 < centerD && sCoc < 0.65 ) ? 0.0 : 1.0;
    float scatterW = rawZ >= 0.99985
      ? smoothstep( 0.35, 2.4, sCoc ) * ( sRawZ < 0.99985 ? 0.48 : 0.0 )
      : ( sCoc >= r * 0.65 || sD >= centerD - 0.5 ? 1.0 : 0.16 );
    vec4 sCol = texture2D( tColor, suv );
    float luma = dot( sCol.rgb, vec3( 0.2126, 0.7152, 0.0722 ) ) / max( sCol.a, 0.05 );
    float bokehPop = 1.0 + 0.24 * smoothstep( 0.95, 2.4, luma );
    float w = bgWeight * scatterW * bokehPop;
    acc += sCol * w;
    wSum += w;
  }

  gl_FragColor = acc / max( wSum, 0.0001 );
}`,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
    } else if (kind === 'ultra_resolve') {
      mat = new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: { value: null },
          uExposure: { value: 1.18 },
        },
        vertexShader: vert,
        fragmentShader: `
uniform sampler2D tDiffuse;
uniform float uExposure;
varying vec2 vUv;

vec3 RRTAndODTFit( vec3 v ) {
  vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
  vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
  return a / b;
}

vec3 acesFilmic( vec3 color ) {
  const mat3 ACESInputMat = mat3(
    vec3( 0.59719, 0.07600, 0.02840 ),
    vec3( 0.35458, 0.90834, 0.13383 ),
    vec3( 0.04823, 0.01566, 0.83777 )
  );
  const mat3 ACESOutputMat = mat3(
    vec3(  1.60475, -0.10208, -0.00327 ),
    vec3( -0.53108,  1.10813, -0.07276 ),
    vec3( -0.07367, -0.00605,  1.07602 )
  );
  color = ACESInputMat * color;
  color = RRTAndODTFit( color );
  color = ACESOutputMat * color;
  return clamp( color, 0.0, 1.0 );
}

vec3 linearToSrgb( vec3 c ) {
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow( max( c, vec3( 0.0 ) ), vec3( 1.0 / 2.4 ) ) - 0.055;
  return mix( lo, hi, step( vec3( 0.0031308 ), c ) );
}

void main() {
  vec4 premul = texture2D( tDiffuse, vUv );
  float alpha = clamp( premul.a, 0.0, 1.0 );
  if ( alpha < 0.0005 ) {
    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
    return;
  }
  vec3 hdr = ( premul.rgb / max( alpha, 0.001 ) ) * ( uExposure / 0.6 );
  vec3 srgbObj = linearToSrgb( acesFilmic( hdr ) );
  vec3 composited = mix( vec3( 1.0 ), srgbObj, alpha );
  float ign = fract( 52.9829189 * fract( dot( gl_FragCoord.xy, vec2( 0.06711056, 0.00583715 ) ) ) );
  composited = clamp( composited + ( ign - 0.5 ) / 255.0, 0.0, 1.0 );
  gl_FragColor = vec4( composited, 1.0 );
}`,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
    } else {
      mat = new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: { value: null },
        },
        vertexShader: vert,
        fragmentShader: `
uniform sampler2D tDiffuse;
varying vec2 vUv;
void main() {
  gl_FragColor = texture2D( tDiffuse, vUv );
}`,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
    }

    mat.userData.__cacheKey = cacheKey;
    this.materials.set(cacheKey, { resource: mat, refCount: 1 });
    return mat;
  }

  /**
   * Acquire a ref-counted bespoke hero-textured material for a specific unit (lazy CanvasTexture + auto-dispose).
   */
  public acquireHeroMaterial(
    heroKey: string,
    spec: HeroMaterialSpec,
    quality: QualityTier,
    renderMode: RenderMode = 'solid',
    clippingPlanes: THREE.Plane[] = [],
    poolSlot = 0
  ): THREE.Material {
    if (renderMode !== 'solid') {
      return this.acquireMaterial(spec.bucket, quality, renderMode, clippingPlanes, false, poolSlot);
    }

    const slotSuffix = quality === 'standard_lite' && poolSlot > 0 ? `:p${poolSlot}` : '';
    const cacheKey = `hero:${heroKey}:${quality}:${renderMode}${slotSuffix}`;
    const targetSide: THREE.Side = clippingPlanes.length > 0 ? THREE.DoubleSide : THREE.FrontSide;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      existing.resource.clippingPlanes = clippingPlanes;
      if (existing.resource.userData?.__managedSide && existing.resource.side !== targetSide) {
        existing.resource.side = targetSide;
        existing.resource.needsUpdate = true;
      }
      return existing.resource;
    }

    const bucketSpec = MATERIAL_SPECS[spec.bucket];
    const texKey = `herotex:${heroKey}:${quality}`;
    const mapTex = this.acquireHeroTexture(heroKey, spec, quality);
    const depTextures = [texKey];

    const metalness = spec.metalness ?? bucketSpec.metalness;
    const roughness = spec.roughness ?? bucketSpec.roughness;
    const transparent = spec.transparent ?? Boolean(bucketSpec.transparent);
    const opacity = spec.opacity ?? (bucketSpec.opacity ?? 1.0);
    const depthWrite = spec.depthWrite ?? !transparent;

    const commonProps = {
      color: spec.baseColor ?? 0xffffff,
      map: mapTex,
      clippingPlanes,
      clipShadows: quality === 'ultra',
      side: targetSide,
      transparent,
      opacity,
      depthWrite,
      emissive: spec.emissive ?? bucketSpec.emissive ?? 0x000000,
      emissiveIntensity: spec.emissiveIntensity ?? bucketSpec.emissiveIntensity ?? 0,
    };

    let mat: THREE.Material;
    if (quality === 'standard_lite') {
      const matcapKey: ProceduralTextureKey = 'matcap_studio_dual';
      const matcapTex = this.acquireTexture(matcapKey);
      const dummyExplodeTex = this.acquireTexture('lite_explode_dummy') as THREE.DataTexture;
      depTextures.push(matcapKey, 'lite_explode_dummy');
      const heroLiteColor = new THREE.Color(commonProps.color).multiplyScalar(1.42);
      const mcMat = new THREE.MeshMatcapMaterial({
        color: heroLiteColor,
        map: mapTex,
        matcap: matcapTex,
        clippingPlanes,
        side: targetSide,
        transparent,
        opacity,
        depthWrite,
        toneMapped: false,
      });
      ResourceCache.patchLiteMatcapMaterial(mcMat, dummyExplodeTex, {
        dualAtlas: true,
        defaultFinish: bucketSpec.stdLambert && !transparent ? 0.0 : 1.0,
        enableRim: !transparent,
        playgroundMode: false,
      });
      mat = mcMat;
    } else if (quality === 'standard') {
      if (bucketSpec.stdLambert && !transparent) {
        mat = new THREE.MeshLambertMaterial(commonProps);
        ResourceCache.patchStandardSelectionAndAA(mat, { specularAA: false, tag: 'hero_l' });
      } else {
        const phong = ResourceCache.computeStdPhongProps(metalness, roughness, transparent);
        mat = new THREE.MeshPhongMaterial({
          ...commonProps,
          specular: phong.specular,
          shininess: phong.shininess,
        });
        ResourceCache.patchStandardSelectionAndAA(mat, { specularAA: false, tag: 'hero_p' });
      }
    } else if (quality === 'ultra' && bucketSpec.ultraPhysical) {
      mat = new THREE.MeshPhysicalMaterial({
        ...commonProps,
        metalness,
        roughness,
        clearcoat: bucketSpec.ultraPhysical.clearcoat,
        clearcoatRoughness: bucketSpec.ultraPhysical.clearcoatRoughness,
        iridescence: bucketSpec.ultraPhysical.iridescence ?? 0,
        iridescenceIOR: bucketSpec.ultraPhysical.iridescenceIOR ?? 1.3,
        envMapIntensity: 1.34,
      });
      ResourceCache.patchStandardSelectionAndAA(mat, { specularAA: true, tag: 'hero_up' });
    } else {
      mat = new THREE.MeshStandardMaterial({
        ...commonProps,
        metalness,
        roughness,
        envMapIntensity: quality === 'ultra' ? 1.16 : 0.95,
      });
      ResourceCache.patchStandardSelectionAndAA(mat, {
        specularAA: quality === 'ultra' || quality === 'high',
        tag: quality === 'ultra' ? 'hero_us' : 'hero_hs',
      });
    }

    mat.userData.__cacheKey = cacheKey;
    mat.userData.__materialBucket = spec.bucket;
    mat.userData.__heroKey = heroKey;
    mat.userData.__managedSide = true;
    this.materials.set(cacheKey, { resource: mat, refCount: 1, depTextures });
    return mat;
  }

  public acquireLineMaterial(
    key: string,
    params: {
      color: number;
      opacity: number;
      dashed?: boolean;
      dashSize?: number;
      gapSize?: number;
      vertexColors?: boolean;
      clippingPlanes?: THREE.Plane[];
    }
  ): THREE.LineBasicMaterial | THREE.LineDashedMaterial {
    const cacheKey = `line:${key}`;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      existing.resource.clippingPlanes = params.clippingPlanes ?? [];
      return existing.resource as THREE.LineBasicMaterial | THREE.LineDashedMaterial;
    }

    const mat = params.dashed
      ? new THREE.LineDashedMaterial({
          color: params.color,
          dashSize: params.dashSize ?? 1.4,
          gapSize: params.gapSize ?? 0.9,
          transparent: true,
          opacity: params.opacity,
          vertexColors: params.vertexColors ?? false,
          clippingPlanes: params.clippingPlanes ?? [],
        })
      : new THREE.LineBasicMaterial({
          color: params.color,
          transparent: true,
          opacity: params.opacity,
          vertexColors: params.vertexColors ?? false,
          clippingPlanes: params.clippingPlanes ?? [],
        });
    mat.userData.__cacheKey = cacheKey;
    this.materials.set(cacheKey, { resource: mat, refCount: 1 });
    return mat;
  }

  public acquireBasicMaterial(
    key: string,
    params: {
      color: number;
      transparent?: boolean;
      opacity?: number;
      side?: THREE.Side;
      depthWrite?: boolean;
      clippingPlanes?: THREE.Plane[];
    }
  ): THREE.MeshBasicMaterial {
    const cacheKey = `basic:${key}`;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      existing.resource.clippingPlanes = params.clippingPlanes ?? [];
      return existing.resource as THREE.MeshBasicMaterial;
    }

    const mat = new THREE.MeshBasicMaterial({
      color: params.color,
      transparent: params.transparent ?? false,
      opacity: params.opacity ?? 1.0,
      side: params.side ?? THREE.FrontSide,
      depthWrite: params.depthWrite ?? !(params.transparent ?? false),
      clippingPlanes: params.clippingPlanes ?? [],
    });
    mat.userData.__cacheKey = cacheKey;
    this.materials.set(cacheKey, { resource: mat, refCount: 1 });
    return mat;
  }

  public acquireShadowMaterial(
    key: string,
    params: {
      color?: number;
      opacity?: number;
    } = {}
  ): THREE.ShadowMaterial {
    const cacheKey = `shadow:${key}`;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      return existing.resource as THREE.ShadowMaterial;
    }
    const mat = new THREE.ShadowMaterial({
      color: params.color ?? 0x0f172a,
      opacity: params.opacity ?? 0.16,
      transparent: true,
      depthWrite: false,
    });
    mat.userData.__cacheKey = cacheKey;
    this.materials.set(cacheKey, { resource: mat, refCount: 1 });
    return mat;
  }

  public acquirePointsMaterial(
    key: string,
    params: {
      color: number;
      size: number;
      transparent?: boolean;
      opacity?: number;
      vertexColors?: boolean;
      clippingPlanes?: THREE.Plane[];
    }
  ): THREE.PointsMaterial {
    const cacheKey = `points:${key}`;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      existing.resource.clippingPlanes = params.clippingPlanes ?? [];
      return existing.resource as THREE.PointsMaterial;
    }

    const mat = new THREE.PointsMaterial({
      color: params.color,
      size: params.size,
      transparent: params.transparent ?? true,
      opacity: params.opacity ?? 0.9,
      vertexColors: params.vertexColors ?? false,
      clippingPlanes: params.clippingPlanes ?? [],
    });
    mat.userData.__cacheKey = cacheKey;
    this.materials.set(cacheKey, { resource: mat, refCount: 1 });
    return mat;
  }

  public releaseMaterial(cacheKey: string): boolean {
    const entry = this.materials.get(cacheKey);
    if (!entry) return false;
    entry.refCount--;
    if (entry.refCount <= 0) {
      if (entry.depTextures) {
        for (let i = 0; i < entry.depTextures.length; i++) {
          this.releaseTexture(entry.depTextures[i]);
        }
      }
      entry.resource.dispose();
      this.materials.delete(cacheKey);
      return true;
    }
    return false;
  }

  public releaseMaterialInstance(mat: THREE.Material): boolean {
    const key = mat.userData?.__cacheKey as string | undefined;
    if (key && this.materials.has(key)) {
      return this.releaseMaterial(key);
    }
    return false;
  }

  public releaseGeometryInstance(geo: THREE.BufferGeometry): boolean {
    const key = geo.userData?.__cacheKey as string | undefined;
    if (key && this.geometries.has(key)) {
      return this.releaseGeometry(key);
    }
    return false;
  }

  public hasMaterial(cacheKey: string): boolean {
    return this.materials.has(cacheKey);
  }

  public hasGeometry(cacheKey: string): boolean {
    return this.geometries.has(cacheKey);
  }

  public updateClippingPlanes(planes: THREE.Plane[]): void {
    const targetSide: THREE.Side = planes.length > 0 ? THREE.DoubleSide : THREE.FrontSide;
    for (const entry of this.materials.values()) {
      const mat = entry.resource;
      mat.clippingPlanes = planes;
      if (mat.userData?.__managedSide && mat.side !== targetSide) {
        mat.side = targetSide;
        mat.needsUpdate = true;
      }
    }
  }

  /**
   * Pre-compile all active unit shader programs BEFORE first visible frame to eliminate first-orbit Shader Hitch.
   */
  public warmupShaders(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): number {
    const start = typeof performance !== 'undefined' ? performance.now() : 0;
    renderer.compile(scene, camera);
    const end = typeof performance !== 'undefined' ? performance.now() : 0;
    return end - start;
  }

  public getStats(): ResourceCacheStats {
    let totalRefs = 0;
    for (const e of this.materials.values()) totalRefs += e.refCount;
    for (const e of this.geometries.values()) totalRefs += e.refCount;
    for (const e of this.textures.values()) totalRefs += e.refCount;
    return {
      materials: this.materials.size,
      geometries: this.geometries.size,
      textures: this.textures.size,
      totalRefs,
      activeMaterialKeys: Array.from(this.materials.keys()),
      activeGeometryKeys: Array.from(this.geometries.keys()),
      activeTextureKeys: Array.from(this.textures.keys()),
    };
  }

  /** Emergency hard purge (only for full viewport teardown) */
  public disposeAll(): void {
    for (const entry of this.materials.values()) {
      entry.resource.dispose();
    }
    this.materials.clear();
    for (const entry of this.geometries.values()) {
      entry.resource.dispose();
    }
    this.geometries.clear();
    for (const entry of this.textures.values()) {
      entry.resource.dispose();
    }
    this.textures.clear();
  }
}
