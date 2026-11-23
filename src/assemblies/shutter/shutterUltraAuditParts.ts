import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { SHUTTER_ULTRA_AUDIT_EXPLANATIONS } from './shutterUltraAuditExplanations';

function finalizeStandaloneShutterAuditPart(
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
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

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
    explanation: SHUTTER_ULTRA_AUDIT_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Build 20 Phase 17 standalone-only ultra-deep audit CAD parts for the Mechanical Shutter & Surroundings (SH58–SH77).
 * Strictly omitted in whole-camera views ('integrated', 'camera_body'); visible ONLY in individual 'shutter' view.
 */
export function buildShutterUltraAuditParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const frameW = 74.0;
  const frameH = 54.0;
  const frameCenterX = 7.5;

  // =========================================================================
  // SH58. Curtain-Blade Z-Axis Hold-Down Cantilever Leaf Springs (4x in Upper/Lower Pockets)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [sx, sy] of [
      [-15.5, 19.2],
      [14.5, 19.2],
      [-15.5, -19.2],
      [14.5, -19.2],
    ] as Array<[number, number]>) {
      const mountTab = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 0.28), mats.beCuSpring);
      mountTab.position.set(sx, sy, 0.12);

      // Gentle arched cantilever leaf finger pressing blade stack flat in Z
      const leafArm = new THREE.Mesh(new THREE.BoxGeometry(8.6, 1.35, 0.14), mats.beCuSpring);
      leafArm.position.set(sx + (sx < 0 ? 5.2 : -5.2), sy + (sy > 0 ? -1.4 : 1.4), -0.05);
      leafArm.rotation.y = sx < 0 ? 0.08 : -0.08;

      // Low-friction spherical dimple contact bead coated in PTFE
      const tipBead = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 10), mats.zifIvoryPlastic);
      tipBead.position.set(sx + (sx < 0 ? 9.1 : -9.1), sy + (sy > 0 ? -1.4 : 1.4), -0.22);

      const microPin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 0.7, 10).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      microPin.position.set(sx, sy, 0.15);

      g.add(mountTab, leafArm, tipBead, microPin);
    }

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-blade-press-springs',
        58,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 15.15),
        new THREE.Vector3(-42.0, 32.0, 34.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH59. Blade-Rivet Stress-Relief Reinforcement Collars & Crack-Arrest Rim (Revised AFE-3360)
  // =========================================================================
  {
    const g = new THREE.Group();
    const collarShape = new THREE.Shape();
    collarShape.absellipse(0, 0, 2.05, 1.45, 0, Math.PI * 2, false, 0);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.62, 0, Math.PI * 2, true);
    collarShape.holes.push(hole);
    const collarGeo = extrudeCentered(collarShape, 0.28, 0.03, 0.03, 18);

    // 16 stress-relief reinforced collars around the 1st & 2nd curtain rivet holes (strictly outside ±18mm aperture!)
    for (const [cx, cz] of [
      [20.6, 0.42],
      [23.6, 0.42],
      [20.9, -0.48],
      [23.9, -0.48],
    ] as Array<[number, number]>) {
      for (let i = 0; i < 4; i++) {
        const cy = -9.4 + i * 6.25;
        const rim = new THREE.Mesh(collarGeo, mats.titaniumRivet);
        rim.position.set(cx, cy, cz);

        const crackRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.95, 0.16, 8, 16),
          mats.aramidKevlarWeave
        );
        crackRing.position.set(cx, cy, cz + 0.16);
        crackRing.userData.noEdges = true;
        g.add(rim, crackRing);
      }
    }

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-rivet-reinforce-collars',
        59,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 14.8),
        new THREE.Vector3(-56.0, 10.0, 24.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH60. Cross-Ply CFRP + Aramid (Kevlar) Tough Core Micro-Laminate & Matte Sputter Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stepped cutaway micro-laminate reference coupon seated at upper blade pocket edge (clears aperture)
    // 4 stacked micro-plies clearly visible: CFRP 0° skin, golden Aramid Kevlar core, CFRP 90° skin, matte sputter coat
    const ply0 = new THREE.Mesh(new THREE.BoxGeometry(36.0, 3.8, 0.1), mats.carbonFiberBlade);
    ply0.position.set(0.5, 16.4, 0.26);

    const aramidCore = new THREE.Mesh(new THREE.BoxGeometry(34.2, 3.6, 0.14), mats.aramidKevlarWeave);
    aramidCore.position.set(0.5, 16.4, 0.08);

    const ply90 = new THREE.Mesh(new THREE.BoxGeometry(32.4, 3.4, 0.1), mats.carbonFiberBladeRear);
    ply90.position.set(0.5, 16.4, -0.1);

    const matteCoat = new THREE.Mesh(new THREE.BoxGeometry(36.0, 3.8, 0.06), mats.velvetFlockTrap);
    matteCoat.position.set(0.5, 16.4, 0.36);

    // Matching lower-pocket second-curtain Aramid-CFRP hybrid strip
    const lowerCore = new THREE.Mesh(new THREE.BoxGeometry(34.2, 3.5, 0.14), mats.aramidKevlarWeave);
    lowerCore.position.set(0.5, -16.4, -0.22);
    const lowerSkin = new THREE.Mesh(new THREE.BoxGeometry(36.0, 3.7, 0.1), mats.carbonFiberBlade);
    lowerSkin.position.set(0.5, -16.4, -0.05);

    g.add(ply0, aramidCore, ply90, matteCoat, lowerCore, lowerSkin);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-blade-aramid-ply',
        60,
        '#ca8a04',
        g,
        new THREE.Vector3(0, 0, 15.35),
        new THREE.Vector3(-18.0, 48.0, 46.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH61. Lubricant-Mist Capillary Trap Grooves & Porous Oil-Absorbing Barrier Strips
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical labyrinth capillary partition wall separating +X drive bay from 36x24mm optical window
    const barrierRail = new THREE.Mesh(new THREE.BoxGeometry(2.6, 36.0, 2.0), mats.matteBlackAnodized);
    barrierRail.position.set(20.6, 0, 0);
    g.add(barrierRail);

    // Sintered porous oil-wicking absorbent felt strips lining both faces of the partition
    const padFront = new THREE.Mesh(new THREE.BoxGeometry(1.5, 33.0, 0.55), mats.oilTrapPorousPad);
    padFront.position.set(22.1, 0, 0.45);
    const padRear = new THREE.Mesh(new THREE.BoxGeometry(1.5, 33.0, 0.55), mats.oilTrapPorousPad);
    padRear.position.set(22.1, 0, -0.45);
    g.add(padFront, padRear);

    // Twin concentric capillary oil-creep trap rings around the 2 main arc-slot drive spindles
    for (const ty of [7.2, -7.2]) {
      const trapRing = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.28, 10, 22), mats.oilTrapPorousPad);
      trapRing.position.set(24.0, ty, 0.85);
      trapRing.userData.noEdges = true;
      const outerWall = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.22, 8, 22), mats.stainlessMachined);
      outerWall.position.set(24.0, ty, 0.85);
      outerWall.userData.noEdges = true;
      g.add(trapRing, outerWall);
    }

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-oil-trap-barriers',
        61,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 13.7),
        new THREE.Vector3(-48.0, -6.0, 6.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH62. Blade-Chamber Piston-Air Relief Vent Channels & Microporous ePTFE Equalizer Membrane
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper & lower blade-storage pocket terminal vent manifold + breathable ePTFE membrane window
    for (const vy of [24.2, -24.2]) {
      const ventManifold = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(26.0, 3.6, 0.8), 1.35, 0.08, 0.08, 12),
        mats.matteBlackAnodized
      );
      ventManifold.position.set(1.0, vy, 0);
      g.add(ventManifold);

      // 6 pressure-relief air slits + bright white/silver microporous ePTFE membrane filter backing
      const eptfeMembrane = new THREE.Mesh(new THREE.BoxGeometry(22.4, 2.0, 0.18), mats.zifIvoryPlastic);
      eptfeMembrane.position.set(1.0, vy, 0.72);
      g.add(eptfeMembrane);

      for (let k = -2; k <= 2; k++) {
        const louver = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.3, 0.42), mats.conductiveNiCuFoam);
        louver.position.set(1.0 + k * 4.2, vy, 0.85);
        g.add(louver);
      }
    }

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-air-vent-equalizer',
        62,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, 0, 14.9),
        new THREE.Vector3(-28.0, -44.0, 32.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH63. Electromagnet Pole-Face Tilt/Gap Calibration Micro-Shims & Potted Adjustment Screws
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const mx of [26.5, 36.0]) {
      // Precision stainless baseplate tilt-shim pack behind electromagnet yoke
      const shimStack = new THREE.Mesh(new THREE.BoxGeometry(7.6, 3.2, 0.45), mats.mountShimBlue);
      shimStack.position.set(mx, 16.5, -1.65);

      // Twin fine-pitch M1.4 tilt calibration screws + factory red/blue tamper epoxy potting dots
      for (const ox of [-2.4, 2.4]) {
        const calScrew = createPrecisionScrew(0.95, 0.36, 3.2, mats.stainlessMachined);
        calScrew.rotation.y = Math.PI;
        calScrew.position.set(mx + ox, 16.5, -2.0);

        const pottingDot = new THREE.Mesh(
          new THREE.SphereGeometry(0.58, 10, 8),
          mx < 30 ? mats.bodyRecRed : mats.mountThreadLockBlue
        );
        pottingDot.position.set(mx + ox, 16.5, -2.55);
        pottingDot.userData.noEdges = true;
        g.add(calScrew, pottingDot);
      }
      g.add(shimStack);
    }

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-em-tilt-shims',
        63,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, 12.1),
        new THREE.Vector3(34.0, 48.0, -36.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH64. Electromagnet 0.04mm Enamel-Wire Strain-Relief Terminal Posts & Kapton Bandage
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const mx of [26.5, 36.0]) {
      // High-temp amber Kapton insulating bandage wrapping both solenoid coils
      for (const ox of [-2.3, 2.3]) {
        const kaptonWrap = new THREE.Mesh(
          new THREE.BoxGeometry(3.0, 2.8, 3.15),
          mats.mylarInsulatorFilm
        );
        kaptonWrap.position.set(mx + ox, 16.7, 0);
        g.add(kaptonWrap);
      }

      // Gold-plated wire-wrap strain-relief terminal header block & 2 square solder posts
      const header = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.4, 1.6), mats.mountPpsInsulator);
      header.position.set(mx, 19.6, 0.2);
      g.add(header);

      for (const px of [-1.6, 1.6]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2.2, 0.55), mats.goldPlating);
        post.position.set(mx + px, 20.6, 0.2);
        const solderBead = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), mats.solderBallSilver);
        solderBead.position.set(mx + px, 21.5, 0.2);
        solderBead.userData.noEdges = true;
        g.add(post, solderBead);
      }
    }

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-em-coil-terminals',
        64,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 12.6),
        new THREE.Vector3(48.0, 44.0, -14.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH65. Inter-Electromagnet Magnetic-Crosstalk Permalloy Shield Septum & Non-Magnetic Spacer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical laminated Permalloy-78 + non-magnetic aluminum septum standing right between Magnet 1 (x=26.5) and Magnet 2 (x=36.0)
    const permalloyCore = new THREE.Mesh(new THREE.BoxGeometry(0.55, 9.4, 4.4), mats.lensPermalloyShield);
    permalloyCore.position.set(31.25, 16.5, 0.2);

    const aluL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 9.0, 4.0), mats.stainlessMachined);
    aluL.position.set(30.72, 16.5, 0.2);
    const aluR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 9.0, 4.0), mats.stainlessMachined);
    aluR.position.set(31.78, 16.5, 0.2);

    // Top & bottom mounting ears with chassis ground clip
    const earTop = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 1.2), mats.beCuSpring);
    earTop.position.set(31.25, 21.6, -0.6);

    g.add(permalloyCore, aluL, aluR, earTop);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-em-flux-separator',
        65,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 12.5),
        new THREE.Vector3(16.0, 46.0, -26.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH66. Dual-Driven Shutter Halbach Neodymium Stator Array & Low-Inertia Boost Coil Bobbin
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4-segment Halbach high-flux N52 neodymium stator arc framing the dual-drive booster (x=36.2, y=-1.0)
    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2 + Math.PI * 0.25;
      const seg = new THREE.Mesh(
        new THREE.BoxGeometry(3.4, 1.6, 2.4),
        k % 2 === 0 ? mats.neodymiumMagnet : mats.softIronYoke
      );
      seg.position.set(36.2 + Math.cos(ang) * 4.4, -1.0 + Math.sin(ang) * 4.4, 0);
      seg.rotation.z = ang + Math.PI / 2;
      g.add(seg);
    }

    // Ultra-light CCAW (copper-clad aluminum wire) moving voice-coil bobbin inside flux gap
    const voiceBobbin = new THREE.Mesh(
      new THREE.CylinderGeometry(2.75, 2.75, 2.8, 22, 1, true).rotateX(Math.PI / 2),
      mats.copperCoil
    );
    voiceBobbin.position.set(36.2, -1.0, 0.2);

    const driveTab = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.3, 0.7), mats.aramidKevlarWeave);
    driveTab.position.set(33.2, -1.0, 1.35);

    g.add(voiceBobbin, driveTab);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-dual-boost-stator',
        66,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 13.0),
        new THREE.Vector3(64.0, 8.0, -8.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH67. EFCS Electronic-Front-Curtain Hold-Open Standby Latch & Silent Snubber Brake Circuit
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mechanical open-hold latch arm & mini keeper solenoid keeping Curtain 1 parked during EFCS
    const latchBase = new THREE.Mesh(new THREE.BoxGeometry(8.8, 4.2, 1.3), mats.matteBlackAnodized);
    latchBase.position.set(27.0, 7.6, -0.4);

    const latchHook = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(6.4, 1.6, 0.45), 0.75, 0.05, 0.05, 10),
      mats.stainlessMachined
    );
    latchHook.position.set(24.0, 6.2, 0.35);
    latchHook.rotation.z = 0.28;

    // RC snubber & active demagnetization micro-PCB seated next to latch
    const snubberPcb = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.6, 0.55), mats.hdiMainboardPcb);
    snubberPcb.position.set(27.5, 9.8, 0.45);
    for (let i = 0; i < 3; i++) {
      const smd = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.8, 0.45),
        i === 1 ? mats.tantalumCapYellow : mats.smdCeramic
      );
      smd.position.set(25.4 + i * 2.1, 9.8, 0.9);
      g.add(smd);
    }

    g.add(latchBase, latchHook, snubberPcb);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-efcs-brake-solenoid',
        67,
        '#059669',
        g,
        new THREE.Vector3(0, 0, 12.3),
        new THREE.Vector3(58.0, 26.0, 10.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH68. Charge-Motor Precious-Metal Brushes, 3-Pole Commutator & Spark-Suppressing Ring Varistor
  // =========================================================================
  {
    const g = new THREE.Group();
    // Seated inside the external charge motor bay (x=43.5, y=-9.8, z=12.2)
    // Cobalt-blue ceramic ZnO ring varistor directly behind 3-pole copper commutator
    const varistor = new THREE.Mesh(
      new THREE.CylinderGeometry(3.35, 3.35, 1.15, 22).rotateX(Math.PI / 2),
      mats.varistorRingBlue
    );
    varistor.position.set(43.5, -9.8, -1.35);

    // 3-segment copper commutator cylinder + rotor shaft
    for (let s = 0; s < 3; s++) {
      const ang = (s / 3) * Math.PI * 2;
      const seg = new THREE.Mesh(
        new THREE.CylinderGeometry(1.85, 1.85, 2.2, 12, 1, false, ang, (Math.PI * 2) / 3 - 0.14).rotateX(Math.PI / 2),
        mats.copperHeatSpreader
      );
      seg.position.set(43.5, -9.8, 0.35);
      g.add(seg);
    }
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.68, 0.68, 5.2, 14).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    shaft.position.set(43.5, -9.8, 0);

    // Twin Ag-Pd precious-metal forked leaf brushes pressing onto commutator
    for (const bx of [-2.75, 2.75]) {
      const brush = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.72, 1.5), mats.sinteredSilver);
      brush.position.set(43.5 + bx, -9.8, 0.4);
      brush.rotation.z = bx < 0 ? 0.18 : -0.18;
      g.add(brush);
    }

    g.add(varistor, shaft);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-motor-commutator-varistor',
        68,
        '#1d63b8',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(74.0, -8.0, -24.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH69. Charge-Unit Multi-Track Gold-Plated Rotary Position Encoder PCB & Fork Wiper Brush
  // =========================================================================
  {
    const g = new THREE.Group();
    // Circular 3-track gold Gray-code PCB seated inside MB CHARGE UNIT (x=43.5, y=-18.2)
    const pcbDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(5.2, 5.2, 0.65, 28).rotateX(Math.PI / 2),
      mats.hdiMainboardPcb
    );
    pcbDisc.position.set(43.5, -18.2, -1.6);
    g.add(pcbDisc);

    // 3 concentric hard-gold code tracks (broken arc segments)
    for (const [r, arcLen, rot] of [
      [2.1, Math.PI * 1.45, 0.2],
      [3.2, Math.PI * 1.15, 1.1],
      [4.3, Math.PI * 1.65, 2.3],
    ] as Array<[number, number, number]>) {
      const track = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.24, 6, 24, arcLen),
        mats.goldPlating
      );
      track.position.set(43.5, -18.2, -1.2);
      track.rotation.z = rot;
      track.userData.noEdges = true;
      g.add(track);
    }

    // Twin-fork phosphor-bronze sliding wiper arm riding on the gold tracks
    const wiperHub = new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.25, 1.1, 16).rotateX(Math.PI / 2),
      mats.pomGear
    );
    wiperHub.position.set(43.5, -18.2, -0.4);
    for (let f = 0; f < 3; f++) {
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.32, 4.4, 0.14), mats.beCuSpring);
      finger.position.set(43.5 + (f - 1) * 1.1, -16.1, -0.9);
      g.add(finger);
    }
    g.add(wiperHub);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-charge-rotary-encoder',
        69,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(74.0, -24.0, -14.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH70. Floating-Shaft Mating Oldham Cross-Key Sockets & Axial Preload Wave Spring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left (shutter-side x=30.2) & Right (charge-unit-side x=44.2) orthogonal Oldham sockets for SH48 shaft
    for (const [sx, rotX] of [
      [30.2, 0],
      [44.2, Math.PI / 2],
    ] as Array<[number, number]>) {
      const socket = new THREE.Mesh(
        new THREE.CylinderGeometry(3.15, 3.15, 2.4, 20).rotateZ(Math.PI / 2),
        mats.pomGear
      );
      socket.position.set(sx, -13.5, 0);

      // Orthogonal cross-keyway channel machined into face
      const slot = new THREE.Mesh(new THREE.BoxGeometry(1.4, 5.4, 1.45), mats.matteBlackAnodized);
      slot.position.set(sx + (sx < 37 ? 0.7 : -0.7), -13.5, 0);
      slot.rotation.x = rotX;
      g.add(socket, slot);
    }

    // Axial anti-rattle wave spring seated inside right socket
    const waveSpring = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.24, 8, 22).rotateY(Math.PI / 2),
      mats.mountSpringSteel
    );
    waveSpring.position.set(42.6, -13.5, 0);
    waveSpring.userData.noEdges = true;
    g.add(waveSpring);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-charge-oldham-sockets',
        70,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(64.0, -16.0, 10.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH71. Sony OEM Charge-Unit Fixed Bolts (Ref.461: 418599001 M1.6x4.5) & Torque-Reaction Bracket
  // =========================================================================
  {
    const g = new THREE.Group();
    // L-shaped SUS304 stainless torque-reaction & ground bracket cradling Ref.458 MB CHARGE UNIT
    const sideWall = new THREE.Mesh(new THREE.BoxGeometry(1.0, 21.6, 8.2), mats.stainlessMachined);
    sideWall.position.set(52.4, -14.0, 0);
    const backFlange = new THREE.Mesh(new THREE.BoxGeometry(17.4, 2.8, 0.9), mats.stainlessMachined);
    backFlange.position.set(44.0, -25.2, -3.6);
    const topEar = new THREE.Mesh(new THREE.BoxGeometry(16.0, 2.4, 0.9), mats.stainlessMachined);
    topEar.position.set(44.5, -2.6, -3.6);
    g.add(sideWall, backFlange, topEar);

    // 3x Sony Ref.461 M1.6x4.5 Charge Unit Fixed Bolts with blue micro-encapsulated thread lock
    for (const [bx, by] of [
      [38.0, -2.6],
      [50.2, -2.6],
      [44.0, -25.2],
    ] as Array<[number, number]>) {
      const bolt = createPrecisionScrew(1.25, 0.55, 4.5, mats.stainlessMachined);
      bolt.rotation.y = Math.PI;
      bolt.position.set(bx, by, -4.3);
      const blueLock = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.75, 1.3, 12).rotateX(Math.PI / 2),
        mats.mountThreadLockBlue
      );
      blueLock.position.set(bx, by, -1.6);
      blueLock.userData.noEdges = true;
      g.add(bolt, blueLock);
    }

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-charge-oem-bolts',
        71,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(74.0, -36.0, -44.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH72. Charge-Motor Silicone Isolation Collar & High-Frequency Gear-Whine Acoustic Foam Wrap
  // =========================================================================
  {
    const g = new THREE.Group();
    // Soft Shore A 35 silicone sleeve around charge motor barrel
    const motorCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(4.45, 4.45, 6.2, 22, 1, true).rotateX(Math.PI / 2),
      mats.antiVibRubber
    );
    motorCollar.position.set(43.5, -9.8, 0);

    // Acoustic open-cell micro-cellular urethane foam wrap hugging +X exterior of charge gearbox
    const foamBack = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(17.6, 23.2, 2.4), 1.05, 0.08, 0.08, 12),
      mats.lensFoamSeal
    );
    foamBack.position.set(43.5, -14.0, -4.65);

    const foamSide = new THREE.Mesh(new THREE.BoxGeometry(1.1, 22.0, 8.2), mats.lensFoamSeal);
    foamSide.position.set(53.2, -14.0, 0);

    g.add(motorCollar, foamBack, foamSide);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-charge-motor-isolator',
        72,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(76.0, -28.0, -54.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH73. Sony OEM Mecha-Device Precision Die-Cast Mg-Al Shutter Cradle Frame (Ref.451: A5033415A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Surrounding outer monolithic Mg-Al die-cast subframe (slightly wider than shutter chassis so it frames it cleanly!)
    const cradleShape = createFrameShape(frameW + 10.0, frameH + 9.0, 4.2, 42.0, 30.0, 2.0, -frameCenterX, 0);
    const cradleBody = new THREE.Mesh(
      extrudeCentered(cradleShape, 5.2, 0.22, 0.22, 16),
      mats.magnesiumCast
    );
    cradleBody.position.x = frameCenterX;
    g.add(cradleBody);

    // 4 CNC-machined bright datum reference bosses (Mount Front / IBIS Rear alignment towers)
    for (const [dx, dy] of [
      [-28.5, 25.0],
      [43.5, 25.0],
      [-28.5, -25.0],
      [43.5, -25.0],
    ] as Array<[number, number]>) {
      const datumBoss = new THREE.Mesh(
        new THREE.CylinderGeometry(2.8, 3.1, 6.0, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      datumBoss.position.set(dx, dy, 0);
      g.add(datumBoss);
    }

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-mecha-cradle-frame',
        73,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 13.6),
        new THREE.Vector3(0, 0, -56.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH74. Front Mount-to-Shutter Stepped Stray-Light Baffle & Gravity Dust-Catcher Trough
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3-step serrated rectangular matte-black dark-box tunnel between E-mount and shutter front
    const stepSpecs: Array<{ w: number; h: number; z: number }> = [
      { w: 43.0, h: 31.0, z: 0.75 },
      { w: 41.2, h: 29.2, z: 0.0 },
      { w: 39.4, h: 27.4, z: -0.75 },
    ];
    for (const st of stepSpecs) {
      const frame = createFrameShape(st.w + 5.2, st.h + 5.2, 2.2, st.w, st.h, 1.0, 0, 0);
      const mesh = new THREE.Mesh(extrudeCentered(frame, 0.72, 0.06, 0.06, 14), mats.mountVelvetBaffle);
      mesh.position.set(0, 0, st.z);
      g.add(mesh);
    }

    // Bottom floor gravity dust-catcher trough & sticky silicone gel strip
    const trough = new THREE.Mesh(new THREE.BoxGeometry(39.0, 2.2, 2.6), mats.matteBlackAnodized);
    trough.position.set(0, -15.4, 0);
    const gelStrip = new THREE.Mesh(new THREE.BoxGeometry(36.0, 0.55, 1.8), mats.dustCatcherGel);
    gelStrip.position.set(0, -14.2, 0);
    g.add(trough, gelStrip);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-mount-baffle-trough',
        74,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 18.85),
        new THREE.Vector3(0, 0, 86.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH75. Rear Shutter-to-IBIS Dynamic Clearance Guard Frame & Anti-Contact PTFE Bumpers
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision stainless rear guard mask maintaining 1.8mm safety clearance to 5-axis IBIS sensor stack
    const guardShape = createFrameShape(54.0, 40.0, 2.6, 38.6, 26.6, 1.0, 0, 0);
    const guardPlate = new THREE.Mesh(
      extrudeCentered(guardShape, 0.65, 0.05, 0.05, 16),
      mats.shutterChassis
    );
    g.add(guardPlate);

    // 4 corner low-friction white PTFE anti-contact bumpers facing -Z toward IBIS optical filter frame
    for (const [bx, by] of [
      [-21.8, 15.6],
      [21.8, 15.6],
      [-21.8, -15.6],
      [21.8, -15.6],
    ] as Array<[number, number]>) {
      const bumper = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(4.4, 3.2, 0.8), 0.72, 0.06, 0.06, 10),
        mats.zifIvoryPlastic
      );
      bumper.position.set(bx, by, -0.65);
      g.add(bumper);
    }

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-ibis-clearance-frame',
        75,
        '#0f766e',
        g,
        new THREE.Vector3(0, 0, 9.85),
        new THREE.Vector3(0, -24.0, -76.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH76. Dedicated Shutter Solenoid & Charge-Motor H-Bridge Driver IC & Stall-Detect Shunt
  // =========================================================================
  {
    const g = new THREE.Group();
    // Compact shutter power-driver interface sub-PCB seated just behind top-right ZIF tail (x=28.0, y=22.0)
    const drvPcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.4, 8.8, 1.0), 0.85, 0.05, 0.05, 10),
      mats.hdiMainboardPcb
    );
    drvPcb.position.set(28.0, 22.8, 0);

    // QFN dual H-bridge MOSFET driver IC
    const driverIc = new THREE.Mesh(new THREE.BoxGeometry(5.2, 5.2, 0.85), mats.icEpoxy);
    driverIc.position.set(25.2, 22.8, 0.85);

    // 2x 20mΩ precision metal-strip stall-current sense shunt resistors + yellow tantalum bulk cap
    for (const sy of [24.6, 21.0]) {
      const shunt = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 0.55), mats.stainlessMachined);
      shunt.position.set(32.0, sy, 0.7);
      g.add(shunt);
    }
    const bulkCap = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.8, 1.0), mats.tantalumCapYellow);
    bulkCap.position.set(20.8, 22.8, 0.9);

    g.add(drvPcb, driverIc, bulkCap);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-hbridge-driver-stage',
        76,
        '#16a34a',
        g,
        new THREE.Vector3(0, 0, 10.1),
        new THREE.Vector3(38.0, 52.0, -54.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH77. Individual Curtain-Speed Calibration 2D QR Tag & Factory Exposure-Timing Trim Table
  // =========================================================================
  {
    const g = new THREE.Group();
    // Laser-etched aluminum/polyimide calibration QR tag bonded cleanly onto lower-right front drive-bay cover
    const tagPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.6, 6.2, 0.6), 0.24, 0.02, 0.02, 8),
      mats.zifIvoryPlastic
    );
    tagPlate.position.set(28.4, -14.2, 0);
    g.add(tagPlate);

    // Pure geometric 2D matrix QR pattern (strictly zero text/letters — crisp micro square finder modules!)
    const finderCoords: Array<[number, number]> = [
      [24.4, -12.6],
      [27.8, -12.6],
      [24.4, -15.8],
    ];
    for (const [fx, fy] of finderCoords) {
      const sq = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 0.08), mats.matteBlackAnodized);
      sq.position.set(fx, fy, 0.16);
      sq.userData.noEdges = true;
      g.add(sq);
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if ((r + c) % 2 === 0 || (r === 1 && c === 2)) {
          const dot = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.08), mats.matteBlackAnodized);
          dot.position.set(29.8 + c * 1.15, -12.8 - r * 1.35, 0.16);
          dot.userData.noEdges = true;
          g.add(dot);
        }
      }
    }

    // Tiny companion gold-contact EEPROM calibration memory chip representation on tag edge
    const eepromDie = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 0.45), mats.icEpoxy);
    eepromDie.position.set(35.4, -14.2, 0.12);
    g.add(eepromDie);

    parts.push(
      finalizeStandaloneShutterAuditPart(
        'shutter-eeprom-cal-tag',
        77,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 18.45),
        new THREE.Vector3(-46.0, -40.0, 56.0),
        cp,
        0.28
      )
    );
  }

  return parts;
}
