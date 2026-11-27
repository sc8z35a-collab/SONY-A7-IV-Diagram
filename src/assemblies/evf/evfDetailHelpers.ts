import * as THREE from 'three';
import { MaterialLibrary } from '../../engine/Materials';
import {
  buildPhillipsScrew,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';

/**
 * Shared EVF ultra-detail parametric CAD geometry & micro-hardware helpers
 * for E01–E75 (reuses MaterialLibrary buckets exclusively — 0 custom materials).
 */

/**
 * True DIN 6799 3-prong radial-entry horseshoe E-clip geometry (open side facing +X).
 */
export function createDin6799EClipGeo(
  grooveR: number,
  outerR: number,
  depth: number
): THREE.BufferGeometry {
  const s = new THREE.Shape();
  const openHalf = 0.84;
  s.absarc(0, 0, outerR, openHalf, Math.PI * 2 - openHalf, false);
  const botTipAng = Math.PI * 2 - openHalf - 0.14;
  const rMid = grooveR + (outerR - grooveR) * 0.68;
  s.lineTo(Math.cos(botTipAng) * grooveR, Math.sin(botTipAng) * grooveR);
  s.absarc(0, 0, rMid, botTipAng - 0.16, Math.PI + 0.28, true);
  s.lineTo(-grooveR, -grooveR * 0.28);
  s.lineTo(-grooveR, grooveR * 0.28);
  s.absarc(0, 0, rMid, Math.PI - 0.28, openHalf + 0.3, true);
  const topTipAng = openHalf + 0.14;
  s.lineTo(Math.cos(topTipAng) * grooveR, Math.sin(topTipAng) * grooveR);
  s.closePath();
  return extrudeHiRes(s, depth, Math.min(0.014, depth * 0.18), Math.min(0.014, depth * 0.18), 1, 20);
}

/**
 * True 3D sinusoidal Smalley-style wave spring washer (XY ring with axial Z undulation).
 */
export function createTrueWaveSpringGeo(
  midR: number,
  radialW: number,
  axialT: number,
  waveAmp: number,
  waves: number,
  segs = 60
): THREE.BufferGeometry {
  const rIn = midR - radialW * 0.5;
  const rOut = midR + radialW * 0.5;
  const hT = axialT * 0.5;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segs; i++) {
    const th = (i / segs) * Math.PI * 2;
    const c = Math.cos(th);
    const s = Math.sin(th);
    const z = waveAmp * Math.sin(waves * th);
    positions.push(
      rIn * c,
      rIn * s,
      z + hT,
      rOut * c,
      rOut * s,
      z + hT,
      rOut * c,
      rOut * s,
      z - hT,
      rIn * c,
      rIn * s,
      z - hT
    );
  }
  for (let i = 0; i < segs; i++) {
    const a = i * 4;
    const b = (i + 1) * 4;
    indices.push(a + 0, a + 1, b + 1, a + 0, b + 1, b + 0);
    indices.push(a + 1, a + 2, b + 2, a + 1, b + 2, b + 1);
    indices.push(a + 2, a + 3, b + 3, a + 2, b + 3, b + 2);
    indices.push(a + 3, a + 0, b + 0, a + 3, b + 0, b + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return markHiRes(geo);
}

/**
 * True CNC straight-knurled cylindrical collar (alternating fluted crests & roots, Z-extruded).
 */
export function createKnurledCollarGeo(
  rInner: number,
  rRoot: number,
  rCrest: number,
  depth: number,
  teeth = 28
): THREE.BufferGeometry {
  const s = new THREE.Shape();
  const steps = teeth * 2;
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = i % 2 === 0 ? rCrest : rRoot;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  if (rInner > 0.05) {
    const h = new THREE.Path();
    h.absarc(0, 0, rInner, 0, Math.PI * 2, true);
    s.holes.push(h);
  }
  return extrudeHiRes(s, depth, Math.min(0.02, depth * 0.1), Math.min(0.02, depth * 0.1), 1, 6);
}

/**
 * True CNC lathe-turned ISO 60° V-threaded optical ring/barrel aligned along Z.
 */
export function createThreadedRingLatheGeo(
  innerR: number,
  outerRootR: number,
  outerCrestR: number,
  depth: number,
  turns: number,
  segs = 44
): THREE.BufferGeometry {
  const halfD = depth * 0.5;
  const lead = Math.min(0.08, depth * 0.12);
  const threadSpan = Math.max(0.08, depth - lead * 2);
  const pitch = threadSpan / turns;
  const pts: THREE.Vector2[] = [
    new THREE.Vector2(innerR, -halfD),
    new THREE.Vector2(outerRootR - 0.04, -halfD),
    new THREE.Vector2(outerRootR, -halfD + lead),
  ];
  for (let t = 0; t < turns; t++) {
    const y0 = -halfD + lead + t * pitch;
    pts.push(new THREE.Vector2(outerRootR, y0));
    pts.push(new THREE.Vector2(outerCrestR, y0 + pitch * 0.48));
    pts.push(new THREE.Vector2(outerRootR, y0 + pitch * 0.96));
  }
  pts.push(
    new THREE.Vector2(outerRootR - 0.04, halfD),
    new THREE.Vector2(innerR, halfD),
    new THREE.Vector2(innerR, -halfD)
  );
  const geo = markHiRes(new THREE.LatheGeometry(pts, segs));
  geo.rotateX(Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Create a precision diagonal-split PTFE backup ring (scarf-cut gap visible in macro close-ups).
 */
export function createSplitScarfRingGeo(
  innerR: number,
  outerR: number,
  depth: number,
  gapHalfAng = 0.09,
  segs = 32
): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, gapHalfAng, Math.PI * 2 - gapHalfAng, false);
  s.absarc(0, 0, innerR, Math.PI * 2 - gapHalfAng, gapHalfAng, true);
  s.closePath();
  return extrudeHiRes(s, depth, Math.min(0.015, depth * 0.16), Math.min(0.015, depth * 0.16), 1, segs);
}

/**
 * Build a properly oriented Phillips screw with explicit head-facing axis
 * (`buildPhillipsScrew` places the domed cross head facing -Y and shank along +Y).
 */
export function addOrientedPhillipsScrew(
  parent: THREE.Object3D,
  pos: [number, number, number],
  headFaces: '+x' | '-x' | '+y' | '-y' | '+z' | '-z',
  headR: number,
  headH: number,
  shankR: number,
  shankL: number,
  headMat: THREE.Material,
  slotMat: THREE.Material,
  threadMat: THREE.Material,
  washerMat?: THREE.Material
): THREE.Group {
  const scr = buildPhillipsScrew(
    headR,
    headH,
    shankR,
    Math.max(1.22, shankL),
    headMat,
    slotMat,
    threadMat
  );
  scr.position.set(pos[0], pos[1], pos[2]);
  if (headFaces === '+y') scr.rotation.x = Math.PI;
  else if (headFaces === '+x') scr.rotation.z = Math.PI / 2;
  else if (headFaces === '-x') scr.rotation.z = -Math.PI / 2;
  else if (headFaces === '+z') scr.rotation.x = -Math.PI / 2;
  else if (headFaces === '-z') scr.rotation.x = Math.PI / 2;

  if (washerMat) {
    const wGeo = hiResCyl(headR * 1.18, headR * 1.22, Math.max(0.08, headH * 0.25), 18);
    const washer = new THREE.Mesh(wGeo, washerMat);
    washer.position.y = Math.max(0.04, headH * 0.12);
    washer.userData.noEdges = true;
    scr.add(washer);
  }
  parent.add(scr);
  return scr;
}

/**
 * Add a compact low-profile countersunk Phillips screw head (for ultra-thin clearance zones < 1.0mm
 * where a full shank cannot protrude without clashing adjacent parts).
 */
export function addFlushPhillipsCapHead(
  parent: THREE.Object3D,
  pos: [number, number, number],
  headFaces: '+x' | '-x' | '+y' | '-y' | '+z' | '-z',
  headR: number,
  headH: number,
  headMat: THREE.Material,
  slotMat: THREE.Material,
  ringMat?: THREE.Material
): THREE.Group {
  const grp = new THREE.Group();
  const cap = new THREE.Mesh(hiResCyl(headR * 0.92, headR, headH, 18), headMat);
  cap.position.y = headH * 0.5;
  grp.add(cap);

  const slotGeo = new THREE.BoxGeometry(headR * 1.18, Math.max(0.04, headH * 0.3), headR * 0.24);
  for (const ry of [0, Math.PI / 2]) {
    const s = new THREE.Mesh(slotGeo, slotMat);
    s.position.y = headH * 0.92;
    s.rotation.y = ry;
    s.userData.noEdges = true;
    grp.add(s);
  }
  if (ringMat) {
    const collar = new THREE.Mesh(hiResTorus(headR * 1.02, Math.max(0.03, headR * 0.08), 8, 18), ringMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = headH * 0.15;
    collar.userData.noEdges = true;
    grp.add(collar);
  }

  grp.position.set(pos[0], pos[1], pos[2]);
  if (headFaces === '-y') grp.rotation.x = Math.PI;
  else if (headFaces === '+x') grp.rotation.z = -Math.PI / 2;
  else if (headFaces === '-x') grp.rotation.z = Math.PI / 2;
  else if (headFaces === '+z') grp.rotation.x = Math.PI / 2;
  else if (headFaces === '-z') grp.rotation.x = -Math.PI / 2;

  parent.add(grp);
  return grp;
}

/**
 * Add an array of ENIG gold plated through-hole vias with crisp dark center drill holes
 * (hoists shared BufferGeometry for automatic V2 instancing).
 */
export function addEnigViaArray(
  g: THREE.Group,
  coords: Array<[number, number]>,
  z: number,
  thickness: number,
  outerR: number,
  drillR: number,
  padMat: THREE.Material,
  holeMat: THREE.Material
): void {
  if (coords.length === 0) return;
  const padGeo = hiResCyl(outerR, outerR, thickness, 10).rotateX(Math.PI / 2);
  const holeGeo = hiResCyl(drillR, drillR, thickness + 0.016, 8).rotateX(Math.PI / 2);
  for (const [x, y] of coords) {
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(x, y, z);
    pad.userData.noEdges = true;
    const hole = new THREE.Mesh(holeGeo, holeMat);
    hole.position.set(x, y, z);
    hole.userData.noEdges = true;
    g.add(pad, hole);
  }
}

/**
 * Add crisp routed 2D PCB copper traces along [x0, y0, x1, y1] segments on an XY plane.
 */
export function addCopperTraceRuns(
  g: THREE.Group,
  segments: Array<[number, number, number, number]>,
  width: number,
  depth: number,
  z: number,
  mat: THREE.Material
): void {
  const unitBox = new THREE.BoxGeometry(1, width, depth);
  for (const [x0, y0, x1, y1] of segments) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    if (len < 0.01) continue;
    const seg = new THREE.Mesh(unitBox, mat);
    seg.scale.set(len, 1, 1);
    seg.position.set((x0 + x1) * 0.5, (y0 + y1) * 0.5, z);
    seg.rotation.z = Math.atan2(dy, dx);
    seg.userData.noEdges = true;
    g.add(seg);
  }
}

/**
 * Add a photolithography / optical laser crosshair alignment fiducial mark on an XY plane.
 */
export function addOpticalFiducial(
  g: THREE.Group,
  x: number,
  y: number,
  z: number,
  radius: number,
  thickness: number,
  mat: THREE.Material
): void {
  const ring = new THREE.Mesh(hiResTorus(radius, Math.max(0.018, radius * 0.14), 6, 16), mat);
  ring.position.set(x, y, z);
  ring.userData.noEdges = true;

  const armGeo = new THREE.BoxGeometry(radius * 2.7, Math.max(0.028, radius * 0.18), thickness);
  const hArm = new THREE.Mesh(armGeo, mat);
  hArm.position.set(x, y, z);
  hArm.userData.noEdges = true;
  const vArm = new THREE.Mesh(armGeo, mat);
  vArm.position.set(x, y, z);
  vArm.rotation.z = Math.PI / 2;
  vArm.userData.noEdges = true;
  g.add(ring, hArm, vArm);
}

/**
 * Add crisp white silkscreen courtyard frame + Pin-1 index marker around a PCB IC on XY plane.
 */
export function addSilkscreenCourtyard(
  g: THREE.Group,
  cx: number,
  cy: number,
  w: number,
  h: number,
  z: number,
  lineW: number,
  mat: THREE.Material,
  pin1Corner: 'tl' | 'bl' | 'tr' | 'br' = 'tl'
): void {
  const hGeo = new THREE.BoxGeometry(w, lineW, 0.018);
  const vGeo = new THREE.BoxGeometry(lineW, h, 0.018);
  for (const sy of [-1, 1]) {
    const bar = new THREE.Mesh(hGeo, mat);
    bar.position.set(cx, cy + sy * h * 0.5, z);
    bar.userData.noEdges = true;
    g.add(bar);
  }
  for (const sx of [-1, 1]) {
    const bar = new THREE.Mesh(vGeo, mat);
    bar.position.set(cx + sx * w * 0.5, cy, z);
    bar.userData.noEdges = true;
    g.add(bar);
  }
  const px = pin1Corner.includes('l') ? cx - w * 0.5 - lineW * 1.8 : cx + w * 0.5 + lineW * 1.8;
  const py = pin1Corner.includes('t') ? cy + h * 0.5 : cy - h * 0.5;
  const dot = new THREE.Mesh(hiResCyl(lineW * 1.4, lineW * 1.4, 0.022, 10).rotateX(Math.PI / 2), mat);
  dot.position.set(px, py, z);
  dot.userData.noEdges = true;
  g.add(dot);
}

/**
 * Add an upgraded SMD passive with bright reflowed solder fillets on both terminations.
 */
export function addSmdPassiveWithFillets(
  g: THREE.Group,
  w: number,
  d: number,
  h: number,
  x: number,
  y: number,
  z: number,
  bodyMat: THREE.Material,
  termMat: THREE.Material,
  solderMat: THREE.Material,
  rotZ = 0,
  stripeMat?: THREE.Material
): void {
  const smd = buildSmdPassive(w, d, h, bodyMat, termMat, 'z', stripeMat);
  smd.position.set(x, y, z);
  smd.rotation.z = rotZ;

  // Reflowed concave-to-convex solder meniscus fillets extending from both metal terminations
  const filletGeo = createChamferedBoxGeo(w * 0.24, d * 1.08, h * 0.42, Math.min(0.04, d * 0.12), 0.01, 'z');
  for (const sx of [-1, 1]) {
    const f = new THREE.Mesh(filletGeo, solderMat);
    f.position.set(sx * (w * 0.54), 0, -h * 0.28);
    f.userData.noEdges = true;
    smd.add(f);
  }
  g.add(smd);
}

/**
 * Rich double-sided ENIG HDI PCB backside (thermal slug + micro-via thermal matrix + gold
 * castellated edge pads + routed copper traces + silkscreen outline) — strictly within z in [-0.125, -0.07]!
 */
export function addRichHdiBackside(
  g: THREE.Group,
  w: number,
  h: number,
  mats: MaterialLibrary,
  variant: 0 | 1 | 2 | 3 = 0
): void {
  // Central copper thermal pad with solder-mask relief channels (segmented 2x2 or full grid)
  const padW = w * 0.46;
  const padH = h * 0.44;
  const subPadGeo = createChamferedBoxGeo(padW * 0.46, padH * 0.45, 0.036, 0.08, 0.008, 'z');
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const sp = new THREE.Mesh(subPadGeo, mats.copperHeatSpreader);
      sp.position.set(sx * padW * 0.26, sy * padH * 0.26, -0.09);
      sp.userData.noEdges = true;
      g.add(sp);
    }
  }

  // 4x3 dense thermal-via array punched directly through the exposed thermal pad
  const viaCoords: Array<[number, number]> = [];
  for (let ix = -1; ix <= 1; ix++) {
    for (let iy = -1; iy <= 1; iy++) {
      viaCoords.push([ix * padW * 0.34, iy * padH * 0.33]);
    }
  }
  // Perimeter ENIG stitching via fence
  const fenceX = w * 0.41;
  const fenceY = h * 0.4;
  for (let i = -2; i <= 2; i++) {
    viaCoords.push([i * (w * 0.16), fenceY]);
    viaCoords.push([i * (w * 0.16), -fenceY]);
  }
  for (const sy of [-0.18, 0.18]) {
    viaCoords.push([-fenceX, sy * h]);
    viaCoords.push([fenceX, sy * h]);
  }
  addEnigViaArray(g, viaCoords, -0.098, 0.035, 0.12, 0.055, mats.goldPlating, mats.velvetFlockTrap);

  // Gold solder test pads along bottom/top edge (unique layout per module variant)
  const tpGeo = createChamferedBoxGeo(0.46, 0.28, 0.03, 0.04, 0.006, 'z');
  const tpCount = 5 + (variant % 2);
  for (let i = 0; i < tpCount; i++) {
    const t = tpCount === 1 ? 0 : i / (tpCount - 1) - 0.5;
    const tp = new THREE.Mesh(tpGeo, mats.goldPlating);
    tp.position.set(t * (w * 0.64), (variant % 2 === 0 ? -1 : 1) * (h * 0.31), -0.095);
    tp.userData.noEdges = true;
    g.add(tp);
  }

  // Routed backside copper bus traces fanning out from thermal zone to perimeter vias
  const segs: Array<[number, number, number, number]> = [
    [-padW * 0.55, padH * 0.25, -fenceX + 0.15, padH * 0.25],
    [-padW * 0.55, -padH * 0.25, -fenceX + 0.15, -padH * 0.25],
    [padW * 0.55, padH * 0.25, fenceX - 0.15, padH * 0.25],
    [padW * 0.55, -padH * 0.25, fenceX - 0.15, -padH * 0.25],
    [-w * 0.28, -h * 0.31, w * 0.28, -h * 0.31],
  ];
  if (variant >= 2) {
    segs.push([-w * 0.24, h * 0.31, w * 0.24, h * 0.31]);
  }
  addCopperTraceRuns(g, segs, 0.09, 0.026, -0.092, mats.copperHeatSpreader);

  // Crisp silkscreen courtyard & gold Pin-1 calibration fiducial
  addSilkscreenCourtyard(g, 0, 0, w * 0.88, h * 0.86, -0.095, 0.04, mats.invarScaleBar, 'tl');
  const fid = new THREE.Mesh(hiResSphere(0.11, 8, 8), mats.goldPlating);
  fid.scale.set(1, 1, 0.25);
  fid.position.set(-w * 0.38, h * 0.34, -0.102);
  fid.userData.noEdges = true;
  g.add(fid);
}
