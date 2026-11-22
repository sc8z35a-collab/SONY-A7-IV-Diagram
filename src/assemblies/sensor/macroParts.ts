import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  createVoiceCoilGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { MACRO_EXPLANATIONS } from './explanations';

function finalizePart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  integratedExplodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  options?: { ibisMovable?: boolean; ultrasonicElement?: boolean; edgeOpacity?: number }
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(
    group,
    clippingPlanes,
    26,
    options?.edgeOpacity ?? 0.2
  );

  return {
    id,
    subsystem: 'sensor',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: MACRO_EXPLANATIONS[id],
    ibisMovable: options?.ibisMovable,
    ultrasonicElement: options?.ultrasonicElement,
  };
}

/**
 * Build ALL 26 ultra-detailed watchmaker-grade CAD sub-assemblies of a 2024-2026 Flagship
 * Full-Frame 3-Wafer Stacked Global Shutter Sensor & 8.5-Stop 5-Axis IBIS Unit:
 *  - S01: Optical Aperture Mask & EPDM Dust-Seal Bezel
 *  - S02: Supersonic Wave Filter (SSWF) Anti-Static Fluorine Glass Plate
 *  - S03: Multi-Layer PZT Piezoelectric Ultrasonic Actuator Bar & Silver Electrodes (NEW!)
 *  - S04: Front Birefringent Synthetic Quartz OLPF (H-Split & ±45°)
 *  - S05: Zero-Order λ/4 Quarter-Wave Depolarizer & Rear V-Split Quartz OLPF (NEW!)
 *  - S06: Hybrid Cu²⁺ Phosphate IR-Absorption + Dichroic Multilayer Filter
 *  - S07: Low-Alpha Borosilicate Cover Glass & Kovar Hermetic Seal Ring
 *  - S08: Wafer 1 — Full-Frame Global Shutter BSI-CMOS Pixel Silicon Die
 *  - S09: 3μm-Pitch Cu-Cu Bumpless Direct Hybrid Bonding Copper Matrix (NEW!)
 *  - S10: Wafer 2 & 3 — 4nm Column-Parallel ADC Logic + 120fps Stacked DRAM (NEW!)
 *  - S11: 99.99% Au Ultra-Low-Loop Thermosonic Wire Bonding Array
 *  - S12: 12-Layer HTCC Alumina Ceramic LGA Package & CuW Thermal Slug
 *  - S13: 10-Layer Build-Up Sensor Rigid PCB & Ultra-Low-Noise LDO Stage
 *  - S14: SLVS-EC v3 128Gbps Shielded U-Loop Flex Harness
 *  - S15: 5-Axis IBIS Topology-Optimized Die-Cast Magnesium Movable Stage
 *  - S16: 3x Independent Air-Core Flat Copper VCM Voice Coils & Flex Bus (NEW!)
 *  - S17: 3-Axis Sub-Micron Hall-Effect Position Sensor PCB & Sensing ICs (NEW!)
 *  - S18: Kinematic 3-Point Si₃N₄ Ceramic Ball Bearings & Hardened Races
 *  - S19: Magnetic Preload Ferromagnetic Attraction Plates & CuW Counterweight (NEW!)
 *  - S20: Power-Off Mechanical IBIS Park-Lock Solenoid & Latch Arm (NEW!)
 *  - S21: 3x Dual-Pole N52 Neodymium Magnet Arrays & Soft-Iron Back Yokes (NEW!)
 *  - S22: Stationary Die-Cast Magnesium IBIS Base Chassis
 *  - S23: 3-Point Micron Flange-Back Tilt Calibration Springs & Bolts (NEW!)
 *  - S24: High-Conductivity Silicone TIM Thermal Interface Pad (NEW!)
 *  - S25: Σ-Folded Pyrolytic Graphite Sheet (PGS) Flexible Thermal Bridge
 *  - S26: Rear Pure-Copper Micro-Fin Heatsink & Graphite Spreading Plate (NEW!)
 */
export function buildMacroSensorParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const dummy = new THREE.Object3D();

  // =========================================================================
  // S01. Optical Aperture Mask & Dust-Seal Bezel (z = +7.80 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const bezelShape = createFrameShape(50.0, 40.0, 3.0, 38.0, 26.0, 0.8);
    addCircleHoles(bezelShape, [
      [-21.5, 16.5, 1.3],
      [21.5, 16.5, 1.3],
      [-21.5, -16.5, 1.3],
      [21.5, -16.5, 1.3],
    ]);
    g.add(
      new THREE.Mesh(
        extrudeCentered(bezelShape, 1.2, 0.14, 0.14, 24),
        mats.matteBlackAnodized
      )
    );

    const baffleShape = createFrameShape(39.4, 27.4, 0.9, 36.6, 24.6, 0.4);
    const baffleMesh = new THREE.Mesh(
      extrudeCentered(baffleShape, 0.55, 0.08, 0.12, 16),
      mats.matteBlackAnodized
    );
    baffleMesh.position.z = 0.55;
    g.add(baffleMesh);

    const gasketShape = createFrameShape(47.2, 37.2, 2.4, 39.2, 27.2, 1.0);
    const gasketMesh = new THREE.Mesh(
      extrudeCentered(gasketShape, 0.42, 0.04, 0.04, 18),
      mats.epdmGasket
    );
    gasketMesh.position.z = -0.78;
    g.add(gasketMesh);

    for (const [sx, sy] of [
      [-21.5, 16.5],
      [21.5, 16.5],
      [-21.5, -16.5],
      [21.5, -16.5],
    ] as Array<[number, number]>) {
      const screw = createPrecisionScrew(1.55, 0.55, 1.4, mats.stainlessMachined);
      screw.position.set(sx, sy, 0.52);
      g.add(screw);
    }

    parts.push(
      finalizePart(
        'aperture-mask',
        1,
        '#252932',
        g,
        new THREE.Vector3(0, 0, 7.8),
        new THREE.Vector3(0, 0, 72),
        new THREE.Vector3(0, 0, 10.2),
        cp,
        { ibisMovable: true, edgeOpacity: 0.25 }
      )
    );
  }

  // =========================================================================
  // S02. Ultrasonic Dust Reduction Glass Plate (SSWF) (z = +6.20 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const glassShape = createRoundedRectShape(43.2, 31.2, 0.6);
    const glassMesh = new THREE.Mesh(
      extrudeCentered(glassShape, 0.55, 0.06, 0.06, 12),
      mats.sswfGlass
    );
    glassMesh.userData.edgeOpacity = 0.42;
    g.add(glassMesh);

    const itoFrame = createFrameShape(43.1, 31.1, 0.6, 40.4, 28.4, 0.3);
    const itoMesh = new THREE.Mesh(
      extrudeCentered(itoFrame, 0.08, 0, 0, 12),
      mats.silverElectrode
    );
    itoMesh.position.z = 0.29;
    g.add(itoMesh);

    for (const [dx, dy] of [
      [-21.2, 14.8],
      [21.2, 14.8],
      [-21.2, -11.2],
      [21.2, -11.2],
    ] as Array<[number, number]>) {
      const damper = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.8, 0.95), mats.epdmGasket);
      damper.position.set(dx, dy, -0.08);
      g.add(damper);
    }

    parts.push(
      finalizePart(
        'sswf-piezo',
        2,
        '#95c8e8',
        g,
        new THREE.Vector3(0, 0, 6.2),
        new THREE.Vector3(0, 0, 62),
        new THREE.Vector3(0, 0, 5.3),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.35 }
      )
    );
  }

  // =========================================================================
  // S03. [NEW!] Multi-Layer PZT Piezoelectric Ultrasonic Actuator Bar (z = +6.88 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Multi-layer Piezoelectric Ceramic Actuator Bar (PZT) bonded at lower edge of SSWF glass
    const pztBar = new THREE.Mesh(new THREE.BoxGeometry(36.0, 2.8, 0.9), mats.pztCeramic);
    g.add(pztBar);

    // Symmetrical Dual Fired-Silver Drive Electrodes (+Z face)
    const elecL = new THREE.Mesh(new THREE.BoxGeometry(16.2, 2.35, 0.14), mats.silverElectrode);
    elecL.position.set(-8.6, 0, 0.48);
    const elecR = new THREE.Mesh(new THREE.BoxGeometry(16.2, 2.35, 0.14), mats.silverElectrode);
    elecR.position.set(8.6, 0, 0.48);
    g.add(elecL, elecR);

    // Rear ground return electrode plate (-Z face)
    const gndElec = new THREE.Mesh(new THREE.BoxGeometry(34.8, 2.2, 0.1), mats.goldPlating);
    gndElec.position.z = -0.46;
    g.add(gndElec);

    // High-voltage polyimide drive FPC lead ribbon exiting right side
    const leadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(17.5, 0, 0.22),
      new THREE.Vector3(21.5, 0, 0.05),
      new THREE.Vector3(23.5, 0.7, -1.05),
      new THREE.Vector3(24.0, 2.3, -2.25),
    ]);
    const leadTube = new THREE.Mesh(
      new THREE.TubeGeometry(leadCurve, 22, 0.36, 8, false),
      mats.polyimideFpc
    );
    g.add(leadTube);

    parts.push(
      finalizePart(
        'sensor-pzt-bar',
        3,
        '#eab308',
        g,
        new THREE.Vector3(0, -14.1, 6.88),
        new THREE.Vector3(0, -24, 62),
        new THREE.Vector3(0, -36, 4.6),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.3 }
      )
    );
  }

  // =========================================================================
  // S04. Front Birefringent Quartz OLPF (H-Split & ±45° Layer, z = +4.95 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const coreShape = createRoundedRectShape(40.2, 28.2, 0.4);
    const corePlate = new THREE.Mesh(
      extrudeCentered(coreShape, 0.56, 0.04, 0.04, 12),
      mats.quartzOlpf
    );
    corePlate.userData.edgeOpacity = 0.42;
    g.add(corePlate);

    for (const lz of [0.16, -0.16]) {
      const seamFrame = createFrameShape(40.85, 28.85, 0.5, 39.75, 27.75, 0.32);
      const seamMesh = new THREE.Mesh(
        extrudeCentered(seamFrame, 0.24, 0.02, 0.02, 12),
        mats.quartzEdge
      );
      seamMesh.position.z = lz;
      seamMesh.userData.edgeOpacity = 0.36;
      g.add(seamMesh);
    }

    const notch = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 0.68), mats.matteBlackAnodized);
    notch.position.set(19.6, 14.3, 0);
    g.add(notch);

    parts.push(
      finalizePart(
        'olpf-16pt',
        4,
        '#79b7cf',
        g,
        new THREE.Vector3(0, 0, 4.95),
        new THREE.Vector3(0, 0, 52),
        new THREE.Vector3(0, 0, 0.55),
        cp,
        { ibisMovable: true, edgeOpacity: 0.34 }
      )
    );
  }

  // =========================================================================
  // S05. [NEW!] Zero-Order λ/4 Quarter-Wave Plate & Rear V-Split Quartz OLPF (z = +4.30 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front λ/4 quarter-wave retarder film + rear vertical birefringent quartz crystal
    const qwpShape = createRoundedRectShape(40.2, 28.2, 0.4);
    const qwpPlate = new THREE.Mesh(
      extrudeCentered(qwpShape, 0.56, 0.04, 0.04, 12),
      mats.evfDichroicMirror
    );
    qwpPlate.userData.edgeOpacity = 0.42;
    g.add(qwpPlate);

    // Optical-cement perimeter band & diagonal polarization axis marker
    const rimShape = createFrameShape(40.9, 28.9, 0.5, 39.6, 27.6, 0.32);
    const rimMesh = new THREE.Mesh(
      extrudeCentered(rimShape, 0.54, 0.02, 0.02, 12),
      mats.quartzEdge
    );
    g.add(rimMesh);

    // Subtle 45° fast-axis orientation bevel marker on upper-left corner
    const axisTab = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.55, 0.64), mats.goldPlating);
    axisTab.position.set(-19.2, 14.35, 0);
    g.add(axisTab);

    parts.push(
      finalizePart(
        'sensor-qwp-plate',
        5,
        '#a855f7',
        g,
        new THREE.Vector3(0, 0, 4.3),
        new THREE.Vector3(0, 0, 42),
        new THREE.Vector3(0, 0, -4.8),
        cp,
        { ibisMovable: true, edgeOpacity: 0.34 }
      )
    );
  }

  // =========================================================================
  // S06. Hybrid Phosphate IR-Absorption + Dichroic IR/UV Cut Filter (z = +3.25 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const irShape = createRoundedRectShape(40.0, 28.0, 0.45);
    const irMesh = new THREE.Mesh(
      extrudeCentered(irShape, 0.72, 0.06, 0.06, 12),
      mats.irCutGlass
    );
    irMesh.userData.edgeOpacity = 0.48;
    g.add(irMesh);

    const spacerShape = createFrameShape(42.2, 30.2, 0.8, 40.05, 28.05, 0.45);
    g.add(
      new THREE.Mesh(
        extrudeCentered(spacerShape, 0.78, 0.04, 0.04, 14),
        mats.matteBlackAnodized
      )
    );

    parts.push(
      finalizePart(
        'ir-cut-filter',
        6,
        '#38b2da',
        g,
        new THREE.Vector3(0, 0, 3.25),
        new THREE.Vector3(0, 0, 32),
        new THREE.Vector3(0, 0, -9.75),
        cp,
        { ibisMovable: true, edgeOpacity: 0.36 }
      )
    );
  }

  // =========================================================================
  // S07. Low-Alpha AR Cover Glass & Kovar Hermetic Seal Ring (z = +2.05 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const winShape = createRoundedRectShape(43.8, 33.4, 0.5);
    const winMesh = new THREE.Mesh(
      extrudeCentered(winShape, 0.52, 0.04, 0.04, 12),
      mats.coverGlass
    );
    winMesh.userData.edgeOpacity = 0.38;
    g.add(winMesh);

    const sealShape = createFrameShape(47.4, 36.8, 1.4, 42.2, 31.8, 0.6);
    const sealMesh = new THREE.Mesh(
      extrudeCentered(sealShape, 0.62, 0.07, 0.07, 16),
      mats.kovarSeal
    );
    sealMesh.position.z = -0.1;
    g.add(sealMesh);

    const goldLipShape = createFrameShape(44.0, 33.6, 0.7, 42.4, 32.0, 0.6);
    const goldLip = new THREE.Mesh(
      extrudeCentered(goldLipShape, 0.14, 0.02, 0.02, 12),
      mats.goldPlating
    );
    goldLip.position.z = 0.24;
    g.add(goldLip);

    parts.push(
      finalizePart(
        'cover-glass',
        7,
        '#8c99a8',
        g,
        new THREE.Vector3(0, 0, 2.05),
        new THREE.Vector3(0, 0, 22),
        new THREE.Vector3(0, 0, -14.55),
        cp,
        { ibisMovable: true, edgeOpacity: 0.32 }
      )
    );
  }

  // =========================================================================
  // S08. Wafer 1: Full-Frame Global Shutter BSI-CMOS Pixel Silicon Die (z = +0.97 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const pixelDieGeo = new THREE.BoxGeometry(40.4, 28.4, 0.28);
    const pixelDieMats = [
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconSensorDie, // +Z front active imaging surface with diffraction & bond pads
      mats.siliconBulk,
    ];
    g.add(new THREE.Mesh(pixelDieGeo, pixelDieMats));

    parts.push(
      finalizePart(
        'cmos-die',
        8,
        '#1d6d7c',
        g,
        new THREE.Vector3(0, 0, 0.97),
        new THREE.Vector3(0, 0, 12),
        new THREE.Vector3(0, 0, -19.47),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S09. [NEW!] 3μm-Pitch Cu-Cu Bumpless Direct Hybrid Bonding Matrix (z = +0.76 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Ultra-flat CMP SiO2 dielectric oxide bonding layer
    const oxideCore = new THREE.Mesh(
      new THREE.BoxGeometry(40.2, 28.2, 0.12),
      mats.quartzEdge
    );
    g.add(oxideCore);

    // High-density InstancedMesh copper hybrid-bond micro-pad matrix (16 x 10 = 160 gleaming pads!)
    const padGeo = new THREE.BoxGeometry(1.45, 1.45, 0.18);
    const padInst = new THREE.InstancedMesh(padGeo, mats.copperHybridBond, 160);
    let idx = 0;
    for (let ix = 0; ix < 16; ix++) {
      const px = -17.25 + ix * 2.3;
      for (let iy = 0; iy < 10; iy++) {
        const py = -11.25 + iy * 2.5;
        dummy.position.set(px, py, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        padInst.setMatrixAt(idx++, dummy.matrix);
      }
    }
    padInst.instanceMatrix.needsUpdate = true;
    g.add(padInst);

    // Perimeter copper seal guard ring
    const guardRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(40.1, 28.1, 0.2, 38.4, 26.4, 0.2), 0.18, 0.01, 0.01, 8),
      mats.copperHybridBond
    );
    g.add(guardRing);

    parts.push(
      finalizePart(
        'sensor-cucu-layer',
        9,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 0.76),
        new THREE.Vector3(0, 0, 4),
        new THREE.Vector3(0, 0, -24.76),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S10. [NEW!] Wafer 2 & 3: 4nm Column-Parallel ADC Logic + Stacked DRAM (z = +0.28 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Wafer 2: 4nm High-Speed Column-Parallel CDS / ADC Logic Die
    const logicDie = new THREE.Mesh(
      new THREE.BoxGeometry(40.4, 28.4, 0.32),
      mats.siliconLogicLayer
    );
    logicDie.position.z = 0.24;
    g.add(logicDie);

    // Etched column-parallel ADC bank bars visible on +Z face of Logic Wafer (InstancedMesh!)
    const adcBarGeo = new THREE.BoxGeometry(1.15, 24.4, 0.06);
    const adcBars = new THREE.InstancedMesh(adcBarGeo, mats.goldPlating, 20);
    for (let i = 0; i < 20; i++) {
      dummy.position.set(-18.05 + i * 1.9, 0, 0.42);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      adcBars.setMatrixAt(i, dummy.matrix);
    }
    adcBars.instanceMatrix.needsUpdate = true;
    g.add(adcBars);

    // 2nd Cu-Cu interconnect seam between Logic Wafer & DRAM Wafer
    const cucu2 = new THREE.Mesh(
      new THREE.BoxGeometry(40.25, 28.25, 0.1),
      mats.copperHybridBond
    );
    cucu2.position.z = 0.02;
    g.add(cucu2);

    // Wafer 3: Ultra-High-Bandwidth Stacked DRAM 120fps Frame Buffer Die
    const dramDie = new THREE.Mesh(
      new THREE.BoxGeometry(40.4, 28.4, 0.34),
      mats.siliconDramLayer
    );
    dramDie.position.z = -0.2;
    g.add(dramDie);

    // Silver-filled conductive epoxy die-attach bond layer underneath
    const dieAttach = new THREE.Mesh(
      new THREE.BoxGeometry(39.6, 27.6, 0.08),
      mats.silverElectrode
    );
    dieAttach.position.z = -0.41;
    g.add(dieAttach);

    parts.push(
      finalizePart(
        'sensor-logic-dram',
        10,
        '#4f46e5',
        g,
        new THREE.Vector3(0, 0, 0.28),
        new THREE.Vector3(0, 0, -4),
        new THREE.Vector3(0, 0, -29.78),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S11. 99.99% Au Ultra-Low-Loop Gold Wire Bonding Array (z = +0.55 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const archSegments: THREE.TubeGeometry[] = [];
    const buildArch = (p0: THREE.Vector3, p1: THREE.Vector3, peakZ: number) => {
      const mid1 = p0.clone().lerp(p1, 0.28);
      mid1.z = peakZ;
      const mid2 = p0.clone().lerp(p1, 0.72);
      mid2.z = peakZ - 0.08;
      const curve = new THREE.CatmullRomCurve3([p0, mid1, mid2, p1]);
      return new THREE.TubeGeometry(curve, 10, 0.048, 5, false);
    };

    const xCount = 42;
    for (let i = 0; i < xCount; i++) {
      const t = i / (xCount - 1);
      const x = -18.2 + t * 36.4;
      archSegments.push(
        buildArch(
          new THREE.Vector3(x, 13.75, 0.56),
          new THREE.Vector3(x * 1.045, 16.05, 0.16),
          0.96
        ),
        buildArch(
          new THREE.Vector3(x, -13.75, 0.56),
          new THREE.Vector3(x * 1.045, -16.05, 0.16),
          0.96
        )
      );
    }

    const yCount = 28;
    for (let i = 0; i < yCount; i++) {
      const t = i / (yCount - 1);
      const y = -12.2 + t * 24.4;
      archSegments.push(
        buildArch(
          new THREE.Vector3(-19.75, y, 0.56),
          new THREE.Vector3(-21.95, y * 1.05, 0.16),
          0.96
        ),
        buildArch(
          new THREE.Vector3(19.75, y, 0.56),
          new THREE.Vector3(21.95, y * 1.05, 0.16),
          0.96
        )
      );
    }

    const mergedPositions: number[] = [];
    const mergedNormals: number[] = [];
    const mergedIndices: number[] = [];
    let vertexOffset = 0;

    for (const seg of archSegments) {
      const pos = seg.attributes.position;
      const norm = seg.attributes.normal;
      const idx = seg.index!;
      for (let k = 0; k < pos.count; k++) {
        mergedPositions.push(pos.getX(k), pos.getY(k), pos.getZ(k));
        mergedNormals.push(norm.getX(k), norm.getY(k), norm.getZ(k));
      }
      for (let k = 0; k < idx.count; k++) {
        mergedIndices.push(idx.getX(k) + vertexOffset);
      }
      vertexOffset += pos.count;
      seg.dispose();
    }

    const mergedGeo = new THREE.BufferGeometry();
    mergedGeo.setAttribute('position', new THREE.Float32BufferAttribute(mergedPositions, 3));
    mergedGeo.setAttribute('normal', new THREE.Float32BufferAttribute(mergedNormals, 3));
    mergedGeo.setIndex(mergedIndices);

    const wiresMesh = new THREE.Mesh(mergedGeo, mats.goldPlating);
    wiresMesh.userData.noEdges = true;
    g.add(wiresMesh);

    parts.push(
      finalizePart(
        'wire-bonds',
        11,
        '#e3b952',
        g,
        new THREE.Vector3(0, 0, 0.55),
        new THREE.Vector3(0, 0, -12),
        new THREE.Vector3(0, 0, -36.05),
        cp,
        { ibisMovable: true }
      )
    );
  }

  // =========================================================================
  // S12. HTCC 12-Layer Alumina Ceramic LGA Package (z = -0.55 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const baseShape = createRoundedRectShape(49.2, 38.6, 1.8);
    const baseMesh = new THREE.Mesh(
      extrudeCentered(baseShape, 1.1, 0.12, 0.12, 18),
      mats.ceramicAlumina
    );
    baseMesh.position.z = -0.55;
    g.add(baseMesh);

    const shelfShape = createFrameShape(49.2, 38.6, 1.8, 41.6, 29.6, 0.7);
    const shelfMesh = new THREE.Mesh(
      extrudeCentered(shelfShape, 1.1, 0.08, 0.08, 18),
      mats.ceramicAlumina
    );
    shelfMesh.position.z = 0.55;
    g.add(shelfMesh);

    const upperWallShape = createFrameShape(49.2, 38.6, 1.8, 45.2, 34.4, 1.0);
    const upperWall = new THREE.Mesh(
      extrudeCentered(upperWallShape, 0.95, 0.08, 0.08, 18),
      mats.ceramicAlumina
    );
    upperWall.position.z = 1.5;
    g.add(upperWall);

    const fingerGeo = new THREE.BoxGeometry(0.45, 1.25, 0.08);
    const fingers = new THREE.InstancedMesh(fingerGeo, mats.goldPlating, 42 * 2 + 28 * 2);
    let fi = 0;
    for (let i = 0; i < 42; i++) {
      const x = -19.0 + (i / 41) * 38.0;
      dummy.position.set(x, 16.05, 1.14);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      fingers.setMatrixAt(fi++, dummy.matrix);

      dummy.position.set(x, -16.05, 1.14);
      dummy.updateMatrix();
      fingers.setMatrixAt(fi++, dummy.matrix);
    }
    for (let i = 0; i < 28; i++) {
      const y = -12.8 + (i / 27) * 25.6;
      dummy.position.set(-21.95, y, 1.14);
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.updateMatrix();
      fingers.setMatrixAt(fi++, dummy.matrix);

      dummy.position.set(21.95, y, 1.14);
      dummy.updateMatrix();
      fingers.setMatrixAt(fi++, dummy.matrix);
    }
    fingers.instanceMatrix.needsUpdate = true;
    g.add(fingers);

    const slug = new THREE.Mesh(new THREE.BoxGeometry(36.0, 24.0, 1.14), mats.tungstenCopper);
    slug.position.z = -0.55;
    g.add(slug);

    const padGeo = new THREE.BoxGeometry(1.1, 1.1, 0.08);
    const padCoords: Array<[number, number]> = [];
    for (let x = -22; x <= 22; x += 2.2) {
      for (const y of [-17.2, -15.2, 15.2, 17.2]) padCoords.push([x, y]);
    }
    for (let y = -13; y <= 13; y += 2.2) {
      for (const x of [-22.4, -20.4, 20.4, 22.4]) padCoords.push([x, y]);
    }
    const lgaPads = new THREE.InstancedMesh(padGeo, mats.goldPlating, padCoords.length);
    padCoords.forEach(([px, py], idx) => {
      dummy.position.set(px, py, -1.14);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      lgaPads.setMatrixAt(idx, dummy.matrix);
    });
    lgaPads.instanceMatrix.needsUpdate = true;
    g.add(lgaPads);

    parts.push(
      finalizePart(
        'ceramic-package',
        12,
        '#3e424c',
        g,
        new THREE.Vector3(0, 0, -0.55),
        new THREE.Vector3(0, 0, -21),
        new THREE.Vector3(0, 0, -41.95),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S13. Multi-Layer Sensor Main PCB & Analog/Digital Power Stage (z = -2.45 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const pcbGeo = new THREE.BoxGeometry(56.0, 45.0, 1.25);
    g.add(
      new THREE.Mesh(pcbGeo, [
        mats.pcbSide,
        mats.pcbSide,
        mats.pcbSide,
        mats.pcbSide,
        mats.sensorPcb,
        mats.sensorPcb,
      ])
    );

    const ringGeo = new THREE.CylinderGeometry(1.8, 1.8, 1.32, 18);
    ringGeo.rotateX(Math.PI / 2);
    for (const [rx, ry] of [
      [-24.8, 19.2],
      [24.8, 19.2],
      [-24.8, -19.2],
      [24.8, -19.2],
    ] as Array<[number, number]>) {
      const ring = new THREE.Mesh(ringGeo, mats.goldPlating);
      ring.position.set(rx, ry, 0);
      g.add(ring);
    }

    const icSpecs: Array<[number, number, number, number, number]> = [
      [-17.5, 13.0, 4.6, 4.6, 0.72],
      [-17.5, -13.0, 4.6, 4.6, 0.72],
      [17.5, 13.0, 5.2, 4.2, 0.72],
      [17.5, -13.0, 4.2, 4.2, 0.68],
    ];
    for (const [ix, iy, iw, ih, iz] of icSpecs) {
      const ic = new THREE.Mesh(new THREE.BoxGeometry(iw, ih, iz), mats.icEpoxy);
      ic.position.set(ix, iy, -0.625 - iz / 2);
      g.add(ic);
    }

    const xtal = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.5, 0.65), mats.silverElectrode);
    xtal.position.set(0, 16.5, -0.95);
    g.add(xtal);

    const capBodyGeo = new THREE.BoxGeometry(1.1, 0.6, 0.55);
    const capCoords: Array<[number, number, number]> = [];
    for (let i = 0; i < 12; i++) {
      const x = -11.0 + i * 2.0;
      capCoords.push([x, 12.6, 0], [x, -12.6, 0]);
    }
    for (let i = 0; i < 12; i++) {
      const y = -9.9 + i * 1.8;
      capCoords.push([-14.5, y, Math.PI / 2], [14.5, y, Math.PI / 2]);
    }
    const caps = new THREE.InstancedMesh(capBodyGeo, mats.smdCeramic, capCoords.length);
    capCoords.forEach(([cx, cy, rot], idx) => {
      dummy.position.set(cx, cy, -0.9);
      dummy.rotation.set(0, 0, rot);
      dummy.updateMatrix();
      caps.setMatrixAt(idx, dummy.matrix);
    });
    caps.instanceMatrix.needsUpdate = true;
    g.add(caps);

    for (const side of [-1, 1]) {
      const conn = new THREE.Mesh(new THREE.BoxGeometry(2.6, 22.0, 0.9), mats.icEpoxy);
      conn.position.set(side * 24.4, 0, -1.06);
      g.add(conn);

      const pins = new THREE.Mesh(new THREE.BoxGeometry(3.1, 20.6, 0.22), mats.goldPlating);
      pins.position.set(side * 24.4, 0, -0.74);
      g.add(pins);
    }

    parts.push(
      finalizePart(
        'sensor-pcb',
        13,
        '#1b5649',
        g,
        new THREE.Vector3(0, 0, -2.45),
        new THREE.Vector3(0, 0, -31),
        new THREE.Vector3(0, 0, -48.05),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S14. SLVS-EC v3 High-Speed Shielded Flex PCB Harness (z = -2.45 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const buildFlexRibbon = (side: -1 | 1) => {
      const ribbonGroup = new THREE.Group();
      const width = 18.6;
      const thickness = 0.24;

      const pts: Array<[number, number]> = [
        [side * 24.4, -1.45],
        [side * 31.0, -1.45],
        [side * 35.8, -2.2],
        [side * 37.8, -4.3],
        [side * 37.2, -6.9],
        [side * 34.4, -8.3],
        [side * 29.8, -8.4],
      ];

      const spline = new THREE.SplineCurve(pts.map(([x, z]) => new THREE.Vector2(x, z)));
      const samples = spline.getPoints(32);

      const upper: THREE.Vector2[] = [];
      const lower: THREE.Vector2[] = [];
      for (let i = 0; i < samples.length; i++) {
        const prev = samples[Math.max(0, i - 1)];
        const next = samples[Math.min(samples.length - 1, i + 1)];
        const tangent = new THREE.Vector2().subVectors(next, prev).normalize();
        const normal = new THREE.Vector2(-tangent.y, tangent.x);
        upper.push(samples[i].clone().addScaledVector(normal, thickness * 0.5));
        lower.push(samples[i].clone().addScaledVector(normal, -thickness * 0.5));
      }

      const shape = new THREE.Shape();
      shape.moveTo(upper[0].x, upper[0].y);
      for (let i = 1; i < upper.length; i++) shape.lineTo(upper[i].x, upper[i].y);
      for (let i = lower.length - 1; i >= 0; i--) shape.lineTo(lower[i].x, lower[i].y);
      shape.closePath();

      const extrudeGeo = new THREE.ExtrudeGeometry(shape, {
        depth: width,
        bevelEnabled: false,
        steps: 1,
      });
      extrudeGeo.translate(0, 0, -width / 2);
      extrudeGeo.rotateX(Math.PI / 2);
      extrudeGeo.computeVertexNormals();
      ribbonGroup.add(new THREE.Mesh(extrudeGeo, mats.polyimideFpc));

      const shieldSamples = samples.slice(6, 26);
      const sUpper: THREE.Vector2[] = [];
      const sLower: THREE.Vector2[] = [];
      for (let i = 0; i < shieldSamples.length; i++) {
        const prev = shieldSamples[Math.max(0, i - 1)];
        const next = shieldSamples[Math.min(shieldSamples.length - 1, i + 1)];
        const tangent = new THREE.Vector2().subVectors(next, prev).normalize();
        const normal = new THREE.Vector2(-tangent.y, tangent.x);
        sUpper.push(shieldSamples[i].clone().addScaledVector(normal, thickness * 0.68));
        sLower.push(shieldSamples[i].clone().addScaledVector(normal, thickness * 0.45));
      }
      const shieldShape = new THREE.Shape();
      shieldShape.moveTo(sUpper[0].x, sUpper[0].y);
      for (let i = 1; i < sUpper.length; i++) shieldShape.lineTo(sUpper[i].x, sUpper[i].y);
      for (let i = sLower.length - 1; i >= 0; i--) shieldShape.lineTo(sLower[i].x, sLower[i].y);
      shieldShape.closePath();
      const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, {
        depth: width - 1.4,
        bevelEnabled: false,
      });
      shieldGeo.translate(0, 0, -(width - 1.4) / 2);
      shieldGeo.rotateX(Math.PI / 2);
      shieldGeo.computeVertexNormals();
      ribbonGroup.add(new THREE.Mesh(shieldGeo, mats.emiShieldFilm));

      const endPlug = new THREE.Mesh(new THREE.BoxGeometry(3.2, 19.2, 0.9), mats.icEpoxy);
      endPlug.position.set(side * 29.8, 0, -8.55);
      const endGold = new THREE.Mesh(new THREE.BoxGeometry(1.4, 17.8, 0.16), mats.goldPlating);
      endGold.position.set(side * 28.8, 0, -8.08);
      ribbonGroup.add(endPlug, endGold);

      return ribbonGroup;
    };

    g.add(buildFlexRibbon(-1), buildFlexRibbon(1));

    parts.push(
      finalizePart(
        'slvs-fpc',
        14,
        '#c96b1c',
        g,
        new THREE.Vector3(0, 0, -2.45),
        new THREE.Vector3(0, 0, -39),
        new THREE.Vector3(0, 0, -55.05),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S15. 5-Axis IBIS Topology-Optimized Magnesium Movable Stage (z = -4.30 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const carrierShape = createFrameShape(76.0, 62.0, 5.0, 44.0, 32.0, 2.5);
    addCircleHoles(carrierShape, [
      [-33.0, 26.0, 2.2],
      [33.0, 26.0, 2.2],
      [-33.0, -26.0, 2.2],
      [33.0, -26.0, 2.2],
      [-30.5, 21.5, 2.4], // Tapered park-lock socket hole for S20 mechanical IBIS lock!
    ]);
    g.add(
      new THREE.Mesh(
        extrudeCentered(carrierShape, 1.65, 0.14, 0.14, 24),
        mats.magnesiumCast
      )
    );

    for (const [bx, by] of [
      [-24.8, 19.2],
      [24.8, 19.2],
      [-24.8, -19.2],
      [24.8, -19.2],
    ] as Array<[number, number]>) {
      const bossGeo = new THREE.CylinderGeometry(2.3, 2.6, 1.35, 18);
      bossGeo.rotateX(Math.PI / 2);
      const boss = new THREE.Mesh(bossGeo, mats.stainlessMachined);
      boss.position.set(bx, by, 1.15);
      g.add(boss);
    }

    parts.push(
      finalizePart(
        'ibis-carrier',
        15,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -4.3),
        new THREE.Vector3(0, 0, -48),
        new THREE.Vector3(0, 0, -60.2),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S16. [NEW!] 3x Independent Air-Core Flat Copper VCM Voice Coils (z = -5.08 mm)
  // =========================================================================
  const coilConfigs: Array<{ x: number; y: number; w: number; h: number }> = [
    { x: -16.5, y: -24.0, w: 20.5, h: 9.8 }, // Y1 / Roll Left
    { x: 16.5, y: -24.0, w: 20.5, h: 9.8 }, // Y2 / Roll Right
    { x: 30.8, y: 4.5, w: 9.8, h: 22.0 }, // X1 Horizontal Actuator
  ];
  {
    const g = new THREE.Group();

    for (const cfg of coilConfigs) {
      const winding = Math.min(cfg.w, cfg.h) * 0.28;
      const coilGeo = createVoiceCoilGeometry(cfg.w, cfg.h, winding, 1.38);
      const coilMesh = new THREE.Mesh(coilGeo, mats.copperCoil);
      coilMesh.position.set(cfg.x, cfg.y, 0);
      g.add(coilMesh);

      // Micro solder terminal pads on each coil outer edge
      const pad = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.3, 0.3), mats.goldPlating);
      pad.position.set(cfg.x, cfg.y + (cfg.h > cfg.w ? -cfg.h * 0.45 : cfg.h * 0.45), -0.72);
      g.add(pad);
    }

    // Copper-polyimide VCM drive power flex bus joining all 3 voice coils
    const busBottom = new THREE.Mesh(new THREE.BoxGeometry(58.0, 2.2, 0.2), mats.polyimideFpc);
    busBottom.position.set(4.5, -18.2, -0.72);
    g.add(busBottom);

    const busRight = new THREE.Mesh(new THREE.BoxGeometry(2.2, 24.0, 0.2), mats.polyimideFpc);
    busRight.position.set(32.4, -7.2, -0.72);
    g.add(busRight);

    parts.push(
      finalizePart(
        'sensor-vcm-coils',
        16,
        '#c86432',
        g,
        new THREE.Vector3(0, 0, -5.08),
        new THREE.Vector3(0, 0, -61),
        new THREE.Vector3(0, 0, -66.42),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S17. [NEW!] 3-Axis Sub-Micron Hall-Effect Position Sensor PCB & ICs (z = -5.05 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision L-shaped green/gold flexible sensor feedback PCB routing cleanly to all 3 coil centers
    const traceH = new THREE.Mesh(new THREE.BoxGeometry(49.5, 2.4, 0.28), mats.hdiMainboardPcb);
    traceH.position.set(7.5, -24.0, 0.35);
    g.add(traceH);

    const traceV = new THREE.Mesh(new THREE.BoxGeometry(2.4, 30.0, 0.28), mats.hdiMainboardPcb);
    traceV.position.set(30.8, -9.8, 0.35);
    g.add(traceV);

    // 3x Ultra-high-resolution Hall-Effect Position Sensor ICs + Gold micro-leads + Signal AMPs
    for (const cfg of coilConfigs) {
      const hallIc = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.8, 0.78), mats.icEpoxy);
      hallIc.position.set(cfg.x, cfg.y, 0);
      g.add(hallIc);

      const hallLeads = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.8, 0.22), mats.goldPlating);
      hallLeads.position.set(cfg.x, cfg.y, -0.18);
      g.add(hallLeads);

      // Tiny calibration capacitor beside each Hall IC
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.45), mats.smdCeramic);
      cap.position.set(cfg.x + 2.4, cfg.y, 0.2);
      g.add(cap);
    }

    // Precision Differential Instrumentation Amplifier IC + Gold ZIF feedback tail at upper-right
    const ampIc = new THREE.Mesh(new THREE.BoxGeometry(4.2, 4.2, 0.85), mats.icEpoxy);
    ampIc.position.set(30.8, 16.5, 0.4);
    g.add(ampIc);

    const zifTail = new THREE.Mesh(new THREE.BoxGeometry(5.6, 12.0, 0.28), mats.polyimideFpc);
    zifTail.position.set(30.8, 23.0, 0.35);
    g.add(zifTail);

    const zifPins = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.4, 0.36), mats.goldPlating);
    zifPins.position.set(30.8, 28.0, 0.35);
    g.add(zifPins);

    parts.push(
      finalizePart(
        'sensor-hall-pcb',
        17,
        '#16a34a',
        g,
        new THREE.Vector3(0, 0, -5.05),
        new THREE.Vector3(0, 28, -61),
        new THREE.Vector3(0, 40, -66.45),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S18. 3-Point Si3N4 Ceramic Ball Bearings & Hardened Races (z = -5.70 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const ballPositions: Array<[number, number]> = [
      [0.0, 25.5],
      [-28.5, -18.5],
      [28.5, -18.5],
    ];

    const raceGeo = new THREE.CylinderGeometry(3.8, 3.8, 0.36, 24);
    raceGeo.rotateX(Math.PI / 2);

    for (const [bx, by] of ballPositions) {
      const ball = new THREE.Mesh(
        new THREE.SphereGeometry(1.38, 24, 18),
        mats.siliconNitrideBall
      );
      ball.position.set(bx, by, 0);
      ball.userData.noEdges = true;
      g.add(ball);

      const upperRace = new THREE.Mesh(raceGeo, mats.stainlessMachined);
      upperRace.position.set(bx, by, 1.48);
      g.add(upperRace);

      const lowerRace = new THREE.Mesh(raceGeo, mats.stainlessMachined);
      lowerRace.position.set(bx, by, -1.48);
      g.add(lowerRace);

      const retainerRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.55, 0.32, 10, 26),
        mats.matteBlackAnodized
      );
      retainerRing.position.set(bx, by, -1.1);
      retainerRing.userData.noEdges = true;
      g.add(retainerRing);
    }

    parts.push(
      finalizePart(
        'ceramic-balls',
        18,
        '#2c3240',
        g,
        new THREE.Vector3(0, 0, -5.7),
        new THREE.Vector3(0, 0, -73),
        new THREE.Vector3(0, 0, -72.8),
        cp,
        { ibisMovable: false, edgeOpacity: 0.25 }
      )
    );
  }

  // =========================================================================
  // S19. [NEW!] Magnetic Preload Ferromagnetic Plates & CuW Counterweight (z = -4.75 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const preloadPositions: Array<[number, number, number, number]> = [
      [-16.5, -24.0, 14.2, 5.4],
      [16.5, -24.0, 14.2, 5.4],
      [30.8, 4.5, 5.4, 14.2],
    ];
    for (const [px, py, pw, ph] of preloadPositions) {
      const plate = new THREE.Mesh(new THREE.BoxGeometry(pw, ph, 0.55), mats.softIronYoke);
      plate.position.set(px, py, 0);
      g.add(plate);
    }

    // Left high-density Tungsten-Copper (CuW) Center-of-Gravity Counterbalance Mass
    const balanceWeight = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, 18.0, 1.2),
      mats.tungstenCopper
    );
    balanceWeight.position.set(-30.8, 4.5, 0);
    g.add(balanceWeight);

    // 2 precision fastening screws on counterweight
    for (const sy of [-6.0, 6.0]) {
      const sc = createPrecisionScrew(1.2, 0.45, 1.3, mats.stainlessMachined);
      sc.position.set(-30.8, 4.5 + sy, 0.58);
      g.add(sc);
    }

    parts.push(
      finalizePart(
        'sensor-preload-plates',
        19,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -4.75),
        new THREE.Vector3(0, -32, -73),
        new THREE.Vector3(0, -40, -73.75),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S20. [NEW!] Power-Off Mechanical IBIS Park-Lock Solenoid & Latch Arm (z = -6.10 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Miniature pulse electromagnetic solenoid coil bobbin
    const solCoil = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 6.4, 18).rotateZ(Math.PI / 2),
      mats.copperCoil
    );
    solCoil.position.set(-4.2, 0, 0);
    g.add(solCoil);

    // Soft-iron U-frame solenoid housing bracket
    const solFrame = new THREE.Mesh(new THREE.BoxGeometry(7.6, 6.0, 4.2), mats.stainlessMachined);
    solFrame.position.set(-4.2, 0, -0.6);
    g.add(solFrame);

    // Helical brass return spring on plunger rod
    const retSpring = new THREE.Mesh(
      createHelicalSpringGeometry(1.1, 4.2, 5, 0.26).rotateY(Math.PI / 2),
      mats.brassGear
    );
    retSpring.position.set(1.2, 0, 0);
    retSpring.userData.noEdges = true;
    g.add(retSpring);

    // Pivoting stainless locking cam arm & tapered park-pin engaging S15 stage socket!
    const latchArm = new THREE.Mesh(new THREE.BoxGeometry(7.2, 2.4, 1.4), mats.mountStainlessFlange);
    latchArm.position.set(3.4, 0, 0.4);
    g.add(latchArm);

    const parkPin = new THREE.Mesh(
      new THREE.CylinderGeometry(1.45, 2.1, 3.2, 16).rotateX(Math.PI / 2),
      mats.brassGear
    );
    parkPin.position.set(0.0, 0.0, 1.85);
    g.add(parkPin);

    // Micro drive wire tail
    const solFpc = new THREE.Mesh(new THREE.BoxGeometry(3.2, 9.0, 0.28), mats.polyimideFpc);
    solFpc.position.set(-6.5, -5.5, -0.5);
    g.add(solFpc);

    parts.push(
      finalizePart(
        'sensor-ibis-lock',
        20,
        '#f59e0b',
        g,
        new THREE.Vector3(-30.5, 21.5, -6.1),
        new THREE.Vector3(-26, 22, -80),
        new THREE.Vector3(-46, 34, -78.9),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S21. [NEW!] 3x Dual-Pole N52 Neodymium Magnet Arrays & Back Yokes (z = -6.05 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const magConfigs: Array<{ x: number; y: number; w: number; h: number; vertical: boolean }> = [
      { x: -16.5, y: -24.0, w: 22.0, h: 11.2, vertical: false },
      { x: 16.5, y: -24.0, w: 22.0, h: 11.2, vertical: false },
      { x: 30.8, y: 4.5, w: 11.2, h: 23.5, vertical: true },
    ];

    for (const mc of magConfigs) {
      const yoke = new THREE.Mesh(
        new THREE.BoxGeometry(mc.w + 1.4, mc.h + 1.4, 0.9),
        mats.softIronYoke
      );
      yoke.position.set(mc.x, mc.y, -0.3);
      g.add(yoke);

      if (!mc.vertical) {
        const halfH = mc.h * 0.46;
        const m1 = new THREE.Mesh(
          new THREE.BoxGeometry(mc.w - 0.6, halfH, 1.25),
          mats.neodymiumMagnet
        );
        m1.position.set(mc.x, mc.y + halfH * 0.54, 0.5);
        const m2 = new THREE.Mesh(
          new THREE.BoxGeometry(mc.w - 0.6, halfH, 1.25),
          mats.neodymiumMagnet
        );
        m2.position.set(mc.x, mc.y - halfH * 0.54, 0.5);
        g.add(m1, m2);
      } else {
        const halfW = mc.w * 0.46;
        const m1 = new THREE.Mesh(
          new THREE.BoxGeometry(halfW, mc.h - 0.6, 1.25),
          mats.neodymiumMagnet
        );
        m1.position.set(mc.x - halfW * 0.54, mc.y, 0.5);
        const m2 = new THREE.Mesh(
          new THREE.BoxGeometry(halfW, mc.h - 0.6, 1.25),
          mats.neodymiumMagnet
        );
        m2.position.set(mc.x + halfW * 0.54, mc.y, 0.5);
        g.add(m1, m2);
      }
    }

    parts.push(
      finalizePart(
        'sensor-n52-magnets',
        21,
        '#3b82f6',
        g,
        new THREE.Vector3(0, 0, -6.05),
        new THREE.Vector3(0, 0, -86),
        new THREE.Vector3(0, 0, -79.45),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S22. Stationary Rigid Magnesium IBIS Base Chassis (z = -7.40 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const baseShape = createFrameShape(82.0, 68.0, 6.0, 38.0, 28.0, 3.0);
    addCircleHoles(baseShape, [
      [-36.0, 29.0, 2.1],
      [36.0, 29.0, 2.1],
      [0.0, -30.5, 2.1],
    ]);
    g.add(
      new THREE.Mesh(
        extrudeCentered(baseShape, 1.9, 0.16, 0.16, 24),
        mats.magnesiumCast
      )
    );

    parts.push(
      finalizePart(
        'ibis-base-magnets',
        22,
        '#96a0ae',
        g,
        new THREE.Vector3(0, 0, -7.4),
        new THREE.Vector3(0, 0, -98),
        new THREE.Vector3(0, 0, -85.1),
        cp,
        { ibisMovable: false, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S23. [NEW!] 3-Point Micron Flange-Back Tilt Calibration Springs & Bolts (z = -7.40 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const calibPts: Array<[number, number]> = [
      [-36.0, 29.0],
      [36.0, 29.0],
      [0.0, -30.5],
    ];
    for (const [cx, cy] of calibPts) {
      const spring = new THREE.Mesh(
        createHelicalSpringGeometry(3.1, 5.2, 5.5, 0.38),
        mats.stainlessMachined
      );
      spring.position.set(cx, cy, 3.2);
      spring.userData.noEdges = true;
      g.add(spring);

      // Precision brass thrust calibration shim washer
      const washer = new THREE.Mesh(
        new THREE.CylinderGeometry(3.6, 3.6, 0.45, 20).rotateX(Math.PI / 2),
        mats.brassGear
      );
      washer.position.set(cx, cy, 1.25);
      g.add(washer);

      const screw = createPrecisionScrew(2.2, 0.85, 7.0, mats.stainlessMachined);
      screw.position.set(cx, cy, -1.0);
      screw.rotation.y = Math.PI;
      g.add(screw);
    }

    parts.push(
      finalizePart(
        'sensor-tilt-springs',
        23,
        '#ca8a04',
        g,
        new THREE.Vector3(0, 0, -7.4),
        new THREE.Vector3(0, 0, -110),
        new THREE.Vector3(0, 0, -91.1),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S24. [NEW!] High-Conductivity Silicone TIM Thermal Interface Pad (z = -3.75 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const timShape = createRoundedRectShape(28.0, 20.0, 1.6);
    const timPad = new THREE.Mesh(
      extrudeCentered(timShape, 1.1, 0.14, 0.14, 14),
      mats.thermalPadTim
    );
    g.add(timPad);

    // Subtle micro-embossed checkerboard surface contact dimples (InstancedMesh!)
    const dimpleGeo = new THREE.BoxGeometry(2.6, 2.2, 0.12);
    const dimples = new THREE.InstancedMesh(dimpleGeo, mats.thermalPadTim, 24);
    let di = 0;
    for (let ix = 0; ix < 6; ix++) {
      for (let iy = 0; iy < 4; iy++) {
        dummy.position.set(-10.0 + ix * 4.0, -6.0 + iy * 4.0, 0.56);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        dimples.setMatrixAt(di++, dummy.matrix);
      }
    }
    dimples.instanceMatrix.needsUpdate = true;
    g.add(dimples);

    parts.push(
      finalizePart(
        'sensor-tim-pad',
        24,
        '#60a5fa',
        g,
        new THREE.Vector3(0, 0, -3.75),
        new THREE.Vector3(0, 0, -122),
        new THREE.Vector3(0, 0, -97.75),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S25. Σ-Folded Pyrolytic Graphite Thermal Bridge Sheet (z = -7.30 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Centered cleanly around z = -7.30 mm (local +2.90 contacts TIM rear -4.30; local -2.85 contacts Copper sink -10.20)
    const width = 26.0;
    const thick = 0.36;
    const pts: Array<[number, number]> = [
      [0.0, 2.9],
      [0.0, 1.8],
      [7.5, 1.1],
      [8.6, 0.1],
      [6.8, -0.7],
      [-7.2, -1.2],
      [-8.6, -2.0],
      [-6.6, -2.75],
      [0.0, -2.85],
    ];
    const curve = new THREE.SplineCurve(pts.map(([y, z]) => new THREE.Vector2(y, z)));
    const samples = curve.getPoints(44);
    const upper: THREE.Vector2[] = [];
    const lower: THREE.Vector2[] = [];
    for (let i = 0; i < samples.length; i++) {
      const prev = samples[Math.max(0, i - 1)];
      const next = samples[Math.min(samples.length - 1, i + 1)];
      const t = new THREE.Vector2().subVectors(next, prev).normalize();
      const n = new THREE.Vector2(-t.y, t.x);
      upper.push(samples[i].clone().addScaledVector(n, thick * 0.5));
      lower.push(samples[i].clone().addScaledVector(n, -thick * 0.5));
    }

    const shapeZY = new THREE.Shape();
    shapeZY.moveTo(upper[0].y, upper[0].x);
    for (let i = 1; i < upper.length; i++) shapeZY.lineTo(upper[i].y, upper[i].x);
    for (let i = lower.length - 1; i >= 0; i--) shapeZY.lineTo(lower[i].y, lower[i].x);
    shapeZY.closePath();

    const sigmaGeo = new THREE.ExtrudeGeometry(shapeZY, { depth: width, bevelEnabled: false });
    sigmaGeo.translate(0, 0, -width / 2);
    sigmaGeo.rotateY(-Math.PI / 2);
    sigmaGeo.computeVertexNormals();
    g.add(new THREE.Mesh(sigmaGeo, mats.pyroGraphite));

    parts.push(
      finalizePart(
        'sigma-graphite',
        25,
        '#334155',
        g,
        new THREE.Vector3(0, 0, -7.3),
        new THREE.Vector3(0, 0, -134),
        new THREE.Vector3(0, 0, -99.2),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S26. [NEW!] Rear Pure-Copper Micro-Fin Heatsink & Graphite Spreader (z = -10.85 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const cuShape = createRoundedRectShape(48.0, 36.0, 3.0);
    const cuPlate = new THREE.Mesh(
      extrudeCentered(cuShape, 1.1, 0.1, 0.1, 16),
      mats.copperHeatSpreader
    );
    g.add(cuPlate);

    // 17 Micro-machined pure-copper dissipation fins on rear face (InstancedMesh!)
    const finGeo = new THREE.BoxGeometry(0.95, 31.0, 0.92);
    const fins = new THREE.InstancedMesh(finGeo, mats.copperHeatSpreader, 17);
    for (let i = 0; i < 17; i++) {
      dummy.position.set((-8 + i) * 2.5, 0, -0.92);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      fins.setMatrixAt(i, dummy.matrix);
    }
    fins.instanceMatrix.needsUpdate = true;
    g.add(fins);

    // Front laminated graphite thermal spreading foil interfacing S25 Sigma Bridge
    const foilShape = createRoundedRectShape(38.0, 26.0, 2.0);
    const foil = new THREE.Mesh(
      extrudeCentered(foilShape, 0.18, 0.02, 0.02, 12),
      mats.pyroGraphite
    );
    foil.position.z = 0.64;
    g.add(foil);

    parts.push(
      finalizePart(
        'sensor-copper-sink',
        26,
        '#c86b3c',
        g,
        new THREE.Vector3(0, 0, -10.85),
        new THREE.Vector3(0, 0, -148),
        new THREE.Vector3(0, 0, -102.15),
        cp,
        { ibisMovable: false, edgeOpacity: 0.22 }
      )
    );
  }

  return parts;
}
