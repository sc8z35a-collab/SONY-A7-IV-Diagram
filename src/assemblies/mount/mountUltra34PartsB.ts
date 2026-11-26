import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  createFrameShape,
  createPrecisionScrew,
  createRoundedRectShape,
} from '../../engine/CadHelpers';
import {
  buildChipPackage,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { finalizeMountUltra34Part } from './mountUltra34PartsA';

function createRingShape(outerR: number, innerR: number): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

function createArcSectorShape(
  rInner: number,
  rOuter: number,
  aStart: number,
  aEnd: number
): THREE.Shape {
  const s = new THREE.Shape();
  s.absarc(0, 0, rOuter, aStart, aEnd, false);
  s.absarc(0, 0, rInner, aEnd, aStart, true);
  s.closePath();
  return s;
}

function addCircleHoles(shape: THREE.Shape, coords: Array<[number, number]>, r: number): void {
  for (const [hx, hy] of coords) {
    const hole = new THREE.Path();
    hole.absarc(hx, hy, r, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
}

/**
 * Phase 34B — 20 Ultra-HD Standalone-Only Mount Parts (M81–M100 -> 100 Total Mount Parts!):
 *  - Group C cont. (M81): High-Current Decoupling MLCC & Schottky Flyback Bank
 *  - Group D (M82–M90): Mechanical Precision, Tribology, Weather-Sealing & Metrology Sub-Parts
 *  - Group E (M91–M100): Cinema Pro-Modular (Lever-Lock, e-ND, PL, /i-LDS2) & 2026 Frontier Mount Parts
 */
export function buildMountUltra34PartsB(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const BOLT_ANGLES_DEG = [0, 60, 120, 180, 240, 300];
  const BOLT_PITCH_R = 31.3;
  const boltCoords: Array<[number, number]> = BOLT_ANGLES_DEG.map((deg) => {
    const a = THREE.MathUtils.degToRad(deg);
    return [Math.cos(a) * BOLT_PITCH_R, Math.sin(a) * BOLT_PITCH_R];
  });

  const LOCK_PIN_ANGLE_RAD = THREE.MathUtils.degToRad(-24);
  const LOCK_PIN_R = 30.8;
  const lockPinX = Math.cos(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;
  const lockPinY = Math.sin(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;

  // =========================================================================
  // M81: 100 μF Low-ESR MLCC Decoupling Bank & Reverse-Polarity / Flyback Schottky Clamp
  // =========================================================================
  {
    const g = new THREE.Group();
    const bank = new THREE.Group();
    bank.position.set(0, -28.8, 0);

    // Curved thick 2-oz Cu low-inductance bypass substrate strip
    const strip = new THREE.Mesh(
      createChamferedBoxGeo(22.0, 4.4, 0.85, 0.7, 0.06, 'z'),
      mats.hdiMainboardPcb
    );
    bank.add(strip);

    // Solid copper busbar rail on rear side for micro-ohm ESR
    const cuRail = new THREE.Mesh(
      createChamferedBoxGeo(19.6, 2.0, 0.42, 0.3, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    cuRail.position.set(0, 0, -0.62);
    bank.add(cuRail);

    // 6x 0805 X6S high-capacitance low-ESR MLCCs absorbing 4x XD linear motor switching ripple
    for (let i = 0; i < 6; i++) {
      const cx = -7.8 + i * 2.5;
      const cap = buildSmdPassive(2.0, 1.25, 1.1, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(cx, 0.85, 0.95);
      bank.add(cap);
    }

    // Twin Schottky flyback / reverse-polarity clamp diodes (DFN-2 power package)
    for (const sx of [-5.2, 5.2]) {
      const diode = buildChipPackage({
        w: 3.2,
        d: 2.0,
        h: 0.9,
        style: 'dfn',
        pinsPerSide: 2,
        bodyMat: mats.icEpoxy,
        leadMat: mats.goldPlating,
        axis: 'z',
      });
      diode.position.set(sx, -1.1, 0.9);
      bank.add(diode);
    }

    // Central bulk yellow tantalum polymer reservoir cap
    const tant = buildSmdPassive(3.4, 2.0, 1.3, mats.tantalumCapYellow, mats.solderBallSilver, 'z');
    tant.position.set(0, -1.05, 1.05);
    bank.add(tant);

    g.add(bank);

    parts.push(
      finalizeMountUltra34Part(
        'mount-mlcc-flyback-bank',
        81,
        '#ca8a04',
        g,
        new THREE.Vector3(0, 0, 22.6),
        new THREE.Vector3(0, -98, -14),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M82: Radial Centering Pilot Spigot Bore (H7/g6 ±4 μm) & Corner Relief Undercut
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main precision cylindrical centering bore liner (φ55.000 mm H7/g6 tolerance band)
    const boreWall = new THREE.Mesh(
      extrudeHiRes(createRingShape(28.05, 27.45), 3.1, 0.05, 0.05, 2, 64),
      mats.stainlessMachined
    );
    g.add(boreWall);

    // Front 30° chamfered entry lead ring guiding lens spigot smoothly without galling
    const entryLead = new THREE.Mesh(
      hiResCyl(27.82, 27.46, 0.65, 64, true).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    entryLead.position.z = 1.82;
    g.add(entryLead);

    // Corner stress-relief undercut groove (prevents fillet interference against lens datum shoulder)
    const reliefGroove = new THREE.Mesh(
      hiResTorus(27.95, 0.22, 10, 56),
      mats.matteBlackAnodized
    );
    reliefGroove.position.z = 1.48;
    reliefGroove.userData.noEdges = true;
    g.add(reliefGroove);

    // 3 precision-lapped 3-point radial concentricity register lands (120° apart)
    for (const deg of [60, 180, 300]) {
      const a0 = THREE.MathUtils.degToRad(deg - 12);
      const a1 = THREE.MathUtils.degToRad(deg + 12);
      const land = new THREE.Mesh(
        extrudeHiRes(createArcSectorShape(27.36, 27.58, a0, a1), 2.2, 0.03, 0.03, 1, 20),
        mats.titaniumRivet
      );
      g.add(land);
    }

    parts.push(
      finalizeMountUltra34Part(
        'mount-pilot-spigot-bore',
        82,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 30.1),
        new THREE.Vector3(118, 46, 84),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M83: Asymmetric Anti-Misalignment Bayonet Lug Keying & Helical Wedge Clamping Ramps
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 intentionally unequal angular arc widths (52° / 46° / 42°) implementing Poka-Yoke single-index entry!
    const lugSpecs: Array<[number, number, THREE.Material]> = [
      [18, 52, mats.mountStainlessFlange],
      [138, 46, mats.stainlessMachined],
      [258, 42, mats.titaniumRivet],
    ];

    for (const [centerDeg, arcDeg, mat] of lugSpecs) {
      const a0 = THREE.MathUtils.degToRad(centerDeg - arcDeg * 0.5);
      const a1 = THREE.MathUtils.degToRad(centerDeg + arcDeg * 0.5);

      const lugBody = new THREE.Mesh(
        extrudeHiRes(createArcSectorShape(25.35, 27.52, a0, a1), 1.35, 0.07, 0.07, 2, 24),
        mat
      );
      g.add(lugBody);

      // Rear 2.2° self-tightening helical wedge ramp step (creates progressive axial clamp as lens turns 60°)
      const rampSteps = 4;
      for (let s = 0; s < rampSteps; s++) {
        const ra0 = THREE.MathUtils.lerp(a0, a1, s / rampSteps);
        const ra1 = THREE.MathUtils.lerp(a0, a1, (s + 1) / rampSteps);
        const stepH = 0.22 + s * 0.14;
        const ramp = new THREE.Mesh(
          extrudeHiRes(createArcSectorShape(25.5, 27.35, ra0, ra1), stepH, 0.02, 0.02, 1, 10),
          mats.beCuSpring
        );
        ramp.position.z = -0.78 - s * 0.07;
        g.add(ramp);
      }

      // Visual gold keying-width calibration marker dot at lug centerline
      const midA = THREE.MathUtils.degToRad(centerDeg);
      const marker = new THREE.Mesh(
        hiResCyl(0.45, 0.45, 0.24, 14).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      marker.position.set(Math.cos(midA) * 26.4, Math.sin(midA) * 26.4, 0.74);
      marker.userData.noEdges = true;
      g.add(marker);
    }

    // Thin reference connecting datum wire-ring showing relative 120° angular spacing
    const refWire = new THREE.Mesh(
      hiResTorus(27.6, 0.22, 8, 56),
      mats.mountSpringSteel
    );
    refWire.position.z = 0.45;
    refWire.userData.noEdges = true;
    g.add(refWire);

    parts.push(
      finalizeMountUltra34Part(
        'mount-asymmetric-lug-keying',
        83,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 30.3),
        new THREE.Vector3(118, -28, 116),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M84: Lock-Pin Self-Retracting 35° Conical Lead-Ramp Tip & Anti-Rotation D-Flat Keyway
  // =========================================================================
  {
    const g = new THREE.Group();
    const lp = new THREE.Group();
    lp.position.set(lockPinX, lockPinY, 0);
    lp.rotation.z = LOCK_PIN_ANGLE_RAD;

    // Hardened SUS440C D-flat shank with machined flat side preventing rotational creep
    const dShape = new THREE.Shape();
    dShape.absarc(0, 0, 1.52, -Math.PI * 0.72, Math.PI * 0.72, false);
    dShape.closePath();
    const dShank = new THREE.Mesh(
      extrudeHiRes(dShape, 4.4, 0.06, 0.06, 2, 22),
      mats.stainlessMachined
    );
    lp.add(dShank);

    // Asymmetric 35° conical self-retracting lead-ramp crown (lens bayonet depresses pin without touching release button!)
    const bevelTip = new THREE.Mesh(
      hiResCyl(0.65, 1.52, 1.45, 24).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    bevelTip.position.set(0, 0.14, 2.85);
    bevelTip.rotation.x = 0.28;
    lp.add(bevelTip);

    // Sintered bronze anti-rotation D-keyway guide plate engaging flat face of shank
    const keyPlateShape = createRoundedRectShape(6.2, 6.2, 1.4);
    const dHole = new THREE.Path();
    dHole.absarc(0, 0, 1.62, -Math.PI * 0.72, Math.PI * 0.72, false);
    dHole.closePath();
    keyPlateShape.holes.push(dHole);
    const keyPlate = new THREE.Mesh(
      extrudeHiRes(keyPlateShape, 0.95, 0.06, 0.06, 2, 22),
      mats.sinteredBronzeBushing
    );
    keyPlate.position.z = 0.6;
    lp.add(keyPlate);

    // Hardened stop collar ring at base
    const collar = new THREE.Mesh(
      extrudeHiRes(createRingShape(2.4, 1.55), 0.7, 0.05, 0.05, 2, 20),
      mats.mountSpringSteel
    );
    collar.position.z = -1.9;
    lp.add(collar);

    g.add(lp);

    parts.push(
      finalizeMountUltra34Part(
        'mount-lockpin-ramp-dflat',
        84,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 29.0),
        new THREE.Vector3(56, -42, 128),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M85: Sacrificial Controlled-Breakaway Shear-Neck Fasteners & Impact-Damping Shear Collar
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [bx, by] of boltCoords) {
      const b = new THREE.Group();
      b.position.set(bx, by, 0);

      // Upper flanged collar under bolt head
      const upperFlange = new THREE.Mesh(
        hiResCyl(2.2, 2.2, 0.85, 20).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      upperFlange.position.z = 1.45;
      b.add(upperFlange);

      // Engineered reduced-diameter sacrificial shear-neck waist (V-notch stress concentrator!)
      const shearNeck = new THREE.Mesh(
        hiResCyl(0.95, 0.95, 1.4, 18).rotateX(Math.PI / 2),
        mats.cinnabarAnodized
      );
      shearNeck.position.z = 0.35;
      b.add(shearNeck);

      // Lower threaded engagement sleeve
      const lowerSleeve = new THREE.Mesh(
        hiResCyl(1.42, 1.42, 2.4, 20).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      lowerSleeve.position.z = -1.55;
      b.add(lowerSleeve);

      g.add(b);
    }

    // Perimeter elastomeric radial impact-damping shear buffer ring surrounding flange skirt
    const damperRing = new THREE.Mesh(
      extrudeHiRes(createRingShape(35.3, 34.35), 1.45, 0.08, 0.08, 2, 56),
      mats.butylDamperRubber
    );
    damperRing.position.z = 0.2;
    g.add(damperRing);

    parts.push(
      finalizeMountUltra34Part(
        'mount-breakaway-shear-bolts',
        85,
        '#ef4444',
        g,
        new THREE.Vector3(0, 0, 31.6),
        new THREE.Vector3(54, 78, 128),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M86: Hydrophobic Microporous ePTFE Mount-Chamber Pressure-Equalization Breather Vent
  // =========================================================================
  {
    const g = new THREE.Group();
    const v = new THREE.Group();
    v.position.set(-38.6, -11.5, 0);

    // Anodized vent boss frame mounted flush on -X bulkhead wall
    const boss = new THREE.Mesh(
      hiResCyl(4.4, 4.6, 2.2, 28).rotateZ(Math.PI / 2),
      mats.matteBlackAnodized
    );
    v.add(boss);

    // White hydrophobic microporous ePTFE membrane disc (0.2 μm pores: air passes, liquid water blocked!)
    const eptfeDisc = new THREE.Mesh(
      hiResCyl(3.3, 3.3, 0.35, 28).rotateZ(Math.PI / 2),
      mats.zifIvoryPlastic
    );
    eptfeDisc.position.x = -0.35;
    v.add(eptfeDisc);

    // Outer stainless perforated splash-guard screen bezel
    const splashRing = new THREE.Mesh(
      extrudeHiRes(createRingShape(3.9, 2.95), 0.48, 0.05, 0.05, 2, 24).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    splashRing.position.x = -1.15;
    v.add(splashRing);

    // Protective louver bars across splash guard
    for (const ly of [-1.4, 0, 1.4]) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.42, 5.6),
        mats.stainlessMachined
      );
      bar.position.set(-1.22, ly, 0);
      v.add(bar);
    }

    // Perimeter waterproof adhesive O-ring gasket + internal labyrinth equalizer tube
    const seal = new THREE.Mesh(
      hiResTorus(4.0, 0.32, 10, 28).rotateY(Math.PI / 2),
      mats.epdmGasket
    );
    seal.position.x = 0.85;
    seal.userData.noEdges = true;
    v.add(seal);

    const duct = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 3.6, 6.4, 0.5, 0.06, 'z'),
      mats.mountPpsInsulator
    );
    duct.position.set(1.8, 0, -2.2);
    v.add(duct);

    g.add(v);

    parts.push(
      finalizeMountUltra34Part(
        'mount-eptfe-breather-vent',
        86,
        '#f8fafc',
        g,
        new THREE.Vector3(0, 0, 23.6),
        new THREE.Vector3(-42, -22, 16),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M87: Dedicated Power-Off Mechanical Protective Sensor Dust Shield Curtain & Latch Solenoid
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-slim matte-black anodized aluminum guide frame directly behind rear mount throat
    const frame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(44.4, 32.0, 2.8, 37.6, 25.2, 1.2), 1.4, 0.08, 0.08, 2, 24),
      mats.matteBlackAnodized
    );
    g.add(frame);

    // 3 overlapping thickened carbon-composite / titanium protective dust-shield blades (partially closed showcase)
    for (let i = 0; i < 3; i++) {
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(38.2, 7.6, 0.24, 0.2, 0.02, 'z'),
        i % 2 === 0 ? mats.shutterShieldBlade : mats.carbonFiberBlade
      );
      blade.position.set(0, 7.8 - i * 7.8, (i - 1) * 0.26);
      g.add(blade);

      // Stainless micro pivot rivet connecting blade to right-side actuation arm
      const rivet = new THREE.Mesh(
        hiResCyl(0.55, 0.55, 0.5, 12).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      rivet.position.set(19.6, 7.8 - i * 7.8, 0.35);
      rivet.userData.noEdges = true;
      g.add(rivet);
    }

    // Right-flank micro bistable latching solenoid actuator (draws zero power when closed!)
    const solBody = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 14.2, 2.4, 0.8, 0.1, 'z'),
      mats.softIronYoke
    );
    solBody.position.set(25.4, 1.5, 0);
    g.add(solBody);

    const coil = new THREE.Mesh(
      hiResCyl(2.2, 2.2, 7.6, 20),
      mats.copperCoil
    );
    coil.position.set(25.4, 1.5, 0);
    g.add(coil);

    // Parallel actuation linkage arm + optical closed-state photo-interrupter
    const arm = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 19.4, 0.45, 0.4, 0.04, 'z'),
      mats.linkArmSteel
    );
    arm.position.set(20.6, 0.2, 0.65);
    g.add(arm);

    const opto = buildChipPackage({
      w: 2.8,
      d: 2.2,
      h: 1.0,
      style: 'dfn',
      pinsPerSide: 2,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    opto.position.set(24.8, -10.4, 0.75);
    g.add(opto);

    parts.push(
      finalizeMountUltra34Part(
        'mount-protective-dust-curtain',
        87,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 19.3),
        new THREE.Vector3(78, 0, -64),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M88: Cryo-Stabilized (−196°C) Martensitic Rim & Laser 2D DataMatrix Metrology Tag
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper-rear sub-zero stabilized martensitic steel metrology rim arc (56°..124°)
    const rimArc = new THREE.Mesh(
      extrudeHiRes(
        createArcSectorShape(32.4, 35.0, THREE.MathUtils.degToRad(56), THREE.MathUtils.degToRad(124)),
        1.05,
        0.07,
        0.07,
        2,
        36
      ),
      mats.invarScaleBar
    );
    g.add(rimArc);

    // Precision recessed laser-etched 2D DataMatrix traceability plaque at 12-o'clock (0, 33.7)
    const plaque = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 4.4, 0.45, 0.4, 0.04, 'z'),
      mats.matteBlackAnodized
    );
    plaque.position.set(0, 33.7, 0.65);
    g.add(plaque);

    // Authentic 6x6 micro-relief DataMatrix calibration cells (L-finder pattern + binary payload; ZERO 3D text!)
    const matrixBits = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0],
      [1, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 0, 1, 0, 1, 0],
    ];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        if (!matrixBits[r][c]) continue;
        const cell = new THREE.Mesh(
          new THREE.BoxGeometry(0.46, 0.46, 0.14),
          mats.sinteredSilver
        );
        cell.position.set(-1.35 + c * 0.54, 32.35 + r * 0.54, 0.92);
        cell.userData.noEdges = true;
        g.add(cell);
      }
    }

    // Twin laser-interferometer fiducial target micro-rings flanking DataMatrix plaque
    for (const fx of [-8.8, 8.8]) {
      const fid = new THREE.Mesh(
        hiResTorus(0.85, 0.14, 8, 20),
        mats.goldPlating
      );
      fid.position.set(fx, 32.8, 0.62);
      fid.userData.noEdges = true;
      g.add(fid);
    }

    parts.push(
      finalizeMountUltra34Part(
        'mount-cryo-datamatrix-metrology',
        88,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 29.8),
        new THREE.Vector3(-48, 84, 96),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M89: Contact-Block Side Stray-Light Labyrinth Curtains & Rear-Element Clearance Guard Lip
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin stepped velvet-flocked stray-light wing walls flanking 12-pin contact arc
    const wingArcs: Array<[number, number]> = [
      [-145, -128],
      [-52, -35],
    ];
    for (const [d0, d1] of wingArcs) {
      const a0 = THREE.MathUtils.degToRad(d0);
      const a1 = THREE.MathUtils.degToRad(d1);
      const wing = new THREE.Mesh(
        extrudeHiRes(createArcSectorShape(23.7, 27.3, a0, a1), 3.4, 0.06, 0.06, 2, 18),
        mats.velvetFlockTrap
      );
      g.add(wing);

      // Knife-edge internal labyrinth rib blocking oblique light from bypassing pogo-pin gaps
      const knife = new THREE.Mesh(
        extrudeHiRes(createArcSectorShape(23.1, 24.4, a0 + 0.04, a1 - 0.04), 0.55, 0.03, 0.03, 1, 16),
        mats.mountVelvetBaffle
      );
      knife.position.z = 1.45;
      g.add(knife);
    }

    // Lower hardened polycarbonate rear-element protrusion stop guard lip (protects shutter from deep rear glass!)
    const guardLip = new THREE.Mesh(
      extrudeHiRes(
        createArcSectorShape(22.9, 24.2, THREE.MathUtils.degToRad(-126), THREE.MathUtils.degToRad(-54)),
        1.15,
        0.06,
        0.06,
        2,
        32
      ),
      mats.mountPpsInsulator
    );
    guardLip.position.z = -1.65;
    g.add(guardLip);

    parts.push(
      finalizeMountUltra34Part(
        'mount-contact-stray-labyrinth',
        89,
        '#18181b',
        g,
        new THREE.Vector3(0, 0, 26.0),
        new THREE.Vector3(-84, -68, 22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M90: Three-Zone 1/3-Arc Cinema Tilt Calibration Shim Set (120° Segmented Foils, VENICE/CineAlta)
  // =========================================================================
  {
    const g = new THREE.Group();
    const arcSpecs: Array<[number, number, THREE.Material, number]> = [
      [3, 117, mats.mountStainlessFlange, 0.24],   // Zone A (10 μm silver stainless)
      [123, 237, mats.brassGear, 0.34],            // Zone B (25 μm gold-brass)
      [243, 357, mats.mountShimBlue, 0.44],        // Zone C (50 μm blue-tempered steel)
    ];

    for (const [d0, d1, mat, thick] of arcSpecs) {
      const a0 = THREE.MathUtils.degToRad(d0);
      const a1 = THREE.MathUtils.degToRad(d1);
      const s = createArcSectorShape(28.25, 34.0, a0, a1);

      // Punch the 2 bolt clearance holes inside each 120° arc segment
      for (const deg of BOLT_ANGLES_DEG) {
        if (deg > d0 + 4 && deg < d1 - 4) {
          const ba = THREE.MathUtils.degToRad(deg);
          const hole = new THREE.Path();
          hole.absarc(Math.cos(ba) * BOLT_PITCH_R, Math.sin(ba) * BOLT_PITCH_R, 1.7, 0, Math.PI * 2, true);
          s.holes.push(hole);
        }
      }

      const shim = new THREE.Mesh(extrudeHiRes(s, thick, 0.02, 0.02, 1, 32), mat);
      g.add(shim);

      // Outward radial color-coded inspection pull tab at midpoint of each 1/3 arc
      const midA = THREE.MathUtils.degToRad((d0 + d1) * 0.5);
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(4.2, 2.2, thick + 0.06, 0.4, 0.02, 'z'),
        mat
      );
      tab.position.set(Math.cos(midA) * 35.4, Math.sin(midA) * 35.4, 0);
      tab.rotation.z = midA;
      g.add(tab);
    }

    parts.push(
      finalizeMountUltra34Part(
        'mount-cinema-arc-tilt-shims',
        90,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, 27.4),
        new THREE.Vector3(118, 42, 18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M91: Sony Cinema Line Lever-Lock (Breech-Lock) Rotating Clamp Ring & Safety Latch (FX9 / BURANO)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rugged black-anodized outer breech-lock rotating collar (lens drops straight in with ZERO twist!)
    const collar = new THREE.Mesh(
      extrudeHiRes(createRingShape(39.4, 34.85), 5.4, 0.22, 0.22, 2, 64),
      mats.lensBarrelAnodized
    );
    g.add(collar);

    // Front brushed stainless wear-face trim ring
    const frontRim = new THREE.Mesh(
      extrudeHiRes(createRingShape(38.6, 35.0), 0.75, 0.08, 0.08, 2, 64),
      mats.mountStainlessFlange
    );
    frontRim.position.z = 2.85;
    g.add(frontRim);

    // 24 perimeter machined grip knurl ribs around outer collar wall
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(0.75, 1.35, 4.4, 0.15, 0.05, 'z'),
        mats.matteBlackAnodized
      );
      rib.position.set(Math.cos(a) * 39.5, Math.sin(a) * 39.5, 0);
      rib.rotation.z = a;
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Twin ergonomic sculpted cinema locking levers (+35° & -145°) for high-torque FIZ lockup
    for (const deg of [35, -145]) {
      const a = THREE.MathUtils.degToRad(deg);
      const lv = new THREE.Group();
      lv.position.set(Math.cos(a) * 39.4, Math.sin(a) * 39.4, 0.2);
      lv.rotation.z = a;

      const arm = new THREE.Mesh(
        createChamferedBoxGeo(10.5, 4.4, 3.8, 1.0, 0.18, 'z'),
        mats.lensBarrelAnodized
      );
      arm.position.x = 4.6;
      lv.add(arm);

      const gripEnd = new THREE.Mesh(
        hiResCyl(2.45, 2.25, 5.2, 22).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      gripEnd.position.set(9.4, 0, 0.4);
      lv.add(gripEnd);

      g.add(lv);
    }

    // Dual-action anodized cinnabar-red upward-sliding safety release catch at 12-o'clock
    const safetyCatch = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 3.6, 2.8, 0.6, 0.12, 'z'),
      mats.gMasterRedBadge
    );
    safetyCatch.position.set(0, 39.8, 1.4);
    g.add(safetyCatch);

    parts.push(
      finalizeMountUltra34Part(
        'mount-cine-lever-lock-collar',
        91,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0, 32.3),
        new THREE.Vector3(0, 0, 178),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M92: Breech-Lock Precision Stainless Ball-Roller Cam Followers & Wave-Spring Brake Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Hardened stainless internal cam carrier ring
    const carrier = new THREE.Mesh(
      extrudeHiRes(createRingShape(36.2, 33.4), 1.4, 0.08, 0.08, 2, 56),
      mats.mountStainlessFlange
    );
    g.add(carrier);

    // 3x hardened ball/needle cam follower rollers (0°, 120°, 240°) converting collar torque to >120 N axial clamp
    for (const deg of [0, 120, 240]) {
      const a = THREE.MathUtils.degToRad(deg);
      const cr = new THREE.Group();
      cr.position.set(Math.cos(a) * 34.8, Math.sin(a) * 34.8, 0.9);
      cr.rotation.z = a;

      const roller = new THREE.Mesh(
        hiResCyl(1.75, 1.75, 2.6, 24).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      cr.add(roller);

      const pin = new THREE.Mesh(
        hiResCyl(0.72, 0.72, 3.6, 16).rotateZ(Math.PI / 2),
        mats.sinteredBronzeBushing
      );
      cr.add(pin);

      const ball = new THREE.Mesh(
        hiResSphere(1.15, 16, 12),
        mats.siliconNitrideBall
      );
      ball.position.set(-1.6, 0, 0.7);
      ball.userData.noEdges = true;
      cr.add(ball);

      g.add(cr);
    }

    // Sinusoidal variable-friction wave-spring brake washer (smooth torque damping, zero creep!)
    const wavePts: THREE.Vector3[] = [];
    const segs = 72;
    for (let i = 0; i <= segs; i++) {
      const t = (i / segs) * Math.PI * 2;
      const wz = -1.25 + Math.sin(t * 6) * 0.42;
      wavePts.push(new THREE.Vector3(Math.cos(t) * 34.8, Math.sin(t) * 34.8, wz));
    }
    const waveGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wavePts, true), 72, 0.42, 8, true);
    const waveSpring = new THREE.Mesh(waveGeo, mats.beCuSpring);
    waveSpring.userData.noEdges = true;
    g.add(waveSpring);

    parts.push(
      finalizeMountUltra34Part(
        'mount-breech-cam-rollers',
        92,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 31.1),
        new THREE.Vector3(118, -30, 62),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M93: In-Mount Electronic Variable Liquid-Crystal ND Filter (e-ND 1/4–1/128) & Stepper Rail
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-slim titanium sliding carrier frame inside short-flange chamber
    const frame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(43.2, 31.2, 2.4, 38.4, 26.4, 1.2), 1.35, 0.08, 0.08, 2, 24),
      mats.titaniumRivet
    );
    g.add(frame);

    // Multi-layer guest-host / twisted-nematic liquid-crystal optical cell (2–7 stops stepless!)
    const lcCell = new THREE.Mesh(
      createChamferedBoxGeo(38.6, 26.6, 0.72, 0.8, 0.04, 'z'),
      mats.evfDichroicMirror
    );
    g.add(lcCell);

    // Upper & lower gold ITO transparent-electrode drive busbars along LC cell rim
    for (const sy of [-13.5, 13.5]) {
      const bus = new THREE.Mesh(
        createChamferedBoxGeo(36.0, 1.1, 0.25, 0.2, 0.02, 'z'),
        mats.goldPlating
      );
      bus.position.set(0, sy, 0.52);
      g.add(bus);
    }

    // Left-side motorized clear/ND retract lead-screw micro-stepper actuator & guide shaft
    const motor = new THREE.Mesh(
      hiResCyl(2.4, 2.4, 11.5, 22),
      mats.stainlessMachined
    );
    motor.position.set(-24.8, 3.5, 0);
    g.add(motor);

    const leadScrew = new THREE.Mesh(
      hiResCyl(0.75, 0.75, 16.0, 16),
      mats.brassGear
    );
    leadScrew.position.set(-24.8, -8.5, 0);
    g.add(leadScrew);

    const nutBlock = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 3.6, 2.2, 0.5, 0.06, 'z'),
      mats.pomGear
    );
    nutBlock.position.set(-23.2, -6.0, 0);
    g.add(nutBlock);

    // Polyimide LC voltage-modulation drive ribbon
    const fpc = new THREE.Mesh(
      createChamferedBoxGeo(5.4, 12.0, 0.24, 0.3, 0.02, 'z'),
      mats.polyimideFpc
    );
    fpc.position.set(-22.2, -14.5, -0.8);
    g.add(fpc);

    parts.push(
      finalizeMountUltra34Part(
        'mount-electronic-variable-nd',
        93,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 0, 21.0),
        new THREE.Vector3(-118, -28, -46),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M94: Optical Path Length (Δd = t(1 − 1/n)) Focus-Shift Compensating Clear Glass Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    // Matte-black edge-baffled anodized clear-position carrier frame
    const frame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(42.4, 30.4, 2.2, 38.2, 26.2, 1.1), 1.05, 0.07, 0.07, 2, 24),
      mats.matteBlackAnodized
    );
    g.add(frame);

    // Matched-index AR-coated Schott/OHARA clear optical blank maintaining identical OPL when e-ND is bypassed!
    const glass = new THREE.Mesh(
      createChamferedBoxGeo(38.4, 26.4, 0.86, 0.7, 0.04, 'z'),
      mats.quartzOlpf
    );
    g.add(glass);

    // Iridescent nano-AR multi-coating rim shimmer border
    const arRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(38.6, 26.6, 0.9, 36.8, 24.8, 0.6), 0.16, 0.02, 0.02, 1, 20),
      mats.nanoArIridescent
    );
    arRim.position.z = 0.46;
    g.add(arRim);

    // 4 corner stress-free silicone optical seat cushions preventing glass birefringence
    for (const [cx, cy] of [
      [-19.2, 13.2],
      [19.2, 13.2],
      [-19.2, -13.2],
      [19.2, -13.2],
    ]) {
      const pad = new THREE.Mesh(
        hiResCyl(1.1, 1.1, 1.18, 14).rotateX(Math.PI / 2),
        mats.epdmGasket
      );
      pad.position.set(cx, cy, 0);
      pad.userData.noEdges = true;
      g.add(pad);
    }

    parts.push(
      finalizeMountUltra34Part(
        'mount-opl-compensator-glass',
        94,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 20.5),
        new THREE.Vector3(-118, -28, -88.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M95: Interchangeable Cine PL-to-E Modular Adapter Base Ring & 4-Bolt Positive-Lock Key
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heavy-duty precision stainless modular PL/E base collar (VENICE / BURANO / C400)
    const baseCollar = new THREE.Mesh(
      extrudeHiRes(createRingShape(37.4, 28.2), 3.6, 0.16, 0.16, 2, 64),
      mats.mountStainlessFlange
    );
    g.add(baseCollar);

    // Stepped front 54mm PL-compatible concentric pilot register shoulder
    const plStep = new THREE.Mesh(
      extrudeHiRes(createRingShape(31.8, 28.2), 1.85, 0.1, 0.1, 2, 56),
      mats.stainlessMachined
    );
    plStep.position.z = 2.4;
    g.add(plStep);

    // 12-o'clock hardened steel Positive-Lock PL indexing keyway boss + gold index stud
    const keyBoss = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 4.6, 2.8, 0.6, 0.1, 'z'),
      mats.titaniumRivet
    );
    keyBoss.position.set(0, 32.8, 1.8);
    g.add(keyBoss);

    const keyPin = new THREE.Mesh(
      hiResCyl(1.05, 1.05, 2.2, 16).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    keyPin.position.set(0, 32.8, 3.0);
    g.add(keyPin);

    // 4x captive M3 hex socket-head modular conversion lock bolts at 45° diagonals
    for (const deg of [45, 135, 225, 315]) {
      const a = THREE.MathUtils.degToRad(deg);
      const bx = Math.cos(a) * 34.4;
      const by = Math.sin(a) * 34.4;

      const boss = new THREE.Mesh(
        hiResCyl(2.7, 2.9, 3.8, 20).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      boss.position.set(bx, by, 0.1);
      g.add(boss);

      const bolt = createPrecisionScrew(1.75, 0.85, 2.8, mats.stainlessMachined);
      bolt.position.set(bx, by, 2.15);
      g.add(bolt);
    }

    parts.push(
      finalizeMountUltra34Part(
        'mount-pl-modular-adapter-ring',
        95,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 33.1),
        new THREE.Vector3(0, 0, 211),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M96: Cinema Lens Metadata Contact Pod (Cooke /i 4-Pin & ARRI LDS-2 8-Pin VFX Interface)
  // =========================================================================
  {
    const g = new THREE.Group();
    const a0 = THREE.MathUtils.degToRad(68);
    const a1 = THREE.MathUtils.degToRad(112);

    // Precision LCP curved metadata pod housing nestled at 12-o'clock inner mount crown
    const podBody = new THREE.Mesh(
      extrudeHiRes(createArcSectorShape(26.1, 29.8, a0, a1), 2.8, 0.1, 0.1, 2, 28),
      mats.mountPpsInsulator
    );
    g.add(podBody);

    // 4 main Cooke /i gold spring-loaded metadata pins (center-left) + 4 high-speed LDS-2 differential pins (center-right)
    for (let i = 0; i < 8; i++) {
      const t = i / 7;
      const pa = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(74), THREE.MathUtils.degToRad(106), t);
      const rPin = i < 4 ? 27.6 : 28.3;
      const px = Math.cos(pa) * rPin;
      const py = Math.sin(pa) * rPin;

      const sleeve = new THREE.Mesh(
        hiResCyl(0.62, 0.62, 2.2, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      sleeve.position.set(px, py, 0.65);
      g.add(sleeve);

      const tip = new THREE.Mesh(
        hiResSphere(0.56, 14, 10),
        mats.goldPlating
      );
      tip.position.set(px, py, 1.82);
      tip.userData.noEdges = true;
      g.add(tip);
    }

    // Rear EMI Faraday shield backplate & shielded micro-coax metadata harness
    const shield = new THREE.Mesh(
      extrudeHiRes(createArcSectorShape(26.4, 29.5, a0 + 0.04, a1 - 0.04), 0.55, 0.04, 0.04, 1, 24),
      mats.emiShieldCan
    );
    shield.position.z = -1.65;
    g.add(shield);

    const cable = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 6.4, 0.55, 0.4, 0.04, 'z'),
      mats.rfGoldCoax
    );
    cable.position.set(0, 31.8, -1.65);
    g.add(cable);

    parts.push(
      finalizeMountUltra34Part(
        'mount-cine-metadata-pod',
        96,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 28.4),
        new THREE.Vector3(4, 96, 62),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M97: Next-Gen Optical / 60 GHz Millimeter-Wave Contactless Lens-Body Transceiver (>1 Gbps)
  // =========================================================================
  {
    const g = new THREE.Group();
    const a0 = THREE.MathUtils.degToRad(36);
    const a1 = THREE.MathUtils.degToRad(64);
    const midA = THREE.MathUtils.degToRad(50);

    // Hermetically sealed sapphire-window transceiver cartridge embedded in upper-right flange arc
    const housing = new THREE.Mesh(
      extrudeHiRes(createArcSectorShape(28.8, 33.6, a0, a1), 2.5, 0.1, 0.1, 2, 24),
      mats.ceramicAlumina
    );
    g.add(housing);

    // Hermetic sapphire AR optical window flush with mount face (zero metal contact wear or corrosion!)
    const sapWin = new THREE.Mesh(
      extrudeHiRes(createArcSectorShape(29.6, 32.8, a0 + 0.06, a1 - 0.06), 0.55, 0.04, 0.04, 1, 20),
      mats.sswfGlass
    );
    sapWin.position.z = 1.4;
    g.add(sapWin);

    // Twin optical micro-lenses: 850nm VCSEL Tx emitter & high-speed PIN Rx photodiode
    for (const dDeg of [44, 56]) {
      const da = THREE.MathUtils.degToRad(dDeg);
      const lens = new THREE.Mesh(
        hiResSphere(1.05, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.52).rotateX(Math.PI / 2),
        dDeg === 44 ? mats.fluorineCoatCyan : mats.nanoArIridescent
      );
      lens.position.set(Math.cos(da) * 31.2, Math.sin(da) * 31.2, 0.95);
      lens.userData.noEdges = true;
      g.add(lens);
    }

    // 60 GHz planar gold microstrip patch coupler array between optical lenses
    const patch = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.2, 0.18, 0.2, 0.02, 'z'),
      mats.goldPlating
    );
    patch.position.set(Math.cos(midA) * 31.2, Math.sin(midA) * 31.2, 1.15);
    patch.rotation.z = midA;
    g.add(patch);

    // Rear SerDes high-speed optical/mmWave transceiver QFN IC
    const serdes = buildChipPackage({
      w: 4.2,
      d: 3.4,
      h: 0.9,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    serdes.position.set(Math.cos(midA) * 31.2, Math.sin(midA) * 31.2, -1.6);
    serdes.rotation.z = midA;
    g.add(serdes);

    parts.push(
      finalizeMountUltra34Part(
        'mount-optical-mmwave-link',
        97,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 28.9),
        new THREE.Vector3(76, 86, 86),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M98: Embedded 3-Axis Piezoresistive Bayonet Strain-Gauge & Telephoto Sag Sensor Bridge
  // =========================================================================
  {
    const g = new THREE.Group();
    // Circular polyimide collector flex ring routing 3-axis Wheatstone bridges to 24-bit ADC
    const flexRing = new THREE.Mesh(
      extrudeHiRes(createRingShape(36.3, 34.4), 0.26, 0.02, 0.02, 1, 56),
      mats.polyimideFpc
    );
    g.add(flexRing);

    // 3x micro-machined metallic foil strain-gauge rosettes bonded at 90°, 210°, 330° load ribs
    for (const deg of [90, 210, 330]) {
      const a = THREE.MathUtils.degToRad(deg);
      const rg = new THREE.Group();
      rg.position.set(Math.cos(a) * 35.3, Math.sin(a) * 35.3, 0.22);
      rg.rotation.z = a;

      const backing = new THREE.Mesh(
        createChamferedBoxGeo(4.8, 6.2, 0.24, 0.4, 0.02, 'z'),
        mats.polyimideFpc
      );
      rg.add(backing);

      // Fine Constantan / Cu-Ni serpentine meander strain foil grid (5 parallel strips)
      for (let s = -2; s <= 2; s++) {
        const line = new THREE.Mesh(
          new THREE.BoxGeometry(3.4, 0.28, 0.14),
          mats.goldPlating
        );
        line.position.set(0, s * 0.95, 0.18);
        line.userData.noEdges = true;
        rg.add(line);
      }

      g.add(rg);
    }

    // Compact 24-bit ΔΣ instrumentation ADC & Wheatstone amplifier IC on lower-left tab
    const adcTab = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 5.2, 0.55, 0.7, 0.05, 'z'),
      mats.hdiMainboardPcb
    );
    adcTab.position.set(-28.0, 24.5, -0.2);
    adcTab.rotation.z = THREE.MathUtils.degToRad(-40);
    g.add(adcTab);

    const adcIc = buildChipPackage({
      w: 3.4,
      d: 3.0,
      h: 0.78,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      axis: 'z',
    });
    adcIc.position.set(-28.0, 24.5, 0.48);
    adcIc.rotation.z = THREE.MathUtils.degToRad(-40);
    g.add(adcIc);

    parts.push(
      finalizeMountUltra34Part(
        'mount-strain-gauge-bridge',
        98,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, 24.4),
        new THREE.Vector3(-118, 42, -32),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M99: Active Piezo / Electromagnetic Zero-Play Micro-Actuated Bayonet Lock Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Monolithic titanium compliant flexure frame housing 3 active PZT micro-wedge clampers
    const flexFrame = new THREE.Mesh(
      extrudeHiRes(createRingShape(33.1, 28.05), 1.45, 0.08, 0.08, 2, 56),
      mats.titaniumRivet
    );
    g.add(flexFrame);

    // 3x multi-layer PZT ceramic micro-wedge actuators (45°, 165°, 285°) eliminating sub-micron FIZ rotational play!
    for (const deg of [45, 165, 285]) {
      const a = THREE.MathUtils.degToRad(deg);
      const pg = new THREE.Group();
      pg.position.set(Math.cos(a) * 30.5, Math.sin(a) * 30.5, 0.45);
      pg.rotation.z = a;

      // Multi-layer sintered PZT piezo stack block
      const pzt = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 8.2, 1.35, 0.35, 0.06, 'z'),
        mats.pztCeramic
      );
      pg.add(pzt);

      // Twin silver drive electrodes flanking PZT ceramic stack
      for (const ey of [-3.6, 3.6]) {
        const elec = new THREE.Mesh(
          createChamferedBoxGeo(3.8, 0.85, 1.48, 0.15, 0.03, 'z'),
          mats.silverElectrode
        );
        elec.position.y = ey;
        pg.add(elec);
      }

      // Precision inward-projecting hardened tungsten/steel wedge shoe pressing bayonet lug zero-play!
      const wedge = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 4.4, 1.25, 0.25, 0.06, 'z'),
        mats.stainlessMachined
      );
      wedge.position.set(-2.5, 0, 0.25);
      pg.add(wedge);

      g.add(pg);
    }

    // Circular gold high-voltage piezo bus trace ring
    const hvBus = new THREE.Mesh(
      hiResTorus(32.5, 0.22, 8, 48),
      mats.goldPlating
    );
    hvBus.position.z = -0.78;
    hvBus.userData.noEdges = true;
    g.add(hvBus);

    parts.push(
      finalizeMountUltra34Part(
        'mount-active-piezo-lock',
        99,
        '#a855f7',
        g,
        new THREE.Vector3(0, 0, 28.3),
        new THREE.Vector3(118, -30, 12),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M100: Low-CTE Titanium / Invar-36 Hybrid Thermal-Compensated Flange & Thermal-Break Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer Ti-6Al-4V high-specific-strength composite flange ring (CTE ≈ 8.6 ppm/K)
    const tiOuterShape = createRingShape(34.7, 30.8);
    addCircleHoles(tiOuterShape, boltCoords, 1.55);
    const tiOuter = new THREE.Mesh(
      extrudeHiRes(tiOuterShape, 1.65, 0.1, 0.1, 2, 64),
      mats.titaniumRivet
    );
    g.add(tiOuter);

    // Inner Invar-36 (Fe-36Ni, CTE ≈ 1.2 ppm/K) thermal-invariant optical datum core ring!
    const invarCore = new THREE.Mesh(
      extrudeHiRes(createRingShape(30.65, 27.6), 1.85, 0.1, 0.1, 2, 64),
      mats.invarScaleBar
    );
    g.add(invarCore);

    // 6x zirconia/alumina low-conductivity ceramic thermal-break isolator washers at bolt circle
    for (const [bx, by] of boltCoords) {
      const iso = new THREE.Mesh(
        extrudeHiRes(createRingShape(2.45, 1.35), 0.72, 0.05, 0.05, 2, 18),
        mats.ceramicAlumina
      );
      iso.position.set(bx, by, -1.05);
      g.add(iso);
    }

    // 6x radial compliance thermal-isolation flex bridge pins linking Ti outer to Invar core
    for (const deg of [30, 90, 150, 210, 270, 330]) {
      const a = THREE.MathUtils.degToRad(deg);
      const pin = new THREE.Mesh(
        createChamferedBoxGeo(2.6, 1.15, 1.2, 0.2, 0.04, 'z'),
        mats.goldPlating
      );
      pin.position.set(Math.cos(a) * 30.7, Math.sin(a) * 30.7, 0);
      pin.rotation.z = a;
      g.add(pin);
    }

    // Rear flexible pyrolytic-graphite thermal shunt ring diverting BIONZ/sensor heat away from flange
    const graphiteShunt = new THREE.Mesh(
      extrudeHiRes(createRingShape(34.4, 29.0), 0.35, 0.03, 0.03, 1, 56),
      mats.pyroGraphite
    );
    graphiteShunt.position.z = -1.55;
    g.add(graphiteShunt);

    parts.push(
      finalizeMountUltra34Part(
        'mount-ti-invar-thermal-flange',
        100,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0, 30.8),
        new THREE.Vector3(118, 42, -57),
        cp,
        0.24
      )
    );
  }

  return parts;
}
