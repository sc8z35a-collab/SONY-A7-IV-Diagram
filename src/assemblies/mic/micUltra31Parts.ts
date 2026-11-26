import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyPlanarUVs,
  buildChipPackage,
  buildGoldWirebondLoop,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeMicUltra31Part(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  targetExplodedPos: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.2
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 32, edgeOpacity);
  const explodeOffset = targetExplodedPos.clone().sub(assembledPos);

  return {
    id,
    subsystem: 'mic',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

function makeTexturedHorizRect(
  w: number,
  d: number,
  h: number,
  r: number,
  mat: THREE.Material,
  bevel = 0.04
): THREE.Mesh {
  const geo = extrudeHiRes(createRoundedRectShape(w, d, r), h, bevel, bevel, 2, 18);
  geo.rotateX(-Math.PI / 2);
  applyPlanarUVs(geo, w, d, 'xz');
  return new THREE.Mesh(geo, mat);
}

/**
 * Phase 31B — Standalone Sony Internal Microphone 110-Part Ultra-Microscopic 2026 Frontier (+30 Parts: MC81–MC110).
 *
 * Strictly enclosed inside the assembled Sony Mic Bay housing (|x| <= 18.0, y in [-9.5, +7.2],
 * z in [-11.5, +7.8], local radius <= 2.6 mm) so the assembled exterior stays 100% spotless,
 * while exploding cleanly (>= 15 mm clearance from all 109 other parts) into 3 outer museum constellations:
 *  - MC81–MC90 (Left Outer Wing): 2026 2D Graphene, Fabry-Perot Optical, Si Photonics, 3D-TSV, 5uA AAD, PMUT & DRIE MEMS Nanophysics
 *  - MC91–MC100 (Right Outer Wing): 2026 Spiral Helmholtz Acoustic Metamaterial, Tubular Wind Cavity, LF Booster & Acoustic Precision
 *  - MC101–MC110 (Front & Rear Showcase Arcs): 2026 Real-Time AI Dereverb, Multi-Speaker Diarization, UWB Lossless Rx, -20dB Safety & 3D HRTF Binaural
 */
export function buildMicUltra31Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // GROUP 1 (MC81–MC90): 2026 2D GRAPHENE, PHOTONICS, 3D-TSV & MEMS NANOPHYSICS
  // =========================================================================

  // MC81. 2026 Atomically Thin 2D Graphene Acoustic Membrane
  {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(hiResTorus(2.25, 0.24, 12, 32), mats.goldPlating);
    ring.rotation.x = Math.PI / 2;
    const discGeo = hiResCyl(2.15, 2.15, 0.14, 32);
    applyPlanarUVs(discGeo, 4.3, 4.3, 'xz');
    const grapheneDisc = new THREE.Mesh(discGeo, u.micGrapheneHexMembrane);
    // Floating atomic sp2 carbon hexagonal anchor frame above membrane
    for (let k = 0; k < 6; k++) {
      const a = (Math.PI / 3) * k;
      const atom = new THREE.Mesh(hiResSphere(0.18, 10, 8), mats.evfDichroicMirror);
      atom.position.set(Math.cos(a) * 1.15, 0.28, Math.sin(a) * 1.15);
      atom.userData.noEdges = true;
      g.add(atom);
    }
    g.add(ring, grapheneDisc);

    parts.push(
      finalizeMicUltra31Part(
        'mc-graphene-2d-membrane-2026',
        81,
        '#38bdf8',
        g,
        new THREE.Vector3(-13.8, 4.4, 3.8),
        new THREE.Vector3(-64, 34, 24),
        cp,
        0.18
      )
    );
  }

  // MC82. 2026 Fabry-Perot Optical Micro-Cavity & Fiber-Optic Interferometer
  {
    const g = new THREE.Group();
    const baseMirror = new THREE.Mesh(hiResCyl(2.0, 2.0, 0.26, 28), mats.evfDichroicMirror);
    baseMirror.position.y = -0.62;
    const topMirrorGeo = hiResCyl(1.95, 1.95, 0.16, 28);
    applyPlanarUVs(topMirrorGeo, 3.9, 3.9, 'xz');
    const topMirror = new THREE.Mesh(topMirrorGeo, u.micGrapheneHexMembrane);
    topMirror.position.y = 0.62;
    // Standing laser light cavity beam bouncing between mirrors + silica fiber ferrule
    const laserBeam = new THREE.Mesh(hiResCyl(0.28, 0.28, 1.18, 16), mats.evfIrEmitter);
    laserBeam.userData.noEdges = true;
    const fiberStub = new THREE.Mesh(hiResCyl(0.32, 0.32, 1.35, 16), mats.coverGlass);
    fiberStub.position.y = -1.35;
    for (let k = 0; k < 3; k++) {
      const a = (Math.PI * 2 * k) / 3;
      const spacer = new THREE.Mesh(hiResCyl(0.18, 0.18, 1.24, 12), mats.ceramicAlumina);
      spacer.position.set(Math.cos(a) * 1.65, 0, Math.sin(a) * 1.65);
      spacer.userData.noEdges = true;
      g.add(spacer);
    }
    g.add(baseMirror, topMirror, laserBeam, fiberStub);

    parts.push(
      finalizeMicUltra31Part(
        'mc-fabry-perot-fiber-cavity',
        82,
        '#f43f5e',
        g,
        new THREE.Vector3(-14.6, 2.8, 4.4),
        new THREE.Vector3(-68, 18, 34),
        cp,
        0.18
      )
    );
  }

  // MC83. 2026 Silicon Photonics Mach-Zehnder Waveguide Acoustic Modulator
  {
    const g = new THREE.Group();
    const chip = makeTexturedHorizRect(4.8, 3.8, 0.42, 0.34, u.micOpticalInterferometer);
    g.add(chip);
    // Split Mach-Zehnder silicon photonic waveguide arms curving around central acoustic strain membrane
    const armA = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.1, 0.34, 0),
      new THREE.Vector3(-0.9, 0.34, 1.05),
      new THREE.Vector3(0.9, 0.34, 1.05),
      new THREE.Vector3(2.1, 0.34, 0),
    ]);
    const armB = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.1, 0.34, 0),
      new THREE.Vector3(-0.9, 0.34, -1.05),
      new THREE.Vector3(0.9, 0.34, -1.05),
      new THREE.Vector3(2.1, 0.34, 0),
    ]);
    g.add(
      new THREE.Mesh(markHiRes(new THREE.TubeGeometry(armA, 28, 0.14, 10, false)), mats.evfIrEmitter),
      new THREE.Mesh(markHiRes(new THREE.TubeGeometry(armB, 28, 0.14, 10, false)), mats.evfDichroicMirror)
    );
    const strainDrum = new THREE.Mesh(hiResCyl(0.76, 0.76, 0.18, 22), mats.siliconSensorDie);
    strainDrum.position.set(0, 0.32, 0.96);
    strainDrum.userData.noEdges = true;
    g.add(strainDrum);

    parts.push(
      finalizeMicUltra31Part(
        'mc-silicon-photonics-waveguide',
        83,
        '#a855f7',
        g,
        new THREE.Vector3(-13.2, 1.2, 5.0),
        new THREE.Vector3(-66, 2, 40),
        cp,
        0.18
      )
    );
  }

  // MC84. 2026 Wafer-Level 3D-TSV Vertical MEMS-on-CMOS Hermetic Stack
  {
    const g = new THREE.Group();
    const cmosBase = makeTexturedHorizRect(4.4, 4.4, 0.48, 0.3, u.micAudioDsp32Float);
    cmosBase.position.y = -0.78;
    const memsTop = makeTexturedHorizRect(4.2, 4.2, 0.42, 0.28, u.micMemsSiliconDiaphragm);
    memsTop.position.y = 0.72;
    g.add(cmosBase, memsTop);
    // 8 copper Through-Silicon Vias (TSVs) replacing long wirebonds for ultra-low parasitic capacitance
    for (const [vx, vz] of [
      [-1.4, -1.4],
      [0, -1.4],
      [1.4, -1.4],
      [-1.4, 1.4],
      [0, 1.4],
      [1.4, 1.4],
      [-1.4, 0],
      [1.4, 0],
    ]) {
      const tsv = new THREE.Mesh(hiResCyl(0.18, 0.18, 1.38, 12), mats.copperHybridBond);
      tsv.position.set(vx, 0, vz);
      tsv.userData.noEdges = true;
      g.add(tsv);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-3d-tsv-mems-cmos-stack',
        84,
        '#d97706',
        g,
        new THREE.Vector3(-14.2, -1.8, 4.2),
        new THREE.Vector3(-68, -14, 34),
        cp,
        0.18
      )
    );
  }

  // MC85. 2026 5 uA Always-On Wake-On-Sound (AAD) Smart Voice Trigger MEMS
  {
    const g = new THREE.Group();
    const pkg = buildChipPackage({
      w: 4.4,
      d: 4.0,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      pin1Mat: mats.solderBallSilver,
    });
    const wakeRing = new THREE.Mesh(hiResTorus(1.12, 0.14, 10, 24), mats.cfaGreen);
    wakeRing.rotation.x = Math.PI / 2;
    wakeRing.position.y = 0.46;
    const coreDot = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.18, 18), mats.evfOledActive);
    coreDot.position.y = 0.46;
    coreDot.userData.noEdges = true;
    g.add(pkg, wakeRing, coreDot);

    parts.push(
      finalizeMicUltra31Part(
        'mc-wake-on-sound-5ua-aad',
        85,
        '#10b981',
        g,
        new THREE.Vector3(-13.4, -4.6, 3.6),
        new THREE.Vector3(-70, -30, 32),
        cp,
        0.18
      )
    );
  }

  // MC86. 2026 30-60 kHz PMUT Ultrasonic Room-Reflection & Distance Co-Sensor
  {
    const g = new THREE.Group();
    const carrier = makeTexturedHorizRect(4.4, 4.4, 0.42, 0.34, u.micMemsFaradayLid);
    g.add(carrier);
    // 2x2 Piezoelectric Micromachined Ultrasonic Transducer (PMUT) AlN domes emitting 45 kHz sonar pings
    for (const [px, pz] of [
      [-0.95, -0.95],
      [0.95, -0.95],
      [-0.95, 0.95],
      [0.95, 0.95],
    ]) {
      const dome = new THREE.Mesh(hiResCyl(0.68, 0.76, 0.32, 20), mats.pztCeramic);
      dome.position.set(px, 0.36, pz);
      dome.userData.noEdges = true;
      const goldCap = new THREE.Mesh(hiResCyl(0.42, 0.42, 0.08, 16), mats.goldPlating);
      goldCap.position.set(px, 0.55, pz);
      goldCap.userData.noEdges = true;
      g.add(dome, goldCap);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-pmut-ultrasonic-range-2026',
        86,
        '#06b6d4',
        g,
        new THREE.Vector3(-12.2, 4.2, -3.5),
        new THREE.Vector3(-64, 34, -16),
        cp,
        0.18
      )
    );
  }

  // MC87. Concentric Corrugated Polysilicon Membrane Stress-Dispersion Ripples
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(hiResCyl(2.2, 2.2, 0.16, 32), u.micMemsSiliconDiaphragm);
    g.add(base);
    // 4 concentric micro-corrugation ripple rings relieving wafer residual tensile stress
    for (const [rad, ht] of [
      [0.65, 0.12],
      [1.12, 0.14],
      [1.58, 0.14],
      [2.02, 0.16],
    ]) {
      const ripple = new THREE.Mesh(hiResTorus(rad, ht, 10, 32), mats.siliconSensorDie);
      ripple.rotation.x = Math.PI / 2;
      ripple.position.y = 0.14;
      ripple.userData.noEdges = true;
      g.add(ripple);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-corrugated-poly-si-rings',
        87,
        '#0ea5e9',
        g,
        new THREE.Vector3(-13.8, 1.8, -5.2),
        new THREE.Vector3(-68, 16, -28),
        cp,
        0.18
      )
    );
  }

  // MC88. Vapor-HF SiO2 Sacrificial Etch-Release Channels & Si3N4 Etch-Stop Pillars
  {
    const g = new THREE.Group();
    const floor = makeTexturedHorizRect(4.4, 4.4, 0.34, 0.3, mats.siliconBulk);
    floor.position.y = -0.52;
    const roof = makeHiResHorizPlate(
      createFrameShape(4.4, 4.4, 0.34, 2.6, 2.6, 0.2),
      0.26,
      u.micMemsSiliconDiaphragm,
      0.03,
      2,
      18
    );
    roof.position.y = 0.48;
    g.add(floor, roof);
    // 4 corner Si3N4 etch-stop anchor pillars + vapor-HF undercut air gap
    for (const [px, pz] of [
      [-1.55, -1.55],
      [1.55, -1.55],
      [-1.55, 1.55],
      [1.55, 1.55],
    ]) {
      const pillar = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.96, 14), mats.siliconNitrideBall);
      pillar.position.set(px, 0, pz);
      pillar.userData.noEdges = true;
      g.add(pillar);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-sio2-sacrificial-etch-stops',
        88,
        '#6366f1',
        g,
        new THREE.Vector3(-12.6, -0.8, -6.5),
        new THREE.Vector3(-66, -2, -36),
        cp,
        0.18
      )
    );
  }

  // MC89. Bosch DRIE Vertical Silicon Scallop Trench Wall & Back-Volume Cavity
  {
    const g = new THREE.Group();
    // Stacked micro-scallop rings showcasing Bosch SF6/C4F8 plasma cyclic deep etching
    for (let i = 0; i < 6; i++) {
      const scallop = new THREE.Mesh(hiResTorus(1.85, 0.22, 10, 28), mats.siliconBulk);
      scallop.rotation.x = Math.PI / 2;
      scallop.position.y = -0.82 + i * 0.34;
      scallop.userData.noEdges = true;
      g.add(scallop);
    }
    const baseRim = makeHiResHorizPlate(
      createFrameShape(4.6, 4.6, 0.4, 3.3, 3.3, 0.25),
      0.34,
      mats.siliconLogicLayer,
      0.04,
      2,
      20
    );
    baseRim.position.y = -0.95;
    g.add(baseRim);

    parts.push(
      finalizeMicUltra31Part(
        'mc-drie-bosch-scallop-wall',
        89,
        '#475569',
        g,
        new THREE.Vector3(-11.4, -3.6, -7.2),
        new THREE.Vector3(-64, -20, -34),
        cp,
        0.2
      )
    );
  }

  // MC90. 360-Deg Continuous LGA Metal-Lid Solder-Ring Acoustic & GHz Faraday Seal
  {
    const g = new THREE.Group();
    const lidBase = makeHiResHorizPlate(
      createFrameShape(4.8, 4.2, 0.44, 3.4, 2.8, 0.28),
      0.42,
      u.micMemsFaradayLid,
      0.04,
      2,
      20
    );
    const solderRing = makeHiResHorizPlate(
      createFrameShape(4.6, 4.0, 0.4, 3.8, 3.2, 0.3),
      0.26,
      mats.solderBallSilver,
      0.05,
      2,
      20
    );
    solderRing.position.y = -0.34;
    const goldPadRing = makeHiResHorizPlate(
      createFrameShape(4.7, 4.1, 0.4, 3.7, 3.1, 0.3),
      0.16,
      mats.goldPlating,
      0.03,
      2,
      20
    );
    goldPadRing.position.y = -0.56;
    g.add(lidBase, solderRing, goldPadRing);

    parts.push(
      finalizeMicUltra31Part(
        'mc-metal-lid-solder-ring-seal',
        90,
        '#eab308',
        g,
        new THREE.Vector3(-10.4, -6.2, -5.6),
        new THREE.Vector3(-60, -38, -22),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // GROUP 2 (MC91–MC100): 2026 ACOUSTIC METAMATERIALS & WIND/SPL ACOUSTIC PRECISION
  // =========================================================================

  // MC91. 2026 Spiral-Neck Coiled Helmholtz Acoustic Metamaterial Wind-Noise Absorber
  {
    const g = new THREE.Group();
    const tile = makeTexturedHorizRect(4.8, 4.8, 0.62, 0.42, u.micSpiralMetamaterial);
    g.add(tile);
    // Physical 3D Archimedean coiled acoustic waveguide spiral rib on top surface
    const spPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 48; i++) {
      const t = i / 48;
      const a = t * Math.PI * 2 * 2.5;
      const r = 0.35 + t * 1.65;
      spPts.push(new THREE.Vector3(Math.cos(a) * r, 0.42, Math.sin(a) * r));
    }
    const spCurve = new THREE.CatmullRomCurve3(spPts);
    const spMesh = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(spCurve, 56, 0.12, 8, false)),
      mats.goldPlating
    );
    g.add(spMesh);

    parts.push(
      finalizeMicUltra31Part(
        'mc-spiral-helmholtz-metamaterial',
        91,
        '#f59e0b',
        g,
        new THREE.Vector3(13.8, 4.4, 3.8),
        new THREE.Vector3(64, 34, 24),
        cp,
        0.18
      )
    );
  }

  // MC92. 2026 Tubular Front Acoustic Cavity Vortex-Separation Wind Suppressor
  {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(hiResCyl(2.05, 2.05, 1.35, 28), mats.magnesiumCast);
    // Dual parallel tuned laminar acoustic micro-tubes shedding wind-gust vortices
    for (const [tx, tz] of [
      [-0.65, 0],
      [0.65, 0],
    ]) {
      const tube = new THREE.Mesh(hiResCyl(0.46, 0.46, 1.85, 20), mats.stainlessMachined);
      tube.position.set(tx, 0.12, tz);
      const inner = new THREE.Mesh(hiResCyl(0.3, 0.3, 1.92, 16), mats.matteBlackAnodized);
      inner.position.set(tx, 0.12, tz);
      inner.userData.noEdges = true;
      g.add(tube, inner);
    }
    g.add(housing);

    parts.push(
      finalizeMicUltra31Part(
        'mc-tubular-front-cavity-wind',
        92,
        '#0284c7',
        g,
        new THREE.Vector3(14.4, 2.8, 4.4),
        new THREE.Vector3(68, 18, 34),
        cp,
        0.2
      )
    );
  }

  // MC93. 2026 Low-Frequency Bass-Sensitivity Boosting Acoustic Metamaterial Lens
  {
    const g = new THREE.Group();
    const base = makeTexturedHorizRect(4.6, 4.6, 0.44, 0.42, u.micSpiralMetamaterial);
    g.add(base);
    // Concentric gradient-index acoustic funnel rings concentrating long bass waves onto sub-mm MEMS port
    for (const [rad, yy] of [
      [1.85, 0.36],
      [1.32, 0.56],
      [0.82, 0.76],
    ]) {
      const funnelRing = new THREE.Mesh(hiResTorus(rad, 0.15, 10, 28), mats.copperCoil);
      funnelRing.rotation.x = Math.PI / 2;
      funnelRing.position.y = yy;
      funnelRing.userData.noEdges = true;
      g.add(funnelRing);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-lowfreq-metamaterial-booster',
        93,
        '#14b8a6',
        g,
        new THREE.Vector3(13.2, 1.2, 5.0),
        new THREE.Vector3(66, 2, 40),
        cp,
        0.18
      )
    );
  }

  // MC94. Top-Deck Micro-Chamfer Acoustic Horn Suppressing Edge-Diffraction Coloration
  {
    const g = new THREE.Group();
    const deck = makeTexturedHorizRect(4.8, 4.2, 0.42, 0.4, u.micTopDeckMg);
    // Smooth exponential flared acoustic bell horn eliminating sharp-edge comb filtering
    const flare1 = new THREE.Mesh(hiResTorus(1.42, 0.24, 12, 28), mats.stainlessMachined);
    flare1.rotation.x = Math.PI / 2;
    flare1.position.y = 0.34;
    const throat = new THREE.Mesh(hiResCyl(0.85, 0.55, 0.55, 24), mats.matteBlackAnodized);
    throat.position.y = 0.18;
    throat.userData.noEdges = true;
    g.add(deck, flare1, throat);

    parts.push(
      finalizeMicUltra31Part(
        'mc-acoustic-edge-diffraction-chamfer',
        94,
        '#94a3b8',
        g,
        new THREE.Vector3(14.0, -1.8, 4.2),
        new THREE.Vector3(68, -14, 34),
        cp,
        0.2
      )
    );
  }

  // MC95. Dual-Pitch Acoustic Impedance-Matched Wind Boundary-Layer Splitter Mesh
  {
    const g = new THREE.Group();
    const coarseMesh = makeTexturedHorizRect(4.6, 4.2, 0.22, 0.36, u.micStainlessWovenMesh);
    coarseMesh.position.y = 0.46;
    const fineMesh = makeTexturedHorizRect(4.4, 4.0, 0.22, 0.34, u.micAcousticDelayCloth);
    fineMesh.position.y = -0.34;
    const airSpacer = makeHiResHorizPlate(
      createFrameShape(4.5, 4.1, 0.35, 3.5, 3.1, 0.25),
      0.56,
      mats.mountPpsInsulator,
      0.03,
      2,
      18
    );
    g.add(coarseMesh, airSpacer, fineMesh);

    parts.push(
      finalizeMicUltra31Part(
        'mc-dual-layer-wind-boundary-mesh',
        95,
        '#64748b',
        g,
        new THREE.Vector3(13.2, -4.4, 3.6),
        new THREE.Vector3(62, -28, 22),
        cp,
        0.18
      )
    );
  }

  // MC96. Hydrophobic + Oleophobic Sebum/Oil-Repellent Acoustic Port Nano-Protector
  {
    const g = new THREE.Group();
    const membrane = new THREE.Mesh(hiResCyl(2.15, 2.15, 0.22, 32), u.micEptfeMembrane);
    const frame = new THREE.Mesh(hiResTorus(2.18, 0.18, 10, 32), mats.matteBlackAnodized);
    frame.rotation.x = Math.PI / 2;
    // Beaded water (blue) and skin-oil/sebum (amber) droplets repelled off port surface
    const waterDrop = new THREE.Mesh(hiResSphere(0.48, 14, 10), mats.coverGlass);
    waterDrop.position.set(-0.78, 0.48, 0.36);
    waterDrop.userData.noEdges = true;
    const oilDrop = new THREE.Mesh(hiResSphere(0.42, 14, 10), mats.tantalumCapYellow);
    oilDrop.position.set(0.84, 0.44, -0.32);
    oilDrop.userData.noEdges = true;
    g.add(membrane, frame, waterDrop, oilDrop);

    parts.push(
      finalizeMicUltra31Part(
        'mc-hydrophobic-oleophobic-mesh',
        96,
        '#22d3ee',
        g,
        new THREE.Vector3(12.2, 4.2, -3.5),
        new THREE.Vector3(64, 34, -16),
        cp,
        0.16
      )
    );
  }

  // MC97. Proximity-Effect Bass-Buildup Auto-Balancing Pressure-Gradient EQ Baffle
  {
    const g = new THREE.Group();
    const body = makeTexturedHorizRect(4.8, 4.2, 0.46, 0.34, u.micAcousticDelayCloth);
    // Dual front/rear calibrated phase-delay vents evening out close-talk bass boom
    const frontPort = new THREE.Mesh(hiResCyl(0.68, 0.68, 0.72, 20), mats.brassGear);
    frontPort.position.set(-1.1, 0.32, 0);
    const rearPort = new THREE.Mesh(hiResCyl(0.52, 0.52, 0.72, 20), mats.copperCoil);
    rearPort.position.set(1.1, 0.32, 0);
    const bridgeChannel = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 0.36, 0.78, 0.08, 0.03, 'y'),
      mats.stainlessMachined
    );
    bridgeChannel.position.set(0, 0.38, 0);
    g.add(body, frontPort, rearPort, bridgeChannel);

    parts.push(
      finalizeMicUltra31Part(
        'mc-proximity-effect-eq-baffle',
        97,
        '#d97706',
        g,
        new THREE.Vector3(13.8, 1.8, -5.2),
        new THREE.Vector3(68, 16, -28),
        cp,
        0.18
      )
    );
  }

  // MC98. L / R / Rear Internal Cavity Silicone Acoustic-Crosstalk Isolation Bulkhead
  {
    const g = new THREE.Group();
    // Sculpted Y-shaped acoustic isolation wall sealing Left, Right & Rear chambers
    const wallX = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 1.45, 0.56, 0.14, 0.04, 'y'),
      u.micRubberBootBlack
    );
    const wallZ = new THREE.Mesh(
      createChamferedBoxGeo(0.56, 1.45, 4.2, 0.14, 0.04, 'y'),
      u.micRubberBootBlack
    );
    const sealCap = new THREE.Mesh(hiResCyl(0.62, 0.62, 1.62, 20), mats.damperElastomer);
    g.add(wallX, wallZ, sealCap);

    parts.push(
      finalizeMicUltra31Part(
        'mc-acoustic-crosstalk-barrier',
        98,
        '#334155',
        g,
        new THREE.Vector3(12.6, -0.8, -6.5),
        new THREE.Vector3(66, -2, -36),
        cp,
        0.2
      )
    );
  }

  // MC99. 148 dB Explosion/Gust Shock-Wave Relief Micro-Slit Diaphragm Safety Flap
  {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(hiResTorus(2.05, 0.2, 10, 28), mats.stainlessMachined);
    ring.rotation.x = Math.PI / 2;
    const baseMem = new THREE.Mesh(hiResCyl(1.92, 1.92, 0.14, 28), u.micMemsSiliconDiaphragm);
    // Hinged micro-relief cantilever safety flap tilted slightly open for blast pressure vent
    const flap = new THREE.Mesh(
      createChamferedBoxGeo(1.45, 0.12, 1.45, 0.14, 0.02, 'y'),
      mats.goldPlating
    );
    flap.position.set(0.25, 0.34, 0);
    flap.rotation.z = 0.32;
    g.add(ring, baseMem, flap);

    parts.push(
      finalizeMicUltra31Part(
        'mc-high-spl-membrane-vent-flap',
        99,
        '#ef4444',
        g,
        new THREE.Vector3(11.4, -3.6, -7.2),
        new THREE.Vector3(64, -20, -34),
        cp,
        0.18
      )
    );
  }

  // MC100. 6-9 kHz Sibilance Peak-Taming Micro-Acoustic Diffuser Lattice
  {
    const g = new THREE.Group();
    const disc = new THREE.Mesh(hiResCyl(2.15, 2.15, 0.28, 28), mats.magnesiumCast);
    g.add(disc);
    // Quadratic-residue micro-pillar array diffusing harsh 6-9 kHz "S/Sh" resonance spikes
    const heights = [0.28, 0.54, 0.72, 0.42, 0.68, 0.36, 0.62];
    for (let i = 0; i < 7; i++) {
      const a = (Math.PI * 2 * i) / 7;
      const r = i === 0 ? 0 : 1.18;
      const h = heights[i];
      const peg = new THREE.Mesh(hiResCyl(0.24, 0.24, h, 14), mats.brassGear);
      peg.position.set(Math.cos(a) * r, 0.14 + h * 0.5, Math.sin(a) * r);
      peg.userData.noEdges = true;
      g.add(peg);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-sibilance-acoustic-diffuser',
        100,
        '#ec4899',
        g,
        new THREE.Vector3(10.4, -6.2, -5.6),
        new THREE.Vector3(68, -42, -32),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // GROUP 3 (MC101–MC110): 2026 AI DEREVERB, MULTI-SPEAKER, UWB RX & 3D HRTF BINAURAL
  // =========================================================================

  // MC101. 2026 Real-Time AI Dereverberation / Room-Echo Canceller NPU Stage
  {
    const g = new THREE.Group();
    const pkg = buildChipPackage({
      w: 4.8,
      d: 4.4,
      h: 0.76,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: u.micAudioDsp32Float,
      leadMat: mats.goldPlating,
      pin1Mat: mats.solderBallSilver,
    });
    const npuCore = makeTexturedHorizRect(2.6, 2.2, 0.22, 0.16, u.v2BionzGaaNanosheet);
    npuCore.position.y = 0.48;
    g.add(pkg, npuCore);

    parts.push(
      finalizeMicUltra31Part(
        'mc-ai-dereverb-room-cancel-2026',
        101,
        '#8b5cf6',
        g,
        new THREE.Vector3(-6.2, -5.8, 4.2),
        new THREE.Vector3(-32, 42, 34),
        cp,
        0.18
      )
    );
  }

  // MC102. 2026 Real-Time Multi-Speaker Voiceprint Diarization & Dual-Person Separator
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect(4.8, 4.2, 0.38, 0.3, u.batBmsPcb);
    // Twin voice-stem accelerator cores (Speaker A cyan + Speaker B amber)
    const stemA = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.42, 2.2, 0.14, 0.03, 'y'),
      mats.cfaBlue
    );
    stemA.position.set(-1.12, 0.36, 0);
    const stemB = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.42, 2.2, 0.14, 0.03, 'y'),
      mats.goldPlating
    );
    stemB.position.set(1.12, 0.36, 0);
    g.add(pcb, stemA, stemB);

    parts.push(
      finalizeMicUltra31Part(
        'mc-speaker-diarization-track-2026',
        102,
        '#0ea5e9',
        g,
        new THREE.Vector3(-2.4, -6.2, 4.8),
        new THREE.Vector3(-10, 44, 38),
        cp,
        0.18
      )
    );
  }

  // MC103. 2026 <2 ms Lossless 2.4 GHz / UWB Wireless Mic Diversity Receiver IF
  {
    const g = new THREE.Group();
    const shield = makeTexturedHorizRect(4.8, 4.0, 0.62, 0.3, mats.emiShieldCan);
    // Twin orthogonal ceramic diversity chip antennas (Ant-A & Ant-B) preventing body dropout
    const antA = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 0.34, 0.68, 0.08, 0.02, 'y'),
      mats.ceramicAlumina
    );
    antA.position.set(-0.9, 0.48, 1.15);
    const antB = new THREE.Mesh(
      createChamferedBoxGeo(0.68, 0.34, 2.2, 0.08, 0.02, 'y'),
      mats.ceramicAlumina
    );
    antB.position.set(1.45, 0.48, -0.35);
    const goldFeed = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.45, 14), mats.goldPlating);
    goldFeed.position.set(-0.6, 0.45, -0.6);
    g.add(shield, antA, antB, goldFeed);

    parts.push(
      finalizeMicUltra31Part(
        'mc-uwb-24g-lossless-rx-2026',
        103,
        '#14b8a6',
        g,
        new THREE.Vector3(2.4, -6.2, 4.8),
        new THREE.Vector3(12, 44, 38),
        cp,
        0.2
      )
    );
  }

  // MC104. Sony ECM-M1 4ch Safety-Track (-20 dB Backup & Simultaneous Omni) Mux
  {
    const g = new THREE.Group();
    const board = makeTexturedHorizRect(4.8, 4.2, 0.38, 0.3, u.micAudioDsp32Float);
    // 4 parallel channel routing rails: CH1/2 directional main + CH3/4 -20 dB omni safety backup
    for (let i = 0; i < 4; i++) {
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.28, 0.44, 0.06, 0.02, 'y'),
        i < 2 ? mats.cfaGreen : mats.goldPlating
      );
      rail.position.set(0, 0.34, -1.2 + i * 0.8);
      rail.userData.noEdges = true;
      g.add(rail);
    }
    g.add(board);

    parts.push(
      finalizeMicUltra31Part(
        'mc-safety-track-minus20db-mux',
        104,
        '#22c55e',
        g,
        new THREE.Vector3(6.2, -5.8, 4.2),
        new THREE.Vector3(32, 42, 34),
        cp,
        0.18
      )
    );
  }

  // MC105. Broadcast / YouTube -14 & -24 LUFS K-Weighted Real-Time Loudness DSP
  {
    const g = new THREE.Group();
    const pkg = buildChipPackage({
      w: 4.6,
      d: 4.2,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      pin1Mat: mats.solderBallSilver,
    });
    // Visual stepped LUFS bar meter sculpted atop chip lid
    const barColors = [mats.cfaGreen, mats.cfaGreen, mats.goldPlating, mats.cfaRed];
    for (let i = 0; i < 4; i++) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.16 + i * 0.12, 2.2),
        barColors[i]
      );
      bar.position.set(-1.05 + i * 0.7, 0.44 + i * 0.06, 0);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    g.add(pkg);

    parts.push(
      finalizeMicUltra31Part(
        'mc-lufs-broadcast-loudness-dsp',
        105,
        '#f59e0b',
        g,
        new THREE.Vector3(0, -7.2, 3.6),
        new THREE.Vector3(0, -38, 40),
        cp,
        0.18
      )
    );
  }

  // MC106. 30-100 kHz IBIS Ultrasonic PWM Anti-Aliasing Steep Analog/Digital Filter
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect(4.8, 3.8, 0.36, 0.28, mats.hdiMainboardPcb);
    g.add(pcb);
    // 3rd-order LC Cauer steep low-pass ladder blocking ultrasonic IBIS/VCM switching aliasing
    for (let i = -1; i <= 1; i++) {
      const cap = buildSmdPassive(1.0, 0.56, 0.52, mats.smdCeramic, mats.solderBallSilver);
      cap.position.set(i * 1.35, 0.44, -0.78);
      const ind = new THREE.Mesh(hiResTorus(0.42, 0.14, 10, 18), mats.copperCoil);
      ind.rotation.x = Math.PI / 2;
      ind.position.set(i * 1.35, 0.44, 0.72);
      ind.userData.noEdges = true;
      g.add(cap, ind);
    }

    parts.push(
      finalizeMicUltra31Part(
        'mc-ultrasonic-shutter-vcm-filter',
        106,
        '#ea580c',
        g,
        new THREE.Vector3(-7.6, -7.2, 1.4),
        new THREE.Vector3(-38, -46, 20),
        cp,
        0.18
      )
    );
  }

  // MC107. <0.5 Hz Subsonic DC-Offset Servo Integrator (Preserving Full Headroom)
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect(4.6, 3.8, 0.36, 0.28, mats.hdiMainboardPcb);
    const opamp = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 0.48, 1.8, 0.12, 0.03, 'y'),
      u.icEpoxyLaser
    );
    opamp.position.set(-0.95, 0.42, 0);
    const filmCap = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.72, 2.2, 0.14, 0.04, 'y'),
      mats.tantalumCapYellow
    );
    filmCap.position.set(1.1, 0.52, 0);
    g.add(pcb, opamp, filmCap);

    parts.push(
      finalizeMicUltra31Part(
        'mc-dc-servo-subsonic-integrator',
        107,
        '#eab308',
        g,
        new THREE.Vector3(7.6, -7.2, 1.4),
        new THREE.Vector3(38, -46, 20),
        cp,
        0.18
      )
    );
  }

  // MC108. Spread-Spectrum PDM / TDM Audio Clock (Zero CMOS Sensor Banding EMI)
  {
    const g = new THREE.Group();
    const xtalCan = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.78, 3.2, 0.22, 0.05, 'y'),
      mats.stainlessMachined
    );
    const goldRim = makeHiResHorizPlate(
      createFrameShape(4.4, 3.4, 0.26, 3.8, 2.8, 0.2),
      0.22,
      mats.goldPlating,
      0.03,
      2,
      16
    );
    goldRim.position.y = -0.36;
    const quartzCore = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 0.24, 1.6, 0.1, 0.02, 'y'),
      mats.quartzOlpf
    );
    quartzCore.position.y = 0.48;
    g.add(xtalCan, goldRim, quartzCore);

    parts.push(
      finalizeMicUltra31Part(
        'mc-pdm-tdm-clk-spread-spectrum',
        108,
        '#06b6d4',
        g,
        new THREE.Vector3(-5.8, -5.2, -7.8),
        new THREE.Vector3(-24, 36, -40),
        cp,
        0.18
      )
    );
  }

  // MC109. Real-Time Audio Anomaly Alert (Wind / Clip / Cable-Fault) & EVF Meter Hook
  {
    const g = new THREE.Group();
    const carrier = makeTexturedHorizRect(4.8, 3.8, 0.4, 0.3, u.batBmsPcb);
    const monitorChip = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 0.44, 2.0, 0.14, 0.03, 'y'),
      u.icEpoxyLaser
    );
    monitorChip.position.set(-0.9, 0.4, 0);
    // 3 status alert indicator domes (Green OK / Amber Wind / Red Clip-Fault)
    const ledColors = [mats.cfaGreen, mats.goldPlating, mats.cfaRed];
    for (let i = 0; i < 3; i++) {
      const led = new THREE.Mesh(hiResSphere(0.32, 12, 10), ledColors[i]);
      led.position.set(1.35, 0.42, -0.85 + i * 0.85);
      led.userData.noEdges = true;
      g.add(led);
    }
    const bond = buildGoldWirebondLoop(
      new THREE.Vector3(0.2, 0.45, 0),
      new THREE.Vector3(1.1, 0.35, 0),
      0.42,
      0.06,
      mats.goldPlating
    );
    g.add(carrier, monitorChip, bond);

    parts.push(
      finalizeMicUltra31Part(
        'mc-headphone-sidetone-eq-monitor',
        109,
        '#10b981',
        g,
        new THREE.Vector3(5.8, -5.2, -7.8),
        new THREE.Vector3(24, 36, -40),
        cp,
        0.18
      )
    );
  }

  // MC110. 2026 Real-Time HRTF (Head-Related Transfer Function) 3D Binaural Renderer
  {
    const g = new THREE.Group();
    const base = makeTexturedHorizRect(4.8, 4.4, 0.42, 0.36, u.micAudioDsp32Float);
    // 3D spatial sound sphere with orthogonal HRTF elevation/azimuth acoustic orbit rings
    const sphereCore = new THREE.Mesh(hiResSphere(0.76, 18, 14), mats.evfDichroicMirror);
    sphereCore.position.y = 1.05;
    const azRing = new THREE.Mesh(hiResTorus(1.42, 0.1, 10, 28), mats.cfaBlue);
    azRing.rotation.x = Math.PI / 2;
    azRing.position.y = 1.05;
    const elRing = new THREE.Mesh(hiResTorus(1.42, 0.1, 10, 28), mats.goldPlating);
    elRing.position.y = 1.05;
    g.add(base, sphereCore, azRing, elRing);

    parts.push(
      finalizeMicUltra31Part(
        'mc-anechoic-3d-hrtf-binaural-2026',
        110,
        '#c026d3',
        g,
        new THREE.Vector3(0, -6.6, -8.4),
        new THREE.Vector3(0, -50, -36),
        cp,
        0.18
      )
    );
  }

  return parts;
}
