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
import { SENSOR_MICRO_ULTRA_AUDIT_EXPLANATIONS } from './sensorMicroUltraAuditExplanations';

function finalizeSensorAuditPart(
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
    explanation: SENSOR_MICRO_ULTRA_AUDIT_EXPLANATIONS[id],
    ibisMovable: options?.ibisMovable ?? false,
    ultrasonicElement: options?.ultrasonicElement ?? false,
    standaloneOnly: true,
  };
}

function finalizeMicroAuditPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.26
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);

  return {
    id,
    subsystem: 'micro',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: SENSOR_MICRO_ULTRA_AUDIT_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Phase 19C — 6 Standalone-Only Full-Frame Sensor & 5-Axis IBIS Deep-Audit Parts (S65–S70 -> 70 total).
 * Rendered ONLY in standalone 'sensor' mode; omitted completely in whole-camera views.
 */
export function buildSensorUltraAuditParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // S65. Dual-Axis Birefringent Quartz OLPF Crystal Pair & λ/4 Depolarizer Plate
  {
    const g = new THREE.Group();
    const q1 = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(37.6, 25.6, 0.8), 0.35, 0.03, 0.03, 12),
      mats.quartzOlpf
    );
    q1.position.z = 0.45;
    const qwp = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(37.4, 25.4, 0.8), 0.14, 0.02, 0.02, 12),
      mats.nanoArIridescent
    );
    const q2 = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(37.6, 25.6, 0.8), 0.35, 0.03, 0.03, 12),
      mats.quartzOlpf
    );
    q2.position.z = -0.45;
    g.add(q1, qwp, q2);

    parts.push(
      finalizeSensorAuditPart(
        'sensor-birefringent-olpf',
        65,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 4.1),
        new THREE.Vector3(-42, 34, 82),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // S66. Dual-Mechanism IR-Cut Stack: Blue Phosphate Absorptive Glass (CM500) + 42-Layer Dichroic Coating
  {
    const g = new THREE.Group();
    const cm500 = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(37.8, 25.8, 0.8), 0.42, 0.03, 0.03, 12),
      mats.irCutGlass
    );
    const dichroicCoat = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(37.6, 25.6, 0.7), 0.08, 0.01, 0.01, 10),
      mats.fluorineCoatCyan
    );
    dichroicCoat.position.z = 0.26;
    g.add(cm500, dichroicCoat);

    parts.push(
      finalizeSensorAuditPart(
        'sensor-cm500-dichroic-ir',
        66,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 3.05),
        new THREE.Vector3(44, 32, 68),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // S67. Ultrasonic SSWF PZT Piezo Dual Fired Ag-Ni Electrode Films & Acoustic Matching Bond
  {
    const g = new THREE.Group();
    const agTop = new THREE.Mesh(new THREE.BoxGeometry(2.8, 25.2, 0.12), mats.silverElectrode);
    agTop.position.set(-20.4, 0, 0.36);
    const pztCore = new THREE.Mesh(new THREE.BoxGeometry(2.6, 25.0, 0.45), mats.pztCeramic);
    pztCore.position.set(-20.4, 0, 0);
    const bondLayer = new THREE.Mesh(new THREE.BoxGeometry(2.9, 25.4, 0.14), mats.opticalCementClear);
    bondLayer.position.set(-20.4, 0, -0.34);
    g.add(agTop, pztCore, bondLayer);

    parts.push(
      finalizeSensorAuditPart(
        'sensor-pzt-electrode-bond',
        67,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 5.25),
        new THREE.Vector3(-56, -26, 92),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.28 }
      )
    );
  }

  // S68. Hardened SUS440C / ZrO2 Ceramic-Ball Sliding Raceway Wear-Insert Plates (3x)
  {
    const g = new THREE.Group();
    const ballCoords: Array<[number, number]> = [
      [-23.5, 16.5],
      [23.5, 16.5],
      [0, -18.5],
    ];
    for (const [bx, by] of ballCoords) {
      const raceFront = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.2, 0.38, 20).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      raceFront.position.set(bx, by, 1.35);
      const raceRear = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.2, 0.38, 20).rotateX(Math.PI / 2),
        mats.ceramicAlumina
      );
      raceRear.position.set(bx, by, -1.35);
      g.add(raceFront, raceRear);
    }

    parts.push(
      finalizeSensorAuditPart(
        'sensor-sus440c-ball-races',
        68,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -6.2),
        new THREE.Vector3(56, -34, -56),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // S69. Moving-Stage Rear Slotted Ferromagnetic Flux-Return Shunt & Anti-Eddy Shield
  {
    const g = new THREE.Group();
    const shuntFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(50.0, 38.0, 2.5, 34.0, 22.0, 1.2), 0.26, 0.03, 0.03, 18),
      mats.lensPermalloyShield
    );
    // Eddy-current breaking slots etched around perimeter
    for (let i = -3; i <= 3; i++) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(0.45, 5.2, 0.32), mats.matteBlackAnodized);
      slot.position.set(i * 6.4, 15.0, 0);
      const slotB = slot.clone();
      slotB.position.y = -15.0;
      g.add(slot, slotB);
    }
    g.add(shuntFrame);

    parts.push(
      finalizeSensorAuditPart(
        'sensor-rear-flux-shunt',
        69,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -8.4),
        new THREE.Vector3(-54, 42, -96),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // S70. Sensor Optical-Cavity Hydrophobic ePTFE Barometric Breather Vent & Desiccant Strip
  {
    const g = new THREE.Group();
    const ventPad = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.8, 3.2, 0.7), 0.35, 0.04, 0.04, 8),
      mats.zifIvoryPlastic
    );
    ventPad.position.set(20.6, 11.2, 0);
    const desiccantBar = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 1.8, 0.5), 0.42, 0.04, 0.04, 8),
      mats.oilTrapPorousPad
    );
    desiccantBar.position.set(0, -14.8, 0);
    g.add(ventPad, desiccantBar);

    parts.push(
      finalizeSensorAuditPart(
        'sensor-cavity-breather-desiccant',
        70,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 0, 2.2),
        new THREE.Vector3(56, -42, 54),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  return parts;
}

/**
 * Phase 19B — 8 Standalone-Only ISSCC/IEDM Nano-Pixel Semiconductor Cross-Section Layers (M28–M35 -> 35 total).
 * Rendered ONLY in standalone 'micro' mode; omitted completely in whole-camera views.
 * Scale: 2x2 Bayer pixel array = 22.0 x 22.0 units (1 pixel = 11.0 units).
 */
export function buildMicroUltraAuditParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const P = 11.0;
  const halfP = P / 2;
  const arrayW = P * 2;

  // M28. Substrate P-Well Bias Contact (Body Tie) & Anti-Latchup Guard Ring
  {
    const g = new THREE.Group();
    const guardRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW - 0.15, arrayW - 0.15, 0.35, arrayW - 1.5, arrayW - 1.5, 0.25), 0.45, 0.03, 0.03, 12),
      mats.copperHybridBond
    );
    g.add(guardRing);
    for (const [tx, ty] of [
      [-halfP, 0],
      [halfP, 0],
      [0, -halfP],
      [0, halfP],
      [0, 0],
    ] as Array<[number, number]>) {
      const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 1.4, 12).rotateX(Math.PI / 2), mats.goldPlating);
      tap.position.set(tx, ty, 0);
      g.add(tap);
    }

    parts.push(
      finalizeMicroAuditPart(
        'micro-pwell-body-tie',
        28,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -2.55),
        new THREE.Vector3(-26, 18, -8.5),
        cp,
        0.26
      )
    );
  }

  // M29. Column-Shared Analog CDS Switched-Capacitor S/H Bank
  {
    const g = new THREE.Group();
    for (const cx of [-halfP, halfP]) {
      for (const cy of [-3.2, 3.2]) {
        const capBot = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.2, 0.22), mats.copperHybridBond);
        capBot.position.set(cx, cy, -0.22);
        const capDiel = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.0, 0.18), mats.aluminaHighKFilm);
        capDiel.position.set(cx, cy, 0);
        const capTop = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.2, 0.22), mats.goldPlating);
        capTop.position.set(cx, cy, 0.22);
        g.add(capBot, capDiel, capTop);
      }
    }

    parts.push(
      finalizeMicroAuditPart(
        'micro-column-cds-sh',
        29,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, -10.8),
        new THREE.Vector3(28, 16, -24.5),
        cp,
        0.26
      )
    );
  }

  // M30. 14-Bit Single-Slope Ramp DAC Voltage Bus, Auto-Zero Comparator & Gray-Code Latch
  {
    const g = new THREE.Group();
    // Shared ramp bus bar spanning columns
    const rampBus = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 1.2, 1.2, 0.35), mats.goldPlating);
    rampBus.position.set(0, 8.6, 0.2);
    g.add(rampBus);
    // 4 column comparator + Gray-code latch tiles
    for (const [cx, cy] of [
      [-halfP, 2.4],
      [halfP, 2.4],
      [-halfP, -5.2],
      [halfP, -5.2],
    ] as Array<[number, number]>) {
      const compTile = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(7.2, 4.6, 0.4), 0.55, 0.04, 0.04, 8),
        mats.siliconLogicLayer
      );
      compTile.position.set(cx, cy, 0);
      const latchStrip = new THREE.Mesh(new THREE.BoxGeometry(6.4, 1.1, 0.25), mats.copperHybridBond);
      latchStrip.position.set(cx, cy - 1.4, 0.35);
      g.add(compTile, latchStrip);
    }

    parts.push(
      finalizeMicroAuditPart(
        'micro-ss-adc-ramp-comp',
        30,
        '#3b82f6',
        g,
        new THREE.Vector3(0, 0, -12.6),
        new THREE.Vector3(-28, -14, -31.0),
        cp,
        0.26
      )
    );
  }

  // M31. Full-Frame Lithography Mask-Stitching Boundary Zone & 8-Lane SLVS-EC v2.0 SerDes PHY
  {
    const g = new THREE.Group();
    // Stitch calibration seam line + 8 high-speed differential SLVS-EC SerDes lanes along bottom edge
    const stitchBar = new THREE.Mesh(new THREE.BoxGeometry(0.45, arrayW, 0.35), mats.taNBarrierLiner);
    stitchBar.position.set(0, 0, 0.25);
    g.add(stitchBar);
    for (let i = 0; i < 8; i++) {
      const lx = -8.75 + i * 2.5;
      const phyBlock = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.2, 0.52), mats.rfGoldCoax);
      phyBlock.position.set(lx, -9.2, 0);
      g.add(phyBlock);
    }

    parts.push(
      finalizeMicroAuditPart(
        'micro-stitch-slvsec-phy',
        31,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, -14.2),
        new THREE.Vector3(26, -20, -37.5),
        cp,
        0.26
      )
    );
  }

  // M32. Corner-Pixel Chief Ray Angle (CRA) Microlens & Color-Filter Inward Micro-Shift Optical Offset
  {
    const g = new THREE.Group();
    // 4 subtly offset translucent microlens shift reference domes + inward shift arrow indicators
    for (const [cx, cy] of [
      [-halfP, halfP],
      [halfP, halfP],
      [-halfP, -halfP],
      [halfP, -halfP],
    ] as Array<[number, number]>) {
      const shiftedRing = new THREE.Mesh(
        new THREE.TorusGeometry(4.4, 0.22, 8, 28),
        mats.fluorineCoatCyan
      );
      // Inward offset toward optical center illustrating corner CRA shift
      shiftedRing.position.set(cx * 0.88, cy * 0.88, 0.2);
      shiftedRing.userData.noEdges = true;
      g.add(shiftedRing);
    }

    parts.push(
      finalizeMicroAuditPart(
        'micro-cra-chief-ray-shift',
        32,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 8.85),
        new THREE.Vector3(26, 20, 32.0),
        cp,
        0.22
      )
    );
  }

  // M33. Thinned Logic-Wafer (20 μm) Cu-TSV Conformal SiO2 Dielectric Liner & Ta/Cu Barrier
  {
    const g = new THREE.Group();
    for (const [vx, vy] of [
      [-7.8, 7.8],
      [7.8, 7.8],
      [-7.8, -7.8],
      [7.8, -7.8],
    ] as Array<[number, number]>) {
      // Outer SiO2 dielectric liner tube
      const liner = new THREE.Mesh(
        new THREE.CylinderGeometry(1.25, 1.25, 5.4, 16, 1, true).rotateX(Math.PI / 2),
        mats.ftiOxide
      );
      liner.position.set(vx, vy, 0);
      // TaN barrier sleeve
      const barrier = new THREE.Mesh(
        new THREE.CylinderGeometry(1.02, 1.02, 5.5, 16, 1, true).rotateX(Math.PI / 2),
        mats.taNBarrierLiner
      );
      barrier.position.set(vx, vy, 0);
      // Solid pure copper TSV pillar core
      const cuCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.84, 0.84, 5.7, 16).rotateX(Math.PI / 2),
        mats.copperHybridBond
      );
      cuCore.position.set(vx, vy, 0);
      g.add(liner, barrier, cuCore);
    }

    parts.push(
      finalizeMicroAuditPart(
        'micro-tsv-oxide-liner',
        33,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, -15.4),
        new THREE.Vector3(-28, 22, -43.0),
        cp,
        0.28
      )
    );
  }

  // M34. All-Direction Cross-PDAF & Pixel-Binning Sub-Pixel Optical Light-Guide Septum Wall
  {
    const g = new THREE.Group();
    // Ultra-thin cross-shaped air-gap / tungsten waveguide walls bisecting each pixel quadrant
    const wallX = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 0.2, 0.36, 2.3), mats.tungstenLightShield);
    const wallY = new THREE.Mesh(new THREE.BoxGeometry(0.36, arrayW - 0.2, 2.3), mats.tungstenLightShield);
    // Low-n optical cladding flanking the tungsten core
    const cladX = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 0.2, 0.72, 2.1), mats.ftiOxide);
    const cladY = new THREE.Mesh(new THREE.BoxGeometry(0.72, arrayW - 0.2, 2.1), mats.ftiOxide);
    g.add(wallX, wallY, cladX, cladY);

    parts.push(
      finalizeMicroAuditPart(
        'micro-quad-bayer-septum',
        34,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 4.9),
        new THREE.Vector3(-26, -18, 17.5),
        cp,
        0.26
      )
    );
  }

  // M35. On-Die Temperature-Compensated Bandgap Voltage Reference (1.20 V) & Low-Jitter PLL Clock Tree
  {
    const g = new THREE.Group();
    // Central V_BG reference macro + symmetric H-tree low-jitter clock traces
    const bgMacro = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.8, 3.6, 0.4), 0.45, 0.03, 0.03, 8),
      mats.npuSiliconDie
    );
    const hCenter = new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.42, 0.22), mats.goldPlating);
    const hLeft = new THREE.Mesh(new THREE.BoxGeometry(0.42, 13.0, 0.22), mats.goldPlating);
    hLeft.position.x = -7.0;
    const hRight = new THREE.Mesh(new THREE.BoxGeometry(0.42, 13.0, 0.22), mats.goldPlating);
    hRight.position.x = 7.0;
    g.add(bgMacro, hCenter, hLeft, hRight);

    parts.push(
      finalizeMicroAuditPart(
        'micro-bandgap-pll-clock',
        35,
        '#8b5cf6',
        g,
        new THREE.Vector3(0, 0, -17.0),
        new THREE.Vector3(28, 22, -48.5),
        cp,
        0.26
      )
    );
  }

  return parts;
}
