//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol4UpperParts.ts|unit=sensorFab|lines=854|exports=buildSensorFabVol4UpperParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { hiResCyl, hiResSphere, hiResTorus, applyPlanarUVs } from '../../engine/UltraDetailBuilders';
import {
  createVol4BoxGeo,
  finalizeVol4Part,
  makeFurnaceTower,
  makeIonImplantCannon,
  makeVol4Beam,
  makeVol4Plinth,
} from './sensorFabVol4Shared';

/**
 * Builds Parts F4-01 through F4-33 of Sensor Fab Vol.4 (Pixel Wafer FEOL — 380 Steps / 25 Masks):
 * - F4-01: Giant Floating 3D Cutaway of the Completed 4T-PPD Pixel Heart
 * - F4-02: Stepped Two-Tier FEOL Cleanroom Terrace (6 Color-Coded Process Lanes)
 * - F4-03–F4-10 (Block 3-A): Initial Clean, Pad Ox, Mask #01 Align, SiN, Mask #02 STI, HDP Fill, Mask #03, CMP/Strip
 * - F4-11–F4-14 (Block 3-B): DTI Hardmask, Mask #04 Deep F-DTI Wall, Sidewall Passivation, Optical Mirror Fill
 * - F4-15–F4-27 (Block 3-C): Masks #05–#10 Wells/Vt, Masks #11–#13 RGB 3-Depth MeV PD, Mask #14 Dual-Pixel, Mask #15–#16, Recovery Anneal
 * - F4-28–F4-33 (Block 3-D): Mask #17 VTG Straw, 3.3V Gate Ox, Mask #18 Dual Ox, 2–3nm Ox + Poly-Si, Mask #19 Gate Etch, Re-Ox/CD-SEM
 */
export function buildSensorFabVol4UpperParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const matViolet = mats.evfDichroicMirror;
  const matBlue = mats.vcWorkingFluidCyan;
  const matCyan = mats.irCutGlass;
  const matAmber = mats.goldPlating;
  const matCopper = mats.copperCoil;
  const matGreen = mats.cfaGreen;
  const matRed = mats.cfaRed;
  const matDark = mats.matteBlackAnodized;
  const matSteel = mats.stainlessMachined;

  // =========================================================================
  // F4-01: HERO MONUMENT — Giant 3D Cutaway of the Completed 4T-PPD Pixel Heart!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Floating holographic precision ring halo under the completed pixel heart
    const halo = new THREE.Mesh(hiResTorus(11.4, 0.32, 10, 48), matSteel);
    halo.rotation.x = Math.PI / 2;
    halo.position.y = -3.6;
    g.add(halo);
    const haloGlow = new THREE.Mesh(hiResTorus(10.8, 0.14, 8, 48), matBlue);
    haloGlow.rotation.x = Math.PI / 2;
    haloGlow.position.y = -3.6;
    haloGlow.userData.noEdges = true;
    g.add(haloGlow);

    // 1. Deep P-Well Floor (Mask #05) bouncing electrons upward
    const pFloor = new THREE.Mesh(createVol4BoxGeo(15.6, 1.0, 9.6, 0.25, 0.06, 'y'), matViolet);
    pFloor.position.set(0, -2.5, 0);
    g.add(pFloor);

    // 2. 3-Depth Stacked RGB Photodiode Buckets inside silicon crystal (Masks #11, #12, #13!)
    const pdRed = new THREE.Mesh(createVol4BoxGeo(8.2, 2.2, 7.6, 0.2, 0.06, 'y'), matRed);
    pdRed.position.set(-2.2, -0.8, 0);
    g.add(pdRed);
    const pdGreen = new THREE.Mesh(createVol4BoxGeo(8.2, 1.6, 7.6, 0.2, 0.06, 'y'), matGreen);
    pdGreen.position.set(-2.2, 1.15, 0);
    g.add(pdGreen);
    const pdBlue = new THREE.Mesh(createVol4BoxGeo(8.2, 1.05, 7.6, 0.18, 0.05, 'y'), matBlue);
    pdBlue.position.set(-2.2, 2.52, 0);
    g.add(pdBlue);

    // 3. Surface P+ Pinning Lid (Mask #22) sealing the top of the PD (1/1,000 dark current!)
    const pinLid = new THREE.Mesh(createVol4BoxGeo(8.4, 0.44, 7.8, 0.14, 0.04, 'y'), matAmber);
    pinLid.position.set(-2.2, 3.3, 0);
    g.add(pinLid);

    // 4. Deep Front DTI Walls (Mask #04, left & right framing the pixel)
    for (const sx of [-7.1, 7.1]) {
      const dti = new THREE.Mesh(createVol4BoxGeo(0.95, 6.6, 9.4, 0.12, 0.04, 'y'), matSteel);
      dti.position.set(sx, 0.35, 0);
      g.add(dti);
      const passiv = new THREE.Mesh(new THREE.BoxGeometry(0.18, 6.4, 9.2), matViolet);
      passiv.position.set(sx > 0 ? sx - 0.56 : sx + 0.56, 0.35, 0);
      passiv.userData.noEdges = true;
      g.add(passiv);
    }

    // 5. Transistor P-Well + Vertical Transfer Gate (VTG Straw, Mask #17) + Poly-Si Gate (Mask #19) + Sidewalls + FD Cup!
    const trWell = new THREE.Mesh(createVol4BoxGeo(4.6, 5.4, 7.6, 0.18, 0.05, 'y'), mats.siliconBulk);
    trWell.position.set(4.3, 0.75, 0);
    g.add(trWell);
    // VTG Straw plunging vertically into PD!
    const vtgStraw = new THREE.Mesh(hiResCyl(0.62, 0.48, 4.6, 16), matDark);
    vtgStraw.position.set(2.3, 2.2, 0);
    g.add(vtgStraw);
    // Poly-Si Gate Roof + Sidewall Shoulder Pads
    const polyRoof = new THREE.Mesh(createVol4BoxGeo(2.4, 1.25, 6.2, 0.14, 0.04, 'y'), matDark);
    polyRoof.position.set(2.5, 4.35, 0);
    g.add(polyRoof);
    for (const dx of [-1.45, 1.45]) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.15, 6.2), matCyan);
      sp.position.set(2.5 + dx, 4.25, 0);
      g.add(sp);
    }
    // Floating Diffusion (FD) Golden Measuring Cup
    const fdCup = new THREE.Mesh(createVol4BoxGeo(1.9, 1.4, 4.8, 0.12, 0.04, 'y'), matAmber);
    fdCup.position.set(5.35, 3.05, 0);
    g.add(fdCup);

    // 6. Emerald Salicide Block (SAB, Mask #25) Canopy Shielding Pixel Surface!
    const sabCap = new THREE.Mesh(createVol4BoxGeo(8.8, 0.24, 8.2, 0.12, 0.03, 'y'), mats.sswfGlass);
    sabCap.position.set(-2.2, 3.95, 0);
    sabCap.userData.noEdges = true;
    g.add(sabCap);

    // 7. Three Vivid RGB Photon Beams plunging from overhead to exact physical 1/alpha depths!
    const bRay = makeVol4Beam(0.24, 0.24, 3.6, matBlue);
    bRay.position.set(-4.6, 5.4, 0);
    const gRay = makeVol4Beam(0.24, 0.24, 5.2, matGreen);
    gRay.position.set(-2.2, 4.6, 0);
    const rRay = makeVol4Beam(0.24, 0.24, 6.8, matRed);
    rRay.position.set(0.2, 3.8, 0);
    g.add(bRay, gRay, rRay);

    // Front Educational Depth Legend Plaque attached cleanly on side
    const legendPlate = new THREE.Mesh(
      createVol4BoxGeo(5.8, 4.6, 0.34, 0.16, 0.05, 'z'),
      mats.ultra.fab4RgbAbsorptionProfile
    );
    legendPlate.position.set(11.4, 1.0, 0.6);
    legendPlate.rotation.y = -0.28;
    g.add(legendPlate);

    parts.push(
      finalizeVol4Part(
        'fab4-hero-feol-pixel-heart',
        1,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 18.8, -10.5),
        new THREE.Vector3(0, 34, -8),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // F4-02: STEPPED TWO-TIER FEOL CLEANROOM TERRACE (380 STEPS / 25 MASKS)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Upper FEOL Terrace (Blocks 3-A, 3-B, 3-C, 3-D): 126 x 1.6 x 52 centered at Z = -12.0 (top Y = -0.8)
    const upperDeck = new THREE.Mesh(
      createVol4BoxGeo(126, 1.6, 52, 1.4, 0.24, 'y'),
      mats.ultra.fab4Phase3FeolDeck
    );
    upperDeck.position.set(0, 0, -12.0);
    g.add(upperDeck);

    for (const sz of [-38.1, 14.1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(126.4, 0.36, 0.45), matSteel);
      rail.position.set(0, 0.65, sz);
      rail.userData.noEdges = true;
      g.add(rail);
    }

    // Architectural Cleanroom Step Wall at Z = +14.0 with 9 glowing ion/thermal conduits
    const stepWall = new THREE.Mesh(createVol4BoxGeo(126, 9.4, 1.2, 0.3, 0.1, 'z'), matDark);
    stepWall.position.set(0, -4.7, 14.0);
    g.add(stepWall);
    for (let i = -4; i <= 4; i++) {
      const pipe = new THREE.Mesh(hiResCyl(0.28, 0.28, 8.6, 10), i % 2 === 0 ? matViolet : matAmber);
      pipe.position.set(i * 12.6, -4.6, 14.7);
      pipe.userData.noEdges = true;
      g.add(pipe);
    }

    // Lower Forward-Stepped FEOL Terrace (Blocks 3-E & 3-F): 126 x 1.6 x 38 centered at Z = +33.0 (top Y = -10.0)
    const lowerDeck = new THREE.Mesh(
      createVol4BoxGeo(126, 1.6, 38, 1.4, 0.24, 'y'),
      matSteel
    );
    lowerDeck.position.set(0, -9.2, 33.0);
    g.add(lowerDeck);

    // Lower deck cleanroom lane strips (3-E Crimson/Pink P+ Pinning at Z=24.5, 3-F Emerald/Gold SAB & H2 at Z=42.5)
    const lane3E = new THREE.Mesh(new THREE.BoxGeometry(120, 0.12, 14.8), matRed);
    lane3E.position.set(0, -8.34, 24.5);
    lane3E.userData.noEdges = true;
    g.add(lane3E);
    const lane3EIn = new THREE.Mesh(new THREE.BoxGeometry(118.6, 0.14, 13.6), matDark);
    lane3EIn.position.set(0, -8.32, 24.5);
    lane3EIn.userData.noEdges = true;
    g.add(lane3EIn);

    const lane3F = new THREE.Mesh(new THREE.BoxGeometry(120, 0.12, 15.8), matGreen);
    lane3F.position.set(0, -8.34, 42.5);
    lane3F.userData.noEdges = true;
    g.add(lane3F);
    const lane3FIn = new THREE.Mesh(new THREE.BoxGeometry(118.6, 0.14, 14.6), matDark);
    lane3FIn.position.set(0, -8.32, 42.5);
    lane3FIn.userData.noEdges = true;
    g.add(lane3FIn);

    // Heavy seismic cleanroom piers
    const pierGeo = hiResCyl(1.1, 1.4, 9.2, 12);
    for (const sx of [-57, -19, 19, 57]) {
      for (const sz of [-33, 8]) {
        const pier = new THREE.Mesh(pierGeo, matDark);
        pier.position.set(sx, -5.4, sz);
        g.add(pier);
      }
    }

    parts.push(
      finalizeVol4Part(
        'fab4-phase3-feol-terrace-deck',
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
  // UPPER ROW 1 (Z = -29.0, Y = 0.4, 12 Parts F4-03–F4-14: Blocks 3-A & 3-B, pitch 10.2mm)
  // =========================================================================
  const row1X = (idx: number) => -56.1 + idx * 10.2;

  // F4-03 (P03-001~003): Lot Receiving, Laser ID & Initial RCA Clean (SCREEN)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matCyan));
    const bowl = new THREE.Mesh(hiResCyl(3.2, 3.0, 1.4, 22), matSteel);
    bowl.position.set(0, 0.9, 0.3);
    g.add(bowl);
    const wafer = new THREE.Mesh(hiResCyl(2.55, 2.55, 0.28, 24), mats.siliconBulk);
    wafer.position.set(0, 1.75, 0.3);
    g.add(wafer);
    const sprayArm = new THREE.Mesh(createVol4BoxGeo(4.2, 0.36, 0.55, 0.08, 0.03, 'y'), matBlue);
    sprayArm.position.set(0, 3.6, 0.3);
    g.add(sprayArm);
    const jet = makeVol4Beam(0.12, 0.55, 1.5, matCyan);
    jet.position.set(0, 2.65, 0.3);
    g.add(jet);
    parts.push(
      finalizeVol4Part('fab4-p001-incoming-rca-clean', 3, '#06b6d4', g, new THREE.Vector3(row1X(0), 0.4, -29.0), new THREE.Vector3(-22, 14, -22), cp)
    );
  }

  // F4-04 (P03-004~006): Initial Thermal Pad Oxidation (10nm SiO2, 850-950°C Vertical Furnace)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matCopper));
    const furn = makeFurnaceTower(2.0, 4.4, matCopper, mats);
    furn.position.set(-1.3, 0, -0.5);
    g.add(furn);
    // Wafer cutaway showing crisp 10nm transparent glass blanket on silicon
    const si = new THREE.Mesh(createVol4BoxGeo(3.2, 1.4, 3.6, 0.1, 0.04, 'y'), mats.siliconBulk);
    si.position.set(2.1, 0.9, 1.2);
    g.add(si);
    const padOx = new THREE.Mesh(new THREE.BoxGeometry(3.25, 0.28, 3.65), matCyan);
    padOx.position.set(2.1, 1.78, 1.2);
    g.add(padOx);
    parts.push(
      finalizeVol4Part('fab4-p004-initial-pad-oxide', 4, '#ea580c', g, new THREE.Vector3(row1X(1), 0.4, -29.0), new THREE.Vector3(-18, 15, -22), cp)
    );
  }

  // F4-05 (P03-007~018) [Mask #01]: Zero-Layer Alignment Cross Marks (100-150nm)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matAmber));
    const si = new THREE.Mesh(createVol4BoxGeo(6.4, 1.3, 6.2, 0.14, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 0.85, 0.2);
    g.add(si);
    // Deep golden engraved alignment cross visible immediately!
    const armX = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.45, 0.72), matAmber);
    armX.position.set(0, 1.72, 0.2);
    const armZ = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.45, 4.6), matAmber);
    armZ.position.set(0, 1.72, 0.2);
    g.add(armX, armZ);
    const scannerLens = new THREE.Mesh(hiResCyl(1.4, 1.0, 1.8, 18), matDark);
    scannerLens.position.set(0, 4.4, 0.2);
    g.add(scannerLens);
    const uv = makeVol4Beam(0.7, 1.2, 1.8, matBlue);
    uv.position.set(0, 2.7, 0.2);
    g.add(uv);
    parts.push(
      finalizeVol4Part('fab4-m01-zero-layer-align', 5, '#f59e0b', g, new THREE.Vector3(row1X(2), 0.4, -29.0), new THREE.Vector3(-14, 16, -22), cp)
    );
  }

  // F4-06 (P03-019~024): STI Pad Oxide (10nm) + Hard Si3N4 LPCVD Mask (100nm)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matBlue));
    // 3-layer sandwich clearly visible: Bulk Si -> Thin Pad Oxide Cushion -> Hard Purple SiN Cap!
    const si = new THREE.Mesh(createVol4BoxGeo(6.6, 1.5, 5.8, 0.14, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 0.95, 0.2);
    const pad = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.35, 5.8), matCyan);
    pad.position.set(0, 1.9, 0.2);
    const sin = new THREE.Mesh(createVol4BoxGeo(6.6, 1.0, 5.8, 0.12, 0.04, 'y'), matViolet);
    sin.position.set(0, 2.6, 0.2);
    g.add(si, pad, sin);
    parts.push(
      finalizeVol4Part('fab4-p019-sti-pad-sin-lpcvd', 6, '#6366f1', g, new THREE.Vector3(row1X(3), 0.4, -29.0), new THREE.Vector3(-10, 17, -22), cp)
    );
  }

  // F4-07 (P03-025~036) [Mask #02]: STI Shallow Isolation Moat (250-350nm, 80-85° Smooth Taper)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matBlue));
    // Sculpted Si block with 2 unmistakable shallow U-shaped moats carved between transistor islands!
    const base = new THREE.Mesh(createVol4BoxGeo(6.8, 1.1, 5.8, 0.12, 0.04, 'y'), mats.siliconBulk);
    base.position.set(0, 0.72, 0.2);
    g.add(base);
    for (const sx of [-2.3, 0, 2.3]) {
      const island = new THREE.Mesh(createVol4BoxGeo(1.55, 1.6, 5.6, 0.1, 0.04, 'y'), mats.siliconBulk);
      island.position.set(sx, 2.05, 0.2);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.48, 5.6), matViolet);
      cap.position.set(sx, 3.12, 0.2);
      g.add(island, cap);
    }
    // Plasma arrows carving the 2 shallow moats
    for (const mx of [-1.15, 1.15]) {
      const ray = makeVol4Beam(0.18, 0.18, 2.4, matBlue);
      ray.position.set(mx, 3.8, 0.2);
      g.add(ray);
    }
    parts.push(
      finalizeVol4Part('fab4-m02-sti-trench-etch', 7, '#0284c7', g, new THREE.Vector3(row1X(4), 0.4, -29.0), new THREE.Vector3(-6, 18, -22), cp)
    );
  }

  // F4-08 (P03-037~040): 1,000°C Liner Corner-Rounding + Void-Free HDP/FCVD SiO2 Fill
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matCyan));
    const base = new THREE.Mesh(createVol4BoxGeo(6.8, 1.1, 5.8, 0.12, 0.04, 'y'), mats.siliconBulk);
    base.position.set(0, 0.72, 0.2);
    g.add(base);
    for (const sx of [-2.3, 0, 2.3]) {
      const island = new THREE.Mesh(createVol4BoxGeo(1.45, 1.6, 5.6, 0.1, 0.04, 'y'), mats.siliconBulk);
      island.position.set(sx, 2.05, 0.2);
      g.add(island);
    }
    // Glass SiO2 overflowing and completely filling moats void-free!
    const hdpFill = new THREE.Mesh(createVol4BoxGeo(6.7, 1.45, 5.7, 0.16, 0.05, 'y'), mats.quartzOlpf);
    hdpFill.position.set(0, 2.95, 0.2);
    g.add(hdpFill);
    const mound = new THREE.Mesh(createVol4BoxGeo(3.6, 0.75, 4.6, 0.25, 0.06, 'y'), matCyan);
    mound.position.set(0, 3.9, 0.2);
    g.add(mound);
    parts.push(
      finalizeVol4Part('fab4-p037-sti-liner-hdp-fill', 8, '#38bdf8', g, new THREE.Vector3(row1X(5), 0.4, -29.0), new THREE.Vector3(-2, 19, -22), cp)
    );
  }

  // F4-09 (P03-041~052) [Mask #03]: STI Reverse-Tone CMP Assist Etchback
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matBlue));
    const slab = new THREE.Mesh(createVol4BoxGeo(6.6, 1.9, 5.6, 0.12, 0.04, 'y'), mats.quartzOlpf);
    slab.position.set(0, 1.15, 0.2);
    g.add(slab);
    // Trimmed flat hills + laser trim bar demonstrating reverse-tone leveling
    const cutPlane = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.18, 5.8), matAmber);
    cutPlane.position.set(0, 2.45, 0.2);
    cutPlane.userData.noEdges = true;
    g.add(cutPlane);
    const resistMask = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.65, 5.2), matRed);
    resistMask.position.set(-2.0, 2.88, 0.2);
    g.add(resistMask);
    parts.push(
      finalizeVol4Part('fab4-m03-sti-reverse-etch', 9, '#0ea5e9', g, new THREE.Vector3(row1X(6), 0.4, -29.0), new THREE.Vector3(2, 19, -22), cp)
    );
  }

  // F4-10 (P03-053~058): STI-CMP Stop-on-SiN + 160°C Hot Phosphoric SiN Strip
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matGreen));
    // Mirror-flat alternating Silicon islands & flush SiO2 shallow isolation plugs!
    const base = new THREE.Mesh(createVol4BoxGeo(6.8, 1.1, 5.6, 0.12, 0.04, 'y'), mats.siliconBulk);
    base.position.set(0, 0.72, 0.2);
    g.add(base);
    for (const sx of [-2.3, 0, 2.3]) {
      const si = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.15, 5.4), mats.siliconBulk);
      si.position.set(sx, 1.85, 0.2);
      g.add(si);
    }
    for (const mx of [-1.15, 1.15]) {
      const ox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.15, 5.4), matCyan);
      ox.position.set(mx, 1.85, 0.2);
      g.add(ox);
    }
    // Floating Ceria CMP Polishing Disc hovering cleanly above flat surface
    const cmpDisc = new THREE.Mesh(hiResCyl(2.7, 2.7, 0.45, 22), matAmber);
    cmpDisc.position.set(0, 3.8, 0.2);
    g.add(cmpDisc);
    parts.push(
      finalizeVol4Part('fab4-p053-sti-cmp-sin-strip', 10, '#10b981', g, new THREE.Vector3(row1X(7), 0.4, -29.0), new THREE.Vector3(6, 18, -22), cp)
    );
  }

  // F4-11 (P03-059~060): Block 3-B — DTI Thick Hardmask ("Iron Frame") Deposition
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matSteel));
    const si = new THREE.Mesh(createVol4BoxGeo(6.6, 2.2, 5.6, 0.14, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.3, 0.2);
    const hm = new THREE.Mesh(createVol4BoxGeo(6.6, 1.25, 5.6, 0.12, 0.04, 'y'), matSteel);
    hm.position.set(0, 3.05, 0.2);
    g.add(si, hm);
    parts.push(
      finalizeVol4Part('fab4-p059-dti-hardmask-dep', 11, '#64748b', g, new THREE.Vector3(row1X(8), 0.4, -29.0), new THREE.Vector3(10, 17, -22), cp)
    );
  }

  // F4-12 (P03-061~072) [Mask #04 — CROWN JEWEL]: Front DTI High-Aspect-Ratio Deep Etch (AR 15–30!)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.8, 8.8, 1.2, mats, matViolet));
    // Tall Silicon Pillars separated by ultra-narrow, razor-deep 2–5µm F-DTI canyons (inverted Tokyo Skytree!)
    const floor = new THREE.Mesh(createVol4BoxGeo(6.8, 0.65, 5.8, 0.12, 0.04, 'y'), mats.siliconBulk);
    floor.position.set(0, 0.52, 0.2);
    g.add(floor);
    for (const sx of [-2.25, 0.0, 2.25]) {
      const col = new THREE.Mesh(createVol4BoxGeo(1.75, 4.4, 5.5, 0.1, 0.04, 'y'), mats.siliconPhotodiode);
      col.position.set(sx, 3.05, 0.2);
      g.add(col);
    }
    // Deep glowing violet plasma beams drilling straight down the AR 25 narrow slits!
    for (const gx of [-1.12, 1.12]) {
      const drill = makeVol4Beam(0.14, 0.14, 5.2, matViolet);
      drill.position.set(gx, 3.7, 0.2);
      g.add(drill);
    }
    parts.push(
      finalizeVol4Part('fab4-m04-front-dti-deep-etch', 12, '#7c3aed', g, new THREE.Vector3(row1X(9), 0.4, -29.0), new THREE.Vector3(14, 18, -22), cp)
    );
  }

  // F4-13 (P03-073~078): DTI Sidewall Damage Repair + P+/ALD Negative-Charge Barrier
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matViolet));
    const blk = new THREE.Mesh(createVol4BoxGeo(6.6, 3.8, 5.4, 0.14, 0.04, 'y'), mats.ultra.fab4FdtiWallCrossSection);
    blk.position.set(0, 2.1, 0.2);
    g.add(blk);
    // Twin angled PLAD/ALD sidewall coating beams
    for (const sx of [-1, 1]) {
      const angRay = makeVol4Beam(0.16, 0.28, 2.6, matViolet);
      angRay.position.set(sx * 1.1, 4.8, 0.2);
      angRay.rotation.z = sx * 0.42;
      g.add(angRay);
    }
    parts.push(
      finalizeVol4Part('fab4-p073-dti-sidewall-passiv', 13, '#a855f7', g, new THREE.Vector3(row1X(10), 0.4, -29.0), new THREE.Vector3(18, 16, -22), cp)
    );
  }

  // F4-14 (P03-079~084): DTI SiO2/Poly-Si Optical Mirror Fill & Hardmask Strip
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.6, 8.6, 1.2, mats, matCyan));
    // Completed Red & Green Pixels walled by shining SiO2-jacketed Poly-Si optical total-reflection mirrors!
    const pixL = new THREE.Mesh(createVol4BoxGeo(2.6, 3.8, 5.2, 0.1, 0.04, 'y'), matRed);
    pixL.position.set(-1.9, 2.1, 0.2);
    const pixR = new THREE.Mesh(createVol4BoxGeo(2.6, 3.8, 5.2, 0.1, 0.04, 'y'), matGreen);
    pixR.position.set(1.9, 2.1, 0.2);
    const mirrorShell = new THREE.Mesh(new THREE.BoxGeometry(0.95, 4.0, 5.4), matCyan);
    mirrorShell.position.set(0, 2.2, 0.2);
    const polyCore = new THREE.Mesh(new THREE.BoxGeometry(0.42, 4.15, 5.5), matSteel);
    polyCore.position.set(0, 2.25, 0.2);
    g.add(pixL, pixR, mirrorShell, polyCore);
    parts.push(
      finalizeVol4Part('fab4-p079-dti-fill-optic-mirror', 14, '#0ea5e9', g, new THREE.Vector3(row1X(11), 0.4, -29.0), new THREE.Vector3(22, 15, -22), cp)
    );
  }

  // =========================================================================
  // UPPER ROW 2 (Z = -12.0, Y = 0.4, 13 Parts F4-15–F4-27: Block 3-C, pitch 9.4mm)
  // =========================================================================
  const row2X = (idx: number) => -56.4 + idx * 9.4;

  // F4-15 (P03-085~096) [Mask #05]: Deep P-Well MeV Boron Floor & Perimeter Barrier
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matViolet));
    const si = new THREE.Mesh(createVol4BoxGeo(5.8, 2.2, 5.2, 0.12, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.9, 0.2);
    const deepFloor = new THREE.Mesh(createVol4BoxGeo(6.0, 0.9, 5.4, 0.12, 0.04, 'y'), matViolet);
    deepFloor.position.set(0, 0.65, 0.2);
    g.add(si, deepFloor, makeIonImplantCannon(matViolet, mats, 0, 5.1));
    parts.push(
      finalizeVol4Part('fab4-m05-deep-pwell-floor', 15, '#7c3aed', g, new THREE.Vector3(row2X(0), 0.4, -12.0), new THREE.Vector3(-24, 10, -4), cp)
    );
  }

  // F4-16 (P03-097~108) [Mask #06]: Pixel Isolation P-Type Electric Barrier (Upper/Mid Steps)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matViolet));
    const si = new THREE.Mesh(createVol4BoxGeo(5.8, 2.6, 5.0, 0.12, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.5, 0.2);
    g.add(si);
    for (const sx of [-2.6, 2.6]) {
      const pWall = new THREE.Mesh(new THREE.BoxGeometry(0.65, 2.75, 5.2), matViolet);
      pWall.position.set(sx, 1.55, 0.2);
      g.add(pWall);
    }
    g.add(makeIonImplantCannon(matViolet, mats, 0, 4.9));
    parts.push(
      finalizeVol4Part('fab4-m06-pixel-iso-pbarrier', 16, '#8b5cf6', g, new THREE.Vector3(row2X(1), 0.4, -12.0), new THREE.Vector3(-20, 11, -4), cp)
    );
  }

  // F4-17 (P03-109~120) [Mask #07]: Periphery / Pixel N-Well Implant (PMOS Rooms)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matBlue));
    const si = new THREE.Mesh(createVol4BoxGeo(5.8, 2.4, 5.0, 0.12, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.4, 0.2);
    const nWell = new THREE.Mesh(createVol4BoxGeo(3.2, 1.6, 4.4, 0.1, 0.03, 'y'), matBlue);
    nWell.position.set(1.1, 1.85, 0.2);
    g.add(si, nWell, makeIonImplantCannon(matBlue, mats, 0, 4.8));
    parts.push(
      finalizeVol4Part('fab4-m07-periph-nwell', 17, '#2563eb', g, new THREE.Vector3(row2X(2), 0.4, -12.0), new THREE.Vector3(-16, 12, -4), cp)
    );
  }

  // F4-18 (P03-121~132) [Mask #08]: Pixel Transistor P-Well Implant (4T NMOS Rooms)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matViolet));
    const si = new THREE.Mesh(createVol4BoxGeo(5.8, 2.4, 5.0, 0.12, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.4, 0.2);
    const pWell = new THREE.Mesh(createVol4BoxGeo(3.2, 1.6, 4.4, 0.1, 0.03, 'y'), matViolet);
    pWell.position.set(-1.1, 1.85, 0.2);
    g.add(si, pWell, makeIonImplantCannon(matViolet, mats, 0, 4.8));
    parts.push(
      finalizeVol4Part('fab4-m08-pixel-pwell-nmos', 18, '#6366f1', g, new THREE.Vector3(row2X(3), 0.4, -12.0), new THREE.Vector3(-12, 13, -4), cp)
    );
  }

  // F4-19 (P03-133~144) [Mask #09]: Pixel Source-Follower Ultra-Low-Noise Vt Adjust (RTN Suppression)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matGreen));
    const si = new THREE.Mesh(createVol4BoxGeo(5.8, 2.1, 5.0, 0.12, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.25, 0.2);
    const vtBand = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.36, 4.6), matGreen);
    vtBand.position.set(0, 2.38, 0.2);
    g.add(si, vtBand, makeIonImplantCannon(matGreen, mats, 0, 4.6));
    parts.push(
      finalizeVol4Part('fab4-m09-pixel-vt-lownoise', 19, '#10b981', g, new THREE.Vector3(row2X(4), 0.4, -12.0), new THREE.Vector3(-8, 14, -4), cp)
    );
  }

  // F4-20 (P03-145~156) [Mask #10]: Periphery NMOS/PMOS Vt Adjust
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matCyan));
    const si = new THREE.Mesh(createVol4BoxGeo(5.8, 2.1, 5.0, 0.12, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.25, 0.2);
    const nVt = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.36, 4.4), matCyan);
    nVt.position.set(-1.3, 2.38, 0.2);
    const pVt = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.36, 4.4), matAmber);
    pVt.position.set(1.3, 2.38, 0.2);
    g.add(si, nVt, pVt, makeIonImplantCannon(matCyan, mats, 0, 4.6));
    parts.push(
      finalizeVol4Part('fab4-m10-periph-vt-adjust', 20, '#06b6d4', g, new THREE.Vector3(row2X(5), 0.4, -12.0), new THREE.Vector3(-4, 15, -4), cp)
    );
  }

  // F4-21 (P03-157~168) [Mask #11 — CROWN JEWEL]: PD Stage 1 Deepest Red-Light MeV N-Implant (4.0µm!)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.0, 8.6, 1.2, mats, matRed));
    const si = new THREE.Mesh(createVol4BoxGeo(5.8, 2.8, 5.2, 0.12, 0.04, 'y'), mats.ultra.fab4RgbAbsorptionProfile);
    si.position.set(0, 1.6, 0.2);
    // Thick MeV-blocking photoresist mask walls on left/right!
    for (const sx of [-2.4, 2.4]) {
      const resist = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.35, 5.2), matDark);
      resist.position.set(sx, 3.65, 0.2);
      g.add(resist);
    }
    const redBucket = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.9, 5.4), matRed);
    redBucket.position.set(0, 0.85, 0.2);
    g.add(si, redBucket, makeIonImplantCannon(matRed, mats, 0, 6.2));
    parts.push(
      finalizeVol4Part('fab4-m11-pd-deep-red-mev', 21, '#e11d48', g, new THREE.Vector3(row2X(6), 0.4, -12.0), new THREE.Vector3(0, 17, -4), cp)
    );
  }

  // F4-22 (P03-169~180) [Mask #12]: PD Stage 2 Mid-Depth Green-Light N-Implant (1.73µm)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matGreen));
    const baseRed = new THREE.Mesh(createVol4BoxGeo(5.6, 1.0, 5.0, 0.1, 0.03, 'y'), matRed);
    baseRed.position.set(0, 0.72, 0.2);
    const midGreen = new THREE.Mesh(createVol4BoxGeo(5.6, 1.35, 5.0, 0.1, 0.03, 'y'), matGreen);
    midGreen.position.set(0, 1.9, 0.2);
    g.add(baseRed, midGreen, makeIonImplantCannon(matGreen, mats, 0, 5.2));
    parts.push(
      finalizeVol4Part('fab4-m12-pd-mid-green-n', 22, '#22c55e', g, new THREE.Vector3(row2X(7), 0.4, -12.0), new THREE.Vector3(4, 16, -4), cp)
    );
  }

  // F4-23 (P03-181~192) [Mask #13]: PD Stage 3 Shallow Blue-Light (0.49µm) & Angled Tilt (±0.05°)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matBlue));
    const base = new THREE.Mesh(createVol4BoxGeo(5.6, 1.6, 5.0, 0.1, 0.03, 'y'), matGreen);
    base.position.set(0, 1.0, 0.2);
    const shallowBlue = new THREE.Mesh(createVol4BoxGeo(5.6, 0.85, 5.0, 0.1, 0.03, 'y'), matBlue);
    shallowBlue.position.set(0, 2.25, 0.2);
    // Tilted ion cannon visibly angled to tuck charge right under the Transfer Gate!
    g.add(base, shallowBlue, makeIonImplantCannon(matBlue, mats, -0.34, 4.9));
    parts.push(
      finalizeVol4Part('fab4-m13-pd-shallow-blue-tilt', 23, '#38bdf8', g, new THREE.Vector3(row2X(8), 0.4, -12.0), new THREE.Vector3(8, 15, -4), cp)
    );
  }

  // F4-24 (P03-193~204) [Mask #14 — CROWN JEWEL]: Dual Pixel Central Split Wall (Canon EOS R1 Cross-Type!)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(8.0, 8.6, 1.2, mats, matAmber));
    // Single pixel visibly split into Cyan A-Bucket & Crimson B-Bucket by a central Golden P-Barrier Wall!
    const pdA = new THREE.Mesh(createVol4BoxGeo(2.4, 2.8, 5.0, 0.1, 0.04, 'y'), matBlue);
    pdA.position.set(-1.6, 1.6, 0.2);
    const pdB = new THREE.Mesh(createVol4BoxGeo(2.4, 2.8, 5.0, 0.1, 0.04, 'y'), matRed);
    pdB.position.set(1.6, 1.6, 0.2);
    const splitWall = new THREE.Mesh(createVol4BoxGeo(0.55, 3.25, 5.2, 0.08, 0.03, 'y'), matAmber);
    splitWall.position.set(0, 1.82, 0.2);
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.4, 0.14), mats.ultra.fab4DualPixelSplitProfile);
    applyPlanarUVs(plaque.geometry, 5.6, 2.4, 'xy');
    plaque.position.set(0, 4.4, -1.6);
    g.add(pdA, pdB, splitWall, plaque);
    parts.push(
      finalizeVol4Part('fab4-m14-dualpixel-pd-split', 24, '#f59e0b', g, new THREE.Vector3(row2X(9), 0.4, -12.0), new THREE.Vector3(12, 15, -4), cp)
    );
  }

  // F4-25 (P03-205~216) [Mask #15]: Anti-Blooming & Overflow Safety Barrier Implant
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matCopper));
    const pd = new THREE.Mesh(createVol4BoxGeo(3.4, 2.6, 4.8, 0.12, 0.04, 'y'), matBlue);
    pd.position.set(-1.1, 1.5, 0.2);
    const weir = new THREE.Mesh(createVol4BoxGeo(1.0, 1.8, 4.8, 0.08, 0.03, 'y'), matAmber);
    weir.position.set(1.2, 1.1, 0.2);
    const drain = new THREE.Mesh(createVol4BoxGeo(1.4, 1.1, 4.8, 0.08, 0.03, 'y'), matCopper);
    drain.position.set(2.4, 0.75, 0.2);
    const spill = new THREE.Mesh(hiResSphere(0.45, 10, 8), matAmber);
    spill.position.set(1.2, 2.4, 0.2);
    spill.userData.noEdges = true;
    g.add(pd, weir, drain, spill);
    parts.push(
      finalizeVol4Part('fab4-m15-antibloom-overflow', 25, '#ea580c', g, new THREE.Vector3(row2X(10), 0.4, -12.0), new THREE.Vector3(16, 13, -4), cp)
    );
  }

  // F4-26 (P03-217~228) [Mask #16]: Global Shutter Memory Node (α9 III VDGS) / DCG Aux Implant
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matAmber));
    const pd = new THREE.Mesh(createVol4BoxGeo(2.8, 2.5, 4.8, 0.1, 0.04, 'y'), matBlue);
    pd.position.set(-1.5, 1.45, 0.2);
    // Shielded golden Memory Vault next to PD
    const memVault = new THREE.Mesh(createVol4BoxGeo(2.5, 2.5, 4.8, 0.1, 0.04, 'y'), matDark);
    memVault.position.set(1.5, 1.45, 0.2);
    const memCore = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 3.8), matAmber);
    memCore.position.set(1.5, 1.65, 0.2);
    g.add(pd, memVault, memCore, makeIonImplantCannon(matAmber, mats, 0, 4.8));
    parts.push(
      finalizeVol4Part('fab4-m16-gs-mem-dcg-implant', 26, '#d97706', g, new THREE.Vector3(row2X(11), 0.4, -12.0), new THREE.Vector3(20, 12, -4), cp)
    );
  }

  // F4-27 (P03-229~248, 20 non-litho steps): 950-1,050°C Crystal Recovery Anneal & Screen Ox Strip
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(7.8, 8.2, 1.2, mats, matRed));
    const furnace = makeFurnaceTower(2.5, 4.6, matRed, mats);
    furnace.position.set(0, 0, 0.2);
    g.add(furnace);
    const glowOrb = new THREE.Mesh(hiResSphere(0.75, 12, 10), matAmber);
    glowOrb.position.set(0, 5.4, 0.2);
    glowOrb.userData.noEdges = true;
    g.add(glowOrb);
    parts.push(
      finalizeVol4Part('fab4-p229-pd-recovery-anneal', 27, '#f43f5e', g, new THREE.Vector3(row2X(12), 0.4, -12.0), new THREE.Vector3(24, 11, -4), cp)
    );
  }

  // =========================================================================
  // UPPER ROW 3 (Z = +5.0, Y = 0.4, 6 Grand Spacious Stations F4-28–F4-33: Block 3-D, pitch 19.0mm)
  // =========================================================================
  const row3X = (idx: number) => -47.5 + idx * 19.0;

  // F4-28 (P03-249~260) [Mask #17 — CROWN JEWEL]: Vertical Transfer Gate (VTG) "Straw-in-the-Well" Trench!
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(14.8, 9.4, 1.2, mats, matViolet));
    // Giant transparent-side Silicon + Deep 3-Color PD with a sculpted vertical straw hole plunging right into the deep PD!
    const si = new THREE.Mesh(createVol4BoxGeo(11.6, 3.2, 6.2, 0.18, 0.05, 'y'), mats.ultra.fab4RgbAbsorptionProfile);
    si.position.set(0, 1.8, 0.3);
    g.add(si);
    // Vertical VTG Straw Bore plunging deep into the PD center!
    const strawHole = new THREE.Mesh(hiResCyl(1.15, 0.85, 4.2, 20), matDark);
    strawHole.position.set(1.2, 2.75, 0.3);
    g.add(strawHole);
    const strawCollar = new THREE.Mesh(hiResTorus(1.28, 0.22, 10, 28), matAmber);
    strawCollar.rotation.x = Math.PI / 2;
    strawCollar.position.set(1.2, 3.65, 0.3);
    g.add(strawCollar);
    // Glowing ascending golden electrons sucked up through the VTG straw!
    for (let k = 0; k < 3; k++) {
      const e = new THREE.Mesh(hiResSphere(0.35, 10, 8), matAmber);
      e.position.set(1.2, 4.4 + k * 0.72, 0.3);
      e.userData.noEdges = true;
      g.add(e);
    }
    parts.push(
      finalizeVol4Part('fab4-m17-vtg-straw-trench', 28, '#7c3aed', g, new THREE.Vector3(row3X(0), 0.4, 5.0), new THREE.Vector3(-20, 10, 16), cp)
    );
  }

  // F4-29 (P03-261~264): 1st Thermal Gate Oxide (6-7nm, 2.8-3.3V Pixel High-Voltage, ±0.1nm)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(14.8, 9.4, 1.2, mats, matCyan));
    const furn = makeFurnaceTower(2.5, 5.0, matCyan, mats);
    furn.position.set(-3.6, 0, -0.3);
    g.add(furn);
    // Giant atomic-scale cross-section: Silicon + glowing 6-7nm crystal-clear glass dielectric blanket!
    const si = new THREE.Mesh(createVol4BoxGeo(6.8, 2.2, 5.8, 0.16, 0.05, 'y'), mats.siliconBulk);
    si.position.set(2.6, 1.3, 0.3);
    const gateOx = new THREE.Mesh(createVol4BoxGeo(6.9, 0.65, 5.9, 0.1, 0.03, 'y'), mats.sswfGlass);
    gateOx.position.set(2.6, 2.75, 0.3);
    const glowLine = new THREE.Mesh(new THREE.BoxGeometry(6.85, 0.18, 5.85), matCyan);
    glowLine.position.set(2.6, 3.12, 0.3);
    glowLine.userData.noEdges = true;
    g.add(si, gateOx, glowLine);
    parts.push(
      finalizeVol4Part('fab4-p261-thick-gate-ox-33v', 29, '#0ea5e9', g, new THREE.Vector3(row3X(1), 0.4, 5.0), new THREE.Vector3(-12, 11, 16), cp)
    );
  }

  // F4-30 (P03-265~276) [Mask #18]: Dual Gate Oxide Selective Wet Etch (3.3V Pixel Kept, Periphery Opened!)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(14.8, 9.4, 1.2, mats, matBlue));
    const si = new THREE.Mesh(createVol4BoxGeo(11.8, 1.8, 6.0, 0.16, 0.05, 'y'), mats.siliconBulk);
    si.position.set(0, 1.1, 0.3);
    g.add(si);
    // Left Half: Pixel Area (3.3V) shielded by resist & keeping thick 6-7nm oxide!
    const thickOx = new THREE.Mesh(createVol4BoxGeo(5.4, 0.72, 5.8, 0.08, 0.03, 'y'), matCyan);
    thickOx.position.set(-2.9, 2.4, 0.3);
    const resist = new THREE.Mesh(createVol4BoxGeo(5.4, 0.9, 5.6, 0.1, 0.03, 'y'), matRed);
    resist.position.set(-2.9, 3.25, 0.3);
    // Right Half: Periphery (1.2-1.8V) exposed to DHF wet-etch spray!
    const dhfBeam = makeVol4Beam(0.8, 1.9, 2.4, matBlue);
    dhfBeam.position.set(2.9, 3.3, 0.3);
    g.add(thickOx, resist, dhfBeam);
    parts.push(
      finalizeVol4Part('fab4-m18-dual-gate-ox-etch', 30, '#2563eb', g, new THREE.Vector3(row3X(2), 0.4, 5.0), new THREE.Vector3(-4, 12, 16), cp)
    );
  }

  // F4-31 (P03-277~282): 2nd Thin Gate Ox (2-3nm) + NO Nitridation + Strict Q-Time Poly-Si Dep (150-200nm)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(14.8, 9.4, 1.2, mats, matAmber));
    const si = new THREE.Mesh(createVol4BoxGeo(11.8, 1.6, 6.0, 0.16, 0.05, 'y'), mats.siliconBulk);
    si.position.set(0, 1.0, 0.3);
    // Step-height dual oxide (left thick 6-7nm, right thin 2-3nm) + immediate Poly-Si blanket on top!
    const oxL = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.65, 5.9), matCyan);
    oxL.position.set(-2.95, 2.15, 0.3);
    const oxR = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.25, 5.9), matGreen);
    oxR.position.set(2.95, 1.95, 0.3);
    const polySi = new THREE.Mesh(createVol4BoxGeo(11.8, 1.5, 5.9, 0.14, 0.04, 'y'), matDark);
    polySi.position.set(0, 3.35, 0.3);
    const qClock = new THREE.Mesh(hiResTorus(1.1, 0.18, 8, 24), matAmber);
    qClock.position.set(0, 5.2, 0.3);
    g.add(si, oxL, oxR, polySi, qClock);
    parts.push(
      finalizeVol4Part('fab4-p277-thin-gate-polysilicon', 31, '#f59e0b', g, new THREE.Vector3(row3X(3), 0.4, 5.0), new THREE.Vector3(4, 12, 16), cp)
    );
  }

  // F4-32 (P03-283~294) [Mask #19 — CROWN JEWEL]: Ultra-Precision Poly-Si Gate Etch (>50:1 Selectivity!)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(14.8, 9.4, 1.2, mats, matViolet));
    const si = new THREE.Mesh(createVol4BoxGeo(12.2, 1.5, 6.2, 0.16, 0.05, 'y'), mats.siliconBulk);
    si.position.set(0, 0.95, 0.3);
    // Razor-thin glowing 3-7nm Gate Oxide stop layer completely intact!
    const thinOx = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.24, 6.2), matCyan);
    thinOx.position.set(0, 1.85, 0.3);
    g.add(si, thinOx);
    // 4 Crisp Sculpted 4T Pixel Transistor Poly-Si Gate Roofs (TG, RST, SF, SEL) etched vertically!
    const gateWidths = [2.4, 1.35, 2.1, 1.35];
    const gateXs = [-4.1, -1.2, 1.5, 4.3];
    for (let i = 0; i < 4; i++) {
      const gate = new THREE.Mesh(createVol4BoxGeo(gateWidths[i], 2.2, 5.4, 0.1, 0.04, 'y'), i === 0 ? matAmber : matDark);
      gate.position.set(gateXs[i], 3.1, 0.3);
      g.add(gate);
    }
    const plasma = makeVol4Beam(3.6, 4.4, 1.8, matViolet);
    plasma.position.set(0, 5.2, 0.3);
    g.add(plasma);
    parts.push(
      finalizeVol4Part('fab4-m19-poly-gate-etch', 32, '#8b5cf6', g, new THREE.Vector3(row3X(4), 0.4, 5.0), new THREE.Vector3(12, 13, 16), cp)
    );
  }

  // F4-33 (P03-295~296): Gate Sidewall Re-Oxidation (2-5nm GIDL Suppression) & Hitachi CD-SEM
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(14.8, 9.4, 1.2, mats, matGreen));
    const si = new THREE.Mesh(createVol4BoxGeo(11.8, 1.5, 6.0, 0.16, 0.05, 'y'), mats.siliconBulk);
    si.position.set(0, 0.95, 0.3);
    const gate = new THREE.Mesh(createVol4BoxGeo(3.6, 2.3, 5.4, 0.12, 0.04, 'y'), matDark);
    gate.position.set(-2.2, 2.85, 0.3);
    // Glowing repaired 2-5nm re-oxidation skin hugging the gate feet (suppresses GIDL!)
    for (const dx of [-1.95, 1.95]) {
      const skin = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2.4, 5.5), matGreen);
      skin.position.set(-2.2 + dx, 2.9, 0.3);
      skin.userData.noEdges = true;
      g.add(skin);
    }
    // Hitachi High-Tech CD-SEM Metrology Column measuring gate CD on right
    const semCol = new THREE.Mesh(hiResCyl(1.15, 0.72, 3.6, 18), matSteel);
    semCol.position.set(3.2, 4.2, 0.3);
    const semRay = makeVol4Beam(0.16, 0.06, 1.6, matGreen);
    semRay.position.set(3.2, 2.1, 0.3);
    g.add(si, gate, semCol, semRay);
    parts.push(
      finalizeVol4Part('fab4-p295-gate-reox-cdsem', 33, '#10b981', g, new THREE.Vector3(row3X(5), 0.4, 5.0), new THREE.Vector3(20, 11, 16), cp)
    );
  }

  return parts;
}
