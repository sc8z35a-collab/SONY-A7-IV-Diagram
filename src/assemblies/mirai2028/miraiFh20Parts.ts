import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import { createFrameShape, createRoundedRectShape } from '../../engine/CadHelpers';
import {
  createChamferedBoxGeo,
  hiResCyl,
  hiResSphere,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import {
  createTerracedWaferShape,
  finalizeMiraiPart,
  InstanceTransform,
  makeHorizCncPlate,
  makeMiraiInstanced,
} from './miraiShared';

/**
 * FH20 — 2nm/A16 GAA + BSPDN Heterogeneous Chiplet "1,000 TOPS Camera AI Brain SoC"
 * Co-integrates FH23 (1.58-bit VWM NPU Tile), FH39 (PQC+PUF Root-of-Trust Enclave),
 * and FH21 (MicroLED/SiPh Parallel Optical I/O Fiber Interconnect) on a 42×42×6.4 mm
 * 2.5D CoWoS-L RDL Interposer Package.
 *
 * 18 Watchmaker-Grade Explodable 3D CAD Parts (`miraiSubView = 6`, order 87..104).
 * Zero direct `new THREE.Mesh*Material` allocations; max 3 InstancedMeshes (`+5 dc` total!).
 */
export function buildMiraiFh20Parts(
  mats: V2MaterialLibrary,
  clippingPlanes?: THREE.Plane[]
): CadPart[] {
  const cp = clippingPlanes ?? [];
  const parts: CadPart[] = [];

  // =========================================================================
  // FH20-01 (87): Cutaway Nickel-Plated Copper IHS Heat Spreader Lid
  // =========================================================================
  {
    const g = new THREE.Group();
    // Terraced cutaway top plate exposing front-right chiplets, BSPDN & optical fibers at 0% Assembled!
    const topLid = makeHorizCncPlate(
      createTerracedWaferShape(40.2, 40.2, 2.2, -2.5, -2.5),
      0.95,
      mats.emiShieldCan,
      { bevel: 0.14, bevelSegs: 2, curveSegs: 20 }
    );
    topLid.position.y = 0.25;
    g.add(topLid);

    // Outer stepped mounting skirt along back (-Z) & left (-X) edges seating onto stiffener ring
    const backSkirt = new THREE.Mesh(
      createChamferedBoxGeo(38.4, 1.35, 1.6, 0.3, 0.08, 'y'),
      mats.welcomeTitaniumFace
    );
    backSkirt.position.set(0, -0.65, -19.2);
    g.add(backSkirt);

    const leftSkirt = new THREE.Mesh(
      createChamferedBoxGeo(1.6, 1.35, 38.4, 0.3, 0.08, 'y'),
      mats.welcomeTitaniumFace
    );
    leftSkirt.position.set(-19.2, -0.65, 0);
    g.add(leftSkirt);

    // Signature MIRAI 2028 emerald & titanium top spec badge bar
    const emeraldBar = new THREE.Mesh(
      createChamferedBoxGeo(16.0, 0.18, 2.2, 0.35, 0.04, 'y'),
      mats.mofEmerald
    );
    emeraldBar.position.set(-9.5, 0.80, -13.5);
    g.add(emeraldBar);

    const goldPin1 = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 0.16, 2.6, 0.25, 0.04, 'y'),
      mats.goldPlating
    );
    goldPin1.rotation.y = Math.PI / 4;
    goldPin1.position.set(-16.8, 0.78, 16.8);
    g.add(goldPin1);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-cutaway-ihs-lid',
        6,
        87,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 2.65, 0),
        new THREE.Vector3(0, 44.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH20-02 (88): Indium / Liquid-Metal TIM Interface Pads & Silicone Dam Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cutaway TIM pad layout: full liquid-metal pads under covered IHS zone (HBM-A/B, VWM & upper-left NPU corner)
    // while leaving the front-right 2nm/A16 GAA NPU floorplan ("BIONZ MIRAI · 1000 TOPS") unobstructed at 0% Assembled!
    const padCoords: ReadonlyArray<readonly [number, number, number, number]> = [
      [-9.0, -6.2, 5.2, 5.2],   // NPU upper-left covered quadrant (cutaway reveal on front-right!)
      [-6.2, -13.6, 10.6, 6.0], // HBM-A
      [6.8, -13.6, 10.6, 6.0],  // HBM-B
      [-12.0, 8.6, 9.0, 6.8],   // VWM tile
    ];
    for (const [px, pz, pw, pd] of padCoords) {
      const pad = new THREE.Mesh(
        createChamferedBoxGeo(pw, 0.22, pd, 0.45, 0.04, 'y'),
        mats.solderBallSilver
      );
      pad.position.set(px, 0, pz);
      g.add(pad);
    }

    // Perimeter containment silicone dam preventing liquid-metal bleed into MLCCs
    const dam = makeHorizCncPlate(
      createFrameShape(35.8, 35.8, 1.8, 33.4, 33.4, 1.4),
      0.34,
      mats.epdmGasket,
      { bevel: 0.04, bevelSegs: 1, curveSegs: 16 }
    );
    dam.position.y = -0.08;
    g.add(dam);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-liquid-metal-tim',
        6,
        88,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 2.12, 0),
        new THREE.Vector3(0, 36.0, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH20-03 (89): CORE #1 — 2nm/A16 GAA Nanosheet 1,000 TOPS NPU Compute Die
  // =========================================================================
  {
    const g = new THREE.Group();
    const dieBody = makeHorizCncPlate(
      createRoundedRectShape(13.6, 13.6, 0.45),
      0.66,
      mats.siliconLogicLayer,
      { bevel: 0.06, bevelSegs: 2, curveSegs: 14 }
    );
    g.add(dieBody);

    // High-DPI 1024px 2nm GAA systolic tensor floorplan top face
    const face = makeHorizCncPlate(
      createRoundedRectShape(13.2, 13.2, 0.35),
      0.10,
      mats.fh20ChipletDieMap,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 12, planarUv: { w: 13.2, h: 13.2 } }
    );
    face.position.y = 0.36;
    face.userData.noEdges = true;
    g.add(face);

    // Perimeter gold UCIe seal ring
    const ring = makeHorizCncPlate(
      createFrameShape(13.85, 13.85, 0.5, 13.1, 13.1, 0.35),
      0.16,
      mats.goldPlating,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 12 }
    );
    ring.position.y = 0.24;
    g.add(ring);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-gaa-npu-die',
        6,
        89,
        '#38bdf8',
        g,
        new THREE.Vector3(-5.2, 1.56, -2.5),
        new THREE.Vector3(-6.0, 29.0, -4.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH20-04 (90): CORE #2 — BSPDN (Backside Power Delivery Network) Pure Copper Rail Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    const railBase = makeHorizCncPlate(
      createRoundedRectShape(14.0, 14.0, 0.45),
      0.34,
      mats.copperHybridBond,
      { bevel: 0.05, bevelSegs: 1, curveSegs: 14 }
    );
    g.add(railBase);

    const railFace = makeHorizCncPlate(
      createRoundedRectShape(13.6, 13.6, 0.35),
      0.08,
      mats.fh20BspdnRailMap,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 12, planarUv: { w: 13.6, h: 13.6 } }
    );
    railFace.position.y = 0.19;
    railFace.userData.noEdges = true;
    g.add(railFace);

    // 4 heavy gold-copper backside VDD/VSS busbar feeder tabs along edges
    for (const sx of [-7.1, 7.1]) {
      const bus = new THREE.Mesh(
        createChamferedBoxGeo(0.55, 0.26, 10.6, 0.12, 0.04, 'y'),
        mats.goldPlating
      );
      bus.position.set(sx, 0, 0);
      g.add(bus);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-bspdn-power-rails',
        6,
        90,
        '#d97706',
        g,
        new THREE.Vector3(-5.2, 1.00, -2.5),
        new THREE.Vector3(-6.0, 20.0, -4.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH20-05 (91): FH23 Synergy — 1.58-bit Ternary Visual World Model (VWM) NPU Tile
  // =========================================================================
  {
    const g = new THREE.Group();
    const die = makeHorizCncPlate(
      createRoundedRectShape(9.8, 7.6, 0.4),
      0.66,
      mats.bionzCetusDie,
      { bevel: 0.06, bevelSegs: 2, curveSegs: 14 }
    );
    g.add(die);

    // BitNet {-1, 0, +1} ternary adder macro islands + lightweight 120fps tracker sub-block
    for (let i = 0; i < 3; i++) {
      const island = new THREE.Mesh(
        createChamferedBoxGeo(2.3, 0.12, 5.4, 0.2, 0.03, 'y'),
        i === 2 ? mats.mofEmerald : mats.siliconSensorDie
      );
      island.position.set(-2.9 + i * 2.9, 0.36, 0);
      g.add(island);
    }

    const goldRing = makeHorizCncPlate(
      createFrameShape(10.0, 7.8, 0.45, 9.2, 7.0, 0.3),
      0.14,
      mats.goldPlating,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 12 }
    );
    goldRing.position.y = 0.22;
    g.add(goldRing);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-vwm-ternary-tile',
        6,
        91,
        '#8b5cf6',
        g,
        new THREE.Vector3(-11.8, 1.44, 8.6),
        new THREE.Vector3(-18.0, 27.0, 12.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH20-06 (92): Mature 5nm/7nm 8K/12K RAW ISP, Codec & Sensor I/O Chiplet
  // =========================================================================
  {
    const g = new THREE.Group();
    const die = makeHorizCncPlate(
      createRoundedRectShape(10.2, 12.8, 0.45),
      0.66,
      mats.ispSiliconDie,
      { bevel: 0.06, bevelSegs: 2, curveSegs: 14 }
    );
    g.add(die);

    // Distinct ISP demosaic pipeline & dual ProRes/RAW hardware codec macro blocks
    const ispBlock = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 0.12, 5.2, 0.25, 0.03, 'y'),
      mats.bionzIpDieTile
    );
    ispBlock.position.set(0, 0.36, -2.6);
    g.add(ispBlock);

    const codecBlock = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 0.12, 4.4, 0.25, 0.03, 'y'),
      mats.copperHybridBond
    );
    codecBlock.position.set(0, 0.36, 3.0);
    g.add(codecBlock);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-isp-video-chiplet',
        6,
        92,
        '#0ea5e9',
        g,
        new THREE.Vector3(7.6, 1.44, -3.0),
        new THREE.Vector3(14.0, 28.0, -6.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH20-07 (93): FH39 Synergy — PQC (ML-DSA) + PUF Hardware Root-of-Trust Enclave
  // =========================================================================
  {
    const g = new THREE.Group();
    const die = makeHorizCncPlate(
      createRoundedRectShape(6.4, 6.4, 0.35),
      0.60,
      mats.siliconBulk,
      { bevel: 0.05, bevelSegs: 1, curveSegs: 12 }
    );
    g.add(die);

    // Gold Faraday anti-tamper security mesh frame + emerald C2PA authenticity crest
    const shield = makeHorizCncPlate(
      createFrameShape(6.6, 6.6, 0.4, 4.4, 4.4, 0.25),
      0.16,
      mats.goldPlating,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 12 }
    );
    shield.position.y = 0.34;
    g.add(shield);

    const pufCore = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.14, 3.6, 0.25, 0.03, 'y'),
      mats.mofEmerald
    );
    pufCore.position.y = 0.34;
    g.add(pufCore);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-pqc-puf-enclave',
        6,
        93,
        '#10b981',
        g,
        new THREE.Vector3(-2.0, 1.42, 9.2),
        new THREE.Vector3(-4.0, 24.0, 18.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH20-08 & FH20-09 (94, 95): Dual 4-High Stacked LPDDR6 / HBM Wide-I/O Memory Cubes
  // =========================================================================
  const buildHbmCube = (
    id: string,
    order: number,
    assembledPos: THREE.Vector3,
    explodeOffset: THREE.Vector3
  ) => {
    const g = new THREE.Group();
    // Base buffer logic die
    const baseDie = makeHorizCncPlate(
      createRoundedRectShape(11.4, 6.8, 0.35),
      0.24,
      mats.siliconDramLayer,
      { bevel: 0.04, bevelSegs: 1, curveSegs: 12 }
    );
    baseDie.position.y = -0.34;
    g.add(baseDie);

    // 4 stepped ultra-thin DRAM wafers with gleaming gold TSV inter-layer seams
    for (let layer = 0; layer < 4; layer++) {
      const ySeam = -0.18 + layer * 0.20;
      const seam = new THREE.Mesh(
        createChamferedBoxGeo(10.8, 0.05, 6.2, 0.2, 0.01, 'y'),
        mats.goldPlating
      );
      seam.position.y = ySeam;
      g.add(seam);

      const dram = makeHorizCncPlate(
        createRoundedRectShape(11.1 - layer * 0.08, 6.5 - layer * 0.06, 0.3),
        0.14,
        layer % 2 === 0 ? mats.siliconTsvDram : mats.siliconBulk,
        { bevel: 0.02, bevelSegs: 1, curveSegs: 12 }
      );
      dram.position.y = ySeam + 0.09;
      g.add(dram);
    }

    parts.push(
      finalizeMiraiPart(id, 6, order, '#2563eb', g, assembledPos, explodeOffset, cp, 0.22)
    );
  };

  buildHbmCube(
    'mirai-fh20-hbm-memory-stack-a',
    94,
    new THREE.Vector3(-6.2, 1.56, -13.6),
    new THREE.Vector3(-10.0, 24.0, -18.0)
  );
  buildHbmCube(
    'mirai-fh20-hbm-memory-stack-b',
    95,
    new THREE.Vector3(6.8, 1.56, -13.6),
    new THREE.Vector3(12.0, 24.0, -18.0)
  );

  // =========================================================================
  // FH20-10 (96): 6× Embedded UCIe 2.0 Local Silicon Interconnect (LSI) Bridges
  // =========================================================================
  {
    const g = new THREE.Group();
    const bridges: ReadonlyArray<readonly [number, number, number, number]> = [
      [1.9, -2.5, 2.8, 8.6],   // NPU <-> ISP
      [-5.6, -9.5, 7.6, 2.6],  // NPU <-> HBM-A
      [7.2, -9.5, 7.2, 2.6],   // ISP <-> HBM-B
      [-8.8, 4.4, 6.2, 2.4],   // NPU <-> VWM
      [-6.2, 8.8, 2.6, 4.4],   // VWM <-> PQC
      [10.2, 3.6, 5.6, 2.4],   // ISP <-> Optical I/O
    ];
    for (const [bx, bz, bw, bd] of bridges) {
      const si = new THREE.Mesh(
        createChamferedBoxGeo(bw, 0.20, bd, 0.18, 0.03, 'y'),
        mats.copperHybridBond
      );
      si.position.set(bx, 0, bz);
      g.add(si);

      const stripe = new THREE.Mesh(
        createChamferedBoxGeo(bw * 0.78, 0.06, bd * 0.78, 0.1, 0.01, 'y'),
        mats.goldPlating
      );
      stripe.position.set(bx, 0.12, bz);
      g.add(stripe);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-ucie-silicon-bridges',
        6,
        96,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0.72, 0),
        new THREE.Vector3(0, 13.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH20-11 (97): FH21 Synergy — MicroLED / SiPh Optical I/O Chiplet & 8-Lane Fiber Ribbon
  // =========================================================================
  {
    const g = new THREE.Group();
    const die = makeHorizCncPlate(
      createRoundedRectShape(8.2, 9.0, 0.4),
      0.66,
      mats.siliconPhotodiode,
      { bevel: 0.06, bevelSegs: 2, curveSegs: 14 }
    );
    g.add(die);

    // Optical grating coupler & MT ferrule alignment collar on +X edge
    const ferrule = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 0.96, 8.2, 0.25, 0.06, 'y'),
      mats.zifIvoryPlastic
    );
    ferrule.position.set(5.2, 0.08, 0);
    g.add(ferrule);

    // 8 parallel glowing cyan glass optical waveguides exiting +X
    for (let i = 0; i < 8; i++) {
      const z = -3.15 + i * 0.9;
      const fiber = new THREE.Mesh(hiResCyl(0.16, 0.16, 13.5, 10), mats.blue450Glow);
      fiber.rotation.z = Math.PI / 2;
      fiber.position.set(13.2, 0.08, z);
      fiber.userData.noEdges = true;
      g.add(fiber);
    }

    // Translucent ribbon jacket binding the 8 fibers cleanly
    const jacket = new THREE.Mesh(
      createChamferedBoxGeo(11.8, 0.44, 7.6, 0.2, 0.05, 'y'),
      mats.evfAntiFogGlass
    );
    jacket.position.set(12.6, 0.08, 0);
    g.add(jacket);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-optical-io-chiplet',
        6,
        97,
        '#06b6d4',
        g,
        new THREE.Vector3(10.8, 1.42, 7.6),
        new THREE.Vector3(24.0, 22.0, 10.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH20-12 (98): 2.5D Large-Area CoWoS-L Silicon/Organic RDL Interposer
  // =========================================================================
  {
    const g = new THREE.Group();
    const interposer = makeHorizCncPlate(
      createRoundedRectShape(34.6, 34.6, 1.2),
      0.46,
      mats.siliconLogicLayer,
      { bevel: 0.06, bevelSegs: 2, curveSegs: 16 }
    );
    g.add(interposer);

    // Fine copper RDL power/clock guard border
    const rdlBorder = makeHorizCncPlate(
      createFrameShape(34.0, 34.0, 1.0, 32.6, 32.6, 0.8),
      0.10,
      mats.copperHybridBond,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 14 }
    );
    rdlBorder.position.y = 0.26;
    g.add(rdlBorder);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-cowos-interposer',
        6,
        98,
        '#1d4ed8',
        g,
        new THREE.Vector3(0, 0.36, 0),
        new THREE.Vector3(0, 7.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH20-13 (99): 196× Fine-Pitch C4 Copper Micro-Pillar & TSV Interconnect Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const bumpGeo = hiResCyl(0.36, 0.36, 0.36, 10);
    const transforms: InstanceTransform[] = [];
    const n = 14;
    const span = 30.8;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        transforms.push({
          pos: [-span * 0.5 + (span * c) / (n - 1), 0, -span * 0.5 + (span * r) / (n - 1)],
        });
      }
    }
    g.add(makeMiraiInstanced(bumpGeo, mats.copperHybridBond, transforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-microbump-tsv-array',
        6,
        99,
        '#c26d38',
        g,
        new THREE.Vector3(0, -0.04, 0),
        new THREE.Vector3(0, 0.5, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH20-14 (100): 16-Layer Build-Up ABF Organic High-Density Package Substrate
  // =========================================================================
  {
    const g = new THREE.Group();
    const abf = makeHorizCncPlate(
      createRoundedRectShape(42.0, 42.0, 1.8),
      1.12,
      mats.abfSubstrate,
      { bevel: 0.10, bevelSegs: 2, curveSegs: 18 }
    );
    g.add(abf);

    // Copper ground core edge laminate band visible around perimeter
    const coreBand = makeHorizCncPlate(
      createFrameShape(42.12, 42.12, 1.85, 41.2, 41.2, 1.6),
      0.26,
      mats.copperHeatSpreader,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 16 }
    );
    g.add(coreBand);

    // Gold Pin-1 corner datum marker
    const pin1 = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 0.08, 2.8, 0.2, 0.02, 'y'),
      mats.goldPlating
    );
    pin1.rotation.y = Math.PI / 4;
    pin1.position.set(-18.2, 0.58, 18.2);
    g.add(pin1);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-abf-organic-substrate',
        6,
        100,
        '#065f46',
        g,
        new THREE.Vector3(0, -0.78, 0),
        new THREE.Vector3(0, -8.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH20-15 (101): 48× Perimeter 0201 SMD MLCC High-di/dt Decoupling Capacitor Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const capGeo = markHiRes(new THREE.BoxGeometry(1.45, 0.55, 0.78));
    const transforms: InstanceTransform[] = [];
    for (let i = 0; i < 12; i++) {
      const t = -15.4 + (30.8 * i) / 11;
      transforms.push({ pos: [t, 0, -18.8] });
      transforms.push({ pos: [t, 0, 18.8] });
      transforms.push({ pos: [-18.8, 0, t], rot: [0, Math.PI / 2, 0] });
      transforms.push({ pos: [18.8, 0, t], rot: [0, Math.PI / 2, 0] });
    }
    g.add(makeMiraiInstanced(capGeo, mats.smdCeramic, transforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-mlcc-decoupling-ring',
        6,
        101,
        '#b45309',
        g,
        new THREE.Vector3(0, 0.05, 0),
        new THREE.Vector3(0, -3.5, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH20-16 (102): CNC Stainless Anti-Warpage Stiffener Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    const frame = makeHorizCncPlate(
      createFrameShape(41.6, 41.6, 1.8, 35.6, 35.6, 1.3),
      0.85,
      mats.stainlessMachined,
      { bevel: 0.10, bevelSegs: 2, curveSegs: 18 }
    );
    g.add(frame);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-stiffener-ring',
        6,
        102,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0.76, 0),
        new THREE.Vector3(0, 17.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH20-17 (103): 256-Ball Lead-Free SAC305 Bottom BGA Solder Grid Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const ballGeo = hiResSphere(0.46, 10, 8);
    const transforms: InstanceTransform[] = [];
    const n = 16;
    const span = 37.5;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        transforms.push({
          pos: [-span * 0.5 + (span * c) / (n - 1), 0, -span * 0.5 + (span * r) / (n - 1)],
        });
      }
    }
    g.add(makeMiraiInstanced(ballGeo, mats.solderBallSilver, transforms, true));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-bga-solder-array',
        6,
        103,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, -1.62, 0),
        new THREE.Vector3(0, -17.5, 0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // FH20-18 (104): Camera-Side FH32-Link Copper Vapor Coldplate & Heat-Pipe Bridge
  // =========================================================================
  {
    const g = new THREE.Group();
    const tim = new THREE.Mesh(
      createChamferedBoxGeo(36.0, 0.42, 36.0, 1.2, 0.06, 'y'),
      mats.thermalPadPink
    );
    tim.position.y = 0.65;
    g.add(tim);

    const plate = makeHorizCncPlate(
      createRoundedRectShape(43.6, 43.6, 2.4),
      0.95,
      mats.vaporChamberCopper,
      { bevel: 0.12, bevelSegs: 2, curveSegs: 18 }
    );
    g.add(plate);

    // Dual flattened pure-copper heat pipes bridging leftward (-X) toward FH32 MEMS cooler
    for (const sz of [-10.0, 10.0]) {
      const pipe = new THREE.Mesh(
        createChamferedBoxGeo(16.0, 0.72, 4.4, 0.6, 0.12, 'y'),
        mats.copperHeatSpreader
      );
      pipe.position.set(-24.5, -0.08, sz);
      g.add(pipe);
    }

    // 4 stainless spring-loaded mounting corner ears
    for (const [ex, ez] of [
      [-19.5, -19.5],
      [19.5, -19.5],
      [-19.5, 19.5],
      [19.5, 19.5],
    ]) {
      const post = new THREE.Mesh(hiResCyl(1.4, 1.4, 1.3, 14), mats.welcomeTitaniumFace);
      post.position.set(ex, 0.12, ez);
      g.add(post);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh20-vapor-coldplate-base',
        6,
        104,
        '#ea580c',
        g,
        new THREE.Vector3(0, -2.55, 0),
        new THREE.Vector3(0, -28.0, 0),
        cp,
        0.24
      )
    );
  }

  return parts;
}
