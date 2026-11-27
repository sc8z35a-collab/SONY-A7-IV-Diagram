import * as THREE from 'three';
import { CadPart } from '../types';
import {
  createFrameShape,
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
 * Build Precision Mechanical & Thermal-Safety Expansion Part A (DB151–DB168 — 18 Parts):
 * - EN 1279-2 Warm-Edge IGU Spacer + 3A Molecular Sieve, 3-Point Espagnolette Shootbolt Rods,
 *   Concealed Armored EPT Power Transfer Loop, Door Perimeter Anti-Sweat Heater,
 *   Conical Self-Centering Door Alignment Guide Pins (DB151–DB155)
 * - 2.0 mm C-Channel Base Plinth Sub-Frame, Hermetic Blind PEM Self-Clinching Standoffs,
 *   IP2X Rear Engine Protective Louver Shroud, Recessed Forged SUS304 Bail Lift Handles,
 *   Roxtec Modular Fire/Airtight Inter-Zone Cable Transit (DB156–DB160)
 * - Mechanical Single-Drawer Anti-Tip Interlock Bar, Accuride Hydraulic Soft-Close Damper Cartridges,
 *   Flush Ra98 Collimated Optical Haze/Fungus Transilluminator Pad, ANSI/ESD S20.20 Bipolar Ionizer Bar,
 *   EN 14470-1 72°C Fusible-Link Fire Damper, 1000°C Phlogopite Mica Cell Dividers,
 *   Emergency Shunt-Trip Battery Cutoff Breaker, Dual-Zone Return-Air Intake Louver Plenum (DB161–DB168)
 */
export function buildDryboxPrecisionMechParts(ctx: DryboxPartBuilderCtx): CadPart[] {
  const { mats, pal, cp } = ctx;
  const parts: CadPart[] = [];

  // =========================================================================
  // DB151. EN 1279-2 IGU Warm-Edge Composite Spacer Frame & 3A Molecular Sieve Beads
  // =========================================================================
  {
    const g = new THREE.Group();
    // Low-conductivity stainless-PP composite warm-edge perimeter spacer frame (λ ≈ 0.14 W/m·K)
    const spacerShape = createFrameShape(44.6, 86.0, 0.85, 43.2, 84.6, 0.55);
    const spacerBar = new THREE.Mesh(
      extrudeCentered(spacerShape, 0.36, 0.03, 0.03, 10),
      pal.pa66ThermalBreak
    );
    g.add(spacerBar);

    // Dual-stage PIB primary vapor-barrier seal line along outer perimeter
    const pibShape = createFrameShape(45.1, 86.5, 0.9, 44.55, 85.95, 0.82);
    const pibSeal = new THREE.Mesh(
      extrudeCentered(pibShape, 0.32, 0.01, 0.01, 10),
      pal.glazingEpdmMatte
    );
    g.add(pibSeal);

    // 4 Injection-molded Thermobar gas-fill corner keys + desiccant fill ports
    for (const [cx, cy] of [
      [-21.8, 42.5],
      [21.8, 42.5],
      [-21.8, -42.5],
      [21.8, -42.5],
    ] as Array<[number, number]>) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.15, 0.42), mats.stainlessMachined);
      key.position.set(cx, cy, 0);
      key.userData.noEdges = true;
      g.add(key);
    }

    // Visible cutaway cluster of 3Å molecular sieve zeolite desiccant beads inside top bar
    for (let i = -3; i <= 3; i++) {
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.19, 8, 6), pal.linenBufferBeige);
      bead.position.set(i * 0.48, 42.65, 0.02);
      bead.userData.noEdges = true;
      g.add(bead);
    }

    parts.push(
      finalizeDryboxPart(
        'db-igu-warmedge-spacer',
        151,
        '#475569',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 25.26),
        new THREE.Vector3(0, 3.0, 69.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // DB152. DIRAK/Southco 3-Point Espagnolette Vertical Shootbolt Lock Rods & Cam Gearbox
  // =========================================================================
  {
    const g = new THREE.Group();
    // Central zinc-steel 3-point cam transmission gearbox driving upper & lower rods simultaneously
    const camBox = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.4, 1.45), mats.stainlessMachined);
    camBox.position.set(0, -10.5, 0);
    const camGear = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.7, 14), pal.brassPrecision);
    camGear.rotation.x = Math.PI / 2;
    camGear.position.set(0, -10.5, 0.42);
    g.add(camBox, camGear);

    // Upper & lower AISI 304 vertical shootbolt locking rods (18 mm axial throw)
    const upperRod = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 48.0, 10), pal.hardenedSteelHrc60);
    upperRod.position.set(0, 16.0, 0);
    const lowerRod = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 28.0, 10), pal.hardenedSteelHrc60);
    lowerRod.position.set(0, -27.2, 0);
    g.add(upperRod, lowerRod);

    // Tapered compression-ramp shootbolt tips (top & bottom) + strike receivers
    for (const [ty, dir] of [
      [41.2, 1],
      [-42.2, -1],
    ] as Array<[number, number]>) {
      const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.42, 2.6, 10), pal.hardenedSteelHrc60);
      tip.position.set(0, ty, 0);
      if (dir < 0) tip.rotation.z = Math.PI;
      const receiver = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.6), pal.ferritic430Steel);
      receiver.position.set(0, ty + dir * 1.4, -0.5);
      g.add(tip, receiver);
    }

    // 4 Low-friction POM rod guide bushings along right door stile
    for (const gy of [32.0, 10.0, -20.0, -36.0]) {
      const guide = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.5, 1.25), pal.ptfeCleanWhite);
      guide.position.set(0, gy, 0);
      guide.userData.noEdges = true;
      g.add(guide);
    }

    parts.push(
      finalizeDryboxPart(
        'db-3pt-espagnolette-lockrods',
        152,
        '#94a3b8',
        g,
        new THREE.Vector3(25.0, DB_DIM.DOOR_CY, 24.3),
        new THREE.Vector3(34.0, 0, 58.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB153. Concealed Electrical Power Transfer (EPT) Armored Flexible Door Wire Loop
  // =========================================================================
  {
    const g = new THREE.Group();
    // Recessed stainless mortise channel in hinge jamb + mating channel in door stile
    const jambBox = new THREE.Mesh(new THREE.BoxGeometry(1.5, 11.4, 2.2), mats.stainlessMachined);
    jambBox.position.set(-0.3, 0, -1.1);
    const doorBox = new THREE.Mesh(new THREE.BoxGeometry(1.3, 10.2, 1.4), mats.stainlessMachined);
    doorBox.position.set(0.3, 0, 1.2);
    g.add(jambBox, doorBox);

    // Curved 1/4" spring-steel flexible armored transfer conduit carrying 24V/SPI/SPD power
    const loopCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.3, 3.8, -1.0),
      new THREE.Vector3(-0.9, 2.2, 0.1),
      new THREE.Vector3(-0.7, 0.0, 0.8),
      new THREE.Vector3(-0.2, -2.2, 0.9),
      new THREE.Vector3(0.3, -3.6, 1.1),
    ]);
    const conduit = new THREE.Mesh(
      new THREE.TubeGeometry(loopCurve, 18, 0.36, 10, false),
      pal.hardenedSteelHrc60
    );
    g.add(conduit);

    // Dual EPDM strain-relief hermetic wire glands at top/bottom ends
    for (const [gx, gy, gz] of [
      [-0.3, 4.4, -1.1],
      [0.3, -4.1, 1.1],
    ] as Array<[number, number, number]>) {
      const boot = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.56, 1.1, 10), pal.glazingEpdmMatte);
      boot.position.set(gx, gy, gz);
      boot.userData.noEdges = true;
      g.add(boot);
    }

    parts.push(
      finalizeDryboxPart(
        'db-ept-armored-door-loop',
        153,
        '#64748b',
        g,
        new THREE.Vector3(-25.8, 16.0, 23.0),
        new THREE.Vector3(-36.0, 14.0, 40.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB154. Door-Frame Perimeter Anti-Condensation (Anti-Sweat) 24V Polyimide Trace Heater
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-thin Kapton polyimide etched-foil heating ribbon embedded around front steel door flange
    const frameShape = createFrameShape(52.4, 94.0, 1.0, 51.0, 92.6, 0.75);
    const traceRibbon = new THREE.Mesh(
      extrudeCentered(frameShape, 0.14, 0.01, 0.01, 10),
      pal.kaptonAmberFilm
    );
    g.add(traceRibbon);

    // Copper serpentine heating element foil accents on top and bottom rails
    for (const ry of [46.65, -46.65]) {
      const cuTrace = new THREE.Mesh(new THREE.BoxGeometry(46.0, 0.28, 0.18), mats.copperCoil);
      cuTrace.position.set(0, ry, 0.02);
      cuTrace.userData.noEdges = true;
      g.add(cuTrace);
    }
    // Dual NTC frame-temperature feedback sensor pads + JST-XH insulated lead junction
    const junc = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.6, 0.55), pal.aluminaCeramic);
    junc.position.set(-22.0, 46.6, -0.15);
    const ntcTab = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.35), mats.goldPlating);
    ntcTab.position.set(22.0, -46.6, 0.05);
    g.add(junc, ntcTab);

    parts.push(
      finalizeDryboxPart(
        'db-mullion-antisweat-heater',
        154,
        '#d97706',
        g,
        new THREE.Vector3(0, DB_DIM.DOOR_CY, 23.45),
        new THREE.Vector3(-8.0, 4.0, 28.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB155. Tapered Self-Centering SUS304 Door Alignment Guide Pins & POM Receiver Bushings
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const py of [38.0, -39.5]) {
      // Door-mounted CNC stainless flange + conical tapered guide pin
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.0, 0.55), mats.stainlessMachined);
      base.position.set(0, py, 0.95);
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.56, 2.2, 14), pal.hardenedSteelHrc60);
      pin.rotation.x = Math.PI / 2;
      pin.position.set(0, py, -0.35);
      // Chassis-mounted self-centering POM tapered socket bushing
      const bushing = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 1.5, 14), pal.ptfeCleanWhite);
      bushing.rotation.x = Math.PI / 2;
      bushing.position.set(0, py, -1.65);
      const collar = new THREE.Mesh(new THREE.BoxGeometry(2.0, 3.4, 0.45), pal.ferritic430Steel);
      collar.position.set(0, py, -2.3);
      g.add(base, pin, bushing, collar);
    }

    parts.push(
      finalizeDryboxPart(
        'db-door-taper-align-pins',
        155,
        '#cbd5e1',
        g,
        new THREE.Vector3(25.4, DB_DIM.DOOR_CY, 23.8),
        new THREE.Vector3(34.0, -6.0, 40.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB156. 2.0 mm High-Tensile Steel C-Channel Base Plinth Sub-Frame & Caster Spreader Plates
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin front-to-back longitudinal C-channel structural rails
    for (const sx of [-20.5, 20.5]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.45, 44.4), pal.ferritic430Steel);
      rail.position.set(sx, 0, 0);
      g.add(rail);
    }
    // 3 Transverse hat-section stiffening cross-members
    for (const sz of [-19.0, 0.0, 19.0]) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(44.2, 1.3, 2.8), pal.ferritic430Steel);
      beam.position.set(0, 0, sz);
      g.add(beam);
    }
    // 4 Corner 3.0 mm heavy-duty caster/seismic foot load-spreader gusset plates
    for (const [cx, cz] of [
      [-21.2, -19.2],
      [21.2, -19.2],
      [-21.2, 19.2],
      [21.2, 19.2],
    ] as Array<[number, number]>) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.45, 7.2), mats.stainlessMachined);
      pad.position.set(cx, -0.78, cz);
      pad.userData.noEdges = true;
      g.add(pad);
    }

    parts.push(
      finalizeDryboxPart(
        'db-base-plinth-crossbeams',
        156,
        '#334155',
        g,
        new THREE.Vector3(0, -51.4, 0),
        new THREE.Vector3(0, -22.0, -8.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB157. Hermetic Blind PEM® Type BS/BSO4 Self-Clinching Standoffs (Zero-Through-Hole Mounts)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Blind closed-end self-clinching stainless standoffs pressed into interior side & rear walls
    for (const sx of [-25.6, 25.6]) {
      for (const sy of [34.0, 14.0, -6.0, -24.0, -40.0]) {
        for (const sz of [-14.0, 12.0]) {
          const boss = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 1.15, 6), mats.stainlessMachined);
          boss.rotation.z = Math.PI / 2;
          boss.position.set(sx, sy, sz);
          boss.userData.noEdges = true;
          g.add(boss);
        }
      }
    }
    // Rear engine bulkhead blind PEM clinch studs
    for (const rx of [-14.0, 14.0]) {
      for (const ry of [24.0, 6.0, -14.0, -32.0]) {
        const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 1.15, 6), pal.brassPrecision);
        stud.rotation.x = Math.PI / 2;
        stud.position.set(rx, ry, -22.6);
        stud.userData.noEdges = true;
        g.add(stud);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-pem-blind-clinch-studs',
        157,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-30.0, -14.0, -16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB158. IP2X Touch-Safe Stamped Steel Rear Engine Louver Shroud & Service Interlock Cover
  // =========================================================================
  {
    const g = new THREE.Group();
    // Contoured rear perimeter protective steel cowling shrouding heatsink, PSU, UPS & PTC zone
    const backFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(34.6, 70.0, 1.8, 28.4, 56.0, 1.0), 1.8, 0.14, 0.14, 12),
      pal.esdPowderShell
    );
    g.add(backFrame);

    // Lower solid safety deck shielding live GaN PSU / Supercap / IEC mains region
    const lowerShield = new THREE.Mesh(new THREE.BoxGeometry(31.0, 18.0, 0.65), pal.esdPowderShell);
    lowerShield.position.set(0, -24.5, -0.55);
    g.add(lowerShield);

    // 10 Angled IP2X finger-safe diagonal exhaust louver slats across upper heatsink window
    for (let i = 0; i < 10; i++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(28.0, 1.1, 0.32), pal.ferritic430Steel);
      slat.position.set(0, -11.0 + i * 4.4, -0.5);
      slat.rotation.x = 0.42;
      slat.userData.noEdges = true;
      g.add(slat);
    }

    // 6 Tamper-resistant Torx-TR captive thumbscrews + cover-open service interlock microswitch tab
    for (const [bx, by] of [
      [-15.8, 32.5],
      [15.8, 32.5],
      [-15.8, 0.0],
      [15.8, 0.0],
      [-15.8, -32.5],
      [15.8, -32.5],
    ] as Array<[number, number]>) {
      const screw = makeCabinetBolt(0.55, 0.85, mats.stainlessMachined);
      screw.position.set(bx, by, -1.05);
      g.add(screw);
    }
    const interlockTab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 1.8), pal.fireRedAccent);
    interlockTab.position.set(14.5, -31.0, 1.2);
    g.add(interlockTab);

    parts.push(
      finalizeDryboxPart(
        'db-rear-ip2x-service-shroud',
        158,
        '#1e293b',
        g,
        new THREE.Vector3(0, -8.5, -33.0),
        new THREE.Vector3(0, -10.0, -90.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB159. Flush-Recessed Spring-Loaded Forged SUS304 Transport Bail Handles (Pair)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const side of [-1, 1]) {
      const hx = side * 27.15;
      // Deep-drawn stainless recessed dish pocket + EPDM perimeter seal
      const dish = new THREE.Mesh(new THREE.BoxGeometry(1.15, 7.6, 11.4), mats.stainlessMachined);
      dish.position.set(hx, 0, 0);
      const seal = new THREE.Mesh(new THREE.BoxGeometry(0.32, 8.2, 12.0), pal.glazingEpdmMatte);
      seal.position.set(hx - side * 0.25, 0, 0);
      // Forged SUS304 bail arms + knurled EPDM ergonomic grip sleeve
      const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 8.2, 12), pal.glazingEpdmMatte);
      grip.rotation.x = Math.PI / 2;
      grip.position.set(hx + side * 0.45, -1.6, 0);
      for (const az of [-3.9, 3.9]) {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.8, 0.55), pal.hardenedSteelHrc60);
        arm.position.set(hx + side * 0.35, 0.2, az);
        arm.userData.noEdges = true;
        g.add(arm);
      }
      g.add(dish, seal, grip);
    }

    parts.push(
      finalizeDryboxPart(
        'db-recessed-bail-lift-handles',
        159,
        '#64748b',
        g,
        new THREE.Vector3(0, 23.0, 12.5),
        new THREE.Vector3(0, 36.0, 16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB160. Roxtec-Class Modular Elastomeric Fire & Airtight Inter-Zone Cable Transit (MCT)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Welded stainless transit compression frame penetrating dual-zone divider (DB18)
    const frame = new THREE.Mesh(
      extrudeCentered(createFrameShape(7.4, 5.6, 0.5, 5.8, 4.0, 0.25), 2.4, 0.06, 0.06, 10),
      mats.stainlessMachined
    );
    frame.rotation.x = Math.PI / 2;
    g.add(frame);

    // 4 Modular halogen-free peelable EPDM sealing blocks around lower-zone harness cables
    for (const [mx, mz] of [
      [-1.35, -0.9],
      [1.35, -0.9],
      [-1.35, 0.9],
      [1.35, 0.9],
    ] as Array<[number, number]>) {
      const mod = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.1, 1.55), pal.glazingEpdmMatte);
      mod.position.set(mx, 0, mz);
      const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 4.6, 10), pal.ptfeCleanWhite);
      wire.position.set(mx, 0, mz);
      wire.userData.noEdges = true;
      g.add(mod, wire);
    }
    // Central stainless compression wedge bolt expanding all EPDM modules radially airtight
    const wedge = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.5, 3.6), pal.fireRedAccent);
    const bolt = makeCabinetBolt(0.38, 1.2, mats.goldPlating);
    bolt.rotation.x = 0;
    bolt.position.set(0, 1.45, 0);
    g.add(wedge, bolt);

    parts.push(
      finalizeDryboxPart(
        'db-roxtec-divider-cable-seal',
        160,
        '#0f172a',
        g,
        new THREE.Vector3(15.5, DB_DIM.DIVIDER_Y, -14.5),
        new THREE.Vector3(28.0, -8.0, -16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB161. Lista/Vidmar-Grade Mechanical Single-Drawer Anti-Tip Safety Interlock Bar
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical anodized aluminum C-channel interlock track along right rail column
    const channel = new THREE.Mesh(new THREE.BoxGeometry(1.4, 72.0, 2.0), mats.matteBlackAnodized);
    const slideBar = new THREE.Mesh(new THREE.BoxGeometry(0.65, 68.5, 0.95), mats.stainlessMachined);
    slideBar.position.set(-0.35, 0, 0.25);
    g.add(channel, slideBar);

    // 4 Angled brass/Delrin interlock wedge-cams at all 4 sliding tray elevations
    for (const wy of [23.5, 4.5, -26.0, -40.5]) {
      const cam = new THREE.Mesh(new THREE.BoxGeometry(1.25, 3.2, 1.5), pal.brassPrecision);
      cam.position.set(-0.65, wy, 0.65);
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.5, 10), pal.fireRedAccent);
      pin.rotation.z = Math.PI / 2;
      pin.position.set(-1.1, wy, 0.9);
      pin.userData.noEdges = true;
      g.add(cam, pin);
    }

    parts.push(
      finalizeDryboxPart(
        'db-antitip-drawer-interlock',
        161,
        '#f59e0b',
        g,
        new THREE.Vector3(23.6, -2.0, -10.5),
        new THREE.Vector3(38.0, -2.0, 26.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB162. Accuride 3634EC-Class Hydraulic Soft-Close Damper Cartridges & Quick-Disconnect Levers
  // =========================================================================
  {
    const g = new THREE.Group();
    const trayYs = [DB_DIM.SHELF_TOP_Y - 2.5, 0.0, DB_DIM.SHELF_LOW_Y - 2.5];
    for (const ty of trayYs) {
      for (const side of [-1, 1]) {
        const sx = side * 22.3;
        // Sealed silicone-oil hydraulic soft-close damper piston housing
        const housing = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.6, 13.5), pal.pa66ThermalBreak);
        housing.position.set(sx, ty, -3.5);
        const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 9.2, 10), mats.stainlessMachined);
        piston.rotation.x = Math.PI / 2;
        piston.position.set(sx - side * 0.2, ty + 0.2, 1.5);
        // Self-closing tension coil spring + front quick-disconnect release thumb lever
        const lever = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.15, 2.8), pal.fireRedAccent);
        lever.position.set(sx - side * 0.15, ty, 11.2);
        lever.userData.noEdges = true;
        g.add(housing, piston, lever);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-slide-softclose-cartridge',
        162,
        '#38bdf8',
        g,
        new THREE.Vector3(0, DB_DIM.SHELF_MID_Y, 4.0),
        new THREE.Vector3(-32.0, 4.0, 28.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB163. Flush Ra98 5600K Collimated Optical Haze/Fungus Lens Transilluminator Lightbox Pad
  // =========================================================================
  {
    const g = new THREE.Group();
    // CNC matte-black anodized aluminum low-profile lightbox bezel inlaid on upper divider deck
    const bezel = makeHorizBoxPlate(14.6, 14.6, 0.72, 1.0, mats.matteBlackAnodized, 0.08);
    // Micro-prism edge-lit PMMA optical diffuser plate (Ra98, 5600K, 4500 cd/m²)
    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.26, 12.2), pal.criLedGlow);
    diffuser.position.y = 0.32;
    // Concentric bayonet/filter inspection centering rings (Ø58 / Ø77 / Ø95 mm scaled)
    for (const r of [2.6, 4.1, 5.4]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.08, 6, 24), pal.ceramicFritBlack);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.46;
      ring.userData.noEdges = true;
      g.add(ring);
    }
    // Capacitive touch dimmer button (20% / 50% / 100%) on front-right corner
    const touchBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.22, 14), pal.blue450Glow);
    touchBtn.position.set(6.1, 0.36, 6.1);
    g.add(bezel, diffuser, touchBtn);

    parts.push(
      finalizeDryboxPart(
        'db-lens-haze-transilluminator',
        163,
        '#e0f2fe',
        g,
        new THREE.Vector3(9.5, -9.6, 5.0),
        new THREE.Vector3(18.0, 10.0, 50.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB164. ANSI/ESD S20.20 Auto-Balancing Bipolar Corona Ionizer Bar (Tungsten Emitters)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Extruded ESD-dissipative aluminum ionizer bar chassis under upper ceiling
    const bar = new THREE.Mesh(new THREE.BoxGeometry(28.0, 1.6, 2.4), mats.matteBlackAnodized);
    // Recessed ceramic HV insulation trough + 8 alternating +/- tungsten emitter needle tips
    const trough = new THREE.Mesh(new THREE.BoxGeometry(25.2, 0.5, 1.4), pal.aluminaCeramic);
    trough.position.set(0, -0.65, 0);
    g.add(bar, trough);

    for (let i = 0; i < 8; i++) {
      const nx = -10.5 + i * 3.0;
      const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.18, 0.9, 8), pal.hardenedSteelHrc60);
      needle.position.set(nx, -1.05, 0);
      const ring = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 0.25, 10),
        i % 2 === 0 ? pal.blue450Glow : pal.fireRedAccent
      );
      ring.position.set(nx, -0.78, 0);
      needle.userData.noEdges = true;
      ring.userData.noEdges = true;
      g.add(needle, ring);
    }
    // Center closed-loop ion-balance feedback antenna sensor (<±10V offset voltage)
    const sensorPlate = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 1.6), mats.goldPlating);
    sensorPlate.position.set(0, -0.88, 0.7);
    g.add(sensorPlate);

    parts.push(
      finalizeDryboxPart(
        'db-bipolar-esd-ionizer-bar',
        164,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 39.2, 12.5),
        new THREE.Vector3(-14.0, 34.0, 44.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB165. EN 14470-1 / VDMA 24994 72°C Eutectic Fusible-Link Self-Closing Fire Damper
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heavy stainless fire-damper duct sleeve mounting to right rear of battery bay (DB26)
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(2.85, 2.85, 3.6, 20), pal.ferritic430Steel);
    sleeve.rotation.x = Math.PI / 2;
    const flange = new THREE.Mesh(new THREE.BoxGeometry(6.8, 6.8, 0.55), mats.stainlessMachined);
    flange.position.z = -1.6;
    // Spring-loaded stainless guillotine damper blade with intumescent graphite perimeter edge
    const blade = new THREE.Mesh(new THREE.CylinderGeometry(2.45, 2.45, 0.35, 18), pal.hardenedSteelHrc60);
    blade.rotation.y = Math.PI / 2;
    blade.rotation.z = 0.22;
    const intumEdge = new THREE.Mesh(new THREE.TorusGeometry(2.48, 0.16, 8, 20), pal.fireRedAccent);
    intumEdge.rotation.y = Math.PI / 2;
    // Calibrated 72°C eutectic fusible alloy link strap + closing torsion spring
    const fusibleLink = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.55, 0.38), pal.brassPrecision);
    fusibleLink.position.set(0, 1.4, 1.45);
    const spring = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 2.2, 10), mats.copperCoil);
    spring.rotation.z = Math.PI / 2;
    spring.position.set(0, -1.9, 0.4);
    g.add(sleeve, flange, blade, intumEdge, fusibleLink, spring);

    parts.push(
      finalizeDryboxPart(
        'db-battery-fusible-fire-damper',
        165,
        '#dc2626',
        g,
        new THREE.Vector3(12.5, -41.5, -22.2),
        new THREE.Vector3(26.0, -24.0, -36.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB166. 1000°C Phlogopite Mica Thermal-Runaway Propagation Cell Dividers & NTC Cradle Pads
  // =========================================================================
  {
    const g = new THREE.Group();
    // 5 Rigid phlogopite mica fire-barrier fins (1000°C dielectric & thermal isolation) between DB27 bays
    for (const fx of [-15.2, -7.6, 0.0, 7.6, 15.2]) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.55, 6.4, 13.4), pal.kaptonAmberFilm);
      fin.position.set(fx, 0, -2.5);
      // Stainless slot retention clip at base of each mica partition fin
      const clip = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.8, 13.6), mats.stainlessMachined);
      clip.position.set(fx, -3.1, -2.5);
      clip.userData.noEdges = true;
      g.add(fin, clip);
    }
    // Front vermiculite/mica spare-battery isolation tray with 4 gold spring-contact NTC base pads
    const frontTray = makeHorizBoxPlate(32.0, 9.0, 0.85, 0.7, pal.aluminaCeramic, 0.08);
    frontTray.position.set(0, -3.0, 10.0);
    g.add(frontTray);
    for (let i = 0; i < 4; i++) {
      const bx = -11.4 + i * 7.6;
      const ntcPad = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.35, 14), mats.goldPlating);
      ntcPad.position.set(bx, -2.4, 10.0);
      ntcPad.userData.noEdges = true;
      g.add(ntcPad);
    }

    parts.push(
      finalizeDryboxPart(
        'db-battery-mica-cell-dividers',
        166,
        '#b45309',
        g,
        new THREE.Vector3(0, -42.3, 0),
        new THREE.Vector3(0, -18.0, 56.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB167. Thermal-Runaway Shunt-Trip Circuit Breaker & Dual-Pole Forced Battery Cutoff Relay
  // =========================================================================
  {
    const g = new THREE.Group();
    // DIN-rail mounted dual-pole molded breaker body + side-coupled 24V shunt-trip solenoid module
    const breakerBody = new THREE.Mesh(new THREE.BoxGeometry(4.8, 6.2, 5.4), pal.esdPowderShell);
    const shuntModule = new THREE.Mesh(new THREE.BoxGeometry(2.2, 6.2, 5.2), pal.fireRedAccent);
    shuntModule.position.set(3.55, 0, 0);
    // Internal copper shunt-trip solenoid coil visible accent + heavy red trip toggle lever
    const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 2.8, 12), mats.copperCoil);
    coil.position.set(3.55, 0.6, 2.75);
    const toggle = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.1, 1.6), pal.fireRedAccent);
    toggle.position.set(0, 0.8, 3.2);
    toggle.rotation.x = -0.35;
    // Dual-pole brass load terminals (+ / -) at top & bottom
    for (const tx of [-1.2, 1.2]) {
      for (const ty of [3.3, -3.3]) {
        const term = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 1.4), pal.brassPrecision);
        term.position.set(tx, ty, 0.8);
        term.userData.noEdges = true;
        g.add(term);
      }
    }
    g.add(breakerBody, shuntModule, coil, toggle);

    parts.push(
      finalizeDryboxPart(
        'db-battery-shunt-trip-breaker',
        167,
        '#ef4444',
        g,
        new THREE.Vector3(-18.5, -41.0, -16.5),
        new THREE.Vector3(-36.0, -26.0, -24.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB168. Dual-Zone Lower Return-Air Slotted Intake Louver Plenum & Backdraft Check Vanes
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper-zone lower return grille (just above DB18 divider) & Lower-zone return grille (above DB26)
    for (const ry of [12.8, -11.6]) {
      const bezel = new THREE.Mesh(
        extrudeCentered(createFrameShape(25.4, 4.4, 0.45, 22.8, 2.6, 0.2), 1.3, 0.06, 0.06, 10),
        pal.esdPowderShell
      );
      bezel.position.set(0, ry, 0);
      g.add(bezel);
      // 3 Slanted acoustic intake louvers + translucent silicone backdraft check flap
      for (let i = -1; i <= 1; i++) {
        const vane = new THREE.Mesh(new THREE.BoxGeometry(22.2, 0.42, 0.9), mats.stainlessMachined);
        vane.position.set(0, ry + i * 0.72, 0.1);
        vane.rotation.x = -0.38;
        vane.userData.noEdges = true;
        g.add(vane);
      }
      const flap = new THREE.Mesh(new THREE.BoxGeometry(21.8, 2.2, 0.14), pal.pfasFreeHydroBlue);
      flap.position.set(0, ry, -0.55);
      g.add(flap);
    }

    parts.push(
      finalizeDryboxPart(
        'db-return-air-plenum-louver',
        168,
        '#475569',
        g,
        new THREE.Vector3(0, -22.5, -18.0),
        new THREE.Vector3(0, -14.0, -16.0),
        cp
      )
    );
  }

  return parts;
}
