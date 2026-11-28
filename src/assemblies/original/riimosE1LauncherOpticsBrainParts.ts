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
    // Compact PETG/PA66-GF30 flywheel housing cage (22 x 20 x 20mm)
    const cage = makeBoxMesh(22, 20, 20, mats.pa66ThermalBreak, 16);
    g.add(cage);
    const fwL = makeCylMesh(7.4, 7.4, 5.2, mats.lensRubberGrip, 16);
    fwL.position.set(-5.8, 0, -1.5);
    const fwR = makeCylMesh(7.4, 7.4, 5.2, mats.lensRubberGrip, 16);
    fwR.position.set(5.8, 0, -1.5);
    // Precision 6.06mm inner barrel seated 0.03mm outside cage & reaching |Z|=55.66 under aim-frame carrier rails!
    const barrel = makeCylMesh(4.0, 4.0, 11.63, mats.stainlessMachined, 14);
    barrel.rotation.x = Math.PI * 0.5;
    barrel.position.set(0, 0, ld.sz * 15.845);
    g.add(fwL, fwR, barrel);

    if (ld.sz > 0) frontLauncherGroups.push(g);
    else rearLauncherGroups.push(g);

    add(
      ld.id,
      ld.order,
      ld.sz > 0 ? '#334155' : '#475569',
      g,
      [ld.sx * 78, ld.y, ld.sz * 34],
      [0, 0, ld.sz * 108]
    );
  }

  // OR53–OR56: 4x Shared-Shaft Vertical 180 High-RPM Motors + 1:1 Counter-Rotating Gears (Y: 86.04..182.96 deck-to-deck!)
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
    motor.position.set(0, 5.5, 0);
    g.add(motor);
    // Full deck-to-deck steel bearing through-shaft (Y: 86.04..182.96 -> 0.04mm flush on skid & bulkhead!)
    const shaft = makeCylMesh(1.8, 1.8, 96.92, mats.mountStainlessFlange, 12);
    g.add(shaft);
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
      [sd.sx * 96.5, 134.5, sd.sz * 46.0],
      [sd.sx * 76, 0, 0]
    );
  }

  // OR57–OR58: Front & Rear 4-Barrel Linked 2-Axis Aiming Gimbal Yoke Frames (PA66-GF30, X: [-99.26..+99.26] flush on corner pillars + split L/R barrel carrier rails clearing central camera bay X∈[-57..+57]!)
  for (const [id, order, sz] of [
    ['orig-e1-aim-frame-front', 57, 1],
    ['orig-e1-aim-frame-rear', 58, -1],
  ] as const) {
    const g = new THREE.Group();
    g.add(makeBoxMesh(198.52, 6.0, 3.6, mats.pa66ThermalBreak, 22));
    // Non-overlapping upper/lower tie struts (0.03mm off center bar Y=±3.0 & off rails Y=±30.04)
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        const strut = makeBoxMesh(3.2, 26.98, 3.2, mats.pa66ThermalBreak, 12);
        strut.position.set(sx * 59, sy * 16.52, 0);
        g.add(strut);
        // Split left/right barrel carrier rails (X: ±[57..93]) seated 0.04mm above/below launcher barrels (X=±78, Y=170/110)
        const rail = makeBoxMesh(36.0, 2.4, 7.6, mats.pa66ThermalBreak, 14);
        rail.position.set(sx * 75, sy * 31.24, -sz * 2.0);
        g.add(rail);
      }
    }
    add(id, order, '#64748b', g, [0, 140.0, sz * 57.5], [0, 0, sz * 138]);
  }

  // OR59–OR62: 4x SG90 Metal-Gear Aiming Servos (PA66 body, horn 0.03mm off body & 0.04mm flush on aim-frame |Z|=55.7!)
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
    const body = makeBoxMesh(12, 22, 10, mats.pa66ThermalBreak, 12);
    const horn = makeCylMesh(3.8, 3.8, 2.2, mats.pomGear, 12);
    horn.rotation.x = Math.PI * 0.5;
    horn.position.set(0, 0, asd.sz * 6.13);
    g.add(body, horn);
    add(
      asd.id,
      asd.order,
      '#2563eb',
      g,
      [asd.x, asd.y, asd.sz * 48.43],
      [0, 0, asd.sz * 116]
    );
  }

  // OR63–OR64: Front & Rear 4-Barrel Rotary Cam Sequencers (Y: 115.96..127.96 -> 0.04mm flush under mid-deck floor!)
  for (const [id, order, sz] of [
    ['orig-e1-cam-sequencer-front', 63, 1],
    ['orig-e1-cam-sequencer-rear', 64, -1],
  ] as const) {
    const g = new THREE.Group();
    const housing = makeBoxMesh(36, 12, 12, mats.pa66ThermalBreak, 14);
    const camDrum = makeCylMesh(5.2, 5.2, 40, mats.stainlessMachined, 14);
    camDrum.rotation.z = Math.PI * 0.5;
    camDrum.position.set(0, 0, 0);
    g.add(housing, camDrum);
    add(id, order, '#b45309', g, [0, 121.96, sz * 33.0], [0, -14, sz * 88]);
  }

  // OR65: 8x Fixed Silicone Hop-Up / Breech Feed Collars (epdmGasket elastomer, |Z|=19.96..23.96 -> 0.04mm on cages!)
  {
    const g = new THREE.Group();
    for (const sz of [1, -1]) {
      for (const sx of [-1, 1]) {
        for (const y of [166, 114]) {
          const bucking = makeCylMesh(4.6, 4.6, 4.0, mats.epdmGasket, 12);
          bucking.rotation.x = Math.PI * 0.5;
          bucking.position.set(sx * 78, y - 140, sz * 21.96);
          g.add(bucking);
        }
      }
    }
    add('orig-e1-hopup-buckings-8x', 65, '#f97316', g, [0, 140, 0], [0, 0, 0], 0.14);
  }

  // OR66–OR67: Front & Rear 4-Square Muzzle Protection Bezels (Monolithic PA66-GF30 4-port CNC shroud, |Z|=64.28..67.48 -> 0.04mm flush on faceplates!)
  for (const [id, order, sz] of [
    ['orig-e1-muzzle-bezels-front', 66, 1],
    ['orig-e1-muzzle-bezels-rear', 67, -1],
  ] as const) {
    const g = new THREE.Group();
    const t = 2.6;
    const d = 3.2;
    for (const sx of [-1, 1]) {
      for (const y of [166, 114]) {
        const cx = sx * 78;
        const cy = y - 140;
        const topBar = makeBoxMesh(34, t, d, mats.pa66ThermalBreak, 12);
        topBar.position.set(cx, cy + 14.5, 0);
        const botBar = makeBoxMesh(34, t, d, mats.pa66ThermalBreak, 12);
        botBar.position.set(cx, cy - 14.5, 0);
        const leftBar = makeBoxMesh(t, 26.34, d, mats.pa66ThermalBreak, 12);
        leftBar.position.set(cx - 15.7, cy, 0);
        const rightBar = makeBoxMesh(t, 26.34, d, mats.pa66ThermalBreak, 12);
        rightBar.position.set(cx + 15.7, cy, 0);
        g.add(topBar, botBar, leftBar, rightBar);
      }
      // Vertical side bridge joining upper & lower muzzle bezels (cy: -10.17..+10.17 -> 0.03mm off ±10.20 bars!)
      const vBridge = makeBoxMesh(t, 20.34, d, mats.pa66ThermalBreak, 10);
      vBridge.position.set(sx * 78, 0, 0);
      g.add(vBridge);
    }
    // Lower horizontal cross-bridge tying left & right muzzle banks (X: -60.97..+60.97 at cy=-40.5 -> Y=99.5, 45mm below camera ring!)
    const hBridge = makeBoxMesh(121.94, t, d, mats.pa66ThermalBreak, 16);
    hBridge.position.set(0, -40.5, 0);
    g.add(hBridge);
    add(id, order, '#0f172a', g, [0, 140.0, sz * 65.88], [0, 0, sz * 198]);
  }

  // OR68: 0.135J Hardware Physical Upper-Limit Voltage Limiter Board (FR-4 PCB, Y: 86.04..90.04, pot +0.03mm!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(34, 4.0, 14, mats.hdiMainboardPcb, 14));
    const pot = makeBoxMesh(6, 4.0, 6, mats.pa66ThermalBreak, 8);
    pot.position.set(9, 4.03, 0);
    g.add(pot);
    add('orig-e1-energy-cap-board', 68, '#10b981', g, [0, 88.04, 48.0], [0, -24, 92]);
  }

  // ===========================================================================
  // GROUP 5: FRONT/REAR 120Hz CAMERAS + FAIL-CLOSED SHUTTERS + TOP 360° DOME (OR69–OR86, 18 Parts)
  // ===========================================================================
  const buildCameraPod = (sz: 1 | -1, baseOrder: number, prefix: string) => {
    const gimbalList = sz > 0 ? frontCamGimbalGroups : rearCamGimbalGroups;

    // +0: Outer Circular Camera Bezel Ring (R=18.2 > faceplate cutout R=17.5 -> crest seats 0.04mm on faceplate |Z|=64.24!)
    {
      const g = new THREE.Group();
      const ringGeo = new THREE.TorusGeometry(
        18.2,
        2.4,
        scaleRadialSegmentsForQuality(12),
        scaleRadialSegmentsForQuality(24)
      );
      g.add(new THREE.Mesh(ringGeo, mats.pa66ThermalBreak));
      add(
        `${prefix}-ring`,
        baseOrder,
        '#111827',
        g,
        [0, 167.0, sz * 66.68],
        [0, 20, sz * 208]
      );
    }

    // +1: Front-Mounted AR Optical Protective Glass Disk (r=18.4 seated 0.040mm axially in front of bezel crest |Z|=69.08; 100% immune to chord sag!)
    {
      const g = new THREE.Group();
      const disk = makeCylMesh(18.4, 18.4, 1.2, mats.lcdNanoEtchGlass, 22);
      disk.rotation.x = Math.PI * 0.5;
      g.add(disk);
      add(
        `${prefix}-glass`,
        baseOrder + 1,
        '#93c5fd',
        g,
        [0, 167.0, sz * 69.72],
        [0, 20, sz * 226],
        0.16
      );
    }

    // +2: OV7720 / OV7725 120Hz Bare Sensor PCB (die +0.03mm off PCB & 0.04mm flush on lens rear 53.50!)
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
        [0, 167.0, sz * 51.23],
        [0, 10, sz * 92]
      );
    }

    // +3: M12 Wide-Medium Low-Distortion Lens Barrel (trunnions seat 0.04mm inside gimbal arms X=±12.0!)
    {
      const g = new THREE.Group();
      const barrel = makeCylMesh(6.6, 7.2, 10.0, mats.pa66ThermalBreak, 18);
      barrel.rotation.x = Math.PI * 0.5;
      const frontElem = makeCylMesh(5.6, 5.6, 1.2, mats.welcomeOpticalEd, 16);
      frontElem.rotation.x = Math.PI * 0.5;
      frontElem.position.set(0, 0, sz * 5.63);
      const trunnion = makeCylMesh(1.8, 1.8, 23.92, mats.stainlessMachined, 10);
      trunnion.rotation.z = Math.PI * 0.5;
      g.add(barrel, frontElem, trunnion);
      gimbalList.push(g);
      add(
        `${prefix}-lens`,
        baseOrder + 3,
        '#38bdf8',
        g,
        [0, 167.0, sz * 58.50],
        [0, 14, sz * 128]
      );
    }

    // +4: 1-Axis Physical Pitch Stabilization U-Cradle (PA66-GF30, |Z|=55.0..62.00 -> 0.04mm flush on faceplate inner wall!)
    {
      const g = new THREE.Group();
      const armL = makeBoxMesh(2.4, 20, 7.0, mats.pa66ThermalBreak, 12);
      armL.position.set(-13.2, 0, 0);
      const armR = makeBoxMesh(2.4, 20, 7.0, mats.pa66ThermalBreak, 12);
      armR.position.set(13.2, 0, 0);
      const botBar = makeBoxMesh(28.8, 2.4, 7.0, mats.pa66ThermalBreak, 12);
      botBar.position.set(0, -11.23, 0);
      g.add(armL, armR, botBar);
      gimbalList.push(g);
      add(
        `${prefix}-gimbal`,
        baseOrder + 4,
        '#94a3b8',
        g,
        [0, 167.0, sz * 58.50],
        [0, 12, sz * 112]
      );
    }

    // +5: Dual-Duty Pitch-Stab & +85° Fail-Closed Shutter SG90 Servo (Z=±56.00 clears faceplate 62.04 by 0.04mm; shaft hits gimbal armR!)
    {
      const g = new THREE.Group();
      g.add(makeBoxMesh(11.5, 22, 12, mats.pa66ThermalBreak, 12));
      const shaft = makeCylMesh(2.4, 2.4, 3.6, mats.pomGear, 10);
      shaft.rotation.z = Math.PI * 0.5;
      shaft.position.set(-7.58, 5.0, 0);
      g.add(shaft);
      add(
        `${prefix}-servo`,
        baseOrder + 5,
        '#2563eb',
        g,
        [23.82, 167.0, sz * 56.00],
        [24, 12, sz * 114]
      );
    }

    // +6: Fail-Closed Torsion-Spring Physical Vision-Shutout Hood (|Z|=71.36 -> blade back face 70.36 seats 0.040mm off cam-glass front 70.32!)
    {
      const g = new THREE.Group();
      const blade = makeBoxMesh(22, 2.8, 2.0, mats.pa66ThermalBreak, 12);
      blade.position.set(0, 16.5, 0);
      const springHub = makeCylMesh(2.2, 2.2, 3.6, mats.mountSpringSteel, 10);
      springHub.rotation.z = Math.PI * 0.5;
      springHub.position.set(-12.83, 16.5, 0);
      g.add(blade, springHub);
      if (sz > 0) frontShutterGroup = g;
      else rearShutterGroup = g;
      add(
        `${prefix}-shutter`,
        baseOrder + 6,
        '#f97316',
        g,
        [0, 167.0, sz * 71.36],
        [0, 26, sz * 242]
      );
    }
  };

  buildCameraPod(1, 69, 'orig-e1-cam-front');
  buildCameraPod(-1, 76, 'orig-e1-cam-rear');

  // OR83–OR86: Top 360° Fisheye Surveillance Camera Mast & Transparent Dome (0.04mm precision stack on mag hatch Y=231.48!)
  {
    const g = new THREE.Group();
    g.add(makeCylMesh(13.5, 15.0, 11.4, mats.pa66ThermalBreak, 22));
    add('orig-e1-cam-top-mast', 83, '#1e293b', g, [-4, 237.22, 42], [0, 174, 0]);
  }
  {
    const g = new THREE.Group();
    // 12.6x12.6 compact board (diagonal half = 8.91mm) clears dome halo inner polygon across all 4 tiers!
    g.add(makeBoxMesh(12.6, 2.0, 12.6, mats.hdiMainboardPcb, 12));
    add('orig-e1-cam-top-pcb', 84, '#15803d', g, [-4, 243.96, 42], [0, 192, 0]);
  }
  {
    const g = new THREE.Group();
    g.add(makeCylMesh(6.2, 6.8, 5.2, mats.pa66ThermalBreak, 18));
    const glass = makeSphereMesh(5.2, mats.welcomeOpticalEd, 14);
    glass.scale.set(1, 0.52, 1);
    glass.position.set(0, 2.63, 0);
    g.add(glass);
    add('orig-e1-cam-top-fisheye', 85, '#38bdf8', g, [-4, 247.60, 42], [0, 206, 0]);
  }
  {
    const g = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(
      12.4,
      1.6,
      Math.max(8, scaleRadialSegmentsForQuality(10)),
      Math.max(12, scaleRadialSegmentsForQuality(22))
    );
    const halo = new THREE.Mesh(ringGeo, mats.pa66ThermalBreak);
    halo.rotation.x = Math.PI * 0.5;
    halo.position.set(0, -6.44, 0);
    for (const sx of [-1, 1]) {
      const post = makeCylMesh(1.2, 1.2, 7.36, mats.pa66ThermalBreak, 10);
      post.position.set(sx * 11.4, -1.13, 0);
      g.add(post);
    }
    const cap = makeCylMesh(10.8, 12.6, 2.2, mats.lcdNanoEtchGlass, 22);
    cap.position.set(0, 3.68, 0);
    g.add(halo, cap);
    add('orig-e1-cam-top-dome', 86, '#bae6fd', g, [-4, 251.0, 42], [0, 228, 0], 0.16);
  }

  // ===========================================================================
  // GROUP 6: MOTOROLA moto g52j 5G (0 JPY CORE) & LOWER SPINAL CONTROL (OR87–OR98, 12 Parts)
  // ===========================================================================

  // OR87: Motorola moto g52j 5G Full-Scale Body (polycarbonate shell, Y: 134.54..143.14, submeshes +0.03mm!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(171.0, 8.6, 76.8, mats.pa66ThermalBreak, 24));
    const camBump = makeBoxMesh(28, 0.8, 14, mats.pa66ThermalBreak, 10);
    camBump.position.set(-62, 4.73, -22);
    const usbPort = makeBoxMesh(1.4, 3.0, 8.8, mats.goldPlating, 8);
    usbPort.position.set(86.23, 0, 0);
    g.add(camBump, usbPort);
    add('orig-e1-brain-g52j-body', 87, '#0f172a', g, [0, 138.84, 0], [0, 0, 0]);
  }

  // OR88: moto g52j Aluminum Thermal Spreader & Rear-Camera Armor Shield (Y: 145.96..147.96 -> 0.04mm flush under ceiling!)
  {
    const g = new THREE.Group();
    g.add(makePlanarTopBox(168, 2.0, 74, mats.origG52jChassisScreen));
    add('orig-e1-brain-g52j-shield', 88, '#38bdf8', g, [0, 146.96, 0], [0, 4, 0]);
  }

  // OR89: moto g52j Quick-Slide Anti-Vibration 3D-Printed Sled (PA66-GF30, Y: 132.5..134.5)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(175, 2.0, 79, mats.pa66ThermalBreak, 22));
    add('orig-e1-brain-g52j-sled', 89, '#334155', g, [0, 133.5, 0], [0, -3, 0]);
  }

  // OR90: moto g52j Built-In 400Hz 6-Axis IMU Reference Datum (FR-4 PCB module, Y: 130.04..132.46)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(12, 2.42, 12, mats.hdiMainboardPcb, 10));
    add('orig-e1-brain-imu-datum', 90, '#eab308', g, [0, 131.25, 0], [0, -6, 0]);
  }

  // OR91: 5GHz Wi-Fi Direct FPV RF-Transparent Side Window (Y: 130.04..147.96 -> 0.04mm flush on floor & ceiling!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(2.0, 17.92, 32, mats.lcdNanoEtchGlass, 12));
    add('orig-e1-brain-wifi-zone', 91, '#60a5fa', g, [-91.5, 139.0, 0], [-68, 0, 0]);
  }

  // OR92: USB-C PD Passthrough 4-Port OTG Hub PCB (PA66 enclosure, Y: 88.08..94.48, ports +0.03mm!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(46, 6.4, 24, mats.pa66ThermalBreak, 14));
    for (let i = 0; i < 4; i++) {
      const p = makeBoxMesh(6, 3.6, 2.4, mats.mountStainlessFlange, 8);
      p.position.set(-15 + i * 10, 0, 13.23);
      g.add(p);
    }
    add('orig-e1-otg-pd-hub', 92, '#334155', g, [54, 91.28, 0], [0, -24, 0]);
  }

  // OR93: ESP32-S3 SuperMini Real-Time Spinal MCU (FR-4 PCB, Y: 88.08..91.48, chip +0.03mm!)
  {
    const g = new THREE.Group();
    g.add(makePlanarTopBox(24, 3.4, 18, mats.origSpinalPcb));
    const chip = makeBoxMesh(7.0, 1.4, 7.0, mats.icEpoxy, 8);
    chip.position.set(0, 2.43, 0);
    g.add(chip);
    add('orig-e1-esp32s3-spine', 93, '#10b981', g, [-52, 89.78, 0], [0, -24, 0]);
  }

  // OR94: PCA9685 16-Channel 12-Bit PWM Servo Driver PCB (FR-4 PCB, Y: 88.08..90.48, ic/hdr +0.03mm!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(60, 2.4, 22, mats.hdiMainboardPcb, 16));
    const ic = makeBoxMesh(10, 2.2, 6, mats.icEpoxy, 10);
    ic.position.set(0, 2.33, 0);
    const hdr = makeBoxMesh(48, 4.2, 6, mats.goldPlating, 12);
    hdr.position.set(0, 3.33, -7.2);
    g.add(ic, hdr);
    add('orig-e1-pca9685-pwm', 94, '#2563eb', g, [0, 89.28, -16], [0, -24, -10]);
  }

  // OR95: CD74HC4067 16-Ch Analog MUX (FR-4 PCB, Y: 88.08..90.28, ic +0.03mm!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(40, 2.2, 18, mats.hdiMainboardPcb, 14));
    const ic = makeBoxMesh(9, 2.0, 6, mats.icEpoxy, 10);
    ic.position.set(0, 2.13, 0);
    g.add(ic);
    add('orig-e1-mux-cd74hc4067', 95, '#dc2626', g, [0, 89.18, 16], [0, -24, 10]);
  }

  // OR96: Lower Spinal Carrier & Power-Distribution Bus PCB (FR-4 PCB, Y: 86.04..88.04!)
  {
    const g = new THREE.Group();
    g.add(makePlanarTopBox(164, 2.0, 62, mats.origSpinalPcb));
    add('orig-e1-spine-carrier-pcb', 96, '#065f46', g, [0, 87.04, 0], [0, -38, 0]);
  }

  // OR97: Front-Lower RGB Operating-Mode & Human-Safe Lock Status LED Bar (Z: 64.28..66.88!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(44, 3.6, 2.6, mats.lcdMicroLedGanArray, 12));
    add('orig-e1-status-led-bar', 97, '#38bdf8', g, [0, 92.0, 65.58], [0, -18, 198]);
  }

  // OR98: Mid-Plane Side Aluminum Thermal Heat-Path Fin Duct (Y: 130.04..147.96!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(2.0, 17.92, 32, mats.copperHeatSpreader, 12));
    add('orig-e1-thermal-vent-duct', 98, '#d07447', g, [91.5, 139.0, 0], [68, 0, 0]);
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
