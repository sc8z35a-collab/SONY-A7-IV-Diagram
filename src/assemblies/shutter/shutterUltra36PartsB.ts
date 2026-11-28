//@FLOW_MAP|file=src/assemblies/shutter/shutterUltra36PartsB.ts|unit=shutter|lines=1444|exports=buildShutterUltra36PartsB
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
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

/** Build a precision spur gear profile in XY */
function createGearShape(
  outerR: number,
  rootR: number,
  teeth: number,
  boreR: number
): THREE.Shape {
  const s = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.18;
    const a2 = a0 + step * 0.34;
    const a3 = a0 + step * 0.54;
    const a4 = a0 + step * 0.70;
    const p0x = Math.cos(a0) * rootR;
    const p0y = Math.sin(a0) * rootR;
    if (i === 0) s.moveTo(p0x, p0y);
    else s.lineTo(p0x, p0y);
    s.lineTo(Math.cos(a1) * rootR, Math.sin(a1) * rootR);
    s.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
    s.lineTo(Math.cos(a3) * outerR, Math.sin(a3) * outerR);
    s.lineTo(Math.cos(a4) * rootR, Math.sin(a4) * rootR);
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
 * Phase 36 Shutter Standalone Deep Forensic Ultra-Dissection — Part B (SH156–SH180, 25 parts).
 *
 * - Group H-2 (SH156–SH160): Wrap-Spring Clutch, TDC Detent, Motor Thrust, UV Tension Port & 2-Stage Blackout Cam
 * - Group I   (SH161–SH170): Eddy-Current/Wedge/Multi-Leaf/Squeeze-Film Braking & Fast Zener/PWM/4Ch Optical Electronics
 * - Group J   (SH171–SH180): HSS 50kHz Sync, Anti-Flicker Gate, Failsafe Cap, Sony ILCE-7M4 OEM & Factory Metrology
 */
export function buildShutterUltra36PartsB(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // SH156. One-Way Helical Wrap-Spring Clutch on Charge Drive Shaft (JPO 2H081 BB28 / CC14)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Split input/output hardened steel hubs + tightly wound square-wire helical wrap clutch spring + release tang
    const driveHub = new THREE.Mesh(
      hiResCyl(2.2, 2.2, 3.2, 24).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    driveHub.position.z = -1.75;
    const drivenHub = new THREE.Mesh(
      hiResCyl(2.2, 2.2, 3.2, 24).rotateX(Math.PI / 2),
      mats.brassGear
    );
    drivenHub.position.z = 1.75;
    const coreAxle = new THREE.Mesh(
      hiResCyl(0.95, 0.95, 8.2, 18).rotateX(Math.PI / 2),
      mats.linkArmSteel
    );
    // Tight helical wrap spring gripping across the hub seam
    const wrapSpring = new THREE.Mesh(
      buildHelicalSpringGeo(2.45, 0.28, 7.5, 5.2, 8, 96).rotateX(Math.PI / 2),
      mats.beCuSpring
    );
    // Control collar tang + outer bronze thrust stop ring
    const tangPin = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 0.72, 0.72, 0.15, 0.04, 'z'),
      mats.titaniumRivet
    );
    tangPin.position.set(3.2, 0, -2.5);
    const collarRing = new THREE.Mesh(hiResTorus(2.85, 0.25, 10, 26), mats.sinteredBronzeBushing);
    collarRing.position.z = 3.2;
    g.add(driveHub, drivenHub, coreAxle, wrapSpring, tangPin, collarRing);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-oneway-wrap-spring-clutch',
        156,
        '#d97706',
        g,
        new THREE.Vector3(31.2, 3.2, 11.8),
        new THREE.Vector3(162, 66, 14),
        cp
      )
    );
  }

  // =========================================================================
  // SH157. Charge-Cam Top-Dead-Center (TDC) Toggle Detent Spring & Release-Assist Claw (JPO 2H081 CC15-CC16)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heart-lobe cam disk with recessed TDC detent valley + pivoted spring-loaded toggle rocker & assist claw
    const camShape = new THREE.Shape();
    camShape.absarc(0, 0, 4.2, 0, Math.PI * 2, false);
    const camGeo = extrudeHiRes(camShape, 1.15, 0.08, 0.08, 2, 28);
    camGeo.translate(0, 0, -0.575);
    const camDisk = new THREE.Mesh(camGeo, mats.brassGear);
    camDisk.scale.set(1.12, 0.92, 1);

    // TDC detent notch pin + spring-biased toggle rocker lever
    const detentRoller = new THREE.Mesh(
      hiResCyl(0.85, 0.85, 1.35, 18).rotateX(Math.PI / 2),
      mats.siliconNitrideBall
    );
    detentRoller.position.set(0, 4.15, 0);
    const toggleLever = new THREE.Mesh(
      createChamferedBoxGeo(8.8, 1.65, 0.62, 0.4, 0.05, 'z'),
      mats.linkArmSteel
    );
    toggleLever.position.set(3.5, 4.65, 0.65);
    toggleLever.rotation.z = -0.14;
    // Release-assist kick claw extending downward
    const assistClaw = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 4.8, 0.62, 0.35, 0.05, 'z'),
      mats.titaniumRivet
    );
    assistClaw.position.set(7.2, 2.3, 0.65);
    assistClaw.rotation.z = 0.24;

    const detentSpring = new THREE.Mesh(
      buildHelicalSpringGeo(0.75, 0.16, 6.0, 4.2, 6, 48),
      mats.beCuSpring
    );
    detentSpring.position.set(4.5, 7.2, 0.65);
    g.add(camDisk, detentRoller, toggleLever, assistClaw, detentSpring);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-cam-deadpoint-detent',
        157,
        '#0ea5e9',
        g,
        new THREE.Vector3(31.8, -1.5, 11.0),
        new THREE.Vector3(174, 28, 10),
        cp
      )
    );
  }

  // =========================================================================
  // SH158. Charge-Motor Sintered Helical Pinion, SUS Elastic Clamp & Sapphire End-Play Thrust Ball
  // =========================================================================
  {
    const g = new THREE.Group();
    // Motor rotor shaft + press-fit sintered helical pinion + U-shaped SUS spring clamp + rear sapphire thrust sphere
    const shaft = new THREE.Mesh(
      hiResCyl(0.72, 0.72, 11.4, 18),
      mats.stainlessMachined
    );
    const pinionShape = createGearShape(2.1, 1.55, 11, 0.68);
    const pinionGeo = extrudeHiRes(pinionShape, 2.6, 0.06, 0.06, 2, 18);
    pinionGeo.rotateX(Math.PI / 2);
    pinionGeo.translate(0, 4.1, 0);
    const pinion = new THREE.Mesh(pinionGeo, mats.brassGear);

    // Sintered bronze front bearing sleeve
    const frontBearing = new THREE.Mesh(
      hiResCyl(1.65, 1.65, 1.8, 20),
      mats.sinteredBronzeBushing
    );
    frontBearing.position.y = 0.8;

    // Stamped SUS301 elastic retention clip saddle cradling the motor barrel
    const clampArc = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 3.6, 24, 1, true, -Math.PI * 0.65, Math.PI * 1.3),
      mats.midPlateSteel
    );
    clampArc.position.y = -1.6;
    for (const sx of [-3.9, 3.9]) {
      const ear = new THREE.Mesh(
        createChamferedBoxGeo(1.6, 3.4, 0.55, 0.25, 0.04, 'z'),
        mats.midPlateSteel
      );
      ear.position.set(sx, -1.6, -1.5);
      g.add(ear);
    }

    // Rear ceramic/sapphire anti-endplay thrust ball + preload leaf seat
    const thrustCup = new THREE.Mesh(hiResCyl(1.5, 1.5, 0.7, 18), mats.shutterChassis);
    thrustCup.position.y = -5.4;
    const thrustBall = new THREE.Mesh(hiResSphere(0.78, 18, 14), mats.siliconNitrideBall);
    thrustBall.position.y = -6.0;
    const leafPreload = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 0.25, 1.8, 0.2, 0.03, 'z'),
      mats.beCuSpring
    );
    leafPreload.position.y = -6.82;
    g.add(shaft, pinion, frontBearing, clampArc, thrustCup, thrustBall, leafPreload);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-motor-pinion-sapphire-thrust',
        158,
        '#6366f1',
        g,
        new THREE.Vector3(33.2, -9.2, 10.6),
        new THREE.Vector3(176, -12, 4),
        cp
      )
    );
  }

  // =========================================================================
  // SH159. Factory Curtain-Tension Worm Access Port & UV-Cured Acrylic Lock-Resin Seal (JPO 2H081 EE02)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Keyed side-chassis adjustment window plate exposing twin tension worm heads sealed with blue/amber UV lock resin
    const portPlate = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 6.4, 0.95, 0.7, 0.08, 'z'),
      mats.shutterChassis
    );
    g.add(portPlate);

    for (const [wx, matSeal] of [
      [-2.8, mats.mountThreadLockBlue],
      [2.8, mats.makeupSealViolet],
    ] as Array<[number, THREE.Material]>) {
      const bezel = new THREE.Mesh(hiResTorus(1.85, 0.28, 12, 24), mats.stainlessMachined);
      bezel.position.set(wx, 0, 0.52);
      const wormHead = new THREE.Mesh(
        hiResCyl(1.35, 1.35, 1.4, 20).rotateX(Math.PI / 2),
        mats.brassGear
      );
      wormHead.position.set(wx, 0, 0.25);
      // Keyed driver slot across worm head
      const slotBar = new THREE.Mesh(
        createChamferedBoxGeo(2.2, 0.42, 0.45, 0.06, 0.02, 'z'),
        mats.shutterChassis
      );
      slotBar.position.set(wx, 0, 0.96);
      // Translucent UV-cured calibration tamper-seal droplet locking the worm screw
      const uvDrop = new THREE.Mesh(hiResSphere(0.95, 16, 12), matSeal);
      uvDrop.scale.set(1.25, 0.85, 0.48);
      uvDrop.position.set(wx + 0.72, 0.65, 1.05);
      g.add(bezel, wormHead, slotBar, uvDrop);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-uv-sealed-tension-port',
        159,
        '#7c3aed',
        g,
        new THREE.Vector3(27.5, 12.6, 11.4),
        new THREE.Vector3(158, 76, -28),
        cp
      )
    );
  }

  // =========================================================================
  // SH160. Mirrorless Blackout-Reduction 2-Stage Curtain-Prep Cam & Independent 2nd Drive Levers (US10775680B2)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual-level coaxial prep cam driving independent 2nd front-curtain lever (286A2) & 2nd rear-curtain lever (286B2)
    const prepHub = new THREE.Mesh(
      hiResCyl(2.1, 2.1, 4.4, 22).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    const camStage1 = new THREE.Mesh(
      hiResCyl(3.8, 3.8, 0.85, 24).rotateX(Math.PI / 2),
      mats.brassGear
    );
    camStage1.scale.set(1.22, 0.86, 1);
    camStage1.position.z = -1.1;

    const camStage2 = new THREE.Mesh(
      hiResCyl(3.6, 3.6, 0.85, 24).rotateX(Math.PI / 2),
      mats.cinnabarAnodized
    );
    camStage2.scale.set(1.25, 0.82, 1);
    camStage2.rotation.z = 0.85; // Staggered continuous-shooting phase overlap!
    camStage2.position.z = 1.1;

    // 2nd front-curtain drive lever (286A2) & delayed lock release pawl
    const lever286A2 = new THREE.Mesh(
      createChamferedBoxGeo(10.5, 1.9, 0.55, 0.45, 0.05, 'z'),
      mats.linkArmSteel
    );
    lever286A2.position.set(4.4, 2.8, -1.1);
    lever286A2.rotation.z = 0.25;

    const lever286B2 = new THREE.Mesh(
      createChamferedBoxGeo(10.2, 1.9, 0.55, 0.45, 0.05, 'z'),
      mats.midPlateSteel
    );
    lever286B2.position.set(4.4, -2.8, 1.1);
    lever286B2.rotation.z = -0.25;

    g.add(prepHub, camStage1, camStage2, lever286A2, lever286B2);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-blackout-2stage-prep-cam',
        160,
        '#ec4899',
        g,
        new THREE.Vector3(28.0, 5.2, 10.2),
        new THREE.Vector3(170, 38, -32),
        cp
      )
    );
  }

  // =========================================================================
  // SH161. Non-Contact Self-Damping Eddy-Current Magnetic Braking Module (US10133153B2 / JP6511143B2)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual opposing Halbach N/S permanent-magnet stator banks + plunging pure-copper eddy-current mover blade
    for (const mz of [-2.2, 2.2]) {
      const backIron = new THREE.Mesh(
        createChamferedBoxGeo(11.0, 4.6, 0.85, 0.35, 0.06, 'z'),
        mats.softIronYoke
      );
      backIron.position.set(0, 0, mz * 1.18);
      g.add(backIron);

      for (let i = 0; i < 4; i++) {
        const mag = new THREE.Mesh(
          createChamferedBoxGeo(2.35, 3.8, 1.05, 0.2, 0.04, 'z'),
          i % 2 === 0 ? mats.gMasterRedBadge : mats.mountShimBlue
        );
        mag.position.set(-3.75 + i * 2.5, 0, mz * 0.62);
        g.add(mag);
      }
    }
    // High-conductivity oxygen-free copper mover vane gliding inside the magnetic air gap (zero contact wear!)
    const copperMover = new THREE.Mesh(
      createChamferedBoxGeo(13.6, 3.4, 0.72, 0.35, 0.06, 'z'),
      mats.copperHeatSpreader
    );
    copperMover.position.set(1.8, 0, 0);
    // Actuation clevis linkage eye
    const clevis = new THREE.Mesh(
      hiResCyl(0.75, 0.75, 1.6, 16).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    clevis.position.set(7.6, 0, 0);
    g.add(copperMover, clevis);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-eddy-current-self-brake',
        161,
        '#dc2626',
        g,
        new THREE.Vector3(29.0, -11.5, 15.8),
        new THREE.Vector3(164, -46, 48),
        cp
      )
    );
  }

  // =========================================================================
  // SH162. Self-Locking 12-Deg Tapered Wedge Friction Brake Shoe (JPO 2H081 BB38)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Fixed hardened wedge ramp housing + sliding bronze/PTFE friction wedge shoe + preload coil spring
    const housing = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 6.2, 2.2, 0.5, 0.08, 'z'),
      mats.shutterChassis
    );
    housing.position.y = -1.6;

    // 12-deg tapered wedge shoe geometry
    const wedgeShape = new THREE.Shape();
    wedgeShape.moveTo(-4.8, -0.9);
    wedgeShape.lineTo(4.8, -0.9);
    wedgeShape.lineTo(4.8, 0.3);
    wedgeShape.lineTo(-4.8, 2.15);
    wedgeShape.closePath();
    const wedgeGeo = extrudeHiRes(wedgeShape, 1.75, 0.08, 0.08, 2, 16);
    wedgeGeo.translate(0, 0, -0.875);
    const wedgeShoe = new THREE.Mesh(wedgeGeo, mats.sinteredBronzeBushing);
    wedgeShoe.position.set(-0.4, 1.9, 0);

    // Sintered friction pad facing the upper curtain arm striker
    const fricPad = new THREE.Mesh(
      createChamferedBoxGeo(8.8, 0.55, 1.55, 0.15, 0.03, 'z'),
      mats.butylDamperRubber
    );
    fricPad.position.set(-0.4, 2.45, 0);
    fricPad.rotation.z = -0.19;

    // Wedge return/preload coil spring
    const wedgeSpring = new THREE.Mesh(
      buildHelicalSpringGeo(0.85, 0.18, 5.5, 3.8, 6, 48).rotateZ(Math.PI / 2),
      mats.beCuSpring
    );
    wedgeSpring.position.set(6.4, 0.8, 0);
    g.add(housing, wedgeShoe, fricPad, wedgeSpring);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-wedge-friction-brake',
        162,
        '#b45309',
        g,
        new THREE.Vector3(24.5, -14.8, 16.2),
        new THREE.Vector3(144, -80, 56),
        cp
      )
    );
  }

  // =========================================================================
  // SH163. Multi-Leaf Stacked Coulomb Inter-Leaf Friction Rebound Damper (JPO 2H081 BB39)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Anchor clamp block + 4 staggered-length phosphor-bronze / SUS301 leaf springs rubbing together under deflection
    const clampBlock = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 4.4, 2.6, 0.35, 0.06, 'z'),
      mats.shutterChassis
    );
    clampBlock.position.set(-5.8, 0, 0);
    const clampBolt = new THREE.Mesh(
      hiResCyl(0.75, 0.75, 3.2, 16).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    clampBolt.position.set(-5.8, 0, 0);

    const leafLengths = [12.4, 10.2, 8.2, 6.2];
    for (let i = 0; i < leafLengths.length; i++) {
      const len = leafLengths[i];
      const leaf = new THREE.Mesh(
        createChamferedBoxGeo(len, 0.34, 2.2, 0.12, 0.03, 'z'),
        i % 2 === 0 ? mats.beCuSpring : mats.midPlateSteel
      );
      leaf.position.set(-5.8 + len * 0.5, 1.35 - i * 0.52, 0);
      leaf.rotation.z = -0.04 * i;
      g.add(leaf);
    }
    // Elastomer striker bumper tip on master top leaf
    const tipPad = new THREE.Mesh(
      hiResCyl(0.85, 0.85, 2.2, 16).rotateX(Math.PI / 2),
      mats.damperElastomer
    );
    tipPad.position.set(6.4, 1.45, 0);
    g.add(clampBlock, clampBolt, tipPad);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-multileaf-coulomb-damper',
        163,
        '#059669',
        g,
        new THREE.Vector3(17.5, -16.2, 15.8),
        new THREE.Vector3(112, -104, 66),
        cp
      )
    );
  }

  // =========================================================================
  // SH164. Blade-Pocket Squeeze-Film Pneumatic Cushion Chamber & Calibrated Micro-Orifice Vents (JP2015219517A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision machined shallow air-compression pocket housing with calibrated bleed orifices & baffle fins
    const pocketBody = new THREE.Mesh(
      createChamferedBoxGeo(18.0, 5.2, 1.4, 0.55, 0.08, 'z'),
      mats.shutterChassis
    );
    const cavityRecess = new THREE.Mesh(
      createChamferedBoxGeo(15.6, 3.6, 0.75, 0.35, 0.04, 'z'),
      mats.midPlateSteel
    );
    cavityRecess.position.z = 0.42;

    // 5 calibrated micro-orifice brass bleed nozzles + aerodynamic flow-straightening ribs
    for (let i = 0; i < 5; i++) {
      const ox = -6.0 + i * 3.0;
      const nozzle = new THREE.Mesh(
        hiResCyl(0.55, 0.55, 1.85, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      nozzle.position.set(ox, 2.2, 0.1);
      const orificeBore = new THREE.Mesh(
        hiResCyl(0.24, 0.24, 1.95, 12).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      orificeBore.position.set(ox, 2.2, 0.12);
      const guideFin = new THREE.Mesh(
        createChamferedBoxGeo(0.32, 3.1, 0.55, 0.08, 0.02, 'z'),
        mats.linkArmSteel
      );
      guideFin.position.set(ox, -0.1, 0.85);
      g.add(nozzle, orificeBore, guideFin);
    }
    g.add(pocketBody, cavityRecess);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-squeeze-film-air-pocket',
        164,
        '#0284c7',
        g,
        new THREE.Vector3(2.0, -16.8, 14.4),
        new THREE.Vector3(74, -116, 76),
        cp
      )
    );
  }

  // =========================================================================
  // SH165. Brass-Core U-Slotted Dual-Stiffness Elastomer Impact Ring (JP2015219517A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Two stepped eccentric damper rings showcasing crescent U-cavity (Stage 1 soft flex -> Stage 2 solid arrest)
    for (const [rx, ry] of [
      [-3.2, 0],
      [3.2, 0],
    ]) {
      const ringShape = new THREE.Shape();
      ringShape.absarc(0, 0, 2.65, 0, Math.PI * 2, false);
      const bore = new THREE.Path();
      bore.absarc(0, 0, 1.25, 0, Math.PI * 2, true);
      ringShape.holes.push(bore);
      // Crescent U-slot relief cutout on impact face creating dual-stage spring rate
      const uSlot = new THREE.Path();
      uSlot.absarc(0, 0, 2.15, 0.45, Math.PI - 0.45, false);
      uSlot.absarc(0, 0, 1.68, Math.PI - 0.45, 0.45, true);
      uSlot.closePath();
      ringShape.holes.push(uSlot);
      const ringGeo = extrudeHiRes(ringShape, 2.6, 0.1, 0.1, 2, 24);
      ringGeo.translate(0, 0, -1.3);
      const elastRing = new THREE.Mesh(ringGeo, mats.butylDamperRubber);
      elastRing.position.set(rx, ry, 0);

      // Inner brass reinforcement sleeve + stainless mounting stud
      const brassCore = new THREE.Mesh(
        hiResCyl(1.22, 1.22, 3.1, 20).rotateX(Math.PI / 2),
        mats.brassGear
      );
      brassCore.position.set(rx, ry, 0);
      const stud = new THREE.Mesh(
        hiResCyl(0.68, 0.68, 4.0, 16).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      stud.position.set(rx, ry, 0);
      g.add(elastRing, brassCore, stud);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-slotted-elastomer-ring',
        165,
        '#16a34a',
        g,
        new THREE.Vector3(-12.5, -16.5, 14.8),
        new THREE.Vector3(34, -120, 82),
        cp
      )
    );
  }

  // =========================================================================
  // SH166. Ultra-Fast Zener / TVS Active-Clamp Flyback Snubber Stage (24-33V, <140 us Turn-Off, TI SLVAE59)
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-density shutter driver sub-PCB carrying dual 28V TVS/Zener diodes, ultra-fast Schottky rectifiers & drain MOSFETs
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 6.8, 0.9, 0.5, 0.06, 'z'),
      mats.hdiMainboardPcb
    );
    g.add(pcb);

    // Dual SOD-123/SMA 28V Zener + UF4007 fast-recovery diode pairs with cathode silver bands
    for (const [dx, dy] of [
      [-3.4, 1.4],
      [-3.4, -1.4],
      [1.4, 1.4],
      [1.4, -1.4],
    ]) {
      const body = new THREE.Mesh(
        createChamferedBoxGeo(2.6, 1.4, 1.05, 0.15, 0.05, 'z'),
        mats.icEpoxy
      );
      body.position.set(dx, dy, 0.95);
      const cathodeBand = new THREE.Mesh(
        createChamferedBoxGeo(0.45, 1.44, 1.08, 0.05, 0.02, 'z'),
        mats.solderBallSilver
      );
      cathodeBand.position.set(dx + 0.85, dy, 0.96);
      for (const sx of [-1.45, 1.45]) {
        const pad = new THREE.Mesh(
          createChamferedBoxGeo(0.65, 1.15, 0.4, 0.08, 0.02, 'z'),
          mats.goldPlating
        );
        pad.position.set(dx + sx, dy, 0.62);
        g.add(pad);
      }
      g.add(body, cathodeBand);
    }
    // Power N-MOSFET switch package on right side with copper thermal drain pad
    const mosfet = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 3.6, 0.95, 0.18, 0.05, 'z'),
      mats.icEpoxy
    );
    mosfet.position.set(4.8, 0, 0.92);
    const drainPad = new THREE.Mesh(
      createChamferedBoxGeo(3.4, 4.4, 0.18, 0.2, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    drainPad.position.set(4.8, 0, 0.5);
    g.add(mosfet, drainPad);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-zener-active-flyback',
        166,
        '#2563eb',
        g,
        new THREE.Vector3(31.5, -13.2, 11.4),
        new THREE.Vector3(162, -48, 6),
        cp
      )
    );
  }

  // =========================================================================
  // SH167. Bulb Long-Exposure Peak-&-Hold Low-Duty PWM Current Chopper Stage (US4949215A / 2H081 CC69)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dedicated peak-and-hold PWM controller IC + shielded buck inductor + precision current-sense shunt resistor
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(13.0, 6.8, 0.88, 0.5, 0.06, 'z'),
      mats.hdiMainboardPcb
    );
    const pwmIc = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 3.6, 0.95, 0.2, 0.05, 'z'),
      mats.icEpoxy
    );
    pwmIc.position.set(-2.6, 0, 0.92);
    const inductor = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 3.2, 1.75, 0.35, 0.08, 'z'),
      mats.ferriteInductor
    );
    inductor.position.set(2.2, 0.6, 1.32);
    const bulkCap = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 1.4, 1.1, 0.12, 0.04, 'z'),
      mats.tantalumCapYellow
    );
    bulkCap.position.set(2.2, -1.9, 1.0);
    // Low-ohm Kelvin sense shunt bar (50 mOhm)
    const senseBar = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 3.0, 0.55, 0.1, 0.03, 'z'),
      mats.solderBallSilver
    );
    senseBar.position.set(5.1, 0, 0.72);
    g.add(pcb, pwmIc, inductor, bulkCap, senseBar);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-pwm-bulb-hold-chopper',
        167,
        '#0d9488',
        g,
        new THREE.Vector3(27.5, -16.8, 11.0),
        new THREE.Vector3(142, -84, 12),
        cp
      )
    );
  }

  // =========================================================================
  // SH168. Charge-Motor Instant-Stop Low-Side Dynamic Short-Circuit Brake FET & Stall-Detect Stage (JPO 2H081 BB37)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual low-Rds(on) dynamic-brake MOSFET bridge + stall-detection sense resistor + thermal copper busbars
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(12.8, 6.6, 0.88, 0.5, 0.06, 'z'),
      mats.hdiMainboardPcb
    );
    g.add(pcb);

    for (const fx of [-3.6, 0.4]) {
      const fet = new THREE.Mesh(
        createChamferedBoxGeo(3.0, 3.8, 0.95, 0.2, 0.05, 'z'),
        mats.icEpoxy
      );
      fet.position.set(fx, 0.4, 0.92);
      const bus = new THREE.Mesh(
        createChamferedBoxGeo(3.2, 0.95, 0.35, 0.1, 0.02, 'z'),
        mats.copperHeatSpreader
      );
      bus.position.set(fx, -2.15, 0.62);
      g.add(fet, bus);
    }
    // Precision ceramic stall-current shunt + comparator IC
    const shunt = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 1.5, 0.75, 0.12, 0.04, 'z'),
      mats.ceramicAlumina
    );
    shunt.position.set(4.2, 1.2, 0.82);
    const compIc = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 2.0, 0.72, 0.12, 0.04, 'z'),
      mats.icEpoxy
    );
    compIc.position.set(4.2, -1.3, 0.8);
    g.add(shunt, compIc);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-motor-dynamic-brake-fet',
        168,
        '#dc2626',
        g,
        new THREE.Vector3(21.0, -17.8, 10.6),
        new THREE.Vector3(108, -108, 20),
        cp
      )
    );
  }

  // =========================================================================
  // SH169. 4-Channel Independent Start/End Hooded IR Photoreflector Array & Onboard SMD Sub-PCB (Nikon F5/F6 Monitor)
  // =========================================================================
  {
    const g = new THREE.Group();
    // L-shaped rigid-flex telemetry sub-PCB mounting 4 hooded 940 nm photoreflectors (1st-S, 1st-E, 2nd-S, 2nd-E) + SMD passives
    const subPcb = new THREE.Mesh(
      createChamferedBoxGeo(16.2, 5.2, 0.72, 0.45, 0.05, 'z'),
      mats.polyimideFpc
    );
    const stiffener = new THREE.Mesh(
      createChamferedBoxGeo(16.0, 5.0, 0.45, 0.4, 0.04, 'z'),
      mats.midPlateSteel
    );
    stiffener.position.z = -0.58;
    g.add(subPcb, stiffener);

    for (let i = 0; i < 4; i++) {
      const px = -5.7 + i * 3.8;
      // Optical-isolation black hood housing dual emitter/detector wells
      const hood = new THREE.Mesh(
        createChamferedBoxGeo(2.6, 2.4, 1.65, 0.2, 0.05, 'z'),
        mats.matteBlackAnodized
      );
      hood.position.set(px, 0.65, 1.18);
      const irLed = new THREE.Mesh(hiResSphere(0.42, 12, 10), mats.irLedLens);
      irLed.position.set(px - 0.52, 0.65, 2.02);
      const photoTr = new THREE.Mesh(hiResSphere(0.42, 12, 10), mats.evfIrEmitter);
      photoTr.position.set(px + 0.52, 0.65, 2.02);
      // Onboard 0402 SMD current-limiting resistor + decouple cap per channel
      const smdR = new THREE.Mesh(
        createChamferedBoxGeo(0.95, 0.55, 0.38, 0.06, 0.02, 'z'),
        mats.smdCeramic
      );
      smdR.position.set(px - 0.55, -1.45, 0.55);
      const smdC = new THREE.Mesh(
        createChamferedBoxGeo(0.95, 0.55, 0.38, 0.06, 0.02, 'z'),
        mats.tantalumCapYellow
      );
      smdC.position.set(px + 0.55, -1.45, 0.55);
      g.add(hood, irLed, photoTr, smdR, smdC);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-4ch-start-end-optical',
        169,
        '#9333ea',
        g,
        new THREE.Vector3(10.0, -17.6, 13.0),
        new THREE.Vector3(70, -120, 26),
        cp
      )
    );
  }

  // =========================================================================
  // SH170. Shutter FPC 0.3 mm Staggered Dual-Row ENIG Gold Fingers, Ear-Lock ZIF Notches & Tear-Stop Pads
  // =========================================================================
  {
    const g = new THREE.Group();
    // Polyimide flex tail with ear-lock retention shoulders, PI stiffener, tear-stop copper arcs & 16 staggered gold fingers
    const flexShape = new THREE.Shape();
    flexShape.moveTo(-6.2, -2.8);
    flexShape.lineTo(2.4, -2.8);
    flexShape.lineTo(2.4, -3.55); // Lower ZIF ear-lock notch
    flexShape.lineTo(4.0, -3.55);
    flexShape.lineTo(4.0, -2.65);
    flexShape.lineTo(7.4, -2.65);
    flexShape.lineTo(7.4, 2.65);
    flexShape.lineTo(4.0, 2.65);
    flexShape.lineTo(4.0, 3.55); // Upper ZIF ear-lock notch
    flexShape.lineTo(2.4, 3.55);
    flexShape.lineTo(2.4, 2.8);
    flexShape.lineTo(-6.2, 2.8);
    flexShape.closePath();
    const flexGeo = extrudeHiRes(flexShape, 0.26, 0.03, 0.03, 2, 16);
    flexGeo.translate(0, 0, -0.13);
    const flexTail = new THREE.Mesh(flexGeo, mats.polyimideFpc);

    // Blue polyimide ZIF insertion stiffener backing
    const stiffener = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 5.1, 0.32, 0.25, 0.03, 'z'),
      mats.mountShimBlue
    );
    stiffener.position.set(4.5, 0, -0.28);

    // 14 staggered 0.3 mm pitch ENIG gold contact fingers
    for (let i = 0; i < 14; i++) {
      const fy = -2.28 + i * 0.35;
      const staggerX = i % 2 === 0 ? 5.65 : 4.95;
      const finger = new THREE.Mesh(
        createChamferedBoxGeo(2.5, 0.2, 0.14, 0.03, 0.01, 'z'),
        mats.goldPlating
      );
      finger.position.set(staggerX, fy, 0.18);
      g.add(finger);
    }
    // Tear-stop reinforcement copper pads at neck transition corners
    for (const ty of [-2.45, 2.45]) {
      const tearPad = new THREE.Mesh(
        hiResCyl(0.72, 0.72, 0.34, 16).rotateX(Math.PI / 2),
        mats.copperHeatSpreader
      );
      tearPad.position.set(1.65, ty, 0.06);
      g.add(tearPad);
    }
    g.add(flexTail, stiffener);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-fpc-staggered-zif-tearstop',
        170,
        '#f59e0b',
        g,
        new THREE.Vector3(24.5, -18.2, 12.6),
        new THREE.Vector3(28, -122, 30),
        cp
      )
    );
  }

  // =========================================================================
  // SH171. High-Speed Sync (HSS / FP Flash) 20-50 kHz Slit-Tracking Pulse Modulator
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-speed sync logic bridge & optical-slit timing gate PCB commanding 50 kHz external flash IGBT bursts
    const board = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 6.8, 0.9, 0.5, 0.06, 'z'),
      mats.hdiMainboardPcb
    );
    const syncMcu = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 4.2, 0.95, 0.2, 0.05, 'z'),
      mats.icEpoxy
    );
    syncMcu.position.set(-2.4, 0, 0.92);
    // High-precision 48 MHz TCXO crystal oscillator for microsecond slit phase lock
    const xtal = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.0, 0.85, 0.15, 0.04, 'z'),
      mats.solderBallSilver
    );
    xtal.position.set(2.6, 1.4, 0.88);
    // Pulse-train hot-shoe isolation buffer & gold sync bus pins
    const bufferIc = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 2.0, 0.8, 0.14, 0.04, 'z'),
      mats.icEpoxy
    );
    bufferIc.position.set(2.6, -1.4, 0.85);
    for (let i = 0; i < 4; i++) {
      const pin = new THREE.Mesh(
        hiResCyl(0.28, 0.28, 1.8, 12).rotateZ(Math.PI / 2),
        mats.goldPlating
      );
      pin.position.set(6.8, -1.8 + i * 1.2, 0.2);
      g.add(pin);
    }
    g.add(board, syncMcu, xtal, bufferIc);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-hss-fp-50khz-sync',
        171,
        '#f59e0b',
        g,
        new THREE.Vector3(-4.0, -18.0, 12.2),
        new THREE.Vector3(-16, -118, 44),
        cp
      )
    );
  }

  // =========================================================================
  // SH172. High-Frequency Anti-Flicker (100/120 Hz & LED PWM 1/50.1 s) Microsecond Release-Delay Gate
  // =========================================================================
  {
    const g = new THREE.Group();
    // Phase-locked flicker-timing comparator module syncing mechanical curtain launch to ambient LED/AC luminance peaks
    const board = new THREE.Mesh(
      createChamferedBoxGeo(12.8, 6.8, 0.88, 0.5, 0.06, 'z'),
      mats.hdiMainboardPcb
    );
    // Dedicated flicker-phase photodiode lens window + PLL timing ASIC
    const sensorCan = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 3.2, 1.35, 0.3, 0.06, 'z'),
      mats.emiShieldCan
    );
    sensorCan.position.set(-3.4, 0, 1.12);
    const sensorLens = new THREE.Mesh(hiResSphere(0.95, 16, 12), mats.microlensGlass);
    sensorLens.position.set(-3.4, 0, 1.85);
    const pllAsic = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 4.0, 0.95, 0.2, 0.05, 'z'),
      mats.icEpoxy
    );
    pllAsic.position.set(1.8, 0, 0.92);
    // Microsecond fractional-step timing trim bus
    for (let i = 0; i < 3; i++) {
      const cap = new THREE.Mesh(
        createChamferedBoxGeo(1.0, 0.65, 0.52, 0.06, 0.02, 'z'),
        mats.smdCeramic
      );
      cap.position.set(5.1, -1.6 + i * 1.6, 0.7);
      g.add(cap);
    }
    g.add(board, sensorCan, sensorLens, pllAsic);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-hf-antiflicker-gate',
        172,
        '#06b6d4',
        g,
        new THREE.Vector3(-15.5, -17.6, 12.6),
        new THREE.Vector3(-58, -112, 56),
        cp
      )
    );
  }

  // =========================================================================
  // SH173. Power-Loss / Brown-Out Failsafe Emergency Curtain-Retract Supercapacitor & Lock Stage (JPO 2H081 CC71-CC78)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual cylindrical EDLC backup supercapacitors + brown-out supervisor IC + Schottky OR-ing isolation diode
    const carrier = new THREE.Mesh(
      createChamferedBoxGeo(13.6, 7.2, 0.85, 0.5, 0.06, 'z'),
      mats.hdiMainboardPcb
    );
    g.add(carrier);

    for (const cx of [-3.6, 0.6]) {
      const superCap = new THREE.Mesh(
        hiResCyl(1.75, 1.75, 4.8, 22),
        mats.bodyBatteryCell
      );
      superCap.position.set(cx, 0.2, 2.4);
      superCap.rotation.x = Math.PI / 2;
      const capTop = new THREE.Mesh(
        hiResCyl(1.45, 1.45, 0.25, 20).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      capTop.position.set(cx, 0.2, 4.85);
      g.add(superCap, capTop);
    }
    const bodIc = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.8, 0.85, 0.18, 0.04, 'z'),
      mats.icEpoxy
    );
    bodIc.position.set(4.5, 1.2, 0.88);
    const orDiode = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 1.4, 0.82, 0.12, 0.04, 'z'),
      mats.tantalumCapYellow
    );
    orDiode.position.set(4.5, -1.6, 0.85);
    g.add(bodIc, orDiode);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-powerfail-safety-cap',
        173,
        '#10b981',
        g,
        new THREE.Vector3(-23.5, -15.5, 11.4),
        new THREE.Vector3(-98, -94, 66),
        cp
      )
    );
  }

  // =========================================================================
  // SH174. Sony OEM Magnetic Field Cut Plate (ILCE-7M4 Ref.352: 502789501 MAGNETIC FIELD CUT PLATE (891))
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stamped high-permeability mu-metal / permalloy L-profile magnetic shield separating shutter solenoids from SY-1122 board
    const plateShape = new THREE.Shape();
    plateShape.moveTo(-7.5, -6.2);
    plateShape.lineTo(7.5, -6.2);
    plateShape.lineTo(7.5, 1.8);
    plateShape.lineTo(2.4, 1.8);
    plateShape.lineTo(2.4, 6.2);
    plateShape.lineTo(-7.5, 6.2);
    plateShape.closePath();
    for (const [hx, hy] of [
      [-5.8, 4.5],
      [5.8, -4.5],
      [-5.8, -4.5],
    ]) {
      const h = new THREE.Path();
      h.absarc(hx, hy, 0.85, 0, Math.PI * 2, true);
      plateShape.holes.push(h);
    }
    const plateGeo = extrudeHiRes(plateShape, 0.48, 0.05, 0.05, 2, 16);
    plateGeo.translate(0, 0, -0.24);
    const magCutPlate = new THREE.Mesh(plateGeo, mats.lensPermalloyShield);

    // Embossed stiffening bead + insulating black PET sheet on mainboard-facing back side
    const petInsul = new THREE.Mesh(
      createChamferedBoxGeo(12.2, 6.2, 0.18, 0.35, 0.02, 'z'),
      mats.mylarInsulatorFilm
    );
    petInsul.position.set(0, -2.2, -0.38);
    const groundDimple = new THREE.Mesh(
      hiResCyl(1.1, 1.35, 0.55, 18).rotateX(Math.PI / 2),
      mats.copperHeatSpreader
    );
    groundDimple.position.set(-2.5, 2.2, 0.38);
    g.add(magCutPlate, petInsul, groundDimple);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-oem-mag-cut-plate',
        174,
        '#475569',
        g,
        new THREE.Vector3(-25.6, -7.8, 9.2),
        new THREE.Vector3(-124, -64, 58),
        cp
      )
    );
  }

  // =========================================================================
  // SH175. Sony OEM Non-Reusable Imager/Shutter Optical-Axis Fix Shaft (Ref.501: 459775001 IM IMAGER FIX SHAFT)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Triad of precision-ground stepped stainless datum shafts (Note 1: non-reusable) aligning shutter & IBIS imager planes
    for (let i = 0; i < 3; i++) {
      const sx = -4.6 + i * 4.6;
      const shaftFlange = new THREE.Mesh(
        hiResCyl(1.75, 1.75, 0.72, 22).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      shaftFlange.position.set(sx, 0, -2.2);
      const datumStem = new THREE.Mesh(
        hiResCyl(0.95, 0.95, 6.8, 22).rotateX(Math.PI / 2),
        mats.invarScaleBar
      );
      datumStem.position.set(sx, 0, 0.4);
      // Pre-applied anaerobic blue thread-locker band (reason why Sony prohibits reuse!)
      const lockBand = new THREE.Mesh(
        hiResCyl(1.02, 1.02, 1.65, 18).rotateX(Math.PI / 2),
        mats.mountThreadLockBlue
      );
      lockBand.position.set(sx, 0, 2.8);
      // Anti-tilt precision collar ring
      const collar = new THREE.Mesh(
        hiResTorus(1.28, 0.2, 10, 20),
        mats.brassGear
      );
      collar.position.set(sx, 0, -0.5);
      g.add(shaftFlange, datumStem, lockBand, collar);
    }

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-oem-im-fix-shaft',
        175,
        '#0284c7',
        g,
        new THREE.Vector3(-24.2, -13.5, 9.4),
        new THREE.Vector3(-136, -34, 20),
        cp
      )
    );
  }

  // =========================================================================
  // SH176. Sony OEM Sensor-Front Aperture Mask Plate, Glass Retainer & Spacer Sheet (Ref.502/503/505)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3-layer full-frame optical stack immediately behind rear curtain (>38.6x26.6mm clear window!)
    // Layer 1: IM MASK PLATE (5100) Ref.503 — matte-black precision aperture mask
    const maskPlate = createApertureFrameMesh(45.0, 33.0, 38.6, 26.6, 0.35, mats.matteBlackAnodized, 0.04);
    maskPlate.position.z = 0.65;
    // Layer 2: SHEET (5100) SPACER Ref.505 — dust-exclusion airlock spacer film
    const spacerSheet = createApertureFrameMesh(44.2, 32.2, 39.0, 27.0, 0.25, mats.mylarInsulatorFilm, 0.03);
    spacerSheet.position.z = 0.0;
    // Layer 3: IM PLATE (5000) GLASS RETAINER Ref.502 — spring-steel optical filter retainer frame with 4 clip ears
    const glassRetainer = createApertureFrameMesh(45.8, 33.8, 39.4, 27.4, 0.42, mats.midPlateSteel, 0.05);
    glassRetainer.position.z = -0.65;
    for (const [ex, ey] of [
      [-21.4, 15.2],
      [21.4, 15.2],
      [-21.4, -15.2],
      [21.4, -15.2],
    ]) {
      const clipTab = new THREE.Mesh(
        createChamferedBoxGeo(2.4, 1.5, 0.72, 0.2, 0.03, 'z'),
        mats.beCuSpring
      );
      clipTab.position.set(ex, ey, -0.42);
      g.add(clipTab);
    }
    g.add(maskPlate, spacerSheet, glassRetainer);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-oem-im-mask-retainer',
        176,
        '#334155',
        g,
        new THREE.Vector3(0.0, 0.0, 9.1),
        new THREE.Vector3(-132, -72, -18),
        cp
      )
    );
  }

  // =========================================================================
  // SH177. Sony OEM 2-Stage Shutter Release Switch Block & Flex (Ref.258/257: RL88100 / RL-1071)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual-dome S1 (half-press) / S2 (full-press) tactile snap-dome shutter release module on RL-1071 polyimide FPC
    const fpcBase = new THREE.Mesh(
      createChamferedBoxGeo(13.5, 6.2, 0.35, 0.5, 0.03, 'z'),
      mats.polyimideFpc
    );
    const shadeSheet = new THREE.Mesh(
      createChamferedBoxGeo(12.2, 5.4, 0.18, 0.4, 0.02, 'z'),
      mats.matteBlackAnodized
    );
    shadeSheet.position.z = -0.3;

    // Stepped circular tactile metal housing (RL88100) + outer S1 dome ring + inner S2 gold contact plunger
    const switchHousing = new THREE.Mesh(
      hiResCyl(3.3, 3.5, 1.45, 24).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    switchHousing.position.set(-2.2, 0, 0.85);
    const s1Dome = new THREE.Mesh(hiResTorus(2.25, 0.32, 12, 26), mats.beCuSpring);
    s1Dome.position.set(-2.2, 0, 1.65);
    const s2Plunger = new THREE.Mesh(
      hiResCyl(1.15, 1.35, 1.3, 20).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    s2Plunger.position.set(-2.2, 0, 2.05);

    // Hardware debounce RC network & ZIF output lead
    const debIc = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.4, 0.72, 0.15, 0.04, 'z'),
      mats.icEpoxy
    );
    debIc.position.set(3.4, 0, 0.58);
    g.add(fpcBase, shadeSheet, switchHousing, s1Dome, s2Plunger, debIc);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-oem-rl-2stage-switch',
        177,
        '#ef4444',
        g,
        new THREE.Vector3(24.8, 17.6, 17.8),
        new THREE.Vector3(-104, -104, -34),
        cp
      )
    );
  }

  // =========================================================================
  // SH178. Sony OEM Rear Shutter Acoustic Muffle Cushions A/B (Ref.59/76: 502863201 / 502863301)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual open-cell acoustic damping cushions A & B with micro-ribbed sound-absorption surfaces & adhesive backing
    const cushionA = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 5.2, 1.65, 0.65, 0.18, 'z'),
      mats.oilTrapPorousPad
    );
    cushionA.position.set(-2.2, 1.9, 0);
    const cushionB = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 3.6, 1.45, 0.55, 0.16, 'z'),
      mats.lensFoamSeal
    );
    cushionB.position.set(3.4, -2.5, 0.15);

    // Acoustic attenuation ridges on Cushion A front face
    for (let i = 0; i < 6; i++) {
      const ridge = new THREE.Mesh(
        createChamferedBoxGeo(0.55, 4.2, 0.45, 0.1, 0.04, 'z'),
        mats.antiVibRubber
      );
      ridge.position.set(-6.4 + i * 1.7, 1.9, 0.92);
      g.add(ridge);
    }
    // High-mass viscoelastic barrier backing foil between foam & rear magnesium chassis
    const barrierFoil = new THREE.Mesh(
      createChamferedBoxGeo(12.0, 5.6, 0.25, 0.5, 0.03, 'z'),
      mats.conductiveNiCuFoam
    );
    barrierFoil.position.set(-2.2, 1.9, -0.95);
    g.add(cushionA, cushionB, barrierFoil);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-oem-rear-muffle-cushions',
        178,
        '#64748b',
        g,
        new THREE.Vector3(-12.0, -17.4, 8.2),
        new THREE.Vector3(-62, -112, -54),
        cp
      )
    );
  }

  // =========================================================================
  // SH179. Non-Volatile FRAM Shutter Actuation Counter & Adaptive Wear Current-Trim Module (JP6162500B2)
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-endurance ferroelectric RAM (10^14 write cycles) + adaptive solenoid-current DAC module logging 0..500,000+ shots
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(13.0, 6.8, 0.9, 0.5, 0.06, 'z'),
      mats.hdiMainboardPcb
    );
    const framChip = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 3.6, 0.95, 0.2, 0.05, 'z'),
      mats.icEpoxy
    );
    framChip.position.set(-2.6, 0, 0.92);
    // Gold SPI telemetry pins along FRAM package
    for (let i = 0; i < 4; i++) {
      const leadL = new THREE.Mesh(
        createChamferedBoxGeo(0.5, 0.35, 0.25, 0.04, 0.01, 'z'),
        mats.goldPlating
      );
      leadL.position.set(-2.6 - 2.35, -1.2 + i * 0.8, 0.58);
      const leadR = leadL.clone();
      leadR.position.x = -2.6 + 2.35;
      g.add(leadL, leadR);
    }
    // 12-bit current-trimming DAC IC (JP6162500B2 Seiko Precision adaptive drive current adjustment)
    const trimDac = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 3.2, 0.88, 0.18, 0.04, 'z'),
      mats.icEpoxy
    );
    trimDac.position.set(3.0, 0, 0.88);
    // Calibration gold test-point pads
    for (let i = 0; i < 3; i++) {
      const tp = new THREE.Mesh(
        hiResCyl(0.42, 0.42, 0.22, 14).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      tp.position.set(5.6, -1.6 + i * 1.6, 0.52);
      g.add(tp);
    }
    g.add(pcb, framChip, trimDac);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-fram-adaptive-wear-log',
        179,
        '#4f46e5',
        g,
        new THREE.Vector3(6.5, -18.2, 8.6),
        new THREE.Vector3(-16, -108, -74),
        cp
      )
    );
  }

  // =========================================================================
  // SH180. Factory 100% QC 3-Beam Laser Curtain-Velocity & Acoustic FFT Diagnostic Port (JPO 2H081 EE06 / JIS B 7091)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision Invar metrology bar mounting 3 collimated photodiode pick-up targets (Top/Mid/Bottom) + MEMS acoustic mic
    const invarBar = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 17.5, 1.45, 0.45, 0.08, 'z'),
      mats.invarScaleBar
    );
    g.add(invarBar);

    // 3 precision JIS B 7091 laser-timing optical apertures (Top / Center / Bottom)
    for (const ty of [-5.8, 0.0, 5.8]) {
      const bezel = new THREE.Mesh(
        hiResCyl(1.45, 1.45, 0.75, 22).rotateX(Math.PI / 2),
        mats.brassGear
      );
      bezel.position.set(0, ty, 0.95);
      const pdLens = new THREE.Mesh(
        hiResCyl(0.88, 0.88, 0.92, 18).rotateX(Math.PI / 2),
        mats.irLedLens
      );
      pdLens.position.set(0, ty, 1.02);
      g.add(bezel, pdLens);
    }
    // Side-mounted factory acoustic FFT MEMS capsule verifying bounce-free signature
    const micCan = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 3.0, 1.25, 0.25, 0.05, 'z'),
      mats.goldPlating
    );
    micCan.position.set(4.1, 0, 0.15);
    const micPort = new THREE.Mesh(
      hiResCyl(0.58, 0.58, 1.35, 16).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    micPort.position.set(4.1, 0, 0.2);
    g.add(micCan, micPort);

    parts.push(
      finalizePhase36ShutterPart(
        'shutter-acoustic-laser-qc-rig',
        180,
        '#0891b2',
        g,
        new THREE.Vector3(24.2, 0.0, 8.8),
        new THREE.Vector3(34, -104, -86),
        cp
      )
    );
  }

  return parts;
}
