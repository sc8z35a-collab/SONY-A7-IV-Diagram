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
    integratedExplodeOffset: new THREE.Vector3(
      explodeOffset.x,
      explodeOffset.y,
      explodeOffset.z * 0.75 - 30
    ),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: MACRO_EXPLANATIONS[id],
    ibisMovable: options?.ibisMovable,
    ultrasonicElement: options?.ultrasonicElement,
  };
}

export function buildMacroSensorParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // 01. Optical Aperture Mask & Dust-Seal Bezel (z = +7.8 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Main matte black anodized aluminum aperture bezel
    const bezelShape = createFrameShape(50.0, 40.0, 3.0, 38.0, 26.0, 0.8);
    addCircleHoles(bezelShape, [
      [-21.5, 16.5, 1.3],
      [21.5, 16.5, 1.3],
      [-21.5, -16.5, 1.3],
      [21.5, -16.5, 1.3],
    ]);
    const bezelMesh = new THREE.Mesh(
      extrudeCentered(bezelShape, 1.2, 0.14, 0.14, 24),
      mats.matteBlackAnodized
    );
    g.add(bezelMesh);

    // Stepped stray-light knife-edge baffle ring (inner lip)
    const baffleShape = createFrameShape(39.4, 27.4, 0.9, 36.6, 24.6, 0.4);
    const baffleMesh = new THREE.Mesh(
      extrudeCentered(baffleShape, 0.55, 0.08, 0.12, 16),
      mats.matteBlackAnodized
    );
    baffleMesh.position.z = 0.55;
    g.add(baffleMesh);

    // EPDM dust-seal foam gasket on rear face
    const gasketShape = createFrameShape(47.2, 37.2, 2.4, 39.2, 27.2, 1.0);
    const gasketMesh = new THREE.Mesh(
      extrudeCentered(gasketShape, 0.42, 0.04, 0.04, 18),
      mats.epdmGasket
    );
    gasketMesh.position.z = -0.78;
    g.add(gasketMesh);

    // Four precision M1.6 stainless fastening screws
    const screwPositions: Array<[number, number]> = [
      [-21.5, 16.5],
      [21.5, 16.5],
      [-21.5, -16.5],
      [21.5, -16.5],
    ];
    for (const [sx, sy] of screwPositions) {
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
        new THREE.Vector3(0, 0, 46),
        cp,
        { ibisMovable: true, edgeOpacity: 0.25 }
      )
    );
  }

  // =========================================================================
  // 02. Ultrasonic Piezoelectric Dust Reduction Filter (SSWF / PZT) (z = +6.2 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Ultra-thin AR / fluorine-coated optical filter glass plate
    const glassShape = createRoundedRectShape(43.2, 31.2, 0.6);
    const glassMesh = new THREE.Mesh(
      extrudeCentered(glassShape, 0.55, 0.06, 0.06, 12),
      mats.sswfGlass
    );
    glassMesh.userData.edgeOpacity = 0.42;
    g.add(glassMesh);

    // Subtle metallic anti-static ITO perimeter border frame
    const itoFrame = createFrameShape(43.1, 31.1, 0.6, 40.4, 28.4, 0.3);
    const itoMesh = new THREE.Mesh(
      extrudeCentered(itoFrame, 0.08, 0, 0, 12),
      mats.silverElectrode
    );
    itoMesh.position.z = 0.29;
    g.add(itoMesh);

    // Multi-layer Piezoelectric Ceramic Actuator Bar (PZT) bonded at bottom edge
    const pztBar = new THREE.Mesh(new THREE.BoxGeometry(36.0, 2.7, 0.85), mats.pztCeramic);
    pztBar.position.set(0, -14.1, 0.68);
    g.add(pztBar);

    // Silver driving electrodes on PZT
    const elecL = new THREE.Mesh(new THREE.BoxGeometry(16.2, 2.35, 0.12), mats.silverElectrode);
    elecL.position.set(-8.6, -14.1, 1.12);
    const elecR = new THREE.Mesh(new THREE.BoxGeometry(16.2, 2.35, 0.12), mats.silverElectrode);
    elecR.position.set(8.6, -14.1, 1.12);
    g.add(elecL, elecR);

    // Micro polyimide drive lead ribbon exiting right side of PZT
    const leadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(17.5, -14.1, 0.9),
      new THREE.Vector3(21.5, -14.1, 0.7),
      new THREE.Vector3(23.5, -13.4, -0.4),
      new THREE.Vector3(24.0, -11.8, -1.6),
    ]);
    const leadTube = new THREE.Mesh(
      new THREE.TubeGeometry(leadCurve, 24, 0.34, 8, false),
      mats.polyimideFpc
    );
    g.add(leadTube);

    // 4 silicone elastic vibration dampers holding nodal corners
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
        new THREE.Vector3(0, 0, 38),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.35 }
      )
    );
  }

  // =========================================================================
  // 03. 16-Point Gaussian-Distribution Birefringent Quartz OLPF (z = +4.65 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Single crystal-clear synthetic quartz optical core (avoids multi-layer white opacity haze)
    const coreShape = createRoundedRectShape(40.2, 28.2, 0.4);
    const corePlate = new THREE.Mesh(
      extrudeCentered(coreShape, 1.24, 0.05, 0.05, 12),
      mats.quartzOlpf
    );
    corePlate.userData.edgeOpacity = 0.42;
    g.add(corePlate);

    // 4 laminated quartz plate perimeter optical-cement seams (H-d1, V-d1, +45°-d2, -45°-d2)
    for (const lz of [0.46, 0.15, -0.15, -0.46]) {
      const seamFrame = createFrameShape(40.85, 28.85, 0.5, 39.75, 27.75, 0.32);
      const seamMesh = new THREE.Mesh(
        extrudeCentered(seamFrame, 0.26, 0.02, 0.02, 12),
        mats.quartzEdge
      );
      seamMesh.position.z = lz;
      seamMesh.userData.edgeOpacity = 0.36;
      g.add(seamMesh);
    }

    // Subtle crystal optical axis orientation notch on upper-right chamfer
    const notch = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 1.36), mats.matteBlackAnodized);
    notch.position.set(19.6, 14.3, 0);
    g.add(notch);

    parts.push(
      finalizePart(
        'olpf-16pt',
        3,
        '#79b7cf',
        g,
        new THREE.Vector3(0, 0, 4.65),
        new THREE.Vector3(0, 0, 30),
        cp,
        { ibisMovable: true, edgeOpacity: 0.34 }
      )
    );
  }

  // =========================================================================
  // 04. Hybrid Phosphate IR-Absorption + Dichroic Multilayer IR/UV Cut Filter (z = +3.25 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Cyan-blue Cu2+ doped phosphate infrared-absorbing glass body
    const irShape = createRoundedRectShape(40.0, 28.0, 0.45);
    const irMesh = new THREE.Mesh(
      extrudeCentered(irShape, 0.72, 0.06, 0.06, 12),
      mats.irCutGlass
    );
    irMesh.userData.edgeOpacity = 0.48;
    g.add(irMesh);

    // Precision black spacer gasket ring surrounding filter
    const spacerShape = createFrameShape(42.2, 30.2, 0.8, 40.05, 28.05, 0.45);
    const spacerMesh = new THREE.Mesh(
      extrudeCentered(spacerShape, 0.78, 0.04, 0.04, 14),
      mats.matteBlackAnodized
    );
    g.add(spacerMesh);

    parts.push(
      finalizePart(
        'ir-cut-filter',
        4,
        '#38b2da',
        g,
        new THREE.Vector3(0, 0, 3.25),
        new THREE.Vector3(0, 0, 22),
        cp,
        { ibisMovable: true, edgeOpacity: 0.36 }
      )
    );
  }

  // =========================================================================
  // 05. Low-Alpha AR Cover Glass & Kovar Hermetic Seal Ring (z = +2.05 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Low-alpha borosilicate optical cover window
    const winShape = createRoundedRectShape(43.8, 33.4, 0.5);
    const winMesh = new THREE.Mesh(
      extrudeCentered(winShape, 0.52, 0.04, 0.04, 12),
      mats.coverGlass
    );
    winMesh.userData.edgeOpacity = 0.38;
    g.add(winMesh);

    // Kovar (Fe-Ni-Co) hermetic brazing seal ring matching ceramic CTE
    const sealShape = createFrameShape(47.4, 36.8, 1.4, 42.2, 31.8, 0.6);
    const sealMesh = new THREE.Mesh(
      extrudeCentered(sealShape, 0.62, 0.07, 0.07, 16),
      mats.kovarSeal
    );
    sealMesh.position.z = -0.1;
    g.add(sealMesh);

    // Gold-plated inner seal lip
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
        5,
        '#8c99a8',
        g,
        new THREE.Vector3(0, 0, 2.05),
        new THREE.Vector3(0, 0, 14),
        cp,
        { ibisMovable: true, edgeOpacity: 0.32 }
      )
    );
  }

  // =========================================================================
  // 06. Full-Frame 3D-Stacked Global Shutter BSI-CMOS Silicon Die (z = +0.55 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Top layer: Thinned BSI Photodiode & 2-Layer Transistor Pixel Wafer (40.4 x 28.4 mm, active 36 x 24 mm)
    const pixelDieGeo = new THREE.BoxGeometry(40.4, 28.4, 0.28);
    const pixelDieMats = [
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconBulk,
      mats.siliconSensorDie, // +Z front active imaging surface with diffraction & bond pads
      mats.siliconBulk,
    ];
    const pixelDie = new THREE.Mesh(pixelDieGeo, pixelDieMats);
    pixelDie.position.z = 0.42;
    g.add(pixelDie);

    // Cu-Cu Direct Hybrid Bonding Interconnect Interface Layer (visible copper seam on edges & cross-section)
    const cucuLayer = new THREE.Mesh(
      new THREE.BoxGeometry(40.3, 28.3, 0.14),
      mats.copperHybridBond
    );
    cucuLayer.position.z = 0.21;
    g.add(cucuLayer);

    // Middle layer: High-Speed Logic / Column-Parallel ADC / CDS / DCG-LOFIC Die
    const logicDie = new THREE.Mesh(
      new THREE.BoxGeometry(40.4, 28.4, 0.34),
      mats.siliconLogicLayer
    );
    logicDie.position.z = -0.03;
    g.add(logicDie);

    // Second Cu-Cu interconnect seam between Logic and DRAM
    const cucuLayer2 = new THREE.Mesh(
      new THREE.BoxGeometry(40.25, 28.25, 0.10),
      mats.copperHybridBond
    );
    cucuLayer2.position.z = -0.25;
    g.add(cucuLayer2);

    // Bottom layer: Ultra-High-Bandwidth Stacked DRAM Frame Buffer Die (for 120fps Global Shutter)
    const dramDie = new THREE.Mesh(
      new THREE.BoxGeometry(40.4, 28.4, 0.34),
      mats.siliconDramLayer
    );
    dramDie.position.z = -0.47;
    g.add(dramDie);

    // Subtle metallic die-attach silver-filled epoxy layer underneath
    const dieAttach = new THREE.Mesh(
      new THREE.BoxGeometry(39.6, 27.6, 0.08),
      mats.silverElectrode
    );
    dieAttach.position.z = -0.68;
    g.add(dieAttach);

    parts.push(
      finalizePart(
        'cmos-die',
        6,
        '#1d6d7c',
        g,
        new THREE.Vector3(0, 0, 0.55),
        new THREE.Vector3(0, 0, 6.5),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // 07. 99.99% Au Ultra-Low-Loop Gold Wire Bonding Array (z = +0.55 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Build delicate catenary arches connecting die perimeter pads to ceramic bonding shelf
    const archSegments: THREE.TubeGeometry[] = [];
    const buildArch = (p0: THREE.Vector3, p1: THREE.Vector3, peakZ: number) => {
      const mid1 = p0.clone().lerp(p1, 0.28);
      mid1.z = peakZ;
      const mid2 = p0.clone().lerp(p1, 0.72);
      mid2.z = peakZ - 0.08;
      const curve = new THREE.CatmullRomCurve3([p0, mid1, mid2, p1]);
      return new THREE.TubeGeometry(curve, 10, 0.048, 5, false);
    };

    // Top & bottom wire arrays (42 wires each side)
    const xCount = 42;
    for (let i = 0; i < xCount; i++) {
      const t = i / (xCount - 1);
      const x = -18.2 + t * 36.4;
      // Top edge
      archSegments.push(
        buildArch(
          new THREE.Vector3(x, 13.75, 0.56),
          new THREE.Vector3(x * 1.045, 16.05, 0.16),
          0.96
        )
      );
      // Bottom edge
      archSegments.push(
        buildArch(
          new THREE.Vector3(x, -13.75, 0.56),
          new THREE.Vector3(x * 1.045, -16.05, 0.16),
          0.96
        )
      );
    }

    // Left & right wire arrays (28 wires each side)
    const yCount = 28;
    for (let i = 0; i < yCount; i++) {
      const t = i / (yCount - 1);
      const y = -12.2 + t * 24.4;
      // Left edge
      archSegments.push(
        buildArch(
          new THREE.Vector3(-19.75, y, 0.56),
          new THREE.Vector3(-21.95, y * 1.05, 0.16),
          0.96
        )
      );
      // Right edge
      archSegments.push(
        buildArch(
          new THREE.Vector3(19.75, y, 0.56),
          new THREE.Vector3(21.95, y * 1.05, 0.16),
          0.96
        )
      );
    }

    // Merge all gold wire tubes into a single ultra-fast BufferGeometry
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
        7,
        '#e3b952',
        g,
        new THREE.Vector3(0, 0, 0.55),
        new THREE.Vector3(0, 0, 2.0),
        cp,
        { ibisMovable: true }
      )
    );
  }

  // =========================================================================
  // 08. HTCC 12-Layer Alumina Ceramic LGA Package (z = -0.55 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Base ceramic substrate floor
    const baseShape = createRoundedRectShape(49.2, 38.6, 1.8);
    const baseMesh = new THREE.Mesh(
      extrudeCentered(baseShape, 1.1, 0.12, 0.12, 18),
      mats.ceramicAlumina
    );
    baseMesh.position.z = -0.55;
    g.add(baseMesh);

    // Stepped inner wire-bonding shelf wall (middle tier)
    const shelfShape = createFrameShape(49.2, 38.6, 1.8, 41.6, 29.6, 0.7);
    const shelfMesh = new THREE.Mesh(
      extrudeCentered(shelfShape, 1.1, 0.08, 0.08, 18),
      mats.ceramicAlumina
    );
    shelfMesh.position.z = 0.55;
    g.add(shelfMesh);

    // Outer raised seal wall (upper tier)
    const upperWallShape = createFrameShape(49.2, 38.6, 1.8, 45.2, 34.4, 1.0);
    const upperWall = new THREE.Mesh(
      extrudeCentered(upperWallShape, 0.95, 0.08, 0.08, 18),
      mats.ceramicAlumina
    );
    upperWall.position.z = 1.5;
    g.add(upperWall);

    // Gold-plated wire-bonding shelf finger pads (around inner cavity perimeter)
    const fingerGeo = new THREE.BoxGeometry(0.45, 1.25, 0.08);
    const fingerMats = mats.goldPlating;
    const fingerDummy = new THREE.Object3D();
    const fingerTotal = 42 * 2 + 28 * 2;
    const fingers = new THREE.InstancedMesh(fingerGeo, fingerMats, fingerTotal);
    let fi = 0;
    for (let i = 0; i < 42; i++) {
      const x = -19.0 + (i / 41) * 38.0;
      fingerDummy.position.set(x, 16.05, 1.14);
      fingerDummy.rotation.set(0, 0, 0);
      fingerDummy.updateMatrix();
      fingers.setMatrixAt(fi++, fingerDummy.matrix);

      fingerDummy.position.set(x, -16.05, 1.14);
      fingerDummy.updateMatrix();
      fingers.setMatrixAt(fi++, fingerDummy.matrix);
    }
    for (let i = 0; i < 28; i++) {
      const y = -12.8 + (i / 27) * 25.6;
      fingerDummy.position.set(-21.95, y, 1.14);
      fingerDummy.rotation.set(0, 0, Math.PI / 2);
      fingerDummy.updateMatrix();
      fingers.setMatrixAt(fi++, fingerDummy.matrix);

      fingerDummy.position.set(21.95, y, 1.14);
      fingerDummy.updateMatrix();
      fingers.setMatrixAt(fi++, fingerDummy.matrix);
    }
    fingers.instanceMatrix.needsUpdate = true;
    g.add(fingers);

    // Tungsten-Copper (CuW) central thermal slug embedded in cavity floor
    const slug = new THREE.Mesh(new THREE.BoxGeometry(36.0, 24.0, 1.14), mats.tungstenCopper);
    slug.position.z = -0.55;
    g.add(slug);

    // Rear Gold LGA Land Grid Array contact pads (perimeter 2 rows on -Z face)
    const padGeo = new THREE.BoxGeometry(1.1, 1.1, 0.08);
    const padCoords: Array<[number, number]> = [];
    for (let x = -22; x <= 22; x += 2.2) {
      for (const y of [-17.2, -15.2, 15.2, 17.2]) {
        padCoords.push([x, y]);
      }
    }
    for (let y = -13; y <= 13; y += 2.2) {
      for (const x of [-22.4, -20.4, 20.4, 22.4]) {
        padCoords.push([x, y]);
      }
    }
    const lgaPads = new THREE.InstancedMesh(padGeo, mats.goldPlating, padCoords.length);
    const padDummy = new THREE.Object3D();
    padCoords.forEach(([px, py], idx) => {
      padDummy.position.set(px, py, -1.14);
      padDummy.updateMatrix();
      lgaPads.setMatrixAt(idx, padDummy.matrix);
    });
    lgaPads.instanceMatrix.needsUpdate = true;
    g.add(lgaPads);

    parts.push(
      finalizePart(
        'ceramic-package',
        8,
        '#3e424c',
        g,
        new THREE.Vector3(0, 0, -0.55),
        new THREE.Vector3(0, 0, -5.5),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // 09. Multi-Layer Sensor Main PCB & Analog/Digital Power Stage (z = -2.45 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    const pcbGeo = new THREE.BoxGeometry(56.0, 45.0, 1.25);
    const pcbMaterials = [
      mats.pcbSide,
      mats.pcbSide,
      mats.pcbSide,
      mats.pcbSide,
      mats.sensorPcb,
      mats.sensorPcb,
    ];
    const pcbBoard = new THREE.Mesh(pcbGeo, pcbMaterials);
    g.add(pcbBoard);

    // Precision corner mounting gold rings
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

    // Rear SMD components (-Z face): Ultra-low-noise LDO regulators & clock generator
    const icSpecs: Array<[number, number, number, number, number]> = [
      [-17.5, 13.0, 4.6, 4.6, 0.72], // Analog Pixel LDO 2.8V
      [-17.5, -13.0, 4.6, 4.6, 0.72], // Analog ADC Ref LDO 2.2V
      [17.5, 13.0, 5.2, 4.2, 0.72], // Digital Logic PMIC 1.2V
      [17.5, -13.0, 4.2, 4.2, 0.68], // Temp Sensor / Serial Ctrl IC
    ];
    for (const [ix, iy, iw, ih, iz] of icSpecs) {
      const ic = new THREE.Mesh(new THREE.BoxGeometry(iw, ih, iz), mats.icEpoxy);
      ic.position.set(ix, iy, -0.625 - iz / 2);
      g.add(ic);
    }

    // Precision Quartz Crystal Oscillator (Metal Can)
    const xtal = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.5, 0.65), mats.silverElectrode);
    xtal.position.set(0, 16.5, -0.95);
    g.add(xtal);

    // High-density MLCC decoupling capacitor arrays (48 capacitors around power rails)
    const capBodyGeo = new THREE.BoxGeometry(1.1, 0.6, 0.55);
    const capCoords: Array<[number, number, number]> = [];
    for (let i = 0; i < 12; i++) {
      const x = -11.0 + i * 2.0;
      capCoords.push([x, 12.6, 0]);
      capCoords.push([x, -12.6, 0]);
    }
    for (let i = 0; i < 12; i++) {
      const y = -9.9 + i * 1.8;
      capCoords.push([-14.5, y, Math.PI / 2]);
      capCoords.push([14.5, y, Math.PI / 2]);
    }
    const caps = new THREE.InstancedMesh(capBodyGeo, mats.smdCeramic, capCoords.length);
    const capDummy = new THREE.Object3D();
    capCoords.forEach(([cx, cy, rot], idx) => {
      capDummy.position.set(cx, cy, -0.9);
      capDummy.rotation.set(0, 0, rot);
      capDummy.updateMatrix();
      caps.setMatrixAt(idx, capDummy.matrix);
    });
    caps.instanceMatrix.needsUpdate = true;
    g.add(caps);

    // Left & Right High-Speed SLVS-EC Board-to-FPC Connectors (on -Z face)
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
        9,
        '#1b5649',
        g,
        new THREE.Vector3(0, 0, -2.45),
        new THREE.Vector3(0, 0, -15.5),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // 10. SLVS-EC v3 High-Speed Shielded Flex PCB Harness (z = -2.45 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Build symmetrical low-stiffness U-loop ribbon flex harnesses on Left (-X) & Right (+X)
    const buildFlexRibbon = (side: -1 | 1) => {
      const ribbonGroup = new THREE.Group();
      const width = 18.6;
      const thickness = 0.24;

      // Cross-section path in X-Z plane extruded along Y
      const pts: Array<[number, number]> = [
        [side * 24.4, -1.45],
        [side * 31.0, -1.45],
        [side * 35.8, -2.2],
        [side * 37.8, -4.3],
        [side * 37.2, -6.9],
        [side * 34.4, -8.3],
        [side * 29.8, -8.4],
      ];

      // Construct thick ribbon shape in X-Z by offsetting curve normals
      const curvePts = pts.map(([x, z]) => new THREE.Vector2(x, z));
      const spline = new THREE.SplineCurve(curvePts);
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
      // Map X->X, Y(shape)->Z, Z(extrude)->Y
      extrudeGeo.translate(0, 0, -width / 2);
      extrudeGeo.rotateX(Math.PI / 2);
      extrudeGeo.computeVertexNormals();

      const fpcMesh = new THREE.Mesh(extrudeGeo, mats.polyimideFpc);
      ribbonGroup.add(fpcMesh);

      // Black EMI electromagnetic shield tape laminated onto outer bend section
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
      const shieldMesh = new THREE.Mesh(shieldGeo, mats.emiShieldFilm);
      ribbonGroup.add(shieldMesh);

      // Gold-plated terminal stiffener & high-speed connector header at motherboard end
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
        10,
        '#c96b1c',
        g,
        new THREE.Vector3(0, 0, -2.45),
        new THREE.Vector3(0, 0, -21.0),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // 11. 5-Axis IBIS Movable Magnesium Carrier & Flat Voice Coils + Hall ICs (z = -4.3 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision die-cast magnesium alloy movable carrier plate with weight-reduction cutout
    const carrierShape = createFrameShape(76.0, 62.0, 5.0, 44.0, 32.0, 2.5);
    // Corner relief pockets & mounting holes
    addCircleHoles(carrierShape, [
      [-33.0, 26.0, 2.2],
      [33.0, 26.0, 2.2],
      [-33.0, -26.0, 2.2],
      [33.0, -26.0, 2.2],
    ]);
    const carrierMesh = new THREE.Mesh(
      extrudeCentered(carrierShape, 1.65, 0.14, 0.14, 24),
      mats.magnesiumCast
    );
    g.add(carrierMesh);

    // 4 raised precision mounting bosses interfacing to Sensor PCB corners
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

    // --- 3 Flat Air-Core Copper Voice Coil Motors (VCM) ---
    // Y1 (bottom-left), Y2 (bottom-right) -> Y-translation & Roll rotation
    // X1 (right vertical) -> X-translation
    const coilConfigs: Array<{ x: number; y: number; w: number; h: number; rotZ: number }> = [
      { x: -16.5, y: -24.0, w: 20.5, h: 9.8, rotZ: 0 }, // Y1 / Roll Left
      { x: 16.5, y: -24.0, w: 20.5, h: 9.8, rotZ: 0 }, // Y2 / Roll Right
      { x: 30.8, y: 4.5, w: 9.8, h: 22.0, rotZ: 0 }, // X-Axis Actuator
    ];

    for (const cfg of coilConfigs) {
      const winding = Math.min(cfg.w, cfg.h) * 0.28;
      const coilGeo = createVoiceCoilGeometry(cfg.w, cfg.h, winding, 1.35);
      const coilMesh = new THREE.Mesh(coilGeo, mats.copperCoil);
      coilMesh.position.set(cfg.x, cfg.y, -0.78);
      coilMesh.rotation.z = cfg.rotZ;
      g.add(coilMesh);

      // High-precision Hall-Effect Magnetic Position Sensor IC centered inside air core
      const hallIc = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 0.72), mats.icEpoxy);
      hallIc.position.set(cfg.x, cfg.y, -0.75);
      g.add(hallIc);

      // Gold micro-leads on Hall sensor
      const hallLeads = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 0.16), mats.goldPlating);
      hallLeads.position.set(cfg.x, cfg.y, -0.92);
      g.add(hallLeads);
    }

    // Left counterbalance brass/steel mass trim & FPC routing tab
    const balanceWeight = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, 18.0, 1.1),
      mats.tungstenCopper
    );
    balanceWeight.position.set(-30.8, 4.5, -0.5);
    g.add(balanceWeight);

    // Thin VCM flex interconnect trace bus along lower edge
    const vcmFlex = new THREE.Mesh(new THREE.BoxGeometry(58.0, 2.2, 0.16), mats.polyimideFpc);
    vcmFlex.position.set(4.0, -18.2, -0.88);
    g.add(vcmFlex);

    parts.push(
      finalizePart(
        'ibis-carrier',
        11,
        '#c86432',
        g,
        new THREE.Vector3(0, 0, -4.3),
        new THREE.Vector3(0, 0, -31.0),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // 12. 3-Point Si3N4 Ceramic Ball Suspension & Magnetic Preload Guides (z = -5.7 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Kinematic 3-point equilateral-like triangle positions (guarantees zero Z-tilt play)
    const ballPositions: Array<[number, number]> = [
      [0.0, 25.5], // Top center
      [-28.5, -18.5], // Bottom left
      [28.5, -18.5], // Bottom right
    ];

    for (const [bx, by] of ballPositions) {
      // Ultra-precision Silicon Nitride (Si3N4) dark glossy ceramic bearing ball
      const ball = new THREE.Mesh(
        new THREE.SphereGeometry(1.38, 28, 20),
        mats.siliconNitrideBall
      );
      ball.position.set(bx, by, 0);
      ball.userData.noEdges = true;
      g.add(ball);

      // Upper hardened stainless rolling race disc (attaches to movable carrier)
      const raceGeo = new THREE.CylinderGeometry(3.8, 3.8, 0.36, 24);
      raceGeo.rotateX(Math.PI / 2);
      const upperRace = new THREE.Mesh(raceGeo, mats.stainlessMachined);
      upperRace.position.set(bx, by, 1.48);
      g.add(upperRace);

      // Lower hardened stainless rolling race cup with retention pocket ring
      const lowerRace = new THREE.Mesh(raceGeo, mats.stainlessMachined);
      lowerRace.position.set(bx, by, -1.48);
      g.add(lowerRace);

      const retainerRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.55, 0.32, 10, 28),
        mats.matteBlackAnodized
      );
      retainerRing.position.set(bx, by, -1.1);
      retainerRing.userData.noEdges = true;
      g.add(retainerRing);
    }

    // Ferromagnetic preload attraction plates (pull movable carrier cleanly onto the 3 ceramic spheres)
    const preloadPositions: Array<[number, number, number, number]> = [
      [-16.5, -24.0, 14.0, 5.2],
      [16.5, -24.0, 14.0, 5.2],
      [30.8, 4.5, 5.2, 14.0],
    ];
    for (const [px, py, pw, ph] of preloadPositions) {
      const plate = new THREE.Mesh(new THREE.BoxGeometry(pw, ph, 0.42), mats.softIronYoke);
      plate.position.set(px, py, 0.95);
      g.add(plate);
    }

    parts.push(
      finalizePart(
        'ceramic-balls',
        12,
        '#2c3240',
        g,
        new THREE.Vector3(0, 0, -5.7),
        new THREE.Vector3(0, 0, -45.5),
        cp,
        { ibisMovable: false, edgeOpacity: 0.25 }
      )
    );
  }

  // =========================================================================
  // 13. Stationary IBIS Base Chassis, N52 Neodymium Magnet Yokes & Flange-Back Calibrators (z = -7.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Rigid stationary chassis mounting plate with central thermal clearance window
    const baseShape = createFrameShape(82.0, 68.0, 6.0, 38.0, 28.0, 3.0);
    // 3 mounting ear holes for flange-back calibration screws
    addCircleHoles(baseShape, [
      [-36.0, 29.0, 2.1],
      [36.0, 29.0, 2.1],
      [0.0, -30.5, 2.1],
    ]);
    const basePlate = new THREE.Mesh(
      extrudeCentered(baseShape, 1.9, 0.16, 0.16, 24),
      mats.magnesiumCast
    );
    g.add(basePlate);

    // 3 Dual-Pole N52 Neodymium Permanent Magnet + Soft Iron Closed-Circuit Yoke Modules
    const magConfigs: Array<{ x: number; y: number; w: number; h: number; vertical: boolean }> = [
      { x: -16.5, y: -24.0, w: 22.0, h: 11.2, vertical: false },
      { x: 16.5, y: -24.0, w: 22.0, h: 11.2, vertical: false },
      { x: 30.8, y: 4.5, w: 11.2, h: 23.5, vertical: true },
    ];

    for (const mc of magConfigs) {
      // High-permeability soft-iron back yoke plate
      const yoke = new THREE.Mesh(
        new THREE.BoxGeometry(mc.w + 1.4, mc.h + 1.4, 0.9),
        mats.softIronYoke
      );
      yoke.position.set(mc.x, mc.y, 1.05);
      g.add(yoke);

      // Dual-pole N / S N52 Neodymium Magnet blocks (separated by narrow magnetic transition gap)
      if (!mc.vertical) {
        const halfH = mc.h * 0.46;
        const m1 = new THREE.Mesh(
          new THREE.BoxGeometry(mc.w - 0.6, halfH, 1.25),
          mats.neodymiumMagnet
        );
        m1.position.set(mc.x, mc.y + halfH * 0.54, 1.85);
        const m2 = new THREE.Mesh(
          new THREE.BoxGeometry(mc.w - 0.6, halfH, 1.25),
          mats.neodymiumMagnet
        );
        m2.position.set(mc.x, mc.y - halfH * 0.54, 1.85);
        g.add(m1, m2);
      } else {
        const halfW = mc.w * 0.46;
        const m1 = new THREE.Mesh(
          new THREE.BoxGeometry(halfW, mc.h - 0.6, 1.25),
          mats.neodymiumMagnet
        );
        m1.position.set(mc.x - halfW * 0.54, mc.y, 1.85);
        const m2 = new THREE.Mesh(
          new THREE.BoxGeometry(halfW, mc.h - 0.6, 1.25),
          mats.neodymiumMagnet
        );
        m2.position.set(mc.x + halfW * 0.54, mc.y, 1.85);
        g.add(m1, m2);
      }
    }

    // 3-Point Precision Flange-Back Calibration Helical Springs & Adjustment Bolts
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

      const screw = createPrecisionScrew(2.2, 0.85, 7.0, mats.stainlessMachined);
      screw.position.set(cx, cy, -1.0);
      screw.rotation.y = Math.PI; // head facing rear (-Z) for factory laser alignment
      g.add(screw);
    }

    parts.push(
      finalizePart(
        'ibis-base-magnets',
        13,
        '#96a0ae',
        g,
        new THREE.Vector3(0, 0, -7.4),
        new THREE.Vector3(0, 0, -60.0),
        cp,
        { ibisMovable: false, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // 14. Sigma-Shaped Pyro-Graphite Thermal Sheet & Copper Heat Spreader (z = -9.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Soft blue-grey Silicone Thermal Interface Material (TIM) pad contacting rear of Sensor PCB
    const timPad = new THREE.Mesh(
      new THREE.BoxGeometry(28.0, 20.0, 1.1),
      mats.thermalPadTim
    );
    timPad.position.set(0, 0, 5.85);
    g.add(timPad);

    // Signature Σ-Shaped (Sigma-Folded) Flexible Pyro-Graphite Thermal Bridge
    // Connects floating IBIS sensor PCB (+5.3 local z) to stationary rear copper heatsink (-0.4 local z)
    // without introducing mechanical stiffness that would degrade 5-axis stabilization
    const buildSigmaBridge = () => {
      const width = 26.0;
      const thick = 0.34;
      // Profile in Y-Z plane (extruded along X)
      const pts: Array<[number, number]> = [
        [0.0, 5.2],
        [0.0, 4.1],
        [7.5, 3.4],
        [8.6, 2.4],
        [6.8, 1.6],
        [-7.2, 1.1],
        [-8.6, 0.3],
        [-6.6, -0.45],
        [0.0, -0.55],
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
      const shape = new THREE.Shape();
      shape.moveTo(upper[0].x, upper[0].y);
      for (let i = 1; i < upper.length; i++) shape.lineTo(upper[i].x, upper[i].y);
      for (let i = lower.length - 1; i >= 0; i--) shape.lineTo(lower[i].x, lower[i].y);
      shape.closePath();

      const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false });
      geo.translate(0, 0, -width / 2);
      geo.dispose();

      const shapeZY = new THREE.Shape();
      shapeZY.moveTo(upper[0].y, upper[0].x);
      for (let i = 1; i < upper.length; i++) shapeZY.lineTo(upper[i].y, upper[i].x);
      for (let i = lower.length - 1; i >= 0; i--) shapeZY.lineTo(lower[i].y, lower[i].x);
      shapeZY.closePath();

      const sigmaGeo = new THREE.ExtrudeGeometry(shapeZY, { depth: width, bevelEnabled: false });
      sigmaGeo.translate(0, 0, -width / 2);
      sigmaGeo.rotateY(-Math.PI / 2);
      sigmaGeo.computeVertexNormals();
      return new THREE.Mesh(sigmaGeo, mats.pyroGraphite);
    };

    g.add(buildSigmaBridge());

    // Stationary Pure Copper Heat Spreader Plate mounted to rear chassis
    const cuShape = createRoundedRectShape(48.0, 36.0, 3.0);
    const cuPlate = new THREE.Mesh(
      extrudeCentered(cuShape, 1.1, 0.1, 0.1, 16),
      mats.copperHeatSpreader
    );
    cuPlate.position.z = -1.25;
    g.add(cuPlate);

    // Micro machined copper dissipation ribs on rear face
    for (let i = -8; i <= 8; i++) {
      const fin = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 31.0, 0.9),
        mats.copperHeatSpreader
      );
      fin.position.set(i * 2.5, 0, -2.15);
      g.add(fin);
    }

    // Rear laminated graphite thermal spreading foil over copper plate
    const foilShape = createRoundedRectShape(38.0, 26.0, 2.0);
    const foil = new THREE.Mesh(
      extrudeCentered(foilShape, 0.18, 0.02, 0.02, 12),
      mats.pyroGraphite
    );
    foil.position.z = -0.6;
    g.add(foil);

    parts.push(
      finalizePart(
        'sigma-graphite',
        14,
        '#c86b3c',
        g,
        new THREE.Vector3(0, 0, -9.6),
        new THREE.Vector3(0, 0, -76.0),
        cp,
        { ibisMovable: false, edgeOpacity: 0.22 }
      )
    );
  }

  return parts;
}
