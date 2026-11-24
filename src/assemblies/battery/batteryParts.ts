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
import { BATTERY_EXPLANATIONS } from './batteryExplanations';
import { buildBatteryUltra27Parts } from './batteryUltra27Parts';

function finalizeBatteryPart(
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
    subsystem: 'battery',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: BATTERY_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Phase 26A — Standalone Flagship Camera Battery Pack Ultra-Dissection (Sony NP-FZ100 & Next-Gen: 30 Parts P01–P30).
 * True 1:1 mm NP-FZ100 architectural proportions (38.7 × 51.7 × 22.7 mm), centered at (0, 0, 0).
 * Left 18500 cell (x = -9.5) shows sealed exterior; right 18500 cell (x = +9.5) reveals real concentric jelly-roll cutaway!
 */
export function buildBatteryParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // P01. Flame-Retardant UL94 V-0 Polycarbonate Front Shell & Ultrasonic Rib
  // =========================================================================
  {
    const g = new THREE.Group();
    const frontWall = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(38.7, 51.7, 4.2), 1.5, 0.25, 0.25, 16),
      mats.bodyBatteryShell
    );
    frontWall.position.z = 5.2;
    const perimeterWall = new THREE.Mesh(
      extrudeCentered(createFrameShape(38.7, 51.7, 4.2, 36.1, 49.1, 3.2), 11.0, 0.12, 0.12, 16),
      mats.bodyBatteryShell
    );
    perimeterWall.position.z = 0.0;
    // Ultrasonic weld energy-director ridge along mating edge
    const weldRib = new THREE.Mesh(
      extrudeCentered(createFrameShape(37.6, 50.6, 3.6, 36.8, 49.8, 3.3), 0.65, 0.04, 0.04, 14),
      mats.matteBlackAnodized
    );
    weldRib.position.z = -5.4;
    g.add(frontWall, perimeterWall, weldRib);

    parts.push(
      finalizeBatteryPart(
        'bat-outer-shell-front',
        1,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 5.4),
        new THREE.Vector3(0, 0, 58),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // P02. Rear Shell & Poka-Yoke Asymmetric Keying Guide Grooves
  // =========================================================================
  {
    const g = new THREE.Group();
    const rearWall = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(38.7, 51.7, 4.2), 1.5, 0.25, 0.25, 16),
      mats.bodyBatteryShell
    );
    rearWall.position.z = -5.2;
    const rearRim = new THREE.Mesh(
      extrudeCentered(createFrameShape(38.7, 51.7, 4.2, 36.1, 49.1, 3.2), 11.0, 0.12, 0.12, 16),
      mats.bodyBatteryShell
    );
    rearRim.position.z = 0.0;
    // Poka-yoke asymmetric anti-reverse keying rail & blue-latch notch
    const keyRail = new THREE.Mesh(new THREE.BoxGeometry(2.2, 44.0, 1.4), mats.matteBlackAnodized);
    keyRail.position.set(-18.2, 1.0, -5.8);
    const latchNotch = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.4, 1.2), mats.mountShimBlue);
    latchNotch.position.set(11.5, -21.5, -5.9);
    g.add(rearWall, rearRim, keyRail, latchNotch);

    parts.push(
      finalizeBatteryPart(
        'bat-outer-shell-rear',
        2,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, -5.4),
        new THREE.Vector3(0, 0, -58),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // P03. Anti-Counterfeit 3D Hologram Seal & PSE / UN38.3 Spec Nameplate
  // =========================================================================
  {
    const g = new THREE.Group();
    const specPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(31.5, 34.0, 2.2), 0.24, 0.02, 0.02, 12),
      mats.matteBlackAnodized
    );
    const holoBadge = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(9.5, 9.5, 1.2), 0.3, 0.02, 0.02, 10),
      mats.lcdDbefIridescent
    );
    holoBadge.position.set(9.2, 10.2, 0.08);
    const accentStripe = new THREE.Mesh(new THREE.BoxGeometry(28.0, 2.2, 0.28), mats.cinnabarAnodized);
    accentStripe.position.set(0, -12.5, 0.06);
    g.add(specPlate, holoBadge, accentStripe);

    parts.push(
      finalizeBatteryPart(
        'bat-hologram-label',
        3,
        '#a855f7',
        g,
        new THREE.Vector3(0, -2.0, 11.45),
        new THREE.Vector3(-42, 14, 78),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // P04. 4-Pin Recessed Gold-Plated Terminal Block (+ / T / S / -)
  // =========================================================================
  {
    const g = new THREE.Group();
    const blockBody = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(22.0, 5.2, 0.8), 6.2, 0.06, 0.06, 10),
      mats.mountPpsInsulator
    );
    g.add(blockBody);
    // 4 recessed bifurcated gold-plated spring forks (+, T, S, -)
    const pinX = [-7.5, -2.5, 2.5, 7.5];
    for (const px of pinX) {
      const forkL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 4.2, 3.8), mats.goldPlating);
      forkL.position.set(px - 0.55, 0.6, 0);
      const forkR = new THREE.Mesh(new THREE.BoxGeometry(0.45, 4.2, 3.8), mats.goldPlating);
      forkR.position.set(px + 0.55, 0.6, 0);
      const pinTail = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.2, 0.6), mats.goldPlating);
      pinTail.position.set(px, -2.4, 0);
      g.add(forkL, forkR, pinTail);
    }

    parts.push(
      finalizeBatteryPart(
        'bat-terminal-block-4pin',
        4,
        '#eab308',
        g,
        new THREE.Vector3(0, 23.6, 0),
        new THREE.Vector3(0, 52, 18),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // P05. Inter-Terminal Anti-Short Insulating Barrier Fins
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseBridge = new THREE.Mesh(new THREE.BoxGeometry(24.0, 1.2, 7.0), mats.bodyBatteryShell);
    baseBridge.position.y = -2.2;
    g.add(baseBridge);
    // 5 tall dielectric barrier fins isolating each of the 4 terminals from keys/coins
    for (const fx of [-10.0, -5.0, 0.0, 5.0, 10.0]) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(1.15, 5.4, 7.2), mats.bodyBatteryShell);
      fin.position.set(fx, 0.5, 0);
      g.add(fin);
    }

    parts.push(
      finalizeBatteryPart(
        'bat-terminal-guide-ribs',
        5,
        '#475569',
        g,
        new THREE.Vector3(0, 24.4, 0),
        new THREE.Vector3(0, 62, -16),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // P06. Multi-Layer BMS (Battery Management System) Protection & Control PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(33.6, 13.5, 1.2), 1.0, 0.04, 0.04, 10).rotateX(Math.PI / 2),
      mats.hdiMainboardPcb
    );
    const traceRail = new THREE.Mesh(new THREE.BoxGeometry(30.0, 0.16, 2.2), mats.copperHeatSpreader);
    traceRail.position.set(0, 0.56, 3.8);
    const weldPadL = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.2, 4.2), mats.goldPlating);
    weldPadL.position.set(-13.8, 0.56, 0);
    const weldPadR = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.2, 4.2), mats.goldPlating);
    weldPadR.position.set(13.8, 0.56, 0);
    g.add(pcb, traceRail, weldPadL, weldPadR);

    parts.push(
      finalizeBatteryPart(
        'bat-bms-pcb',
        6,
        '#15803d',
        g,
        new THREE.Vector3(0, 20.6, 0),
        new THREE.Vector3(0, 44, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // P07. InfoLITHIUM Precision Fuel-Gauge & Coulomb-Counter IC
  // =========================================================================
  {
    const g = new THREE.Group();
    const qfnBody = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.05, 5.2), mats.icEpoxy);
    const dieMark = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.18, 3.4), mats.siliconLogicLayer);
    dieMark.position.y = 0.58;
    const pinRing = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.35, 5.8), mats.silverElectrode);
    pinRing.position.y = -0.35;
    g.add(qfnBody, dieMark, pinRing);

    parts.push(
      finalizeBatteryPart(
        'bat-infolithium-fuelgauge',
        7,
        '#0ea5e9',
        g,
        new THREE.Vector3(-4.5, 21.6, 2.0),
        new THREE.Vector3(-34, 62, 34),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P08. Genuine Authentication Cryptographic MCU (Challenge-Response IC)
  // =========================================================================
  {
    const g = new THREE.Group();
    const mcu = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.0, 4.4), mats.icEpoxy);
    const cryptoShield = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.22, 3.2), mats.goldPlating);
    cryptoShield.position.y = 0.55;
    g.add(mcu, cryptoShield);

    parts.push(
      finalizeBatteryPart(
        'bat-auth-crypto-ic',
        8,
        '#8b5cf6',
        g,
        new THREE.Vector3(4.5, 21.6, 2.0),
        new THREE.Vector3(34, 62, 34),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P09. Back-to-Back Dual N-Channel Protection MOSFET Switch
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sx of [-2.4, 2.4]) {
      const fet = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.05, 4.6), mats.icEpoxy);
      fet.position.x = sx;
      const drainTab = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.3, 1.2), mats.copperHeatSpreader);
      drainTab.position.set(sx, -0.35, 2.2);
      const srcLeads = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.3, 1.0), mats.silverElectrode);
      srcLeads.position.set(sx, -0.35, -2.2);
      g.add(fet, drainTab, srcLeads);
    }

    parts.push(
      finalizeBatteryPart(
        'bat-protection-mosfet',
        9,
        '#ef4444',
        g,
        new THREE.Vector3(-9.2, 21.6, -2.6),
        new THREE.Vector3(-54, 54, -26),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P10. Ultra-Low-Resistance Precision Current-Sense Shunt Resistor (5 mΩ)
  // =========================================================================
  {
    const g = new THREE.Group();
    const alloyPlate = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.72, 2.8), mats.invarScaleBar);
    const termL = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.85, 3.0), mats.copperHeatSpreader);
    termL.position.x = -2.4;
    const termR = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.85, 3.0), mats.copperHeatSpreader);
    termR.position.x = 2.4;
    g.add(alloyPlate, termL, termR);

    parts.push(
      finalizeBatteryPart(
        'bat-shunt-resistor',
        10,
        '#f59e0b',
        g,
        new THREE.Vector3(0.0, 21.5, -3.4),
        new THREE.Vector3(0, 54, -42),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P11. 2-Series (2S) Cell Voltage Monitor & Balancing Circuit IC
  // =========================================================================
  {
    const g = new THREE.Group();
    const balIc = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.95, 3.6), mats.icEpoxy);
    const bleedR1 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.65, 1.3), mats.smdCeramic);
    bleedR1.position.set(-2.2, -0.1, 2.6);
    const bleedR2 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.65, 1.3), mats.smdCeramic);
    bleedR2.position.set(2.2, -0.1, 2.6);
    g.add(balIc, bleedR1, bleedR2);

    parts.push(
      finalizeBatteryPart(
        'bat-cell-balancer-ic',
        11,
        '#14b8a6',
        g,
        new THREE.Vector3(9.4, 21.6, -2.4),
        new THREE.Vector3(54, 54, -26),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P12. Cell-Contact NTC Thermistor Temperature Sensor
  // =========================================================================
  {
    const g = new THREE.Group();
    const bead = new THREE.Mesh(new THREE.SphereGeometry(1.45, 14, 12), mats.cinnabarAnodized);
    bead.position.y = -11.0;
    const wire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 22.0, 8), mats.copperCoil);
    wire1.position.set(-0.55, 0, 0);
    const wire2 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 22.0, 8), mats.copperCoil);
    wire2.position.set(0.55, 0, 0);
    const kaptonPatch = new THREE.Mesh(new THREE.BoxGeometry(5.0, 6.2, 0.3), mats.polyimideFpc);
    kaptonPatch.position.set(0, -11.0, 0.8);
    g.add(bead, wire1, wire2, kaptonPatch);

    parts.push(
      finalizeBatteryPart(
        'bat-ntc-thermistor',
        12,
        '#f97316',
        g,
        new THREE.Vector3(0.0, 8.5, 4.2),
        new THREE.Vector3(0, 26, 44),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P13. Pack-Level Resettable PTC & Permanent Thermal Cutoff Fuse (SCP)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ptcBody = new THREE.Mesh(new THREE.BoxGeometry(5.4, 1.35, 3.6), mats.tantalumCapYellow);
    ptcBody.position.x = -3.2;
    const scpFuse = new THREE.Mesh(new THREE.BoxGeometry(5.0, 1.35, 3.6), mats.ceramicAlumina);
    scpFuse.position.x = 3.2;
    const fuseStripe = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.25, 1.2), mats.bodyRecRed);
    fuseStripe.position.set(3.2, 0.72, 0);
    g.add(ptcBody, scpFuse, fuseStripe);

    parts.push(
      finalizeBatteryPart(
        'bat-thermal-fuse-ptc',
        13,
        '#dc2626',
        g,
        new THREE.Vector3(0, 19.3, -2.2),
        new THREE.Vector3(-44, 34, -48),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P14. Spot-Welded Pure Nickel (Ni-200) Busbars & 2S Series Interconnects
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bottom 2S series bridge linking Left Cell (-) to Right Cell (+)
    const bottomBridge = new THREE.Mesh(new THREE.BoxGeometry(24.5, 0.45, 5.2), mats.stainlessMachined);
    bottomBridge.position.set(0, -23.6, 0);
    // Side vertical BM center-tap busbar rising to BMS
    const centerTap = new THREE.Mesh(new THREE.BoxGeometry(0.42, 44.2, 4.0), mats.stainlessMachined);
    centerTap.position.set(0, -1.6, -6.4);
    // Left & right top collector tabs reaching BMS pads
    const topTabL = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.45, 4.8), mats.stainlessMachined);
    topTabL.position.set(-9.5, 18.8, 0);
    const topTabR = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.45, 4.8), mats.stainlessMachined);
    topTabR.position.set(9.5, 18.8, 0);
    g.add(bottomBridge, centerTap, topTabL, topTabR);

    parts.push(
      finalizeBatteryPart(
        'bat-nickel-busbar-weld',
        14,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -48, -28),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // P15. Shock-Absorbing Dual-Cell Inner Holder Frame & Silicone Potting
  // =========================================================================
  {
    const g = new THREE.Group();
    // Central insulating partition rib between the two 18500 cells
    const midDivider = new THREE.Mesh(new THREE.BoxGeometry(1.2, 43.0, 16.0), mats.mountPpsInsulator);
    // Upper & lower cradle collars embracing both cells
    const topCradle = new THREE.Mesh(new THREE.BoxGeometry(36.2, 2.4, 17.5), mats.mountPpsInsulator);
    topCradle.position.y = 17.5;
    const botCradle = new THREE.Mesh(new THREE.BoxGeometry(36.2, 2.4, 17.5), mats.mountPpsInsulator);
    botCradle.position.y = -22.2;
    const siliconeBlock = new THREE.Mesh(new THREE.BoxGeometry(33.0, 2.2, 12.0), mats.thermalPadBlue);
    siliconeBlock.position.y = 18.8;
    g.add(midDivider, topCradle, botCradle, siliconeBlock);

    parts.push(
      finalizeBatteryPart(
        'bat-cell-holder-frame',
        15,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -34, 34),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // P16. Blue Fish-Paper Insulator Rings & High-Temp Kapton Tape
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const cx of [-9.5, 9.5]) {
      const barleyRing = new THREE.Mesh(
        extrudeCentered(createFrameShape(17.4, 17.4, 8.7, 9.4, 9.4, 4.7), 0.36, 0.02, 0.02, 20).rotateX(Math.PI / 2),
        mats.mountShimBlue
      );
      barleyRing.position.set(cx, 18.2, 0);
      g.add(barleyRing);
    }
    const kaptonStrip = new THREE.Mesh(new THREE.BoxGeometry(34.0, 0.22, 14.5), mats.polyimideFpc);
    kaptonStrip.position.set(0, 19.6, 0);
    g.add(kaptonStrip);

    parts.push(
      finalizeBatteryPart(
        'bat-kapton-barley-paper',
        16,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-48, 36, 20),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // P17. 18500 Cylindrical Nickel-Plated Steel Can (Left Full + Right Cutaway!)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left cell: full sealed cylindrical steel pressure can (Ø17.8 x 40.2 mm inner core)
    const leftCan = new THREE.Mesh(
      new THREE.CylinderGeometry(8.85, 8.85, 40.0, 28),
      mats.stainlessMachined
    );
    leftCan.position.set(-9.5, -2.4, 0);
    // Right cell: 220° cutaway steel can so concentric internal jelly-roll shines!
    const rightCanCut = new THREE.Mesh(
      new THREE.CylinderGeometry(8.85, 8.85, 40.0, 24, 1, true, Math.PI * 0.42, Math.PI * 1.18),
      mats.stainlessMachined
    );
    rightCanCut.position.set(9.5, -2.4, 0);
    const rightCanBase = new THREE.Mesh(
      new THREE.CylinderGeometry(8.85, 8.85, 0.7, 24),
      mats.stainlessMachined
    );
    rightCanBase.position.set(9.5, -22.2, 0);
    g.add(leftCan, rightCanCut, rightCanBase);

    parts.push(
      finalizeBatteryPart(
        'bat-18500-steel-can',
        17,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-44, -6, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P18. Heat-Shrink PET/PVC Cell Insulation Sleeve & Laser Lot Code
  // =========================================================================
  {
    const g = new THREE.Group();
    const leftSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(9.05, 9.05, 39.2, 28, 1, true),
      mats.bodyBatteryCell
    );
    leftSleeve.position.set(-9.5, -2.4, 0);
    const rightSleeveCut = new THREE.Mesh(
      new THREE.CylinderGeometry(9.05, 9.05, 39.2, 24, 1, true, Math.PI * 0.45, Math.PI * 1.12),
      mats.bodyBatteryCell
    );
    rightSleeveCut.position.set(9.5, -2.4, 0);
    g.add(leftSleeve, rightSleeveCut);

    parts.push(
      finalizeBatteryPart(
        'bat-cell-pvc-sleeve',
        18,
        '#16a34a',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-68, -6, 20),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P19. Cell Internal CID (Current Interrupt Device — Pressure Disc)
  // =========================================================================
  {
    const g = new THREE.Group();
    const lowerDisc = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 6.2, 0.45, 22), mats.silverElectrode);
    lowerDisc.position.y = -0.55;
    const upperSnapDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(5.2, 6.4, 0.65, 22),
      mats.mountStainlessFlange
    );
    upperSnapDisc.position.y = 0.25;
    const weldNib = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.7, 14), mats.goldPlating);
    g.add(lowerDisc, upperSnapDisc, weldNib);

    parts.push(
      finalizeBatteryPart(
        'bat-cid-pressure-disc',
        19,
        '#e11d48',
        g,
        new THREE.Vector3(9.5, 16.4, 0),
        new THREE.Vector3(46, 36, 24),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P20. Cell-Cap Internal Donut PTC Thermistor Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const ptcDonut = new THREE.Mesh(
      extrudeCentered(createFrameShape(13.2, 13.2, 6.6, 7.0, 7.0, 3.5), 0.75, 0.04, 0.04, 20).rotateX(Math.PI / 2),
      mats.cinnabarAnodized
    );
    const cladTop = new THREE.Mesh(
      extrudeCentered(createFrameShape(13.0, 13.0, 6.5, 7.2, 7.2, 3.6), 0.16, 0.02, 0.02, 18).rotateX(Math.PI / 2),
      mats.silverElectrode
    );
    cladTop.position.y = 0.42;
    g.add(ptcDonut, cladTop);

    parts.push(
      finalizeBatteryPart(
        'bat-cell-ptc-ring',
        20,
        '#ea580c',
        g,
        new THREE.Vector3(9.5, 17.3, 0),
        new THREE.Vector3(62, 46, 8),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P21. Explosion-Proof Safety Vent Cap & Polypropylene Hermetic Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    const posCap = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 6.6, 1.8, 22), mats.stainlessMachined);
    posCap.position.y = 0.6;
    // Polypropylene hermetic crimp gasket ring
    const ppGasket = new THREE.Mesh(
      new THREE.TorusGeometry(7.6, 0.92, 10, 24).rotateX(Math.PI / 2),
      mats.lcdDiffuserMatte
    );
    ppGasket.userData.noEdges = true;
    // Vent exhaust ports around cap shoulder
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const ventHole = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 1.2), mats.icEpoxy);
      ventHole.position.set(Math.cos(a) * 5.2, 0.5, Math.sin(a) * 5.2);
      ventHole.rotation.y = -a;
      g.add(ventHole);
    }
    g.add(posCap, ppGasket);

    parts.push(
      finalizeBatteryPart(
        'bat-safety-vent-gasket',
        21,
        '#f8fafc',
        g,
        new THREE.Vector3(9.5, 18.0, 0),
        new THREE.Vector3(76, 56, -12),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // P22. Cathode Sheet: High-Nickel NMC/NCA Active Material on Aluminum Foil
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stepped concentric cutaway cylinder representing wound NMC Cathode + Al Foil
    const nmcLayer = new THREE.Mesh(
      new THREE.CylinderGeometry(7.8, 7.8, 35.4, 24, 1, false, Math.PI * 0.25, Math.PI * 1.5),
      mats.carbonFiberBlade
    );
    const alFoilEdge = new THREE.Mesh(
      new THREE.CylinderGeometry(7.95, 7.95, 36.2, 24, 1, true, Math.PI * 0.25, Math.PI * 1.5),
      mats.silverElectrode
    );
    g.add(nmcLayer, alFoilEdge);

    parts.push(
      finalizeBatteryPart(
        'bat-cathode-nmc-al',
        22,
        '#0284c7',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(46, 12, 16),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // P23. Anode Sheet: Next-Gen Silicon-Carbon Composite (Si-C) on Copper Foil
  // =========================================================================
  {
    const g = new THREE.Group();
    const cuFoil = new THREE.Mesh(
      new THREE.CylinderGeometry(6.3, 6.3, 35.8, 24, 1, true, Math.PI * 0.15, Math.PI * 1.65),
      mats.copperHeatSpreader
    );
    const siAnodeCoat = new THREE.Mesh(
      new THREE.CylinderGeometry(6.15, 6.15, 34.8, 24, 1, false, Math.PI * 0.15, Math.PI * 1.65),
      mats.pyroGraphite
    );
    g.add(cuFoil, siAnodeCoat);

    parts.push(
      finalizeBatteryPart(
        'bat-anode-siox-cu',
        23,
        '#d97706',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(68, 4, 26),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // P24. Ceramic (Alumina) Heat-Resistant Coated Microporous Separator Film
  // =========================================================================
  {
    const g = new THREE.Group();
    const sepMembrane = new THREE.Mesh(
      new THREE.CylinderGeometry(7.05, 7.05, 36.8, 24, 1, true, Math.PI * 0.2, Math.PI * 1.58),
      mats.ceramicAlumina
    );
    g.add(sepMembrane);

    parts.push(
      finalizeBatteryPart(
        'bat-ceramic-separator',
        24,
        '#e2e8f0',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(88, -4, 14),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // P25. Organic Carbonate Electrolyte & Nano SEI Passivation Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    const electrolyteHalo = new THREE.Mesh(
      new THREE.CylinderGeometry(4.9, 4.9, 34.2, 22, 1, true, Math.PI * 0.1, Math.PI * 1.7),
      mats.vcWorkingFluidCyan
    );
    const seiFilm = new THREE.Mesh(
      new THREE.CylinderGeometry(4.45, 4.45, 33.4, 22, 1, true, Math.PI * 0.1, Math.PI * 1.7),
      mats.nanoArIridescent
    );
    g.add(electrolyteHalo, seiFilm);

    parts.push(
      finalizeBatteryPart(
        'bat-electrolyte-sei',
        25,
        '#22d3ee',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(106, -12, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P26. Jelly-Roll Hollow Stainless Center Mandrel Pin (Gas-Vent Tunnel)
  // =========================================================================
  {
    const g = new THREE.Group();
    const outerTube = new THREE.Mesh(
      new THREE.CylinderGeometry(1.75, 1.75, 36.6, 18, 1, true),
      mats.mountStainlessFlange
    );
    const innerBore = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.15, 36.8, 14),
      mats.icEpoxy
    );
    g.add(outerTube, innerBore);

    parts.push(
      finalizeBatteryPart(
        'bat-center-mandrel-pin',
        26,
        '#64748b',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(86, -24, -22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // P27. Internal Ultrasonic-Welded Aluminum Cathode & Nickel Anode Tabs
  // =========================================================================
  {
    const g = new THREE.Group();
    const alCathodeTab = new THREE.Mesh(new THREE.BoxGeometry(3.2, 8.6, 0.32), mats.silverElectrode);
    alCathodeTab.position.set(0, 14.5, 2.2);
    const tabProtectTape = new THREE.Mesh(new THREE.BoxGeometry(4.2, 5.0, 0.45), mats.polyimideFpc);
    tabProtectTape.position.set(0, 12.2, 2.2);
    const niAnodeTab = new THREE.Mesh(new THREE.BoxGeometry(3.2, 7.4, 0.32), mats.copperHeatSpreader);
    niAnodeTab.position.set(0, -19.2, -2.2);
    g.add(alCathodeTab, tabProtectTape, niAnodeTab);

    parts.push(
      finalizeBatteryPart(
        'bat-electrode-tabs-weld',
        27,
        '#fbbf24',
        g,
        new THREE.Vector3(9.5, -1.5, 0),
        new THREE.Vector3(64, -34, -32),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // P28. Next-Gen Integrated USB-C Direct Charging Port & Boost-Charge IC
  // =========================================================================
  {
    const g = new THREE.Group();
    const usbcShell = new THREE.Mesh(
      extrudeCentered(createFrameShape(8.9, 3.2, 1.4, 7.6, 1.9, 0.8), 6.2, 0.06, 0.06, 12).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    const tongue = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.6, 6.2), mats.icEpoxy);
    const chargePcb = new THREE.Mesh(new THREE.BoxGeometry(2.0, 11.0, 9.6), mats.hdiMainboardPcb);
    chargePcb.position.set(-4.0, 0, 0);
    const boostInductor = new THREE.Mesh(new THREE.BoxGeometry(1.8, 3.6, 3.6), mats.ferriteInductor);
    boostInductor.position.set(-5.6, 2.2, 0);
    const boostIc = new THREE.Mesh(new THREE.BoxGeometry(1.0, 3.0, 3.0), mats.icEpoxy);
    boostIc.position.set(-5.4, -2.4, 0);
    g.add(usbcShell, tongue, chargePcb, boostInductor, boostIc);

    parts.push(
      finalizeBatteryPart(
        'bat-usbc-pd-charger-ic',
        28,
        '#3b82f6',
        g,
        new THREE.Vector3(16.2, 12.0, 0),
        new THREE.Vector3(78, 28, 38),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // P29. Capacitive Touch 4-Level LED Battery Gauge & Light-Guide Window
  // =========================================================================
  {
    const g = new THREE.Group();
    const touchPad = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 6.4, 1.6), 0.75, 0.04, 0.04, 10),
      mats.matteBlackAnodized
    );
    const touchCoin = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 1.8, 0.9, 16).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    touchCoin.position.set(-5.2, 0, 0.1);
    g.add(touchPad, touchCoin);
    // 4 illuminated LED light-guide dots (25% / 50% / 75% / 100%)
    for (let i = 0; i < 4; i++) {
      const led = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.75, 1.0, 12).rotateX(Math.PI / 2),
        mats.fluorineCoatCyan
      );
      led.position.set(-0.6 + i * 2.4, 0, 0.15);
      g.add(led);
    }

    parts.push(
      finalizeBatteryPart(
        'bat-touch-4led-gauge',
        29,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 15.2, 11.4),
        new THREE.Vector3(44, 28, 72),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // P30. High-Conductivity Thermal Graphite Wrap & Cold-Weather Buffer
  // =========================================================================
  {
    const g = new THREE.Group();
    const graphiteBack = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(35.0, 38.5, 2.2), 0.45, 0.02, 0.02, 12),
      mats.pyroGraphite
    );
    graphiteBack.position.z = -9.6;
    const coldFoam = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.2, 37.5, 2.0), 0.65, 0.02, 0.02, 12),
      mats.lensFoamSeal
    );
    coldFoam.position.z = -10.25;
    g.add(graphiteBack, coldFoam);

    parts.push(
      finalizeBatteryPart(
        'bat-thermal-graphite-wrap',
        30,
        '#6366f1',
        g,
        new THREE.Vector3(0, -2.2, 0),
        new THREE.Vector3(-42, -24, -46),
        cp,
        0.24
      )
    );
  }

  parts.push(...buildBatteryUltra27Parts(mats));
  return parts;
}
