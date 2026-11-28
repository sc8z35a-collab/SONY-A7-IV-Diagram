import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import {
  buildMg996rServoSubGroup,
  finalizeOriginalPart,
  makeBoxMesh,
  makeCylMesh,
  makePlanarTopBox,
  makeSphereMesh,
} from './originalShared';

export interface RiimosLegRigRef {
  readonly sx: number;
  readonly sz: number;
  readonly ux: number;
  readonly uz: number;
  readonly phase: number;
  readonly coxaBracket: THREE.Group;
  readonly femurServo: THREE.Group;
  readonly femurLink: THREE.Group;
  readonly tibiaServo: THREE.Group;
  readonly tibiaFoot: THREE.Group;
  readonly basePositions: {
    readonly coxaBracket: THREE.Vector3;
    readonly femurServo: THREE.Vector3;
    readonly femurLink: THREE.Vector3;
    readonly tibiaServo: THREE.Vector3;
    readonly tibiaFoot: THREE.Vector3;
  };
  readonly baseRotations: {
    readonly femurLinkZ: number;
    readonly tibiaFootZ: number;
  };
}

/**
 * RIIMOS E1 — Groups 7 & 8 (30 Parts: OR99–OR128):
 *   - Group 7 (OR99–OR122): 4 Symmetric X-Radial 3-DOF Legs (12x MG996R with 90-JPY pot-FB hack, 24p)
 *   - Group 8 (OR123–OR128): Spec Nameplate, Service Hatch, AprilTag Cal Ref, Harnesses & L4 CoG Datum (6p)
 */
export function buildRiimosE1LegsAndAccessoriesParts(
  mats: V2MaterialLibrary,
  clippingPlanes: THREE.Plane[]
): { parts: CadPart[]; legRigs: RiimosLegRigRef[] } {
  const parts: CadPart[] = [];
  const legRigs: RiimosLegRigRef[] = [];

  const add = (
    id: string,
    order: number,
    swatch: string,
    group: THREE.Group,
    pos: readonly [number, number, number],
    exp: readonly [number, number, number],
    edgeOp = 0.24
  ) => {
    parts.push(
      finalizeOriginalPart(
        id,
        1,
        order,
        swatch,
        group,
        new THREE.Vector3(pos[0], pos[1], pos[2]),
        new THREE.Vector3(exp[0], exp[1], exp[2]),
        clippingPlanes,
        edgeOp
      )
    );
  };

  // ===========================================================================
  // GROUP 7: 4 SYMMETRIC X-RADIAL 3-DOF LEGS (OR99–OR122, 24 Parts)
  // ===========================================================================
  const legs: ReadonlyArray<{
    slug: 'fl' | 'fr' | 'rl' | 'rr';
    sx: number;
    sz: number;
    phase: number;
    baseOrder: number;
  }> = [
    { slug: 'fl', sx: -1, sz: 1, phase: 0, baseOrder: 99 },
    { slug: 'fr', sx: 1, sz: 1, phase: Math.PI, baseOrder: 105 },
    { slug: 'rl', sx: -1, sz: -1, phase: Math.PI, baseOrder: 111 },
    { slug: 'rr', sx: 1, sz: -1, phase: 0, baseOrder: 117 },
  ];

  const INV_SQRT2 = 0.70710678;

  for (const leg of legs) {
    const ux = leg.sx * INV_SQRT2;
    const uz = leg.sz * INV_SQRT2;
    // Rotate local +X strictly outward along (ux, 0, uz)
    const yaw = Math.atan2(-uz, ux);
    const ax = leg.sx * 94.0;
    const az = leg.sz * 54.0;

    const pt = (r: number, y: number): [number, number, number] => [
      ax + ux * r,
      y,
      az + uz * r,
    ];

    // +0: Coxa Yaw MG996R Servo (at r=0, Y=62.5; top horn at Y=76.7 -> 1.1mm below hip gusset 77.8)
    {
      const g = new THREE.Group();
      const servo = buildMg996rServoSubGroup(mats, true);
      servo.scale.set(0.76, 0.68, 0.88);
      servo.rotation.y = yaw;
      g.add(servo);
      add(
        `orig-e1-leg-${leg.slug}-coxa-servo`,
        leg.baseOrder,
        '#1e242e',
        g,
        pt(0, 62.5),
        [leg.sx * 56, -72, leg.sz * 56]
      );
    }

    // +1: Coxa C-Bracket & Counter-Bearing Hub (3D-Printed PA66-GF30, 0.03mm non-overlapping submeshes!)
    const coxaBracket = new THREE.Group();
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      const web = makeBoxMesh(15.94, 22, 18.5, mats.pa66ThermalBreak, 14);
      web.position.set(0.24, 0, 0);
      const topLug = makeBoxMesh(15.94, 2.6, 18.5, mats.pa66ThermalBreak, 12);
      topLug.position.set(0.24, 12.33, 0);
      const botLug = makeBoxMesh(15.94, 2.6, 18.5, mats.pa66ThermalBreak, 12);
      botLug.position.set(0.24, -12.33, 0);
      const bearing = makeCylMesh(4.2, 4.2, 2.4, mats.mountStainlessFlange, 12);
      bearing.position.set(0.24, -14.86, 0);
      inner.add(web, topLug, botLug, bearing);
      coxaBracket.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-coxa-bracket`,
        leg.baseOrder + 1,
        '#475569',
        coxaBracket,
        pt(24.5, 62.5),
        [leg.sx * 78, -84, leg.sz * 78]
      );
    }

    // +2: Femur Pitch MG996R Servo (PA66 body, 0.03mm non-overlapping submeshes!)
    const femurServo = new THREE.Group();
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      const body = makeBoxMesh(19.5, 23.0, 18.5, mats.pa66ThermalBreak, 16);
      const cap = makeBoxMesh(19.0, 3.6, 18.0, mats.pa66ThermalBreak, 14);
      cap.position.set(0, 13.33, 0);
      const horn = makeCylMesh(7.2, 7.2, 2.2, mats.pa66ThermalBreak, 14);
      horn.rotation.x = Math.PI * 0.5;
      horn.position.set(2.0, 0, 10.38);
      const potTap = makeBoxMesh(2.6, 2.4, 2.6, mats.epdmGasket, 8);
      potTap.position.set(0, -7.0, -10.58);
      inner.add(body, cap, horn, potTap);
      femurServo.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-femur-servo`,
        leg.baseOrder + 2,
        '#1f2937',
        femurServo,
        pt(42.5, 62.5),
        [leg.sx * 100, -96, leg.sz * 100]
      );
    }

    // +3: Lightweight Twin-Spar PETG Femur Link (L=59.10mm clears tilted corner X-projection by 0.04mm on both servos!)
    const femurLink = new THREE.Group();
    const femurBaseZ = -0.15;
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      const pitchHolder = new THREE.Group();
      pitchHolder.rotation.z = femurBaseZ;
      // Exact tilted X half-extent: (59.30/2)*cos(0.15) + (8.6/2)*sin(0.15) = 29.317 + 0.643 = 29.960mm -> exact 0.040mm clearance to both servos (±30.00)!
      const sparA = makeBoxMesh(59.30, 8.6, 3.6, mats.pa66ThermalBreak, 16);
      sparA.position.set(0, 0, 7.6);
      const sparB = makeBoxMesh(59.30, 8.6, 3.6, mats.pa66ThermalBreak, 16);
      sparB.position.set(0, 0, -7.6);
      const bridgeMid = makeBoxMesh(10.0, 6.4, 11.54, mats.pa66ThermalBreak, 12);
      pitchHolder.add(sparA, sparB, bridgeMid);
      inner.add(pitchHolder);
      femurLink.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-femur-link`,
        leg.baseOrder + 3,
        '#334155',
        femurLink,
        pt(82.25, 57.75),
        [leg.sx * 124, -108, leg.sz * 124]
      );
    }

    // +4: Knee Tibia Pitch MG996R Servo (PA66 body, 0.03mm non-overlapping submeshes!)
    const tibiaServo = new THREE.Group();
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      const body = makeBoxMesh(19.5, 23.0, 18.5, mats.pa66ThermalBreak, 16);
      const cap = makeBoxMesh(19.0, 3.6, 18.0, mats.pa66ThermalBreak, 14);
      cap.position.set(0, 13.33, 0);
      const horn = makeCylMesh(7.2, 7.2, 2.2, mats.pa66ThermalBreak, 14);
      horn.rotation.x = Math.PI * 0.5;
      horn.position.set(2.0, 0, 10.38);
      const potTap = makeBoxMesh(2.6, 2.4, 2.6, mats.epdmGasket, 8);
      potTap.position.set(0, -7.0, -10.58);
      inner.add(body, cap, horn, potTap);
      tibiaServo.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-tibia-servo`,
        leg.baseOrder + 4,
        '#1f2937',
        tibiaServo,
        pt(122.0, 53.0),
        [leg.sx * 148, -122, leg.sz * 148]
      );
    }

    // +5: Reinforced PETG Tibia Shin (L=88mm) + TPU 95A Shock-Absorbing Spherical Foot (touches Y=0.0!)
    const tibiaFoot = new THREE.Group();
    const tibiaBaseZ = 0.22;
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      const kneeClevis = makeBoxMesh(9.2, 9.6, 11.0, mats.pa66ThermalBreak, 12);
      kneeClevis.position.set(0.39, 24.5, 0);
      const shin = makeBoxMesh(8.2, 36.0, 11.0, mats.pa66ThermalBreak, 16);
      shin.position.set(5.4, 8.8, 0);
      shin.rotation.z = tibiaBaseZ;
      const ankleCollar = makeCylMesh(5.8, 6.8, 6.2, mats.pa66ThermalBreak, 14);
      ankleCollar.position.set(10.0, -10.0, 0);
      const footBall = makeSphereMesh(9.5, mats.lensRubberGrip, 16);
      footBall.position.set(10.0, -19.0, 0);
      const treadRing = makeCylMesh(9.6, 9.6, 2.2, mats.damperElastomer, 16);
      treadRing.position.set(10.0, -19.0, 0);
      inner.add(kneeClevis, shin, ankleCollar, footBall, treadRing);
      tibiaFoot.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-tibia-foot`,
        leg.baseOrder + 5,
        '#0f172a',
        tibiaFoot,
        pt(136.0, 28.5),
        [leg.sx * 174, -142, leg.sz * 174]
      );
    }

    legRigs.push({
      sx: leg.sx,
      sz: leg.sz,
      ux,
      uz,
      phase: leg.phase,
      coxaBracket,
      femurServo,
      femurLink,
      tibiaServo,
      tibiaFoot,
      basePositions: {
        coxaBracket: new THREE.Vector3(...pt(24.5, 62.5)),
        femurServo: new THREE.Vector3(...pt(42.5, 62.5)),
        femurLink: new THREE.Vector3(...pt(82.25, 57.75)),
        tibiaServo: new THREE.Vector3(...pt(122.0, 53.0)),
        tibiaFoot: new THREE.Vector3(...pt(136.0, 28.5)),
      },
      baseRotations: {
        femurLinkZ: femurBaseZ,
        tibiaFootZ: tibiaBaseZ,
      },
    });
  }

  // ===========================================================================
  // GROUP 8: COMPLIANCE NAMEPLATE, CALIBRATION & L4 DIGITAL-TWIN ACCESSORIES (OR123–OR128, 6 Parts)
  // ===========================================================================

  // OR123: Spec & Safety Compliance Nameplate (0.04mm flush outside left side armor at X=-107.24)
  {
    const g = new THREE.Group();
    const plate = makePlanarTopBox(72, 1.2, 36, mats.origRiimosSpecPlate);
    plate.rotation.z = Math.PI * 0.5;
    plate.rotation.x = Math.PI * 0.5;
    g.add(plate);
    add('orig-e1-spec-nameplate', 123, '#f97316', g, [-107.88, 158.8, 0], [-158, 0, 0]);
  }

  // OR124: Bottom Quick-Service & 12-Axis Pot-FB Test Port Hatch (PA66, 0.04mm flush below 2.8mm bottom skid Y=83.2!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(72, 1.6, 46, mats.pa66ThermalBreak, 18));
    const latch = makeBoxMesh(12, 1.2, 8, mats.pa66ThermalBreak, 10);
    latch.position.set(0, -1.43, 16);
    g.add(latch);
    add('orig-e1-bottom-service-hatch', 124, '#334155', g, [0, 82.36, 0], [0, -78, 0]);
  }

  // OR125: Non-Human AprilTag 100mm Monocular Range Calibration Reference Tile (0.04mm flush under bottom skid Y=83.2!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(36, 1.6, 20, mats.pomGear, 12));
    const tagDarkA = makeBoxMesh(10, 0.6, 8, mats.pa66ThermalBreak, 8);
    tagDarkA.position.set(-7, -1.13, -3);
    const tagDarkB = makeBoxMesh(10, 0.6, 8, mats.pa66ThermalBreak, 8);
    tagDarkB.position.set(7, -1.13, 3);
    g.add(tagDarkA, tagDarkB);
    add('orig-e1-apriltag-target-ref', 125, '#f8fafc', g, [0, 82.36, 42], [0, -74, 48]);
  }

  // OR126–OR127: Front & Rear Braided Servo / Camera Wire Harness Conduits (0.04mm flush on bottom skid top Y=86.0)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(92, 3.0, 4.0, mats.evfEyecupRubber, 16));
    add('orig-e1-wire-harness-front', 126, '#18181b', g, [0, 87.54, 36], [0, -24, 34]);
  }
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(92, 3.0, 4.0, mats.evfEyecupRubber, 16));
    add('orig-e1-wire-harness-rear', 127, '#18181b', g, [0, 87.54, -36], [0, -24, -34]);
  }

  // OR128: Center-of-Gravity (CoG) & L4 MuJoCo MJX Inertia Calibration Datum Frame (split non-overlapping triad arms!)
  {
    const g = new THREE.Group();
    const hub = makeBoxMesh(1.8, 1.8, 1.8, mats.pa66ThermalBreak, 8);
    const xPos = makeBoxMesh(7.0, 1.8, 1.8, mats.pa66ThermalBreak, 8);
    xPos.position.set(4.43, 0, 0);
    const xNeg = makeBoxMesh(7.0, 1.8, 1.8, mats.pa66ThermalBreak, 8);
    xNeg.position.set(-4.43, 0, 0);
    const yPos = makeBoxMesh(1.8, 5.0, 1.8, mats.pa66ThermalBreak, 8);
    yPos.position.set(0, 3.43, 0);
    const yNeg = makeBoxMesh(1.8, 5.0, 1.8, mats.pa66ThermalBreak, 8);
    yNeg.position.set(0, -3.43, 0);
    const zPos = makeBoxMesh(1.8, 1.8, 7.0, mats.pa66ThermalBreak, 8);
    zPos.position.set(0, 0, 4.43);
    const zNeg = makeBoxMesh(1.8, 1.8, 7.0, mats.pa66ThermalBreak, 8);
    zNeg.position.set(0, 0, -4.43);
    g.add(hub, xPos, xNeg, yPos, yNeg, zPos, zNeg);
    add('orig-e1-l4-cog-datum', 128, '#22c55e', g, [0, 122.03, 0], [0, -18, 0], 0.16);
  }

  return { parts, legRigs };
}
