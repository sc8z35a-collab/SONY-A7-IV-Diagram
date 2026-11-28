//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol3MaskParts.ts|unit=sensorFab|lines=785|exports=buildSensorFabVol3MaskParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { hiResCyl, hiResSphere, hiResTorus, applyPlanarUVs } from '../../engine/UltraDetailBuilders';
import {
  createVol3BoxGeo,
  finalizeVol3Part,
  makeBeamCone,
  makePrecisionGantry,
  makeSixInchReticlePlate,
  makeVol3Plinth,
} from './sensorFabVol3Shared';

/**
 * Builds Parts F3-35 through F3-52 of Sensor Fab Vol.3 on the Lower Stepped Photomask Cleanroom Terrace:
 * - F3-35–F3-44 (Block 2-D, Z = +24.5, Y = -8.8): P02-033 through P02-042 (Quartz Blanks, MoSi, 260k Multi-Beam EB, CD-SEM, IPRO)
 * - F3-45–F3-52 (Block 2-E, Z = +42.5, Y = -8.8): P02-043 through P02-050 (Die-to-DB, MeRiT Repair, AIMS, 0.8µm Pellicle, 96-Mask Stocker)
 */
export function buildSensorFabVol3MaskParts(mats: MaterialLibrary): CadPart[] {
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
  // BLOCK 2-D (Lower Row 1: Z = +24.5, Y = -8.8, 10 Parts F3-35–F3-44, pitch 11.5mm)
  // =========================================================================
  const row2DX = (idx: number) => -51.75 + idx * 11.5;

  // F3-35 (P02-033): Synthetic Quartz 6-Inch Substrate (152.4×152.4×6.35mm, 0.2–0.5µm Flatness)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matBlue));
    // Polishing turntable + gleaming crystal-clear 6-inch synthetic quartz glass block
    const platen = new THREE.Mesh(hiResCyl(3.8, 4.0, 0.5, 24), matSteel);
    platen.position.set(0, 0.45, 0.3);
    g.add(platen);
    const quartzSlab = new THREE.Mesh(
      createVol3BoxGeo(5.2, 0.72, 5.2, 0.16, 0.05, 'y'),
      mats.quartzOlpf
    );
    quartzSlab.position.set(0, 1.25, 0.3);
    g.add(quartzSlab);
    // SiCl4 Flame Hydrolysis Quartz Burner Torch hovering behind
    const burner = new THREE.Mesh(hiResCyl(0.52, 0.72, 2.2, 14), matDark);
    burner.position.set(0, 4.4, -1.6);
    g.add(burner);
    const flame = makeBeamCone(0.6, 1.35, 2.1, matBlue);
    flame.position.set(0, 2.6, -1.6);
    g.add(flame);

    parts.push(
      finalizeVol3Part(
        'fab3-p33-synthetic-quartz-sub',
        35,
        '#38bdf8',
        g,
        new THREE.Vector3(row2DX(0), -8.8, 24.5),
        new THREE.Vector3(-20, -9, 10),
        cp
      )
    );
  }

  // F3-36 (P02-034): Cr / MoSi Phase-Shift Film Magnetron Sputter Deposition (50–80nm)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matViolet));
    // Cylindrical stainless vacuum chamber + upper MoSi/Cr target + glowing Argon plasma ring
    const chamberWall = new THREE.Mesh(hiResCyl(3.6, 3.8, 4.6, 22), matSteel);
    chamberWall.position.set(0, 2.5, 0.2);
    g.add(chamberWall);
    const plasmaRing = new THREE.Mesh(hiResTorus(3.65, 0.26, 10, 28), matViolet);
    plasmaRing.rotation.x = Math.PI / 2;
    plasmaRing.position.set(0, 3.2, 0.2);
    plasmaRing.userData.noEdges = true;
    g.add(plasmaRing);
    // Top RF Magnetron Cathode Dome + MoSi Blank preview mounted in front
    const cathode = new THREE.Mesh(hiResCyl(2.4, 2.8, 1.2, 18), matDark);
    cathode.position.set(0, 5.4, 0.2);
    g.add(cathode);
    const blankPreview = new THREE.Mesh(createVol3BoxGeo(3.6, 0.34, 3.6, 0.1, 0.03, 'y'), matViolet);
    blankPreview.position.set(0, 0.45, 3.3);
    g.add(blankPreview);

    parts.push(
      finalizeVol3Part(
        'fab3-p34-cr-mosi-psm-sputter',
        36,
        '#6366f1',
        g,
        new THREE.Vector3(row2DX(1), -8.8, 24.5),
        new THREE.Vector3(-15, -9, 10),
        cp
      )
    );
  }

  // F3-37 (P02-035): E-Beam Resist Spin Coating & Bake (100–300nm)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matRed));
    // Stainless Spin-Coater Cup Bowl + Rotating 6" Blank + Overhead Resist Dispense Arm
    const cup = new THREE.Mesh(hiResCyl(3.5, 3.2, 1.8, 24), matSteel);
    cup.position.set(0, 1.1, 0.4);
    g.add(cup);
    const blank = new THREE.Mesh(createVol3BoxGeo(4.0, 0.32, 4.0, 0.1, 0.03, 'y'), matRed);
    blank.position.set(0, 2.2, 0.4);
    g.add(blank);
    // Spin motion ring
    const spinRing = new THREE.Mesh(hiResTorus(2.8, 0.11, 8, 28), matAmber);
    spinRing.rotation.x = Math.PI / 2;
    spinRing.position.set(0, 2.45, 0.4);
    spinRing.userData.noEdges = true;
    g.add(spinRing);
    // Dispense Arm + Droplet stream
    const post = new THREE.Mesh(hiResCyl(0.38, 0.42, 4.4, 12), matDark);
    post.position.set(-3.0, 2.4, -2.0);
    g.add(post);
    const arm = new THREE.Mesh(createVol3BoxGeo(3.8, 0.42, 0.65, 0.08, 0.03, 'y'), matSteel);
    arm.position.set(-1.3, 4.3, -0.8);
    arm.rotation.y = -0.58;
    g.add(arm);
    const drop = makeBeamCone(0.12, 0.22, 1.7, matRed);
    drop.position.set(0, 3.25, 0.4);
    g.add(drop);

    parts.push(
      finalizeVol3Part(
        'fab3-p35-eb-resist-coat-bake',
        37,
        '#ec4899',
        g,
        new THREE.Vector3(row2DX(2), -8.8, 24.5),
        new THREE.Vector3(-11, -9, 10),
        cp
      )
    );
  }

  // F3-38 (P02-036) CROWN JEWEL: 260,000-Beam Multi-Beam E-Beam Writer (±0.01°C Vacuum Column!)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.8, 9.2, 1.2, mats, matBlue));
    // Heavy Seismic Granite Vacuum Base + Laser-Interferometer XY Stage holding 6" Reticle
    const vacBase = new THREE.Mesh(createVol3BoxGeo(8.2, 1.7, 7.6, 0.24, 0.08, 'y'), matDark);
    vacBase.position.set(0, 1.05, 0.2);
    g.add(vacBase);
    const reticle = makeSixInchReticlePlate(4.8, 0.34, mats.ultra.fab3OpcSerifMask, mats, false);
    reticle.position.set(0, 2.1, 0.4);
    g.add(reticle);

    // Glowing 260,000-Beam Cyan Electron Shower Curtain (dense bundle of micro-beams!)
    const mainShower = makeBeamCone(1.1, 1.6, 2.1, matBlue);
    mainShower.position.set(0, 3.35, 0.4);
    g.add(mainShower);
    for (let bx = -1; bx <= 1; bx++) {
      for (let bz = -1; bz <= 1; bz++) {
        const beamlet = new THREE.Mesh(hiResCyl(0.06, 0.06, 2.2, 6), matCyan);
        beamlet.position.set(bx * 0.55, 3.35, 0.4 + bz * 0.55);
        beamlet.userData.noEdges = true;
        g.add(beamlet);
      }
    }

    // Towering Multi-Stage Electron-Optics Vacuum Column (11.2mm total height!)
    const stage1 = new THREE.Mesh(hiResCyl(2.4, 2.7, 2.2, 24), matSteel);
    stage1.position.set(0, 5.4, 0.4);
    g.add(stage1);
    // Programmable Aperture Plate System (APS 260k-beam blanker gold collar)
    const apsCollar = new THREE.Mesh(hiResTorus(2.45, 0.28, 10, 28), matAmber);
    apsCollar.rotation.x = Math.PI / 2;
    apsCollar.position.set(0, 6.7, 0.4);
    g.add(apsCollar);
    const stage2 = new THREE.Mesh(hiResCyl(1.75, 2.1, 2.4, 22), matDark);
    stage2.position.set(0, 8.1, 0.4);
    g.add(stage2);
    // Thermal-Controlled ±0.01°C Cooling Coils & Electron Gun Emitter Dome
    const gunDome = new THREE.Mesh(hiResCyl(1.15, 1.45, 1.5, 18), matBlue);
    gunDome.position.set(0, 10.0, 0.4);
    g.add(gunDome);
    // Flanking ±0.01°C Precision Thermal-Jacket Support Towers
    for (const sx of [-3.3, 3.3]) {
      const jacket = new THREE.Mesh(createVol3BoxGeo(0.95, 6.4, 2.2, 0.14, 0.05, 'y'), matSteel);
      jacket.position.set(sx, 5.0, -0.4);
      g.add(jacket);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p36-multibeam-eb-writer',
        38,
        '#0284c7',
        g,
        new THREE.Vector3(row2DX(3), -8.8, 24.5),
        new THREE.Vector3(-7, -10, 12),
        cp
      )
    );
  }

  // F3-39 (P02-037): Mask PEB (±0.1°C) & Alkaline Puddle Develop
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matCopper));
    // Left Half: Precision Multi-Zone Thermal PEB Hotplate (glowing warm copper)
    const hotplate = new THREE.Mesh(createVol3BoxGeo(3.6, 0.75, 5.4, 0.14, 0.04, 'y'), matCopper);
    hotplate.position.set(-2.1, 0.58, 0.3);
    g.add(hotplate);
    const reticleL = new THREE.Mesh(createVol3BoxGeo(2.8, 0.28, 2.8, 0.08, 0.03, 'y'), matAmber);
    reticleL.position.set(-2.1, 1.15, 0.3);
    g.add(reticleL);
    // Right Half: Alkaline Developer Puddle Basin + Spray Manifold Bar
    const devBasin = new THREE.Mesh(createVol3BoxGeo(3.6, 0.95, 5.4, 0.14, 0.04, 'y'), matDark);
    devBasin.position.set(2.1, 0.68, 0.3);
    g.add(devBasin);
    const reticleR = makeSixInchReticlePlate(2.8, 0.28, mats.ultra.fab3OpcSerifMask, mats, false);
    reticleR.position.set(2.1, 1.35, 0.3);
    g.add(reticleR);
    const sprayBar = new THREE.Mesh(createVol3BoxGeo(3.4, 0.36, 0.55, 0.08, 0.03, 'y'), matBlue);
    sprayBar.position.set(2.1, 3.1, 0.3);
    g.add(sprayBar);
    for (let k = -1; k <= 1; k++) {
      const jet = makeBeamCone(0.08, 0.25, 1.35, matCyan);
      jet.position.set(2.1 + k * 0.9, 2.2, 0.3);
      g.add(jet);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p37-mask-peb-develop',
        39,
        '#f97316',
        g,
        new THREE.Vector3(row2DX(4), -8.8, 24.5),
        new THREE.Vector3(-2, -9, 10),
        cp
      )
    );
  }

  // F3-40 (P02-038): Mask ICP Dry Etching (Cl2 / F2 Anisotropic Plasma + Optical Endpoint)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matViolet));
    // Lower Electrostatic Chuck + 6" Mask + Glowing Violet Cl2/F2 ICP Plasma Core + Helical RF Coils!
    const chuck = new THREE.Mesh(hiResCyl(3.3, 3.6, 1.1, 20), matDark);
    chuck.position.set(0, 0.75, 0.3);
    g.add(chuck);
    const plasmaCore = new THREE.Mesh(hiResCyl(2.4, 2.6, 3.0, 20), matViolet);
    plasmaCore.position.set(0, 2.85, 0.3);
    plasmaCore.userData.noEdges = true;
    g.add(plasmaCore);
    // 4 Copper Helical ICP RF Induction Coil Rings wrapping the quartz dome
    for (let r = 0; r < 4; r++) {
      const coil = new THREE.Mesh(hiResTorus(2.95, 0.20, 10, 28), matCopper);
      coil.rotation.x = Math.PI / 2;
      coil.position.set(0, 1.85 + r * 0.72, 0.3);
      g.add(coil);
    }
    // Top Optical Endpoint Interferometer Sensor
    const ep = new THREE.Mesh(hiResCyl(0.85, 1.05, 1.0, 14), matAmber);
    ep.position.set(0, 4.95, 0.3);
    g.add(ep);

    parts.push(
      finalizeVol3Part(
        'fab3-p38-mask-icp-dry-etch',
        40,
        '#9333ea',
        g,
        new THREE.Vector3(row2DX(5), -8.8, 24.5),
        new THREE.Vector3(2, -9, 10),
        cp
      )
    );
  }

  // F3-41 (P02-039): Mask Strip & SPM Haze-Free Ultra-Cleaning (SCREEN / SUSS)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matCyan));
    // 3 Sequential Ultra-Pure Wet Chemical Tanks (SPM -> APM/O3 -> Megasonic UPW Rinse)
    const tanks: Array<{ x: number; mat: THREE.Material }> = [
      { x: -2.6, mat: matAmber }, // SPM (H2SO4 + H2O2)
      { x: 0, mat: matBlue },     // APM / Ozone Water
      { x: 2.6, mat: matCyan },   // Megasonic UPW
    ];
    for (const t of tanks) {
      const bath = new THREE.Mesh(createVol3BoxGeo(2.2, 2.5, 5.4, 0.14, 0.05, 'y'), matSteel);
      bath.position.set(t.x, 1.45, 0.3);
      g.add(bath);
      const liq = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.25, 4.8), t.mat);
      liq.position.set(t.x, 2.75, 0.3);
      liq.userData.noEdges = true;
      g.add(liq);
    }
    // Overhead Robotic Mask Carrier Dipping 6" Reticle Vertically into Center Bath
    const dipped = new THREE.Mesh(new THREE.BoxGeometry(0.28, 3.2, 3.2), mats.quartzOlpf);
    dipped.position.set(0, 3.6, 0.3);
    g.add(dipped);
    const arm = new THREE.Mesh(createVol3BoxGeo(7.6, 0.45, 0.75, 0.1, 0.03, 'y'), matDark);
    arm.position.set(0, 5.4, 0.3);
    g.add(arm);

    parts.push(
      finalizeVol3Part(
        'fab3-p39-mask-strip-spm-clean',
        41,
        '#06b6d4',
        g,
        new THREE.Vector3(row2DX(6), -8.8, 24.5),
        new THREE.Vector3(7, -9, 10),
        cp
      )
    );
  }

  // F3-42 (P02-040): 2nd-Level Patterning (Chrome Light-Shield Border OD ≥ 99.9% + Barcode)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matDark));
    // 6" Reticle with thick sculpted matte-black Chrome Outer Border + Laser Writer Head
    const reticle = makeSixInchReticlePlate(5.6, 0.45, mats.ultra.fab3MaskCdMap, mats, false);
    reticle.position.set(0, 0.62, 0.5);
    g.add(reticle);
    // Laser Border Writer Optical Head & Dual Laser Beams etching the outer shield perimeter
    const head = new THREE.Mesh(createVol3BoxGeo(4.8, 1.15, 2.0, 0.14, 0.04, 'y'), matDark);
    head.position.set(0, 4.4, 0.5);
    g.add(head);
    for (const sx of [-2.25, 2.25]) {
      const lBeam = makeBeamCone(0.14, 0.06, 2.8, matRed);
      lBeam.position.set(sx, 2.45, 0.5);
      g.add(lBeam);
    }

    parts.push(
      finalizeVol3Part(
        'fab3-p40-second-level-border',
        42,
        '#475569',
        g,
        new THREE.Vector3(row2DX(7), -8.8, 24.5),
        new THREE.Vector3(11, -9, 10),
        cp
      )
    );
  }

  // F3-43 (P02-041): Mask CD-SEM Metrology (CDU 1–3nm 3σ — Hitachi / Advantest)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matGreen));
    g.add(makePrecisionGantry(7.2, 4.2, mats, matGreen));
    // 6" Reticle with custom CD-SEM uniformity heatmap texture (fab3MaskCdMap!)
    const reticle = makeSixInchReticlePlate(5.0, 0.36, mats.ultra.fab3MaskCdMap, mats, false);
    reticle.position.set(0, 0.55, 0.3);
    g.add(reticle);
    // Low-Voltage CD-SEM Electron Column scanning mask features
    const semCol = new THREE.Mesh(hiResCyl(0.85, 0.62, 3.0, 16), matSteel);
    semCol.position.set(0, 3.25, -0.1);
    g.add(semCol);
    const eProbe = makeBeamCone(0.12, 0.05, 1.1, matGreen);
    eProbe.position.set(0, 1.3, -0.1);
    g.add(eProbe);

    parts.push(
      finalizeVol3Part(
        'fab3-p41-mask-cd-sem-metrology',
        43,
        '#0d9488',
        g,
        new THREE.Vector3(row2DX(8), -8.8, 24.5),
        new THREE.Vector3(15, -9, 10),
        cp
      )
    );
  }

  // F3-44 (P02-042): Mask Coordinate Registration Metrology (KLA IPRO Laser Interferometer)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(9.2, 8.8, 1.2, mats, matBlue));
    // Granite Stage + 6" Reticle + Twin Orthogonal X & Y Laser Interferometer Mirrors & Red He-Ne Beams!
    const granite = new THREE.Mesh(createVol3BoxGeo(7.6, 0.9, 6.8, 0.16, 0.05, 'y'), matDark);
    granite.position.set(0, 0.65, 0.3);
    g.add(granite);
    const reticle = makeSixInchReticlePlate(4.4, 0.34, mats.ultra.fab3MaskCdMap, mats, false);
    reticle.position.set(-0.3, 1.35, 0.5);
    g.add(reticle);
    // X-Axis & Z-Axis Laser Interferometer Heads + Glowing Crimson Laser Axis Lines
    const laserX = new THREE.Mesh(createVol3BoxGeo(0.9, 1.2, 1.2, 0.1, 0.03, 'y'), matSteel);
    laserX.position.set(3.2, 1.85, 0.5);
    g.add(laserX);
    const beamX = new THREE.Mesh(hiResCyl(0.08, 0.08, 1.4, 8), matRed);
    beamX.rotation.z = Math.PI / 2;
    beamX.position.set(2.2, 1.65, 0.5);
    beamX.userData.noEdges = true;
    g.add(beamX);

    const laserZ = new THREE.Mesh(createVol3BoxGeo(1.2, 1.2, 0.9, 0.1, 0.03, 'y'), matSteel);
    laserZ.position.set(-0.3, 1.85, -2.5);
    g.add(laserZ);
    const beamZ = new THREE.Mesh(hiResCyl(0.08, 0.08, 1.4, 8), matRed);
    beamZ.rotation.x = Math.PI / 2;
    beamZ.position.set(-0.3, 1.65, -1.5);
    beamZ.userData.noEdges = true;
    g.add(beamZ);

    // Overhead Precision Optical Microscope Column
    const scope = new THREE.Mesh(hiResCyl(0.72, 0.52, 3.2, 14), matBlue);
    scope.position.set(-0.3, 3.6, 0.5);
    g.add(scope);

    parts.push(
      finalizeVol3Part(
        'fab3-p42-registration-ipro',
        44,
        '#2563eb',
        g,
        new THREE.Vector3(row2DX(9), -8.8, 24.5),
        new THREE.Vector3(20, -9, 10),
        cp
      )
    );
  }

  // =========================================================================
  // BLOCK 2-E (Lower Row 2: Z = +42.5, Y = -8.8, 8 Grand Parts F3-45–F3-52, pitch 14.0mm)
  // =========================================================================
  const row2EX = (idx: number) => -49.0 + idx * 14.0;

  // F3-45 (P02-043): Die-to-Database Mask Inspection (20–40nm — Lasertec / KLA Teron)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(11.6, 9.6, 1.2, mats, matBlue));
    g.add(makePrecisionGantry(9.4, 4.8, mats, matBlue));
    // Left: Actual 6" Quartz Mask under DUV Inspection Lens; Right: Golden Reference Database Display
    const reticle = makeSixInchReticlePlate(4.6, 0.36, mats.ultra.fab3OpcSerifMask, mats, false);
    reticle.position.set(-2.3, 0.55, 0.6);
    g.add(reticle);
    const duvLens = new THREE.Mesh(hiResCyl(1.1, 0.72, 2.8, 16), matBlue);
    duvLens.position.set(-2.3, 3.3, 0.6);
    g.add(duvLens);
    const defectSpot = new THREE.Mesh(hiResSphere(0.32, 10, 8), matRed);
    defectSpot.position.set(-1.6, 0.92, 1.1);
    defectSpot.userData.noEdges = true;
    g.add(defectSpot);
    // Database Reference Monitor on right
    const dbPanel = new THREE.Mesh(createVol3BoxGeo(4.0, 3.2, 0.32, 0.14, 0.04, 'z'), mats.ultra.fab3OpcSerifMask);
    dbPanel.position.set(2.7, 2.3, 0.2);
    dbPanel.rotation.y = -0.25;
    g.add(dbPanel);

    parts.push(
      finalizeVol3Part(
        'fab3-p43-die-to-db-inspection',
        45,
        '#0ea5e9',
        g,
        new THREE.Vector3(row2EX(0), -8.8, 42.5),
        new THREE.Vector3(-22, -12, 20),
        cp
      )
    );
  }

  // F3-46 (P02-044) CROWN JEWEL: Carl Zeiss MeRiT Nano Defect Repair (EB Etch + EBID Gas Needle)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(11.6, 9.6, 1.2, mats, matRed));
    // Zoomed Nanoscale Mask Feature Stage showing BOTH defects being surgically repaired:
    // Left: Extra Black Chrome Defect being etched away; Right: Missing White Pinhole being patched by EBID!
    const stage = makeSixInchReticlePlate(6.4, 0.42, mats.ultra.fab3OpcSerifMask, mats, false);
    stage.position.set(0, 0.58, 0.4);
    g.add(stage);

    // Central High-Precision Carl Zeiss Electron Beam Column
    const ebCol = new THREE.Mesh(hiResCyl(1.25, 0.75, 4.4, 18), matSteel);
    ebCol.position.set(0, 5.2, 0.4);
    g.add(ebCol);
    const ebRay = makeBeamCone(0.18, 0.06, 2.3, matBlue);
    ebRay.position.set(0, 2.0, 0.4);
    g.add(ebRay);

    // Twin Angled Precursor Gas Injection Needles (Left: XeF2 Etch Gas in Rose; Right: Cr/C EBID Deposit Gas in Gold!)
    const gasEtch = new THREE.Mesh(hiResCyl(0.14, 0.26, 4.0, 10), matRed);
    gasEtch.position.set(-2.3, 2.6, 0.4);
    gasEtch.rotation.z = -0.78;
    g.add(gasEtch);
    const gasDep = new THREE.Mesh(hiResCyl(0.14, 0.26, 4.0, 10), matAmber);
    gasDep.position.set(2.3, 2.6, 0.4);
    gasDep.rotation.z = 0.78;
    g.add(gasDep);

    // Nano-repair sparkling contact point
    const spark = new THREE.Mesh(hiResSphere(0.38, 12, 10), matAmber);
    spark.position.set(0, 1.0, 0.4);
    spark.userData.noEdges = true;
    g.add(spark);

    parts.push(
      finalizeVol3Part(
        'fab3-p44-nano-defect-repair',
        46,
        '#e11d48',
        g,
        new THREE.Vector3(row2EX(1), -8.8, 42.5),
        new THREE.Vector3(-15, -12, 20),
        cp
      )
    );
  }

  // F3-47 (P02-045): Carl Zeiss AIMS (Aerial Image Measurement Emulation Microscope)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(11.6, 9.6, 1.2, mats, matViolet));
    // Bottom 193nm/248nm Illumination Condenser -> Reticle -> Scanner-Matched NA Objective -> Top CCD Camera!
    const illum = new THREE.Mesh(hiResCyl(1.9, 2.2, 1.1, 18), matViolet);
    illum.position.set(-1.6, 0.75, 0.4);
    g.add(illum);
    const reticle = makeSixInchReticlePlate(4.4, 0.34, mats.ultra.fab3OpcSerifMask, mats, false);
    reticle.position.set(-1.6, 1.9, 0.4);
    g.add(reticle);
    const uvBeam = makeBeamCone(0.85, 1.2, 2.8, mats.sswfGlass);
    uvBeam.position.set(-1.6, 3.6, 0.4);
    g.add(uvBeam);
    const objective = new THREE.Mesh(hiResCyl(1.45, 0.95, 2.2, 18), matDark);
    objective.position.set(-1.6, 5.4, 0.4);
    g.add(objective);
    const ccdHead = new THREE.Mesh(createVol3BoxGeo(2.8, 1.1, 2.4, 0.14, 0.04, 'y'), matBlue);
    ccdHead.position.set(-1.6, 7.1, 0.4);
    g.add(ccdHead);

    // Side Aerial-Image Contrast Monitor displaying Bossung / Contrast Pass Waveform
    const aimsScreen = new THREE.Mesh(
      createVol3BoxGeo(3.6, 4.2, 0.34, 0.14, 0.04, 'z'),
      mats.ultra.fab3BossungWindowMap
    );
    aimsScreen.position.set(3.2, 2.7, 0.0);
    aimsScreen.rotation.y = -0.28;
    g.add(aimsScreen);

    parts.push(
      finalizeVol3Part(
        'fab3-p45-aims-aerial-image',
        47,
        '#8b5cf6',
        g,
        new THREE.Vector3(row2EX(2), -8.8, 42.5),
        new THREE.Vector3(-9, -12, 20),
        cp
      )
    );
  }

  // F3-48 (P02-046): Final Ultra-Clean & Haze-Free Passivation Module
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(11.6, 9.6, 1.2, mats, matCyan));
    // Sparkling Stainless Zero-Particle Spin-Rinse-Dryer (SRD) + UV/Ozone Haze Passivation Chamber
    const drum = new THREE.Mesh(hiResCyl(3.9, 4.1, 2.8, 24), matSteel);
    drum.position.set(0, 1.6, 0.4);
    g.add(drum);
    const reticle = makeSixInchReticlePlate(4.8, 0.34, mats.ultra.fab3MaskCdMap, mats, false);
    reticle.position.set(0, 3.25, 0.4);
    g.add(reticle);
    // Overhead UV-Ozone & N2 Dry Curtain Hood
    const hood = new THREE.Mesh(hiResCyl(3.2, 3.7, 1.2, 22), matCyan);
    hood.position.set(0, 5.4, 0.4);
    g.add(hood);
    const mistRing = new THREE.Mesh(hiResTorus(3.0, 0.16, 8, 28), matBlue);
    mistRing.rotation.x = Math.PI / 2;
    mistRing.position.set(0, 4.3, 0.4);
    mistRing.userData.noEdges = true;
    g.add(mistRing);

    parts.push(
      finalizeVol3Part(
        'fab3-p46-final-haze-ultraclean',
        48,
        '#06b6d4',
        g,
        new THREE.Vector3(row2EX(3), -8.8, 42.5),
        new THREE.Vector3(-3, -12, 20),
        cp
      )
    );
  }

  // F3-49 (P02-047) CROWN JEWEL: 0.8µm Pellicle Mounting (6mm Standoff Optical Defocus Cutaway!)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(11.6, 9.6, 1.2, mats, matGreen));
    // Oversized 6" Synthetic Quartz Mask on Precision Mounting Table
    const reticle = makeSixInchReticlePlate(7.4, 0.65, mats.ultra.fab3OpcSerifMask, mats, false);
    reticle.position.set(0, 0.75, 0.3);
    g.add(reticle);

    // Tall 6mm-Scale Anodized Aluminum Pellicle Standoff Frame (dramatically elevated 2.8mm for visual clarity!)
    const fSize = 6.2;
    const fH = 2.8;
    const wallT = 0.28;
    for (const sz of [-1, 1]) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(fSize, fH, wallT), matSteel);
      w.position.set(0, 1.1 + fH * 0.5, 0.3 + sz * (fSize * 0.5 - wallT * 0.5));
      g.add(w);
    }
    for (const sx of [-1, 1]) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(wallT, fH, fSize - wallT * 2), matSteel);
      w.position.set(sx * (fSize * 0.5 - wallT * 0.5), 1.1 + fH * 0.5, 0.3);
      g.add(w);
    }

    // Shimmering 0.8µm Fluoropolymer Pellicle Film (>99% UV transmittance!) stretched taut across frame top
    const pellicleFilm = new THREE.Mesh(new THREE.BoxGeometry(fSize - 0.2, 0.06, fSize - 0.2), mats.sswfGlass);
    pellicleFilm.position.set(0, 1.1 + fH + 0.04, 0.3);
    pellicleFilm.userData.noEdges = true;
    g.add(pellicleFilm);

    // Glowing Crimson Dust Particle trapped harmlessly HIGH above focal plane on top of the 0.8µm film!
    const dust = new THREE.Mesh(hiResSphere(0.55, 14, 10), matRed);
    dust.position.set(1.2, 1.1 + fH + 0.62, 0.3);
    g.add(dust);
    // Wide Defocused Green Cone passing cleanly around the out-of-focus dust onto the chrome circuit below!
    const defocusCone = makeBeamCone(0.45, 2.2, 2.6, matGreen);
    defocusCone.position.set(1.2, 2.55, 0.3);
    g.add(defocusCone);

    parts.push(
      finalizeVol3Part(
        'fab3-p47-pellicle-08um-mount',
        49,
        '#10b981',
        g,
        new THREE.Vector3(row2EX(4), -8.8, 42.5),
        new THREE.Vector3(3, -13, 22),
        cp
      )
    );
  }

  // F3-50 (P02-048): Post-Pellicle STARlight Inspection (Transmitted + Reflected Dual Laser)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(11.6, 9.6, 1.2, mats, matBlue));
    g.add(makePrecisionGantry(9.4, 5.2, mats, matBlue));
    // Pelliclized 6" Reticle centered under dual-angle laser emitters
    const reticle = makeSixInchReticlePlate(5.6, 0.42, mats.ultra.fab3OpcSerifMask, mats, true);
    reticle.position.set(0, 1.0, 0.4);
    g.add(reticle);
    // Top Reflected Inspection Laser (cyan) + Bottom Transmitted Inspection Laser (emerald)
    const topLaser = makeBeamCone(0.32, 0.08, 2.7, matBlue);
    topLaser.position.set(-0.9, 3.8, 0.4);
    topLaser.rotation.z = -0.32;
    g.add(topLaser);
    const refLaser = makeBeamCone(0.08, 0.32, 2.7, matAmber);
    refLaser.position.set(0.9, 3.8, 0.4);
    refLaser.rotation.z = 0.32;
    g.add(refLaser);
    // QA Certificate Pass Beacon
    const okOrb = new THREE.Mesh(hiResSphere(0.55, 12, 10), matGreen);
    okOrb.position.set(0, 6.6, -0.3);
    okOrb.userData.noEdges = true;
    g.add(okOrb);

    parts.push(
      finalizeVol3Part(
        'fab3-p48-starlight-post-pellicle',
        50,
        '#3b82f6',
        g,
        new THREE.Vector3(row2EX(5), -8.8, 42.5),
        new THREE.Vector3(9, -12, 20),
        cp
      )
    );
  }

  // F3-51 (P02-049): SMIF / RSP Reticle Pod Packaging (Low-Outgas N2 Purge + RFID Tag)
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(11.6, 9.6, 1.2, mats, matGreen));
    // Heavy Low-Outgas Base Latch Plate with Twin N2 Purge Valves
    const podBase = new THREE.Mesh(createVol3BoxGeo(7.8, 0.95, 7.6, 0.36, 0.08, 'y'), matDark);
    podBase.position.set(0, 0.68, 0.4);
    g.add(podBase);
    for (const sx of [-2.6, 2.6]) {
      const valve = new THREE.Mesh(hiResCyl(0.38, 0.38, 0.65, 12), matCyan);
      valve.position.set(sx, 0.65, 4.3);
      valve.rotation.x = Math.PI / 2;
      g.add(valve);
    }
    // Pelliclized 6" Reticle safely suspended on kinematic pins inside the pod!
    const reticle = makeSixInchReticlePlate(5.4, 0.38, mats.ultra.fab3StitchVsSingleReticle, mats, true);
    reticle.position.set(0, 1.6, 0.4);
    g.add(reticle);
    // Translucent Hermetic Protective SMIF Cover Dome + Robotic Top Mushroom Flange (SEMI E47.1)
    const dome = new THREE.Mesh(createVol3BoxGeo(7.2, 2.7, 7.0, 0.38, 0.08, 'y'), mats.sswfGlass);
    dome.position.set(0, 2.65, 0.4);
    g.add(dome);
    const flange = new THREE.Mesh(createVol3BoxGeo(2.8, 0.55, 2.8, 0.2, 0.05, 'y'), matSteel);
    flange.position.set(0, 4.35, 0.4);
    g.add(flange);
    // Golden RFID Smart Tag Badge on front face
    const rfid = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.85, 0.16), matAmber);
    rfid.position.set(0, 1.65, 4.02);
    g.add(rfid);

    parts.push(
      finalizeVol3Part(
        'fab3-p49-reticle-smif-pod',
        51,
        '#14b8a6',
        g,
        new THREE.Vector3(row2EX(6), -8.8, 42.5),
        new THREE.Vector3(15, -12, 20),
        cp
      )
    );
  }

  // F3-52 (P02-050) CROWN JEWEL: Full 96-Mask Automated Reticle Stocker + Vol.4 FEOL 380-Step Portal!
  {
    const g = new THREE.Group();
    g.add(makeVol3Plinth(11.8, 9.6, 1.2, mats, matAmber));
    // Towering Cleanroom Automated Reticle Stocker Frame (holding 5 color-coded bays = ~96 masks!)
    const leftRack = new THREE.Mesh(createVol3BoxGeo(3.6, 7.6, 6.4, 0.2, 0.06, 'y'), matDark);
    leftRack.position.set(-2.6, 4.0, 0.2);
    g.add(leftRack);
    const rightRack = new THREE.Mesh(createVol3BoxGeo(3.6, 7.6, 6.4, 0.2, 0.06, 'y'), matDark);
    rightRack.position.set(2.6, 4.0, 0.2);
    g.add(rightRack);

    // 5 Color-Coded Reticle Pod Shelves across both racks (25 FEOL, 13 BEOL, 48 Logic, 5 Backside, 5 Optical!)
    const shelfMats = [matViolet, matCopper, matBlue, matCyan, matGreen];
    for (let s = 0; s < 5; s++) {
      const sy = 1.2 + s * 1.4;
      for (const sx of [-2.6, 2.6]) {
        const pod = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.72, 5.4), shelfMats[s]);
        pod.position.set(sx, sy, 0.45);
        pod.userData.noEdges = true;
        g.add(pod);
      }
    }

    // Center Robotic Elevator Mast & Golden Hand-Off Fork carrying a 6" Reticle toward Vol.4 FEOL!
    const mast = new THREE.Mesh(createVol3BoxGeo(0.75, 8.2, 0.75, 0.08, 0.03, 'y'), matSteel);
    mast.position.set(0, 4.3, -1.2);
    g.add(mast);
    const carrier = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 2.2), matAmber);
    applyPlanarUVs(carrier.geometry, 2.2, 2.2, 'xz');
    carrier.position.set(0, 5.2, 0.9);
    g.add(carrier);

    // Glowing Golden Vol.4 (Phase 3 FEOL 380-Step) Portal Arch Crown on Top!
    const crownArch = new THREE.Mesh(hiResTorus(4.4, 0.32, 10, 32), matAmber);
    crownArch.position.set(0, 8.4, 0.2);
    g.add(crownArch);

    parts.push(
      finalizeVol3Part(
        'fab3-p50-stocker-96set-bridge',
        52,
        '#f59e0b',
        g,
        new THREE.Vector3(row2EX(7), -8.8, 42.5),
        new THREE.Vector3(22, -13, 22),
        cp
      )
    );
  }

  return parts;
}
