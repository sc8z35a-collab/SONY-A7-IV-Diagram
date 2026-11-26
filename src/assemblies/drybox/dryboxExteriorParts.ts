import * as THREE from 'three';
import { CadPart } from '../types';
import {
  createFrameShape,
  createRoundedRectShape,
  extrudeCentered,
} from '../../engine/CadHelpers';
import {
  DB_DIM,
  DryboxPartBuilderCtx,
  finalizeDryboxPart,
  makeCabinetBolt,
  makeHorizBoxPlate,
} from './dryboxPartsShared';

/**
 * Build Groups 1–3 (DB01–DB20):
 * Front Optical Door & Biometric Security (DB01–DB07),
 * Smart E-Ink UI, Dual-Zone SHT45/SGP41 Sensors & Matter/Thread IoT (DB08–DB13),
 * SPCC Monocoque Chassis, ESD Armor, Silica Aerogel, PCM Liner & Pressure Ports (DB14–DB20).
 */
export function buildDryboxExteriorParts(ctx: DryboxPartBuilderCtx): CadPart[] {
  const { mats, pal, cp } = ctx;
  const parts: CadPart[] = [];

  // =========================================================================
  // DB01. CNC Aluminum Extruded Door Frame & Ergonomic Flush Pull Handle
  // =========================================================================
  {
    const g = new THREE.Group();
    const frameShape = createFrameShape(53.2, 95.0, 2.2, 44.2, 85.6, 1.2);
    const frameGeo = extrudeCentered(frameShape, 2.4, 0.28, 0.24, 14);
    const frameMesh = new THREE.Mesh(frameGeo, mats.matteBlackAnodized);
    g.add(frameMesh);

    // Subtle anodized brushed chamfer trim inlay around window perimeter
    const trimShape = createFrameShape(45.8, 87.2, 1.35, 44.2, 85.6, 1.15);
    const trimMesh = new THREE.Mesh(extrudeCentered(trimShape, 0.4, 0.06, 0.06, 12), mats.stainlessMachined);
    trimMesh.position.z = 1.12;
    g.add(trimMesh);

    // Recessed vertical ergonomic flush pull-bar on right stile
    const handleBack = new THREE.Mesh(new THREE.BoxGeometry(2.0, 32.0, 1.2), mats.lensBarrelAnodized);
    handleBack.position.set(25.2, 0, 1.35);
    const handleGrip = new THREE.Mesh(new THREE.BoxGeometry(1.1, 30.0, 1.5), mats.stainlessMachined);
    handleGrip.position.set(26.1, 0, 1.55);
    g.add(handleBack, handleGrip);

    // 4 miter-joint corner L-key reinforcement pins on inner rear face
    for (const [sx, sy] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.4, 0.45), mats.stainlessMachined);
      key.position.set(sx * 24.1, sy * 44.8, -1.15);
      key.userData.noEdges = true;
      g.add(key);
    }

    parts.push(
      finalizeDryboxPart(
        'db-door-alu-frame',
        1,
        '#1e293b',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 25.0),
        new THREE.Vector3(0, 0, 56.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB02. Low-E Silver-Sputtered Thermal & UV-400 Tempered Safety Glass
  // =========================================================================
  {
    const g = new THREE.Group();
    const glassShape = createRoundedRectShape(45.2, 86.6, 1.1);
    const glassPane = new THREE.Mesh(extrudeCentered(glassShape, 0.72, 0.08, 0.08, 12), pal.loweGlassClear);
    g.add(glassPane);

    // Ceramic black frit perimeter mask bonding glass to aluminum frame
    const fritShape = createFrameShape(45.2, 86.6, 1.1, 43.2, 84.6, 0.9);
    const fritMask = new THREE.Mesh(extrudeCentered(fritShape, 0.14, 0, 0, 10), mats.icEpoxy);
    fritMask.position.z = -0.34;
    g.add(fritMask);

    // Subtle metallic silver Low-E edge indicator band (bottom-left micro laser mark)
    const loweEdge = new THREE.Mesh(new THREE.BoxGeometry(44.4, 0.22, 0.12), mats.silverElectrode);
    loweEdge.position.set(0, -42.5, 0.38);
    loweEdge.userData.noEdges = true;
    g.add(loweEdge);

    parts.push(
      finalizeDryboxPart(
        'db-door-lowe-glass',
        2,
        '#38bdf8',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 25.35),
        new THREE.Vector3(0, 0, 72.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB03. Museum-Grade Anti-Reflective (AR <0.8%) & ESD-ITO Conductive Film
  // =========================================================================
  {
    const g = new THREE.Group();
    const filmShape = createRoundedRectShape(44.2, 85.4, 0.95);
    const filmMesh = new THREE.Mesh(extrudeCentered(filmShape, 0.16, 0, 0, 10), pal.arItoFilm);
    g.add(filmMesh);

    // Micro silver conductive ESD perimeter busbar grounding the ITO film to door frame
    const busShape = createFrameShape(44.4, 85.6, 1.0, 43.5, 84.7, 0.85);
    const busMesh = new THREE.Mesh(extrudeCentered(busShape, 0.18, 0, 0, 10), mats.goldPlating);
    busMesh.position.z = -0.05;
    g.add(busMesh);

    // Grounding spring finger tab on right edge
    const gndTab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.2, 0.35), mats.beCuSpring);
    gndTab.position.set(22.4, -22.0, -0.2);
    g.add(gndTab);

    parts.push(
      finalizeDryboxPart(
        'db-door-ar-esd-coat',
        3,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 24.7),
        new THREE.Vector3(0, 0, 44.0),
        cp,
        0.14
      )
    );
  }

  // =========================================================================
  // DB04. Magnetic Dual-Lip Platinum-Cured EPDM Hermetic Door Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    // Primary hollow outer lip frame
    const outerLip = createFrameShape(51.4, 93.2, 2.0, 47.4, 89.2, 1.4);
    const outerMesh = new THREE.Mesh(extrudeCentered(outerLip, 1.35, 0.14, 0.14, 14), mats.epdmGasket);
    g.add(outerMesh);

    // Secondary inner vapor-barrier compression lip
    const innerLip = createFrameShape(46.8, 88.6, 1.35, 45.2, 87.0, 1.1);
    const innerMesh = new THREE.Mesh(extrudeCentered(innerLip, 1.05, 0.1, 0.1, 12), mats.butylDamperRubber);
    innerMesh.position.z = -0.15;
    g.add(innerMesh);

    // Embedded flexible ferrite magnetic core strip visible along inner chamber
    const magCore = createFrameShape(50.2, 92.0, 1.8, 48.6, 90.4, 1.5);
    const magMesh = new THREE.Mesh(extrudeCentered(magCore, 0.55, 0, 0, 12), mats.neodymiumMagnet);
    magMesh.position.z = -0.42;
    g.add(magMesh);

    parts.push(
      finalizeDryboxPart(
        'db-magnetic-epdm-gasket',
        4,
        '#334155',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 23.6),
        new THREE.Vector3(0, 0, 32.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB05. 180° Multi-Link Concealed & Hydraulic Soft-Close Hinges (Pair)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const hy of [31.0, -37.0]) {
      const hingeUnit = new THREE.Group();
      hingeUnit.position.set(0, hy, 0);

      // Chassis mounting cup
      const cup = new THREE.Mesh(new THREE.BoxGeometry(2.4, 9.2, 3.6), mats.stainlessMachined);
      cup.position.set(0.4, 0, -1.6);
      // Door side mounting plate
      const doorPlate = new THREE.Mesh(new THREE.BoxGeometry(1.8, 8.4, 1.2), mats.mountStainlessFlange);
      doorPlate.position.set(-0.6, 0, 1.4);
      // Articulated 7-bar scissor links
      const link1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 4.0), mats.linkArmSteel);
      link1.position.set(-0.2, 1.4, 0);
      link1.rotation.y = 0.25;
      const link2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 4.0), mats.linkArmSteel);
      link2.position.set(-0.2, -1.4, 0);
      link2.rotation.y = -0.25;
      // Hydraulic rotary soft-close oil damper barrel
      const damper = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 5.4, 14), mats.copperHeatSpreader);
      damper.position.set(0.6, 0, -0.4);
      // Pivot pins
      for (const py of [-3.4, 3.4]) {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.8, 10), mats.titaniumRivet);
        pin.position.set(-0.4, py, 0.4);
        pin.userData.noEdges = true;
        hingeUnit.add(pin);
      }
      hingeUnit.add(cup, doorPlate, link1, link2, damper);
      g.add(hingeUnit);
    }

    parts.push(
      finalizeDryboxPart(
        'db-concealed-damp-hinge',
        5,
        '#94a3b8',
        g,
        new THREE.Vector3(-25.8, DB_DIM.DOOR_CY, 23.2),
        new THREE.Vector3(-24.0, 0, 26.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB06. 3D Capacitive Semiconductor Fingerprint & ISO 14443 NFC Module
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sleek vertical obsidian housing flush on right door stile
    const housingShape = createRoundedRectShape(3.8, 16.4, 0.85);
    const housing = new THREE.Mesh(extrudeCentered(housingShape, 1.35, 0.14, 0.14, 12), mats.icEpoxy);
    g.add(housing);

    // Gold capacitive sensing bezel ring & silicon ridge-detector die
    const ringShape = createFrameShape(2.6, 3.0, 0.8, 1.9, 2.3, 0.55);
    const ring = new THREE.Mesh(extrudeCentered(ringShape, 0.35, 0.04, 0.04, 12), mats.goldPlating);
    ring.position.set(0, 3.4, 0.65);
    const die = new THREE.Mesh(new THREE.BoxGeometry(1.85, 2.2, 0.25), mats.siliconSensorDie);
    die.position.set(0, 3.4, 0.62);
    g.add(ring, die);

    // Status LED halo bar (emerald unlocked / indigo standby)
    const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 0.2), pal.blue450Glow);
    ledStrip.position.set(0, 6.2, 0.68);
    g.add(ledStrip);

    // ISO 14443 NFC copper spiral loop coil visible on lower half
    const nfcPlate = new THREE.Mesh(new THREE.BoxGeometry(2.6, 5.0, 0.22), mats.matteBlackAnodized);
    nfcPlate.position.set(0, -2.6, 0.65);
    const nfcCoil = new THREE.Mesh(
      extrudeCentered(createFrameShape(2.1, 3.4, 0.4, 1.5, 2.8, 0.25), 0.12, 0, 0, 10),
      mats.copperCoil
    );
    nfcCoil.position.set(0, -2.6, 0.78);
    g.add(nfcPlate, nfcCoil);

    // Concealed flexible polyimide ribbon tail connecting to controller
    const fpc = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.2, 0.2), mats.polyimideFpc);
    fpc.position.set(0, -7.2, -0.55);
    g.add(fpc);

    parts.push(
      finalizeDryboxPart(
        'db-biometric-fingerprint-pad',
        6,
        '#6366f1',
        g,
        new THREE.Vector3(24.2, 3.5, 26.2),
        new THREE.Vector3(22.0, 0, 64.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB07. Fail-Secure Bi-Stable Solenoid Deadbolt & Emergency Key Cylinder
  // =========================================================================
  {
    const g = new THREE.Group();
    // Machined stainless lock chassis body
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 12.6, 5.2), mats.stainlessMachined);
    g.add(body);

    // Copper bi-stable latching solenoid bobbin
    const coil = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 4.2, 16), mats.copperCoil);
    coil.position.set(0, 2.4, -0.4);
    g.add(coil);

    // Hardened SUS304 sliding deadbolt pin protruding toward door strike
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 4.4, 14), mats.titaniumRivet);
    bolt.rotation.x = Math.PI / 2;
    bolt.position.set(0, 2.4, 3.2);
    g.add(bolt);

    // Strike plate receptacle
    const strike = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.4, 0.65), mats.mountStainlessFlange);
    strike.position.set(0, 2.4, 5.0);
    g.add(strike);

    // Lower hidden mechanical dimple key barrel + brass tumbler cam
    const keyCyl = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 3.8, 16), mats.brassGear);
    keyCyl.rotation.x = Math.PI / 2;
    keyCyl.position.set(0, -3.2, 1.2);
    g.add(keyCyl);

    // Emergency external USB-C 5V jump power port
    const jumpPort = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.85, 1.4), mats.goldPlating);
    jumpPort.position.set(0, -5.6, 2.0);
    g.add(jumpPort);

    parts.push(
      finalizeDryboxPart(
        'db-solenoid-deadbolt-lock',
        7,
        '#64748b',
        g,
        new THREE.Vector3(24.0, -5.5, 20.8),
        new THREE.Vector3(28.0, 0, 26.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB08. Always-On E-Ink Electrophoretic Display & Capacitive Touch Bezel
  // =========================================================================
  {
    const g = new THREE.Group();
    // Flush smoked glass bezel header bar spanning cabinet top
    const bezelShape = createRoundedRectShape(52.8, 7.2, 1.4);
    const bezel = new THREE.Mesh(extrudeCentered(bezelShape, 1.5, 0.16, 0.14, 12), mats.bodyTopSubOled);
    g.add(bezel);

    // High-contrast bi-stable E-Ink electrophoretic display window (left-center)
    const einkBg = new THREE.Mesh(new THREE.BoxGeometry(26.0, 4.4, 0.25), pal.einkPaper);
    einkBg.position.set(-7.5, 0, 0.72);
    g.add(einkBg);

    // Geometric E-Ink readout bars (Zone A 40% RH, Zone B 35% RH, Dew Margin & VOC Bar)
    const zoneDivider = new THREE.Mesh(new THREE.BoxGeometry(0.24, 3.4, 0.08), pal.einkInkDark);
    zoneDivider.position.set(-7.5, 0, 0.88);
    g.add(zoneDivider);
    // Upper Zone digits block & humidity progress bar
    const digA1 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.0, 0.08), pal.einkInkDark);
    digA1.position.set(-16.2, 0.45, 0.88);
    const digA2 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 0.08), mats.vcWorkingFluidCyan);
    digA2.position.set(-11.4, 0.45, 0.88);
    const barA = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.42, 0.08), pal.mofEmerald);
    barA.position.set(-14.0, -1.25, 0.88);
    // Lower Zone digits block & dew-point margin bar
    const digB1 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.0, 0.08), pal.einkInkDark);
    digB1.position.set(-3.4, 0.45, 0.88);
    const digB2 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 0.08), mats.mountShimBlue);
    digB2.position.set(1.4, 0.45, 0.88);
    const barB = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.42, 0.08), pal.blue450Glow);
    barB.position.set(-1.0, -1.25, 0.88);
    for (const m of [digA1, digA2, barA, digB1, digB2, barB]) {
      m.userData.noEdges = true;
      g.add(m);
    }

    // 4 Capacitive Touch Sensor Rings on right side (RH-, RH+, LED, Lock/Boost)
    for (let i = 0; i < 4; i++) {
      const tx = 9.4 + i * 4.2;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.16, 8, 18), mats.silverElectrode);
      ring.position.set(tx, 0, 0.84);
      ring.userData.noEdges = true;
      g.add(ring);
    }

    parts.push(
      finalizeDryboxPart(
        'db-eink-touch-bezel',
        8,
        '#0f172a',
        g,
        new THREE.Vector3(0, 47.6, 24.4),
        new THREE.Vector3(0, 18.0, 34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB09. Upper Camera Zone Sensirion SHT45 CMOSens Digital RH/T Sensor
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vented protective micro-shroud cage
    const cage = new THREE.Mesh(new THREE.BoxGeometry(6.2, 4.8, 2.6), mats.matteBlackAnodized);
    g.add(cage);
    // Compact precision green I2C breakout PCB
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(4.8, 3.6, 0.5), mats.sensorPcb);
    pcb.position.z = 1.1;
    // SHT45 DFN-4 CMOSens IC chip (gold contacts + hydrophobic white PTFE membrane cap)
    const chip = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 0.65), mats.icEpoxy);
    chip.position.set(0, 0.2, 1.55);
    const ptfeCap = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.25, 0.24), pal.hepaWhitePleat);
    ptfeCap.position.set(0, 0.2, 1.92);
    // Built-in creep-heater thermal trace pad & gold I2C connector header
    const header = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.75, 0.55), mats.goldPlating);
    header.position.set(0, -1.25, 1.5);
    g.add(pcb, chip, ptfeCap, header);

    parts.push(
      finalizeDryboxPart(
        'db-sht45-upper-sensor',
        9,
        '#06b6d4',
        g,
        new THREE.Vector3(-16.5, 34.0, -17.8),
        new THREE.Vector3(-34.0, 14.0, 16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB10. Lower Zone Independent SHT45 Sensor & Dew-Point Margin Probe
  // =========================================================================
  {
    const g = new THREE.Group();
    const pod = new THREE.Mesh(new THREE.BoxGeometry(5.6, 4.4, 2.4), mats.shutterChassis);
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.2, 0.45), mats.hdiMainboardPcb);
    pcb.position.z = 1.05;
    const chip = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.55, 0.55), mats.siliconLogicLayer);
    chip.position.set(-0.8, 0.2, 1.48);
    // Extended stainless sintered-mesh dew-point temperature probe dipping into lower shelf zone
    const probeStem = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 7.6, 12), mats.stainlessMachined);
    probeStem.position.set(1.2, -4.6, 1.2);
    const probeTip = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.72, 2.2, 14), mats.sinteredBronzeBushing);
    probeTip.position.set(1.2, -9.0, 1.2);
    g.add(pod, pcb, chip, probeStem, probeTip);

    parts.push(
      finalizeDryboxPart(
        'db-sht45-lower-sensor',
        10,
        '#0284c7',
        g,
        new THREE.Vector3(-16.5, -18.5, -17.8),
        new THREE.Vector3(-36.0, -10.0, 18.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB11. Sensirion SGP41 MOx Metal-Oxide VOC & NOx Outgassing Sensor
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(6.4, 4.8, 2.4), mats.matteBlackAnodized);
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.0, 3.6, 0.5), mats.sensorPcb);
    pcb.position.z = 1.05;
    // SGP41 DFN-6 gold-plated metal lid with laser micro-aperture & heated MOx pixel
    const moxPkg = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.1, 0.75), mats.goldPlating);
    moxPkg.position.set(0, 0.2, 1.58);
    const aperture = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.22, 12), pal.ptcTerracotta);
    aperture.rotation.x = Math.PI / 2;
    aperture.position.set(0, 0.2, 1.98);
    // Micro copper thermal isolation traces
    const smdBank = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.7, 0.4), mats.tantalumCapYellow);
    smdBank.position.set(0, -1.25, 1.48);
    g.add(base, pcb, moxPkg, aperture, smdBank);

    parts.push(
      finalizeDryboxPart(
        'db-sgp41-voc-sensor',
        11,
        '#f59e0b',
        g,
        new THREE.Vector3(16.5, 34.0, -17.8),
        new THREE.Vector3(34.0, 14.0, 16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB12. Non-Contact Magnetic Hall-Effect Door Switch & UV-C Safety Interlock
  // =========================================================================
  {
    const g = new THREE.Group();
    // Chassis-side Hall sensor module
    const hallPcb = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.8, 2.8), mats.hdiMainboardPcb);
    const hallIc = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 1.2), mats.icEpoxy);
    hallIc.position.set(0, -0.95, 0.2);
    // Door-side paired N52 trigger magnet tab
    const trigMag = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.0, 1.2), mats.neodymiumMagnet);
    trigMag.position.set(0, -2.2, 1.2);
    // Safety relay lead wires
    const wire = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 4.6), mats.polyimideFpc);
    wire.position.set(-1.2, 0.4, -3.2);
    g.add(hallPcb, hallIc, trigMag, wire);

    parts.push(
      finalizeDryboxPart(
        'db-hall-door-interlock',
        12,
        '#10b981',
        g,
        new THREE.Vector3(19.5, 43.4, 22.8),
        new THREE.Vector3(24.0, 22.0, 32.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB13. Matter over Thread / Wi-Fi 6 / BLE 5.4 Tri-Radio IoT PID Control PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    // 6-layer immersion-gold HDI main control board inside top header bay
    const board = makeHorizBoxPlate(44.0, 11.5, 0.9, 0.8, mats.hdiMainboardPcb, 0.08);
    g.add(board);

    // Tri-Radio SoC EMI shield can (NXP RW612 / nRF54-class Matter over Thread)
    const rfCan = new THREE.Mesh(new THREE.BoxGeometry(9.5, 1.4, 7.2), mats.emiShieldCan);
    rfCan.position.set(-12.0, 1.15, 0);
    // Gold meandering 2.4GHz Thread / Wi-Fi 6 ceramic chip antenna & feed trace
    const ant = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.8, 1.6), mats.ceramicAlumina);
    ant.position.set(-19.5, 0.85, 2.8);
    const antFeed = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.16, 0.6), mats.goldPlating);
    antFeed.position.set(-17.8, 0.52, 1.2);

    // Dual-zone adaptive PID ARM Cortex-M33 MCU & Hardware Secure Element
    const mcu = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.9, 5.2), mats.ispSiliconDie);
    mcu.position.set(1.5, 0.9, 0);
    const secElem = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.7, 2.6), mats.npuSiliconDie);
    secElem.position.set(8.2, 0.8, 2.0);

    // Power MOSFET PWM switches for PEM/Peltier/LED/Fan channels
    for (let i = 0; i < 4; i++) {
      const fet = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.75, 2.2), mats.icEpoxy);
      fet.position.set(12.5 + i * 2.8, 0.82, -2.4);
      g.add(fet);
    }

    // ZIF connectors along front & rear board edge
    const zifFront = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.8, 1.4), mats.zifIvoryPlastic);
    zifFront.position.set(-2.0, 0.85, 4.6);
    const zifRear = new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.8, 1.4), mats.zifIvoryPlastic);
    zifRear.position.set(6.0, 0.85, -4.6);

    g.add(rfCan, ant, antFeed, mcu, secElem, zifFront, zifRear);

    parts.push(
      finalizeDryboxPart(
        'db-matter-thread-iot-soc',
        13,
        '#2563eb',
        g,
        new THREE.Vector3(0, 47.4, 15.0),
        new THREE.Vector3(0, 32.0, 14.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB14. 1.2mm SPCC Cold-Rolled Steel TIG-Welded Monocoque Unibody Chassis
  // =========================================================================
  {
    const g = new THREE.Group();
    const W = DB_DIM.W;
    const H = DB_DIM.H;
    const D = DB_DIM.D;
    const t = DB_DIM.WALL;

    // Left & right structural walls
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(t, H, D), mats.midPlateSteel);
    leftWall.position.set(-DB_DIM.HW + t / 2, 0, 0);
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(t, H, D), mats.midPlateSteel);
    rightWall.position.set(DB_DIM.HW - t / 2, 0, 0);

    // Top roof & bottom floor deck
    const topDeck = new THREE.Mesh(new THREE.BoxGeometry(W, t, D), mats.midPlateSteel);
    topDeck.position.set(0, DB_DIM.HH - t / 2, 0);
    const botDeck = new THREE.Mesh(new THREE.BoxGeometry(W, t, D), mats.midPlateSteel);
    botDeck.position.set(0, -DB_DIM.HH + t / 2, 0);

    // Rear wall with precision rectangular engine cutout (X in [-14,14], Y in [-23, 25])
    const rearShape = createFrameShape(W, H, 0.8, 28.0, 48.0, 1.0, 0, 1.0);
    const rearWall = new THREE.Mesh(extrudeCentered(rearShape, t, 0.06, 0.06, 10), mats.midPlateSteel);
    rearWall.position.set(0, 0, -DB_DIM.HD + t / 2);

    // Front folded airtight door strike flange & top header pocket
    const frontFlangeShape = createFrameShape(W, H, 0.8, DB_DIM.DOOR_W - 1.2, DB_DIM.DOOR_H - 1.2, 0.8, 0, DB_DIM.DOOR_CY);
    const frontFlange = new THREE.Mesh(extrudeCentered(frontFlangeShape, 1.1, 0.08, 0.08, 10), mats.midPlateSteel);
    frontFlange.position.set(0, 0, DB_DIM.HD - 0.55);

    // Top header electronics shelf floor separating IoT bay from upper camera chamber
    const headerFloor = new THREE.Mesh(new THREE.BoxGeometry(W - t * 2, 1.0, 18.0), mats.midPlateSteel);
    headerFloor.position.set(0, 43.8, 14.2);

    g.add(leftWall, rightWall, topDeck, botDeck, rearWall, frontFlange, headerFloor);

    parts.push(
      finalizeDryboxPart(
        'db-spcc-steel-chassis',
        14,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // DB15. IEC 61340-5-1 ESD-Safe Conductive Powder-Coated Exterior Armor Shell
  // =========================================================================
  {
    const g = new THREE.Group();
    const skinT = 0.34;
    // Left, Right, Top outer conductive powder-coated cladding skins wrapping chassis
    const skinL = new THREE.Mesh(new THREE.BoxGeometry(skinT, DB_DIM.H + 0.6, DB_DIM.D + 0.4), pal.esdPowderShell);
    skinL.position.set(-DB_DIM.HW - skinT * 0.6, 0, 0);
    const skinR = new THREE.Mesh(new THREE.BoxGeometry(skinT, DB_DIM.H + 0.6, DB_DIM.D + 0.4), pal.esdPowderShell);
    skinR.position.set(DB_DIM.HW + skinT * 0.6, 0, 0);
    const skinTop = new THREE.Mesh(new THREE.BoxGeometry(DB_DIM.W + 0.8, skinT, DB_DIM.D + 0.4), pal.esdPowderShell);
    skinTop.position.set(0, DB_DIM.HH + skinT * 0.6, 0);

    // Precision chamfered front accent vertical corner trims (signature industrial aesthetic)
    for (const sx of [-1, 1]) {
      const accentBar = new THREE.Mesh(new THREE.BoxGeometry(0.95, DB_DIM.H + 0.8, 1.2), mats.lensBarrelAnodized);
      accentBar.position.set(sx * (DB_DIM.HW + 0.35), 0, DB_DIM.HD - 0.2);
      g.add(accentBar);
    }

    // Subtle engraved ESD safety emblem plate on lower-left exterior flank
    const esdBadge = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.4, 4.4), mats.tantalumCapYellow);
    esdBadge.position.set(-DB_DIM.HW - 0.46, -42.0, 14.0);
    g.add(skinL, skinR, skinTop, esdBadge);

    parts.push(
      finalizeDryboxPart(
        'db-esd-powder-coat',
        15,
        '#3b82f6',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-34.0, 8.0, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // DB16. Mesoporous Silica Aerogel Thermal Insulation Liner (Knudsen Effect)
  // =========================================================================
  {
    const g = new THREE.Group();
    const aeroT = 0.85;
    const inH = DB_DIM.H - 3.2;
    const inD = DB_DIM.D - 3.4;

    const aeroL = new THREE.Mesh(new THREE.BoxGeometry(aeroT, inH, inD), pal.aerogelPearl);
    aeroL.position.set(-25.15, 0, -0.4);
    const aeroR = new THREE.Mesh(new THREE.BoxGeometry(aeroT, inH, inD), pal.aerogelPearl);
    aeroR.position.set(25.15, 0, -0.4);
    const aeroTop = new THREE.Mesh(new THREE.BoxGeometry(50.2, aeroT, inD), pal.aerogelPearl);
    aeroTop.position.set(0, 50.2, -0.4);
    const aeroBot = new THREE.Mesh(new THREE.BoxGeometry(50.2, aeroT, inD), pal.aerogelPearl);
    aeroBot.position.set(0, -50.2, -0.4);

    // Quilted seam ribs showcasing nanoporous hydrophobic blanket panels
    for (let y = -36; y <= 36; y += 18) {
      const seamR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, inD - 2), mats.stainlessMachined);
      seamR.position.set(24.65, y, -0.4);
      seamR.userData.noEdges = true;
      g.add(seamR);
    }

    g.add(aeroL, aeroR, aeroTop, aeroBot);

    parts.push(
      finalizeDryboxPart(
        'db-silica-aerogel-liner',
        16,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(34.0, 6.0, -4.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // DB17. Phase-Change Microcapsule (PCM 22–28°C) Anti-Condensation Wall Sheet
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcmT = 0.45;
    const pH = DB_DIM.H - 6.0;
    const pD = DB_DIM.D - 7.0;

    const pcmL = new THREE.Mesh(new THREE.BoxGeometry(pcmT, pH, pD), pal.pcmVioletSheet);
    pcmL.position.set(-24.3, -1.0, -0.6);
    const pcmR = new THREE.Mesh(new THREE.BoxGeometry(pcmT, pH, pD), pal.pcmVioletSheet);
    pcmR.position.set(24.3, -1.0, -0.6);

    // Molded latent-heat thermal buffering honeycomb ribs on inner face
    for (let z = -14; z <= 12; z += 6.5) {
      const ribL = new THREE.Mesh(new THREE.BoxGeometry(0.24, pH - 4, 0.55), mats.makeupSealViolet);
      ribL.position.set(-24.0, -1.0, z);
      ribL.userData.noEdges = true;
      const ribR = new THREE.Mesh(new THREE.BoxGeometry(0.24, pH - 4, 0.55), mats.makeupSealViolet);
      ribR.position.set(24.0, -1.0, z);
      ribR.userData.noEdges = true;
      g.add(ribL, ribR);
    }

    g.add(pcmL, pcmR);

    parts.push(
      finalizeDryboxPart(
        'db-pcm-anticondense-panel',
        17,
        '#a855f7',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-22.0, 22.0, -8.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB18. Dual-Zone Hermetic Thermal Divider Partition Deck (40% RH / 35% RH)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sandwich deck: steel skin + aerogel core + front magnetic silicone seal lip
    const deckBody = makeHorizBoxPlate(47.4, 41.2, 2.2, 0.6, mats.shutterChassis, 0.12);
    const insCore = new THREE.Mesh(new THREE.BoxGeometry(45.0, 0.9, 39.2), pal.aerogelPearl);
    const frontSeal = new THREE.Mesh(new THREE.BoxGeometry(47.8, 1.5, 1.3), mats.epdmGasket);
    frontSeal.position.set(0, 0, 21.1);
    // Stainless front fascia trim
    const fascia = new THREE.Mesh(new THREE.BoxGeometry(47.2, 0.6, 0.45), mats.stainlessMachined);
    fascia.position.set(0, 0.7, 20.6);

    g.add(deckBody, insCore, frontSeal, fascia);

    parts.push(
      finalizeDryboxPart(
        'db-dualzone-divider-deck',
        18,
        '#64748b',
        g,
        new THREE.Vector3(0, DB_DIM.DIVIDER_Y, 1.8),
        new THREE.Vector3(0, -4.0, 34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB19. Expanded PTFE (ePTFE) Barometric Pressure-Equalization Breather Vent
  // =========================================================================
  {
    const g = new THREE.Group();
    // CNC anodized hexagonal housing nut mounted on left exterior wall
    const hexBody = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 1.5, 6), mats.stainlessMachined);
    hexBody.rotation.z = Math.PI / 2;
    // Threaded bulkhead collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 2.0, 16), mats.matteBlackAnodized);
    collar.rotation.z = Math.PI / 2;
    collar.position.x = 1.1;
    // Hydrophobic microporous white ePTFE membrane disc visible inside outer face
    const membrane = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.75, 0.25, 18), pal.hepaWhitePleat);
    membrane.rotation.z = Math.PI / 2;
    membrane.position.x = -0.68;
    // Silicone O-ring wall seal
    const oring = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.26, 8, 20), mats.epdmGasket);
    oring.rotation.y = Math.PI / 2;
    oring.position.x = 0.65;
    g.add(hexBody, collar, membrane, oring);

    parts.push(
      finalizeDryboxPart(
        'db-eptfe-breather-vent',
        19,
        '#cbd5e1',
        g,
        new THREE.Vector3(-27.8, 26.0, -8.0),
        new THREE.Vector3(-44.0, 10.0, -8.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB20. Lab-Grade Dry Nitrogen (N2) Quick-Purge Coupler & Check Valve Port
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mounting flange plate on right exterior wall
    const flange = new THREE.Mesh(new THREE.BoxGeometry(0.8, 6.2, 6.2), mats.stainlessMachined);
    // Brass one-way spring check-valve cylinder & stainless quick-connect collar
    const valveBody = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 3.2, 16), mats.brassGear);
    valveBody.rotation.z = Math.PI / 2;
    valveBody.position.x = 1.8;
    const quickCollar = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, 1.4, 16), mats.vcWorkingFluidCyan);
    quickCollar.rotation.z = Math.PI / 2;
    quickCollar.position.x = 3.2;
    // Micro analog purge pressure gauge dial above port
    const gaugeBody = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 1.1, 18), mats.matteBlackAnodized);
    gaugeBody.rotation.z = Math.PI / 2;
    gaugeBody.position.set(1.4, 3.2, 0);
    const gaugeFace = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 0.18, 16), pal.einkPaper);
    gaugeFace.rotation.z = Math.PI / 2;
    gaugeFace.position.set(1.98, 3.2, 0);
    // 4 flange corner screws
    for (const [sy, sz] of [[-2.2, -2.2], [-2.2, 2.2], [2.2, -2.2], [2.2, 2.2]]) {
      const bolt = makeCabinetBolt(0.32, 0.5, mats.titaniumRivet);
      bolt.rotation.set(0, 0, Math.PI / 2);
      bolt.position.set(0.45, sy, sz);
      g.add(bolt);
    }
    g.add(flange, valveBody, quickCollar, gaugeBody, gaugeFace);

    parts.push(
      finalizeDryboxPart(
        'db-n2-purge-coupler',
        20,
        '#14b8a6',
        g,
        new THREE.Vector3(27.8, 26.0, -8.0),
        new THREE.Vector3(44.0, 10.0, -8.0),
        cp
      )
    );
  }

  return parts;
}
