//@FLOW_MAP|file=src/assemblies/mirai2028/miraiFh32Parts.ts|unit=mirai2028|lines=911|exports=buildMiraiFh32Parts
import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import {
  addCircleHoles,
  createFrameShape,
  createRoundedRectShape,
} from '../../engine/CadHelpers';
import {
  buildChipPackage,
  buildShieldedInductor,
  createChamferedBoxGeo,
  hiResCyl,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import {
  addTorxBolts,
  buildCurvedFpcRibbon,
  createGoldWirebondArchGeo,
  createTerracedWaferShape,
  finalizeMiraiPart,
  InstanceTransform,
  makeHorizCncPlate,
  makeMiraiInstanced,
} from './miraiShared';

/**
 * FH32 Structure #4 — IP68 Hermetically Isolated Ultrasonic MEMS Solid-State Air-Cooling Module
 * (`xMEMS XMC-2400/4800` & `Frore AirJet Mini G2 / Mini Sport` Isolating-Capsule Architecture)
 * 18 Watchmaker-Grade Explodable 3D CAD Parts (`miraiSubView = 4`, order 51..68).
 *
 * True-Scale Architecture (66.0 x 48.0 x 9.6 mm):
 *   - Top Wet Air-Cooling Chamber (+Y): Anti-splash intake louvers, open hydrophobic SUS micro-dust
 *     filter mesh (NOT an air-choking sealed ePTFE membrane — 100% faithful to Vol.06 CFD clearing!),
 *     Helmholtz silencing plenum, Dual counter-phase ultrasonic silicon MEMS jet chips, 96-orifice
 *     copper jet-impingement plate, and 2-stage labyrinth rear waterproof exhaust manifold.
 *   - Seamless Laser-Welded IP68 Stainless Isolation Wall (`Y ≈ 0`): Physically isolates camera
 *     electronics below from water/sand even under 1.5m/30min submersion while conducting heat!
 *   - Bottom Dry Electronics & Vapor Chamber (-Y): Partial-cutaway copper micro-vapor chamber +
 *     sintered porous copper wick & 48 support pillars, dual-zone Sensor/SoC cold-plate bosses,
 *     40kHz+ high-voltage piezo driver HDI PCB, S-curve I2C FPC, blue/pink TIM pads, and Mg cradle.
 */
export function buildMiraiFh32Parts(mats: V2MaterialLibrary): CadPart[] {
  const cp: THREE.Plane[] = mats.clippingPlanes;
  const parts: CadPart[] = [];

  const boltPositions8: ReadonlyArray<readonly [number, number, number]> = [
    [-29.8, 0, -20.8],
    [0, 0, -20.8],
    [29.8, 0, -20.8],
    [-29.8, 0, 0],
    [29.8, 0, 0],
    [-29.8, 0, 20.8],
    [0, 0, 20.8],
    [29.8, 0, 20.8],
  ];

  // =========================================================================
  // FH32-01: CNC Anti-Splash Intake Plenum Cover & 12-Blade Louver Grille
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main CNC titanium-slate outer cover frame with large intake aperture (front-right cutaway reveal!)
    const coverShape = createFrameShape(64.4, 46.4, 3.2, 50.0, 32.0, 2.0);
    addCircleHoles(
      coverShape,
      boltPositions8.map(([x, , z]) => [x, -z, 1.25] as [number, number, number])
    );
    g.add(
      makeHorizCncPlate(coverShape, 1.15, mats.welcomeCoreSlate, {
        bevel: 0.16,
        bevelSegs: 2,
        curveSegs: 20,
      })
    );

    // Machined brushed-titanium surround trim framing the intake plenum
    const tiTrim = makeHorizCncPlate(
      createFrameShape(53.0, 35.0, 2.2, 49.4, 31.4, 1.8),
      0.32,
      mats.welcomeTitaniumFace,
      { bevel: 0.06, bevelSegs: 1, curveSegs: 16 }
    );
    tiTrim.position.y = 0.56;
    g.add(tiTrim);

    // 12 angled anti-splash CNC intake louver blades with crisp airflow slits revealing mesh underneath
    // (leaving right-side x > 11.5 open as clean architectural showcase window onto MEMS chip B!)
    const bladeGeo = createChamferedBoxGeo(1.48, 0.34, 30.8, 0.12, 0.04, 'y');
    const louverTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 12; i++) {
      const x = -22.8 + i * 3.05;
      louverTransforms.push({
        pos: [x, 0.22, 0],
        rot: [0, 0, -0.44],
      });
    }
    g.add(makeMiraiInstanced(bladeGeo, mats.welcomeCoreMid, louverTransforms, true));

    // Signature MIRAI 2028 emerald + cyan waterproof capsule inlays placed cleanly clear of center bolt (x=0)!
    const statusBar = new THREE.Mesh(
      createChamferedBoxGeo(16.0, 0.20, 1.35, 0.25, 0.04, 'y'),
      mats.mofEmerald
    );
    statusBar.position.set(-14.5, 0.62, 19.6);
    g.add(statusBar);

    const ipBadge = new THREE.Mesh(
      createChamferedBoxGeo(11.0, 0.20, 1.35, 0.25, 0.04, 'y'),
      mats.thermalPadBlue
    );
    ipBadge.position.set(14.5, 0.62, 19.6);
    g.add(ipBadge);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-intake-grille',
        4,
        51,
        '#334155',
        g,
        new THREE.Vector3(0, 4.35, 0),
        new THREE.Vector3(0, 46.0, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // FH32-02: Open-Channel Hydrophobic SUS Micro-Dust Mesh & Fluoropolymer Drain Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    // White hydrophobic fluoropolymer splash-drain perimeter bezel (open channel for 420 cm³/s airflow!)
    const frame = makeHorizCncPlate(
      createFrameShape(53.6, 35.6, 2.0, 47.6, 29.6, 1.4),
      0.46,
      mats.ptfeCleanWhite,
      { bevel: 0.06, bevelSegs: 1, curveSegs: 16 }
    );
    g.add(frame);

    // Fine open-channel stainless woven micro-dust screen bars (left half filled, right half cutaway)
    const barGeoX = markHiRes(new THREE.BoxGeometry(26.0, 0.12, 0.22));
    const barGeoZ = markHiRes(new THREE.BoxGeometry(0.22, 0.12, 29.2));
    const meshTransformsX: InstanceTransform[] = [];
    for (let r = 0; r < 14; r++) {
      meshTransformsX.push({ pos: [-10.6, 0.02, -13.2 + (26.4 * r) / 13] });
    }
    const meshTransformsZ: InstanceTransform[] = [];
    for (let c = 0; c < 13; c++) {
      meshTransformsZ.push({ pos: [-22.6 + c * 2.0, 0.06, 0] });
    }
    g.add(makeMiraiInstanced(barGeoX, mats.stainlessMachined, meshTransformsX, true));
    g.add(makeMiraiInstanced(barGeoZ, mats.stainlessMachined, meshTransformsZ, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-eptfe-water-mesh',
        4,
        52,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 3.45, 0),
        new THREE.Vector3(0, 39.0, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH32-03: Upper Helmholtz Acoustic Silencing Plenum (14-21 dBA Cavity)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Enclosed waterproof upper capsule sidewall shroud sealing seamlessly from cover down to IP68 wall
    const outerShape = createFrameShape(64.2, 46.2, 3.1, 53.2, 35.2, 1.8);
    addCircleHoles(
      outerShape,
      boltPositions8.map(([x, , z]) => [x, -z, 1.25] as [number, number, number])
    );
    const outerPlenum = makeHorizCncPlate(outerShape, 3.25, mats.welcomeCoreMid, {
      bevel: 0.12,
      bevelSegs: 2,
      curveSegs: 20,
    });
    outerPlenum.position.y = -0.58;
    g.add(outerPlenum);

    // Center acoustic phase-splitter rib dividing Left (Chip A) and Right (Chip B) chambers
    const divider = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 0.82, 34.6, 0.25, 0.06, 'y'),
      mats.welcomeCoreSlate
    );
    g.add(divider);

    // Twin chamfered Helmholtz intake funnel shrouds sitting above Chip A and Chip B
    for (const cx of [-13.2, 13.2]) {
      const funnel = makeHorizCncPlate(
        createFrameShape(22.4, 17.6, 1.4, 18.8, 14.0, 1.0),
        0.52,
        mats.velvetFlockTrap,
        { bevel: 0.06, bevelSegs: 1, curveSegs: 14 }
      );
      funnel.position.set(cx, 0.14, 0.5);
      g.add(funnel);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-upper-acoustic-plenum',
        4,
        53,
        '#475569',
        g,
        new THREE.Vector3(0, 2.75, 0),
        new THREE.Vector3(0, 32.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH32-04 & FH32-05: Dual Counter-Phase Ultrasonic Piezo-Silicon MEMS Jet Chips A & B
  // =========================================================================
  const buildMemsChipGroup = (): THREE.Group => {
    const g = new THREE.Group();
    // Single-crystal DRIE silicon MEMS package body (24.0 x 18.0 x 1.13 mm true xMEMS thickness!)
    const body = makeHorizCncPlate(
      createRoundedRectShape(24.0, 18.0, 0.75),
      0.96,
      mats.siliconBulk,
      { bevel: 0.09, bevelSegs: 2, curveSegs: 14 }
    );
    g.add(body);

    // High-DPI 1024px ultrasonic PZT diaphragm & air-slit face (`fh32MemsChipMap`)
    const topFace = makeHorizCncPlate(
      createRoundedRectShape(23.2, 17.2, 0.55),
      0.14,
      mats.fh32MemsChipMap,
      {
        bevel: 0.02,
        bevelSegs: 1,
        curveSegs: 12,
        planarUv: { w: 23.2, h: 17.2 },
      }
    );
    topFace.position.y = 0.50;
    topFace.userData.noEdges = true;
    g.add(topFace);

    // Precision gold piezo excitation guard perimeter collar
    const pztCollar = makeHorizCncPlate(
      createFrameShape(24.8, 18.8, 0.85, 22.8, 16.8, 0.6),
      0.34,
      mats.goldPlating,
      { bevel: 0.04, bevelSegs: 1, curveSegs: 12 }
    );
    pztCollar.position.y = -0.30;
    g.add(pztCollar);

    return g;
  };

  parts.push(
    finalizeMiraiPart(
      'mirai-fh32-mems-jet-chip-a',
      4,
      54,
      '#0284c7',
      buildMemsChipGroup(),
      new THREE.Vector3(-13.2, 1.85, 0.5),
      new THREE.Vector3(-14.0, 25.0, 0),
      cp,
      0.24
    )
  );

  parts.push(
    finalizeMiraiPart(
      'mirai-fh32-mems-jet-chip-b',
      4,
      55,
      '#0ea5e9',
      buildMemsChipGroup(),
      new THREE.Vector3(13.2, 1.85, 0.5),
      new THREE.Vector3(14.0, 25.0, 0),
      cp,
      0.24
    )
  );

  // =========================================================================
  // FH32-06: Piezo High-Voltage Kovar Interconnect Bridge & 32 Gold Wirebonds
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual ceramic-insulated Kovar high-voltage piezo terminal rails along +Z and -Z edges of chips
    for (const sz of [-10.8, 10.8]) {
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(52.0, 0.55, 2.2, 0.25, 0.06, 'y'),
        mats.kovarSeal
      );
      rail.position.set(0, -0.15, sz);
      g.add(rail);

      const goldBus = new THREE.Mesh(
        createChamferedBoxGeo(49.2, 0.14, 0.9, 0.12, 0.03, 'y'),
        mats.goldPlating
      );
      goldBus.position.set(0, 0.18, sz);
      g.add(goldBus);
    }

    // 32 arched gold drive wirebonds bridging both MEMS chips to the Kovar HV rails (1 InstancedMesh)
    const wireGeo = createGoldWirebondArchGeo(2.4, 0.72, -0.18);
    const wireTransforms: InstanceTransform[] = [];
    for (const chipX of [-13.2, 13.2]) {
      for (let i = 0; i < 8; i++) {
        const px = chipX - 8.8 + (17.6 * i) / 7;
        // Front edge (+Z)
        wireTransforms.push({ pos: [px, 0.22, 8.2], rot: [0, -Math.PI / 2, 0] });
        // Rear edge (-Z)
        wireTransforms.push({ pos: [px, 0.22, -8.2], rot: [0, Math.PI / 2, 0] });
      }
    }
    g.add(makeMiraiInstanced(wireGeo, mats.goldPlating, wireTransforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-pzt-wirebond-bridge',
        4,
        56,
        '#eab308',
        g,
        new THREE.Vector3(0, 2.15, 0.5),
        new THREE.Vector3(0, 28.5, 16.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH32-07: 96-Orifice Laser-Drilled Copper Micro-Jet Impingement Nozzle Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    // Solid pure-copper impingement plate spanning under both MEMS chips
    const plate = makeHorizCncPlate(
      createRoundedRectShape(55.4, 34.6, 1.8),
      0.56,
      mats.copperHeatSpreader,
      { bevel: 0.08, bevelSegs: 2, curveSegs: 18 }
    );
    g.add(plate);

    // 12 x 8 = 96 precision raised micro-jet impingement copper nozzle orifices (1 InstancedMesh!)
    const nozzleGeo = hiResCyl(0.68, 0.92, 0.52, 12);
    const nozzleTransforms: InstanceTransform[] = [];
    for (let bank = 0; bank < 2; bank++) {
      const bankCx = bank === 0 ? -13.2 : 13.2;
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          nozzleTransforms.push({
            pos: [
              bankCx + (c - 3.5) * 2.65,
              0.42,
              (r - 2.5) * 2.55,
            ],
          });
        }
      }
    }
    g.add(makeMiraiInstanced(nozzleGeo, mats.copperHybridBond, nozzleTransforms, true));

    // Machined peripheral flow-guide copper manifold lips directing spent jet air rearward (-Z)
    for (const sx of [-26.2, 0, 26.2]) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(1.1, 0.55, 31.0, 0.16, 0.05, 'y'),
        mats.vaporChamberCopper
      );
      rib.position.set(sx, 0.45, 0);
      g.add(rib);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-nozzle-impingement',
        4,
        57,
        '#d97706',
        g,
        new THREE.Vector3(0, 0.88, 0.5),
        new THREE.Vector3(0, 17.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH32-08: CORE IP68 — Seamless Laser-Welded Stainless Isolation Barrier Wall
  // =========================================================================
  {
    const g = new THREE.Group();
    // Zero-perforation solid SUS304 hermetic bulkhead separating wet air chamber from dry camera body!
    const wallShape = createRoundedRectShape(64.8, 46.8, 3.2);
    addCircleHoles(
      wallShape,
      boltPositions8.map(([x, , z]) => [x, -z, 1.25] as [number, number, number])
    );
    const wall = makeHorizCncPlate(wallShape, 0.58, mats.mountStainlessFlange, {
      bevel: 0.09,
      bevelSegs: 2,
      curveSegs: 20,
    });
    g.add(wall);

    // Raised gold/brass laser-seam weld bead perimeter marking the IP68 hermetic seal boundary
    const weldSeam = makeHorizCncPlate(
      createFrameShape(59.8, 41.8, 2.4, 57.6, 39.6, 2.0),
      0.20,
      mats.brassPrecision,
      { bevel: 0.03, bevelSegs: 1, curveSegs: 16 }
    );
    weldSeam.position.y = 0.34;
    g.add(weldSeam);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-ip68-isolation-wall',
        4,
        58,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0.12, 0),
        new THREE.Vector3(0, 10.5, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // FH32-09: Rear 2-Stage Labyrinth Waterproof Exhaust Duct Manifold
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main CNC rear exhaust manifold housing spanning -Z edge of wet chamber
    const ductBody = new THREE.Mesh(
      createChamferedBoxGeo(54.0, 3.2, 6.2, 0.85, 0.16, 'y'),
      mats.welcomeCoreSlate
    );
    g.add(ductBody);

    // 6 stepped discharge exhaust nozzle slots along rear face (-Z)
    for (let i = 0; i < 6; i++) {
      const x = -20.5 + i * 8.2;
      const slot = new THREE.Mesh(
        createChamferedBoxGeo(5.6, 1.5, 1.4, 0.25, 0.06, 'z'),
        mats.velvetFlockTrap
      );
      slot.position.set(x, 0.1, -2.75);
      g.add(slot);

      // Hydrophobic elastomer drainage lip & check flap
      const flap = new THREE.Mesh(
        createChamferedBoxGeo(5.2, 0.24, 1.2, 0.10, 0.03, 'y'),
        mats.thermalPadBlue
      );
      flap.position.set(x, -0.58, -2.9);
      g.add(flap);
    }

    // Internal labyrinth water-trap baffle fin strip visible along top edge
    const trapFin = new THREE.Mesh(
      createChamferedBoxGeo(51.0, 0.52, 1.2, 0.15, 0.05, 'y'),
      mats.welcomeTitaniumFace
    );
    trapFin.position.set(0, 1.62, -0.6);
    g.add(trapFin);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-exhaust-duct-manifold',
        4,
        59,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 2.15, -24.2),
        new THREE.Vector3(0, 18.0, -28.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH32-10: IP68 Dual-Lip Fluorosilicone Perimeter Compression O-Ring Seal
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer continuous IP68 compression gasket around entire 62.4 x 44.4 mm capsule perimeter
    const outerRing = makeHorizCncPlate(
      createFrameShape(62.4, 44.4, 2.8, 59.0, 41.0, 2.2),
      0.72,
      mats.thermalPadBlue,
      { bevel: 0.18, bevelSegs: 2, curveSegs: 20 }
    );
    g.add(outerRing);

    // Secondary inner compression bead ridge for double-lip 1.5m/30min submersion sealing
    const innerLip = makeHorizCncPlate(
      createFrameShape(57.2, 39.2, 2.0, 55.2, 37.2, 1.6),
      0.48,
      mats.epdmGasket,
      { bevel: 0.12, bevelSegs: 1, curveSegs: 18 }
    );
    innerLip.position.y = 0.18;
    g.add(innerLip);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-perimeter-oring',
        4,
        60,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0.45, 0),
        new THREE.Vector3(0, 14.0, 16.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH32-11: Ultra-Thin Copper Micro-Vapor Chamber Top Cover (Partial Cutaway Reveal)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Front-right architectural step-cutaway copper top lid so sintered wick gleams inside!
    const vcTopShape = createTerracedWaferShape(58.0, 40.0, 2.2, 6.0, -2.0);
    const vcTop = makeHorizCncPlate(vcTopShape, 0.44, mats.vaporChamberCopper, {
      bevel: 0.08,
      bevelSegs: 2,
      curveSegs: 18,
    });
    g.add(vcTop);

    // Vacuum pinch-off micro-fill copper tube stub along left edge (-X)
    const fillTube = new THREE.Mesh(hiResCyl(0.75, 0.65, 4.2, 12), mats.copperHybridBond);
    fillTube.rotation.z = Math.PI / 2;
    fillTube.position.set(-30.6, 0, -8.0);
    g.add(fillTube);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-vc-top-copper',
        4,
        61,
        '#ea580c',
        g,
        new THREE.Vector3(0, -0.58, 0),
        new THREE.Vector3(0, 2.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH32-12: CORE — Sintered Porous Copper Micro-Wick & 48 Support Pillars
  // =========================================================================
  {
    const g = new THREE.Group();
    // Textured sintered porous copper wick bed (`fh32CopperWickMap` 1024px)
    const wickBed = makeHorizCncPlate(
      createRoundedRectShape(55.4, 37.4, 1.6),
      0.34,
      mats.fh32CopperWickMap,
      {
        bevel: 0.04,
        bevelSegs: 1,
        curveSegs: 16,
        planarUv: { w: 55.4, h: 37.4 },
      }
    );
    wickBed.position.y = -0.14;
    wickBed.userData.noEdges = true;
    g.add(wickBed);

    // 8 x 6 = 48 anti-collapse sintered copper capillary support pillars (1 InstancedMesh!)
    const pillarGeo = hiResCyl(0.62, 0.72, 0.62, 10);
    const pillarTransforms: InstanceTransform[] = [];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 8; c++) {
        pillarTransforms.push({
          pos: [
            (c - 3.5) * 6.5,
            0.22,
            (r - 2.5) * 5.6,
          ],
        });
      }
    }
    g.add(makeMiraiInstanced(pillarGeo, mats.copperHeatSpreader, pillarTransforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-vc-sintered-wick',
        4,
        62,
        '#c2410c',
        g,
        new THREE.Vector3(0, -1.18, 0),
        new THREE.Vector3(0, -4.5, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH32-13: Vapor Chamber Bottom Evaporator & Dual Sensor / SoC Cold-Plate Bosses
  // =========================================================================
  {
    const g = new THREE.Group();
    const bottomPlate = makeHorizCncPlate(
      createRoundedRectShape(58.0, 40.0, 2.2),
      0.56,
      mats.copperHeatSpreader,
      { bevel: 0.09, bevelSegs: 2, curveSegs: 18 }
    );
    g.add(bottomPlate);

    // Left hot-zone precision raised copper boss (Full-Frame Sensor Thermal Pedestal)
    const sensorBoss = new THREE.Mesh(
      createChamferedBoxGeo(21.0, 0.55, 24.0, 1.2, 0.08, 'y'),
      mats.copperHybridBond
    );
    sensorBoss.position.set(-14.5, -0.45, 0);
    g.add(sensorBoss);

    // Right hot-zone precision raised copper boss (2nm BIONZ SoC + CFexpress 5.0 Pedestal)
    const socBoss = new THREE.Mesh(
      createChamferedBoxGeo(21.0, 0.55, 24.0, 1.2, 0.08, 'y'),
      mats.copperHybridBond
    );
    socBoss.position.set(14.5, -0.45, 0);
    g.add(socBoss);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-vc-bottom-plate',
        4,
        63,
        '#b45309',
        g,
        new THREE.Vector3(0, -1.92, 0),
        new THREE.Vector3(0, -11.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH32-14: 40kHz+ Ultrasonic Piezo High-Voltage Driver HDI PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    // 6-layer emerald HDI PCB frame with twin central openings for copper cold-plate pedestals
    const pcbShape = createFrameShape(60.0, 42.0, 2.4, 44.0, 22.0, 1.6);
    const pcb = makeHorizCncPlate(pcbShape, 0.72, mats.hdiMainboardPcb, {
      bevel: 0.06,
      bevelSegs: 1,
      curveSegs: 16,
    });
    g.add(pcb);

    // Twin high-voltage ultrasonic piezo driver QFN ASICs (front-left & front-right rails)
    for (const x of [-15.0, 15.0]) {
      const asic = buildChipPackage({
        w: 5.6,
        d: 5.6,
        h: 0.85,
        style: 'qfn',
        pinsPerSide: 8,
        bodyMat: mats.icEpoxy,
        leadMat: mats.solderBallSilver,
        pin1Mat: mats.goldPlating,
      });
      asic.position.set(x, 0.72, 15.2);
      g.add(asic);
    }

    // 4× High-voltage boost ferrite power inductors along rear rail (-Z)
    for (let i = 0; i < 4; i++) {
      const ind = buildShieldedInductor(
        3.4,
        1.25,
        mats.ferriteInductor,
        mats.solderBallSilver,
        mats.welcomeTitaniumFace,
        'y'
      );
      ind.position.set(-18.0 + i * 12.0, 0.92, -15.2);
      g.add(ind);
    }

    // 24 SMD MLCC high-voltage decoupling capacitors along perimeter rails (1 InstancedMesh!)
    const capGeo = markHiRes(new THREE.BoxGeometry(1.4, 0.65, 0.75));
    const capTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 12; i++) {
      const x = -23.0 + (46.0 * i) / 11;
      capTransforms.push({ pos: [x, 0.62, 18.6] });
      capTransforms.push({ pos: [x, 0.62, -18.6] });
    }
    g.add(makeMiraiInstanced(capGeo, mats.smdCeramic, capTransforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-piezo-driver-pcb',
        4,
        64,
        '#059669',
        g,
        new THREE.Vector3(0, -2.85, 0),
        new THREE.Vector3(0, -19.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH32-15: I2C Thermal Telemetry & Power S-Curve FPC Harness
  // =========================================================================
  {
    const g = new THREE.Group();
    const fpcPts: ReadonlyArray<readonly [number, number]> = [
      [0, 0.3],
      [4.5, 0.3],
      [7.8, -0.6],
      [10.2, -1.8],
      [14.2, -1.8],
    ];
    const ribbon = new THREE.Mesh(buildCurvedFpcRibbon(fpcPts, 0.28, 12.6), mats.polyimideFpc);
    g.add(ribbon);

    // Offset metallic EMI shield film seated cleanly above ribbon without clipping
    const emiPts: ReadonlyArray<readonly [number, number]> = [
      [1.2, 0.52],
      [4.6, 0.52],
      [7.8, -0.35],
      [10.4, -1.55],
      [12.8, -1.55],
    ];
    const emi = new THREE.Mesh(buildCurvedFpcRibbon(emiPts, 0.09, 11.4), mats.emiShieldFilm);
    emi.userData.noEdges = true;
    g.add(emi);

    // 16-pin ivory & gold ZIF board-to-board connector at free tail
    const zif = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 1.35, 13.6, 0.25, 0.08, 'y'),
      mats.zifIvoryPlastic
    );
    zif.position.set(14.8, -1.8, 0);
    g.add(zif);

    const zifContacts = new THREE.Mesh(
      createChamferedBoxGeo(1.1, 0.24, 11.8, 0.10, 0.03, 'y'),
      mats.goldPlating
    );
    zifContacts.position.set(15.6, -1.06, 0);
    g.add(zifContacts);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-control-fpc',
        4,
        65,
        '#d97706',
        g,
        new THREE.Vector3(27.5, -2.6, 8.0),
        new THREE.Vector3(26.0, -19.5, 12.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH32-16: High-Conductivity Dual-Zone Color-Coded TIM Interface Pads
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left Zone (Sensor direct thermal coupling): Soft compliant cool-blue 14 W/m·K silicone TIM pad
    const sensorTim = new THREE.Mesh(
      createChamferedBoxGeo(20.4, 0.62, 23.2, 1.4, 0.14, 'y'),
      mats.thermalPadBlue
    );
    sensorTim.position.set(-14.5, 0, 0);
    g.add(sensorTim);

    // Right Zone (2nm BIONZ SoC direct thermal coupling): High-flux coral-pink TIM pad
    const socTim = new THREE.Mesh(
      createChamferedBoxGeo(20.4, 0.62, 23.2, 1.4, 0.14, 'y'),
      mats.thermalPadPink
    );
    socTim.position.set(14.5, 0, 0);
    g.add(socTim);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-thermal-tim-pads',
        4,
        66,
        '#f472b6',
        g,
        new THREE.Vector3(0, -3.55, 0),
        new THREE.Vector3(0, -27.5, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH32-17: CNC Magnesium Waterproof Capsule Carrier Cradle Chassis
  // =========================================================================
  {
    const g = new THREE.Group();
    const chassisShape = createFrameShape(66.0, 48.0, 3.4, 48.0, 28.0, 2.2);
    addCircleHoles(
      chassisShape,
      boltPositions8.map(([x, , z]) => [x, -z, 1.25] as [number, number, number])
    );
    g.add(
      makeHorizCncPlate(chassisShape, 1.15, mats.magnesiumCast, {
        bevel: 0.16,
        bevelSegs: 2,
        curveSegs: 20,
      })
    );

    // Central magnesium structural stiffening bridge separating Sensor & SoC cold-plate bays
    const centerBridge = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 1.05, 29.0, 0.4, 0.10, 'y'),
      mats.magnesiumCast
    );
    g.add(centerBridge);

    // 4 machined stainless camera-body mounting datum standoffs at corners
    for (const [x, z] of [
      [-29.8, -20.8],
      [29.8, -20.8],
      [-29.8, 20.8],
      [29.8, 20.8],
    ]) {
      const boss = new THREE.Mesh(hiResCyl(2.2, 2.4, 0.8, 16), mats.stainlessMachined);
      boss.position.set(x, -0.75, z);
      g.add(boss);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-mg-carrier-chassis',
        4,
        67,
        '#64748b',
        g,
        new THREE.Vector3(0, -4.2, 0),
        new THREE.Vector3(0, -35.5, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // FH32-18: 8× Waterproof O-Ring Captive M1.4 Precision Torx Sealing Bolts
  // =========================================================================
  {
    const g = new THREE.Group();
    addTorxBolts(g, boltPositions8, mats, 1.28, 9.2);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh32-seal-torx-bolts',
        4,
        68,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 4.9, 0),
        new THREE.Vector3(0, 54.0, 0),
        cp,
        0.24
      )
    );
  }

  return parts;
}
