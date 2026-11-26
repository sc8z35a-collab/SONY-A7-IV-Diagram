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
  createSpurGearGeometry,
  createTorsionSpringGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';

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
  counterweightLever: THREE.Group;
  armatureLever1: THREE.Group;
  armatureLever2: THREE.Group;
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
    explanation: lazyExplanationStub(id),
  };
}

/**
 * Build ALL 26 ultra-dissected watchmaker-grade CAD sub-assemblies of a modern flagship
 * Dual-Driven Carbon-Fiber Vertical-Travel Focal-Plane Shutter (z = +10.8 .. +17.6 mm):
 *  - SH01: Front Protective Cover Plate & Drive-Bay Window
 *  - SH02: 3-Blade Power-Off Anti-Dust Protective Sensor Shield Curtain
 *  - SH03: Dedicated Dust-Shield Micro-Stepper Actuator & POM Rack-Cam (NEW!)
 *  - SH04: 1st Curtain — 4 Ultra-Thin Carbon Fiber (CFRP) Blades
 *  - SH05: 1st Curtain Low-Friction POM Anti-Flutter Guide Tracks & Rollers (NEW!)
 *  - SH06: 1st Curtain Parallelogram 4-Bar Linkage Arms
 *  - SH07: DLC-Coated Pivot Spindles, Sintered Bronze Bushings & E-Clips (NEW!)
 *  - SH08: 0.15 mm Ultra-Thin Steel Mid-Plate Partition
 *  - SH09: 2nd Curtain — 4 Slit-Closing CFRP Blades
 *  - SH10: 2nd Curtain Slit-Parallelism Guide Rails & Light-Trap Lip (NEW!)
 *  - SH11: 2nd Curtain Parallelogram 4-Bar Linkage Arms
 *  - SH12: Twin Torsion Springs & Brass Vernier Tension-Adjuster Worm Drums (NEW!)
 *  - SH13: 1/400 s Flash-Sync Electromagnetic Boost Actuator (Coil + Yoke + Rotor)
 *  - SH14: Counter-Rotating CuW Inertial Counterweight Balancer Lever (NEW!)
 *  - SH15: Twin Microsecond Holding Electromagnets (Permalloy U-Core Solenoids)
 *  - SH16: 10-Microsecond Curtain Latch Armature Levers & Release Springs (NEW!)
 *  - SH17: 4-Stage POM/Brass Reduction Gear Train & One-Way Sprag Clutch (NEW!)
 *  - SH18: 500,000-Cycle Coreless DC Charge Motor & Brass Pinion
 *  - SH19: Heart-Profile Eccentric Cocking Cam & Twin Charging Rockers (NEW!)
 *  - SH20: Cocking-Completion Rotary Cam Home-Position Leaf Switch & Disc (NEW!)
 *  - SH21: Self-Diagnostic 940 nm IR Photo-Interrupter Optical Speed Monitors
 *  - SH22: Dual High-Hysteresis Elastomer Blade-Bounce Brakes & Shoes (NEW!)
 *  - SH23: Linkage End-Stop Kinetic Silicone Air-Dashpot Cylinders (NEW!)
 *  - SH24: High-Current Solenoid/Boost FPC Harness & Flyback Diodes (NEW!)
 *  - SH25: 4-Corner Floating Viscoelastic Silicone Isolation Grommets (NEW!)
 *  - SH26: Glass-Fiber Reinforced PPS/Magnesium High-Rigidity Base Chassis
 */
export function buildShutterParts(
  mats: MaterialLibrary,
  _includeStandalone = true
): { parts: CadPart[]; rig: ShutterDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const frameW = 74.0;
  const frameH = 54.0;
  const frameCenterX = 7.5;
  const apW = 37.6;
  const apH = 25.6;

  // Dynamic rig references
  const curtain1Blades: THREE.Mesh[] = [];
  const curtain2Blades: THREE.Mesh[] = [];
  const shieldBlades: THREE.Mesh[] = [];
  const chargeGears: THREE.Mesh[] = [];
  const link1Main = new THREE.Group();
  const link1Sub = new THREE.Group();
  const link2Main = new THREE.Group();
  const link2Sub = new THREE.Group();
  const chargeCam = new THREE.Group();
  const counterweightLever = new THREE.Group();
  const armatureLever1 = new THREE.Group();
  const armatureLever2 = new THREE.Group();

  // =========================================================================
  // SH01. Front Protective Cover Plate & Matte Baffle Frame (z = +17.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const coverShape = createFrameShape(frameW, frameH, 4.2, apW, apH, 0.9, -frameCenterX, 0);
    const bayW = 20.4;
    const bayH = 42.0;
    const bayCx = 23.2;
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

    addCircleHoles(coverShape, [
      [-frameW / 2 + 4.5, frameH / 2 - 4.5, 1.5],
      [frameW / 2 - 4.5, frameH / 2 - 4.5, 1.5],
      [-frameW / 2 + 4.5, -frameH / 2 + 4.5, 1.5],
      [frameW / 2 - 4.5, -frameH / 2 + 4.5, 1.5],
    ]);
    const coverMesh = new THREE.Mesh(
      extrudeCentered(coverShape, 0.72, 0.08, 0.08, 18),
      mats.matteBlackAnodized
    );
    coverMesh.position.x = frameCenterX;
    g.add(coverMesh);

    const lipShape = createFrameShape(apW + 3.2, apH + 3.2, 1.2, apW, apH, 0.8);
    const lipMesh = new THREE.Mesh(
      extrudeCentered(lipShape, 0.45, 0.06, 0.08, 14),
      mats.matteBlackAnodized
    );
    lipMesh.position.z = 0.36;
    g.add(lipMesh);

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
        new THREE.Vector3(0, 0, 56.0),
        new THREE.Vector3(0, 0, 96.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH02. Dedicated Anti-Dust Protective Sensor Shield Curtain (z = +16.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const railL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 38.0, 0.62), mats.midPlateSteel);
    railL.position.set(-20.4, 2.0, 0);
    const railR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 38.0, 0.62), mats.midPlateSteel);
    railR.position.set(20.4, 2.0, 0);
    g.add(railL, railR);

    for (let i = 0; i < 3; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(39.4, 8.6, 0.16), mats.shutterShieldBlade);
      blade.position.set(0, 18.2 - i * 1.15, (1 - i) * 0.19);
      g.add(blade);
      shieldBlades.push(blade);
    }

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
        new THREE.Vector3(0, 0, 46.0),
        new THREE.Vector3(0, 0, 88.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH03. [NEW!] Dedicated Dust-Shield Micro-Stepper & POM Rack-Cam (z = +16.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mini cylindrical 2-phase shield stepper mounted at upper +X corner (x=25.5, y=21.2)
    const stepCan = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 6.2, 16).rotateZ(Math.PI / 2),
      mats.copperCoil
    );
    stepCan.position.set(28.5, 21.2, 0);
    g.add(stepCan);

    const stepCap = new THREE.Mesh(
      new THREE.CylinderGeometry(2.75, 2.75, 1.0, 16).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    stepCap.position.set(31.8, 21.2, 0);
    g.add(stepCap);

    // Brass pinion + POM vertical toothed rack bar driving dust-shield tab
    const pinion = new THREE.Mesh(createSpurGearGeometry(10, 1.5, 1.4, 0.5), mats.brassGear);
    pinion.position.set(24.6, 21.2, 0.2);
    g.add(pinion);

    const rackBar = new THREE.Mesh(new THREE.BoxGeometry(2.1, 11.5, 1.1), mats.pomGear);
    rackBar.position.set(22.4, 18.2, 0.2);
    g.add(rackBar);

    const limitSw = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 1.2), mats.icEpoxy);
    limitSw.position.set(25.2, 15.0, -0.3);
    g.add(limitSw);

    parts.push(
      finalizeShutterPart(
        'shutter-shield-actuator',
        3,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 16.4),
        new THREE.Vector3(28.0, 24.0, 42.0),
        new THREE.Vector3(28.0, 22.0, 86.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH04. 1st (Front) Curtain — 4 Ultra-Thin Carbon Fiber (CFRP) Blades (z = +15.3 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bladeW = 41.2;
    const bladeH = 7.4;
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(bladeW, bladeH, 0.15), mats.carbonFiberBlade);
      blade.position.set(0.6, 0, (1.5 - i) * 0.17);

      if (i === 0) {
        const bead = new THREE.Mesh(new THREE.BoxGeometry(bladeW, 0.55, 0.22), mats.stainlessMachined);
        bead.position.set(0, bladeH / 2 - 0.28, 0.02);
        blade.add(bead);
      }

      const rivetGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.34, 10);
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
        4,
        '#1f242d',
        g,
        new THREE.Vector3(0, 0, 15.3),
        new THREE.Vector3(0, 0, 34.0),
        new THREE.Vector3(0, 0, 78.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH05. [NEW!] 1st Curtain Low-Friction POM Anti-Flutter Guide Tracks (z = +15.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left-side (-X) slotted POM labyrinth rail + top/bottom pocket bridges
    const leftRail = new THREE.Mesh(new THREE.BoxGeometry(2.6, 40.5, 0.88), mats.pomGear);
    leftRail.position.set(-21.2, 0, 0);
    g.add(leftRail);

    // Light-trap black labyrinth groove channel on left rail inner edge
    const trapLip = new THREE.Mesh(new THREE.BoxGeometry(1.0, 38.0, 1.05), mats.mountVelvetBaffle);
    trapLip.position.set(-19.8, 0, 0);
    g.add(trapLip);

    // 4 micro titanium anti-flutter guide rollers along the vertical rail
    for (const ry of [-13.5, -4.5, 4.5, 13.5]) {
      const roller = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.75, 1.2, 12).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      roller.position.set(-21.2, ry, 0);
      g.add(roller);
    }

    // Upper & lower thin POM tie-bars holding rail spacing cleanly
    for (const ty of [20.4, -20.4]) {
      const tie = new THREE.Mesh(new THREE.BoxGeometry(22.0, 1.2, 0.65), mats.pomGear);
      tie.position.set(-10.5, ty, 0);
      g.add(tie);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-curtain1-guide',
        5,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 0, 15.2),
        new THREE.Vector3(-26.0, 0, 30.0),
        new THREE.Vector3(-24.0, 0, 75.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH06. 1st Curtain Parallelogram 4-Bar Linkage Arms (z = +14.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const buildLinkArm = (length: number, width: number) => {
      const armGrp = new THREE.Group();
      const shape = createRoundedRectShape(length, width, width * 0.45);
      const geo = extrudeCentered(shape, 0.38, 0.04, 0.04, 12);
      geo.translate(-length / 2 + 1.4, 0, 0);
      armGrp.add(new THREE.Mesh(geo, mats.linkArmSteel));

      for (let k = 1; k <= 3; k++) {
        const pinGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.56, 10);
        pinGeo.rotateX(Math.PI / 2);
        const pin = new THREE.Mesh(pinGeo, mats.brassGear);
        pin.position.set(-k * (length / 4.2), 0, 0);
        armGrp.add(pin);
      }

      const bossGeo = new THREE.CylinderGeometry(1.45, 1.45, 0.72, 14);
      bossGeo.rotateX(Math.PI / 2);
      armGrp.add(new THREE.Mesh(bossGeo, mats.brassGear));
      return armGrp;
    };

    link1Main.add(buildLinkArm(14.5, 2.3));
    link1Main.position.set(27.0, 2.8, 0.14);
    link1Sub.add(buildLinkArm(14.5, 2.0));
    link1Sub.position.set(27.0, -3.2, -0.14);
    g.add(link1Main, link1Sub);

    parts.push(
      finalizeShutterPart(
        'shutter-link-1',
        6,
        '#adb8c7',
        g,
        new THREE.Vector3(0, 0, 14.8),
        new THREE.Vector3(0, 0, 24.0),
        new THREE.Vector3(0, 0, 70.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH07. [NEW!] DLC-Coated Pivot Spindles, Sintered Bronze Bushings & E-Clips (z = +14.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pivotCoords: Array<[number, number]> = [
      [27.0, 6.2],
      [27.0, 2.8],
      [27.0, 0.2],
      [27.0, -3.2],
    ];
    for (const [px, py] of pivotCoords) {
      // DLC-blackened hardened pivot axle pin
      const axle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.75, 4.2, 14).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      axle.position.set(px, py, -0.8);
      g.add(axle);

      // Porous sintered bronze journal bushing collar
      const bush = new THREE.Mesh(
        new THREE.CylinderGeometry(1.38, 1.38, 1.4, 14).rotateX(Math.PI / 2),
        mats.brassGear
      );
      bush.position.set(px, py, -0.4);
      g.add(bush);

      // Stainless E-Clip retaining circlip on front (+Z) end
      const eClip = new THREE.Mesh(
        new THREE.TorusGeometry(1.15, 0.22, 8, 18, Math.PI * 1.6),
        mats.stainlessMachined
      );
      eClip.position.set(px, py, 1.15);
      eClip.userData.noEdges = true;
      g.add(eClip);
    }

    // Thin stainless alignment carrier bar keeping all 4 spindles indexed
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(1.4, 11.8, 0.45), mats.stainlessMachined);
    bridge.position.set(27.0, 1.5, -2.5);
    g.add(bridge);

    parts.push(
      finalizeShutterPart(
        'shutter-pivot-jewels',
        7,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 14.4),
        new THREE.Vector3(26.0, 10.0, 18.0),
        new THREE.Vector3(24.0, 12.0, 66.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH08. Intermediate Partition Plate (Mid-Plate Separator) (z = +14.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const midShape = createFrameShape(66.0, 48.0, 3.0, apW - 0.2, apH - 0.2, 0.7, -4.5, 0);
    const slot = new THREE.Path();
    slot.moveTo(20.5, -15.0);
    slot.lineTo(27.5, -15.0);
    slot.lineTo(27.5, 15.0);
    slot.lineTo(20.5, 15.0);
    slot.closePath();
    midShape.holes.push(slot);

    const midMesh = new THREE.Mesh(
      extrudeCentered(midShape, 0.28, 0.03, 0.03, 14),
      mats.midPlateSteel
    );
    midMesh.position.x = 4.5;
    g.add(midMesh);

    for (const ry of [14.2, -14.2]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(36.0, 0.8, 0.42), mats.matteBlackAnodized);
      rib.position.set(0, ry, 0);
      g.add(rib);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-mid-plate',
        8,
        '#4e5868',
        g,
        new THREE.Vector3(0, 0, 14.0),
        new THREE.Vector3(0, 0, 12.0),
        new THREE.Vector3(0, 0, 62.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH09. 2nd (Rear) Curtain — 4 Slit-Closing CFRP Blades (z = +12.9 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bladeW = 41.2;
    const bladeH = 7.4;
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(bladeW, bladeH, 0.15),
        mats.carbonFiberBladeRear
      );
      blade.position.set(0.6, 0, (1.5 - i) * 0.17);

      if (i === 0) {
        const bead = new THREE.Mesh(new THREE.BoxGeometry(bladeW, 0.55, 0.22), mats.goldPlating);
        bead.position.set(0, -bladeH / 2 + 0.28, 0.02);
        blade.add(bead);
      }

      const rivetGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.34, 10);
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
        9,
        '#56657c',
        g,
        new THREE.Vector3(0, 0, 12.9),
        new THREE.Vector3(0, 0, 2.0),
        new THREE.Vector3(0, 0, 54.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH10. [NEW!] 2nd Curtain Precision Slit-Parallelism Guide Rails (z = +12.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const railL = new THREE.Mesh(new THREE.BoxGeometry(2.4, 40.0, 0.85), mats.shutterChassis);
    railL.position.set(-21.2, 0, 0);
    g.add(railL);

    // Anti-static micro-contact ribs preventing thin blade static stiction
    for (const ry of [-14.0, -7.0, 0, 7.0, 14.0]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.6, 1.05), mats.brassGear);
      rib.position.set(-19.9, ry, 0);
      g.add(rib);
    }

    // Upper pocket light-tight velvet labyrinth lip
    const upperTrap = new THREE.Mesh(new THREE.BoxGeometry(39.0, 1.4, 0.9), mats.mountVelvetBaffle);
    upperTrap.position.set(-1.5, 14.8, -0.2);
    g.add(upperTrap);

    parts.push(
      finalizeShutterPart(
        'shutter-curtain2-guide',
        10,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 12.8),
        new THREE.Vector3(-26.0, 0, -4.0),
        new THREE.Vector3(-24.0, 0, 51.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH11. 2nd Curtain Parallelogram 4-Bar Linkage Arms (z = +12.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const buildRearArm = (length: number, width: number) => {
      const armGrp = new THREE.Group();
      const shape = createRoundedRectShape(length, width, width * 0.45);
      const geo = extrudeCentered(shape, 0.38, 0.04, 0.04, 12);
      geo.translate(-length / 2 + 1.4, 0, 0);
      armGrp.add(new THREE.Mesh(geo, mats.stainlessMachined));

      for (let k = 1; k <= 3; k++) {
        const pinGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.56, 10);
        pinGeo.rotateX(Math.PI / 2);
        const pin = new THREE.Mesh(pinGeo, mats.goldPlating);
        pin.position.set(-k * (length / 4.2), 0, 0);
        armGrp.add(pin);
      }

      const bossGeo = new THREE.CylinderGeometry(1.45, 1.45, 0.72, 14);
      bossGeo.rotateX(Math.PI / 2);
      armGrp.add(new THREE.Mesh(bossGeo, mats.goldPlating));
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
        11,
        '#8c99ab',
        g,
        new THREE.Vector3(0, 0, 12.4),
        new THREE.Vector3(0, 0, -10.0),
        new THREE.Vector3(0, 0, 46.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH12. [NEW!] Twin High-Tension Torsion Springs & Brass Vernier Adjuster Drums (z = +13.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sy of [3.0, -5.2]) {
      const spring = new THREE.Mesh(
        createTorsionSpringGeometry(2.6, 2.8, 4.5, 0.32, 4.8),
        mats.stainlessMachined
      );
      spring.position.set(27.0, sy, 0.3);
      spring.userData.noEdges = true;
      g.add(spring);

      // Precision brass vernier tension calibration ratchet drum
      const ratchet = new THREE.Mesh(
        createSpurGearGeometry(14, 3.1, 1.0, 1.1),
        mats.brassGear
      );
      ratchet.position.set(27.0, sy, -1.35);
      g.add(ratchet);

      // Calibration lock pawl tab indexing the tension drum
      const pawl = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.85, 0.9), mats.mountSpringSteel);
      pawl.position.set(30.4, sy + 1.6, -1.35);
      pawl.rotation.z = -0.35;
      g.add(pawl);

      const axle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 4.2, 12).rotateX(Math.PI / 2),
        mats.linkArmSteel
      );
      axle.position.set(27.0, sy, -0.2);
      g.add(axle);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-tension-drums',
        12,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 13.0),
        new THREE.Vector3(22.0, 10.0, -12.0),
        new THREE.Vector3(22.0, 8.0, 44.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH13. 1/400 s Flash-Sync Electromagnetic Boost Actuator (Coil + Yoke + Rotor, z = +13.0 mm)
  // =========================================================================
  let dualBoostCoilGlow!: THREE.Mesh;
  {
    const g = new THREE.Group();
    const statorYoke = new THREE.Mesh(new THREE.BoxGeometry(8.2, 9.6, 2.8), mats.softIronYoke);
    statorYoke.position.set(36.2, -1.0, 0);
    g.add(statorYoke);

    const boostCoil = new THREE.Mesh(
      new THREE.CylinderGeometry(3.4, 3.4, 3.3, 22).rotateX(Math.PI / 2),
      mats.copperCoil
    );
    boostCoil.position.set(36.2, -1.0, 0);
    g.add(boostCoil);

    const rotor = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.1, 3.8, 16).rotateX(Math.PI / 2),
      mats.neodymiumMagnet
    );
    rotor.position.set(36.2, -1.0, 0);
    g.add(rotor);

    dualBoostCoilGlow = new THREE.Mesh(
      new THREE.TorusGeometry(3.9, 0.24, 10, 28),
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
        13,
        '#c86432',
        g,
        new THREE.Vector3(0, 0, 13.0),
        new THREE.Vector3(38.0, 2.0, -14.0),
        new THREE.Vector3(36.0, 2.0, 42.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH14. [NEW!] Counter-Rotating CuW Inertial Counterweight Balancer Lever (z = +13.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    counterweightLever.position.set(31.2, -6.0, 0);

    // Pivot pinion gear meshing counter-phase with curtain drive
    const cwGear = new THREE.Mesh(createSpurGearGeometry(12, 2.1, 1.1, 0.7), mats.stainlessMachined);
    counterweightLever.add(cwGear);

    // Lightweight steel lever arm extending out to dense Tungsten-Copper (CuW) counterbalance head
    const cwArm = new THREE.Mesh(new THREE.BoxGeometry(1.8, 9.2, 0.9), mats.linkArmSteel);
    cwArm.position.set(0, 4.6, 0.4);
    counterweightLever.add(cwArm);

    // High-density Tungsten-Copper (CuW) inertial mass block canceling curtain recoil!
    const cwMass = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.8, 4.2, 1.2), 1.9, 0.12, 0.12, 12),
      mats.tungstenCopper
    );
    cwMass.position.set(0, 9.4, 0.4);
    counterweightLever.add(cwMass);

    g.add(counterweightLever);

    parts.push(
      finalizeShutterPart(
        'shutter-counterweight',
        14,
        '#b45309',
        g,
        new THREE.Vector3(0, 0, 13.2),
        new THREE.Vector3(28.0, -12.0, -6.0),
        new THREE.Vector3(28.0, -12.0, 48.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH15. Microsecond Twin Holding Electromagnets (Permalloy U-Core Solenoids, z = +12.5 mm)
  // =========================================================================
  let magnet1Glow!: THREE.Mesh;
  let magnet2Glow!: THREE.Mesh;
  {
    const g = new THREE.Group();
    const buildSolenoid = (x: number, y: number) => {
      const sub = new THREE.Group();
      sub.position.set(x, y, 0);

      const coreBase = new THREE.Mesh(new THREE.BoxGeometry(6.8, 2.2, 2.4), mats.softIronYoke);
      coreBase.position.set(0, 2.6, 0);
      const legL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.2, 2.2), mats.softIronYoke);
      legL.position.set(-2.3, 0, 0);
      const legR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.2, 2.2), mats.softIronYoke);
      legR.position.set(2.3, 0, 0);
      sub.add(coreBase, legL, legR);

      const bobL = new THREE.Mesh(new THREE.BoxGeometry(2.7, 3.6, 2.9), mats.copperCoil);
      bobL.position.set(-2.3, 0.2, 0);
      const bobR = new THREE.Mesh(new THREE.BoxGeometry(2.7, 3.6, 2.9), mats.copperCoil);
      bobR.position.set(2.3, 0.2, 0);
      sub.add(bobL, bobR);

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.62, 10, 8),
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
    g.add(m1.sub, m2.sub);

    parts.push(
      finalizeShutterPart(
        'shutter-magnets',
        15,
        '#d97724',
        g,
        new THREE.Vector3(0, 0, 12.5),
        new THREE.Vector3(24.0, 22.0, -22.0),
        new THREE.Vector3(22.0, 18.0, 36.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH16. [NEW!] 10-Microsecond Curtain Latch Armature Levers & Release Springs (z = +12.5 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const buildArmatureUnit = (target: THREE.Group, x: number, y: number) => {
      target.position.set(x, y, 0);
      // Mirror-lapped flat ferromagnetic armature bar mating against solenoid pole legs
      const plate = new THREE.Mesh(new THREE.BoxGeometry(7.2, 1.15, 2.0), mats.mountStainlessFlange);
      plate.position.set(0, 0, 0);
      target.add(plate);

      // Pivoted trigger latch tail hooking onto curtain drive drum
      const hook = new THREE.Mesh(new THREE.BoxGeometry(1.5, 4.4, 1.2), mats.linkArmSteel);
      hook.position.set(-3.2, -2.1, 0);
      target.add(hook);

      // Micro zero-bounce separation helical spring
      const sepSpring = new THREE.Mesh(
        createHelicalSpringGeometry(0.65, 2.2, 4, 0.16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      sepSpring.position.set(2.4, -1.4, 0);
      sepSpring.userData.noEdges = true;
      target.add(sepSpring);
    };

    buildArmatureUnit(armatureLever1, 26.5, 13.3);
    buildArmatureUnit(armatureLever2, 36.0, 13.3);
    g.add(armatureLever1, armatureLever2);

    parts.push(
      finalizeShutterPart(
        'shutter-armature-levers',
        16,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 12.5),
        new THREE.Vector3(38.0, 22.0, -18.0),
        new THREE.Vector3(36.0, 18.0, 39.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH17. [NEW!] 4-Stage POM/Brass Reduction Gear Train & One-Way Clutch (z = +12.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
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

      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.75, 2.2, 10).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      pin.position.set(gd.x, gd.y, gd.z);
      g.add(pin);
    }

    // One-way anti-reverse sprag clutch hub collar seated on output shaft
    const clutchHub = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.1, 1.3, 14).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    clutchHub.position.set(22.8, -21.0, -1.2);
    g.add(clutchHub);

    parts.push(
      finalizeShutterPart(
        'shutter-charge-gears',
        17,
        '#facc15',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(24.0, -18.0, -26.0),
        new THREE.Vector3(22.0, -16.0, 31.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH18. 500,000-Cycle High-Response Coreless DC Charge Motor & Pinion (z = +12.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const motorCan = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 4.4, 13.5, 22),
      mats.stainlessMachined
    );
    motorCan.position.set(36.2, -16.8, 0);
    g.add(motorCan);

    const endCap = new THREE.Mesh(new THREE.CylinderGeometry(4.3, 4.3, 1.8, 22), mats.icEpoxy);
    endCap.position.set(36.2, -24.1, 0);
    g.add(endCap);

    for (const tx of [34.8, 37.6]) {
      const term = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.4), mats.goldPlating);
      term.position.set(tx, -25.4, 0);
      g.add(term);
    }

    const pinion = new THREE.Mesh(createSpurGearGeometry(10, 1.8, 3.0, 0.6), mats.brassGear);
    pinion.rotation.x = Math.PI / 2;
    pinion.position.set(36.2, -8.5, 0);
    g.add(pinion);

    parts.push(
      finalizeShutterPart(
        'shutter-charge-motor',
        18,
        '#d4a948',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(44.0, -14.0, -28.0),
        new THREE.Vector3(42.0, -12.0, 29.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH19. [NEW!] Heart-Profile Eccentric Cocking Cam & Twin Charging Rockers (z = +12.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const camShape = new THREE.Shape();
    camShape.absarc(0, 0, 2.7, 0, Math.PI * 1.4, false);
    camShape.lineTo(4.0, -1.9);
    camShape.lineTo(2.7, 0);
    const camMesh = new THREE.Mesh(
      extrudeCentered(camShape, 1.35, 0.06, 0.06, 18),
      mats.brassGear
    );

    const leverArm1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 9.2, 0.55), mats.linkArmSteel);
    leverArm1.position.set(0.4, 4.6, 0.72);
    const leverArm2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 7.6, 0.55), mats.stainlessMachined);
    leverArm2.position.set(2.4, 3.6, 1.25);
    leverArm2.rotation.z = -0.18;

    chargeCam.add(camMesh, leverArm1, leverArm2);
    chargeCam.position.set(22.8, -21.0, 0.8);
    g.add(chargeCam);

    parts.push(
      finalizeShutterPart(
        'shutter-cocking-cam',
        19,
        '#ca8a04',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(16.0, -26.0, -20.0),
        new THREE.Vector3(16.0, -24.0, 35.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH20. [NEW!] Cocking-Completion Rotary Cam Home-Position Leaf Switch & Disc (z = +11.9 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Conductive timing encoder disc on back of cam shaft
    const encDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.2, 0.45, 20).rotateX(Math.PI / 2),
      mats.hdiMainboardPcb
    );
    encDisc.position.set(22.8, -21.0, -0.6);
    g.add(encDisc);

    // Gold sector contact trace arc on timing disc
    const goldArc = new THREE.Mesh(
      new THREE.TorusGeometry(2.3, 0.35, 6, 18, Math.PI * 1.25),
      mats.goldPlating
    );
    goldArc.position.set(22.8, -21.0, -0.35);
    goldArc.userData.noEdges = true;
    g.add(goldArc);

    // Dual phosphor-bronze wiping leaf contact fingers & PPS terminal block
    const swBlock = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.8, 1.4), mats.mountPpsInsulator);
    swBlock.position.set(27.8, -23.6, -0.6);
    g.add(swBlock);

    for (const dy of [-0.55, 0.55]) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.35, 0.35), mats.goldPlating);
      leaf.position.set(25.2, -22.2 + dy, -0.35);
      leaf.rotation.z = -0.32;
      g.add(leaf);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-cam-switch',
        20,
        '#16a34a',
        g,
        new THREE.Vector3(0, 0, 11.9),
        new THREE.Vector3(34.0, -28.0, -22.0),
        new THREE.Vector3(32.0, -26.0, 33.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH21. Self-Diagnostic 940 nm IR Photo-Interrupter Optical Speed Monitors (z = +11.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [px, py] of [
      [19.8, 10.6],
      [19.8, -10.6],
    ] as Array<[number, number]>) {
      const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.8, 2.2), mats.icEpoxy);
      body.position.set(px, py, 0);
      g.add(body);

      const led = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.5, 12), mats.irLedLens);
      led.rotation.z = Math.PI / 2;
      led.position.set(px - 1.75, py, 0.45);
      const rx = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.5, 12), mats.siliconBulk);
      rx.rotation.z = Math.PI / 2;
      rx.position.set(px - 1.75, py, -0.45);
      g.add(led, rx);
    }

    const fpcVert = new THREE.Mesh(new THREE.BoxGeometry(2.4, 24.5, 0.2), mats.polyimideFpc);
    fpcVert.position.set(21.4, 0, -0.85);
    g.add(fpcVert);

    parts.push(
      finalizeShutterPart(
        'shutter-optical-sensor',
        21,
        '#be123c',
        g,
        new THREE.Vector3(0, 0, 11.6),
        new THREE.Vector3(12.0, 4.0, -34.0),
        new THREE.Vector3(12.0, 4.0, 24.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH22. [NEW!] Dual High-Hysteresis Elastomer Blade-Bounce Brakes & Shoes (z = +11.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const by of [15.8, -15.8]) {
      const damperBlock = new THREE.Mesh(
        new THREE.BoxGeometry(22.0, 2.6, 2.4),
        mats.damperElastomer
      );
      damperBlock.position.set(0, by, 0.85);
      g.add(damperBlock);

      for (const sx of [-7.5, 7.5]) {
        const shoe = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.2, 2.7), mats.brassGear);
        shoe.position.set(sx, by, 0.95);
        g.add(shoe);
      }
    }

    parts.push(
      finalizeShutterPart(
        'shutter-blade-brakes',
        22,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, 11.4),
        new THREE.Vector3(0, 0, -24.0),
        new THREE.Vector3(0, 0, 34.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH23. [NEW!] Linkage End-Stop Kinetic Silicone Air-Dashpot Cylinders (z = +11.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [dx, dy] of [
      [32.5, 9.6],
      [32.5, -9.2],
    ] as Array<[number, number]>) {
      // Stainless micro air-dashpot cylinder barrel
      const cyl = new THREE.Mesh(
        new THREE.CylinderGeometry(1.75, 1.75, 4.8, 14),
        mats.stainlessMachined
      );
      cyl.position.set(dx, dy, 0.5);
      g.add(cyl);

      // Viscoelastic crimson silicone impact bumper tip facing moving link lever
      const tip = new THREE.Mesh(
        new THREE.CylinderGeometry(1.35, 1.35, 1.4, 12),
        mats.damperElastomer
      );
      tip.position.set(dx, dy + (dy > 0 ? -2.9 : 2.9), 0.5);
      g.add(tip);

      // Internal brass return spring visible through side cutout slot
      const spr = new THREE.Mesh(
        createHelicalSpringGeometry(0.95, 3.2, 4, 0.2).rotateX(Math.PI / 2),
        mats.brassGear
      );
      spr.position.set(dx, dy, 0.5);
      spr.userData.noEdges = true;
      g.add(spr);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-shock-piston',
        23,
        '#ec4899',
        g,
        new THREE.Vector3(0, 0, 11.4),
        new THREE.Vector3(42.0, 12.0, -28.0),
        new THREE.Vector3(40.0, 10.0, 26.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH24. [NEW!] High-Current Solenoid/Boost Driver FPC Harness & Flyback Diodes (z = +11.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main vertical high-current Kapton bus spanning magnets -> boost coil -> charge motor
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(5.6, 38.0, 0.28), mats.polyimideFpc);
    trunk.position.set(32.0, 0.5, -0.5);
    g.add(trunk);

    // Top mainboard ZIF tail & gold finger strip
    const topTail = new THREE.Mesh(new THREE.BoxGeometry(14.0, 6.2, 0.28), mats.polyimideFpc);
    topTail.position.set(27.0, 22.8, -0.5);
    g.add(topTail);

    const goldEnd = new THREE.Mesh(new THREE.BoxGeometry(2.2, 5.6, 0.32), mats.goldPlating);
    goldEnd.position.set(33.2, 22.8, -0.45);
    g.add(goldEnd);

    // 3 SMD fast-recovery Schottky flyback diodes clamping solenoid & boost back-EMF
    for (const dy of [15.0, 4.0, -8.5]) {
      const diode = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.5, 0.85), mats.icEpoxy);
      diode.position.set(32.0, dy, 0.05);
      g.add(diode);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-fpc-driver',
        24,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, 11.2),
        new THREE.Vector3(32.0, 28.0, -36.0),
        new THREE.Vector3(30.0, 24.0, 20.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH25. [NEW!] 4-Corner Floating Viscoelastic Silicone Isolation Grommets (z = +10.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [bx, by] of [
      [frameCenterX - frameW / 2 + 2.5, frameH / 2 - 2.5],
      [frameCenterX + frameW / 2 - 2.5, frameH / 2 - 2.5],
      [frameCenterX - frameW / 2 + 2.5, -frameH / 2 + 2.5],
      [frameCenterX + frameW / 2 - 2.5, -frameH / 2 + 2.5],
    ] as Array<[number, number]>) {
      const bush = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.2, 2.4, 20).rotateX(Math.PI / 2),
        mats.antiVibRubber
      );
      bush.position.set(bx, by, 0);
      g.add(bush);

      const sleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(1.65, 1.65, 2.65, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      sleeve.position.set(bx, by, 0);
      g.add(sleeve);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-floating-grommets',
        25,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, 10.8),
        new THREE.Vector3(0, 0, -40.0),
        new THREE.Vector3(0, 0, 19.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH26. High-Rigidity PPS/Magnesium Shutter Base Chassis Frame (z = +10.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseShape = createFrameShape(frameW + 2.0, frameH + 2.0, 4.6, apW, apH, 0.9, -frameCenterX, 0);
    const baseMesh = new THREE.Mesh(
      extrudeCentered(baseShape, 1.35, 0.12, 0.12, 18),
      mats.shutterChassis
    );
    baseMesh.position.x = frameCenterX;
    g.add(baseMesh);

    const wallR = new THREE.Mesh(new THREE.BoxGeometry(1.4, frameH - 4.0, 4.2), mats.shutterChassis);
    wallR.position.set(frameCenterX + frameW / 2 - 0.5, 0, 2.2);
    g.add(wallR);

    parts.push(
      finalizeShutterPart(
        'shutter-base-damper',
        26,
        '#c44536',
        g,
        new THREE.Vector3(0, 0, 10.8),
        new THREE.Vector3(0, 0, -48.0),
        new THREE.Vector3(0, 0, 14.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH27. [Phase 11] Drive-Bay Acoustic Stainless Lid & Permalloy EMI Shield (z = +18.35 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bayCx = frameCenterX + 23.2; // Aligned over right-side drive-bay window
    const lidShape = createRoundedRectShape(22.2, 43.8, 2.8);
    const lidPlate = new THREE.Mesh(
      extrudeCentered(lidShape, 0.58, 0.06, 0.06, 18),
      mats.matteBlackAnodized
    );
    lidPlate.position.set(bayCx, 0, 0);
    g.add(lidPlate);

    // Inner permalloy magnetic shield foil + open-cell acoustic damping foam pad
    const permalloy = new THREE.Mesh(
      new THREE.BoxGeometry(19.6, 39.6, 0.24),
      mats.lensPermalloyShield
    );
    permalloy.position.set(bayCx, 0, -0.36);
    const foam = new THREE.Mesh(new THREE.BoxGeometry(17.8, 36.2, 0.42), mats.lensFoamSeal);
    foam.position.set(bayCx, 0, -0.66);
    g.add(permalloy, foam);

    // 4 micro M1.2 stainless cover screws sealing drive bay
    for (const [sx, sy] of [
      [bayCx - 9.2, 19.6],
      [bayCx + 9.2, 19.6],
      [bayCx - 9.2, -19.6],
      [bayCx + 9.2, -19.6],
    ] as Array<[number, number]>) {
      const sc = createPrecisionScrew(1.05, 0.36, 1.0, mats.stainlessMachined);
      sc.position.set(sx, sy, 0.3);
      g.add(sc);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-drive-bay-cover',
        27,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 18.35),
        new THREE.Vector3(28.0, 0, 66.0),
        new THREE.Vector3(28.0, 0, 102.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH28. [Phase 11] 16x Ultralight Ti-6Al-4V Hollow Micro-Rivets & PTFE Washers (z = +14.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const rivetRowsY = [9.5, 3.2, -3.1, -9.4];
    for (let curtainIdx = 0; curtainIdx < 2; curtainIdx++) {
      const rz = curtainIdx === 0 ? 1.1 : -1.1;
      for (const ry of rivetRowsY) {
        for (const rx of [18.5, 20.6]) {
          // Hollow machined Ti-6Al-4V micro shoulder rivet
          const rivet = new THREE.Mesh(
            new THREE.CylinderGeometry(0.62, 0.62, 1.15, 14).rotateX(Math.PI / 2),
            mats.titaniumRivet
          );
          rivet.position.set(rx, ry, rz);
          // Hollow bore cap ring highlight
          const head = new THREE.Mesh(
            new THREE.TorusGeometry(0.45, 0.14, 8, 14),
            mats.titaniumRivet
          );
          head.position.set(rx, ry, rz + 0.56);
          head.userData.noEdges = true;
          // White self-lubricating PTFE thrust micro-washer
          const ptfe = new THREE.Mesh(
            new THREE.CylinderGeometry(0.95, 0.95, 0.22, 14).rotateX(Math.PI / 2),
            mats.zifIvoryPlastic
          );
          ptfe.position.set(rx, ry, rz - 0.12);
          g.add(rivet, head, ptfe);
        }
      }
    }

    parts.push(
      finalizeShutterPart(
        'shutter-blade-rivets',
        28,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 14.2),
        new THREE.Vector3(-26.0, 14.0, 26.0),
        new THREE.Vector3(-28.0, 14.0, 74.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH29. [Phase 11] Upper & Lower Blade-Storage Pocket Velvet Light-Trap Hoods (z = +14.1 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sy of [1, -1]) {
      const hood = new THREE.Mesh(new THREE.BoxGeometry(40.8, 5.2, 2.9), mats.velvetFlockTrap);
      hood.position.set(0, sy * 17.6, 0);
      g.add(hood);

      // Knife-edge overhang baffle lip facing the 36x24mm optical window
      const lip = new THREE.Mesh(new THREE.BoxGeometry(39.2, 1.3, 3.2), mats.matteBlackAnodized);
      lip.position.set(0, sy * 14.5, 0.15);
      g.add(lip);

      // Stepped sawtooth stray-light ribs inside pocket mouth
      for (const tz of [-0.85, 0, 0.85]) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(38.4, 0.45, 0.35), mats.velvetFlockTrap);
        rib.position.set(0, sy * 15.2, tz);
        g.add(rib);
      }
    }

    parts.push(
      finalizeShutterPart(
        'shutter-pocket-lighttrap',
        29,
        '#0f172a',
        g,
        new THREE.Vector3(0, 0, 14.1),
        new THREE.Vector3(0, 28.0, 20.0),
        new THREE.Vector3(0, 28.0, 68.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH30. [Phase 11] 1st/2nd Curtain Stainless Charging Catch Hooks & Pawls (z = +12.7 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [idx, oy] of [
      [0, -10.8],
      [1, -15.4],
    ] as Array<[number, number]>) {
      const hookArm = new THREE.Mesh(new THREE.BoxGeometry(8.8, 1.85, 0.72), mats.linkArmSteel);
      hookArm.position.set(24.6, oy, idx === 0 ? 0.5 : -0.5);
      hookArm.rotation.z = idx === 0 ? 0.22 : -0.18;

      const catchTip = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.8, 0.78), mats.titaniumRivet);
      catchTip.position.set(20.6, oy + (idx === 0 ? -0.9 : 0.8), idx === 0 ? 0.5 : -0.5);

      const roller = new THREE.Mesh(
        new THREE.CylinderGeometry(1.15, 1.15, 1.1, 14).rotateX(Math.PI / 2),
        mats.brassGear
      );
      roller.position.set(28.4, oy + (idx === 0 ? 0.7 : -0.6), idx === 0 ? 0.5 : -0.5);

      const biasSpr = new THREE.Mesh(
        createTorsionSpringGeometry(1.3, 1.4, 3, 0.22, 2.2),
        mats.beCuSpring
      );
      biasSpr.position.set(24.8, oy, idx === 0 ? 1.15 : -1.15);
      biasSpr.userData.noEdges = true;

      g.add(hookArm, catchTip, roller, biasSpr);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-curtain-hooks',
        30,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 12.7),
        new THREE.Vector3(30.0, -34.0, -10.0),
        new THREE.Vector3(30.0, -32.0, 44.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH31. [Phase 11] 1/400s Boost-Coil Copper Thermal Bridge & Shroud (z = +12.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const cuStrap = new THREE.Mesh(
      new THREE.BoxGeometry(9.6, 16.5, 0.65),
      mats.copperHeatSpreader
    );
    cuStrap.position.set(31.8, 12.6, 0.6);
    const cuWing = new THREE.Mesh(
      new THREE.BoxGeometry(8.2, 6.4, 0.65),
      mats.copperHeatSpreader
    );
    cuWing.position.set(39.4, 15.2, -0.4);
    cuWing.rotation.y = 0.26;
    // Pink silicone TIM interface block contacting holding solenoids & boost coil
    const timBlock = new THREE.Mesh(new THREE.BoxGeometry(8.2, 13.8, 0.85), mats.thermalPadPink);
    timBlock.position.set(31.8, 12.6, -0.1);
    // Thermal-transfer graphite tape tail wrapping toward body frame
    const tapeTail = new THREE.Mesh(
      new THREE.BoxGeometry(6.4, 11.2, 0.28),
      mats.thermalTransferTape
    );
    tapeTail.position.set(42.2, 15.2, -1.6);
    tapeTail.rotation.y = 0.45;
    g.add(cuStrap, cuWing, timBlock, tapeTail);

    parts.push(
      finalizeShutterPart(
        'shutter-coil-heat-bridge',
        31,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, 12.6),
        new THREE.Vector3(46.0, 28.0, -6.0),
        new THREE.Vector3(44.0, 26.0, 48.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH32. [Phase 11] 1/400s Flash X-Sync Curtain-1 Trigger Contact & Gate (z = +12.0 mm)
  // =========================================================================
  let xSyncGlow!: THREE.Mesh;
  {
    const g = new THREE.Group();
    const sx = -20.2;
    const sy = -14.8;
    const swBody = new THREE.Mesh(new THREE.BoxGeometry(5.6, 4.4, 2.2), mats.mountPpsInsulator);
    swBody.position.set(sx, sy, 0);
    g.add(swBody);

    // Dual gold X-sync micro-wiper fork contacts triggered on Curtain-1 full open
    for (const dy of [-0.7, 0.7]) {
      const fork = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.36, 0.65), mats.goldPlating);
      fork.position.set(sx + 3.2, sy + dy, 0.35);
      g.add(fork);
    }

    // Live animated Flash X-Sync trigger flash pulse gem (lights up when Curtain 1 reaches bottom!)
    xSyncGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 14, 12),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0,
        clippingPlanes: cp,
      })
    );
    xSyncGlow.position.set(sx, sy, 1.35);
    xSyncGlow.userData.noEdges = true;
    g.add(xSyncGlow);

    // Bottom FPC sync lead running to right-side shutter main harness
    const fpcRun = new THREE.Mesh(new THREE.BoxGeometry(42.0, 2.2, 0.24), mats.polyimideFpc);
    fpcRun.position.set(1.2, -19.8, -0.5);
    const fpcDrop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 5.8, 0.24), mats.polyimideFpc);
    fpcDrop.position.set(sx, -17.4, -0.5);
    g.add(fpcRun, fpcDrop);

    parts.push(
      finalizeShutterPart(
        'shutter-x-sync-contact',
        32,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 12.0),
        new THREE.Vector3(-28.0, -24.0, -18.0),
        new THREE.Vector3(-28.0, -22.0, 38.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH33. [Phase 11] Rear 36×24mm Knife-Edge Mask & Sensor-Chamber EPDM Seal (z = +9.85 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const maskShape = createFrameShape(50.2, 38.2, 2.6, 37.8, 25.8, 0.8);
    const maskMesh = new THREE.Mesh(
      extrudeCentered(maskShape, 0.65, 0.06, 0.14, 18),
      mats.velvetFlockTrap
    );
    g.add(maskMesh);

    // Full-perimeter closed-cell EPDM acoustic & sensor-chamber dust-blocking gasket
    const epdmShape = createFrameShape(49.2, 37.2, 2.2, 43.2, 31.2, 1.4);
    const epdmMesh = new THREE.Mesh(
      extrudeCentered(epdmShape, 0.62, 0.06, 0.06, 18),
      mats.epdmGasket
    );
    epdmMesh.position.z = -0.58;
    g.add(epdmMesh);

    parts.push(
      finalizeShutterPart(
        'shutter-rear-mask-gasket',
        33,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 9.85),
        new THREE.Vector3(0, 0, -58.0),
        new THREE.Vector3(0, 0, 8.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH34. [Phase 12] Normally-Open / Normally-Closed Electromagnet Switching Lock Lever (z = +13.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const lever = new THREE.Mesh(new THREE.BoxGeometry(10.5, 2.2, 0.85), mats.linkArmSteel);
    lever.position.set(27.8, 18.8, 0);
    lever.rotation.z = -0.28;
    const pivot = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 2.2, 14).rotateX(Math.PI / 2),
      mats.brassGear
    );
    pivot.position.set(31.8, 17.6, 0);
    const toggleCam = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.2, 1.1, 18).rotateX(Math.PI / 2),
      mats.pomGear
    );
    toggleCam.position.set(23.5, 19.6, 0.25);
    const lockSpring = new THREE.Mesh(
      createTorsionSpringGeometry(1.25, 1.3, 3, 0.2, 2.2),
      mats.beCuSpring
    );
    lockSpring.position.set(31.8, 17.6, 1.0);
    lockSpring.userData.noEdges = true;
    g.add(lever, pivot, toggleCam, lockSpring);

    parts.push(
      finalizeShutterPart(
        'shutter-no-nc-switch',
        34,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 13.0),
        new THREE.Vector3(44.0, 38.0, 4.0),
        new THREE.Vector3(44.0, 36.0, 56.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH35. [Phase 12] Power-Off Sensor Protection Dust-Shield Interlock Latch & Cam (z = +11.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const latchBar = new THREE.Mesh(new THREE.BoxGeometry(11.6, 2.4, 0.9), mats.stainlessMachined);
    latchBar.position.set(-25.8, 14.5, 0);
    latchBar.rotation.z = 0.22;
    const deadlockHook = new THREE.Mesh(new THREE.BoxGeometry(2.8, 3.8, 1.1), mats.titaniumRivet);
    deadlockHook.position.set(-20.4, 15.8, 0.15);
    const driveCam = new THREE.Mesh(
      new THREE.CylinderGeometry(2.8, 2.8, 1.2, 20).rotateX(Math.PI / 2),
      mats.brassGear
    );
    driveCam.position.set(-30.5, 13.2, -0.2);
    const overloadSpr = new THREE.Mesh(
      createHelicalSpringGeometry(0.85, 4.4, 6, 0.16).rotateZ(Math.PI / 2),
      mats.beCuSpring
    );
    overloadSpr.position.set(-28.0, 16.8, 0);
    overloadSpr.userData.noEdges = true;
    g.add(latchBar, deadlockHook, driveCam, overloadSpr);

    parts.push(
      finalizeShutterPart(
        'shutter-sensor-shield',
        35,
        '#6366f1',
        g,
        new THREE.Vector3(0, 0, 11.4),
        new THREE.Vector3(-42.0, 26.0, -24.0),
        new THREE.Vector3(-42.0, 26.0, 34.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH36. [Phase 12] Leading/Trailing Differential Cocking Cam & Offset Eccentric Pin (z = +12.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual-stage 60-degree phase-offset differential cocking cam disks
    const cam1 = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 4.4, 1.15, 24).rotateX(Math.PI / 2),
      mats.brassGear
    );
    cam1.scale.set(1.18, 0.88, 1);
    cam1.position.set(29.2, -3.5, 0.65);

    const cam2 = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 4.4, 1.15, 24).rotateX(Math.PI / 2),
      mats.linkArmSteel
    );
    cam2.scale.set(1.18, 0.88, 1);
    cam2.rotation.z = Math.PI / 3; // True 60-degree phase stagger!
    cam2.position.set(29.2, -3.5, -0.65);

    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 4.4, 14).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    shaft.position.set(29.2, -3.5, 0);
    const eccPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.75, 1.8, 12).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    eccPin.position.set(32.0, -1.8, 0.9);
    g.add(cam1, cam2, shaft, eccPin);

    parts.push(
      finalizeShutterPart(
        'shutter-diff-cock-cam',
        36,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 12.4),
        new THREE.Vector3(46.0, -8.0, -16.0),
        new THREE.Vector3(46.0, -8.0, 42.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH37. [Phase 12] High-Speed Curtain-Bounce Brake Lever & Friction Clutch Governor (z = +13.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const brakeArm = new THREE.Mesh(new THREE.BoxGeometry(9.2, 2.0, 0.78), mats.linkArmSteel);
    brakeArm.position.set(-26.4, -8.2, 0);
    brakeArm.rotation.z = -0.35;
    const clutchDrum = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 1.5, 20).rotateX(Math.PI / 2),
      mats.copperHeatSpreader
    );
    clutchDrum.position.set(-30.2, -6.4, 0);
    const frictionRing = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.34, 8, 20), mats.damperElastomer);
    frictionRing.position.set(-30.2, -6.4, 0.3);
    frictionRing.userData.noEdges = true;
    const catchPawl = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.2, 0.85), mats.titaniumRivet);
    catchPawl.position.set(-22.4, -10.2, 0.15);
    g.add(brakeArm, clutchDrum, frictionRing, catchPawl);

    parts.push(
      finalizeShutterPart(
        'shutter-rebound-governor',
        37,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, 13.6),
        new THREE.Vector3(-42.0, -12.0, 14.0),
        new THREE.Vector3(-42.0, -12.0, 62.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH38. [Phase 12] Inclined 18° Matte-Black Aperture Stray-Light Baffle Wall (z = +15.05 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4-sided 18-degree inclined knife-edge stray-light absorber wall framing 36x24mm aperture
    for (const sx of [-1, 1]) {
      const sideWall = new THREE.Mesh(new THREE.BoxGeometry(2.6, 26.2, 1.45), mats.velvetFlockTrap);
      sideWall.position.set(sx * 19.6, 0, 0);
      sideWall.rotation.y = sx * THREE.MathUtils.degToRad(18);
      g.add(sideWall);
    }
    for (const sy of [-1, 1]) {
      const hWall = new THREE.Mesh(new THREE.BoxGeometry(39.4, 2.2, 1.45), mats.velvetFlockTrap);
      hWall.position.set(0, sy * 13.4, 0);
      hWall.rotation.x = -sy * THREE.MathUtils.degToRad(18);
      g.add(hWall);
    }

    parts.push(
      finalizeShutterPart(
        'shutter-slit-baffle-wall',
        38,
        '#0f172a',
        g,
        new THREE.Vector3(0, 0, 15.05),
        new THREE.Vector3(0, -28.0, 32.0),
        new THREE.Vector3(0, -28.0, 82.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH39. [Phase 12] Sub-Millisecond Curtain-Velocity Diagnostic Hall Sensor & Magnet (z = +11.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const hallPcb = new THREE.Mesh(new THREE.BoxGeometry(8.4, 6.2, 0.7), mats.hdiMainboardPcb);
    hallPcb.position.set(22.4, -20.8, 0);
    const hallIc = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.8, 0.75), mats.icEpoxy);
    hallIc.position.set(22.4, -20.8, 0.65);
    const refMag = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 1.1, 16).rotateX(Math.PI / 2),
      mats.neodymiumMagnet
    );
    refMag.position.set(22.4, -16.8, 0.8);
    const fpcLink = new THREE.Mesh(new THREE.BoxGeometry(3.2, 7.6, 0.22), mats.polyimideFpc);
    fpcLink.position.set(26.8, -18.5, -0.35);
    g.add(hallPcb, hallIc, refMag, fpcLink);

    parts.push(
      finalizeShutterPart(
        'shutter-cycle-hall',
        39,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, 11.8),
        new THREE.Vector3(36.0, -40.0, -26.0),
        new THREE.Vector3(36.0, -38.0, 30.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // PARALLELOGRAM KINEMATICS ENGINE + COUNTERWEIGHT & ARMATURE DYNAMICS
  // =========================================================================
  const slitState: ShutterDynamicRig['slitState'] = {
    curtain1EdgeY: -2.2,
    curtain2EdgeY: 4.8,
    phaseLabel: 'slit',
    boostActive: false,
    irTrigger1: false,
    irTrigger2: false,
  };

  const positionCurtain1 = (p: number) => {
    const clamped = THREE.MathUtils.clamp(p, 0, 1);
    const topTargetsClosed = [9.5, 3.2, -3.1, -9.4];
    const pocketY = -17.6;
    for (let i = 0; i < 4; i++) {
      curtain1Blades[i].position.y = THREE.MathUtils.lerp(topTargetsClosed[i], pocketY - i * 0.35, clamped);
    }
    const angle = THREE.MathUtils.lerp(0.56, -0.62, clamped);
    link1Main.rotation.z = angle;
    link1Sub.rotation.z = angle;
    return curtain1Blades[0].position.y + 3.7;
  };

  const positionCurtain2 = (p: number) => {
    const clamped = THREE.MathUtils.clamp(p, 0, 1);
    const closedY = [-9.4, -3.1, 3.2, 9.5];
    const pocketY = 17.6;
    for (let i = 0; i < 4; i++) {
      curtain2Blades[i].position.y = THREE.MathUtils.lerp(pocketY + i * 0.35, closedY[i], clamped);
    }
    const angle = THREE.MathUtils.lerp(0.62, -0.56, clamped);
    link2Main.rotation.z = angle;
    link2Sub.rotation.z = angle;
    return curtain2Blades[0].position.y - 3.7;
  };

  const applyKinematics = (elapsed: number, physicsActive: boolean) => {
    if (!physicsActive) {
      const c1Edge = positionCurtain1(0.56);
      const c2Edge = positionCurtain2(0.36);
      slitState.curtain1EdgeY = c1Edge;
      slitState.curtain2EdgeY = c2Edge;
      slitState.phaseLabel = 'slit';
      slitState.boostActive = false;
      slitState.irTrigger1 = false;
      slitState.irTrigger2 = false;
      counterweightLever.rotation.z = 0;
      armatureLever1.rotation.z = 0;
      armatureLever2.rotation.z = 0;

      (dualBoostCoilGlow.material as THREE.MeshBasicMaterial).opacity = 0;
      (magnet1Glow.material as THREE.MeshBasicMaterial).opacity = 0;
      (magnet2Glow.material as THREE.MeshBasicMaterial).opacity = 0;
      (xSyncGlow.material as THREE.MeshBasicMaterial).opacity = 0;
      return;
    }

    const cycle = ((elapsed + 1.6) % 7.0) / 7.0;
    let p1 = 0;
    let p2 = 0;
    let boost = false;
    let mag1 = 0.85;
    let mag2 = 0.85;

    if (cycle < 0.64) {
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
      const tc = THREE.MathUtils.clamp((cycle - 0.72) / 0.20, 0, 1);
      const ease = tc * tc * (3 - 2 * tc);
      p1 = 1 - ease;
      p2 = THREE.MathUtils.clamp(1 - ease + 0.14 * Math.sin(tc * Math.PI), 0, 1);
      mag1 = tc > 0.82 ? 0.85 : 0;
      mag2 = tc > 0.82 ? 0.85 : 0;
      slitState.phaseLabel = 'charging';

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
    counterweightLever.rotation.z = THREE.MathUtils.lerp(-0.55, 0.55, (p1 + p2) * 0.5);
    armatureLever1.rotation.z = mag1 > 0.2 ? 0 : -0.18;
    armatureLever2.rotation.z = mag2 > 0.2 ? 0 : -0.18;

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
    // Flash X-Sync pulse illuminates at the exact instant Curtain 1 reaches full-open bottom!
    const xSyncFire = slitState.phaseLabel === 'slit' && p1 >= 0.88 && p2 < 0.82;
    (xSyncGlow.material as THREE.MeshBasicMaterial).opacity = xSyncFire ? 0.96 : 0;
  };

  applyKinematics(0, false);

  // Tag all 20 rigid kinematic bones + 4 pulsing glow indicators for GPU SubPartRigidBoneMegaBatcher!
  for (const b of curtain1Blades) b.userData.kinematicBone = true;
  for (const b of curtain2Blades) b.userData.kinematicBone = true;
  link1Main.userData.kinematicBone = true;
  link1Sub.userData.kinematicBone = true;
  link2Main.userData.kinematicBone = true;
  link2Sub.userData.kinematicBone = true;
  for (const g of chargeGears) g.userData.kinematicBone = true;
  chargeCam.userData.kinematicBone = true;
  counterweightLever.userData.kinematicBone = true;
  armatureLever1.userData.kinematicBone = true;
  armatureLever2.userData.kinematicBone = true;
  dualBoostCoilGlow.userData.dynamicGlow = true;
  magnet1Glow.userData.dynamicGlow = true;
  magnet2Glow.userData.dynamicGlow = true;
  xSyncGlow.userData.dynamicGlow = true;

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
      counterweightLever,
      armatureLever1,
      armatureLever2,
      dualBoostCoilGlow,
      magnet1Glow,
      magnet2Glow,
      slitState,
      applyKinematics,
    },
  };
}

export async function buildShutterStandaloneParts(mats: MaterialLibrary): Promise<CadPart[]> {
  // Phase 13 (18) + Phase 17 (20) + Phase 34 (53) = 91 standalone-only mechanical shutter micro-parts (SH40–SH130 -> 130 total)
  const [mMicro, mUltra, mU34A, mU34B] = await Promise.all([
    import('./shutterMicroParts'),
    import('./shutterUltraAuditParts'),
    import('./shutterUltra34PartsA'),
    import('./shutterUltra34PartsB'),
  ]);
  return [
    ...mMicro.buildShutterMicroParts(mats),
    ...mUltra.buildShutterUltraAuditParts(mats),
    ...mU34A.buildShutterUltra34PartsA(mats),
    ...mU34B.buildShutterUltra34PartsB(mats),
  ];
}
