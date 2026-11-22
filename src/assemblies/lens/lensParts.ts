import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createOpticalLensGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { LENS_EXPLANATIONS } from './lensExplanations';

export interface LensDynamicRig {
  irisBlades: THREE.Group[];
  focusGroupAPart: CadPart;
  focusGroupBPart: CadPart;
  moverCarriages: THREE.Group[];
  focusRingMesh: THREE.Object3D;
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
  mat: THREE.Material
): THREE.Mesh {
  const shape = createRingShape(outerR, innerR);
  return new THREE.Mesh(extrudeCentered(shape, depth, 0.16, 0.16, 56), mat);
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
 * Build all 10 ultra-detailed CAD sub-assemblies of a 2024-2026 Flagship
 * 50mm F1.2 Prime Lens with 3x XA Aspherical Glass, Super-ED Doublet,
 * 11-Blade Circular Electromagnetic Iris, Dual Floating Focus Groups,
 * 4x XD Linear Motors + 4x MR Scale Encoders, Control Rings & Architectural Cutaway Barrel.
 *
 * Mounts flush onto the 55mm Mirrorless Lens Mount front flange datum (z = +32.0 mm),
 * extending cleanly from z = +32.5 mm to z = +138.0 mm along the optical axis (0, 0).
 */
export function buildLensParts(mats: MaterialLibrary): { parts: CadPart[]; rig: LensDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const irisBlades: THREE.Group[] = [];
  const moverCarriages: THREE.Group[] = [];

  // =========================================================================
  // L01: Large-Diameter Bayonet Lock Cylindrical Lens Hood (z = +127.0 mm)
  // =========================================================================
  const hoodGroup = new THREE.Group();
  {
    // Main outer cylindrical hood body (cut away softly only on inner ribs; sleek full cylinder silhouette)
    const hoodShellGeo = new THREE.CylinderGeometry(44.2, 43.2, 22.0, 64, 1, true);
    hoodShellGeo.rotateX(Math.PI / 2);
    const outerCyl = new THREE.Mesh(hoodShellGeo, mats.lensBarrelAnodized);
    hoodGroup.add(outerCyl);

    // Thickened front elastomer shock bumper rim
    const frontRim = createLensCellRing(40.8, 44.6, 3.2, mats.lensRubberGrip);
    frontRim.position.z = 10.6;
    hoodGroup.add(frontRim);

    // Rear bayonet coupling ring
    const rearBayonet = createLensCellRing(39.4, 43.4, 3.4, mats.matteBlackAnodized);
    rearBayonet.position.z = -10.2;
    hoodGroup.add(rearBayonet);

    // 4 interior concentric stray-light-trap baffles (matte velvet black)
    for (let i = 0; i < 4; i++) {
      const baffle = createLensCellRing(40.5 + i * 0.15, 42.9, 1.1, mats.mountVelvetBaffle);
      baffle.position.z = -6.5 + i * 4.4;
      baffle.userData.noEdges = true;
      hoodGroup.add(baffle);
    }

    // Spring-loaded hood lock release button (on -X grip-accessible flank)
    const lockBtn = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(3.6, 7.6, 1.2), 5.6, 0.18, 0.18, 14),
      mats.stainlessMachined
    );
    lockBtn.position.set(-43.6, 0, -6.2);
    hoodGroup.add(lockBtn);

    // Subtle red alignment dot on hood rear rim
    const hoodDot = new THREE.Mesh(new THREE.SphereGeometry(0.9, 14, 14), mats.mountRedIndexDot);
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
      new THREE.Vector3(0, 0, 118),
      new THREE.Vector3(0, 0, 340),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L02: Large-Diameter XA Front Element + Nano AR II & Fluorine (z = +108.5 mm)
  // =========================================================================
  const frontXaGroup = new THREE.Group();
  {
    // Thick curved convex-meniscus front XA glass (R = 33.2 mm, F1.2 entrance pupil!)
    const xaFrontGeo = createOpticalLensGeometry(33.2, 4.4, 6.2, -2.4, 0.55, 0.2, 26, 60);
    const xaFrontMesh = new THREE.Mesh(xaFrontGeo, mats.lensXaGlass);
    xaFrontMesh.userData.noEdges = true;
    frontXaGroup.add(xaFrontMesh);

    // Polished cyan glass outer bevel edge rim so glass curvature reads razor-sharp on white!
    const edgeRim = createLensCellRing(32.5, 33.5, 4.4, mats.evfGlassEdgeRim);
    frontXaGroup.add(edgeRim);

    // Precision CNC aluminum retainer cell with 72mm filter thread lip
    const retainer = createLensCellRing(33.3, 38.6, 7.2, mats.matteBlackAnodized);
    retainer.position.z = 0.6;
    frontXaGroup.add(retainer);

    // Signature metallic gold-amber flagship accent trim ring on front cell
    const accentTrim = createLensCellRing(36.2, 38.9, 1.2, mats.lensAccentRing);
    accentTrim.position.z = 4.3;
    frontXaGroup.add(accentTrim);

    // 4 micro retainer spanner notches around front retaining ring
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const notch = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.0, 0.7), mats.stainlessMachined);
      notch.position.set(Math.cos(a) * 35.0, Math.sin(a) * 35.0, 4.5);
      notch.rotation.z = a;
      frontXaGroup.add(notch);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-front-xa',
      2,
      '#38bdf8',
      frontXaGroup,
      new THREE.Vector3(0, 0, 108.5),
      new THREE.Vector3(0, 0, 92),
      new THREE.Vector3(0, 0, 316),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L03: Super-ED Chromatic Aberration Corrector Doublet Group (z = +95.5 mm)
  // =========================================================================
  const edGroup = new THREE.Group();
  {
    // Positive Super-ED biconvex element (emerald fluorite glass)
    const edFrontGeo = createOpticalLensGeometry(29.8, 3.6, 4.6, 2.2, 0.15, 0.0, 24, 56);
    const edFrontMesh = new THREE.Mesh(edFrontGeo, mats.lensEdGlass);
    edFrontMesh.position.z = 2.4;
    edFrontMesh.userData.noEdges = true;
    edGroup.add(edFrontMesh);

    // Cemented negative flint meniscus element
    const flintGeo = createOpticalLensGeometry(29.6, 2.6, -2.1, -3.2, 0.0, 0.2, 24, 56);
    const flintMesh = new THREE.Mesh(flintGeo, mats.evfLensField);
    flintMesh.position.z = -1.6;
    flintMesh.userData.noEdges = true;
    edGroup.add(flintMesh);

    // Ground-glass edge ring
    const edRim = createLensCellRing(29.2, 30.2, 6.2, mats.evfGlassEdgeRim);
    edRim.position.z = 0.6;
    edGroup.add(edRim);

    // Stepped black anodized optical cell with radial thermal relief slots
    const edCell = createLensCellRing(30.0, 34.4, 8.6, mats.matteBlackAnodized);
    edCell.position.z = 0.5;
    edGroup.add(edCell);

    // Brass precision optical spacer ring between cemented pair & rear stop
    const spacer = createLensCellRing(30.4, 33.4, 0.9, mats.brassGear);
    spacer.position.z = -4.2;
    edGroup.add(spacer);
  }
  parts.push(
    finalizeLensPart(
      'lens-ed-group',
      3,
      '#10b981',
      edGroup,
      new THREE.Vector3(0, 0, 95.5),
      new THREE.Vector3(0, 0, 68),
      new THREE.Vector3(0, 0, 294),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L04: 11-Blade Circular Electromagnetic Iris Diaphragm (z = +82.0 mm)
  // =========================================================================
  const irisGroup = new THREE.Group();
  {
    // Main precision anodized iris housing ring
    const irisCase = createLensCellRing(24.8, 33.2, 4.4, mats.shutterChassis);
    irisGroup.add(irisCase);

    // Front cam actuator plate (slotted brass/stainless drive plate)
    const camRing = createLensCellRing(25.2, 31.4, 0.9, mats.stainlessMachined);
    camRing.position.z = 2.4;
    irisGroup.add(camRing);

    // 11 real curved circular aperture blades (animated smoothly F1.2 <-> F11!)
    const bladeCount = 11;
    const pivotR = 27.6;

    // Crescent iris blade shape pivoting at local (0, 0)
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, -1.6);
    bladeShape.quadraticCurveTo(11.5, -2.8, 22.8, 3.2);
    bladeShape.quadraticCurveTo(24.0, 5.4, 21.6, 6.8);
    bladeShape.quadraticCurveTo(10.5, 2.2, 0, 2.2);
    bladeShape.absarc(0, 0, 1.9, Math.PI * 0.5, -Math.PI * 0.5, false);
    bladeShape.closePath();

    const bladeGeo = extrudeCentered(bladeShape, 0.24, 0.02, 0.02, 14);

    for (let i = 0; i < bladeCount; i++) {
      const a = (i / bladeCount) * Math.PI * 2;
      const bladePivot = new THREE.Group();
      bladePivot.position.set(
        Math.cos(a) * pivotR,
        Math.sin(a) * pivotR,
        -0.55 + (i % 3) * 0.22 // tiny Z stagger prevents Z-fighting when blades overlap
      );
      // Base orientation pointing tangentially around the open F1.2 perimeter
      const baseAngle = a + Math.PI * 0.62;
      bladePivot.userData.baseAngle = baseAngle;
      bladePivot.rotation.z = baseAngle;

      const bladeMesh = new THREE.Mesh(bladeGeo, mats.carbonFiberBlade);
      bladeMesh.userData.edgeOpacity = 0.34;
      bladePivot.add(bladeMesh);

      // Brass pivot pin on each blade
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 1.1, 10).rotateX(Math.PI / 2),
        mats.brassGear
      );
      bladePivot.add(pin);

      irisGroup.add(bladePivot);
      irisBlades.push(bladePivot);
    }

    // Electromagnetic stepping motor pod mounted tangentially at lower-left (+X, -Y)
    const stepMotor = new THREE.Mesh(
      new THREE.CylinderGeometry(4.0, 4.0, 7.6, 20).rotateX(Math.PI / 2),
      mats.copperCoil
    );
    stepMotor.position.set(27.8, -17.5, -0.4);
    irisGroup.add(stepMotor);

    const motorBracket = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.0, 9.5, 2.0), 2.4, 0.12, 0.12, 12),
      mats.stainlessMachined
    );
    motorBracket.position.set(26.0, -16.2, -3.2);
    irisGroup.add(motorBracket);

    // Orange FPC ribbon connecting iris stepper to lens main MCU
    const irisFpc = new THREE.Mesh(new THREE.BoxGeometry(5.5, 14.0, 0.4), mats.polyimideFpc);
    irisFpc.position.set(29.8, -8.5, -2.6);
    irisGroup.add(irisFpc);
  }
  parts.push(
    finalizeLensPart(
      'lens-aperture-11',
      4,
      '#475569',
      irisGroup,
      new THREE.Vector3(0, 0, 82.0),
      new THREE.Vector3(0, 0, 44),
      new THREE.Vector3(0, 0, 274),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L05: Floating Focus Moving Group A (Front AF Group, z = +71.0 mm)
  // =========================================================================
  const focusAGroup = new THREE.Group();
  {
    // High-index XA positive focus lens element
    const fAGeo = createOpticalLensGeometry(24.6, 3.2, 4.2, 1.8, 0.45, 0.15, 22, 52);
    const fAMesh = new THREE.Mesh(fAGeo, mats.lensXaGlass);
    fAMesh.userData.noEdges = true;
    focusAGroup.add(fAMesh);

    const fARim = createLensCellRing(24.1, 25.0, 3.4, mats.evfGlassEdgeRim);
    focusAGroup.add(fARim);

    // Lightweight structural focus carrier frame
    const carrier = createLensCellRing(24.9, 28.8, 6.2, mats.matteBlackAnodized);
    focusAGroup.add(carrier);

    // 2 symmetrical slide-bushing ears at 45° & 225° coupling directly onto XD Linear Motor A pair!
    for (const deg of [45, 225]) {
      const a = THREE.MathUtils.degToRad(deg);
      const ear = new THREE.Mesh(
        new THREE.BoxGeometry(6.8, 4.4, 7.6),
        mats.stainlessMachined
      );
      ear.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, 0);
      ear.rotation.z = a;
      focusAGroup.add(ear);

      // Low-friction bronze/PTFE linear slide bushing around guide rod
      const bushing = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.1, 8.6, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      bushing.position.set(Math.cos(a) * 32.8, Math.sin(a) * 32.8, 0);
      focusAGroup.add(bushing);
    }
  }
  const focusGroupAPart = finalizeLensPart(
    'lens-focus-group-a',
    5,
    '#0ea5e9',
    focusAGroup,
    new THREE.Vector3(0, 0, 71.0),
    new THREE.Vector3(0, 0, 22),
    new THREE.Vector3(0, 0, 254),
    cp,
    0.24
  );
  parts.push(focusGroupAPart);

  // =========================================================================
  // L06: 4x XD (Extreme Dynamic) Linear Motors + 4x MR Scale Sensors (z = +64.5 mm)
  // =========================================================================
  const xdMotorsGroup = new THREE.Group();
  {
    const motorAnglesDeg = [45, 135, 225, 315];
    const motorR = 32.8;

    // Front & rear titanium stator end-rings linking all 4 linear motor tracks
    for (const zEnd of [-17.5, 17.5]) {
      const endRing = createLensCellRing(29.8, 36.2, 2.2, mats.magnesiumCast);
      endRing.position.z = zEnd;
      xdMotorsGroup.add(endRing);
    }

    for (let i = 0; i < motorAnglesDeg.length; i++) {
      const deg = motorAnglesDeg[i];
      const a = THREE.MathUtils.degToRad(deg);
      const track = new THREE.Group();
      track.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      track.rotation.z = a;

      // Precision centerless-ground stainless linear guide rod (length 36 mm)
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(1.15, 1.15, 36.0, 16).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      track.add(rod);

      // Dual N52 Neodymium permanent magnet stator bars flanking the guide rod
      for (const sy of [-3.0, 3.0]) {
        const mag = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 31.0), mats.neodymiumMagnet);
        mag.position.set(1.6, sy, 0);
        track.add(mag);
      }

      // Soft-iron flux-return magnetic yoke spine on outer perimeter
      const yoke = new THREE.Mesh(new THREE.BoxGeometry(1.4, 8.8, 32.5), mats.softIronYoke);
      yoke.position.set(3.4, 0, 0);
      track.add(yoke);

      // Sub-micron magnetic encoder scale strip + gold MR sensor read head
      const mrStrip = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.0, 29.0), mats.hdiMainboardPcb);
      mrStrip.position.set(-1.9, 3.6, 0);
      track.add(mrStrip);

      // Wound copper XD Linear Motor mover coil carriage (animated along Z!)
      const mover = new THREE.Group();
      const baseZ = i % 2 === 0 ? 5.5 : -6.5; // 45/225 drives Group A (+), 135/315 drives Group B (-)
      mover.position.z = baseZ;
      mover.userData.baseZ = baseZ;
      mover.userData.groupIndex = i % 2; // 0 = Group A, 1 = Group B

      const coilCore = new THREE.Mesh(new THREE.BoxGeometry(3.8, 6.2, 10.6), mats.copperCoil);
      coilCore.position.set(0.6, 0, 0);
      mover.add(coilCore);

      // Gold MR magnetic sensor pick-up IC riding on the carriage
      const mrHead = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 3.2), mats.goldPlating);
      mrHead.position.set(-1.3, 3.6, 0);
      mover.add(mrHead);

      // Polyimide flexing power tail
      const fpcTail = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.2, 9.0), mats.polyimideFpc);
      fpcTail.position.set(2.5, -2.2, -5.0);
      mover.add(fpcTail);

      track.add(mover);
      moverCarriages.push(mover);
      xdMotorsGroup.add(track);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-xd-motors',
      6,
      '#d97706',
      xdMotorsGroup,
      new THREE.Vector3(0, 0, 64.5),
      new THREE.Vector3(0, 0, 2),
      new THREE.Vector3(0, 0, 240),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L07: Floating Focus Moving Group B (Rear AF Corrector, z = +56.5 mm)
  // =========================================================================
  const focusBGroup = new THREE.Group();
  {
    // Negative-meniscus ED + positive aspheric floating rear focus pair
    const fBGeo = createOpticalLensGeometry(24.0, 3.0, -2.0, 3.8, 0.2, 0.4, 22, 52);
    const fBMesh = new THREE.Mesh(fBGeo, mats.lensEdGlass);
    fBMesh.userData.noEdges = true;
    focusBGroup.add(fBMesh);

    const fBRim = createLensCellRing(23.5, 24.4, 3.2, mats.evfGlassEdgeRim);
    focusBGroup.add(fBRim);

    const carrier = createLensCellRing(24.3, 28.4, 5.8, mats.matteBlackAnodized);
    focusBGroup.add(carrier);

    // 2 symmetrical slide-bushing ears at 135° & 315° coupling directly onto XD Linear Motor B pair!
    for (const deg of [135, 315]) {
      const a = THREE.MathUtils.degToRad(deg);
      const ear = new THREE.Mesh(new THREE.BoxGeometry(6.8, 4.4, 7.2), mats.stainlessMachined);
      ear.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, 0);
      ear.rotation.z = a;
      focusBGroup.add(ear);

      const bushing = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.1, 8.2, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      bushing.position.set(Math.cos(a) * 32.8, Math.sin(a) * 32.8, 0);
      focusBGroup.add(bushing);
    }
  }
  const focusGroupBPart = finalizeLensPart(
    'lens-focus-group-b',
    7,
    '#14b8a6',
    focusBGroup,
    new THREE.Vector3(0, 0, 56.5),
    new THREE.Vector3(0, 0, -20),
    new THREE.Vector3(0, 0, 224),
    cp,
    0.24
  );
  parts.push(focusGroupBPart);

  // =========================================================================
  // L08: Ultra-Large Rear Hero Element (Short Flange Telecentric Optics, z = +42.0 mm)
  // =========================================================================
  const rearHeroGroup = new THREE.Group();
  {
    // Huge φ44mm rear XA hero glass sitting just millimeters ahead of the 55mm lens mount!
    const rearGeo = createOpticalLensGeometry(22.6, 3.6, 2.2, 4.4, 0.3, 0.55, 24, 54);
    const rearMesh = new THREE.Mesh(rearGeo, mats.lensXaGlass);
    rearMesh.userData.noEdges = true;
    rearHeroGroup.add(rearMesh);

    const rearRim = createLensCellRing(22.1, 23.0, 3.8, mats.evfGlassEdgeRim);
    rearHeroGroup.add(rearRim);

    // Precision black velvet baffle & CNC holder sitting inside 55mm throat clearance
    const holder = createLensCellRing(22.9, 26.8, 6.4, mats.mountVelvetBaffle);
    rearHeroGroup.add(holder);

    // Rear rectangular stray-light mask matching 3:2 full-frame aspect ratio
    const rearMask = createLensCellRing(21.4, 24.2, 1.0, mats.matteBlackAnodized);
    rearMask.position.z = -3.8;
    rearHeroGroup.add(rearMask);
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-element',
      8,
      '#6366f1',
      rearHeroGroup,
      new THREE.Vector3(0, 0, 42.0),
      new THREE.Vector3(0, 0, -44),
      new THREE.Vector3(0, 0, 208),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L09: Linear-Response MF Focus Ring & De-Clickable Aperture Ring (z = +80.0 mm)
  // =========================================================================
  const ringsGroup = new THREE.Group();
  let focusRingMesh: THREE.Object3D = ringsGroup;
  {
    // Architectural cutaway ring span: solid around 267° leaving clean upper-grip cutaway (75°..168°)
    // so internal glass/iris/XD motors stay visible in the hero 3/4 camera view even when assembled!
    const cutStart = THREE.MathUtils.degToRad(168);
    const cutEnd = THREE.MathUtils.degToRad(435);

    // 1. Wide ribbed rubber Linear-Response Focus Ring (z local = +7 .. +27)
    const focusRingSub = new THREE.Group();
    const focusRingShape = createCutawayArcRingShape(43.2, 40.4, cutStart, cutEnd);
    const focusRingBase = new THREE.Mesh(
      extrudeCentered(focusRingShape, 20.0, 0.35, 0.35, 56),
      mats.lensRubberGrip
    );
    focusRingBase.position.z = 16.0;
    focusRingSub.add(focusRingBase);

    // Fine tactile knurled grip ribs along the focus ring circumference (InstancedMesh = 1 draw call!)
    const focusRibGeo = new THREE.BoxGeometry(0.8, 0.9, 17.6);
    const focusDegs: number[] = [];
    for (let deg = 172; deg <= 430; deg += 6) focusDegs.push(deg);
    const focusRibInst = new THREE.InstancedMesh(focusRibGeo, mats.matteBlackAnodized, focusDegs.length);
    const dummy = new THREE.Object3D();
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

    // 2. Precision-machined De-Clickable Aperture Ring (z local = -30 .. -18)
    const apRingShape = createCutawayArcRingShape(41.2, 38.4, cutStart, cutEnd);
    const apRing = new THREE.Mesh(
      extrudeCentered(apRingShape, 11.4, 0.25, 0.25, 42),
      mats.lensBarrelAnodized
    );
    apRing.position.z = -24.0;
    ringsGroup.add(apRing);

    // Tactile aperture knurling ridges (InstancedMesh = 1 draw call!)
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

    // Internal non-contact optical rotary encoder ring & magnetic pickup PCB
    const encRing = createLensCellRing(37.2, 39.2, 2.2, mats.goldPlating);
    encRing.position.z = 5.0;
    ringsGroup.add(encRing);
  }
  parts.push(
    finalizeLensPart(
      'lens-control-rings',
      9,
      '#1e293b',
      ringsGroup,
      new THREE.Vector3(0, 0, 80.0),
      new THREE.Vector3(0, 66, 12),
      new THREE.Vector3(0, 72, 266),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L10: Weather-Sealed Anodized Outer Lens Barrel & Rear Mount Flange (z = +74.0 mm)
  // =========================================================================
  const barrelGroup = new THREE.Group();
  {
    const cutStart = THREE.MathUtils.degToRad(168);
    const cutEnd = THREE.MathUtils.degToRad(435);

    // 1. Rear stainless lens-side bayonet flange mating directly against Body 55mm Mount (local z = -40.5 => world z = +33.5!)
    const rearMountFlange = createLensCellRing(26.2, 34.0, 2.8, mats.mountStainlessFlange);
    rearMountFlange.position.z = -40.5;
    barrelGroup.add(rearMountFlange);

    // Rear rubber weather-sealing lip gasket (seals against body stainless flange at z = +32.0!)
    const rearSeal = createLensCellRing(33.4, 35.0, 1.4, mats.epdmGasket);
    rearSeal.position.z = -41.6;
    barrelGroup.add(rearSeal);

    // 12-pin gold lens-side contact arc at bottom of rear bayonet
    const contactBlock = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(27.0, 24.4, -Math.PI * 0.68, -Math.PI * 0.32), 2.0, 0.08, 0.08, 24),
      mats.mountPpsInsulator
    );
    contactBlock.position.z = -39.4;
    barrelGroup.add(contactBlock);

    for (let i = 0; i < 12; i++) {
      const a = -Math.PI * 0.65 + (i / 11) * (Math.PI * 0.30);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.6, 0.5), mats.goldPlating);
      pad.position.set(Math.cos(a) * 25.7, Math.sin(a) * 25.7, -40.5);
      pad.rotation.z = a;
      pad.userData.noEdges = true;
      barrelGroup.add(pad);
    }

    // 2. Rear tapered base shoulder connecting 68mm mount -> 82mm main barrel (full 360° structural collar!)
    const rearCollarGeo = new THREE.CylinderGeometry(40.2, 34.8, 12.0, 48, 1, true);
    rearCollarGeo.rotateX(Math.PI / 2);
    const rearCollar = new THREE.Mesh(rearCollarGeo, mats.lensBarrelAnodized);
    rearCollar.position.z = -33.2;
    barrelGroup.add(rearCollar);

    const rearCollarSolid = createLensCellRing(32.0, 35.2, 4.0, mats.lensBarrelAnodized);
    rearCollarSolid.position.z = -38.0;
    barrelGroup.add(rearCollarSolid);

    // Signature red mount index dot at top of rear collar
    const mountDot = new THREE.Mesh(new THREE.SphereGeometry(1.1, 14, 14), mats.mountRedIndexDot);
    mountDot.position.set(0, 37.6, -35.8);
    mountDot.userData.noEdges = true;
    barrelGroup.add(mountDot);

    // 3. Main structural anodized barrel tube with clean architectural upper-grip cutaway (75°..168°)
    const mainTubeShape = createCutawayArcRingShape(40.2, 37.2, cutStart, cutEnd);
    const mainTube = new THREE.Mesh(
      extrudeCentered(mainTubeShape, 56.0, 0.3, 0.3, 44),
      mats.lensBarrelAnodized
    );
    mainTube.position.z = 1.0;
    barrelGroup.add(mainTube);

    // Front full 360° bayonet collar anchoring front XA element & lens hood
    const frontCollar = createLensCellRing(37.4, 42.8, 12.5, mats.lensBarrelAnodized);
    frontCollar.position.z = 35.5;
    barrelGroup.add(frontCollar);

    // Iconic metallic flagship accent band wrapping the upper barrel
    const accentBand = createLensCellRing(42.2, 43.3, 2.2, mats.lensAccentRing);
    accentBand.position.z = 31.2;
    barrelGroup.add(accentBand);

    // Left-flank (+X photographer's left) tactile AF/MF switch, Focus Hold Button & Click ON/OFF switch
    const switchPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.2, 24.0, 1.5), 22.0, 0.2, 0.2, 12),
      mats.matteBlackAnodized
    );
    switchPlate.position.set(40.2, -4.0, -7.0);
    barrelGroup.add(switchPlate);

    // Circular Focus Hold Button (tactile anodized button on +X flank)
    const holdBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(3.6, 3.8, 2.6, 20).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    holdBtn.position.set(42.4, 1.5, -2.5);
    barrelGroup.add(holdBtn);

    // AF/MF Slide Switch knob
    const afSwitch = new THREE.Mesh(new THREE.BoxGeometry(2.6, 5.2, 7.6), mats.lensRubberGrip);
    afSwitch.position.set(42.2, -9.2, -11.5);
    barrelGroup.add(afSwitch);

    // Aperture Click ON/OFF Switch on lower -X flank
    const clickSwitch = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.4, 6.4), mats.lensAccentRing);
    clickSwitch.position.set(-40.8, -11.0, -18.5);
    barrelGroup.add(clickSwitch);

    // 4 precision rear mount flange screws
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const screw = createPrecisionScrew(1.25, 0.7, 2.4, mats.stainlessMachined);
      screw.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, -41.6);
      screw.rotation.y = Math.PI;
      barrelGroup.add(screw);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-cutaway-barrel',
      10,
      '#475569',
      barrelGroup,
      new THREE.Vector3(0, 0, 74.0),
      new THREE.Vector3(0, -58, -14),
      new THREE.Vector3(0, -64, 232),
      cp,
      0.22
    )
  );

  // =========================================================================
  // Live Kinematic Rig: 11-Blade Circular Iris + Dual Floating XD Linear Focus
  // =========================================================================
  const rig: LensDynamicRig = {
    irisBlades,
    focusGroupAPart,
    focusGroupBPart,
    moverCarriages,
    focusRingMesh,
    applyDynamics: (elapsed, physicsActive, explodeFactor, integrated) => {
      // 1. 11-Blade Iris smooth breathing F1.2 (open) <-> F11 (stopped down)
      const irisWave = physicsActive ? 0.5 - 0.5 * Math.cos(elapsed * 1.15) : 0;
      const bladeSwingRad = irisWave * 0.44; // swings inward smoothly forming crisp 11-blade circle
      for (const pivot of irisBlades) {
        pivot.rotation.z = (pivot.userData.baseAngle as number) + bladeSwingRad;
      }

      // 2. Dual Floating Focus differential translation (XD Linear Motor stroke)
      const focusWave = physicsActive ? Math.sin(elapsed * 1.85) : 0;
      const strokeA = focusWave * 4.2; // Group A moves ±4.2 mm
      const strokeB = -focusWave * 3.1 + Math.sin(elapsed * 3.7) * (physicsActive ? 0.55 : 0); // Differential floating curve!

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

      // Move all 4 copper XD linear motor coil carriages in sync with their coupled focus group!
      for (const mover of moverCarriages) {
        const gIdx = mover.userData.groupIndex as number;
        const baseZ = mover.userData.baseZ as number;
        mover.position.z = baseZ + (gIdx === 0 ? strokeA : strokeB);
      }

      // Subtle tactile focus ring micro-rotation feedback when physics active
      focusRingMesh.rotation.z = physicsActive ? focusWave * 0.18 : 0;
    },
  };

  return { parts, rig };
}
