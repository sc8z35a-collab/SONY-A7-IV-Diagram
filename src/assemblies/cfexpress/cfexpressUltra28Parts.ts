import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeCfexpressUltra28Part(
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
    subsystem: 'cfexpress',
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
 * Phase 28 — Standalone CFexpress 4.0 Card Ultra-Microscopic & 2026 Cutting-Edge Expansion
 * (+30 Parts C71–C100 -> 100 Total Parts!).
 *
 * Covers:
 *  - C71–C77: Connector 3-Layer Metallurgy (30μin Co-Au / Ni Barrier), PCIe Gen4 AC-Cap Antipad Void,
 *             10° Spread E-Glass Weave Skew Mitigation, λ/20 Via Fence + Teardrops, 30μm DBS Film,
 *             ENEPIG (Ni-Pd-Au) Substrate Finish & NSMD BGA Solder-Mask Dams.
 *  - C78–C87: 2026 3D NAND Atomic Architecture (Macaroni Poly-Si Channel, Multi-Deck Inter-Deck Joint & IDB,
 *             -70°C Cryo HARC Etch, Barrierless Molybdenum Wordlines, Wordline Air-Gap Isolation,
 *             Slit Trench CSL Tungsten Wall, BiCS10 On-Pitch SGD + GIDL, Dummy Edge WLs,
 *             6-Plane Independent Read MPIR Floorplan & Wafer Crack-Stopper Seal Ring).
 *  - C88–C91: 2026 ONFI 6.0 / Toggle DDR 6.0 (4.8 Gb/s SCA Bus, PI-LTT VccQL -34% Power I/O,
 *             0.1% 240Ω ZQ Calibration + ODT Ladder, DCC/WDCA/Per-Pin VrefQ Eye-Pattern Trainer).
 *  - C92–C100: 2026 CFA VPG Profile 5.0 (VPG800/1600 Preconditioning), NVMe 2.4 Post-Quantum Crypto & PUF,
 *              PCIe ASPM L1.2 / NVMe PS0–PS4 FSM, NVMe HCTM 18-Step Thermal Engine, Dynamic Vth Valley Tracker,
 *              LFSR Data Scrambler, PMIC OVP/UVLO/OCP Window Guard, USB4 40Gbps MRW-G3 Thermal Dock &
 *              6-Layer Environmental Protection Shield (X-Ray / Magnetic / UV / ESD).
 */
export function buildCfexpressUltra28Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // C71. 30 μin Cobalt-Hardened Gold + 150 μin Nickel Diffusion Barrier Cross-Section
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4-tier metallurgical cutaway slab of an edge finger:
    // 1) Pure Copper base pad  2) Electroplated Nickel diffusion barrier  3) Cobalt-Hardened Gold armor  4) Micro pore-sealer cap
    const cuBase = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 3.8, 0.24, 0.24, 0.04, 'z'),
      mats.copperCoil
    );
    cuBase.position.z = -0.24;

    const niBarrier = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 3.65, 0.22, 0.22, 0.04, 'z'),
      mats.stainlessMachined
    );
    niBarrier.position.z = 0.02;

    const coAuTop = new THREE.Mesh(
      createChamferedBoxGeo(11.2, 3.5, 0.18, 0.2, 0.04, 'z'),
      mats.goldPlating
    );
    coAuTop.position.z = 0.24;

    // 5 stepped individual metallurgical sample fingers illustrating wear-resistant plating thickness!
    for (let i = 0; i < 5; i++) {
      const fx = -4.2 + i * 2.1;
      const tip = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 2.75, 0.12, 0.22, 0.03, 'z'),
        mats.rfGoldCoax
      );
      tip.position.set(fx, -0.15, 0.36);
      tip.userData.noEdges = true;
      g.add(tip);
    }

    g.add(cuBase, niBarrier, coAuTop);
    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-hard-gold-ni-barrier',
        71,
        '#facc15',
        g,
        new THREE.Vector3(-4.5, -24.4, 0.05),
        new THREE.Vector3(-26, -92, 42),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C72. PCIe Gen4 AC-Coupling Capacitor Ground Reference Anti-Pad Void Cutout
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual internal copper GND reference layers (L2 & L3) with laser-carved rectangular anti-pad voids
    // directly beneath the 0201 AC-coupling pads so parasitic pad capacitance cancels out cleanly at 85 Ω!
    const l2Void = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.8, 5.8, 0.45, 9.6, 2.8, 0.28), 0.14, 0.02, 0.02, 1, 16),
      u.cfeCopperThermal
    );
    l2Void.position.z = 0.14;

    const l3Void = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.8, 5.8, 0.45, 8.8, 2.2, 0.24), 0.14, 0.02, 0.02, 1, 16),
      mats.copperCoil
    );
    l3Void.position.z = -0.18;

    // Dielectric core visible inside the carved void window + 4 floating gold SMT pad pairs
    const coreWindow = new THREE.Mesh(
      createChamferedBoxGeo(9.4, 2.6, 0.18, 0.2, 0.02, 'z'),
      u.cfeGlassWeaveCore
    );
    coreWindow.position.z = -0.02;
    coreWindow.userData.noEdges = true;

    for (let i = 0; i < 4; i++) {
      const px = -3.9 + i * 2.6;
      for (const py of [-0.72, 0.72]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.72, 0.08), mats.goldPlating);
        pad.position.set(px, py, 0.28);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }

    g.add(l2Void, l3Void, coreWindow);
    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-ac-cap-antipad-void',
        72,
        '#06b6d4',
        g,
        new THREE.Vector3(-2.0, -18.5, 0.24),
        new THREE.Vector3(-64, -92, 18),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C73. Low-Dk Spread E-Glass Weave Core & 10° Rotated Skew-Free Routing
  // =========================================================================
  {
    const g = new THREE.Group();
    // Spread 1067 E-glass woven dielectric slab with bespoke woven glass texture
    const weaveGeo = createChamferedBoxGeo(12.4, 8.6, 0.26, 0.45, 0.04, 'z');
    applyPlanarUVs(weaveGeo, 12.4, 8.6, 'xy');
    const weaveSlab = new THREE.Mesh(weaveGeo, u.cfeGlassWeaveCore);
    g.add(weaveSlab);

    // Physical woven glass warp/weft micro-ribbons embossed slightly across the cutaway
    for (let r = -2; r <= 2; r++) {
      const weft = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.24, 0.06), mats.interlayerDielectric);
      weft.position.set(0, r * 1.45, 0.15);
      weft.userData.noEdges = true;
      g.add(weft);
    }
    for (let c = -3; c <= 3; c++) {
      const warp = new THREE.Mesh(new THREE.BoxGeometry(0.24, 7.8, 0.06), mats.interlayerDielectric);
      warp.position.set(c * 1.65, 0, 0.16);
      warp.userData.noEdges = true;
      g.add(warp);
    }

    // 10-degree angled zig-zag differential PCIe Gen4 copper pair crossing weave uniformly (zero skew!)
    for (const offset of [-0.52, 0.52]) {
      const pts = [
        new THREE.Vector3(-5.2, offset - 0.9, 0.24),
        new THREE.Vector3(-1.8, offset + 0.15, 0.24),
        new THREE.Vector3(1.8, offset - 0.35, 0.24),
        new THREE.Vector3(5.2, offset + 0.7, 0.24),
      ];
      const curve = new THREE.CatmullRomCurve3(pts);
      const trace = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(curve, 24, 0.13, 6, false)),
        offset < 0 ? mats.copperCoil : mats.goldPlating
      );
      trace.userData.noEdges = true;
      g.add(trace);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-glass-weave-rotated',
        73,
        '#10b981',
        g,
        new THREE.Vector3(-3.0, -14.0, -0.18),
        new THREE.Vector3(-102, -56, -24),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C74. Perimeter λ/20 GND Stitching Via Fence & Teardrop Trace Fillets
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-crisp internal microwave picket fence surrounding PCB perimeter (38 gold vias + top/bottom GND guard rails!)
    const topRail = new THREE.Mesh(
      extrudeHiRes(createFrameShape(32.2, 44.6, 1.35, 31.1, 43.5, 1.15), 0.12, 0.02, 0.02, 1, 18),
      mats.goldPlating
    );
    topRail.position.z = 0.42;
    const botRail = new THREE.Mesh(
      extrudeHiRes(createFrameShape(32.2, 44.6, 1.35, 31.1, 43.5, 1.15), 0.12, 0.02, 0.02, 1, 18),
      mats.copperCoil
    );
    botRail.position.z = -0.42;
    g.add(topRail, botRail);

    const viaPositions: Array<[number, number]> = [];
    for (let i = -5; i <= 5; i++) {
      viaPositions.push([-15.8, i * 3.8], [15.8, i * 3.8]);
    }
    for (let j = -3; j <= 3; j++) {
      viaPositions.push([j * 4.2, 22.0], [j * 4.2, -22.0]);
    }
    const viaGeo = hiResCyl(0.26, 0.26, 0.92, 10).rotateX(Math.PI / 2);
    const viaInst = new THREE.InstancedMesh(viaGeo, mats.goldPlating, viaPositions.length);
    const dm = new THREE.Object3D();
    viaPositions.forEach(([vx, vy], idx) => {
      dm.position.set(vx, vy, 0);
      dm.updateMatrix();
      viaInst.setMatrixAt(idx, dm.matrix);
    });
    viaInst.instanceMatrix.needsUpdate = true;
    viaInst.userData.noEdges = true;
    g.add(viaInst);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-perimeter-via-fence',
        74,
        '#eab308',
        g,
        new THREE.Vector3(0, 0.6, 0),
        new THREE.Vector3(106, -54, 16),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C75. 30 μm Ultra-Thin NAND Die Backside Support Film (DBS) & Stealth-Dice Edge
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-thin iridescent silicon die backed by amber polyimide DBS anti-warpage liner & laser kerf guard!
    const thinDieGeo = createChamferedBoxGeo(14.8, 10.6, 0.14, 0.18, 0.02, 'z');
    applyPlanarUVs(thinDieGeo, 14.8, 10.6, 'xy');
    const thinDie = new THREE.Mesh(thinDieGeo, u.bionzDieFloorplan);
    thinDie.position.z = 0.14;

    const dbsFilm = new THREE.Mesh(
      createChamferedBoxGeo(15.2, 11.0, 0.12, 0.24, 0.02, 'z'),
      mats.polyimideFpc
    );
    dbsFilm.position.z = -0.06;

    // Laser stealth-dicing beveled stress-relief rim framing the wafer cut edge
    const kerfRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.5, 11.3, 0.26, 14.5, 10.3, 0.18), 0.22, 0.04, 0.04, 2, 14),
      mats.siliconBulk
    );
    kerfRim.position.z = 0.06;
    g.add(thinDie, dbsFilm, kerfRim);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-die-backside-dbs-film',
        75,
        '#d97706',
        g,
        new THREE.Vector3(0, 12.6, 0.92),
        new THREE.Vector3(-114, 58, -18),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C76. ENEPIG (Electroless Ni-Pd-Au) 3-Layer Wirebond Pad & Anti-Black-Pad Barrier
  // =========================================================================
  {
    const g = new THREE.Group();
    const subCarrier = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 6.2, 0.22, 0.35, 0.04, 'z'),
      u.bionzAbfSubstrate
    );
    subCarrier.position.z = -0.18;
    g.add(subCarrier);

    // 8 ultra-crisp 3-layer metallurgical wirebond landing fingers:
    // Bottom Cu -> Mid Ni -> Silvery-Platinum Palladium (Pd) Shield -> Top Gold (Au) Bonding Surface!
    for (let i = 0; i < 8; i++) {
      const px = -4.55 + i * 1.3;
      const niPad = new THREE.Mesh(new THREE.BoxGeometry(0.86, 4.2, 0.12), mats.stainlessMachined);
      niPad.position.set(px, 0, 0.02);
      niPad.userData.noEdges = true;

      const pdShield = new THREE.Mesh(new THREE.BoxGeometry(0.82, 3.9, 0.09), mats.silverElectrode);
      pdShield.position.set(px, 0, 0.13);
      pdShield.userData.noEdges = true;

      const auCap = new THREE.Mesh(new THREE.BoxGeometry(0.76, 3.6, 0.08), mats.goldPlating);
      auCap.position.set(px, 0, 0.22);
      auCap.userData.noEdges = true;

      g.add(niPad, pdShield, auCap);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-enepig-wirebond-pad',
        76,
        '#cbd5e1',
        g,
        new THREE.Vector3(8.5, 12.6, 0.85),
        new THREE.Vector3(-116, 16, 46),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C77. Fine-Pitch 0.4 mm BGA NSMD Copper Pads & Solder-Mask Dam Grid
  // =========================================================================
  {
    const g = new THREE.Group();
    // Green high-precision solder-mask dam grid framing 5×5 exposed NSMD copper lands & SAC305 fillets
    const basePcb = new THREE.Mesh(
      createChamferedBoxGeo(10.6, 10.6, 0.22, 0.4, 0.04, 'z'),
      u.cfeHdiPcb
    );
    basePcb.position.z = -0.14;
    g.add(basePcb);

    // Raised solder-mask anti-bridge dam ribs separating every single BGA column & row!
    for (let i = -2; i <= 2; i++) {
      const hDam = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.26, 0.18), mats.cfaGreen);
      hDam.position.set(0, i * 1.9, 0.04);
      hDam.userData.noEdges = true;
      const vDam = new THREE.Mesh(new THREE.BoxGeometry(0.26, 9.6, 0.18), mats.cfaGreen);
      vDam.position.set(i * 1.9, 0, 0.04);
      vDam.userData.noEdges = true;
      g.add(hDam, vDam);
    }

    // 4×4 exposed circular NSMD copper pads + spherical SAC305 solder fillets (InstancedMesh!)
    const padGeo = hiResCyl(0.54, 0.54, 0.12, 16).rotateX(Math.PI / 2);
    const filletGeo = hiResSphere(0.36, 10, 8);
    const padInst = new THREE.InstancedMesh(padGeo, mats.copperHybridBond, 16);
    const filletInst = new THREE.InstancedMesh(filletGeo, mats.solderBallSilver, 16);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const bx = -2.85 + c * 1.9;
        const by = -2.85 + r * 1.9;
        dm.position.set(bx, by, 0.04);
        dm.updateMatrix();
        padInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(bx, by, 0.26);
        dm.updateMatrix();
        filletInst.setMatrixAt(idx, dm.matrix);
        idx++;
      }
    }
    padInst.instanceMatrix.needsUpdate = true;
    filletInst.instanceMatrix.needsUpdate = true;
    padInst.userData.noEdges = true;
    filletInst.userData.noEdges = true;
    g.add(padInst, filletInst);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-bga-solder-mask-dam',
        77,
        '#22c55e',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.52),
        new THREE.Vector3(-112, -26, -52),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C78. Macaroni Hollow Polysilicon Channel & Central SiO₂ Oxide Core Filler
  // =========================================================================
  {
    const g = new THREE.Group();
    const tilt = new THREE.Group();
    // Concentric cutaway of a single 80 nm Macaroni-Channel 3D NAND pillar:
    // Center pure quartz SiO2 filler core -> Thin hollow Poly-Si electron tube -> ONO dielectric collar -> Mo gate rings!
    const oxideCore = new THREE.Mesh(hiResCyl(0.82, 0.82, 4.4, 28), mats.quartzOlpf);
    const polyTube = new THREE.Mesh(
      hiResCyl(1.42, 1.42, 3.8, 32, true, 0, Math.PI * 1.55),
      mats.gatePolysilicon
    );
    const onoSleeve = new THREE.Mesh(
      hiResCyl(1.98, 1.98, 3.2, 32, true, 0, Math.PI * 1.3),
      mats.loficDielectric
    );
    for (let k = -2; k <= 2; k++) {
      const gateRing = new THREE.Mesh(hiResTorus(2.28, 0.16, 10, 30, Math.PI * 1.25), u.cfeMolyWordlineMetal);
      gateRing.rotation.x = Math.PI / 2;
      gateRing.position.y = k * 0.62;
      gateRing.userData.noEdges = true;
      tilt.add(gateRing);
    }
    tilt.add(oxideCore, polyTube, onoSleeve);
    tilt.rotation.x = Math.PI * 0.38;
    tilt.rotation.z = 0.22;
    g.add(tilt);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-macaroni-channel-core',
        78,
        '#38bdf8',
        g,
        new THREE.Vector3(-4.0, 14.2, 1.22),
        new THREE.Vector3(-32, 96, 68),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C79. Multi-Deck (2–3 Tier) Inter-Deck Channel Joint & P+ IDB Erase Collar
  // =========================================================================
  {
    const g = new THREE.Group();
    // Lower deck stack + upper deck stack meeting precisely at an N+ poly-Si inter-deck connector + P+ IDB ring!
    const lowerDeck = new THREE.Mesh(
      createChamferedBoxGeo(9.6, 5.2, 0.72, 0.3, 0.06, 'z'),
      u.bionzIpDieTile
    );
    lowerDeck.position.z = -0.68;

    const upperDeck = new THREE.Mesh(
      createChamferedBoxGeo(9.6, 5.2, 0.72, 0.3, 0.06, 'z'),
      u.bionzCetusDie
    );
    upperDeck.position.z = 0.68;

    // P+ Inter-Deck-Body (IDB) hole-injection plane seated cleanly between decks
    const idbPlane = new THREE.Mesh(
      createChamferedBoxGeo(10.0, 5.6, 0.24, 0.32, 0.04, 'z'),
      mats.cinnabarAnodized
    );
    g.add(lowerDeck, upperDeck, idbPlane);

    // 3×2 vertical dual-deck pillars with flared trumpet-shaped N+ joint collars at z = 0
    for (const px of [-2.8, 0, 2.8]) {
      for (const py of [-1.25, 1.25]) {
        const lowP = new THREE.Mesh(hiResCyl(0.34, 0.28, 1.05, 16).rotateX(Math.PI / 2), mats.siliconPhotodiode);
        lowP.position.set(px, py, -0.58);
        lowP.userData.noEdges = true;

        const jointCollar = new THREE.Mesh(hiResCyl(0.56, 0.56, 0.38, 18).rotateX(Math.PI / 2), mats.goldPlating);
        jointCollar.position.set(px, py, 0);
        jointCollar.userData.noEdges = true;

        const upP = new THREE.Mesh(hiResCyl(0.38, 0.30, 1.05, 16).rotateX(Math.PI / 2), mats.vcWorkingFluidCyan);
        upP.position.set(px, py, 0.58);
        upP.userData.noEdges = true;

        g.add(lowP, jointCollar, upP);
      }
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-inter-deck-channel-joint',
        79,
        '#f97316',
        g,
        new THREE.Vector3(0, 15.2, 1.18),
        new THREE.Vector3(0, 102, 42),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C80. -70°C Cryogenic Plasma HARC (>100:1 Aspect Ratio) Channel Hole Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // 6-tier dielectric monolith pierced by 4×2 ultra-straight >100:1 aspect-ratio cryo-etched nano-holes
    const cryoBlock = new THREE.Mesh(
      createChamferedBoxGeo(9.8, 5.8, 1.65, 0.32, 0.08, 'z'),
      mats.interlayerDielectric
    );
    g.add(cryoBlock);

    // Cryogenic cyan plasma-beam halo ring floating cleanly at the etch entry face
    const cryoRing = new THREE.Mesh(hiResTorus(3.2, 0.16, 10, 32), mats.vcWorkingFluidCyan);
    cryoRing.position.z = 1.02;
    cryoRing.userData.noEdges = true;
    g.add(cryoRing);

    const holeGeo = hiResCyl(0.32, 0.32, 1.88, 16).rotateX(Math.PI / 2);
    const holeInst = new THREE.InstancedMesh(holeGeo, mats.siliconTsvDram, 12);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        dm.position.set(-3.15 + c * 2.1, -1.6 + r * 1.6, 0);
        dm.updateMatrix();
        holeInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    holeInst.instanceMatrix.needsUpdate = true;
    holeInst.userData.noEdges = true;
    g.add(holeInst);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-cryo-harc-etch-pillar',
        80,
        '#06b6d4',
        g,
        new THREE.Vector3(4.5, 14.2, 1.22),
        new THREE.Vector3(34, 96, 68),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C81. 2026 Barrierless Molybdenum (Mo) Wordlines & Sub-30 nm Z-Pitch Stack
  // =========================================================================
  {
    const g = new THREE.Group();
    // 7 ultra-sleek silvery-blue Barrierless Molybdenum horizontal wordline sheets (zero TiN glue liner!)
    // interleaved with ultra-thin alumina-oxide dielectric spacers!
    for (let k = 0; k < 7; k++) {
      const isMo = k % 2 === 0;
      const sheet = new THREE.Mesh(
        createChamferedBoxGeo(10.8, 5.8, isMo ? 0.15 : 0.08, 0.22, 0.02, 'z'),
        isMo ? u.cfeMolyWordlineMetal : mats.aluminaHighKFilm
      );
      sheet.position.z = (k - 3) * 0.22;
      g.add(sheet);
    }
    // 3 vertical memory channel pillars passing cleanly through the sub-30 nm Molybdenum stack
    for (const px of [-3.2, 0, 3.2]) {
      const ch = new THREE.Mesh(hiResCyl(0.42, 0.42, 1.65, 18).rotateX(Math.PI / 2), mats.goldPlating);
      ch.position.set(px, 0, 0);
      ch.userData.noEdges = true;
      g.add(ch);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-barrierless-moly-wl',
        81,
        '#94a3b8',
        g,
        new THREE.Vector3(-6.2, 14.5, 1.15),
        new THREE.Vector3(-68, 94, 34),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C82. Inter-Wordline Nanoscale Air-Gap Isolation (k = 1.0 Z-Interference Shield)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Horizontal Molybdenum/Tungsten gate fins separated by recessed dark-cyan nanoscale air-gap voids!
    for (let k = 0; k < 5; k++) {
      const zPos = (k - 2) * 0.34;
      const wl = new THREE.Mesh(
        createChamferedBoxGeo(10.2, 5.4, 0.14, 0.2, 0.02, 'z'),
        u.cfeMolyWordlineMetal
      );
      wl.position.z = zPos;
      g.add(wl);
      if (k < 4) {
        // Recessed air-gap pinch-off cavity between adjacent wordlines (k = 1.0 air insulator!)
        const airPocket = new THREE.Mesh(
          createChamferedBoxGeo(8.2, 4.2, 0.14, 0.25, 0.02, 'z'),
          mats.vcWorkingFluidCyan
        );
        airPocket.position.z = zPos + 0.17;
        airPocket.userData.noEdges = true;
        g.add(airPocket);
      }
    }
    // Side pinch-off oxide seal wall locking the vacuum/air cavities in place
    const pinchCap = new THREE.Mesh(
      createChamferedBoxGeo(0.85, 5.5, 1.56, 0.14, 0.04, 'z'),
      mats.ftiOxide
    );
    pinchCap.position.x = 5.1;
    g.add(pinchCap);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-wordline-airgap-iso',
        82,
        '#38bdf8',
        g,
        new THREE.Vector3(6.2, 14.5, 1.15),
        new THREE.Vector3(68, 94, 34),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C83. Slit Trench (Gate-Line Slit) & Common Source Line (CSL) Tungsten Wall
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left & right memory array blocks divided cleanly by a deep vertical Slit Trench filled with oxide liner + tungsten CSL wall!
    for (const sx of [-3.4, 3.4]) {
      const arrayHalf = new THREE.Mesh(
        createChamferedBoxGeo(4.2, 6.2, 1.25, 0.2, 0.05, 'z'),
        u.bionzIpDieTile
      );
      arrayHalf.position.x = sx;
      g.add(arrayHalf);
    }
    // Dual oxide isolation sidewalls preventing CSL-to-WL shorts
    for (const lx of [-0.72, 0.72]) {
      const liner = new THREE.Mesh(new THREE.BoxGeometry(0.28, 6.4, 1.38), mats.ftiOxide);
      liner.position.x = lx;
      liner.userData.noEdges = true;
      g.add(liner);
    }
    // Central high-conductivity tungsten Common Source Line (CSL) wall & bottom source contact bar
    const cslWall = new THREE.Mesh(
      createChamferedBoxGeo(1.02, 6.5, 1.48, 0.12, 0.04, 'z'),
      mats.tungstenGrid
    );
    const sourceFloor = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 6.4, 0.24, 0.2, 0.03, 'z'),
      mats.copperHybridBond
    );
    sourceFloor.position.z = -0.76;
    g.add(cslWall, sourceFloor);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-slit-trench-csl-wall',
        83,
        '#64748b',
        g,
        new THREE.Vector3(-4.2, 11.4, 1.15),
        new THREE.Vector3(-36, 98, -26),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C84. BiCS10 On-Pitch Select Gate Drain (OP-SGD) & GIDL Erase Transistor Deck
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper OP-SGD split select bars + lower GIDL hole-injection erase collar sandwiching 4 vertical strings!
    const sgsBase = new THREE.Mesh(
      createChamferedBoxGeo(10.6, 5.4, 0.28, 0.22, 0.04, 'z'),
      mats.cinnabarAnodized
    );
    sgsBase.position.z = -0.62;
    g.add(sgsBase);

    // 4 independently pitch-aligned OP-SGD selector bars (zero wasted dummy strings!)
    for (let i = 0; i < 4; i++) {
      const sgdBar = new THREE.Mesh(
        createChamferedBoxGeo(2.05, 5.2, 0.24, 0.14, 0.03, 'z'),
        i % 2 === 0 ? mats.goldPlating : mats.cfaBlue
      );
      sgdBar.position.set(-3.45 + i * 2.3, 0, 0.62);
      g.add(sgdBar);

      // Vertical memory string shaft linking OP-SGD down to GIDL/SGS erase base
      const shaft = new THREE.Mesh(hiResCyl(0.32, 0.32, 1.35, 16).rotateX(Math.PI / 2), mats.siliconPhotodiode);
      shaft.position.set(-3.45 + i * 2.3, 0, 0);
      shaft.userData.noEdges = true;
      g.add(shaft);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-op-sgd-select-gates',
        84,
        '#2563eb',
        g,
        new THREE.Vector3(4.2, 11.4, 1.15),
        new THREE.Vector3(36, 98, -26),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C85. Edge Dummy Wordlines (Dummy WL) & Fringe-Field Disturb Cushion Stack
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stepped amber dummy cushion wordlines at top & bottom protecting the cool-blue user-data wordlines!
    for (let k = 0; k < 8; k++) {
      const isDummy = k < 2 || k >= 6;
      const layer = new THREE.Mesh(
        createChamferedBoxGeo(9.8, 5.2, 0.12, 0.2, 0.02, 'z'),
        isDummy ? mats.tantalumCapYellow : mats.cfaBlue
      );
      layer.position.z = (k - 3.5) * 0.21;
      g.add(layer);
    }
    for (const px of [-2.6, 2.6]) {
      const p = new THREE.Mesh(hiResCyl(0.36, 0.36, 1.75, 16).rotateX(Math.PI / 2), mats.silverElectrode);
      p.position.set(px, 0, 0);
      p.userData.noEdges = true;
      g.add(p);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-dummy-edge-wordlines',
        85,
        '#f59e0b',
        g,
        new THREE.Vector3(-8.5, 12.6, 1.12),
        new THREE.Vector3(-92, 84, -38),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C86. 2026 BiCS10 / G9 6-Plane Independent Read (MPIR) 332-Layer Silicon Die Floorplan
  // =========================================================================
  {
    const g = new THREE.Group();
    // HERO 2026 Silicon Die showcasing bespoke 6-Plane BiCS10 332-Layer iridescent diffraction floorplan!
    const dieGeo = createChamferedBoxGeo(16.8, 12.2, 0.34, 0.35, 0.05, 'z');
    applyPlanarUVs(dieGeo, 16.8, 12.2, 'xy');
    const diePlate = new THREE.Mesh(dieGeo, u.cfeBiCS10WaferDie);
    g.add(diePlate);

    // 6 subtle raised gold micro-bus headers representing 6 simultaneous independent plane readouts
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const hdr = new THREE.Mesh(
          createChamferedBoxGeo(4.1, 0.55, 0.14, 0.1, 0.02, 'z'),
          mats.goldPlating
        );
        hdr.position.set(-5.0 + c * 5.0, r === 0 ? 1.15 : -1.15, 0.22);
        hdr.userData.noEdges = true;
        g.add(hdr);
      }
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-multiplane-6plane-mpir',
        86,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 12.6, 1.32),
        new THREE.Vector3(0, 96, 96),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C87. Wafer Die Perimeter Crack-Stopper & Moisture Seal Ring Fortress
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual-moat multi-layer Cu/W crack-stopper & moisture guard ring framing the NAND die edge
    const outerMoat = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.8, 10.8, 0.45, 13.3, 9.3, 0.3), 0.42, 0.05, 0.05, 2, 16),
      mats.goldPlating
    );
    const innerMoat = new THREE.Mesh(
      extrudeHiRes(createFrameShape(12.6, 8.6, 0.35, 11.4, 7.4, 0.25), 0.36, 0.04, 0.04, 2, 16),
      mats.copperHybridBond
    );
    innerMoat.position.z = 0.04;
    const passivationLip = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.4, 11.4, 0.52, 14.6, 10.6, 0.42), 0.24, 0.03, 0.03, 1, 16),
      mats.polyimideFpc
    );
    passivationLip.position.z = -0.06;
    g.add(outerMoat, innerMoat, passivationLip);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-wafer-seal-ring-guard',
        87,
        '#d97706',
        g,
        new THREE.Vector3(0, 12.6, 1.02),
        new THREE.Vector3(92, 84, -38),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C88. 2026 Toggle DDR 6.0 (4.8 Gb/s) & SCA (Separate Command Address) Express Bus
  // =========================================================================
  {
    const g = new THREE.Group();
    const bridgeBase = new THREE.Mesh(
      createChamferedBoxGeo(11.8, 6.4, 0.26, 0.3, 0.04, 'z'),
      u.bionzCetusDie
    );
    g.add(bridgeBase);

    // Upper amber dedicated SCA (Separate Command/Address) express lanes — zero data collision!
    for (let k = 0; k < 2; k++) {
      const scaLane = new THREE.Mesh(new THREE.BoxGeometry(9.8, 0.48, 0.16), mats.cinnabarAnodized);
      scaLane.position.set(0, 1.95 - k * 0.85, 0.2);
      scaLane.userData.noEdges = true;
      g.add(scaLane);
    }
    // Lower 8-lane cyan 4.8 Gb/s Toggle DDR 6.0 DQ[7:0] continuous data highway
    for (let d = 0; d < 8; d++) {
      const dq = new THREE.Mesh(new THREE.BoxGeometry(0.72, 2.55, 0.16), mats.vcWorkingFluidCyan);
      dq.position.set(-4.2 + d * 1.2, -1.15, 0.2);
      dq.userData.noEdges = true;
      g.add(dq);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-toggle6-sca-bus',
        88,
        '#06b6d4',
        g,
        new THREE.Vector3(3.5, 3.6, 0.85),
        new THREE.Vector3(108, 48, 52),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C89. ONFI 6.0 / BiCS10 PI-LTT (Power-Isolated Low-Tapped Termination) & VccQL Driver
  // =========================================================================
  {
    const g = new THREE.Group();
    // Split silicon driver block: VCCQ (1.2V) island isolated from ultra-low VccQL (0.6V PI-LTT) output island!
    const vccqIsland = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 5.2, 0.34, 0.22, 0.04, 'z'),
      mats.cfaBlue
    );
    vccqIsland.position.x = -2.6;

    const vccqlIsland = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 5.2, 0.34, 0.22, 0.04, 'z'),
      mats.cfaGreen
    );
    vccqlIsland.position.x = 2.6;

    // Deep oxide isolation moat separating VCCQ and VccQL power domains (-34% I/O output heat!)
    const isoTrench = new THREE.Mesh(
      createChamferedBoxGeo(0.72, 5.4, 0.26, 0.12, 0.03, 'z'),
      mats.ftiOxide
    );
    // Low-tapped termination gold bridge bars
    for (const ty of [-1.4, 0, 1.4]) {
      const tap = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.34, 0.12), mats.goldPlating);
      tap.position.set(0, ty, 0.22);
      tap.userData.noEdges = true;
      g.add(tap);
    }
    g.add(vccqIsland, vccqlIsland, isoTrench);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-pi-ltt-vccql-io',
        89,
        '#10b981',
        g,
        new THREE.Vector3(10.2, 4.2, 0.85),
        new THREE.Vector3(114, 24, 14),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C90. 0.1% Precision 240 Ω External ZQ Calibration Resistors & ODT Ladder
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrier = new THREE.Mesh(
      createChamferedBoxGeo(9.6, 5.4, 0.18, 0.28, 0.03, 'z'),
      u.cfeHdiPcb
    );
    carrier.position.z = -0.14;
    g.add(carrier);

    // Pair of precision 0.1% blue thin-film 240-ohm ZQ external reference resistors (NAND + Controller)
    for (const ry of [-1.25, 1.25]) {
      const rZq = buildSmdPassive(3.2, 1.45, 0.62, mats.mountShimBlue, mats.goldPlating, 'z');
      rZq.position.set(-2.2, ry, 0.16);
      g.add(rZq);
    }
    // 5-bit binary weighted On-Die Termination (ODT) calibration ladder bars on right
    for (let b = 0; b < 5; b++) {
      const w = 1.0 + b * 0.42;
      const rung = new THREE.Mesh(new THREE.BoxGeometry(w, 0.42, 0.22), mats.copperHybridBond);
      rung.position.set(2.2, -1.7 + b * 0.85, 0.12);
      rung.userData.noEdges = true;
      g.add(rung);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-zq-240ohm-odt-cal',
        90,
        '#3b82f6',
        g,
        new THREE.Vector3(11.4, -1.8, 0.72),
        new THREE.Vector3(108, -2, 54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C91. 4.8 Gb/s Duty-Cycle Corrector (DCC/WDCA) & Per-Pin VrefQ Eye Trainer
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(9.8, 5.8, 0.28, 0.24, 0.04, 'z');
    applyPlanarUVs(baseGeo, 9.8, 5.8, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzIpDieTile);
    g.add(base);

    // 3D sculpted Golden "Eye Diagram" waveform arcs centered over VrefQ sampling crosshair!
    const topArc = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.8, 0, 0.26),
      new THREE.Vector3(-1.8, 1.65, 0.34),
      new THREE.Vector3(1.8, 1.65, 0.34),
      new THREE.Vector3(3.8, 0, 0.26),
    ]);
    const botArc = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.8, 0, 0.26),
      new THREE.Vector3(-1.8, -1.65, 0.34),
      new THREE.Vector3(1.8, -1.65, 0.34),
      new THREE.Vector3(3.8, 0, 0.26),
    ]);
    const eyeTop = new THREE.Mesh(markHiRes(new THREE.TubeGeometry(topArc, 24, 0.14, 8, false)), mats.goldPlating);
    const eyeBot = new THREE.Mesh(markHiRes(new THREE.TubeGeometry(botArc, 24, 0.14, 8, false)), mats.goldPlating);
    eyeTop.userData.noEdges = true;
    eyeBot.userData.noEdges = true;

    // Optimal eye-center sampling target dot (DCC + VrefQ calibrated!)
    const sampleDot = new THREE.Mesh(hiResSphere(0.45, 14, 10), mats.vcWorkingFluidCyan);
    sampleDot.position.set(0, 0, 0.36);
    sampleDot.userData.noEdges = true;
    g.add(eyeTop, eyeBot, sampleDot);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-dcc-vrefq-eye-trainer',
        91,
        '#facc15',
        g,
        new THREE.Vector3(7.4, 2.2, 0.85),
        new THREE.Vector3(114, 44, -22),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C92. CFA VPG Profile 5.0 (VPG800 / VPG1600) Preconditioning & TRIM Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const modGeo = createChamferedBoxGeo(9.6, 5.8, 0.32, 0.26, 0.04, 'z');
    applyPlanarUVs(modGeo, 9.6, 5.8, 'xy');
    const modBase = new THREE.Mesh(modGeo, u.icEpoxyLaser);
    g.add(modBase);

    // 4 gleaming emerald "Pre-Erased Clean NAND Block" lanes guaranteeing zero GC stutter at 800–1600 MB/s!
    for (let i = 0; i < 4; i++) {
      const cleanBlock = new THREE.Mesh(
        createChamferedBoxGeo(1.75, 3.6, 0.22, 0.14, 0.03, 'z'),
        i < 3 ? mats.cfaGreen : mats.goldPlating
      );
      cleanBlock.position.set(-3.15 + i * 2.1, 0, 0.24);
      cleanBlock.userData.noEdges = true;
      g.add(cleanBlock);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-vpg5-precond-engine',
        92,
        '#22c55e',
        g,
        new THREE.Vector3(-6.2, -5.2, 1.32),
        new THREE.Vector3(-108, 22, 74),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C93. NVMe 2.4 (Aug 2026) Post-Quantum Cryptography (ML-DSA) & Silicon PUF Vault
  // =========================================================================
  {
    const g = new THREE.Group();
    // HERO 2026 Security Enclave Die with bespoke NVMe 2.4 PQC Lattice + PUF Fingerprint texture!
    const vaultGeo = createChamferedBoxGeo(10.6, 8.8, 0.44, 0.35, 0.06, 'z');
    applyPlanarUVs(vaultGeo, 10.6, 8.8, 'xy');
    const vaultDie = new THREE.Mesh(vaultGeo, u.cfePqcSecurityDie);

    // Armored golden Faraday security collar framing the PQC/PUF enclave
    const secFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(11.3, 9.5, 0.42, 10.1, 8.3, 0.28), 0.32, 0.05, 0.05, 2, 16),
      mats.goldPlating
    );
    secFrame.position.z = 0.14;
    g.add(vaultDie, secFrame);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-nvme24-pqc-puf-root',
        93,
        '#f59e0b',
        g,
        new THREE.Vector3(-9.2, -10.8, 1.28),
        new THREE.Vector3(-116, -24, 58),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C94. PCIe ASPM L1.2 Substate & NVMe PS0–PS4 Dynamic Power-State FSM
  // =========================================================================
  {
    const g = new THREE.Group();
    const fsmBase = new THREE.Mesh(
      createChamferedBoxGeo(9.6, 5.4, 0.28, 0.26, 0.04, 'z'),
      u.bionzIpDieTile
    );
    g.add(fsmBase);

    // 5 stepped power-state pillars: PS0 Turbo (4W Red) -> PS1 -> PS2 -> PS3 -> PS4 Deep Sleep (<5mW Cyan)
    const stateMats = [
      mats.cinnabarAnodized,
      mats.tantalumCapYellow,
      mats.goldPlating,
      mats.cfaGreen,
      mats.vcWorkingFluidCyan,
    ];
    for (let s = 0; s < 5; s++) {
      const barH = 1.05 - s * 0.18;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(1.3, 3.2, barH, 0.14, 0.03, 'z'),
        stateMats[s]
      );
      bar.position.set(-3.4 + s * 1.7, 0, 0.14 + barH * 0.5);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-pcie-l12-pm-fsm',
        94,
        '#06b6d4',
        g,
        new THREE.Vector3(6.8, -14.8, -0.78),
        new THREE.Vector3(108, -28, -54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C95. NVMe HCTM (Host Controlled Thermal Management) & 18-Step DVFS Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(9.4, 5.6, 0.28, 0.26, 0.04, 'z'),
      u.icEpoxyLaser
    );
    g.add(base);

    // Smooth 9-bar thermal DVFS ramp transitioning gently without sudden 8K frame-drop cliffs!
    for (let i = 0; i < 9; i++) {
      const h = 0.78 - i * 0.06;
      const mat = i < 3 ? mats.cfaGreen : i < 6 ? mats.tantalumCapYellow : mats.cinnabarAnodized;
      const step = new THREE.Mesh(new THREE.BoxGeometry(0.68, 3.1, h), mat);
      step.position.set(-3.4 + i * 0.85, -0.25, 0.14 + h * 0.5);
      step.userData.noEdges = true;
      g.add(step);
    }
    // Dual TMT1 / TMT2 host-negotiated threshold reference rail along top
    const tmtRail = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.44, 0.18), mats.goldPlating);
    tmtRail.position.set(0, 1.9, 0.24);
    tmtRail.userData.noEdges = true;
    g.add(tmtRail);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-hctm-thermal-fsm',
        95,
        '#f43f5e',
        g,
        new THREE.Vector3(-2.4, -3.5, 0.95),
        new THREE.Vector3(-98, -68, 54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C96. Dynamic NAND Vth Valley-Tracking & Soft-Decision LDPC Read-Retry Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(10.8, 5.4, 0.26, 0.24, 0.04, 'z'),
      u.bionzCetusDie
    );
    g.add(base);

    // 8 Gaussian TLC threshold-voltage distribution peaks + 7 golden valley-tracking sensing cursor blades!
    for (let lv = 0; lv < 8; lv++) {
      const px = -4.2 + lv * 1.2;
      const hill = new THREE.Mesh(hiResCyl(0.18, 0.46, 0.86, 14).rotateX(Math.PI / 2), mats.cfaBlue);
      hill.position.set(px, 0, 0.52);
      hill.userData.noEdges = true;
      g.add(hill);

      if (lv < 7) {
        const cursor = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.6, 0.65), mats.goldPlating);
        cursor.position.set(px + 0.6, 0, 0.45);
        cursor.userData.noEdges = true;
        g.add(cursor);
      }
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-vth-read-retry-tracker',
        96,
        '#3b82f6',
        g,
        new THREE.Vector3(3.6, 10.6, 1.18),
        new THREE.Vector3(98, 72, 62),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C97. Hardware LFSR Data Scrambler & Anti-Pattern Cell-Disturb Balancer
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(9.4, 5.2, 0.28, 0.24, 0.04, 'z'),
      u.bionzIpDieTile
    );
    g.add(base);

    // Left: uniform 0000/1111 risky pattern bars -> Center: Gold XOR Scrambler -> Right: balanced 50/50 checkerboard!
    for (let i = 0; i < 4; i++) {
      const raw = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.56, 0.16), mats.cinnabarAnodized);
      raw.position.set(-3.1, -1.25 + i * 0.84, 0.22);
      raw.userData.noEdges = true;
      g.add(raw);
    }
    const xorRing = new THREE.Mesh(hiResTorus(0.95, 0.16, 10, 24), mats.goldPlating);
    xorRing.position.set(0, 0, 0.28);
    xorRing.userData.noEdges = true;
    g.add(xorRing);

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        const balanced = new THREE.Mesh(
          new THREE.BoxGeometry(0.62, 0.58, 0.16),
          (r + c) % 2 === 0 ? mats.vcWorkingFluidCyan : mats.cfaGreen
        );
        balanced.position.set(2.2 + c * 0.78, -1.25 + r * 0.84, 0.22);
        balanced.userData.noEdges = true;
        g.add(balanced);
      }
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-ldpc-data-scrambler',
        97,
        '#a855f7',
        g,
        new THREE.Vector3(-6.2, -10.4, 1.32),
        new THREE.Vector3(-74, -42, 76),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C98. PMIC Integrated OVP / UVLO / OCP Triple-Window Comparator & Bandgap Ref
  // =========================================================================
  {
    const g = new THREE.Group();
    const guardIc = buildChipPackage({
      w: 5.8,
      d: 4.4,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      pin1Mat: mats.cinnabarAnodized,
      axis: 'z',
    });
    guardIc.rotation.y = Math.PI;
    // Upper OVP (+3.63V red) & Lower UVLO (2.97V amber) + Center Bandgap Reference (gold) status strips on rear face
    const ovpBar = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.56, 0.14), mats.cinnabarAnodized);
    ovpBar.position.set(0, 1.1, -0.44);
    ovpBar.userData.noEdges = true;
    const bgRef = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.56, 0.14), mats.goldPlating);
    bgRef.position.set(0, 0, -0.44);
    bgRef.userData.noEdges = true;
    const uvloBar = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.56, 0.14), mats.tantalumCapYellow);
    uvloBar.position.set(0, -1.1, -0.44);
    uvloBar.userData.noEdges = true;
    g.add(guardIc, ovpBar, bgRef, uvloBar);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-pmic-ovp-uvlo-guard',
        98,
        '#ef4444',
        g,
        new THREE.Vector3(7.2, -11.4, -0.86),
        new THREE.Vector3(74, -62, -58),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C99. USB4 40 Gbps Reader (Sony MRW-G3) PCIe Tunneling & CNC Thermal Dock Crown
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sleek cutaway CNC-machined gunmetal aluminum USB4 40Gbps reader thermal bridge & finned crown
    // seated cleanly above the top pull-tab edge (y = +28.85) so BOTH card hero faces stay 100% unobstructed!
    const crownBaseGeo = createChamferedBoxGeo(35.2, 1.55, 4.7, 0.65, 0.12, 'z');
    applyBoxUVs(crownBaseGeo, 14.0);
    const crownBase = new THREE.Mesh(crownBaseGeo, mats.matteBlackAnodized);
    g.add(crownBase);

    // 11 precision CNC cooling fins along top edge dissipating 1.9 TB continuous USB4 40 Gbps offload heat!
    for (let i = -5; i <= 5; i++) {
      const fin = new THREE.Mesh(
        createChamferedBoxGeo(1.05, 0.95, 4.3, 0.16, 0.04, 'z'),
        mats.stainlessMachined
      );
      fin.position.set(i * 2.85, 1.05, 0);
      fin.userData.noEdges = true;
      g.add(fin);
    }

    // Miniature stainless USB4 Type-C 40 Gbps port housing & gold internal tongue centered at top-rear
    const usbcShell = new THREE.Mesh(
      extrudeHiRes(createFrameShape(8.2, 2.2, 0.9, 7.0, 1.35, 0.5), 1.35, 0.07, 0.07, 2, 18),
      mats.titaniumRivet
    );
    usbcShell.rotation.x = Math.PI / 2;
    usbcShell.position.set(0, 1.85, 0);
    const usbcTongue = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.85, 0.34, 0.14, 0.03, 'z'),
      mats.goldPlating
    );
    usbcTongue.position.set(0, 1.85, 0);
    usbcTongue.userData.noEdges = true;
    g.add(usbcShell, usbcTongue);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-usb4-mrwg3-bridge-if',
        99,
        '#64748b',
        g,
        new THREE.Vector3(0, 28.95, 0),
        new THREE.Vector3(0, 62, -84),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C100. 6-Layer Environmental Protection Barrier (X-Ray / Magnetic / UV / ESD / Drop / IP57)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sleek internal multi-material protection perimeter frame seated strictly INSIDE the top armor recess
    // (zero visual obstruction over C01 when assembled; fans cleanly to lower-left-front when exploded!)
    const magBarrier = new THREE.Mesh(
      extrudeHiRes(createFrameShape(35.8, 47.6, 1.9, 33.8, 45.6, 1.5), 0.24, 0.04, 0.04, 2, 20),
      mats.lensPermalloyShield
    );
    magBarrier.position.z = 0.22;

    const uvShield = new THREE.Mesh(
      extrudeHiRes(createFrameShape(34.6, 46.4, 1.7, 32.8, 44.6, 1.35), 0.18, 0.03, 0.03, 1, 20),
      mats.matteBlackAnodized
    );
    uvShield.position.z = -0.04;

    // 4 gleaming corner hexagonal environmental shield emblems (X-Ray / Mag / UV / ESD)
    const cornerCoords: Array<[number, number, THREE.Material]> = [
      [-15.2, 20.8, mats.goldPlating],
      [15.2, 20.8, mats.vcWorkingFluidCyan],
      [-15.2, -20.8, mats.cinnabarAnodized],
      [15.2, -20.8, mats.cfaGreen],
    ];
    for (const [cx, cy, mat] of cornerCoords) {
      const badge = new THREE.Mesh(hiResCyl(1.45, 1.45, 0.34, 6).rotateX(Math.PI / 2), mat);
      badge.position.set(cx, cy, 0.24);
      badge.userData.noEdges = true;
      g.add(badge);
    }
    g.add(magBarrier, uvShield);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-xray-magnetic-uv-shield',
        100,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 1.3, 1.88),
        new THREE.Vector3(-42, -30, 96),
        cp,
        0.16
      )
    );
  }

  return parts;
}
