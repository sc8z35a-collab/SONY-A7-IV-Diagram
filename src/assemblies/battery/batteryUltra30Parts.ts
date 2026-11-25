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
  buildShieldedInductor,
  buildSmdPassive,
  buildSpotWeldNuggets,
  buildTantalumCap,
  createChamferedBoxGeo,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeBatteryUltra30Part(
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
 * Phase 30A — Standalone Camera Battery Pack 100-Part Ultra-Microscopic 2026 Frontier (+30 Parts: P71–P100).
 * Every single part sits strictly inside the genuine 1:1 mm NP-FZ100 shell cavity when assembled
 * (|x| <= 17.5, y in [-23.2, +23.2], |z| <= 9.2) so the assembled exterior stays 100% spotless,
 * and explodes cleanly into a balanced, non-overlapping 6-way watchmaker & TEM/SEM orbital constellation!
 */
export function buildBatteryUltra30Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // GROUP 1: P71–P80 — 2026 ATOMIC / NANOSCALE ELECTRODE & INTERPHASE PHYSICS
  // =========================================================================

  // P71. CVD Gas-Phase Nano-Si@Porous Carbon Scaffold Anode (2026)
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(5.8, 7.2, 0.52, 0.45, 0.06, 'z');
    applyPlanarUVs(baseGeo, 5.8, 7.2, 'xy');
    const basePlate = new THREE.Mesh(baseGeo, u.batSiCNanoScaffold);
    g.add(basePlate);

    // 7 honeycomb porous carbon cage rings enclosing glowing metallic-amber CVD nano-Si cores + void buffers
    const poreCoords: Array<[number, number]> = [
      [0, 0],
      [-1.55, 1.35],
      [1.55, 1.35],
      [-1.55, -1.35],
      [1.55, -1.35],
      [0, 2.35],
      [0, -2.35],
    ];
    for (const [px, py] of poreCoords) {
      const cage = new THREE.Mesh(hiResTorus(0.72, 0.14, 10, 18), mats.pyroGraphite);
      cage.position.set(px, py, 0.44);
      cage.userData.noEdges = true;
      const siCore = new THREE.Mesh(hiResSphere(0.42, 14, 10), mats.copperHeatSpreader);
      siCore.position.set(px, py, 0.48);
      siCore.userData.noEdges = true;
      const seiRing = new THREE.Mesh(hiResTorus(0.50, 0.06, 8, 16), mats.vcWorkingFluidCyan);
      seiRing.position.set(px, py, 0.56);
      seiRing.userData.noEdges = true;
      g.add(cage, siCore, seiRing);
    }

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-cvd-sic-porous-scaffold',
        71,
        '#f59e0b',
        g,
        new THREE.Vector3(9.5, 6.2, 2.6),
        new THREE.Vector3(128, 42, 42),
        cp
      )
    );
  }

  // P72. Single-Crystal High-Nickel NMC811 Particle & ALD Al2O3/LiNbO3 Coat
  {
    const g = new THREE.Group();
    const carrierGeo = createChamferedBoxGeo(5.6, 6.8, 0.42, 0.45, 0.05, 'z');
    applyPlanarUVs(carrierGeo, 5.6, 6.8, 'xy');
    const carrier = new THREE.Mesh(carrierGeo, u.batSingleCrystalNmc);
    g.add(carrier);

    // Sculpted faceted single-crystal NMC811 octahedron core (zero polycrystalline grain cracks!)
    const octaGeo = markHiRes(new THREE.OctahedronGeometry(1.85, 0));
    const crystalCore = new THREE.Mesh(octaGeo, u.batSingleCrystalNmc);
    crystalCore.position.set(0, 0, 1.35);
    crystalCore.rotation.set(0.35, 0.52, 0.22);

    // Outer translucent ALD Al2O3/LiNbO3 atomic barrier halo ring + 6 Li+ intercalation ion spheres
    const aldHalo = new THREE.Mesh(hiResTorus(2.05, 0.14, 10, 32), mats.nanoArIridescent);
    aldHalo.position.set(0, 0, 1.35);
    aldHalo.userData.noEdges = true;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const ion = new THREE.Mesh(hiResSphere(0.24, 12, 8), mats.goldPlating);
      ion.position.set(Math.cos(a) * 2.15, Math.sin(a) * 2.15, 1.48);
      ion.userData.noEdges = true;
      g.add(ion);
    }
    g.add(crystalCore, aldHalo);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-single-crystal-nmc-ald',
        72,
        '#2563eb',
        g,
        new THREE.Vector3(9.5, 1.5, 2.6),
        new THREE.Vector3(146, 22, 22),
        cp
      )
    );
  }

  // P73. Sacrificial Cathode Pre-Lithiation Additive Li5FeO4 (LFO — 2026)
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 6.4, 0.44, 0.4, 0.05, 'z'),
      u.batSingleCrystalNmc
    );
    // 3 orthorhombic FeO6 crystal donor prisms shedding golden reserve Li+ ions during Cycle 1
    for (const [px, py] of [
      [-1.5, 1.2],
      [1.5, 1.2],
      [0, -1.4],
    ]) {
      const lfoPrism = new THREE.Mesh(
        createChamferedBoxGeo(1.75, 1.75, 1.15, 0.22, 0.06, 'z'),
        mats.cinnabarAnodized
      );
      lfoPrism.position.set(px, py, 0.72);
      lfoPrism.rotation.z = 0.28;
      // Al2O3 air-stability jacket rim
      const coat = new THREE.Mesh(hiResTorus(1.1, 0.08, 8, 20), mats.ceramicAlumina);
      coat.position.set(px, py, 1.18);
      coat.userData.noEdges = true;
      g.add(lfoPrism, coat);
    }
    // 8 golden surplus Li+ ion streams migrating outward to compensate 1st-cycle SEI loss
    const liGeo = hiResSphere(0.22, 10, 8);
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2;
      const li = new THREE.Mesh(liGeo, mats.goldPlating);
      li.position.set(Math.cos(ang) * 2.25, Math.sin(ang) * 2.25, 1.42);
      li.userData.noEdges = true;
      g.add(li);
    }
    g.add(base);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-sacrificial-lfo-prelith',
        73,
        '#ea580c',
        g,
        new THREE.Vector3(9.5, -3.5, 2.6),
        new THREE.Vector3(154, 0, 40),
        cp
      )
    );
  }

  // P74. In-Situ Bilayer Organic-Inorganic LiF-Rich Artificial SEI Film (2026)
  {
    const g = new THREE.Group();
    // Base anode graphite/Si floor
    const anodeSub = new THREE.Mesh(
      createChamferedBoxGeo(6.0, 6.4, 0.44, 0.4, 0.05, 'z'),
      mats.pyroGraphite
    );
    // Inner rigid inorganic LiF mosaic tile grid (electronic insulator + homogeneous Li+ conductor)
    const tileGeo = createChamferedBoxGeo(1.15, 1.15, 0.36, 0.12, 0.03, 'z');
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const tile = new THREE.Mesh(tileGeo, mats.ceramicAlumina);
        tile.position.set(c * 1.48, r * 1.48, 0.44);
        tile.userData.noEdges = true;
        g.add(tile);
      }
    }
    // Outer elastic poly-VC / Li-polyoxymethylene flexible polymer veil + Li+ transport bridges
    const polyVeil = new THREE.Mesh(
      createChamferedBoxGeo(5.4, 5.8, 0.32, 0.4, 0.04, 'z'),
      mats.vcWorkingFluidCyan
    );
    polyVeil.position.z = 0.96;
    for (let i = -2; i <= 2; i++) {
      const chain = new THREE.Mesh(hiResTorus(0.55, 0.09, 8, 16), mats.goldPlating);
      chain.position.set(i * 0.98, (i % 2 === 0 ? 1 : -1) * 0.85, 1.18);
      chain.userData.noEdges = true;
      g.add(chain);
    }
    g.add(anodeSub, polyVeil);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-bilayer-lif-sei-film',
        74,
        '#06b6d4',
        g,
        new THREE.Vector3(9.5, -8.5, 2.6),
        new THREE.Vector3(148, -22, 24),
        cp
      )
    );
  }

  // P75. High-Voltage Cathode CEI Film & LiPO2F2 Sub-Zero (-50°C) Desolvation Layer
  {
    const g = new THREE.Group();
    const cathodeBase = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 6.2, 0.44, 0.4, 0.05, 'z'),
      u.batSingleCrystalNmc
    );
    // Thin glassy LiPxOyFz + LiF CEI protective sheen layer
    const ceiPlate = new THREE.Mesh(
      createChamferedBoxGeo(5.3, 5.7, 0.28, 0.35, 0.03, 'z'),
      mats.fluorineCoatCyan
    );
    ceiPlate.position.z = 0.42;
    // Solvated Li+ shell shedding carbonate solvent molecules at the Inner Helmholtz Plane (IHP)
    for (const py of [-1.45, 1.45]) {
      const liIon = new THREE.Mesh(hiResSphere(0.36, 14, 10), mats.goldPlating);
      liIon.position.set(0.35, py, 1.05);
      liIon.userData.noEdges = true;
      g.add(liIon);
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI * 2 + 0.4;
        const solv = new THREE.Mesh(hiResSphere(0.22, 10, 8), mats.vcWorkingFluidCyan);
        solv.position.set(0.35 + Math.cos(a) * 1.1, py + Math.sin(a) * 1.1, 1.25);
        solv.userData.noEdges = true;
        g.add(solv);
      }
    }
    g.add(cathodeBase, ceiPlate);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-cathode-cei-passivation',
        75,
        '#38bdf8',
        g,
        new THREE.Vector3(9.5, -13.5, 2.6),
        new THREE.Vector3(132, -46, 36),
        cp
      )
    );
  }

  // P76. Solvent-Free Dry Battery Electrode (DBE) PTFE Fibril + PAA Co-Binder Web
  {
    const g = new THREE.Group();
    const foilBack = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 6.4, 0.32, 0.35, 0.04, 'z'),
      mats.silverElectrode
    );
    // Dense active material powder spheres anchored by interlaced white PTFE spiderweb fibrils
    const grainGeo = hiResSphere(0.52, 12, 10);
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const grain = new THREE.Mesh(grainGeo, u.batElectrodeCoating);
        grain.position.set(c * 1.48, r * 1.55, 0.56);
        grain.userData.noEdges = true;
        g.add(grain);
      }
    }
    // Diagonal & crisscross fibrillated white PTFE nano-threads + PAA hydrogen-bond nodes
    for (let i = -2; i <= 2; i++) {
      const pts1 = [
        new THREE.Vector3(-2.3, i * 1.05, 0.86),
        new THREE.Vector3(0, i * 0.92 + 0.35, 1.12),
        new THREE.Vector3(2.3, i * 1.05, 0.86),
      ];
      const f1 = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts1), 16, 0.075, 6, false)),
        mats.ceramicAlumina
      );
      f1.userData.noEdges = true;
      g.add(f1);
    }
    for (let j = -1; j <= 1; j++) {
      const pts2 = [
        new THREE.Vector3(j * 1.45, -2.5, 0.88),
        new THREE.Vector3(j * 1.3 + 0.25, 0, 1.16),
        new THREE.Vector3(j * 1.45, 2.5, 0.88),
      ];
      const f2 = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts2), 16, 0.07, 6, false)),
        mats.lcdDiffuserMatte
      );
      f2.userData.noEdges = true;
      g.add(f2);
    }
    g.add(foilBack);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-dry-ptfe-fibril-electrode',
        76,
        '#e2e8f0',
        g,
        new THREE.Vector3(9.5, 6.2, -2.6),
        new THREE.Vector3(126, 48, -28),
        cp
      )
    );
  }

  // P77. Tri-Layer PP/PE/PP 130°C Thermal Shutdown & Boehmite Ceramic Separator
  {
    const g = new THREE.Group();
    // 3 distinct stepped strata: PP outer strength skin -> PE 130°C melting shutdown core -> PP + Boehmite ceramic armor!
    const ppBack = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 6.6, 0.30, 0.35, 0.04, 'z'),
      mats.lcdDiffuserMatte
    );
    const peShutdown = new THREE.Mesh(
      createChamferedBoxGeo(5.3, 6.1, 0.32, 0.32, 0.04, 'z'),
      mats.vcWorkingFluidCyan
    );
    peShutdown.position.z = 0.42;
    const ppFront = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 5.6, 0.28, 0.28, 0.03, 'z'),
      mats.ceramicAlumina
    );
    ppFront.position.z = 0.84;
    // Microporous shutdown channels + boehmite nano-platelets on front surface
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const pore = new THREE.Mesh(hiResTorus(0.42, 0.09, 8, 16), mats.goldPlating);
        pore.position.set(c * 1.35, r * 1.45, 1.04);
        pore.userData.noEdges = true;
        g.add(pore);
      }
    }
    g.add(ppBack, peShutdown, ppFront);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-trilayer-pp-pe-pp-shutdown',
        77,
        '#0ea5e9',
        g,
        new THREE.Vector3(9.5, 1.5, -2.6),
        new THREE.Vector3(148, 22, -40),
        cp
      )
    );
  }

  // P78. MgO-Fiber Reinforced LLZO Garnet Solid-State Dendrite Barrier (2026 LBNL)
  {
    const g = new THREE.Group();
    // Translucent emerald-cyan LLZO garnet ceramic plate
    const llzoPlate = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 6.6, 0.56, 0.4, 0.06, 'z'),
      mats.cfaGreen
    );
    // Diagonal reinforcing white MgO ceramic micro-fibers (2026 LBNL composite)
    for (let i = -2; i <= 2; i++) {
      const fiber = new THREE.Mesh(hiResCyl(0.11, 0.11, 5.6, 10), mats.ceramicAlumina);
      fiber.position.set(0, i * 1.05, 0.36);
      fiber.rotation.z = Math.PI * 0.38;
      fiber.userData.noEdges = true;
      g.add(fiber);
    }
    // Blunted metallic Li dendrite needles stopped cold at the garnet shield surface!
    for (const dy of [-1.4, 0, 1.4]) {
      const needle = new THREE.Mesh(hiResCyl(0.06, 0.24, 1.35, 10), mats.silverElectrode);
      needle.rotation.x = Math.PI / 2;
      needle.position.set(-1.35, dy, 0.96);
      needle.userData.noEdges = true;
      const stopRing = new THREE.Mesh(hiResTorus(0.32, 0.08, 8, 16), mats.bodyRecRed);
      stopRing.position.set(-1.35, dy, 0.38);
      stopRing.userData.noEdges = true;
      g.add(needle, stopRing);
    }
    g.add(llzoPlate);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-llzo-mgo-dendrite-shield',
        78,
        '#10b981',
        g,
        new THREE.Vector3(9.5, -3.5, -2.6),
        new THREE.Vector3(158, -4, -30),
        cp
      )
    );
  }

  // P79. Dual-Porosity Calendered Electrode & Laser-Perforated Ion Micro-Channels
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 6.4, 0.36, 0.38, 0.04, 'z'),
      u.batSiCNanoScaffold
    );
    // Bottom high-density calendered stratum + upper open-porosity stratum
    const denseLayer = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 2.5, 0.56, 0.24, 0.05, 'z'),
      mats.pyroGraphite
    );
    denseLayer.position.set(0, -1.45, 0.42);
    const porousLayer = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 2.5, 0.52, 0.24, 0.05, 'z'),
      u.batElectrodeCoating
    );
    porousLayer.position.set(0, 1.45, 0.42);
    // 4 vertical laser-drilled fast-charge Li+ ion highway trenches glowing cyan
    for (const cx of [-1.75, -0.58, 0.58, 1.75]) {
      const channel = new THREE.Mesh(hiResCyl(0.16, 0.22, 5.4, 12), mats.vcWorkingFluidCyan);
      channel.position.set(cx, 0, 0.84);
      channel.userData.noEdges = true;
      g.add(channel);
    }
    g.add(base, denseLayer, porousLayer);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-calendered-porosity-gradient',
        79,
        '#0284c7',
        g,
        new THREE.Vector3(9.5, -8.5, -2.6),
        new THREE.Vector3(148, -28, -42),
        cp
      )
    );
  }

  // P80. Electrolyte APTES HF-Scavenger & Moisture/Gas Suppression Additives
  {
    const g = new THREE.Group();
    const fluidTile = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 6.2, 0.46, 0.55, 0.06, 'z'),
      mats.vcWorkingFluidCyan
    );
    // 4 molecular APTES silane scavenger cage rings trapping crimson HF acid / H2O molecules!
    for (const [cx, cy] of [
      [-1.35, 1.35],
      [1.35, 1.35],
      [-1.35, -1.35],
      [1.35, -1.35],
    ]) {
      const cage = new THREE.Mesh(hiResTorus(0.76, 0.12, 10, 20), mats.goldPlating);
      cage.position.set(cx, cy, 0.54);
      cage.userData.noEdges = true;
      const hfCore = new THREE.Mesh(hiResSphere(0.32, 12, 8), mats.bodyRecRed);
      hfCore.position.set(cx, cy, 0.56);
      hfCore.userData.noEdges = true;
      g.add(cage, hfCore);
    }
    g.add(fluidTile);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-hf-scavenger-electrolyte',
        80,
        '#f43f5e',
        g,
        new THREE.Vector3(9.5, -13.5, -2.6),
        new THREE.Vector3(128, -54, -26),
        cp
      )
    );
  }

  // =========================================================================
  // GROUP 2: P81–P90 — CYLINDRICAL 18500 & TABLESS WATCHMAKER MECHANICS
  // =========================================================================

  // P81. 1.0 mm Anode Overhang Edge Margin (Anti-Li-Plating Guard)
  {
    const g = new THREE.Group();
    // Concentric cutaway rings highlighting +1.0 mm taller bronze-graphite anode vs shorter cobalt cathode
    const anodeRing = new THREE.Mesh(
      hiResCyl(6.2, 6.2, 4.4, 34, true, -Math.PI * 0.38, Math.PI * 0.76),
      mats.copperHeatSpreader
    );
    const sepRing = new THREE.Mesh(
      hiResCyl(5.85, 5.85, 4.9, 34, true, -Math.PI * 0.38, Math.PI * 0.76),
      mats.ceramicAlumina
    );
    const cathodeRing = new THREE.Mesh(
      hiResCyl(5.45, 5.45, 3.0, 34, true, -Math.PI * 0.38, Math.PI * 0.76),
      u.batSingleCrystalNmc
    );
    // Gold caliper callout rim marking the exact 1.0 mm overhang margin band
    const marginLip = new THREE.Mesh(
      hiResTorus(6.22, 0.14, 10, 30, Math.PI * 0.76),
      mats.goldPlating
    );
    marginLip.rotation.x = Math.PI / 2;
    marginLip.rotation.z = -Math.PI * 0.38;
    marginLip.position.y = 2.05;
    marginLip.userData.noEdges = true;
    g.add(anodeRing, sepRing, cathodeRing, marginLip);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-anode-overhang-margin',
        81,
        '#d97706',
        g,
        new THREE.Vector3(9.5, 13.8, 0),
        new THREE.Vector3(116, 62, -10),
        cp
      )
    );
  }

  // P82. Laser-Notched Foil Edge & Folded Tabless Current-Collector Crown
  {
    const g = new THREE.Group();
    // 3 concentric folded copper/aluminum tabless foil petals with radial laser kerf slots
    for (const [rad, mat] of [
      [6.4, mats.copperHeatSpreader],
      [4.7, mats.silverElectrode],
      [3.1, mats.copperCoil],
    ] as Array<[number, THREE.Material]>) {
      const count = 12;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const petal = new THREE.Mesh(
          createChamferedBoxGeo(1.18, 0.24, 0.95, 0.12, 0.03, 'y'),
          mat
        );
        petal.position.set(Math.cos(a) * rad, 0.18, Math.sin(a) * rad);
        petal.rotation.set(0.18, -a, 0);
        petal.userData.noEdges = true;
        g.add(petal);
      }
    }
    const hubRing = new THREE.Mesh(hiResTorus(2.05, 0.22, 10, 28), mats.goldPlating);
    hubRing.rotation.x = Math.PI / 2;
    g.add(hubRing);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-laser-notched-foil-edge',
        82,
        '#f59e0b',
        g,
        new THREE.Vector3(9.5, 15.2, 0),
        new THREE.Vector3(106, 78, 22),
        cp
      )
    );
  }

  // P83. Vacuum Electrolyte Wetting Capillary Channels & Micro-Bubble Vent
  {
    const g = new THREE.Group();
    // Helical capillary fluid-wicking guide channel climbing the jelly-roll wall
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 28; i++) {
      const t = i / 28;
      const ang = t * Math.PI * 2.2 - Math.PI * 0.4;
      pts.push(new THREE.Vector3(Math.cos(ang) * 4.8, -11.0 + t * 22.0, Math.sin(ang) * 4.8));
    }
    const spiralWick = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 42, 0.34, 8, false)),
      mats.vcWorkingFluidCyan
    );
    spiralWick.userData.noEdges = true;
    // Capillary micro-droplet beads + top vacuum bubble exhaust ring
    for (let k = 0; k < 6; k++) {
      const p = pts[k * 5];
      const drop = new THREE.Mesh(hiResSphere(0.42, 12, 8), mats.fluorineCoatCyan);
      drop.position.copy(p);
      drop.userData.noEdges = true;
      g.add(drop);
    }
    const ventRing = new THREE.Mesh(hiResTorus(2.6, 0.22, 10, 24), mats.silverElectrode);
    ventRing.rotation.x = Math.PI / 2;
    ventRing.position.y = 11.2;
    g.add(spiralWick, ventRing);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-electrolyte-capillary-wick',
        83,
        '#22d3ee',
        g,
        new THREE.Vector3(9.5, -2.5, 0),
        new THREE.Vector3(96, -72, 42),
        cp
      )
    );
  }

  // P84. 1 μm Conductive Carbon-Coated Aluminum Foil Primer Layer
  {
    const g = new THREE.Group();
    const alBase = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 7.0, 0.34, 0.35, 0.04, 'z'),
      mats.silverElectrode
    );
    // Matte conductive carbon micro-primer layer preventing insulating Al2O3 oxide growth
    const carbonCoat = new THREE.Mesh(
      createChamferedBoxGeo(5.3, 6.4, 0.26, 0.3, 0.03, 'z'),
      mats.pyroGraphite
    );
    carbonCoat.position.z = 0.32;
    // Conductive carbon-black percolation bridge nodes
    for (let r = -2; r <= 2; r++) {
      for (let c = -1; c <= 1; c++) {
        const node = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.22, 12).rotateX(Math.PI / 2), mats.goldPlating);
        node.position.set(c * 1.45, r * 1.15, 0.52);
        node.userData.noEdges = true;
        g.add(node);
      }
    }
    g.add(alBase, carbonCoat);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-al-foil-carbon-primer',
        84,
        '#94a3b8',
        g,
        new THREE.Vector3(-9.5, 6.0, 2.2),
        new THREE.Vector3(-124, 34, 34),
        cp
      )
    );
  }

  // P85. Electrodeposited Copper Foil Micro-Nodule Surface Anchor Layer
  {
    const g = new THREE.Group();
    const cuSub = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 7.0, 0.38, 0.35, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    // 4×4 array of mushroom-shaped electroplated copper micro-nodules gripping Si-C anode
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const nx = -1.8 + c * 1.2;
        const ny = -2.1 + r * 1.4;
        const stem = new THREE.Mesh(hiResCyl(0.14, 0.2, 0.42, 10).rotateX(Math.PI / 2), mats.copperCoil);
        stem.position.set(nx, ny, 0.38);
        stem.userData.noEdges = true;
        const cap = new THREE.Mesh(hiResSphere(0.32, 12, 8), mats.goldPlating);
        cap.position.set(nx, ny, 0.64);
        cap.userData.noEdges = true;
        g.add(stem, cap);
      }
    }
    g.add(cuSub);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-cu-foil-nodule-anchor',
        85,
        '#c2410c',
        g,
        new THREE.Vector3(-9.5, -2.5, 2.2),
        new THREE.Vector3(-136, -4, 34),
        cp
      )
    );
  }

  // P86. CID Internal PBT Dual-Insulator Ring & Calibrated Shear-Score Disc
  {
    const g = new THREE.Group();
    const pbtShape = new THREE.Shape();
    pbtShape.absarc(0, 0, 6.4, 0, Math.PI * 2, false);
    const pbtHole = new THREE.Path();
    pbtHole.absarc(0, 0, 3.8, 0, Math.PI * 2, true);
    pbtShape.holes.push(pbtHole);
    const pbtRing = makeHiResHorizPlate(pbtShape, 0.68, mats.zifIvoryPlastic, 0.06, 2, 32);

    // Calibrated laser shear-score groove ring (snaps cleanly at 1.0–1.5 MPa!)
    const scoreDisc = new THREE.Mesh(hiResTorus(4.65, 0.16, 10, 32), mats.bodyRecRed);
    scoreDisc.rotation.x = Math.PI / 2;
    scoreDisc.position.y = 0.42;
    scoreDisc.userData.noEdges = true;
    const upperSpacer = new THREE.Mesh(hiResTorus(5.9, 0.22, 10, 32), mats.polyimideFpc);
    upperSpacer.rotation.x = Math.PI / 2;
    upperSpacer.position.y = -0.38;
    upperSpacer.userData.noEdges = true;
    g.add(pbtRing, scoreDisc, upperSpacer);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-cid-pbt-insulator-ring',
        86,
        '#e11d48',
        g,
        new THREE.Vector3(-9.5, 16.4, 0),
        new THREE.Vector3(-116, 56, 4),
        cp
      )
    );
  }

  // P87. 18500 Steel Can Internal Ni-Diffusion & External Anti-Corrosion Plating
  {
    const g = new THREE.Group();
    // 3 concentric cutaway steel/nickel plating strata showcasing inner diffusion Ni + steel core + outer satin Ni
    const innerNi = new THREE.Mesh(
      hiResCyl(6.2, 6.2, 10.2, 30, true, Math.PI * 0.62, Math.PI * 0.76),
      mats.goldPlating
    );
    const steelCore = new THREE.Mesh(
      hiResCyl(6.65, 6.65, 10.6, 30, true, Math.PI * 0.62, Math.PI * 0.76),
      mats.invarScaleBar
    );
    const outerNi = new THREE.Mesh(
      hiResCyl(7.1, 7.1, 10.2, 30, true, Math.PI * 0.62, Math.PI * 0.76),
      mats.stainlessMachined
    );
    g.add(innerNi, steelCore, outerNi);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-can-ni-gradient-plating',
        87,
        '#cbd5e1',
        g,
        new THREE.Vector3(-9.5, -10.5, 0),
        new THREE.Vector3(-136, -34, -22),
        cp
      )
    );
  }

  // P88. Cell Top Hermetic Double-Crimp Compression PP/EPDM Sealing Gasket
  {
    const g = new THREE.Group();
    // L-profiled double-crimp cutaway ring sandwiching a compressed cream-white PP sealing sleeve
    const prof: THREE.Vector2[] = [
      new THREE.Vector2(6.6, -1.05),
      new THREE.Vector2(7.65, -1.05),
      new THREE.Vector2(7.65, 1.05),
      new THREE.Vector2(6.2, 1.05),
      new THREE.Vector2(6.2, 0.55),
      new THREE.Vector2(7.1, 0.55),
      new THREE.Vector2(7.1, -0.55),
      new THREE.Vector2(6.6, -0.55),
      new THREE.Vector2(6.6, -1.05),
    ];
    const gasketGeo = markHiRes(new THREE.LatheGeometry(prof, 36, Math.PI * 0.25, Math.PI * 1.5));
    gasketGeo.computeVertexNormals();
    const ppCrimp = new THREE.Mesh(gasketGeo, mats.ceramicAlumina);
    const steelFold = new THREE.Mesh(
      hiResTorus(7.45, 0.36, 12, 34, Math.PI * 1.5),
      mats.stainlessMachined
    );
    steelFold.rotation.x = Math.PI / 2;
    steelFold.rotation.z = -Math.PI * 0.25;
    steelFold.position.y = 0.92;
    g.add(ppCrimp, steelFold);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-double-seam-crimp-gasket',
        88,
        '#f8fafc',
        g,
        new THREE.Vector3(-9.5, 17.2, 0),
        new THREE.Vector3(-122, 22, -38),
        cp
      )
    );
  }

  // P89. Ultrasonic Solid-State Al-Cu / Al-Ni Weld Interface & Micro-Nuggets
  {
    const g = new THREE.Group();
    const alSlab = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.44, 4.4, 0.3, 0.04, 'y'),
      mats.silverElectrode
    );
    const cuSlab = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.44, 4.4, 0.3, 0.04, 'y'),
      mats.copperHeatSpreader
    );
    cuSlab.position.y = -0.52;
    // Ultra-thin solid-state nano-IMC fusion zone glowing gold between Al and Cu
    const imcLine = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.14, 4.3), mats.goldPlating);
    imcLine.position.y = -0.26;
    imcLine.userData.noEdges = true;
    // 3×3 ultrasonic sonotrode waffle-knurl grip dimples stamped on top face
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const knurl = new THREE.Mesh(
          createChamferedBoxGeo(0.85, 0.22, 0.85, 0.12, 0.03, 'y'),
          mats.titaniumRivet
        );
        knurl.position.set(ix * 1.4, 0.28, iz * 1.1);
        knurl.userData.noEdges = true;
        g.add(knurl);
      }
    }
    g.add(alSlab, cuSlab, imcLine);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-ultrasonic-imc-weld-zone',
        89,
        '#fbbf24',
        g,
        new THREE.Vector3(-9.5, -22.2, 0),
        new THREE.Vector3(-110, -68, 22),
        cp
      )
    );
  }

  // P90. Thermal & Drop Shock-Absorbing Omega-Loop Nickel Busbar Flexure
  {
    const g = new THREE.Group();
    // Precision stamped Ni-200 busbar featuring dual Ω-shaped accordion flexure loops!
    const omegaPts: THREE.Vector3[] = [
      new THREE.Vector3(-8.2, 0, 0),
      new THREE.Vector3(-4.2, 0, 0),
      new THREE.Vector3(-3.0, 1.85, 0),
      new THREE.Vector3(-1.4, 2.15, 0),
      new THREE.Vector3(-0.6, 0.35, 0),
      new THREE.Vector3(0.6, 0.35, 0),
      new THREE.Vector3(1.4, 2.15, 0),
      new THREE.Vector3(3.0, 1.85, 0),
      new THREE.Vector3(4.2, 0, 0),
      new THREE.Vector3(8.2, 0, 0),
    ];
    const ribbon = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(omegaPts), 48, 0.32, 8, false)),
      mats.stainlessMachined
    );
    const padL = new THREE.Mesh(createChamferedBoxGeo(3.2, 0.36, 3.0, 0.3, 0.04, 'y'), mats.stainlessMachined);
    padL.position.set(-8.2, 0, 0);
    const padR = new THREE.Mesh(createChamferedBoxGeo(3.2, 0.36, 3.0, 0.3, 0.04, 'y'), mats.stainlessMachined);
    padR.position.set(8.2, 0, 0);
    const nuggets = buildSpotWeldNuggets(
      [
        [-8.2, 0.22, -0.65],
        [-8.2, 0.22, 0.65],
        [8.2, 0.22, -0.65],
        [8.2, 0.22, 0.65],
      ],
      0.38,
      'y',
      mats.brassGear,
      mats.goldPlating
    );
    g.add(ribbon, padL, padR, nuggets);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-busbar-strain-relief-omega',
        90,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -22.2, 3.6),
        new THREE.Vector3(-4, -96, 46),
        cp
      )
    );
  }

  // =========================================================================
  // GROUP 3: P91–P100 — 2026 SMART BMS, EIS, USB PD 3.2, GaN & EU PASSPORT
  // =========================================================================

  // P91. Online EIS Electrochemical Impedance Spectroscopy Predictive SoH IC (2026)
  {
    const g = new THREE.Group();
    const ic = buildChipPackage({
      w: 4.8,
      d: 4.8,
      h: 0.96,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.batEisNyquistDie,
      leadMat: mats.goldPlating,
      topAccentMat: u.batEisNyquistDie,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    // Sculpted 3D Nyquist semicircle impedance plot arc hovering above the EIS die!
    const nyquistArc = new THREE.Mesh(
      hiResTorus(1.15, 0.14, 10, 26, Math.PI),
      mats.vcWorkingFluidCyan
    );
    nyquistArc.position.set(-0.4, 0.62, 0);
    nyquistArc.userData.noEdges = true;
    const warburgTail = new THREE.Mesh(hiResCyl(0.11, 0.11, 1.5, 10), mats.goldPlating);
    warburgTail.position.set(1.22, 1.12, 0);
    warburgTail.rotation.z = -Math.PI * 0.25;
    warburgTail.userData.noEdges = true;
    g.add(ic, nyquistArc, warburgTail);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-eis-impedance-engine',
        91,
        '#06b6d4',
        g,
        new THREE.Vector3(-4.2, 18.8, 0.2),
        new THREE.Vector3(-82, 76, 52),
        cp
      )
    );
  }

  // P92. USB PD 3.2 SPR AVS (100 mV Adjustable Voltage Supply) Controller IC (2026)
  {
    const g = new THREE.Group();
    const pdIc = buildChipPackage({
      w: 4.6,
      d: 4.6,
      h: 0.92,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.batEisNyquistDie,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    // Stepped 100 mV AVS dynamic voltage ladder bars atop package
    for (let i = 0; i < 4; i++) {
      const hBar = 0.28 + i * 0.24;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.65, hBar, 2.2, 0.1, 0.03, 'y'),
        i < 2 ? mats.vcWorkingFluidCyan : mats.goldPlating
      );
      bar.position.set(-1.35 + i * 0.9, 0.56 + hBar * 0.5, 0);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    const ccInd = buildSmdPassive(1.5, 0.82, 0.62, mats.ferriteInductor, mats.silverElectrode, 'y');
    ccInd.position.set(0, -0.1, 3.1);
    g.add(pdIc, ccInd);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-usb-pd32-spr-avs-ctrl',
        92,
        '#f59e0b',
        g,
        new THREE.Vector3(9.8, 18.8, 1.8),
        new THREE.Vector3(88, 76, 54),
        cp
      )
    );
  }

  // P93. High-Frequency 2 MHz GaN Integrated Buck-Boost Charger Power Stage
  {
    const g = new THREE.Group();
    // Dual-side cooled GaN half-bridge power stage + miniature flat-wire metal-alloy inductor
    const ganPkg = buildChipPackage({
      w: 4.2,
      d: 3.4,
      h: 0.88,
      style: 'dfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.copperHeatSpreader,
      topAccentMat: mats.silverElectrode,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    ganPkg.position.x = -2.1;
    const ganInd = buildShieldedInductor(
      3.4,
      1.65,
      mats.ferriteInductor,
      mats.copperHeatSpreader,
      mats.goldPlating,
      'y'
    );
    ganInd.position.set(2.25, 0.28, 0);
    g.add(ganPkg, ganInd);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-gan-sync-buckboost-stage',
        93,
        '#10b981',
        g,
        new THREE.Vector3(9.6, 18.6, -2.6),
        new THREE.Vector3(112, 68, 12),
        cp
      )
    );
  }

  // P94. Lossless Switched-Capacitor Active 2S Cell Balancing Stage
  {
    const g = new THREE.Group();
    const swIc = buildChipPackage({
      w: 3.8,
      d: 3.2,
      h: 0.84,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    // Twin large X7R flying charge-transfer bucket capacitors bridging Cell-1 & Cell-2
    for (const sx of [-2.9, 2.9]) {
      const flyCap = buildTantalumCap(
        2.1,
        1.35,
        0.95,
        mats.tantalumCapYellow,
        mats.copperHeatSpreader,
        mats.silverElectrode,
        'y'
      );
      flyCap.position.set(sx, 0, 0);
      g.add(flyCap);
    }
    g.add(swIc);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-active-switched-cap-bal',
        94,
        '#14b8a6',
        g,
        new THREE.Vector3(4.4, 18.8, -2.6),
        new THREE.Vector3(56, 84, -46),
        cp
      )
    );
  }

  // P95. EU Digital Battery Passport (71 Data Points) & PQC Secure Element (2026–2027)
  {
    const g = new THREE.Group();
    const seIc = buildChipPackage({
      w: 4.5,
      d: 4.5,
      h: 0.96,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.batEisNyquistDie,
      leadMat: mats.goldPlating,
      topAccentMat: u.batEisNyquistDie,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    // Gold tamper-mesh anti-probe shield vault lid frame
    const vaultFrame = makeHiResHorizPlate(
      createFrameShape(4.1, 4.1, 0.35, 3.2, 3.2, 0.25),
      0.24,
      mats.goldPlating,
      0.03,
      1,
      16
    );
    vaultFrame.position.y = 0.62;
    g.add(seIc, vaultFrame);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-pqc-eui-passport-se',
        95,
        '#a855f7',
        g,
        new THREE.Vector3(2.8, 18.9, 2.4),
        new THREE.Vector3(36, 82, 62),
        cp
      )
    );
  }

  // P96. Anti-Spark Inrush Current Soft-Start & Camera Capacitor Pre-Charge Stage
  {
    const g = new THREE.Group();
    const softFet = buildChipPackage({
      w: 3.1,
      d: 2.6,
      h: 0.8,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    const pulseRes = buildSmdPassive(2.6, 1.4, 0.72, mats.cinnabarAnodized, mats.goldPlating, 'y');
    pulseRes.position.set(3.2, -0.05, 0);
    const slewCap = buildSmdPassive(1.5, 0.85, 0.62, mats.smdCeramic, mats.silverElectrode, 'y');
    slewCap.position.set(-2.5, -0.1, 0);
    g.add(softFet, pulseRes, slewCap);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-inrush-softstart-precharge',
        96,
        '#f97316',
        g,
        new THREE.Vector3(-9.6, 18.8, 2.8),
        new THREE.Vector3(-108, 68, 16),
        cp
      )
    );
  }

  // P97. High-Side N-MOSFET Charge-Pump Gate Driver & Vgs Zener Clamp
  {
    const g = new THREE.Group();
    const drv = buildChipPackage({
      w: 3.6,
      d: 2.9,
      h: 0.84,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.bodyRecRed,
      axis: 'y',
    });
    // Twin flying charge-pump ceramic boost caps + Zener Vgs protective clamp diode
    for (const sz of [-2.2, 2.2]) {
      const cap = buildSmdPassive(1.5, 0.82, 0.62, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(-0.9, -0.1, sz);
      g.add(cap);
    }
    const zener = buildSmdPassive(1.75, 0.92, 0.64, mats.matteBlackAnodized, mats.goldPlating, 'y', mats.varistorRingBlue);
    zener.position.set(1.4, -0.1, 2.2);
    g.add(drv, zener);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-mosfet-chargepump-driver',
        97,
        '#ef4444',
        g,
        new THREE.Vector3(-8.0, 18.8, -0.8),
        new THREE.Vector3(-96, 76, -36),
        cp
      )
    );
  }

  // P98. Sub-1 μA Deep-Sleep Ship-Mode & Charger-Plug Wakeup Comparator
  {
    const g = new THREE.Group();
    const wakeIc = buildChipPackage({
      w: 2.9,
      d: 2.2,
      h: 0.78,
      style: 'sot23',
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    // Twin megaohm ultra-low-leakage wake divider resistors
    for (const sx of [-2.2, 2.2]) {
      const rMeg = buildSmdPassive(1.35, 0.72, 0.52, mats.mountShimBlue, mats.silverElectrode, 'y');
      rMeg.position.set(sx, -0.14, 0);
      g.add(rMeg);
    }
    g.add(wakeIc);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-low-power-wake-comparator',
        98,
        '#3b82f6',
        g,
        new THREE.Vector3(7.4, 18.8, 0.2),
        new THREE.Vector3(98, 76, -34),
        cp
      )
    );
  }

  // P99. BMS 4-Layer Heavy-Copper Thermal Via Farm & MOSFET Heat-Spreading Island
  {
    const g = new THREE.Group();
    const topPour = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.22, 4.8, 0.35, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    topPour.position.y = 0.56;
    const botPour = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.22, 4.8, 0.35, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    botPour.position.y = -0.56;
    // Translucent FR-4 core + 5×3 grid of gold-plated copper-filled thermal chimney micro-vias
    const core = new THREE.Mesh(
      createChamferedBoxGeo(7.2, 0.9, 4.4, 0.3, 0.03, 'y'),
      u.batBmsPcb
    );
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const via = new THREE.Mesh(hiResCyl(0.24, 0.24, 1.38, 12), mats.goldPlating);
        via.position.set(ix * 1.35, 0, iz * 1.35);
        via.userData.noEdges = true;
        g.add(via);
      }
    }
    g.add(topPour, botPour, core);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-zero-ohm-thermal-via-array',
        99,
        '#ea580c',
        g,
        new THREE.Vector3(-5.8, 18.4, -2.0),
        new THREE.Vector3(-48, 84, -52),
        cp
      )
    );
  }

  // P100. Safety Black-Box Fault Logger FRAM & Permanent-Fail (PF) Fuse Controller
  {
    const g = new THREE.Group();
    const fram = buildChipPackage({
      w: 4.4,
      d: 3.6,
      h: 0.92,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: u.batEisNyquistDie,
      leadMat: mats.goldPlating,
      topAccentMat: u.batEisNyquistDie,
      pin1Mat: mats.bodyRecRed,
      axis: 'y',
    });
    // Crimson Permanent-Fail (PF) blow-trigger MOSFET + diagnostic gold readback pad bar
    const pfFet = buildSmdPassive(2.0, 1.15, 0.68, mats.bodyRecRed, mats.goldPlating, 'y');
    pfFet.position.set(0, -0.08, 2.85);
    const diagBar = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.16, 0.82, 0.15, 0.02, 'y'),
      mats.goldPlating
    );
    diagBar.position.set(0, -0.32, -2.6);
    diagBar.userData.noEdges = true;
    g.add(fram, pfFet, diagBar);

    parts.push(
      finalizeBatteryUltra30Part(
        'bat-blackbox-fault-logger',
        100,
        '#dc2626',
        g,
        new THREE.Vector3(0.0, 18.8, -1.0),
        new THREE.Vector3(-24, 88, 24),
        cp
      )
    );
  }

  return parts;
}
