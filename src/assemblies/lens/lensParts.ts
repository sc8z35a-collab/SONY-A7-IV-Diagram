//@FLOW_MAP|file=src/assemblies/lens/lensParts.ts|unit=lens|lines=3631|exports=LensDynamicRig,buildLensParts,buildLensStandaloneParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createHelicalSpringGeometry,
  createOpticalLensGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  createSpannerRingGroup,
  createSpurGearGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';
import { LensOpticalSim } from './lensOpticalSim';
import { getLensSectionForPart } from './lensSectionMap';

export interface LensDynamicRig {
  irisBlades: THREE.Group[];
  irisCamRing: THREE.Object3D;
  irisPinionGear: THREE.Object3D;
  irisSpurGear: THREE.Object3D;
  focusGroupAParts: CadPart[];
  focusGroupBParts: CadPart[];
  moverCarriages: THREE.Group[];
  mrScaleCarriages: THREE.Group[];
  focusRingMesh: THREE.Object3D;
  apertureRingMesh: THREE.Object3D;
  mfEncoderWheel: THREE.Object3D;
  apertureHallRotor: THREE.Object3D;
  applyDynamics: (
    sim: LensOpticalSim,
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
    explanation: lazyExplanationStub(id),
  };
}

/**
 * Build ALL 70 watchmaker-grade ultra-dissectible CAD sub-assemblies of a 2024-2026 Flagship
 * 50mm F1.2 Prime Lens (14-Element / 10-Group Optical Stack + 3x XA + Super-ED Doublet +
 * 6-Layer 11-Blade Iris + Quad XD Linear AF + Permalloy Shields + Anti-Rotation Sub-Shafts +
 * 200um SmFeN Invar Magnetic Scales + Threaded Spanner Rings + Air-Gap Spacers + Dual Eccentrics +
 * Split Mg Skeleton + Standalone Focus & Aperture Rings + PTFE Bearing Damping Bands +
 * Mechanical IRIS LOCK Switch + Steel Load-Reinforcing Gussets + 12-Pin Gold Contact Block +
 * Decoupled Stainless Bayonet & EPDM Skirt Seal/M2.5 Bolts):
 *  L01..L07 : Front Hood, Elastomer Bumper/Latch, Filter Bezel, Foam Gasket, Stepped Shims, Front Eccentric, Front Cell
 *  L08..L13 : Elements E01–E05 (1st XA, LaK Meniscus, Super-ED, Flint Cemented, G4 Petzval) + Inter-Group Baffle
 *  L14..L19 : 6-Layer 11-Blade Circular Iris (Cover, Cam Ring, 11 Blades, Base Plate, Stepper Motor, Home Photo-Interrupter)
 *  L20..L33 : Focus Group A (E06–E08, CoG Eccentric Carrier) + Quad XD Stators/Flux Shields/Coils/Dampers +
 *             4x Ti Main Shafts + 4x Anti-Rotation Sub-Shafts + 4x MR Encoders + Dual AF Origin Sensors + Split Mg Inner Core (Front & Rear)
 *  L34..L42 : Focus Group B (E09–E10, Rear 3-Point Eccentrics) + Rear Telecentric Stack (E11–E14) + Rear Cell SA Spacer + 3:2 Baffle
 *  L43..L51 : Standalone MF Focus Ring + 3x POM Tensioners/Seal Tape + 2,048 PPR MF Encoder + Standalone Aperture Ring +
 *             Ball-Bearing Race + Hall Sensor + Click/De-Click Detent + Side Switch PCB + Top Vertical Focus-Hold Pod
 *  L52..L62 : NTC Thermistor + Ring AF MCU PCB + EMI Shield Can & ESD Tape + Multi-Branch FPC + 6-Stage EPDM Seals +
 *             Front Outer Barrel + Main Cutaway Barrel + Under-Mount Shim Plate + Micron Shims + 12-Pin Gold Contact Block + Rear Stainless Bayonet
 *  L63..L70 : Spanner Retaining Rings + Air-Gap Optical Spacers + U-Loop Iris/Hall FPC + 200um SmFeN Invar Scales +
 *             PTFE/Ball Focus Bearing Bands + Mechanical IRIS LOCK Switch + Rear Steel Reinforcing Plates + Rear Mount EPDM Seal & M2.5 Bolts
 */
export function buildLensParts(
  mats: MaterialLibrary,
  _includeStandalone = true
): { parts: CadPart[]; rig: LensDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const irisBlades: THREE.Group[] = [];
  const moverCarriages: THREE.Group[] = [];
  const mrScaleCarriages: THREE.Group[] = [];
  const dummy = new THREE.Object3D();
  const motorAnglesDeg = [45, 135, 225, 315];
  const subRodAnglesDeg = [62, 152, 242, 332];
  const motorR = 32.8;
  const cutStart = THREE.MathUtils.degToRad(168);
  const cutEnd = THREE.MathUtils.degToRad(435);

  // =========================================================================
  // L01: Large-Diameter Bayonet Lock Cylindrical Lens Hood Shell (z = +127.0 mm)
  // =========================================================================
  const hoodGroup = new THREE.Group();
  {
    const hoodShellGeo = new THREE.CylinderGeometry(44.2, 43.2, 21.0, 44, 1, true);
    hoodShellGeo.rotateX(Math.PI / 2);
    hoodGroup.add(new THREE.Mesh(hoodShellGeo, mats.lensBarrelAnodized));

    const rearBayonet = createLensCellRing(39.4, 43.4, 3.2, mats.matteBlackAnodized, 40);
    rearBayonet.position.z = -9.8;
    hoodGroup.add(rearBayonet);

    // 4 concentric velvet-flocked stray-light trapping baffle ribs
    for (let i = 0; i < 4; i++) {
      const baffle = createLensCellRing(40.5 + i * 0.15, 42.9, 1.0, mats.mountVelvetBaffle, 36);
      baffle.position.z = -6.2 + i * 4.2;
      baffle.userData.noEdges = true;
      hoodGroup.add(baffle);
    }

    const hoodDot = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 10), mats.mountRedIndexDot);
    hoodDot.position.set(0, 43.6, -9.6);
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
      new THREE.Vector3(0, 0, 318),
      new THREE.Vector3(0, 0, 560),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L02: [NEW!] Hood Elastomer Shock Bumper Rim & Spring Lock Release Latch (z = +130.0 mm)
  // =========================================================================
  const hoodLockGroup = new THREE.Group();
  {
    // Front shock-absorbing rubberized elastomer bumper rim (real SEL50F12GM hood feature!)
    const frontRim = createLensCellRing(40.8, 44.8, 3.4, mats.lensRubberGrip, 42);
    frontRim.position.z = 7.8;
    hoodLockGroup.add(frontRim);

    // Soft tactile micro-lip facing +Z
    const frontLip = new THREE.Mesh(new THREE.TorusGeometry(42.8, 1.05, 10, 42), mats.epdmGasket);
    frontLip.position.z = 9.4;
    frontLip.userData.noEdges = true;
    hoodLockGroup.add(frontLip);

    // Spring-loaded bayonet release latch assembly on -X side of hood rear collar
    const latchHousing = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.0, 9.6, 1.2), 7.8, 0.14, 0.14, 10),
      mats.matteBlackAnodized
    );
    latchHousing.position.set(-43.4, 0, -9.2);
    hoodLockGroup.add(latchHousing);

    const lockBtn = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(3.2, 6.8, 1.0), 5.2, 0.16, 0.16, 10),
      mats.stainlessMachined
    );
    lockBtn.position.set(-44.6, 0, -9.2);
    hoodLockGroup.add(lockBtn);

    // Internal stainless return coil spring + locking pawl lug
    const latchSpring = new THREE.Mesh(
      createHelicalSpringGeometry(0.9, 3.8, 4, 0.22).rotateY(Math.PI / 2),
      mats.brassGear
    );
    latchSpring.position.set(-42.0, 0, -9.2);
    latchSpring.userData.noEdges = true;
    hoodLockGroup.add(latchSpring);

    const pawlTab = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.4, 2.2), mats.mountSpringSteel);
    pawlTab.position.set(-40.2, 0, -12.2);
    hoodLockGroup.add(pawlTab);
  }
  parts.push(
    finalizeLensPart(
      'lens-hood-lock-bumper',
      2,
      '#64748b',
      hoodLockGroup,
      new THREE.Vector3(0, 0, 130.0),
      new THREE.Vector3(-42, 0, 294),
      new THREE.Vector3(-46, 0, 540),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L03: φ72mm 1/8-Turn Bayonet Filter Thread Bezel & Spanner Ring (z = +116.5 mm)
  // =========================================================================
  const filterRingGroup = new THREE.Group();
  {
    const threadBezel = createLensCellRing(36.0, 41.2, 4.8, mats.matteBlackAnodized, 40);
    filterRingGroup.add(threadBezel);

    // Precision M72x0.75 fine-pitch filter threads
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

    // 4 spanner-wrench retaining notches + 3 1/8-turn bayonet service locking tabs (Lensrentals teardown!)
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const notch = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.0, 0.7), mats.stainlessMachined);
      notch.position.set(Math.cos(a) * 34.6, Math.sin(a) * 34.6, -0.3);
      notch.rotation.z = a;
      filterRingGroup.add(notch);
    }
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(i * 120);
      const tab = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(41.4, 39.4, a - 0.14, a + 0.14), 1.4, 0.06, 0.06, 8),
        mats.stainlessMachined
      );
      tab.position.z = -2.8;
      filterRingGroup.add(tab);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-filter-ring',
      3,
      '#d97706',
      filterRingGroup,
      new THREE.Vector3(0, 0, 116.5),
      new THREE.Vector3(0, 0, 274),
      new THREE.Vector3(0, 0, 524),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L04: [NEW!] Thick Front Filter-Ring Weather-Sealing Foam Gasket (z = +114.6 mm)
  // =========================================================================
  const frontGasketGroup = new THREE.Group();
  {
    // Closed-cell weather foam ring directly beneath the 1/8-turn filter ring (Lensrentals GM teardown!)
    const foamRing = createLensCellRing(36.8, 40.6, 1.8, mats.lensFoamSeal, 40);
    frontGasketGroup.add(foamRing);

    // Secondary thin blue fluorosilicone compression lip seated on inner perimeter
    const lipSeal = new THREE.Mesh(new THREE.TorusGeometry(36.6, 0.52, 10, 40), mats.mountThreadLockBlue);
    lipSeal.position.z = 0.55;
    lipSeal.userData.noEdges = true;
    frontGasketGroup.add(lipSeal);

    // 3 alignment cutout notches for front filter retaining screws
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(i * 120);
      const eyelet = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 1.1, 1.9, 10).rotateX(Math.PI / 2),
        mats.brassGear
      );
      eyelet.position.set(Math.cos(a) * 38.7, Math.sin(a) * 38.7, 0);
      frontGasketGroup.add(eyelet);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-front-gasket',
      4,
      '#0369a1',
      frontGasketGroup,
      new THREE.Vector3(0, 0, 114.6),
      new THREE.Vector3(0, 0, 250),
      new THREE.Vector3(0, 0, 506),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L05: [NEW!] Front-Group 3-Point Stepped Tilt & Spacing Shims (0.27–0.48mm) (z = +113.4 mm)
  // =========================================================================
  const frontShimsGroup = new THREE.Group();
  {
    // 3 individual stepped tilt-calibration shim stacks at 120° (exact Lensrentals 135mm GM teardown detail!)
    const shimSpecs = [
      { deg: 0, layers: 3, mat: mats.brassGear },     // 0.48 mm stack
      { deg: 120, layers: 2, mat: mats.stainlessMachined }, // 0.36 mm stack
      { deg: 240, layers: 1, mat: mats.mountShimBlue }, // 0.27 mm stack
    ];
    for (const s of shimSpecs) {
      const a0 = THREE.MathUtils.degToRad(s.deg - 18);
      const a1 = THREE.MathUtils.degToRad(s.deg + 18);
      for (let l = 0; l < s.layers; l++) {
        const arc = new THREE.Mesh(
          extrudeCentered(createCutawayArcRingShape(39.4, 35.8, a0, a1), 0.34, 0.03, 0.03, 14),
          l === 0 ? s.mat : mats.brassGear
        );
        arc.position.z = (l - (s.layers - 1) * 0.5) * 0.42;
        frontShimsGroup.add(arc);
      }
      // Precision front-group mounting screw passing through each shim stack
      const rad = THREE.MathUtils.degToRad(s.deg);
      const scr = createPrecisionScrew(1.25, 0.65, 2.8, mats.stainlessMachined);
      scr.position.set(Math.cos(rad) * 37.6, Math.sin(rad) * 37.6, 0.9);
      frontShimsGroup.add(scr);
    }

    // Thin carrier witness ring with factory triangle reassembly alignment marker!
    const witnessRing = createLensCellRing(35.8, 36.8, 0.4, mats.stainlessMachined, 36);
    witnessRing.position.z = -0.8;
    frontShimsGroup.add(witnessRing);

    const triMarker = new THREE.Mesh(
      new THREE.ConeGeometry(1.1, 2.0, 3),
      mats.mountRedIndexDot
    );
    triMarker.position.set(0, 38.6, 0.5);
    frontShimsGroup.add(triMarker);
  }
  parts.push(
    finalizeLensPart(
      'lens-front-tilt-shims',
      5,
      '#ca8a04',
      frontShimsGroup,
      new THREE.Vector3(0, 0, 113.4),
      new THREE.Vector3(0, 0, 228),
      new THREE.Vector3(0, 0, 492),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L06: Front-Group 3-Point Eccentric Tilt & Centering Collar (z = +112.0 mm)
  // =========================================================================
  const eccentricGroup = new THREE.Group();
  {
    const collarRing = createLensCellRing(37.9, 40.2, 3.4, mats.shutterChassis, 40);
    eccentricGroup.add(collarRing);

    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(30 + i * 120);
      const pod = new THREE.Group();
      pod.position.set(Math.cos(a) * 38.9, Math.sin(a) * 38.9, 0);
      pod.rotation.z = a;

      const camWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.8, 2.8, 2.4, 18).rotateZ(Math.PI / 2),
        mats.pomGear
      );
      pod.add(camWheel);

      const camScrew = createPrecisionScrew(1.35, 0.75, 2.2, mats.stainlessMachined);
      camScrew.position.set(1.2, 0.45, 0);
      camScrew.rotation.y = Math.PI / 2;
      pod.add(camScrew);

      const uvLock = new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 8), mats.mountThreadLockBlue);
      uvLock.position.set(1.6, -1.6, 0.8);
      uvLock.userData.noEdges = true;
      pod.add(uvLock);

      eccentricGroup.add(pod);
    }

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
      6,
      '#0284c7',
      eccentricGroup,
      new THREE.Vector3(0, 0, 112.0),
      new THREE.Vector3(-56, 0, 210),
      new THREE.Vector3(-60, 0, 480),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L07: [NEW!] Front Optical Group (E01–E05) CNC Aluminum Cell Housing (z = +98.0 mm)
  // =========================================================================
  const frontCellGroup = new THREE.Group();
  {
    // Stepped cutaway CNC aluminum optical cell sleeve holding E01–E05 coaxially
    const outerSleeve = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(36.8, 34.4, cutStart, cutEnd), 23.0, 0.16, 0.16, 38),
      mats.matteBlackAnodized
    );
    frontCellGroup.add(outerSleeve);

    // Front stepped seat collar for E01 & rear stepped flange for E05
    const frontFlange = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(38.0, 34.6, cutStart, cutEnd), 2.2, 0.1, 0.1, 36),
      mats.shutterChassis
    );
    frontFlange.position.z = 10.6;
    frontCellGroup.add(frontFlange);

    const rearStep = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(35.4, 32.8, cutStart, cutEnd), 2.4, 0.1, 0.1, 36),
      mats.shutterChassis
    );
    rearStep.position.z = -10.8;
    frontCellGroup.add(rearStep);

    // 6 elastomeric stress-relief optical potting glue pockets around perimeter (prevents thermal glass strain!)
    for (let i = 0; i < 6; i++) {
      const a = THREE.MathUtils.degToRad(190 + i * 42);
      const pocket = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.0, 18.0), mats.thermalPadBlue);
      pocket.position.set(Math.cos(a) * 35.6, Math.sin(a) * 35.6, 0);
      pocket.rotation.z = a;
      pocket.userData.noEdges = true;
      frontCellGroup.add(pocket);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-front-cell-mount',
      7,
      '#475569',
      frontCellGroup,
      new THREE.Vector3(0, 0, 98.0),
      new THREE.Vector3(64, 58, 178),
      new THREE.Vector3(68, 62, 460),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L08: Element 01 (G1) Large-Diameter 0.01um 1st XA Front Element (z = +108.5 mm)
  // =========================================================================
  const frontXaGroup = new THREE.Group();
  {
    const xaFrontGeo = createOpticalLensGeometry(33.2, 3.8, 5.4, -2.1, 0.5, 0.18, 18, 40);
    const xaFrontMesh = new THREE.Mesh(xaFrontGeo, mats.lensXaGlass);
    xaFrontMesh.userData.noEdges = true;
    frontXaGroup.add(xaFrontMesh);

    frontXaGroup.add(createLensCellRing(32.5, 33.5, 3.9, mats.evfGlassEdgeRim, 38));
    frontXaGroup.add(createLensCellRing(33.4, 37.5, 5.4, mats.matteBlackAnodized, 38));
  }
  parts.push(
    finalizeLensPart(
      'lens-front-xa',
      8,
      '#38bdf8',
      frontXaGroup,
      new THREE.Vector3(0, 0, 108.5),
      new THREE.Vector3(0, 0, 204),
      new THREE.Vector3(0, 0, 474),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L09: Element 02 (G2) High-Index Lanthanum Positive Meniscus & Brass Spacer (z = +102.0 mm)
  // =========================================================================
  const meniscusGroup = new THREE.Group();
  {
    const menGeo = createOpticalLensGeometry(31.2, 3.2, 4.0, -1.4, 0.08, 0.0, 16, 38);
    const menMesh = new THREE.Mesh(menGeo, mats.evfLensAspheric);
    menMesh.userData.noEdges = true;
    meniscusGroup.add(menMesh);

    meniscusGroup.add(createLensCellRing(30.6, 31.5, 3.3, mats.evfGlassEdgeRim, 36));

    const brassSpacer = createLensCellRing(31.0, 34.6, 1.2, mats.brassGear, 36);
    brassSpacer.position.z = 2.2;
    meniscusGroup.add(brassSpacer);

    const cell = createLensCellRing(31.4, 35.4, 4.2, mats.matteBlackAnodized, 36);
    cell.position.z = -0.3;
    meniscusGroup.add(cell);
  }
  parts.push(
    finalizeLensPart(
      'lens-front-meniscus',
      9,
      '#60a5fa',
      meniscusGroup,
      new THREE.Vector3(0, 0, 102.0),
      new THREE.Vector3(0, 0, 180),
      new THREE.Vector3(0, 0, 458),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L10: Element 03 (G3a) Super-ED Positive Front Element (Doublet Front, z = +96.2 mm)
  // =========================================================================
  const edGroup = new THREE.Group();
  {
    const edFrontGeo = createOpticalLensGeometry(29.8, 3.0, 3.6, 1.5, 0.12, 0.0, 16, 38);
    const edFrontMesh = new THREE.Mesh(edFrontGeo, mats.lensEdGlass);
    edFrontMesh.userData.noEdges = true;
    edGroup.add(edFrontMesh);

    edGroup.add(createLensCellRing(29.2, 30.1, 3.2, mats.evfGlassEdgeRim, 36));
    edGroup.add(createLensCellRing(30.0, 34.0, 3.6, mats.matteBlackAnodized, 36));
  }
  parts.push(
    finalizeLensPart(
      'lens-ed-group',
      10,
      '#10b981',
      edGroup,
      new THREE.Vector3(0, 0, 96.2),
      new THREE.Vector3(0, 0, 156),
      new THREE.Vector3(0, 0, 444),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L11: Element 04 (G3b) High-Dispersion Flint Cemented Mate & UV Seam (z = +92.4 mm)
  // =========================================================================
  const flintGroup = new THREE.Group();
  {
    const flintGeo = createOpticalLensGeometry(29.5, 2.5, -1.4, -0.5, 0.0, 0.12, 16, 38);
    const flintMesh = new THREE.Mesh(flintGeo, mats.evfLensField);
    flintMesh.userData.noEdges = true;
    flintGroup.add(flintMesh);

    const cementFilm = createLensCellRing(27.8, 29.5, 0.45, mats.lensAccentRing, 36);
    cementFilm.position.z = 1.45;
    cementFilm.userData.noEdges = true;
    flintGroup.add(cementFilm);

    flintGroup.add(createLensCellRing(29.0, 29.9, 2.7, mats.evfGlassEdgeRim, 36));
    flintGroup.add(createLensCellRing(29.8, 33.8, 3.2, mats.matteBlackAnodized, 36));

    const rearSpacer = createLensCellRing(29.8, 32.8, 0.85, mats.brassGear, 36);
    rearSpacer.position.z = -1.9;
    flintGroup.add(rearSpacer);
  }
  parts.push(
    finalizeLensPart(
      'lens-flint-cemented',
      11,
      '#059669',
      flintGroup,
      new THREE.Vector3(0, 0, 92.4),
      new THREE.Vector3(0, 0, 134),
      new THREE.Vector3(0, 0, 432),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L12: Element 05 (G4) Pre-Iris Biconcave Petzval Flattener (z = +88.0 mm)
  // =========================================================================
  const g4NegGroup = new THREE.Group();
  {
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
      12,
      '#0d9488',
      g4NegGroup,
      new THREE.Vector3(0, 0, 88.0),
      new THREE.Vector3(0, 0, 114),
      new THREE.Vector3(0, 0, 420),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L13: [NEW!] Inter-Group Knife-Edge Stray-Light Shield & Baffle (z = +86.0 mm)
  // =========================================================================
  const interBaffleGroup = new THREE.Group();
  {
    // Thin blackened stainless light-trap diaphragm sitting between G4 and Iris (Lensrentals GM teardown!)
    const maskRing = createLensCellRing(24.0, 32.4, 0.65, mats.mountVelvetBaffle, 40);
    interBaffleGroup.add(maskRing);

    // Tapered knife-edge bevel facing incoming rays
    const knifeRim = createLensCellRing(23.4, 24.4, 0.35, mats.matteBlackAnodized, 40);
    knifeRim.position.z = 0.25;
    interBaffleGroup.add(knifeRim);

    // 3 snap-retention locating tabs
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(60 + i * 120);
      const tab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.2, 0.8), mats.stainlessMachined);
      tab.position.set(Math.cos(a) * 33.2, Math.sin(a) * 33.2, 0);
      tab.rotation.z = a;
      interBaffleGroup.add(tab);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-intergroup-baffle',
      13,
      '#1e293b',
      interBaffleGroup,
      new THREE.Vector3(0, 0, 86.0),
      new THREE.Vector3(0, 0, 96),
      new THREE.Vector3(0, 0, 408),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L14: [NEW!] Iris Module Front Dust Cover & Blade Anti-Lift Flatness Plate (z = +85.0 mm)
  // =========================================================================
  const irisCoverGroup = new THREE.Group();
  {
    const frontHousing = createLensCellRing(24.5, 33.2, 1.3, mats.shutterChassis, 38);
    irisCoverGroup.add(frontHousing);

    // Precision PTFE low-friction glide liner keeping 11 blades flat without rubbing cam ring
    const ptfeLiner = createLensCellRing(24.8, 30.8, 0.3, mats.pomGear, 38);
    ptfeLiner.position.z = -0.75;
    ptfeLiner.userData.noEdges = true;
    irisCoverGroup.add(ptfeLiner);

    // 3 micro-retaining screws securing iris module sandwich
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(15 + i * 120);
      const scr = createPrecisionScrew(0.95, 0.5, 1.8, mats.stainlessMachined);
      scr.position.set(Math.cos(a) * 32.0, Math.sin(a) * 32.0, 0.65);
      irisCoverGroup.add(scr);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-cover',
      14,
      '#94a3b8',
      irisCoverGroup,
      new THREE.Vector3(0, 0, 85.0),
      new THREE.Vector3(0, 0, 78),
      new THREE.Vector3(0, 0, 396),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L15: 11-Blade Iris Slotted Cam Actuating Ring & Brass Sector Gear (z = +83.6 mm)
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

    // Home-position optical flag tab protruding radially for L19 photo-interrupter!
    const homeFlag = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.4, 1.2), mats.stainlessMachined);
    homeFlag.position.set(34.2, -1.2, 0);
    irisCamRotor.add(homeFlag);

    irisCamGroup.add(irisCamRotor);
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-cam-ring',
      15,
      '#cbd5e1',
      irisCamGroup,
      new THREE.Vector3(0, 0, 83.6),
      new THREE.Vector3(0, 0, 60),
      new THREE.Vector3(0, 0, 384),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L16: 11-Blade Circular Carbon Iris Diaphragm Blades (z = +82.0 mm)
  // =========================================================================
  const irisGroup = new THREE.Group();
  {
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
      16,
      '#475569',
      irisGroup,
      new THREE.Vector3(0, 0, 82.0),
      new THREE.Vector3(0, 0, 42),
      new THREE.Vector3(0, 0, 372),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L17: Stationary Iris Pivot-Pin Base Plate & Light-Trap Shield (z = +79.6 mm)
  // =========================================================================
  const irisBaseGroup = new THREE.Group();
  {
    const basePlate = createLensCellRing(24.2, 33.4, 2.0, mats.shutterChassis, 38);
    irisBaseGroup.add(basePlate);

    const innerShield = createLensCellRing(22.8, 24.4, 1.1, mats.mountVelvetBaffle, 36);
    innerShield.position.z = -0.6;
    irisBaseGroup.add(innerShield);

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
      17,
      '#64748b',
      irisBaseGroup,
      new THREE.Vector3(0, 0, 79.6),
      new THREE.Vector3(0, 0, 24),
      new THREE.Vector3(0, 0, 360),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L18: Silent 1/64 Micro-Stepping Iris Actuator Motor & POM Gear Train (z = +80.5 mm)
  // =========================================================================
  const irisStepperGroup = new THREE.Group();
  let irisPinionGear: THREE.Object3D = irisStepperGroup;
  let irisSpurGear: THREE.Object3D = irisStepperGroup;
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
    irisPinionGear = pinion;

    const spurGear = new THREE.Mesh(
      createSpurGearGeometry(18, 3.5, 1.7, 0.9),
      mats.pomGear
    );
    spurGear.position.set(-4.1, 3.3, 4.9);
    irisStepperGroup.add(spurGear);
    irisSpurGear = spurGear;

    const fpc = new THREE.Mesh(new THREE.BoxGeometry(4.4, 13.5, 0.4), mats.polyimideFpc);
    fpc.position.set(2.1, 5.8, -3.4);
    irisStepperGroup.add(fpc);
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-stepper',
      18,
      '#b45309',
      irisStepperGroup,
      new THREE.Vector3(28.5, -18.0, 80.5),
      new THREE.Vector3(56, -34, 42),
      new THREE.Vector3(60, -36, 372),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L19: [NEW!] Iris F1.2 Wide-Open Origin Photo-Interrupter & Stopper (asm 34.8, -1.2, 83.6)
  // =========================================================================
  const irisHomeGroup = new THREE.Group();
  {
    // U-shaped 940nm infrared photo-interrupter housing straddling L15 cam home flag
    const carrierPcb = new THREE.Mesh(new THREE.BoxGeometry(1.4, 7.6, 5.6), mats.hdiMainboardPcb);
    carrierPcb.position.set(1.6, 0, 0);
    irisHomeGroup.add(carrierPcb);

    for (const sy of [-1.8, 1.8]) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.3, 3.4), mats.icEpoxy);
      arm.position.set(-0.4, sy, 0);
      irisHomeGroup.add(arm);
    }
    const irLed = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 8), mats.irLedLens);
    irLed.position.set(-0.4, 1.1, 0);
    irLed.userData.noEdges = true;
    irisHomeGroup.add(irLed);

    // Silicone cushioned mechanical end-stop bumper preventing F1.2 over-travel bounce
    const stopPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.75, 2.8, 10).rotateX(Math.PI / 2),
      mats.damperElastomer
    );
    stopPin.position.set(-1.5, -3.2, 0);
    irisHomeGroup.add(stopPin);

    const flexTail = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.4, 12.0), mats.polyimideFpc);
    flexTail.position.set(2.3, 0, -6.5);
    irisHomeGroup.add(flexTail);
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-home-sensor',
      19,
      '#ec4899',
      irisHomeGroup,
      new THREE.Vector3(34.8, -1.2, 83.6),
      new THREE.Vector3(92, -16, 60),
      new THREE.Vector3(96, -18, 384),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L20: Element 06 (G5a) Floating Focus Group A Front Biconvex (z = +75.2 mm)
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
    20,
    '#38bdf8',
    focusAFrontGroup,
    new THREE.Vector3(0, 0, 75.2),
    new THREE.Vector3(0, 0, 4),
    new THREE.Vector3(0, 0, 346),
    cp,
    0.24
  );
  parts.push(focusAFrontPart);

  // =========================================================================
  // L21: Element 07 (G5b) Floating Focus Group A Main Carrier & 2nd XA (z = +72.0 mm)
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
    21,
    '#0ea5e9',
    focusAGroup,
    new THREE.Vector3(0, 0, 72.0),
    new THREE.Vector3(0, 0, -14),
    new THREE.Vector3(0, 0, 334),
    cp,
    0.24
  );
  parts.push(focusGroupAPart);

  // =========================================================================
  // L22: Element 08 (G5c) Floating Focus Group A Rear Negative Corrector (z = +68.8 mm)
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
    22,
    '#0284c7',
    focusARearGroup,
    new THREE.Vector3(0, 0, 68.8),
    new THREE.Vector3(0, 0, -32),
    new THREE.Vector3(0, 0, 322),
    cp,
    0.24
  );
  parts.push(focusARearPart);

  // =========================================================================
  // L23: [NEW!] Focus Group A CoG-Aligned Thrust Carrier & Tilt Eccentrics (z = +72.0 mm)
  // =========================================================================
  const focusAEccGroup = new THREE.Group();
  {
    // Lightweight magnesium-composite carrier collar aligning Focus A center-of-gravity with XD thrust line!
    const carrierSleeve = createLensCellRing(28.8, 30.6, 9.6, mats.magnesiumCast, 38);
    focusAEccGroup.add(carrierSleeve);

    // 3 precision eccentric tilt calibration cams around Focus Group A perimeter
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(105 + i * 120);
      const cam = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.1, 2.0, 14).rotateZ(Math.PI / 2),
        mats.pomGear
      );
      cam.position.set(Math.cos(a) * 30.2, Math.sin(a) * 30.2, 0);
      cam.rotation.z = a;
      focusAEccGroup.add(cam);

      const lockDot = new THREE.Mesh(new THREE.SphereGeometry(0.62, 8, 8), mats.mountThreadLockBlue);
      lockDot.position.set(Math.cos(a) * 31.3, Math.sin(a) * 31.3, 0.6);
      lockDot.userData.noEdges = true;
      focusAEccGroup.add(lockDot);
    }

    // 2 brass counter-mass balance pads keeping pitching moment zero during 120fps AF accelerations
    for (const deg of [135, 315]) {
      const a = THREE.MathUtils.degToRad(deg);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.2, 5.2), mats.brassGear);
      pad.position.set(Math.cos(a) * 30.4, Math.sin(a) * 30.4, 0);
      pad.rotation.z = a;
      focusAEccGroup.add(pad);
    }
  }
  const focusAEccPart = finalizeLensPart(
    'lens-focus-a-eccentric',
    23,
    '#0369a1',
    focusAEccGroup,
    new THREE.Vector3(0, 0, 72.0),
    new THREE.Vector3(-62, 24, -14),
    new THREE.Vector3(-66, 26, 334),
    cp,
    0.24
  );
  parts.push(focusAEccPart);

  // =========================================================================
  // L24: Quad XD Linear Motor Stators: 8x N52 Magnets & Soft-Iron Yokes (z = +65.0 mm)
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
      24,
      '#64748b',
      xdStatorsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(-66, 0, -54),
      new THREE.Vector3(-70, 0, 310),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L25: [NEW!] XD Permalloy Magnetic Flux Shields & Thermal Bridges (z = +65.0 mm)
  // =========================================================================
  const xdFluxShieldsGroup = new THREE.Group();
  {
    // 4 outer Mu-metal / Permalloy flux-containment covers wrapping outside each XD stator yoke
    for (const deg of motorAnglesDeg) {
      const a = THREE.MathUtils.degToRad(deg);
      const unit = new THREE.Group();
      unit.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      unit.rotation.z = a;

      const shieldBack = new THREE.Mesh(new THREE.BoxGeometry(0.9, 10.2, 33.8), mats.lensPermalloyShield);
      shieldBack.position.set(4.5, 0, 0);
      unit.add(shieldBack);

      for (const sy of [-5.0, 5.0]) {
        const wing = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.75, 33.4), mats.lensPermalloyShield);
        wing.position.set(3.1, sy, 0);
        unit.add(wing);
      }

      // Copper thermal-transfer bridge strip wicking coil heat out into L32/L33 magnesium barrel
      const cuStrip = new THREE.Mesh(new THREE.BoxGeometry(0.45, 5.4, 24.0), mats.copperHeatSpreader);
      cuStrip.position.set(5.15, 0, 0);
      unit.add(cuStrip);

      xdFluxShieldsGroup.add(unit);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-xd-flux-shields',
      25,
      '#475569',
      xdFluxShieldsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(-108, 0, -54),
      new THREE.Vector3(-114, 0, 310),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L26: Quad XD Linear Motor Movers: 4x OFC Flat-Wire Copper Coils (z = +65.0 mm)
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
      26,
      '#d97706',
      xdMotorsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(0, 0, -54),
      new THREE.Vector3(0, 0, 310),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L27: XD Linear Rail Preload Springs, POM Sliders & Silicone End-Dampers (z = +65.0 mm)
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

      for (const zStop of [-15.4, 15.4]) {
        const damper = new THREE.Mesh(damperGeo, mats.damperElastomer);
        damper.position.z = zStop;
        damper.userData.noEdges = true;
        railUnit.add(damper);
      }

      const preloadSpring = new THREE.Mesh(springGeo, mats.brassGear);
      preloadSpring.position.z = i % 2 === 0 ? 11.4 : -11.4;
      preloadSpring.userData.noEdges = true;
      railUnit.add(preloadSpring);

      const pomShoe = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.8, 4.4), mats.pomGear);
      pomShoe.position.set(-2.2, -2.6, i % 2 === 0 ? 5.5 : -6.5);
      railUnit.add(pomShoe);

      xdDampersGroup.add(railUnit);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-xd-dampers',
      27,
      '#ec4899',
      xdDampersGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(-66, 56, -68),
      new THREE.Vector3(-70, 58, 300),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L28: 4x Centerless-Ground Titanium Main Guide Shafts & End-Ring Cage (z = +65.0 mm)
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
      28,
      '#94a3b8',
      guideShaftsGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(0, 0, -76),
      new THREE.Vector3(0, 0, 294),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L29: [NEW!] 4x Anti-Rotation Sub-Guide Shafts & Forked POM Anti-Pitch Shoes (z = +65.0 mm)
  // =========================================================================
  const antiRotGroup = new THREE.Group();
  {
    // Real Sony linear AF kinematic constraint: secondary parallel sub-rods + forked POM anti-rotation sliders!
    const subR = 31.2;
    for (let i = 0; i < subRodAnglesDeg.length; i++) {
      const a = THREE.MathUtils.degToRad(subRodAnglesDeg[i]);
      const subUnit = new THREE.Group();
      subUnit.position.set(Math.cos(a) * subR, Math.sin(a) * subR, 0);
      subUnit.rotation.z = a;

      // Slim 1.5mm hardened stainless anti-rotation sub-guide rod
      const subRod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.72, 34.4, 12).rotateX(Math.PI / 2),
        mats.mountStainlessFlange
      );
      subUnit.add(subRod);

      // Dual bronze end-socket collars
      for (const ze of [-16.6, 16.6]) {
        const sock = new THREE.Mesh(
          new THREE.CylinderGeometry(1.3, 1.3, 1.8, 12).rotateX(Math.PI / 2),
          mats.brassGear
        );
        sock.position.z = ze;
        subUnit.add(sock);
      }

      // Forked white POM anti-rotation U-slider riding along sub-rod
      const forkZ = i % 2 === 0 ? 5.5 : -6.5;
      const forkBase = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.6, 4.8), mats.pomGear);
      forkBase.position.set(-1.4, 0, forkZ);
      subUnit.add(forkBase);

      antiRotGroup.add(subUnit);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-antirot-rails',
      29,
      '#cbd5e1',
      antiRotGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(66, 38, -68),
      new THREE.Vector3(70, 40, 298),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L30: 4x Sub-Micron MR Magnetic Position Encoders & Scale Strips (z = +65.0 mm)
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
      30,
      '#16a34a',
      mrEncodersGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(68, 0, -54),
      new THREE.Vector3(72, 0, 308),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L31: [NEW!] Dual Focus Group A/B Startup Homing Photo-Interrupters (z = +65.0 mm)
  // =========================================================================
  const afOriginGroup = new THREE.Group();
  {
    // Two absolute-origin optical photo-interrupter boards at 35° (Focus A home) & 305° (Focus B home)
    const originSpecs = [
      { deg: 35, zPos: 9.2 },
      { deg: 305, zPos: -9.8 },
    ];
    for (const o of originSpecs) {
      const a = THREE.MathUtils.degToRad(o.deg);
      const pod = new THREE.Group();
      pod.position.set(Math.cos(a) * 34.4, Math.sin(a) * 34.4, o.zPos);
      pod.rotation.z = a;

      const subBoard = new THREE.Mesh(new THREE.BoxGeometry(1.2, 6.2, 5.4), mats.hdiMainboardPcb);
      pod.add(subBoard);

      for (const sz of [-1.4, 1.4]) {
        const fork = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 1.1), mats.icEpoxy);
        fork.position.set(-1.4, 0, sz);
        pod.add(fork);
      }

      const emitter = new THREE.Mesh(new THREE.SphereGeometry(0.48, 8, 8), mats.irLedLens);
      emitter.position.set(-1.5, 0, 0.75);
      emitter.userData.noEdges = true;
      pod.add(emitter);

      const leadFlex = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.8, 12.0), mats.polyimideFpc);
      leadFlex.position.set(0.8, 0, -7.2);
      pod.add(leadFlex);

      afOriginGroup.add(pod);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-af-origin-sensors',
      31,
      '#db2777',
      afOriginGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(108, 12, -54),
      new THREE.Vector3(112, 14, 308),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L32: [NEW!] Split Internal Magnesium/TSC Structural Barrel — FRONT HALF (z = +83.5 mm)
  // =========================================================================
  const innerFrontGroup = new THREE.Group();
  {
    // Real Lensrentals 135mm GM 2-piece split magnesium inner barrel: Front half bolted at mid-seam!
    const skelFront = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(36.9, 35.1, cutStart, cutEnd), 26.4, 0.2, 0.2, 38),
      mats.magnesiumCast
    );
    innerFrontGroup.add(skelFront);

    for (const zRib of [-12.2, 12.2]) {
      const rib = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(37.4, 34.0, cutStart, cutEnd), 2.3, 0.12, 0.12, 36),
        mats.mountMgBulkhead
      );
      rib.position.z = zRib;
      innerFrontGroup.add(rib);
    }

    // 4 long structural stainless bolts joining Front & Rear Mg barrel halves at the mid-seam!
    for (const deg of [190, 255, 310, 412]) {
      const a = THREE.MathUtils.degToRad(deg);
      const bolt = createPrecisionScrew(1.25, 0.8, 6.2, mats.stainlessMachined);
      bolt.position.set(Math.cos(a) * 36.1, Math.sin(a) * 36.1, -13.0);
      innerFrontGroup.add(bolt);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-inner-chassis-front',
      32,
      '#64748b',
      innerFrontGroup,
      new THREE.Vector3(0, 0, 83.5),
      new THREE.Vector3(-56, 86, 56),
      new THREE.Vector3(-60, 90, 392),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L33: Split Internal Magnesium/TSC Structural Barrel — REAR HALF (z = +56.5 mm)
  // =========================================================================
  const innerChassisGroup = new THREE.Group();
  {
    const skelRear = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(36.9, 35.1, cutStart, cutEnd), 26.8, 0.2, 0.2, 38),
      mats.magnesiumCast
    );
    innerChassisGroup.add(skelRear);

    for (const zRib of [-12.4, 12.2]) {
      const rib = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(37.4, 34.0, cutStart, cutEnd), 2.3, 0.12, 0.12, 36),
        mats.mountMgBulkhead
      );
      rib.position.z = zRib;
      innerChassisGroup.add(rib);
    }

    for (const deg of [185, 250, 300, 410]) {
      const a = THREE.MathUtils.degToRad(deg);
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.6, 25.0), mats.stainlessMachined);
      beam.position.set(Math.cos(a) * 35.8, Math.sin(a) * 35.8, 0);
      beam.rotation.z = a;
      innerChassisGroup.add(beam);
    }

    const rearFlange = createLensCellRing(28.0, 34.4, 2.4, mats.magnesiumCast, 38);
    rearFlange.position.z = -18.0;
    innerChassisGroup.add(rearFlange);
  }
  parts.push(
    finalizeLensPart(
      'lens-inner-chassis',
      33,
      '#475569',
      innerChassisGroup,
      new THREE.Vector3(0, 0, 56.5),
      new THREE.Vector3(74, 80, -78),
      new THREE.Vector3(78, 84, 306),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L34: Element 09 (G6a) Floating Focus Group B Front ED Positive Mate (z = +60.2 mm)
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
    34,
    '#2dd4bf',
    focusBFrontGroup,
    new THREE.Vector3(0, 0, 60.2),
    new THREE.Vector3(0, 0, -98),
    new THREE.Vector3(0, 0, 282),
    cp,
    0.24
  );
  parts.push(focusBFrontPart);

  // =========================================================================
  // L35: Element 10 (G6b) Floating Focus Group B Main Carrier & Rear Aspheric (z = +57.0 mm)
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
    35,
    '#14b8a6',
    focusBGroup,
    new THREE.Vector3(0, 0, 57.0),
    new THREE.Vector3(0, 0, -118),
    new THREE.Vector3(0, 0, 270),
    cp,
    0.24
  );
  parts.push(focusGroupBPart);

  // =========================================================================
  // L36: [NEW!] Focus Group B Rear 3-Point Eccentric Tilt Collars & Nylon Posts (z = +57.0 mm)
  // =========================================================================
  const focusBEccGroup = new THREE.Group();
  {
    // Real Lensrentals 135mm GM & RF 50mm F1.2L discovery: rear floating group eccentric tilt collar + white nylon posts!
    const rearEccRing = createLensCellRing(28.4, 30.2, 6.2, mats.shutterChassis, 38);
    focusBEccGroup.add(rearEccRing);

    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(75 + i * 120);
      const pod = new THREE.Group();
      pod.position.set(Math.cos(a) * 29.8, Math.sin(a) * 29.8, 0);
      pod.rotation.z = a;

      // White nylon support post paired with eccentric adjusting cam
      const nylonPost = new THREE.Mesh(
        new THREE.CylinderGeometry(1.3, 1.3, 4.4, 12).rotateX(Math.PI / 2),
        mats.pomGear
      );
      nylonPost.position.set(0.4, 1.8, 0);
      pod.add(nylonPost);

      const eccWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 2.0, 14).rotateZ(Math.PI / 2),
        mats.brassGear
      );
      eccWheel.position.set(1.0, -1.6, 0);
      pod.add(eccWheel);

      // Silicone tamper-evident calibration lock dot
      const silGlue = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 8), mats.damperElastomer);
      silGlue.position.set(2.0, -1.6, 1.0);
      silGlue.userData.noEdges = true;
      pod.add(silGlue);

      focusBEccGroup.add(pod);
    }
  }
  const focusBEccPart = finalizeLensPart(
    'lens-focus-b-eccentric',
    36,
    '#0d9488',
    focusBEccGroup,
    new THREE.Vector3(0, 0, 57.0),
    new THREE.Vector3(-62, -26, -118),
    new THREE.Vector3(-66, -28, 270),
    cp,
    0.24
  );
  parts.push(focusBEccPart);

  // =========================================================================
  // L37: Element 11 (G7) Rear Fixed Negative Field-Curvature Flattener (z = +52.4 mm)
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
      37,
      '#06b6d4',
      g7Group,
      new THREE.Vector3(0, 0, 52.4),
      new THREE.Vector3(0, 0, -138),
      new THREE.Vector3(0, 0, 258),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L38: Element 12 (G8) High-Index Lanthanum Sagittal Coma Corrector (z = +48.8 mm)
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
      38,
      '#818cf8',
      rearConvexGroup,
      new THREE.Vector3(0, 0, 48.8),
      new THREE.Vector3(0, 0, -158),
      new THREE.Vector3(0, 0, 246),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L39: Element 13 (G9) Large-Diameter φ45mm Rear Telecentric Meniscus (z = +45.2 mm)
  // =========================================================================
  const telecentricGroup = new THREE.Group();
  {
    const teleGeo = createOpticalLensGeometry(23.0, 2.8, 2.4, -0.9, 0.08, 0.0, 16, 38);
    const teleMesh = new THREE.Mesh(teleGeo, mats.evfLensAspheric);
    teleMesh.userData.noEdges = true;
    telecentricGroup.add(teleMesh);

    telecentricGroup.add(createLensCellRing(22.5, 23.4, 2.9, mats.evfGlassEdgeRim, 36));
    telecentricGroup.add(createLensCellRing(23.3, 27.0, 3.2, mats.matteBlackAnodized, 36));

    const g9Spacer = createLensCellRing(23.4, 26.2, 0.65, mats.brassGear, 34);
    g9Spacer.position.z = -1.75;
    telecentricGroup.add(g9Spacer);
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-telecentric',
      39,
      '#a78bfa',
      telecentricGroup,
      new THREE.Vector3(0, 0, 45.2),
      new THREE.Vector3(0, 0, -178),
      new THREE.Vector3(0, 0, 234),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L40: Element 14 (G10) φ44mm 3rd XA Rear Hero Element (z = +41.6 mm)
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
      40,
      '#6366f1',
      rearHeroGroup,
      new THREE.Vector3(0, 0, 41.6),
      new THREE.Vector3(0, 0, -198),
      new THREE.Vector3(0, 0, 222),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L41: [NEW!] Rear Fixed Optical Cell & Per-Unit SA-Tuning Spacer Ring (z = +46.8 mm)
  // =========================================================================
  const rearCellSpacerGroup = new THREE.Group();
  {
    // Cutaway rear optical barrel sleeve housing fixed rear group E11-E14
    const rearSleeve = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(29.0, 27.2, cutStart, cutEnd), 14.5, 0.14, 0.14, 36),
      mats.matteBlackAnodized
    );
    rearCellSpacerGroup.add(rearSleeve);

    // Individual spherical-aberration / bokeh tuning micron brass spacing washer (Sony Kikuchi interview!)
    const saShim = createLensCellRing(26.2, 28.8, 0.75, mats.brassGear, 38);
    saShim.position.z = 7.4;
    rearCellSpacerGroup.add(saShim);

    // 3 mounting ears bolting rear optical core directly into L33 rear Mg skeleton
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(30 + i * 120);
      const ear = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.4, 2.0), mats.stainlessMachined);
      ear.position.set(Math.cos(a) * 30.0, Math.sin(a) * 30.0, -6.2);
      ear.rotation.z = a;
      rearCellSpacerGroup.add(ear);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-cell-spacer',
      41,
      '#eab308',
      rearCellSpacerGroup,
      new THREE.Vector3(0, 0, 46.8),
      new THREE.Vector3(56, 30, -172),
      new THREE.Vector3(60, 32, 240),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L42: Rear 3:2 Rectangular Stray-Light Flare Mask & Flocked Baffle (z = +38.2 mm)
  // =========================================================================
  const rearBaffleGroup = new THREE.Group();
  {
    const maskPlate = new THREE.Mesh(
      extrudeCentered(createCircularRectWindowShape(25.8, 30.6, 20.4, 1.8), 1.6, 0.1, 0.1, 36),
      mats.mountVelvetBaffle
    );
    rearBaffleGroup.add(maskPlate);

    const baffleStep = new THREE.Mesh(
      extrudeCentered(createCircularRectWindowShape(24.4, 29.2, 19.4, 1.4), 1.4, 0.06, 0.06, 32),
      mats.matteBlackAnodized
    );
    baffleStep.position.z = -1.2;
    rearBaffleGroup.add(baffleStep);

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
      42,
      '#1e293b',
      rearBaffleGroup,
      new THREE.Vector3(0, 0, 38.2),
      new THREE.Vector3(0, 0, -218),
      new THREE.Vector3(0, 0, 210),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L43: Knurled Rubber Linear-Response MF Focus Ring (NOW STANDALONE!, z = +96.0 mm)
  // =========================================================================
  const focusRingOuterGroup = new THREE.Group();
  const focusRingRotor = new THREE.Group();
  {
    const focusRingShape = createCutawayArcRingShape(43.2, 40.4, cutStart, cutEnd);
    const focusRingBase = new THREE.Mesh(
      extrudeCentered(focusRingShape, 20.0, 0.35, 0.35, 40),
      mats.lensRubberGrip
    );
    focusRingRotor.add(focusRingBase);

    const focusRibGeo = new THREE.BoxGeometry(0.8, 0.9, 17.6);
    const focusDegs: number[] = [];
    for (let deg = 172; deg <= 430; deg += 6) focusDegs.push(deg);
    const focusRibInst = new THREE.InstancedMesh(focusRibGeo, mats.matteBlackAnodized, focusDegs.length);
    focusDegs.forEach((deg, idx) => {
      const a = THREE.MathUtils.degToRad(deg);
      dummy.position.set(Math.cos(a) * 43.3, Math.sin(a) * 43.3, 0);
      dummy.rotation.set(0, 0, a);
      dummy.updateMatrix();
      focusRibInst.setMatrixAt(idx, dummy.matrix);
    });
    focusRibInst.instanceMatrix.needsUpdate = true;
    focusRingRotor.add(focusRibInst);
    focusRingOuterGroup.add(focusRingRotor);
  }
  parts.push(
    finalizeLensPart(
      'lens-control-rings',
      43,
      '#1e293b',
      focusRingOuterGroup,
      new THREE.Vector3(0, 0, 96.0),
      new THREE.Vector3(0, 134, 108),
      new THREE.Vector3(0, 142, 434),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L44: [NEW!] 3x White POM Spring-Loaded Focus Torque Sliders & Moisture Tape (z = +96.0 mm)
  // =========================================================================
  const mfTensionersGroup = new THREE.Group();
  {
    // Exact Lensrentals 135mm GM teardown discovery: moisture barrier tape + 3 white POM friction tensioners!
    const tapeBand = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(40.35, 40.0, cutStart, cutEnd), 16.0, 0.03, 0.03, 38),
      mats.mountThreadLockBlue
    );
    tapeBand.userData.noEdges = true;
    mfTensionersGroup.add(tapeBand);

    // 3 springy white POM tensioner shoes riding in focus-ring grooves at 120° intervals
    for (const deg of [205, 310, 415]) {
      const a = THREE.MathUtils.degToRad(deg);
      const shoe = new THREE.Group();
      shoe.position.set(Math.cos(a) * 40.1, Math.sin(a) * 40.1, 0);
      shoe.rotation.z = a;

      const slider = new THREE.Mesh(new THREE.BoxGeometry(1.3, 5.2, 11.4), mats.pomGear);
      shoe.add(slider);

      const leafSp = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.8, 9.0), mats.mountSpringSteel);
      leafSp.position.x = -0.8;
      shoe.add(leafSp);

      mfTensionersGroup.add(shoe);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-mf-tensioners',
      44,
      '#e2e8f0',
      mfTensionersGroup,
      new THREE.Vector3(0, 0, 96.0),
      new THREE.Vector3(0, 96, 108),
      new THREE.Vector3(0, 102, 434),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L45: Non-Contact 2,048 PPR Optical Slotted MF Rotary Encoder Wheel (z = +92.0 mm)
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
      45,
      '#eab308',
      mfEncoderGroup,
      new THREE.Vector3(0, 0, 92.0),
      new THREE.Vector3(0, 62, 108),
      new THREE.Vector3(0, 66, 434),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L46: [NEW!] Standalone CNC Machined Aluminum Aperture Ring (z = +56.0 mm)
  // =========================================================================
  const apRingOuterGroup = new THREE.Group();
  const apRingRotor = new THREE.Group();
  {
    const apRingShape = createCutawayArcRingShape(41.2, 38.4, cutStart, cutEnd);
    const apRing = new THREE.Mesh(
      extrudeCentered(apRingShape, 11.4, 0.25, 0.25, 38),
      mats.lensBarrelAnodized
    );
    apRingRotor.add(apRing);

    const apRibGeo = new THREE.BoxGeometry(0.9, 0.7, 8.6);
    const apDegs: number[] = [];
    for (let deg = 176; deg <= 426; deg += 9) apDegs.push(deg);
    const apRibInst = new THREE.InstancedMesh(apRibGeo, mats.stainlessMachined, apDegs.length);
    apDegs.forEach((deg, idx) => {
      const a = THREE.MathUtils.degToRad(deg);
      dummy.position.set(Math.cos(a) * 41.35, Math.sin(a) * 41.35, 0);
      dummy.rotation.set(0, 0, a);
      dummy.updateMatrix();
      apRibInst.setMatrixAt(idx, dummy.matrix);
    });
    apRibInst.instanceMatrix.needsUpdate = true;
    apRingRotor.add(apRibInst);

    // Subtle 1/3-stop tactile index dot on rear bevel
    const apDot = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 8), mats.lensAccentRing);
    apDot.position.set(0, 41.4, -4.4);
    apDot.userData.noEdges = true;
    apRingRotor.add(apDot);

    apRingOuterGroup.add(apRingRotor);
  }
  parts.push(
    finalizeLensPart(
      'lens-aperture-ring',
      46,
      '#334155',
      apRingOuterGroup,
      new THREE.Vector3(0, 0, 56.0),
      new THREE.Vector3(0, 134, -110),
      new THREE.Vector3(0, 142, 268),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L47: [NEW!] Aperture Ring Micro Steel-Ball Bearing Race & Grease Retainer (z = +56.0 mm)
  // =========================================================================
  const apBearingsGroup = new THREE.Group();
  {
    // Precision stamped brass/POM ball-retainer race keeping aperture ring wobble-free!
    const raceCage = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(38.4, 37.2, cutStart, cutEnd), 2.4, 0.06, 0.06, 38),
      mats.pomGear
    );
    apBearingsGroup.add(raceCage);

    // 24 hardened stainless micro steel bearing balls seated in the race (InstancedMesh!)
    const ballGeo = new THREE.SphereGeometry(0.82, 10, 8);
    const ballInst = new THREE.InstancedMesh(ballGeo, mats.mountStainlessFlange, 24);
    for (let i = 0; i < 24; i++) {
      const a = cutStart + (i / 23) * (cutEnd - cutStart);
      dummy.position.set(Math.cos(a) * 37.8, Math.sin(a) * 37.8, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      ballInst.setMatrixAt(i, dummy.matrix);
    }
    ballInst.instanceMatrix.needsUpdate = true;
    apBearingsGroup.add(ballInst);

    // Thin stainless thrust race backing ring
    const thrustRace = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(38.3, 37.1, cutStart, cutEnd), 0.5, 0.03, 0.03, 38),
      mats.stainlessMachined
    );
    thrustRace.position.z = -1.5;
    apBearingsGroup.add(thrustRace);
  }
  parts.push(
    finalizeLensPart(
      'lens-aperture-bearings',
      47,
      '#94a3b8',
      apBearingsGroup,
      new THREE.Vector3(0, 0, 56.0),
      new THREE.Vector3(0, 92, -110),
      new THREE.Vector3(0, 98, 268),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L48: Aperture Ring Non-Contact Magnetic Hall Sensor & Multi-Pole Rotor (z = +56.0 mm)
  // =========================================================================
  const apSensorGroup = new THREE.Group();
  const apertureHallRotor = new THREE.Group();
  {
    const rotorRing = createLensCellRing(36.8, 38.2, 2.2, mats.stainlessMachined, 38);
    apertureHallRotor.add(rotorRing);

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
      48,
      '#8b5cf6',
      apSensorGroup,
      new THREE.Vector3(0, 0, 56.0),
      new THREE.Vector3(-68, 72, -110),
      new THREE.Vector3(-72, 76, 268),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L49: Switchable Steel-Ball Spring Click / De-Click Detent Cam (z = +56.0 mm)
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

    const camSlider = new THREE.Mesh(new THREE.BoxGeometry(2.0, 4.2, 6.8), mats.lensAccentRing);
    camSlider.position.set(2.3, 0, 0);
    detPod.add(camSlider);

    clickDetentGroup.add(detPod);
  }
  parts.push(
    finalizeLensPart(
      'lens-click-detent',
      49,
      '#f59e0b',
      clickDetentGroup,
      new THREE.Vector3(0, 0, 56.0),
      new THREE.Vector3(-74, -52, -110),
      new THREE.Vector3(-78, -56, 268),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L50: Weather-Sealed Side Control Pod Tactile Switch PCB (asm 38.6, -4.0, 67.0)
  // =========================================================================
  const switchPcbGroup = new THREE.Group();
  {
    const subPcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(1.5, 22.0, 0.5), 20.4, 0.08, 0.08, 10),
      mats.hdiMainboardPcb
    );
    switchPcbGroup.add(subPcb);

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

    const slideSw = new THREE.Mesh(new THREE.BoxGeometry(1.5, 4.4, 7.2), mats.stainlessMachined);
    slideSw.position.set(1.2, -5.2, -4.5);
    switchPcbGroup.add(slideSw);

    const silMembrane = new THREE.Mesh(new THREE.BoxGeometry(0.45, 20.6, 18.8), mats.thermalPadBlue);
    silMembrane.position.set(2.15, 0, 0);
    silMembrane.userData.noEdges = true;
    switchPcbGroup.add(silMembrane);

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
      50,
      '#10b981',
      switchPcbGroup,
      new THREE.Vector3(38.6, -4.0, 67.0),
      new THREE.Vector3(80, -14, 2),
      new THREE.Vector3(84, -16, 354),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L51: [NEW!] Vertical-Grip Top Focus Hold Button & Waterproof Boot Pod (asm 0, 41.0, 71.5)
  // =========================================================================
  const topHoldPodGroup = new THREE.Group();
  {
    // Second customizable Focus Hold button at 12-o'clock for vertical portrait ergonomics (Takata interview!)
    const bezel = new THREE.Mesh(
      new THREE.CylinderGeometry(4.6, 5.1, 2.4, 20),
      mats.matteBlackAnodized
    );
    topHoldPodGroup.add(bezel);

    const buttonCap = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.7, 2.2, 18),
      mats.stainlessMachined
    );
    buttonCap.position.y = 1.4;
    topHoldPodGroup.add(buttonCap);

    // Translucent waterproof silicone sealing boot under cap
    const waterBoot = new THREE.Mesh(
      new THREE.CylinderGeometry(4.1, 4.3, 1.1, 18),
      mats.thermalPadBlue
    );
    waterBoot.position.y = -0.5;
    waterBoot.userData.noEdges = true;
    topHoldPodGroup.add(waterBoot);

    // Micro gold tactile snap-dome PCB + curved polyimide ribbon down to L53 Ring MCU
    const microPcb = new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.0, 6.8), mats.hdiMainboardPcb);
    microPcb.position.y = -1.8;
    topHoldPodGroup.add(microPcb);

    const topFlex = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.35, 16.0), mats.polyimideFpc);
    topFlex.position.set(0, -2.2, -9.5);
    topHoldPodGroup.add(topFlex);
  }
  parts.push(
    finalizeLensPart(
      'lens-top-hold-pod',
      51,
      '#059669',
      topHoldPodGroup,
      new THREE.Vector3(0, 41.0, 71.5),
      new THREE.Vector3(0, 148, 0),
      new THREE.Vector3(0, 156, 352),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L52: Internal Precision NTC Thermistor Temperature Sensor (asm -28, +19, 48.0)
  // =========================================================================
  const thermistorGroup = new THREE.Group();
  {
    const cuPad = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(7.2, 5.4, 1.0), 0.7, 0.06, 0.06, 10),
      mats.copperHeatSpreader
    );
    thermistorGroup.add(cuPad);

    const timPad = new THREE.Mesh(new THREE.BoxGeometry(6.4, 4.6, 0.55), mats.thermalPadPink);
    timPad.position.z = -0.55;
    thermistorGroup.add(timPad);

    const ntcBead = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.6, 1.3), mats.smdCeramic);
    ntcBead.position.set(0, 0, 0.95);
    thermistorGroup.add(ntcBead);

    for (const sx of [-1.45, 1.45]) {
      const term = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.7, 1.35), mats.goldPlating);
      term.position.set(sx, 0, 0.95);
      thermistorGroup.add(term);
    }

    const clip = new THREE.Mesh(new THREE.BoxGeometry(1.6, 6.4, 0.45), mats.stainlessMachined);
    clip.position.set(-2.6, 0, 0.65);
    thermistorGroup.add(clip);

    const ntcFlex = new THREE.Mesh(new THREE.BoxGeometry(2.6, 11.5, 0.35), mats.polyimideFpc);
    ntcFlex.position.set(2.8, -5.8, 0.4);
    thermistorGroup.add(ntcFlex);
  }
  parts.push(
    finalizeLensPart(
      'lens-thermistor',
      52,
      '#ef4444',
      thermistorGroup,
      new THREE.Vector3(-28.0, 19.0, 48.0),
      new THREE.Vector3(-56, 40, -160),
      new THREE.Vector3(-60, 44, 248),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L53: Circular Ring HDI 32-Bit AF MCU & 4ch H-Bridge Driver PCB (z = +45.5 mm)
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
      53,
      '#15803d',
      mcuPcbGroup,
      new THREE.Vector3(0, 0, 45.5),
      new THREE.Vector3(0, -68, -172),
      new THREE.Vector3(0, -72, 242),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L54: [NEW!] Conductive EMI Metal Shield Plate & ESD Grounding Tape (z = +43.4 mm)
  // =========================================================================
  const emiShieldGroup = new THREE.Group();
  {
    // Stamped stainless/permalloy EMI shield ring isolating rear camera sensor from 4ch H-Bridge PWM noise!
    const shieldPlate = createLensCellRing(28.6, 36.4, 0.85, mats.lensPermalloyShield, 40);
    emiShieldGroup.add(shieldPlate);

    // 4 raised EMI shield cans covering the 4 XD H-Bridge driver ICs
    for (const deg of motorAnglesDeg) {
      const a = THREE.MathUtils.degToRad(deg);
      const can = new THREE.Mesh(new THREE.BoxGeometry(5.6, 5.6, 1.4), mats.emiShieldCan);
      can.position.set(Math.cos(a) * 32.4, Math.sin(a) * 32.4, 0.85);
      can.rotation.z = a;
      emiShieldGroup.add(can);
    }

    // Conductive copper-foil ESD static-discharge grounding tape bridging PCB shield to bayonet flange (Lensrentals RF50 teardown!)
    const esdStrap = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.45, 9.6), mats.copperHeatSpreader);
    esdStrap.position.set(0, -33.2, -5.0);
    emiShieldGroup.add(esdStrap);
  }
  parts.push(
    finalizeLensPart(
      'lens-emi-shield-can',
      54,
      '#64748b',
      emiShieldGroup,
      new THREE.Vector3(0, 0, 43.4),
      new THREE.Vector3(0, -106, -184),
      new THREE.Vector3(0, -112, 232),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L55: Multi-Branch High-Flex Polyimide Internal FPC Ribbon Harness (z = +58.0 mm)
  // =========================================================================
  const fpcHarnessGroup = new THREE.Group();
  {
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

    const branchSpecs = [
      { deg: 350, zCenter: 10.0, len: 30.0, w: 4.8 },
      { deg: 315, zCenter: 4.0, len: 24.0, w: 4.2 },
      { deg: 270, zCenter: -8.0, len: 26.0, w: 7.2 },
      { deg: 225, zCenter: 4.0, len: 24.0, w: 4.2 },
      { deg: 205, zCenter: 14.0, len: 34.0, w: 3.6 },
    ];
    for (const b of branchSpecs) {
      const a = THREE.MathUtils.degToRad(b.deg);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.45, b.w, b.len), mats.polyimideFpc);
      strip.position.set(Math.cos(a) * 37.3, Math.sin(a) * 37.3, b.zCenter);
      strip.rotation.z = a;
      fpcHarnessGroup.add(strip);

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
      55,
      '#f97316',
      fpcHarnessGroup,
      new THREE.Vector3(0, 0, 58.0),
      new THREE.Vector3(84, -62, -124),
      new THREE.Vector3(90, -66, 274),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L56: 6-Stage Weather-Sealing EPDM O-Rings & Wiper Gaskets (z = +74.0 mm)
  // =========================================================================
  const weatherSealsGroup = new THREE.Group();
  {
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
      56,
      '#0ea5e9',
      weatherSealsGroup,
      new THREE.Vector3(0, 0, 74.0),
      new THREE.Vector3(0, -78, 72),
      new THREE.Vector3(0, -82, 424),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L57: [NEW!] Front Outer Barrel, Hood Bayonet Collar & Metallic Accent Band (z = +109.5 mm)
  // =========================================================================
  const frontOuterBarrelGroup = new THREE.Group();
  {
    const frontCollar = createLensCellRing(37.4, 42.8, 12.5, mats.lensBarrelAnodized, 40);
    frontOuterBarrelGroup.add(frontCollar);

    const accentBand = createLensCellRing(42.2, 43.3, 2.2, mats.lensAccentRing, 40);
    accentBand.position.z = -4.3;
    frontOuterBarrelGroup.add(accentBand);

    // 2 sculpted exterior bayonet lugs for L01 lens hood twist-lock
    for (const deg of [90, 270]) {
      const a0 = THREE.MathUtils.degToRad(deg - 24);
      const a1 = THREE.MathUtils.degToRad(deg + 24);
      const lug = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(43.8, 42.4, a0, a1), 2.4, 0.08, 0.08, 14),
        mats.matteBlackAnodized
      );
      lug.position.z = 4.6;
      frontOuterBarrelGroup.add(lug);
    }

    // Hood alignment crimson dot
    const hoodIdx = new THREE.Mesh(new THREE.SphereGeometry(0.85, 8, 8), mats.mountRedIndexDot);
    hoodIdx.position.set(0, 43.0, 2.0);
    hoodIdx.userData.noEdges = true;
    frontOuterBarrelGroup.add(hoodIdx);
  }
  parts.push(
    finalizeLensPart(
      'lens-front-outer-barrel',
      57,
      '#334155',
      frontOuterBarrelGroup,
      new THREE.Vector3(0, 0, 109.5),
      new THREE.Vector3(0, 136, 198),
      new THREE.Vector3(0, 144, 476),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L58: Weather-Sealed Main Mid/Rear Cutaway Outer Barrel & Side Escutcheon (z = +74.0 mm)
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

    // Sculpted side control escutcheon with Focus Hold button, AF/MF switch & signature crimson badge
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

    // Signature metallic red flagship emblem plate (zero text, pure geometric bevel badge!)
    const badgePlate = new THREE.Mesh(new THREE.BoxGeometry(1.2, 5.8, 5.8), mats.bodyRecRed);
    badgePlate.position.set(40.4, 9.8, 8.2);
    barrelGroup.add(badgePlate);
  }
  parts.push(
    finalizeLensPart(
      'lens-cutaway-barrel',
      58,
      '#475569',
      barrelGroup,
      new THREE.Vector3(0, 0, 74.0),
      new THREE.Vector3(0, -138, -24),
      new THREE.Vector3(0, -146, 336),
      cp,
      0.22
    )
  );

  // =========================================================================
  // L59: [NEW!] Under-Mount 3-Location Tilt Shim Insertion Plate & Rear Foam Seal (z = +36.8 mm)
  // =========================================================================
  const mountShimPlateGroup = new THREE.Group();
  {
    // Exact Lensrentals 135mm GM teardown discovery: 3-location shim insertion plate + rear dust foam!
    const shimPlate = createLensCellRing(27.2, 33.8, 1.1, mats.shutterChassis, 40);
    mountShimPlateGroup.add(shimPlate);

    // 3 precision milled shim-insertion pocket slots at 120° intervals
    for (let i = 0; i < 3; i++) {
      const a0 = THREE.MathUtils.degToRad(i * 120 - 14);
      const a1 = THREE.MathUtils.degToRad(i * 120 + 14);
      const slotBoss = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(34.6, 31.6, a0, a1), 1.4, 0.06, 0.06, 10),
        mats.stainlessMachined
      );
      slotBoss.position.z = 0.25;
      mountShimPlateGroup.add(slotBoss);
    }

    // Rear closed-cell foam dust/moisture seal ringing the inner bayonet perimeter
    const rearFoam = createLensCellRing(31.8, 34.4, 1.4, mats.lensFoamSeal, 40);
    rearFoam.position.z = -1.0;
    rearFoam.userData.noEdges = true;
    mountShimPlateGroup.add(rearFoam);
  }
  parts.push(
    finalizeLensPart(
      'lens-mount-shim-plate',
      59,
      '#64748b',
      mountShimPlateGroup,
      new THREE.Vector3(0, 0, 36.8),
      new THREE.Vector3(0, 0, -236),
      new THREE.Vector3(0, 0, 198),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L60: Infinity-Focus Micron Brass & Stainless Mount Calibration Shims (z = +35.2 mm)
  // =========================================================================
  const bayonetShimsGroup = new THREE.Group();
  {
    const shim50 = createLensCellRing(27.8, 33.4, 0.52, mats.stainlessMachined, 38);
    shim50.position.z = 0.65;
    bayonetShimsGroup.add(shim50);

    const shim20 = createLensCellRing(28.0, 33.2, 0.36, mats.brassGear, 38);
    shim20.position.z = 0.0;
    bayonetShimsGroup.add(shim20);

    const shim10 = createLensCellRing(28.2, 33.0, 0.26, mats.mountShimBlue, 38);
    shim10.position.z = -0.52;
    bayonetShimsGroup.add(shim10);

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
      60,
      '#eab308',
      bayonetShimsGroup,
      new THREE.Vector3(0, 0, 35.2),
      new THREE.Vector3(0, 0, -256),
      new THREE.Vector3(0, 0, 186),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L61: [NEW!] 12-Pin Gold Bayonet Contact Block, PPS Insulator & ESD Sub-Flex (z = +34.4 mm)
  // =========================================================================
  const contactBlockGroup = new THREE.Group();
  {
    const contactBlock = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(27.0, 24.4, -Math.PI * 0.68, -Math.PI * 0.32), 2.2, 0.08, 0.08, 20),
      mats.mountPpsInsulator
    );
    contactBlockGroup.add(contactBlock);

    // 12 precision gold-plated lens communication & power contact pads
    const padGeo = new THREE.BoxGeometry(1.1, 1.6, 0.55);
    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, 12);
    for (let i = 0; i < 12; i++) {
      const a = -Math.PI * 0.65 + (i / 11) * (Math.PI * 0.3);
      dummy.position.set(Math.cos(a) * 25.7, Math.sin(a) * 25.7, -1.1);
      dummy.rotation.set(0, 0, a);
      dummy.updateMatrix();
      padInst.setMatrixAt(i, dummy.matrix);
    }
    padInst.instanceMatrix.needsUpdate = true;
    contactBlockGroup.add(padInst);

    // Rigid-flex contact breakout tail + ESD TVS surge diode array
    const esdFlex = new THREE.Mesh(new THREE.BoxGeometry(9.2, 1.2, 8.8), mats.polyimideFpc);
    esdFlex.position.set(0, -26.5, 4.4);
    contactBlockGroup.add(esdFlex);

    const tvsIc = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.0, 2.4), mats.icEpoxy);
    tvsIc.position.set(0, -27.2, 3.6);
    contactBlockGroup.add(tvsIc);

    // 2 small bayonet-to-contact retaining screws
    for (const sx of [-11.5, 11.5]) {
      const sc = createPrecisionScrew(0.85, 0.45, 1.4, mats.stainlessMachined);
      sc.position.set(sx, -23.0, -0.8);
      sc.rotation.y = Math.PI;
      contactBlockGroup.add(sc);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-contact-block',
      61,
      '#f59e0b',
      contactBlockGroup,
      new THREE.Vector3(0, 0, 34.4),
      new THREE.Vector3(0, -34, -276),
      new THREE.Vector3(0, -36, 174),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L62: Hardened Stainless 4-Lug Rear Lens Bayonet Flange (z = +33.5 mm)
  // =========================================================================
  const rearBayonetGroup = new THREE.Group();
  {
    const flange = createLensCellRing(26.2, 34.0, 2.8, mats.mountStainlessFlange, 44);
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

    // 4 countersunk M2.5 bolt bore seats (bolts & EPDM skirt seal decoupled cleanly into L70!)
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const bore = new THREE.Mesh(
        new THREE.RingGeometry(0.95, 1.48, 14),
        mats.matteBlackAnodized
      );
      bore.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, -1.43);
      bore.rotation.y = Math.PI;
      bore.userData.noEdges = true;
      rearBayonetGroup.add(bore);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-bayonet',
      62,
      '#cbd5e1',
      rearBayonetGroup,
      new THREE.Vector3(0, 0, 33.5),
      new THREE.Vector3(0, 0, -296),
      new THREE.Vector3(0, 0, 164),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L63: [PHASE 11] Multi-Station Threaded Optical Spanner Retaining Rings & Cushion O-Rings
  // =========================================================================
  const retainingRingsGroup = new THREE.Group();
  {
    // Station 1: Front XA E01 threaded retaining ring (world z = 111.8 -> local +37.8)
    const frontSpanner = createSpannerRingGroup(
      32.8,
      36.6,
      1.2,
      mats.matteBlackAnodized,
      mats.stainlessMachined,
      mats.thermalPadBlue,
      4
    );
    frontSpanner.position.z = 37.8;
    retainingRingsGroup.add(frontSpanner);

    // Station 2: Mid G2/G3 doublet threaded clamp ring (world z = 99.2 -> local +25.2)
    const midSpanner = createSpannerRingGroup(
      30.4,
      34.4,
      1.1,
      mats.matteBlackAnodized,
      mats.stainlessMachined,
      mats.thermalPadBlue,
      4
    );
    midSpanner.position.z = 25.2;
    retainingRingsGroup.add(midSpanner);

    // Station 3: Rear E14 XA retaining spanner ring (world z = 39.8 -> local -34.2)
    const rearSpanner = createSpannerRingGroup(
      22.4,
      26.8,
      1.1,
      mats.matteBlackAnodized,
      mats.stainlessMachined,
      mats.thermalPadBlue,
      4
    );
    rearSpanner.position.z = -34.2;
    retainingRingsGroup.add(rearSpanner);
  }
  parts.push(
    finalizeLensPart(
      'lens-retaining-rings',
      63,
      '#334155',
      retainingRingsGroup,
      new THREE.Vector3(0, 0, 74.0),
      new THREE.Vector3(82, 0, 152),
      new THREE.Vector3(88, 0, 444),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L64: [PHASE 11] Laser-Cut Ultra-Matte Air-Gap Optical Spacers & Brass Centering Collars
  // =========================================================================
  const opticalSpacersGroup = new THREE.Group();
  {
    const gapSpecs: Array<{ z: number; innerR: number; outerR: number; thick: number }> = [
      { z: 31.4, innerR: 29.8, outerR: 32.8, thick: 0.36 }, // G1-G2 air gap (world 105.4)
      { z: 16.2, innerR: 27.2, outerR: 31.6, thick: 0.34 }, // G3b-G4 air gap (world 90.2)
      { z: -19.4, innerR: 22.8, outerR: 26.8, thick: 0.34 }, // Focus B - G7 gap (world 54.6)
      { z: -27.0, innerR: 22.2, outerR: 26.4, thick: 0.36 }, // E12 - E13 gap (world 47.0)
    ];
    for (const g of gapSpecs) {
      const foil = createLensCellRing(g.innerR, g.outerR, g.thick, mats.velvetFlockTrap, 42);
      foil.position.z = g.z;
      opticalSpacersGroup.add(foil);

      const bevel = createLensCellRing(g.innerR - 0.5, g.innerR + 0.15, 0.18, mats.matteBlackAnodized, 42);
      bevel.position.z = g.z + 0.14;
      bevel.userData.noEdges = true;
      opticalSpacersGroup.add(bevel);
    }

    // 2 sets of 3 brass eccentric optical decentering calibration collars (front & rear fixed cells)
    for (const [zLoc, rad] of [
      [16.2, 32.4],
      [-27.0, 27.6],
    ] as Array<[number, number]>) {
      for (let i = 0; i < 3; i++) {
        const a = THREE.MathUtils.degToRad(40 + i * 120);
        const collar = new THREE.Group();
        collar.position.set(Math.cos(a) * rad, Math.sin(a) * rad, zLoc);
        collar.rotation.z = a;

        const bush = new THREE.Mesh(
          new THREE.CylinderGeometry(1.75, 1.75, 2.2, 16).rotateZ(Math.PI / 2),
          mats.brassGear
        );
        collar.add(bush);

        const setScrew = createPrecisionScrew(0.75, 0.45, 1.6, mats.titaniumRivet);
        setScrew.position.set(1.15, 0.3, 0);
        setScrew.rotation.y = Math.PI / 2;
        collar.add(setScrew);

        opticalSpacersGroup.add(collar);
      }
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-optical-spacers',
      64,
      '#0f172a',
      opticalSpacersGroup,
      new THREE.Vector3(0, 0, 74.0),
      new THREE.Vector3(-82, 0, 148),
      new THREE.Vector3(-88, 0, 440),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L65: [PHASE 11] Floating-Group U-Loop High-Flex Iris/Hall FPC & PTFE Abrasion Guard
  // =========================================================================
  const irisIsoFpcGroup = new THREE.Group();
  {
    const aLoop = THREE.MathUtils.degToRad(296);
    const loopPod = new THREE.Group();
    loopPod.position.set(Math.cos(aLoop) * 35.2, Math.sin(aLoop) * 35.2, 0);
    loopPod.rotation.z = aLoop;

    // Upper straight run from Iris stepper/home (z = +13) down toward rear MCU (z = -20)
    const upperLeg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 5.2, 24.0), mats.polyimideFpc);
    upperLeg.position.set(-0.9, 0, 1.0);
    loopPod.add(upperLeg);

    // Lower return leg bonded to inner barrel wall
    const lowerLeg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 5.2, 28.0), mats.polyimideFpc);
    lowerLeg.position.set(1.1, 0, -4.5);
    loopPod.add(lowerLeg);

    // Dynamic U-bend service loop relieving bending strain during 120fps AF sweeps
    const uBendCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.9, 0, 13.0),
      new THREE.Vector3(-0.6, 0, 15.8),
      new THREE.Vector3(0.2, 0, 16.5),
      new THREE.Vector3(1.1, 0, 14.8),
      new THREE.Vector3(1.1, 0, 9.5),
    ]);
    const uBendGeo = new THREE.TubeGeometry(uBendCurve, 18, 0.55, 8, false);
    uBendGeo.scale(0.38, 4.4, 1.0);
    loopPod.add(new THREE.Mesh(uBendGeo, mats.polyimideFpc));

    // White low-friction PTFE abrasion-guard slider film backing the U-loop against Mg chassis
    const ptfeGuard = new THREE.Mesh(new THREE.BoxGeometry(0.26, 6.8, 30.0), mats.pomGear);
    ptfeGuard.position.set(1.58, 0, -2.0);
    ptfeGuard.userData.noEdges = true;
    loopPod.add(ptfeGuard);

    // Gold ZIF connector fingers & ivory ZIF latch at rear MCU end
    const zifGold = new THREE.Mesh(new THREE.BoxGeometry(0.42, 5.0, 3.0), mats.goldPlating);
    zifGold.position.set(1.1, 0, -19.2);
    loopPod.add(zifGold);

    const zifClamp = new THREE.Mesh(new THREE.BoxGeometry(1.1, 6.2, 2.2), mats.zifIvoryPlastic);
    zifClamp.position.set(0.6, 0, -18.5);
    loopPod.add(zifClamp);

    irisIsoFpcGroup.add(loopPod);
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-iso-fpc',
      65,
      '#f59e0b',
      irisIsoFpcGroup,
      new THREE.Vector3(0, 0, 68.0),
      new THREE.Vector3(86, -54, 48),
      new THREE.Vector3(92, -58, 376),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L66: [PHASE 11] 4x 200um SmFeN Magnetic Vernier Scale Bars on Zero-CTE Invar Carriers
  // =========================================================================
  const mrScalesGroup = new THREE.Group();
  {
    for (let i = 0; i < motorAnglesDeg.length; i++) {
      const a = THREE.MathUtils.degToRad(motorAnglesDeg[i]);
      const railHolder = new THREE.Group();
      railHolder.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      railHolder.rotation.z = a;

      // Live moving scale carriage synced with Focus Group A (i=0,2) and Focus Group B (i=1,3)!
      const scaleCarriage = new THREE.Group();
      const baseZ = i % 2 === 0 ? 5.5 : -6.5;
      scaleCarriage.position.z = baseZ;
      scaleCarriage.userData.baseZ = baseZ;
      scaleCarriage.userData.groupIndex = i % 2;

      // Zero-CTE Invar alloy backing carrier bar
      const invarBar = new THREE.Mesh(new THREE.BoxGeometry(0.62, 2.4, 15.8), mats.stainlessMachined);
      invarBar.position.set(0.05, 3.6, 0);
      scaleCarriage.add(invarBar);

      // 200um multi-pole magnetized SmFeN Vernier magnetic scale track facing L30 MR head!
      const magTrack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.0, 14.8), mats.invarScaleBar);
      magTrack.position.set(-0.36, 3.6, 0);
      scaleCarriage.add(magTrack);

      // Titanium alignment end-clips
      for (const ez of [-7.6, 7.6]) {
        const clip = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.7, 1.1), mats.titaniumRivet);
        clip.position.set(0.05, 3.6, ez);
        scaleCarriage.add(clip);
      }

      railHolder.add(scaleCarriage);
      mrScaleCarriages.push(scaleCarriage);
      mrScalesGroup.add(railHolder);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-mr-magnet-scales',
      66,
      '#0284c7',
      mrScalesGroup,
      new THREE.Vector3(0, 0, 65.0),
      new THREE.Vector3(116, -24, -54),
      new THREE.Vector3(122, -26, 308),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L67: [PHASE 11] Spring-Tensioned PTFE/POM Focus-Ring Damping Bands & Micro Ball Bearings
  // =========================================================================
  const focusBearingBandsGroup = new THREE.Group();
  {
    // White self-lubricating PTFE/POM damping glide band seated cleanly inside L44 (r = 38.7..39.5)
    const ptfeBand = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(39.5, 38.7, cutStart, cutEnd), 13.4, 0.08, 0.08, 42),
      mats.pomGear
    );
    focusBearingBandsGroup.add(ptfeBand);

    // 2 rows x 9 micro hardened stainless bearing balls riding along front & rear raceway grooves
    const mfBallGeo = new THREE.SphereGeometry(0.58, 10, 8);
    const mfBallInst = new THREE.InstancedMesh(mfBallGeo, mats.mountStainlessFlange, 18);
    let bIdx = 0;
    for (const bz of [-5.8, 5.8]) {
      for (let i = 0; i < 9; i++) {
        const a = cutStart + 0.14 + (i / 8) * (cutEnd - cutStart - 0.28);
        dummy.position.set(Math.cos(a) * 39.1, Math.sin(a) * 39.1, bz);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        mfBallInst.setMatrixAt(bIdx++, dummy.matrix);
      }
    }
    mfBallInst.instanceMatrix.needsUpdate = true;
    focusBearingBandsGroup.add(mfBallInst);

    // Beryllium-copper wave-spring preload band compensating temperature & wear clearances
    const waveRing = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(39.75, 38.65, cutStart, cutEnd), 0.75, 0.04, 0.04, 42),
      mats.beCuSpring
    );
    waveRing.position.z = -7.2;
    focusBearingBandsGroup.add(waveRing);
  }
  parts.push(
    finalizeLensPart(
      'lens-focus-bearing-bands',
      67,
      '#cbd5e1',
      focusBearingBandsGroup,
      new THREE.Vector3(0, 0, 96.0),
      new THREE.Vector3(68, 114, 108),
      new THREE.Vector3(74, 120, 434),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L68: [PHASE 11] Mechanical IRIS LOCK / De-Click Slide Switch Pod & Weather Boot
  // =========================================================================
  const irisLockSwitchGroup = new THREE.Group();
  {
    // Sculpted black anodized switch bezel seated on -X side of aperture ring (z = +56.0)
    const bezel = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(2.6, 8.6, 1.1), 13.8, 0.14, 0.14, 10),
      mats.matteBlackAnodized
    );
    irisLockSwitchGroup.add(bezel);

    // Knurled tactile slide toggle + crimson lock indicator dot
    const sliderKnob = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(2.2, 5.2, 0.7), 6.0, 0.12, 0.12, 8),
      mats.lensRubberGrip
    );
    sliderKnob.position.set(-1.7, 0, 1.6);
    irisLockSwitchGroup.add(sliderKnob);

    const lockDot = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 8), mats.mountRedIndexDot);
    lockDot.position.set(-2.85, 0, 1.6);
    lockDot.userData.noEdges = true;
    irisLockSwitchGroup.add(lockDot);

    // Molded EPDM dust/moisture sliding weather-seal boot
    const epdmBoot = new THREE.Mesh(new THREE.BoxGeometry(0.85, 7.2, 11.4), mats.epdmGasket);
    epdmBoot.position.set(1.25, 0, 0);
    epdmBoot.userData.noEdges = true;
    irisLockSwitchGroup.add(epdmBoot);

    // Beryllium-copper click detent leaf spring & hardened stainless locking pawl
    const detentLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.42, 4.4, 9.6), mats.beCuSpring);
    detentLeaf.position.set(2.0, 0, 0);
    irisLockSwitchGroup.add(detentLeaf);

    const lockPawl = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.2, 3.0), mats.mountStainlessFlange);
    lockPawl.position.set(2.8, 0, 1.6);
    irisLockSwitchGroup.add(lockPawl);
  }
  parts.push(
    finalizeLensPart(
      'lens-iris-lock-switch',
      68,
      '#ef4444',
      irisLockSwitchGroup,
      new THREE.Vector3(-39.6, -6.5, 56.0),
      new THREE.Vector3(-114, -22, -110),
      new THREE.Vector3(-120, -24, 268),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L69: [PHASE 11] Internal Steel Load-Reinforcing Chassis Plates & M2x6 Bolts
  // =========================================================================
  const reinforcingPlatesGroup = new THREE.Group();
  {
    // 3 curved high-tensile stainless gusset plates tying rear bayonet seat to Mg barrel
    for (const deg of [205, 285, 392]) {
      const a0 = THREE.MathUtils.degToRad(deg - 16);
      const a1 = THREE.MathUtils.degToRad(deg + 16);
      const gusset = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(35.1, 34.1, a0, a1), 16.5, 0.08, 0.08, 14),
        mats.mountStainlessFlange
      );
      gusset.position.z = 0.8;
      reinforcingPlatesGroup.add(gusset);
    }

    // Rear circular structural torque distribution ring
    const torqueRing = createLensCellRing(31.4, 34.9, 1.35, mats.stainlessMachined, 42);
    torqueRing.position.z = -7.6;
    reinforcingPlatesGroup.add(torqueRing);

    // 8x high-tensile M2x6 titanium-coated structural bolts
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const bolt = createPrecisionScrew(0.95, 0.55, 2.8, mats.titaniumRivet);
      bolt.position.set(Math.cos(a) * 33.2, Math.sin(a) * 33.2, -8.3);
      bolt.rotation.y = Math.PI;
      reinforcingPlatesGroup.add(bolt);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-reinforcing-plates',
      69,
      '#64748b',
      reinforcingPlatesGroup,
      new THREE.Vector3(0, 0, 46.0),
      new THREE.Vector3(-78, -94, -172),
      new THREE.Vector3(-84, -100, 242),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L70: [PHASE 11] Rear Bayonet EPDM Skirt Gasket & 4x M2.5 Thread-Locked Mount Bolts
  // =========================================================================
  const mountSealBoltsGroup = new THREE.Group();
  {
    // Precision molded EPDM dust/moisture flange skirt gasket + outer wiper lip
    const rearSeal = createLensCellRing(33.5, 35.4, 1.5, mats.epdmGasket, 44);
    rearSeal.position.z = -1.1;
    mountSealBoltsGroup.add(rearSeal);

    const wiperLip = new THREE.Mesh(new THREE.TorusGeometry(35.3, 0.42, 10, 44), mats.epdmGasket);
    wiperLip.position.z = -1.65;
    wiperLip.userData.noEdges = true;
    mountSealBoltsGroup.add(wiperLip);

    // 4x high-tensile M2.5 stainless mount bolts with blue micro-capsule threadlock & BeCu lock washers
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const bx = Math.cos(a) * 30.8;
      const by = Math.sin(a) * 30.8;

      const screw = createPrecisionScrew(1.28, 0.72, 3.8, mats.mountStainlessFlange);
      screw.position.set(bx, by, -1.3);
      screw.rotation.y = Math.PI;
      mountSealBoltsGroup.add(screw);

      // Blue nylon anti-vibration thread-lock band around shaft
      const lockBand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.76, 0.76, 1.3, 10).rotateX(Math.PI / 2),
        mats.mountThreadLockBlue
      );
      lockBand.position.set(bx, by, 1.2);
      lockBand.userData.noEdges = true;
      mountSealBoltsGroup.add(lockBand);

      // BeCu spring lock washer under screw seat
      const washer = new THREE.Mesh(
        new THREE.TorusGeometry(1.12, 0.16, 8, 16),
        mats.beCuSpring
      );
      washer.position.set(bx, by, -0.7);
      washer.userData.noEdges = true;
      mountSealBoltsGroup.add(washer);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-mount-seal-bolts',
      70,
      '#0ea5e9',
      mountSealBoltsGroup,
      new THREE.Vector3(0, 0, 33.5),
      new THREE.Vector3(0, 0, -320),
      new THREE.Vector3(0, 0, 150),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L71: [PHASE 12] Interlocking Center-Barrel Split-Tubing Stainless Joining Ring
  // (Lensrentals Sony FE / Lumix S Pro / Canon RF teardown structural centerpiece!)
  // =========================================================================
  const centerJoinGroup = new THREE.Group();
  {
    const joinRing = createLensCellRing(34.8, 39.2, 5.2, mats.mountStainlessFlange, 48);
    centerJoinGroup.add(joinRing);

    // Stepped front & rear spigot lips locking front and rear barrels coaxially within +/- 4 um!
    const frontSpigot = createLensCellRing(35.6, 37.8, 1.8, mats.stainlessMachined, 48);
    frontSpigot.position.z = 3.2;
    const rearSpigot = createLensCellRing(35.6, 37.8, 1.8, mats.stainlessMachined, 48);
    rearSpigot.position.z = -3.2;
    centerJoinGroup.add(frontSpigot, rearSpigot);

    // 3 precision alignment dowel pins + 6 radial thread-locked M2.0 perimeter fasteners
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const bolt = createPrecisionScrew(0.95, 0.45, 2.6, mats.titaniumRivet);
      bolt.position.set(Math.cos(a) * 39.4, Math.sin(a) * 39.4, 0);
      bolt.rotation.z = a - Math.PI / 2;
      bolt.rotation.x = Math.PI / 2;
      centerJoinGroup.add(bolt);

      if (i % 2 === 0) {
        const dowel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.85, 0.85, 7.6, 12).rotateX(Math.PI / 2),
          mats.brassGear
        );
        dowel.position.set(Math.cos(a) * 36.8, Math.sin(a) * 36.8, 0);
        centerJoinGroup.add(dowel);
      }
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-center-join-ring',
      71,
      '#94a3b8',
      centerJoinGroup,
      new THREE.Vector3(0, 0, 79.0),
      new THREE.Vector3(0, 96, 12),
      new THREE.Vector3(0, 102, 368),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L72: [PHASE 12] XD Linear-Motor Coil-Over-Core Mechanical Stainless C-Clamp Retainers (x4)
  // =========================================================================
  const xdClampGroup = new THREE.Group();
  {
    const clampAngles = [45, 135, 225, 315];
    clampAngles.forEach((deg, idx) => {
      const a = THREE.MathUtils.degToRad(deg);
      const cz = idx < 2 ? 12.0 : -11.5; // Front Group A XD pair & Rear Group B XD pair
      const cGrp = new THREE.Group();
      cGrp.position.set(Math.cos(a) * 31.8, Math.sin(a) * 31.8, cz);
      cGrp.rotation.z = a;

      // Non-magnetic SUS304 mechanical C-clamp straddling XD actuator copper coil bobbin
      const topStrap = new THREE.Mesh(new THREE.BoxGeometry(4.8, 7.6, 10.4), mats.mountStainlessFlange);
      const cheek1 = new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.4, 10.4), mats.stainlessMachined);
      cheek1.position.set(-1.4, 3.6, 0);
      const cheek2 = new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.4, 10.4), mats.stainlessMachined);
      cheek2.position.set(-1.4, -3.6, 0);
      cGrp.add(topStrap, cheek1, cheek2);

      for (const sz of [-3.4, 3.4]) {
        const scr = createPrecisionScrew(0.72, 0.32, 1.6, mats.titaniumRivet);
        scr.rotation.y = Math.PI / 2;
        scr.position.set(2.55, 0, sz);
        cGrp.add(scr);
      }
      xdClampGroup.add(cGrp);
    });
  }
  parts.push(
    finalizeLensPart(
      'lens-xd-coil-clamps',
      72,
      '#d97706',
      xdClampGroup,
      new THREE.Vector3(0, 0, 74.0),
      new THREE.Vector3(88, 72, -16),
      new THREE.Vector3(96, 76, 352),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L73: [PHASE 12] Focus-Ring Stainless Ball-Bearing Roller Cage & Spanner Preload Nut
  // =========================================================================
  const clutchBallsGroup = new THREE.Group();
  {
    // Low-friction POM ball retainer cage ring holding 18 precision stainless bearing balls
    const cage = createLensCellRing(37.4, 39.8, 2.4, mats.pomGear, 48);
    clutchBallsGroup.add(cage);

    const ballGeo = new THREE.SphereGeometry(0.92, 12, 10);
    const ballInst = new THREE.InstancedMesh(ballGeo, mats.stainlessMachined, 18);
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 38.6, Math.sin(a) * 38.6, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      ballInst.setMatrixAt(i, dummy.matrix);
    }
    ballInst.instanceMatrix.needsUpdate = true;
    clutchBallsGroup.add(ballInst);

    // Brass 4-notch spanner-wrench preload tensioning nut adjusting silky MF ring torque!
    const spannerNut = createSpannerRingGroup(
      36.8,
      40.2,
      1.6,
      mats.brassGear,
      mats.matteBlackAnodized,
      undefined,
      4
    );
    spannerNut.position.z = -2.2;
    clutchBallsGroup.add(spannerNut);
  }
  parts.push(
    finalizeLensPart(
      'lens-clutch-ball-rollers',
      73,
      '#eab308',
      clutchBallsGroup,
      new THREE.Vector3(0, 0, 96.5),
      new THREE.Vector3(0, -104, 126),
      new THREE.Vector3(0, -108, 434),
      cp,
      0.24
    )
  );

  // =========================================================================
  // L74: [PHASE 12] Rear Fixed 36×24mm Rectangular Stray-Light Trap Cone & Flocked Baffle Tube
  // =========================================================================
  const rearLightTrapGroup = new THREE.Group();
  {
    // Cylindrical outer flocked stray-light trap barrel immediately behind rear element E14
    const outerCone = createLensCellRing(22.2, 25.6, 7.6, mats.velvetFlockTrap, 42);
    rearLightTrapGroup.add(outerCone);

    // 36×24mm full-frame rectangular flare-cutter knife-edge rear mask (blocks 41% stray circle light!)
    const maskShape = new THREE.Shape();
    maskShape.absarc(0, 0, 24.8, 0, Math.PI * 2, false);
    const hw = 18.8;
    const hh = 12.6;
    const rectHole = new THREE.Path();
    rectHole.moveTo(-hw, -hh);
    rectHole.lineTo(hw, -hh);
    rectHole.lineTo(hw, hh);
    rectHole.lineTo(-hw, hh);
    rectHole.closePath();
    maskShape.holes.push(rectHole);

    const rectMask = new THREE.Mesh(
      extrudeCentered(maskShape, 0.95, 0.08, 0.16, 40),
      mats.velvetFlockTrap
    );
    rectMask.position.z = -3.8;
    rearLightTrapGroup.add(rectMask);

    // 4 stepped internal sawtooth anti-reflection light-trap rings
    for (let i = 0; i < 4; i++) {
      const bz = -2.0 + i * 1.85;
      const rib = new THREE.Mesh(
        new THREE.TorusGeometry(22.0, 0.35, 8, 36),
        mats.matteBlackAnodized
      );
      rib.position.z = bz;
      rib.userData.noEdges = true;
      rearLightTrapGroup.add(rib);
    }
  }
  parts.push(
    finalizeLensPart(
      'lens-rear-lighttrap-tube',
      74,
      '#0f172a',
      rearLightTrapGroup,
      new THREE.Vector3(0, 0, 39.2),
      new THREE.Vector3(0, 0, -214),
      new THREE.Vector3(0, 0, 212),
      cp,
      0.26
    )
  );

  // =========================================================================
  // Synchronized Live Kinematic Rig driven directly by LensOpticalSim!
  // =========================================================================
  const focusGroupAParts = [focusAFrontPart, focusGroupAPart, focusARearPart, focusAEccPart];
  const focusGroupBParts = [focusBFrontPart, focusGroupBPart, focusBEccPart];

  // Tag all 26 rigid kinematic bone nodes for GPU SubPartRigidBoneMegaBatcher!
  for (const b of irisBlades) b.userData.kinematicBone = true;
  irisCamRotor.userData.kinematicBone = true;
  irisSpurGear.userData.kinematicBone = true;
  irisPinionGear.userData.kinematicBone = true;
  apRingRotor.userData.kinematicBone = true;
  apertureHallRotor.userData.kinematicBone = true;
  focusRingRotor.userData.kinematicBone = true;
  mfEncoderWheel.userData.kinematicBone = true;
  for (const m of moverCarriages) m.userData.kinematicBone = true;
  for (const sc of mrScaleCarriages) sc.userData.kinematicBone = true;

  const rig: LensDynamicRig = {
    irisBlades,
    irisCamRing: irisCamRotor,
    irisPinionGear,
    irisSpurGear,
    focusGroupAParts,
    focusGroupBParts,
    moverCarriages,
    mrScaleCarriages,
    focusRingMesh: focusRingRotor,
    apertureRingMesh: apRingRotor,
    mfEncoderWheel,
    apertureHallRotor,
    applyDynamics: (sim, explodeFactor, integrated) => {
      const iris = sim.getIrisMetrics();
      const strokes = sim.getFloatingStrokes();

      // 11-blade circular iris closure (F1.2 -> F16) + Cam + Stepper Gear Train + Aperture Ring + Hall Rotor
      const closure = iris.closure01;
      const bladeSwingRad = closure * 0.48;
      for (const pivot of irisBlades) {
        pivot.rotation.z = (pivot.userData.baseAngle as number) + bladeSwingRad;
      }
      irisCamRotor.rotation.z = closure * 0.26;
      irisSpurGear.rotation.z = -closure * 2.2;
      irisPinionGear.rotation.z = closure * 3.8;
      apRingRotor.rotation.z = closure * 0.36;
      apertureHallRotor.rotation.z = closure * 0.36;

      // Floating Focus Group A & B differential linear translation (real Snell floating curves!)
      // Scaled cleanly to stay inside mechanical clearances in both assembled & exploded views
      const strokeA = strokes.dzA * 0.72;
      const strokeB = strokes.dzB * 0.72;

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

      // Synchronize all 4 SmFeN magnetic Vernier scale bars (L66) live with Focus Group A & B!
      for (const sc of mrScaleCarriages) {
        const gIdx = sc.userData.groupIndex as number;
        const baseZ = sc.userData.baseZ as number;
        sc.position.z = baseZ + (gIdx === 0 ? strokeA : strokeB);
      }

      // Linear-Response MF Focus Ring & 2,048 PPR Optical Slotted Encoder rotation
      focusRingRotor.rotation.z = sim.focusT * 0.55;
      mfEncoderWheel.rotation.z = sim.focusT * 0.85;
    },
  };

  // Assign canonical 3-section lightweight standalone partition across macro lens parts
  for (const p of parts) {
    p.lensSection = getLensSectionForPart(p.id);
  }

  return { parts, rig };
}

export async function buildLensStandaloneParts(mats: MaterialLibrary): Promise<CadPart[]> {
  // Phase 18A (24) + Phase 19A (30) = 54 standalone-only 50mm F1.2 GM micro-parts (L75–L128)
  const [mMicro, mSplit] = await Promise.all([
    import('./lensMicroParts'),
    import('./lensUltraSplitParts'),
  ]);
  const extra = [...mMicro.buildLensMicroParts(mats), ...mSplit.buildLensUltraSplitParts(mats)];
  for (const p of extra) {
    p.lensSection = getLensSectionForPart(p.id);
  }
  return extra;
}
