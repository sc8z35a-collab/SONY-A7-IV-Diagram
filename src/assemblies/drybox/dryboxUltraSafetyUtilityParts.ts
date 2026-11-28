//@FLOW_MAP|file=src/assemblies/drybox/dryboxUltraSafetyUtilityParts.ts|unit=drybox|lines=798|exports=buildDryboxUltraSafetyUtilityParts
import * as THREE from 'three';
import { CadPart } from '../types';
import {
  createFrameShape,
  createRoundedRectShape,
  extrudeCentered,
} from '../../engine/CadHelpers';
import {
  DryboxPartBuilderCtx,
  finalizeDryboxPart,
  makeCabinetBolt,
  makeHorizBoxPlate,
} from './dryboxPartsShared';

/**
 * Build Phase 38 Part 2 (DB111–DB130 — 20 Ultra-HD Thermal/Airflow Telemetry, Safety/HSM Power & Ergonomics Parts):
 * - Laminated OFHC Copper TEC Thermal Strap, EU PFAS-Free Superhydrophobic Exhaust Duct,
 *   Sensirion SDP33 Filter ΔP MEMS Sensor, Silicone Fan Pull-Pins & Helmholtz Liner,
 *   13.56 MHz Filter RFID Lifecycle Tag, Sensirion SFM4300 N2 Mass-Flow + 0.01μm Coalescer (DB111–DB116)
 * - IEC 61643-11 3-Stage Lightning Surge (GDT+MOV+NTC), TI TPS3850 Hardware Window Watchdog IC,
 *   NXP EdgeLock SE050 EAL6+ HSM, LiFePO4 Sub-Zero Kapton Self-Heater Pad,
 *   Zero-Crossing Opto-Triac SSR, IPC-CC-830C Vapor-Deposited Parylene-C Conformal Coat (DB117–DB122)
 * - Magnetic Pogo Service Port & IP67 Engine Coupler, Volt-Free SPDT Dry Contact BMS Alarm Relay,
 *   Non-Drill Magnetic Side Accessory Caddy, Rear Cord-Winder Cleats,
 *   Matte-Black Flocked Backdrop + 18% Gray Card, SUS304 Kickplate + EPDM Bumper,
 *   Modular Multi-Cabinet Ganging Brackets, EU ESPR 2026 & ISO 11469 DfD Eco-ID Plate (DB123–DB130)
 */
export function buildDryboxUltraSafetyUtilityParts(ctx: DryboxPartBuilderCtx): CadPart[] {
  const { mats, pal, cp } = ctx;
  const parts: CadPart[] = [];

  // =========================================================================
  // DB111. Laminated OFHC Copper-Foil CTE-Compliant Flexible Thermal Expansion Strap (TEC)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cold/hot terminal clamping lugs
    const lugA = new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.2, 0.85), mats.copperCoil);
    lugA.position.set(0, 3.2, 0);
    const lugB = new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.2, 0.85), mats.copperCoil);
    lugB.position.set(0, -3.2, 0);
    g.add(lugA, lugB);
    // 6 Stacked arched 50μm OFHC copper foil lamellae flexing freely in XY without stressing ceramic TEC!
    for (let i = 0; i < 6; i++) {
      const zArch = -0.35 - i * 0.14;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 3.0, 0),
        new THREE.Vector3(0, 1.4, zArch - 0.85),
        new THREE.Vector3(0, -1.4, zArch - 0.85),
        new THREE.Vector3(0, -3.0, 0),
      ]);
      const foil = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.14, 6, false), mats.copperCoil);
      foil.scale.set(22.0, 1.0, 0.45);
      foil.userData.noEdges = true;
      g.add(foil);
    }
    // 4 High-conductivity silver-plated compression bolts
    for (const bx of [-3.4, 3.4]) {
      for (const by of [-3.2, 3.2]) {
        const b = makeCabinetBolt(0.36, 1.0, mats.stainlessMachined);
        b.position.set(bx, by, 0.35);
        g.add(b);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-tec-thermal-expansion-strap',
        111,
        '#ea580c',
        g,
        new THREE.Vector3(0, -15.5, -26.8),
        new THREE.Vector3(26.0, -16.0, -56.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB112. 2026 EU REACH PFAS-Free Superhydrophobic Organosilane Rear Exhaust Duct
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sloped downward-pitch exhaust chimney shedding winter condensation droplets outward cleanly
    const outerDuct = new THREE.Mesh(new THREE.BoxGeometry(10.4, 6.2, 3.4), pal.esdPowderShell);
    // Inner superhydrophobic (>145° contact angle) PFAS-free organosilane nanocoated liner
    const innerLiner = new THREE.Mesh(new THREE.BoxGeometry(9.2, 5.0, 3.65), pal.pfasFreeHydroBlue);
    innerLiner.rotation.x = 0.18; // 10° outward gravity-drain slope
    // Drip-shedding bevel lip & micro-beaded water droplets rolling off
    const dripLip = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.55, 1.4), pal.pfasFreeHydroBlue);
    dripLip.position.set(0, -2.65, -2.0);
    dripLip.rotation.x = 0.42;
    for (const dx of [-2.8, 0, 2.8]) {
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), pal.loweGlassClear);
      drop.position.set(dx, -2.25, -2.3);
      drop.userData.noEdges = true;
      g.add(drop);
    }
    g.add(outerDuct, innerLiner, dripLip);

    parts.push(
      finalizeDryboxPart(
        'db-pfasfree-hydrophobic-duct',
        112,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, -1.5, -27.6),
        new THREE.Vector3(-20.0, -6.0, -70.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB113. Sensirion SDP33 Digital MEMS Differential-Pressure Sensor (HEPA Clog Diagnostics)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mini vertical sensor PCB mounted beside HEPA H13 + Carbon Cartridge (DB30)
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(3.8, 6.2, 0.55), pal.pcbEmeraldDark);
    // Central SDP33 CMOSens thermal mass-flow differential pressure chip with dual barbed ports
    const sdpChip = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.6, 1.05), pal.ceramicFritBlack);
    sdpChip.position.set(0, 0, 0.68);
    // Upstream (P1: pre-HEPA) & Downstream (P2: post-HEPA) clear silicone Pitot sampling tubes
    const curveUp = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.8, 1.2),
      new THREE.Vector3(2.2, 2.6, 1.8),
      new THREE.Vector3(5.6, 3.2, 1.2),
    ]);
    const curveDn = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.8, 1.2),
      new THREE.Vector3(2.2, -2.6, 1.8),
      new THREE.Vector3(5.6, -3.2, -0.8),
    ]);
    const tube1 = new THREE.Mesh(new THREE.TubeGeometry(curveUp, 16, 0.26, 8, false), pal.pfasFreeHydroBlue);
    const tube2 = new THREE.Mesh(new THREE.TubeGeometry(curveDn, 16, 0.26, 8, false), pal.pemNafionCyan);
    const brassTip1 = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.8, 10), pal.brassPrecision);
    brassTip1.rotation.z = Math.PI / 2;
    brassTip1.position.set(5.8, 3.2, 1.2);
    const brassTip2 = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.8, 10), pal.brassPrecision);
    brassTip2.rotation.z = Math.PI / 2;
    brassTip2.position.set(5.8, -3.2, -0.8);
    g.add(pcb, sdpChip, tube1, tube2, brassTip1, brassTip2);

    parts.push(
      finalizeDryboxPart(
        'db-filter-dp-mems-sensor',
        113,
        '#06b6d4',
        g,
        new THREE.Vector3(-12.5, 16.8, -21.0),
        new THREE.Vector3(-42.0, 20.0, -24.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB114. Shore A 40 Silicone Fan Isolation Pull-Pins & Micro-Perforated Helmholtz Acoustic Liner
  // =========================================================================
  {
    const g = new THREE.Group();
    // Circular micro-perforated Helmholtz acoustic shroud wrapping DB31 maglev fan
    const shroud = new THREE.Mesh(new THREE.CylinderGeometry(6.8, 6.8, 3.2, 28, 1, true), pal.xpeCharcoalFoam);
    shroud.rotation.x = Math.PI / 2;
    const innerPerfs = new THREE.Mesh(new THREE.CylinderGeometry(6.45, 6.45, 3.0, 28, 1, true), pal.aluminaCeramic);
    innerPerfs.rotation.x = Math.PI / 2;
    g.add(shroud, innerPerfs);
    // 4 Corner Shore A 40 Silicone Dumbbell Anti-Vibration Pull-Pins (zero hard screw path to steel!)
    for (const sx of [-5.2, 5.2]) {
      for (const sy of [-5.2, 5.2]) {
        const pin = new THREE.Group();
        pin.position.set(sx, sy, 0);
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 4.2, 12), pal.seismicGelBlue);
        shaft.rotation.x = Math.PI / 2;
        const collarA = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.52, 14), pal.seismicGelBlue);
        collarA.rotation.x = Math.PI / 2;
        collarA.position.z = 1.1;
        const collarB = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.52, 14), pal.seismicGelBlue);
        collarB.rotation.x = Math.PI / 2;
        collarB.position.z = -1.1;
        pin.add(shaft, collarA, collarB);
        g.add(pin);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-fan-silicone-grommets',
        114,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 29.8, -21.6),
        new THREE.Vector3(38.0, 34.0, -22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB115. 13.56 MHz HEPA/Carbon Cartridge Seating Interlock RFID Tag & Lifecycle Reader Coil
  // =========================================================================
  {
    const g = new THREE.Group();
    // Filter-side 13.56 MHz NFC/RFID polyimide inlay tag with etched copper spiral antenna
    const tagBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.4, 0.25), pal.kaptonAmberFilm);
    tagBase.position.set(-1.1, 0, 0);
    for (let r = 0; r < 3; r++) {
      const loopShape = createFrameShape(2.5 - r * 0.45, 3.6 - r * 0.5, 0.2, 2.25 - r * 0.45, 3.35 - r * 0.5, 0.15);
      const loop = new THREE.Mesh(extrudeCentered(loopShape, 0.12, 0.01, 0.01, 6), mats.copperCoil);
      loop.position.set(-1.1, 0, 0.16);
      loop.userData.noEdges = true;
      g.add(loop);
    }
    // Chassis-side RFID reader PCB + mechanical spring-loaded cartridge-presence interlock microswitch
    const readerPcb = new THREE.Mesh(new THREE.BoxGeometry(3.8, 5.2, 0.55), pal.pcbEmeraldDark);
    readerPcb.position.set(1.2, 0, -0.6);
    const readerIc = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.45), mats.icEpoxy);
    readerIc.position.set(1.2, 0.6, -0.15);
    const interlockPlunger = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.5, 12), pal.rubyThermalFuse);
    interlockPlunger.rotation.z = Math.PI / 2;
    interlockPlunger.position.set(0.1, -1.6, -0.35);
    g.add(tagBase, readerPcb, readerIc, interlockPlunger);

    parts.push(
      finalizeDryboxPart(
        'db-filter-rfid-lifecycle-tag',
        115,
        '#d97706',
        g,
        new THREE.Vector3(11.8, 16.8, -21.0),
        new THREE.Vector3(42.0, 20.0, -24.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB116. Sensirion SFM4300 Thermal MEMS N₂ Mass-Flow Sensor + 0.01 μm Borosilicate Coalescing Filter
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical 0.01 μm borosilicate microfiber coalescing oil-mist filter bowl (guarantees optical-grade N2!)
    const head = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 1.8, 20), mats.stainlessMachined);
    head.position.set(0, 3.2, 0);
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.75, 5.2, 20), pal.loweGlassClear);
    bowl.position.set(0, -0.2, 0);
    const coalescerElem = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 4.2, 18), pal.hepaWhitePleat);
    coalescerElem.position.set(0, -0.2, 0);
    const drainValve = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.35, 1.1, 12), pal.brassPrecision);
    drainValve.position.set(0, -3.2, 0);
    // Downstream SFM4300 CMOSens digital mass-flow manifold block (0–20 slm)
    const flowBody = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.4, 4.6), pal.esdPowderShell);
    flowBody.position.set(0, 3.2, -3.2);
    const flowCap = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.85, 2.6), pal.blue450Glow);
    flowCap.position.set(0, 4.5, -3.2);
    const barbIn = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.4, 14), pal.brassPrecision);
    barbIn.rotation.x = Math.PI / 2;
    barbIn.position.set(0, 3.2, 2.4);
    const barbOut = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.4, 14), pal.brassPrecision);
    barbOut.rotation.x = Math.PI / 2;
    barbOut.position.set(0, 3.2, -6.0);
    g.add(head, bowl, coalescerElem, drainValve, flowBody, flowCap, barbIn, barbOut);

    parts.push(
      finalizeDryboxPart(
        'db-n2-mems-massflow-filter',
        116,
        '#38bdf8',
        g,
        new THREE.Vector3(24.5, 15.0, -6.5),
        new THREE.Vector3(50.0, 12.0, -16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB117. IEC 61643-11 Class III 3-Stage Lightning Surge Protector (10 kA GDT + Thermally Fused MOV + NTC)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heavy-copper FR-4 high-clearance surge suppressor daughterboard with arc-barrier air slots
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(8.8, 5.8, 0.65), pal.pcbEmeraldDark);
    // Stage 1: 3-electrode 10 kA Ceramic Gas Discharge Tube (GDT)
    const gdtCeramic = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 2.6, 18), pal.aluminaCeramic);
    gdtCeramic.rotation.z = Math.PI / 2;
    gdtCeramic.position.set(-2.5, 1.2, 1.25);
    for (const dx of [-1.25, 0, 1.25]) {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.22, 1.22, 0.35, 18), pal.brassPrecision);
      cap.rotation.z = Math.PI / 2;
      cap.position.set(-2.5 + dx, 1.2, 1.25);
      g.add(cap);
    }
    // Stage 2: Twin Blue Thermally-Fused ZnO Metal Oxide Varistor (TMOV) discs
    for (const dy of [-1.1, 1.1]) {
      const mov = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.65, 20), pal.blue450Glow);
      mov.rotation.z = Math.PI / 2;
      mov.position.set(0.65, dy, 1.35);
      g.add(mov);
    }
    // Stage 3: Black High-Energy NTC Inrush Current Limiter Disc + Fuse clip
    const ntc = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.55, 20), pal.ceramicFritBlack);
    ntc.rotation.z = Math.PI / 2;
    ntc.position.set(2.9, 1.0, 1.3);
    const fuse = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 3.2, 14), pal.rubyThermalFuse);
    fuse.rotation.z = Math.PI / 2;
    fuse.position.set(2.4, -1.5, 1.05);
    g.add(pcb, gdtCeramic, ntc, fuse);

    parts.push(
      finalizeDryboxPart(
        'db-lightning-gdt-mov-ntc',
        117,
        '#f59e0b',
        g,
        new THREE.Vector3(18.0, -32.0, -24.6),
        new THREE.Vector3(44.0, -22.0, -52.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB118. TI TPS3850 Independent Precision Voltage Supervisor & Hardware Window Watchdog Timer IC
  // =========================================================================
  {
    const g = new THREE.Group();
    // Isolated safety-supervisor sub-module plugged next to main Matter MCU (DB13)
    const pcb = makeHorizBoxPlate(6.8, 5.2, 0.55, 0.4, pal.pcbEmeraldDark, 0.04);
    // TPS3850 10-pin VSON precision window watchdog IC
    const wdtIc = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.55, 2.1), mats.icEpoxy);
    wdtIc.position.set(0, 0.5, 0);
    // Dedicated fail-safe hardware gate-kill MOSFET pair (pulls PTC/TEC enables LOW if MCU hangs!)
    const killFetA = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 1.0), pal.rubyThermalFuse);
    killFetA.position.set(-2.0, 0.46, 1.1);
    const killFetB = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 1.0), pal.rubyThermalFuse);
    killFetB.position.set(-2.0, 0.46, -1.1);
    // Precision C_WD timing film capacitor & heartbeat green LED
    const cap = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.8, 0.9), pal.kaptonAmberFilm);
    cap.position.set(2.1, 0.62, 0.8);
    const hbLed = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), pal.mofEmerald);
    hbLed.position.set(2.2, 0.5, -1.2);
    g.add(pcb, wdtIc, killFetA, killFetB, cap, hbLed);

    parts.push(
      finalizeDryboxPart(
        'db-hardware-watchdog-ic',
        118,
        '#e11d48',
        g,
        new THREE.Vector3(-8.0, 47.4, 15.0),
        new THREE.Vector3(-22.0, 40.0, 14.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB119. NXP EdgeLock SE050 Common Criteria EAL6+ / FIPS 140-2 Hardware Secure Element (HSM)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeHorizBoxPlate(6.4, 5.0, 0.55, 0.4, pal.pcbEmeraldDark, 0.04);
    // Tamper-shielded metallic Faraday vault cap covering EdgeLock SE050 silicon die
    const vaultCan = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.9, 3.0), mats.stainlessMachined);
    vaultCan.position.set(0, 0.68, 0);
    // Gold cryptographic key emblem plate & active tamper-mesh trace perimeter
    const keyPad = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.14, 1.5), mats.goldPlating);
    keyPad.position.set(0, 1.16, 0);
    const tamperFrame = createFrameShape(5.8, 4.4, 0.25, 5.3, 3.9, 0.2);
    const tamperMesh = new THREE.Mesh(extrudeCentered(tamperFrame, 0.12, 0.01, 0.01, 6), mats.goldPlating);
    tamperMesh.rotation.x = Math.PI / 2;
    tamperMesh.position.set(0, 0.34, 0);
    g.add(pcb, vaultCan, keyPad, tamperMesh);

    parts.push(
      finalizeDryboxPart(
        'db-secure-element-hsm',
        119,
        '#7c3aed',
        g,
        new THREE.Vector3(8.0, 47.4, 15.0),
        new THREE.Vector3(22.0, 40.0, 14.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB120. LiFePO₄ Sub-Zero Self-Heating Polyimide Kapton Thin-Film Heater Pad (Anti-Plating)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Amber Kapton polyimide flexible foil wrap hugging DB42 LiFePO4 UPS battery pack
    const foil = new THREE.Mesh(new THREE.BoxGeometry(11.6, 7.6, 0.28), pal.kaptonAmberFilm);
    // Serpentine etched Inconel / Cu-Ni resistive heating traces across the polyimide sheet
    for (let i = -3; i <= 3; i++) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.26, 0.34), mats.copperCoil);
      trace.position.set(0, i * 0.95, 0.04);
      trace.userData.noEdges = true;
      g.add(trace);
    }
    // Direct-bonded +5°C / +45°C thermal control NTC sensor & 60°C bimetal safety snap disc
    const ntcBead = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), pal.rubyThermalFuse);
    ntcBead.position.set(4.5, 2.6, 0.32);
    const snapDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.5, 16), mats.stainlessMachined);
    snapDisc.rotation.x = Math.PI / 2;
    snapDisc.position.set(-4.2, -2.2, 0.32);
    g.add(foil, ntcBead, snapDisc);

    parts.push(
      finalizeDryboxPart(
        'db-ups-lfp-lowtemp-heater',
        120,
        '#d97706',
        g,
        new THREE.Vector3(10.5, -36.5, -24.8),
        new THREE.Vector3(36.0, -32.0, -40.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB121. Zero-Crossing Opto-Triac Solid State Relay (MOC3063 Silent PTC Heater Switch)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded UL94 V-0 black SSR body mounted onto skived aluminum heat-spreader backplate
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(5.6, 7.2, 0.55), mats.stainlessMachined);
    const ssrBody = new THREE.Mesh(new THREE.BoxGeometry(4.8, 6.2, 2.2), pal.esdPowderShell);
    ssrBody.position.z = 1.25;
    // Translucent zero-crossing opto-coupler dome + red firing status LED
    const optoWindow = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.4, 0.3), pal.einkPaper);
    optoWindow.position.set(0, 1.4, 2.36);
    const fireLed = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), pal.fireRedAccent);
    fireLed.position.set(1.5, 1.4, 2.42);
    // 4 High-current screw terminals (DC Control 3-32V bottom, AC Load 100-240V top)
    for (const tx of [-1.2, 1.2]) {
      for (const ty of [-2.2, 2.4]) {
        const term = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.75, 12), pal.brassPrecision);
        term.rotation.x = Math.PI / 2;
        term.position.set(tx, ty, 2.4);
        g.add(term);
      }
    }
    g.add(basePlate, ssrBody, optoWindow, fireLed);

    parts.push(
      finalizeDryboxPart(
        'db-zerocross-ssr-heater',
        121,
        '#1e293b',
        g,
        new THREE.Vector3(14.5, -8.5, -25.8),
        new THREE.Vector3(36.0, -8.0, -60.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB122. IPC-CC-830C / IPC-A-610 Class 3 Vapor-Deposited Parylene-C Conformal PCB Coating
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-thin 25μm violet-iridescent pinhole-free CVD Parylene-C barrier shell encapsulating main & sensor PCBs
    const shellShape = createRoundedRectShape(26.4, 8.6, 0.8);
    const coatTop = new THREE.Mesh(extrudeCentered(shellShape, 1.45, 0.08, 0.08, 10), pal.paryleneVioletGlaze);
    coatTop.rotation.x = Math.PI / 2;
    g.add(coatTop);
    // UV-fluorescent inspection tracer strips along perimeter (glows violet under 365nm QA inspection lamp!)
    const traceFrame = createFrameShape(25.6, 7.8, 0.6, 24.4, 6.6, 0.4);
    const uvRim = new THREE.Mesh(extrudeCentered(traceFrame, 0.16, 0.02, 0.02, 8), pal.uvcVioletGlow);
    uvRim.rotation.x = Math.PI / 2;
    uvRim.position.y = 0.78;
    g.add(uvRim);

    parts.push(
      finalizeDryboxPart(
        'db-pcb-parylene-conformal',
        122,
        '#818cf8',
        g,
        new THREE.Vector3(0, 47.4, 15.4),
        new THREE.Vector3(0, 46.0, 26.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB123. Sealed Gold-Plated External Magnetic Pogo-Pin Diagnostic Port & IP67 Quick Coupler
  // =========================================================================
  {
    const g = new THREE.Group();
    // External sealed magnetic 6-pin gold pogo diagnostic flange (USB-UART/SWD without opening cabinet!)
    const flange = new THREE.Mesh(new THREE.BoxGeometry(5.8, 3.6, 1.6), pal.esdPowderShell);
    for (let i = -2; i <= 2; i++) {
      const pogo = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.2, 10), mats.goldPlating);
      pogo.rotation.x = Math.PI / 2;
      pogo.position.set(i * 0.88, 0, -0.75);
      g.add(pogo);
    }
    // Twin alignment neodymium magnets flanking pogo pins
    for (const mx of [-2.4, 2.4]) {
      const mag = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.7, 14), mats.stainlessMachined);
      mag.rotation.x = Math.PI / 2;
      mag.position.set(mx, 0, -0.65);
      g.add(mag);
    }
    // Keyed IP67 multi-pin single-plug quick-release dehumidifier engine coupler directly underneath
    const coupler = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 3.6, 18), pal.pa66ThermalBreak);
    coupler.rotation.x = Math.PI / 2;
    coupler.position.set(0, -4.4, 0);
    const lockCollar = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.36, 10, 22), pal.pfasFreeHydroBlue);
    lockCollar.position.set(0, -4.4, -0.6);
    g.add(flange, coupler, lockCollar);

    parts.push(
      finalizeDryboxPart(
        'db-service-pogo-quick-coupler',
        123,
        '#eab308',
        g,
        new THREE.Vector3(-17.5, -14.0, -25.2),
        new THREE.Vector3(-42.0, -14.0, -44.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB124. Opto-Isolated SPDT Form-C Volt-Free Dry Contact Alarm Relay Terminal (NO / COM / NC)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Pluggable green Phoenix-style 3-pin screw terminal block (NO / COM / NC) + sealed relay PCB
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(6.6, 4.4, 0.55), pal.pcbEmeraldDark);
    const relayCube = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 2.2), pal.einkPaper);
    relayCube.position.set(-1.6, 0, 1.3);
    const termBlock = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.4, 1.8), pal.mofEmerald);
    termBlock.position.set(1.5, 0, 1.15);
    // 3 Brass screw clamps for NO, COM, NC building-management (BMS) alarm lines
    for (let i = -1; i <= 1; i++) {
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.6, 12), pal.brassPrecision);
      screw.rotation.x = Math.PI / 2;
      screw.position.set(1.5, i * 1.05, 2.15);
      g.add(screw);
    }
    g.add(pcb, relayCube, termBlock);

    parts.push(
      finalizeDryboxPart(
        'db-dry-contact-alarm-relay',
        124,
        '#10b981',
        g,
        new THREE.Vector3(17.5, -22.5, -25.2),
        new THREE.Vector3(42.0, -18.0, -38.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB125. Non-Drill Neodymium Rubber-Coated Magnetic Side Steel Accessory Caddy
  // =========================================================================
  {
    const g = new THREE.Group();
    // Powder-coated steel side organizer pocket clinging magnetically to right SPCC cabinet wall (zero drill holes!)
    const backPlate = new THREE.Mesh(new THREE.BoxGeometry(0.55, 16.4, 11.4), pal.esdPowderShell);
    const trayFloor = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.65, 11.4), pal.esdPowderShell);
    trayFloor.position.set(2.8, -7.8, 0);
    const frontLip = new THREE.Mesh(new THREE.BoxGeometry(0.55, 5.4, 11.4), pal.esdPowderShell);
    frontLip.position.set(5.4, -5.2, 0);
    for (const sz of [-5.5, 5.5]) {
      const side = new THREE.Mesh(new THREE.BoxGeometry(5.4, 5.4, 0.45), pal.esdPowderShell);
      side.position.set(2.8, -5.2, sz);
      g.add(side);
    }
    // 4 Rubber-encased N52 Neodymium mounting discs (never scratches ESD powder coat!)
    for (const my of [-5.2, 5.2]) {
      for (const mz of [-3.4, 3.4]) {
        const mag = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.52, 18), pal.glazingEpdmMatte);
        mag.rotation.z = Math.PI / 2;
        mag.position.set(-0.42, my, mz);
        g.add(mag);
      }
    }
    // Stylized rocket air blower bulb + sensor cleaning swab tube resting inside caddy
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(2.1, 14, 12), pal.fireRedAccent);
    bulb.scale.set(0.85, 1.25, 0.85);
    bulb.position.set(2.8, -4.6, -2.2);
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.45, 4.2, 10), pal.ceramicFritBlack);
    nozzle.position.set(2.8, -0.4, -2.2);
    const swabBox = new THREE.Mesh(new THREE.BoxGeometry(2.0, 8.8, 3.6), pal.hepaWhitePleat);
    swabBox.position.set(2.8, -3.2, 2.4);
    g.add(backPlate, trayFloor, frontLip, bulb, nozzle, swabBox);

    parts.push(
      finalizeDryboxPart(
        'db-magnetic-side-caddy',
        125,
        '#334155',
        g,
        new THREE.Vector3(28.6, 0.0, 6.0),
        new THREE.Vector3(52.0, -6.0, 14.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB126. Rear Recessed Power-Cord Winder Cleats & N₂ Tubing Strain-Relief Tray
  // =========================================================================
  {
    const g = new THREE.Group();
    // Two opposing PA66 nylon cord-winding hooks spaced inside the 50mm rear wall-bumper clearance zone (DB88)
    const backBar = new THREE.Mesh(new THREE.BoxGeometry(12.2, 2.4, 0.6), pal.pa66ThermalBreak);
    g.add(backBar);
    for (const sx of [-4.6, 4.6]) {
      const stem = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.2, 2.8), pal.pa66ThermalBreak);
      stem.position.set(sx, 0, -1.6);
      const flange = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.4, 0.55), pal.pa66ThermalBreak);
      flange.position.set(sx + Math.sign(sx) * 0.65, 0, -2.9);
      g.add(stem, flange);
    }
    // Neatly wound AC power cord loop + blue 6mm PU N2 tubing strain-relief clip
    const cordLoop = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.36, 10, 26), pal.glazingEpdmMatte);
    cordLoop.scale.set(1.55, 0.45, 1.0);
    cordLoop.position.set(0, 0, -1.9);
    const n2Clip = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.22, 8, 16), pal.pfasFreeHydroBlue);
    n2Clip.rotation.y = Math.PI / 2;
    n2Clip.position.set(0, -1.8, -1.3);
    g.add(cordLoop, n2Clip);

    parts.push(
      finalizeDryboxPart(
        'db-rear-cord-winder-cleat',
        126,
        '#475569',
        g,
        new THREE.Vector3(-14.5, -28.0, -27.2),
        new THREE.Vector3(-38.0, -30.0, -60.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB127. Matte-Black Flocked Optical Inspection Backdrop & Removable 18% Neutral Gray Card
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-low-reflectance (<0.5% specular) flocked black optical backdrop mounted on upper-zone back wall
    const flockPanel = new THREE.Mesh(new THREE.BoxGeometry(24.0, 11.4, 0.38), pal.flockedMatteBlack);
    // Anodized perimeter retainer frame
    const rimShape = createFrameShape(24.8, 12.2, 0.5, 23.6, 11.0, 0.3);
    const rim = new THREE.Mesh(extrudeCentered(rimShape, 0.55, 0.04, 0.04, 8), mats.stainlessMachined);
    // Slide-out matte 18% neutral gray / white-balance reference calibration card (magnetic snap pocket)
    const grayCard = new THREE.Mesh(new THREE.BoxGeometry(7.2, 8.8, 0.26), pal.grayCard18Pct);
    grayCard.position.set(6.8, 0, 0.38);
    // White & Black exposure check patches at top of card
    const whitePatch = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.6, 0.28), pal.einkPaper);
    whitePatch.position.set(5.2, 3.1, 0.4);
    const blackPatch = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.6, 0.28), pal.flockedMatteBlack);
    blackPatch.position.set(8.4, 3.1, 0.4);
    g.add(flockPanel, rim, grayCard, whitePatch, blackPatch);

    parts.push(
      finalizeDryboxPart(
        'db-18pct-gray-check-liner',
        127,
        '#777777',
        g,
        new THREE.Vector3(0, 31.5, -16.8),
        new THREE.Vector3(0, 28.0, 34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB128. Brushed SUS304 Lower Front Toe-Kick Plate & Shore A 65 EPDM Robot-Vacuum Bumper
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-width brushed stainless steel lower plinth toe-kick armor
    const plate = new THREE.Mesh(new THREE.BoxGeometry(52.4, 3.2, 0.65), mats.stainlessMachined);
    // Wrap-around extruded Shore A 65 EPDM rubber robot-vacuum / tripod-foot impact bumper strip
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(53.2, 1.25, 0.95), pal.glazingEpdmMatte);
    bumper.position.set(0, -0.55, 0.42);
    // Corner chamfer guards protecting paint against studio rolling stands
    for (const sx of [-26.3, 26.3]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.3, 1.6), pal.glazingEpdmMatte);
      cap.position.set(sx, 0, -0.2);
      g.add(cap);
    }
    g.add(plate, bumper);

    parts.push(
      finalizeDryboxPart(
        'db-front-kickplate-guard',
        128,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -50.6, 24.4),
        new THREE.Vector3(0, -30.0, 36.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB129. Modular Multi-Cabinet SUS304 Ganging Anti-Tip Brackets & Equipotential Earth Link
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper & lower heavy-gauge SUS304 side-by-side / wall-stud anti-tip tie plates
    for (const dy of [0, -74.0]) {
      const bg = new THREE.Group();
      bg.position.set(0, dy, 0);
      const plate = new THREE.Mesh(new THREE.BoxGeometry(1.1, 4.4, 9.6), mats.stainlessMachined);
      const wing = new THREE.Mesh(new THREE.BoxGeometry(4.6, 4.4, 1.1), mats.stainlessMachined);
      wing.position.set(-2.3, 0, -4.3);
      for (const dz of [-2.4, 2.4]) {
        const b = makeCabinetBolt(0.44, 1.4, pal.hardenedSteelHrc60);
        b.rotation.y = Math.PI / 2;
        b.position.set(-0.55, 0, dz);
        bg.add(b);
      }
      bg.add(plate, wing);
      g.add(bg);
    }
    // Common copper equipotential bonding bar uniting ground potential across adjacent studio dry cabinets
    const eqLink = new THREE.Mesh(new THREE.BoxGeometry(0.65, 6.4, 1.4), mats.copperCoil);
    eqLink.position.set(-1.1, -66.0, -3.2);
    const eqSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.85, 2.4, 1.6), pal.mofEmerald);
    eqSleeve.position.set(-1.1, -66.0, -3.2);
    g.add(eqLink, eqSleeve);

    parts.push(
      finalizeDryboxPart(
        'db-modular-gang-brackets',
        129,
        '#cbd5e1',
        g,
        new THREE.Vector3(-27.8, 38.0, -12.0),
        new THREE.Vector3(-50.0, 32.0, -14.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB130. EU ESPR 2026 & ISO 11469 Laser Material-ID Stamping Plate + DfD Recycling Index
  // =========================================================================
  {
    const g = new THREE.Group();
    // Laser-etched matte anodized aluminum Digital Product Passport (DPP) & ISO 11469 Material-ID spec plate
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.42, 9.8, 7.6), mats.stainlessMachined);
    // High-contrast dark laser-engraved QR / DPP matrix + polymer recycling symbol blocks (>PA66-GF30<, >EPDM<)
    const qrField = new THREE.Mesh(new THREE.BoxGeometry(0.48, 3.8, 3.8), pal.ceramicFritBlack);
    qrField.position.set(0.06, 2.1, -1.2);
    const greenEcoBar = new THREE.Mesh(new THREE.BoxGeometry(0.48, 1.2, 6.4), pal.mofEmerald);
    greenEcoBar.position.set(0.06, -3.4, 0);
    // Single-standard Torx T20 Design-for-Disassembly (DfD) fastener emblem pin
    const torxPin = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.55, 6), pal.brassPrecision);
    torxPin.rotation.z = Math.PI / 2;
    torxPin.position.set(0.18, 2.1, 2.1);
    // Embossed recycling index text bars
    for (let i = 0; i < 3; i++) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.45, 5.8), pal.esdPowderShell);
      line.position.set(0.06, -0.4 - i * 0.9, 0);
      line.userData.noEdges = true;
      g.add(line);
    }
    g.add(plate, qrField, greenEcoBar, torxPin);

    parts.push(
      finalizeDryboxPart(
        'db-dfd-iso11469-eco-id',
        130,
        '#10b981',
        g,
        new THREE.Vector3(27.25, -40.5, -14.0),
        new THREE.Vector3(46.0, -36.0, -16.0),
        cp
      )
    );
  }

  return parts;
}
