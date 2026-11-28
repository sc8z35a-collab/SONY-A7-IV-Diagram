//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol5UpperParts.ts|unit=sensorFab|lines=701|exports=buildSensorFabVol5UpperParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { hiResCyl, hiResTorus, hiResSphere } from '../../engine/UltraDetailBuilders';
import {
  createVol5BoxGeo,
  finalizeVol5Part,
  makeCmpHead,
  makeEcdTank,
  makeVol5Beam,
  makeVol5Plinth,
} from './sensorFabVol5Shared';

/**
 * Builds Parts F5-01 through F5-32 of Sensor Fab Vol.5 (Pixel Wafer BEOL — 210 Steps / 13 Masks):
 * - F5-01: Giant Floating 3D Cutaway of the 5-Floor Copper Highway (Cu5+Al1) + 50.4M Cu-Cu Rooftop Pads!
 * - F5-02: Stepped Two-Tier BEOL Cleanroom Terrace (5 Color-Coded Process Lanes 4-A through 4-E)
 * - Row 1 (4-A & 4-B, F5-03–F5-13): PMD & W Contact Nails (Mask #26) -> M1 Cu Single Damascene (Mask #27, TaN/Ta Barrier, Cu ECD Superfill, 2-Stage CMP)
 * - Row 2 (4-C, F5-14–F5-25): M2–M4 Dual-Damascene x3 Floors = 90 Steps (Masks #28–#33)
 * - Row 3 (4-D, F5-26–F5-32): M5 Thick Top Trunk + Al-Cu Pad + Pre-Bond Keysight WAT Gate (Masks #34–#36)
 */
export function buildSensorFabVol5UpperParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const matCopper = mats.copperCoil;
  const matGold = mats.goldPlating;
  const matSteel = mats.stainlessMachined;
  const matDark = mats.matteBlackAnodized;
  const matBlue = mats.vcWorkingFluidCyan;
  const matCyan = mats.irCutGlass;
  const matViolet = mats.evfDichroicMirror;
  const matGreen = mats.cfaGreen;
  const matRed = mats.cfaRed;

  // =========================================================================
  // F5-01: HERO MONUMENT — Giant Floating 5-Floor Copper Highway (Cu5 + Al1) + 50.4M Cu-Cu Rooftop Pads!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision floating holographic halo ring
    const halo = new THREE.Mesh(hiResTorus(11.6, 0.32, 10, 48), matSteel);
    halo.rotation.x = Math.PI / 2;
    halo.position.y = -3.6;
    const haloGlow = new THREE.Mesh(hiResTorus(11.0, 0.14, 8, 48), matCopper);
    haloGlow.rotation.x = Math.PI / 2;
    haloGlow.position.y = -3.6;
    haloGlow.userData.noEdges = true;
    g.add(halo, haloGlow);

    // 1. Silicon FEOL Base (4T-PPD Heart already complete underneath!)
    const feolBase = new THREE.Mesh(createVol5BoxGeo(15.2, 1.35, 9.6, 0.25, 0.06, 'y'), mats.siliconBulk);
    feolBase.position.set(0, -2.4, 0);
    g.add(feolBase);

    // 2. Translucent Low-k Glass Dielectric Core (cutaway revealing 5 copper floors!)
    const lowKBlock = new THREE.Mesh(createVol5BoxGeo(14.6, 6.2, 8.8, 0.2, 0.05, 'y'), mats.sswfGlass);
    lowKBlock.position.set(0, 1.4, 0);
    lowKBlock.userData.noEdges = true;
    g.add(lowKBlock);

    // 3. Tungsten (W) Vertical Contact Nails rising from FEOL to M1!
    for (let i = -3; i <= 3; i++) {
      const wNail = new THREE.Mesh(hiResCyl(0.24, 0.2, 1.35, 10), matSteel);
      wNail.position.set(i * 1.9, -1.1, 0);
      g.add(wNail);
    }

    // 4. Five Elevated Copper Highway Floors (M1 -> M2 -> M3 -> M4 -> M5 Thick Trunk!)
    const floors = [
      { y: -0.35, h: 0.34, count: 5, alongX: true, mat: matCopper }, // M1 local
      { y: 0.72, h: 0.38, count: 4, alongX: true, mat: matGold }, // M2 36mm Row Drive
      { y: 1.82, h: 0.42, count: 6, alongX: false, mat: matBlue }, // M3 Vertical VSL + Shield
      { y: 2.96, h: 0.48, count: 4, alongX: true, mat: matCopper }, // M4 VDD/VSS Power Mesh
      { y: 4.18, h: 0.68, count: 3, alongX: true, mat: matCopper }, // M5 Heavy Top Trunk
    ];
    for (let f = 0; f < floors.length; f++) {
      const fl = floors[f];
      for (let k = 0; k < fl.count; k++) {
        const span = ((k / Math.max(1, fl.count - 1)) - 0.5) * (fl.alongX ? 6.6 : 11.8);
        const rail = new THREE.Mesh(
          fl.alongX
            ? new THREE.BoxGeometry(13.6, fl.h, 0.68 + f * 0.14)
            : new THREE.BoxGeometry(0.68, fl.h, 7.6),
          fl.mat
        );
        rail.position.set(fl.alongX ? 0 : span, fl.y, fl.alongX ? span : 0);
        g.add(rail);
      }
      // Copper Vias connecting floor f to floor f+1
      if (f < floors.length - 1) {
        for (const vx of [-4.6, 0, 4.6]) {
          const via = new THREE.Mesh(hiResCyl(0.26, 0.24, 0.92, 10), matCopper);
          via.position.set(vx, fl.y + 0.54, 0);
          g.add(via);
        }
      }
    }

    // 5. Silver Al-Cu Perimeter Pad Strip (Sony Cu5 + Al1 Confirmed!)
    const alPad = new THREE.Mesh(createVol5BoxGeo(2.8, 0.48, 7.8, 0.12, 0.04, 'y'), matSteel);
    alPad.position.set(-5.8, 4.92, 0);
    g.add(alPad);

    // 6. Rooftop 50.4M Cu-Cu Hybrid Bonding Pad Mirror Array (Mask #38 + 2-5nm Recess!)
    const hbPlate = new THREE.Mesh(
      createVol5BoxGeo(11.4, 0.56, 8.6, 0.14, 0.04, 'y'),
      mats.ultra.fab5HbCuPadArray50m
    );
    hbPlate.position.set(1.5, 5.18, 0);
    g.add(hbPlate);

    // 7. Side Display Plaque: FSI (Shaded) vs BSI (Inverted Unobstructed Light!)
    const fsiBsiScreen = new THREE.Mesh(
      createVol5BoxGeo(5.8, 4.6, 0.34, 0.16, 0.05, 'z'),
      mats.ultra.fab5FsiVsBsiBeolCutaway
    );
    fsiBsiScreen.position.set(11.4, 1.3, 0.5);
    fsiBsiScreen.rotation.y = -0.28;
    g.add(fsiBsiScreen);

    parts.push(
      finalizeVol5Part(
        'fab5-hero-beol-5floor-highway',
        1,
        '#ea580c',
        g,
        new THREE.Vector3(0, 19.2, -10.5),
        new THREE.Vector3(0, 34, -8),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // F5-02: STEPPED TWO-TIER BEOL CLEANROOM TERRACE (210 STEPS / 13 MASKS)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Upper BEOL Terrace (Blocks 4-A, 4-B, 4-C, 4-D): 126 x 1.6 x 52 centered at Z = -12.0 (top Y = -0.8)
    const upperDeck = new THREE.Mesh(
      createVol5BoxGeo(126, 1.6, 52, 1.4, 0.24, 'y'),
      mats.ultra.fab5Phase4BeolDeck
    );
    upperDeck.position.set(0, 0, -12.0);
    g.add(upperDeck);

    for (const sz of [-38.1, 14.1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(126, 0.36, 0.36), matCopper);
      rail.position.set(0, 0.72, sz);
      rail.userData.noEdges = true;
      g.add(rail);
    }

    // Architectural Step Wall at Z = +14.0 with 9 glowing copper/cyan hybrid-bonding conduits
    const stepWall = new THREE.Mesh(createVol5BoxGeo(126, 9.2, 1.4, 0.25, 0.08, 'z'), matDark);
    stepWall.position.set(0, -4.6, 14.0);
    g.add(stepWall);
    for (let i = -4; i <= 4; i++) {
      const conduit = new THREE.Mesh(
        hiResCyl(0.28, 0.28, 8.6, 10),
        i % 2 === 0 ? matCopper : matBlue
      );
      conduit.position.set(i * 13.5, -4.6, 14.85);
      conduit.userData.noEdges = true;
      g.add(conduit);
    }

    // Lower Forward-Stepped Cleanroom Terrace (Block 4-E Cu-Cu Hybrid Bonding Showcase): 126 x 1.6 x 30 centered at Z = +29.0 (top Y = -10.0)
    const lowerDeck = new THREE.Mesh(createVol5BoxGeo(126, 1.6, 30, 1.4, 0.24, 'y'), matSteel);
    lowerDeck.position.set(0, -9.2, 29.0);
    g.add(lowerDeck);
    const lowerLane = new THREE.Mesh(createVol5BoxGeo(120, 0.24, 15.6, 0.6, 0.04, 'y'), matDark);
    lowerLane.position.set(0, -8.36, 29.0);
    lowerLane.userData.noEdges = true;
    const hbStrip = new THREE.Mesh(new THREE.BoxGeometry(118, 0.14, 14.6), matGreen);
    hbStrip.position.set(0, -8.22, 29.0);
    hbStrip.userData.noEdges = true;
    const hbInner = new THREE.Mesh(new THREE.BoxGeometry(116.8, 0.16, 13.4), matDark);
    hbInner.position.set(0, -8.20, 29.0);
    hbInner.userData.noEdges = true;
    g.add(lowerLane, hbStrip, hbInner);

    parts.push(
      finalizeVol5Part(
        'fab5-phase4-beol-terrace-deck',
        2,
        '#334155',
        g,
        new THREE.Vector3(0, -1.6, 0),
        new THREE.Vector3(0, -26, 0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // UPPER ROW 1 (Z = -29.0, Y = 0.4, 11 Stations F5-03–F5-13: Blocks 4-A & 4-B, pitch 11.0mm)
  // =========================================================================
  const row1X = (idx: number) => -55.0 + idx * 11.0;

  // F5-03 (P04-001): CESL SiN 30-50nm Contact Etch Stop Liner
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matViolet));
    const feol = new THREE.Mesh(createVol5BoxGeo(7.6, 1.5, 6.0, 0.14, 0.04, 'y'), mats.siliconBulk);
    feol.position.set(0, 0.95, 0);
    const gate = new THREE.Mesh(createVol5BoxGeo(2.0, 1.2, 5.2, 0.1, 0.03, 'y'), matDark);
    gate.position.set(0, 2.2, 0);
    // Conformal violet SiN CESL blanket draped over gate
    const cesl = new THREE.Mesh(createVol5BoxGeo(7.8, 0.34, 6.2, 0.12, 0.03, 'y'), matViolet);
    cesl.position.set(0, 1.88, 0);
    const ceslCap = new THREE.Mesh(createVol5BoxGeo(2.45, 1.48, 5.5, 0.12, 0.03, 'y'), matViolet);
    ceslCap.position.set(0, 2.34, 0);
    g.add(feol, gate, cesl, ceslCap);
    parts.push(
      finalizeVol5Part('fab5-p001-cesl-sin-stopper', 3, '#6366f1', g, new THREE.Vector3(row1X(0), 0.4, -29.0), new THREE.Vector3(-22, 14, -22), cp)
    );
  }

  // F5-04 (P04-002~004): PMD BPSG/USG 500-800nm Thick Glass & Mirror CMP
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matCyan));
    const si = new THREE.Mesh(createVol5BoxGeo(7.6, 1.1, 6.0, 0.12, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 0.75, 0);
    const pmd = new THREE.Mesh(createVol5BoxGeo(7.6, 2.3, 6.0, 0.14, 0.04, 'y'), matCyan);
    pmd.position.set(0, 2.45, 0);
    g.add(si, pmd, makeCmpHead(2.5, mats, matBlue, 4.4));
    parts.push(
      finalizeVol5Part('fab5-p002-pmd-bpsg-cmp', 4, '#38bdf8', g, new THREE.Vector3(row1X(1), 0.4, -29.0), new THREE.Vector3(-18, 15, -22), cp)
    );
  }

  // F5-05 (P04-005~006): Post-CMP Clean & KLA Optical Thickness Metrology (±2%)
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matBlue));
    const wafer = new THREE.Mesh(hiResCyl(3.4, 3.4, 0.45, 28), matCyan);
    wafer.position.y = 0.6;
    const sensor = new THREE.Mesh(createVol5BoxGeo(2.8, 1.0, 2.4, 0.14, 0.04, 'y'), matDark);
    sensor.position.set(0, 4.3, 0);
    const beam = makeVol5Beam(0.16, 0.95, 3.1, matBlue);
    beam.position.set(0, 2.3, 0);
    g.add(wafer, sensor, beam);
    parts.push(
      finalizeVol5Part('fab5-p005-pmd-clean-metro', 5, '#0ea5e9', g, new THREE.Vector3(row1X(2), 0.4, -29.0), new THREE.Vector3(-14, 16, -22), cp)
    );
  }

  // F5-06 (P04-007~018) [Mask #26]: Contact Hole (CA/CT) 80-120nm 2-Stage High-AR Etch
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matBlue));
    const si = new THREE.Mesh(createVol5BoxGeo(7.6, 1.0, 6.0, 0.12, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 0.7, 0);
    // Split PMD pillars showing 3 razor-vertical contact holes drilled down to transistors!
    for (const sx of [-2.8, -0.95, 0.95, 2.8]) {
      const pmdCol = new THREE.Mesh(createVol5BoxGeo(1.25, 2.5, 5.8, 0.08, 0.03, 'y'), matCyan);
      pmdCol.position.set(sx, 2.45, 0);
      g.add(pmdCol);
    }
    for (const bx of [-1.88, 0, 1.88]) {
      const plasma = makeVol5Beam(0.22, 0.22, 3.8, matViolet);
      plasma.position.set(bx, 3.4, 0);
      g.add(plasma);
    }
    g.add(si);
    parts.push(
      finalizeVol5Part('fab5-m26-contact-hole-etch', 6, '#2563eb', g, new THREE.Vector3(row1X(3), 0.4, -29.0), new THREE.Vector3(-10, 17, -22), cp)
    );
  }

  // F5-07 (P04-019~020): Ti/TiN Fluorine Armor + WF6 Tungsten (W-CVD) Nails
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matSteel));
    const pmd = new THREE.Mesh(createVol5BoxGeo(7.6, 2.4, 5.8, 0.14, 0.04, 'y'), mats.sswfGlass);
    pmd.position.set(0, 1.4, 0);
    pmd.userData.noEdges = true;
    // 5 Shining Tungsten Nails wrapped in golden TiN armor!
    for (let i = -2; i <= 2; i++) {
      const liner = new THREE.Mesh(hiResCyl(0.46, 0.42, 2.6, 12), matGold);
      liner.position.set(i * 1.45, 1.5, 0);
      const wNail = new THREE.Mesh(hiResCyl(0.34, 0.3, 2.75, 12), matSteel);
      wNail.position.set(i * 1.45, 1.56, 0);
      g.add(liner, wNail);
    }
    // Overburden tungsten blanket on top before CMP
    const topW = new THREE.Mesh(createVol5BoxGeo(7.6, 0.45, 5.8, 0.1, 0.03, 'y'), matSteel);
    topW.position.set(0, 2.95, 0);
    g.add(pmd, topW);
    parts.push(
      finalizeVol5Part('fab5-p019-titin-w-cvd-nail', 7, '#64748b', g, new THREE.Vector3(row1X(4), 0.4, -29.0), new THREE.Vector3(-6, 18, -22), cp)
    );
  }

  // F5-08 (P04-021~022): Tungsten W-CMP Polish & Zero-Short Inspection
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matGreen));
    const pmd = new THREE.Mesh(createVol5BoxGeo(7.6, 2.1, 5.8, 0.12, 0.04, 'y'), matCyan);
    pmd.position.set(0, 1.25, 0);
    // Cleanly isolated flush tungsten nail heads on mirror PMD!
    for (let i = -2; i <= 2; i++) {
      const head = new THREE.Mesh(hiResCyl(0.36, 0.36, 2.16, 12), matSteel);
      head.position.set(i * 1.45, 1.28, 0);
      g.add(head);
    }
    g.add(pmd, makeCmpHead(2.6, mats, matGreen, 4.1));
    parts.push(
      finalizeVol5Part('fab5-p021-w-cmp-inspect', 8, '#10b981', g, new THREE.Vector3(row1X(5), 0.4, -29.0), new THREE.Vector3(-2, 19, -22), cp)
    );
  }

  // F5-09 (P04-023~025): M1 SiCN Etch Stop + Low-k SiOC Dielectric (k≈2.7–3.0)
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matBlue));
    const sicn = new THREE.Mesh(createVol5BoxGeo(7.6, 0.48, 5.8, 0.1, 0.03, 'y'), matViolet);
    sicn.position.set(0, 0.45, 0);
    const lowk = new THREE.Mesh(createVol5BoxGeo(7.6, 2.1, 5.8, 0.14, 0.04, 'y'), matBlue);
    lowk.position.set(0, 1.75, 0);
    g.add(sicn, lowk);
    parts.push(
      finalizeVol5Part('fab5-p023-m1-sicn-lowk', 9, '#0284c7', g, new THREE.Vector3(row1X(6), 0.4, -29.0), new THREE.Vector3(2, 19, -22), cp)
    );
  }

  // F5-10 (P04-026~037) [Mask #27]: M1 First Copper Single-Damascene Trench Etch (90-140nm)
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matCopper));
    const base = new THREE.Mesh(createVol5BoxGeo(7.6, 0.8, 5.8, 0.1, 0.03, 'y'), mats.siliconBulk);
    base.position.set(0, 0.6, 0);
    // Low-k walls with carved empty M1 trenches awaiting copper!
    for (const sz of [-2.1, 0, 2.1]) {
      const ridge = new THREE.Mesh(createVol5BoxGeo(7.6, 1.7, 1.15, 0.08, 0.03, 'y'), matBlue);
      ridge.position.set(0, 1.85, sz);
      g.add(ridge);
    }
    g.add(base);
    parts.push(
      finalizeVol5Part('fab5-m27-m1-single-damascene', 10, '#ea580c', g, new THREE.Vector3(row1X(7), 0.4, -29.0), new THREE.Vector3(6, 18, -22), cp)
    );
  }

  // F5-11 (P04-038~039) [CROWN JEWEL]: TaN/Ta 5-10nm Copper-Poison Barrier + Cu Seed PVD
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matViolet));
    const lowk = new THREE.Mesh(createVol5BoxGeo(7.6, 2.1, 5.8, 0.12, 0.04, 'y'), matBlue);
    lowk.position.set(0, 1.25, 0);
    // Violet TaN/Ta armor trough + Copper Seed inner U-liner + Display Plaque!
    const barrier = new THREE.Mesh(createVol5BoxGeo(7.6, 1.5, 2.6, 0.08, 0.03, 'y'), matViolet);
    barrier.position.set(0, 2.1, 0);
    const seed = new THREE.Mesh(createVol5BoxGeo(7.6, 1.1, 1.8, 0.06, 0.02, 'y'), matCopper);
    seed.position.set(0, 2.38, 0);
    const plaque = new THREE.Mesh(
      createVol5BoxGeo(4.8, 2.6, 0.25, 0.1, 0.03, 'z'),
      mats.ultra.fab5DualDamasceneCrossSection
    );
    plaque.position.set(0, 4.3, -1.6);
    g.add(lowk, barrier, seed, plaque);
    parts.push(
      finalizeVol5Part('fab5-p038-tantal-barrier-seed', 11, '#7c3aed', g, new THREE.Vector3(row1X(8), 0.4, -29.0), new THREE.Vector3(10, 17, -22), cp)
    );
  }

  // F5-12 (P04-040~041) [CROWN JEWEL]: Cu ECD Bottom-Up Superfilling + 150-250°C Grain Anneal
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matCopper));
    g.add(makeEcdTank(7.6, 5.8, 2.3, mats));
    // Glowing copper overburden filling upward from trench bottom!
    const cuFill = new THREE.Mesh(createVol5BoxGeo(6.4, 1.1, 4.6, 0.14, 0.04, 'y'), matCopper);
    cuFill.position.set(0, 2.75, 0);
    g.add(cuFill);
    parts.push(
      finalizeVol5Part('fab5-p040-cu-ecd-superfill', 12, '#f97316', g, new THREE.Vector3(row1X(9), 0.4, -29.0), new THREE.Vector3(14, 16, -22), cp)
    );
  }

  // F5-13 (P04-042~044): 2-Stage Cu CMP + BTA Anti-Corrosion Clean & Sheet Resistance Check
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(9.6, 8.8, 1.2, mats, matGreen));
    const lowk = new THREE.Mesh(createVol5BoxGeo(7.6, 1.9, 5.8, 0.12, 0.04, 'y'), matBlue);
    lowk.position.set(0, 1.15, 0);
    // Crisp flush inlaid copper M1 wires!
    for (const sz of [-1.6, 0, 1.6]) {
      const wire = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.45, 0.85), matCopper);
      wire.position.set(0, 2.02, sz);
      g.add(wire);
    }
    g.add(lowk, makeCmpHead(2.6, mats, matCopper, 4.0));
    parts.push(
      finalizeVol5Part('fab5-p042-cu-2stage-cmp-bta', 13, '#059669', g, new THREE.Vector3(row1X(10), 0.4, -29.0), new THREE.Vector3(18, 15, -22), cp)
    );
  }

  // =========================================================================
  // UPPER ROW 2 (Z = -12.0, Y = 0.4, 12 Stations F5-14–F5-25: Block 4-C M2–M4 Dual-Damascene = 90 Steps, pitch 10.1mm)
  // =========================================================================
  const row2X = (idx: number) => -55.55 + idx * 10.1;

  // Helper for compact M2/M3/M4 Dual-Damascene 4-station triplets
  const buildFloorTriplet = (
    floorIdx: number, // 0=M2, 1=M3, 2=M4
    baseOrder: number,
    ids: [string, string, string, string],
    accentColor: string,
    wireMat: THREE.Material,
    isVerticalM3 = false,
    isMeshM4 = false
  ) => {
    const baseCol = floorIdx * 4;
    const xOff = (c: number) => -22 + (baseCol + c) * 4;

    // 1) SiCN Cap + Unified Via/Trench Low-k IMD
    {
      const g = new THREE.Group();
      g.add(makeVol5Plinth(8.8, 8.6, 1.2, mats, matBlue));
      const cap = new THREE.Mesh(createVol5BoxGeo(6.8, 0.45, 5.6, 0.1, 0.03, 'y'), matViolet);
      cap.position.set(0, 0.42, 0);
      const imd = new THREE.Mesh(createVol5BoxGeo(6.8, 2.2 + floorIdx * 0.28, 5.6, 0.14, 0.04, 'y'), matCyan);
      imd.position.set(0, 1.75 + floorIdx * 0.14, 0);
      g.add(cap, imd);
      parts.push(
        finalizeVol5Part(ids[0], baseOrder, '#0ea5e9', g, new THREE.Vector3(row2X(baseCol), 0.4, -12.0), new THREE.Vector3(xOff(0), 11, -4), cp)
      );
    }

    // 2) Via Mask (V1 / V2 / V3) Vertical Elevator Shafts
    {
      const g = new THREE.Group();
      g.add(makeVol5Plinth(8.8, 8.6, 1.2, mats, matViolet));
      const imd = new THREE.Mesh(createVol5BoxGeo(6.8, 2.4, 5.6, 0.12, 0.04, 'y'), mats.sswfGlass);
      imd.position.set(0, 1.4, 0);
      imd.userData.noEdges = true;
      for (const vx of [-2.0, 0, 2.0]) {
        const shaft = new THREE.Mesh(hiResCyl(0.36, 0.32, 2.6, 12), matViolet);
        shaft.position.set(vx, 1.5, 0);
        const beam = makeVol5Beam(0.18, 0.18, 1.6, matBlue);
        beam.position.set(vx, 3.6, 0);
        g.add(shaft, beam);
      }
      g.add(imd);
      parts.push(
        finalizeVol5Part(ids[1], baseOrder + 1, '#7c3aed', g, new THREE.Vector3(row2X(baseCol + 1), 0.4, -12.0), new THREE.Vector3(xOff(1), 13, -4), cp)
      );
    }

    // 3) Metal Trench Mask (M2 Horizontal Row Drive / M3 Vertical VSL+Shield / M4 Power Mesh!)
    {
      const g = new THREE.Group();
      g.add(makeVol5Plinth(8.8, 8.6, 1.2, mats, wireMat));
      const base = new THREE.Mesh(createVol5BoxGeo(6.8, 1.3, 5.6, 0.12, 0.04, 'y'), matDark);
      base.position.set(0, 0.85, 0);
      g.add(base);
      if (isMeshM4) {
        // Heavy Criss-Cross VDD/VSS Power Mesh!
        for (const z of [-1.6, 0, 1.6]) {
          const barX = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.56, 0.65), matCopper);
          barX.position.set(0, 1.85, z);
          g.add(barX);
        }
        for (const x of [-2.0, 0, 2.0]) {
          const barZ = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.56, 5.2), matGold);
          barZ.position.set(x, 2.25, 0);
          g.add(barZ);
        }
      } else if (isVerticalM3) {
        // Vertical VSL Signal Lines flanked by Emerald Ground Shields + Routing Screen!
        for (const x of [-1.8, 0, 1.8]) {
          const vsl = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.65, 5.2), matBlue);
          vsl.position.set(x, 1.9, 0);
          g.add(vsl);
        }
        for (const gx of [-2.7, -0.9, 0.9, 2.7]) {
          const gnd = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.62, 5.2), matGreen);
          gnd.position.set(gx, 1.88, 0);
          g.add(gnd);
        }
        const mapPlaque = new THREE.Mesh(
          createVol5BoxGeo(4.8, 2.6, 0.24, 0.1, 0.03, 'z'),
          mats.ultra.fab5M2M4RoutingGrid
        );
        mapPlaque.position.set(0, 3.85, -1.6);
        g.add(mapPlaque);
      } else {
        // M2 Long Horizontal 36mm Row Drive Lines (TG / RST / SEL)
        for (const z of [-1.8, -0.6, 0.6, 1.8]) {
          const rowLine = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.54, 0.62), matGold);
          rowLine.position.set(0, 1.85, z);
          g.add(rowLine);
        }
      }
      parts.push(
        finalizeVol5Part(ids[2], baseOrder + 2, accentColor, g, new THREE.Vector3(row2X(baseCol + 2), 0.4, -12.0), new THREE.Vector3(xOff(2), 15, -4), cp)
      );
    }

    // 4) Dual-Damascene 1-Shot Superfill + 2-Stage CMP & BTA Clean
    {
      const g = new THREE.Group();
      g.add(makeVol5Plinth(8.8, 8.6, 1.2, mats, matCopper));
      const imd = new THREE.Mesh(createVol5BoxGeo(6.8, 2.1, 5.6, 0.12, 0.04, 'y'), mats.sswfGlass);
      imd.position.set(0, 1.25, 0);
      imd.userData.noEdges = true;
      // Visible T-shaped unified copper Via+Trench inside glass!
      const trench = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.72, 2.4), matCopper);
      trench.position.set(0, 2.02, 0);
      for (const vx of [-1.8, 1.8]) {
        const via = new THREE.Mesh(hiResCyl(0.36, 0.32, 1.45, 12), matCopper);
        via.position.set(vx, 0.96, 0);
        g.add(via);
      }
      g.add(imd, trench, makeCmpHead(2.3, mats, matCopper, 3.85));
      parts.push(
        finalizeVol5Part(ids[3], baseOrder + 3, '#ea580c', g, new THREE.Vector3(row2X(baseCol + 3), 0.4, -12.0), new THREE.Vector3(xOff(3), 13, -4), cp)
      );
    }
  };

  buildFloorTriplet(
    0,
    14,
    ['fab5-p045-m2-sicn-lowk', 'fab5-m28-via1-pattern', 'fab5-m29-m2-row-drive', 'fab5-p072-m2-dual-fill-cmp'],
    '#f59e0b',
    matGold
  );
  buildFloorTriplet(
    1,
    18,
    ['fab5-p075-m3-sicn-lowk', 'fab5-m30-via2-pattern', 'fab5-m31-m3-vsl-shield', 'fab5-p102-m3-dual-fill-cmp'],
    '#0284c7',
    matBlue,
    true,
    false
  );
  buildFloorTriplet(
    2,
    22,
    ['fab5-p105-m4-sicn-imd', 'fab5-m32-via3-pattern', 'fab5-m33-m4-power-mesh', 'fab5-p132-m4-dual-fill-cmp'],
    '#ea580c',
    matCopper,
    false,
    true
  );

  // =========================================================================
  // UPPER ROW 3 (Z = +5.0, Y = 0.4, 7 Grand Stations F5-26–F5-32: Block 4-D M5 + Al-Cu + Pre-Bond WAT, pitch 16.8mm)
  // =========================================================================
  const row3X = (idx: number) => -50.4 + idx * 16.8;

  // F5-26 (P04-135~136): M5 Thick 500-1,000nm Low-Warp IMD
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(13.6, 9.2, 1.2, mats, matBlue));
    const cap = new THREE.Mesh(createVol5BoxGeo(10.8, 0.5, 6.2, 0.12, 0.04, 'y'), matViolet);
    cap.position.set(0, 0.45, 0);
    const thickImd = new THREE.Mesh(createVol5BoxGeo(10.8, 3.1, 6.2, 0.18, 0.05, 'y'), matCyan);
    thickImd.position.set(0, 2.25, 0);
    g.add(cap, thickImd);
    parts.push(
      finalizeVol5Part('fab5-p135-m5-thick-imd', 26, '#0ea5e9', g, new THREE.Vector3(row3X(0), 0.4, 5.0), new THREE.Vector3(-20, 10, 14), cp)
    );
  }

  // F5-27 (P04-137~148) [Mask #34]: Via 4 Heavy-Current Wide Via Array
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(13.6, 9.2, 1.2, mats, matViolet));
    const imd = new THREE.Mesh(createVol5BoxGeo(10.8, 2.8, 6.2, 0.16, 0.04, 'y'), mats.sswfGlass);
    imd.position.set(0, 1.6, 0);
    imd.userData.noEdges = true;
    for (const vx of [-3.4, -1.15, 1.15, 3.4]) {
      for (const vz of [-1.4, 1.4]) {
        const v4 = new THREE.Mesh(hiResCyl(0.56, 0.5, 2.95, 14), matCopper);
        v4.position.set(vx, 1.68, vz);
        g.add(v4);
      }
    }
    g.add(imd);
    parts.push(
      finalizeVol5Part('fab5-m34-via4-heavy', 27, '#7c3aed', g, new THREE.Vector3(row3X(1), 0.4, 5.0), new THREE.Vector3(-13, 11, 14), cp)
    );
  }

  // F5-28 (P04-149~160) [Mask #35]: M5 Thick Top Copper Power Trunk & Clock Bus
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(13.6, 9.2, 1.2, mats, matCopper));
    const imd = new THREE.Mesh(createVol5BoxGeo(10.8, 1.8, 6.2, 0.14, 0.04, 'y'), matDark);
    imd.position.set(0, 1.1, 0);
    // Massive thick copper highway trunks!
    for (const sz of [-1.9, 0, 1.9]) {
      const trunk = new THREE.Mesh(createVol5BoxGeo(10.2, 1.35, 1.45, 0.12, 0.04, 'y'), matCopper);
      trunk.position.set(0, 2.65, sz);
      g.add(trunk);
    }
    g.add(imd);
    parts.push(
      finalizeVol5Part('fab5-m35-m5-top-trunk', 28, '#ea580c', g, new THREE.Vector3(row3X(2), 0.4, 5.0), new THREE.Vector3(-6, 12, 14), cp)
    );
  }

  // F5-29 (P04-161~162): M5 Thick Cu Superfill & Low-Dishing CMP
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(13.6, 9.2, 1.2, mats, matGold));
    const slab = new THREE.Mesh(createVol5BoxGeo(10.8, 2.1, 6.2, 0.14, 0.04, 'y'), matCyan);
    slab.position.set(0, 1.25, 0);
    for (const sz of [-1.8, 0, 1.8]) {
      const cuTop = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.72, 1.3), matCopper);
      cuTop.position.set(0, 2.02, sz);
      g.add(cuTop);
    }
    g.add(slab, makeCmpHead(3.4, mats, matGold, 4.2));
    parts.push(
      finalizeVol5Part('fab5-p161-m5-fill-cmp', 29, '#d97706', g, new THREE.Vector3(row3X(3), 0.4, 5.0), new THREE.Vector3(0, 12, 14), cp)
    );
  }

  // F5-30 (P04-163~164): Al-Cu Alloy Sputter (0.5-1.0µm — Sony Cu5+Al1 Confirmed!)
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(13.6, 9.2, 1.2, mats, matSteel));
    const sub = new THREE.Mesh(createVol5BoxGeo(10.8, 1.6, 6.2, 0.14, 0.04, 'y'), matDark);
    sub.position.set(0, 1.0, 0);
    const alSheet = new THREE.Mesh(createVol5BoxGeo(10.8, 0.95, 6.2, 0.14, 0.04, 'y'), matSteel);
    alSheet.position.set(0, 2.28, 0);
    const target = new THREE.Mesh(hiResCyl(3.2, 3.2, 0.65, 28), matSteel);
    target.position.set(0, 4.6, 0);
    const sputterGlow = makeVol5Beam(2.4, 3.2, 1.7, matBlue);
    sputterGlow.position.set(0, 3.55, 0);
    g.add(sub, alSheet, target, sputterGlow);
    parts.push(
      finalizeVol5Part('fab5-p163-alcu-pad-sputter', 30, '#64748b', g, new THREE.Vector3(row3X(4), 0.4, 5.0), new THREE.Vector3(6, 12, 14), cp)
    );
  }

  // F5-31 (P04-165~176) [Mask #36]: Al External Bond Pad, BSI IR Alignment Mark & WAT Pads
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(13.6, 9.2, 1.2, mats, matGold));
    const base = new THREE.Mesh(createVol5BoxGeo(10.8, 1.5, 6.2, 0.14, 0.04, 'y'), matDark);
    base.position.set(0, 0.95, 0);
    // Row of gleaming silver Al wirebond pads on left + golden BSI IR crosshair mark on right!
    for (const px of [-3.8, -2.0, -0.2]) {
      const pad = new THREE.Mesh(createVol5BoxGeo(1.4, 0.72, 4.2, 0.1, 0.03, 'y'), matSteel);
      pad.position.set(px, 2.08, 0);
      g.add(pad);
    }
    const crossX = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.55, 0.65), matGold);
    crossX.position.set(3.0, 2.0, 0);
    const crossZ = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 3.4), matGold);
    crossZ.position.set(3.0, 2.0, 0);
    g.add(base, crossX, crossZ);
    parts.push(
      finalizeVol5Part('fab5-m36-al-pad-ir-mark', 31, '#94a3b8', g, new THREE.Vector3(row3X(5), 0.4, 5.0), new THREE.Vector3(13, 11, 14), cp)
    );
  }

  // F5-32 (P04-177~178) [CROWN JEWEL]: Pre-Bond WAT Parametric Gate (Keysight Multi-Needle Prober!)
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(13.6, 9.2, 1.2, mats, matGreen));
    const wafer = new THREE.Mesh(hiResCyl(4.0, 4.0, 0.5, 32), mats.siliconBulk);
    wafer.position.set(0, 0.75, 0);
    // Probe Card Ring + 6 Golden Cantilever Needles descending onto TEG pads!
    const card = new THREE.Mesh(hiResTorus(3.2, 0.34, 10, 32), matDark);
    card.rotation.x = Math.PI / 2;
    card.position.set(0, 3.6, 0);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const needle = new THREE.Mesh(hiResCyl(0.08, 0.14, 2.9, 8), matGold);
      needle.position.set(Math.cos(a) * 1.9, 2.25, Math.sin(a) * 1.9);
      needle.rotation.z = Math.cos(a) * 0.48;
      needle.rotation.x = -Math.sin(a) * 0.48;
      g.add(needle);
    }
    // Green PASS / Red REJECT signal beacons on probe bridge
    const passLamp = new THREE.Mesh(hiResSphere(0.56, 14, 12), matGreen);
    passLamp.position.set(-1.6, 4.45, 0);
    const failLamp = new THREE.Mesh(hiResSphere(0.56, 14, 12), matRed);
    failLamp.position.set(1.6, 4.45, 0);
    g.add(wafer, card, passLamp, failLamp);
    parts.push(
      finalizeVol5Part('fab5-p177-prebond-wat-gate', 32, '#10b981', g, new THREE.Vector3(row3X(6), 0.4, 5.0), new THREE.Vector3(20, 10, 14), cp)
    );
  }

  return parts;
}
