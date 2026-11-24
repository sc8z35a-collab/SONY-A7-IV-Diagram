import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';
import { buildCfexpressUltra27Parts } from './cfexpressUltra27Parts';

function finalizeCfexpressPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.25
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

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
 * Phase 26B — Standalone CFexpress 4.0 Card Ultra-Dissection (Sony CEA-G Type A TOUGH / PCIe Gen4 NVMe 2.0: 30 Parts C01–C30).
 * Rendered at crisp 2.0× macro inspection scale (40.0 × 56.0 × 5.6 mm for real 20 × 28 × 2.8 mm Type A card), centered at (0, 0, 0).
 * Card stands upright along Y (21-pin PCIe Gold Edge Connector at bottom y ≈ -26.5, Non-Slip Pull-Tab at top y ≈ +26.5).
 */
export function buildCfexpressParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // C01. Top Metal Armor Shell (TOUGH 150N Bend / 7.5m Drop)
  // =========================================================================
  {
    const g = new THREE.Group();
    const topArmor = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(39.4, 52.4, 2.6), 0.75, 0.12, 0.12, 14),
      mats.bodyMgShell
    );
    const toughStripe = new THREE.Mesh(new THREE.BoxGeometry(36.0, 4.4, 0.82), mats.cinnabarAnodized);
    toughStripe.position.set(0, 18.0, 0.06);
    const goldBadge = new THREE.Mesh(new THREE.BoxGeometry(10.5, 4.2, 0.82), mats.goldPlating);
    goldBadge.position.set(11.5, -16.5, 0.06);
    g.add(topArmor, toughStripe, goldBadge);

    parts.push(
      finalizeCfexpressPart(
        'cfe-top-metal-armor',
        1,
        '#334155',
        g,
        new THREE.Vector3(0, 1.2, 2.45),
        new THREE.Vector3(0, 0, 62),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // C02. Bottom Metal Dissipation Backplate & VPG800 Laser Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    const botPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(39.4, 51.0, 2.4), 0.72, 0.1, 0.1, 14),
      mats.stainlessMachined
    );
    const vpgBadge = new THREE.Mesh(new THREE.BoxGeometry(12.0, 7.2, 0.78), mats.matteBlackAnodized);
    vpgBadge.position.set(-9.5, -12.0, -0.05);
    const serialBar = new THREE.Mesh(new THREE.BoxGeometry(24.0, 2.2, 0.78), mats.silverElectrode);
    serialBar.position.set(0, 14.0, -0.05);
    g.add(botPlate, vpgBadge, serialBar);

    parts.push(
      finalizeCfexpressPart(
        'cfe-bottom-metal-shell',
        2,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 1.6, -2.45),
        new THREE.Vector3(0, 0, -62),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // C03. Sony TOUGH Monolithic High-Strength Molded Resin Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    const monoFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(40.2, 55.4, 2.8, 34.4, 48.2, 1.6), 4.1, 0.12, 0.12, 14),
      mats.shutterChassis
    );
    // Asymmetric Type A side lock notch & key guide rail
    const sideRail = new THREE.Mesh(new THREE.BoxGeometry(1.4, 34.0, 2.2), mats.matteBlackAnodized);
    sideRail.position.set(-20.2, 2.0, 0);
    g.add(monoFrame, sideRail);

    parts.push(
      finalizeCfexpressPart(
        'cfe-monolithic-resin',
        3,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-64, 0, 12),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // C04. IP57 Dustproof / Waterproof Seamless Perimeter Seal & Conformal Coat
  // =========================================================================
  {
    const g = new THREE.Group();
    const ip57Seal = new THREE.Mesh(
      extrudeCentered(createFrameShape(39.8, 54.6, 2.7, 37.8, 52.6, 2.1), 0.75, 0.05, 0.05, 14),
      mats.fluorineCoatCyan
    );
    ip57Seal.position.z = 1.85;
    const ip57Back = new THREE.Mesh(
      extrudeCentered(createFrameShape(39.8, 54.6, 2.7, 37.8, 52.6, 2.1), 0.75, 0.05, 0.05, 14),
      mats.epdmGasket
    );
    ip57Back.position.z = -1.85;
    g.add(ip57Seal, ip57Back);

    parts.push(
      finalizeCfexpressPart(
        'cfe-ip57-seal-perimeter',
        4,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(64, 0, 22),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // C05. 21-Pin Hard Gold-Plated PCIe High-Speed Edge Connector Fingers
  // =========================================================================
  {
    const g = new THREE.Group();
    const fingerBar = new THREE.Mesh(new THREE.BoxGeometry(33.2, 6.2, 1.05), mats.hdiMainboardPcb);
    g.add(fingerBar);
    // 21 crisp hard-gold PCIe fingers (staggered power/GND pins slightly longer!)
    for (let i = 0; i < 21; i++) {
      const fx = -15.0 + i * 1.5;
      const isPowerGnd = i % 3 === 0;
      const len = isPowerGnd ? 5.4 : 4.5;
      const pinTop = new THREE.Mesh(new THREE.BoxGeometry(0.92, len, 0.22), mats.goldPlating);
      pinTop.position.set(fx, -0.35 - (len - 4.5) * 0.4, 0.62);
      const pinBot = new THREE.Mesh(new THREE.BoxGeometry(0.92, len, 0.22), mats.goldPlating);
      pinBot.position.set(fx, -0.35 - (len - 4.5) * 0.4, -0.62);
      g.add(pinTop, pinBot);
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-21pin-gold-fingers',
        5,
        '#eab308',
        g,
        new THREE.Vector3(0, -24.6, 0),
        new THREE.Vector3(0, -56, 16),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C06. Polarized Keying Notch & Impact-Resistant Connector Shroud
  // =========================================================================
  {
    const g = new THREE.Group();
    const shroudTop = new THREE.Mesh(new THREE.BoxGeometry(39.6, 6.4, 1.15), mats.bodyBatteryShell);
    shroudTop.position.z = 1.65;
    const shroudBot = new THREE.Mesh(new THREE.BoxGeometry(39.6, 6.4, 1.15), mats.bodyBatteryShell);
    shroudBot.position.z = -1.65;
    // Polarized Type-A asymmetric keying cheek on right edge
    const keyTab = new THREE.Mesh(new THREE.BoxGeometry(3.4, 6.6, 4.4), mats.matteBlackAnodized);
    keyTab.position.set(18.2, 0, 0);
    const leftCheek = new THREE.Mesh(new THREE.BoxGeometry(2.6, 6.6, 4.4), mats.matteBlackAnodized);
    leftCheek.position.set(-18.6, 0, 0);
    g.add(shroudTop, shroudBot, keyTab, leftCheek);

    parts.push(
      finalizeCfexpressPart(
        'cfe-connector-shroud',
        6,
        '#475569',
        g,
        new THREE.Vector3(0, -24.8, 0),
        new THREE.Vector3(0, -76, -14),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // C07. Ultra-Thin 8-Layer High-Density Interconnect (HDI) Impedance PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcbCore = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.0, 46.8, 1.4), 0.95, 0.04, 0.04, 12),
      mats.hdiMainboardPcb
    );
    // Serpentine matched-length PCIe Gen4 differential copper bus lines
    for (let i = -2; i <= 2; i++) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(0.42, 16.0, 1.06), mats.copperHeatSpreader);
      trace.position.set(i * 1.4, -14.5, 0);
      g.add(trace);
    }
    g.add(pcbCore);

    parts.push(
      finalizeCfexpressPart(
        'cfe-hdi-8layer-pcb',
        7,
        '#15803d',
        g,
        new THREE.Vector3(0, 0.5, 0),
        new THREE.Vector3(0, 0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // C08. Next-Gen 7nm/12nm PCIe Gen4 NVMe 2.0 Main Controller SoC
  // =========================================================================
  {
    const g = new THREE.Group();
    const substrate = new THREE.Mesh(new THREE.BoxGeometry(14.0, 14.0, 0.45), mats.abfSubstrate);
    const socBody = new THREE.Mesh(new THREE.BoxGeometry(13.2, 13.2, 0.95), mats.icEpoxy);
    socBody.position.z = 0.55;
    const metalLid = new THREE.Mesh(new THREE.BoxGeometry(10.6, 10.6, 0.26), mats.ispSiliconDie);
    metalLid.position.z = 1.08;
    g.add(substrate, socBody, metalLid);

    parts.push(
      finalizeCfexpressPart(
        'cfe-pcie4-controller-soc',
        8,
        '#2563eb',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.65),
        new THREE.Vector3(-42, -26, 26),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C09. Embedded Multi-Core ARM CPU & FTL Wear-Leveling Brain (Die Core Block)
  // =========================================================================
  {
    const g = new THREE.Group();
    const armCore1 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 4.2, 0.42), mats.npuSiliconDie);
    armCore1.position.set(-2.3, 2.2, 0);
    const armCore2 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 4.2, 0.42), mats.npuSiliconDie);
    armCore2.position.set(2.3, 2.2, 0);
    const ftlBus = new THREE.Mesh(new THREE.BoxGeometry(8.8, 1.4, 0.35), mats.goldPlating);
    ftlBus.position.set(0, -1.2, 0);
    g.add(armCore1, armCore2, ftlBus);

    parts.push(
      finalizeCfexpressPart(
        'cfe-arm-dualcore-engine',
        9,
        '#7c3aed',
        g,
        new THREE.Vector3(-6.2, -9.0, 1.3),
        new THREE.Vector3(-62, -16, 42),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C10. Hardware 4K LDPC Error-Correction (ECC) & End-to-End CRC Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const ldpcMatrix = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.6, 0.4), mats.siliconLogicLayer);
    const parityBars = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.65, 0.48), mats.copperHybridBond);
    parityBars.position.y = -1.2;
    g.add(ldpcMatrix, parityBars);

    parts.push(
      finalizeCfexpressPart(
        'cfe-ldpc-ecc-engine',
        10,
        '#10b981',
        g,
        new THREE.Vector3(-6.2, -11.8, 1.3),
        new THREE.Vector3(-62, -40, 42),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C11. Hardware AES-256 Encryption & Secure-Boot Anti-Tamper Core
  // =========================================================================
  {
    const g = new THREE.Group();
    const aesVault = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.8, 0.45), mats.goldPlating);
    const lockShield = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 0.56), mats.icEpoxy);
    g.add(aesVault, lockShield);

    parts.push(
      finalizeCfexpressPart(
        'cfe-aes256-crypto-core',
        11,
        '#f59e0b',
        g,
        new THREE.Vector3(-10.2, -10.8, 1.3),
        new THREE.Vector3(-82, -28, 32),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C12. Primary High-Density 3D TLC NAND Flash Package (232–300+ Layer BGA)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 visibly stacked stepped silicon dies peeking inside BGA housing
    const bgaBase = new THREE.Mesh(new THREE.BoxGeometry(25.6, 17.6, 0.45), mats.abfSubstrate);
    const bgaMold = new THREE.Mesh(new THREE.BoxGeometry(24.8, 16.8, 1.05), mats.icEpoxy);
    bgaMold.position.z = 0.65;
    const dieGlow = new THREE.Mesh(new THREE.BoxGeometry(20.6, 12.6, 0.22), mats.siliconDramLayer);
    dieGlow.position.z = 1.22;
    g.add(bgaBase, bgaMold, dieGlow);

    parts.push(
      finalizeCfexpressPart(
        'cfe-3d-nand-pkg-primary',
        12,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 12.6, 0.7),
        new THREE.Vector3(-34, 38, 28),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // C13. Secondary Interleaved 3D NAND Package (Rear Side Parallel Speed!)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bgaBase = new THREE.Mesh(new THREE.BoxGeometry(25.6, 17.6, 0.45), mats.abfSubstrate);
    const bgaMold = new THREE.Mesh(new THREE.BoxGeometry(24.8, 16.8, 1.05), mats.icEpoxy);
    bgaMold.position.z = -0.65;
    const dieGlow = new THREE.Mesh(new THREE.BoxGeometry(20.6, 12.6, 0.22), mats.siliconSensorDie);
    dieGlow.position.z = -1.22;
    g.add(bgaBase, bgaMold, dieGlow);

    parts.push(
      finalizeCfexpressPart(
        'cfe-3d-nand-pkg-secondary',
        13,
        '#0284c7',
        g,
        new THREE.Vector3(0, 12.6, -0.7),
        new THREE.Vector3(34, 38, -28),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // C14. Dynamic / Native pSLC High-Speed Write Cache Zone (VPG400/VPG800)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pslcTile = new THREE.Mesh(new THREE.BoxGeometry(20.0, 5.2, 0.38), mats.cinnabarAnodized);
    const turboRail = new THREE.Mesh(new THREE.BoxGeometry(18.6, 1.2, 0.46), mats.goldPlating);
    g.add(pslcTile, turboRail);

    parts.push(
      finalizeCfexpressPart(
        'cfe-pslc-write-cache',
        14,
        '#f97316',
        g,
        new THREE.Vector3(0, 7.6, 1.45),
        new THREE.Vector3(44, 24, 36),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C15. 3D NAND Vertical Charge-Trap (CTF) Memory Pillar Cutaway Stack
  // =========================================================================
  {
    const g = new THREE.Group();
    // 5 stacked horizontal tungsten wordline plates pierced by 3x2 vertical CTF memory pillars!
    for (let k = 0; k < 5; k++) {
      const wl = new THREE.Mesh(
        new THREE.BoxGeometry(10.0, 6.2, 0.24),
        k % 2 === 0 ? mats.tungstenGrid : mats.interlayerDielectric
      );
      wl.position.z = (k - 2) * 0.45;
      g.add(wl);
    }
    const pillarGeo = new THREE.CylinderGeometry(0.55, 0.55, 2.5, 12);
    pillarGeo.rotateX(Math.PI / 2);
    for (const px of [-3.0, 0.0, 3.0]) {
      for (const py of [-1.5, 1.5]) {
        const pillar = new THREE.Mesh(pillarGeo, mats.siliconPhotodiode);
        pillar.position.set(px, py, 0);
        g.add(pillar);
      }
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-3d-nand-vertical-pillar',
        15,
        '#a855f7',
        g,
        new THREE.Vector3(0, 15.8, 1.55),
        new THREE.Vector3(-24, 62, 54),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C16. High-Speed LPDDR4 DRAM Cache IC (FTL Mapping Table Accelerator)
  // =========================================================================
  {
    const g = new THREE.Group();
    const dramBody = new THREE.Mesh(new THREE.BoxGeometry(9.6, 11.4, 0.9), mats.icEpoxy);
    const dramTop = new THREE.Mesh(new THREE.BoxGeometry(7.2, 8.6, 0.2), mats.siliconTsvDram);
    dramTop.position.z = 0.5;
    g.add(dramBody, dramTop);

    parts.push(
      finalizeCfexpressPart(
        'cfe-lpddr4-dram-cache',
        16,
        '#6366f1',
        g,
        new THREE.Vector3(9.4, -8.5, 0.85),
        new THREE.Vector3(56, -24, 24),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C17. On-Card Multi-Channel PMIC Power-Management IC
  // =========================================================================
  {
    const g = new THREE.Group();
    const pmic = new THREE.Mesh(new THREE.BoxGeometry(6.8, 6.8, 0.85), mats.icEpoxy);
    const pmicPads = new THREE.Mesh(new THREE.BoxGeometry(7.4, 7.4, 0.25), mats.silverElectrode);
    pmicPads.position.z = -0.32;
    const capAccent = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.4, 0.22), mats.goldPlating);
    capAccent.position.z = 0.48;
    g.add(pmic, pmicPads, capAccent);

    parts.push(
      finalizeCfexpressPart(
        'cfe-pmic-buck-regulator',
        17,
        '#ef4444',
        g,
        new THREE.Vector3(9.6, -9.2, -0.85),
        new THREE.Vector3(56, -22, -26),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C18. Ultra-Thin Shielded Power Inductors & High-Density 0201 MLCC Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 ultra-low-profile shielded metal power inductors + row of 0201 MLCCs
    for (let i = 0; i < 3; i++) {
      const ind = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 0.9), mats.ferriteInductor);
      ind.position.set(4.5 + i * 3.8, -1.6, -0.85);
      g.add(ind);
    }
    for (let i = 0; i < 8; i++) {
      const mlcc = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.55), mats.smdCeramic);
      mlcc.position.set(-12.0 + i * 2.2, 1.2, 0.72);
      g.add(mlcc);
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-power-inductors-mlcc',
        18,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(54, 4, -36),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C19. Power-Loss Protection (PLP) Tantalum / Polymer Hold-Up Capacitors
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const cy of [-2.4, 2.4]) {
      const tant = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.6, 1.0), mats.tantalumCapYellow);
      tant.position.y = cy;
      const band = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.7, 1.06), mats.cinnabarAnodized);
      band.position.set(2.5, cy, 0);
      g.add(tant, band);
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-plp-hold-caps',
        19,
        '#eab308',
        g,
        new THREE.Vector3(-10.2, -10.5, -0.9),
        new THREE.Vector3(-56, -24, -30),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C20. PCIe Gen4 Differential AC-Coupling Capacitors & Controlled Traces
  // =========================================================================
  {
    const g = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const cx = -4.5 + i * 3.0;
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.4, 0.6), mats.smdCeramic);
      cap.position.x = cx;
      const padT = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.55, 0.64), mats.silverElectrode);
      padT.position.set(cx, 1.0, 0);
      const padB = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.55, 0.64), mats.silverElectrode);
      padB.position.set(cx, -1.0, 0);
      g.add(cap, padT, padB);
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-pcie-ac-coupling',
        20,
        '#14b8a6',
        g,
        new THREE.Vector3(-2.0, -18.5, 0.72),
        new THREE.Vector3(-34, -52, 34),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C21. Ultra-Low-Capacitance TVS ESD Protection Diode Array (±15 kV)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sx of [-6.0, 6.0]) {
      const tvs = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.2, 0.65), mats.icEpoxy);
      tvs.position.x = sx;
      const leads = new THREE.Mesh(new THREE.BoxGeometry(5.8, 2.6, 0.24), mats.goldPlating);
      leads.position.set(sx, 0, -0.2);
      g.add(tvs, leads);
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-esd-tvs-diode-array',
        21,
        '#e11d48',
        g,
        new THREE.Vector3(0, -20.8, -0.75),
        new THREE.Vector3(34, -52, -34),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C22. Ultra-Miniature Crystal Oscillator & PCIe 100 MHz REFCLK Buffer
  // =========================================================================
  {
    const g = new THREE.Group();
    const xtalLid = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.8, 0.8), mats.goldPlating);
    xtalLid.position.x = -2.4;
    const pllBuf = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.4, 0.65), mats.icEpoxy);
    pllBuf.position.x = 2.4;
    g.add(xtalLid, pllBuf);

    parts.push(
      finalizeCfexpressPart(
        'cfe-xtal-clock-gen',
        22,
        '#facc15',
        g,
        new THREE.Vector3(8.5, -17.5, 0.75),
        new THREE.Vector3(46, -46, 30),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C23. Dedicated Serial SPI NOR Flash Firmware & Factory Bad-Block ROM
  // =========================================================================
  {
    const g = new THREE.Group();
    const norIc = new THREE.Mesh(new THREE.BoxGeometry(5.8, 4.6, 0.85), mats.icEpoxy);
    const pinDot = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.95, 10).rotateX(Math.PI / 2), mats.goldPlating);
    pinDot.position.set(-2.0, 1.4, 0);
    g.add(norIc, pinDot);

    parts.push(
      finalizeCfexpressPart(
        'cfe-spi-nor-firmware',
        23,
        '#8b5cf6',
        g,
        new THREE.Vector3(-11.2, 0.2, -0.82),
        new THREE.Vector3(-60, 8, -32),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C24. High-Precision Digital Thermal Sensor & Adaptive Throttling Logic
  // =========================================================================
  {
    const g = new THREE.Group();
    const sensorIc = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.8, 0.75), mats.cinnabarAnodized);
    const senseRing = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.4, 0.25), mats.copperHeatSpreader);
    senseRing.position.z = -0.25;
    g.add(sensorIc, senseRing);

    parts.push(
      finalizeCfexpressPart(
        'cfe-thermal-sensor-diode',
        24,
        '#f43f5e',
        g,
        new THREE.Vector3(-0.2, -2.0, 0.75),
        new THREE.Vector3(-42, 4, 42),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C25. Sony Proprietary Pure Copper Internal Heat Spreader Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    const cuPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.6, 44.0, 1.6), 0.36, 0.03, 0.03, 12),
      mats.vaporChamberCopper
    );
    const bossSoc = new THREE.Mesh(new THREE.BoxGeometry(13.6, 13.6, 0.45), mats.copperHeatSpreader);
    bossSoc.position.set(-6.2, -9.0, -0.22);
    g.add(cuPlate, bossSoc);

    parts.push(
      finalizeCfexpressPart(
        'cfe-copper-heat-spreader',
        25,
        '#ea580c',
        g,
        new THREE.Vector3(0, 2.2, 1.78),
        new THREE.Vector3(0, 0, 44),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // C26. Ultra-Thin Silicone Thermal Pad (TIM) & High-Orientation Graphene Sheet
  // =========================================================================
  {
    const g = new THREE.Group();
    const timSoc = new THREE.Mesh(new THREE.BoxGeometry(13.2, 13.2, 0.38), mats.thermalPadPink);
    timSoc.position.set(-6.2, -9.0, 0.15);
    const timNand = new THREE.Mesh(new THREE.BoxGeometry(24.2, 16.4, 0.34), mats.thermalPadBlue);
    timNand.position.set(0, 12.6, 0.15);
    const grapheneBack = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(33.8, 43.0, 1.4), 0.24, 0.02, 0.02, 12),
      mats.pyroGraphite
    );
    grapheneBack.position.set(0, 2.2, -3.15);
    g.add(timSoc, timNand, grapheneBack);

    parts.push(
      finalizeCfexpressPart(
        'cfe-graphene-tim-pad',
        26,
        '#ec4899',
        g,
        new THREE.Vector3(0, 0, 1.38),
        new THREE.Vector3(0, 0, -42),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // C27. Ultra-Thin Permalloy / Nickel-Silver EMI Electromagnetic Shield Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    const emiCollar = new THREE.Mesh(
      extrudeCentered(createFrameShape(17.4, 17.4, 1.2, 14.4, 14.4, 0.8), 1.25, 0.04, 0.04, 12),
      mats.emiShieldCan
    );
    g.add(emiCollar);

    parts.push(
      finalizeCfexpressPart(
        'cfe-emi-shield-frame',
        27,
        '#cbd5e1',
        g,
        new THREE.Vector3(-6.2, -9.0, 1.0),
        new THREE.Vector3(-74, -46, 14),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // C28. BGA Solder-Ball Protective Underfill Epoxy Resin (7.5m Drop Armor)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Underfill perimeter collar + visible miniature silver BGA solder ball grid
    const underfillSoc = new THREE.Mesh(new THREE.BoxGeometry(14.8, 14.8, 0.32), mats.makeupSealViolet);
    underfillSoc.position.set(-6.2, -9.0, 0);
    const underfillNand = new THREE.Mesh(new THREE.BoxGeometry(26.4, 18.4, 0.32), mats.makeupSealViolet);
    underfillNand.position.set(0, 12.6, 0);
    g.add(underfillSoc, underfillNand);
    const ballGeo = new THREE.SphereGeometry(0.32, 8, 6);
    for (let ix = -3; ix <= 3; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        const b = new THREE.Mesh(ballGeo, mats.solderBallSilver);
        b.position.set(ix * 3.0, 12.6 + iy * 3.0, -0.1);
        g.add(b);
      }
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-bga-underfill-epoxy',
        28,
        '#9333ea',
        g,
        new THREE.Vector3(0, 0, 0.54),
        new THREE.Vector3(-56, 36, -18),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // C29. S.M.A.R.T. Health Diagnostics & Media Scan Utility Wear-Monitor Logic
  // =========================================================================
  {
    const g = new THREE.Group();
    const smartBlock = new THREE.Mesh(new THREE.BoxGeometry(8.2, 5.2, 0.55), mats.sensorPcb);
    const healthBar1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.2, 0.65), mats.cfaGreen);
    healthBar1.position.x = -2.4;
    const healthBar2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.2, 0.65), mats.cfaGreen);
    healthBar2.position.x = -0.4;
    const healthBar3 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.2, 0.65), mats.cfaGreen);
    healthBar3.position.x = 1.6;
    g.add(smartBlock, healthBar1, healthBar2, healthBar3);

    parts.push(
      finalizeCfexpressPart(
        'cfe-smart-health-monitor',
        29,
        '#22c55e',
        g,
        new THREE.Vector3(9.8, 0.5, 0.8),
        new THREE.Vector3(60, 14, 42),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // C30. Ergonomic Non-Slip Pull-Tab Rib & Anti-X-Ray / Anti-UV Label Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stepped non-slip pull-tab grip bar at card tail (y = +26.4)
    const pullBase = new THREE.Mesh(new THREE.BoxGeometry(36.0, 4.0, 1.35), mats.matteBlackAnodized);
    pullBase.position.set(0, 26.2, 0);
    g.add(pullBase);
    for (let i = 0; i < 3; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(32.0, 0.55, 1.75), mats.bodyLeatherette);
      rib.position.set(0, 25.0 + i * 1.15, 0);
      g.add(rib);
    }
    // Thin multi-layer anti-UV / anti-static protective top label film
    const uvFilm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(36.0, 42.0, 1.8), 0.16, 0.02, 0.02, 12),
      mats.nanoArIridescent
    );
    uvFilm.position.set(0, 0.5, 2.95);
    g.add(uvFilm);

    parts.push(
      finalizeCfexpressPart(
        'cfe-grip-pull-tab-rib',
        30,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(22, 48, 34),
        cp,
        0.24
      )
    );
  }

  parts.push(...buildCfexpressUltra27Parts(mats));
  return parts;
}
