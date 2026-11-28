//@FLOW_MAP|file=src/assemblies/drybox/dryboxUltraConservationParts.ts|unit=drybox|lines=885|exports=buildDryboxUltraConservationParts
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
 * Build Phase 38 Part 1 (DB91–DB110 — 20 Ultra-HD Glazing Security, Archival Conservation & Hybrid Core Micro-Parts):
 * - Structural Glazing VHB/Frit, EN 356 Shatter Film, Hinge Dog Bolts, 3D Eccentric Cams,
 *   ADXL367 Tamper/Seismic MEMS, Air-Spring Cushion Relief Valve, Braided Door Earth Strap,
 *   HRC 60 Anti-Theft Tether Shackle (DB91–DB98)
 * - IPI A-D Vinegar Acid Scavenger, Corrosion Intercept Reactive Copper Strip, Cobalt-Free CuCl2 HIC,
 *   12-Edge Epoxy Hermetic Seam Fillet, Bayonet Vertical Parking Dock, Leather Strap Hanger Bar,
 *   Rail ESD Wiper Brushes, 150μm Interdigital Leak Sensor (DB99–DB106)
 * - PEM α-MnO2 Catalytic O3 Mesh, PEM PTFE Carbon GDL+MPL, 0.5rpm Zr-MOF Planetary Gearmotor,
 *   270°/90° PTFE-Felt Rotor Sector Wiper Seal (DB107–DB110)
 */
export function buildDryboxUltraConservationParts(ctx: DryboxPartBuilderCtx): CadPart[] {
  const { mats, pal, cp } = ctx;
  const parts: CadPart[] = [];

  // =========================================================================
  // DB91. Structural Glazing VHB Acrylic Foam Tape & Kiln-Fired Black Ceramic Frit Border
  // =========================================================================
  {
    const g = new THREE.Group();
    // Kiln-fired black ceramic frit border (silkscreened onto glass perimeter to shield VHB from UV)
    const fritShape = createFrameShape(44.2, 85.6, 1.0, 40.4, 81.8, 0.7);
    const frit = new THREE.Mesh(extrudeCentered(fritShape, 0.14, 0.02, 0.02, 10), pal.ceramicFritBlack);
    frit.position.z = 0.22;
    g.add(frit);

    // Viscoelastic 1.6mm structural glazing VHB acrylic foam tape directly behind frit band
    const vhbShape = createFrameShape(43.6, 85.0, 0.95, 41.2, 82.6, 0.75);
    const vhb = new THREE.Mesh(extrudeCentered(vhbShape, 0.34, 0.03, 0.03, 10), pal.pa66ThermalBreak);
    vhb.position.z = -0.06;
    g.add(vhb);

    // Optical dot-matrix transition gradient dots along inner frit border (ceramic halftone)
    for (let i = -9; i <= 9; i++) {
      for (const sx of [-1, 1]) {
        const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 8), pal.ceramicFritBlack);
        dot.rotation.x = Math.PI / 2;
        dot.position.set(sx * 19.8, i * 4.1, 0.23);
        dot.userData.noEdges = true;
        g.add(dot);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-structural-glazing-tape',
        91,
        '#0b0f17',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 25.45),
        new THREE.Vector3(4.0, 4.0, 62.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // DB92. ANSI Z97.1 / EN 356 P6B Optical Polyurethane/PVB Anti-Shatter Safety Laminate Film
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-clear 200μm tear-resistant PU/PVB optical safety film across inner glass face
    const filmShape = createRoundedRectShape(43.0, 84.4, 0.8);
    const film = new THREE.Mesh(extrudeCentered(filmShape, 0.12, 0.01, 0.01, 10), pal.arItoFilm);
    g.add(film);

    // 4 Corner Wet-Glaze Silicone Anchoring Tabs (locking film edges into aluminum rabbet!)
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        const anchor = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.85, 0.28), pal.pfasFreeHydroBlue);
        anchor.position.set(sx * 19.6, sy * 41.8, -0.08);
        const anchorV = new THREE.Mesh(new THREE.BoxGeometry(0.85, 3.8, 0.28), pal.pfasFreeHydroBlue);
        anchorV.position.set(sx * 21.1, sy * 40.3, -0.08);
        g.add(anchor, anchorV);
      }
    }
    // Subtle laser-etched EN 356 P6B / ANSI Z97.1 safety certification corner mark
    const badge = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.4, 0.18), pal.ferritic430Steel);
    badge.position.set(17.5, -39.5, 0.04);
    g.add(badge);

    parts.push(
      finalizeDryboxPart(
        'db-glass-shatter-laminate-film',
        92,
        '#38bdf8',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 25.02),
        new THREE.Vector3(-4.0, -4.0, 66.5),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB93. Case-Hardened Steel Hinge-Side Anti-Pry Dog Bolts & Frame Receiver Sockets
  // =========================================================================
  {
    const g = new THREE.Group();
    const stationsY = [-30.0, 0.0, 30.0];
    for (const sy of stationsY) {
      const st = new THREE.Group();
      st.position.set(0, sy, 0);
      // Heavy door-side steel flange plate + protruding chamfered HRC 60 dog bolt stud
      const plate = new THREE.Mesh(new THREE.BoxGeometry(1.1, 6.2, 2.2), pal.hardenedSteelHrc60);
      plate.position.set(0.6, 0, 0.6);
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.92, 3.4, 16), pal.hardenedSteelHrc60);
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(0.6, 0, -1.4);
      const chamferTip = new THREE.Mesh(new THREE.ConeGeometry(0.82, 0.8, 16), mats.stainlessMachined);
      chamferTip.rotation.x = -Math.PI / 2;
      chamferTip.position.set(0.6, 0, -3.5);
      // Frame-side hardened steel receiver pocket sleeve (engages when door closes)
      const receiver = new THREE.Mesh(new THREE.CylinderGeometry(1.38, 1.38, 2.6, 16, 1, true), mats.stainlessMachined);
      receiver.rotation.x = Math.PI / 2;
      receiver.position.set(0.6, 0, -2.5);
      const bushing = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.24, 8, 18), pal.ptfeCleanWhite);
      bushing.position.set(0.6, 0, -1.25);
      // 2 Security Torx mounting fasteners
      for (const dy of [-2.1, 2.1]) {
        const sc = makeCabinetBolt(0.38, 0.7, pal.brassPrecision);
        sc.position.set(0.6, dy, 1.65);
        st.add(sc);
      }
      st.add(plate, bolt, chamferTip, receiver, bushing);
      g.add(st);
    }

    parts.push(
      finalizeDryboxPart(
        'db-hinge-side-dogbolts',
        93,
        '#475569',
        g,
        new THREE.Vector3(-25.6, DB_DIM.DOOR_CY, 22.8),
        new THREE.Vector3(-38.0, -4.0, 32.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB94. 3D Eccentric Cam Hinge Adjustment Mounting Plates (±2 mm X/Y/Z Calibration)
  // =========================================================================
  {
    const g = new THREE.Group();
    const stationsY = [-36.0, 0.0, 36.0];
    for (const sy of stationsY) {
      const hg = new THREE.Group();
      hg.position.set(0, sy, 0);
      // Cruciform zinc-die-cast 3D base mounting plate
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.4, 7.6, 3.8), mats.stainlessMachined);
      // 3 Brass Eccentric Cam Adjustment Screws (X: Lateral gap, Y: Vertical sag, Z: Gasket compression)
      const camX = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.9, 14), pal.brassPrecision);
      camX.rotation.z = Math.PI / 2;
      camX.position.set(0.85, 2.2, 0.8);
      const camY = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.9, 14), pal.brassPrecision);
      camY.rotation.z = Math.PI / 2;
      camY.position.set(0.85, 0.0, -0.7);
      const camZ = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.9, 14), pal.nitiRoseWire);
      camZ.rotation.z = Math.PI / 2;
      camZ.position.set(0.85, -2.2, 0.8);
      // Linear dovetail slide carrier + index vernier ticks
      const carrier = new THREE.Mesh(new THREE.BoxGeometry(0.9, 5.4, 2.4), mats.stainlessMachined);
      carrier.position.set(0.65, 0, 0);
      hg.add(base, carrier, camX, camY, camZ);
      g.add(hg);
    }

    parts.push(
      finalizeDryboxPart(
        'db-3d-eccentric-hinge-cam',
        94,
        '#d4a137',
        g,
        new THREE.Vector3(-26.2, DB_DIM.DOOR_CY, 22.0),
        new THREE.Vector3(-38.0, 8.0, 22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB95. Analog Devices ADXL367 Ultra-Low-Power 3-Axis Tamper & Seismic MEMS Module
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rigid CNC aluminum shock-coupling housing (directly bolted to chassis so vibrations transfer 1:1)
    const housing = new THREE.Mesh(new THREE.BoxGeometry(5.8, 3.6, 2.4), mats.stainlessMachined);
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(5.0, 2.8, 0.45), pal.pcbEmeraldDark);
    pcb.position.z = 0.45;
    // Center ADXL367 2.2×2.3mm LGA MEMS package with 3-axis gold orientation crosshair
    const memsIc = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 0.52), mats.icEpoxy);
    memsIc.position.set(0, 0, 0.86);
    const axisX = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.14, 0.12), mats.goldPlating);
    axisX.position.set(0, 0, 1.15);
    const axisY = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.2, 0.12), mats.goldPlating);
    axisY.position.set(0, 0, 1.15);
    // SPI 4-pin shielded header & status amber indicator
    const header = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 0.75), mats.goldPlating);
    header.position.set(-1.7, -0.8, 0.85);
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), pal.rubyThermalFuse);
    led.position.set(1.75, 0.8, 0.88);
    // 2 Rigid coupling bolts
    for (const bx of [-2.2, 2.2]) {
      const b = makeCabinetBolt(0.35, 1.2, mats.stainlessMachined);
      b.position.set(bx, 0, 1.1);
      g.add(b);
    }
    g.add(housing, pcb, memsIc, axisX, axisY, header, led);

    parts.push(
      finalizeDryboxPart(
        'db-3axis-tamper-seismic-mems',
        95,
        '#f43f5e',
        g,
        new THREE.Vector3(21.5, 45.2, 16.5),
        new THREE.Vector3(38.0, 26.0, 28.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB96. One-Way Latch-Jamb Air-Spring Cushion Relief Micro-Valve
  // =========================================================================
  {
    const g = new THREE.Group();
    // Recessed brass/anodized valve body seated in latch jamb flange
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.75, 2.8, 20), pal.brassPrecision);
    body.rotation.z = Math.PI / 2;
    // Spring-loaded ultralight silicone umbrella check diaphragm (opens at +40 Pa door-close surge)
    const umbrella = new THREE.Mesh(new THREE.ConeGeometry(1.45, 0.65, 18), pal.pfasFreeHydroBlue);
    umbrella.rotation.z = -Math.PI / 2;
    umbrella.position.set(1.1, 0, 0);
    // Micro helical return spring (4 args!)
    const spr = new THREE.Mesh(createHelicalSpringGeometry(0.45, 1.6, 5, 0.08), mats.stainlessMachined);
    spr.rotation.z = Math.PI / 2;
    spr.position.set(0.1, 0, 0);
    // Perforated sintered bronze acoustic diffuser cap (eliminates hiss!)
    const diffuser = new THREE.Mesh(new THREE.CylinderGeometry(1.52, 1.52, 0.55, 18), pal.sintered316L);
    diffuser.rotation.z = Math.PI / 2;
    diffuser.position.set(-1.35, 0, 0);
    // Perimeter O-ring seal
    const oring = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.22, 8, 22), pal.glazingEpdmMatte);
    oring.rotation.y = Math.PI / 2;
    oring.position.set(0.4, 0, 0);
    g.add(body, umbrella, spr, diffuser, oring);

    parts.push(
      finalizeDryboxPart(
        'db-door-slam-cushion-vent',
        96,
        '#0ea5e9',
        g,
        new THREE.Vector3(25.4, 24.0, 22.2),
        new THREE.Vector3(38.0, 12.0, 36.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB97. IEC 61340-5-1 Flexible Tinned-Copper Braided Door Earth Bonding Strap
  // =========================================================================
  {
    const g = new THREE.Group();
    // S-curved flat braided tinned-copper strap bridging PTFE-insulated bottom hinge
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 1.6),
      new THREE.Vector3(1.2, 1.8, 0.6),
      new THREE.Vector3(0.4, 3.8, -0.8),
      new THREE.Vector3(-0.6, 5.6, -1.8),
    ]);
    const braid = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.42, 8, false), pal.ferritic430Steel);
    braid.scale.set(1.6, 1.0, 0.45);
    // Diagonal copper weave accent core inside transparent PVC flex jacket
    const innerCu = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.26, 6, false), mats.copperCoil);
    // Two crimped gold-plated M5 ring lugs + serrated star lock washers (biting through powder coat!)
    const lugDoor = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.22, 8, 16), mats.goldPlating);
    lugDoor.position.set(0, 0, 1.75);
    const lugFrame = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.22, 8, 16), mats.goldPlating);
    lugFrame.position.set(-0.6, 5.6, -1.9);
    const bolt1 = makeCabinetBolt(0.44, 0.9, mats.stainlessMachined);
    bolt1.position.set(0, 0, 1.85);
    const bolt2 = makeCabinetBolt(0.44, 0.9, mats.stainlessMachined);
    bolt2.position.set(-0.6, 5.6, -2.0);
    // Green/Yellow IEC 60446 earth sleeve markers at both crimps
    const sleeve1 = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.1, 10), pal.mofEmerald);
    sleeve1.position.set(0.35, 0.7, 1.3);
    const sleeve2 = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.1, 10), pal.mofEmerald);
    sleeve2.position.set(-0.25, 4.9, -1.45);
    g.add(braid, innerCu, lugDoor, lugFrame, bolt1, bolt2, sleeve1, sleeve2);

    parts.push(
      finalizeDryboxPart(
        'db-door-braided-earth-strap',
        97,
        '#16a34a',
        g,
        new THREE.Vector3(-25.2, -39.5, 22.8),
        new THREE.Vector3(-38.0, -18.0, 34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB98. Case-Hardened HRC 60 Rear Anti-Theft Tether Anchor Eyelet & Steel Cable Shackle
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heavy steel backing reinforcement flange bolted through rear chassis wall
    const flange = new THREE.Mesh(new THREE.BoxGeometry(6.8, 5.6, 1.1), pal.hardenedSteelHrc60);
    // Welded HRC 60 D-ring forged anchor loop
    const dRing = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.58, 12, 24, Math.PI), pal.hardenedSteelHrc60);
    dRing.rotation.x = Math.PI / 2;
    dRing.rotation.z = Math.PI;
    dRing.position.set(0, 0, -0.5);
    // Braided 8mm galvanized steel anti-theft tether cable looping through anchor toward wall stud
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, -2.6),
      new THREE.Vector3(-2.6, -1.8, -4.6),
      new THREE.Vector3(-6.2, -2.5, -5.8),
      new THREE.Vector3(-8.5, -0.5, -4.2),
    ]);
    const cable = new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 22, 0.44, 10, false), mats.stainlessMachined);
    // Crimped aluminum ferrule + 4 tamper-resistant one-way security bolts
    const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.9, 12), mats.stainlessMachined);
    ferrule.rotation.z = Math.PI / 3;
    ferrule.position.set(-4.0, -2.1, -5.2);
    for (const bx of [-2.4, 2.4]) {
      for (const by of [-1.8, 1.8]) {
        const b = makeCabinetBolt(0.42, 1.2, mats.stainlessMachined);
        b.position.set(bx, by, -0.55);
        g.add(b);
      }
    }
    g.add(flange, dRing, cable, ferrule);

    parts.push(
      finalizeDryboxPart(
        'db-security-tether-shackle',
        98,
        '#334155',
        g,
        new THREE.Vector3(-21.0, -44.0, -24.8),
        new THREE.Vector3(-40.0, -34.0, -34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB99. IPI A-D Strip® Film Acetic-Acid Indicator & K₂CO₃ / Molecular-Sieve Acid Scavenger
  // =========================================================================
  {
    const g = new THREE.Group();
    // Anodized louvered archival cassette bolted to inner upper-right chamber wall
    const cassette = new THREE.Mesh(new THREE.BoxGeometry(2.2, 11.4, 8.2), mats.stainlessMachined);
    // Visible IPI A-D Strip colorimetric viewing window on front face (Level 0 Blue -> 1 Green -> 3 Yellow)
    const stripBg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 6.2, 2.2), pal.einkPaper);
    stripBg.position.set(-1.12, 1.6, 2.2);
    const level0Blue = new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.6, 1.7), pal.blue450Glow);
    level0Blue.position.set(-1.14, 3.5, 2.2);
    const level1Green = new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.6, 1.7), pal.mofEmerald);
    level1Green.position.set(-1.14, 1.6, 2.2);
    const level2Yellow = new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.6, 1.7), pal.kaptonAmberFilm);
    level2Yellow.position.set(-1.14, -0.3, 2.2);
    // Active alkaline K2CO3 + molecular sieve louver bed neutralizing CH3COOH vapor
    for (let i = 0; i < 6; i++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.85, 4.2), pal.aluminaCeramic);
      louver.position.set(-1.05, -4.4 + i * 1.65, -1.5);
      louver.rotation.z = 0.25;
      g.add(louver);
    }
    const bedCore = new THREE.Mesh(new THREE.BoxGeometry(1.5, 9.8, 4.4), pal.aerogelPearl);
    bedCore.position.set(0.1, 0, -1.5);
    g.add(cassette, stripBg, level0Blue, level1Green, level2Yellow, bedCore);

    parts.push(
      finalizeDryboxPart(
        'db-vinegar-acid-scavenger',
        99,
        '#0ea5e9',
        g,
        new THREE.Vector3(24.4, 28.5, 6.0),
        new THREE.Vector3(42.0, 22.0, 18.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB100. Lucent/Bell Labs Reactive Copper-Bonded LDPE Corrosion Intercept® Anti-Sulfidation Strip
  // =========================================================================
  {
    const g = new THREE.Group();
    // Perforated stainless retainer rail holding sacrificial copper-bonded polymer strip
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 13.6, 5.2), mats.stainlessMachined);
    // Warm copper-amber reactive polymer matrix (sacrificial Cu nanoparticles bonded inside LDPE; ZERO VCI outgassing!)
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.85, 12.2, 4.0), pal.copperInterceptAmber);
    strip.position.set(-0.55, 0, 0);
    // 5 Air-intake micro-ribs showcasing multi-layer reactive surface area + end-of-life color-check window
    for (let i = -2; i <= 2; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.55, 4.2), mats.copperCoil);
      rib.position.set(-1.02, i * 2.4, 0);
      g.add(rib);
    }
    const eolBadge = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.2, 1.8), pal.ceramicFritBlack);
    eolBadge.position.set(-1.0, -4.8, 1.2);
    g.add(frame, strip, eolBadge);

    parts.push(
      finalizeDryboxPart(
        'db-corrosion-intercept-strip',
        100,
        '#b45309',
        g,
        new THREE.Vector3(24.4, 11.0, 6.0),
        new THREE.Vector3(44.0, 4.0, 16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB101. EU R49/R46 & JEDEC J-STD-033 Cobalt-Dichloride-Free CuCl₂ Humidity Indicator Card (HIC)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Slanted quick-slide anodized aluminum viewing card holder visible through glass door
    const holder = new THREE.Mesh(new THREE.BoxGeometry(1.4, 10.6, 6.8), mats.stainlessMachined);
    const card = new THREE.Mesh(new THREE.BoxGeometry(0.32, 9.6, 5.8), pal.einkPaper);
    card.position.set(0.68, 0, 0);
    // 3 Reversible Cobalt-Free CuCl2 indicator spots (30% Brown=Dry, 40% Amber-Teal=Optimal, 50% Azure=High)
    const spot30 = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.36, 20), pal.copperInterceptAmber);
    spot30.rotation.z = Math.PI / 2;
    spot30.position.set(0.75, 2.8, 0);
    const spot40 = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.36, 20), pal.copperIonTeal);
    spot40.rotation.z = Math.PI / 2;
    spot40.position.set(0.75, 0.0, 0);
    const spot50 = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.36, 20), pal.blue450Glow);
    spot50.rotation.z = Math.PI / 2;
    spot50.position.set(0.75, -2.8, 0);
    // Clear protective acrylic viewing bezel with breathing perforations
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.18, 9.8, 6.0), pal.loweGlassClear);
    glass.position.set(0.95, 0, 0);
    g.add(holder, card, spot30, spot40, spot50, glass);

    parts.push(
      finalizeDryboxPart(
        'db-cobaltfree-hic-card',
        101,
        '#0f766e',
        g,
        new THREE.Vector3(-24.4, 28.5, 8.5),
        new THREE.Vector3(-44.0, 22.0, 22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB102. Continuous 12-Edge Low-VOC 2-Part Epoxy / MS-Polymer Internal Hermetic Seam Fillet
  // =========================================================================
  {
    const g = new THREE.Group();
    const ix = DB_DIM.HW - 1.65;
    const iy = DB_DIM.HH - 1.65;
    const iz = DB_DIM.HD - 1.65;
    const r = 0.42;
    // 4 Vertical internal corner beads
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const vBead = new THREE.Mesh(new THREE.CylinderGeometry(r, r, DB_DIM.H - 3.4, 10), pal.pfasFreeHydroBlue);
        vBead.position.set(sx * ix, 0, sz * iz);
        vBead.userData.noEdges = true;
        g.add(vBead);
      }
    }
    // 4 Horizontal X-axis top/bottom beads (front & rear)
    for (const sy of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const xBead = new THREE.Mesh(new THREE.CylinderGeometry(r, r, DB_DIM.W - 3.4, 10), pal.pfasFreeHydroBlue);
        xBead.rotation.z = Math.PI / 2;
        xBead.position.set(0, sy * iy, sz * iz);
        xBead.userData.noEdges = true;
        g.add(xBead);
      }
    }
    // 4 Horizontal Z-axis depth beads (left & right, top & bottom)
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        const zBead = new THREE.Mesh(new THREE.CylinderGeometry(r, r, DB_DIM.D - 3.4, 10), pal.pfasFreeHydroBlue);
        zBead.rotation.x = Math.PI / 2;
        zBead.position.set(sx * ix, sy * iy, 0);
        zBead.userData.noEdges = true;
        g.add(zBead);
      }
    }
    // 8 Corner 3-way fillet junction nodes
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        for (const sz of [-1, 1]) {
          const node = new THREE.Mesh(new THREE.SphereGeometry(0.68, 10, 8), pal.pfasFreeHydroBlue);
          node.position.set(sx * ix, sy * iy, sz * iz);
          node.userData.noEdges = true;
          g.add(node);
        }
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-seam-epoxy-hermetic-caulk',
        102,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(26.0, -14.0, -8.0),
        cp,
        0.15
      )
    );
  }

  // =========================================================================
  // DB103. Silicone-Cushioned POM Bayonet Mount Vertical Lens Parking Dock Rings
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heavy anti-slip tray docking base plate holding 2 precision upright prime-lens bayonet docks
    const base = makeHorizBoxPlate(16.8, 15.6, 0.85, 1.4, pal.esdPowderShell, 0.08);
    g.add(base);
    for (const dz of [-3.6, 3.6]) {
      const dock = new THREE.Group();
      dock.position.set(-1.2, 0.55, dz);
      // Outer low-friction POM bayonet guide collar
      const outerRing = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 3.55, 1.35, 28, 1, true), pal.ptfeCleanWhite);
      outerRing.position.y = 0.65;
      // Inner Shore A 45 Silicone cushion seat + 3 non-marring bayonet alignment lugs
      const cushion = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.42, 10, 28), pal.seismicGelBlue);
      cushion.rotation.x = Math.PI / 2;
      cushion.position.y = 0.85;
      for (let k = 0; k < 3; k++) {
        const ang = (k * Math.PI * 2) / 3;
        const lug = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.48, 0.42), pal.pa66ThermalBreak);
        lug.position.set(Math.cos(ang) * 2.45, 0.72, Math.sin(ang) * 2.45);
        lug.rotation.y = -ang;
        dock.add(lug);
      }
      // Central dry-air breather aperture under docked rear element!
      const ventRing = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.16, 8, 18), mats.stainlessMachined);
      ventRing.rotation.x = Math.PI / 2;
      ventRing.position.y = 0.12;
      dock.add(outerRing, cushion, ventRing);
      g.add(dock);
    }
    // Red bayonet alignment index dot next to each dock
    for (const dz of [-3.6, 3.6]) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), pal.fireRedAccent);
      dot.position.set(2.8, 0.62, dz);
      g.add(dot);
    }

    parts.push(
      finalizeDryboxPart(
        'db-bayonet-mount-parking-dock',
        103,
        '#f8fafc',
        g,
        new THREE.Vector3(-11.0, DB_DIM.SHELF_MID_Y + 1.5, 3.0),
        new THREE.Vector3(-22.0, 10.0, 44.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB104. Perforated Stainless Leather-Strap & Bellows Airflow Hanger Bar + Linen Buffer Sleeve
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual under-deck stainless mounting brackets
    for (const sx of [-7.8, 7.8]) {
      const brk = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.4, 2.2), mats.stainlessMachined);
      brk.position.set(sx, 1.4, 0);
      g.add(brk);
    }
    // Perforated tubular stainless hanger bar allowing 360° airflow through hanging leather straps & bellows
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 16.8, 18), mats.stainlessMachined);
    bar.rotation.z = Math.PI / 2;
    g.add(bar);
    // Breathable 50% RH hygroscopic natural unbleached linen buffer sleeve wrapped around center span
    const linen = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.02, 9.6, 20), pal.linenBufferBeige);
    linen.rotation.z = Math.PI / 2;
    g.add(linen);
    // 4 Adjustable silicone strap-spacing divider O-rings + 2 hanging leather strap hooks
    for (const hx of [-6.0, -3.2, 3.2, 6.0]) {
      const stopRing = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.18, 8, 16), pal.glazingEpdmMatte);
      stopRing.rotation.y = Math.PI / 2;
      stopRing.position.set(hx, 0, 0);
      g.add(stopRing);
    }
    for (const hx of [-1.8, 1.8]) {
      const hook = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.22, 8, 18, Math.PI * 1.4), pal.brassPrecision);
      hook.position.set(hx, -1.65, 0);
      hook.rotation.z = Math.PI * 0.8;
      g.add(hook);
    }

    parts.push(
      finalizeDryboxPart(
        'db-leather-strap-hanger-bar',
        104,
        '#d6cfc2',
        g,
        new THREE.Vector3(-14.5, 40.5, 2.0),
        new THREE.Vector3(-30.0, 28.0, 32.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB105. Phosphor-Bronze Spring ESD Continuity Wiper Brushes (Sliding Shelf-to-Pilaster Ground)
  // =========================================================================
  {
    const g = new THREE.Group();
    const shelfYs = [DB_DIM.SHELF_TOP_Y, DB_DIM.SHELF_MID_Y, DB_DIM.SHELF_LOW_Y];
    for (const sy of shelfYs) {
      for (const sx of [-1, 1]) {
        const wg = new THREE.Group();
        wg.position.set(sx * 24.4, sy - 0.8, -11.5);
        // Spring-steel clip body clamped onto moving inner telescopic rail
        const clip = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2.2, 3.6), mats.stainlessMachined);
        // Twin curved phosphor-bronze leaf-spring wiper fingers (always wiping grounded steel pilaster!)
        for (const dz of [-0.9, 0.9]) {
          const finger = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.32, 0.82), pal.brassPrecision);
          finger.position.set(sx * 0.72, 0.25, dz);
          finger.rotation.z = sx * -0.35;
          const contactTip = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), mats.goldPlating);
          contactTip.position.set(sx * 1.38, 0.0, dz);
          wg.add(finger, contactTip);
        }
        // Inline 1 MΩ ESD soft-bleed chip resistor pill (prevents sharp static sparks!)
        const res = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 1.25), pal.pcbEmeraldDark);
        res.position.set(-sx * 0.45, 0.5, 0);
        wg.add(clip, res);
        g.add(wg);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-shelf-esd-wiper-brush',
        105,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-36.0, -6.0, 18.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB106. Gold-Plated 150 μm Pitch Interdigital PCB Condensation / Leak Sensor Strip
  // =========================================================================
  {
    const g = new THREE.Group();
    // Hydrophobic FR-4 slim catch-tray PCB directly beneath TEC cold-plate & wick trough (DB39)
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.55, 3.8), pal.pcbEmeraldDark);
    // Interlocking ENIG gold-plated comb fingers (catches a single 10 μL stray water droplet!)
    for (let i = -7; i <= 7; i++) {
      const combA = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 2.4), mats.goldPlating);
      combA.position.set(i * 1.05 - 0.22, 0.34, 0.25);
      combA.userData.noEdges = true;
      const combB = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 2.4), mats.goldPlating);
      combB.position.set(i * 1.05 + 0.22, 0.34, -0.25);
      combB.userData.noEdges = true;
      g.add(combA, combB);
    }
    // Front & rear gold collector bus rails
    const busA = new THREE.Mesh(new THREE.BoxGeometry(16.2, 0.16, 0.36), mats.goldPlating);
    busA.position.set(0, 0.34, 1.48);
    const busB = new THREE.Mesh(new THREE.BoxGeometry(16.2, 0.16, 0.36), mats.goldPlating);
    busB.position.set(0, 0.34, -1.48);
    // AC-excited impedance-comparator IC (avoids DC electrolytic corrosion of traces!)
    const ic = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.55, 1.6), mats.icEpoxy);
    ic.position.set(8.2, 0.48, 0);
    g.add(pcb, busA, busB, ic);

    parts.push(
      finalizeDryboxPart(
        'db-interdigital-condensation-strip',
        106,
        '#eab308',
        g,
        new THREE.Vector3(0, -24.6, -24.2),
        new THREE.Vector3(-16.0, -28.0, -32.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB107. PEM Anode Octahedral α-MnO₂ / La-Doped Catalytic Ozone (O₃→O₂) Decomposition Mesh
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stainless retaining frame sitting across interior-facing PEM anode aperture
    const frameShape = createFrameShape(13.8, 11.4, 0.9, 11.8, 9.4, 0.6);
    const frame = new THREE.Mesh(extrudeCentered(frameShape, 0.95, 0.05, 0.05, 10), mats.stainlessMachined);
    g.add(frame);
    // Corrugated dark manganese-oxide (OMS-2 / La-α-MnO2) honeycomb catalytic converter lattice
    for (let ix = -4; ix <= 4; ix++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.28, 9.2, 0.78), pal.carbonPelletDark);
      slat.position.set(ix * 1.25, 0, 0);
      slat.userData.noEdges = true;
      g.add(slat);
    }
    for (let iy = -3; iy <= 3; iy++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.28, 0.78), pal.carbonPelletDark);
      bar.position.set(0, iy * 1.32, 0);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    // Catalytic MnO2 nanoparticle washcoat sheen plate
    const washcoat = new THREE.Mesh(new THREE.BoxGeometry(11.4, 9.0, 0.34), pal.copperIonTeal);
    g.add(washcoat);

    parts.push(
      finalizeDryboxPart(
        'db-pem-mno2-ozone-catalyst',
        107,
        '#0f766e',
        g,
        new THREE.Vector3(0, 14.5, -24.2),
        new THREE.Vector3(-22.0, 22.0, -38.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB108. PEM Cathode Hydrophobic PTFE-Treated Carbon Fiber Paper GDL + Microporous Layer (MPL)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual opposing carbon-fiber Toray paper Gas Diffusion Layers (GDL) sandwiching PEM core
    for (const sz of [-0.65, 0.65]) {
      const gdl = new THREE.Mesh(new THREE.BoxGeometry(11.2, 9.0, 0.28), pal.xpeCharcoalFoam);
      gdl.position.z = sz;
      // Thin white hydrophobic PTFE-enriched Microporous Layer (MPL) sub-skin preventing pore flooding
      const mpl = new THREE.Mesh(new THREE.BoxGeometry(10.8, 8.6, 0.12), pal.ptfeCleanWhite);
      mpl.position.z = sz - Math.sign(sz) * 0.18;
      // Laser-ablated micro-channel drainage grooves along cathode face
      for (let i = -3; i <= 3; i++) {
        const ch = new THREE.Mesh(new THREE.BoxGeometry(0.18, 8.2, 0.08), pal.pemNafionCyan);
        ch.position.set(i * 1.45, 0, sz + Math.sign(sz) * 0.16);
        ch.userData.noEdges = true;
        g.add(ch);
      }
      g.add(gdl, mpl);
    }
    // Perimeter Kapton sub-gasket frame sealing GDL perimeter against gas crossover
    const subGasket = createFrameShape(12.2, 10.0, 0.5, 11.1, 8.9, 0.35);
    const gasketMesh = new THREE.Mesh(extrudeCentered(subGasket, 1.55, 0.02, 0.02, 8), pal.kaptonAmberFilm);
    g.add(gasketMesh);

    parts.push(
      finalizeDryboxPart(
        'db-pem-carbon-gdl-mpl',
        108,
        '#334155',
        g,
        new THREE.Vector3(0, 14.5, -25.1),
        new THREE.Vector3(22.0, 26.0, -36.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB109. 0.5 rpm Silent Brushless Planetary DC Gearmotor + Optical Home-Index Sensor (Zr-MOF Rotor)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Silent brushless DC motor housing + multi-stage precision planetary gearbox cylinder
    const motor = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 3.8, 22), pal.esdPowderShell);
    motor.rotation.x = Math.PI / 2;
    motor.position.set(0, 0, -0.8);
    const gearbox = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.25, 2.4, 22), mats.stainlessMachined);
    gearbox.rotation.x = Math.PI / 2;
    gearbox.position.set(0, 0, 2.2);
    // Delrin low-noise spur drive pinion meshing with Zr-MOF wheel rim
    const pinion = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 1.1, 14), pal.ptfeCleanWhite);
    pinion.rotation.x = Math.PI / 2;
    pinion.position.set(2.4, 0, 2.5);
    // Optical slotted home-index encoder disc & infrared photo-interrupter U-sensor
    const encDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 0.22, 20), pal.ceramicFritBlack);
    encDisc.rotation.x = Math.PI / 2;
    encDisc.position.set(0, 0, 3.6);
    const optoU = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.9, 1.2), pal.pcbEmeraldDark);
    optoU.position.set(0, 1.75, 3.55);
    // Vibration-damped mounting bracket
    const brk = new THREE.Mesh(new THREE.BoxGeometry(5.6, 5.2, 0.65), mats.stainlessMachined);
    brk.position.set(0.8, 0, 1.0);
    g.add(motor, gearbox, pinion, encDisc, optoU, brk);

    parts.push(
      finalizeDryboxPart(
        'db-mof-rotor-gear-motor',
        109,
        '#64748b',
        g,
        new THREE.Vector3(-11.5, -0.5, -25.6),
        new THREE.Vector3(-36.0, 2.0, -44.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB110. Low-Friction PTFE-Felt 270° Adsorption / 90° Regeneration Rotor Sector Wiper Seal
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer circumferential PTFE-felt perimeter wiper ring (prevents bypass around rotor edge)
    const rimRing = new THREE.Mesh(new THREE.TorusGeometry(6.35, 0.42, 10, 36), pal.ptfeCleanWhite);
    g.add(rimRing);
    // Two radial silicone-backed PTFE wiper blades dividing 270° cold adsorption from 90° hot 105°C regen
    const angles = [Math.PI * 0.25, Math.PI * 0.75]; // 90° top-hot sector
    for (const ang of angles) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.55, 6.2, 1.35), pal.ptfeCleanWhite);
      blade.position.set(Math.cos(ang) * 3.1, Math.sin(ang) * 3.1, 0);
      blade.rotation.z = ang - Math.PI / 2;
      // Spring-loaded silicone backing strip keeping constant contact pressure over 10-year wear
      const springBack = new THREE.Mesh(new THREE.BoxGeometry(0.28, 6.0, 1.45), pal.fireRedAccent);
      springBack.position.set(Math.cos(ang) * 3.1, Math.sin(ang) * 3.1, -0.15);
      springBack.rotation.z = ang - Math.PI / 2;
      g.add(blade, springBack);
    }
    // Central PTFE hub seal collar
    const hubSeal = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 1.45, 20), pal.ptfeCleanWhite);
    hubSeal.rotation.x = Math.PI / 2;
    g.add(hubSeal);

    parts.push(
      finalizeDryboxPart(
        'db-mof-rotor-sector-seal',
        110,
        '#f1f5f9',
        g,
        new THREE.Vector3(0, -0.5, -25.0),
        new THREE.Vector3(22.0, 4.0, -44.0),
        cp
      )
    );
  }

  return parts;
}
