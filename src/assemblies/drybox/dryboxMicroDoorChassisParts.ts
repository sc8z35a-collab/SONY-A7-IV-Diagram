//@FLOW_MAP|file=src/assemblies/drybox/dryboxMicroDoorChassisParts.ts|unit=drybox|lines=818|exports=buildDryboxMicroDoorChassisParts
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
 * Build Phase 35B Part 1 (DB45–DB64 — 20 Ultra-Detailed Missing Sub-Assemblies):
 * - Door Glazing, Thermal-Break, Miter Cleats, Emergency Bypass & Hardware (DB45–DB50)
 * - Chassis Corner Gussets, Secondary Inner Airlock, Modular Engine Flange, IP68 Glands,
 *   Butyl CLD Hatch & Analog Reference Hygrometer (DB51–DB56)
 * - 25mm Pilasters & Clips, Anti-Roll Guard Rail & Detent, Telephoto V-Cradle, ESD Card/Filter Tray,
 *   Saturated-Salt Calibration Dock, Flicker-Free LED Driver, Battery Off-Gas MEMS Sensor & Flame Arrestor (DB57–DB64)
 */
export function buildDryboxMicroDoorChassisParts(ctx: DryboxPartBuilderCtx): CadPart[] {
  const { mats, pal, cp } = ctx;
  const parts: CadPart[] = [];

  // =========================================================================
  // DB45. Tempered Glass U-Channel EPDM Glazing Spline & Shore A 80 Setting Blocks
  // =========================================================================
  {
    const g = new THREE.Group();
    // Continuous U-channel EPDM glazing gasket hugging glass perimeter inside aluminum door pocket
    const splineShape = createFrameShape(45.2, 86.6, 1.3, 43.4, 84.8, 1.0);
    const splineFront = new THREE.Mesh(extrudeCentered(splineShape, 0.36, 0.04, 0.04, 10), pal.glazingEpdmMatte);
    splineFront.position.z = 0.52;
    const splineRear = new THREE.Mesh(extrudeCentered(splineShape, 0.36, 0.04, 0.04, 10), pal.glazingEpdmMatte);
    splineRear.position.z = -0.52;
    // Web connecting front/rear glazing lips
    const webShape = createFrameShape(45.4, 86.8, 1.32, 44.5, 85.9, 1.15);
    const web = new THREE.Mesh(extrudeCentered(webShape, 1.25, 0.03, 0.03, 10), pal.glazingEpdmMatte);
    g.add(splineFront, splineRear, web);

    // 2 Bottom Load-Bearing Shore A 80 EPDM Setting Blocks (at 1/4 span points!) + 4 Side Location Blocks
    for (const bx of [-11.5, 11.5]) {
      const sb = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.05, 1.45), pal.seismicGelBlue);
      sb.position.set(bx, -43.3, 0);
      g.add(sb);
    }
    for (const sx of [-1, 1]) {
      for (const sy of [-24.0, 24.0]) {
        const lb = new THREE.Mesh(new THREE.BoxGeometry(0.95, 3.8, 1.35), pal.seismicGelBlue);
        lb.position.set(sx * 22.55, sy, 0);
        g.add(lb);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-glazing-uchannel-blocks',
        45,
        '#111827',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 25.35),
        new THREE.Vector3(-4.0, 0, 56.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // DB46. 45° CNC Miter Corner Die-Cast L-Cleat Keys & Butyl Corner Moisture Seals
  // =========================================================================
  {
    const g = new THREE.Group();
    const corners: Array<[number, number]> = [
      [-1, 1],
      [1, 1],
      [-1, -1],
      [1, -1],
    ];
    for (const [sx, sy] of corners) {
      const cg = new THREE.Group();
      cg.position.set(sx * 23.6, sy * 44.2, 0);
      // Heavy extruded zinc-aluminum L-cleat legs with serrated crimping grooves
      const legH = new THREE.Mesh(new THREE.BoxGeometry(7.2, 1.9, 1.35), mats.stainlessMachined);
      legH.position.set(-sx * 2.2, 0, 0);
      const legV = new THREE.Mesh(new THREE.BoxGeometry(1.9, 7.2, 1.35), mats.stainlessMachined);
      legV.position.set(0, -sy * 2.2, 0);
      // Spring-loaded corner alignment button & 2 crimping pins
      const crimp1 = makeCabinetBolt(0.45, 1.6, pal.brassPrecision);
      crimp1.position.set(-sx * 3.8, 0, 0);
      const crimp2 = makeCabinetBolt(0.45, 1.6, pal.brassPrecision);
      crimp2.position.set(0, -sy * 3.8, 0);
      // 45° diagonal butyl corner moisture-barrier sealant bead
      const seal = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.55, 1.55), pal.butylCldFoil);
      seal.rotation.z = sx * sy * (Math.PI / 4);
      seal.position.set(sx * 0.4, sy * 0.4, 0);
      cg.add(legH, legV, crimp1, crimp2, seal);
      g.add(cg);
    }

    parts.push(
      finalizeDryboxPart(
        'db-miter-corner-cleats',
        46,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 25.4),
        new THREE.Vector3(0, 6.0, 49.5),
        cp
      )
    );
  }

  // =========================================================================
  // DB47. Emergency Mechanical Dimple-Key Override Cylinder & 5V USB-C Jump Port
  // =========================================================================
  {
    const g = new THREE.Group();
    // Machined brushed-steel lock escutcheon tucked right below biometric pad on right door stile
    const housing = new THREE.Mesh(new THREE.BoxGeometry(2.6, 8.6, 2.2), mats.matteBlackAnodized);
    // Brass 6-pin dimple key cylinder barrel + anti-drill hardened steel faceplate
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 2.5, 18), pal.brassPrecision);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 1.8, 0.15);
    const faceRing = new THREE.Mesh(new THREE.TorusGeometry(0.96, 0.16, 8, 18), mats.stainlessMachined);
    faceRing.position.set(0, 1.8, 1.38);
    const keySlot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.15, 0.2), pal.einkInkDark);
    keySlot.position.set(0, 1.8, 1.45);
    // Rear rotary cam lever linking mechanically to solenoid deadbolt retraction
    const camArm = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.2, 0.45), mats.stainlessMachined);
    camArm.position.set(-0.3, 0.6, -1.25);
    camArm.rotation.z = 0.35;
    // Lower sealed 5V USB-C emergency jump-start receptacle with tethered silicone dust plug
    const usbBezel = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.82, 0.45), mats.stainlessMachined);
    usbBezel.position.set(0, -2.3, 1.05);
    const usbTongue = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.22, 0.5), pal.rubyThermalFuse);
    usbTongue.position.set(0, -2.3, 1.12);
    const dustFlap = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.1, 0.22), pal.glazingEpdmMatte);
    dustFlap.position.set(0, -3.35, 1.18);
    g.add(housing, barrel, faceRing, keySlot, camArm, usbBezel, usbTongue, dustFlap);

    parts.push(
      finalizeDryboxPart(
        'db-emergency-key-usbc-jump',
        47,
        '#d4a137',
        g,
        new THREE.Vector3(24.7, -14.2, 25.7),
        new THREE.Vector3(22.0, -8.0, 54.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB48. Ferritic SUS430 Magnetic Strike Strip & Anti-Rattle POM Latch Pocket
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-perimeter ferritic 430 stainless ferromagnetic attraction frame on cabinet front lip
    const stripShape = createFrameShape(51.8, 93.4, 1.8, 46.8, 88.4, 1.1);
    const strip = new THREE.Mesh(extrudeCentered(stripShape, 0.45, 0.04, 0.04, 12), pal.ferritic430Steel);
    g.add(strip);

    // Slotted adjustable stainless deadbolt strike receiver box on right mullion
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(2.4, 9.2, 2.8), pal.ferritic430Steel);
    pocket.position.set(24.6, -2.0, -1.2);
    // Low-friction black POM acetal anti-rattle latch liner inside strike slot
    const pomLiner = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.2, 2.2), pal.glazingEpdmMatte);
    pomLiner.position.set(24.6, -2.0, -1.1);
    // 2 vertical slotted adjustment screws
    for (const sy of [-5.2, 1.2]) {
      const sc = makeCabinetBolt(0.38, 0.6, mats.stainlessMachined);
      sc.position.set(24.6, sy, 0.35);
      g.add(sc);
    }
    g.add(pocket, pomLiner);

    parts.push(
      finalizeDryboxPart(
        'db-ferritic430-strike-plate',
        48,
        '#a8b2be',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 23.85),
        new THREE.Vector3(14.0, 0, 26.5),
        cp
      )
    );
  }

  // =========================================================================
  // DB49. Mechanical 110°/180° Door Over-Swing Stopper & PTFE Thrust Washers
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const hy of [31.5, -37.8]) {
      const sg = new THREE.Group();
      sg.position.set(-25.8, hy, 23.6);
      // Articulated stainless friction-track limit arm with curved stop cam
      const track = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 7.6), mats.stainlessMachined);
      track.position.set(0.6, 0, -2.2);
      const stopPin = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.6, 12), pal.brassPrecision);
      stopPin.position.set(0.6, 0, -4.8);
      // Elastomer end-stop bumper absorbing over-swing kinetic energy
      const bumper = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 1.2, 14), pal.glazingEpdmMatte);
      bumper.position.set(0.6, 0, -5.6);
      // 3 stacked self-lubricating virgin PTFE hinge thrust washers carrying vertical door weight
      for (let w = 0; w < 3; w++) {
        const washer = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.24, 16), pal.ptfeCleanWhite);
        washer.position.set(-0.35, -1.6 + w * 0.32, 0.65);
        sg.add(washer);
      }
      sg.add(track, stopPin, bumper);
      g.add(sg);
    }

    parts.push(
      finalizeDryboxPart(
        'db-door-swing-stopper-ptfe',
        49,
        '#f8fafc',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-28.0, 0, 34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB50. PA66-GF25 Polyamide Thermal-Break Bridge & Snap-In Glazing Bead
  // =========================================================================
  {
    const g = new THREE.Group();
    // Continuous double-web glass-fiber-reinforced polyamide (PA66-GF25, λ=0.30 W/m·K) thermal break frame
    const breakOuter = createFrameShape(51.4, 93.0, 2.0, 46.2, 87.8, 1.35);
    const pa66Bridge = new THREE.Mesh(extrudeCentered(breakOuter, 1.15, 0.05, 0.05, 12), pal.pa66ThermalBreak);
    pa66Bridge.position.z = 0;

    // Inner snap-in aluminum glazing retention bead locking the glass cleanly from inside
    const beadShape = createFrameShape(46.0, 87.4, 1.32, 43.8, 85.2, 1.08);
    const innerBead = new THREE.Mesh(extrudeCentered(beadShape, 0.65, 0.08, 0.08, 12), mats.lensBarrelAnodized);
    innerBead.position.z = -0.82;

    // Subtle micro-drain/pressure relief slots along bottom sill thermal cavity
    for (const sx of [-12.0, 0, 12.0]) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 0.5), pal.einkInkDark);
      slot.position.set(sx, -45.1, -0.5);
      g.add(slot);
    }
    g.add(pa66Bridge, innerBead);

    parts.push(
      finalizeDryboxPart(
        'db-pa66-thermal-break-bead',
        50,
        '#475569',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 25.3),
        new THREE.Vector3(5.0, -4.0, 44.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB51. Continuous Seam-Weld Corner Gussets & Vertical C-Channel Stiffener Ribs
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 Full-Height Internal C-Channel Vertical Corner Columns preventing racking/twisting
    for (const [sx, sz] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
      const colA = new THREE.Mesh(new THREE.BoxGeometry(1.1, 98.0, 0.55), mats.midPlateSteel);
      colA.position.set(sx * 25.2, 0, sz * 21.8);
      const colB = new THREE.Mesh(new THREE.BoxGeometry(0.55, 98.0, 1.4), mats.midPlateSteel);
      colB.position.set(sx * 25.6, 0, sz * 21.3);
      g.add(colA, colB);
    }
    // 8 Triangular Corner Gusset Plates welded at top/bottom corners (high torsional rigidity!)
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        for (const sz of [-1, 1]) {
          const gus = new THREE.Mesh(new THREE.BoxGeometry(4.6, 4.6, 0.55), pal.ferritic430Steel);
          gus.position.set(sx * 23.2, sy * 48.2, sz * 21.6);
          g.add(gus);
        }
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-chassis-corner-gussets',
        51,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-22.0, 14.0, -10.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB52. Secondary Inner Closed-Cell Silicone Bulb Seal (Double-Gasket Airlock)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Continuous secondary soft-compression silicone airlock bulb seated inside main magnetic gasket
    const bulbShape = createFrameShape(47.8, 89.2, 1.4, 46.2, 87.6, 1.15);
    const bulb = new THREE.Mesh(extrudeCentered(bulbShape, 1.05, 0.25, 0.25, 14), pal.ptfeCleanWhite);
    // Rigid aluminum snap-fit carrier rail behind the silicone bulb
    const carrierShape = createFrameShape(48.2, 89.6, 1.45, 47.0, 88.4, 1.25);
    const carrier = new THREE.Mesh(extrudeCentered(carrierShape, 0.55, 0.04, 0.04, 10), mats.matteBlackAnodized);
    carrier.position.z = -0.68;
    g.add(bulb, carrier);

    parts.push(
      finalizeDryboxPart(
        'db-inner-silicone-airlock',
        52,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 24.3),
        new THREE.Vector3(0, -3.0, 31.5),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB53. Modular Dehumidifier Service Flange, Silicone O-Ring & Captive Thumbscrews
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision stainless mounting bezel plate on rear cabinet cutout allowing modular engine swap
    const flangeShape = createFrameShape(28.0, 56.0, 1.8, 22.8, 50.8, 1.2);
    const flange = new THREE.Mesh(extrudeCentered(flangeShape, 0.75, 0.08, 0.08, 12), mats.stainlessMachined);
    // Molded amber-orange FKM/silicone perimeter O-ring seal seated in machined face groove
    const oRingShape = createFrameShape(25.6, 53.6, 1.5, 24.2, 52.2, 1.3);
    const oRing = new THREE.Mesh(extrudeCentered(oRingShape, 0.52, 0.14, 0.14, 12), pal.ptcTerracotta);
    oRing.position.z = 0.42;
    g.add(flange, oRing);

    // 8 Tool-Free Knurled Captive Stainless Thumbscrews around the service flange
    const screwPts: Array<[number, number]> = [
      [-12.4, 26.2],
      [12.4, 26.2],
      [-12.4, 8.8],
      [12.4, 8.8],
      [-12.4, -8.8],
      [12.4, -8.8],
      [-12.4, -26.2],
      [12.4, -26.2],
    ];
    for (const [sx, sy] of screwPts) {
      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 1.1, 14), mats.stainlessMachined);
      head.rotation.x = Math.PI / 2;
      head.position.set(sx, sy, -0.78);
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.8, 10), pal.brassPrecision);
      collar.rotation.x = Math.PI / 2;
      collar.position.set(sx, sy, 0.25);
      g.add(head, collar);
    }

    parts.push(
      finalizeDryboxPart(
        'db-engine-service-flange',
        53,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -1.0, -24.3),
        new THREE.Vector3(0, 0, -20.5),
        cp
      )
    );
  }

  // =========================================================================
  // DB54. IP68 M16 Hermetic Cable Glands & Dual-Diaphragm Silicone Wire Grommets
  // =========================================================================
  {
    const g = new THREE.Group();
    const glandCoords: Array<[number, number, number]> = [
      [-14.5, -34.0, -23.8], // Main power + USB-C hub pass-through
      [-14.5, 29.5, -23.8],  // Upper SHT45 + Ra97 LED + E-Ink harness pass-through
      [14.5, -24.0, -23.8],  // Lower SHT45 + Battery off-gas + Damper pass-through
      [14.5, 16.5, -23.8],   // UV-C / Maglev fan / N2 solenoid pass-through
    ];
    for (const [gx, gy, gz] of glandCoords) {
      const gg = new THREE.Group();
      gg.position.set(gx, gy, gz);
      // Nickel-plated brass hex body & compression dome nut
      const hexBody = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 1.4, 6), mats.stainlessMachined);
      hexBody.rotation.x = Math.PI / 2;
      const domeNut = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.38, 1.6, 12), mats.matteBlackAnodized);
      domeNut.rotation.x = Math.PI / 2;
      domeNut.position.z = -1.45;
      // Dual-diaphragm translucent blue-cyan silicone potting barrier seal
      const sealRing = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.24, 8, 16), pal.seismicGelBlue);
      sealRing.position.z = 0.65;
      const innerDiaphragm = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 1.1, 14), pal.seismicGelBlue);
      innerDiaphragm.rotation.x = Math.PI / 2;
      innerDiaphragm.position.z = 1.1;
      // Strain-relief flexible spiral boot
      const boot = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.92, 1.5, 12), pal.glazingEpdmMatte);
      boot.rotation.x = Math.PI / 2;
      boot.position.z = -2.65;
      gg.add(hexBody, domeNut, sealRing, innerDiaphragm, boot);
      g.add(gg);
    }

    parts.push(
      finalizeDryboxPart(
        'db-ip68-hermetic-glands',
        54,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-18.0, -8.0, -26.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB55. Rear Service Access Hatch & Constrained-Layer Butyl-Alu Damping Pads
  // =========================================================================
  {
    const g = new THREE.Group();
    // Removable lower-rear service hatch granting tool-less access to PSU/Backup without breaking chamber seal
    const hatchShape = createRoundedRectShape(42.0, 22.0, 1.6);
    const hatch = new THREE.Mesh(extrudeCentered(hatchShape, 0.65, 0.08, 0.08, 12), pal.esdPowderShell);
    hatch.position.set(0, -37.0, -25.2);
    // 4 quick-release quarter-turn Camloc fasteners
    for (const [fx, fy] of [[-19.2, -28.0], [19.2, -28.0], [-19.2, -46.0], [19.2, -46.0]]) {
      const q = makeCabinetBolt(0.55, 0.9, pal.brassPrecision);
      q.position.set(fx, fy, -25.55);
      g.add(q);
    }
    // 4 Constrained-Layer Damping (CLD) Butyl + Stiff Aluminum Foil Vibration Pads on side/top inner steel panels
    for (const sx of [-1, 1]) {
      const butyl = new THREE.Mesh(new THREE.BoxGeometry(0.45, 34.0, 24.0), pal.glazingEpdmMatte);
      butyl.position.set(sx * 25.8, 12.0, -2.0);
      const foil = new THREE.Mesh(new THREE.BoxGeometry(0.18, 33.2, 23.2), pal.butylCldFoil);
      foil.position.set(sx * 25.45, 12.0, -2.0);
      g.add(butyl, foil);
    }
    g.add(hatch);

    parts.push(
      finalizeDryboxPart(
        'db-rear-hatch-butyl-cld',
        55,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(24.0, -16.0, -48.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB56. Zero-Power Synthetic-Hair Mechanical Analog Reference Hygrometer Dial
  // =========================================================================
  {
    const g = new THREE.Group();
    // Machined brushed-brass bezel housing (Fischer/Barigo archival grade) mounted on upper inner right wall
    const caseBody = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.5, 1.35, 28), pal.brassPrecision);
    caseBody.rotation.x = Math.PI / 2;
    const face = new THREE.Mesh(new THREE.CylinderGeometry(2.95, 2.95, 0.22, 28), pal.einkPaper);
    face.rotation.x = Math.PI / 2;
    face.position.z = 0.62;
    // Green 35–45% RH archival golden-zone arc indicator on dial
    const greenArc = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.24, 6, 18, Math.PI * 0.32), pal.mofEmerald);
    greenArc.position.z = 0.76;
    greenArc.rotation.z = Math.PI * 0.34;
    // High-contrast red mechanical pointer needle resting at 40% RH
    const needle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.45, 0.14), pal.rubyThermalFuse);
    needle.position.set(0.1, 0.85, 0.84);
    needle.rotation.z = -0.14;
    const pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.28, 12), pal.einkInkDark);
    pivot.rotation.x = Math.PI / 2;
    pivot.position.z = 0.86;
    // Rear synthetic-hair hygrometric tensioning coil + calibration set-screw
    const hairCoil = new THREE.Mesh(createHelicalSpringGeometry(1.1, 0.45, 4, 0.08), mats.stainlessMachined);
    hairCoil.rotation.x = Math.PI / 2;
    hairCoil.position.z = -0.4;
    const calScrew = makeCabinetBolt(0.35, 0.5, pal.brassPrecision);
    calScrew.position.set(0, -1.6, -0.78);
    // Clear mineral crystal lens cover
    const crystal = new THREE.Mesh(new THREE.CylinderGeometry(3.05, 3.05, 0.16, 28), pal.loweGlassClear);
    crystal.rotation.x = Math.PI / 2;
    crystal.position.z = 0.94;
    g.add(caseBody, face, greenArc, needle, pivot, hairCoil, calScrew, crystal);

    parts.push(
      finalizeDryboxPart(
        'db-analog-hair-hygrometer',
        56,
        '#d97706',
        g,
        new THREE.Vector3(16.8, 34.5, -16.8),
        new THREE.Vector3(24.0, 26.0, 22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB57. 25mm-Pitch Vertical Slotted Pilaster Standards & Tool-Free Spring Clips
  // =========================================================================
  {
    const g = new THREE.Group();
    const xs = [-22.6, 22.6];
    const zs = [-14.2, 13.8];
    for (const px of xs) {
      for (const pz of zs) {
        // Vertical C-channel stainless steel pilaster standard
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.85, 86.0, 1.45), mats.stainlessMachined);
        bar.position.set(px, 2.0, pz);
        g.add(bar);
        // 25mm-pitch adjustment slot notches along entire height
        for (let y = -36; y <= 39; y += 5.0) {
          const slot = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.35, 0.55), pal.einkInkDark);
          slot.position.set(px, y, pz);
          slot.userData.noEdges = true;
          g.add(slot);
        }
        // Tool-free spring-lock steel shelf support clips seated at each shelf height
        for (const sy of [DB_DIM.SHELF_TOP_Y, DB_DIM.SHELF_MID_Y, DB_DIM.SHELF_LOW_Y]) {
          const clip = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.0, 2.1), pal.brassPrecision);
          clip.position.set(px + (px < 0 ? 0.55 : -0.55), sy - 0.85, pz);
          g.add(clip);
        }
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-pilaster-shelf-clips',
        57,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(34.0, 0, 12.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB58. Front Silicone-Sleeved Anti-Roll Lens Guard Rail & Seismic Drawer Detent
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sy of [DB_DIM.SHELF_TOP_Y, DB_DIM.SHELF_MID_Y, DB_DIM.SHELF_LOW_Y]) {
      // Front stainless bar with soft dark silicone sleeve stopping heavy lenses rolling during earthquakes
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 42.6, 12), pal.glazingEpdmMatte);
      rail.rotation.z = Math.PI / 2;
      rail.position.set(0, sy + 2.3, 15.8);
      // 2 machined stainless end stanchions + center seismic pull-stop thumb detent latch
      for (const sx of [-20.8, 20.8]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.75, 2.4, 0.9), mats.stainlessMachined);
        post.position.set(sx, sy + 1.25, 15.8);
        g.add(post);
      }
      const detentBody = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.0, 1.4), pal.fireRedAccent);
      detentBody.position.set(0, sy - 0.55, 16.0);
      const detentLatch = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.7), mats.stainlessMachined);
      detentLatch.position.set(0, sy - 0.9, 16.35);
      g.add(rail, detentBody, detentLatch);
    }

    parts.push(
      finalizeDryboxPart(
        'db-antiroll-rail-detent',
        58,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 3.0, 42.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB59. Super-Telephoto Tripod-Foot V-Cradle & Magnetic Velvet-Flocked Dividers
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision CNC aluminum V-block tripod-foot support on Top Shelf under 70-200/600mm barrel
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.75, 14.0), mats.matteBlackAnodized);
    basePlate.position.set(5.5, DB_DIM.SHELF_TOP_Y + 1.15, 0.8);
    for (const sz of [-4.2, 4.2]) {
      const vArm = new THREE.Mesh(new THREE.BoxGeometry(8.8, 2.2, 1.3), mats.stainlessMachined);
      vArm.position.set(5.5, DB_DIM.SHELF_TOP_Y + 2.45, 0.8 + sz);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(8.9, 0.5, 1.4), pal.xpeCharcoalFoam);
      pad.position.set(5.5, DB_DIM.SHELF_TOP_Y + 3.65, 0.8 + sz);
      g.add(vArm, pad);
    }
    // 2 Repositionable Magnetic Velvet-Flocked Aluminum Partition Dividers on Middle & Lower Shelves
    for (const [dx, dy] of [[4.2, DB_DIM.SHELF_MID_Y], [0.5, DB_DIM.SHELF_LOW_Y]]) {
      const divWall = new THREE.Mesh(new THREE.BoxGeometry(0.65, 9.2, 26.5), mats.mountVelvetBaffle);
      divWall.position.set(dx, dy + 5.2, 0.5);
      const magFoot = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.45, 26.5), mats.neodymiumMagnet);
      magFoot.position.set(dx, dy + 0.72, 0.5);
      g.add(divWall, magFoot);
    }
    g.add(basePlate);

    parts.push(
      finalizeDryboxPart(
        'db-telephoto-vcradle-dividers',
        59,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(16.0, 9.0, 32.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB60. Conductive ESD CFexpress/SD Memory Card & Optical Filter Organizer Tray
  // =========================================================================
  {
    const g = new THREE.Group();
    // CNC-milled conductive black ESD foam insert resting on right side of middle tray
    const tray = makeHorizBoxPlate(15.5, 22.0, 2.1, 0.9, pal.xpeCharcoalFoam, 0.08);
    // 4 recessed CFexpress Type A/B & SD UHS-II card slots with vibrant gold/teal cards standing inside
    for (let i = 0; i < 4; i++) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.2, 0.55), pal.einkInkDark);
      slot.position.set(-3.8, 0.65, -7.2 + i * 2.6);
      const card = new THREE.Mesh(
        new THREE.BoxGeometry(4.4, 3.0, 0.28),
        i < 2 ? mats.gMasterRedBadge : pal.seismicGelBlue
      );
      card.position.set(-3.8, 2.0, -7.2 + i * 2.6);
      g.add(slot, card);
    }
    // 2 circular 77mm/82mm CPL & ND optical filter wells with multi-coated glass filters seated inside
    for (let j = 0; j < 2; j++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.32, 8, 22), mats.matteBlackAnodized);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(3.4, 1.35, -3.8 + j * 7.8);
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(2.9, 2.9, 0.18, 22), pal.arItoFilm);
      glass.position.set(3.4, 1.35, -3.8 + j * 7.8);
      g.add(ring, glass);
    }
    g.add(tray);

    parts.push(
      finalizeDryboxPart(
        'db-esd-card-filter-tray',
        60,
        '#0ea5e9',
        g,
        new THREE.Vector3(12.8, DB_DIM.SHELF_MID_Y + 1.55, 2.2),
        new THREE.Vector3(24.0, 4.0, 38.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB61. ISO 483 / ASTM E104 Saturated-Salt (MgCl2 / NaCl) Field Calibration Port
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left exterior wall airtight threaded calibration access bung + internal stainless reference dock
    const outerBoss = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 1.6, 18), mats.stainlessMachined);
    outerBoss.rotation.z = Math.PI / 2;
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 1.0, 6), pal.brassPrecision);
    cap.rotation.z = Math.PI / 2;
    cap.position.x = -1.25;
    const oRing = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.22, 8, 18), pal.ptcTerracotta);
    oRing.rotation.y = Math.PI / 2;
    oRing.position.x = -0.65;
    // Internal miniature saturated-salt (MgCl2 32.8% RH) calibration chamber cup with hydrophobic PTFE membrane lid
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.5, 3.2, 18), pal.loweGlassClear);
    cup.rotation.z = Math.PI / 2;
    cup.position.x = 2.4;
    const saltCrystal = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.35, 1.6, 16), pal.ptfeCleanWhite);
    saltCrystal.rotation.z = Math.PI / 2;
    saltCrystal.position.x = 2.9;
    g.add(outerBoss, cap, oRing, cup, saltCrystal);

    parts.push(
      finalizeDryboxPart(
        'db-saturated-salt-cal-port',
        61,
        '#14b8a6',
        g,
        new THREE.Vector3(-27.2, 14.0, 2.0),
        new THREE.Vector3(-34.0, 6.0, 8.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB62. CCR + >25kHz Flicker-Free Soft-Fade LED Driver & Micro-Prism Diffuser
  // =========================================================================
  {
    const g = new THREE.Group();
    // Constant-current linear/T-PWM >25 kHz flicker-free LED driver module mounted under top deck
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.75, 5.4), pal.pcbEmeraldDark);
    const driverIc = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.65, 2.6), mats.icEpoxy);
    driverIc.position.set(-2.2, -0.6, 0);
    const inductor = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 1.1, 14), mats.ferriteInductor);
    inductor.position.set(1.6, -0.8, 0);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.2, 12), pal.seismicGelBlue);
    cap.position.set(4.0, -0.85, 0);
    // Micro-prism polycarbonate optical diffuser rails clipping onto DB24 vertical LED bars
    for (const sx of [-1, 1]) {
      const prismLens = new THREE.Mesh(new THREE.BoxGeometry(0.95, 81.0, 0.42), pal.loweGlassClear);
      prismLens.position.set(sx * 22.1, -46.5, 12.2);
      prismLens.rotation.y = sx * -0.45;
      g.add(prismLens);
    }
    g.add(pcb, driverIc, inductor, cap);

    parts.push(
      finalizeDryboxPart(
        'db-flickerfree-led-driver',
        62,
        '#fde047',
        g,
        new THREE.Vector3(0, 44.0, 7.6),
        new THREE.Vector3(0, 24.0, 22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB63. Battery-Bay Early Off-Gas H2/CO MEMS Thermal-Runaway Detector & Relay
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mounted on fireproof battery bay ceiling right above Li-Ion packs (detects H2/CO 5–15 min BEFORE fire!)
    const board = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.65, 6.2), pal.pcbEmeraldDark);
    // Perforated stainless MEMS H2/CO off-gas molecular property sensor cap
    const gasCap = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 1.25, 18), pal.sintered316L);
    gasCap.position.set(-3.2, -0.95, 0);
    // Heavy-duty 16A mechanical latching cutoff relay (disconnects USB-C PD 3.1 instantly on H2 > 50 ppm!)
    const relay = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.2, 2.8), pal.rubyThermalFuse);
    relay.position.set(2.4, -1.35, 0);
    // Status diagnostic LED + gold header
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), pal.fireRedAccent);
    led.position.set(-0.2, -0.65, 2.0);
    g.add(board, gasCap, relay, led);

    parts.push(
      finalizeDryboxPart(
        'db-battery-h2co-offgas-sensor',
        63,
        '#e11d48',
        g,
        new THREE.Vector3(0, DB_DIM.BATT_DRAWER_Y + 6.4, 2.0),
        new THREE.Vector3(-14.0, -18.0, 38.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB64. Sintered 316L Stainless MESG Flame-Arrestor Pressure Relief Vent
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rear exhaust outlet of VDMA fireproof battery bay: lets venting pressure escape while quenching H2 flames (<0.29mm MESG!)
    const flange = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 0.75, 20), mats.stainlessMachined);
    flange.rotation.x = Math.PI / 2;
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.15, 3.6, 20), pal.fireRedAccent);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -1.9;
    // Porous sintered 316L stainless steel micro-mesh flame-quenching core (20 μm pore << 290 μm H2 MESG!)
    const sinterCore = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 2.8, 20), pal.sintered316L);
    sinterCore.rotation.x = Math.PI / 2;
    sinterCore.position.z = -2.4;
    // Spring-loaded burst/relief disc keeping normal dry-chamber airtightness until ΔP > 15 kPa
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.25, 18), pal.brassPrecision);
    disc.rotation.x = Math.PI / 2;
    disc.position.z = 0.45;
    for (let a = 0; a < 4; a++) {
      const ang = (a * Math.PI) / 2 + Math.PI / 4;
      const b = makeCabinetBolt(0.32, 0.65, mats.stainlessMachined);
      b.position.set(Math.cos(ang) * 2.55, Math.sin(ang) * 2.55, -0.45);
      g.add(b);
    }
    g.add(flange, barrel, sinterCore, disc);

    parts.push(
      finalizeDryboxPart(
        'db-battery-flame-arrestor',
        64,
        '#f97316',
        g,
        new THREE.Vector3(-12.5, DB_DIM.BATT_DRAWER_Y + 1.0, -23.6),
        new THREE.Vector3(-24.0, -22.0, -34.0),
        cp
      )
    );
  }

  return parts;
}
