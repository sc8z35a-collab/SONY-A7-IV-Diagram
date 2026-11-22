import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createPrecisionScrew,
  createRoundedRectShape,
  createSpurGearGeometry,
  createTorsionSpringGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { SHUTTER_EXPLANATIONS } from './shutterExplanations';

export interface ShutterDynamicRig {
  curtain1Blades: THREE.Mesh[];
  curtain2Blades: THREE.Mesh[];
  link1Main: THREE.Group;
  link1Sub: THREE.Group;
  link2Main: THREE.Group;
  link2Sub: THREE.Group;
  shieldBlades: THREE.Mesh[];
  chargeGears: THREE.Mesh[];
  chargeCam: THREE.Group;
  dualBoostCoilGlow: THREE.Mesh;
  magnet1Glow: THREE.Mesh;
  magnet2Glow: THREE.Mesh;
  /** Current slit top/bottom Y in mm for synchronized optical slit visualization */
  slitState: {
    curtain1EdgeY: number;
    curtain2EdgeY: number;
    phaseLabel: 'open' | 'slit' | 'closed' | 'charging';
    boostActive: boolean;
    irTrigger1: boolean;
    irTrigger2: boolean;
  };
  applyKinematics: (elapsed: number, physicsActive: boolean) => void;
}

function finalizeShutterPart(
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
    subsystem: 'shutter',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: SHUTTER_EXPLANATIONS[id],
  };
}

/**
 * Build all 12 independent CAD sub-assemblies of a modern flagship Dual-Driven
 * Carbon-Fiber Vertical-Travel Focal-Plane Shutter positioned directly in front
 * of the Full-Frame Sensor Module (z = +10.8 mm .. +17.6 mm, optical center at x=0, y=0).
 *
 * Right-hand drive bay (+X side, x = +20..+36 mm) houses the parallelogram linkage arms,
 * dual-drive torsion springs + electromagnetic booster, twin microsecond holding magnets,
 * 500k-cycle coreless DC motor + reduction gear train + cocking cam, and IR optical monitors.
 */
export function buildShutterParts(
  mats: MaterialLibrary
): { parts: CadPart[]; rig: ShutterDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // Frame overall bounds: centered slightly right (+6.5mm in X) because drive bay is on +X side,
  // while optical aperture (37.6 x 25.6 mm) stays strictly centered at (x=0, y=0)!
  const frameW = 74.0;
  const frameH = 54.0;
  const frameCenterX = 7.5;
  const apW = 37.6;
  const apH = 25.6;

  // Dynamic rig references populated below
  const curtain1Blades: THREE.Mesh[] = [];
  const curtain2Blades: THREE.Mesh[] = [];
  const shieldBlades: THREE.Mesh[] = [];
  const chargeGears: THREE.Mesh[] = [];
  const link1Main = new THREE.Group();
  const link1Sub = new THREE.Group();
  const link2Main = new THREE.Group();
  const link2Sub = new THREE.Group();
  const chargeCam = new THREE.Group();

  // =========================================================================
  // S01. Front Protective Cover Plate & Matte Baffle Frame (z = +17.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const coverShape = createFrameShape(frameW, frameH, 4.2, apW, apH, 0.9, -frameCenterX, 0);
    // Authentic flagship shutter drive-bay cutout framing the exposed solenoids, torsion springs,
    // electromagnetic boost actuator & reduction gear train on the +X mechanical deck!
    const bayW = 20.4;
    const bayH = 42.0;
    const bayCx = 23.2; // in coverShape local coords (mesh sits at x = +7.5 -> world x = +30.7)
    const bayR = 2.4;
    const bayHole = new THREE.Path();
    const bx0 = bayCx - bayW / 2;
    const bx1 = bayCx + bayW / 2;
    const by0 = -bayH / 2;
    const by1 = bayH / 2;
    bayHole.moveTo(bx0 + bayR, by0);
    bayHole.lineTo(bx1 - bayR, by0);
    bayHole.quadraticCurveTo(bx1, by0, bx1, by0 + bayR);
    bayHole.lineTo(bx1, by1 - bayR);
    bayHole.quadraticCurveTo(bx1, by1, bx1 - bayR, by1);
    bayHole.lineTo(bx0 + bayR, by1);
    bayHole.quadraticCurveTo(bx0, by1, bx0, by1 - bayR);
    bayHole.lineTo(bx0, by0 + bayR);
    bayHole.quadraticCurveTo(bx0, by0, bx0 + bayR, by0);
    coverShape.holes.push(bayHole);

    // 4 corner precision screw holes
    addCircleHoles(coverShape, [
      [-frameW / 2 + 4.5, frameH / 2 - 4.5, 1.5],
      [frameW / 2 - 4.5, frameH / 2 - 4.5, 1.5],
      [-frameW / 2 + 4.5, -frameH / 2 + 4.5, 1.5],
      [frameW / 2 - 4.5, -frameH / 2 + 4.5, 1.5],
    ]);
    const coverMesh = new THREE.Mesh(
      extrudeCentered(coverShape, 0.72, 0.08, 0.08, 20),
      mats.matteBlackAnodized
    );
    coverMesh.position.x = frameCenterX;
    g.add(coverMesh);

    // Inner stepped anti-reflection lip framing the 36x24mm optical gate
    const lipShape = createFrameShape(apW + 3.2, apH + 3.2, 1.2, apW, apH, 0.8);
    const lipMesh = new THREE.Mesh(
      extrudeCentered(lipShape, 0.45, 0.06, 0.08, 16),
      mats.matteBlackAnodized
    );
    lipMesh.position.z = 0.36;
    g.add(lipMesh);

    // 4 precision stainless mounting screws
    for (const [sx, sy] of [
      [frameCenterX - frameW / 2 + 4.5, frameH / 2 - 4.5],
      [frameCenterX + frameW / 2 - 4.5, frameH / 2 - 4.5],
      [frameCenterX - frameW / 2 + 4.5, -frameH / 2 + 4.5],
      [frameCenterX + frameW / 2 - 4.5, -frameH / 2 + 4.5],
    ] as Array<[number, number]>) {
      const screw = createPrecisionScrew(1.45, 0.48, 1.1, mats.stainlessMachined);
      screw.position.set(sx, sy, 0.34);
      g.add(screw);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-front-cover',
        1,
        '#202328',
        g,
        new THREE.Vector3(0, 0, 17.6),
        new THREE.Vector3(0, 0, 44.0),
        new THREE.Vector3(0, 0, 96.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // S02. Dedicated Anti-Dust Protective Sensor Shield Curtain (z = +16.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Thin guide track carrier frame for the 3-blade protective shield
    const railL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 38.0, 0.62), mats.midPlateSteel);
    railL.position.set(-20.4, 2.0, 0);
    const railR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 38.0, 0.62), mats.midPlateSteel);
    railR.position.set(20.4, 2.0, 0);
    g.add(railL, railR);

    // 3 sturdy anodized aluminum dust-shield blades parked cleanly in upper pocket during active exposure
    // (lower edge sits just above the 24mm aperture so users see the stacked shield blades clearly!)
    for (let i = 0; i < 3; i++) {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(39.4, 8.6, 0.16),
        mats.shutterShieldBlade
      );
      blade.position.set(0, 18.2 - i * 1.15, (1 - i) * 0.19);
      g.add(blade);
      shieldBlades.push(blade);
    }

    // Small stepped side drive tab for power-off shield deployment
    const tab = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.4, 0.52), mats.linkArmSteel);
    tab.position.set(21.6, 17.2, 0);
    g.add(tab);

    parts.push(
      finalizeShutterPart(
        'shutter-dust-shield',
        2,
        '#4c5869',
        g,
        new THREE.Vector3(0, 0, 16.6),
        new THREE.Vector3(0, 0, 34.5),
        new THREE.Vector3(0, 0, 86.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // S03. 1st (Front) Curtain — 4 Ultra-Thin Carbon Fiber (CFRP) Blades (z = +15.3 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const bladeW = 41.2;
    const bladeH = 7.4;
    for (let i = 0; i < 4; i++) {
      const bladeGeo = new THREE.BoxGeometry(bladeW, bladeH, 0.15);
      const blade = new THREE.Mesh(bladeGeo, mats.carbonFiberBlade);
      // Slight Z stagger so overlapping 0.05mm-class blades never z-fight and look genuinely layered
      blade.position.set(0.6, 0, (1.5 - i) * 0.17);

      // Lead edge reinforcement bead on slit-forming blade #0 (crisp edge catching light)
      if (i === 0) {
        const bead = new THREE.Mesh(
          new THREE.BoxGeometry(bladeW, 0.55, 0.22),
          mats.stainlessMachined
        );
        bead.position.set(0, bladeH / 2 - 0.28, 0.02);
        blade.add(bead);
      }

      // 2 precision micro-rivet pins on right (+X) ear connecting to parallelogram linkage arms
      const rivetGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.34, 12);
      rivetGeo.rotateX(Math.PI / 2);
      const riv1 = new THREE.Mesh(rivetGeo, mats.brassGear);
      riv1.position.set(bladeW / 2 - 1.4, 1.4, 0);
      const riv2 = new THREE.Mesh(rivetGeo, mats.brassGear);
      riv2.position.set(bladeW / 2 - 1.4, -1.4, 0);
      blade.add(riv1, riv2);

      g.add(blade);
      curtain1Blades.push(blade);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-curtain-1',
        3,
        '#1f242d',
        g,
        new THREE.Vector3(0, 0, 15.3),
        new THREE.Vector3(0, 0, 25.0),
        new THREE.Vector3(0, 0, 76.5),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // S04. 1st Curtain Parallelogram 4-Bar Linkage Arms (z = +14.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const buildLinkArm = (length: number, width: number) => {
      const armGrp = new THREE.Group();
      const shape = createRoundedRectShape(length, width, width * 0.45);
      // Shift pivot to x = 0 so arm extends along -X toward blades
      const geo = extrudeCentered(shape, 0.38, 0.04, 0.04, 14);
      geo.translate(-length / 2 + 1.4, 0, 0);
      const mesh = new THREE.Mesh(geo, mats.linkArmSteel);
      armGrp.add(mesh);

      // Weight-reduction lightening slots along arm
      for (let k = 1; k <= 3; k++) {
        const pinGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.56, 12);
        pinGeo.rotateX(Math.PI / 2);
        const pin = new THREE.Mesh(pinGeo, mats.brassGear);
        pin.position.set(-k * (length / 4.2), 0, 0);
        armGrp.add(pin);
      }

      // Main stationary pivot boss at (0,0)
      const bossGeo = new THREE.CylinderGeometry(1.45, 1.45, 0.72, 16);
      bossGeo.rotateX(Math.PI / 2);
      const boss = new THREE.Mesh(bossGeo, mats.brassGear);
      armGrp.add(boss);

      return armGrp;
    };

    // Main driving arm (upper pivot) & parallel follower arm (lower pivot)
    link1Main.add(buildLinkArm(14.5, 2.3));
    link1Main.position.set(27.0, 2.8, 0.14);

    link1Sub.add(buildLinkArm(14.5, 2.0));
    link1Sub.position.set(27.0, -3.2, -0.14);

    g.add(link1Main, link1Sub);

    parts.push(
      finalizeShutterPart(
        'shutter-link-1',
        4,
        '#adb8c7',
        g,
        new THREE.Vector3(0, 0, 14.8),
        new THREE.Vector3(0, 0, 18.0),
        new THREE.Vector3(0, 0, 69.5),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // S05. Intermediate Partition Plate (Mid-Plate Separator) (z = +14.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Ultra-thin precision steel separator isolating 1st and 2nd curtain chambers
    const midShape = createFrameShape(66.0, 48.0, 3.0, apW - 0.2, apH - 0.2, 0.7, -4.5, 0);
    // Right-hand clearance slot for linkage drive pins
    const slot = new THREE.Path();
    slot.moveTo(20.5, -15.0);
    slot.lineTo(27.5, -15.0);
    slot.lineTo(27.5, 15.0);
    slot.lineTo(20.5, 15.0);
    slot.closePath();
    midShape.holes.push(slot);

    const midMesh = new THREE.Mesh(
      extrudeCentered(midShape, 0.28, 0.03, 0.03, 16),
      mats.midPlateSteel
    );
    midMesh.position.x = 4.5;
    g.add(midMesh);

    // Subtle anti-flutter micro-guide ribs at top & bottom aperture borders
    for (const ry of [14.2, -14.2]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(36.0, 0.8, 0.42), mats.matteBlackAnodized);
      rib.position.set(0, ry, 0);
      g.add(rib);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-mid-plate',
        5,
        '#4e5868',
        g,
        new THREE.Vector3(0, 0, 14.0),
        new THREE.Vector3(0, 0, 10.5),
        new THREE.Vector3(0, 0, 62.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // S06. 2nd (Rear) Curtain — 4 Slit-Forming Carbon/Alloy Blades (z = +12.9 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const bladeW = 41.2;
    const bladeH = 7.4;
    for (let i = 0; i < 4; i++) {
      const bladeGeo = new THREE.BoxGeometry(bladeW, bladeH, 0.15);
      const blade = new THREE.Mesh(bladeGeo, mats.carbonFiberBladeRear);
      blade.position.set(0.6, 0, (1.5 - i) * 0.17);

      // Precision slit-closing bottom edge bead on rear curtain blade #0
      if (i === 0) {
        const bead = new THREE.Mesh(
          new THREE.BoxGeometry(bladeW, 0.55, 0.22),
          mats.goldPlating
        );
        bead.position.set(0, -bladeH / 2 + 0.28, 0.02);
        blade.add(bead);
      }

      const rivetGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.34, 12);
      rivetGeo.rotateX(Math.PI / 2);
      const riv1 = new THREE.Mesh(rivetGeo, mats.stainlessMachined);
      riv1.position.set(bladeW / 2 - 1.4, 1.4, 0);
      const riv2 = new THREE.Mesh(rivetGeo, mats.stainlessMachined);
      riv2.position.set(bladeW / 2 - 1.4, -1.4, 0);
      blade.add(riv1, riv2);

      g.add(blade);
      curtain2Blades.push(blade);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-curtain-2',
        6,
        '#56657c',
        g,
        new THREE.Vector3(0, 0, 12.9),
        new THREE.Vector3(0, 0, 3.0),
        new THREE.Vector3(0, 0, 54.5),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // S07. 2nd Curtain Parallelogram 4-Bar Linkage Arms (z = +12.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const buildRearArm = (length: number, width: number) => {
      const armGrp = new THREE.Group();
      const shape = createRoundedRectShape(length, width, width * 0.45);
      const geo = extrudeCentered(shape, 0.38, 0.04, 0.04, 14);
      geo.translate(-length / 2 + 1.4, 0, 0);
      const mesh = new THREE.Mesh(geo, mats.stainlessMachined);
      armGrp.add(mesh);

      for (let k = 1; k <= 3; k++) {
        const pinGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.56, 12);
        pinGeo.rotateX(Math.PI / 2);
        const pin = new THREE.Mesh(pinGeo, mats.goldPlating);
        pin.position.set(-k * (length / 4.2), 0, 0);
        armGrp.add(pin);
      }

      const bossGeo = new THREE.CylinderGeometry(1.45, 1.45, 0.72, 16);
      bossGeo.rotateX(Math.PI / 2);
      const boss = new THREE.Mesh(bossGeo, mats.goldPlating);
      armGrp.add(boss);

      return armGrp;
    };

    link2Main.add(buildRearArm(14.5, 2.3));
    link2Main.position.set(27.0, 6.2, 0.14);

    link2Sub.add(buildRearArm(14.5, 2.0));
    link2Sub.position.set(27.0, 0.2, -0.14);

    g.add(link2Main, link2Sub);

    parts.push(
      finalizeShutterPart(
        'shutter-link-2',
        7,
        '#8c99ab',
        g,
        new THREE.Vector3(0, 0, 12.4),
        new THREE.Vector3(0, 0, -4.0),
        new THREE.Vector3(0, 0, 48.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // S08. Dual-Driven Actuator: Torsion Springs x2 + Electromagnetic Boost Coil (z = +13.0 mm)
  // =========================================================================
  let dualBoostCoilGlow!: THREE.Mesh;
  {
    const g = new THREE.Group();

    // 1st & 2nd curtain high-tension stainless torsion springs + brass tension ratchet drums
    for (const [sy, labelOffset] of [
      [3.0, 0],
      [-5.2, 1],
    ] as Array<[number, number]>) {
      const spring = new THREE.Mesh(
        createTorsionSpringGeometry(2.6, 2.8, 4.5, 0.32, 4.8),
        mats.stainlessMachined
      );
      spring.position.set(27.0, sy, 0.3);
      spring.userData.noEdges = true;
      g.add(spring);

      const ratchet = new THREE.Mesh(
        createSpurGearGeometry(14, 3.1, 0.9, 1.1),
        mats.brassGear
      );
      ratchet.position.set(27.0, sy, -1.4);
      g.add(ratchet);

      const axleGeo = new THREE.CylinderGeometry(0.95, 0.95, 4.2, 14);
      axleGeo.rotateX(Math.PI / 2);
      const axle = new THREE.Mesh(axleGeo, mats.linkArmSteel);
      axle.position.set(27.0, sy, -0.2);
      g.add(axle);
      void labelOffset;
    }

    // Sony Alpha 1 / 1 II Style Electromagnetic Boost Actuator (Copper Stator + Neodymium Rotor)
    const statorYoke = new THREE.Mesh(new THREE.BoxGeometry(8.2, 9.6, 2.8), mats.softIronYoke);
    statorYoke.position.set(36.2, -1.0, 0);
    g.add(statorYoke);

    const boostCoilGeo = new THREE.CylinderGeometry(3.4, 3.4, 3.3, 24);
    boostCoilGeo.rotateX(Math.PI / 2);
    const boostCoil = new THREE.Mesh(boostCoilGeo, mats.copperCoil);
    boostCoil.position.set(36.2, -1.0, 0);
    g.add(boostCoil);

    const rotorGeo = new THREE.CylinderGeometry(2.1, 2.1, 3.8, 18);
    rotorGeo.rotateX(Math.PI / 2);
    const rotor = new THREE.Mesh(rotorGeo, mats.neodymiumMagnet);
    rotor.position.set(36.2, -1.0, 0);
    g.add(rotor);

    // Subtle electromagnetic boost pulse halo ring (visible during boost firing in simulation)
    dualBoostCoilGlow = new THREE.Mesh(
      new THREE.TorusGeometry(3.9, 0.24, 10, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0d5bd9,
        transparent: true,
        opacity: 0,
        clippingPlanes: cp,
      })
    );
    dualBoostCoilGlow.position.set(36.2, -1.0, 1.75);
    dualBoostCoilGlow.userData.noEdges = true;
    g.add(dualBoostCoilGlow);

    parts.push(
      finalizeShutterPart(
        'shutter-dual-drive',
        8,
        '#c86432',
        g,
        new THREE.Vector3(0, 0, 13.0),
        new THREE.Vector3(12.0, 0, -10.5),
        new THREE.Vector3(10.0, 0, 41.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // S09. Microsecond Twin Holding Electromagnets (Front & Rear Solenoids) (z = +12.5 mm)
  // =========================================================================
  let magnet1Glow!: THREE.Mesh;
  let magnet2Glow!: THREE.Mesh;
  {
    const g = new THREE.Group();

    const buildSolenoid = (x: number, y: number) => {
      const sub = new THREE.Group();
      sub.position.set(x, y, 0);

      // U-shaped Permalloy iron core
      const coreBase = new THREE.Mesh(new THREE.BoxGeometry(6.8, 2.2, 2.4), mats.softIronYoke);
      coreBase.position.set(0, 2.6, 0);
      const legL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.2, 2.2), mats.softIronYoke);
      legL.position.set(-2.3, 0, 0);
      const legR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.2, 2.2), mats.softIronYoke);
      legR.position.set(2.3, 0, 0);
      sub.add(coreBase, legL, legR);

      // Precision copper solenoid bobbins wound around both core legs
      const bobL = new THREE.Mesh(new THREE.BoxGeometry(2.7, 3.6, 2.9), mats.copperCoil);
      bobL.position.set(-2.3, 0.2, 0);
      const bobR = new THREE.Mesh(new THREE.BoxGeometry(2.7, 3.6, 2.9), mats.copperCoil);
      bobR.position.set(2.3, 0.2, 0);
      sub.add(bobL, bobR);

      // Precision flat steel holding armature (releases in microseconds when current cuts)
      const arm = new THREE.Mesh(new THREE.BoxGeometry(7.2, 1.1, 2.0), mats.stainlessMachined);
      arm.position.set(0, -3.2, 0);
      sub.add(arm);

      // Status indicator micro-dot on top of yoke for physics animation
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.62, 12, 10),
        new THREE.MeshBasicMaterial({
          color: 0x0ea5e9,
          transparent: true,
          opacity: 0,
          clippingPlanes: cp,
        })
      );
      glow.position.set(0, 4.1, 1.3);
      glow.userData.noEdges = true;
      sub.add(glow);

      return { sub, glow };
    };

    const m1 = buildSolenoid(26.5, 16.5);
    const m2 = buildSolenoid(36.0, 16.5);
    magnet1Glow = m1.glow;
    magnet2Glow = m2.glow;

    // Polyimide drive flex bus linking both solenoids
    const flexBus = new THREE.Mesh(new THREE.BoxGeometry(16.0, 1.8, 0.22), mats.polyimideFpc);
    flexBus.position.set(31.2, 20.4, -0.5);
    g.add(m1.sub, m2.sub, flexBus);

    parts.push(
      finalizeShutterPart(
        'shutter-magnets',
        9,
        '#d97724',
        g,
        new THREE.Vector3(0, 0, 12.5),
        new THREE.Vector3(16.0, 5.0, -17.0),
        new THREE.Vector3(14.0, 4.0, 34.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // S10. 500k-Cycle Coreless DC Charge Motor, Reduction Gear Train & Cocking Cam (z = +12.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Cylindrical high-response coreless DC motor positioned in lower-right drive bay
    const motorCan = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 4.4, 13.5, 24),
      mats.stainlessMachined
    );
    motorCan.position.set(36.2, -16.8, 0);
    g.add(motorCan);

    // Black insulated end-bell cap + gold power terminals
    const endCap = new THREE.Mesh(
      new THREE.CylinderGeometry(4.3, 4.3, 1.8, 24),
      mats.icEpoxy
    );
    endCap.position.set(36.2, -24.1, 0);
    g.add(endCap);

    for (const tx of [34.8, 37.6]) {
      const term = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.4), mats.goldPlating);
      term.position.set(tx, -25.4, 0);
      g.add(term);
    }

    // Brass worm / pinion gear on motor output shaft (+Y end)
    const pinion = new THREE.Mesh(
      createSpurGearGeometry(10, 1.8, 3.0, 0.6),
      mats.brassGear
    );
    pinion.rotation.x = Math.PI / 2;
    pinion.position.set(36.2, -8.5, 0);
    g.add(pinion);

    // 4-stage precision POM (ivory acetal) & Brass reduction spur gear train (visibly meshed!)
    const gearDefs: Array<{ x: number; y: number; z: number; teeth: number; r: number; mat: THREE.Material }> = [
      { x: 30.8, y: -11.5, z: 0.4, teeth: 20, r: 3.9, mat: mats.pomGear },
      { x: 25.0, y: -14.8, z: -0.2, teeth: 16, r: 3.1, mat: mats.brassGear },
      { x: 29.5, y: -19.8, z: 0.5, teeth: 22, r: 4.2, mat: mats.pomGear },
      { x: 22.8, y: -21.0, z: -0.3, teeth: 18, r: 3.4, mat: mats.pomGear },
    ];
    for (const gd of gearDefs) {
      const gear = new THREE.Mesh(
        createSpurGearGeometry(gd.teeth, gd.r, 1.45, 0.9),
        gd.mat
      );
      gear.position.set(gd.x, gd.y, gd.z);
      g.add(gear);
      chargeGears.push(gear);

      const pinGeo = new THREE.CylinderGeometry(0.75, 0.75, 2.2, 12);
      pinGeo.rotateX(Math.PI / 2);
      const pin = new THREE.Mesh(pinGeo, mats.stainlessMachined);
      pin.position.set(gd.x, gd.y, gd.z);
      g.add(pin);
    }

    // Eccentric Cocking Cam + Charge Arm resetting springs after each frame
    const camShape = new THREE.Shape();
    camShape.absarc(0, 0, 2.6, 0, Math.PI * 1.4, false);
    camShape.lineTo(3.8, -1.8);
    camShape.lineTo(2.6, 0);
    const camMesh = new THREE.Mesh(
      extrudeCentered(camShape, 1.3, 0.06, 0.06, 20),
      mats.brassGear
    );
    const leverArm = new THREE.Mesh(new THREE.BoxGeometry(1.6, 8.8, 0.55), mats.linkArmSteel);
    leverArm.position.set(0.4, 4.4, 0.7);
    chargeCam.add(camMesh, leverArm);
    chargeCam.position.set(22.8, -21.0, 0.8);
    g.add(chargeCam);

    parts.push(
      finalizeShutterPart(
        'shutter-charge-motor',
        10,
        '#d4a948',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(20.0, -4.0, -23.5),
        new THREE.Vector3(18.0, -4.0, 27.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // S11. Self-Diagnostic IR Photo-Interrupter Optical Speed Monitors (z = +11.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Two U-shaped IR Photo-Interrupters measuring real-time curtain passage timing (upper & lower gates)
    for (const [px, py] of [
      [19.8, 10.6],
      [19.8, -10.6],
    ] as Array<[number, number]>) {
      const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.8, 2.2), mats.icEpoxy);
      body.position.set(px, py, 0);
      g.add(body);

      // Ruby-red IR LED emitter lens & phototransistor detector facing curtain edge
      const led = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.5, 14), mats.irLedLens);
      led.rotation.z = Math.PI / 2;
      led.position.set(px - 1.75, py, 0.45);
      const rx = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.5, 14), mats.siliconBulk);
      rx.rotation.z = Math.PI / 2;
      rx.position.set(px - 1.75, py, -0.45);
      g.add(led, rx);
    }

    // Amber polyimide control & diagnostic FPC routing to main camera board
    const fpcVert = new THREE.Mesh(new THREE.BoxGeometry(2.6, 26.0, 0.2), mats.polyimideFpc);
    fpcVert.position.set(21.4, 0, -0.85);
    const fpcTail = new THREE.Mesh(new THREE.BoxGeometry(12.0, 6.2, 0.2), mats.polyimideFpc);
    fpcTail.position.set(26.5, 22.8, -0.85);
    const goldEnd = new THREE.Mesh(new THREE.BoxGeometry(2.0, 5.6, 0.24), mats.goldPlating);
    goldEnd.position.set(32.0, 22.8, -0.82);
    g.add(fpcVert, fpcTail, goldEnd);

    parts.push(
      finalizeShutterPart(
        'shutter-optical-sensor',
        11,
        '#be123c',
        g,
        new THREE.Vector3(0, 0, 11.6),
        new THREE.Vector3(8.0, 0, -29.5),
        new THREE.Vector3(8.0, 0, 21.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // S12. High-Rigidity Base Chassis, Rebound Brake Dampers & Floating Anti-Vib Mounts (z = +10.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Glass-fiber reinforced PPS/magnesium base chassis with full-frame optical window
    const baseShape = createFrameShape(frameW + 2.0, frameH + 2.0, 4.6, apW, apH, 0.9, -frameCenterX, 0);
    const baseMesh = new THREE.Mesh(
      extrudeCentered(baseShape, 1.35, 0.12, 0.12, 20),
      mats.shutterChassis
    );
    baseMesh.position.x = frameCenterX;
    g.add(baseMesh);

    // Side mechanical bay protective surround wall
    const wallR = new THREE.Mesh(new THREE.BoxGeometry(1.4, frameH - 4.0, 4.2), mats.shutterChassis);
    wallR.position.set(frameCenterX + frameW / 2 - 0.5, 0, 2.2);
    g.add(wallR);

    // 2 High-Hysteresis Elastomer Rebound Brake Dampers (crimson red cushions at top & bottom end-stops!)
    for (const by of [15.8, -15.8]) {
      const damperBlock = new THREE.Mesh(
        new THREE.BoxGeometry(22.0, 2.6, 2.4),
        mats.damperElastomer
      );
      damperBlock.position.set(0, by, 1.45);
      g.add(damperBlock);

      // Friction brake leaf contact shoes
      for (const sx of [-7.5, 7.5]) {
        const shoe = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.2, 2.7), mats.brassGear);
        shoe.position.set(sx, by, 1.55);
        g.add(shoe);
      }
    }

    // 4 Corner Floating Anti-Vibration Silicone Isolator Bushings (vivid industrial cobalt blue rubber)
    // Decouples shutter stop impulse from magnesium camera body & 5-axis IBIS sensor!
    for (const [bx, by] of [
      [frameCenterX - frameW / 2 + 2.5, frameH / 2 - 2.5],
      [frameCenterX + frameW / 2 - 2.5, frameH / 2 - 2.5],
      [frameCenterX - frameW / 2 + 2.5, -frameH / 2 + 2.5],
      [frameCenterX + frameW / 2 - 2.5, -frameH / 2 + 2.5],
    ] as Array<[number, number]>) {
      const bushGeo = new THREE.CylinderGeometry(3.2, 3.2, 2.4, 22);
      bushGeo.rotateX(Math.PI / 2);
      const bush = new THREE.Mesh(bushGeo, mats.antiVibRubber);
      bush.position.set(bx, by, 0);
      g.add(bush);

      const sleeveGeo = new THREE.CylinderGeometry(1.65, 1.65, 2.65, 18);
      sleeveGeo.rotateX(Math.PI / 2);
      const sleeve = new THREE.Mesh(sleeveGeo, mats.brassGear);
      sleeve.position.set(bx, by, 0);
      g.add(sleeve);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-base-damper',
        12,
        '#c44536',
        g,
        new THREE.Vector3(0, 0, 10.8),
        new THREE.Vector3(0, 0, -37.0),
        new THREE.Vector3(0, 0, 15.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // PARALLELOGRAM KINEMATICS ENGINE FOR LIVE SLIT EXPOSURE & COCKING CYCLE
  // =========================================================================
  const slitState: ShutterDynamicRig['slitState'] = {
    curtain1EdgeY: -2.2,
    curtain2EdgeY: 4.8,
    phaseLabel: 'slit',
    boostActive: false,
    irTrigger1: false,
    irTrigger2: false,
  };

  /**
   * Position 4 telescoping blades for a curtain:
   * - For 1st curtain (travels top -> bottom to OPEN):
   *   p = 0 -> fully closed across aperture (blade 0 top edge at +13.0, blades cover [-13..+13])
   *   p = 1 -> fully folded into bottom pocket (all 4 blades neatly stacked around y = -17.5)
   */
  const positionCurtain1 = (p: number) => {
    const clamped = THREE.MathUtils.clamp(p, 0, 1);
    // Blade 0 is the top slit-forming blade; blades 1,2,3 telescope beneath it into bottom pocket
    const topTargetsClosed = [9.5, 3.2, -3.1, -9.4];
    const pocketY = -17.6;
    for (let i = 0; i < 4; i++) {
      const y = THREE.MathUtils.lerp(topTargetsClosed[i], pocketY - i * 0.35, clamped);
      curtain1Blades[i].position.y = y;
    }
    // Parallelogram link rotation tracks travel seamlessly
    const angle = THREE.MathUtils.lerp(0.56, -0.62, clamped);
    link1Main.rotation.z = angle;
    link1Sub.rotation.z = angle;
    // Slit lower boundary = top edge of blade 0
    return curtain1Blades[0].position.y + 3.7;
  };

  /**
   * Position 4 telescoping blades for 2nd curtain (travels top -> bottom to CLOSE):
   *   p = 0 -> fully folded into top pocket (all 4 blades neatly stacked around y = +17.6)
   *   p = 1 -> fully closed across aperture (blade 0 bottom edge reaches -13.1)
   */
  const positionCurtain2 = (p: number) => {
    const clamped = THREE.MathUtils.clamp(p, 0, 1);
    const closedY = [-9.4, -3.1, 3.2, 9.5];
    const pocketY = 17.6;
    for (let i = 0; i < 4; i++) {
      const y = THREE.MathUtils.lerp(pocketY + i * 0.35, closedY[i], clamped);
      curtain2Blades[i].position.y = y;
    }
    const angle = THREE.MathUtils.lerp(0.62, -0.56, clamped);
    link2Main.rotation.z = angle;
    link2Sub.rotation.z = angle;
    // Slit upper boundary = bottom edge of blade 0
    return curtain2Blades[0].position.y - 3.7;
  };

  const applyKinematics = (elapsed: number, physicsActive: boolean) => {
    if (!physicsActive) {
      // Iconic static showcase pose: mid high-speed slit exposure (~1/2000s equivalent)!
      // Instantly teaches beginners how 1st curtain opens downward while 2nd curtain chases behind it
      // leaving a crisp horizontal light slit right across the full-frame aperture!
      const c1Edge = positionCurtain1(0.56);
      const c2Edge = positionCurtain2(0.36);
      slitState.curtain1EdgeY = c1Edge;
      slitState.curtain2EdgeY = c2Edge;
      slitState.phaseLabel = 'slit';
      slitState.boostActive = false;
      slitState.irTrigger1 = false;
      slitState.irTrigger2 = false;

      (dualBoostCoilGlow.material as THREE.MeshBasicMaterial).opacity = 0;
      (magnet1Glow.material as THREE.MeshBasicMaterial).opacity = 0;
      (magnet2Glow.material as THREE.MeshBasicMaterial).opacity = 0;
      return;
    }

    // Slow-motion educational 7.0-second cycle (phase-shifted +1.6s so startup opens right in mid-slit scan!):
    // 0.00 - 0.64: Extended Slow-Motion Slit Exposure! 1st curtain opens downward, 2nd chases -> glowing slit scans frame!
    // 0.64 - 0.72: Exposure Complete / Damper Braking (Curtain 2 closed, Curtain 1 in bottom pocket)
    // 0.72 - 0.92: Coreless DC Motor & Gears spin to cock/rewind both curtains overlapped (light-tight) back to ready!
    // 0.92 - 1.00: Ready / Holding Magnets Energized
    const cycle = ((elapsed + 1.6) % 7.0) / 7.0;
    let p1 = 0;
    let p2 = 0;
    let boost = false;
    let mag1 = 0.85;
    let mag2 = 0.85;

    if (cycle < 0.64) {
      // Smooth S-curve acceleration matching spring + electromagnetic boost kinematics
      const t1 = THREE.MathUtils.clamp(cycle / 0.48, 0, 1);
      const t2 = THREE.MathUtils.clamp((cycle - 0.14) / 0.48, 0, 1);
      p1 = t1 * t1 * (3 - 2 * t1);
      p2 = t2 * t2 * (3 - 2 * t2);
      mag1 = 0;
      mag2 = t2 > 0 ? 0 : 0.9;
      boost = t1 > 0.02 && t1 < 0.9;
      slitState.phaseLabel = 'slit';
    } else if (cycle < 0.72) {
      p1 = 1;
      p2 = 1;
      mag1 = 0;
      mag2 = 0;
      slitState.phaseLabel = 'closed';
    } else if (cycle < 0.92) {
      // Motorized high-speed recocking / charging phase (curtains overlap so zero light leaks!)
      const tc = THREE.MathUtils.clamp((cycle - 0.72) / 0.20, 0, 1);
      const ease = tc * tc * (3 - 2 * tc);
      p1 = 1 - ease;
      p2 = THREE.MathUtils.clamp(1 - ease + 0.14 * Math.sin(tc * Math.PI), 0, 1);
      mag1 = tc > 0.82 ? 0.85 : 0;
      mag2 = tc > 0.82 ? 0.85 : 0;
      slitState.phaseLabel = 'charging';

      // Spin reduction gears & cocking cam visibly during recocking!
      const spin = ease * Math.PI * 6;
      chargeGears[0].rotation.z = spin;
      chargeGears[1].rotation.z = -spin * 1.25;
      chargeGears[2].rotation.z = spin * 0.85;
      chargeGears[3].rotation.z = -spin * 0.95;
      chargeCam.rotation.z = ease * Math.PI * 2;
    } else {
      p1 = 0;
      p2 = 0;
      slitState.phaseLabel = 'closed';
    }

    const c1Edge = positionCurtain1(p1);
    const c2Edge = positionCurtain2(p2);
    slitState.curtain1EdgeY = c1Edge;
    slitState.curtain2EdgeY = c2Edge;
    slitState.boostActive = boost;
    slitState.irTrigger1 = Math.abs(c1Edge - 10.6) < 2.2 || Math.abs(c1Edge + 10.6) < 2.2;
    slitState.irTrigger2 = Math.abs(c2Edge - 10.6) < 2.2 || Math.abs(c2Edge + 10.6) < 2.2;

    (dualBoostCoilGlow.material as THREE.MeshBasicMaterial).opacity = boost
      ? 0.55 + Math.sin(elapsed * 28) * 0.3
      : 0;
    (magnet1Glow.material as THREE.MeshBasicMaterial).opacity = mag1;
    (magnet2Glow.material as THREE.MeshBasicMaterial).opacity = mag2;
  };

  // Initialize default showcase slit pose immediately
  applyKinematics(0, false);

  return {
    parts,
    rig: {
      curtain1Blades,
      curtain2Blades,
      link1Main,
      link1Sub,
      link2Main,
      link2Sub,
      shieldBlades,
      chargeGears,
      chargeCam,
      dualBoostCoilGlow,
      magnet1Glow,
      magnet2Glow,
      slitState,
      applyKinematics,
    },
  };
}
