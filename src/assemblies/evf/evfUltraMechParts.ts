import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  createFrameShape,
  createHelicalSpringGeometry,
  createRoundedRectShape,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildPhillipsScrew,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { EVF_OPTICAL_Y } from './evfParts';
import { createUltraRingGeo, finalizeStandaloneEvfUltraPart } from './evfUltraSemiParts';

/**
 * True DIN 6799 3-prong radial-entry horseshoe E-clip geometry (open side facing +X).
 * Grips shaft groove with 3 inward prongs (top, rear-center, bottom) + 2 outer prying lobes.
 */
function createDin6799EClipGeo(grooveR: number, outerR: number, depth: number): THREE.BufferGeometry {
  const s = new THREE.Shape();
  const openHalf = 0.84; // ~96° wide radial entry jaw facing +X so the 3 prongs read unmistakably!
  // Outer horseshoe spine (CCW from +openHalf to 2PI - openHalf)
  s.absarc(0, 0, outerR, openHalf, Math.PI * 2 - openHalf, false);
  // Bottom inner entry prong tip curving tightly into grooveR
  const botTipAng = Math.PI * 2 - openHalf - 0.14;
  const rMid = grooveR + (outerR - grooveR) * 0.68;
  s.lineTo(Math.cos(botTipAng) * grooveR, Math.sin(botTipAng) * grooveR);
  // Deep bottom crescent relief pocket
  s.absarc(0, 0, rMid, botTipAng - 0.16, Math.PI + 0.28, true);
  // Prominent central rear gripping prong touching grooveR at PI
  s.lineTo(-grooveR, -grooveR * 0.28);
  s.lineTo(-grooveR, grooveR * 0.28);
  // Deep top crescent relief pocket
  s.absarc(0, 0, rMid, Math.PI - 0.28, openHalf + 0.3, true);
  // Top inner entry prong tip curving tightly into grooveR
  const topTipAng = openHalf + 0.14;
  s.lineTo(Math.cos(topTipAng) * grooveR, Math.sin(topTipAng) * grooveR);
  s.closePath();
  return extrudeHiRes(s, depth, 0.014, 0.014, 1, 22);
}

/**
 * True 3D undulated sinusoidal wave spring washer (Smalley / SUS301 multi-crest wave ring).
 * Extrudes a closed rectangular cross-section along z(theta) = waveAmp * sin(waves * theta).
 */
function createTrueWaveSpringGeo(
  midR: number,
  radialW: number,
  axialT: number,
  waveAmp: number,
  waves: number,
  segs = 64
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
    // 4 vertices per ring cross-section: 0=in-top, 1=out-top, 2=out-bot, 3=in-bot
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
    // Top face (0-1)
    indices.push(a + 0, a + 1, b + 1, a + 0, b + 1, b + 0);
    // Outer face (1-2)
    indices.push(a + 1, a + 2, b + 2, a + 1, b + 2, b + 1);
    // Bottom face (2-3)
    indices.push(a + 2, a + 3, b + 3, a + 2, b + 3, b + 2);
    // Inner face (3-0)
    indices.push(a + 3, a + 0, b + 0, a + 3, b + 0, b + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return markHiRes(geo);
}

/**
 * True split C-collar friction drag shoe with axial relief saw-cut & twin radial tension ears.
 */
function createSplitCCollarGeo(
  innerR: number,
  outerR: number,
  depth: number,
  gapHalfAng = 0.14
): THREE.BufferGeometry {
  const s = new THREE.Shape();
  const earR = outerR + 0.24;
  // Start at top edge of radial tension ear
  s.moveTo(Math.cos(gapHalfAng) * innerR, Math.sin(gapHalfAng) * innerR);
  s.lineTo(Math.cos(gapHalfAng) * earR, Math.sin(gapHalfAng) * earR);
  s.lineTo(Math.cos(gapHalfAng + 0.16) * earR, Math.sin(gapHalfAng + 0.16) * earR);
  s.absarc(0, 0, outerR, gapHalfAng + 0.18, Math.PI * 2 - gapHalfAng - 0.18, false);
  s.lineTo(Math.cos(-gapHalfAng - 0.16) * earR, Math.sin(-gapHalfAng - 0.16) * earR);
  s.lineTo(Math.cos(-gapHalfAng) * earR, Math.sin(-gapHalfAng) * earR);
  s.lineTo(Math.cos(-gapHalfAng) * innerR, Math.sin(-gapHalfAng) * innerR);
  s.absarc(0, 0, innerR, Math.PI * 2 - gapHalfAng, gapHalfAng, true);
  s.closePath();
  return extrudeHiRes(s, depth, 0.025, 0.025, 2, 32);
}

/**
 * True CNC straight-knurled cylindrical collar (alternating fluted crests & roots).
 */
function createKnurledCollarGeo(
  rInner: number,
  rRoot: number,
  rCrest: number,
  depth: number,
  teeth = 24
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
  return extrudeHiRes(s, depth, 0.02, 0.02, 1, 8);
}

/**
 * Build maximum-detail standalone EVF purge/light-pipe/shutter, Eye-Control AF/ToF,
 * diopter micro-mechanics & Sony OEM top-deck/isolation parts (E91–E105).
 */
export function buildEvfUltraMechParts(mats: MaterialLibrary): CadPart[] {
  const cp = mats.clippingPlanes;
  const parts: CadPart[] = [];

  // =========================================================================
  // E91. Hermetic Dry-Nitrogen (N2) Optical-Chamber Purge Valve & Torque-Seal Plug
  //      Mounted FLUSH on solid -X E18 rear-upper wall (threads & torque seal facing OUTWARD -X!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Base hexagonal wrench shoulder flange seated flush on -X E18 wall (X in [-15.72, -15.14])
    const hexBase = new THREE.Mesh(hiResCyl(1.72, 1.72, 0.52, 6).rotateZ(Math.PI / 2), mats.titaniumRivet);
    hexBase.position.x = -0.26;
    g.add(hexBase);

    // Captive dual-lobe fluorosilicone O-ring seated cleanly in rear gland groove
    const oring = new THREE.Mesh(hiResTorus(1.48, 0.15, 12, 32).rotateY(Math.PI / 2), mats.epdmGasket);
    oring.position.x = -0.2;
    g.add(oring);

    // CNC external fine-pitch ISO 60° V-threaded titanium valve body facing -X outward!
    const threadPts: THREE.Vector2[] = [
      new THREE.Vector2(0.74, 0.5),
      new THREE.Vector2(1.38, 0.5),
    ];
    for (let t = 0; t < 5; t++) {
      const y0 = 0.54 + t * 0.19;
      threadPts.push(new THREE.Vector2(1.24, y0));
      threadPts.push(new THREE.Vector2(1.42, y0 + 0.085));
      threadPts.push(new THREE.Vector2(1.24, y0 + 0.17));
    }
    threadPts.push(
      new THREE.Vector2(1.14, 1.56),
      new THREE.Vector2(0.74, 1.56),
      new THREE.Vector2(0.74, 0.5)
    );
    const threadGeo = markHiRes(new THREE.LatheGeometry(threadPts, 32)).rotateZ(Math.PI / 2);
    threadGeo.computeVertexNormals();
    const threadBody = new THREE.Mesh(threadGeo, mats.titaniumRivet);
    g.add(threadBody);

    // Visible internal spring-loaded Schrader / poppet check-valve core (brass seat + coil + needle pin!)
    const brassSeat = new THREE.Mesh(
      createUltraRingGeo(0.4, 0.74, 0.34, 0.02, 22).rotateY(Math.PI / 2),
      mats.brassGear
    );
    brassSeat.position.x = -1.38;
    const poppetPin = new THREE.Mesh(hiResCyl(0.18, 0.24, 0.86, 14).rotateZ(Math.PI / 2), mats.stainlessMachined);
    poppetPin.position.x = -1.28;
    const checkSpring = new THREE.Mesh(
      markHiRes(createHelicalSpringGeometry(0.3, 0.62, 5, 0.055)).rotateY(Math.PI / 2),
      mats.mountSpringSteel
    );
    checkSpring.position.x = -1.04;
    checkSpring.userData.noEdges = true;
    g.add(brassSeat, poppetPin, checkSpring);

    // Knurled-rim chamfered M3 hex-socket tamper sealing cap + recessed hollow bore revealing brass Schrader core!
    const knurledCap = new THREE.Mesh(
      createKnurledCollarGeo(0.52, 1.08, 1.18, 0.42, 18).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    knurledCap.position.x = -1.82;
    const hexRecessRing = new THREE.Mesh(
      createUltraRingGeo(0.3, 0.52, 0.2, 0.015, 6).rotateY(Math.PI / 2),
      mats.matteBlackAnodized
    );
    hexRecessRing.position.x = -1.96;
    hexRecessRing.userData.noEdges = true;
    const valveTip = new THREE.Mesh(hiResCyl(0.14, 0.16, 0.34, 12).rotateZ(Math.PI / 2), mats.goldPlating);
    valveTip.position.x = -1.86;
    valveTip.userData.noEdges = true;
    const pressureBand = new THREE.Mesh(
      createUltraRingGeo(1.12, 1.22, 0.08, 0.01, 24).rotateY(Math.PI / 2),
      mats.brassGear
    );
    pressureBand.position.x = -1.56;
    pressureBand.userData.noEdges = true;
    g.add(knurledCap, hexRecessRing, valveTip, pressureBand);

    const spannerDotGeo = hiResCyl(0.15, 0.15, 0.1, 10).rotateZ(Math.PI / 2);
    for (const sz of [-0.82, 0.82]) {
      const sp = new THREE.Mesh(spannerDotGeo, mats.matteBlackAnodized);
      sp.position.set(-2.05, 0, sz);
      sp.userData.noEdges = true;
      g.add(sp);
    }

    // Authentic multi-segment crimson brush-stroke tamper-evident torque-seal witness stripe bridging cap to hex flat!
    for (const [bx, by, len, ang] of [
      [-1.7, 1.15, 0.68, -0.05],
      [-1.04, 1.38, 0.82, 0.35],
      [-0.4, 1.64, 0.52, 0.15],
    ] as Array<[number, number, number, number]>) {
      const bead = new THREE.Mesh(
        createChamferedBoxGeo(len, 0.26, 0.32, 0.08, 0.03, 'z'),
        mats.mountRedIndexDot
      );
      bead.position.set(bx, by, 0);
      bead.rotation.z = ang;
      bead.userData.noEdges = true;
      g.add(bead);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-barrel-n2-purge-valve',
        91,
        '#dc2626',
        g,
        new THREE.Vector3(-15.12, 46.2, -23.4),
        new THREE.Vector3(-36, 18, -24),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E92. Ambient RGB Photodiode (E30) PMMA TIR Light-Pipe & Cosine Diffuser Prism
  //      Low-profile brow-integrated TIR prism seated flush atop E30 & E18 brow plinth (-11.8, 55.40, -29.56)!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sleek low-profile optically clear L-bent PMMA light-pipe with sharp 45° TIR mirror prism bevel
    const lShape = new THREE.Shape();
    lShape.moveTo(-1.95, -0.26);
    lShape.lineTo(0.92, -0.26);
    lShape.lineTo(0.92, -0.78);
    lShape.lineTo(1.8, -0.78);
    lShape.lineTo(1.8, 0.08);
    lShape.lineTo(1.18, 0.7);
    lShape.lineTo(-1.95, 0.7);
    lShape.closePath();
    const pipeMesh = new THREE.Mesh(
      extrudeHiRes(lShape, 1.94, 0.04, 0.04, 2, 16).rotateY(-Math.PI / 2),
      mats.evfAntiFogGlass
    );
    g.add(pipeMesh);

    // 45° TIR protective silver-reflectance optical bevel cap & precision TIR air-gap standoff micro-ribs!
    const tirMirrorBevel = new THREE.Mesh(
      createChamferedBoxGeo(1.88, 0.08, 0.9, 0.02, 0.01, 'y'),
      mats.silverElectrode
    );
    tirMirrorBevel.position.set(0, 0.41, 1.5);
    tirMirrorBevel.rotation.x = Math.PI / 4;
    tirMirrorBevel.userData.noEdges = true;
    const airGapRibGeo = new THREE.BoxGeometry(0.08, 0.42, 0.14);
    for (const rx of [-0.94, 0.94]) {
      const agr = new THREE.Mesh(airGapRibGeo, mats.fluorineCoatCyan);
      agr.position.set(rx, -0.46, 1.36);
      agr.userData.noEdges = true;
      g.add(agr);
    }
    g.add(tirMirrorBevel);

    // Front milky PMMA cosine diffuser bezel + 4x2 sculpted optical micro-lenslet collector domes!
    const diffuser = new THREE.Mesh(
      createChamferedBoxGeo(2.14, 1.04, 0.2, 0.14, 0.025, 'z'),
      mats.lcdDiffuserMatte
    );
    diffuser.position.set(0, 0.22, -2.04);
    g.add(diffuser);

    const lensletGeo = hiResSphere(0.18, 10, 8);
    for (let ix = -1.5; ix <= 1.5; ix += 1) {
      for (const iy of [-0.22, 0.22]) {
        const dome = new THREE.Mesh(lensletGeo, mats.evfMlaGlass);
        dome.scale.set(1.0, 1.0, 0.45);
        dome.position.set(ix * 0.48, 0.22 + iy, -2.14);
        dome.userData.noEdges = true;
        g.add(dome);
      }
    }

    // 3-sided wrap-around matte-black anti-crosstalk jacket clip + twin snap-fit retention barbs & brass datum pins!
    const shroudTop = new THREE.Mesh(
      createChamferedBoxGeo(2.38, 0.16, 2.9, 0.08, 0.02, 'y'),
      mats.matteBlackAnodized
    );
    shroudTop.position.set(0, 0.82, -0.35);
    const topClipRib = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.07, 0.24), mats.stainlessMachined);
    topClipRib.position.set(0, 0.92, -0.35);
    topClipRib.userData.noEdges = true;
    g.add(shroudTop, topClipRib);

    const sideWallGeo = createChamferedBoxGeo(0.14, 1.06, 2.75, 0.04, 0.015, 'z');
    const barbGeo = createChamferedBoxGeo(0.24, 0.26, 0.42, 0.04, 0.015, 'z');
    const locPinGeo92 = hiResCyl(0.1, 0.1, 0.22, 10).rotateZ(Math.PI / 2);
    for (const sx of [-1.14, 1.14]) {
      const sw = new THREE.Mesh(sideWallGeo, mats.matteBlackAnodized);
      sw.position.set(sx, 0.24, -0.35);
      const barb = new THREE.Mesh(barbGeo, mats.mountPpsInsulator);
      barb.position.set(sx + Math.sign(sx) * 0.12, 0.3, 0.55);
      barb.userData.noEdges = true;
      const lp = new THREE.Mesh(locPinGeo92, mats.brassGear);
      lp.position.set(sx + Math.sign(sx) * 0.12, -0.05, -0.95);
      lp.userData.noEdges = true;
      g.add(sw, barb, lp);
    }

    // Double-lip ribbed EPDM brow weather-seal boot + lower E30 optical exit coupling gasket ring!
    for (const bz of [-1.86, -1.54]) {
      const lip = new THREE.Mesh(
        extrudeHiRes(createFrameShape(2.58, 1.4, 0.24, 2.06, 0.94, 0.14), 0.16, 0.02, 0.02, 1, 14),
        mats.epdmGasket
      );
      lip.position.set(0, 0.22, bz);
      g.add(lip);
    }
    const exitSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(2.14, 1.06, 0.16, 1.66, 0.62, 0.1), 0.14, 0.02, 0.02, 1, 12).rotateX(
        Math.PI / 2
      ),
      mats.epdmGasket
    );
    exitSeal.position.set(0, -0.78, 1.36);
    g.add(exitSeal);

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-ambient-light-pipe',
        92,
        '#7dd3fc',
        g,
        new THREE.Vector3(-11.8, 55.4, -29.56),
        new THREE.Vector3(-36, 24, -36),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E93. Eyepiece Blind Curtain (E19) Over-Center CuBe2 Snap Spring & Acoustic Bumpers
  //      Mirrored to -X flank opposite E19's +X manual shutter lever!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Stamped SUS304 vertical C-channel spine with 4 wide inspection/lightening windows revealing golden CuBe2 spring!
    const brkShape = createRoundedRectShape(0.68, 14.2, 0.12);
    for (const [wy, wh] of [
      [-4.1, 1.05],
      [-2.15, 1.45],
      [2.15, 1.45],
      [4.1, 1.05],
    ] as Array<[number, number]>) {
      const win = new THREE.Path();
      win.moveTo(-0.22, wy - wh * 0.5);
      win.lineTo(0.22, wy - wh * 0.5);
      win.lineTo(0.22, wy + wh * 0.5);
      win.lineTo(-0.22, wy + wh * 0.5);
      win.closePath();
      brkShape.holes.push(win);
    }
    const carrier = new THREE.Mesh(
      extrudeHiRes(brkShape, 0.18, 0.02, 0.02, 1, 14).rotateY(Math.PI / 2),
      mats.mountStainlessFlange
    );
    carrier.position.x = -0.28;
    g.add(carrier);

    // Contrasting gunmetal C-channel stiffening flange rails + stepped mounting collar bosses
    const flangeGeo = createChamferedBoxGeo(0.32, 11.4, 0.08, 0.03, 0.012, 'z');
    for (const fz of [-0.29, 0.29]) {
      const fl = new THREE.Mesh(flangeGeo, mats.kovarSeal);
      fl.position.set(-0.18, 0, fz);
      g.add(fl);
    }

    // Twin titanium countersunk mounting rivets + copper EMI grounding straps + central brass toggle-fulcrum pivot pin!
    const rivGeo = hiResCyl(0.22, 0.22, 0.42, 12).rotateZ(Math.PI / 2);
    const gndStrapGeo = createChamferedBoxGeo(0.24, 0.65, 0.62, 0.04, 0.015, 'z');
    for (const ry of [-5.25, 5.25]) {
      const riv = new THREE.Mesh(rivGeo, mats.titaniumRivet);
      riv.position.set(-0.24, ry, 0);
      riv.userData.noEdges = true;
      const gs = new THREE.Mesh(gndStrapGeo, mats.copperHeatSpreader);
      gs.position.set(-0.28, ry, 0);
      gs.userData.noEdges = true;
      g.add(riv, gs);
    }
    const pivotAxle = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.72, 14).rotateZ(Math.PI / 2), mats.brassGear);
    pivotAxle.position.set(-0.16, 0, 0);
    const pivotWasher = new THREE.Mesh(createUltraRingGeo(0.2, 0.36, 0.08, 0.01, 14).rotateY(Math.PI / 2), mats.goldPlating);
    pivotWasher.position.set(-0.4, 0, 0);
    g.add(pivotAxle, pivotWasher);

    // Bold double-leaf bowed Omega over-center bistable CuBe2 snap-action leaf spring + knife fulcrum!
    const snapShape = new THREE.Shape();
    snapShape.moveTo(-0.16, -5.05);
    snapShape.lineTo(-0.32, -5.05);
    snapShape.quadraticCurveTo(0.18, -2.4, -0.14, 0);
    snapShape.quadraticCurveTo(0.18, 2.4, -0.32, 5.05);
    snapShape.lineTo(-0.16, 5.05);
    snapShape.quadraticCurveTo(0.42, 2.4, 0.02, 0);
    snapShape.quadraticCurveTo(0.42, -2.4, -0.16, -5.05);
    snapShape.closePath();
    const snapSpring = new THREE.Mesh(
      extrudeHiRes(snapShape, 0.56, 0.02, 0.02, 1, 22),
      mats.beCuSpring
    );
    const fulcrum = new THREE.Mesh(
      createChamferedBoxGeo(0.26, 0.74, 0.64, 0.04, 0.02, 'z'),
      mats.matteBlackAnodized
    );
    fulcrum.position.set(-0.1, 0, 0);
    g.add(snapSpring, fulcrum);

    // Twin precision flanged bronze detent rollers with axle pins & gold contact dimples at equilibrium seats!
    const rollerGeo = hiResCyl(0.23, 0.23, 0.58, 16).rotateX(Math.PI / 2);
    const rollerAxleGeo = hiResCyl(0.11, 0.11, 0.72, 12).rotateX(Math.PI / 2);
    const dimpleGeo = hiResSphere(0.16, 10, 8);
    for (const sy of [-2.4, 2.4]) {
      const roller = new THREE.Mesh(rollerGeo, mats.brassGear);
      roller.position.set(0.22, sy, 0);
      const axle = new THREE.Mesh(rollerAxleGeo, mats.stainlessMachined);
      axle.position.set(0.22, sy, 0);
      axle.userData.noEdges = true;
      const dimp = new THREE.Mesh(dimpleGeo, mats.goldPlating);
      dimp.position.set(0.37, sy, 0);
      dimp.userData.noEdges = true;
      g.add(roller, axle, dimp);
    }

    // Upper & lower hollow-core triple-ribbed Shore-45A butyl acoustic shock bumpers + SUS retention cups!
    const bumperCupGeo = createChamferedBoxGeo(0.78, 0.24, 0.62, 0.05, 0.02, 'z');
    const bumperBodyShape = createFrameShape(0.74, 1.2, 0.16, 0.34, 0.56, 0.08);
    const bumperGeo = extrudeHiRes(bumperBodyShape, 0.54, 0.025, 0.025, 1, 14);
    const ribGeo = new THREE.BoxGeometry(0.12, 0.22, 0.6);
    for (const sy of [-6.42, 6.42]) {
      const cup = new THREE.Mesh(bumperCupGeo, mats.kovarSeal);
      cup.position.set(0.02, sy + Math.sign(sy) * 0.64, 0);
      const bump = new THREE.Mesh(bumperGeo, mats.butylDamperRubber);
      bump.position.set(0.04, sy, 0);
      g.add(cup, bump);
      for (const ry of [-0.34, 0, 0.34]) {
        const rb = new THREE.Mesh(ribGeo, mats.epdmGasket);
        rb.position.set(0.4, sy + ry, 0);
        rb.userData.noEdges = true;
        g.add(rb);
      }
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-shutter-detent-bumpers',
        93,
        '#d97706',
        g,
        new THREE.Vector3(-12.96, EVF_OPTICAL_Y, -30.15),
        new THREE.Vector3(-30, 4, -38),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E94. 850nm IR-LED Precision 0.1Ω Kelvin Current-Sense Shunts & ESD Zener Array
  //      (Double-sided contoured rigid-flex: +Z L-cut manganin shunts & Zeners + -Z Kelvin ground-return plane!)
  // =========================================================================
  {
    const g = new THREE.Group();

    const subPcbShape = createRoundedRectShape(16.4, 2.55, 0.55);
    addCircleHoles(subPcbShape, [
      [-7.35, 0, 0.42],
      [7.35, 0, 0.42],
    ]);
    const subPcbGeo = extrudeHiRes(subPcbShape, 0.2, 0.025, 0.025, 2, 16);
    const busPourGeo = new THREE.BoxGeometry(13.2, 0.32, 0.04);
    const backShieldPourGeo = createChamferedBoxGeo(11.6, 1.55, 0.032, 0.22, 0.005, 'z');
    const backKelvinPairGeo = new THREE.BoxGeometry(11.0, 0.12, 0.028);
    const backPadGeo = createChamferedBoxGeo(1.9, 1.1, 0.04, 0.12, 0.006, 'z');
    const termBlockGeo = createChamferedBoxGeo(0.56, 1.32, 0.24, 0.05, 0.02, 'z');
    const manganinGeo = createChamferedBoxGeo(1.16, 1.18, 0.14, 0.04, 0.015, 'z');
    const lCutHGeo = new THREE.BoxGeometry(0.46, 0.1, 0.04);
    const lCutVGeo = new THREE.BoxGeometry(0.1, 0.48, 0.04);
    const kelvinPadGeo = new THREE.BoxGeometry(0.32, 0.28, 0.06);
    const kelvinRouteGeo = new THREE.BoxGeometry(2.8, 0.09, 0.03);
    const flexGoldFingerGeo = new THREE.BoxGeometry(0.82, 0.18, 0.12);
    const viaGeo = hiResCyl(0.11, 0.11, 0.26, 8).rotateX(Math.PI / 2);
    const cathodeStripeGeo = new THREE.BoxGeometry(0.14, 0.52, 0.04);

    for (const sy of [-7.2, 7.2]) {
      const pcb = new THREE.Mesh(subPcbGeo, mats.sensorPcb);
      pcb.position.set(0, sy, 0);
      // Amber flex interconnect jumper tab on +X end with 4 exposed gold contact fingers on BOTH sides!
      const flexTab = new THREE.Mesh(
        createChamferedBoxGeo(1.6, 1.4, 0.09, 0.12, 0.015, 'z'),
        mats.polyimideFpc
      );
      flexTab.position.set(7.6, sy, -0.06);
      for (const fy of [-0.42, -0.14, 0.14, 0.42]) {
        const fg = new THREE.Mesh(flexGoldFingerGeo, mats.goldPlating);
        fg.position.set(7.85, sy + fy, -0.06);
        fg.userData.noEdges = true;
        g.add(fg);
      }
      // Heavy copper high-current LED feed bus pour (+Z) + backside (-Z) Kelvin ground-return & differential sense traces!
      const bus = new THREE.Mesh(busPourGeo, mats.copperHeatSpreader);
      bus.position.set(0, sy - Math.sign(sy) * 0.92, 0.12);
      bus.userData.noEdges = true;
      const backPour = new THREE.Mesh(backShieldPourGeo, mats.copperHeatSpreader);
      backPour.position.set(0, sy, -0.115);
      backPour.userData.noEdges = true;
      g.add(pcb, flexTab, bus, backPour);

      // Front (+Z) gold Kelvin Sense+/Sense- differential traces routing from shunts toward +X flex tail!
      for (const ky of [-0.46, 0.46]) {
        const kr = new THREE.Mesh(kelvinRouteGeo, mats.goldPlating);
        kr.position.set(5.95, sy + ky, 0.118);
        kr.userData.noEdges = true;
        g.add(kr);
      }

      // Backside (-Z) exposed gold Kelvin sense differential pair + thermal shunt drain islands (clearly visible from -Z!)
      for (const dy of [-0.42, 0.42]) {
        const pair = new THREE.Mesh(backKelvinPairGeo, mats.goldPlating);
        pair.position.set(0, sy + dy, -0.135);
        pair.userData.noEdges = true;
        g.add(pair);
      }
      for (const sx of [-4.25, 0, 4.25]) {
        const bp = new THREE.Mesh(backPadGeo, mats.goldPlating);
        bp.position.set(sx, sy, -0.132);
        bp.userData.noEdges = true;
        g.add(bp);
      }

      // Pair of authentic 4-terminal manganin-foil 0.100Ω Kelvin shunts with laser-trimmed L-cut calibration slot!
      for (const sx of [-4.25, 4.25]) {
        for (const tx of [-0.82, 0.82]) {
          const tb = new THREE.Mesh(termBlockGeo, mats.copperHybridBond);
          tb.position.set(sx + tx, sy, 0.22);
          g.add(tb);
        }
        const mang = new THREE.Mesh(manganinGeo, mats.matteBlackAnodized);
        mang.position.set(sx, sy, 0.23);
        // Visible laser-trimmed L-cut calibration notch on manganin alloy element!
        const lc1 = new THREE.Mesh(lCutVGeo, mats.silverElectrode);
        lc1.position.set(sx - 0.12, sy - 0.26, 0.31);
        lc1.userData.noEdges = true;
        const lc2 = new THREE.Mesh(lCutHGeo, mats.silverElectrode);
        lc2.position.set(sx + 0.08, sy - 0.04, 0.31);
        lc2.userData.noEdges = true;
        g.add(mang, lc1, lc2);

        // 4 separated gold Force+/Force-/Sense+/Sense- Kelvin terminals & micro-vias
        for (const kx of [-0.95, 0.95]) {
          for (const ky of [-0.52, 0.52]) {
            const kp = new THREE.Mesh(kelvinPadGeo, mats.goldPlating);
            kp.position.set(sx + kx, sy + ky, 0.13);
            kp.userData.noEdges = true;
            const kv = new THREE.Mesh(viaGeo, mats.goldPlating);
            kv.position.set(sx + kx * 1.25, sy + ky * 1.45, 0.02);
            kv.userData.noEdges = true;
            g.add(kp, kv);
          }
        }
      }

      // Twin glass-passivated SOD-523 bi-directional ESD Zener diodes (with cathode band) + 0201 RC filter!
      for (const zx of [-1.2, 1.2]) {
        const zener = buildSmdPassive(1.12, 0.56, 0.26, mats.icEpoxy, mats.silverElectrode, 'z');
        zener.position.set(zx, sy + 0.25, 0.22);
        const cBand = new THREE.Mesh(cathodeStripeGeo, mats.silverElectrode);
        cBand.position.set(zx + 0.24, sy + 0.25, 0.36);
        cBand.userData.noEdges = true;
        const rcCap = buildSmdPassive(0.68, 0.34, 0.2, mats.smdCeramic, mats.silverElectrode, 'z');
        rcCap.position.set(zx, sy - 0.45, 0.19);
        g.add(zener, cBand, rcCap);
      }
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-ir-led-shunt-esd',
        94,
        '#16a34a',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -26.68),
        new THREE.Vector3(-28, -16, -26),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E95. Gaze-Camera (E07) 5-Step Conical Knife-Edge 850nm IR Stray-Light Hood
  //      (5 tapering knife-edge louvers, inner baffle teeth, snap-fit latches, corner pins, 4:3 stop!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 5 progressively tapering knife-edge pyramidal louver steps alternating black anodized & flocked trap!
    const stepSpecs: Array<[number, number, number, number, number, boolean]> = [
      [7.48, 4.16, 6.45, 3.32, -0.24, false],
      [7.12, 3.92, 5.95, 2.96, -0.12, true],
      [6.76, 3.68, 5.45, 2.6, 0.0, false],
      [6.4, 3.44, 4.95, 2.24, 0.12, true],
      [6.04, 3.2, 4.45, 1.9, 0.24, false],
    ];
    for (const [ow, oh, iw, ih, py, isFlock] of stepSpecs) {
      const step = new THREE.Mesh(
        extrudeHiRes(createFrameShape(ow, oh, 0.42, iw, ih, 0.24), 0.1, 0.012, 0.012, 1, 14).rotateX(
          Math.PI / 2
        ),
        isFlock ? mats.velvetFlockTrap : mats.matteBlackAnodized
      );
      step.position.y = py;
      g.add(step);
    }

    // 4 external structural corner buttress ribs + titanium micro-locating alignment pins + twin side snap-fit latches!
    const ribGeo = createChamferedBoxGeo(0.28, 0.56, 0.28, 0.05, 0.015, 'y');
    const locPinGeo = hiResCyl(0.14, 0.14, 0.16, 10);
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const rib = new THREE.Mesh(ribGeo, mats.matteBlackAnodized);
        rib.position.set(sx * 3.46, -0.02, sz * 1.84);
        const pin = new THREE.Mesh(locPinGeo, mats.titaniumRivet);
        pin.position.set(sx * 3.46, 0.28, sz * 1.84);
        pin.userData.noEdges = true;
        g.add(rib, pin);
      }
    }
    const latchGeo = createChamferedBoxGeo(0.86, 0.34, 0.22, 0.04, 0.015, 'y');
    for (const sz of [-2.02, 2.02]) {
      const lat = new THREE.Mesh(latchGeo, mats.kovarSeal);
      lat.position.set(0, -0.1, sz);
      g.add(lat);
    }
    // Micro-serrated inner optical diffraction-baffle index teeth along top bezel
    const innerToothGeo = new THREE.BoxGeometry(0.14, 0.08, 0.16);
    for (let ix = -3; ix <= 3; ix++) {
      for (const sz of [-0.96, 0.96]) {
        const it = new THREE.Mesh(innerToothGeo, mats.invarScaleBar);
        it.position.set(ix * 0.58, 0.28, sz);
        it.userData.noEdges = true;
        g.add(it);
      }
    }

    // Bottom exit laser-cut 4:3 stainless rectangular field aperture stop + top EPDM light-seal lip
    const fieldStop = new THREE.Mesh(
      extrudeHiRes(createFrameShape(5.4, 2.9, 0.2, 3.56, 1.68, 0.1), 0.048, 0.008, 0.008, 1, 12).rotateX(
        Math.PI / 2
      ),
      mats.mountStainlessFlange
    );
    fieldStop.position.y = -0.32;
    const topGasket = new THREE.Mesh(
      extrudeHiRes(createFrameShape(6.16, 3.3, 0.3, 5.2, 2.38, 0.18), 0.07, 0.01, 0.01, 1, 14).rotateX(
        Math.PI / 2
      ),
      mats.epdmGasket
    );
    topGasket.position.y = 0.32;
    g.add(fieldStop, topGasket);

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-gaze-stray-light-hood',
        95,
        '#1e293b',
        g,
        new THREE.Vector3(0, 25.43, -23.6),
        new THREE.Vector3(-22, -32, -24),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E96. Gaze-Camera (E07) Die-Back Nickel-Silver RF EMI Micro-Can & Thermal Pad
  //      (Deep-drawn C7521 can + internal RF partition + dark absorber tray + 18 castellated solder teeth + gold dimples!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Deep-drawn lid with 3x5 honeycomb micro-perforated RF-waveguide thermal vent holes (Ø0.42mm << λ/20!)
    const lidShape = createRoundedRectShape(12.8, 8.4, 0.65);
    const ventHoles: Array<[number, number, number]> = [];
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        if (Math.abs(ix) === 1 && iz === 0) continue; // Keep center X-rib crisp!
        ventHoles.push([ix * 1.9, iz * 2.1, 0.26]);
      }
    }
    addCircleHoles(lidShape, ventHoles);
    const canLid = new THREE.Mesh(
      extrudeHiRes(lidShape, 0.2, 0.025, 0.025, 2, 16).rotateX(Math.PI / 2),
      mats.kovarSeal
    );
    canLid.position.y = -0.25;
    g.add(canLid);

    // Contrasting internal dark-ferrite RF absorber cavity floor + stepped analog/digital RF partition septum wall!
    const rfAbsorberFloor = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 0.08, 7.0, 0.35, 0.015, 'y'),
      mats.ferriteInductor
    );
    rfAbsorberFloor.position.y = -0.1;
    const rfPartition = new THREE.Mesh(
      createChamferedBoxGeo(0.26, 0.36, 7.1, 0.05, 0.02, 'y'),
      mats.stainlessMachined
    );
    rfPartition.position.set(-2.35, 0.09, 0);
    g.add(rfAbsorberFloor, rfPartition);

    // Embossed stiffening X-rib cross on underside (-Y) lid + drawn C7521 nickel-silver perimeter wall skirt!
    for (const ang of [0.46, -0.46]) {
      const xRib = new THREE.Mesh(
        createChamferedBoxGeo(9.4, 0.1, 0.56, 0.14, 0.02, 'y'),
        mats.stainlessMachined
      );
      xRib.position.y = -0.34;
      xRib.rotation.y = ang;
      xRib.userData.noEdges = true;
      g.add(xRib);
    }

    const canFence = new THREE.Mesh(
      extrudeHiRes(createFrameShape(12.8, 8.4, 0.65, 11.76, 7.36, 0.42), 0.44, 0.025, 0.025, 2, 16).rotateX(
        Math.PI / 2
      ),
      mats.kovarSeal
    );
    canFence.position.y = 0.04;
    g.add(canFence);

    // 18 authentic castellated snap-fit solder-fence castle teeth with gleaming gold/silver solder fillets + 8 internal grounding dimples!
    const toothLongGeo = createChamferedBoxGeo(1.05, 0.24, 0.32, 0.06, 0.02, 'y');
    const filletLongGeo = new THREE.BoxGeometry(1.16, 0.12, 0.4);
    const gndDimpleGeo = hiResSphere(0.18, 8, 6);
    for (const tx of [-4.6, -2.3, 0, 2.3, 4.6]) {
      for (const tz of [-4.16, 4.16]) {
        const tooth = new THREE.Mesh(toothLongGeo, mats.stainlessMachined);
        tooth.position.set(tx, 0.34, tz);
        const fil = new THREE.Mesh(filletLongGeo, mats.goldPlating);
        fil.position.set(tx, 0.41, tz);
        fil.userData.noEdges = true;
        g.add(tooth, fil);
      }
    }
    const toothSideGeo = createChamferedBoxGeo(0.32, 0.24, 1.05, 0.06, 0.02, 'y');
    const filletSideGeo = new THREE.BoxGeometry(0.4, 0.12, 1.16);
    for (const tz of [-2.4, 0, 2.4]) {
      for (const tx of [-6.36, 6.36]) {
        const tooth = new THREE.Mesh(toothSideGeo, mats.stainlessMachined);
        tooth.position.set(tx, 0.34, tz);
        const fil = new THREE.Mesh(filletSideGeo, mats.goldPlating);
        fil.position.set(tx, 0.41, tz);
        fil.userData.noEdges = true;
        g.add(tooth, fil);
      }
    }
    for (const gx of [-4.8, -1.6, 1.6, 4.8]) {
      for (const gz of [-3.55, 3.55]) {
        const gd = new THREE.Mesh(gndDimpleGeo, mats.beCuSpring);
        gd.scale.set(1.2, 0.7, 1.2);
        gd.position.set(gx, 0.28, gz);
        gd.userData.noEdges = true;
        g.add(gd);
      }
    }

    // 2-tier stepped pink 3.0 W/m·K silicone thermal gap pad + copper heat-slug sub-island + underside amber Kapton insulator
    const thermBase = new THREE.Mesh(
      createChamferedBoxGeo(7.2, 0.18, 5.4, 0.35, 0.03, 'y'),
      mats.thermalPadPink
    );
    thermBase.position.set(1.65, 0.04, 0);
    const thermTop = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 0.16, 3.6, 0.28, 0.03, 'y'),
      mats.thermalPadPink
    );
    thermTop.position.set(1.65, 0.2, 0);
    const analogSlug = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 0.22, 4.8, 0.22, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    analogSlug.position.set(-4.15, 0.08, 0);
    const kapton = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 0.07, 7.4, 0.45, 0.01, 'y'),
      mats.polyimideFpc
    );
    kapton.position.y = -0.4;
    kapton.userData.noEdges = true;
    g.add(thermBase, thermTop, analogSlug, kapton);

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-gaze-emi-micro-can',
        96,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 21.48, -22.7),
        new THREE.Vector3(0, -48, -26),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E97. Proximity ToF Eye-Sensor (E04) 940nm VCSEL Diffuser & Crosstalk Mask
  //      (ST AN5231 two-chamber barrier: T-profile septum + 19-lenslet hex VCSEL DOE + 940nm SPAD iris!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Laser-blackened etched stainless two-chamber optical interposer mask (Z in [-32.64, -32.56])
    const maskShape = createRoundedRectShape(13.4, 3.1, 0.45);
    addCircleHoles(maskShape, [
      [-3.2, 0, 1.02],
      [3.2, 0, 1.1],
    ]);
    const mask = new THREE.Mesh(
      extrudeHiRes(maskShape, 0.042, 0.005, 0.005, 1, 24),
      mats.matteBlackAnodized
    );
    g.add(mask);

    // Dual stepped chamfered stainless aperture bezel rings surrounding TX & RX chambers
    const txBezel = new THREE.Mesh(createUltraRingGeo(0.96, 1.24, 0.056, 0.008, 28), mats.mountStainlessFlange);
    txBezel.position.set(-3.2, 0, 0);
    const rxBezel = new THREE.Mesh(createUltraRingGeo(1.04, 1.32, 0.056, 0.008, 28), mats.mountStainlessFlange);
    rxBezel.position.set(3.2, 0, 0);
    g.add(txBezel, rxBezel);

    // Tall T-profile flocked optical crosstalk labyrinth septum wall + micro-baffle ribs + backside EPDM isolation rings!
    const septumCore = new THREE.Mesh(new THREE.BoxGeometry(0.46, 2.84, 0.072), mats.velvetFlockTrap);
    const septumCap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.34, 0.068), mats.velvetFlockTrap);
    septumCap.position.y = 1.25;
    const septumFoot = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.34, 0.068), mats.velvetFlockTrap);
    septumFoot.position.y = -1.25;
    septumCore.userData.noEdges = septumCap.userData.noEdges = septumFoot.userData.noEdges = true;
    g.add(septumCore, septumCap, septumFoot);

    const septumRibGeo = new THREE.BoxGeometry(0.1, 2.2, 0.076);
    for (const sx of [-0.42, 0.42]) {
      const sr = new THREE.Mesh(septumRibGeo, mats.invarScaleBar);
      sr.position.set(sx, 0, 0);
      sr.userData.noEdges = true;
      g.add(sr);
    }
    const backIsoGeo = createUltraRingGeo(1.18, 1.44, 0.024, 0.004, 24);
    for (const bx of [-3.2, 3.2]) {
      const iso = new THREE.Mesh(backIsoGeo, mats.epdmGasket);
      iso.position.set(bx, 0, 0.028);
      iso.userData.noEdges = true;
      g.add(iso);
    }

    // Left TX window: 19-element hexagonal honeycomb micro-lenslet VCSEL beam diffuser (DOE/MLA)!
    const txSub = new THREE.Mesh(hiResCyl(0.94, 0.94, 0.032, 24).rotateX(Math.PI / 2), mats.evfMlaGlass);
    txSub.position.set(-3.2, 0, 0);
    g.add(txSub);
    const hexLensGeo = hiResCyl(0.15, 0.17, 0.056, 6).rotateX(Math.PI / 2);
    const hexCoords: Array<[number, number]> = [[0, 0]];
    for (let k = 0; k < 6; k++) {
      const a = (k * Math.PI) / 3;
      hexCoords.push([Math.cos(a) * 0.36, Math.sin(a) * 0.36]);
      hexCoords.push([Math.cos(a) * 0.7, Math.sin(a) * 0.7]);
      const a2 = a + Math.PI / 6;
      hexCoords.push([Math.cos(a2) * 0.62, Math.sin(a2) * 0.62]);
    }
    for (const [hx, hy] of hexCoords) {
      const cell = new THREE.Mesh(hexLensGeo, mats.fluorineCoatCyan);
      cell.position.set(-3.2 + hx, hy, -0.008);
      cell.userData.noEdges = true;
      g.add(cell);
    }

    // Right RX window: stepped 940nm narrowband dielectric bandpass SPAD filter + AR micro-ring!
    const rxFilter = new THREE.Mesh(
      hiResCyl(1.02, 1.02, 0.048, 24).rotateX(Math.PI / 2),
      mats.evfIrWindowBlack
    );
    rxFilter.position.set(3.2, 0, 0);
    const rxArRing = new THREE.Mesh(createUltraRingGeo(0.72, 0.98, 0.056, 0.006, 24), mats.fluorineCoatCyan);
    rxArRing.position.set(3.2, 0, -0.004);
    rxArRing.userData.noEdges = true;
    g.add(rxFilter, rxArRing);

    // 4-corner etched gold optical wafer-alignment crosshairs + twin precision side mounting eyelet collars
    const fidGeo = new THREE.BoxGeometry(0.54, 0.1, 0.056);
    for (const sx of [-5.85, 5.85]) {
      for (const sy of [-0.92, 0.92]) {
        const fh = new THREE.Mesh(fidGeo, mats.goldPlating);
        fh.position.set(sx, sy, 0);
        fh.userData.noEdges = true;
        const fv = new THREE.Mesh(fidGeo, mats.goldPlating);
        fv.rotation.z = Math.PI / 2;
        fv.position.set(sx, sy, 0);
        fv.userData.noEdges = true;
        g.add(fh, fv);
      }
    }
    const sideEyeGeo = createUltraRingGeo(0.18, 0.34, 0.058, 0.006, 14);
    for (const sx of [-5.25, 5.25]) {
      const se = new THREE.Mesh(sideEyeGeo, mats.stainlessMachined);
      se.position.set(sx, 0, 0);
      g.add(se);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-tof-vcsel-diffuser',
        97,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 27.3, -32.6),
        new THREE.Vector3(0, -26, -54),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // E98. Diopter Guide-Rod (E10) Belleville Preload Discs & DIN 6799 E-Clips
  //      Mirrored coaxial with E10 rods at [-11.4, +6.8] and [+11.4, -6.8]!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Conical SUS301 Belleville disc spring profile (stacked back-to-back <> for progressive preload!)
    const bellevillePts: THREE.Vector2[] = [
      new THREE.Vector2(0.46, 0.11),
      new THREE.Vector2(1.18, -0.06),
      new THREE.Vector2(1.18, -0.15),
      new THREE.Vector2(0.46, 0.02),
      new THREE.Vector2(0.46, 0.11),
    ];
    const bellevilleGeo = markHiRes(new THREE.LatheGeometry(bellevillePts, 28)).rotateX(Math.PI / 2);
    bellevilleGeo.computeVertexNormals();

    const thrustGeo = createUltraRingGeo(0.48, 1.14, 0.14, 0.018, 28);
    const oilGrooveGeo = new THREE.BoxGeometry(0.62, 0.1, 0.16);
    const shimGeo = createUltraRingGeo(0.48, 0.94, 0.055, 0.01, 24);
    const sleeveGeo = createUltraRingGeo(0.45, 0.56, 0.62, 0.01, 20);
    // Prominent open-sided 3-prong DIN 6799 horseshoe E-clip (outerR=1.18 clearly frames inner shim!)
    const dinEClipGeo = createDin6799EClipGeo(0.44, 1.18, 0.12);

    const rodCoords: Array<[number, number]> = [
      [-11.4, 6.8],
      [11.4, -6.8],
    ];
    for (const [rx, ry] of rodCoords) {
      for (const sz of [-1, 1]) {
        const z0 = sz * 5.18;
        // 0. Inner precision chamfered retaining sleeve collar aligning stack concentrically
        const slv = new THREE.Mesh(sleeveGeo, mats.kovarSeal);
        slv.position.set(rx, ry, z0 + sz * 0.28);
        slv.userData.noEdges = true;
        g.add(slv);

        // 1. Oil-grooved sintered phosphor-bronze thrust washer with 4 radial lubrication channels
        const washer = new THREE.Mesh(thrustGeo, mats.brassGear);
        washer.position.set(rx, ry, z0);
        g.add(washer);
        for (let k = 0; k < 4; k++) {
          const a = (k * Math.PI) / 2;
          const og = new THREE.Mesh(oilGrooveGeo, mats.matteBlackAnodized);
          og.position.set(rx + Math.cos(a) * 0.8, ry + Math.sin(a) * 0.8, z0);
          og.rotation.z = a;
          og.userData.noEdges = true;
          g.add(og);
        }

        // 2. Back-to-back <> stacked pair of conical SUS301 Belleville disc preload springs!
        const disc1 = new THREE.Mesh(bellevilleGeo, mats.mountSpringSteel);
        disc1.position.set(rx, ry, z0 + sz * 0.2);
        if (sz < 0) disc1.rotation.y = Math.PI;
        const disc2 = new THREE.Mesh(bellevilleGeo, mats.mountSpringSteel);
        disc2.position.set(rx, ry, z0 + sz * 0.36);
        if (sz > 0) disc2.rotation.y = Math.PI;

        // 3. Precision stepped stainless calibration shim washer
        const shim = new THREE.Mesh(shimGeo, mats.goldPlating);
        shim.position.set(rx, ry, z0 + sz * 0.46);

        // 4. Authentic 3-prong DIN 6799 radial-entry horseshoe E-clip!
        const eClip = new THREE.Mesh(dinEClipGeo, mats.titaniumRivet);
        eClip.position.set(rx, ry, z0 + sz * 0.56);
        eClip.rotation.z = rx > 0 ? 0.35 : Math.PI + 0.35;
        g.add(disc1, disc2, shim, eClip);
      }
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-diopter-belleville-thrust',
        98,
        '#ca8a04',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -9.0),
        new THREE.Vector3(30, -14, -8),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E99. Diopter Lead-Screw Journal Viscous Friction Drag Shoe & Felt Dust Wiper
  //      Coaxial on mirrored -X lead screw (-14.80, 39.50, -1.92)!
  // =========================================================================
  {
    const g = new THREE.Group();

    // 1. TRUE split C-collar C5191 phosphor-bronze friction drag shoe with axial saw-cut & preload ears!
    const splitShoe = new THREE.Mesh(createSplitCCollarGeo(1.06, 1.82, 0.38, 0.16), mats.beCuSpring);
    splitShoe.position.z = -0.18;
    g.add(splitShoe);

    // Micro grip notches & titanium calibration micro-pins on bronze split-collar preload ears
    const earPinGeo = hiResCyl(0.09, 0.09, 0.44, 10).rotateX(Math.PI / 2);
    for (const sgn of [-1, 1]) {
      const ep = new THREE.Mesh(earPinGeo, mats.titaniumRivet);
      ep.position.set(1.88, sgn * 0.46, -0.18);
      ep.userData.noEdges = true;
      g.add(ep);
    }

    // 6 radial/diagonal silicone-grease micro-reservoir lubrication flutes machined around bronze race
    const fluteGeo = new THREE.BoxGeometry(0.12, 0.56, 0.42);
    for (let k = 0; k < 6; k++) {
      const a = 0.55 + (k * (Math.PI * 2 - 1.1)) / 5;
      const fl = new THREE.Mesh(fluteGeo, mats.dustCatcherGel);
      fl.position.set(Math.cos(a) * 1.44, Math.sin(a) * 1.44, -0.18);
      fl.rotation.z = a + 0.35;
      fl.userData.noEdges = true;
      g.add(fl);
    }

    // Translucent high-viscosity silicone damping-grease retention band
    const greaseRing = new THREE.Mesh(hiResTorus(1.44, 0.15, 10, 32), mats.dustCatcherGel);
    greaseRing.position.z = -0.18;
    greaseRing.userData.noEdges = true;
    g.add(greaseRing);

    // 2. TRUE 3D undulated 4-crest sinusoidal SUS301 wave spring washer (axial preload!)
    const waveSpring = new THREE.Mesh(
      createTrueWaveSpringGeo(1.78, 0.56, 0.08, 0.085, 4, 64),
      mats.mountSpringSteel
    );
    waveSpring.position.z = 0.12;
    g.add(waveSpring);

    // 3. High-density compressed wool-felt labyrinth dust wiper ring with stepped inner wiping lip
    const feltOuter = new THREE.Mesh(createUltraRingGeo(1.18, 1.98, 0.24, 0.035, 32), mats.lensFoamSeal);
    feltOuter.position.z = 0.34;
    const feltInnerLip = new THREE.Mesh(createUltraRingGeo(0.92, 1.24, 0.16, 0.02, 28), mats.epdmGasket);
    feltInnerLip.position.z = 0.36;
    g.add(feltOuter, feltInnerLip);

    // 4. DIN-471 style stainless retaining circlip with twin plier-lug eye-holes locking wiper stack!
    const circlip = new THREE.Mesh(createSplitCCollarGeo(1.22, 1.72, 0.08, 0.22), mats.kovarSeal);
    circlip.position.z = 0.5;
    circlip.rotation.z = Math.PI;
    const plierEyeGeo = createUltraRingGeo(0.08, 0.2, 0.1, 0.01, 12);
    for (const sy of [-0.52, 0.52]) {
      const pe = new THREE.Mesh(plierEyeGeo, mats.matteBlackAnodized);
      pe.position.set(-1.78, sy, 0.5);
      pe.userData.noEdges = true;
      g.add(pe);
    }
    g.add(circlip);

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-diopter-friction-drag',
        99,
        '#b45309',
        g,
        new THREE.Vector3(-14.8, EVF_OPTICAL_Y, -1.92),
        new THREE.Vector3(-40, -8, 12),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E100. Sony OEM Ref.313 (502790501 TOP CONNECT PLATE L (89100)) Stainless Bridge
  //       Seated FLUSH & angled (+0.225 rad) directly along solid -X sloped E36 shoulder!
  // =========================================================================
  {
    const g = new THREE.Group();
    const tiltWrap = new THREE.Group();
    tiltWrap.rotation.z = 0.225;
    g.add(tiltWrap);

    // Z-stepped stamped SUS304 structural tie-bridge with 2 round holes + 1 elongated oval datum slot!
    const bridgeShape = createRoundedRectShape(4.45, 15.0, 0.85);
    addCircleHoles(bridgeShape, [
      [0, -5.6, 0.68],
      [0, 5.6, 0.68],
    ]);
    // Authentic elongated oval datum alignment slot at center (0, 0)
    const ovalSlot = new THREE.Path();
    ovalSlot.absellipse(0, 0, 0.68, 1.08, 0, Math.PI * 2, true, 0);
    bridgeShape.holes.push(ovalSlot);

    const plate = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(bridgeShape, 0.56, 0.045, 0.045, 2, 18).rotateX(Math.PI / 2), 14),
      mats.kovarSeal
    );
    tiltWrap.add(plate);

    // Bent outer upturned L-reinforcement gusset flange + 2 down-turn shear-anchor tabs + welded copper EMI ground spring clip!
    const gusset = new THREE.Mesh(
      createChamferedBoxGeo(0.52, 0.72, 13.4, 0.14, 0.035, 'z'),
      mats.invarScaleBar
    );
    gusset.position.set(-2.12, 0.08, 0);
    const emiClip = new THREE.Mesh(
      createChamferedBoxGeo(0.72, 0.22, 3.2, 0.08, 0.02, 'y'),
      mats.beCuSpring
    );
    emiClip.position.set(-1.82, 0.39, 0);
    const emiDimple = new THREE.Mesh(hiResSphere(0.18, 10, 8), mats.goldPlating);
    emiDimple.position.set(-1.82, 0.53, 0);
    emiDimple.userData.noEdges = true;
    tiltWrap.add(gusset, emiClip, emiDimple);
    for (const tz of [-6.6, 6.6]) {
      const shearTab = new THREE.Mesh(
        createChamferedBoxGeo(1.6, 0.42, 0.42, 0.08, 0.03, 'z'),
        mats.kovarSeal
      );
      shearTab.position.set(0.5, -0.26, tz);
      tiltWrap.add(shearTab);
    }

    // Twin longitudinal embossed truss stiffening channels + recessed weight-relief pockets + dark laser-etched OEM plate!
    const beadGeo = createChamferedBoxGeo(0.62, 0.22, 10.2, 0.16, 0.03, 'y');
    for (const bx of [-1.12, 1.24]) {
      const bead = new THREE.Mesh(beadGeo, mats.stainlessMachined);
      bead.position.set(bx, 0.36, 0);
      tiltWrap.add(bead);
    }
    const pocketGeo = createChamferedBoxGeo(0.4, 0.09, 2.2, 0.08, 0.015, 'y');
    for (const pz of [-2.8, 2.8]) {
      const pk = new THREE.Mesh(pocketGeo, mats.matteBlackAnodized);
      pk.position.set(-1.12, 0.46, pz);
      pk.userData.noEdges = true;
      tiltWrap.add(pk);
    }
    const stampPlate = new THREE.Mesh(
      createChamferedBoxGeo(0.9, 0.08, 4.0, 0.08, 0.015, 'y'),
      mats.matteBlackAnodized
    );
    stampPlate.position.set(1.24, 0.47, 0);
    const stampTickGeo = new THREE.BoxGeometry(0.46, 0.04, 0.24);
    for (let i = -3; i <= 3; i++) {
      const st = new THREE.Mesh(stampTickGeo, mats.silverElectrode);
      st.position.set(1.24, 0.52, i * 0.48);
      st.userData.noEdges = true;
      tiltWrap.add(st);
    }
    tiltWrap.add(stampPlate);

    // 3x M1.7 gunmetal captive flanged Phillips screws (domed cross heads facing UP!) with serrated brass lock-washers!
    const washGeo = createKnurledCollarGeo(0.54, 0.96, 1.08, 0.1, 14).rotateX(Math.PI / 2);
    const lockGeo = hiResCyl(0.46, 0.44, 0.22, 12);
    for (const sz of [-5.6, 0, 5.6]) {
      const wash = new THREE.Mesh(washGeo, mats.brassGear);
      wash.position.set(0, 0.33, sz);
      const scr = buildPhillipsScrew(
        0.92,
        0.38,
        0.48,
        0.55,
        mats.titaniumRivet,
        mats.matteBlackAnodized,
        mats.kovarSeal
      );
      scr.rotation.x = Math.PI;
      scr.position.set(0, 0.38, sz);
      const loctite = new THREE.Mesh(lockGeo, mats.mountThreadLockBlue);
      loctite.position.set(0, -0.22, sz);
      loctite.userData.noEdges = true;
      tiltWrap.add(wash, scr, loctite);
    }

    // Twin stepped underside EPDM anti-chafe pads flanking central datum slot
    const padGeo = createChamferedBoxGeo(3.2, 0.14, 3.6, 0.3, 0.02, 'y');
    for (const pz of [-2.85, 2.85]) {
      const pad = new THREE.Mesh(padGeo, mats.epdmGasket);
      pad.position.set(0.1, -0.36, pz);
      pad.userData.noEdges = true;
      tiltWrap.add(pad);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oem-top-connect-plate',
        100,
        '#94a3b8',
        g,
        new THREE.Vector3(-12.2, 53.72, -12.6),
        new THREE.Vector3(-36, 36, -6),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E101. Sony OEM Ref.306 / 360 (750000493 TAPE 631S #25) Black Light-Shield Tape
  //       Applied FLUSH directly over E38 JK-1028 holder on solid -X front wall!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Contoured die-cut matte-black 631S #25 polyimide shield sheet extending smoothly up to y=+6.48 top-flap fold!
    const tapeShape = new THREE.Shape();
    tapeShape.moveTo(-3.15, -5.25);
    tapeShape.lineTo(-0.45, -5.25);
    tapeShape.absarc(0, -5.25, 0.45, Math.PI, 0, true); // Lower alignment datum cutout
    tapeShape.lineTo(3.15, -5.25);
    tapeShape.lineTo(3.15, 6.46);
    tapeShape.lineTo(-3.15, 6.46);
    tapeShape.closePath();
    const mainTape = new THREE.Mesh(
      extrudeHiRes(tapeShape, 0.12, 0.015, 0.015, 1, 14).rotateY(Math.PI / 2),
      mats.matteBlackAnodized
    );
    g.add(mainTape);

    // 3 embossed longitudinal conform-crease fold ribs + metallic silver service fold-guide index dashes (-X face)!
    const creaseGeo = createChamferedBoxGeo(0.09, 10.6, 0.42, 0.03, 0.015, 'z');
    for (const cz of [-1.85, 0, 1.85]) {
      const cr = new THREE.Mesh(creaseGeo, mats.evfHousingMg);
      cr.position.set(-0.08, 0.55, cz);
      cr.userData.noEdges = true;
      g.add(cr);
    }
    const dashGeo = new THREE.BoxGeometry(0.04, 0.72, 0.14);
    for (let dy = -3.8; dy <= 5.2; dy += 1.5) {
      const ds = new THREE.Mesh(dashGeo, mats.silverElectrode);
      ds.position.set(-0.11, dy, 2.55);
      ds.userData.noEdges = true;
      g.add(ds);
    }
    // Embossed Sony 631S batch/datum stripe visible on both faces
    const codeBar = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.15, 3.6), mats.invarScaleBar);
    codeBar.position.set(0.0, 2.8, 0);
    codeBar.userData.noEdges = true;
    g.add(codeBar);

    // +X Adhesive back face: exposed PSA border + authentic diagonal kiss-cut peel-split seam & liner alignment ticks!
    const psa = new THREE.Mesh(new THREE.BoxGeometry(0.05, 11.4, 6.3), mats.mylarInsulatorFilm);
    psa.position.set(0.09, 0.55, 0);
    psa.userData.noEdges = true;
    const psaBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(6.1, 11.1, 0.2, 5.25, 10.2, 0.14), 0.03, 0.005, 0.005, 1, 12).rotateY(
        Math.PI / 2
      ),
      mats.thermalTransferTape
    );
    psaBorder.position.set(0.125, 0.55, 0);
    psaBorder.userData.noEdges = true;
    // Diagonal kiss-cut release-liner peel-split groove + 6 liner print ticks on +X adhesive back!
    const kissCutDiag = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 6.4), mats.matteBlackAnodized);
    kissCutDiag.position.set(0.135, -0.4, 0);
    kissCutDiag.rotation.x = 0.52;
    kissCutDiag.userData.noEdges = true;
    const linerTickGeo = new THREE.BoxGeometry(0.045, 0.14, 0.72);
    for (let ly = -3.6; ly <= 4.4; ly += 1.6) {
      const lt = new THREE.Mesh(linerTickGeo, mats.silverElectrode);
      lt.position.set(0.132, ly, -1.65);
      lt.userData.noEdges = true;
      g.add(lt);
    }

    // Seamless curved bend-radius knuckle joining vertical sheet into 90° folded upper retention flap + bend perforations!
    const bendKnuckle = new THREE.Mesh(
      hiResCyl(0.13, 0.13, 6.26, 12).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    bendKnuckle.position.set(0.04, 6.48, 0);
    const topFlap = new THREE.Mesh(
      createChamferedBoxGeo(2.85, 0.12, 5.9, 0.14, 0.02, 'y'),
      mats.matteBlackAnodized
    );
    topFlap.position.set(1.46, 6.5, 0);
    const flapFoldLine = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.18, 5.85), mats.silverElectrode);
    flapFoldLine.position.set(0.06, 6.48, 0);
    flapFoldLine.userData.noEdges = true;
    const topFlapPsa = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.05, 5.3), mats.thermalTransferTape);
    topFlapPsa.position.set(1.46, 6.42, 0);
    topFlapPsa.userData.noEdges = true;
    g.add(psa, psaBorder, kissCutDiag, bendKnuckle, topFlap, flapFoldLine, topFlapPsa);

    // Sculpted curled amber non-adhesive service pull-tab ear with 3 tactile grip ridges & raised gold peel arrow!
    const pullTab = new THREE.Mesh(
      createChamferedBoxGeo(0.1, 2.25, 2.55, 0.04, 0.015, 'z'),
      mats.polyimideFpc
    );
    pullTab.position.set(-0.18, -3.9, -2.0);
    pullTab.rotation.y = 0.22;
    const gripRidgeGeo = new THREE.BoxGeometry(0.06, 1.55, 0.14);
    for (const gz of [-0.45, 0.0, 0.45]) {
      const gr = new THREE.Mesh(gripRidgeGeo, mats.copperHeatSpreader);
      gr.position.set(-0.23, -3.9, -1.6 + gz);
      gr.rotation.y = 0.22;
      gr.userData.noEdges = true;
      g.add(gr);
    }
    const arrow = new THREE.Mesh(hiResCyl(0.42, 0.42, 0.05, 3).rotateZ(Math.PI / 2), mats.goldPlating);
    arrow.position.set(-0.26, -3.9, -2.45);
    arrow.rotation.y = 0.22;
    arrow.userData.noEdges = true;
    g.add(pullTab, arrow);

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oem-kapton-shield-tape',
        101,
        '#18181b',
        g,
        new THREE.Vector3(-18.76, 35.4, 4.4),
        new THREE.Vector3(-44, 6, 18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E102. Sony OEM Ref.269 (501030701 TOP WP CUSHION F3) & Ref.51 Rear Crown Cushion
  //       Seated FLUSH onto E18 roof (Y=54.44), compact front brow & rear crown cushions clearing E30/E92 & E103/E41!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front-brow Ref.269 twin L/R contoured multi-density WP cushions along front roof edge (world Z in [+7.6, +9.8])!
    const browShape = new THREE.Shape();
    browShape.moveTo(-2.1, -1.05);
    browShape.lineTo(2.1, -1.05);
    browShape.lineTo(2.1, -0.35);
    browShape.absarc(2.1, 0, 0.35, -Math.PI / 2, Math.PI / 2, true); // Screw-boss clearance U-notch!
    browShape.lineTo(2.1, 1.05);
    browShape.lineTo(-2.1, 1.05);
    browShape.closePath();
    const browFoamGeo = extrudeHiRes(browShape, 0.54, 0.04, 0.04, 2, 14).rotateX(Math.PI / 2);
    const browCapGeo = createChamferedBoxGeo(3.4, 0.16, 1.72, 0.16, 0.025, 'y');
    const browRibGeo = new THREE.BoxGeometry(3.2, 0.12, 0.22);
    const browPetGeo = createChamferedBoxGeo(4.3, 0.07, 2.2, 0.16, 0.012, 'y');
    const releaseEarGeo = createChamferedBoxGeo(0.65, 0.06, 0.65, 0.1, 0.01, 'y');

    for (const sx of [-7.6, 6.2]) {
      const zFront = 18.7; // world Z = +8.70
      const foam = new THREE.Mesh(browFoamGeo, mats.lensFoamSeal);
      foam.position.set(sx, 0.02, zFront);
      if (sx < 0) foam.rotation.y = Math.PI;
      const cap = new THREE.Mesh(browCapGeo, mats.epdmGasket);
      cap.position.set(sx - Math.sign(sx) * 0.18, 0.34, zFront);
      const pet = new THREE.Mesh(browPetGeo, mats.mylarInsulatorFilm);
      pet.position.set(sx, -0.32, zFront);
      pet.userData.noEdges = true;
      const psa = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.05, 1.9), mats.thermalTransferTape);
      psa.position.set(sx, -0.38, zFront);
      psa.userData.noEdges = true;
      const ear = new THREE.Mesh(releaseEarGeo, mats.polyimideFpc);
      ear.position.set(sx + Math.sign(sx) * 1.6, -0.36, zFront + 1.15);
      ear.userData.noEdges = true;
      g.add(foam, cap, pet, psa, ear);

      for (const rz of [-0.52, 0, 0.52]) {
        const rr = new THREE.Mesh(browRibGeo, mats.butylDamperRubber);
        rr.position.set(sx - Math.sign(sx) * 0.18, 0.43, zFront + rz);
        rr.userData.noEdges = true;
        g.add(rr);
      }
    }

    // Rear-crown Ref.51 stepped weather-seal cushion (X in [-7.1, +8.1], clears -X brow E30/E92 cleanly!)
    const rearPetShape = createRoundedRectShape(15.2, 5.1, 0.55);
    addCircleHoles(rearPetShape, [
      [-6.4, 0, 0.36],
      [6.4, 0, 0.36],
    ]);
    const rearPet = new THREE.Mesh(
      extrudeHiRes(rearPetShape, 0.08, 0.012, 0.012, 1, 14).rotateX(Math.PI / 2),
      mats.mylarInsulatorFilm
    );
    rearPet.position.set(0.5, -0.36, -19.0);
    const rearFoam = new THREE.Mesh(
      createChamferedBoxGeo(14.6, 0.66, 4.8, 0.45, 0.06, 'y'),
      mats.lensFoamSeal
    );
    rearFoam.position.set(0.5, 0.01, -19.0);
    const rearPsa = new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.06, 4.3), mats.thermalTransferTape);
    rearPsa.position.set(0.5, -0.42, -19.0);
    rearPsa.userData.noEdges = true;
    const rearEyeGeo = createUltraRingGeo(0.36, 0.62, 0.1, 0.012, 14).rotateX(Math.PI / 2);
    for (const rx of [-5.9, 6.9]) {
      const re = new THREE.Mesh(rearEyeGeo, mats.brassGear);
      re.position.set(rx, -0.35, -19.0);
      g.add(re);
    }
    g.add(rearPet, rearFoam, rearPsa);

    // 5 sawtooth rain-gutter labyrinth compression ridges + twin transverse water-shedding drain channels
    const ridgeGeo = createChamferedBoxGeo(13.8, 0.16, 0.32, 0.08, 0.025, 'y');
    for (let i = -2; i <= 2; i++) {
      const r = new THREE.Mesh(ridgeGeo, mats.epdmGasket);
      r.position.set(0.5, 0.41, -19.0 + i * 0.86);
      r.userData.noEdges = true;
      g.add(r);
    }
    const drainBarGeo = new THREE.BoxGeometry(0.3, 0.14, 4.3);
    for (const dx of [-3.4, 4.4]) {
      const db = new THREE.Mesh(drainBarGeo, mats.butylDamperRubber);
      db.position.set(dx, 0.45, -19.0);
      db.userData.noEdges = true;
      g.add(db);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oem-brow-wp-cushions',
        102,
        '#3f3f46',
        g,
        new THREE.Vector3(0, 54.44, -10.0),
        new THREE.Vector3(0, 46, -20),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E103. Sony OEM Ref.307 (A5033450A SH-1035 FLEXIBLE BOARD) Top-Deck Sub-Flex Bridge
  //       MOVED COMPLETELY OFF MICROPHONE -> seated FLAT & FLUSH on E18 front-right roof terrace!
  //       World X in [-12.0, -4.1], Y in [54.22, 54.96], Z in [+0.2, +7.3]!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sculpted dual-layer amber-brown SH-1035 flexible board with precision alignment tooling holes
    const flexShape = new THREE.Shape();
    flexShape.moveTo(-3.9, -3.5);
    flexShape.lineTo(3.9, -3.5);
    flexShape.lineTo(4.2, -2.4);
    flexShape.lineTo(4.2, 2.8);
    flexShape.lineTo(2.4, 3.6);
    flexShape.lineTo(-2.8, 3.6);
    flexShape.lineTo(-3.9, 2.2);
    flexShape.closePath();
    addCircleHoles(flexShape, [
      [-3.15, -2.65, 0.38],
      [3.35, 2.25, 0.38],
    ]);
    const flexGeo = applyPlanarUVs(
      extrudeHiRes(flexShape, 0.16, 0.02, 0.02, 1, 16).rotateX(Math.PI / 2),
      8.1,
      7.1,
      'xz'
    );
    const flexBody = new THREE.Mesh(flexGeo, mats.ultra.evfOemFlexRibbon);
    g.add(flexBody);

    // Underside beveled black FR4 stiffener plate with 4 gold grounding via collars
    const stiffener = new THREE.Mesh(
      createChamferedBoxGeo(5.9, 0.16, 4.6, 0.28, 0.02, 'y'),
      mats.matteBlackAnodized
    );
    stiffener.position.set(0.2, -0.17, 0);
    g.add(stiffener);
    const stiffViaGeo = createUltraRingGeo(0.14, 0.28, 0.04, 0.005, 12).rotateX(Math.PI / 2);
    for (const [vx, vz] of [
      [-2.1, -1.6],
      [2.5, -1.6],
      [-2.1, 1.6],
      [2.5, 1.6],
    ] as Array<[number, number]>) {
      const sv = new THREE.Mesh(stiffViaGeo, mats.goldPlating);
      sv.position.set(vx, -0.255, vz);
      sv.userData.noEdges = true;
      g.add(sv);
    }

    // Authentic Sony SH-1035 stamped silver stainless RF shield / heatsink plate with stiffening emboss!
    const silverShield = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.22, 2.2, 0.24, 0.03, 'y'),
      mats.kovarSeal
    );
    silverShield.position.set(-1.35, 0.21, 0.48);
    const shieldEmboss = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 0.09, 1.15, 0.14, 0.02, 'y'),
      mats.stainlessMachined
    );
    shieldEmboss.position.set(-1.35, 0.34, 0.48);
    g.add(silverShield, shieldEmboss);

    // Hatched copper EMI ground-mesh zone & 10 serpentine copper signal traces routed across flex
    const traceGeo = new THREE.BoxGeometry(0.14, 0.04, 2.45);
    for (let i = -4; i <= 5; i++) {
      const tr = new THREE.Mesh(traceGeo, mats.copperHeatSpreader);
      tr.position.set(i * 0.46 - 0.2, 0.11, -0.2);
      tr.userData.noEdges = true;
      g.add(tr);
    }
    const hatchGeo = new THREE.BoxGeometry(2.6, 0.035, 0.12);
    for (let h = -2; h <= 2; h++) {
      const ht = new THREE.Mesh(hatchGeo, mats.copperHybridBond);
      ht.position.set(2.35, 0.115, 0.85 + h * 0.42);
      ht.rotation.y = 0.45;
      ht.userData.noEdges = true;
      g.add(ht);
    }

    // Row of 8 exposed gold edge contact fingers along +Z front tongue (signature SH-1035 gold contacts!)
    const goldFingerGeo = new THREE.BoxGeometry(0.32, 0.06, 1.05);
    for (let i = 0; i < 8; i++) {
      const gf = new THREE.Mesh(goldFingerGeo, mats.goldPlating);
      gf.position.set(-2.1 + i * 0.6, 0.12, 2.82);
      gf.userData.noEdges = true;
      g.add(gf);
    }

    // 16-pin 0.4mm fine-pitch B2B mezzanine receptacle with recessed mating cavity & stainless EMI armor clips!
    const b2bShell = new THREE.Mesh(
      extrudeHiRes(createFrameShape(4.85, 1.62, 0.14, 4.12, 0.92, 0.08), 0.42, 0.025, 0.025, 2, 14).rotateX(
        Math.PI / 2
      ),
      mats.zifIvoryPlastic
    );
    b2bShell.position.set(0.35, 0.31, -1.65);
    const b2bIsland = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.34, 0.38, 0.06, 0.02, 'y'),
      mats.zifIvoryPlastic
    );
    b2bIsland.position.set(0.35, 0.28, -1.65);
    g.add(b2bShell, b2bIsland);

    // Left & right stainless EMI hold-down armor side-clips on B2B connector
    const armorClipGeo = createChamferedBoxGeo(0.32, 0.44, 1.56, 0.05, 0.02, 'y');
    for (const sx of [-2.14, 2.84]) {
      const clip = new THREE.Mesh(armorClipGeo, mats.stainlessMachined);
      clip.position.set(sx, 0.31, -1.65);
      g.add(clip);
    }

    // Dual-row 16 gold spring contact pins + bright silver solder-fillet toes
    const pinGeo = new THREE.BoxGeometry(0.15, 0.34, 0.36);
    const b2bFilletGeo = new THREE.BoxGeometry(0.22, 0.12, 0.22);
    for (let i = 0; i < 8; i++) {
      for (const pz of [-2.38, -0.92]) {
        const pin = new THREE.Mesh(pinGeo, mats.goldPlating);
        pin.position.set(-1.45 + i * 0.51, 0.26, pz);
        pin.userData.noEdges = true;
        const fil = new THREE.Mesh(b2bFilletGeo, mats.solderBallSilver);
        fil.position.set(-1.45 + i * 0.51, 0.15, pz + Math.sign(pz + 1.65) * 0.22);
        fil.userData.noEdges = true;
        g.add(pin, fil);
      }
    }

    // 8x 0201 top-deck pull-up & ESD protection SMD passives + dark silkscreen border + 4 circular gold factory test pads!
    const smdFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(3.0, 1.85, 0.14, 2.82, 1.67, 0.08), 0.025, 0.004, 0.004, 1, 10).rotateX(
        Math.PI / 2
      ),
      mats.matteBlackAnodized
    );
    smdFrame.position.set(2.3, 0.12, 0.86);
    smdFrame.userData.noEdges = true;
    g.add(smdFrame);
    for (let i = 0; i < 4; i++) {
      const smd1 = buildSmdPassive(0.42, 0.24, 0.72, mats.smdCeramic, mats.silverElectrode, 'y');
      smd1.position.set(1.2 + i * 0.74, 0.22, 0.35);
      const smd2 = buildSmdPassive(0.42, 0.24, 0.72, mats.matteBlackAnodized, mats.silverElectrode, 'y');
      smd2.position.set(1.2 + i * 0.74, 0.22, 1.38);
      g.add(smd1, smd2);
    }
    const tpGeo = hiResCyl(0.18, 0.18, 0.06, 10);
    for (let i = 0; i < 4; i++) {
      const tp = new THREE.Mesh(tpGeo, mats.goldPlating);
      tp.position.set(-2.95 + i * 0.65, 0.12, 1.92);
      tp.userData.noEdges = true;
      g.add(tp);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oem-sh1035-top-flex',
        103,
        '#ea580c',
        g,
        new THREE.Vector3(-8.2, 54.48, 3.7),
        new THREE.Vector3(-40, 36, 16),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E104. Conductive Ni/Cu Fabric-Over-Foam (FOF) 360° EMI Grounding Gaskets
  //       Relocated FLUSH onto lower chassis EMI mating seams (opens 100% unobstructed cutaway view!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // True sculpted low-profile D-profile hollow-cored urethane FOF extrusion helper (arch facing outward!)
    const makeDProfileGeo = (w: number, h: number, len: number, flipX: boolean) => {
      const s = new THREE.Shape();
      const sgn = flipX ? -1 : 1;
      s.moveTo(0, -h * 0.5);
      s.bezierCurveTo(sgn * w * 1.15, -h * 0.45, sgn * w * 1.15, h * 0.45, 0, h * 0.5);
      s.closePath();
      const coreHole = new THREE.Path();
      coreHole.absellipse(sgn * w * 0.36, 0, w * 0.22, h * 0.24, 0, Math.PI * 2, true, 0);
      s.holes.push(coreHole);
      return extrudeHiRes(s, len, 0.03, 0.03, 2, 20);
    };

    // Strip 1 (-X solid right lower-wall EMI seam, glued flush against E18 X=-15.08 wall at world Y=31.0!)
    const rightFof = new THREE.Mesh(makeDProfileGeo(0.82, 1.95, 17.6, true), mats.conductiveNiCuFoam);
    rightFof.position.set(-15.36, 1.5, 1.2);
    const rightPsa = new THREE.Mesh(
      createChamferedBoxGeo(0.08, 1.65, 16.8, 0.03, 0.012, 'z'),
      mats.silverElectrode
    );
    rightPsa.position.set(-15.28, 1.5, 1.2);
    const rightHem = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.55, 17.2), mats.kovarSeal);
    rightHem.position.set(-15.24, 1.5, 1.2);
    rightHem.userData.noEdges = true;
    const psaEarR = new THREE.Mesh(
      createChamferedBoxGeo(0.06, 0.72, 1.15, 0.03, 0.01, 'z'),
      mats.polyimideFpc
    );
    psaEarR.position.set(-15.24, 2.25, 8.8);
    psaEarR.userData.noEdges = true;
    const stitchGeo = hiResCyl(0.11, 0.11, 0.09, 8).rotateZ(Math.PI / 2);
    for (let i = -3; i <= 3; i++) {
      const st = new THREE.Mesh(stitchGeo, mats.goldPlating);
      st.position.set(-15.2, 1.5, 1.2 + i * 2.35);
      st.userData.noEdges = true;
      g.add(st);
    }
    g.add(rightFof, rightPsa, rightHem, psaEarR);

    const pleatRGeo = createChamferedBoxGeo(0.1, 1.12, 0.18, 0.02, 0.01, 'z');
    for (let i = -5; i <= 5; i++) {
      for (const tilt of [0.28, -0.28]) {
        const pl = new THREE.Mesh(pleatRGeo, mats.stainlessMachined);
        pl.position.set(-16.06, 1.5, 1.2 + i * 1.44);
        pl.rotation.x = tilt;
        pl.userData.noEdges = true;
        g.add(pl);
      }
    }

    // Strip 2 (+X lower floor-edge EMI seam, strictly BELOW cutaway lenses at world Y=27.55, clear of E18 13.56 & E39!)
    const leftFof = new THREE.Mesh(makeDProfileGeo(0.76, 1.22, 17.2, false), mats.conductiveNiCuFoam);
    leftFof.position.set(13.84, -1.95, 1.5);
    const leftPsa = new THREE.Mesh(
      createChamferedBoxGeo(0.08, 1.02, 16.4, 0.03, 0.012, 'z'),
      mats.silverElectrode
    );
    leftPsa.position.set(13.76, -1.95, 1.5);
    const leftHem = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.42, 16.8), mats.kovarSeal);
    leftHem.position.set(13.72, -1.95, 1.5);
    leftHem.userData.noEdges = true;
    const psaEarL = new THREE.Mesh(
      createChamferedBoxGeo(0.06, 0.56, 1.05, 0.03, 0.01, 'z'),
      mats.polyimideFpc
    );
    psaEarL.position.set(13.72, -1.45, 8.9);
    psaEarL.userData.noEdges = true;
    for (let i = -3; i <= 3; i++) {
      const st = new THREE.Mesh(stitchGeo, mats.goldPlating);
      st.position.set(13.68, -1.95, 1.5 + i * 2.25);
      st.userData.noEdges = true;
      g.add(st);
    }
    g.add(leftFof, leftPsa, leftHem, psaEarL);

    const pleatLGeo = createChamferedBoxGeo(0.1, 0.72, 0.18, 0.02, 0.01, 'z');
    for (let i = -5; i <= 5; i++) {
      for (const tilt of [0.28, -0.28]) {
        const pl = new THREE.Mesh(pleatLGeo, mats.stainlessMachined);
        pl.position.set(14.48, -1.95, 1.5 + i * 1.4);
        pl.rotation.x = tilt;
        pl.userData.noEdges = true;
        g.add(pl);
      }
    }

    // 4 stamped multi-finger slotted CuBe2 EMI grounding saddle clips with gold contact dimples!
    const saddleBaseGeo = createChamferedBoxGeo(0.86, 1.28, 0.42, 0.06, 0.02, 'z');
    const fingerToothGeo = createChamferedBoxGeo(0.72, 0.28, 0.24, 0.04, 0.012, 'z');
    const dimpleGeo = hiResSphere(0.13, 8, 6);
    for (const [cx, cy, cz, dir] of [
      [-15.76, 1.5, -7.88, -1],
      [-15.76, 1.5, 10.28, -1],
      [14.24, -1.95, -7.38, 1],
      [14.24, -1.95, 10.38, 1],
    ] as Array<[number, number, number, number]>) {
      const sb = new THREE.Mesh(saddleBaseGeo, mats.beCuSpring);
      sb.position.set(cx, cy, cz);
      g.add(sb);
      for (const fy of [-0.38, 0, 0.38]) {
        const ft = new THREE.Mesh(fingerToothGeo, mats.beCuSpring);
        ft.position.set(cx + dir * 0.12, cy + fy, cz);
        ft.userData.noEdges = true;
        const dimp = new THREE.Mesh(dimpleGeo, mats.goldPlating);
        dimp.position.set(cx + dir * 0.42, cy + fy, cz);
        dimp.userData.noEdges = true;
        g.add(ft, dimp);
      }
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-barrel-fof-emi-gaskets',
        104,
        '#71717a',
        g,
        new THREE.Vector3(0, 29.5, -14.0),
        new THREE.Vector3(-38, -12, -14),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E105. 4-Point Silicone Shock-Isolation Grommets, Eyecup Anti-Rattle Wave Springs
  //       & Laser-Etched Factory Optical-Axis Fiducial + 3D 2D DataMatrix Plate
  //       Grommets raised flush to Y=24.64 under E75, wave springs centered on E27, QR plate mirrored to -X!
  // =========================================================================
  {
    const g = new THREE.Group();

    // 1. 4x Multi-Ribbed Shore-50A Silicone Shock Grommets + Knurled Brass Compression Limiters + Flanged Collars!
    const grommetPts: THREE.Vector2[] = [
      new THREE.Vector2(0.96, -0.44),
      new THREE.Vector2(1.98, -0.44),
      new THREE.Vector2(2.02, -0.28),
      new THREE.Vector2(1.78, -0.18),
      new THREE.Vector2(1.48, -0.08),
      new THREE.Vector2(1.48, 0.08),
      new THREE.Vector2(1.78, 0.18),
      new THREE.Vector2(2.02, 0.28),
      new THREE.Vector2(1.98, 0.44),
      new THREE.Vector2(0.96, 0.44),
      new THREE.Vector2(0.96, -0.44),
    ];
    const grommetGeo = markHiRes(new THREE.LatheGeometry(grommetPts, 28));
    grommetGeo.computeVertexNormals();
    const knurledLimGeo = createKnurledCollarGeo(0.68, 0.88, 0.96, 0.94, 16).rotateX(Math.PI / 2);
    const shoulderCollarGeo = createUltraRingGeo(0.68, 1.18, 0.1, 0.015, 18).rotateX(Math.PI / 2);
    const lockWashGeo = createKnurledCollarGeo(0.96, 1.38, 1.48, 0.08, 14).rotateX(Math.PI / 2);
    const radialRibGeo = new THREE.BoxGeometry(0.18, 0.72, 0.52);

    for (const [gx, gz] of [
      [-14.6, -11.5],
      [14.6, -11.5],
      [-14.6, 18.5],
      [14.6, 18.5],
    ] as Array<[number, number]>) {
      const grom = new THREE.Mesh(grommetGeo, mats.butylDamperRubber);
      grom.position.set(gx, -14.8, gz);
      const lim = new THREE.Mesh(knurledLimGeo, mats.brassGear);
      lim.position.set(gx, -14.8, gz);
      const shCollar = new THREE.Mesh(shoulderCollarGeo, mats.goldPlating);
      shCollar.position.set(gx, -14.29, gz);
      const wash = new THREE.Mesh(lockWashGeo, mats.stainlessMachined);
      wash.position.set(gx, -14.35, gz);
      wash.userData.noEdges = true;
      g.add(grom, lim, shCollar, wash);

      // 4 radial silicone vibration-decoupling stiffening ribs around each grommet waist
      for (let k = 0; k < 4; k++) {
        const a = (k * Math.PI) / 2 + Math.PI / 4;
        const rr = new THREE.Mesh(radialRibGeo, mats.epdmGasket);
        rr.position.set(gx + Math.cos(a) * 1.62, -14.8, gz + Math.sin(a) * 1.62);
        rr.rotation.y = -a;
        rr.userData.noEdges = true;
        g.add(rr);
      }
    }

    // 2. Left & Right 4-Wave Sinusoidal Eyecup Anti-Rattle Springs + Slotted POM Glide Shoes (aligned on E27 Z=-36.52!)
    const waveShape = new THREE.Shape();
    waveShape.moveTo(0, -6.2);
    waveShape.quadraticCurveTo(0.32, -4.65, 0, -3.1);
    waveShape.quadraticCurveTo(0.32, -1.55, 0, 0);
    waveShape.quadraticCurveTo(0.32, 1.55, 0, 3.1);
    waveShape.quadraticCurveTo(0.32, 4.65, 0, 6.2);
    waveShape.lineTo(0.14, 6.2);
    waveShape.quadraticCurveTo(0.46, 4.65, 0.14, 3.1);
    waveShape.quadraticCurveTo(0.46, 1.55, 0.14, 0);
    waveShape.quadraticCurveTo(0.46, -1.55, 0.14, -3.1);
    waveShape.quadraticCurveTo(0.46, -4.65, 0.14, -6.2);
    waveShape.closePath();
    const waveGeo = extrudeHiRes(waveShape, 0.62, 0.02, 0.02, 1, 24);
    const pomShoeGeo = createChamferedBoxGeo(0.26, 2.2, 0.66, 0.06, 0.02, 'z');
    const greaseSlotGeo = new THREE.BoxGeometry(0.1, 1.45, 0.14);
    const hookClipGeo = createChamferedBoxGeo(0.34, 0.56, 0.72, 0.06, 0.02, 'z');
    const microRivGeo = hiResCyl(0.14, 0.14, 0.38, 10).rotateZ(Math.PI / 2);

    for (const sx of [-1, 1]) {
      const wave = new THREE.Mesh(waveGeo, mats.mountSpringSteel);
      wave.position.set(sx * 16.26, 0, -20.52);
      if (sx < 0) wave.rotation.y = Math.PI;
      g.add(wave);

      for (const py of [-4.6, 4.6]) {
        const shoe = new THREE.Mesh(pomShoeGeo, mats.pomGear);
        shoe.position.set(sx * 16.46, py, -20.52);
        const slot = new THREE.Mesh(greaseSlotGeo, mats.matteBlackAnodized);
        slot.position.set(sx * 16.58, py, -20.52);
        slot.userData.noEdges = true;
        g.add(shoe, slot);
      }
      for (const hy of [-6.25, 0, 6.25]) {
        const hc = new THREE.Mesh(hookClipGeo, mats.kovarSeal);
        hc.position.set(sx * 16.36, hy, -20.52);
        const riv = new THREE.Mesh(microRivGeo, mats.brassGear);
        riv.position.set(sx * 16.42, hy, -20.52);
        riv.userData.noEdges = true;
        g.add(hc, riv);
      }
    }

    // 3. Laser-Etched Factory Optical-Axis Fiducial Crosshair & 3D 7x7 2D DataMatrix Calibration Plate!
    //    Mounted FLUSH on solid -X E18 upper flank at optical station Z=-9.8 (local z=+6.2, x=-15.38)!
    const qz = 6.2;
    const fidPlate = new THREE.Mesh(
      createChamferedBoxGeo(0.24, 3.6, 5.0, 0.08, 0.02, 'z'),
      mats.ultra.evfOledBackplaneQr
    );
    fidPlate.position.set(-15.38, 7.2, qz);
    const fidBezel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(5.25, 3.85, 0.3, 4.45, 3.05, 0.2), 0.18, 0.02, 0.02, 1, 16).rotateY(
        Math.PI / 2
      ),
      mats.invarScaleBar
    );
    fidBezel.position.set(-15.32, 7.2, qz);
    g.add(fidPlate, fidBezel);

    // 4 proud corner titanium micro-rivets securing Invar calibration frame
    const cornerRivGeo = hiResCyl(0.18, 0.18, 0.22, 14).rotateZ(Math.PI / 2);
    for (const ry of [-1.52, 1.52]) {
      for (const rz of [-2.22, 2.22]) {
        const cr = new THREE.Mesh(cornerRivGeo, mats.titaniumRivet);
        cr.position.set(-15.46, 7.2 + ry, qz + rz);
        cr.userData.noEdges = true;
        g.add(cr);
      }
    }

    // Calibrated optical bulls-eye ring + crimson vernier crosshair + 8 micro-tick scale marks (facing -X!)
    const bullRing = new THREE.Mesh(
      createUltraRingGeo(0.42, 0.56, 0.05, 0.008, 24).rotateY(Math.PI / 2),
      mats.mountRedIndexDot
    );
    bullRing.position.set(-15.53, 7.2, qz - 1.15);
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.1, 1.75), mats.mountRedIndexDot);
    crossH.position.set(-15.53, 7.2, qz - 1.15);
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.75, 0.1), mats.mountRedIndexDot);
    crossV.position.set(-15.53, 7.2, qz - 1.15);
    bullRing.userData.noEdges = crossH.userData.noEdges = crossV.userData.noEdges = true;
    g.add(bullRing, crossH, crossV);

    const tickHGeo = new THREE.BoxGeometry(0.05, 0.24, 0.06);
    const tickVGeo = new THREE.BoxGeometry(0.05, 0.06, 0.24);
    for (const d of [-0.72, -0.36, 0.36, 0.72]) {
      const th = new THREE.Mesh(tickHGeo, mats.matteBlackAnodized);
      th.position.set(-15.53, 7.2, qz - 1.15 + d);
      th.userData.noEdges = true;
      const tv = new THREE.Mesh(tickVGeo, mats.matteBlackAnodized);
      tv.position.set(-15.53, 7.2 + d, qz - 1.15);
      tv.userData.noEdges = true;
      g.add(th, tv);
    }

    // Genuine 3D laser-etched 7x7 2D DataMatrix ECC200 checkerboard pattern + bottom serial barcode!
    const qrBitGeo = new THREE.BoxGeometry(0.055, 0.22, 0.22);
    const dmPattern = [
      [1, 0, 1, 0, 1, 0, 1],
      [1, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 1, 0, 0, 1, 1, 0],
      [1, 0, 1, 0, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (dmPattern[r][c] === 1) {
          const bit = new THREE.Mesh(qrBitGeo, mats.matteBlackAnodized);
          bit.position.set(-15.53, 7.35 + (3 - r) * 0.25, qz + 1.05 + (c - 3) * 0.25);
          bit.userData.noEdges = true;
          g.add(bit);
        }
      }
    }
    const serialBarGeo = new THREE.BoxGeometry(0.05, 0.2, 0.1);
    for (let sb = 0; sb < 10; sb++) {
      const bar = new THREE.Mesh(serialBarGeo, mats.matteBlackAnodized);
      bar.position.set(-15.53, 6.08, qz + sb * 0.22);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-chassis-iso-grommets-fiducial',
        105,
        '#f43f5e',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -16.0),
        new THREE.Vector3(-38, -24, -26),
        cp,
        0.26
      )
    );
  }

  return parts;
}
