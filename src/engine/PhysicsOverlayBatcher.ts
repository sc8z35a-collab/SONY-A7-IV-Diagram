import * as THREE from 'three';
import { retessellatePrimitiveSagitta } from './FastCadGeometry';

/**
 * PhysicsOverlayBatcher v7 (OMEGA-CAD v7 — OMEGA-4):
 * - Dual-Channel Static/Explode-Guide vs Live-Physics Separation (`syncGuides` vs `syncPhysics` -> 0 guide CPU/upload during live physics!)
 * - Triple-Buffered 3-VBO Ring (`TripleSlimOverlayRing`) -> 0 VAO rebuilds & 0 ANGLE/Vulkan in-flight VBO stalls!
 * - Zero-Discard `step(fract(...))` Alpha Dashed Line Shader -> restores 100% Hardware Early-Z on occluded guides & rays!
 * - 4-Triangle Tetrahedron Particle Substitution + Pure Scalar Line Transform Loop (zero per-vertex Vector3 calls!).
 */

const OVERLAY_LINEAR_TO_SRGB_U8 = new Uint8Array(256);
for (let i = 0; i < 256; i++) {
  const c = i / 255;
  const s = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  OVERLAY_LINEAR_TO_SRGB_U8[i] = Math.max(0, Math.min(255, Math.round(s * 255)));
}

function linearColorToSrgbU8(v: number): number {
  const idx = v <= 0 ? 0 : v >= 1 ? 255 : Math.round(v * 255);
  return OVERLAY_LINEAR_TO_SRGB_U8[idx];
}

function buildOverlayMeshVs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
uniform mat4 uViewProj;
${useClip ? 'uniform vec4 uClipPlane;' : ''}
in vec3 position;
in vec4 aColor;
out vec4 vColor;
${useClip ? 'out float vClipDist;' : ''}
void main() {
  vColor = aColor;
  ${useClip ? 'vClipDist = dot(position, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uViewProj * vec4(position, 1.0);
}
`;
}

function buildOverlayMeshFs(useClip: boolean): string {
  return /* glsl */ `
precision mediump float;
in vec4 vColor;
${useClip ? 'in float vClipDist;' : ''}
out vec4 fragColor;
void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}
  fragColor = vColor;
}
`;
}

function buildOverlayLineVs(useClip: boolean): string {
  return /* glsl */ `
precision highp float;
uniform mat4 uViewProj;
${useClip ? 'uniform vec4 uClipPlane;' : ''}
in vec3 position;
in vec4 aColor;
in vec3 aDash;
out vec4 vColor;
out vec3 vDash;
${useClip ? 'out float vClipDist;' : ''}
void main() {
  vColor = aColor;
  vDash = aDash;
  ${useClip ? 'vClipDist = dot(position, uClipPlane.xyz) + uClipPlane.w;' : ''}
  gl_Position = uViewProj * vec4(position, 1.0);
}
`;
}

// OMEGA-4C: Zero-Discard Alpha Masking when `!useClip` -> 100% Hardware Early-Z on occluded dashed lines!
function buildOverlayLineFs(useClip: boolean): string {
  return /* glsl */ `
precision mediump float;
in vec4 vColor;
in vec3 vDash;
${useClip ? 'in float vClipDist;' : ''}
out vec4 fragColor;
void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}
  float mask = vDash.z > 0.0 ? step(fract(vDash.x * vDash.z), vDash.y) : 1.0;
  fragColor = vec4(vColor.rgb, vColor.a * mask);
}
`;
}

export interface OverlaySource {
  isAssemblyVisible: () => boolean;
  root: THREE.Object3D;
}

const _instMat = new THREE.Matrix4();
const _worldMat = new THREE.Matrix4();

// Pre-flattened unit 4-triangle tetrahedron for sub-1.25mm photon/electron/LED dots (-50% tris vs octahedron!)
const _unitTetraFlat = (() => {
  const tet = new THREE.TetrahedronGeometry(1.08, 0);
  const pos = tet.getAttribute('position');
  const out = new Float32Array(pos.count * 3);
  out.set(pos.array as Float32Array);
  tet.dispose();
  return out;
})();

interface OverlayVboSlot {
  pos: Float32Array;
  col: Uint8Array;
  dash: Float32Array | null;
  capacityVerts: number;
  geo: THREE.BufferGeometry;
  posAttr: THREE.BufferAttribute;
  colAttr: THREE.BufferAttribute;
  dashAttr: THREE.BufferAttribute | null;
}

class QuadSlimOverlayRing {
  private readonly slots: [OverlayVboSlot, OverlayVboSlot, OverlayVboSlot, OverlayVboSlot];
  private readonly hasDash: boolean;
  public ringIdx: 0 | 1 | 2 | 3 = 0;
  public count = 0;
  private lastRotatedEpoch = -1;

  constructor(initialVerts: number, hasDash: boolean) {
    this.hasDash = hasDash;
    this.slots = [
      this.makeSlot(initialVerts),
      this.makeSlot(initialVerts),
      this.makeSlot(initialVerts),
      this.makeSlot(initialVerts),
    ];
  }

  private makeSlot(cap: number): OverlayVboSlot {
    const pos = new Float32Array(cap * 3);
    const col = new Uint8Array(cap * 4);
    const dash = this.hasDash ? new Float32Array(cap * 3) : null;

    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(pos, 3);
    const colAttr = new THREE.BufferAttribute(col, 4, true);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    colAttr.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('position', posAttr);
    geo.setAttribute('aColor', colAttr);

    let dashAttr: THREE.BufferAttribute | null = null;
    if (this.hasDash && dash) {
      dashAttr = new THREE.BufferAttribute(dash, 3);
      dashAttr.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute('aDash', dashAttr);
    }
    geo.setDrawRange(0, 0);

    return { pos, col, dash, capacityVerts: cap, geo, posAttr, colAttr, dashAttr };
  }

  public beginFrame(epoch: number): OverlayVboSlot {
    if (this.lastRotatedEpoch !== epoch) {
      this.ringIdx = ((this.ringIdx + 1) & 3) as 0 | 1 | 2 | 3;
      this.lastRotatedEpoch = epoch;
    }
    this.count = 0;
    return this.slots[this.ringIdx];
  }

  public get currentSlot(): OverlayVboSlot {
    return this.slots[this.ringIdx];
  }

  public ensureCapacity(neededVerts: number): OverlayVboSlot {
    const s = this.slots[this.ringIdx];
    if (neededVerts <= s.capacityVerts) return s;

    let nextCap = s.capacityVerts;
    while (nextCap < neededVerts) nextCap *= 2;

    const nextSlot = this.makeSlot(nextCap);
    nextSlot.pos.set(s.pos.subarray(0, this.count * 3));
    nextSlot.col.set(s.col.subarray(0, this.count * 4));
    if (this.hasDash && s.dash && nextSlot.dash) {
      nextSlot.dash.set(s.dash.subarray(0, this.count * 3));
    }
    s.geo.dispose();
    this.slots[this.ringIdx] = nextSlot;
    return nextSlot;
  }

  public commitTo(target: THREE.Mesh | THREE.LineSegments): void {
    const s = this.slots[this.ringIdx];
    s.geo.setDrawRange(0, this.count);
    target.geometry = s.geo;
    if (this.count > 0) {
      s.posAttr.clearUpdateRanges();
      s.posAttr.addUpdateRange(0, this.count * 3);
      s.posAttr.needsUpdate = true;

      s.colAttr.clearUpdateRanges();
      s.colAttr.addUpdateRange(0, this.count * 4);
      s.colAttr.needsUpdate = true;

      if (s.dashAttr) {
        s.dashAttr.clearUpdateRanges();
        s.dashAttr.addUpdateRange(0, this.count * 3);
        s.dashAttr.needsUpdate = true;
      }
      target.visible = true;
    } else {
      target.visible = false;
    }
  }

  public dispose(): void {
    for (let i = 0; i < 4; i++) {
      this.slots[i].geo.dispose();
    }
  }
}

export class PhysicsOverlayBatcher {
  public readonly group: THREE.Group;
  private renderEpoch = 0;

  // Channel A: Static / Explode-Factor Driven Trajectory Guides (updated ONLY when explode/visibility changes!)
  private readonly guideMeshRing: QuadSlimOverlayRing;
  private readonly guideLineRing: QuadSlimOverlayRing;
  private readonly guideMeshBatch: THREE.Mesh;
  private readonly guideLineBatch: THREE.LineSegments;

  // Channel B: Live 60fps Physics Overlays (updated ONLY when physics/lens sim advances!)
  private readonly physMeshRing: QuadSlimOverlayRing;
  private readonly physLineRing: QuadSlimOverlayRing;
  private readonly physMeshBatch: THREE.Mesh;
  private readonly physLineBatch: THREE.LineSegments;

  private readonly meshMatNoClip: THREE.RawShaderMaterial;
  private readonly lineMatNoClip: THREE.RawShaderMaterial;
  private meshMatClip: THREE.RawShaderMaterial | null = null;
  private lineMatClip: THREE.RawShaderMaterial | null = null;
  private readonly viewProjUniform: { value: THREE.Matrix4 };
  private readonly clipPlaneUniform: { value: THREE.Vector4 };
  private readonly flatTriCache = new WeakMap<THREE.BufferGeometry, Float32Array>();

  constructor(
    viewProjUniform: { value: THREE.Matrix4 },
    clipPlaneUniform: { value: THREE.Vector4 }
  ) {
    this.viewProjUniform = viewProjUniform;
    this.clipPlaneUniform = clipPlaneUniform;
    this.group = new THREE.Group();
    this.group.matrixAutoUpdate = false;

    this.guideMeshRing = new QuadSlimOverlayRing(4096, false);
    this.guideLineRing = new QuadSlimOverlayRing(2048, true);
    this.physMeshRing = new QuadSlimOverlayRing(16384, false);
    this.physLineRing = new QuadSlimOverlayRing(4096, true);

    this.meshMatNoClip = this.createMeshMat(false);
    this.lineMatNoClip = this.createLineMat(false);

    const makeBatchMesh = (geo: THREE.BufferGeometry, order: number) => {
      const m = new THREE.Mesh(geo, this.meshMatNoClip);
      m.frustumCulled = false;
      m.matrixAutoUpdate = false;
      m.renderOrder = order;
      m.visible = false;
      return m;
    };
    const makeBatchLine = (geo: THREE.BufferGeometry, order: number) => {
      const l = new THREE.LineSegments(geo, this.lineMatNoClip);
      l.frustumCulled = false;
      l.matrixAutoUpdate = false;
      l.renderOrder = order;
      l.visible = false;
      return l;
    };

    this.guideMeshBatch = makeBatchMesh(this.guideMeshRing.currentSlot.geo, 3);
    this.guideLineBatch = makeBatchLine(this.guideLineRing.currentSlot.geo, 4);
    this.physMeshBatch = makeBatchMesh(this.physMeshRing.currentSlot.geo, 3.1);
    this.physLineBatch = makeBatchLine(this.physLineRing.currentSlot.geo, 4.1);

    this.group.add(
      this.guideMeshBatch,
      this.guideLineBatch,
      this.physMeshBatch,
      this.physLineBatch
    );
  }

  private createMeshMat(useClip: boolean): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = { uViewProj: this.viewProjUniform };
    if (useClip) uniforms.uClipPlane = this.clipPlaneUniform;
    const m = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexShader: buildOverlayMeshVs(useClip),
      fragmentShader: buildOverlayMeshFs(useClip),
      uniforms,
    });
    m.customProgramCacheKey = () => `omega-overlay-mesh-v7-${useClip ? 'c' : 'nc'}`;
    return m;
  }

  private createLineMat(useClip: boolean): THREE.RawShaderMaterial {
    const uniforms: Record<string, { value: unknown }> = { uViewProj: this.viewProjUniform };
    if (useClip) uniforms.uClipPlane = this.clipPlaneUniform;
    const m = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexShader: buildOverlayLineVs(useClip),
      fragmentShader: buildOverlayLineFs(useClip),
      uniforms,
    });
    m.customProgramCacheKey = () => `omega-overlay-line-v7-${useClip ? 'c' : 'nc'}`;
    return m;
  }

  public setSectionCutActive(active: boolean): void {
    if (active) {
      this.meshMatClip ??= this.createMeshMat(true);
      this.lineMatClip ??= this.createLineMat(true);
      this.guideMeshBatch.material = this.meshMatClip;
      this.physMeshBatch.material = this.meshMatClip;
      this.guideLineBatch.material = this.lineMatClip;
      this.physLineBatch.material = this.lineMatClip;
    } else {
      this.guideMeshBatch.material = this.meshMatNoClip;
      this.physMeshBatch.material = this.meshMatNoClip;
      this.guideLineBatch.material = this.lineMatNoClip;
      this.physLineBatch.material = this.lineMatNoClip;
    }
  }

  private getFlatTriangles(sourceGeo: THREE.BufferGeometry): Float32Array | null {
    const cached = this.flatTriCache.get(sourceGeo);
    if (cached) return cached;

    if (sourceGeo.type === 'SphereGeometry') {
      const p = (sourceGeo as THREE.SphereGeometry).parameters;
      if (p && p.radius <= 1.25) {
        const r = p.radius;
        const out = new Float32Array(_unitTetraFlat.length);
        for (let i = 0; i < _unitTetraFlat.length; i++) out[i] = _unitTetraFlat[i] * r;
        this.flatTriCache.set(sourceGeo, out);
        return out;
      }
    }

    const geo = retessellatePrimitiveSagitta(sourceGeo, 0.22);
    const posAttr = geo.getAttribute('position');
    if (!posAttr || posAttr.count < 3) {
      if (geo !== sourceGeo && !geo.userData.__pooled) geo.dispose();
      return null;
    }
    const idx = geo.getIndex();
    const total = idx ? idx.count : posAttr.count;
    const usable = total - (total % 3);
    if (usable <= 0) {
      if (geo !== sourceGeo && !geo.userData.__pooled) geo.dispose();
      return null;
    }

    const out = new Float32Array(usable * 3);
    const posArr = posAttr.array as Float32Array;
    const stride = posAttr.itemSize;
    const idxArr = idx ? idx.array : null;

    for (let i = 0; i < usable; i++) {
      const vi = (idxArr ? idxArr[i] : i) * stride;
      const o = i * 3;
      out[o] = posArr[vi];
      out[o + 1] = posArr[vi + 1];
      out[o + 2] = posArr[vi + 2];
    }

    if (geo !== sourceGeo && !geo.userData.__pooled) geo.dispose();
    this.flatTriCache.set(sourceGeo, out);
    return out;
  }

  private appendMeshTransformed(
    meshRing: QuadSlimOverlayRing,
    flatVerts: Float32Array,
    mat4: THREE.Matrix4,
    r8: number,
    g8: number,
    b8: number,
    a8: number
  ): void {
    const vCount = flatVerts.length / 3;
    const startV = meshRing.count;
    const slot = meshRing.ensureCapacity(startV + vCount);

    const e = mat4.elements;
    const e0 = e[0], e1 = e[1], e2 = e[2];
    const e4 = e[4], e5 = e[5], e6 = e[6];
    const e8 = e[8], e9 = e[9], e10 = e[10];
    const e12 = e[12], e13 = e[13], e14 = e[14];

    const pos = slot.pos;
    const col = slot.col;

    for (let i = 0; i < vCount; i++) {
      const s3 = i * 3;
      const x = flatVerts[s3];
      const y = flatVerts[s3 + 1];
      const z = flatVerts[s3 + 2];

      const di = startV + i;
      const d3 = di * 3;
      const d4 = di * 4;

      pos[d3] = e0 * x + e4 * y + e8 * z + e12;
      pos[d3 + 1] = e1 * x + e5 * y + e9 * z + e13;
      pos[d3 + 2] = e2 * x + e6 * y + e10 * z + e14;

      col[d4] = r8;
      col[d4 + 1] = g8;
      col[d4 + 2] = b8;
      col[d4 + 3] = a8;
    }

    meshRing.count = startV + vCount;
  }

  private appendLineObject(lineRing: QuadSlimOverlayRing, lineObj: THREE.Line): void {
    const mat = lineObj.material as THREE.LineBasicMaterial | THREE.LineDashedMaterial;
    if (!mat || Array.isArray(mat)) return;
    const alpha = mat.transparent ? mat.opacity : 1.0;
    if (alpha <= 0.005) return;

    const geo = lineObj.geometry;
    const posAttr = geo.getAttribute('position');
    if (!posAttr || posAttr.count < 2) return;

    const drawStart = Math.max(0, geo.drawRange.start);
    const maxAvail = Math.max(0, posAttr.count - drawStart);
    const drawCount = Math.min(maxAvail, geo.drawRange.count);
    if (drawCount < 2) return;

    const isSegments = (lineObj as THREE.LineSegments).isLineSegments === true;
    const isLoop = (lineObj as THREE.LineLoop).isLineLoop === true;
    const isDashed = (mat as THREE.LineDashedMaterial).isLineDashedMaterial === true;
    const dashSize = isDashed ? ((mat as THREE.LineDashedMaterial).dashSize ?? 1.5) : 0;
    const gapSize = isDashed ? ((mat as THREE.LineDashedMaterial).gapSize ?? 1.5) : 0;
    const dashTotal = isDashed ? dashSize + gapSize : 0;
    const invDashTotal = dashTotal > 1e-4 ? 1.0 / dashTotal : 0;
    const dashRatio = dashTotal > 1e-4 ? dashSize * invDashTotal : 1.0;

    const c = mat.color;
    const r8 = linearColorToSrgbU8(c.r);
    const g8 = linearColorToSrgbU8(c.g);
    const b8 = linearColorToSrgbU8(c.b);
    const a8 = Math.max(0, Math.min(255, Math.round(alpha * 255)));

    const me = lineObj.matrixWorld.elements;
    const m0 = me[0], m1 = me[1], m2 = me[2];
    const m4 = me[4], m5 = me[5], m6 = me[6];
    const m8 = me[8], m9 = me[9], m10 = me[10];
    const m12 = me[12], m13 = me[13], m14 = me[14];

    const srcPos = posAttr.array as Float32Array;
    const srcStride = posAttr.itemSize;
    const distAttr = isDashed ? geo.getAttribute('lineDistance') : null;
    const distArr = distAttr ? (distAttr.array as Float32Array) : null;

    const segCount = isSegments
      ? Math.floor(drawCount / 2)
      : isLoop
        ? drawCount
        : drawCount - 1;
    if (segCount <= 0) return;

    const startV = lineRing.count;
    const slot = lineRing.ensureCapacity(startV + segCount * 2);

    const pos = slot.pos;
    const col = slot.col;
    const dash = slot.dash!;

    let cumDist = 0;
    let outV = startV;

    for (let s = 0; s < segCount; s++) {
      let i0: number;
      let i1: number;
      if (isSegments) {
        i0 = drawStart + s * 2;
        i1 = i0 + 1;
      } else if (isLoop) {
        i0 = drawStart + s;
        i1 = drawStart + ((s + 1) % drawCount);
      } else {
        i0 = drawStart + s;
        i1 = i0 + 1;
      }

      const p0 = i0 * srcStride;
      const p1 = i1 * srcStride;
      const x0 = srcPos[p0], y0 = srcPos[p0 + 1], z0 = srcPos[p0 + 2];
      const x1 = srcPos[p1], y1 = srcPos[p1 + 1], z1 = srcPos[p1 + 2];

      const wx0 = m0 * x0 + m4 * y0 + m8 * z0 + m12;
      const wy0 = m1 * x0 + m5 * y0 + m9 * z0 + m13;
      const wz0 = m2 * x0 + m6 * y0 + m10 * z0 + m14;

      const wx1 = m0 * x1 + m4 * y1 + m8 * z1 + m12;
      const wy1 = m1 * x1 + m5 * y1 + m9 * z1 + m13;
      const wz1 = m2 * x1 + m6 * y1 + m10 * z1 + m14;

      let d0 = 0;
      let d1 = 0;
      if (isDashed) {
        if (distArr) {
          d0 = distArr[i0];
          d1 = distArr[i1];
        } else {
          const dx = wx1 - wx0, dy = wy1 - wy0, dz = wz1 - wz0;
          const segLen = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (isSegments) {
            d0 = 0;
            d1 = segLen;
          } else {
            d0 = cumDist;
            cumDist += segLen;
            d1 = cumDist;
          }
        }
      }

      const o0_3 = outV * 3;
      const o0_4 = outV * 4;
      pos[o0_3] = wx0;
      pos[o0_3 + 1] = wy0;
      pos[o0_3 + 2] = wz0;
      col[o0_4] = r8;
      col[o0_4 + 1] = g8;
      col[o0_4 + 2] = b8;
      col[o0_4 + 3] = a8;
      dash[o0_3] = d0;
      dash[o0_3 + 1] = dashRatio;
      dash[o0_3 + 2] = invDashTotal;
      outV++;

      const o1_3 = outV * 3;
      const o1_4 = outV * 4;
      pos[o1_3] = wx1;
      pos[o1_3 + 1] = wy1;
      pos[o1_3 + 2] = wz1;
      col[o1_4] = r8;
      col[o1_4 + 1] = g8;
      col[o1_4 + 2] = b8;
      col[o1_4 + 3] = a8;
      dash[o1_3] = d1;
      dash[o1_3 + 1] = dashRatio;
      dash[o1_3 + 2] = invDashTotal;
      outV++;
    }

    lineRing.count = outV;
  }

  private visitNode(
    meshRing: QuadSlimOverlayRing,
    lineRing: QuadSlimOverlayRing,
    node: THREE.Object3D
  ): void {
    if (!node.visible) return;

    if ((node as THREE.InstancedMesh).isInstancedMesh) {
      const inst = node as THREE.InstancedMesh;
      const mat = inst.material as THREE.MeshBasicMaterial;
      if (mat && !Array.isArray(mat)) {
        const alpha = mat.transparent ? mat.opacity : 1.0;
        if (alpha > 0.005 && inst.count > 0) {
          const flat = this.getFlatTriangles(inst.geometry);
          if (flat) {
            const c = mat.color;
            const r8 = linearColorToSrgbU8(c.r);
            const g8 = linearColorToSrgbU8(c.g);
            const b8 = linearColorToSrgbU8(c.b);
            const a8 = Math.max(0, Math.min(255, Math.round(alpha * 255)));
            for (let i = 0; i < inst.count; i++) {
              inst.getMatrixAt(i, _instMat);
              _worldMat.multiplyMatrices(inst.matrixWorld, _instMat);
              this.appendMeshTransformed(meshRing, flat, _worldMat, r8, g8, b8, a8);
            }
          }
        }
      }
    } else if ((node as THREE.Mesh).isMesh) {
      const mesh = node as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (mat && !Array.isArray(mat)) {
        const alpha = mat.transparent ? mat.opacity : 1.0;
        if (alpha > 0.005 && mesh.geometry) {
          const flat = this.getFlatTriangles(mesh.geometry);
          if (flat) {
            const c = mat.color;
            const r8 = linearColorToSrgbU8(c.r);
            const g8 = linearColorToSrgbU8(c.g);
            const b8 = linearColorToSrgbU8(c.b);
            const a8 = Math.max(0, Math.min(255, Math.round(alpha * 255)));
            this.appendMeshTransformed(meshRing, flat, mesh.matrixWorld, r8, g8, b8, a8);
          }
        }
      }
    } else if ((node as THREE.Line).isLine) {
      this.appendLineObject(lineRing, node as THREE.Line);
    }

    const ch = node.children;
    for (let i = 0; i < ch.length; i++) {
      this.visitNode(meshRing, lineRing, ch[i]);
    }
  }

  private syncChannel(
    sources: ReadonlyArray<OverlaySource>,
    meshRing: QuadSlimOverlayRing,
    lineRing: QuadSlimOverlayRing,
    meshBatch: THREE.Mesh,
    lineBatch: THREE.LineSegments
  ): void {
    let anyVisible = false;
    for (let i = 0; i < sources.length; i++) {
      const src = sources[i];
      if (src.isAssemblyVisible() && src.root.visible) {
        anyVisible = true;
        break;
      }
    }
    if (!anyVisible) {
      meshBatch.visible = false;
      lineBatch.visible = false;
      return;
    }

    meshRing.beginFrame(this.renderEpoch);
    lineRing.beginFrame(this.renderEpoch);

    for (let i = 0; i < sources.length; i++) {
      const src = sources[i];
      if (!src.isAssemblyVisible() || !src.root.visible) continue;
      src.root.updateMatrixWorld(true);
      this.visitNode(meshRing, lineRing, src.root);
    }

    meshRing.commitTo(meshBatch);
    lineRing.commitTo(lineBatch);
  }

  public advanceFrameEpoch(epoch: number): void {
    this.renderEpoch = epoch;
  }

  /** Sync ONLY static/explode-driven trajectory guides (call only when explode/visibility changes!) */
  public syncGuides(guideSources: ReadonlyArray<OverlaySource>): void {
    this.syncChannel(
      guideSources,
      this.guideMeshRing,
      this.guideLineRing,
      this.guideMeshBatch,
      this.guideLineBatch
    );
  }

  /** Sync ONLY live 60fps physics overlays (photon packets, optical rays, Lorentz vectors, shutter/IBIS waves) */
  public syncPhysics(physicsSources: ReadonlyArray<OverlaySource>): void {
    this.syncChannel(
      physicsSources,
      this.physMeshRing,
      this.physLineRing,
      this.physMeshBatch,
      this.physLineBatch
    );
  }

  /** Backward-compatible full sync if both channels are passed together */
  public sync(sources: ReadonlyArray<OverlaySource>): void {
    this.syncPhysics(sources);
  }

  public refreshAfterContextRestore(): void {
    this.meshMatNoClip.needsUpdate = true;
    this.lineMatNoClip.needsUpdate = true;
    if (this.meshMatClip) this.meshMatClip.needsUpdate = true;
    if (this.lineMatClip) this.lineMatClip.needsUpdate = true;
  }

  public dispose(): void {
    this.guideMeshRing.dispose();
    this.guideLineRing.dispose();
    this.physMeshRing.dispose();
    this.physLineRing.dispose();
    this.meshMatNoClip.dispose();
    this.lineMatNoClip.dispose();
    this.meshMatClip?.dispose();
    this.lineMatClip?.dispose();
  }
}
