import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { MOUNT_EXPLANATIONS } from './mountExplanations';

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
    explanation: MOUNT_EXPLANATIONS[id],
  };
}

/**
 * Build all 12 ultra-detailed CAD sub-assemblies of a 2024-2026 Flagship Large-Diameter
 * Mirrorless Lens Mount (55mm inner diameter, 6-bolt reinforced stainless bayonet flange,
 * 4-leaf clamping springs, sub-micron calibration shims, 12-pin gold pogo contacts + ESD PCB,
 * fail-safe lock-pin linkage, stepped velvet baffles, 36x24mm flare mask, magnesium throat).
 *
 * Mounted directly in front of the Focal-Plane Shutter (z = +18.6 .. +32.0 mm, optical center (0,0)).
 */
export function buildMountParts(
  mats: MaterialLibrary
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
    // Main mirror-lapped 55mm ID / 68.8mm OD stainless datum ring
    const ringShape = createRingShape(34.4, 27.5);
    addCircleHoles(ringShape, [
      ...boltHoleCoords,
      [lockPinX, lockPinY, 1.75], // Lock-pin through-bore at -24 deg
    ]);
    const ringMesh = new THREE.Mesh(
      extrudeCentered(ringShape, 2.7, 0.22, 0.2, 64),
      mats.mountStainlessFlange
    );
    flangeGroup.add(ringMesh);

    // Precision machined outer step lip seated into front camera body opening
    const outerLip = new THREE.Mesh(
      extrudeCentered(createRingShape(35.0, 33.4), 1.3, 0.14, 0.14, 64),
      mats.mountStainlessFlange
    );
    outerLip.position.z = -0.65;
    flangeGroup.add(outerLip);

    // 4 Asymmetrical Precision Bayonet Locking Lugs extending inward (R = 24.8 .. 27.8 mm)
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

    // Iconic Red Anodized Circular Lens Mounting Index Dot at 12 o'clock (strictly ZERO text!)
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
      new THREE.Vector3(0, 0, 66),
      new THREE.Vector3(0, 0, 188),
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

      // Authentic blue anaerobic vibration-proof thread-locker coating band on lower shaft
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
      new THREE.Vector3(0, 0, 82),
      new THREE.Vector3(0, 0, 206),
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

    // Dual concentric elastomeric sealing lips (labyrinth moisture barrier)
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
      new THREE.Vector3(0, 0, 52),
      new THREE.Vector3(0, 0, 174),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M04: 4-Leaf Pre-Tensioned Spring-Steel Bayonet Clamping Ring
  // =========================================================================
  const springsGroup = new THREE.Group();
  {
    // Main precision stamped phosphor-bronze / spring-steel retaining ring
    const baseRingShape = createRingShape(30.4, 27.6);
    const baseRing = new THREE.Mesh(
      extrudeCentered(baseRingShape, 0.52, 0.05, 0.05, 56),
      mats.mountSpringSteel
    );
    springsGroup.add(baseRing);

    // 4 Arched Cantilever Clamping Leaf Springs positioned directly behind the 4 bayonet lugs!
    for (const deg of LUG_ANGLES_DEG) {
      const rad = THREE.MathUtils.degToRad(deg);
      const leafGroup = new THREE.Group();
      leafGroup.rotation.z = rad;

      // Sculpted bowed wave-spring leaf extending inward under bayonet lug
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 14; i++) {
        const u = i / 14; // 0..1 along arc
        const a = THREE.MathUtils.lerp(-0.34, 0.34, u);
        const r = 26.2;
        const bowZ = Math.sin(u * Math.PI) * 1.15; // Arched axial preload bow!
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, bowZ));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.42, 8, false);
      tubeGeo.scale(1, 1, 0.55);
      const leafMesh = new THREE.Mesh(tubeGeo, mats.mountSpringSteel);
      leafMesh.userData.noEdges = true;
      leafGroup.add(leafMesh);

      // Anchor mounting bridge joining bowed leaf to main ring
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
      4,
      '#d97706',
      springsGroup,
      new THREE.Vector3(0, 0, 28.0),
      new THREE.Vector3(0, 0, 40),
      new THREE.Vector3(0, 0, 162),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M05: Sub-Micron Flange Focal Distance Calibration Shim Set (3 Color-Coded Foils)
  // =========================================================================
  const shimsGroup = new THREE.Group();
  {
    const shimSpecs: Array<{
      z: number;
      thick: number;
      mat: THREE.Material;
      tabAngleDeg: number;
    }> = [
      { z: 0.42, thick: 0.16, mat: mats.stainlessMachined, tabAngleDeg: 102 }, // 0.010 mm Silver
      { z: 0.0, thick: 0.22, mat: mats.brassGear, tabAngleDeg: 78 },         // 0.025 mm Amber
      { z: -0.46, thick: 0.28, mat: mats.mountShimBlue, tabAngleDeg: 146 },  // 0.050 mm Cobalt Blue
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

      // Factory color-coded thickness identification tab protruding cleanly at rim edge
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
      5,
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
  // M06: Hardened Steel Lens Lock Pin, Return Spring & Ergonomic Release Button
  // =========================================================================
  const lockPinGroup = new THREE.Group();
  const lockPinPlunger = new THREE.Group();
  const releaseButtonGroup = new THREE.Group();
  let rockerLever!: THREE.Mesh;
  {
    // Guide bushing sleeve seated at exact lock-pin bore (x = lockPinX, y = lockPinY)
    const sleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.2, 5.4, 24).rotateX(Math.PI / 2),
      mats.brassGear
    );
    sleeve.position.set(lockPinX, lockPinY, -1.0);
    lockPinGroup.add(sleeve);

    // Movable Hardened Steel Cylindrical Lens Lock Pin + Cam Tip + Retaining E-Clip
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

    // Stainless Return Compression Coil Spring coaxially biasing the lock pin forward (+Z)!
    const spring = new THREE.Mesh(
      createHelicalSpringGeometry(1.75, 4.6, 6, 0.24),
      mats.stainlessMachined
    );
    spring.position.set(lockPinX, lockPinY, -5.8);
    spring.userData.noEdges = true;
    lockPinGroup.add(spring);

    // Pivoting Stainless Rocker Lever translating Release Button press -> Lock Pin retraction!
    const pivotPost = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 3.6, 18),
      mats.stainlessMachined
    );
    pivotPost.position.set(lockPinX + 5.8, lockPinY, -3.6);
    lockPinGroup.add(pivotPost);

    rockerLever = new THREE.Mesh(new THREE.BoxGeometry(12.2, 3.2, 1.15), mats.linkArmSteel);
    rockerLever.position.set(lockPinX + 5.6, lockPinY, -3.5);
    lockPinGroup.add(rockerLever);

    // External Front-Right Ergonomic Lens Release Push Button + EPDM Waterproof O-Ring!
    const btnX = lockPinX + 11.2;
    const btnY = lockPinY;
    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(4.6, 5.0, 2.2, 28).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    collar.position.set(btnX, btnY, 0.4);
    lockPinGroup.add(collar);

    const oRing = new THREE.Mesh(new THREE.TorusGeometry(3.85, 0.35, 10, 28), mats.epdmGasket);
    oRing.position.set(btnX, btnY, 1.35);
    oRing.userData.noEdges = true;
    lockPinGroup.add(oRing);

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
    // Tactile grip grooves on button face (zero text)
    for (let i = -2; i <= 2; i++) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.28, 0.28), mats.matteBlackAnodized);
      ridge.position.set(0, i * 0.95, 1.32);
      ridge.userData.noEdges = true;
      releaseButtonGroup.add(ridge);
    }
    releaseButtonGroup.add(btnCap, btnStem);
    lockPinGroup.add(releaseButtonGroup);
  }
  parts.push(
    finalizeMountPart(
      'mount-lock-pin',
      6,
      '#ef4444',
      lockPinGroup,
      new THREE.Vector3(0, 0, 27.2),
      new THREE.Vector3(20, -4, 46),
      new THREE.Vector3(24, -4, 170),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M07: 12-Pin Gold-Plated Spring-Loaded Pogo Contact Block (High-Speed Bus)
  // =========================================================================
  const contactsGroup = new THREE.Group();
  {
    const aStart = THREE.MathUtils.degToRad(-128);
    const aEnd = THREE.MathUtils.degToRad(-52);
    // Precision curved glass-filled PPS insulator housing along bottom arc of 55mm throat
    const blockShape = createArcSectorShape(22.8, 27.2, aStart, aEnd);
    const blockMesh = new THREE.Mesh(
      extrudeCentered(blockShape, 3.6, 0.2, 0.2, 36),
      mats.mountPpsInsulator
    );
    contactsGroup.add(blockMesh);

    // Side mounting ears with M1.4 screws securing contact block to magnesium throat
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

    // 12 Independent Gold-Plated Hemispherical Spring-Loaded Pogo Plunger Pins!
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

      // Pin #0 = staggered longest GND-first ESD lead pin; Pin #11 = recessed lens-detect trigger!
      const zExtra = i === 0 ? 0.35 : i === pinCount - 1 ? -0.25 : 0;

      // Gold brass barrel housing
      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.68, 0.68, 4.4, 16).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      barrel.position.set(px, py, 0.1 + zExtra * 0.4);
      contactsGroup.add(barrel);

      // Smooth hemispherical gold pogo plunger tip protruding forward (+Z)
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.66, 14, 10), mats.goldPlating);
      tip.position.set(px, py, 2.3 + zExtra);
      tip.userData.noEdges = true;
      contactsGroup.add(tip);

      // Rear PCB solder tail pin extending toward M08
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
      7,
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
  // M08: Lens Interface Rigid-Flex PCB, ±15kV ESD TVS Array & Shielded FPC
  // =========================================================================
  const contactPcbGroup = new THREE.Group();
  {
    const aStart = THREE.MathUtils.degToRad(-127);
    const aEnd = THREE.MathUtils.degToRad(-53);
    // Curved emerald HDI rigid PCB directly behind the 12 pogo pin tails
    const pcbShape = createArcSectorShape(22.6, 28.4, aStart, aEnd);
    const pcbMesh = new THREE.Mesh(
      extrudeCentered(pcbShape, 1.15, 0.08, 0.08, 36),
      mats.hdiMainboardPcb
    );
    contactPcbGroup.add(pcbMesh);

    // 12 Gold solder pad rings on +Z face matching the 12 pogo tails
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

    // 12-Ch Low-Capacitance ESD TVS Surge Protection Array ICs (×2) on -Z back face
    for (const sx of [-5.8, 5.8]) {
      const tvs = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.2, 0.78), mats.icEpoxy);
      tvs.position.set(sx, -25.2, -0.92);
      tvs.rotation.z = sx < 0 ? -0.22 : 0.22;
      contactPcbGroup.add(tvs);
    }

    // High-Current Lens VCM Power MOSFET Switch + Yellow Tantalum Bulk Decoupling Caps
    const mosfet = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.0, 0.9), mats.icEpoxy);
    mosfet.position.set(0, -25.6, -0.96);
    contactPcbGroup.add(mosfet);

    for (const sx of [-11.4, 11.4]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 0.85), mats.tantalumCapYellow);
      cap.position.set(sx, -23.0, -0.92);
      cap.rotation.z = sx < 0 ? -0.45 : 0.45;
      contactPcbGroup.add(cap);
    }

    // EMI-Shielded High-Speed Amber Polyimide FPC Ribbon sweeping rearward toward Mainboard ZIF!
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
      8,
      '#10b981',
      contactPcbGroup,
      new THREE.Vector3(0, 0, 23.2),
      new THREE.Vector3(0, -24, 18),
      new THREE.Vector3(0, -24, 140),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M09: Stepped Multi-Knife-Edge Internal Anti-Reflection Light-Trap Ring
  // =========================================================================
  const baffleGroup = new THREE.Group();
  {
    // Main matte-black velvet cylindrical throat liner (upper 275° arc clearing lower 12-pin contact block!)
    const aStart = THREE.MathUtils.degToRad(-46);
    const aEnd = THREE.MathUtils.degToRad(226);
    const sleeveShape = createArcSectorShape(26.1, 27.6, aStart, aEnd);
    const sleeve = new THREE.Mesh(
      extrudeCentered(sleeveShape, 6.8, 0.08, 0.08, 48),
      mats.mountVelvetBaffle
    );
    baffleGroup.add(sleeve);

    // 5 Concentric Razor-Sharp Sawtooth Knife-Edge Light-Trap Baffle Ribs along inner wall!
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

    // Rear full-360° light-seal collar at back of baffle liner
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
      9,
      '#18181b',
      baffleGroup,
      new THREE.Vector3(0, 0, 23.8),
      new THREE.Vector3(0, 0, 16),
      new THREE.Vector3(0, 0, 138),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M10: Precision 36×24mm Full-Frame Rectangular Flare-Cut Baffle Mask
  // =========================================================================
  const flareMaskGroup = new THREE.Group();
  {
    // Circular outer perimeter matching 55mm throat -> exact 38.6 x 26.2 mm 3:2 rectangular optical gate!
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

    // Secondary stepped knife-edge rectangular anti-reflection frame framing the 3:2 gate
    const innerStep = new THREE.Mesh(
      extrudeCentered(createFrameShape(42.2, 29.8, 2.2, 38.0, 25.6, 1.0), 1.1, 0.06, 0.12, 24),
      mats.matteBlackAnodized
    );
    innerStep.position.z = 0.9;
    flareMaskGroup.add(innerStep);

    // 4 micro brass alignment notches on mask rim
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
      10,
      '#334155',
      flareMaskGroup,
      new THREE.Vector3(0, 0, 20.2),
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(0, 0, 116),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M11: High-Rigidity Thixomolded AZ91D Magnesium-Aluminum Mount Box
  // =========================================================================
  const mgThroatGroup = new THREE.Group();
  {
    // Contoured structural front bulkhead housing the 55.6 mm optical throat
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

    // Raised precision CNC-machined circular mounting collar boss (R = 27.8 .. 35.0 mm)
    const collarShape = createRingShape(35.0, 27.8);
    addCircleHoles(collarShape, boltHoleCoords);
    const collar = new THREE.Mesh(
      extrudeCentered(collarShape, 2.2, 0.16, 0.16, 56),
      mats.magnesiumCast
    );
    collar.position.z = 3.2;
    mgThroatGroup.add(collar);

    // 6 Stainless Helicoil Reinforced Threaded Boss Inserts at the 6 mount bolt locations!
    for (const [bx, by] of boltHoleCoords) {
      const helicoil = new THREE.Mesh(
        new THREE.CylinderGeometry(2.15, 2.15, 5.2, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      helicoil.position.set(bx, by, 1.4);
      mgThroatGroup.add(helicoil);
    }

    // 8 Radial Load-Transfer Structural Reinforcement Gusset Ribs around outer perimeter!
    for (const deg of [25, 50, 130, 155, 205, 230, 310, 335]) {
      const a = THREE.MathUtils.degToRad(deg);
      const rib = new THREE.Mesh(new THREE.BoxGeometry(8.5, 2.0, 4.6), mats.mountMgBulkhead);
      rib.position.set(Math.cos(a) * 37.5, Math.sin(a) * 33.2, 0.6);
      rib.rotation.z = a;
      mgThroatGroup.add(rib);
    }

    // Right-side machined lens-release button boss housing
    const btnBoss = new THREE.Mesh(
      new THREE.CylinderGeometry(5.6, 6.0, 5.8, 24).rotateX(Math.PI / 2),
      mats.mountMgBulkhead
    );
    btnBoss.position.set(lockPinX + 11.2, lockPinY, 1.2);
    mgThroatGroup.add(btnBoss);

    // 4 Corner Structural Chassis Mounting Ears + Precision Screws
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
      11,
      '#64748b',
      mgThroatGroup,
      new THREE.Vector3(0, 0, 23.4),
      new THREE.Vector3(0, 0, 2),
      new THREE.Vector3(0, 0, 126),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M12: Front Structural Chassis Interface Flange, Tripod Struts & Dust Seal
  // =========================================================================
  const interfaceGroup = new THREE.Group();
  {
    // Main precision magnesium structural docking flange (mates flush to Shutter front frame)
    const flangeShape = createFrameShape(78.0, 62.0, 6.4, 45.0, 33.0, 3.2);
    const plate = new THREE.Mesh(
      extrudeCentered(flangeShape, 1.5, 0.14, 0.14, 28),
      mats.magnesiumCast
    );
    interfaceGroup.add(plate);

    // Full-perimeter EPDM sensor-chamber dust-seal gasket seated on rear (-Z) face
    const dustSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(74.4, 58.4, 5.2, 70.6, 54.6, 4.0), 0.72, 0.08, 0.08, 28),
      mats.epdmGasket
    );
    dustSeal.position.z = -0.9;
    interfaceGroup.add(dustSeal);

    // Twin Heavy Lower Triangular Tripod Load-Transfer Gussets (bypassing bending load around IBIS!)
    for (const sx of [-1, 1]) {
      const gusset = new THREE.Mesh(new THREE.BoxGeometry(14.0, 8.6, 4.8), mats.mountMgBulkhead);
      gusset.position.set(sx * 24.5, -31.8, 1.2);
      interfaceGroup.add(gusset);

      const footPad = new THREE.Mesh(new THREE.BoxGeometry(16.0, 2.0, 6.2), mats.stainlessMachined);
      footPad.position.set(sx * 24.5, -35.8, 1.2);
      interfaceGroup.add(footPad);
    }

    // 4 Hardened Stainless Coaxial Registration Dowel Pins (±5 μm repeatability!)
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
      12,
      '#475569',
      interfaceGroup,
      new THREE.Vector3(0, 0, 18.6),
      new THREE.Vector3(0, 0, -22),
      new THREE.Vector3(0, 0, 106),
      cp,
      0.24
    )
  );

  // =========================================================================
  // Live Mechanical Rig: Lens Release Button Press -> Rocker -> Lock Pin Retract
  // =========================================================================
  const applyDynamics = (elapsed: number, physicsActive: boolean) => {
    if (!physicsActive) {
      lockPinPlunger.position.z = 0.8;
      releaseButtonGroup.position.z = 2.2;
      rockerLever.rotation.y = 0;
      return;
    }

    // Periodic smooth release-and-snap-lock cycle (every ~3.6 seconds)
    const cycle = (elapsed * 0.28) % 1;
    let depress = 0;
    if (cycle > 0.15 && cycle < 0.48) {
      const u = (cycle - 0.15) / 0.33;
      depress = Math.sin(u * Math.PI);
    }
    // Release button pushes inward (-Z), rocker pivots, lock pin retracts cleanly (-Z) then snaps back!
    releaseButtonGroup.position.z = 2.2 - depress * 1.9;
    lockPinPlunger.position.z = 0.8 - depress * 2.8;
    rockerLever.rotation.y = depress * 0.18;
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
