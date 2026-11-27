import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
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
import {
  addCopperTraceRuns,
  addEnigViaArray,
  addFlushPhillipsCapHead,
  addOpticalFiducial,
  addOrientedPhillipsScrew,
  addSilkscreenCourtyard,
  addSmdPassiveWithFillets,
  createDin6799EClipGeo,
  createKnurledCollarGeo,
  createSplitScarfRingGeo,
  createTrueWaveSpringGeo,
} from './evfDetailHelpers';

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

function createHiResRingCellGeo(
  innerR: number,
  outerR: number,
  depth: number,
  bevel = 0.05,
  segs = 44
): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const h = new THREE.Path();
  h.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(h);
  return extrudeHiRes(s, depth, bevel, bevel, 2, segs);
}

function createHiResRingCell(
  innerR: number,
  outerR: number,
  depth: number,
  mat: THREE.Material,
  bevel = 0.05,
  segs = 44
): THREE.Mesh {
  return new THREE.Mesh(createHiResRingCellGeo(innerR, outerR, depth, bevel, segs), mat);
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
 * Build a realistic ball-to-stitch φ20μm gold wirebond loop in the XY plane rising along -Z
 * (facing the EVF optical train) with hoisted ball pedestal & wedge stitch geometries.
 */
function addZWirebondLoop(
  parent: THREE.Group,
  start: THREE.Vector3,
  end: THREE.Vector3,
  apexZOffset: number,
  radius: number,
  mat: THREE.Material,
  ballGeo: THREE.BufferGeometry,
  stitchGeo: THREE.BufferGeometry
): void {
  const ball = new THREE.Mesh(ballGeo, mat);
  ball.position.copy(start);
  ball.userData.noEdges = true;

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
  const wire = new THREE.Mesh(markHiRes(new THREE.TubeGeometry(curve, 12, radius, 5, false)), mat);
  wire.userData.noEdges = true;

  const stitch = new THREE.Mesh(stitchGeo, mat);
  stitch.position.copy(end);
  stitch.userData.noEdges = true;
  parent.add(ball, wire, stitch);
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
 * Build 24 museum-grade ultra-detailed standalone-only EVF & Viewfinder Surroundings OEM/optical micro-parts (E32–E55).
 * Rendered ONLY in standalone 'evf' view; completely omitted in whole-camera views ('integrated', 'camera_body').
 */
export function buildEvfMicroParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // E32. Sony OEM FINDER COVER (89100) (Ref.113: A5038709A) Rear Trim & Labyrinth Frame
  //      World Z in [-34.86, -33.34] -> clears E02 (-35.6) & E25 rear EPDM seal (-33.14)!
  // =========================================================================
  {
    const g = new THREE.Group();

    const holeCoords: Array<[number, number]> = [
      [-13.4, 11.8],
      [13.4, 11.8],
      [-13.4, -9.4],
      [13.4, -9.4],
    ];
    const trimShape = createFrameShape(32.4, 27.8, 5.0, 24.8, 19.6, 3.6, 0, 1.4);
    const esCutout = new THREE.Path();
    esCutout.moveTo(-6.9, -12.75);
    esCutout.lineTo(6.9, -12.75);
    esCutout.lineTo(6.9, -9.25);
    esCutout.lineTo(-6.9, -9.25);
    esCutout.closePath();
    trimShape.holes.push(esCutout);
    addCircleHoles(
      trimShape,
      holeCoords.map(([x, y]) => [x, y, 1.12] as [number, number, number])
    );
    const trimGeo = extrudeHiRes(trimShape, 1.05, 0.1, 0.1, 3, 28);
    applyBoxUVs(trimGeo, 18);
    const trimMesh = new THREE.Mesh(trimGeo, mats.ultra.evfFinderCoverMold);
    g.add(trimMesh);

    // Sculpted satin bevel trim shoulder framing the inner eyepiece perimeter (strictly inside E39 corner holes!)
    const outerAccent = new THREE.Mesh(
      extrudeHiRes(createFrameShape(27.4, 21.8, 4.2, 26.4, 20.8, 3.9), 0.12, 0.02, 0.02, 1, 26),
      mats.titaniumRivet
    );
    outerAccent.position.set(0, 1.4, -0.52);
    outerAccent.userData.noEdges = true;
    g.add(outerAccent);

    // Chamfered inner satin eyepiece bezel collar step + stainless anti-wear rail guide strips
    const innerBezel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(25.8, 20.4, 3.9, 24.4, 19.2, 3.3), 0.36, 0.04, 0.04, 2, 26),
      mats.matteBlackAnodized
    );
    innerBezel.position.set(0, 1.4, -0.42);
    const innerHighlight = new THREE.Mesh(
      extrudeHiRes(createFrameShape(24.72, 19.52, 3.45, 24.38, 19.18, 3.3), 0.12, 0.015, 0.015, 1, 24),
      mats.stainlessMachined
    );
    innerHighlight.position.set(0, 1.4, -0.58);
    innerHighlight.userData.noEdges = true;
    g.add(innerBezel, innerHighlight);

    // Molded upper dust-baffle brow ribs & twin lateral eyecup slide-rail locator notches
    const railGuideGeo = createChamferedBoxGeo(0.56, 12.6, 0.18, 0.12, 0.02, 'z');
    for (const sx of [-13.65, 13.65]) {
      const rg = new THREE.Mesh(railGuideGeo, mats.matteBlackAnodized);
      rg.position.set(sx, 1.35, -0.58);
      g.add(rg);
    }

    // Lower recessed Eye-Sensor protective bezel pocket centered at world Y = 27.30 (local y = -11.0)!
    const esPocketGeo = extrudeHiRes(
      createFrameShape(17.4, 6.0, 1.4, 13.8, 3.5, 0.8),
      1.02,
      0.08,
      0.08,
      2,
      22
    );
    applyBoxUVs(esPocketGeo, 14);
    const esPocket = new THREE.Mesh(esPocketGeo, mats.ultra.evfFinderCoverMold);
    esPocket.position.set(0, -11.0, 0.04);
    g.add(esPocket);

    // Recessed glossy inner framing collar + subtle metallic optical trim around 940nm IR eye-sensor window
    const esTrimLip = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.8, 4.4, 1.0, 13.8, 3.5, 0.72), 0.32, 0.03, 0.03, 2, 18),
      mats.matteBlackAnodized
    );
    esTrimLip.position.set(0, -11.0, -0.44);
    const esRimAccent = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.2, 3.9, 0.85, 13.82, 3.52, 0.72), 0.1, 0.015, 0.015, 1, 16),
      mats.titaniumRivet
    );
    esRimAccent.position.set(0, -11.0, -0.58);
    esRimAccent.userData.noEdges = true;
    g.add(esTrimLip, esRimAccent);

    // 4 corner M1.7 Ref.207 perimeter screw-access counterbore pockets with brass compression sleeves!
    const bossGeo = createHiResRingCellGeo(1.12, 1.96, 0.52, 0.04, 22);
    const sleeveGeo = createHiResRingCellGeo(1.13, 1.54, 0.92, 0.025, 22);
    for (const [sx, sy] of holeCoords) {
      const boss = new THREE.Mesh(bossGeo, mats.matteBlackAnodized);
      boss.position.set(sx, sy, 0.32);
      const sleeve = new THREE.Mesh(sleeveGeo, mats.brassGear);
      sleeve.position.set(sx, sy, -0.08);
      g.add(boss, sleeve);
    }

    // 4 molded snap-hook retention latches with tapered catch barbs seated flush at rear perimeter
    const clipStemGeo = createChamferedBoxGeo(0.95, 2.0, 0.42, 0.1, 0.03, 'z');
    const clipBarbGeo = createChamferedBoxGeo(0.42, 1.55, 0.18, 0.05, 0.02, 'z');
    for (const [lx, ly] of [
      [-14.2, 7.6],
      [14.2, 7.6],
      [-14.2, -5.8],
      [14.2, -5.8],
    ] as Array<[number, number]>) {
      const clipStem = new THREE.Mesh(clipStemGeo, mats.mountPpsInsulator);
      clipStem.position.set(lx, ly, 0.56);
      const barb = new THREE.Mesh(clipBarbGeo, mats.titaniumRivet);
      barb.position.set(lx - Math.sign(lx) * 0.38, ly, 0.68);
      barb.userData.noEdges = true;
      g.add(clipStem, barb);
    }

    // Dual-tier stepped dust/water labyrinth perimeter seal lip on +Z rim (open bottom notch |X|<=7.4 clears E33!)
    const buildOpenBottomFrame = (
      ow: number,
      oh: number,
      iw: number,
      ih: number,
      notchHalfX: number
    ): THREE.Shape => {
      const s = new THREE.Shape();
      const ox = ow * 0.5;
      const oy = oh * 0.5;
      const ix = iw * 0.5;
      const iy = ih * 0.5;
      s.moveTo(-notchHalfX, -oy);
      s.lineTo(-ox + 2.2, -oy);
      s.quadraticCurveTo(-ox, -oy, -ox, -oy + 2.2);
      s.lineTo(-ox, oy - 2.2);
      s.quadraticCurveTo(-ox, oy, -ox + 2.2, oy);
      s.lineTo(ox - 2.2, oy);
      s.quadraticCurveTo(ox, oy, ox, oy - 2.2);
      s.lineTo(ox, -oy + 2.2);
      s.quadraticCurveTo(ox, -oy, ox - 2.2, -oy);
      s.lineTo(notchHalfX, -oy);
      s.lineTo(notchHalfX, -iy);
      s.lineTo(ix - 1.6, -iy);
      s.quadraticCurveTo(ix, -iy, ix, -iy + 1.6);
      s.lineTo(ix, iy - 1.6);
      s.quadraticCurveTo(ix, iy, ix - 1.6, iy);
      s.lineTo(-ix + 1.6, iy);
      s.quadraticCurveTo(-ix, iy, -ix, iy - 1.6);
      s.lineTo(-ix, -iy + 1.6);
      s.quadraticCurveTo(-ix, -iy, -ix + 1.6, -iy);
      s.lineTo(-notchHalfX, -iy);
      s.closePath();
      return s;
    };
    const labyrinth = new THREE.Mesh(
      extrudeHiRes(buildOpenBottomFrame(30.8, 26.0, 28.4, 23.6, 7.4), 0.2, 0.03, 0.03, 2, 24),
      mats.ultra.micRubberBootBlack
    );
    labyrinth.position.z = 0.62;
    const sealBead = new THREE.Mesh(
      extrudeHiRes(buildOpenBottomFrame(29.8, 25.0, 29.1, 24.3, 7.4), 0.12, 0.02, 0.02, 2, 22),
      mats.epdmGasket
    );
    sealBead.position.z = 0.74;
    sealBead.userData.noEdges = true;
    g.add(labyrinth, sealBead);

    // Molded >PC-GF20< recycling & cavity ID boss + ejector pin witness rings on inner +Z face
    const ejGeo = hiResTorus(0.5, 0.05, 6, 16);
    for (const [ex, ey] of [
      [-9.0, 12.2],
      [9.0, 12.2],
      [-14.6, 1.2],
      [14.6, 1.2],
      [-9.8, -11.6],
      [9.8, -11.6],
    ] as Array<[number, number]>) {
      const ej = new THREE.Mesh(ejGeo, mats.matteBlackAnodized);
      ej.position.set(ex, ey, 0.62);
      ej.userData.noEdges = true;
      g.add(ej);
    }

    // Precision top-center embossed Sony alignment arrow & mold datum ticks on -Z brow
    const tickGeo = new THREE.BoxGeometry(0.18, 0.52, 0.04);
    for (let i = -3; i <= 3; i++) {
      const tk = new THREE.Mesh(tickGeo, i === 0 ? mats.invarScaleBar : mats.matteBlackAnodized);
      tk.position.set(i * 1.4, 12.75, -0.58);
      tk.userData.noEdges = true;
      g.add(tk);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-finder-cover',
        32,
        '#334155',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 1.2, -34.1),
        new THREE.Vector3(0, -4, -58),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E33. Sony OEM EYE SENSOR WINDOW (850) (Ref.117: 501034401) IR-Pass Window & Optical Septum
  //      Seated cleanly inside E32 13.8x3.5 pocket!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Glossy deep-ruby-black 940nm IR-pass PMMA/acrylic window with crisp chamfered optical edge
    const winGlass = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(13.2, 3.05, 0.7), 0.5, 0.05, 0.05, 2, 24),
      mats.evfIrWindowBlack
    );
    winGlass.position.z = -0.34;
    // Wider rear adhesive flange shoulder on +Z cleanly behind E32 (-33.36) for waterproof bezel seating!
    const winFlange = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(14.6, 3.7, 0.85), 0.18, 0.02, 0.02, 2, 20),
      mats.evfIrWindowBlack
    );
    winFlange.position.z = 0.24;
    g.add(winGlass, winFlange);

    // Front anti-reflection perimeter stepped optical bezel mask + sub-surface TX/RX Fresnel lens visibility!
    const frontMask = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.05, 2.9, 0.65, 11.9, 2.05, 0.48), 0.06, 0.01, 0.01, 1, 20),
      mats.matteBlackAnodized
    );
    frontMask.position.z = -0.6;
    g.add(frontMask);

    // Subtle front-visible concentric optical collimating Fresnel rings & dark-ruby sensor apertures
    const fresnelRing1 = hiResTorus(0.86, 0.035, 8, 24);
    const fresnelRing2 = hiResTorus(0.52, 0.028, 8, 20);
    const apertureRim = hiResTorus(1.06, 0.045, 8, 24);
    for (const lx of [-3.4, 0.6]) {
      const aRim = new THREE.Mesh(apertureRim, mats.titaniumRivet);
      aRim.position.set(lx, 0, -0.605);
      aRim.userData.noEdges = true;
      const fr1 = new THREE.Mesh(fresnelRing1, mats.evfIrEmitter);
      fr1.position.set(lx, 0, -0.608);
      fr1.userData.noEdges = true;
      const fr2 = new THREE.Mesh(fresnelRing2, mats.evfGlassEdgeRim);
      fr2.position.set(lx, 0, -0.61);
      fr2.userData.noEdges = true;
      g.add(aRim, fr1, fr2);

      // Rear molded internal collimating 940nm IR condenser lenslet domes on inner +Z face
      const dome = new THREE.Mesh(
        hiResSphere(1.14, 22, 14, 0, Math.PI * 2, 0, Math.PI * 0.42).rotateX(Math.PI / 2),
        mats.evfIrWindowBlack
      );
      dome.scale.set(1.0, 1.0, 0.36);
      dome.position.set(lx, 0, 0.3);
      dome.userData.noEdges = true;

      const lensRing = new THREE.Mesh(hiResTorus(1.12, 0.055, 6, 22), mats.brassGear);
      lensRing.position.set(lx, 0, 0.35);
      lensRing.userData.noEdges = true;
      g.add(dome, lensRing);
    }

    // Rightmost V(lambda) ambient optical collector window bezel visible on front face + rear facet
    const alsFrontRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(1.92, 1.72, 0.25, 1.56, 1.36, 0.16), 0.05, 0.01, 0.01, 1, 12),
      mats.titaniumRivet
    );
    alsFrontRim.position.set(4.6, 0, -0.605);
    alsFrontRim.userData.noEdges = true;
    const alsGlassTint = new THREE.Mesh(
      createChamferedBoxGeo(1.5, 1.3, 0.04, 0.14, 0.008, 'z'),
      mats.fluorineCoatCyan
    );
    alsGlassTint.position.set(4.6, 0, -0.61);
    alsGlassTint.userData.noEdges = true;
    const alsWindow = new THREE.Mesh(
      createChamferedBoxGeo(2.0, 2.0, 0.16, 0.3, 0.02, 'z'),
      mats.evfIrWindowBlack
    );
    alsWindow.position.set(4.6, 0, 0.36);
    alsWindow.userData.noEdges = true;
    g.add(alsFrontRim, alsGlassTint, alsWindow);

    // Front-visible subtle optical crosstalk divider bars between TX / RX / ALS chambers
    const divFrontGeo = new THREE.BoxGeometry(0.28, 2.15, 0.05);
    for (const dx of [-1.4, 2.85]) {
      const df = new THREE.Mesh(divFrontGeo, mats.velvetFlockTrap);
      df.position.set(dx, 0, -0.605);
      df.userData.noEdges = true;
      g.add(df);
    }

    // Critical two-shot molded opaque matte-black Optical Isolation Septum wall (eliminates IR crosstalk!)
    const septumMain = new THREE.Mesh(
      createChamferedBoxGeo(0.72, 3.2, 0.44, 0.06, 0.02, 'z'),
      mats.velvetFlockTrap
    );
    septumMain.position.set(-1.4, 0, 0.5);
    const septumFlange = new THREE.Mesh(new THREE.BoxGeometry(1.3, 3.4, 0.14), mats.velvetFlockTrap);
    septumFlange.position.set(-1.4, 0, 0.36);
    const sep2 = new THREE.Mesh(
      createChamferedBoxGeo(0.56, 3.0, 0.38, 0.06, 0.02, 'z'),
      mats.matteBlackAnodized
    );
    sep2.position.set(2.85, 0, 0.48);
    g.add(septumMain, septumFlange, sep2);

    // Perimeter black double-sided waterproof acrylic PSA bonding tape rim + 2 molded rear alignment pins
    const psaRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.4, 3.65, 0.8, 13.4, 3.05, 0.65), 0.1, 0.015, 0.015, 1, 18),
      mats.epdmGasket
    );
    psaRim.position.z = 0.36;
    psaRim.userData.noEdges = true;
    const locPinGeo = hiResCyl(0.24, 0.2, 0.34, 12).rotateX(Math.PI / 2);
    for (const px of [-6.35, 6.35]) {
      const lp = new THREE.Mesh(locPinGeo, mats.matteBlackAnodized);
      lp.position.set(px, 0, 0.46);
      lp.userData.noEdges = true;
      g.add(lp);
    }
    g.add(psaRim);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-eye-sensor-window',
        33,
        '#be123c',
        g,
        new THREE.Vector3(0, 27.3, -33.42),
        new THREE.Vector3(0, -24, -46),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E34. Sony OEM EYE SENSOR WP/RET Cushions (Ref.114/118), ES GND Sheet (Ref.115) & ES-1008 Flex
  //      World Z in [-32.48, -31.52], Y max=29.15 < E03!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front Waterproof Compression Cushion Ring (Ref.118: 501034501)
    const wpShape = createRoundedRectShape(14.6, 3.6, 0.9);
    const hLeft = new THREE.Path();
    hLeft.absellipse(-3.4, 0, 1.5, 0.95, 0, Math.PI * 2, true, 0);
    const hRight = new THREE.Path();
    hRight.absellipse(2.35, 0, 2.9, 0.95, 0, Math.PI * 2, true, 0);
    wpShape.holes.push(hLeft, hRight);
    const wpGeo = extrudeHiRes(wpShape, 0.32, 0.03, 0.03, 2, 20);
    applyBoxUVs(wpGeo, 10);
    const wpCush = new THREE.Mesh(wpGeo, mats.ultra.micRubberBootBlack);
    wpCush.position.z = -0.3;
    g.add(wpCush);

    // Molded raised dual-lip waterproof perimeter compression bead & optical aperture seal collars on front (-Z)
    const outerBead = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.1, 3.15, 0.72, 13.65, 2.7, 0.56), 0.08, 0.015, 0.015, 1, 20),
      mats.epdmGasket
    );
    outerBead.position.z = -0.46;
    outerBead.userData.noEdges = true;
    const txSealCollar = createHiResRingCell(1.48, 1.72, 0.14, mats.epdmGasket, 0.018, 22);
    txSealCollar.scale.set(1.0, 0.68, 1.0);
    txSealCollar.position.set(-3.4, 0, -0.44);
    const rxSealCollar = createHiResRingCell(2.85, 3.1, 0.14, mats.epdmGasket, 0.018, 24);
    rxSealCollar.scale.set(1.0, 0.36, 1.0);
    rxSealCollar.position.set(2.35, 0, -0.44);
    const baffleBar = new THREE.Mesh(
      createChamferedBoxGeo(0.56, 2.35, 0.14, 0.08, 0.015, 'z'),
      mats.velvetFlockTrap
    );
    baffleBar.position.set(-1.38, 0, -0.44);
    g.add(outerBead, txSealCollar, rxSealCollar, baffleBar);

    // Rear High-Resilience PORON Retention Foam Pad (Ref.114: 501142001) + brass alignment eyelets
    const retShape = createRoundedRectShape(14.8, 3.55, 0.85);
    addCircleHoles(retShape, [
      [-6.2, 0, 0.48],
      [6.2, 0, 0.48],
    ]);
    const retCush = new THREE.Mesh(
      extrudeHiRes(retShape, 0.32, 0.03, 0.03, 2, 18),
      mats.butylDamperRubber
    );
    retCush.position.z = 0.08;
    const eyeGeo = createHiResRingCellGeo(0.46, 0.72, 0.36, 0.02, 16);
    for (const ex of [-6.2, 6.2]) {
      const eyelet = new THREE.Mesh(eyeGeo, mats.brassGear);
      eyelet.position.set(ex, 0, 0.08);
      g.add(eyelet);
    }
    g.add(retCush);

    // Conductive Woven Ni/Cu EMI/ESD Ground Sheet (Ref.115: 502997201) with copper ground bridge & spot welds
    const gndSheet = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(15.0, 3.5, 0.5), 0.14, 0.015, 0.015, 1, 14),
      mats.conductiveNiCuFoam
    );
    gndSheet.position.z = 0.38;
    const gndEar = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 1.75, 0.14, 0.25, 0.02, 'z'),
      mats.conductiveNiCuFoam
    );
    gndEar.position.set(8.4, 0.2, 0.38);
    const cuGndStrip = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 1.25, 0.06, 0.12, 0.01, 'z'),
      mats.copperHeatSpreader
    );
    cuGndStrip.position.set(8.4, 0.2, 0.46);
    const gndDimples = buildSpotWeldNuggets(
      [
        [7.95, 0.2, 0.5],
        [8.85, 0.2, 0.5],
      ],
      0.24,
      'z',
      mats.stainlessMachined,
      mats.goldPlating
    );
    g.add(gndSheet, gndEar, cuGndStrip, gndDimples);

    // Contoured Sony OEM ES-1008 Polyimide Flex Ribbon routing cleanly along -X side!
    const esFlex = createFlatRibbonAlongCurve(
      [
        new THREE.Vector3(-7.4, 0.0, 0.2),
        new THREE.Vector3(-9.6, 0.0, 0.25),
        new THREE.Vector3(-11.8, 0.0, 0.2),
      ],
      2.8,
      0.18,
      new THREE.Vector3(0, 1, 0),
      mats.ultra.evfOemFlexRibbon,
      14
    );
    g.add(esFlex);

    // Routed differential copper I2C/ToF traces + ENIG test vias on ES-1008 flex
    const esTraces: Array<[number, number, number, number]> = [];
    for (let i = 0; i < 6; i++) {
      const ty = -0.95 + i * 0.38;
      esTraces.push([-7.5, ty, -10.65, ty]);
    }
    addCopperTraceRuns(g, esTraces, 0.08, 0.024, 0.11, mats.copperHeatSpreader);
    addEnigViaArray(
      g,
      [
        [-7.85, -1.05],
        [-7.85, 1.05],
        [-9.75, -1.05],
        [-9.75, 1.05],
      ],
      0.11,
      0.04,
      0.14,
      0.06,
      mats.goldPlating,
      mats.velvetFlockTrap
    );

    // 4x miniature 0201 SMD decoupling capacitors / pull-up resistors with bright solder fillets on ES-1008
    for (let i = 0; i < 4; i++) {
      addSmdPassiveWithFillets(
        g,
        0.66,
        0.36,
        0.25,
        -8.65,
        -0.96 + i * 0.64,
        0.02,
        i % 2 === 0 ? mats.smdCeramic : mats.icEpoxy,
        mats.silverElectrode,
        mats.solderBallSilver
      );
    }

    // SUS304 stainless ZIF stiffener backing + chamfered pull-ears + 10 crisp gold ZIF contact fingers
    const esStiff = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 2.9, 0.16, 0.2, 0.02, 'z'),
      mats.stainlessMachined
    );
    esStiff.position.set(-11.2, 0.0, 0.32);
    g.add(esStiff);

    const fingerGeo = new THREE.BoxGeometry(1.15, 0.17, 0.055);
    for (let i = 0; i < 10; i++) {
      const pin = new THREE.Mesh(fingerGeo, mats.goldPlating);
      pin.position.set(-11.3, -1.12 + i * 0.248, 0.085);
      pin.userData.noEdges = true;
      g.add(pin);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-eye-sensor-cushions',
        34,
        '#f97316',
        g,
        new THREE.Vector3(0, 27.3, -32.02),
        new THREE.Vector3(-18, -32, -38),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E35. Sony OEM VF SHEET, RADIATION (795) (Ref.203: 457578001) & VF Flexible Adhesive (Ref.202)
  //      Flush 0.06mm on E17 front fin crowns (+14.04), pos z=+14.34 -> world [+14.10, +14.83]
  // =========================================================================
  {
    const g = new THREE.Group();

    const holeCoords: Array<[number, number]> = [
      [-9.6, 6.8],
      [9.6, -6.6],
    ];
    const radShape = new THREE.Shape();
    const hw = 11.9;
    const hh = 9.0;
    const cr = 1.4;
    radShape.moveTo(-hw + cr, -hh);
    radShape.lineTo(hw - cr, -hh);
    radShape.absarc(hw - cr, -hh + cr, cr, -Math.PI / 2, 0, false);
    radShape.lineTo(hw, hh - 2.6);
    radShape.lineTo(hw - 2.6, hh);
    radShape.lineTo(-hw + cr, hh);
    radShape.absarc(-hw + cr, hh - cr, cr, Math.PI / 2, Math.PI, false);
    radShape.lineTo(-hw, -hh + cr);
    radShape.absarc(-hw + cr, -hh + cr, cr, Math.PI, Math.PI * 1.5, false);
    addCircleHoles(
      radShape,
      holeCoords.map(([x, y]) => [x, y, 0.72] as [number, number, number])
    );

    const radGeo = extrudeHiRes(radShape, 0.4, 0.04, 0.04, 2, 18);
    applyPlanarUVs(radGeo, 23.8, 18.0, 'xy');
    const radSheet = new THREE.Mesh(radGeo, mats.ultra.evfVfRadiationSheet);
    g.add(radSheet);

    // Multi-layer graphite + electrolytic copper foil heat-spreader stepped laminate core!
    const graphiteLayer = new THREE.Mesh(
      createChamferedBoxGeo(21.4, 15.6, 0.08, 1.0, 0.015, 'z'),
      mats.matteBlackAnodized
    );
    graphiteLayer.position.z = 0.22;
    const cuFoilGrid = new THREE.Mesh(
      createChamferedBoxGeo(19.6, 13.8, 0.06, 0.8, 0.012, 'z'),
      mats.copperHeatSpreader
    );
    cuFoilGrid.position.z = 0.27;
    g.add(graphiteLayer, cuFoilGrid);

    // Embossed thermal expansion relief grid channels across copper-graphite laminate face
    const hCreaseGeo = new THREE.BoxGeometry(19.0, 0.14, 0.04);
    const vCreaseGeo = new THREE.BoxGeometry(0.14, 13.2, 0.04);
    for (let j = -2; j <= 2; j++) {
      const hc = new THREE.Mesh(hCreaseGeo, mats.matteBlackAnodized);
      hc.position.set(0, j * 2.6, 0.305);
      hc.userData.noEdges = true;
      g.add(hc);
    }
    for (let i = -3; i <= 3; i++) {
      const vc = new THREE.Mesh(vCreaseGeo, mats.matteBlackAnodized);
      vc.position.set(i * 2.8, 0, 0.305);
      vc.userData.noEdges = true;
      g.add(vc);
    }

    // Iconic Sony 4-575-780-01 coral-pink silicone compression thermal border stripe along lower edge
    const pinkLip = new THREE.Mesh(
      createChamferedBoxGeo(22.2, 2.35, 0.44, 0.45, 0.035, 'z'),
      mats.thermalPadPink
    );
    pinkLip.position.set(0, -7.55, 0);
    pinkLip.userData.noEdges = true;
    g.add(pinkLip);

    // Precision brass locating eyelet collars framing both die-cut datum holes
    const eyeletGeo = createHiResRingCellGeo(0.7, 1.24, 0.48, 0.025, 20);
    for (const [hx, hy] of holeCoords) {
      const eye = new THREE.Mesh(eyeletGeo, mats.brassGear);
      eye.position.set(hx, hy, 0.02);
      g.add(eye);
    }

    // Narrow double-sided silicone perimeter thermal-transfer bonding frame
    const bondBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(21.2, 15.4, 1.0, 19.8, 14.0, 0.7), 0.1, 0.012, 0.012, 1, 14),
      mats.thermalTransferTape
    );
    bondBorder.position.z = 0.31;
    bondBorder.userData.noEdges = true;
    g.add(bondBorder);

    // Translucent Mylar/PET anti-adhesion VF Flexible Adhesive cover film (Ref.202) + die-cut peel ear + kiss-cut line!
    const filmShape = new THREE.Shape();
    filmShape.moveTo(-10.7, -7.8);
    filmShape.lineTo(10.7, -7.8);
    filmShape.lineTo(10.7, 5.2);
    filmShape.lineTo(12.6, 5.8);
    filmShape.lineTo(12.6, 7.6);
    filmShape.lineTo(10.7, 7.8);
    filmShape.lineTo(-10.7, 7.8);
    filmShape.closePath();
    const adhFilm = new THREE.Mesh(
      extrudeHiRes(filmShape, 0.11, 0.015, 0.015, 1, 12),
      mats.mylarInsulatorFilm
    );
    adhFilm.position.z = 0.4;
    g.add(adhFilm);

    // Diagonal kiss-cut release-liner crease & peel-tab orientation arrow + Sony 4-575-780-01 stencil bars
    const kissLine = new THREE.Mesh(new THREE.BoxGeometry(16.2, 0.12, 0.024), mats.invarScaleBar);
    kissLine.position.set(2.0, -0.5, 0.475);
    kissLine.rotation.z = 0.58;
    kissLine.userData.noEdges = true;
    const peelArrow = new THREE.Mesh(
      createChamferedBoxGeo(1.1, 0.55, 0.04, 0.08, 0.01, 'z'),
      mats.mountRedIndexDot
    );
    peelArrow.position.set(11.65, 6.7, 0.47);
    peelArrow.userData.noEdges = true;
    g.add(kissLine, peelArrow);

    const stencilGeo = new THREE.BoxGeometry(0.42, 0.18, 0.024);
    for (let i = 0; i < 8; i++) {
      const st = new THREE.Mesh(stencilGeo, mats.invarScaleBar);
      st.position.set(-7.8 + i * 0.72, 6.95, 0.475);
      st.userData.noEdges = true;
      g.add(st);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-vf-radiation-sheet',
        35,
        '#38bdf8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 14.34),
        new THREE.Vector3(0, 8, 84),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E36. Sony OEM EVF PROTECTOR (89100) (Ref.303: 502790801) Top-Hump Shield Arch
  //      Mirrored to wrap solid -X right shoulder, seated FLUSH at Y=53.42, Z in [-25.0, 0.0]!
  // =========================================================================
  {
    const g = new THREE.Group();

    const archShape = new THREE.Shape();
    archShape.moveTo(11.1, -0.35);
    archShape.lineTo(10.6, -0.74);
    archShape.lineTo(8.9, 0.05);
    archShape.lineTo(4.6, 0.72);
    archShape.lineTo(-4.6, 0.72);
    archShape.lineTo(-13.8, -1.42);
    archShape.lineTo(-15.32, -2.55);
    archShape.lineTo(-15.78, -2.25);
    archShape.lineTo(-14.25, -0.95);
    archShape.lineTo(-4.8, 1.18);
    archShape.lineTo(4.8, 1.18);
    archShape.lineTo(9.1, 0.45);
    archShape.closePath();

    const archGeo = extrudeHiRes(archShape, 24.8, 0.06, 0.06, 2, 18);
    applyBoxUVs(archGeo, 18);
    const arch = new THREE.Mesh(archGeo, mats.ultra.evfTconEmiCan);
    g.add(arch);

    // High-contrast stamped titanium/stainless embossed longitudinal stiffening swage ribs along crown
    const ribGeo = createChamferedBoxGeo(0.88, 0.14, 21.4, 0.25, 0.03, 'y');
    for (const rx of [-3.6, 0, 3.6]) {
      const rib = new THREE.Mesh(ribGeo, mats.titaniumRivet);
      rib.position.set(rx, 1.24, 0);
      rib.userData.noEdges = true;
      g.add(rib);
    }
    // Front & rear rolled hem edge trim bars giving strong contrast on bright studio backgrounds
    const hemGeo = createChamferedBoxGeo(9.6, 0.12, 0.55, 0.12, 0.02, 'y');
    for (const hz of [-12.0, 12.0]) {
      const hem = new THREE.Mesh(hemGeo, mats.matteBlackAnodized);
      hem.position.set(0, 1.22, hz);
      hem.userData.noEdges = true;
      g.add(hem);
    }

    // Dual rows of stamped micro thermal-vent louver slots & dark heat-escape recesses along crown shoulders
    const louverGeo = createChamferedBoxGeo(1.05, 0.08, 0.52, 0.1, 0.015, 'y');
    for (const sx of [-4.2, 4.2]) {
      for (let i = 0; i < 8; i++) {
        const lv = new THREE.Mesh(louverGeo, mats.matteBlackAnodized);
        lv.position.set(sx, 1.22, -9.4 + i * 2.68);
        lv.userData.noEdges = true;
        g.add(lv);
      }
    }

    // Electrolytic copper EMI grounding tape strips wrapping across solid -X sloped shoulder (clear of E100!)
    const tapeGeo = createChamferedBoxGeo(3.0, 0.07, 2.4, 0.12, 0.012, 'y');
    for (const tz of [-9.4, 9.4]) {
      const rTape = new THREE.Mesh(tapeGeo, mats.copperHeatSpreader);
      rTape.position.set(-8.6, 0.36, tz);
      rTape.rotation.z = 0.225;
      rTape.userData.noEdges = true;
      g.add(rTape);
    }

    // Right (-X) stepped horizontal mounting flange ears tucked flush against E18 shoulder
    const earShape = createRoundedRectShape(2.0, 4.0, 0.65);
    addCircleHoles(earShape, [[0, 0, 0.72]]);
    const earGeo = extrudeHiRes(earShape, 0.42, 0.04, 0.04, 2, 14).rotateX(Math.PI / 2);
    const earBushGeo = createHiResRingCellGeo(0.72, 1.06, 0.46, 0.025, 18).rotateX(Math.PI / 2);
    for (const ez of [-9.2, 9.2]) {
      const ear = new THREE.Mesh(earGeo, mats.stainlessMachined);
      ear.position.set(-15.95, -2.05, ez);
      const bush = new THREE.Mesh(earBushGeo, mats.brassGear);
      bush.position.set(-15.95, -2.05, ez);
      g.add(ear, bush);
    }

    // Stamped Faraday grounding dimple rows along crown shoulders (gold contact spots!)
    const dimplePos: Array<[number, number, number]> = [];
    for (const sx of [-1, 1]) {
      for (const dz of [-9.6, -4.8, 0, 4.8, 9.6]) {
        dimplePos.push([sx * 4.55, 1.22, dz]);
      }
    }
    g.add(buildSpotWeldNuggets(dimplePos, 0.26, 'y', mats.beCuSpring, mats.goldPlating));

    // Top-side die-cut flame-retardant dielectric Mylar/Kapton sheet under hot-shoe fix plate (world Y in [54.68, 54.84]!)
    const insHoles: Array<[number, number]> = [
      [-6.8, -4.5],
      [6.8, -4.5],
      [-6.8, 5.5],
      [6.8, 5.5],
    ];
    const insShape = createRoundedRectShape(16.2, 16.8, 1.2);
    addCircleHoles(
      insShape,
      insHoles.map(([x, y]) => [x, y, 1.15] as [number, number, number])
    );
    const insPad = new THREE.Mesh(
      extrudeHiRes(insShape, 0.13, 0.015, 0.015, 1, 16).rotateX(Math.PI / 2),
      mats.mylarInsulatorFilm
    );
    insPad.position.set(0, 1.35, 1.8);
    g.add(insPad);

    // Crisp gold-copper grounding perimeter trace + hole rings printed on dielectric isolator patch
    const insRingGeo = createHiResRingCellGeo(1.12, 1.48, 0.05, 0.01, 18).rotateX(Math.PI / 2);
    for (const [hx, hz] of insHoles) {
      const ir = new THREE.Mesh(insRingGeo, mats.copperHeatSpreader);
      ir.position.set(hx, 1.425, 1.8 + hz);
      ir.userData.noEdges = true;
      g.add(ir);
    }
    const insBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.4, 16.0, 1.0, 14.8, 15.4, 0.8), 0.04, 0.008, 0.008, 1, 14).rotateX(
        Math.PI / 2
      ),
      mats.matteBlackAnodized
    );
    insBorder.position.set(0, 1.425, 1.8);
    insBorder.userData.noEdges = true;
    g.add(insBorder);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-evf-protector',
        36,
        '#94a3b8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 13.92, -12.6),
        new THREE.Vector3(0, 44, 4),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E37. Sony OEM DIOPTER COVER WP SHEET B (Ref.301) & CV DIOPTER ADJUST DIAL (Ref.2)
  //      Mirrored to true Sony -X (right) side with Phillips #0 screw facing OUTWARD -X!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Inner die-cut elastomeric waterproof sliding seal sheet (world X in [-18.70, -18.46], clear of E54 & E31!)
    const wpHoleCoords: Array<[number, number]> = [
      [-2.5, 2.5],
      [2.5, -2.5],
    ];
    const wpShape = createFrameShape(7.2, 7.2, 1.8, 2.2, 2.2, 1.05);
    addCircleHoles(
      wpShape,
      wpHoleCoords.map(([x, y]) => [x, y, 0.42] as [number, number, number])
    );
    const wpGeo = extrudeHiRes(wpShape, 0.2, 0.02, 0.02, 2, 22).rotateY(Math.PI / 2);
    applyBoxUVs(wpGeo, 10);
    const wpSheet = new THREE.Mesh(wpGeo, mats.ultra.micRubberBootBlack);
    wpSheet.position.x = 2.32;
    g.add(wpSheet);

    // Molded concentric rotary waterproof lip-seal bellows rings + brass locating eyelets on inner WP sheet
    for (const [r, dx] of [
      [2.15, 2.22],
      [2.78, 2.22],
    ] as Array<[number, number]>) {
      const bead = new THREE.Mesh(hiResTorus(r, 0.06, 8, 32).rotateY(Math.PI / 2), mats.epdmGasket);
      bead.position.x = dx;
      bead.userData.noEdges = true;
      g.add(bead);
    }
    const wpEyeGeo = createHiResRingCellGeo(0.4, 0.72, 0.24, 0.02, 16).rotateY(Math.PI / 2);
    for (const [hy, hz] of wpHoleCoords) {
      const eye = new THREE.Mesh(wpEyeGeo, mats.brassGear);
      eye.position.set(2.32, hy, -hz);
      g.add(eye);
    }

    // White low-friction PTFE rotary inner collar ring with grease retention grooves
    const ptfeCollar = createHiResRingCell(1.06, 1.68, 0.22, mats.lcdDiffuserMatte, 0.02, 28);
    ptfeCollar.rotation.y = Math.PI / 2;
    ptfeCollar.position.x = 2.32;
    ptfeCollar.userData.noEdges = true;
    const brassThrust = createHiResRingCell(1.07, 1.44, 0.07, mats.brassGear, 0.012, 24);
    brassThrust.rotation.y = Math.PI / 2;
    brassThrust.position.x = 2.23;
    brassThrust.userData.noEdges = true;
    g.add(ptfeCollar, brassThrust);

    // Outer sculpted CV DIOPTER ADJUST DIAL cap (Ref.2: 500367201) seated flush at world X in [-23.91, -23.25]!
    const capPts: THREE.Vector2[] = [
      new THREE.Vector2(0.02, -0.3),
      new THREE.Vector2(3.35, -0.3),
      new THREE.Vector2(3.92, -0.22),
      new THREE.Vector2(3.96, 0.14),
      new THREE.Vector2(3.82, 0.32),
      new THREE.Vector2(3.42, 0.36),
      new THREE.Vector2(0.02, 0.36),
    ];
    const capBodyGeo = markHiRes(new THREE.LatheGeometry(capPts, 44));
    capBodyGeo.rotateZ(Math.PI / 2);
    capBodyGeo.computeVertexNormals();
    const capBody = new THREE.Mesh(capBodyGeo, mats.matteBlackAnodized);
    capBody.position.x = -2.65;
    g.add(capBody);

    // CNC straight-knurled tactical grip rim wrapping around outer perimeter of diopter dial cap!
    const knurlBand = new THREE.Mesh(
      createKnurledCollarGeo(3.62, 3.88, 4.02, 0.36, 36).rotateY(Math.PI / 2),
      mats.titaniumRivet
    );
    knurlBand.position.x = -2.61;
    knurlBand.userData.noEdges = true;
    g.add(knurlBand);

    // Laser-engraved circular brushed cap face mapped with evfDiopterDialCap (- / 0 / + scale facing -X!)
    const faceDiskGeo = markHiRes(new THREE.CircleGeometry(3.56, 44));
    applyPlanarUVs(faceDiskGeo, 7.12, 7.12, 'xy');
    faceDiskGeo.rotateY(-Math.PI / 2);
    const faceDisk = new THREE.Mesh(faceDiskGeo, mats.ultra.evfDiopterDialCap);
    faceDisk.position.x = -3.03;
    faceDisk.userData.noEdges = true;
    g.add(faceDisk);

    // Precision machined stainless perimeter bezel ring + crisp engraved radial - / 0 / + scale ticks & red 0D dot!
    const capRing = new THREE.Mesh(
      hiResTorus(3.74, 0.14, 10, 40).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    capRing.position.x = -2.95;
    g.add(capRing);

    const dialTickGeo = new THREE.BoxGeometry(0.04, 0.44, 0.1);
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      const tk = new THREE.Mesh(dialTickGeo, i === 0 ? mats.mountRedIndexDot : mats.invarScaleBar);
      tk.position.set(-3.05, Math.cos(a) * 2.82, Math.sin(a) * 2.82);
      tk.rotation.x = a;
      tk.userData.noEdges = true;
      g.add(tk);
    }

    // Properly oriented Sony central Phillips #0 service screw (head & crisp dark '+' cross facing OUTWARD -X!)
    const screwPocket = createHiResRingCell(0.84, 1.18, 0.14, mats.titaniumRivet, 0.02, 24);
    screwPocket.rotation.y = Math.PI / 2;
    screwPocket.position.x = -2.99;
    g.add(screwPocket);

    addFlushPhillipsCapHead(
      g,
      [-2.97, 0, 0],
      '-x',
      0.84,
      0.24,
      mats.stainlessMachined,
      mats.velvetFlockTrap,
      mats.brassGear
    );

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-diopter-wp-sheet',
        37,
        '#475569',
        g,
        new THREE.Vector3(-20.9, EVF_OPTICAL_Y, -15.6),
        new THREE.Vector3(-52, -16, -26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E38. Sony OEM JK-1028 Flexible Relay Board (Ref.206) & JK HOLDER (Ref.205)
  //      Mounted FLUSH against solid -X front magnesium wall of E18 (X=-15.0)!
  // =========================================================================
  {
    const g = new THREE.Group();

    const holderProfile = new THREE.Shape();
    holderProfile.moveTo(-1.2, -5.2);
    holderProfile.lineTo(1.2, -5.2);
    holderProfile.lineTo(1.2, 5.2);
    holderProfile.lineTo(-0.45, 5.2);
    holderProfile.quadraticCurveTo(-1.35, 2.5, -1.35, 0.0);
    holderProfile.quadraticCurveTo(-1.35, -2.8, -1.2, -5.2);
    const holder = new THREE.Mesh(
      extrudeHiRes(holderProfile, 7.6, 0.08, 0.08, 2, 18),
      mats.mountPpsInsulator
    );
    g.add(holder);

    // Molded exterior structural stiffening ribs + top/bottom cable anti-chafe chamfer guides on PPS holder
    const sideRibGeo = createChamferedBoxGeo(0.16, 9.2, 0.42, 0.04, 0.015, 'z');
    for (const sz of [-3.1, -1.55, 1.55, 3.1]) {
      const sr = new THREE.Mesh(sideRibGeo, mats.matteBlackAnodized);
      sr.position.set(1.24, 0, sz);
      sr.userData.noEdges = true;
      g.add(sr);
    }
    const endLipGeo = createChamferedBoxGeo(2.2, 0.56, 7.4, 0.14, 0.03, 'z');
    for (const sy of [-4.98, 4.98]) {
      const el = new THREE.Mesh(endLipGeo, mats.titaniumRivet);
      el.position.set(0.05, sy, 0);
      g.add(el);
    }

    // Twin bridged pinch-prevention retention straps with molded snap-lock hooks spanning JK-1028 flex channel
    const bridgeGeo = createChamferedBoxGeo(0.28, 1.12, 5.6, 0.1, 0.03, 'z');
    const postGeo = createChamferedBoxGeo(0.7, 1.12, 0.48, 0.06, 0.02, 'z');
    const latchClipGeo = createChamferedBoxGeo(0.16, 0.65, 1.25, 0.04, 0.015, 'z');
    for (const cy of [-2.8, 2.6]) {
      const bridge = new THREE.Mesh(bridgeGeo, mats.matteBlackAnodized);
      bridge.position.set(-1.92, cy, 0);
      const clasp = new THREE.Mesh(latchClipGeo, mats.stainlessMachined);
      clasp.position.set(-2.08, cy, 0);
      clasp.userData.noEdges = true;
      g.add(bridge, clasp);
      for (const sz of [-2.6, 2.6]) {
        const post = new THREE.Mesh(postGeo, mats.matteBlackAnodized);
        post.position.set(-1.54, cy, sz);
        post.userData.noEdges = true;
        g.add(post);
      }
    }

    // Flush-seated lateral mounting screw boss with CNC knurled brass heat-set threaded insert (clears E18 X=-15.08!)
    const bossPlate = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(2.6, 3.4, 0.78), 0.44, 0.04, 0.04, 2, 16).rotateY(Math.PI / 2),
      mats.mountPpsInsulator
    );
    bossPlate.position.set(0.62, 1.6, -1.6);
    const bossKnurl = new THREE.Mesh(
      createKnurledCollarGeo(0.56, 0.94, 1.06, 0.48, 18).rotateY(Math.PI / 2),
      mats.brassGear
    );
    bossKnurl.position.set(0.62, 1.6, -1.6);
    const bossRim = createHiResRingCell(0.56, 1.14, 0.12, mats.goldPlating, 0.02, 20);
    bossRim.rotation.y = Math.PI / 2;
    bossRim.position.set(0.84, 1.6, -1.6);
    g.add(bossPlate, bossKnurl, bossRim);

    const threadRingGeo = hiResTorus(0.57, 0.04, 6, 16).rotateY(Math.PI / 2);
    for (const tx of [0.46, 0.62, 0.78]) {
      const tr = new THREE.Mesh(threadRingGeo, mats.copperHeatSpreader);
      tr.position.set(tx, 1.6, -1.6);
      tr.userData.noEdges = true;
      g.add(tr);
    }

    // True flat-ribbon extruded amber Kapton JK-1028 Flex hugging outer -X R-guide!
    const flexRibbon = createFlatRibbonAlongCurve(
      [
        new THREE.Vector3(-1.25, 4.9, 0.0),
        new THREE.Vector3(-1.58, 1.8, 0.0),
        new THREE.Vector3(-1.58, -2.2, 0.0),
        new THREE.Vector3(-1.46, -5.0, 0.4),
        new THREE.Vector3(-0.92, -6.2, 1.1),
      ],
      4.0,
      0.2,
      new THREE.Vector3(0, 0, 1),
      mats.ultra.evfOemFlexRibbon,
      24
    );
    g.add(flexRibbon);

    // Parallel routed copper relay signal bus strips + gold test pads along JK-1028 flex outer face
    const flexTraceGeo = new THREE.BoxGeometry(0.036, 4.2, 0.11);
    for (let i = 0; i < 8; i++) {
      const tr = new THREE.Mesh(flexTraceGeo, mats.copperHeatSpreader);
      tr.position.set(-1.7, -0.1, -1.4 + i * 0.4);
      tr.userData.noEdges = true;
      g.add(tr);
    }

    // 4x miniature 0201 SMD EMI filter passives with bright solder fillets between the two bridge straps
    for (let i = 0; i < 4; i++) {
      const smdGrp = new THREE.Group();
      addSmdPassiveWithFillets(
        smdGrp,
        0.62,
        0.34,
        0.24,
        0,
        0,
        0,
        i % 2 === 0 ? mats.smdCeramic : mats.ferriteInductor,
        mats.silverElectrode,
        mats.solderBallSilver
      );
      smdGrp.rotation.y = -Math.PI / 2;
      smdGrp.position.set(-1.78, 1.0 - i * 0.72, -1.0 + i * 0.66);
      g.add(smdGrp);
    }

    // Upper & lower SUS304 ZIF stiffeners + 14 crisp gold ZIF fingers at lower board-to-board tip
    const botStiff = new THREE.Mesh(
      createChamferedBoxGeo(0.2, 1.7, 4.1, 0.16, 0.02, 'z'),
      mats.stainlessMachined
    );
    botStiff.position.set(-0.72, -6.2, 1.1);
    const topStiff = new THREE.Mesh(
      createChamferedBoxGeo(0.2, 1.6, 4.05, 0.16, 0.02, 'z'),
      mats.stainlessMachined
    );
    topStiff.position.set(-1.06, 4.8, 0.0);
    g.add(botStiff, topStiff);

    const fingerGeo = new THREE.BoxGeometry(0.08, 1.25, 0.14);
    for (let i = 0; i < 14; i++) {
      const finger = new THREE.Mesh(fingerGeo, mats.goldPlating);
      finger.position.set(-1.06, -6.25, -0.72 + i * 0.28);
      finger.userData.noEdges = true;
      g.add(finger);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-jk1028-flex-holder',
        38,
        '#ea580c',
        g,
        new THREE.Vector3(-16.44, 35.8, 4.4),
        new THREE.Vector3(-42, -14, 18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E39. Sony OEM VF-Block Precision M1.7 Screws (Ref.204/207/208) & Smalley Wave Washers
  // =========================================================================
  {
    const g = new THREE.Group();

    // 4 Rear Eyecup-Perimeter M1.7 Ref.207 Phillips Pan-Head Screws seated cleanly inside E32 R=1.12 through-holes!
    const waveGeo = createTrueWaveSpringGeo(0.84, 0.24, 0.075, 0.08, 4, 36);
    const shankGeo = hiResCyl(0.42, 0.44, 0.72, 16).rotateX(Math.PI / 2);
    const tipGeo = hiResCyl(0.28, 0.42, 0.16, 16).rotateX(Math.PI / 2);
    const thRingGeo = hiResTorus(0.45, 0.045, 6, 16);
    const lockPatchGeo = hiResCyl(0.47, 0.46, 0.28, 14).rotateX(Math.PI / 2);

    for (const [sx, sy] of [
      [-13.4, 10.6],
      [13.4, 10.6],
      [-13.4, -10.6],
      [13.4, -10.6],
    ] as Array<[number, number]>) {
      // Properly oriented domed Phillips pan-head facing -Z
      addFlushPhillipsCapHead(
        g,
        [sx, sy, -22.0],
        '-z',
        0.82,
        0.32,
        mats.stainlessMachined,
        mats.velvetFlockTrap,
        mats.titaniumRivet
      );
      // Clean threaded shank with 4 machined ISO M1.7 thread crests + chamfered dog-point tip
      const sh = new THREE.Mesh(shankGeo, mats.stainlessMachined);
      sh.position.set(sx, sy, -21.61);
      const tip = new THREE.Mesh(tipGeo, mats.titaniumRivet);
      tip.position.set(sx, sy, -21.17);
      tip.userData.noEdges = true;
      g.add(sh, tip);
      for (let t = 0; t < 4; t++) {
        const tr = new THREE.Mesh(thRingGeo, mats.titaniumRivet);
        tr.position.set(sx, sy, -21.83 + t * 0.17);
        tr.userData.noEdges = true;
        g.add(tr);
      }

      // Authentic Sony blue nylon thread-lock patch band
      const lockPatch = new THREE.Mesh(lockPatchGeo, mats.mountThreadLockBlue);
      lockPatch.position.set(sx, sy, -21.43);
      lockPatch.userData.noEdges = true;

      // True 3D 4-crest Smalley wave spring washer preventing shock loosening
      const wave = new THREE.Mesh(waveGeo, mats.beCuSpring);
      wave.position.set(sx, sy, -21.87);
      wave.userData.noEdges = true;
      g.add(lockPatch, wave);
    }

    // 2 Lower Chassis Mount M1.7 (Ref.204) & 1 Mid Anchor M1.7 P2 (Ref.208) raised FLUSH against E45/E87!
    const botWashGeo = createHiResRingCellGeo(0.52, 1.18, 0.18, 0.03, 24).rotateX(Math.PI / 2);
    const botLockGeo = hiResCyl(0.47, 0.45, 0.58, 14);
    for (const [bx, by, bz, len, isP2] of [
      [-14.0, -14.35, 0.0, 1.3, false],
      [14.0, -14.35, 0.0, 1.3, false],
      [0.0, -15.32, 1.5, 1.65, true],
    ] as Array<[number, number, number, number, boolean]>) {
      addOrientedPhillipsScrew(
        g,
        [bx, by, bz],
        '-y',
        0.88,
        0.34,
        0.44,
        len,
        isP2 ? mats.matteBlackAnodized : mats.titaniumRivet,
        mats.velvetFlockTrap,
        mats.stainlessMachined
      );

      const wash = new THREE.Mesh(botWashGeo, isP2 ? mats.stainlessMachined : mats.brassGear);
      wash.position.set(bx, by + 0.2, bz);
      wash.userData.noEdges = true;

      const lockBand = new THREE.Mesh(botLockGeo, mats.mountThreadLockBlue);
      lockBand.position.set(bx, by + len * 0.62, bz);
      lockBand.userData.noEdges = true;
      g.add(wash, lockBand);
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
  //      Seated FLUSH onto E36 roof (posY=56.32, zero floating stilts, solid integrated base bezel!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Base stainless Shell Plate deck (Ref.327: 500294302) -> world Y in [56.08, 56.66]
    const baseDeckShape = createRoundedRectShape(20.6, 20.4, 1.3);
    addCircleHoles(baseDeckShape, [
      [0, -6.8, 0.95],
      [-6.8, -5.8, 0.85],
      [6.8, -5.8, 0.85],
    ]);
    const baseDeck = new THREE.Mesh(
      extrudeHiRes(baseDeckShape, 0.48, 0.05, 0.05, 2, 20).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    baseDeck.position.y = 0.05;
    g.add(baseDeck);

    // Solid dark anodized MI-shoe base bezel U-skirt uniting baseDeck & fixPlate (front notched open for E41 wpBoot & FPC!)
    const baseBezelShape = new THREE.Shape();
    baseBezelShape.moveTo(-10.0, -9.8);
    baseBezelShape.lineTo(10.0, -9.8);
    baseBezelShape.lineTo(10.0, 9.8);
    baseBezelShape.lineTo(7.15, 9.8);
    baseBezelShape.lineTo(7.15, 5.2);
    baseBezelShape.lineTo(8.15, 5.2);
    baseBezelShape.lineTo(8.15, -7.95);
    baseBezelShape.lineTo(-8.15, -7.95);
    baseBezelShape.lineTo(-8.15, 5.2);
    baseBezelShape.lineTo(-7.15, 5.2);
    baseBezelShape.lineTo(-7.15, 9.8);
    baseBezelShape.lineTo(-10.0, 9.8);
    baseBezelShape.closePath();
    const baseBezel = new THREE.Mesh(
      extrudeHiRes(baseBezelShape, 0.56, 0.04, 0.04, 1, 18).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    baseBezel.position.set(0, -0.48, 0);
    g.add(baseBezel);

    // Contrasting dark anodized inner shoe-well floor recess & rear accessory locking-pin detent slot!
    const wellRecess = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.2, 14.2, 0.6, 12.6, 13.6, 0.5), 0.08, 0.015, 0.015, 1, 14).rotateX(
        Math.PI / 2
      ),
      mats.titaniumRivet
    );
    wellRecess.position.set(0, 0.36, -0.8);
    const lockPinSlot = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 0.14, 1.85, 0.25, 0.02, 'y'),
      mats.velvetFlockTrap
    );
    lockPinSlot.position.set(0, 0.54, 4.2);
    const lockPinBezel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(2.35, 2.35, 0.35, 1.8, 1.8, 0.24), 0.12, 0.02, 0.02, 1, 14).rotateX(
        Math.PI / 2
      ),
      mats.titaniumRivet
    );
    lockPinBezel.position.set(0, 0.54, 4.2);
    g.add(wellRecess, lockPinSlot, lockPinBezel);

    // Authentic ISO-518 turned-in L-profile overhanging guide rails + contrasting dark T-slot shadow liners & chamfer strips
    for (const sx of [-1, 1]) {
      const railProfile = new THREE.Shape();
      railProfile.moveTo(0, 0);
      railProfile.lineTo(1.5, 0);
      railProfile.lineTo(1.5, 2.25);
      railProfile.lineTo(-2.2, 2.25);
      railProfile.lineTo(-2.2, 1.56);
      railProfile.lineTo(0, 1.56);
      railProfile.closePath();
      const railGeo = extrudeHiRes(railProfile, 19.6, 0.06, 0.06, 2, 14);
      if (sx < 0) railGeo.scale(-1, 1, 1);
      const rail = new THREE.Mesh(railGeo, mats.mountStainlessFlange);
      rail.position.set(sx * 8.75, 0.34, -0.3);

      // Contrasting machined titanium top bevel highlight & dark inner undercut slide shadow
      const topAccent = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 0.09, 18.8, 0.12, 0.015, 'y'),
        mats.titaniumRivet
      );
      topAccent.position.set(sx * 8.2, 2.62, -0.3);
      topAccent.userData.noEdges = true;

      const sideDetent = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 0.56, 2.2, 0.08, 0.02, 'y'),
        mats.matteBlackAnodized
      );
      sideDetent.position.set(sx * 8.65, 1.12, 1.6);
      sideDetent.userData.noEdges = true;
      g.add(rail, topAccent, sideDetent);
    }

    // Front protective overhang bridge framing the 21-pin MIS-2006 recess + laser-etched optical center tick & "MI" bars
    const frontBridge = new THREE.Mesh(
      createChamferedBoxGeo(19.6, 0.62, 3.2, 0.45, 0.06, 'y'),
      mats.mountStainlessFlange
    );
    frontBridge.position.set(0, 2.31, 8.3);
    const centerTick = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.05, 1.35), mats.matteBlackAnodized);
    centerTick.position.set(0, 2.64, 8.3);
    centerTick.userData.noEdges = true;
    const bridgeRim = new THREE.Mesh(
      createChamferedBoxGeo(17.8, 0.08, 0.38, 0.08, 0.015, 'y'),
      mats.titaniumRivet
    );
    bridgeRim.position.set(0, 2.63, 7.05);
    bridgeRim.userData.noEdges = true;
    g.add(frontBridge, centerTick, bridgeRim);

    // Authentic Pin 22 central circular X-sync flash contact pad in recessed dark PPS insulator + gold contact crown!
    const pin22Bushing = createHiResRingCell(1.14, 1.84, 0.3, mats.mountPpsInsulator, 0.03, 28);
    pin22Bushing.rotation.x = Math.PI / 2;
    pin22Bushing.position.set(0, 0.48, -0.4);
    const pin22Pad = new THREE.Mesh(hiResCyl(1.06, 1.1, 0.34, 24), mats.goldPlating);
    pin22Pad.position.set(0, 0.51, -0.4);
    pin22Pad.userData.noEdges = true;
    const pin22Crown = new THREE.Mesh(hiResTorus(0.76, 0.06, 8, 22).rotateX(Math.PI / 2), mats.copperHeatSpreader);
    pin22Crown.position.set(0, 0.67, -0.4);
    pin22Crown.userData.noEdges = true;
    g.add(pin22Bushing, pin22Pad, pin22Crown);

    // Slide-in brushed stainless Screw Cover Plate (Ref.329: 500294602) with stamped alignment rails & snap ears
    const coverShape = createRoundedRectShape(12.8, 12.6, 0.8);
    addCircleHoles(coverShape, [
      [0, -5.6, 0.95],
      [0, 0.8, 1.9],
    ]);
    const scrCover = new THREE.Mesh(
      extrudeHiRes(coverShape, 0.24, 0.03, 0.03, 2, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    scrCover.position.set(0, 0.48, -1.2);
    g.add(scrCover);

    const coverRailGeo = new THREE.BoxGeometry(0.42, 0.06, 10.6);
    for (const sx of [-5.8, 5.8]) {
      const cr = new THREE.Mesh(coverRailGeo, mats.titaniumRivet);
      cr.position.set(sx, 0.62, -1.2);
      cr.userData.noEdges = true;
      g.add(cr);
    }

    // Under-roof heavy stamped stainless Anchor Fix Plate (Ref.311: 500395901) -> world Y in [54.92, 55.64] FLUSH on E36!
    const fixShape = new THREE.Shape();
    fixShape.moveTo(-10.7, -9.2);
    fixShape.quadraticCurveTo(-10.7, -10.5, -9.4, -10.5);
    fixShape.lineTo(9.4, -10.5);
    fixShape.quadraticCurveTo(10.7, -10.5, 10.7, -9.2);
    fixShape.lineTo(10.7, 9.2);
    fixShape.quadraticCurveTo(10.7, 10.5, 9.4, 10.5);
    fixShape.lineTo(6.35, 10.5);
    fixShape.lineTo(6.35, 5.8);
    fixShape.lineTo(-6.35, 5.8);
    fixShape.lineTo(-6.35, 10.5);
    fixShape.lineTo(-9.4, 10.5);
    fixShape.quadraticCurveTo(-10.7, 10.5, -10.7, 9.2);
    fixShape.closePath();
    const fixPlate = new THREE.Mesh(
      extrudeHiRes(fixShape, 0.62, 0.05, 0.05, 2, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    fixPlate.position.y = -1.04;
    g.add(fixPlate);

    // 4 extruded brass-collared threaded bosses + 4 M1.7 Ref.328 Special Bolts joining baseDeck & fixPlate cleanly!
    const bossGeo = createHiResRingCellGeo(0.58, 1.38, 0.62, 0.04, 20).rotateX(Math.PI / 2);
    for (const [sx, sz] of [
      [-6.8, -6.2],
      [6.8, -6.2],
      [-6.8, 5.2],
      [6.8, 5.2],
    ] as Array<[number, number]>) {
      const boss = new THREE.Mesh(bossGeo, mats.brassGear);
      boss.position.set(sx, -0.56, sz);
      g.add(boss);
      addOrientedPhillipsScrew(
        g,
        [sx, 0.14, sz],
        '+y',
        0.86,
        0.26,
        0.44,
        1.25,
        mats.stainlessMachined,
        mats.velvetFlockTrap,
        mats.titaniumRivet
      );
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mi-shoe-shell',
        40,
        '#94a3b8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 16.82, -8.3),
        new THREE.Vector3(0, 58, 12),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E41. Sony OEM 21-Pin Digital Audio MIS-2006 Contact Block (Ref.325) & WP Rubber (Ref.324)
  //      Flush inside lowered E40 (Y=56.32), compact 7.4mm MIS-2006 FPC tucked cleanly along front brow!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision black LCP front micro-pitch comb housing (fits cleanly INSIDE E40 front pocket!)
    const blk = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(13.8, 3.6, 0.5), 1.24, 0.06, 0.06, 2, 16).rotateX(Math.PI / 2),
      mats.icEpoxy
    );
    blk.position.set(0, 1.12, 7.6);
    const combHood = new THREE.Mesh(
      createChamferedBoxGeo(13.8, 0.28, 2.4, 0.3, 0.04, 'y'),
      mats.icEpoxy
    );
    combHood.position.set(0, 1.66, 6.75);

    // Left & right tapered polarization guide cheeks + stainless EMI side shielding clips
    const cheekGeo = createChamferedBoxGeo(0.72, 1.12, 2.2, 0.12, 0.04, 'y');
    const shieldEarGeo = createChamferedBoxGeo(0.22, 0.96, 1.65, 0.06, 0.02, 'y');
    for (const sx of [-1, 1]) {
      const cheek = new THREE.Mesh(cheekGeo, mats.mountPpsInsulator);
      cheek.position.set(sx * 6.55, 1.12, 6.65);
      const ear = new THREE.Mesh(shieldEarGeo, mats.stainlessMachined);
      ear.position.set(sx * 6.96, 1.12, 7.6);
      g.add(cheek, ear);
    }
    g.add(blk, combHood);

    // 21 individually sculpted cantilevered gold contact beams (Pins 1–21) + arched tips + 22 thin LCP divider fins!
    const beamGeo = new THREE.BoxGeometry(0.26, 0.16, 2.02);
    const noseGeo = hiResCyl(0.14, 0.14, 0.26, 8).rotateZ(Math.PI / 2);
    const tailGeo = new THREE.BoxGeometry(0.22, 0.42, 0.16);
    const finGeo = new THREE.BoxGeometry(0.1, 0.78, 1.82);
    for (let i = -10; i <= 10; i++) {
      const px = i * 0.56;
      const beam = new THREE.Mesh(beamGeo, mats.goldPlating);
      beam.position.set(px, 1.14, 6.45);
      beam.userData.noEdges = true;
      const nose = new THREE.Mesh(noseGeo, mats.goldPlating);
      nose.position.set(px, 0.98, 5.52);
      nose.userData.noEdges = true;
      const rearTail = new THREE.Mesh(tailGeo, mats.goldPlating);
      rearTail.position.set(px, 0.62, 9.34);
      rearTail.userData.noEdges = true;
      g.add(beam, nose, rearTail);
    }
    for (let i = -10; i <= 11; i++) {
      const fin = new THREE.Mesh(finGeo, mats.mountPpsInsulator);
      fin.position.set((i - 0.5) * 0.56, 1.12, 6.5);
      fin.userData.noEdges = true;
      g.add(fin);
    }

    // Center rear-extending Pin 22 X-sync gold spring tongue with arched contact dimple
    const xSyncArm = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.18, 5.4), mats.goldPlating);
    xSyncArm.position.set(0, -0.52, 3.0);
    xSyncArm.userData.noEdges = true;
    const xSyncDimple = new THREE.Mesh(hiResSphere(0.32, 10, 8), mats.goldPlating);
    xSyncDimple.scale.set(1.0, 0.45, 1.2);
    xSyncDimple.position.set(0, -0.4, 0.65);
    xSyncDimple.userData.noEdges = true;
    g.add(xSyncArm, xSyncDimple);

    // Stepped Molded EPDM Waterproof FPC Entry Boot with twin compression sealing bellows ribs!
    const wpBootGeo = extrudeHiRes(createRoundedRectShape(11.6, 2.8, 0.7), 0.64, 0.04, 0.04, 2, 16).rotateX(
      Math.PI / 2
    );
    applyBoxUVs(wpBootGeo, 12);
    const wpBoot = new THREE.Mesh(wpBootGeo, mats.ultra.micRubberBootBlack);
    wpBoot.position.set(0, -0.62, 7.6);
    const bootRib = new THREE.Mesh(
      extrudeHiRes(createFrameShape(11.9, 3.1, 0.75, 11.4, 2.6, 0.62), 0.14, 0.02, 0.02, 1, 16).rotateX(
        Math.PI / 2
      ),
      mats.epdmGasket
    );
    bootRib.position.set(0, -0.62, 7.6);
    bootRib.userData.noEdges = true;
    g.add(wpBoot, bootRib);

    // Compact 7.4mm MIS-2006 Polyimide Flex Ribbon hugging over E18 upper-front brow cleanly (clears E18 Z=+10.20 & E17!)
    const fpcTail = createFlatRibbonAlongCurve(
      [
        new THREE.Vector3(0, -0.82, 8.2),
        new THREE.Vector3(0, -1.16, 14.8),
        new THREE.Vector3(0, -1.95, 19.25),
        new THREE.Vector3(0, -5.05, 19.25),
      ],
      7.4,
      0.2,
      new THREE.Vector3(1, 0, 0),
      mats.ultra.evfOemFlexRibbon,
      22
    );
    g.add(fpcTail);

    // Routed digital audio copper trace fan-out + courtyard around 6-pin TVS ESD IC!
    const fpcTraces: Array<[number, number, number, number]> = [];
    for (let i = -6; i <= 6; i += 2) {
      fpcTraces.push([i * 0.48, -2.75, i * 0.48, -4.45]);
    }
    addCopperTraceRuns(g, fpcTraces, 0.09, 0.024, 19.37, mats.copperHeatSpreader);
    addSilkscreenCourtyard(g, -1.5, -3.5, 2.32, 1.52, 19.375, 0.04, mats.invarScaleBar, 'tl');

    const esdIc = buildChipPackage({
      w: 2.0,
      d: 1.25,
      h: 0.36,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      axis: 'z',
    });
    esdIc.position.set(-1.5, -3.5, 19.44);
    g.add(esdIc);

    for (let i = 0; i < 4; i++) {
      addSmdPassiveWithFillets(
        g,
        0.58,
        0.32,
        0.24,
        0.4 + i * 0.85,
        -3.5,
        19.42,
        i % 2 === 0 ? mats.smdCeramic : mats.ferriteInductor,
        mats.silverElectrode,
        mats.solderBallSilver
      );
    }

    // SUS304 ZIF stiffener + 21 gold ZIF contact fingers at distal termination
    const zifStiff = new THREE.Mesh(
      createChamferedBoxGeo(7.5, 1.45, 0.16, 0.18, 0.02, 'z'),
      mats.stainlessMachined
    );
    zifStiff.position.set(0, -4.6, 19.08);
    g.add(zifStiff);
    const gfGeo = new THREE.BoxGeometry(0.18, 1.05, 0.055);
    for (let i = -10; i <= 10; i++) {
      const gf = new THREE.Mesh(gfGeo, mats.goldPlating);
      gf.position.set(i * 0.33, -4.65, 19.38);
      gf.userData.noEdges = true;
      g.add(gf);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mi-shoe-contacts',
        41,
        '#eab308',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 16.82, -8.3),
        new THREE.Vector3(24, 62, 26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E42. Sony OEM MI SHOE SPRING PLATE (Ref.331) & Dust Cap SHOE CAP FA-SHC1M (Ref.9)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Twin arched SUS301-CSP cantilever anti-rattle leaf springs with embossed gold contact domes!
    const leafProfile = new THREE.Shape();
    leafProfile.moveTo(-5.4, 0.0);
    leafProfile.quadraticCurveTo(-1.6, 0.44, 2.4, 0.36);
    leafProfile.quadraticCurveTo(4.4, 0.28, 5.2, 0.08);
    leafProfile.lineTo(5.2, -0.1);
    leafProfile.quadraticCurveTo(4.2, 0.1, 2.4, 0.18);
    leafProfile.quadraticCurveTo(-1.6, 0.26, -5.4, -0.16);
    leafProfile.closePath();

    const leafGeo = extrudeHiRes(leafProfile, 2.3, 0.03, 0.03, 1, 18);
    leafGeo.rotateY(Math.PI / 2);
    const domeGeo = hiResSphere(0.54, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5);
    for (const sx of [-4.8, 4.8]) {
      const leaf = new THREE.Mesh(leafGeo, mats.mountSpringSteel);
      leaf.position.set(sx, 0.24, -1.2);
      const dome = new THREE.Mesh(domeGeo, mats.goldPlating);
      dome.scale.set(1, 0.38, 1.2);
      dome.position.set(sx, 0.54, 1.4);
      dome.userData.noEdges = true;
      const rearDome = new THREE.Mesh(domeGeo, mats.goldPlating);
      rearDome.scale.set(0.8, 0.32, 0.9);
      rearDome.position.set(sx, 0.56, -2.4);
      rearDome.userData.noEdges = true;
      g.add(leaf, dome, rearDome);
    }

    // Rear stainless cross tie-bar with locating ear & cleanly oriented Ref.330 M1.4 anchor screw!
    const crossTie = new THREE.Mesh(
      createChamferedBoxGeo(11.8, 0.22, 1.85, 0.3, 0.03, 'y'),
      mats.mountSpringSteel
    );
    crossTie.position.set(0, 0.22, -6.8);
    g.add(crossTie);
    addFlushPhillipsCapHead(
      g,
      [0, 0.34, -6.8],
      '+y',
      0.68,
      0.22,
      mats.stainlessMachined,
      mats.velvetFlockTrap,
      mats.brassGear
    );

    // Authentic slim black PC+ABS Sony FA-SHC1M Shoe Cap riding smoothly INSIDE E40 ISO-518 rails!
    const capTopGeo = extrudeHiRes(createRoundedRectShape(21.0, 20.6, 1.8), 1.42, 0.16, 0.16, 3, 22).rotateX(
      Math.PI / 2
    );
    applyBoxUVs(capTopGeo, 16);
    const capTop = new THREE.Mesh(capTopGeo, mats.ultra.evfFinderCoverMold);
    capTop.position.set(0, 3.04, 0);
    g.add(capTop);

    // Contrasting perimeter top bevel trim & recessed satin grip dish with embossed Sony directional slide-arrow!
    const capBevelTrim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(19.6, 19.2, 1.4, 18.8, 18.4, 1.1), 0.08, 0.015, 0.015, 1, 20).rotateX(
        Math.PI / 2
      ),
      mats.titaniumRivet
    );
    capBevelTrim.position.set(0, 3.88, 0);
    capBevelTrim.userData.noEdges = true;

    const capDish = new THREE.Mesh(
      createChamferedBoxGeo(14.8, 0.24, 11.4, 1.1, 0.05, 'y'),
      mats.matteBlackAnodized
    );
    capDish.position.set(0, 3.84, 1.1);
    g.add(capBevelTrim, capDish);

    // Embossed Sony FA-SHC1M directional pull-off arrow & shoe emblem on top dish
    const arrowShape = new THREE.Shape();
    arrowShape.moveTo(0, -1.6);
    arrowShape.lineTo(1.15, 0.35);
    arrowShape.lineTo(-1.15, 0.35);
    arrowShape.closePath();
    const slideArrow = new THREE.Mesh(
      extrudeHiRes(arrowShape, 0.05, 0.01, 0.01, 1, 6).rotateX(Math.PI / 2),
      mats.invarScaleBar
    );
    slideArrow.position.set(0, 3.98, -2.6);
    slideArrow.userData.noEdges = true;
    // Recessed "MULTI INTERFACE" micro badge bars
    const badgeGeo = new THREE.BoxGeometry(6.4, 0.04, 0.22);
    for (const bz of [1.8, 2.55]) {
      const bg = new THREE.Mesh(badgeGeo, mats.titaniumRivet);
      bg.scale.x = bz > 2 ? 0.68 : 1.0;
      bg.position.set(0, 3.98, bz);
      bg.userData.noEdges = true;
      g.add(bg);
    }
    g.add(slideArrow);

    // 7 crisp high-contrast tactile rear thumb-grip ribs along the -Z edge of the Sony FA-SHC1M Shoe Cap!
    const gripRibGeo = createChamferedBoxGeo(14.2, 0.24, 0.34, 0.1, 0.025, 'y');
    for (let r = 0; r < 7; r++) {
      const gripRib = new THREE.Mesh(gripRibGeo, r % 2 === 0 ? mats.titaniumRivet : mats.matteBlackAnodized);
      gripRib.position.set(0, 3.92, -5.2 - r * 0.72);
      gripRib.userData.noEdges = true;
      g.add(gripRib);
    }

    // Center core + twin side T-rail slide runners + underside EPDM perimeter dust-seal lip!
    const capCore = new THREE.Mesh(
      createChamferedBoxGeo(12.2, 1.35, 13.8, 0.7, 0.05, 'y'),
      mats.matteBlackAnodized
    );
    capCore.position.set(0, 1.48, -2.2);
    g.add(capCore);

    const runnerGeo = createChamferedBoxGeo(1.75, 0.42, 13.6, 0.2, 0.04, 'y');
    const detentGeo = hiResSphere(0.24, 10, 8);
    for (const sx of [-1, 1]) {
      const runner = new THREE.Mesh(runnerGeo, mats.matteBlackAnodized);
      runner.position.set(sx * 7.45, 0.96, -2.2);
      const detent = new THREE.Mesh(detentGeo, mats.stainlessMachined);
      detent.position.set(sx * 8.2, 0.96, -4.4);
      detent.userData.noEdges = true;
      g.add(runner, detent);
    }

    // Front overhanging 21-pin dust-seal lip hood covering MIS-2006 recess cleanly ahead of E40 bridge
    const frontHood = new THREE.Mesh(
      createChamferedBoxGeo(18.6, 1.45, 1.35, 0.4, 0.06, 'y'),
      mats.ultra.evfFinderCoverMold
    );
    frontHood.position.set(0, 2.25, 10.77);
    const hoodSeal = new THREE.Mesh(
      createChamferedBoxGeo(17.4, 0.22, 0.85, 0.2, 0.02, 'y'),
      mats.epdmGasket
    );
    hoodSeal.position.set(0, 1.48, 10.72);
    hoodSeal.userData.noEdges = true;
    g.add(frontHood, hoodSeal);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mi-shoe-springs',
        42,
        '#1e293b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 17.42, -8.3),
        new THREE.Vector3(-22, 74, 8),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E43. EVF-Flank Stereo MEMS Microphones, Rubber Boots (Ref.304) & Mic Holder (Ref.308)
  //      Pulled INWARD onto E18 integral cast magnesium stereo mic plinths (|X|=16.20, Z=+5.00)!
  // =========================================================================
  {
    const g = new THREE.Group();

    const bootPts: THREE.Vector2[] = [
      new THREE.Vector2(1.4, -1.9),
      new THREE.Vector2(3.35, -1.9),
      new THREE.Vector2(3.42, -1.4),
      new THREE.Vector2(2.98, -1.0),
      new THREE.Vector2(3.32, -0.5),
      new THREE.Vector2(2.88, 0.0),
      new THREE.Vector2(3.22, 0.5),
      new THREE.Vector2(2.78, 1.0),
      new THREE.Vector2(2.98, 1.5),
      new THREE.Vector2(2.45, 1.95),
      new THREE.Vector2(1.3, 1.95),
      new THREE.Vector2(1.3, 1.3),
      new THREE.Vector2(2.25, 1.1),
      new THREE.Vector2(2.25, -1.5),
      new THREE.Vector2(1.4, -1.9),
    ];
    const bootGeo = markHiRes(new THREE.LatheGeometry(bootPts, 36));
    bootGeo.computeVertexNormals();

    const micBodyGeo = createChamferedBoxGeo(3.45, 1.15, 2.75, 0.3, 0.05, 'y');
    const micLidGeo = markHiRes(new THREE.PlaneGeometry(3.15, 2.45)).rotateX(-Math.PI / 2);
    const portHoleGeo = hiResCyl(0.4, 0.4, 0.12, 16);
    const portRingGeo = hiResTorus(0.48, 0.06, 8, 18).rotateX(Math.PI / 2);
    const carrierPcbGeo = hiResCyl(2.35, 2.35, 0.32, 24);
    const holderGeo = extrudeHiRes(createFrameShape(7.2, 7.2, 1.4, 5.6, 5.6, 2.6), 1.95, 0.08, 0.08, 2, 22).rotateX(
      Math.PI / 2
    );
    const earShape = createRoundedRectShape(2.7, 2.1, 0.65);
    addCircleHoles(earShape, [[0, 0, 0.56]]);
    const earGeo = extrudeHiRes(earShape, 0.68, 0.05, 0.05, 2, 16).rotateX(Math.PI / 2);
    const earBushGeo = createHiResRingCellGeo(0.54, 0.88, 0.72, 0.025, 18).rotateX(Math.PI / 2);
    const zifPinGeo = new THREE.BoxGeometry(0.18, 0.82, 0.06);

    for (const sx of [-19.2, 19.2]) {
      const boot = new THREE.Mesh(bootGeo, mats.ultra.micRubberBootBlack);
      boot.position.set(sx, 0, 0);
      g.add(boot);

      // Gold/nickel Faraday-shielded MEMS microphone capsule + gleaming brass acoustic inlet collar
      const micBody = new THREE.Mesh(micBodyGeo, mats.goldPlating);
      micBody.position.set(sx, 0.32, 0);
      const micLid = new THREE.Mesh(micLidGeo, mats.ultra.micMemsFaradayLid);
      micLid.position.set(sx, 0.92, 0);
      micLid.userData.noEdges = true;
      const portHole = new THREE.Mesh(portHoleGeo, mats.velvetFlockTrap);
      portHole.position.set(sx, 0.94, 0.48);
      portHole.userData.noEdges = true;
      const portRing = new THREE.Mesh(portRingGeo, mats.goldPlating);
      portRing.position.set(sx, 0.96, 0.48);
      portRing.userData.noEdges = true;
      g.add(micBody, micLid, portHole, portRing);

      // Mini circular emerald carrier PCB + gold solder ring + 4x 0201 bypass passives with fillets
      const carrierPcb = new THREE.Mesh(carrierPcbGeo, mats.sensorPcb);
      carrierPcb.position.set(sx, -0.44, 0);
      g.add(carrierPcb);
      for (const cz of [-0.75, 0.75]) {
        const smdGrp = new THREE.Group();
        addSmdPassiveWithFillets(
          smdGrp,
          0.7,
          0.38,
          0.26,
          0,
          0,
          0,
          mats.smdCeramic,
          mats.silverElectrode,
          mats.solderBallSilver
        );
        smdGrp.rotation.x = Math.PI / 2;
        smdGrp.position.set(sx + (sx < 0 ? 1.12 : -1.12), -0.74, cz);
        g.add(smdGrp);
      }

      // Rigid glass-filled PPS MIC HOLDER cradle (Ref.308) + twin mounting ears + brass press-fit inserts!
      const holder = new THREE.Mesh(holderGeo, mats.mountPpsInsulator);
      holder.position.set(sx, -0.72, 0);
      g.add(holder);
      for (const ez of [-4.2, 4.2]) {
        const ear = new THREE.Mesh(earGeo, mats.mountPpsInsulator);
        ear.position.set(sx, -1.32, ez);
        const bush = new THREE.Mesh(earBushGeo, mats.brassGear);
        bush.position.set(sx, -1.32, ez);
        g.add(ear, bush);
      }

      // Compact shielded stereo mic amber Kapton flex lead passing straight through E18 plinth slot!
      const lead = createFlatRibbonAlongCurve(
        [
          new THREE.Vector3(sx, -0.95, 0),
          new THREE.Vector3(sx, -2.35, 0),
          new THREE.Vector3(sx, -3.55, 0),
        ],
        2.1,
        0.18,
        new THREE.Vector3(1, 0, 0),
        mats.ultra.evfOemFlexRibbon,
        14
      );
      const stiff = new THREE.Mesh(
        createChamferedBoxGeo(2.1, 1.0, 0.14, 0.12, 0.02, 'z'),
        mats.stainlessMachined
      );
      stiff.position.set(sx, -3.28, 0.14);
      g.add(lead, stiff);

      for (let i = 0; i < 6; i++) {
        const gf = new THREE.Mesh(zifPinGeo, mats.goldPlating);
        gf.position.set(sx - 0.78 + i * 0.31, -3.3, -0.11);
        gf.userData.noEdges = true;
        g.add(gf);
      }
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-stereo-mics',
        43,
        '#f97316',
        g,
        new THREE.Vector3(0, 50.85, 5.0),
        new THREE.Vector3(0, 44, 48),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E44. Microphone Port Hydrophobic Acoustic Wind-Noise Mesh & ePTFE Membrane
  //      Coaxial directly atop E43 stereo mics (|X|=19.20, Z=+5.00, world Y=53.30)
  // =========================================================================
  {
    const g = new THREE.Group();

    const psaGeo = createHiResRingCellGeo(1.95, 2.9, 0.16, 0.02, 32).rotateX(Math.PI / 2);
    const ptfeGeo = hiResCyl(2.7, 2.7, 0.24, 32);
    applyPlanarUVs(ptfeGeo, 5.4, 5.4, 'xz');
    const meshGeo = hiResCyl(2.78, 2.78, 0.18, 32);
    applyPlanarUVs(meshGeo, 5.56, 5.56, 'xz');
    const clampGeo = createKnurledCollarGeo(2.44, 2.92, 3.04, 0.24, 32).rotateX(Math.PI / 2);
    const portPlateShape = createRoundedRectShape(2.15, 4.25, 0.9);
    addCircleHoles(portPlateShape, [
      [0, -1.15, 0.36],
      [0, 0, 0.36],
      [0, 1.15, 0.36],
    ]);
    const portPlateGeo = extrudeHiRes(portPlateShape, 0.22, 0.03, 0.03, 2, 20).rotateX(Math.PI / 2);
    const wireBarGeo = new THREE.BoxGeometry(4.8, 0.035, 0.045);
    const dotGeo = hiResCyl(0.33, 0.33, 0.24, 14);
    const rimGeo = hiResTorus(0.38, 0.05, 8, 18).rotateX(Math.PI / 2);
    const brassCollarGeo = createHiResRingCellGeo(2.55, 2.86, 0.06, 0.01, 28).rotateX(Math.PI / 2);

    for (const sx of [-19.2, 19.2]) {
      const psaRing = new THREE.Mesh(psaGeo, mats.epdmGasket);
      psaRing.position.set(sx, -0.22, 0);
      psaRing.userData.noEdges = true;

      const ptfe = new THREE.Mesh(ptfeGeo, mats.ultra.micEptfeMembrane);
      ptfe.position.set(sx, 0.02, 0);

      const meshCap = new THREE.Mesh(meshGeo, mats.ultra.micStainlessWovenMesh);
      meshCap.position.set(sx, 0.26, 0);

      // Fine 3D cross-hatched woven stainless acoustic mesh grid bars atop mesh disc
      for (let m = -3; m <= 3; m++) {
        const w1 = new THREE.Mesh(wireBarGeo, mats.titaniumRivet);
        w1.scale.x = Math.sqrt(Math.max(0.15, 1 - (m * 0.26) ** 2));
        w1.position.set(sx, 0.37, m * 0.62);
        w1.userData.noEdges = true;
        const w2 = new THREE.Mesh(wireBarGeo, mats.titaniumRivet);
        w2.scale.x = Math.sqrt(Math.max(0.15, 1 - (m * 0.26) ** 2));
        w2.rotation.y = Math.PI / 2;
        w2.position.set(sx + m * 0.62, 0.37, 0);
        w2.userData.noEdges = true;
        g.add(w1, w2);
      }

      // CNC knurled stainless clamping bezel + inner brass retaining ring
      const clampRing = new THREE.Mesh(clampGeo, mats.stainlessMachined);
      clampRing.position.set(sx, 0.28, 0);
      const brassTrim = new THREE.Mesh(brassCollarGeo, mats.brassGear);
      brassTrim.position.set(sx, 0.41, 0);
      brassTrim.userData.noEdges = true;

      const portPlate = new THREE.Mesh(portPlateGeo, mats.matteBlackAnodized);
      portPlate.position.set(sx, 0.52, 0);

      for (const dz of [-1.15, 0, 1.15]) {
        const dot = new THREE.Mesh(dotGeo, mats.velvetFlockTrap);
        dot.position.set(sx, 0.5, dz);
        dot.userData.noEdges = true;
        const rim = new THREE.Mesh(rimGeo, mats.stainlessMachined);
        rim.position.set(sx, 0.64, dz);
        rim.userData.noEdges = true;
        g.add(dot, rim);
      }

      g.add(psaRing, ptfe, meshCap, clampRing, brassTrim, portPlate);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mic-wind-mesh',
        44,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 53.3, 5.0),
        new THREE.Vector3(0, 62, 54),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E45. EVF-Hump Perimeter Die-Cut Weather-Seal Sponge Gasket & Light-Leak Seal
  //      Raised FLUSH under E18 floor (posY=26.02, world Y in [25.71, 26.40] < E18 26.44!)
  // =========================================================================
  {
    const g = new THREE.Group();

    const boltCoords: Array<[number, number]> = [
      [-14.6, -16.1],
      [14.6, -16.1],
      [-14.6, 13.9],
      [14.6, 13.9],
    ];
    const sealShape = new THREE.Shape();
    sealShape.moveTo(-17.0, -17.8);
    sealShape.lineTo(-12.2, -17.8);
    sealShape.lineTo(-12.2, -6.8);
    sealShape.lineTo(12.2, -6.8);
    sealShape.lineTo(12.2, -17.8);
    sealShape.lineTo(17.0, -17.8);
    sealShape.lineTo(17.0, 21.4);
    sealShape.lineTo(12.2, 21.4);
    sealShape.lineTo(12.2, -4.6);
    sealShape.lineTo(-12.2, -4.6);
    sealShape.lineTo(-12.2, 21.4);
    sealShape.lineTo(-17.0, 21.4);
    sealShape.closePath();
    addCircleHoles(sealShape, [
      ...boltCoords.map(([x, z]) => [x, z, 1.04] as [number, number, number]),
      [-14.0, -1.1, 0.82],
      [14.0, -1.1, 0.82],
    ]);

    const baseSealGeo = extrudeHiRes(sealShape, 0.54, 0.04, 0.04, 2, 18).rotateX(Math.PI / 2);
    applyBoxUVs(baseSealGeo, 16);
    const baseSeal = new THREE.Mesh(baseSealGeo, mats.ultra.micRubberBootBlack);
    g.add(baseSeal);

    // Twin parallel raised molded EPDM dual-crown compression sealing ribs along both left & right rails!
    const outerBeadGeo = createChamferedBoxGeo(0.55, 0.14, 28.4, 0.16, 0.02, 'y');
    const innerBeadGeo = createChamferedBoxGeo(0.46, 0.12, 26.8, 0.14, 0.02, 'y');
    for (const sx of [-1, 1]) {
      const bOut = new THREE.Mesh(outerBeadGeo, mats.epdmGasket);
      bOut.position.set(sx * 16.05, 0.34, 1.6);
      bOut.userData.noEdges = true;
      const bIn = new THREE.Mesh(innerBeadGeo, mats.lensFoamSeal);
      bIn.position.set(sx * 12.85, 0.33, 1.6);
      bIn.userData.noEdges = true;
      g.add(bOut, bIn);
    }

    // 4 contoured corner screw-boss sealing rings + stainless/brass compression-limiter eyelet sleeves!
    const earGeo = createHiResRingCellGeo(1.04, 1.96, 0.56, 0.03, 22).rotateX(Math.PI / 2);
    const limiterGeo = createHiResRingCellGeo(1.04, 1.48, 0.62, 0.025, 22).rotateX(Math.PI / 2);
    for (const [cx, cz] of boltCoords) {
      const ear = new THREE.Mesh(earGeo, mats.ultra.micRubberBootBlack);
      ear.position.set(cx, 0, cz);
      const limiter = new THREE.Mesh(limiterGeo, mats.brassGear);
      limiter.position.set(cx, 0.02, cz);
      g.add(ear, limiter);
    }

    // Center-bridge dual-rib PORON light-leak compression seal + 6 molded anti-twist locating studs
    const bridgeBead = new THREE.Mesh(
      createChamferedBoxGeo(22.4, 0.14, 0.62, 0.14, 0.02, 'y'),
      mats.lensFoamSeal
    );
    bridgeBead.position.set(0, 0.33, -5.2);
    const bridgeBead2 = new THREE.Mesh(
      createChamferedBoxGeo(22.4, 0.14, 0.52, 0.12, 0.02, 'y'),
      mats.epdmGasket
    );
    bridgeBead2.position.set(0, 0.33, -6.2);
    g.add(bridgeBead, bridgeBead2);

    const locNibGeo = hiResCyl(0.32, 0.36, 0.22, 12);
    for (const [nx, nz] of [
      [-14.6, -5.7],
      [14.6, -5.7],
      [-14.6, 4.2],
      [14.6, 4.2],
      [-14.6, 19.2],
      [14.6, 19.2],
    ] as Array<[number, number]>) {
      const nib = new THREE.Mesh(locNibGeo, mats.titaniumRivet);
      nib.position.set(nx, 0.32, nz);
      nib.userData.noEdges = true;
      g.add(nib);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-hump-wp-gasket',
        45,
        '#0f172a',
        g,
        new THREE.Vector3(0, 26.02, -11.4),
        new THREE.Vector3(0, -38, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E46. Micro-OLED 2-Stack Tandem White Emitter & Fabry-Pérot Optical Micro-Cavity
  //      World Z in [+2.18, +2.54] (pos z=2.36 -> local z in [-0.18, +0.18])
  // =========================================================================
  {
    const g = new THREE.Group();

    // Layer 5 (rear): High-reflectivity silver-alloy APC mirror plane + gold anode perimeter bus
    const anodeMirror = new THREE.Mesh(
      createChamferedBoxGeo(13.9, 10.5, 0.075, 0.18, 0.01, 'z'),
      mats.sinteredSilver
    );
    anodeMirror.position.z = 0.132;
    const busRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.18, 10.78, 0.24, 13.68, 10.28, 0.15), 0.05, 0.008, 0.008, 1, 14),
      mats.goldPlating
    );
    busRing.position.z = 0.14;
    busRing.userData.noEdges = true;

    // Layer 4: Stack-1 Blue fluorescent emitter layer (stepped inward!)
    const stack1 = new THREE.Mesh(
      createChamferedBoxGeo(13.64, 10.24, 0.065, 0.16, 0.01, 'z'),
      mats.evfLensAspheric
    );
    stack1.position.z = 0.052;

    // Layer 3: Charge-Generation Layer (CGL) metallic-doped tunnel junction stepped rim
    const cgl = new THREE.Mesh(
      createChamferedBoxGeo(13.42, 10.02, 0.04, 0.14, 0.008, 'z'),
      mats.goldPlating
    );
    cgl.position.z = -0.005;

    // Layer 2: Stack-2 Yellow-Green phosphorescent emitter layer
    const stack2 = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 9.8, 0.065, 0.14, 0.01, 'z'),
      mats.evfLensEd
    );
    stack2.position.z = -0.065;

    // Layer 1 (front): Semi-transparent Mg:Ag cathode + Fabry-Pérot micro-cavity tuning plane
    const occfGeo = createChamferedBoxGeo(12.95, 9.55, 0.055, 0.12, 0.01, 'z');
    applyPlanarUVs(occfGeo, 12.95, 9.55, 'xy-back');
    const cathodeOccf = new THREE.Mesh(occfGeo, mats.ultra.evfTandemCavityStack);
    cathodeOccf.position.z = -0.132;

    // Micro-cavity sub-pixel resonant tuning strips & silver-alloy cathode spacer columns
    const cavStripeGeo = new THREE.BoxGeometry(0.32, 9.1, 0.02);
    const cavMats = [mats.cfaBlue, mats.cfaGreen, mats.cfaRed];
    for (let i = 0; i < 24; i++) {
      const cs = new THREE.Mesh(cavStripeGeo, cavMats[i % 3]);
      cs.position.set(-5.98 + i * 0.52, 0, -0.165);
      cs.userData.noEdges = true;
      g.add(cs);
    }

    // Horizontal Fabry-Pérot optical cavity isolator bars
    const cavRowGeo = new THREE.BoxGeometry(12.5, 0.06, 0.022);
    for (let j = -4; j <= 4; j++) {
      const cr = new THREE.Mesh(cavRowGeo, mats.sinteredSilver);
      cr.position.set(0, j * 1.02, -0.168);
      cr.userData.noEdges = true;
      g.add(cr);
    }

    // Perimeter stepped TFE hermetic barrier edge + 4 corner CGL interconnect vias & optical fiducials
    const tfeRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.95, 10.55, 0.22, 13.0, 9.6, 0.12), 0.05, 0.01, 0.01, 1, 14),
      mats.opticalCementClear
    );
    tfeRim.position.z = -0.155;
    tfeRim.userData.noEdges = true;

    for (const [fx, fy] of [
      [-6.78, 5.05],
      [6.78, 5.05],
      [-6.78, -5.05],
      [6.78, -5.05],
    ] as Array<[number, number]>) {
      addOpticalFiducial(g, fx, fy, -0.168, 0.16, 0.018, mats.goldPlating);
    }

    g.add(anodeMirror, busRing, stack1, cgl, stack2, cathodeOccf, tfeRim);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-tandem-cavity',
        46,
        '#38bdf8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 2.36),
        new THREE.Vector3(24, 10, 44),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // E47. Micro-OLED Silicon Die φ20μm Gold Wire-Bonds & Black Epoxy Glob-Top Dam
  //      HOLLOW inner 17.0x13.2 clears E56 16.4x12.6 by 0.28mm! World Z in [+2.88, +3.43]
  // =========================================================================
  {
    const g = new THREE.Group();

    const damBase = new THREE.Mesh(
      extrudeHiRes(createFrameShape(20.4, 16.4, 1.0, 17.0, 13.2, 0.4), 0.28, 0.04, 0.04, 2, 18),
      mats.icEpoxy
    );
    damBase.position.z = 0.04;
    const damMeniscus = new THREE.Mesh(
      extrudeHiRes(createFrameShape(19.9, 15.9, 0.9, 17.4, 13.6, 0.45), 0.16, 0.04, 0.04, 2, 16),
      mats.matteBlackAnodized
    );
    damMeniscus.position.z = -0.06;
    damMeniscus.userData.noEdges = true;
    const innerMeniscusRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(17.35, 13.55, 0.44, 17.04, 13.24, 0.4), 0.08, 0.015, 0.015, 1, 16),
      mats.titaniumRivet
    );
    innerMeniscusRim.position.z = -0.13;
    innerMeniscusRim.userData.noEdges = true;
    g.add(damBase, damMeniscus, innerMeniscusRim);

    // High-density 56x φ20μm thermosonic gold wirebond loops around ALL 4 sides (hoisted pad/ball/stitch geos!)
    const hInPadGeo = new THREE.BoxGeometry(0.28, 0.28, 0.048);
    const hOutPadGeo = new THREE.BoxGeometry(0.32, 0.36, 0.048);
    const vInPadGeo = new THREE.BoxGeometry(0.28, 0.28, 0.048);
    const vOutPadGeo = new THREE.BoxGeometry(0.36, 0.32, 0.048);
    const ballGeo = hiResSphere(0.115, 8, 6);
    const stitchGeo = hiResCyl(0.1, 0.115, 0.07, 8).rotateX(Math.PI / 2);

    // 18 top + 18 bottom fine signal wirebonds
    for (const sy of [-1, 1]) {
      for (let i = 0; i < 18; i++) {
        const px = -6.8 + i * 0.8;
        const innerPad = new THREE.Mesh(hInPadGeo, mats.goldPlating);
        innerPad.position.set(px, sy * 6.72, 0.12);
        innerPad.userData.noEdges = true;
        const outerPad = new THREE.Mesh(hOutPadGeo, mats.goldPlating);
        outerPad.position.set(px, sy * 7.82, 0.1);
        outerPad.userData.noEdges = true;
        g.add(innerPad, outerPad);

        addZWirebondLoop(
          g,
          new THREE.Vector3(px, sy * 6.72, 0.1),
          new THREE.Vector3(px, sy * 7.82, 0.08),
          -0.31,
          0.052,
          mats.goldPlating,
          ballGeo,
          stitchGeo
        );
      }
    }

    // 10 left + 10 right heavy ELVDD/ELVSS power & scan wirebonds
    for (const sx of [-1, 1]) {
      for (let j = 0; j < 10; j++) {
        const py = -4.95 + j * 1.1;
        const innerPad = new THREE.Mesh(vInPadGeo, mats.goldPlating);
        innerPad.position.set(sx * 8.62, py, 0.12);
        innerPad.userData.noEdges = true;
        const outerPad = new THREE.Mesh(vOutPadGeo, mats.goldPlating);
        outerPad.position.set(sx * 9.74, py, 0.1);
        outerPad.userData.noEdges = true;
        g.add(innerPad, outerPad);

        addZWirebondLoop(
          g,
          new THREE.Vector3(sx * 8.62, py, 0.1),
          new THREE.Vector3(sx * 9.74, py, 0.08),
          -0.3,
          0.06,
          mats.goldPlating,
          ballGeo,
          stitchGeo
        );
      }
    }

    // 4 corner wirebonder optical vision-recognition gold fiducials
    for (const [fx, fy] of [
      [-9.35, 7.35],
      [9.35, 7.35],
      [-9.35, -7.35],
      [9.35, -7.35],
    ] as Array<[number, number]>) {
      addOpticalFiducial(g, fx, fy, -0.14, 0.24, 0.025, mats.goldPlating);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-bondwires-glob',
        47,
        '#f59e0b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 3.18),
        new THREE.Vector3(28, -12, 46),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E48. OLED Panel Direct Polyimide FPC (LCD902), 0201 MLCC Decap Bank & SUS Stiffener
  //      World Y in [20.1, 29.3], Z in [+5.02, +5.80]
  // =========================================================================
  {
    const g = new THREE.Group();

    const fpcShape = new THREE.Shape();
    fpcShape.moveTo(-5.8, 4.5);
    fpcShape.lineTo(5.8, 4.5);
    fpcShape.lineTo(5.8, -2.2);
    fpcShape.lineTo(6.5, -2.5);
    fpcShape.lineTo(6.5, -3.55);
    fpcShape.lineTo(5.6, -3.75);
    fpcShape.lineTo(5.6, -4.65);
    fpcShape.lineTo(-5.6, -4.65);
    fpcShape.lineTo(-5.6, -3.75);
    fpcShape.lineTo(-6.5, -3.55);
    fpcShape.lineTo(-6.5, -2.5);
    fpcShape.lineTo(-5.8, -2.2);
    fpcShape.closePath();

    const fpcGeo = extrudeHiRes(fpcShape, 0.2, 0.02, 0.02, 1, 14);
    applyPlanarUVs(fpcGeo, 13.0, 9.2, 'xy');
    const fpc = new THREE.Mesh(fpcGeo, mats.ultra.evfOemFlexRibbon);
    g.add(fpc);

    // Fine routed copper MIPI + ELVDD/ELVSS bus traces fanning down into the 30 gold ZIF fingers!
    const cofTraces: Array<[number, number, number, number]> = [
      [-5.1, 4.15, 5.1, 4.15],
      [-5.1, 2.5, 5.1, 2.5],
      [-4.9, 1.15, 4.9, 1.15],
    ];
    for (let i = 0; i < 15; i++) {
      const tx = -4.9 + i * 0.7;
      cofTraces.push([tx, 1.15, tx, -2.9]);
    }
    addCopperTraceRuns(g, cofTraces, 0.09, 0.024, -0.115, mats.copperHeatSpreader);

    // Perimeter ENIG grounding vias + top OLED ACF hot-bar bond alignment fiducials
    const cofVias: Array<[number, number]> = [];
    for (let i = -3; i <= 3; i++) {
      cofVias.push([i * 1.6, 4.18]);
    }
    for (const sy of [-1.75, 0.2, 2.5]) {
      cofVias.push([-5.32, sy], [5.32, sy]);
    }
    addEnigViaArray(g, cofVias, -0.12, 0.04, 0.14, 0.06, mats.goldPlating, mats.velvetFlockTrap);

    // 12x 0201 MLCC power decoupling capacitors with bright reflowed solder fillets!
    for (let i = 0; i < 6; i++) {
      const cx = -4.4 + i * 1.76;
      addSmdPassiveWithFillets(
        g,
        0.84,
        0.44,
        0.3,
        cx,
        3.18,
        -0.24,
        mats.smdCeramic,
        mats.silverElectrode,
        mats.solderBallSilver
      );
      addSmdPassiveWithFillets(
        g,
        0.84,
        0.44,
        0.3,
        cx,
        1.88,
        -0.24,
        mats.smdCeramic,
        mats.silverElectrode,
        mats.solderBallSilver
      );
    }

    // Miniature 8-pin Serial Calibration ID EEPROM IC + silkscreen courtyard & laser lot lines
    addSilkscreenCourtyard(g, -2.1, 0.05, 2.88, 2.12, -0.12, 0.045, mats.invarScaleBar, 'tl');
    const eeprom = buildChipPackage({
      w: 2.55,
      d: 1.8,
      h: 0.36,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      axis: 'z',
    });
    eeprom.position.set(-2.1, 0.05, -0.28);
    g.add(eeprom);

    for (let k = 0; k < 3; k++) {
      addSmdPassiveWithFillets(
        g,
        0.68,
        0.36,
        0.24,
        1.05 + k * 1.05,
        0.48,
        -0.22,
        k === 2 ? mats.smdCeramic : mats.icEpoxy,
        mats.silverElectrode,
        mats.solderBallSilver
      );
    }

    // 5x gold factory optical calibration test points
    const tpGeo = hiResCyl(0.24, 0.24, 0.045, 12).rotateX(Math.PI / 2);
    for (let t = 0; t < 5; t++) {
      const tp = new THREE.Mesh(tpGeo, mats.goldPlating);
      tp.position.set(0.65 + t * 0.92, -0.58, -0.125);
      tp.userData.noEdges = true;
      g.add(tp);
    }

    // Horizontal Kapton fold-strain relief tape bar just above ZIF insertion line
    const strainBar = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 0.56, 0.05, 0.08, 0.01, 'z'),
      mats.matteBlackAnodized
    );
    strainBar.position.set(0, -2.28, -0.13);
    strainBar.userData.noEdges = true;
    g.add(strainBar);

    // 0.2mm brushed SUS304 stainless ZIF stiffener backing plate on +Z
    const stiffShape = new THREE.Shape();
    stiffShape.moveTo(-5.8, -2.0);
    stiffShape.lineTo(5.8, -2.0);
    stiffShape.lineTo(6.5, -2.5);
    stiffShape.lineTo(6.5, -3.55);
    stiffShape.lineTo(5.6, -3.75);
    stiffShape.lineTo(5.6, -4.65);
    stiffShape.lineTo(-5.6, -4.65);
    stiffShape.lineTo(-5.6, -3.75);
    stiffShape.lineTo(-6.5, -3.55);
    stiffShape.lineTo(-6.5, -2.5);
    stiffShape.closePath();
    const stiffener = new THREE.Mesh(
      extrudeHiRes(stiffShape, 0.22, 0.02, 0.02, 1, 12),
      mats.stainlessMachined
    );
    stiffener.position.z = 0.22;
    g.add(stiffener);

    // 30 ultra-fine gold ZIF contact fingers along distal mating tongue (-Z)
    const gfGeo = new THREE.BoxGeometry(0.18, 1.65, 0.06);
    for (let i = 0; i < 30; i++) {
      const gf = new THREE.Mesh(gfGeo, mats.goldPlating);
      gf.position.set(-5.05 + i * 0.348, -3.72, -0.13);
      gf.userData.noEdges = true;
      g.add(gf);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-fpc-decaps',
        48,
        '#d97706',
        g,
        new THREE.Vector3(0, 24.8, 5.45),
        new THREE.Vector3(-22, -26, 48),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E49. 4-Element Eyepiece Multi-Layer Dielectric AR Coating (ZEISS T* / Nano AR II)
  //      Strictly +0.055..0.079mm outside exact parent lens aspheric curves (0.000mm clash!)
  // =========================================================================
  {
    const g = new THREE.Group();

    const coatingSpecs: Array<{
      lensR: number;
      maxR: number;
      baseZ: number;
      sag: number;
      asph: number;
      signZ: -1 | 1;
      rimMat: THREE.Material;
    }> = [
      { lensR: 10.0, maxR: 9.7, baseZ: -15.4 - 0.75, sag: 1.15, asph: 0.18, signZ: -1, rimMat: mats.evfLensEd },
      { lensR: 10.0, maxR: 9.7, baseZ: -15.4 + 0.75, sag: 1.05, asph: -0.22, signZ: 1, rimMat: mats.fluorineCoatCyan },
      { lensR: 9.0, maxR: 8.65, baseZ: -9.4 - 1.575, sag: 1.1, asph: 0.12, signZ: -1, rimMat: mats.evfDichroicMirror },
      { lensR: 9.0, maxR: 8.65, baseZ: -9.4 + 2.135, sag: -0.45, asph: 0.08, signZ: 1, rimMat: mats.evfLensEd },
      { lensR: 8.8, maxR: 8.45, baseZ: -2.42 - 0.675, sag: -0.35, asph: 0.1, signZ: -1, rimMat: mats.fluorineCoatCyan },
      { lensR: 8.8, maxR: 8.45, baseZ: -2.42 + 0.675, sag: 0.78, asph: -0.22, signZ: 1, rimMat: mats.evfDichroicMirror },
    ];

    const steps = 16;
    const gap = 0.055;
    const thick = 0.022;
    const tickGeo = new THREE.BoxGeometry(0.08, 0.36, 0.02);

    for (const s of coatingSpecs) {
      const pts: THREE.Vector2[] = [];
      const uMax = s.maxR / s.lensR;
      const evalZ = (u: number) => s.baseZ + s.signZ * (s.sag * (1 - u * u) + s.asph * u * u * (1 - u * u));
      for (let i = 0; i <= steps; i++) {
        const u = (i / steps) * uMax;
        const r = Math.max(0.001, u * s.lensR);
        pts.push(new THREE.Vector2(r, evalZ(u) + s.signZ * gap));
      }
      for (let i = steps; i >= 0; i--) {
        const u = (i / steps) * uMax;
        const r = Math.max(0.001, u * s.lensR);
        pts.push(new THREE.Vector2(r, evalZ(u) + s.signZ * (gap + thick)));
      }
      const arGeo = markHiRes(new THREE.LatheGeometry(pts, 44));
      arGeo.rotateX(Math.PI / 2);
      arGeo.computeVertexNormals();
      const shell = new THREE.Mesh(arGeo, mats.lcdDbefIridescent);
      g.add(shell);

      // Contrasting ZEISS T* thin-film spectral interference rim band + quarter-wave phase zone ring!
      const rim = new THREE.Mesh(hiResTorus(s.maxR, 0.028, 8, 44), s.rimMat);
      rim.position.z = evalZ(uMax) + s.signZ * (gap + thick * 0.5);
      rim.userData.noEdges = true;

      const midU = uMax * 0.62;
      const zoneRing = new THREE.Mesh(hiResTorus(midU * s.lensR, 0.02, 6, 40), s.rimMat);
      zoneRing.position.z = evalZ(midU) + s.signZ * (gap + thick * 0.5);
      zoneRing.userData.noEdges = true;
      g.add(rim, zoneRing);

      // 4 orthogonal coating-chamber witness alignment ticks seated on the exact aspheric rim
      const tickZ = evalZ(uMax * 0.94) + s.signZ * (gap + thick * 0.5);
      for (let k = 0; k < 4; k++) {
        const a = (k * Math.PI) / 2;
        const tk = new THREE.Mesh(tickGeo, mats.goldPlating);
        tk.position.set(Math.cos(a) * (s.maxR - 0.32), Math.sin(a) * (s.maxR - 0.32), tickZ);
        tk.rotation.z = a + Math.PI / 2;
        tk.userData.noEdges = true;
        g.add(tk);
      }
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
  // E50. Optical Edge Blackening (Sumi-Nuri) & 6-Point Silicone Lens Potting Dots
  //      Strictly inside the 0.22mm annular gap between lens glass rim & cell inner bore!
  // =========================================================================
  {
    const g = new THREE.Group();

    const lensSpecs: Array<[number, number, number]> = [
      [-15.4, 10.07, 1.4], // G4 (glass R=10.00, cell innerR=10.22)
      [-9.12, 9.08, 3.4],  // G2/G3 doublet (glass R=9.00, cell innerR=9.24)
      [-2.42, 8.87, 1.24], // G1 (glass R=8.80, cell innerR=9.02)
    ];
    const dotGeo = hiResSphere(0.036, 10, 8);
    const haloGeo = hiResCyl(0.034, 0.034, 0.42, 10).rotateX(Math.PI / 2);
    const tickGeo = new THREE.BoxGeometry(0.035, 0.14, 0.56);

    for (const [lz, r, w] of lensSpecs) {
      // Matte carbon-black Sumi-Nuri cylindrical rim coating
      const inkBand = new THREE.Mesh(
        hiResCyl(r, r, w, 48, true).rotateX(Math.PI / 2),
        mats.velvetFlockTrap
      );
      inkBand.position.z = lz;
      g.add(inkBand);

      // Front & rear stepped brush-edge lacquer meniscus bevel rings catching oblique edge light
      for (const sz of [-w * 0.48, w * 0.48]) {
        const edgeBead = new THREE.Mesh(hiResTorus(r + 0.012, 0.026, 8, 48), mats.matteBlackAnodized);
        edgeBead.position.z = lz + sz;
        edgeBead.userData.noEdges = true;
        g.add(edgeBead);
      }

      // 6x 60°-spaced low-outgas translucent silicone potting beads + curing witness collars tucked in 0.04mm gap!
      for (let k = 0; k < 6; k++) {
        const a = (k * Math.PI) / 3 + 0.35;
        const dot = new THREE.Mesh(dotGeo, k % 2 === 0 ? mats.dustCatcherGel : mats.opticalCementClear);
        dot.scale.set(1.0, 1.0, 4.8);
        dot.position.set(Math.cos(a) * (r + 0.024), Math.sin(a) * (r + 0.024), lz);
        dot.userData.noEdges = true;

        const halo = new THREE.Mesh(haloGeo, mats.fluorineCoatCyan);
        halo.position.set(Math.cos(a) * (r + 0.028), Math.sin(a) * (r + 0.028), lz);
        halo.userData.noEdges = true;
        g.add(dot, halo);
      }

      // 4x optical centering datum silver witness lines painted at 90° intervals on Sumi-Nuri rim
      for (let k = 0; k < 4; k++) {
        const a = (k * Math.PI) / 2;
        const tk = new THREE.Mesh(tickGeo, k === 0 ? mats.goldPlating : mats.invarScaleBar);
        tk.position.set(Math.cos(a) * (r + 0.022), Math.sin(a) * (r + 0.022), lz);
        tk.rotation.z = a;
        tk.userData.noEdges = true;
        g.add(tk);
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
  // E51. Precision Blackened-Brass Inter-Lens Spacer Rings & 5–20μm Photo-Etched Shims
  // =========================================================================
  {
    const g = new THREE.Group();

    const ventGeo = createChamferedBoxGeo(0.55, 0.38, 0.24, 0.04, 0.015, 'z');
    const notchDotGeo = hiResCyl(0.11, 0.11, 0.17, 10).rotateX(Math.PI / 2);

    // Rear CNC lathe-turned blackened-brass inter-lens spacer (world Z in [-13.98, -13.12])
    const sp1 = createKnifeEdgeSpacerLathe(9.7, 11.35, 0.84, 3, mats.matteBlackAnodized);
    sp1.position.z = -13.55;
    g.add(sp1);
    // Bright CNC-machined brass front/rear precision optical seat chamfers + 4 radial air-vent slots!
    for (const dz of [-0.41, 0.41]) {
      const seat = new THREE.Mesh(hiResTorus(10.55, 0.04, 8, 48), mats.brassGear);
      seat.position.z = -13.55 + dz;
      seat.userData.noEdges = true;
      g.add(seat);
    }
    for (let v = 0; v < 4; v++) {
      const a = (v * Math.PI) / 2 + Math.PI / 4;
      const vt = new THREE.Mesh(ventGeo, mats.brassGear);
      vt.position.set(Math.cos(a) * 11.08, Math.sin(a) * 11.08, -13.55);
      vt.rotation.z = a;
      g.add(vt);
    }

    // Rear chemical photo-etched brass optical calibration shim with 3 thickness-code notched tabs (Z=-12.96)
    const shim1 = createHiResRingCell(9.8, 11.2, 0.14, mats.ultra.evfShimEtchedBrass, 0.015, 48);
    applyPlanarUVs(shim1.geometry, 22.4, 22.4, 'xy');
    shim1.position.z = -12.96;
    g.add(shim1);
    const tab1Geo = createChamferedBoxGeo(0.76, 0.62, 0.14, 0.08, 0.015, 'z');
    for (let k = 0; k < 3; k++) {
      const a = (k * Math.PI * 2) / 3 + 0.9;
      const tab = new THREE.Mesh(tab1Geo, mats.ultra.evfShimEtchedBrass);
      tab.position.set(Math.cos(a) * 11.48, Math.sin(a) * 11.48, -12.96);
      tab.rotation.z = a;
      tab.userData.noEdges = true;
      // Precision thickness-code punch dot on each shim tab (0.05 / 0.10 / 0.15 mm)
      const dot = new THREE.Mesh(notchDotGeo, mats.velvetFlockTrap);
      dot.position.set(Math.cos(a) * 11.55, Math.sin(a) * 11.55, -12.96);
      dot.userData.noEdges = true;
      g.add(tab, dot);
    }

    // Front CNC lathe-turned blackened-brass inter-lens spacer (world Z in [-5.78, -4.12])
    const sp2 = createKnifeEdgeSpacerLathe(9.05, 10.65, 1.62, 5, mats.matteBlackAnodized);
    sp2.position.z = -4.95;
    g.add(sp2);
    for (const dz of [-0.8, 0.8]) {
      const seat = new THREE.Mesh(hiResTorus(9.88, 0.04, 8, 48), mats.brassGear);
      seat.position.z = -4.95 + dz;
      seat.userData.noEdges = true;
      g.add(seat);
    }
    for (let v = 0; v < 4; v++) {
      const a = (v * Math.PI) / 2;
      const vt = new THREE.Mesh(ventGeo, mats.brassGear);
      vt.position.set(Math.cos(a) * 10.38, Math.sin(a) * 10.38, -4.95);
      vt.rotation.z = a;
      g.add(vt);
    }

    // Front chemical photo-etched brass optical calibration shim with 3 thickness-code outer tabs (Z=-3.96)
    const shim2 = createHiResRingCell(9.15, 10.5, 0.14, mats.ultra.evfShimEtchedBrass, 0.015, 48);
    applyPlanarUVs(shim2.geometry, 21.0, 21.0, 'xy');
    shim2.position.z = -3.96;
    g.add(shim2);
    const tab2Geo = createChamferedBoxGeo(0.72, 0.56, 0.14, 0.08, 0.015, 'z');
    for (const a of [1.2, 3.3, 5.2]) {
      const tab = new THREE.Mesh(tab2Geo, mats.ultra.evfShimEtchedBrass);
      tab.position.set(Math.cos(a) * 10.78, Math.sin(a) * 10.78, -3.96);
      tab.rotation.z = a;
      tab.userData.noEdges = true;
      const dot = new THREE.Mesh(notchDotGeo, mats.velvetFlockTrap);
      dot.position.set(Math.cos(a) * 10.84, Math.sin(a) * 10.84, -3.96);
      dot.userData.noEdges = true;
      g.add(tab, dot);
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
  //      World Z in [+0.58, +0.90] (pos z=0.76 -> local z in [-0.18, +0.14])
  // =========================================================================
  {
    const g = new THREE.Group();

    const holeCoords: Array<[number, number]> = [
      [-9.0, 7.0],
      [9.0, 7.0],
      [-9.0, -7.0],
      [9.0, -7.0],
    ];
    const maskShape = createFrameShape(21.0, 17.2, 2.0, 14.2, 10.8, 0.35);
    addCircleHoles(
      maskShape,
      holeCoords.map(([x, y]) => [x, y, 0.62] as [number, number, number])
    );
    const mask = new THREE.Mesh(
      extrudeHiRes(maskShape, 0.18, 0.02, 0.02, 2, 20),
      mats.velvetFlockTrap
    );
    g.add(mask);

    // 4 gleaming brass press-fit alignment datum bushings inside corner holes
    const bushGeo = createHiResRingCellGeo(0.6, 1.0, 0.23, 0.02, 18);
    for (const [hx, hy] of holeCoords) {
      const b = new THREE.Mesh(bushGeo, mats.brassGear);
      b.position.set(hx, hy, -0.01);
      g.add(b);
    }

    // Concentric stepped matte anti-glare light-trap baffle frames etched around the 4:3 aperture
    for (const [ow, oh, iw, ih] of [
      [18.8, 15.0, 18.2, 14.4],
      [16.8, 13.0, 16.2, 12.4],
    ] as Array<[number, number, number, number]>) {
      const rib = new THREE.Mesh(
        extrudeHiRes(createFrameShape(ow, oh, 1.0, iw, ih, 0.8), 0.04, 0.008, 0.008, 1, 16),
        mats.matteBlackAnodized
      );
      rib.position.z = -0.1;
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // True 30° inward-tapered razor knife-edge aperture bevel framing exact 13.8x10.4mm 4:3 viewport
    const hBevelProfile = new THREE.Shape();
    hBevelProfile.moveTo(0, -0.09);
    hBevelProfile.lineTo(0.16, -0.09);
    hBevelProfile.lineTo(0.16, 0.09);
    hBevelProfile.lineTo(0.03, 0.03);
    hBevelProfile.closePath();

    for (const sy of [-1, 1]) {
      const hBarGeo = extrudeHiRes(hBevelProfile, 14.2, 0.01, 0.01, 1, 8);
      hBarGeo.rotateY(Math.PI / 2);
      if (sy < 0) hBarGeo.scale(1, -1, 1);
      const hBar = new THREE.Mesh(hBarGeo, mats.matteBlackAnodized);
      hBar.position.set(0, sy * 5.2, 0.0);
      g.add(hBar);
    }
    for (const sx of [-1, 1]) {
      const vBarGeo = extrudeHiRes(hBevelProfile, 10.6, 0.01, 0.01, 1, 8);
      vBarGeo.rotateX(Math.PI / 2);
      if (sx < 0) vBarGeo.scale(-1, 1, 1);
      const vBar = new THREE.Mesh(vBarGeo, mats.matteBlackAnodized);
      vBar.position.set(sx * 6.9, 0, 0.0);
      g.add(vBar);
    }

    // Fine contrasting titanium knife-edge chamfer hairline + 4 corner 4:3 optical fiducials
    const knifeRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.3, 10.9, 0.36, 14.08, 10.68, 0.3), 0.035, 0.006, 0.006, 1, 12),
      mats.titaniumRivet
    );
    knifeRim.position.z = -0.105;
    knifeRim.userData.noEdges = true;
    g.add(knifeRim);

    for (const [fx, fy] of [
      [-7.65, 5.85],
      [7.65, 5.85],
      [-7.65, -5.85],
      [7.65, -5.85],
    ] as Array<[number, number]>) {
      addOpticalFiducial(g, fx, fy, -0.115, 0.22, 0.02, mats.goldPlating);
    }

    // 4 outward cantilevered CuBe2 spring-positioning fingers with gold embossed contact dimples!
    const fingerGeo = createChamferedBoxGeo(0.88, 1.78, 0.14, 0.12, 0.02, 'z');
    const dimpleGeo = hiResSphere(0.18, 10, 8);
    for (const sx of [-1, 1]) {
      for (const fy of [-4.6, 4.6]) {
        const finger = new THREE.Mesh(fingerGeo, mats.beCuSpring);
        finger.position.set(sx * 10.85, fy, 0.02);
        finger.rotation.y = sx * 0.12;
        finger.userData.noEdges = true;
        const dm = new THREE.Mesh(dimpleGeo, mats.goldPlating);
        dm.scale.set(0.6, 1.0, 0.5);
        dm.position.set(sx * 11.18, fy, -0.04);
        dm.userData.noEdges = true;
        g.add(finger, dm);
      }
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-field-mask',
        52,
        '#1e293b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 0.76),
        new THREE.Vector3(0, 22, 36),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E53. Zero-Backlash Split Lead-Screw Nut & Fluorinated Optical Damping Grease
  //      Coaxial on mirrored -X E12 lead screw (-14.80, 39.50, -9.40), innerR=1.08, outerR<=1.94!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front POM split flexural half-nut with machined shoulder + 4 axial flexural stress-relief slots
    const pomPts: THREE.Vector2[] = [
      new THREE.Vector2(1.08, -0.68),
      new THREE.Vector2(1.74, -0.68),
      new THREE.Vector2(1.74, 0.28),
      new THREE.Vector2(1.94, 0.34),
      new THREE.Vector2(1.94, 0.68),
      new THREE.Vector2(1.78, 0.74),
      new THREE.Vector2(1.08, 0.74),
      new THREE.Vector2(1.08, -0.68),
    ];
    const pomGeo = markHiRes(new THREE.LatheGeometry(pomPts, 36));
    pomGeo.rotateX(Math.PI / 2);
    pomGeo.computeVertexNormals();
    const nutFront = new THREE.Mesh(pomGeo, mats.pomGear);
    nutFront.position.z = 1.42;
    g.add(nutFront);

    // 4 machined axial split-flexure relief grooves & chamfered PTFE wear ribs on POM half-nut
    const slotGeo = new THREE.BoxGeometry(0.14, 0.32, 0.92);
    for (let k = 0; k < 4; k++) {
      const a = (k * Math.PI) / 2 + Math.PI / 4;
      const sl = new THREE.Mesh(slotGeo, mats.matteBlackAnodized);
      sl.position.set(Math.cos(a) * 1.68, Math.sin(a) * 1.68, 1.32);
      sl.rotation.z = a;
      sl.userData.noEdges = true;
      g.add(sl);
    }

    // 2 rearward interlocking anti-rotation axial keyway prongs with brass wear shoes!
    const prongGeo = createChamferedBoxGeo(0.46, 0.36, 1.85, 0.06, 0.02, 'z');
    const shoeGeo = new THREE.BoxGeometry(0.12, 0.3, 1.6);
    for (const sa of [Math.PI * 0.5, -Math.PI * 0.5]) {
      const prong = new THREE.Mesh(prongGeo, mats.pomGear);
      prong.position.set(Math.cos(sa) * 1.66, Math.sin(sa) * 1.66, 0.12);
      prong.rotation.z = sa;
      const shoe = new THREE.Mesh(shoeGeo, mats.brassGear);
      shoe.position.set(Math.cos(sa) * 1.86, Math.sin(sa) * 1.86, 0.12);
      shoe.rotation.z = sa;
      shoe.userData.noEdges = true;
      g.add(prong, shoe);
    }

    // Rear C3604 brass half-nut with machined hex wrench collar & knurled grease-groove band
    const brassPts: THREE.Vector2[] = [
      new THREE.Vector2(1.08, -0.72),
      new THREE.Vector2(1.88, -0.72),
      new THREE.Vector2(1.94, -0.62),
      new THREE.Vector2(1.94, -0.22),
      new THREE.Vector2(1.72, -0.15),
      new THREE.Vector2(1.72, 0.68),
      new THREE.Vector2(1.08, 0.68),
      new THREE.Vector2(1.08, -0.72),
    ];
    const brassGeo = markHiRes(new THREE.LatheGeometry(brassPts, 36));
    brassGeo.rotateX(Math.PI / 2);
    brassGeo.computeVertexNormals();
    const nutRear = new THREE.Mesh(brassGeo, mats.brassGear);
    nutRear.position.z = -1.42;
    const hexCollar = createHiResRingCell(1.12, 1.94, 0.44, mats.brassGear, 0.03, 6);
    hexCollar.position.z = -1.86;
    const rearGroove = new THREE.Mesh(hiResTorus(1.82, 0.06, 8, 30), mats.copperHeatSpreader);
    rearGroove.position.z = -1.66;
    rearGroove.userData.noEdges = true;
    g.add(nutRear, hexCollar, rearGroove);

    // 8x visible internal precision trapezoidal thread crests inside both split nut bores!
    const trGeo = hiResTorus(1.09, 0.042, 6, 22);
    for (const tz of [-1.92, -1.62, -1.32, -1.02, 1.02, 1.32, 1.62, 1.92]) {
      const tr = new THREE.Mesh(trGeo, tz < 0 ? mats.goldPlating : mats.pomGear);
      tr.position.z = tz;
      tr.userData.noEdges = true;
      g.add(tr);
    }

    // Dual precision stainless spring-seat thrust washers sandwiching the CuBe2 helical anti-backlash spring!
    const thrustGeo = createHiResRingCellGeo(1.14, 1.66, 0.1, 0.015, 24);
    for (const wz of [-0.78, 0.78]) {
      const tw = new THREE.Mesh(thrustGeo, mats.stainlessMachined);
      tw.position.z = wz;
      tw.userData.noEdges = true;
      g.add(tw);
    }
    const spreadSpring = new THREE.Mesh(
      markHiRes(createHelicalSpringGeometry(1.38, 1.56, 5.5, 0.115)),
      mats.beCuSpring
    );
    spreadSpring.userData.noEdges = true;
    g.add(spreadSpring);

    // Glossy translucent PFPE/PTFE fluorinated optical damping grease film + rounded end meniscus collars
    const greaseFilm = new THREE.Mesh(
      hiResCyl(1.12, 1.12, 4.05, 24, true).rotateX(Math.PI / 2),
      mats.opticalCementClear
    );
    greaseFilm.userData.noEdges = true;
    const menGeo = hiResTorus(1.14, 0.08, 8, 24);
    for (const gz of [-2.08, 2.08]) {
      const meniscus = new THREE.Mesh(menGeo, mats.opticalCementClear);
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
        new THREE.Vector3(-14.8, EVF_OPTICAL_Y, -9.4),
        new THREE.Vector3(-44, -28, 22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E54. Diopter Shaft Dual-Lip FKM Waterproof O-Ring Gland & PTFE Washer
  //      Mirrored to true Sony -X side, seated cleanly INSIDE E18 R=2.98 port (world X in [-18.35, -16.72]!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // High-res CNC lathe-turned SUS303 rotary-and-axial gland housing with radial grease grooves (hex collar facing OUTWARD -X!)
    const glandPts: THREE.Vector2[] = [
      new THREE.Vector2(1.16, -0.6),
      new THREE.Vector2(2.2, -0.6),
      new THREE.Vector2(2.3, -0.52),
      new THREE.Vector2(2.3, -0.36),
      new THREE.Vector2(2.08, -0.32),
      new THREE.Vector2(2.08, -0.14),
      new THREE.Vector2(2.38, -0.1),
      new THREE.Vector2(2.38, 0.22),
      new THREE.Vector2(2.08, 0.26),
      new THREE.Vector2(2.08, 0.44),
      new THREE.Vector2(2.35, 0.48),
      new THREE.Vector2(2.68, 0.52),
      new THREE.Vector2(2.68, 0.64),
      new THREE.Vector2(1.16, 0.64),
      new THREE.Vector2(1.16, -0.6),
    ];
    const glandGeo = markHiRes(new THREE.LatheGeometry(glandPts, 44));
    glandGeo.rotateZ(Math.PI / 2);
    glandGeo.computeVertexNormals();
    const gland = new THREE.Mesh(glandGeo, mats.stainlessMachined);
    g.add(gland);

    // Machined hexagonal wrench-flat collar + contrasting dark anodized chamfer face & brass seal retainer ring (facing -X)!
    const hexNut = createHiResRingCell(1.18, 2.72, 0.24, mats.titaniumRivet, 0.03, 6);
    hexNut.rotation.y = Math.PI / 2;
    hexNut.position.x = -0.52;
    const faceRing = createHiResRingCell(1.48, 2.28, 0.07, mats.brassGear, 0.015, 32);
    faceRing.rotation.y = Math.PI / 2;
    faceRing.position.x = -0.64;
    g.add(hexNut, faceRing);

    // 6 radial lubrication micro-relief notches around outer brass face ring (-X outward face)
    const notchGeo = new THREE.BoxGeometry(0.05, 0.14, 0.42);
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const n = new THREE.Mesh(notchGeo, mats.velvetFlockTrap);
      n.position.set(-0.68, Math.cos(a) * 1.88, Math.sin(a) * 1.88);
      n.rotation.x = a;
      n.userData.noEdges = true;
      g.add(n);
    }

    // Twin FKM fluororubber dual-lip waterproof O-rings + gleaming gold garter spring coils + outer static O-rings!
    const fkmGeo = hiResTorus(1.36, 0.22, 12, 32).rotateY(Math.PI / 2);
    const lipGeo = hiResTorus(1.14, 0.08, 8, 26).rotateY(Math.PI / 2);
    const garterGeo = hiResTorus(1.44, 0.045, 8, 28).rotateY(Math.PI / 2);
    const staticOGeo = hiResTorus(2.26, 0.13, 10, 32).rotateY(Math.PI / 2);
    for (const ox of [-0.34, 0.28]) {
      const oring = new THREE.Mesh(fkmGeo, mats.ultra.micRubberBootBlack);
      oring.position.x = ox;
      oring.userData.noEdges = true;
      const innerLip = new THREE.Mesh(lipGeo, mats.epdmGasket);
      innerLip.position.x = ox + (ox < 0 ? -0.12 : 0.12);
      innerLip.userData.noEdges = true;
      const garter = new THREE.Mesh(garterGeo, mats.beCuSpring);
      garter.position.x = ox + (ox < 0 ? -0.14 : 0.14);
      garter.userData.noEdges = true;
      const staticO = new THREE.Mesh(staticOGeo, mats.epdmGasket);
      staticO.position.x = ox;
      staticO.userData.noEdges = true;
      g.add(oring, innerLip, garter, staticO);
    }

    // Crisp white diagonal split-scarf PTFE low-friction anti-extrusion backup washer!
    const ptfeWash = new THREE.Mesh(
      createSplitScarfRingGeo(1.18, 1.56, 0.2, 0.1, 32).rotateY(Math.PI / 2),
      mats.lcdDiffuserMatte
    );
    ptfeWash.userData.noEdges = true;
    g.add(ptfeWash);

    // True DIN 6799 3-prong horseshoe retaining E-clip on inboard (+X) end (world X_max = -16.98, clear of E12 dialGear!)
    const eClip = new THREE.Mesh(
      createDin6799EClipGeo(1.16, 1.62, 0.11).rotateY(Math.PI / 2),
      mats.mountSpringSteel
    );
    eClip.position.x = 0.62;
    eClip.userData.noEdges = true;
    g.add(eClip);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-diopter-gland-seals',
        54,
        '#0ea5e9',
        g,
        new THREE.Vector3(-17.66, EVF_OPTICAL_Y, -15.6),
        new THREE.Vector3(-48, 8, -22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E55. 240Hz MIPI-DSI Shielded FPC, Ferrite Bead EMI Filter & Cu Ground Foil
  //      World Y in [19.0, 29.4], Z in [+8.66, +9.62] -> clear of E16 flex, E24 & E26!
  // =========================================================================
  {
    const g = new THREE.Group();

    const flexShape = new THREE.Shape();
    flexShape.moveTo(-4.4, 5.1);
    flexShape.lineTo(4.4, 5.1);
    flexShape.lineTo(5.1, 3.8);
    flexShape.lineTo(5.1, -3.8);
    flexShape.lineTo(4.5, -5.1);
    flexShape.lineTo(-4.5, -5.1);
    flexShape.lineTo(-5.1, -3.8);
    flexShape.lineTo(-5.1, 3.8);
    flexShape.closePath();

    const coreFpc = new THREE.Mesh(
      extrudeHiRes(flexShape, 0.14, 0.015, 0.015, 1, 14),
      mats.polyimideFpc
    );
    g.add(coreFpc);

    // Impedance-matched 100Ω differential MIPI-DSI silver-ink hatched EMI shield laminate jacket
    const shieldGeo = extrudeHiRes(createRoundedRectShape(9.4, 9.4, 0.6), 0.24, 0.02, 0.02, 1, 16);
    applyPlanarUVs(shieldGeo, 9.4, 9.4, 'xy');
    const jacket = new THREE.Mesh(shieldGeo, mats.ultra.evfMipiShieldMesh);
    g.add(jacket);

    // Routed 100Ω differential MIPI copper pairs + perimeter ENIG shielding via stitch fence!
    const mipiTraces: Array<[number, number, number, number]> = [];
    for (let i = -3; i <= 3; i++) {
      const tx = i * 1.15;
      mipiTraces.push([tx - 0.14, 4.4, tx - 0.14, -3.8]);
      mipiTraces.push([tx + 0.14, 4.4, tx + 0.14, -3.8]);
    }
    addCopperTraceRuns(g, mipiTraces, 0.075, 0.024, 0.135, mats.copperHeatSpreader);

    const mipiVias: Array<[number, number]> = [];
    for (let j = -3; j <= 3; j++) {
      mipiVias.push([-4.45, j * 1.15], [4.45, j * 1.15]);
    }
    addEnigViaArray(g, mipiVias, 0.135, 0.036, 0.14, 0.06, mats.goldPlating, mats.velvetFlockTrap);

    // 4x chamfered 0402 ferrite bead EMI chokes with bright solder fillets filtering 240Hz MIPI RF harmonics
    for (let i = -1.5; i <= 1.51; i += 1.0) {
      addSmdPassiveWithFillets(
        g,
        1.45,
        0.9,
        0.54,
        i * 2.05,
        3.35,
        0.36,
        mats.ferriteInductor,
        mats.silverElectrode,
        mats.solderBallSilver
      );
    }

    // 2x dual-lane differential Common-Mode Choke Coils with visible bifilar copper wire turns & solder fillets!
    const cmcCoreGeo = createChamferedBoxGeo(2.25, 1.75, 0.62, 0.18, 0.05, 'z');
    const cmcCoilGeo = new THREE.BoxGeometry(0.18, 1.28, 0.68);
    const cmcPadGeo = new THREE.BoxGeometry(0.42, 0.36, 0.64);
    for (const cx of [-2.3, 2.3]) {
      addSilkscreenCourtyard(g, cx, 1.05, 2.6, 2.1, 0.14, 0.045, mats.invarScaleBar, 'tl');
      const cmcCore = new THREE.Mesh(cmcCoreGeo, mats.ferriteInductor);
      cmcCore.position.set(cx, 1.05, 0.4);
      g.add(cmcCore);

      // 6 discrete bifilar copper turns wrapping ferrite core
      for (let t = -2; t <= 2; t++) {
        const turn = new THREE.Mesh(cmcCoilGeo, t % 2 === 0 ? mats.copperCoil : mats.goldPlating);
        turn.position.set(cx + t * 0.28, 1.05, 0.4);
        turn.userData.noEdges = true;
        g.add(turn);
      }
      for (const px of [-0.9, 0.9]) {
        for (const py of [-0.6, 0.6]) {
          const pad = new THREE.Mesh(cmcPadGeo, mats.solderBallSilver);
          pad.position.set(cx + px, 1.05 + py, 0.36);
          pad.userData.noEdges = true;
          g.add(pad);
        }
      }
    }

    // Conductive C1020 electrolytic copper grounding foil strap + brass mounting hole grommets + 8 spot welds!
    const cuShape = createRoundedRectShape(13.6, 2.4, 0.75);
    addCircleHoles(cuShape, [
      [-5.6, 0, 0.62],
      [5.6, 0, 0.62],
    ]);
    const cuGeo = extrudeHiRes(cuShape, 0.16, 0.015, 0.015, 1, 16);
    applyBoxUVs(cuGeo, 12);
    const cuFoil = new THREE.Mesh(cuGeo, mats.ultra.cfeCopperThermal);
    cuFoil.position.set(0, -2.55, 0.22);
    const gromGeo = createHiResRingCellGeo(0.6, 0.96, 0.22, 0.02, 18);
    for (const gx of [-5.6, 5.6]) {
      const gr = new THREE.Mesh(gromGeo, mats.goldPlating);
      gr.position.set(gx, -2.55, 0.22);
      g.add(gr);
    }
    const cuDimples = buildSpotWeldNuggets(
      [
        [-3.6, -2.15, 0.32],
        [-1.2, -2.15, 0.32],
        [1.2, -2.15, 0.32],
        [3.6, -2.15, 0.32],
        [-3.6, -2.95, 0.32],
        [-1.2, -2.95, 0.32],
        [1.2, -2.95, 0.32],
        [3.6, -2.95, 0.32],
      ],
      0.22,
      'z',
      mats.copperHeatSpreader,
      mats.goldPlating
    );
    g.add(cuFoil, cuDimples);

    // Distal SUS304 stiffener + 24 crisp gold MIPI-DSI connector contact fingers at bottom end
    const botStiff = new THREE.Mesh(
      createChamferedBoxGeo(9.0, 1.5, 0.18, 0.18, 0.02, 'z'),
      mats.stainlessMachined
    );
    botStiff.position.set(0, -4.35, -0.18);
    g.add(botStiff);

    const gfGeo = new THREE.BoxGeometry(0.2, 1.35, 0.06);
    for (let i = 0; i < 24; i++) {
      const gf = new THREE.Mesh(gfGeo, mats.goldPlating);
      gf.position.set(-4.02 + i * 0.35, -4.4, 0.16);
      gf.userData.noEdges = true;
      g.add(gf);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-mipi-ferrite-shield-fpc',
        55,
        '#6366f1',
        g,
        new THREE.Vector3(0, 24.4, 8.95),
        new THREE.Vector3(24, -30, 62),
        cp,
        0.24
      )
    );
  }

  return parts;
}
