import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createHelicalSpringGeometry,
  createOpticalLensGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { LENS_MICRO_EXPLANATIONS } from './lensMicroExplanations';

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

function finalizeStandaloneLensMicroPart(
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
    subsystem: 'lens',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: LENS_MICRO_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Build 24 Phase 18A standalone-only ultra-micro CAD parts for the 50mm F1.2 GM Prime Lens (L75–L98).
 * Strictly omitted in whole-camera modes ('integrated', 'camera_body'); visible ONLY in standalone 'lens' mode!
 * Respects lens cutaway window (cutStart=168°..cutEnd=435°) so internal cutaway optics gleam unobstructed when assembled.
 */
export function buildLensMicroParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const cutStart = THREE.MathUtils.degToRad(168);
  const cutEnd = THREE.MathUtils.degToRad(435);
  const motorAnglesDeg = [45, 135, 225, 315];
  const motorR = 32.8;

  // =========================================================================
  // L75. Front Element 15 nm Hydrophobic/Oleophobic Fluorine Nano-Coating (z = +110.55 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const coatShell = new THREE.Mesh(
      createOpticalLensGeometry(32.5, 0.22, 5.32, -5.24, 0.48, -0.46, 16, 40),
      mats.fluorineCoatCyan
    );
    coatShell.userData.noEdges = true;
    g.add(coatShell);

    // Subtle hydrophobic cyan rim trace showing 15 nm fluorine boundary
    const rim = new THREE.Mesh(new THREE.TorusGeometry(32.5, 0.28, 8, 44), mats.fluorineCoatCyan);
    rim.position.z = -0.05;
    rim.userData.noEdges = true;
    g.add(rim);

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-fluorine-topcoat',
        75,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 110.55),
        new THREE.Vector3(0, 74, 242),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // L76. Sony Nano AR Coating II Sub-Wavelength Porous Silica Structure (z = +105.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin ultra-thin curved iridescent shells hugging L08 rear & L09 front optical surfaces
    const film1 = new THREE.Mesh(
      createOpticalLensGeometry(30.4, 0.2, 2.05, -2.0, 0.16, -0.15, 16, 38),
      mats.nanoArIridescent
    );
    film1.position.z = 0.7;
    film1.userData.noEdges = true;
    const film2 = new THREE.Mesh(
      createOpticalLensGeometry(30.2, 0.2, 3.88, -3.82, 0.08, -0.07, 16, 38),
      mats.nanoArIridescent
    );
    film2.position.z = -1.9;
    film2.userData.noEdges = true;
    g.add(film1, film2);

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-nano-ar-ii-layer',
        76,
        '#8b5cf6',
        g,
        new THREE.Vector3(0, 0, 105.6),
        new THREE.Vector3(0, -76, 212),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // L77. Ground-Glass Outer-Rim Sumi-Nuri Matte Blackening across All 14 Elements
  // =========================================================================
  {
    const g = new THREE.Group();
    const stations: Array<[number, number, number]> = [
      [108.5, 28.0, 3.6],
      [102.0, 26.2, 3.2],
      [96.2, 24.4, 3.0],
      [92.4, 24.0, 2.2],
      [88.0, 20.6, 2.0],
      [72.0, 22.8, 3.0],
      [57.0, 21.8, 2.6],
      [41.6, 22.6, 3.4],
    ];
    for (const [sz, r, depth] of stations) {
      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(r + 0.35, r + 0.35, depth, 36, 1, true).rotateX(Math.PI / 2),
        mats.velvetFlockTrap
      );
      band.position.z = sz - 74.0;
      g.add(band);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-edge-sumi-blackening',
        77,
        '#0f172a',
        g,
        new THREE.Vector3(0, 0, 74.0),
        new THREE.Vector3(-94, -56, 162),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // L78. G3a/G3b Cemented Doublet 15 μm Index-Matched UV Optical Cement Layer (z = +94.3 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const cementFilm = new THREE.Mesh(
      createOpticalLensGeometry(28.8, 0.22, -1.42, 1.46, 0.0, 0.0, 16, 38),
      mats.opticalCementClear
    );
    cementFilm.userData.noEdges = true;
    const goldRing = new THREE.Mesh(new THREE.TorusGeometry(28.8, 0.28, 8, 40), mats.mylarInsulatorFilm);
    goldRing.userData.noEdges = true;
    g.add(cementFilm, goldRing);

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-uv-cement-bond',
        78,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, 94.3),
        new THREE.Vector3(74, 58, 146),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // L79. 3-Point UV Elastomeric Element-Potting Wells & Thermal Relief Slots (120° x 3 Stations)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [sz, r] of [
      [28.0, 29.2],
      [-2.0, 24.4],
      [-32.4, 24.2],
    ] as Array<[number, number]>) {
      for (let k = 0; k < 3; k++) {
        const ang = THREE.MathUtils.degToRad(k * 120 + 210);
        const well = new THREE.Mesh(
          new THREE.CylinderGeometry(1.75, 1.75, 3.2, 14).rotateX(Math.PI / 2),
          mats.thermalPadPink
        );
        well.position.set(Math.cos(ang) * r, Math.sin(ang) * r, sz);

        const reliefSlot = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.2, 3.4), mats.matteBlackAnodized);
        reliefSlot.position.set(Math.cos(ang) * (r + 1.4), Math.sin(ang) * (r + 1.4), sz);
        reliefSlot.rotation.z = ang;
        g.add(well, reliefSlot);
      }
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-uv-potting-wells',
        79,
        '#f472b6',
        g,
        new THREE.Vector3(0, 0, 74.0),
        new THREE.Vector3(-96, 62, 124),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L80. Sony GM Triangular Optical-Phase Reassembly Alignment Marks (▲)
  // =========================================================================
  {
    const g = new THREE.Group();
    const triShape = new THREE.Shape();
    triShape.moveTo(0, 2.2);
    triShape.lineTo(-1.8, -1.3);
    triShape.lineTo(1.8, -1.3);
    triShape.closePath();
    const triGeo = extrudeCentered(triShape, 0.55, 0.04, 0.04, 6);

    // 5 axial witness triangles aligned at 270° (-Y bottom datum line) across optical cells & barrels
    for (const [tz, r] of [
      [36.0, 35.8],
      [18.0, 35.2],
      [0.0, 35.4],
      [-18.0, 34.8],
      [-35.0, 33.6],
    ] as Array<[number, number]>) {
      const marker = new THREE.Mesh(triGeo, mats.goldPlating);
      marker.position.set(0, -r, tz);
      marker.rotation.x = Math.PI / 2;
      g.add(marker);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-phase-align-marks',
        80,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 74.0),
        new THREE.Vector3(88, -88, 128),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L81. 1/8-Turn Bayonet Filter-Ring Retention Lugs & Impact-Sacrificial Screws (z = +115.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const a0 = THREE.MathUtils.degToRad(i * 120 + 185);
      const a1 = THREE.MathUtils.degToRad(i * 120 + 220);
      const lug = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(40.6, 37.8, a0, a1), 2.1, 0.08, 0.08, 12),
        mats.brassGear
      );
      g.add(lug);

      const midA = (a0 + a1) * 0.5;
      const scr = createPrecisionScrew(1.2, 0.5, 3.8, mats.stainlessMachined);
      scr.position.set(Math.cos(midA) * 39.2, Math.sin(midA) * 39.2, 1.4);
      g.add(scr);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-filter-bayonet-slots',
        81,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 115.6),
        new THREE.Vector3(82, 92, 266),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L82. Linear-Response MF Fluorinated Optical Damping-Grease Shear Film (z = +96.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Translucent cyan shear film band strictly respecting cutaway window!
    const greaseBand = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(39.4, 38.4, cutStart, cutEnd), 12.6, 0.08, 0.08, 36),
      mats.fluorineCoatCyan
    );
    greaseBand.userData.noEdges = true;
    g.add(greaseBand);

    // Twin capillary oil-stop labyrinth barrier rings at both ends
    for (const gz of [-6.8, 6.8]) {
      const stopRing = new THREE.Mesh(
        new THREE.TorusGeometry(38.9, 0.42, 8, 34, cutEnd - cutStart),
        mats.oilTrapPorousPad
      );
      stopRing.position.z = gz;
      stopRing.rotation.z = cutStart;
      stopRing.userData.noEdges = true;
      g.add(stopRing);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-mf-fluorogrease-film',
        82,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 96.0),
        new THREE.Vector3(-82, 114, 126),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // L83. 11-Blade Iris Micro-Rivet Pivot/Cam Pins (22x) & Inter-Blade 30 μm PTFE Sheet (z = +82.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ptfeSheet = new THREE.Mesh(
      extrudeCentered(createRingShape(27.8, 19.6), 0.22, 0.02, 0.02, 40),
      mats.zifIvoryPlastic
    );
    ptfeSheet.position.z = 0.55;
    g.add(ptfeSheet);

    // 11 pivot pins (outer ring) + 11 cam follower pins (inner ring) = 22 DLC micro pins
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2;
      const pivotPin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 1.8, 10).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      pivotPin.position.set(Math.cos(a) * 25.4, Math.sin(a) * 25.4, 0);
      const camPin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 1.8, 10).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      camPin.position.set(Math.cos(a + 0.18) * 22.8, Math.sin(a + 0.18) * 22.8, 0.25);
      g.add(pivotPin, camPin);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-iris-blade-pins-ptfe',
        83,
        '#f8fafc',
        g,
        new THREE.Vector3(0, 0, 82.4),
        new THREE.Vector3(-92, -32, 54),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L84. Quad XD Sintered Oil-Impregnated Bronze/Graphite Linear Sleeve Bushings (8x, z = +65.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bushingGeo = new THREE.CylinderGeometry(2.15, 2.15, 5.4, 18, 1, true).rotateX(Math.PI / 2);
    const linerGeo = new THREE.CylinderGeometry(1.75, 1.75, 5.6, 16, 1, true).rotateX(Math.PI / 2);

    for (let i = 0; i < motorAnglesDeg.length; i++) {
      const a = THREE.MathUtils.degToRad(motorAnglesDeg[i]);
      const bx = Math.cos(a) * (motorR - 3.0);
      const by = Math.sin(a) * (motorR - 3.0);
      for (const bz of [5.5, -6.5]) {
        const sleeve = new THREE.Mesh(bushingGeo, mats.sinteredBronzeBushing);
        sleeve.position.set(bx, by, bz);
        const liner = new THREE.Mesh(linerGeo, mats.pyroGraphite);
        liner.position.set(bx, by, bz);
        g.add(sleeve, liner);
      }
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-xd-sintered-bushings',
        84,
        '#b45309',
        g,
        new THREE.Vector3(0, 0, 65.0),
        new THREE.Vector3(106, 56, -42),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L85. Power-Off Unpowered Magnetic Parking Brake & Ferromagnetic Keeper Strips (z = +65.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (let i = 0; i < motorAnglesDeg.length; i++) {
      const a = THREE.MathUtils.degToRad(motorAnglesDeg[i]);
      const unit = new THREE.Group();
      unit.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      unit.rotation.z = a;

      const zPark = i % 2 === 0 ? 14.0 : -14.0;
      const ironKeeper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 5.2, 1.8), mats.pureIronArmature);
      ironKeeper.position.set(0.4, 0, zPark);
      const silPad = new THREE.Mesh(new THREE.BoxGeometry(2.6, 5.4, 0.45), mats.antiVibRubber);
      silPad.position.set(0.4, 0, zPark + (i % 2 === 0 ? -1.1 : 1.1));
      unit.add(ironKeeper, silPad);
      g.add(unit);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-xd-magnetic-park-brake',
        85,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, 65.0),
        new THREE.Vector3(-124, -46, -68),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L86. Floating Focus-Group Front Ultra-Thin Adhesive Matte Light-Shield Foil (z = +76.4 & +61.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const foilA = new THREE.Mesh(
      extrudeCentered(createRingShape(26.6, 19.8), 0.16, 0.01, 0.01, 40),
      mats.velvetFlockTrap
    );
    foilA.position.z = 7.4;

    const foilB = new THREE.Mesh(
      extrudeCentered(createRingShape(25.2, 19.0), 0.16, 0.01, 0.01, 40),
      mats.velvetFlockTrap
    );
    foilB.position.z = -7.6;

    g.add(foilA, foilB);

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-focus-front-lightfoil',
        86,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 69.0),
        new THREE.Vector3(98, -14, 16),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // L87. MR Magnetic-Encoder 80 μm Air-Gap Calibration Shims & Non-Magnetic SUS Clips (z = +65.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const deg of motorAnglesDeg) {
      const a = THREE.MathUtils.degToRad(deg + 14);
      const u = new THREE.Group();
      u.position.set(Math.cos(a) * (motorR + 1.8), Math.sin(a) * (motorR + 1.8), 0);
      u.rotation.z = a;

      const shim = new THREE.Mesh(new THREE.BoxGeometry(0.42, 4.2, 11.5), mats.mountShimBlue);
      const clip = new THREE.Mesh(new THREE.BoxGeometry(1.2, 5.0, 2.2), mats.stainlessMachined);
      clip.position.set(0.65, 0, 0);
      u.add(shim, clip);
      g.add(u);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-mr-gap-calib-shims',
        87,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, 65.0),
        new THREE.Vector3(124, -64, -64),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L88. Internal Barrel Wall 0.3 mm-Pitch Micro-Threaded V-Groove Light-Trap Serrations (z = +70.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Respect cutaway window! 10 concentric V-groove matte-black thread rings lining inner fixed barrel
    for (let k = 0; k < 10; k++) {
      const rz = -16.0 + k * 3.55;
      const groove = new THREE.Mesh(
        new THREE.TorusGeometry(28.4, 0.34, 6, 36, cutEnd - cutStart),
        mats.matteBlackAnodized
      );
      groove.position.z = rz;
      groove.rotation.z = cutStart;
      groove.userData.noEdges = true;
      g.add(groove);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-inner-thread-baffles',
        88,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 70.0),
        new THREE.Vector3(-118, 42, 22),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // L89. Individual Lens Distortion, Lateral-CA & Breathing-Comp Calibration Flash ROM (z = +45.5 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const romSub = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(8.4, 6.2, 0.8), 0.55, 0.04, 0.04, 8),
      mats.hdiMainboardPcb
    );
    romSub.position.set(27.0, -14.5, 0);
    const wsonIc = new THREE.Mesh(new THREE.BoxGeometry(4.6, 3.8, 0.72), mats.icEpoxy);
    wsonIc.position.set(27.0, -14.5, 0.65);
    const goldDot = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 8), mats.goldPlating);
    goldDot.position.set(25.4, -13.2, 1.05);
    goldDot.userData.noEdges = true;
    g.add(romSub, wsonIc, goldDot);

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-aberration-lut-eeprom',
        89,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 45.5),
        new THREE.Vector3(82, -108, -178),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L90. Quad-XD PWM Noise-Absorbing Ferrite Sheet & Conductive Ground Gasket (z = +44.4 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ferriteArc = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(34.6, 28.0, cutStart + 0.15, cutEnd - 0.15), 0.35, 0.03, 0.03, 36),
      mats.ferriteInductor
    );
    g.add(ferriteArc);

    // 4 conductive Ni/Cu fabric-over-foam EMI grounding cubes around perimeter
    for (const deg of [195, 255, 315, 15]) {
      const a = THREE.MathUtils.degToRad(deg);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 1.4), mats.conductiveNiCuFoam);
      pad.position.set(Math.cos(a) * 31.4, Math.sin(a) * 31.4, 0.85);
      pad.rotation.z = a;
      g.add(pad);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-mcu-emi-absorber',
        90,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 44.4),
        new THREE.Vector3(-104, -92, -196),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // L91. Lens-Side 12-Pin ±15 kV ESD TVS Diode Array & Inrush Soft-Start Circuit (z = +35.6 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const tvsBoard = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(27.2, 24.4, -Math.PI * 0.67, -Math.PI * 0.33), 0.65, 0.04, 0.04, 20),
      mats.hdiMainboardPcb
    );
    g.add(tvsBoard);

    for (let i = 0; i < 6; i++) {
      const a = -Math.PI * 0.64 + (i / 5) * (Math.PI * 0.28);
      const tvsIc = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 0.55), mats.icEpoxy);
      tvsIc.position.set(Math.cos(a) * 25.8, Math.sin(a) * 25.8, 0.58);
      tvsIc.rotation.z = a;
      g.add(tvsIc);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-contact-esd-tvs',
        91,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, 35.6),
        new THREE.Vector3(56, -74, -278),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L92. 0.01 μm XA Aspheric Curvature Inflection Profile & Bokeh Control Zone (z = +108.5 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Concentric subtle iridescent contour rings visualizing the 0.01 μm XA polynomial surface profile!
    for (const [r, zOff] of [
      [11.5, 2.2],
      [18.5, 1.1],
      [24.5, -0.4],
    ] as Array<[number, number]>) {
      const zone = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.24, 8, 44),
        mats.nanoArIridescent
      );
      zone.position.z = zOff;
      zone.userData.noEdges = true;
      g.add(zone);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-xa-aspheric-profile',
        92,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 108.5),
        new THREE.Vector3(82, 0, 212),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // L93. Internal-Focus Air-Volume Equalization Hydrophobic ePTFE Breather Vent (z = +50.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(6.2, 4.4, 1.0), 1.4, 0.08, 0.08, 10),
      mats.matteBlackAnodized
    );
    housing.position.set(-37.8, -11.5, 0);
    housing.rotation.y = Math.PI / 2;

    const eptfeDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65, 1.65, 0.25, 16).rotateZ(Math.PI / 2),
      mats.zifIvoryPlastic
    );
    eptfeDisc.position.set(-38.6, -11.5, 0);

    const meshCap = new THREE.Mesh(
      new THREE.CylinderGeometry(1.85, 1.85, 0.18, 16).rotateZ(Math.PI / 2),
      mats.conductiveNiCuFoam
    );
    meshCap.position.set(-38.8, -11.5, 0);

    g.add(housing, eptfeDisc, meshCap);

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-barrel-breather-vent',
        93,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 0, 50.0),
        new THREE.Vector3(-124, -46, -148),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L94. Aperture Ring A-Position Auto-Lock Detent Notch & Steel Stop Pin (z = +56.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const notchArc = new THREE.Mesh(
      extrudeCentered(createCutawayArcRingShape(38.6, 36.4, THREE.MathUtils.degToRad(210), THREE.MathUtils.degToRad(252)), 2.2, 0.06, 0.06, 16),
      mats.stainlessMachined
    );
    const lockPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 4.8, 14).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    const aPin = THREE.MathUtils.degToRad(232);
    lockPin.position.set(Math.cos(aPin) * 37.5, Math.sin(aPin) * 37.5, 0);
    const pinSpring = new THREE.Mesh(
      createHelicalSpringGeometry(1.15, 3.4, 4, 0.2),
      mats.brassGear
    );
    pinSpring.position.set(Math.cos(aPin) * 37.5, Math.sin(aPin) * 37.5, -2.6);
    pinSpring.userData.noEdges = true;
    g.add(notchArc, lockPin, pinSpring);

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-aperture-f12-lock-pin',
        94,
        '#ef4444',
        g,
        new THREE.Vector3(0, 0, 56.0),
        new THREE.Vector3(-118, 22, -124),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // L95. XD Linear Motor Laminated Silicon-Steel Eddy-Current Back-Yoke (4x, z = +65.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const deg of motorAnglesDeg) {
      const a = THREE.MathUtils.degToRad(deg);
      const u = new THREE.Group();
      u.position.set(Math.cos(a) * motorR, Math.sin(a) * motorR, 0);
      u.rotation.z = a;
      // 4 stacked insulated silicon-steel laminations right behind L24 yoke
      for (let l = 0; l < 4; l++) {
        const lam = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, 8.6, 31.8),
          l % 2 === 0 ? mats.softIronYoke : mats.lensPermalloyShield
        );
        lam.position.set(3.85 + l * 0.34, 0, 0);
        u.add(lam);
      }
      g.add(u);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-xd-lorentz-backiron',
        95,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 65.0),
        new THREE.Vector3(-136, 48, -54),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // L96. Rear-Element Protective Optical Clearance Collar & Stray-Edge Shield Rim (z = +37.5 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const collar = new THREE.Mesh(
      extrudeCentered(createRingShape(24.8, 21.8), 3.6, 0.14, 0.14, 40),
      mats.matteBlackAnodized
    );
    const knifeRim = new THREE.Mesh(
      extrudeCentered(createRingShape(22.2, 20.6), 0.75, 0.08, 0.18, 40),
      mats.velvetFlockTrap
    );
    knifeRim.position.z = -1.85;
    g.add(collar, knifeRim);

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-rear-filter-holder-tabs',
        96,
        '#4f46e5',
        g,
        new THREE.Vector3(0, 0, 37.5),
        new THREE.Vector3(-56, -42, -238),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // L97. ALC-SH163 Lens Hood Interior Electrostatic Velvet Lining & Reverse Grooves (z = +127.0 mm)
  // =========================================================================
  {
    const g = new THREE.Group();
    const liningGeo = new THREE.CylinderGeometry(42.5, 41.6, 17.8, 42, 1, true);
    liningGeo.rotateX(Math.PI / 2);
    const lining = new THREE.Mesh(liningGeo, mats.velvetFlockTrap);
    lining.position.z = 0.6;
    g.add(lining);

    // Reverse-stow bayonet lock guide slots at rear hood rim
    for (const deg of [0, 180]) {
      const a0 = THREE.MathUtils.degToRad(deg - 16);
      const a1 = THREE.MathUtils.degToRad(deg + 16);
      const revSlot = new THREE.Mesh(
        extrudeCentered(createCutawayArcRingShape(43.2, 40.2, a0, a1), 1.6, 0.06, 0.06, 10),
        mats.matteBlackAnodized
      );
      revSlot.position.z = -8.6;
      g.add(revSlot);
    }

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-hood-velvet-lining',
        97,
        '#0f172a',
        g,
        new THREE.Vector3(0, 0, 127.0),
        new THREE.Vector3(74, 42, 336),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // L98. Center-Pinch Front Lens Cap (ALC-F72S) & Twist-Lock Rear Cap (ALC-R1EM)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Front cap parked cleanly forward of lens hood ONLY when exploded? No, place sleek thin rear cap + front pinch clip
    // Actually keep front cap parked gently at z=+139mm (in front of hood) & rear cap at z=+27mm?
    // Wait: if front cap sits at z=+139mm when assembled, it would cover the gorgeous front XA glass!!
    // Instead, represent the center-pinch latch frame & rear bayonet dust rim as sleek cutaway/open protective ring assemblies when assembled,
    // OR make the front cap a cutaway translucent/ring-frame pinch mechanism around the outer filter lip + sleek rear bayonet cap ring at z=+29.6mm so front glass ALWAYS gleams unobstructed!
    const frontCapRim = new THREE.Mesh(
      extrudeCentered(createRingShape(39.4, 36.2), 2.2, 0.14, 0.14, 42),
      mats.matteBlackAnodized
    );
    frontCapRim.position.z = 0; // assembled z = 118.6 (neatly framing outer 72mm filter rim without blocking front glass!)
    for (const sx of [-1, 1]) {
      const pinchTab = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.2, 8.6, 1.0), 2.2, 0.1, 0.1, 10),
        mats.lensRubberGrip
      );
      pinchTab.position.set(sx * 37.8, 0, 0.6);
      const spring = new THREE.Mesh(
        createHelicalSpringGeometry(0.55, 3.2, 4, 0.16),
        mats.mountSpringSteel
      );
      spring.position.set(sx * 37.6, 0, -1.2);
      spring.userData.noEdges = true;
      g.add(pinchTab, spring);
    }

    // Companion ALC-R1EM bayonet rear dust-cap ring neatly nested inside front-section envelope when stowed
    const rearCapRim = new THREE.Mesh(
      extrudeCentered(createRingShape(32.8, 26.8), 2.8, 0.14, 0.14, 40),
      mats.matteBlackAnodized
    );
    rearCapRim.position.z = -24.0; // assembled z = 94.6 (cleanly inside Section 3 envelope)
    g.add(frontCapRim, rearCapRim);

    parts.push(
      finalizeStandaloneLensMicroPart(
        'lens-front-rear-caps',
        98,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 118.6),
        new THREE.Vector3(0, -34, 286),
        cp,
        0.26
      )
    );
  }

  return parts;
}
