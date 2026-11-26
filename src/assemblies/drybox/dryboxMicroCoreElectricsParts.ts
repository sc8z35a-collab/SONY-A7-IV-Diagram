import * as THREE from 'three';
import { CadPart } from '../types';
import {
  createFrameShape,
  createHelicalSpringGeometry,
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
 * Build Phase 35B Part 2 (DB65–DB90 — 26 Ultra-Detailed Missing Sub-Assemblies):
 * - Hybrid Dehumidification Core Internals: PEM Bipolar Flow Plates, PEM H-Bridge Driver,
 *   MOF Retention Cage, 120°C Bimetal + 138°C Thermal Fuse, Exhaust Check Valve,
 *   TEC Graphite TIM + PEEK Standoffs, Cold-Plate NTC, 3D Porous Alumina Evaporator & Heatsink Thermal Break (DB65–DB73)
 * - UV-C Fused Silica Cavity, SiC UV Photodiode, Honeycomb Laminar Grid, Auto N2 Solenoid Valve,
 *   Micro-Stepper Butterfly Damper (DB74–DB78)
 * - IEC C14 Dual-Stage EMI Filter, ±30kV TVS + I2C Isolator, Ideal-Diode ORing BMS,
 *   External 2.4GHz RF Radome Antenna, TCXO RTC + FRAM 10-Yr Logger, NASA ASTM E595 PTFE Harness (DB79–DB84)
 * - Piezo Alarm + Light-Pipe, Dual-Locking PU Casters, 2-Axis Bullseye Level,
 *   50mm Rear Wall Stand-Off Bumpers, Copper-Ion ESD Mat & NIST/NFC Calibration Plate (DB85–DB90)
 */
export function buildDryboxMicroCoreElectricsParts(ctx: DryboxPartBuilderCtx): CadPart[] {
  const { mats, pal, cp } = ctx;
  const parts: CadPart[] = [];

  // =========================================================================
  // DB65. PEM Serpentine Titanium Flow-Field Plates, FKM Seals & Belleville Springs
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin CNC-machined Grade-2 titanium bipolar flow-field plates clamping DB33/DB34 at uniform 1.2 MPa
    for (const sz of [-1.25, 1.25]) {
      const plate = new THREE.Mesh(new THREE.BoxGeometry(14.8, 12.6, 0.55), mats.titaniumRivet);
      plate.position.z = sz;
      g.add(plate);
      // Serpentine micro-channel ribs milled across vapor face
      for (let r = -4.2; r <= 4.2; r += 1.4) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.35, 0.32), mats.stainlessMachined);
        rib.position.set(0, r, sz * 0.72);
        rib.userData.noEdges = true;
        g.add(rib);
      }
      // Molded FKM fluoroelastomer perimeter sealing gasket
      const gaskShape = createFrameShape(14.2, 12.0, 0.8, 12.2, 10.0, 0.5);
      const gask = new THREE.Mesh(extrudeCentered(gaskShape, 0.25, 0.03, 0.03, 8), pal.ptcTerracotta);
      gask.position.z = sz * 0.6;
      g.add(gask);
    }
    // 4 Corner tie-bolts stacked with conical Belleville disc springs maintaining constant clamping load
    for (const [bx, by] of [[-6.4, 5.4], [6.4, 5.4], [-6.4, -5.4], [6.4, -5.4]]) {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 3.8, 10), mats.stainlessMachined);
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(bx, by, 0);
      const belleville = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.88, 0.42, 14), pal.brassPrecision);
      belleville.rotation.x = Math.PI / 2;
      belleville.position.set(bx, by, -1.78);
      g.add(bolt, belleville);
    }

    parts.push(
      finalizeDryboxPart(
        'db-pem-bipolar-flowplates',
        65,
        '#0891b2',
        g,
        new THREE.Vector3(0, 12.0, -25.4),
        new THREE.Vector3(0, 14.0, -34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB66. PEM Fold-Back Constant-Current & Polarity-Reversing H-Bridge Driver PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(9.6, 6.2, 0.55), pal.pcbEmeraldDark);
    // 4 low-Rds(on) MOSFETs forming full H-bridge (allows 3V polarity flip for winter micro-humidification!)
    for (const [mx, my] of [[-2.6, 1.4], [-0.4, 1.4], [-2.6, -1.2], [-0.4, -1.2]]) {
      const fet = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 0.48), mats.icEpoxy);
      fet.position.set(mx, my, -0.45);
      g.add(fet);
    }
    // Fold-back current-limiting buck inductor + precision 0.05Ω shunt resistor (tracks Faraday mA!)
    const coil = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 1.25), mats.ferriteInductor);
    coil.position.set(2.4, 1.2, -0.8);
    const shunt = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, 0.42), pal.brassPrecision);
    shunt.position.set(2.4, -1.4, -0.42);
    g.add(pcb, coil, shunt);

    parts.push(
      finalizeDryboxPart(
        'db-pem-hbridge-driver-pcb',
        66,
        '#059669',
        g,
        new THREE.Vector3(12.2, 12.0, -25.6),
        new THREE.Vector3(24.0, 14.0, -40.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB67. Spring-Tensioned Stainless MOF Retention Cage & 0.5μm Anti-Dust PTFE Wrap
  // =========================================================================
  {
    const g = new THREE.Group();
    // Perforated stainless wire-mesh containment frame preventing MOF/zeolite pellet attrition dust
    const frameShape = createFrameShape(13.6, 11.4, 0.8, 11.6, 9.4, 0.5);
    const cageFrame = new THREE.Mesh(extrudeCentered(frameShape, 2.8, 0.06, 0.06, 10), mats.stainlessMachined);
    // 0.5 μm sintered hydrophobic ePTFE dust-containment envelope faces (front & rear)
    for (const sz of [-1.25, 1.25]) {
      const wrap = new THREE.Mesh(new THREE.BoxGeometry(11.5, 9.3, 0.16), pal.ptfeCleanWhite);
      wrap.position.z = sz;
      g.add(wrap);
      // Crossed stainless mesh ribs
      for (let rx = -4.2; rx <= 4.2; rx += 2.1) {
        const wire = new THREE.Mesh(new THREE.BoxGeometry(0.18, 9.4, 0.25), mats.stainlessMachined);
        wire.position.set(rx, 0, sz * 1.06);
        wire.userData.noEdges = true;
        g.add(wire);
      }
    }
    // 2 top compression coil springs gently keeping the MOF pellet bed packed tightly during thermal cycling
    for (const sx of [-3.4, 3.4]) {
      const sp = new THREE.Mesh(createHelicalSpringGeometry(0.65, 2.0, 5, 0.12), mats.stainlessMachined);
      sp.position.set(sx, 5.2, 0);
      g.add(sp);
    }
    g.add(cageFrame);

    parts.push(
      finalizeDryboxPart(
        'db-mof-mesh-ptfe-cage',
        67,
        '#10b981',
        g,
        new THREE.Vector3(0, -1.5, -25.4),
        new THREE.Vector3(-18.0, 2.0, -44.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB68. Redundant 120°C Bimetal Snap-Disc Thermostat & 138°C Thermal Fuse
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mounted directly on the BaTiO3 PTC regeneration heater housing (IEC 60335-1 mandatory dual thermal cutoff!)
    // 1. Resettable 120°C stainless/phenolic bimetal snap-disc thermostat (KSD301 style)
    const thermoFlange = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.8, 0.35), mats.stainlessMachined);
    thermoFlange.position.set(-2.4, 0, 0);
    const thermoCap = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.15, 1.35, 16), pal.glazingEpdmMatte);
    thermoCap.rotation.x = Math.PI / 2;
    thermoCap.position.set(-2.4, 0, -0.75);
    const spadeA = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.4, 0.85), pal.brassPrecision);
    spadeA.position.set(-3.1, 0, -1.65);
    const spadeB = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.4, 0.85), pal.brassPrecision);
    spadeB.position.set(-1.7, 0, -1.65);
    // 2. Irreversible 138°C fusible-alloy axial thermal fuse (ruby-tip ceramic/metal barrel!)
    const fuseBody = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 3.6, 14), mats.stainlessMachined);
    fuseBody.rotation.z = Math.PI / 2;
    fuseBody.position.set(2.4, 0, -0.45);
    const rubyTip = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.7, 14), pal.rubyThermalFuse);
    rubyTip.rotation.z = Math.PI / 2;
    rubyTip.position.set(4.1, 0, -0.45);
    const leadL = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.8, 8), mats.copperHeatSpreader);
    leadL.rotation.z = Math.PI / 2;
    leadL.position.set(0.0, 0, -0.45);
    g.add(thermoFlange, thermoCap, spadeA, spadeB, fuseBody, rubyTip, leadL);

    parts.push(
      finalizeDryboxPart(
        'db-bimetal-thermal-fuse138',
        68,
        '#e11d48',
        g,
        new THREE.Vector3(6.8, -5.8, -26.8),
        new THREE.Vector3(24.0, -5.0, -52.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB69. High-Temp Silicone Exhaust Check Flap Valve & Anti-Backflow Labyrinth
  // =========================================================================
  {
    const g = new THREE.Group();
    // Exhaust chute behind regeneration shutter with angled one-way silicone reed flap + 3-turn labyrinth baffle
    const housing = new THREE.Mesh(new THREE.BoxGeometry(12.2, 6.4, 2.6), mats.matteBlackAnodized);
    // Angled translucent amber-orange high-temp silicone one-way check flap
    const flap = new THREE.Mesh(new THREE.BoxGeometry(10.4, 4.8, 0.24), pal.kaptonAmberFilm);
    flap.position.set(0, -0.2, -1.35);
    flap.rotation.x = 0.24;
    // 3 staggered internal labyrinth baffles blocking back-draft moisture & exterior insects
    for (let i = 0; i < 3; i++) {
      const baf = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.32, 1.9), mats.stainlessMachined);
      baf.position.set(0, -1.8 + i * 1.8, (i % 2 === 0 ? 0.25 : -0.25));
      g.add(baf);
    }
    g.add(housing, flap);

    parts.push(
      finalizeDryboxPart(
        'db-exhaust-check-labyrinth',
        69,
        '#f59e0b',
        g,
        new THREE.Vector3(0, -1.5, -28.4),
        new THREE.Vector3(0, -2.0, -72.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB70. High-k Graphite TIM Pads, PEEK Thermal-Break Bushings & TEC Potting
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin 0.25mm pyrolytic graphite TIM interface sheets (cold side + hot side of Bi2Te3 Peltier DB38)
    for (const sz of [-0.95, 0.95]) {
      const tim = new THREE.Mesh(new THREE.BoxGeometry(11.2, 11.2, 0.22), mats.pyroGraphite);
      tim.position.z = sz;
      g.add(tim);
    }
    // Perimeter moisture-blocking RTV silicone potting collar around Peltier semiconductor legs
    const potShape = createFrameShape(11.8, 11.8, 0.4, 10.6, 10.6, 0.2);
    const potting = new THREE.Mesh(extrudeCentered(potShape, 1.55, 0.04, 0.04, 8), pal.ptfeCleanWhite);
    g.add(potting);
    // 4 Low-k PEEK thermal-break shoulder bushings + insulated clamp screws (eliminates thermal shorting!)
    for (const [bx, by] of [[-7.2, 4.8], [7.2, 4.8], [-7.2, -4.8], [7.2, -4.8]]) {
      const peek = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 2.6, 14), pal.kaptonAmberFilm);
      peek.rotation.x = Math.PI / 2;
      peek.position.set(bx, by, 0);
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 3.6, 10), mats.stainlessMachined);
      screw.rotation.x = Math.PI / 2;
      screw.position.set(bx, by, 0);
      g.add(peek, screw);
    }

    parts.push(
      finalizeDryboxPart(
        'db-tec-graphite-peek-mount',
        70,
        '#d97706',
        g,
        new THREE.Vector3(0, -16.2, -25.8),
        new THREE.Vector3(-22.0, -14.0, -56.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB71. Cold-Plate Direct-Contact Frost-Prevention NTC Thermistor Probe
  // =========================================================================
  {
    const g = new THREE.Group();
    // Gold-plated copper ring-lug NTC thermistor bolted straight onto Peltier cold-plate (guarantees T_c >= +2°C!)
    const lug = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.35, 16), mats.copperHeatSpreader);
    lug.rotation.x = Math.PI / 2;
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.62, 12, 10), pal.seismicGelBlue);
    bead.position.set(1.3, 0, 0);
    const bolt = makeCabinetBolt(0.45, 0.75, mats.stainlessMachined);
    // Kapton-taped twin lead wires running to PID defrost bridge amplifier PCB
    const wire = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.42, 0.25), pal.kaptonAmberFilm);
    wire.position.set(4.1, 0, 0);
    const ampPcb = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.0, 0.45), pal.pcbEmeraldDark);
    ampPcb.position.set(8.2, 0, 0);
    const ampIc = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.45), mats.icEpoxy);
    ampIc.position.set(8.2, 0, 0.38);
    g.add(lug, bead, bolt, wire, ampPcb, ampIc);

    parts.push(
      finalizeDryboxPart(
        'db-tec-coldplate-ntc-probe',
        71,
        '#38bdf8',
        g,
        new THREE.Vector3(3.2, -16.2, -23.0),
        new THREE.Vector3(24.0, -16.0, -30.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB72. 3D-Printed Porous Alumina Metasurface Evaporator & Waste-Heat Tray
  // =========================================================================
  {
    const g = new THREE.Group();
    // Exterior vaporization chamber directly coupled to Peltier hot-side waste heat (2025 Univ. of Michigan + Chiba Tech!)
    const tray = new THREE.Mesh(new THREE.BoxGeometry(15.6, 2.2, 4.4), mats.matteBlackAnodized);
    tray.position.set(0, -1.6, 0);
    // Hexagonal-cell porous alumina (Al2O3) sintered ceramic metasurface evaporator block
    const ceramicPad = new THREE.Mesh(new THREE.BoxGeometry(13.8, 3.6, 2.8), pal.aluminaCeramic);
    ceramicPad.position.set(0, 1.0, 0);
    // Sculpted micro-fin hexagonal evaporation columns along top of ceramic pad
    for (let x = -5.4; x <= 5.4; x += 1.8) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 1.2, 6), pal.aluminaCeramic);
      col.position.set(x, 3.2, 0);
      col.userData.noEdges = true;
      g.add(col);
    }
    // Copper thermal bridge conducting waste heat from hot heatsink bottom into evaporation tray
    const heatBridge = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.55, 2.2), mats.copperHeatSpreader);
    heatBridge.position.set(0, -2.75, 0);
    g.add(tray, ceramicPad, heatBridge);

    parts.push(
      finalizeDryboxPart(
        'db-ceramic-metasurface-evap',
        72,
        '#f3f0e8',
        g,
        new THREE.Vector3(0, -23.4, -27.8),
        new THREE.Vector3(0, -24.0, -68.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB73. Silicone Thermal-Break Isolation Flange (Hot Heatsink vs Steel Chassis)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Thick low-k cellular silicone thermal-break gasket stopping 45°C skived heatsink heat from conducting back into cabinet steel
    const isoShape = createFrameShape(25.2, 46.5, 1.6, 19.6, 40.8, 1.0);
    const isoPad = new THREE.Mesh(extrudeCentered(isoShape, 1.2, 0.1, 0.1, 10), pal.ptcTerracotta);
    // 6 fiberglass-reinforced nylon shoulder grommets isolating heatsink mounting bolts
    for (const [bx, by] of [[-11.2, 20.5], [11.2, 20.5], [-11.2, 0], [11.2, 0], [-11.2, -20.5], [11.2, -20.5]]) {
      const grom = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 1.5, 12), pal.pa66ThermalBreak);
      grom.rotation.x = Math.PI / 2;
      grom.position.set(bx, by, 0);
      g.add(grom);
    }
    g.add(isoPad);

    parts.push(
      finalizeDryboxPart(
        'db-heatsink-thermal-break',
        73,
        '#ea580c',
        g,
        new THREE.Vector3(0, -2.0, -27.1),
        new THREE.Vector3(0, 0, -60.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB74. Synthetic UV-Grade Fused Silica Window & Polished Al Light-Trap Cavity
  // =========================================================================
  {
    const g = new THREE.Group();
    // Polished pure-aluminum reflective sterilization tunnel (>85% UV-C reflectance, triples spore-kill dose!)
    const cavity = new THREE.Mesh(new THREE.BoxGeometry(15.2, 6.2, 3.8), pal.butylCldFoil);
    // Synthetic fused silica (SiO2) optical window (>92% transmittance at 265nm vs 0% for ordinary glass!)
    const silicaWin = new THREE.Mesh(new THREE.BoxGeometry(13.0, 4.4, 0.45), pal.arItoFilm);
    silicaWin.position.z = 1.85;
    // Chevron black-anodized UV light-trap louver blades at inlet/outlet (0.00% UV-C leakage to camera rubbers!)
    for (const sx of [-6.8, 6.8]) {
      for (let i = -2; i <= 2; i++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 3.2), mats.matteBlackAnodized);
        blade.position.set(sx, i * 1.05, 0);
        blade.rotation.z = sx < 0 ? 0.52 : -0.52;
        g.add(blade);
      }
    }
    g.add(cavity, silicaWin);

    parts.push(
      finalizeDryboxPart(
        'db-uvc-fused-silica-cavity',
        74,
        '#a855f7',
        g,
        new THREE.Vector3(0, 22.8, -21.2),
        new THREE.Vector3(-22.0, 22.0, -24.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB75. Solar-Blind SiC Deep-UVC Monitoring Photodiode & Aging Compensator
  // =========================================================================
  {
    const g = new THREE.Group();
    // Hermetic TO-5 gold-plated metal can SiC photodiode facing UV-C LED bar across sterilization duct
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.6, 4.2, 0.5), pal.pcbEmeraldDark);
    const to5Can = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 1.2, 18), pal.brassPrecision);
    to5Can.rotation.x = Math.PI / 2;
    to5Can.position.set(-1.1, 0, 0.72);
    const sicDie = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.22), pal.uvcVioletGlow);
    sicDie.position.set(-1.1, 0, 1.32);
    // Transimpedance precision amplifier IC compensating LED output degradation over 10,000h
    const tiaIc = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 0.45), mats.icEpoxy);
    tiaIc.position.set(1.4, 0, 0.4);
    g.add(pcb, to5Can, sicDie, tiaIc);

    parts.push(
      finalizeDryboxPart(
        'db-uvc-sic-monitor-pd',
        75,
        '#7c3aed',
        g,
        new THREE.Vector3(9.2, 22.8, -21.2),
        new THREE.Vector3(28.0, 22.0, -24.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB76. Micro-Honeycomb Laminar Flow Straightener & 300-Mesh Anti-Insect Screen
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sy of [28.5, 6.5, -22.5]) {
      const gridFrame = new THREE.Mesh(new THREE.BoxGeometry(22.0, 3.6, 0.95), mats.stainlessMachined);
      gridFrame.position.set(0, sy, -19.2);
      g.add(gridFrame);
      // Row of precision hexagonal laminar-flow straightening cells
      for (let gx = -9.0; gx <= 9.0; gx += 2.25) {
        const cell = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.05, 6), pal.ferritic430Steel);
        cell.rotation.x = Math.PI / 2;
        cell.position.set(gx, sy, -19.2);
        cell.userData.noEdges = true;
        g.add(cell);
      }
      // Ultra-fine 300-mesh stainless insect/lint pre-screen behind honeycomb
      const meshBack = new THREE.Mesh(new THREE.BoxGeometry(20.6, 2.8, 0.14), pal.sintered316L);
      meshBack.position.set(0, sy, -19.72);
      g.add(meshBack);
    }

    parts.push(
      finalizeDryboxPart(
        'db-honeycomb-flow-grid',
        76,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 8.0, -14.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB77. Automated N2 Purge Proportional Solenoid Valve, Flowmeter & 3kPa Relief
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mounted right inside right exterior N2 coupler (DB20): cuts N2 gas usage by 80% via RH-triggered pulsing!
    const manifold = new THREE.Mesh(new THREE.BoxGeometry(3.2, 7.2, 4.6), pal.brassPrecision);
    // Low-power 12V electromagnetic proportional solenoid coil cube
    const coil = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.8, 3.4), pal.seismicGelBlue);
    coil.position.set(-2.4, 1.8, 0);
    // Inline glass micro-rotameter flow tube (0–10 L/min) with floating stainless ball
    const flowTube = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 5.2, 14), pal.loweGlassClear);
    flowTube.position.set(0, 0, 3.2);
    const floatBall = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), pal.rubyThermalFuse);
    floatBall.position.set(0, 0.8, 3.2);
    // 3 kPa spring-loaded over-pressure safety pop-off relief valve
    const relief = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 2.2, 12), mats.stainlessMachined);
    relief.position.set(0, -4.4, 0);
    g.add(manifold, coil, flowTube, floatBall, relief);

    parts.push(
      finalizeDryboxPart(
        'db-n2-auto-solenoid-valve',
        77,
        '#0ea5e9',
        g,
        new THREE.Vector3(23.0, 24.5, -4.5),
        new THREE.Vector3(44.0, 18.0, -8.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB78. Micro-Stepper Dual-Zone Butterfly Damper Actuator & Optical Home Sensor
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision planetary micro-stepper motor driving the dual-zone proportioning butterfly valve at DIVIDER_Y
    const ductCollar = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 2.6, 20), mats.matteBlackAnodized);
    // Silicone-rimmed stainless butterfly damper blade rotated at 35° proportional throttle
    const blade = new THREE.Mesh(new THREE.CylinderGeometry(2.45, 2.45, 0.28, 20), mats.stainlessMachined);
    blade.rotation.x = 0.62;
    const bladeRim = new THREE.Mesh(new THREE.TorusGeometry(2.46, 0.16, 8, 20), pal.seismicGelBlue);
    bladeRim.rotation.x = Math.PI / 2 + 0.62;
    // Stepper motor cylindrical body + brass shaft coupling + optical U-slot home interrupter
    const stepper = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.75, 2.8, 18), mats.stainlessMachined);
    stepper.rotation.z = Math.PI / 2;
    stepper.position.set(4.2, 0, 0);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 5.4, 10), pal.brassPrecision);
    shaft.rotation.z = Math.PI / 2;
    shaft.position.set(1.6, 0, 0);
    const optoHome = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 1.2), pal.pcbEmeraldDark);
    optoHome.position.set(2.4, 1.4, 0);
    g.add(ductCollar, blade, bladeRim, stepper, shaft, optoHome);

    parts.push(
      finalizeDryboxPart(
        'db-stepper-butterfly-damper',
        78,
        '#2563eb',
        g,
        new THREE.Vector3(-4.0, DB_DIM.DIVIDER_Y, -19.5),
        new THREE.Vector3(-28.0, -8.0, -28.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB79. Locking IEC 60320 C14 Inlet, Fuse Drawer & 2-Stage Nanocrystalline EMI Filter
  // =========================================================================
  {
    const g = new THREE.Group();
    // Shielded metal Schaffner-grade dual-stage IEC C14 power entry module on lower-rear right
    const shieldCan = new THREE.Mesh(new THREE.BoxGeometry(6.8, 5.2, 6.2), mats.emiShieldCan);
    const c14Face = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.6, 0.85), pal.glazingEpdmMatte);
    c14Face.position.set(0, 0.4, -3.25);
    // 3 brass IEC C14 prong blades (L, N, PE)
    for (const [px, py] of [[-1.3, 0.0], [1.3, 0.0], [0, 1.1]]) {
      const prong = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.85, 1.1), pal.brassPrecision);
      prong.position.set(px, py, -3.45);
      g.add(prong);
    }
    // Red fuse-holder drawer + mechanical stainless cord-retention locking bail
    const fuseDrawer = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.1, 0.65), pal.rubyThermalFuse);
    fuseDrawer.position.set(0, -1.75, -3.25);
    const lockBail = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.16, 8, 18, Math.PI), mats.stainlessMachined);
    lockBail.position.set(0, 0.4, -3.95);
    // Internal visible nanocrystalline toroidal common-mode choke + X2 yellow film cap on rear open side
    const choke = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.55, 10, 18), mats.copperCoil);
    choke.position.set(-1.2, 0.4, 2.2);
    const x2Cap = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 1.3), mats.tantalumCapYellow);
    x2Cap.position.set(1.6, 0.4, 2.2);
    g.add(shieldCan, c14Face, fuseDrawer, lockBail, choke, x2Cap);

    parts.push(
      finalizeDryboxPart(
        'db-iec-c14-emi-inlet',
        79,
        '#f59e0b',
        g,
        new THREE.Vector3(16.5, -39.5, -24.2),
        new THREE.Vector3(34.0, -26.0, -48.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB80. IEC 61000-4-2 ±30kV TVS ESD Diode Array & Digital I2C Galvanic Isolator
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dedicated protection mezzanine board isolating front E-Ink/USB/SHT45 buses from ±30kV static zaps
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.65, 5.2), pal.pcbEmeraldDark);
    // White ceramic galvanic isolation barrier trench dividing primary & secondary ground planes
    const isoGap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.72, 5.25), pal.aluminaCeramic);
    // Wide-body SOIC-16 digital I2C galvanic isolator straddling the barrier
    const isoIc = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.7, 2.4), mats.icEpoxy);
    isoIc.position.set(0, 0.62, 0);
    // 4 ultra-low-capacitance ±30kV TVS ESD clamp arrays along connector edge
    for (let i = 0; i < 4; i++) {
      const tvs = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.45, 0.75), mats.icEpoxy);
      tvs.position.set(-3.2, 0.5, -1.6 + i * 1.05);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.16, 0.82), mats.goldPlating);
      pad.position.set(-3.2, 0.36, -1.6 + i * 1.05);
      g.add(tvs, pad);
    }
    g.add(pcb, isoGap, isoIc);

    parts.push(
      finalizeDryboxPart(
        'db-tvs-esd-galvanic-iso',
        80,
        '#06b6d4',
        g,
        new THREE.Vector3(-12.8, 45.8, 8.2),
        new THREE.Vector3(-34.0, 32.0, 18.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB81. Zero-Dropout MOSFET Ideal-Diode ORing Controller & LiFePO4 BMS Board
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(10.8, 5.8, 0.6), pal.pcbEmeraldDark);
    // Twin back-to-back N-channel Power MOSFETs (<8 mΩ Rds(on)) + Ideal-Diode ORing controller IC
    for (const mx of [-3.2, -1.0]) {
      const mos = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.9, 0.55), mats.icEpoxy);
      mos.position.set(mx, 1.1, -0.5);
      g.add(mos);
    }
    const ctrlIc = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 0.45), mats.icEpoxy);
    ctrlIc.position.set(-2.1, -1.4, -0.45);
    // LiFePO4 4-cell active balancing resistor bank & copper bus tabs
    for (let b = 0; b < 4; b++) {
      const bal = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.8, 0.55), pal.aluminaCeramic);
      bal.position.set(1.4 + b * 1.15, 0.9, -0.52);
      g.add(bal);
    }
    const busTab = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.8, 0.35), mats.copperHeatSpreader);
    busTab.position.set(3.1, -1.4, -0.45);
    g.add(pcb, ctrlIc, busTab);

    parts.push(
      finalizeDryboxPart(
        'db-ideal-diode-oring-bms',
        81,
        '#16a34a',
        g,
        new THREE.Vector3(-12.0, -39.2, -23.2),
        new THREE.Vector3(-34.0, -28.0, -48.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB82. External 2.4GHz Thread/Wi-Fi Ceramic Antenna Radome & Coaxial IPEX
  // =========================================================================
  {
    const g = new THREE.Group();
    // RF-transparent polycarbonate top-rear radome pod outside SPCC steel Faraday cage (>35dB signal rescue!)
    const radome = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(12.5, 4.2, 1.4), 1.9, 0.16, 0.16, 12),
      pal.ptfeCleanWhite
    );
    radome.rotation.x = Math.PI / 2;
    // Internal dual-band 2.4GHz ceramic chip + meandered gold PCB dipole element visible on cutaway
    const antPcb = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.45, 2.4), pal.pcbEmeraldDark);
    antPcb.position.y = -0.15;
    const dipole = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.18, 0.75), mats.goldPlating);
    dipole.position.y = 0.16;
    const ceramicChip = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.65, 0.95), pal.aluminaCeramic);
    ceramicChip.position.set(-2.6, 0.35, 0);
    // Gold SMA bulkhead + thin shielded coaxial pigtail passing through top shell to Matter IoT SoC (DB13)
    const smaNut = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.8, 6), pal.brassPrecision);
    smaNut.position.set(4.2, -1.6, 0);
    const coax = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 6.2, 10), pal.glazingEpdmMatte);
    coax.rotation.x = Math.PI / 2;
    coax.position.set(4.2, -2.5, 3.0);
    g.add(radome, antPcb, dipole, ceramicChip, smaNut, coax);

    parts.push(
      finalizeDryboxPart(
        'db-external-rf-radome-ant',
        82,
        '#f8fafc',
        g,
        new THREE.Vector3(14.5, 52.8, -12.5),
        new THREE.Vector3(24.0, 40.0, -18.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB83. ±2 ppm TCXO Real-Time Clock & 10-Year Non-Volatile FRAM Data Logger
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.65, 5.8), pal.pcbEmeraldDark);
    // Hermetically sealed silver-lid ±2 ppm Temperature-Compensated Crystal Oscillator (TCXO)
    const tcxo = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.72, 1.8), mats.stainlessMachined);
    tcxo.position.set(-2.0, 0.62, -1.1);
    // Non-volatile Ferroelectric RAM (FRAM — 10^14 write cycles, 10-yr audit trail!)
    const fram = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.55, 2.2), mats.icEpoxy);
    fram.position.set(1.8, 0.55, -1.0);
    // Dedicated BR2032 low-leakage coin-cell clock backup holder (10-year RTC keepalive)
    const coinHolder = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 0.75, 20), pal.glazingEpdmMatte);
    coinHolder.position.set(0, 0.65, 1.45);
    const coinCell = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.42, 20), mats.stainlessMachined);
    coinCell.position.set(0, 0.92, 1.45);
    g.add(pcb, tcxo, fram, coinHolder, coinCell);

    parts.push(
      finalizeDryboxPart(
        'db-tcxo-rtc-fram-logger',
        83,
        '#14b8a6',
        g,
        new THREE.Vector3(12.8, 45.8, 8.2),
        new THREE.Vector3(34.0, 32.0, 18.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB84. NASA ASTM E595 Low-Outgassing PTFE/FEP Internal Wiring Harness & JST Clips
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical clean-routed white PTFE/FEP fluoropolymer cable spine (TML <1%, CVCM <0.1% — zero lens fogging!)
    const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 86.0, 12), pal.ptfeCleanWhite);
    spine.position.set(-21.8, 2.5, -17.8);
    // Horizontal PTFE branch looms to E-Ink bezel (top), SHT45/UV-C (mid), and USB-C PD bay (bottom)
    const branchTop = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 24.0, 10), pal.ptfeCleanWhite);
    branchTop.rotation.x = Math.PI / 2;
    branchTop.position.set(-21.8, 44.5, -5.8);
    const branchMid = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 18.0, 10), pal.ptfeCleanWhite);
    branchMid.rotation.z = Math.PI / 2;
    branchMid.position.set(-12.8, 12.0, -17.8);
    const branchBot = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 22.0, 10), pal.ptfeCleanWhite);
    branchBot.rotation.x = Math.PI / 2;
    branchBot.position.set(-21.8, -38.5, -6.8);
    // 5 UL94 V-0 ivory locking JST connector plugs & vibration-proof routing saddles
    for (const cy of [42.0, 22.0, 2.0, -18.0, -37.0]) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.4, 1.8), mats.zifIvoryPlastic);
      clip.position.set(-21.8, cy, -17.8);
      g.add(clip);
    }
    g.add(spine, branchTop, branchMid, branchBot);

    parts.push(
      finalizeDryboxPart(
        'db-astm595-ptfe-harness',
        84,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-42.0, 4.0, -12.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB85. Multi-Tone Piezoelectric Door/Humidity Alarm & Ambient-Dimming Light-Pipe
  // =========================================================================
  {
    const g = new THREE.Group();
    // Piezo acoustic resonator disc (2.7–4.0 kHz) behind upper bezel micro-grilles
    const piezo = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 0.95, 20), pal.glazingEpdmMatte);
    piezo.rotation.x = Math.PI / 2;
    piezo.position.set(-16.5, 0, -0.5);
    const brassDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 0.16, 18), pal.brassPrecision);
    brassDisc.rotation.x = Math.PI / 2;
    brassDisc.position.set(-16.5, 0, 0.04);
    // Precision acrylic optical light-pipe edge bar across top crown + ambient photodiode sensor
    const lightPipe = new THREE.Mesh(new THREE.BoxGeometry(36.0, 0.55, 0.72), pal.blue450Glow);
    lightPipe.position.set(2.0, -3.2, 0.35);
    const alsSensor = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.95, 0.45), pal.loweGlassClear);
    alsSensor.position.set(21.5, 0, 0.25);
    g.add(piezo, brassDisc, lightPipe, alsSensor);

    parts.push(
      finalizeDryboxPart(
        'db-piezo-alarm-lightpipe',
        85,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 47.6, 25.0),
        new THREE.Vector3(0, 32.0, 42.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB86. Heavy-Duty Dual-Brake 360° Polyurethane Casters & Reinforced Steel Plinth
  // =========================================================================
  {
    const g = new THREE.Group();
    // Welded heavy-gauge steel perimeter plinth subframe carrying 120 kg cabinet+lens load
    const plinthShape = createFrameShape(51.5, 44.5, 1.4, 43.0, 36.0, 0.8);
    const plinth = new THREE.Mesh(extrudeCentered(plinthShape, 1.2, 0.08, 0.08, 10), mats.matteBlackAnodized);
    plinth.rotation.x = Math.PI / 2;
    plinth.position.y = 0.6;
    g.add(plinth);

    // 4 Twin-Wheel Non-Marring Polyurethane Swivel Casters with Total-Lock Dual Brakes
    for (const [cx, cz] of [[-18.0, 15.0], [18.0, 15.0], [-18.0, -15.0], [18.0, -15.0]]) {
      const cg = new THREE.Group();
      cg.position.set(cx, -1.6, cz);
      const swivelPlate = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.45, 3.8), mats.stainlessMachined);
      swivelPlate.position.y = 1.65;
      const fork = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 2.2), mats.stainlessMachined);
      fork.position.y = 0.45;
      // Twin polyurethane floor-safe wheels
      for (const wx of [-0.95, 0.95]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.55, 0.65, 18), pal.glazingEpdmMatte);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, -0.55, 0);
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.72, 14), pal.seismicGelBlue);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(wx, -0.55, 0);
        cg.add(wheel, hub);
      }
      // Red foot-operated total-lock brake pedal (locks BOTH wheel roll & swivel rotation!)
      const brake = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 2.4), pal.fireRedAccent);
      brake.position.set(0, 0.35, 1.6);
      brake.rotation.x = 0.35;
      cg.add(swivelPlate, fork, brake);
      g.add(cg);
    }

    parts.push(
      finalizeDryboxPart(
        'db-locking-pu-casters',
        86,
        '#1e293b',
        g,
        new THREE.Vector3(0, -52.8, 0),
        new THREE.Vector3(0, -34.0, 0),
        cp
      )
    );
  }

  // =========================================================================
  // DB87. Integrated 2-Axis Precision Bullseye Spirit Level (<0.5° Alignment)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Recessed precision anodized housing at front-left top crown corner
    const bezel = new THREE.Mesh(new THREE.CylinderGeometry(2.35, 2.45, 0.9, 24), mats.matteBlackAnodized);
    // Fluorescent chartreuse-green spirit fluid vial with black center target bullseye ring
    const vial = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.95, 0.72, 24), pal.mofEmerald);
    vial.position.y = 0.14;
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.92, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.32), pal.loweGlassClear);
    dome.position.y = -0.35;
    const targetRing = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.08, 6, 18), pal.einkInkDark);
    targetRing.rotation.x = Math.PI / 2;
    targetRing.position.y = 0.62;
    // Centered white air bubble indicating perfect 0.0° level installation
    const bubble = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 10), pal.ptfeCleanWhite);
    bubble.scale.set(1.0, 0.45, 1.0);
    bubble.position.y = 0.56;
    g.add(bezel, vial, dome, targetRing, bubble);

    parts.push(
      finalizeDryboxPart(
        'db-bullseye-spirit-level',
        87,
        '#22c55e',
        g,
        new THREE.Vector3(-21.2, 52.35, 18.8),
        new THREE.Vector3(-30.0, 36.0, 24.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB88. Rear 50mm Minimum Thermal-Clearance Convection Stand-Off Bumpers
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 rubber-tipped stand-off spacer arms guaranteeing ≥50mm wall air gap behind skived aluminum heatsink!
    for (const [bx, by] of [[-23.5, 44.0], [23.5, 44.0], [-23.5, -44.0], [23.5, -44.0]]) {
      const mount = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.6, 14), mats.stainlessMachined);
      mount.rotation.x = Math.PI / 2;
      mount.position.set(bx, by, -24.5);
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.15, 5.2, 14), pal.pa66ThermalBreak);
      strut.rotation.x = Math.PI / 2;
      strut.position.set(bx, by, -27.2);
      const rubberTip = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.05, 1.1, 16), pal.glazingEpdmMatte);
      rubberTip.rotation.x = Math.PI / 2;
      rubberTip.position.set(bx, by, -30.2);
      g.add(mount, strut, rubberTip);
    }

    parts.push(
      finalizeDryboxPart(
        'db-rear-50mm-wall-bumpers',
        88,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -56.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB89. Antimicrobial Cu2+ Copper-Ion ESD Shock-Absorbing Base Mat & Cap Tray
  // =========================================================================
  {
    const g = new THREE.Group();
    // Textured antimicrobial copper-ion infused dissipative mat lining the Dual-Zone Divider deck (DB18)
    const mat = makeHorizBoxPlate(44.2, 34.5, 0.72, 1.1, pal.copperIonTeal, 0.08);
    // Subtle copper micro-conductive ground grid strips embedded on perimeter
    const rimShape = createFrameShape(43.2, 33.5, 0.9, 41.8, 32.1, 0.7);
    const cuRim = new THREE.Mesh(extrudeCentered(rimShape, 0.16, 0.02, 0.02, 10), mats.copperHeatSpreader);
    cuRim.rotation.x = Math.PI / 2;
    cuRim.position.y = 0.4;
    // Recessed front-left lens-cap & body-cap catch dish
    const capDish = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.42, 8, 24), pal.copperIonTeal);
    capDish.rotation.x = Math.PI / 2;
    capDish.position.set(-14.5, 0.48, 10.2);
    // ESD 10mm snap-stud bonding the mat to the steel shelf earth path
    const snapStud = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.35, 14), pal.brassPrecision);
    snapStud.position.set(19.5, 0.45, -14.0);
    g.add(mat, cuRim, capDish, snapStud);

    parts.push(
      finalizeDryboxPart(
        'db-copper-ion-esd-mat',
        89,
        '#0f766e',
        g,
        new THREE.Vector3(0, DB_DIM.DIVIDER_Y + 1.35, 1.0),
        new THREE.Vector3(-18.0, 2.0, 48.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB90. NIST/JCSS Traceable Calibration Plate & Passive NFC Service Passport Tag
  // =========================================================================
  {
    const g = new THREE.Group();
    // Laser-etched brushed stainless traceability & electrical certification plate on upper right exterior
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.32, 9.5, 14.5), mats.stainlessMachined);
    // Dark laser-marked serial/calibration certification table bands
    for (let i = 0; i < 4; i++) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.65, 11.4), pal.einkInkDark);
      line.position.set(0.05, 2.8 - i * 1.6, 0);
      line.userData.noEdges = true;
      g.add(line);
    }
    // Embedded passive 13.56 MHz ISO 14443A NFC service-passport coil inlay (tap phone for NIST PDF & filter logs!)
    const nfcRing = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.14, 8, 20), pal.brassPrecision);
    nfcRing.rotation.y = Math.PI / 2;
    nfcRing.position.set(0.18, -2.5, 4.4);
    const nfcChip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.85, 0.85), pal.seismicGelBlue);
    nfcChip.position.set(0.2, -2.5, 4.4);
    // 4 stainless corner blind rivets
    for (const [ry, rz] of [[3.9, 6.2], [3.9, -6.2], [-3.9, 6.2], [-3.9, -6.2]]) {
      const rv = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.45, 10), mats.stainlessMachined);
      rv.rotation.z = Math.PI / 2;
      rv.position.set(0.12, ry, rz);
      g.add(rv);
    }
    g.add(plate, nfcRing, nfcChip);

    parts.push(
      finalizeDryboxPart(
        'db-nist-nfc-cal-plate',
        90,
        '#0284c7',
        g,
        new THREE.Vector3(27.25, 38.0, 8.5),
        new THREE.Vector3(38.0, 26.0, 14.0),
        cp
      )
    );
  }

  return parts;
}
