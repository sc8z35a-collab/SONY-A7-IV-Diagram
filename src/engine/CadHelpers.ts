import * as THREE from 'three';
import { GPU_PROFILE, scaleSegments } from './GpuOptimizer';

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
  const segs = scaleSegments(Math.min(curveSegments, 32), 6);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: bodyDepth,
    bevelEnabled: hasBevel,
    bevelSegments: hasBevel ? (GPU_PROFILE.isMobile ? 1 : 2) : 0,
    steps: 1,
    bevelSize,
    bevelThickness,
    curveSegments: segs,
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
  const steps = scaleSegments(Math.round(turns * 16), 12);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const z = (t - 0.5) * length;
    points.push(new THREE.Vector3(Math.cos(angle) * coilRadius, Math.sin(angle) * coilRadius, z));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, steps, wireRadius, GPU_PROFILE.isMobile ? 5 : 6, false);
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
  const steps = scaleSegments(Math.round(turns * 14), 10);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const z = (t - 0.5) * length;
    points.push(new THREE.Vector3(Math.cos(angle) * coilRadius, Math.sin(angle) * coilRadius, z));
  }
  // Exit tang leg
  points.push(new THREE.Vector3(coilRadius + legLength * 0.85, legLength * 0.35, length * 0.5));
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, steps + 10, wireRadius, GPU_PROFILE.isMobile ? 5 : 6, false);
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

  const headGeo = new THREE.CylinderGeometry(
    headRadius,
    headRadius * 0.94,
    headHeight,
    GPU_PROFILE.isMobile ? 10 : 14
  );
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
    const shaftGeo = new THREE.CylinderGeometry(
      headRadius * 0.52,
      headRadius * 0.52,
      shaftLength,
      GPU_PROFILE.isMobile ? 8 : 10
    );
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
 * Pools one LineBasicMaterial per opacity bucket within the part to eliminate thousands of duplicate materials.
 */
export function attachCadEdges(
  root: THREE.Object3D,
  clippingPlanes: THREE.Plane[],
  thresholdAngle = 26,
  baseOpacity = 0.2
): { meshes: THREE.Mesh[]; edges: THREE.LineSegments[] } {
  const meshes: THREE.Mesh[] = [];
  const edges: THREE.LineSegments[] = [];
  const matPool = new Map<number, THREE.LineBasicMaterial>();
  const effectiveAngle = thresholdAngle + GPU_PROFILE.edgeThresholdBoost;

  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      meshes.push(mesh);

      if ((mesh as THREE.InstancedMesh).isInstancedMesh) return;
      if (mesh.userData.noEdges) return;

      const op = (mesh.userData.edgeOpacity as number | undefined) ?? baseOpacity;
      const key = Math.round(op * 100);
      let edgeMat = matPool.get(key);
      if (!edgeMat) {
        edgeMat = new THREE.LineBasicMaterial({
          color: 0x181c24,
          transparent: true,
          opacity: op,
          clippingPlanes,
        });
        matPool.set(key, edgeMat);
      }

      const edgeGeo = new THREE.EdgesGeometry(mesh.geometry, effectiveAngle);
      const line = new THREE.LineSegments(edgeGeo, edgeMat);
      line.userData.baseOpacity = op;
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
  profileSteps = 26,
  radialSegments = 56
): THREE.BufferGeometry {
  const effSteps = scaleSegments(profileSteps, 14);
  const effRadial = scaleSegments(radialSegments, 28);
  const halfEdge = edgeThickness * 0.5;
  const pts: THREE.Vector2[] = [];

  // Front optical surface (+Z side in final orientation; +Y in lathe coordinates) from axis -> rim
  for (let i = 0; i <= effSteps; i++) {
    const u = i / effSteps; // 0 at optical axis, 1 at rim
    const r = Math.max(0.0001, u * radius);
    const r2 = u * u;
    const zF = halfEdge + sagFront * (1 - r2) + asphericFront * r2 * (1 - r2);
    pts.push(new THREE.Vector2(r, zF));
  }

  // Rear optical surface (-Z side; -Y in lathe coordinates) from rim -> axis
  for (let i = effSteps; i >= 0; i--) {
    const u = i / effSteps;
    const r = Math.max(0.0001, u * radius);
    const r2 = u * u;
    const zR = -halfEdge - sagRear * (1 - r2) - asphericRear * r2 * (1 - r2);
    pts.push(new THREE.Vector2(r, zR));
  }

  const geo = new THREE.LatheGeometry(pts, effRadial);
  // Rotate so Lathe +Y axis aligns with optical +Z axis
  geo.rotateX(Math.PI / 2);
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
  grp.add(new THREE.Mesh(extrudeCentered(s, depth, 0.08, 0.08, 48), ringMat));

  // Fine outer machined thread groove highlights
  for (const tz of [-depth * 0.25, depth * 0.25]) {
    const groove = new THREE.Mesh(new THREE.TorusGeometry(outerR + 0.05, 0.09, 6, 48), notchMat);
    groove.position.z = tz;
    groove.userData.noEdges = true;
    grp.add(groove);
  }

  // Spanner-wrench assembly notches along front face
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
      new THREE.TorusGeometry(innerR + 0.35, 0.32, 10, 48),
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
  grp.add(new THREE.Mesh(extrudeCentered(s, 0.28, 0.02, 0.02, 52), mat));

  const rMid = (innerR + outerR) * 0.5;
  for (let i = 0; i < fingerCount; i++) {
    const a = (i / fingerCount) * Math.PI * 2;
    const finger = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.8, 0.22), mat);
    finger.position.set(Math.cos(a) * rMid, Math.sin(a) * rMid, 0.42);
    finger.rotation.z = a;
    finger.rotation.y = 0.28; // Angled leaf spring cantilever
    grp.add(finger);

    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), mat);
    tip.position.set(Math.cos(a) * rMid, Math.sin(a) * rMid, 0.68);
    tip.userData.noEdges = true;
    grp.add(tip);
  }
  return grp;
}

/**
 * Reusable dynamic CAD exploded-view dashed trajectory guide manager.
 * Draws razor-sharp technical assembly vector lines from each radially exploded part's
 * axial anchor to its live exploded world position — transforming exploded mode into a true
 * museum-grade technical cutaway diagram (超高精細分解解剖図)!
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

export function createRadialTrajectoryGuides(
  clippingPlanes: THREE.Plane[],
  color = 0x64748b,
  maxLines = 48
): RadialTrajectoryGuides {
  const group = new THREE.Group();
  const mat = new THREE.LineDashedMaterial({
    color,
    dashSize: 1.6,
    gapSize: 1.4,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });

  const lines: THREE.Line[] = [];
  const dots: THREE.Mesh[] = [];
  const dotGeo = new THREE.SphereGeometry(0.42, 8, 6);
  const dotMat = new THREE.MeshBasicMaterial({
    color: 0x0d5bd9,
    transparent: true,
    opacity: 0,
    clippingPlanes,
  });

  for (let i = 0; i < maxLines; i++) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    const line = new THREE.Line(geo, mat);
    line.visible = false;
    group.add(line);
    lines.push(line);

    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.visible = false;
    group.add(dot);
    dots.push(dot);
  }

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
      for (const p of parts) {
        if (li >= maxLines) break;
        if (!p.group.visible) continue;
        // Connect radially offset parts cleanly back to their coaxial Z-plane origin!
        const dx = p.group.position.x - p.assembledPos.x;
        const dy = p.group.position.y - p.assembledPos.y;
        const radialDist = Math.hypot(dx, dy);
        if (radialDist < 6.0) continue;

        const line = lines[li];
        const dot = dots[li];
        const posAttr = line.geometry.getAttribute('position') as THREE.BufferAttribute;
        posAttr.setXYZ(0, p.assembledPos.x, p.assembledPos.y, p.group.position.z);
        posAttr.setXYZ(1, p.group.position.x, p.group.position.y, p.group.position.z);
        posAttr.needsUpdate = true;
        line.computeLineDistances();
        line.visible = true;

        dot.position.set(p.assembledPos.x, p.assembledPos.y, p.group.position.z);
        dot.visible = true;
        li++;
      }
      for (let i = li; i < maxLines; i++) {
        lines[i].visible = false;
        dots[i].visible = false;
      }
    },
  };
}


