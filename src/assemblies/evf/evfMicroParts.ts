import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createOpticalLensGeometry,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildPhillipsScrew,
  buildSmdPassive,
  buildSpotWeldNuggets,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { EVF_OPTICAL_Y } from './evfParts';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeStandaloneEvfMicroPart(
  id: string,
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
    subsystem: 'evf',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

function createHiResRingCell(
  innerR: number,
  outerR: number,
  depth: number,
  mat: THREE.Material,
  bevel = 0.05,
  segs = 44
): THREE.Mesh {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const h = new THREE.Path();
  h.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(h);
  const geo = extrudeHiRes(s, depth, bevel, bevel, 2, segs);
  return new THREE.Mesh(geo, mat);
}

/**
 * Build a CNC lathe-turned blackened-brass inter-lens optical spacer ring
 * with razor-sharp internal sawtooth knife-edge stray-light grooves and chamfered lens seats.
 */
function createKnifeEdgeSpacerLathe(
  innerR: number,
  outerR: number,
  depth: number,
  grooves: number,
  mat: THREE.Material
): THREE.Mesh {
  const halfD = depth * 0.5;
  const seatR = innerR + (outerR - innerR) * 0.34;
  const pts: THREE.Vector2[] = [
    new THREE.Vector2(outerR - 0.14, -halfD),
    new THREE.Vector2(outerR, -halfD + 0.14),
    new THREE.Vector2(outerR, halfD - 0.14),
    new THREE.Vector2(outerR - 0.14, halfD),
    new THREE.Vector2(seatR, halfD),
    new THREE.Vector2(innerR + 0.12, halfD - 0.18),
  ];

  const usableSpan = depth - 0.44;
  const grooveStep = usableSpan / Math.max(1, grooves);
  for (let i = 0; i < grooves; i++) {
    const yTop = halfD - 0.22 - i * grooveStep;
    const yMid = yTop - grooveStep * 0.46;
    const yBot = yTop - grooveStep;
    pts.push(new THREE.Vector2(innerR, yTop));
    pts.push(new THREE.Vector2(innerR + 0.36, yMid));
    pts.push(new THREE.Vector2(innerR, yBot));
  }

  pts.push(new THREE.Vector2(innerR + 0.12, -halfD + 0.18));
  pts.push(new THREE.Vector2(seatR, -halfD));
  pts.push(new THREE.Vector2(outerR - 0.14, -halfD));

  const geo = markHiRes(new THREE.LatheGeometry(pts, 56));
  geo.rotateX(Math.PI / 2);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, mat);
}

/**
 * Build a true 3-wave sinusoidal SUS301 wave spring washer aligned in the XY plane.
 */
function createWaveWasherGeo(
  radius: number,
  tubeR: number,
  waves = 3,
  amp = 0.2
): THREE.BufferGeometry {
  const segs = 42;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, Math.sin(a * waves) * amp));
  }
  const curve = new THREE.CatmullRomCurve3(pts, true);
  return markHiRes(new THREE.TubeGeometry(curve, 54, tubeR, 7, true));
}

/**
 * Build a realistic ball-to-stitch φ20μm gold wirebond loop in the XY plane rising along -Z
 * (facing the EVF optical train) with ball pedestal, NEC reverse kink, sweeping arc & wedge stitch.
 */
function buildZWirebondLoop(
  start: THREE.Vector3,
  end: THREE.Vector3,
  apexZOffset: number,
  radius: number,
  mat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();

  // Thermosonic gold ball-bond pedestal on silicon die pad
  const ball = new THREE.Mesh(hiResSphere(radius * 2.1, 8, 6), mat);
  ball.position.copy(start);
  ball.userData.noEdges = true;
  g.add(ball);

  // Semiconductor wirebond loop profile rising smoothly out along -Z
  const rise = new THREE.Vector3(
    THREE.MathUtils.lerp(start.x, end.x, 0.08),
    THREE.MathUtils.lerp(start.y, end.y, 0.08),
    start.z + apexZOffset
  );
  const crown = new THREE.Vector3(
    THREE.MathUtils.lerp(start.x, end.x, 0.34),
    THREE.MathUtils.lerp(start.y, end.y, 0.34),
    Math.min(start.z, end.z) + apexZOffset * 0.96
  );
  const shoulder = new THREE.Vector3(
    THREE.MathUtils.lerp(start.x, end.x, 0.78),
    THREE.MathUtils.lerp(start.y, end.y, 0.78),
    THREE.MathUtils.lerp(Math.min(start.z, end.z) + apexZOffset * 0.45, end.z + apexZOffset * 0.22, 0.5)
  );

  const curve = new THREE.CatmullRomCurve3([start, rise, crown, shoulder, end]);
  const wire = new THREE.Mesh(markHiRes(new THREE.TubeGeometry(curve, 14, radius, 6, false)), mat);
  wire.userData.noEdges = true;
  g.add(wire);

  // Ultrasonic wedge stitch foot on ceramic lead shelf
  const stitch = new THREE.Mesh(hiResCyl(radius * 1.85, radius * 2.1, radius * 1.15, 8).rotateX(Math.PI / 2), mat);
  stitch.position.copy(end);
  stitch.userData.noEdges = true;
  g.add(stitch);

  return g;
}

/**
 * Sweep a crisp flat rectangular Kapton FPC ribbon along a 3D CatmullRomCurve3
 * with continuous UVs so fine parallel copper differential traces follow every bend cleanly.
 */
function createFlatRibbonAlongCurve(
  points: THREE.Vector3[],
  width: number,
  thickness: number,
  widthAxisHint: THREE.Vector3,
  mat: THREE.Material,
  segments = 24
): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(points);
  const halfW = width * 0.5;
  const halfT = thickness * 0.5;
  const hint = widthAxisHint.clone().normalize();

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const ringPts: THREE.Vector3[][] = [];
  const ringNormals: THREE.Vector3[][] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPoint(t);
    const tang = curve.getTangent(t).normalize();
    const side = hint.clone().sub(tang.clone().multiplyScalar(hint.dot(tang))).normalize();
    const norm = new THREE.Vector3().crossVectors(tang, side).normalize();

    const tl = p.clone().addScaledVector(side, -halfW).addScaledVector(norm, halfT);
    const tr = p.clone().addScaledVector(side, halfW).addScaledVector(norm, halfT);
    const br = p.clone().addScaledVector(side, halfW).addScaledVector(norm, -halfT);
    const bl = p.clone().addScaledVector(side, -halfW).addScaledVector(norm, -halfT);

    ringPts.push([tl, tr, br, bl]);
    ringNormals.push([norm, side, norm.clone().negate(), side.clone().negate()]);
  }

  const pushQuad = (
    a: THREE.Vector3,
    b: THREE.Vector3,
    c: THREE.Vector3,
    d: THREE.Vector3,
    n0: THREE.Vector3,
    n1: THREE.Vector3,
    u0: number,
    u1: number,
    v0: number,
    v1: number
  ) => {
    const base = positions.length / 3;
    positions.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z, d.x, d.y, d.z);
    normals.push(n0.x, n0.y, n0.z, n0.x, n0.y, n0.z, n1.x, n1.y, n1.z, n1.x, n1.y, n1.z);
    uvs.push(u0, v0, u1, v0, u1, v1, u0, v1);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };

  for (let i = 0; i < segments; i++) {
    const v0 = i / segments;
    const v1 = (i + 1) / segments;
    const r0 = ringPts[i];
    const r1 = ringPts[i + 1];
    const n0 = ringNormals[i];
    const n1 = ringNormals[i + 1];

    // Front (+norm), Right (+side), Back (-norm), Left (-side)
    pushQuad(r0[0], r0[1], r1[1], r1[0], n0[0], n1[0], 0.05, 0.95, v0, v1);
    pushQuad(r0[1], r0[2], r1[2], r1[1], n0[1], n1[1], 0.95, 0.99, v0, v1);
    pushQuad(r0[2], r0[3], r1[3], r1[2], n0[2], n1[2], 0.05, 0.95, v0, v1);
    pushQuad(r0[3], r0[0], r1[0], r1[3], n0[3], n1[3], 0.01, 0.05, v0, v1);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return new THREE.Mesh(markHiRes(geo), mat);
}

/**
 * Build 24 ultra-fine standalone-only EVF & Viewfinder Surroundings OEM/optical micro-parts (E32–E55).
 * Rendered ONLY in standalone 'evf' view; completely omitted in whole-camera views
 * ('integrated', 'camera_body').
 *
 * Coordinate reference (matches evfParts.ts):
 * - Optical axis: x = 0, y = EVF_OPTICAL_Y (39.5)
 * - Eyecup E01: z = -37.2, Subframe E27: -35.8, Latch E02: -34.6, Antifog E03: -32.2
 * - Eye sensor E04: (0, 28.4, -30.6)
 * - Lenses: G4 (-15.4), G2/G3 (-9.2), G1 (-2.4), Polarizer (+0.65), MLA (+2.55), OLED (+3.6)
 * - Housing E18 center: (0, 39.5, -12.5), top shoe deck world center: (0, 55.5, -8.3)
 * - Diopter dial world center: (+19.6, 39.5, -15.6)
 */
export function buildEvfMicroParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // E32. Sony OEM FINDER COVER (89100) (Ref.113: A5038709A) Rear Trim & Labyrinth Frame
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sculpted >PC-GF20< pebbled outer rear shroud framing eyepiece + lower eye-sensor pocket
    const trimShape = createFrameShape(32.4, 27.8, 5.0, 24.0, 18.6, 3.6, 0, 1.4);
    const trimGeo = extrudeHiRes(trimShape, 1.5, 0.16, 0.16, 3, 28);
    applyBoxUVs(trimGeo, 18);
    const trimMesh = new THREE.Mesh(trimGeo, mats.ultra.evfFinderCoverMold);
    g.add(trimMesh);

    // Chamfered inner satin eyepiece bezel collar step framing FDA-EP19 eyecup rails
    const innerBezel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(25.2, 19.8, 3.9, 23.4, 18.0, 3.3), 0.72, 0.08, 0.08, 2, 24),
      mats.matteBlackAnodized
    );
    innerBezel.position.set(0, 1.4, -0.58);
    g.add(innerBezel);

    // Lower recessed Eye-Sensor protective bezel pocket with contoured eyebrow overhang
    const esPocketGeo = extrudeHiRes(
      createFrameShape(17.6, 6.4, 1.45, 13.8, 3.5, 0.8),
      1.45,
      0.1,
      0.1,
      2,
      20
    );
    applyBoxUVs(esPocketGeo, 14);
    const esPocket = new THREE.Mesh(esPocketGeo, mats.ultra.evfFinderCoverMold);
    esPocket.position.set(0, -11.0, 0.08);
    g.add(esPocket);

    // Recessed glossy inner framing collar around the 940nm IR eye-sensor window
    const esTrimLip = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.8, 4.4, 1.0, 13.7, 3.3, 0.72), 0.45, 0.04, 0.04, 2, 16),
      mats.matteBlackAnodized
    );
    esTrimLip.position.set(0, -11.0, -0.56);
    g.add(esTrimLip);

    // 4 hidden corner M1.7 Ref.207 perimeter screw-access counterbore pockets (beneath eyecup!)
    for (const [sx, sy] of [
      [-13.4, 11.8],
      [13.4, 11.8],
      [-13.4, -9.4],
      [13.4, -9.4],
    ] as Array<[number, number]>) {
      const boss = createHiResRingCell(1.05, 2.05, 0.9, mats.matteBlackAnodized, 0.06, 22);
      boss.position.set(sx, sy, 0.52);
      g.add(boss);
    }

    // 4 molded snap-hook retention latches engaging EVF Mg housing shell on +Z
    for (const [lx, ly] of [
      [-12.2, 7.6],
      [12.2, 7.6],
      [-12.2, -5.8],
      [12.2, -5.8],
    ] as Array<[number, number]>) {
      const clipStem = new THREE.Mesh(createChamferedBoxGeo(1.1, 2.2, 1.65, 0.14, 0.05, 'z'), mats.mountPpsInsulator);
      clipStem.position.set(lx, ly, 1.38);
      const clipBarb = new THREE.Mesh(createChamferedBoxGeo(1.45, 2.1, 0.55, 0.1, 0.04, 'z'), mats.mountPpsInsulator);
      clipBarb.position.set(lx + (lx < 0 ? -0.22 : 0.22), ly, 2.05);
      clipBarb.userData.noEdges = true;
      g.add(clipStem, clipBarb);
    }

    // Dual-tier stepped dust/water labyrinth seal lip + molded EPDM compression bead on +Z rim
    const labyrinth = new THREE.Mesh(
      extrudeHiRes(createFrameShape(30.8, 26.0, 4.4, 28.4, 23.6, 3.8), 0.85, 0.07, 0.07, 2, 26),
      mats.ultra.micRubberBootBlack
    );
    labyrinth.position.z = 0.88;
    const sealBead = new THREE.Mesh(
      extrudeHiRes(createFrameShape(29.8, 25.0, 4.1, 29.1, 24.3, 3.9), 0.34, 0.06, 0.06, 2, 24),
      mats.epdmGasket
    );
    sealBead.position.z = 1.36;
    sealBead.userData.noEdges = true;
    g.add(labyrinth, sealBead);

    // Subtle injection-molding ejector pin witness rings on inner +Z face
    for (const [ex, ey] of [
      [-9.0, 12.2],
      [9.0, 12.2],
      [-14.6, 1.2],
      [14.6, 1.2],
    ] as Array<[number, number]>) {
      const ej = new THREE.Mesh(hiResTorus(0.55, 0.06, 6, 16), mats.matteBlackAnodized);
      ej.position.set(ex, ey, 0.78);
      ej.userData.noEdges = true;
      g.add(ej);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-finder-cover',
        32,
        '#334155',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 1.2, -35.0),
        new THREE.Vector3(0, -4, -58),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E33. Sony OEM EYE SENSOR WINDOW (850) (Ref.117: 501034401) IR-Pass Window & Optical Septum
  // =========================================================================
  {
    const g = new THREE.Group();

    // Glossy deep-ruby-black 940nm IR-pass PMMA/acrylic window with stepped flush face
    const winGlass = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(14.2, 4.0, 1.0), 0.64, 0.08, 0.08, 2, 22),
      mats.evfIrWindowBlack
    );
    winGlass.position.z = -0.06;
    // Wider rear adhesive flange shoulder on +Z for waterproof bezel seating
    const winFlange = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(15.2, 4.75, 1.1), 0.32, 0.04, 0.04, 2, 20),
      mats.evfIrWindowBlack
    );
    winFlange.position.z = 0.28;
    g.add(winGlass, winFlange);

    // Twin molded internal collimating 940nm IR condenser lenslet domes on inner +Z face
    // Left dome focuses VCSEL IR emitter (-3.8); Center-right dome collects reflection into SPAD (+0.6)
    for (const lx of [-3.8, 0.65]) {
      const dome = new THREE.Mesh(
        hiResSphere(1.38, 22, 14, 0, Math.PI * 2, 0, Math.PI * 0.42).rotateX(Math.PI / 2),
        mats.evfIrWindowBlack
      );
      dome.scale.set(1.0, 1.0, 0.56);
      dome.position.set(lx, 0, 0.32);
      dome.userData.noEdges = true;
      g.add(dome);

      const lensRing = new THREE.Mesh(hiResTorus(1.34, 0.06, 6, 22), mats.matteBlackAnodized);
      lensRing.position.set(lx, 0, 0.42);
      lensRing.userData.noEdges = true;
      g.add(lensRing);
    }

    // Rightmost flat ambient RGB/ALS optical collector facet
    const alsWindow = new THREE.Mesh(
      createChamferedBoxGeo(2.3, 2.3, 0.26, 0.35, 0.04, 'z'),
      mats.evfIrWindowBlack
    );
    alsWindow.position.set(4.55, 0, 0.42);
    alsWindow.userData.noEdges = true;
    g.add(alsWindow);

    // Critical two-shot molded opaque matte-black Optical Isolation Septum wall (eliminates IR crosstalk!)
    const septumMain = new THREE.Mesh(
      createChamferedBoxGeo(0.88, 3.85, 1.92, 0.08, 0.05, 'z'),
      mats.velvetFlockTrap
    );
    septumMain.position.set(-1.55, 0, 0.96);
    // T-shaped top/bottom flange sealing septum tightly against window inner face
    const septumFlange = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 4.2, 0.24),
      mats.velvetFlockTrap
    );
    septumFlange.position.set(-1.55, 0, 0.48);
    // Micro stray-light baffle ribs along both faces of the optical septum
    for (const gz of [0.85, 1.25, 1.62]) {
      const baffleRib = new THREE.Mesh(new THREE.BoxGeometry(1.02, 3.4, 0.1), mats.velvetFlockTrap);
      baffleRib.position.set(-1.55, 0, gz);
      baffleRib.userData.noEdges = true;
      g.add(baffleRib);
    }
    g.add(septumMain, septumFlange);

    // Secondary divider wall isolating right-hand ambient photodiode chamber
    const sep2 = new THREE.Mesh(
      createChamferedBoxGeo(0.68, 3.6, 1.62, 0.08, 0.04, 'z'),
      mats.matteBlackAnodized
    );
    sep2.position.set(2.85, 0, 0.86);
    g.add(sep2);

    // Perimeter black double-sided waterproof acrylic PSA bonding tape rim
    const psaRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.0, 4.6, 1.05, 13.8, 3.5, 0.8), 0.16, 0.02, 0.02, 1, 18),
      mats.epdmGasket
    );
    psaRim.position.z = 0.48;
    psaRim.userData.noEdges = true;
    g.add(psaRim);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-eye-sensor-window',
        33,
        '#be123c',
        g,
        new THREE.Vector3(0, 28.4, -32.15),
        new THREE.Vector3(0, -24, -46),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E34. Sony OEM EYE SENSOR WP/RET Cushions (Ref.114/118), ES GND Sheet (Ref.115) & ES-1008 Flex
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front Waterproof Compression Cushion Ring (Ref.118: 501034501) with twin apertures + septum bridge!
    const wpShape = createRoundedRectShape(15.4, 5.2, 1.25);
    // Left VCSEL emitter cutout
    const hLeft = new THREE.Path();
    hLeft.absellipse(-3.8, 0, 1.75, 1.25, 0, Math.PI * 2, true, 0);
    // Right SPAD + ALS elongated cutout
    const hRight = new THREE.Path();
    hRight.absellipse(2.35, 0, 3.15, 1.25, 0, Math.PI * 2, true, 0);
    wpShape.holes.push(hLeft, hRight);
    const wpGeo = extrudeHiRes(wpShape, 0.68, 0.06, 0.06, 2, 18);
    applyBoxUVs(wpGeo, 10);
    const wpCush = new THREE.Mesh(wpGeo, mats.ultra.micRubberBootBlack);
    wpCush.position.z = -0.68;
    g.add(wpCush);

    // Rear High-Resilience PORON Retention Foam Pad (Ref.114: 501142001) with locating pinholes
    const retShape = createRoundedRectShape(15.8, 4.9, 1.05);
    addCircleHoles(retShape, [
      [-6.4, 0, 0.55],
      [6.4, 0, 0.55],
    ]);
    const retCush = new THREE.Mesh(
      extrudeHiRes(retShape, 0.74, 0.06, 0.06, 2, 18),
      mats.butylDamperRubber
    );
    retCush.position.z = 1.14;
    g.add(retCush);

    // Conductive Woven Ni/Cu EMI/ESD Ground Sheet (Ref.115: 502997201) with folded ground ear tab
    const gndShape = createRoundedRectShape(16.2, 4.65, 0.65);
    const gndSheet = new THREE.Mesh(
      extrudeHiRes(gndShape, 0.18, 0.02, 0.02, 1, 14),
      mats.conductiveNiCuFoam
    );
    gndSheet.position.z = 1.64;
    // Upper-right folded chassis grounding tongue tab
    const gndEar = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 2.8, 0.18, 0.3, 0.02, 'z'),
      mats.conductiveNiCuFoam
    );
    gndEar.position.set(5.4, 3.2, 1.64);
    const gndDimples = buildSpotWeldNuggets(
      [
        [4.8, 3.6, 1.74],
        [6.0, 3.6, 1.74],
      ],
      0.34,
      'z',
      mats.stainlessMachined,
      mats.silverElectrode
    );
    g.add(gndSheet, gndEar, gndDimples);

    // Contoured Sony OEM ES-1008 Polyimide Flex Ribbon (Ref.116: A5022315A) with copper traces
    const esFlex = createFlatRibbonAlongCurve(
      [
        new THREE.Vector3(-4.2, 1.4, 0.92),
        new THREE.Vector3(-4.2, 4.2, 1.08),
        new THREE.Vector3(-4.2, 7.2, 0.94),
        new THREE.Vector3(-4.2, 10.4, 0.96),
      ],
      5.6,
      0.22,
      new THREE.Vector3(1, 0, 0),
      mats.ultra.evfOemFlexRibbon,
      18
    );
    g.add(esFlex);

    // 4x miniature 0201 SMD decoupling capacitors / pull-up resistors near sensor root on ES-1008
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(0.75, 0.42, 0.34, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.position.set(-5.8 + i * 1.06, 3.3, 0.88);
      g.add(cap);
    }

    // SUS304 stainless ZIF stiffener backing + 10 crisp gold ZIF contact fingers at upper end
    const esStiff = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 2.35, 0.2, 0.25, 0.03, 'z'),
      mats.stainlessMachined
    );
    esStiff.position.set(-4.2, 9.75, 1.14);
    g.add(esStiff);

    for (let i = 0; i < 10; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.55, 0.08), mats.goldPlating);
      pin.position.set(-6.35 + i * 0.48, 9.85, 0.82);
      pin.userData.noEdges = true;
      g.add(pin);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-eye-sensor-cushions',
        34,
        '#f97316',
        g,
        new THREE.Vector3(0, 28.4, -31.1),
        new THREE.Vector3(-18, -32, -38),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E35. Sony OEM VF SHEET, RADIATION (795) (Ref.203: 457578001) & VF Flexible Adhesive (Ref.202)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Authentic Sony 4-575-780-01 die-cut silicone thermal radiation sheet with corner index notch & pinholes
    const radShape = new THREE.Shape();
    const hw = 11.9;
    const hh = 9.0;
    const cr = 1.4;
    radShape.moveTo(-hw + cr, -hh);
    radShape.lineTo(hw - cr, -hh);
    radShape.absarc(hw - cr, -hh + cr, cr, -Math.PI / 2, 0, false);
    radShape.lineTo(hw, hh - 2.6);
    // Asymmetric top-right Sony factory polarization notch
    radShape.lineTo(hw - 2.6, hh);
    radShape.lineTo(-hw + cr, hh);
    radShape.absarc(-hw + cr, hh - cr, cr, Math.PI / 2, Math.PI, false);
    radShape.lineTo(-hw, -hh + cr);
    radShape.absarc(-hw + cr, -hh + cr, cr, Math.PI, Math.PI * 1.5, false);
    addCircleHoles(radShape, [
      [-9.6, 6.8, 0.72],
      [9.6, -6.6, 0.72],
    ]);

    const radGeo = extrudeHiRes(radShape, 0.48, 0.04, 0.04, 2, 18);
    applyPlanarUVs(radGeo, 23.8, 18.0, 'xy');
    const radSheet = new THREE.Mesh(radGeo, mats.ultra.evfVfRadiationSheet);
    g.add(radSheet);

    // Subtle coral-pink edge bevel lip accent along the lower edge (iconic Sony 4-575-780-01 stripe!)
    const pinkLip = new THREE.Mesh(
      createChamferedBoxGeo(22.4, 2.75, 0.52, 0.5, 0.04, 'z'),
      mats.thermalPadPink
    );
    pinkLip.position.set(0, -7.45, 0);
    pinkLip.userData.noEdges = true;
    g.add(pinkLip);

    // Translucent Mylar/PET anti-adhesion VF Flexible Adhesive cover film (Ref.202: 4-575-818-11) + peel ear
    const filmShape = new THREE.Shape();
    filmShape.moveTo(-10.7, -7.8);
    filmShape.lineTo(10.7, -7.8);
    filmShape.lineTo(10.7, 5.2);
    // Upper-right service peel/pull-tab ear
    filmShape.lineTo(12.6, 5.8);
    filmShape.lineTo(12.6, 7.6);
    filmShape.lineTo(10.7, 7.8);
    filmShape.lineTo(-10.7, 7.8);
    filmShape.closePath();
    const adhFilm = new THREE.Mesh(
      extrudeHiRes(filmShape, 0.14, 0.02, 0.02, 1, 12),
      mats.mylarInsulatorFilm
    );
    adhFilm.position.z = 0.42;
    g.add(adhFilm);

    // Narrow double-sided silicone perimeter bonding border strips behind the cover sheet
    const bondBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(21.2, 15.4, 1.0, 19.6, 13.8, 0.7), 0.1, 0.01, 0.01, 1, 14),
      mats.thermalTransferTape
    );
    bondBorder.position.z = 0.3;
    bondBorder.userData.noEdges = true;
    g.add(bondBorder);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-vf-radiation-sheet',
        35,
        '#38bdf8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 12.15),
        new THREE.Vector3(0, 8, 84),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E36. Sony OEM EVF PROTECTOR (89100) (Ref.303: 502790801) Top-Hump Shield Arch
  // =========================================================================
  {
    const g = new THREE.Group();

    // Progressive-die stamped arched crown helmet shielding EVF barrel from hot-shoe impact & flash EMI
    const archShape = new THREE.Shape();
    archShape.moveTo(-13.8, -1.7);
    archShape.lineTo(-10.8, 1.25);
    archShape.lineTo(-4.4, 3.05);
    archShape.lineTo(4.4, 3.05);
    archShape.lineTo(10.8, 1.25);
    archShape.lineTo(13.8, -1.7);
    archShape.lineTo(12.5, -2.25);
    archShape.lineTo(9.8, 0.25);
    archShape.lineTo(3.9, 1.95);
    archShape.lineTo(-3.9, 1.95);
    archShape.lineTo(-9.8, 0.25);
    archShape.lineTo(-12.5, -2.25);
    archShape.closePath();

    const archGeo = extrudeHiRes(archShape, 36.2, 0.12, 0.12, 2, 16);
    applyBoxUVs(archGeo, 18);
    const arch = new THREE.Mesh(archGeo, mats.ultra.evfTconEmiCan);
    g.add(arch);

    // 3 longitudinal embossed stiffening swage ribs along the crown to resist hot-shoe impact load
    for (const rx of [-3.2, 0, 3.2]) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(0.95, 0.36, 30.5, 0.35, 0.08, 'y'),
        mats.ultra.evfTconEmiCan
      );
      rib.position.set(rx, 3.12, 0);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Left & right stepped horizontal mounting flange ears with M1.7 clearance screw holes
    for (const sx of [-1, 1]) {
      for (const ez of [-11.5, 11.5]) {
        const earShape = createRoundedRectShape(3.6, 5.2, 0.9);
        addCircleHoles(earShape, [[0, 0, 0.95]]);
        const ear = new THREE.Mesh(
          extrudeHiRes(earShape, 0.62, 0.05, 0.05, 2, 14).rotateX(Math.PI / 2),
          mats.ultra.evfTconEmiCan
        );
        ear.position.set(sx * 14.3, -1.9, ez);
        g.add(ear);
      }

      // 3 formed spring-contact EMI grounding fingers along each flank contacting Mg housing E18
      for (const fz of [-6.0, 0, 6.0]) {
        const finger = new THREE.Mesh(
          createChamferedBoxGeo(0.55, 1.55, 2.2, 0.12, 0.04, 'y'),
          mats.mountSpringSteel
        );
        finger.position.set(sx * 13.05, -2.45, fz);
        finger.rotation.z = sx * 0.24;
        finger.userData.noEdges = true;
        g.add(finger);
      }
    }

    // Stamped Faraday grounding dimple rows along sloped shoulders
    const dimplePos: Array<[number, number, number]> = [];
    for (const sx of [-1, 1]) {
      for (const dz of [-12, -6, 0, 6, 12]) {
        dimplePos.push([sx * 7.6, 2.2, dz]);
      }
    }
    g.add(buildSpotWeldNuggets(dimplePos, 0.42, 'y', mats.emiShieldCan, mats.stainlessMachined));

    // Top-side die-cut matte-black flame-retardant dielectric Mylar sheet under hot-shoe fix plate
    const insShape = createRoundedRectShape(16.6, 22.8, 1.4);
    addCircleHoles(insShape, [
      [-6.8, -5.2, 1.15],
      [6.8, -5.2, 1.15],
      [-6.8, 6.2, 1.15],
      [6.8, 6.2, 1.15],
    ]);
    const insPad = new THREE.Mesh(
      extrudeHiRes(insShape, 0.24, 0.02, 0.02, 1, 14).rotateX(Math.PI / 2),
      mats.mylarInsulatorFilm
    );
    insPad.position.set(0, 3.34, 2.4);
    g.add(insPad);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-evf-protector',
        36,
        '#94a3b8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 13.8, -12.5),
        new THREE.Vector3(0, 44, 4),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E37. Sony OEM DIOPTER COVER WP SHEET B (Ref.301) & CV DIOPTER ADJUST DIAL (Ref.2)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Inner die-cut elastomeric waterproof sliding seal sheet (Ref.301: 500374001) with alignment ears
    const wpShape = createFrameShape(11.8, 11.8, 2.4, 3.3, 3.3, 1.6);
    addCircleHoles(wpShape, [
      [-4.2, 4.2, 0.55],
      [4.2, -4.2, 0.55],
    ]);
    const wpGeo = extrudeHiRes(wpShape, 0.48, 0.05, 0.05, 2, 20).rotateY(Math.PI / 2);
    applyBoxUVs(wpGeo, 10);
    const wpSheet = new THREE.Mesh(wpGeo, mats.ultra.micRubberBootBlack);
    wpSheet.position.x = -2.2;
    g.add(wpSheet);

    // White low-friction PTFE rotary inner collar ring bonded inside the waterproof sheet aperture
    const ptfeCollar = createHiResRingCell(1.55, 2.45, 0.56, mats.lcdDiffuserMatte, 0.04, 28);
    ptfeCollar.rotation.y = Math.PI / 2;
    ptfeCollar.position.x = -2.2;
    ptfeCollar.userData.noEdges = true;
    g.add(ptfeCollar);

    // Outer sculpted CV DIOPTER ADJUST DIAL cap (Ref.2: 500367201) turned via LatheGeometry
    const capPts: THREE.Vector2[] = [
      new THREE.Vector2(0.02, -0.45),
      new THREE.Vector2(3.35, -0.45),
      new THREE.Vector2(3.95, -0.35),
      new THREE.Vector2(4.02, 0.16),
      new THREE.Vector2(3.86, 0.42),
      new THREE.Vector2(3.45, 0.46),
      new THREE.Vector2(0.02, 0.46),
    ];
    const capBodyGeo = markHiRes(new THREE.LatheGeometry(capPts, 40));
    capBodyGeo.rotateZ(-Math.PI / 2);
    capBodyGeo.computeVertexNormals();
    const capBody = new THREE.Mesh(capBodyGeo, mats.matteBlackAnodized);
    capBody.position.x = 3.92;
    g.add(capBody);

    // Laser-engraved circular brushed cap face mapped with evfDiopterDialCap (- / 0 / + scale!)
    const faceDiskGeo = markHiRes(new THREE.CircleGeometry(3.62, 40));
    applyPlanarUVs(faceDiskGeo, 7.24, 7.24, 'xy');
    faceDiskGeo.rotateY(Math.PI / 2);
    const faceDisk = new THREE.Mesh(faceDiskGeo, mats.ultra.evfDiopterDialCap);
    faceDisk.position.x = 4.41;
    faceDisk.userData.noEdges = true;
    g.add(faceDisk);

    // Precision machined stainless perimeter bezel ring + 18 subtle micro-knurl perimeter ticks
    const capRing = new THREE.Mesh(
      hiResTorus(3.88, 0.24, 10, 36).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    capRing.position.x = 4.24;
    g.add(capRing);

    // 3 inner snap-retention tabs extending inward along -X into diopter dial hub
    for (let k = 0; k < 3; k++) {
      const a = (k * Math.PI * 2) / 3 + 0.35;
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 0.42, 1.05, 0.08, 0.03, 'y'),
        mats.mountPpsInsulator
      );
      tab.position.set(3.05, Math.sin(a) * 2.55, Math.cos(a) * 2.55);
      tab.rotation.x = -a;
      tab.userData.noEdges = true;
      g.add(tab);
    }

    // Sony's authentic single central Phillips service screw retaining the diopter knob
    const singleScrew = buildPhillipsScrew(
      0.92,
      0.38,
      0.46,
      1.65,
      mats.stainlessMachined,
      mats.velvetFlockTrap,
      mats.titaniumRivet
    );
    singleScrew.rotation.z = Math.PI / 2;
    singleScrew.position.x = 3.35;
    g.add(singleScrew);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-diopter-wp-sheet',
        37,
        '#475569',
        g,
        new THREE.Vector3(19.6, EVF_OPTICAL_Y, -15.6),
        new THREE.Vector3(52, -16, -26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E38. Sony OEM JK-1028 Flexible Relay Board (Ref.206) & JK HOLDER (Ref.205)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sculpted glass-filled PPS cable-routing JK HOLDER (Ref.205: 502789601) with curved R-guide saddle
    const holderProfile = new THREE.Shape();
    holderProfile.moveTo(-1.3, -6.2);
    holderProfile.lineTo(1.3, -6.2);
    holderProfile.lineTo(1.3, 6.2);
    holderProfile.lineTo(-0.5, 6.2);
    holderProfile.quadraticCurveTo(-1.45, 3.0, -1.45, 0.0);
    holderProfile.quadraticCurveTo(-1.45, -3.5, -1.3, -6.2);
    const holder = new THREE.Mesh(
      extrudeHiRes(holderProfile, 8.8, 0.1, 0.1, 2, 16),
      mats.mountPpsInsulator
    );
    g.add(holder);

    // Twin bridged pinch-prevention retention straps spanning over the JK-1028 flex channel
    for (const cy of [-3.4, 3.2]) {
      const bridge = new THREE.Mesh(
        createChamferedBoxGeo(0.32, 1.25, 6.4, 0.12, 0.04, 'z'),
        mats.matteBlackAnodized
      );
      bridge.position.set(-2.02, cy, 0);
      g.add(bridge);
      for (const sz of [-2.95, 2.95]) {
        const post = new THREE.Mesh(
          createChamferedBoxGeo(0.76, 1.25, 0.55, 0.08, 0.03, 'z'),
          mats.matteBlackAnodized
        );
        post.position.set(-1.62, cy, sz);
        post.userData.noEdges = true;
        g.add(post);
      }
    }

    // Lateral mounting screw boss with brass threaded insert ring on +X side of JK HOLDER
    const bossPlate = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(2.8, 3.8, 0.9), 1.4, 0.08, 0.08, 2, 14).rotateY(Math.PI / 2),
      mats.mountPpsInsulator
    );
    bossPlate.position.set(1.75, 1.8, -1.8);
    const bossInsert = createHiResRingCell(0.62, 1.15, 1.5, mats.brassGear, 0.04, 20);
    bossInsert.rotation.y = Math.PI / 2;
    bossInsert.position.set(1.75, 1.8, -1.8);
    g.add(bossPlate, bossInsert);

    // True flat-ribbon extruded amber Kapton JK-1028 Flex (Ref.206: A5022316A) hugging outer -X R-guide!
    const flexRibbon = createFlatRibbonAlongCurve(
      [
        new THREE.Vector3(-1.35, 5.8, 0.0),
        new THREE.Vector3(-1.68, 2.2, 0.0),
        new THREE.Vector3(-1.68, -2.6, 0.0),
        new THREE.Vector3(-1.54, -6.4, 0.6),
        new THREE.Vector3(-0.78, -10.3, 2.2),
      ],
      4.4,
      0.22,
      new THREE.Vector3(0, 0, 1),
      mats.ultra.evfOemFlexRibbon,
      26
    );
    g.add(flexRibbon);

    // 4x miniature 0201 SMD EMI filter passives populated cleanly between the two bridge straps
    for (let i = 0; i < 4; i++) {
      const smd = buildSmdPassive(0.68, 0.38, 0.28, mats.smdCeramic, mats.silverElectrode, 'y');
      smd.rotation.z = Math.PI / 2;
      smd.position.set(-1.9, 1.15 - i * 0.78, -1.1 + i * 0.72);
      g.add(smd);
    }

    // Upper & lower SUS304 ZIF stiffeners + 14 crisp gold ZIF fingers at lower board-to-board tip
    const botStiff = new THREE.Mesh(
      createChamferedBoxGeo(0.22, 2.4, 4.55, 0.2, 0.03, 'z'),
      mats.stainlessMachined
    );
    botStiff.position.set(-0.56, -10.35, 2.2);
    const topStiff = new THREE.Mesh(
      createChamferedBoxGeo(0.22, 1.9, 4.5, 0.2, 0.03, 'z'),
      mats.stainlessMachined
    );
    topStiff.position.set(-1.14, 5.65, 0.0);
    g.add(botStiff, topStiff);

    for (let i = 0; i < 14; i++) {
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.75, 0.18), mats.goldPlating);
      finger.position.set(-0.92, -10.45, 0.25 + i * 0.3);
      finger.userData.noEdges = true;
      g.add(finger);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-jk1028-flex-holder',
        38,
        '#ea580c',
        g,
        new THREE.Vector3(-13.8, EVF_OPTICAL_Y - 4.2, 5.2),
        new THREE.Vector3(-42, -14, 18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E39. Sony OEM VF-Block Precision M1.7 Screws (Ref.204/207/208) & Wave Washers
  // =========================================================================
  {
    const g = new THREE.Group();

    // 4 Rear Eyecup-Perimeter M1.7 L=4.0mm Ref.207 Phillips Pan-Head Screws + True 3-Wave Washers
    const waveGeo = createWaveWasherGeo(1.38, 0.15, 3, 0.19);
    for (const [sx, sy] of [
      [-13.4, 10.6],
      [13.4, 10.6],
      [-13.4, -10.6],
      [13.4, -10.6],
    ] as Array<[number, number]>) {
      const scr = buildPhillipsScrew(
        1.08,
        0.46,
        0.54,
        4.0,
        mats.stainlessMachined,
        mats.velvetFlockTrap,
        mats.titaniumRivet
      );
      scr.rotation.x = Math.PI / 2;
      scr.position.set(sx, sy, -22.2);

      // Authentic Sony blue nylon thread-lock patch band on lower half of shank
      const lockPatch = new THREE.Mesh(
        hiResCyl(0.58, 0.56, 1.15, 14).rotateX(Math.PI / 2),
        mats.mountThreadLockBlue
      );
      lockPatch.position.set(sx, sy, -19.5);
      lockPatch.userData.noEdges = true;

      // True 3-wave sinusoidal SUS301 wave spring washer preventing shock loosening
      const wave = new THREE.Mesh(waveGeo, mats.beCuSpring);
      wave.position.set(sx, sy, -21.75);
      wave.userData.noEdges = true;
      g.add(scr, lockPatch, wave);
    }

    // 2 Lower Chassis Mount M1.7 L=3.0mm (Ref.204) & 1 Rear Anchor M1.7 P2 L=2.5mm (Ref.208)
    for (const [bx, bz, len, isP2] of [
      [-12.2, -10.5, 3.0, false],
      [14.2, -10.5, 3.0, false],
      [0.0, 14.5, 2.5, true],
    ] as Array<[number, number, number, boolean]>) {
      const bScr = buildPhillipsScrew(
        1.05,
        0.42,
        0.52,
        len,
        isP2 ? mats.matteBlackAnodized : mats.titaniumRivet,
        mats.velvetFlockTrap,
        mats.stainlessMachined
      );
      bScr.position.set(bx, -13.2, bz);

      // Chamfered brass/steel load-distributing flat seating washer
      const wash = createHiResRingCell(
        0.64,
        1.48,
        0.24,
        isP2 ? mats.stainlessMachined : mats.brassGear,
        0.04,
        24
      );
      wash.rotation.x = Math.PI / 2;
      wash.position.set(bx, -12.95, bz);
      wash.userData.noEdges = true;

      // Subtle blue thread-locker ring on shank
      const lockBand = new THREE.Mesh(hiResCyl(0.55, 0.53, 0.85, 14), mats.mountThreadLockBlue);
      lockBand.position.set(bx, -13.2 + len * 0.65, bz);
      lockBand.userData.noEdges = true;
      g.add(bScr, wash, lockBand);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-vf-mounting-screws',
        39,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -12.5),
        new THREE.Vector3(-34, -22, -46),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E40. EVF-Crown MI Hot-Shoe Shell Plate (Ref.327), Fix Plate (Ref.311) & Screw Cover (Ref.329)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Base stainless Shell Plate deck (Ref.327: 500294302) with 3 authentic ISO/MI base lock-pin holes!
    const baseDeckShape = createRoundedRectShape(20.6, 20.4, 1.3);
    addCircleHoles(baseDeckShape, [
      [0, -4.6, 1.15], // Center-rear ISO/Sony foot locking-pin socket hole
      [-6.8, -5.8, 0.85], // Left anti-twist guide hole
      [6.8, -5.8, 0.85], // Right anti-twist guide hole
    ]);
    const baseDeck = new THREE.Mesh(
      extrudeHiRes(baseDeckShape, 0.62, 0.06, 0.06, 2, 18).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    baseDeck.position.y = 0.72;
    g.add(baseDeck);

    // Authentic ISO-518 turned-in L-profile overhanging guide rails (left & right!)
    for (const sx of [-1, 1]) {
      const railProfile = new THREE.Shape();
      railProfile.moveTo(0, 0);
      railProfile.lineTo(1.55, 0);
      railProfile.lineTo(1.55, 2.35);
      railProfile.lineTo(-2.35, 2.35);
      railProfile.lineTo(-2.35, 1.48);
      railProfile.lineTo(0, 1.48);
      railProfile.closePath();
      const railGeo = extrudeHiRes(railProfile, 19.6, 0.08, 0.08, 2, 12);
      if (sx < 0) railGeo.scale(-1, 1, 1);
      const rail = new THREE.Mesh(railGeo, mats.mountStainlessFlange);
      rail.position.set(sx * 8.75, 0.74, -0.3);
      g.add(rail);
    }

    // Front protective overhang bridge framing the 21-pin MIS-2006 contact recess
    const frontBridge = new THREE.Mesh(
      createChamferedBoxGeo(19.6, 0.88, 3.6, 0.5, 0.08, 'y'),
      mats.mountStainlessFlange
    );
    frontBridge.position.set(0, 2.66, 8.2);
    g.add(frontBridge);

    // Authentic Pin 22 central circular X-sync flash contact pad in recessed dark PPS insulator bushing!
    const pin22Bushing = createHiResRingCell(1.18, 1.85, 0.42, mats.mountPpsInsulator, 0.04, 24);
    pin22Bushing.rotation.x = Math.PI / 2;
    pin22Bushing.position.set(0, 1.02, -0.4);
    const pin22Pad = new THREE.Mesh(hiResCyl(1.12, 1.15, 0.46, 24), mats.goldPlating);
    pin22Pad.position.set(0, 1.04, -0.4);
    pin22Pad.userData.noEdges = true;
    g.add(pin22Bushing, pin22Pad);

    // Slide-in brushed stainless Screw Cover Plate hiding the 4 special bolts (Ref.329: 500294602)
    const coverShape = createRoundedRectShape(13.2, 13.4, 0.8);
    addCircleHoles(coverShape, [
      [0, -0.8, 1.95], // Clearance opening for Pin 22 X-sync contact
      [0, 3.4, 1.25], // Clearance opening for center lock-pin hole
    ]);
    const scrCover = new THREE.Mesh(
      extrudeHiRes(coverShape, 0.38, 0.04, 0.04, 2, 16).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    scrCover.position.set(0, 1.06, -1.2);
    g.add(scrCover);

    // Under-roof heavy stamped stainless Anchor Fix Plate (Ref.311: 500395901) with FPC slot & stiffening ribs
    const fixShape = createRoundedRectShape(21.6, 21.4, 1.6);
    const fpcSlot = new THREE.Path();
    fpcSlot.moveTo(-6.2, -9.2);
    fpcSlot.lineTo(6.2, -9.2);
    fpcSlot.lineTo(6.2, -5.8);
    fpcSlot.lineTo(-6.2, -5.8);
    fpcSlot.closePath();
    fixShape.holes.push(fpcSlot);
    const fixPlate = new THREE.Mesh(
      extrudeHiRes(fixShape, 1.18, 0.08, 0.08, 2, 16).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    fixPlate.position.y = -1.65;
    g.add(fixPlate);

    // Twin embossed stiffening ribs + 4 extruded threaded bosses + 4 M1.7 L=3.3mm Ref.328 Special Bolts
    for (const rx of [-3.4, 3.4]) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(1.1, 0.42, 12.2, 0.25, 0.06, 'y'),
        mats.stainlessMachined
      );
      rib.position.set(rx, -2.32, -1.8);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    for (const [sx, sz] of [
      [-6.8, -6.2],
      [6.8, -6.2],
      [-6.8, 5.2],
      [6.8, 5.2],
    ] as Array<[number, number]>) {
      const boss = createHiResRingCell(0.62, 1.55, 1.4, mats.stainlessMachined, 0.06, 20);
      boss.rotation.x = Math.PI / 2;
      boss.position.set(sx, -2.2, sz);
      const s = buildPhillipsScrew(
        0.96,
        0.34,
        0.5,
        3.3,
        mats.stainlessMachined,
        mats.velvetFlockTrap,
        mats.titaniumRivet
      );
      s.rotation.x = Math.PI;
      s.position.set(sx, 0.65, sz);
      g.add(boss, s);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mi-shoe-shell',
        40,
        '#94a3b8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 17.6, -8.3),
        new THREE.Vector3(0, 58, 12),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E41. Sony OEM 21-Pin Digital Audio MIS-2006 Contact Block (Ref.325) & WP Rubber (Ref.324)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision black LCP (Liquid Crystal Polymer) front micro-pitch comb housing (MIS-2006)
    const blk = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(16.6, 4.6, 0.65), 2.15, 0.08, 0.08, 2, 14).rotateX(Math.PI / 2),
      mats.icEpoxy
    );
    blk.position.set(0, 0.78, 7.25);
    // Protective overhanging upper comb hood shielding the 21 ultra-fine pins
    const combHood = new THREE.Mesh(
      createChamferedBoxGeo(16.8, 0.42, 3.25, 0.4, 0.05, 'y'),
      mats.icEpoxy
    );
    combHood.position.set(0, 1.88, 6.25);
    // Left & right tapered polarization guide cheeks
    for (const sx of [-1, 1]) {
      const cheek = new THREE.Mesh(
        createChamferedBoxGeo(0.95, 1.55, 2.8, 0.14, 0.05, 'y'),
        mats.mountPpsInsulator
      );
      cheek.position.set(sx * 7.85, 0.92, 6.1);
      g.add(cheek);
    }
    g.add(blk, combHood);

    // 21 individually sculpted cantilevered gold contact beams (Pins 1–21) + 22 thin LCP divider fins!
    for (let i = -10; i <= 10; i++) {
      const px = i * 0.66;
      // Horizontal spring beam
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.22, 2.35), mats.goldPlating);
      beam.position.set(px, 0.96, 6.1);
      beam.userData.noEdges = true;
      // Downward-curved wiping contact nose tip
      const nose = new THREE.Mesh(hiResCyl(0.17, 0.17, 0.34, 8).rotateZ(Math.PI / 2), mats.goldPlating);
      nose.position.set(px, 0.78, 5.02);
      nose.userData.noEdges = true;
      g.add(beam, nose);
    }
    for (let i = -10; i <= 11; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.02, 2.1), mats.mountPpsInsulator);
      fin.position.set((i - 0.5) * 0.66, 0.94, 6.15);
      fin.userData.noEdges = true;
      g.add(fin);
    }

    // Center rear-extending Pin 22 X-sync gold spring tongue
    const xSyncArm = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.24, 5.2), mats.goldPlating);
    xSyncArm.position.set(0, 0.42, 3.2);
    xSyncArm.userData.noEdges = true;
    g.add(xSyncArm);

    // Stepped Molded EPDM Waterproof FPC Entry Boot (Ref.324: 501695501) with twin sealing ribs
    const wpBootGeo = extrudeHiRes(createRoundedRectShape(18.2, 6.1, 1.05), 1.38, 0.08, 0.08, 2, 16).rotateX(
      Math.PI / 2
    );
    applyBoxUVs(wpBootGeo, 12);
    const wpBoot = new THREE.Mesh(wpBootGeo, mats.ultra.micRubberBootBlack);
    wpBoot.position.set(0, -1.0, 7.45);
    for (const ry of [-0.45, -1.48]) {
      const sealLip = new THREE.Mesh(
        extrudeHiRes(createFrameShape(18.6, 6.4, 1.15, 17.6, 5.4, 0.9), 0.26, 0.04, 0.04, 1, 14).rotateX(
          Math.PI / 2
        ),
        mats.epdmGasket
      );
      sealLip.position.set(0, ry, 7.45);
      sealLip.userData.noEdges = true;
      g.add(sealLip);
    }
    g.add(wpBoot);

    // Contoured descending MIS-2006 Polyimide Flex Ribbon with ESD IC, 0201 caps & 21 gold ZIF fingers
    const fpcTail = createFlatRibbonAlongCurve(
      [
        new THREE.Vector3(0, -1.4, 7.8),
        new THREE.Vector3(0, -3.2, 9.2),
        new THREE.Vector3(0, -5.6, 9.7),
        new THREE.Vector3(0, -7.8, 9.7),
      ],
      11.6,
      0.24,
      new THREE.Vector3(1, 0, 0),
      mats.ultra.evfOemFlexRibbon,
      20
    );
    g.add(fpcTail);

    // Miniature 6-pin TVS ESD protection diode IC on MIS-2006 flex protecting 21 digital audio pins
    const esdIc = buildChipPackage({
      w: 2.6,
      d: 1.6,
      h: 0.45,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      axis: 'z',
    });
    esdIc.position.set(-2.6, -4.5, 9.85);
    g.add(esdIc);

    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(0.76, 0.42, 0.32, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.position.set(0.6 + i * 1.15, -4.5, 9.82);
      g.add(cap);
    }

    // SUS304 ZIF stiffener + 21 gold ZIF contact fingers at distal termination
    const zifStiff = new THREE.Mesh(
      createChamferedBoxGeo(11.8, 2.1, 0.22, 0.25, 0.03, 'z'),
      mats.stainlessMachined
    );
    zifStiff.position.set(0, -6.95, 9.52);
    g.add(zifStiff);
    for (let i = -10; i <= 10; i++) {
      const gf = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.5, 0.08), mats.goldPlating);
      gf.position.set(i * 0.5, -7.05, 9.86);
      gf.userData.noEdges = true;
      g.add(gf);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mi-shoe-contacts',
        41,
        '#eab308',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 17.6, -8.3),
        new THREE.Vector3(24, 62, 26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E42. Sony OEM MI SHOE SPRING PLATE (Ref.331) & Dust Cap SHOE CAP (Ref.9)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Twin arched SUS301-CSP cantilever anti-rattle leaf springs (Ref.331: 500294502)
    const leafProfile = new THREE.Shape();
    leafProfile.moveTo(-6.4, 0.0);
    leafProfile.quadraticCurveTo(-2.0, 0.92, 2.8, 0.72);
    leafProfile.quadraticCurveTo(5.4, 0.55, 6.2, 0.16);
    leafProfile.lineTo(6.2, -0.14);
    leafProfile.quadraticCurveTo(5.2, 0.22, 2.8, 0.4);
    leafProfile.quadraticCurveTo(-2.0, 0.6, -6.4, -0.28);
    leafProfile.closePath();

    for (const sx of [-5.2, 5.2]) {
      const leafGeo = extrudeHiRes(leafProfile, 2.65, 0.04, 0.04, 1, 16);
      leafGeo.rotateY(Math.PI / 2);
      const leaf = new THREE.Mesh(leafGeo, mats.mountSpringSteel);
      leaf.position.set(sx, 0.05, -0.6);
      // Upward-pressed hemispherical preload contact dome at each spring tip
      const dome = new THREE.Mesh(
        hiResSphere(0.75, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5),
        mats.stainlessMachined
      );
      dome.scale.set(1, 0.45, 1.3);
      dome.position.set(sx, 0.68, 2.4);
      dome.userData.noEdges = true;
      g.add(leaf, dome);
    }

    // Rear stainless cross tie-bar with locating ear & Ref.330 M1.4 anchor screw
    const crossTie = new THREE.Mesh(
      createChamferedBoxGeo(13.4, 0.34, 2.35, 0.35, 0.04, 'y'),
      mats.mountSpringSteel
    );
    crossTie.position.set(0, -0.08, -6.8);
    const ref330 = buildPhillipsScrew(
      0.78,
      0.3,
      0.4,
      1.6,
      mats.stainlessMachined,
      mats.velvetFlockTrap,
      mats.titaniumRivet
    );
    ref330.rotation.x = Math.PI;
    ref330.position.set(0, 0.18, -6.8);
    g.add(crossTie, ref330);

    // Authentic slim black PC+ABS Sony FA-SHC1M / 443873412 Shoe Cap (20.5x19.7x4.15mm class)
    const capTopGeo = extrudeHiRes(createRoundedRectShape(21.0, 21.4, 1.85), 1.95, 0.22, 0.22, 3, 20).rotateX(
      Math.PI / 2
    );
    applyBoxUVs(capTopGeo, 16);
    const capTop = new THREE.Mesh(capTopGeo, mats.ultra.evfFinderCoverMold);
    capTop.position.set(0, 3.25, 0);
    g.add(capTop);

    // Recessed matte satin central grip dish on top of FA-SHC1M shoe cap
    const capDish = new THREE.Mesh(
      createChamferedBoxGeo(14.8, 0.28, 12.6, 1.1, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    capDish.position.set(0, 4.18, 0.6);
    g.add(capDish);

    // 5 crisp tactile rear thumb-grip ribs along the -Z edge of the Sony Shoe Cap!
    for (let r = 0; r < 5; r++) {
      const gripRib = new THREE.Mesh(
        createChamferedBoxGeo(13.8, 0.24, 0.42, 0.15, 0.04, 'y'),
        mats.matteBlackAnodized
      );
      gripRib.position.set(0, 4.24, -6.2 - r * 0.92);
      gripRib.userData.noEdges = true;
      g.add(gripRib);
    }

    // Twin precision side T-rail slide runners + inner click-detent flex tabs engaging ISO 518 rails
    const capCore = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 1.15, 16.2, 0.8, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    capCore.position.set(0, 1.88, -0.3);
    g.add(capCore);

    for (const sx of [-1, 1]) {
      const runner = new THREE.Mesh(
        createChamferedBoxGeo(1.85, 0.55, 15.8, 0.25, 0.05, 'y'),
        mats.matteBlackAnodized
      );
      runner.position.set(sx * 7.45, 1.62, -0.2);
      g.add(runner);
    }

    // Front overhanging 21-pin dust-seal lip hood covering the MIS-2006 recess
    const frontHood = new THREE.Mesh(
      createChamferedBoxGeo(18.6, 1.45, 1.65, 0.45, 0.08, 'y'),
      mats.ultra.evfFinderCoverMold
    );
    frontHood.position.set(0, 2.38, 9.65);
    g.add(frontHood);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mi-shoe-springs',
        42,
        '#1e293b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 18.2, -8.3),
        new THREE.Vector3(-22, 74, 8),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E43. EVF-Flank Stereo MEMS Microphones, Rubber Boots (Ref.304) & Mic Holder (Ref.308)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Fluted silicone acoustic isolation boot profile (Ref.304: 502687801 RUBBER MICROPHONE)
    const bootPts: THREE.Vector2[] = [
      new THREE.Vector2(1.4, -2.1),
      new THREE.Vector2(3.55, -2.1),
      new THREE.Vector2(3.62, -1.55),
      new THREE.Vector2(3.15, -1.1),
      new THREE.Vector2(3.52, -0.55),
      new THREE.Vector2(3.05, 0.0),
      new THREE.Vector2(3.42, 0.55),
      new THREE.Vector2(2.92, 1.1),
      new THREE.Vector2(3.15, 1.65),
      new THREE.Vector2(2.55, 2.1),
      new THREE.Vector2(1.35, 2.1),
      new THREE.Vector2(1.35, 1.4),
      new THREE.Vector2(2.35, 1.2),
      new THREE.Vector2(2.35, -1.6),
      new THREE.Vector2(1.4, -2.1),
    ];
    const bootGeo = markHiRes(new THREE.LatheGeometry(bootPts, 34));
    bootGeo.computeVertexNormals();

    for (const sx of [-15.2, 15.2]) {
      // Soft fluted black silicone vibration-isolation boot blocking IBIS/shutter chassis noise
      const boot = new THREE.Mesh(bootGeo, mats.ultra.micRubberBootBlack);
      boot.position.set(sx, 0, 0);
      g.add(boot);

      // Gold/nickel Faraday-shielded MEMS microphone capsule suspended inside the silicone boot
      const micBody = new THREE.Mesh(
        createChamferedBoxGeo(3.65, 1.25, 2.85, 0.32, 0.06, 'y'),
        mats.goldPlating
      );
      micBody.position.set(sx, 0.36, 0);
      const micLidGeo = markHiRes(new THREE.PlaneGeometry(3.35, 2.55));
      micLidGeo.rotateX(-Math.PI / 2);
      const micLid = new THREE.Mesh(micLidGeo, mats.ultra.micMemsFaradayLid);
      micLid.position.set(sx, 1.01, 0);
      micLid.userData.noEdges = true;
      // Precision top acoustic port pinhole into MEMS silicon diaphragm
      const portHole = new THREE.Mesh(hiResCyl(0.42, 0.42, 0.12, 14), mats.velvetFlockTrap);
      portHole.position.set(sx, 1.04, 0.52);
      portHole.userData.noEdges = true;
      g.add(micBody, micLid, portHole);

      // Mini circular emerald carrier PCB + 2x 0201 bypass caps beneath MEMS capsule
      const carrierPcb = new THREE.Mesh(hiResCyl(2.45, 2.45, 0.36, 22), mats.sensorPcb);
      carrierPcb.position.set(sx, -0.46, 0);
      for (const cz of [-0.75, 0.75]) {
        const cap = buildSmdPassive(0.75, 0.42, 0.32, mats.smdCeramic, mats.silverElectrode, 'y');
        cap.position.set(sx + (sx < 0 ? 1.15 : -1.15), -0.78, cz);
        g.add(cap);
      }
      g.add(carrierPcb);

      // Rigid glass-filled PPS MIC HOLDER cradle (Ref.308: 502790401) with twin mounting ears
      const holder = new THREE.Mesh(
        extrudeHiRes(createFrameShape(8.6, 8.6, 1.7, 6.4, 6.4, 3.0), 2.35, 0.1, 0.1, 2, 20).rotateX(
          Math.PI / 2
        ),
        mats.mountPpsInsulator
      );
      holder.position.set(sx, -0.82, 0);
      for (const ez of [-4.8, 4.8]) {
        const earShape = createRoundedRectShape(3.2, 2.6, 0.8);
        addCircleHoles(earShape, [[0, 0, 0.65]]);
        const ear = new THREE.Mesh(
          extrudeHiRes(earShape, 0.85, 0.06, 0.06, 2, 14).rotateX(Math.PI / 2),
          mats.mountPpsInsulator
        );
        ear.position.set(sx, -1.52, ez);
        g.add(ear);
      }
      g.add(holder);

      // Contoured shielded stereo mic amber Kapton flex lead descending to audio codec
      const lead = createFlatRibbonAlongCurve(
        [
          new THREE.Vector3(sx, -1.0, 0),
          new THREE.Vector3(sx + (sx < 0 ? 0.4 : -0.4), -4.2, -0.35),
          new THREE.Vector3(sx + (sx < 0 ? 0.6 : -0.6), -7.6, -0.15),
          new THREE.Vector3(sx + (sx < 0 ? 0.6 : -0.6), -9.6, 0.0),
        ],
        2.5,
        0.22,
        new THREE.Vector3(1, 0, 0),
        mats.ultra.evfOemFlexRibbon,
        16
      );
      // Distal 4-pin gold solder/ZIF termination pad bar
      const padBar = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.15, 0.28), mats.goldPlating);
      padBar.position.set(sx + (sx < 0 ? 0.6 : -0.6), -9.2, 0.0);
      padBar.userData.noEdges = true;
      g.add(lead, padBar);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-stereo-mics',
        43,
        '#d97706',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 10.6, 3.8),
        new THREE.Vector3(0, 44, 48),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E44. Microphone Port Hydrophobic Acoustic Wind-Noise Mesh & ePTFE Membrane
  // =========================================================================
  {
    const g = new THREE.Group();

    for (const sx of [-15.2, 15.2]) {
      // Bottom annular black waterproof acrylic PSA adhesive ring
      const psaRing = createHiResRingCell(2.05, 3.05, 0.18, mats.epdmGasket, 0.02, 28);
      psaRing.rotation.x = Math.PI / 2;
      psaRing.position.set(sx, -0.22, 0);
      psaRing.userData.noEdges = true;

      // Porous white hydrophobic ePTFE waterproof acoustic membrane disk
      const ptfeGeo = hiResCyl(2.82, 2.82, 0.26, 28);
      applyPlanarUVs(ptfeGeo, 5.64, 5.64, 'xz');
      const ptfe = new THREE.Mesh(ptfeGeo, mats.ultra.micEptfeMembrane);
      ptfe.position.set(sx, 0.02, 0);

      // Fine stainless steel woven wind-turbulence micro-mesh disc
      const meshGeo = hiResCyl(2.92, 2.92, 0.2, 28);
      applyPlanarUVs(meshGeo, 5.84, 5.84, 'xz');
      const meshCap = new THREE.Mesh(meshGeo, mats.ultra.micStainlessWovenMesh);
      meshCap.position.set(sx, 0.28, 0);

      // Machined satin stainless perimeter clamping rim framing the acoustic mesh
      const clampRing = createHiResRingCell(2.58, 3.16, 0.28, mats.stainlessMachined, 0.04, 32);
      clampRing.rotation.x = Math.PI / 2;
      clampRing.position.set(sx, 0.3, 0);

      // Flush top-deck dark-anodized 3-pinhole acoustic port baffle bezel
      const portPlateShape = createRoundedRectShape(2.2, 4.4, 0.95);
      addCircleHoles(portPlateShape, [
        [0, -1.2, 0.36],
        [0, 0, 0.36],
        [0, 1.2, 0.36],
      ]);
      const portPlate = new THREE.Mesh(
        extrudeHiRes(portPlateShape, 0.24, 0.04, 0.04, 2, 18).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      portPlate.position.set(sx, 0.56, 0);

      // Dark acoustic tunnel bores + chamfered rim accents on the 3 pinholes
      for (const dz of [-1.2, 0, 1.2]) {
        const dot = new THREE.Mesh(hiResCyl(0.34, 0.34, 0.28, 12), mats.velvetFlockTrap);
        dot.position.set(sx, 0.54, dz);
        dot.userData.noEdges = true;
        const rim = new THREE.Mesh(hiResTorus(0.38, 0.04, 6, 14).rotateX(Math.PI / 2), mats.stainlessMachined);
        rim.position.set(sx, 0.68, dz);
        rim.userData.noEdges = true;
        g.add(dot, rim);
      }

      g.add(psaRing, ptfe, meshCap, clampRing, portPlate);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mic-wind-mesh',
        44,
        '#06b6d4',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 13.2, 3.8),
        new THREE.Vector3(0, 62, 54),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E45. EVF-Hump Perimeter Die-Cut Weather-Seal Sponge Gasket & Light-Leak Seal
  // =========================================================================
  {
    const g = new THREE.Group();

    // Continuous 360° die-cut closed-cell EPDM/PORON perimeter weather-seal gasket under EVF hump
    const baseSealGeo = extrudeHiRes(
      createFrameShape(32.2, 46.4, 3.8, 27.6, 41.8, 2.6),
      1.08,
      0.1,
      0.1,
      2,
      24
    ).rotateX(Math.PI / 2);
    applyBoxUVs(baseSealGeo, 16);
    const baseSeal = new THREE.Mesh(baseSealGeo, mats.ultra.micRubberBootBlack);
    g.add(baseSeal);

    // Continuous raised dual-lip molded compression sealing bead running along top perimeter
    const topBead = new THREE.Mesh(
      extrudeHiRes(createFrameShape(30.4, 44.6, 3.2, 29.4, 43.6, 2.9), 0.36, 0.08, 0.08, 2, 22).rotateX(
        Math.PI / 2
      ),
      mats.epdmGasket
    );
    topBead.position.y = 0.62;
    topBead.userData.noEdges = true;
    g.add(topBead);

    // 4 contoured corner screw-boss sealing ear scallops with bolt clearance holes
    for (const [cx, cz] of [
      [-15.2, -19.8],
      [15.2, -19.8],
      [-15.2, 19.8],
      [15.2, 19.8],
    ] as Array<[number, number]>) {
      const ear = createHiResRingCell(1.05, 2.45, 1.05, mats.ultra.micRubberBootBlack, 0.08, 20);
      ear.rotation.x = Math.PI / 2;
      ear.position.set(cx, 0, cz);
      g.add(ear);
    }

    // Front & rear stepped vertical compression PORON foam light-leak dams sealing top-cover seams
    for (const sz of [-22.4, 22.4]) {
      const damProfile = new THREE.Shape();
      damProfile.moveTo(-0.7, 0);
      damProfile.lineTo(0.7, 0);
      damProfile.lineTo(0.7, 2.2);
      damProfile.lineTo(0.42, 3.35);
      damProfile.lineTo(-0.42, 3.35);
      damProfile.lineTo(-0.7, 2.2);
      damProfile.closePath();
      const damGeo = extrudeHiRes(damProfile, 26.2, 0.08, 0.08, 2, 12).rotateY(Math.PI / 2);
      const dam = new THREE.Mesh(damGeo, mats.lensFoamSeal);
      dam.position.set(0, 0.4, sz);
      g.add(dam);

      // Corner labyrinth foam overlap gussets
      for (const gx of [-13.6, 13.6]) {
        const gusset = new THREE.Mesh(
          createChamferedBoxGeo(1.8, 2.4, 2.0, 0.35, 0.08, 'y'),
          mats.lensFoamSeal
        );
        gusset.position.set(gx, 1.4, sz * 0.96);
        g.add(gusset);
      }
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-hump-wp-gasket',
        45,
        '#0f172a',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 12.6, -12.5),
        new THREE.Vector3(0, -38, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E46. Micro-OLED 2-Stack Tandem White Emitter & Fabry-Pérot Optical Micro-Cavity
  // =========================================================================
  {
    const g = new THREE.Group();

    // Stepped architectural 5-layer OLEDoS nanoscale cutaway (terraced insets reveal every layer!)
    // Layer 1 (rear +Z): Patterned reflective Al/Ag pixel anode mirror sheet
    const anodeMirror = new THREE.Mesh(
      createChamferedBoxGeo(13.85, 10.45, 0.14, 0.18, 0.02, 'z'),
      mats.sinteredSilver
    );
    anodeMirror.position.z = 0.26;

    // Gold perimeter pixel cathode/anode bus frame ring around bottom anode mirror
    const busRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.15, 10.75, 0.24, 13.65, 10.25, 0.15), 0.08, 0.01, 0.01, 1, 12),
      mats.goldPlating
    );
    busRing.position.z = 0.28;
    busRing.userData.noEdges = true;

    // Layer 2: 1st White Organic EL Emitter Stack (HTL / Blue+Yellow EML / ETL)
    const stack1 = new THREE.Mesh(
      createChamferedBoxGeo(13.64, 10.24, 0.14, 0.16, 0.02, 'z'),
      mats.evfLensAspheric
    );
    stack1.position.z = 0.11;

    // Layer 3: Ultra-thin metallic Charge Generation Layer (CGL) linking tandem diodes in series!
    const cgl = new THREE.Mesh(
      createChamferedBoxGeo(13.46, 10.06, 0.08, 0.14, 0.01, 'z'),
      mats.goldPlating
    );
    cgl.position.z = -0.02;

    // Layer 4: 2nd Tandem White Organic EL Emitter Stack (doubles cd/A current efficiency!)
    const stack2 = new THREE.Mesh(
      createChamferedBoxGeo(13.28, 9.88, 0.14, 0.14, 0.02, 'z'),
      mats.evfLensEd
    );
    stack2.position.z = -0.14;

    // Layer 5 (front -Z): Semi-transparent MgAg Fabry-Pérot micro-cavity cathode + Sony Symmetrical OCCF!
    const occfGeo = createChamferedBoxGeo(13.1, 9.7, 0.11, 0.12, 0.02, 'z');
    applyPlanarUVs(occfGeo, 13.1, 9.7, 'xy-back');
    const cathodeOccf = new THREE.Mesh(occfGeo, mats.ultra.evfTandemCavityStack);
    cathodeOccf.position.z = -0.28;

    // Ultra-thin ALD Thin-Film Encapsulation (TFE) perimeter hermetic barrier glass frame
    const tfeRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.95, 10.55, 0.22, 13.05, 9.65, 0.12), 0.12, 0.02, 0.02, 1, 14),
      mats.opticalCementClear
    );
    tfeRim.position.z = -0.34;
    tfeRim.userData.noEdges = true;

    g.add(anodeMirror, busRing, stack1, cgl, stack2, cathodeOccf, tfeRim);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-tandem-cavity',
        46,
        '#38bdf8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 2.95),
        new THREE.Vector3(24, 10, 44),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // E47. Micro-OLED Silicon Die φ20μm Gold Wire-Bonds & Black Epoxy Glob-Top Dam
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sculpted low-profile matte-black silica/carbon-filled Epoxy Glob-Top dam-and-fill bezel
    const damBase = new THREE.Mesh(
      extrudeHiRes(createFrameShape(19.8, 15.8, 1.05, 15.1, 11.3, 0.4), 0.44, 0.08, 0.08, 2, 18),
      mats.icEpoxy
    );
    damBase.position.z = 0.08;
    // Rounded epoxy meniscus fillet crown framing the wirebond channel
    const damMeniscus = new THREE.Mesh(
      extrudeHiRes(createFrameShape(19.2, 15.2, 0.9, 15.7, 11.9, 0.45), 0.28, 0.1, 0.1, 2, 16),
      mats.matteBlackAnodized
    );
    damMeniscus.position.z = -0.14;
    damMeniscus.userData.noEdges = true;
    g.add(damBase, damMeniscus);

    // Inner silicon-die & outer ceramic-shelf ENIG gold wirebond pad rows
    for (const sy of [-1, 1]) {
      for (let i = -6; i <= 6; i++) {
        const px = i * 1.08;
        const innerPad = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.34, 0.06), mats.goldPlating);
        innerPad.position.set(px, sy * 5.55, 0.18);
        innerPad.userData.noEdges = true;
        const outerPad = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.48, 0.06), mats.goldPlating);
        outerPad.position.set(px, sy * 7.42, 0.16);
        outerPad.userData.noEdges = true;
        g.add(innerPad, outerPad);

        // Authentic ball-to-stitch φ20μm gold wirebond loop rising smoothly along -Z!
        g.add(
          buildZWirebondLoop(
            new THREE.Vector3(px, sy * 5.55, 0.16),
            new THREE.Vector3(px, sy * 7.42, 0.14),
            -0.58,
            0.072,
            mats.goldPlating
          )
        );
      }

      // Dual corner high-current ELVDD / ELVSS heavy power wirebonds on left & right shoulders
      for (const sx of [-1, 1]) {
        g.add(
          buildZWirebondLoop(
            new THREE.Vector3(sx * 7.45, sy * 3.8, 0.16),
            new THREE.Vector3(sx * 9.15, sy * 4.4, 0.14),
            -0.52,
            0.088,
            mats.goldPlating
          )
        );
      }
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-bondwires-glob',
        47,
        '#f59e0b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 3.22),
        new THREE.Vector3(28, -12, 46),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E48. OLED Panel Direct Polyimide FPC (LCD902), 0201 MLCC Decap Bank & SUS Stiffener
  // =========================================================================
  {
    const g = new THREE.Group();

    // Die-cut contoured Sony LCD902 (ECX337AA-1) direct amber Kapton FPC with ZIF locking ears!
    const fpcShape = new THREE.Shape();
    fpcShape.moveTo(-6.2, 5.6);
    fpcShape.lineTo(6.2, 5.6);
    fpcShape.lineTo(6.2, -2.8);
    // Right ZIF locking ear notch
    fpcShape.lineTo(6.95, -3.1);
    fpcShape.lineTo(6.95, -4.35);
    fpcShape.lineTo(5.95, -4.55);
    fpcShape.lineTo(5.95, -5.65);
    fpcShape.lineTo(-5.95, -5.65);
    fpcShape.lineTo(-5.95, -4.55);
    // Left ZIF locking ear notch
    fpcShape.lineTo(-6.95, -4.35);
    fpcShape.lineTo(-6.95, -3.1);
    fpcShape.lineTo(-6.2, -2.8);
    fpcShape.closePath();

    const fpcGeo = extrudeHiRes(fpcShape, 0.22, 0.02, 0.02, 1, 14);
    applyPlanarUVs(fpcGeo, 13.9, 11.3, 'xy');
    const fpc = new THREE.Mesh(fpcGeo, mats.ultra.evfOemFlexRibbon);
    g.add(fpc);

    // 12x chamfered 0201 MLCC power decoupling capacitors right at OLED root (ELVDD/ELVSS/VCOM/AVDD)
    for (let i = 0; i < 6; i++) {
      const cx = -4.75 + i * 1.9;
      const cTop = buildSmdPassive(0.92, 0.5, 0.38, mats.smdCeramic, mats.silverElectrode, 'z');
      cTop.position.set(cx, 3.85, -0.26);
      const cBot = buildSmdPassive(0.92, 0.5, 0.38, mats.smdCeramic, mats.silverElectrode, 'z');
      cBot.position.set(cx, 2.35, -0.26);
      g.add(cTop, cBot);
    }

    // Miniature 8-pin Serial Calibration ID EEPROM IC storing factory OLEDoS gamma & white-point LUT!
    const eeprom = buildChipPackage({
      w: 2.75,
      d: 1.95,
      h: 0.44,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      axis: 'z',
    });
    eeprom.position.set(-2.2, 0.15, -0.32);
    g.add(eeprom);

    // 2x 0201 I2C pull-up resistors + 4 ENIG factory test pads beside calibration EEPROM
    for (let k = 0; k < 2; k++) {
      const res = buildSmdPassive(0.75, 0.42, 0.3, mats.icEpoxy, mats.silverElectrode, 'z');
      res.position.set(1.25 + k * 1.15, 0.55, -0.24);
      g.add(res);
    }
    for (let t = 0; t < 4; t++) {
      const tp = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.06, 12).rotateX(Math.PI / 2), mats.goldPlating);
      tp.position.set(0.9 + t * 1.05, -0.65, -0.14);
      tp.userData.noEdges = true;
      g.add(tp);
    }

    // 0.2mm brushed SUS304 stainless ZIF stiffener backing plate matching locking-ear notches on +Z
    const stiffShape = new THREE.Shape();
    stiffShape.moveTo(-6.2, -2.6);
    stiffShape.lineTo(6.2, -2.6);
    stiffShape.lineTo(6.95, -3.1);
    stiffShape.lineTo(6.95, -4.35);
    stiffShape.lineTo(5.95, -4.55);
    stiffShape.lineTo(5.95, -5.65);
    stiffShape.lineTo(-5.95, -5.65);
    stiffShape.lineTo(-5.95, -4.55);
    stiffShape.lineTo(-6.95, -4.35);
    stiffShape.lineTo(-6.95, -3.1);
    stiffShape.closePath();
    const stiffener = new THREE.Mesh(
      extrudeHiRes(stiffShape, 0.24, 0.03, 0.03, 1, 12),
      mats.stainlessMachined
    );
    stiffener.position.z = 0.23;
    g.add(stiffener);

    // 30 ultra-fine gold ZIF contact fingers along distal mating tongue (-Z)
    for (let i = 0; i < 30; i++) {
      const gf = new THREE.Mesh(new THREE.BoxGeometry(0.19, 1.85, 0.07), mats.goldPlating);
      gf.position.set(-5.35 + i * 0.369, -4.62, -0.14);
      gf.userData.noEdges = true;
      g.add(gf);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-fpc-decaps',
        48,
        '#d97706',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 12.2, 4.45),
        new THREE.Vector3(-22, -26, 48),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E49. 4-Element Eyepiece Multi-Layer Dielectric AR Coating (ZEISS T* / Nano AR II)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Conformal vapor-deposited ZEISS T* / Nano AR II coating shells on ALL 6 air-exposed optical faces!
    const coatingSpecs: Array<{
      r: number;
      z: number;
      fBulge: number;
      bBulge: number;
      f4: number;
      b4: number;
    }> = [
      // G4 Rear Molded Aspheric: front & rear faces
      { r: 11.12, z: -15.4 - 1.18, fBulge: 2.48, bBulge: -2.4, f4: -0.6, b4: 0.58 },
      { r: 11.08, z: -15.4 + 1.02, fBulge: 1.05, bBulge: -0.98, f4: -0.18, b4: 0.18 },
      // G2/G3 Cemented ED Doublet: front & rear air-exposed faces
      { r: 9.92, z: -9.2 - 2.04, fBulge: 2.28, bBulge: -2.2, f4: -0.3, b4: 0.28 },
      { r: 9.88, z: -9.2 + 1.66, fBulge: 0.65, bBulge: -0.58, f4: 0.08, b4: -0.08 },
      // G1 Field Condenser: front & rear faces
      { r: 9.3, z: -2.4 - 0.88, fBulge: 0.42, bBulge: -0.38, f4: -0.08, b4: 0.08 },
      { r: 9.32, z: -2.4 + 1.04, fBulge: -0.42, bBulge: 0.48, f4: 0.12, b4: -0.1 },
    ];

    for (const spec of coatingSpecs) {
      const arGeo = markHiRes(
        createOpticalLensGeometry(spec.r, 0.12, spec.fBulge, spec.bBulge, spec.f4, spec.b4, 20, 48)
      );
      const shell = new THREE.Mesh(arGeo, mats.lcdDbefIridescent);
      shell.position.z = spec.z;
      g.add(shell);

      // Subtle iridescent interference sheen ring highlighting ZEISS T* multi-layer coat edge
      const rim = new THREE.Mesh(hiResTorus(spec.r, 0.075, 8, 44), mats.lcdDbefIridescent);
      rim.position.z = spec.z;
      rim.userData.noEdges = true;
      g.add(rim);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-lens-zeiss-tstar-coat',
        49,
        '#10b981',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 0),
        new THREE.Vector3(-34, 18, 8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // E50. Optical Edge Blackening (Sumi-Nuri) & 3-Point Silicone Lens Potting Dots
  // =========================================================================
  {
    const g = new THREE.Group();

    const lensSpecs: Array<[number, number, number]> = [
      [-15.4, 11.42, 2.15], // G4 rim
      [-9.2, 10.26, 4.25], // G2/G3 doublet rim
      [-2.4, 9.62, 1.85], // G1 rim
    ];
    for (const [lz, r, w] of lensSpecs) {
      // Matte-black refractive-index-matched carbon Sumi-Nuri inked cylindrical edge band
      const inkBand = new THREE.Mesh(
        hiResCyl(r, r, w, 48, true).rotateX(Math.PI / 2),
        mats.velvetFlockTrap
      );
      inkBand.position.z = lz;
      g.add(inkBand);

      // Front & rear chamfered Sumi-Nuri edge-bevel overlap rings absorbing grazing reflections
      for (const sz of [-1, 1]) {
        const bevelInk = createHiResRingCell(r - 0.42, r + 0.04, 0.14, mats.velvetFlockTrap, 0.02, 44);
        bevelInk.position.z = lz + sz * (w * 0.5 - 0.04);
        bevelInk.userData.noEdges = true;
        g.add(bevelInk);
      }

      // 3x 120°-spaced translucent low-outgas silicone potting meniscus beads + capillary fillet pads
      for (let k = 0; k < 3; k++) {
        const a = (k * Math.PI * 2) / 3 + 0.5;
        const px = Math.cos(a) * (r + 0.18);
        const py = Math.sin(a) * (r + 0.18);

        const dot = new THREE.Mesh(hiResSphere(0.64, 14, 10), mats.dustCatcherGel);
        dot.scale.set(1.0, 1.0, 1.35);
        dot.position.set(px, py, lz);
        dot.userData.noEdges = true;

        // Capillary adhesive fillet pad spreading slightly onto lens rim
        const fillet = new THREE.Mesh(hiResCyl(0.76, 0.92, 0.24, 14), mats.opticalCementClear);
        fillet.position.set(Math.cos(a) * (r + 0.06), Math.sin(a) * (r + 0.06), lz);
        fillet.rotation.z = a - Math.PI / 2;
        fillet.userData.noEdges = true;
        g.add(dot, fillet);
      }
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-lens-edge-blackening',
        50,
        '#0f172a',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 0),
        new THREE.Vector3(-38, -8, 4),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E51. Precision Blackened-Brass Inter-Lens Spacer Rings & 5–20μm Shims
  // =========================================================================
  {
    const g = new THREE.Group();

    // Rear CNC lathe-turned blackened-brass inter-lens spacer (between G4 -15.4 and G2/G3 -9.2)
    // featuring 3 internal razor-sharp sawtooth knife-edge stray-light grooves!
    const sp1 = createKnifeEdgeSpacerLathe(10.35, 12.15, 2.05, 3, mats.matteBlackAnodized);
    sp1.position.z = -12.6;
    g.add(sp1);

    // Rear chemical photo-etched brass optical calibration shim with 3 thickness-code outer tabs
    const shim1 = createHiResRingCell(10.48, 11.96, 0.22, mats.ultra.evfShimEtchedBrass, 0.02, 48);
    applyPlanarUVs(shim1.geometry, 24.0, 24.0, 'xy');
    shim1.position.z = -11.42;
    g.add(shim1);
    for (let k = 0; k < 3; k++) {
      const a = (k * Math.PI * 2) / 3 + 0.35;
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 0.72, 0.2, 0.12, 0.02, 'z'),
        mats.ultra.evfShimEtchedBrass
      );
      tab.position.set(Math.cos(a) * 12.25, Math.sin(a) * 12.25, -11.42);
      tab.rotation.z = a;
      tab.userData.noEdges = true;
      g.add(tab);
    }

    // Front CNC lathe-turned blackened-brass inter-lens spacer (between G2/G3 -9.2 and G1 -2.4)
    const sp2 = createKnifeEdgeSpacerLathe(9.55, 11.45, 2.25, 3, mats.matteBlackAnodized);
    sp2.position.z = -5.6;
    g.add(sp2);

    // Front chemical photo-etched brass optical calibration shim with 2 thickness-code outer tabs
    const shim2 = createHiResRingCell(9.68, 11.28, 0.22, mats.ultra.evfShimEtchedBrass, 0.02, 48);
    applyPlanarUVs(shim2.geometry, 22.6, 22.6, 'xy');
    shim2.position.z = -4.32;
    g.add(shim2);
    for (const a of [0.65, 3.79]) {
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(1.1, 0.68, 0.2, 0.12, 0.02, 'z'),
        mats.ultra.evfShimEtchedBrass
      );
      tab.position.set(Math.cos(a) * 11.56, Math.sin(a) * 11.56, -4.32);
      tab.rotation.z = a;
      tab.userData.noEdges = true;
      g.add(tab);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-lens-inter-spacers',
        51,
        '#ca8a04',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 0),
        new THREE.Vector3(34, 22, 16),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E52. Micro-OLED Knife-Edge Rectangular Field-Stop Aperture Mask
  // =========================================================================
  {
    const g = new THREE.Group();

    // Wafer-thin 0.10mm photo-etched oxidized SUS304 theater-frame field mask with 4 registration pinholes
    const maskShape = createFrameShape(21.4, 17.6, 2.0, 14.2, 10.8, 0.35);
    addCircleHoles(maskShape, [
      [-9.1, 7.2, 0.65],
      [9.1, 7.2, 0.65],
      [-9.1, -7.2, 0.65],
      [9.1, -7.2, 0.65],
    ]);
    const mask = new THREE.Mesh(
      extrudeHiRes(maskShape, 0.22, 0.03, 0.03, 2, 18),
      mats.velvetFlockTrap
    );
    g.add(mask);

    // True 30° inward-tapered razor knife-edge aperture bevel framing the exact 13.8x10.4mm 4:3 viewport
    // Top & bottom beveled knife bars
    const hBevelProfile = new THREE.Shape();
    hBevelProfile.moveTo(0, -0.14);
    hBevelProfile.lineTo(0.42, -0.14);
    hBevelProfile.lineTo(0.42, 0.14);
    hBevelProfile.lineTo(0.04, 0.04);
    hBevelProfile.closePath();

    for (const sy of [-1, 1]) {
      const hBarGeo = extrudeHiRes(hBevelProfile, 14.2, 0.01, 0.01, 1, 8);
      hBarGeo.rotateY(Math.PI / 2);
      if (sy < 0) hBarGeo.scale(1, -1, 1);
      const hBar = new THREE.Mesh(hBarGeo, mats.matteBlackAnodized);
      hBar.position.set(0, sy * 5.2, -0.04);
      g.add(hBar);
    }

    // Left & right beveled knife bars
    for (const sx of [-1, 1]) {
      const vBarGeo = extrudeHiRes(hBevelProfile, 10.6, 0.01, 0.01, 1, 8);
      vBarGeo.rotateX(Math.PI / 2);
      if (sx < 0) vBarGeo.scale(-1, 1, 1);
      const vBar = new THREE.Mesh(vBarGeo, mats.matteBlackAnodized);
      vBar.position.set(sx * 6.9, 0, -0.04);
      g.add(vBar);
    }

    // 4 outward cantilevered micro spring-positioning fingers centering the mask with zero play
    for (const sx of [-1, 1]) {
      for (const fy of [-4.6, 4.6]) {
        const finger = new THREE.Mesh(
          createChamferedBoxGeo(0.95, 1.85, 0.18, 0.15, 0.02, 'z'),
          mats.matteBlackAnodized
        );
        finger.position.set(sx * 11.05, fy, 0.04);
        finger.rotation.y = sx * 0.22;
        finger.userData.noEdges = true;
        g.add(finger);
      }
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-field-mask',
        52,
        '#1e293b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 1.65),
        new THREE.Vector3(0, 22, 36),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E53. Zero-Backlash Split Lead-Screw Nut & Fluorinated Optical Damping Grease
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front ivory POM self-lubricating half-nut (Lathe-turned flanged sleeve with internal bore)
    const pomPts: THREE.Vector2[] = [
      new THREE.Vector2(1.08, -0.82),
      new THREE.Vector2(1.88, -0.82),
      new THREE.Vector2(1.88, 0.35),
      new THREE.Vector2(2.18, 0.42),
      new THREE.Vector2(2.18, 0.78),
      new THREE.Vector2(1.98, 0.85),
      new THREE.Vector2(1.08, 0.85),
      new THREE.Vector2(1.08, -0.82),
    ];
    const pomGeo = markHiRes(new THREE.LatheGeometry(pomPts, 32));
    pomGeo.rotateX(Math.PI / 2);
    pomGeo.computeVertexNormals();
    const nutFront = new THREE.Mesh(pomGeo, mats.pomGear);
    nutFront.position.z = 1.65;
    g.add(nutFront);

    // 2 rearward interlocking anti-rotation axial keyway prongs on POM half-nut!
    for (const sa of [0, Math.PI]) {
      const prong = new THREE.Mesh(
        createChamferedBoxGeo(0.56, 0.42, 2.35, 0.08, 0.03, 'z'),
        mats.pomGear
      );
      prong.position.set(Math.cos(sa) * 1.88, Math.sin(sa) * 1.88, 0.1);
      prong.rotation.z = sa;
      g.add(prong);
    }

    // Rear C3604 brass half-nut with machined hexagonal shoulder & mating axial slots
    const brassPts: THREE.Vector2[] = [
      new THREE.Vector2(1.08, -0.84),
      new THREE.Vector2(2.05, -0.84),
      new THREE.Vector2(2.15, -0.72),
      new THREE.Vector2(2.15, -0.25),
      new THREE.Vector2(1.85, -0.18),
      new THREE.Vector2(1.85, 0.82),
      new THREE.Vector2(1.08, 0.82),
      new THREE.Vector2(1.08, -0.84),
    ];
    const brassGeo = markHiRes(new THREE.LatheGeometry(brassPts, 32));
    brassGeo.rotateX(Math.PI / 2);
    brassGeo.computeVertexNormals();
    const nutRear = new THREE.Mesh(brassGeo, mats.brassGear);
    nutRear.position.z = -1.65;
    // Hex wrench shoulder collar on rear brass nut half
    const hexCollar = new THREE.Mesh(hiResCyl(2.22, 2.22, 0.56, 6).rotateX(Math.PI / 2), mats.brassGear);
    hexCollar.position.z = -2.1;
    g.add(nutRear, hexCollar);

    // Visible internal precision trapezoidal thread rings inside both split nut bores
    for (const tz of [-2.15, -1.75, -1.35, 1.35, 1.75, 2.15]) {
      const tr = new THREE.Mesh(hiResTorus(1.12, 0.075, 6, 20), tz < 0 ? mats.brassGear : mats.pomGear);
      tr.position.z = tz;
      tr.userData.noEdges = true;
      g.add(tr);
    }

    // CuBe2 helical anti-backlash compression spring preloading twin halves onto opposite thread flanks!
    const spreadSpring = new THREE.Mesh(
      markHiRes(createHelicalSpringGeometry(1.48, 2.35, 5, 0.17)),
      mats.beCuSpring
    );
    spreadSpring.userData.noEdges = true;
    g.add(spreadSpring);

    // Glossy translucent PFPE/PTFE fluorinated optical damping grease film + rounded end meniscus collars
    const greaseFilm = new THREE.Mesh(
      hiResCyl(1.26, 1.26, 4.95, 22, true).rotateX(Math.PI / 2),
      mats.opticalCementClear
    );
    greaseFilm.userData.noEdges = true;
    for (const gz of [-2.52, 2.52]) {
      const meniscus = new THREE.Mesh(hiResTorus(1.24, 0.16, 8, 22), mats.opticalCementClear);
      meniscus.position.z = gz;
      meniscus.userData.noEdges = true;
      g.add(meniscus);
    }
    g.add(greaseFilm);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-diopter-antibacklash-nut',
        53,
        '#eab308',
        g,
        new THREE.Vector3(14.8, EVF_OPTICAL_Y, -9.2),
        new THREE.Vector3(44, -28, 22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E54. Diopter Shaft Dual-Lip FKM Waterproof O-Ring Gland & PTFE Washer
  // =========================================================================
  {
    const g = new THREE.Group();

    // CNC lathe-turned SUS303 stainless rotary-and-axial gland housing with stepped O-ring grooves
    const glandPts: THREE.Vector2[] = [
      new THREE.Vector2(1.42, -1.92),
      new THREE.Vector2(2.38, -1.92),
      new THREE.Vector2(2.48, -1.78),
      new THREE.Vector2(2.48, -1.45),
      new THREE.Vector2(2.22, -1.42), // Outer groove shoulder
      new THREE.Vector2(2.22, -1.02),
      new THREE.Vector2(2.52, -0.96),
      new THREE.Vector2(2.52, 0.96),
      new THREE.Vector2(2.22, 1.02), // Inner groove shoulder
      new THREE.Vector2(2.22, 1.42),
      new THREE.Vector2(2.48, 1.48),
      new THREE.Vector2(2.92, 1.54), // Outer mounting flange collar
      new THREE.Vector2(2.92, 1.92),
      new THREE.Vector2(1.42, 1.92),
      new THREE.Vector2(1.42, -1.92),
    ];
    const glandGeo = markHiRes(new THREE.LatheGeometry(glandPts, 40));
    glandGeo.rotateZ(-Math.PI / 2);
    glandGeo.computeVertexNormals();
    const gland = new THREE.Mesh(glandGeo, mats.stainlessMachined);
    g.add(gland);

    // Machined hexagonal wrench-flat shoulder collar on outer +X mounting flange
    const hexNut = new THREE.Mesh(hiResCyl(2.95, 2.95, 0.56, 6).rotateZ(Math.PI / 2), mats.stainlessMachined);
    hexNut.position.x = 1.72;
    g.add(hexNut);

    // Twin FKM fluororubber dual-lip waterproof O-rings (inner moisture seal & outer dust wiper)
    for (const ox of [-1.25, 1.25]) {
      const oring = new THREE.Mesh(
        hiResTorus(1.74, 0.36, 12, 30).rotateY(Math.PI / 2),
        mats.ultra.micRubberBootBlack
      );
      oring.position.x = ox;
      oring.userData.noEdges = true;
      // Secondary inner micro dust-wiper lip bead
      const innerLip = new THREE.Mesh(
        hiResTorus(1.48, 0.14, 8, 24).rotateY(Math.PI / 2),
        mats.epdmGasket
      );
      innerLip.position.x = ox + (ox > 0 ? 0.24 : -0.24);
      innerLip.userData.noEdges = true;
      g.add(oring, innerLip);
    }

    // Crisp white split-scarf PTFE low-friction anti-extrusion backup washer (true scarf cut gap!)
    const ptfeWash = new THREE.Mesh(
      hiResTorus(1.76, 0.25, 10, 30, Math.PI * 1.92).rotateY(Math.PI / 2),
      mats.lcdDiffuserMatte
    );
    ptfeWash.userData.noEdges = true;
    g.add(ptfeWash);

    // Inner retaining C-clip spring collar locking gland assembly onto diopter shaft
    const cClip = new THREE.Mesh(
      hiResTorus(1.68, 0.14, 8, 26, Math.PI * 1.72).rotateY(Math.PI / 2),
      mats.mountSpringSteel
    );
    cClip.position.x = -2.02;
    cClip.userData.noEdges = true;
    g.add(cClip);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-diopter-gland-seals',
        54,
        '#0ea5e9',
        g,
        new THREE.Vector3(16.2, EVF_OPTICAL_Y, -15.6),
        new THREE.Vector3(48, 8, -22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E55. 240Hz MIPI-DSI Shielded FPC, Ferrite Bead EMI Filter & Cu Ground Foil
  // =========================================================================
  {
    const g = new THREE.Group();

    // Contoured Kapton core substrate peeking subtly around the silver-ink EMI shield jacket
    const flexShape = new THREE.Shape();
    flexShape.moveTo(-4.6, 5.75);
    flexShape.lineTo(4.6, 5.75);
    flexShape.lineTo(5.35, 4.4);
    flexShape.lineTo(5.35, -4.4);
    flexShape.lineTo(4.75, -5.75);
    flexShape.lineTo(-4.75, -5.75);
    flexShape.lineTo(-5.35, -4.4);
    flexShape.lineTo(-5.35, 4.4);
    flexShape.closePath();

    const coreFpc = new THREE.Mesh(
      extrudeHiRes(flexShape, 0.16, 0.02, 0.02, 1, 14),
      mats.polyimideFpc
    );
    g.add(coreFpc);

    // Impedance-matched 100Ω differential MIPI-DSI silver-ink hatched EMI shield laminate jacket
    const shieldGeo = extrudeHiRes(createRoundedRectShape(10.0, 10.6, 0.65), 0.28, 0.03, 0.03, 1, 14);
    applyPlanarUVs(shieldGeo, 10.0, 10.6, 'xy');
    const jacket = new THREE.Mesh(shieldGeo, mats.ultra.evfMipiShieldMesh);
    g.add(jacket);

    // 4x chamfered 0402 ferrite bead EMI chokes filtering 240Hz MIPI-DSI RF harmonics
    for (let i = -1.5; i <= 1.51; i += 1.0) {
      const fb = buildSmdPassive(1.55, 0.96, 0.68, mats.ferriteInductor, mats.silverElectrode, 'z');
      fb.position.set(i * 2.15, 3.85, 0.42);
      g.add(fb);
    }

    // 2x dual-lane differential Common-Mode Choke Coils (ferrite drum core + copper winding + 4 silver pads)
    for (const cx of [-2.4, 2.4]) {
      const cmcCore = new THREE.Mesh(
        createChamferedBoxGeo(2.4, 1.85, 0.78, 0.2, 0.06, 'z'),
        mats.ferriteInductor
      );
      cmcCore.position.set(cx, 1.35, 0.48);
      const cmcWinding = new THREE.Mesh(
        createChamferedBoxGeo(1.72, 1.35, 0.82, 0.14, 0.04, 'z'),
        mats.copperCoil
      );
      cmcWinding.position.set(cx, 1.35, 0.48);
      cmcWinding.userData.noEdges = true;
      g.add(cmcCore, cmcWinding);

      for (const px of [-0.95, 0.95]) {
        for (const py of [-0.62, 0.62]) {
          const pad = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.8), mats.silverElectrode);
          pad.position.set(cx + px, 1.35 + py, 0.46);
          pad.userData.noEdges = true;
          g.add(pad);
        }
      }
    }

    // Conductive C1020 electrolytic copper grounding foil strap with left/right chassis grounding eyelets!
    const cuShape = createRoundedRectShape(15.2, 2.75, 0.85);
    addCircleHoles(cuShape, [
      [-6.35, 0, 0.72],
      [6.35, 0, 0.72],
    ]);
    const cuGeo = extrudeHiRes(cuShape, 0.18, 0.02, 0.02, 1, 14);
    applyBoxUVs(cuGeo, 12);
    const cuFoil = new THREE.Mesh(cuGeo, mats.ultra.cfeCopperThermal);
    cuFoil.position.set(0, -2.95, 0.25);
    const cuDimples = buildSpotWeldNuggets(
      [
        [-3.6, -2.95, 0.36],
        [-1.2, -2.95, 0.36],
        [1.2, -2.95, 0.36],
        [3.6, -2.95, 0.36],
      ],
      0.34,
      'z',
      mats.copperHeatSpreader,
      mats.goldPlating
    );
    g.add(cuFoil, cuDimples);

    // Distal SUS304 stiffener + 20 crisp gold MIPI-DSI connector contact fingers at bottom end
    const botStiff = new THREE.Mesh(
      createChamferedBoxGeo(9.5, 1.65, 0.22, 0.2, 0.02, 'z'),
      mats.stainlessMachined
    );
    botStiff.position.set(0, -4.92, -0.2);
    g.add(botStiff);

    for (let i = 0; i < 20; i++) {
      const gf = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.45, 0.08), mats.goldPlating);
      gf.position.set(-4.18 + i * 0.44, -4.98, 0.18);
      gf.userData.noEdges = true;
      g.add(gf);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-mipi-ferrite-shield-fpc',
        55,
        '#6366f1',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 14.2, 7.65),
        new THREE.Vector3(24, -30, 62),
        cp,
        0.24
      )
    );
  }

  return parts;
}
