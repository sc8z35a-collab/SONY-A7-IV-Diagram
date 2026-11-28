//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol3DesignParts.ts|unit=sensorFab|lines=1504|exports=buildSensorFabVol3DesignParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { hiResCyl, hiResSphere, hiResTorus, applyPlanarUVs } from '../../engine/UltraDetailBuilders';
import {
  createVol3BoxGeo,
  finalizeVol3Part,
  makeBeamCone,
  makeEdaConsole,
  makeSixInchReticlePlate,
  makeVol3Plinth,
} from './sensorFabVol3Shared';

/**
 * Builds Parts F3-01 through F3-34 of Sensor Fab Vol.3:
 * - F3-01: Floating 6-Inch Synthetic Quartz Reticle & 96-Mask Set Hero Monument
 * - F3-02: Stepped Two-Tier Phase 2 Design Studio & Lower Mask Fab Architectural Terrace
 * - F3-03–F3-12 (Block 2-A): P02-001 through P02-010 (Product Spec, TCAD, Optical FDTD, CRA, PDAF, TEG)
 * - F3-13–F3-24 (Block 2-B): P02-011 through P02-022 (ADC, AFE/DCG, SerDes, Cu-Cu 3D Floorplan, OASIS)
 * - F3-25–F3-34 (Block 2-C): P02-023 through P02-032 (DRC/LVS/ERC, 3D Mirror, Single vs Stitch, OPC, Tape-Out)
 */
export function buildSensorFabVol3DesignParts(mats: MaterialLibrary): CadPart[] {
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
  // F3-01: HERO MONUMENT — Floating 6" Quartz Photomask + 0.8µm Pellicle + 96-Mask Stack
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision floating gimbal halo ring under reticle
    const halo = new THREE.Mesh(hiResTorus(10.8, 0.34, 10, 48), matSteel);
    halo.rotation.x = Math.PI / 2;
    halo.position.y = -2.2;
    g.add(halo);

    const glowRing = new THREE.Mesh(hiResTorus(10.2, 0.14, 8, 48), matBlue);
    glowRing.rotation.x = Math.PI / 2;
    glowRing.position.y = -2.2;
    glowRing.userData.noEdges = true;
    g.add(glowRing);

    // Tilted 6-inch synthetic quartz reticle centerpiece (152.4 x 152.4 x 6.35mm scaled to 14.4 x 14.4 x 0.9mm)
    const reticleTilt = new THREE.Group();
    reticleTilt.rotation.set(0.24, -0.22, 0.08);
    reticleTilt.position.set(-2.6, 1.4, 0);

    const reticle = makeSixInchReticlePlate(13.8, 0.92, mats.ultra.fab3OpcSerifMask, mats, true);
    reticleTilt.add(reticle);

    // Floating dust mote stopped high above on the 0.8µm pellicle film (out-of-focus protection demo!)
    const dust = new THREE.Mesh(hiResSphere(0.42, 12, 10), matRed);
    dust.position.set(2.4, 2.75, 1.6);
    reticleTilt.add(dust);
    const dustRing = new THREE.Mesh(hiResTorus(0.75, 0.07, 8, 24), matRed);
    dustRing.rotation.x = Math.PI / 2;
    dustRing.position.set(2.4, 2.55, 1.6);
    dustRing.userData.noEdges = true;
    reticleTilt.add(dustRing);

    // 4X demagnified UV projection cone projecting cleanly down onto a glowing 36x24mm Full-Frame silicon target
    const uvCone = makeBeamCone(4.4, 1.4, 4.2, mats.sswfGlass);
    uvCone.position.set(0, -2.55, 0);
    reticleTilt.add(uvCone);

    const projectedDie = new THREE.Mesh(
      createVol3BoxGeo(4.8, 0.36, 3.2, 0.12, 0.04, 'y'),
      mats.ultra.fab3ChipLayoutOasis
    );
    projectedDie.position.set(0, -4.8, 0);
    reticleTilt.add(projectedDie);

    g.add(reticleTilt);

    // Flanking 96-Mask Set 5-Layer Architectural Stack Tower (25 FEOL + 13 BEOL + 48 Logic + 5 Back + 5 Optical)
    const stackGroup = new THREE.Group();
    stackGroup.position.set(9.2, -1.6, 0.6);
    const rackBase = new THREE.Mesh(createVol3BoxGeo(5.6, 0.55, 5.6, 0.25, 0.06, 'y'), matDark);
    stackGroup.add(rackBase);
    const layers: Array<{ count: number; h: number; mat: THREE.Material }> = [
      { count: 5, h: 1.55, mat: matViolet }, // Pixel FEOL (25)
      { count: 3, h: 0.90, mat: matCopper }, // Pixel BEOL (13)
      { count: 8, h: 2.65, mat: matBlue },   // Logic Wafer (48)
      { count: 2, h: 0.55, mat: matCyan },   // Backside (5)
      { count: 2, h: 0.55, mat: matGreen },  // Optical CFA/OCL (5)
    ];
    let curY = 0.55;
    for (const ly of layers) {
      const sliceH = ly.h / ly.count;
      for (let i = 0; i < ly.count; i++) {
        const plate = new THREE.Mesh(
          new THREE.BoxGeometry(4.6, sliceH * 0.68, 4.6),
          ly.mat
        );
        plate.position.y = curY + sliceH * (i + 0.5);
        plate.userData.noEdges = true;
        stackGroup.add(plate);
      }
      curY += ly.h + 0.18;
    }
    // 4 Corner precision stainless rack rails
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const post = new THREE.Mesh(hiResCyl(0.14, 0.14, curY + 0.4, 8), matSteel);
        post.position.set(sx * 2.55, (curY + 0.2) * 0.5, sz * 2.55);
        post.userData.noEdges = true;
        stackGroup.add(post);
      }
    }
    g.add(stackGroup);

    parts.push(
      finalizeVol3Part(
        'fab3-hero-reticle-96set-monument',
        1,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 18.2, -9.5),
        new THREE.Vector3(0, 34, -8),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // F3-02: STEPPED TWO-TIER PHASE 2 DESIGN STUDIO & MASK FAB ARCHITECTURAL TERRACE
  // =========================================================================
  {
    const g = new THREE.Group();

    // Upper Design Studio Deck (Blocks 2-A, 2-B, 2-C): Y top = -0.8 (local y = +0.8), Z = -38..+14
    const upperDeck = new THREE.Mesh(
      createVol3BoxGeo(122, 1.6, 52, 1.4, 0.24, 'y'),
      mats.ultra.fab3Phase2StudioDeck
    );
    upperDeck.position.set(0, 0, -12.0);
    g.add(upperDeck);

    // Upper stainless perimeter guard trim
    for (const sz of [-38.1, 14.1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(122.4, 0.36, 0.45), matSteel);
      rail.position.set(0, 0.65, sz);
      rail.userData.noEdges = true;
      g.add(rail);
    }

    // Architectural Cleanroom Step-Drop Wall at Z = +14.0 with Encrypted Tape-Out Fiber Conduits
    const stepWall = new THREE.Mesh(
      createVol3BoxGeo(122, 9.4, 1.2, 0.3, 0.1, 'z'),
      matDark
    );
    stepWall.position.set(0, -4.7, 14.0);
    g.add(stepWall);

    // 9 Glowing Fiber-Optic Conduit Pipes descending from Upper Deck (2-C) into Lower Mask Fab (2-D)
    for (let i = -4; i <= 4; i++) {
      const pipe = new THREE.Mesh(hiResCyl(0.28, 0.28, 8.6, 10), i % 2 === 0 ? matBlue : matAmber);
      pipe.position.set(i * 12.0, -4.6, 14.7);
      pipe.userData.noEdges = true;
      g.add(pipe);
    }

    // Lower Stepped Photomask Cleanroom Terrace (Blocks 2-D & 2-E): Y top = -10.0 (local y = -8.4), Z = +14..+52
    const lowerDeck = new THREE.Mesh(
      createVol3BoxGeo(122, 1.6, 38, 1.4, 0.24, 'y'),
      mats.stainlessMachined
    );
    lowerDeck.position.set(0, -9.2, 33.0);
    g.add(lowerDeck);

    // Lower deck cleanroom lane guide strips (2-D Cyan at Z=24.5, 2-E Emerald at Z=42.5)
    const lane2D = new THREE.Mesh(new THREE.BoxGeometry(116, 0.12, 14.8), matBlue);
    lane2D.position.set(0, -8.34, 24.5);
    lane2D.userData.noEdges = true;
    g.add(lane2D);

    const lane2DInner = new THREE.Mesh(new THREE.BoxGeometry(114.6, 0.14, 13.6), matDark);
    lane2DInner.position.set(0, -8.32, 24.5);
    lane2DInner.userData.noEdges = true;
    g.add(lane2DInner);

    const lane2E = new THREE.Mesh(new THREE.BoxGeometry(116, 0.12, 15.8), matGreen);
    lane2E.position.set(0, -8.34, 42.5);
    lane2E.userData.noEdges = true;
    g.add(lane2E);

    const lane2EInner = new THREE.Mesh(new THREE.BoxGeometry(114.6, 0.14, 14.6), matDark);
    lane2EInner.position.set(0, -8.32, 42.5);
    lane2EInner.userData.noEdges = true;
    g.add(lane2EInner);

    // Under-chassis heavy seismic isolation piers supporting the stepped terrace
    const pierGeo = hiResCyl(1.1, 1.4, 9.2, 12);
    for (const sx of [-55, -18, 18, 55]) {
      for (const sz of [-33, 8]) {
        const pier = new THREE.Mesh(pierGeo, matDark);
        pier.position.set(sx, -5.4, sz);
        g.add(pier);
      }
    }

    parts.push(
      finalizeVol3Part(
        'fab3-phase2-design-mask-deck',
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
  // BLOCK 2-A (Upper Row 1: Z = -29.0, Y = 0.4, 10 Parts F3-03–F3-12, pitch 11.5mm)
  // =========================================================================
  const row2AX = (idx: number) => -51.75 + idx * 11.5;

  // F3-03 (P02-001): Product Spec — 36x24mm Sensor Roadmap Board + 4 MP Tier Towers + Power Gauge
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matViolet));
    // Full-frame 36x24mm reference die plate (scaled 4.5 x 3.0)
    const ffPlate = new THREE.Mesh(
      createVol3BoxGeo(4.6, 0.34, 3.1, 0.12, 0.04, 'y'),
      mats.ultra.fab3ChipLayoutOasis
    );
    ffPlate.position.set(-1.5, 0.35, 1.4);
    g.add(ffPlate);
    // 4 Pixel-tier architectural bars (24MP GS, 33MP Partial, 45MP Stack, 66.8MP Ultra-Res)
    const heights = [2.2, 3.2, 4.3, 5.4];
    const barMats = [matCyan, matBlue, matViolet, matAmber];
    for (let i = 0; i < 4; i++) {
      const bar = new THREE.Mesh(
        createVol3BoxGeo(1.35, heights[i], 1.35, 0.12, 0.05, 'y'),
        barMats[i]
      );
      bar.position.set(-2.7 + i * 1.8, heights[i] * 0.5 + 0.18, -1.7);
      g.add(bar);
    }
    // 1.5–5W Thermal Envelope Gauge Dial
    const dial = new THREE.Mesh(hiResCyl(1.3, 1.3, 0.4, 18), matDark);
    dial.rotation.x = Math.PI / 2;
    dial.position.set(2.4, 1.7, 1.4);
    g.add(dial);
    const needle = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.05, 0.12), matRed);
    needle.position.set(2.4, 1.95, 1.65);
    needle.rotation.z = -0.5;
    needle.userData.noEdges = true;
    g.add(needle);

    parts.push(
      finalizeVol3Part(
        'fab3-p01-product-spec',
        3,
        '#7c3aed',
        g,
        new THREE.Vector3(row2AX(0), 0.4, -29.0),
        new THREE.Vector3(-20, 14, -22),
        cp
      )
    );
  }

  // F3-04 (P02-002): Pixel Architecture Selection — 4 Distinct 3D Pixel Cutaway Models
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matViolet));
    // 4 pixel architecture pedestals: 4T+DCG, Cross Dual-Pixel, 2x1 OCL PDAF, GS Voltage/Pixel-Parallel ADC
    const configs: Array<{ x: number; z: number; col: THREE.Material; domeW: number; split: boolean; stackH: number }> = [
      { x: -2.1, z: -1.8, col: matBlue, domeW: 1.5, split: false, stackH: 2.2 },
      { x: 2.1, z: -1.8, col: matRed, domeW: 1.5, split: true, stackH: 2.5 },
      { x: -2.1, z: 1.8, col: matGreen, domeW: 2.8, split: true, stackH: 2.3 },
      { x: 2.1, z: 1.8, col: matAmber, domeW: 1.5, split: false, stackH: 3.4 },
    ];
    for (const c of configs) {
      const si = new THREE.Mesh(createVol3BoxGeo(3.1, c.stackH, 2.7, 0.14, 0.05, 'y'), mats.siliconPhotodiode);
      si.position.set(c.x, c.stackH * 0.5 + 0.18, c.z);
      g.add(si);
      // Split trench for Dual Pixel / 2x1 OCL
      if (c.split) {
        const trench = new THREE.Mesh(new THREE.BoxGeometry(0.18, c.stackH + 0.1, 2.5), matAmber);
        trench.position.set(c.x, c.stackH * 0.5 + 0.2, c.z);
        trench.userData.noEdges = true;
        g.add(trench);
      }
      // Microlens dome
      const dome = new THREE.Mesh(hiResSphere(c.domeW * 0.55, 14, 10), c.col);
      dome.scale.set(c.domeW > 2 ? 1.3 : 1.0, 0.55, 0.9);
      dome.position.set(c.x, c.stackH + 0.55, c.z);
      dome.userData.noEdges = true;
      g.add(dome);
    }
    parts.push(
      finalizeVol3Part(
        'fab3-p02-pixel-arch-select',
        4,
        '#8b5cf6',
        g,
        new THREE.Vector3(row2AX(1), 0.4, -29.0),
        new THREE.Vector3(-15, 16, -22),
        cp
      )
    );
  }

  // F3-05 (P02-003): 3D Process TCAD — 3D Silicon Doping Mesh + Ion Implantation Cone
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matViolet));
    // 3D Silicon substrate voxel block with nested P/N doping shells
    const outerSi = new THREE.Mesh(createVol3BoxGeo(5.8, 3.2, 5.2, 0.16, 0.06, 'y'), mats.siliconBulk);
    outerSi.position.set(0, 1.8, 0.6);
    g.add(outerSi);
    const nWell = new THREE.Mesh(createVol3BoxGeo(3.6, 2.1, 3.4, 0.14, 0.05, 'y'), matBlue);
    nWell.position.set(0, 2.5, 0.6);
    g.add(nWell);
    const pPin = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.32, 4.0), matRed);
    pPin.position.set(0, 3.62, 0.6);
    pPin.userData.noEdges = true;
    g.add(pPin);
    // Ion beam implant funnel descending from above
    const ionCone = makeBeamCone(1.5, 0.45, 2.8, matViolet);
    ionCone.position.set(0, 5.2, 0.6);
    g.add(ionCone);
    // Mesh node spheres around perimeter
    const nodeGeo = hiResSphere(0.16, 8, 6);
    for (const sx of [-2.9, 0, 2.9]) {
      for (const sy of [0.5, 2.0, 3.4]) {
        const node = new THREE.Mesh(nodeGeo, matCyan);
        node.position.set(sx, sy, 3.3);
        node.userData.noEdges = true;
        g.add(node);
      }
    }
    parts.push(
      finalizeVol3Part(
        'fab3-p03-process-tcad-3d',
        5,
        '#6366f1',
        g,
        new THREE.Vector3(row2AX(2), 0.4, -29.0),
        new THREE.Vector3(-11, 18, -22),
        cp
      )
    );
  }

  // F3-06 (P02-004): 3D Device TCAD — Potential Energy Slide (PD -> TG -> FD 100% Transfer!)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matBlue));
    // Sculpted 3-tier Potential Energy Waterfall Slide (PD -> TG bridge -> Deep FD bucket)
    const steps: Array<{ x: number; h: number; w: number; mat: THREE.Material }> = [
      { x: -2.8, h: 4.8, w: 2.2, mat: matBlue },   // PD Deep Photodiode
      { x: -0.5, h: 3.5, w: 1.9, mat: matViolet }, // Transfer Gate (TG) Bridge
      { x: 1.7, h: 2.2, w: 1.8, mat: matCyan },    // Potential Ramp
      { x: 3.4, h: 1.1, w: 1.4, mat: matAmber },   // Floating Diffusion (FD) Sense Node
    ];
    for (const st of steps) {
      const blk = new THREE.Mesh(createVol3BoxGeo(st.w, st.h, 4.6, 0.12, 0.05, 'y'), st.mat);
      blk.position.set(st.x, st.h * 0.5 + 0.18, 0.4);
      g.add(blk);
    }
    // Glowing golden electrons sliding smoothly down the potential gradient (zero pocket!)
    const eGeo = hiResSphere(0.32, 10, 8);
    const ePts: Array<[number, number]> = [
      [-3.0, 5.4],
      [-1.7, 4.9],
      [-0.4, 4.1],
      [0.8, 3.4],
      [2.0, 2.7],
      [3.4, 1.75],
    ];
    for (const [ex, ey] of ePts) {
      const e = new THREE.Mesh(eGeo, matAmber);
      e.position.set(ex, ey, 0.4);
      e.userData.noEdges = true;
      g.add(e);
    }
    // Raised Transfer Gate Polysilicon Electrode Arch
    const tgArch = new THREE.Mesh(createVol3BoxGeo(1.7, 0.55, 5.6, 0.1, 0.04, 'y'), matDark);
    tgArch.position.set(-0.5, 5.2, 0.4);
    g.add(tgArch);

    parts.push(
      finalizeVol3Part(
        'fab3-p04-device-tcad-potential',
        6,
        '#4f46e5',
        g,
        new THREE.Vector3(row2AX(3), 0.4, -29.0),
        new THREE.Vector3(-7, 20, -22),
        cp
      )
    );
  }

  // F3-07 (P02-005): Dark Current & Anti-Blooming Overflow Spillway
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matViolet));
    // Central Photodiode Bucket flanked by Negatively-Charged DTI Passivation Walls
    const bucket = new THREE.Mesh(createVol3BoxGeo(3.8, 3.4, 4.6, 0.15, 0.05, 'y'), mats.siliconPhotodiode);
    bucket.position.set(-0.8, 1.9, 0.3);
    g.add(bucket);
    for (const sx of [-2.95, 1.35]) {
      const dti = new THREE.Mesh(createVol3BoxGeo(0.45, 4.2, 5.0, 0.08, 0.03, 'y'), matViolet);
      dti.position.set(sx, 2.3, 0.3);
      g.add(dti);
    }
    // Anti-Blooming Overflow Drain (OFD) Weir & Copper VDD Drain Pipe
    const weir = new THREE.Mesh(createVol3BoxGeo(1.4, 2.2, 2.2, 0.1, 0.04, 'y'), matCopper);
    weir.position.set(2.5, 1.3, 0.3);
    g.add(weir);
    const spill = new THREE.Mesh(hiResCyl(0.32, 0.48, 2.4, 12), matAmber);
    spill.rotation.z = -0.65;
    spill.position.set(2.0, 3.0, 0.3);
    spill.userData.noEdges = true;
    g.add(spill);
    // Sunburst flood indicator above PD
    const sun = new THREE.Mesh(hiResSphere(0.75, 14, 10), matAmber);
    sun.position.set(-0.8, 5.1, 0.3);
    sun.userData.noEdges = true;
    g.add(sun);

    parts.push(
      finalizeVol3Part(
        'fab3-p05-dark-current-blooming',
        7,
        '#a855f7',
        g,
        new THREE.Vector3(row2AX(4), 0.4, -29.0),
        new THREE.Vector3(-2, 22, -22),
        cp
      )
    );
  }

  // F3-08 (P02-006): 3D Optical FDTD Maxwell Wave Stack (OCL -> CFA -> Metal Grid -> B-DTI)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matViolet));
    // Exploded vertical optical stack with 3 RGB channels
    const cols: Array<{ x: number; mat: THREE.Material }> = [
      { x: -2.4, mat: matRed },
      { x: 0, mat: matGreen },
      { x: 2.4, mat: matBlue },
    ];
    // Silicon B-DTI base
    const siBase = new THREE.Mesh(createVol3BoxGeo(7.6, 1.8, 4.4, 0.14, 0.05, 'y'), mats.siliconBulk);
    siBase.position.set(0, 1.1, 0.3);
    g.add(siBase);
    // Tungsten light-shield grid walls
    for (const sx of [-1.2, 1.2]) {
      const grid = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.4, 4.5), matSteel);
      grid.position.set(sx, 2.65, 0.3);
      g.add(grid);
    }
    for (const c of cols) {
      // Color Filter tile
      const cfa = new THREE.Mesh(createVol3BoxGeo(2.0, 0.48, 3.6, 0.1, 0.03, 'y'), c.mat);
      cfa.position.set(c.x, 3.15, 0.3);
      g.add(cfa);
      // Microlens dome
      const dome = new THREE.Mesh(hiResSphere(0.95, 14, 10), mats.microlensGlass);
      dome.scale.set(1.0, 0.55, 1.35);
      dome.position.set(c.x, 4.15, 0.3);
      dome.userData.noEdges = true;
      g.add(dome);
      // Maxwell EM wave beam plunging into silicon
      const beam = makeBeamCone(0.22, 0.16, 4.4, c.mat);
      beam.position.set(c.x, 4.4, 0.3);
      g.add(beam);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p06-optical-fdtd-3d',
        8,
        '#c026d3',
        g,
        new THREE.Vector3(row2AX(5), 0.4, -29.0),
        new THREE.Vector3(2, 22, -22),
        cp
      )
    );
  }

  // F3-09 (P02-007): CRA (Chief Ray Angle 0°->30°) Microlens Inward Shift
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matRed));
    // Sensor base strip with 5 pixels from Center (0°) to Corner (30°)
    const strip = new THREE.Mesh(createVol3BoxGeo(8.2, 1.0, 3.6, 0.12, 0.04, 'y'), mats.siliconBulk);
    strip.position.set(0, 0.7, 0.4);
    g.add(strip);
    // Floating Wide-Angle Rear Lens Element overhead
    const exitPupil = new THREE.Mesh(hiResCyl(1.6, 1.8, 0.45, 20), mats.lensXaGlass);
    exitPupil.position.set(0, 5.5, 0.4);
    g.add(exitPupil);
    // 5 Pixels with progressive inward OCL shift & angled Chief Rays!
    for (let i = -2; i <= 2; i++) {
      const px = i * 1.55;
      const shift = -i * 0.24; // Inward shrink offset!
      const pd = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.35, 2.2), matBlue);
      pd.position.set(px, 1.35, 0.4);
      pd.userData.noEdges = true;
      g.add(pd);
      const ocl = new THREE.Mesh(hiResSphere(0.55, 12, 8), mats.microlensGlass);
      ocl.scale.set(1.0, 0.52, 1.4);
      ocl.position.set(px + shift, 2.05, 0.4);
      ocl.userData.noEdges = true;
      g.add(ocl);
      // Angled chief ray from exit pupil (0, 5.3) to shifted OCL (px+shift, 2.05)
      const dx = px + shift;
      const dy = -3.25;
      const len = Math.hypot(dx, dy);
      const ray = new THREE.Mesh(hiResCyl(0.08, 0.08, len, 8), Math.abs(i) === 2 ? matRed : matAmber);
      ray.position.set(dx * 0.5, 5.3 + dy * 0.5, 0.4);
      ray.rotation.z = Math.atan2(dx, -dy);
      ray.userData.noEdges = true;
      g.add(ray);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p07-cra-angle-shift',
        9,
        '#ec4899',
        g,
        new THREE.Vector3(row2AX(6), 0.4, -29.0),
        new THREE.Vector3(7, 20, -22),
        cp
      )
    );
  }

  // F3-10 (P02-008): PDAF Pupil Split Optical Response (F1.2 A/B Dual-Image Convergence)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matRed));
    // Left PD (A-image) and Right PD (B-image) separated by DTI wall under shared 2x1 OCL
    const pdA = new THREE.Mesh(createVol3BoxGeo(2.8, 1.7, 3.6, 0.12, 0.04, 'y'), matBlue);
    pdA.position.set(-1.6, 1.05, 0.4);
    g.add(pdA);
    const pdB = new THREE.Mesh(createVol3BoxGeo(2.8, 1.7, 3.6, 0.12, 0.04, 'y'), matRed);
    pdB.position.set(1.6, 1.05, 0.4);
    g.add(pdB);
    const sharedOcl = new THREE.Mesh(hiResSphere(2.2, 16, 12), mats.microlensGlass);
    sharedOcl.scale.set(1.45, 0.42, 0.85);
    sharedOcl.position.set(0, 2.45, 0.4);
    sharedOcl.userData.noEdges = true;
    g.add(sharedOcl);
    // Split F1.2 Exit Pupil Aperture Ring above
    const pupilRing = new THREE.Mesh(hiResTorus(2.6, 0.22, 10, 28), matDark);
    pupilRing.rotation.x = Math.PI / 2;
    pupilRing.position.set(0, 5.4, 0.4);
    g.add(pupilRing);
    // Crossing Left/Right pupil rays (A-ray cyan, B-ray crimson)
    const rayA = new THREE.Mesh(hiResCyl(0.14, 0.14, 3.6, 8), matBlue);
    rayA.position.set(-0.9, 3.85, 0.4);
    rayA.rotation.z = -0.36;
    rayA.userData.noEdges = true;
    g.add(rayA);
    const rayB = new THREE.Mesh(hiResCyl(0.14, 0.14, 3.6, 8), matRed);
    rayB.position.set(0.9, 3.85, 0.4);
    rayB.rotation.z = 0.36;
    rayB.userData.noEdges = true;
    g.add(rayB);

    parts.push(
      finalizeVol3Part(
        'fab3-p08-pdaf-pupil-response',
        10,
        '#f43f5e',
        g,
        new THREE.Vector3(row2AX(7), 0.4, -29.0),
        new THREE.Vector3(11, 18, -22),
        cp
      )
    );
  }

  // F3-11 (P02-009): Thermal & Mechanical Stress Warpage Sim (1.5–4.8W Stacked Die)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matCopper));
    // Lower Logic Die (heat source) + Cu-Cu pillar layer + slightly arched Upper Pixel Die showing MPa warpage
    const logicDie = new THREE.Mesh(createVol3BoxGeo(6.8, 0.6, 5.0, 0.14, 0.04, 'y'), matCopper);
    logicDie.position.set(0, 0.65, 0.3);
    g.add(logicDie);
    for (let x = -2.4; x <= 2.4; x += 1.2) {
      for (let z = -1.5; z <= 2.1; z += 1.2) {
        const pil = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.9, 8), matAmber);
        pil.position.set(x, 1.35, z);
        pil.userData.noEdges = true;
        g.add(pil);
      }
    }
    // 5 tilted segments forming an arched thermally-warped upper wafer slab
    const archMats = [matBlue, matCyan, matAmber, matRed, matAmber];
    for (let i = 0; i < 5; i++) {
      const t = i - 2;
      const seg = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.36, 4.8), archMats[i]);
      seg.position.set(t * 1.42, 2.65 - t * t * 0.14, 0.3);
      seg.rotation.z = -t * 0.11;
      g.add(seg);
    }
    // Rising thermal plume rings
    for (let r = 0; r < 3; r++) {
      const plume = new THREE.Mesh(hiResTorus(0.9 + r * 0.55, 0.08, 8, 24), r === 0 ? matRed : matAmber);
      plume.rotation.x = Math.PI / 2;
      plume.position.set(0, 3.6 + r * 0.72, 0.3);
      plume.userData.noEdges = true;
      g.add(plume);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p09-thermal-stress-sim',
        11,
        '#ea580c',
        g,
        new THREE.Vector3(row2AX(8), 0.4, -29.0),
        new THREE.Vector3(15, 16, -22),
        cp
      )
    );
  }

  // F3-12 (P02-010): Pixel TEG Evaluation Chip & 4-Needle Wafer Prober
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matGreen));
    // Silicon chuck + 3x3 TEG variant mosaic tiles
    const chuck = new THREE.Mesh(hiResCyl(3.6, 3.8, 0.55, 24), matSteel);
    chuck.position.set(0, 0.48, 0.4);
    g.add(chuck);
    const tileMats = [matViolet, matBlue, matCyan, matGreen, matAmber, matRed, matBlue, matViolet, matGreen];
    let ti = 0;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const tile = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.28, 1.35), tileMats[ti++]);
        tile.position.set(c * 1.55, 0.92, 0.4 + r * 1.55);
        tile.userData.noEdges = true;
        g.add(tile);
      }
    }
    // Elevated Probe Card Ring + 4 angled Tungsten Gold Probe Needles touching TEG center
    const card = new THREE.Mesh(hiResTorus(3.2, 0.32, 10, 32), mats.sensorPcb);
    card.rotation.x = Math.PI / 2;
    card.position.set(0, 3.8, 0.4);
    g.add(card);
    for (let a = 0; a < 4; a++) {
      const ang = (a * Math.PI) / 2 + Math.PI / 4;
      const needle = new THREE.Mesh(hiResCyl(0.06, 0.14, 3.6, 8), matAmber);
      needle.position.set(Math.cos(ang) * 1.65, 2.4, 0.4 + Math.sin(ang) * 1.65);
      needle.rotation.z = Math.cos(ang) * 0.65;
      needle.rotation.x = -Math.sin(ang) * 0.65;
      needle.userData.noEdges = true;
      g.add(needle);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p10-pixel-teg-validation',
        12,
        '#14b8a6',
        g,
        new THREE.Vector3(row2AX(9), 0.4, -29.0),
        new THREE.Vector3(20, 14, -22),
        cp
      )
    );
  }

  // =========================================================================
  // BLOCK 2-B (Upper Row 2: Z = -12.0, Y = 0.4, 12 Parts F3-13–F3-24, pitch 10.0mm)
  // =========================================================================
  const row2BX = (idx: number) => -55.0 + idx * 10.0;

  // F3-13 (P02-011): Column-Parallel & Pixel-Parallel 14-Bit ADC
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matBlue));
    // 7-step Single-Slope Ramp Staircase + 14-bit counter tower
    for (let i = 0; i < 7; i++) {
      const h = 0.65 + i * 0.56;
      const step = new THREE.Mesh(createVol3BoxGeo(0.88, h, 2.4, 0.08, 0.03, 'y'), i === 6 ? matAmber : matBlue);
      step.position.set(-2.7 + i * 0.9, h * 0.5 + 0.18, 1.5);
      g.add(step);
    }
    // Comparator IC array bar behind staircase
    const compBar = new THREE.Mesh(createVol3BoxGeo(6.8, 1.8, 2.2, 0.14, 0.05, 'y'), mats.siliconLogicLayer);
    compBar.position.set(0, 1.1, -1.5);
    g.add(compBar);
    for (let i = 0; i < 6; i++) {
      const bitPin = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.65, 0.45), matCyan);
      bitPin.position.set(-2.5 + i * 1.0, 2.35, -1.5);
      bitPin.userData.noEdges = true;
      g.add(bitPin);
    }
    parts.push(
      finalizeVol3Part(
        'fab3-p11-adc-circuit-design',
        13,
        '#2563eb',
        g,
        new THREE.Vector3(row2BX(0), 0.4, -12.0),
        new THREE.Vector3(-22, 10, -4),
        cp
      )
    );
  }

  // F3-14 (P02-012): AFE, CDS & Simultaneous Dual-Gain (DCG) Circuit
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matBlue));
    // Twin Sample-and-Hold Capacitor Cylinders (High Conversion Gain vs Low Conversion Gain)
    const capHcg = new THREE.Mesh(hiResCyl(1.15, 1.15, 3.6, 18), matBlue);
    capHcg.position.set(-1.9, 2.0, 1.0);
    g.add(capHcg);
    const capLcg = new THREE.Mesh(hiResCyl(1.15, 1.15, 2.6, 18), matAmber);
    capLcg.position.set(1.9, 1.5, 1.0);
    g.add(capLcg);
    // CDS Differential Subtractor Bridge spanning both capacitors
    const bridge = new THREE.Mesh(createVol3BoxGeo(5.6, 0.85, 1.6, 0.14, 0.04, 'y'), matDark);
    bridge.position.set(0, 4.15, 1.0);
    g.add(bridge);
    // PGA Amp Block at rear
    const pga = new THREE.Mesh(createVol3BoxGeo(5.4, 2.2, 2.0, 0.16, 0.05, 'y'), matCyan);
    pga.position.set(0, 1.3, -1.9);
    g.add(pga);
    parts.push(
      finalizeVol3Part(
        'fab3-p12-afe-cds-dcg-design',
        14,
        '#3b82f6',
        g,
        new THREE.Vector3(row2BX(1), 0.4, -12.0),
        new THREE.Vector3(-18, 11, -4),
        cp
      )
    );
  }

  // F3-15 (P02-013): Row Driver & Picosecond Timing Generator
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matCyan));
    // Dual Side Row-Driver Towers feeding 6 parallel horizontal 36mm TG/RST/SEL busbars!
    for (const sx of [-2.8, 2.8]) {
      const drv = new THREE.Mesh(createVol3BoxGeo(1.4, 4.0, 6.4, 0.14, 0.05, 'y'), matDark);
      drv.position.set(sx, 2.2, 0);
      g.add(drv);
    }
    for (let r = 0; r < 6; r++) {
      const bus = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.16, 0.28), r % 2 === 0 ? matAmber : matCyan);
      bus.position.set(0, 1.1 + r * 0.52, -2.0 + r * 0.8);
      bus.userData.noEdges = true;
      g.add(bus);
    }
    // Timing PLL Quartz Oscillator cylinder on top
    const pll = new THREE.Mesh(hiResCyl(0.85, 0.85, 0.75, 16), matAmber);
    pll.position.set(0, 4.5, 0);
    g.add(pll);
    parts.push(
      finalizeVol3Part(
        'fab3-p13-row-driver-tg',
        15,
        '#0284c7',
        g,
        new THREE.Vector3(row2BX(2), 0.4, -12.0),
        new THREE.Vector3(-14, 12, -4),
        cp
      )
    );
  }

  // F3-16 (P02-014): 16-Lane High-Speed SLVS-EC SerDes (12.5 Gbps/lane)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matCyan));
    // SerDes Eye-Diagram Console (using existing high-detail cfeSerdesEyeDiagramDie texture!)
    g.add(makeEdaConsole(6.8, 3.6, mats.ultra.cfeSerdesEyeDiagramDie, matCyan, mats));
    // 8 Differential Twisted-Pair Lane Bars (representing 16 lanes) exiting front
    for (let i = 0; i < 8; i++) {
      const lane = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.34, 3.4), i % 2 === 0 ? matAmber : matCopper);
      lane.position.set(-2.8 + i * 0.8, 0.38, 1.6);
      lane.userData.noEdges = true;
      g.add(lane);
    }
    parts.push(
      finalizeVol3Part(
        'fab3-p14-serdes-slvsec-design',
        16,
        '#06b6d4',
        g,
        new THREE.Vector3(row2BX(3), 0.4, -12.0),
        new THREE.Vector3(-10, 13, -4),
        cp
      )
    );
  }

  // F3-17 (P02-015): On-Sensor Logic ISP Front-End & SRAM/DRAM Frame Buffer
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matCyan));
    // 3-Tier Logic/SRAM/DRAM Die Stack
    const tiers: Array<{ y: number; h: number; w: number; mat: THREE.Material }> = [
      { y: 0.65, h: 0.85, w: 6.6, mat: mats.siliconLogicLayer },
      { y: 1.95, h: 0.95, w: 5.8, mat: mats.ultra.v2BionzSramArray },
      { y: 3.35, h: 0.85, w: 5.0, mat: mats.siliconDramLayer },
    ];
    for (const t of tiers) {
      const m = new THREE.Mesh(createVol3BoxGeo(t.w, t.h, 5.4, 0.14, 0.04, 'y'), t.mat);
      m.position.set(0, t.y, 0.2);
      g.add(m);
    }
    // 4 Corner TSV vertical conduits linking ISP & Buffer
    for (const sx of [-2.1, 2.1]) {
      for (const sz of [-1.8, 2.2]) {
        const tsv = new THREE.Mesh(hiResCyl(0.18, 0.18, 3.8, 8), matCopper);
        tsv.position.set(sx, 2.1, sz);
        tsv.userData.noEdges = true;
        g.add(tsv);
      }
    }
    parts.push(
      finalizeVol3Part(
        'fab3-p15-on-sensor-isp-sram',
        17,
        '#0891b2',
        g,
        new THREE.Vector3(row2BX(4), 0.4, -12.0),
        new THREE.Vector3(-6, 14, -4),
        cp
      )
    );
  }

  // F3-18 (P02-016): 3D Hybrid Bonding Cu-Cu Floorplan (50.4M Micro-Elevators)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matAmber));
    // Bottom Logic Plane + Top Pixel Plane + Dense 5x5 Copper Hybrid Bond Pillar Matrix
    const bot = new THREE.Mesh(createVol3BoxGeo(6.8, 0.55, 6.4, 0.14, 0.04, 'y'), mats.siliconLogicLayer);
    bot.position.set(0, 0.55, 0.2);
    g.add(bot);
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        const pad = new THREE.Mesh(hiResCyl(0.22, 0.22, 2.4, 10), matCopper);
        pad.position.set(c * 1.18, 2.0, 0.2 + r * 1.1);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }
    const top = new THREE.Mesh(createVol3BoxGeo(6.8, 0.55, 6.4, 0.14, 0.04, 'y'), mats.ultra.sensorCuCuHybrid);
    top.position.set(0, 3.45, 0.2);
    g.add(top);

    parts.push(
      finalizeVol3Part(
        'fab3-p16-cucu-3d-floorplan',
        18,
        '#d97706',
        g,
        new THREE.Vector3(row2BX(5), 0.4, -12.0),
        new THREE.Vector3(-2, 15, -4),
        cp
      )
    );
  }

  // F3-19 (P02-017): Pixel Array Custom Layout (1–5nm Grid Bayer Symmetry)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matGreen));
    // Precision 4x4 2x2-shared RGGB Bayer pixel tile sculpture
    const bayer = [matRed, matGreen, matGreen, matBlue];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const idx = (r % 2) * 2 + (c % 2);
        const cell = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.95, 1.32), bayer[idx]);
        cell.position.set(-2.25 + c * 1.5, 0.72, -2.1 + r * 1.48);
        g.add(cell);
      }
    }
    // Precision X/Y vernier nanometer calibration rails
    const railX = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.28, 0.36), matAmber);
    railX.position.set(0, 1.65, 3.2);
    g.add(railX);
    const railZ = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.28, 6.4), matAmber);
    railZ.position.set(-3.35, 1.65, 0.1);
    g.add(railZ);

    parts.push(
      finalizeVol3Part(
        'fab3-p17-pixel-array-layout',
        19,
        '#10b981',
        g,
        new THREE.Vector3(row2BX(6), 0.4, -12.0),
        new THREE.Vector3(2, 15, -4),
        cp
      )
    );
  }

  // F3-20 (P02-018): Optical Black (OB) & Dummy Pixel Perimeter Border
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matDark));
    // Outer Dummy Pixel Ring (steel), Middle OB Black Light-Shield Wall (matte black), Inner Active Bayer Center
    const dummyRing = new THREE.Mesh(createVol3BoxGeo(7.0, 0.55, 6.2, 0.14, 0.04, 'y'), matSteel);
    dummyRing.position.set(0, 0.5, 0.1);
    g.add(dummyRing);
    // Raised Tungsten OB Black Perimeter Frame
    for (const sz of [-2.2, 2.4]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.15, 0.72), matDark);
      bar.position.set(0, 1.35, sz);
      g.add(bar);
    }
    for (const sx of [-2.45, 2.45]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.15, 4.0), matDark);
      bar.position.set(sx, 1.35, 0.1);
      g.add(bar);
    }
    // Inner Active Glowing Sensor Area
    const active = new THREE.Mesh(createVol3BoxGeo(4.0, 0.45, 3.0, 0.08, 0.03, 'y'), mats.ultra.fab3ChipLayoutOasis);
    active.position.set(0, 1.0, 0.1);
    g.add(active);

    parts.push(
      finalizeVol3Part(
        'fab3-p18-ob-dummy-border',
        20,
        '#475569',
        g,
        new THREE.Vector3(row2BX(7), 0.4, -12.0),
        new THREE.Vector3(6, 14, -4),
        cp
      )
    );
  }

  // F3-21 (P02-019): Logic Wafer Auto Place & Route (6–8 Orthogonal Copper Metal Layers)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matViolet));
    // 6-layer alternating Manhattan X/Z copper wiring lattice!
    for (let ly = 0; ly < 6; ly++) {
      const y = 0.65 + ly * 0.62;
      const isX = ly % 2 === 0;
      const barMat = ly === 5 ? matAmber : ly % 2 === 0 ? matCopper : matBlue;
      for (let k = -2; k <= 2; k++) {
        const wire = new THREE.Mesh(
          isX ? new THREE.BoxGeometry(6.2, 0.22, 0.34) : new THREE.BoxGeometry(0.34, 0.22, 5.8),
          barMat
        );
        wire.position.set(isX ? 0 : k * 1.22, y, isX ? k * 1.12 : 0);
        wire.userData.noEdges = true;
        g.add(wire);
      }
    }
    parts.push(
      finalizeVol3Part(
        'fab3-p19-logic-place-route',
        21,
        '#4f46e5',
        g,
        new THREE.Vector3(row2BX(8), 0.4, -12.0),
        new THREE.Vector3(10, 13, -4),
        cp
      )
    );
  }

  // F3-22 (P02-020): Partially Stacked Sensor Chiplet Partitioning (α7 V / Z6III / S1II)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matViolet));
    // Central Full-Frame Pixel Die (bare in middle!) + Twin Edge-Stacked High-Speed Logic Chiplets (Top & Bottom edges!)
    const pixelDie = new THREE.Mesh(createVol3BoxGeo(6.8, 0.55, 5.2, 0.14, 0.04, 'y'), mats.siliconSensorDie);
    pixelDie.position.set(0, 1.6, 0.1);
    g.add(pixelDie);
    // Twin bottom-mounted edge chiplets (high-speed ADC + SerDes strips at north & south edges only!)
    for (const sz of [-2.2, 2.4]) {
      const chiplet = new THREE.Mesh(createVol3BoxGeo(6.4, 0.85, 1.35, 0.1, 0.04, 'y'), matViolet);
      chiplet.position.set(0, 0.72, sz);
      g.add(chiplet);
      // Micro-bump bridges along chiplet edge
      for (let bx = -2.4; bx <= 2.4; bx += 0.96) {
        const bump = new THREE.Mesh(hiResSphere(0.16, 8, 6), matAmber);
        bump.position.set(bx, 1.28, sz);
        bump.userData.noEdges = true;
        g.add(bump);
      }
    }
    // Glowing central clear pixel aperture frame
    const win = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.12, 2.2), matCyan);
    win.position.set(0, 1.94, 0.1);
    win.userData.noEdges = true;
    g.add(win);

    parts.push(
      finalizeVol3Part(
        'fab3-p20-partial-stack-chiplet',
        22,
        '#7c3aed',
        g,
        new THREE.Vector3(row2BX(9), 0.4, -12.0),
        new THREE.Vector3(14, 12, -4),
        cp
      )
    );
  }

  // F3-23 (P02-021): CMP Dummy Metal Fill & Scribe-Line Alignment Marks
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matAmber));
    // Uniform copper CMP dummy tile checkerboard (±5% density) flanking a central scribe street
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (c === 0) continue; // Scribe line down the middle!
        const tile = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.42, 0.95), (r + c) % 2 === 0 ? matCopper : matAmber);
        tile.position.set(c * 1.4, 0.42, r * 1.25);
        tile.userData.noEdges = true;
        g.add(tile);
      }
    }
    // Precision Golden Lithography Alignment Crosses inside Scribe Line
    for (const sz of [-1.8, 1.8]) {
      const hArm = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.35, 0.22), matCyan);
      hArm.position.set(0, 0.52, sz);
      const vArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.35, 1.1), matCyan);
      vArm.position.set(0, 0.52, sz);
      g.add(hArm, vArm);
    }
    // CMP polishing pad disc hovering cleanly above
    const cmpPad = new THREE.Mesh(hiResCyl(2.4, 2.4, 0.38, 22), matSteel);
    cmpPad.position.set(0, 3.1, 0);
    g.add(cmpPad);

    parts.push(
      finalizeVol3Part(
        'fab3-p21-cmp-dummy-alignment',
        23,
        '#f59e0b',
        g,
        new THREE.Vector3(row2BX(10), 0.4, -12.0),
        new THREE.Vector3(18, 11, -4),
        cp
      )
    );
  }

  // F3-24 (P02-022): Full-Chip Top-Level OASIS Assembly & Copper Guard Ring
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(8.2, 8.6, 1.2, mats, matBlue));
    // Complete Full-Frame OASIS Die plate
    const die = new THREE.Mesh(
      createVol3BoxGeo(6.4, 0.65, 5.2, 0.14, 0.04, 'y'),
      mats.ultra.fab3ChipLayoutOasis
    );
    die.position.set(0, 0.56, 0.2);
    g.add(die);
    // Raised 3D Copper Seal / Guard Ring Fortress protecting against dicing cracks & moisture
    for (const sz of [-2.45, 2.85]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(6.7, 0.9, 0.28), matCopper);
      wall.position.set(0, 0.9, sz);
      g.add(wall);
    }
    for (const sx of [-3.25, 3.25]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.9, 5.5), matCopper);
      wall.position.set(sx, 0.9, 0.2);
      g.add(wall);
    }
    // Floating Glowing OASIS Multi-Hundred-GB Data Cube above die
    const dataCube = new THREE.Mesh(createVol3BoxGeo(2.3, 2.3, 2.3, 0.18, 0.06, 'y'), matBlue);
    dataCube.position.set(0, 3.2, 0.2);
    dataCube.rotation.set(0.35, 0.65, 0.2);
    g.add(dataCube);

    parts.push(
      finalizeVol3Part(
        'fab3-p22-fullchip-oasis-guard',
        24,
        '#0ea5e9',
        g,
        new THREE.Vector3(row2BX(11), 0.4, -12.0),
        new THREE.Vector3(22, 10, -4),
        cp
      )
    );
  }

  // =========================================================================
  // BLOCK 2-C (Upper Row 3: Z = +5.0, Y = 0.4, 10 Parts F3-25–F3-34, pitch 11.5mm)
  // =========================================================================
  const row2CX = (idx: number) => -51.75 + idx * 11.5;

  // F3-25 (P02-023): DRC (Design Rule Check — Thousands of Geometric Rules)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matGreen));
    // Parallel metal lines inspected by precision laser caliper jaws + DRC CLEAN green beacon
    for (let i = -2; i <= 2; i++) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.5, 5.4), matCopper);
      trace.position.set(i * 1.45, 0.48, 0.5);
      g.add(trace);
    }
    // Overhead DRC Caliper Bridge & Glowing Emerald Pass Beacon
    const calBar = new THREE.Mesh(createVol3BoxGeo(7.6, 0.55, 1.2, 0.12, 0.04, 'y'), matDark);
    calBar.position.set(0, 3.2, 0.5);
    g.add(calBar);
    for (const sx of [-1.45, 1.45]) {
      const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.2, 0.36), matAmber);
      jaw.position.set(sx, 1.95, 0.5);
      g.add(jaw);
    }
    const beacon = new THREE.Mesh(hiResSphere(0.75, 14, 10), matGreen);
    beacon.position.set(0, 4.3, 0.5);
    beacon.userData.noEdges = true;
    g.add(beacon);

    parts.push(
      finalizeVol3Part(
        'fab3-p23-drc-geometry-check',
        25,
        '#059669',
        g,
        new THREE.Vector3(row2CX(0), 0.4, 5.0),
        new THREE.Vector3(-20, 6, 18),
        cp
      )
    );
  }

  // F3-26 (P02-024): LVS (Layout vs Schematic 100% Netlist Correspondence)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matGreen));
    // Twin vertical boards facing each other: Left Physical Layout, Right Logical Schematic
    const layoutBoard = new THREE.Mesh(createVol3BoxGeo(0.45, 4.2, 5.2, 0.1, 0.03, 'z'), mats.ultra.fab3ChipLayoutOasis);
    layoutBoard.position.set(-2.9, 2.4, 0.3);
    g.add(layoutBoard);
    const schemBoard = new THREE.Mesh(createVol3BoxGeo(0.45, 4.2, 5.2, 0.1, 0.03, 'z'), mats.sensorPcb);
    schemBoard.position.set(2.9, 2.4, 0.3);
    g.add(schemBoard);
    // 6 Emerald 1:1 Correspondence Laser Beams proving LVS Clean!
    for (let i = 0; i < 6; i++) {
      const beam = new THREE.Mesh(hiResCyl(0.11, 0.11, 5.3, 8), matGreen);
      beam.rotation.z = Math.PI / 2;
      beam.position.set(0, 1.0 + (i % 3) * 1.25, -1.0 + Math.floor(i / 3) * 2.4);
      beam.userData.noEdges = true;
      g.add(beam);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p24-lvs-netlist-match',
        26,
        '#0d9488',
        g,
        new THREE.Vector3(row2CX(1), 0.4, 5.0),
        new THREE.Vector3(-15, 7, 18),
        cp
      )
    );
  }

  // F3-27 (P02-025): ERC / Antenna Effect & ESD Protection Verification
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matRed));
    // Delicate Transistor Gate Oxide Block on left + Long Elevated Metal Antenna Trace + Protection Diode on right
    const gateOx = new THREE.Mesh(createVol3BoxGeo(2.4, 1.2, 3.2, 0.1, 0.04, 'y'), matCyan);
    gateOx.position.set(-2.4, 0.8, 0.4);
    g.add(gateOx);
    const antenna = new THREE.Mesh(createVol3BoxGeo(6.8, 0.34, 0.85, 0.08, 0.03, 'y'), matCopper);
    antenna.position.set(0.2, 3.1, 0.4);
    g.add(antenna);
    // Plasma Lightning Rod sparks hitting long metal trace
    const bolt = makeBeamCone(0.45, 0.12, 2.0, matRed);
    bolt.position.set(0.2, 4.4, 0.4);
    g.add(bolt);
    // Inserted Antenna Diode diverting plasma charge harmlessly into substrate!
    const diode = new THREE.Mesh(hiResCyl(0.85, 0.85, 2.2, 14), matGreen);
    diode.position.set(2.6, 1.5, 0.4);
    g.add(diode);
    const shunt = new THREE.Mesh(hiResCyl(0.18, 0.18, 1.2, 8), matAmber);
    shunt.position.set(2.6, 2.8, 0.4);
    shunt.userData.noEdges = true;
    g.add(shunt);

    parts.push(
      finalizeVol3Part(
        'fab3-p25-erc-antenna-esd',
        27,
        '#e11d48',
        g,
        new THREE.Vector3(row2CX(2), 0.4, 5.0),
        new THREE.Vector3(-11, 8, 18),
        cp
      )
    );
  }

  // F3-28 (P02-026): 3D Stack Mirror-Flip Alignment Check (Pixel Wafer ↔ Logic Wafer)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matViolet));
    // Lower Logic Wafer disc + Upper Flipped Pixel Wafer disc suspended with 4 vertical laser plumb lines
    const botW = new THREE.Mesh(hiResCyl(3.3, 3.3, 0.42, 24), mats.siliconLogicLayer);
    botW.position.set(0, 0.65, 0.3);
    g.add(botW);
    const topW = new THREE.Mesh(hiResCyl(3.3, 3.3, 0.42, 24), mats.ultra.sensorCuCuHybrid);
    topW.position.set(0, 4.2, 0.3);
    g.add(topW);
    // Mirror-flip arc arrow ring on side
    const flipArc = new THREE.Mesh(hiResTorus(1.85, 0.16, 8, 24), matAmber);
    flipArc.position.set(0, 2.45, 0.3);
    flipArc.userData.noEdges = true;
    g.add(flipArc);
    for (const [lx, lz] of [[-2.0, -1.2], [2.0, -1.2], [-2.0, 1.8], [2.0, 1.8]]) {
      const plumb = new THREE.Mesh(hiResCyl(0.08, 0.08, 3.4, 8), matCyan);
      plumb.position.set(lx, 2.45, lz);
      plumb.userData.noEdges = true;
      g.add(plumb);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p26-3d-mirror-stack-verify',
        28,
        '#6366f1',
        g,
        new THREE.Vector3(row2CX(3), 0.4, 5.0),
        new THREE.Vector3(-7, 9, 18),
        cp
      )
    );
  }

  // F3-29 (P02-027) CROWN JEWEL: Full-Frame Exposure Strategy — Single-Shot vs 3-Shot Stitching
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.8, 9.2, 1.2, mats, matAmber));
    // Master Comparison Reticle Plate (custom fab3StitchVsSingleReticle PBR texture!)
    const cmpPlate = new THREE.Mesh(
      createVol3BoxGeo(8.2, 0.45, 6.2, 0.16, 0.05, 'y'),
      mats.ultra.fab3StitchVsSingleReticle
    );
    cmpPlate.position.set(0, 4.5, 0.2);
    g.add(cmpPlate);
    // Left Half: Single-Shot Seamless 36x24mm Projection Cone (Cyan)
    const singleCone = makeBeamCone(1.6, 1.35, 3.2, matBlue);
    singleCone.position.set(-2.1, 2.55, 0.2);
    g.add(singleCone);
    const singleDie = new THREE.Mesh(createVol3BoxGeo(3.2, 0.45, 4.4, 0.1, 0.03, 'y'), matCyan);
    singleDie.position.set(-2.1, 0.55, 0.2);
    g.add(singleDie);
    // Right Half: 3-Zone Stitched Full-Frame Die with Twin Glowing Overlap Dose-Gradient Seams (Amber + Red seams)
    for (let z = -1; z <= 1; z++) {
      const subDie = new THREE.Mesh(createVol3BoxGeo(3.2, 0.45, 1.25, 0.08, 0.03, 'y'), matAmber);
      subDie.position.set(2.1, 0.55, 0.2 + z * 1.52);
      g.add(subDie);
    }
    for (const seamZ of [-0.56, 0.96]) {
      const seam = new THREE.Mesh(new THREE.BoxGeometry(3.35, 0.58, 0.22), matRed);
      seam.position.set(2.1, 0.62, seamZ);
      seam.userData.noEdges = true;
      g.add(seam);
    }
    for (const cz of [-1.3, 0.2, 1.7]) {
      const sCone = makeBeamCone(0.55, 0.42, 3.2, matAmber);
      sCone.position.set(2.1, 2.55, cz);
      g.add(sCone);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p27-single-vs-stitch-split',
        29,
        '#f59e0b',
        g,
        new THREE.Vector3(row2CX(4), 0.4, 5.0),
        new THREE.Vector3(-2, 11, 20),
        cp
      )
    );
  }

  // F3-30 (P02-028) CROWN JEWEL: OPC (Optical Proximity Correction — Dog-Ear Serifs & SRAFs)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.8, 9.2, 1.2, mats, matCopper));
    // Lower Wafer Target: Razor-Sharp Printed Square Gate printed below!
    const waferBase = new THREE.Mesh(createVol3BoxGeo(7.8, 0.45, 6.2, 0.14, 0.04, 'y'), mats.siliconBulk);
    waferBase.position.set(0, 0.45, 0.2);
    g.add(waferBase);
    const printedL1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.32, 3.8), matCyan);
    printedL1.position.set(-1.1, 0.84, 0.2);
    const printedL2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.32, 1.4), matCyan);
    printedL2.position.set(0.0, 0.84, 1.4);
    g.add(printedL1, printedL2);

    // Suspended Upper OPC Photomask Plate with 3D Sculpted Gold Dog-Ear Serifs + SRAF Scattering Bars!
    const opcGlass = new THREE.Mesh(createVol3BoxGeo(7.6, 0.35, 6.0, 0.14, 0.04, 'y'), mats.ultra.fab3OpcSerifMask);
    opcGlass.position.set(0, 4.35, 0.2);
    g.add(opcGlass);
    // 3D Raised Hammerhead / Dog-Ear Serifs on top of OPC mask
    const serifCoords: Array<[number, number]> = [[-2.0, -1.5], [-0.4, -1.5], [-2.0, 1.9], [1.9, 0.6], [1.9, 1.9]];
    for (const [sx, sz] of serifCoords) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.52, 0.75), matAmber);
      ear.position.set(sx, 4.82, sz);
      g.add(ear);
    }
    // 2 Sub-Resolution Assist Feature (SRAF) bars
    for (const rx of [-3.1, 3.1]) {
      const sraf = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.36, 4.4), matSteel);
      sraf.position.set(rx, 4.74, 0.2);
      g.add(sraf);
    }
    // 193nm ArF Diffraction Light Curtain connecting OPC mask down to crisp wafer feature
    const diffBeam = makeBeamCone(2.6, 1.9, 3.1, mats.sswfGlass);
    diffBeam.position.set(0, 2.55, 0.2);
    g.add(diffBeam);

    parts.push(
      finalizeVol3Part(
        'fab3-p28-opc-serif-correction',
        30,
        '#ea580c',
        g,
        new THREE.Vector3(row2CX(5), 0.4, 5.0),
        new THREE.Vector3(2, 11, 20),
        cp
      )
    );
  }

  // F3-31 (P02-029): LRC Bossung Process Window Verification (Focus ±nm / Dose ±5%)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matGreen));
    // LRC Bossung Process Window Console (custom fab3BossungWindowMap texture!)
    g.add(makeEdaConsole(7.6, 4.1, mats.ultra.fab3BossungWindowMap, matGreen, mats));
    // 3 Focus Plane Wafer Slices in front (-Defocus, Best Focus green, +Defocus)
    const sliceMats = [matAmber, matGreen, matAmber];
    for (let i = -1; i <= 1; i++) {
      const sl = new THREE.Mesh(createVol3BoxGeo(2.0, 0.32, 2.2, 0.08, 0.03, 'y'), sliceMats[i + 1]);
      sl.position.set(i * 2.4, 0.65 + (i === 0 ? 0.35 : 0), 2.0);
      g.add(sl);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p29-lrc-bossung-window',
        31,
        '#10b981',
        g,
        new THREE.Vector3(row2CX(6), 0.4, 5.0),
        new THREE.Vector3(7, 9, 18),
        cp
      )
    );
  }

  // F3-32 (P02-030): MDP Fracturing & Proximity Effect Correction (PEC)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matBlue));
    // Exploded fractured trapezoid & rectangle shot grid with PEC dose-modulated heights!
    const doseMats = [matCyan, matBlue, matViolet, matAmber];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        const isEdge = r === 0 || r === 3 || c === 0 || c === 4;
        const h = isEdge ? 2.4 : 1.35; // PEC boosts edge dose & lowers dense center dose!
        const shot = new THREE.Mesh(
          new THREE.BoxGeometry(1.18, h, 1.18),
          isEdge ? doseMats[3] : doseMats[(r + c) % 3]
        );
        shot.position.set(-2.9 + c * 1.45, h * 0.5 + 0.2, -2.0 + r * 1.42);
        g.add(shot);
      }
    }
    parts.push(
      finalizeVol3Part(
        'fab3-p30-mdp-fracture-pec',
        32,
        '#0284c7',
        g,
        new THREE.Vector3(row2CX(7), 0.4, 5.0),
        new THREE.Vector3(11, 8, 18),
        cp
      )
    );
  }

  // F3-33 (P02-031): Tape-Out — 96-Layer Encrypted Final Data Vault & Sign-Off
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matViolet));
    // 5-Color Stacked 96-Layer Digital Vault Core
    const tiers: Array<{ h: number; mat: THREE.Material }> = [
      { h: 1.1, mat: matViolet },
      { h: 0.65, mat: matCopper },
      { h: 1.9, mat: matBlue },
      { h: 0.45, mat: matCyan },
      { h: 0.45, mat: matGreen },
    ];
    let y = 0.25;
    for (const t of tiers) {
      const slab = new THREE.Mesh(createVol3BoxGeo(5.0, t.h, 4.6, 0.14, 0.04, 'y'), t.mat);
      slab.position.set(0, y + t.h * 0.5, 0.2);
      g.add(slab);
      y += t.h + 0.12;
    }
    // Golden AES/Checksum Encryption Padlock Arch & Fiber Transmission Dish
    const lockRing = new THREE.Mesh(hiResTorus(1.1, 0.2, 10, 24), matAmber);
    lockRing.position.set(0, y + 0.85, 0.2);
    g.add(lockRing);

    parts.push(
      finalizeVol3Part(
        'fab3-p31-tapeout-96layers',
        33,
        '#7c3aed',
        g,
        new THREE.Vector3(row2CX(8), 0.4, 5.0),
        new THREE.Vector3(15, 7, 18),
        cp
      )
    );
  }

  // F3-34 (P02-032): Mask Set Scheduling — Dual-Track PSM (EB) vs Binary Cr (Laser)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matAmber));
    // Twin diverging conveyor tracks: Left High-Precision MoSi PSM (violet), Right Binary Cr (silver)
    const leftTrack = new THREE.Mesh(createVol3BoxGeo(3.2, 0.45, 6.2, 0.1, 0.03, 'y'), matViolet);
    leftTrack.position.set(-2.1, 0.45, 0.3);
    g.add(leftTrack);
    const rightTrack = new THREE.Mesh(createVol3BoxGeo(3.2, 0.45, 6.2, 0.1, 0.03, 'y'), matSteel);
    rightTrack.position.set(2.1, 0.45, 0.3);
    g.add(rightTrack);
    // 2 Mini 6" blanks queued on each track
    for (const sz of [-1.4, 1.8]) {
      const psmBlank = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.36, 2.3), mats.ultra.fab3OpcSerifMask);
      applyPlanarUVs(psmBlank.geometry, 2.3, 2.3, 'xz');
      psmBlank.position.set(-2.1, 0.92, sz);
      g.add(psmBlank);
      const crBlank = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.36, 2.3), matDark);
      crBlank.position.set(2.1, 0.92, sz);
      g.add(crBlank);
    }
    // Overhead MES Dispatch Gate Sign
    const gate = new THREE.Mesh(createVol3BoxGeo(7.6, 1.0, 0.7, 0.12, 0.04, 'z'), matAmber);
    gate.position.set(0, 3.6, -1.8);
    g.add(gate);
    for (const sx of [-3.4, 3.4]) {
      const post = new THREE.Mesh(hiResCyl(0.22, 0.22, 3.4, 10), matSteel);
      post.position.set(sx, 1.9, -1.8);
      g.add(post);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p32-mask-set-scheduling',
        34,
        '#d97706',
        g,
        new THREE.Vector3(row2CX(9), 0.4, 5.0),
        new THREE.Vector3(20, 6, 18),
        cp
      )
    );
  }

  return parts;
}
