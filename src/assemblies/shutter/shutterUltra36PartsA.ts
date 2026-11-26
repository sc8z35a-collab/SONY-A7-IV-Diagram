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
  applyBoxUVs,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

/** Build a precision helical coil spring geometry along the Y axis */
function buildHelicalSpringGeo(
  coilR: number,
  wireR: number,
  turns: number,
  height: number,
  radialSegs = 8,
  tubularSegs = 64
): THREE.TubeGeometry {
  const pts: THREE.Vector3[] = [];
  const steps = Math.max(24, Math.round(turns * 16));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = t * turns * Math.PI * 2;
    pts.push(
      new THREE.Vector3(
        Math.cos(ang) * coilR,
        (t - 0.5) * height,
        Math.sin(ang) * coilR
      )
    );
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  return markHiRes(new THREE.TubeGeometry(curve, tubularSegs, wireR, radialSegs, false));
}

/** Build an intermittent (missing-tooth) sector gear profile in XY */
function createIntermittentGearShape(
  outerR: number,
  rootR: number,
  totalSlots: number,
  activeTeeth: number,
  boreR: number
): THREE.Shape {
  const s = new THREE.Shape();
  const step = (Math.PI * 2) / totalSlots;
  for (let i = 0; i < totalSlots; i++) {
    const a0 = i * step;
    const p0x = Math.cos(a0) * rootR;
    const p0y = Math.sin(a0) * rootR;
    if (i === 0) s.moveTo(p0x, p0y);
    else s.lineTo(p0x, p0y);
    if (i < activeTeeth) {
      const a1 = a0 + step * 0.18;
      const a2 = a0 + step * 0.34;
      const a3 = a0 + step * 0.54;
      const a4 = a0 + step * 0.70;
      s.lineTo(Math.cos(a1) * rootR, Math.sin(a1) * rootR);
      s.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
      s.lineTo(Math.cos(a3) * outerR, Math.sin(a3) * outerR);
      s.lineTo(Math.cos(a4) * rootR, Math.sin(a4) * rootR);
    } else {
      const am = a0 + step * 0.5;
      s.lineTo(Math.cos(am) * (rootR - 0.15), Math.sin(am) * (rootR - 0.15));
    }
  }
  s.closePath();
  if (boreR > 0.05) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, boreR, 0, Math.PI * 2, true);
    s.holes.push(hole);
  }
  return s;
}

/** Build a precision full-frame perimeter ring with guaranteed >= 38.4x26.4mm clear optical window */
function createApertureFrameMesh(
  outerW: number,
  outerH: number,
  innerW: number,
  innerH: number,
  depth: number,
  mat: THREE.Material,
  bevelSize = 0.06
): THREE.Mesh {
  const shape = createFrameShape(outerW, outerH, 1.4, innerW, innerH, 0.8);
  const geo = extrudeHiRes(shape, depth, bevelSize, bevelSize, 2, 16);
  geo.translate(0, 0, -depth * 0.5);
  applyBoxUVs(geo, 16);
  return new THREE.Mesh(geo, mat);
}

function finalizePhase36ShutterPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  targetExplodedPos: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.28
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);
  const explodeOffset = targetExplodedPos.clone().sub(assembledPos);

  return {
    id,
    subsystem: 'shutter',
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
 * Phase 36 Shutter Standalone Deep Forensic Ultra-Dissection — Part A (SH131–SH155, 25 parts).
 *
 * - Group F (SH131–SH140): Blade, Link & Rivetless Micro-Anatomy + Next-Gen Blade Materials
 * - Group G (SH141–SH150): Plates, Adhesive Dust Trap, Optical Baffles & Chassis Micro-Structure
 * - Group H-1 (SH151–SH155): Residual-Magnetism Elimination, Direct-Drive Rotor & Clutch Gear
 */
export function buildShutterUltra36PartsA(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // SH131. Stepped Crank-Offset Parallelogram Link Arms & Crossing Relief Notches (US4426146A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main arm (Z = -0.32 -> Z = +0.18 crank step) + sub arm crossing cleanly without interference
    const mainLower = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 12.0, 0.36, 0.5, 0.05, 'z'),
      mats.linkArmSteel
    );
    mainLower.position.set(-1.6, -5.2, -0.34);
    const crankStep = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.4, 0.88, 0.4, 0.06, 'z'),
      mats.linkArmSteel
    );
    crankStep.position.set(-1.6, 1.0, -0.06);
    crankStep.rotation.x = 0.32;
    const mainUpper = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 11.4, 0.36, 0.5, 0.05, 'z'),
      mats.linkArmSteel
    );
    mainUpper.position.set(-1.6, 6.8, 0.22);

    // Secondary crossing link arm with recessed crescent relief pocket
    const subShape = new THREE.Shape();
    subShape.moveTo(-1.1, -10.8);
    subShape.lineTo(1.1, -10.8);
    subShape.lineTo(1.1, -1.8);
    subShape.absarc(1.25, 0.4, 1.65, -Math.PI * 0.48, Math.PI * 0.48, true);
    subShape.lineTo(1.1, 10.6);
    subShape.lineTo(-1.1, 10.6);
    subShape.closePath();
    const subGeo = extrudeHiRes(subShape, 0.34, 0.04, 0.04, 2, 16);
    subGeo.translate(0, 0, -0.17);
    const subArm = new THREE.Mesh(subGeo, mats.midPlateSteel);
    subArm.position.set(1.85, 0.0, 0.62);

    // Pivot bores & bronze step bushings
    for (const [px, py, pz] of [
      [-1.6, -9.8, -0.34],
      [-1.6, 11.2, 0.22],
      [1.85, -9.4, 0.62],
      [1.85, 9.2, 0.62],
    ]) {
      const bush = new THREE.Mesh(
        hiResCyl(1.1, 1.1, 0.65, 18).rotateX(Math.PI / 2),
        mats.sinteredBronzeBushing
      );
      bush.position.set(px, py, pz);
      const pin = new THREE.Mesh(
        hiResCyl(0.55, 0.55, 1.1, 14).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      pin.position.set(px, py, pz);
      g.add(bush, pin);
    }
    // Axial Z-gap wave-washer shim between offset planes
    const waveWasher = new THREE.Mesh(hiResTorus(1.45, 0.14, 10, 24), mats.beCuSpring);
    waveWasher.position.set(-1.6, -9.8, 0.12);
    g.add(mainLower, crankStep, mainUpper, subArm, waveWasher);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-blade-crank-offset-arms',
        131,
        '#64748b',
        g,
        new THREE.Vector3(-22.2, 0.5, 14.9),
        new THREE.Vector3(-118, 84, 62),
        cp
      )
    );
  }

  // =========================================================================
  // SH132. Rivetless Boss-and-Hole Integrated Blade-Link Coupling (US20110158635A1 Samsung)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded/stamped carrier link strip with 3 extruded stepped boss studs engaging keyhole blade lugs
    const linkStrip = new THREE.Mesh(
      createChamferedBoxGeo(14.0, 3.6, 0.55, 0.7, 0.06, 'z'),
      mats.linkArmSteel
    );
    g.add(linkStrip);

    // Translucent/dark blade lug coupon mounted slightly forward to reveal boss-in-hole snap coupling
    const bladeCoupon = new THREE.Mesh(
      createChamferedBoxGeo(12.8, 5.2, 0.18, 0.5, 0.02, 'z'),
      mats.carbonFiberBlade
    );
    bladeCoupon.position.set(0.4, 2.6, 0.56);
    g.add(bladeCoupon);

    for (let i = 0; i < 3; i++) {
      const bx = -4.2 + i * 4.2;
      // Stepped integral boss collar + retention undercut flange
      const bossBase = new THREE.Mesh(
        hiResCyl(1.15, 1.25, 0.45, 20).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      bossBase.position.set(bx, 0.6, 0.42);
      const bossHead = new THREE.Mesh(
        hiResCyl(0.82, 0.82, 0.72, 18).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      bossHead.position.set(bx, 0.6, 0.68);
      // Keyhole anti-drop retention ring seated around blade hole
      const snapRing = new THREE.Mesh(hiResTorus(0.96, 0.12, 10, 22), mats.goldPlating);
      snapRing.position.set(bx, 0.6, 0.78);
      g.add(bossBase, bossHead, snapRing);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-blade-rivetless-boss',
        132,
        '#0ea5e9',
        g,
        new THREE.Vector3(-22.5, 15.2, 15.6),
        new THREE.Vector3(-134, 54, 68),
        cp
      )
    );
  }

  // =========================================================================
  // SH133. Photochemically Etched Titanium Honeycomb Ultra-Light Shutter Blade (Nikon FM2/FE2)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-stiffness perimeter frame of an etched titanium foil blade (compact specimen strip in upper pocket)
    const bladeBase = new THREE.Mesh(
      createChamferedBoxGeo(22.0, 4.8, 0.14, 0.4, 0.02, 'z'),
      mats.titaniumRivet
    );
    g.add(bladeBase);

    // Raised hexagonal honeycomb rib lattice etched across the central weight-reduction zone
    const hexR = 1.02;
    const cols = 7;
    const rows = 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const hx = -8.4 + c * 2.55 + (r % 2) * 1.28;
        const hy = -0.95 + r * 1.85;
        const hexCell = new THREE.Mesh(
          new THREE.CylinderGeometry(hexR, hexR, 0.28, 6).rotateX(Math.PI / 2),
          mats.midPlateSteel
        );
        hexCell.position.set(hx, hy, 0.06);
        const hexPocket = new THREE.Mesh(
          new THREE.CylinderGeometry(hexR * 0.72, hexR * 0.72, 0.31, 6).rotateX(Math.PI / 2),
          mats.shutterChassis
        );
        hexPocket.position.set(hx, hy, 0.07);
        g.add(hexCell, hexPocket);
      }
    }
    // Reinforced straight slit edge rail & dual pivot eyes on left lug
    const slitRail = new THREE.Mesh(
      createChamferedBoxGeo(22.2, 0.62, 0.30, 0.12, 0.03, 'z'),
      mats.stainlessMachined
    );
    slitRail.position.set(0, -2.25, 0.04);
    for (const py of [-0.9, 1.1]) {
      const eye = new THREE.Mesh(
        hiResCyl(0.7, 0.7, 0.45, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      eye.position.set(-9.9, py, 0.06);
      g.add(eye);
    }
    g.add(slitRail);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-blade-titanium-honeycomb',
        133,
        '#94a3b8',
        g,
        new THREE.Vector3(0.0, 15.8, 16.4),
        new THREE.Vector3(-136, 20, 76),
        cp
      )
    );
  }

  // =========================================================================
  // SH134. 5-Blade Split Ultra-High-Speed 1.8 ms (1/12000 s) Duralumin/CFRP Curtain Stack
  // =========================================================================
  {
    const g = new THREE.Group();
    // 5 ultra-narrow stepped blades fanned cleanly with distinct 5th auxiliary light-seal blade
    for (let i = 0; i < 5; i++) {
      const mat = i === 0 ? mats.carbonFiberBlade : i === 4 ? mats.shutterShieldBlade : mats.carbonFiberBladeRear;
      const w = 18.6 - i * 0.35;
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(w, 2.35, 0.14, 0.25, 0.02, 'z'),
        mat
      );
      blade.position.set(i * 0.12, -3.4 + i * 1.72, -0.5 + i * 0.26);
      g.add(blade);

      // Stepped aluminum slit-edge reinforcement trim on #1 slit-forming blade
      if (i === 0) {
        const edge = new THREE.Mesh(
          createChamferedBoxGeo(w + 0.1, 0.42, 0.24, 0.08, 0.02, 'z'),
          mats.titaniumRivet
        );
        edge.position.set(0, -4.45, -0.5);
        g.add(edge);
      }

      // Link rivet pins on left side showing progressive leverage ratios (0.2 / 0.4 / 0.6 / 0.8 / 1.0)
      const pin = new THREE.Mesh(
        hiResCyl(0.42, 0.42, 0.42, 14).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      pin.position.set(-8.2 + i * 0.45, -3.4 + i * 1.72, -0.5 + i * 0.26);
      g.add(pin);
    }
    // Progressive drive arm connecting all 5 staggered pivot stations
    const arm = new THREE.Mesh(
      createChamferedBoxGeo(1.6, 8.6, 0.38, 0.4, 0.04, 'z'),
      mats.linkArmSteel
    );
    arm.position.set(-7.5, 0.0, -0.95);
    arm.rotation.z = -0.18;
    g.add(arm);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-blade-5blade-split',
        134,
        '#334155',
        g,
        new THREE.Vector3(0.0, -16.4, 16.0),
        new THREE.Vector3(-124, -14, 82),
        cp
      )
    );
  }

  // =========================================================================
  // SH135. 2026 Super-Elastic Carbon-Fiber + Homopolymer Polyimide (PI) Composite Blade (CN121348638A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stepped cutaway stack exposing outer matte-black carbon plies, golden homopolymer PI core & flexible resin binder
    const backCf = new THREE.Mesh(
      createChamferedBoxGeo(17.5, 4.6, 0.22, 0.35, 0.03, 'z'),
      mats.carbonFiberBlade
    );
    backCf.position.set(0, 0, -0.45);
    const piCore = new THREE.Mesh(
      createChamferedBoxGeo(14.5, 4.4, 0.28, 0.3, 0.03, 'z'),
      mats.polyimideFpc
    );
    piCore.position.set(-0.6, 0.15, 0.0);
    const resinBinder = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 4.1, 0.16, 0.25, 0.02, 'z'),
      mats.opticalCementClear
    );
    resinBinder.position.set(-1.2, 0.3, 0.34);
    const frontCf = new THREE.Mesh(
      createChamferedBoxGeo(8.8, 3.8, 0.22, 0.25, 0.03, 'z'),
      mats.aramidKevlarWeave
    );
    frontCf.position.set(-1.8, 0.45, 0.64);

    // Impact-absorption perimeter bumper fillet along high-G pivot edge
    const edgeFillet = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 4.8, 1.35, 0.35, 0.08, 'z'),
      mats.damperElastomer
    );
    edgeFillet.position.set(-8.1, 0.1, 0.1);
    g.add(backCf, piCore, resinBinder, frontCf, edgeFillet);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-blade-pi-superelastic',
        135,
        '#d97706',
        g,
        new THREE.Vector3(-12.0, 16.5, 16.9),
        new THREE.Vector3(-92, 96, 72),
        cp
      )
    );
  }

  // =========================================================================
  // SH136. Blade-Tip Anti-Curl Crowning Geometry & Stamped Micro-Stiffening Bead Ribs (US4380857A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Gently arched crowned blade strip (cross-section camber resisting aero flutter & curl)
    const stripShape = new THREE.Shape();
    stripShape.moveTo(-9.0, -0.12);
    stripShape.quadraticCurveTo(0, 0.58, 9.0, -0.12);
    stripShape.lineTo(9.0, 0.12);
    stripShape.quadraticCurveTo(0, 0.82, -9.0, 0.12);
    stripShape.closePath();
    const crownedGeo = extrudeHiRes(stripShape, 4.8, 0.04, 0.04, 2, 20);
    crownedGeo.rotateX(Math.PI / 2);
    crownedGeo.translate(0, 2.4, 0);
    const crownedBlade = new THREE.Mesh(crownedGeo, mats.carbonFiberBladeRear);
    g.add(crownedBlade);

    // Three longitudinal stamped stiffening micro-beads along the blade face
    for (const by of [-1.2, 0.0, 1.2]) {
      const bead = new THREE.Mesh(
        hiResCyl(0.24, 0.24, 15.2, 12).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      bead.scale.set(1, 0.65, 1);
      bead.position.set(0, by, 0.58);
      g.add(bead);
    }
    // Calibrated flatness-reference twin edge skids
    for (const sx of [-7.8, 7.8]) {
      const skid = new THREE.Mesh(
        createChamferedBoxGeo(1.2, 4.4, 0.42, 0.2, 0.04, 'z'),
        mats.titaniumRivet
      );
      skid.position.set(sx, 0, -0.12);
      g.add(skid);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-blade-crowning-beads',
        136,
        '#475569',
        g,
        new THREE.Vector3(6.5, 16.8, 17.2),
        new THREE.Vector3(-60, 106, 80),
        cp
      )
    );
  }

  // =========================================================================
  // SH137. Secondary-Blade Delayed-Open Curved Loose-Slot Cam Track & Overlap Control Pin (US3628438A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Blade lug plate featuring precision curved loose-coupling cam slot
    const plateShape = createRoundedRectShape(14.0, 7.6, 1.2);
    const slotHole = new THREE.Path();
    slotHole.moveTo(-3.8, -1.6);
    slotHole.quadraticCurveTo(0.2, 1.8, 4.2, 1.1);
    slotHole.lineTo(4.2, -0.1);
    slotHole.quadraticCurveTo(0.2, 0.5, -3.4, -2.5);
    slotHole.closePath();
    plateShape.holes.push(slotHole);
    const plateGeo = extrudeHiRes(plateShape, 0.65, 0.06, 0.06, 2, 18);
    plateGeo.translate(0, 0, -0.325);
    const plate = new THREE.Mesh(plateGeo, mats.midPlateSteel);
    g.add(plate);

    // Sliding hardened guide pin + POM low-friction slider collar traveling inside the curved slot
    const collar = new THREE.Mesh(
      hiResCyl(0.88, 0.88, 1.1, 18).rotateX(Math.PI / 2),
      mats.pomGear
    );
    collar.position.set(0.4, 0.65, 0.1);
    const pin = new THREE.Mesh(
      hiResCyl(0.48, 0.48, 2.2, 16).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    pin.position.set(0.4, 0.65, 0.25);

    // Secondary trailing arm engaged to the cam pin
    const arm = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 1.8, 0.42, 0.4, 0.05, 'z'),
      mats.linkArmSteel
    );
    arm.position.set(-2.6, 2.2, 1.05);
    arm.rotation.z = -0.38;
    g.add(collar, pin, arm);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-blade-loose-slot-link',
        137,
        '#0284c7',
        g,
        new THREE.Vector3(-23.0, 10.2, 16.5),
        new THREE.Vector3(-24, 112, 86),
        cp
      )
    );
  }

  // =========================================================================
  // SH138. Black Electroless Ni-PTFE Composite Blade Coating (1-5 um) & Ultra-Matte Anti-Flare Layer (US4394082A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cross-sectional multi-layer peel specimen: substrate -> 3 um Ni-P metallic barrier -> black PTFE matte skin
    const substrate = new THREE.Mesh(
      createChamferedBoxGeo(16.0, 5.4, 0.55, 0.35, 0.04, 'z'),
      mats.carbonFiberBlade
    );
    substrate.position.set(0, 0, -0.5);
    const niBarrier = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 5.1, 0.28, 0.3, 0.03, 'z'),
      mats.stainlessMachined
    );
    niBarrier.position.set(-0.5, 0.1, -0.04);
    const blackPtfe = new THREE.Mesh(
      createChamferedBoxGeo(10.0, 4.8, 0.26, 0.3, 0.03, 'z'),
      mats.velvetFlockTrap
    );
    blackPtfe.position.set(-1.1, 0.2, 0.28);

    // Embedded PTFE micro-lubricant nodules visualized along the top surface
    for (let i = 0; i < 6; i++) {
      const nod = new THREE.Mesh(hiResSphere(0.32, 12, 10), mats.pomGear);
      nod.position.set(-4.6 + i * 1.4, (i % 2 === 0 ? 1.0 : -0.8), 0.45);
      g.add(nod);
    }
    g.add(substrate, niBarrier, blackPtfe);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-blade-electroless-ni-ptfe',
        138,
        '#1e293b',
        g,
        new THREE.Vector3(10.5, -16.8, 16.8),
        new THREE.Vector3(-108, 68, 96),
        cp
      )
    );
  }

  // =========================================================================
  // SH139. Coaxial Common Innermost Pivot Journal & Rotational-Symmetry Dual Bearing Post (US4426146A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stepped precision coaxial spindle shared by front-curtain inner arm & rear-curtain inner arm
    const baseFlange = new THREE.Mesh(
      hiResCyl(3.2, 3.4, 0.9, 24).rotateX(Math.PI / 2),
      mats.shutterChassis
    );
    baseFlange.position.z = -1.8;
    const journalShaft = new THREE.Mesh(
      hiResCyl(1.1, 1.1, 4.8, 22).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    const frontArmHub = new THREE.Mesh(
      createChamferedBoxGeo(9.4, 2.5, 0.45, 0.5, 0.05, 'z'),
      mats.linkArmSteel
    );
    frontArmHub.position.set(3.4, 1.4, -0.75);
    frontArmHub.rotation.z = 0.36;

    // Middle bronze thrust separator ring isolating front & rear arm rotation
    const midThrust = new THREE.Mesh(
      hiResCyl(2.2, 2.2, 0.55, 22).rotateX(Math.PI / 2),
      mats.sinteredBronzeBushing
    );
    midThrust.position.z = 0.0;

    const rearArmHub = new THREE.Mesh(
      createChamferedBoxGeo(9.4, 2.5, 0.45, 0.5, 0.05, 'z'),
      mats.midPlateSteel
    );
    rearArmHub.position.set(3.4, -1.4, 0.78);
    rearArmHub.rotation.z = -0.36;

    // Top retention E-clip
    const eClip = new THREE.Mesh(hiResTorus(1.38, 0.18, 10, 22), mats.titaniumRivet);
    eClip.position.z = 1.85;
    g.add(baseFlange, journalShaft, frontArmHub, midThrust, rearArmHub, eClip);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-arm-common-pivot-journal',
        139,
        '#b45309',
        g,
        new THREE.Vector3(-21.8, -5.5, 15.2),
        new THREE.Vector3(-128, 34, 106),
        cp
      )
    );
  }

  // =========================================================================
  // SH140. Driving-Pin Low-Friction PEEK Roller Sleeve & Knurled Anti-Rotation Press-Fit Shank (US20020172519A1)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Drive lever boss + press-fit knurled root + hardened core pin + free-spinning PEEK roller sleeve
    const bossPlate = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 4.4, 0.9, 0.8, 0.08, 'z'),
      mats.linkArmSteel
    );
    bossPlate.position.z = -1.6;

    // Knurled press-fit shoulder (12 axial flutes)
    const knurlRoot = new THREE.Mesh(
      new THREE.CylinderGeometry(1.42, 1.42, 1.35, 12).rotateX(Math.PI / 2),
      mats.brassGear
    );
    knurlRoot.position.z = -0.6;

    // Hardened core pin
    const corePin = new THREE.Mesh(
      hiResCyl(0.85, 0.85, 4.4, 20).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    corePin.position.z = 0.85;

    // Free-rotating PEEK/POM low-friction roller sleeve + PTFE end-cap washer
    const peekSleeve = new THREE.Mesh(
      hiResCyl(1.48, 1.48, 2.2, 24).rotateX(Math.PI / 2),
      mats.pomGear
    );
    peekSleeve.position.z = 1.45;
    const capWasher = new THREE.Mesh(
      hiResCyl(1.18, 1.18, 0.25, 20).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    capWasher.position.z = 2.75;
    g.add(bossPlate, knurlRoot, corePin, peekSleeve, capWasher);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-drive-pin-roller-cap',
        140,
        '#eab308',
        g,
        new THREE.Vector3(-21.2, 7.2, 17.5),
        new THREE.Vector3(-86, 86, 110),
        cp
      )
    );
  }

  // =========================================================================
  // SH141. Permanent Wear-Powder Adhesive Dust-Trap Strip (AD) & Recessed Concavity (5t) (US20020172519A1 / US6726381B2)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame perimeter recessed trough channel (>38.6x26.6 mm inner clear window!) lined with amber/gel adhesive capture bands
    const troughFrame = createApertureFrameMesh(45.2, 33.2, 39.2, 27.2, 0.9, mats.shutterChassis, 0.08);
    g.add(troughFrame);

    // 4 recessed adhesive dust-capture gel strips around the aperture perimeter (heaviest on bottom gravity trough & link side)
    const botTrap = new THREE.Mesh(
      createChamferedBoxGeo(38.0, 2.1, 0.42, 0.3, 0.04, 'z'),
      mats.dustCatcherGel
    );
    botTrap.position.set(0, -14.8, 0.45);
    const topTrap = new THREE.Mesh(
      createChamferedBoxGeo(36.0, 1.5, 0.38, 0.25, 0.04, 'z'),
      mats.dustCatcherGel
    );
    topTrap.position.set(0, 14.9, 0.45);
    const leftTrap = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 26.0, 0.45, 0.3, 0.04, 'z'),
      mats.dustCatcherGel
    );
    leftTrap.position.set(-20.9, 0, 0.45);

    // Micro captured dust specs permanently immobilized in the lower adhesive gel strip
    for (let i = 0; i < 8; i++) {
      const spec = new THREE.Mesh(hiResSphere(0.22, 8, 6), mats.titaniumRivet);
      spec.position.set(-14.0 + i * 4.0, -14.8 + (i % 2 === 0 ? 0.35 : -0.3), 0.7);
      g.add(spec);
    }
    g.add(botTrap, topTrap, leftTrap);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-adhesive-dust-trap',
        141,
        '#f59e0b',
        g,
        new THREE.Vector3(0.0, 0.0, 11.1),
        new THREE.Vector3(14, 116, 92),
        cp
      )
    );
  }

  // =========================================================================
  // SH142. Auxiliary Baseplate Inclined Stray-Light Wall (5i / 5j) & Minimized Knife Edge (5H) (US20020172519A1)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame perimeter wall (>38.6x26.6mm clear!) with angled chamfered bevel reflecting oblique rays back toward lens
    const outerRing = createApertureFrameMesh(46.0, 34.0, 39.6, 27.6, 0.55, mats.shutterChassis, 0.06);
    outerRing.position.z = -0.35;
    const inclinedLip = createApertureFrameMesh(41.8, 29.8, 38.6, 26.6, 0.72, mats.mountVelvetBaffle, 0.14);
    inclinedLip.position.z = 0.25;
    g.add(outerRing, inclinedLip);

    // Side link-chamber isolation partition wall (5i) separating arm working zone from optical window
    const partitionWall = new THREE.Mesh(
      createChamferedBoxGeo(1.4, 29.0, 1.65, 0.2, 0.12, 'z'),
      mats.matteBlackAnodized
    );
    partitionWall.position.set(-20.5, 0, 0.55);
    partitionWall.rotation.y = 0.26;
    g.add(partitionWall);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-inclined-aperture-wall',
        142,
        '#334155',
        g,
        new THREE.Vector3(0.0, 0.0, 18.8),
        new THREE.Vector3(52, 112, 96),
        cp
      )
    );
  }

  // =========================================================================
  // SH143. Resin Baseplate Insert-Molded Hardened Stainless Pivot Shanks (1e/1f/1h/1i) & Anchor Grooves
  // =========================================================================
  {
    const g = new THREE.Group();
    // Glass-filled PPS resin carrier rail section containing 4 precision insert-molded SUS420J2 stepped shanks
    const resinRail = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 17.5, 1.35, 0.8, 0.12, 'z'),
      mats.mountPpsInsulator
    );
    g.add(resinRail);

    const shankYs = [-6.2, -2.0, 2.2, 6.4];
    for (let i = 0; i < shankYs.length; i++) {
      const sy = shankYs[i];
      // Anti-pullout double anchor groove flange embedded inside resin
      const anchorFlange = new THREE.Mesh(
        hiResCyl(1.75, 1.75, 0.45, 18).rotateX(Math.PI / 2),
        mats.brassGear
      );
      anchorFlange.position.set((i % 2 === 0 ? -1.1 : 1.1), sy, 0.0);
      // Precision ground pivot post protruding both front (drive side) and rear (blade chamber side)
      const post = new THREE.Mesh(
        hiResCyl(0.82, 0.82, 4.6, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      post.position.set((i % 2 === 0 ? -1.1 : 1.1), sy, 0.2);
      // Rear keyhole groove tip
      const tipCap = new THREE.Mesh(
        hiResCyl(1.02, 0.72, 0.55, 16).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      tipCap.position.set((i % 2 === 0 ? -1.1 : 1.1), sy, 2.45);
      g.add(anchorFlange, post, tipCap);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-insert-molded-bushes',
        143,
        '#475569',
        g,
        new THREE.Vector3(-23.2, 0.0, 14.0),
        new THREE.Vector3(-44, 96, 122),
        cp
      )
    );
  }

  // =========================================================================
  // SH144. Intermediate Separator Plate Stamped Lancing Preload Spring Tabs & 3-Point Datum Holes
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame ultra-thin steel separator rim (>38.6x26.6mm clear!) with 4 cantilevered lancing spring tongues
    const plateRim = createApertureFrameMesh(44.4, 32.4, 38.8, 26.8, 0.28, mats.midPlateSteel, 0.03);
    g.add(plateRim);

    const tabCoords: Array<[number, number, number]> = [
      [-20.6, 13.8, 0.22],
      [20.6, 13.8, -0.22],
      [-20.6, -13.8, 0.22],
      [20.6, -13.8, -0.22],
    ];
    for (const [tx, ty, tilt] of tabCoords) {
      // Stamped cantilevered preload tongue angled slightly in Z to eliminate axial rattle
      const tongue = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 1.3, 0.18, 0.2, 0.02, 'z'),
        mats.beCuSpring
      );
      tongue.position.set(tx, ty, 0.42);
      tongue.rotation.y = tilt;
      const datumEye = new THREE.Mesh(
        hiResTorus(0.95, 0.22, 10, 20),
        mats.titaniumRivet
      );
      datumEye.position.set(tx, ty * 0.72, 0.08);
      g.add(tongue, datumEye);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-midplate-lancing-tabs',
        144,
        '#0891b2',
        g,
        new THREE.Vector3(0.0, 0.0, 15.05),
        new THREE.Vector3(0, 94, 134),
        cp
      )
    );
  }

  // =========================================================================
  // SH145. Auxiliary Baseplate Lateral Keyhole Slide-Lock Grooves (5c/5d) & Heat-Staked Bosses
  // =========================================================================
  {
    const g = new THREE.Group();
    // Specimen mounting ear featuring lateral keyhole slide slot + grooved shank + mushroomed heat-stake boss
    const earShape = createRoundedRectShape(15.5, 7.2, 1.1);
    const kh = new THREE.Path();
    kh.absarc(-3.5, 0, 1.55, 0.35, Math.PI * 2 - 0.35, false);
    kh.lineTo(1.2, -0.78);
    kh.absarc(1.2, 0, 0.78, -Math.PI / 2, Math.PI / 2, false);
    kh.closePath();
    earShape.holes.push(kh);
    const earGeo = extrudeHiRes(earShape, 0.72, 0.06, 0.06, 2, 18);
    earGeo.translate(0, 0, -0.36);
    const earPlate = new THREE.Mesh(earGeo, mats.shutterChassis);
    g.add(earPlate);

    // Grooved lock shank engaged in narrow neck of keyhole
    const neckPost = new THREE.Mesh(
      hiResCyl(0.74, 0.74, 2.2, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    neckPost.position.set(1.2, 0, 0.0);
    const lockFlange = new THREE.Mesh(
      hiResCyl(1.38, 1.38, 0.42, 20).rotateX(Math.PI / 2),
      mats.brassGear
    );
    lockFlange.position.set(1.2, 0, 0.92);

    // Ultrasonic/heat-staked melted resin mushroom dome boss on opposite corner
    const stakeCol = new THREE.Mesh(
      hiResCyl(0.95, 1.1, 1.5, 16).rotateX(Math.PI / 2),
      mats.mountPpsInsulator
    );
    stakeCol.position.set(5.2, 0, 0.2);
    const stakeDome = new THREE.Mesh(hiResSphere(1.45, 18, 12), mats.cinnabarAnodized);
    stakeDome.scale.set(1, 1, 0.45);
    stakeDome.position.set(5.2, 0, 1.0);
    g.add(neckPost, lockFlange, stakeCol, stakeDome);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-heat-stake-bayonet-clips',
        145,
        '#ea580c',
        g,
        new THREE.Vector3(16.0, 16.0, 18.2),
        new THREE.Vector3(44, 96, 132),
        cp
      )
    );
  }

  // =========================================================================
  // SH146. Arcuate Slot Stress-Relief Corner Notches & Raised Sliding Guide Ribs (US20020172519A1 1b/1c)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Baseplate quadrant featuring twin arcuate slots with dog-bone stress-relief circular cutouts at both ends
    const quadShape = createRoundedRectShape(12.5, 14.5, 1.2);
    for (const sx of [-2.4, 2.4]) {
      const slot = new THREE.Path();
      slot.absarc(sx, 4.2, 1.05, 0, Math.PI, false);
      slot.lineTo(sx - 0.68, -4.2);
      slot.absarc(sx, -4.2, 1.05, Math.PI, Math.PI * 2, false);
      slot.lineTo(sx + 0.68, 4.2);
      slot.closePath();
      quadShape.holes.push(slot);
    }
    const quadGeo = extrudeHiRes(quadShape, 0.9, 0.06, 0.06, 2, 18);
    quadGeo.translate(0, 0, -0.45);
    const quad = new THREE.Mesh(quadGeo, mats.shutterChassis);
    g.add(quad);

    // Raised low-friction rib rails bordering the slots + elastomer endpoint stress collars
    for (const sx of [-2.4, 2.4]) {
      for (const side of [-1.25, 1.25]) {
        const rib = new THREE.Mesh(
          createChamferedBoxGeo(0.45, 9.2, 0.52, 0.12, 0.04, 'z'),
          mats.linkArmSteel
        );
        rib.position.set(sx + side, 0, 0.58);
        g.add(rib);
      }
      for (const ey of [-4.2, 4.2]) {
        const ring = new THREE.Mesh(hiResTorus(1.18, 0.16, 10, 18), mats.butylDamperRubber);
        ring.position.set(sx, ey, 0.55);
        g.add(ring);
      }
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-arc-slot-relief-notches',
        146,
        '#4f46e5',
        g,
        new THREE.Vector3(-24.8, 0.0, 13.4),
        new THREE.Vector3(-86, 42, 128),
        cp
      )
    );
  }

  // =========================================================================
  // SH147. Full-Perimeter Closed-Cell Optical Light-Seal Urethane Foam Gasket (JPO 2H081 AA39)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame double-lip compressible matte urethane foam seal (>39.4x27.4mm clear window!)
    const mainSeal = createApertureFrameMesh(48.0, 36.0, 40.4, 28.4, 1.45, mats.lensFoamSeal, 0.22);
    const innerLip = createApertureFrameMesh(42.2, 30.2, 39.4, 27.4, 1.85, mats.epdmGasket, 0.16);
    innerLip.position.z = 0.22;
    g.add(mainSeal, innerLip);

    // Corner compression-limiter PSA backing strips
    for (const [cx, cy] of [
      [-22.2, 16.0],
      [22.2, 16.0],
      [-22.2, -16.0],
      [22.2, -16.0],
    ]) {
      const psa = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 2.8, 0.22, 0.4, 0.02, 'z'),
        mats.thermalTransferTape
      );
      psa.position.set(cx, cy, -0.82);
      g.add(psa);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-perimeter-light-seal-foam',
        147,
        '#1e293b',
        g,
        new THREE.Vector3(0.0, 0.0, 20.6),
        new THREE.Vector3(-44, 54, 146),
        cp
      )
    );
  }

  // =========================================================================
  // SH148. CNT / Graphite-Doped Static-Dissipative PPS/LCP Blade-Chamber Guide Spacer (US9241433B2)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-frame conductive PPS divider spacer (>38.8x26.8mm clear!) with copper chassis ground contact fingers
    const ppsFrame = createApertureFrameMesh(45.6, 33.6, 39.2, 27.2, 0.65, mats.pyroGraphite, 0.06);
    g.add(ppsFrame);

    // Integrated copper ESD ground drainage leaf fingers at left/right chassis ears
    for (const gx of [-22.6, 22.6]) {
      const gndTab = new THREE.Mesh(
        createChamferedBoxGeo(2.4, 5.2, 0.32, 0.3, 0.04, 'z'),
        mats.copperHeatSpreader
      );
      gndTab.position.set(gx, 0, 0.25);
      const springFinger = new THREE.Mesh(
        createChamferedBoxGeo(1.6, 2.6, 0.16, 0.2, 0.02, 'z'),
        mats.goldPlating
      );
      springFinger.position.set(gx * 1.03, 0, 0.56);
      springFinger.rotation.y = gx > 0 ? -0.25 : 0.25;
      g.add(gndTab, springFinger);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-conductive-pps-divider',
        148,
        '#10b981',
        g,
        new THREE.Vector3(0.0, 0.0, 15.85),
        new THREE.Vector3(4, 48, 158),
        cp
      )
    );
  }

  // =========================================================================
  // SH149. Aperture Inner-Wall 60-Deg Micro-Serrated Anti-Flare Stray-Light Grooves (JPO 2H081 AA37)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 stepped concentric thin frames creating visible multi-ridge sawtooth light-trap steps (>38.4x26.4mm clear!)
    const steps = [
      { iw: 38.4, ih: 26.4, z: -0.72 },
      { iw: 39.2, ih: 27.2, z: -0.24 },
      { iw: 38.6, ih: 26.6, z: 0.24 },
      { iw: 39.4, ih: 27.4, z: 0.72 },
    ];
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const stepFrame = createApertureFrameMesh(
        44.8,
        32.8,
        st.iw,
        st.ih,
        0.38,
        i % 2 === 0 ? mats.mountVelvetBaffle : mats.matteBlackAnodized,
        0.05
      );
      stepFrame.position.z = st.z;
      g.add(stepFrame);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-aperture-serrated-grooves',
        149,
        '#0f172a',
        g,
        new THREE.Vector3(0.0, 0.0, 19.6),
        new THREE.Vector3(50, 52, 148),
        cp
      )
    );
  }

  // =========================================================================
  // SH150. Retractable Internal-ND Filter Rail & Interlocked Dust-Shield Bay (Canon JP2023-128253A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Compact side-retracted motorized ND carrier rail docked cleanly BELOW the aperture at assembledPos
    const guideRailFrame = new THREE.Mesh(
      createChamferedBoxGeo(24.0, 3.6, 1.35, 0.5, 0.08, 'z'),
      mats.magnesiumCast
    );
    g.add(guideRailFrame);

    // Twin linear guide rods + retracted optical ND glass carrier tray parked outside the window
    for (const ry of [-1.25, 1.25]) {
      const rod = new THREE.Mesh(
        hiResCyl(0.28, 0.28, 22.8, 14).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      rod.position.set(0, ry, 0.65);
      g.add(rod);
    }
    const ndTray = new THREE.Mesh(
      createChamferedBoxGeo(13.0, 2.8, 0.55, 0.35, 0.04, 'z'),
      mats.shutterChassis
    );
    ndTray.position.set(-2.5, 0, 0.92);
    const ndGlass = new THREE.Mesh(
      createChamferedBoxGeo(10.6, 1.9, 0.28, 0.2, 0.02, 'z'),
      mats.irCutGlass
    );
    ndGlass.position.set(-2.5, 0, 1.02);

    // Linear drive micro-coil + interlock lock pin syncing with closed shutter during lens change
    const linearCoil = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 2.5, 1.4, 0.3, 0.06, 'z'),
      mats.copperCoil
    );
    linearCoil.position.set(7.6, 0, 0.68);
    const lockPin = new THREE.Mesh(
      hiResCyl(0.45, 0.45, 2.0, 14).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    lockPin.position.set(10.8, 0, 0.68);
    g.add(ndTray, ndGlass, linearCoil, lockPin);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-internal-nd-shield-bay',
        150,
        '#06b6d4',
        g,
        new THREE.Vector3(0.0, -17.4, 9.6),
        new THREE.Vector3(12, -106, 108),
        cp
      )
    );
  }

  // =========================================================================
  // SH151. Anti-Sticking Non-Magnetic Isolation Shim (0.03-0.08 mm SUS304/BeCu) & Lapped Pole Face (MDPI Actuators 2025)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision U-shaped annealed permalloy stator yoke with mirror-lapped pole faces
    const yokeBack = new THREE.Mesh(
      createChamferedBoxGeo(9.4, 2.4, 2.6, 0.3, 0.08, 'z'),
      mats.softIronYoke
    );
    yokeBack.position.y = -3.2;
    for (const px of [-3.2, 3.2]) {
      const leg = new THREE.Mesh(
        createChamferedBoxGeo(2.6, 6.2, 2.4, 0.25, 0.06, 'z'),
        mats.softIronYoke
      );
      leg.position.set(px, 0.0, 0);
      // Mirror-lapped pole face cap (Ra < 0.05 um)
      const poleCap = new THREE.Mesh(
        createChamferedBoxGeo(2.55, 0.35, 2.35, 0.15, 0.03, 'z'),
        mats.stainlessMachined
      );
      poleCap.position.set(px, 3.22, 0);
      // 0.05 mm non-magnetic BeCu / SUS304 anti-sticking isolation shim foil hovering on pole face
      const nonMagShim = new THREE.Mesh(
        createChamferedBoxGeo(2.65, 0.22, 2.45, 0.15, 0.02, 'z'),
        mats.beCuSpring
      );
      nonMagShim.position.set(px, 3.68, 0);
      // Brass residual-break anti-sticking micro-pin seated in pole center
      const resPin = new THREE.Mesh(
        hiResCyl(0.32, 0.32, 0.72, 14),
        mats.brassGear
      );
      resPin.position.set(px, 3.6, 0);
      g.add(leg, poleCap, nonMagShim, resPin);
    }
    // Pure iron armature bar hovering cleanly above the isolation shims
    const armature = new THREE.Mesh(
      createChamferedBoxGeo(10.0, 1.45, 2.3, 0.25, 0.06, 'z'),
      mats.pureIronArmature
    );
    armature.position.set(0, 4.75, 0);
    g.add(yokeBack, armature);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-antistick-nonmag-shim',
        151,
        '#f97316',
        g,
        new THREE.Vector3(24.6, 13.8, 16.4),
        new THREE.Vector3(94, 108, 78),
        cp
      )
    );
  }

  // =========================================================================
  // SH152. Hybrid Electromagnet SmCo Temperature-Stable Bias Magnet & Magnetic Shunt Trim Screw (US3466993A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Hybrid magnetic housing containing a temperature-stable SmCo permanent magnet + threaded soft-iron shunt screw
    const yokeFrame = new THREE.Mesh(
      createChamferedBoxGeo(10.4, 7.2, 3.6, 0.6, 0.1, 'z'),
      mats.softIronYoke
    );
    const smcoBlock = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 4.4, 2.8, 0.3, 0.06, 'z'),
      mats.neodymiumMagnet
    );
    smcoBlock.position.set(-1.6, 0, 0.65);

    // Demag coil around opposing leg
    const demagCoil = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 4.8, 3.2, 0.35, 0.08, 'z'),
      mats.copperCoil
    );
    demagCoil.position.set(2.8, 0, 0.55);

    // Threaded soft-iron magnetic-flux shunt screw (adjusting air-gap bypass reluctance at factory!)
    const shuntBoss = new THREE.Mesh(
      hiResCyl(1.35, 1.35, 1.6, 20),
      mats.brassGear
    );
    shuntBoss.position.set(-1.6, 4.2, 0);
    const shuntScrew = new THREE.Mesh(
      hiResCyl(0.85, 0.85, 3.6, 18),
      mats.stainlessMachined
    );
    shuntScrew.position.set(-1.6, 4.8, 0);
    // Blue thread-lock bead sealing calibrated flux position
    const sealRing = new THREE.Mesh(
      hiResTorus(1.02, 0.2, 10, 20).rotateX(Math.PI / 2),
      mats.mountThreadLockBlue
    );
    sealRing.position.set(-1.6, 5.1, 0);
    g.add(yokeFrame, smcoBlock, demagCoil, shuntBoss, shuntScrew, sealRing);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-smco-bias-shunt-screw',
        152,
        '#2563eb',
        g,
        new THREE.Vector3(26.2, 9.2, 16.0),
        new THREE.Vector3(130, 94, 64),
        cp
      )
    );
  }

  // =========================================================================
  // SH153. Self-Bonding Enamel Micro-Coil Winding & Bobbin-Flange Wire-Routing Slit / Wrap Pins
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded LCP bobbin with upper/lower slotted flanges, heat-bonded multi-layer copper winding & gold wrap pins
    const topFlange = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.1, 6.2, 0.4, 0.06, 'z'),
      mats.mountPpsInsulator
    );
    topFlange.position.y = 3.2;
    const botFlange = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.1, 6.2, 0.4, 0.06, 'z'),
      mats.mountPpsInsulator
    );
    botFlange.position.y = -3.2;

    // Stacked bonded coil rings showing uniform orthocyclic layering
    for (let i = 0; i < 6; i++) {
      const layer = new THREE.Mesh(
        createChamferedBoxGeo(6.4, 0.78, 5.2, 0.6, 0.1, 'z'),
        mats.copperCoil
      );
      layer.position.y = -2.15 + i * 0.86;
      g.add(layer);
    }
    // Wire-routing guide notches + twin gold-plated terminal wrap pins with helical solder-lead wraps
    for (const px of [-2.4, 2.4]) {
      const pin = new THREE.Mesh(
        hiResCyl(0.32, 0.32, 3.2, 14).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      pin.position.set(px, -3.2, 3.9);
      const wrap = new THREE.Mesh(
        buildHelicalSpringGeo(0.46, 0.11, 4.5, 1.4, 6, 36).rotateX(Math.PI / 2),
        mats.copperCoil
      );
      wrap.position.set(px, -3.2, 4.2);
      g.add(pin, wrap);
    }
    g.add(topFlange, botFlange);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-self-bonding-coil-bobbin',
        153,
        '#c2410c',
        g,
        new THREE.Vector3(28.0, 5.4, 15.2),
        new THREE.Vector3(154, 64, 56),
        cp
      )
    );
  }

  // =========================================================================
  // SH154. Permanent-Magnet Rotor Direct-Drive Rotary Electromagnetic Actuator (CN101432952A / US7708478B2)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Open-ring dual-pole stator yoke + wound excitation coil + radially magnetized cylindrical PM rotor + direct drive fork
    const statorShape = new THREE.Shape();
    statorShape.absarc(0, 0, 5.4, 0.28, Math.PI * 2 - 0.28, false);
    statorShape.absarc(0, 0, 3.35, Math.PI * 2 - 0.28, 0.28, true);
    statorShape.closePath();
    const statorGeo = extrudeHiRes(statorShape, 2.2, 0.1, 0.1, 2, 28);
    statorGeo.translate(0, 0, -1.1);
    const stator = new THREE.Mesh(statorGeo, mats.softIronYoke);

    // Excitation drive coil wrapped around left bridge of stator
    const statorCoil = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 4.8, 3.2, 0.4, 0.1, 'z'),
      mats.copperCoil
    );
    statorCoil.position.set(-4.35, 0, 0);

    // Diametrically magnetized cylindrical permanent-magnet rotor (N/S split halves visually distinct!)
    const rotorN = new THREE.Mesh(
      new THREE.CylinderGeometry(2.55, 2.55, 2.4, 24, 1, false, 0, Math.PI).rotateX(Math.PI / 2),
      mats.gMasterRedBadge
    );
    const rotorS = new THREE.Mesh(
      new THREE.CylinderGeometry(2.55, 2.55, 2.4, 24, 1, false, Math.PI, Math.PI).rotateX(Math.PI / 2),
      mats.mountShimBlue
    );
    const pivotAxis = new THREE.Mesh(
      hiResCyl(0.7, 0.7, 4.2, 16).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    // Direct-coupled blade drive fork arm extending out from rotor
    const driveFork = new THREE.Mesh(
      createChamferedBoxGeo(7.5, 1.8, 0.55, 0.4, 0.05, 'z'),
      mats.linkArmSteel
    );
    driveFork.position.set(3.8, 0, 1.55);
    const forkPin = new THREE.Mesh(
      hiResCyl(0.48, 0.48, 1.4, 14).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    forkPin.position.set(6.9, 0, 2.05);
    g.add(stator, statorCoil, rotorN, rotorS, pivotAxis, driveFork, forkPin);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-rotary-pm-direct-actuator',
        154,
        '#e11d48',
        g,
        new THREE.Vector3(28.5, 0.2, 16.6),
        new THREE.Vector3(166, 28, 52),
        cp
      )
    );
  }

  // =========================================================================
  // SH155. Charge-Complete Auto-Decoupling Intermittent (Missing-Tooth) Sector Gear & Swing Clutch (JPO 2H081 CC14)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 24-slot gear wheel with 15 active teeth & 9-tooth missing-tooth dwell cutout for zero-drag release!
    const sectorShape = createIntermittentGearShape(5.2, 4.35, 24, 15, 1.25);
    const sectorGeo = extrudeHiRes(sectorShape, 1.45, 0.08, 0.08, 2, 24);
    sectorGeo.translate(0, 0, -0.725);
    const sectorGear = new THREE.Mesh(sectorGeo, mats.brassGear);

    // Pivoting planetary swing-clutch carrier arm & disengaging idler pinion
    const swingArm = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 2.4, 0.65, 0.5, 0.06, 'z'),
      mats.linkArmSteel
    );
    swingArm.position.set(3.4, -2.2, 1.15);
    swingArm.rotation.z = -0.52;

    const idlerShape = createIntermittentGearShape(2.4, 1.85, 12, 12, 0.6);
    const idlerGeo = extrudeHiRes(idlerShape, 1.35, 0.06, 0.06, 2, 18);
    idlerGeo.translate(0, 0, -0.675);
    const idlerGear = new THREE.Mesh(idlerGeo, mats.pomGear);
    idlerGear.position.set(6.4, -3.9, 0.0);

    const centerAxle = new THREE.Mesh(
      hiResCyl(1.15, 1.15, 3.6, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    const idlerAxle = new THREE.Mesh(
      hiResCyl(0.55, 0.55, 3.1, 14).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    idlerAxle.position.set(6.4, -3.9, 0.25);
    g.add(sectorGear, swingArm, idlerGear, centerAxle, idlerAxle);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-intermittent-clutch-gear',
        155,
        '#ca8a04',
        g,
        new THREE.Vector3(29.8, -5.8, 13.8),
        new THREE.Vector3(172, -8, 46),
        cp
      )
    );
  }

  return parts;
}
