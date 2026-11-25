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
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';
import { buildCfexpressUltra27Parts } from './cfexpressUltra27Parts';
import { buildCfexpressUltra28Parts } from './cfexpressUltra28Parts';
import { buildCfexpressUltra29Parts } from './cfexpressUltra29Parts';

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

function addInstancedBalls(
  parent: THREE.Group,
  cols: number,
  rows: number,
  pitchX: number,
  pitchY: number,
  offsetX: number,
  offsetY: number,
  z: number,
  radius: number,
  mat: THREE.Material
): void {
  const count = cols * rows;
  const geo = hiResSphere(radius, 8, 6);
  const inst = new THREE.InstancedMesh(geo, mat, count);
  const dm = new THREE.Object3D();
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dm.position.set(
        offsetX + (c - (cols - 1) * 0.5) * pitchX,
        offsetY + (r - (rows - 1) * 0.5) * pitchY,
        z
      );
      dm.updateMatrix();
      inst.setMatrixAt(idx++, dm.matrix);
    }
  }
  inst.instanceMatrix.needsUpdate = true;
  inst.userData.noEdges = true;
  parent.add(inst);
}

/**
 * Phase 26B / 27 / 28 / 29 — Standalone CFexpress 4.0 Card Ultra-Dissection (Sony CEA-G1920T Type A TOUGH / PCIe Gen4 NVMe 2.4 / BiCS10 332L / Quantum & SerDes: 130 Parts C01–C130).
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
    const armorW = 38.6;
    const armorH = 51.4;
    const armorGeo = extrudeHiRes(createRoundedRectShape(armorW, armorH, 2.3), 0.78, 0.14, 0.14, 3, 24);
    applyPlanarUVs(armorGeo, armorW, armorH, 'xy');
    const topArmor = new THREE.Mesh(armorGeo, u.cfeTopArmorShell);

    // Dual-step CNC-milled titanium micro-bevel trim framing the front TOUGH label cleanly
    const bezelRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(armorW + 0.35, armorH + 0.35, 2.5, armorW - 1.15, armorH - 1.15, 2.0), 0.28, 0.05, 0.05, 2, 22),
      mats.titaniumRivet
    );
    bezelRim.position.z = 0.24;
    bezelRim.userData.noEdges = true;

    // Inner (-Z) CNC-machined structural waffle stiffening ribs & thermal-contact press bosses (invisible from front when assembled!)
    const innerFlange = new THREE.Mesh(
      extrudeHiRes(createFrameShape(armorW - 1.2, armorH - 1.2, 1.9, armorW - 3.6, armorH - 3.6, 1.5), 0.14, 0.03, 0.03, 1, 18),
      mats.stainlessMachined
    );
    innerFlange.position.z = -0.40;
    innerFlange.userData.noEdges = true;

    // Inner thermal-contact machined boss pads directly over Controller SoC & Primary 16DP NAND
    const socPressBoss = new THREE.Mesh(createChamferedBoxGeo(12.8, 12.8, 0.12, 0.5, 0.03, 'z'), mats.titaniumRivet);
    socPressBoss.position.set(-6.2, -10.4, -0.40);
    socPressBoss.userData.noEdges = true;
    const nandPressBoss = new THREE.Mesh(createChamferedBoxGeo(23.6, 15.6, 0.12, 0.6, 0.03, 'z'), mats.titaniumRivet);
    nandPressBoss.position.set(0, 11.2, -0.40);
    nandPressBoss.userData.noEdges = true;

    // 4 inner corner laser-locating datum pins + longitudinal anti-bend stiffening ribs (150N TOUGH spec!)
    const ribGeo = new THREE.BoxGeometry(0.45, 44.0, 0.1);
    for (const rx of [-14.2, 14.2]) {
      const rib = new THREE.Mesh(ribGeo, mats.stainlessMachined);
      rib.position.set(rx, 0, -0.41);
      rib.userData.noEdges = true;
      g.add(rib);
    }
    const pinGeo = hiResCyl(0.42, 0.42, 0.22, 12).rotateX(Math.PI / 2);
    for (const [px, py] of [
      [-16.4, 22.8],
      [16.4, 22.8],
      [-16.4, -22.8],
      [16.4, -22.8],
    ]) {
      const pin = new THREE.Mesh(pinGeo, mats.goldPlating);
      pin.position.set(px, py, -0.42);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    g.add(topArmor, bezelRim, innerFlange, socPressBoss, nandPressBoss);

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

    // Inner (+Z) laser-clinch perimeter flange + precision thermal pedestals touching Controller copper slug & rear NAND!
    const clinchRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(plateW - 1.0, plateH - 1.0, 1.85, plateW - 3.2, plateH - 3.2, 1.45), 0.12, 0.03, 0.03, 1, 18),
      mats.titaniumRivet
    );
    clinchRim.position.z = 0.42;
    clinchRim.userData.noEdges = true;

    const rearSocPad = new THREE.Mesh(createChamferedBoxGeo(11.4, 11.4, 0.12, 0.45, 0.03, 'z'), mats.copperHeatSpreader);
    rearSocPad.position.set(-6.2, -10.6, 0.42);
    rearSocPad.userData.noEdges = true;

    const rearNandPad = new THREE.Mesh(createChamferedBoxGeo(23.8, 15.8, 0.10, 0.55, 0.02, 'z'), mats.titaniumRivet);
    rearNandPad.position.set(0, 11.0, 0.41);
    rearNandPad.userData.noEdges = true;

    // 6 perimeter stainless interlocking weld clinch tabs + 4 transverse heat-equalization ribs on inner face
    const tabGeo = new THREE.BoxGeometry(0.65, 2.2, 0.16);
    for (const sx of [-17.9, 17.9]) {
      for (const sy of [-15.5, 0, 15.5]) {
        const tab = new THREE.Mesh(tabGeo, mats.stainlessMachined);
        tab.position.set(sx, sy, 0.44);
        tab.userData.noEdges = true;
        g.add(tab);
      }
    }
    const grooveGeo = new THREE.BoxGeometry(31.0, 0.32, 0.06);
    for (const gy of [-19.5, -2.2, 21.5]) {
      const groove = new THREE.Mesh(grooveGeo, mats.matteBlackAnodized);
      groove.position.set(0, gy, 0.42);
      groove.userData.noEdges = true;
      g.add(groove);
    }
    g.add(botPlate, innerThermalFace, clinchRim, rearSocPad, rearNandPad);

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
    // Full-depth 5.42 mm Sony TOUGH monolithic obsidian-resin perimeter body sealing ALL 4 sides 100% solid!
    const monoGeo = extrudeHiRes(createFrameShape(40.4, 55.8, 3.0, 35.2, 48.8, 1.9), 5.42, 0.24, 0.22, 3, 26);
    applyBoxUVs(monoGeo, 14.0);
    const monoFrame = new THREE.Mesh(monoGeo, u.batPolycarbonateShell);

    // Internal stepped armor-seating ledges (front & rear) + 4 molded titanium corner reinforcement bosses
    const innerSeatGeo = extrudeHiRes(createFrameShape(37.6, 51.4, 2.1, 35.0, 48.6, 1.8), 1.45, 0.05, 0.05, 1, 20);
    const innerSeat = new THREE.Mesh(innerSeatGeo, mats.matteBlackAnodized);
    innerSeat.userData.noEdges = true;

    const cornerBossGeo = hiResCyl(0.75, 0.75, 4.1, 14).rotateX(Math.PI / 2);
    for (const [bx, by] of [
      [-18.2, 24.4],
      [18.2, 24.4],
      [-18.2, -24.0],
      [18.2, -24.0],
    ]) {
      const boss = new THREE.Mesh(cornerBossGeo, mats.titaniumRivet);
      boss.position.set(bx, by, 0);
      boss.userData.noEdges = true;
      g.add(boss);
    }

    // Asymmetric Type-A poka-yoke left guide rail with chamfered lower lead-in nose
    const sideRailGeo = createChamferedBoxGeo(1.45, 34.8, 2.8, 0.35, 0.14, 'z');
    applyBoxUVs(sideRailGeo, 12.0);
    const sideRail = new THREE.Mesh(sideRailGeo, mats.matteBlackAnodized);
    sideRail.position.set(-20.1, 2.0, 0);

    // Right-side solid stepped flange & sculpted push-push heart-cam lock detent pocket
    const rightFlangeGeo = createChamferedBoxGeo(1.05, 48.0, 5.15, 0.25, 0.12, 'z');
    applyBoxUVs(rightFlangeGeo, 12.0);
    const rightFlange = new THREE.Mesh(rightFlangeGeo, u.batPolycarbonateShell);
    rightFlange.position.set(19.75, 1.2, 0);
    rightFlange.userData.noEdges = true;

    const detentPocket = new THREE.Mesh(createChamferedBoxGeo(0.42, 4.8, 2.5, 0.16, 0.05, 'z'), mats.matteBlackAnodized);
    detentPocket.position.set(20.16, -2.0, 0);
    detentPocket.userData.noEdges = true;

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

    // Molded upper-left & upper-right side extraction grip flutes
    const fluteGeo = new THREE.BoxGeometry(0.18, 0.72, 3.6);
    for (const sx of [-20.18, 20.18]) {
      for (let i = 0; i < 4; i++) {
        const flute = new THREE.Mesh(fluteGeo, mats.matteBlackAnodized);
        flute.position.set(sx, 19.2 + i * 1.65, 0);
        flute.userData.noEdges = true;
        g.add(flute);
      }
    }

    // Internal PCB centering alignment stanchions seated strictly along inner wall
    const stanchionGeo = new THREE.BoxGeometry(0.55, 2.6, 2.2);
    for (const sx of [-17.4, 17.4]) {
      for (const sy of [-14.0, 4.0, 18.0]) {
        const st = new THREE.Mesh(stanchionGeo, mats.matteBlackAnodized);
        st.position.set(sx, sy, 0);
        st.userData.noEdges = true;
        g.add(st);
      }
    }

    g.add(monoFrame, innerSeat, sideRail, rightFlange, detentPocket);

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
    // Dual-lip fluorocarbon EPDM IP57 O-ring gasket seated STRICTLY INSIDE the monolithic armor channel
    const ip57Seal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.8, 49.6, 2.1, 35.3, 48.1, 1.65), 0.55, 0.08, 0.08, 2, 22),
      mats.epdmGasket
    );
    ip57Seal.position.set(0, 1.3, 1.55);

    // Secondary raised inner hydrostatic water-sealing compression lip (front + rear)
    const innerLipF = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.1, 48.9, 1.85, 35.55, 48.35, 1.7), 0.18, 0.04, 0.04, 1, 20),
      mats.fluorineCoatCyan
    );
    innerLipF.position.set(0, 1.3, 1.84);
    innerLipF.userData.noEdges = true;

    const ip57Back = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.8, 49.6, 2.1, 35.3, 48.1, 1.65), 0.55, 0.08, 0.08, 2, 22),
      u.micRubberBootBlack
    );
    ip57Back.position.set(0, 1.3, -1.55);

    const innerLipB = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.1, 48.9, 1.85, 35.55, 48.35, 1.7), 0.18, 0.04, 0.04, 1, 20),
      mats.fluorineCoatCyan
    );
    innerLipB.position.set(0, 1.3, -1.84);
    innerLipB.userData.noEdges = true;

    // 8 vulcanized elastomer corner/flank tie-bridges locking front & rear IP57 seals into one monolithic barrier
    const tieGeo = hiResCyl(0.36, 0.36, 3.1, 10).rotateX(Math.PI / 2);
    for (const [tx, ty] of [
      [-17.8, 24.0],
      [17.8, 24.0],
      [-17.8, -21.4],
      [17.8, -21.4],
      [-18.0, 1.3],
      [18.0, 1.3],
      [0, 25.4],
      [0, -22.8],
    ]) {
      const tie = new THREE.Mesh(tieGeo, mats.epdmGasket);
      tie.position.set(tx, ty, 0);
      tie.userData.noEdges = true;
      g.add(tie);
    }
    g.add(ip57Seal, innerLipF, ip57Back, innerLipB);

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

    // 30-degree chamfered lower PCB mating edge nose bar
    const noseLip = new THREE.Mesh(createChamferedBoxGeo(32.2, 0.42, 0.72, 0.14, 0.12, 'z'), mats.pcbEdgeLaminate);
    noseLip.position.set(0, -3.12, 0);
    noseLip.userData.noEdges = true;
    g.add(noseLip);

    // Verified exact CFexpress Type A 21-pin staggered hard-gold contact array:
    // First-make longer GND/+3V3 pins: 1, 4, 10, 15, 18, 21; Last-make recessed INS# card-detect: pin 12!
    const firstMakePins = new Set([1, 4, 10, 15, 18, 21]);
    const viaGeo = hiResCyl(0.30, 0.30, 1.18, 12).rotateX(Math.PI / 2);
    const viaRingGeo = hiResCyl(0.46, 0.46, 1.08, 12).rotateX(Math.PI / 2);
    const neckGeo = new THREE.BoxGeometry(0.26, 1.45, 0.09);

    for (let pin = 1; pin <= 21; pin++) {
      const fx = -15.0 + (pin - 1) * 1.5;
      const isLong = firstMakePins.has(pin);
      const isIns = pin === 12;
      const len = isLong ? 5.6 : isIns ? 3.8 : 4.75;
      const yShift = isLong ? -0.42 : isIns ? 0.45 : -0.05;

      // Primary lower contact face (-Z) & top mirror contact face (+Z) with visible Ni diffusion under-step!
      for (const sz of [-0.58, 0.58]) {
        const niStep = new THREE.Mesh(
          createChamferedBoxGeo(1.06, len + 0.18, 0.12, 0.24, 0.02, 'z'),
          mats.stainlessMachined
        );
        niStep.position.set(fx, yShift, sz * 0.90);
        niStep.userData.noEdges = true;

        const finger = new THREE.Mesh(
          createChamferedBoxGeo(0.94, len, 0.18, 0.22, 0.04, 'z'),
          mats.goldPlating
        );
        finger.position.set(fx, yShift, sz);
        finger.userData.noEdges = true;

        // Micro gold neck trace with teardrop widening rising from each contact finger up into the HDI bus
        const neck = new THREE.Mesh(neckGeo, mats.copperCoil);
        neck.position.set(fx, 2.32, sz * 0.92);
        neck.userData.noEdges = true;
        g.add(niStep, finger, neck);
      }
      // Staggered dual-row escape micro-via collars (prevents adjacent via crosstalk on 0.75 mm pitch!)
      const viaY = pin % 2 === 0 ? 2.68 : 2.98;
      const viaRing = new THREE.Mesh(viaRingGeo, mats.copperHybridBond);
      viaRing.position.set(fx, viaY, 0);
      viaRing.userData.noEdges = true;
      const via = new THREE.Mesh(viaGeo, mats.goldPlating);
      via.position.set(fx, viaY, 0);
      via.userData.noEdges = true;
      g.add(viaRing, via);
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

    // Chamfered lead-in alignment guide ramps on left/right cheeks + recessed upper frame lock dovetails
    const rampGeo = createChamferedBoxGeo(1.1, 1.4, 3.6, 0.2, 0.08, 'z');
    for (const rx of [-17.4, 16.8]) {
      const ramp = new THREE.Mesh(rampGeo, mats.titaniumRivet);
      ramp.position.set(rx, -2.55, 0);
      ramp.userData.noEdges = true;
      g.add(ramp);
    }
    const lugGeo = createChamferedBoxGeo(3.2, 0.85, 0.72, 0.16, 0.04, 'z');
    for (const lx of [-11.5, 0, 11.5]) {
      for (const lz of [-1.6, 1.6]) {
        const lug = new THREE.Mesh(lugGeo, mats.matteBlackAnodized);
        lug.position.set(lx, 3.15, lz);
        lug.userData.noEdges = true;
        g.add(lug);
      }
    }

    // 20×2 razor-thin precision molded dielectric inter-pin separator comb fins with tapered lead-in noses!
    const combGeo = createChamferedBoxGeo(0.26, 5.45, 0.56, 0.08, 0.04, 'z');
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
    const pcbW = 34.0;
    const pcbH = 46.8;
    const pcbGeo = extrudeHiRes(createRoundedRectShape(pcbW, pcbH, 1.5), 0.96, 0.08, 0.08, 2, 20);
    applyPlanarUVs(pcbGeo, pcbW, pcbH, 'xy');
    const pcbCore = new THREE.Mesh(pcbGeo, u.cfeHdiPcb);

    // Visible 8-layer copper/prepreg micro-strata lamination bands along the PCB perimeter edge!
    for (let layer = 0; layer < 4; layer++) {
      const zL = -0.33 + layer * 0.22;
      const foilEdge = new THREE.Mesh(
        extrudeHiRes(createFrameShape(pcbW + 0.06, pcbH + 0.06, 1.52, pcbW - 0.32, pcbH - 0.32, 1.32), 0.07, 0.01, 0.01, 1, 16),
        layer % 2 === 0 ? mats.copperCoil : mats.goldPlating
      );
      foilEdge.position.z = zL;
      foilEdge.userData.noEdges = true;
      g.add(foilEdge);
    }

    // 4 plated corner SMT tooling datum holes with gold annular rings
    const ringGeo = hiResCyl(0.85, 0.85, 1.04, 16).rotateX(Math.PI / 2);
    const holeGeo = hiResCyl(0.46, 0.46, 1.1, 14).rotateX(Math.PI / 2);
    for (const [hx, hy] of [
      [-15.2, 21.4],
      [15.2, 21.4],
      [-15.2, -21.4],
      [15.2, -21.4],
    ]) {
      const ring = new THREE.Mesh(ringGeo, mats.goldPlating);
      ring.position.set(hx, hy, 0);
      ring.userData.noEdges = true;
      const hole = new THREE.Mesh(holeGeo, mats.matteBlackAnodized);
      hole.position.set(hx, hy, 0);
      hole.userData.noEdges = true;
      g.add(ring, hole);
    }

    // Precision gold side edge ground-castellation contact pads linking PCB GND plane to shell EMI clips
    const castGeo = new THREE.BoxGeometry(0.45, 2.6, 1.02);
    for (const sx of [-16.88, 16.88]) {
      for (const sy of [-15.5, 17.0]) {
        const cast = new THREE.Mesh(castGeo, mats.goldPlating);
        cast.position.set(sx, sy, 0);
        cast.userData.noEdges = true;
        g.add(cast);
      }
    }
    g.add(pcbCore);

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
  // C08. Next-Gen 6nm/7nm PCIe Gen4 NVMe 2.0 Main Controller SoC
  // =========================================================================
  {
    const g = new THREE.Group();
    // 6-layer AT&S ABF carrier substrate
    const subGeo = createChamferedBoxGeo(14.2, 14.2, 0.44, 0.4, 0.05, 'z');
    applyPlanarUVs(subGeo, 14.2, 14.2, 'xy');
    const substrate = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);

    // Laser-marked Sony / Phison PS5027-E27T PCIe Gen4 NVMe 2.0 BGA controller package!
    const socGeo = createChamferedBoxGeo(13.2, 13.2, 0.96, 0.35, 0.1, 'z');
    applyPlanarUVs(socGeo, 13.2, 13.2, 'xy');
    const socBody = new THREE.Mesh(socGeo, u.cfeControllerPkg);
    socBody.position.z = 0.64;

    // Laser-etched Pin-1 corner triangle index + opposite mold ejector pin dimple ring
    const pin1 = new THREE.Mesh(hiResCyl(0.42, 0.42, 0.06, 3).rotateX(Math.PI / 2), mats.goldPlating);
    pin1.position.set(-5.2, -5.2, 1.14);
    pin1.userData.noEdges = true;
    const ejector = new THREE.Mesh(hiResTorus(0.46, 0.08, 6, 16), mats.matteBlackAnodized);
    ejector.position.set(5.1, 5.1, 1.13);
    ejector.userData.noEdges = true;

    // 12 ultra-miniature 0201 decoupling MLCCs flanking ALL 4 sides of the controller on its ABF carrier
    for (let i = 0; i < 4; i++) {
      for (const sy of [-6.92, 6.92]) {
        const cap = buildSmdPassive(1.12, 0.58, 0.40, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.position.set(-4.2 + i * 2.8, sy, 0.36);
        g.add(cap);
      }
    }
    for (let j = 0; j < 2; j++) {
      for (const sx of [-6.92, 6.92]) {
        const cap = buildSmdPassive(1.12, 0.58, 0.40, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.rotation.z = Math.PI / 2;
        cap.position.set(sx, -2.2 + j * 4.4, 0.36);
        g.add(cap);
      }
    }

    // Exposed 8×8 bottom SAC305 BGA solder-ball grid beneath the ABF carrier!
    addInstancedBalls(g, 8, 8, 1.52, 1.52, 0, 0, -0.34, 0.24, mats.solderBallSilver);

    g.add(substrate, socBody, pin1, ejector);

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
    // Monolithic 6nm bare-silicon interposer plate anchoring the dual ARM Cortex-R5/R8 cores & FTL crossbar
    const dieSubGeo = createChamferedBoxGeo(9.6, 7.6, 0.16, 0.22, 0.03, 'z');
    applyPlanarUVs(dieSubGeo, 9.6, 7.6, 'xy');
    const dieSub = new THREE.Mesh(dieSubGeo, mats.siliconBulk);
    dieSub.position.set(0, 0.65, -0.14);
    g.add(dieSub);

    // Dual symmetric ARM Cortex-R5/R8 core tiles with micro-etched L1 I/D-cache SRAM banks & ALU strips
    for (const cx of [-2.35, 2.35]) {
      const coreGeo = createChamferedBoxGeo(4.2, 4.2, 0.34, 0.16, 0.04, 'z');
      applyPlanarUVs(coreGeo, 4.2, 4.2, 'xy');
      const core = new THREE.Mesh(coreGeo, u.bionzDieFloorplan);
      core.position.set(cx, 2.2, 0.04);

      const frame = new THREE.Mesh(
        extrudeHiRes(createFrameShape(4.3, 4.3, 0.18, 3.85, 3.85, 0.12), 0.1, 0.02, 0.02, 1, 10),
        mats.goldPlating
      );
      frame.position.set(cx, 2.2, 0.24);
      frame.userData.noEdges = true;

      // L1 Instruction & Data Cache SRAM sub-blocks + ALU execution core inside each CPU tile
      for (const sx of [-0.95, 0.95]) {
        const l1 = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.35, 0.09), mats.siliconTsvDram);
        l1.position.set(cx + sx, 3.05, 0.24);
        l1.userData.noEdges = true;
        g.add(l1);
      }
      const alu = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.15, 0.09), mats.copperHybridBond);
      alu.position.set(cx, 1.28, 0.24);
      alu.userData.noEdges = true;
      g.add(core, frame, alu);
    }

    // Shared L2 Cache & AXI4 Golden Crossbar Interconnect Bus + FTL Address-Translation CAM Lookup Table
    const ftlBus = new THREE.Mesh(createChamferedBoxGeo(8.9, 1.35, 0.32, 0.16, 0.04, 'z'), mats.goldPlating);
    ftlBus.position.set(0, -1.05, 0.04);

    for (let i = 0; i < 6; i++) {
      const camCell = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.72, 0.12), mats.vcWorkingFluidCyan);
      camCell.position.set(-3.4 + i * 1.36, -2.35, 0.14);
      camCell.userData.noEdges = true;
      g.add(camCell);
    }
    // Vertical AXI bus bridges connecting both cores down to FTL bus
    for (const bx of [-3.1, -1.6, 1.6, 3.1]) {
      const br = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.95, 0.12), mats.copperCoil);
      br.position.set(bx, -0.1, 0.22);
      br.userData.noEdges = true;
      g.add(br);
    }
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
    const ldpcGeo = createChamferedBoxGeo(5.9, 3.9, 0.36, 0.16, 0.04, 'z');
    applyPlanarUVs(ldpcGeo, 5.9, 3.9, 'xy');
    const ldpcMatrix = new THREE.Mesh(ldpcGeo, u.bionzCetusDie);

    // 5×3 quasi-cyclic LDPC parity-check H-matrix sub-blocks sculpted across top die face
    const cellGeo = new THREE.BoxGeometry(0.74, 0.56, 0.12);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const active = (r + c) % 2 === 0;
        const blk = new THREE.Mesh(cellGeo, active ? mats.cfaGreen : mats.siliconLogicLayer);
        blk.position.set(-2.0 + c * 1.0, 0.12 + r * 0.72, 0.22);
        blk.userData.noEdges = true;
        g.add(blk);
      }
    }

    // 4-stage pipelined copper barrel-shifter & gold CRC-32C syndrome accumulator rail
    for (let i = 0; i < 4; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.52, 0.18), mats.copperHybridBond);
      bar.position.set(-1.95 + i * 1.3, -1.22, 0.22);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    const crcRail = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.22, 0.14), mats.goldPlating);
    crcRail.position.set(0, -0.58, 0.24);
    crcRail.userData.noEdges = true;
    g.add(ldpcMatrix, crcRail);

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
      createChamferedBoxGeo(4.65, 4.05, 0.40, 0.25, 0.06, 'z'),
      mats.goldPlating
    );
    const lockShield = new THREE.Mesh(
      createChamferedBoxGeo(3.65, 3.05, 0.48, 0.2, 0.05, 'z'),
      u.icEpoxyLaser
    );

    // 4×4 AES-XTS-256 SubBytes S-box substitution grid + central hardware key-schedule torus
    const sboxGeo = new THREE.BoxGeometry(0.46, 0.36, 0.12);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const sb = new THREE.Mesh(sboxGeo, (r + c) % 2 === 0 ? mats.goldPlating : mats.copperHybridBond);
        sb.position.set(-1.05 + c * 0.70, -0.84 + r * 0.56, 0.28);
        sb.userData.noEdges = true;
        g.add(sb);
      }
    }
    const keyRing = new THREE.Mesh(hiResTorus(0.62, 0.11, 8, 20), mats.vcWorkingFluidCyan);
    keyRing.position.z = 0.34;
    keyRing.userData.noEdges = true;

    // Dual active anti-tamper serpentine gold guard rails framing the vault perimeter
    for (const sy of [-1.72, 1.72]) {
      const meshWire = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.12, 0.1), mats.rfGoldCoax);
      meshWire.position.set(0, sy, 0.24);
      meshWire.userData.noEdges = true;
      g.add(meshWire);
    }
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
  // C12. Primary High-Density 3D TLC NAND Flash Package (218–332 Layer 16DP BGA)
  // =========================================================================
  {
    const g = new THREE.Group();
    const subGeo = createChamferedBoxGeo(25.8, 17.8, 0.44, 0.45, 0.05, 'z');
    applyPlanarUVs(subGeo, 25.8, 17.8, 'xy');
    const bgaBase = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);

    const moldGeo = createChamferedBoxGeo(24.9, 16.9, 1.08, 0.4, 0.12, 'z');
    applyPlanarUVs(moldGeo, 24.9, 16.9, 'xy');
    const bgaMold = new THREE.Mesh(moldGeo, u.cfeNandPkg);
    bgaMold.position.z = 0.68;

    // Pin-1 laser gold index dot + opposite ejector dimple + side stepped package mold parting seam
    const pin1 = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.05, 14).rotateX(Math.PI / 2), mats.goldPlating);
    pin1.position.set(-10.8, -6.8, 1.24);
    pin1.userData.noEdges = true;
    const ejector = new THREE.Mesh(hiResTorus(0.52, 0.08, 6, 16), mats.matteBlackAnodized);
    ejector.position.set(10.6, 6.6, 1.23);
    ejector.userData.noEdges = true;

    // 8 miniature 0201 VCCQ/VCC decoupling MLCCs seated cleanly along the NAND ABF substrate edges!
    for (let i = 0; i < 4; i++) {
      for (const sy of [-9.28, 9.28]) {
        const cap = buildSmdPassive(1.16, 0.60, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.position.set(-9.0 + i * 6.0, sy, 0.36);
        g.add(cap);
      }
    }

    // Exposed 11×7 SAC305 BGA solder-ball grid beneath the primary NAND ABF substrate!
    addInstancedBalls(g, 11, 7, 2.05, 2.1, 0, 0, -0.34, 0.28, mats.solderBallSilver);

    g.add(bgaBase, bgaMold, pin1, ejector);

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

    const pin1 = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.05, 14).rotateX(Math.PI / 2), mats.goldPlating);
    pin1.position.set(10.8, -6.8, -1.24);
    pin1.userData.noEdges = true;

    // 6 miniature rear-side 0201 VCCQ/VCC decoupling MLCCs along top/bottom ABF edges
    for (let i = 0; i < 3; i++) {
      for (const sy of [-9.28, 9.28]) {
        const cap = buildSmdPassive(1.16, 0.60, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.rotation.y = Math.PI;
        cap.position.set(-7.5 + i * 7.5, sy, -0.36);
        g.add(cap);
      }
    }

    // Exposed 11×7 SAC305 BGA solder-ball grid on the PCB-facing (+Z) face of the secondary NAND!
    addInstancedBalls(g, 11, 7, 2.05, 2.1, 0, 0, 0.34, 0.28, mats.solderBallSilver);

    g.add(bgaBase, bgaMold, pin1);

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
      createChamferedBoxGeo(20.4, 5.4, 0.34, 0.3, 0.05, 'z'),
      mats.cinnabarAnodized
    );
    // 8 parallel high-speed pSLC interleaved plane stripes with micro-bitline sub-ribs & latch pads
    const laneGeo = createChamferedBoxGeo(1.75, 3.1, 0.14, 0.1, 0.02, 'z');
    const padGeo = new THREE.BoxGeometry(1.5, 0.42, 0.12);
    for (let i = 0; i < 8; i++) {
      const lx = -7.8 + i * 2.22;
      const lane = new THREE.Mesh(laneGeo, i % 2 === 0 ? mats.goldPlating : mats.tantalumCapYellow);
      lane.position.set(lx, 0.18, 0.22);
      lane.userData.noEdges = true;
      const latch = new THREE.Mesh(padGeo, mats.vcWorkingFluidCyan);
      latch.position.set(lx, -1.85, 0.22);
      latch.userData.noEdges = true;
      g.add(lane, latch);
    }
    // Dual golden high-current turbo write-bus collector rails along top & bottom
    const busBar = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.34, 0.16), mats.copperHeatSpreader);
    busBar.position.set(0, 2.08, 0.24);
    busBar.userData.noEdges = true;
    g.add(pslcTile, busBar);

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
    // Bottom Common Source Line (CSL) copper diffusion base plate
    const cslPlate = new THREE.Mesh(createChamferedBoxGeo(11.2, 6.8, 0.10, 0.2, 0.02, 'z'), mats.copperHeatSpreader);
    cslPlate.position.z = -0.64;
    g.add(cslPlate);

    // 11 alternating Barrierless Molybdenum/Tungsten wordline & oxide dielectric decks!
    const wlGeo = createChamferedBoxGeo(10.6, 6.4, 0.065, 0.18, 0.012, 'z');
    for (let k = 0; k < 11; k++) {
      const wl = new THREE.Mesh(
        wlGeo,
        k % 2 === 0 ? u.cfeMolyWordlineMetal : mats.interlayerDielectric
      );
      wl.position.z = -0.52 + k * 0.102;
      g.add(wl);
    }

    // 4×2 concentric cylindrical Macaroni CTF pillars: outer ONO sleeve -> poly-Si channel -> quartz SiO2 core!
    const onoGeo = hiResCyl(0.52, 0.52, 1.12, 16).rotateX(Math.PI / 2);
    const polyGeo = hiResCyl(0.36, 0.36, 1.20, 14).rotateX(Math.PI / 2);
    const coreGeo = hiResCyl(0.18, 0.18, 1.26, 12).rotateX(Math.PI / 2);
    const studGeo = hiResCyl(0.22, 0.22, 0.16, 12).rotateX(Math.PI / 2);

    for (const px of [-3.6, -1.2, 1.2, 3.6]) {
      for (const py of [-1.55, 1.55]) {
        const ono = new THREE.Mesh(onoGeo, mats.loficDielectric);
        ono.position.set(px, py, 0);
        ono.userData.noEdges = true;
        const poly = new THREE.Mesh(polyGeo, mats.siliconPhotodiode);
        poly.position.set(px, py, 0.01);
        poly.userData.noEdges = true;
        const core = new THREE.Mesh(coreGeo, mats.quartzOlpf);
        core.position.set(px, py, 0.02);
        core.userData.noEdges = true;
        const blStud = new THREE.Mesh(studGeo, mats.goldPlating);
        blStud.position.set(px, py, 0.58);
        blStud.userData.noEdges = true;
        g.add(ono, poly, core, blStud);
      }
    }

    // Top copper Bitline (BL) crossbars tying each row of vertical memory strings together!
    const blGeo = new THREE.BoxGeometry(10.2, 0.24, 0.08);
    for (const py of [-1.55, 1.55]) {
      const bl = new THREE.Mesh(blGeo, mats.copperCoil);
      bl.position.set(0, py, 0.64);
      bl.userData.noEdges = true;
      g.add(bl);
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

    // Exposed 6×7 SAC305 FBGA micro-ball grid beneath the LPDDR4 package
    addInstancedBalls(g, 6, 7, 1.38, 1.42, 0, 0, -0.56, 0.22, mats.solderBallSilver);

    // 4 flanking 0201 VDD2/VDDQ decoupling MLCCs + dual-channel DQ/CA copper fanout trace ribbons
    for (const sy of [-3.2, 3.2]) {
      for (const sx of [-5.45, 5.45]) {
        const cap = buildSmdPassive(1.05, 0.56, 0.38, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.rotation.z = Math.PI / 2;
        cap.position.set(sx, sy, -0.22);
        g.add(cap);
      }
    }
    const dqTraceGeo = new THREE.BoxGeometry(0.18, 2.2, 0.08);
    for (let k = -2; k <= 2; k++) {
      const tr = new THREE.Mesh(dqTraceGeo, mats.copperCoil);
      tr.position.set(k * 1.15, -6.55, -0.34);
      tr.userData.noEdges = true;
      g.add(tr);
    }
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
    pmic.rotation.y = Math.PI;

    // Exposed central pure-copper QFN thermal ground slug on PCB-facing (+Z) side!
    const epad = new THREE.Mesh(createChamferedBoxGeo(4.2, 4.2, 0.12, 0.25, 0.02, 'z'), mats.copperHeatSpreader);
    epad.position.z = 0.44;
    epad.userData.noEdges = true;

    // 4 surrounding bootstrap 0201 capacitors & feedback divider resistors
    for (const [cx, cy] of [
      [-4.25, -2.0],
      [-4.25, 2.0],
      [4.25, -2.0],
      [4.25, 2.0],
    ]) {
      const bs = buildSmdPassive(1.05, 0.54, 0.36, mats.smdCeramic, mats.silverElectrode, 'z');
      bs.rotation.y = Math.PI;
      bs.position.set(cx, cy, 0.14);
      g.add(bs);
    }
    g.add(pmic, epad);

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
      const ix = 4.5 + i * 3.85;
      const ind = buildShieldedInductor(
        3.25,
        0.92,
        mats.ferriteInductor,
        mats.silverElectrode,
        mats.silverElectrode,
        'z'
      );
      ind.rotation.y = Math.PI;
      ind.position.set(ix, -1.6, -0.86);

      // Visible internal flat-wire copper coil edge peeking cleanly inside side chamfer slot
      const coilHint = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.36, 0.14), mats.copperCoil);
      coilHint.position.set(ix, -1.6, -1.34);
      coilHint.userData.noEdges = true;

      // Twin solder-fillet landing pads beneath each power inductor
      for (const sx of [-1.45, 1.45]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.68, 2.5, 0.08), mats.goldPlating);
        pad.position.set(ix + sx, -1.6, -0.44);
        pad.userData.noEdges = true;
        g.add(pad);
      }
      g.add(ind, coilHint);
    }

    // Local 2-oz copper buck power-distribution bus bar linking the 3 inductors
    const pwrBus = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.55, 0.08), mats.copperHeatSpreader);
    pwrBus.position.set(8.35, -3.55, -0.48);
    pwrBus.userData.noEdges = true;
    g.add(pwrBus);

    // 10 realistic 0201 ceramic decoupling MLCC capacitors with wrapped Ni-Sn end-caps & solder pads!
    const mlccPadGeo = new THREE.BoxGeometry(1.42, 0.78, 0.06);
    for (let i = 0; i < 10; i++) {
      const mx = -12.6 + i * 1.95;
      const mlcc = buildSmdPassive(1.18, 0.66, 0.54, mats.smdCeramic, mats.silverElectrode, 'z');
      mlcc.position.set(mx, 1.25, 0.72);
      const pad = new THREE.Mesh(mlccPadGeo, mats.goldPlating);
      pad.position.set(mx, 1.25, 0.45);
      pad.userData.noEdges = true;
      g.add(mlcc, pad);
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
    // 2 authentic molded yellow tantalum PLP hold-up capacitors with anode polarity bar, J-leads & solder pads!
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

      // Twin gold PCB solder-fillet pads + anode (+) copper charge rail
      for (const sx of [-3.35, 3.35]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.85, 0.10), mats.goldPlating);
        pad.position.set(sx, cy, 0.48);
        pad.userData.noEdges = true;
        g.add(pad);
      }
      g.add(tant);
    }
    // Charge-limiting current-sense shunt resistor & twin parallel copper tie rails bridging both PLP caps
    const shunt = buildSmdPassive(2.1, 0.95, 0.46, mats.matteBlackAnodized, mats.silverElectrode, 'z');
    shunt.rotation.y = Math.PI;
    shunt.position.set(0, 0, 0.18);
    const busPos = new THREE.Mesh(new THREE.BoxGeometry(0.42, 5.8, 0.08), mats.copperHeatSpreader);
    busPos.position.set(-3.35, 0, 0.50);
    busPos.userData.noEdges = true;
    const busGnd = new THREE.Mesh(new THREE.BoxGeometry(0.42, 5.8, 0.08), mats.copperCoil);
    busGnd.position.set(3.35, 0, 0.50);
    busGnd.userData.noEdges = true;
    g.add(shunt, busPos, busGnd);

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
    const traceGeo = new THREE.BoxGeometry(0.32, 4.8, 0.08);
    const viaGeo = hiResCyl(0.22, 0.22, 0.45, 10).rotateX(Math.PI / 2);

    for (let i = 0; i < 4; i++) {
      const cx = -4.5 + i * 3.0;
      const cap = buildSmdPassive(2.45, 1.38, 0.58, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.rotation.z = Math.PI / 2;
      cap.position.x = cx;

      // Precision 85-ohm differential gold-over-copper microstrip entering & exiting each AC cap
      const trace = new THREE.Mesh(traceGeo, i % 2 === 0 ? mats.goldPlating : mats.copperCoil);
      trace.position.set(cx, 0, -0.26);
      trace.userData.noEdges = true;

      // Twin SMT teardrop solder-fillet pads
      for (const py of [-1.2, 1.2]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.72, 0.09), mats.solderBallSilver);
        pad.position.set(cx, py, -0.24);
        pad.userData.noEdges = true;
        g.add(pad);
      }
      g.add(cap, trace);
    }

    // 5 flanking GND return stitching vias separating differential pairs cleanly
    for (let v = 0; v < 5; v++) {
      const vx = -6.0 + v * 3.0;
      for (const vy of [-2.0, 2.0]) {
        const via = new THREE.Mesh(viaGeo, mats.goldPlating);
        via.position.set(vx, vy, -0.22);
        via.userData.noEdges = true;
        g.add(via);
      }
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
    const laneGeo = new THREE.BoxGeometry(0.24, 3.6, 0.08);
    const viaGeo = hiResCyl(0.22, 0.22, 0.36, 10).rotateX(Math.PI / 2);

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

      // Authentic zero-stub straight flow-through PCIe differential rails + center low-inductance GND shunt bar!
      for (let p = -2; p <= 2; p++) {
        const lane = new THREE.Mesh(laneGeo, p === 0 ? mats.copperHeatSpreader : mats.goldPlating);
        lane.position.set(sx + p * 0.96, 0, 0.32);
        lane.userData.noEdges = true;
        g.add(lane);
      }
      for (const vy of [-1.55, 1.55]) {
        const gVia = new THREE.Mesh(viaGeo, mats.goldPlating);
        gVia.position.set(sx, vy, 0.26);
        gVia.userData.noEdges = true;
        g.add(gVia);
      }
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
    // Ceramic base + chamfered gold-seam-welded 2520 crystal oscillator lid + 4 castellated gold pads!
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

    // 4 castellated corner solder fillets on the 2520 quartz package
    const castGeo = new THREE.BoxGeometry(0.72, 0.56, 0.32);
    for (const [cx, cy] of [
      [-4.1, -1.25],
      [-0.7, -1.25],
      [-4.1, 1.25],
      [-0.7, 1.25],
    ]) {
      const cPad = new THREE.Mesh(castGeo, mats.solderBallSilver);
      cPad.position.set(cx, cy, -0.18);
      cPad.userData.noEdges = true;
      g.add(cPad);
    }

    // Twin 0201 NP0/C0G load capacitors (C_L1, C_L2) flanking the quartz crystal
    for (const ly of [-2.15, 2.15]) {
      const loadCap = buildSmdPassive(1.12, 0.58, 0.38, mats.smdCeramic, mats.silverElectrode, 'z');
      loadCap.position.set(-2.4, ly, -0.12);
      g.add(loadCap);
    }

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

    // Matched gold clock-pair traces linking XTAL output to HCSL buffer input
    for (const ty of [-0.45, 0.45]) {
      const clkLink = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.18, 0.08), mats.goldPlating);
      clkLink.position.set(0.05, ty, -0.26);
      clkLink.userData.noEdges = true;
      g.add(clkLink);
    }
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

    // 8 gold PCB landing pads beneath gull-wing leads + decoupling cap & WP#/HOLD# pull-up resistor!
    const padGeo = new THREE.BoxGeometry(0.58, 0.95, 0.08);
    for (let i = 0; i < 4; i++) {
      const px = -2.08 + i * 1.38;
      for (const py of [-2.85, 2.85]) {
        const pad = new THREE.Mesh(padGeo, mats.goldPlating);
        pad.position.set(px, py, 0.40);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }
    const decCap = buildSmdPassive(1.18, 0.62, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
    decCap.rotation.y = Math.PI;
    decCap.position.set(3.85, -1.1, 0.16);
    const wpRes = buildSmdPassive(1.12, 0.56, 0.38, mats.matteBlackAnodized, mats.silverElectrode, 'z');
    wpRes.rotation.y = Math.PI;
    wpRes.position.set(3.85, 1.1, 0.16);
    g.add(norIc, decCap, wpRes);

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
      createChamferedBoxGeo(4.65, 4.65, 0.16, 0.3, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    sensePad.position.z = -0.32;
    sensePad.userData.noEdges = true;

    // 4 thermal-coupling copper micro-vias + Kelvin 2-wire differential remote-diode sense traces!
    const viaGeo = hiResCyl(0.24, 0.24, 0.32, 10).rotateX(Math.PI / 2);
    for (const [vx, vy] of [
      [-1.55, -1.55],
      [1.55, -1.55],
      [-1.55, 1.55],
      [1.55, 1.55],
    ]) {
      const via = new THREE.Mesh(viaGeo, mats.goldPlating);
      via.position.set(vx, vy, -0.28);
      via.userData.noEdges = true;
      g.add(via);
    }
    for (const ky of [-0.45, 0.45]) {
      const kTrace = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 0.08), mats.goldPlating);
      kTrace.position.set(-3.3, ky, -0.28);
      kTrace.userData.noEdges = true;
      g.add(kTrace);
    }
    const i2cPull = buildSmdPassive(1.05, 0.54, 0.36, mats.matteBlackAnodized, mats.silverElectrode, 'z');
    i2cPull.position.set(3.2, 0, -0.14);
    g.add(sensorIc, sensePad, i2cPull);

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

    // Stamped embossed thermal contact pedestals pressing directly onto Controller SoC, Primary NAND & LPDDR4 DRAM!
    const bossSoc = new THREE.Mesh(
      createChamferedBoxGeo(13.6, 13.6, 0.44, 0.6, 0.08, 'z'),
      mats.copperHeatSpreader
    );
    bossSoc.position.set(-6.2, -9.0, -0.22);

    const bossDram = new THREE.Mesh(
      createChamferedBoxGeo(9.4, 11.2, 0.34, 0.5, 0.06, 'z'),
      mats.copperHeatSpreader
    );
    bossDram.position.set(9.4, -10.5, -0.18);

    const bossNand = new THREE.Mesh(
      createChamferedBoxGeo(24.0, 16.0, 0.3, 0.8, 0.06, 'z'),
      mats.copperHeatSpreader
    );
    bossNand.position.set(0, 12.6, -0.16);

    // Micro-stamped radiating heat-dispersion spreader grooves + 4 corner EMI grounding spring dimples!
    const grooveGeo = new THREE.BoxGeometry(28.0, 0.24, 0.06);
    for (let i = -4; i <= 4; i++) {
      const gr = new THREE.Mesh(grooveGeo, mats.copperCoil);
      gr.position.set(0, i * 4.2, 0.20);
      gr.userData.noEdges = true;
      g.add(gr);
    }
    const dimpleGeo = hiResCyl(0.56, 0.42, 0.14, 12).rotateX(Math.PI / 2);
    for (const [dx, dy] of [
      [-15.2, 19.8],
      [15.2, 19.8],
      [-15.2, -19.8],
      [15.2, -19.8],
    ]) {
      const dim = new THREE.Mesh(dimpleGeo, mats.goldPlating);
      dim.position.set(dx, dy, 0.17);
      dim.userData.noEdges = true;
      g.add(dim);
    }
    g.add(cuPlate, bossSoc, bossDram, bossNand);

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

    // Subtle surface compliance micro-waffle relief on pink Controller TIM pad
    const waffleGeo = new THREE.BoxGeometry(11.4, 0.18, 0.06);
    for (let i = -2; i <= 2; i++) {
      const wf = new THREE.Mesh(waffleGeo, mats.thermalPuttyPink);
      wf.position.set(-6.2, -9.0 + i * 2.1, 0.36);
      wf.userData.noEdges = true;
      g.add(wf);
    }

    const timNand = new THREE.Mesh(
      createChamferedBoxGeo(24.2, 16.4, 0.34, 0.75, 0.07, 'z'),
      mats.thermalPadBlue
    );
    timNand.position.set(0, 12.6, 0.15);

    // Secondary LPDDR4 silicone thermal pad bridge
    const timDram = new THREE.Mesh(
      createChamferedBoxGeo(9.0, 10.6, 0.34, 0.55, 0.06, 'z'),
      mats.thermalPadBlue
    );
    timDram.position.set(9.4, -8.5, 0.15);

    // High-orientation pyrolytic graphite (graphene) rear thermal sheet + PET edge insulation border
    const grapheneBack = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(33.8, 43.0, 1.6), 0.24, 0.04, 0.04, 1, 20),
      mats.pyroGraphite
    );
    grapheneBack.position.set(0, 2.2, -3.15);

    const petBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(34.2, 43.4, 1.7, 32.8, 42.0, 1.45), 0.12, 0.02, 0.02, 1, 18),
      mats.polyimideFpc
    );
    petBorder.position.set(0, 2.2, -3.15);
    petBorder.userData.noEdges = true;
    g.add(timSoc, timNand, timDram, grapheneBack, petBorder);

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

    // Perimeter solder-castellation feet anchoring the EMI fence to the PCB GND plane (-Z)
    const footGeo = new THREE.BoxGeometry(1.4, 0.38, 0.28);
    for (let i = -2; i <= 2; i++) {
      for (const sy of [-8.72, 8.72]) {
        const ft = new THREE.Mesh(footGeo, mats.solderBallSilver);
        ft.position.set(i * 2.9, sy, -0.52);
        ft.userData.noEdges = true;
        g.add(ft);
      }
      for (const sx of [-8.72, 8.72]) {
        const ft = new THREE.Mesh(footGeo, mats.solderBallSilver);
        ft.rotation.z = Math.PI / 2;
        ft.position.set(sx, i * 2.9, -0.52);
        ft.userData.noEdges = true;
        g.add(ft);
      }
    }

    // Stamped corner & mid-rail retention spring dimples + perforated top-bridge RF shield flange
    const dimpleGeo = hiResCyl(0.45, 0.45, 0.26, 12).rotateX(Math.PI / 2);
    for (const sx of [-7.9, 0, 7.9]) {
      for (const sy of [-7.9, 7.9]) {
        const dimple = new THREE.Mesh(dimpleGeo, mats.silverElectrode);
        dimple.position.set(sx, sy, 0.66);
        dimple.userData.noEdges = true;
        g.add(dimple);
      }
    }
    const bridgeRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.2, 16.2, 1.0, 12.6, 12.6, 0.7), 0.14, 0.02, 0.02, 1, 16),
      mats.lensPermalloyShield
    );
    bridgeRim.position.z = 0.62;
    bridgeRim.userData.noEdges = true;
    g.add(emiCollar, bridgeRim);

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
    // Sloped meniscus perimeter capillary underfill fillets framing Controller, Primary NAND & LPDDR4 BGAs!
    const underfillSoc = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.0, 15.0, 0.7, 13.0, 13.0, 0.4), 0.34, 0.09, 0.09, 2, 16),
      mats.makeupSealViolet
    );
    underfillSoc.position.set(-6.2, -9.0, 0);

    const underfillNand = new THREE.Mesh(
      extrudeHiRes(createFrameShape(26.4, 18.4, 0.8, 24.2, 16.2, 0.5), 0.34, 0.09, 0.09, 2, 16),
      mats.makeupSealViolet
    );
    underfillNand.position.set(0, 12.6, 0);

    const underfillDram = new THREE.Mesh(
      extrudeHiRes(createFrameShape(10.6, 12.4, 0.6, 9.0, 10.8, 0.4), 0.30, 0.08, 0.08, 2, 14),
      mats.makeupSealViolet
    );
    underfillDram.position.set(9.4, -8.5, 0);

    // Dual capillary dispense corner meniscus fillets (L-pattern jet-dispense bead trace!)
    const dispenseBeadGeo = createChamferedBoxGeo(14.8, 0.52, 0.24, 0.2, 0.05, 'z');
    const dispSoc = new THREE.Mesh(dispenseBeadGeo, mats.makeupSealViolet);
    dispSoc.position.set(-6.2, -16.55, 0.08);
    dispSoc.userData.noEdges = true;

    g.add(underfillSoc, underfillNand, underfillDram, dispSoc);

    // Smooth spherical SAC305 BGA solder-ball arrays locked inside the epoxy matrix (NAND 7×5 + Controller 5×5!)
    addInstancedBalls(g, 7, 5, 3.0, 3.0, 0, 12.6, -0.1, 0.32, mats.solderBallSilver);
    addInstancedBalls(g, 5, 5, 2.35, 2.35, -6.2, -9.0, -0.1, 0.26, mats.solderBallSilver);

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

    // 5 stepped health-telemetry gauge bars (PE-cycles / Bad-blocks / Temp / ECC-margin / Spare%)
    const barMats = [mats.cfaGreen, mats.cfaGreen, mats.vcWorkingFluidCyan, mats.goldPlating, mats.tantalumCapYellow];
    for (let i = 0; i < 5; i++) {
      const h = 1.65 + (4 - i) * 0.35;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.86, h, 0.18, 0.10, 0.03, 'z'),
        barMats[i]
      );
      bar.position.set(-2.95 + i * 1.15, -1.65 + h * 0.5, 0.34);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    // NVM circular telemetry log ring-buffer on right flank
    const ringLog = new THREE.Mesh(hiResTorus(0.85, 0.14, 8, 22), mats.goldPlating);
    ringLog.position.set(2.8, 0.15, 0.36);
    ringLog.userData.noEdges = true;
    g.add(smartBlock, ringLog);

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
    const pullBaseGeo = createChamferedBoxGeo(36.8, 3.8, 2.8, 0.75, 0.16, 'z');
    applyBoxUVs(pullBaseGeo, 12.0);
    const pullBase = new THREE.Mesh(pullBaseGeo, u.batPolycarbonateShell);
    pullBase.position.set(0, 26.35, 0);
    g.add(pullBase);

    // 5 contoured non-slip extraction ribs + micro-serrated center thumb-grip notches
    for (let i = 0; i < 5; i++) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(33.2, 0.34, 3.18, 0.14, 0.06, 'z'),
        mats.matteBlackAnodized
      );
      rib.position.set(0, 25.05 + i * 0.66, 0);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Dual internal stainless-steel structural reinforcement tie bars anchoring the pull-tab to the TOUGH frame
    const tieGeo = createChamferedBoxGeo(1.1, 2.8, 1.2, 0.16, 0.04, 'z');
    for (const tx of [-15.4, 15.4]) {
      const tie = new THREE.Mesh(tieGeo, mats.stainlessMachined);
      tie.position.set(tx, 25.2, 0);
      tie.userData.noEdges = true;
      g.add(tie);
    }

    // Internal anti-X-ray / anti-UV dual-layer metallic foil strip concealed beneath top lip (zero bleed on C01!)
    const xrayInlay = new THREE.Mesh(
      createChamferedBoxGeo(32.0, 1.4, 0.14, 0.2, 0.02, 'z'),
      mats.silverElectrode
    );
    xrayInlay.position.set(0, 25.2, 1.72);
    xrayInlay.userData.noEdges = true;
    const uvSubStrip = new THREE.Mesh(
      createChamferedBoxGeo(30.8, 0.85, 0.1, 0.14, 0.02, 'z'),
      mats.lensPermalloyShield
    );
    uvSubStrip.position.set(0, 25.2, -1.72);
    uvSubStrip.userData.noEdges = true;
    g.add(xrayInlay, uvSubStrip);

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
  parts.push(...buildCfexpressUltra29Parts(mats));
  return parts;
}
