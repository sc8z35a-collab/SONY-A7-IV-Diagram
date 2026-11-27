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
    curveSegments: 8,
    radialSegments: 10,
    torusTubularSegments: 10,
    sphereSegments: 8,
    shadowsEnabled: false,
    postProcessEnabled: false,
    enableStudioEnv: false,
    showSolidStructuralEdges: true,
    maxHeroTextureDim: 256,
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
    curveSegments: 18,
    radialSegments: 22,
    torusTubularSegments: 22,
    sphereSegments: 20,
    shadowsEnabled: true,
    postProcessEnabled: false,
    enableStudioEnv: true,
    showSolidStructuralEdges: true,
    maxHeroTextureDim: 1024,
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
    // Commercial product-photography cyclorama: overhead key scrim softbox, twin vertical rim
    // light strips, dark velvet contrast flags (giving liquid chrome/anodized specular depth!),
    // and luminous studio floor bounce (0.00% crushed blacks!).
    const w = 512;
    const h = 256;
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

        // Base studio cyclorama gradient (rich mid-high ceiling, soft bounce floor)
        let rL = dy >= 0 ? 0.56 + dy * 0.34 : 0.44 + (1 + dy) * 0.14;
        let gL = dy >= 0 ? 0.59 + dy * 0.34 : 0.46 + (1 + dy) * 0.14;
        let bL = dy >= 0 ? 0.64 + dy * 0.34 : 0.51 + (1 + dy) * 0.15;

        // Subtle dark velvet contrast flags near horizon (-0.12..+0.18) for dramatic metallic reflections!
        const horizonFlag = Math.exp(-Math.pow((dy - 0.02) * 5.8, 2));
        const flagMask = 0.62 + 0.38 * Math.pow(Math.abs(Math.sin(phi * 2.0 + 0.35)), 0.7);
        const flagAtten = 1.0 - horizonFlag * 0.44 * flagMask;
        rL *= flagAtten;
        gL *= flagAtten;
        bL *= flagAtten;

        // 1) Crisp overhead key softbox scrim (feathered rectangular dome highlight for lens barrels)
        const keySoft =
          Math.exp(-Math.pow((dx + 0.34) * 2.8, 2)) *
          Math.exp(-Math.pow((dy - 0.84) * 4.5, 2)) *
          Math.exp(-Math.pow((dz - 0.28) * 2.4, 2));
        const keySpec = Math.pow(Math.max(0, dx * -0.44 + dy * 0.78 + dz * 0.44), 14);
        rL += keySoft * 1.45 + keySpec * 0.95;
        gL += keySoft * 1.46 + keySpec * 0.96;
        bL += keySoft * 1.50 + keySpec * 1.00;

        // 2) Twin vertical architectural rim light strips (crisp cool sapphire-silver edge kickers!)
        const rimRight =
          Math.exp(-Math.pow((dx - 0.78) * 5.5, 2)) *
          Math.exp(-Math.pow((dy - 0.24) * 2.4, 2)) *
          Math.exp(-Math.pow((dz + 0.52) * 4.0, 2));
        const rimLeft =
          Math.exp(-Math.pow((dx + 0.84) * 6.0, 2)) *
          Math.exp(-Math.pow((dy - 0.16) * 2.6, 2)) *
          Math.exp(-Math.pow((dz + 0.36) * 4.2, 2));
        rL += rimRight * 1.15 + rimLeft * 0.88;
        gL += rimRight * 1.24 + rimLeft * 0.92;
        bL += rimRight * 1.42 + rimLeft * 1.02;

        // 3) Warm front-right fill softbox panel (lifts camera grip & glass reflections cleanly)
        const fillPanel = Math.pow(Math.max(0, dx * 0.56 + dy * 0.28 + dz * 0.78), 7);
        rL += fillPanel * 0.68;
        gL += fillPanel * 0.66;
        bL += fillPanel * 0.64;

        // 4) Lower front studio white-card bounce (guarantees 0% crushed blacks under barrels/grips)
        const bounceCard = Math.pow(Math.max(0, dx * 0.18 + dy * -0.52 + dz * 0.84), 3);
        rL += bounceCard * 0.34;
        gL += bounceCard * 0.36;
        bL += bounceCard * 0.40;

        // Soft filmic shoulder compression into sRGB 8-bit while keeping crisp specular peaks at 255
        const enc = (c: number) => {
          const mapped = c / (1 + c * 0.32);
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

  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const hash = (((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1) + 1) % 1;
      if (key === 'cnc_brushed') {
        const streak = Math.sin(y * 1.35) * 14 + (hash - 0.5) * 18;
        const v = Math.min(255, Math.max(0, Math.round(128 + streak)));
        data[idx] = v;
        data[idx + 1] = v;
        data[idx + 2] = v;
        data[idx + 3] = 255;
      } else if (key === 'mg_grain') {
        const v = Math.min(255, Math.max(0, Math.round(112 + hash * 40)));
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
        const wave = 0.5 + 0.5 * Math.sin((x / size) * Math.PI * 16);
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
          Math.sin(x * 0.9 + Math.cos(y * 0.85) * 1.4) * Math.cos(y * 0.95) * 32;
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
        const phase = ((x + y * 0.7) / size) * Math.PI * 4;
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
        const wire = x % 6 === 0 || y % 6 === 0 ? 192 : 96;
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
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
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
        cTex.anisotropy = quality === 'ultra' ? 4 : quality === 'high' ? 2 : 1;
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
    vertexColors = false
  ): THREE.Material {
    const isStdLite = quality === 'standard_lite';
    const useVC = isStdLite && renderMode === 'solid' && vertexColors;
    const cacheKey = `mat:${bucket}:${quality}:${renderMode}${useVC ? ':vc' : ''}`;
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
      const matcapKey: ProceduralTextureKey =
        isXray || isCad || (spec.stdLambert && !spec.transparent)
          ? 'matcap_studio_matte'
          : 'matcap_studio_metal';
      const matcapTex = this.acquireTexture(matcapKey);
      depTextures.push(matcapKey);
      const liteColor = new THREE.Color(commonProps.color);
      if (!isCad && !isXray) {
        // Recover full studio HDR dynamic range normalized inside the 8-bit MatCap texture
        liteColor.multiplyScalar(2.08);
      } else if (isCad) {
        liteColor.multiplyScalar(1.56);
      } else {
        liteColor.multiplyScalar(1.62);
      }
      mat = new THREE.MeshMatcapMaterial({
        ...commonProps,
        color: liteColor,
        matcap: matcapTex,
        vertexColors: useVC,
        polygonOffset: isCad,
        polygonOffsetFactor: isCad ? 1 : 0,
        polygonOffsetUnits: isCad ? 1 : 0,
      });
    } else if (isXray) {
      mat = new THREE.MeshLambertMaterial({
        ...commonProps,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.14,
      });
    } else if (isCad) {
      mat = new THREE.MeshLambertMaterial({
        ...commonProps,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
    } else if (quality === 'standard') {
      if (spec.stdLambert && !spec.transparent) {
        mat = new THREE.MeshLambertMaterial({
          ...commonProps,
          map: mapTex,
          emissive: spec.emissive ?? 0x000000,
          emissiveIntensity: spec.emissiveIntensity ?? 0,
        });
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
      }
    } else if (quality === 'ultra' && spec.ultraPhysical) {
      mat = new THREE.MeshPhysicalMaterial({
        ...commonProps,
        map: mapTex,
        bumpMap: bumpTex,
        bumpScale: spec.bumpScale ?? 0.02,
        metalness: spec.metalness,
        roughness: spec.roughness,
        clearcoat: spec.ultraPhysical.clearcoat,
        clearcoatRoughness: spec.ultraPhysical.clearcoatRoughness,
        iridescence: spec.ultraPhysical.iridescence ?? 0,
        iridescenceIOR: spec.ultraPhysical.iridescenceIOR ?? 1.3,
        ior: spec.ultraPhysical.ior ?? 1.5,
        reflectivity: spec.ultraPhysical.reflectivity ?? 0.5,
        envMapIntensity: 1.34,
        emissive: spec.emissive ?? 0x000000,
        emissiveIntensity: spec.emissiveIntensity ?? 0,
      });
    } else {
      mat = new THREE.MeshStandardMaterial({
        ...commonProps,
        map: mapTex,
        bumpMap: bumpTex,
        bumpScale: spec.bumpScale ?? 0.02,
        metalness: spec.metalness,
        roughness: spec.roughness,
        envMapIntensity: quality === 'ultra' ? 1.16 : 0.95,
        emissive: spec.emissive ?? 0x000000,
        emissiveIntensity: spec.emissiveIntensity ?? 0,
      });
    }

    mat.userData.__cacheKey = cacheKey;
    mat.userData.__materialBucket = bucket;
    mat.userData.__managedSide = true;
    this.materials.set(cacheKey, { resource: mat, refCount: 1, depTextures });
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
    clippingPlanes: THREE.Plane[] = []
  ): THREE.Material {
    if (renderMode !== 'solid') {
      return this.acquireMaterial(spec.bucket, quality, renderMode, clippingPlanes);
    }

    const cacheKey = `hero:${heroKey}:${quality}:${renderMode}`;
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
      const matcapKey: ProceduralTextureKey =
        bucketSpec.stdLambert && !transparent ? 'matcap_studio_matte' : 'matcap_studio_metal';
      const matcapTex = this.acquireTexture(matcapKey);
      depTextures.push(matcapKey);
      const heroLiteColor = new THREE.Color(commonProps.color).multiplyScalar(1.88);
      mat = new THREE.MeshMatcapMaterial({
        color: heroLiteColor,
        map: mapTex,
        matcap: matcapTex,
        clippingPlanes,
        side: targetSide,
        transparent,
        opacity,
        depthWrite,
      });
    } else if (quality === 'standard') {
      if (bucketSpec.stdLambert && !transparent) {
        mat = new THREE.MeshLambertMaterial(commonProps);
      } else {
        const phong = ResourceCache.computeStdPhongProps(metalness, roughness, transparent);
        mat = new THREE.MeshPhongMaterial({
          ...commonProps,
          specular: phong.specular,
          shininess: phong.shininess,
        });
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
    } else {
      mat = new THREE.MeshStandardMaterial({
        ...commonProps,
        metalness,
        roughness,
        envMapIntensity: quality === 'ultra' ? 1.16 : 0.95,
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
