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

function finalizeSensorNextGenPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  options?: { ibisMovable?: boolean; ultrasonicElement?: boolean; edgeOpacity?: number }
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, options?.edgeOpacity ?? 0.24);

  return {
    id,
    subsystem: 'sensor',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    ibisMovable: options?.ibisMovable ?? false,
    ultrasonicElement: options?.ultrasonicElement ?? false,
    standaloneOnly: true,
  };
}

/**
 * Phase 25A — 20 Standalone-Only Next-Gen Full-Frame Sensor, Optical Stack & 5-Axis IBIS Parts (S71–S90 -> 90 total).
 * Rendered ONLY in standalone 'sensor' mode; omitted completely in whole-camera views (0 startup overhead).
 */
export function buildSensorNextGenParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // S71. Liquid-Crystal Electronic Variable ND Filter (e-ND: 1/4–1/128)
  // =========================================================================
  {
    const g = new THREE.Group();
    const outerFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(44.2, 32.0, 2.0, 38.0, 26.0, 0.9), 1.05, 0.05, 0.05, 12),
      mats.matteBlackAnodized
    );
    const lcCellPane = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(38.4, 26.4, 0.8), 0.42, 0.02, 0.02, 10),
      mats.lcdPolarizerFilm
    );
    const itoBusTop = new THREE.Mesh(new THREE.BoxGeometry(36.0, 0.75, 0.56), mats.goldPlating);
    itoBusTop.position.set(0, 13.6, 0.15);
    const itoBusBot = new THREE.Mesh(new THREE.BoxGeometry(36.0, 0.75, 0.56), mats.goldPlating);
    itoBusBot.position.set(0, -13.6, 0.15);
    const driveFlex = new THREE.Mesh(new THREE.BoxGeometry(5.6, 9.2, 0.22), mats.polyimideFpc);
    driveFlex.position.set(24.0, -7.5, -0.15);
    g.add(outerFrame, lcCellPane, itoBusTop, itoBusBot, driveFlex);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-electronic-vnd',
        71,
        '#4f46e5',
        g,
        new THREE.Vector3(0, 0, 8.8),
        new THREE.Vector3(0, 56, 114),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S72. Partially-Stacked Top/Bottom High-Speed Readout Strips & DGO Output
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sy of [-1, 1]) {
      const stripDie = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(37.4, 3.8, 0.35), 0.48, 0.03, 0.03, 8),
        mats.siliconLogicLayer
      );
      stripDie.position.set(0, sy * 14.3, 0);
      const dgoBus = new THREE.Mesh(new THREE.BoxGeometry(35.2, 0.95, 0.58), mats.copperHybridBond);
      dgoBus.position.set(0, sy * 12.9, 0.12);
      g.add(stripDie, dgoBus);
      for (let i = -3; i <= 3; i++) {
        const adcTile = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.8, 0.54), mats.goldPlating);
        adcTile.position.set(i * 4.8, sy * 14.6, 0.14);
        g.add(adcTile);
      }
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-partially-stacked-strips',
        72,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, -0.35),
        new THREE.Vector3(76, 46, 18),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S73. Curved Full-Frame CMOS Silicon Substrate & Concave Forming Carrier
  // =========================================================================
  {
    const g = new THREE.Group();
    // Gentle concave curved silicon ribbon profile (arch along X, mimicking human retina)
    const curveShape = new THREE.Shape();
    const halfW = 18.2;
    const sag = 1.65;
    curveShape.moveTo(-halfW, sag);
    curveShape.quadraticCurveTo(0, -sag * 0.45, halfW, sag);
    curveShape.lineTo(halfW, sag - 0.52);
    curveShape.quadraticCurveTo(0, -sag * 0.45 - 0.52, -halfW, sag - 0.52);
    curveShape.closePath();

    const curvedDieGeo = new THREE.ExtrudeGeometry(curveShape, {
      depth: 24.4,
      bevelEnabled: false,
      curveSegments: 24,
    });
    curvedDieGeo.translate(0, 0, -12.2);
    curvedDieGeo.rotateX(Math.PI / 2);
    const curvedDie = new THREE.Mesh(curvedDieGeo, mats.siliconSensorDie);
    curvedDie.position.z = 0.25;

    // Concave machined ceramic spherical forming bed behind the thinned silicon
    const bedShape = new THREE.Shape();
    bedShape.moveTo(-19.8, sag - 0.52);
    bedShape.quadraticCurveTo(0, -sag * 0.45 - 0.52, 19.8, sag - 0.52);
    bedShape.lineTo(19.8, -1.65);
    bedShape.lineTo(-19.8, -1.65);
    bedShape.closePath();
    const bedGeo = new THREE.ExtrudeGeometry(bedShape, {
      depth: 26.8,
      bevelEnabled: false,
      curveSegments: 24,
    });
    bedGeo.translate(0, 0, -13.4);
    bedGeo.rotateX(Math.PI / 2);
    const ceramicBed = new THREE.Mesh(bedGeo, mats.ceramicAlumina);
    g.add(curvedDie, ceramicBed);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-curved-substrate',
        73,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, -0.95),
        new THREE.Vector3(-82, 46, 12),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S74. Sony OEM Flange-Back Selection Shim Washers (IM ADJUST WASHER D, Ref.456)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bossCoords: Array<[number, number]> = [
      [-31.5, 22.0],
      [31.5, 22.0],
      [0.0, -24.5],
    ];
    const shimMats = [mats.mountShimBlue, mats.stainlessMachined, mats.brassGear];
    for (const [bx, by] of bossCoords) {
      for (let k = 0; k < 3; k++) {
        const washer = new THREE.Mesh(
          extrudeCentered(createFrameShape(8.0, 8.0, 4.0, 4.1, 4.1, 2.05), 0.26, 0.02, 0.02, 16),
          shimMats[k]
        );
        washer.position.set(bx, by, (k - 1) * 0.34);
        g.add(washer);
      }
      const tab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.4, 0.25), mats.mountShimBlue);
      tab.position.set(bx + 4.4, by, 0);
      g.add(tab);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-im-adjust-washers',
        74,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, -8.9),
        new THREE.Vector3(-88, -32, -158),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S75. Dedicated Mechanical Sensor-Protect Dust Shield Curtain
  // =========================================================================
  {
    const g = new THREE.Group();
    const shieldFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(47.0, 34.4, 2.2, 38.6, 26.2, 0.8), 1.15, 0.06, 0.06, 12),
      mats.shutterChassis
    );
    // Twin matte dust-shield curtain blades slightly parted in cutaway position
    const topBlade = new THREE.Mesh(new THREE.BoxGeometry(38.2, 10.6, 0.28), mats.shutterShieldBlade);
    topBlade.position.set(0, 7.6, 0.15);
    const botBlade = new THREE.Mesh(new THREE.BoxGeometry(38.2, 10.6, 0.28), mats.carbonFiberBlade);
    botBlade.position.set(0, -7.6, -0.15);
    // Side micro-solenoid drive bar + linkage pin
    const actuator = new THREE.Mesh(new THREE.BoxGeometry(3.8, 16.5, 2.2), mats.copperCoil);
    actuator.position.set(22.2, 0, -0.2);
    const linkBar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 22.0, 0.45), mats.stainlessMachined);
    linkBar.position.set(20.1, 0, 0.4);
    g.add(shieldFrame, topBlade, botBlade, actuator, linkBar);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-mechanical-dust-shield',
        75,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 10.2),
        new THREE.Vector3(0, -58, 128),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S76. 2× Wide-Stroke Roll IBIS & Halbach Dual-Polarity VCM Magnet Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 Halbach 3-segment flux-focusing bars (left, right, bottom) for 2× roll range
    const positions: Array<{ x: number; y: number; rotZ: number }> = [
      { x: -33.2, y: 0, rotZ: Math.PI / 2 },
      { x: 33.2, y: 0, rotZ: Math.PI / 2 },
      { x: 0, y: -23.8, rotZ: 0 },
    ];
    for (const p of positions) {
      const sub = new THREE.Group();
      sub.position.set(p.x, p.y, 0);
      sub.rotation.z = p.rotZ;
      const segL = new THREE.Mesh(new THREE.BoxGeometry(7.2, 5.2, 2.0), mats.neodymiumMagnet);
      segL.position.x = -7.6;
      const segMid = new THREE.Mesh(new THREE.BoxGeometry(7.0, 5.2, 2.0), mats.cinnabarAnodized);
      const segR = new THREE.Mesh(new THREE.BoxGeometry(7.2, 5.2, 2.0), mats.neodymiumMagnet);
      segR.position.x = 7.6;
      const backPlate = new THREE.Mesh(new THREE.BoxGeometry(23.2, 5.8, 0.65), mats.softIronYoke);
      backPlate.position.z = -1.25;
      sub.add(segL, segMid, segR, backPlate);
      g.add(sub);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-double-roll-halbach',
        76,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, -7.2),
        new THREE.Vector3(92, -36, -112),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S77. Pixel-Shift Multi-Shot Sub-Micron Optical Linear Scale (0.5-Pixel)
  // =========================================================================
  {
    const g = new THREE.Group();
    // X-axis Invar micrometer scale bar + readhead
    const xScale = new THREE.Mesh(new THREE.BoxGeometry(26.0, 2.4, 0.55), mats.invarScaleBar);
    xScale.position.set(0, 21.8, 0);
    const xRead = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.4, 1.4), mats.icEpoxy);
    xRead.position.set(4.0, 21.8, 0.85);
    // Y-axis Invar micrometer scale bar + readhead
    const yScale = new THREE.Mesh(new THREE.BoxGeometry(2.4, 20.0, 0.55), mats.invarScaleBar);
    yScale.position.set(-28.6, 0, 0);
    const yRead = new THREE.Mesh(new THREE.BoxGeometry(3.4, 4.4, 1.4), mats.icEpoxy);
    yRead.position.set(-28.6, 3.0, 0.85);
    // Fine grating gold index ticks
    for (let i = -5; i <= 5; i++) {
      const tickX = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.6, 0.62), mats.goldPlating);
      tickX.position.set(i * 2.1, 21.8, 0.05);
      g.add(tickX);
    }
    g.add(xScale, xRead, yScale, yRead);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-pixelshift-submicron-scale',
        77,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, -5.6),
        new THREE.Vector3(-90, 56, -72),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S78. Optical Filter Edge Blackening (Sumi-nuri) & 45° Bevel Stray-Light Trap
  // =========================================================================
  {
    const g = new THREE.Group();
    const sumiRim = new THREE.Mesh(
      extrudeCentered(createFrameShape(39.4, 27.4, 0.9, 37.6, 25.6, 0.7), 1.9, 0.14, 0.14, 12),
      mats.velvetFlockTrap
    );
    const chamferRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(38.2, 26.2, 0.8, 36.8, 24.8, 0.65), 0.35, 0.06, 0.06, 10),
      mats.matteBlackAnodized
    );
    chamferRing.position.z = 0.88;
    g.add(sumiRim, chamferRing);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-filter-edge-sumi',
        78,
        '#1f2937',
        g,
        new THREE.Vector3(0, 0, 3.55),
        new THREE.Vector3(-84, -46, 56),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S79. SSWF Outermost Super-Hydrophobic Fluorine + Anti-Static Multi-AR Coat
  // =========================================================================
  {
    const g = new THREE.Group();
    const fluorinePane = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(39.2, 27.2, 0.9), 0.18, 0.02, 0.02, 10),
      mats.fluorineCoatCyan
    );
    const esdBorder = new THREE.Mesh(
      extrudeCentered(createFrameShape(40.2, 28.2, 1.0, 38.6, 26.6, 0.8), 0.24, 0.02, 0.02, 10),
      mats.silverElectrode
    );
    g.add(fluorinePane, esdBorder);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-sswf-fluorine-ar',
        79,
        '#22d3ee',
        g,
        new THREE.Vector3(0, 0, 7.35),
        new THREE.Vector3(82, 46, 98),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S80. Wire-Bond Black Epoxy Dam-and-Fill Encapsulation & Stepped Light-Baffle
  // =========================================================================
  {
    const g = new THREE.Group();
    const damCollar = new THREE.Mesh(
      extrudeCentered(createFrameShape(43.4, 31.4, 1.4, 37.2, 25.2, 0.6), 1.05, 0.12, 0.12, 12),
      mats.icEpoxy
    );
    const innerBevel = new THREE.Mesh(
      extrudeCentered(createFrameShape(38.0, 26.0, 0.7, 36.4, 24.4, 0.5), 0.45, 0.08, 0.08, 10),
      mats.velvetFlockTrap
    );
    innerBevel.position.z = 0.45;
    g.add(damCollar, innerBevel);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-wirebond-dam-baffle',
        80,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 0.55),
        new THREE.Vector3(-82, 10, 34),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S81. On-Sensor Low-Jitter TCXO Crystal Oscillator & Genlock Clock Tree
  // =========================================================================
  {
    const g = new THREE.Group();
    const subPcb = new THREE.Mesh(new THREE.BoxGeometry(11.6, 5.4, 0.55), mats.hdiMainboardPcb);
    const tcxoCan = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.2, 1.15), mats.goldPlating);
    tcxoCan.position.set(-2.6, 0, -0.75);
    const pllIc = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.4, 0.75), mats.icEpoxy);
    pllIc.position.set(2.4, 0, -0.58);
    const clkTrace1 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.32, 0.15), mats.copperCoil);
    clkTrace1.position.set(0.0, 0.6, -0.32);
    const clkTrace2 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.32, 0.15), mats.copperCoil);
    clkTrace2.position.set(0.0, -0.6, -0.32);
    g.add(subPcb, tcxoCan, pllIc, clkTrace1, clkTrace2);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-tcxo-clock-tree',
        81,
        '#eab308',
        g,
        new THREE.Vector3(-12.5, 16.2, -3.35),
        new THREE.Vector3(-64, 72, -34),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S82. Cross-Roller & Parallel-Flexure High-Rigidity IBIS Linear Guide Unit
  // =========================================================================
  {
    const g = new THREE.Group();
    // Top & bottom stainless cross-roller rails + beryllium-copper parallel flexure leaves
    for (const sy of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(36.0, 2.4, 1.8), mats.stainlessMachined);
      rail.position.set(0, sy * 25.2, 0);
      g.add(rail);
      for (let i = -3; i <= 3; i++) {
        const roller = new THREE.Mesh(
          new THREE.CylinderGeometry(0.65, 0.65, 1.35, 10),
          mats.siliconNitrideBall
        );
        roller.rotation.x = i % 2 === 0 ? Math.PI / 4 : -Math.PI / 4;
        roller.position.set(i * 4.5, sy * 25.2, 0.5);
        g.add(roller);
      }
      const flexure = new THREE.Mesh(new THREE.BoxGeometry(30.0, 1.2, 0.28), mats.beCuSpring);
      flexure.position.set(0, sy * 23.2, -0.55);
      g.add(flexure);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-cross-roller-guide',
        82,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -6.0),
        new THREE.Vector3(88, 60, -86),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S83. Peltier Thermoelectric Cooler (TEC) & Anti-Dew Cold-Finger Module
  // =========================================================================
  {
    const g = new THREE.Group();
    const coldPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(28.0, 20.0, 1.2), 0.55, 0.04, 0.04, 10),
      mats.ceramicAlumina
    );
    coldPlate.position.z = 1.25;
    const hotPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(28.0, 20.0, 1.2), 0.55, 0.04, 0.04, 10),
      mats.ceramicAlumina
    );
    hotPlate.position.z = -1.25;
    // Grid of Bi2Te3 P/N thermoelectric semiconductor pillars
    const pillarGeo = new THREE.BoxGeometry(1.5, 1.5, 1.9);
    const pMat = mats.siliconLogicLayer;
    const nMat = mats.copperHeatSpreader;
    for (let ix = -4; ix <= 4; ix++) {
      for (let iy = -3; iy <= 3; iy++) {
        const pil = new THREE.Mesh(pillarGeo, (ix + iy) % 2 === 0 ? pMat : nMat);
        pil.position.set(ix * 2.8, iy * 2.6, 0);
        g.add(pil);
      }
    }
    const coldFinger = new THREE.Mesh(new THREE.BoxGeometry(10.0, 28.0, 0.75), mats.vaporChamberCopper);
    coldFinger.position.set(16.0, 0, -1.7);
    const leads = new THREE.Mesh(new THREE.BoxGeometry(4.5, 9.0, 0.3), mats.polyimideFpc);
    leads.position.set(-15.5, -6.0, -0.5);
    g.add(coldPlate, hotPlate, coldFinger, leads);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-peltier-tec-cooler',
        83,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, -12.2),
        new THREE.Vector3(0, -68, -182),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S84. Wafer-Edge Optical Fiducial Marks & 6-Axis Laser Alignment Targets
  // =========================================================================
  {
    const g = new THREE.Group();
    const corners: Array<[number, number]> = [
      [-19.2, 13.2],
      [19.2, 13.2],
      [-19.2, -13.2],
      [19.2, -13.2],
    ];
    for (const [cx, cy] of corners) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 0.24), mats.matteBlackAnodized);
      pad.position.set(cx, cy, 0);
      const crossH = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.42, 0.34), mats.goldPlating);
      crossH.position.set(cx, cy, 0.08);
      const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.42, 2.4, 0.34), mats.goldPlating);
      crossV.position.set(cx, cy, 0.08);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.15, 0.14, 8, 20),
        mats.silverElectrode
      );
      ring.position.set(cx, cy, 0.12);
      g.add(pad, crossH, crossV, ring);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-die-fiducial-targets',
        84,
        '#facc15',
        g,
        new THREE.Vector3(0, 0, 0.18),
        new THREE.Vector3(82, -14, 24),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S85. IBIS-Carrier-Mounted Ultra-Compact MEMS/Piezo Accelerometer
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrierPcb = new THREE.Mesh(new THREE.BoxGeometry(9.4, 6.2, 0.55), mats.sensorPcb);
    const memsLid = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.6, 1.15), mats.silverElectrode);
    memsLid.position.set(-1.6, 0, -0.72);
    const ampIc = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.8, 0.65), mats.icEpoxy);
    ampIc.position.set(2.4, 0.5, -0.52);
    const flexTail = new THREE.Mesh(new THREE.BoxGeometry(3.2, 7.2, 0.2), mats.polyimideFpc);
    flexTail.position.set(0, -6.2, -0.2);
    g.add(carrierPcb, memsLid, ampIc, flexTail);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-carrier-piezo-accel',
        85,
        '#f43f5e',
        g,
        new THREE.Vector3(19.5, 14.8, -4.9),
        new THREE.Vector3(74, 64, -56),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S86. Dual-Edge 16-Lane SLVS-EC v3.0 Interposer & Common-Mode Choke Array
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const side of [-1, 1]) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(4.4, 25.0, 0.65), mats.hdiMainboardPcb);
      strip.position.set(side * 25.6, 0, 0);
      const padBar = new THREE.Mesh(new THREE.BoxGeometry(1.4, 22.8, 0.78), mats.goldPlating);
      padBar.position.set(side * 24.4, 0, 0.08);
      g.add(strip, padBar);
      for (let i = 0; i < 8; i++) {
        const cy = -9.8 + i * 2.8;
        const choke = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.5, 0.85), mats.ferriteInductor);
        choke.position.set(side * 26.5, cy, -0.48);
        g.add(choke);
      }
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-dual-edge-slvs16',
        86,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0, -2.85),
        new THREE.Vector3(96, 12, -32),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S87. Ceramic Substrate Copper Thermal-Via Array & Nano-Silver Die-Attach
  // =========================================================================
  {
    const g = new THREE.Group();
    const nanoSilverLayer = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(36.8, 24.8, 0.6), 0.26, 0.02, 0.02, 8),
      mats.sinteredSilver
    );
    nanoSilverLayer.position.z = 0.55;
    // Dense array of solid copper thermal vias penetrating the ceramic package
    const viaGeo = new THREE.CylinderGeometry(0.45, 0.45, 1.25, 8);
    viaGeo.rotateX(Math.PI / 2);
    for (let ix = -6; ix <= 6; ix++) {
      for (let iy = -4; iy <= 4; iy++) {
        if ((ix + iy) % 2 !== 0) continue;
        const via = new THREE.Mesh(viaGeo, mats.copperHeatSpreader);
        via.position.set(ix * 2.6, iy * 2.6, -0.15);
        g.add(via);
      }
    }
    const baseRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(38.0, 26.0, 0.8, 35.6, 23.6, 0.5), 0.45, 0.02, 0.02, 10),
      mats.copperHeatSpreader
    );
    baseRing.position.z = -0.58;
    g.add(nanoSilverLayer, baseRing);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-thermal-via-dieattach',
        87,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -1.35),
        new THREE.Vector3(-92, -16, -24),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S88. Power-Off Magnetic Detent & Freefall Emergency Electromagnetic Brake
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const side of [-1, 1]) {
      const brakeCoil = new THREE.Mesh(new THREE.BoxGeometry(5.6, 8.8, 2.4), mats.copperCoil);
      brakeCoil.position.set(side * 36.2, -12.5, 0);
      const ironHook = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.2, 2.0), mats.pureIronArmature);
      ironHook.position.set(side * 33.4, -12.5, 0.6);
      const butylTooth = new THREE.Mesh(new THREE.BoxGeometry(1.8, 5.4, 2.2), mats.butylDamperRubber);
      butylTooth.position.set(side * 31.2, -12.5, 0.8);
      g.add(brakeCoil, ironHook, butylTooth);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-freefall-ibis-brake',
        88,
        '#e11d48',
        g,
        new THREE.Vector3(0, 0, -7.9),
        new THREE.Vector3(-96, -54, -120),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S89. Ultra-Low-Alpha (ULA) Cover Glass & Soft-Error Ceramic Shield Collar
  // =========================================================================
  {
    const g = new THREE.Group();
    const ulaGlass = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(38.4, 26.4, 0.7), 0.34, 0.02, 0.02, 10),
      mats.coverGlass
    );
    const aluminaCollar = new THREE.Mesh(
      extrudeCentered(createFrameShape(42.2, 30.2, 1.2, 38.4, 26.4, 0.7), 1.05, 0.05, 0.05, 12),
      mats.ceramicAlumina
    );
    aluminaCollar.position.z = -0.15;
    g.add(ulaGlass, aluminaCollar);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-low-alpha-mold',
        89,
        '#a855f7',
        g,
        new THREE.Vector3(0, 0, 1.75),
        new THREE.Vector3(88, -42, 42),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S90. Imaging-Chamber Velvet-Flocked Labyrinth Frame & Silicone Isolators
  // =========================================================================
  {
    const g = new THREE.Group();
    const outerLabyrinth = new THREE.Mesh(
      extrudeCentered(createFrameShape(49.4, 36.8, 2.6, 39.2, 27.0, 1.0), 1.45, 0.08, 0.08, 12),
      mats.velvetFlockTrap
    );
    const innerStep = new THREE.Mesh(
      extrudeCentered(createFrameShape(42.0, 29.8, 1.4, 38.0, 25.8, 0.8), 0.65, 0.05, 0.05, 10),
      mats.mountVelvetBaffle
    );
    innerStep.position.z = -0.6;
    g.add(outerLabyrinth, innerStep);

    // 4 corner orange/butyl silicone vibration-isolator grommet rings
    for (const [gx, gy] of [
      [-21.8, 15.6],
      [21.8, 15.6],
      [-21.8, -15.6],
      [21.8, -15.6],
    ]) {
      const grommet = new THREE.Mesh(
        new THREE.TorusGeometry(1.9, 0.62, 10, 20),
        mats.cinnabarAnodized
      );
      grommet.position.set(gx, gy, -0.35);
      g.add(grommet);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-chamber-labyrinth-felt',
        90,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, 9.4),
        new THREE.Vector3(-76, 62, 118),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  return parts;
}
