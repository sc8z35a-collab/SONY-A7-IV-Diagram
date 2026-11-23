import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { MOUNT_DEEP_AUDIT_EXPLANATIONS } from './mountDeepAuditExplanations';

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

function finalizeMountDeepAuditPart(
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
    subsystem: 'mount',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: MOUNT_DEEP_AUDIT_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Phase 20B — 12 Standalone-Only Sony OEM 55mm Large-Diameter Lens Mount Deep-Audit Parts (M49–M60 -> 60 total).
 * Strictly omitted in whole-camera modes ('integrated' 305 / 'camera_body' 231); visible ONLY in standalone 'mount' mode!
 * Coordinates match mountParts.ts (flange z ≈ 31.6, throat z ≈ 25.0, BOLT_PITCH_R = 31.3, LOCK_PIN_R = 30.8).
 */
export function buildMountDeepAuditParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const BOLT_ANGLES_DEG = [0, 60, 120, 180, 240, 300];
  const BOLT_PITCH_R = 31.3;
  const LOCK_PIN_ANGLE_RAD = THREE.MathUtils.degToRad(-24);
  const LOCK_PIN_R = 30.8;
  const lockPinX = Math.cos(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;
  const lockPinY = Math.sin(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;

  // =========================================================================
  // M49. Sony OEM Front Mount Screw Orange Silicone Weather-Seal Micro O-Rings (6x)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const deg of BOLT_ANGLES_DEG) {
      const a = THREE.MathUtils.degToRad(deg);
      const bx = Math.cos(a) * BOLT_PITCH_R;
      const by = Math.sin(a) * BOLT_PITCH_R;
      const oRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.22, 0.34, 10, 20),
        mats.cinnabarAnodized
      );
      oRing.position.set(bx, by, 0);
      oRing.userData.noEdges = true;
      g.add(oRing);
    }

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-screw-orange-orings',
        49,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, 32.8),
        new THREE.Vector3(0, 32, 134),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M50. Sony OEM SH-1035 / SH-1036 Mount Peripheral Board, Silver EMI Shield & Protect Sheet
  // =========================================================================
  {
    const g = new THREE.Group();
    const flexArc = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(29.0, 34.4, THREE.MathUtils.degToRad(128), THREE.MathUtils.degToRad(218)), 0.32, 0.03, 0.03, 24),
      mats.polyimideFpc
    );
    const silverShield = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(29.8, 33.6, THREE.MathUtils.degToRad(142), THREE.MathUtils.degToRad(204)), 0.24, 0.02, 0.02, 20),
      mats.stainlessMachined
    );
    silverShield.position.z = -0.32;
    const protectSheet = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(29.4, 34.0, THREE.MathUtils.degToRad(136), THREE.MathUtils.degToRad(210)), 0.12, 0.01, 0.01, 20),
      mats.mylarInsulatorFilm
    );
    protectSheet.position.z = -0.58;
    // Gold test contacts along flex tail
    for (let i = 0; i < 6; i++) {
      const a = THREE.MathUtils.degToRad(148 + i * 9);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.5, 0.14), mats.goldPlating);
      pad.position.set(Math.cos(a) * 31.7, Math.sin(a) * 31.7, 0.2);
      pad.rotation.z = a;
      g.add(pad);
    }
    g.add(flexArc, silverShield, protectSheet);

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-sh1035-shield-board',
        50,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 21.8),
        new THREE.Vector3(-68, 22, -44),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M51. Sony OEM SW-1041 Mount Side Front Switch Flex Board & Protect Sheet
  // =========================================================================
  {
    const g = new THREE.Group();
    const swFlex = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(33.4, 37.8, THREE.MathUtils.degToRad(-56), THREE.MathUtils.degToRad(6)), 0.26, 0.02, 0.02, 22),
      mats.polyimideFpc
    );
    const swSheet = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(33.1, 38.1, THREE.MathUtils.degToRad(-58), THREE.MathUtils.degToRad(8)), 0.12, 0.01, 0.01, 22),
      mats.mylarInsulatorFilm
    );
    swSheet.position.z = -0.25;
    // Miniature tactile switch dome & gold FPC connector tail
    const tactSwitch = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 1.15), mats.icEpoxy);
    tactSwitch.position.set(Math.cos(LOCK_PIN_ANGLE_RAD) * 35.6, Math.sin(LOCK_PIN_ANGLE_RAD) * 35.6, 0.65);
    const domeCap = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.45, 12).rotateX(Math.PI / 2), mats.stainlessMachined);
    domeCap.position.set(Math.cos(LOCK_PIN_ANGLE_RAD) * 35.6, Math.sin(LOCK_PIN_ANGLE_RAD) * 35.6, 1.35);
    g.add(swFlex, swSheet, tactSwitch, domeCap);

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-sw1041-front-subboard',
        51,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 25.2),
        new THREE.Vector3(68, -42, 26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M52. E-Mount Multi-Layer Sandwich GF-PPS Inner Light-Baffle & Insulating Spacer Collar
  // =========================================================================
  {
    const g = new THREE.Group();
    const collar = new THREE.Mesh(
      extrudeCentered(createRingShape(33.6, 27.6), 1.65, 0.1, 0.1, 48),
      mats.mountPpsInsulator
    );
    g.add(collar);
    // 6 precision bolt-clearance relief ears + 4 spring-pocket notches around inner diameter
    for (const deg of BOLT_ANGLES_DEG) {
      const a = THREE.MathUtils.degToRad(deg);
      const bushing = new THREE.Mesh(
        extrudeCentered(createRingShape(2.25, 1.15), 1.85, 0.05, 0.05, 14),
        mats.matteBlackAnodized
      );
      bushing.position.set(Math.cos(a) * BOLT_PITCH_R, Math.sin(a) * BOLT_PITCH_R, 0);
      g.add(bushing);
    }

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-sandwich-inner-collar',
        52,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 29.6),
        new THREE.Vector3(0, 0, 88),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M53. Back-to-Back Direct 3-Point Sensor Datum Pillars & Brass Tilt Calibration Seats
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 heavy CNC back-to-back datum columns (120° apart) tying front mount directly to rear sensor IBIS base
    for (const deg of [90, 210, 330]) {
      const a = THREE.MathUtils.degToRad(deg);
      const px = Math.cos(a) * 32.8;
      const py = Math.sin(a) * 32.8;
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.6, 8.2, 18).rotateX(Math.PI / 2),
        mats.magnesiumCast
      );
      pillar.position.set(px, py, 0);
      const brassSeat = new THREE.Mesh(
        extrudeCentered(createRingShape(2.7, 1.1), 0.85, 0.04, 0.04, 16),
        mats.brassGear
      );
      brassSeat.position.set(px, py, -4.3);
      const frontDatum = new THREE.Mesh(
        extrudeCentered(createRingShape(2.5, 1.1), 0.55, 0.04, 0.04, 16),
        mats.stainlessMachined
      );
      frontDatum.position.set(px, py, 4.2);
      g.add(pillar, brassSeat, frontDatum);
    }

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-3point-sensor-pillars',
        53,
        '#ca8a04',
        g,
        new THREE.Vector3(0, 0, 17.6),
        new THREE.Vector3(0, -18, -76),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M54. Magnesium-Specific M1.6–0.65mm Coarse-Pitch Self-Threading Bosses & Gussets
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const deg of BOLT_ANGLES_DEG) {
      const a = THREE.MathUtils.degToRad(deg);
      const bx = Math.cos(a) * BOLT_PITCH_R;
      const by = Math.sin(a) * BOLT_PITCH_R;
      const boss = new THREE.Mesh(
        new THREE.CylinderGeometry(2.8, 3.2, 5.2, 16).rotateX(Math.PI / 2),
        mats.mountMgBulkhead
      );
      boss.position.set(bx, by, 0);
      // Coarse-pitch visual thread-bore liner inside boss
      const threadRing = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 1.1, 5.4, 12).rotateX(Math.PI / 2),
        mats.mountThreadLockBlue
      );
      threadRing.position.set(bx, by, 0);
      // Radial anti-strip stress gusset rib
      const gusset = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.25, 4.6), mats.magnesiumCast);
      gusset.position.set(Math.cos(a) * (BOLT_PITCH_R + 3.4), Math.sin(a) * (BOLT_PITCH_R + 3.4), -0.3);
      gusset.rotation.z = a;
      g.add(boss, threadRing, gusset);
    }

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-self-tap-bosses',
        54,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 25.8),
        new THREE.Vector3(0, 46, -14),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M55. E-Mount Pin 1–Pin 10 Hardware Short-Loop Presence Detect & 33 Ω SPI Resistors
  // =========================================================================
  {
    const g = new THREE.Group();
    // Curved gold short-loop trace bridging Pin 1 (leftmost) & Pin 10/12 (rightmost) + 6x 33 Ω SMD damping resistors
    const loopTrace = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(23.1, 24.0, -Math.PI * 0.67, -Math.PI * 0.33), 0.22, 0.02, 0.02, 22),
      mats.goldPlating
    );
    g.add(loopTrace);
    // End short-detect pads at Pin 1 & Pin 10
    for (const aEnd of [-Math.PI * 0.66, -Math.PI * 0.34]) {
      const detPad = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 0.55), mats.gMasterRedBadge);
      detPad.position.set(Math.cos(aEnd) * 23.6, Math.sin(aEnd) * 23.6, 0.25);
      detPad.rotation.z = aEnd + Math.PI / 2;
      g.add(detPad);
    }
    // 6 precision 0201 33-ohm SPI series damping resistors
    for (let i = 0; i < 6; i++) {
      const a = -Math.PI * 0.60 + (i / 5) * (Math.PI * 0.20);
      const resBody = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.45, 0.48), mats.icEpoxy);
      resBody.position.set(Math.cos(a) * 25.0, Math.sin(a) * 25.0, 0.28);
      resBody.rotation.z = a + Math.PI / 2;
      g.add(resBody);
    }

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-pin1-pin10-short-loop',
        55,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 24.6),
        new THREE.Vector3(-42, -56, -8),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M56. Detachable Snap-Connector Blue Mount-to-PCB Grounding Wire & Crimp Lug
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mount-side gold crimp ring lug at 120° boss
    const aLug = THREE.MathUtils.degToRad(120);
    const lx = Math.cos(aLug) * 32.8;
    const ly = Math.sin(aLug) * 32.8;
    const lug = new THREE.Mesh(
      extrudeCentered(createRingShape(2.3, 1.05), 0.36, 0.04, 0.04, 16),
      mats.goldPlating
    );
    lug.position.set(lx, ly, 0);
    // Blue ETFE insulated curved grounding lead sweeping cleanly toward mainboard (-Z)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(lx, ly, -0.3),
      new THREE.Vector3(lx - 5.5, ly + 2.5, -4.5),
      new THREE.Vector3(lx - 8.5, ly - 4.0, -10.0),
      new THREE.Vector3(lx - 6.0, ly - 11.5, -14.5),
    ]);
    const blueWire = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, 0.62, 10, false),
      mats.mountShimBlue
    );
    blueWire.userData.noEdges = true;
    // Repair-friendly white snap-in micro-connector at PCB end
    const snapPlug = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.4, 2.2), mats.zifIvoryPlastic);
    snapPlug.position.set(lx - 6.0, ly - 11.5, -15.2);
    g.add(lug, blueWire, snapPlug);

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-snap-ground-wire',
        56,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 23.0),
        new THREE.Vector3(-62, 54, -36),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M57. Release-Button Stainless Fulcrum Pivot Pin & Angled Cam-Ramp Slide Block
  // =========================================================================
  {
    const g = new THREE.Group();
    const pivotX = lockPinX + 3.4;
    const pivotY = lockPinY - 0.1;
    // Vertical centerless-ground stainless fulcrum pivot shaft
    const pivotPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 9.6, 14),
      mats.stainlessMachined
    );
    pivotPin.position.set(pivotX, pivotY, 0);
    // MoS2-lubricated angled POM cam-ramp slide block engaging the lock pin collar
    const camBlock = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(6.8, 3.6, 0.65), 2.8, 0.1, 0.1, 10),
      mats.pomGear
    );
    camBlock.position.set(pivotX - 1.2, pivotY, -0.4);
    camBlock.rotation.y = 0.24;
    // Brass wear bushing ring on pivot center
    const brassBush = new THREE.Mesh(
      new THREE.CylinderGeometry(1.55, 1.55, 3.2, 14),
      mats.brassGear
    );
    brassBush.position.set(pivotX, pivotY, 0);
    g.add(pivotPin, camBlock, brassBush);

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-rocker-pivot-shaft',
        57,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 26.2),
        new THREE.Vector3(74, -22, 46),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M58. Sony OEM 7-500-004-93 (631S #25) Matte-Black Light-Leak & Dust-Seal Tape
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision die-cut matte-black light-sealing tape arcs spanning contact FPC slot & upper shutter seam
    const lowerTape = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(23.8, 29.6, -Math.PI * 0.72, -Math.PI * 0.28), 0.18, 0.02, 0.02, 24),
      mats.mountVelvetBaffle
    );
    const upperTape = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(25.2, 29.8, Math.PI * 0.25, Math.PI * 0.75), 0.18, 0.02, 0.02, 24),
      mats.mountVelvetBaffle
    );
    upperTape.position.z = -1.2;
    g.add(lowerTape, upperTape);

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-631s-lightseal-tape',
        58,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 21.0),
        new THREE.Vector3(14, 52, -30),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M59. Stainless-to-Magnesium Anti-Galvanic Dielectric Barrier Washer & Passivated Seat
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultrathin perimeter PET/polyimide anti-galvanic dielectric ring isolating SUS304 from AZ91D Mg
    const barrierRing = new THREE.Mesh(
      extrudeCentered(createRingShape(34.5, 29.2), 0.26, 0.02, 0.02, 48),
      mats.mylarInsulatorFilm
    );
    // Thin olive/teal conversion-coated passivation seat trace directly behind it
    const chemSeat = new THREE.Mesh(
      extrudeCentered(createRingShape(34.8, 29.0), 0.18, 0.02, 0.02, 48),
      mats.dustCatcherGel
    );
    chemSeat.position.z = -0.28;
    g.add(barrierRing, chemSeat);

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-bayonet-anti-galvanic',
        59,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0, 28.4),
        new THREE.Vector3(-46, -34, 54),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M60. Internal Baffle Retaining Snap-Tabs (4x) & Anti-Rattle Micro-PORON Pads
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 screwless undercut snap-hook tabs + 4 micro-cellular PORON cushion strips anchoring the internal baffle
    const tabCoords: Array<[number, number, number]> = [
      [0, 15.6, 0],
      [0, -15.6, Math.PI],
      [21.4, 0, -Math.PI / 2],
      [-21.4, 0, Math.PI / 2],
    ];
    for (const [tx, ty, rotZ] of tabCoords) {
      const hook = new THREE.Group();
      hook.position.set(tx, ty, 0);
      hook.rotation.z = rotZ;

      const arm = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.25, 3.8), mats.mountPpsInsulator);
      const barb = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.0, 1.15), mats.mountPpsInsulator);
      barb.position.set(0, 0.65, -1.65);
      // Soft dark-grey micro-PORON anti-rattle foam pad
      const poronPad = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.72, 2.4), mats.lensFoamSeal);
      poronPad.position.set(0, -0.92, 0.2);

      hook.add(arm, barb, poronPad);
      g.add(hook);
    }
    // Thin rectangular alignment sub-frame connecting the 4 snap tabs
    const tieFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(42.2, 30.6, 2.2, 39.6, 28.2, 1.6), 0.55, 0.04, 0.04, 16),
      mats.matteBlackAnodized
    );
    tieFrame.position.z = 1.6;
    g.add(tieFrame);

    parts.push(
      finalizeMountDeepAuditPart(
        'mount-baffle-clip-tabs',
        60,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 22.4),
        new THREE.Vector3(24, 34, -22),
        cp,
        0.26
      )
    );
  }

  return parts;
}
