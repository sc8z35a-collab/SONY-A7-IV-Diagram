import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  createSpurGearGeometry,
  createTorsionSpringGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeStandaloneShutterMicroPart(
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
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

/**
 * Build 18 ultra-fine real-world standalone-only Focal-Plane Shutter sub-parts (SH40–SH57).
 * Shown ONLY in individual Shutter view ('shutter'); omitted in whole-camera views ('integrated', 'camera_body').
 */
export function buildShutterMicroParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const frameW = 74.0;
  const frameH = 54.0;
  const frameCenterX = 7.5;

  // =========================================================================
  // SH40. Auxiliary Shutter Base Plate & Keyhole-Slot Shank Mounts (US20020172519A1)
  // =========================================================================
  {
    const g = new THREE.Group();
    const auxShape = createFrameShape(frameW - 3.0, frameH - 3.0, 3.0, 38.4, 26.2, 0.8, -frameCenterX, 0);
    const auxPlate = new THREE.Mesh(
      extrudeCentered(auxShape, 0.55, 0.04, 0.04, 16),
      mats.shutterChassis
    );
    auxPlate.position.x = frameCenterX;
    g.add(auxPlate);

    // 3 corner keyhole slide-lock engagement tabs matching stepped shanks 1j/1k/1m
    for (const [kx, ky] of [
      [-23.5, 22.0],
      [38.5, 22.0],
      [-23.5, -22.0],
    ] as Array<[number, number]>) {
      const keyholeBoss = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.4, 0.72), mats.stainlessMachined);
      keyholeBoss.position.set(kx, ky, 0);
      const slotNotch = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.3, 0.78), mats.mountVelvetBaffle);
      slotNotch.position.set(kx + 0.8, ky, 0);
      slotNotch.userData.noEdges = true;
      g.add(keyholeBoss, slotNotch);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-aux-baseplate',
        40,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 11.8),
        new THREE.Vector3(0, 0, -32.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH41. Baseplate Arc-Shaped Drive Slots & Hardened Curtain Drive Pins + PTFE Collars
  // =========================================================================
  {
    const g = new THREE.Group();
    // Twin curved arc-slot guide frames & hardened pins traversing baseplate into blade chamber
    for (let i = 0; i < 2; i++) {
      const sy = i === 0 ? 7.2 : -7.2;
      const arcCurvePts: THREE.Vector3[] = [];
      for (let k = 0; k <= 16; k++) {
        const a = THREE.MathUtils.lerp(-0.62, 0.62, k / 16);
        arcCurvePts.push(new THREE.Vector3(24.0 + Math.cos(a) * 6.4 - 6.4, sy + Math.sin(a) * 6.4, 0));
      }
      const slotRail = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arcCurvePts), 20, 0.95, 8, false),
        mats.matteBlackAnodized
      );
      g.add(slotRail);

      // Hardened HRC62 steel drive pin projecting through slot + white PTFE anti-dust collar
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.72, 4.8, 16).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      pin.position.set(24.0, sy, 0.4);
      const ptfeCollar = new THREE.Mesh(
        new THREE.CylinderGeometry(1.18, 1.18, 2.2, 16).rotateX(Math.PI / 2),
        mats.zifIvoryPlastic
      );
      ptfeCollar.position.set(24.0, sy, 0.5);
      g.add(pin, ptfeCollar);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-drive-pins-slots',
        41,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 13.4),
        new THREE.Vector3(-36.0, 4.0, 4.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH42. Slit-Forming Master Curtain Blades (Carbon Spine Rib & Knife Edge)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 1st-curtain top slit edge master blade + 2nd-curtain bottom slit edge master blade
    for (const [by, bz, flip] of [
      [-2.8, 0.25, 1],
      [5.4, -0.55, -1],
    ] as Array<[number, number, number]>) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(40.2, 7.2, 0.16), mats.carbonFiberBlade);
      blade.position.set(0.5, by, bz);

      // 45° laser-beveled matte knife edge along the active slit boundary
      const knifeEdge = new THREE.Mesh(new THREE.BoxGeometry(40.2, 0.72, 0.1), mats.velvetFlockTrap);
      knifeEdge.position.set(0.5, by + flip * 3.55, bz);
      knifeEdge.rotation.x = flip * 0.45;

      // Longitudinal unidirectional 0° carbon stiffening spine rib
      const spineRib = new THREE.Mesh(new THREE.BoxGeometry(38.0, 0.95, 0.26), mats.tungstenLightShield);
      spineRib.position.set(0.5, by - flip * 1.4, bz + 0.08);

      g.add(blade, knifeEdge, spineRib);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-slit-edge-blades',
        42,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 15.55),
        new THREE.Vector3(0, 38.0, 38.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH43. Inter-Blade 40 μm Fluoropolymer Step-Spacer Washers (12x)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ringShape = new THREE.Shape();
    ringShape.absarc(0, 0, 1.55, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.68, 0, Math.PI * 2, true);
    ringShape.holes.push(hole);
    const washerGeo = extrudeCentered(ringShape, 0.16, 0.01, 0.01, 18);

    // 2 columns (main & sub link arm pivot points) x 6 stacked micro step spacers
    for (const wx of [18.8, 22.8]) {
      for (let k = 0; k < 6; k++) {
        const wy = -10.5 + k * 4.2;
        const w = new THREE.Mesh(washerGeo, k % 2 === 0 ? mats.zifIvoryPlastic : mats.mylarInsulatorFilm);
        w.position.set(wx, wy, (k % 2 === 0 ? 0.3 : -0.3));
        g.add(w);
      }
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-blade-spacers',
        43,
        '#f8fafc',
        g,
        new THREE.Vector3(0, 0, 14.5),
        new THREE.Vector3(-38.0, 28.0, 22.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH44. Lapped Pure-Iron Electromagnet Armature Pieces & Spherical Gimbal Pivots
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const ay of [11.2, 4.8]) {
      // Mirror-lapped SUY-0 pure iron armature block
      const ironPiece = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(7.2, 3.6, 0.45), 2.1, 0.08, 0.08, 12),
        mats.pureIronArmature
      );
      ironPiece.position.set(30.4, ay, 0);

      // Rear spherical self-aligning gimbal pivot ball & retaining stem
      const gimbalBall = new THREE.Mesh(new THREE.SphereGeometry(1.15, 14, 12), mats.stainlessMachined);
      gimbalBall.position.set(30.4, ay, -1.35);
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 3.4, 12).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      stem.position.set(30.4, ay, -2.5);

      g.add(ironPiece, gimbalBall, stem);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-armature-iron-pieces',
        44,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 12.7),
        new THREE.Vector3(56.0, 30.0, -18.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH45. Armature Over-Travel Compliance Compression Springs & Thrust Collar
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const ay of [11.2, 4.8]) {
      const spring = new THREE.Mesh(
        createHelicalSpringGeometry(1.05, 4.2, 6, 0.16),
        mats.mountSpringSteel
      );
      spring.position.set(30.4, ay, -2.0);
      spring.userData.noEdges = true;

      const seatWasher = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 0.45, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      seatWasher.position.set(30.4, ay, -4.2);

      const eRetainer = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.18, 8, 14), mats.titaniumRivet);
      eRetainer.position.set(30.4, ay, -4.6);
      eRetainer.userData.noEdges = true;

      g.add(spring, seatWasher, eRetainer);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-armature-bias-springs',
        45,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 12.5),
        new THREE.Vector3(58.0, 18.0, -24.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH46. Laminated Permalloy U-Core Yokes, Twin LCP Bobbins & 10 μm Mylar Anti-Stick Shims
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const ay of [11.2, 4.8]) {
      // Laminated Permalloy-78 U-core magnetic yoke
      const yokeBack = new THREE.Mesh(new THREE.BoxGeometry(7.6, 2.4, 1.6), mats.lensPermalloyShield);
      yokeBack.position.set(30.4, ay, 3.8);
      for (const sx of [-2.4, 2.4]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.2, 3.6), mats.lensPermalloyShield);
        leg.position.set(30.4 + sx, ay, 2.1);
        const bobbin = new THREE.Mesh(
          new THREE.CylinderGeometry(1.55, 1.55, 2.3, 18).rotateX(Math.PI / 2),
          mats.copperCoil
        );
        bobbin.position.set(30.4 + sx, ay, 2.1);
        const flangeF = new THREE.Mesh(new THREE.BoxGeometry(3.3, 3.0, 0.28), mats.mountPpsInsulator);
        flangeF.position.set(30.4 + sx, ay, 0.9);
        g.add(leg, bobbin, flangeF);
      }

      // 10 μm translucent amber Mylar anti-stiction non-magnetic pole shim
      const mylarShim = new THREE.Mesh(new THREE.BoxGeometry(7.2, 2.5, 0.14), mats.mylarInsulatorFilm);
      mylarShim.position.set(30.4, ay, 0.22);

      g.add(yokeBack, mylarShim);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-magnet-yokes-bobbins',
        46,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(46.0, 42.0, -32.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH47. Independent 1st/2nd Curtain Cocking Set Levers & Fast-Return Torsion Springs
  // =========================================================================
  {
    const g = new THREE.Group();
    for (let i = 0; i < 2; i++) {
      const sy = i === 0 ? 2.8 : -4.6;
      const lever = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(14.5, 2.8, 0.9), 0.95, 0.08, 0.08, 12),
        mats.linkArmSteel
      );
      lever.position.set(27.5, sy, i * 1.15 - 0.55);
      lever.rotation.z = i === 0 ? 0.22 : -0.26;

      // Sintered cam-follower roller boss
      const roller = new THREE.Mesh(
        new THREE.CylinderGeometry(1.65, 1.65, 1.35, 18).rotateX(Math.PI / 2),
        mats.brassGear
      );
      roller.position.set(33.8, sy + (i === 0 ? 1.4 : -1.6), i * 1.15 - 0.55);

      // Coaxial fast-return torsion spring
      const retSpring = new THREE.Mesh(
        createTorsionSpringGeometry(1.85, 1.6, 3.5, 0.2, 4.5),
        mats.mountSpringSteel
      );
      retSpring.position.set(21.2, sy - (i === 0 ? 1.2 : -1.2), i * 1.15 - 0.55);
      retSpring.userData.noEdges = true;

      g.add(lever, roller, retSpring);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-set-levers',
        47,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 12.8),
        new THREE.Vector3(56.0, -2.0, 8.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH48. Floating Drive Coupling Shaft (Sony Ref.457 MB CH FLOATING SHAFT 5600)
  // =========================================================================
  {
    const g = new THREE.Group();
    const shaftCore = new THREE.Mesh(
      new THREE.CylinderGeometry(1.45, 1.45, 11.2, 18).rotateZ(Math.PI / 2),
      mats.pomGear
    );
    shaftCore.position.set(37.2, -13.5, 0);

    // Oldham / cross-dog floating drive couplers at both ends absorbing ±0.4 mm offset
    for (const sx of [31.8, 42.6]) {
      const dogHub = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 2.6, 2.2, 18).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      dogHub.position.set(sx, -13.5, 0);
      const dogTab = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.6, 1.3), mats.brassGear);
      dogTab.position.set(sx + (sx < 37 ? -1.1 : 1.1), -13.5, 0);
      g.add(dogHub, dogTab);
    }

    g.add(shaftCore);

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-mb-floating-shaft',
        48,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(58.0, -18.0, -14.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH49. Modular Shutter Charge Gearbox Housing (Sony Ref.458 MB CHARGE UNIT 5600)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sealed modular metal/GF-PPS gearbox box mounted at +X flank of AFE-3360
    const boxBody = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.8, 22.4, 2.2), 7.8, 0.2, 0.2, 14),
      mats.magnesiumCast
    );
    boxBody.position.set(43.5, -14.0, 0);
    const stampedLid = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(15.6, 21.2, 1.8), 0.75, 0.08, 0.08, 14),
      mats.stainlessMachined
    );
    stampedLid.position.set(43.5, -14.0, 4.15);

    // 3 Sony Ref.461 M1.6x4.5 Charge Unit Fixed shoulder screws
    for (const [bx, by] of [
      [37.2, -5.2],
      [49.8, -5.2],
      [43.5, -23.0],
    ] as Array<[number, number]>) {
      const scr = createPrecisionScrew(1.15, 0.45, 4.5, mats.stainlessMachined);
      scr.position.set(bx, by, 4.6);
      g.add(scr);
    }

    // 2-pin motor solder pads & pigtail connector boss
    const connBlock = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.8, 3.2), mats.zifIvoryPlastic);
    connBlock.position.set(43.5, -25.2, 0);

    g.add(boxBody, stampedLid, connBlock);

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-mb-charge-housing',
        49,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 12.2),
        new THREE.Vector3(64.0, -28.0, -32.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH50. Shutter Acoustic Damping Cushion Sheet (Sony Ref.459 MB CUSHION SHEET 5400)
  // =========================================================================
  {
    const g = new THREE.Group();
    const cushionShape = createFrameShape(frameW - 1.4, frameH - 1.4, 3.2, 41.2, 29.2, 1.8, -frameCenterX, 0);
    const cushionMesh = new THREE.Mesh(
      extrudeCentered(cushionShape, 0.85, 0.08, 0.08, 16),
      mats.butylDamperRubber
    );
    cushionMesh.position.x = frameCenterX;
    g.add(cushionMesh);

    // Upper & lower dense urethane acoustic damping ribs tuned to 1–4 kHz shutter slap
    for (const sy of [-23.4, 23.4]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(44.0, 3.2, 0.65), mats.lensFoamSeal);
      rib.position.set(2.0, sy, 0.65);
      g.add(rib);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-mb-cushion-sheet',
        50,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 18.0),
        new THREE.Vector3(0, 0, 70.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // SH51. Arc-Slot Terminal Chlorobutyl Rubber Pin-Stopper Bushings (4x)
  // =========================================================================
  {
    const g = new THREE.Group();
    const stopPositions: Array<[number, number]> = [
      [21.6, 13.0],
      [21.6, 1.4],
      [21.6, -1.4],
      [21.6, -13.0],
    ];
    for (const [sx, sy] of stopPositions) {
      // Hollow cylindrical high-hysteresis chlorobutyl bumper
      const bumper = new THREE.Mesh(
        new THREE.CylinderGeometry(1.65, 1.65, 2.8, 18).rotateX(Math.PI / 2),
        mats.butylDamperRubber
      );
      bumper.position.set(sx, sy, 0);
      const innerCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 3.2, 12).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      innerCore.position.set(sx, sy, 0);
      g.add(bumper, innerCore);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-stopper-rubbers',
        51,
        '#7c2d12',
        g,
        new THREE.Vector3(0, 0, 13.1),
        new THREE.Vector3(-44.0, -26.0, -4.0),
        cp,
        0.3
      )
    );
  }

  // =========================================================================
  // SH52. Factory Curtain-Speed Calibration Micro-Ratchet Wheels & Lock Pawls
  // =========================================================================
  {
    const g = new THREE.Group();
    const rGeo = createSpurGearGeometry(24, 3.3, 1.15, 1.1);
    for (const ry of [6.5, -2.5]) {
      const wheel = new THREE.Mesh(rGeo, mats.brassGear);
      wheel.position.set(27.0, ry, 0);

      // Spring-steel anti-backdrive locking pawl engaging ratchet tooth
      const pawl = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.1, 0.85), mats.mountSpringSteel);
      pawl.position.set(31.8, ry + 2.4, 0.1);
      pawl.rotation.z = -0.42;

      // Factory blue calibration tamper seal dot
      const sealDot = new THREE.Mesh(new THREE.SphereGeometry(0.65, 10, 8), mats.mountThreadLockBlue);
      sealDot.position.set(29.8, ry + 1.8, 0.72);
      sealDot.userData.noEdges = true;

      g.add(wheel, pawl, sealDot);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-worm-lock-pawls',
        52,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 13.3),
        new THREE.Vector3(54.0, 14.0, 18.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH53. Blade-Chamber Triboelectric Carbon-Fiber ESD Bleed Brush & Ground Leaf
  // =========================================================================
  {
    const g = new THREE.Group();
    // Conductive carbon-fiber brush strip wiping blade roots + BeCu grounding leaf to mid-plate
    const holderBar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 24.5, 0.9), mats.stainlessMachined);
    holderBar.position.set(-20.4, 0, 0);
    g.add(holderBar);

    for (let i = 0; i < 14; i++) {
      const bristle = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.55, 0.25), mats.pyroGraphite);
      bristle.position.set(-18.2, -10.5 + i * 1.62, 0);
      bristle.userData.noEdges = true;
      g.add(bristle);
    }

    // BeCu ground spring tab connecting SH08 intermediate steel plate to body chassis
    const gndLeaf = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.2, 0.28), mats.beCuSpring);
    gndLeaf.position.set(-23.2, 8.0, -0.35);
    gndLeaf.rotation.y = 0.28;
    g.add(gndLeaf);

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-esd-ground-brush',
        53,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 14.3),
        new THREE.Vector3(-44.0, 14.0, -12.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH54. Precision Stepped Blade-Chamber Standoff Shanks (1j/1k/1m) & PTFE Thrust Washers
  // =========================================================================
  {
    const g = new THREE.Group();
    const postCoords: Array<[number, number]> = [
      [-23.5, 22.0],
      [38.5, 22.0],
      [-23.5, -22.0],
    ];
    for (const [px, py] of postCoords) {
      // Stepped stainless precision standoff pillar defining exact 0.55mm front/rear blade chambers
      const baseStep = new THREE.Mesh(
        new THREE.CylinderGeometry(1.85, 1.85, 2.6, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      baseStep.position.set(px, py, 0);
      const midStep = new THREE.Mesh(
        new THREE.CylinderGeometry(1.35, 1.35, 4.4, 18).rotateX(Math.PI / 2),
        mats.pureIronArmature
      );
      midStep.position.set(px, py, 0);
      const grooveCollar = new THREE.Mesh(
        new THREE.TorusGeometry(1.15, 0.22, 8, 18),
        mats.titaniumRivet
      );
      grooveCollar.position.set(px, py, -2.0);
      grooveCollar.userData.noEdges = true;

      // Twin 50 μm PTFE thrust washers
      for (const wz of [-1.2, 1.2]) {
        const w = new THREE.Mesh(
          new THREE.CylinderGeometry(2.2, 2.2, 0.22, 18).rotateX(Math.PI / 2),
          mats.zifIvoryPlastic
        );
        w.position.set(px, py, wz);
        g.add(w);
      }

      g.add(baseStep, midStep, grooveCollar);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-guide-posts-washers',
        54,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 14.0),
        new THREE.Vector3(-34.0, -34.0, 24.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH55. Charge-Motor Brass Worm Screw & Self-Locking Helical POM Worm Wheel
  // =========================================================================
  {
    const g = new THREE.Group();
    // Vertical brass worm screw shaft coupled directly to charge motor rotor
    const wormShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.25, 9.6, 16),
      mats.brassGear
    );
    wormShaft.position.set(36.8, -16.8, 0);
    g.add(wormShaft);

    // Helical brass worm threads wrapping shaft
    const wormThread = new THREE.Mesh(
      createHelicalSpringGeometry(1.55, 7.6, 6.5, 0.3).rotateX(Math.PI / 2),
      mats.brassGear
    );
    wormThread.position.set(36.8, -16.8, 0);
    wormThread.userData.noEdges = true;
    g.add(wormThread);

    // Meshing quiet POM helical worm wheel (15:1 self-locking ratio)
    const wormWheel = new THREE.Mesh(
      createSpurGearGeometry(26, 4.8, 2.2, 1.2),
      mats.pomGear
    );
    wormWheel.position.set(30.4, -16.8, 0);
    g.add(wormWheel);

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-worm-gear-stage',
        55,
        '#ca8a04',
        g,
        new THREE.Vector3(0, 0, 12.1),
        new THREE.Vector3(50.0, -38.0, -20.0),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // SH56. Dual-Branch Shutter FPC Gold ZIF Terminations & Blue FR-4 Stiffeners
  // =========================================================================
  {
    const g = new THREE.Group();
    // Branch A: 16-pin high-current solenoid/motor ZIF tail + Branch B: 8-pin optical sensor ZIF tail
    const specs: Array<{ x: number; y: number; w: number; pins: number }> = [
      { x: 26.0, y: 24.8, w: 11.4, pins: 12 },
      { x: 11.5, y: 24.8, w: 7.4, pins: 8 },
    ];
    for (const sp of specs) {
      const fpcTail = new THREE.Mesh(new THREE.BoxGeometry(sp.w, 8.6, 0.22), mats.polyimideFpc);
      fpcTail.position.set(sp.x, sp.y, 0);
      const fr4Stiff = new THREE.Mesh(new THREE.BoxGeometry(sp.w + 0.6, 3.8, 0.42), mats.mountShimBlue);
      fr4Stiff.position.set(sp.x, sp.y + 2.4, -0.28);
      g.add(fpcTail, fr4Stiff);

      for (let i = 0; i < sp.pins; i++) {
        const px = sp.x - sp.w * 0.42 + (i / Math.max(1, sp.pins - 1)) * sp.w * 0.84;
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.42, 2.8, 0.08), mats.goldPlating);
        pad.position.set(px, sp.y + 2.6, 0.16);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }

    // Strain-relief routing clip bridging both branches
    const clip = new THREE.Mesh(new THREE.BoxGeometry(22.5, 2.2, 1.4), mats.matteBlackAnodized);
    clip.position.set(19.5, 20.6, 0);
    g.add(clip);

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-fpc-zif-stiffener',
        56,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, 10.9),
        new THREE.Vector3(24.0, 38.0, -46.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // SH57. 3-Point Precision Shoulder Mounting Bolts (Sony Ref.455/462 M2 NEW TRUSTER)
  // =========================================================================
  {
    const g = new THREE.Group();
    const boltCoords: Array<[number, number, number]> = [
      [-25.0, 22.5, 5.0],
      [40.0, 22.5, 5.0],
      [-25.0, -22.5, 4.0],
    ];
    for (const [bx, by, len] of boltCoords) {
      const bolt = createPrecisionScrew(1.85, 0.82, len, mats.stainlessMachined);
      bolt.rotation.y = Math.PI; // Head facing -Z rear chassis mounting side
      bolt.position.set(bx, by, 0);

      // Integral P2 split spring-lock washer + shoulder limit collar
      const semsWasher = new THREE.Mesh(
        new THREE.TorusGeometry(1.95, 0.34, 8, 18),
        mats.mountSpringSteel
      );
      semsWasher.position.set(bx, by, -0.15);
      semsWasher.userData.noEdges = true;

      const shoulderSleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(1.38, 1.38, 2.2, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      shoulderSleeve.position.set(bx, by, 1.2);

      const lockPatch = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05, 1.05, 1.6, 12).rotateX(Math.PI / 2),
        mats.mountThreadLockBlue
      );
      lockPatch.position.set(bx, by, len - 1.2);
      lockPatch.userData.noEdges = true;

      g.add(bolt, semsWasher, shoulderSleeve, lockPatch);
    }

    parts.push(
      finalizeStandaloneShutterMicroPart(
        'shutter-calibration-bolts',
        57,
        '#3b82f6',
        g,
        new THREE.Vector3(0, 0, 9.3),
        new THREE.Vector3(0, 0, -68.0),
        cp,
        0.28
      )
    );
  }

  return parts;
}
