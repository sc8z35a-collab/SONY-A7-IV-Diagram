import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createHelicalSpringGeometry,
  createOpticalLensGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  createSpurGearGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { LENS_EXPLANATIONS } from './lensExplanations';

export interface LensDynamicRig {
  irisBlades: THREE.Group[];
  irisCamRing: THREE.Object3D;
  focusGroupAParts: CadPart[];
  focusGroupBParts: CadPart[];
  moverCarriages: THREE.Group[];
  focusRingMesh: THREE.Object3D;
  mfEncoderWheel: THREE.Object3D;
  apertureHallRotor: THREE.Object3D;
  applyDynamics: (
    elapsed: number,
    physicsActive: boolean,
    explodeFactor: number,
    integrated: boolean
  ) => void;
}

function createRingShape(outerR: number, innerR: number): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

function createCutawayArcRingShape(
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

function createCircularRectWindowShape(
  outerR: number,
  winW: number,
  winH: number,
  cornerR: number
): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hw = winW / 2;
  const hh = winH / 2;
  const r = Math.min(cornerR, hw, hh);
  const hole = new THREE.Path();
  hole.moveTo(-hw + r, -hh);
  hole.lineTo(hw - r, -hh);
  hole.absarc(hw - r, -hh + r, r, -Math.PI / 2, 0, false);
  hole.lineTo(hw, hh - r);
  hole.absarc(hw - r, hh - r, r, 0, Math.PI / 2, false);
  hole.lineTo(-hw + r, hh);
  hole.absarc(-hw + r, hh - r, r, Math.PI / 2, Math.PI, false);
  hole.lineTo(-hw, -hh + r);
  hole.absarc(-hw + r, -hh + r, r, Math.PI, Math.PI * 1.5, false);
  s.holes.push(hole);
  return s;
}

function createLensCellRing(
  innerR: number,
  outerR: number,
  depth: number,
  mat: THREE.Material,
  curveSegments = 36
): THREE.Mesh {
  const shape = createRingShape(outerR, innerR);
  return new THREE.Mesh(extrudeCentered(shape, depth, 0.12, 0.12, curveSegments), mat);
}

function finalizeLensPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  integratedExplodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.22
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

  return {
    id,
    subsystem: 'lens',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: LENS_EXPLANATIONS[id],
  };
}

/**
 * Build ALL 40 ultra-detailed watchmaker-grade CAD sub-assemblies of a 2024-2026 Flagship
 * 50mm F1.2 Prime Lens (Full 14-Element / 10-Group Optical Stack + Quad XD Linear AF +
 * 4-Layer 11-Blade Iris + Thermal & Hall Sensors + 6-Stage Seals + Micron Mount Shims):
 *  L01: Bayonet Lock Cylindrical Lens Hood & Lock Button
 *  L02: φ72mm Filter Thread Bezel & Spanner Retaining Ring
 *  L03: Front-Group 3-Point Eccentric Tilt & Centering Collar
 *  L04: E01 (G1) Large-Diameter 0.01um 1st XA Front Element + Nano AR II
 *  L05: E02 (G2) High-Index Lanthanum Positive Meniscus & Brass Spacer
 *  L06: E03 (G3a) Super-ED Positive Front Element (Doublet Front)
 *  L07: E04 (G3b) High-Dispersion Flint Cemented Mate & UV Optical Seam
 *  L08: E05 (G4) Pre-Iris Biconcave Petzval Field Flattener
 *  L09: 11-Blade Iris Slotted Cam Actuating Ring & Brass Sector Gear
 *  L10: 11-Blade Circular Carbon Iris Diaphragm Blades (Live F1.2 <-> F11)
 *  L11: Stationary Iris Pivot-Pin Base Plate & Stray-Light Shield
 *  L12: Silent 1/64 Micro-Stepping Iris Actuator Motor & POM Gear Train
 *  L13: E06 (G5a) Floating Focus Group A Front Biconvex Element
 *  L14: E07 (G5b) Floating Focus Group A Main Carrier & 2nd XA Aspheric
 *  L15: E08 (G5c) Floating Focus Group A Rear Negative Corrector
 *  L16: Quad XD Linear Motor Stators: 8x N52 Neodymium Bars & Flux Yokes
 *  L17: Quad XD Linear Motor Movers: 4x OFC Flat-Wire Copper Coils
 *  L18: XD Linear Rail Preload Springs, POM Sliders & Silicone End-Dampers
 *  L19: 4x Centerless-Ground Titanium Guide Shafts & End-Ring Cage
 *  L20: 4x Sub-Micron MR Magnetic Position Encoders & Scale Strips
 *  L21: Internal Fixed TSC/Magnesium Structural Skeleton Barrel (Cutaway)
 *  L22: E09 (G6a) Floating Focus Group B Front ED Positive Mate
 *  L23: E10 (G6b) Floating Focus Group B Main Carrier & Rear Negative Aspheric
 *  L24: E11 (G7) Rear Negative Field-Curvature Flattener Element
 *  L25: E12 (G8) High-Index Lanthanum Sagittal Coma Corrector Lens
 *  L26: E13 (G9) Large-Diameter φ45mm Rear Telecentric Meniscus Element
 *  L27: E14 (G10) φ44mm 3rd XA Rear Hero Element
 *  L28: Rear 3:2 Rectangular Stray-Light Flare Mask & Flocked Baffle
 *  L29: Internal Precision NTC Thermistor Focus-Shift Compensation Sensor
 *  L30: Circular Ring HDI 32-Bit AF MCU & 4ch H-Bridge Driver PCB
 *  L31: Multi-Branch High-Flex Polyimide Internal FPC Ribbon Harness
 *  L32: Non-Contact Optical Slotted Linear-Response MF Encoder Wheel
 *  L33: Aperture Ring Non-Contact Magnetic Hall Sensor & Multi-Pole Rotor
 *  L34: Switchable Steel-Ball Spring Click / De-Click Detent Cam Mechanism
 *  L35: Weather-Sealed Side Control Pod Tactile Switch PCB
 *  L36: 6-Stage Weather-Sealing EPDM O-Rings & Wiper-Lip Gaskets
 *  L37: Knurled Rubber Focus Ring & Machined Aluminum Aperture Ring
 *  L38: Weather-Sealed Magnesium/Anodized Outer Cutaway Barrel
 *  L39: Infinity-Focus Micron Brass & Stainless Mount Calibration Shims
 *  L40: Hardened Stainless 4-Lug Rear Bayonet, 12-Pin Gold Contacts & Seal
 */
export function buildLensParts(mats: MaterialLibrary): { parts: CadPart[]; rig: LensDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const irisBlades: THREE.Group[] = [];
  const moverCarriages: THREE.Group[] = [];
  const dummy = new THREE.Object3D();
  const motorAnglesDeg = [45, 135, 225, 315];
  const motorR = 32.8;
  const cutStart = THREE.MathUtils.degToRad(168);
  const cutEnd = THREE.MathUtils.degToRad(435);

  // =========================================================================
  // L01: Large-Diameter Bayonet Lock Cylindrical Lens Hood (z = +127.0 mm)
  // =========================================================================
  const hoodGroup = new THREE.Group();
  {
    const hoodShellGeo = new THREE.CylinderGeometry(44.2, 43.2, 22.0, 44, 1, true);
    hoodShellGeo.rotateX(Math.PI / 2);
    hoodGroup.add(new THREE.Mesh(hoodShellGeo, mats.lensBarrelAnodized));

    const frontRim = createLensCellRing(40.8, 44.6, 3.2, mats.lensRubberGrip, 42);
    frontRim.position.z = 10.6;
    hoodGroup.add(frontRim);

    const rearBayonet = createLensCellRing(39.4, 43.4, 3.4, mats.matteBlackAnodized, 40);
    rearBayonet.position.z = -10.2;
    hoodGroup.add(rearBayonet);

    for (let i = 0; i < 4; i++) {
      const baffle = createLensCellRing(40.5 + i * 0.15, 42.9, 1.0, mats.mountVelvetBaffle, 36);
      baffle.position.z = -6.5 + i * 4.4;
      baffle.userData.noEdges = true;
      hoodGroup.add(baffle);
    }

    const lockBtn = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(3.6, 7.6, 1.2), 5.6, 0.18, 0.18, 10),
      mats.stainlessMachined
    );
    lockBtn.position.set(-43.6, 0, -6.2);
    hoodGroup.add(lockBtn);

    const hoodDot = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 10), mats.mountRedIndexDot);
    hoodDot.position.set(0, 43.6, -9.8);
    hoodDot.userData.noEdges = true;
    hoodGroup.add(hoodDot);
  }
  parts.push(
    finalizeLensPart(
      'lens-front-hood',
      1,
      '#334155',
      hoodGroup,
      new THREE.Vector3(0, 0, 127.0),
      new THREE.Vector3(0, 0, 235),
      new THREE.Vector3(0, 0, 481),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L02: φ72mm Filter Thread Bezel & Spanner Retaining Ring (z = +116.5 mm)
  // =========================================================================
  const filterRingGroup = new THREE.Group();
  {
    const threadBezel = createLensCellRing(36.0, 41.2, 4.8, mats.matteBlackAnodized, 40);
    filterRingGroup.add(threadBezel);

    for (let i = -1; i <= 1; i++) {
      const groove = createLensCellRing(35.6, 36.2, 0.52, mats.stainlessMachined, 36);
      groove.position.z = i * 1.25;
      groove.userData.noEdges = true;
      filterRingGroup.add(groove);
    }

    const accentTrim = createLensCellRing(36.2, 39.2, 1.3, mats.lensAccentRing, 40);
    accentTrim.position.z = 2.6;
    filterRingGroup.add(accentTrim);

    const clampRing = createLensCellRing(32.8, 36.4, 2.0, mats.lensBarrelAnodized, 40);
    clampRing.position.z = -1.5;
    filterRingGroup.add(clampRing);

    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const notch = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.0, 0.7), mats.stainlessMachined);
      notch.position.set(Math.cos(a) * 34.6, Math.sin(a) * 34.6, -0.3);
      notch.rotation.z = a;
      filterRingGroup.add(notch);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-filter-ring',
      2,
      '#d97706',
      filterRingGroup,
      new THREE.Vector3(0, 0, 116.5),
      new THREE.Vector3(0, 0, 210),
      new THREE.Vector3(0, 0, 465.5),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L03: [NEW!] Front-Group 3-Point Eccentric Tilt & Centering Collar (z = +112.4 mm)
  // =========================================================================
  const eccentricGroup = new THREE.Group();
  {
    // Precision calibration collar ring seating outside Front Group cell (R 37.9..40.2)
    const collarRing = createLensCellRing(37.9, 40.2, 3.6, mats.shutterChassis, 40);
    eccentricGroup.add(collarRing);

    // 3x 120°-symmetric eccentric POM cam bushings + off-center stainless lock screws + UV glue drops
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(30 + i * 120);
      const pod = new THREE.Group();
      pod.position.set(Math.cos(a) * 38.9, Math.sin(a) * 38.9, 0);
      pod.rotation.z = a;

      // Eccentric white POM cam wheel (hole offset visually along local Y)
      const camWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.8, 2.8, 2.4, 18).rotateZ(Math.PI / 2),
        mats.pomGear
      );
      pod.add(camWheel);

      // Eccentric stainless calibration screw off-center by 0.45 mm
      const camScrew = createPrecisionScrew(1.35, 0.75, 2.2, mats.stainlessMachined);
      camScrew.position.set(1.2, 0.45, 0);
      camScrew.rotation.y = Math.PI / 2;
      pod.add(camScrew);

      // Blue UV optical factory-calibration lock resin dot
      const uvLock = new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 8), mats.mountThreadLockBlue);
      uvLock.position.set(1.6, -1.6, 0.8);
      uvLock.userData.noEdges = true;
      pod.add(uvLock);

      eccentricGroup.add(pod);
    }

    // 3 axial brass calibration witness pins on +Z face
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(90 + i * 120);
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 1.4, 10).rotateX(Math.PI / 2),
        mats.brassGear
      );
      pin.position.set(Math.cos(a) * 39.0, Math.sin(a) * 39.0, 2.0);
      eccentricGroup.add(pin);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-front-eccentric',
      3,
      '#0284c7',
      eccentricGroup,
      new THREE.Vector3(0, 0, 112.4),
      new THREE.Vector3(0, 0, 188),
      new THREE.Vector3(0, 0, 451.6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L04: Element 01 (G1) Large-Diameter 0.01um 1st XA Front Element (z = +108.5 mm)
  // =========================================================================
  const frontXaGroup = new THREE.Group();
  {
    const xaFrontGeo = createOpticalLensGeometry(33.2, 3.8, 5.4, -2.1, 0.5, 0.18, 18, 40);
    const xaFrontMesh = new THREE.Mesh(xaFrontGeo, mats.lensXaGlass);
    xaFrontMesh.userData.noEdges = true;
    frontXaGroup.add(xaFrontMesh);

    const edgeRim = createLensCellRing(32.5, 33.5, 3.9, mats.evfGlassEdgeRim, 38);
    frontXaGroup.add(edgeRim);

    const retainer = createLensCellRing(33.4, 37.5, 5.4, mats.matteBlackAnodized, 38);
    frontXaGroup.add(retainer);
  }
  parts.push(
    finalizeLensPart(
      'lens-front-xa',
      4,
      '#38bdf8',
      frontXaGroup,
      new THREE.Vector3(0, 0, 108.5),
      new THREE.Vector3(0, 0, 166),
      new THREE.Vector3(0, 0, 439.5),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L05: Element 02 (G2) High-Index Positive Meniscus & Brass Spacer (z = +102.0 mm)
  // =========================================================================
  const meniscusGroup = new THREE.Group();
  {
    const menGeo = createOpticalLensGeometry(31.2, 3.2, 4.0, -1.4, 0.08, 0.0, 16, 38);
    const menMesh = new THREE.Mesh(menGeo, mats.evfLensAspheric);
    menMesh.userData.noEdges = true;
    meniscusGroup.add(menMesh);

    meniscusGroup.add(createLensCellRing(30.6, 31.5, 3.3, mats.evfGlassEdgeRim, 36));

    // Micron-lapped precision brass air-gap spacer ring on +Z face
    const brassSpacer = createLensCellRing(31.0, 34.6, 1.2, mats.brassGear, 36);
    brassSpacer.position.z = 2.2;
    meniscusGroup.add(brassSpacer);

    const cell = createLensCellRing(31.4, 35.6, 4.2, mats.matteBlackAnodized, 36);
    cell.position.z = -0.3;
    meniscusGroup.add(cell);
  }
  parts.push(
    finalizeLensPart(
      'lens-front-meniscus',
      5,
      '#60a5fa',
      meniscusGroup,
      new THREE.Vector3(0, 0, 102.0),
      new THREE.Vector3(0, 0, 144),
      new THREE.Vector3(0, 0, 428.0),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L06: Element 03 (G3a) Super-ED Positive Front Element (Doublet Front, z = +96.2 mm)
  // =========================================================================
  const edGroup = new THREE.Group();
  {
    const edFrontGeo = createOpticalLensGeometry(29.8, 3.0, 3.6, 1.5, 0.12, 0.0, 16, 38);
    const edFrontMesh = new THREE.Mesh(edFrontGeo, mats.lensEdGlass);
    edFrontMesh.userData.noEdges = true;
    edGroup.add(edFrontMesh);

    edGroup.add(createLensCellRing(29.2, 30.1, 3.2, mats.evfGlassEdgeRim, 36));
    edGroup.add(createLensCellRing(30.0, 34.2, 3.6, mats.matteBlackAnodized, 36));
  }
  parts.push(
    finalizeLensPart(
      'lens-ed-group',
      6,
      '#10b981',
      edGroup,
      new THREE.Vector3(0, 0, 96.2),
      new THREE.Vector3(0, 0, 122),
      new THREE.Vector3(0, 0, 417.8),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L07: [NEW!] Element 04 (G3b) High-Dispersion Flint Cemented Mate & UV Seam (z = +92.4 mm)
  // =========================================================================
  const flintGroup = new THREE.Group();
  {
    // High-dispersion dense flint negative mating lens (concave front matching E03 rear!)
    const flintGeo = createOpticalLensGeometry(29.5, 2.5, -1.4, -0.5, 0.0, 0.12, 16, 38);
    const flintMesh = new THREE.Mesh(flintGeo, mats.evfLensField);
    flintMesh.userData.noEdges = true;
    flintGroup.add(flintMesh);

    // Thin UV optical cement bonding meniscus film on +Z mating interface
    const cementFilm = createLensCellRing(27.8, 29.5, 0.45, mats.lensAccentRing, 36);
    cementFilm.position.z = 1.45;
    cementFilm.userData.noEdges = true;
    flintGroup.add(cementFilm);

    flintGroup.add(createLensCellRing(29.0, 29.9, 2.7, mats.evfGlassEdgeRim, 36));
    flintGroup.add(createLensCellRing(29.8, 33.8, 3.2, mats.matteBlackAnodized, 36));

    // Rear precision brass doublet spacer ring
    const rearSpacer = createLensCellRing(29.8, 32.8, 0.85, mats.brassGear, 36);
    rearSpacer.position.z = -1.9;
    flintGroup.add(rearSpacer);
  }
  parts.push(
    finalizeLensPart(
      'lens-flint-cemented',
      7,
      '#059669',
      flintGroup,
      new THREE.Vector3(0, 0, 92.4),
      new THREE.Vector3(0, 0, 104),
      new THREE.Vector3(0, 0, 407.6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L08: [NEW!] Element 05 (G4) Pre-Iris Biconcave Petzval Flattener (z = +88.0 mm)
  // =========================================================================
  const g4NegGroup = new THREE.Group();
  {
    // Strong biconcave negative Petzval flattener (edge 3.4, sagFront -1.2, sagRear -1.2 => center 1.0mm)
    const g4Geo = createOpticalLensGeometry(27.6, 3.4, -1.15, -1.15, 0.0, 0.0, 16, 38);
    const g4Mesh = new THREE.Mesh(g4Geo, mats.evfLensEd);
    g4Mesh.userData.noEdges = true;
    g4NegGroup.add(g4Mesh);

    g4NegGroup.add(createLensCellRing(27.1, 28.0, 3.5, mats.evfGlassEdgeRim, 36));
    g4NegGroup.add(createLensCellRing(27.9, 32.8, 3.8, mats.matteBlackAnodized, 36));
  }
  parts.push(
    finalizeLensPart(
      'lens-g4-negative',
      8,
      '#0d9488',
      g4NegGroup,
      new THREE.Vector3(0, 0, 88.0),
      new THREE.Vector3(0, 0, 86),
      new THREE.Vector3(0, 0, 398.0),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L09: 11-Blade Iris Slotted Cam Actuating Ring & Brass Sector Gear (z = +84.4 mm)
  // =========================================================================
  const irisCamGroup = new THREE.Group();
  const irisCamRotor = new THREE.Group();
  {
    const camRing = createLensCellRing(24.8, 32.6, 1.5, mats.stainlessMachined, 38);
    irisCamRotor.add(camRing);

    const slotGeo = new THREE.BoxGeometry(5.6, 1.05, 0.35);
    const slotInst = new THREE.InstancedMesh(slotGeo, mats.mountVelvetBaffle, 11);
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 28.4, Math.sin(a) * 28.4, 0.74);
      dummy.rotation.set(0, 0, a + 0.55);
      dummy.updateMatrix();
      slotInst.setMatrixAt(i, dummy.matrix);
    }
    slotInst.instanceMatrix.needsUpdate = true;
    irisCamRotor.add(slotInst);

    const sectorArc = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(34.6, 32.0, -Math.PI * 0.34, -Math.PI * 0.08), 1.8, 0.08, 0.08, 20),
      mats.brassGear
    );
    irisCamRotor.add(sectorArc);

    irisCamGroup.add(irisCamRotor);

    const frontHousing = createLensCellRing(24.5, 33.2, 1.3, mats.shutterChassis, 38);
    frontHousing.position.z = 1.4;
    irisCamGroup.add(frontHousing);
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-cam-ring',
      9,
      '#cbd5e1',
      irisCamGroup,
      new THREE.Vector3(0, 0, 84.4),
      new THREE.Vector3(0, 0, 68),
      new THREE.Vector3(0, 0, 387.6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L10: 11-Blade Circular Carbon Iris Diaphragm Blades (z = +82.0 mm)
  // =========================================================================
  const irisGroup = new THREE.Group();
  {
    // Slim guide shim ring keeping the 11 blades aligned when exploded standalone
    const bladeCarrierShim = createLensCellRing(27.0, 29.8, 0.45, mats.stainlessMachined, 36);
    bladeCarrierShim.position.z = -0.65;
    bladeCarrierShim.userData.noEdges = true;
    irisGroup.add(bladeCarrierShim);

    const bladeCount = 11;
    const pivotR = 27.6;

    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, -1.6);
    bladeShape.quadraticCurveTo(11.5, -2.8, 22.8, 3.2);
    bladeShape.quadraticCurveTo(24.0, 5.4, 21.6, 6.8);
    bladeShape.quadraticCurveTo(10.5, 2.2, 0, 2.2);
    bladeShape.absarc(0, 0, 1.9, Math.PI * 0.5, -Math.PI * 0.5, false);
    bladeShape.closePath();

    const bladeGeo = extrudeCentered(bladeShape, 0.24, 0.02, 0.02, 10);

    for (let i = 0; i < bladeCount; i++) {
      const a = (i / bladeCount) * Math.PI * 2;
      const bladePivot = new THREE.Group();
      bladePivot.position.set(
        Math.cos(a) * pivotR,
        Math.sin(a) * pivotR,
        -0.25 + (i % 3) * 0.22
      );
      const baseAngle = a + Math.PI * 0.62;
      bladePivot.userData.baseAngle = baseAngle;
      bladePivot.rotation.z = baseAngle;

      const bladeMesh = new THREE.Mesh(bladeGeo, mats.carbonFiberBlade);
      bladeMesh.userData.edgeOpacity = 0.34;
      bladePivot.add(bladeMesh);

      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.62, 0.62, 1.15, 10).rotateX(Math.PI / 2),
        mats.brassGear
      );
      bladePivot.add(pin);

      irisGroup.add(bladePivot);
      irisBlades.push(bladePivot);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-aperture-11',
      10,
      '#475569',
      irisGroup,
      new THREE.Vector3(0, 0, 82.0),
      new THREE.Vector3(0, 0, 52),
      new THREE.Vector3(0, 0, 376.0),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L11: [NEW!] Stationary Iris Pivot-Pin Base Plate & Light-Trap Shield (z = +79.6 mm)
  // =========================================================================
  const irisBaseGroup = new THREE.Group();
  {
    // Main stationary carbon-reinforced iris housing backplate
    const basePlate = createLensCellRing(24.2, 33.4, 2.0, mats.shutterChassis, 38);
    irisBaseGroup.add(basePlate);

    // Matte inner stray-light knife-edge baffle shield preventing peripheral leak
    const innerShield = createLensCellRing(22.8, 24.4, 1.1, mats.mountVelvetBaffle, 36);
    innerShield.position.z = -0.6;
    irisBaseGroup.add(innerShield);

    // 11 precision brass stationary pivot-pin bearing bushings at 32.727° spacing (InstancedMesh!)
    const bushGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.8, 10).rotateX(Math.PI / 2);
    const bushInst = new THREE.InstancedMesh(bushGeo, mats.brassGear, 11);
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 27.6, Math.sin(a) * 27.6, 1.1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      bushInst.setMatrixAt(i, dummy.matrix);
    }
    bushInst.instanceMatrix.needsUpdate = true;
    irisBaseGroup.add(bushInst);

    // 3 mounting ears bolting the sealed iris module to the L21 internal skeleton
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(15 + i * 120);
      const tab = new THREE.Mesh(new THREE.BoxGeometry(3.4, 4.4, 1.8), mats.stainlessMachined);
      tab.position.set(Math.cos(a) * 34.4, Math.sin(a) * 34.4, 0);
      tab.rotation.z = a;
      irisBaseGroup.add(tab);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-base-plate',
      11,
      '#64748b',
      irisBaseGroup,
      new THREE.Vector3(0, 0, 79.6),
      new THREE.Vector3(0, 0, 36),
      new THREE.Vector3(0, 0, 364.4),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L12: Silent 1/64 Micro-Stepping Iris Actuator Motor & Gear Train (z = +80.5 mm)
  // =========================================================================
  const irisStepperGroup = new THREE.Group();
  {
    const motorCan = new THREE.Mesh(
      new THREE.CylinderGeometry(4.1, 4.1, 8.4, 18).rotateX(Math.PI / 2),
      mats.copperCoil
    );
    irisStepperGroup.add(motorCan);

    const endCap = new THREE.Mesh(
      new THREE.CylinderGeometry(4.25, 4.25, 1.5, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    endCap.position.z = -4.1;
    irisStepperGroup.add(endCap);

    const pinion = new THREE.Mesh(
      createSpurGearGeometry(12, 2.1, 2.0, 0.7),
      mats.brassGear
    );
    pinion.position.set(0, 0, 5.0);
    irisStepperGroup.add(pinion);

    const spurGear = new THREE.Mesh(
      createSpurGearGeometry(18, 3.5, 1.7, 0.9),
      mats.pomGear
    );
    spurGear.position.set(-4.1, 3.3, 4.9);
    irisStepperGroup.add(spurGear);

    const homeSensor = new THREE.Mesh(new THREE.BoxGeometry(3.3, 2.7, 2.5), mats.icEpoxy);
    homeSensor.position.set(-5.8, 6.0, 3.1);
    irisStepperGroup.add(homeSensor);

    const fpc = new THREE.Mesh(new THREE.BoxGeometry(4.4, 13.5, 0.4), mats.polyimideFpc);
    fpc.position.set(2.1, 5.8, -3.4);
    irisStepperGroup.add(fpc);
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-stepper',
      12,
      '#b45309',
      irisStepperGroup,
      new THREE.Vector3(28.5, -18.0, 80.5),
      new THREE.Vector3(48, -28, 52),
      new THREE.Vector3(50, -30, 376),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L13: [NEW!] Element 06 (G5a) Floating Focus Group A Front Biconvex (z = +75.2 mm)
  // =========================================================================
  const focusAFrontGroup = new THREE.Group();
  {
    const faFrontGeo = createOpticalLensGeometry(24.0, 2.4, 2.4, 1.4, 0.05, 0.0, 16, 38);
    const faFrontMesh = new THREE.Mesh(faFrontGeo, mats.evfLensAspheric);
    faFrontMesh.userData.noEdges = true;
    focusAFrontGroup.add(faFrontMesh);

    focusAFrontGroup.add(createLensCellRing(23.5, 24.4, 2.6, mats.evfGlassEdgeRim, 36));
    focusAFrontGroup.add(createLensCellRing(24.3, 27.6, 2.9, mats.matteBlackAnodized, 36));
  }
  const focusAFrontPart = finalizeLensPart(
    'lens-focus-a-front',
    13,
    '#38bdf8',
    focusAFrontGroup,
    new THREE.Vector3(0, 0, 75.2),
    new THREE.Vector3(0, 0, 16),
    new THREE.Vector3(0, 0, 352.8),
    cp,
    0.24
  );
  parts.push(focusAFrontPart);

  // =========================================================================
  // L14: Element 07 (G5b) Floating Focus Group A Main Carrier & 2nd XA (z = +72.0 mm)
  // =========================================================================
  const focusAGroup = new THREE.Group();
  {
    const fAGeo = createOpticalLensGeometry(24.6, 2.8, 3.2, 1.3, 0.42, 0.14, 16, 38);
    const fAMesh = new THREE.Mesh(fAGeo, mats.lensXaGlass);
    fAMesh.userData.noEdges = true;
    focusAGroup.add(fAMesh);

    focusAGroup.add(createLensCellRing(24.1, 25.0, 3.0, mats.evfGlassEdgeRim, 36));
    focusAGroup.add(createLensCellRing(24.9, 28.8, 5.2, mats.matteBlackAnodized, 36));

    for (const deg of [45, 225]) {
      const a = THREE.MathUtils.degToRad(deg);
      const ear = new THREE.Mesh(new THREE.BoxGeometry(6.8, 4.4, 7.6), mats.stainlessMachined);
      ear.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, 0);
      ear.rotation.z = a;
      focusAGroup.add(ear);

      const bushing = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.1, 8.6, 14).rotateX(Math.PI / 2),
        mats.brassGear
      );
      bushing.position.set(Math.cos(a) * 32.8, Math.sin(a) * 32.8, 0);
      focusAGroup.add(bushing);
    }
  }
  const focusGroupAPart = finalizeLensPart(
    'lens-focus-group-a',
    14,
    '#0ea5e9',
    focusAGroup,
    new THREE.Vector3(0, 0, 72.0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 342.0),
    cp,
    0.24
  );
  parts.push(focusGroupAPart);

  // =========================================================================
  // L15: [NEW!] Element 08 (G5c) Floating Focus Group A Rear Negative Corrector (z = +68.8 mm)
  // =========================================================================
  const focusARearGroup = new THREE.Group();
  {
    const faRearGeo = createOpticalLensGeometry(23.6, 2.5, -0.9, -0.7, 0.0, 0.08, 16, 38);
    const faRearMesh = new THREE.Mesh(faRearGeo, mats.evfLensField);
    faRearMesh.userData.noEdges = true;
    focusARearGroup.add(faRearMesh);

    focusARearGroup.add(createLensCellRing(23.1, 24.0, 2.7, mats.evfGlassEdgeRim, 36));
    focusARearGroup.add(createLensCellRing(23.9, 27.4, 2.9, mats.matteBlackAnodized, 36));
  }
  const focusARearPart = finalizeLensPart(
    'lens-focus-a-rear',
    15,
    '#0284c7',
    focusARearGroup,
    new THREE.Vector3(0, 0, 68.8),
    new THREE.Vector3(0, 0, -16),
    new THREE.Vector3(0, 0, 331.2),
    cp,
    0.24
  );
  parts.push(focusARearPart);

  // =========================================================================
  // L16: Quad XD Linear Motor Stators: 8x N52 Magnets & Soft-Iron Yokes (z = +65.0 mm)
  // =========================================================================
  const xdStatorsGroup = new THREE.Group();
  {
    for (const deg of motorAnglesDeg) {
      const a = THREE.MathUtils.degToRad(deg);
      const stator = new THREE.Group();
      stator.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      stator.rotation.z = a;

      for (const sy of [-3.1, 3.1]) {
        const mag = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 31.0), mats.neodymiumMagnet);
        mag.position.set(1.6, sy, 0);
        stator.add(mag);
      }

      const yoke = new THREE.Mesh(new THREE.BoxGeometry(1.5, 9.0, 32.6), mats.softIronYoke);
      yoke.position.set(3.4, 0, 0);
      stator.add(yoke);

      xdStatorsGroup.add(stator);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-xd-stators',
      16,
      '#64748b',
      xdStatorsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(-56, 0, -38),
      new THREE.Vector3(-60, 0, 317),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L17: Quad XD Linear Motor Movers: 4x OFC Flat-Wire Copper Coils (z = +65.0 mm)
  // =========================================================================
  const xdMotorsGroup = new THREE.Group();
  {
    for (let i = 0; i < motorAnglesDeg.length; i++) {
      const deg = motorAnglesDeg[i];
      const a = THREE.MathUtils.degToRad(deg);
      const track = new THREE.Group();
      track.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      track.rotation.z = a;

      const mover = new THREE.Group();
      const baseZ = i % 2 === 0 ? 5.5 : -6.5;
      mover.position.z = baseZ;
      mover.userData.baseZ = baseZ;
      mover.userData.groupIndex = i % 2;

      const coilCore = new THREE.Mesh(new THREE.BoxGeometry(3.8, 6.2, 10.8), mats.copperCoil);
      coilCore.position.set(0.6, 0, 0);
      mover.add(coilCore);

      const fpcTail = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.2, 10.2), mats.polyimideFpc);
      fpcTail.position.set(2.5, -2.2, -5.4);
      mover.add(fpcTail);

      track.add(mover);
      moverCarriages.push(mover);
      xdMotorsGroup.add(track);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-xd-motors',
      17,
      '#d97706',
      xdMotorsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(0, 0, -38),
      new THREE.Vector3(0, 0, 317),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L18: [NEW!] XD Linear Rail Preload Springs, POM Sliders & Silicone End-Dampers (z = +65.0 mm)
  // =========================================================================
  const xdDampersGroup = new THREE.Group();
  {
    const springGeo = createHelicalSpringGeometry(1.55, 5.2, 4, 0.28);
    const damperGeo = new THREE.CylinderGeometry(2.2, 2.2, 2.2, 14).rotateX(Math.PI / 2);

    for (let i = 0; i < motorAnglesDeg.length; i++) {
      const a = THREE.MathUtils.degToRad(motorAnglesDeg[i]);
      const railUnit = new THREE.Group();
      railUnit.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      railUnit.rotation.z = a;

      // Dual silicone elastomer impact end-stop dampers at front (+15.4) & rear (-15.4)
      for (const zStop of [-15.4, 15.4]) {
        const damper = new THREE.Mesh(damperGeo, mats.damperElastomer);
        damper.position.z = zStop;
        damper.userData.noEdges = true;
        railUnit.add(damper);
      }

      // Phosphor-bronze preload anti-backlash compression spring near each rail end
      const preloadSpring = new THREE.Mesh(springGeo, mats.brassGear);
      preloadSpring.position.z = i % 2 === 0 ? 11.4 : -11.4;
      preloadSpring.userData.noEdges = true;
      railUnit.add(preloadSpring);

      // Low-friction white POM anti-rotation slider shoe riding adjacent to carrier
      const pomShoe = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.8, 4.4), mats.pomGear);
      pomShoe.position.set(-2.2, -2.6, i % 2 === 0 ? 5.5 : -6.5);
      railUnit.add(pomShoe);

      xdDampersGroup.add(railUnit);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-xd-dampers',
      18,
      '#ec4899',
      xdDampersGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(-56, 46, -50),
      new THREE.Vector3(-60, 48, 306),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L19: 4x Centerless-Ground Titanium Guide Shafts & End-Ring Cage (z = +65.0 mm)
  // =========================================================================
  const guideShaftsGroup = new THREE.Group();
  {
    for (const zEnd of [-17.6, 17.6]) {
      const endRing = createLensCellRing(29.8, 36.0, 2.2, mats.magnesiumCast, 38);
      endRing.position.z = zEnd;
      guideShaftsGroup.add(endRing);
    }

    for (const deg of motorAnglesDeg) {
      const a = THREE.MathUtils.degToRad(deg);
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(1.15, 1.15, 36.4, 14).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      rod.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      guideShaftsGroup.add(rod);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-guide-shafts',
      19,
      '#94a3b8',
      guideShaftsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(0, 0, -64),
      new THREE.Vector3(0, 0, 301),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L20: 4x Sub-Micron MR Magnetic Encoders & Magnetized Scale Strips (z = +65.0 mm)
  // =========================================================================
  const mrEncodersGroup = new THREE.Group();
  {
    for (let i = 0; i < motorAnglesDeg.length; i++) {
      const a = THREE.MathUtils.degToRad(motorAnglesDeg[i]);
      const enc = new THREE.Group();
      enc.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      enc.rotation.z = a;

      const mrStrip = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.2, 29.4), mats.hdiMainboardPcb);
      mrStrip.position.set(-1.9, 3.6, 0);
      enc.add(mrStrip);

      const mrHead = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.3, 3.4), mats.goldPlating);
      mrHead.position.set(-1.2, 3.6, i % 2 === 0 ? 5.5 : -6.5);
      enc.add(mrHead);

      const sigFlex = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.8, 12.0), mats.polyimideFpc);
      sigFlex.position.set(-2.3, 3.6, -11.0);
      enc.add(sigFlex);

      mrEncodersGroup.add(enc);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-mr-encoders',
      20,
      '#16a34a',
      mrEncodersGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(58, 0, -52),
      new THREE.Vector3(62, 0, 309),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L21: [NEW!] Internal Fixed TSC/Magnesium Structural Skeleton Barrel (z = +70.0 mm)
  // =========================================================================
  const innerChassisGroup = new THREE.Group();
  {
    // Open architectural cutaway skeleton matching L38 cutaway (168°..435°) so internals shine!
    const skelWall = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(36.9, 35.1, cutStart, cutEnd), 54.0, 0.2, 0.2, 38),
      mats.magnesiumCast
    );
    innerChassisGroup.add(skelWall);

    // 3 internal annular reinforcement ribs (front, mid-focus, rear mount-bulkhead)
    for (const zRib of [-26.5, 0.0, 26.5]) {
      const rib = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(37.2, 34.0, cutStart, cutEnd), 2.4, 0.12, 0.12, 36),
        mats.mountMgBulkhead
      );
      rib.position.z = zRib;
      innerChassisGroup.add(rib);
    }

    // 4 machined axial stiffener rails / stator mounting ribs on inner skeleton wall
    for (const deg of [185, 250, 300, 410]) {
      const a = THREE.MathUtils.degToRad(deg);
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.6, 52.0), mats.stainlessMachined);
      beam.position.set(Math.cos(a) * 35.8, Math.sin(a) * 35.8, 0);
      beam.rotation.z = a;
      innerChassisGroup.add(beam);
    }

    // Rear full-circle mounting flange ring that bolts directly onto L39 shims & L40 bayonet
    const rearFlange = createLensCellRing(28.0, 34.4, 2.4, mats.magnesiumCast, 38);
    rearFlange.position.z = -31.5;
    innerChassisGroup.add(rearFlange);
  }
  parts.push(
    finalizeLensPart(
      'lens-inner-chassis',
      21,
      '#475569',
      innerChassisGroup,
      new THREE.Vector3(0, 0, 70.0),
      new THREE.Vector3(58, 72, -16),
      new THREE.Vector3(64, 76, 350),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L22: [NEW!] Element 09 (G6a) Floating Focus Group B Front ED Mate (z = +60.2 mm)
  // =========================================================================
  const focusBFrontGroup = new THREE.Group();
  {
    const fbFrontGeo = createOpticalLensGeometry(23.8, 2.4, 2.2, 1.4, 0.06, 0.0, 16, 38);
    const fbFrontMesh = new THREE.Mesh(fbFrontGeo, mats.lensEdGlass);
    fbFrontMesh.userData.noEdges = true;
    focusBFrontGroup.add(fbFrontMesh);

    focusBFrontGroup.add(createLensCellRing(23.3, 24.2, 2.6, mats.evfGlassEdgeRim, 36));
    focusBFrontGroup.add(createLensCellRing(24.1, 27.4, 2.8, mats.matteBlackAnodized, 36));
  }
  const focusBFrontPart = finalizeLensPart(
    'lens-focus-b-front',
    22,
    '#2dd4bf',
    focusBFrontGroup,
    new THREE.Vector3(0, 0, 60.2),
    new THREE.Vector3(0, 0, -86),
    new THREE.Vector3(0, 0, 287.8),
    cp,
    0.24
  );
  parts.push(focusBFrontPart);

  // =========================================================================
  // L23: Element 10 (G6b) Floating Focus Group B Main Carrier & Rear Aspheric (z = +57.0 mm)
  // =========================================================================
  const focusBGroup = new THREE.Group();
  {
    const fBGeo = createOpticalLensGeometry(24.0, 2.8, -1.3, 2.4, 0.16, 0.35, 16, 38);
    const fBMesh = new THREE.Mesh(fBGeo, mats.lensEdGlass);
    fBMesh.userData.noEdges = true;
    focusBGroup.add(fBMesh);

    focusBGroup.add(createLensCellRing(23.5, 24.4, 3.0, mats.evfGlassEdgeRim, 36));
    focusBGroup.add(createLensCellRing(24.3, 28.4, 5.2, mats.matteBlackAnodized, 36));

    for (const deg of [135, 315]) {
      const a = THREE.MathUtils.degToRad(deg);
      const ear = new THREE.Mesh(new THREE.BoxGeometry(6.8, 4.4, 7.2), mats.stainlessMachined);
      ear.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, 0);
      ear.rotation.z = a;
      focusBGroup.add(ear);

      const bushing = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.1, 8.2, 14).rotateX(Math.PI / 2),
        mats.brassGear
      );
      bushing.position.set(Math.cos(a) * 32.8, Math.sin(a) * 32.8, 0);
      focusBGroup.add(bushing);
    }
  }
  const focusGroupBPart = finalizeLensPart(
    'lens-focus-group-b',
    23,
    '#14b8a6',
    focusBGroup,
    new THREE.Vector3(0, 0, 57.0),
    new THREE.Vector3(0, 0, -104),
    new THREE.Vector3(0, 0, 277.0),
    cp,
    0.24
  );
  parts.push(focusGroupBPart);

  // =========================================================================
  // L24: [NEW!] Element 11 (G7) Rear Negative Field-Curvature Flattener (z = +53.0 mm)
  // =========================================================================
  const g7Group = new THREE.Group();
  {
    const g7Geo = createOpticalLensGeometry(23.6, 2.8, -1.0, -0.8, 0.0, 0.1, 16, 38);
    const g7Mesh = new THREE.Mesh(g7Geo, mats.evfLensEd);
    g7Mesh.userData.noEdges = true;
    g7Group.add(g7Mesh);

    g7Group.add(createLensCellRing(23.1, 24.0, 2.9, mats.evfGlassEdgeRim, 36));
    g7Group.add(createLensCellRing(23.9, 27.6, 3.2, mats.matteBlackAnodized, 36));
  }
  parts.push(
    finalizeLensPart(
      'lens-g7-flattener',
      24,
      '#06b6d4',
      g7Group,
      new THREE.Vector3(0, 0, 53.0),
      new THREE.Vector3(0, 0, -120),
      new THREE.Vector3(0, 0, 267.0),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L25: Element 12 (G8) High-Index Lanthanum Sagittal Coma Corrector (z = +49.2 mm)
  // =========================================================================
  const rearConvexGroup = new THREE.Group();
  {
    const convGeo = createOpticalLensGeometry(23.4, 2.6, 2.6, 1.8, 0.12, 0.08, 16, 38);
    const convMesh = new THREE.Mesh(convGeo, mats.evfLensField);
    convMesh.userData.noEdges = true;
    rearConvexGroup.add(convMesh);

    rearConvexGroup.add(createLensCellRing(22.9, 23.8, 2.8, mats.evfGlassEdgeRim, 36));
    rearConvexGroup.add(createLensCellRing(23.7, 27.4, 3.2, mats.matteBlackAnodized, 36));
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-convex',
      25,
      '#818cf8',
      rearConvexGroup,
      new THREE.Vector3(0, 0, 49.2),
      new THREE.Vector3(0, 0, -136),
      new THREE.Vector3(0, 0, 256.8),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L26: [NEW!] Element 13 (G9) Large-Diameter φ45mm Rear Telecentric Meniscus (z = +45.6 mm)
  // =========================================================================
  const telecentricGroup = new THREE.Group();
  {
    const teleGeo = createOpticalLensGeometry(23.0, 2.8, 2.4, -0.9, 0.08, 0.0, 16, 38);
    const teleMesh = new THREE.Mesh(teleGeo, mats.evfLensAspheric);
    teleMesh.userData.noEdges = true;
    telecentricGroup.add(teleMesh);

    telecentricGroup.add(createLensCellRing(22.5, 23.4, 2.9, mats.evfGlassEdgeRim, 36));
    telecentricGroup.add(createLensCellRing(23.3, 27.0, 3.2, mats.matteBlackAnodized, 36));

    // Precision brass spacing shim separating G9 telecentric from G10 final XA hero
    const g9Spacer = createLensCellRing(23.4, 26.2, 0.65, mats.brassGear, 34);
    g9Spacer.position.z = -1.75;
    telecentricGroup.add(g9Spacer);
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-telecentric',
      26,
      '#a78bfa',
      telecentricGroup,
      new THREE.Vector3(0, 0, 45.6),
      new THREE.Vector3(0, 0, -152),
      new THREE.Vector3(0, 0, 246.4),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L27: Element 14 (G10) φ44mm 3rd XA Rear Hero Element (z = +42.0 mm)
  // =========================================================================
  const rearHeroGroup = new THREE.Group();
  {
    const rearGeo = createOpticalLensGeometry(22.4, 3.0, 1.8, 3.2, 0.28, 0.5, 16, 38);
    const rearMesh = new THREE.Mesh(rearGeo, mats.lensXaGlass);
    rearMesh.userData.noEdges = true;
    rearHeroGroup.add(rearMesh);

    rearHeroGroup.add(createLensCellRing(21.9, 22.8, 3.2, mats.evfGlassEdgeRim, 36));
    rearHeroGroup.add(createLensCellRing(22.7, 26.6, 3.8, mats.mountVelvetBaffle, 36));
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-element',
      27,
      '#6366f1',
      rearHeroGroup,
      new THREE.Vector3(0, 0, 42.0),
      new THREE.Vector3(0, 0, -168),
      new THREE.Vector3(0, 0, 236.0),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L28: [NEW!] Rear 3:2 Rectangular Stray-Light Flare Mask & Flocked Baffle (z = +38.2 mm)
  // =========================================================================
  const rearBaffleGroup = new THREE.Group();
  {
    // Full-frame 3:2 rectangular light-trap mask plate (31.5 x 21.0 mm window inside R 25.8 collar)
    const maskPlate = new THREE.Mesh(
      extrudeCentered(createCircularRectWindowShape(25.8, 30.6, 20.4, 1.8), 1.6, 0.1, 0.1, 36),
      mats.mountVelvetBaffle
    );
    rearBaffleGroup.add(maskPlate);

    // Inner knife-edge stepped glare-trapping surround lip facing sensor (-Z)
    const baffleStep = new THREE.Mesh(
      extrudeCentered(createCircularRectWindowShape(24.4, 29.2, 19.4, 1.4), 1.4, 0.06, 0.06, 32),
      mats.matteBlackAnodized
    );
    baffleStep.position.z = -1.2;
    rearBaffleGroup.add(baffleStep);

    // 4 tiny dark retaining screw bosses securing mask to rear optical cell
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const s = createPrecisionScrew(0.95, 0.5, 1.2, mats.stainlessMachined);
      s.position.set(Math.cos(a) * 23.6, Math.sin(a) * 23.6, -0.8);
      s.rotation.y = Math.PI;
      rearBaffleGroup.add(s);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-baffle',
      28,
      '#1e293b',
      rearBaffleGroup,
      new THREE.Vector3(0, 0, 38.2),
      new THREE.Vector3(0, 0, -184),
      new THREE.Vector3(0, 0, 225.8),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L29: [NEW!] Internal Precision NTC Thermistor Temperature Sensor (asm -28, +19, 48.0)
  // =========================================================================
  const thermistorGroup = new THREE.Group();
  {
    // Thermal-coupling copper contact pad bonded to internal skeleton near ED/XA optics
    const cuPad = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(7.2, 5.4, 1.0), 0.7, 0.06, 0.06, 10),
      mats.copperHeatSpreader
    );
    thermistorGroup.add(cuPad);

    // Pink TIM thermal interface cushion under copper pad
    const timPad = new THREE.Mesh(new THREE.BoxGeometry(6.4, 4.6, 0.55), mats.thermalPadPink);
    timPad.position.z = -0.55;
    thermistorGroup.add(timPad);

    // Precision ceramic SMD NTC thermistor bead + silver end terminations
    const ntcBead = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.6, 1.3), mats.smdCeramic);
    ntcBead.position.set(0, 0, 0.95);
    thermistorGroup.add(ntcBead);

    for (const sx of [-1.45, 1.45]) {
      const term = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.7, 1.35), mats.goldPlating);
      term.position.set(sx, 0, 0.95);
      thermistorGroup.add(term);
    }

    // Stainless clamping retention spring clip
    const clip = new THREE.Mesh(new THREE.BoxGeometry(1.6, 6.4, 0.45), mats.stainlessMachined);
    clip.position.set(-2.6, 0, 0.65);
    thermistorGroup.add(clip);

    // Shielded polyimide micro-flex routing directly to L30 Ring MCU ADC
    const ntcFlex = new THREE.Mesh(new THREE.BoxGeometry(2.6, 11.5, 0.35), mats.polyimideFpc);
    ntcFlex.position.set(2.8, -5.8, 0.4);
    thermistorGroup.add(ntcFlex);
  }
  parts.push(
    finalizeLensPart(
      'lens-thermistor',
      29,
      '#ef4444',
      thermistorGroup,
      new THREE.Vector3(-28.0, 19.0, 48.0),
      new THREE.Vector3(-46, 34, -138),
      new THREE.Vector3(-50, 38, 254),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L30: Circular Ring HDI 32-Bit AF MCU & 4ch H-Bridge Driver PCB (z = +45.5 mm)
  // =========================================================================
  const mcuPcbGroup = new THREE.Group();
  {
    const pcbRing = createLensCellRing(28.2, 36.8, 1.4, mats.hdiMainboardPcb, 40);
    mcuPcbGroup.add(pcbRing);

    const mcuIc = new THREE.Mesh(new THREE.BoxGeometry(6.2, 6.2, 1.1), mats.icEpoxy);
    mcuIc.position.set(0, 32.5, 1.2);
    mcuPcbGroup.add(mcuIc);

    for (const deg of motorAnglesDeg) {
      const a = THREE.MathUtils.degToRad(deg);
      const drv = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.4, 1.0), mats.icEpoxy);
      drv.position.set(Math.cos(a) * 32.4, Math.sin(a) * 32.4, 1.15);
      drv.rotation.z = a;
      mcuPcbGroup.add(drv);

      const zif = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.6, 0.8), mats.zifIvoryPlastic);
      zif.position.set(Math.cos(a + 0.22) * 32.2, Math.sin(a + 0.22) * 32.2, 1.05);
      zif.rotation.z = a + 0.22;
      mcuPcbGroup.add(zif);
    }

    const capGeo = new THREE.BoxGeometry(2.0, 1.2, 0.9);
    const capInst = new THREE.InstancedMesh(capGeo, mats.tantalumCapYellow, 16);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2 + 0.1;
      dummy.position.set(Math.cos(a) * 32.6, Math.sin(a) * 32.6, -1.1);
      dummy.rotation.set(0, 0, a);
      dummy.updateMatrix();
      capInst.setMatrixAt(i, dummy.matrix);
    }
    capInst.instanceMatrix.needsUpdate = true;
    mcuPcbGroup.add(capInst);
  }
  parts.push(
    finalizeLensPart(
      'lens-mcu-pcb',
      30,
      '#15803d',
      mcuPcbGroup,
      new THREE.Vector3(0, 0, 45.5),
      new THREE.Vector3(0, -64, -148),
      new THREE.Vector3(0, -68, 254),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L31: [NEW!] Multi-Branch High-Flex Polyimide Internal FPC Ribbon Harness (z = +58.0 mm)
  // =========================================================================
  const fpcHarnessGroup = new THREE.Group();
  {
    // Main wrap-around polyimide bus arc hugging lower-right inner barrel (190°..385°)
    const mainBusArc = new THREE.Mesh(
      extrudeCentered(
        createCutawayArcRingShape(37.6, 37.0, THREE.MathUtils.degToRad(200), THREE.MathUtils.degToRad(385)),
        12.0,
        0.05,
        0.05,
        30
      ),
      mats.polyimideFpc
    );
    fpcHarnessGroup.add(mainBusArc);

    // Silver EMI noise-shielding film strip laminated across high-speed sensor traces
    const emiStrip = new THREE.Mesh(
      extrudeCentered(
        createCutawayArcRingShape(37.85, 37.62, THREE.MathUtils.degToRad(220), THREE.MathUtils.degToRad(355)),
        6.2,
        0.04,
        0.04,
        24
      ),
      mats.emiShieldFilm
    );
    fpcHarnessGroup.add(emiStrip);

    // 5 axial polyimide branches reaching front encoders, XD motors, iris, side switch, & rear 12-pin mount
    const branchSpecs = [
      { deg: 350, zCenter: 10.0, len: 30.0, w: 4.8 }, // to L35 side switch & L12 iris
      { deg: 315, zCenter: 4.0, len: 24.0, w: 4.2 },  // to XD motor #4
      { deg: 270, zCenter: -8.0, len: 26.0, w: 7.2 }, // to L40 12-pin bayonet contacts
      { deg: 225, zCenter: 4.0, len: 24.0, w: 4.2 },  // to XD motor #3
      { deg: 205, zCenter: 14.0, len: 34.0, w: 3.6 }, // to L32 MF optical encoder
    ];
    for (const b of branchSpecs) {
      const a = THREE.MathUtils.degToRad(b.deg);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.45, b.w, b.len), mats.polyimideFpc);
      strip.position.set(Math.cos(a) * 37.3, Math.sin(a) * 37.3, b.zCenter);
      strip.rotation.z = a;
      fpcHarnessGroup.add(strip);

      // Gold ZIF connector end-tab on each branch
      const zifTab = new THREE.Mesh(new THREE.BoxGeometry(0.75, b.w * 0.92, 2.8), mats.goldPlating);
      zifTab.position.set(
        Math.cos(a) * 37.3,
        Math.sin(a) * 37.3,
        b.zCenter + (b.zCenter >= 0 ? b.len * 0.5 : -b.len * 0.5)
      );
      zifTab.rotation.z = a;
      fpcHarnessGroup.add(zifTab);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-fpc-harness',
      31,
      '#f97316',
      fpcHarnessGroup,
      new THREE.Vector3(0, 0, 58.0),
      new THREE.Vector3(66, -48, -108),
      new THREE.Vector3(72, -52, 282),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L32: Non-Contact Optical Slotted MF Rotary Encoder Wheel (z = +92.0 mm)
  // =========================================================================
  const mfEncoderGroup = new THREE.Group();
  const mfEncoderWheel = new THREE.Group();
  {
    const wheelRing = createLensCellRing(37.0, 39.4, 1.8, mats.goldPlating, 40);
    mfEncoderWheel.add(wheelRing);

    const slitGeo = new THREE.BoxGeometry(0.45, 1.8, 2.0);
    const slitInst = new THREE.InstancedMesh(slitGeo, mats.mountVelvetBaffle, 48);
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 38.2, Math.sin(a) * 38.2, 0);
      dummy.rotation.set(0, 0, a);
      dummy.updateMatrix();
      slitInst.setMatrixAt(i, dummy.matrix);
    }
    slitInst.instanceMatrix.needsUpdate = true;
    mfEncoderWheel.add(slitInst);
    mfEncoderGroup.add(mfEncoderWheel);

    const pickup = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.8, 3.6), mats.icEpoxy);
    pickup.position.set(0, -39.4, 0);
    mfEncoderGroup.add(pickup);

    const pickupFpc = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.6, 12.0), mats.polyimideFpc);
    pickupFpc.position.set(0, -39.2, -7.2);
    mfEncoderGroup.add(pickupFpc);
  }
  parts.push(
    finalizeLensPart(
      'lens-mf-encoder',
      32,
      '#eab308',
      mfEncoderGroup,
      new THREE.Vector3(0, 0, 92.0),
      new THREE.Vector3(0, 60, 94),
      new THREE.Vector3(0, 64, 404),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L33: [NEW!] Aperture Ring Non-Contact Magnetic Hall Sensor & Rotor (z = +56.0 mm)
  // =========================================================================
  const apSensorGroup = new THREE.Group();
  const apertureHallRotor = new THREE.Group();
  {
    // Multi-pole magnetic encoder rotor ring coupled inside the aperture ring (top/left arc)
    const rotorRing = createLensCellRing(36.8, 38.2, 2.2, mats.stainlessMachined, 38);
    apertureHallRotor.add(rotorRing);

    // 24 alternating N/S micro-magnet pole blocks around perimeter (InstancedMesh!)
    const poleGeo = new THREE.BoxGeometry(0.65, 2.4, 2.35);
    const poleNInst = new THREE.InstancedMesh(poleGeo, mats.neodymiumMagnet, 12);
    const poleSInst = new THREE.InstancedMesh(poleGeo, mats.mountShimBlue, 12);
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 37.5, Math.sin(a) * 37.5, 0);
      dummy.rotation.set(0, 0, a);
      dummy.updateMatrix();
      if (i % 2 === 0) poleNInst.setMatrixAt(i / 2, dummy.matrix);
      else poleSInst.setMatrixAt((i - 1) / 2, dummy.matrix);
    }
    poleNInst.instanceMatrix.needsUpdate = true;
    poleSInst.instanceMatrix.needsUpdate = true;
    apertureHallRotor.add(poleNInst, poleSInst);
    apSensorGroup.add(apertureHallRotor);

    // Stationary dual-axis Hall-effect IC sensor board at 142° (-X, +Y), tucked cleanly inside barrel radius
    const hallA = THREE.MathUtils.degToRad(142);
    const hallPod = new THREE.Group();
    hallPod.position.set(Math.cos(hallA) * 37.4, Math.sin(hallA) * 37.4, 0);
    hallPod.rotation.z = hallA;

    const hallPcb = new THREE.Mesh(new THREE.BoxGeometry(1.1, 7.6, 4.4), mats.hdiMainboardPcb);
    hallPod.add(hallPcb);

    for (const sy of [-1.9, 1.9]) {
      const hallIc = new THREE.Mesh(new THREE.BoxGeometry(0.85, 2.0, 2.0), mats.icEpoxy);
      hallIc.position.set(-0.8, sy, 0);
      hallPod.add(hallIc);
    }

    const hallFlex = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.0, 9.2), mats.polyimideFpc);
    hallFlex.position.set(0.55, 0, -5.2);
    hallPod.add(hallFlex);

    apSensorGroup.add(hallPod);
  }
  parts.push(
    finalizeLensPart(
      'lens-aperture-sensor',
      33,
      '#8b5cf6',
      apSensorGroup,
      new THREE.Vector3(0, 0, 56.0),
      new THREE.Vector3(-54, 62, -98),
      new THREE.Vector3(-58, 66, 276),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L34: Switchable Steel-Ball Spring Click / De-Click Detent Cam (z = +56.0 mm)
  // =========================================================================
  const clickDetentGroup = new THREE.Group();
  {
    const detentArc = new THREE.Mesh(
      extrudeCentered(
        createCutawayArcRingShape(38.2, 36.4, THREE.MathUtils.degToRad(175), THREE.MathUtils.degToRad(260)),
        5.4,
        0.12,
        0.12,
        24
      ),
      mats.stainlessMachined
    );
    clickDetentGroup.add(detentArc);

    const detA = THREE.MathUtils.degToRad(212);
    const detPod = new THREE.Group();
    detPod.position.set(Math.cos(detA) * 37.8, Math.sin(detA) * 37.8, 0);
    detPod.rotation.z = detA;

    const steelBall = new THREE.Mesh(new THREE.SphereGeometry(1.15, 12, 10), mats.mountStainlessFlange);
    steelBall.position.x = -0.9;
    detPod.add(steelBall);

    const detSpring = new THREE.Mesh(
      createHelicalSpringGeometry(0.95, 3.6, 4, 0.24).rotateY(Math.PI / 2),
      mats.brassGear
    );
    detSpring.position.x = 1.2;
    detSpring.userData.noEdges = true;
    detPod.add(detSpring);

    // Flush-mounted slide-cam click ON/OFF retract lever
    const camSlider = new THREE.Mesh(new THREE.BoxGeometry(2.0, 4.2, 6.8), mats.lensAccentRing);
    camSlider.position.set(2.3, 0, 0);
    detPod.add(camSlider);

    clickDetentGroup.add(detPod);
  }
  parts.push(
    finalizeLensPart(
      'lens-click-detent',
      34,
      '#f59e0b',
      clickDetentGroup,
      new THREE.Vector3(0, 0, 56.0),
      new THREE.Vector3(-62, -40, -102),
      new THREE.Vector3(-68, -44, 276),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L35: [NEW!] Side Control Pod Weather-Sealed Tactile Switch PCB (asm 38.6, -4.0, 67.0)
  // =========================================================================
  const switchPcbGroup = new THREE.Group();
  {
    // Narrow curved-fit HDI switch sub-board sitting cleanly behind outer switch bezel
    const subPcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(1.5, 22.0, 0.5), 20.4, 0.08, 0.08, 10),
      mats.hdiMainboardPcb
    );
    switchPcbGroup.add(subPcb);

    // Dual gold tactile metal snap-dome buttons (Horizontal & Vertical Focus Hold!)
    for (const [sy, sz] of [[5.5, 4.5], [10.2, 0.0]]) {
      const domeBase = new THREE.Mesh(new THREE.BoxGeometry(0.9, 4.6, 4.6), mats.zifIvoryPlastic);
      domeBase.position.set(1.1, sy, sz);
      switchPcbGroup.add(domeBase);

      const goldDome = new THREE.Mesh(
        new THREE.CylinderGeometry(1.7, 1.9, 0.7, 14).rotateZ(Math.PI / 2),
        mats.goldPlating
      );
      goldDome.position.set(1.65, sy, sz);
      switchPcbGroup.add(goldDome);
    }

    // AF/MF slide switch electrical contact block
    const slideSw = new THREE.Mesh(new THREE.BoxGeometry(1.5, 4.4, 7.2), mats.stainlessMachined);
    slideSw.position.set(1.2, -5.2, -4.5);
    switchPcbGroup.add(slideSw);

    // Translucent silicone waterproof diaphragm sealing switches from rain
    const silMembrane = new THREE.Mesh(new THREE.BoxGeometry(0.45, 20.6, 18.8), mats.thermalPadBlue);
    silMembrane.position.set(2.15, 0, 0);
    silMembrane.userData.noEdges = true;
    switchPcbGroup.add(silMembrane);

    // Board-to-harness ZIF connector & polyimide tail
    const zifConn = new THREE.Mesh(new THREE.BoxGeometry(1.0, 4.8, 2.2), mats.zifIvoryPlastic);
    zifConn.position.set(-1.1, -6.0, -8.5);
    switchPcbGroup.add(zifConn);

    const swFlex = new THREE.Mesh(new THREE.BoxGeometry(0.4, 4.4, 12.0), mats.polyimideFpc);
    swFlex.position.set(-1.4, -6.0, -14.2);
    switchPcbGroup.add(swFlex);
  }
  parts.push(
    finalizeLensPart(
      'lens-switch-pcb',
      35,
      '#10b981',
      switchPcbGroup,
      new THREE.Vector3(38.6, -4.0, 67.0),
      new THREE.Vector3(72, -10, 8),
      new THREE.Vector3(76, -12, 358),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L36: [NEW!] 6-Stage Weather-Sealing EPDM O-Rings & Wiper Gaskets (z = +74.0 mm)
  // =========================================================================
  const weatherSealsGroup = new THREE.Group();
  {
    // 6 real weather-seal ring stations along the 50mm F1.2 barrel (local to z = 74.0 mm):
    // #1 Filter front (+40.2, full), #2 MF front (+31.5, cutaway), #3 MF rear (+11.5, cutaway),
    // #4 Aperture front (-12.5, cutaway), #5 Aperture rear (-24.0, cutaway), #6 Rear mount collar (-37.8, full)
    const sealStations: Array<{ z: number; r: number; tube: number; accent: boolean; fullRing: boolean }> = [
      { z: 40.2, r: 40.6, tube: 0.68, accent: false, fullRing: true },
      { z: 31.5, r: 40.4, tube: 0.74, accent: true, fullRing: false },
      { z: 11.5, r: 40.2, tube: 0.74, accent: false, fullRing: false },
      { z: -12.5, r: 38.6, tube: 0.72, accent: true, fullRing: false },
      { z: -24.0, r: 38.4, tube: 0.72, accent: false, fullRing: false },
      { z: -37.8, r: 34.8, tube: 0.85, accent: true, fullRing: true },
    ];

    for (const st of sealStations) {
      const arc = st.fullRing ? Math.PI * 2 : cutEnd - cutStart;
      const oRingGeo = new THREE.TorusGeometry(st.r, st.tube, 10, st.fullRing ? 42 : 34, arc);
      const oRing = new THREE.Mesh(oRingGeo, st.accent ? mats.mountThreadLockBlue : mats.epdmGasket);
      oRing.position.z = st.z;
      if (!st.fullRing) oRing.rotation.z = cutStart;
      oRing.userData.noEdges = true;
      weatherSealsGroup.add(oRing);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-weather-seals',
      36,
      '#0ea5e9',
      weatherSealsGroup,
      new THREE.Vector3(0, 0, 74.0),
      new THREE.Vector3(0, -68, 74),
      new THREE.Vector3(0, -72, 432),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L37: Knurled Rubber Focus Ring & Machined Aluminum Aperture Ring (z = +80.0 mm)
  // =========================================================================
  const ringsGroup = new THREE.Group();
  let focusRingMesh: THREE.Object3D = ringsGroup;
  {
    const focusRingSub = new THREE.Group();
    const focusRingShape = createCutawayArcRingShape(43.2, 40.4, cutStart, cutEnd);
    const focusRingBase = new THREE.Mesh(
      extrudeCentered(focusRingShape, 20.0, 0.35, 0.35, 40),
      mats.lensRubberGrip
    );
    focusRingBase.position.z = 16.0;
    focusRingSub.add(focusRingBase);

    const focusRibGeo = new THREE.BoxGeometry(0.8, 0.9, 17.6);
    const focusDegs: number[] = [];
    for (let deg = 172; deg <= 430; deg += 6) focusDegs.push(deg);
    const focusRibInst = new THREE.InstancedMesh(focusRibGeo, mats.matteBlackAnodized, focusDegs.length);
    focusDegs.forEach((deg, idx) => {
      const a = THREE.MathUtils.degToRad(deg);
      dummy.position.set(Math.cos(a) * 43.3, Math.sin(a) * 43.3, 16.0);
      dummy.rotation.set(0, 0, a);
      dummy.updateMatrix();
      focusRibInst.setMatrixAt(idx, dummy.matrix);
    });
    focusRibInst.instanceMatrix.needsUpdate = true;
    focusRingSub.add(focusRibInst);
    ringsGroup.add(focusRingSub);
    focusRingMesh = focusRingSub;

    const apRingShape = createCutawayArcRingShape(41.2, 38.4, cutStart, cutEnd);
    const apRing = new THREE.Mesh(
      extrudeCentered(apRingShape, 11.4, 0.25, 0.25, 38),
      mats.lensBarrelAnodized
    );
    apRing.position.z = -24.0;
    ringsGroup.add(apRing);

    const apRibGeo = new THREE.BoxGeometry(0.9, 0.7, 8.6);
    const apDegs: number[] = [];
    for (let deg = 176; deg <= 426; deg += 9) apDegs.push(deg);
    const apRibInst = new THREE.InstancedMesh(apRibGeo, mats.stainlessMachined, apDegs.length);
    apDegs.forEach((deg, idx) => {
      const a = THREE.MathUtils.degToRad(deg);
      dummy.position.set(Math.cos(a) * 41.35, Math.sin(a) * 41.35, -24.0);
      dummy.rotation.set(0, 0, a);
      dummy.updateMatrix();
      apRibInst.setMatrixAt(idx, dummy.matrix);
    });
    apRibInst.instanceMatrix.needsUpdate = true;
    ringsGroup.add(apRibInst);
  }
  parts.push(
    finalizeLensPart(
      'lens-control-rings',
      37,
      '#1e293b',
      ringsGroup,
      new THREE.Vector3(0, 0, 80.0),
      new THREE.Vector3(0, 116, 26),
      new THREE.Vector3(0, 124, 376),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L38: Weather-Sealed Anodized Outer Lens Barrel & Switch Escutcheon (z = +74.0 mm)
  // =========================================================================
  const barrelGroup = new THREE.Group();
  {
    const rearCollarGeo = new THREE.CylinderGeometry(40.2, 34.8, 12.0, 40, 1, true);
    rearCollarGeo.rotateX(Math.PI / 2);
    const rearCollar = new THREE.Mesh(rearCollarGeo, mats.lensBarrelAnodized);
    rearCollar.position.z = -33.2;
    barrelGroup.add(rearCollar);

    const rearCollarSolid = createLensCellRing(32.0, 35.2, 4.0, mats.lensBarrelAnodized, 40);
    rearCollarSolid.position.z = -38.0;
    barrelGroup.add(rearCollarSolid);

    const mountDot = new THREE.Mesh(new THREE.SphereGeometry(1.1, 10, 10), mats.mountRedIndexDot);
    mountDot.position.set(0, 37.6, -35.8);
    mountDot.userData.noEdges = true;
    barrelGroup.add(mountDot);

    const mainTubeShape = createCutawayArcRingShape(40.2, 37.2, cutStart, cutEnd);
    const mainTube = new THREE.Mesh(
      extrudeCentered(mainTubeShape, 56.0, 0.3, 0.3, 40),
      mats.lensBarrelAnodized
    );
    mainTube.position.z = 1.0;
    barrelGroup.add(mainTube);

    const frontCollar = createLensCellRing(37.4, 42.8, 12.5, mats.lensBarrelAnodized, 40);
    frontCollar.position.z = 35.5;
    barrelGroup.add(frontCollar);

    const accentBand = createLensCellRing(42.2, 43.3, 2.2, mats.lensAccentRing, 40);
    accentBand.position.z = 31.2;
    barrelGroup.add(accentBand);

    const switchPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.2, 24.0, 1.5), 22.0, 0.2, 0.2, 10),
      mats.matteBlackAnodized
    );
    switchPlate.position.set(40.2, -4.0, -7.0);
    barrelGroup.add(switchPlate);

    const holdBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(3.6, 3.8, 2.6, 16).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    holdBtn.position.set(42.4, 1.5, -2.5);
    barrelGroup.add(holdBtn);

    const afSwitch = new THREE.Mesh(new THREE.BoxGeometry(2.6, 5.2, 7.6), mats.lensRubberGrip);
    afSwitch.position.set(42.2, -9.2, -11.5);
    barrelGroup.add(afSwitch);
  }
  parts.push(
    finalizeLensPart(
      'lens-cutaway-barrel',
      38,
      '#475569',
      barrelGroup,
      new THREE.Vector3(0, 0, 74.0),
      new THREE.Vector3(0, -118, -18),
      new THREE.Vector3(0, -126, 340),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L39: [NEW!] Infinity-Focus Micron Brass & Stainless Mount Calibration Shims (z = +35.4 mm)
  // =========================================================================
  const bayonetShimsGroup = new THREE.Group();
  {
    // 3 precision stacked calibration shims (50um SUS + 20um Brass + 10um Blue-tempered SUS)
    const shim50 = createLensCellRing(27.8, 33.4, 0.52, mats.stainlessMachined, 38);
    shim50.position.z = 0.65;
    bayonetShimsGroup.add(shim50);

    const shim20 = createLensCellRing(28.0, 33.2, 0.36, mats.brassGear, 38);
    shim20.position.z = 0.0;
    bayonetShimsGroup.add(shim20);

    const shim10 = createLensCellRing(28.2, 33.0, 0.26, mats.mountShimBlue, 38);
    shim10.position.z = -0.52;
    bayonetShimsGroup.add(shim10);

    // Partial-arc 10um tilt-calibration shim wedge (real Lensrentals factory calibration detail!)
    const tiltShim = new THREE.Mesh(
      extrudeCentered(
        createCutawayArcRingShape(33.3, 28.0, THREE.MathUtils.degToRad(20), THREE.MathUtils.degToRad(115)),
        0.24,
        0.02,
        0.02,
        18
      ),
      mats.copperHeatSpreader
    );
    tiltShim.position.z = -0.92;
    bayonetShimsGroup.add(tiltShim);

    // 4 precision screw-clearance locating lugs on the brass shim ring
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const lug = new THREE.Mesh(
        new THREE.CylinderGeometry(1.75, 1.75, 1.45, 12).rotateX(Math.PI / 2),
        mats.brassGear
      );
      lug.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, 0);
      bayonetShimsGroup.add(lug);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-bayonet-shims',
      39,
      '#eab308',
      bayonetShimsGroup,
      new THREE.Vector3(0, 0, 35.4),
      new THREE.Vector3(0, 0, -200),
      new THREE.Vector3(0, 0, 214.6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L40: Hardened Stainless Rear Lens Bayonet, 12-Pin Contacts & Seal (z = +33.5 mm)
  // =========================================================================
  const rearBayonetGroup = new THREE.Group();
  {
    const flange = createLensCellRing(26.2, 34.0, 2.8, mats.mountStainlessFlange, 40);
    rearBayonetGroup.add(flange);

    for (const deg of [42, 132, 225, 312]) {
      const a0 = THREE.MathUtils.degToRad(deg - 15);
      const a1 = THREE.MathUtils.degToRad(deg + 15);
      const lug = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(28.0, 24.4, a0, a1), 2.1, 0.1, 0.1, 12),
        mats.mountStainlessFlange
      );
      lug.position.z = -2.2;
      rearBayonetGroup.add(lug);
    }

    const rearSeal = createLensCellRing(33.5, 35.2, 1.5, mats.epdmGasket, 40);
    rearSeal.position.z = -1.1;
    rearBayonetGroup.add(rearSeal);

    const contactBlock = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(27.0, 24.4, -Math.PI * 0.68, -Math.PI * 0.32), 2.2, 0.08, 0.08, 20),
      mats.mountPpsInsulator
    );
    contactBlock.position.z = 1.1;
    rearBayonetGroup.add(contactBlock);

    const padGeo = new THREE.BoxGeometry(1.1, 1.6, 0.55);
    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, 12);
    for (let i = 0; i < 12; i++) {
      const a = -Math.PI * 0.65 + (i / 11) * (Math.PI * 0.30);
      dummy.position.set(Math.cos(a) * 25.7, Math.sin(a) * 25.7, 0.0);
      dummy.rotation.set(0, 0, a);
      dummy.updateMatrix();
      padInst.setMatrixAt(i, dummy.matrix);
    }
    padInst.instanceMatrix.needsUpdate = true;
    rearBayonetGroup.add(padInst);

    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const screw = createPrecisionScrew(1.25, 0.7, 2.4, mats.stainlessMachined);
      screw.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, -1.2);
      screw.rotation.y = Math.PI;
      rearBayonetGroup.add(screw);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-bayonet',
      40,
      '#cbd5e1',
      rearBayonetGroup,
      new THREE.Vector3(0, 0, 33.5),
      new THREE.Vector3(0, 0, -218),
      new THREE.Vector3(0, 0, 202.5),
      cp,
      0.24
    )
  );

  // =========================================================================
  // Live Kinematic Rig: 11-Blade Iris + Cam + Dual Floating 3+2 Focus Groups + Encoders
  // =========================================================================
  const focusGroupAParts = [focusAFrontPart, focusGroupAPart, focusARearPart];
  const focusGroupBParts = [focusBFrontPart, focusGroupBPart];

  const rig: LensDynamicRig = {
    irisBlades,
    irisCamRing: irisCamRotor,
    focusGroupAParts,
    focusGroupBParts,
    moverCarriages,
    focusRingMesh,
    mfEncoderWheel,
    apertureHallRotor,
    applyDynamics: (elapsed, physicsActive, explodeFactor, integrated) => {
      const irisWave = physicsActive ? 0.5 - 0.5 * Math.cos(elapsed * 1.15) : 0;
      const bladeSwingRad = irisWave * 0.44;
      for (const pivot of irisBlades) {
        pivot.rotation.z = (pivot.userData.baseAngle as number) + bladeSwingRad;
      }
      irisCamRotor.rotation.z = irisWave * 0.24;
      apertureHallRotor.rotation.z = irisWave * 0.32;

      const focusWave = physicsActive ? Math.sin(elapsed * 1.85) : 0;
      const strokeA = focusWave * 3.4;
      const strokeB = -focusWave * 2.6 + Math.sin(elapsed * 3.7) * (physicsActive ? 0.45 : 0);

      for (const pA of focusGroupAParts) {
        const offsetA =
          integrated && pA.integratedExplodeOffset ? pA.integratedExplodeOffset : pA.explodeOffset;
        pA.group.position.z = pA.assembledPos.z + offsetA.z * explodeFactor + strokeA;
      }

      for (const pB of focusGroupBParts) {
        const offsetB =
          integrated && pB.integratedExplodeOffset ? pB.integratedExplodeOffset : pB.explodeOffset;
        pB.group.position.z = pB.assembledPos.z + offsetB.z * explodeFactor + strokeB;
      }

      for (const mover of moverCarriages) {
        const gIdx = mover.userData.groupIndex as number;
        const baseZ = mover.userData.baseZ as number;
        mover.position.z = baseZ + (gIdx === 0 ? strokeA : strokeB);
      }

      focusRingMesh.rotation.z = physicsActive ? focusWave * 0.18 : 0;
      mfEncoderWheel.rotation.z = physicsActive ? focusWave * 0.28 : 0;
    },
  };

  return { parts, rig };
}
