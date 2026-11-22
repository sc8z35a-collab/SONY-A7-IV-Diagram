import * as THREE from 'three';

/**
 * Create a 2D rounded rectangle Shape centered at (0, 0).
 */
export function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;
  const r = Math.min(radius, hw, hh);

  s.moveTo(-hw + r, -hh);
  s.lineTo(hw - r, -hh);
  s.absarc(hw - r, -hh + r, r, -Math.PI / 2, 0, false);
  s.lineTo(hw, hh - r);
  s.absarc(hw - r, hh - r, r, 0, Math.PI / 2, false);
  s.lineTo(-hw + r, hh);
  s.absarc(-hw + r, hh - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-hw, -hh + r);
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
  const r = Math.min(innerR, hw, hh);

  hole.moveTo(holeOffsetX - hw + r, holeOffsetY - hh);
  hole.lineTo(holeOffsetX + hw - r, holeOffsetY - hh);
  hole.absarc(holeOffsetX + hw - r, holeOffsetY - hh + r, r, -Math.PI / 2, 0, false);
  hole.lineTo(holeOffsetX + hw, holeOffsetY + hh - r);
  hole.absarc(holeOffsetX + hw - r, holeOffsetY + hh - r, r, 0, Math.PI / 2, false);
  hole.lineTo(holeOffsetX - hw + r, holeOffsetY + hh);
  hole.absarc(holeOffsetX - hw + r, holeOffsetY + hh - r, r, Math.PI / 2, Math.PI, false);
  hole.lineTo(holeOffsetX - hw, holeOffsetY - hh + r);
  hole.absarc(holeOffsetX - hw + r, holeOffsetY - hh + r, r, Math.PI, Math.PI * 1.5, false);

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
 */
export function extrudeCentered(
  shape: THREE.Shape,
  depth: number,
  bevelSize = 0.08,
  bevelThickness = 0.08,
  curveSegments = 18
): THREE.ExtrudeGeometry {
  const hasBevel = bevelSize > 0 && bevelThickness > 0;
  const bodyDepth = hasBevel ? Math.max(0.02, depth - bevelThickness * 2) : depth;
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: bodyDepth,
    bevelEnabled: hasBevel,
    bevelSegments: hasBevel ? 2 : 0,
    steps: 1,
    bevelSize,
    bevelThickness,
    curveSegments: Math.min(curveSegments, 32),
  });
  geo.translate(0, 0, -bodyDepth / 2);
  geo.computeVertexNormals();
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
  return extrudeCentered(shape, thickness, 0.08, 0.08, 20);
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
 * Build a helical compression spring along Z axis.
 */
export function createHelicalSpringGeometry(
  coilRadius: number,
  length: number,
  turns: number,
  wireRadius: number
): THREE.TubeGeometry {
  const points: THREE.Vector3[] = [];
  const steps = Math.round(turns * 16);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const z = (t - 0.5) * length;
    points.push(new THREE.Vector3(Math.cos(angle) * coilRadius, Math.sin(angle) * coilRadius, z));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, steps, wireRadius, 6, false);
}

/**
 * Build a precision torsion spring with straight tang legs (used to fire shutter curtains).
 */
export function createTorsionSpringGeometry(
  coilRadius: number,
  length: number,
  turns: number,
  wireRadius: number,
  legLength: number
): THREE.TubeGeometry {
  const points: THREE.Vector3[] = [];
  // Entry tang leg
  points.push(new THREE.Vector3(coilRadius, -legLength, -length * 0.5));
  const steps = Math.round(turns * 14);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const z = (t - 0.5) * length;
    points.push(new THREE.Vector3(Math.cos(angle) * coilRadius, Math.sin(angle) * coilRadius, z));
  }
  // Exit tang leg
  points.push(new THREE.Vector3(coilRadius + legLength * 0.85, legLength * 0.35, length * 0.5));
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, steps + 12, wireRadius, 6, false);
}

const screwSlotMatCache = new WeakMap<THREE.Material, THREE.MeshStandardMaterial>();

/**
 * Build a precision machine screw group aligned along Z (head at +Z, shaft toward -Z).
 */
export function createPrecisionScrew(
  headRadius: number,
  headHeight: number,
  shaftLength: number,
  material: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  const headGeo = new THREE.CylinderGeometry(headRadius, headRadius * 0.94, headHeight, 14);
  headGeo.rotateX(Math.PI / 2);
  const head = new THREE.Mesh(headGeo, material);
  head.position.z = headHeight * 0.5;
  group.add(head);

  let slotMat = screwSlotMatCache.get(material);
  if (!slotMat) {
    slotMat = new THREE.MeshStandardMaterial({
      color: 0x1a1d22,
      metalness: 0.6,
      roughness: 0.5,
      clippingPlanes: (material as THREE.MeshStandardMaterial).clippingPlanes ?? undefined,
    });
    screwSlotMatCache.set(material, slotMat);
  }
  const slot1 = new THREE.Mesh(
    new THREE.BoxGeometry(headRadius * 1.15, headRadius * 0.24, 0.14),
    slotMat
  );
  slot1.position.z = headHeight + 0.01;
  slot1.userData.noEdges = true;
  const slot2 = new THREE.Mesh(
    new THREE.BoxGeometry(headRadius * 0.24, headRadius * 1.15, 0.14),
    slotMat
  );
  slot2.position.z = headHeight + 0.01;
  slot2.userData.noEdges = true;
  group.add(slot1, slot2);

  if (shaftLength > 0) {
    const shaftGeo = new THREE.CylinderGeometry(headRadius * 0.52, headRadius * 0.52, shaftLength, 10);
    shaftGeo.rotateX(Math.PI / 2);
    const shaft = new THREE.Mesh(shaftGeo, material);
    shaft.position.z = -shaftLength * 0.5;
    shaft.userData.noEdges = true;
    group.add(shaft);
  }

  return group;
}

/**
 * Attach crisp CAD technical edge lines to every Mesh inside a group.
 */
export function attachCadEdges(
  root: THREE.Object3D,
  clippingPlanes: THREE.Plane[],
  thresholdAngle = 26,
  baseOpacity = 0.2
): { meshes: THREE.Mesh[]; edges: THREE.LineSegments[] } {
  const meshes: THREE.Mesh[] = [];
  const edges: THREE.LineSegments[] = [];

  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      meshes.push(mesh);

      if ((mesh as THREE.InstancedMesh).isInstancedMesh) return;
      if (mesh.userData.noEdges) return;

      const edgeGeo = new THREE.EdgesGeometry(mesh.geometry, thresholdAngle);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x181c24,
        transparent: true,
        opacity: mesh.userData.edgeOpacity ?? baseOpacity,
        clippingPlanes,
      });
      const line = new THREE.LineSegments(edgeGeo, edgeMat);
      line.userData.baseOpacity = mesh.userData.edgeOpacity ?? baseOpacity;
      line.renderOrder = 2;
      mesh.add(line);
      edges.push(line);
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
 * Create a rotationally symmetric precision optical lens element centered along the Z axis.
 * - `sagFront` (>0 bulges toward +Z, <0 concaves inward on +Z face)
 * - `sagRear`  (>0 bulges toward -Z, <0 concaves inward on -Z face)
 * - `asphericFront`, `asphericRear`: 4th-order aspheric departure terms shaping inflection
 */
export function createOpticalLensGeometry(
  radius: number,
  edgeThickness: number,
  sagFront: number,
  sagRear: number,
  asphericFront = 0,
  asphericRear = 0,
  profileSteps = 22,
  radialSegments = 48
): THREE.BufferGeometry {
  const halfEdge = edgeThickness * 0.5;
  const pts: THREE.Vector2[] = [];

  // Front optical surface (+Z side in final orientation; +Y in lathe coordinates) from axis -> rim
  for (let i = 0; i <= profileSteps; i++) {
    const u = i / profileSteps; // 0 at optical axis, 1 at rim
    const r = Math.max(0.0001, u * radius);
    const r2 = u * u;
    const zF = halfEdge + sagFront * (1 - r2) + asphericFront * r2 * (1 - r2);
    pts.push(new THREE.Vector2(r, zF));
  }

  // Rear optical surface (-Z side; -Y in lathe coordinates) from rim -> axis
  for (let i = profileSteps; i >= 0; i--) {
    const u = i / profileSteps;
    const r = Math.max(0.0001, u * radius);
    const r2 = u * u;
    const zR = -halfEdge - sagRear * (1 - r2) - asphericRear * r2 * (1 - r2);
    pts.push(new THREE.Vector2(r, zR));
  }

  const geo = new THREE.LatheGeometry(pts, radialSegments);
  // Rotate so Lathe +Y axis aligns with optical +Z axis
  geo.rotateX(Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

