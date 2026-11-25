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
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildShieldedInductor,
  buildSmdPassive,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';
import { buildCfexpressUltra27Parts } from './cfexpressUltra27Parts';
import { buildCfexpressUltra28Parts } from './cfexpressUltra28Parts';

function finalizeCfexpressPart(
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
 * Phase 26B / 27 / 28 — Standalone CFexpress 4.0 Card Ultra-Dissection (Sony CEA-G1920T Type A TOUGH / PCIe Gen4 NVMe 2.4 / BiCS10 332L: 100 Parts C01–C100).
 * Rendered at crisp 2.0× macro inspection scale (40.0 × 56.0 × 5.6 mm for real 20 × 28 × 2.8 mm Type A card), centered at (0, 0, 0).
 * Card stands upright along Y (verified 21-pin staggered PCIe Gold Edge Connector at bottom y ≈ -26.5, Non-Slip Pull-Tab at top y ≈ +26.5).
 */
export function buildCfexpressParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // C01. Top Metal Armor Shell (TOUGH 150N Bend / 7.5m Drop)
  // =========================================================================
  {
    const g = new THREE.Group();
    // CNC-chamfered brushed gunmetal-titanium Sony CEA-G1920T TOUGH armor plate seated flush in monolithic frame!
    // Displays iconic cinnabar-orange TOUGH stripe, SONY serif, gold G, CFexpress [A] 4.0, 1920GB, R:1800 / W:1700, VPG400 & VPG800!
    const armorW = 38.6;
    const armorH = 51.4;
    const armorGeo = extrudeHiRes(createRoundedRectShape(armorW, armorH, 2.3), 0.78, 0.14, 0.14, 3, 24);
    applyPlanarUVs(armorGeo, armorW, armorH, 'xy');
    const topArmor = new THREE.Mesh(armorGeo, u.cfeTopArmorShell);

    // Precision CNC-milled titanium micro-bevel trim framing the front TOUGH label cleanly
    const bezelRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(armorW + 0.35, armorH + 0.35, 2.5, armorW - 1.15, armorH - 1.15, 2.0), 0.28, 0.05, 0.05, 2, 22),
      mats.titaniumRivet
    );
    bezelRim.position.z = 0.24;
    bezelRim.userData.noEdges = true;
    g.add(topArmor, bezelRim);

    parts.push(
      finalizeCfexpressPart(
        'cfe-top-metal-armor',
        1,
        '#272d38',
        g,
        new THREE.Vector3(0, 1.4, 2.48),
        new THREE.Vector3(0, 0, 68),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C02. Bottom Metal Dissipation Backplate & VPG800 Laser Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    // Brushed stainless steel heat-dissipation backplate with razor-sharp dark laser etching
    // (SONY CEA-G1920T, VPG800 clapperboard, 2D DataMatrix, CE/FC/UKCA/VCCI/WEEE, S/N, MADE IN TAIWAN)!
    const plateW = 38.6;
    const plateH = 50.4;
    const botGeo = extrudeHiRes(createRoundedRectShape(plateW, plateH, 2.2), 0.66, 0.12, 0.12, 3, 24);
    applyPlanarUVs(botGeo, plateW, plateH, 'xy-back');
    const botPlate = new THREE.Mesh(botGeo, u.cfeBackplateLaser);

    // Solid brushed stainless inner thermal-contact face (+Z) so exploded view NEVER shows mirrored rear text!
    const innerThermalFace = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(plateW - 0.8, plateH - 0.8, 1.9), 0.22, 0.04, 0.04, 1, 20),
      mats.stainlessMachined
    );
    innerThermalFace.position.z = 0.30;
    innerThermalFace.userData.noEdges = true;
    g.add(botPlate, innerThermalFace);

    parts.push(
      finalizeCfexpressPart(
        'cfe-bottom-metal-shell',
        2,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 1.6, -2.48),
        new THREE.Vector3(0, 0, -62),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C03. Sony TOUGH Monolithic High-Strength Molded Resin Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-depth 5.45 mm Sony TOUGH monolithic obsidian-resin perimeter body sealing ALL 4 sides 100% solid!
    const monoGeo = extrudeHiRes(createFrameShape(40.4, 55.8, 3.0, 35.2, 48.8, 1.9), 5.42, 0.24, 0.22, 3, 26);
    applyBoxUVs(monoGeo, 14.0);
    const monoFrame = new THREE.Mesh(monoGeo, u.batPolycarbonateShell);

    // Molded upper-left & upper-right side grip chamfers + asymmetric Type-A poka-yoke lock rail
    const sideRailGeo = createChamferedBoxGeo(1.45, 34.8, 2.8, 0.35, 0.14, 'z');
    applyBoxUVs(sideRailGeo, 12.0);
    const sideRail = new THREE.Mesh(sideRailGeo, mats.matteBlackAnodized);
    sideRail.position.set(-20.1, 2.0, 0);

    // Right-side solid stepped flange & lock detent pocket (seals card right wall completely!)
    const rightFlangeGeo = createChamferedBoxGeo(1.05, 48.0, 5.15, 0.25, 0.12, 'z');
    applyBoxUVs(rightFlangeGeo, 12.0);
    const rightFlange = new THREE.Mesh(rightFlangeGeo, u.batPolycarbonateShell);
    rightFlange.position.set(19.75, 1.2, 0);
    rightFlange.userData.noEdges = true;

    // Authentic Sony CFexpress TOUGH top-edge horizontal non-slip tactile finger-pull grip ridges (+Y)
    for (const rz of [-1.25, 0, 1.25]) {
      const pullRib = new THREE.Mesh(
        createChamferedBoxGeo(26.0, 0.36, 0.56, 0.18, 0.06, 'y'),
        mats.matteBlackAnodized
      );
      pullRib.position.set(0, 27.92, rz);
      pullRib.userData.noEdges = true;
      g.add(pullRib);
    }

    // Subtle molded upper-left & upper-right side extraction grip flutes
    for (const sx of [-20.18, 20.18]) {
      for (let i = 0; i < 4; i++) {
        const flute = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.72, 3.6), mats.matteBlackAnodized);
        flute.position.set(sx, 19.2 + i * 1.65, 0);
        flute.userData.noEdges = true;
        g.add(flute);
      }
    }

    g.add(monoFrame, sideRail, rightFlange);

    parts.push(
      finalizeCfexpressPart(
        'cfe-monolithic-resin',
        3,
        '#1e2128',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-64, 0, 12),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C04. IP57 Dustproof / Waterproof Seamless Perimeter Seal & Conformal Coat
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic opaque dark-teal/graphite fluorocarbon IP57 dual-lip O-ring gasket seated STRICTLY INSIDE
    // the monolithic armor channel (ZERO translucent cyan halo bleeding outside the card when assembled!)
    const ip57Seal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.8, 49.6, 2.1, 35.3, 48.1, 1.65), 0.55, 0.08, 0.08, 2, 22),
      mats.epdmGasket
    );
    ip57Seal.position.set(0, 1.3, 1.55);
    const ip57Back = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.8, 49.6, 2.1, 35.3, 48.1, 1.65), 0.55, 0.08, 0.08, 2, 22),
      u.micRubberBootBlack
    );
    ip57Back.position.set(0, 1.3, -1.55);
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
        0.18
      )
    );
  }

  // =========================================================================
  // C05. 21-Pin Hard Gold-Plated PCIe High-Speed Edge Connector Fingers
  // =========================================================================
  {
    const g = new THREE.Group();
    const fingerBar = new THREE.Mesh(
      createChamferedBoxGeo(33.4, 6.2, 1.04, 0.35, 0.08, 'z'),
      u.cfeHdiPcb
    );
    g.add(fingerBar);

    // Verified exact CFexpress Type A 21-pin staggered hard-gold contact array:
    // First-make longer GND/+3V3 pins: 1, 4, 10, 15, 18, 21; Last-make recessed INS# card-detect: pin 12!
    const firstMakePins = new Set([1, 4, 10, 15, 18, 21]);
    for (let pin = 1; pin <= 21; pin++) {
      const fx = -15.0 + (pin - 1) * 1.5;
      const isLong = firstMakePins.has(pin);
      const isIns = pin === 12;
      const len = isLong ? 5.6 : isIns ? 3.8 : 4.75;
      const yShift = isLong ? -0.42 : isIns ? 0.45 : -0.05;

      // Primary lower contact face (-Z) & top mirror contact face (+Z) with rounded lead-in tips
      for (const sz of [-0.6, 0.6]) {
        const finger = new THREE.Mesh(
          createChamferedBoxGeo(0.96, len, 0.2, 0.22, 0.04, 'z'),
          mats.goldPlating
        );
        finger.position.set(fx, yShift, sz);
        finger.userData.noEdges = true;
        g.add(finger);

        // Micro gold neck trace rising from each contact finger up into the HDI bus via collar
        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.35, 0.1), mats.copperCoil);
        neck.position.set(fx, 2.35, sz * 0.92);
        neck.userData.noEdges = true;
        g.add(neck);
      }
      // Micro-via transition pad connecting each gold finger up into the 8-layer HDI bus
      const via = new THREE.Mesh(hiResCyl(0.32, 0.32, 1.18, 12).rotateX(Math.PI / 2), mats.goldPlating);
      via.position.set(fx, 2.88, 0);
      via.userData.noEdges = true;
      g.add(via);
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
        0.2
      )
    );
  }

  // =========================================================================
  // C06. Polarized Keying Notch & Impact-Resistant Connector Shroud
  // =========================================================================
  {
    const g = new THREE.Group();
    const shroudTopGeo = createChamferedBoxGeo(39.6, 6.4, 1.15, 0.4, 0.12, 'z');
    applyBoxUVs(shroudTopGeo, 14.0);
    const shroudTop = new THREE.Mesh(shroudTopGeo, u.batPolycarbonateShell);
    shroudTop.position.z = 1.65;
    const shroudBotGeo = createChamferedBoxGeo(39.6, 6.4, 1.15, 0.4, 0.12, 'z');
    applyBoxUVs(shroudBotGeo, 14.0);
    const shroudBot = new THREE.Mesh(shroudBotGeo, u.batPolycarbonateShell);
    shroudBot.position.z = -1.65;

    // Polarized Type-A asymmetric keying cheek & anti-reverse ribs protecting the 21 pins
    const keyTab = new THREE.Mesh(
      createChamferedBoxGeo(3.4, 6.6, 4.4, 0.45, 0.12, 'z'),
      mats.matteBlackAnodized
    );
    keyTab.position.set(18.2, 0, 0);
    const leftCheek = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 6.6, 4.4, 0.45, 0.12, 'z'),
      mats.matteBlackAnodized
    );
    leftCheek.position.set(-18.6, 0, 0);

    // 20 razor-thin precision molded dielectric inter-pin separator comb fins framing every gold finger!
    const combGeo = new THREE.BoxGeometry(0.24, 5.45, 0.56);
    const combInst = new THREE.InstancedMesh(combGeo, mats.matteBlackAnodized, 40);
    const dm = new THREE.Object3D();
    let ci = 0;
    for (let k = 0; k < 20; k++) {
      const cx = -14.25 + k * 1.5;
      for (const cz of [-0.95, 0.95]) {
        dm.position.set(cx, -0.32, cz);
        dm.updateMatrix();
        combInst.setMatrixAt(ci++, dm.matrix);
      }
    }
    combInst.instanceMatrix.needsUpdate = true;
    combInst.userData.noEdges = true;
    g.add(shroudTop, shroudBot, keyTab, leftCheek, combInst);

    parts.push(
      finalizeCfexpressPart(
        'cfe-connector-shroud',
        6,
        '#334155',
        g,
        new THREE.Vector3(0, -24.8, 0),
        new THREE.Vector3(0, -76, -14),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C07. Ultra-Thin 8-Layer High-Density Interconnect (HDI) Impedance PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-DPI emerald-black 8-layer impedance-controlled HDI PCB (85Ω serpentine pairs, VIPPO vias, silkscreen!)
    const pcbW = 34.0;
    const pcbH = 46.8;
    const pcbGeo = extrudeHiRes(createRoundedRectShape(pcbW, pcbH, 1.5), 0.96, 0.08, 0.08, 2, 20);
    applyPlanarUVs(pcbGeo, pcbW, pcbH, 'xy');
    const pcbCore = new THREE.Mesh(pcbGeo, u.cfeHdiPcb);

    // Subtle copper laminate edge strip visible along PCB thickness perimeter
    const edgeCopper = new THREE.Mesh(
      extrudeHiRes(createFrameShape(pcbW + 0.04, pcbH + 0.04, 1.5, pcbW - 0.35, pcbH - 0.35, 1.3), 0.36, 0.02, 0.02, 1, 18),
      mats.pcbEdgeLaminate
    );
    edgeCopper.userData.noEdges = true;
    g.add(pcbCore, edgeCopper);

    parts.push(
      finalizeCfexpressPart(
        'cfe-hdi-8layer-pcb',
        7,
        '#0f3c30',
        g,
        new THREE.Vector3(0, 0.5, 0),
        new THREE.Vector3(0, 0, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C08. Next-Gen 7nm/12nm PCIe Gen4 NVMe 2.0 Main Controller SoC
  // =========================================================================
  {
    const g = new THREE.Group();
    // AT&S ABF carrier substrate
    const subGeo = createChamferedBoxGeo(14.2, 14.2, 0.44, 0.4, 0.05, 'z');
    applyPlanarUVs(subGeo, 14.2, 14.2, 'xy');
    const substrate = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);

    // Laser-marked Sony / Phison PS5027-E27T PCIe Gen4 NVMe 2.0 BGA controller package!
    const socGeo = createChamferedBoxGeo(13.2, 13.2, 0.96, 0.35, 0.1, 'z');
    applyPlanarUVs(socGeo, 13.2, 13.2, 'xy');
    const socBody = new THREE.Mesh(socGeo, u.cfeControllerPkg);
    socBody.position.z = 0.64;

    // 8 ultra-miniature 0201 decoupling MLCCs flanking the controller on its ABF carrier
    for (let i = 0; i < 4; i++) {
      for (const sy of [-6.95, 6.95]) {
        const cap = buildSmdPassive(1.15, 0.6, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.position.set(-4.2 + i * 2.8, sy, 0.38);
        g.add(cap);
      }
    }
    g.add(substrate, socBody);

    parts.push(
      finalizeCfexpressPart(
        'cfe-pcie4-controller-soc',
        8,
        '#2563eb',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.65),
        new THREE.Vector3(-42, -26, 26),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C09. Embedded Multi-Core ARM CPU & FTL Wear-Leveling Brain (Die Core Block)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Photolithographic bare silicon dual-core ARM Cortex-R5 + FTL mapping logic blocks
    for (const cx of [-2.35, 2.35]) {
      const coreGeo = createChamferedBoxGeo(4.2, 4.2, 0.42, 0.16, 0.04, 'z');
      applyPlanarUVs(coreGeo, 4.2, 4.2, 'xy');
      const core = new THREE.Mesh(coreGeo, u.bionzDieFloorplan);
      core.position.set(cx, 2.2, 0);
      const frame = new THREE.Mesh(
        extrudeHiRes(createFrameShape(4.3, 4.3, 0.18, 3.85, 3.85, 0.12), 0.1, 0.02, 0.02, 1, 10),
        mats.goldPlating
      );
      frame.position.set(cx, 2.2, 0.22);
      frame.userData.noEdges = true;
      g.add(core, frame);
    }
    const ftlBus = new THREE.Mesh(
      createChamferedBoxGeo(8.9, 1.45, 0.36, 0.16, 0.04, 'z'),
      mats.goldPlating
    );
    ftlBus.position.set(0, -1.2, 0);
    g.add(ftlBus);

    parts.push(
      finalizeCfexpressPart(
        'cfe-arm-dualcore-engine',
        9,
        '#7c3aed',
        g,
        new THREE.Vector3(-6.2, -9.0, 1.3),
        new THREE.Vector3(-62, -16, 42),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C10. Hardware 4K LDPC Error-Correction (ECC) & End-to-End CRC Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const ldpcGeo = createChamferedBoxGeo(5.7, 3.7, 0.4, 0.16, 0.04, 'z');
    applyPlanarUVs(ldpcGeo, 5.7, 3.7, 'xy');
    const ldpcMatrix = new THREE.Mesh(ldpcGeo, u.bionzCetusDie);

    // Sculpted parity-check matrix rails
    for (let i = 0; i < 4; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.58, 0.2), mats.copperHybridBond);
      bar.position.set(-1.95 + i * 1.3, -1.18, 0.22);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    g.add(ldpcMatrix);

    parts.push(
      finalizeCfexpressPart(
        'cfe-ldpc-ecc-engine',
        10,
        '#10b981',
        g,
        new THREE.Vector3(-6.2, -11.8, 1.3),
        new THREE.Vector3(-62, -40, 42),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C11. Hardware AES-256 Encryption & Secure-Boot Anti-Tamper Core
  // =========================================================================
  {
    const g = new THREE.Group();
    const aesVault = new THREE.Mesh(
      createChamferedBoxGeo(4.45, 3.85, 0.44, 0.25, 0.06, 'z'),
      mats.goldPlating
    );
    const lockShield = new THREE.Mesh(
      createChamferedBoxGeo(2.45, 2.25, 0.56, 0.2, 0.05, 'z'),
      u.icEpoxyLaser
    );
    const keyRing = new THREE.Mesh(hiResCyl(0.55, 0.55, 0.62, 16).rotateX(Math.PI / 2), mats.goldPlating);
    keyRing.userData.noEdges = true;
    g.add(aesVault, lockShield, keyRing);

    parts.push(
      finalizeCfexpressPart(
        'cfe-aes256-crypto-core',
        11,
        '#f59e0b',
        g,
        new THREE.Vector3(-10.2, -10.8, 1.3),
        new THREE.Vector3(-82, -28, 32),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C12. Primary High-Density 3D TLC NAND Flash Package (232–300+ Layer BGA)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Green ABF substrate base
    const subGeo = createChamferedBoxGeo(25.8, 17.8, 0.44, 0.45, 0.05, 'z');
    applyPlanarUVs(subGeo, 25.8, 17.8, 'xy');
    const bgaBase = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);

    // Authentic KIOXIA BiCS8 3D TLC 218L-CBA 16DP laser-marked BGA NAND package!
    const moldGeo = createChamferedBoxGeo(24.9, 16.9, 1.08, 0.4, 0.12, 'z');
    applyPlanarUVs(moldGeo, 24.9, 16.9, 'xy');
    const bgaMold = new THREE.Mesh(moldGeo, u.cfeNandPkg);
    bgaMold.position.z = 0.68;

    // 6 miniature 0201 VCCQ/VCC decoupling MLCCs seated cleanly along the NAND ABF substrate edges!
    for (let i = 0; i < 3; i++) {
      for (const sy of [-9.35, 9.35]) {
        const cap = buildSmdPassive(1.18, 0.62, 0.44, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.position.set(-7.5 + i * 7.5, sy, 0.36);
        g.add(cap);
      }
    }
    g.add(bgaBase, bgaMold);

    parts.push(
      finalizeCfexpressPart(
        'cfe-3d-nand-pkg-primary',
        12,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 12.6, 0.7),
        new THREE.Vector3(-34, 38, 28),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C13. Secondary Interleaved 3D NAND Package (Rear Side Parallel Speed!)
  // =========================================================================
  {
    const g = new THREE.Group();
    const subGeo = createChamferedBoxGeo(25.8, 17.8, 0.44, 0.45, 0.05, 'z');
    applyPlanarUVs(subGeo, 25.8, 17.8, 'xy-back');
    const bgaBase = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);

    const moldGeo = createChamferedBoxGeo(24.9, 16.9, 1.08, 0.4, 0.12, 'z');
    applyPlanarUVs(moldGeo, 24.9, 16.9, 'xy-back');
    const bgaMold = new THREE.Mesh(moldGeo, u.cfeNandPkg);
    bgaMold.position.z = -0.68;
    g.add(bgaBase, bgaMold);

    parts.push(
      finalizeCfexpressPart(
        'cfe-3d-nand-pkg-secondary',
        13,
        '#0284c7',
        g,
        new THREE.Vector3(0, 12.6, -0.7),
        new THREE.Vector3(34, 38, -28),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C14. Dynamic / Native pSLC High-Speed Write Cache Zone (VPG400/VPG800)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pslcTile = new THREE.Mesh(
      createChamferedBoxGeo(20.0, 5.2, 0.36, 0.3, 0.05, 'z'),
      mats.cinnabarAnodized
    );
    // 8 parallel high-speed pSLC interleaved plane stripes + gold turbo rail
    for (let i = 0; i < 8; i++) {
      const lane = new THREE.Mesh(new THREE.BoxGeometry(1.7, 3.4, 0.16), mats.goldPlating);
      lane.position.set(-7.8 + i * 2.22, 0, 0.22);
      lane.userData.noEdges = true;
      g.add(lane);
    }
    g.add(pslcTile);

    parts.push(
      finalizeCfexpressPart(
        'cfe-pslc-write-cache',
        14,
        '#f97316',
        g,
        new THREE.Vector3(0, 7.6, 1.45),
        new THREE.Vector3(44, 24, 36),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C15. 3D NAND Vertical Charge-Trap (CTF) Memory Pillar Cutaway Stack
  // =========================================================================
  {
    const g = new THREE.Group();
    // 9 alternating tungsten wordline & oxide dielectric decks pierced by 4×2 smooth vertical CTF pillars!
    for (let k = 0; k < 9; k++) {
      const wl = new THREE.Mesh(
        createChamferedBoxGeo(10.6, 6.4, 0.12, 0.18, 0.02, 'z'),
        k % 2 === 0 ? mats.tungstenGrid : mats.interlayerDielectric
      );
      wl.position.z = (k - 4) * 0.19;
      g.add(wl);
    }
    const pillarGeo = hiResCyl(0.46, 0.46, 1.78, 18);
    pillarGeo.rotateX(Math.PI / 2);
    const coreGeo = hiResCyl(0.24, 0.24, 1.88, 14);
    coreGeo.rotateX(Math.PI / 2);
    for (const px of [-3.6, -1.2, 1.2, 3.6]) {
      for (const py of [-1.55, 1.55]) {
        const pillar = new THREE.Mesh(pillarGeo, mats.siliconPhotodiode);
        pillar.position.set(px, py, 0);
        pillar.userData.noEdges = true;
        const core = new THREE.Mesh(coreGeo, mats.goldPlating);
        core.position.set(px, py, 0);
        core.userData.noEdges = true;
        g.add(pillar, core);
      }
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-3d-nand-vertical-pillar',
        15,
        '#a855f7',
        g,
        new THREE.Vector3(0, 15.8, 1.38),
        new THREE.Vector3(-24, 62, 54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C16. High-Speed LPDDR4 DRAM Cache IC (FTL Mapping Table Accelerator)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Laser-marked Micron LPDDR4 FBGA DRAM cache package with ABF substrate & Pin-1 dot
    const dramPkg = buildChipPackage({
      w: 9.6,
      d: 11.4,
      h: 0.92,
      style: 'bga',
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzPopDramTop,
      pin1Mat: mats.goldPlating,
      substrateMat: u.bionzAbfSubstrate,
      axis: 'z',
    });
    g.add(dramPkg);

    parts.push(
      finalizeCfexpressPart(
        'cfe-lpddr4-dram-cache',
        16,
        '#6366f1',
        g,
        new THREE.Vector3(9.4, -8.5, 0.85),
        new THREE.Vector3(56, -24, 24),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C17. On-Card Multi-Channel PMIC Power-Management IC
  // =========================================================================
  {
    const g = new THREE.Group();
    const pmic = buildChipPackage({
      w: 6.9,
      d: 6.9,
      h: 0.86,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    // Faces -Z (rear side of PCB)
    pmic.rotation.y = Math.PI;
    g.add(pmic);

    parts.push(
      finalizeCfexpressPart(
        'cfe-pmic-buck-regulator',
        17,
        '#ef4444',
        g,
        new THREE.Vector3(9.6, -9.2, -0.85),
        new THREE.Vector3(56, -22, -26),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C18. Ultra-Thin Shielded Power Inductors & High-Density 0201 MLCC Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 genuine ultra-low-profile molded shielded metal-alloy power inductors (1R0 / 2R2) on rear side
    for (let i = 0; i < 3; i++) {
      const ind = buildShieldedInductor(
        3.25,
        0.92,
        mats.ferriteInductor,
        mats.silverElectrode,
        mats.silverElectrode,
        'z'
      );
      ind.rotation.y = Math.PI;
      ind.position.set(4.5 + i * 3.85, -1.6, -0.86);
      g.add(ind);
    }
    // 10 realistic 0201 ceramic decoupling MLCC capacitors with wrapped Ni-Sn end-caps!
    for (let i = 0; i < 10; i++) {
      const mlcc = buildSmdPassive(1.18, 0.66, 0.54, mats.smdCeramic, mats.silverElectrode, 'z');
      mlcc.position.set(-12.6 + i * 1.95, 1.25, 0.72);
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
        0.2
      )
    );
  }

  // =========================================================================
  // C19. Power-Loss Protection (PLP) Tantalum / Polymer Hold-Up Capacitors
  // =========================================================================
  {
    const g = new THREE.Group();
    // 2 authentic molded yellow tantalum PLP hold-up capacitors with anode polarity bar & J-leads!
    for (const cy of [-2.45, 2.45]) {
      const tant = buildTantalumCap(
        7.0,
        3.65,
        1.02,
        mats.tantalumCapYellow,
        mats.cinnabarAnodized,
        mats.silverElectrode,
        'z'
      );
      tant.rotation.y = Math.PI;
      tant.position.y = cy;
      g.add(tant);
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
        0.22
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
      const cap = buildSmdPassive(2.45, 1.4, 0.6, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.rotation.z = Math.PI / 2;
      cap.position.x = cx;
      g.add(cap);
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
        0.2
      )
    );
  }

  // =========================================================================
  // C21. Ultra-Low-Capacitance TVS ESD Protection Diode Array (±15 kV)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sx of [-6.0, 6.0]) {
      const tvs = buildChipPackage({
        w: 5.6,
        d: 2.25,
        h: 0.66,
        style: 'dfn',
        pinsPerSide: 5,
        bodyMat: u.icEpoxyLaser,
        leadMat: mats.goldPlating,
        pin1Mat: mats.silverElectrode,
        axis: 'z',
      });
      tvs.rotation.y = Math.PI;
      tvs.position.x = sx;
      g.add(tvs);
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
        0.22
      )
    );
  }

  // =========================================================================
  // C22. Ultra-Miniature Crystal Oscillator & PCIe 100 MHz REFCLK Buffer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ceramic base + chamfered gold-seam-welded 2520 crystal oscillator lid
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(3.9, 2.9, 0.38, 0.25, 0.04, 'z'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(-2.4, 0, -0.15);
    const xtalLid = new THREE.Mesh(
      createChamferedBoxGeo(3.45, 2.45, 0.45, 0.22, 0.05, 'z'),
      mats.goldPlating
    );
    xtalLid.position.set(-2.4, 0, 0.22);

    const pllBuf = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.66,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    pllBuf.position.x = 2.4;
    g.add(xtalBase, xtalLid, pllBuf);

    parts.push(
      finalizeCfexpressPart(
        'cfe-xtal-clock-gen',
        22,
        '#facc15',
        g,
        new THREE.Vector3(8.5, -17.5, 0.75),
        new THREE.Vector3(46, -46, 30),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C23. Dedicated Serial SPI NOR Flash Firmware & Factory Bad-Block ROM
  // =========================================================================
  {
    const g = new THREE.Group();
    const norIc = buildChipPackage({
      w: 5.8,
      d: 4.6,
      h: 0.85,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    norIc.rotation.y = Math.PI;
    g.add(norIc);

    parts.push(
      finalizeCfexpressPart(
        'cfe-spi-nor-firmware',
        23,
        '#8b5cf6',
        g,
        new THREE.Vector3(-11.2, 0.2, -0.82),
        new THREE.Vector3(-60, 8, -32),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C24. High-Precision Digital Thermal Sensor & Adaptive Throttling Logic
  // =========================================================================
  {
    const g = new THREE.Group();
    const sensorIc = buildChipPackage({
      w: 3.8,
      d: 3.8,
      h: 0.72,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.cinnabarAnodized,
      leadMat: mats.goldPlating,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    const sensePad = new THREE.Mesh(
      createChamferedBoxGeo(4.45, 4.45, 0.16, 0.3, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    sensePad.position.z = -0.32;
    sensePad.userData.noEdges = true;
    g.add(sensorIc, sensePad);

    parts.push(
      finalizeCfexpressPart(
        'cfe-thermal-sensor-diode',
        24,
        '#f43f5e',
        g,
        new THREE.Vector3(-0.2, -2.0, 0.75),
        new THREE.Vector3(-42, 4, 42),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C25. Sony Proprietary Pure Copper Internal Heat Spreader Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    const cuGeo = extrudeHiRes(createRoundedRectShape(34.6, 44.0, 1.8), 0.36, 0.05, 0.05, 2, 20);
    applyPlanarUVs(cuGeo, 34.6, 44.0, 'xy');
    const cuPlate = new THREE.Mesh(cuGeo, u.cfeCopperThermal);

    // Stamped embossed thermal contact pedestals pressing directly onto Controller SoC & Primary NAND!
    const bossSoc = new THREE.Mesh(
      createChamferedBoxGeo(13.6, 13.6, 0.44, 0.6, 0.08, 'z'),
      mats.copperHeatSpreader
    );
    bossSoc.position.set(-6.2, -9.0, -0.22);
    const bossNand = new THREE.Mesh(
      createChamferedBoxGeo(24.0, 16.0, 0.3, 0.8, 0.06, 'z'),
      mats.copperHeatSpreader
    );
    bossNand.position.set(0, 12.6, -0.16);
    g.add(cuPlate, bossSoc, bossNand);

    parts.push(
      finalizeCfexpressPart(
        'cfe-copper-heat-spreader',
        25,
        '#ea580c',
        g,
        new THREE.Vector3(0, 2.2, 1.78),
        new THREE.Vector3(0, 0, 44),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C26. Ultra-Thin Silicone Thermal Pad (TIM) & High-Orientation Graphene Sheet
  // =========================================================================
  {
    const g = new THREE.Group();
    const timSoc = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 13.2, 0.38, 0.65, 0.08, 'z'),
      mats.thermalPadPink
    );
    timSoc.position.set(-6.2, -9.0, 0.15);
    const timNand = new THREE.Mesh(
      createChamferedBoxGeo(24.2, 16.4, 0.34, 0.75, 0.07, 'z'),
      mats.thermalPadBlue
    );
    timNand.position.set(0, 12.6, 0.15);
    const grapheneBack = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(33.8, 43.0, 1.6), 0.24, 0.04, 0.04, 1, 20),
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
        0.18
      )
    );
  }

  // =========================================================================
  // C27. Ultra-Thin Permalloy / Nickel-Silver EMI Electromagnetic Shield Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    const emiCollar = new THREE.Mesh(
      extrudeHiRes(createFrameShape(17.4, 17.4, 1.3, 14.4, 14.4, 0.9), 1.25, 0.06, 0.06, 2, 20),
      mats.emiShieldCan
    );
    // Stamped corner retention spring tabs on EMI shield fence
    for (const sx of [-7.8, 7.8]) {
      for (const sy of [-5.2, 5.2]) {
        const dimple = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.28, 12).rotateX(Math.PI / 2), mats.silverElectrode);
        dimple.position.set(sx, sy, 0.65);
        dimple.userData.noEdges = true;
        g.add(dimple);
      }
    }
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
        0.2
      )
    );
  }

  // =========================================================================
  // C28. BGA Solder-Ball Protective Underfill Epoxy Resin (7.5m Drop Armor)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sloped perimeter capillary underfill fillets framing Controller & NAND BGAs
    const underfillSoc = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.0, 15.0, 0.7, 13.2, 13.2, 0.4), 0.34, 0.08, 0.08, 2, 16),
      mats.makeupSealViolet
    );
    underfillSoc.position.set(-6.2, -9.0, 0);
    const underfillNand = new THREE.Mesh(
      extrudeHiRes(createFrameShape(26.4, 18.4, 0.8, 24.4, 16.4, 0.5), 0.34, 0.08, 0.08, 2, 16),
      mats.makeupSealViolet
    );
    underfillNand.position.set(0, 12.6, 0);
    g.add(underfillSoc, underfillNand);

    // Smooth spherical SAC305 BGA solder ball array (preserved hi-res spheres via InstancedMesh!)
    const ballGeo = hiResSphere(0.32, 10, 8);
    const ballInst = new THREE.InstancedMesh(ballGeo, mats.solderBallSilver, 35);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let ix = -3; ix <= 3; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        dm.position.set(ix * 3.0, 12.6 + iy * 3.0, -0.1);
        dm.updateMatrix();
        ballInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    ballInst.instanceMatrix.needsUpdate = true;
    ballInst.userData.noEdges = true;
    g.add(ballInst);

    parts.push(
      finalizeCfexpressPart(
        'cfe-bga-underfill-epoxy',
        28,
        '#9333ea',
        g,
        new THREE.Vector3(0, 0, 0.54),
        new THREE.Vector3(-56, 36, -18),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C29. S.M.A.R.T. Health Diagnostics & Media Scan Utility Wear-Monitor Logic
  // =========================================================================
  {
    const g = new THREE.Group();
    const smartBlock = buildChipPackage({
      w: 8.2,
      d: 5.2,
      h: 0.56,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.batBmsPcb,
      leadMat: mats.goldPlating,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    // 3 stepped emerald health-telemetry LED status bars on top
    for (let i = 0; i < 3; i++) {
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(1.42, 3.1, 0.16, 0.14, 0.03, 'z'),
        mats.cfaGreen
      );
      bar.position.set(-2.2 + i * 2.1, 0, 0.34);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    g.add(smartBlock);

    parts.push(
      finalizeCfexpressPart(
        'cfe-smart-health-monitor',
        29,
        '#22c55e',
        g,
        new THREE.Vector3(9.8, 0.5, 0.8),
        new THREE.Vector3(60, 14, 42),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C30. Ergonomic Non-Slip Pull-Tab Rib & Anti-X-Ray / Anti-UV Label Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculpted 5-ridge ergonomic non-slip extraction pull-tab bar at card tail (y = +26.4)
    const pullBaseGeo = createChamferedBoxGeo(36.8, 3.8, 2.8, 0.75, 0.16, 'z');
    applyBoxUVs(pullBaseGeo, 12.0);
    const pullBase = new THREE.Mesh(pullBaseGeo, u.batPolycarbonateShell);
    pullBase.position.set(0, 26.35, 0);
    g.add(pullBase);

    for (let i = 0; i < 5; i++) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(33.2, 0.36, 3.18, 0.14, 0.06, 'z'),
        mats.matteBlackAnodized
      );
      rib.position.set(0, 25.05 + i * 0.66, 0);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Internal anti-X-ray metallic foil strip concealed beneath top lip (zero translucent rim on C01!)
    const xrayInlay = new THREE.Mesh(
      createChamferedBoxGeo(32.0, 1.4, 0.14, 0.2, 0.02, 'z'),
      mats.silverElectrode
    );
    xrayInlay.position.set(0, 25.2, 1.72);
    xrayInlay.userData.noEdges = true;
    g.add(xrayInlay);

    parts.push(
      finalizeCfexpressPart(
        'cfe-grip-pull-tab-rib',
        30,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(22, 48, 34),
        cp,
        0.18
      )
    );
  }

  parts.push(...buildCfexpressUltra27Parts(mats));
  parts.push(...buildCfexpressUltra28Parts(mats));
  return parts;
}
