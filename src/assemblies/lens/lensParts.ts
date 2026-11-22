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
  focusGroupAPart: CadPart;
  focusGroupBPart: CadPart;
  moverCarriages: THREE.Group[];
  focusRingMesh: THREE.Object3D;
  mfEncoderWheel: THREE.Object3D;
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

function createLensCellRing(
  innerR: number,
  outerR: number,
  depth: number,
  mat: THREE.Material,
  curveSegments = 44
): THREE.Mesh {
  const shape = createRingShape(outerR, innerR);
  return new THREE.Mesh(extrudeCentered(shape, depth, 0.14, 0.14, curveSegments), mat);
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
 * Build ALL 22 ultra-detailed watchmaker-grade CAD sub-assemblies of a 2024-2026 Flagship
 * 50mm F1.2 Prime Lens (14-element / 10-group inspired architecture):
 *  - L01: Bayonet Cylindrical Hood & Lock Button
 *  - L02: 72mm Filter Thread Ring & Retaining Spanner Bezel (NEW!)
 *  - L03: Group 1 Large-Diameter 0.01um XA Front Element + Nano AR II
 *  - L04: Group 2 Positive Meniscus Collector & Micron-Lapped Brass Spacer (NEW!)
 *  - L05: Group 3 Super-ED + Flint Apochromatic Cemented Doublet
 *  - L06: 11-Blade Iris Slotted Cam Actuating Ring & Guide Plate (NEW!)
 *  - L07: 11-Blade Circular Carbon Iris Diaphragm Blades (Live F1.2 <-> F11)
 *  - L08: Silent Micro-Stepping Iris Actuator Motor & Worm Gear Train (NEW!)
 *  - L09: Floating Focus Group A (Front XA AF Carrier)
 *  - L10: Quad XD Linear Motor Stators: 8x N52 Neodymium Bars & Flux Yokes (NEW!)
 *  - L11: Quad XD Linear Motor Movers: 4x OFC Flat-Wire Copper Coils
 *  - L12: 4x Centerless-Ground Titanium Guide Shafts & End-Ring Cage (NEW!)
 *  - L13: 4x Sub-Micron MR Magnetic Position Sensors & Scale Strips (NEW!)
 *  - L14: Floating Focus Group B (Rear ED + Aspheric Corrector)
 *  - L15: Group 8 High-Index Lanthanum Sagittal Coma Corrector Lens (NEW!)
 *  - L16: Group 9 φ44mm Rear XA Hero Element & 3:2 Stray-Light Mask
 *  - L17: Circular Ring HDI 32-Bit AF MCU & 4ch H-Bridge Driver PCB (NEW!)
 *  - L18: Non-Contact Optical Slotted Linear-Response MF Encoder Wheel (NEW!)
 *  - L19: Switchable Steel-Ball Spring Click / De-Click Detent Cam Mechanism (NEW!)
 *  - L20: Knurled Rubber Focus Ring & Machined Aluminum Aperture Ring
 *  - L21: Weather-Sealed Magnesium/Composite Cutaway Outer Barrel & Switches
 *  - L22: Hardened Stainless 4-Lug Rear Bayonet, 12-Pin Gold Contacts & Seal (NEW!)
 */
export function buildLensParts(mats: MaterialLibrary): { parts: CadPart[]; rig: LensDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const irisBlades: THREE.Group[] = [];
  const moverCarriages: THREE.Group[] = [];
  const dummy = new THREE.Object3D();

  // =========================================================================
  // L01: Large-Diameter Bayonet Lock Cylindrical Lens Hood (z = +127.0 mm)
  // =========================================================================
  const hoodGroup = new THREE.Group();
  {
    const hoodShellGeo = new THREE.CylinderGeometry(44.2, 43.2, 22.0, 48, 1, true);
    hoodShellGeo.rotateX(Math.PI / 2);
    hoodGroup.add(new THREE.Mesh(hoodShellGeo, mats.lensBarrelAnodized));

    const frontRim = createLensCellRing(40.8, 44.6, 3.2, mats.lensRubberGrip, 48);
    frontRim.position.z = 10.6;
    hoodGroup.add(frontRim);

    const rearBayonet = createLensCellRing(39.4, 43.4, 3.4, mats.matteBlackAnodized, 44);
    rearBayonet.position.z = -10.2;
    hoodGroup.add(rearBayonet);

    for (let i = 0; i < 4; i++) {
      const baffle = createLensCellRing(40.5 + i * 0.15, 42.9, 1.0, mats.mountVelvetBaffle, 40);
      baffle.position.z = -6.5 + i * 4.4;
      baffle.userData.noEdges = true;
      hoodGroup.add(baffle);
    }

    const lockBtn = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(3.6, 7.6, 1.2), 5.6, 0.18, 0.18, 12),
      mats.stainlessMachined
    );
    lockBtn.position.set(-43.6, 0, -6.2);
    hoodGroup.add(lockBtn);

    const hoodDot = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 12), mats.mountRedIndexDot);
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
      new THREE.Vector3(0, 0, 178),
      new THREE.Vector3(0, 0, 370),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L02: [NEW!] φ72mm Filter Thread Bezel & Spanner Retaining Ring (z = +114.2 mm)
  // =========================================================================
  const filterRingGroup = new THREE.Group();
  {
    // Main threaded 72mm filter barrel bezel (ID 72mm => R 36.0, OD R 41.2)
    const threadBezel = createLensCellRing(36.0, 41.2, 5.2, mats.matteBlackAnodized, 44);
    filterRingGroup.add(threadBezel);

    // Subtle interior 72mm thread grooves (3 fine matte ribs)
    for (let i = -1; i <= 1; i++) {
      const groove = createLensCellRing(35.6, 36.2, 0.55, mats.stainlessMachined, 40);
      groove.position.z = i * 1.3;
      groove.userData.noEdges = true;
      filterRingGroup.add(groove);
    }

    // Iconic metallic gold-amber flagship front accent ring
    const accentTrim = createLensCellRing(36.2, 39.2, 1.3, mats.lensAccentRing, 44);
    accentTrim.position.z = 2.8;
    filterRingGroup.add(accentTrim);

    // Front lens clamping retainer ring with 4 precision spanner notches
    const clampRing = createLensCellRing(32.8, 36.4, 2.2, mats.lensBarrelAnodized, 44);
    clampRing.position.z = -1.6;
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
      new THREE.Vector3(0, 0, 114.2),
      new THREE.Vector3(0, 0, 148),
      new THREE.Vector3(0, 0, 350),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L03: Group 1 Large-Diameter 0.01um XA Front Element + Nano AR II (z = +108.5 mm)
  // =========================================================================
  const frontXaGroup = new THREE.Group();
  {
    const xaFrontGeo = createOpticalLensGeometry(33.2, 4.4, 6.2, -2.4, 0.55, 0.2, 22, 48);
    const xaFrontMesh = new THREE.Mesh(xaFrontGeo, mats.lensXaGlass);
    xaFrontMesh.userData.noEdges = true;
    frontXaGroup.add(xaFrontMesh);

    const edgeRim = createLensCellRing(32.5, 33.5, 4.4, mats.evfGlassEdgeRim, 44);
    frontXaGroup.add(edgeRim);

    const retainer = createLensCellRing(33.4, 37.8, 6.0, mats.matteBlackAnodized, 44);
    frontXaGroup.add(retainer);
  }
  parts.push(
    finalizeLensPart(
      'lens-front-xa',
      3,
      '#38bdf8',
      frontXaGroup,
      new THREE.Vector3(0, 0, 108.5),
      new THREE.Vector3(0, 0, 120),
      new THREE.Vector3(0, 0, 332),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L04: [NEW!] Group 2 Positive Meniscus Collector & Micron Brass Spacer (z = +101.8 mm)
  // =========================================================================
  const meniscusGroup = new THREE.Group();
  {
    // High-index Lanthanum positive meniscus lens glass (R = 31.4 mm)
    const menGeo = createOpticalLensGeometry(31.4, 3.6, 4.8, -1.6, 0.1, 0.0, 20, 46);
    const menMesh = new THREE.Mesh(menGeo, mats.evfLensAspheric);
    menMesh.userData.noEdges = true;
    meniscusGroup.add(menMesh);

    const menRim = createLensCellRing(30.8, 31.7, 3.8, mats.evfGlassEdgeRim, 44);
    meniscusGroup.add(menRim);

    // Micron-lapped precision brass optical air-gap spacer ring (front +Z face!)
    const brassSpacer = createLensCellRing(31.2, 34.8, 1.4, mats.brassGear, 44);
    brassSpacer.position.z = 2.6;
    meniscusGroup.add(brassSpacer);

    // Anodized retaining sleeve
    const cell = createLensCellRing(31.6, 35.6, 4.6, mats.matteBlackAnodized, 44);
    cell.position.z = -0.5;
    meniscusGroup.add(cell);
  }
  parts.push(
    finalizeLensPart(
      'lens-front-meniscus',
      4,
      '#60a5fa',
      meniscusGroup,
      new THREE.Vector3(0, 0, 101.8),
      new THREE.Vector3(0, 0, 94),
      new THREE.Vector3(0, 0, 316),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L05: Group 3 Super-ED + Flint Apochromatic Cemented Doublet (z = +95.0 mm)
  // =========================================================================
  const edGroup = new THREE.Group();
  {
    const edFrontGeo = createOpticalLensGeometry(29.8, 3.6, 4.6, 2.2, 0.15, 0.0, 20, 46);
    const edFrontMesh = new THREE.Mesh(edFrontGeo, mats.lensEdGlass);
    edFrontMesh.position.z = 2.4;
    edFrontMesh.userData.noEdges = true;
    edGroup.add(edFrontMesh);

    const flintGeo = createOpticalLensGeometry(29.6, 2.6, -2.1, -3.2, 0.0, 0.2, 20, 46);
    const flintMesh = new THREE.Mesh(flintGeo, mats.evfLensField);
    flintMesh.position.z = -1.6;
    flintMesh.userData.noEdges = true;
    edGroup.add(flintMesh);

    const edRim = createLensCellRing(29.2, 30.2, 6.2, mats.evfGlassEdgeRim, 44);
    edRim.position.z = 0.6;
    edGroup.add(edRim);

    const edCell = createLensCellRing(30.0, 34.4, 8.2, mats.matteBlackAnodized, 44);
    edCell.position.z = 0.5;
    edGroup.add(edCell);

    const spacer = createLensCellRing(30.4, 33.4, 0.9, mats.brassGear, 40);
    spacer.position.z = -4.0;
    edGroup.add(spacer);
  }
  parts.push(
    finalizeLensPart(
      'lens-ed-group',
      5,
      '#10b981',
      edGroup,
      new THREE.Vector3(0, 0, 95.0),
      new THREE.Vector3(0, 0, 68),
      new THREE.Vector3(0, 0, 302),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L06: [NEW!] 11-Blade Iris Slotted Cam Actuating Ring & Guide Plate (z = +84.4 mm)
  // =========================================================================
  const irisCamGroup = new THREE.Group();
  const irisCamRotor = new THREE.Group();
  {
    // Main precision slotted stainless cam actuating ring
    const camRing = createLensCellRing(24.8, 32.6, 1.6, mats.stainlessMachined, 44);
    irisCamRotor.add(camRing);

    // 11 Radial non-linear cam slots etched visually around the ring face (InstancedMesh!)
    const slotGeo = new THREE.BoxGeometry(5.6, 1.05, 0.35);
    const slotInst = new THREE.InstancedMesh(slotGeo, mats.mountVelvetBaffle, 11);
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 28.4, Math.sin(a) * 28.4, 0.78);
      dummy.rotation.set(0, 0, a + 0.55);
      dummy.updateMatrix();
      slotInst.setMatrixAt(i, dummy.matrix);
    }
    slotInst.instanceMatrix.needsUpdate = true;
    irisCamRotor.add(slotInst);

    // Outer brass driven sector gear arc on lower-left (+X, -Y) meshing with L08 stepper!
    const sectorArc = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(34.6, 32.0, -Math.PI * 0.34, -Math.PI * 0.08), 1.8, 0.08, 0.08, 22),
      mats.brassGear
    );
    irisCamRotor.add(sectorArc);

    irisCamGroup.add(irisCamRotor);

    // Stationary housing front clamp ring
    const frontHousing = createLensCellRing(24.5, 33.2, 1.4, mats.shutterChassis, 44);
    frontHousing.position.z = 1.6;
    irisCamGroup.add(frontHousing);
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-cam-ring',
      6,
      '#cbd5e1',
      irisCamGroup,
      new THREE.Vector3(0, 0, 84.4),
      new THREE.Vector3(0, 0, 48),
      new THREE.Vector3(0, 0, 290),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L07: 11-Blade Circular Carbon Iris Diaphragm Blades (z = +82.0 mm)
  // =========================================================================
  const irisGroup = new THREE.Group();
  {
    const irisBasePlate = createLensCellRing(24.8, 33.2, 2.6, mats.shutterChassis, 44);
    irisBasePlate.position.z = -1.2;
    irisGroup.add(irisBasePlate);

    const bladeCount = 11;
    const pivotR = 27.6;

    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, -1.6);
    bladeShape.quadraticCurveTo(11.5, -2.8, 22.8, 3.2);
    bladeShape.quadraticCurveTo(24.0, 5.4, 21.6, 6.8);
    bladeShape.quadraticCurveTo(10.5, 2.2, 0, 2.2);
    bladeShape.absarc(0, 0, 1.9, Math.PI * 0.5, -Math.PI * 0.5, false);
    bladeShape.closePath();

    const bladeGeo = extrudeCentered(bladeShape, 0.24, 0.02, 0.02, 12);

    for (let i = 0; i < bladeCount; i++) {
      const a = (i / bladeCount) * Math.PI * 2;
      const bladePivot = new THREE.Group();
      bladePivot.position.set(
        Math.cos(a) * pivotR,
        Math.sin(a) * pivotR,
        -0.3 + (i % 3) * 0.22
      );
      const baseAngle = a + Math.PI * 0.62;
      bladePivot.userData.baseAngle = baseAngle;
      bladePivot.rotation.z = baseAngle;

      const bladeMesh = new THREE.Mesh(bladeGeo, mats.carbonFiberBlade);
      bladeMesh.userData.edgeOpacity = 0.34;
      bladePivot.add(bladeMesh);

      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.62, 0.62, 1.1, 10).rotateX(Math.PI / 2),
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
      7,
      '#475569',
      irisGroup,
      new THREE.Vector3(0, 0, 82.0),
      new THREE.Vector3(0, 0, 32),
      new THREE.Vector3(0, 0, 278),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L08: [NEW!] Silent Micro-Stepping Iris Actuator Motor & Worm Gear (z = +80.5 mm)
  // =========================================================================
  const irisStepperGroup = new THREE.Group();
  {
    // Cylindrical 2-phase silent micro-stepping motor body
    const motorCan = new THREE.Mesh(
      new THREE.CylinderGeometry(4.2, 4.2, 8.6, 20).rotateX(Math.PI / 2),
      mats.copperCoil
    );
    irisStepperGroup.add(motorCan);

    // End shield cap & stainless bracket
    const endCap = new THREE.Mesh(
      new THREE.CylinderGeometry(4.35, 4.35, 1.6, 20).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    endCap.position.z = -4.2;
    irisStepperGroup.add(endCap);

    // Helical brass pinion + POM silent reduction spur gear meshing with L06 cam sector
    const pinion = new THREE.Mesh(
      createSpurGearGeometry(12, 2.2, 2.2, 0.7),
      mats.brassGear
    );
    pinion.position.set(0, 0, 5.2);
    irisStepperGroup.add(pinion);

    const spurGear = new THREE.Mesh(
      createSpurGearGeometry(18, 3.6, 1.8, 0.9),
      mats.pomGear
    );
    spurGear.position.set(-4.2, 3.4, 5.0);
    irisStepperGroup.add(spurGear);

    // Optical photo-interrupter home-position fork sensor
    const homeSensor = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.8, 2.6), mats.icEpoxy);
    homeSensor.position.set(-6.0, 6.2, 3.2);
    irisStepperGroup.add(homeSensor);

    // Orange FPC ribbon tail connecting stepper to L17 Lens MCU Ring PCB
    const fpc = new THREE.Mesh(new THREE.BoxGeometry(4.6, 14.0, 0.4), mats.polyimideFpc);
    fpc.position.set(2.2, 6.0, -3.5);
    irisStepperGroup.add(fpc);
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-stepper',
      8,
      '#b45309',
      irisStepperGroup,
      new THREE.Vector3(28.5, -18.0, 80.5),
      new THREE.Vector3(36, -24, 34),
      new THREE.Vector3(44, -26, 282),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L09: Floating Focus Moving Group A (Front XA AF Carrier, z = +72.0 mm)
  // =========================================================================
  const focusAGroup = new THREE.Group();
  {
    const fAGeo = createOpticalLensGeometry(24.6, 3.2, 4.2, 1.8, 0.45, 0.15, 20, 44);
    const fAMesh = new THREE.Mesh(fAGeo, mats.lensXaGlass);
    fAMesh.userData.noEdges = true;
    focusAGroup.add(fAMesh);

    focusAGroup.add(createLensCellRing(24.1, 25.0, 3.4, mats.evfGlassEdgeRim, 40));
    focusAGroup.add(createLensCellRing(24.9, 28.8, 6.2, mats.matteBlackAnodized, 40));

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
    9,
    '#0ea5e9',
    focusAGroup,
    new THREE.Vector3(0, 0, 72.0),
    new THREE.Vector3(0, 0, 12),
    new THREE.Vector3(0, 0, 266),
    cp,
    0.24
  );
  parts.push(focusGroupAPart);

  // =========================================================================
  // L10: [NEW!] Quad XD Linear Motor Stators: 8x N52 Magnets & Soft-Iron Yokes (z = +65.0 mm)
  // =========================================================================
  const xdStatorsGroup = new THREE.Group();
  const motorAnglesDeg = [45, 135, 225, 315];
  const motorR = 32.8;
  {
    for (const deg of motorAnglesDeg) {
      const a = THREE.MathUtils.degToRad(deg);
      const stator = new THREE.Group();
      stator.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      stator.rotation.z = a;

      // Dual N52 Neodymium permanent magnet bars flanking the mover coil air gap
      for (const sy of [-3.1, 3.1]) {
        const mag = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 31.0), mats.neodymiumMagnet);
        mag.position.set(1.6, sy, 0);
        stator.add(mag);
      }

      // Outer high-permeability soft-iron flux-return yoke spine
      const yoke = new THREE.Mesh(new THREE.BoxGeometry(1.5, 9.0, 32.6), mats.softIronYoke);
      yoke.position.set(3.4, 0, 0);
      stator.add(yoke);

      xdStatorsGroup.add(stator);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-xd-stators',
      10,
      '#64748b',
      xdStatorsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(-42, 0, -4),
      new THREE.Vector3(-46, 0, 254),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L11: Quad XD Linear Motor Movers: 4x OFC Flat-Wire Copper Coils (z = +65.0 mm)
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

      // Oxygen-Free Copper flat-wire moving coil bobbin
      const coilCore = new THREE.Mesh(new THREE.BoxGeometry(3.8, 6.2, 10.8), mats.copperCoil);
      coilCore.position.set(0.6, 0, 0);
      mover.add(coilCore);

      // U-loop polyimide flexible power tail
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
      11,
      '#d97706',
      xdMotorsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(0, 0, -6),
      new THREE.Vector3(0, 0, 254),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L12: [NEW!] 4x Centerless-Ground Titanium Guide Shafts & End-Ring Cage (z = +65.0 mm)
  // =========================================================================
  const guideShaftsGroup = new THREE.Group();
  {
    for (const zEnd of [-17.6, 17.6]) {
      const endRing = createLensCellRing(29.8, 36.0, 2.2, mats.magnesiumCast, 44);
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
      12,
      '#94a3b8',
      guideShaftsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(0, 0, -24),
      new THREE.Vector3(0, 0, 242),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L13: [NEW!] 4x Sub-Micron MR Magnetic Encoders & Magnetized Scale Strips (z = +65.0 mm)
  // =========================================================================
  const mrEncodersGroup = new THREE.Group();
  {
    for (let i = 0; i < motorAnglesDeg.length; i++) {
      const a = THREE.MathUtils.degToRad(motorAnglesDeg[i]);
      const enc = new THREE.Group();
      enc.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      enc.rotation.z = a;

      // Magnetized fine-pitch linear scale bar
      const mrStrip = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.2, 29.4), mats.hdiMainboardPcb);
      mrStrip.position.set(-1.9, 3.6, 0);
      enc.add(mrStrip);

      // Gold MR magnetic resistance sensor read-head IC
      const mrHead = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.3, 3.4), mats.goldPlating);
      mrHead.position.set(-1.2, 3.6, i % 2 === 0 ? 5.5 : -6.5);
      enc.add(mrHead);

      // Signal flex routing back toward L17 Ring MCU PCB
      const sigFlex = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.8, 12.0), mats.polyimideFpc);
      sigFlex.position.set(-2.3, 3.6, -11.0);
      enc.add(sigFlex);

      mrEncodersGroup.add(enc);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-mr-encoders',
      13,
      '#16a34a',
      mrEncodersGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(44, 0, -14),
      new THREE.Vector3(48, 0, 248),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L14: Floating Focus Moving Group B (Rear ED + Aspheric Corrector, z = +57.0 mm)
  // =========================================================================
  const focusBGroup = new THREE.Group();
  {
    const fBGeo = createOpticalLensGeometry(24.0, 3.0, -2.0, 3.8, 0.2, 0.4, 20, 44);
    const fBMesh = new THREE.Mesh(fBGeo, mats.lensEdGlass);
    fBMesh.userData.noEdges = true;
    focusBGroup.add(fBMesh);

    focusBGroup.add(createLensCellRing(23.5, 24.4, 3.2, mats.evfGlassEdgeRim, 40));
    focusBGroup.add(createLensCellRing(24.3, 28.4, 5.8, mats.matteBlackAnodized, 40));

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
    14,
    '#14b8a6',
    focusBGroup,
    new THREE.Vector3(0, 0, 57.0),
    new THREE.Vector3(0, 0, -44),
    new THREE.Vector3(0, 0, 232),
    cp,
    0.24
  );
  parts.push(focusGroupBPart);

  // =========================================================================
  // L15: [NEW!] Group 8 High-Index Lanthanum Sagittal Coma Corrector Lens (z = +49.2 mm)
  // =========================================================================
  const rearConvexGroup = new THREE.Group();
  {
    const convGeo = createOpticalLensGeometry(23.4, 2.8, 3.4, 2.6, 0.15, 0.1, 20, 44);
    const convMesh = new THREE.Mesh(convGeo, mats.evfLensField);
    convMesh.userData.noEdges = true;
    rearConvexGroup.add(convMesh);

    rearConvexGroup.add(createLensCellRing(22.9, 23.8, 3.0, mats.evfGlassEdgeRim, 40));
    rearConvexGroup.add(createLensCellRing(23.7, 27.6, 5.2, mats.matteBlackAnodized, 40));
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-convex',
      15,
      '#818cf8',
      rearConvexGroup,
      new THREE.Vector3(0, 0, 49.2),
      new THREE.Vector3(0, 0, -64),
      new THREE.Vector3(0, 0, 222),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L16: Group 9 φ44mm Rear XA Hero Element & 3:2 Stray-Light Mask (z = +42.0 mm)
  // =========================================================================
  const rearHeroGroup = new THREE.Group();
  {
    const rearGeo = createOpticalLensGeometry(22.6, 3.6, 2.2, 4.4, 0.3, 0.55, 20, 44);
    const rearMesh = new THREE.Mesh(rearGeo, mats.lensXaGlass);
    rearMesh.userData.noEdges = true;
    rearHeroGroup.add(rearMesh);

    rearHeroGroup.add(createLensCellRing(22.1, 23.0, 3.8, mats.evfGlassEdgeRim, 40));
    rearHeroGroup.add(createLensCellRing(22.9, 26.8, 6.4, mats.mountVelvetBaffle, 40));

    const rearMask = createLensCellRing(21.4, 24.2, 1.0, mats.matteBlackAnodized, 36);
    rearMask.position.z = -3.8;
    rearHeroGroup.add(rearMask);
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-element',
      16,
      '#6366f1',
      rearHeroGroup,
      new THREE.Vector3(0, 0, 42.0),
      new THREE.Vector3(0, 0, -84),
      new THREE.Vector3(0, 0, 212),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L17: [NEW!] Circular Ring HDI 32-Bit AF MCU & 4ch H-Bridge Driver PCB (z = +45.5 mm)
  // =========================================================================
  const mcuPcbGroup = new THREE.Group();
  {
    // Annular multi-layer green HDI donut PCB wrapping cleanly around the rear optical barrel!
    const pcbRing = createLensCellRing(28.2, 36.8, 1.4, mats.hdiMainboardPcb, 44);
    mcuPcbGroup.add(pcbRing);

    // 32-bit Real-Time AF Microcontroller (QFN IC) at top (-X, +Y shoulder)
    const mcuIc = new THREE.Mesh(new THREE.BoxGeometry(6.2, 6.2, 1.1), mats.icEpoxy);
    mcuIc.position.set(0, 32.5, 1.2);
    mcuPcbGroup.add(mcuIc);

    // 4x High-Current H-Bridge MOSFET Driver ICs symmetrically aligned with the 4 XD motors!
    for (const deg of motorAnglesDeg) {
      const a = THREE.MathUtils.degToRad(deg);
      const drv = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.4, 1.0), mats.icEpoxy);
      drv.position.set(Math.cos(a) * 32.4, Math.sin(a) * 32.4, 1.15);
      drv.rotation.z = a;
      mcuPcbGroup.add(drv);

      // Gold ZIF connector beside each H-Bridge
      const zif = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.6, 0.8), mats.zifIvoryPlastic);
      zif.position.set(Math.cos(a + 0.22) * 32.2, Math.sin(a + 0.22) * 32.2, 1.05);
      zif.rotation.z = a + 0.22;
      mcuPcbGroup.add(zif);
    }

    // Instanced yellow tantalum bulk capacitors around the 4ch H-Bridge power rail
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
      17,
      '#15803d',
      mcuPcbGroup,
      new THREE.Vector3(0, 0, 45.5),
      new THREE.Vector3(0, -56, -72),
      new THREE.Vector3(0, -58, 212),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L18: [NEW!] Non-Contact Optical Slotted MF Rotary Encoder Wheel (z = +92.0 mm)
  // =========================================================================
  const mfEncoderGroup = new THREE.Group();
  const mfEncoderWheel = new THREE.Group();
  {
    const wheelRing = createLensCellRing(37.0, 39.4, 1.8, mats.goldPlating, 44);
    mfEncoderWheel.add(wheelRing);

    // 48 high-resolution optical encoder slits around circumference (InstancedMesh!)
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

    // Dual-channel quadrature optical photo-interrupter IC pickup at bottom
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
      18,
      '#eab308',
      mfEncoderGroup,
      new THREE.Vector3(0, 0, 92.0),
      new THREE.Vector3(0, 46, 56),
      new THREE.Vector3(0, 48, 304),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L19: [NEW!] Switchable Steel-Ball Spring Click / De-Click Detent Cam (z = +56.0 mm)
  // =========================================================================
  const clickDetentGroup = new THREE.Group();
  {
    // Inner notched stainless detent ring with 1/3-stop V-grooves around bottom arc
    const detentArc = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(38.2, 36.4, THREE.MathUtils.degToRad(175), THREE.MathUtils.degToRad(260)), 5.4, 0.12, 0.12, 28),
      mats.stainlessMachined
    );
    clickDetentGroup.add(detentArc);

    // Precision steel detent ball bearing + compression spring plunger at 212° (-X, -Y)
    const detA = THREE.MathUtils.degToRad(212);
    const detPod = new THREE.Group();
    detPod.position.set(Math.cos(detA) * 37.8, Math.sin(detA) * 37.8, 0);
    detPod.rotation.z = detA;

    const steelBall = new THREE.Mesh(new THREE.SphereGeometry(1.15, 14, 12), mats.mountStainlessFlange);
    steelBall.position.x = -0.9;
    detPod.add(steelBall);

    const detSpring = new THREE.Mesh(
      createHelicalSpringGeometry(0.95, 3.6, 4, 0.24).rotateY(Math.PI / 2),
      mats.brassGear
    );
    detSpring.position.x = 1.2;
    detSpring.userData.noEdges = true;
    detPod.add(detSpring);

    // Slide-cam click ON/OFF retract lever seated cleanly flush along outer aperture barrel
    const camSlider = new THREE.Mesh(new THREE.BoxGeometry(2.0, 4.2, 6.8), mats.lensAccentRing);
    camSlider.position.set(2.3, 0, 0);
    detPod.add(camSlider);

    clickDetentGroup.add(detPod);
  }
  parts.push(
    finalizeLensPart(
      'lens-click-detent',
      19,
      '#f59e0b',
      clickDetentGroup,
      new THREE.Vector3(0, 0, 56.0),
      new THREE.Vector3(-48, -32, -32),
      new THREE.Vector3(-56, -34, 232),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L20: Knurled Rubber Focus Ring & Machined Aluminum Aperture Ring (z = +80.0 mm)
  // =========================================================================
  const ringsGroup = new THREE.Group();
  let focusRingMesh: THREE.Object3D = ringsGroup;
  {
    const cutStart = THREE.MathUtils.degToRad(168);
    const cutEnd = THREE.MathUtils.degToRad(435);

    const focusRingSub = new THREE.Group();
    const focusRingShape = createCutawayArcRingShape(43.2, 40.4, cutStart, cutEnd);
    const focusRingBase = new THREE.Mesh(
      extrudeCentered(focusRingShape, 20.0, 0.35, 0.35, 44),
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
      extrudeCentered(apRingShape, 11.4, 0.25, 0.25, 42),
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
      20,
      '#1e293b',
      ringsGroup,
      new THREE.Vector3(0, 0, 80.0),
      new THREE.Vector3(0, 86, 18),
      new THREE.Vector3(0, 92, 276),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L21: Weather-Sealed Anodized Outer Lens Barrel & Switch Pod (z = +74.0 mm)
  // =========================================================================
  const barrelGroup = new THREE.Group();
  {
    const cutStart = THREE.MathUtils.degToRad(168);
    const cutEnd = THREE.MathUtils.degToRad(435);

    const rearCollarGeo = new THREE.CylinderGeometry(40.2, 34.8, 12.0, 44, 1, true);
    rearCollarGeo.rotateX(Math.PI / 2);
    const rearCollar = new THREE.Mesh(rearCollarGeo, mats.lensBarrelAnodized);
    rearCollar.position.z = -33.2;
    barrelGroup.add(rearCollar);

    const rearCollarSolid = createLensCellRing(32.0, 35.2, 4.0, mats.lensBarrelAnodized, 44);
    rearCollarSolid.position.z = -38.0;
    barrelGroup.add(rearCollarSolid);

    const mountDot = new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 12), mats.mountRedIndexDot);
    mountDot.position.set(0, 37.6, -35.8);
    mountDot.userData.noEdges = true;
    barrelGroup.add(mountDot);

    const mainTubeShape = createCutawayArcRingShape(40.2, 37.2, cutStart, cutEnd);
    const mainTube = new THREE.Mesh(
      extrudeCentered(mainTubeShape, 56.0, 0.3, 0.3, 44),
      mats.lensBarrelAnodized
    );
    mainTube.position.z = 1.0;
    barrelGroup.add(mainTube);

    const frontCollar = createLensCellRing(37.4, 42.8, 12.5, mats.lensBarrelAnodized, 44);
    frontCollar.position.z = 35.5;
    barrelGroup.add(frontCollar);

    const accentBand = createLensCellRing(42.2, 43.3, 2.2, mats.lensAccentRing, 44);
    accentBand.position.z = 31.2;
    barrelGroup.add(accentBand);

    // Left-flank (+X) tactile Focus Hold Button & AF/MF Switch Panel
    const switchPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.2, 24.0, 1.5), 22.0, 0.2, 0.2, 12),
      mats.matteBlackAnodized
    );
    switchPlate.position.set(40.2, -4.0, -7.0);
    barrelGroup.add(switchPlate);

    const holdBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(3.6, 3.8, 2.6, 18).rotateZ(Math.PI / 2),
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
      21,
      '#475569',
      barrelGroup,
      new THREE.Vector3(0, 0, 74.0),
      new THREE.Vector3(0, -88, -8),
      new THREE.Vector3(0, -96, 258),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L22: [NEW!] Hardened Stainless Rear Lens Bayonet, 12-Pin Contacts & Seal (z = +33.5 mm)
  // =========================================================================
  const rearBayonetGroup = new THREE.Group();
  {
    // CNC mirror-lapped stainless 4-lug lens bayonet ring mating flush against M01 Body Mount!
    const flange = createLensCellRing(26.2, 34.0, 2.8, mats.mountStainlessFlange, 44);
    rearBayonetGroup.add(flange);

    // 4 Asymmetrical lens-side bayonet locking lugs extending rearward (-Z)
    for (const deg of [42, 132, 225, 312]) {
      const a0 = THREE.MathUtils.degToRad(deg - 15);
      const a1 = THREE.MathUtils.degToRad(deg + 15);
      const lug = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(28.0, 24.4, a0, a1), 2.1, 0.1, 0.1, 14),
        mats.mountStainlessFlange
      );
      lug.position.z = -2.2;
      rearBayonetGroup.add(lug);
    }

    // Perimeter EPDM weather-sealing rubber lip gasket
    const rearSeal = createLensCellRing(33.5, 35.2, 1.5, mats.epdmGasket, 44);
    rearSeal.position.z = -1.1;
    rearBayonetGroup.add(rearSeal);

    // 12-Pin Gold-Plated Lens Contact Arc Block (mating Body M07 pogo pins!)
    const contactBlock = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(27.0, 24.4, -Math.PI * 0.68, -Math.PI * 0.32), 2.2, 0.08, 0.08, 22),
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

    // 4 high-tensile stainless mount flange screws
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
      22,
      '#cbd5e1',
      rearBayonetGroup,
      new THREE.Vector3(0, 0, 33.5),
      new THREE.Vector3(0, 0, -108),
      new THREE.Vector3(0, 0, 202),
      cp,
      0.24
    )
  );

  // =========================================================================
  // Live Kinematic Rig: 11-Blade Iris + Cam Ring + Dual Floating XD Linear Focus + MF Encoder
  // =========================================================================
  const rig: LensDynamicRig = {
    irisBlades,
    irisCamRing: irisCamRotor,
    focusGroupAPart,
    focusGroupBPart,
    moverCarriages,
    focusRingMesh,
    mfEncoderWheel,
    applyDynamics: (elapsed, physicsActive, explodeFactor, integrated) => {
      const irisWave = physicsActive ? 0.5 - 0.5 * Math.cos(elapsed * 1.15) : 0;
      const bladeSwingRad = irisWave * 0.44;
      for (const pivot of irisBlades) {
        pivot.rotation.z = (pivot.userData.baseAngle as number) + bladeSwingRad;
      }
      irisCamRotor.rotation.z = irisWave * 0.24;

      const focusWave = physicsActive ? Math.sin(elapsed * 1.85) : 0;
      const strokeA = focusWave * 4.2;
      const strokeB = -focusWave * 3.1 + Math.sin(elapsed * 3.7) * (physicsActive ? 0.55 : 0);

      const offsetA =
        integrated && focusGroupAPart.integratedExplodeOffset
          ? focusGroupAPart.integratedExplodeOffset
          : focusGroupAPart.explodeOffset;
      focusGroupAPart.group.position.z =
        focusGroupAPart.assembledPos.z + offsetA.z * explodeFactor + strokeA;

      const offsetB =
        integrated && focusGroupBPart.integratedExplodeOffset
          ? focusGroupBPart.integratedExplodeOffset
          : focusGroupBPart.explodeOffset;
      focusGroupBPart.group.position.z =
        focusGroupBPart.assembledPos.z + offsetB.z * explodeFactor + strokeB;

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
