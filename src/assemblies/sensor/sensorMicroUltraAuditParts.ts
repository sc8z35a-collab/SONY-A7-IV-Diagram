import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

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
    explanation: lazyExplanationStub(id),
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
    explanation: lazyExplanationStub(id),
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
    // Front 45-deg H-split synthetic quartz crystal plate + ground edge rim + H-axis gold datum notch
    const q1 = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(37.6, 25.6, 0.8), 0.34, 0.04, 0.04, 2, 18),
      mats.quartzOlpf
    );
    q1.position.z = 0.45;
    const q1Rim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(37.85, 25.85, 0.85, 37.0, 25.0, 0.7), 0.30, 0.02, 0.02, 1, 14),
      mats.quartzEdge
    );
    q1Rim.position.z = 0.45;
    q1Rim.userData.noEdges = true;
    const hTick = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.28, 0.12), mats.goldPlating);
    hTick.position.set(16.2, 12.2, 0.65);
    hTick.userData.noEdges = true;

    // Middle zero-order λ/4 depolarizer waveplate (iridescent circular-polarization conversion) + 45° tick
    const qwp = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(37.4, 25.4, 0.8), 0.14, 0.02, 0.02, 1, 16),
      mats.nanoArIridescent
    );
    const diagTick = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.24, 0.16), mats.goldPlating);
    diagTick.position.set(0, 12.1, 0.04);
    diagTick.rotation.z = Math.PI / 4;
    diagTick.userData.noEdges = true;

    // Rear V-split synthetic quartz crystal plate + ground edge rim + vertical-axis datum notch
    const q2 = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(37.6, 25.6, 0.8), 0.34, 0.04, 0.04, 2, 18),
      mats.quartzOlpf
    );
    q2.position.z = -0.45;
    const q2Rim = q1Rim.clone();
    q2Rim.position.z = -0.45;
    const vTick = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2.8, 0.12), mats.goldPlating);
    vTick.position.set(-17.8, 10.6, -0.65);
    vTick.userData.noEdges = true;

    // Dual optical cement seam fillets sandwiching the λ/4 waveplate
    for (const sz of [-0.20, 0.20]) {
      const seam = new THREE.Mesh(
        extrudeHiRes(createFrameShape(37.5, 25.5, 0.8, 36.9, 24.9, 0.7), 0.08, 0.01, 0.01, 1, 14),
        mats.opticalCementClear
      );
      seam.position.z = sz;
      seam.userData.noEdges = true;
      g.add(seam);
    }

    g.add(q1, q1Rim, hTick, qwp, diagTick, q2, q2Rim, vTick);

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
    // Deep cyan-blue Cu²⁺-doped CM500 fluorophosphate absorptive core with ground edge bezel
    const cm500 = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(37.8, 25.8, 0.8), 0.42, 0.05, 0.05, 2, 18),
      mats.irCutGlass
    );
    const edgeBevel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(38.1, 26.1, 0.85, 37.3, 25.3, 0.72), 0.36, 0.02, 0.02, 1, 14),
      mats.quartzEdge
    );
    edgeBevel.userData.noEdges = true;

    // Front 42-layer TiO2/SiO2 dielectric dichroic hot-mirror film + rear broadband AR stratum
    const dichroicCoat = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(37.5, 25.5, 0.7), 0.08, 0.01, 0.01, 1, 14),
      mats.fluorineCoatCyan
    );
    dichroicCoat.position.z = 0.26;
    const arRear = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(37.5, 25.5, 0.7), 0.06, 0.01, 0.01, 1, 14),
      mats.nanoArIridescent
    );
    arRear.position.z = -0.25;
    arRear.userData.noEdges = true;

    // Corner orientation chamfer index tab identifying coated dichroic front face
    const idxTab = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 0.55, 0.56, 0.08, 0.03, 'z'),
      mats.goldPlating
    );
    idxTab.position.set(17.8, -12.95, 0.02);

    g.add(cm500, edgeBevel, dichroicCoat, arRear, idxTab);

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
    // Multilayer co-fired PZT-5H ceramic bar with stratified texture (US8966704)
    const pztGeo = createChamferedBoxGeo(2.6, 25.0, 0.48, 0.2, 0.05, 'z');
    applyBoxUVs(pztGeo, 10.0);
    const pztCore = new THREE.Mesh(pztGeo, mats.ultra.sensorPztStack);
    pztCore.position.set(-20.4, 0, 0);

    // Dual symmetric fired Ag-Ni split drive electrode films separated by central isolation trench + solder bumps
    for (const sy of [-6.4, 6.4]) {
      const agSeg = new THREE.Mesh(
        createChamferedBoxGeo(2.75, 11.4, 0.12, 0.14, 0.02, 'z'),
        mats.silverElectrode
      );
      agSeg.position.set(-20.4, sy, 0.34);
      const solder = new THREE.Mesh(hiResSphere(0.36, 8, 6), mats.solderBallSilver);
      solder.scale.set(1.1, 1.5, 0.45);
      solder.position.set(-20.4, sy + Math.sign(sy) * 4.4, 0.42);
      solder.userData.noEdges = true;
      g.add(agSeg, solder);
    }

    // Wrap-around rear gold ground electrode + rigid <15um acoustic-impedance-matched epoxy bond film
    const rearGnd = new THREE.Mesh(
      createChamferedBoxGeo(2.65, 24.4, 0.08, 0.12, 0.015, 'z'),
      mats.goldPlating
    );
    rearGnd.position.set(-20.4, 0, -0.26);
    const bondLayer = new THREE.Mesh(
      createChamferedBoxGeo(2.95, 25.4, 0.14, 0.2, 0.03, 'z'),
      mats.opticalCementClear
    );
    bondLayer.position.set(-20.4, 0, -0.37);

    g.add(pztCore, rearGnd, bondLayer);

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
      // Front mirror-lapped hardened SUS440C martensitic steel wear insert with beveled press-fit flange
      const raceFront = new THREE.Mesh(
        hiResCyl(3.15, 3.35, 0.38, 24).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      raceFront.position.set(bx, by, 1.35);
      const lapRingF = new THREE.Mesh(hiResTorus(2.65, 0.12, 6, 22), mats.silverElectrode);
      lapRingF.position.set(bx, by, 1.15);
      lapRingF.userData.noEdges = true;

      // Rear white ZrO2 zirconia ceramic ultra-hard wear insert + precision stainless press-fit collar
      const raceRear = new THREE.Mesh(
        hiResCyl(3.15, 3.35, 0.38, 24).rotateX(Math.PI / 2),
        mats.ceramicAlumina
      );
      raceRear.position.set(bx, by, -1.35);
      const rearCollar = new THREE.Mesh(hiResTorus(3.38, 0.22, 8, 24), mats.titaniumRivet);
      rearCollar.position.set(bx, by, -1.35);
      rearCollar.userData.noEdges = true;

      g.add(raceFront, lapRingF, raceRear, rearCollar);
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
    // Photo-etched Permalloy flux-return frame with TRUE THROUGH-CUT eddy-current-breaking slots!
    const shuntShape = createFrameShape(50.0, 38.0, 2.5, 34.0, 22.0, 1.2);
    // Cut 14 real rectangular through-slots along top & bottom rails + 6 along side rails!
    for (let i = -3; i <= 3; i++) {
      const sx = i * 5.8;
      for (const sy of [15.0, -15.0]) {
        const hole = new THREE.Path();
        hole.moveTo(sx - 0.35, sy - 2.6);
        hole.lineTo(sx + 0.35, sy - 2.6);
        hole.lineTo(sx + 0.35, sy + 2.6);
        hole.lineTo(sx - 0.35, sy + 2.6);
        hole.closePath();
        shuntShape.holes.push(hole);
      }
    }
    for (let j = -1; j <= 1; j++) {
      const sy = j * 6.5;
      for (const sx of [-21.0, 21.0]) {
        const hole = new THREE.Path();
        hole.moveTo(sx - 2.4, sy - 0.35);
        hole.lineTo(sx + 2.4, sy - 0.35);
        hole.lineTo(sx + 2.4, sy + 0.35);
        hole.lineTo(sx - 2.4, sy + 0.35);
        hole.closePath();
        shuntShape.holes.push(hole);
      }
    }
    addCircleHoles(shuntShape, [
      [-22.2, 16.2, 1.0],
      [22.2, 16.2, 1.0],
      [-22.2, -16.2, 1.0],
      [22.2, -16.2, 1.0],
    ]);

    const shuntFrame = new THREE.Mesh(
      extrudeHiRes(shuntShape, 0.28, 0.03, 0.03, 2, 22),
      mats.lensPermalloyShield
    );
    g.add(shuntFrame);

    // 4 gold-plated grounding contact washers at corner mounting bores
    for (const [cx, cy] of [
      [-22.2, 16.2],
      [22.2, 16.2],
      [-22.2, -16.2],
      [22.2, -16.2],
    ] as Array<[number, number]>) {
      const gw = new THREE.Mesh(hiResTorus(1.35, 0.24, 6, 16), mats.goldPlating);
      gw.position.set(cx, cy, 0.16);
      gw.userData.noEdges = true;
      g.add(gw);
    }

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
    // Authentic W.L. Gore-style adhesive ePTFE breather vent disc (dark acrylic PSA ring + white micro-fibril ePTFE!)
    const ventBody = new THREE.Mesh(
      hiResCyl(2.45, 2.45, 0.36, 26).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    ventBody.position.set(20.6, 11.2, 0);

    const ventFaceGeo = markHiRes(new THREE.CircleGeometry(2.38, 26));
    applyPlanarUVs(ventFaceGeo, 4.76, 4.76, 'xy');
    const ventFaceFront = new THREE.Mesh(ventFaceGeo, mats.ultra.sensorEptfeVent);
    ventFaceFront.position.set(20.6, 11.2, 0.20);
    ventFaceFront.userData.noEdges = true;

    const ventFaceRear = new THREE.Mesh(ventFaceGeo, mats.ultra.sensorEptfeVent);
    ventFaceRear.rotation.y = Math.PI;
    ventFaceRear.position.set(20.6, 11.2, -0.20);
    ventFaceRear.userData.noEdges = true;

    // Perforated polymer desiccant cartridge bar along lower cavity border housing molecular-sieve beads!
    const cartFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.4, 2.1, 0.55, 14.2, 1.15, 0.3), 0.46, 0.04, 0.04, 2, 14),
      mats.matteBlackAnodized
    );
    cartFrame.position.set(0, -14.8, 0);
    const porousBack = new THREE.Mesh(
      createChamferedBoxGeo(15.2, 1.65, 0.16, 0.35, 0.02, 'z'),
      mats.oilTrapPorousPad
    );
    porousBack.position.set(0, -14.8, -0.14);

    // Instanced spherical white zeolite / silica-gel molecular-sieve desiccant microbeads visible inside cartridge!
    const beadGeo = hiResSphere(0.32, 8, 6);
    const beads = new THREE.InstancedMesh(beadGeo, mats.ceramicAlumina, 22);
    const bd = new THREE.Object3D();
    for (let i = 0; i < 22; i++) {
      const bx = -6.3 + i * 0.6;
      const by = -14.8 + (i % 2 === 0 ? 0.18 : -0.18);
      bd.position.set(bx, by, 0.06);
      bd.updateMatrix();
      beads.setMatrixAt(i, bd.matrix);
    }
    beads.instanceMatrix.needsUpdate = true;
    beads.userData.noEdges = true;

    g.add(ventBody, ventFaceFront, ventFaceRear, cartFrame, porousBack, beads);

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
