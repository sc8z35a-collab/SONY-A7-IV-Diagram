//@FLOW_MAP|file=src/assemblies/original/riimosE1LegsAndAccessoriesParts.ts|unit=original|lines=337|exports=RiimosLegRigRef,buildRiimosE1LegsAndAccessoriesParts
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

    // +0: Coxa Yaw MG996R Servo (at r=0, Y=61.10; top horn at Y=76.121 -> 0.039mm below hip gusset 76.16)
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
        pt(0, 61.10),
        [leg.sx * 56, -72, leg.sz * 56]
      );
    }

    // +1: Coxa C-Bracket & Counter-Bearing Hub (at r=22.78, Y=61.10 -> inner X=16.78, 0.037mm from coxa flange 16.743!)
    const coxaBracket = new THREE.Group();
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      const web = makeBoxMesh(11.5, 22, 18.5, mats.shutterChassis, 14);
      const topLug = makeBoxMesh(12, 2.6, 18.5, mats.magnesiumCast, 12);
      topLug.position.set(0, 12.33, 0);
      const botLug = makeBoxMesh(12, 2.6, 18.5, mats.magnesiumCast, 12);
      botLug.position.set(0, -12.33, 0);
      const bearing = makeCylMesh(4.2, 4.2, 2.4, mats.mountStainlessFlange, 12);
      bearing.position.set(0, -14.86, 0);
      inner.add(web, topLug, botLug, bearing);
      coxaBracket.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-coxa-bracket`,
        leg.baseOrder + 1,
        '#475569',
        coxaBracket,
        pt(22.78, 61.10),
        [leg.sx * 78, -84, leg.sz * 78]
      );
    }

    // +2: Femur Pitch MG996R Servo (at r=38.57, Y=61.10 -> inner X=28.82, 0.04mm from coxaBracket 28.78!)
    const femurServo = new THREE.Group();
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      const body = makeBoxMesh(19.5, 23.0, 18.5, mats.matteBlackAnodized, 16);
      const cap = makeBoxMesh(19.0, 3.6, 18.0, mats.stainlessMachined, 14);
      cap.position.set(0, 13.33, 0);
      const horn = makeCylMesh(7.2, 7.2, 2.2, mats.mountRedIndexDot, 14);
      horn.rotation.x = Math.PI * 0.5;
      horn.position.set(2.0, 0, 10.38);
      const potTap = makeBoxMesh(2.6, 2.4, 2.6, mats.sonyAlphaCinnabar, 8);
      potTap.position.set(0, -7.0, -10.58);
      inner.add(body, cap, horn, potTap);
      femurServo.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-femur-servo`,
        leg.baseOrder + 2,
        '#1f2937',
        femurServo,
        pt(38.57, 61.10),
        [leg.sx * 100, -96, leg.sz * 100]
      );
    }

    // +3: Lightweight Twin-Spar PETG Femur Link (at r=76.20, Y=57.0 -> inner X=48.366, 0.046mm from femurServo 48.32!)
    const femurLink = new THREE.Group();
    const femurBaseZ = -0.15;
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      const pitchHolder = new THREE.Group();
      pitchHolder.rotation.z = femurBaseZ;
      const sparA = makeBoxMesh(55.0, 8.6, 3.6, mats.lensBarrelAnodized, 16);
      sparA.position.set(0, 0, 7.6);
      const sparB = makeBoxMesh(55.0, 8.6, 3.6, mats.lensBarrelAnodized, 16);
      sparB.position.set(0, 0, -7.6);
      const bridgeMid = makeBoxMesh(10.0, 6.4, 11.52, mats.sonyAlphaCinnabar, 12);
      pitchHolder.add(sparA, sparB, bridgeMid);
      inner.add(pitchHolder);
      femurLink.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-femur-link`,
        leg.baseOrder + 3,
        '#334155',
        femurLink,
        pt(76.20, 57.0),
        [leg.sx * 124, -108, leg.sz * 124]
      );
    }

    // +4: Knee Tibia Pitch MG996R Servo (at r=113.82, Y=52.0 -> inner X=104.07, 0.036mm from femurLink 104.034!)
    const tibiaServo = new THREE.Group();
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      const body = makeBoxMesh(19.5, 23.0, 18.5, mats.matteBlackAnodized, 16);
      const cap = makeBoxMesh(19.0, 3.6, 18.0, mats.stainlessMachined, 14);
      cap.position.set(0, 13.33, 0);
      const horn = makeCylMesh(7.2, 7.2, 2.2, mats.mountRedIndexDot, 14);
      horn.rotation.x = Math.PI * 0.5;
      horn.position.set(2.0, 0, 10.38);
      const potTap = makeBoxMesh(2.6, 2.4, 2.6, mats.sonyAlphaCinnabar, 8);
      potTap.position.set(0, -7.0, -10.58);
      inner.add(body, cap, horn, potTap);
      tibiaServo.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-tibia-servo`,
        leg.baseOrder + 4,
        '#1f2937',
        tibiaServo,
        pt(113.82, 52.0),
        [leg.sx * 148, -122, leg.sz * 148]
      );
    }

    // +5: Reinforced PETG Tibia Shin + TPU 95A Shock-Absorbing Spherical Foot (exact Y_min=0.000, shin top seats 0.04mm to tibiaServo!)
    const tibiaFoot = new THREE.Group();
    const tibiaBaseZ = 0.22;
    {
      const inner = new THREE.Group();
      inner.rotation.y = yaw;
      // Shin strut (local Y:-1.0..+34.0 approx, top-left edge at local X≈-7.92 -> world r=123.61, 0.04mm from tibiaServo 123.57!)
      const shin = makeBoxMesh(8.2, 36.0, 11.0, mats.carbonFiberBlade, 16);
      shin.position.set(0.0, 16.0, 0);
      shin.rotation.z = tibiaBaseZ;
      // Ankle collar seated 0.03mm below shin bottom & 0.03mm above treadRing
      const ankleCollar = makeCylMesh(5.8, 6.8, 5.2, mats.magnesiumCast, 14);
      ankleCollar.position.set(4.5, -5.0, 0);
      // Cinnabar bumper cuff seated cleanly between ankleCollar (-7.60) and footBall top (-9.66)
      const treadRing = makeCylMesh(7.6, 8.2, 2.0, mats.sonyAlphaCinnabar, 16);
      treadRing.position.set(4.5, -8.63, 0);
      // High-grip TPU 95A spherical foot pad (R=9.5 at local Y=-19.16 -> World Y = 28.66 - 19.16 = 9.50 -> exact Y_min = 0.000!)
      const footBall = makeSphereMesh(9.5, mats.lensRubberGrip, 16);
      footBall.position.set(4.5, -19.16, 0);
      inner.add(shin, ankleCollar, treadRing, footBall);
      tibiaFoot.add(inner);
      add(
        `orig-e1-leg-${leg.slug}-tibia-foot`,
        leg.baseOrder + 5,
        '#0f172a',
        tibiaFoot,
        pt(131.53, 28.66),
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
        coxaBracket: new THREE.Vector3(...pt(22.78, 61.10)),
        femurServo: new THREE.Vector3(...pt(38.57, 61.10)),
        femurLink: new THREE.Vector3(...pt(76.20, 57.0)),
        tibiaServo: new THREE.Vector3(...pt(113.82, 52.0)),
        tibiaFoot: new THREE.Vector3(...pt(131.53, 28.66)),
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

  // OR123: Spec & Safety Compliance Nameplate (X_inner=-107.28 -> 0.04mm outside side-armor-left -107.24!)
  {
    const g = new THREE.Group();
    const plate = makePlanarTopBox(72, 1.2, 36, mats.origRiimosSpecPlate);
    plate.rotation.z = Math.PI * 0.5;
    plate.rotation.x = Math.PI * 0.5;
    g.add(plate);
    add('orig-e1-spec-nameplate', 123, '#f97316', g, [-107.88, 155.8, 0], [-158, 0, 0]);
  }

  // OR124: Bottom Quick-Service & 12-Axis Pot-FB Test Port Hatch (Y_top=81.76 -> 0.04mm below skid plate 81.8!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(72, 1.6, 46, mats.shutterChassis, 18));
    const latch = makeBoxMesh(12, 1.2, 8, mats.sonyAlphaCinnabar, 10);
    latch.position.set(0, -1.43, 16);
    g.add(latch);
    add('orig-e1-bottom-service-hatch', 124, '#334155', g, [0, 80.96, 0], [0, -78, 0]);
  }

  // OR125: Non-Human AprilTag 100mm Monocular Range Calibration Reference Tile (Y_top=81.76 -> 0.04mm below skid plate!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(36, 1.6, 20, mats.pomGear, 12));
    const tagDarkA = makeBoxMesh(10, 0.6, 8, mats.matteBlackAnodized, 8);
    tagDarkA.position.set(-7, -1.13, -3);
    const tagDarkB = makeBoxMesh(10, 0.6, 8, mats.matteBlackAnodized, 8);
    tagDarkB.position.set(7, -1.13, 3);
    g.add(tagDarkA, tagDarkB);
    add('orig-e1-apriltag-target-ref', 125, '#f8fafc', g, [0, 80.96, 42], [0, -74, 48]);
  }

  // OR126–OR127: Front & Rear Braided Servo / Camera Wire Harness Conduits (Y_bot=86.04 -> 0.04mm on skid plate & Z=±33.04 -> 0.04mm beside bus-carrier-pcb!)
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(92, 3.0, 4.0, mats.evfEyecupRubber, 16));
    add('orig-e1-wire-harness-front', 126, '#18181b', g, [0, 87.54, 33.04], [0, -24, 34]);
  }
  {
    const g = new THREE.Group();
    g.add(makeBoxMesh(92, 3.0, 4.0, mats.evfEyecupRubber, 16));
    add('orig-e1-wire-harness-rear', 127, '#18181b', g, [0, 87.54, -33.04], [0, -24, -34]);
  }

  // OR128: Center-of-Gravity (CoG) & L4 MuJoCo MJX Inertia Calibration Datum Frame (Y_top=127.96 -> 0.04mm below mid-deck-floor 128.0!)
  {
    const g = new THREE.Group();
    const xAxis = makeBoxMesh(16, 1.8, 1.8, mats.mountRedIndexDot, 8);
    const yAxis = makeBoxMesh(1.8, 12, 1.8, mats.cfaGreen, 8);
    const zAxis = makeBoxMesh(1.8, 1.8, 16, mats.mountShimBlue, 8);
    g.add(xAxis, yAxis, zAxis);
    add('orig-e1-l4-cog-datum', 128, '#22c55e', g, [0, 121.96, 0], [0, -18, 0], 0.16);
  }

  return { parts, legRigs };
}
