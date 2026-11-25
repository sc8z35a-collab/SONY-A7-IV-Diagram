import * as THREE from 'three';
import { CadPart, RenderMode } from '../assemblies/types';
import {
  buildCompactWeldedPagesFromEntries,
  buildIndexedEdgeGeometry,
  extractPooledCadEdgesArray,
  isGeometryLikelyOpen,
  MESH_I16_STRIDE,
  QUANT_POS_SCALE,
  RawEdgeChunk,
  retessellatePrimitiveSagitta,
} from './FastCadGeometry';
import {
  buildSliceBvh,
  BVH_MIN_TRIANGLES,
  FlatSliceBvh,
  intersectSliceBvh,
  ReusablePartTlas,
  rayTriangleScalar,
} from './FastBvhRaycaster';
import {
  GPU_PROFILE,
  NATIVE_HI_TEX_H,
  NATIVE_HI_TEX_W,
  NATIVE_TILE_TEX_SIZE,
} from './GpuOptimizer';

/**
 * GpuMegaBatch v7 — "OMEGA-CAD v7" Ultra-Low-Overhead GPU-Driven WebGL2 Engine:
 *
 * - OMEGA-1:  Triple-Buffered 3-Texture Ring `PartStateTextureBuffer` (eliminates ANGLE/Vulkan in-flight stalls!)
 * - OMEGA-2:  Zero-Texture-Fetch Uniform Material LUT (`uMatSolid[192]`) + 4-Varying 33-ALU Opaque Solid PBR
 * - OMEGA-3:  Single-Stream 16-Byte Quantized `Int16x8` Mesh VBO + 8-Byte `Int16x4` Edge VBO
 *             + Sub-64K Multi-Page Partitioning -> 100% 16-bit `Uint16Array` Triple-Ring IBOs!
 * - OMEGA-6:  Section-Cut Dual-Range Plane-Straddling Split (unclipped parts keep `FrontSide` Early-Z + 0 `discard`!)
 * - OMEGA-7:  Hardware Early-Z X-Ray Highlight Pass (`renderOrder = 0` occludes rear ghost layers!)
 * - OMEGA-8A: Post-Retessellation `WeakMap`-Cached CAD Edge Extraction (0 eager pre-bake waste!)
 * - OMEGA-11: Two-Level Hierarchical BVH (`ReusablePartTlas` + Direct Quantized `Int16` Scalar BLAS)
 * - OMEGA-14: Zero-DOM `DataTexture` & Pre-Flipped Canvas Fast-Paths in `DualTierTextureArrayPacker`
 *
 * ZERO part reduction (652 / 652 parts intact), ZERO visual quality degradation!
 */

export const MAX_PARTS_CAPACITY = 2048;
export const MAX_MATERIALS_CAPACITY = 256;
export const MAX_FAST_SOLID_MATS = 96; // 96 * 2 = 192 vec4s (strictly within WebGL2 ES3 min 256 VS uniform vectors!)

const EMPTY_GEOMETRY = new THREE.BufferGeometry();
EMPTY_GEOMETRY.userData.__pooled = true;

export type MacroGroupKey =
  | 'lens_1'
  | 'lens_2'
  | 'lens_3'
  | 'mount'
  | 'shutter'
  | 'sensor'
  | 'mainboard'
  | 'evf'
  | 'lcd'
  | 'body';

export const MACRO_GROUP_ORDER: readonly MacroGroupKey[] = [
  'lens_1',
  'lens_2',
  'lens_3',
  'mount',
  'shutter',
  'sensor',
  'mainboard',
  'evf',
  'lcd',
  'body',
];

// =============================================================================
// 1. OMEGA-1: QUAD-BUFFERED GPU KINEMATIC STATE TEXTURE RING (4 x 2048 RGBA32F = 4 x 128 KB)
// =============================================================================
// Col 0: (posOrAssemX, Y, Z, packedFlags)
//   packedFlags bits:
//     visFlag = mod(packedFlags, 4.0)  -> 0=hidden, 1=normal, 2=hover, 3=selected
//     +4.0 => Full quaternion/scale transform (bones, IBIS, LCD hinge)
//     +8.0 => Zero-CPU GPU Analytical Explode! worldPos = position + Col0.xyz + Col1.xyz * uExplode!
// Col 1: (quatX, quatY, quatZ, quatW)  OR  (explodeDX, explodeDY, explodeDZ, 0) when +8.0!
// Col 2: (edgeOrGlowR, G, B, alphaEncoded)
// Col 3: (scaleX, scaleY, scaleZ, pad)

const STATE_RING_SIZE = 4;
let _globalRenderEpoch = 0;

export function advanceMegaBatchRenderEpoch(): number {
  return ++_globalRenderEpoch;
}

export class PartStateTextureBuffer {
  public readonly data: Float32Array;
  public readonly slotToParentSlot: Int32Array;
  private readonly ringData: [
    Float32Array<ArrayBuffer>,
    Float32Array<ArrayBuffer>,
    Float32Array<ArrayBuffer>,
    Float32Array<ArrayBuffer>,
  ];
  private readonly textures: [
    THREE.DataTexture,
    THREE.DataTexture,
    THREE.DataTexture,
    THREE.DataTexture,
  ];
  private readonly ringMinRow = new Int32Array([0, 0, 0, 0]);
  private readonly ringMaxRow = new Int32Array([
    MAX_PARTS_CAPACITY - 1,
    MAX_PARTS_CAPACITY - 1,
    MAX_PARTS_CAPACITY - 1,
    MAX_PARTS_CAPACITY - 1,
  ]);
  private ringIdx = 0;
  private lastRotatedEpoch = -1;
  private readonly slotTransformMode: Uint8Array;
  private nextSlot = 0;
  private slotByKey = new Map<string, number>();
  private dirty = true;

  constructor() {
    this.data = new Float32Array(4 * MAX_PARTS_CAPACITY * 4);
    this.slotToParentSlot = new Int32Array(MAX_PARTS_CAPACITY);
    this.slotToParentSlot.fill(-1);
    this.slotTransformMode = new Uint8Array(MAX_PARTS_CAPACITY);
    for (let s = 0; s < MAX_PARTS_CAPACITY; s++) {
      const base = s * 16;
      this.data[base + 7] = 1; // qw = 1
      this.data[base + 12] = 1; // sx = 1
      this.data[base + 13] = 1; // sy = 1
      this.data[base + 14] = 1; // sz = 1
    }

    const makeRingTex = (buf: Float32Array<ArrayBuffer>): THREE.DataTexture => {
      buf.set(this.data);
      const tex = new THREE.DataTexture(
        buf,
        4,
        MAX_PARTS_CAPACITY,
        THREE.RGBAFormat,
        THREE.FloatType
      );
      tex.minFilter = THREE.NearestFilter;
      tex.magFilter = THREE.NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    };

    this.ringData = [
      new Float32Array(4 * MAX_PARTS_CAPACITY * 4),
      new Float32Array(4 * MAX_PARTS_CAPACITY * 4),
      new Float32Array(4 * MAX_PARTS_CAPACITY * 4),
      new Float32Array(4 * MAX_PARTS_CAPACITY * 4),
    ];
    this.textures = [
      makeRingTex(this.ringData[0]),
      makeRingTex(this.ringData[1]),
      makeRingTex(this.ringData[2]),
      makeRingTex(this.ringData[3]),
    ];
  }

  public get texture(): THREE.DataTexture {
    return this.textures[this.ringIdx];
  }

  private markRowDirty(slot: number): void {
    for (let r = 0; r < STATE_RING_SIZE; r++) {
      if (slot < this.ringMinRow[r]) this.ringMinRow[r] = slot;
      if (slot > this.ringMaxRow[r]) this.ringMaxRow[r] = slot;
    }
    this.dirty = true;
  }

  public allocateSlot(key: string, parentSlot = -1): number {
    const existing = this.slotByKey.get(key);
    if (existing !== undefined) return existing;
    const slot = this.nextSlot++;
    if (slot >= MAX_PARTS_CAPACITY) {
      throw new Error(`PartStateTextureBuffer capacity exceeded (${MAX_PARTS_CAPACITY})`);
    }
    this.slotByKey.set(key, slot);
    this.slotToParentSlot[slot] = parentSlot >= 0 ? parentSlot : slot;
    return slot;
  }

  public getSlot(key: string): number {
    return this.slotByKey.get(key) ?? -1;
  }

  public writePartTransform(
    slot: number,
    pos: THREE.Vector3,
    quat: THREE.Quaternion,
    scale: THREE.Vector3
  ): void {
    const base = slot * 16;
    const d = this.data;
    const isIdentityRotScale =
      quat.x === 0 &&
      quat.y === 0 &&
      quat.z === 0 &&
      scale.x === 1 &&
      scale.y === 1 &&
      scale.z === 1;

    const modeBits = isIdentityRotScale ? 0 : 4;
    this.slotTransformMode[slot] = modeBits;
    const prevVis = d[base + 3] % 4;
    const nextFlag = prevVis === 0 ? 0 : prevVis + modeBits;

    if (
      d[base] !== pos.x ||
      d[base + 1] !== pos.y ||
      d[base + 2] !== pos.z ||
      d[base + 3] !== nextFlag ||
      (!isIdentityRotScale &&
        (d[base + 4] !== quat.x ||
          d[base + 5] !== quat.y ||
          d[base + 6] !== quat.z ||
          d[base + 7] !== quat.w ||
          d[base + 12] !== scale.x ||
          d[base + 13] !== scale.y ||
          d[base + 14] !== scale.z))
    ) {
      d[base] = pos.x;
      d[base + 1] = pos.y;
      d[base + 2] = pos.z;
      d[base + 3] = nextFlag;
      if (!isIdentityRotScale) {
        d[base + 4] = quat.x;
        d[base + 5] = quat.y;
        d[base + 6] = quat.z;
        d[base + 7] = quat.w;
        d[base + 12] = scale.x;
        d[base + 13] = scale.y;
        d[base + 14] = scale.z;
      }
      this.markRowDirty(slot);
    }
  }

  public writeAnalyticalExplodeTransform(
    slot: number,
    assembledPos: THREE.Vector3,
    explodeOffset: THREE.Vector3
  ): void {
    const base = slot * 16;
    const d = this.data;
    this.slotTransformMode[slot] = 8;
    const prevVis = d[base + 3] % 4;
    const nextFlag = prevVis === 0 ? 0 : prevVis + 8;

    if (
      d[base] !== assembledPos.x ||
      d[base + 1] !== assembledPos.y ||
      d[base + 2] !== assembledPos.z ||
      d[base + 3] !== nextFlag ||
      d[base + 4] !== explodeOffset.x ||
      d[base + 5] !== explodeOffset.y ||
      d[base + 6] !== explodeOffset.z
    ) {
      d[base] = assembledPos.x;
      d[base + 1] = assembledPos.y;
      d[base + 2] = assembledPos.z;
      d[base + 3] = nextFlag;
      d[base + 4] = explodeOffset.x;
      d[base + 5] = explodeOffset.y;
      d[base + 6] = explodeOffset.z;
      d[base + 7] = 0;
      this.markRowDirty(slot);
    }
  }

  public writePartStyle(
    slot: number,
    visFlag: number,
    colR: number,
    colG: number,
    colB: number,
    alphaEncoded: number
  ): void {
    const base = slot * 16;
    const d = this.data;
    const modeBits = this.slotTransformMode[slot];
    const packedVis = visFlag === 0 ? 0 : visFlag + modeBits;
    if (
      d[base + 3] !== packedVis ||
      d[base + 8] !== colR ||
      d[base + 9] !== colG ||
      d[base + 10] !== colB ||
      d[base + 11] !== alphaEncoded
    ) {
      d[base + 3] = packedVis;
      d[base + 8] = colR;
      d[base + 9] = colG;
      d[base + 10] = colB;
      d[base + 11] = alphaEncoded;
      this.markRowDirty(slot);
    }
  }

  /**
   * Rotate AT MOST ONCE per render epoch across the 4-texture ring, copy ONLY the dirty row span
   * `[minRow..maxRow]`, and point `sharedTexUniform.value` at it — ZERO GPU fence stalls!
   */
  public flushIfDirty(sharedTexUniform?: { value: THREE.DataTexture }): boolean {
    if (!this.dirty) {
      if (sharedTexUniform) sharedTexUniform.value = this.textures[this.ringIdx];
      return false;
    }

    if (this.lastRotatedEpoch !== _globalRenderEpoch) {
      this.ringIdx = (this.ringIdx + 1) & 3;
      this.lastRotatedEpoch = _globalRenderEpoch;
    }
    const idx = this.ringIdx;
    const minR = this.ringMinRow[idx];
    const maxR = this.ringMaxRow[idx];
    if (minR <= maxR) {
      const startFloat = minR * 16;
      const endFloat = (maxR + 1) * 16;
      this.ringData[idx].set(this.data.subarray(startFloat, endFloat), startFloat);
      this.ringMinRow[idx] = MAX_PARTS_CAPACITY;
      this.ringMaxRow[idx] = -1;
    }

    const tex = this.textures[idx];
    tex.needsUpdate = true;
    if (sharedTexUniform) {
      sharedTexUniform.value = tex;
    }
    this.dirty = false;
    return true;
  }

  public markDirty(): void {
    const maxUsed = Math.max(0, this.nextSlot - 1);
    for (let r = 0; r < STATE_RING_SIZE; r++) {
      this.ringMinRow[r] = 0;
      if (maxUsed > this.ringMaxRow[r]) this.ringMaxRow[r] = maxUsed;
    }
    this.dirty = true;
  }

  /** Re-populate and mark ALL 4 ring textures dirty after a WebGL context restore so no ring slot reads zeroed VRAM! */
  public refreshAfterContextRestore(): void {
    for (let r = 0; r < STATE_RING_SIZE; r++) {
      this.ringData[r].set(this.data);
      this.ringMinRow[r] = MAX_PARTS_CAPACITY;
      this.ringMaxRow[r] = -1;
      this.textures[r].needsUpdate = true;
    }
    this.dirty = false;
  }

  public dispose(): void {
    for (let r = 0; r < STATE_RING_SIZE; r++) {
      this.textures[r].dispose();
    }
  }
}

// =============================================================================
// 2. OMEGA-CAD v7 GLSL3 QUANTIZED INTERLEAVED SHADERS
// =============================================================================

const GLSL3_CORE_LIB = /* glsl */ `
vec3 kmbRotateByQuat(vec3 v, vec4 q) {
  vec3 t = 2.0 * cross(q.xyz, v);
  return v + q.w * t + cross(q.xyz, t);
}

vec3 decodeOctNormal(vec2 f) {
  vec3 n = vec3(f.x, f.y, 1.0 - abs(f.x) - abs(f.y));
  float t = max(-n.z, 0.0);
  n.x += n.x >= 0.0 ? -t : t;
  n.y += n.y >= 0.0 ? -t : t;
  return normalize(n + vec3(0.0, 0.0, 1e-6));
}

vec2 encodeOctNormal(vec3 n) {
  float denom = max(abs(n.x) + abs(n.y) + abs(n.z), 1e-5);
  vec2 p = n.xy / denom;
  if (n.z < 0.0) {
    vec2 s = vec2(p.x >= 0.0 ? 1.0 : -1.0, p.y >= 0.0 ? 1.0 : -1.0);
    p = (1.0 - abs(p.yx)) * s;
  }
  return p;
}
`;

const GLSL3_TONEMAP_SRGB = /* glsl */ `
vec3 fastLinearToSrgb(vec3 c) {
  vec3 s = sqrt(clamp(c, 0.0, 1.0));
  return s * (1.138 - 0.138 * s);
}

vec3 fastAcesSrgb(vec3 x) {
  vec3 c = max(x, vec3(0.0));
  return (c * (32.06 * c + 6.394)) / (c * (31.61 * c + 8.988) + 1.0);
}
`;

// Shared Studio Key/Rim/Top/Fill PBR + HIGH 8-tap PCF / ULTRA 16-tap PCSS Soft Shadow + GGX HDR BRDF Library
const GLSL3_STUDIO_SHADOW_BRDF = /* glsl */ `
const vec3 STUDIO_KEY_DIR  = vec3(-0.5174, 0.7164, 0.4577);
const vec3 STUDIO_TOP_DIR  = vec3( 0.0503, 0.9647, 0.2584);
const vec3 STUDIO_RIM_DIR  = vec3( 0.6484, 0.3647,-0.6687);
const vec3 STUDIO_FILL_DIR = vec3( 0.5432, 0.5633, 0.6237);

const vec2 POISSON_8[8] = vec2[8](
  vec2(-0.6134,  0.6175), vec2( 0.1700, -0.0402),
  vec2(-0.2994,  0.7919), vec2( 0.6456,  0.5286),
  vec2(-0.8180, -0.3510), vec2( 0.0689, -0.8213),
  vec2( 0.7794, -0.3991), vec2(-0.2545, -0.4519)
);

float studioIgn(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

float computeStudioShadow(
  vec3 worldPos,
  vec3 N,
  highp sampler2D shadowMap,
  mat4 lightViewProj,
  vec4 shadowParams,
  float qualityTier
) {
  if (qualityTier < 0.5 || shadowParams.z <= 0.001) return 1.0;

  float ndl = max(dot(N, STUDIO_KEY_DIR), 0.0);
  vec3 offsetPos = worldPos + N * (shadowParams.x * (0.45 + 0.85 * (1.0 - ndl)));
  vec4 sc = lightViewProj * vec4(offsetPos, 1.0);
  vec3 proj = (sc.xyz / max(sc.w, 1e-5)) * 0.5 + 0.5;
  if (proj.x <= 0.002 || proj.x >= 0.998 || proj.y <= 0.002 || proj.y >= 0.998 || proj.z <= 0.0 || proj.z >= 0.999) {
    return 1.0;
  }

  float edgeFade = smoothstep(0.002, 0.055, min(min(proj.x, 1.0 - proj.x), min(proj.y, 1.0 - proj.y)));
  float zBias = 0.00045 + 0.00135 * (1.0 - ndl);
  float refZ = proj.z - zBias;
  float texel = shadowParams.y;

  float ang = studioIgn(gl_FragCoord.xy) * 6.2831853;
  float ca = cos(ang);
  float sa = sin(ang);
  mat2 rot = mat2(ca, -sa, sa, ca);

  if (qualityTier < 1.5) {
    // HIGH: 8-tap rotated Poisson PCF soft shadow
    float vis = 0.0;
    float rad = texel * 1.65;
    for (int i = 0; i < 8; i++) {
      vec2 off = (rot * POISSON_8[i]) * rad;
      float d = texture(shadowMap, proj.xy + off).r;
      vis += refZ <= d ? 1.0 : 0.0;
    }
    return mix(1.0, vis * 0.125, shadowParams.z * edgeFade);
  }

  // ULTRA: PCSS Blocker Search (8 taps) + Variable-Penumbra 16-tap Vogel-Disk PCF!
  float searchRad = texel * shadowParams.w;
  float blockerSum = 0.0;
  float blockerCnt = 0.0;
  for (int i = 0; i < 8; i++) {
    vec2 off = (rot * POISSON_8[i]) * searchRad;
    float d = texture(shadowMap, proj.xy + off).r;
    if (d < refZ) {
      blockerSum += d;
      blockerCnt += 1.0;
    }
  }
  if (blockerCnt < 0.5) return 1.0;

  float avgBlocker = blockerSum / blockerCnt;
  float penumbra = clamp((refZ - avgBlocker) * 48.0, 0.85, 6.4) * texel;
  float vis = 0.0;
  for (int i = 0; i < 16; i++) {
    float fi = float(i);
    float r = sqrt((fi + 0.5) * 0.0625) * penumbra;
    float th = fi * 2.3999632 + ang;
    vec2 off = vec2(cos(th), sin(th)) * r;
    float d = texture(shadowMap, proj.xy + off).r;
    vis += refZ <= d ? 1.0 : 0.0;
  }
  return mix(1.0, vis * 0.0625, shadowParams.z * edgeFade);
}

float ggxD(float ndh, float a2) {
  float d = (ndh * ndh) * (a2 - 1.0) + 1.0;
  return a2 / max(3.14159265 * d * d, 1e-5);
}

float ggxV(float ndv, float ndl, float a2) {
  float gv = ndl * sqrt(ndv * ndv * (1.0 - a2) + a2);
  float gl = ndv * sqrt(ndl * ndl * (1.0 - a2) + a2);
  return 0.5 / max(gv + gl, 1e-4);
}

vec3 fresnelSchlick(vec3 F0, float vdh) {
  float om = clamp(1.0 - vdh, 0.0, 1.0);
  float om2 = om * om;
  return F0 + (vec3(1.0) - F0) * (om2 * om2 * om);
}

vec3 evalDirectLightGGX(
  vec3 N,
  vec3 V,
  vec3 L,
  vec3 radiance,
  vec3 diffColor,
  vec3 F0,
  float a2,
  float ndv
) {
  float ndl = max(dot(N, L), 0.0);
  if (ndl <= 0.0005) return vec3(0.0);
  vec3 H = normalize(V + L + vec3(0.0, 0.0, 1e-6));
  float ndh = max(dot(N, H), 0.0);
  float vdh = max(dot(V, H), 0.0);
  vec3 F = fresnelSchlick(F0, vdh);
  float D = ggxD(ndh, a2);
  float Vis = ggxV(ndv, ndl, a2);
  vec3 spec = D * Vis * F;
  vec3 kD = vec3(1.0) - F;
  return (diffColor * kD * 0.31830989 + spec) * radiance * ndl;
}

vec3 evalStudioPbrLighting(
  vec3 N,
  vec3 V,
  vec3 diffColor,
  vec3 F0,
  float rough,
  float metal,
  float clearcoat,
  float microAo,
  float shadowVis,
  float qualityTier
) {
  float ndv = clamp(dot(N, V), 0.001, 1.0);
  vec3 R = N * (2.0 * ndv) - V;
  float om = 1.0 - ndv;
  float om2 = om * om;
  float fres4 = om2 * om2;

  float ny = N.y;
  float softS = 5.8 - rough * 4.85;
  float softB = 1.0 - softS;
  float softG = 1.44 - rough * 0.96;

  float ry = clamp(R.y * 0.88 + 0.44, 0.0, 1.0);
  float horizonDip = 1.0 - 0.54 * exp(-abs(R.y) * 8.6);

  float aTop = clamp(dot(R, STUDIO_TOP_DIR) * softS + softB, 0.0, 1.0);
  float aKey = clamp(dot(R, STUDIO_KEY_DIR) * softS + softB, 0.0, 1.0);
  float aRim = clamp(dot(R, STUDIO_RIM_DIR) * softS + softB, 0.0, 1.0);
  float aFill = clamp(dot(R, STUDIO_FILL_DIR) * (softS * 0.65) + (1.0 - softS * 0.65), 0.0, 1.0);
  aTop *= aTop;
  aKey *= aKey;
  aRim *= aRim;
  aFill *= aFill;

  if (qualityTier < 1.5) {
    // STD & HIGH Studio Product Photography Lighting
    float keyShadow = mix(0.46, 1.0, shadowVis);
    vec3 diffIrr = max((vec3(0.56, 0.58, 0.62)
      + ny * vec3(0.42, 0.43, 0.46)
      + N.z * vec3(0.27, 0.26, 0.26)
      - N.x * vec3(0.21, 0.22, 0.25)
      + (ny * ny) * vec3(0.15, 0.16, 0.18)), vec3(0.16, 0.17, 0.20)) * microAo;
    vec3 bounceTint = mix(vec3(0.86, 0.90, 0.98), vec3(1.0), shadowVis);
    diffIrr *= keyShadow * bounceTint;

    vec3 specRad = mix(vec3(0.20, 0.23, 0.29), vec3(1.28, 1.31, 1.37), ry) * horizonDip;
    specRad += (vec3(2.14, 2.16, 2.22) * (aTop * aTop)
              + vec3(1.90, 1.86, 1.80) * (aKey * aKey) * mix(0.25, 1.0, shadowVis)
              + vec3(1.20, 1.34, 1.56) * (aRim * aRim)
              + vec3(0.52, 0.56, 0.64) * (aFill * aFill)) * softG;

    vec3 envF = max(vec3((1.0 - rough) * 0.90), F0);
    vec3 brdf = mix(F0, envF, fres4) * (0.98 - rough * 0.14);
    vec3 col = diffColor * diffIrr + specRad * brdf * microAo;

    if (clearcoat > 0.05) {
      float cd = clamp(dot(R, vec3(-0.42, 0.72, 0.55)), 0.0, 1.0);
      float c2 = cd * cd;
      float c4 = c2 * c2;
      float c16 = c4 * c4;
      float coatLobe = c16 * c2;
      float coatSpec = (aTop * aTop * 0.52 + aKey * aKey * 0.38 * shadowVis + coatLobe * 0.68 + 0.05 + 0.95 * fres4) * clearcoat * 0.28;
      col += vec3(coatSpec);
    }
    return max(col, vec3(0.0));
  }

  // ULTRA: Physically-Based GGX Cook-Torrance Direct Softbox Rig + 6-Stop HDR Cyclorama IBL + Multi-Scattering!
  float rClamped = clamp(rough, 0.045, 0.98);
  float a = rClamped * rClamped;
  float a2 = max(a * a, 0.0004);

  // Direct studio softboxes with true GGX microfacet specular & real PCSS shadow visibility
  vec3 direct = vec3(0.0);
  direct += evalDirectLightGGX(N, V, STUDIO_KEY_DIR,  vec3(1.82, 1.77, 1.70) * shadowVis, diffColor, F0, a2, ndv);
  direct += evalDirectLightGGX(N, V, STUDIO_TOP_DIR,  vec3(1.22, 1.25, 1.32) * mix(0.62, 1.0, shadowVis), diffColor, F0, a2, ndv);
  direct += evalDirectLightGGX(N, V, STUDIO_RIM_DIR,  vec3(1.05, 1.18, 1.42), diffColor, F0, a2, ndv);
  direct += evalDirectLightGGX(N, V, STUDIO_FILL_DIR, vec3(0.62, 0.66, 0.74), diffColor, F0, a2, ndv);

  // Ambient studio cyclorama hemisphere IBL (rich cool-sky / warm-table floor bounce)
  vec3 envDiff = mix(vec3(0.32, 0.34, 0.39), vec3(0.76, 0.79, 0.85), clamp(ny * 0.5 + 0.5, 0.0, 1.0)) * microAo;
  envDiff *= mix(vec3(0.78, 0.84, 0.95), vec3(1.0), shadowVis);

  // 6-Stop Linear HDR Studio Cyclorama Reflections (dark contrast horizon ribbon + bright HDR softbox windows!)
  float horizonRibbon = 1.0 - 0.68 * exp(-abs(R.y) * 10.5);
  vec3 envSpec = mix(vec3(0.18, 0.21, 0.27), vec3(1.42, 1.46, 1.54), ry) * horizonRibbon;

  // Dual overhead studio strip softboxes + key reflector + crisp HDR highlights (> 1.5..4.2 linear radiance!)
  float hdrGain = mix(1.85, 0.58, rClamped);
  envSpec += (vec3(3.15, 3.18, 3.30) * (aTop * aTop)
            + vec3(2.85, 2.74, 2.58) * (aKey * aKey) * mix(0.30, 1.0, shadowVis)
            + vec3(1.65, 1.88, 2.24) * (aRim * aRim)
            + vec3(0.68, 0.74, 0.84) * (aFill * aFill)) * hdrGain;

  // Anisotropic brushed-metal studio highlight stretch for CNC metals & magnesium housings
  if (metal > 0.55) {
    vec3 anisoDir = normalize(cross(N, vec3(0.0, 1.0, 0.001)) + vec3(1e-4, 0.0, 0.0));
    float anisoH = abs(dot(R, anisoDir));
    float anisoBand = exp(-anisoH * anisoH * mix(22.0, 4.5, rClamped)) * (1.0 - rClamped * 0.7);
    envSpec += vec3(0.88, 0.92, 0.98) * anisoBand * metal * mix(0.45, 1.0, shadowVis);
  }

  // Multi-scattering energy compensation for rough metals (prevents dark metallic edges!)
  vec3 envF = max(vec3((1.0 - rClamped) * 0.94), F0);
  vec3 brdfEnv = mix(F0, envF, fres4) * (1.0 + metal * rClamped * 0.38);

  vec3 col = diffColor * envDiff + direct * microAo + envSpec * brdfEnv * microAo * 0.72;

  if (clearcoat > 0.05) {
    float cd = clamp(dot(R, vec3(-0.42, 0.72, 0.55)), 0.0, 1.0);
    float c2 = cd * cd;
    float c4 = c2 * c2;
    float c16 = c4 * c4;
    float coatLobe = c16 * c2;
    float coatSpec = (aTop * aTop * 0.78 + aKey * aKey * 0.62 * shadowVis + coatLobe * 1.45 + 0.04 + 0.96 * fres4) * clearcoat * 0.34;
    col += vec3(coatSpec);
  }
  return max(col, vec3(0.0));
}
`;

// --- OMEGA-2 + OMEGA-3: Zero-Material-Sampler Quantized Opaque Solid PBR (95% of CAD!) ---
function buildOmegaPbrSolidVs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 uViewProj;
uniform vec3 uCamPos;
uniform sampler2D uPartStateTex;
uniform vec4 uMatSolid[${MAX_FAST_SOLID_MATS * 2}];
uniform float uExplode;
${useClip ? 'uniform vec4 uClipPlane;' : ''}

in vec4 aPosSlot;
in vec2 aOctNorm;
in vec2 aMatMeta;

out highp vec3 vWorldPos;
out highp vec3 vViewDir;
out highp vec3 vWorldNorm;
flat out vec4 vDiffSpec;
flat out vec4 vF0Coat;
${useClip ? 'out highp float vClipDist;' : ''}

${GLSL3_CORE_LIB}

void main() {
  int slot = int(aPosSlot.w + 0.5);
  vec4 posVis = texelFetch(uPartStateTex, ivec2(0, slot), 0);
  float packed = posVis.w;
  if (packed < 0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vWorldPos = vec3(0.0);
    vViewDir = vec3(0.0, 0.0, 1.0);
    vWorldNorm = vec3(0.0, 1.0, 0.0);
    vDiffSpec = vec4(0.0);
    vF0Coat = vec4(0.0);
    ${useClip ? 'vClipDist = -1.0;' : ''}
    return;
  }

  vec3 position = aPosSlot.xyz * 0.015625;
  vec3 localNorm = decodeOctNormal(aOctNorm);
  vec3 worldPos;
  vec3 worldNorm;

  if (packed >= 7.5) {
    vec3 expDelta = texelFetch(uPartStateTex, ivec2(1, slot), 0).xyz;
    worldPos = position + posVis.xyz + expDelta * uExplode;
    worldNorm = localNorm;
  } else if (packed >= 3.5) {
    vec4 quat = texelFetch(uPartStateTex, ivec2(1, slot), 0);
    vec4 scl = texelFetch(uPartStateTex, ivec2(3, slot), 0);
    worldPos = kmbRotateByQuat(position * scl.xyz, quat) + posVis.xyz;
    worldNorm = normalize(kmbRotateByQuat(localNorm, quat) + vec3(0.0, 0.0, 1e-6));
  } else {
    worldPos = position + posVis.xyz;
    worldNorm = localNorm;
  }

  int mIdx = int(aMatMeta.x + 0.5) * 2;
  vDiffSpec = uMatSolid[mIdx];
  vF0Coat = uMatSolid[mIdx + 1];
  vWorldPos = worldPos;
  vViewDir = normalize(uCamPos - worldPos + vec3(0.0, 0.0, 1e-5));
  vWorldNorm = worldNorm;
  ${useClip ? 'vClipDist = dot(worldPos, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uViewProj * vec4(worldPos, 1.0);
}
`;
}

function buildOmegaPbrSolidFs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

uniform highp sampler2D uShadowMap;
uniform mat4 uLightViewProj;
uniform vec4 uShadowParams;
uniform float uQualityTier;
uniform float uHdrLinearOutput;

in highp vec3 vWorldPos;
in highp vec3 vViewDir;
in highp vec3 vWorldNorm;
flat in vec4 vDiffSpec;
flat in vec4 vF0Coat;
${useClip ? 'in highp float vClipDist;' : ''}

out vec4 fragColor;

${GLSL3_TONEMAP_SRGB}
${GLSL3_STUDIO_SHADOW_BRDF}

void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}

  vec3 N = normalize(vWorldNorm + vec3(0.0, 0.0, 1e-6));
  ${useClip ? 'if (!gl_FrontFacing) N = -N;' : ''}
  vec3 V = normalize(vViewDir + vec3(0.0, 0.0, 1e-6));

  float rough = vDiffSpec.w;
  vec3 F0 = vF0Coat.xyz;
  float metalEst = clamp((max(max(F0.r, F0.g), F0.b) - 0.05) * 2.2, 0.0, 1.0);
  float clearcoat = vF0Coat.w * 4.545;

  float shadowVis = computeStudioShadow(vWorldPos, N, uShadowMap, uLightViewProj, uShadowParams, uQualityTier);
  vec3 col = evalStudioPbrLighting(N, V, vDiffSpec.xyz, F0, rough, metalEst, clearcoat, 1.0, shadowVis, uQualityTier);

  if (uHdrLinearOutput > 0.5) {
    fragColor = vec4(col, 1.0);
  } else {
    fragColor = vec4(fastAcesSrgb(col), 1.0);
  }
}
`;
}

// --- Textured / Emissive / Iridescent / Optical Glass PBR Shader (~5% opaque + glass) ---
function buildOmegaPbrVs(useClip: boolean, isGlassPass: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 uViewProj;
uniform vec3 uCamPos;
uniform sampler2D uPartStateTex;
uniform sampler2D uMatLutTex;
uniform float uExplode;
${useClip ? 'uniform vec4 uClipPlane;' : ''}

in vec4 aPosSlot;
in vec2 aOctNorm;
in vec2 aMatMeta;
in vec2 uv;

out highp vec3 vViewVec;
out highp vec3 vWorldNorm;
out highp vec3 vWorldPos;
out highp vec2 vUv;
flat out vec4 vMat0;
flat out vec4 vMat1;
flat out int vMatId;
${isGlassPass ? 'flat out int vSlot;' : ''}
${useClip ? 'out highp float vClipDist;' : ''}

${GLSL3_CORE_LIB}

void main() {
  int slot = int(aPosSlot.w + 0.5);
  vec4 posVis = texelFetch(uPartStateTex, ivec2(0, slot), 0);
  float packed = posVis.w;
  if (packed < 0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vViewVec = vec3(0.0, 0.0, 1.0);
    vWorldNorm = vec3(0.0, 1.0, 0.0);
    vWorldPos = vec3(0.0);
    vUv = vec2(0.0);
    vMat0 = vec4(0.0);
    vMat1 = vec4(0.0);
    vMatId = 0;
    ${isGlassPass ? 'vSlot = 0;' : ''}
    ${useClip ? 'vClipDist = -1.0;' : ''}
    return;
  }

  vec3 position = aPosSlot.xyz * 0.015625;
  vec3 localNorm = decodeOctNormal(aOctNorm);
  vec3 worldPos;
  vec3 worldNorm;

  if (packed >= 7.5) {
    vec3 expDelta = texelFetch(uPartStateTex, ivec2(1, slot), 0).xyz;
    worldPos = position + posVis.xyz + expDelta * uExplode;
    worldNorm = localNorm;
  } else if (packed >= 3.5) {
    vec4 quat = texelFetch(uPartStateTex, ivec2(1, slot), 0);
    vec4 scl = texelFetch(uPartStateTex, ivec2(3, slot), 0);
    worldPos = kmbRotateByQuat(position * scl.xyz, quat) + posVis.xyz;
    worldNorm = normalize(kmbRotateByQuat(localNorm, quat) + vec3(0.0, 0.0, 1e-6));
  } else {
    worldPos = position + posVis.xyz;
    worldNorm = localNorm;
  }

  int matId = int(aMatMeta.x + 0.5);
  vMat0 = texelFetch(uMatLutTex, ivec2(0, matId), 0);
  vMat1 = texelFetch(uMatLutTex, ivec2(1, matId), 0);
  vMatId = matId;
  vViewVec = normalize(uCamPos - worldPos + vec3(0.0, 0.0, 1e-5));
  vWorldNorm = worldNorm;
  vWorldPos = worldPos;
  vUv = uv;
  ${isGlassPass ? 'vSlot = slot;' : ''}
  ${useClip ? 'vClipDist = dot(worldPos, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uViewProj * vec4(worldPos, 1.0);
}
`;
}

function buildOmegaPbrFs(useClip: boolean, isGlassPass: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;
precision mediump sampler2DArray;

uniform highp sampler2D uMatLutTex;
${isGlassPass ? 'uniform highp sampler2D uPartStateTex;' : ''}
uniform highp sampler2D uShadowMap;
uniform mat4 uLightViewProj;
uniform vec4 uShadowParams;
uniform float uQualityTier;
uniform float uHdrLinearOutput;
uniform sampler2DArray uTexArrayHi;
uniform sampler2DArray uTexArrayTile;

in highp vec3 vViewVec;
in highp vec3 vWorldNorm;
in highp vec3 vWorldPos;
in highp vec2 vUv;
flat in vec4 vMat0;
flat in vec4 vMat1;
flat in int vMatId;
${isGlassPass ? 'flat in int vSlot;' : ''}
${useClip ? 'in highp float vClipDist;' : ''}

out vec4 fragColor;

${GLSL3_TONEMAP_SRGB}
${GLSL3_STUDIO_SHADOW_BRDF}

void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}

  ${
    isGlassPass
      ? `
  if (vMatId == 0) {
    vec4 glowCol = texelFetch(uPartStateTex, ivec2(2, vSlot), 0);
    if (uHdrLinearOutput > 0.5) {
      fragColor = vec4(glowCol.rgb * 1.85, glowCol.a);
    } else {
      fragColor = vec4(fastLinearToSrgb(glowCol.rgb), glowCol.a);
    }
    return;
  }
  `
      : ''
  }

  vec3 N = normalize(vWorldNorm + vec3(0.0, 0.0, 1e-6));
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(vViewVec + vec3(0.0, 0.0, 1e-6));

  vec3 albedo = vMat0.rgb;
  float alpha = vMat0.a;
  float metal = vMat1.x;
  float rough = clamp(vMat1.y, 0.04, 1.0);
  float clearcoat = vMat1.z;
  vec3 emissive = vec3(0.0);
  float irid = 0.0;
  float iridIor = 1.45;
  float bumpStr = 0.0;
  float texLuma = 0.5;
  bool hasTex = false;

  if (vMat1.w > 0.5) {
    vec4 lut2 = texelFetch(uMatLutTex, ivec2(2, vMatId), 0);
    vec4 lut3 = texelFetch(uMatLutTex, ivec2(3, vMatId), 0);
    vec4 lut4 = texelFetch(uMatLutTex, ivec2(4, vMatId), 0);
    emissive = lut2.rgb;
    irid = lut2.w;
    bumpStr = lut3.y;
    iridIor = lut3.z;
    if (lut4.x >= -0.5) {
      hasTex = true;
      vec4 lut5 = texelFetch(uMatLutTex, ivec2(5, vMatId), 0);
      vec2 tiledUv = vUv * lut4.zw + lut5.yz;
      vec2 sampleUv = (lut4.z <= 1.001 && lut4.w <= 1.001)
        ? clamp(tiledUv, vec2(0.002), vec2(0.998))
        : tiledUv;
      vec4 texCol = lut4.x < 99.5
        ? texture(uTexArrayHi, vec3(sampleUv, lut4.x))
        : texture(uTexArrayTile, vec3(sampleUv, lut4.x - 100.0));
      albedo *= texCol.rgb;
      ${isGlassPass ? 'alpha *= texCol.a;' : ''}
      texLuma = dot(texCol.rgb, vec3(0.299, 0.587, 0.114));
      if (lut5.x > 0.5) {
        emissive = texCol.rgb * lut2.rgb;
      }
      if (lut4.y >= -0.5) {
        float rSamp = lut4.y < 99.5
          ? texture(uTexArrayHi, vec3(sampleUv, lut4.y)).g
          : texture(uTexArrayTile, vec3(sampleUv, lut4.y - 100.0)).g;
        rough = clamp(rough * rSamp, 0.04, 1.0);
      }
    }
  }

  float microAo = 1.0;
  if (hasTex && bumpStr > 0.004) {
    vec3 dPosX = dFdx(vWorldPos);
    vec3 dPosY = dFdy(vWorldPos);
    vec3 r1 = cross(dPosY, N);
    vec3 r2 = cross(N, dPosX);
    float det = dot(dPosX, r1);
    if (abs(det) > 1e-6) {
      float dHdx = dFdx(texLuma);
      float dHdy = dFdy(texLuma);
      vec3 surfGrad = (sign(det) * (dHdx * r1 + dHdy * r2)) / max(abs(det), 1e-4);
      float gradLen = length(surfGrad);
      vec3 clampedGrad = gradLen > 3.2 ? surfGrad * (3.2 / gradLen) : surfGrad;
      N = normalize(N - clampedGrad * (bumpStr * 1.42) + vec3(0.0, 0.0, 1e-6));
    }
    rough = clamp(rough + (0.48 - texLuma) * bumpStr * 1.60, 0.04, 0.98);
    microAo = clamp(0.84 + texLuma * 0.24, 0.80, 1.08);
  }

  float ndv = clamp(dot(N, V), 0.001, 1.0);
  float om = 1.0 - ndv;
  float om2 = om * om;
  float fres4 = om2 * om2;
  vec3 F0 = mix(vec3(0.04), albedo, metal);
  vec3 diffColor = albedo * (1.0 - metal);

  float shadowVis = ${isGlassPass ? '1.0' : 'computeStudioShadow(vWorldPos, N, uShadowMap, uLightViewProj, uShadowParams, uQualityTier)'};
  vec3 col = evalStudioPbrLighting(N, V, diffColor, F0, rough, metal, ${isGlassPass ? '0.0' : 'clearcoat'}, microAo, shadowVis, uQualityTier);
  col += emissive * (uQualityTier > 1.5 ? 1.55 : 1.0);

  ${
    isGlassPass
      ? `
  float fres = 0.04 + 0.96 * fres4;
  if (irid > 0.02) {
    float phase = 6.28318 * (iridIor * 0.72 * ndv + 0.14);
    vec3 spectral = 0.5 + 0.5 * cos(phase + vec3(0.0, 2.094, 4.188));
    col += spectral * irid * (0.14 + 0.36 * fres) * (uQualityTier > 1.5 ? 1.35 : 1.0);
  }
  col += vec3(0.28 * fres * (0.4 + clearcoat * 0.6)) * (uQualityTier > 1.5 ? 1.35 : 1.0);
  float outAlpha = hasTex ? alpha : clamp(alpha + fres * 0.26, 0.05, 0.94);
  if (uHdrLinearOutput > 0.5) {
    fragColor = vec4(col, outAlpha);
  } else {
    fragColor = vec4(fastAcesSrgb(col), outAlpha);
  }
  `
      : `
  if (irid > 0.04) {
    float fres = om2 * om;
    vec3 specIrid = 0.5 + 0.5 * cos(6.28318 * (iridIor * 0.72 * ndv + 0.15) + vec3(0.0, 2.094, 4.188));
    col += specIrid * irid * (0.08 + 0.28 * fres) * (uQualityTier > 1.5 ? 1.35 : 1.0);
  }
  if (uHdrLinearOutput > 0.5) {
    fragColor = vec4(col, 1.0);
  } else {
    fragColor = vec4(fastAcesSrgb(col), 1.0);
  }
  `
  }
}
`;
}

// --- HIGH & ULTRA Tight-Frustum Depth-Only Shadow Caster Shader (0 color writes, 3-5 draw calls!) ---
function buildOmegaShadowDepthVs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 uLightViewProj;
uniform sampler2D uPartStateTex;
uniform float uExplode;
${useClip ? 'uniform vec4 uClipPlane;' : ''}

in vec4 aPosSlot;
${useClip ? 'out highp float vClipDist;' : ''}

${GLSL3_CORE_LIB}

void main() {
  int slot = int(aPosSlot.w + 0.5);
  vec4 posVis = texelFetch(uPartStateTex, ivec2(0, slot), 0);
  float packed = posVis.w;
  if (packed < 0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    ${useClip ? 'vClipDist = -1.0;' : ''}
    return;
  }
  vec3 position = aPosSlot.xyz * 0.015625;
  vec3 worldPos;
  if (packed >= 7.5) {
    vec3 expDelta = texelFetch(uPartStateTex, ivec2(1, slot), 0).xyz;
    worldPos = position + posVis.xyz + expDelta * uExplode;
  } else if (packed >= 3.5) {
    vec4 quat = texelFetch(uPartStateTex, ivec2(1, slot), 0);
    vec4 scl = texelFetch(uPartStateTex, ivec2(3, slot), 0);
    worldPos = kmbRotateByQuat(position * scl.xyz, quat) + posVis.xyz;
  } else {
    worldPos = position + posVis.xyz;
  }
  ${useClip ? 'vClipDist = dot(worldPos, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uLightViewProj * vec4(worldPos, 1.0);
}
`;
}

function buildOmegaShadowDepthFs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
${useClip ? 'in highp float vClipDist;' : ''}
out vec4 fragColor;
void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}
  fragColor = vec4(1.0);
}
`;
}

// --- ULTRA Screen-Space Ray Tracing G-Buffer Shader (View-Space OctNormal + Roughness + Metalness) ---
function buildOmegaGbufSolidVs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 uViewProj;
uniform mat4 uViewMatrix;
uniform sampler2D uPartStateTex;
uniform vec4 uMatSolid[${MAX_FAST_SOLID_MATS * 2}];
uniform float uExplode;
${useClip ? 'uniform vec4 uClipPlane;' : ''}

in vec4 aPosSlot;
in vec2 aOctNorm;
in vec2 aMatMeta;

out highp vec3 vViewNorm;
flat out vec2 vRoughMetal;
${useClip ? 'out highp float vClipDist;' : ''}

${GLSL3_CORE_LIB}

void main() {
  int slot = int(aPosSlot.w + 0.5);
  vec4 posVis = texelFetch(uPartStateTex, ivec2(0, slot), 0);
  float packed = posVis.w;
  if (packed < 0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vViewNorm = vec3(0.0, 0.0, 1.0);
    vRoughMetal = vec2(0.5, 0.0);
    ${useClip ? 'vClipDist = -1.0;' : ''}
    return;
  }
  vec3 position = aPosSlot.xyz * 0.015625;
  vec3 localNorm = decodeOctNormal(aOctNorm);
  vec3 worldPos;
  vec3 worldNorm;
  if (packed >= 7.5) {
    vec3 expDelta = texelFetch(uPartStateTex, ivec2(1, slot), 0).xyz;
    worldPos = position + posVis.xyz + expDelta * uExplode;
    worldNorm = localNorm;
  } else if (packed >= 3.5) {
    vec4 quat = texelFetch(uPartStateTex, ivec2(1, slot), 0);
    vec4 scl = texelFetch(uPartStateTex, ivec2(3, slot), 0);
    worldPos = kmbRotateByQuat(position * scl.xyz, quat) + posVis.xyz;
    worldNorm = normalize(kmbRotateByQuat(localNorm, quat) + vec3(0.0, 0.0, 1e-6));
  } else {
    worldPos = position + posVis.xyz;
    worldNorm = localNorm;
  }
  int mIdx = int(aMatMeta.x + 0.5) * 2;
  vec4 m0 = uMatSolid[mIdx];
  vec4 m1 = uMatSolid[mIdx + 1];
  float metalEst = clamp((max(max(m1.r, m1.g), m1.b) - 0.05) * 2.2, 0.0, 1.0);
  vRoughMetal = vec2(m0.w, metalEst);
  vViewNorm = normalize(mat3(uViewMatrix) * worldNorm + vec3(0.0, 0.0, 1e-6));
  ${useClip ? 'vClipDist = dot(worldPos, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uViewProj * vec4(worldPos, 1.0);
}
`;
}

function buildOmegaGbufSolidFs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;

in highp vec3 vViewNorm;
flat in vec2 vRoughMetal;
${useClip ? 'in highp float vClipDist;' : ''}

out vec4 fragColor;

${GLSL3_CORE_LIB}

void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}
  vec3 N = normalize(vViewNorm + vec3(0.0, 0.0, 1e-6));
  ${useClip ? 'if (!gl_FrontFacing) N = -N;' : ''}
  fragColor = vec4(encodeOctNormal(N) * 0.5 + 0.5, vRoughMetal.x, vRoughMetal.y);
}
`;
}

function buildOmegaGbufTexVs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 uViewProj;
uniform mat4 uViewMatrix;
uniform sampler2D uPartStateTex;
uniform sampler2D uMatLutTex;
uniform float uExplode;
${useClip ? 'uniform vec4 uClipPlane;' : ''}

in vec4 aPosSlot;
in vec2 aOctNorm;
in vec2 aMatMeta;
in vec2 uv;

out highp vec3 vWorldNorm;
out highp vec3 vWorldPos;
out highp vec2 vUv;
flat out vec4 vMat1;
flat out int vMatId;
${useClip ? 'out highp float vClipDist;' : ''}

${GLSL3_CORE_LIB}

void main() {
  int slot = int(aPosSlot.w + 0.5);
  vec4 posVis = texelFetch(uPartStateTex, ivec2(0, slot), 0);
  float packed = posVis.w;
  if (packed < 0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vWorldNorm = vec3(0.0, 1.0, 0.0);
    vWorldPos = vec3(0.0);
    vUv = vec2(0.0);
    vMat1 = vec4(0.0, 0.5, 0.0, 0.0);
    vMatId = 0;
    ${useClip ? 'vClipDist = -1.0;' : ''}
    return;
  }
  vec3 position = aPosSlot.xyz * 0.015625;
  vec3 localNorm = decodeOctNormal(aOctNorm);
  vec3 worldPos;
  vec3 worldNorm;
  if (packed >= 7.5) {
    vec3 expDelta = texelFetch(uPartStateTex, ivec2(1, slot), 0).xyz;
    worldPos = position + posVis.xyz + expDelta * uExplode;
    worldNorm = localNorm;
  } else if (packed >= 3.5) {
    vec4 quat = texelFetch(uPartStateTex, ivec2(1, slot), 0);
    vec4 scl = texelFetch(uPartStateTex, ivec2(3, slot), 0);
    worldPos = kmbRotateByQuat(position * scl.xyz, quat) + posVis.xyz;
    worldNorm = normalize(kmbRotateByQuat(localNorm, quat) + vec3(0.0, 0.0, 1e-6));
  } else {
    worldPos = position + posVis.xyz;
    worldNorm = localNorm;
  }
  int matId = int(aMatMeta.x + 0.5);
  vMat1 = texelFetch(uMatLutTex, ivec2(1, matId), 0);
  vMatId = matId;
  vWorldNorm = worldNorm;
  vWorldPos = worldPos;
  vUv = uv;
  ${useClip ? 'vClipDist = dot(worldPos, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uViewProj * vec4(worldPos, 1.0);
}
`;
}

function buildOmegaGbufTexFs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;
precision mediump sampler2DArray;

uniform mat4 uViewMatrix;
uniform highp sampler2D uMatLutTex;
uniform sampler2DArray uTexArrayHi;
uniform sampler2DArray uTexArrayTile;

in highp vec3 vWorldNorm;
in highp vec3 vWorldPos;
in highp vec2 vUv;
flat in vec4 vMat1;
flat in int vMatId;
${useClip ? 'in highp float vClipDist;' : ''}

out vec4 fragColor;

${GLSL3_CORE_LIB}

void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}
  vec3 N = normalize(vWorldNorm + vec3(0.0, 0.0, 1e-6));
  if (!gl_FrontFacing) N = -N;
  float metal = vMat1.x;
  float rough = clamp(vMat1.y, 0.04, 1.0);

  if (vMat1.w > 0.5) {
    vec4 lut3 = texelFetch(uMatLutTex, ivec2(3, vMatId), 0);
    vec4 lut4 = texelFetch(uMatLutTex, ivec2(4, vMatId), 0);
    float bumpStr = lut3.y;
    if (lut4.x >= -0.5) {
      vec4 lut5 = texelFetch(uMatLutTex, ivec2(5, vMatId), 0);
      vec2 tiledUv = vUv * lut4.zw + lut5.yz;
      vec2 sampleUv = (lut4.z <= 1.001 && lut4.w <= 1.001)
        ? clamp(tiledUv, vec2(0.002), vec2(0.998))
        : tiledUv;
      vec4 texCol = lut4.x < 99.5
        ? texture(uTexArrayHi, vec3(sampleUv, lut4.x))
        : texture(uTexArrayTile, vec3(sampleUv, lut4.x - 100.0));
      float texLuma = dot(texCol.rgb, vec3(0.299, 0.587, 0.114));
      if (lut4.y >= -0.5) {
        float rSamp = lut4.y < 99.5
          ? texture(uTexArrayHi, vec3(sampleUv, lut4.y)).g
          : texture(uTexArrayTile, vec3(sampleUv, lut4.y - 100.0)).g;
        rough = clamp(rough * rSamp, 0.04, 1.0);
      }
      if (bumpStr > 0.004) {
        vec3 dPosX = dFdx(vWorldPos);
        vec3 dPosY = dFdy(vWorldPos);
        vec3 r1 = cross(dPosY, N);
        vec3 r2 = cross(N, dPosX);
        float det = dot(dPosX, r1);
        if (abs(det) > 1e-6) {
          float dHdx = dFdx(texLuma);
          float dHdy = dFdy(texLuma);
          vec3 surfGrad = (sign(det) * (dHdx * r1 + dHdy * r2)) / max(abs(det), 1e-4);
          float gradLen = length(surfGrad);
          vec3 clampedGrad = gradLen > 3.2 ? surfGrad * (3.2 / gradLen) : surfGrad;
          N = normalize(N - clampedGrad * (bumpStr * 1.35) + vec3(0.0, 0.0, 1e-6));
        }
        rough = clamp(rough + (0.48 - texLuma) * bumpStr * 1.45, 0.04, 0.98);
      }
    }
  }
  vec3 viewN = normalize(mat3(uViewMatrix) * N + vec3(0.0, 0.0, 1e-6));
  fragColor = vec4(encodeOctNormal(viewN) * 0.5 + 0.5, rough, metal);
}
`;
}

// --- Dedicated 5-ALU Zero-Sqrt Zero-Texture CAD Technical White Clay Shader ---
function buildCadClayVs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 uViewProj;
uniform sampler2D uPartStateTex;
uniform float uExplode;
${useClip ? 'uniform vec4 uClipPlane;' : ''}

in vec4 aPosSlot;
in vec2 aOctNorm;

out vec3 vWorldNorm;
${useClip ? 'out float vClipDist;' : ''}

${GLSL3_CORE_LIB}

void main() {
  int slot = int(aPosSlot.w + 0.5);
  vec4 posVis = texelFetch(uPartStateTex, ivec2(0, slot), 0);
  float packed = posVis.w;
  if (packed < 0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vWorldNorm = vec3(0.0, 1.0, 0.0);
    ${useClip ? 'vClipDist = -1.0;' : ''}
    return;
  }
  vec3 position = aPosSlot.xyz * 0.015625;
  vec3 localNorm = decodeOctNormal(aOctNorm);
  vec3 worldPos;
  vec3 worldNorm;
  if (packed >= 7.5) {
    vec3 expDelta = texelFetch(uPartStateTex, ivec2(1, slot), 0).xyz;
    worldPos = position + posVis.xyz + expDelta * uExplode;
    worldNorm = localNorm;
  } else if (packed >= 3.5) {
    vec4 quat = texelFetch(uPartStateTex, ivec2(1, slot), 0);
    vec4 scl = texelFetch(uPartStateTex, ivec2(3, slot), 0);
    worldPos = kmbRotateByQuat(position * scl.xyz, quat) + posVis.xyz;
    worldNorm = normalize(kmbRotateByQuat(localNorm, quat) + vec3(0.0, 0.0, 1e-6));
  } else {
    worldPos = position + posVis.xyz;
    worldNorm = localNorm;
  }
  vWorldNorm = worldNorm;
  ${useClip ? 'vClipDist = dot(worldPos, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uViewProj * vec4(worldPos, 1.0);
}
`;
}

function buildCadClayFs(useClip: boolean, isGlass: boolean): string {
  return /* glsl */ `
precision mediump float;

in vec3 vWorldNorm;
${useClip ? 'in float vClipDist;' : ''}
out vec4 fragColor;

void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}
  vec3 N = vWorldNorm;
  N *= (1.5 - 0.5 * dot(N, N));
  if (!gl_FrontFacing) N = -N;
  float x = max(0.76 + N.y * 0.27 + N.z * 0.14 - N.x * 0.12, 0.0);
  float g = (x * (32.06 * x + 6.394)) / (x * (31.61 * x + 8.988) + 1.0);
  fragColor = vec4(g * vec3(0.955, 0.968, 0.992), ${isGlass ? '0.46' : '1.0'});
}
`;
}

// --- OMEGA-3 8-Byte Single-Stream Quantized Mega-Edge LineSegments Shader ---
function buildMegaEdgeVs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 uViewProj;
uniform sampler2D uPartStateTex;
uniform float uExplode;
uniform float uHdrLinearOutput;
${useClip ? 'uniform vec4 uClipPlane;' : ''}

in vec4 aEdgePacked;

flat out vec4 vEdgeColor;
${useClip ? 'out float vClipDist;' : ''}

vec3 kmbRotateByQuat(vec3 v, vec4 q) {
  vec3 t = 2.0 * cross(q.xyz, v);
  return v + q.w * t + cross(q.xyz, t);
}

vec3 fastLinearToSrgb(vec3 c) {
  vec3 s = sqrt(clamp(c, 0.0, 1.0));
  return s * (1.138 - 0.138 * s);
}

void main() {
  int pk = int(aEdgePacked.w + 0.5);
  int slot = pk >> 4;
  float baseOp = float(pk & 15) * (1.0 / 15.0);
  vec4 posVis = texelFetch(uPartStateTex, ivec2(0, slot), 0);
  vec4 edgeStyle = texelFetch(uPartStateTex, ivec2(2, slot), 0);
  float alpha = edgeStyle.w < 0.0 ? (-edgeStyle.w * baseOp) : edgeStyle.w;
  float packed = posVis.w;
  if (packed < 0.5 || alpha < 0.005) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vEdgeColor = vec4(0.0);
    ${useClip ? 'vClipDist = -1.0;' : ''}
    return;
  }
  vec3 position = aEdgePacked.xyz * 0.015625;
  vec3 transformed;
  if (packed >= 7.5) {
    vec3 expDelta = texelFetch(uPartStateTex, ivec2(1, slot), 0).xyz;
    transformed = position + posVis.xyz + expDelta * uExplode;
  } else if (packed >= 3.5) {
    vec4 quat = texelFetch(uPartStateTex, ivec2(1, slot), 0);
    vec4 scl = texelFetch(uPartStateTex, ivec2(3, slot), 0);
    transformed = kmbRotateByQuat(position * scl.xyz, quat) + posVis.xyz;
  } else {
    transformed = position + posVis.xyz;
  }
  vec3 ec = uHdrLinearOutput > 0.5 ? edgeStyle.rgb : fastLinearToSrgb(edgeStyle.rgb);
  vEdgeColor = vec4(ec, alpha);
  ${useClip ? 'vClipDist = dot(transformed, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uViewProj * vec4(transformed, 1.0);
}
`;
}

function buildMegaEdgeFs(useClip: boolean): string {
  return /* glsl */ `
precision mediump float;

flat in vec4 vEdgeColor;
${useClip ? 'in float vClipDist;' : ''}
out vec4 fragColor;

void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}
  fragColor = vEdgeColor;
}
`;
}

// --- 1-Instruction Vertex-Fresnel X-Ray Ghost Shader ---
function buildXrayGhostVs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 uViewProj;
uniform vec3 uCamPos;
uniform sampler2D uPartStateTex;
uniform float uSkipHighlighted;
uniform float uExplode;
${useClip ? 'uniform vec4 uClipPlane;' : ''}

in vec4 aPosSlot;
in vec2 aOctNorm;

out vec4 vXrayColor;
${useClip ? 'out float vClipDist;' : ''}

${GLSL3_CORE_LIB}

void main() {
  int slot = int(aPosSlot.w + 0.5);
  vec4 posVis = texelFetch(uPartStateTex, ivec2(0, slot), 0);
  float packed = posVis.w;
  float vis = mod(packed, 4.0);
  if (packed < 0.5 || (uSkipHighlighted > 0.5 && vis >= 1.5)) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vXrayColor = vec4(0.0);
    ${useClip ? 'vClipDist = -1.0;' : ''}
    return;
  }
  vec3 position = aPosSlot.xyz * 0.015625;
  vec3 localNorm = decodeOctNormal(aOctNorm);
  vec3 transformed;
  vec3 worldNorm;
  if (packed >= 7.5) {
    vec3 expDelta = texelFetch(uPartStateTex, ivec2(1, slot), 0).xyz;
    transformed = position + posVis.xyz + expDelta * uExplode;
    worldNorm = localNorm;
  } else if (packed >= 3.5) {
    vec4 quat = texelFetch(uPartStateTex, ivec2(1, slot), 0);
    vec4 scl = texelFetch(uPartStateTex, ivec2(3, slot), 0);
    transformed = kmbRotateByQuat(position * scl.xyz, quat) + posVis.xyz;
    worldNorm = normalize(kmbRotateByQuat(localNorm, quat) + vec3(0.0, 0.0, 1e-6));
  } else {
    transformed = position + posVis.xyz;
    worldNorm = localNorm;
  }
  vec3 viewDir = normalize(uCamPos - transformed + vec3(0.0, 0.0, 1e-5));
  float om = 1.0 - clamp(abs(dot(worldNorm, viewDir)), 0.0, 1.0);
  float rim = om * om;
  vXrayColor = vec4(mix(vec3(0.62, 0.72, 0.83), vec3(0.42, 0.58, 0.78), rim), 0.13 + rim * 0.22);
  ${useClip ? 'vClipDist = dot(transformed, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uViewProj * vec4(transformed, 1.0);
}
`;
}

function buildXrayGhostFs(useClip: boolean): string {
  return /* glsl */ `
precision mediump float;

in vec4 vXrayColor;
${useClip ? 'in float vClipDist;' : ''}
out vec4 fragColor;

void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}
  fragColor = vXrayColor;
}
`;
}

// =============================================================================
// 3. OMEGA-14: NATIVE-RESOLUTION DUAL-TIER TEXTURE2DARRAY PACKER (Zero-DOM Fast-Paths!)
// =============================================================================

const HI_TEX_W = NATIVE_HI_TEX_W;
const HI_TEX_H = NATIVE_HI_TEX_H;
const HI_TEX_MAX_LAYERS = 38;
const TILE_TEX_SIZE = NATIVE_TILE_TEX_SIZE;
const TILE_TEX_MAX_LAYERS = 30;

const LINEAR_TO_SRGB_U8 = new Uint8Array(256);
for (let i = 0; i < 256; i++) {
  const gLin = i / 255;
  const gSrgb = gLin <= 0.0031308 ? gLin * 12.92 : 1.055 * Math.pow(gLin, 1 / 2.4) - 0.055;
  LINEAR_TO_SRGB_U8[i] = Math.max(0, Math.min(255, Math.round(gSrgb * 255)));
}

function reclaimSourceCanvasTexture(tex: THREE.Texture): void {
  const img = tex.image as HTMLCanvasElement | undefined;
  if (img && typeof img.getContext === 'function') {
    img.width = 0;
    img.height = 0;
    delete (img as unknown as { __ctx2d?: CanvasRenderingContext2D }).__ctx2d;
  }
  tex.dispose();
}

class DualTierTextureArrayPacker {
  public readonly hiArray: THREE.DataArrayTexture;
  public readonly tileArray: THREE.DataArrayTexture;
  private readonly hiData: Uint8Array<ArrayBuffer>;
  private readonly tileData: Uint8Array<ArrayBuffer>;
  private hiNext = 0;
  private tileNext = 0;
  private texToLayer = new Map<THREE.Texture, number>();

  private scratchHiCanvas: HTMLCanvasElement | null = null;
  private scratchHiCtx: CanvasRenderingContext2D | null = null;
  private scratchTileCanvas: HTMLCanvasElement | null = null;
  private scratchTileCtx: CanvasRenderingContext2D | null = null;

  constructor() {
    const safeArrayAniso = GPU_PROFILE.isMobile ? 1 : Math.min(4, GPU_PROFILE.maxAnisotropy);
    this.hiData = new Uint8Array(HI_TEX_W * HI_TEX_H * HI_TEX_MAX_LAYERS * 4);
    this.hiData.fill(255);
    this.hiArray = new THREE.DataArrayTexture(
      this.hiData,
      HI_TEX_W,
      HI_TEX_H,
      HI_TEX_MAX_LAYERS
    );
    this.hiArray.colorSpace = THREE.SRGBColorSpace;
    this.hiArray.wrapS = THREE.ClampToEdgeWrapping;
    this.hiArray.wrapT = THREE.ClampToEdgeWrapping;
    this.hiArray.minFilter = THREE.LinearMipmapLinearFilter;
    this.hiArray.magFilter = THREE.LinearFilter;
    this.hiArray.generateMipmaps = true;
    this.hiArray.anisotropy = safeArrayAniso;
    this.hiArray.needsUpdate = true;

    this.tileData = new Uint8Array(TILE_TEX_SIZE * TILE_TEX_SIZE * TILE_TEX_MAX_LAYERS * 4);
    this.tileData.fill(255);
    this.tileArray = new THREE.DataArrayTexture(
      this.tileData,
      TILE_TEX_SIZE,
      TILE_TEX_SIZE,
      TILE_TEX_MAX_LAYERS
    );
    this.tileArray.colorSpace = THREE.SRGBColorSpace;
    this.tileArray.wrapS = THREE.RepeatWrapping;
    this.tileArray.wrapT = THREE.RepeatWrapping;
    this.tileArray.minFilter = THREE.LinearMipmapLinearFilter;
    this.tileArray.magFilter = THREE.LinearFilter;
    this.tileArray.generateMipmaps = true;
    this.tileArray.anisotropy = safeArrayAniso;
    this.tileArray.needsUpdate = true;
  }

  public packTexture(tex: THREE.Texture, encodeLinearAsSrgb = false): number {
    const existing = this.texToLayer.get(tex);
    if (existing !== undefined) return existing;

    const img = tex.image as
      | (HTMLCanvasElement & { __ctx2d?: CanvasRenderingContext2D })
      | { data?: Uint8Array | Uint8ClampedArray; width?: number; height?: number }
      | undefined;
    if (!img) return -1;

    const srcW = img.width || 128;
    const srcH = img.height || 128;
    if (srcW === 0 || srcH === 0) return -1;

    // Fast-Path 1: Pure TypedArray `DataTexture` (0 DOM Canvas, 0 getImageData!)
    const rawData = (img as { data?: Uint8Array | Uint8ClampedArray }).data;
    if ((tex as THREE.DataTexture).isDataTexture && rawData && srcW === TILE_TEX_SIZE && srcH === TILE_TEX_SIZE && !tex.flipY) {
      const layer = Math.min(this.tileNext++, TILE_TEX_MAX_LAYERS - 1);
      const offset = layer * TILE_TEX_SIZE * TILE_TEX_SIZE * 4;
      if (encodeLinearAsSrgb) {
        for (let i = 0; i < rawData.length; i += 4) {
          const v = LINEAR_TO_SRGB_U8[rawData[i + 1]];
          this.tileData[offset + i] = v;
          this.tileData[offset + i + 1] = v;
          this.tileData[offset + i + 2] = v;
          this.tileData[offset + i + 3] = 255;
        }
      } else {
        this.tileData.set(rawData, offset);
      }
      this.tileArray.addLayerUpdate(layer);
      this.tileArray.needsUpdate = true;
      const encoded = 100 + layer;
      this.texToLayer.set(tex, encoded);
      tex.dispose();
      return encoded;
    }

    const heroMinDim = GPU_PROFILE.isMobile ? 180 : 300;
    const isHeroHiRes =
      !encodeLinearAsSrgb &&
      tex.wrapS !== THREE.RepeatWrapping &&
      Math.max(srcW, srcH) >= heroMinDim &&
      this.hiNext < HI_TEX_MAX_LAYERS;

    const directCtx = (img as HTMLCanvasElement & { __ctx2d?: CanvasRenderingContext2D }).__ctx2d;

    if (isHeroHiRes) {
      const layer = this.hiNext++;
      let rgba: Uint8ClampedArray;
      // Fast-Path 2A: Native-sized pre-flipped canvas (0 scratch canvas drawImage!)
      if (directCtx && srcW === HI_TEX_W && srcH === HI_TEX_H && !tex.flipY) {
        rgba = directCtx.getImageData(0, 0, HI_TEX_W, HI_TEX_H).data;
      } else {
        if (!this.scratchHiCanvas) {
          this.scratchHiCanvas = document.createElement('canvas');
          this.scratchHiCanvas.width = HI_TEX_W;
          this.scratchHiCanvas.height = HI_TEX_H;
          this.scratchHiCtx = this.scratchHiCanvas.getContext('2d', { willReadFrequently: true });
        }
        const ctx = this.scratchHiCtx!;
        ctx.clearRect(0, 0, HI_TEX_W, HI_TEX_H);
        ctx.save();
        if (tex.flipY) {
          ctx.translate(0, HI_TEX_H);
          ctx.scale(1, -1);
        }
        ctx.drawImage(img as CanvasImageSource, 0, 0, HI_TEX_W, HI_TEX_H);
        ctx.restore();
        rgba = ctx.getImageData(0, 0, HI_TEX_W, HI_TEX_H).data;
      }
      const offset = layer * HI_TEX_W * HI_TEX_H * 4;
      this.hiData.set(rgba, offset);
      this.hiArray.addLayerUpdate(layer);
      this.hiArray.needsUpdate = true;
      this.texToLayer.set(tex, layer);
      reclaimSourceCanvasTexture(tex);
      return layer;
    }

    const layer = Math.min(this.tileNext++, TILE_TEX_MAX_LAYERS - 1);
    let rgba: Uint8ClampedArray;
    // Fast-Path 2B: Native-sized pre-flipped tile canvas
    if (directCtx && srcW === TILE_TEX_SIZE && srcH === TILE_TEX_SIZE && !tex.flipY) {
      rgba = directCtx.getImageData(0, 0, TILE_TEX_SIZE, TILE_TEX_SIZE).data;
    } else {
      if (!this.scratchTileCanvas) {
        this.scratchTileCanvas = document.createElement('canvas');
        this.scratchTileCanvas.width = TILE_TEX_SIZE;
        this.scratchTileCanvas.height = TILE_TEX_SIZE;
        this.scratchTileCtx = this.scratchTileCanvas.getContext('2d', { willReadFrequently: true });
      }
      const ctx = this.scratchTileCtx!;
      ctx.clearRect(0, 0, TILE_TEX_SIZE, TILE_TEX_SIZE);
      ctx.save();
      if (tex.flipY) {
        ctx.translate(0, TILE_TEX_SIZE);
        ctx.scale(1, -1);
      }
      ctx.drawImage(img as CanvasImageSource, 0, 0, TILE_TEX_SIZE, TILE_TEX_SIZE);
      ctx.restore();
      rgba = ctx.getImageData(0, 0, TILE_TEX_SIZE, TILE_TEX_SIZE).data;
    }

    const offset = layer * TILE_TEX_SIZE * TILE_TEX_SIZE * 4;
    if (encodeLinearAsSrgb) {
      for (let i = 0; i < rgba.length; i += 4) {
        const v = LINEAR_TO_SRGB_U8[rgba[i + 1]];
        this.tileData[offset + i] = v;
        this.tileData[offset + i + 1] = v;
        this.tileData[offset + i + 2] = v;
        this.tileData[offset + i + 3] = 255;
      }
    } else {
      this.tileData.set(rgba, offset);
    }

    this.tileArray.addLayerUpdate(layer);
    this.tileArray.needsUpdate = true;
    const encoded = 100 + layer;
    this.texToLayer.set(tex, encoded);
    reclaimSourceCanvasTexture(tex);
    return encoded;
  }

  public releaseScratchCanvases(): void {
    if (this.scratchHiCanvas) {
      this.scratchHiCanvas.width = 0;
      this.scratchHiCanvas.height = 0;
    }
    if (this.scratchTileCanvas) {
      this.scratchTileCanvas.width = 0;
      this.scratchTileCanvas.height = 0;
    }
    this.scratchHiCanvas = null;
    this.scratchHiCtx = null;
    this.scratchTileCanvas = null;
    this.scratchTileCtx = null;
  }

  public refreshAfterContextRestore(): void {
    this.hiArray.layerUpdates.clear();
    this.hiArray.needsUpdate = true;
    this.tileArray.layerUpdates.clear();
    this.tileArray.needsUpdate = true;
  }

  public dispose(): void {
    this.releaseScratchCanvases();
    this.hiArray.dispose();
    this.tileArray.dispose();
  }
}

export interface SharedBatchUniforms {
  uViewProj: { value: THREE.Matrix4 };
  uViewMatrix: { value: THREE.Matrix4 };
  uCamPos: { value: THREE.Vector3 };
  uPartStateTex: { value: THREE.DataTexture };
  uMatLutTex: { value: THREE.DataTexture };
  uMatSolid: { value: Float32Array };
  uTexArrayHi: { value: THREE.DataArrayTexture };
  uTexArrayTile: { value: THREE.DataArrayTexture };
  uExplode: { value: number };
  uSkipHighlighted: { value: number };
  uClipPlane: { value: THREE.Vector4 };
  uShadowMap: { value: THREE.Texture };
  uLightViewProj: { value: THREE.Matrix4 };
  uShadowParams: { value: THREE.Vector4 };
  uQualityTier: { value: number };
  uHdrLinearOutput: { value: number };
}

export class MaterialLutRegistry {
  public lutData: Float32Array;
  public lutTexture: THREE.DataTexture;
  public readonly dummyShadowTex: THREE.DataTexture;
  public readonly solidUniformData: Float32Array;
  public readonly texPacker: DualTierTextureArrayPacker;
  public readonly uniforms: SharedBatchUniforms;
  private lutRenderedOnce = false;

  // Startup Zero-Discard Early-Z Materials (100% Hardware Early-Z enabled!)
  public readonly opaqueSolidFrontMat: THREE.RawShaderMaterial;
  public readonly opaqueFrontMat: THREE.RawShaderMaterial;
  public readonly opaqueDoubleMat: THREE.RawShaderMaterial;
  public readonly glassMat: THREE.RawShaderMaterial;
  public readonly glassDoubleMat: THREE.RawShaderMaterial;
  public readonly megaEdgeMat: THREE.RawShaderMaterial;
  public readonly xrayGhostMat: THREE.RawShaderMaterial;

  // Lazy Clipped & Dedicated CAD Clay Materials (compiled ONLY on demand!)
  private opaqueSolidFrontClipMat: THREE.RawShaderMaterial | null = null;
  private opaqueFrontClipMat: THREE.RawShaderMaterial | null = null;
  private opaqueDoubleClipMat: THREE.RawShaderMaterial | null = null;
  private glassClipMat: THREE.RawShaderMaterial | null = null;
  private glassDoubleClipMat: THREE.RawShaderMaterial | null = null;
  private megaEdgeClipMat: THREE.RawShaderMaterial | null = null;
  private xrayGhostClipMat: THREE.RawShaderMaterial | null = null;

  private cadOpaqueFrontMat: THREE.RawShaderMaterial | null = null;
  private cadOpaqueDoubleMat: THREE.RawShaderMaterial | null = null;
  private cadGlassFrontMat: THREE.RawShaderMaterial | null = null;
  private cadGlassDoubleMat: THREE.RawShaderMaterial | null = null;
  private cadOpaqueFrontClipMat: THREE.RawShaderMaterial | null = null;
  private cadOpaqueDoubleClipMat: THREE.RawShaderMaterial | null = null;
  private cadGlassFrontClipMat: THREE.RawShaderMaterial | null = null;
  private cadGlassDoubleClipMat: THREE.RawShaderMaterial | null = null;

  // Lazy HIGH/ULTRA Shadow Depth & ULTRA G-Buffer Materials (compiled ONLY when HIGH/ULTRA runs!)
  private shadowDepthFrontMat: THREE.RawShaderMaterial | null = null;
  private shadowDepthDoubleMat: THREE.RawShaderMaterial | null = null;
  private shadowDepthClipMat: THREE.RawShaderMaterial | null = null;
  private gbufSolidFrontMat: THREE.RawShaderMaterial | null = null;
  private gbufSolidClipMat: THREE.RawShaderMaterial | null = null;
  private gbufTexFrontMat: THREE.RawShaderMaterial | null = null;
  private gbufTexDoubleMat: THREE.RawShaderMaterial | null = null;
  private gbufTexClipMat: THREE.RawShaderMaterial | null = null;

  public readonly dynamicGlowMatId: number;
  public renderMode: RenderMode = 'solid';
  public sectionCutActive = false;

  private matToId = new Map<THREE.Material, number>();
  private matUsesUv = new Uint8Array(MAX_MATERIALS_CAPACITY);
  private matHasExtra = new Uint8Array(MAX_MATERIALS_CAPACITY);
  private nextMatId = 0;
  private clippingPlanes: THREE.Plane[];

  constructor(partStateTex: THREE.DataTexture, clippingPlanes: THREE.Plane[]) {
    this.clippingPlanes = clippingPlanes;
    this.lutData = new Float32Array(6 * MAX_MATERIALS_CAPACITY * 4);
    this.lutTexture = new THREE.DataTexture(
      this.lutData,
      6,
      MAX_MATERIALS_CAPACITY,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this.lutTexture.minFilter = THREE.NearestFilter;
    this.lutTexture.magFilter = THREE.NearestFilter;
    this.lutTexture.generateMipmaps = false;
    this.lutTexture.needsUpdate = true;

    this.dummyShadowTex = new THREE.DataTexture(
      new Uint8Array([255, 255, 255, 255]),
      1,
      1,
      THREE.RGBAFormat,
      THREE.UnsignedByteType
    );
    this.dummyShadowTex.minFilter = THREE.NearestFilter;
    this.dummyShadowTex.magFilter = THREE.NearestFilter;
    this.dummyShadowTex.generateMipmaps = false;
    this.dummyShadowTex.needsUpdate = true;

    this.solidUniformData = new Float32Array(MAX_FAST_SOLID_MATS * 2 * 4);
    this.texPacker = new DualTierTextureArrayPacker();

    const cp = clippingPlanes[0];
    this.uniforms = {
      uViewProj: { value: new THREE.Matrix4() },
      uViewMatrix: { value: new THREE.Matrix4() },
      uCamPos: { value: new THREE.Vector3() },
      uPartStateTex: { value: partStateTex },
      uMatLutTex: { value: this.lutTexture },
      uMatSolid: { value: this.solidUniformData },
      uTexArrayHi: { value: this.texPacker.hiArray },
      uTexArrayTile: { value: this.texPacker.tileArray },
      uExplode: { value: 0 },
      uSkipHighlighted: { value: 0 },
      uClipPlane: {
        value: new THREE.Vector4(cp.normal.x, cp.normal.y, cp.normal.z, cp.constant),
      },
      uShadowMap: { value: this.dummyShadowTex },
      uLightViewProj: { value: new THREE.Matrix4() },
      uShadowParams: { value: new THREE.Vector4(0.18, 1 / 1024, 0.0, 6.0) },
      uQualityTier: { value: 0 },
      uHdrLinearOutput: { value: 0 },
    };

    this.dynamicGlowMatId = this.reserveDynamicGlowLutSlot();

    this.opaqueSolidFrontMat = this.createPbrSolidMat(THREE.FrontSide, false);
    this.opaqueFrontMat = this.createPbrMat(THREE.FrontSide, false, true, false);
    this.opaqueDoubleMat = this.createPbrMat(THREE.DoubleSide, false, true, false);
    this.glassMat = this.createPbrMat(THREE.FrontSide, true, false, false);
    this.glassDoubleMat = this.createPbrMat(THREE.DoubleSide, true, false, false);
    this.megaEdgeMat = this.createEdgeMat(false);
    this.xrayGhostMat = this.createXrayMat(false);
  }

  private reserveDynamicGlowLutSlot(): number {
    const id = this.nextMatId++;
    const base = id * 24;
    const d = this.lutData;
    d[base + 7] = 1.0;
    d[base + 16] = -1;
    d[base + 17] = -1;
    d[base + 18] = 1;
    d[base + 19] = 1;
    d[base + 23] = 2.0;
    this.matHasExtra[id] = 1;
    this.lutTexture.needsUpdate = true;
    return id;
  }

  public syncViewProj(camera: THREE.Camera): void {
    this.lutRenderedOnce = true;
    this.uniforms.uViewMatrix.value.copy(camera.matrixWorldInverse);
    this.uniforms.uViewProj.value.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    this.uniforms.uCamPos.value.setFromMatrixPosition(camera.matrixWorld);
  }

  public syncClippingPlane(): void {
    const cp = this.clippingPlanes[0];
    this.uniforms.uClipPlane.value.set(cp.normal.x, cp.normal.y, cp.normal.z, cp.constant);
  }

  public setSectionCutActive(active: boolean): void {
    this.sectionCutActive = active;
  }

  public setRenderMode(mode: RenderMode): void {
    this.renderMode = mode;
    this.uniforms.uSkipHighlighted.value = mode === 'xray' ? 1 : 0;
  }

  /** Unclipped FrontSide/Early-Z material (used even during Section Cut for non-straddling parts!) */
  public getUnclippedBucketMaterial(
    bucket: 'opaqueSolidFront' | 'opaqueTexFront' | 'opaqueDouble' | 'glassFront' | 'glassDouble'
  ): THREE.RawShaderMaterial {
    if (this.renderMode === 'cad') {
      if (bucket === 'opaqueSolidFront' || bucket === 'opaqueTexFront') {
        return (this.cadOpaqueFrontMat ??= this.createCadMat(THREE.FrontSide, false, true, false));
      }
      if (bucket === 'opaqueDouble') {
        return (this.cadOpaqueDoubleMat ??= this.createCadMat(THREE.DoubleSide, false, true, false));
      }
      if (bucket === 'glassFront') {
        return (this.cadGlassFrontMat ??= this.createCadMat(THREE.FrontSide, true, false, false));
      }
      return (this.cadGlassDoubleMat ??= this.createCadMat(THREE.DoubleSide, true, false, false));
    }

    if (bucket === 'opaqueSolidFront') return this.opaqueSolidFrontMat;
    if (bucket === 'opaqueTexFront') return this.opaqueFrontMat;
    if (bucket === 'opaqueDouble') return this.opaqueDoubleMat;
    if (bucket === 'glassFront') return this.glassMat;
    return this.glassDoubleMat;
  }

  /** Clipped DoubleSide material (used ONLY for plane-straddling parts during Section Cut!) */
  public getClippedBucketMaterial(
    bucket: 'opaqueSolidFront' | 'opaqueTexFront' | 'opaqueDouble' | 'glassFront' | 'glassDouble'
  ): THREE.RawShaderMaterial {
    if (this.renderMode === 'cad') {
      if (bucket === 'opaqueSolidFront' || bucket === 'opaqueTexFront') {
        return (this.cadOpaqueFrontClipMat ??= this.createCadMat(THREE.DoubleSide, false, true, true));
      }
      if (bucket === 'opaqueDouble') {
        return (this.cadOpaqueDoubleClipMat ??= this.createCadMat(THREE.DoubleSide, false, true, true));
      }
      if (bucket === 'glassFront') {
        return (this.cadGlassFrontClipMat ??= this.createCadMat(THREE.DoubleSide, true, false, true));
      }
      return (this.cadGlassDoubleClipMat ??= this.createCadMat(THREE.DoubleSide, true, false, true));
    }

    if (bucket === 'opaqueSolidFront') {
      return (this.opaqueSolidFrontClipMat ??= this.createPbrSolidMat(THREE.DoubleSide, true));
    }
    if (bucket === 'opaqueTexFront') {
      return (this.opaqueFrontClipMat ??= this.createPbrMat(THREE.DoubleSide, false, true, true));
    }
    if (bucket === 'opaqueDouble') {
      return (this.opaqueDoubleClipMat ??= this.createPbrMat(THREE.DoubleSide, false, true, true));
    }
    if (bucket === 'glassFront') {
      return (this.glassClipMat ??= this.createPbrMat(THREE.DoubleSide, true, false, true));
    }
    return (this.glassDoubleClipMat ??= this.createPbrMat(THREE.DoubleSide, true, false, true));
  }

  public getActiveBucketMaterial(
    bucket: 'opaqueSolidFront' | 'opaqueTexFront' | 'opaqueDouble' | 'glassFront' | 'glassDouble'
  ): THREE.RawShaderMaterial {
    return this.sectionCutActive
      ? this.getClippedBucketMaterial(bucket)
      : this.getUnclippedBucketMaterial(bucket);
  }

  public getUnclippedEdgeMaterial(): THREE.RawShaderMaterial {
    return this.megaEdgeMat;
  }

  public getClippedEdgeMaterial(): THREE.RawShaderMaterial {
    return (this.megaEdgeClipMat ??= this.createEdgeMat(true));
  }

  public getActiveEdgeMaterial(): THREE.RawShaderMaterial {
    return this.sectionCutActive ? this.getClippedEdgeMaterial() : this.megaEdgeMat;
  }

  public getActiveXrayMaterial(): THREE.RawShaderMaterial {
    if (this.sectionCutActive) {
      return (this.xrayGhostClipMat ??= this.createXrayMat(true));
    }
    return this.xrayGhostMat;
  }

  public prepackAllMaterials(materials: ReadonlyArray<THREE.Material>): void {
    for (let i = 0; i < materials.length; i++) {
      const std = materials[i] as THREE.MeshStandardMaterial;
      const primary = std.map ?? std.emissiveMap ?? null;
      if (primary) this.texPacker.packTexture(primary, false);
      if (std.roughnessMap) this.texPacker.packTexture(std.roughnessMap, true);
    }
    this.texPacker.hiArray.layerUpdates.clear();
    this.texPacker.hiArray.needsUpdate = true;
    this.texPacker.tileArray.layerUpdates.clear();
    this.texPacker.tileArray.needsUpdate = true;
    this.texPacker.releaseScratchCanvases();
  }

  public registerMaterial(
    mat: THREE.Material
  ): { matId: number; isTransparent: boolean; useUv: boolean; hasExtra: boolean } {
    const isTransparent = Boolean(mat.transparent);
    const existing = this.matToId.get(mat);
    if (existing !== undefined) {
      return {
        matId: existing,
        isTransparent,
        useUv: this.matUsesUv[existing] === 1,
        hasExtra: this.matHasExtra[existing] === 1 || existing >= MAX_FAST_SOLID_MATS,
      };
    }

    const id = this.nextMatId++;
    if (id >= MAX_MATERIALS_CAPACITY) {
      return { matId: MAX_MATERIALS_CAPACITY - 1, isTransparent, useUv: false, hasExtra: true };
    }
    this.matToId.set(mat, id);

    const std = mat as THREE.MeshStandardMaterial;
    const phys = mat as THREE.MeshPhysicalMaterial;

    const col = std.color ?? new THREE.Color(0x888888);
    const em = std.emissive ?? new THREE.Color(0x000000);
    const emI = typeof std.emissiveIntensity === 'number' ? std.emissiveIntensity : 0;
    const metalness = typeof std.metalness === 'number' ? std.metalness : 0.2;
    const roughness = typeof std.roughness === 'number' ? std.roughness : 0.5;
    const opacity = typeof mat.opacity === 'number' ? mat.opacity : 1.0;

    const clearcoat =
      typeof mat.userData.lutClearcoat === 'number'
        ? (mat.userData.lutClearcoat as number)
        : typeof phys.clearcoat === 'number'
          ? phys.clearcoat
          : 0;
    const irid =
      typeof mat.userData.lutIridescence === 'number'
        ? (mat.userData.lutIridescence as number)
        : typeof phys.iridescence === 'number'
          ? phys.iridescence
          : 0;
    const iridIor =
      typeof mat.userData.lutIridescenceIOR === 'number'
        ? (mat.userData.lutIridescenceIOR as number)
        : typeof phys.iridescenceIOR === 'number'
          ? phys.iridescenceIOR
          : 1.45;
    const envI = typeof std.envMapIntensity === 'number' ? std.envMapIntensity : 1.0;
    const bumpChannel = (mat.userData.bumpChannel as number) || 0;
    const texBumpStrength =
      typeof mat.userData.texBumpStrength === 'number'
        ? (mat.userData.texBumpStrength as number)
        : 0;
    const bumpScale =
      texBumpStrength > 0
        ? texBumpStrength
        : bumpChannel > 0
          ? typeof mat.userData.lutBumpScale === 'number'
            ? (mat.userData.lutBumpScale as number)
            : typeof std.bumpScale === 'number'
              ? std.bumpScale
              : 0.04
          : 0;

    const primaryMap = std.map ?? std.emissiveMap ?? null;
    const texLayer = primaryMap ? this.texPacker.packTexture(primaryMap, false) : -1;
    const roughLayer = std.roughnessMap ? this.texPacker.packTexture(std.roughnessMap, true) : -1;
    const uvRepX = primaryMap ? primaryMap.repeat.x : 1.0;
    const uvRepY = primaryMap ? primaryMap.repeat.y : 1.0;
    const uvOffX = primaryMap ? primaryMap.offset.x : 0.0;
    const uvOffY = primaryMap ? primaryMap.offset.y : 0.0;
    const useEmissiveMap = std.emissiveMap ? 1.0 : 0.0;
    const matFlags = isTransparent && texLayer < 0 ? 1.0 : 0.0;
    const useUv = texLayer >= 0 || roughLayer >= 0;
    const hasEmissive = emI > 0.005 && (em.r > 0.004 || em.g > 0.004 || em.b > 0.004);
    const hasExtraBool = useUv || hasEmissive || irid > 0.02;
    const hasExtra = hasExtraBool ? 1.0 : 0.0;
    this.matUsesUv[id] = useUv ? 1 : 0;
    this.matHasExtra[id] = hasExtraBool ? 1 : 0;

    // Pre-bake OMEGA-2 Uniform Solid LUT entry: [diffR, diffG, diffB, rough, F0R, F0G, F0B, coat*0.22]
    if (id < MAX_FAST_SOLID_MATS) {
      const clampedRough = Math.max(0.04, Math.min(1.0, roughness));
      const oneMinusM = 1.0 - metalness;
      const su = id * 8;
      this.solidUniformData[su] = col.r * oneMinusM;
      this.solidUniformData[su + 1] = col.g * oneMinusM;
      this.solidUniformData[su + 2] = col.b * oneMinusM;
      this.solidUniformData[su + 3] = clampedRough;
      this.solidUniformData[su + 4] = 0.04 * oneMinusM + col.r * metalness;
      this.solidUniformData[su + 5] = 0.04 * oneMinusM + col.g * metalness;
      this.solidUniformData[su + 6] = 0.04 * oneMinusM + col.b * metalness;
      this.solidUniformData[su + 7] = clearcoat * 0.22;
    }

    const base = id * 24;
    const d = this.lutData;
    d[base] = col.r;
    d[base + 1] = col.g;
    d[base + 2] = col.b;
    d[base + 3] = opacity;
    d[base + 4] = metalness;
    d[base + 5] = roughness;
    d[base + 6] = clearcoat;
    d[base + 7] = hasExtra;
    d[base + 8] = em.r * emI;
    d[base + 9] = em.g * emI;
    d[base + 10] = em.b * emI;
    d[base + 11] = irid;
    d[base + 12] = envI;
    d[base + 13] = bumpScale;
    d[base + 14] = iridIor;
    d[base + 15] = bumpChannel;
    d[base + 16] = texLayer;
    d[base + 17] = roughLayer;
    d[base + 18] = uvRepX;
    d[base + 19] = uvRepY;
    d[base + 20] = useEmissiveMap;
    d[base + 21] = uvOffX;
    d[base + 22] = uvOffY;
    d[base + 23] = matFlags;

    if (this.lutRenderedOnce) {
      const freshBuf = new Float32Array(this.lutData);
      const freshLut = new THREE.DataTexture(
        freshBuf,
        6,
        MAX_MATERIALS_CAPACITY,
        THREE.RGBAFormat,
        THREE.FloatType
      );
      freshLut.minFilter = THREE.NearestFilter;
      freshLut.magFilter = THREE.NearestFilter;
      freshLut.generateMipmaps = false;
      freshLut.needsUpdate = true;
      this.lutTexture.dispose();
      this.lutData = freshBuf;
      this.lutTexture = freshLut;
      this.uniforms.uMatLutTex.value = freshLut;
      this.lutRenderedOnce = false;
    } else {
      this.lutTexture.needsUpdate = true;
    }
    return {
      matId: id,
      isTransparent,
      useUv,
      hasExtra: hasExtraBool || id >= MAX_FAST_SOLID_MATS,
    };
  }

  private createPbrSolidMat(side: THREE.Side, useClip: boolean): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = {
      uViewProj: this.uniforms.uViewProj,
      uCamPos: this.uniforms.uCamPos,
      uPartStateTex: this.uniforms.uPartStateTex,
      uMatSolid: this.uniforms.uMatSolid,
      uExplode: this.uniforms.uExplode,
      uShadowMap: this.uniforms.uShadowMap,
      uLightViewProj: this.uniforms.uLightViewProj,
      uShadowParams: this.uniforms.uShadowParams,
      uQualityTier: this.uniforms.uQualityTier,
      uHdrLinearOutput: this.uniforms.uHdrLinearOutput,
    };
    if (useClip) uniforms.uClipPlane = this.uniforms.uClipPlane;
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      side,
      transparent: false,
      depthWrite: true,
      vertexShader: buildOmegaPbrSolidVs(useClip),
      fragmentShader: buildOmegaPbrSolidFs(useClip),
      uniforms,
    });
    mat.customProgramCacheKey = () => `omega-pbr-solid-v8-${useClip ? 'c' : 'nc'}`;
    return mat;
  }

  private createPbrMat(
    side: THREE.Side,
    transparent: boolean,
    depthWrite: boolean,
    useClip: boolean
  ): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = {
      uViewProj: this.uniforms.uViewProj,
      uCamPos: this.uniforms.uCamPos,
      uPartStateTex: this.uniforms.uPartStateTex,
      uMatLutTex: this.uniforms.uMatLutTex,
      uTexArrayHi: this.uniforms.uTexArrayHi,
      uTexArrayTile: this.uniforms.uTexArrayTile,
      uExplode: this.uniforms.uExplode,
      uShadowMap: this.uniforms.uShadowMap,
      uLightViewProj: this.uniforms.uLightViewProj,
      uShadowParams: this.uniforms.uShadowParams,
      uQualityTier: this.uniforms.uQualityTier,
      uHdrLinearOutput: this.uniforms.uHdrLinearOutput,
    };
    if (useClip) uniforms.uClipPlane = this.uniforms.uClipPlane;
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      side,
      transparent,
      depthWrite,
      vertexShader: buildOmegaPbrVs(useClip, transparent),
      fragmentShader: buildOmegaPbrFs(useClip, transparent),
      uniforms,
    });
    mat.customProgramCacheKey = () =>
      `omega-pbr-v8-${transparent ? 'g' : 'o'}-${useClip ? 'c' : 'nc'}`;
    return mat;
  }

  public getShadowDepthMaterial(side: THREE.Side, useClip: boolean): THREE.RawShaderMaterial {
    if (useClip) {
      return (this.shadowDepthClipMat ??= this.createShadowDepthMat(THREE.DoubleSide, true));
    }
    if (side === THREE.DoubleSide) {
      return (this.shadowDepthDoubleMat ??= this.createShadowDepthMat(THREE.DoubleSide, false));
    }
    return (this.shadowDepthFrontMat ??= this.createShadowDepthMat(THREE.FrontSide, false));
  }

  public getGbufMaterial(
    bucket: 'opaqueSolidFront' | 'opaqueTexFront' | 'opaqueDouble',
    useClip: boolean
  ): THREE.RawShaderMaterial {
    if (bucket === 'opaqueSolidFront') {
      return useClip
        ? (this.gbufSolidClipMat ??= this.createGbufSolidMat(THREE.DoubleSide, true))
        : (this.gbufSolidFrontMat ??= this.createGbufSolidMat(THREE.FrontSide, false));
    }
    if (useClip) {
      return (this.gbufTexClipMat ??= this.createGbufTexMat(THREE.DoubleSide, true));
    }
    if (bucket === 'opaqueDouble') {
      return (this.gbufTexDoubleMat ??= this.createGbufTexMat(THREE.DoubleSide, false));
    }
    return (this.gbufTexFrontMat ??= this.createGbufTexMat(THREE.FrontSide, false));
  }

  private createShadowDepthMat(side: THREE.Side, useClip: boolean): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = {
      uLightViewProj: this.uniforms.uLightViewProj,
      uPartStateTex: this.uniforms.uPartStateTex,
      uExplode: this.uniforms.uExplode,
    };
    if (useClip) uniforms.uClipPlane = this.uniforms.uClipPlane;
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      side,
      transparent: false,
      depthWrite: true,
      colorWrite: false,
      vertexShader: buildOmegaShadowDepthVs(useClip),
      fragmentShader: buildOmegaShadowDepthFs(useClip),
      uniforms,
    });
    mat.customProgramCacheKey = () => `omega-shadow-v8-${useClip ? 'c' : 'nc'}`;
    return mat;
  }

  private createGbufSolidMat(side: THREE.Side, useClip: boolean): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = {
      uViewProj: this.uniforms.uViewProj,
      uViewMatrix: this.uniforms.uViewMatrix,
      uPartStateTex: this.uniforms.uPartStateTex,
      uMatSolid: this.uniforms.uMatSolid,
      uExplode: this.uniforms.uExplode,
    };
    if (useClip) uniforms.uClipPlane = this.uniforms.uClipPlane;
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      side,
      transparent: false,
      depthWrite: true,
      vertexShader: buildOmegaGbufSolidVs(useClip),
      fragmentShader: buildOmegaGbufSolidFs(useClip),
      uniforms,
    });
    mat.customProgramCacheKey = () => `omega-gbuf-solid-v8-${useClip ? 'c' : 'nc'}`;
    return mat;
  }

  private createGbufTexMat(side: THREE.Side, useClip: boolean): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = {
      uViewProj: this.uniforms.uViewProj,
      uViewMatrix: this.uniforms.uViewMatrix,
      uPartStateTex: this.uniforms.uPartStateTex,
      uMatLutTex: this.uniforms.uMatLutTex,
      uTexArrayHi: this.uniforms.uTexArrayHi,
      uTexArrayTile: this.uniforms.uTexArrayTile,
      uExplode: this.uniforms.uExplode,
    };
    if (useClip) uniforms.uClipPlane = this.uniforms.uClipPlane;
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      side,
      transparent: false,
      depthWrite: true,
      vertexShader: buildOmegaGbufTexVs(useClip),
      fragmentShader: buildOmegaGbufTexFs(useClip),
      uniforms,
    });
    mat.customProgramCacheKey = () => `omega-gbuf-tex-v8-${useClip ? 'c' : 'nc'}`;
    return mat;
  }

  private createCadMat(
    side: THREE.Side,
    transparent: boolean,
    depthWrite: boolean,
    useClip: boolean
  ): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = {
      uViewProj: this.uniforms.uViewProj,
      uPartStateTex: this.uniforms.uPartStateTex,
      uExplode: this.uniforms.uExplode,
    };
    if (useClip) uniforms.uClipPlane = this.uniforms.uClipPlane;
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      side,
      transparent,
      depthWrite,
      vertexShader: buildCadClayVs(useClip),
      fragmentShader: buildCadClayFs(useClip, transparent),
      uniforms,
    });
    mat.customProgramCacheKey = () =>
      `omega-cad-v7-${transparent ? 'g' : 'o'}-${useClip ? 'c' : 'nc'}`;
    return mat;
  }

  private createEdgeMat(useClip: boolean): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = {
      uViewProj: this.uniforms.uViewProj,
      uPartStateTex: this.uniforms.uPartStateTex,
      uExplode: this.uniforms.uExplode,
      uHdrLinearOutput: this.uniforms.uHdrLinearOutput,
    };
    if (useClip) uniforms.uClipPlane = this.uniforms.uClipPlane;
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      vertexShader: buildMegaEdgeVs(useClip),
      fragmentShader: buildMegaEdgeFs(useClip),
      uniforms,
    });
    mat.customProgramCacheKey = () => `omega-edge-v8-${useClip ? 'c' : 'nc'}`;
    return mat;
  }

  private createXrayMat(useClip: boolean): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = {
      uViewProj: this.uniforms.uViewProj,
      uCamPos: this.uniforms.uCamPos,
      uPartStateTex: this.uniforms.uPartStateTex,
      uSkipHighlighted: this.uniforms.uSkipHighlighted,
      uExplode: this.uniforms.uExplode,
    };
    if (useClip) uniforms.uClipPlane = this.uniforms.uClipPlane;
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
      vertexShader: buildXrayGhostVs(useClip),
      fragmentShader: buildXrayGhostFs(useClip),
      uniforms,
    });
    mat.customProgramCacheKey = () => `omega-xray-v7-${useClip ? 'c' : 'nc'}`;
    return mat;
  }

  private getAllMaterialsList(): Array<THREE.RawShaderMaterial | null> {
    return [
      this.opaqueSolidFrontMat,
      this.opaqueFrontMat,
      this.opaqueDoubleMat,
      this.glassMat,
      this.glassDoubleMat,
      this.megaEdgeMat,
      this.xrayGhostMat,
      this.opaqueSolidFrontClipMat,
      this.opaqueFrontClipMat,
      this.opaqueDoubleClipMat,
      this.glassClipMat,
      this.glassDoubleClipMat,
      this.megaEdgeClipMat,
      this.xrayGhostClipMat,
      this.cadOpaqueFrontMat,
      this.cadOpaqueDoubleMat,
      this.cadGlassFrontMat,
      this.cadGlassDoubleMat,
      this.cadOpaqueFrontClipMat,
      this.cadOpaqueDoubleClipMat,
      this.cadGlassFrontClipMat,
      this.cadGlassDoubleClipMat,
      this.shadowDepthFrontMat,
      this.shadowDepthDoubleMat,
      this.shadowDepthClipMat,
      this.gbufSolidFrontMat,
      this.gbufSolidClipMat,
      this.gbufTexFrontMat,
      this.gbufTexDoubleMat,
      this.gbufTexClipMat,
    ];
  }

  public refreshAfterContextRestore(): void {
    this.lutTexture.needsUpdate = true;
    this.dummyShadowTex.needsUpdate = true;
    this.texPacker.refreshAfterContextRestore();
    for (const m of this.getAllMaterialsList()) {
      if (m) m.needsUpdate = true;
    }
  }

  public dispose(): void {
    this.lutTexture.dispose();
    this.dummyShadowTex.dispose();
    this.texPacker.dispose();
    for (const m of this.getAllMaterialsList()) {
      if (m) m.dispose();
    }
  }
}

// =============================================================================
// 4. OMEGA-1 + OMEGA-16: LAZY ELASTIC 4-SLOT IBO RING + ZERO-COPY MASTER FAST-PATH
// =============================================================================

export interface IndexSpan {
  start: number;
  count: number;
}

export interface ElasticIboRing {
  masterAttr: THREE.BufferAttribute | null;
  buffers: [
    Uint16Array | Uint32Array | null,
    Uint16Array | Uint32Array | null,
    Uint16Array | Uint32Array | null,
    Uint16Array | Uint32Array | null,
  ];
  attrs: [
    THREE.BufferAttribute | null,
    THREE.BufferAttribute | null,
    THREE.BufferAttribute | null,
    THREE.BufferAttribute | null,
  ];
  ringIdx: 0 | 1 | 2 | 3;
  lastRotatedEpoch: number;
  lastHash: number;
  lastCount: number;
}

function createElasticIboRing(
  masterIndices: Uint16Array | Uint32Array,
  bindMasterInitially = true,
  existingIndexAttr?: THREE.BufferAttribute | null
): ElasticIboRing {
  const masterAttr = bindMasterInitially
    ? (existingIndexAttr ?? new THREE.BufferAttribute(masterIndices, 1))
    : null;
  return {
    masterAttr,
    buffers: [null, null, null, null],
    attrs: [null, null, null, null],
    ringIdx: 0,
    lastRotatedEpoch: -1,
    lastHash: -1,
    lastCount: bindMasterInitially ? masterIndices.length : 0,
  };
}

export interface CompactableBucket {
  kind: 'opaqueSolidFront' | 'opaqueTexFront' | 'opaqueDouble' | 'glassFront' | 'glassDouble' | 'edge';
  geometry: THREE.BufferGeometry;
  masterIndices: Uint16Array | Uint32Array;
  mainRing: ElasticIboRing;
  spansByPartSlot: Map<number, IndexSpan[]>;
  solidMesh: THREE.Mesh | null;
  xrayMesh: THREE.Mesh | null;
  edgeMesh: THREE.LineSegments | null;
  /** OMEGA-6 Lazy Plane-Straddling Clipped Geometry (shares VBO attributes, 0 VBO duplication!) */
  straddleGeo?: THREE.BufferGeometry | null;
  straddleRing?: ElasticIboRing | null;
  straddleMesh?: THREE.Mesh | null;
  straddleEdgeMesh?: THREE.LineSegments | null;
  /** Dedicated tiny highlight geometry for X-Ray 1-part solid pass */
  xrayHighlightMesh?: THREE.Mesh | null;
  xrayHighlightGeo?: THREE.BufferGeometry | null;
  xrayHighlightAttr?: THREE.BufferAttribute | null;
  xrayHighlightBuf?: Uint16Array | Uint32Array | null;
  lastHighlightHash: number;
}

function makeBucketCompactor(
  kind: CompactableBucket['kind'],
  geometry: THREE.BufferGeometry,
  masterIndices: Uint16Array | Uint32Array,
  spansByPartSlot: Map<number, IndexSpan[]>,
  solidMesh: THREE.Mesh | null,
  xrayMesh: THREE.Mesh | null,
  edgeMesh: THREE.LineSegments | null
): CompactableBucket {
  const existingIdx = geometry.getIndex() as THREE.BufferAttribute | null;
  const mainRing = createElasticIboRing(masterIndices, true, existingIdx);
  if (mainRing.masterAttr && existingIdx !== mainRing.masterAttr) {
    geometry.setIndex(mainRing.masterAttr);
  }

  return {
    kind,
    geometry,
    masterIndices,
    mainRing,
    spansByPartSlot,
    solidMesh,
    xrayMesh,
    edgeMesh,
    lastHighlightHash: -1,
  };
}

function compactRingForSlots(
  targetGeo: THREE.BufferGeometry,
  ring: ElasticIboRing,
  master: Uint16Array | Uint32Array,
  map: Map<number, IndexSpan[]>,
  orderedPartSlots: Int32Array,
  slotCount: number,
  hash: number
): number {
  if (ring.lastHash === hash) {
    return ring.lastCount;
  }
  ring.lastHash = hash;

  if (slotCount === 0) {
    ring.lastCount = 0;
    targetGeo.setDrawRange(0, 0);
    return 0;
  }

  // Pass 1: exact required count + check if spans match master[0..N] contiguously (0-copy fast path!)
  let needed = 0;
  let isIdentityMaster = ring.masterAttr !== null;
  for (let i = 0; i < slotCount; i++) {
    const spans = map.get(orderedPartSlots[i]);
    if (!spans) continue;
    for (let si = 0; si < spans.length; si++) {
      const sp = spans[si];
      if (isIdentityMaster && sp.start !== needed) {
        isIdentityMaster = false;
      }
      needed += sp.count;
    }
  }

  if (needed === 0) {
    ring.lastCount = 0;
    targetGeo.setDrawRange(0, 0);
    return 0;
  }

  if (isIdentityMaster && needed === master.length && ring.masterAttr) {
    ring.lastCount = needed;
    targetGeo.setIndex(ring.masterAttr);
    targetGeo.setDrawRange(0, needed);
    return needed;
  }

  if (ring.lastRotatedEpoch !== _globalRenderEpoch) {
    ring.ringIdx = ((ring.ringIdx + 1) & 3) as 0 | 1 | 2 | 3;
    ring.lastRotatedEpoch = _globalRenderEpoch;
  }
  const idx = ring.ringIdx;
  let active = ring.buffers[idx];
  let attr = ring.attrs[idx];

  if (!active || active.length < needed) {
    const nextLen = ring.masterAttr
      ? master.length
      : Math.min(master.length, Math.max(needed * 2, 4096));
    active = master instanceof Uint16Array ? new Uint16Array(nextLen) : new Uint32Array(nextLen);
    attr = new THREE.BufferAttribute(active, 1);
    attr.setUsage(THREE.DynamicDrawUsage);
    ring.buffers[idx] = active;
    ring.attrs[idx] = attr;
  }

  let cursor = 0;
  for (let i = 0; i < slotCount; i++) {
    const spans = map.get(orderedPartSlots[i]);
    if (!spans) continue;
    for (let si = 0; si < spans.length; si++) {
      const sp = spans[si];
      active.set(master.subarray(sp.start, sp.start + sp.count), cursor);
      cursor += sp.count;
    }
  }

  ring.lastCount = cursor;
  targetGeo.setIndex(attr!);
  targetGeo.setDrawRange(0, cursor);
  attr!.clearUpdateRanges();
  attr!.addUpdateRange(0, cursor);
  attr!.needsUpdate = true;
  return cursor;
}

// =============================================================================
// 5. MEGA-BATCH & UNIFIED MACRO COMPILER
// =============================================================================

export interface GeometrySlice {
  posInt16: Int16Array;
  masterIndices: Uint16Array | Uint32Array;
  indexStart: number;
  indexCount: number;
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  bvh?: FlatSliceBvh | null;
}

export interface BoneGeometrySlice {
  boneObj: THREE.Object3D;
  boneSlot: number;
  localBox: THREE.Box3;
  localSphere: THREE.Sphere;
  posInt16: Int16Array;
  masterIndices: Uint16Array | Uint32Array;
  indexStart: number;
  indexCount: number;
  bvh?: FlatSliceBvh | null;
}

export interface KinematicBoneBinding {
  boneObj: THREE.Object3D;
  boneSlot: number;
  parentPart: CadPart;
  parentSlot: number;
}

export interface DynamicGlowBinding {
  glowMesh: THREE.Mesh;
  glowSlot: number;
  parentPart: CadPart;
  ownerBone: THREE.Object3D | null;
}

export interface PartPickRecord {
  part: CadPart;
  slot: number;
  localBox: THREE.Box3;
  localSphere: THREE.Sphere;
  slices: GeometrySlice[];
  boneSlices: BoneGeometrySlice[];
  boneSlots: number[];
  hasTransparent: boolean;
  /** True when rigid part has no bones, glows, IBIS, or dynamic rig motion -> GPU Analytical Explode! */
  canUseAnalyticalExplode: boolean;
}

interface RawBucketEntry {
  partId: string;
  partSlot: number;
  slot: number;
  matId: number;
  useUv: boolean;
  boneObj: THREE.Object3D | null;
  localBox: THREE.Box3;
  positions: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  triCount: number;
}

export interface MegaBatchChunk {
  group: THREE.Group;
  xrayMeshes: THREE.Mesh[];
  solidMeshes: THREE.Mesh[];
  edgeLines: THREE.LineSegments | null;
  buckets: CompactableBucket[];
  edgeBucket: CompactableBucket | null;
  partRecords: PartPickRecord[];
  bones: KinematicBoneBinding[];
  boneBearingParts: CadPart[];
  glows: DynamicGlowBinding[];
  geometries: THREE.BufferGeometry[];
  syncMaterials: (matRegistry: MaterialLutRegistry) => void;
  applyCompactedVisibility: (
    orderedPartSlots: Int32Array,
    partCount: number,
    partHash: number,
    edgePartSlots: Int32Array,
    edgePartCount: number,
    edgeHash: number,
    isXray: boolean,
    highlightSlotA: number,
    highlightSlotB: number,
    straddlePartSlots?: Int32Array,
    straddlePartCount?: number,
    straddleHash?: number,
    straddleEdgeSlots?: Int32Array,
    straddleEdgeCount?: number,
    straddleEdgeHash?: number
  ) => void;
  setXrayActive: (active: boolean) => void;
  releaseSectionStraddle: () => void;
}

export interface UnifiedMacroBatch extends MegaBatchChunk {
  opaqueMeshesForOracle: THREE.Mesh[];
  transparentPartSlots: number[];
  resetFullRangeForOracle: () => void;
  setHidden: () => void;
}

const _relMatrix = new THREE.Matrix4();
const _invSpaceWorld = new THREE.Matrix4();
const _instMatrix = new THREE.Matrix4();
const _normalMatrix = new THREE.Matrix3();
const _v3 = new THREE.Vector3();
const _n3 = new THREE.Vector3();

function findOwningBone(obj: THREE.Object3D, partGroup: THREE.Object3D): THREE.Object3D | null {
  let cur: THREE.Object3D | null = obj;
  while (cur && cur !== partGroup) {
    if (cur.userData && cur.userData.kinematicBone === true) {
      return cur;
    }
    cur = cur.parent;
  }
  return null;
}

function markAncestorsKept(
  node: THREE.Object3D,
  partGroup: THREE.Object3D,
  keepSet: Set<THREE.Object3D>
): void {
  let cur: THREE.Object3D | null = node;
  while (cur) {
    keepSet.add(cur);
    if (cur === partGroup) break;
    cur = cur.parent;
  }
}

function pruneUnkeptNodes(node: THREE.Object3D, keepSet: Set<THREE.Object3D>): void {
  for (let i = node.children.length - 1; i >= 0; i--) {
    const ch = node.children[i];
    pruneUnkeptNodes(ch, keepSet);
    if (!keepSet.has(ch)) {
      ch.removeFromParent();
    }
  }
}

function extractTransformedGeometry(
  geo: THREE.BufferGeometry,
  relMatrix: THREE.Matrix4,
  rangeStart = 0,
  rangeCount = -1
): {
  positions: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  triCount: number;
  localBox: THREE.Box3;
} | null {
  const posAttr = geo.getAttribute('position');
  if (!posAttr || posAttr.count < 3) return null;

  let normAttr = geo.getAttribute('normal');
  if (!normAttr) {
    geo.computeVertexNormals();
    normAttr = geo.getAttribute('normal');
  }
  const uvAttr = geo.getAttribute('uv');
  const idx = geo.getIndex();
  const totalCount = idx ? idx.count : posAttr.count;
  const start = Math.max(0, rangeStart);
  const end = rangeCount >= 0 ? Math.min(totalCount, start + rangeCount) : totalCount;
  const triCount = Math.floor((end - start) / 3);
  if (triCount <= 0) return null;

  const vertTotal = triCount * 3;
  const positions = new Float32Array(vertTotal * 3);
  const normals = new Float32Array(vertTotal * 3);
  const uvs = new Float32Array(vertTotal * 2);

  const flipWinding = relMatrix.determinant() < 0;
  _normalMatrix.getNormalMatrix(relMatrix);

  const localBox = new THREE.Box3();
  const posArr = posAttr.array as Float32Array;
  const posStride = posAttr.itemSize;
  const normArr = normAttr.array as Float32Array;
  const normStride = normAttr.itemSize;
  const uvArr = uvAttr ? (uvAttr.array as Float32Array) : null;
  const uvStride = uvAttr ? uvAttr.itemSize : 2;
  const idxArr = idx ? idx.array : null;

  for (let t = 0; t < triCount; t++) {
    const srcB = start + t * 3;
    const dstB = t * 3;
    const raw0 = idxArr ? idxArr[srcB] : srcB;
    const raw1 = idxArr ? idxArr[srcB + (flipWinding ? 2 : 1)] : srcB + (flipWinding ? 2 : 1);
    const raw2 = idxArr ? idxArr[srcB + (flipWinding ? 1 : 2)] : srcB + (flipWinding ? 1 : 2);
    const raws = [raw0, raw1, raw2];

    for (let k = 0; k < 3; k++) {
      const r = raws[k];
      const oP = r * posStride;
      _v3.set(posArr[oP], posArr[oP + 1], posArr[oP + 2]).applyMatrix4(relMatrix);
      localBox.expandByPoint(_v3);

      const d3 = (dstB + k) * 3;
      positions[d3] = _v3.x;
      positions[d3 + 1] = _v3.y;
      positions[d3 + 2] = _v3.z;

      const oN = r * normStride;
      _n3.set(normArr[oN], normArr[oN + 1], normArr[oN + 2]).applyMatrix3(_normalMatrix).normalize();
      if (flipWinding) _n3.negate();
      normals[d3] = _n3.x;
      normals[d3 + 1] = _n3.y;
      normals[d3 + 2] = _n3.z;

      const d2 = (dstB + k) * 2;
      if (uvArr) {
        const oU = r * uvStride;
        uvs[d2] = uvArr[oU];
        uvs[d2 + 1] = uvArr[oU + 1];
      }
    }
  }

  return { positions, normals, uvs, triCount, localBox };
}

function buildCompactBucketPagesWithSpans(
  entries: RawBucketEntry[],
  pickRecordByPartId: Map<string, PartPickRecord>,
  omitUv = false
): Array<{
  geometry: THREE.BufferGeometry;
  masterIndices: Uint16Array;
  spansByPartSlot: Map<number, IndexSpan[]>;
}> {
  if (entries.length === 0) return [];

  const pages = buildCompactWeldedPagesFromEntries(entries, omitUv);
  const results: Array<{
    geometry: THREE.BufferGeometry;
    masterIndices: Uint16Array;
    spansByPartSlot: Map<number, IndexSpan[]>;
  }> = [];

  for (let pi = 0; pi < pages.length; pi++) {
    const page = pages[pi];
    const spansByPartSlot = new Map<number, IndexSpan[]>();
    const posInt16 = page.interleavedInt16;
    const masterIndices = page.masterIndices;

    for (let si = 0; si < page.entrySpans.length; si++) {
      const es = page.entrySpans[si];
      const e = entries[es.entryIndex];
      const vStart = es.indexStart;
      const vCount = es.indexCount;

      let list = spansByPartSlot.get(e.partSlot);
      if (!list) {
        list = [{ start: vStart, count: vCount }];
        spansByPartSlot.set(e.partSlot, list);
      } else {
        const prev = list[list.length - 1];
        if (prev.start + prev.count === vStart) {
          prev.count += vCount;
        } else {
          list.push({ start: vStart, count: vCount });
        }
      }

      if (e.matId !== 0) {
        const rec = pickRecordByPartId.get(e.partId);
        if (rec) {
          if (e.boneObj) {
            const localSphere = new THREE.Sphere();
            e.localBox.getBoundingSphere(localSphere);
            rec.boneSlices.push({
              boneObj: e.boneObj,
              boneSlot: e.slot,
              localBox: e.localBox,
              localSphere,
              posInt16,
              masterIndices,
              indexStart: vStart,
              indexCount: vCount,
            });
          } else {
            const lb = e.localBox;
            const slices = rec.slices;
            const prevSlice = slices.length > 0 ? slices[slices.length - 1] : null;
            if (
              prevSlice &&
              vCount <= 96 &&
              prevSlice.indexCount < 2400 &&
              prevSlice.posInt16 === posInt16 &&
              prevSlice.masterIndices === masterIndices &&
              prevSlice.indexStart + prevSlice.indexCount === vStart
            ) {
              prevSlice.indexCount += vCount;
              if (lb.min.x < prevSlice.minX) prevSlice.minX = lb.min.x;
              if (lb.min.y < prevSlice.minY) prevSlice.minY = lb.min.y;
              if (lb.min.z < prevSlice.minZ) prevSlice.minZ = lb.min.z;
              if (lb.max.x > prevSlice.maxX) prevSlice.maxX = lb.max.x;
              if (lb.max.y > prevSlice.maxY) prevSlice.maxY = lb.max.y;
              if (lb.max.z > prevSlice.maxZ) prevSlice.maxZ = lb.max.z;
            } else {
              slices.push({
                posInt16,
                masterIndices,
                indexStart: vStart,
                indexCount: vCount,
                minX: lb.min.x,
                minY: lb.min.y,
                minZ: lb.min.z,
                maxX: lb.max.x,
                maxY: lb.max.y,
                maxZ: lb.max.z,
              });
            }
          }
        }
      }
    }

    results.push({
      geometry: page.geometry,
      masterIndices,
      spansByPartSlot,
    });
  }

  entries.length = 0;
  return results;
}

interface BucketCollector {
  opaqueSolidFront: RawBucketEntry[];
  opaqueTexFront: RawBucketEntry[];
  opaqueDouble: RawBucketEntry[];
  glassFront: RawBucketEntry[];
  glassDouble: RawBucketEntry[];
  edgeChunks: RawEdgeChunk[];
  partRecords: PartPickRecord[];
  pickRecordByPartId: Map<string, PartPickRecord>;
  bones: KinematicBoneBinding[];
  boneBearingParts: CadPart[];
  glows: DynamicGlowBinding[];
  transparentPartSlots: number[];
}

function createCollector(): BucketCollector {
  return {
    opaqueSolidFront: [],
    opaqueTexFront: [],
    opaqueDouble: [],
    glassFront: [],
    glassDouble: [],
    edgeChunks: [],
    partRecords: [],
    pickRecordByPartId: new Map(),
    bones: [],
    boneBearingParts: [],
    glows: [],
    transparentPartSlots: [],
  };
}

const NON_ANALYTICAL_PART_IDS = new Set<string>([
  'lens-focus-a-front',
  'lens-focus-group-a',
  'lens-focus-a-rear',
  'lens-focus-a-eccentric',
  'lens-focus-b-front',
  'lens-focus-group-b',
  'lens-focus-b-eccentric',
  'evf-lens-ed-doublet',
]);

function collectPartsIntoBuckets(
  parts: CadPart[],
  partStateBuf: PartStateTextureBuffer,
  matRegistry: MaterialLutRegistry,
  collector: BucketCollector,
  sagittaTol: number
): void {
  for (const part of parts) {
    const partSlot = partStateBuf.allocateSlot(part.id);
    part.group.userData.partSlot = partSlot;
    part.group.updateMatrixWorld(true);

    const localBox = new THREE.Box3();
    const partBoneMap = new Map<THREE.Object3D, number>();
    const partBoneSlots: number[] = [];
    let partHasGlow = false;

    const getOrRegisterBoneSlot = (boneObj: THREE.Object3D): number => {
      const existing = partBoneMap.get(boneObj);
      if (existing !== undefined) return existing;
      const bSlot = partStateBuf.allocateSlot(`${part.id}#bone#${boneObj.uuid}`, partSlot);
      partBoneMap.set(boneObj, bSlot);
      partBoneSlots.push(bSlot);
      collector.bones.push({
        boneObj,
        boneSlot: bSlot,
        parentPart: part,
        parentSlot: partSlot,
      });
      return bSlot;
    };

    const rec: PartPickRecord = {
      part,
      slot: partSlot,
      localBox,
      localSphere: new THREE.Sphere(),
      slices: [],
      boneSlices: [],
      boneSlots: partBoneSlots,
      hasTransparent: false,
      canUseAnalyticalExplode: false,
    };
    collector.partRecords.push(rec);
    collector.pickRecordByPartId.set(part.id, rec);

    // 1. Legacy explicit edgeLines support (usually empty because attachCadEdges is O(1) metadata!)
    for (const line of part.edgeLines) {
      const posAttr = line.geometry.getAttribute('position');
      if (posAttr && posAttr.count >= 2) {
        const ownerBone = findOwningBone(line, part.group);
        const targetSlot = ownerBone ? getOrRegisterBoneSlot(ownerBone) : partSlot;
        const spaceObj = ownerBone ?? part.group;
        _invSpaceWorld.copy(spaceObj.matrixWorld).invert();
        _relMatrix.multiplyMatrices(_invSpaceWorld, line.matrixWorld);

        const count = posAttr.count;
        const posArr = new Float32Array(count * 3);
        const baseOp16 = Math.max(
          0,
          Math.min(65535, Math.round(((line.userData.baseOpacity as number) ?? 0.2) * 65535))
        );
        for (let i = 0; i < count; i++) {
          _v3.fromBufferAttribute(posAttr, i).applyMatrix4(_relMatrix);
          posArr[i * 3] = _v3.x;
          posArr[i * 3 + 1] = _v3.y;
          posArr[i * 3 + 2] = _v3.z;
        }
        collector.edgeChunks.push({
          partId: part.id,
          slot: targetSlot,
          positions: posArr,
          baseOp16,
        });
      }
      line.removeFromParent();
      line.geometry.dispose();
      if (line.material instanceof THREE.Material) line.material.dispose();
    }
    part.edgeLines = [];

    // 2. Pack ALL meshes (rigid, bone, multi-material, dynamicGlow) + Post-Retessellation CAD Edges!
    const bakedMeshes: THREE.Mesh[] = [];

    for (const mesh of part.interactiveMeshes) {
      if (mesh.userData.noMerge || !mesh.visible || !mesh.geometry) continue;

      const ownerBone = findOwningBone(mesh, part.group);
      const isGlow = mesh.userData.dynamicGlow === true;

      if (isGlow) {
        partHasGlow = true;
        rec.hasTransparent = true;
        const glowSlot = partStateBuf.allocateSlot(`${part.id}#glow#${mesh.uuid}`, partSlot);
        const spaceObj = ownerBone ?? part.group;
        _invSpaceWorld.copy(spaceObj.matrixWorld).invert();
        _relMatrix.multiplyMatrices(_invSpaceWorld, mesh.matrixWorld);
        const glowGeo = retessellatePrimitiveSagitta(mesh.geometry, sagittaTol);
        const ext = extractTransformedGeometry(glowGeo, _relMatrix);
        if (glowGeo !== mesh.geometry && !glowGeo.userData.__pooled) glowGeo.dispose();
        if (ext) {
          collector.glassDouble.push({
            partId: part.id,
            partSlot,
            slot: glowSlot,
            matId: matRegistry.dynamicGlowMatId,
            useUv: false,
            boneObj: ownerBone,
            localBox: ext.localBox,
            positions: ext.positions,
            normals: ext.normals,
            uvs: ext.uvs,
            triCount: ext.triCount,
          });
          collector.glows.push({
            glowMesh: mesh,
            glowSlot,
            parentPart: part,
            ownerBone,
          });
        }
        bakedMeshes.push(mesh);
        continue;
      }

      const targetSlot = ownerBone ? getOrRegisterBoneSlot(ownerBone) : partSlot;
      const spaceObj = ownerBone ?? part.group;
      _invSpaceWorld.copy(spaceObj.matrixWorld).invert();

      const hasGroups = Array.isArray(mesh.material) && Boolean(mesh.geometry.groups?.length);
      const retessGeo = hasGroups
        ? mesh.geometry
        : retessellatePrimitiveSagitta(mesh.geometry, sagittaTol);
      const isOpen = isGeometryLikelyOpen(retessGeo);

      // OMEGA-8A: Extract CAD technical edges ONCE per unique retessellated BufferGeometry!
      if (!(mesh as THREE.InstancedMesh).isInstancedMesh && typeof mesh.userData.__cadEdgeAngle === 'number') {
        const localEdges = extractPooledCadEdgesArray(
          retessGeo,
          mesh.userData.__cadEdgeAngle as number,
          (mesh.userData.__cadEdgeMinLen as number) ?? 0.90
        );
        if (localEdges.length >= 6) {
          _relMatrix.multiplyMatrices(_invSpaceWorld, mesh.matrixWorld);
          const me = _relMatrix.elements;
          const m0 = me[0], m1 = me[1], m2 = me[2];
          const m4 = me[4], m5 = me[5], m6 = me[6];
          const m8 = me[8], m9 = me[9], m10 = me[10];
          const m12 = me[12], m13 = me[13], m14 = me[14];
          const transformedEdges = new Float32Array(localEdges.length);
          for (let ei = 0; ei < localEdges.length; ei += 3) {
            const lx = localEdges[ei], ly = localEdges[ei + 1], lz = localEdges[ei + 2];
            transformedEdges[ei] = m0 * lx + m4 * ly + m8 * lz + m12;
            transformedEdges[ei + 1] = m1 * lx + m5 * ly + m9 * lz + m13;
            transformedEdges[ei + 2] = m2 * lx + m6 * ly + m10 * lz + m14;
          }
          const baseOp16 = Math.max(
            0,
            Math.min(65535, Math.round(((mesh.userData.__cadEdgeOp as number) ?? 0.2) * 65535))
          );
          collector.edgeChunks.push({
            partId: part.id,
            slot: targetSlot,
            positions: transformedEdges,
            baseOp16,
          });
        }
      }

      const bakeSubMeshWithMaterial = (
        subMat: THREE.Material,
        rangeStart: number,
        rangeCount: number
      ) => {
        const { matId, isTransparent, useUv, hasExtra } = matRegistry.registerMaterial(subMat);
        if (isTransparent) rec.hasTransparent = true;
        const forceDouble = isOpen || subMat.side === THREE.DoubleSide;

        const pushEntry = (
          extracted: NonNullable<ReturnType<typeof extractTransformedGeometry>>
        ) => {
          if (!ownerBone) {
            localBox.union(extracted.localBox);
          }
          const entry: RawBucketEntry = {
            partId: part.id,
            partSlot,
            slot: targetSlot,
            matId,
            useUv,
            boneObj: ownerBone,
            localBox: extracted.localBox,
            positions: extracted.positions,
            normals: extracted.normals,
            uvs: extracted.uvs,
            triCount: extracted.triCount,
          };
          if (isTransparent) {
            if (forceDouble) {
              collector.glassDouble.push(entry);
            } else {
              collector.glassFront.push(entry);
            }
          } else if (forceDouble) {
            collector.opaqueDouble.push(entry);
          } else if (hasExtra) {
            collector.opaqueTexFront.push(entry);
          } else {
            collector.opaqueSolidFront.push(entry);
          }
        };

        if ((mesh as THREE.InstancedMesh).isInstancedMesh) {
          const inst = mesh as THREE.InstancedMesh;
          const count = inst.count;
          const baseRel = new THREE.Matrix4().multiplyMatrices(_invSpaceWorld, inst.matrixWorld);
          for (let i = 0; i < count; i++) {
            inst.getMatrixAt(i, _instMatrix);
            _relMatrix.multiplyMatrices(baseRel, _instMatrix);
            const ext = extractTransformedGeometry(retessGeo, _relMatrix, rangeStart, rangeCount);
            if (ext) pushEntry(ext);
          }
        } else {
          _relMatrix.multiplyMatrices(_invSpaceWorld, mesh.matrixWorld);
          const ext = extractTransformedGeometry(retessGeo, _relMatrix, rangeStart, rangeCount);
          if (ext) pushEntry(ext);
        }
      };

      if (Array.isArray(mesh.material)) {
        const groups = mesh.geometry.groups;
        if (groups && groups.length > 0) {
          for (let gi = 0; gi < groups.length; gi++) {
            const grp = groups[gi];
            const subMat = mesh.material[grp.materialIndex ?? 0] ?? mesh.material[0];
            if (subMat) bakeSubMeshWithMaterial(subMat, grp.start, grp.count);
          }
        } else if (mesh.material[0]) {
          bakeSubMeshWithMaterial(mesh.material[0], 0, -1);
        }
      } else {
        bakeSubMeshWithMaterial(mesh.material, 0, -1);
      }

      if (retessGeo !== mesh.geometry && !retessGeo.userData.__pooled) {
        retessGeo.dispose();
      }

      bakedMeshes.push(mesh);
    }

    if (rec.hasTransparent) {
      collector.transparentPartSlots.push(partSlot);
    }

    rec.canUseAnalyticalExplode =
      partBoneSlots.length === 0 &&
      !partHasGlow &&
      !part.ibisMovable &&
      !part.ultrasonicElement &&
      part.subsystem !== 'lcd' &&
      !NON_ANALYTICAL_PART_IDS.has(part.id);

    // 3. Prune baked meshes & detach part.groups from scene graph
    const keepNodes = new Set<THREE.Object3D>([part.group]);
    for (const boneObj of partBoneMap.keys()) {
      markAncestorsKept(boneObj, part.group, keepNodes);
    }

    for (const mesh of bakedMeshes) {
      const oldGeo = mesh.geometry;
      if (keepNodes.has(mesh)) {
        mesh.visible = false;
        mesh.geometry = EMPTY_GEOMETRY;
      } else {
        mesh.removeFromParent();
      }
      if (oldGeo && !oldGeo.userData.__pooled) {
        oldGeo.dispose();
      }
    }

    pruneUnkeptNodes(part.group, keepNodes);
    part.interactiveMeshes = [];
    part.group.userData.boneSlots = partBoneSlots;

    if (partBoneSlots.length > 0) {
      collector.boneBearingParts.push(part);
    }

    part.group.removeFromParent();
    if (partBoneSlots.length === 0) {
      part.group.matrixAutoUpdate = false;
    }

    if (localBox.isEmpty() && partBoneSlots.length === 0) {
      localBox.set(new THREE.Vector3(-0.5, -0.5, -0.5), new THREE.Vector3(0.5, 0.5, 0.5));
    }
    if (!localBox.isEmpty()) {
      localBox.getBoundingSphere(rec.localSphere);
    }
  }
}

function createSharedVboGeometry(srcGeo: THREE.BufferGeometry): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  for (const key of Object.keys(srcGeo.attributes)) {
    g.setAttribute(key, srcGeo.attributes[key]);
  }
  g.boundingBox = srcGeo.boundingBox;
  g.boundingSphere = srcGeo.boundingSphere;
  return g;
}

function finalizeCollectorIntoChunk(
  collector: BucketCollector,
  matRegistry: MaterialLutRegistry
): {
  chunk: MegaBatchChunk;
  opaqueMeshesForOracle: THREE.Mesh[];
  transparentPartSlots: number[];
} {
  const chunkGroup = new THREE.Group();
  chunkGroup.matrixAutoUpdate = false;
  const solidMeshes: THREE.Mesh[] = [];
  const xrayMeshes: THREE.Mesh[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const buckets: CompactableBucket[] = [];
  const opaqueMeshesForOracle: THREE.Mesh[] = [];

  const addMegaBucket = (
    kind: 'opaqueSolidFront' | 'opaqueTexFront' | 'opaqueDouble' | 'glassFront' | 'glassDouble',
    entries: RawBucketEntry[],
    renderOrder = 0
  ) => {
    const omitUv = kind === 'opaqueSolidFront';
    const builtPages = buildCompactBucketPagesWithSpans(
      entries,
      collector.pickRecordByPartId,
      omitUv
    );

    for (let pi = 0; pi < builtPages.length; pi++) {
      const { geometry, masterIndices, spansByPartSlot } = builtPages[pi];
      geometries.push(geometry);

      const solidMat = matRegistry.getUnclippedBucketMaterial(kind);
      const mesh = new THREE.Mesh(geometry, solidMat);
      mesh.frustumCulled = false;
      mesh.matrixAutoUpdate = false;
      mesh.renderOrder = renderOrder;
      chunkGroup.add(mesh);
      solidMeshes.push(mesh);

      if (kind === 'opaqueSolidFront' || kind === 'opaqueTexFront' || kind === 'opaqueDouble') {
        opaqueMeshesForOracle.push(mesh);
      }

      const xrayMesh = new THREE.Mesh(geometry, matRegistry.getActiveXrayMaterial());
      xrayMesh.frustumCulled = false;
      xrayMesh.matrixAutoUpdate = false;
      xrayMesh.visible = false;
      xrayMesh.renderOrder = 1;
      chunkGroup.add(xrayMesh);
      xrayMeshes.push(xrayMesh);

      const comp = makeBucketCompactor(
        kind,
        geometry,
        masterIndices,
        spansByPartSlot,
        mesh,
        xrayMesh,
        null
      );
      buckets.push(comp);
    }
  };

  addMegaBucket('opaqueSolidFront', collector.opaqueSolidFront, 0);
  addMegaBucket('opaqueTexFront', collector.opaqueTexFront, 0);
  addMegaBucket('opaqueDouble', collector.opaqueDouble, 0);
  addMegaBucket('glassFront', collector.glassFront, 1);
  addMegaBucket('glassDouble', collector.glassDouble, 1);

  let edgeLines: THREE.LineSegments | null = null;
  let edgeBucket: CompactableBucket | null = null;
  const indexedEdges = buildIndexedEdgeGeometry(collector.edgeChunks);
  collector.edgeChunks.length = 0;

  if (indexedEdges) {
    const { geometry: edgeGeo, masterIndices, slicesByPartId } = indexedEdges;
    geometries.push(edgeGeo);

    const edgeSpansBySlot = new Map<number, IndexSpan[]>();
    for (const [partId, spans] of slicesByPartId.entries()) {
      const rec = collector.pickRecordByPartId.get(partId);
      if (rec) edgeSpansBySlot.set(rec.slot, spans);
    }

    edgeLines = new THREE.LineSegments(edgeGeo, matRegistry.getUnclippedEdgeMaterial());
    edgeLines.frustumCulled = false;
    edgeLines.matrixAutoUpdate = false;
    edgeLines.renderOrder = 2;
    chunkGroup.add(edgeLines);

    edgeBucket = makeBucketCompactor(
      'edge',
      edgeGeo,
      masterIndices,
      edgeSpansBySlot,
      null,
      null,
      edgeLines
    );
  }

  let xrayModeActive = false;

  const ensureStraddleMesh = (b: CompactableBucket): THREE.Mesh => {
    if (b.straddleMesh) return b.straddleMesh;
    const sGeo = createSharedVboGeometry(b.geometry);
    const sRing = createElasticIboRing(b.masterIndices, false);
    sGeo.setDrawRange(0, 0);
    geometries.push(sGeo);

    const isGlass = b.kind === 'glassFront' || b.kind === 'glassDouble';
    const sMat = matRegistry.getClippedBucketMaterial(b.kind as Exclude<CompactableBucket['kind'], 'edge'>);
    const sMesh = new THREE.Mesh(sGeo, sMat);
    sMesh.frustumCulled = false;
    sMesh.matrixAutoUpdate = false;
    sMesh.renderOrder = isGlass ? 1.1 : 0.2;
    sMesh.visible = false;
    chunkGroup.add(sMesh);

    b.straddleGeo = sGeo;
    b.straddleRing = sRing;
    b.straddleMesh = sMesh;
    return sMesh;
  };

  const ensureStraddleEdgeMesh = (b: CompactableBucket): THREE.LineSegments => {
    if (b.straddleEdgeMesh) return b.straddleEdgeMesh;
    const sGeo = createSharedVboGeometry(b.geometry);
    const sRing = createElasticIboRing(b.masterIndices, false);
    sGeo.setDrawRange(0, 0);
    geometries.push(sGeo);

    const sLines = new THREE.LineSegments(sGeo, matRegistry.getClippedEdgeMaterial());
    sLines.frustumCulled = false;
    sLines.matrixAutoUpdate = false;
    sLines.renderOrder = 2.1;
    sLines.visible = false;
    chunkGroup.add(sLines);

    b.straddleGeo = sGeo;
    b.straddleRing = sRing;
    b.straddleEdgeMesh = sLines;
    return sLines;
  };

  const ensureXrayHighlightMesh = (b: CompactableBucket): THREE.Mesh => {
    if (b.xrayHighlightMesh) return b.xrayHighlightMesh;
    const hGeo = createSharedVboGeometry(b.geometry);
    const maxCap = Math.min(b.masterIndices.length, 24576);
    const buf =
      b.masterIndices instanceof Uint16Array
        ? new Uint16Array(maxCap)
        : new Uint32Array(maxCap);
    const attr = new THREE.BufferAttribute(buf, 1);
    attr.setUsage(THREE.DynamicDrawUsage);
    hGeo.setIndex(attr);
    hGeo.setDrawRange(0, 0);
    geometries.push(hGeo);

    const isGlass = b.kind === 'glassFront' || b.kind === 'glassDouble';
    const hMat = matRegistry.getActiveBucketMaterial(b.kind as Exclude<CompactableBucket['kind'], 'edge'>);
    const hMesh = new THREE.Mesh(hGeo, hMat);
    hMesh.frustumCulled = false;
    hMesh.matrixAutoUpdate = false;
    // OMEGA-7: Opaque highlight draws BEFORE X-Ray ghosts (`renderOrder = 0` vs `1`) for Hardware Early-Z occlusion!
    hMesh.renderOrder = isGlass ? 1.5 : 0;
    hMesh.visible = false;
    chunkGroup.add(hMesh);

    b.xrayHighlightGeo = hGeo;
    b.xrayHighlightAttr = attr;
    b.xrayHighlightBuf = buf;
    b.xrayHighlightMesh = hMesh;
    return hMesh;
  };

  const syncMaterials = (reg: MaterialLutRegistry) => {
    const xrayMat = reg.getActiveXrayMaterial();
    for (let i = 0; i < buckets.length; i++) {
      const b = buckets[i];
      if (b.kind === 'edge') continue;
      // OMEGA-6: `solidMesh` ALWAYS keeps Zero-Discard FrontSide Early-Z; `straddleMesh` uses Clipped DoubleSide!
      if (b.solidMesh) b.solidMesh.material = reg.getUnclippedBucketMaterial(b.kind);
      if (b.straddleMesh) b.straddleMesh.material = reg.getClippedBucketMaterial(b.kind);
      if (b.xrayHighlightMesh) b.xrayHighlightMesh.material = reg.getActiveBucketMaterial(b.kind);
      if (b.xrayMesh) b.xrayMesh.material = xrayMat;
    }
    if (edgeLines) {
      edgeLines.material = reg.getUnclippedEdgeMaterial();
    }
    if (edgeBucket?.straddleEdgeMesh) {
      edgeBucket.straddleEdgeMesh.material = reg.getClippedEdgeMaterial();
    }
  };

  const applyCompactedVisibility = (
    orderedPartSlots: Int32Array,
    partCount: number,
    partHash: number,
    edgePartSlots: Int32Array,
    edgePartCount: number,
    edgeHash: number,
    isXray: boolean,
    highlightSlotA: number,
    highlightSlotB: number,
    straddlePartSlots?: Int32Array,
    straddlePartCount = 0,
    straddleHash = 0,
    straddleEdgeSlots?: Int32Array,
    straddleEdgeCount = 0,
    straddleEdgeHash = 0
  ) => {
    xrayModeActive = isXray;
    const hasHighlight = highlightSlotA >= 0 || highlightSlotB >= 0;
    const hlHash = ((highlightSlotA + 2) * 2654435761) ^ ((highlightSlotB + 2) * 2246822519);

    for (let i = 0; i < buckets.length; i++) {
      const b = buckets[i];
      const count = compactRingForSlots(
        b.geometry,
        b.mainRing,
        b.masterIndices,
        b.spansByPartSlot,
        orderedPartSlots,
        partCount,
        partHash
      );
      const hasDraw = count > 0;

      if (isXray) {
        if (b.solidMesh) b.solidMesh.visible = false;
        if (b.straddleMesh) b.straddleMesh.visible = false;
        if (b.xrayMesh) b.xrayMesh.visible = hasDraw;

        if (hasHighlight && hasDraw) {
          const hasA = highlightSlotA >= 0 && b.spansByPartSlot.has(highlightSlotA);
          const hasB =
            highlightSlotB >= 0 &&
            highlightSlotB !== highlightSlotA &&
            b.spansByPartSlot.has(highlightSlotB);
          if (hasA || hasB) {
            const hMesh = ensureXrayHighlightMesh(b);
            if (b.lastHighlightHash !== hlHash) {
              b.lastHighlightHash = hlHash;
              const master = b.masterIndices;
              let cursor = 0;
              const copySlot = (slot: number) => {
                const spans = b.spansByPartSlot.get(slot);
                if (!spans) return;
                for (let si = 0; si < spans.length; si++) {
                  const sp = spans[si];
                  if (cursor + sp.count > b.xrayHighlightBuf!.length) {
                    const nextBuf =
                      master instanceof Uint16Array
                        ? new Uint16Array(cursor + sp.count + 4096)
                        : new Uint32Array(cursor + sp.count + 4096);
                    nextBuf.set(b.xrayHighlightBuf!.subarray(0, cursor));
                    b.xrayHighlightBuf = nextBuf;
                    b.xrayHighlightAttr = new THREE.BufferAttribute(nextBuf, 1);
                    b.xrayHighlightAttr.setUsage(THREE.DynamicDrawUsage);
                    b.xrayHighlightGeo!.setIndex(b.xrayHighlightAttr);
                  }
                  b.xrayHighlightBuf!.set(master.subarray(sp.start, sp.start + sp.count), cursor);
                  cursor += sp.count;
                }
              };
              if (hasA) copySlot(highlightSlotA);
              if (hasB) copySlot(highlightSlotB);
              b.xrayHighlightGeo!.setDrawRange(0, cursor);
              if (cursor > 0) {
                b.xrayHighlightAttr!.clearUpdateRanges();
                b.xrayHighlightAttr!.addUpdateRange(0, cursor);
                b.xrayHighlightAttr!.needsUpdate = true;
              }
            }
            hMesh.visible = b.xrayHighlightGeo!.drawRange.count > 0;
          } else if (b.xrayHighlightMesh) {
            b.xrayHighlightMesh.visible = false;
          }
        } else if (b.xrayHighlightMesh) {
          b.xrayHighlightMesh.visible = false;
        }
      } else {
        if (b.solidMesh) b.solidMesh.visible = hasDraw;
        if (b.xrayMesh) b.xrayMesh.visible = false;
        if (b.xrayHighlightMesh) b.xrayHighlightMesh.visible = false;

        if (straddlePartCount > 0 && straddlePartSlots) {
          const sMesh = ensureStraddleMesh(b);
          const sCount = compactRingForSlots(
            b.straddleGeo!,
            b.straddleRing!,
            b.masterIndices,
            b.spansByPartSlot,
            straddlePartSlots,
            straddlePartCount,
            straddleHash
          );
          sMesh.visible = sCount > 0;
        } else if (b.straddleMesh) {
          b.straddleMesh.visible = false;
        }
      }
    }

    if (edgeBucket && edgeLines) {
      const eCount = compactRingForSlots(
        edgeBucket.geometry,
        edgeBucket.mainRing,
        edgeBucket.masterIndices,
        edgeBucket.spansByPartSlot,
        edgePartSlots,
        edgePartCount,
        edgeHash
      );
      edgeLines.visible = eCount > 0;

      if (!isXray && straddleEdgeCount > 0 && straddleEdgeSlots) {
        const sLines = ensureStraddleEdgeMesh(edgeBucket);
        const seCount = compactRingForSlots(
          edgeBucket.straddleGeo!,
          edgeBucket.straddleRing!,
          edgeBucket.masterIndices,
          edgeBucket.spansByPartSlot,
          straddleEdgeSlots,
          straddleEdgeCount,
          straddleEdgeHash
        );
        sLines.visible = seCount > 0;
      } else if (edgeBucket.straddleEdgeMesh) {
        edgeBucket.straddleEdgeMesh.visible = false;
      }
    }
  };

  const chunk: MegaBatchChunk = {
    group: chunkGroup,
    xrayMeshes,
    solidMeshes,
    edgeLines,
    buckets,
    edgeBucket,
    partRecords: collector.partRecords,
    bones: collector.bones,
    boneBearingParts: collector.boneBearingParts,
    glows: collector.glows,
    geometries,
    syncMaterials,
    applyCompactedVisibility,
    setXrayActive: (active: boolean) => {
      xrayModeActive = active;
      for (let i = 0; i < buckets.length; i++) {
        const b = buckets[i];
        const hasDraw = b.mainRing.lastCount > 0;
        if (b.xrayMesh) b.xrayMesh.visible = xrayModeActive && hasDraw;
        if (b.solidMesh) b.solidMesh.visible = !xrayModeActive && hasDraw;
        if (xrayModeActive && b.straddleMesh) b.straddleMesh.visible = false;
        if (!xrayModeActive && b.xrayHighlightMesh) b.xrayHighlightMesh.visible = false;
      }
    },
    releaseSectionStraddle: () => {
      const releaseBucket = (b: CompactableBucket) => {
        if (b.straddleMesh) {
          b.straddleMesh.removeFromParent();
          b.straddleMesh = null;
        }
        if (b.straddleEdgeMesh) {
          b.straddleEdgeMesh.removeFromParent();
          b.straddleEdgeMesh = null;
        }
        if (b.straddleGeo) {
          const gi = geometries.indexOf(b.straddleGeo);
          if (gi >= 0) geometries.splice(gi, 1);
          b.straddleGeo.setIndex(null);
          for (const k of Object.keys(b.straddleGeo.attributes)) {
            b.straddleGeo.deleteAttribute(k);
          }
          b.straddleGeo.dispose();
          b.straddleGeo = null;
        }
        b.straddleRing = null;
      };
      for (let i = 0; i < buckets.length; i++) releaseBucket(buckets[i]);
      if (edgeBucket) releaseBucket(edgeBucket);
    },
  };

  return {
    chunk,
    opaqueMeshesForOracle,
    transparentPartSlots: collector.transparentPartSlots,
  };
}

export function compileMegaBatchChunk(
  parts: CadPart[],
  partStateBuf: PartStateTextureBuffer,
  matRegistry: MaterialLutRegistry,
  _clippingPlanes: THREE.Plane[]
): MegaBatchChunk {
  const sagittaTol = GPU_PROFILE.isMobile ? 0.38 : 0.28;
  const collector = createCollector();
  collectPartsIntoBuckets(parts, partStateBuf, matRegistry, collector, sagittaTol);
  return finalizeCollectorIntoChunk(collector, matRegistry).chunk;
}

export function compileUnifiedMacroBatch(
  groupedParts: Record<MacroGroupKey, CadPart[]>,
  partStateBuf: PartStateTextureBuffer,
  matRegistry: MaterialLutRegistry
): UnifiedMacroBatch {
  const sagittaTol = GPU_PROFILE.isMobile ? 0.38 : 0.28;
  const collector = createCollector();

  for (const key of MACRO_GROUP_ORDER) {
    collectPartsIntoBuckets(groupedParts[key] ?? [], partStateBuf, matRegistry, collector, sagittaTol);
  }

  const { chunk, opaqueMeshesForOracle, transparentPartSlots } = finalizeCollectorIntoChunk(
    collector,
    matRegistry
  );

  const resetFullRangeForOracle = () => {
    chunk.group.visible = true;
    for (let i = 0; i < chunk.buckets.length; i++) {
      const b = chunk.buckets[i];
      if (b.mainRing.masterAttr) {
        b.geometry.setIndex(b.mainRing.masterAttr);
      }
      b.geometry.setDrawRange(0, b.masterIndices.length);
      b.mainRing.lastHash = -1;
      b.mainRing.lastCount = b.masterIndices.length;
      if (b.solidMesh) b.solidMesh.visible = true;
      if (b.straddleMesh) b.straddleMesh.visible = false;
    }
  };

  const setHidden = () => {
    chunk.group.visible = false;
  };

  return {
    ...chunk,
    opaqueMeshesForOracle,
    transparentPartSlots,
    resetFullRangeForOracle,
    setHidden,
  };
}

// =============================================================================
// 6. OMEGA-11: CACHED PART TLAS + QUANTIZED INT16 SCALAR BVH RAYCASTER
// =============================================================================

const _rayLocal = new THREE.Ray();
const _invQuat = new THREE.Quaternion();
const _invBoneMat = new THREE.Matrix4();
const _worldBox = new THREE.Box3();
const _boneWorldBox = new THREE.Box3();
const _hitPt = new THREE.Vector3();
const _boxHitPt = new THREE.Vector3();
const _worldHit = new THREE.Vector3();

const _partTlas = new ReusablePartTlas();
const _tlasActiveSlots = new Int32Array(MAX_PARTS_CAPACITY);
const _candSlots = new Int32Array(MAX_PARTS_CAPACITY);
const _candNearDists = new Float32Array(MAX_PARTS_CAPACITY);
const _recordBySlot = new Array<PartPickRecord | undefined>(MAX_PARTS_CAPACITY);
let _tlasValid = false;
let _tlasLastRecordCount = -1;

export function invalidateRaycastTlas(): void {
  _tlasValid = false;
}

function expandWorldBoxFromBoneSlice(bs: BoneGeometrySlice, out: THREE.Box3): void {
  const r = bs.localSphere.radius;
  _v3.copy(bs.localSphere.center).applyMatrix4(bs.boneObj.matrixWorld);
  _boneWorldBox.min.set(_v3.x - r, _v3.y - r, _v3.z - r);
  _boneWorldBox.max.set(_v3.x + r, _v3.y + r, _v3.z + r);
  out.union(_boneWorldBox);
}

function rebuildPartTlas(
  records: ReadonlyArray<PartPickRecord>,
  isPartActiveAndVisible: (part: CadPart) => boolean
): void {
  const wb = _partTlas.partWorldBounds;
  let activeCount = 0;

  for (let i = 0; i < records.length; i++) {
    const rec = records[i];
    const part = rec.part;
    if (!part.group.visible || !isPartActiveAndVisible(part)) continue;

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    if (rec.slices.length > 0) {
      const p = part.group.position;
      const q = part.group.quaternion;
      if (q.x === 0 && q.y === 0 && q.z === 0) {
        minX = rec.localBox.min.x + p.x;
        minY = rec.localBox.min.y + p.y;
        minZ = rec.localBox.min.z + p.z;
        maxX = rec.localBox.max.x + p.x;
        maxY = rec.localBox.max.y + p.y;
        maxZ = rec.localBox.max.z + p.z;
      } else {
        const r = rec.localSphere.radius;
        _v3.copy(rec.localSphere.center).applyQuaternion(q).add(p);
        minX = _v3.x - r; minY = _v3.y - r; minZ = _v3.z - r;
        maxX = _v3.x + r; maxY = _v3.y + r; maxZ = _v3.z + r;
      }
    }

    if (rec.boneSlices.length > 0) {
      _worldBox.min.set(minX, minY, minZ);
      _worldBox.max.set(maxX, maxY, maxZ);
      for (let bi = 0; bi < rec.boneSlices.length; bi++) {
        expandWorldBoxFromBoneSlice(rec.boneSlices[bi], _worldBox);
      }
      minX = _worldBox.min.x; minY = _worldBox.min.y; minZ = _worldBox.min.z;
      maxX = _worldBox.max.x; maxY = _worldBox.max.y; maxZ = _worldBox.max.z;
    }

    if (minX <= maxX) {
      const s = rec.slot;
      const bo = s * 6;
      wb[bo] = minX;
      wb[bo + 1] = minY;
      wb[bo + 2] = minZ;
      wb[bo + 3] = maxX;
      wb[bo + 4] = maxY;
      wb[bo + 5] = maxZ;
      _recordBySlot[s] = rec;
      _tlasActiveSlots[activeCount++] = s;
    }
  }

  _partTlas.build(_tlasActiveSlots, activeCount);
  _tlasLastRecordCount = records.length;
  _tlasValid = true;
}

export function pickPartTwoPhase(
  raycaster: THREE.Raycaster,
  records: ReadonlyArray<PartPickRecord>,
  isPartActiveAndVisible: (part: CadPart) => boolean,
  clippingPlane: THREE.Plane | null
): string | null {
  if (!_tlasValid || _tlasLastRecordCount !== records.length) {
    rebuildPartTlas(records, isPartActiveAndVisible);
  }

  const ray = raycaster.ray;
  const ox = ray.origin.x, oy = ray.origin.y, oz = ray.origin.z;
  const dx = ray.direction.x, dy = ray.direction.y, dz = ray.direction.z;
  const invX = dx !== 0 ? 1 / dx : 1e30;
  const invY = dy !== 0 ? 1 / dy : 1e30;
  const invZ = dz !== 0 ? 1 / dz : 1e30;

  const candCount = _partTlas.queryRay(ox, oy, oz, invX, invY, invZ, _candSlots, _candNearDists);
  if (candCount === 0) return null;

  let closestDistSq = Infinity;
  let closestPartId: string | null = null;
  const fastRigidNoClip = !clippingPlane;

  for (let ci = 0; ci < candCount; ci++) {
    const nearD = _candNearDists[ci];
    if (nearD * nearD >= closestDistSq) break;

    const rec = _recordBySlot[_candSlots[ci]];
    if (!rec) continue;
    const part = rec.part;
    if (!part.group.visible || !isPartActiveAndVisible(part)) continue;

    if (rec.slices.length > 0) {
      const p = part.group.position;
      const q = part.group.quaternion;
      if (q.x === 0 && q.y === 0 && q.z === 0) {
        _rayLocal.origin.set(ox - p.x, oy - p.y, oz - p.z);
        _rayLocal.direction.set(dx, dy, dz);
      } else {
        _invQuat.copy(q).invert();
        _rayLocal.origin.copy(ray.origin).sub(p).applyQuaternion(_invQuat);
        _rayLocal.direction.copy(ray.direction).applyQuaternion(_invQuat);
      }

      const lox = _rayLocal.origin.x, loy = _rayLocal.origin.y, loz = _rayLocal.origin.z;
      const ldx = _rayLocal.direction.x, ldy = _rayLocal.direction.y, ldz = _rayLocal.direction.z;
      const linvX = ldx !== 0 ? 1 / ldx : 1e30;
      const linvY = ldy !== 0 ? 1 / ldy : 1e30;
      const linvZ = ldz !== 0 ? 1 / ldz : 1e30;

      for (let si = 0; si < rec.slices.length; si++) {
        const slice = rec.slices[si];
        // Inline scalar local-space AABB slab reject (skips non-hit slices BEFORE building or traversing BVH!)
        {
          let tmin = -Infinity;
          let tmax = Number.isFinite(closestDistSq) ? Math.sqrt(closestDistSq) : Infinity;
          const tx1 = (slice.minX - lox) * linvX;
          const tx2 = (slice.maxX - lox) * linvX;
          tmin = Math.max(tmin, Math.min(tx1, tx2));
          tmax = Math.min(tmax, Math.max(tx1, tx2));
          if (tmax >= Math.max(0, tmin)) {
            const ty1 = (slice.minY - loy) * linvY;
            const ty2 = (slice.maxY - loy) * linvY;
            tmin = Math.max(tmin, Math.min(ty1, ty2));
            tmax = Math.min(tmax, Math.max(ty1, ty2));
            if (tmax >= Math.max(0, tmin)) {
              const tz1 = (slice.minZ - loz) * linvZ;
              const tz2 = (slice.maxZ - loz) * linvZ;
              tmin = Math.max(tmin, Math.min(tz1, tz2));
              tmax = Math.min(tmax, Math.max(tz1, tz2));
            }
          }
          if (tmax < Math.max(0, tmin)) continue;
        }
        const posInt16 = slice.posInt16;
        const idxArr = slice.masterIndices;

        if (slice.indexCount > BVH_MIN_TRIANGLES * 3) {
          if (slice.bvh === undefined) {
            slice.bvh = buildSliceBvh(posInt16, idxArr, slice.indexStart, slice.indexCount);
          }
          if (slice.bvh) {
            const nextDist = intersectSliceBvh(
              slice.bvh,
              _rayLocal,
              posInt16,
              idxArr,
              ray.origin,
              clippingPlane,
              closestDistSq,
              p,
              q,
              null
            );
            if (nextDist < closestDistSq) {
              closestDistSq = nextDist;
              closestPartId = part.id;
            }
            continue;
          }
        }

        let maxT = Number.isFinite(closestDistSq) ? Math.sqrt(closestDistSq) : Infinity;
        const end = slice.indexStart + slice.indexCount;
        for (let i = slice.indexStart; i + 2 < end; i += 3) {
          const i0 = idxArr[i] * MESH_I16_STRIDE;
          const i1 = idxArr[i + 1] * MESH_I16_STRIDE;
          const i2 = idxArr[i + 2] * MESH_I16_STRIDE;

          const hitT = rayTriangleScalar(
            lox, loy, loz, ldx, ldy, ldz,
            posInt16[i0] * QUANT_POS_SCALE, posInt16[i0 + 1] * QUANT_POS_SCALE, posInt16[i0 + 2] * QUANT_POS_SCALE,
            posInt16[i1] * QUANT_POS_SCALE, posInt16[i1 + 1] * QUANT_POS_SCALE, posInt16[i1 + 2] * QUANT_POS_SCALE,
            posInt16[i2] * QUANT_POS_SCALE, posInt16[i2 + 1] * QUANT_POS_SCALE, posInt16[i2 + 2] * QUANT_POS_SCALE,
            maxT
          );
          if (hitT < 0) continue;

          if (fastRigidNoClip) {
            const dSq = hitT * hitT;
            if (dSq < closestDistSq) {
              closestDistSq = dSq;
              maxT = hitT;
              closestPartId = part.id;
            }
            continue;
          }

          _hitPt.set(lox + ldx * hitT, loy + ldy * hitT, loz + ldz * hitT);
          _worldHit.copy(_hitPt).applyQuaternion(q).add(p);
          if (clippingPlane && clippingPlane.distanceToPoint(_worldHit) < 0) continue;

          const dSq = ray.origin.distanceToSquared(_worldHit);
          if (dSq < closestDistSq) {
            closestDistSq = dSq;
            maxT = Math.sqrt(dSq);
            closestPartId = part.id;
          }
        }
      }
    }

    if (rec.boneSlices.length > 0) {
      for (let bi = 0; bi < rec.boneSlices.length; bi++) {
        const bs = rec.boneSlices[bi];
        const r = bs.localSphere.radius;
        _v3.copy(bs.localSphere.center).applyMatrix4(bs.boneObj.matrixWorld);
        _boneWorldBox.min.set(_v3.x - r, _v3.y - r, _v3.z - r);
        _boneWorldBox.max.set(_v3.x + r, _v3.y + r, _v3.z + r);
        if (!ray.intersectBox(_boneWorldBox, _boxHitPt)) continue;
        if (ray.origin.distanceToSquared(_boxHitPt) >= closestDistSq) continue;

        _invBoneMat.copy(bs.boneObj.matrixWorld).invert();
        _rayLocal.copy(ray).applyMatrix4(_invBoneMat);

        const posInt16 = bs.posInt16;
        const idxArr = bs.masterIndices;

        if (bs.indexCount > BVH_MIN_TRIANGLES * 3) {
          if (bs.bvh === undefined) {
            bs.bvh = buildSliceBvh(posInt16, idxArr, bs.indexStart, bs.indexCount);
          }
          if (bs.bvh) {
            const nextDist = intersectSliceBvh(
              bs.bvh,
              _rayLocal,
              posInt16,
              idxArr,
              ray.origin,
              clippingPlane,
              closestDistSq,
              null,
              null,
              bs.boneObj.matrixWorld
            );
            if (nextDist < closestDistSq) {
              closestDistSq = nextDist;
              closestPartId = part.id;
            }
            continue;
          }
        }

        const lox = _rayLocal.origin.x, loy = _rayLocal.origin.y, loz = _rayLocal.origin.z;
        const ldx = _rayLocal.direction.x, ldy = _rayLocal.direction.y, ldz = _rayLocal.direction.z;
        const end = bs.indexStart + bs.indexCount;
        for (let i = bs.indexStart; i + 2 < end; i += 3) {
          const i0 = idxArr[i] * MESH_I16_STRIDE;
          const i1 = idxArr[i + 1] * MESH_I16_STRIDE;
          const i2 = idxArr[i + 2] * MESH_I16_STRIDE;

          const hitT = rayTriangleScalar(
            lox, loy, loz, ldx, ldy, ldz,
            posInt16[i0] * QUANT_POS_SCALE, posInt16[i0 + 1] * QUANT_POS_SCALE, posInt16[i0 + 2] * QUANT_POS_SCALE,
            posInt16[i1] * QUANT_POS_SCALE, posInt16[i1 + 1] * QUANT_POS_SCALE, posInt16[i1 + 2] * QUANT_POS_SCALE,
            posInt16[i2] * QUANT_POS_SCALE, posInt16[i2 + 1] * QUANT_POS_SCALE, posInt16[i2 + 2] * QUANT_POS_SCALE,
            Infinity
          );
          if (hitT < 0) continue;

          _hitPt.set(lox + ldx * hitT, loy + ldy * hitT, loz + ldz * hitT);
          _worldHit.copy(_hitPt).applyMatrix4(bs.boneObj.matrixWorld);
          if (clippingPlane && clippingPlane.distanceToPoint(_worldHit) < 0) continue;

          const dSq = ray.origin.distanceToSquared(_worldHit);
          if (dSq < closestDistSq) {
            closestDistSq = dSq;
            closestPartId = part.id;
          }
        }
      }
    }
  }

  return closestPartId;
}

export function computePartWorldBox(rec: PartPickRecord, out: THREE.Box3): THREE.Box3 {
  out.makeEmpty();
  if (rec.slices.length > 0) {
    const p = rec.part.group.position;
    const q = rec.part.group.quaternion;
    if (q.x === 0 && q.y === 0 && q.z === 0) {
      out.min.set(rec.localBox.min.x + p.x, rec.localBox.min.y + p.y, rec.localBox.min.z + p.z);
      out.max.set(rec.localBox.max.x + p.x, rec.localBox.max.y + p.y, rec.localBox.max.z + p.z);
    } else {
      const r = rec.localSphere.radius;
      _v3.copy(rec.localSphere.center).applyQuaternion(q).add(p);
      out.min.set(_v3.x - r, _v3.y - r, _v3.z - r);
      out.max.set(_v3.x + r, _v3.y + r, _v3.z + r);
    }
  }
  if (rec.boneSlices.length > 0) {
    for (let i = 0; i < rec.boneSlices.length; i++) {
      expandWorldBoxFromBoneSlice(rec.boneSlices[i], out);
    }
  }
  if (out.isEmpty()) {
    const p = rec.part.group.position;
    out.set(new THREE.Vector3(p.x - 1, p.y - 1, p.z - 1), new THREE.Vector3(p.x + 1, p.y + 1, p.z + 1));
  }
  return out;
}
