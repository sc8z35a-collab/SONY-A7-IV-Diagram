//@FLOW_MAP|file=src/assemblies/drybox/dryboxFrontier2026Parts.ts|unit=drybox|lines=688|exports=buildDryboxFrontier2026Parts
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
 * Build Phase 38B (DB131–DB150 — 20 Ultra-Cutting-Edge 2025–2026 Frontier Technologies):
 * - SPD SmartGlass Sun-Shield, Axial Compression Pull-Latch, BLE 6.0 Channel Sounding,
 *   60 GHz MIMO mmWave Presence Radar, 365/405nm Fungal Autofluorescence Inspection LED (DB131–DB135)
 * - Fumed-Silica VIP Vacuum Insulation (λ=0.004), Sub-100nm Graphene Oxide Nanoslit Membrane,
 *   MOF-303 Hydrogel 30-Day Blackout Buffer, Filtered Far-UVC 222nm KrCl Emitter,
 *   Visible-Light g-C3N4 Photocatalytic Anti-Mold Coating (DB136–DB140)
 * - Solid-State PiezoMEMS Ultrasonic Air-Jet Curtain, Dynamic Vitrimer Self-Healing Seal Lip,
 *   Sensirion SEN66 Laser PM/Spore Counter, NASA 5 MHz AT-Cut QCM Outgas Monitor,
 *   40 kHz Ultrasonic Leak & Predictive Bearing MEMS Mic (DB141–DB145)
 * - Bosch BMP585 + Optical Luminescence O2 Anoxic Sensor, UHF RAIN RFID Gen2X Smart-Shelf Inventory,
 *   Melexis MLX90640 32×24 IR Thermal Battery Camera + 50% SoC Balancer,
 *   Autonomous Microcapsule Potassium-Aerosol Fire Sheet, CES 2026 Indoor OPV + TDK CeraCharge (DB146–DB150)
 */
export function buildDryboxFrontier2026Parts(ctx: DryboxPartBuilderCtx): CadPart[] {
  const { mats, pal, cp } = ctx;
  const parts: CadPart[] = [];

  // =========================================================================
  // DB131. 2026 Museum-Grade 90 μm SPD-SmartGlass Electro-Optical Sun-Shield Interlayer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Thin 90um Suspended Particle Device (SPD) smart-tint electro-optical film pane
    const spdShape = createRoundedRectShape(42.4, 83.8, 0.75);
    const spdPane = new THREE.Mesh(extrudeCentered(spdShape, 0.14, 0.01, 0.01, 10), pal.spdTintViolet);
    g.add(spdPane);
    // Copper perimeter busbars applying AC alignment voltage across ITO/SPD PET laminate
    for (const sx of [-21.1, 21.1]) {
      const bus = new THREE.Mesh(new THREE.BoxGeometry(0.45, 82.0, 0.22), mats.copperCoil);
      bus.position.set(sx, 0, 0);
      g.add(bus);
    }
    // Top incident-sunlight UV/Lux trigger photodiode sensor pod + flexible drive tail
    const luxPod = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.4, 0.65), pal.ceramicFritBlack);
    luxPod.position.set(0, 42.1, 0.1);
    const luxLens = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.72, 14), pal.loweGlassClear);
    luxLens.rotation.x = Math.PI / 2;
    luxLens.position.set(0, 42.1, 0.18);
    g.add(luxPod, luxLens);

    parts.push(
      finalizeDryboxPart(
        'db-spd-smart-sunshield-glass',
        131,
        '#312e81',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 25.18),
        new THREE.Vector3(4.0, -4.0, 77.5),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB132. Southco E3 Vise-Action Axial Pull-Down Compression Latch (+6 mm Gasket Preload)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Flush die-cast stainless recessed lever bezel on lower-right door stile
    const housing = new THREE.Mesh(new THREE.BoxGeometry(3.2, 8.8, 1.5), mats.stainlessMachined);
    // Flush wing-knob actuator with red open/closed status dot
    const lever = new THREE.Mesh(new THREE.BoxGeometry(1.4, 5.4, 0.85), pal.esdPowderShell);
    lever.position.set(0, 0, 0.95);
    const statusDot = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), pal.mofEmerald);
    statusDot.position.set(0, 3.2, 0.88);
    // Rear helical vise-action cam shaft & adjustable pull-down pawl (+6 mm axial compression!)
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 3.8, 14), pal.hardenedSteelHrc60);
    shaft.rotation.x = Math.PI / 2;
    shaft.position.set(0, 0, -2.0);
    const pawl = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.3, 0.65), pal.hardenedSteelHrc60);
    pawl.position.set(-1.6, 0, -3.4);
    const gripNut = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.6, 6), pal.brassPrecision);
    gripNut.rotation.x = Math.PI / 2;
    gripNut.position.set(0, 0, -2.6);
    g.add(housing, lever, statusDot, shaft, pawl, gripNut);

    parts.push(
      finalizeDryboxPart(
        'db-compression-pull-latch',
        132,
        '#64748b',
        g,
        new THREE.Vector3(25.2, -23.5, 24.8),
        new THREE.Vector3(34.0, -18.0, 52.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB133. Bluetooth 6.0 / 6.3 Channel Sounding (PBR + RTT) Hands-Free Proximity Unlock Transceiver
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual-antenna diversity PCB for Bluetooth Core 6.0/6.3 Phase-Based Ranging (±20 cm)
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(6.4, 3.2, 0.55), pal.pcbEmeraldDark);
    const soc = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 0.48), mats.icEpoxy);
    soc.position.set(0, 0, 0.46);
    // Dual orthogonal 2.4GHz ceramic chip antennas (eliminates multipath fading!)
    const antA = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.55, 0.52), pal.aluminaCeramic);
    antA.position.set(-2.1, 0.9, 0.48);
    const antB = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.4, 0.52), pal.aluminaCeramic);
    antB.position.set(2.2, 0.2, 0.48);
    // Blue BLE 6.0 ranging status lens
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), pal.blue450Glow);
    led.position.set(-2.2, -0.9, 0.5);
    g.add(pcb, soc, antA, antB, led);

    parts.push(
      finalizeDryboxPart(
        'db-ble6-channel-sounding-ant',
        133,
        '#0284c7',
        g,
        new THREE.Vector3(21.5, 47.4, 23.4),
        new THREE.Vector3(34.0, 34.0, 46.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB134. 2026 60 GHz MIMO AiP mmWave Approach & Presence Radar (Infineon BGT60TR13C Class)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Compact 60 GHz Antenna-in-Package (AiP) millimeter-wave radar module behind front upper bezel
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.0, 0.55), pal.esdPowderShell);
    // 1Tx + 3Rx L-shaped 60 GHz microstrip patch antenna-in-package silicon die
    const aip = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 0.62), mats.icEpoxy);
    aip.position.set(-1.1, 0, 0.52);
    // 4 Tiny gold 60GHz MIMO patch radiating elements on package face
    const patches: Array<[number, number]> = [
      [-1.7, 0.5],
      [-0.5, 0.5],
      [-0.5, -0.5],
      [-1.7, -0.5],
    ];
    for (const [px, py] of patches) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.42, 0.14), mats.goldPlating);
      p.position.set(px, py, 0.86);
      p.userData.noEdges = true;
      g.add(p);
    }
    // Edge AI DSP micro-chip (<10 ms local inference, zero cloud camera privacy!)
    const dsp = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 0.45), mats.icEpoxy);
    dsp.position.set(1.9, 0, 0.46);
    g.add(pcb, aip, dsp);

    parts.push(
      finalizeDryboxPart(
        'db-60ghz-mmwave-presence-radar',
        134,
        '#6366f1',
        g,
        new THREE.Vector3(-18.5, 47.4, 23.4),
        new THREE.Vector3(-30.0, 36.0, 48.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB135. Dual-Wavelength 365 nm / 405 nm Fungal-Hyphae Autofluorescence Inspection LED Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // Slim anodized heat-dissipating inspection bar aimed directly at DB127 black flocked stage
    const bar = new THREE.Mesh(new THREE.BoxGeometry(20.4, 1.4, 2.2), mats.stainlessMachined);
    // Alternating 365 nm UV-A (Aspergillus spore fluorescence) & 405 nm Violet (flavin/chitin hyphae!) LEDs
    for (let i = -3; i <= 3; i++) {
      const is405 = Math.abs(i) % 2 === 1;
      const emitter = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.48, 0.45, 14),
        is405 ? pal.uvcVioletGlow : pal.blue450Glow
      );
      emitter.position.set(i * 2.5, -0.78, 0);
      g.add(emitter);
    }
    // Optical bandpass Wood's glass lens filter cutting stray visible glare
    const woodsLens = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.24, 1.4), pal.spdTintViolet);
    woodsLens.position.set(0, -0.96, 0);
    g.add(bar, woodsLens);

    parts.push(
      finalizeDryboxPart(
        'db-365-405nm-fungus-inspect-led',
        135,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 41.2, 6.0),
        new THREE.Vector3(0, 38.0, 36.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB136. Fumed-Silica Core Vacuum Insulation Panel (VIP, ≤10 Pa, λ = 0.004 W/m·K)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 High-barrier metallized foil Vacuum Insulation Panels (Top Deck, Bottom Floor, Upper Rear Wall)
    const topVip = makeHorizBoxPlate(48.6, 42.6, 1.0, 0.8, pal.vipSilverFoil, 0.06);
    topVip.position.set(0, DB_DIM.HH - 2.1, -0.5);
    const botVip = makeHorizBoxPlate(48.6, 42.6, 1.0, 0.8, pal.vipSilverFoil, 0.06);
    botVip.position.set(0, -DB_DIM.HH + 2.1, -0.5);
    // Heat-sealed edge flanges & getter badge on top VIP
    const topSeam = createFrameShape(49.2, 43.2, 0.8, 47.6, 41.6, 0.6);
    const seamMesh = new THREE.Mesh(extrudeCentered(topSeam, 0.22, 0.02, 0.02, 8), pal.ferritic430Steel);
    seamMesh.rotation.x = Math.PI / 2;
    seamMesh.position.set(0, DB_DIM.HH - 2.1, -0.5);
    const rearUpperVip = new THREE.Mesh(new THREE.BoxGeometry(47.4, 24.0, 0.95), pal.vipSilverFoil);
    rearUpperVip.position.set(0, 34.5, -DB_DIM.HD + 2.1);
    g.add(topVip, botVip, seamMesh, rearUpperVip);

    parts.push(
      finalizeDryboxPart(
        'db-fumed-silica-vip-panel',
        136,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 46.0, -24.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB137. 2026 Sub-100 nm Graphene Oxide (GO) Nanoslit Water-Vapor Selective Permeation Membrane
  // =========================================================================
  {
    const g = new THREE.Group();
    // Machined 316L circular membrane housing on upper-left sidewall adjacent to breather
    const housing = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 1.6, 24), mats.stainlessMachined);
    housing.rotation.z = Math.PI / 2;
    // Iridescent stacked 2D Graphene Oxide (GO) nanoslit separation laminate (H2O/N2 selectivity > 10^4!)
    const goDisc = new THREE.Mesh(new THREE.CylinderGeometry(2.75, 2.75, 0.42, 24), pal.grapheneOxideIridescent);
    goDisc.rotation.z = Math.PI / 2;
    goDisc.position.x = -0.35;
    // Porous PES/PTFE support mesh backing & 6 clamping bolts
    const supportMesh = new THREE.Mesh(new THREE.CylinderGeometry(2.75, 2.75, 0.35, 24), pal.ptfeCleanWhite);
    supportMesh.rotation.z = Math.PI / 2;
    supportMesh.position.x = 0.25;
    for (let k = 0; k < 6; k++) {
      const a = (k * Math.PI * 2) / 6;
      const b = makeCabinetBolt(0.28, 1.8, pal.brassPrecision);
      b.rotation.y = Math.PI / 2;
      b.position.set(0, Math.sin(a) * 3.05, Math.cos(a) * 3.05);
      g.add(b);
    }
    g.add(housing, goDisc, supportMesh);

    parts.push(
      finalizeDryboxPart(
        'db-graphene-oxide-vapor-membrane',
        137,
        '#1e293b',
        g,
        new THREE.Vector3(-27.8, 12.0, -12.0),
        new THREE.Vector3(-52.0, 14.0, -22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB138. 2026 Hierarchically Porous MOF-303 / Polymer Hygroscopic Hydrogel Blackout Buffer Cassette
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-slim aluminum louver cassette clipped beneath the dual-zone divider deck (DB18)
    const tray = makeHorizBoxPlate(34.0, 18.0, 1.4, 1.0, mats.stainlessMachined, 0.08);
    // Soft monolithic emerald-cyan MOF-303 / PVA-LiCl hygroscopic hydrogel pad (3.5–4.1 g/g capacity!)
    const gelCore = makeHorizBoxPlate(31.4, 15.6, 1.15, 0.8, pal.mofEmerald, 0.06);
    gelCore.position.y = -0.18;
    // Breathable hydrophobic ePTFE vapor-only top safety veil (blocks any liquid contact!)
    const veil = makeHorizBoxPlate(31.8, 16.0, 0.22, 0.8, pal.ptfeCleanWhite, 0.02);
    veil.position.y = -0.82;
    g.add(tray, gelCore, veil);

    parts.push(
      finalizeDryboxPart(
        'db-mof-hydrogel-blackout-buffer',
        138,
        '#10b981',
        g,
        new THREE.Vector3(0, DB_DIM.DIVIDER_Y - 1.5, 1.5),
        new THREE.Vector3(20.0, -10.0, 46.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB139. Filtered Far-UVC 222 nm KrCl Excimer Micro-Emitter + Optical Bandpass Filter
  // =========================================================================
  {
    const g = new THREE.Group();
    // Recessed door-lintel sterilizing curtain bar firing eye/skin-safe 222 nm Far-UVC across opening!
    const body = new THREE.Mesh(new THREE.BoxGeometry(28.0, 2.2, 2.8), pal.esdPowderShell);
    // Planar KrCl Excimer micro-discharge quartz tube + multilayer dielectric 222 nm bandpass filter glass
    const quartzBar = new THREE.Mesh(new THREE.BoxGeometry(22.0, 0.85, 1.6), pal.farUvcQuartzBlue);
    quartzBar.position.set(0, -1.02, 0);
    // Compact high-frequency resonant inverter driver end-caps
    for (const sx of [-12.6, 12.6]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 2.4), mats.stainlessMachined);
      cap.position.set(sx, 0, 0);
      g.add(cap);
    }
    g.add(body, quartzBar);

    parts.push(
      finalizeDryboxPart(
        'db-far-uvc-222nm-krcl-emitter',
        139,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 43.0, 21.5),
        new THREE.Vector3(0, 44.0, 48.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB140. 2026 Metal-Free Visible-Light-Driven g-C₃N₄ Photocatalytic Anti-Mold Nano-Coating
  // =========================================================================
  {
    const g = new THREE.Group();
    // Thin translucent pale-gold graphitic carbon nitride (g-C3N4) functional coating plates under all 3 trays
    const ys = [DB_DIM.SHELF_TOP_Y - 0.85, DB_DIM.SHELF_MID_Y - 0.85, DB_DIM.SHELF_LOW_Y - 0.85];
    for (const sy of ys) {
      const coat = makeHorizBoxPlate(44.2, 34.4, 0.24, 0.8, pal.kaptonAmberFilm, 0.02);
      coat.position.set(0, sy, 1.0);
      g.add(coat);
    }

    parts.push(
      finalizeDryboxPart(
        'db-vislight-gc3n4-antimold-coat',
        140,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-16.0, 12.0, 38.0),
        cp,
        0.14
      )
    );
  }

  // =========================================================================
  // DB141. 2026 Solid-State PiezoMEMS Ultrasonic Micro-Blower Air-Jet Curtain (xMEMS / AirJet 1,750 Pa)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-thin 2.65mm solid-state copper-clad piezoMEMS manifold bar blowing invisible dry air curtain on door open!
    const manifold = new THREE.Mesh(new THREE.BoxGeometry(32.0, 1.2, 4.4), mats.copperCoil);
    // 4 Individual Silicon PiezoMEMS ultrasonic jet modules (xMEMS XMC-2400 / Frore AirJet Mini G2 class)
    for (let i = 0; i < 4; i++) {
      const chip = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.85, 3.4), pal.ceramicFritBlack);
      chip.position.set(-10.8 + i * 7.2, -0.55, 0);
      const slit = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.22, 0.45), pal.farUvcQuartzBlue);
      slit.position.set(-10.8 + i * 7.2, -1.0, 1.1);
      g.add(chip, slit);
    }
    g.add(manifold);

    parts.push(
      finalizeDryboxPart(
        'db-piezo-mems-airjet-curtain',
        141,
        '#ea580c',
        g,
        new THREE.Vector3(0, 42.2, 18.0),
        new THREE.Vector3(14.0, 36.0, 50.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB142. 2025–2026 Dynamic Disulfide/H-Bond Self-Healing Vitrimer Elastomer Auxiliary Seal Lip
  // =========================================================================
  {
    const g = new THREE.Group();
    // Continuous perimeter self-healing dynamic polyurethane vitrimer compression seal hugging door throat
    const lipShape = createFrameShape(47.2, 90.4, 1.2, 45.2, 88.4, 1.0);
    const lip = new THREE.Mesh(extrudeCentered(lipShape, 0.72, 0.14, 0.14, 10), pal.copperIonTeal);
    g.add(lip);
    // 4 Corner molded dynamic-bond vulcanization gusset bridges
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        const gus = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 0.82), pal.mofEmerald);
        gus.position.set(sx * 22.8, sy * 44.2, 0);
        g.add(gus);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-vitrimer-selfheal-seal-lip',
        142,
        '#0d9488',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 23.2),
        new THREE.Vector3(-12.0, -4.0, 38.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // DB143. 2026 Sensirion SEN66 (SPS6x MEMS) Laser Particulate Matter (0.3–10 μm) & Spore Counter
  // =========================================================================
  {
    const g = new THREE.Group();
    // Compact Sensirion SEN66 optical sheath-flow laser particle sensor node
    const box = new THREE.Mesh(new THREE.BoxGeometry(5.8, 5.2, 2.4), pal.esdPowderShell);
    // Mini intake / exhaust sheath-flow laser scattering ports
    const inlet = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.6, 16), mats.stainlessMachined);
    inlet.rotation.x = Math.PI / 2;
    inlet.position.set(-1.3, 1.1, 1.25);
    const outlet = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.6, 16), mats.stainlessMachined);
    outlet.rotation.x = Math.PI / 2;
    outlet.position.set(1.3, -1.1, 1.25);
    // Laser diode diagnostic glow aperture
    const laserDot = new THREE.Mesh(new THREE.SphereGeometry(0.36, 10, 8), pal.rubyThermalFuse);
    laserDot.position.set(1.4, 1.2, 1.25);
    g.add(box, inlet, outlet, laserDot);

    parts.push(
      finalizeDryboxPart(
        'db-sen66-laser-pm-spore-counter',
        143,
        '#e11d48',
        g,
        new THREE.Vector3(-16.5, 16.0, -17.8),
        new THREE.Vector3(-44.0, 8.0, 14.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB144. NASA/ESA-Grade 5 MHz AT-Cut Quartz Crystal Microbalance (QCM) Outgas Contamination Monitor
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision stainless cylindrical TQCM sensor head facing optical chamber
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.8, 2.2, 22), mats.stainlessMachined);
    base.rotation.x = Math.PI / 2;
    // Exposed 14 mm AT-cut quartz crystal disc with PVD gold/platinum sensing electrode (measures ng/cm²!)
    const quartz = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.25, 22), pal.loweGlassClear);
    quartz.rotation.x = Math.PI / 2;
    quartz.position.z = 1.12;
    const ptElectrode = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.14, 22), mats.goldPlating);
    ptElectrode.rotation.x = Math.PI / 2;
    ptElectrode.position.z = 1.26;
    // Rear oscillator & localized bake-out self-cleaning heater PCB
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.6, 5.6, 0.65), pal.pcbEmeraldDark);
    pcb.position.z = -1.25;
    g.add(base, quartz, ptElectrode, pcb);

    parts.push(
      finalizeDryboxPart(
        'db-qcm-5mhz-outgas-monitor',
        144,
        '#eab308',
        g,
        new THREE.Vector3(16.5, 16.0, -17.8),
        new THREE.Vector3(44.0, 14.0, 14.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB145. 40 kHz Ultrasonic Air-Leak & Predictive Bearing Acoustic MEMS Microphone
  // =========================================================================
  {
    const g = new THREE.Group();
    // Acoustic-funnel anodized MEMS ultrasonic listening pod angled toward door perimeter gasket
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(4.6, 4.0, 0.55), pal.pcbEmeraldDark);
    const micCan = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 0.72), pal.brassPrecision);
    micCan.position.set(0, 0, 0.58);
    // Parabolic ultrasonic acoustic horn collector tuned to 40 kHz turbulent air-leak hiss!
    const horn = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 0.55, 1.6, 18, 1, true), mats.stainlessMachined);
    horn.rotation.x = Math.PI / 2;
    horn.position.set(0, 0, 1.55);
    g.add(pcb, micCan, horn);

    parts.push(
      finalizeDryboxPart(
        'db-ultrasonic-40khz-leak-mems',
        145,
        '#0ea5e9',
        g,
        new THREE.Vector3(22.5, 34.5, 19.5),
        new THREE.Vector3(42.0, 26.0, 38.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB146. Bosch BMP585 (<0.1 Pa RMS) Barometric + Optical Luminescence Quenching O₂ Anoxic Sensor
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(6.8, 4.6, 0.55), pal.pcbEmeraldDark);
    // Left half: Gel-filled Bosch BMP585 ultra-low-noise (<0.1 Pa) barometric pressure MEMS
    const bmpCap = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 0.85), mats.stainlessMachined);
    bmpCap.position.set(-1.6, 0, 0.65);
    // Right half: Optical luminescence O2 spot + excitation LED / photodiode (zero consumable chemical cell!)
    const o2Ring = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.72, 20), pal.esdPowderShell);
    o2Ring.rotation.x = Math.PI / 2;
    o2Ring.position.set(1.6, 0, 0.62);
    const o2Spot = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.2, 18), pal.fireMicrocapCrimson);
    o2Spot.rotation.x = Math.PI / 2;
    o2Spot.position.set(1.6, 0, 1.02);
    g.add(pcb, bmpCap, o2Ring, o2Spot);

    parts.push(
      finalizeDryboxPart(
        'db-bmp585-optical-o2-anoxic',
        146,
        '#0284c7',
        g,
        new THREE.Vector3(16.5, -18.5, -17.8),
        new THREE.Vector3(44.0, -16.0, 14.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB147. 2026 UHF RAIN RFID Gen2X Smart-Shelf Camera/Lens Inventory Antenna Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-slim circularly-polarized UHF (860–960 MHz) near-field patch antenna pads on all 3 shelves
    const ys = [DB_DIM.SHELF_TOP_Y + 0.55, DB_DIM.SHELF_MID_Y + 0.55, DB_DIM.SHELF_LOW_Y + 0.55];
    for (const sy of ys) {
      const sub = makeHorizBoxPlate(38.0, 18.0, 0.26, 0.8, pal.pcbEmeraldDark, 0.02);
      sub.position.set(0, sy, 2.0);
      const patchA = makeHorizBoxPlate(12.4, 12.4, 0.14, 0.4, mats.copperCoil, 0.01);
      patchA.position.set(-9.5, sy + 0.18, 2.0);
      const patchB = makeHorizBoxPlate(12.4, 12.4, 0.14, 0.4, mats.copperCoil, 0.01);
      patchB.position.set(9.5, sy + 0.18, 2.0);
      g.add(sub, patchA, patchB);
    }

    parts.push(
      finalizeDryboxPart(
        'db-rain-rfid-gen2x-asset-shelf',
        147,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(22.0, 14.0, 44.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB148. Melexis MLX90640 32×24 Far-IR Thermal Array Camera + 50% SoC (3.80 V) Storage Balancer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Overhead battery-bay thermal imaging & precision storage-voltage balancer board
    const pcb = makeHorizBoxPlate(12.4, 6.2, 0.55, 0.4, pal.pcbEmeraldDark, 0.04);
    // TO-39 metallic can Melexis MLX90640 32x24 Far-IR camera looking down at charging NP-FZ100 bays!
    const irCan = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.35, 1.15, 18), mats.stainlessMachined);
    irCan.position.set(-3.2, -0.78, 0);
    const geLens = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.25, 16), pal.ceramicFritBlack);
    geLens.position.set(-3.2, -1.38, 0);
    // Active 50% SoC (3.80 V/cell) bidirectional precision discharge/charge balancer inductor & heatsink
    const balSink = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.2, 3.6), mats.stainlessMachined);
    balSink.position.set(2.4, -0.65, 0);
    g.add(pcb, irCan, geLens, balSink);

    parts.push(
      finalizeDryboxPart(
        'db-mlx90640-ir-thermal-battery',
        148,
        '#f43f5e',
        g,
        new THREE.Vector3(12.0, DB_DIM.BATT_DRAWER_Y + 6.4, 2.0),
        new THREE.Vector3(22.0, -24.0, 44.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB149. 2025–2026 Thermally Activated Microcapsule Potassium-Aerosol Autonomous Fire Sheet
  // =========================================================================
  {
    const g = new THREE.Group();
    // Crimson microencapsulated potassium-salt extinguishing laminate bonded to ceiling of DB26 fireproof bay
    const sheet = makeHorizBoxPlate(36.0, 26.0, 0.52, 0.8, pal.fireMicrocapCrimson, 0.05);
    // Protective perforated aluminum flame-activation scrim face
    const scrim = makeHorizBoxPlate(34.6, 24.6, 0.16, 0.6, mats.stainlessMachined, 0.02);
    scrim.position.y = -0.32;
    // Center 120-200°C thermal rupture indicator patch
    const badge = makeHorizBoxPlate(9.6, 4.4, 0.22, 0.4, pal.kaptonAmberFilm, 0.02);
    badge.position.set(0, -0.38, 0);
    g.add(sheet, scrim, badge);

    parts.push(
      finalizeDryboxPart(
        'db-microcapsule-aerosol-firesheet',
        149,
        '#dc2626',
        g,
        new THREE.Vector3(0, DB_DIM.BATT_DRAWER_Y + 6.8, -1.5),
        new THREE.Vector3(0, -24.0, 52.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB150. CES 2026 Indoor Organic Photovoltaic (LAYER V2.0 OPV) Strip + TDK CeraCharge Solid-State Battery
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sleek iridescent dark-purple inkjet-printed indoor OPV light-harvesting ribbon across top bezel
    const opvStrip = new THREE.Mesh(new THREE.BoxGeometry(36.0, 2.2, 0.35), pal.opvIndoorAmber);
    // Fine screen-printed silver busbars separating 6 indoor LED-optimized OPV sub-cells
    for (let i = -2; i <= 2; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.0, 0.42), pal.vipSilverFoil);
      bar.position.set(i * 6.0, 0, 0.04);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    // Rear MPPT nano-power harvester PCB + TDK CeraCharge all-ceramic solid-state SMD micro-battery (EIA 1812)
    const harvPcb = new THREE.Mesh(new THREE.BoxGeometry(8.4, 2.0, 0.5), pal.pcbEmeraldDark);
    harvPcb.position.set(0, 0, -0.55);
    const ceraBatt = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.5, 0.85), pal.aluminaCeramic);
    ceraBatt.position.set(1.8, 0, -0.95);
    for (const sx of [-1.25, 1.25]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.54, 0.88), mats.stainlessMachined);
      cap.position.set(1.8 + sx, 0, -0.95);
      g.add(cap);
    }
    g.add(opvStrip, harvPcb, ceraBatt);

    parts.push(
      finalizeDryboxPart(
        'db-indoor-opv-ceracharge-harvest',
        150,
        '#7e22ce',
        g,
        new THREE.Vector3(0, 50.6, 24.4),
        new THREE.Vector3(0, 52.0, 38.0),
        cp
      )
    );
  }

  return parts;
}
