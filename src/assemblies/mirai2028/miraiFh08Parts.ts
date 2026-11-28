//@FLOW_MAP|file=src/assemblies/mirai2028/miraiFh08Parts.ts|unit=mirai2028|lines=1050|exports=buildMiraiFh08Parts
import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import {
  createRoundedRectShape,
  createSpurGearGeometry,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { scaleRadialSegmentsForQuality } from '../../core/geometry_quality';
import {
  addKnurledRingToGroup,
  addZAxisBolts,
  buildCurvedIrisBladeGeo,
  buildMeniscusLensGeo,
  createArcRingShape,
  finalizeMiraiPart,
  InstanceTransform,
  makeMiraiInstanced,
  makeZAxisCncRing,
} from './miraiShared';

/**
 * FH08 Structure #3 — ASI Inverse-Design 28mm · 180g 50mm F1.4 Freeform Meta-Optics Pancake Lens
 * 18 Watchmaker-Grade Explodable 3D CAD Parts (`miraiSubView = 3`, order 33..50).
 *
 * True-Scale Optical Architecture:
 *   - Optical axis along +Z (Front filter bezel at +14.0mm -> E-mount bayonet flange at -14.0mm)
 *   - Total barrel length: 28.0 mm | Max outer diameter: Ø68.0 mm (R = 34.0 mm)
 *   - Physically exact entrance pupil: Ø35.7 mm (50mm / 1.4 = 35.71 mm — Etendue Law 100% respected!)
 *   - Real LatheGeometry curved meniscus/ED/aspheric glass elements, 1024px iridescent TiO2 Meta-DOE
 *     phase plate, 9-blade curved iris diaphragm, dual linear voice-coil AF actuators, annular MCU/PSF-ROM
 *     PCB, 10-pin gold E-mount contacts, and SUS304 3-lug bayonet flange.
 */
export function buildMiraiFh08Parts(mats: V2MaterialLibrary): CadPart[] {
  const cp: THREE.Plane[] = mats.clippingPlanes;
  const parts: CadPart[] = [];

  // =========================================================================
  // FH08-01: CNC Titanium Front Bezel & Ø58mm Filter Thread Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stepped outer titanium-slate front bezel (Ø66.4mm -> Ø46.4mm clear front step)
    const outerBezel = makeZAxisCncRing(33.2, 26.8, 2.8, mats.welcomeCoreSlate, {
      bevel: 0.24,
      bevelSegs: 2,
      curveSegs: 44,
    });
    g.add(outerBezel);

    // Inner chamfered Ø58mm filter-thread step wall with 3 concentric micro-thread ridges
    for (let k = 0; k < 3; k++) {
      const threadRing = makeZAxisCncRing(29.0, 27.9, 0.34, mats.lensBarrelAnodized, {
        bevel: 0.04,
        bevelSegs: 1,
        curveSegs: 40,
      });
      threadRing.position.z = 0.72 - k * 0.62;
      g.add(threadRing);
    }

    // Inner beveled optical face plate framing the Ø44mm curved front meniscus
    const innerRim = makeZAxisCncRing(27.8, 21.8, 1.15, mats.welcomeCoreMid, {
      bevel: 0.14,
      bevelSegs: 2,
      curveSegs: 40,
    });
    innerRim.position.z = -0.68;
    g.add(innerRim);

    // Signature emerald + machined titanium MIRAI 2028 front dress ring
    const emeraldRing = makeZAxisCncRing(32.5, 31.4, 0.42, mats.mofEmerald, {
      bevel: 0.05,
      bevelSegs: 1,
      curveSegs: 44,
    });
    emeraldRing.position.z = 1.38;
    g.add(emeraldRing);

    const tiChamfer = makeZAxisCncRing(23.2, 22.0, 0.36, mats.welcomeTitaniumFace, {
      bevel: 0.05,
      bevelSegs: 1,
      curveSegs: 40,
    });
    tiChamfer.position.z = -0.05;
    g.add(tiChamfer);

    // 4 recessed front-face precision retaining micro-screws at 45° diagonals
    const screwR = 25.0;
    const screwPos: Array<[number, number, number]> = [];
    for (let k = 0; k < 4; k++) {
      const a = Math.PI / 4 + (k * Math.PI) / 2;
      screwPos.push([Math.cos(a) * screwR, Math.sin(a) * screwR, 0.02]);
    }
    addZAxisBolts(g, screwPos, mats, 0.82, 1.6, 1);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-front-filter-bezel',
        3,
        33,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 12.6),
        new THREE.Vector3(0, 0, 62.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH08-02: Weather-Seal Fluorine / EPDM Front Gasket Collar & Ø35.7mm Pupil Mask
  // =========================================================================
  {
    const g = new THREE.Group();
    // Continuous outer weather-seal EPDM lip ring
    const sealRing = makeZAxisCncRing(29.8, 26.2, 0.95, mats.epdmGasket, {
      bevel: 0.14,
      bevelSegs: 2,
      curveSegs: 40,
    });
    g.add(sealRing);

    // Knife-edge stray-light front entrance-pupil baffle collar (strictly Ø35.7mm = R 17.85mm clear bore!)
    const pupilMask = makeZAxisCncRing(26.4, 17.85, 0.52, mats.velvetFlockTrap, {
      bevel: 0.08,
      bevelSegs: 1,
      curveSegs: 40,
    });
    pupilMask.position.z = -0.22;
    g.add(pupilMask);

    // Subtle anodized gold calibration reference lip marking exact Ø35.7mm entrance pupil
    const pupilGauge = makeZAxisCncRing(18.6, 17.9, 0.22, mats.goldPlating, {
      bevel: 0.03,
      bevelSegs: 1,
      curveSegs: 40,
    });
    pupilGauge.position.z = 0.08;
    g.add(pupilGauge);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-front-gasket-collar',
        3,
        34,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, 11.45),
        new THREE.Vector3(0, 0, 53.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH08-03: Group 1 — ASI Inverse-Design Large-Aperture Freeform Meniscus Front Glass
  // =========================================================================
  {
    const g = new THREE.Group();
    // Real curved LatheGeometry convex-meniscus front optical glass (Ø43.2mm > Ø35.7mm pupil)
    const frontGlassGeo = buildMeniscusLensGeo(43.2, 2.2, 2.65, -0.95, 0.32, -0.14, 52);
    const frontGlass = new THREE.Mesh(frontGlassGeo, mats.opticalCementClear);
    frontGlass.userData.noEdges = true;
    g.add(frontGlass);

    // Precision dark-edge ground optical rim + titanium retaining ring
    const edgeRim = makeZAxisCncRing(22.4, 21.4, 2.0, mats.quartzEdge, {
      bevel: 0.12,
      bevelSegs: 1,
      curveSegs: 40,
    });
    g.add(edgeRim);

    const mountCollar = makeZAxisCncRing(24.6, 22.2, 1.5, mats.welcomeTitaniumFace, {
      bevel: 0.12,
      bevelSegs: 2,
      curveSegs: 40,
    });
    mountCollar.position.z = -0.35;
    g.add(mountCollar);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-freeform-front-glass',
        3,
        35,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 8.8),
        new THREE.Vector3(0, 0, 44.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // FH08-04: CORE — TiO2 Nanopillar Meta-DOE Chromatic Phase Compensation Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    const waferSegs = scaleRadialSegmentsForQuality(48, 20);
    // Fused-silica structural wafer disc
    const baseDisc = new THREE.Mesh(hiResCyl(19.6, 19.6, 0.72, waferSegs), mats.siliconBulk);
    baseDisc.rotation.x = Math.PI / 2;
    g.add(baseDisc);

    // High-DPI 1024px iridescent TiO2 nanopillar Meta-DOE phase-pattern face (+Z & -Z visible!)
    const doeGeo = hiResCyl(19.3, 19.3, 0.14, waferSegs);
    doeGeo.rotateX(Math.PI / 2);
    applyPlanarUVs(doeGeo, 38.6, 38.6, 'xy');
    const doeFace = new THREE.Mesh(doeGeo, mats.fh08MetaDoeMap);
    doeFace.position.z = 0.38;
    doeFace.userData.noEdges = true;
    g.add(doeFace);

    // Precision CNC brass roll-alignment holding ring with 2 key notches (±0.01° roll tolerance!)
    const brassHolder = makeZAxisCncRing(23.2, 19.4, 1.15, mats.brassPrecision, {
      bevel: 0.10,
      bevelSegs: 2,
      curveSegs: 40,
    });
    g.add(brassHolder);

    for (const ang of [0, Math.PI]) {
      const keyTab = new THREE.Mesh(
        createChamferedBoxGeo(2.2, 1.4, 1.15, 0.18, 0.08, 'z'),
        mats.goldPlating
      );
      keyTab.position.set(Math.cos(ang) * 23.8, Math.sin(ang) * 23.8, 0);
      g.add(keyTab);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-tiO2-meta-doe-plate',
        3,
        36,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 0, 5.4),
        new THREE.Vector3(0, 0, 35.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH08-05: 3-Step Optical Spacer & Knife-Edge Stray-Light Baffle Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const outerSpacer = makeZAxisCncRing(24.2, 20.0, 1.45, mats.lensBarrelAnodized, {
      bevel: 0.10,
      bevelSegs: 1,
      curveSegs: 36,
    });
    g.add(outerSpacer);

    const stepSpecs = [
      { rOut: 20.4, rIn: 18.8, z: 0.42, h: 0.34, mat: mats.velvetFlockTrap },
      { rOut: 19.6, rIn: 18.0, z: 0.0, h: 0.32, mat: mats.matteBlackAnodized },
      { rOut: 19.0, rIn: 17.5, z: -0.42, h: 0.30, mat: mats.velvetFlockTrap },
    ];
    for (const st of stepSpecs) {
      const baffle = makeZAxisCncRing(st.rOut, st.rIn, st.h, st.mat, {
        bevel: 0.03,
        bevelSegs: 1,
        curveSegs: 32,
      });
      baffle.position.z = st.z;
      g.add(baffle);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-optical-spacer-baffle',
        3,
        37,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 3.6),
        new THREE.Vector3(0, 0, 27.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH08-06: Group 2 — Low-Dispersion ED + High-Refractive Cemented Doublet
  // =========================================================================
  {
    const g = new THREE.Group();
    // Front positive ED element
    const edFront = new THREE.Mesh(
      buildMeniscusLensGeo(36.4, 1.45, 1.45, 0.4, 0.12, 0, 48),
      mats.opticalCementClear
    );
    edFront.position.z = 0.62;
    edFront.userData.noEdges = true;
    g.add(edFront);

    // Rear negative high-index flint compensating element cemented flush behind
    const flintRear = new THREE.Mesh(
      buildMeniscusLensGeo(36.0, 1.35, -0.38, -1.05, 0, -0.12, 48),
      mats.opticalCementClear
    );
    flintRear.position.z = -0.68;
    flintRear.userData.noEdges = true;
    g.add(flintRear);

    // Emerald ED identification optical edge band + black aluminum cell carrier
    const edBand = makeZAxisCncRing(18.7, 18.0, 1.35, mats.evfLensEd, {
      bevel: 0.06,
      bevelSegs: 1,
      curveSegs: 36,
    });
    edBand.position.z = 0.55;
    g.add(edBand);

    const cellFrame = makeZAxisCncRing(22.2, 18.5, 2.5, mats.welcomeCoreSlate, {
      bevel: 0.12,
      bevelSegs: 2,
      curveSegs: 36,
    });
    g.add(cellFrame);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-ed-doublet-group',
        3,
        38,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, 1.8),
        new THREE.Vector3(0, 0, 19.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH08-07: 9-Blade Circular Iris Diaphragm Array & Precision Brass Cam Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Slotted brass cam actuation ring
    const camRing = makeZAxisCncRing(23.8, 18.4, 0.82, mats.brassPrecision, {
      bevel: 0.08,
      bevelSegs: 1,
      curveSegs: 40,
    });
    camRing.position.z = -0.35;
    g.add(camRing);

    // Retaining cover ring
    const coverRing = makeZAxisCncRing(23.0, 17.8, 0.36, mats.stainlessMachined, {
      bevel: 0.05,
      bevelSegs: 1,
      curveSegs: 36,
    });
    coverRing.position.z = 0.42;
    g.add(coverRing);

    // 9 curved metallic circular aperture blades (InstancedMesh — forms authentic Ø19mm circular opening!)
    const bladeGeo = buildCurvedIrisBladeGeo(10.8, 19.2, 0.16);
    const bladeTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      bladeTransforms.push({
        pos: [0, 0, 0.05 + (i % 3) * 0.06],
        rot: [0, 0, a],
      });
    }
    g.add(makeMiraiInstanced(bladeGeo, mats.carbonFiberBlade, bladeTransforms, false));

    // 9 stainless cam pivot pins around outer perimeter (regular meshes merged into BatchedMesh!)
    const pinGeo = hiResCyl(0.45, 0.45, 0.72, 10);
    pinGeo.rotateX(Math.PI / 2);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const pin = new THREE.Mesh(pinGeo, mats.titaniumRivet);
      pin.position.set(Math.cos(a) * 20.8, Math.sin(a) * 20.8, 0.06);
      pin.userData.noEdges = true;
      g.add(pin);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-iris-blade-array',
        3,
        39,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -0.4),
        new THREE.Vector3(0, 0, 11.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH08-08: Ultra-Thin Arc Stepping Iris Actuator & Micro-Gear Train
  // =========================================================================
  {
    const g = new THREE.Group();
    // Arc-shaped brushless stepping motor stator frame seated at 2 o'clock (R = 24..28.5mm)
    const arcGeo = extrudeHiRes(createArcRingShape(28.4, 24.0, 0.12, 1.24), 2.4, 0.10, 0.10, 1, 20);
    applyBoxUVs(arcGeo, 10.0);
    g.add(new THREE.Mesh(arcGeo, mats.softIronYoke));

    // 3 wound copper micro-stator coils along the actuator arc
    for (let k = 0; k < 3; k++) {
      const a = 0.34 + k * 0.34;
      const coil = new THREE.Mesh(hiResCyl(1.45, 1.45, 2.2, 14), mats.copperCoil);
      coil.rotation.x = Math.PI / 2;
      coil.position.set(Math.cos(a) * 26.2, Math.sin(a) * 26.2, 0.15);
      coil.userData.noEdges = true;
      g.add(coil);
    }

    // 2-stage brass & stainless reduction spur gears engaging the iris cam ring
    const g1 = new THREE.Mesh(createSpurGearGeometry(14, 2.6, 0.9, 0.7), mats.brassGear);
    g1.position.set(22.6, 13.4, 0.35);
    g.add(g1);

    const g2 = new THREE.Mesh(createSpurGearGeometry(18, 3.2, 0.8, 0.8), mats.stainlessMachined);
    g2.position.set(19.0, 17.8, 0.35);
    g.add(g2);

    // Optical origin photo-interrupter fork + tiny FPC jumper
    const opto = new THREE.Mesh(createChamferedBoxGeo(2.6, 2.2, 1.6, 0.15, 0.06, 'z'), mats.icEpoxy);
    opto.position.set(14.5, 21.8, 0);
    g.add(opto);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-iris-stepper-motor',
        3,
        40,
        '#c26d38',
        g,
        new THREE.Vector3(0, 0, -0.4),
        new THREE.Vector3(24.0, 14.0, 11.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH08-09: Group 3 — Floating Lightweight Freeform Aspheric Focus Cell
  // =========================================================================
  {
    const g = new THREE.Group();
    // Thin freeform aspheric glass focusing meniscus
    const focusGlass = new THREE.Mesh(
      buildMeniscusLensGeo(33.2, 1.5, 1.15, -0.45, 0.28, -0.18, 48),
      mats.opticalCementClear
    );
    focusGlass.userData.noEdges = true;
    g.add(focusGlass);

    // Ultra-lightweight CNC magnesium floating lens carrier with twin side guide arms
    const carrierRing = makeZAxisCncRing(20.2, 16.6, 2.2, mats.magnesiumCast, {
      bevel: 0.14,
      bevelSegs: 2,
      curveSegs: 36,
    });
    g.add(carrierRing);

    for (const side of [-1, 1]) {
      const arm = new THREE.Mesh(
        createChamferedBoxGeo(6.4, 4.4, 2.4, 0.35, 0.10, 'z'),
        mats.magnesiumCast
      );
      arm.position.set(side * 22.0, 0, 0);
      g.add(arm);

      // Precision sintered-bronze linear guide bushing sleeve
      const bushing = new THREE.Mesh(hiResCyl(1.75, 1.75, 3.6, 16), mats.sinteredBronzeBushing);
      bushing.rotation.x = Math.PI / 2;
      bushing.position.set(side * 24.4, 0, 0);
      g.add(bushing);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-focus-freeform-cell',
        3,
        41,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, -3.2),
        new THREE.Vector3(0, 0, 2.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH08-10: Dual Opposing Linear Voice-Coil AF Actuators & Polished SUS Guide Rods
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const side of [-1, 1]) {
      // Polished SUS304 precision cylindrical guide shaft along Z
      const shaft = new THREE.Mesh(hiResCyl(1.02, 1.02, 11.4, 16), mats.stainlessMachined);
      shaft.rotation.x = Math.PI / 2;
      shaft.position.set(side * 24.4, 0, 0.6);
      g.add(shaft);

      // Soft-iron U-channel magnetic return yoke
      const yoke = new THREE.Mesh(
        createChamferedBoxGeo(4.2, 11.2, 9.6, 0.32, 0.12, 'z'),
        mats.softIronYoke
      );
      yoke.position.set(side * 25.6, side * 5.6, 0.4);
      g.add(yoke);

      // High-flux Neodymium N52 permanent magnet slab seated inside yoke
      const mag = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 8.8, 8.2, 0.16, 0.08, 'z'),
        mats.neodymiumMagnet
      );
      mag.position.set(side * 24.2, side * 5.6, 0.4);
      g.add(mag);

      // Precision rectangular wound copper voice-coil bobbin
      const bobbin = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 7.6, 5.2, 0.35, 0.10, 'z'),
        mats.copperCoil
      );
      bobbin.position.set(side * 22.8, side * 5.6, 0.4);
      g.add(bobbin);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-linear-voicecoil-pair',
        3,
        42,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -3.2),
        new THREE.Vector3(0, 24.0, -5.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH08-11: Sub-Micron Magnetic Linear Encoder Scale & MR Readhead Sensor
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-low-expansion Invar magnetic linear scale bar aligned parallel to Z guide axis
    const scaleBar = new THREE.Mesh(
      createChamferedBoxGeo(1.3, 3.4, 10.6, 0.14, 0.05, 'z'),
      mats.invarScaleBar
    );
    scaleBar.position.set(-23.2, -11.4, 0.4);
    g.add(scaleBar);

    // Magnetoresistive (MR) readhead chip carrier riding at 0.15mm airgap
    const mrChip = buildChipPackage({
      w: 2.6,
      d: 3.2,
      h: 1.2,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
    });
    mrChip.rotation.z = Math.PI / 2;
    mrChip.position.set(-21.2, -11.4, 0.4);
    g.add(mrChip);

    // Amber polyimide flex bridge carrying differential MR quadrature signal to rear MCU PCB
    const flexBridge = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 1.8, 6.2, 0.15, 0.05, 'z'),
      mats.polyimideFpc
    );
    flexBridge.position.set(-21.2, -13.4, -2.4);
    g.add(flexBridge);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-magnetic-encoder',
        3,
        43,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, -3.2),
        new THREE.Vector3(-24.0, -14.0, -5.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH08-12: Group 4 — Large-Diameter Rear Field-Flattener Aspheric Corrector
  // =========================================================================
  {
    const g = new THREE.Group();
    // Large Ø38.4mm rear aspheric element correcting full-frame peripheral chief-ray angle (CRA)
    const rearGlass = new THREE.Mesh(
      buildMeniscusLensGeo(38.4, 1.75, -0.65, 1.35, -0.22, 0.30, 52),
      mats.opticalCementClear
    );
    rearGlass.userData.noEdges = true;
    g.add(rearGlass);

    // Precision CNC carrier ring + etched brass factory tilt/back-focus calibration shim
    const holder = makeZAxisCncRing(22.4, 19.0, 2.0, mats.welcomeCoreSlate, {
      bevel: 0.12,
      bevelSegs: 2,
      curveSegs: 40,
    });
    g.add(holder);

    const brassShim = makeZAxisCncRing(22.8, 19.8, 0.28, mats.brassPrecision, {
      bevel: 0.03,
      bevelSegs: 1,
      curveSegs: 36,
    });
    brassShim.position.z = -1.12;
    g.add(brassShim);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-rear-corrector-lens',
        3,
        44,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, -7.2),
        new THREE.Vector3(0, 0, -16.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH08-13: CNC Knurled Manual Focus / Control Ring & Laser-Engraved Nameplate Band
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main Ø68mm CNC gunmetal barrel control ring with 72 precision machined knurl teeth on front band
    addKnurledRingToGroup(
      g,
      33.8,
      31.0,
      10.6,
      72,
      mats.lensBarrelAnodized,
      mats.welcomeCoreSlate,
      4.2,
      2.9
    );

    // Precision cylindrical laser-engraved lens spec & distance scale sleeve (`fh08FocusScaleMap`)
    const bandSegs = scaleRadialSegmentsForQuality(56, 24);
    const bandGeo = new THREE.CylinderGeometry(34.12, 34.12, 5.2, bandSegs, 1, true);
    bandGeo.rotateX(Math.PI / 2);
    markHiRes(bandGeo);
    const bandMesh = new THREE.Mesh(bandGeo, mats.fh08FocusScaleMap);
    bandMesh.position.z = -2.2;
    bandMesh.userData.noEdges = true;
    g.add(bandMesh);

    // Chamfered machined titanium rear transition collar
    const rearLip = makeZAxisCncRing(34.18, 31.2, 0.55, mats.welcomeTitaniumFace, {
      bevel: 0.08,
      bevelSegs: 1,
      curveSegs: 44,
    });
    rearLip.position.z = -5.15;
    g.add(rearLip);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-outer-focus-ring',
        3,
        45,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 5.6),
        new THREE.Vector3(0, 32.0, 20.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH08-14: One-Piece CNC Magnesium Main Chassis Barrel & Weight-Relief Skeleton
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rear exposed precision magnesium barrel section (z = -8.4..+3.6 in local => world -12.0..0.0)
    const rearShell = makeZAxisCncRing(32.8, 29.2, 12.0, mats.welcomeCoreSlate, {
      bevel: 0.20,
      bevelSegs: 2,
      curveSegs: 44,
    });
    rearShell.position.z = -2.4;
    g.add(rearShell);

    // Emerald MIRAI 2028 accent groove ring around rear barrel waist
    const accentBand = makeZAxisCncRing(33.05, 32.2, 0.65, mats.mofEmerald, {
      bevel: 0.06,
      bevelSegs: 1,
      curveSegs: 44,
    });
    accentBand.position.z = 2.6;
    g.add(accentBand);

    // Inner structural precision skeleton extending forward inside focus ring (3 segmented arch ribs)
    for (let k = 0; k < 3; k++) {
      const a0 = k * ((Math.PI * 2) / 3) + 0.22;
      const a1 = a0 + 1.42;
      const segGeo = extrudeHiRes(createArcRingShape(30.6, 28.4, a0, a1), 10.2, 0.10, 0.10, 1, 18);
      applyBoxUVs(segGeo, 14.0);
      const segMesh = new THREE.Mesh(segGeo, mats.magnesiumCast);
      segMesh.position.z = 6.2;
      g.add(segMesh);
    }

    // Tactile AF/MF + Custom Focus-Hold button boss on left side (-X/+Y)
    const switchBoss = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 6.2, 5.4, 0.5, 0.14, 'z'),
      mats.welcomeTitaniumFace
    );
    switchBoss.position.set(-32.8, 5.2, -1.8);
    g.add(switchBoss);

    const holdBtn = new THREE.Mesh(hiResCyl(1.75, 1.85, 1.3, 18), mats.sonyAlphaCinnabar);
    holdBtn.rotation.z = Math.PI / 2;
    holdBtn.position.set(-33.6, 5.2, -1.8);
    g.add(holdBtn);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-inner-mg-barrel',
        3,
        46,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -3.6),
        new THREE.Vector3(0, -24.0, -12.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH08-15: Annular Rigid-Flex Lens Control MCU PCB (Individual 3D PSF-ROM)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcbMesh = makeZAxisCncRing(29.2, 22.8, 0.92, mats.sensorPcb, {
      bevel: 0.06,
      bevelSegs: 1,
      curveSegs: 40,
    });
    g.add(pcbMesh);

    // Gold ground-plane ring trace
    const gndTrace = makeZAxisCncRing(28.5, 27.6, 0.12, mats.goldPlating, {
      bevel: 0.01,
      bevelSegs: 1,
      curveSegs: 36,
    });
    gndTrace.position.z = 0.50;
    gndTrace.userData.noEdges = true;
    g.add(gndTrace);

    // Lens Control QFN MCU at 12 o'clock & Individual Factory 3D PSF-Calibration ROM at 4 o'clock
    const mcu = buildChipPackage({
      w: 5.2,
      d: 5.2,
      h: 0.95,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
    });
    mcu.rotation.x = Math.PI / 2;
    mcu.position.set(0, 26.0, 0.92);
    g.add(mcu);

    const psfRom = buildChipPackage({
      w: 4.2,
      d: 4.2,
      h: 0.85,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
    });
    psfRom.rotation.x = Math.PI / 2;
    psfRom.position.set(22.4, -13.0, 0.88);
    g.add(psfRom);

    // 24 SMD MLCC decoupling capacitors arrayed around the annular PCB (1 InstancedMesh)
    const capGeo = markHiRes(new THREE.BoxGeometry(1.15, 0.62, 0.58));
    const capTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2 + 0.13;
      if (Math.abs(Math.sin(a) - 1) < 0.08) continue;
      capTransforms.push({
        pos: [Math.cos(a) * 25.8, Math.sin(a) * 25.8, 0.74],
        rot: [0, 0, a + Math.PI / 2],
      });
    }
    g.add(makeMiraiInstanced(capGeo, mats.smdCeramic, capTransforms, true));

    // Tiny SMD passive accent
    const drv = buildSmdPassive(2.2, 0.9, 1.4, mats.ferriteInductor, mats.solderBallSilver);
    drv.rotation.x = Math.PI / 2;
    drv.position.set(-22.4, -13.0, 0.9);
    g.add(drv);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-curved-mcu-pcb',
        3,
        47,
        '#059669',
        g,
        new THREE.Vector3(0, 0, -8.8),
        new THREE.Vector3(0, 0, -28.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH08-16: Rectangular 36×24mm Full-Frame Rear Stray-Light Trap Baffle
  // =========================================================================
  {
    const g = new THREE.Group();
    const baffleShape = new THREE.Shape();
    baffleShape.absarc(0, 0, 22.8, 0, Math.PI * 2, false);
    // Cut exact 36x24 aspect rectangular opening (scaled to fit inside Ø46mm E-mount throat: 27.6 x 19.6mm)
    const hw = 14.4;
    const hh = 10.2;
    const cr = 1.6;
    const rectHole = new THREE.Path();
    rectHole.moveTo(-hw + cr, -hh);
    rectHole.lineTo(hw - cr, -hh);
    rectHole.absarc(hw - cr, -hh + cr, cr, -Math.PI / 2, 0, false);
    rectHole.lineTo(hw, hh - cr);
    rectHole.absarc(hw - cr, hh - cr, cr, 0, Math.PI / 2, false);
    rectHole.lineTo(-hw + cr, hh);
    rectHole.absarc(-hw + cr, hh - cr, cr, Math.PI / 2, Math.PI, false);
    rectHole.lineTo(-hw, -hh + cr);
    rectHole.absarc(-hw + cr, -hh + cr, cr, Math.PI, Math.PI * 1.5, false);
    baffleShape.holes.push(rectHole);

    const baffleGeo = extrudeHiRes(baffleShape, 1.35, 0.10, 0.10, 1, 28);
    applyBoxUVs(baffleGeo, 12.0);
    g.add(new THREE.Mesh(baffleGeo, mats.mountVelvetBaffle));

    // Inner velvety light-trap hood lip projecting slightly rearward
    const lipShape = createRoundedRectShape(30.4, 22.0, 2.0);
    const lipHole = new THREE.Path();
    lipHole.moveTo(-hw + cr, -hh);
    lipHole.lineTo(hw - cr, -hh);
    lipHole.absarc(hw - cr, -hh + cr, cr, -Math.PI / 2, 0, false);
    lipHole.lineTo(hw, hh - cr);
    lipHole.absarc(hw - cr, hh - cr, cr, 0, Math.PI / 2, false);
    lipHole.lineTo(-hw + cr, hh);
    lipHole.absarc(-hw + cr, hh - cr, cr, Math.PI / 2, Math.PI, false);
    lipHole.lineTo(-hw, -hh + cr);
    lipHole.absarc(-hw + cr, -hh + cr, cr, Math.PI, Math.PI * 1.5, false);
    lipShape.holes.push(lipHole);
    const lipMesh = new THREE.Mesh(extrudeHiRes(lipShape, 1.2, 0.05, 0.05, 1, 16), mats.velvetFlockTrap);
    lipMesh.position.z = -0.9;
    g.add(lipMesh);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-rear-dust-baffle',
        3,
        48,
        '#0f172a',
        g,
        new THREE.Vector3(0, 0, -10.6),
        new THREE.Vector3(0, 0, -38.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH08-17: 10-Pin Gold-Plated E-Mount Electronic Contact Block
  // =========================================================================
  {
    const g = new THREE.Group();
    // Curved high-strength PPS insulating arc block seated at 6 o'clock (-Y)
    const ppsGeo = extrudeHiRes(
      createArcRingShape(23.8, 19.6, -Math.PI * 0.72, -Math.PI * 0.28),
      2.0,
      0.12,
      0.12,
      1,
      24
    );
    applyBoxUVs(ppsGeo, 10.0);
    g.add(new THREE.Mesh(ppsGeo, mats.mountPpsInsulator));

    // 10 independent gold-plated E-mount electrical communication pads (InstancedMesh)
    const padGeo = markHiRes(new THREE.BoxGeometry(1.15, 1.85, 0.55));
    const padTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI * 0.68 + ((Math.PI * 0.36) * i) / 9;
      padTransforms.push({
        pos: [Math.cos(a) * 21.7, Math.sin(a) * 21.7, -0.96],
        rot: [0, 0, a + Math.PI / 2],
      });
    }
    g.add(makeMiraiInstanced(padGeo, mats.goldPlating, padTransforms, true));

    // Rear polyimide FPC signal ribbon linking contacts to annular MCU PCB
    const fpcGeo = extrudeHiRes(
      createArcRingShape(24.6, 21.4, -Math.PI * 0.66, -Math.PI * 0.34),
      0.32,
      0.03,
      0.03,
      1,
      18
    );
    const fpcMesh = new THREE.Mesh(fpcGeo, mats.polyimideFpc);
    fpcMesh.position.z = 1.25;
    g.add(fpcMesh);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-emount-contacts',
        3,
        49,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, -11.8),
        new THREE.Vector3(0, -16.0, -47.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH08-18: SUS304 High-Rigidity E-Mount 3-Lug Stainless Bayonet & 4 Bolts
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main precision-lapped SUS304 E-mount seating flange (Ø61.6mm outer, Ø46.1mm bore)
    const flange = makeZAxisCncRing(30.8, 23.05, 1.85, mats.mountStainlessFlange, {
      bevel: 0.14,
      bevelSegs: 2,
      curveSegs: 48,
    });
    g.add(flange);

    // Rear bayonet spigot collar extending into camera mount throat
    const spigot = makeZAxisCncRing(25.2, 23.05, 1.65, mats.stainlessMachined, {
      bevel: 0.08,
      bevelSegs: 1,
      curveSegs: 40,
    });
    spigot.position.z = -1.4;
    g.add(spigot);

    // 3 precision-ground E-mount bayonet locking lugs spaced 120° apart
    for (let k = 0; k < 3; k++) {
      const a0 = k * ((Math.PI * 2) / 3) + 0.18;
      const a1 = a0 + 0.72;
      const lugGeo = extrudeHiRes(createArcRingShape(27.2, 24.4, a0, a1), 0.92, 0.08, 0.08, 1, 14);
      applyBoxUVs(lugGeo, 10.0);
      const lug = new THREE.Mesh(lugGeo, mats.mountStainlessFlange);
      lug.position.z = -1.85;
      g.add(lug);
    }

    // Rear weather-seal black rubber lip around outer flange skirt
    const rearSeal = makeZAxisCncRing(31.2, 30.2, 0.55, mats.epdmGasket, {
      bevel: 0.06,
      bevelSegs: 1,
      curveSegs: 40,
    });
    rearSeal.position.z = -0.78;
    g.add(rearSeal);

    // Iconic crimson-red Sony E-mount alignment index dot at 12 o'clock outer rim
    const indexDot = new THREE.Mesh(hiResCyl(1.15, 1.15, 0.55, 16), mats.mountRedIndexDot);
    indexDot.position.set(0, 30.8, 0.15);
    g.add(indexDot);

    // 4 countersunk M1.6 stainless flange bolts around rear face (-Z)
    const boltPos: Array<[number, number, number]> = [];
    for (let k = 0; k < 4; k++) {
      const a = Math.PI / 4 + (k * Math.PI) / 2;
      boltPos.push([Math.cos(a) * 27.6, Math.sin(a) * 27.6, -0.95]);
    }
    addZAxisBolts(g, boltPos, mats, 1.05, 2.2, -1);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh08-stainless-bayonet',
        3,
        50,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, -13.0),
        new THREE.Vector3(0, 0, -56.0),
        cp,
        0.26
      )
    );
  }

  return parts;
}
