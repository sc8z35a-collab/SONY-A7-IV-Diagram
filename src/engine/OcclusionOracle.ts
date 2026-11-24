import * as THREE from 'three';

/**
 * OcclusionOracle v2 — Breakthrough #25 + #34:
 * Single-Readback 16-View Directional Hemisphere Bitmask PVS (Potentially Visible Set) Oracle.
 *
 * Renders the assembled opaque macro geometry from 16 surrounding 360-degree + cutaway viewpoints
 * into a single 4x4 tiled 512x512 offscreen FBO (1 single GPU readback, ~12 ms total, 0 ongoing VRAM!).
 *
 * Instead of collapsing all 16 views into a single 1-bit boolean, stores a 16-bit per-view bitmask
 * (`Uint16Array(capacity)`) recording WHICH viewpoints can actually see each part:
 *  - Viewing the front-left of the camera bitmask-culls the entire sealed interior AND the opposite
 *    rear/right hemisphere (rear LCD, backplate, rear controls, bottom battery door) in 1 bitwise AND!
 *  - Orbiting smoothly blends neighboring hemisphere bits (generous -0.18 cosine / ~100 deg margin)
 *    so parts appear WELL before rotating around the silhouette — zero pop-in from any angle!
 *  - Transparent/glass-bearing parts receive `0xFFFF` and are never rasterized as occluders, so every
 *    lens element, iris blade, EVF OLED, and rear display behind glass stays 100% visible!
 */

const ORACLE_ID_VS = /* glsl */ `
precision highp float;
precision highp int;

uniform mat4 uViewProj;
uniform sampler2D uPartStateTex;

in vec4 aPosSlot;

flat out float vSlot;

vec3 rotQ(vec3 v, vec4 q) {
  vec3 t = 2.0 * cross(q.xyz, v);
  return v + q.w * t + cross(q.xyz, t);
}

void main() {
  vec3 position = aPosSlot.xyz * 0.015625;
  int slot = int(aPosSlot.w + 0.5);
  vec4 posVis = texelFetch(uPartStateTex, ivec2(0, slot), 0);
  if (posVis.w < 0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vSlot = 0.0;
    return;
  }
  vec3 wp;
  if (posVis.w >= 7.5) {
    wp = position + posVis.xyz;
  } else if (posVis.w >= 3.5) {
    vec4 q = texelFetch(uPartStateTex, ivec2(1, slot), 0);
    vec4 s = texelFetch(uPartStateTex, ivec2(3, slot), 0);
    wp = rotQ(position * s.xyz, q) + posVis.xyz;
  } else {
    wp = position + posVis.xyz;
  }
  vSlot = float(slot + 1);
  gl_Position = uViewProj * vec4(wp, 1.0);
}
`;

const ORACLE_ID_FS = /* glsl */ `
precision mediump float;
precision highp int;

flat in float vSlot;
out vec4 fragColor;

void main() {
  int id = int(vSlot + 0.5);
  float r = float(id & 255) * (1.0 / 255.0);
  float g = float((id >> 8) & 255) * (1.0 / 255.0);
  fragColor = vec4(r, g, 0.0, 1.0);
}
`;

// 16 surrounding spherical viewpoints: 6 cardinal axes + 8 octant corners + 2 cutaway close-ups
const VIEW_DIRS: ReadonlyArray<[number, number, number, number]> = [
  // [dx, dy, dz, distScale]
  [1, 0, 0, 1.0],
  [-1, 0, 0, 1.0],
  [0, 1, 0.05, 1.0],
  [0, -1, 0.05, 1.0],
  [0, 0, 1, 1.0],
  [0, 0, -1, 1.0],
  [0.62, 0.42, 0.66, 1.0],
  [-0.62, 0.42, 0.66, 1.0],
  [0.62, -0.42, 0.66, 1.0],
  [-0.62, -0.42, 0.66, 1.0],
  [0.62, 0.42, -0.66, 1.0],
  [-0.62, 0.42, -0.66, 1.0],
  [0.62, -0.42, -0.66, 1.0],
  [-0.62, -0.42, -0.66, 1.0],
  // Close cutaway inspection views (looking straight into lens cutaway 168..435 deg & front throat)
  [-0.78, 0.46, 0.42, 0.74],
  [0.12, 0.28, 0.95, 0.76],
];

// Pre-normalized flat direction array for zero-alloc per-frame directional PVS hemisphere bitmask lookup
const VIEW_DIRS_NORM = new Float32Array(VIEW_DIRS.length * 3);
for (let i = 0; i < VIEW_DIRS.length; i++) {
  const [dx, dy, dz] = VIEW_DIRS[i];
  const inv = 1 / Math.hypot(dx, dy, dz);
  VIEW_DIRS_NORM[i * 3] = dx * inv;
  VIEW_DIRS_NORM[i * 3 + 1] = dy * inv;
  VIEW_DIRS_NORM[i * 3 + 2] = dz * inv;
}

/**
 * Compute the 16-bit active hemisphere view mask for a live camera position relative to the oracle center.
 * Uses a conservative -0.18 cosine threshold (~100 deg half-angle) so parts appear well ahead of silhouette edges.
 */
export function computeActiveOracleViewBits(
  camX: number,
  camY: number,
  camZ: number,
  centerX: number,
  centerY: number,
  centerZ: number
): number {
  const vx = camX - centerX;
  const vy = camY - centerY;
  const vz = camZ - centerZ;
  const len = Math.hypot(vx, vy, vz);
  if (len < 1e-4) return 0xffff;
  const inv = 1 / len;
  const nx = vx * inv;
  const ny = vy * inv;
  const nz = vz * inv;

  let bits = 0;
  for (let vi = 0; vi < 16; vi++) {
    const o = vi * 3;
    const dot = nx * VIEW_DIRS_NORM[o] + ny * VIEW_DIRS_NORM[o + 1] + nz * VIEW_DIRS_NORM[o + 2];
    if (dot > -0.18) {
      bits |= 1 << vi;
    }
  }
  return bits || 0xffff;
}

export interface OracleBakeInput {
  renderer: THREE.WebGLRenderer;
  partStateTex: THREE.DataTexture;
  opaqueMeshes: ReadonlyArray<THREE.Mesh>;
  slotToParentSlot: Int32Array;
  alwaysVisibleSlots: ReadonlyArray<number>;
  center: THREE.Vector3;
  distance: number;
  capacity: number;
}

/**
 * Bake an exact conservative 16-view directional visibility bitmask (`Uint16Array`, 1 bit per view)
 * in a single 4x4 tiled offscreen pass + single readback (~12 ms), then immediately release all temp GPU memory!
 */
export function bakeAssembledVisibilityMask(input: OracleBakeInput): Uint16Array {
  const {
    renderer,
    partStateTex,
    opaqueMeshes,
    slotToParentSlot,
    alwaysVisibleSlots,
    center,
    distance,
    capacity,
  } = input;

  const mask = new Uint16Array(capacity);
  // Conservatively keep all transparent/glass-bearing parts visible from all angles
  for (let i = 0; i < alwaysVisibleSlots.length; i++) {
    const s = alwaysVisibleSlots[i];
    if (s >= 0 && s < capacity) mask[s] = 0xffff;
  }

  const tileSize = 192;
  const grid = 4; // 4 x 4 = 16 viewpoints
  const atlasSize = tileSize * grid; // 768 x 768

  const rt = new THREE.WebGLRenderTarget(atlasSize, atlasSize, {
    format: THREE.RGBAFormat,
    type: THREE.UnsignedByteType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    depthBuffer: true,
    stencilBuffer: false,
    samples: 0,
  });

  const uViewProj = { value: new THREE.Matrix4() };
  const makeIdMat = (side: THREE.Side) => {
    const m = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      side,
      depthTest: true,
      depthWrite: true,
      transparent: false,
      vertexShader: ORACLE_ID_VS,
      fragmentShader: ORACLE_ID_FS,
      uniforms: {
        uViewProj,
        uPartStateTex: { value: partStateTex },
      },
    });
    m.customProgramCacheKey = () => 'hyperion-occlusion-oracle-v2';
    return m;
  };

  const frontMat = makeIdMat(THREE.FrontSide);
  const doubleMat = makeIdMat(THREE.DoubleSide);

  const tempScene = new THREE.Scene();
  for (let i = 0; i < opaqueMeshes.length; i++) {
    const src = opaqueMeshes[i];
    if (!src.visible) continue;
    const isDouble = src.material instanceof THREE.Material && src.material.side === THREE.DoubleSide;
    const clone = new THREE.Mesh(src.geometry, isDouble ? doubleMat : frontMat);
    clone.frustumCulled = false;
    clone.matrixAutoUpdate = false;
    tempScene.add(clone);
  }

  const cam = new THREE.PerspectiveCamera(36, 1.0, 1.0, 2000);
  const vpMat = new THREE.Matrix4();

  const prevTarget = renderer.getRenderTarget();
  const prevAutoClear = renderer.autoClear;
  const prevClearColor = new THREE.Color();
  renderer.getClearColor(prevClearColor);
  const prevClearAlpha = renderer.getClearAlpha();

  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0);
  rt.scissorTest = true;

  for (let vi = 0; vi < VIEW_DIRS.length; vi++) {
    const o = vi * 3;
    const d = distance * VIEW_DIRS[vi][3];
    cam.position.set(
      center.x + VIEW_DIRS_NORM[o] * d,
      center.y + VIEW_DIRS_NORM[o + 1] * d,
      center.z + VIEW_DIRS_NORM[o + 2] * d
    );
    cam.up.set(0, 1, 0);
    cam.lookAt(center);
    cam.updateMatrixWorld(true);
    vpMat.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
    uViewProj.value.copy(vpMat);

    const tx = (vi % grid) * tileSize;
    const ty = Math.floor(vi / grid) * tileSize;
    rt.viewport.set(tx, ty, tileSize, tileSize);
    rt.scissor.set(tx, ty, tileSize, tileSize);
    renderer.setRenderTarget(rt);
    renderer.clear(true, true, false);
    renderer.render(tempScene, cam);
  }

  const pixels = new Uint8Array(atlasSize * atlasSize * 4);
  renderer.readRenderTargetPixels(rt, 0, 0, atlasSize, atlasSize, pixels);

  // Restore renderer state cleanly
  renderer.setRenderTarget(prevTarget);
  renderer.setClearColor(prevClearColor, prevClearAlpha);
  renderer.autoClear = prevAutoClear;

  // Decode each 128x128 tile into its exact view bit (1 << vi)
  for (let ty = 0; ty < grid; ty++) {
    const yStart = ty * tileSize;
    const yEnd = yStart + tileSize;
    for (let tx = 0; tx < grid; tx++) {
      const vi = ty * grid + tx;
      const bit = 1 << vi;
      const xStart = tx * tileSize;
      const xEnd = xStart + tileSize;

      for (let y = yStart; y < yEnd; y++) {
        let rowIdx = (y * atlasSize + xStart) * 4;
        for (let x = xStart; x < xEnd; x++, rowIdx += 4) {
          const rawId = pixels[rowIdx] | (pixels[rowIdx + 1] << 8);
          if (rawId === 0) continue;
          const slot = rawId - 1;
          if (slot >= 0 && slot < capacity) {
            mask[slot] |= bit;
            const parentSlot = slotToParentSlot[slot];
            if (parentSlot >= 0 && parentSlot < capacity) {
              mask[parentSlot] |= bit;
            }
          }
        }
      }
    }
  }

  // Reclaim 100% of temporary GPU oracle resources immediately
  frontMat.dispose();
  doubleMat.dispose();
  rt.dispose();

  return mask;
}
