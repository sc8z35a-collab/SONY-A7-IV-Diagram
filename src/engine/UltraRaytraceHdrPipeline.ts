import * as THREE from 'three';
import { GraphicsQuality } from '../assemblies/types';
import { GPU_PROFILE } from './GpuOptimizer';
import {
  computePartWorldBox,
  MaterialLutRegistry,
  MegaBatchChunk,
  PartPickRecord,
} from './GpuMegaBatch';

/**
 * UltraRaytraceHdrPipeline — Production 3-Tier Studio Ray Tracing, Shadow Mapping & 16-Bit HDR Pipeline
 *
 * - STD   (Tier 0): Direct zero-FBO OMEGA-CAD v7 PBR (maximum FPS / battery).
 * - HIGH  (Tier 1): Tight-frustum 1024px 8-tap rotated Poisson PCF soft shadows + seamless white
 *                   shadow-catching studio floor.
 * - ULTRA (Tier 2):
 *     1. 2048px (1024px mobile) PCSS Variable-Penumbra Soft Shadows (8-tap blocker + 16-tap Vogel PCF)
 *     2. Real-Time Planar Studio Table Mirror Reflections (exact right-handed mirrored camera)
 *     3. View-Space G-Buffer (Octahedral Normals + Micro-Bump + Roughness + Metalness)
 *     4. 16-Bit HalfFloat (`RGBA16F`) Linear HDR RenderTarget + Hardware `DepthTexture`
 *     5. Screen-Space Ray Tracing (24-step + 5-step binary-refined SSR Glossy Reflections,
 *        8-step Ray-Traced Micro-Contact Shadows, 4x4 Horizon-Based Ray-Traced GTAO)
 *     6. Depth-Aware Bilateral Denoise for AO/Contact Shadows & Roughness-Guided SSR Blur
 *     7. Geometry-Masked 4-Mip Physical Kawase/Jimenez HDR Bloom (0 background washout!)
 *     8. Analytical Infinite Reflective/Shadow-Catching White Cyclorama Floor + Hue-Preserving
 *        AgX Filmic HDR Tone Mapping + FXAA 3.11 Anti-Aliasing!
 */

// Must strictly match STUDIO_KEY_DIR in GpuMegaBatch.ts!
const STUDIO_KEY_DIR = new THREE.Vector3(-0.5174, 0.7164, 0.4577).normalize();
const _worldBox = new THREE.Box3();
const _partBox = new THREE.Box3();
const _boxCenter = new THREE.Vector3();
const _boxSize = new THREE.Vector3();
const _lightPos = new THREE.Vector3();
const _lightUp = new THREE.Vector3(0, 1, 0);
const _invProj = new THREE.Matrix4();
const _invViewProj = new THREE.Matrix4();
const _keyDirView = new THREE.Vector3();
const _reflCamPos = new THREE.Vector3();
const _reflTarget = new THREE.Vector3();
const _reflViewProj = new THREE.Matrix4();
const _normalMatrix = new THREE.Matrix3();

// Fullscreen triangle vertex shader (3 vertices, 0 index buffer, covers [-1, 1] seamlessly)
const FS_TRI_VS = /* glsl */ `
precision highp float;
in vec3 position;
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// =============================================================================
// 1. HIGH-MODE GROUNDED SEAMLESS WHITE SHADOW-CATCHER FLOOR SHADER
// =============================================================================
const HIGH_FLOOR_VS = /* glsl */ `
precision highp float;
uniform mat4 modelMatrix;
uniform mat4 uViewProj;
in vec3 position;
out highp vec3 vWorldPos;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = uViewProj * wp;
}
`;

const HIGH_FLOOR_FS = /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform highp sampler2D uShadowMap;
uniform mat4 uLightViewProj;
uniform vec4 uShadowParams;
uniform vec4 uFloorCenterRad; // xyz = center on floor, w = object radius
uniform float uFloorFade;

in highp vec3 vWorldPos;
out vec4 fragColor;

const vec2 POISSON_8[8] = vec2[8](
  vec2(-0.6134,  0.6175), vec2( 0.1700, -0.0402),
  vec2(-0.2994,  0.7919), vec2( 0.6456,  0.5286),
  vec2(-0.8180, -0.3510), vec2( 0.0689, -0.8213),
  vec2( 0.7794, -0.3991), vec2(-0.2545, -0.4519)
);

float ign(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

void main() {
  if (uFloorFade <= 0.001) discard;
  vec2 d = vWorldPos.xz - uFloorCenterRad.xz;
  float r = length(d) / max(uFloorCenterRad.w, 1.0);
  float radFade = 1.0 - smoothstep(1.15, 2.35, r);
  if (radFade <= 0.001) discard;

  vec4 sc = uLightViewProj * vec4(vWorldPos + vec3(0.0, uShadowParams.x * 0.35, 0.0), 1.0);
  vec3 proj = (sc.xyz / max(sc.w, 1e-5)) * 0.5 + 0.5;
  float shadowVis = 1.0;
  if (proj.x > 0.003 && proj.x < 0.997 && proj.y > 0.003 && proj.y < 0.997 && proj.z > 0.0 && proj.z < 0.999) {
    float ang = ign(gl_FragCoord.xy) * 6.2831853;
    float ca = cos(ang), sa = sin(ang);
    mat2 rot = mat2(ca, -sa, sa, ca);
    float rad = uShadowParams.y * 2.4;
    float refZ = proj.z - 0.00055;
    float vis = 0.0;
    for (int i = 0; i < 8; i++) {
      float sd = texture(uShadowMap, proj.xy + (rot * POISSON_8[i]) * rad).r;
      vis += refZ <= sd ? 1.0 : 0.0;
    }
    shadowVis = vis * 0.125;
  }

  float contact = exp(-r * r * 1.85) * 0.14;
  float darkness = clamp(((1.0 - shadowVis) * 0.28 + contact) * radFade * uFloorFade, 0.0, 0.42);
  if (darkness <= 0.002) discard;
  // Cool neutral studio shadow color blended smoothly onto #FFFFFF canvas
  fragColor = vec4(0.16, 0.19, 0.26, darkness);
}
`;

// =============================================================================
// 2. ULTRA SCREEN-SPACE RAY-TRACED GLOSSY REFLECTIONS (SSR) SHADER
// =============================================================================
function buildUltraSsrFs(isMobile: boolean): string {
  const steps = isMobile ? 16 : 24;
  const invSteps = (1 / steps).toFixed(6);
  return /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform highp sampler2D uHdrScene;
uniform highp sampler2D uSceneDepth;
uniform highp sampler2D uGbuf;
uniform mat4 uProj;
uniform mat4 uInvProj;
uniform float uSceneRadius;
uniform float uCamNear;

in vec2 vUv;
out vec4 fragColor;

vec3 decodeOctNormal(vec2 f) {
  vec3 n = vec3(f.x, f.y, 1.0 - abs(f.x) - abs(f.y));
  float t = max(-n.z, 0.0);
  n.x += n.x >= 0.0 ? -t : t;
  n.y += n.y >= 0.0 ? -t : t;
  return normalize(n + vec3(0.0, 0.0, 1e-6));
}

vec3 reconstructViewPos(vec2 uv, float depth) {
  vec4 clip = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec4 view = uInvProj * clip;
  return view.xyz / max(abs(view.w), 1e-6);
}

vec3 projectViewToUvDepth(vec3 vp) {
  vec4 c = uProj * vec4(vp, 1.0);
  return (c.xyz / max(abs(c.w), 1e-6)) * 0.5 + 0.5;
}

float ign(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

void main() {
  float depth = texture(uSceneDepth, vUv).r;
  if (depth >= 0.9999) {
    fragColor = vec4(0.0);
    return;
  }

  vec4 gb = texture(uGbuf, vUv);
  float rough = gb.b;
  float metal = gb.a;
  // Rough matte materials (> 0.62) do not produce sharp coherent glossy reflections
  if (rough > 0.62 && metal < 0.25) {
    fragColor = vec4(0.0);
    return;
  }

  vec3 N = decodeOctNormal(gb.rg * 2.0 - 1.0);
  vec3 vp = reconstructViewPos(vUv, depth);
  vec3 V = normalize(-vp + vec3(0.0, 0.0, 1e-6));
  vec3 R = reflect(-V, N);
  if (R.z > 0.42) {
    fragColor = vec4(0.0);
    return;
  }

  float jitter = ign(gl_FragCoord.xy);
  float maxRayLen = uSceneRadius * 0.95;
  vec3 rayStart = vp + N * (uSceneRadius * 0.0045);

  // Clamp ray endpoint so it stays strictly in front of camera near plane
  float maxT = maxRayLen;
  if (R.z > 0.001) {
    float nearBound = (-uCamNear * 1.15 - rayStart.z) / R.z;
    if (nearBound <= 0.0) {
      fragColor = vec4(0.0);
      return;
    }
    maxT = min(maxT, nearBound);
  }
  vec3 rayEnd = rayStart + R * maxT;

  vec3 p0 = projectViewToUvDepth(rayStart);
  vec3 p1 = projectViewToUvDepth(rayEnd);
  vec3 dp = p1 - p0;
  if (dot(dp.xy, dp.xy) < 1e-7) {
    fragColor = vec4(0.0);
    return;
  }

  float thickness = uSceneRadius * 0.15;
  float hitT = -1.0;
  float prevT = 0.0;

  for (int i = 1; i <= ${steps}; i++) {
    float t = (float(i) - 0.5 + (jitter - 0.5) * 0.85) * ${invSteps};
    vec3 sp = p0 + dp * t;
    if (sp.x < 0.005 || sp.x > 0.995 || sp.y < 0.005 || sp.y > 0.995 || sp.z <= 0.0 || sp.z >= 0.9995) {
      break;
    }
    float sceneD = texture(uSceneDepth, sp.xy).r;
    if (sceneD < 0.9999 && sp.z > sceneD) {
      vec3 hitVp = reconstructViewPos(sp.xy, sceneD);
      vec3 rayVp = reconstructViewPos(sp.xy, sp.z);
      float zDiff = hitVp.z - rayVp.z; // both negative; hit closer -> hitVp.z > rayVp.z
      if (zDiff > 0.0 && zDiff < thickness) {
        hitT = t;
        break;
      }
    }
    prevT = t;
  }

  if (hitT < 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  // 5-step binary refinement for sub-pixel ray-intersection precision
  float lo = prevT;
  float hi = hitT;
  for (int b = 0; b < 5; b++) {
    float mid = 0.5 * (lo + hi);
    vec3 sp = p0 + dp * mid;
    float sceneD = texture(uSceneDepth, sp.xy).r;
    if (sceneD < 0.9999 && sp.z > sceneD) {
      hi = mid;
    } else {
      lo = mid;
    }
  }

  vec3 finalSp = p0 + dp * hi;
  float finalD = texture(uSceneDepth, finalSp.xy).r;
  if (finalD >= 0.9999) {
    fragColor = vec4(0.0);
    return;
  }

  vec3 hitVp = reconstructViewPos(finalSp.xy, finalD);
  vec3 rayVp = reconstructViewPos(finalSp.xy, finalSp.z);
  float finalDiff = hitVp.z - rayVp.z;
  if (finalDiff < -uSceneRadius * 0.01 || finalDiff > thickness) {
    fragColor = vec4(0.0);
    return;
  }

  vec3 hitCol = texture(uHdrScene, finalSp.xy).rgb;
  // Clamp extreme fireflies inside SSR bounce
  hitCol = min(hitCol, vec3(4.5));

  vec2 edgeDist = min(finalSp.xy, 1.0 - finalSp.xy);
  float edgeFade = smoothstep(0.01, 0.11, min(edgeDist.x, edgeDist.y));
  float distFade = 1.0 - smoothstep(0.55, 1.0, hi);
  float roughFade = 1.0 - smoothstep(0.06, 0.64, rough);
  float conf = clamp(edgeFade * distFade * (0.28 + 0.72 * roughFade), 0.0, 1.0);
  fragColor = vec4(hitCol, conf);
}
`;
}

// =============================================================================
// 3. ULTRA RAY-TRACED HORIZON GTAO + MICRO-CONTACT SHADOWS SHADER
// =============================================================================
function buildUltraAoContactFs(isMobile: boolean): string {
  const aoDirs = isMobile ? 3 : 4;
  const aoSteps = isMobile ? 3 : 4;
  const contactSteps = isMobile ? 6 : 8;
  return /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform highp sampler2D uSceneDepth;
uniform highp sampler2D uGbuf;
uniform mat4 uProj;
uniform mat4 uInvProj;
uniform vec3 uKeyDirView;
uniform float uSceneRadius;
uniform vec2 uAspectScale; // (1.0, aspect) or inverse for circular screen-space sampling

in vec2 vUv;
out vec4 fragColor;

vec3 decodeOctNormal(vec2 f) {
  vec3 n = vec3(f.x, f.y, 1.0 - abs(f.x) - abs(f.y));
  float t = max(-n.z, 0.0);
  n.x += n.x >= 0.0 ? -t : t;
  n.y += n.y >= 0.0 ? -t : t;
  return normalize(n + vec3(0.0, 0.0, 1e-6));
}

vec3 reconstructViewPos(vec2 uv, float depth) {
  vec4 clip = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec4 view = uInvProj * clip;
  return view.xyz / max(abs(view.w), 1e-6);
}

vec3 projectViewToUvDepth(vec3 vp) {
  vec4 c = uProj * vec4(vp, 1.0);
  return (c.xyz / max(abs(c.w), 1e-6)) * 0.5 + 0.5;
}

float ign(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

void main() {
  float depth = texture(uSceneDepth, vUv).r;
  if (depth >= 0.9999) {
    fragColor = vec4(1.0, 1.0, 0.0, 1.0);
    return;
  }

  vec4 gb = texture(uGbuf, vUv);
  vec3 N = decodeOctNormal(gb.rg * 2.0 - 1.0);
  vec3 vp = reconstructViewPos(vUv, depth);
  float viewDist = max(-vp.z, 1.0);
  float noise = ign(gl_FragCoord.xy);

  // --- Part A: Horizon-Based Ray-Traced GTAO ---
  float worldAoRadius = uSceneRadius * 0.11;
  float screenAoRad = clamp((worldAoRadius * uProj[1][1]) / viewDist, 0.006, 0.052);
  float occ = 0.0;
  float dirStep = 3.14159265 / float(${aoDirs});

  for (int d = 0; d < ${aoDirs}; d++) {
    float ang = (float(d) + noise) * dirStep;
    vec2 dir = vec2(cos(ang), sin(ang)) * uAspectScale;
    float maxHPos = 0.0;
    float maxHNeg = 0.0;

    for (int s = 1; s <= ${aoSteps}; s++) {
      float frac = (float(s) - 0.35 + noise * 0.35) / float(${aoSteps});
      vec2 off = dir * (screenAoRad * frac * frac + 0.0018);

      vec2 uv1 = vUv + off;
      if (uv1.x > 0.002 && uv1.x < 0.998 && uv1.y > 0.002 && uv1.y < 0.998) {
        float d1 = texture(uSceneDepth, uv1).r;
        if (d1 < 0.9999) {
          vec3 diff = reconstructViewPos(uv1, d1) - vp;
          float len = length(diff);
          if (len > 1e-4 && len < worldAoRadius * 1.45) {
            float falloff = 1.0 - clamp(len / (worldAoRadius * 1.45), 0.0, 1.0);
            float h = max(dot(diff / len, N) - 0.11, 0.0) * falloff * falloff;
            maxHPos = max(maxHPos, h);
          }
        }
      }

      vec2 uv2 = vUv - off;
      if (uv2.x > 0.002 && uv2.x < 0.998 && uv2.y > 0.002 && uv2.y < 0.998) {
        float d2 = texture(uSceneDepth, uv2).r;
        if (d2 < 0.9999) {
          vec3 diff = reconstructViewPos(uv2, d2) - vp;
          float len = length(diff);
          if (len > 1e-4 && len < worldAoRadius * 1.45) {
            float falloff = 1.0 - clamp(len / (worldAoRadius * 1.45), 0.0, 1.0);
            float h = max(dot(diff / len, N) - 0.11, 0.0) * falloff * falloff;
            maxHNeg = max(maxHNeg, h);
          }
        }
      }
    }
    occ += 0.5 * (maxHPos + maxHNeg);
  }
  occ /= float(${aoDirs});
  float gtao = clamp(1.0 - occ * 1.05, 0.36, 1.0);

  // --- Part B: Screen-Space Ray-Traced Micro-Contact Shadows along Key Light ---
  float ndl = dot(N, uKeyDirView);
  float contactVis = 1.0;
  if (ndl > 0.04) {
    float rayLen = uSceneRadius * 0.085;
    float bias = uSceneRadius * 0.0024;
    float thick = uSceneRadius * 0.032;
    vec3 startVp = vp + N * bias;
    float hitOcc = 0.0;
    for (int i = 1; i <= ${contactSteps}; i++) {
      float t = (float(i) - 0.3 + noise * 0.5) / float(${contactSteps});
      vec3 sp = projectViewToUvDepth(startVp + uKeyDirView * (rayLen * t));
      if (sp.x <= 0.002 || sp.x >= 0.998 || sp.y <= 0.002 || sp.y >= 0.998 || sp.z <= 0.0 || sp.z >= 0.9995) {
        break;
      }
      float sd = texture(uSceneDepth, sp.xy).r;
      if (sd < 0.9999 && sp.z > sd) {
        vec3 sVp = reconstructViewPos(sp.xy, sd);
        vec3 rVp = reconstructViewPos(sp.xy, sp.z);
        float zDiff = sVp.z - rVp.z;
        if (zDiff > bias * 0.55 && zDiff < thick) {
          hitOcc = max(hitOcc, (1.0 - t * 0.55));
        }
      }
    }
    contactVis = clamp(1.0 - hitOcc * 0.52 * smoothstep(0.04, 0.25, ndl), 0.48, 1.0);
  }

  fragColor = vec4(gtao, contactVis, 0.0, 1.0);
}
`;
}

// =============================================================================
// 4. DEPTH-AWARE BILATERAL DENOISE SHADER (Used for GTAO/Contact + SSR)
// =============================================================================
const BILATERAL_BLUR_FS = /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform highp sampler2D uSource;
uniform highp sampler2D uSceneDepth;
uniform vec2 uTexelStep; // (dx, 0) or (0, dy)
uniform float uDepthSharpness;

in vec2 vUv;
out vec4 fragColor;

void main() {
  float centerD = texture(uSceneDepth, vUv).r;
  vec4 centerVal = texture(uSource, vUv);
  if (centerD >= 0.9999) {
    fragColor = centerVal;
    return;
  }

  const float w[5] = float[5](0.24, 0.20, 0.13, 0.06, 0.02);
  vec4 sum = centerVal * w[0];
  float wSum = w[0];

  for (int i = 1; i <= 4; i++) {
    vec2 off = uTexelStep * float(i);
    vec2 uvP = clamp(vUv + off, vec2(0.001), vec2(0.999));
    vec2 uvN = clamp(vUv - off, vec2(0.001), vec2(0.999));

    float dP = texture(uSceneDepth, uvP).r;
    float bwP = w[i] * exp(-abs(dP - centerD) * uDepthSharpness) * (dP < 0.9999 ? 1.0 : 0.0);
    sum += texture(uSource, uvP) * bwP;
    wSum += bwP;

    float dN = texture(uSceneDepth, uvN).r;
    float bwN = w[i] * exp(-abs(dN - centerD) * uDepthSharpness) * (dN < 0.9999 ? 1.0 : 0.0);
    sum += texture(uSource, uvN) * bwN;
    wSum += bwN;
  }

  fragColor = sum / max(wSum, 1e-4);
}
`;

// =============================================================================
// 5. GEOMETRY-MASKED PHYSICAL HDR BLOOM (Prefilter + 13-Tap Downsample + 9-Tap Upsample)
// =============================================================================
const BLOOM_PREFILTER_FS = /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform highp sampler2D uHdrScene;
uniform highp sampler2D uSceneDepth;
uniform vec2 uInvRes;

in vec2 vUv;
out vec4 fragColor;

vec3 sampleMaskedHdr(vec2 uv) {
  float d = texture(uSceneDepth, uv).r;
  if (d >= 0.9999) return vec3(0.0);
  vec3 c = min(texture(uHdrScene, uv).rgb, vec3(6.5));
  float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float threshold = 1.26;
  float knee = 0.36;
  float soft = clamp(luma - threshold + knee, 0.0, 2.0 * knee);
  soft = (soft * soft) / max(4.0 * knee, 1e-4);
  float contrib = max(soft, luma - threshold) / max(luma, 1e-4);
  return c * max(contrib, 0.0);
}

void main() {
  vec2 h = uInvRes * 0.5;
  vec3 c0 = sampleMaskedHdr(vUv + vec2(-h.x, -h.y));
  vec3 c1 = sampleMaskedHdr(vUv + vec2( h.x, -h.y));
  vec3 c2 = sampleMaskedHdr(vUv + vec2(-h.x,  h.y));
  vec3 c3 = sampleMaskedHdr(vUv + vec2( h.x,  h.y));
  // Karis-weighted average eliminates single-pixel HDR specular firefly flicker
  float w0 = 1.0 / (1.0 + max(max(c0.r, c0.g), c0.b));
  float w1 = 1.0 / (1.0 + max(max(c1.r, c1.g), c1.b));
  float w2 = 1.0 / (1.0 + max(max(c2.r, c2.g), c2.b));
  float w3 = 1.0 / (1.0 + max(max(c3.r, c3.g), c3.b));
  vec3 avg = (c0 * w0 + c1 * w1 + c2 * w2 + c3 * w3) / max(w0 + w1 + w2 + w3, 1e-4);
  fragColor = vec4(avg, 1.0);
}
`;

const BLOOM_DOWNSAMPLE_FS = /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform highp sampler2D uSource;
uniform vec2 uTexelSize;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 d = uTexelSize;
  vec3 a = texture(uSource, vUv + vec2(-2.0 * d.x,  2.0 * d.y)).rgb;
  vec3 b = texture(uSource, vUv + vec2( 0.0,        2.0 * d.y)).rgb;
  vec3 c = texture(uSource, vUv + vec2( 2.0 * d.x,  2.0 * d.y)).rgb;
  vec3 e = texture(uSource, vUv + vec2(-2.0 * d.x,  0.0      )).rgb;
  vec3 f = texture(uSource, vUv                              ).rgb;
  vec3 g = texture(uSource, vUv + vec2( 2.0 * d.x,  0.0      )).rgb;
  vec3 h = texture(uSource, vUv + vec2(-2.0 * d.x, -2.0 * d.y)).rgb;
  vec3 i = texture(uSource, vUv + vec2( 0.0,       -2.0 * d.y)).rgb;
  vec3 j = texture(uSource, vUv + vec2( 2.0 * d.x, -2.0 * d.y)).rgb;
  vec3 k = texture(uSource, vUv + vec2(-d.x,  d.y)).rgb;
  vec3 l = texture(uSource, vUv + vec2( d.x,  d.y)).rgb;
  vec3 m = texture(uSource, vUv + vec2(-d.x, -d.y)).rgb;
  vec3 n = texture(uSource, vUv + vec2( d.x, -d.y)).rgb;

  vec3 res = f * 0.125;
  res += (a + c + h + j) * 0.03125;
  res += (b + e + g + i) * 0.0625;
  res += (k + l + m + n) * 0.125;
  fragColor = vec4(max(res, vec3(0.0)), 1.0);
}
`;

const BLOOM_UPSAMPLE_FS = /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform highp sampler2D uSource;
uniform vec2 uTexelSize;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 d = uTexelSize * 1.15;
  vec3 a = texture(uSource, vUv + vec2(-d.x,  d.y)).rgb;
  vec3 b = texture(uSource, vUv + vec2( 0.0,  d.y)).rgb;
  vec3 c = texture(uSource, vUv + vec2( d.x,  d.y)).rgb;
  vec3 e = texture(uSource, vUv + vec2(-d.x,  0.0)).rgb;
  vec3 f = texture(uSource, vUv                  ).rgb;
  vec3 g = texture(uSource, vUv + vec2( d.x,  0.0)).rgb;
  vec3 h = texture(uSource, vUv + vec2(-d.x, -d.y)).rgb;
  vec3 i = texture(uSource, vUv + vec2( 0.0, -d.y)).rgb;
  vec3 j = texture(uSource, vUv + vec2( d.x, -d.y)).rgb;

  vec3 res = f * 4.0 + (b + e + g + i) * 2.0 + (a + c + h + j);
  fragColor = vec4(res * (1.0 / 16.0), 1.0);
}
`;

// =============================================================================
// 6. ULTRA FINAL HDR COMPOSITE (Analytical Reflective/Shadowed Studio Floor +
//    SSR + GTAO + Contact Shadows + Physical HDR Bloom + AgX Filmic Tone Map)
// =============================================================================
const ULTRA_COMPOSITE_FS = /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform highp sampler2D uHdrScene;
uniform highp sampler2D uSceneDepth;
uniform highp sampler2D uGbuf;
uniform highp sampler2D uSsrTex;
uniform highp sampler2D uAoContactTex;
uniform highp sampler2D uBloomTex;
uniform highp sampler2D uShadowMap;
uniform highp sampler2D uReflectMap;

uniform mat4 uInvProj;
uniform mat4 uInvViewProj;
uniform mat4 uLightViewProj;
uniform mat4 uReflectViewProj;
uniform vec3 uCamPos;
uniform vec4 uShadowParams;
uniform vec4 uFloorCenterRad; // xyz = floor center (y = floorY), w = object radius
uniform float uFloorFade;
uniform vec2 uReflectTexel;

in vec2 vUv;
out vec4 fragColor;

const vec2 POISSON_8[8] = vec2[8](
  vec2(-0.6134,  0.6175), vec2( 0.1700, -0.0402),
  vec2(-0.2994,  0.7919), vec2( 0.6456,  0.5286),
  vec2(-0.8180, -0.3510), vec2( 0.0689, -0.8213),
  vec2( 0.7794, -0.3991), vec2(-0.2545, -0.4519)
);

float ign(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

vec3 decodeOctNormal(vec2 f) {
  vec3 n = vec3(f.x, f.y, 1.0 - abs(f.x) - abs(f.y));
  float t = max(-n.z, 0.0);
  n.x += n.x >= 0.0 ? -t : t;
  n.y += n.y >= 0.0 ? -t : t;
  return normalize(n + vec3(0.0, 0.0, 1e-6));
}

vec3 reconstructViewPos(vec2 uv, float depth) {
  vec4 clip = vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec4 view = uInvProj * clip;
  return view.xyz / max(abs(view.w), 1e-6);
}

// Hue-Preserving AgX Filmic HDR Tone Mapping (rich gold/orange/emerald fidelity + silky HDR highlight rolloff!)
vec3 agxDefaultContrastApprox(vec3 x) {
  vec3 x2 = x * x;
  vec3 x4 = x2 * x2;
  return 15.5 * x4 * x2 - 40.14 * x4 * x + 31.96 * x4 - 6.868 * x2 * x + 0.4298 * x2 + 0.1191 * x - 0.00232;
}

vec3 agxToneMapSrgb(vec3 hdrLinear) {
  const mat3 agxInset = mat3(
    0.842479062253094,  0.0423282422610123, 0.0423756549057051,
    0.0784335999999992, 0.878468636469772,  0.0784336,
    0.0792237451477643, 0.0791661274605434, 0.879142973793104
  );
  const mat3 agxOutset = mat3(
     1.19687900512017,   -0.0528968517574562, -0.0529716355144438,
    -0.0980208811401368,  1.15190312990417,   -0.0980434501171241,
    -0.0990297440797205, -0.0989611768448433,  1.15107367264116
  );

  // Studio exposure calibrated so anodized blacks stay deep obsidian and HDR highlights roll off silkily
  vec3 val = max(hdrLinear * 1.06, vec3(1e-6));
  val = agxInset * val;
  val = clamp(log2(max(val, vec3(1e-6))), -12.47393, 4.026069);
  val = (val - (-12.47393)) / (4.026069 - (-12.47393));
  val = agxDefaultContrastApprox(val);
  val = agxOutset * val;
  val = clamp(val, 0.0, 1.0);
  // Crisp filmic shadow toe (eliminates milky lifted charcoal) + Punchy studio saturation
  val = clamp((val - vec3(0.026)) / 0.974, 0.0, 1.0);
  val = val * mix(vec3(0.92), vec3(1.04), smoothstep(vec3(0.0), vec3(0.55), val));
  float luma = dot(val, vec3(0.2126, 0.7152, 0.0722));
  val = clamp(mix(vec3(luma), val, 1.15), 0.0, 1.0);
  return val;
}

vec3 evalAnalyticalStudioFloor(vec2 uv) {
  vec3 studioBg = vec3(1.0);
  if (uFloorFade <= 0.002) return studioBg;

  float floorY = uFloorCenterRad.y;
  if (uCamPos.y <= floorY + 0.15) return studioBg;

  vec4 farClip = vec4(uv * 2.0 - 1.0, 1.0, 1.0);
  vec4 farWorld = uInvViewProj * farClip;
  vec3 rayDir = normalize(farWorld.xyz / max(abs(farWorld.w), 1e-6) - uCamPos);
  if (rayDir.y >= -0.001) return studioBg;

  float t = (floorY - uCamPos.y) / rayDir.y;
  if (t <= 0.0 || t > 3800.0) return studioBg;

  vec3 hitPos = uCamPos + rayDir * t;
  vec2 d = hitPos.xz - uFloorCenterRad.xz;
  float r = length(d) / max(uFloorCenterRad.w, 1.0);
  float radFade = 1.0 - smoothstep(1.10, 2.45, r);
  if (radFade <= 0.002) return studioBg;

  // 1. ULTRA PCSS Soft Cast Shadow onto seamless white studio cyclorama table
  float shadowVis = 1.0;
  vec4 sc = uLightViewProj * vec4(hitPos + vec3(0.0, uShadowParams.x * 0.3, 0.0), 1.0);
  vec3 proj = (sc.xyz / max(sc.w, 1e-5)) * 0.5 + 0.5;
  if (proj.x > 0.003 && proj.x < 0.997 && proj.y > 0.003 && proj.y < 0.997 && proj.z > 0.0 && proj.z < 0.999) {
    float ang = ign(gl_FragCoord.xy) * 6.2831853;
    float ca = cos(ang), sa = sin(ang);
    mat2 rot = mat2(ca, -sa, sa, ca);
    float refZ = proj.z - 0.0005;
    float texel = uShadowParams.y;

    float blockerSum = 0.0;
    float blockerCnt = 0.0;
    float searchRad = texel * (uShadowParams.w * 1.25);
    for (int i = 0; i < 8; i++) {
      float sd = texture(uShadowMap, proj.xy + (rot * POISSON_8[i]) * searchRad).r;
      if (sd < refZ) {
        blockerSum += sd;
        blockerCnt += 1.0;
      }
    }
    if (blockerCnt > 0.5) {
      float avgBlocker = blockerSum / blockerCnt;
      float penumbra = clamp((refZ - avgBlocker) * 58.0, 1.1, 8.5) * texel;
      float vis = 0.0;
      for (int i = 0; i < 16; i++) {
        float fi = float(i);
        float rr = sqrt((fi + 0.5) * 0.0625) * penumbra;
        float th = fi * 2.3999632 + ang;
        float sd = texture(uShadowMap, proj.xy + vec2(cos(th), sin(th)) * rr).r;
        vis += refZ <= sd ? 1.0 : 0.0;
      }
      shadowVis = vis * 0.0625;
    }
  }

  // Soft radial studio table contact occlusion under the object footprint
  float contactOccl = exp(-r * r * 2.15) * 0.16;
  float shadowDark = clamp(((1.0 - shadowVis) * 0.30 + contactOccl) * radFade * uFloorFade, 0.0, 0.46);
  vec3 floorCol = mix(studioBg, vec3(0.73, 0.76, 0.83), shadowDark);

  // 2. ULTRA Real-Time Planar Acrylic Studio Table Reflection (premultiplied-safe 9-tap frosted blur!)
  vec4 rClip = uReflectViewProj * vec4(hitPos, 1.0);
  vec2 rUv = (rClip.xy / max(abs(rClip.w), 1e-5)) * 0.5 + 0.5;
  if (rUv.x > 0.005 && rUv.x < 0.995 && rUv.y > 0.005 && rUv.y < 0.995) {
    float blurScale = mix(0.60, 2.75, clamp(r * 0.72, 0.0, 1.0));
    vec2 stepUv = uReflectTexel * blurScale;
    vec4 s0 = texture(uReflectMap, rUv);
    vec3 accRgb = s0.rgb * s0.a * 2.0;
    float accA = s0.a * 2.0;
    float wTot = 2.0;
    for (int i = 0; i < 8; i++) {
      vec4 si = texture(uReflectMap, clamp(rUv + POISSON_8[i] * stepUv, vec2(0.002), vec2(0.998)));
      accRgb += si.rgb * si.a;
      accA += si.a;
      wTot += 1.0;
    }
    float cov = accA / wTot;
    if (cov > 0.005) {
      vec3 reflRgb = accRgb / max(accA, 1e-4);
      // Schlick Fresnel grazing reflectance curve for glossy white acrylic photography table
      float ndv = clamp(-rayDir.y, 0.0, 1.0);
      float om = 1.0 - ndv;
      float om2 = om * om;
      float fres = 0.11 + 0.28 * (om2 * om2);
      float reflAmt = clamp(fres * cov * radFade * uFloorFade * mix(0.72, 1.0, shadowVis), 0.0, 0.37);
      floorCol = mix(floorCol, reflRgb, reflAmt);
    }
  }

  return floorCol;
}

void main() {
  float depth = texture(uSceneDepth, vUv).r;
  vec4 hdrSamp = texture(uHdrScene, vUv);
  vec3 bloom = texture(uBloomTex, vUv).rgb * 0.16;

  // Empty background pixel -> seamless reflective shadow-catching white cyclorama + subtle specular halo bleed!
  if (depth >= 0.9999 && hdrSamp.a < 0.005) {
    vec3 floorSrgb = evalAnalyticalStudioFloor(vUv);
    // Subtle photographic specular bloom spillover onto white cyclorama
    vec3 outCol = clamp(floorSrgb + bloom * 0.12, 0.0, 1.0);
    fragColor = vec4(outCol, 1.0);
    return;
  }

  vec3 hdrCol = (hdrSamp.a > 0.005 && hdrSamp.a < 0.995)
    ? (hdrSamp.rgb / max(hdrSamp.a, 0.05))
    : hdrSamp.rgb;
  if (depth < 0.9999) {
    vec4 gb = texture(uGbuf, vUv);
    vec2 aoContact = texture(uAoContactTex, vUv).rg;
    vec4 ssr = texture(uSsrTex, vUv);

    float gtao = aoContact.r;
    float contactShadow = aoContact.g;
    float rough = gb.b;
    float metal = gb.a;

    // Modulate linear HDR radiance by Ray-Traced GTAO & Micro-Contact Shadows!
    float occFactor = gtao * mix(0.66, 1.0, contactShadow);
    // Keep very bright HDR emissives/speculars from losing glow to AO
    float luma = dot(hdrCol, vec3(0.2126, 0.7152, 0.0722));
    float emissiveProtect = smoothstep(1.35, 3.2, luma);
    hdrCol *= mix(occFactor, 1.0, emissiveProtect * 0.75);

    // Physically weighted Screen-Space Ray-Traced Reflection (SSR) blend!
    if (ssr.a > 0.01) {
      vec3 N = decodeOctNormal(gb.rg * 2.0 - 1.0);
      vec3 vp = reconstructViewPos(vUv, depth);
      vec3 V = normalize(-vp + vec3(0.0, 0.0, 1e-6));
      float ndv = clamp(dot(N, V), 0.001, 1.0);
      float om = 1.0 - ndv;
      float om2 = om * om;
      float fres = mix(0.05, 0.92, metal) + (1.0 - mix(0.05, 0.92, metal)) * (om2 * om2 * om);
      float gloss = (1.0 - rough) * (1.0 - rough);
      float ssrWeight = clamp(ssr.a * fres * gloss * (0.42 + 0.44 * metal), 0.0, 0.68);
      hdrCol = mix(hdrCol, ssr.rgb, ssrWeight);
    }
  }

  // Add physical multi-mip HDR bloom in Linear HDR space before AgX Filmic Tone Mapping!
  hdrCol += bloom;
  vec3 srgbPart = agxToneMapSrgb(hdrCol);

  if (hdrSamp.a < 0.995) {
    vec3 floorSrgb = evalAnalyticalStudioFloor(vUv);
    srgbPart = mix(floorSrgb, srgbPart, clamp(hdrSamp.a, 0.0, 1.0));
  }

  fragColor = vec4(srgbPart, 1.0);
}
`;

// =============================================================================
// 7. FXAA 3.11 PERCEPTUAL EDGE ANTI-ALIASING SHADER (Zero MSAA GMEM overhead!)
// =============================================================================
const FXAA_FS = /* glsl */ `
precision highp float;
precision highp sampler2D;

uniform highp sampler2D uSource;
uniform vec2 uTexelSize;

in vec2 vUv;
out vec4 fragColor;

float fxaaLuma(vec3 rgb) {
  return dot(rgb, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec3 rgbM = texture(uSource, vUv).rgb;
  vec3 rgbNW = texture(uSource, vUv + vec2(-uTexelSize.x, -uTexelSize.y)).rgb;
  vec3 rgbNE = texture(uSource, vUv + vec2( uTexelSize.x, -uTexelSize.y)).rgb;
  vec3 rgbSW = texture(uSource, vUv + vec2(-uTexelSize.x,  uTexelSize.y)).rgb;
  vec3 rgbSE = texture(uSource, vUv + vec2( uTexelSize.x,  uTexelSize.y)).rgb;

  float lumaM  = fxaaLuma(rgbM);
  float lumaNW = fxaaLuma(rgbNW);
  float lumaNE = fxaaLuma(rgbNE);
  float lumaSW = fxaaLuma(rgbSW);
  float lumaSE = fxaaLuma(rgbSE);

  float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
  float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));
  float range = lumaMax - lumaMin;

  if (range < max(0.0312, lumaMax * 0.10)) {
    fragColor = vec4(rgbM, 1.0);
    return;
  }

  vec2 dir;
  dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
  dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

  float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * 0.03125, 0.0078125);
  float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
  dir = clamp(dir * rcpDirMin, vec2(-8.0), vec2(8.0)) * uTexelSize;

  vec3 rgbA = 0.5 * (
    texture(uSource, vUv + dir * (1.0 / 3.0 - 0.5)).rgb +
    texture(uSource, vUv + dir * (2.0 / 3.0 - 0.5)).rgb
  );
  vec3 rgbB = rgbA * 0.5 + 0.25 * (
    texture(uSource, vUv + dir * -0.5).rgb +
    texture(uSource, vUv + dir *  0.5).rgb
  );
  float lumaB = fxaaLuma(rgbB);
  fragColor = vec4((lumaB < lumaMin || lumaB > lumaMax) ? rgbA : rgbB, 1.0);
}
`;

export interface UltraRenderArgs {
  quality: GraphicsQuality;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controlsTarget: THREE.Vector3;
  activeChunks: ReadonlyArray<MegaBatchChunk>;
  activePickRecords: ReadonlyArray<PartPickRecord>;
  isPartVisible: (partId: string) => boolean;
  matRegistry: MaterialLutRegistry;
  overlayGroup: THREE.Group;
  explode: number;
  sectionActive: boolean;
  setSubPass: (flag: boolean) => void;
}

export class UltraRaytraceHdrPipeline {
  private renderer: THREE.WebGLRenderer;
  private width = 1;
  private height = 1;
  private hasHalfFloatRT: boolean;
  public healthy = true;

  // Shadow map render target (1024 in HIGH, 2048 desktop / 1024 mobile in ULTRA)
  private shadowTarget: THREE.WebGLRenderTarget | null = null;
  private shadowSize = 0;
  private shadowCamera = new THREE.OrthographicCamera(-60, 60, 60, -60, 1, 600);
  private lightViewProj = new THREE.Matrix4();

  // HIGH-mode world-space seamless shadow-catcher floor mesh
  private highFloorMesh: THREE.Mesh;
  private highFloorMat: THREE.RawShaderMaterial;

  // ULTRA-mode targets (lazily allocated ONLY when ULTRA is first used — 0 VRAM in STD/HIGH!)
  private ultraAllocated = false;
  private hdrTarget: THREE.WebGLRenderTarget | null = null;
  private gbufTarget: THREE.WebGLRenderTarget | null = null;
  private reflectTarget: THREE.WebGLRenderTarget | null = null;
  private ssrTarget: THREE.WebGLRenderTarget | null = null;
  private ssrBlurA: THREE.WebGLRenderTarget | null = null;
  private ssrBlurB: THREE.WebGLRenderTarget | null = null;
  private aoTarget: THREE.WebGLRenderTarget | null = null;
  private aoBlurA: THREE.WebGLRenderTarget | null = null;
  private aoBlurB: THREE.WebGLRenderTarget | null = null;
  private bloomMips: THREE.WebGLRenderTarget[] = [];
  private tonemappedTarget: THREE.WebGLRenderTarget | null = null;

  private reflectCamera = new THREE.PerspectiveCamera(32, 1, 0.85, 4200);

  // Fullscreen post-process scene & triangle geometry
  private postScene = new THREE.Scene();
  private postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private fsTriGeo: THREE.BufferGeometry;
  private postQuad: THREE.Mesh;

  // ULTRA Post-Processing Materials (lazily created on first ULTRA frame)
  private ssrMat: THREE.RawShaderMaterial | null = null;
  private aoContactMat: THREE.RawShaderMaterial | null = null;
  private bilateralMat: THREE.RawShaderMaterial | null = null;
  private bloomPrefilterMat: THREE.RawShaderMaterial | null = null;
  private bloomDownMat: THREE.RawShaderMaterial | null = null;
  private bloomUpMat: THREE.RawShaderMaterial | null = null;
  private compositeMat: THREE.RawShaderMaterial | null = null;
  private fxaaMat: THREE.RawShaderMaterial | null = null;

  // Saved original bucket material/visibility arrays (zero per-frame GC!)
  private savedMaterials: Array<THREE.Material | THREE.Material[]> = [];
  private savedVisibilities: boolean[] = [];

  constructor(renderer: THREE.WebGLRenderer, matRegistry: MaterialLutRegistry) {
    this.renderer = renderer;
    const gl = renderer.getContext() as WebGL2RenderingContext;
    this.hasHalfFloatRT = Boolean(
      gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float')
    );

    // Fullscreen triangle covering NDC [-1, 1] with zero diagonal seam
    this.fsTriGeo = new THREE.BufferGeometry();
    this.fsTriGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
    );
    this.postQuad = new THREE.Mesh(this.fsTriGeo);
    this.postQuad.frustumCulled = false;
    this.postScene.add(this.postQuad);

    // HIGH-mode seamless studio shadow-catcher quad
    const floorGeo = new THREE.PlaneGeometry(1, 1);
    floorGeo.rotateX(-Math.PI / 2);
    this.highFloorMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
      vertexShader: HIGH_FLOOR_VS,
      fragmentShader: HIGH_FLOOR_FS,
      uniforms: {
        uViewProj: matRegistry.uniforms.uViewProj,
        uShadowMap: matRegistry.uniforms.uShadowMap,
        uLightViewProj: matRegistry.uniforms.uLightViewProj,
        uShadowParams: matRegistry.uniforms.uShadowParams,
        uFloorCenterRad: { value: new THREE.Vector4(0, -100, 0, 50) },
        uFloorFade: { value: 0 },
      },
    });
    this.highFloorMesh = new THREE.Mesh(floorGeo, this.highFloorMat);
    this.highFloorMesh.frustumCulled = false;
    this.highFloorMesh.visible = false;
    this.highFloorMesh.renderOrder = -5;
  }

  public getHighFloorMesh(): THREE.Mesh {
    return this.highFloorMesh;
  }

  public setSize(width: number, height: number): void {
    const w = Math.max(1, Math.round(width));
    const h = Math.max(1, Math.round(height));
    if (w === this.width && h === this.height) return;
    this.width = w;
    this.height = h;
    if (this.ultraAllocated) {
      this.resizeUltraTargets();
    }
  }

  private ensureShadowTarget(size: number): void {
    if (this.shadowTarget && this.shadowSize === size) return;
    this.shadowTarget?.dispose();
    const depthTex = new THREE.DepthTexture(size, size, THREE.UnsignedIntType);
    depthTex.format = THREE.DepthFormat;
    depthTex.minFilter = THREE.NearestFilter;
    depthTex.magFilter = THREE.NearestFilter;
    depthTex.generateMipmaps = false;

    this.shadowTarget = new THREE.WebGLRenderTarget(size, size, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      depthBuffer: true,
      stencilBuffer: false,
      depthTexture: depthTex,
    });
    this.shadowTarget.texture.generateMipmaps = false;
    this.shadowSize = size;
  }

  private makeRT(
    w: number,
    h: number,
    useHalfFloat: boolean,
    withDepthTex = false,
    nearest = false,
    withDepthBuffer = withDepthTex
  ): THREE.WebGLRenderTarget {
    const type = useHalfFloat && this.hasHalfFloatRT ? THREE.HalfFloatType : THREE.UnsignedByteType;
    const filter = nearest ? THREE.NearestFilter : THREE.LinearFilter;
    let depthTexture: THREE.DepthTexture | null = null;
    if (withDepthTex) {
      depthTexture = new THREE.DepthTexture(w, h, THREE.UnsignedIntType);
      depthTexture.format = THREE.DepthFormat;
      depthTexture.minFilter = THREE.NearestFilter;
      depthTexture.magFilter = THREE.NearestFilter;
      depthTexture.generateMipmaps = false;
    }
    const rt = new THREE.WebGLRenderTarget(w, h, {
      minFilter: filter,
      magFilter: filter,
      format: THREE.RGBAFormat,
      type,
      depthBuffer: withDepthBuffer,
      stencilBuffer: false,
      depthTexture,
    });
    rt.texture.generateMipmaps = false;
    return rt;
  }

  private ensureUltraResources(): void {
    if (this.ultraAllocated) return;
    const isMob = GPU_PROFILE.isMobile;
    const w = this.width;
    const h = this.height;
    const rtScale = isMob ? 0.5 : 0.65;
    const rw = Math.max(1, Math.round(w * rtScale));
    const rh = Math.max(1, Math.round(h * rtScale));
    const reflW = Math.max(1, Math.round(w * 0.5));
    const reflH = Math.max(1, Math.round(h * 0.5));

    this.hdrTarget = this.makeRT(w, h, true, true, false, true);
    this.gbufTarget = this.makeRT(w, h, !isMob, false, true, true);
    this.reflectTarget = this.makeRT(reflW, reflH, false, false, false, true);

    this.ssrTarget = this.makeRT(rw, rh, true, false, false);
    this.ssrBlurA = this.makeRT(rw, rh, true, false, false);
    this.ssrBlurB = this.makeRT(rw, rh, true, false, false);
    this.aoTarget = this.makeRT(rw, rh, false, false, false);
    this.aoBlurA = this.makeRT(rw, rh, false, false, false);
    this.aoBlurB = this.makeRT(rw, rh, false, false, false);
    this.tonemappedTarget = this.makeRT(w, h, false, false, false);

    this.bloomMips = [];
    let bw = Math.max(2, w >> 1);
    let bh = Math.max(2, h >> 1);
    for (let i = 0; i < 4; i++) {
      this.bloomMips.push(this.makeRT(bw, bh, true, false, false));
      bw = Math.max(2, bw >> 1);
      bh = Math.max(2, bh >> 1);
    }

    this.ssrMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      vertexShader: FS_TRI_VS,
      fragmentShader: buildUltraSsrFs(isMob),
      uniforms: {
        uHdrScene: { value: this.hdrTarget.texture },
        uSceneDepth: { value: this.hdrTarget.depthTexture },
        uGbuf: { value: this.gbufTarget.texture },
        uProj: { value: new THREE.Matrix4() },
        uInvProj: { value: new THREE.Matrix4() },
        uSceneRadius: { value: 60 },
        uCamNear: { value: 0.85 },
      },
    });

    this.aoContactMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      vertexShader: FS_TRI_VS,
      fragmentShader: buildUltraAoContactFs(isMob),
      uniforms: {
        uSceneDepth: { value: this.hdrTarget.depthTexture },
        uGbuf: { value: this.gbufTarget.texture },
        uProj: { value: new THREE.Matrix4() },
        uInvProj: { value: new THREE.Matrix4() },
        uKeyDirView: { value: new THREE.Vector3(0, 1, 0) },
        uSceneRadius: { value: 60 },
        uAspectScale: { value: new THREE.Vector2(1, 1) },
      },
    });

    this.bilateralMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      vertexShader: FS_TRI_VS,
      fragmentShader: BILATERAL_BLUR_FS,
      uniforms: {
        uSource: { value: null },
        uSceneDepth: { value: this.hdrTarget.depthTexture },
        uTexelStep: { value: new THREE.Vector2(1 / rw, 0) },
        uDepthSharpness: { value: 420.0 },
      },
    });

    this.bloomPrefilterMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      vertexShader: FS_TRI_VS,
      fragmentShader: BLOOM_PREFILTER_FS,
      uniforms: {
        uHdrScene: { value: this.hdrTarget.texture },
        uSceneDepth: { value: this.hdrTarget.depthTexture },
        uInvRes: { value: new THREE.Vector2(1 / w, 1 / h) },
      },
    });

    this.bloomDownMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      vertexShader: FS_TRI_VS,
      fragmentShader: BLOOM_DOWNSAMPLE_FS,
      uniforms: {
        uSource: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / w, 1 / h) },
      },
    });

    this.bloomUpMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexShader: FS_TRI_VS,
      fragmentShader: BLOOM_UPSAMPLE_FS,
      uniforms: {
        uSource: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / w, 1 / h) },
      },
    });

    this.compositeMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      vertexShader: FS_TRI_VS,
      fragmentShader: ULTRA_COMPOSITE_FS,
      uniforms: {
        uHdrScene: { value: this.hdrTarget.texture },
        uSceneDepth: { value: this.hdrTarget.depthTexture },
        uGbuf: { value: this.gbufTarget.texture },
        uSsrTex: { value: this.ssrBlurB.texture },
        uAoContactTex: { value: this.aoBlurB.texture },
        uBloomTex: { value: this.bloomMips[0].texture },
        uShadowMap: { value: null },
        uReflectMap: { value: this.reflectTarget.texture },
        uInvProj: { value: new THREE.Matrix4() },
        uInvViewProj: { value: new THREE.Matrix4() },
        uLightViewProj: { value: this.lightViewProj },
        uReflectViewProj: { value: _reflViewProj },
        uCamPos: { value: new THREE.Vector3() },
        uShadowParams: { value: new THREE.Vector4() },
        uFloorCenterRad: { value: new THREE.Vector4() },
        uFloorFade: { value: 1.0 },
        uReflectTexel: { value: new THREE.Vector2(1 / reflW, 1 / reflH) },
      },
    });

    this.fxaaMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      vertexShader: FS_TRI_VS,
      fragmentShader: FXAA_FS,
      uniforms: {
        uSource: { value: this.tonemappedTarget.texture },
        uTexelSize: { value: new THREE.Vector2(1 / w, 1 / h) },
      },
    });

    this.ultraAllocated = true;
  }

  private resizeUltraTargets(): void {
    const isMob = GPU_PROFILE.isMobile;
    const w = this.width;
    const h = this.height;
    const rtScale = isMob ? 0.5 : 0.65;
    const rw = Math.max(1, Math.round(w * rtScale));
    const rh = Math.max(1, Math.round(h * rtScale));
    const reflW = Math.max(1, Math.round(w * 0.5));
    const reflH = Math.max(1, Math.round(h * 0.5));

    this.hdrTarget?.setSize(w, h);
    this.gbufTarget?.setSize(w, h);
    this.reflectTarget?.setSize(reflW, reflH);
    this.ssrTarget?.setSize(rw, rh);
    this.ssrBlurA?.setSize(rw, rh);
    this.ssrBlurB?.setSize(rw, rh);
    this.aoTarget?.setSize(rw, rh);
    this.aoBlurA?.setSize(rw, rh);
    this.aoBlurB?.setSize(rw, rh);
    this.tonemappedTarget?.setSize(w, h);

    let bw = Math.max(2, w >> 1);
    let bh = Math.max(2, h >> 1);
    for (let i = 0; i < this.bloomMips.length; i++) {
      this.bloomMips[i].setSize(bw, bh);
      bw = Math.max(2, bw >> 1);
      bh = Math.max(2, bh >> 1);
    }

    if (this.bloomPrefilterMat) {
      this.bloomPrefilterMat.uniforms.uInvRes.value.set(1 / w, 1 / h);
    }
    if (this.compositeMat) {
      this.compositeMat.uniforms.uReflectTexel.value.set(1 / reflW, 1 / reflH);
    }
    if (this.fxaaMat) {
      this.fxaaMat.uniforms.uTexelSize.value.set(1 / w, 1 / h);
    }
  }

  private computeActiveBounds(
    activePickRecords: ReadonlyArray<PartPickRecord>,
    isPartVisible: (id: string) => boolean
  ): { center: THREE.Vector3; radius: number; minY: number } {
    _worldBox.makeEmpty();
    for (let i = 0; i < activePickRecords.length; i++) {
      const rec = activePickRecords[i];
      if (!isPartVisible(rec.part.id)) continue;
      computePartWorldBox(rec, _partBox);
      _worldBox.union(_partBox);
    }
    if (_worldBox.isEmpty()) {
      _worldBox.set(new THREE.Vector3(-40, -30, -40), new THREE.Vector3(40, 30, 40));
    }
    _worldBox.getCenter(_boxCenter);
    _worldBox.getSize(_boxSize);
    const radius = Math.max(12, _boxSize.length() * 0.5);
    return { center: _boxCenter, radius, minY: _worldBox.min.y };
  }

  private updateShadowCamera(center: THREE.Vector3, radius: number, shadowRes: number): void {
    const padRadius = radius * 1.18;
    const texelWorld = (padRadius * 2) / shadowRes;

    // Position light looking at center along STUDIO_KEY_DIR
    _lightPos.copy(center).addScaledVector(STUDIO_KEY_DIR, padRadius * 2.4);
    this.shadowCamera.position.copy(_lightPos);
    this.shadowCamera.up.copy(_lightUp);
    this.shadowCamera.lookAt(center);
    this.shadowCamera.left = -padRadius;
    this.shadowCamera.right = padRadius;
    this.shadowCamera.top = padRadius;
    this.shadowCamera.bottom = -padRadius;
    this.shadowCamera.near = Math.max(0.5, padRadius * 0.2);
    this.shadowCamera.far = padRadius * 5.2;
    this.shadowCamera.updateProjectionMatrix();
    this.shadowCamera.updateMatrixWorld(true);

    // Texel snapping in light space prevents shadow-edge swimming!
    const lvp = this.lightViewProj.multiplyMatrices(
      this.shadowCamera.projectionMatrix,
      this.shadowCamera.matrixWorldInverse
    );
    const originClip = new THREE.Vector4(0, 0, 0, 1).applyMatrix4(lvp);
    const halfRes = shadowRes * 0.5;
    const snapX = (Math.round(originClip.x * halfRes) - originClip.x * halfRes) / halfRes;
    const snapY = (Math.round(originClip.y * halfRes) - originClip.y * halfRes) / halfRes;
    lvp.elements[12] += snapX;
    lvp.elements[13] += snapY;
    void texelWorld;
  }

  private renderChunksWithOverride(
    pass: 'shadow' | 'gbuf',
    args: UltraRenderArgs
  ): void {
    const { activeChunks, matRegistry, scene, camera, overlayGroup } = args;
    const savedMats = this.savedMaterials;
    const savedVis = this.savedVisibilities;
    savedMats.length = 0;
    savedVis.length = 0;

    const prevOverlayVis = overlayGroup.visible;
    const prevFloorVis = this.highFloorMesh.visible;
    overlayGroup.visible = false;
    this.highFloorMesh.visible = false;

    for (let ci = 0; ci < activeChunks.length; ci++) {
      const chunk = activeChunks[ci];
      if (chunk.edgeLines) {
        savedVis.push(chunk.edgeLines.visible);
        chunk.edgeLines.visible = false;
      }
      if (chunk.edgeBucket?.straddleEdgeMesh) {
        savedVis.push(chunk.edgeBucket.straddleEdgeMesh.visible);
        chunk.edgeBucket.straddleEdgeMesh.visible = false;
      }

      for (let bi = 0; bi < chunk.buckets.length; bi++) {
        const b = chunk.buckets[bi];
        const isGlass = b.kind === 'glassFront' || b.kind === 'glassDouble';
        if (b.solidMesh) {
          savedVis.push(b.solidMesh.visible);
          savedMats.push(b.solidMesh.material);
          if (isGlass) {
            b.solidMesh.visible = false;
          } else if (b.solidMesh.visible) {
            b.solidMesh.material =
              pass === 'shadow'
                ? matRegistry.getShadowDepthMaterial(
                    b.kind === 'opaqueDouble' ? THREE.DoubleSide : THREE.FrontSide,
                    false
                  )
                : matRegistry.getGbufMaterial(
                    b.kind as 'opaqueSolidFront' | 'opaqueTexFront' | 'opaqueDouble',
                    false
                  );
          }
        }
        if (b.straddleMesh) {
          savedVis.push(b.straddleMesh.visible);
          savedMats.push(b.straddleMesh.material);
          if (isGlass) {
            b.straddleMesh.visible = false;
          } else if (b.straddleMesh.visible) {
            b.straddleMesh.material =
              pass === 'shadow'
                ? matRegistry.getShadowDepthMaterial(THREE.DoubleSide, true)
                : matRegistry.getGbufMaterial(
                    b.kind as 'opaqueSolidFront' | 'opaqueTexFront' | 'opaqueDouble',
                    true
                  );
          }
        }
      }
    }

    this.renderer.render(scene, camera);

    // Restore exact original materials & visibility flags
    let mi = 0;
    let vi = 0;
    for (let ci = 0; ci < activeChunks.length; ci++) {
      const chunk = activeChunks[ci];
      if (chunk.edgeLines) {
        chunk.edgeLines.visible = savedVis[vi++];
      }
      if (chunk.edgeBucket?.straddleEdgeMesh) {
        chunk.edgeBucket.straddleEdgeMesh.visible = savedVis[vi++];
      }
      for (let bi = 0; bi < chunk.buckets.length; bi++) {
        const b = chunk.buckets[bi];
        if (b.solidMesh) {
          b.solidMesh.visible = savedVis[vi++];
          b.solidMesh.material = savedMats[mi++];
        }
        if (b.straddleMesh) {
          b.straddleMesh.visible = savedVis[vi++];
          b.straddleMesh.material = savedMats[mi++];
        }
      }
    }
    overlayGroup.visible = prevOverlayVis;
    this.highFloorMesh.visible = prevFloorVis;
  }

  private renderPostPass(
    mat: THREE.RawShaderMaterial,
    target: THREE.WebGLRenderTarget | null,
    clear = true
  ): void {
    this.postQuad.material = mat;
    this.renderer.setRenderTarget(target);
    if (clear) this.renderer.clear();
    this.renderer.render(this.postScene, this.postCam);
  }

  public render(args: UltraRenderArgs): void {
    const { quality, scene, camera, controlsTarget, matRegistry, explode, setSubPass } = args;
    const isUltra = quality === 'ultra' && this.healthy;
    const isMob = GPU_PROFILE.isMobile;
    const shadowRes = isUltra ? (isMob ? 1024 : 2048) : 1024;

    const bounds = this.computeActiveBounds(args.activePickRecords, args.isPartVisible);
    const floorY = bounds.minY - Math.max(0.14, bounds.radius * 0.004);
    const floorFade =
      THREE.MathUtils.clamp(1.0 - (explode - 0.04) / 0.24, 0, 1) *
      THREE.MathUtils.smoothstep(camera.position.y, floorY + 0.5, floorY + Math.max(4.0, bounds.radius * 0.22));

    this.ensureShadowTarget(shadowRes);
    this.updateShadowCamera(bounds.center, bounds.radius, shadowRes);

    const normalOffsetBias = Math.max(0.06, bounds.radius * (isUltra ? 0.0032 : 0.0048));
    const shadowStrength = isUltra ? 0.88 : 0.72;
    const pcssSearch = isMob ? 5.5 : 7.5;

    matRegistry.uniforms.uQualityTier.value = isUltra ? 2 : 1;
    matRegistry.uniforms.uLightViewProj.value.copy(this.lightViewProj);
    matRegistry.uniforms.uShadowParams.value.set(
      normalOffsetBias,
      1.0 / shadowRes,
      shadowStrength,
      pcssSearch
    );

    const prevBg = scene.background;
    const prevAutoClear = this.renderer.autoClear;
    setSubPass(true);

    try {
      // -----------------------------------------------------------------------
      // PASS 1: Tight-Frustum Depth-Only Shadow Map (HIGH 1024px / ULTRA 2048px)
      // -----------------------------------------------------------------------
      // Unbind shadow map during shadow render to prevent any WebGL2 feedback loop!
      matRegistry.uniforms.uShadowMap.value = matRegistry.dummyShadowTex;
      scene.background = null;
      this.renderer.setRenderTarget(this.shadowTarget);
      this.renderer.setClearColor(0xffffff, 1);
      this.renderer.clear(true, true, false);
      this.renderChunksWithOverride('shadow', args);

      // Bind completed shadow map depth texture for all downstream passes!
      matRegistry.uniforms.uShadowMap.value = this.shadowTarget!.depthTexture!;

      if (!isUltra) {
        // ---------------------------------------------------------------------
        // HIGH TIER: Seamless White Shadow-Catching Studio Floor + Direct sRGB
        // ---------------------------------------------------------------------
        matRegistry.uniforms.uHdrLinearOutput.value = 0;
        const floorSpan = bounds.radius * 6.0;
        this.highFloorMesh.position.set(bounds.center.x, floorY, bounds.center.z);
        this.highFloorMesh.scale.set(floorSpan, 1, floorSpan);
        this.highFloorMesh.updateMatrixWorld(true);
        this.highFloorMat.uniforms.uFloorCenterRad.value.set(
          bounds.center.x,
          floorY,
          bounds.center.z,
          bounds.radius
        );
        this.highFloorMat.uniforms.uFloorFade.value = floorFade;
        this.highFloorMesh.visible = floorFade > 0.005;

        scene.background = prevBg;
        this.renderer.setRenderTarget(null);
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.render(scene, camera);
        this.highFloorMesh.visible = false;
        return;
      }

      // -----------------------------------------------------------------------
      // ULTRA TIER: Planar Reflections + G-Buffer + Linear HDR + SSR + GTAO +
      //             Ray-Traced Contact Shadows + 4-Mip Physical Bloom + AgX + FXAA
      // -----------------------------------------------------------------------
      this.ensureUltraResources();
      this.highFloorMesh.visible = false;

      // PASS 2: Planar Mirror Studio Table Reflection (exact right-handed mirrored camera!)
      if (floorFade > 0.005 && this.reflectTarget) {
        _reflCamPos.set(camera.position.x, 2 * floorY - camera.position.y, camera.position.z);
        _reflTarget.set(controlsTarget.x, 2 * floorY - controlsTarget.y, controlsTarget.z);
        this.reflectCamera.fov = camera.fov;
        this.reflectCamera.aspect = camera.aspect;
        this.reflectCamera.near = camera.near;
        this.reflectCamera.far = camera.far;
        this.reflectCamera.position.copy(_reflCamPos);
        this.reflectCamera.up.set(0, 1, 0);
        this.reflectCamera.lookAt(_reflTarget);
        this.reflectCamera.updateProjectionMatrix();
        this.reflectCamera.updateMatrixWorld(true);
        _reflViewProj.multiplyMatrices(
          this.reflectCamera.projectionMatrix,
          this.reflectCamera.matrixWorldInverse
        );

        matRegistry.syncViewProj(this.reflectCamera);
        matRegistry.uniforms.uHdrLinearOutput.value = 0;

        const prevOverlayVis = args.overlayGroup.visible;
        args.overlayGroup.visible = false;
        const savedEdgeVis: boolean[] = [];
        for (let ci = 0; ci < args.activeChunks.length; ci++) {
          const ch = args.activeChunks[ci];
          if (ch.edgeLines) {
            savedEdgeVis.push(ch.edgeLines.visible);
            ch.edgeLines.visible = false;
          }
          if (ch.edgeBucket?.straddleEdgeMesh) {
            savedEdgeVis.push(ch.edgeBucket.straddleEdgeMesh.visible);
            ch.edgeBucket.straddleEdgeMesh.visible = false;
          }
        }

        scene.background = null;
        this.renderer.setRenderTarget(this.reflectTarget);
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.clear(true, true, false);
        this.renderer.render(scene, this.reflectCamera);

        let ei = 0;
        for (let ci = 0; ci < args.activeChunks.length; ci++) {
          const ch = args.activeChunks[ci];
          if (ch.edgeLines) ch.edgeLines.visible = savedEdgeVis[ei++];
          if (ch.edgeBucket?.straddleEdgeMesh) {
            ch.edgeBucket.straddleEdgeMesh.visible = savedEdgeVis[ei++];
          }
        }
        args.overlayGroup.visible = prevOverlayVis;

        // Restore main camera matrices immediately!
        matRegistry.syncViewProj(camera);
      }

      // PASS 3: View-Space G-Buffer (OctNormal + Roughness + Metalness)
      scene.background = null;
      this.renderer.setRenderTarget(this.gbufTarget);
      this.renderer.setClearColor(0x808080, 0);
      this.renderer.clear(true, true, false);
      this.renderChunksWithOverride('gbuf', args);

      // PASS 4: Main 16-Bit HalfFloat Linear HDR Scene Pass (RGBA16F + Hardware DepthTexture)
      matRegistry.uniforms.uHdrLinearOutput.value = 1;
      scene.background = null;
      this.renderer.setRenderTarget(this.hdrTarget);
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.clear(true, true, false);
      this.renderer.render(scene, camera);

      // PASS 5: Screen-Space Ray Tracing (SSR Glossy Reflections + GTAO + Micro-Contact Shadows)
      _invProj.copy(camera.projectionMatrix).invert();
      _invViewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).invert();
      _normalMatrix.getNormalMatrix(camera.matrixWorldInverse);
      _keyDirView.copy(STUDIO_KEY_DIR).applyMatrix3(_normalMatrix).normalize();

      const ssrU = this.ssrMat!.uniforms;
      ssrU.uProj.value.copy(camera.projectionMatrix);
      ssrU.uInvProj.value.copy(_invProj);
      ssrU.uSceneRadius.value = bounds.radius;
      ssrU.uCamNear.value = camera.near;
      this.renderPostPass(this.ssrMat!, this.ssrTarget, true);

      const aoU = this.aoContactMat!.uniforms;
      aoU.uProj.value.copy(camera.projectionMatrix);
      aoU.uInvProj.value.copy(_invProj);
      aoU.uKeyDirView.value.copy(_keyDirView);
      aoU.uSceneRadius.value = bounds.radius;
      aoU.uAspectScale.value.set(1.0 / Math.max(0.25, camera.aspect), 1.0);
      this.renderPostPass(this.aoContactMat!, this.aoTarget, true);

      // PASS 6: Depth-Aware Bilateral Denoise (AO/Contact Shadows + SSR Roughness Blur)
      const rw = this.aoTarget!.width;
      const rh = this.aoTarget!.height;
      const biU = this.bilateralMat!.uniforms;
      biU.uDepthSharpness.value = 460.0;
      biU.uSource.value = this.aoTarget!.texture;
      biU.uTexelStep.value.set(1.35 / rw, 0);
      this.renderPostPass(this.bilateralMat!, this.aoBlurA, true);
      biU.uSource.value = this.aoBlurA!.texture;
      biU.uTexelStep.value.set(0, 1.35 / rh);
      this.renderPostPass(this.bilateralMat!, this.aoBlurB, true);

      biU.uDepthSharpness.value = 320.0;
      biU.uSource.value = this.ssrTarget!.texture;
      biU.uTexelStep.value.set(1.15 / rw, 0);
      this.renderPostPass(this.bilateralMat!, this.ssrBlurA, true);
      biU.uSource.value = this.ssrBlurA!.texture;
      biU.uTexelStep.value.set(0, 1.15 / rh);
      this.renderPostPass(this.bilateralMat!, this.ssrBlurB, true);

      // PASS 7: Geometry-Masked 4-Mip Physical Kawase/Jimenez HDR Bloom
      this.renderPostPass(this.bloomPrefilterMat!, this.bloomMips[0], true);
      for (let i = 1; i < this.bloomMips.length; i++) {
        const prev = this.bloomMips[i - 1];
        this.bloomDownMat!.uniforms.uSource.value = prev.texture;
        this.bloomDownMat!.uniforms.uTexelSize.value.set(1 / prev.width, 1 / prev.height);
        this.renderPostPass(this.bloomDownMat!, this.bloomMips[i], true);
      }
      this.renderer.autoClear = false;
      for (let i = this.bloomMips.length - 1; i >= 1; i--) {
        const src = this.bloomMips[i];
        const dst = this.bloomMips[i - 1];
        this.bloomUpMat!.uniforms.uSource.value = src.texture;
        this.bloomUpMat!.uniforms.uTexelSize.value.set(1 / src.width, 1 / src.height);
        this.renderPostPass(this.bloomUpMat!, dst, false);
      }
      this.renderer.autoClear = prevAutoClear;

      // PASS 8: Final ULTRA HDR Composite (Analytical Floor + SSR + GTAO + Contact + Bloom + AgX)
      const cU = this.compositeMat!.uniforms;
      cU.uShadowMap.value = this.shadowTarget!.depthTexture!;
      cU.uInvProj.value.copy(_invProj);
      cU.uInvViewProj.value.copy(_invViewProj);
      cU.uCamPos.value.copy(camera.position);
      cU.uShadowParams.value.copy(matRegistry.uniforms.uShadowParams.value);
      cU.uFloorCenterRad.value.set(bounds.center.x, floorY, bounds.center.z, bounds.radius);
      cU.uFloorFade.value = floorFade;
      this.renderPostPass(this.compositeMat!, this.tonemappedTarget, true);

      // PASS 9: FXAA 3.11 Edge Anti-Aliasing -> Screen
      this.renderPostPass(this.fxaaMat!, null, true);
    } catch (err) {
      // Self-healing safety net: if ANY GPU driver rejects ULTRA FBOs, fall back cleanly so parts NEVER vanish!
      console.error('[UltraRaytraceHdrPipeline] fallback triggered:', err);
      this.healthy = false;
      matRegistry.uniforms.uQualityTier.value = 0;
      matRegistry.uniforms.uHdrLinearOutput.value = 0;
      matRegistry.uniforms.uShadowMap.value = matRegistry.dummyShadowTex;
      scene.background = prevBg;
      this.renderer.setRenderTarget(null);
      this.renderer.render(scene, camera);
    } finally {
      this.renderer.autoClear = prevAutoClear;
      scene.background = prevBg;
      matRegistry.uniforms.uHdrLinearOutput.value = 0;
      this.renderer.setRenderTarget(null);
      setSubPass(false);
    }
  }

  public handleContextRestored(): void {
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    this.hasHalfFloatRT = Boolean(
      gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float')
    );
    this.healthy = true;
    this.highFloorMat.needsUpdate = true;
    if (this.ssrMat) this.ssrMat.needsUpdate = true;
    if (this.aoContactMat) this.aoContactMat.needsUpdate = true;
    if (this.bilateralMat) this.bilateralMat.needsUpdate = true;
    if (this.bloomPrefilterMat) this.bloomPrefilterMat.needsUpdate = true;
    if (this.bloomDownMat) this.bloomDownMat.needsUpdate = true;
    if (this.bloomUpMat) this.bloomUpMat.needsUpdate = true;
    if (this.compositeMat) this.compositeMat.needsUpdate = true;
    if (this.fxaaMat) this.fxaaMat.needsUpdate = true;
  }

  public dispose(): void {
    this.shadowTarget?.dispose();
    this.hdrTarget?.dispose();
    this.gbufTarget?.dispose();
    this.reflectTarget?.dispose();
    this.ssrTarget?.dispose();
    this.ssrBlurA?.dispose();
    this.ssrBlurB?.dispose();
    this.aoTarget?.dispose();
    this.aoBlurA?.dispose();
    this.aoBlurB?.dispose();
    this.tonemappedTarget?.dispose();
    for (const m of this.bloomMips) m.dispose();
    this.bloomMips.length = 0;

    this.fsTriGeo.dispose();
    this.highFloorMesh.geometry.dispose();
    this.highFloorMat.dispose();
    this.ssrMat?.dispose();
    this.aoContactMat?.dispose();
    this.bilateralMat?.dispose();
    this.bloomPrefilterMat?.dispose();
    this.bloomDownMat?.dispose();
    this.bloomUpMat?.dispose();
    this.compositeMat?.dispose();
    this.fxaaMat?.dispose();
  }
}
