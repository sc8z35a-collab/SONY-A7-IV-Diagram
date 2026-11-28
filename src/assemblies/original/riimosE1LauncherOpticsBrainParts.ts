//@FLOW_MAP|file=src/assemblies/original/riimosE1LauncherOpticsBrainParts.ts|unit=original|lines=570|exports=RiimosLauncherOpticsRigRefs,buildRiimosE1LauncherOpticsBrainParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import {
  finalizeOriginalPart,
  makeBoxMesh,
  makeCylMesh,
  makePlanarTopBox,
  makeSphereMesh,
} from './originalShared';
import { scaleRadialSegmentsForQuality } from '../../core/geometry_quality';

export interface RiimosLauncherOpticsRigRefs {
  readonly frontLauncherGroups: THREE.Group[];
  readonly rearLauncherGroups: THREE.Group[];
  readonly frontCamGimbalGroups: THREE.Group[];
  readonly rearCamGimbalGroups: THREE.Group[];
  readonly frontShutterGroup: THREE.Group;
  readonly rearShutterGroup: THREE.Group;
}

/**
 * RIIMOS E1 — Groups 4, 5 & 6 (54 Parts: OR45–OR98):
 *   - Group 4 (OR45–OR68): 8-Barrel Shared-Shaft 0.135J Dual-Flywheel Launchers (24p)
 *   - Group 5 (OR69–OR86): Front/Rear 120Hz OV7720/OV7725 Domes + Fail-Closed Shutters + Top 360° Dome (18p)
 *   - Group 6 (OR87–OR98): Protected Internal Motorola moto g52j 5G Core & Lower Spinal Control Bay (12p)
 */
export function buildRiimosE1LauncherOpticsBrainParts(
  mats: V2MaterialLibrary,
  clippingPlanes: THREE.Plane[]
): { parts: CadPart[]; rigRefs: RiimosLauncherOpticsRigRefs } {
  const parts: CadPart[] = [];
  const frontLauncherGroups: THREE.Group[] = [];
  const rearLauncherGroups: THREE.Group[] = [];
  const frontCamGimbalGroups: THREE.Group[] = [];
  const rearCamGimbalGroups: THREE.Group[] = [];
  let frontShutterGroup!: THREE.Group;
  let rearShutterGroup!: THREE.Group;

  const add = (
    id: string,
    order: number,
    swatch: string,
    group: THREE.Group,
    pos: readonly [number, number, number],
    exp: readonly [number, number, number],
    edgeOp = 0.24
  ) => {
    parts.push(
      finalizeOriginalPart(
        id,
        1,
        order,
        swatch,
        group,
        new THREE.Vector3(pos[0], pos[1], pos[2]),
        new THREE.Vector3(exp[0], exp[1], exp[2]),
        clippingPlanes,
        edgeOp
      )
    );
  };

  // ===========================================================================
  // GROUP 4: 8-BARREL SHARED-SHAFT 0.135J DUAL-FLYWHEEL LAUNCHERS (OR45–OR68, 24 Parts)
  // ===========================================================================

  // OR45–OR52: 8 Individual Dual-Flywheel Micro-Launcher Pods (4 Front Primary + 4 Rear Interceptor)
  const launcherDefs: ReadonlyArray<{
    id: string;
    order: number;
    sx: number;
    sy: number;
    sz: number;
    y: number;
  }> = [
    { id: 'orig-e1-launcher-fl-top', order: 45, sx: -1, sy: 1, sz: 1, y: 166 },
    { id: 'orig-e1-launcher-fr-top', order: 46, sx: 1, sy: 1, sz: 1, y: 166 },
    { id: 'orig-e1-launcher-fl-bot', order: 47, sx: -1, sy: -1, sz: 1, y: 114 },
    { id: 'orig-e1-launcher-fr-bot', order: 48, sx: 1, sy: -1, sz: 1, y: 114 },
    { id: 'orig-e1-launcher-rl-top', order: 49, sx: -1, sy: 1, sz: -1, y: 166 },
    { id: 'orig-e1-launcher-rr-top', order: 50, sx: 1, sy: 1, sz: -1, y: 166 },
    { id: 'orig-e1-launcher-rl-bot', order: 51, sx: -1, sy: -1, sz: -1, y: 114 },
    { id: 'orig-e1-launcher-rr-bot', order: 52, sx: 1, sy: -1, sz: -1, y: 114 },
  ];
  for (const ld of launcherDefs) {
    const g = new THREE.Group();
    // Compact PETG flywheel housing cage (22 x 20 x 20mm)
    const cage = makeBoxMesh(22, 20, 20, mats.shutterChassis, 16);
    g.add(cage);
    // Twin counter-rotating TPU-rimmed flywheels (visible top/bottom flanks)
    const fwL = makeCylMesh(7.4, 7.4, 5.2, mats.lensRubberGrip, 16);
    fwL.position.set(-5.8, 0, -1.5);
    const fwR = makeCylMesh(7.4, 7.4, 5.2, mats.lensRubberGrip, 16);
    fwR.position.set(5.8, 0, -1.5);
    // Precision 6.06mm Al inner barrel extending toward faceplate muzzle (stops at |Z|=61.03, clear of faceplate 62.04)
    const barrel = makeCylMesh(4.0, 4.0, 9.0, mats.stainlessMachined, 14);
    barrel.rotation.x = Math.PI * 0.5;
    barrel.position.set(0, 0, ld.sz * 14.53);
    g.add(fwL, fwR, barrel);

    if (ld.sz > 0) frontLauncherGroups.push(g);
    else rearLauncherGroups.push(g);

    add(
      ld.id,
      ld.order,
      ld.sz > 0 ? '#334155' : '#475569',
      g,
      [ld.sx * 78, ld.y, ld.sz * 42],
      [0, ld.sy * 8, ld.sz * 108]
    );
  }

  // OR53–OR56: 4x Shared-Shaft Vertical 180 High-RPM Motors + 1:1 Counter-Rotating Gears
  // Positioned at X=±93.84, Y=134.5, Z=±46 (shaft bridges skid plate 86.0 to top bulkhead 183.0; gears mesh at 0.04mm with launchers!)
  const shaftDefs: ReadonlyArray<{
    id: string;
    order: number;
    sx: number;
    sz: number;
  }> = [
    { id: 'orig-e1-drive-shaft-fl', order: 53, sx: -1, sz: 1 },
    { id: 'orig-e1-drive-shaft-fr', order: 54, sx: 1, sz: 1 },
    { id: 'orig-e1-drive-shaft-rl', order: 55, sx: -1, sz: -1 },
    { id: 'orig-e1-drive-shaft-rr', order: 56, sx: 1, sz: -1 },
  ];
  for (const sd of shaftDefs) {
    const g = new THREE.Group();
    const motor = makeCylMesh(5.2, 5.2, 24.0, mats.copperHeatSpreader, 16);
    g.add(motor);
    // Full-height steel through-shaft (Y: 86.04..182.96 -> 0.04mm bearing seat at bottom skid & top bulkhead!)
    const shaft = makeCylMesh(1.8, 1.8, 96.92, mats.mountStainlessFlange, 12);
    g.add(shaft);
    // Top (Y=166) & bottom (Y=114) 1:1 counter-rotating brass spur gears meshing at 0.04mm with launcher cages
    const gTop = makeCylMesh(4.8, 4.8, 4.0, mats.brassGear, 14);
    gTop.position.set(0, 31.5, 0);
    const gBot = makeCylMesh(4.8, 4.8, 4.0, mats.brassGear, 14);
    gBot.position.set(0, -20.5, 0);
    g.add(gTop, gBot);
    add(
      sd.id,
      sd.order,
      '#d97706',
      g,
      [sd.sx * 96.04, 134.5, sd.sz * 46.0],
      [sd.sx * 76, 0, 0]
    );
  }

  // OR57–OR58: Front & Rear 4-Barrel Linked 2-Axis Aiming Gimbal Yoke Frames (Z_outer=±62.00 -> 0.04mm inside faceplates!)
  for (const [id, order, sz] of [
    ['orig-e1-aim-frame-front', 57, 1],
    ['orig-e1-aim-frame-rear', 58, -1],
  ] as const) {
    const g = new THREE.Group();
    g.add(makeBoxMesh(176, 6.0, 3.6, mats.magnesiumCast, 22));
    // Non-overlapping upper & lower vertical tie struts (0.04mm from horizontal yoke bar)
    const sLT = makeBoxMesh(3.2, 24, 3.2, mats.magnesiumCast, 14);
    sLT.position.set(-59, 15.04, 0);
    const sLB = makeBoxMesh(3.2, 24, 3.2, mats.magnesiumCast, 14);
    sLB.position.set(-59, -15.04, 0);
    const sRT = makeBoxMesh(3.2, 24, 3.2, mats.magnesiumCast, 14);
    sRT.position.set(59, 15.04, 0);
    const sRB = makeBoxMesh(3.2, 24, 3.2, mats.magnesiumCast, 14);
    sRB.position.set(59, -15.04, 0);
    g.add(sLT, sLB, sRT, sRB);
    add(id, order, '#64748b', g, [0, 140.0, sz * 60.20], [0, 0, sz * 138]);
  }

  // OR59–OR62: 4x SG90 Metal-Gear Aiming Servos (horn outer face=±58.36 -> 0.04mm from aim-frame ±58.40!)
  const aimServoDefs: ReadonlyArray<{
    id: string;
    order: number;
    x: number;
    y: number;
    sz: number;
  }> = [
    { id: 'orig-e1-aim-servo-front-pan', order: 59, x: -38, y: 140, sz: 1 },
    { id: 'orig-e1-aim-servo-front-tilt', order: 60, x: 38, y: 140, sz: 1 },
    { id: 'orig-e1-aim-servo-rear-pan', order: 61, x: -38, y: 140, sz: -1 },
    { id: 'orig-e1-aim-servo-rear-tilt', order: 62, x: 38, y: 140, sz: -1 },
  ];
  for (const asd of aimServoDefs) {
    const g = new THREE.Group();
    const body = makeBoxMesh(12, 22, 10, mats.mountShimBlue, 12);
    const horn = makeCylMesh(3.8, 3.8, 2.2, mats.pomGear, 12);
    horn.rotation.x = Math.PI * 0.5;
    horn.position.set(0, 0, asd.sz * 6.13);
    g.add(body, horn);
    add(
      asd.id,
      asd.order,
      '#2563eb',
      g,
      [asd.x, asd.y, asd.sz * 51.13],
      [0, 0, asd.sz * 116]
    );
  }

  // OR63–OR64: Front & Rear 4-Barrel Single / Relay / Salvo Rotary Cam Sequencers (seated 0.04mm on bottom-skid-plate!)
  for (const [id, order, sz, zPos] of [
    ['orig-e1-cam-sequencer-front', 63, 1, 55.5],
    ['orig-e1-cam-sequencer-rear', 64, -1, -48.0],
  ] as const) {
    const g = new THREE.Group();
    const housing = makeBoxMesh(36, 12, 12, mats.brassGear, 14);
    const camDrum = makeCylMesh(5.2, 5.2, 40, mats.stainlessMachined, 14);
    camDrum.rotation.z = Math.PI * 0.5;
    g.add(housing, camDrum);
    add(id, order, '#b45309', g, [0, 92.04, zPos], [0, -14, sz * 112]);
  }

  // OR65: 8x Fixed Silicone Hop-Up / Breech Feed Collars (|Z|=27.96..31.96 -> 0.04mm behind launcher cages ±32.0!)
  {
    const g = new THREE.Group();
    for (const sz of [1, -1]) {
      for (const sx of [-1, 1]) {
        for (const y of [166, 114]) {
          const bucking = makeCylMesh(4.6, 4.6, 4.0, mats.sonyAlphaCinnabar, 12);
          bucking.rotation.x = Math.PI * 0.5;
          bucking.position.set(sx * 78, y - 140, sz * 29.96);
          g.add(bucking);
        }
      }
    }
    add('orig-e1-hopup-buckings-8x', 65, '#f97316', g, [0, 140, 0], [0, 0, 0], 0.14);
  }

  // OR66–OR67: Front & Rear 4-Square Muzzle Protection Bezels (Z_inner=±64.28 -> 0.04mm outside faceplates!)
  for (const [id, order, sz] of [
    ['orig-e1-muzzle-bezels-front', 66, 1],
    ['orig-e1-muzzle-bezels-rear', 67, -1],
  ] as const) {
    const g = new THREE.Group();
    for (const sx of [-1, 1]) {
      for (const y of [166, 114]) {
        const cx = sx * 78;
        const cy = y - 140;
        const t = 2.6;
        const d = 3.2;
        const topBar = makeBoxMesh(34, t, d, mats.matteBlackAnodized, 12);
        topBar.position.set(cx, cy + 14.5, 0);
        const botBar = makeBoxMesh(34, t, d, mats.matteBlackAnodized, 12);
        botBar.position.set(cx, cy - 14.5, 0);
        const leftBar = makeBoxMesh(t, 26.32, d, mats.matteBlackAnodized, 12);
        leftBar.position.set(cx - 15.7, cy, 0);
        const rightBar = makeBoxMesh(t, 26.32, d, mats.matteBlackAnodized, 12);
        rightBar.position.set(cx + 15.7, cy, 0);
        g.add(topBar, botBar, leftBar, rightBar);
      }
    }
    add(id, order, '#0f172a', g, [0, 140.0, sz * 65.88], [0, 0, sz * 198]);
  }

  // OR68: 0.135J Hardware Physical Upper-Limit Voltage Limiter Board (Y:86.04..90.04, Z:35.08..49.08 -> 0.04mm clear of wire-harness!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(34, 4.0, 14, mats.bionzSy1122Mainboard, 14));
    const pot = makeBoxMesh(6, 4.0, 6, mats.mountRedIndexDot, 8);
    pot.position.set(9, 4.03, 0);
    g.add(pot);
    add('orig-e1-energy-cap-board', 68, '#10b981', g, [0, 88.04, 42.08], [0, -24, 92]);
  }

  // ===========================================================================
  // GROUP 5: FRONT/REAR 120Hz CAMERAS + FAIL-CLOSED SHUTTERS + TOP 360° DOME (OR69–OR86, 18 Parts)
  // ===========================================================================
  const buildCameraPod = (sz: 1 | -1, baseOrder: number, prefix: string) => {
    const gimbalList = sz > 0 ? frontCamGimbalGroups : rearCamGimbalGroups;

    // +0: Outer Circular Camera Bezel Ring (Z_back=±64.28 -> 0.04mm outside faceplates ±64.24; Z_front=±69.08)
    {
      const g = new THREE.Group();
      const ringGeo = new THREE.TorusGeometry(
        16.2,
        2.4,
        scaleRadialSegmentsForQuality(12),
        scaleRadialSegmentsForQuality(24)
      );
      g.add(new THREE.Mesh(ringGeo, mats.matteBlackAnodized));
      add(
        `${prefix}-ring`,
        baseOrder,
        '#111827',
        g,
        [0, 167.0, sz * 66.68],
        [0, 20, sz * 208]
      );
    }

    // +1: AR Optical Protective Glass Disk (Z_back=±69.12 -> 0.04mm in front of ring front face ±69.08, 0 chord-sag clash!)
    {
      const g = new THREE.Group();
      const disk = makeCylMesh(14.5, 14.5, 1.2, mats.lcdNanoEtchGlass, 22);
      disk.rotation.x = Math.PI * 0.5;
      g.add(disk);
      add(
        `${prefix}-glass`,
        baseOrder + 1,
        '#93c5fd',
        g,
        [0, 167.0, sz * 69.72],
        [0, 22, sz * 224],
        0.16
      );
    }

    // +2: OV7720 / OV7725 120Hz Bare Sensor PCB (die front face=±57.81 -> 0.04mm behind lens barrel ±57.85!)
    {
      const g = new THREE.Group();
      g.add(makeBoxMesh(22, 22, 2.0, mats.hdiMainboardPcb, 14));
      const die = makeBoxMesh(8.0, 8.0, 1.2, mats.siliconSensorDie, 10);
      die.position.set(0, 0, sz * 1.63);
      g.add(die);
      gimbalList.push(g);
      add(
        `${prefix}-pcb`,
        baseOrder + 2,
        '#15803d',
        g,
        [0, 167.0, sz * 55.58],
        [0, 10, sz * 92]
      );
    }

    // +3: M12 Wide-Medium Low-Distortion Optical Lens Barrel (frontElem face=±69.08 -> 0.04mm behind glass ±69.12!)
    {
      const g = new THREE.Group();
      const barrel = makeCylMesh(6.6, 7.2, 10.0, mats.lensBarrelAnodized, 18);
      barrel.rotation.x = Math.PI * 0.5;
      const frontElem = makeCylMesh(5.6, 5.6, 1.2, mats.welcomeOpticalEd, 16);
      frontElem.rotation.x = Math.PI * 0.5;
      frontElem.position.set(0, 0, sz * 5.63);
      g.add(barrel, frontElem);
      gimbalList.push(g);
      add(
        `${prefix}-lens`,
        baseOrder + 3,
        '#38bdf8',
        g,
        [0, 167.0, sz * 62.85],
        [0, 14, sz * 128]
      );
    }

    // +4: 1-Axis Physical Pitch Stabilization U-Cradle (arms inner ±11.04, botBar top=-11.04 -> 0.04mm around PCB!)
    {
      const g = new THREE.Group();
      const armL = makeBoxMesh(2.4, 22, 7.0, mats.magnesiumCast, 12);
      armL.position.set(-12.24, 0, 0);
      const armR = makeBoxMesh(2.4, 22, 7.0, mats.magnesiumCast, 12);
      armR.position.set(12.24, 0, 0);
      const botBar = makeBoxMesh(26.88, 2.4, 7.0, mats.magnesiumCast, 12);
      botBar.position.set(0, -12.24, 0);
      g.add(armL, armR, botBar);
      gimbalList.push(g);
      add(
        `${prefix}-gimbal`,
        baseOrder + 4,
        '#94a3b8',
        g,
        [0, 167.0, sz * 55.58],
        [0, 4, sz * 112]
      );
    }

    // +5: Dual-Duty Pitch-Stab & +85° Fail-Closed Shutter SG90 Servo (shaft tip=13.48 -> 0.04mm from gimbal armR 13.44!)
    {
      const g = new THREE.Group();
      g.add(makeBoxMesh(11.5, 22, 12, mats.mountShimBlue, 12));
      const shaft = makeCylMesh(2.4, 2.4, 3.6, mats.pomGear, 10);
      shaft.rotation.z = Math.PI * 0.5;
      shaft.position.set(-7.58, 5.0, 0);
      g.add(shaft);
      add(
        `${prefix}-servo`,
        baseOrder + 5,
        '#2563eb',
        g,
        [22.86, 167.0, sz * 55.58],
        [24, 12, sz * 114]
      );
    }

    // +6: Fail-Closed Torsion-Spring Physical Vision-Shutout Hood (Z_back=±64.28 -> 0.04mm from faceplate & 0.04mm above cam-ring -> 2 contacts!)
    {
      const g = new THREE.Group();
      const blade = makeBoxMesh(22, 2.8, 2.0, mats.sonyAlphaCinnabar, 12);
      blade.position.set(0, 20.04, 0);
      const springHub = makeCylMesh(1.0, 1.0, 3.6, mats.mountSpringSteel, 10);
      springHub.rotation.z = Math.PI * 0.5;
      springHub.position.set(-12.83, 20.04, 0);
      g.add(blade, springHub);
      if (sz > 0) frontShutterGroup = g;
      else rearShutterGroup = g;
      add(
        `${prefix}-shutter`,
        baseOrder + 6,
        '#f97316',
        g,
        [0, 167.0, sz * 65.28],
        [0, 26, sz * 242]
      );
    }
  };

  buildCameraPod(1, 69, 'orig-e1-cam-front');
  buildCameraPod(-1, 76, 'orig-e1-cam-rear');

  // OR83–OR86: Top 360° Fisheye Surveillance Camera Mast & Transparent Dome (stacked at 0.04mm from mag-l-hatch top=230.02!)
  {
    const g = new THREE.Group();
    g.add(makeCylMesh(13.5, 15.0, 11.4, mats.matteBlackAnodized, 22));
    add('orig-e1-cam-top-mast', 83, '#1e293b', g, [-4, 235.76, 42], [0, 174, 0]);
  }
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(18, 2.0, 18, mats.hdiMainboardPcb, 12));
    add('orig-e1-cam-top-pcb', 84, '#15803d', g, [-4, 242.50, 42], [0, 192, 0]);
  }
  {
    const g = new THREE.Group();
    g.add(makeCylMesh(6.2, 6.8, 5.2, mats.lensBarrelAnodized, 18));
    const glass = makeSphereMesh(5.2, mats.welcomeOpticalEd, 14);
    glass.scale.set(1, 0.52, 1);
    glass.position.set(0, 5.334, 0);
    g.add(glass);
    add('orig-e1-cam-top-fisheye', 85, '#38bdf8', g, [-4, 246.14, 42], [0, 206, 0]);
  }
  {
    const g = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(
      12.4,
      1.6,
      scaleRadialSegmentsForQuality(10),
      scaleRadialSegmentsForQuality(22)
    );
    const halo = new THREE.Mesh(ringGeo, mats.matteBlackAnodized);
    halo.rotation.x = Math.PI * 0.5;
    halo.position.set(0, -1.6, 0);
    const cap = makeCylMesh(10.8, 12.6, 2.2, mats.lcdNanoEtchGlass, 22);
    cap.position.set(0, 1.13, 0);
    g.add(halo, cap);
    add('orig-e1-cam-top-dome', 86, '#bae6fd', g, [-4, 257.42, 42], [0, 228, 0], 0.16);
  }

  // ===========================================================================
  // GROUP 6: MOTOROLA moto g52j 5G (0 JPY CORE) & LOWER SPINAL CONTROL (OR87–OR98, 12 Parts)
  // ===========================================================================

  // OR87: moto g52j 5G Full-Scale Body (Y: 134.04..142.64 -> 0.04mm above sled; camBump top=143.47!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(171.0, 8.6, 76.8, mats.matteBlackAnodized, 24));
    const camBump = makeBoxMesh(28, 0.8, 14, mats.shutterChassis, 10);
    camBump.position.set(-62, 4.73, -22);
    const usbPort = makeBoxMesh(1.4, 3.0, 8.8, mats.goldPlating, 8);
    usbPort.position.set(86.23, 0, 0);
    g.add(camBump, usbPort);
    add('orig-e1-brain-g52j-body', 87, '#0f172a', g, [0, 138.34, 0], [0, 0, 0]);
  }

  // OR88: moto g52j Thin 0.8mm EMI & Rear-Camera Armor Shield (Y: 143.51..144.31 -> 0.04mm above camBump!)
  {
    const g = new THREE.Group();
    g.add(makePlanarTopBox(168, 0.8, 74, mats.origG52jChassisScreen));
    add('orig-e1-brain-g52j-shield', 88, '#38bdf8', g, [0, 143.91, 0], [0, 4, 0]);
  }

  // OR89: moto g52j Quick-Slide Anti-Vibration Sled (Y: 132.00..134.00 -> 0.04mm above vib-isolators & IMU datum!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(175, 2.0, 79, mats.lensBarrelAnodized, 22));
    add('orig-e1-brain-g52j-sled', 89, '#334155', g, [0, 133.0, 0], [0, -3, 0]);
  }

  // OR90: moto g52j Built-In 400Hz 6-Axis IMU Reference Datum (Y: 130.04..131.96 -> bridges floor & sled!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(12, 1.92, 12, mats.goldPlating, 10));
    add('orig-e1-brain-imu-datum', 90, '#eab308', g, [0, 131.0, 0], [0, -6, 0]);
  }

  // OR91: 5GHz Wi-Fi Direct FPV RF-Transparent Side Window (X_outer=-105.00 -> 0.04mm inside side-armor-left!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(2.0, 14, 32, mats.lcdNanoEtchGlass, 12));
    add('orig-e1-brain-wifi-zone', 91, '#60a5fa', g, [-104.0, 139.0, 0], [-68, 0, 0]);
  }

  // OR92: USB-C PD Passthrough 4-Port OTG Hub PCB (Y: 88.08..94.48 -> 0.04mm above bus-carrier-pcb!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(46, 6.4, 24, mats.matteBlackAnodized, 14));
    for (let i = 0; i < 4; i++) {
      const p = makeBoxMesh(6, 3.6, 2.4, mats.mountStainlessFlange, 8);
      p.position.set(-15 + i * 10, 0, 13.23);
      g.add(p);
    }
    add('orig-e1-otg-pd-hub', 92, '#334155', g, [54, 91.28, 0], [0, -24, 0]);
  }

  // OR93: ESP32-S3 SuperMini Real-Time Control MCU (Y_bot=88.105 -> 0.065mm above bus-carrier-pcb >0.05mm & <=0.08mm; X_right=-30.04 -> 0.04mm to PCA9685!)
  {
    const g = new THREE.Group();
    g.add(makePlanarTopBox(24, 3.4, 18, mats.origSpinalPcb));
    const chip = makeBoxMesh(7.0, 1.4, 7.0, mats.icEpoxy, 8);
    chip.position.set(0, 2.43, 0);
    g.add(chip);
    add('orig-e1-esp32s3-spine', 93, '#10b981', g, [-42.04, 89.805, 0], [0, -24, 0]);
  }

  // OR94: PCA9685 16-Channel 12-Bit PWM Servo Driver PCB (Y: 88.08..90.48 -> 0.04mm above bus-carrier-pcb!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(60, 2.4, 22, mats.mountShimBlue, 16));
    const ic = makeBoxMesh(10, 2.2, 6, mats.icEpoxy, 10);
    ic.position.set(0, 2.33, 0);
    const hdr = makeBoxMesh(48, 4.2, 6, mats.goldPlating, 12);
    hdr.position.set(0, 3.33, -7.2);
    g.add(ic, hdr);
    add('orig-e1-pca9685-pwm', 94, '#2563eb', g, [0, 89.28, -16], [0, -24, -10]);
  }

  // OR95: CD74HC4067 16-Ch Analog MUX (Y: 88.08..90.28 -> 0.04mm above bus-carrier-pcb!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(40, 2.2, 18, mats.mountRedIndexDot, 14));
    const ic = makeBoxMesh(9, 2.0, 6, mats.icEpoxy, 10);
    ic.position.set(0, 2.13, 0);
    g.add(ic);
    add('orig-e1-mux-cd74hc4067', 95, '#dc2626', g, [0, 89.18, 16], [0, -24, 10]);
  }

  // OR96: Lower Backbone Carrier & Power-Distribution Bus PCB (Y: 86.04..88.04 -> 0.04mm above bottom-skid-plate!)
  {
    const g = new THREE.Group();
    g.add(makePlanarTopBox(164, 2.0, 62, mats.origSpinalPcb));
    add('orig-e1-bus-carrier-pcb', 96, '#065f46', g, [0, 87.04, 0], [0, -38, 0]);
  }

  // OR97: Front-Lower RGB Operating-Mode & Human-Safe Lock Status LED Bar (Z_back=64.28 -> 0.04mm outside front faceplate!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(44, 3.6, 2.6, mats.lcdMicroLedGanArray, 12));
    add('orig-e1-status-led-bar', 97, '#38bdf8', g, [0, 92.0, 65.58], [0, -18, 198]);
  }

  // OR98: Mid-Plane Side Aluminum Thermal Heat-Path Fin Duct (X_outer=+105.00 -> 0.04mm inside side-armor-right!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(2.0, 14, 32, mats.copperHeatSpreader, 12));
    add('orig-e1-thermal-vent-duct', 98, '#d07447', g, [104.0, 139.0, 0], [68, 0, 0]);
  }

  return {
    parts,
    rigRefs: {
      frontLauncherGroups,
      rearLauncherGroups,
      frontCamGimbalGroups,
      rearCamGimbalGroups,
      frontShutterGroup,
      rearShutterGroup,
    },
  };
}
