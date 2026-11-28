//@FLOW_MAP|file=src/assemblies/mount/mountUltra34PartsA.ts|unit=mount|lines=1480|exports=finalizeMountUltra34Part,buildMountUltra34PartsA
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createPrecisionScrew,
  createRoundedRectShape,
  tagPartMeshes,
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
import { lazyExplanationStub } from '../lazyExplanations';

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

export function finalizeMountUltra34Part(
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
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);

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
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

/**
 * Phase 34A — 20 Ultra-HD Standalone-Only Mount Parts (M61–M80):
 *  - Group A (M61–M70): Sony OEM ILCE-7M4 Service Manual MB N FRAME & MECHA DEVICE Hardware
 *  - Group B (M71–M75): Front Mount-Surround Sensors, Controls & Structural Interfaces
 *  - Group C (M76–M80): E-Mount 10/12-Pin Electrical Physical Layer & Protocol Conditioning (Part 1)
 */
export function buildMountUltra34PartsA(mats: MaterialLibrary): CadPart[] {
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
  // M61: Sony OEM MB SP (755), N (442466701 / Ref.559) Contact-Holder Zero-Gap Preload Clip
  // =========================================================================
  {
    const g = new THREE.Group();
    const arcShape = createArcSectorShape(
      26.3,
      29.3,
      THREE.MathUtils.degToRad(-118),
      THREE.MathUtils.degToRad(-62)
    );
    const clipBand = new THREE.Mesh(
      extrudeHiRes(arcShape, 0.34, 0.04, 0.04, 2, 32),
      mats.mountSpringSteel
    );
    g.add(clipBand);

    // Twin boss eyelets engaging MB N HOLDER A/B locating posts (zero-gap seat)
    for (const deg of [-112, -68]) {
      const a = THREE.MathUtils.degToRad(deg);
      const eyelet = new THREE.Mesh(
        extrudeHiRes(createRingShape(1.95, 0.92), 0.56, 0.05, 0.05, 2, 18),
        mats.stainlessMachined
      );
      eyelet.position.set(Math.cos(a) * 27.8, Math.sin(a) * 27.8, 0.08);
      g.add(eyelet);
    }

    // 3 formed inward pressure fingers clamping contact block uniformly against M19 bulkhead
    for (const deg of [-102, -90, -78]) {
      const a = THREE.MathUtils.degToRad(deg);
      const tongue = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 2.4, 0.36, 0.25, 0.05, 'z'),
        mats.beCuSpring
      );
      tongue.position.set(Math.cos(a) * 25.8, Math.sin(a) * 25.8, 0.24);
      tongue.rotation.z = a + Math.PI / 2;
      tongue.rotation.x = 0.16;
      g.add(tongue);
    }

    // Central anti-rattle emboss rib
    const rib = new THREE.Mesh(
      createChamferedBoxGeo(7.2, 0.85, 0.45, 0.2, 0.05, 'z'),
      mats.mountSpringSteel
    );
    rib.position.set(0, -27.8, -0.22);
    g.add(rib);

    parts.push(
      finalizeMountUltra34Part(
        'mount-sp755-contact-clip',
        61,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 25.4),
        new THREE.Vector3(-76, -54, 48),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M62: Sony OEM MB N PLATE A (5300) (468819002 / Ref.553) Inner Bayonet Backing Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const plateShape = createRingShape(33.8, 27.55);
    addCircleHoles(plateShape, boltCoords, 1.55);
    // Twin dowel locating holes matching MB N PIN (H)
    const dowelCoords: Array<[number, number]> = [-154, 26].map((deg) => {
      const a = THREE.MathUtils.degToRad(deg);
      return [Math.cos(a) * 31.3, Math.sin(a) * 31.3];
    });
    addCircleHoles(plateShape, dowelCoords, 1.05);

    const backingPlate = new THREE.Mesh(
      extrudeHiRes(plateShape, 0.92, 0.07, 0.07, 2, 56),
      mats.mountStainlessFlange
    );
    g.add(backingPlate);

    // 3 precision-ground stepped inner radial centering seats (120° spacing)
    for (const deg of [40, 160, 280]) {
      const a0 = THREE.MathUtils.degToRad(deg - 16);
      const a1 = THREE.MathUtils.degToRad(deg + 16);
      const seat = new THREE.Mesh(
        extrudeHiRes(createArcSectorShape(27.0, 28.4, a0, a1), 0.55, 0.04, 0.04, 2, 20),
        mats.stainlessMachined
      );
      seat.position.z = 0.52;
      g.add(seat);
    }

    // Precision relief grooves around bolt bosses
    for (const [bx, by] of boltCoords) {
      const collar = new THREE.Mesh(
        hiResTorus(2.05, 0.18, 8, 20),
        mats.titaniumRivet
      );
      collar.position.set(bx, by, 0.48);
      collar.userData.noEdges = true;
      g.add(collar);
    }

    parts.push(
      finalizeMountUltra34Part(
        'mount-plate-a-5300-ring',
        62,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 29.1),
        new THREE.Vector3(-118, 42, 68),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M63: Sony OEM HOLDER, LENS LOCK (3000) (448435701) Lock-Pin Guide Cartridge
  // =========================================================================
  {
    const g = new THREE.Group();
    const cart = new THREE.Group();
    cart.position.set(lockPinX, lockPinY, 0);
    cart.rotation.z = LOCK_PIN_ANGLE_RAD;

    // Chamfered precision POM/LCP cartridge main body
    const body = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 9.6, 5.8, 1.1, 0.14, 'z'),
      mats.pomGear
    );
    cart.add(body);

    // Precision honed brass/steel bore sleeve inside cartridge
    const bore = new THREE.Mesh(
      hiResCyl(2.25, 2.25, 6.2, 24, true).rotateX(Math.PI / 2),
      mats.sinteredBronzeBushing
    );
    cart.add(bore);

    // Upper & lower molded mounting ears with M1.4 stainless screws
    for (const sy of [-5.8, 5.8]) {
      const ear = new THREE.Mesh(
        createChamferedBoxGeo(5.0, 2.8, 1.4, 0.6, 0.08, 'z'),
        mats.mountPpsInsulator
      );
      ear.position.set(0.4, sy, -1.6);
      cart.add(ear);

      const screw = createPrecisionScrew(0.92, 0.35, 1.6, mats.stainlessMachined);
      screw.position.set(0.4, sy, -0.7);
      cart.add(screw);
    }

    // Side anti-rotation spring pocket boss & rear cap
    const rearCap = new THREE.Mesh(
      hiResCyl(2.9, 2.9, 0.65, 20).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    rearCap.position.z = -3.1;
    cart.add(rearCap);

    g.add(cart);

    parts.push(
      finalizeMountUltra34Part(
        'mount-lens-lock-holder-3000',
        63,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 26.8),
        new THREE.Vector3(52, -8, 108),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M64: Sony OEM MB CUSHION SHEET (5400) (472900201 / Ref.459) Perimeter Acoustic/WP Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    const outer = createRoundedRectShape(76.4, 64.4, 10.2);
    const centerHole = new THREE.Path();
    centerHole.absarc(0, 0, 34.4, 0, Math.PI * 2, true);
    outer.holes.push(centerHole);

    // 4 corner alignment dowel punch holes
    addCircleHoles(
      outer,
      [
        [-33.0, 26.0],
        [33.0, 26.0],
        [-33.0, -26.0],
        [33.0, -26.0],
      ],
      1.6
    );

    const poronSheet = new THREE.Mesh(
      extrudeHiRes(outer, 0.72, 0.06, 0.06, 2, 40),
      mats.lensFoamSeal
    );
    g.add(poronSheet);

    // Thin acrylic PSA adhesive backing carrier layer on -Z face
    const psaFilm = new THREE.Mesh(
      extrudeHiRes(outer, 0.16, 0.02, 0.02, 1, 32),
      mats.mylarInsulatorFilm
    );
    psaFilm.position.z = -0.44;
    g.add(psaFilm);

    // Integral release-button cutout cushion wing on +X flank
    const btnWing = new THREE.Mesh(
      extrudeHiRes(createRingShape(7.2, 5.2), 0.78, 0.05, 0.05, 2, 24),
      mats.epdmGasket
    );
    btnWing.position.set(lockPinX + 11.2, lockPinY, 0.06);
    g.add(btnWing);

    parts.push(
      finalizeMountUltra34Part(
        'mount-cushion-sheet-5400',
        64,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 28.6),
        new THREE.Vector3(-118, 38, 18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M65: Sony OEM MB GRAPHITE SHEET TOP A (5800) (500490202) & AS HEAT PLATE TOP (474824101)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bottom compressible thermal interface spacer (AS HEAT PLT SPACER TOP, 503058201)
    const timSpacer = new THREE.Mesh(
      createChamferedBoxGeo(40.0, 1.0, 8.4, 1.2, 0.08, 'y'),
      mats.thermalPadBlue
    );
    timSpacer.position.set(0, 34.4, -0.8);
    g.add(timSpacer);

    // Middle stamped copper/aluminum heat spreader bridge (AS HEAT PLATE TOP 5800)
    const heatPlate = new THREE.Mesh(
      createChamferedBoxGeo(48.0, 0.9, 10.6, 1.8, 0.09, 'y'),
      mats.copperHeatSpreader
    );
    heatPlate.position.set(0, 35.4, -1.0);
    g.add(heatPlate);

    // Twin front downward folding ears tying heat plate to Mg bulkhead crown
    for (const sx of [-19.5, 19.5]) {
      const ear = new THREE.Mesh(
        createChamferedBoxGeo(5.4, 3.6, 0.75, 0.5, 0.06, 'z'),
        mats.copperHeatSpreader
      );
      ear.position.set(sx, 33.8, 4.1);
      g.add(ear);

      const screw = createPrecisionScrew(0.95, 0.35, 1.4, mats.stainlessMachined);
      screw.position.set(sx, 33.8, 4.55);
      g.add(screw);
    }

    // Top ultra-high-conductivity pyrolytic graphite sheet (k ≈ 1600 W/m·K) with rear fold
    const graphiteTop = new THREE.Mesh(
      createChamferedBoxGeo(50.0, 0.42, 12.2, 1.6, 0.05, 'y'),
      mats.pyroGraphite
    );
    graphiteTop.position.set(0, 36.2, -1.6);
    g.add(graphiteTop);

    const graphiteRearFold = new THREE.Mesh(
      createChamferedBoxGeo(38.0, 5.4, 0.42, 1.0, 0.05, 'z'),
      mats.pyroGraphite
    );
    graphiteRearFold.position.set(0, 33.8, -7.6);
    g.add(graphiteRearFold);

    parts.push(
      finalizeMountUltra34Part(
        'mount-graphite-heat-top',
        65,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 24.8),
        new THREE.Vector3(-42, 74, 24),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M66: Sony OEM MB CH FLOATING SHAFT (5600) (474837101 / Ref.457) Anti-Vib Shutter Coupling
  // =========================================================================
  {
    const g = new THREE.Group();
    const shaftYs = [14.5, -4.5];
    for (const sy of shaftYs) {
      const sg = new THREE.Group();
      sg.position.set(33.6, sy, 0);

      // Shouldered SUS303 precision floating shaft
      const pin = new THREE.Mesh(
        hiResCyl(1.45, 1.45, 9.2, 22).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      sg.add(pin);

      // Front & rear flanged butyl rubber vibration-isolation grommets
      for (const gz of [-2.4, 2.4]) {
        const grommet = new THREE.Mesh(
          hiResCyl(3.35, 3.35, 2.2, 24).rotateX(Math.PI / 2),
          mats.butylDamperRubber
        );
        grommet.position.z = gz;
        sg.add(grommet);

        const groove = new THREE.Mesh(
          hiResTorus(3.0, 0.36, 8, 22),
          mats.epdmGasket
        );
        groove.position.z = gz;
        groove.userData.noEdges = true;
        sg.add(groove);
      }

      // Sintered bronze low-friction inner isolator bushing
      const bronze = new THREE.Mesh(
        hiResCyl(2.15, 2.15, 4.4, 20).rotateX(Math.PI / 2),
        mats.sinteredBronzeBushing
      );
      sg.add(bronze);

      // E-clip retaining washer at rear tip
      const clip = new THREE.Mesh(
        extrudeHiRes(createRingShape(2.3, 1.25), 0.38, 0.04, 0.04, 1, 18),
        mats.mountSpringSteel
      );
      clip.position.z = -4.2;
      sg.add(clip);

      g.add(sg);
    }

    // Stamped stainless coupling bridge tying both floating mounts together
    const tiePlate = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 23.0, 0.85, 1.4, 0.08, 'z'),
      mats.mountStainlessFlange
    );
    tiePlate.position.set(33.6, 5.0, -3.5);
    g.add(tiePlate);

    parts.push(
      finalizeMountUltra34Part(
        'mount-ch-floating-shaft',
        66,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 20.6),
        new THREE.Vector3(36, 46, -46),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M67: Sony OEM IM IMAGER FIX SHAFT (5300) (459775001 / Ref.501, Non-Reusable 3x)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const deg of [90, 210, 330]) {
      const a = THREE.MathUtils.degToRad(deg);
      const px = Math.cos(a) * 32.8;
      const py = Math.sin(a) * 32.8;

      const s = new THREE.Group();
      s.position.set(px, py, 0);

      // Rear Torx/hex torque-controlled flanged head
      const head = new THREE.Mesh(
        hiResCyl(2.7, 2.7, 1.4, 6).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      head.position.z = -4.4;
      s.add(head);

      // Precision ground datum shank
      const shank = new THREE.Mesh(
        hiResCyl(1.48, 1.48, 6.8, 22).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      shank.position.z = -0.6;
      s.add(shank);

      // Micro-stepped controlled-stretch waist (single-use torque calibration zone!)
      const waist = new THREE.Mesh(
        hiResCyl(1.18, 1.18, 1.9, 18).rotateX(Math.PI / 2),
        mats.mountSpringSteel
      );
      waist.position.z = 1.1;
      s.add(waist);

      // Pre-applied anaerobic blue thread-locker ring band (reason for non-reusable spec!)
      const lockBand = new THREE.Mesh(
        hiResCyl(1.56, 1.56, 2.2, 20).rotateX(Math.PI / 2),
        mats.mountThreadLockBlue
      );
      lockBand.position.z = 3.2;
      lockBand.userData.noEdges = true;
      s.add(lockBand);

      // Front fine-pitch M2.0 mating stud engaging M53 datum pillar
      const stud = new THREE.Mesh(
        hiResCyl(1.38, 1.38, 2.0, 20).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      stud.position.z = 4.6;
      s.add(stud);

      g.add(s);
    }

    parts.push(
      finalizeMountUltra34Part(
        'mount-imager-fix-shafts',
        67,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, 16.4),
        new THREE.Vector3(0, -18, -112),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M68: Sony OEM MAGNETIC FIELD CUT PLATE (891) (502789501 / Ref.352) Permalloy Flux Shield
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stamped U-shaped high-permeability Mu-metal / PC-Permalloy magnetic flux barrier
    const shieldFrame = createFrameShape(74.0, 52.0, 5.2, 56.0, 36.0, 3.6);
    const mainPlate = new THREE.Mesh(
      extrudeHiRes(shieldFrame, 0.52, 0.04, 0.04, 2, 24),
      mats.lensPermalloyShield
    );
    g.add(mainPlate);

    // Side folded flux-return sidewalls trapping stray IBIS / XD linear motor dipole flux
    for (const sx of [-36.6, 36.6]) {
      const sideFlange = new THREE.Mesh(
        createChamferedBoxGeo(0.58, 38.0, 6.2, 0.25, 0.05, 'z'),
        mats.lensPermalloyShield
      );
      sideFlange.position.set(sx, -1.0, 2.8);
      g.add(sideFlange);
    }

    // Upper flux-diverter arch & 3 chassis ground contact dimples
    const topLip = new THREE.Mesh(
      createChamferedBoxGeo(54.0, 0.62, 4.4, 0.3, 0.05, 'y'),
      mats.softIronYoke
    );
    topLip.position.set(0, 25.8, 2.0);
    g.add(topLip);

    for (const [gx, gy] of [
      [-32.5, 22.0],
      [32.5, 22.0],
      [-32.5, -22.0],
      [32.5, -22.0],
    ]) {
      const tab = new THREE.Mesh(
        hiResCyl(1.4, 1.4, 0.9, 14).rotateX(Math.PI / 2),
        mats.beCuSpring
      );
      tab.position.set(gx, gy, -0.35);
      g.add(tab);
    }

    parts.push(
      finalizeMountUltra34Part(
        'mount-mag-field-cut-plate',
        68,
        '#6366f1',
        g,
        new THREE.Vector3(0, 0, 17.4),
        new THREE.Vector3(-84, -10, -78),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M69: Sony OEM HDMI LIGHT SHIELD SHEET (850) (502078101 / Ref.463) & MB RING SHEET
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left-flank (-X HDMI/USB I/O wall) folded blackout light-maze sheet
    const mainWall = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 38.0, 11.2, 0.12, 0.03, 'z'),
      mats.velvetFlockTrap
    );
    mainWall.position.set(-38.6, -1.5, 0.5);
    g.add(mainWall);

    // Front and rear folded labyrinth return lips sealing I/O port light ingress
    for (const [lz, lx] of [
      [5.8, -36.0],
      [-4.9, -35.8],
    ]) {
      const lip = new THREE.Mesh(
        createChamferedBoxGeo(5.4, 34.0, 0.34, 0.3, 0.03, 'z'),
        mats.mountVelvetBaffle
      );
      lip.position.set(lx, -1.5, lz);
      g.add(lip);
    }

    // Inner MB RING SHEET curved matte-black light-blocker arc along I/O flank (135°..225°)
    const ringSheetArc = new THREE.Mesh(
      extrudeHiRes(
        createArcSectorShape(27.2, 30.2, THREE.MathUtils.degToRad(135), THREE.MathUtils.degToRad(225)),
        0.28,
        0.02,
        0.02,
        1,
        28
      ),
      mats.velvetFlockTrap
    );
    ringSheetArc.position.z = 1.6;
    g.add(ringSheetArc);

    // Conductive black PET adhesive strip fixing sheet to Mg frame
    const tape = new THREE.Mesh(
      createChamferedBoxGeo(0.24, 32.0, 3.6, 0.1, 0.02, 'z'),
      mats.matteBlackAnodized
    );
    tape.position.set(-38.9, -1.5, 1.8);
    g.add(tape);

    parts.push(
      finalizeMountUltra34Part(
        'mount-hdmi-light-shield',
        69,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 20.4),
        new THREE.Vector3(-48, 8, -36),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M70: Sony OEM CABINET F ASSY Waterproof Potting Gasket & Front Collar Seal (Ref.469)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main precision resin-potted front cabinet perimeter seal collar
    const collar = new THREE.Mesh(
      extrudeHiRes(createRingShape(38.1, 34.65), 2.35, 0.14, 0.14, 2, 56),
      mats.epdmGasket
    );
    g.add(collar);

    // Dual front & rear waterproof labyrinth seal lip beads
    for (const lz of [-0.95, 0.95]) {
      const lip = new THREE.Mesh(
        hiResTorus(36.35, 0.36, 10, 48),
        mats.butylDamperRubber
      );
      lip.position.z = lz;
      lip.userData.noEdges = true;
      g.add(lip);
    }

    // Integral molded waterproof potting boot surround around release button cutout
    const btnCollar = new THREE.Mesh(
      extrudeHiRes(createRingShape(6.8, 4.9), 2.6, 0.12, 0.12, 2, 28),
      mats.epdmGasket
    );
    btnCollar.position.set(lockPinX + 11.2, lockPinY, -0.1);
    g.add(btnCollar);

    // Bridge web connecting main collar to button potting boot
    const bridge = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 5.2, 1.8, 0.8, 0.1, 'z'),
      mats.epdmGasket
    );
    bridge.position.set(lockPinX + 6.4, lockPinY, -0.2);
    bridge.rotation.z = LOCK_PIN_ANGLE_RAD;
    g.add(bridge);

    parts.push(
      finalizeMountUltra34Part(
        'mount-cabinet-potting-seal',
        70,
        '#0f766e',
        g,
        new THREE.Vector3(0, 0, 31.3),
        new THREE.Vector3(-118, -38, 96),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M71: Front Visible-Light + IR Ambient Spectral AWB & Flicker Sensor Module (α7R V / α9 III / α1 II)
  // =========================================================================
  {
    const g = new THREE.Group();
    const m = new THREE.Group();
    m.position.set(-23.5, 31.0, 0);

    // Waterproof anodized aluminum sensor bezel housing
    const bezel = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 5.2, 3.4, 1.3, 0.14, 'z'),
      mats.matteBlackAnodized
    );
    m.add(bezel);

    // Perimeter EPDM weather-seal ring
    const oRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(7.2, 4.8, 1.1, 6.2, 3.8, 0.7), 0.55, 0.04, 0.04, 1, 20),
      mats.epdmGasket
    );
    oRing.position.z = 1.65;
    m.add(oRing);

    // Left window: milky PTFE cosine diffuser dome for visible RGB spectral AWB
    const visDome = new THREE.Mesh(
      hiResSphere(1.35, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.52).rotateX(Math.PI / 2),
      mats.zifIvoryPlastic
    );
    visDome.position.set(-1.55, 0, 1.45);
    visDome.userData.noEdges = true;
    m.add(visDome);

    // Right window: dark-pass NIR filter lens for IR light-source & LED flicker rejection
    const irWin = new THREE.Mesh(
      hiResCyl(1.18, 1.25, 0.7, 20).rotateX(Math.PI / 2),
      mats.evfIrWindowBlack
    );
    irWin.position.set(1.55, 0, 1.6);
    m.add(irWin);

    // Multi-channel RGB+IR silicon photodiode QFN package on micro-PCB behind windows
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(7.2, 4.8, 0.72, 0.8, 0.06, 'z'),
      mats.hdiMainboardPcb
    );
    pcb.position.z = -1.95;
    m.add(pcb);

    const pdIc = buildChipPackage({
      w: 3.4,
      d: 2.6,
      h: 0.75,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      topAccentMat: mats.siliconSensorDie,
      axis: 'z',
    });
    pdIc.position.set(0, 0, -1.2);
    m.add(pdIc);

    // Polyimide FPC ribbon descending into mount bulkhead
    const flex = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 8.2, 0.26, 0.3, 0.03, 'z'),
      mats.polyimideFpc
    );
    flex.position.set(0, -5.6, -2.2);
    m.add(flex);

    g.add(m);

    parts.push(
      finalizeMountUltra34Part(
        'mount-vl-ir-awb-sensor',
        71,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, 27.6),
        new THREE.Vector3(-38, 46, 56),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M72: Front Mount-Flank C5 Speed-Boost / DOF-Preview Custom Tactile Button (α9 III / α1 II)
  // =========================================================================
  {
    const g = new THREE.Group();
    const b = new THREE.Group();
    b.position.set(38.2, 11.5, 0);

    // CNC dark-anodized concave button cap with micro-knurled rim
    const cap = new THREE.Mesh(
      hiResCyl(3.9, 4.2, 2.4, 28).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    cap.position.z = 2.1;
    b.add(cap);

    // Subtle anodized cinnabar/silver dress ring around cap perimeter
    const dressRing = new THREE.Mesh(
      hiResTorus(4.05, 0.26, 10, 28),
      mats.stainlessMachined
    );
    dressRing.position.z = 1.65;
    dressRing.userData.noEdges = true;
    b.add(dressRing);

    // Corrugated silicone waterproof dust boot sealing button stem
    const boot = new THREE.Mesh(
      hiResCyl(4.4, 4.9, 2.2, 24).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    boot.position.z = 0.2;
    b.add(boot);

    // Rigid-flex switch board + stainless tactile dome switch + ESD diode
    const swPcb = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 8.8, 0.78, 1.2, 0.07, 'z'),
      mats.hdiMainboardPcb
    );
    swPcb.position.z = -1.75;
    b.add(swPcb);

    const dome = new THREE.Mesh(
      hiResSphere(1.85, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.42).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    dome.position.z = -1.25;
    dome.userData.noEdges = true;
    b.add(dome);

    const esd = buildSmdPassive(1.5, 0.8, 0.55, mats.icEpoxy, mats.solderBallSilver, 'z');
    esd.position.set(0, -2.8, -1.25);
    b.add(esd);

    // Rear stainless retaining plate + 2 micro screws
    const retainer = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 10.6, 0.65, 1.2, 0.06, 'z'),
      mats.mountStainlessFlange
    );
    retainer.position.z = -2.6;
    b.add(retainer);

    for (const sy of [-4.2, 4.2]) {
      const screw = createPrecisionScrew(0.82, 0.32, 1.4, mats.stainlessMachined);
      screw.position.set(0, sy, -3.0);
      screw.rotation.x = Math.PI;
      b.add(screw);
    }

    g.add(b);

    parts.push(
      finalizeMountUltra34Part(
        'mount-front-c5-button',
        72,
        '#f43f5e',
        g,
        new THREE.Vector3(0, 0, 27.4),
        new THREE.Vector3(34, 48, 56),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M73: Front 940 nm IR Wireless Remote Receiver Window & Demodulator Module
  // =========================================================================
  {
    const g = new THREE.Group();
    const ir = new THREE.Group();
    ir.position.set(35.6, 24.8, 0);

    // Molded dark 940nm bandpass optical acrylic lens window
    const win = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 4.2, 1.35, 1.1, 0.14, 'z'),
      mats.evfIrWindowBlack
    );
    win.position.z = 1.6;
    ir.add(win);

    // EPDM flush window perimeter gasket
    const seal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(6.8, 5.2, 1.3, 5.6, 4.0, 0.9), 1.0, 0.06, 0.06, 2, 20),
      mats.epdmGasket
    );
    seal.position.z = 1.1;
    ir.add(seal);

    // 38 kHz PIN photodiode + AGC bandpass demodulator IC inside shielded cage
    const demod = buildChipPackage({
      w: 4.2,
      d: 3.4,
      h: 1.4,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      topAccentMat: mats.evfIrEmitter,
      axis: 'z',
    });
    demod.position.z = -0.5;
    ir.add(demod);

    // Stamped EMI Faraday shield can wrapping rear of IR demodulator
    const emiCan = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 4.8, 1.6, 0.7, 0.08, 'z'),
      mats.emiShieldCan
    );
    emiCan.position.z = -1.8;
    ir.add(emiCan);

    // Micro polyimide tail
    const tail = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 6.2, 0.24, 0.3, 0.02, 'z'),
      mats.polyimideFpc
    );
    tail.position.set(0, -4.6, -2.1);
    ir.add(tail);

    g.add(ir);

    parts.push(
      finalizeMountUltra34Part(
        'mount-ir-remote-window',
        73,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 0, 27.2),
        new THREE.Vector3(38, 56, 44),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M74: Focal-Plane Index (Φ) Structural Datum Bridge & Cine Tape-Measure Hook Anchor
  // =========================================================================
  {
    const g = new THREE.Group();
    const d = new THREE.Group();
    d.position.set(-16.5, 36.4, 0);

    // Precision CNC-milled stainless datum tie bar spanning ΔZ = 18.000 mm flange-to-focal-plane reference
    const bar = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 2.2, 16.4, 0.8, 0.1, 'y'),
      mats.invarScaleBar
    );
    d.add(bar);

    // Rear focal-plane Φ boss riser & machined cine tape-measure hook pin (FX9 / BURANO)
    const hookBase = new THREE.Mesh(
      hiResCyl(2.4, 2.7, 2.2, 24),
      mats.stainlessMachined
    );
    hookBase.position.set(0, 2.1, -6.2);
    d.add(hookBase);

    const hookNeck = new THREE.Mesh(
      hiResCyl(1.15, 1.15, 2.8, 20),
      mats.titaniumRivet
    );
    hookNeck.position.set(0, 4.4, -6.2);
    d.add(hookNeck);

    const hookCap = new THREE.Mesh(
      hiResCyl(2.2, 2.0, 0.9, 24),
      mats.stainlessMachined
    );
    hookCap.position.set(0, 5.9, -6.2);
    d.add(hookCap);

    // Front mount-datum registration lug & twin M2 socket screws
    for (const sz of [5.4, -0.6]) {
      const bolt = createPrecisionScrew(1.05, 0.4, 1.8, mats.stainlessMachined);
      bolt.position.set(0, 1.35, sz);
      bolt.rotation.x = -Math.PI / 2;
      d.add(bolt);
    }

    // Visual gold calibration index ring around focal-plane axis
    const phiRing = new THREE.Mesh(
      hiResTorus(2.45, 0.18, 8, 24).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    phiRing.position.set(0, 3.1, -6.2);
    phiRing.userData.noEdges = true;
    d.add(phiRing);

    g.add(d);

    parts.push(
      finalizeMountUltra34Part(
        'mount-focal-plane-datum',
        74,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 21.2),
        new THREE.Vector3(12, 68, -14),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M75: Heavy-Telephoto & Cinema Cage Dual-Point Auxiliary Support Bosses & Shear Tie-Bar
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sx of [-1, 1]) {
      const ear = new THREE.Group();
      ear.position.set(sx * 41.0, -22.0, 0);

      // CNC forged aluminum/Mg mount-flank reinforcement block
      const block = new THREE.Mesh(
        createChamferedBoxGeo(6.8, 12.6, 7.6, 1.2, 0.16, 'z'),
        mats.mountMgBulkhead
      );
      ear.add(block);

      // Hardened titanium 1/4-20 / M4 threaded bushing insert facing outward (+X / -X)
      const insert = new THREE.Mesh(
        hiResCyl(2.55, 2.55, 5.4, 24).rotateZ(Math.PI / 2),
        mats.titaniumRivet
      );
      insert.position.set(sx * 1.1, 1.2, 0);
      ear.add(insert);

      // Anti-twist ARRI-style locating pin hole collar below thread
      const pinHole = new THREE.Mesh(
        hiResCyl(1.15, 1.15, 5.0, 18).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      pinHole.position.set(sx * 1.1, -3.4, 0);
      ear.add(pinHole);

      // Front flange locking bolts tying ear directly to bulkhead
      for (const sy of [-3.6, 3.6]) {
        const bolt = createPrecisionScrew(1.1, 0.42, 2.2, mats.stainlessMachined);
        bolt.position.set(-sx * 1.4, sy, 4.0);
        ear.add(bolt);
      }

      g.add(ear);
    }

    // Lower CNC stainless cross-shear bridge bar linking left/right support bosses beneath throat
    const crossBar = new THREE.Mesh(
      createChamferedBoxGeo(82.0, 3.4, 3.6, 0.8, 0.12, 'z'),
      mats.mountStainlessFlange
    );
    crossBar.position.set(0, -34.2, -0.8);
    g.add(crossBar);

    parts.push(
      finalizeMountUltra34Part(
        'mount-cine-support-bosses',
        75,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 24.0),
        new THREE.Vector3(0, -94, -116),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M76: 10/12-Pin Stepped Make-Before-Break Contact Profile & Au-Co / Pd-Ni Metallurgy
  // =========================================================================
  {
    const g = new THREE.Group();
    // Staggered Z protrusion (mm) mirroring real E-mount hot-swap Make-Before-Break safety:
    // Pin #1 & #3 (GND) = +0.50 (FIRST mate), Pin #2/#5 (POWER/LOGIC_VCC) = +0.20,
    // Pins #4/#6-#9 (VD/UART) = 0.00, Pin #10 (LENS_XDETECT) = -0.35 (LAST mate / FIRST break!)
    const zProtrusions = [0.5, 0.22, 0.5, 0.0, 0.22, 0.0, 0.0, 0.0, 0.0, -0.36];
    const rArc = 25.0;
    const aStart = THREE.MathUtils.degToRad(-126);
    const aEnd = THREE.MathUtils.degToRad(-54);

    // Curved metallurgical reference datum arc bar tying staggered tip collars cleanly
    const carrier = new THREE.Mesh(
      extrudeHiRes(createArcSectorShape(24.05, 25.95, aStart - 0.04, aEnd + 0.04), 0.72, 0.05, 0.05, 2, 32),
      mats.mountPpsInsulator
    );
    carrier.position.z = -1.25;
    g.add(carrier);

    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      const a = THREE.MathUtils.lerp(aStart, aEnd, t);
      const px = Math.cos(a) * rArc;
      const py = Math.sin(a) * rArc;
      const dz = zProtrusions[i];

      // Inner CuBe2 elastic substrate core
      const core = new THREE.Mesh(
        hiResCyl(0.58, 0.62, 1.65, 16).rotateX(Math.PI / 2),
        mats.beCuSpring
      );
      core.position.set(px, py, -0.55 + dz * 0.4);
      g.add(core);

      // 2.0 μm Electrolytic Nickel / Pd-Ni diffusion barrier sleeve
      const niBarrier = new THREE.Mesh(
        hiResCyl(0.68, 0.68, 0.65, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      niBarrier.position.set(px, py, 0.25 + dz * 0.75);
      g.add(niBarrier);

      // 0.8 μm Hard Au-Co (Gold-Cobalt) hemispherical micro-wipe crown tip
      const goldCrown = new THREE.Mesh(
        hiResSphere(0.7, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.58).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      goldCrown.position.set(px, py, 0.56 + dz);
      goldCrown.userData.noEdges = true;
      g.add(goldCrown);
    }

    parts.push(
      finalizeMountUltra34Part(
        'mount-mbb-contact-metallurgy',
        76,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 26.8),
        new THREE.Vector3(-36, -86, 58),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M77: Pin 2 LENS_POWER (5.0V / 7.4V VBAT Dual-Rail) Buck-Boost PMIC & Soft-Start Stage
  // =========================================================================
  {
    const g = new THREE.Group();
    const p = new THREE.Group();
    p.position.set(14.5, -31.0, 0);

    // 6-layer high-current 2-oz Cu HDI power daughterboard
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(13.6, 8.2, 0.95, 0.9, 0.08, 'z'),
      mats.hdiMainboardPcb
    );
    p.add(pcb);

    // Synchronous Buck-Boost / Dual-Rail VBAT Switcher QFN-24 PMIC
    const pmic = buildChipPackage({
      w: 4.4,
      d: 4.4,
      h: 0.95,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    pmic.position.set(-2.4, 0.4, 0.95);
    p.add(pmic);

    // Shielded molded metal-alloy power inductor (2.2 μH / 4.5 A saturation)
    const inductor = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 4.2, 1.85, 0.45, 0.12, 'z'),
      mats.ferriteInductor
    );
    inductor.position.set(3.2, 0.8, 1.38);
    p.add(inductor);

    const indCap = new THREE.Mesh(
      createChamferedBoxGeo(4.35, 1.0, 1.6, 0.2, 0.05, 'z'),
      mats.solderBallSilver
    );
    indCap.position.set(3.2, -1.35, 1.25);
    p.add(indCap);

    // 10 mΩ Precision low-TCR alloy current-sense shunt resistor for overcurrent cutoff
    const shunt = buildSmdPassive(3.0, 1.6, 0.72, mats.matteBlackAnodized, mats.copperHeatSpreader, 'z');
    shunt.position.set(2.8, -2.8, 0.82);
    p.add(shunt);

    // Soft-start slew-rate capacitor bank + output tantalum bulk cap
    for (let i = 0; i < 3; i++) {
      const cap = buildSmdPassive(1.6, 0.85, 0.65, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(-4.6 + i * 2.0, -2.8, 0.8);
      p.add(cap);
    }

    // Thick copper thermal/power busbar backing strip
    const busbar = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 2.2, 0.45, 0.3, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    busbar.position.set(0, -1.8, -0.7);
    p.add(busbar);

    g.add(p);

    parts.push(
      finalizeMountUltra34Part(
        'mount-lens-power-pmic',
        77,
        '#16a34a',
        g,
        new THREE.Vector3(0, 0, 22.2),
        new THREE.Vector3(44, -92, 20),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M78: Pin 4 BODY_VD_LENS (60-240Hz Sync) & 3.15V 1.5Mbaud CS-Framed UART Transceiver PHY
  // =========================================================================
  {
    const g = new THREE.Group();
    const u = new THREE.Group();
    u.position.set(-14.5, -31.0, 0);

    // Impedance-controlled 4-layer signal conditioning PCB
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(14.2, 8.2, 0.92, 0.9, 0.08, 'z'),
      mats.sensorPcb
    );
    u.add(pcb);

    // Bidirectional 3.15V UART / CS-handshaking Level-Shifter QFN (Pins 6-9 TXD/RXD/BODY_CS/LENS_CS)
    const uartIc = buildChipPackage({
      w: 4.6,
      d: 3.8,
      h: 0.88,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    uartIc.position.set(-2.6, 0.6, 0.9);
    u.add(uartIc);

    // Ultra-low-noise 3.15V LOGIC_VCC LDO regulator (Pin 5)
    const ldo = buildChipPackage({
      w: 2.6,
      d: 2.6,
      h: 0.8,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      axis: 'z',
    });
    ldo.position.set(3.2, 1.4, 0.86);
    u.add(ldo);

    // High-slew BODY_VD_LENS 60/120/240Hz Hardware Frame-Sync Pulse Buffer (Pin 4)
    const vdBuf = buildChipPackage({
      w: 2.4,
      d: 1.5,
      h: 0.78,
      style: 'sot23',
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      axis: 'z',
    });
    vdBuf.position.set(3.4, -1.9, 0.85);
    u.add(vdBuf);

    // 5x matched 33 Ω / 100 Ω series-termination & pull-up SMD resistors
    for (let i = 0; i < 5; i++) {
      const r = buildSmdPassive(1.3, 0.7, 0.45, mats.matteBlackAnodized, mats.solderBallSilver, 'z');
      r.position.set(-5.0 + i * 1.75, -2.7, 0.7);
      u.add(r);
    }

    // Gold ground guard ring on perimeter
    const gndStrip = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 0.65, 0.2, 0.15, 0.02, 'z'),
      mats.goldPlating
    );
    gndStrip.position.set(0, 3.55, 0.54);
    u.add(gndStrip);

    g.add(u);

    parts.push(
      finalizeMountUltra34Part(
        'mount-vd-sync-uart-phy',
        78,
        '#0284c7',
        g,
        new THREE.Vector3(0, 0, 22.0),
        new THREE.Vector3(-48, -94, 22),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M79: Pin 10 LENS_XDETECT (0 Ω Native vs 680 Ω Adapter) Resistance Bridge & Comparator
  // =========================================================================
  {
    const g = new THREE.Group();
    const x = new THREE.Group();
    x.position.set(22.5, -26.5, 0);
    x.rotation.z = THREE.MathUtils.degToRad(34);

    // Compact rigid-flex sensing daughterboard
    const sub = new THREE.Mesh(
      createChamferedBoxGeo(8.8, 5.4, 0.78, 0.75, 0.06, 'z'),
      mats.polyimideFpc
    );
    x.add(sub);

    // Precision window comparator SOT-23 IC (distinguishing 0 Ω native vs 680 Ω adapter vs open!)
    const comp = buildChipPackage({
      w: 2.6,
      d: 1.65,
      h: 0.82,
      style: 'sot23',
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    comp.position.set(1.4, 0.5, 0.78);
    x.add(comp);

    // 3x 0.1% precision thin-film divider bridge resistors (10 kΩ / 680 Ω reference ladder)
    for (let i = 0; i < 3; i++) {
      const res = buildSmdPassive(1.5, 0.8, 0.48, mats.mountShimBlue, mats.solderBallSilver, 'z');
      res.position.set(-2.4, -1.4 + i * 1.4, 0.64);
      x.add(res);
    }

    // ESD transient diode & gold probe test pads
    const tvs = buildSmdPassive(1.4, 0.9, 0.55, mats.icEpoxy, mats.solderBallSilver, 'z');
    tvs.position.set(1.6, -1.65, 0.66);
    x.add(tvs);

    for (const ty of [-1.2, 1.2]) {
      const tp = new THREE.Mesh(
        hiResCyl(0.55, 0.55, 0.16, 14).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      tp.position.set(3.5, ty, 0.44);
      tp.userData.noEdges = true;
      x.add(tp);
    }

    g.add(x);

    parts.push(
      finalizeMountUltra34Part(
        'mount-xdetect-bridge',
        79,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, 22.6),
        new THREE.Vector3(48, -62, 34),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M80: Mainboard-Side 16-Pin 0.3mm-Pitch Back-Flip ZIF Mount-Bus Connector & EMI Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    const zif = new THREE.Group();
    zif.position.set(0, -32.4, 0);

    // Precision molded ivory LCP ultra-fine-pitch ZIF body
    const body = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 2.1, 4.6, 0.35, 0.08, 'y'),
      mats.zifIvoryPlastic
    );
    zif.add(body);

    // Hinged matte-black PPS back-flip locking actuator lever (slightly raised for clarity)
    const lever = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 0.62, 1.85, 0.2, 0.05, 'y'),
      mats.matteBlackAnodized
    );
    lever.position.set(0, 1.28, -1.15);
    lever.rotation.x = -0.22;
    zif.add(lever);

    // 16 staggered 0.3mm-pitch gold-plated contact terminals protruding fore & aft
    for (let i = 0; i < 16; i++) {
      const tx = -4.9 + (i / 15) * 9.8;
      const isFront = i % 2 === 0;
      const pin = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.36, 1.2),
        mats.goldPlating
      );
      pin.position.set(tx, -0.78, isFront ? 2.55 : -2.55);
      pin.userData.noEdges = true;
      zif.add(pin);
    }

    // Twin stainless mechanical hold-down anchor ears on ±X ends
    for (const sx of [-6.95, 6.95]) {
      const ear = new THREE.Mesh(
        createChamferedBoxGeo(1.1, 1.4, 3.6, 0.15, 0.04, 'y'),
        mats.stainlessMachined
      );
      ear.position.set(sx, -0.35, 0);
      zif.add(ear);
    }

    // Conductive Ni-Cu EMI grounding foam pad under connector tail
    const emiPad = new THREE.Mesh(
      createChamferedBoxGeo(11.2, 0.72, 2.4, 0.3, 0.05, 'y'),
      mats.conductiveNiCuFoam
    );
    emiPad.position.set(0, -1.42, 0);
    zif.add(emiPad);

    g.add(zif);

    parts.push(
      finalizeMountUltra34Part(
        'mount-zif-mainboard-conn',
        80,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, 15.8),
        new THREE.Vector3(0, -78, -54),
        cp,
        0.24
      )
    );
  }

  return parts;
}
