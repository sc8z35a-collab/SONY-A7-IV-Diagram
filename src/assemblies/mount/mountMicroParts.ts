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
import { MOUNT_MICRO_EXPLANATIONS } from './mountMicroExplanations';

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

function finalizeStandaloneMountMicroPart(
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
    explanation: MOUNT_MICRO_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Build 16 ultra-fine real-world standalone-only Mount Unit sub-parts (M27–M42).
 * Shown ONLY in individual Mount view ('mount'); omitted in whole-camera views ('integrated', 'camera_body').
 */
export function buildMountMicroParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const LOCK_PIN_ANGLE_RAD = THREE.MathUtils.degToRad(-24);
  const LOCK_PIN_R = 30.8;
  const lockPinX = Math.cos(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;
  const lockPinY = Math.sin(LOCK_PIN_ANGLE_RAD) * LOCK_PIN_R;

  // =========================================================================
  // M27: Iconic Anodized Cinnabar Aluminum Mount Accent Bezel Collar
  // =========================================================================
  const cinnabarGroup = new THREE.Group();
  {
    const outerCollar = new THREE.Mesh(
      extrudeCentered(createRingShape(36.4, 34.45), 2.1, 0.16, 0.14, 64),
      mats.cinnabarAnodized
    );
    cinnabarGroup.add(outerCollar);

    // Inner rear stepped retention lip seating cleanly onto the front cabinet opening
    const stepLip = new THREE.Mesh(
      extrudeCentered(createRingShape(36.9, 35.6), 0.75, 0.06, 0.06, 64),
      mats.cinnabarAnodized
    );
    stepLip.position.z = -1.05;
    cinnabarGroup.add(stepLip);
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-cinnabar-ring',
      27,
      '#d95b26',
      cinnabarGroup,
      new THREE.Vector3(0, 0, 30.9),
      new THREE.Vector3(0, 0, 82),
      cp,
      0.28
    )
  );

  // =========================================================================
  // M28: High-Contrast Ceramic-Polymer Lens Mounting Index Stud & D-Cut Sleeve
  // =========================================================================
  const indexGroup = new THREE.Group();
  {
    const idxAngle = THREE.MathUtils.degToRad(104);
    const ix = Math.cos(idxAngle) * 32.0;
    const iy = Math.sin(idxAngle) * 32.0;

    // White ceramic-polymer dome stud protruding +0.08 mm above flange face
    const whiteStud = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.15, 2.2, 20).rotateX(Math.PI / 2),
      mats.zifIvoryPlastic
    );
    whiteStud.position.set(ix, iy, 0);
    const domeTip = new THREE.Mesh(new THREE.SphereGeometry(1.12, 16, 12), mats.zifIvoryPlastic);
    domeTip.scale.set(1, 1, 0.35);
    domeTip.position.set(ix, iy, 1.1);
    domeTip.userData.noEdges = true;

    // Rear anti-rotation D-cut press-fit steel collar & staking flange
    const pressCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(1.75, 1.85, 0.85, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    pressCollar.position.set(ix, iy, -1.15);

    // Secondary red tactile alignment pip at 12-o'clock reference
    const redPip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 1.9, 18).rotateX(Math.PI / 2),
      mats.mountRedIndexDot
    );
    redPip.position.set(0, 32.2, -0.05);

    indexGroup.add(whiteStud, domeTip, pressCollar, redPip);
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-index-inlay',
      28,
      '#f8fafc',
      indexGroup,
      new THREE.Vector3(0, 0, 31.85),
      new THREE.Vector3(-28, 34, 80),
      cp,
      0.3
    )
  );

  // =========================================================================
  // M29: Split Secondary Bayonet Leaf Spring Plate (Sony MB N PLATE SP2) & Bias Shims
  // =========================================================================
  const splitSp2Group = new THREE.Group();
  {
    // Upper asymmetric spring arc (clearing 6-o'clock contact block & 4-o'clock lock pin!)
    const arcUpper = createArcSectorShape(
      27.9,
      32.1,
      THREE.MathUtils.degToRad(24),
      THREE.MathUtils.degToRad(168)
    );
    const sp2Main = new THREE.Mesh(
      extrudeCentered(arcUpper, 0.5, 0.04, 0.04, 40),
      mats.mountSpringSteel
    );
    splitSp2Group.add(sp2Main);

    // 2 raised high-preload cantilever spring waves compensating heavy telephoto cantilever torque
    for (const deg of [62, 128]) {
      const a = THREE.MathUtils.degToRad(deg);
      const wave = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.2, 0.45), mats.beCuSpring);
      wave.position.set(Math.cos(a) * 29.8, Math.sin(a) * 29.8, 0.42);
      wave.rotation.z = a + Math.PI / 2;
      wave.rotation.x = 0.14;
      splitSp2Group.add(wave);
    }

    // Blue-tempered 0.05 mm cantilever bias shim tabs under SP2 tips
    for (const deg of [32, 160]) {
      const a = THREE.MathUtils.degToRad(deg);
      const shim = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.0, 0.25), mats.mountShimBlue);
      shim.position.set(Math.cos(a) * 30.0, Math.sin(a) * 30.0, -0.35);
      shim.rotation.z = a;
      splitSp2Group.add(shim);
    }
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-split-leaf-sp2',
      29,
      '#64748b',
      splitSp2Group,
      new THREE.Vector3(0, 0, 27.8),
      new THREE.Vector3(-38, -2, 38),
      cp,
      0.28
    )
  );

  // =========================================================================
  // M30: Precision Concentricity Locating Dowel Pin (Sony MB N PIN H) & Datum Sleeve
  // =========================================================================
  const pinHGroup = new THREE.Group();
  {
    // Twin h6 ground stainless locating dowels at 10-o'clock and 7-o'clock datum bosses
    for (const deg of [150, 212]) {
      const a = THREE.MathUtils.degToRad(deg);
      const px = Math.cos(a) * 31.3;
      const py = Math.sin(a) * 31.3;

      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(1.15, 1.15, 7.6, 18).rotateX(Math.PI / 2),
        mats.pureIronArmature
      );
      pin.position.set(px, py, 0);

      const chamferTip = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 1.15, 0.8, 18).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      chamferTip.position.set(px, py, 4.1);

      const datumBush = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.1, 3.2, 18).rotateX(Math.PI / 2),
        mats.brassGear
      );
      datumBush.position.set(px, py, -1.6);

      pinHGroup.add(pin, chamferTip, datumBush);
    }
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-locating-pin-h',
      30,
      '#94a3b8',
      pinHGroup,
      new THREE.Vector3(0, 0, 26.8),
      new THREE.Vector3(-38, -24, 28),
      cp,
      0.3
    )
  );

  // =========================================================================
  // M31: Interlocking Twin-Shell LCP Contact Carrier (Sony MB N HOLDER A & B)
  // =========================================================================
  const holderABGroup = new THREE.Group();
  {
    const a0 = THREE.MathUtils.degToRad(-127);
    const a1 = THREE.MathUtils.degToRad(-53);

    // Front shell (Holder A) with 12 precision pin alignment bores
    const shellA = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(23.1, 27.1, a0, a1), 2.1, 0.1, 0.1, 32),
      mats.mountPpsInsulator
    );
    shellA.position.z = 0.9;
    holderABGroup.add(shellA);

    // Rear snap-locking shell (Holder B)
    const shellB = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(23.0, 27.2, a0 + 0.04, a1 - 0.04), 1.8, 0.08, 0.08, 32),
      mats.matteBlackAnodized
    );
    shellB.position.z = -1.25;
    holderABGroup.add(shellB);

    // 4 molded snap-claw latches joining Holder A & B cleanly
    for (const deg of [-124, -102, -78, -56]) {
      const a = THREE.MathUtils.degToRad(deg);
      const claw = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.4, 3.2), mats.pomGear);
      claw.position.set(Math.cos(a) * 27.3, Math.sin(a) * 27.3, -0.1);
      claw.rotation.z = a;
      holderABGroup.add(claw);
    }
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-contact-holder-ab',
      31,
      '#334155',
      holderABGroup,
      new THREE.Vector3(0, 0, 25.8),
      new THREE.Vector3(-26, -34, 34),
      cp,
      0.28
    )
  );

  // =========================================================================
  // M32: Contact Block M1.7x4.0 Mounting Screws & Anti-Latch-Up ESD Ground Spring
  // =========================================================================
  const contactScrewsGroup = new THREE.Group();
  {
    for (const deg of [-130, -50]) {
      const a = THREE.MathUtils.degToRad(deg);
      const sx = Math.cos(a) * 26.8;
      const sy = Math.sin(a) * 26.8;

      const scr = createPrecisionScrew(1.35, 0.55, 4.0, mats.stainlessMachined);
      scr.position.set(sx, sy, 0.6);
      contactScrewsGroup.add(scr);

      const washer = new THREE.Mesh(
        new THREE.TorusGeometry(1.45, 0.24, 8, 16),
        mats.beCuSpring
      );
      washer.position.set(sx, sy, 0.35);
      washer.userData.noEdges = true;
      contactScrewsGroup.add(washer);
    }

    // US4637704A ESD conductive grounding bridge spring tying pin-GND directly to mount ring
    const esdBridge = new THREE.Mesh(new THREE.BoxGeometry(9.6, 1.35, 0.32), mats.goldPlating);
    esdBridge.position.set(7.8, -25.6, -0.4);
    esdBridge.rotation.z = 0.28;
    const esdLeaf = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.8, 0.28), mats.beCuSpring);
    esdLeaf.position.set(12.2, -24.2, 0.35);
    esdLeaf.rotation.y = 0.35;
    contactScrewsGroup.add(esdBridge, esdLeaf);
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-contact-screws',
      32,
      '#eab308',
      contactScrewsGroup,
      new THREE.Vector3(0, 0, 24.6),
      new THREE.Vector3(24, -36, 26),
      cp,
      0.28
    )
  );

  // =========================================================================
  // M33: Independent Lens-Release Button Return Spring (Sony MB LL BUTTON SPRING)
  // =========================================================================
  const llSpringGroup = new THREE.Group();
  {
    const btnX = lockPinX + 11.2;
    const btnY = lockPinY;

    const btnSpring = new THREE.Mesh(
      createHelicalSpringGeometry(1.85, 5.2, 7, 0.25),
      mats.mountSpringSteel
    );
    btnSpring.position.set(btnX, btnY, -1.6);
    btnSpring.userData.noEdges = true;

    // Low-friction POM cylindrical guide sleeve & grease groove collar
    const pomSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(2.85, 2.85, 4.8, 22).rotateX(Math.PI / 2),
      mats.pomGear
    );
    pomSleeve.position.set(btnX, btnY, -2.0);

    const endSeat = new THREE.Mesh(
      new THREE.CylinderGeometry(3.3, 3.3, 0.75, 22).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    endSeat.position.set(btnX, btnY, -4.4);

    llSpringGroup.add(btnSpring, pomSleeve, endSeat);
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-ll-button-spring',
      33,
      '#94a3b8',
      llSpringGroup,
      new THREE.Vector3(0, 0, 27.2),
      new THREE.Vector3(46, 8, 52),
      cp,
      0.28
    )
  );

  // =========================================================================
  // M34: Lock-Pin Retention E-Clip Circlip & Oil-Impregnated Dust Wiper Felt Ring
  // =========================================================================
  const eclipGroup = new THREE.Group();
  {
    // JIS E-clip circlip seated on rear groove of lock pin shaft
    const eShape = createArcSectorShape(
      1.15,
      2.65,
      THREE.MathUtils.degToRad(32),
      THREE.MathUtils.degToRad(328)
    );
    const eClip = new THREE.Mesh(
      extrudeCentered(eShape, 0.45, 0.04, 0.04, 24),
      mats.mountSpringSteel
    );
    eClip.position.set(lockPinX, lockPinY, -2.4);

    // Thrust micro-washer ahead of E-clip
    const thrustWasher = new THREE.Mesh(
      extrudeCentered(createRingShape(2.45, 1.35), 0.3, 0.02, 0.02, 24),
      mats.brassGear
    );
    thrustWasher.position.set(lockPinX, lockPinY, -1.8);

    // Oil-impregnated micro-felt dust wiper ring sealing front bore entry
    const feltWiper = new THREE.Mesh(
      new THREE.TorusGeometry(1.72, 0.46, 10, 24),
      mats.lensFoamSeal
    );
    feltWiper.position.set(lockPinX, lockPinY, 2.2);
    feltWiper.userData.noEdges = true;

    eclipGroup.add(eClip, thrustWasher, feltWiper);
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-lock-eclip-retainer',
      34,
      '#d97706',
      eclipGroup,
      new THREE.Vector3(0, 0, 25.6),
      new THREE.Vector3(44, -22, 38),
      cp,
      0.3
    )
  );

  // =========================================================================
  // M35: Mount-Flank EMI Shield Block (Sony Ref.564 MB JACK SHIELD BLOCK 5800)
  // =========================================================================
  const jackShieldGroup = new THREE.Group();
  {
    // Stamped nickel-silver L-shaped EMI partition wall on +X port flank of mount frame
    const mainWall = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(6.4, 34.0, 1.4), 11.5, 0.12, 0.12, 12),
      mats.emiShieldCan
    );
    mainWall.position.set(36.8, -1.0, 0);

    const sideFlange = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.0, 28.0, 1.2), 1.3, 0.08, 0.08, 12),
      mats.emiShieldCan
    );
    sideFlange.position.set(33.2, -1.0, -5.2);

    // Twin M1.7x3.5 grounding bolts + BeCu contact fingers
    for (const sy of [-12.0, 10.5]) {
      const scr = createPrecisionScrew(1.2, 0.48, 3.5, mats.stainlessMachined);
      scr.position.set(36.8, sy, 6.0);
      jackShieldGroup.add(scr);

      const finger = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.2, 0.32), mats.beCuSpring);
      finger.position.set(40.2, sy * 0.55, 0);
      finger.rotation.y = 0.25;
      jackShieldGroup.add(finger);
    }

    jackShieldGroup.add(mainWall, sideFlange);
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-jack-shield-block',
      35,
      '#cbd5e1',
      jackShieldGroup,
      new THREE.Vector3(0, 0, 22.2),
      new THREE.Vector3(46, 4, -8),
      cp,
      0.28
    )
  );

  // =========================================================================
  // M36: Rear Mount Light-Tight Mask Sheet & Tape (Sony Ref.566 / 567 MB MASK SHEET)
  // =========================================================================
  const maskSheetGroup = new THREE.Group();
  {
    // Ultra-thin die-cut OD>6 matte-black PC mask frame sealing rear mount box openings
    const maskShape = createRoundedRectShape(70.5, 55.2, 4.2);
    const apertureHole = new THREE.Path();
    apertureHole.absarc(0, 0, 24.4, 0, Math.PI * 2, true);
    maskShape.holes.push(apertureHole);

    const maskFilm = new THREE.Mesh(
      extrudeCentered(maskShape, 0.24, 0.02, 0.02, 40),
      mats.matteBlackAnodized
    );
    maskSheetGroup.add(maskFilm);

    // Pressure-sensitive black double-sided sealing adhesive tape strips (MB MASK SHEET TAPE)
    for (const [tx, ty, tw, th] of [
      [0, 25.4, 48.0, 2.6],
      [0, -25.4, 48.0, 2.6],
      [-32.5, 0, 2.6, 36.0],
      [32.5, 0, 2.6, 36.0],
    ] as Array<[number, number, number, number]>) {
      const tape = new THREE.Mesh(new THREE.BoxGeometry(tw, th, 0.18), mats.mylarInsulatorFilm);
      tape.position.set(tx, ty, 0.22);
      maskSheetGroup.add(tape);
    }
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-mask-sheet-tape',
      36,
      '#1e293b',
      maskSheetGroup,
      new THREE.Vector3(0, 0, 19.1),
      new THREE.Vector3(-40, 14, -18),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M37: BL Flexible Board Adhesive Stiffener Sheet & Black Routing Tape (Sony 631S)
  // =========================================================================
  const blTapeGroup = new THREE.Group();
  {
    // Curved matte-black Kapton/polyester retention tape anchoring BL-FPC along bottom mount arch
    const tapeArc = new THREE.Mesh(
      extrudeCentered(
        createArcSectorShape(27.2, 31.6, THREE.MathUtils.degToRad(-122), THREE.MathUtils.degToRad(-58)),
        0.22,
        0.02,
        0.02,
        28
      ),
      mats.matteBlackAnodized
    );
    blTapeGroup.add(tapeArc);

    // Downward FR-4 blue stiffener tab & ZIF tail routing clamp
    const tailTape = new THREE.Mesh(new THREE.BoxGeometry(14.5, 11.2, 0.24), mats.mylarInsulatorFilm);
    tailTape.position.set(0, -33.2, -3.5);
    tailTape.rotation.x = 0.62;
    const zifStiff = new THREE.Mesh(new THREE.BoxGeometry(13.2, 4.8, 0.52), mats.mountShimBlue);
    zifStiff.position.set(0, -37.5, -7.8);
    zifStiff.rotation.x = Math.PI / 2;

    // 2 alignment boss rings
    for (const bx of [-11.5, 11.5]) {
      const boss = new THREE.Mesh(
        new THREE.TorusGeometry(1.1, 0.28, 8, 14),
        mats.brassGear
      );
      boss.position.set(bx, -26.8, 0.15);
      boss.userData.noEdges = true;
      blTapeGroup.add(boss);
    }

    blTapeGroup.add(tailTape, zifStiff);
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-bl-fpc-adhesive',
      37,
      '#b45309',
      blTapeGroup,
      new THREE.Vector3(0, 0, 22.0),
      new THREE.Vector3(-24, -40, 6),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M38: Perimeter Labyrinth Capillary-Break Drainage Channel & Micro-Foam Seal
  // =========================================================================
  const drainGroup = new THREE.Group();
  {
    // Stepped labyrinth capillary-break drainage ring behind flange perimeter
    const channelRing = new THREE.Mesh(
      extrudeCentered(createRingShape(36.0, 33.4), 1.35, 0.08, 0.08, 60),
      mats.mountMgBulkhead
    );
    drainGroup.add(channelRing);

    // Hydrophobic closed-cell micro-foam secondary ring seated in channel groove
    const foamRing = new THREE.Mesh(
      new THREE.TorusGeometry(34.7, 0.58, 12, 60),
      mats.lensFoamSeal
    );
    foamRing.position.z = 0.65;
    foamRing.userData.noEdges = true;
    drainGroup.add(foamRing);

    // Bottom 6-o'clock gravity water drain relief notch accent
    const drainNotch = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 1.5), mats.epdmGasket);
    drainNotch.position.set(0, -34.8, 0);
    drainGroup.add(drainNotch);
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-bayonet-drain-channel',
      38,
      '#0ea5e9',
      drainGroup,
      new THREE.Vector3(0, 0, 29.3),
      new THREE.Vector3(0, 38, 58),
      cp,
      0.26
    )
  );

  // =========================================================================
  // M39: Factory Selection Flange-Focal Washers (Sony Ref.456 IM ADJUST WASHER D: 25–600 μm)
  // =========================================================================
  const imWasherGroup = new THREE.Group();
  {
    // 3-point kinematic tripod calibration bosses coupling mount frame to sensor unit!
    const calPoints: Array<[number, number, number]> = [
      [0, 26.8, 3],      // Top 12-o'clock boss (3 stacked selection shims)
      [-28.5, -20.5, 2], // Bottom-right boss (2 stacked shims)
      [28.5, -20.5, 4],  // Bottom-left boss (4 stacked shims)
    ];

    for (const [cx, cy, stackCount] of calPoints) {
      for (let s = 0; s < stackCount; s++) {
        const w = new THREE.Mesh(
          extrudeCentered(createRingShape(3.6, 1.8), 0.34, 0.02, 0.02, 24),
          s % 2 === 0 ? mats.mountShimBlue : mats.stainlessMachined
        );
        w.position.set(cx, cy, -s * 0.42);
        imWasherGroup.add(w);
      }
      // Laser-stamped thickness grade indicator tab on outer rim
      const tab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 0.28), mats.goldPlating);
      tab.position.set(cx, cy + 3.9, 0);
      tab.userData.noEdges = true;
      imWasherGroup.add(tab);
    }
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-im-adjust-washer',
      39,
      '#2563eb',
      imWasherGroup,
      new THREE.Vector3(0, 0, 18.0),
      new THREE.Vector3(0, 0, -34),
      cp,
      0.3
    )
  );

  // =========================================================================
  // M40: Inner Mount-Throat Electrostatic Velvet Flock Liner & Micro-Serration Band
  // =========================================================================
  const flockLinerGroup = new THREE.Group();
  {
    // Cylindrical matte-flocked anti-reflection velvet sleeve lining inner mount throat
    const linerGeo = new THREE.CylinderGeometry(27.15, 27.05, 6.2, 56, 1, true);
    linerGeo.rotateX(Math.PI / 2);
    const liner = new THREE.Mesh(linerGeo, mats.velvetFlockTrap);
    flockLinerGroup.add(liner);

    // 4 micro-serrated knife-edge absorption rings along inner circumference
    for (const tz of [-2.4, -0.8, 0.8, 2.4]) {
      const rib = new THREE.Mesh(
        new THREE.TorusGeometry(26.95, 0.22, 8, 56),
        mats.mountVelvetBaffle
      );
      rib.position.z = tz;
      rib.userData.noEdges = true;
      flockLinerGroup.add(rib);
    }
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-optical-black-coating',
      40,
      '#0f172a',
      flockLinerGroup,
      new THREE.Vector3(0, 0, 24.6),
      new THREE.Vector3(-42, 30, 10),
      cp,
      0.24
    )
  );

  // =========================================================================
  // M41: Contact-Block Perimeter Silicone Dust-Lip Seal & Condensation Barrier
  // =========================================================================
  const contactLipGroup = new THREE.Group();
  {
    const a0 = THREE.MathUtils.degToRad(-128);
    const a1 = THREE.MathUtils.degToRad(-52);

    // Outer & inner molded LSR silicone sealing lips framing the 12-pin arc
    const outerLip = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(26.9, 28.0, a0, a1), 1.35, 0.08, 0.08, 30),
      mats.epdmGasket
    );
    const innerLip = new THREE.Mesh(
      extrudeCentered(createArcSectorShape(22.2, 23.2, a0, a1), 1.35, 0.08, 0.08, 30),
      mats.epdmGasket
    );
    contactLipGroup.add(outerLip, innerLip);

    // End-cap silicone dams & inter-pin condensation barrier micro-ribs
    for (const deg of [-128, -52]) {
      const a = THREE.MathUtils.degToRad(deg);
      const endDam = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.1, 1.35), mats.epdmGasket);
      endDam.position.set(Math.cos(a) * 25.1, Math.sin(a) * 25.1, 0);
      endDam.rotation.z = a;
      contactLipGroup.add(endDam);
    }
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-contact-dust-lip',
      41,
      '#10b981',
      contactLipGroup,
      new THREE.Vector3(0, 0, 26.8),
      new THREE.Vector3(22, -40, 44),
      cp,
      0.28
    )
  );

  // =========================================================================
  // M42: Dust-Sealed 3-Lug Bayonet Body Cap (Sony Ref.551 CAP, BODY / ALC-B1EM)
  // =========================================================================
  const bodyCapGroup = new THREE.Group();
  {
    // Outer knurled protective cap disc
    const capFace = new THREE.Mesh(
      new THREE.CylinderGeometry(35.6, 36.2, 3.2, 56).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    capFace.position.z = 2.0;
    bodyCapGroup.add(capFace);

    // Raised inner recessed bezel ring + 18 perimeter grip knurls
    const recessRing = new THREE.Mesh(
      new THREE.TorusGeometry(27.5, 0.75, 10, 48),
      mats.bodyMgShell
    );
    recessRing.position.z = 3.55;
    recessRing.userData.noEdges = true;
    bodyCapGroup.add(recessRing);

    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      const rib = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.2, 2.6), mats.bodyMgShell);
      rib.position.set(Math.cos(a) * 35.9, Math.sin(a) * 35.9, 2.0);
      rib.rotation.z = a;
      rib.userData.noEdges = true;
      bodyCapGroup.add(rib);
    }

    // Rear cylindrical bayonet insert barrel + 3 locking lugs + weather O-ring
    const barrel = new THREE.Mesh(
      extrudeCentered(createRingShape(27.1, 24.8), 3.4, 0.08, 0.08, 48),
      mats.matteBlackAnodized
    );
    barrel.position.z = -1.2;
    bodyCapGroup.add(barrel);

    for (const deg of [42, 162, 282]) {
      const a0 = THREE.MathUtils.degToRad(deg - 22);
      const a1 = THREE.MathUtils.degToRad(deg + 22);
      const lug = new THREE.Mesh(
        extrudeCentered(createArcSectorShape(26.8, 29.4, a0, a1), 1.1, 0.06, 0.06, 18),
        mats.matteBlackAnodized
      );
      lug.position.z = -2.4;
      bodyCapGroup.add(lug);
    }

    const capSeal = new THREE.Mesh(
      new THREE.TorusGeometry(32.8, 0.45, 10, 48),
      mats.epdmGasket
    );
    capSeal.position.z = 0.2;
    capSeal.userData.noEdges = true;
    bodyCapGroup.add(capSeal);
  }
  parts.push(
    finalizeStandaloneMountMicroPart(
      'mount-body-cap-interface',
      42,
      '#475569',
      bodyCapGroup,
      new THREE.Vector3(0, 0, 34.4),
      new THREE.Vector3(0, 0, 106),
      cp,
      0.26
    )
  );

  return parts;
}
