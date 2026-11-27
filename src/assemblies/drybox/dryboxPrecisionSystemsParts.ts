import * as THREE from 'three';
import { CadPart } from '../types';
import {
  createFrameShape,
  extrudeCentered,
} from '../../engine/CadHelpers';
import {
  DryboxPartBuilderCtx,
  finalizeDryboxPart,
  makeCabinetBolt,
} from './dryboxPartsShared';

/**
 * Build Precision Dehumidification, N2 Purge, UV-C Containment, Metrology & Industrial Telemetry
 * Expansion Part B (DB169–DB186 — 18 Parts):
 * - Sintered Copper Heat Pipes (TEC-to-Heatsink), Zero-RPM Rear Boost Fan,
 *   Overflow Condensate Sump + SST Optomax TIR Optical Level Switch,
 *   MOF Rotor PTFE Timing Belt & ZrO2 Ceramic Bearing Hub, Steatite 1000°C PTC Terminal Block,
 *   PEM Cathode Pt/Pd H2 Recombiner Screen (DB169–DB174)
 * - Matte-Black UV-C Chevron Optical Light-Trap Baffle, Washable SUS304 100-Mesh Pre-Filter,
 *   Dual-Stage N2 Pressure Regulator & Gauge, Borosilicate N2 Variable-Area Rotameter,
 *   Vertical SUS316L Multi-Orifice N2 Sparger Diffuser Bar (DB175–DB179)
 * - 6-Plate Radiation-Shielded External Ambient Dew-Point Pod, ISO 17025 Chilled-Mirror Swagelok Port,
 *   IEC 61340-5-1 Front-Side ESD Wrist-Strap Ground Station, Shrouded Double-Pole Mains Switch & HRC Fuse,
 *   TI INA228 20-Bit Shunt Power Monitor PCB, ADI LT3045 0.8 μVrms Sensor LDO + MnZn EMI Choke Board,
 *   Isolated RS-485 Modbus / PoE+ & 21 CFR Part 11 pSLC microSD Black-Box Telemetry (DB180–DB186)
 */
export function buildDryboxPrecisionSystemsParts(ctx: DryboxPartBuilderCtx): CadPart[] {
  const { mats, pal, cp } = ctx;
  const parts: CadPart[] = [];

  // =========================================================================
  // DB169. Sintered-Copper Wick Ø6 mm Two-Phase Heat Pipes & TEC Vapor-Spreader Saddle
  // =========================================================================
  {
    const g = new THREE.Group();
    // CNC C1100 copper saddle block clamped directly onto Bi2Te3 Peltier (DB38) hot side
    const saddle = new THREE.Mesh(new THREE.BoxGeometry(14.0, 9.5, 0.95), mats.copperHeatSpreader);
    saddle.position.set(0, -11.5, 0.2);
    g.add(saddle);

    // Dual U-shaped flat-pressed sintered-copper heat pipes distributing heat across DB40 height
    for (const sx of [-4.2, 4.2]) {
      const pipeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sx * 0.55, -13.5, 0.15),
        new THREE.Vector3(sx, -11.5, 0.0),
        new THREE.Vector3(sx * 1.45, -4.0, -0.15),
        new THREE.Vector3(sx * 1.6, 8.0, -0.15),
        new THREE.Vector3(sx * 1.1, 21.0, -0.1),
      ]);
      const pipe = new THREE.Mesh(
        new THREE.TubeGeometry(pipeCurve, 20, 0.42, 10, false),
        mats.copperCoil
      );
      g.add(pipe);
    }
    // 2 Upper aluminum thermal clamp bars locking heat pipes into rear skived heatsink base
    for (const cy of [4.0, 17.5]) {
      const clamp = new THREE.Mesh(new THREE.BoxGeometry(16.5, 1.35, 0.55), mats.stainlessMachined);
      clamp.position.set(0, cy, -0.25);
      clamp.userData.noEdges = true;
      g.add(clamp);
    }

    parts.push(
      finalizeDryboxPart(
        'db-tec-sintered-heatpipes',
        169,
        '#ea580c',
        g,
        new THREE.Vector3(0, -4.0, -27.8),
        new THREE.Vector3(16.0, -6.0, -68.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB170. Zero-RPM Semi-Passive 80 mm Rear Heatsink Boost Fan & Wire Finger-Guard Grille
  // =========================================================================
  {
    const g = new THREE.Group();
    // 80 mm PWM brushless maglev fan frame recessed onto lower DB40 heatsink fins
    const frame = new THREE.Mesh(
      extrudeCentered(createFrameShape(10.2, 10.2, 0.9, 8.8, 8.8, 4.3), 1.65, 0.08, 0.08, 12),
      mats.matteBlackAnodized
    );
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, 1.4, 16), pal.esdPowderShell);
    hub.rotation.x = Math.PI / 2;
    g.add(frame, hub);

    // 7 Swept low-turbulence acoustic impeller blades
    for (let i = 0; i < 7; i++) {
      const ang = (i / 7) * Math.PI * 2;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.95, 0.22), pal.pa66ThermalBreak);
      blade.position.set(Math.cos(ang) * 2.75, Math.sin(ang) * 2.75, 0);
      blade.rotation.z = ang + 0.35;
      blade.rotation.x = 0.42;
      blade.userData.noEdges = true;
      g.add(blade);
    }
    // Concentric chrome wire finger-guard rings on outer rear face
    for (const r of [2.1, 3.4, 4.5]) {
      const wire = new THREE.Mesh(new THREE.TorusGeometry(r, 0.1, 6, 22), mats.stainlessMachined);
      wire.position.z = -0.92;
      wire.userData.noEdges = true;
      g.add(wire);
    }

    parts.push(
      finalizeDryboxPart(
        'db-rear-heatsink-boost-fan',
        170,
        '#1e293b',
        g,
        new THREE.Vector3(0, -14.0, -31.8),
        new THREE.Vector3(0, -16.0, -82.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB171. Overflow Condensate Catch Sump Tray & SST Optomax Conical Optical Level Sensor
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stainless emergency condensate collection sump directly beneath DB72 evaporator
    const sumpWall = new THREE.Mesh(
      extrudeCentered(createFrameShape(16.2, 4.2, 0.5, 14.8, 2.8, 0.3), 2.4, 0.05, 0.05, 10),
      mats.stainlessMachined
    );
    sumpWall.rotation.x = Math.PI / 2;
    const sumpBase = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.45, 4.0), mats.stainlessMachined);
    sumpBase.position.y = -1.1;
    // Capillary guide funnel lip + rear quick-drain silicone service stopper
    const plug = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.45, 1.3, 12), pal.glazingEpdmMatte);
    plug.rotation.x = Math.PI / 2;
    plug.position.set(-5.8, -0.4, -2.2);
    // SST Sensing Optomax TIR optical liquid-level switch (conical polysulfone/glass IR prism tip)
    const sensorHex = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 1.8, 6), pal.pcbEmeraldDark);
    sensorHex.rotation.z = Math.PI / 2;
    sensorHex.position.set(8.6, 0.0, 0);
    const prismTip = new THREE.Mesh(new THREE.ConeGeometry(0.52, 1.05, 14), pal.loweGlassClear);
    prismTip.rotation.z = Math.PI / 2;
    prismTip.position.set(7.1, 0.0, 0);
    const statusLed = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), pal.blue450Glow);
    statusLed.position.set(9.6, 0.0, 0);
    g.add(sumpWall, sumpBase, plug, sensorHex, prismTip, statusLed);

    parts.push(
      finalizeDryboxPart(
        'db-condensate-sump-optomax',
        171,
        '#0284c7',
        g,
        new THREE.Vector3(0, -27.5, -26.8),
        new THREE.Vector3(0, -32.0, -66.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB172. MOF Rotor Fiberglass-PTFE Timing Belt, Auto-Tensioner & ZrO2 Ceramic Hub Bearing
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dry-lubricated ZrO2 full-ceramic central rotor hub bearing (zero outgassing at 120°C)
    const hubRing = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.48, 10, 22), pal.aluminaCeramic);
    hubRing.position.set(5.2, 0, 0);
    const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 2.2, 14), pal.hardenedSteelHrc60);
    axle.rotation.x = Math.PI / 2;
    axle.position.set(5.2, 0, 0);
    // Brass motor drive pinion at left (x = -6.3 local -> -11.5 world matching DB109 gear motor)
    const pinion = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 1.2, 16), pal.brassPrecision);
    pinion.rotation.x = Math.PI / 2;
    pinion.position.set(-6.3, 0, 0);
    // Spring-loaded brass auto-tensioner idler roller
    const idler = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.15, 14), pal.brassPrecision);
    idler.rotation.x = Math.PI / 2;
    idler.position.set(-1.6, 2.15, 0);
    const tensionArm = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.55, 0.35), mats.stainlessMachined);
    tensionArm.position.set(-3.2, 2.45, -0.65);
    tensionArm.rotation.z = -0.22;
    // Closed-loop fiberglass-reinforced PTFE high-temp toothed drive belt
    const beltCurve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-7.35, 0.0, 0),
        new THREE.Vector3(-6.2, 1.2, 0),
        new THREE.Vector3(-1.6, 1.35, 0),
        new THREE.Vector3(5.2, 6.2, 0),
        new THREE.Vector3(11.4, 0.0, 0),
        new THREE.Vector3(5.2, -6.2, 0),
        new THREE.Vector3(-6.2, -1.2, 0),
      ],
      true
    );
    const belt = new THREE.Mesh(
      new THREE.TubeGeometry(beltCurve, 34, 0.24, 8, true),
      pal.glazingEpdmMatte
    );
    g.add(hubRing, axle, pinion, idler, tensionArm, belt);

    parts.push(
      finalizeDryboxPart(
        'db-mof-belt-ceramic-hub',
        172,
        '#d97706',
        g,
        new THREE.Vector3(-5.2, -0.5, -26.3),
        new THREE.Vector3(-20.0, 6.0, -50.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB173. Steatite (MgSiO3) 1000°C High-Temp Porcelain Terminal Block & Fiberglass PTC Leads
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3-Pole unglazed steatite porcelain insulator block (1000°C continuous, zero VOC outgas)
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 5.4, 2.2), pal.aluminaCeramic);
    g.add(body);
    for (let i = -1; i <= 1; i++) {
      const py = i * 1.6;
      const clamp = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.95, 1.35), pal.brassPrecision);
      clamp.position.set(0, py, 0.35);
      const screw = makeCabinetBolt(0.32, 0.6, mats.stainlessMachined);
      screw.position.set(0, py, 1.12);
      // Fiberglass-braided silicone high-temp nickel-copper heater lead wire
      const lead = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 4.2, 8), pal.ptfeCleanWhite);
      lead.rotation.z = Math.PI / 2;
      lead.position.set(-3.4, py, 0.2);
      lead.userData.noEdges = true;
      g.add(clamp, screw, lead);
    }

    parts.push(
      finalizeDryboxPart(
        'db-ptc-steatite-terminal-block',
        173,
        '#e2e8f0',
        g,
        new THREE.Vector3(12.5, -0.5, -26.2),
        new THREE.Vector3(32.0, -1.0, -60.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB174. PEM Cathode Pt/Pd Catalytic H2 Recombiner Mesh & Hydrophobic Exhaust Baffle
  // =========================================================================
  {
    const g = new THREE.Group();
    // Titanium-framed catalytic recombiner cartridge seated on exterior cathode face of PEM (DB33)
    const frame = new THREE.Mesh(
      extrudeCentered(createFrameShape(13.2, 9.8, 0.7, 11.2, 7.8, 0.4), 1.0, 0.05, 0.05, 10),
      mats.tungstenGrid
    );
    // Pt/Pd-impregnated porous alumina H2+O2->H2O catalytic recombiner screen
    const catPad = new THREE.Mesh(new THREE.BoxGeometry(11.0, 7.6, 0.45), pal.sintered316L);
    catPad.position.z = 0.1;
    // Outer hydrophobic micro-slit PTFE vapor-exhaust diffuser shroud
    const baffle = new THREE.Mesh(new THREE.BoxGeometry(11.4, 7.8, 0.24), pal.ptfeCleanWhite);
    baffle.position.z = -0.45;
    for (let i = -2; i <= 2; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.35, 0.3), pal.pemNafionCyan);
      rib.position.set(0, i * 1.4, -0.58);
      rib.userData.noEdges = true;
      g.add(rib);
    }
    g.add(frame, catPad, baffle);

    parts.push(
      finalizeDryboxPart(
        'db-pem-cathode-h2-recombiner',
        174,
        '#a855f7',
        g,
        new THREE.Vector3(0, 14.5, -27.2),
        new THREE.Vector3(-18.0, 26.0, -54.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB175. Matte-Black Anodized Aluminum UV-C Chevron Optical Light-Trap Baffle
  // =========================================================================
  {
    const g = new THREE.Group();
    // Paired top & bottom chevron optical labyrinth cassettes bracketing DB28 UV-C cavity
    for (const cy of [4.2, -4.2]) {
      const frame = new THREE.Mesh(
        extrudeCentered(createFrameShape(21.6, 2.2, 0.35, 19.6, 1.35, 0.15), 2.0, 0.04, 0.04, 10),
        pal.flockedMatteBlack
      );
      frame.position.set(0, cy, 0);
      g.add(frame);
      // 7 V-shaped double-bounce chevron optical trap blades (<3% UV-C reflectance per bounce)
      for (let i = -3; i <= 3; i++) {
        const vx = i * 2.6;
        const vaneA = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.3, 1.15), pal.flockedMatteBlack);
        vaneA.position.set(vx - 0.32, cy, 0.38);
        vaneA.rotation.y = 0.58;
        const vaneB = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.3, 1.15), pal.flockedMatteBlack);
        vaneB.position.set(vx + 0.32, cy, -0.38);
        vaneB.rotation.y = -0.58;
        vaneA.userData.noEdges = true;
        vaneB.userData.noEdges = true;
        g.add(vaneA, vaneB);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-uvc-chevron-light-trap',
        175,
        '#0f172a',
        g,
        new THREE.Vector3(0, -6.5, -19.6),
        new THREE.Vector3(-24.0, -10.0, -28.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB176. Washable SUS304 100-Mesh Coarse Lint Pre-Filter Cassette & Magnetic Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    // Tool-free magnetic snap-in frame seated directly ahead of HEPA/carbon cartridge (DB30)
    const outerFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(22.2, 11.4, 0.7, 19.6, 8.8, 0.4), 0.7, 0.05, 0.05, 10),
      mats.stainlessMachined
    );
    // Fine woven SUS304 100-mesh stainless coarse screen + pull-tab
    const screen = new THREE.Mesh(new THREE.BoxGeometry(19.4, 8.6, 0.16), pal.sintered316L);
    const pullTab = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.0, 0.45), pal.mofEmerald);
    pullTab.position.set(0, 5.2, 0.42);
    g.add(outerFrame, screen, pullTab);
    // 4 Corner neodymium quick-release retaining magnets
    for (const [mx, my] of [
      [-10.1, 4.7],
      [10.1, 4.7],
      [-10.1, -4.7],
      [10.1, -4.7],
    ] as Array<[number, number]>) {
      const mag = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.35, 10), mats.neodymiumMagnet);
      mag.rotation.x = Math.PI / 2;
      mag.position.set(mx, my, -0.35);
      mag.userData.noEdges = true;
      g.add(mag);
    }

    parts.push(
      finalizeDryboxPart(
        'db-washable-mesh-prefilter',
        176,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 16.8, -19.7),
        new THREE.Vector3(-24.0, 24.0, -10.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB177. Dual-Stage N2 Inlet Micro Pressure Regulator, Bourdon Gauge & Empty-Tank Switch
  // =========================================================================
  {
    const g = new THREE.Group();
    // Forged brass/SUS316L dual-stage diaphragm regulator body on right rear wall
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.55, 2.8, 16), pal.brassPrecision);
    body.rotation.z = Math.PI / 2;
    // Knurled black locking pressure adjustment knob (0.05–0.15 MPa regulated setpoint)
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.2, 1.8, 16), mats.matteBlackAnodized);
    knob.rotation.z = Math.PI / 2;
    knob.position.set(2.2, 0, 0);
    // Glycerin-damped Ø32 mm stainless Bourdon pressure gauge facing rear/side
    const gaugeCase = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.75, 1.15, 20), mats.stainlessMachined);
    gaugeCase.rotation.x = Math.PI / 2;
    gaugeCase.position.set(0.4, 2.4, -0.4);
    const dial = new THREE.Mesh(new THREE.CylinderGeometry(1.48, 1.48, 0.16, 18), pal.einkPaper);
    dial.rotation.x = Math.PI / 2;
    dial.position.set(0.4, 2.4, -0.98);
    // Solid-state N2 cylinder-empty low-pressure alarm transducer switch at bottom
    const lowSwitch = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 2.1, 12), pal.fireRedAccent);
    lowSwitch.position.set(0.2, -2.35, 0);
    g.add(body, knob, gaugeCase, dial, lowSwitch);

    parts.push(
      finalizeDryboxPart(
        'db-n2-pressure-regulator-gauge',
        177,
        '#ca8a04',
        g,
        new THREE.Vector3(28.2, 26.0, -14.5),
        new THREE.Vector3(50.0, 22.0, -18.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB178. Visual Borosilicate Variable-Area N2 Flowmeter (Rotameter 0–10 L/min) & Needle Valve
  // =========================================================================
  {
    const g = new THREE.Group();
    // Machined aluminum side-mount scale bezel + tapered borosilicate flow tube
    const backplate = new THREE.Mesh(new THREE.BoxGeometry(1.0, 10.6, 2.8), mats.stainlessMachined);
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.56, 7.6, 16), pal.loweGlassClear);
    tube.position.set(0.75, 0.6, 0);
    // Floating SUS316 stainless indicator ball inside calibrated conical flow tube
    const floatBall = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 10), pal.fireRedAccent);
    floatBall.position.set(0.75, 1.4, 0);
    // Top & bottom brass compression blocks + front manual precision needle trim valve
    const topBlk = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.4, 2.2), pal.brassPrecision);
    topBlk.position.set(0.6, 4.7, 0);
    const botBlk = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.6, 2.2), pal.brassPrecision);
    botBlk.position.set(0.6, -4.1, 0);
    const needleKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 1.35, 14), mats.matteBlackAnodized);
    needleKnob.rotation.z = Math.PI / 2;
    needleKnob.position.set(2.05, -4.1, 0);
    g.add(backplate, tube, floatBall, topBlk, botBlk, needleKnob);

    parts.push(
      finalizeDryboxPart(
        'db-n2-rotameter-needle-valve',
        178,
        '#38bdf8',
        g,
        new THREE.Vector3(28.2, 14.5, -14.5),
        new THREE.Vector3(50.0, 10.0, -22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB179. Vertical SUS316L Multi-Orifice Laminar Nitrogen (N2) Sparger Diffuser Manifold
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical electropolished SUS316L diffuser tube running across all upper/mid shelf heights
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 44.0, 14), mats.stainlessMachined);
    const endCap = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.9, 12), pal.brassPrecision);
    endCap.position.set(0, -22.2, 0);
    const topElbow = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 2.2), pal.brassPrecision);
    topElbow.position.set(0, 22.2, 0.5);
    g.add(pipe, endCap, topElbow);

    // 10 Laser-drilled sintered micro-diffuser jet nozzles directing gentle horizontal N2 sweep
    for (let i = 0; i < 10; i++) {
      const ny = -18.0 + i * 4.0;
      const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.75, 10), pal.sintered316L);
      nozzle.rotation.z = Math.PI / 2;
      nozzle.position.set(-0.72, ny, 0.2);
      nozzle.userData.noEdges = true;
      g.add(nozzle);
    }

    parts.push(
      finalizeDryboxPart(
        'db-n2-sparger-diffuser-bar',
        179,
        '#cbd5e1',
        g,
        new THREE.Vector3(22.6, 11.0, -16.2),
        new THREE.Vector3(38.0, 8.0, -22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB180. 6-Plate Solar/Thermal Radiation-Shielded External Ambient Dew-Point Sensor Pod
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mounting mast pedestal on top-left rear exterior roof
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.4, 1.2, 16), mats.matteBlackAnodized);
    pedestal.position.y = -1.6;
    // Inner external Sensirion SHT45 reference sensor core (room T / RH / dew-point tracking)
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 2.4, 14), pal.pcbEmeraldDark);
    core.position.y = 0.2;
    g.add(pedestal, core);

    // 6 Stacked high-reflectivity UV-stabilized white louver plates (Campbell RAD06 / Young 41003 class)
    for (let i = 0; i < 6; i++) {
      const plate = new THREE.Mesh(
        new THREE.CylinderGeometry(2.35, 2.65, 0.28, 20),
        pal.ptfeCleanWhite
      );
      plate.position.y = -0.9 + i * 0.52;
      plate.userData.noEdges = true;
      g.add(plate);
    }

    parts.push(
      finalizeDryboxPart(
        'db-ambient-dewpoint-pod',
        180,
        '#e2e8f0',
        g,
        new THREE.Vector3(-16.5, 53.6, -14.5),
        new THREE.Vector3(-26.0, 44.0, -22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB181. ISO/IEC 17025 Chilled-Mirror Hygrometer 1/4" Swagelok Port & 4-Wire Pt100 Feedthrough
  // =========================================================================
  {
    const g = new THREE.Group();
    // Airtight stainless wall bulkhead plate on left exterior panel
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.85, 9.2, 6.2), mats.stainlessMachined);
    g.add(plate);
    // Twin 1/4" Swagelok SUS316L sample supply & return compression fittings with Viton dust caps
    for (const sy of [2.4, -0.4]) {
      const hex = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 1.8, 6), mats.stainlessMachined);
      hex.rotation.z = Math.PI / 2;
      hex.position.set(-1.1, sy, -1.2);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.85, 12), pal.fireRedAccent);
      cap.rotation.z = Math.PI / 2;
      cap.position.set(-2.35, sy, -1.2);
      g.add(hex, cap);
    }
    // Sealed 4-pin LEMO push-pull metrology jack for external 1/10 DIN 4-wire Pt100 reference probe
    const lemo = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 2.0, 14), pal.brassPrecision);
    lemo.rotation.z = Math.PI / 2;
    lemo.position.set(-1.2, -2.8, 1.1);
    const goldPins = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 12), mats.goldPlating);
    goldPins.rotation.z = Math.PI / 2;
    goldPins.position.set(-2.25, -2.8, 1.1);
    g.add(lemo, goldPins);

    parts.push(
      finalizeDryboxPart(
        'db-chilled-mirror-cal-port',
        181,
        '#94a3b8',
        g,
        new THREE.Vector3(-27.8, -2.0, -4.0),
        new THREE.Vector3(-48.0, -2.0, -6.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB182. IEC 61340-5-1 Dual 4 mm Banana-Jack ESD Wrist-Strap Grounding Station & Monitor LED
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-visibility ESD-yellow/black anodized aluminum personnel earth-bonding box on lower-right side
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 6.4, 8.6), pal.esdPowderShell);
    const badge = new THREE.Mesh(new THREE.BoxGeometry(0.28, 5.2, 7.4), pal.copperInterceptAmber);
    badge.position.x = 0.72;
    g.add(box, badge);

    // Dual 4 mm gold-plated banana sockets (1 MΩ safety resistor each) + 10 mm snap stud
    for (const bz of [-2.0, 0.4]) {
      const jack = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.85, 14), mats.goldPlating);
      jack.rotation.z = Math.PI / 2;
      jack.position.set(1.0, -0.9, bz);
      g.add(jack);
    }
    const snap = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.7, 14), mats.stainlessMachined);
    snap.rotation.z = Math.PI / 2;
    snap.position.set(0.95, -0.9, 2.5);
    // Live ground-continuity emerald status LED
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.36, 10, 8), pal.mofEmerald);
    led.position.set(0.95, 1.5, 0);
    g.add(snap, led);

    parts.push(
      finalizeDryboxPart(
        'db-esd-wrist-strap-station',
        182,
        '#eab308',
        g,
        new THREE.Vector3(27.5, -24.5, 14.5),
        new THREE.Vector3(46.0, -22.0, 26.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB183. Shrouded Double-Pole Mains Rocker Switch & IEC 60127 5x20 mm Ceramic HRC Fuse Holder
  // =========================================================================
  {
    const g = new THREE.Group();
    // Protective anti-bump steel collar housing double-pole L+N mains switch + fuse carrier
    const panel = new THREE.Mesh(new THREE.BoxGeometry(7.2, 4.4, 2.8), mats.matteBlackAnodized);
    // Recessed red illuminated double-pole rocker switch
    const guard = new THREE.Mesh(
      extrudeCentered(createFrameShape(3.2, 3.0, 0.25, 2.4, 2.2, 0.12), 1.1, 0.04, 0.04, 10),
      pal.esdPowderShell
    );
    guard.position.set(-1.6, 0, -1.65);
    const rocker = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.8, 0.9), pal.fireRedAccent);
    rocker.position.set(-1.6, 0, -1.6);
    rocker.rotation.x = 0.28;
    // Finger-safe bayonet-cap 5×20 mm ceramic sand-filled HRC (1500A) cartridge fuse holder
    const fuseHolder = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 2.8, 16), pal.esdPowderShell);
    fuseHolder.rotation.x = Math.PI / 2;
    fuseHolder.position.set(1.8, 0, -0.7);
    const fuseCeramic = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.8, 12), pal.aluminaCeramic);
    fuseCeramic.rotation.x = Math.PI / 2;
    fuseCeramic.position.set(1.8, 0, -1.7);
    const fuseCap = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.42, 12), mats.stainlessMachined);
    fuseCap.rotation.x = Math.PI / 2;
    fuseCap.position.set(1.8, 0, -2.55);
    g.add(panel, guard, rocker, fuseHolder, fuseCeramic, fuseCap);

    parts.push(
      finalizeDryboxPart(
        'db-mains-breaker-fuse-module',
        183,
        '#dc2626',
        g,
        new THREE.Vector3(16.5, -46.2, -24.4),
        new THREE.Vector3(34.0, -34.0, -48.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB184. TI INA228 20-Bit Ultra-Precise 4-Channel Power/Current Telemetry & Shunt PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    // Central high-side power-diagnostics PCB bridging GaN PSU (DB41) & Supercap UPS (DB42)
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(6.8, 9.6, 0.65), pal.pcbEmeraldDark);
    g.add(pcb);

    // 4 Precision 0.1% 15 mΩ Manganin Kelvin-sense shunt resistors + 4 TI INA228 20-bit ADC ICs
    for (let i = 0; i < 4; i++) {
      const sy = 3.15 - i * 2.1;
      const shunt = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.85, 0.48), mats.copperHeatSpreader);
      shunt.position.set(-1.5, sy, -0.5);
      const ic = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.15, 0.36), mats.icEpoxy);
      ic.position.set(1.3, sy, -0.45);
      shunt.userData.noEdges = true;
      ic.userData.noEdges = true;
      g.add(shunt, ic);
    }
    // Gold I2C diagnostic header along top edge
    const header = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.75, 0.85), mats.goldPlating);
    header.position.set(0, 4.3, -0.65);
    g.add(header);

    parts.push(
      finalizeDryboxPart(
        'db-ina228-power-monitor-pcb',
        184,
        '#10b981',
        g,
        new THREE.Vector3(0, -36.5, -24.8),
        new THREE.Vector3(0, -36.0, -44.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB185. Analog Devices LT3045 0.8 μVrms Sensor LDO Rail & MnZn Common-Mode Ferrite Choke PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    // EMI-shielded ultra-low-noise analog sensor power sub-board behind DB13 IoT SoC
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.65, 5.4), pal.pcbEmeraldDark);
    // Nickel-silver RF shield can enclosing paralleled LT3045 (0.8 μVrms, 76 dB PSRR) regulators
    const shieldCan = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.15, 3.8), mats.emiShieldCan);
    shieldCan.position.set(-2.2, 0.85, 0);
    // Twin MnZn toroidal common-mode EMI suppression ferrite chokes stripping PWM switching noise
    for (const cz of [-1.25, 1.25]) {
      const toroid = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.36, 10, 18), pal.ceramicFritBlack);
      toroid.position.set(2.8, 1.05, cz);
      const winding = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.14, 8, 18), mats.copperCoil);
      winding.position.set(2.8, 1.05, cz);
      winding.userData.noEdges = true;
      g.add(toroid, winding);
    }
    g.add(pcb, shieldCan);

    parts.push(
      finalizeDryboxPart(
        'db-lt3045-ultralownoise-ldo',
        185,
        '#6366f1',
        g,
        new THREE.Vector3(0, 47.4, 7.2),
        new THREE.Vector3(0, 40.0, 2.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB186. Isolated RS-485 Modbus / PoE+ RJ45 & 21 CFR Part 11 pSLC microSD Black-Box Module
  // =========================================================================
  {
    const g = new THREE.Group();
    // Industrial wired telemetry & audit-vault module symmetric to DB124 dry-contact alarm block
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(7.2, 5.4, 0.65), pal.pcbEmeraldDark);
    // Shielded IEEE 802.3at PoE+ (30W) RJ45 MagJack port
    const rj45 = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.2, 2.8), mats.emiShieldCan);
    rj45.position.set(-1.9, 1.1, -1.5);
    // 2.5 kV isolated 4-pin green Phoenix-style RS-485 Modbus-RTU terminal block
    const rs485 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 2.1), pal.mofEmerald);
    rs485.position.set(1.6, 1.2, -1.2);
    // Sealed tamper-evident industrial pSLC microSD audit slot (21 CFR Part 11 20-year black box)
    const sdSlot = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.2, 1.6), mats.stainlessMachined);
    sdSlot.position.set(-1.6, -1.5, -1.0);
    const sdCard = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.32, 1.3), pal.fireRedAccent);
    sdCard.position.set(-1.6, -1.5, -1.7);
    // Sealed USB-C local CSV/PDF calibration report export receptacle
    const usbExport = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.9, 1.6), mats.goldPlating);
    usbExport.position.set(1.9, -1.5, -1.0);
    g.add(pcb, rj45, rs485, sdSlot, sdCard, usbExport);

    parts.push(
      finalizeDryboxPart(
        'db-rs485-poe-pslc-telemetry',
        186,
        '#0ea5e9',
        g,
        new THREE.Vector3(-17.5, -22.5, -25.2),
        new THREE.Vector3(-42.0, -22.0, -40.0),
        cp
      )
    );
  }

  return parts;
}
