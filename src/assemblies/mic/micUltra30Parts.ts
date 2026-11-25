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

function finalizeMicUltraPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.2
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 32, edgeOpacity);

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

function makeTexturedPlate(
  w: number,
  d: number,
  h: number,
  r: number,
  mat: THREE.Material,
  bevel = 0.05
): THREE.Mesh {
  const geo = extrudeHiRes(createRoundedRectShape(w, d, r), h, bevel, bevel, 2, 18);
  geo.rotateX(-Math.PI / 2);
  applyPlanarUVs(geo, w, d, 'xz');
  return new THREE.Mesh(geo, mat);
}

/**
 * Phase 30B: 38 Ultra-Microscopic 2026 Microphone 3D CAD Sub-Assemblies (MC43–MC80).
 *
 * Strictly enclosed inside the assembled Sony Mic Bay magnesium housing (|x| <= 23.0,
 * y in [-11.8, +9.8], z in [-15.2, +11.2]) so the assembled exterior remains 100% spotless,
 * while exploding cleanly into 4 museum-grade radial/orbital constellations:
 *  - MC43–MC54: MEMS Sub-Micron Semiconductor & Acoustic Nanophysics (Left-Upper / Left-Front Wing)
 *  - MC55–MC62: 2025–2026 Optical MEMS (sensiBel 84 dBA), ScAlN Piezo, VPU, 32-bit Float Dual-ADC & TinyML (Hero Front Arc)
 *  - MC63–MC72: ECM Electret Micro-Physics, Directional Acoustics & Analog Craftsmanship (Right Wing)
 *  - MC73–MC80: Pro Cinema I/O, MI-Shoe 4ch Digital Bus, Master PLL, LTC Timecode, Ambisonics & OTP (Rear Constellation)
 */
export function buildMicUltra30Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // MC43. FDTS Hydrophobic Self-Assembled Monolayer (~1.5 nm Anti-Stiction Coat)
  // =========================================================================
  {
    const g = new THREE.Group();
    const siBase = new THREE.Mesh(hiResCyl(2.45, 2.52, 0.34, 28), u.micMemsSiliconDiaphragm);
    // Ordered fluorocarbon molecular SAM brush carpet (instanced upright nano-chains)
    const chainGeo = hiResCyl(0.06, 0.09, 0.56, 8);
    const chainCount = 24;
    const chains = new THREE.InstancedMesh(chainGeo, mats.vcWorkingFluidCyan, chainCount);
    const dm = new THREE.Object3D();
    for (let i = 0; i < chainCount; i++) {
      const ring = i < 8 ? 0.78 : 1.72;
      const a = ((i < 8 ? i : i - 8) / (i < 8 ? 8 : 16)) * Math.PI * 2;
      dm.position.set(Math.cos(a) * ring, 0.42, Math.sin(a) * ring);
      dm.updateMatrix();
      chains.setMatrixAt(i, dm.matrix);
    }
    chains.instanceMatrix.needsUpdate = true;
    chains.userData.noEdges = true;
    // Beaded high-contact-angle (>112 deg) hydrophobic micro-droplet spheres hovering cleanly on SAM tips!
    for (const [dx, dz, rad] of [
      [-0.75, 0.45, 0.42],
      [0.82, -0.38, 0.34],
      [0.12, 0.92, 0.28],
    ]) {
      const drop = new THREE.Mesh(hiResSphere(rad, 16, 12), mats.coverGlass);
      drop.position.set(dx, 0.72 + rad * 0.78, dz);
      drop.userData.noEdges = true;
      g.add(drop);
    }
    const rim = new THREE.Mesh(hiResTorus(2.48, 0.1, 10, 28), mats.goldPlating);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.16;
    g.add(siBase, chains, rim);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-fdts-sam-coat',
        43,
        '#06b6d4',
        g,
        new THREE.Vector3(-16.0, 3.2, 4.2),
        new THREE.Vector3(-22.0, 24.8, 11.8),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // MC44. 2 μm Barometric Pressure-Equalization Micro-Vent Hole (20 Hz LFRO)
  // =========================================================================
  {
    const g = new THREE.Group();
    const plateShape = new THREE.Shape();
    plateShape.absarc(0, 0, 2.5, 0, Math.PI * 2, false);
    const ventHole = new THREE.Path();
    ventHole.absarc(0, 0, 0.46, 0, Math.PI * 2, true);
    plateShape.holes.push(ventHole);
    const plateGeo = extrudeHiRes(plateShape, 0.42, 0.04, 0.04, 2, 28);
    plateGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(plateGeo, 5.0, 5.0, 'xz');
    const plate = new THREE.Mesh(plateGeo, u.micMemsSiliconDiaphragm);
    // Precision DRIE Venturi nozzle throat collar & twin concentric acoustic baffle lips
    const collar = new THREE.Mesh(hiResTorus(0.56, 0.11, 10, 24), mats.goldPlating);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 0.26;
    const outerBaffle = new THREE.Mesh(hiResTorus(1.42, 0.08, 8, 24), mats.titaniumRivet);
    outerBaffle.rotation.x = Math.PI / 2;
    outerBaffle.position.y = 0.24;
    // Laminar DC-pressure bleed plume filament passing smoothly through micro-vent
    const bleedTube = new THREE.Mesh(hiResCyl(0.18, 0.28, 1.45, 14), mats.vcWorkingFluidCyan);
    bleedTube.position.y = 0.12;
    bleedTube.userData.noEdges = true;
    g.add(plate, collar, outerBaffle, bleedTube);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-barometric-vent-hole',
        44,
        '#38bdf8',
        g,
        new THREE.Vector3(-16.0, 2.8, 4.2),
        new THREE.Vector3(-34.0, 19.2, 9.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC45. Squeeze-Film Viscous Air-Damping Zone & Brownian Thermal Noise Floor
  // =========================================================================
  {
    const g = new THREE.Group();
    const cushion = new THREE.Mesh(hiResCyl(2.48, 2.48, 0.54, 28), mats.coverGlass);
    // 8 radial viscous squeeze-film airflow velocity rib vectors radiating to acoustic vent holes
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(1.72, 0.12, 0.18, 0.04, 0.02, 'y'),
        mats.vcWorkingFluidCyan
      );
      rib.position.set(Math.cos(a) * 1.15, 0.08, Math.sin(a) * 1.15);
      rib.rotation.y = -a;
      rib.userData.noEdges = true;
      g.add(rib);
      // Brownian k_B*T thermal air molecule collisions around perimeter
      const mol = new THREE.Mesh(hiResSphere(0.19, 10, 8), mats.goldPlating);
      mol.position.set(Math.cos(a + 0.35) * 1.65, 0.36 * (i % 2 === 0 ? 1 : -1), Math.sin(a + 0.35) * 1.65);
      mol.userData.noEdges = true;
      g.add(mol);
    }
    const topRing = new THREE.Mesh(hiResTorus(2.42, 0.09, 10, 28), mats.stainlessMachined);
    topRing.rotation.x = Math.PI / 2;
    topRing.position.y = 0.28;
    const botRing = topRing.clone();
    botRing.position.y = -0.28;
    g.add(cushion, topRing, botRing);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-squeeze-film-zone',
        45,
        '#0ea5e9',
        g,
        new THREE.Vector3(-16.0, 2.3, 4.2),
        new THREE.Vector3(-22.0, 13.7, 21.8),
        cp,
        0.15
      )
    );
  }

  // =========================================================================
  // MC46. LPCVD Residual-Stress-Compensated Polysilicon Meander Spring Anchors
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer rigid silicon anchor frame
    const anchorFrame = makeHiResHorizPlate(
      createFrameShape(5.2, 5.2, 0.7, 3.85, 3.85, 0.45),
      0.44,
      u.micMemsSiliconDiaphragm,
      0.04,
      2,
      20
    );
    // Central floating stress-free diaphragm hub
    const hub = new THREE.Mesh(hiResCyl(1.18, 1.18, 0.28, 24), mats.goldPlating);
    // 4 folded S-meander polysilicon stress-relief flexures (90 deg apart)
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(a) * 1.12, 0.02, Math.sin(a) * 1.12),
        new THREE.Vector3(Math.cos(a + 0.26) * 1.55, 0.08, Math.sin(a + 0.26) * 1.55),
        new THREE.Vector3(Math.cos(a - 0.24) * 1.98, 0.02, Math.sin(a - 0.24) * 1.98),
        new THREE.Vector3(Math.cos(a) * 2.35, 0.02, Math.sin(a) * 2.35),
      ]);
      const spr = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(curve, 18, 0.11, 8, false)),
        mats.titaniumRivet
      );
      spr.userData.noEdges = true;
      g.add(spr);
    }
    g.add(anchorFrame, hub);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-stress-relief-springs',
        46,
        '#f59e0b',
        g,
        new THREE.Vector3(-16.0, 3.0, 4.2),
        new THREE.Vector3(-36.0, 9.0, 19.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC47. Dual-Backplate (DBP) Differential Push-Pull Capacitive MEMS Sandwich
  // =========================================================================
  {
    const g = new THREE.Group();
    const makePerfPlate = (yPos: number, mat: THREE.Material) => {
      const sh = new THREE.Shape();
      sh.absarc(0, 0, 2.35, 0, Math.PI * 2, false);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const h = new THREE.Path();
        h.absarc(Math.cos(a) * 1.28, Math.sin(a) * 1.28, 0.3, 0, Math.PI * 2, true);
        sh.holes.push(h);
      }
      const geo = extrudeHiRes(sh, 0.28, 0.03, 0.03, 1, 24);
      geo.rotateX(-Math.PI / 2);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = yPos;
      return mesh;
    };
    const topBackplate = makePerfPlate(0.68, mats.goldPlating);
    const midMembrane = new THREE.Mesh(hiResCyl(2.22, 2.22, 0.18, 28), u.micMemsSiliconDiaphragm);
    const botBackplate = makePerfPlate(-0.68, mats.copperCoil);
    // 4 SiO2 dielectric spacer pillars holding +C / -C symmetric air gaps
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const post = new THREE.Mesh(hiResCyl(0.16, 0.16, 1.38, 12), mats.ceramicAlumina);
      post.position.set(Math.cos(a) * 2.1, 0, Math.sin(a) * 2.1);
      post.userData.noEdges = true;
      g.add(post);
    }
    // Twin differential +C / -C sense lugs protruding from opposing sides
    const posLug = new THREE.Mesh(createChamferedBoxGeo(0.95, 0.22, 0.55, 0.06, 0.02, 'y'), mats.goldPlating);
    posLug.position.set(2.55, 0.68, 0);
    const negLug = new THREE.Mesh(createChamferedBoxGeo(0.95, 0.22, 0.55, 0.06, 0.02, 'y'), mats.vcWorkingFluidCyan);
    negLug.position.set(2.55, -0.68, 0);
    g.add(topBackplate, midMembrane, botBackplate, posLug, negLug);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-dual-backplate-diff',
        47,
        '#eab308',
        g,
        new THREE.Vector3(-16.0, 1.7, 4.2),
        new THREE.Vector3(-20.0, 2.3, 27.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC48. Active Parasitic-Capacitance Guard Ring & Driven Coaxial Shield Trace
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = makeTexturedPlate(5.0, 4.6, 0.36, 0.55, u.batBmsPcb, 0.04);
    // Outer grounded copper Faraday ring + middle active bootstrapped guard ring + inner ultra-sensitive sense pad!
    const outerGnd = new THREE.Mesh(hiResTorus(1.88, 0.13, 10, 28), mats.copperCoil);
    outerGnd.rotation.x = Math.PI / 2;
    outerGnd.position.y = 0.26;
    const activeGuard = new THREE.Mesh(hiResTorus(1.25, 0.15, 10, 28), mats.vcWorkingFluidCyan);
    activeGuard.rotation.x = Math.PI / 2;
    activeGuard.position.y = 0.28;
    const senseCenter = new THREE.Mesh(hiResCyl(0.62, 0.62, 0.22, 20), mats.goldPlating);
    senseCenter.position.y = 0.28;
    // Driven unity-gain buffer micro-die feeding the active guard ring
    const bufDie = new THREE.Mesh(createChamferedBoxGeo(1.0, 0.32, 0.85, 0.08, 0.03, 'y'), u.icEpoxyLaser);
    bufDie.position.set(-1.65, 0.34, 1.35);
    g.add(sub, outerGnd, activeGuard, senseCenter, bufDie);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-guard-ring-parasitic',
        48,
        '#14b8a6',
        g,
        new THREE.Vector3(-15.0, 1.1, 4.2),
        new THREE.Vector3(-35.0, -3.1, 25.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC49. Ultra-Low-Modulus Silicone Die-Attach Thermal-Warp Isolator Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const basePad = makeHiResHorizPlate(
      createFrameShape(4.9, 4.9, 0.8, 3.2, 3.2, 0.55),
      0.48,
      mats.thermalPadPink,
      0.08,
      2,
      22
    );
    // 4 compliant corner silicone stress-absorption bellows pillows
    for (const [cx, cz] of [
      [-1.78, -1.78],
      [1.78, -1.78],
      [-1.78, 1.78],
      [1.78, 1.78],
    ]) {
      const pillow = new THREE.Mesh(hiResSphere(0.54, 14, 10), mats.damperElastomer);
      pillow.scale.set(1.0, 0.58, 1.0);
      pillow.position.set(cx, 0.32, cz);
      pillow.userData.noEdges = true;
      g.add(pillow);
    }
    // Thin ceramic MEMS carrier frame resting stress-free atop the pillows
    const carrier = makeHiResHorizPlate(
      createFrameShape(4.4, 4.4, 0.6, 3.4, 3.4, 0.4),
      0.2,
      mats.ceramicAlumina,
      0.03,
      1,
      18
    );
    carrier.position.y = 0.62;
    g.add(basePad, carrier);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-die-attach-silicone',
        49,
        '#f472b6',
        g,
        new THREE.Vector3(-15.0, -0.3, 4.2),
        new THREE.Vector3(-29.0, -9.7, 17.8),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // MC50. On-ASIC 12 V Multi-Stage Dickson Charge Pump & RC Ripple Filter
  // =========================================================================
  {
    const g = new THREE.Group();
    const dieSub = makeTexturedPlate(5.2, 3.8, 0.42, 0.4, u.micAudioDsp32Float, 0.04);
    // 6-stage voltage-doubler MIM capacitor ladder stepping 1.8V -> 12V!
    for (let i = 0; i < 6; i++) {
      const x = -1.9 + i * 0.76;
      const cap = new THREE.Mesh(
        createChamferedBoxGeo(0.54, 0.24 + i * 0.06, 1.55, 0.05, 0.02, 'y'),
        i % 2 === 0 ? mats.goldPlating : mats.copperCoil
      );
      cap.position.set(x, 0.34 + i * 0.03, -0.45);
      cap.userData.noEdges = true;
      g.add(cap);
    }
    // Output HV RC ripple-filter bridge bar + status electrode
    const filterBar = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.26, 0.65, 0.06, 0.02, 'y'),
      mats.vcWorkingFluidCyan
    );
    filterBar.position.set(0, 0.34, 1.05);
    g.add(dieSub, filterBar);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-dickson-chargepump',
        50,
        '#a855f7',
        g,
        new THREE.Vector3(-11.6, 0.9, 4.2),
        new THREE.Vector3(-22.4, -14.9, 27.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC51. >100 GΩ Back-to-Back PMOS Pseudo-Resistor Constant-Charge Bias Bridge
  // =========================================================================
  {
    const g = new THREE.Group();
    const wafer = makeTexturedPlate(4.8, 3.6, 0.38, 0.42, u.bionzDieFloorplan, 0.04);
    // Twin symmetrical serpentine PMOS high-impedance diode chains meeting at floating center node
    for (const side of [-1, 1]) {
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k <= 8; k++) {
        const t = k / 8;
        pts.push(
          new THREE.Vector3(
            side * (0.25 + t * 1.75),
            0.34,
            (k % 2 === 0 ? -0.62 : 0.62)
          )
        );
      }
      const serp = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.1, 8, false)),
        side < 0 ? mats.goldPlating : mats.vcWorkingFluidCyan
      );
      serp.userData.noEdges = true;
      g.add(serp);
    }
    // Center shielded ultra-high-Z bias terminal dome
    const node = new THREE.Mesh(hiResCyl(0.45, 0.52, 0.32, 18), mats.cinnabarAnodized);
    node.position.y = 0.36;
    g.add(wafer, node);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-pseudoresistor-100gohm',
        51,
        '#f43f5e',
        g,
        new THREE.Vector3(-11.6, 1.4, 4.2),
        new THREE.Vector3(-36.4, 24.6, -10.2),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC52. Chopper-Stabilized Low-Noise Amplifier (1/f Flicker-Noise Cancellation)
  // =========================================================================
  {
    const g = new THREE.Group();
    const substrate = makeTexturedPlate(5.0, 4.0, 0.42, 0.45, u.micAudioDsp32Float, 0.04);
    // Input Chopper Modulator -> Matched Diff LNA Core -> Output Demodulator
    const modSw = new THREE.Mesh(createChamferedBoxGeo(1.05, 0.36, 2.2, 0.08, 0.03, 'y'), mats.vcWorkingFluidCyan);
    modSw.position.set(-1.55, 0.4, 0);
    const lnaCore = new THREE.Mesh(createChamferedBoxGeo(1.45, 0.5, 2.5, 0.1, 0.04, 'y'), mats.goldPlating);
    lnaCore.position.set(0, 0.46, 0);
    const demodSw = new THREE.Mesh(createChamferedBoxGeo(1.05, 0.36, 2.2, 0.08, 0.03, 'y'), mats.vcWorkingFluidCyan);
    demodSw.position.set(1.55, 0.4, 0);
    // Cross-coupled gold clock modulation bridge looping over top
    const clkBridge = buildGoldWirebondLoop(
      new THREE.Vector3(-1.55, 0.58, -0.8),
      new THREE.Vector3(1.55, 0.58, -0.8),
      0.85,
      0.08,
      mats.goldPlating
    );
    g.add(substrate, modSw, lnaCore, demodSw, clkBridge);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-chopper-lna-1f',
        52,
        '#6366f1',
        g,
        new THREE.Vector3(-11.6, 0.3, 4.2),
        new THREE.Vector3(-24.4, 17.7, -16.2),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC53. 2026 399 μW / 114.3 dB DR Companding 4th-Order Continuous-Time ΣΔ Modulator
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(5.4, 4.2, 0.44, 0.45, u.micAudioDsp32Float, 0.05);
    // 4 cascaded integrator resonator blocks + feedback companding DAC ring
    for (let i = 0; i < 4; i++) {
      const stage = new THREE.Mesh(
        createChamferedBoxGeo(0.88, 0.42 + (i % 2) * 0.14, 1.85, 0.08, 0.03, 'y'),
        i < 2 ? mats.vcWorkingFluidCyan : mats.goldPlating
      );
      stage.position.set(-1.68 + i * 1.12, 0.44, -0.35);
      stage.userData.noEdges = true;
      g.add(stage);
    }
    const compandBus = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.28, 0.72, 0.08, 0.03, 'y'),
      mats.cinnabarAnodized
    );
    compandBus.position.set(0, 0.38, 1.15);
    g.add(base, compandBus);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-companding-sdm-2026',
        53,
        '#8b5cf6',
        g,
        new THREE.Vector3(-11.6, -0.1, 4.2),
        new THREE.Vector3(-36.4, 10.1, -22.2),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC54. PDM→PCM Cascaded Integrator-Comb (CIC) Decimation & Half-Band FIR Filter
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(5.4, 4.0, 0.44, 0.45, u.micAudioDsp32Float, 0.05);
    // Descending stepped tap array visualizing 3.072 MHz PDM -> 48 kHz 24-bit PCM 64x decimation!
    for (let i = 0; i < 5; i++) {
      const barH = 0.82 - i * 0.11;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.66, barH, 2.35, 0.06, 0.02, 'y'),
        i < 3 ? mats.siliconSensorDie : mats.goldPlating
      );
      bar.position.set(-1.75 + i * 0.88, 0.22 + barH * 0.5, 0);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    g.add(base);

    parts.push(
      finalizeMicUltraPart(
        'mc-mems-cic-decimation-fir',
        54,
        '#3b82f6',
        g,
        new THREE.Vector3(-11.6, -0.5, 4.2),
        new THREE.Vector3(-24.4, -5.5, -22.2),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC55. HERO 2026 sensiBel SBM140B Optical MEMS VCSEL Laser Interferometer (84 dBA / 146 dB AOP)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Base optical ceramic substrate with bespoke diffractive grating interferometer texture!
    const optBase = makeTexturedPlate(6.4, 5.4, 0.52, 0.75, u.micOpticalInterferometer, 0.06);
    // Central ruby-glowing VCSEL vertical-cavity semiconductor laser emitter
    const vcsel = new THREE.Mesh(hiResCyl(0.68, 0.82, 0.65, 22), mats.cinnabarAnodized);
    vcsel.position.set(0, 0.55, 0);
    const vcselAperture = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.72, 16), mats.evfIrEmitter);
    vcselAperture.position.set(0, 0.58, 0);
    vcselAperture.userData.noEdges = true;
    // Translucent ruby optical interferometric beam expanding upward to floating reflective diaphragm!
    const beamCone = new THREE.Mesh(hiResCyl(1.45, 0.34, 1.85, 24, true), mats.evfIrEmitter);
    beamCone.position.set(0, 1.65, 0);
    beamCone.userData.noEdges = true;
    // Floating reflective silicon optical diaphragm with diffraction grating rim suspended above!
    const optMirror = new THREE.Mesh(hiResCyl(2.28, 2.28, 0.2, 32), u.micOpticalInterferometer);
    optMirror.position.set(0, 2.58, 0);
    const mirrorRim = new THREE.Mesh(hiResTorus(2.3, 0.1, 10, 32), mats.goldPlating);
    mirrorRim.rotation.x = Math.PI / 2;
    mirrorRim.position.set(0, 2.58, 0);
    // 4 flanking corner photodiode detectors reading +/-1st-order interference fringes
    for (const [px, pz] of [
      [-1.95, -1.45],
      [1.95, -1.45],
      [-1.95, 1.45],
      [1.95, 1.45],
    ]) {
      const pd = new THREE.Mesh(createChamferedBoxGeo(1.05, 0.42, 0.92, 0.08, 0.03, 'y'), mats.siliconSensorDie);
      pd.position.set(px, 0.46, pz);
      g.add(pd);
    }
    // 4 slender quartz spacer posts supporting floating optical diaphragm
    for (const [sx, sz] of [
      [-2.55, -1.95],
      [2.55, -1.95],
      [-2.55, 1.95],
      [2.55, 1.95],
    ]) {
      const post = new THREE.Mesh(hiResCyl(0.14, 0.14, 2.35, 12), mats.stainlessMachined);
      post.position.set(sx, 1.4, sz);
      post.userData.noEdges = true;
      g.add(post);
    }
    g.add(optBase, vcsel, vcselAperture, beamCone, optMirror, mirrorRim);

    parts.push(
      finalizeMicUltraPart(
        'mc-optical-mems-vcsel-2026',
        55,
        '#e11d48',
        g,
        new THREE.Vector3(-6.5, 2.2, 4.2),
        new THREE.Vector3(-9.5, 23.8, 23.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC56. 2026 ScAlN Rotating-Sector Cantilever Piezoelectric MEMS (Zero-Bias / IP68)
  // =========================================================================
  {
    const g = new THREE.Group();
    const frameRing = new THREE.Mesh(hiResTorus(2.65, 0.36, 14, 32), u.micMemsSiliconDiaphragm);
    frameRing.rotation.x = Math.PI / 2;
    // 8 independent triangular Scandium-doped AlN piezoelectric cantilever petals converging toward center!
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0.24, -0.06);
    petalShape.lineTo(2.42, -0.68);
    petalShape.lineTo(2.42, 0.68);
    petalShape.lineTo(0.24, 0.06);
    petalShape.closePath();
    const petalGeo = extrudeHiRes(petalShape, 0.18, 0.02, 0.02, 1, 8);
    petalGeo.rotateX(-Math.PI / 2);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const petal = new THREE.Mesh(
        petalGeo,
        i % 2 === 0 ? mats.siliconSensorDie : mats.vcWorkingFluidCyan
      );
      petal.rotation.y = a;
      petal.position.y = 0.04;
      // Thin gold Mo/AlN top sense electrode trace along each piezo wedge
      const elec = new THREE.Mesh(
        createChamferedBoxGeo(1.75, 0.08, 0.18, 0.03, 0.01, 'y'),
        mats.goldPlating
      );
      elec.rotation.y = -a;
      elec.position.set(Math.cos(a) * 1.48, 0.18, Math.sin(a) * 1.48);
      elec.userData.noEdges = true;
      g.add(petal, elec);
    }
    const goldRim = new THREE.Mesh(hiResTorus(2.65, 0.1, 10, 32), mats.goldPlating);
    goldRim.rotation.x = Math.PI / 2;
    goldRim.position.y = 0.34;
    g.add(frameRing, goldRim);

    parts.push(
      finalizeMicUltraPart(
        'mc-piezo-scaln-cantilever-2026',
        56,
        '#0ea5e9',
        g,
        new THREE.Vector3(6.5, 2.2, 4.2),
        new THREE.Vector3(9.5, 23.8, 23.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC57. Wind-Immune Bone / Chassis-Conduction VPU MEMS Accelerometer
  // =========================================================================
  {
    const g = new THREE.Group();
    const housing = makeHiResHorizPlate(
      createFrameShape(5.6, 4.8, 0.65, 4.3, 3.5, 0.4),
      1.15,
      mats.titaniumRivet,
      0.06,
      2,
      20
    );
    const floor = makeTexturedPlate(5.2, 4.4, 0.32, 0.5, u.batBmsPcb, 0.04);
    floor.position.y = -0.52;
    // Suspended high-mass seismic tungsten proof-mass block oscillating with chassis/voice vibration
    const proofMass = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 0.72, 1.85, 0.12, 0.04, 'y'),
      mats.goldPlating
    );
    proofMass.position.y = 0.08;
    // Interdigitated capacitive comb-drive sense fingers on both flanks
    for (const side of [-1, 1]) {
      for (let k = -2; k <= 2; k++) {
        const finger = new THREE.Mesh(
          createChamferedBoxGeo(0.78, 0.16, 0.14, 0.02, 0.01, 'y'),
          mats.vcWorkingFluidCyan
        );
        finger.position.set(side * 1.55, 0.08, k * 0.34);
        finger.userData.noEdges = true;
        g.add(finger);
      }
    }
    // Acoustic-coupling chassis contact foot underneath
    const foot = new THREE.Mesh(hiResCyl(1.1, 1.25, 0.36, 20), mats.copperCoil);
    foot.position.y = -0.84;
    g.add(housing, floor, proofMass, foot);

    parts.push(
      finalizeMicUltraPart(
        'mc-vpu-bone-conduction-2026',
        57,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 2.2, 7.5),
        new THREE.Vector3(0, 13.8, 26.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC58. HERO 2026 In-Camera 32-Bit Float Dual-ADC Chiplet (Clip-Free 136+ dB)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pkgBase = makeTexturedPlate(6.8, 5.2, 0.56, 0.65, u.micAudioDsp32Float, 0.06);
    // Twin parallel ADC bare silicon dies: Emerald High-Gain (+36 dB whispers) & Crimson Low-Gain (0 dB rock concert)
    const highGainDie = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 0.62, 2.05, 0.12, 0.04, 'y'),
      mats.vcWorkingFluidCyan
    );
    highGainDie.position.set(-1.62, 0.58, -0.78);
    const lowGainDie = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 0.62, 2.05, 0.12, 0.04, 'y'),
      mats.cinnabarAnodized
    );
    lowGainDie.position.set(1.62, 0.58, -0.78);
    // IEEE-754 32-bit Float Exponent/Mantissa Stitcher Core fusing both streams cleanly!
    const floatFuser = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 0.52, 1.35, 0.14, 0.04, 'y'),
      mats.goldPlating
    );
    floatFuser.position.set(0, 0.54, 1.38);
    // Gold differential bus bridges connecting both ADCs to float stitcher
    for (const sx of [-1.62, 1.62]) {
      const bridge = buildGoldWirebondLoop(
        new THREE.Vector3(sx, 0.88, 0.18),
        new THREE.Vector3(sx * 0.65, 0.8, 0.82),
        0.52,
        0.09,
        mats.goldPlating
      );
      g.add(bridge);
    }
    g.add(pkgBase, highGainDie, lowGainDie, floatFuser);

    parts.push(
      finalizeMicUltraPart(
        'mc-32bit-float-dual-adc-2026',
        58,
        '#10b981',
        g,
        new THREE.Vector3(-6.0, -9.2, 1.0),
        new THREE.Vector3(-12.0, -12.8, 31.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC59. Dual-Path Ultra-Low-Noise PGA Preamp & Phase-Matched Zero-Glitch Stitcher
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(6.2, 4.8, 0.48, 0.55, u.micAudioDsp32Float, 0.05);
    const pgaIc = buildChipPackage({
      w: 2.8,
      d: 2.8,
      h: 0.64,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      topAccentMat: u.micAudioDsp32Float,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    pgaIc.position.set(0, 0.56, 0);
    // Flanking ultra-low-noise precision thin-film resistor arrays (0.05% gain matching!)
    for (const sx of [-2.25, 2.25]) {
      for (const sz of [-1.15, 0, 1.15]) {
        const res = buildSmdPassive(0.95, 0.52, 0.36, mats.smdCeramic, mats.goldPlating, 'y');
        res.position.set(sx, 0.42, sz);
        g.add(res);
      }
    }
    g.add(pcb, pgaIc);

    parts.push(
      finalizeMicUltraPart(
        'mc-dual-stage-pga-stitch',
        59,
        '#06b6d4',
        g,
        new THREE.Vector3(6.0, -9.2, 1.0),
        new THREE.Vector3(12.0, -12.8, 31.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC60. Sony ECM-B1M / ECM-M1 Compact 8-Capsule Digital Beamforming Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // Machined dark acoustic spine housing 8 precisely spaced directional micro-capsules (4x2 matrix)
    const spine = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 1.25, 4.4, 0.55, 0.1, 'y'),
      mats.matteBlackAnodized
    );
    // 8 gleaming brass/mesh micro-capsules arranged in endfire beamforming spacing
    for (let ix = 0; ix < 4; ix++) {
      for (const sz of [-1.05, 1.05]) {
        const cx = -3.9 + ix * 2.6;
        const cap = new THREE.Mesh(hiResCyl(0.76, 0.78, 0.42, 20), mats.stainlessMachined);
        cap.position.set(cx, 0.78, sz);
        const capMesh = new THREE.Mesh(hiResCyl(0.62, 0.62, 0.46, 18), u.micAcousticDelayCloth);
        capMesh.position.set(cx, 0.8, sz);
        capMesh.userData.noEdges = true;
        g.add(cap, capMesh);
      }
    }
    // Gold phase-matched digital delay spine rail along front edge
    const rail = new THREE.Mesh(
      createChamferedBoxGeo(10.2, 0.22, 0.34, 0.06, 0.02, 'y'),
      mats.goldPlating
    );
    rail.position.set(0, 0.68, 0);
    g.add(spine, rail);

    parts.push(
      finalizeMicUltraPart(
        'mc-8capsule-beamform-array',
        60,
        '#0284c7',
        g,
        new THREE.Vector3(0, 5.2, 4.2),
        new THREE.Vector3(0, 26.8, 17.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC61. Adaptive MVDR Beamformer & Eye-AF Subject-Tracking Null-Steering DSP
  // =========================================================================
  {
    const g = new THREE.Group();
    const dspBase = makeTexturedPlate(6.2, 5.0, 0.48, 0.55, u.micAudioDsp32Float, 0.05);
    // Sculpted 3D polar super-cardioid beam lobe + flanking null-steering rejection notches hovering above DSP!
    const mainLobe = new THREE.Mesh(hiResSphere(1.15, 18, 14), mats.vcWorkingFluidCyan);
    mainLobe.scale.set(0.72, 0.32, 1.65);
    mainLobe.position.set(0, 0.68, 0.55);
    mainLobe.userData.noEdges = true;
    // Polar reticle rings
    const polarRing = new THREE.Mesh(hiResTorus(1.95, 0.08, 8, 28), mats.goldPlating);
    polarRing.rotation.x = Math.PI / 2;
    polarRing.position.y = 0.52;
    const nullBarL = new THREE.Mesh(createChamferedBoxGeo(1.1, 0.22, 0.22, 0.04, 0.02, 'y'), mats.cinnabarAnodized);
    nullBarL.position.set(-1.55, 0.62, -0.7);
    nullBarL.rotation.y = 0.65;
    const nullBarR = nullBarL.clone();
    nullBarR.position.x = 1.55;
    nullBarR.rotation.y = -0.65;
    g.add(dspBase, mainLobe, polarRing, nullBarL, nullBarR);

    parts.push(
      finalizeMicUltraPart(
        'mc-mvdr-adaptive-null-dsp',
        61,
        '#0d9488',
        g,
        new THREE.Vector3(6.0, -9.2, -5.5),
        new THREE.Vector3(16.0, -22.8, 27.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC62. 2026 On-Edge TinyML Transformer Real-Time 3-Stem Audio Separator
  // =========================================================================
  {
    const g = new THREE.Group();
    const npuBase = makeTexturedPlate(6.4, 5.2, 0.52, 0.6, u.micAudioDsp32Float, 0.06);
    // Multi-Head Self-Attention Transformer block + 3 color-coded separated output stem lanes!
    const attnBlock = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 0.72, 3.6, 0.12, 0.04, 'y'),
      u.bionzDieFloorplan
    );
    attnBlock.position.set(-1.35, 0.62, 0);
    // 3 Parallel Output Stem Buses: Voice (Cyan), Ambience (Emerald/Gold), Wind-Rejection (Crimson)
    const stems: Array<[number, THREE.Material]> = [
      [-1.25, mats.vcWorkingFluidCyan],
      [0.0, mats.goldPlating],
      [1.25, mats.cinnabarAnodized],
    ];
    for (const [sz, mat] of stems) {
      const bus = new THREE.Mesh(createChamferedBoxGeo(2.55, 0.34, 0.78, 0.08, 0.03, 'y'), mat);
      bus.position.set(1.42, 0.45, sz);
      g.add(bus);
    }
    g.add(npuBase, attnBlock);

    parts.push(
      finalizeMicUltraPart(
        'mc-tinyml-transformer-sep-2026',
        62,
        '#9333ea',
        g,
        new THREE.Vector3(-6.0, -9.2, -5.5),
        new THREE.Vector3(-16.0, -22.8, 27.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC63. ECM Corona-Charged FEP Permanently Trapped Space-Charge Dipole Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    const fepFilm = new THREE.Mesh(hiResCyl(2.48, 2.48, 0.24, 30), mats.polyimideFpc);
    // Embedded permanent electrostatic dipole charge pairs (+ gold above, - cyan below)
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const r = i % 2 === 0 ? 1.55 : 0.82;
      const posChg = new THREE.Mesh(hiResSphere(0.2, 10, 8), mats.cinnabarAnodized);
      posChg.position.set(Math.cos(a) * r, 0.34, Math.sin(a) * r);
      posChg.userData.noEdges = true;
      const negChg = new THREE.Mesh(hiResSphere(0.2, 10, 8), mats.vcWorkingFluidCyan);
      negChg.position.set(Math.cos(a) * r, -0.34, Math.sin(a) * r);
      negChg.userData.noEdges = true;
      g.add(posChg, negChg);
    }
    const brassRing = new THREE.Mesh(hiResTorus(2.48, 0.14, 10, 30), mats.brassGear);
    brassRing.rotation.x = Math.PI / 2;
    g.add(fepFilm, brassRing);

    parts.push(
      finalizeMicUltraPart(
        'mc-ecm-corona-fep-dipole',
        63,
        '#f59e0b',
        g,
        new THREE.Vector3(14.2, 3.0, 4.2),
        new THREE.Vector3(23.8, 25.0, 11.8),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // MC64. Back-Electret 2.5 μm PET Diaphragm Pre-Tension Ring & Laser Perimeter Weld
  // =========================================================================
  {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(hiResTorus(2.42, 0.26, 12, 32), mats.brassGear);
    ring.rotation.x = Math.PI / 2;
    const petDisc = new THREE.Mesh(hiResCyl(2.26, 2.26, 0.1, 28), mats.goldPlating);
    // 12 precision perimeter laser spot-weld beads locking uniform drum tension
    const beadGeo = hiResSphere(0.14, 10, 8);
    const beads = new THREE.InstancedMesh(beadGeo, mats.stainlessMachined, 12);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      dm.position.set(Math.cos(a) * 2.42, 0.24, Math.sin(a) * 2.42);
      dm.updateMatrix();
      beads.setMatrixAt(i, dm.matrix);
    }
    beads.instanceMatrix.needsUpdate = true;
    beads.userData.noEdges = true;
    g.add(ring, petDisc, beads);

    parts.push(
      finalizeMicUltraPart(
        'mc-ecm-back-electret-weld',
        64,
        '#eab308',
        g,
        new THREE.Vector3(14.2, 2.6, 4.2),
        new THREE.Vector3(35.8, 17.4, 9.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC65. ECM JFET 2SK596 Integrated 1 GΩ Anti-Parallel Gate-Bias Diode Die
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcbDisc = new THREE.Mesh(hiResCyl(2.42, 2.42, 0.36, 28), u.batBmsPcb);
    const jfetDie = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.42, 1.45, 0.08, 0.03, 'y'),
      u.bionzDieFloorplan
    );
    jfetDie.position.set(0, 0.38, 0);
    // Twin anti-parallel 1 GΩ gate-bias PN diode bars flanking gate pad
    const d1 = new THREE.Mesh(createChamferedBoxGeo(0.55, 0.22, 0.32, 0.04, 0.01, 'y'), mats.cinnabarAnodized);
    d1.position.set(-0.42, 0.64, -0.22);
    const d2 = new THREE.Mesh(createChamferedBoxGeo(0.55, 0.22, 0.32, 0.04, 0.01, 'y'), mats.vcWorkingFluidCyan);
    d2.position.set(0.42, 0.64, 0.22);
    // Dual gold wirebond loops to gold drain/source crescent pads
    const wb1 = buildGoldWirebondLoop(
      new THREE.Vector3(-0.65, 0.56, 0),
      new THREE.Vector3(-1.75, 0.22, 0),
      0.55,
      0.07,
      mats.goldPlating
    );
    const wb2 = buildGoldWirebondLoop(
      new THREE.Vector3(0.65, 0.56, 0),
      new THREE.Vector3(1.75, 0.22, 0),
      0.55,
      0.07,
      mats.goldPlating
    );
    g.add(pcbDisc, jfetDie, d1, d2, wb1, wb2);

    parts.push(
      finalizeMicUltraPart(
        'mc-ecm-1gohm-gate-diode',
        65,
        '#16a34a',
        g,
        new THREE.Vector3(14.2, -0.1, 4.2),
        new THREE.Vector3(23.8, 14.1, 21.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC66. In-Capsule Dual-Resonant 10 pF + 33 pF C0G/NP0 RF Bypass Micro-Caps
  // =========================================================================
  {
    const g = new THREE.Group();
    const arcBase = new THREE.Mesh(hiResCyl(2.28, 2.28, 0.3, 26), u.batBmsPcb);
    // 10 pF (1.8-5 GHz Wi-Fi/5G resonance) + 33 pF (900 MHz GSM/LTE TDMA resonance) C0G caps!
    const cap10 = buildSmdPassive(1.55, 0.88, 0.64, mats.smdCeramic, mats.silverElectrode, 'y');
    cap10.position.set(-0.92, 0.48, 0.25);
    const cap33 = buildSmdPassive(1.85, 0.96, 0.72, mats.ceramicAlumina, mats.goldPlating, 'y');
    cap33.position.set(0.98, 0.52, -0.25);
    const gndRing = new THREE.Mesh(hiResTorus(2.22, 0.1, 8, 26), mats.copperCoil);
    gndRing.rotation.x = Math.PI / 2;
    gndRing.position.y = 0.18;
    g.add(arcBase, cap10, cap33, gndRing);

    parts.push(
      finalizeMicUltraPart(
        'mc-ecm-rf-tdma-bypass-caps',
        66,
        '#d97706',
        g,
        new THREE.Vector3(14.2, -0.4, 4.2),
        new THREE.Vector3(37.8, 8.4, 17.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC67. Cardioid Directional Rear Acoustic Phase-Delay Woven Silk Mesh
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bespoke woven silk phase-delay cloth disc framed by precision perforated brass resistance ring!
    const brassCollar = new THREE.Mesh(hiResTorus(2.55, 0.24, 12, 30), mats.brassGear);
    brassCollar.rotation.x = Math.PI / 2;
    const silkGeo = hiResCyl(2.42, 2.42, 0.22, 28);
    applyPlanarUVs(silkGeo, 4.84, 4.84, 'xz');
    const silkDisc = new THREE.Mesh(silkGeo, u.micAcousticDelayCloth);
    // 4 phase-delay rear aperture ports underneath
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const port = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.34, 14), mats.matteBlackAnodized);
      port.position.set(Math.cos(a) * 1.45, -0.14, Math.sin(a) * 1.45);
      port.userData.noEdges = true;
      g.add(port);
    }
    g.add(brassCollar, silkDisc);

    parts.push(
      finalizeMicUltraPart(
        'mc-cardioid-rear-delay-mesh',
        67,
        '#b45309',
        g,
        new THREE.Vector3(14.2, 1.4, 4.2),
        new THREE.Vector3(23.8, 0.6, 27.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC68. Back-Volume Acoustic Bass-Tuning Micro-Vent Tube & Damping Felt Plug
  // =========================================================================
  {
    const g = new THREE.Group();
    // Coiled Helmholtz bass-tuning acoustic micro-duct tube with felt plug core
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 0.35, 0.8),
      new THREE.Vector3(-0.7, 0.45, -1.1),
      new THREE.Vector3(0.9, 0.1, -1.0),
      new THREE.Vector3(1.8, -0.25, 0.7),
    ]);
    const duct = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(curve, 26, 0.44, 14, false)),
      mats.stainlessMachined
    );
    const feltPlug = new THREE.Mesh(hiResCyl(0.88, 0.88, 0.68, 20), u.micAcousticFelt);
    feltPlug.position.set(-1.8, 0.35, 0.8);
    const brassNozzle = new THREE.Mesh(hiResCyl(0.56, 0.46, 0.65, 18), mats.brassGear);
    brassNozzle.position.set(1.8, -0.25, 0.7);
    g.add(duct, feltPlug, brassNozzle);

    parts.push(
      finalizeMicUltraPart(
        'mc-vent-tube-lfe-bass-port',
        68,
        '#64748b',
        g,
        new THREE.Vector3(0, 0.2, -12.5),
        new THREE.Vector3(48.0, -6.2, 36.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC69. Two-Stage Silicone Mass-Spring Inertial Vibration Isolator (AF Stepper Trap)
  // =========================================================================
  {
    const g = new THREE.Group();
    const topMount = new THREE.Mesh(hiResTorus(2.25, 0.24, 12, 28), u.micRubberBootBlack);
    topMount.rotation.x = Math.PI / 2;
    topMount.position.y = 0.66;
    // High-density inertial tungsten/brass tuned seismic mass ring between twin silicone bellows!
    const tunedMass = new THREE.Mesh(hiResTorus(2.1, 0.34, 14, 28), mats.brassGear);
    tunedMass.rotation.x = Math.PI / 2;
    const botMount = new THREE.Mesh(hiResTorus(2.25, 0.24, 12, 28), u.micRubberBootBlack);
    botMount.rotation.x = Math.PI / 2;
    botMount.position.y = -0.66;
    // 4 soft elastomer shear legs bridging both damper stages
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const leg = new THREE.Mesh(hiResCyl(0.22, 0.22, 1.32, 12), mats.damperElastomer);
      leg.position.set(Math.cos(a) * 2.18, 0, Math.sin(a) * 2.18);
      leg.userData.noEdges = true;
      g.add(leg);
    }
    g.add(topMount, tunedMass, botMount);

    parts.push(
      finalizeMicUltraPart(
        'mc-lens-af-stepper-vib-trap',
        69,
        '#475569',
        g,
        new THREE.Vector3(14.2, 0.4, -3.0),
        new THREE.Vector3(29.8, 23.6, -5.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC70. −10°C to +50°C Sensitivity Drift Compensation NTC Thermistor & LUT
  // =========================================================================
  {
    const g = new THREE.Group();
    const tongue = makeTexturedPlate(5.2, 3.2, 0.3, 0.55, mats.polyimideFpc, 0.03);
    // Precision 0201 NTC thermistor bead at sensing tip + copper thermal sense pad + LUT compensation IC
    const cuPad = new THREE.Mesh(hiResCyl(0.85, 0.85, 0.14, 20), mats.copperCoil);
    cuPad.position.set(-1.55, 0.22, 0);
    const ntcBead = new THREE.Mesh(hiResSphere(0.42, 14, 12), mats.cinnabarAnodized);
    ntcBead.position.set(-1.55, 0.48, 0);
    const lutIc = buildChipPackage({
      w: 1.95,
      d: 1.75,
      h: 0.48,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    lutIc.position.set(1.05, 0.42, 0);
    g.add(tongue, cuPad, ntcBead, lutIc);

    parts.push(
      finalizeMicUltraPart(
        'mc-thermal-drift-ntc-comp',
        70,
        '#ef4444',
        g,
        new THREE.Vector3(11.0, -3.2, -2.0),
        new THREE.Vector3(39.0, 15.2, -14.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC71. Dedicated Analog-Audio Star-Ground Copper Island & PCB Isolation Moat
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer green PCB surround separated by milled air-gap isolation moat!
    const moatFrame = makeHiResHorizPlate(
      createFrameShape(6.2, 5.2, 0.65, 4.6, 3.6, 0.45),
      0.44,
      u.batBmsPcb,
      0.04,
      2,
      20
    );
    // Isolated inner analog-ground copper hub with 6 radial star-ground spokes converging to 1 zero-loop node
    const starHub = new THREE.Mesh(hiResCyl(0.75, 0.75, 0.34, 22), mats.goldPlating);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const spoke = new THREE.Mesh(
        createChamferedBoxGeo(1.75, 0.18, 0.24, 0.04, 0.02, 'y'),
        mats.copperCoil
      );
      spoke.position.set(Math.cos(a) * 1.15, 0.06, Math.sin(a) * 1.15);
      spoke.rotation.y = -a;
      spoke.userData.noEdges = true;
      g.add(spoke);
    }
    // Single narrow ground bridge tying analog island cleanly to digital ground at exactly 1 point!
    const singleTie = new THREE.Mesh(
      createChamferedBoxGeo(0.55, 0.22, 1.15, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    singleTie.position.set(0, 0.06, 2.05);
    g.add(moatFrame, starHub, singleTie);

    parts.push(
      finalizeMicUltraPart(
        'mc-star-ground-audio-island',
        71,
        '#ea580c',
        g,
        new THREE.Vector3(0, -7.8, -1.5),
        new THREE.Vector3(40.0, -6.2, 19.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC72. Clickless Zero-Cross Anti-Pop Mute MOSFET & Soft-Ramp Audio Switch
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(5.2, 4.0, 0.42, 0.45, u.batBmsPcb, 0.04);
    // Dual back-to-back low-Rds(on) analog mute MOSFETs + zero-crossing detector die
    const fetL = buildChipPackage({
      w: 1.55,
      d: 1.55,
      h: 0.48,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      axis: 'y',
    });
    fetL.position.set(-1.25, 0.44, 0);
    const fetR = fetL.clone();
    fetR.position.set(1.25, 0.44, 0);
    const rampCap = buildSmdPassive(1.2, 0.65, 0.5, mats.smdCeramic, mats.silverElectrode, 'y');
    rampCap.position.set(0, 0.46, 1.18);
    g.add(pcb, fetL, fetR, rampCap);

    parts.push(
      finalizeMicUltraPart(
        'mc-zero-cross-pop-mute-fet',
        72,
        '#14b8a6',
        g,
        new THREE.Vector3(8.0, -7.8, 3.5),
        new THREE.Vector3(34.0, -10.2, -7.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC73. External 3.5 mm Plug-In-Power 2.8 V Current-Limited Bias Injector
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(5.6, 4.2, 0.44, 0.5, u.batBmsPcb, 0.04);
    // Dual precision 2.2 kΩ PIP bias resistors (L/R), current-limit switch IC, & DC-blocking coupling caps
    const limIc = buildChipPackage({
      w: 1.85,
      d: 1.85,
      h: 0.52,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      pin1Mat: mats.cinnabarAnodized,
      axis: 'y',
    });
    limIc.position.set(-1.35, 0.46, 0);
    for (const sz of [-0.92, 0.92]) {
      const rBias = buildSmdPassive(1.35, 0.62, 0.42, mats.matteBlackAnodized, mats.goldPlating, 'y');
      rBias.position.set(0.65, 0.42, sz);
      const cBlock = new THREE.Mesh(hiResCyl(0.52, 0.52, 0.72, 16), mats.cinnabarAnodized);
      cBlock.position.set(1.95, 0.58, sz);
      g.add(rBias, cBlock);
    }
    g.add(pcb, limIc);

    parts.push(
      finalizeMicUltraPart(
        'mc-pip-28v-current-limit',
        73,
        '#dc2626',
        g,
        new THREE.Vector3(-16.0, -2.0, 2.0),
        new THREE.Vector3(-24.0, -16.0, -30.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC74. 3.5 mm Jack Mechanical Insertion-Detect Gold Leaf Switch & Auto-Route Mux
  // =========================================================================
  {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 1.35, 3.6, 0.3, 0.08, 'y'),
      u.batPolycarbonateShell
    );
    // Cantilevered phosphor-bronze gold leaf switch arm flexed by incoming TRS plug tip!
    const leafCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.1, 0.85, -0.7),
      new THREE.Vector3(-0.3, 1.15, -0.2),
      new THREE.Vector3(1.1, 0.92, 0.35),
      new THREE.Vector3(2.0, 1.25, 0.55),
    ]);
    const leafSpring = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(leafCurve, 20, 0.16, 8, false)),
      mats.goldPlating
    );
    // Red insulated mechanical lift actuator plunger
    const plunger = new THREE.Mesh(hiResCyl(0.38, 0.44, 0.85, 16), mats.cinnabarAnodized);
    plunger.position.set(0.2, 0.86, 0.75);
    const fixedContact = new THREE.Mesh(
      createChamferedBoxGeo(0.75, 0.34, 0.75, 0.06, 0.02, 'y'),
      mats.silverElectrode
    );
    fixedContact.position.set(1.95, 0.85, 0.55);
    g.add(body, leafSpring, plunger, fixedContact);

    parts.push(
      finalizeMicUltraPart(
        'mc-35mm-plug-detect-switch',
        74,
        '#f43f5e',
        g,
        new THREE.Vector3(-18.0, 2.5, 2.8),
        new THREE.Vector3(-26.0, -0.5, -30.8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC75. MI-Shoe 4ch 24-bit Digital Audio Bus & XLR-K3M +48 V Phantom Interface
  // =========================================================================
  {
    const g = new THREE.Group();
    const board = makeTexturedPlate(6.4, 4.6, 0.5, 0.55, u.batBmsPcb, 0.05);
    // Isolated +48 V boost toroid coil + gold 21-pin MI-Shoe digital audio pin-bar!
    const boostCoil = new THREE.Mesh(hiResTorus(1.12, 0.36, 12, 24), mats.copperCoil);
    boostCoil.rotation.x = Math.PI / 2;
    boostCoil.position.set(-1.45, 0.62, 0);
    const core = new THREE.Mesh(hiResCyl(0.68, 0.68, 0.72, 18), mats.matteBlackAnodized);
    core.position.set(-1.45, 0.62, 0);
    const xlrIf = buildChipPackage({
      w: 2.15,
      d: 2.35,
      h: 0.56,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    xlrIf.position.set(1.25, 0.52, -0.35);
    // Gold multi-pin MI-Shoe digital audio finger strip along rear edge
    for (let i = 0; i < 8; i++) {
      const pin = new THREE.Mesh(createChamferedBoxGeo(0.42, 0.16, 0.88, 0.03, 0.01, 'y'), mats.goldPlating);
      pin.position.set(-2.1 + i * 0.6, 0.36, 1.65);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    g.add(board, boostCoil, core, xlrIf);

    parts.push(
      finalizeMicUltraPart(
        'mc-xlr-k3m-48v-phantom-if',
        75,
        '#eab308',
        g,
        new THREE.Vector3(16.5, -1.0, -3.0),
        new THREE.Vector3(21.5, 3.0, -27.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC76. <1 ps Ultra-Low-Jitter 24.576 MHz Audio Master Quartz PLL & Lip-Sync Lock
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(5.8, 4.4, 0.44, 0.5, u.micAudioDsp32Float, 0.05);
    // Hermetic ceramic seam-welded gold-lid 24.576 MHz AT-cut quartz oscillator can!
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(2.55, 0.52, 1.95, 0.14, 0.04, 'y'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(-1.18, 0.48, 0);
    const xtalLid = new THREE.Mesh(
      createChamferedBoxGeo(2.38, 0.18, 1.78, 0.1, 0.03, 'y'),
      mats.goldPlating
    );
    xtalLid.position.set(-1.18, 0.82, 0);
    // Fractional-N Video-Frame Lip-Sync PLL Synthesizer IC
    const pllIc = buildChipPackage({
      w: 2.05,
      d: 2.05,
      h: 0.54,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.micAudioDsp32Float,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    pllIc.position.set(1.42, 0.52, 0);
    g.add(pcb, xtalBase, xtalLid, pllIc);

    parts.push(
      finalizeMicUltraPart(
        'mc-24576mhz-audio-pll-jitter',
        76,
        '#0ea5e9',
        g,
        new THREE.Vector3(-6.0, -10.8, -8.5),
        new THREE.Vector3(-14.0, -23.2, -25.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC77. SMPTE LTC Timecode Audio-Track Injection & Multi-Cam Genlock Frame Sync
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = makeTexturedPlate(5.8, 4.4, 0.44, 0.5, u.batBmsPcb, 0.05);
    const ltcIc = buildChipPackage({
      w: 2.6,
      d: 2.2,
      h: 0.56,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      pin1Mat: mats.cinnabarAnodized,
      axis: 'y',
    });
    ltcIc.position.set(-0.95, 0.52, 0);
    // 3D Manchester Bi-Phase square-wave timecode pulse ribbon embossed in gold!
    const wavePts = [
      new THREE.Vector3(0.85, 0.48, -1.25),
      new THREE.Vector3(0.85, 0.92, -0.75),
      new THREE.Vector3(1.55, 0.92, -0.25),
      new THREE.Vector3(1.55, 0.48, 0.25),
      new THREE.Vector3(2.25, 0.48, 0.75),
      new THREE.Vector3(2.25, 0.92, 1.25),
    ];
    const pulseWave = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wavePts), 24, 0.13, 8, false)),
      mats.goldPlating
    );
    pulseWave.userData.noEdges = true;
    g.add(pcb, ltcIc, pulseWave);

    parts.push(
      finalizeMicUltraPart(
        'mc-timecode-ltc-audio-sync',
        77,
        '#f59e0b',
        g,
        new THREE.Vector3(6.0, -10.8, -8.5),
        new THREE.Vector3(14.0, -23.2, -25.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC78. 3D Spatial Audio / First-Order Ambisonics (FOA W/X/Y/Z) Phase Matrix
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(6.0, 5.2, 0.46, 0.65, u.micAudioDsp32Float, 0.05);
    // 4-capsule tetrahedral Ambisonics acoustic sphere (W omnidirectional core + X/Y/Z orthogonal dipoles!)
    const wSphere = new THREE.Mesh(hiResSphere(0.72, 16, 14), mats.goldPlating);
    wSphere.position.set(0, 1.38, 0);
    const verts: Array<[number, number, number, THREE.Material]> = [
      [1.35, 0.75, 0.95, mats.vcWorkingFluidCyan],
      [-1.35, 0.75, 0.95, mats.cinnabarAnodized],
      [0, 0.75, -1.55, mats.siliconSensorDie],
      [0, 2.38, 0, mats.goldPlating],
    ];
    for (const [vx, vy, vz, mat] of verts) {
      const node = new THREE.Mesh(hiResSphere(0.38, 14, 10), mat);
      node.position.set(vx, vy, vz);
      const strut = buildGoldWirebondLoop(
        new THREE.Vector3(0, 1.38, 0),
        new THREE.Vector3(vx, vy, vz),
        0.04,
        0.07,
        mats.stainlessMachined
      );
      g.add(node, strut);
    }
    const eqRing = new THREE.Mesh(hiResTorus(1.85, 0.07, 8, 28), mats.vcWorkingFluidCyan);
    eqRing.rotation.x = Math.PI / 2;
    eqRing.position.y = 0.75;
    g.add(base, wSphere, eqRing);

    parts.push(
      finalizeMicUltraPart(
        'mc-spatial-ambisonics-matrix',
        78,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 3.0, -6.5),
        new THREE.Vector3(0, 17.0, -27.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC79. 5 ms Look-Ahead True-Peak Limiter & Dynamic Wind-Ducking Safety Net
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(6.0, 4.6, 0.46, 0.55, u.micAudioDsp32Float, 0.05);
    // Circular 5 ms look-ahead SRAM ring-buffer torus + ceiling limiter clamp bar!
    const ringBuf = new THREE.Mesh(hiResTorus(1.38, 0.28, 12, 28), mats.vcWorkingFluidCyan);
    ringBuf.rotation.x = Math.PI / 2;
    ringBuf.position.set(-0.95, 0.58, 0);
    const clampBar = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.62, 2.85, 0.1, 0.04, 'y'),
      mats.cinnabarAnodized
    );
    clampBar.position.set(1.52, 0.56, 0);
    const goldCap = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 0.16, 2.95, 0.08, 0.02, 'y'),
      mats.goldPlating
    );
    goldCap.position.set(1.52, 0.94, 0);
    g.add(base, ringBuf, clampBar, goldCap);

    parts.push(
      finalizeMicUltraPart(
        'mc-true-peak-lookahead-limiter',
        79,
        '#e11d48',
        g,
        new THREE.Vector3(-10.0, -10.8, -2.5),
        new THREE.Vector3(-8.0, -31.2, -13.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC80. Factory Anechoic-Chamber 1 kHz / 94 dB SPL Sensitivity & Phase Cal OTP
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = makeTexturedPlate(6.0, 4.6, 0.46, 0.55, u.batBmsPcb, 0.05);
    // Gold-shielded Factory OTP Calibration EEPROM + miniature 3x3 black anechoic pyramid acoustic wedge block!
    const otpDie = buildChipPackage({
      w: 2.35,
      d: 2.35,
      h: 0.52,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      topAccentMat: mats.goldPlating,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    otpDie.position.set(-1.35, 0.5, 0);
    // 3x3 miniature anechoic-chamber pyramid cones symbolizing 94 dB SPL @ 1 kHz acoustic calibration!
    const coneGeo = hiResCyl(0.03, 0.34, 0.68, 4);
    const wedges = new THREE.InstancedMesh(coneGeo, mats.matteBlackAnodized, 9);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        dm.position.set(1.45 + ix * 0.64, 0.6, iz * 0.64);
        dm.rotation.set(0, Math.PI / 4, 0);
        dm.updateMatrix();
        wedges.setMatrixAt(idx++, dm.matrix);
      }
    }
    wedges.instanceMatrix.needsUpdate = true;
    wedges.userData.noEdges = true;
    g.add(base, otpDie, wedges);

    parts.push(
      finalizeMicUltraPart(
        'mc-factory-anechoic-cal-otp',
        80,
        '#475569',
        g,
        new THREE.Vector3(10.0, -10.8, -2.5),
        new THREE.Vector3(8.0, -31.2, -13.5),
        cp,
        0.18
      )
    );
  }

  return parts;
}
