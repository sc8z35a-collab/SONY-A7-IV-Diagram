import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { LENS_ULTRA_SPLIT_EXPLANATIONS } from './lensUltraSplitExplanations';
import { getLensSectionForPart } from './lensSectionMap';

function createRingShape(outerR: number, innerR: number): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

function createCutawayArcRingShape(
  outerR: number,
  innerR: number,
  startRad: number,
  endRad: number
): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, startRad, endRad, false);
  s.absarc(0, 0, innerR, endRad, startRad, true);
  s.closePath();
  return s;
}

function finalizePhase19LensPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.24
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

  return {
    id,
    subsystem: 'lens',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: LENS_ULTRA_SPLIT_EXPLANATIONS[id],
    standaloneOnly: true,
    lensSection: getLensSectionForPart(id),
  };
}

/**
 * Phase 19A — 30 Standalone-Only 50mm F1.2 GM Ultra-Micro CAD Sub-Assemblies (L99–L128),
 * cleanly distributed across the 3 lightweight standalone lens sections:
 *   - Section 1 (Rear 1/3 — Default): L99–L108 (z = 33..59 mm)
 *   - Section 2 (Middle 2/3):         L109–L118 (z = 62..87 mm)
 *   - Section 3 (Front 3/3):          L119–L128 (z = 92..132 mm)
 *
 * Omitted completely in Complete Camera ('integrated' 305) and Body Only ('camera_body' 231).
 */
export function buildLensUltraSplitParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const cutStart = THREE.MathUtils.degToRad(168);
  const cutEnd = THREE.MathUtils.degToRad(435);

  // =========================================================================
  // SECTION 1 (1/3 後部ユニット・最後部 — Default): L99–L108
  // =========================================================================

  // L99. Sony OEM S-CL-1082 Mount Contact Rigid-Flex Carrier (A-5031-643-A)
  {
    const g = new THREE.Group();
    const carrierArc = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(27.0, 23.6, -Math.PI * 0.69, -Math.PI * 0.31), 1.4, 0.08, 0.08, 22),
      mats.mountPpsInsulator
    );
    g.add(carrierArc);

    // 12 precision gold lead-frame fingers stepping from contacts to rear FPC tail
    for (let i = 0; i < 12; i++) {
      const a = -Math.PI * 0.66 + (i / 11) * (Math.PI * 0.32);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.2, 0.25), mats.goldPlating);
      pad.position.set(Math.cos(a) * 25.3, Math.sin(a) * 25.3, -0.78);
      pad.rotation.z = a + Math.PI / 2;
      const tailPin = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 3.2), mats.goldPlating);
      tailPin.position.set(Math.cos(a) * 25.4, Math.sin(a) * 25.4, 1.8);
      g.add(pad, tailPin);
    }

    // Integral curved polyimide bridge tail connecting CL-1082 to main lens PCB
    const flexTail = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(28.2, 26.2, -Math.PI * 0.64, -Math.PI * 0.36), 0.16, 0.02, 0.02, 16),
      mats.polyimideFpc
    );
    flexTail.position.z = 3.4;
    g.add(flexTail);

    parts.push(
      finalizePhase19LensPart(
        'lens-cl1082-mount-flex',
        99,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 34.8),
        new THREE.Vector3(-42, -58, -124),
        cp,
        0.26
      )
    );
  }

  // L100. Lens Main PCB Driver-IC Rear Thermal Heatsink Putty & Copper Foil
  {
    const g = new THREE.Group();
    for (const deg of [215, 315]) {
      const a = THREE.MathUtils.degToRad(deg);
      const putty = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(8.2, 5.6, 1.4), 1.05, 0.24, 0.24, 12),
        mats.thermalPuttyPink
      );
      putty.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, 0);
      putty.rotation.z = a + Math.PI / 2;

      const foil = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(9.4, 6.6, 0.8), 0.12, 0.02, 0.02, 8),
        mats.copperHeatSpreader
      );
      foil.position.set(Math.cos(a) * 30.8, Math.sin(a) * 30.8, -0.62);
      foil.rotation.z = a + Math.PI / 2;
      g.add(putty, foil);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-pcb-thermal-putty',
        100,
        '#f472b6',
        g,
        new THREE.Vector3(0, 0, 44.2),
        new THREE.Vector3(-76, -64, -74),
        cp,
        0.24
      )
    );
  }

  // L101. Twin Bayonet-to-Barrel Long Braided Copper ESD Ground Leads & Screws
  {
    const g = new THREE.Group();
    for (const deg of [188, 352]) {
      const a = THREE.MathUtils.degToRad(deg);
      const lead = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.28, 16.5), mats.coaxShieldCopper);
      lead.position.set(Math.cos(a) * 33.4, Math.sin(a) * 33.4, 0);
      lead.rotation.z = a + Math.PI / 2;

      const lugRear = new THREE.Mesh(
        extrudeCentered(createRingShape(2.1, 0.95), 0.26, 0.04, 0.04, 14),
        mats.goldPlating
      );
      lugRear.position.set(Math.cos(a) * 32.8, Math.sin(a) * 32.8, -8.0);
      const screw = createPrecisionScrew(1.4, 0.55, 2.2, mats.stainlessMachined);
      screw.position.set(Math.cos(a) * 32.8, Math.sin(a) * 32.8, -8.6);
      g.add(lead, lugRear, screw);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-bayonet-ground-leads',
        101,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, 42.0),
        new THREE.Vector3(-88, 18, -94),
        cp,
        0.26
      )
    );
  }

  // L102. Rear-Barrel Inner Closed-Cell Foam Dust-Trap Sponge Gasket
  {
    const g = new THREE.Group();
    const innerFoam = new THREE.Mesh(
      extrudeCentered(createRingShape(34.8, 31.6), 1.35, 0.14, 0.14, 42),
      mats.lensFoamSeal
    );
    const secondaryApertureFoam = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(38.8, 36.8, cutStart, cutEnd), 1.15, 0.1, 0.1, 36),
      mats.lensFoamSeal
    );
    secondaryApertureFoam.position.z = 16.0;
    g.add(innerFoam, secondaryApertureFoam);

    parts.push(
      finalizePhase19LensPart(
        'lens-rear-inner-foam-seal',
        102,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 36.4),
        new THREE.Vector3(58, 42, -138),
        cp,
        0.22
      )
    );
  }

  // L103. Sony OEM Aperture Click ON/OFF Mechanical Wedge Cam & Lever (A-5031-641-A / A-5033-222-A)
  {
    const g = new THREE.Group();
    // Exterior slide switch knob + waterproof rubber gasket on right-lower barrel (-55 deg)
    const aSw = THREE.MathUtils.degToRad(-55);
    const rSw = 39.2;
    const swGroup = new THREE.Group();
    swGroup.position.set(Math.cos(aSw) * rSw, Math.sin(aSw) * rSw, 0);
    swGroup.rotation.z = aSw;

    const wpGasket = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(3.6, 11.2, 1.0), 0.7, 0.06, 0.06, 10),
      mats.epdmGasket
    );
    wpGasket.rotation.y = Math.PI / 2;
    const jointPlate = new THREE.Mesh(new THREE.BoxGeometry(0.9, 12.0, 4.2), mats.stainlessMachined);
    jointPlate.position.set(-1.4, 0, 0);
    // Internal white POM wedge cam sliding steel ball in/out of click detent
    const wedgeCam = new THREE.Mesh(new THREE.BoxGeometry(1.8, 5.4, 2.8), mats.zifIvoryPlastic);
    wedgeCam.position.set(-3.0, 2.2, 0.6);
    wedgeCam.rotation.x = 0.22;
    const clickKnob = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.4, 6.2, 0.9), 2.2, 0.1, 0.1, 8),
      mats.matteBlackAnodized
    );
    clickKnob.position.set(1.2, 0, 0);
    clickKnob.rotation.y = Math.PI / 2;
    swGroup.add(wpGasket, jointPlate, wedgeCam, clickKnob);
    g.add(swGroup);

    parts.push(
      finalizePhase19LensPart(
        'lens-iris-click-wedge-lever',
        103,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 56.0),
        new THREE.Vector3(78, -68, -22),
        cp,
        0.28
      )
    );
  }

  // L104. Aperture Ring Multi-Finger Precious-Metal Wiper Brush & Gold/Carbon Code Track
  {
    const g = new THREE.Group();
    const trackArc = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(37.4, 34.8, THREE.MathUtils.degToRad(200), THREE.MathUtils.degToRad(315)), 0.48, 0.03, 0.03, 28),
      mats.hdiMainboardPcb
    );
    // Gold arc traces on encoder board
    for (const rTrace of [35.4, 36.1, 36.8]) {
      const trace = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(rTrace + 0.16, rTrace - 0.16, THREE.MathUtils.degToRad(204), THREE.MathUtils.degToRad(311)), 0.12, 0.01, 0.01, 24),
        mats.goldPlating
      );
      trace.position.z = 0.28;
      g.add(trace);
    }
    // White POM brush slider carrier + 5 precious-metal multi-finger wipers
    const aBrush = THREE.MathUtils.degToRad(258);
    const slider = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.2, 1.4), mats.zifIvoryPlastic);
    slider.position.set(Math.cos(aBrush) * 36.1, Math.sin(aBrush) * 36.1, 1.0);
    slider.rotation.z = aBrush + Math.PI / 2;
    g.add(trackArc, slider);

    for (let f = -2; f <= 2; f++) {
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2.2, 0.14), mats.goldPlating);
      finger.position.set(Math.cos(aBrush + f * 0.02) * 36.1, Math.sin(aBrush + f * 0.02) * 36.1, 0.42);
      finger.rotation.z = aBrush + Math.PI / 2;
      g.add(finger);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-aperture-wiper-brush',
        104,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 54.4),
        new THREE.Vector3(-82, -74, -36),
        cp,
        0.26
      )
    );
  }

  // L105. Sony OEM Rear Outer Cover Assy (A-5031-638-A), Crimson Anodized G Master Badge & Serial Plate
  {
    const g = new THREE.Group();
    // Sculpted rear outer cover shell (cutaway-aware)
    const outerShroud = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(40.8, 39.2, cutStart, cutEnd), 14.2, 0.18, 0.18, 42),
      mats.lensBarrelAnodized
    );
    g.add(outerShroud);

    // Iconic red anodized aluminum square G Master badge at -15 deg (side-left visible in hero angle!)
    const aBadge = THREE.MathUtils.degToRad(202);
    const badge = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(6.2, 6.2, 0.6), 0.75, 0.08, 0.08, 8),
      mats.gMasterRedBadge
    );
    badge.position.set(Math.cos(aBadge) * 41.0, Math.sin(aBadge) * 41.0, 2.5);
    badge.rotation.y = Math.PI / 2 - (aBadge - Math.PI);
    // Crisp silver border inlay inside G badge
    const badgeInlay = new THREE.Mesh(
      extrudeCentered(createRingShape(2.0, 1.35), 0.18, 0.02, 0.02, 16),
      mats.stainlessMachined
    );
    badgeInlay.position.set(Math.cos(aBadge) * 41.45, Math.sin(aBadge) * 41.45, 2.5);
    badgeInlay.rotation.y = badge.rotation.y;

    // White mounting index bead at bottom-left rear rim
    const mountDot = new THREE.Mesh(new THREE.SphereGeometry(0.95, 12, 10), mats.zifIvoryPlastic);
    mountDot.position.set(Math.cos(Math.PI * 1.15) * 40.7, Math.sin(Math.PI * 1.15) * 40.7, -5.8);

    // Recessed laser-engraved serial nameplate on bottom
    const serialPlate = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.35, 4.6), mats.matteBlackAnodized);
    serialPlate.position.set(0, -40.9, -0.5);
    g.add(badge, badgeInlay, mountDot, serialPlate);

    parts.push(
      finalizePhase19LensPart(
        'lens-rear-outer-gm-badge',
        105,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, 44.5),
        new THREE.Vector3(-96, 52, -62),
        cp,
        0.24
      )
    );
  }

  // L106. Sony OEM Rear Fixed Lens Assy (A-5031-636-A) & 3-Point Eccentric Tilt Calibration Collars
  {
    const g = new THREE.Group();
    const cellRing = new THREE.Mesh(
      extrudeCentered(createRingShape(29.8, 25.4), 5.6, 0.14, 0.14, 40),
      mats.matteBlackAnodized
    );
    g.add(cellRing);

    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(35 + i * 120);
      const boss = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 2.6, 3.2, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      boss.position.set(Math.cos(a) * 28.4, Math.sin(a) * 28.4, 0);
      // Offset eccentric bore pin inside brass collar
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 3.8, 12).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      pin.position.set(Math.cos(a) * 28.4 + 0.35, Math.sin(a) * 28.4 + 0.25, 0);
      g.add(boss, pin);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-g5-rear-eccentric-boss',
        106,
        '#ca8a04',
        g,
        new THREE.Vector3(0, 0, 43.2),
        new THREE.Vector3(64, 52, -88),
        cp,
        0.26
      )
    );
  }

  // L107. Rear Stray-Light Baffle 3x Precision M1.7 Flange Screws & Load-Spreading Washers
  {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(90 + i * 120);
      const washer = new THREE.Mesh(
        extrudeCentered(createRingShape(2.1, 0.95), 0.25, 0.03, 0.03, 14),
        mats.matteBlackAnodized
      );
      washer.position.set(Math.cos(a) * 24.4, Math.sin(a) * 24.4, 0.18);
      const screw = createPrecisionScrew(1.55, 0.6, 3.5, mats.matteBlackAnodized);
      screw.position.set(Math.cos(a) * 24.4, Math.sin(a) * 24.4, -0.3);
      g.add(washer, screw);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-rear-baffle-3screws',
        107,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 36.2),
        new THREE.Vector3(46, -54, -148),
        cp,
        0.28
      )
    );
  }

  // L108. Factory Optical-Bench Gold Spring-Probe Calibration Test Pad Array (UART/JTAG)
  {
    const g = new THREE.Group();
    const stripArc = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(33.4, 30.8, THREE.MathUtils.degToRad(190), THREE.MathUtils.degToRad(245)), 0.45, 0.03, 0.03, 18),
      mats.hdiMainboardPcb
    );
    g.add(stripArc);
    for (let i = 0; i < 12; i++) {
      const a = THREE.MathUtils.degToRad(194 + i * 4.2);
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.48, 0.14, 12).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      pad.position.set(Math.cos(a) * 32.1, Math.sin(a) * 32.1, -0.28);
      g.add(pad);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-pcb-jtag-test-pads',
        108,
        '#facc15',
        g,
        new THREE.Vector3(0, 0, 44.8),
        new THREE.Vector3(-92, -32, -82),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SECTION 2 (2/3 中央ユニット — 11-Blade Iris, Quad XD, Floating Core): L109–L118
  // =========================================================================

  // L109. Sony OEM S-Mid Block Core Frame (A-5031-637-A) & Fixed Center Group Barrel (A-5031-635-A)
  {
    const g = new THREE.Group();
    const coreRing = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(37.2, 33.4, cutStart, cutEnd), 12.6, 0.16, 0.16, 40),
      mats.magnesiumCast
    );
    const centerOptCell = new THREE.Mesh(
      extrudeCentered(createRingShape(27.8, 24.4), 7.2, 0.14, 0.14, 36),
      mats.matteBlackAnodized
    );
    centerOptCell.position.z = -1.2;
    // 4 radial reinforcing webs linking fixed center optical cell to outer core frame
    for (const deg of [180, 240, 300, 360]) {
      const a = THREE.MathUtils.degToRad(deg);
      const web = new THREE.Mesh(new THREE.BoxGeometry(6.6, 1.8, 5.2), mats.magnesiumCast);
      web.position.set(Math.cos(a) * 30.6, Math.sin(a) * 30.6, -1.2);
      web.rotation.z = a;
      g.add(web);
    }
    g.add(coreRing, centerOptCell);

    parts.push(
      finalizePhase19LensPart(
        'lens-mid-block-core-frame',
        109,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 74.5),
        new THREE.Vector3(-96, 56, 18),
        cp,
        0.24
      )
    );
  }

  // L110. Sub-Aperture Rigid Stainless Partition Plate (4-Screw) & Dual-Side Silicone Cushion Bumpers
  {
    const g = new THREE.Group();
    const plate = new THREE.Mesh(
      extrudeCentered(createRingShape(34.6, 25.6), 0.85, 0.06, 0.06, 42),
      mats.stainlessMachined
    );
    g.add(plate);

    // 4 perimeter retaining screws + 6 soft silicone cushion bumpers (3 front, 3 rear)
    for (let i = 0; i < 4; i++) {
      const a = THREE.MathUtils.degToRad(45 + i * 90);
      const s = createPrecisionScrew(1.4, 0.55, 2.6, mats.matteBlackAnodized);
      s.position.set(Math.cos(a) * 32.4, Math.sin(a) * 32.4, 0.45);
      g.add(s);
    }
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(20 + i * 120);
      for (const sz of [-0.72, 0.72]) {
        const bumper = new THREE.Mesh(
          new THREE.CylinderGeometry(1.75, 1.9, 0.85, 14).rotateX(Math.PI / 2),
          mats.damperElastomer
        );
        bumper.position.set(Math.cos(a) * 28.4, Math.sin(a) * 28.4, sz);
        g.add(bumper);
      }
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-iris-partition-bumpers',
        110,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 78.2),
        new THREE.Vector3(82, 46, 58),
        cp,
        0.26
      )
    );
  }

  // L111. Floating Focus-Group Center-of-Gravity (CoG) Balance Counterweights & Thrust Flanges
  {
    const g = new THREE.Group();
    for (const deg of [0, 180]) {
      const a = THREE.MathUtils.degToRad(deg);
      const weight = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(31.2, 27.6, a - 0.24, a + 0.24), 4.6, 0.14, 0.14, 16),
        mats.tungstenCopper
      );
      const flange = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 7.2, 1.4),
        mats.brassGear
      );
      flange.position.set(Math.cos(a) * 29.4, Math.sin(a) * 29.4, 2.8);
      flange.rotation.z = a;
      g.add(weight, flange);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-floating-cog-weights',
        111,
        '#b45309',
        g,
        new THREE.Vector3(0, 0, 71.2),
        new THREE.Vector3(-88, -64, 26),
        cp,
        0.26
      )
    );
  }

  // L112. 11-Blade Iris Micro-Module Reduction Pinion Gear Train & Anti-Backlash Torsion Hairspring
  {
    const g = new THREE.Group();
    // 3-stage micro reduction pinion gear train nestled right beside L18 iris stepper
    const gearSpecs: Array<[number, number, number, THREE.Material]> = [
      [25.6, -15.4, 2.2, mats.brassGear],
      [22.4, -18.2, 3.0, mats.pomGear],
      [18.8, -20.6, 2.5, mats.stainlessMachined],
    ];
    for (const [gx, gy, r, mat] of gearSpecs) {
      const gear = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, 1.2, 18).rotateX(Math.PI / 2),
        mat
      );
      gear.position.set(gx, gy, 0);
      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 2.2, 10).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      hub.position.set(gx, gy, 0);
      g.add(gear, hub);
    }
    // Watchmaker anti-backlash torsion hairspring
    const hairspring = new THREE.Mesh(
      createHelicalSpringGeometry(1.9, 1.1, 3.5, 0.14),
      mats.mountSpringSteel
    );
    hairspring.position.set(22.4, -18.2, 1.15);
    hairspring.userData.noEdges = true;
    g.add(hairspring);

    parts.push(
      finalizePhase19LensPart(
        'lens-iris-pinion-hairspring',
        112,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 81.2),
        new THREE.Vector3(94, -56, 72),
        cp,
        0.28
      )
    );
  }

  // L113. Inner-Barrel Auxiliary Sensor/Iris Sub-PCB & Flame-Retardant Black Protective Shroud
  {
    const g = new THREE.Group();
    const subPcb = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(38.0, 36.2, THREE.MathUtils.degToRad(265), THREE.MathUtils.degToRad(320)), 10.4, 0.08, 0.08, 18),
      mats.hdiMainboardPcb
    );
    const shroud = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(39.0, 38.15, THREE.MathUtils.degToRad(262), THREE.MathUtils.degToRad(323)), 11.4, 0.1, 0.1, 18),
      mats.matteBlackAnodized
    );
    g.add(subPcb, shroud);

    parts.push(
      finalizePhase19LensPart(
        'lens-barrel-sub-pcb-cover',
        113,
        '#15803d',
        g,
        new THREE.Vector3(0, 0, 68.5),
        new THREE.Vector3(64, -92, -16),
        cp,
        0.24
      )
    );
  }

  // L114. Floating-Group Dynamic U-Bend Rolling-Flex Polyimide Loop (Roll-Flex) & Radius Guide
  {
    const g = new THREE.Group();
    for (const deg of [210, 330]) {
      const a = THREE.MathUtils.degToRad(deg);
      const u = new THREE.Group();
      u.position.set(Math.cos(a) * 32.0, Math.sin(a) * 32.0, 0);
      u.rotation.z = a;
      // U-shaped rolling flex loop (two parallel straight limbs + semi-circular bend)
      const limbA = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.4, 16.0), mats.polyimideFpc);
      limbA.position.set(-1.6, 0, 0);
      const limbB = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.4, 16.0), mats.polyimideFpc);
      limbB.position.set(1.6, 0, 0);
      const bend = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.16, 8, 16, Math.PI).rotateY(Math.PI / 2),
        mats.polyimideFpc
      );
      bend.position.set(0, 0, 8.0);
      // Smooth black POM radius control arch
      const guideArch = new THREE.Mesh(new THREE.BoxGeometry(4.4, 5.2, 2.2), mats.matteBlackAnodized);
      guideArch.position.set(0, 0, 9.4);
      u.add(limbA, limbB, bend, guideArch);
      g.add(u);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-xd-rollflex-loop',
        114,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, 67.0),
        new THREE.Vector3(-84, -84, -34),
        cp,
        0.26
      )
    );
  }

  // L115. XD Linear Mover Anti-Rotation Precision Guide Peg & Slotted Fork Track
  {
    const g = new THREE.Group();
    for (const deg of [195, 15]) {
      const a = THREE.MathUtils.degToRad(deg);
      const u = new THREE.Group();
      u.position.set(Math.cos(a) * 29.8, Math.sin(a) * 29.8, 0);
      u.rotation.z = a;
      // Stationary stainless anti-twist pin rail
      const peg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.82, 0.82, 24.0, 12).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      // U-slotted white POM fork riding cleanly on the peg
      const forkL = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.9, 5.4), mats.zifIvoryPlastic);
      forkL.position.set(0, 1.25, 2.2);
      const forkR = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.9, 5.4), mats.zifIvoryPlastic);
      forkR.position.set(0, -1.25, 2.2);
      const forkBase = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.4, 5.4), mats.zifIvoryPlastic);
      forkBase.position.set(-1.6, 0, 2.2);
      u.add(peg, forkL, forkR, forkBase);
      g.add(u);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-xd-antitwist-peg',
        115,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 66.5),
        new THREE.Vector3(96, 18, -42),
        cp,
        0.26
      )
    );
  }

  // L116. Dual Landscape/Portrait Focus-Hold Button Sealed Conical Silicone Boots & Snap-Domes
  {
    const g = new THREE.Group();
    const podConfigs: Array<{ x: number; y: number; z: number; rotZ: number }> = [
      { x: -40.4, y: 0, z: 0, rotZ: Math.PI },        // 9 o'clock landscape button
      { x: 0, y: 40.4, z: 3.5, rotZ: Math.PI / 2 },   // 12 o'clock portrait button
    ];
    for (const cfg of podConfigs) {
      const p = new THREE.Group();
      p.position.set(cfg.x, cfg.y, cfg.z);
      p.rotation.z = cfg.rotZ;
      const flange = new THREE.Mesh(
        new THREE.CylinderGeometry(4.4, 4.4, 0.55, 18).rotateZ(Math.PI / 2),
        mats.epdmGasket
      );
      const coneBoot = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 3.8, 2.1, 18).rotateZ(Math.PI / 2),
        mats.damperElastomer
      );
      coneBoot.position.x = 1.2;
      const snapDome = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.42).rotateZ(-Math.PI / 2),
        mats.stainlessMachined
      );
      snapDome.position.x = -0.35;
      p.add(flange, coneBoot, snapDome);
      g.add(p);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-hold-btn-wp-boots',
        116,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 71.5),
        new THREE.Vector3(-106, 72, 14),
        cp,
        0.26
      )
    );
  }

  // L117. AF/MF Slide Switch Dual-Lip Waterproof Rubber Wiper & W-Shaped Stainless Detent Spring
  {
    const g = new THREE.Group();
    const sw = new THREE.Group();
    sw.position.set(-40.2, -10.5, 0);
    sw.rotation.z = Math.PI + 0.25;
    const wiperSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(6.2, 13.4, 1.2), 0.65, 0.06, 0.06, 10),
      mats.epdmGasket
    );
    wiperSheet.rotation.y = Math.PI / 2;
    const detentLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.35, 9.8, 3.2), mats.mountSpringSteel);
    detentLeaf.position.x = -1.1;
    const slideCap = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.4, 6.4, 0.8), 2.4, 0.1, 0.1, 8),
      mats.matteBlackAnodized
    );
    slideCap.position.x = 1.3;
    slideCap.rotation.y = Math.PI / 2;
    sw.add(wiperSheet, detentLeaf, slideCap);
    g.add(sw);

    parts.push(
      finalizePhase19LensPart(
        'lens-afmf-switch-wiper',
        117,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 67.5),
        new THREE.Vector3(-110, -48, -22),
        cp,
        0.28
      )
    );
  }

  // L118. Split Front/Rear Magnesium Inner-Barrel Locating Dowel Pins (2x) & Long M2.0 Tie Bolts (6x)
  {
    const g = new THREE.Group();
    // 2 hardened stainless precision dowel pins
    for (const deg of [190, 10]) {
      const a = THREE.MathUtils.degToRad(deg);
      const dowel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.0, 1.0, 9.2, 14).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      dowel.position.set(Math.cos(a) * 35.4, Math.sin(a) * 35.4, 0);
      g.add(dowel);
    }
    // 6 long M2.0 high-tensile steel tie bolts joining front & rear magnesium inner barrels
    for (let i = 0; i < 6; i++) {
      const a = THREE.MathUtils.degToRad(40 + i * 60);
      const bolt = createPrecisionScrew(1.8, 0.75, 10.0, mats.stainlessMachined);
      bolt.position.set(Math.cos(a) * 35.4, Math.sin(a) * 35.4, -3.5);
      g.add(bolt);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-split-barrel-dowels',
        118,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 78.8),
        new THREE.Vector3(74, 72, 62),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SECTION 3 (3/3 前部ユニット — Front XA/ED, Nano AR II, MF Ring, Hood): L119–L128
  // =========================================================================

  // L119. Front Engraved Makeup Ring & Thick Blue-Violet Front-Element Weather-Seal Ring
  {
    const g = new THREE.Group();
    const makeupRing = new THREE.Mesh(
      extrudeCentered(createRingShape(36.2, 32.4), 1.4, 0.1, 0.1, 44),
      mats.matteBlackAnodized
    );
    makeupRing.position.z = 1.4;
    // Signature thick light-blue / violet silicone seal ring observed under front makeup ring in Lensrentals GM teardowns
    const violetSeal = new THREE.Mesh(
      new THREE.TorusGeometry(33.8, 1.25, 14, 48),
      mats.makeupSealViolet
    );
    violetSeal.position.z = -0.35;
    violetSeal.userData.noEdges = true;
    g.add(makeupRing, violetSeal);

    parts.push(
      finalizePhase19LensPart(
        'lens-front-makeup-violet-seal',
        119,
        '#6366f1',
        g,
        new THREE.Vector3(0, 0, 114.2),
        new THREE.Vector3(62, 54, 152),
        cp,
        0.24
      )
    );
  }

  // L120. Focus-Ring 3x White Springy POM Friction Slider Pads (Tensioners) & Sealing Tape
  {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const a = THREE.MathUtils.degToRad(30 + i * 120);
      const u = new THREE.Group();
      u.position.set(Math.cos(a) * 38.6, Math.sin(a) * 38.6, 0);
      u.rotation.z = a;
      // Springy arched white POM tensioner slider pad
      const pad = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(1.5, 11.4, 0.6), 4.8, 0.08, 0.08, 10),
        mats.zifIvoryPlastic
      );
      u.add(pad);
      g.add(u);
    }
    // Thin black dust-sealing tape band wrapping over the slider ports
    const tapeBand = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(39.7, 39.45, cutStart, cutEnd), 6.2, 0.02, 0.02, 42),
      mats.matteBlackAnodized
    );
    g.add(tapeBand);

    parts.push(
      finalizePhase19LensPart(
        'lens-mf-pom-slider-pads',
        120,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 0, 97.6),
        new THREE.Vector3(-86, 62, 32),
        cp,
        0.26
      )
    );
  }

  // L121. Focus-Ring Internal Fine-Pitch Ring Gear & Rotary MF Position-Sensor Pinion Assembly
  {
    const g = new THREE.Group();
    const gearRing = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(38.8, 37.2, cutStart, cutEnd), 2.8, 0.06, 0.06, 44),
      mats.matteBlackAnodized
    );
    // Fine gear tooth texture notches around inner circumference
    for (let i = 0; i < 32; i++) {
      const a = cutStart + ((cutEnd - cutStart) * i) / 31;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 2.5), mats.pomGear);
      tooth.position.set(Math.cos(a) * 37.0, Math.sin(a) * 37.0, 0);
      tooth.rotation.z = a;
      g.add(tooth);
    }
    // Meshing white rotary MF position sensor pinion on inner barrel wall
    const aPin = THREE.MathUtils.degToRad(240);
    const pinion = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 2.6, 16).rotateX(Math.PI / 2),
      mats.zifIvoryPlastic
    );
    pinion.position.set(Math.cos(aPin) * 34.1, Math.sin(aPin) * 34.1, 0);
    const sensorHousing = new THREE.Mesh(new THREE.BoxGeometry(5.8, 5.8, 2.4), mats.icEpoxy);
    sensorHousing.position.set(Math.cos(aPin) * 34.1, Math.sin(aPin) * 34.1, -2.5);
    g.add(gearRing, pinion, sensorHousing);

    parts.push(
      finalizePhase19LensPart(
        'lens-mf-internal-ring-gear',
        121,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 93.4),
        new THREE.Vector3(-92, -62, -16),
        cp,
        0.26
      )
    );
  }

  // L122. Front-Group 3-Window Optical Tilt Calibration Shims (0.27–0.48 mm) & Access Port Covers
  {
    const g = new THREE.Group();
    const shimSpecs: Array<{ deg: number; thick: number; mat: THREE.Material }> = [
      { deg: 15, thick: 0.48, mat: mats.brassGear },
      { deg: 135, thick: 0.35, mat: mats.mountShimBlue },
      { deg: 255, thick: 0.27, mat: mats.stainlessMachined },
    ];
    for (const sp of shimSpecs) {
      const a = THREE.MathUtils.degToRad(sp.deg);
      const shim = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(4.8, 7.6, 1.0), sp.thick, 0.03, 0.03, 10),
        sp.mat
      );
      shim.position.set(Math.cos(a) * 36.4, Math.sin(a) * 36.4, 0);
      shim.rotation.z = a;
      const bolt = createPrecisionScrew(1.5, 0.6, 3.2, mats.stainlessMachined);
      bolt.position.set(Math.cos(a) * 36.4, Math.sin(a) * 36.4, 1.2);
      g.add(shim, bolt);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-front-window-tilt-shims',
        122,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 105.8),
        new THREE.Vector3(82, -52, 84),
        cp,
        0.28
      )
    );
  }

  // L123. Sony OEM Filter Barrel Assy (A-5031-640-A) & Under-Filter Thick Foamed Weather Gasket
  {
    const g = new THREE.Group();
    const filterCollar = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(40.6, 36.6, cutStart, cutEnd), 5.6, 0.16, 0.16, 44),
      mats.lensBarrelAnodized
    );
    const thickGasket = new THREE.Mesh(
      new THREE.TorusGeometry(38.4, 1.15, 12, 44),
      mats.lensFoamSeal
    );
    thickGasket.position.z = -3.2;
    thickGasket.userData.noEdges = true;
    g.add(filterCollar, thickGasket);

    parts.push(
      finalizePhase19LensPart(
        'lens-filter-assy-thick-gasket',
        123,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 117.6),
        new THREE.Vector3(-76, 68, 174),
        cp,
        0.24
      )
    );
  }

  // L124. 2nd Large-Diameter XA Group Perimeter Shock-Absorbing Optical Sealant Bead & Retaining Screws
  {
    const g = new THREE.Group();
    const sealantRing = new THREE.Mesh(
      new THREE.TorusGeometry(32.2, 0.72, 10, 44),
      mats.dustCatcherGel
    );
    sealantRing.userData.noEdges = true;
    g.add(sealantRing);

    for (let i = 0; i < 4; i++) {
      const a = THREE.MathUtils.degToRad(45 + i * 90);
      const tab = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.2, 0.9), mats.stainlessMachined);
      tab.position.set(Math.cos(a) * 33.4, Math.sin(a) * 33.4, 0.6);
      tab.rotation.z = a;
      const screw = createPrecisionScrew(1.4, 0.55, 2.8, mats.matteBlackAnodized);
      screw.position.set(Math.cos(a) * 34.4, Math.sin(a) * 34.4, 1.2);
      g.add(tab, screw);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-g2-xa-sealant-screws',
        124,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0, 102.2),
        new THREE.Vector3(76, 56, 66),
        cp,
        0.26
      )
    );
  }

  // L125. Independent Front Optical Group Threaded Spanner Retaining Rings & Cryogenic Cushion O-Rings
  {
    const g = new THREE.Group();
    const ringZList: Array<[number, number, number]> = [
      [35.2, 32.6, 5.2],   // G1 front spanner ring
      [32.0, 29.4, -2.6],  // G2 spanner ring
      [29.6, 27.0, -8.8],  // G3 cemented doublet spanner ring
    ];
    for (const [rOut, rIn, zOff] of ringZList) {
      const spanner = new THREE.Mesh(
        extrudeCentered(createRingShape(rOut, rIn), 1.35, 0.08, 0.08, 40),
        mats.matteBlackAnodized
      );
      spanner.position.z = zOff;
      // 2 opposite spanner-wrench notches (gold highlight)
      for (const sx of [-1, 1]) {
        const notch = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.85, 0.55), mats.brassGear);
        notch.position.set(sx * ((rOut + rIn) * 0.5), 0, zOff + 0.55);
        g.add(notch);
      }
      const cushionO = new THREE.Mesh(
        new THREE.TorusGeometry(rIn + 0.5, 0.34, 8, 36),
        mats.epdmGasket
      );
      cushionO.position.z = zOff - 0.8;
      cushionO.userData.noEdges = true;
      g.add(spanner, cushionO);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-front-spanner-orings',
        125,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 104.2),
        new THREE.Vector3(-64, -74, 96),
        cp,
        0.24
      )
    );
  }

  // L126. Cold-Weather Elastomer Knurled Rubber Focus Grip (A-5031-642-A) & Dust-Proof Adhesive Tape
  {
    const g = new THREE.Group();
    const gripShell = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(43.1, 41.6, cutStart, cutEnd), 18.0, 0.16, 0.16, 46),
      mats.lensRubberGrip
    );
    g.add(gripShell);
    // Fine ergonomic tactile knurling ribs along exterior of cold-weather rubber band
    for (let i = 0; i < 28; i++) {
      const a = cutStart + ((cutEnd - cutStart) * i) / 27;
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.65, 16.8), mats.lensRubberGrip);
      rib.position.set(Math.cos(a) * 43.25, Math.sin(a) * 43.25, 0);
      rib.rotation.z = a;
      g.add(rib);
    }

    parts.push(
      finalizePhase19LensPart(
        'lens-cold-rubber-grip-tape',
        126,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 96.5),
        new THREE.Vector3(96, -18, 22),
        cp,
        0.22
      )
    );
  }

  // L127. ALC-SH163 (X50017721) Hood Push-Release Lock Button, Hardened Steel Latch Pin & Return Spring
  {
    const g = new THREE.Group();
    const aLock = THREE.MathUtils.degToRad(210);
    const lockGroup = new THREE.Group();
    lockGroup.position.set(Math.cos(aLock) * 44.0, Math.sin(aLock) * 44.0, 0);
    lockGroup.rotation.z = aLock;

    const btnCap = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.8, 8.8, 1.2), 2.4, 0.12, 0.12, 10),
      mats.matteBlackAnodized
    );
    btnCap.rotation.y = Math.PI / 2;
    btnCap.position.x = 0.8;

    const latchPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 5.2, 12).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    latchPin.position.set(-2.2, 0, -0.6);

    const retSpring = new THREE.Mesh(
      createHelicalSpringGeometry(1.15, 3.6, 5, 0.2).rotateY(Math.PI / 2),
      mats.mountSpringSteel
    );
    retSpring.position.set(-1.4, 0, -0.6);
    retSpring.userData.noEdges = true;
    lockGroup.add(btnCap, latchPin, retSpring);
    g.add(lockGroup);

    parts.push(
      finalizePhase19LensPart(
        'lens-hood-release-lock-pin',
        127,
        '#ef4444',
        g,
        new THREE.Vector3(0, 0, 119.8),
        new THREE.Vector3(-88, -54, 212),
        cp,
        0.28
      )
    );
  }

  // L128. ALC-SH163 Front Rim Shock-Absorbing TPE Face-Down Bumper Lip & Raised Red Index Dot
  {
    const g = new THREE.Group();
    const tpeRim = new THREE.Mesh(
      new THREE.TorusGeometry(43.2, 1.45, 14, 48),
      mats.lensRubberGrip
    );
    tpeRim.position.z = 1.2;
    tpeRim.userData.noEdges = true;

    // Raised red hood-alignment index dot at rear hood flange
    const redDot = new THREE.Mesh(new THREE.SphereGeometry(1.15, 12, 10), mats.gMasterRedBadge);
    redDot.position.set(0, 44.2, -14.2);
    g.add(tpeRim, redDot);

    parts.push(
      finalizePhase19LensPart(
        'lens-hood-tpe-bumper-dot',
        128,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, 134.8),
        new THREE.Vector3(0, 48, 256),
        cp,
        0.24
      )
    );
  }

  return parts;
}
