import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createEmiFingerRingGroup,
  createFrameShape,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';

export interface MountDynamicRig {
  lockPinPlunger: THREE.Group;
  releaseButtonGroup: THREE.Group;
  rockerLever: THREE.Mesh;
  applyDynamics: (elapsed: number, physicsActive: boolean) => void;
}

const BOLT_ANGLES_DEG = [0, 60, 120, 180, 240, 300];
const BOLT_PITCH_R = 31.3;
const LUG_ANGLES_DEG = [42, 132, 225, 312];
const LOCK_PIN_ANGLE_RAD = THREE.MathUtils.degToRad(-24);
const LOCK_PIN_R = 30.8;

function createRingShape(outerR: number, innerR: number): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

function createArcSectorShape(
  rInner: number,
  rOuter: number,
  aStart: number,
  aEnd: number
): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOuter, aStart, aEnd, false);
  s.absarc(0, 0, rInner, aEnd, aStart, true);
  s.closePath();
  return s;
}

function finalizeMountPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  integratedExplodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.24
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

  return {
    id,
    subsystem: 'mount',
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
 * Build all 21 ultra-detailed CAD sub-assemblies of a 2024-2026 Flagship Large-Diameter
 * Mirrorless Lens Mount (55mm inner diameter, 6-bolt reinforced stainless bayonet flange,
 * CuBe2 360° ESD ground fingers, 4-leaf clamping springs, 60° stop wedge, calibration shims,
 * decoupled lock-pin + release actuator + mechanical lock-detect switch, 12-pin pogo block +
 * internal biased spring cores + ESD PCB, upper anti-stray dust trap ridge, stepped velvet baffles,
 * clip-in rear filter seat, 36x24mm flare mask, 6x helicoils, magnesium throat, AF-assist/tally LED,
 * and structural chassis interface).
 */
export function buildMountParts(
  mats: MaterialLibrary,
  _includeStandalone = true
): { parts: CadPart[]; rig: MountDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const boltHoleCoords: Array<[number, number, number]> = BOLT_ANGLES_DEG.map((deg) => {
    const a = THREE.MathUtils.degToRad(deg);
    return [Math.cos(a) * BOLT_PITCH_R, Math.sin(a) * BOLT_PITCH_R, 1.55];
  });
  const lockPinX = Math.cos(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;
  const lockPinY = Math.sin(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;

  // =========================================================================
  // M01: CNC Hardened Stainless Steel 55mm Large-Diameter Bayonet Flange Ring
  // =========================================================================
  const flangeGroup = new THREE.Group();
  {
    const ringShape = createRingShape(34.4, 27.5);
    addCircleHoles(ringShape, [
      ...boltHoleCoords,
      [lockPinX, lockPinY, 1.75],
    ]);
    const ringMesh = new THREE.Mesh(
      extrudeCentered(ringShape, 2.7, 0.22, 0.2, 64),
      mats.mountStainlessFlange
    );
    flangeGroup.add(ringMesh);

    const outerLip = new THREE.Mesh(
      extrudeCentered(createRingShape(35.0, 33.4), 1.3, 0.14, 0.14, 64),
      mats.mountStainlessFlange
    );
    outerLip.position.z = -0.65;
    flangeGroup.add(outerLip);

    for (const deg of LUG_ANGLES_DEG) {
      const a0 = THREE.MathUtils.degToRad(deg - 22);
      const a1 = THREE.MathUtils.degToRad(deg + 22);
      const lugShape = createArcSectorShape(24.8, 27.8, a0, a1);
      const lug = new THREE.Mesh(
        extrudeCentered(lugShape, 1.45, 0.12, 0.12, 24),
        mats.mountStainlessFlange
      );
      lug.position.z = 0.55;
      flangeGroup.add(lug);
    }

    // Red Anodized Circular Lens Mounting Index Dot at 12 o'clock (strictly ZERO text!)
    const indexRecess = new THREE.Mesh(
      new THREE.CylinderGeometry(1.55, 1.55, 0.35, 24).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    indexRecess.position.set(0, 31.3, 1.32);
    const indexDot = new THREE.Mesh(
      new THREE.CylinderGeometry(1.22, 1.22, 0.42, 24).rotateX(Math.PI / 2),
      mats.mountRedIndexDot
    );
    indexDot.position.set(0, 31.3, 1.38);
    indexDot.userData.noEdges = true;
    flangeGroup.add(indexRecess, indexDot);
  }
  parts.push(
    finalizeMountPart(
      'mount-flange-ring',
      1,
      '#cbd5e1',
      flangeGroup,
      new THREE.Vector3(0, 0, 30.6),
      new THREE.Vector3(0, 0, 72),
      new THREE.Vector3(0, 0, 196),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M02: 6-Point High-Tensile Stainless Mounting Bolts & Thread-Lock Collars
  // =========================================================================
  const boltsGroup = new THREE.Group();
  {
    for (const [bx, by] of boltHoleCoords) {
      const bolt = createPrecisionScrew(2.25, 0.72, 6.2, mats.stainlessMachined);
      bolt.position.set(bx, by, 0.15);
      boltsGroup.add(bolt);

      const lockBand = new THREE.Mesh(
        new THREE.CylinderGeometry(1.22, 1.22, 2.4, 16).rotateX(Math.PI / 2),
        mats.mountThreadLockBlue
      );
      lockBand.position.set(bx, by, -4.1);
      lockBand.userData.noEdges = true;
      boltsGroup.add(lockBand);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-bolts-6x',
      2,
      '#0284c7',
      boltsGroup,
      new THREE.Vector3(0, 0, 32.0),
      new THREE.Vector3(0, 0, 90),
      new THREE.Vector3(0, 0, 214),
      cp,
      0.22
    )
  );

  // =========================================================================
  // M03: Dual-Lip High-Elasticity EPDM Dust & Weather-Seal Mount Gasket
  // =========================================================================
  const gasketGroup = new THREE.Group();
  {
    const baseSeal = new THREE.Mesh(
      extrudeCentered(createRingShape(35.6, 33.1), 1.35, 0.16, 0.16, 64),
      mats.epdmGasket
    );
    gasketGroup.add(baseSeal);

    for (const [rLip, zLip] of [
      [35.25, 0.65],
      [33.75, 0.58],
    ]) {
      const lip = new THREE.Mesh(new THREE.TorusGeometry(rLip, 0.36, 12, 64), mats.epdmGasket);
      lip.position.z = zLip;
      lip.userData.noEdges = true;
      gasketGroup.add(lip);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-weather-gasket',
      3,
      '#374151',
      gasketGroup,
      new THREE.Vector3(0, 0, 29.0),
      new THREE.Vector3(0, 0, 58),
      new THREE.Vector3(0, 0, 180),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M04: 360° Beryllium-Copper Multi-Finger EMI/ESD Chassis Grounding Ring
  // =========================================================================
  const esdRingGroup = new THREE.Group();
  {
    const fingerRing = createEmiFingerRingGroup(30.4, 33.0, 12, mats.beCuSpring);
    esdRingGroup.add(fingerRing);
    // 2 alignment locating notches on inner edge
    for (const deg of [90, 270]) {
      const a = THREE.MathUtils.degToRad(deg);
      const tab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 0.32), mats.beCuSpring);
      tab.position.set(Math.cos(a) * 29.8, Math.sin(a) * 29.8, 0);
      tab.rotation.z = a;
      esdRingGroup.add(tab);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-esd-ground-clips',
      4,
      '#d97706',
      esdRingGroup,
      new THREE.Vector3(0, 0, 28.55),
      new THREE.Vector3(0, 0, 48),
      new THREE.Vector3(0, 0, 170),
      cp,
      0.22
    )
  );

  // =========================================================================
  // M05: 4-Leaf Pre-Tensioned Spring-Steel Bayonet Clamping Ring
  // =========================================================================
  const springsGroup = new THREE.Group();
  {
    const baseRingShape = createRingShape(30.4, 27.6);
    const baseRing = new THREE.Mesh(
      extrudeCentered(baseRingShape, 0.52, 0.05, 0.05, 56),
      mats.mountSpringSteel
    );
    springsGroup.add(baseRing);

    for (const deg of LUG_ANGLES_DEG) {
      const rad = THREE.MathUtils.degToRad(deg);
      const leafGroup = new THREE.Group();
      leafGroup.rotation.z = rad;

      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 14; i++) {
        const u = i / 14;
        const a = THREE.MathUtils.lerp(-0.34, 0.34, u);
        const r = 26.2;
        const bowZ = Math.sin(u * Math.PI) * 1.15;
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, bowZ));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.42, 8, false);
      tubeGeo.scale(1, 1, 0.55);
      const leafMesh = new THREE.Mesh(tubeGeo, mats.mountSpringSteel);
      leafMesh.userData.noEdges = true;
      leafGroup.add(leafMesh);

      const tab = new THREE.Mesh(
        extrudeCentered(createArcSectorShape(25.8, 28.0, -0.36, -0.26), 0.5, 0.04, 0.04, 10),
        mats.mountSpringSteel
      );
      leafGroup.add(tab);
      springsGroup.add(leafGroup);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-leaf-springs',
      5,
      '#b45309',
      springsGroup,
      new THREE.Vector3(0, 0, 28.0),
      new THREE.Vector3(0, 0, 38),
      new THREE.Vector3(0, 0, 160),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M06: Hardened Steel 60° Bayonet Rotation End-Stop Wedge & Dowel Block
  // =========================================================================
  const stopBlockGroup = new THREE.Group();
  {
    const stopAngle = THREE.MathUtils.degToRad(154);
    const sx = Math.cos(stopAngle) * 26.7;
    const sy = Math.sin(stopAngle) * 26.7;

    const sub = new THREE.Group();
    sub.position.set(sx, sy, 0);
    sub.rotation.z = stopAngle;

    // Stepped hardened HRC58 shear stop wedge protruding cleanly into bayonet slot
    const wedge = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.4, 2.5), mats.titaniumRivet);
    const flangeTab = new THREE.Mesh(new THREE.BoxGeometry(5.2, 6.2, 1.0), mats.stainlessMachined);
    flangeTab.position.set(1.2, 0, -1.35);

    // Dual shear dowel pins & M1.6 locking screw anchoring stop block to throat
    const dowelPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 4.4, 16).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    dowelPin.position.set(1.8, -1.6, -2.0);
    const stopScrew = createPrecisionScrew(1.05, 0.45, 2.8, mats.stainlessMachined);
    stopScrew.position.set(1.8, 1.6, -0.8);

    // Impact chamfer wear-face highlight strip
    const wearFace = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.36, 2.2), mats.matteBlackAnodized);
    wearFace.position.set(-0.2, 2.22, 0.1);

    sub.add(wedge, flangeTab, dowelPin, stopScrew, wearFace);
    stopBlockGroup.add(sub);
  }
  parts.push(
    finalizeMountPart(
      'mount-bayonet-stop-block',
      6,
      '#94a3b8',
      stopBlockGroup,
      new THREE.Vector3(0, 0, 28.2),
      new THREE.Vector3(-24, 14, 46),
      new THREE.Vector3(-24, 14, 168),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M07: Sub-Micron Flange Focal Distance Calibration Shim Set (3 Color-Coded Foils)
  // =========================================================================
  const shimsGroup = new THREE.Group();
  {
    const shimSpecs: Array<{
      z: number;
      thick: number;
      mat: THREE.Material;
      tabAngleDeg: number;
    }> = [
      { z: 0.42, thick: 0.16, mat: mats.stainlessMachined, tabAngleDeg: 102 },
      { z: 0.0, thick: 0.22, mat: mats.brassGear, tabAngleDeg: 78 },
      { z: -0.46, thick: 0.28, mat: mats.mountShimBlue, tabAngleDeg: 146 },
    ];

    for (const s of shimSpecs) {
      const shimShape = createRingShape(33.5, 28.6);
      addCircleHoles(shimShape, boltHoleCoords);
      const shimMesh = new THREE.Mesh(
        extrudeCentered(shimShape, s.thick, 0, 0, 56),
        s.mat
      );
      shimMesh.position.z = s.z;
      shimsGroup.add(shimMesh);

      const a = THREE.MathUtils.degToRad(s.tabAngleDeg);
      const tab = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.2, s.thick), s.mat);
      tab.position.set(Math.cos(a) * 34.4, Math.sin(a) * 34.4, s.z);
      tab.rotation.z = a;
      shimsGroup.add(tab);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-calib-shims',
      7,
      '#2563eb',
      shimsGroup,
      new THREE.Vector3(0, 0, 27.1),
      new THREE.Vector3(0, 0, 28),
      new THREE.Vector3(0, 0, 150),
      cp,
      0.22
    )
  );

  // =========================================================================
  // M08: Hardened Steel Lens Lock Pin, Brass Guide Bushing & Return Spring
  // =========================================================================
  const lockPinGroup = new THREE.Group();
  const lockPinPlunger = new THREE.Group();
  {
    const sleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.2, 5.4, 24).rotateX(Math.PI / 2),
      mats.brassGear
    );
    sleeve.position.set(lockPinX, lockPinY, -1.0);
    lockPinGroup.add(sleeve);

    lockPinPlunger.position.set(lockPinX, lockPinY, 0.8);
    const pinShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.48, 1.48, 7.6, 24).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    pinShaft.position.z = 0.2;
    const pinTip = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.48, 1.2, 24).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    pinTip.position.z = 4.6;
    const pinCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.1, 0.7, 20).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    pinCollar.position.z = -3.4;
    lockPinPlunger.add(pinShaft, pinTip, pinCollar);
    lockPinGroup.add(lockPinPlunger);

    const spring = new THREE.Mesh(
      createHelicalSpringGeometry(1.75, 4.6, 6, 0.24),
      mats.stainlessMachined
    );
    spring.position.set(lockPinX, lockPinY, -5.8);
    spring.userData.noEdges = true;
    lockPinGroup.add(spring);
  }
  parts.push(
    finalizeMountPart(
      'mount-lock-pin',
      8,
      '#ef4444',
      lockPinGroup,
      new THREE.Vector3(0, 0, 27.2),
      new THREE.Vector3(18, -4, 44),
      new THREE.Vector3(22, -4, 168),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M09: Front Lens-Release Push Button, EPDM O-Ring & Rocker Lever Actuator
  // =========================================================================
  const releaseActuatorGroup = new THREE.Group();
  const releaseButtonGroup = new THREE.Group();
  let rockerLever!: THREE.Mesh;
  {
    const pivotPost = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 3.6, 18),
      mats.stainlessMachined
    );
    pivotPost.position.set(lockPinX + 5.8, lockPinY, -3.6);
    releaseActuatorGroup.add(pivotPost);

    rockerLever = new THREE.Mesh(new THREE.BoxGeometry(12.2, 3.2, 1.15), mats.linkArmSteel);
    rockerLever.position.set(lockPinX + 5.6, lockPinY, -3.5);
    releaseActuatorGroup.add(rockerLever);

    const btnX = lockPinX + 11.2;
    const btnY = lockPinY;
    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(4.6, 5.0, 2.2, 28).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    collar.position.set(btnX, btnY, 0.4);
    releaseActuatorGroup.add(collar);

    const oRing = new THREE.Mesh(new THREE.TorusGeometry(3.85, 0.35, 10, 28), mats.epdmGasket);
    oRing.position.set(btnX, btnY, 1.35);
    oRing.userData.noEdges = true;
    releaseActuatorGroup.add(oRing);

    releaseButtonGroup.position.set(btnX, btnY, 2.2);
    const btnCap = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.7, 2.6, 28).rotateX(Math.PI / 2),
      mats.evfHousingMg
    );
    const btnStem = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 6.0, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    btnStem.position.z = -3.4;
    for (let i = -2; i <= 2; i++) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.28, 0.28), mats.matteBlackAnodized);
      ridge.position.set(0, i * 0.95, 1.32);
      ridge.userData.noEdges = true;
      releaseButtonGroup.add(ridge);
    }
    releaseButtonGroup.add(btnCap, btnStem);
    releaseActuatorGroup.add(releaseButtonGroup);
  }
  parts.push(
    finalizeMountPart(
      'mount-release-actuator',
      9,
      '#f97316',
      releaseActuatorGroup,
      new THREE.Vector3(0, 0, 27.2),
      new THREE.Vector3(36, -8, 56),
      new THREE.Vector3(40, -8, 180),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M10: Mechanical Bayonet Lock-End Micro-Leaf Detection Switch (US8029199B1)
  // =========================================================================
  const detectSwitchGroup = new THREE.Group();
  let detectWiperBlade!: THREE.Mesh;
  {
    const swX = lockPinX + 0.4;
    const swY = lockPinY - 5.4;

    // Molded PPS micro-switch housing seated directly under lock-pin tail
    const swHousing = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.4, 2.4), mats.mountPpsInsulator);
    swHousing.position.set(swX, swY, -3.2);
    detectSwitchGroup.add(swHousing);

    // Fixed gold stationary contact post
    const fixedContact = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.6, 0.5), mats.goldPlating);
    fixedContact.position.set(swX - 1.6, swY + 1.8, -3.2);
    detectSwitchGroup.add(fixedContact);

    // Actuated gold-plated dual-wiper leaf spring blade triggered by lock pin motion!
    detectWiperBlade = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.26, 1.1), mats.beCuSpring);
    detectWiperBlade.position.set(swX + 0.2, swY + 2.2, -3.2);
    detectSwitchGroup.add(detectWiperBlade);

    // Micro-plunger nub contacting lock-pin collar
    const plunger = new THREE.Mesh(
      new THREE.CylinderGeometry(0.58, 0.58, 1.6, 12),
      mats.stainlessMachined
    );
    plunger.position.set(swX + 0.2, swY + 3.0, -3.2);
    detectSwitchGroup.add(plunger);

    // 2-pin polyimide micro-FPC jumper routing toward ESD contact PCB
    const fpcTail = new THREE.Mesh(new THREE.BoxGeometry(2.6, 6.2, 0.24), mats.polyimideFpc);
    fpcTail.position.set(swX - 1.0, swY - 4.5, -3.6);
    fpcTail.rotation.z = -0.35;
    const goldPad = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 0.3), mats.goldPlating);
    goldPad.position.set(swX - 2.0, swY - 7.2, -3.6);
    goldPad.rotation.z = -0.35;
    detectSwitchGroup.add(fpcTail, goldPad);
  }
  parts.push(
    finalizeMountPart(
      'mount-lens-detect-switch',
      10,
      '#14b8a6',
      detectSwitchGroup,
      new THREE.Vector3(0, 0, 27.0),
      new THREE.Vector3(26, -18, 24),
      new THREE.Vector3(28, -18, 148),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M11: 12-Pin Gold-Plated Spring-Loaded Pogo Contact Block (High-Speed Bus)
  // =========================================================================
  const contactsGroup = new THREE.Group();
  {
    const aStart = THREE.MathUtils.degToRad(-128);
    const aEnd = THREE.MathUtils.degToRad(-52);
    const blockShape = createArcSectorShape(22.8, 27.2, aStart, aEnd);
    const blockMesh = new THREE.Mesh(
      extrudeCentered(blockShape, 3.6, 0.2, 0.2, 36),
      mats.mountPpsInsulator
    );
    contactsGroup.add(blockMesh);

    for (const ea of [aStart - 0.06, aEnd + 0.06]) {
      const ex = Math.cos(ea) * 26.8;
      const ey = Math.sin(ea) * 26.8;
      const ear = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.1, 1.4, 16).rotateX(Math.PI / 2),
        mats.mountPpsInsulator
      );
      ear.position.set(ex, ey, -0.9);
      const scr = createPrecisionScrew(0.95, 0.45, 1.8, mats.stainlessMachined);
      scr.position.set(ex, ey, -0.2);
      contactsGroup.add(ear, scr);
    }

    const pinCount = 12;
    for (let i = 0; i < pinCount; i++) {
      const t = i / (pinCount - 1);
      const a = THREE.MathUtils.lerp(
        THREE.MathUtils.degToRad(-123),
        THREE.MathUtils.degToRad(-57),
        t
      );
      const rPin = 25.0;
      const px = Math.cos(a) * rPin;
      const py = Math.sin(a) * rPin;
      const zExtra = i === 0 ? 0.35 : i === pinCount - 1 ? -0.25 : 0;

      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.68, 0.68, 4.4, 16).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      barrel.position.set(px, py, 0.1 + zExtra * 0.4);
      contactsGroup.add(barrel);

      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.66, 14, 10), mats.goldPlating);
      tip.position.set(px, py, 2.3 + zExtra);
      tip.userData.noEdges = true;
      contactsGroup.add(tip);

      const tail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.36, 1.6, 10).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      tail.position.set(px, py, -2.5);
      tail.userData.noEdges = true;
      contactsGroup.add(tail);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-contact-pins',
      11,
      '#eab308',
      contactsGroup,
      new THREE.Vector3(0, 0, 26.4),
      new THREE.Vector3(0, -18, 36),
      new THREE.Vector3(0, -18, 158),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M12: 12x Beryllium-Copper Pogo-Pin Micro-Helical Springs & Biased Plunger Cores
  // =========================================================================
  const pogoSpringsGroup = new THREE.Group();
  {
    const aStart = THREE.MathUtils.degToRad(-125);
    const aEnd = THREE.MathUtils.degToRad(-55);
    // Thin insulating spring-retainer carrier bar holding all 12 micro-springs in registration
    const retainer = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(24.1, 25.9, aStart, aEnd), 0.42, 0.04, 0.04, 32),
      mats.mountPpsInsulator
    );
    retainer.position.z = -1.25;
    pogoSpringsGroup.add(retainer);

    for (let i = 0; i < 12; i++) {
      const a = THREE.MathUtils.lerp(
        THREE.MathUtils.degToRad(-123),
        THREE.MathUtils.degToRad(-57),
        i / 11
      );
      const px = Math.cos(a) * 25.0;
      const py = Math.sin(a) * 25.0;

      // Micro CuBe2 compression coil spring coaxially nested behind pogo barrel
      const microSpring = new THREE.Mesh(
        createHelicalSpringGeometry(0.46, 2.1, 6, 0.09),
        mats.beCuSpring
      );
      microSpring.position.set(px, py, -0.2);
      microSpring.userData.noEdges = true;
      pogoSpringsGroup.add(microSpring);

      // Slanted bias-ball low-resistance plunger core seat
      const biasCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 0.9, 10).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      biasCore.position.set(px, py, 1.1);
      biasCore.rotation.x = 0.22; // Biased side-force bevel
      biasCore.userData.noEdges = true;
      pogoSpringsGroup.add(biasCore);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-pogo-springs-core',
      12,
      '#f59e0b',
      pogoSpringsGroup,
      new THREE.Vector3(0, 0, 25.1),
      new THREE.Vector3(0, -25, 24),
      new THREE.Vector3(0, -25, 146),
      cp,
      0.22
    )
  );

  // =========================================================================
  // M13: Lens Interface Rigid-Flex PCB, ±15kV ESD TVS Array & Shielded FPC
  // =========================================================================
  const contactPcbGroup = new THREE.Group();
  {
    const aStart = THREE.MathUtils.degToRad(-127);
    const aEnd = THREE.MathUtils.degToRad(-53);
    const pcbShape = createArcSectorShape(22.6, 28.4, aStart, aEnd);
    const pcbMesh = new THREE.Mesh(
      extrudeCentered(pcbShape, 1.15, 0.08, 0.08, 36),
      mats.hdiMainboardPcb
    );
    contactPcbGroup.add(pcbMesh);

    for (let i = 0; i < 12; i++) {
      const a = THREE.MathUtils.lerp(
        THREE.MathUtils.degToRad(-123),
        THREE.MathUtils.degToRad(-57),
        i / 11
      );
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 0.16, 12).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      pad.position.set(Math.cos(a) * 25.0, Math.sin(a) * 25.0, 0.62);
      pad.userData.noEdges = true;
      contactPcbGroup.add(pad);
    }

    for (const sx of [-5.8, 5.8]) {
      const tvs = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.2, 0.78), mats.icEpoxy);
      tvs.position.set(sx, -25.2, -0.92);
      tvs.rotation.z = sx < 0 ? -0.22 : 0.22;
      contactPcbGroup.add(tvs);
    }

    const mosfet = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.0, 0.9), mats.icEpoxy);
    mosfet.position.set(0, -25.6, -0.96);
    contactPcbGroup.add(mosfet);

    for (const sx of [-11.4, 11.4]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 0.85), mats.tantalumCapYellow);
      cap.position.set(sx, -23.0, -0.92);
      cap.rotation.z = sx < 0 ? -0.45 : 0.45;
      contactPcbGroup.add(cap);
    }

    const fpcDrop = new THREE.Mesh(new THREE.BoxGeometry(10.8, 5.4, 0.3), mats.polyimideFpc);
    fpcDrop.position.set(0, -29.8, -0.4);
    const fpcSweep = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.3, 14.0), mats.polyimideFpc);
    fpcSweep.position.set(0, -32.4, -7.2);
    const fpcShield = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.36, 10.0), mats.emiShieldFilm);
    fpcShield.position.set(0, -32.4, -6.8);
    const fpcGoldEnd = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.38, 2.0), mats.goldPlating);
    fpcGoldEnd.position.set(0, -32.4, -13.2);
    contactPcbGroup.add(fpcDrop, fpcSweep, fpcShield, fpcGoldEnd);
  }
  parts.push(
    finalizeMountPart(
      'mount-contact-pcb',
      13,
      '#10b981',
      contactPcbGroup,
      new THREE.Vector3(0, 0, 23.2),
      new THREE.Vector3(0, -32, 12),
      new THREE.Vector3(0, -32, 134),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M14: Upper Inner-Mount Anti-Stray Ridge & Electrostatic Micro-Dust Trap Ring
  // =========================================================================
  const dustTrapGroup = new THREE.Group();
  {
    // Upper 150° velvet-flocked anti-stray ridge (Sony a7R VI / a1 II upper throat ridge!)
    const a0 = THREE.MathUtils.degToRad(15);
    const a1 = THREE.MathUtils.degToRad(165);
    const ridgeBase = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(24.4, 26.2, a0, a1), 2.2, 0.06, 0.12, 42),
      mats.velvetFlockTrap
    );
    dustTrapGroup.add(ridgeBase);

    // Stepped double anti-glare overhang teeth along upper arc
    for (const dz of [-0.65, 0.65]) {
      const tooth = new THREE.Mesh(
        extrudeCentered(createArcSectorShape(23.6, 24.6, a0 + 0.08, a1 - 0.08), 0.38, 0.04, 0.08, 36),
        mats.velvetFlockTrap
      );
      tooth.position.z = dz;
      dustTrapGroup.add(tooth);
    }

    // Electrostatic tacky elastomer micro-dust capture liner band recessed behind ridge
    const trapBand = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(25.2, 26.0, a0 + 0.14, a1 - 0.14), 1.4, 0.04, 0.04, 32),
      mats.damperElastomer
    );
    trapBand.position.z = -1.25;
    dustTrapGroup.add(trapBand);
  }
  parts.push(
    finalizeMountPart(
      'mount-dust-trap-ring',
      14,
      '#0f172a',
      dustTrapGroup,
      new THREE.Vector3(0, 0, 26.5),
      new THREE.Vector3(0, 18, 32),
      new THREE.Vector3(0, 18, 154),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M15: Stepped Multi-Knife-Edge Internal Anti-Reflection Light-Trap Ring
  // =========================================================================
  const baffleGroup = new THREE.Group();
  {
    const aStart = THREE.MathUtils.degToRad(-46);
    const aEnd = THREE.MathUtils.degToRad(226);
    const sleeveShape = createArcSectorShape(26.1, 27.6, aStart, aEnd);
    const sleeve = new THREE.Mesh(
      extrudeCentered(sleeveShape, 6.8, 0.08, 0.08, 48),
      mats.mountVelvetBaffle
    );
    baffleGroup.add(sleeve);

    for (let i = 0; i < 5; i++) {
      const bz = -2.6 + i * 1.3;
      const ribShape = createArcSectorShape(24.9, 26.25, aStart, aEnd);
      const rib = new THREE.Mesh(
        extrudeCentered(ribShape, 0.42, 0.04, 0.14, 48),
        mats.mountVelvetBaffle
      );
      rib.position.z = bz;
      baffleGroup.add(rib);
    }

    const rearCollar = new THREE.Mesh(
      extrudeCentered(createRingShape(27.6, 25.4), 1.1, 0.06, 0.06, 56),
      mats.mountVelvetBaffle
    );
    rearCollar.position.z = -3.0;
    baffleGroup.add(rearCollar);
  }
  parts.push(
    finalizeMountPart(
      'mount-anti-refl-baffle',
      15,
      '#18181b',
      baffleGroup,
      new THREE.Vector3(0, 0, 23.8),
      new THREE.Vector3(0, 0, 10),
      new THREE.Vector3(0, 0, 134),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M16: In-Mount Rear Clip-In Optical Filter Precision Seat & 3-Tab Retainer
  // =========================================================================
  const clipinSeatGroup = new THREE.Group();
  {
    // Precision machined matte-black anodized aluminum drop-in filter seat bezel
    const seatShape = createFrameShape(44.2, 31.8, 3.0, 39.2, 26.8, 1.8);
    const seatFrame = new THREE.Mesh(
      extrudeCentered(seatShape, 1.15, 0.08, 0.08, 28),
      mats.matteBlackAnodized
    );
    clipinSeatGroup.add(seatFrame);

    // Semi-transparent optical multi-coated clip-in ND/astro glass element preview
    const filterGlass = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(39.4, 27.0, 1.6), 0.55, 0.04, 0.04, 20),
      mats.sswfGlass
    );
    filterGlass.position.z = 0.05;
    clipinSeatGroup.add(filterGlass);

    // 3 CuBe2 gentle stress-free retaining spring clips around perimeter (top + lower-left/right)
    const tabSpecs: Array<[number, number, number]> = [
      [0, 15.6, 0],
      [-21.4, -10.5, Math.PI / 2],
      [21.4, -10.5, -Math.PI / 2],
    ];
    for (const [tx, ty, rz] of tabSpecs) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(5.4, 1.5, 0.35), mats.beCuSpring);
      clip.position.set(tx, ty, 0.65);
      clip.rotation.z = rz;
      clipinSeatGroup.add(clip);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-clipin-filter-seat',
      16,
      '#06b6d4',
      clipinSeatGroup,
      new THREE.Vector3(0, 0, 21.6),
      new THREE.Vector3(-26, -14, 4),
      new THREE.Vector3(-26, -14, 124),
      cp,
      0.22
    )
  );

  // =========================================================================
  // M17: Precision 36×24mm Full-Frame Rectangular Flare-Cut Baffle Mask
  // =========================================================================
  const flareMaskGroup = new THREE.Group();
  {
    const maskShape = new THREE.Shape();
    maskShape.absarc(0, 0, 28.4, 0, Math.PI * 2, false);

    const apW = 38.6;
    const apH = 26.2;
    const apR = 1.4;
    const hw = apW / 2;
    const hh = apH / 2;
    const hole = new THREE.Path();
    hole.moveTo(-hw + apR, -hh);
    hole.lineTo(hw - apR, -hh);
    hole.absarc(hw - apR, -hh + apR, apR, -Math.PI / 2, 0, false);
    hole.lineTo(hw, hh - apR);
    hole.absarc(hw - apR, hh - apR, apR, 0, Math.PI / 2, false);
    hole.lineTo(-hw + apR, hh);
    hole.absarc(-hw + apR, hh - apR, apR, Math.PI / 2, Math.PI, false);
    hole.lineTo(-hw, -hh + apR);
    hole.absarc(-hw + apR, -hh + apR, apR, Math.PI, Math.PI * 1.5, false);
    maskShape.holes.push(hole);

    const maskMesh = new THREE.Mesh(
      extrudeCentered(maskShape, 1.4, 0.12, 0.25, 48),
      mats.mountVelvetBaffle
    );
    flareMaskGroup.add(maskMesh);

    const innerStep = new THREE.Mesh(
      extrudeCentered(createFrameShape(42.2, 29.8, 2.2, 38.0, 25.6, 1.0), 1.1, 0.06, 0.12, 24),
      mats.matteBlackAnodized
    );
    innerStep.position.z = 0.9;
    flareMaskGroup.add(innerStep);

    for (const deg of [45, 135, 225, 315]) {
      const a = THREE.MathUtils.degToRad(deg);
      const clip = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 1.5), mats.brassGear);
      clip.position.set(Math.cos(a) * 28.0, Math.sin(a) * 28.0, 0);
      clip.rotation.z = a;
      flareMaskGroup.add(clip);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-rect-flare-mask',
      17,
      '#334155',
      flareMaskGroup,
      new THREE.Vector3(0, 0, 20.2),
      new THREE.Vector3(0, 0, -12),
      new THREE.Vector3(0, 0, 114),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M18: 6x High-Tensile Stainless Wire-Thread Helicoil Reinforcement Inserts
  // =========================================================================
  const helicoilGroup = new THREE.Group();
  {
    for (const [bx, by] of boltHoleCoords) {
      // Knurled outer Mg-interface reinforcement bushing
      const bushing = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 5.2, 18, 1, true).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      bushing.position.set(bx, by, 0);
      helicoilGroup.add(bushing);

      // Diamond-wire helical coil thread inside each boss!
      const threadCoil = new THREE.Mesh(
        createHelicalSpringGeometry(1.62, 4.9, 8, 0.2),
        mats.stainlessMachined
      );
      threadCoil.position.set(bx, by, 0);
      threadCoil.userData.noEdges = true;
      helicoilGroup.add(threadCoil);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-helicoil-inserts',
      18,
      '#a8a29e',
      helicoilGroup,
      new THREE.Vector3(0, 0, 24.8),
      new THREE.Vector3(0, 0, 18),
      new THREE.Vector3(0, 0, 142),
      cp,
      0.22
    )
  );

  // =========================================================================
  // M19: High-Rigidity Thixomolded AZ91D Magnesium-Aluminum Mount Box
  // =========================================================================
  const mgThroatGroup = new THREE.Group();
  {
    const bodyShape = createRoundedRectShape(80.0, 68.0, 11.5);
    const bore = new THREE.Path();
    bore.absarc(0, 0, 27.8, 0, Math.PI * 2, true);
    bodyShape.holes.push(bore);
    addCircleHoles(bodyShape, boltHoleCoords);

    const bulkhead = new THREE.Mesh(
      extrudeCentered(bodyShape, 6.2, 0.32, 0.28, 48),
      mats.mountMgBulkhead
    );
    mgThroatGroup.add(bulkhead);

    const collarShape = createRingShape(35.0, 27.8);
    addCircleHoles(collarShape, boltHoleCoords);
    const collar = new THREE.Mesh(
      extrudeCentered(collarShape, 2.2, 0.16, 0.16, 56),
      mats.magnesiumCast
    );
    collar.position.z = 3.2;
    mgThroatGroup.add(collar);

    // Note: 6x Helicoil inserts are now decoupled into dedicated part M18 (mount-helicoil-inserts)

    for (const deg of [25, 50, 130, 155, 205, 230, 310, 335]) {
      const a = THREE.MathUtils.degToRad(deg);
      const rib = new THREE.Mesh(new THREE.BoxGeometry(8.5, 2.0, 4.6), mats.mountMgBulkhead);
      rib.position.set(Math.cos(a) * 37.5, Math.sin(a) * 33.2, 0.6);
      rib.rotation.z = a;
      mgThroatGroup.add(rib);
    }

    const btnBoss = new THREE.Mesh(
      new THREE.CylinderGeometry(5.6, 6.0, 5.8, 24).rotateX(Math.PI / 2),
      mats.mountMgBulkhead
    );
    btnBoss.position.set(lockPinX + 11.2, lockPinY, 1.2);
    mgThroatGroup.add(btnBoss);

    for (const [cx, cy] of [
      [-34.5, 28.5],
      [34.5, 28.5],
      [-34.5, -28.5],
      [34.5, -28.5],
    ]) {
      const earBolt = createPrecisionScrew(1.85, 0.6, 2.4, mats.stainlessMachined);
      earBolt.position.set(cx, cy, 3.3);
      mgThroatGroup.add(earBolt);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-mg-throat',
      19,
      '#64748b',
      mgThroatGroup,
      new THREE.Vector3(0, 0, 23.4),
      new THREE.Vector3(0, 0, -2),
      new THREE.Vector3(0, 0, 124),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M20: Front AF-Assist Fresnel Illuminator & Video REC Tally LED Module
  // =========================================================================
  const afAssistGroup = new THREE.Group();
  const tallyLedMat = new THREE.MeshBasicMaterial({
    clippingPlanes: cp,
    color: 0xe11d48,
  });
  {
    const ax = -32.8;
    const ay = 22.8;
    // Sealed waterproof anodized housing barrel
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.5, 3.8, 24).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    barrel.position.set(ax, ay, 0);
    afAssistGroup.add(barrel);

    // EPDM sealing gasket around optical window
    const seal = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.34, 10, 24), mats.epdmGasket);
    seal.position.set(ax, ay, 1.3);
    seal.userData.noEdges = true;
    afAssistGroup.add(seal);

    // Concentric micro-Fresnel dome lens (illuminated amber/red tally glow!)
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(2.35, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55).rotateX(Math.PI / 2),
      tallyLedMat
    );
    dome.position.set(ax, ay, 1.45);
    dome.userData.noEdges = true;
    dome.userData.dynamicGlow = true;
    afAssistGroup.add(dome);

    // Concentric Fresnel groove rings
    for (const fr of [1.15, 1.82]) {
      const fRing = new THREE.Mesh(new THREE.TorusGeometry(fr, 0.1, 8, 24), mats.evfAntiFogGlass);
      fRing.position.set(ax, ay, 2.55 - fr * 0.25);
      fRing.userData.noEdges = true;
      afAssistGroup.add(fRing);
    }

    // Aluminum MCPCB thermal substrate + flex power lead behind barrel
    const mcpcb = new THREE.Mesh(
      new THREE.CylinderGeometry(3.0, 3.0, 0.8, 20).rotateX(Math.PI / 2),
      mats.hdiMainboardPcb
    );
    mcpcb.position.set(ax, ay, -2.2);
    const flexLead = new THREE.Mesh(new THREE.BoxGeometry(2.4, 7.5, 0.26), mats.polyimideFpc);
    flexLead.position.set(ax, ay - 5.2, -2.5);
    afAssistGroup.add(mcpcb, flexLead);
  }
  parts.push(
    finalizeMountPart(
      'mount-af-assist-module',
      20,
      '#e11d48',
      afAssistGroup,
      new THREE.Vector3(0, 0, 27.0),
      new THREE.Vector3(-32, 22, 26),
      new THREE.Vector3(-32, 22, 150),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M21: Front Structural Chassis Interface Flange, Tripod Struts & Dust Seal
  // =========================================================================
  const interfaceGroup = new THREE.Group();
  {
    const flangeShape = createFrameShape(78.0, 62.0, 6.4, 45.0, 33.0, 3.2);
    const plate = new THREE.Mesh(
      extrudeCentered(flangeShape, 1.5, 0.14, 0.14, 28),
      mats.magnesiumCast
    );
    interfaceGroup.add(plate);

    const dustSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(74.4, 58.4, 5.2, 70.6, 54.6, 4.0), 0.72, 0.08, 0.08, 28),
      mats.epdmGasket
    );
    dustSeal.position.z = -0.9;
    interfaceGroup.add(dustSeal);

    for (const sx of [-1, 1]) {
      const gusset = new THREE.Mesh(new THREE.BoxGeometry(14.0, 8.6, 4.8), mats.mountMgBulkhead);
      gusset.position.set(sx * 24.5, -31.8, 1.2);
      interfaceGroup.add(gusset);

      const footPad = new THREE.Mesh(new THREE.BoxGeometry(16.0, 2.0, 6.2), mats.stainlessMachined);
      footPad.position.set(sx * 24.5, -35.8, 1.2);
      interfaceGroup.add(footPad);
    }

    for (const [dx, dy] of [
      [-33.0, 24.0],
      [33.0, 24.0],
      [-33.0, -24.0],
      [33.0, -24.0],
    ]) {
      const dowel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.15, 1.15, 4.2, 16).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      dowel.position.set(dx, dy, 1.6);
      interfaceGroup.add(dowel);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-chassis-interface',
      21,
      '#475569',
      interfaceGroup,
      new THREE.Vector3(0, 0, 18.6),
      new THREE.Vector3(0, 0, -24),
      new THREE.Vector3(0, 0, 102),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M22: Upper Mount-Box Stainless Stiffening Ridge & Pentaprism Load Tie Bracket
  // =========================================================================
  const upperRidgeGroup = new THREE.Group();
  {
    // Stamped SUS304 stiffening arch riding the 12-o'clock crown of M19 Mg mount box
    const ridgeMain = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(46.0, 7.6, 2.2), 2.4, 0.14, 0.14, 14),
      mats.mountStainlessFlange
    );
    ridgeMain.position.set(0, 34.8, 0);
    upperRidgeGroup.add(ridgeMain);

    // Upward load-transfer gusset bridge tying mount crown into EVF roll-cage & top deck
    const tieBridge = new THREE.Mesh(new THREE.BoxGeometry(24.0, 5.2, 6.4), mats.stainlessMachined);
    tieBridge.position.set(0, 38.2, -2.0);
    upperRidgeGroup.add(tieBridge);

    for (const sx of [-16.0, 0.0, 16.0]) {
      const bolt = createPrecisionScrew(1.25, 0.45, 2.2, mats.stainlessMachined);
      bolt.position.set(sx, 34.8, 1.35);
      upperRidgeGroup.add(bolt);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-upper-ridge',
      22,
      '#94a3b8',
      upperRidgeGroup,
      new THREE.Vector3(0, 0, 24.4),
      new THREE.Vector3(0, 36, 12),
      new THREE.Vector3(0, 38, 134),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M23: Internal Rear-Mount Magnetic Drop-In Clip-Filter Ferromagnetic Keeper Ring
  // =========================================================================
  const magFilterGroup = new THREE.Group();
  {
    const keeperShape = createRingShape(26.8, 23.6);
    const keeper = new THREE.Mesh(
      extrudeCentered(keeperShape, 0.42, 0.04, 0.04, 48),
      mats.matteBlackAnodized
    );
    magFilterGroup.add(keeper);

    // 4 micro magnetic alignment index pads around inner perimeter (non-vignetting!)
    for (const deg of [45, 135, 225, 315]) {
      const a = THREE.MathUtils.degToRad(deg);
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 1.1, 0.55, 14).rotateX(Math.PI / 2),
        mats.neodymiumMagnet
      );
      pad.position.set(Math.cos(a) * 25.2, Math.sin(a) * 25.2, 0.1);
      pad.userData.noEdges = true;
      magFilterGroup.add(pad);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-mag-filter-plate',
      23,
      '#06b6d4',
      magFilterGroup,
      new THREE.Vector3(0, 0, 22.4),
      new THREE.Vector3(28, 16, 6),
      new THREE.Vector3(28, 16, 128),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M24: Monolithic Circular Stainless Rear Bayonet Nut-Ring Backplate (6-Bolt Shear Ring)
  // =========================================================================
  const backingNutGroup = new THREE.Group();
  {
    const ringShape = createRingShape(35.2, 28.4);
    addCircleHoles(ringShape, boltHoleCoords);
    const ringMesh = new THREE.Mesh(
      extrudeCentered(ringShape, 1.75, 0.1, 0.1, 56),
      mats.mountStainlessFlange
    );
    backingNutGroup.add(ringMesh);

    // 6 raised integral stainless threaded nut bosses facing +Z into M19 Mg bulkhead
    for (const [bx, by] of boltHoleCoords) {
      const nutBoss = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 2.8, 1.6, 16).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      nutBoss.position.set(bx, by, 1.15);
      backingNutGroup.add(nutBoss);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-backing-nut-plate',
      24,
      '#cbd5e1',
      backingNutGroup,
      new THREE.Vector3(0, 0, 19.6),
      new THREE.Vector3(0, 0, -18),
      new THREE.Vector3(0, 0, 108),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M25: Bayonet Lug Low-Friction PTFE/PEEK Anti-Galling Wear Pads & Lubricant Grooves
  // =========================================================================
  const ptfePadGroup = new THREE.Group();
  {
    // 3 curved low-friction self-lubricating PTFE/PEEK guide pads matching the 3 bayonet lug arcs
    for (const deg of [18, 138, 258]) {
      const a0 = THREE.MathUtils.degToRad(deg - 24);
      const a1 = THREE.MathUtils.degToRad(deg + 24);
      const padShape = new THREE.Shape();
      padShape.absarc(0, 0, 29.8, a0, a1, false);
      padShape.absarc(0, 0, 27.6, a1, a0, true);
      padShape.closePath();

      const pad = new THREE.Mesh(
        extrudeCentered(padShape, 0.65, 0.04, 0.04, 24),
        mats.zifIvoryPlastic
      );
      ptfePadGroup.add(pad);

      // Micro lubricant retention groove dot in pad center
      const midA = THREE.MathUtils.degToRad(deg);
      const groove = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 0.72), mats.brassGear);
      groove.position.set(Math.cos(midA) * 28.7, Math.sin(midA) * 28.7, 0);
      groove.rotation.z = midA;
      groove.userData.noEdges = true;
      ptfePadGroup.add(groove);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-ptfe-wear-pad',
      25,
      '#f8fafc',
      ptfePadGroup,
      new THREE.Vector3(0, 0, 29.5),
      new THREE.Vector3(0, 0, 34),
      new THREE.Vector3(0, 0, 160),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M26: 12-Pin Lens-Communication Bus Common-Mode Ferrite Choke & EMI Shield Hood
  // =========================================================================
  const ferriteGroup = new THREE.Group();
  {
    // Wideband NiZn Ferrite Common-Mode Core clamped around 12-pin mount contact flex root (6 o'clock)
    const core = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.0, 5.2, 1.0), 4.2, 0.1, 0.1, 12),
      mats.ferriteInductor
    );
    core.position.set(0, -27.2, 0);
    ferriteGroup.add(core);

    // SUS304 chassis-grounded EMI shield hood hugging rear of 12-pin block
    const hood = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(23.2, 6.4, 1.2), 1.4, 0.08, 0.08, 12),
      mats.emiShieldCan
    );
    hood.position.set(0, -27.2, -2.5);
    ferriteGroup.add(hood);

    // Twin BeCu grounding spring clips tying shield hood directly to Mg bulkhead
    for (const gx of [-11.8, 11.8]) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.2, 2.4), mats.beCuSpring);
      clip.position.set(gx, -27.2, -1.2);
      ferriteGroup.add(clip);
    }
  }
  parts.push(
    finalizeMountPart(
      'mount-contact-ferrite',
      26,
      '#334155',
      ferriteGroup,
      new THREE.Vector3(0, 0, 22.8),
      new THREE.Vector3(0, -34, -8),
      new THREE.Vector3(0, -34, 118),
      cp,
      0.26
    )
  );

  // =========================================================================
  // Live Mechanical Rig: Release Button -> Rocker -> Lock Pin -> Detect Switch + Tally LED
  // =========================================================================
  // Tag rigid kinematic bone nodes for GPU SubPartRigidBoneMegaBatcher!
  lockPinPlunger.userData.kinematicBone = true;
  releaseButtonGroup.userData.kinematicBone = true;
  rockerLever.userData.kinematicBone = true;
  detectWiperBlade.userData.kinematicBone = true;

  const applyDynamics = (elapsed: number, physicsActive: boolean) => {
    if (!physicsActive) {
      lockPinPlunger.position.z = 0.8;
      releaseButtonGroup.position.z = 2.2;
      rockerLever.rotation.y = 0;
      detectWiperBlade.rotation.z = 0;
      tallyLedMat.color.setRGB(0.75, 0.12, 0.24);
      return;
    }

    const cycle = (elapsed * 0.28) % 1;
    let depress = 0;
    if (cycle > 0.15 && cycle < 0.48) {
      const u = (cycle - 0.15) / 0.33;
      depress = Math.sin(u * Math.PI);
    }
    releaseButtonGroup.position.z = 2.2 - depress * 1.9;
    lockPinPlunger.position.z = 0.8 - depress * 2.8;
    rockerLever.rotation.y = depress * 0.18;
    detectWiperBlade.rotation.z = depress * 0.16;
    const glow = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(elapsed * 3.4));
    tallyLedMat.color.setRGB(0.95 * glow, 0.18 * glow, 0.32 * glow);
  };

  return {
    parts,
    rig: {
      lockPinPlunger,
      releaseButtonGroup,
      rockerLever,
      applyDynamics,
    },
  };
}

export async function buildMountStandaloneParts(mats: MaterialLibrary): Promise<CadPart[]> {
  // Phase 13 (16) + Phase 18B (6) + Phase 20B (12) + Phase 34 (40) = 74 standalone-only mount parts (M27–M100 -> 100 total!)
  const [mMicro, mUltra, mDeep, mU34A, mU34B] = await Promise.all([
    import('./mountMicroParts'),
    import('./mountUltraAuditParts'),
    import('./mountDeepAuditParts'),
    import('./mountUltra34PartsA'),
    import('./mountUltra34PartsB'),
  ]);
  return [
    ...mMicro.buildMountMicroParts(mats),
    ...mUltra.buildMountUltraAuditParts(mats),
    ...mDeep.buildMountDeepAuditParts(mats),
    ...mU34A.buildMountUltra34PartsA(mats),
    ...mU34B.buildMountUltra34PartsB(mats),
  ];
}
