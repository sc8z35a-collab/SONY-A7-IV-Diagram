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
  buildSmdPassive,
  buildSpotWeldNuggets,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeCfexpressUltra27Part(
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
 * Phase 27B — Standalone CFexpress 4.0 Card Ultra-Deep Expansion (+30 Parts C31–C60 -> 60 Total).
 * 2× inspection scale of true CFexpress Type A (40.0 × 56.0 × 5.6 mm), centered at (0, 0, 0).
 * Every part sits authentically inside the card envelope when assembled and fans out cleanly when exploded.
 */
export function buildCfexpressUltra27Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // C31. 20°–30° Leading-Edge PCB Chamfer Bevel
  // =========================================================================
  {
    const g = new THREE.Group();
    const bevelShape = new THREE.Shape();
    bevelShape.moveTo(-16.2, 0);
    bevelShape.lineTo(16.2, 0);
    bevelShape.lineTo(15.4, -1.05);
    bevelShape.lineTo(-15.4, -1.05);
    bevelShape.closePath();
    const bevel = new THREE.Mesh(
      extrudeHiRes(bevelShape, 0.76, 0.24, 0.24, 2, 10),
      mats.pcbEdgeLaminate
    );
    const goldLip = new THREE.Mesh(
      createChamferedBoxGeo(30.6, 0.24, 0.98, 0.1, 0.04, 'z'),
      mats.goldPlating
    );
    goldLip.position.y = 0.24;
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
    // Exact verified CFexpress Type A 21-pin staggered sequence:
    // First-make longer GND (1,4,15,18,21) & +3V3 (10); Last-make recessed INS# card detect (12)
    const firstMake = new Set([1, 4, 10, 15, 18, 21]);
    for (let pin = 1; pin <= 21; pin++) {
      const px = -15.0 + (pin - 1) * 1.5;
      const isLong = firstMake.has(pin);
      const isIns = pin === 12;
      const len = isLong ? 5.9 : isIns ? 3.7 : 4.9;
      const yShift = isLong ? -0.45 : isIns ? 0.52 : -0.04;
      const mat = isLong
        ? mats.goldPlating
        : isIns
          ? mats.mountRedIndexDot
          : mats.copperCoil;
      const finger = new THREE.Mesh(
        createChamferedBoxGeo(0.86, len, 0.22, 0.2, 0.04, 'z'),
        mat
      );
      finger.position.set(px, yShift, 0);
      finger.userData.noEdges = true;
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
    const leftRail = new THREE.Mesh(
      createChamferedBoxGeo(1.12, 44.0, 2.6, 0.3, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    leftRail.position.set(-19.5, 0, -0.35);

    const rightTop = new THREE.Mesh(
      createChamferedBoxGeo(1.12, 21.0, 2.6, 0.3, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    rightTop.position.set(19.5, 11.5, 0.35);
    const rightBot = new THREE.Mesh(
      createChamferedBoxGeo(1.12, 17.0, 2.6, 0.3, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    rightBot.position.set(19.5, -13.5, 0.35);

    const detentAccent = new THREE.Mesh(
      createChamferedBoxGeo(1.32, 5.2, 2.8, 0.35, 0.1, 'z'),
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
      extrudeHiRes(createFrameShape(39.4, 52.0, 2.2, 37.9, 50.5, 1.8), 0.7, 0.06, 0.06, 2, 20),
      mats.titaniumRivet
    );
    // Precision perimeter micro-laser fusion weld nuggets along both flanks
    const weldCoords: Array<[number, number, number]> = [];
    for (let i = -5; i <= 5; i++) {
      weldCoords.push([-18.85, i * 4.4, 0], [18.85, i * 4.4, 0]);
    }
    const welds = buildSpotWeldNuggets(weldCoords, 0.44, 'z', mats.titaniumRivet, mats.solderBallSilver);
    g.add(seamRim, welds);
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
      const clip = new THREE.Mesh(
        createChamferedBoxGeo(2.6, 1.8, 1.1, 0.25, 0.06, 'z'),
        mats.beCuSpring
      );
      clip.position.set(cx, cy, 0);
      const tongue = new THREE.Mesh(
        createChamferedBoxGeo(2.1, 0.85, 0.34, 0.16, 0.04, 'z'),
        mats.goldPlating
      );
      tongue.position.set(cx, cy, 0.65);
      tongue.rotation.y = cx < 0 ? 0.26 : -0.26;
      tongue.userData.noEdges = true;
      g.add(clip, tongue);
    }
    // Conductive Ni-Cu woven fabric EMI grounding gaskets along top & bottom edges
    for (const cy of [-21.2, 23.2]) {
      const gasket = new THREE.Mesh(
        createChamferedBoxGeo(26.2, 1.15, 0.72, 0.3, 0.06, 'z'),
        mats.conductiveNiCuFoam
      );
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
    const plateGeo = extrudeHiRes(createRoundedRectShape(32.2, 42.2, 2.0), 0.32, 0.05, 0.05, 2, 20);
    applyPlanarUVs(plateGeo, 32.2, 42.2, 'xy');
    const plate = new THREE.Mesh(plateGeo, u.cfeCopperThermal);

    // Precision longitudinal micro-capillary vapor wick channels
    for (let i = -6; i <= 6; i++) {
      const fin = new THREE.Mesh(
        createChamferedBoxGeo(0.68, 38.6, 0.24, 0.16, 0.03, 'z'),
        mats.vcCopperMeshWick
      );
      fin.position.set(i * 2.2, 0, 0.22);
      fin.userData.noEdges = true;
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
        new THREE.Vector3(46, 20, 26),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C37. High-Emissivity Thermal Coating & Laser VPG800 / Serial Badge
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-emissivity pyro-graphite thermal liner seated cleanly on the INNER side of C02 backplate
    // (zero Z-fighting with the laser-etched stainless backplate face at z = -2.81!)
    const thermalCoat = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(34.0, 41.0, 1.8), 0.16, 0.03, 0.03, 1, 18),
      mats.pyroGraphite
    );
    thermalCoat.position.z = 0.62;

    // Delicate gold-beveled VPG800 clapperboard outline framing the rear laser-etched VPG800 mark cleanly!
    const vpgFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(9.4, 9.8, 0.6, 8.2, 8.6, 0.35), 0.12, 0.02, 0.02, 1, 14),
      mats.goldPlating
    );
    vpgFrame.position.set(12.2, 9.3, -0.2);
    vpgFrame.userData.noEdges = true;
    g.add(thermalCoat, vpgFrame);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-vpg800-laser-serial',
        37,
        '#facc15',
        g,
        new THREE.Vector3(0, 0, -2.68),
        new THREE.Vector3(28, -26, -74),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C38. PCIe Gen4 85-Ohm Differential Pairs & Serpentine Length-Matching Traces
  // =========================================================================
  {
    const g = new THREE.Group();
    // Smooth 3D TubeGeometry serpentine differential PCIe Gen4 TX/RX trace pairs!
    for (const pairIdx of [0, 1]) {
      const baseX = -5.4 + pairIdx * 5.2;
      for (const polarity of [-0.46, 0.46]) {
        const px = baseX + polarity;
        const pts: THREE.Vector3[] = [
          new THREE.Vector3(px, -5.6, 0),
          new THREE.Vector3(px, -2.2, 0),
          new THREE.Vector3(px + 0.7, -1.6, 0.02),
          new THREE.Vector3(px + 0.7, -0.8, 0.02),
          new THREE.Vector3(px - 0.7, -0.2, 0.02),
          new THREE.Vector3(px - 0.7, 0.6, 0.02),
          new THREE.Vector3(px + 0.7, 1.2, 0.02),
          new THREE.Vector3(px, 2.0, 0),
          new THREE.Vector3(px, 5.4, 0),
        ];
        const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.25);
        const trace = new THREE.Mesh(
          markHiRes(new THREE.TubeGeometry(curve, 36, 0.14, 6, false)),
          polarity < 0 ? mats.copperCoil : mats.goldPlating
        );
        trace.userData.noEdges = true;
        g.add(trace);
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
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C39. Laser Blind Micro-Vias & Stub-Free Back-Drilled High-Speed Vias
  // =========================================================================
  {
    const g = new THREE.Group();
    const barrelBlind = hiResCyl(0.32, 0.32, 0.74, 14).rotateX(Math.PI / 2);
    const barrelThru = hiResCyl(0.32, 0.32, 1.14, 14).rotateX(Math.PI / 2);
    const padGeo = hiResCyl(0.56, 0.56, 0.1, 16).rotateX(Math.PI / 2);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        const isBlind = (r + c) % 2 === 0;
        const vx = -4.4 + c * 2.2;
        const vy = -3.3 + r * 2.2;
        const barrel = new THREE.Mesh(
          isBlind ? barrelBlind : barrelThru,
          isBlind ? mats.copperHybridBond : mats.goldPlating
        );
        barrel.position.set(vx, vy, isBlind ? 0.2 : 0);
        barrel.userData.noEdges = true;
        const capPad = new THREE.Mesh(padGeo, mats.goldPlating);
        capPad.position.set(vx, vy, 0.56);
        capPad.userData.noEdges = true;
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
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C40. Integrated 3.3 V eFuse & Soft-Start Inrush Load Switch IC
  // =========================================================================
  {
    const g = new THREE.Group();
    const efuse = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.74,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    const slewCap = buildSmdPassive(1.25, 0.68, 0.54, mats.smdCeramic, mats.silverElectrode, 'z');
    slewCap.position.set(2.85, 0, -0.08);
    g.add(efuse, slewCap);
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
      const bead = buildSmdPassive(1.65, 0.88, 0.72, mats.ferriteInductor, mats.silverElectrode, 'z');
      bead.position.set(-2.4 + i * 1.65, 0.82, 0);
      const cap = buildSmdPassive(1.18, 0.66, 0.58, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.position.set(-2.4 + i * 1.65, -0.72, 0);
      g.add(bead, cap);
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
    const logicIc = buildChipPackage({
      w: 2.65,
      d: 2.25,
      h: 0.66,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.cfaGreen,
      axis: 'z',
    });
    for (let i = 0; i < 3; i++) {
      const pullup = buildSmdPassive(1.05, 0.58, 0.44, mats.matteBlackAnodized, mats.silverElectrode, 'z');
      pullup.position.set(-1.25 + i * 1.25, -2.05, -0.05);
      g.add(pullup);
    }
    g.add(logicIc);
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
    const monIc = buildChipPackage({
      w: 2.85,
      d: 2.85,
      h: 0.66,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.tantalumCapYellow,
      axis: 'z',
    });
    monIc.rotation.y = Math.PI;
    for (let i = 0; i < 2; i++) {
      const bleed = buildSmdPassive(1.85, 0.92, 0.5, mats.matteBlackAnodized, mats.copperHeatSpreader, 'z');
      bleed.position.set(-1.1 + i * 2.2, 2.25, 0);
      g.add(bleed);
    }
    g.add(monIc);
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
    const strip = new THREE.Mesh(
      createChamferedBoxGeo(2.45, 15.2, 0.16, 0.35, 0.02, 'z'),
      u.cfeHdiPcb
    );
    g.add(strip);
    for (let i = 0; i < 8; i++) {
      const pad = new THREE.Mesh(hiResCyl(0.65, 0.65, 0.22, 18).rotateX(Math.PI / 2), mats.goldPlating);
      pad.position.set(i % 2 === 0 ? -0.45 : 0.45, -6.3 + i * 1.8, -0.08);
      pad.userData.noEdges = true;
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
        hiResCyl(1.5, 1.5, 0.14, 24).rotateX(Math.PI / 2),
        mats.pcbEdgeLaminate
      );
      clearanceRing.position.set(fx, fy, 0);
      clearanceRing.userData.noEdges = true;
      const bullseye = new THREE.Mesh(
        hiResCyl(0.85, 0.85, 0.22, 22).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      bullseye.position.set(fx, fy, 0.04);
      bullseye.userData.noEdges = true;
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
    // Crisp hollow cyan perimeter hydrophobic vapor-seal frame + 4 corner hydrophobic nano-beads
    // (zero central milky occlusion over C01 TOUGH armor or C07 HDI PCB!)
    const nanoRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(33.2, 44.8, 1.5, 31.8, 43.4, 1.2), 0.16, 0.02, 0.02, 1, 20),
      mats.fluorineCoatCyan
    );
    g.add(nanoRim);
    // 4 gleaming micro-scale hydrophobic beading droplets demonstrating >115° contact angle
    for (const [dx, dy] of [
      [-14.8, 20.6],
      [14.8, 20.6],
      [-14.8, -20.6],
      [14.8, -20.6],
    ]) {
      const drop = new THREE.Mesh(hiResSphere(0.45, 14, 10), mats.vcWorkingFluidCyan);
      drop.position.set(dx, dy, 0.18);
      drop.scale.set(1.0, 1.0, 0.68);
      drop.userData.noEdges = true;
      g.add(drop);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-conformal-nano-coat',
        46,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 1.5, 0.65),
        new THREE.Vector3(-76, 36, 8),
        cp,
        0.14
      )
    );
  }

  // =========================================================================
  // C47. Low-Dk / Low-Df Dielectric Solder Mask & Solid Copper Reference GND Plane
  // =========================================================================
  {
    const g = new THREE.Group();
    const gndGeo = extrudeHiRes(createRoundedRectShape(34.2, 46.5, 1.5), 0.18, 0.03, 0.03, 1, 18);
    applyPlanarUVs(gndGeo, 34.2, 46.5, 'xy');
    const gndPlane = new THREE.Mesh(gndGeo, u.cfeCopperThermal);

    const maskGeo = extrudeHiRes(createRoundedRectShape(34.6, 47.0, 1.6), 0.14, 0.02, 0.02, 1, 18);
    applyPlanarUVs(maskGeo, 34.6, 47.0, 'xy-back');
    const maskSheet = new THREE.Mesh(maskGeo, u.cfeHdiPcb);
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
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C48. Controller SoC Flip-Chip C4 Solder Bumps & Copper Pillar Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const dieGeo = createChamferedBoxGeo(9.4, 9.4, 0.24, 0.25, 0.03, 'z');
    applyPlanarUVs(dieGeo, 9.4, 9.4, 'xy');
    const siliconBase = new THREE.Mesh(dieGeo, u.bionzDieFloorplan);
    siliconBase.position.z = 0.22;
    g.add(siliconBase);

    // 6×6 smooth hi-res copper pillar + spherical C4 micro-bump array (InstancedMesh!)
    const pillarGeo = hiResCyl(0.32, 0.32, 0.26, 14).rotateX(Math.PI / 2);
    const ballGeo = hiResSphere(0.32, 10, 8);
    const pillarInst = new THREE.InstancedMesh(pillarGeo, mats.copperHybridBond, 36);
    const ballInst = new THREE.InstancedMesh(ballGeo, mats.solderBallSilver, 36);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        const bx = -3.75 + c * 1.5;
        const by = -3.75 + r * 1.5;
        dm.position.set(bx, by, 0.04);
        dm.updateMatrix();
        pillarInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(bx, by, -0.16);
        dm.updateMatrix();
        ballInst.setMatrixAt(idx, dm.matrix);
        idx++;
      }
    }
    pillarInst.instanceMatrix.needsUpdate = true;
    ballInst.instanceMatrix.needsUpdate = true;
    pillarInst.userData.noEdges = true;
    ballInst.userData.noEdges = true;
    g.add(pillarInst, ballInst);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-flipchip-c4-bumps',
        48,
        '#b45309',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.88),
        new THREE.Vector3(-96, -38, 22),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C49. Multi-Layer ABF / BT Package Interposer Substrate & RDL Fan-Out
  // =========================================================================
  {
    const g = new THREE.Group();
    const abfGeo = extrudeHiRes(createRoundedRectShape(11.8, 11.8, 0.75), 0.32, 0.05, 0.05, 2, 18);
    applyPlanarUVs(abfGeo, 11.8, 11.8, 'xy');
    const abfCore = new THREE.Mesh(abfGeo, u.bionzAbfSubstrate);

    for (let k = 0; k < 8; k++) {
      const ang = (k * Math.PI) / 4;
      const rdl = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.28, 0.1), mats.goldPlating);
      rdl.position.set(Math.cos(ang) * 3.1, Math.sin(ang) * 3.1, 0.2);
      rdl.rotation.z = ang;
      rdl.userData.noEdges = true;
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
    // Crisp 12-stepped staggered 3D TLC NAND die staircase (with alumina thermal spacer & gold bond-pad ledges!)
    for (let d = 0; d < 12; d++) {
      const isDummy = d === 5;
      const dieGeo = createChamferedBoxGeo(16.0, 12.2, 0.11, 0.14, 0.02, 'z');
      applyPlanarUVs(dieGeo, 16.0, 12.2, 'xy');
      const die = new THREE.Mesh(dieGeo, isDummy ? mats.ceramicAlumina : u.bionzIpDieTile);
      die.position.set(-1.6 + d * 0.29, 0, -0.82 + d * 0.15);
      g.add(die);

      // Gold wirebond pad ledge exposed along right staircase overhang
      if (!isDummy && d % 2 === 0) {
        const ledge = new THREE.Mesh(new THREE.BoxGeometry(0.24, 10.6, 0.04), mats.goldPlating);
        ledge.position.set(-1.6 + d * 0.29 + 7.75, 0, -0.82 + d * 0.15 + 0.06);
        ledge.userData.noEdges = true;
        g.add(ledge);
      }
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-staggered-16die',
        50,
        '#0284c7',
        g,
        new THREE.Vector3(0, 12.6, 1.05),
        new THREE.Vector3(-76, 56, 36),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C51. Die Attach Film (DAF) & Multi-Tier Ultra-Fine Gold/Copper Bond Wires
  // =========================================================================
  {
    const g = new THREE.Group();
    for (let tier = 0; tier < 5; tier++) {
      const daf = new THREE.Mesh(
        createChamferedBoxGeo(15.2, 11.4, 0.07, 0.16, 0.01, 'z'),
        mats.polyimideFpc
      );
      daf.position.set(-1.0 + tier * 0.48, 0, -0.52 + tier * 0.28);
      daf.userData.noEdges = true;
      g.add(daf);
    }

    // 10 sweeping multi-tier cascading gold wirebond loops arcing off the staggered staircase down to substrate fingers!
    for (let w = 0; w < 10; w++) {
      const wy = -4.95 + w * 1.1;
      const tier = w % 3;
      const sx = 6.9 + tier * 0.52;
      const sz = -0.25 + tier * 0.42;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sx, wy, sz),
        new THREE.Vector3(sx + 0.6, wy, sz + 0.85),
        new THREE.Vector3(sx + 1.9, wy, sz + 0.65),
        new THREE.Vector3(10.4, wy, -0.55),
      ]);
      const wire = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(curve, 14, 0.07, 6, false)),
        mats.goldPlating
      );
      wire.userData.noEdges = true;
      g.add(wire);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-daf-gold-wires',
        51,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 12.6, 1.15),
        new THREE.Vector3(-96, 36, 16),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C52. High-Thermal EMC Mold Resin & SAC305 Lead-Free BGA Solder Balls
  // =========================================================================
  {
    const g = new THREE.Group();
    const emcFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(22.4, 17.4, 0.85, 17.6, 12.6, 0.55), 0.72, 0.08, 0.08, 2, 18),
      u.icEpoxyLaser
    );
    emcFrame.position.z = 0.35;
    g.add(emcFrame);

    // 7×5 smooth spherical SAC305 lead-free BGA solder balls (InstancedMesh!)
    const ballGeo = hiResSphere(0.42, 12, 10);
    const ballInst = new THREE.InstancedMesh(ballGeo, mats.solderBallSilver, 35);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 7; c++) {
        dm.position.set(-7.8 + c * 2.6, -5.2 + r * 2.6, -0.2);
        dm.updateMatrix();
        ballInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    ballInst.instanceMatrix.needsUpdate = true;
    ballInst.userData.noEdges = true;
    g.add(ballInst);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-emc-mold-balls',
        52,
        '#64748b',
        g,
        new THREE.Vector3(0, 12.6, 0.58),
        new THREE.Vector3(0, 68, -42),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C53. Controller On-Die High-Speed SRAM Buffer & NVMe HMB DMA Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const sramGeo = createChamferedBoxGeo(5.3, 4.3, 0.38, 0.18, 0.04, 'z');
    applyPlanarUVs(sramGeo, 5.3, 4.3, 'xy');
    const sramTile = new THREE.Mesh(sramGeo, u.bionzIpDieTile);
    for (const dx of [-1.25, 1.25]) {
      const bank = new THREE.Mesh(
        createChamferedBoxGeo(2.1, 3.2, 0.16, 0.1, 0.02, 'z'),
        mats.siliconTsvDram
      );
      bank.position.set(dx, 0, 0.24);
      g.add(bank);
    }
    const dmaBridge = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.55, 0.14), mats.goldPlating);
    dmaBridge.position.set(0, -1.65, 0.25);
    dmaBridge.userData.noEdges = true;
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
    const arrGeo = createChamferedBoxGeo(11.2, 7.8, 0.24, 0.22, 0.03, 'z');
    applyPlanarUVs(arrGeo, 11.2, 7.8, 'xy');
    const arrayWafer = new THREE.Mesh(arrGeo, u.bionzDieFloorplan);
    arrayWafer.position.z = 0.28;

    const cmosGeo = createChamferedBoxGeo(11.2, 7.8, 0.24, 0.22, 0.03, 'z');
    applyPlanarUVs(cmosGeo, 11.2, 7.8, 'xy');
    const cmosWafer = new THREE.Mesh(cmosGeo, u.bionzCetusDie);
    cmosWafer.position.z = -0.28;
    g.add(arrayWafer, cmosWafer);

    // 7×5 high-density Cu-Cu face-to-face hybrid bonding pad matrix!
    const padGeo = hiResCyl(0.32, 0.32, 0.36, 14).rotateX(Math.PI / 2);
    const padInst = new THREE.InstancedMesh(padGeo, mats.copperHybridBond, 35);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 7; c++) {
        dm.position.set(-4.5 + c * 1.5, -2.6 + r * 1.3, 0);
        dm.updateMatrix();
        padInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    padInst.instanceMatrix.needsUpdate = true;
    padInst.userData.noEdges = true;
    g.add(padInst);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-cba-cu-hybrid-bond',
        54,
        '#d97706',
        g,
        new THREE.Vector3(0, 14.5, 1.24),
        new THREE.Vector3(-52, 74, 58),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C55. Crossed Bit Line (CBL) & CMOS-under-Array (CuA) Peripheral Floor
  // =========================================================================
  {
    const g = new THREE.Group();
    const cuaGeo = createChamferedBoxGeo(11.4, 7.8, 0.24, 0.2, 0.03, 'z');
    applyPlanarUVs(cuaGeo, 11.4, 7.8, 'xy');
    const cuaFloor = new THREE.Mesh(cuaGeo, u.bionzIpDieTile);
    for (let i = -3; i <= 3; i++) {
      const blX = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.22, 0.1), mats.copperCoil);
      blX.position.set(0, i * 1.05, 0.16);
      blX.userData.noEdges = true;
      g.add(blX);
    }
    for (let j = -2; j <= 2; j++) {
      const blY = new THREE.Mesh(new THREE.BoxGeometry(0.22, 7.2, 0.1), mats.goldPlating);
      blY.position.set(j * 2.2, 0, 0.26);
      blY.userData.noEdges = true;
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
    // Smooth 36-segment concentric atomic cutaway walls of a 3D NAND Charge-Trap cell!
    const polyChannel = new THREE.Mesh(hiResCyl(1.15, 1.15, 1.1, 36), mats.gatePolysilicon);
    const tunnelOx = new THREE.Mesh(hiResCyl(1.75, 1.75, 0.96, 36, true, 0, Math.PI * 1.5), mats.ftiOxide);
    const nitrideTrap = new THREE.Mesh(hiResCyl(2.45, 2.45, 0.82, 36, true, 0, Math.PI * 1.3), mats.loficDielectric);
    const aluminaBlock = new THREE.Mesh(hiResCyl(3.15, 3.15, 0.68, 36, true, 0, Math.PI * 1.1), mats.aluminaHighKFilm);
    // Outer tungsten control-gate collar ring
    const gateCollar = new THREE.Mesh(hiResTorus(3.48, 0.18, 12, 34, Math.PI * 1.0), mats.tungstenGrid);
    gateCollar.rotation.x = Math.PI / 2;
    gateCollar.userData.noEdges = true;
    tilt.add(polyChannel, tunnelOx, nitrideTrap, aluminaBlock, gateCollar);
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
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C57. Tungsten / Molybdenum Wordline Staircase Decoder Contact Structure
  // =========================================================================
  {
    const g = new THREE.Group();
    // 8-tier Mayan-pyramid tungsten/molybdenum wordline staircase + gold vertical contact pillars!
    for (let step = 0; step < 8; step++) {
      const w = 11.2 - step * 1.12;
      const deck = new THREE.Mesh(
        createChamferedBoxGeo(w, 6.2, 0.1, 0.12, 0.02, 'z'),
        step % 2 === 0 ? mats.tungstenGrid : mats.tungstenCopper
      );
      deck.position.set(-step * 0.56, 0, -0.42 + step * 0.11);
      g.add(deck);
      const pillarH = 1.05 - step * 0.11;
      const pillar = new THREE.Mesh(hiResCyl(0.19, 0.19, pillarH, 12).rotateX(Math.PI / 2), mats.goldPlating);
      pillar.position.set(
        w * 0.5 - step * 0.56 - 0.42,
        -1.7 + (step % 4) * 1.15,
        -0.42 + step * 0.11 + pillarH * 0.5
      );
      pillar.userData.noEdges = true;
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
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C58. On-Die High-Voltage Charge Pump (20 V ISPP Pulse Generator)
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(8.8, 4.6, 0.22, 0.18, 0.03, 'z');
    applyPlanarUVs(baseGeo, 8.8, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzIpDieTile);
    g.add(base);
    for (let st = 0; st < 5; st++) {
      const h = 0.22 + st * 0.085;
      const stageCap = new THREE.Mesh(
        createChamferedBoxGeo(1.18, 3.2, h, 0.14, 0.03, 'z'),
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
    const baseGeo = createChamferedBoxGeo(9.2, 4.4, 0.22, 0.18, 0.03, 'z');
    applyPlanarUVs(baseGeo, 9.2, 4.4, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzIpDieTile);
    g.add(base);
    for (let lv = 0; lv < 8; lv++) {
      const barH = 0.16 + lv * 0.065;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.76, 2.8, barH, 0.1, 0.02, 'z'),
        lv % 2 === 0 ? mats.cfaBlue : mats.vcWorkingFluidCyan
      );
      bar.position.set(-3.5 + lv * 1.0, 0, 0.12 + barH * 0.5);
      bar.userData.noEdges = true;
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
    const scrubberBase = new THREE.Mesh(
      createChamferedBoxGeo(7.9, 5.3, 0.24, 0.24, 0.04, 'z'),
      u.icEpoxyLaser
    );
    const fadingBlock = new THREE.Mesh(
      createChamferedBoxGeo(2.25, 3.2, 0.3, 0.18, 0.04, 'z'),
      mats.tantalumCapYellow
    );
    fadingBlock.position.set(-2.2, 0, 0.24);
    const freshBlock = new THREE.Mesh(
      createChamferedBoxGeo(2.25, 3.2, 0.3, 0.18, 0.04, 'z'),
      mats.cfaGreen
    );
    freshBlock.position.set(2.2, 0, 0.24);
    const moveArc = new THREE.Mesh(hiResTorus(2.05, 0.14, 10, 26, Math.PI), mats.vcWorkingFluidCyan);
    moveArc.position.set(0, 0.2, 0.38);
    moveArc.userData.noEdges = true;
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

  // =========================================================================
  // C61. 16 GT/s PCIe Gen4 ×1 Analog SerDes PHY & CTLE/DFE Equalizer Front-End
  // =========================================================================
  {
    const g = new THREE.Group();
    const phyGeo = createChamferedBoxGeo(6.8, 4.4, 0.36, 0.18, 0.04, 'z');
    applyPlanarUVs(phyGeo, 6.8, 4.4, 'xy');
    const phyBase = new THREE.Mesh(phyGeo, u.bionzCetusDie);
    g.add(phyBase);

    // Twin on-die octagonal spiral copper peaking inductors (TX/RX 16 GT/s bandwidth extension!)
    for (const sx of [-1.8, 1.8]) {
      for (const r of [0.42, 0.78, 1.12]) {
        const coil = new THREE.Mesh(hiResTorus(r, 0.08, 8, 22), mats.rfGoldCoax);
        coil.position.set(sx, 0.35, 0.24);
        coil.userData.noEdges = true;
        g.add(coil);
      }
    }
    // 100-ohm precision differential termination bar + CDR PLL latch strip
    const termBar = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.55, 0.16), mats.goldPlating);
    termBar.position.set(0, -1.45, 0.24);
    termBar.userData.noEdges = true;
    g.add(termBar);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-pcie-gen4-serdes-phy',
        61,
        '#2563eb',
        g,
        new THREE.Vector3(-6.2, -13.6, 1.32),
        new THREE.Vector3(-42, -56, 56),
        cp
      )
    );
  }

  // =========================================================================
  // C62. ONFI / Toggle 5.0 3200 MT/s DDR 8-Channel NAND Interface Bus & DQS Bridge
  // =========================================================================
  {
    const g = new THREE.Group();
    const busCarrier = new THREE.Mesh(
      createChamferedBoxGeo(22.4, 7.6, 0.16, 0.3, 0.02, 'z'),
      u.cfeHdiPcb
    );
    g.add(busCarrier);
    // 8 matched-impedance parallel Toggle 5.0 DDR data channel buses + gold differential DQS strobe pairs
    for (let ch = 0; ch < 8; ch++) {
      const cx = -9.45 + ch * 2.7;
      const dqBus = new THREE.Mesh(new THREE.BoxGeometry(0.65, 6.8, 0.12), mats.copperCoil);
      dqBus.position.set(cx - 0.35, 0, 0.14);
      dqBus.userData.noEdges = true;
      const dqsPair = new THREE.Mesh(new THREE.BoxGeometry(0.32, 6.8, 0.14), mats.goldPlating);
      dqsPair.position.set(cx + 0.38, 0, 0.15);
      dqsPair.userData.noEdges = true;
      g.add(dqBus, dqsPair);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-toggle5-phy-bus',
        62,
        '#0ea5e9',
        g,
        new THREE.Vector3(-1.0, 2.2, 0.56),
        new THREE.Vector3(24, 34, 54),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C63. Under-Controller Stacked Copper Thermal Via Array & Embedded Copper Coin
  // =========================================================================
  {
    const g = new THREE.Group();
    // Solid pure-copper PCB-embedded thermal coin slug conducting controller heat directly to BOTH shells!
    const cuCoin = new THREE.Mesh(
      createChamferedBoxGeo(10.8, 10.8, 1.18, 0.85, 0.1, 'z'),
      mats.copperHeatSpreader
    );
    g.add(cuCoin);
    // 5×5 stacked copper-filled thermal via array penetrating cleanly through the 8-layer HDI core
    const viaGeo = hiResCyl(0.38, 0.38, 1.32, 14).rotateX(Math.PI / 2);
    const viaInst = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 25);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        dm.position.set(c * 2.0, r * 2.0, 0);
        dm.updateMatrix();
        viaInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    viaInst.instanceMatrix.needsUpdate = true;
    viaInst.userData.noEdges = true;
    g.add(viaInst);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-thermal-via-copper-slug',
        63,
        '#ea580c',
        g,
        new THREE.Vector3(-6.2, -9.0, 0),
        new THREE.Vector3(-62, -16, -54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C64. Camera Combo-Slot 21-Pin Gold Spring Wiper Block & Push-Push Eject Cam
  // =========================================================================
  {
    const g = new THREE.Group();
    // Open-front cutaway camera combo-slot cradle seated cleanly BEHIND/BELOW C05 so ALL 21 gleaming
    // staggered gold card fingers remain 100% visible in assembled view while displaying the 21 mating wipers!
    const slotBackWall = new THREE.Mesh(
      createChamferedBoxGeo(37.6, 5.4, 1.35, 0.4, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    slotBackWall.position.set(0, -0.65, -2.05);
    const slotBottomRail = new THREE.Mesh(
      createChamferedBoxGeo(38.0, 1.55, 4.4, 0.45, 0.1, 'z'),
      u.batPolycarbonateShell
    );
    slotBottomRail.position.set(0, -2.85, -0.45);
    // Left & right machined side guide cheeks framing the open front inspection window
    for (const sx of [-18.4, 18.4]) {
      const cheek = new THREE.Mesh(
        createChamferedBoxGeo(1.65, 5.2, 4.2, 0.3, 0.08, 'z'),
        mats.matteBlackAnodized
      );
      cheek.position.set(sx, -0.75, -0.45);
      g.add(cheek);
    }
    g.add(slotBackWall, slotBottomRail);

    // 21 curved phosphor-bronze / gold spring contact wipers rising cleanly from the bottom rail to mate C05
    for (let pin = 0; pin < 21; pin++) {
      const px = -15.0 + pin * 1.5;
      const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.62, 3.3, 0.22), mats.goldPlating);
      wiper.position.set(px, -0.85, -0.92);
      wiper.rotation.x = 0.22;
      wiper.userData.noEdges = true;
      // Front gleaming solder-tail contact tip peeking cleanly beneath the card edge
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.55, 1.25), mats.goldPlating);
      tail.position.set(px, -2.15, 0.55);
      tail.userData.noEdges = true;
      g.add(wiper, tail);
    }

    // Compact stainless heart-cam push-push card-eject latch & helical spring tucked neatly at connector side
    const latchArm = new THREE.Mesh(
      createChamferedBoxGeo(1.4, 8.2, 1.45, 0.28, 0.06, 'z'),
      mats.stainlessMachined
    );
    latchArm.position.set(19.25, 1.2, -0.45);
    const latchHook = new THREE.Mesh(
      createChamferedBoxGeo(1.5, 1.85, 1.55, 0.24, 0.06, 'z'),
      mats.titaniumRivet
    );
    latchHook.position.set(18.75, 4.9, -0.45);
    for (let i = 0; i < 5; i++) {
      const coil = new THREE.Mesh(hiResTorus(0.56, 0.12, 8, 16), mats.silverElectrode);
      coil.rotation.x = Math.PI / 2;
      coil.position.set(19.25, -2.0 + i * 0.62, -0.45);
      coil.userData.noEdges = true;
      g.add(coil);
    }
    g.add(latchArm, latchHook);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-slot-contact-wiper-interface',
        64,
        '#eab308',
        g,
        new THREE.Vector3(0, -29.2, 0),
        new THREE.Vector3(0, -88, 26),
        cp
      )
    );
  }

  // =========================================================================
  // C65. 100 MHz HCSL PCIe Reference Clock Differential Pair & 50-Ohm Termination
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin matched-length 100 MHz HCSL differential serpentine lines + pair of 49.9-ohm thin-film terminators
    for (const [dx, mat] of [
      [-0.55, mats.goldPlating],
      [0.55, mats.copperCoil],
    ] as Array<[number, THREE.Material]>) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(0.26, 6.2, 0.1), mat);
      trace.position.set(dx, 0, 0.06);
      trace.userData.noEdges = true;
      g.add(trace);

      const termRes = buildSmdPassive(1.35, 0.7, 0.44, mats.mountShimBlue, mats.silverElectrode, 'z');
      termRes.position.set(dx * 2.2, 2.35, 0.24);
      const acCap = buildSmdPassive(1.15, 0.62, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
      acCap.position.set(dx * 2.2, -2.35, 0.24);
      g.add(termRes, acCap);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-pcie-refclk-diff-term',
        65,
        '#facc15',
        g,
        new THREE.Vector3(6.4, -20.2, 0.62),
        new THREE.Vector3(66, -66, 36),
        cp
      )
    );
  }

  // =========================================================================
  // C66. Multi-Rail Core 0.85V / NAND 1.8V / VCCQ 1.2V PoL Buck Filter Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    // 2-oz local copper power island plate + 3 independent Pi-filter LC filter rails on rear PCB
    const cuIsland = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 5.4, 0.14, 0.3, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    g.add(cuIsland);
    for (let r = 0; r < 3; r++) {
      const ry = -1.7 + r * 1.7;
      const bead = buildSmdPassive(1.85, 0.92, 0.62, mats.ferriteInductor, mats.silverElectrode, 'z');
      bead.rotation.y = Math.PI;
      bead.position.set(-1.95, ry, -0.34);
      const mlcc1 = buildSmdPassive(1.25, 0.68, 0.54, mats.smdCeramic, mats.silverElectrode, 'z');
      mlcc1.rotation.y = Math.PI;
      mlcc1.position.set(0.55, ry, -0.3);
      const mlcc2 = buildSmdPassive(1.25, 0.68, 0.54, mats.smdCeramic, mats.silverElectrode, 'z');
      mlcc2.rotation.y = Math.PI;
      mlcc2.position.set(2.35, ry, -0.3);
      g.add(bead, mlcc1, mlcc2);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-vcore-ldo-buck-rails',
        66,
        '#ea580c',
        g,
        new THREE.Vector3(11.6, -4.4, -0.82),
        new THREE.Vector3(78, -8, -42),
        cp
      )
    );
  }

  // =========================================================================
  // C67. 16-Die Chip-Enable (CE#) & Ready/Busy (R/B#) Interleave Arbiter Matrix
  // =========================================================================
  {
    const g = new THREE.Group();
    const matrixBase = new THREE.Mesh(
      createChamferedBoxGeo(9.4, 4.4, 0.22, 0.2, 0.03, 'z'),
      u.bionzIpDieTile
    );
    g.add(matrixBase);
    // 8 dual-sided CE# chip-select gold bus lanes + R/B# arbiter status pips
    for (let i = 0; i < 8; i++) {
      const lx = -3.85 + i * 1.1;
      const lane = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 3.4, 0.14),
        i % 2 === 0 ? mats.goldPlating : mats.vcWorkingFluidCyan
      );
      lane.position.set(lx, 0, 0.18);
      lane.userData.noEdges = true;
      g.add(lane);
    }
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-nand-ce-rb-mux',
        67,
        '#0ea5e9',
        g,
        new THREE.Vector3(8.2, 3.8, 0.72),
        new THREE.Vector3(74, 24, 34),
        cp
      )
    );
  }

  // =========================================================================
  // C68. Controller-to-Backplate Conductive Elastomer Thermal Gap Filler Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Compliant alumina-filled silicone gap filler pad bridging copper coin slug C63 to SUS backplate C02!
    const gapPad = new THREE.Mesh(
      createChamferedBoxGeo(11.8, 11.8, 0.42, 0.7, 0.08, 'z'),
      mats.thermalPadPink
    );
    g.add(gapPad);
    // Embedded alumina thermal micro-spheres glinting cleanly across pad face
    const sphGeo = hiResSphere(0.24, 8, 6);
    const sphInst = new THREE.InstancedMesh(sphGeo, mats.ceramicAlumina, 16);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        dm.position.set(-3.6 + c * 2.4, -3.6 + r * 2.4, -0.2);
        dm.updateMatrix();
        sphInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    sphInst.instanceMatrix.needsUpdate = true;
    sphInst.userData.noEdges = true;
    g.add(sphInst);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-thermal-paste-underfill',
        68,
        '#f472b6',
        g,
        new THREE.Vector3(-6.2, -9.0, -1.62),
        new THREE.Vector3(-48, -28, -58),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C69. Hot-Plug Card-Detect (INS# Pin 12) Debounce RC & Power-Good Supervisor
  // =========================================================================
  {
    const g = new THREE.Group();
    const supIc = buildChipPackage({
      w: 2.35,
      d: 1.85,
      h: 0.62,
      style: 'sot23',
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.cfaGreen,
      axis: 'z',
    });
    const pullup = buildSmdPassive(1.25, 0.65, 0.44, mats.matteBlackAnodized, mats.goldPlating, 'z');
    pullup.position.set(-2.2, 0, -0.06);
    const debCap = buildSmdPassive(1.25, 0.65, 0.44, mats.smdCeramic, mats.silverElectrode, 'z');
    debCap.position.set(2.2, 0, -0.06);
    g.add(supIc, pullup, debCap);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-card-detect-pullup-ins',
        69,
        '#22c55e',
        g,
        new THREE.Vector3(1.5, -20.8, 0.72),
        new THREE.Vector3(16, -74, 42),
        cp
      )
    );
  }

  // =========================================================================
  // C70. On-Die Internal NAND Die-Level XOR RAID Parity & Spare-Pool Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const raidGeo = createChamferedBoxGeo(5.8, 4.4, 0.38, 0.18, 0.04, 'z');
    applyPlanarUVs(raidGeo, 5.8, 4.4, 'xy');
    const raidBase = new THREE.Mesh(raidGeo, u.bionzCetusDie);
    g.add(raidBase);
    // 4 NAND data stripe bars converging into central golden XOR parity core + emerald spare pool!
    for (let i = 0; i < 4; i++) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.48, 0.16), mats.copperHybridBond);
      stripe.position.set(-1.65, -1.2 + i * 0.8, 0.24);
      stripe.userData.noEdges = true;
      g.add(stripe);
    }
    const xorCore = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 1.85, 0.22, 0.16, 0.03, 'z'),
      mats.goldPlating
    );
    xorCore.position.set(1.25, 0.75, 0.26);
    const sparePool = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 1.2, 0.2, 0.14, 0.03, 'z'),
      mats.cfaGreen
    );
    sparePool.position.set(1.25, -1.05, 0.25);
    g.add(xorCore, sparePool);
    parts.push(
      finalizeCfexpressUltra27Part(
        'cfe-raid-xor-parity-engine',
        70,
        '#8b5cf6',
        g,
        new THREE.Vector3(-9.6, -6.2, 1.32),
        new THREE.Vector3(-82, 4, 54),
        cp
      )
    );
  }

  return parts;
}
