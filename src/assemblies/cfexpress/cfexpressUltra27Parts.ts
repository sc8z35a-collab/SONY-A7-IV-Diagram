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
import { CFEXPRESS_ULTRA27_EXPLANATIONS } from './cfexpressUltra27Explanations';

function finalizeCfexpressUltra27Part(
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
    explanation: CFEXPRESS_ULTRA27_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Phase 27B — Standalone CFexpress 4.0 Card Ultra-Deep Expansion (+30 Parts C31–C60 -> 60 Total).
 * 2× inspection scale of true CFexpress Type A (40.0 × 56.0 × 5.6 mm), centered at (0, 0, 0).
 * Every part sits authentically inside the card envelope when assembled and fans out cleanly when exploded.
 */
export function buildCfexpressUltra27Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // C31. 20°–30° Leading-Edge PCB Chamfer Bevel
  // =========================================================================
  {
    const g = new THREE.Group();
    const bevelShape = new THREE.Shape();
    bevelShape.moveTo(-16.2, 0);
    bevelShape.lineTo(16.2, 0);
    bevelShape.lineTo(15.6, -1.0);
    bevelShape.lineTo(-15.6, -1.0);
    bevelShape.closePath();
    const bevel = new THREE.Mesh(
      extrudeCentered(bevelShape, 0.72, 0.2, 0.2, 6),
      mats.pcbEdgeLaminate
    );
    const goldLip = new THREE.Mesh(
      new THREE.BoxGeometry(30.4, 0.22, 0.96),
      mats.goldPlating
    );
    goldLip.position.y = 0.25;
    g.add(bevel, goldLip);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-edge-bevel-chamfer',
        31,
        '#ca8a04',
        g,
        new THREE.Vector3(0, -27.2, 0),
        new THREE.Vector3(-32, -64, 14),
        cp
      )
    );
  }

  // =========================================================================
  // C32. Staggered Hot-Plug Contact Pins (First-Make GND/+3V3, Last-Make INS#)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 21 staggered pins highlighting longer first-make GND(1,15,18,21)/+3V3(10) and shorter INS#(12)
    const firstMake = new Set([1, 10, 15, 18, 21]);
    for (let pin = 1; pin <= 21; pin++) {
      const px = -14.0 + (pin - 1) * 1.4;
      const isLong = firstMake.has(pin);
      const isIns = pin === 12;
      const len = isLong ? 6.2 : isIns ? 3.8 : 5.1;
      const yShift = isLong ? -0.55 : isIns ? 0.65 : 0;
      const mat = isLong
        ? mats.goldPlating
        : isIns
          ? mats.mountRedIndexDot
          : mats.copperCoil;
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.86, len, 0.28), mat);
      finger.position.set(px, yShift, 0);
      g.add(finger);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-staggered-hotplug-pins',
        32,
        '#eab308',
        g,
        new THREE.Vector3(0, -24.8, 0.56),
        new THREE.Vector3(34, -64, 20),
        cp
      )
    );
  }

  // =========================================================================
  // C33. Asymmetric Side Guide Rails & Push-Push Eject Detent Notch
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left asymmetric poka-yoke guide rail
    const leftRail = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 44.0, 2.6),
      mats.bodyBatteryShell
    );
    leftRail.position.set(-19.5, 0, -0.35);
    // Right guide rail split around the push-push eject retention detent notch
    const rightTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 21.0, 2.6),
      mats.bodyBatteryShell
    );
    rightTop.position.set(19.5, 11.5, 0.35);
    const rightBot = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 17.0, 2.6),
      mats.bodyBatteryShell
    );
    rightBot.position.set(19.5, -13.5, 0.35);
    // Highlighted detent notch pocket
    const detentAccent = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 5.2, 2.8),
      mats.cinnabarAnodized
    );
    detentAccent.position.set(19.3, -2.0, 0.35);
    g.add(leftRail, rightTop, rightBot, detentAccent);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-side-guide-rails-notch',
        33,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-92, 0, 26),
        cp
      )
    );
  }

  // =========================================================================
  // C34. Top/Bottom Metal Armor Micro-Laser Spot Welds & Crimp Seam
  // =========================================================================
  {
    const g = new THREE.Group();
    const seamRim = new THREE.Mesh(
      extrudeCentered(createFrameShape(39.4, 52.0, 1.8, 37.8, 50.4, 1.4), 0.7, 0.05, 0.05, 10),
      mats.titaniumRivet
    );
    // Perimeter micro-laser weld spot dots along both long edges
    for (let i = -5; i <= 5; i++) {
      for (const sx of [-18.9, 18.9]) {
        const spot = new THREE.Mesh(
          new THREE.CylinderGeometry(0.45, 0.45, 0.95, 10),
          mats.solderBallSilver
        );
        spot.rotation.x = Math.PI / 2;
        spot.position.set(sx, i * 4.4, 0);
        g.add(spot);
      }
    }
    g.add(seamRim);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-armor-laser-welds',
        34,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 1.4, 0),
        new THREE.Vector3(92, 0, -24),
        cp
      )
    );
  }

  // =========================================================================
  // C35. Shell-to-PCB EMI Grounding Spring Clips & Conductive Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    const clipCoords: Array<[number, number]> = [
      [-15.6, -15.0],
      [15.6, -15.0],
      [-15.6, 17.5],
      [15.6, 17.5],
    ];
    for (const [cx, cy] of clipCoords) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.8, 1.1), mats.beCuSpring);
      clip.position.set(cx, cy, 0);
      const tongue = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.8, 0.35), mats.goldPlating);
      tongue.position.set(cx, cy, 0.65);
      tongue.rotation.y = cx < 0 ? 0.25 : -0.25;
      g.add(clip, tongue);
    }
    // Conductive Ni-Cu fabric EMI gasket strips along top & bottom edges
    for (const cy of [-21.2, 23.2]) {
      const gasket = new THREE.Mesh(new THREE.BoxGeometry(26.0, 1.1, 0.7), mats.conductiveNiCuFoam);
      gasket.position.set(0, cy, 0.25);
      g.add(gasket);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-emi-ground-spring-clips',
        35,
        '#d97706',
        g,
        new THREE.Vector3(0, 1.0, 0.9),
        new THREE.Vector3(-86, -18, -32),
        cp
      )
    );
  }

  // =========================================================================
  // C36. Next-Gen Ultra-Thin Micro-Vapor Spreader / Thermal Fin Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    const plate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(32.0, 42.0, 1.8), 0.32, 0.04, 0.04, 10),
      mats.vaporChamberCopper
    );
    // Precision longitudinal micro-fin / vapor wick channels
    for (let i = -6; i <= 6; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.65, 38.5, 0.26), mats.vcCopperMeshWick);
      fin.position.set(i * 2.2, 0, 0.22);
      g.add(fin);
    }
    g.add(plate);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-micro-vapor-fin-plate',
        36,
        '#ea580c',
        g,
        new THREE.Vector3(0, 2.2, 2.02),
        new THREE.Vector3(26, 16, 68),
        cp
      )
    );
  }

  // =========================================================================
  // C37. High-Emissivity Thermal Coating & Laser VPG800 / Serial Badge
  // =========================================================================
  {
    const g = new THREE.Group();
    const thermalCoat = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.0, 40.0, 1.8), 0.16, 0.02, 0.02, 10),
      mats.pyroGraphite
    );
    // Clapperboard-style VPG800 certification badge + laser serial bars
    const vpgBox = new THREE.Mesh(new THREE.BoxGeometry(10.5, 7.6, 0.24), mats.goldPlating);
    vpgBox.position.set(-7.5, 8.5, -0.04);
    const vpgInner = new THREE.Mesh(new THREE.BoxGeometry(8.8, 5.8, 0.28), mats.matteBlackAnodized);
    vpgInner.position.set(-7.5, 8.5, -0.05);
    for (let i = 0; i < 4; i++) {
      const serialLine = new THREE.Mesh(
        new THREE.BoxGeometry(22.0 - i * 2.2, 0.95, 0.22),
        mats.silverElectrode
      );
      serialLine.position.set(0, -3.5 - i * 2.6, -0.04);
      g.add(serialLine);
    }
    g.add(thermalCoat, vpgBox, vpgInner);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-vpg800-laser-serial',
        37,
        '#facc15',
        g,
        new THREE.Vector3(0, 0, -2.68),
        new THREE.Vector3(28, -26, -74),
        cp
      )
    );
  }

  // =========================================================================
  // C38. PCIe Gen4 85-Ohm Differential Pairs & Serpentine Length-Matching Traces
  // =========================================================================
  {
    const g = new THREE.Group();
    // 2 differential pairs (TX + RX) with miniature trombone serpentine meanders
    for (const pairIdx of [0, 1]) {
      const baseX = -5.4 + pairIdx * 5.2;
      for (const polarity of [-0.45, 0.45]) {
        const px = baseX + polarity;
        const lowerRun = new THREE.Mesh(new THREE.BoxGeometry(0.28, 4.2, 0.14), mats.copperCoil);
        lowerRun.position.set(px, -3.6, 0);
        const upperRun = new THREE.Mesh(new THREE.BoxGeometry(0.28, 3.8, 0.14), mats.copperCoil);
        upperRun.position.set(px, 3.5, 0);
        g.add(lowerRun, upperRun);
        // 3 serpentine trombone loops for picosecond skew matching
        for (let m = 0; m < 3; m++) {
          const jog = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.26, 0.14), mats.goldPlating);
          jog.position.set(px + (m % 2 === 0 ? 0.55 : -0.55), -1.2 + m * 1.2, 0.02);
          g.add(jog);
        }
      }
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-diff-85ohm-serpentine',
        38,
        '#f59e0b',
        g,
        new THREE.Vector3(-4.0, -16.8, 0.52),
        new THREE.Vector3(-56, -68, 36),
        cp
      )
    );
  }

  // =========================================================================
  // C39. Laser Blind Micro-Vias & Stub-Free Back-Drilled High-Speed Vias
  // =========================================================================
  {
    const g = new THREE.Group();
    // 5×4 matrix of stacked copper-filled VIPPO blind micro-vias & thermal via barrels
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        const isBlind = (r + c) % 2 === 0;
        const barrel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.32, isBlind ? 0.72 : 1.12, 10),
          isBlind ? mats.copperHybridBond : mats.goldPlating
        );
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(-4.4 + c * 2.2, -3.3 + r * 2.2, isBlind ? 0.2 : 0);
        const capPad = new THREE.Mesh(
          new THREE.CylinderGeometry(0.54, 0.54, 0.1, 12),
          mats.goldPlating
        );
        capPad.rotation.x = Math.PI / 2;
        capPad.position.set(-4.4 + c * 2.2, -3.3 + r * 2.2, 0.56);
        g.add(barrel, capPad);
      }
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-backdrilled-microvias',
        39,
        '#d97706',
        g,
        new THREE.Vector3(-2.0, -4.5, 0),
        new THREE.Vector3(-30, -20, -56),
        cp
      )
    );
  }

  // =========================================================================
  // C40. Integrated 3.3 V eFuse & Soft-Start Inrush Load Switch IC
  // =========================================================================
  {
    const g = new THREE.Group();
    const pkg = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.4, 0.75), mats.icEpoxy);
    const dieCap = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 0.14), mats.mountShimBlue);
    dieCap.position.z = 0.42;
    const slewCap = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.65, 0.55), mats.smdCeramic);
    slewCap.position.set(2.8, 0, -0.08);
    g.add(pkg, dieCap, slewCap);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-efuse-hotplug-switch',
        40,
        '#0284c7',
        g,
        new THREE.Vector3(4.5, -19.8, 0.72),
        new THREE.Vector3(54, -68, 18),
        cp
      )
    );
  }

  // =========================================================================
  // C41. Multi-Rail Power Ferrite Beads & High-Frequency Noise Filters
  // =========================================================================
  {
    const g = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const bead = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 0.7), mats.ferriteInductor);
      bead.position.set(-2.4 + i * 1.6, 0.8, 0);
      const endL = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.88, 0.72), mats.solderBallSilver);
      endL.position.set(-2.4 + i * 1.6 - 0.75, 0.8, 0);
      const endR = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.88, 0.72), mats.solderBallSilver);
      endR.position.set(-2.4 + i * 1.6 + 0.75, 0.8, 0);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.58), mats.smdCeramic);
      cap.position.set(-2.4 + i * 1.6, -0.7, 0);
      g.add(bead, endL, endR, cap);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-ferrite-cm-choke',
        41,
        '#475569',
        g,
        new THREE.Vector3(6.5, -13.8, -0.78),
        new THREE.Vector3(80, -42, -26),
        cp
      )
    );
  }

  // =========================================================================
  // C42. PCIe Sideband Control Logic (PERST# Reset & CLKREQ# L1.2 Power Saving)
  // =========================================================================
  {
    const g = new THREE.Group();
    const logicIc = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 0.65), mats.icEpoxy);
    const clkAccent = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 0.12), mats.cfaGreen);
    clkAccent.position.z = 0.36;
    for (let i = 0; i < 3; i++) {
      const pullup = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.55, 0.45), mats.matteBlackAnodized);
      pullup.position.set(-1.2 + i * 1.2, -2.0, -0.05);
      g.add(pullup);
    }
    g.add(logicIc, clkAccent);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-pcie-sideband-logic',
        42,
        '#16a34a',
        g,
        new THREE.Vector3(-10.8, -19.6, 0.72),
        new THREE.Vector3(-78, -62, 16),
        cp
      )
    );
  }

  // =========================================================================
  // C43. PLP Hold-Up Capacitor Health Monitor Circuit & Bleed-Check Resistors
  // =========================================================================
  {
    const g = new THREE.Group();
    const monIc = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.8, 0.65), mats.icEpoxy);
    const senseMark = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 0.14), mats.tantalumCapYellow);
    senseMark.position.z = -0.36;
    // Precision test-discharge bleed resistor bank
    for (let i = 0; i < 2; i++) {
      const bleed = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.9, 0.5), mats.copperHeatSpreader);
      bleed.position.set(-1.0 + i * 2.0, 2.2, 0);
      g.add(bleed);
    }
    g.add(monIc, senseMark);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-plp-cap-health-mcu',
        43,
        '#eab308',
        g,
        new THREE.Vector3(-10.2, -5.2, -0.82),
        new THREE.Vector3(-82, -2, -42),
        cp
      )
    );
  }

  // =========================================================================
  // C44. Factory JTAG / UART / ROM-Recovery Micro Test Pads
  // =========================================================================
  {
    const g = new THREE.Group();
    const strip = new THREE.Mesh(new THREE.BoxGeometry(2.4, 15.0, 0.16), mats.hdiMainboardPcb);
    g.add(strip);
    for (let i = 0; i < 8; i++) {
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 0.22, 14),
        mats.goldPlating
      );
      pad.rotation.x = Math.PI / 2;
      pad.position.set(i % 2 === 0 ? -0.45 : 0.45, -6.3 + i * 1.8, -0.08);
      g.add(pad);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-jtag-uart-test-pads',
        44,
        '#f59e0b',
        g,
        new THREE.Vector3(15.2, 2.5, -0.56),
        new THREE.Vector3(86, 22, -36),
        cp
      )
    );
  }

  // =========================================================================
  // C45. SMT Optical Alignment Fiducial Marks (Pick-and-Place Bullseyes)
  // =========================================================================
  {
    const g = new THREE.Group();
    const fidPos: Array<[number, number]> = [
      [-15.2, -20.5],
      [15.2, -20.5],
      [15.2, 21.8],
    ];
    for (const [fx, fy] of fidPos) {
      const clearanceRing = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 0.14, 18),
        mats.pcbEdgeLaminate
      );
      clearanceRing.rotation.x = Math.PI / 2;
      clearanceRing.position.set(fx, fy, 0);
      const bullseye = new THREE.Mesh(
        new THREE.CylinderGeometry(0.85, 0.85, 0.22, 16),
        mats.goldPlating
      );
      bullseye.rotation.x = Math.PI / 2;
      bullseye.position.set(fx, fy, 0.04);
      g.add(clearanceRing, bullseye);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-optical-fiducials',
        45,
        '#fbbf24',
        g,
        new THREE.Vector3(0, 0, 0.54),
        new THREE.Vector3(84, -18, 40),
        cp
      )
    );
  }

  // =========================================================================
  // C46. Plasma Hydrophobic Nano-Coating (Sub-500 nm Moisture Barrier)
  // =========================================================================
  {
    const g = new THREE.Group();
    const nanoFilm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.8, 47.0, 1.6), 0.22, 0.03, 0.03, 10),
      mats.fluorineCoatCyan
    );
    g.add(nanoFilm);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-conformal-nano-coat',
        46,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 1.5, 1.05),
        new THREE.Vector3(-28, 22, 66),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C47. Low-Dk / Low-Df Dielectric Solder Mask & Solid Copper Reference GND Plane
  // =========================================================================
  {
    const g = new THREE.Group();
    const gndPlane = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.2, 46.5, 1.4), 0.18, 0.02, 0.02, 10),
      mats.copperHeatSpreader
    );
    const maskSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.6, 47.0, 1.5), 0.14, 0.02, 0.02, 10),
      mats.sensorPcb
    );
    maskSheet.position.z = -0.16;
    g.add(gndPlane, maskSheet);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-solder-mask-silkscreen',
        47,
        '#15803d',
        g,
        new THREE.Vector3(0, 1.2, -0.52),
        new THREE.Vector3(0, -34, -66),
        cp
      )
    );
  }

  // =========================================================================
  // C48. Controller SoC Flip-Chip C4 Solder Bumps & Copper Pillar Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const siliconBase = new THREE.Mesh(new THREE.BoxGeometry(9.2, 9.2, 0.24), mats.ispSiliconDie);
    siliconBase.position.z = 0.22;
    g.add(siliconBase);
    // 6×6 visible grid of C2 copper pillars + C4 solder micro-bumps
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        const bx = -3.75 + c * 1.5;
        const by = -3.75 + r * 1.5;
        const cuPillar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.32, 0.26, 8),
          mats.copperHybridBond
        );
        cuPillar.rotation.x = Math.PI / 2;
        cuPillar.position.set(bx, by, 0.04);
        const c4Ball = new THREE.Mesh(
          new THREE.SphereGeometry(0.32, 8, 6),
          mats.solderBallSilver
        );
        c4Ball.position.set(bx, by, -0.16);
        g.add(cuPillar, c4Ball);
      }
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-flipchip-c4-bumps',
        48,
        '#b45309',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.88),
        new THREE.Vector3(-96, -38, 22),
        cp
      )
    );
  }

  // =========================================================================
  // C49. Multi-Layer ABF / BT Package Interposer Substrate & RDL Fan-Out
  // =========================================================================
  {
    const g = new THREE.Group();
    const abfCore = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.6, 11.6, 0.7), 0.32, 0.04, 0.04, 8),
      mats.abfSubstrate
    );
    // Fan-out copper RDL traces radiating from center die to perimeter BGA pads
    for (let k = 0; k < 8; k++) {
      const ang = (k * Math.PI) / 4;
      const rdl = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.32, 0.1), mats.goldPlating);
      rdl.position.set(Math.cos(ang) * 3.1, Math.sin(ang) * 3.1, 0.2);
      rdl.rotation.z = ang;
      g.add(rdl);
    }
    g.add(abfCore);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-abf-package-substrate',
        49,
        '#0f766e',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.66),
        new THREE.Vector3(-94, -14, 48),
        cp
      )
    );
  }

  // =========================================================================
  // C50. 16-Die Staggered Offset Stacked 3D NAND Dies (16DP) & Dummy Spacer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Visual staircase of 8 representative ultra-thin staggered silicon dies (representing 16DP stack)
    for (let d = 0; d < 8; d++) {
      const isDummy = d === 3;
      const die = new THREE.Mesh(
        new THREE.BoxGeometry(16.0, 12.2, 0.16),
        isDummy ? mats.ceramicAlumina : mats.siliconSensorDie
      );
      die.position.set(-1.4 + d * 0.42, 0, -0.7 + d * 0.22);
      g.add(die);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-staggered-16die',
        50,
        '#0284c7',
        g,
        new THREE.Vector3(0, 12.6, 1.05),
        new THREE.Vector3(-76, 56, 36),
        cp
      )
    );
  }

  // =========================================================================
  // C51. Die Attach Film (DAF) & Multi-Tier Ultra-Fine Gold/Copper Bond Wires
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 translucent golden DAF adhesive layers + arched cascading bond wires along the staircase edge
    for (let tier = 0; tier < 4; tier++) {
      const daf = new THREE.Mesh(
        new THREE.BoxGeometry(15.2, 11.4, 0.08),
        mats.polyimideFpc
      );
      daf.position.set(-0.9 + tier * 0.6, 0, -0.45 + tier * 0.36);
      g.add(daf);
    }
    // Cascading arched gold bond wires along the right staggered pad ledge
    for (let w = 0; w < 6; w++) {
      const wy = -4.5 + w * 1.8;
      const wireArch = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, 0.12, 6, 14, Math.PI),
        mats.goldPlating
      );
      wireArch.position.set(8.6, wy, 0.1);
      g.add(wireArch);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-daf-gold-wires',
        51,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 12.6, 1.15),
        new THREE.Vector3(-96, 36, 16),
        cp
      )
    );
  }

  // =========================================================================
  // C52. High-Thermal EMC Mold Resin & SAC305 Lead-Free BGA Solder Balls
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cutaway EMC silica-filled black mold frame showing the underside BGA ball array
    const emcFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(22.4, 17.4, 0.8, 17.6, 12.6, 0.5), 0.72, 0.06, 0.06, 8),
      mats.icEpoxy
    );
    emcFrame.position.z = 0.35;
    g.add(emcFrame);
    // 7×5 matrix of SAC305 lead-free BGA solder balls
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 7; c++) {
        const ball = new THREE.Mesh(
          new THREE.SphereGeometry(0.42, 8, 6),
          mats.solderBallSilver
        );
        ball.position.set(-7.8 + c * 2.6, -5.2 + r * 2.6, -0.2);
        g.add(ball);
      }
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-emc-mold-balls',
        52,
        '#64748b',
        g,
        new THREE.Vector3(0, 12.6, 0.58),
        new THREE.Vector3(0, 68, -42),
        cp
      )
    );
  }

  // =========================================================================
  // C53. Controller On-Die High-Speed SRAM Buffer & NVMe HMB DMA Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const sramTile = new THREE.Mesh(new THREE.BoxGeometry(5.2, 4.2, 0.38), mats.siliconDramLayer);
    // Dual-bank high-speed SRAM sub-arrays + HMB PCIe DMA lane accent
    for (const dx of [-1.25, 1.25]) {
      const bank = new THREE.Mesh(new THREE.BoxGeometry(2.1, 3.2, 0.16), mats.siliconTsvDram);
      bank.position.set(dx, 0, 0.24);
      g.add(bank);
    }
    const dmaBridge = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.55, 0.14), mats.goldPlating);
    dmaBridge.position.set(0, -1.65, 0.25);
    g.add(sramTile, dmaBridge);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-hmb-sram-controller-buf',
        53,
        '#8b5cf6',
        g,
        new THREE.Vector3(-3.5, -6.5, 1.32),
        new THREE.Vector3(-46, -10, 64),
        cp
      )
    );
  }

  // =========================================================================
  // C54. Next-Gen CBA Wafer-to-Wafer Cu-Cu Hybrid Bonding (Kioxia BiCS8–10)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper 3D Memory Array wafer slice + Lower CMOS logic wafer slice bonded via Cu-Cu pads!
    const arrayWafer = new THREE.Mesh(new THREE.BoxGeometry(11.0, 7.6, 0.24), mats.siliconSensorDie);
    arrayWafer.position.z = 0.28;
    const cmosWafer = new THREE.Mesh(new THREE.BoxGeometry(11.0, 7.6, 0.24), mats.siliconLogicLayer);
    cmosWafer.position.z = -0.28;
    g.add(arrayWafer, cmosWafer);
    // Cu-Cu Hybrid Bonding micro-pad matrix bridging the two wafers face-to-face
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const cuPad = new THREE.Mesh(
          new THREE.CylinderGeometry(0.42, 0.42, 0.36, 10),
          mats.copperHybridBond
        );
        cuPad.rotation.x = Math.PI / 2;
        cuPad.position.set(-4.0 + c * 2.0, -2.2 + r * 2.2, 0);
        g.add(cuPad);
      }
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-cba-cu-hybrid-bond',
        54,
        '#d97706',
        g,
        new THREE.Vector3(0, 14.5, 1.24),
        new THREE.Vector3(-52, 74, 58),
        cp
      )
    );
  }

  // =========================================================================
  // C55. Crossed Bit Line (CBL) & CMOS-under-Array (CuA) Peripheral Floor
  // =========================================================================
  {
    const g = new THREE.Group();
    const cuaFloor = new THREE.Mesh(new THREE.BoxGeometry(11.4, 7.8, 0.24), mats.siliconTransistorLayer);
    // Criss-crossing CBL metal bitlines routing orthogonally over 4 parallel planes
    for (let i = -3; i <= 3; i++) {
      const blX = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.24, 0.1), mats.copperCoil);
      blX.position.set(0, i * 1.05, 0.16);
      g.add(blX);
    }
    for (let j = -2; j <= 2; j++) {
      const blY = new THREE.Mesh(new THREE.BoxGeometry(0.24, 7.2, 0.1), mats.goldPlating);
      blY.position.set(j * 2.2, 0, 0.26);
      g.add(blY);
    }
    g.add(cuaFloor);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-crossed-bitline-cbl',
        55,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 11.2, 1.22),
        new THREE.Vector3(56, 58, 42),
        cp
      )
    );
  }

  // =========================================================================
  // C56. Atomic-Scale ONO Charge-Trap Stack (Tunnel SiO₂ / Si₃N₄ / Al₂O₃)
  // =========================================================================
  {
    const g = new THREE.Group();
    const tilt = new THREE.Group();
    // Enlarged concentric cutaway showing the 4 nanometer cylindrical walls of 1 NAND cell!
    const polyChannel = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.15, 1.05, 20),
      mats.gatePolysilicon
    );
    const tunnelOx = new THREE.Mesh(
      new THREE.CylinderGeometry(1.75, 1.75, 0.92, 20, 1, true, 0, Math.PI * 1.5),
      mats.ftiOxide
    );
    const nitrideTrap = new THREE.Mesh(
      new THREE.CylinderGeometry(2.45, 2.45, 0.78, 20, 1, true, 0, Math.PI * 1.3),
      mats.loficDielectric
    );
    const aluminaBlock = new THREE.Mesh(
      new THREE.CylinderGeometry(3.15, 3.15, 0.64, 20, 1, true, 0, Math.PI * 1.1),
      mats.aluminaHighKFilm
    );
    tilt.add(polyChannel, tunnelOx, nitrideTrap, aluminaBlock);
    tilt.rotation.x = Math.PI / 2;
    g.add(tilt);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-ono-charge-trap-stack',
        56,
        '#a855f7',
        g,
        new THREE.Vector3(5.5, 15.8, 1.15),
        new THREE.Vector3(34, 72, 52),
        cp
      )
    );
  }

  // =========================================================================
  // C57. Tungsten / Molybdenum Wordline Staircase Decoder Contact Structure
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mayan-pyramid staircase of 6 stepped tungsten/molybdenum wordline decks + vertical contacts
    for (let step = 0; step < 6; step++) {
      const w = 10.6 - step * 1.45;
      const deck = new THREE.Mesh(
        new THREE.BoxGeometry(w, 6.2, 0.12),
        step % 2 === 0 ? mats.tungstenGrid : mats.tungstenCopper
      );
      deck.position.set(-step * 0.72, 0, -0.35 + step * 0.14);
      g.add(deck);
      // Vertical tungsten contact pillar landing on this specific staircase terrace
      const pillarH = 0.92 - step * 0.14;
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, pillarH, 8),
        mats.goldPlating
      );
      pillar.rotation.x = Math.PI / 2;
      pillar.position.set(w * 0.5 - step * 0.72 - 0.45, -1.6 + (step % 3) * 1.6, -0.35 + step * 0.14 + pillarH * 0.5);
      g.add(pillar);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-wordline-staircase',
        57,
        '#64748b',
        g,
        new THREE.Vector3(-7.5, 15.8, 1.15),
        new THREE.Vector3(-86, 66, -6),
        cp
      )
    );
  }

  // =========================================================================
  // C58. On-Die High-Voltage Charge Pump (20 V ISPP Pulse Generator)
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(8.8, 4.6, 0.22), mats.siliconLogicLayer);
    g.add(base);
    // 5-stage Dickson capacitor boost ladder stepping 3.3V -> 20V
    for (let st = 0; st < 5; st++) {
      const h = 0.2 + st * 0.08;
      const stageCap = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 3.2, h),
        st >= 3 ? mats.cinnabarAnodized : mats.tantalumCapYellow
      );
      stageCap.position.set(-3.2 + st * 1.6, 0, 0.12 + h * 0.5);
      g.add(stageCap);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-charge-pump',
        58,
        '#ef4444',
        g,
        new THREE.Vector3(8.5, 12.6, 1.15),
        new THREE.Vector3(84, 52, 16),
        cp
      )
    );
  }

  // =========================================================================
  // C59. High-Speed 16 KB Page Buffer & 8-Level TLC Sense Amplifier Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(9.2, 4.4, 0.22), mats.siliconTransistorLayer);
    g.add(base);
    // 8 stepped voltage-threshold sense comparator bars visualizing 3-bit TLC (8 Vth levels!)
    for (let lv = 0; lv < 8; lv++) {
      const barH = 0.16 + lv * 0.06;
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.75, 2.8, barH),
        lv % 2 === 0 ? mats.cfaBlue : mats.vcWorkingFluidCyan
      );
      bar.position.set(-3.5 + lv * 1.0, 0, 0.12 + barH * 0.5);
      g.add(bar);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-sense-amp-page-buf',
        59,
        '#3b82f6',
        g,
        new THREE.Vector3(4.5, 9.2, 1.15),
        new THREE.Vector3(84, 34, 48),
        cp
      )
    );
  }

  // =========================================================================
  // C60. Proactive Read-Reclaim, Early-Move & Background Data Retention Scrubber
  // =========================================================================
  {
    const g = new THREE.Group();
    const scrubberBase = new THREE.Mesh(new THREE.BoxGeometry(7.8, 5.2, 0.22), mats.icEpoxy);
    // Fading amber block -> relocation arc -> refreshed emerald block!
    const fadingBlock = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.2, 0.3), mats.tantalumCapYellow);
    fadingBlock.position.set(-2.2, 0, 0.24);
    const freshBlock = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.2, 0.3), mats.cfaGreen);
    freshBlock.position.set(2.2, 0, 0.24);
    const moveArc = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.14, 8, 16, Math.PI),
      mats.vcWorkingFluidCyan
    );
    moveArc.position.set(0, 0.2, 0.36);
    g.add(scrubberBase, fadingBlock, freshBlock, moveArc);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-read-reclaim-scrub',
        60,
        '#10b981',
        g,
        new THREE.Vector3(-7.5, 8.8, 1.15),
        new THREE.Vector3(72, 68, -22),
        cp
      )
    );
  }

  return parts;
}
