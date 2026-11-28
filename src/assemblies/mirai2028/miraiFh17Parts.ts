//@FLOW_MAP|file=src/assemblies/mirai2028/miraiFh17Parts.ts|unit=mirai2028|lines=874|exports=buildMiraiFh17Parts
import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import { createFrameShape, createRoundedRectShape } from '../../engine/CadHelpers';
import {
  applyPlanarUVs,
  buildChipPackage,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import {
  buildCurvedFpcRibbon,
  finalizeMiraiPart,
  InstanceTransform,
  makeMiraiInstanced,
} from './miraiShared';

/**
 * FH17 — Earth-Rotation Compensation (Ω_E = 15.04"/s) + Magnetic-Levitation
 * CIPA 10–11 Stop IBIS & ±1–2° Scheimpflug Micro-Tilt Focal-Plane Control Unit.
 *
 * Footprint: 76.0 × 64.0 × 15.5 mm (Full-frame 36×24 mm 6-DOF MagLev Gimbal).
 * 18 Watchmaker-Grade Explodable 3D CAD Parts (`miraiSubView = 7`, order 105..122).
 * Zero direct `new THREE.Mesh*Material` allocations; max 2 InstancedMeshes (`+3 dc` total!).
 */
export function buildMiraiFh17Parts(
  mats: V2MaterialLibrary,
  clippingPlanes?: THREE.Plane[]
): CadPart[] {
  const cp = clippingPlanes ?? [];
  const parts: CadPart[] = [];

  // =========================================================================
  // FH17-01 (105): Front Anti-Reflective Dust-Shield Bezel & Ultrasonic AR Glass
  // =========================================================================
  {
    const g = new THREE.Group();
    const bezel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(54.0, 42.0, 2.4, 37.6, 25.6, 1.2), 1.05, 0.10, 0.10, 2, 18),
      mats.welcomeCoreSlate
    );
    g.add(bezel);

    // Signature MIRAI 2028 emerald aperture accent collar
    const emRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(41.2, 29.2, 1.5, 38.2, 26.2, 1.1), 0.24, 0.03, 0.03, 1, 14),
      mats.mofEmerald
    );
    emRing.position.z = 0.56;
    g.add(emRing);

    // Crystal-clear translucent AR-coated ultrasonic SSWF protective coverglass revealing the 36×24mm silicon die
    const glass = new THREE.Mesh(
      createChamferedBoxGeo(37.4, 25.4, 0.36, 0.6, 0.04, 'z'),
      mats.opticalCementClear
    );
    glass.position.z = -0.06;
    glass.userData.noEdges = true;
    g.add(glass);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-dust-shield-bezel',
        7,
        105,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, 6.4),
        new THREE.Vector3(0, 0, 46.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH17-02 (106): Floating Full-Frame 36×24 mm Stacked Silicon Sensor Die
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dark alumina ceramic sensor package carrier
    const pkg = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(43.0, 31.0, 1.4), 0.85, 0.08, 0.08, 2, 16),
      mats.ceramicAlumina
    );
    g.add(pkg);

    // Gold perimeter wirebond shelf frame
    const goldShelf = new THREE.Mesh(
      extrudeHiRes(createFrameShape(41.2, 29.2, 1.0, 36.8, 24.8, 0.6), 0.22, 0.02, 0.02, 1, 14),
      mats.goldPlating
    );
    goldShelf.position.z = 0.42;
    g.add(goldShelf);

    // Active 36×24mm iridescent stacked photon-counting silicon die face (reuses cached Hero map!)
    const dieGeo = extrudeHiRes(createRoundedRectShape(36.0, 24.0, 0.45), 0.34, 0.03, 0.03, 1, 12);
    applyPlanarUVs(dieGeo, 36.0, 24.0, 'xy');
    const dieMesh = new THREE.Mesh(dieGeo, mats.miraiSpadArrayMap);
    dieMesh.position.z = 0.52;
    dieMesh.userData.noEdges = true;
    g.add(dieMesh);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-ff-sensor-die',
        7,
        106,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 3.8),
        new THREE.Vector3(0, 0, 34.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH17-03 (107): Ultra-Lightweight Topology-Optimized Titanium 6-DOF Floating Cradle
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculpted open-weight titanium carrier frame supporting sensor + 4 voice coils
    const frame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(56.0, 44.0, 2.8, 34.0, 22.0, 1.6), 1.25, 0.12, 0.12, 2, 18),
      mats.welcomeTitaniumFace
    );
    g.add(frame);

    // 4 low-inertia coil-wing extension tabs (left, right, top, bottom)
    for (const [wx, wy, ww, wh] of [
      [0, 23.6, 28.0, 4.4],
      [0, -23.6, 28.0, 4.4],
      [-29.6, 0, 4.4, 26.0],
      [29.6, 0, 4.4, 26.0],
    ]) {
      const wing = new THREE.Mesh(
        createChamferedBoxGeo(ww, wh, 0.95, 0.55, 0.08, 'z'),
        mats.stainlessMachined
      );
      wing.position.set(wx, wy, 0);
      g.add(wing);
    }

    // 3 precision ground brass piezo-tilt contact pads on back face (-Z)
    for (const [px, py] of [
      [-18.0, 14.0],
      [18.0, 14.0],
      [0, -16.0],
    ]) {
      const seat = new THREE.Mesh(hiResCyl(2.2, 2.2, 0.45, 16), mats.brassPrecision);
      seat.rotation.x = Math.PI / 2;
      seat.position.set(px, py, -0.72);
      g.add(seat);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-ti-floating-cradle',
        7,
        107,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 2.2),
        new THREE.Vector3(0, 0, 24.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH17-04 (108): Front Soft-Iron Flux Yoke & 4-Side Halbach N52 Magnet Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // Open-center front yoke frame clearing the 54×42 dust bezel cleanly!
    const yoke = new THREE.Mesh(
      extrudeHiRes(createFrameShape(72.0, 60.0, 3.2, 56.5, 44.5, 2.2), 1.35, 0.12, 0.12, 2, 18),
      mats.softIronYoke
    );
    g.add(yoke);

    // 4-side Halbach N52 Neodymium magnet bars (3-segment polarity array per side!)
    const horizSides = [26.2, -26.2];
    for (const sy of horizSides) {
      for (let s = -1; s <= 1; s++) {
        const mag = new THREE.Mesh(
          createChamferedBoxGeo(11.4, 5.2, 1.35, 0.35, 0.08, 'z'),
          s === 0 ? mats.neodymiumMagnet : mats.welcomeTitaniumFace
        );
        mag.position.set(s * 12.2, sy, -0.82);
        g.add(mag);
      }
      // Gold Halbach flux-vector indicator stripe
      const stripe = new THREE.Mesh(
        createChamferedBoxGeo(26.0, 0.55, 0.16, 0.1, 0.02, 'z'),
        mats.goldPlating
      );
      stripe.position.set(0, sy, 0.72);
      g.add(stripe);
    }
    const vertSides = [-32.2, 32.2];
    for (const sx of vertSides) {
      for (let s = -1; s <= 1; s++) {
        const mag = new THREE.Mesh(
          createChamferedBoxGeo(5.2, 10.6, 1.35, 0.35, 0.08, 'z'),
          s === 0 ? mats.neodymiumMagnet : mats.welcomeTitaniumFace
        );
        mag.position.set(sx, s * 11.4, -0.82);
        g.add(mag);
      }
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-front-halbach-yoke',
        7,
        108,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 5.2),
        new THREE.Vector3(0, 15.0, 34.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH17-05 (109): 4× High-Density Rectangular Copper Flat-Wire X/Y/Roll Voice Coils
  // =========================================================================
  {
    const g = new THREE.Group();
    const coils: ReadonlyArray<readonly [number, number, number, number]> = [
      [0, 24.4, 25.0, 6.2],   // Top Y/Roll coil
      [0, -24.4, 25.0, 6.2],  // Bottom Y/Roll coil
      [-30.4, 0, 6.2, 23.0],  // Left X coil
      [30.4, 0, 6.2, 23.0],   // Right X coil
    ];
    for (const [cx, cy, cw, ch] of coils) {
      const iw = Math.max(2.0, cw - 3.6);
      const ih = Math.max(2.0, ch - 3.6);
      const coil = new THREE.Mesh(
        extrudeHiRes(createFrameShape(cw, ch, 1.2, iw, ih, 0.6), 1.65, 0.14, 0.14, 2, 16),
        mats.copperCoil
      );
      coil.position.set(cx, cy, 0);
      g.add(coil);

      // Gold solder lead termination block
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 1.2, 0.45, 0.15, 0.04, 'z'),
        mats.goldPlating
      );
      tab.position.set(cx, cy, -0.95);
      g.add(tab);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-xy-levitation-coils',
        7,
        109,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 2.2),
        new THREE.Vector3(0, 0, 16.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH17-06 (110): 3× Planar Z-Axis Non-Contact Magnetic-Levitation Lift Coils (120° Triad)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [lx, ly] of [
      [-15.5, 11.5],
      [15.5, 11.5],
      [0, -13.5],
    ]) {
      const coil = new THREE.Mesh(
        extrudeHiRes(createFrameShape(13.6, 9.4, 2.0, 7.4, 4.2, 1.0), 1.15, 0.12, 0.12, 2, 16),
        mats.copperHybridBond
      );
      coil.position.set(lx, ly, 0);
      g.add(coil);

      const core = new THREE.Mesh(
        createChamferedBoxGeo(5.6, 3.0, 0.75, 0.4, 0.06, 'z'),
        mats.ferriteInductor
      );
      core.position.set(lx, ly, 0);
      g.add(core);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-z-maglev-coils',
        7,
        110,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, 0.4),
        new THREE.Vector3(0, 0, 8.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH17-07 (111): CORE #1 — 3-Point Stacked PZT Piezo ±1–2° Micro-Tilt Actuators
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [px, py] of [
      [-18.0, 14.0],
      [18.0, 14.0],
      [0, -16.0],
    ]) {
      // Machined titanium flexure collar base
      const base = new THREE.Mesh(hiResCyl(3.4, 3.8, 0.75, 18), mats.welcomeTitaniumFace);
      base.rotation.x = Math.PI / 2;
      base.position.set(px, py, -0.75);
      g.add(base);

      // Multi-layer stacked PZT ceramic piezo column with gleaming gold electrode rings
      const pzt = new THREE.Mesh(hiResCyl(2.4, 2.4, 1.7, 18), mats.pztCeramic);
      pzt.rotation.x = Math.PI / 2;
      pzt.position.set(px, py, 0.35);
      g.add(pzt);

      for (const ez of [-0.15, 0.35, 0.85]) {
        const elec = new THREE.Mesh(hiResCyl(2.54, 2.54, 0.14, 18), mats.goldPlating);
        elec.rotation.x = Math.PI / 2;
        elec.position.set(px, py, ez);
        g.add(elec);
      }

      // Spherical ruby/ceramic tilt pivot dome contacting the cradle brass pad
      const tip = new THREE.Mesh(hiResSphere(1.05, 14, 10), mats.rubyThermalFuse);
      tip.position.set(px, py, 1.45);
      g.add(tip);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-piezo-tilt-triad',
        7,
        111,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, -1.2),
        new THREE.Vector3(0, -16.0, 4.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH17-08 (112): Power-Off Fail-Safe Si₃N₄ Ceramic Balls & Magnetic Park-Lock Mechanism
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [bx, by] of [
      [-23.5, -16.5],
      [23.5, -16.5],
      [0, 18.5],
    ]) {
      const pocket = new THREE.Mesh(hiResCyl(2.5, 2.8, 0.65, 16), mats.stainlessMachined);
      pocket.rotation.x = Math.PI / 2;
      pocket.position.set(bx, by, -0.35);
      g.add(pocket);

      const ball = new THREE.Mesh(hiResSphere(1.32, 16, 12), mats.siliconNitrideBall);
      ball.position.set(bx, by, 0.55);
      g.add(ball);
    }

    // Center top electromagnetic park-lock solenoid latch
    const latch = new THREE.Mesh(
      createChamferedBoxGeo(8.4, 3.6, 1.6, 0.45, 0.08, 'z'),
      mats.brassPrecision
    );
    latch.position.set(0, 18.5, -0.35);
    g.add(latch);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-ceramic-landing-pads',
        7,
        112,
        '#334155',
        g,
        new THREE.Vector3(0, 0, -1.2),
        new THREE.Vector3(0, 14.0, -4.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH17-09 (113): Sub-Micron 6-DOF Non-Contact Hall & Optical Interferometer Sensor Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // Right-flank rigid-flex carrier PCB holding 6 sub-micron Hall/optical readhead ICs
    const flexBar = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(6.8, 40.0, 1.2), 0.65, 0.06, 0.06, 1, 14),
      mats.polyimideFpc
    );
    g.add(flexBar);

    for (let i = 0; i < 6; i++) {
      const sy = -15.0 + i * 6.0;
      const ic = buildChipPackage({
        w: 3.4,
        d: 3.4,
        h: 0.65,
        style: 'qfn',
        pinsPerSide: 4,
        bodyMat: mats.icEpoxy,
        leadMat: mats.goldPlating,
        pin1Mat: mats.mofEmerald,
      });
      ic.rotation.x = Math.PI / 2;
      ic.position.set(0, sy, 0.65);
      g.add(ic);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-hall-optical-encoders',
        7,
        113,
        '#f59e0b',
        g,
        new THREE.Vector3(35.8, 0, 1.6),
        new THREE.Vector3(34.0, 0, 10.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH17-10 (114): CORE #2 — Earth-Rotation Compensation (15.04"/s) MEMS Gyro + GNSS IMU PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical left-flank dedicated precision navigation-grade IMU PCB
    const pcbGeo = extrudeHiRes(createRoundedRectShape(16.0, 42.0, 1.6), 1.05, 0.08, 0.08, 2, 16);
    const pcb = new THREE.Mesh(pcbGeo, mats.hdiMainboardPcb);
    g.add(pcb);

    // High-DPI 1024px Earth-Rotation 15.04"/s silkscreen faces (+Z front & -Z rear for 360° back-view detail!)
    const faceGeo = extrudeHiRes(createRoundedRectShape(15.2, 40.8, 1.2), 0.12, 0.02, 0.02, 1, 12);
    applyPlanarUVs(faceGeo, 15.2, 40.8, 'xy');
    const face = new THREE.Mesh(faceGeo, mats.fh17ImuGyroPcbMap);
    face.position.z = 0.56;
    face.userData.noEdges = true;
    g.add(face);

    const faceBack = new THREE.Mesh(faceGeo, mats.fh17ImuGyroPcbMap);
    faceBack.rotation.y = Math.PI;
    faceBack.position.z = -0.56;
    faceBack.userData.noEdges = true;
    g.add(faceBack);

    // Hermetic stainless Faraday lid over low-noise 3-axis MEMS gyro + magnetometer ASIC
    const gyroCan = new THREE.Mesh(
      createChamferedBoxGeo(8.8, 9.6, 1.45, 0.5, 0.1, 'z'),
      mats.emiShieldCan
    );
    gyroCan.position.set(0, 6.0, 1.25);
    g.add(gyroCan);

    // Gold coaxial GNSS micro-connector for latitude/heading Earth-rotation vector calculation
    const coax = new THREE.Mesh(hiResCyl(1.75, 1.75, 1.6, 16), mats.rfGoldCoax);
    coax.rotation.x = Math.PI / 2;
    coax.position.set(0, -14.0, 1.2);
    g.add(coax);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-earth-rotation-imu',
        7,
        114,
        '#10b981',
        g,
        new THREE.Vector3(-42.5, 0, 0.4),
        new THREE.Vector3(-34.0, 0, 12.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH17-11 (115): Dual Ultra-Compliant Floating S-Curve Polyimide High-Speed FPCs
  // =========================================================================
  {
    const g = new THREE.Group();
    const pts: ReadonlyArray<readonly [number, number]> = [
      [2.2, 6.0],
      [0.2, 2.2],
      [-2.8, -1.6],
      [-2.6, -6.2],
      [0.4, -9.0],
    ];
    for (const sx of [-13.0, 13.0]) {
      const rib = buildCurvedFpcRibbon(pts, 0.24, 14.0);
      rib.rotateY(Math.PI / 2);
      const m = new THREE.Mesh(rib, mats.polyimideFpc);
      m.position.x = sx;
      g.add(m);

      const zif = new THREE.Mesh(
        createChamferedBoxGeo(15.2, 1.3, 3.2, 0.25, 0.06, 'y'),
        mats.zifIvoryPlastic
      );
      zif.position.set(sx, -9.2, -0.4);
      g.add(zif);

      const gold = new THREE.Mesh(
        createChamferedBoxGeo(13.4, 0.24, 1.0, 0.08, 0.03, 'y'),
        mats.goldPlating
      );
      gold.position.set(sx, -8.5, -0.8);
      g.add(gold);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-dual-floating-fpc',
        7,
        115,
        '#d97706',
        g,
        new THREE.Vector3(0, -29.5, 0.2),
        new THREE.Vector3(0, -24.0, 8.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH17-12 (116): Rear Opposing Halbach N52 Magnet Circuit & Closed-Loop Back Yoke
  // =========================================================================
  {
    const g = new THREE.Group();
    const backYoke = new THREE.Mesh(
      extrudeHiRes(createFrameShape(72.0, 60.0, 3.2, 30.0, 18.0, 2.0), 1.35, 0.12, 0.12, 2, 18),
      mats.softIronYoke
    );
    g.add(backYoke);

    // Rear opposing Halbach N52 bars aligned directly across air-gap from front yoke
    for (const sy of [26.2, -26.2]) {
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(35.0, 5.2, 1.25, 0.35, 0.08, 'z'),
        mats.neodymiumMagnet
      );
      bar.position.set(0, sy, 0.85);
      g.add(bar);
    }
    for (const sx of [-32.2, 32.2]) {
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(5.2, 32.0, 1.25, 0.35, 0.08, 'z'),
        mats.neodymiumMagnet
      );
      bar.position.set(sx, 0, 0.85);
      g.add(bar);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-rear-halbach-yoke',
        7,
        116,
        '#475569',
        g,
        new THREE.Vector3(0, 0, -3.4),
        new THREE.Vector3(0, 0, -14.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH17-13 (117): Non-Constraining Flexible Pyrolytic Graphite Thermal Transport Bridge
  // =========================================================================
  {
    const g = new THREE.Group();
    const pad = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(46.0, 32.0, 2.2), 0.45, 0.05, 0.05, 1, 16),
      mats.pyroGraphite
    );
    g.add(pad);

    // 4 accordion copper-laminated flexure heat straps enabling zero-drag MagLev cooling
    for (let i = 0; i < 4; i++) {
      const sx = -15.0 + i * 10.0;
      const strap = new THREE.Mesh(
        createChamferedBoxGeo(5.4, 34.0, 0.24, 0.3, 0.04, 'z'),
        mats.copperHeatSpreader
      );
      strap.position.set(sx, 0, -0.30);
      g.add(strap);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-flexible-graphite-strap',
        7,
        117,
        '#334155',
        g,
        new THREE.Vector3(0, 0, -4.6),
        new THREE.Vector3(0, 0, -22.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH17-14 (118): 10 kHz 6-DOF Magnetic-Levitation Servo DSP & 6-Ch H-Bridge Driver PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(66.0, 52.0, 2.6), 1.05, 0.08, 0.08, 2, 16),
      mats.pcbEmeraldDark
    );
    g.add(pcb);

    // Central 10 kHz 6-DOF closed-loop Servo DSP ASIC
    const dsp = buildChipPackage({
      w: 11.0,
      d: 11.0,
      h: 1.15,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    dsp.rotation.x = -Math.PI / 2;
    dsp.position.set(0, 2.0, -0.95);
    g.add(dsp);

    // 6-channel GaN/MOSFET H-Bridge coil power drivers flanking the DSP
    for (let i = 0; i < 6; i++) {
      const sx = -22.0 + (i % 3) * 22.0;
      const sy = i < 3 ? 16.0 : -14.0;
      const fet = new THREE.Mesh(
        createChamferedBoxGeo(6.4, 4.8, 0.85, 0.25, 0.06, 'z'),
        mats.icEpoxy
      );
      fet.position.set(sx, sy, -0.88);
      g.add(fet);
    }

    // 24 SMD MLCC filter capacitors (1 single InstancedMesh!)
    const capGeo = markHiRes(new THREE.BoxGeometry(1.6, 0.82, 0.65));
    const capTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 12; i++) {
      const x = -27.5 + (55.0 * i) / 11;
      capTransforms.push({ pos: [x, 22.4, -0.78] });
      capTransforms.push({ pos: [x, -22.4, -0.78] });
    }
    g.add(makeMiraiInstanced(capGeo, mats.smdCeramic, capTransforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-servo-driver-pcb',
        7,
        118,
        '#059669',
        g,
        new THREE.Vector3(0, 0, -5.8),
        new THREE.Vector3(0, 0, -30.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH17-15 (119): Rear C1100 Pure-Copper Thermal Baseplate & FH32 Cooling Contact Pad
  // =========================================================================
  {
    const g = new THREE.Group();
    const tim = new THREE.Mesh(
      createChamferedBoxGeo(58.0, 44.0, 0.55, 1.8, 0.08, 'z'),
      mats.thermalPadPink
    );
    tim.position.z = 0.72;
    g.add(tim);

    const plate = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(68.0, 54.0, 3.0), 1.15, 0.12, 0.12, 2, 18),
      mats.copperHeatSpreader
    );
    g.add(plate);

    // 8 machined thermal relief ribs on rear face (-Z)
    for (let i = 0; i < 8; i++) {
      const ry = -18.5 + (37.0 * i) / 7;
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(56.0, 1.8, 0.75, 0.25, 0.06, 'z'),
        mats.vaporChamberCopper
      );
      rib.position.set(0, ry, -0.85);
      g.add(rib);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-copper-heat-backplate',
        7,
        119,
        '#c26d38',
        g,
        new THREE.Vector3(0, 0, -7.2),
        new THREE.Vector3(0, 0, -38.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH17-16 (120): High-Rigidity CNC Magnesium Outer Gimbal Chassis & 3-Point Mount Ears
  // =========================================================================
  {
    const g = new THREE.Group();
    const chassis = new THREE.Mesh(
      extrudeHiRes(createFrameShape(76.0, 64.0, 3.8, 66.0, 54.0, 2.4), 7.6, 0.22, 0.22, 2, 20),
      mats.magnesiumCast
    );
    g.add(chassis);

    // 3 precision optical-axis datum mounting ears protruding around perimeter
    for (const [ex, ey] of [
      [-37.5, 25.0],
      [37.5, 25.0],
      [0, -33.5],
    ]) {
      const ear = new THREE.Mesh(hiResCyl(4.4, 4.4, 3.4, 18), mats.welcomeCoreSlate);
      ear.rotation.x = Math.PI / 2;
      ear.position.set(ex, ey, -2.0);
      g.add(ear);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-mg-outer-chassis',
        7,
        120,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -1.6),
        new THREE.Vector3(0, -22.0, -14.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // FH17-17 (121): Factory 3-Point Laser Flange-Parallelism Brass Shims & Coil Springs
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [ex, ey] of [
      [-37.5, 25.0],
      [37.5, 25.0],
      [0, -33.5],
    ]) {
      const shim = new THREE.Mesh(hiResCyl(3.8, 3.8, 0.55, 18), mats.brassPrecision);
      shim.rotation.x = Math.PI / 2;
      shim.position.set(ex, ey, 1.4);
      g.add(shim);

      // Stepped calibration spring stack
      for (let k = 0; k < 4; k++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(2.1, 0.34, 8, 18),
          mats.stainlessMachined
        );
        ring.position.set(ex, ey, -0.6 - k * 0.72);
        g.add(ring);
      }
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-tilt-calibration-shims',
        7,
        121,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, -3.2),
        new THREE.Vector3(0, 17.0, -20.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH17-18 (122): 8× Non-Magnetic Titanium M1.6 Precision Torx Mounting Bolts
  // =========================================================================
  {
    const g = new THREE.Group();
    // Flanged socket-head CNC Torx titanium bolt profile via LatheGeometry (1 InstancedMesh, 0 extra dc!)
    const boltPts = [
      new THREE.Vector2(0.01, -2.0),
      new THREE.Vector2(1.45, -2.0),
      new THREE.Vector2(2.35, -1.75),
      new THREE.Vector2(2.35, -0.95),
      new THREE.Vector2(1.85, -0.95),
      new THREE.Vector2(1.85, -0.65),
      new THREE.Vector2(1.12, -0.65),
      new THREE.Vector2(1.12, 1.95),
      new THREE.Vector2(0.01, 2.10),
    ];
    const boltGeo = markHiRes(new THREE.LatheGeometry(boltPts, 16));
    boltGeo.rotateX(Math.PI / 2);
    boltGeo.computeVertexNormals();
    const boltTransforms: InstanceTransform[] = [
      { pos: [-34.5, 28.5, 0] },
      { pos: [0, 28.5, 0] },
      { pos: [34.5, 28.5, 0] },
      { pos: [-34.5, -28.5, 0] },
      { pos: [0, -28.5, 0] },
      { pos: [34.5, -28.5, 0] },
      { pos: [-34.5, 0, 0] },
      { pos: [34.5, 0, 0] },
    ];
    g.add(makeMiraiInstanced(boltGeo, mats.welcomeTitaniumFace, boltTransforms, false));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh17-titanium-mount-bolts',
        7,
        122,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -8.8),
        new THREE.Vector3(0, 0, -46.0),
        cp,
        0.22
      )
    );
  }

  return parts;
}
