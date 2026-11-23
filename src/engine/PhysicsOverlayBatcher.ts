import * as THREE from 'three';
import { retessellatePrimitiveSagitta } from './FastCadGeometry';

/**
 * PhysicsOverlayBatcher v4 (HYPERION-CAD v5):
 * - Pre-multiplied `uViewProj` (0 per-vertex mat4*mat4 multiplies).
 * - Dual-Path Zero-Discard Hardware Early-Z mesh overlay shader + lazy clipped variant.
 * - CPU sRGB lookup table -> Mesh Overlay FS is literally 1 single mediump instruction (`fragColor = vColor;`)!
 * - Replaces sub-1.25mm photon/electron/marker spheres with an 8-triangle Octahedron (~10x fewer overlay tris!).
 * - Zero-CPU empty fast-path when no overlay source is visible!
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

function buildOverlayLineFs(useClip: boolean): string {
  return /* glsl */ `
precision mediump float;
in vec4 vColor;
in vec3 vDash;
${useClip ? 'in float vClipDist;' : ''}
out vec4 fragColor;
void main() {
  ${useClip ? 'if (vClipDist < 0.0) discard;' : ''}
  if (vDash.z > 0.0 && fract(vDash.x * vDash.z) > vDash.y) discard;
  fragColor = vColor;
}
`;
}

export interface OverlaySource {
  isAssemblyVisible: () => boolean;
  root: THREE.Object3D;
}

const _instMat = new THREE.Matrix4();
const _worldMat = new THREE.Matrix4();
const _vA = new THREE.Vector3();
const _vB = new THREE.Vector3();

// Pre-flattened unit 8-triangle octahedron for sub-1.2mm photon/electron/LED dots (10x leaner than UV spheres!)
const _unitOctFlat = (() => {
  const oct = new THREE.OctahedronGeometry(1.0, 0);
  const pos = oct.getAttribute('position');
  const out = new Float32Array(pos.count * 3);
  out.set(pos.array as Float32Array);
  oct.dispose();
  return out;
})();

class SlimOverlayBuffer {
  public pos: Float32Array;
  public col: Uint8Array;
  public dash: Float32Array | null;
  public capacityVerts: number;
  public count = 0;

  public readonly geo: THREE.BufferGeometry;
  private posAttr: THREE.BufferAttribute;
  private colAttr: THREE.BufferAttribute;
  private dashAttr: THREE.BufferAttribute | null = null;
  private readonly hasDash: boolean;

  constructor(initialVerts: number, hasDash: boolean) {
    this.hasDash = hasDash;
    this.capacityVerts = initialVerts;
    this.pos = new Float32Array(initialVerts * 3);
    this.col = new Uint8Array(initialVerts * 4);
    this.dash = hasDash ? new Float32Array(initialVerts * 3) : null;

    this.geo = new THREE.BufferGeometry();
    this.posAttr = new THREE.BufferAttribute(this.pos, 3);
    this.colAttr = new THREE.BufferAttribute(this.col, 4, true);
    this.posAttr.setUsage(THREE.DynamicDrawUsage);
    this.colAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('position', this.posAttr);
    this.geo.setAttribute('aColor', this.colAttr);

    if (hasDash && this.dash) {
      this.dashAttr = new THREE.BufferAttribute(this.dash, 3);
      this.dashAttr.setUsage(THREE.DynamicDrawUsage);
      this.geo.setAttribute('aDash', this.dashAttr);
    }
  }

  public reset(): void {
    this.count = 0;
  }

  public ensureCapacity(neededVerts: number): void {
    if (neededVerts <= this.capacityVerts) return;
    let nextCap = this.capacityVerts;
    while (nextCap < neededVerts) nextCap *= 2;

    const nextPos = new Float32Array(nextCap * 3);
    nextPos.set(this.pos.subarray(0, this.count * 3));
    const nextCol = new Uint8Array(nextCap * 4);
    nextCol.set(this.col.subarray(0, this.count * 4));

    this.pos = nextPos;
    this.col = nextCol;
    this.capacityVerts = nextCap;

    this.posAttr = new THREE.BufferAttribute(this.pos, 3);
    this.colAttr = new THREE.BufferAttribute(this.col, 4, true);
    this.posAttr.setUsage(THREE.DynamicDrawUsage);
    this.colAttr.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('position', this.posAttr);
    this.geo.setAttribute('aColor', this.colAttr);

    if (this.hasDash && this.dash) {
      const nextDash = new Float32Array(nextCap * 3);
      nextDash.set(this.dash.subarray(0, this.count * 3));
      this.dash = nextDash;
      this.dashAttr = new THREE.BufferAttribute(this.dash, 3);
      this.dashAttr.setUsage(THREE.DynamicDrawUsage);
      this.geo.setAttribute('aDash', this.dashAttr);
    }
  }

  public commit(): void {
    this.geo.setDrawRange(0, this.count);
    if (this.count > 0) {
      this.posAttr.clearUpdateRanges();
      this.posAttr.addUpdateRange(0, this.count * 3);
      this.posAttr.needsUpdate = true;

      this.colAttr.clearUpdateRanges();
      this.colAttr.addUpdateRange(0, this.count * 4);
      this.colAttr.needsUpdate = true;

      if (this.dashAttr) {
        this.dashAttr.clearUpdateRanges();
        this.dashAttr.addUpdateRange(0, this.count * 3);
        this.dashAttr.needsUpdate = true;
      }
    }
  }

  public dispose(): void {
    this.geo.dispose();
  }
}

export class PhysicsOverlayBatcher {
  public readonly group: THREE.Group;
  private readonly meshBuf: SlimOverlayBuffer;
  private readonly lineBuf: SlimOverlayBuffer;
  private readonly meshBatch: THREE.Mesh;
  private readonly lineBatch: THREE.LineSegments;
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

    this.meshBuf = new SlimOverlayBuffer(4096, false);
    this.lineBuf = new SlimOverlayBuffer(4096, true);

    this.meshMatNoClip = this.createMeshMat(false);
    this.lineMatNoClip = this.createLineMat(false);

    this.meshBatch = new THREE.Mesh(this.meshBuf.geo, this.meshMatNoClip);
    this.meshBatch.frustumCulled = false;
    this.meshBatch.matrixAutoUpdate = false;
    this.meshBatch.renderOrder = 3;
    this.meshBatch.visible = false;

    this.lineBatch = new THREE.LineSegments(this.lineBuf.geo, this.lineMatNoClip);
    this.lineBatch.frustumCulled = false;
    this.lineBatch.matrixAutoUpdate = false;
    this.lineBatch.renderOrder = 4;
    this.lineBatch.visible = false;

    this.group.add(this.meshBatch, this.lineBatch);
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
    m.customProgramCacheKey = () => `hyperion-overlay-mesh-v4-${useClip ? 'c' : 'nc'}`;
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
    m.customProgramCacheKey = () => `hyperion-overlay-line-v4-${useClip ? 'c' : 'nc'}`;
    return m;
  }

  public setSectionCutActive(active: boolean): void {
    if (active) {
      this.meshMatClip ??= this.createMeshMat(true);
      this.lineMatClip ??= this.createLineMat(true);
      this.meshBatch.material = this.meshMatClip;
      this.lineBatch.material = this.lineMatClip;
    } else {
      this.meshBatch.material = this.meshMatNoClip;
      this.lineBatch.material = this.lineMatNoClip;
    }
  }

  private getFlatTriangles(sourceGeo: THREE.BufferGeometry): Float32Array | null {
    const cached = this.flatTriCache.get(sourceGeo);
    if (cached) return cached;

    // Ultra-lean 8-triangle octahedron substitution for tiny <= 1.2mm photon/electron/anchor spheres!
    if (sourceGeo.type === 'SphereGeometry') {
      const p = (sourceGeo as THREE.SphereGeometry).parameters;
      if (p && p.radius <= 1.25) {
        const r = p.radius;
        const out = new Float32Array(_unitOctFlat.length);
        for (let i = 0; i < _unitOctFlat.length; i++) out[i] = _unitOctFlat[i] * r;
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
    flatVerts: Float32Array,
    mat4: THREE.Matrix4,
    r8: number,
    g8: number,
    b8: number,
    a8: number
  ): void {
    const vCount = flatVerts.length / 3;
    const buf = this.meshBuf;
    const startV = buf.count;
    buf.ensureCapacity(startV + vCount);

    const e = mat4.elements;
    const e0 = e[0], e1 = e[1], e2 = e[2];
    const e4 = e[4], e5 = e[5], e6 = e[6];
    const e8 = e[8], e9 = e[9], e10 = e[10];
    const e12 = e[12], e13 = e[13], e14 = e[14];

    const pos = buf.pos;
    const col = buf.col;

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

    buf.count = startV + vCount;
  }

  private appendLineObject(lineObj: THREE.Line): void {
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
    const m = lineObj.matrixWorld;
    const distAttr = isDashed ? geo.getAttribute('lineDistance') : null;

    const segCount = isSegments
      ? Math.floor(drawCount / 2)
      : isLoop
        ? drawCount
        : drawCount - 1;
    if (segCount <= 0) return;

    const buf = this.lineBuf;
    const startV = buf.count;
    buf.ensureCapacity(startV + segCount * 2);

    const pos = buf.pos;
    const col = buf.col;
    const dash = buf.dash!;

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

      _vA.fromBufferAttribute(posAttr, i0).applyMatrix4(m);
      _vB.fromBufferAttribute(posAttr, i1).applyMatrix4(m);

      let d0 = 0;
      let d1 = 0;
      if (isDashed) {
        if (distAttr) {
          d0 = distAttr.getX(i0);
          d1 = distAttr.getX(i1);
        } else {
          const segLen = _vA.distanceTo(_vB);
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
      pos[o0_3] = _vA.x;
      pos[o0_3 + 1] = _vA.y;
      pos[o0_3 + 2] = _vA.z;
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
      pos[o1_3] = _vB.x;
      pos[o1_3 + 1] = _vB.y;
      pos[o1_3 + 2] = _vB.z;
      col[o1_4] = r8;
      col[o1_4 + 1] = g8;
      col[o1_4 + 2] = b8;
      col[o1_4 + 3] = a8;
      dash[o1_3] = d1;
      dash[o1_3 + 1] = dashRatio;
      dash[o1_3 + 2] = invDashTotal;
      outV++;
    }

    buf.count = outV;
  }

  private visitNode(node: THREE.Object3D): void {
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
              this.appendMeshTransformed(flat, _worldMat, r8, g8, b8, a8);
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
            this.appendMeshTransformed(flat, mesh.matrixWorld, r8, g8, b8, a8);
          }
        }
      }
    } else if ((node as THREE.Line).isLine) {
      this.appendLineObject(node as THREE.Line);
    }

    const ch = node.children;
    for (let i = 0; i < ch.length; i++) {
      this.visitNode(ch[i]);
    }
  }

  public sync(sources: ReadonlyArray<OverlaySource>): void {
    let anyVisible = false;
    for (let i = 0; i < sources.length; i++) {
      const src = sources[i];
      if (src.isAssemblyVisible() && src.root.visible) {
        anyVisible = true;
        break;
      }
    }
    if (!anyVisible) {
      if (this.meshBatch.visible || this.lineBatch.visible) {
        this.meshBuf.reset();
        this.lineBuf.reset();
        this.meshBuf.commit();
        this.lineBuf.commit();
        this.meshBatch.visible = false;
        this.lineBatch.visible = false;
      }
      return;
    }

    this.meshBuf.reset();
    this.lineBuf.reset();

    for (let i = 0; i < sources.length; i++) {
      const src = sources[i];
      if (!src.isAssemblyVisible() || !src.root.visible) continue;
      src.root.updateMatrixWorld(true);
      this.visitNode(src.root);
    }

    this.meshBuf.commit();
    this.lineBuf.commit();
    this.meshBatch.visible = this.meshBuf.count > 0;
    this.lineBatch.visible = this.lineBuf.count > 0;
  }

  public refreshAfterContextRestore(): void {
    this.meshMatNoClip.needsUpdate = true;
    this.lineMatNoClip.needsUpdate = true;
    if (this.meshMatClip) this.meshMatClip.needsUpdate = true;
    if (this.lineMatClip) this.lineMatClip.needsUpdate = true;
  }

  public dispose(): void {
    this.meshBuf.dispose();
    this.lineBuf.dispose();
    this.meshMatNoClip.dispose();
    this.lineMatNoClip.dispose();
    this.meshMatClip?.dispose();
    this.lineMatClip?.dispose();
  }
}
