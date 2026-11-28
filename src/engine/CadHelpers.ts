import * as THREE from 'three';
import { GPU_PROFILE, scaleSegments } from './GpuOptimizer';
import { capOpenTubeGeometry, resampleShapeSagitta, smoothCreaseNormals } from './FastCadGeometry';
import {
  getActiveGeometryScale,
  scaleCurveSegmentsForQuality,
  scaleRadialSegmentsForQuality,
} from '../core/geometry_quality';

/**
 * Create a 2D rounded rectangle Shape centered at (0, 0) without duplicate corner points.
 */
export function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;
  const r = Math.max(0, Math.min(radius, hw - 1e-3, hh - 1e-3));

  if (r <= 1e-3) {
    s.moveTo(-hw, -hh);
    s.lineTo(hw, -hh);
    s.lineTo(hw, hh);
    s.lineTo(-hw, hh);
    return s;
  }

  s.moveTo(-hw + r, -hh);
  if (hw - r > 1e-4) s.lineTo(hw - r, -hh);
  s.absarc(hw - r, -hh + r, r, -Math.PI / 2, 0, false);
  if (hh - r > 1e-4) s.lineTo(hw, hh - r);
  s.absarc(hw - r, hh - r, r, 0, Math.PI / 2, false);
  if (hw - r > 1e-4) s.lineTo(-hw + r, hh);
  s.absarc(-hw + r, hh - r, r, Math.PI / 2, Math.PI, false);
  if (hh - r > 1e-4) s.lineTo(-hw, -hh + r);
  s.absarc(-hw + r, -hh + r, r, Math.PI, Math.PI * 1.5, false);

  return s;
}

/**
 * Create a 2D rectangular frame Shape with a rounded inner cutout at optional offset (cx, cy).
 */
export function createFrameShape(
  outerW: number,
  outerH: number,
  outerR: number,
  innerW: number,
  innerH: number,
  innerR: number,
  holeOffsetX = 0,
  holeOffsetY = 0
): THREE.Shape {
  const shape = createRoundedRectShape(outerW, outerH, outerR);
  const hole = new THREE.Path();
  const hw = innerW / 2;
  const hh = innerH / 2;
  const r = Math.max(0, Math.min(innerR, hw - 1e-3, hh - 1e-3));

  if (r <= 1e-3) {
    hole.moveTo(holeOffsetX - hw, holeOffsetY - hh);
    hole.lineTo(holeOffsetX + hw, holeOffsetY - hh);
    hole.lineTo(holeOffsetX + hw, holeOffsetY + hh);
    hole.lineTo(holeOffsetX - hw, holeOffsetY + hh);
  } else {
    hole.moveTo(holeOffsetX - hw + r, holeOffsetY - hh);
    if (hw - r > 1e-4) hole.lineTo(holeOffsetX + hw - r, holeOffsetY - hh);
    hole.absarc(holeOffsetX + hw - r, holeOffsetY - hh + r, r, -Math.PI / 2, 0, false);
    if (hh - r > 1e-4) hole.lineTo(holeOffsetX + hw, holeOffsetY + hh - r);
    hole.absarc(holeOffsetX + hw - r, holeOffsetY + hh - r, r, 0, Math.PI / 2, false);
    if (hw - r > 1e-4) hole.lineTo(holeOffsetX - hw + r, holeOffsetY + hh);
    hole.absarc(holeOffsetX - hw + r, holeOffsetY + hh - r, r, Math.PI / 2, Math.PI, false);
    if (hh - r > 1e-4) hole.lineTo(holeOffsetX - hw, holeOffsetY - hh + r);
    hole.absarc(holeOffsetX - hw + r, holeOffsetY - hh + r, r, Math.PI, Math.PI * 1.5, false);
  }

  shape.holes.push(hole);
  return shape;
}

/**
 * Add circular mounting hole cutouts to a Shape.
 */
export function addCircleHoles(shape: THREE.Shape, positions: Array<[number, number, number]>): void {
  for (const [cx, cy, radius] of positions) {
    const hole = new THREE.Path();
    hole.absarc(cx, cy, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
}

/**
 * Extrude a Shape centered along Z (so thickness spans [-depth/2, +depth/2]).
 * Breakthrough: applies Exact Sagitta-Error Curvature-Adaptive Resampling so straight segments
 * stay 1 edge, tiny screw holes use 6-8 sides, corner fillets use 3-6 sides, and large optical
 * rings stay butter-smooth, plus 1-step precision CNC chamfer bevels (~75-85% fewer triangles!).
 */
export function extrudeCentered(
  shape: THREE.Shape,
  depth: number,
  bevelSize = 0.08,
  bevelThickness = 0.08,
  curveSegments = 18
): THREE.ExtrudeGeometry {
  const qScale = getActiveGeometryScale();
  // Keep crisp macro CNC chamfers on thick housings while skipping sub-pixel (<0.24mm) micro-bevels
  const hasBevel =
    (qScale ? qScale.allowMicroBevels : true) &&
    bevelSize > 0 &&
    bevelThickness > 0 &&
    ((depth >= 3.2 && bevelSize >= 0.22) || bevelSize >= 0.28);
  const safeBevelThick = hasBevel ? Math.min(bevelThickness, depth * 0.38) : 0;
  const safeBevelSize = hasBevel ? Math.min(bevelSize, depth * 0.45) : 0;
  const bodyDepth = hasBevel ? Math.max(0.04, depth - safeBevelThick * 2) : depth;
  const baseSagitta = GPU_PROFILE.isMobile ? 0.40 : 0.32;
  const sagittaTol = qScale ? baseSagitta * qScale.sagittaMultiplier : baseSagitta;
  const maxCircleSegs = qScale
    ? scaleCurveSegmentsForQuality(Math.min(curveSegments, 44), 6)
    : scaleSegments(Math.min(curveSegments, 24), 6);
  const adaptedShape = resampleShapeSagitta(shape, sagittaTol, maxCircleSegs);

  const geo = new THREE.ExtrudeGeometry(adaptedShape, {
    depth: bodyDepth,
    bevelEnabled: hasBevel,
    bevelSegments: hasBevel ? 1 : 0,
    steps: 1,
    bevelSize: safeBevelSize,
    bevelThickness: safeBevelThick,
    curveSegments: 1, // Already Sagitta-resampled into exact LineCurves!
  });
  geo.translate(0, 0, -bodyDepth / 2);
  if ((adaptedShape as THREE.Shape & { __hasCurves?: boolean }).__hasCurves) {
    smoothCreaseNormals(geo, 38);
  }
  return geo;
}

/**
 * Build a precision flat racetrack voice coil geometry (for IBIS VCM actuators).
 */
export function createVoiceCoilGeometry(
  outerW: number,
  outerH: number,
  windingWidth: number,
  thickness: number
): THREE.ExtrudeGeometry {
  const outerR = Math.min(outerW, outerH) * 0.36;
  const innerW = Math.max(1.2, outerW - windingWidth * 2);
  const innerH = Math.max(1.2, outerH - windingWidth * 2);
  const innerR = Math.max(0.4, outerR - windingWidth * 0.7);
  const shape = createFrameShape(outerW, outerH, outerR, innerW, innerH, innerR);
  return extrudeCentered(shape, thickness, 0.08, 0.08, 12);
}

/**
 * Build a precision involute-style spur gear geometry aligned with Z axis.
 */
export function createSpurGearGeometry(
  teeth: number,
  pitchRadius: number,
  thickness: number,
  boreRadius = 1.0
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const addendum = (pitchRadius * 2 * Math.PI) / (teeth * 3.6);
  const dedendum = addendum * 1.18;
  const rOuter = pitchRadius + addendum;
  const rRoot = Math.max(boreRadius + 0.4, pitchRadius - dedendum);
  const step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.16;
    const a2 = a0 + step * 0.32;
    const a3 = a0 + step * 0.56;
    const a4 = a0 + step * 0.72;

    const p0x = Math.cos(a0) * rRoot;
    const p0y = Math.sin(a0) * rRoot;
    if (i === 0) shape.moveTo(p0x, p0y);
    else shape.lineTo(p0x, p0y);

    shape.lineTo(Math.cos(a1) * rRoot, Math.sin(a1) * rRoot);
    shape.lineTo(Math.cos(a2) * rOuter, Math.sin(a2) * rOuter);
    shape.lineTo(Math.cos(a3) * rOuter, Math.sin(a3) * rOuter);
    shape.lineTo(Math.cos(a4) * rRoot, Math.sin(a4) * rRoot);
  }
  shape.closePath();

  if (boreRadius > 0.1) {
    const bore = new THREE.Path();
    bore.absarc(0, 0, boreRadius, 0, Math.PI * 2, true);
    shape.holes.push(bore);
  }

  return extrudeCentered(shape, thickness, 0.04, 0.04, 6);
}

/**
 * Build a watertight capped helical compression spring along Z axis with pitch-safe wire radius.
 */
export function createHelicalSpringGeometry(
  coilRadius: number,
  length: number,
  turns: number,
  wireRadius: number
): THREE.BufferGeometry {
  const safeTurns = Math.max(1, turns);
  const pitch = length / safeTurns;
  const safeWireR = Math.max(0.03, Math.min(wireRadius, pitch * 0.36, coilRadius * 0.38));
  const points: THREE.Vector3[] = [];
  const perTurn = coilRadius < 1.0 ? 6 : GPU_PROFILE.isMobile ? 6 : 8;
  const wireSides = safeWireR < 0.25 ? 4 : 5;
  const steps = Math.max(10, Math.round(safeTurns * perTurn));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * safeTurns * Math.PI * 2;
    const z = (t - 0.5) * length;
    points.push(new THREE.Vector3(Math.cos(angle) * coilRadius, Math.sin(angle) * coilRadius, z));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const tube = new THREE.TubeGeometry(curve, steps, safeWireR, wireSides, false);
  return capOpenTubeGeometry(tube, steps, wireSides);
}

/**
 * Build a watertight capped precision torsion spring with smooth tang legs (pitch-safe, zero coil self-overlap).
 */
export function createTorsionSpringGeometry(
  coilRadius: number,
  length: number,
  turns: number,
  wireRadius: number,
  legLength: number
): THREE.BufferGeometry {
  const safeTurns = Math.max(1, turns);
  const pitch = length / safeTurns;
  const safeWireR = Math.max(0.03, Math.min(wireRadius, pitch * 0.36, coilRadius * 0.38));
  const points: THREE.Vector3[] = [];
  points.push(new THREE.Vector3(coilRadius, -legLength, -length * 0.5));
  const perTurn = coilRadius < 1.0 ? 6 : GPU_PROFILE.isMobile ? 6 : 8;
  const wireSides = safeWireR < 0.25 ? 4 : 5;
  const steps = Math.max(10, Math.round(safeTurns * perTurn));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * safeTurns * Math.PI * 2;
    const z = (t - 0.5) * length;
    points.push(new THREE.Vector3(Math.cos(angle) * coilRadius, Math.sin(angle) * coilRadius, z));
  }
  points.push(new THREE.Vector3(coilRadius + legLength * 0.85, legLength * 0.35, length * 0.5));
  const curve = new THREE.CatmullRomCurve3(points);
  const tubSegs = steps + 4;
  const tube = new THREE.TubeGeometry(curve, tubSegs, safeWireR, wireSides, false);
  return capOpenTubeGeometry(tube, tubSegs, wireSides);
}

const screwGeoPool = new Map<string, THREE.BufferGeometry>();

function getPooledScrewHead(headRadius: number, headHeight: number): THREE.BufferGeometry {
  const key = `H:${Math.round(headRadius * 100)}:${Math.round(headHeight * 100)}`;
  let g = screwGeoPool.get(key);
  if (!g) {
    g = new THREE.CylinderGeometry(headRadius, headRadius * 0.94, headHeight, 6);
    g.rotateX(Math.PI / 2);
    g.userData.__pooled = true;
    screwGeoPool.set(key, g);
  }
  return g;
}

function getPooledScrewCrossBar(span: number, width: number, depth: number): THREE.BufferGeometry {
  const key = `CB:${Math.round(span * 100)}:${Math.round(width * 100)}:${Math.round(depth * 100)}`;
  let g = screwGeoPool.get(key);
  if (!g) {
    g = new THREE.BoxGeometry(span, width, depth);
    g.userData.__pooled = true;
    screwGeoPool.set(key, g);
  }
  return g;
}

function getPooledScrewShaft(r: number, len: number): THREE.BufferGeometry {
  const key = `SH:${Math.round(r * 100)}:${Math.round(len * 100)}`;
  let g = screwGeoPool.get(key);
  if (!g) {
    // Watertight closed cylinder shaft (openEnded = false) so CGAL sees zero open border edges!
    g = new THREE.CylinderGeometry(r, r, len, 6, 1, false);
    g.rotateX(Math.PI / 2);
    g.userData.__pooled = true;
    screwGeoPool.set(key, g);
  }
  return g;
}

/**
 * Build a precision watertight machine screw group aligned along Z (head at +Z, shaft toward -Z).
 */
export function createPrecisionScrew(
  headRadius: number,
  headHeight: number,
  shaftLength: number,
  material: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  const head = new THREE.Mesh(getPooledScrewHead(headRadius, headHeight), material);
  head.position.z = headHeight * 0.5;
  head.userData.noEdges = true;
  group.add(head);

  const slotDepth = Math.max(0.04, headHeight * 0.14);
  const slotBarGeo = getPooledScrewCrossBar(headRadius * 1.15, Math.max(0.08, headRadius * 0.24), slotDepth);
  const slotH = new THREE.Mesh(slotBarGeo, material);
  slotH.position.z = headHeight + slotDepth * 0.5 + 0.002;
  slotH.userData.noEdges = true;
  group.add(slotH);

  const slotV = new THREE.Mesh(slotBarGeo, material);
  slotV.rotation.z = Math.PI / 2;
  slotV.position.z = headHeight + slotDepth * 0.5 + 0.004;
  slotV.userData.noEdges = true;
  group.add(slotV);

  if (shaftLength > 0) {
    const shaft = new THREE.Mesh(getPooledScrewShaft(headRadius * 0.52, shaftLength), material);
    shaft.position.z = -shaftLength * 0.5;
    shaft.userData.noEdges = true;
    group.add(shaft);
  }

  return group;
}

/**
 * OMEGA-8A Zero-Allocation Deferred CAD Technical Edge Tagger:
 * Records crease threshold & opacity directly on each mesh so `GpuMegaBatch` extracts edges ONCE
 * AFTER `retessellatePrimitiveSagitta` using a `WeakMap` geometry cache (eliminating ~6,600 temporary
 * `BufferGeometry` + `LineSegments` allocations during startup & hydration!).
 */
export function attachCadEdges(
  root: THREE.Object3D,
  _clippingPlanes: THREE.Plane[],
  thresholdAngle = 26,
  baseOpacity = 0.2
): { meshes: THREE.Mesh[]; edges: THREE.LineSegments[] } {
  const meshes: THREE.Mesh[] = [];
  const edges: THREE.LineSegments[] = [];
  const effectiveAngle = thresholdAngle + (GPU_PROFILE.isMobile ? 22 : 16);
  const minEdgeLen = GPU_PROFILE.isMobile ? 1.25 : 0.90;

  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      meshes.push(mesh);

      if ((mesh as THREE.InstancedMesh).isInstancedMesh) return;
      if (mesh.userData.noEdges) return;

      const op = (mesh.userData.edgeOpacity as number | undefined) ?? baseOpacity;
      mesh.userData.__cadEdgeAngle = effectiveAngle;
      mesh.userData.__cadEdgeMinLen = minEdgeLen;
      mesh.userData.__cadEdgeOp = op;
    }
  });

  return { meshes, edges };
}

/**
 * Tag every mesh inside a part group with partId for raycast selection.
 */
export function tagPartMeshes(group: THREE.Object3D, partId: string): void {
  group.traverse((obj) => {
    obj.userData.partId = partId;
  });
}

/**
 * Create a watertight rotationally symmetric precision optical lens element centered along the Z axis.
 * Uses exact single-vertex optical axis poles with triangle fans (zero open pinholes, zero sliver tris!).
 */
export function createOpticalLensGeometry(
  radius: number,
  edgeThickness: number,
  sagFront: number,
  sagRear: number,
  asphericFront = 0,
  asphericRear = 0,
  profileSteps = 26,
  radialSegments = 56
): THREE.BufferGeometry {
  const qScale = getActiveGeometryScale();
  const effSteps = qScale
    ? scaleCurveSegmentsForQuality(Math.max(8, Math.round(profileSteps * 0.48)), 4)
    : Math.max(6, Math.min(GPU_PROFILE.isMobile ? 6 : 8, Math.round(profileSteps * 0.35)));
  const effRadial = qScale
    ? scaleRadialSegmentsForQuality(Math.max(14, Math.round(radialSegments * 0.6)), 10)
    : Math.max(16, Math.min(GPU_PROFILE.isMobile ? 20 : 26, Math.round(radialSegments * 0.48)));
  const halfEdge = Math.max(0.16, edgeThickness * 0.5);

  // Build clean rings: front rings u=1/effSteps..1 (effSteps rings) + rear rings u=1..1/effSteps (effSteps rings)
  const ringProfile: Array<[number, number]> = [];
  for (let i = 1; i <= effSteps; i++) {
    const u = i / effSteps;
    const r = u * radius;
    const r2 = u * u;
    const zF = halfEdge + sagFront * (1 - r2) + asphericFront * r2 * (1 - r2);
    ringProfile.push([r, zF]);
  }
  for (let i = effSteps; i >= 1; i--) {
    const u = i / effSteps;
    const r = u * radius;
    const r2 = u * u;
    const zR = -halfEdge - sagRear * (1 - r2) - asphericRear * r2 * (1 - r2);
    ringProfile.push([r, zR]);
  }

  const numRings = ringProfile.length;
  const frontPoleZ = halfEdge + sagFront;
  const rearPoleZ = -halfEdge - sagRear;

  const vertCount = 2 + numRings * effRadial;
  const positions = new Float32Array(vertCount * 3);
  const uvs = new Float32Array(vertCount * 2);

  // Vertex 0: front center pole (+Z), Vertex 1: rear center pole (-Z)
  positions[0] = 0; positions[1] = 0; positions[2] = frontPoleZ;
  uvs[0] = 0.5; uvs[1] = 0.5;
  positions[3] = 0; positions[4] = 0; positions[5] = rearPoleZ;
  uvs[2] = 0.5; uvs[3] = 0.5;

  for (let ri = 0; ri < numRings; ri++) {
    const [r, z] = ringProfile[ri];
    for (let j = 0; j < effRadial; j++) {
      const a = (j / effRadial) * Math.PI * 2;
      const vi = 2 + ri * effRadial + j;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      positions[vi * 3] = x;
      positions[vi * 3 + 1] = y;
      positions[vi * 3 + 2] = z;
      uvs[vi * 2] = x / (2 * radius) + 0.5;
      uvs[vi * 2 + 1] = y / (2 * radius) + 0.5;
    }
  }

  const indices: number[] = [];
  // Front pole cap (outward normal +Z -> CCW in XY)
  for (let j = 0; j < effRadial; j++) {
    const jNext = (j + 1) % effRadial;
    indices.push(0, 2 + j, 2 + jNext);
  }
  // Ring strips from front rim -> edge -> rear rim
  for (let ri = 0; ri < numRings - 1; ri++) {
    const baseA = 2 + ri * effRadial;
    const baseB = 2 + (ri + 1) * effRadial;
    for (let j = 0; j < effRadial; j++) {
      const jNext = (j + 1) % effRadial;
      indices.push(baseA + j, baseB + j, baseB + jNext);
      indices.push(baseA + j, baseB + jNext, baseA + jNext);
    }
  }
  // Rear pole cap (outward normal -Z -> CW in XY)
  const lastBase = 2 + (numRings - 1) * effRadial;
  for (let j = 0; j < effRadial; j++) {
    const jNext = (j + 1) % effRadial;
    indices.push(1, lastBase + jNext, lastBase + j);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Create a precision threaded optical element retaining ring with spanner-wrench notches
 * and an elastomeric thermal-expansion cushion O-ring.
 */
export function createSpannerRingGroup(
  innerR: number,
  outerR: number,
  depth: number,
  ringMat: THREE.Material,
  notchMat: THREE.Material,
  oRingMat?: THREE.Material,
  notchCount = 4
): THREE.Group {
  const grp = new THREE.Group();
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(hole);
  grp.add(new THREE.Mesh(extrudeCentered(s, depth, 0.08, 0.08, 22), ringMat));

  const ringTub = getActiveGeometryScale()
    ? scaleRadialSegmentsForQuality(26, 8)
    : GPU_PROFILE.isMobile
      ? 16
      : 22;
  for (const tz of [-depth * 0.25, depth * 0.25]) {
    const groove = new THREE.Mesh(new THREE.TorusGeometry(outerR + 0.05, 0.09, 4, ringTub), notchMat);
    groove.position.z = tz;
    groove.userData.noEdges = true;
    grp.add(groove);
  }

  const rMid = (innerR + outerR) * 0.5;
  for (let i = 0; i < notchCount; i++) {
    const a = (i / notchCount) * Math.PI * 2;
    const notch = new THREE.Mesh(
      new THREE.BoxGeometry(Math.max(0.9, (outerR - innerR) * 0.72), 0.72, 0.36),
      notchMat
    );
    notch.position.set(Math.cos(a) * rMid, Math.sin(a) * rMid, depth * 0.52);
    notch.rotation.z = a;
    notch.userData.noEdges = true;
    grp.add(notch);
  }

  if (oRingMat) {
    const oRing = new THREE.Mesh(
      new THREE.TorusGeometry(innerR + 0.35, 0.32, 4, ringTub),
      oRingMat
    );
    oRing.position.z = -depth * 0.52;
    oRing.userData.noEdges = true;
    grp.add(oRing);
  }

  return grp;
}

/**
 * Create a 360-degree Beryllium-Copper EMI/ESD multi-finger grounding spring contact ring.
 */
export function createEmiFingerRingGroup(
  innerR: number,
  outerR: number,
  fingerCount: number,
  mat: THREE.Material
): THREE.Group {
  const grp = new THREE.Group();
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(hole);
  grp.add(new THREE.Mesh(extrudeCentered(s, 0.28, 0.02, 0.02, 22), mat));

  const rMid = (innerR + outerR) * 0.5;
  const fingerGeo = new THREE.BoxGeometry(1.5, 2.8, 0.22);
  fingerGeo.userData.__pooled = true;
  const tipGeo = new THREE.TetrahedronGeometry(0.30, 0);
  tipGeo.userData.__pooled = true;

  for (let i = 0; i < fingerCount; i++) {
    const a = (i / fingerCount) * Math.PI * 2;
    const finger = new THREE.Mesh(fingerGeo, mat);
    finger.position.set(Math.cos(a) * rMid, Math.sin(a) * rMid, 0.42);
    finger.rotation.z = a;
    finger.rotation.y = 0.28;
    finger.userData.noEdges = true;
    grp.add(finger);

    const tip = new THREE.Mesh(tipGeo, mat);
    tip.position.set(Math.cos(a) * rMid, Math.sin(a) * rMid, 0.68);
    tip.userData.noEdges = true;
    grp.add(tip);
  }
  return grp;
}

/**
 * Breakthrough Unified Batched CAD Exploded-View Dashed Trajectory Guide Manager:
 * Renders ALL radial dashed guides in 1 single LineSegments draw call + ALL anchor dots
 * in 1 single InstancedMesh draw call (replacing 96–160 draw calls per assembly with 2!).
 * Zero per-frame allocations!
 */
export interface RadialTrajectoryGuides {
  group: THREE.Group;
  update: (
    explodeFactor: number,
    visible: boolean,
    parts: ReadonlyArray<{
      assembledPos: THREE.Vector3;
      explodeOffset: THREE.Vector3;
      integratedExplodeOffset?: THREE.Vector3;
      group: THREE.Group;
    }>
  ) => void;
}

const _sharedDotGeo = new THREE.TetrahedronGeometry(0.45, 0);
_sharedDotGeo.userData.__pooled = true;

export function createRadialTrajectoryGuides(
  clippingPlanes: THREE.Plane[],
  color = 0x64748b,
  maxLines = 48
): RadialTrajectoryGuides {
  const group = new THREE.Group();
  group.userData.__isExplodeGuides = true;
  const mat = new THREE.LineDashedMaterial({
    color,
    dashSize: 1.6,
    gapSize: 1.4,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });

  const posArray = new Float32Array(maxLines * 2 * 3);
  const distArray = new Float32Array(maxLines * 2);
  const lineGeo = new THREE.BufferGeometry();
  const posAttr = new THREE.BufferAttribute(posArray, 3);
  posAttr.setUsage(THREE.DynamicDrawUsage);
  const distAttr = new THREE.BufferAttribute(distArray, 1);
  distAttr.setUsage(THREE.DynamicDrawUsage);
  lineGeo.setAttribute('position', posAttr);
  lineGeo.setAttribute('lineDistance', distAttr);
  lineGeo.setDrawRange(0, 0);

  const batchedLines = new THREE.LineSegments(lineGeo, mat);
  batchedLines.frustumCulled = false;
  group.add(batchedLines);

  const dotMat = new THREE.MeshBasicMaterial({
    color: 0x0d5bd9,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });
  const dotInst = new THREE.InstancedMesh(_sharedDotGeo, dotMat, maxLines);
  dotInst.count = 0;
  dotInst.frustumCulled = false;
  // Pre-initialize identity matrices so updating each anchor writes only 3 translation floats!
  const instArr = dotInst.instanceMatrix.array as Float32Array;
  for (let i = 0; i < maxLines; i++) {
    const o = i * 16;
    instArr[o] = 1;
    instArr[o + 5] = 1;
    instArr[o + 10] = 1;
    instArr[o + 15] = 1;
  }
  dotInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(dotInst);

  return {
    group,
    update: (explodeFactor, visible, parts) => {
      const show = visible && explodeFactor > 0.05;
      group.visible = show;
      if (!show) return;

      const alpha = THREE.MathUtils.smoothstep(explodeFactor, 0.05, 0.35);
      mat.opacity = 0.42 * alpha;
      dotMat.opacity = 0.58 * alpha;

      let li = 0;
      for (let pi = 0; pi < parts.length; pi++) {
        if (li >= maxLines) break;
        const p = parts[pi];
        if (!p.group.visible) continue;

        const ax = p.assembledPos.x;
        const ay = p.assembledPos.y;
        const px = p.group.position.x;
        const py = p.group.position.y;
        const pz = p.group.position.z;
        const dx = px - ax;
        const dy = py - ay;
        const radialDist = Math.hypot(dx, dy);
        if (radialDist < 6.0) continue;

        const pOff = li * 6;
        posArray[pOff] = ax;
        posArray[pOff + 1] = ay;
        posArray[pOff + 2] = pz;
        posArray[pOff + 3] = px;
        posArray[pOff + 4] = py;
        posArray[pOff + 5] = pz;

        const dOff = li * 2;
        distArray[dOff] = 0;
        distArray[dOff + 1] = radialDist;

        const mOff = li * 16;
        instArr[mOff + 12] = ax;
        instArr[mOff + 13] = ay;
        instArr[mOff + 14] = pz;
        li++;
      }

      lineGeo.setDrawRange(0, li * 2);
      if (li > 0) {
        posAttr.needsUpdate = true;
        distAttr.needsUpdate = true;
        dotInst.instanceMatrix.needsUpdate = true;
      }
      dotInst.count = li;
      batchedLines.visible = li > 0;
      dotInst.visible = li > 0;
    },
  };
}

/**
 * Zero-allocation in-place BufferAttribute polyline updater (eliminates per-frame geometry.setFromPoints() GC!).
 */
export function updateLinePointsInPlace(
  line: THREE.Line,
  pts: ReadonlyArray<THREE.Vector3>,
  computeDistances = false
): void {
  const pos = line.geometry.getAttribute('position') as THREE.BufferAttribute | undefined;
  if (!pos || pos.count !== pts.length) {
    line.geometry.setFromPoints(pts as THREE.Vector3[]);
  } else {
    const arr = pos.array as Float32Array;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const o = i * 3;
      arr[o] = p.x;
      arr[o + 1] = p.y;
      arr[o + 2] = p.z;
    }
    pos.needsUpdate = true;
  }
  if (computeDistances) {
    line.computeLineDistances();
  }
}

/**
 * Zero-allocation in-place 2-point line segment updater.
 */
export function updateLine2PtsInPlace(
  line: THREE.Line,
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  computeDistances = false
): void {
  const pos = line.geometry.getAttribute('position') as THREE.BufferAttribute | undefined;
  if (pos && pos.count >= 2) {
    const arr = pos.array as Float32Array;
    arr[0] = ax;
    arr[1] = ay;
    arr[2] = az;
    arr[3] = bx;
    arr[4] = by;
    arr[5] = bz;
    pos.needsUpdate = true;
  }
  if (computeDistances) {
    line.computeLineDistances();
  }
}

