import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyPlanarUVs,
  buildChipPackage,
  buildGoldWirebondLoop,
  buildShieldedInductor,
  buildSmdPassive,
  buildSpotWeldNuggets,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeBatteryUltra31Part(
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
    subsystem: 'battery',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

/**
 * Phase 31A — Standalone Camera Battery Pack 130-Part Ultra-Microscopic 2026 Frontier (+30 Parts: P101–P130).
 *
 * Every single sub-assembly sits strictly inside the genuine 1:1 mm NP-FZ100 shell interior when assembled
 * (|x| <= 13.5, y in [-19.0, +18.0], |z| <= 6.5, local radius <= 3.6 mm) so the assembled exterior stays 100% spotless,
 * and explodes cleanly with >= 25 mm clearance from all 129 other parts into 3 dedicated museum constellations:
 *  - P101–P110 (Outer-Right Dual Column): 2026 Solid-State Argyrodite, Ag-C Anode-Free, LHCE, Self-Healing Binder & MIT Grain-Boundary Physics
 *  - P111–P120 (Outer-Left Dual Column): 2026 Embedded FBG Optical Fiber, Ultrasonic Phased-Array CT, AE Crack Mic, GB 38031-2025 Gas MEMS & AC Self-Heating
 *  - P121–P130 (Lower Architectural Gallery): 2026 EKF Digital-Twin DSP, Edge-AI SOH, Dual AFE, PCM Thermal Sponge, PUF Silicon Fingerprint & Direct Recycling
 */
export function buildBatteryUltra31Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // GROUP 1 (P101–P110): 2026 SOLID-STATE ELECTROLYTE & ATOMIC INTERPHASE
  // =========================================================================

  // P101. 2026 Li6PS5Cl Sulfide Argyrodite Solid Electrolyte Cubic Lattice
  {
    const g = new THREE.Group();
    const slabGeo = createChamferedBoxGeo(5.6, 6.8, 0.56, 0.42, 0.06, 'z');
    applyPlanarUVs(slabGeo, 5.6, 6.8, 'xy');
    g.add(new THREE.Mesh(slabGeo, u.batSulfideArgyrodite));

    // Cubic F-43m PS4 tetrahedra cages + glowing cyan Li+ hopping spheres
    for (const [cx, cy] of [
      [-1.55, 1.75],
      [1.55, 1.75],
      [0, 0],
      [-1.55, -1.75],
      [1.55, -1.75],
    ]) {
      const cage = new THREE.Mesh(hiResTorus(0.72, 0.11, 10, 18), mats.ceramicAlumina);
      cage.position.set(cx, cy, 0.42);
      cage.userData.noEdges = true;
      const ps4Core = new THREE.Mesh(hiResSphere(0.28, 12, 10), mats.goldPlating);
      ps4Core.position.set(cx, cy, 0.48);
      ps4Core.userData.noEdges = true;
      const liIon = new THREE.Mesh(hiResSphere(0.18, 10, 8), mats.cfaBlue);
      liIon.position.set(cx + 0.54, cy + 0.36, 0.62);
      liIon.userData.noEdges = true;
      g.add(cage, ps4Core, liIon);
    }
    // Ionic conduction rails linking cages (1-5 mS/cm superionic highway)
    for (const ry of [-1.75, 0, 1.75]) {
      const rail = new THREE.Mesh(hiResCyl(0.08, 0.08, 4.4, 10), mats.evfDichroicMirror);
      rail.rotation.z = Math.PI / 2;
      rail.position.set(0, ry, 0.36);
      rail.userData.noEdges = true;
      g.add(rail);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-argyrodite-li6ps5cl-2026',
        101,
        '#0ea5e9',
        g,
        new THREE.Vector3(8.8, 10.5, 2.2),
        new THREE.Vector3(184, 56, 36),
        cp,
        0.18
      )
    );
  }

  // P102. 2026 Anode-Free All-Solid-State Ag-C Lithiophilic Nanocomposite Interlayer
  {
    const g = new THREE.Group();
    const cuFoil = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 6.4, 0.32, 0.35, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    cuFoil.position.z = -0.26;
    const agcMatrixGeo = createChamferedBoxGeo(5.4, 6.0, 0.36, 0.3, 0.04, 'z');
    applyPlanarUVs(agcMatrixGeo, 5.4, 6.0, 'xy');
    const agcMatrix = new THREE.Mesh(agcMatrixGeo, u.batElectrodeCoating);
    agcMatrix.position.z = 0.08;
    // Uniform mirror-smooth plated Li-metal layer on top + shimmering Ag seed nanoparticles
    const liSheet = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 5.2, 0.24, 0.28, 0.04, 'z'),
      mats.silverElectrode
    );
    liSheet.position.z = 0.42;
    g.add(cuFoil, agcMatrix, liSheet);

    for (let i = 0; i < 9; i++) {
      const ix = ((i % 3) - 1) * 1.45;
      const iy = (Math.floor(i / 3) - 1) * 1.6;
      const agSeed = new THREE.Mesh(hiResSphere(0.24, 12, 10), mats.solderBallSilver);
      agSeed.position.set(ix, iy, 0.62);
      agSeed.userData.noEdges = true;
      g.add(agSeed);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-ag-c-anodefree-interlayer',
        102,
        '#e2e8f0',
        g,
        new THREE.Vector3(9.4, 6.0, 2.6),
        new THREE.Vector3(190, 28, 56),
        cp,
        0.18
      )
    );
  }

  // P103. 2026 LHCE Localized High-Concentration Fluorinated Ether (TTE) Electrolyte
  {
    const g = new THREE.Group();
    const cellWindow = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 6.2, 0.62, 0.48, 0.06, 'z'),
      mats.coverGlass
    );
    g.add(cellWindow);

    // 4 dense LiFSI solvation clusters floating inside low-viscosity TTE fluorinated ether bath
    const clusters: Array<[number, number]> = [
      [-1.35, 1.45],
      [1.35, 1.45],
      [-1.35, -1.45],
      [1.35, -1.45],
    ];
    for (const [cx, cy] of clusters) {
      const liCore = new THREE.Mesh(hiResSphere(0.32, 12, 10), mats.cfaBlue);
      liCore.position.set(cx, cy, 0.12);
      liCore.userData.noEdges = true;
      g.add(liCore);
      for (let k = 0; k < 4; k++) {
        const a = (Math.PI / 2) * k + 0.35;
        const fsi = new THREE.Mesh(hiResSphere(0.18, 10, 8), mats.cfaGreen);
        fsi.position.set(cx + Math.cos(a) * 0.56, cy + Math.sin(a) * 0.56, 0.18);
        fsi.userData.noEdges = true;
        g.add(fsi);
      }
      const halo = new THREE.Mesh(hiResTorus(0.84, 0.07, 8, 18), mats.evfDichroicMirror);
      halo.position.set(cx, cy, 0.12);
      halo.userData.noEdges = true;
      g.add(halo);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-lhce-fluorinated-ether',
        103,
        '#14b8a6',
        g,
        new THREE.Vector3(10.0, 0.5, 2.0),
        new THREE.Vector3(192, 0, 22),
        cp,
        0.16
      )
    );
  }

  // P104. 2026 Supramolecular Self-Healing Dynamic-Crosslink Si Binder (Si@BF)
  {
    const g = new THREE.Group();
    const plate = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 6.2, 0.42, 0.36, 0.05, 'z'),
      u.batSiCNanoScaffold
    );
    g.add(plate);

    // Expanding silicon spheres held together by elastic reversible hydrogen-bond polymer springs
    const nodes: Array<[number, number]> = [
      [-1.4, 1.5],
      [1.4, 1.5],
      [0, 0],
      [-1.4, -1.5],
      [1.4, -1.5],
    ];
    for (const [nx, ny] of nodes) {
      const siBall = new THREE.Mesh(hiResSphere(0.62, 16, 12), mats.goldPlating);
      siBall.position.set(nx, ny, 0.52);
      siBall.userData.noEdges = true;
      const healCoat = new THREE.Mesh(hiResTorus(0.76, 0.1, 10, 18), mats.thermalPadPink);
      healCoat.position.set(nx, ny, 0.52);
      healCoat.userData.noEdges = true;
      g.add(siBall, healCoat);
    }
    // Dynamic supramolecular cross-links snapping across crack lines
    for (const ang of [0.78, -0.78]) {
      const bond = new THREE.Mesh(hiResCyl(0.11, 0.11, 4.1, 10), mats.thermalPadPink);
      bond.rotation.z = ang;
      bond.position.set(0, 0, 0.58);
      bond.userData.noEdges = true;
      g.add(bond);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-supramolecular-selfheal-binder',
        104,
        '#f43f5e',
        g,
        new THREE.Vector3(9.4, -5.2, 2.4),
        new THREE.Vector3(188, -28, 54),
        cp,
        0.18
      )
    );
  }

  // P105. 2026 MIT Grain-Boundary Dendrite Nucleation Passivation Barrier
  {
    const g = new THREE.Group();
    // Two tilted ceramic electrolyte grains meeting at a vulnerable grain boundary seam sealed by golden passivation
    const leftGrain = new THREE.Mesh(
      createChamferedBoxGeo(2.55, 6.2, 0.66, 0.25, 0.06, 'z'),
      mats.ceramicAlumina
    );
    leftGrain.position.set(-1.42, 0, 0);
    const rightGrain = new THREE.Mesh(
      createChamferedBoxGeo(2.55, 6.2, 0.66, 0.25, 0.06, 'z'),
      mats.ceramicAlumina
    );
    rightGrain.position.set(1.42, 0, 0);

    // Passivation seal wedge plugging the MIT-identified 2-grain junction crack
    const seamSeal = new THREE.Mesh(
      createChamferedBoxGeo(0.54, 6.3, 0.84, 0.12, 0.04, 'z'),
      mats.goldPlating
    );
    seamSeal.position.set(0, 0, 0.06);

    // Deflected lithium dendrite needle stopped cleanly at the passivated grain junction
    const stoppedNeedle = new THREE.Mesh(hiResCyl(0.08, 0.28, 2.2, 12), mats.evfIrEmitter);
    stoppedNeedle.position.set(0, -1.8, 0.62);
    stoppedNeedle.userData.noEdges = true;
    const shieldCap = new THREE.Mesh(hiResTorus(0.66, 0.12, 10, 18), mats.cfaGreen);
    shieldCap.position.set(0, -0.4, 0.66);
    shieldCap.userData.noEdges = true;

    g.add(leftGrain, rightGrain, seamSeal, stoppedNeedle, shieldCap);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-gb-dendrite-grain-passiv',
        105,
        '#f59e0b',
        g,
        new THREE.Vector3(8.5, -10.8, 2.1),
        new THREE.Vector3(178, -58, 22),
        cp,
        0.2
      )
    );
  }

  // P106. 2026 CATL-Class Sodium-Lithium Hybrid Sub--40C Cold-Climate Cell Layer
  {
    const g = new THREE.Group();
    // Dual-chemistry sandwich: icy-blue Na+ cold-kinetics plate + emerald Li+ high-density plate
    const naLayer = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 3.0, 0.52, 0.34, 0.05, 'z'),
      mats.thermalPadBlue
    );
    naLayer.position.set(0, 1.65, 0);
    const liLayer = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 3.0, 0.52, 0.34, 0.05, 'z'),
      u.batSingleCrystalNmc
    );
    liLayer.position.set(0, -1.65, 0);
    const bridgeBar = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 0.56, 0.68, 0.16, 0.04, 'z'),
      mats.stainlessMachined
    );
    g.add(naLayer, liLayer, bridgeBar);

    // Larger Na+ spheres (top) & compact fast Li+ spheres (bottom)
    for (let i = -1; i <= 1; i++) {
      const naIon = new THREE.Mesh(hiResSphere(0.36, 12, 10), mats.cfaBlue);
      naIon.position.set(i * 1.55, 1.65, 0.48);
      naIon.userData.noEdges = true;
      const liIon = new THREE.Mesh(hiResSphere(0.24, 12, 10), mats.cfaGreen);
      liIon.position.set(i * 1.55, -1.65, 0.48);
      liIon.userData.noEdges = true;
      g.add(naIon, liIon);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-na-li-hybrid-cold-cell',
        106,
        '#38bdf8',
        g,
        new THREE.Vector3(8.8, 10.2, -2.4),
        new THREE.Vector3(182, 52, -26),
        cp,
        0.18
      )
    );
  }

  // P107. 2026 SWCNT / MWCNT 3D Multidimensional Conductive Carbon-Nanotube Web
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 6.2, 0.36, 0.34, 0.04, 'z'),
      mats.pyroGraphite
    );
    g.add(base);

    // Interwoven 3D nanotube struts wiring silicon active particles
    for (let i = -2; i <= 2; i++) {
      const hTube = new THREE.Mesh(hiResCyl(0.08, 0.08, 5.2, 10), mats.carbonFiberBlade);
      hTube.rotation.z = Math.PI / 2 + i * 0.12;
      hTube.position.set(0, i * 1.1, 0.36 + (i % 2) * 0.14);
      hTube.userData.noEdges = true;
      const vTube = new THREE.Mesh(hiResCyl(0.07, 0.07, 5.6, 10), mats.stainlessMachined);
      vTube.rotation.z = i * 0.1;
      vTube.position.set(i * 1.05, 0, 0.46);
      vTube.userData.noEdges = true;
      g.add(hTube, vTube);
    }
    for (const [px, py] of [
      [-1.3, 1.3],
      [1.3, 1.3],
      [0, 0],
      [-1.3, -1.3],
      [1.3, -1.3],
    ]) {
      const siNode = new THREE.Mesh(hiResSphere(0.38, 14, 10), mats.copperCoil);
      siNode.position.set(px, py, 0.52);
      siNode.userData.noEdges = true;
      g.add(siNode);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-swcnt-mwcnt-3d-web',
        107,
        '#475569',
        g,
        new THREE.Vector3(9.5, 4.8, -2.8),
        new THREE.Vector3(190, 22, -56),
        cp,
        0.2
      )
    );
  }

  // P108. Li+ Solvation-Sheath Desolvation Gate & Electron Tunneling Barrier
  {
    const g = new THREE.Group();
    // Slotted dielectric desolvation membrane separating bulky solvated Li+ from naked intercalating Li+
    const wall = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.72, 2.2, 0.18, 0.04, 'z'),
      mats.ceramicAlumina
    );
    g.add(wall);

    // Solvated Li+ + 4 solvent shells arriving on +Y side
    const solvCenter = new THREE.Mesh(hiResSphere(0.36, 14, 10), mats.cfaBlue);
    solvCenter.position.set(0, 1.85, 0);
    g.add(solvCenter);
    for (let k = 0; k < 4; k++) {
      const a = (Math.PI / 2) * k + Math.PI / 4;
      const shell = new THREE.Mesh(hiResSphere(0.24, 10, 8), mats.thermalPadBlue);
      shell.position.set(Math.cos(a) * 0.78, 1.85 + Math.sin(a) * 0.78, 0);
      shell.userData.noEdges = true;
      g.add(shell);
    }
    // Stripped naked Li+ slipping through central nano-gate into -Y electrode
    const gateRing = new THREE.Mesh(hiResTorus(0.52, 0.11, 10, 18), mats.goldPlating);
    gateRing.rotation.x = Math.PI / 2;
    gateRing.position.set(0, 0, 0);
    const nakedLi = new THREE.Mesh(hiResSphere(0.3, 14, 10), mats.cfaGreen);
    nakedLi.position.set(0, -1.65, 0);
    g.add(gateRing, nakedLi);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-solvation-sheath-tunnel',
        108,
        '#06b6d4',
        g,
        new THREE.Vector3(9.8, -1.5, -2.0),
        new THREE.Vector3(192, -12, -16),
        cp,
        0.18
      )
    );
  }

  // P109. 4.5 V High-Voltage Cathode Surface Spinel Reconstruction & O2 Lock
  {
    const g = new THREE.Group();
    const core = new THREE.Mesh(hiResSphere(2.05, 22, 18), u.batSingleCrystalNmc);
    // Protective epitaxial rock-salt/spinel shell cage locking lattice oxygen at 4.5V
    const cage1 = new THREE.Mesh(hiResTorus(2.26, 0.14, 12, 24), mats.goldPlating);
    const cage2 = new THREE.Mesh(hiResTorus(2.26, 0.14, 12, 24), mats.goldPlating);
    cage2.rotation.x = Math.PI / 2;
    const cage3 = new THREE.Mesh(hiResTorus(2.26, 0.14, 12, 24), mats.ceramicAlumina);
    cage3.rotation.y = Math.PI / 2;
    g.add(core, cage1, cage2, cage3);

    // Locked O2 oxygen anchor studs
    for (let k = 0; k < 6; k++) {
      const a = (Math.PI * 2 * k) / 6;
      const oAtom = new THREE.Mesh(hiResSphere(0.24, 10, 8), mats.cfaRed);
      oAtom.position.set(Math.cos(a) * 2.28, Math.sin(a) * 2.28, 0.45);
      oAtom.userData.noEdges = true;
      g.add(oAtom);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-hv-45v-cobalt-surface-spinel',
        109,
        '#8b5cf6',
        g,
        new THREE.Vector3(9.0, -7.8, -2.6),
        new THREE.Vector3(186, -42, -56),
        cp,
        0.18
      )
    );
  }

  // P110. Ceramic-PEO Flexible Hybrid Solid-Polymer Interfacial Ionic Bridge
  {
    const g = new THREE.Group();
    const polymerSheet = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 6.2, 0.44, 0.4, 0.05, 'z'),
      mats.polyimideFpc
    );
    g.add(polymerSheet);
    // Embedded ceramic LLZO micro-beads forming low-impedance contact cushions
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const bead = new THREE.Mesh(hiResSphere(0.42, 14, 10), mats.ceramicAlumina);
        bead.position.set(c * 1.55, r * 1.75, 0.32);
        bead.userData.noEdges = true;
        g.add(bead);
      }
    }
    // Wavy PEO ethylene-oxide ion-conducting chains
    for (const cy of [-1.75, 0, 1.75]) {
      const chain = new THREE.Mesh(hiResCyl(0.11, 0.11, 5.0, 10), mats.cfaGreen);
      chain.rotation.z = Math.PI / 2;
      chain.position.set(0, cy, 0.56);
      chain.userData.noEdges = true;
      g.add(chain);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-solid-polymer-peo-bridge',
        110,
        '#10b981',
        g,
        new THREE.Vector3(8.2, -13.5, -2.2),
        new THREE.Vector3(174, -74, -18),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // GROUP 2 (P111–P120): 2026 EMBEDDED FBG OPTICAL, ULTRASONIC CT, GAS MEMS & PULSE HEATING
  // =========================================================================

  // P111. 2026 Embedded 0.125 mm Fiber Bragg Grating (FBG) Optical Fiber Core Sensor
  {
    const g = new THREE.Group();
    const cardGeo = createChamferedBoxGeo(5.8, 6.4, 0.46, 0.36, 0.05, 'z');
    applyPlanarUVs(cardGeo, 5.8, 6.4, 'xy');
    g.add(new THREE.Mesh(cardGeo, u.batFiberBraggOptical));

    // Precision 0.125 mm silica optical fiber waveguide with UV-inscribed Bragg grating rings
    const fiber = new THREE.Mesh(hiResCyl(0.24, 0.24, 6.4, 16), mats.coverGlass);
    fiber.position.set(0, 0, 0.52);
    g.add(fiber);
    for (let i = -3; i <= 3; i++) {
      const notch = new THREE.Mesh(hiResTorus(0.32, 0.07, 10, 16), mats.evfDichroicMirror);
      notch.rotation.x = Math.PI / 2;
      notch.position.set(0, i * 0.68, 0.52);
      notch.userData.noEdges = true;
      g.add(notch);
    }
    const coupler = new THREE.Mesh(
      createChamferedBoxGeo(1.6, 1.1, 0.72, 0.16, 0.04, 'z'),
      mats.goldPlating
    );
    coupler.position.set(0, 2.75, 0.42);
    g.add(coupler);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-fbg-optical-fiber-sensor',
        111,
        '#38bdf8',
        g,
        new THREE.Vector3(-9.0, 10.5, 2.2),
        new THREE.Vector3(-168, 62, 42),
        cp,
        0.18
      )
    );
  }

  // P112. 2026 Ultrasonic Phased-Array "Battery CT" Internal Gas & SOH Scanner
  {
    const g = new THREE.Group();
    const board = new THREE.Mesh(
      createChamferedBoxGeo(6.0, 5.8, 0.48, 0.34, 0.05, 'z'),
      u.batFiberBraggOptical
    );
    g.add(board);

    // 8-element PZT ultrasonic phased-array transducer bar + acoustic coupling lens
    for (let i = 0; i < 8; i++) {
      const pzt = new THREE.Mesh(
        createChamferedBoxGeo(0.46, 3.4, 0.54, 0.06, 0.03, 'z'),
        mats.pztCeramic
      );
      pzt.position.set(-2.1 + i * 0.6, 0, 0.48);
      pzt.userData.noEdges = true;
      const topGold = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.2, 0.08), mats.goldPlating);
      topGold.position.set(-2.1 + i * 0.6, 0, 0.78);
      topGold.userData.noEdges = true;
      g.add(pzt, topGold);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-ultrasonic-phased-ct-2026',
        112,
        '#10b981',
        g,
        new THREE.Vector3(-9.6, 5.2, 2.6),
        new THREE.Vector3(-178, 30, 56),
        cp,
        0.18
      )
    );
  }

  // P113. Acoustic Emission (AE) Piezoelectric Micro-Crack & SEI Stethoscope
  {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(hiResCyl(2.25, 2.35, 1.05, 28), mats.stainlessMachined);
    housing.rotation.x = Math.PI / 2;
    const pztDisc = new THREE.Mesh(hiResCyl(1.72, 1.72, 0.42, 24), mats.pztCeramic);
    pztDisc.rotation.x = Math.PI / 2;
    pztDisc.position.z = 0.56;
    const wearPlate = new THREE.Mesh(hiResCyl(1.92, 1.92, 0.18, 24), mats.ceramicAlumina);
    wearPlate.rotation.x = Math.PI / 2;
    wearPlate.position.z = -0.58;
    const coaxPin = new THREE.Mesh(hiResCyl(0.32, 0.32, 1.1, 14), mats.goldPlating);
    coaxPin.rotation.x = Math.PI / 2;
    coaxPin.position.z = 0.96;
    g.add(housing, pztDisc, wearPlate, coaxPin);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-acoustic-emission-crack-mic',
        113,
        '#a855f7',
        g,
        new THREE.Vector3(-10.0, -0.5, 2.0),
        new THREE.Vector3(-182, -2, 16),
        cp,
        0.2
      )
    );
  }

  // P114. 2026 GB 38031-2025 H2 / CO / VOC Thermal-Runaway Early-Warning MEMS Chip
  {
    const g = new THREE.Group();
    const body = new THREE.Group();
    const pkg = buildChipPackage({
      w: 5.0,
      d: 5.0,
      h: 0.85,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      pin1Mat: mats.silverElectrode,
    });
    // Stainless sintered gas-inlet breather cap & glowing MOX micro-hotplate
    const capFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(3.6, 3.6, 0.4, 2.5, 2.5, 0.25), 0.34, 0.04, 0.04, 2, 16),
      mats.stainlessMachined
    );
    capFrame.rotation.x = -Math.PI / 2;
    capFrame.position.y = 0.44;
    const moxHeater = new THREE.Mesh(hiResCyl(0.82, 0.82, 0.12, 20), mats.evfIrEmitter);
    moxHeater.position.y = 0.54;
    moxHeater.userData.noEdges = true;
    body.add(pkg, capFrame, moxHeater);
    body.rotation.x = Math.PI / 2;
    g.add(body);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-h2-co-voc-offgas-mems',
        114,
        '#ef4444',
        g,
        new THREE.Vector3(-9.5, -6.0, 2.4),
        new THREE.Vector3(-178, -34, 54),
        cp,
        0.2
      )
    );
  }

  // P115. 2026 High-Frequency AC Pulse Internal Self-Heating Core (-40C -> 0C <30s)
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 5.8, 0.42, 0.34, 0.04, 'z'),
      u.batBmsPcb
    );
    g.add(pcb);
    // Dual GaN H-bridge pulse switches + toroidal resonant HF choke coil
    const coil = new THREE.Mesh(hiResTorus(1.45, 0.44, 14, 28), mats.copperCoil);
    coil.position.set(0, 0.35, 0.68);
    g.add(coil);
    for (const sx of [-1.65, 1.65]) {
      const fet = new THREE.Mesh(
        createChamferedBoxGeo(1.25, 1.25, 0.42, 0.1, 0.03, 'z'),
        u.icEpoxyLaser
      );
      fet.position.set(sx, -1.75, 0.42);
      fet.userData.noEdges = true;
      g.add(fet);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-ac-pulse-selfheat-core',
        115,
        '#f97316',
        g,
        new THREE.Vector3(-8.8, -12.0, 2.2),
        new THREE.Vector3(-166, -68, 34),
        cp,
        0.18
      )
    );
  }

  // P116. 2026 -40C Hybrid Supercapacitor (HPC) 120fps Burst Current Pulse Buffer
  {
    const g = new THREE.Group();
    // Twin miniature high-power cylindrical supercapacitor cans mounted on copper busbar saddle
    const saddle = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 2.2, 0.48, 0.25, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    saddle.position.set(0, -1.9, 0);
    g.add(saddle);
    for (const sx of [-1.38, 1.38]) {
      const can = new THREE.Mesh(hiResCyl(1.18, 1.18, 4.4, 24), mats.evfDichroicMirror);
      can.position.set(sx, 0.35, 0);
      const topVent = new THREE.Mesh(hiResCyl(1.06, 1.06, 0.18, 22), mats.stainlessMachined);
      topVent.position.set(sx, 2.62, 0);
      topVent.userData.noEdges = true;
      const pin = new THREE.Mesh(hiResCyl(0.22, 0.22, 0.72, 12), mats.goldPlating);
      pin.position.set(sx, 2.95, 0);
      pin.userData.noEdges = true;
      g.add(can, topVent, pin);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-hybrid-supercap-pulse-buf',
        116,
        '#22c55e',
        g,
        new THREE.Vector3(-9.0, 10.0, -2.4),
        new THREE.Vector3(-168, 58, -32),
        cp,
        0.18
      )
    );
  }

  // P117. Contactless Zero-Loss TMR / Hall-Effect Magnetic Flux Current Shunt
  {
    const g = new THREE.Group();
    // U-shaped high-current copper busbar surrounded by soft-iron C-core flux concentrator + TMR die
    const busbar = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 1.5, 0.62, 0.16, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    const yoke = new THREE.Mesh(hiResTorus(1.85, 0.36, 12, 24), mats.softIronYoke);
    yoke.rotation.y = Math.PI / 2;
    const tmrChip = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 1.75, 0.54, 0.14, 0.03, 'z'),
      u.icEpoxyLaser
    );
    tmrChip.position.set(0, 1.85, 0);
    g.add(busbar, yoke, tmrChip);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-hall-magnetic-flux-shunt',
        117,
        '#0284c7',
        g,
        new THREE.Vector3(-9.5, 4.5, -2.8),
        new THREE.Vector3(-178, 24, -56),
        cp,
        0.2
      )
    );
  }

  // P118. 2026 Tabless Petal-Crown 360-Deg Continuous Ring Fiber-Laser Weld
  {
    const g = new THREE.Group();
    const baseDisc = new THREE.Mesh(hiResCyl(2.45, 2.45, 0.42, 32), mats.copperHeatSpreader);
    baseDisc.rotation.x = Math.PI / 2;
    // 12 radial folded foil petals + glowing continuous ring laser weld bead
    for (let k = 0; k < 12; k++) {
      const a = (Math.PI * 2 * k) / 12;
      const petal = new THREE.Mesh(
        createChamferedBoxGeo(1.35, 0.44, 0.24, 0.06, 0.02, 'z'),
        mats.copperCoil
      );
      petal.position.set(Math.cos(a) * 1.35, Math.sin(a) * 1.35, 0.32);
      petal.rotation.z = a;
      petal.userData.noEdges = true;
      g.add(petal);
    }
    const laserRing = new THREE.Mesh(hiResTorus(1.52, 0.16, 12, 32), mats.solderBallSilver);
    laserRing.position.z = 0.48;
    const welds = buildSpotWeldNuggets(
      [
        [1.52, 0, 0.56],
        [-1.52, 0, 0.56],
        [0, 1.52, 0.56],
        [0, -1.52, 0.56],
      ],
      0.18,
      'z',
      mats.solderBallSilver,
      mats.goldPlating
    );
    g.add(baseDisc, laserRing, welds);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-laser-tabless-petal-weld',
        118,
        '#d97706',
        g,
        new THREE.Vector3(-9.8, -1.8, -2.0),
        new THREE.Vector3(-182, -12, -18),
        cp,
        0.18
      )
    );
  }

  // P119. Jellyroll Axial Breathing-Expansion Wave-Spring Washer & Micro-Shock Damper
  {
    const g = new THREE.Group();
    // 3D sinusoidal beryllium-copper wave spring ring + silicone micro-shock bumper
    const wavePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 48; i++) {
      const a = (Math.PI * 2 * i) / 48;
      wavePts.push(new THREE.Vector3(Math.cos(a) * 2.1, Math.sin(a) * 2.1, Math.sin(a * 4) * 0.42));
    }
    const waveCurve = new THREE.CatmullRomCurve3(wavePts, true);
    const waveMesh = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(waveCurve, 56, 0.2, 10, true)),
      mats.mountSpringSteel
    );
    const siliconeRing = new THREE.Mesh(hiResTorus(1.55, 0.24, 12, 24), mats.damperElastomer);
    siliconeRing.position.z = -0.32;
    g.add(waveMesh, siliconeRing);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-jellyroll-axial-spring-pad',
        119,
        '#64748b',
        g,
        new THREE.Vector3(-9.2, -7.8, -2.6),
        new THREE.Vector3(-176, -46, -54),
        cp,
        0.2
      )
    );
  }

  // P120. Porous Ceramic + Stainless Spark-Arrestor & Flame-Quenching Vent Filter
  {
    const g = new THREE.Group();
    const outerCollar = new THREE.Mesh(hiResCyl(2.4, 2.4, 0.85, 28), mats.stainlessMachined);
    outerCollar.rotation.x = Math.PI / 2;
    const ceramicCore = new THREE.Mesh(hiResCyl(1.95, 1.95, 0.68, 24), mats.ceramicAlumina);
    ceramicCore.rotation.x = Math.PI / 2;
    g.add(outerCollar, ceramicCore);
    // 7 honeycomb flame-quenching micro-channels arresting hot glowing sparks
    for (const [hx, hy] of [
      [0, 0],
      [0.95, 0],
      [-0.95, 0],
      [0.48, 0.82],
      [-0.48, 0.82],
      [0.48, -0.82],
      [-0.48, -0.82],
    ]) {
      const hole = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.78, 12), mats.matteBlackAnodized);
      hole.rotation.x = Math.PI / 2;
      hole.position.set(hx, hy, 0.04);
      hole.userData.noEdges = true;
      g.add(hole);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-ceramic-arc-quench-vent',
        120,
        '#94a3b8',
        g,
        new THREE.Vector3(-8.4, -13.6, -2.2),
        new THREE.Vector3(-162, -78, -32),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // GROUP 3 (P121–P130): 2026 SMART BMS AI, EKF, PCM SPONGE, PUF & SUSTAINABILITY
  // =========================================================================

  // P121. Extended Kalman Filter (EKF) & Digital-Twin 1% SoC Estimator DSP Core
  {
    const g = new THREE.Group();
    const body = new THREE.Group();
    const pkg = buildChipPackage({
      w: 5.4,
      d: 5.4,
      h: 0.82,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: u.batEisNyquistDie,
      leadMat: mats.goldPlating,
      pin1Mat: mats.solderBallSilver,
    });
    const dieTop = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 3.2, 0.24, 0.16, 0.03, 'y'),
      mats.ispSiliconDie
    );
    dieTop.position.y = 0.52;
    dieTop.userData.noEdges = true;
    body.add(pkg, dieTop);
    body.rotation.x = Math.PI / 2;
    g.add(body);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-kalman-ekf-soc-dsp',
        121,
        '#6366f1',
        g,
        new THREE.Vector3(-6.2, 15.8, 1.8),
        new THREE.Vector3(-116, -112, 52),
        cp,
        0.18
      )
    );
  }

  // P122. 2026 Edge-AI SOH Degradation Predictor & Cloud Telemetry Engine
  {
    const g = new THREE.Group();
    const carrier = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 5.2, 0.44, 0.34, 0.04, 'z'),
      u.batBmsPcb
    );
    const npuDie = new THREE.Mesh(
      createChamferedBoxGeo(3.4, 2.8, 0.42, 0.2, 0.04, 'z'),
      u.v2BionzGaaNanosheet
    );
    npuDie.position.z = 0.42;
    const cap1 = buildSmdPassive(1.1, 0.65, 0.5, mats.smdCeramic, mats.solderBallSilver);
    cap1.position.set(-2.1, -1.7, 0.45);
    const cap2 = buildSmdPassive(1.1, 0.65, 0.5, mats.smdCeramic, mats.solderBallSilver);
    cap2.position.set(2.1, -1.7, 0.45);
    g.add(carrier, npuDie, cap1, cap2);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-ai-cloud-soh-telemetry',
        122,
        '#c026d3',
        g,
        new THREE.Vector3(-3.0, 16.4, 2.0),
        new THREE.Vector3(-74, -118, 62),
        cp,
        0.18
      )
    );
  }

  // P123. ISO-Safety 16-Bit Dual-Redundant Delta-Sigma Voltage AFE & Vref Checker
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(6.0, 4.8, 0.42, 0.3, 0.04, 'z'),
      u.batBmsPcb
    );
    g.add(pcb);
    // Dual mirrored independent ADC AFE dies cross-checking cell voltages
    for (const sx of [-1.45, 1.45]) {
      const afe = new THREE.Mesh(
        createChamferedBoxGeo(2.2, 2.4, 0.48, 0.14, 0.03, 'z'),
        u.icEpoxyLaser
      );
      afe.position.set(sx, 0.25, 0.44);
      afe.userData.noEdges = true;
      const vref = buildTantalumCap(
        1.2,
        0.72,
        0.55,
        mats.tantalumCapYellow,
        mats.goldPlating,
        mats.solderBallSilver,
        'z'
      );
      vref.position.set(sx, -1.45, 0.46);
      g.add(afe, vref);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-dual-redundant-afe-adc',
        123,
        '#0ea5e9',
        g,
        new THREE.Vector3(0.2, 16.2, 1.8),
        new THREE.Vector3(-34, -122, 22),
        cp,
        0.2
      )
    );
  }

  // P124. USB-C / 2 MHz GaN Common-Mode EMI Choke (Blocking Audio Mic Hum)
  {
    const g = new THREE.Group();
    const shield = buildShieldedInductor(
      4.8,
      1.85,
      mats.ferriteInductor,
      mats.solderBallSilver,
      mats.goldPlating,
      'z'
    );
    const cmRing = new THREE.Mesh(hiResTorus(1.42, 0.34, 12, 24), mats.copperCoil);
    cmRing.position.z = 1.06;
    cmRing.userData.noEdges = true;
    g.add(shield, cmRing);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-active-emi-cm-choke',
        124,
        '#eab308',
        g,
        new THREE.Vector3(3.4, 16.0, 2.0),
        new THREE.Vector3(32, -122, 62),
        cp,
        0.2
      )
    );
  }

  // P125. NP-FZ100 4-Pin Self-Cleaning Wiping Slot & Ni-Pd-Au 3-Layer Anti-Sulfidation Plating
  {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 2.6, 1.65, 0.28, 0.05, 'z'),
      mats.mountPpsInsulator
    );
    g.add(housing);
    // 4 bifurcated spring-loaded self-wiping Ni-Pd-Au blades
    for (let i = 0; i < 4; i++) {
      const bx = -2.1 + i * 1.4;
      const niSub = new THREE.Mesh(new THREE.BoxGeometry(0.68, 2.1, 0.95), mats.stainlessMachined);
      niSub.position.set(bx, 0.22, 0.25);
      niSub.userData.noEdges = true;
      const auTop = new THREE.Mesh(new THREE.BoxGeometry(0.56, 2.25, 0.38), mats.goldPlating);
      auTop.position.set(bx, 0.35, 0.72);
      auTop.userData.noEdges = true;
      g.add(niSub, auTop);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-gold-wiper-selfclean-slot',
        125,
        '#f59e0b',
        g,
        new THREE.Vector3(6.4, 16.8, 1.2),
        new THREE.Vector3(74, -118, 54),
        cp,
        0.2
      )
    );
  }

  // P126. Latent-Heat Paraffin Phase-Change Material (PCM) Thermal-Sponge Potting Layer
  {
    const g = new THREE.Group();
    const gelBlock = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 5.6, 0.84, 0.46, 0.08, 'z'),
      mats.thermalPadPink
    );
    g.add(gelBlock);
    // Micro-encapsulated paraffin wax latent-heat pearls absorbing 4K60 heat spikes at 45C
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const pearl = new THREE.Mesh(hiResSphere(0.46, 14, 10), mats.coverGlass);
        pearl.position.set(c * 1.55, r * 1.55, 0.42);
        pearl.userData.noEdges = true;
        const waxCore = new THREE.Mesh(hiResSphere(0.26, 10, 8), mats.tantalumCapYellow);
        waxCore.position.set(c * 1.55, r * 1.55, 0.44);
        waxCore.userData.noEdges = true;
        g.add(pearl, waxCore);
      }
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-potting-phase-change-pcm',
        126,
        '#ec4899',
        g,
        new THREE.Vector3(7.2, -16.8, 1.8),
        new THREE.Vector3(116, -108, 38),
        cp,
        0.16
      )
    );
  }

  // P127. Plasma-Polymerized Fluoropolymer Hydrophobic PCB Nano-Coat Shield
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 5.2, 0.42, 0.34, 0.04, 'z'),
      u.batBmsPcb
    );
    // Iridescent nano-coating layer + spherical high-contact-angle (>115 deg) water droplets beaded up
    const nanoFilm = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 5.0, 0.14, 0.3, 0.02, 'z'),
      mats.evfDichroicMirror
    );
    nanoFilm.position.z = 0.28;
    g.add(pcb, nanoFilm);
    for (const [dx, dy, dr] of [
      [-1.4, 1.1, 0.56],
      [1.3, 0.7, 0.44],
      [-0.3, -1.2, 0.62],
      [1.6, -1.1, 0.38],
    ]) {
      const drop = new THREE.Mesh(hiResSphere(dr, 16, 12), mats.coverGlass);
      drop.position.set(dx, dy, 0.36 + dr * 0.78);
      drop.userData.noEdges = true;
      g.add(drop);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-hydrophobic-pcb-nano-coat',
        127,
        '#06b6d4',
        g,
        new THREE.Vector3(-5.8, 15.8, -2.2),
        new THREE.Vector3(-92, -112, -46),
        cp,
        0.16
      )
    );
  }

  // P128. Silicon PUF (Physical Unclonable Function) Atomic-Fingerprint Anti-Counterfeit IC
  {
    const g = new THREE.Group();
    const sub = new THREE.Mesh(
      createChamferedBoxGeo(5.4, 5.4, 0.52, 0.3, 0.04, 'z'),
      u.cfePqcSecurityDie
    );
    const pufDie = new THREE.Mesh(
      createChamferedBoxGeo(3.1, 3.1, 0.34, 0.16, 0.03, 'z'),
      mats.siliconSensorDie
    );
    pufDie.position.z = 0.42;
    g.add(sub, pufDie);
    // Gold micro-bond wires framing silicon SRAM-PUF atomic fingerprint
    for (let i = -1; i <= 1; i++) {
      const wTop = buildGoldWirebondLoop(
        new THREE.Vector3(i * 0.9, 1.4, 0.55),
        new THREE.Vector3(i * 1.15, 2.25, 0.3),
        0.48,
        0.055,
        mats.goldPlating
      );
      const wBot = buildGoldWirebondLoop(
        new THREE.Vector3(i * 0.9, -1.4, 0.55),
        new THREE.Vector3(i * 1.15, -2.25, 0.3),
        0.48,
        0.055,
        mats.goldPlating
      );
      g.add(wTop, wBot);
    }

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-second-source-id-puf',
        128,
        '#7c3aed',
        g,
        new THREE.Vector3(-1.8, 16.0, -2.4),
        new THREE.Vector3(-42, -120, -56),
        cp,
        0.18
      )
    );
  }

  // P129. 2026 Direct Cathode Recycling Laser ID & Thermally Releasable Binder Layer
  {
    const g = new THREE.Group();
    const plate = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 5.6, 0.46, 0.36, 0.04, 'z'),
      u.batCellWrapGreen
    );
    // 2D laser-etched recycling QR matrix + peel-away cathode recovery flap
    const qrPlate = new THREE.Mesh(
      createChamferedBoxGeo(3.4, 3.4, 0.22, 0.12, 0.02, 'z'),
      mats.stainlessMachined
    );
    qrPlate.position.set(0, 0.5, 0.34);
    g.add(plate, qrPlate);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if ((r + c) % 2 === 0 || (r === 0 && c < 2)) {
          const bit = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.12), mats.matteBlackAnodized);
          bit.position.set(-0.95 + c * 0.64, 1.45 - r * 0.64, 0.48);
          bit.userData.noEdges = true;
          g.add(bit);
        }
      }
    }
    const recycleRing = new THREE.Mesh(hiResTorus(0.76, 0.12, 10, 18), mats.cfaGreen);
    recycleRing.position.set(0, -1.75, 0.38);
    recycleRing.userData.noEdges = true;
    g.add(recycleRing);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-recycle-direct-cathode-tag',
        129,
        '#16a34a',
        g,
        new THREE.Vector3(2.8, -16.8, -2.2),
        new THREE.Vector3(42, -120, -56),
        cp,
        0.18
      )
    );
  }

  // P130. UN38.3 Aviation Crush / Altitude / Short-Circuit Reinforced Mandrel Guard
  {
    const g = new THREE.Group();
    const armorFrame = makeHiResHorizPlate(
      createFrameShape(5.8, 6.2, 0.65, 4.1, 4.5, 0.42),
      0.86,
      mats.stainlessMachined,
      0.08,
      2,
      20
    );
    armorFrame.rotation.x = Math.PI / 2;
    const centerMandrel = new THREE.Mesh(hiResCyl(1.15, 1.15, 5.4, 24), mats.tungstenCopper);
    const crushRibTop = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.52, 1.15, 0.12, 0.03, 'z'),
      mats.matteBlackAnodized
    );
    crushRibTop.position.set(0, 1.5, 0);
    const crushRibBot = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.52, 1.15, 0.12, 0.03, 'z'),
      mats.matteBlackAnodized
    );
    crushRibBot.position.set(0, -1.5, 0);
    g.add(armorFrame, centerMandrel, crushRibTop, crushRibBot);

    parts.push(
      finalizeBatteryUltra31Part(
        'bat-un383-crush-mandrel-guard',
        130,
        '#dc2626',
        g,
        new THREE.Vector3(6.8, -16.5, -2.0),
        new THREE.Vector3(96, -110, -48),
        cp,
        0.2
      )
    );
  }

  return parts;
}
