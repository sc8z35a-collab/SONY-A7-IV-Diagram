import * as THREE from 'three';
import { RenderMode } from '../assemblies/types';
import { QualityTier } from './unit_contract';

export type MaterialBucketKey =
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
  | 'torus_seal';

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
}

export const QUALITY_TIER_CONFIG: Record<QualityTier, QualityTierConfig> = {
  standard: {
    maxPixelRatio: 1.0,
    curveSegments: 6,
    radialSegments: 8,
    torusTubularSegments: 10,
    sphereSegments: 10,
    shadowsEnabled: false,
    postProcessEnabled: false,
    enableStudioEnv: false,
    showSolidStructuralEdges: false,
  },
  high: {
    maxPixelRatio: 1.5,
    curveSegments: 12,
    radialSegments: 14,
    torusTubularSegments: 16,
    sphereSegments: 16,
    shadowsEnabled: false,
    postProcessEnabled: false,
    enableStudioEnv: true,
    showSolidStructuralEdges: true,
  },
  ultra: {
    maxPixelRatio: 2.0,
    curveSegments: 18,
    radialSegments: 22,
    torusTubularSegments: 22,
    sphereSegments: 20,
    shadowsEnabled: false,
    postProcessEnabled: false,
    enableStudioEnv: true,
    showSolidStructuralEdges: true,
  },
};

interface MaterialSpec {
  readonly color: number;
  readonly metalness: number;
  readonly roughness: number;
  /** Only hero metallic/optical/semiconductor materials upgrade to MeshPhysicalMaterial in ULTRA */
  readonly ultraPhysical?: {
    readonly clearcoat: number;
    readonly clearcoatRoughness: number;
    readonly iridescence?: number;
    readonly iridescenceIOR?: number;
  };
  /** Use MeshLambertMaterial in STD when non-metallic/matte for lowest ALU cost */
  readonly stdLambert?: boolean;
  readonly mapTextureKey?: ProceduralTextureKey;
  readonly bumpTextureKey?: ProceduralTextureKey;
  readonly bumpScale?: number;
  readonly emissive?: number;
  readonly emissiveIntensity?: number;
}

export type ProceduralTextureKey =
  | 'studio_env'
  | 'cnc_brushed'
  | 'mg_grain'
  | 'hdi_pcb'
  | 'silicon_die'
  | 'copper_coil';

const MATERIAL_SPECS: Record<MaterialBucketKey, MaterialSpec> = {
  // Hero metallic BatchedMesh bucket (white base so per-instance setColorAt preserves exact stainless/copper/silver/titanium/brass hues!)
  metal_hero: {
    color: 0xffffff,
    metalness: 0.90,
    roughness: 0.22,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.016,
    ultraPhysical: { clearcoat: 0.32, clearcoatRoughness: 0.14 },
  },
  // Matte structural & dielectric BatchedMesh bucket (white base for per-instance setColorAt)
  matte_chassis: {
    color: 0xffffff,
    metalness: 0.26,
    roughness: 0.50,
    stdLambert: true,
    bumpTextureKey: 'mg_grain',
    bumpScale: 0.025,
  },
  // Elastomer / EPDM / butyl / conductive foam BatchedMesh bucket
  elastomer_rubber: {
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.86,
    stdLambert: true,
    bumpTextureKey: 'mg_grain',
    bumpScale: 0.04,
  },
  // HDI Mainboard PCB slices with procedural dark-teal PCB trace texture
  pcb_textured: {
    color: 0xffffff,
    metalness: 0.22,
    roughness: 0.42,
    stdLambert: true,
    mapTextureKey: 'hdi_pcb',
    bumpTextureKey: 'hdi_pcb',
    bumpScale: 0.028,
  },
  // Hero polyimide FPC / silicon die / optical-accent BatchedMesh bucket (Physical clearcoat/iridescence in ULTRA)
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
  // Gold plating for InstancedMesh pins, cantilever tips, traces, ZIF leads
  gold_plating: {
    color: 0xffffff,
    metalness: 0.94,
    roughness: 0.18,
    ultraPhysical: { clearcoat: 0.36, clearcoatRoughness: 0.12 },
  },
  // Phosphor-bronze / BeCu spring beams
  becu_spring: {
    color: 0xffffff,
    metalness: 0.89,
    roughness: 0.23,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.02,
    ultraPhysical: { clearcoat: 0.24, clearcoatRoughness: 0.16 },
  },
  // Precision machined stainless / screw heads & shanks
  stainless_machined: {
    color: 0xffffff,
    metalness: 0.90,
    roughness: 0.21,
    bumpTextureKey: 'cnc_brushed',
    bumpScale: 0.015,
    ultraPhysical: { clearcoat: 0.30, clearcoatRoughness: 0.14 },
  },
  // Matte black LCP comb teeth / dark screws / housings
  matte_black_anodized: {
    color: 0xffffff,
    metalness: 0.48,
    roughness: 0.46,
    stdLambert: true,
  },
  // Glossy color-coded functional pin carriers (MI12–MI20)
  pin_carrier_gloss: {
    color: 0xffffff,
    metalness: 0.14,
    roughness: 0.26,
    stdLambert: true,
    ultraPhysical: { clearcoat: 0.58, clearcoatRoughness: 0.14 },
  },
  // Copper EMI choke windings
  copper_coil: {
    color: 0xffffff,
    metalness: 0.88,
    roughness: 0.24,
    mapTextureKey: 'copper_coil',
    bumpTextureKey: 'copper_coil',
    bumpScale: 0.03,
    ultraPhysical: { clearcoat: 0.22, clearcoatRoughness: 0.18 },
  },
  // Lock rings & waterproof O-ring torus seals
  torus_seal: {
    color: 0xffffff,
    metalness: 0.36,
    roughness: 0.52,
    stdLambert: true,
  },
};

/**
 * Deterministic procedural DataTexture builders (zero DOM Canvas dependency — works identically in WebGL & Node CI!).
 */
function buildProceduralDataTexture(key: ProceduralTextureKey): THREE.DataTexture {
  if (key === 'studio_env') {
    // 128x64 equirectangular softbox studio HDR-like environment for crisp bright white studio reflections
    const w = 128;
    const h = 64;
    const data = new Uint8Array(w * h * 4);
    for (let y = 0; y < h; y++) {
      const v = y / (h - 1); // 0 = bottom, 1 = top
      const theta = (1 - v) * Math.PI;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);
      for (let x = 0; x < w; x++) {
        const u = x / (w - 1);
        const phi = u * Math.PI * 2;
        const dx = sinT * Math.cos(phi);
        const dy = cosT;
        const dz = sinT * Math.sin(phi);

        // Bright studio cyclorama base + overhead softbox + key/rim highlights
        let lum = 0.62 + Math.max(0, dy) * 0.26;
        // Key softbox (-0.52, 0.72, 0.46)
        const keyDot = Math.max(0, dx * -0.517 + dy * 0.716 + dz * 0.458);
        lum += Math.pow(keyDot, 6) * 0.55;
        // Rim softbox (0.65, 0.36, -0.67)
        const rimDot = Math.max(0, dx * 0.648 + dy * 0.365 + dz * -0.669);
        lum += Math.pow(rimDot, 8) * 0.45;
        // Dark horizon studio strip for crisp metallic contrast
        const band = Math.exp(-Math.pow((dy + 0.08) * 7.5, 2));
        lum *= 1.0 - band * 0.42;

        const r = Math.min(255, Math.max(0, Math.round(lum * 246)));
        const g = Math.min(255, Math.max(0, Math.round(lum * 249)));
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

  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const hash = ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1 + 1) % 1;
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
        // Dark emerald-teal HDI solder mask with fine copper micro-traces & gold vias
        const isTrace = x % 8 === 0 || y % 12 === 0;
        const isVia = x % 16 === 4 && y % 16 === 4;
        if (isVia) {
          data[idx] = 212;
          data[idx + 1] = 176;
          data[idx + 2] = 74;
        } else if (isTrace) {
          data[idx] = 32;
          data[idx + 1] = 104;
          data[idx + 2] = 84;
        } else {
          data[idx] = 18;
          data[idx + 1] = 68;
          data[idx + 2] = 56;
        }
        data[idx + 3] = 255;
      } else if (key === 'copper_coil') {
        const wave = 0.5 + 0.5 * Math.sin((x / size) * Math.PI * 16);
        data[idx] = Math.round(170 + wave * 64);
        data[idx + 1] = Math.round(88 + wave * 42);
        data[idx + 2] = Math.round(42 + wave * 24);
        data[idx + 3] = 255;
      } else {
        // silicon_die subtle grid
        const grid = x % 8 === 0 || y % 8 === 0 ? 18 : 0;
        data[idx] = 72 + grid;
        data[idx + 1] = 96 + grid;
        data[idx + 2] = 132 + grid;
        data[idx + 3] = 255;
      }
    }
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  if (key === 'hdi_pcb' || key === 'copper_coil' || key === 'silicon_die') {
    tex.colorSpace = THREE.SRGBColorSpace;
  }
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  tex.userData.__cacheKey = key;
  return tex;
}

/**
 * Reference-counted shared cache for all MI Shoe V2 materials, textures, and geometries.
 * Guarantees zero duplicate GPU material/geometry allocations and deterministic disposal at refCount === 0.
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

  /**
   * Acquire a quality-tiered shared material.
   * - STD   : MeshLambertMaterial for matte/dielectric buckets, lightweight MeshStandardMaterial for metallic buckets (no bump/clearcoat).
   * - HIGH  : MeshStandardMaterial PBR with procedural bump/albedo DataTextures.
   * - ULTRA : Selective MeshPhysicalMaterial (clearcoat/iridescence) ONLY for hero metallic/optical/silicon buckets; MeshStandardMaterial for others.
   */
  public acquireMaterial(
    bucket: MaterialBucketKey,
    quality: QualityTier,
    renderMode: RenderMode = 'solid',
    clippingPlanes: THREE.Plane[] = []
  ): THREE.Material {
    const cacheKey = `mat:${bucket}:${quality}:${renderMode}`;
    const existing = this.materials.get(cacheKey);
    if (existing) {
      existing.refCount++;
      existing.resource.clippingPlanes = clippingPlanes;
      return existing.resource;
    }

    const spec = MATERIAL_SPECS[bucket];
    const depTextures: string[] = [];
    const isXray = renderMode === 'xray';
    const isCad = renderMode === 'cad';

    let mapTex: THREE.Texture | null = null;
    let bumpTex: THREE.Texture | null = null;

    if (!isXray && !isCad) {
      if (spec.mapTextureKey) {
        mapTex = this.acquireTexture(spec.mapTextureKey);
        depTextures.push(spec.mapTextureKey);
      }
      if (quality !== 'standard' && spec.bumpTextureKey) {
        bumpTex = this.acquireTexture(spec.bumpTextureKey);
        depTextures.push(spec.bumpTextureKey);
      }
    }

    const commonProps = {
      color: isCad ? 0xf4f6fa : isXray ? 0xdbeafe : spec.color,
      clippingPlanes,
      clipShadows: false,
      side: THREE.DoubleSide as THREE.Side,
      transparent: isXray,
      opacity: isXray ? 0.24 : 1.0,
      depthWrite: !isXray,
    };

    let mat: THREE.Material;
    if (isXray) {
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
      if (spec.stdLambert) {
        mat = new THREE.MeshLambertMaterial({
          ...commonProps,
          map: mapTex,
        });
      } else {
        mat = new THREE.MeshStandardMaterial({
          ...commonProps,
          map: mapTex,
          metalness: spec.metalness * 0.85,
          roughness: Math.min(1, spec.roughness + 0.08),
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
        envMapIntensity: 1.05,
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
        envMapIntensity: 0.95,
        emissive: spec.emissive ?? 0x000000,
        emissiveIntensity: spec.emissiveIntensity ?? 0,
      });
    }

    mat.userData.__cacheKey = cacheKey;
    mat.userData.__materialBucket = bucket;
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
          clippingPlanes: params.clippingPlanes ?? [],
        })
      : new THREE.LineBasicMaterial({
          color: params.color,
          transparent: true,
          opacity: params.opacity,
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
    for (const entry of this.materials.values()) {
      entry.resource.clippingPlanes = planes;
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
