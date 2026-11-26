import * as THREE from 'three';
import { CadPart } from '../types';
import {
  createFrameShape,
  createHelicalSpringGeometry,
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
 * Build Groups 4–7 (DB21–DB44):
 * Interior Sliding Ergonomics, Archival Cradles, Showcase Camera/Lenses & Fireproof Charging (DB21–DB27),
 * Active Air Purification, UV-C, Visible TiO2 & Laminar Plenum (DB28–DB32),
 * Core 2026 Hybrid PEM + Zr-MOF/Zeolite + NiTi + PTC + Peltier Dehumidifier Engine (DB33–DB40),
 * GaN Power Supply, Supercap/LiFePO4 Backup, 1MΩ ESD Ground Bus & Seismic Gel Feet (DB41–DB44).
 */
export function buildDryboxInteriorCoreParts(ctx: DryboxPartBuilderCtx): CadPart[] {
  const { mats, pal, cp } = ctx;
  const parts: CadPart[] = [];

  const shelfLevels = [DB_DIM.SHELF_TOP_Y, DB_DIM.SHELF_MID_Y, DB_DIM.SHELF_LOW_Y];

  // =========================================================================
  // DB21. Full-Extension Soft-Close Steel Ball-Bearing Telescopic Slide Rails
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical adjustable pilaster rack standards on all 4 inner corners
    for (const sx of [-1, 1]) {
      for (const sz of [-12.5, 14.5]) {
        const pilaster = new THREE.Mesh(new THREE.BoxGeometry(0.85, 86.0, 1.3), mats.stainlessMachined);
        pilaster.position.set(sx * 23.2, -3.5, sz);
        g.add(pilaster);
      }
    }

    // 3 pairs of precision 3-stage telescopic C-channel ball slides + soft-close pistons
    for (const sy of shelfLevels) {
      for (const sx of [-1, 1]) {
        const outerTrack = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.5, 34.0), mats.stainlessMachined);
        outerTrack.position.set(sx * 22.8, sy, 1.5);
        const innerSlider = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.75, 33.0), mats.mountStainlessFlange);
        innerSlider.position.set(sx * 22.15, sy, 2.2);
        // Steel ball bearings visible along slide track
        for (let b = -12; b <= 12; b += 4.8) {
          const ball = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 6), mats.siliconNitrideBall);
          ball.position.set(sx * 22.48, sy + 0.9, 1.8 + b);
          ball.userData.noEdges = true;
          g.add(ball);
        }
        // Hydraulic soft-close damper piston at rear of each rail
        const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 7.5, 10), mats.copperHeatSpreader);
        piston.rotation.x = Math.PI / 2;
        piston.position.set(sx * 22.5, sy - 0.55, -11.0);
        g.add(outerTrack, innerSlider, piston);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-telescopic-ball-rails',
        21,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-24.0, 0, 16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB22. Perforated CNC Steel Sliding Trays (25 kg/shelf Laminar Airflow)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sy of shelfLevels) {
      const trayGrp = new THREE.Group();
      trayGrp.position.set(0, sy, 1.8);

      // Slotted tray perimeter frame + cross-slats creating crisp ventilation slots
      const trayFrame = makeHorizBoxPlate(43.8, 35.0, 0.72, 0.5, mats.shutterChassis, 0.06);
      trayGrp.add(trayFrame);

      // Front & rear upturned anti-roll stiffening lips
      const frontLip = new THREE.Mesh(new THREE.BoxGeometry(43.8, 1.9, 0.65), mats.matteBlackAnodized);
      frontLip.position.set(0, 0.75, 17.2);
      const rearLip = new THREE.Mesh(new THREE.BoxGeometry(43.8, 1.9, 0.65), mats.matteBlackAnodized);
      rearLip.position.set(0, 0.75, -17.2);
      // Brushed stainless front pull trim
      const pullTrim = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.45, 0.5), mats.stainlessMachined);
      pullTrim.position.set(0, 1.5, 17.55);

      // Visible punched airflow louver slots across tray deck
      for (let rx = -16; rx <= 16; rx += 8) {
        for (let rz = -11; rz <= 11; rz += 5.5) {
          const slot = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.82, 1.4), mats.icEpoxy);
          slot.position.set(rx, 0.02, rz);
          slot.userData.noEdges = true;
          trayGrp.add(slot);
        }
      }
      trayGrp.add(frontLip, rearLip, pullTrim);
      g.add(trayGrp);
    }

    parts.push(
      finalizeDryboxPart(
        'db-perforated-steel-trays',
        22,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 26.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB23. Archival Sulfur-Free Closed-Cell XPE/EVA Wave Lens Cradles (ESD)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Top Shelf: Sculpted CNC sine-wave lens cradle mat for telephoto primes
    {
      const topWave = new THREE.Group();
      topWave.position.set(0, DB_DIM.SHELF_TOP_Y + 0.55, 1.8);
      const basePad = new THREE.Mesh(new THREE.BoxGeometry(42.2, 0.55, 33.4), pal.xpeCharcoalFoam);
      topWave.add(basePad);
      // Corrugated wave bolsters
      for (let wx = -17.0; wx <= 17.0; wx += 8.5) {
        const ridge = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.45, 31.5, 12), pal.xpeCharcoalFoam);
        ridge.rotation.x = Math.PI / 2;
        ridge.position.set(wx, 0.85, 0);
        topWave.add(ridge);
      }
      g.add(topWave);
    }
    // Middle Shelf: Flat ESD archival pad + right-side prime lens wave cradle
    {
      const midPad = new THREE.Group();
      midPad.position.set(0, DB_DIM.SHELF_MID_Y + 0.55, 1.8);
      const flat = new THREE.Mesh(new THREE.BoxGeometry(42.2, 0.65, 33.4), pal.xpeCharcoalFoam);
      midPad.add(flat);
      for (const wx of [5.5, 14.0, 20.0]) {
        const ridge = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.3, 30.0, 10), pal.xpeCharcoalFoam);
        ridge.rotation.x = Math.PI / 2;
        ridge.position.set(wx, 0.72, 0);
        midPad.add(ridge);
      }
      g.add(midPad);
    }
    // Lower Shelf: Archival closed-cell XPE divider mat for cine lenses
    {
      const lowPad = new THREE.Group();
      lowPad.position.set(0, DB_DIM.SHELF_LOW_Y + 0.55, 1.8);
      const flat = new THREE.Mesh(new THREE.BoxGeometry(42.2, 0.65, 33.4), pal.xpeCharcoalFoam);
      lowPad.add(flat);
      for (const wx of [-14.0, -3.5, 7.0, 17.5]) {
        const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.25, 30.0, 10), pal.xpeCharcoalFoam);
        ridge.rotation.x = Math.PI / 2;
        ridge.position.set(wx, 0.72, 0);
        lowPad.add(ridge);
      }
      g.add(lowPad);
    }

    parts.push(
      finalizeDryboxPart(
        'db-archival-xpe-lens-cradle',
        23,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 5.5, 34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB24. Museum-Grade High-CRI (Ra ≥ 97, 5000K) Flicker-Free LED Light Bars
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sx of [-1, 1]) {
      const barGrp = new THREE.Group();
      barGrp.position.set(sx * 22.8, -2.5, 20.2);
      barGrp.rotation.y = sx * -0.45; // Angled inward 26° toward camera lenses

      // Extruded anodized aluminum cooling channel
      const channel = new THREE.Mesh(new THREE.BoxGeometry(1.3, 84.0, 1.1), mats.matteBlackAnodized);
      // Warm-white full-spectrum Ra97 phosphor optical diffuser strip
      const diffuser = new THREE.Mesh(new THREE.BoxGeometry(0.75, 82.0, 0.45), pal.criLedGlow);
      diffuser.position.z = -0.58;
      // Top & bottom constant-current DC feed caps
      for (const cy of [-42.2, 42.2]) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 1.3), mats.stainlessMachined);
        cap.position.y = cy;
        barGrp.add(cap);
      }
      barGrp.add(channel, diffuser);
      g.add(barGrp);
    }

    parts.push(
      finalizeDryboxPart(
        'db-cri97-inspection-led',
        24,
        '#fef08a',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 20.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // DB25. Stored Flagship Mirrorless Camera & Lenses (40% RH Golden Zone Model)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 1. Middle Shelf Left: Sculpted Flagship Full-Frame Mirrorless Camera + 50mm F1.2 GM Prime
    {
      const cam = new THREE.Group();
      cam.position.set(-7.2, DB_DIM.SHELF_MID_Y + 6.8, 2.2);
      cam.rotation.y = 0.28;

      // Magnesium camera body + right handgrip + EVF pentaprism hump
      const bodyMain = new THREE.Mesh(new THREE.BoxGeometry(14.8, 10.6, 5.2), mats.bodyMgShell);
      const grip = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.8, 10.4, 14), mats.bodyLeatherette);
      grip.position.set(-5.8, -0.1, 2.6);
      const evfHump = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.2, 5.4), mats.matteBlackAnodized);
      evfHump.position.set(0.2, 6.4, -0.2);
      // Mode dial & shutter button
      const dial = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 1.1, 14), mats.matteBlackAnodized);
      dial.position.set(-3.8, 5.8, -0.2);
      const shutterBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.6, 12), mats.stainlessMachined);
      shutterBtn.position.set(-5.8, 5.4, 3.1);
      // Cinnabar signature mount accent ring + 50mm F1.2 Prime Lens barrel
      const mountRing = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.35, 10, 22), mats.cinnabarAnodized);
      mountRing.position.set(0.6, -0.2, 2.75);
      const lensRear = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 3.4, 4.0, 22), mats.lensBarrelAnodized);
      lensRear.rotation.x = Math.PI / 2;
      lensRear.position.set(0.6, -0.2, 4.7);
      const lensFront = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 3.9, 6.2, 22), mats.lensBarrelAnodized);
      lensFront.rotation.x = Math.PI / 2;
      lensFront.position.set(0.6, -0.2, 9.6);
      const redRing = new THREE.Mesh(new THREE.TorusGeometry(4.35, 0.22, 8, 22), mats.gMasterRedBadge);
      redRing.position.set(0.6, -0.2, 11.4);
      const frontGlass = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.6, 0.4, 22), mats.lensXaGlass);
      frontGlass.rotation.x = Math.PI / 2;
      frontGlass.position.set(0.6, -0.2, 12.6);
      cam.add(bodyMain, grip, evfHump, dial, shutterBtn, mountRing, lensRear, lensFront, redRing, frontGlass);
      g.add(cam);
    }

    // 2. Middle Shelf Right: Upright 24-70mm F2.8 Zoom Lens
    {
      const zoom = new THREE.Group();
      zoom.position.set(12.2, DB_DIM.SHELF_MID_Y + 8.6, 1.5);
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 3.6, 14.0, 20), mats.lensBarrelAnodized);
      const gripRing = new THREE.Mesh(new THREE.CylinderGeometry(4.35, 4.35, 4.4, 20), mats.lensRubberGrip);
      gripRing.position.y = 1.6;
      const accent = new THREE.Mesh(new THREE.TorusGeometry(4.25, 0.2, 8, 20), mats.gMasterRedBadge);
      accent.rotation.x = Math.PI / 2;
      accent.position.y = 5.4;
      const topGlass = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 0.35, 20), mats.lensEdGlass);
      topGlass.position.y = 7.05;
      zoom.add(barrel, gripRing, accent, topGlass);
      g.add(zoom);
    }

    // 3. Top Shelf: 70-200mm F2.8 White Flagship Telephoto Lens resting horizontally on wave foam!
    {
      const tele = new THREE.Group();
      tele.position.set(-2.5, DB_DIM.SHELF_TOP_Y + 6.4, 2.5);
      tele.rotation.z = Math.PI / 2;
      const bodyW = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 3.7, 24.5, 22), pal.whiteTeleLens);
      const zoomRubber = new THREE.Mesh(new THREE.CylinderGeometry(4.75, 4.75, 5.2, 22), mats.lensRubberGrip);
      zoomRubber.position.y = -2.0;
      const focusRubber = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 4.8, 3.6, 22), mats.lensRubberGrip);
      focusRubber.position.y = 5.8;
      const tripodCollar = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.6, 3.0), pal.whiteTeleLens);
      tripodCollar.position.set(-4.2, -5.8, 0);
      const hoodRing = new THREE.Mesh(new THREE.TorusGeometry(4.65, 0.24, 8, 22), mats.gMasterRedBadge);
      hoodRing.rotation.x = Math.PI / 2;
      hoodRing.position.y = 10.6;
      const teleGlass = new THREE.Mesh(new THREE.CylinderGeometry(4.0, 4.0, 0.4, 22), mats.lensXaGlass);
      teleGlass.position.y = 12.25;
      tele.add(bodyW, zoomRubber, focusRubber, tripodCollar, hoodRing, teleGlass);
      g.add(tele);
    }

    // 4. Lower Shelf (35% RH Cine Zone): Cinema Prime Lenses + Vintage Rangefinder Camera
    {
      for (let i = 0; i < 2; i++) {
        const cine = new THREE.Group();
        cine.position.set(-9.0 + i * 11.2, DB_DIM.SHELF_LOW_Y + 6.2, 2.0);
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 3.6, 10.2, 20), mats.matteBlackAnodized);
        // Cine follow-focus 0.8-mod geared focus & iris rings
        const gear1 = new THREE.Mesh(new THREE.CylinderGeometry(4.15, 4.15, 1.2, 24), mats.goldPlating);
        gear1.position.y = 1.8;
        const gear2 = new THREE.Mesh(new THREE.CylinderGeometry(4.15, 4.15, 1.0, 24), mats.cinnabarAnodized);
        gear2.position.y = -1.6;
        const glass = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 0.35, 18), mats.lensXaGlass);
        glass.position.y = 5.15;
        cine.add(barrel, gear1, gear2, glass);
        g.add(cine);
      }
      // Vintage silver-top rangefinder body
      const rf = new THREE.Group();
      rf.position.set(13.0, DB_DIM.SHELF_LOW_Y + 5.0, 2.0);
      rf.rotation.y = -0.35;
      const rfBase = new THREE.Mesh(new THREE.BoxGeometry(11.6, 6.2, 3.8), mats.bodyLeatherette);
      const rfTop = new THREE.Mesh(new THREE.BoxGeometry(11.7, 2.1, 3.9), mats.stainlessMachined);
      rfTop.position.y = 3.8;
      const rfLens = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.4, 3.6, 18), mats.stainlessMachined);
      rfLens.rotation.x = Math.PI / 2;
      rfLens.position.set(0, -0.2, 3.4);
      rf.add(rfBase, rfTop, rfLens);
      g.add(rf);
    }

    parts.push(
      finalizeDryboxPart(
        'db-camera-lens-showcase',
        25,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 10.0, 44.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // DB26. VDMA 24994 Fireproof Ceramic-Lined & Intumescent Li-Ion Battery Bay
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heavy steel outer fire-containment drawer box (bottom zone)
    const frontFace = new THREE.Mesh(new THREE.BoxGeometry(44.2, 11.4, 1.2), pal.fireRedAccent);
    frontFace.position.set(0, 0, 17.8);
    const handleBar = new THREE.Mesh(new THREE.BoxGeometry(18.0, 1.1, 1.3), mats.stainlessMachined);
    handleBar.position.set(0, 2.5, 18.8);

    const sideL = new THREE.Mesh(new THREE.BoxGeometry(1.1, 10.6, 35.0), mats.shutterChassis);
    sideL.position.set(-21.6, -0.2, 0.2);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(1.1, 10.6, 35.0), mats.shutterChassis);
    sideR.position.set(21.6, -0.2, 0.2);
    const floor = new THREE.Mesh(new THREE.BoxGeometry(44.0, 1.0, 35.0), mats.shutterChassis);
    floor.position.set(0, -5.2, 0.2);
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(44.0, 10.6, 1.0), mats.shutterChassis);
    backWall.position.set(0, -0.2, -17.0);

    // Interior white ceramic-fiber fireboard thermal runaway insulation liners
    const cerL = new THREE.Mesh(new THREE.BoxGeometry(0.85, 9.2, 33.0), mats.ceramicAlumina);
    cerL.position.set(-20.4, -0.2, 0.2);
    const cerR = new THREE.Mesh(new THREE.BoxGeometry(0.85, 9.2, 33.0), mats.ceramicAlumina);
    cerR.position.set(20.4, -0.2, 0.2);
    const cerFloor = new THREE.Mesh(new THREE.BoxGeometry(40.0, 0.85, 33.0), mats.ceramicAlumina);
    cerFloor.position.set(0, -4.2, 0.2);

    // Heat-expanding graphite intumescent fire-seal perimeter strip around drawer top rim
    const intumShape = createFrameShape(44.2, 35.2, 0.6, 41.8, 32.8, 0.4);
    const intumGeo = extrudeCentered(intumShape, 0.75, 0, 0, 8);
    intumGeo.rotateX(Math.PI / 2);
    const intumSeal = new THREE.Mesh(intumGeo, mats.pyroGraphite);
    intumSeal.position.set(0, 5.4, 0.2);

    g.add(frontFace, handleBar, sideL, sideR, floor, backWall, cerL, cerR, cerFloor, intumSeal);

    parts.push(
      finalizeDryboxPart(
        'db-fireproof-battery-bay',
        26,
        '#dc2626',
        g,
        new THREE.Vector3(0, DB_DIM.BATT_DRAWER_Y, 1.2),
        new THREE.Vector3(0, -14.0, 42.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB27. USB-C PD 3.1 (100W PPS) & Independent NTC Cutoff Battery Charging Hub
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main aluminum charging dock base inside fireproof drawer
    const dockBase = makeHorizBoxPlate(34.0, 14.0, 1.6, 1.0, mats.matteBlackAnodized, 0.12);
    g.add(dockBase);

    // Internal GaN PPS buck regulator PCB + 4 USB-C PD 3.1 ports
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(31.0, 0.5, 11.5), mats.hdiMainboardPcb);
    pcb.position.y = 0.85;
    g.add(pcb);

    for (let i = 0; i < 4; i++) {
      const bx = -11.4 + i * 7.6;
      // Battery charging bay cradle
      const bay = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.2, 6.8), mats.shutterChassis);
      bay.position.set(bx, 2.1, -1.2);
      // Gold spring contacts + independent NTC thermistor probe touching each pack
      const ntc = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.2, 8), mats.copperCoil);
      ntc.position.set(bx, 1.5, 0.5);
      // USB-C PD 3.1 stainless receptacle at front edge
      const usbc = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.85, 1.8), mats.stainlessMachined);
      usbc.position.set(bx, 1.35, 5.4);
      // Status indicator LED (charging amber / 50% archival storage green)
      const led = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 0.5), i < 2 ? pal.mofEmerald : pal.blue450Glow);
      led.position.set(bx, 1.7, 4.0);
      g.add(bay, ntc, usbc, led);

      // Docked miniature NP-FZ100 camera Li-Ion batteries in bays 1 & 2!
      if (i < 2) {
        const batt = new THREE.Mesh(new THREE.BoxGeometry(4.4, 5.2, 5.6), mats.bodyBatteryShell);
        batt.position.set(bx, 4.4, -1.2);
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(4.45, 0.7, 5.65), mats.cinnabarAnodized);
        stripe.position.set(bx, 5.6, -1.2);
        g.add(batt, stripe);
      }
    }

    parts.push(
      finalizeDryboxPart(
        'db-usbc-pd31-charge-hub',
        27,
        '#f97316',
        g,
        new THREE.Vector3(0, DB_DIM.BATT_DRAWER_Y - 2.6, -2.5),
        new THREE.Vector3(0, -8.0, 56.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB28. Dual-Wavelength Deep UV-C AlGaN LED (265nm + 280nm) Sterilizer Chamber
  // =========================================================================
  {
    const g = new THREE.Group();
    // Light-trapped matte-black anodized aluminum labyrinth housing (zero UV leakage!)
    const housing = new THREE.Mesh(new THREE.BoxGeometry(22.0, 9.6, 3.2), mats.matteBlackAnodized);
    g.add(housing);

    // Internal UV-reflective PTFE / polished aluminum sterilization vortex tunnel
    const tunnel = new THREE.Mesh(new THREE.BoxGeometry(19.6, 6.2, 1.9), mats.stainlessMachined);
    tunnel.position.z = 0.55;
    g.add(tunnel);

    // 4 Dual-Wavelength AlGaN Deep UV-C SMD LED emitters (265nm DNA break + 280nm repair block) behind quartz domes
    for (let i = 0; i < 4; i++) {
      const lx = -6.6 + i * 4.4;
      const alnSub = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.45), mats.ceramicAlumina);
      alnSub.position.set(lx, 0, 1.38);
      const uvcChip = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.15, 0.3), pal.uvcVioletGlow);
      uvcChip.position.set(lx, 0, 1.65);
      const quartzLens = new THREE.Mesh(new THREE.SphereGeometry(0.92, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), mats.quartzOlpf);
      quartzLens.rotation.x = Math.PI / 2;
      quartzLens.position.set(lx, 0, 1.6);
      g.add(alnSub, uvcChip, quartzLens);
    }

    // Chevron light-trap optical baffle fins at top & bottom air entry/exit
    for (const by of [-3.9, 3.9]) {
      const baffle = new THREE.Mesh(new THREE.BoxGeometry(20.4, 0.75, 2.6), mats.mountVelvetBaffle);
      baffle.position.set(0, by, 0.35);
      g.add(baffle);
    }

    parts.push(
      finalizeDryboxPart(
        'db-uvc-265-280-sterilizer',
        28,
        '#8b5cf6',
        g,
        new THREE.Vector3(0, -6.5, -21.2),
        new THREE.Vector3(-28.0, -4.0, -18.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB29. Visible-Light C/N-Doped TiO2 Photocatalyst Mesh & 450nm Blue LED Unit
  // =========================================================================
  {
    const g = new THREE.Group();
    const frame = new THREE.Mesh(
      extrudeCentered(createFrameShape(22.4, 10.6, 0.8, 19.8, 8.2, 0.4), 2.4, 0.08, 0.08, 10),
      mats.stainlessMachined
    );
    g.add(frame);

    // Corrugated TiO2-baked honeycomb photocatalyst catalytic mesh
    for (let cx = -8.4; cx <= 8.4; cx += 2.1) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.42, 8.0, 1.6), mats.aluminaHighKFilm);
      rib.position.set(cx, 0, 0);
      rib.rotation.y = cx % 4.2 === 0 ? 0.35 : -0.35;
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Twin 450nm visible blue-light excitation LED bars illuminating the TiO2 mesh 24/7
    for (const ly of [-4.4, 4.4]) {
      const ledBar = new THREE.Mesh(new THREE.BoxGeometry(19.0, 0.68, 0.8), pal.blue450Glow);
      ledBar.position.set(0, ly, 0.85);
      g.add(ledBar);
    }

    parts.push(
      finalizeDryboxPart(
        'db-tio2-photocatalyst-mesh',
        29,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 5.2, -21.2),
        new THREE.Vector3(28.0, 6.0, -18.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB30. Coconut-Shell Activated Carbon + Acid-Gas & HEPA H13 Filter Cartridge
  // =========================================================================
  {
    const g = new THREE.Group();
    // Quick-slide ABS service cassette frame
    const cassette = new THREE.Mesh(
      extrudeCentered(createFrameShape(22.6, 11.2, 0.8, 20.0, 8.8, 0.4), 2.6, 0.08, 0.08, 10),
      mats.matteBlackAnodized
    );
    g.add(cassette);

    // Front layer: Pleated white HEPA H13 0.3µm spore-trapping accordion filter
    for (let px = -9.0; px <= 9.0; px += 1.5) {
      const pleat = new THREE.Mesh(new THREE.BoxGeometry(0.35, 8.6, 1.15), pal.hepaWhitePleat);
      pleat.position.set(px, 0, 0.55);
      pleat.rotation.y = 0.42;
      pleat.userData.noEdges = true;
      g.add(pleat);
    }

    // Rear layer: Dark honeycomb activated-carbon + acid-gas trapping pellet bed
    const carbonBed = new THREE.Mesh(new THREE.BoxGeometry(19.6, 8.4, 1.05), pal.carbonPelletDark);
    carbonBed.position.z = -0.62;
    g.add(carbonBed);

    // Pull tab handle on top edge for tool-free annual filter swap
    const tab = new THREE.Mesh(new THREE.BoxGeometry(5.5, 1.1, 0.55), mats.tantalumCapYellow);
    tab.position.set(0, 5.9, 0.6);
    g.add(tab);

    parts.push(
      finalizeDryboxPart(
        'db-voc-carbon-hepa-filter',
        30,
        '#1e293b',
        g,
        new THREE.Vector3(0, 16.8, -21.2),
        new THREE.Vector3(-28.0, 18.0, -16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB31. 12 dBA Magnetic-Levitation (Maglev) Brushless Micro Circulation Fan
  // =========================================================================
  {
    const g = new THREE.Group();
    // Aerodynamic square-to-round shroud housing
    const shroudShape = createFrameShape(13.6, 13.6, 1.6, 11.4, 11.4, 5.6);
    const shroud = new THREE.Mesh(extrudeCentered(shroudShape, 2.8, 0.14, 0.14, 16), mats.matteBlackAnodized);
    g.add(shroud);

    // Copper electromagnetic stator coil + magnetic levitation thrust ring
    const stator = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 1.9, 16), mats.copperCoil);
    stator.rotation.x = Math.PI / 2;
    const magRing = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.32, 8, 18), mats.neodymiumMagnet);
    magRing.position.z = -0.6;
    g.add(stator, magRing);

    // Rotating 9-blade swept silent impeller sub-group (animated in index.ts!)
    const rotor = new THREE.Group();
    rotor.userData.dryboxFanRotor = true;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 1.5, 16), mats.icEpoxy);
    hub.rotation.x = Math.PI / 2;
    hub.position.z = 0.25;
    rotor.add(hub);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const bladeWrap = new THREE.Group();
      bladeWrap.rotation.z = a;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(1.45, 3.6, 0.24), mats.carbonFiberBlade);
      blade.position.set(0.25, 3.5, 0.25);
      blade.rotation.y = 0.55;
      blade.userData.noEdges = true;
      bladeWrap.add(blade);
      rotor.add(bladeWrap);
    }
    g.add(rotor);

    parts.push(
      finalizeDryboxPart(
        'db-maglev-circulation-fan',
        31,
        '#0284c7',
        g,
        new THREE.Vector3(0, 29.8, -21.2),
        new THREE.Vector3(26.0, 28.0, -16.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB32. Dual-Zone Laminar Air Distribution Plenum & Stepper Damper Tower
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculpted vertical interior rear air plenum cowling covering purification stack
    const tower = new THREE.Mesh(new THREE.BoxGeometry(26.4, 78.0, 2.2), mats.shutterChassis);
    g.add(tower);

    // Upper & Lower laminar dry-air exhaust louver grilles
    for (const gy of [32.0, 12.0, -18.0, -30.0]) {
      for (let i = -2; i <= 2; i++) {
        const louver = new THREE.Mesh(new THREE.BoxGeometry(18.0, 0.45, 0.8), mats.stainlessMachined);
        louver.position.set(0, gy + i * 1.15, 1.15);
        louver.rotation.x = -0.35;
        louver.userData.noEdges = true;
        g.add(louver);
      }
    }

    // Motorized dual-zone stepper diverter flap at Divider Y level
    const damperFlap = new THREE.Mesh(new THREE.BoxGeometry(18.5, 2.4, 0.45), mats.mountShimBlue);
    damperFlap.position.set(0, -12.0, 0.8);
    damperFlap.rotation.x = 0.42;
    const stepperCan = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 1.8, 14), mats.goldPlating);
    stepperCan.rotation.z = Math.PI / 2;
    stepperCan.position.set(11.6, -12.0, 0.5);
    g.add(damperFlap, stepperCan);

    parts.push(
      finalizeDryboxPart(
        'db-laminar-air-plenum',
        32,
        '#64748b',
        g,
        new THREE.Vector3(0, 3.0, -18.8),
        new THREE.Vector3(0, 0, -6.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB33. Solid Polymer Electrolyte Membrane (PEM / Nafion-117) Electrolysis Core
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision PPS/Titanium compression sealing frame
    const frame = new THREE.Mesh(
      extrudeCentered(createFrameShape(22.0, 13.0, 1.0, 18.2, 9.4, 0.6), 1.6, 0.1, 0.1, 12),
      mats.mountPpsInsulator
    );
    // Translucent cyan proton-conductive Nafion-117 solid polymer ionic membrane
    const membrane = new THREE.Mesh(new THREE.BoxGeometry(18.6, 9.8, 0.52), pal.pemNafionCyan);
    // Micro ion-channel grid embossing ribs
    for (let x = -7.5; x <= 7.5; x += 2.5) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.18, 9.4, 0.62), mats.fluorineCoatCyan);
      rib.position.x = x;
      rib.userData.noEdges = true;
      g.add(rib);
    }
    // 8 perimeter stainless compression clamping bolts
    for (const bx of [-9.6, -3.2, 3.2, 9.6]) {
      for (const by of [-5.4, 5.4]) {
        const b = makeCabinetBolt(0.38, 1.8, mats.titaniumRivet);
        b.position.set(bx, by, 0);
        g.add(b);
      }
    }
    g.add(frame, membrane);

    parts.push(
      finalizeDryboxPart(
        'db-pem-nafion-membrane',
        33,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 14.5, -25.6),
        new THREE.Vector3(0, 18.0, -34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB34. Pt/Ir Porous Gas-Diffusion Catalyst Electrodes & Sintered Titanium Mesh
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin Anode (Interior +Z) & Cathode (Exterior -Z) porous catalyst electrode plates sandwiching PEM
    for (const sz of [0.95, -0.95]) {
      const plate = new THREE.Mesh(new THREE.BoxGeometry(18.0, 9.2, 0.36), mats.goldPlating);
      plate.position.z = sz;
      // Sintered titanium current collector grid ribs
      for (let y = -3.6; y <= 3.6; y += 1.8) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(17.4, 0.24, 0.44), mats.titaniumRivet);
        bar.position.set(0, y, sz);
        bar.userData.noEdges = true;
        g.add(bar);
      }
      // 3V DC terminal busbar tab protruding sideways
      const tab = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.8, 0.36), sz > 0 ? mats.copperHeatSpreader : mats.stainlessMachined);
      tab.position.set(sz > 0 ? -10.2 : 10.2, 0, sz);
      g.add(plate, tab);
    }

    parts.push(
      finalizeDryboxPart(
        'db-pem-ptir-electrodes',
        34,
        '#eab308',
        g,
        new THREE.Vector3(0, 14.5, -25.6),
        new THREE.Vector3(18.0, 22.0, -48.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB35. 2026 Zr-MOF (NU-1008-SC-TFS) + Zeolite 4A Hybrid Adsorbent Cartridge
  // =========================================================================
  {
    const g = new THREE.Group();
    // Perforated stainless thermal-desorption cassette body
    const cage = new THREE.Mesh(
      extrudeCentered(createFrameShape(23.2, 13.6, 0.9, 20.6, 11.0, 0.5), 3.4, 0.1, 0.1, 10),
      mats.stainlessMachined
    );
    g.add(cage);

    // Front half: Emerald-crystalline 2026 Zr-MOF (NU-1008-SC-TFS) monolithic sorbent honeycomb
    const mofBlock = new THREE.Mesh(new THREE.BoxGeometry(20.2, 5.2, 2.8), pal.mofEmerald);
    mofBlock.position.set(0, 2.75, 0);
    // Rear/Lower half: Molecular-Sieve Zeolite 4A porous alumina-silicate bead matrix
    const zeoliteBlock = new THREE.Mesh(new THREE.BoxGeometry(20.2, 5.2, 2.8), mats.ceramicAlumina);
    zeoliteBlock.position.set(0, -2.75, 0);
    // Visible spherical zeolite 4A sieve beads embossed on surface
    for (let x = -8.0; x <= 8.0; x += 2.6) {
      for (const y of [-4.0, -1.6]) {
        const bead = new THREE.Mesh(new THREE.SphereGeometry(0.68, 8, 6), pal.aerogelPearl);
        bead.position.set(x, y, 1.35);
        bead.userData.noEdges = true;
        g.add(bead);
      }
    }
    g.add(mofBlock, zeoliteBlock);

    parts.push(
      finalizeDryboxPart(
        'db-mof-zeolite-rotor-bed',
        35,
        '#10b981',
        g,
        new THREE.Vector3(0, -0.5, -25.8),
        new THREE.Vector3(0, 0, -42.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB36. NiTi Shape-Memory Alloy (SMA) Dual-Shutter Regeneration Linkage
  // =========================================================================
  {
    const g = new THREE.Group();
    // Paired Interior (Adsorb) & Exterior (Desorb/Exhaust) airtight flapper shutter doors
    const innerDoor = new THREE.Mesh(new THREE.BoxGeometry(21.6, 12.2, 0.45), mats.matteBlackAnodized);
    innerDoor.position.set(0, 0, 2.15);
    const outerDoor = new THREE.Mesh(new THREE.BoxGeometry(21.6, 12.2, 0.45), mats.shutterChassis);
    outerDoor.position.set(0, 0, -2.15);
    outerDoor.rotation.x = 0.24; // Slightly cracked open to visualize regeneration exhaust motion

    // Silicone perimeter seal lips on shutters
    const sealIn = new THREE.Mesh(
      extrudeCentered(createFrameShape(21.8, 12.4, 0.4, 20.6, 11.2, 0.3), 0.35, 0, 0, 8),
      mats.epdmGasket
    );
    sealIn.position.z = 1.95;

    // Coiled crimson/rose Nitinol (NiTi) Shape-Memory Alloy spring actuators on left & right bellcranks
    for (const sx of [-1, 1]) {
      const smaSpring = new THREE.Mesh(
        createHelicalSpringGeometry(0.92, 6.2, 7, 0.22),
        pal.nitiRoseWire
      );
      smaSpring.rotation.y = Math.PI / 2;
      smaSpring.position.set(sx * 12.2, 2.2, 0);
      const bellcrank = new THREE.Mesh(new THREE.BoxGeometry(0.65, 5.4, 5.0), mats.linkArmSteel);
      bellcrank.position.set(sx * 11.4, -1.6, 0);
      g.add(smaSpring, bellcrank);
    }

    g.add(innerDoor, outerDoor, sealIn);

    parts.push(
      finalizeDryboxPart(
        'db-niti-sma-shutter',
        36,
        '#f43f5e',
        g,
        new THREE.Vector3(0, -0.5, -25.8),
        new THREE.Vector3(-22.0, -2.0, -56.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB37. Barium Titanate (BaTiO3) Self-Regulating PTC Ceramic Regeneration Heater
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 Terracotta BaTiO3 PTC ceramic thermistor pills clamped between corrugated aluminum fins
    for (let i = 0; i < 4; i++) {
      const px = -7.5 + i * 5.0;
      const pill = new THREE.Mesh(new THREE.BoxGeometry(3.2, 7.6, 1.1), pal.ptcTerracotta);
      pill.position.set(px, 0, 0);
      const elecL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 7.6, 1.15), mats.silverElectrode);
      elecL.position.set(px - 1.72, 0, 0);
      const elecR = new THREE.Mesh(new THREE.BoxGeometry(0.25, 7.6, 1.15), mats.silverElectrode);
      elecR.position.set(px + 1.72, 0, 0);
      g.add(pill, elecL, elecR);
    }
    // Top & bottom aluminum corrugated heat-conduction busbars
    for (const hy of [-4.4, 4.4]) {
      const finBar = new THREE.Mesh(new THREE.BoxGeometry(20.4, 1.1, 1.6), mats.stainlessMachined);
      finBar.position.y = hy;
      g.add(finBar);
    }
    // High-temp Kapton polyimide insulating sleeve & silicone leads
    const kapton = new THREE.Mesh(new THREE.BoxGeometry(20.8, 0.35, 1.75), mats.polyimideFpc);
    kapton.position.y = 5.1;
    g.add(kapton);

    parts.push(
      finalizeDryboxPart(
        'db-batio3-ptc-heater',
        37,
        '#ef4444',
        g,
        new THREE.Vector3(0, -0.5, -25.8),
        new THREE.Vector3(24.0, -2.0, -64.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB38. Rapid Pull-Down Bismuth Telluride (Bi2Te3) Peltier TEC Module
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cold-side (+Z) & Hot-side (-Z) white Al2O3 alumina ceramic substrate plates
    const plateCold = new THREE.Mesh(new THREE.BoxGeometry(11.0, 11.0, 0.45), mats.ceramicAlumina);
    plateCold.position.z = 0.95;
    const plateHot = new THREE.Mesh(new THREE.BoxGeometry(11.0, 11.0, 0.45), mats.ceramicAlumina);
    plateHot.position.z = -0.95;
    g.add(plateCold, plateHot);

    // 5x5 visible N-type (cyan-blue) & P-type (amber-copper) Bi2Te3 thermoelectric semiconductor pellets
    for (let ix = -2; ix <= 2; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        const isN = (ix + iy) % 2 === 0;
        const leg = new THREE.Mesh(
          new THREE.BoxGeometry(1.15, 1.15, 1.45),
          isN ? mats.siliconLogicLayer : mats.copperHeatSpreader
        );
        leg.position.set(ix * 1.9, iy * 1.9, 0);
        leg.userData.noEdges = true;
        g.add(leg);
      }
    }
    // Red (+) & Black (-) silicone power leads
    const leadRed = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 5.2, 8), pal.fireRedAccent);
    leadRed.rotation.z = Math.PI / 2;
    leadRed.position.set(7.8, 2.2, 0);
    const leadBlk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 5.2, 8), mats.icEpoxy);
    leadBlk.rotation.z = Math.PI / 2;
    leadBlk.position.set(7.8, -2.2, 0);
    g.add(leadRed, leadBlk);

    parts.push(
      finalizeDryboxPart(
        'db-peltier-tec-module',
        38,
        '#3b82f6',
        g,
        new THREE.Vector3(0, -15.5, -26.0),
        new THREE.Vector3(0, -16.0, -52.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB39. Hydrophilic Micro-Grooved Cold Plate & Capillary PTFE Evaporation Wick
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical V-grooved hydrophilic anodized aluminum condensation cold plate (interior face)
    const coldPlate = new THREE.Mesh(new THREE.BoxGeometry(14.5, 12.5, 1.0), mats.thermalPadBlue);
    coldPlate.position.z = 1.4;
    for (let gx = -5.6; gx <= 5.6; gx += 1.4) {
      const groove = new THREE.Mesh(new THREE.BoxGeometry(0.45, 11.4, 0.75), mats.stainlessMachined);
      groove.position.set(gx, 0, 2.05);
      groove.userData.noEdges = true;
      g.add(groove);
    }
    // Bottom condensate collector trough
    const trough = new THREE.Mesh(new THREE.BoxGeometry(15.2, 1.4, 2.2), mats.matteBlackAnodized);
    trough.position.set(0, -6.5, 1.6);

    // Porous sintered PTFE/fiber capillary wick ribbon snaking from trough out through thermal barrier to hot heatsink!
    const wickPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -6.2, 1.6),
      new THREE.Vector3(0, -7.2, -0.8),
      new THREE.Vector3(0, -6.6, -3.4),
      new THREE.Vector3(0, -3.5, -4.4),
    ]);
    const wickTube = new THREE.Mesh(new THREE.TubeGeometry(wickPath, 16, 0.65, 8, false), pal.hepaWhitePleat);
    // Evaporation pad bonded to rear heatsink face
    const evapPad = new THREE.Mesh(new THREE.BoxGeometry(10.5, 5.2, 0.45), pal.aerogelPearl);
    evapPad.position.set(0, -2.2, -4.4);
    g.add(coldPlate, trough, wickTube, evapPad);

    parts.push(
      finalizeDryboxPart(
        'db-hydrophilic-wick-drain',
        39,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, -15.5, -25.8),
        new THREE.Vector3(-22.0, -16.0, -34.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB40. CNC-Skived Aluminum Exterior Heatsink & Exhaust Louver Cowling
  // =========================================================================
  {
    const g = new THREE.Group();
    // Base spreader plate
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(27.6, 46.0, 1.2), mats.stainlessMachined);
    basePlate.position.z = 1.6;
    g.add(basePlate);

    // 13 high-surface-area vertical CNC-skived aluminum cooling fins
    for (let i = -6; i <= 6; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.42, 43.0, 3.4), mats.mountStainlessFlange);
      fin.position.set(i * 2.05, 0, -0.5);
      fin.userData.noEdges = true;
      g.add(fin);
    }

    // Protective rear ventilated shroud frame with upper humid-vapor exhaust vents
    const shroud = new THREE.Mesh(
      extrudeCentered(createFrameShape(29.4, 48.2, 1.6, 25.0, 42.4, 0.8), 4.6, 0.16, 0.14, 12),
      pal.esdPowderShell
    );
    shroud.position.z = 0.0;
    g.add(shroud);

    parts.push(
      finalizeDryboxPart(
        'db-rear-skived-heatsink',
        40,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 1.0, -29.8),
        new THREE.Vector3(0, 0, -76.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB41. GaN Multilevel High-Efficiency AC/DC Power Supply & Surge PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(16.5, 11.5, 4.0), mats.matteBlackAnodized);
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(14.8, 9.8, 0.55), mats.sensorPcb);
    pcb.position.z = -1.1;
    // Planar ferrite transformer + blue MOV surge varistors + GaN FET stages
    const xfmr = new THREE.Mesh(new THREE.BoxGeometry(4.6, 4.2, 1.9), mats.ferriteInductor);
    xfmr.position.set(-2.5, 1.0, -2.1);
    const mov = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.65, 14), mats.varistorRingBlue);
    mov.rotation.x = Math.PI / 2;
    mov.position.set(4.2, 2.2, -1.8);
    const ganIc = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 0.7), mats.ispSiliconDie);
    ganIc.position.set(3.8, -2.0, -1.8);
    // Rear IEC C14 AC power socket
    const acInlet = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.0, 1.8), mats.icEpoxy);
    acInlet.position.set(-4.5, -3.0, -2.4);
    g.add(box, pcb, xfmr, mov, ganIc, acInlet);

    parts.push(
      finalizeDryboxPart(
        'db-gan-power-supply',
        41,
        '#f59e0b',
        g,
        new THREE.Vector3(-10.5, -36.5, -26.2),
        new THREE.Vector3(-26.0, -22.0, -42.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB42. Supercapacitor + LiFePO4 Outage Backup Power & Alert Module
  // =========================================================================
  {
    const g = new THREE.Group();
    const tray = new THREE.Mesh(new THREE.BoxGeometry(16.5, 11.5, 4.0), mats.shutterChassis);
    // Twin radial high-farad EDLC supercapacitors (instant surge & Matter alert transmission)
    for (const cx of [-4.6, -1.6]) {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 6.2, 14), mats.mountShimBlue);
      cap.position.set(cx, 0.2, -1.4);
      g.add(cap);
    }
    // Prismatic green LiFePO4 (LFP, thermally safe >270°C) 72h logging backup cell
    const lfpCell = new THREE.Mesh(new THREE.BoxGeometry(6.8, 7.6, 2.0), pal.mofEmerald);
    lfpCell.position.set(3.6, 0.2, -1.5);
    // BMS balancing mini-board
    const bms = new THREE.Mesh(new THREE.BoxGeometry(13.0, 1.8, 0.5), mats.hdiMainboardPcb);
    bms.position.set(0, -4.2, -1.7);
    g.add(tray, lfpCell, bms);

    parts.push(
      finalizeDryboxPart(
        'db-supercap-backup-pack',
        42,
        '#22c55e',
        g,
        new THREE.Vector3(10.5, -36.5, -26.2),
        new THREE.Vector3(26.0, -22.0, -42.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB43. 1 MΩ Safety-Resistor Copper ESD Grounding Busbar & Earth Stud
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical solid C1100 copper bonding spine connecting chassis, rails, door & glass ITO
    const spine = new THREE.Mesh(new THREE.BoxGeometry(1.6, 86.0, 0.42), mats.copperHeatSpreader);
    // Horizontal bonding branches reaching left/right walls & bottom floor
    const branchTop = new THREE.Mesh(new THREE.BoxGeometry(44.0, 0.9, 0.35), mats.copperHeatSpreader);
    branchTop.position.y = 38.0;
    const branchBot = new THREE.Mesh(new THREE.BoxGeometry(44.0, 0.9, 0.35), mats.copperHeatSpreader);
    branchBot.position.y = -42.0;

    // Encapsulated IEC 61340-5-1 1 MΩ current-limiting safety resistor block + green/yellow earth lug
    const resBlock = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.2, 1.5), mats.tantalumCapYellow);
    resBlock.position.set(0, -44.5, -0.9);
    const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 2.4, 14), mats.goldPlating);
    stud.rotation.x = Math.PI / 2;
    stud.position.set(0, -44.5, -2.2);
    g.add(spine, branchTop, branchBot, resBlock, stud);

    parts.push(
      finalizeDryboxPart(
        'db-esd-copper-ground-bus',
        43,
        '#d97706',
        g,
        new THREE.Vector3(0, -2.0, -24.5),
        new THREE.Vector3(0, -18.0, -32.0),
        cp
      )
    );
  }

  // =========================================================================
  // DB44. Viscoelastic Gel Seismic Damper Leveling Feet & Wall Anti-Tip Anchor
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 Corner Seismic Isolation Leveling Feet
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const foot = new THREE.Group();
        foot.position.set(sx * 21.5, -53.6, sz * 18.5);
        // Threaded stainless M10 height-leveling shaft
        const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 2.6, 12), mats.stainlessMachined);
        screw.position.y = 1.6;
        // Knurled leveling nut collar
        const nut = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 0.9, 12), mats.matteBlackAnodized);
        nut.position.y = 0.6;
        // Translucent viscoelastic seismic gel damping puck (absorbs Shindo-7 tremors!)
        const gelPuck = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.9, 1.3, 18), pal.seismicGelBlue);
        gelPuck.position.y = -0.45;
        // High-friction non-marking elastomer floor shoe
        const shoe = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.2, 0.6, 18), mats.epdmGasket);
        shoe.position.y = -1.3;
        foot.add(screw, nut, gelPuck, shoe);
        g.add(foot);
      }
    }

    // Twin Upper-Rear Heavy-Duty Stainless Wall Anti-Tip L-Brackets
    for (const sx of [-1, 1]) {
      const brkVert = new THREE.Mesh(new THREE.BoxGeometry(3.2, 7.2, 0.65), mats.stainlessMachined);
      brkVert.position.set(sx * 18.5, 48.0, -25.4);
      const brkHoriz = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.65, 5.2), mats.stainlessMachined);
      brkHoriz.position.set(sx * 18.5, 51.3, -23.1);
      g.add(brkVert, brkHoriz);
    }

    parts.push(
      finalizeDryboxPart(
        'db-seismic-gel-feet-anchor',
        44,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -28.0, 0),
        cp
      )
    );
  }

  return parts;
}
