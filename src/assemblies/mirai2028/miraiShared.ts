import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import { HeroMaterialSpec } from '../../core/resource_cache';
import {
  attachCadEdges,
  createPrecisionScrew,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  extrudeHiRes,
  hiResCyl,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import {
  scaleCurveSegmentsForQuality,
  scaleRadialSegmentsForQuality,
} from '../../core/geometry_quality';
import { lazyExplanationStub } from '../lazyExplanations';

/**
 * Shared watchmaker-grade CAD builder utilities & 1024px procedural HeroMaterialSpec painters
 * for Future History MIRAI 2028 (`mirai_2028`).
 *
 * Strictly zero direct `new THREE.Mesh*Material` allocations — all materials flow through
 * `ResourceCache` 38 PBR buckets & managed `HeroMaterialSpec` textures so all 4 tiers
 * (`LITE` / `STD` / `HIGH` / `ULTRA`) scale automatically with Δg=0 / Δt=0 disposal.
 */

export function finalizeMiraiPart(
  id: string,
  miraiSubView: number,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.24
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);
  return {
    id,
    subsystem: 'mirai_2028',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    miraiSubView,
  };
}

export interface InstanceTransform {
  readonly pos: readonly [number, number, number];
  readonly rot?: readonly [number, number, number];
  readonly scale?: readonly [number, number, number];
}

/**
 * Create a zero-overhead InstancedMesh with `matrixAutoUpdate = false`.
 * CompiledV2Unit ingests InstancedMesh directly into Tier-1 instanced pools.
 */
export function makeMiraiInstanced(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  transforms: readonly InstanceTransform[],
  noEdges = true
): THREE.InstancedMesh {
  const inst = new THREE.InstancedMesh(geo, mat, transforms.length);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < transforms.length; i++) {
    const t = transforms[i];
    dummy.position.set(t.pos[0], t.pos[1], t.pos[2]);
    if (t.rot) dummy.rotation.set(t.rot[0], t.rot[1], t.rot[2]);
    else dummy.rotation.set(0, 0, 0);
    if (t.scale) dummy.scale.set(t.scale[0], t.scale[1], t.scale[2]);
    else dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  inst.instanceMatrix.needsUpdate = true;
  inst.matrixAutoUpdate = false;
  inst.updateMatrix();
  if (noEdges) inst.userData.noEdges = true;
  return inst;
}

/**
 * Create a horizontal extruded plate (thickness along Y, centered at Y=0) with crisp CNC bevels
 * and seamless triplanar or top-planar UVs.
 */
export function makeHorizCncPlate(
  shape: THREE.Shape,
  thickness: number,
  mat: THREE.Material,
  opts?: {
    bevel?: number;
    bevelSegs?: number;
    curveSegs?: number;
    planarUv?: { w: number; h: number; cx?: number; cy?: number };
    boxUvTile?: number;
  }
): THREE.Mesh {
  const bevel = opts?.bevel ?? 0.08;
  const geo = extrudeHiRes(
    shape,
    thickness,
    bevel,
    bevel,
    opts?.bevelSegs ?? 2,
    opts?.curveSegs ?? 20
  );
  geo.rotateX(-Math.PI / 2);
  if (opts?.planarUv) {
    applyPlanarUVs(
      geo,
      opts.planarUv.w,
      opts.planarUv.h,
      'xz',
      opts.planarUv.cx ?? 0,
      opts.planarUv.cy ?? 0
    );
  } else {
    applyBoxUVs(geo, opts?.boxUvTile ?? 14.0);
  }
  return new THREE.Mesh(geo, mat);
}

/**
 * Build a rounded rectangular shape with an optional front-right (+X, -Y in 2D shape => +X, +Z after -90deg X rot)
 * precision architectural cutaway terrace so internal vertical semiconductor layers gleam visibly even at 0% Explode!
 */
export function createTerracedWaferShape(
  w: number,
  h: number,
  r: number,
  cutX?: number,
  cutZ?: number
): THREE.Shape {
  if (cutX === undefined || cutZ === undefined) {
    return createRoundedRectShape(w, h, r);
  }
  // Note: After `geo.rotateX(-Math.PI / 2)`, 2D (x, y) maps to 3D (x, 0, -y).
  // Therefore 3D front-right (+X, +Z) corresponds to 2D (+X, -Y)!
  const hw = w * 0.5;
  const hh = h * 0.5;
  const cr = Math.min(r, hw * 0.25, hh * 0.25);
  const cx = Math.max(-hw + cr + 1.0, Math.min(hw - 1.0, cutX));
  const cy = -Math.max(-hh + cr + 1.0, Math.min(hh - 1.0, cutZ)); // 2D y = -3D z
  const notchR = 0.65;

  const s = new THREE.Shape();
  // Start bottom-left (2D: -hw, -hh => 3D: -hw, +hh) and trace CCW
  s.moveTo(-hw + cr, -hh);
  // Go right along bottom edge (+Z front edge) up to the cutaway step X
  s.lineTo(cx - notchR, -hh);
  s.quadraticCurveTo(cx, -hh, cx, -hh + notchR);
  // Step inward (towards -Z / +2D y) to cy
  s.lineTo(cx, cy - notchR);
  s.quadraticCurveTo(cx, cy, cx + notchR, cy);
  // Continue right to +hw edge
  s.lineTo(hw - cr, cy);
  s.quadraticCurveTo(hw, cy, hw, cy + cr);
  // Up right edge to top-right (3D: +hw, -hh)
  s.lineTo(hw, hh - cr);
  s.quadraticCurveTo(hw, hh, hw - cr, hh);
  // Left along top edge (3D: -Z back edge)
  s.lineTo(-hw + cr, hh);
  s.quadraticCurveTo(-hw, hh, -hw, hh - cr);
  // Down left edge to start
  s.lineTo(-hw, -hh + cr);
  s.quadraticCurveTo(-hw, -hh, -hw + cr, -hh);
  s.closePath();
  return s;
}

/**
 * Build a smooth S-curved flexible FPC polyimide ribbon along X-Y (extruded along Z width).
 */
export function buildCurvedFpcRibbon(
  ptsXY: ReadonlyArray<readonly [number, number]>,
  thickness: number,
  widthZ: number
): THREE.ExtrudeGeometry {
  const segs = scaleCurveSegmentsForQuality(24, 8);
  const curve = new THREE.SplineCurve(ptsXY.map(([x, y]) => new THREE.Vector2(x, y)));
  const samples = curve.getPoints(segs);
  const upper: THREE.Vector2[] = [];
  const lower: THREE.Vector2[] = [];
  for (let i = 0; i < samples.length; i++) {
    const prev = samples[Math.max(0, i - 1)];
    const next = samples[Math.min(samples.length - 1, i + 1)];
    const tx = next.x - prev.x;
    const ty = next.y - prev.y;
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;
    upper.push(new THREE.Vector2(samples[i].x + nx * thickness * 0.5, samples[i].y + ny * thickness * 0.5));
    lower.push(new THREE.Vector2(samples[i].x - nx * thickness * 0.5, samples[i].y - ny * thickness * 0.5));
  }
  const shape = new THREE.Shape();
  shape.moveTo(upper[0].x, upper[0].y);
  for (let i = 1; i < upper.length; i++) shape.lineTo(upper[i].x, upper[i].y);
  for (let i = lower.length - 1; i >= 0; i--) shape.lineTo(lower[i].x, lower[i].y);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, { depth: widthZ, bevelEnabled: false, steps: 1 });
  geo.translate(0, 0, -widthZ * 0.5);
  applyBoxUVs(geo, 12.0);
  geo.computeVertexNormals();
  return markHiRes(geo);
}

/**
 * Build a single realistic arched 3D gold wirebond loop geometry (oriented along +X, arching up in +Y)
 * suitable for high-density InstancedMesh placement around all 4 die edges!
 */
export function createGoldWirebondArchGeo(span: number, archHeight: number, dropY: number): THREE.TubeGeometry {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(span * 0.14, archHeight * 0.88, 0),
    new THREE.Vector3(span * 0.45, archHeight, 0),
    new THREE.Vector3(span * 0.82, archHeight * 0.42 + dropY * 0.45, 0),
    new THREE.Vector3(span, dropY, 0),
  ]);
  const tubular = scaleCurveSegmentsForQuality(12, 5);
  const radial = scaleRadialSegmentsForQuality(6, 4);
  const geo = new THREE.TubeGeometry(curve, tubular, 0.068, radial, false);
  return markHiRes(geo);
}

/**
 * Place watchmaker M1.4 Torx precision mounting bolts onto a chassis plate.
 */
export function addTorxBolts(
  parent: THREE.Group,
  positions: ReadonlyArray<readonly [number, number, number]>,
  mats: V2MaterialLibrary,
  headRadius = 1.25,
  shankLen = 2.6
): void {
  for (const [x, y, z] of positions) {
    const bolt = createPrecisionScrew(headRadius, headRadius * 0.62, shankLen, mats.stainlessMachined);
    bolt.rotation.x = -Math.PI / 2;
    bolt.position.set(x, y, z);
    parent.add(bolt);

    // Chamfered precision titanium washer collar seated flush beneath head
    const washer = new THREE.Mesh(hiResCyl(headRadius * 1.28, headRadius * 1.32, 0.24, 16), mats.titaniumRivet);
    washer.position.set(x, y - 0.12, z);
    washer.userData.noEdges = true;
    parent.add(washer);
  }
}

/**
 * Build a machined micro-ribbed cooling fin bank along a baseplate edge.
 */
export function buildMicroCoolingFins(
  count: number,
  spanX: number,
  finThickness: number,
  finHeight: number,
  finDepth: number,
  centerPos: readonly [number, number, number],
  mat: THREE.Material
): THREE.InstancedMesh {
  const finGeo = markHiRes(new THREE.BoxGeometry(finThickness, finHeight, finDepth));
  const transforms: InstanceTransform[] = [];
  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) - 0.5 : 0;
    transforms.push({
      pos: [centerPos[0] + t * spanX, centerPos[1], centerPos[2]],
    });
  }
  return makeMiraiInstanced(finGeo, mat, transforms);
}

/**
 * Create a closed circular annulus 2D shape (outerR with innerR circular bore).
 */
export function createRingShape(outerR: number, innerR: number): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  if (innerR > 0.05) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
    s.holes.push(hole);
  }
  return s;
}

/**
 * Create a partial-arc cutaway ring 2D shape from startRad to endRad (for cutaway barrels & housings).
 */
export function createArcRingShape(
  outerR: number,
  innerR: number,
  startRad: number,
  endRad: number
): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, startRad, endRad, false);
  s.absarc(0, 0, innerR, endRad, startRad, true);
  s.closePath();
  return s;
}

/**
 * Create a Z-axis CNC-beveled annular ring (extruded along Z, centered at Z=0) with clean UVs.
 */
export function makeZAxisCncRing(
  outerR: number,
  innerR: number,
  depth: number,
  mat: THREE.Material,
  opts?: {
    bevel?: number;
    bevelSegs?: number;
    curveSegs?: number;
    planarUvDiameter?: number;
    boxUvTile?: number;
  }
): THREE.Mesh {
  const bevel = opts?.bevel ?? 0.1;
  const geo = extrudeHiRes(
    createRingShape(outerR, innerR),
    depth,
    bevel,
    bevel,
    opts?.bevelSegs ?? 2,
    opts?.curveSegs ?? 32
  );
  if (opts?.planarUvDiameter) {
    applyPlanarUVs(geo, opts.planarUvDiameter, opts.planarUvDiameter, 'xy');
  } else {
    applyBoxUVs(geo, opts?.boxUvTile ?? 14.0);
  }
  return new THREE.Mesh(geo, mat);
}

/**
 * Build a precision rotationally symmetric curved optical meniscus / aspheric / ED lens element
 * centered along the Z axis using LatheGeometry, with automatic 4-tier quality scaling and
 * chamfered rim edges.
 */
export function buildMeniscusLensGeo(
  diameter: number,
  edgeThickness: number,
  sagFront: number,
  sagRear: number,
  asphericFront = 0,
  asphericRear = 0,
  radialSegments = 52
): THREE.BufferGeometry {
  const radius = diameter * 0.5;
  const effSteps = scaleCurveSegmentsForQuality(14, 5);
  const effRadial = scaleRadialSegmentsForQuality(radialSegments, 16);
  const halfEdge = Math.max(0.18, edgeThickness * 0.5);
  const chamfer = Math.min(0.28, halfEdge * 0.35, radius * 0.04);
  const pts: THREE.Vector2[] = [];

  // Front (+Z) optical surface from optical axis (r=0) out to rim edge
  for (let i = 0; i <= effSteps; i++) {
    const u = i / effSteps;
    const r = Math.max(0.0005, u * (radius - chamfer));
    const r2 = u * u;
    const zF = halfEdge + sagFront * (1 - r2) + asphericFront * r2 * (1 - r2);
    pts.push(new THREE.Vector2(r, zF));
  }
  // Crisp chamfered cylindrical edge land
  pts.push(new THREE.Vector2(radius, halfEdge - chamfer));
  pts.push(new THREE.Vector2(radius, -halfEdge + chamfer));
  // Rear (-Z) optical surface from rim back to optical axis
  for (let i = effSteps; i >= 0; i--) {
    const u = i / effSteps;
    const r = Math.max(0.0005, u * (radius - chamfer));
    const r2 = u * u;
    const zR = -halfEdge - sagRear * (1 - r2) - asphericRear * r2 * (1 - r2);
    pts.push(new THREE.Vector2(r, zR));
  }

  const geo = new THREE.LatheGeometry(pts, effRadial);
  geo.rotateX(Math.PI / 2);
  geo.computeVertexNormals();
  return markHiRes(geo);
}

/**
 * Build a CNC knurled control/diopter ring along the Z axis:
 * base beveled annulus + InstancedMesh circumferential machined knurl ribs.
 */
export function addKnurledRingToGroup(
  parent: THREE.Group,
  outerR: number,
  innerR: number,
  depthZ: number,
  teethCount: number,
  bodyMat: THREE.Material,
  knurlMat: THREE.Material,
  knurlWidthZ?: number,
  knurlOffsetZ = 0
): void {
  const ring = makeZAxisCncRing(outerR, innerR, depthZ, bodyMat, {
    bevel: 0.16,
    bevelSegs: 2,
    curveSegs: 40,
  });
  parent.add(ring);

  const toothLenZ = knurlWidthZ ?? depthZ * 0.72;
  const toothThick = Math.max(0.32, (Math.PI * 2 * outerR) / (teethCount * 2.4));
  const toothProtrude = Math.min(0.46, Math.max(0.24, outerR * 0.013));
  const toothGeo = markHiRes(new THREE.BoxGeometry(toothThick, toothProtrude * 2, toothLenZ));
  const transforms: InstanceTransform[] = [];
  for (let i = 0; i < teethCount; i++) {
    const a = (i / teethCount) * Math.PI * 2;
    transforms.push({
      pos: [Math.cos(a) * outerR, Math.sin(a) * outerR, knurlOffsetZ],
      rot: [0, 0, a - Math.PI / 2],
    });
  }
  parent.add(makeMiraiInstanced(toothGeo, knurlMat, transforms, true));
}

/**
 * Build a single authentic curved crescent metallic iris aperture blade (centered in XY, extruded in Z)
 * ready for 9-blade circular diaphragm InstancedMesh placement.
 */
export function buildCurvedIrisBladeGeo(
  innerR: number,
  outerR: number,
  thickness = 0.18
): THREE.ExtrudeGeometry {
  const midR = (innerR + outerR) * 0.52;
  const s = new THREE.Shape();
  s.moveTo(outerR * 0.96, -1.6);
  s.quadraticCurveTo(midR + 3.4, outerR * 0.56, innerR * 0.48, outerR * 0.78);
  s.quadraticCurveTo(innerR * 0.16, innerR * 0.95, innerR * 0.05, innerR * 0.72);
  s.quadraticCurveTo(innerR * 0.94, innerR * 0.42, outerR * 0.76, -1.5);
  s.closePath();
  const geo = extrudeHiRes(s, thickness, 0.02, 0.02, 1, 14);
  applyBoxUVs(geo, 10.0);
  return geo;
}

/**
 * Place precision M1.4-M1.6 stainless Torx/countersunk bolts oriented along +Z or -Z (for lens & EVF flanges).
 */
export function addZAxisBolts(
  parent: THREE.Group,
  positions: ReadonlyArray<readonly [number, number, number]>,
  mats: V2MaterialLibrary,
  headRadius = 1.15,
  shankLen = 2.4,
  dirZ: 1 | -1 = 1
): void {
  for (const [x, y, z] of positions) {
    const bolt = createPrecisionScrew(headRadius, headRadius * 0.56, shankLen, mats.stainlessMachined);
    if (dirZ === -1) bolt.rotation.y = Math.PI;
    bolt.position.set(x, y, z);
    parent.add(bolt);

    const washer = new THREE.Mesh(hiResCyl(headRadius * 1.26, headRadius * 1.30, 0.22, 14), mats.titaniumRivet);
    washer.rotation.x = Math.PI / 2;
    washer.position.set(x, y, z - dirZ * 0.12);
    washer.userData.noEdges = true;
    parent.add(washer);
  }
}

// ============================================================================
// Procedural High-DPI HeroMaterialSpec Painters (512px LITE/STD/HIGH, 1024px ULTRA)
// ============================================================================

function drawMicroFiducial(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1.2, r * 0.14);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - r * 1.4, y);
  ctx.lineTo(x + r * 1.4, y);
  ctx.moveTo(x, y - r * 1.4);
  ctx.lineTo(x, y + r * 1.4);
  ctx.stroke();
}

export const MIRAI_HERO_SPECS: Readonly<Record<string, HeroMaterialSpec>> = {
  /** FH01: Full-Frame 36x24mm 3D-BSI SPAD / QIS Photon-Counting Active Silicon Die */
  fh01SpadDieMap: {
    bucket: 'silicon_photodiode',
    width: 1024,
    height: 682,
    baseColor: 0xffffff,
    metalness: 0.72,
    roughness: 0.18,
    fallbackColor: 0x16395c,
    painter: (ctx, w, h) => {
      // Deep studio-legible silicon sapphire-teal wafer substrate
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#0f2744');
      bg.addColorStop(0.35, '#19466e');
      bg.addColorStop(0.68, '#175a75');
      bg.addColorStop(1, '#122c4a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Optical Black (OB) dark reference perimeter frame & aluminum guard border
      const padX = w * 0.055;
      const padY = h * 0.068;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.75)';
      ctx.lineWidth = Math.max(2, w / 280);
      ctx.strokeRect(padX * 0.45, padY * 0.45, w - padX * 0.9, h - padY * 0.9);

      // Perimeter gold bond pad array around all 4 edges
      const padCountX = 28;
      const padCountY = 18;
      ctx.fillStyle = '#e5be54';
      for (let i = 0; i < padCountX; i++) {
        const px = padX * 0.8 + ((w - padX * 1.6) * i) / (padCountX - 1);
        ctx.fillRect(px - w * 0.008, padY * 0.14, w * 0.016, padY * 0.24);
        ctx.fillRect(px - w * 0.008, h - padY * 0.38, w * 0.016, padY * 0.24);
      }
      for (let j = 0; j < padCountY; j++) {
        const py = padY * 0.85 + ((h - padY * 1.7) * j) / (padCountY - 1);
        ctx.fillRect(padX * 0.14, py - h * 0.01, padX * 0.24, h * 0.02);
        ctx.fillRect(w - padX * 0.38, py - h * 0.01, padX * 0.24, h * 0.02);
      }

      // Active 36x24mm SPAD/QIS photon-counting macro-array
      const ax = padX;
      const ay = padY;
      const aw = w - padX * 2;
      const ah = h - padY * 2;

      const irid = ctx.createLinearGradient(ax, ay, ax + aw, ay + ah);
      irid.addColorStop(0, '#0c4a6e');
      irid.addColorStop(0.28, '#0f766e');
      irid.addColorStop(0.55, '#1d4ed8');
      irid.addColorStop(0.82, '#0d9488');
      irid.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = irid;
      ctx.fillRect(ax, ay, aw, ah);

      // High-density SPAD avalanche guard-ring cells & QIS micro-jot sub-grid
      const cols = 36;
      const rows = 24;
      const cw = aw / cols;
      const ch = ah / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ax + c * cw;
          const y = ay + r * ch;
          // Subtle RGGB or monochromatic photon-count spectral sheen
          const parity = ((r & 1) << 1) | (c & 1);
          ctx.fillStyle =
            parity === 0
              ? 'rgba(56, 189, 248, 0.22)'
              : parity === 3
                ? 'rgba(244, 114, 182, 0.14)'
                : 'rgba(52, 211, 153, 0.20)';
          ctx.fillRect(x + 1.5, y + 1.5, cw - 3, ch - 3);
          // Circular SPAD high-field active avalanche diode junction
          ctx.strokeStyle = 'rgba(186, 230, 253, 0.45)';
          ctx.lineWidth = Math.max(0.7, w / 1024);
          ctx.beginPath();
          ctx.arc(x + cw * 0.5, y + ch * 0.5, Math.min(cw, ch) * 0.3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Crisp F-DTI optical isolation grid lines
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.52)';
      ctx.lineWidth = Math.max(1.0, w / 800);
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.moveTo(ax + c * cw, ay);
        ctx.lineTo(ax + c * cw, ay + ah);
        ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        ctx.moveTo(ax, ay + r * ch);
        ctx.lineTo(ax + aw, ay + r * ch);
        ctx.stroke();
      }

      // Corner optical alignment fiducials
      drawMicroFiducial(ctx, ax + cw * 1.2, ay + ch * 1.2, cw * 0.65, '#f8fafc');
      drawMicroFiducial(ctx, ax + aw - cw * 1.2, ay + ch * 1.2, cw * 0.65, '#f8fafc');
      drawMicroFiducial(ctx, ax + cw * 1.2, ay + ah - ch * 1.2, cw * 0.65, '#f8fafc');
      drawMicroFiducial(ctx, ax + aw - cw * 1.2, ay + ah - ch * 1.2, cw * 0.65, '#f8fafc');
    },
  },

  /** FH01: 2nd Stacked Wafer — Pixel-Parallel Active Quench + Picosecond TDC Logic Die */
  fh01QuenchLogicMap: {
    bucket: 'silicon_hero',
    width: 1024,
    height: 682,
    baseColor: 0xffffff,
    metalness: 0.78,
    roughness: 0.22,
    fallbackColor: 0x243b53,
    painter: (ctx, w, h) => {
      ctx.fillStyle = '#182638';
      ctx.fillRect(0, 0, w, h);

      // 8x6 array of pixel-parallel quench + TDC + 14-bit photon counter logic tiles
      const mx = w * 0.06;
      const my = h * 0.08;
      const cols = 8;
      const rows = 6;
      const tw = (w - mx * 2) / cols;
      const th = (h - my * 2) / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = mx + c * tw + 4;
          const y = my + r * th + 4;
          const bw = tw - 8;
          const bh = th - 8;
          ctx.fillStyle = (r + c) % 2 === 0 ? '#233b57' : '#1d324a';
          ctx.fillRect(x, y, bw, bh);
          ctx.strokeStyle = 'rgba(217, 138, 72, 0.72)';
          ctx.lineWidth = 1.6;
          ctx.strokeRect(x, y, bw, bh);

          // Internal SRAM counter + TDC sub-blocks
          ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
          ctx.fillRect(x + 5, y + 5, bw * 0.44, bh - 10);
          ctx.fillStyle = 'rgba(245, 158, 11, 0.24)';
          ctx.fillRect(x + bw * 0.54, y + 5, bw * 0.40, bh * 0.44);
          ctx.fillStyle = 'rgba(16, 185, 129, 0.24)';
          ctx.fillRect(x + bw * 0.54, y + bh * 0.54, bw * 0.40, bh * 0.38);

          // Fine copper RDL clock/bus traces
          ctx.strokeStyle = 'rgba(226, 232, 240, 0.26)';
          ctx.lineWidth = 0.8;
          for (let k = 1; k <= 3; k++) {
            ctx.beginPath();
            ctx.moveTo(x + 4, y + (bh * k) / 4);
            ctx.lineTo(x + bw - 4, y + (bh * k) / 4);
            ctx.stroke();
          }
        }
      }

      // Copper power delivery backbone ring
      ctx.strokeStyle = '#d98245';
      ctx.lineWidth = 5;
      ctx.strokeRect(mx * 0.5, my * 0.5, w - mx, h - my);
    },
  },

  /** FH02 Layer 1: Cobalt-Blue (400-500nm) Wide-Bandgap PVD Co-Evaporated Perovskite Crystal Film */
  fh02BluePerovskiteMap: {
    bucket: 'silicon_photodiode',
    width: 1024,
    height: 682,
    baseColor: 0xffffff,
    metalness: 0.34,
    roughness: 0.16,
    fallbackColor: 0x2563eb,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#1d4ed8');
      grad.addColorStop(0.45, '#2563eb');
      grad.addColorStop(0.8, '#0284c7');
      grad.addColorStop(1, '#1e40af');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // PVD polycrystalline perovskite micro-grain facets (deterministic pseudo-random)
      let seed = 104729;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      for (let i = 0; i < 420; i++) {
        const cx = rand() * w;
        const cy = rand() * h;
        const rad = 14 + rand() * 34;
        const sides = 5 + Math.floor(rand() * 3);
        ctx.beginPath();
        for (let k = 0; k < sides; k++) {
          const a = (k / sides) * Math.PI * 2 + rand() * 0.35;
          const px = cx + Math.cos(a) * rad;
          const py = cy + Math.sin(a) * rad;
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(186, 230, 253, ${(0.04 + rand() * 0.13).toFixed(3)})`;
        ctx.fill();
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.20)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Transparent pixel electrode pitch grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += w / 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += h / 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    },
  },

  /** FH02 Layer 2: Emerald-Green (500-600nm) Perovskite / OPF Absorber Film */
  fh02GreenPerovskiteMap: {
    bucket: 'silicon_photodiode',
    width: 1024,
    height: 682,
    baseColor: 0xffffff,
    metalness: 0.34,
    roughness: 0.16,
    fallbackColor: 0x059669,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#047857');
      grad.addColorStop(0.5, '#10b981');
      grad.addColorStop(1, '#065f46');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      let seed = 224737;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      for (let i = 0; i < 400; i++) {
        const cx = rand() * w;
        const cy = rand() * h;
        const rad = 14 + rand() * 32;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2 + rand() * 0.25;
          const px = cx + Math.cos(a) * rad;
          const py = cy + Math.sin(a) * rad;
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(167, 243, 208, ${(0.05 + rand() * 0.14).toFixed(3)})`;
        ctx.fill();
        ctx.strokeStyle = 'rgba(209, 250, 229, 0.22)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Micro-via pass-through pad collars
      ctx.strokeStyle = 'rgba(236, 253, 245, 0.42)';
      ctx.lineWidth = 1.2;
      for (let r = 0; r < 16; r++) {
        for (let c = 0; c < 24; c++) {
          const cx = ((c + 0.5) / 24) * w;
          const cy = ((r + 0.5) / 16) * h;
          ctx.beginPath();
          ctx.arc(cx, cy, 4.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    },
  },

  /** FH02 Layer 3: Ruby-Red (600-700nm) Narrow-Bandgap Perovskite Absorber Film */
  fh02RedPerovskiteMap: {
    bucket: 'silicon_photodiode',
    width: 1024,
    height: 682,
    baseColor: 0xffffff,
    metalness: 0.36,
    roughness: 0.16,
    fallbackColor: 0xdc2626,
    painter: (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#991b1b');
      grad.addColorStop(0.45, '#dc2626');
      grad.addColorStop(0.8, '#e11d48');
      grad.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      let seed = 350377;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      for (let i = 0; i < 420; i++) {
        const cx = rand() * w;
        const cy = rand() * h;
        const rad = 14 + rand() * 32;
        ctx.beginPath();
        for (let k = 0; k < 5; k++) {
          const a = (k / 5) * Math.PI * 2 + rand() * 0.3;
          const px = cx + Math.cos(a) * rad;
          const py = cy + Math.sin(a) * rad;
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(254, 205, 211, ${(0.05 + rand() * 0.14).toFixed(3)})`;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 228, 230, 0.22)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Bottom tungsten collector electrode pads
      ctx.fillStyle = 'rgba(253, 224, 71, 0.38)';
      for (let r = 0; r < 16; r++) {
        for (let c = 0; c < 24; c++) {
          const cx = ((c + 0.5) / 24) * w;
          const cy = ((r + 0.5) / 16) * h;
          ctx.fillRect(cx - 3.5, cy - 3.5, 7, 7);
        }
      }
    },
  },

  /** FH02 Bottom Wafer: 300mm-Compatible 3-Channel Simultaneous RGB CMOS ROIC + 16-bit Column ADC */
  fh02RoicMap: {
    bucket: 'silicon_hero',
    width: 1024,
    height: 682,
    baseColor: 0xffffff,
    metalness: 0.76,
    roughness: 0.2,
    fallbackColor: 0x1e3a5f,
    painter: (ctx, w, h) => {
      ctx.fillStyle = '#172536';
      ctx.fillRect(0, 0, w, h);

      // Top & bottom 16-bit 3-channel simultaneous ADC column banks
      const bankH = h * 0.14;
      for (let b = 0; b < 2; b++) {
        const y = b === 0 ? h * 0.04 : h - h * 0.04 - bankH;
        for (let col = 0; col < 36; col++) {
          const x = w * 0.05 + (w * 0.9 * col) / 36;
          const cw = (w * 0.9) / 36 - 3;
          ctx.fillStyle = col % 3 === 0 ? '#2563eb' : col % 3 === 1 ? '#059669' : '#e11d48';
          ctx.globalAlpha = 0.52;
          ctx.fillRect(x, y, cw, bankH);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = 'rgba(226, 232, 240, 0.38)';
          ctx.lineWidth = 0.8;
          ctx.strokeRect(x, y, cw, bankH);
        }
      }

      // Central 3-ch Global-Shutter Storage Node & CDS Micro-Via Landing Matrix
      const cx0 = w * 0.05;
      const cy0 = h * 0.22;
      const cw0 = w * 0.9;
      const ch0 = h * 0.56;
      ctx.fillStyle = '#1e334a';
      ctx.fillRect(cx0, cy0, cw0, ch0);
      ctx.strokeStyle = '#d98a42';
      ctx.lineWidth = 2.2;
      ctx.strokeRect(cx0, cy0, cw0, ch0);

      for (let r = 0; r < 12; r++) {
        for (let c = 0; c < 18; c++) {
          const x = cx0 + (c * cw0) / 18 + 3;
          const y = cy0 + (r * ch0) / 12 + 3;
          const bw = cw0 / 18 - 6;
          const bh = ch0 / 12 - 6;
          ctx.fillStyle = 'rgba(148, 163, 184, 0.18)';
          ctx.fillRect(x, y, bw, bh);
          // 3 color-coded micro-via landing pads (B / G / R) per pixel cell
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(x + 3, y + 3, 5, 5);
          ctx.fillStyle = '#34d399';
          ctx.fillRect(x + bw * 0.42, y + 3, 5, 5);
          ctx.fillStyle = '#fb7185';
          ctx.fillRect(x + bw - 8, y + 3, 5, 5);
        }
      }
    },
  },

  /** FH08 Core: TiO2 Sub-Wavelength Nanopillar Meta-DOE Iridescent Phase Compensation Plate */
  fh08MetaDoeMap: {
    bucket: 'silicon_photodiode',
    width: 1024,
    height: 1024,
    baseColor: 0xffffff,
    metalness: 0.58,
    roughness: 0.14,
    fallbackColor: 0x0f766e,
    painter: (ctx, w, h) => {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const maxR = w * 0.495;

      // Deep optical sapphire-indigo fused silica substrate
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      bg.addColorStop(0, '#0c2747');
      bg.addColorStop(0.28, '#0f5d6e');
      bg.addColorStop(0.54, '#1d4ed8');
      bg.addColorStop(0.76, '#6d28d9');
      bg.addColorStop(0.92, '#047857');
      bg.addColorStop(1, '#111827');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Concentric Fresnel-like TiO2 nanopillar phase-stepped chromatic dispersion zones
      const spectrum = [
        'rgba(56, 189, 248, 0.55)',
        'rgba(52, 211, 153, 0.52)',
        'rgba(129, 140, 248, 0.52)',
        'rgba(244, 114, 182, 0.40)',
        'rgba(45, 212, 191, 0.54)',
      ];
      for (let ring = 1; ring <= 34; ring++) {
        const t = ring / 34;
        const r = Math.pow(t, 0.72) * maxR * 0.90;
        ctx.strokeStyle = spectrum[ring % spectrum.length];
        ctx.lineWidth = Math.max(1.2, (1.1 - t * 0.65) * 4.2);
        ctx.beginPath();
        // Subtle 4-fold freeform harmonic modulation symbolizing ASI non-axisymmetric phase design!
        for (let step = 0; step <= 144; step++) {
          const ang = (step / 144) * Math.PI * 2;
          const freeformMod = 1 + 0.018 * t * Math.cos(4 * ang + ring * 0.14);
          const px = cx + Math.cos(ang) * r * freeformMod;
          const py = cy + Math.sin(ang) * r * freeformMod;
          if (step === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Sub-wavelength TiO2 nanopillar radial micro-dot lattice hints
      ctx.fillStyle = 'rgba(224, 242, 254, 0.34)';
      for (let aIdx = 0; aIdx < 48; aIdx++) {
        const ang = (aIdx / 48) * Math.PI * 2;
        for (let rIdx = 2; rIdx <= 18; rIdx++) {
          const rr = (rIdx / 19) * maxR * 0.88;
          ctx.fillRect(cx + Math.cos(ang) * rr - 1.2, cy + Math.sin(ang) * rr - 1.2, 2.4, 2.4);
        }
      }

      // Precision entrance-pupil golden gauge ring (Ø35.7mm reference) & 4 cardinal alignment crosshairs
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.85)';
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.89, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(248, 250, 252, 0.45)';
      ctx.lineWidth = 1.6;
      for (let k = 0; k < 4; k++) {
        const ang = (k * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * maxR * 0.80, cy + Math.sin(ang) * maxR * 0.80);
        ctx.lineTo(cx + Math.cos(ang) * maxR * 0.95, cy + Math.sin(ang) * maxR * 0.95);
        ctx.stroke();
      }
      drawMicroFiducial(ctx, cx, cy, 12, 'rgba(248, 250, 252, 0.55)');
    },
  },

  /** FH08 Barrel Nameplate: Precision Laser-Engraved Lens Spec & Focus Distance Scale Band */
  fh08FocusScaleMap: {
    bucket: 'metal_hero',
    width: 2048,
    height: 256,
    baseColor: 0xffffff,
    metalness: 0.62,
    roughness: 0.28,
    fallbackColor: 0x262d38,
    painter: (ctx, w, h) => {
      // Deep CNC satin gunmetal anodized barrel ring
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#1a212c');
      bg.addColorStop(0.5, '#2a3444');
      bg.addColorStop(1, '#181e28');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Signature emerald-gold MIRAI 2028 top/bottom precision bevel pinstripes
      ctx.fillStyle = '#10b981';
      ctx.fillRect(0, 10, w, 14);
      ctx.fillStyle = '#e5b94c';
      ctx.fillRect(0, h - 22, w, 10);

      // Fine metric vernier ticks along upper band
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.78)';
      for (let i = 0; i < 128; i++) {
        const x = (i / 128) * w;
        const major = i % 8 === 0;
        ctx.lineWidth = major ? 3.2 : 1.5;
        ctx.beginPath();
        ctx.moveTo(x, 30);
        ctx.lineTo(x, major ? 66 : 48);
        ctx.stroke();
      }

      // 4 crisp repeating quadrants around circumference so every viewing angle shows crystal-clear engraving
      const drawEngraving = (cx: number) => {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 54px ui-monospace, SFMono-Regular, Menlo, sans-serif';
        ctx.fillText('FE 50/1.4 META', cx, 134);

        ctx.fillStyle = '#34d399';
        ctx.font = '800 34px ui-monospace, SFMono-Regular, Menlo, sans-serif';
        ctx.fillText('28mm ASI · Ø35.7mm · 180g', cx, 184);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '800 26px ui-monospace, SFMono-Regular, Menlo, sans-serif';
        ctx.fillText('0.25m   0.5m   1m   3m   ∞', cx, 224);
      };
      for (let q = 0; q < 4; q++) {
        drawEngraving(w * (0.125 + q * 0.25));
      }
    },
  },

  /** FH32 Core: Ultrasonic Piezo-Silicon MEMS Solid-State Air-Cooling Jet Chip (xMEMS / AirJet Class) */
  fh32MemsChipMap: {
    bucket: 'silicon_photodiode',
    width: 1024,
    height: 682,
    baseColor: 0xffffff,
    metalness: 0.74,
    roughness: 0.18,
    fallbackColor: 0x163858,
    painter: (ctx, w, h) => {
      // Deep DRIE single-crystal silicon MEMS substrate
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#0f2540');
      bg.addColorStop(0.5, '#174469');
      bg.addColorStop(1, '#0d2038');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Gold perimeter high-voltage piezo guard bus & bond pads
      ctx.strokeStyle = '#e5b94c';
      ctx.lineWidth = 6;
      ctx.strokeRect(24, 24, w - 48, h - 48);

      ctx.fillStyle = '#facc15';
      for (let i = 0; i < 16; i++) {
        const px = 64 + ((w - 128) * i) / 15;
        ctx.fillRect(px - 10, 8, 20, 14);
        ctx.fillRect(px - 10, h - 22, 20, 14);
      }

      // 4 x 2 array of ultrasonic piezo-actuated silicon resonance membranes
      const cols = 4;
      const rows = 2;
      const mx = 58;
      const my = 56;
      const cw = (w - mx * 2) / cols;
      const ch = (h - my * 2) / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = mx + c * cw + 12;
          const y = my + r * ch + 12;
          const bw = cw - 24;
          const bh = ch - 24;

          // Active piezo PZT actuator ring
          ctx.fillStyle = '#1e3a5f';
          ctx.fillRect(x, y, bw, bh);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3.2;
          ctx.strokeRect(x, y, bw, bh);

          // Inner oscillating silicon cantilever membrane & golden electrode traces
          ctx.fillStyle = '#0ea5e9';
          ctx.globalAlpha = 0.28;
          ctx.fillRect(x + 16, y + 16, bw - 32, bh - 32);
          ctx.globalAlpha = 1;

          ctx.strokeStyle = '#e5b94c';
          ctx.lineWidth = 2.4;
          ctx.strokeRect(x + 18, y + 18, bw - 36, bh - 36);

          // Central ultrasonic micro-jet suction/discharge slit louver bank
          ctx.fillStyle = '#091526';
          for (let s = 0; s < 5; s++) {
            const sy = y + 36 + s * ((bh - 72) / 4);
            ctx.fillRect(x + 30, sy - 4, bw - 60, 8);
          }
          // Bright metallic air-slot lips
          ctx.strokeStyle = 'rgba(186, 230, 253, 0.72)';
          ctx.lineWidth = 1.2;
          for (let s = 0; s < 5; s++) {
            const sy = y + 36 + s * ((bh - 72) / 4);
            ctx.strokeRect(x + 30, sy - 4, bw - 60, 8);
          }
        }
      }

      // Corner optical/DRIE alignment marks
      drawMicroFiducial(ctx, 42, 42, 11, '#f8fafc');
      drawMicroFiducial(ctx, w - 42, 42, 11, '#f8fafc');
      drawMicroFiducial(ctx, 42, h - 42, 11, '#f8fafc');
      drawMicroFiducial(ctx, w - 42, h - 42, 11, '#f8fafc');
    },
  },

  /** FH32 Core: Sintered Porous Copper Micro-Vapor Chamber Capillary Wick & Arterial Channels */
  fh32CopperWickMap: {
    bucket: 'copper_thermal',
    width: 1024,
    height: 682,
    baseColor: 0xffffff,
    metalness: 0.78,
    roughness: 0.34,
    fallbackColor: 0xc26635,
    painter: (ctx, w, h) => {
      // Rich metallic copper base
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#9a441a');
      grad.addColorStop(0.45, '#c86832');
      grad.addColorStop(0.85, '#b45320');
      grad.addColorStop(1, '#7c3211');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Recessed dark-bronze vapor-flow arterial micro-channels (two hot-zone hubs: Sensor left, SoC right)
      ctx.strokeStyle = 'rgba(56, 20, 5, 0.65)';
      ctx.lineWidth = 10;
      for (let i = 0; i < 14; i++) {
        const y = 42 + ((h - 84) * i) / 13;
        ctx.beginPath();
        ctx.moveTo(36, y);
        ctx.lineTo(w - 36, y);
        ctx.stroke();
      }
      // Cross arterial distribution grooves connecting Sensor hub (30%) and SoC hub (70%)
      ctx.strokeStyle = 'rgba(253, 186, 116, 0.45)';
      ctx.lineWidth = 4;
      for (const hubX of [w * 0.28, w * 0.72]) {
        for (let r = 36; r <= 190; r += 34) {
          ctx.beginPath();
          ctx.arc(hubX, h * 0.5, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Deterministic sintered copper micro-sphere grain bed texture
      let seed = 791923;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      for (let i = 0; i < 3200; i++) {
        const px = rand() * w;
        const py = rand() * h;
        const pr = 1.6 + rand() * 3.8;
        ctx.fillStyle =
          rand() > 0.45
            ? `rgba(251, 191, 128, ${(0.18 + rand() * 0.34).toFixed(2)})`
            : `rgba(82, 31, 9, ${(0.22 + rand() * 0.30).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      // Brazed perimeter copper sealing land
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 14;
      ctx.strokeRect(12, 12, w - 24, h - 24);
    },
  },

  /** FH25 Core: 30,000-nit 240Hz Filterless True-RGB Tandem Micro-OLED / MicroLED Subpixel Emitter Die */
  fh25TandemOledMap: {
    bucket: 'silicon_photodiode',
    width: 1024,
    height: 768,
    baseColor: 0xffffff,
    metalness: 0.42,
    roughness: 0.14,
    fallbackColor: 0x0f172a,
    painter: (ctx, w, h) => {
      // Deep obsidian optical black micro-cavity background
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, w, h);

      // Gold perimeter cathode bus ring
      ctx.strokeStyle = '#e5b94c';
      ctx.lineWidth = 8;
      ctx.strokeRect(18, 18, w - 36, h - 36);

      // Active 4:3 / 3:2 microdisplay active aperture filled with crisp True-RGB vertical stripe emitters
      const ax = 48;
      const ay = 44;
      const aw = w - 96;
      const ah = h - 88;
      ctx.fillStyle = '#0b1220';
      ctx.fillRect(ax, ay, aw, ah);

      // High-purity Color-Filterless Direct RGB Tandem Micro-Subpixels
      const cols = 42;
      const rows = 28;
      const cw = aw / cols;
      const ch = ah / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ax + c * cw + 1.5;
          const y = ay + r * ch + 2;
          const sw = (cw - 4) / 3;
          const sh = ch - 4;
          // Radial vignette glow peaking in center like an active 30,000-nit studio HDR scene
          const dx = (c + 0.5) / cols - 0.5;
          const dy = (r + 0.5) / rows - 0.5;
          const lum = 0.68 + 0.32 * Math.max(0, 1 - Math.hypot(dx, dy) * 1.45);

          ctx.fillStyle = `rgba(244, 63, 94, ${lum.toFixed(2)})`;
          ctx.fillRect(x, y, sw - 0.8, sh);
          ctx.fillStyle = `rgba(16, 185, 129, ${lum.toFixed(2)})`;
          ctx.fillRect(x + sw, y, sw - 0.8, sh);
          ctx.fillStyle = `rgba(56, 189, 248, ${lum.toFixed(2)})`;
          ctx.fillRect(x + sw * 2, y, sw - 0.8, sh);
        }
      }

      // Precision viewfinder AF bracket & HDR framing reticle overlay (studio-crisp white/gold)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
      ctx.lineWidth = 3;
      const fx = ax + aw * 0.14;
      const fy = ay + ah * 0.16;
      const fw = aw * 0.72;
      const fh = ah * 0.68;
      const corner = 34;
      // 4 framing corner brackets
      ctx.beginPath();
      ctx.moveTo(fx, fy + corner); ctx.lineTo(fx, fy); ctx.lineTo(fx + corner, fy);
      ctx.moveTo(fx + fw - corner, fy); ctx.lineTo(fx + fw, fy); ctx.lineTo(fx + fw, fy + corner);
      ctx.moveTo(fx, fy + fh - corner); ctx.lineTo(fx, fy + fh); ctx.lineTo(fx + corner, fy + fh);
      ctx.moveTo(fx + fw - corner, fy + fh); ctx.lineTo(fx + fw, fy + fh); ctx.lineTo(fx + fw, fy + fh - corner);
      ctx.stroke();

      // Central Eye-AF green lock reticle
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 4;
      ctx.strokeRect(w * 0.5 - 42, h * 0.5 - 42, 84, 84);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.76)';
      ctx.fillRect(ax + 12, ay + ah - 42, aw - 24, 34);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '800 20px ui-monospace, SFMono-Regular, Menlo, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TRUE-RGB TANDEM  ·  30,000 nit  ·  240Hz BFI  ·  30M DOTS', w * 0.5, ay + ah - 18);
    },
  },

  /** FH25 Core: 12-inch Wafer 30M-Dot 240Hz BFI Si-CMOS EVF Driver Backplane */
  fh25EvfReticleMap: {
    bucket: 'silicon_hero',
    width: 1024,
    height: 768,
    baseColor: 0xffffff,
    metalness: 0.78,
    roughness: 0.2,
    fallbackColor: 0x1e334d,
    painter: (ctx, w, h) => {
      ctx.fillStyle = '#142234';
      ctx.fillRect(0, 0, w, h);

      // Perimeter high-speed 240Hz column DACs (top & bottom) and row scan drivers (left & right)
      ctx.fillStyle = '#254266';
      ctx.fillRect(88, 28, w - 176, 74);
      ctx.fillRect(88, h - 102, w - 176, 74);
      ctx.fillStyle = '#1d4f5a';
      ctx.fillRect(28, 118, 52, h - 236);
      ctx.fillRect(w - 80, 118, 52, h - 236);

      // Gold column busbars & fine source driver blocks
      for (let i = 0; i < 32; i++) {
        const x = 96 + ((w - 192) * i) / 32;
        ctx.fillStyle = i % 2 === 0 ? 'rgba(245, 158, 11, 0.58)' : 'rgba(56, 189, 248, 0.45)';
        ctx.fillRect(x, 36, (w - 192) / 32 - 3, 58);
        ctx.fillRect(x, h - 94, (w - 192) / 32 - 3, 58);
      }

      // Central 30M-dot LTPO/Si-CMOS pixel current-driver matrix with copper Mura-correction grid
      const cx0 = 96;
      const cy0 = 118;
      const cw0 = w - 192;
      const ch0 = h - 236;
      ctx.fillStyle = '#1b314b';
      ctx.fillRect(cx0, cy0, cw0, ch0);
      ctx.strokeStyle = '#d98a42';
      ctx.lineWidth = 3;
      ctx.strokeRect(cx0, cy0, cw0, ch0);

      for (let r = 0; r < 14; r++) {
        for (let c = 0; c < 18; c++) {
          const x = cx0 + (c * cw0) / 18 + 3;
          const y = cy0 + (r * ch0) / 14 + 3;
          const bw = cw0 / 18 - 6;
          const bh = ch0 / 14 - 6;
          ctx.fillStyle = (r + c) % 2 === 0 ? 'rgba(56, 189, 248, 0.16)' : 'rgba(16, 185, 129, 0.14)';
          ctx.fillRect(x, y, bw, bh);
          ctx.strokeStyle = 'rgba(226, 232, 240, 0.22)';
          ctx.lineWidth = 0.8;
          ctx.strokeRect(x, y, bw, bh);
        }
      }

      drawMicroFiducial(ctx, 54, 65, 14, '#e5b94c');
      drawMicroFiducial(ctx, w - 54, 65, 14, '#e5b94c');
      drawMicroFiducial(ctx, 54, h - 65, 14, '#e5b94c');
      drawMicroFiducial(ctx, w - 54, h - 65, 14, '#e5b94c');
    },
  },
};
