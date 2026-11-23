import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  createTorsionSpringGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { BODY_MICRO_EXPLANATIONS } from './bodyMicroExplanations';

function finalizeStandaloneBodyMicroPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.24
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

  return {
    id,
    subsystem: 'body',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: BODY_MICRO_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Build 22 ultra-fine real-world standalone-only Camera Body sub-parts (B39–B60).
 * Shown ONLY in individual Body view ('body'); omitted in whole-camera views ('integrated', 'camera_body').
 */
export function buildBodyMicroParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // B39: Central Structural Magnesium Core Chassis (Sony Ref.362 MAIN FRAME ASSY)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main load-bearing central Mg-Al bulkhead frame with central sensor/shutter cutout & truss ribs
    const coreShape = createFrameShape(114.0, 68.0, 5.2, 54.0, 40.0, 4.0, 6.0, 0);
    const corePlate = new THREE.Mesh(
      extrudeCentered(coreShape, 4.6, 0.22, 0.22, 18),
      mats.magnesiumCast
    );
    g.add(corePlate);

    // Side structural stiffening wings & thermal-contact machined boss pads
    for (const sx of [-48.0, 46.0]) {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(8.5, 58.0, 14.0), mats.magnesiumCast);
      wing.position.set(sx, 0, -2.0);
      g.add(wing);
    }
    for (const [bx, by] of [
      [-32.0, 26.0],
      [34.0, 26.0],
      [-32.0, -26.0],
      [34.0, -26.0],
    ] as Array<[number, number]>) {
      const boss = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.6, 5.8, 16).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      boss.position.set(bx, by, 0);
      g.add(boss);
    }

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-main-internal-frame',
        39,
        '#64748b',
        g,
        new THREE.Vector3(-6.0, 0, -4.0),
        new THREE.Vector3(0, 0, -14),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B40: Removable Left-Flank Side Cabinet Shell (Sony Ref.8 SIDE CABINET ASSY)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculpted +X left-flank outer magnesium shell housing 3 I/O port bays + speaker grille
    const shellShape = createFrameShape(42.0, 66.0, 5.0, 20.0, 44.0, 2.2, 0, -2.0);
    const sideWall = new THREE.Mesh(
      extrudeCentered(shellShape, 3.2, 0.22, 0.22, 18).rotateY(Math.PI / 2),
      mats.bodyMgShell
    );
    g.add(sideWall);

    // Curved front & rear return flanges wrapping body corners
    for (const sz of [-20.5, 20.5]) {
      const flange = new THREE.Mesh(new THREE.BoxGeometry(6.5, 64.0, 2.2), mats.bodyMgShell);
      flange.position.set(-2.8, 0, sz);
      g.add(flange);
    }

    // Precision acoustic speaker port pinhole grille at lower-rear flank
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const dot = new THREE.Mesh(
          new THREE.CylinderGeometry(0.55, 0.55, 3.5, 10).rotateZ(Math.PI / 2),
          mats.mountVelvetBaffle
        );
        dot.position.set(0.1, -24.5 - r * 2.2, -13.0 + c * 2.1);
        dot.userData.noEdges = true;
        g.add(dot);
      }
    }

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-side-cabinet',
        40,
        '#1e293b',
        g,
        new THREE.Vector3(54.8, -1.0, -5.0),
        new THREE.Vector3(78, -6, -8),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B41: Reinforced Bottom Inner Plate & Waterproof Potting Sub-Assy (Sony Ref.14 & Ref.17)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual-layer SUS304 internal floor reinforcement plate above outer baseplate
    const innerPlateShape = createFrameShape(116.0, 46.0, 4.5, 26.0, 28.0, 2.5, -46.0, 1.5);
    const innerPlate = new THREE.Mesh(
      extrudeCentered(innerPlateShape, 1.6, 0.1, 0.1, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    g.add(innerPlate);

    // Waterproof potted sealing barrier sub-assembly (Sony Ref.17 BOTTOM WP POTTING B-ASSY)
    const pottingSeal = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(64.0, 34.0, 3.2), 1.4, 0.12, 0.12, 16).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    pottingSeal.position.set(14.0, 1.35, -1.0);
    g.add(pottingSeal);

    // 6 perimeter alignment bosses & bottom gasket lip
    for (const [bx, bz] of [
      [-18, -18],
      [18, -18],
      [44, -18],
      [-18, 18],
      [18, 18],
      [44, 18],
    ] as Array<[number, number]>) {
      const boss = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 2.4, 14), mats.brassGear);
      boss.position.set(bx, 0.5, bz);
      g.add(boss);
    }

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-bottom-inner-plate',
        41,
        '#94a3b8',
        g,
        new THREE.Vector3(-6.0, -34.2, -1.0),
        new THREE.Vector3(0, -76, -6),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B42: Two-Piece Die-Cut Grip Adhesive Sealing Sheets (Sony Ref.11 & Ref.12)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sheet 1: Front curved right-grip die-cut acrylic adhesive sheet tucked cleanly under elastomer grip skin
    const sheet1 = new THREE.Mesh(
      new THREE.CylinderGeometry(18.1, 18.1, 52.0, 28, 1, true, -Math.PI * 0.48, Math.PI * 0.78),
      mats.thermalTransferTape
    );
    sheet1.position.set(1.2, 0, 9.6);
    g.add(sheet1);

    // Sheet 2: Lateral palm-wrap secondary die-cut adhesive tape strip
    const sheet2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 48.0, 21.0), mats.mylarInsulatorFilm);
    sheet2.position.set(-14.4, -1.0, -5.0);
    g.add(sheet2);

    // 3 red pull-liner service peel tabs highlighting single-use replacement strips
    for (const ty of [-16.0, 0, 16.0]) {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.8, 0.35), mats.bodyRecRed);
      tab.position.set(-14.6, ty, 5.8);
      tab.userData.noEdges = true;
      g.add(tab);
    }

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-grip-adhesive-sheets',
        42,
        '#d97706',
        g,
        new THREE.Vector3(-56.0, -2.0, 12.0),
        new THREE.Vector3(-56, 4, 34),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B43: MI Hot-Shoe Dust Cap (Ref.9), Screw Cover (Ref.329) & Waterproof FPC Rubber (Ref.324)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Removable slide-in MI Shoe Cap (Sony Ref.9 SHOE CAP 875)
    const capTop = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.4, 21.8, 1.8), 2.6, 0.14, 0.14, 14).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    capTop.position.set(0, 1.8, 0.5);
    const capRails = new THREE.Mesh(new THREE.BoxGeometry(19.2, 1.2, 19.0), mats.bodyMgShell);
    capRails.position.set(0, 0.2, 0.5);

    // Slide-out stainless MI Shoe Screw Cover Plate (Ref.329) & Shell Plate (Ref.327)
    const screwCover = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(17.6, 15.2, 1.0), 0.55, 0.04, 0.04, 12).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    screwCover.position.set(0, -1.6, 0.2);

    // Molded EPDM Waterproof FPC Entry Rubber Gasket (Ref.324 MI SHOE FPC WP RUBBER)
    const wpRubber = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(19.8, 6.4, 1.2), 1.6, 0.08, 0.08, 12).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    wpRubber.position.set(0, -3.4, 7.6);

    g.add(capTop, capRails, screwCover, wpRubber);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-shoe-cap-cover',
        43,
        '#334155',
        g,
        new THREE.Vector3(0, 61.2, -7.5),
        new THREE.Vector3(0, 96, -4),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B44: Vibration-Isolated 3-Axis MEMS Gyro Sub-PCB (Sony Ref.408 GY-1018) & Dual Cushions
  // =========================================================================
  {
    const g = new THREE.Group();
    // Green HDI MEMS Gyro daughterboard (GY-1018)
    const gyroPcb = new THREE.Mesh(new THREE.BoxGeometry(12.5, 16.5, 1.1), mats.hdiMainboardPcb);
    g.add(gyroPcb);

    // 3-Axis ultra-low-noise MEMS Angular-Rate Gyro QFN IC + decoupling caps
    const gyroIc = new THREE.Mesh(new THREE.BoxGeometry(4.6, 4.6, 1.05), mats.icEpoxy);
    gyroIc.position.set(0, 1.2, 0.9);
    const goldMark = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.15), mats.goldPlating);
    goldMark.position.set(-1.3, 2.5, 1.48);
    goldMark.userData.noEdges = true;
    const fpcTail = new THREE.Mesh(new THREE.BoxGeometry(5.2, 8.5, 0.24), mats.polyimideFpc);
    fpcTail.position.set(0, -11.0, 0);
    g.add(gyroIc, goldMark, fpcTail);

    // Dual viscoelastic isolation cushions (Sony Ref.407 & Ref.409 CUSHION GYRO)
    const cushFront = new THREE.Mesh(new THREE.BoxGeometry(13.6, 17.6, 2.0), mats.butylDamperRubber);
    cushFront.position.set(0, 0, 2.4);
    const cushRear = new THREE.Mesh(new THREE.BoxGeometry(13.6, 17.6, 2.0), mats.lensFoamSeal);
    cushRear.position.set(0, 0, -2.0);
    g.add(cushFront, cushRear);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-gyro-sensor-unit',
        44,
        '#10b981',
        g,
        new THREE.Vector3(-38.5, -10.0, -8.5),
        new THREE.Vector3(-28, -44, -22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B45: Concentric Still/Movie/S&Q Mode Ring, Steel-Ball Detent Holder & Seal (Ref.319–322)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Lower concentric levered Still/Movie/S&Q selector ring under Mode Dial
    const ringShape = new THREE.Shape();
    ringShape.absarc(0, 0, 11.8, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 7.6, 0, Math.PI * 2, true);
    ringShape.holes.push(hole);
    const selectorRing = new THREE.Mesh(
      extrudeCentered(ringShape, 3.2, 0.14, 0.14, 36).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    g.add(selectorRing);

    // Ergonomic thumb switch lever arm + red Movie dot accent
    const leverArm = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.0, 7.8), mats.bodyMgShell);
    leverArm.position.set(-7.5, 0, -11.5);
    leverArm.rotation.y = 0.45;
    const movieDot = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.4, 14), mats.bodyRecRed);
    movieDot.position.set(-9.2, 1.7, -4.5);
    g.add(leverArm, movieDot);

    // AM DIAL BALL HOLDER (Ref.320), STEEL BALL (Ref.321), SV DIAL SPRING (Ref.319) & WP CUSHION B (Ref.322)
    const ballHolder = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.2, 4.5), mats.brassGear);
    ballHolder.position.set(9.2, -2.6, 0);
    const steelBall = new THREE.Mesh(new THREE.SphereGeometry(1.15, 14, 12), mats.pureIronArmature);
    steelBall.position.set(9.2, -1.2, 0);
    const svSpring = new THREE.Mesh(
      createHelicalSpringGeometry(0.9, 3.2, 5, 0.16).rotateX(Math.PI / 2),
      mats.mountSpringSteel
    );
    svSpring.position.set(9.2, -4.2, 0);
    svSpring.userData.noEdges = true;
    const wpCushion = new THREE.Mesh(
      new THREE.TorusGeometry(9.6, 0.65, 10, 36).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    wpCushion.position.set(0, -2.2, 0);
    wpCushion.userData.noEdges = true;
    g.add(ballHolder, steelBall, svSpring, wpCushion);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-still-movie-sq-lever',
        45,
        '#dc2626',
        g,
        new THREE.Vector3(-24.0, 38.2, -6.0),
        new THREE.Vector3(-24, 82, -12),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B46: Silent-Damped Triangular Strap Rings & Protective POM Clip Holders (Ref.314 / Ref.315)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [sx, sz] of [
      [-68.0, 2.0],
      [58.5, -2.0],
    ] as Array<[number, number]>) {
      const sideSign = Math.sign(sx);
      // Stainless triangular split ring (Sony Ref.315 EYELET TRIANGLE)
      const triPts = [
        new THREE.Vector3(0, 3.8, 0),
        new THREE.Vector3(sideSign * 5.2, -4.4, -4.6),
        new THREE.Vector3(sideSign * 5.2, -4.4, 4.6),
        new THREE.Vector3(0, 3.8, 0),
      ];
      const triCurve = new THREE.CatmullRomCurve3(triPts, true, 'catmullrom', 0.15);
      const triRing = new THREE.Mesh(
        new THREE.TubeGeometry(triCurve, 36, 0.72, 10, true),
        mats.stainlessMachined
      );
      triRing.position.set(sx, 0, sz);
      g.add(triRing);

      // Silent anti-rattle & scratch-guard POM holder cover (Sony Ref.314 HOLDER EYELET TRIANGLE)
      const pomHolder = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(8.2, 9.8, 1.8), 2.4, 0.14, 0.14, 12).rotateY(Math.PI / 2),
        mats.matteBlackAnodized
      );
      pomHolder.position.set(sx + sideSign * 2.8, -1.6, sz);
      g.add(pomHolder);
    }

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-strap-triangles',
        46,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 23.0, -1.0),
        new THREE.Vector3(0, 44, 52),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B47: Battery-Hatch Integrated EPDM Dummy-Battery DC-Coupler Cable Flap
  // =========================================================================
  {
    const g = new THREE.Group();
    // Flexible molded EPDM micro-hatch flap & twin-lip weather seal
    const flapBody = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.8, 6.2, 1.6), 2.1, 0.12, 0.12, 14).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    const cableNotch = new THREE.Mesh(
      new THREE.CylinderGeometry(1.75, 1.75, 2.5, 14),
      mats.butylDamperRubber
    );
    cableNotch.position.set(0, 0.2, 2.4);
    const hingeTether = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.2, 4.2), mats.epdmGasket);
    hingeTether.position.set(0, 0.8, -4.2);
    const nailTab = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.9, 1.8), mats.bodyLeatherette);
    nailTab.position.set(0, -1.1, 2.2);

    g.add(flapBody, cableNotch, hingeTether, nailTab);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-dc-coupler-flap',
        47,
        '#475569',
        g,
        new THREE.Vector3(-54.5, -37.2, 16.5),
        new THREE.Vector3(-78, -68, 36),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B48: Interior Acoustic Shutter-Damping Foam Pads (Sony Ref.76 / Ref.59 REAR MUFFLE CUSHION A & B)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cushion A (larger upper-central open-cell urethane acoustic damper pad)
    const cushA = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.0, 22.0, 2.4), 2.2, 0.16, 0.16, 14),
      mats.butylDamperRubber
    );
    cushA.position.set(4.0, 8.0, 0);
    // Cushion B (secondary lateral acoustic absorber strip beside shutter/card bay)
    const cushB = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 28.0, 2.0), 2.0, 0.14, 0.14, 14),
      mats.lensFoamSeal
    );
    cushB.position.set(-28.0, -4.0, -0.4);
    g.add(cushA, cushB);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-muffle-cushions',
        48,
        '#334155',
        g,
        new THREE.Vector3(-6.0, 4.0, -28.0),
        new THREE.Vector3(22, 18, -58),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B49: CFexpress/SD Access LED Light-Pipe, Media-Lid Ground Sheet & Hinge Shaft (Ref.75/120/121)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Optical TIR polycarbonate access LED light-pipe prism + glowing red indicator tip
    const lightPipe = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 11.5), mats.evfAntiFogGlass);
    lightPipe.position.set(0, 0, 0);
    const ledTip = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.15, 1.4, 14).rotateX(Math.PI / 2),
      mats.bodyRecRed
    );
    ledTip.position.set(0, 0, -6.2);

    // Media-lid stainless rotation shaft (Ref.120) & pop-open torsion spring (Ref.121)
    const lidShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 36.0, 14),
      mats.stainlessMachined
    );
    lidShaft.position.set(-5.8, 14.0, 6.0);
    const lidSpring = new THREE.Mesh(
      createTorsionSpringGeometry(1.45, 5.2, 4.5, 0.2, 5.0).rotateX(Math.PI / 2),
      mats.mountSpringSteel
    );
    lidSpring.position.set(-5.8, 16.0, 6.0);
    lidSpring.userData.noEdges = true;

    // Conductive EMI/ESD Media-Lid Ground Sheet (Ref.75 REAR MEDIA LID GND SHEET)
    const gndSheet = new THREE.Mesh(new THREE.BoxGeometry(11.0, 26.0, 0.25), mats.beCuSpring);
    gndSheet.position.set(2.8, 12.0, 3.8);

    g.add(lightPipe, ledTip, lidShaft, lidSpring, gndSheet);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-card-access-led-pipe',
        49,
        '#ef4444',
        g,
        new THREE.Vector3(-62.5, -21.0, -24.0),
        new THREE.Vector3(-88, -28, -42),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B50: Split Rear Button Retainer Plates L/R & Waterproof Silicone Boots (Ref.65–112)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Right cluster stainless retainer plate (AF-ON, AEL, C1, Fn, Play, Delete)
    const plateR = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 48.0, 2.2), 0.75, 0.06, 0.06, 14),
      mats.stainlessMachined
    );
    plateR.position.set(-6.0, 0, 0.6);

    // Left top cluster retainer plate (MENU / C3)
    const plateL = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(22.0, 14.0, 2.0), 0.75, 0.06, 0.06, 14),
      mats.stainlessMachined
    );
    plateL.position.set(64.0, 24.0, 0.6);

    // Molded waterproof silicone button boots (C1/AF/AEL, Playback/Delete, C3/MENU, Joy Rubber)
    const bootCoords: Array<[number, number, number]> = [
      [-10.0, 18.0, 3.6],
      [-2.0, 18.0, 3.4],
      [-10.0, 7.0, 4.4],
      [-10.0, -14.0, 3.4],
      [-2.0, -20.0, 3.4],
      [60.0, 24.0, 3.6],
      [69.0, 24.0, 3.4],
    ];
    for (const [bx, by, r] of bootCoords) {
      const boot = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r * 1.15, 2.2, 18).rotateX(Math.PI / 2),
        mats.epdmGasket
      );
      boot.position.set(bx, by, -0.8);
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.78, r * 0.78, 1.2, 18).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      cap.position.set(bx, by, -2.0);
      g.add(boot, cap);
    }

    g.add(plateR, plateL);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-rear-button-retainers',
        50,
        '#64748b',
        g,
        new THREE.Vector3(-42.0, 2.0, -31.5),
        new THREE.Vector3(-56, 2, -64),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B51: Top-Deck REC/C2 Custom Button Pod, Shade Sheet & WP Cushion (Ref.264–269)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stamped stainless CUSTOM BUTTON PLATE (Ref.264)
    const btnPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 13.5, 2.0), 0.75, 0.06, 0.06, 12).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    // Molded waterproof CUSTOM BUTTON RUBBER (Ref.266)
    const btnRubber = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.5, 11.2, 1.8), 1.4, 0.08, 0.08, 12).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    btnRubber.position.y = 1.2;

    // Prominent Red-Ring REC Button (Ref.267) + C2 Custom Button (Ref.268)
    const recBtn = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.8, 2.2, 22), mats.matteBlackAnodized);
    recBtn.position.set(-5.2, 2.8, 0);
    const recRing = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.42, 10, 24).rotateX(Math.PI / 2), mats.bodyRecRed);
    recRing.position.set(-5.2, 3.85, 0);
    recRing.userData.noEdges = true;

    const c2Btn = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.4, 1.9, 22), mats.matteBlackAnodized);
    c2Btn.position.set(5.4, 2.6, 0);

    // RL FPC SHADE SHEET (Ref.265) + TOP WP CUSHION F3 (Ref.269) underneath
    const shadeSheet = new THREE.Mesh(new THREE.BoxGeometry(25.0, 0.25, 14.2), mats.matteBlackAnodized);
    shadeSheet.position.y = -1.4;
    const wpCushF3 = new THREE.Mesh(new THREE.BoxGeometry(22.0, 1.2, 11.5), mats.lensFoamSeal);
    wpCushF3.position.y = -2.4;

    g.add(btnPlate, btnRubber, recBtn, recRing, c2Btn, shadeSheet, wpCushF3);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-top-rec-c2-subassy',
        51,
        '#dc2626',
        g,
        new THREE.Vector3(-32.0, 38.5, -14.0),
        new THREE.Vector3(-44, 78, -28),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B52: Focal-Plane Distance Index Mark (Φ at z = 0.0 mm) & Model Crest Badge
  // =========================================================================
  {
    const g = new THREE.Group();
    // Recessed precision metallic inlay plaque located accurately at z = 0.00 mm (sensor surface!)
    const plaque = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(22.0, 10.5, 1.6), 0.75, 0.06, 0.06, 12).rotateX(Math.PI / 2),
      mats.bodyMgShell
    );
    g.add(plaque);

    // White engraved Φ (circle + z=0 datum hairline bar)
    const phiCircle = new THREE.Mesh(
      new THREE.TorusGeometry(2.3, 0.34, 8, 24).rotateX(Math.PI / 2),
      mats.zifIvoryPlastic
    );
    phiCircle.position.set(-4.5, 0.52, 0);
    phiCircle.userData.noEdges = true;
    const phiLine = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.32, 0.62), mats.zifIvoryPlastic);
    phiLine.position.set(-4.5, 0.52, 0);

    // Metallic Alpha flagship badge crest plate hiding service fastener underneath
    const crestPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(8.6, 5.4, 0.8), 0.52, 0.04, 0.04, 10).rotateX(Math.PI / 2),
      mats.cinnabarAnodized
    );
    crestPlate.position.set(5.4, 0.55, 0);

    g.add(phiCircle, phiLine, crestPlate);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-focal-plane-badge',
        52,
        '#d95b26',
        g,
        new THREE.Vector3(24.0, 38.8, 0.0),
        new THREE.Vector3(34, 76, 18),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // B53: Speaker EMI Ground Sheet & PC Electrical Insulation Sheets (Ref.414/415/356/361)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Conductive copper-nickel EMI grounding sheet (Ref.414 SPEAKER GND SHEET)
    const spGnd = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 14.0, 1.8), 0.24, 0.02, 0.02, 12),
      mats.beCuSpring
    );
    spGnd.position.set(0, 0, 1.4);

    // Flame-retardant polycarbonate electrical insulation sheet (Ref.415 / Ref.356 / Ref.361)
    const insSheetA = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.0, 24.0, 2.2), 0.28, 0.02, 0.02, 12),
      mats.mylarInsulatorFilm
    );
    insSheetA.position.set(-14.0, 8.0, 0);

    const insSheetB = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 18.0, 1.8), 0.25, 0.02, 0.02, 12),
      mats.matteBlackAnodized
    );
    insSheetB.position.set(-4.0, -4.0, -1.2);

    g.add(spGnd, insSheetA, insSheetB);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-speaker-emi-insulator',
        53,
        '#ca8a04',
        g,
        new THREE.Vector3(36.0, -24.0, -24.0),
        new THREE.Vector3(64, -46, -42),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B54: Ferromagnetic Magnetic Field Cut Plate (Sony Ref.352 MAGNETIC FIELD CUT PLATE 891)
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-permeability ferromagnetic Permalloy/silicon-steel shield wall isolating IBIS/LCD magnets
    const shieldPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(58.0, 42.0, 3.0), 0.55, 0.05, 0.05, 16),
      mats.pureIronArmature
    );
    g.add(shieldPlate);

    // Stamped stiffening emboss ribs & 3 chassis ground tabs
    for (const sy of [-12.0, 0, 12.0]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(46.0, 2.2, 0.85), mats.lensPermalloyShield);
      rib.position.set(0, sy, 0.35);
      g.add(rib);
    }
    for (const [gx, gy] of [
      [-26.0, 18.5],
      [26.0, 18.5],
      [0, -19.5],
    ] as Array<[number, number]>) {
      const scr = createPrecisionScrew(1.2, 0.45, 2.6, mats.stainlessMachined);
      scr.rotation.y = Math.PI;
      scr.position.set(gx, gy, -0.45);
      g.add(scr);
    }

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-mag-field-cut-plate',
        54,
        '#94a3b8',
        g,
        new THREE.Vector3(2.0, -4.0, -26.5),
        new THREE.Vector3(28, -22, -64),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B55: Full-Size Type-A HDMI Twin Clamp Brackets (HOLDER HDMI A/B) & Light Shield (Ref.463–467)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper & lower steel clamping brackets (HOLDER HDMI A & B) anchoring Type-A HDMI to frame
    const holderA = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(14.5, 19.5, 1.4), 3.6, 0.12, 0.12, 12).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    holderA.position.set(0, 0, 0);
    const holderB = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(12.2, 17.5, 1.2), 2.4, 0.1, 0.1, 12).rotateY(Math.PI / 2),
      mats.emiShieldCan
    );
    holderB.position.set(-4.2, 0, 0);

    // Full-size Type-A HDMI connector shell + HD-1009 modular flex tail
    const hdmiShell = new THREE.Mesh(new THREE.BoxGeometry(10.5, 15.2, 5.4), mats.stainlessMachined);
    hdmiShell.position.set(-1.5, 0, 0);
    const hdFlex = new THREE.Mesh(new THREE.BoxGeometry(12.0, 11.5, 0.25), mats.polyimideFpc);
    hdFlex.position.set(-10.5, 0, -2.5);

    // Matte-black HDMI LIGHT SHIELD SHEET (Ref.463) preventing rear light-leak through port gap
    const lightShield = new THREE.Mesh(
      extrudeCentered(createFrameShape(18.0, 23.0, 1.6, 7.2, 15.6, 0.8), 0.35, 0.02, 0.02, 12).rotateY(Math.PI / 2),
      mats.matteBlackAnodized
    );
    lightShield.position.set(2.4, 0, 0);

    g.add(holderA, holderB, hdmiShell, hdFlex, lightShield);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-hdmi-light-shield',
        55,
        '#0ea5e9',
        g,
        new THREE.Vector3(51.2, 6.0, -14.0),
        new THREE.Vector3(76, 26, -24),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B56: Vertical-Grip High-Current Bus FPC (VG-1007) & Stainless Fix Plate (Ref.403 / Ref.404)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 2-oz heavy-copper L-shaped VG-1007 flex bus routing from bottom vertical grip port to mainboard
    const fpcVert = new THREE.Mesh(new THREE.BoxGeometry(0.32, 34.0, 13.5), mats.polyimideFpc);
    fpcVert.position.set(0, 8.0, 0);
    const fpcHoriz = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.32, 13.5), mats.polyimideFpc);
    fpcHoriz.position.set(8.0, -9.0, 0);

    // Gold-plated 12-pin solder pad bar & ZIF upper termination
    const zifTop = new THREE.Mesh(new THREE.BoxGeometry(0.55, 4.2, 12.2), mats.goldPlating);
    zifTop.position.set(0.2, 23.5, 0);

    // Stamped stainless VG FPC FIX PLATE (Ref.403) clamping flex flush against battery bay wall
    const fixPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(15.5, 22.0, 1.6), 0.85, 0.06, 0.06, 12).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    fixPlate.position.set(-1.1, 4.0, 0);
    const fixScrew = createPrecisionScrew(1.2, 0.45, 2.5, mats.stainlessMachined);
    fixScrew.rotation.y = -Math.PI / 2;
    fixScrew.position.set(-1.8, 12.0, 0);

    g.add(fpcVert, fpcHoriz, zifTop, fixPlate, fixScrew);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-vg-fpc-retainer',
        56,
        '#ea580c',
        g,
        new THREE.Vector3(-44.0, -24.0, -8.0),
        new THREE.Vector3(-44, -76, -26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B57: Top-Deck Dual-Band Wi-Fi/BT Antenna Sub-Board (AN-1043) & 45mm Micro-Coax (Ref.262/263)
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-frequency Rogers/FR-4 AN-1043 dual-band inverted-F antenna board
    const antPcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 10.5, 1.2), 0.9, 0.06, 0.06, 12).rotateX(Math.PI / 2),
      mats.hdiMainboardPcb
    );
    // Gold meandered 2.4/5 GHz dual-band radiator traces
    const traceA = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.16, 2.4), mats.goldPlating);
    traceA.position.set(-2.0, 0.56, 2.2);
    const traceB = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.16, 2.2), mats.goldPlating);
    traceB.position.set(3.5, 0.56, -2.2);
    const uflConn = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 1.1, 12), mats.goldPlating);
    uflConn.position.set(-9.2, -0.7, -2.2);
    g.add(antPcb, traceA, traceB, uflConn);

    // 45 mm φ0.81 mm 50-Ohm gold-braided micro-coaxial cable routing down toward mainboard RF frontend
    const coaxCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9.2, -1.2, -2.2),
      new THREE.Vector3(-12.0, -6.0, -10.5),
      new THREE.Vector3(-8.5, -18.0, -19.0),
      new THREE.Vector3(-14.0, -28.0, -24.5),
    ]);
    const coaxMesh = new THREE.Mesh(
      new THREE.TubeGeometry(coaxCurve, 32, 0.55, 8, false),
      mats.rfGoldCoax
    );
    g.add(coaxMesh);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-top-antenna-coax',
        57,
        '#eab308',
        g,
        new THREE.Vector3(34.0, 38.0, 8.0),
        new THREE.Vector3(56, 70, 22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B58: Coaxial Shutter-Collar Power ON/OFF Lever, Detent Spring & Red Silicone O-Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Coaxial rotating power collar ring surrounding shutter release shaft
    const collarShape = new THREE.Shape();
    collarShape.absarc(0, 0, 8.4, 0, Math.PI * 2, false);
    const bore = new THREE.Path();
    bore.absarc(0, 0, 5.4, 0, Math.PI * 2, true);
    collarShape.holes.push(bore);
    const collar = new THREE.Mesh(
      extrudeCentered(collarShape, 2.6, 0.14, 0.14, 32).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    // Ergonomic sculpted index-finger power toggle tab
    const toggleTab = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.2, 6.2), mats.bodyMgShell);
    toggleTab.position.set(2.2, 0.4, 9.6);
    toggleTab.rotation.y = 0.25;

    // Red high-lubricity dynamic rotary shaft sealing silicone O-ring
    const redORing = new THREE.Mesh(
      new THREE.TorusGeometry(6.6, 0.55, 12, 32).rotateX(Math.PI / 2),
      mats.bodyRecRed
    );
    redORing.position.y = -1.75;
    redORing.userData.noEdges = true;

    // Two-position stainless tactile detent leaf spring & stop cam
    const detentLeaf = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.45, 2.2), mats.mountSpringSteel);
    detentLeaf.position.set(-4.5, -2.8, -5.8);
    detentLeaf.rotation.y = 0.55;

    g.add(collar, toggleTab, redORing, detentLeaf);

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-power-lever-mechanism',
        58,
        '#ef4444',
        g,
        new THREE.Vector3(-54.5, 34.5, 20.5),
        new THREE.Vector3(-58, 66, 48),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // B59: Vibration-Isolating Stereo Mic Rubber Boots (Ref.304) & Mic Holder (Ref.308)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded ABS/PC MIC HOLDER bar (Sony Ref.308) bridging L/R stereo capsules
    const holderBar = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(36.0, 9.2, 1.8), 2.8, 0.12, 0.12, 14).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    g.add(holderBar);

    // Twin soft 30-Shore-A shock-isolation rubber boots (Ref.304 RUBBER MICROPHONE) + brass capsules
    for (const mx of [-13.5, 13.5]) {
      const boot = new THREE.Mesh(
        new THREE.CylinderGeometry(4.2, 4.5, 5.2, 22),
        mats.butylDamperRubber
      );
      boot.position.set(mx, 0.4, 0);
      const micCapsule = new THREE.Mesh(
        new THREE.CylinderGeometry(2.8, 2.8, 3.6, 20),
        mats.brassGear
      );
      micCapsule.position.set(mx, 1.4, 0);
      const windMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(3.0, 3.0, 0.35, 20),
        mats.emiShieldCan
      );
      windMesh.position.set(mx, 3.3, 0);
      g.add(boot, micCapsule, windMesh);
    }

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-mic-rubber-mount',
        59,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 35.5, 19.5),
        new THREE.Vector3(0, 62, 54),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B60: Recessed LCD Bay Cover Plate (Ref.53), Dual WP Cushions & Cable Grommet (Ref.78)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Recessed inner LCD pocket protective cover plate (Sony Ref.53 REAR LC COVER)
    const lcCover = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(74.0, 48.0, 3.2), 1.4, 0.1, 0.1, 16),
      mats.bodyMgShell
    );
    g.add(lcCover);

    // Twin die-cut perimeter waterproof foam cushions (Ref.54 RE LC WP CUSHION A & Ref.124 B)
    const wpFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(76.4, 50.4, 3.6, 70.8, 44.8, 2.6), 1.1, 0.08, 0.08, 16),
      mats.epdmGasket
    );
    wpFrame.position.z = 1.15;
    g.add(wpFrame);

    // Molded silicone Swivel Cable Waterproof Grommet (Sony Ref.78 SV WP CABLE GROMMET) on +X hinge edge
    const cableGrommet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(6.8, 14.5, 2.0), 4.6, 0.16, 0.16, 12),
      mats.butylDamperRubber
    );
    cableGrommet.position.set(36.2, 0, -0.4);
    const grommetBore = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 5.2, 14).rotateX(Math.PI / 2),
      mats.coaxShieldCopper
    );
    grommetBore.position.set(36.2, 0, -0.4);
    g.add(cableGrommet, grommetBore);

    // 3 hidden rear chassis screws under the LCD bay (Kolari Vision A7R V teardown signature!)
    for (const [sx, sy] of [
      [-28.0, 18.0],
      [28.0, 18.0],
      [0, -18.5],
    ] as Array<[number, number]>) {
      const scr = createPrecisionScrew(1.3, 0.45, 3.0, mats.stainlessMachined);
      scr.rotation.y = Math.PI;
      scr.position.set(sx, sy, -0.9);
      g.add(scr);
    }

    parts.push(
      finalizeStandaloneBodyMicroPart(
        'body-rear-lc-cover-seals',
        60,
        '#3b82f6',
        g,
        new THREE.Vector3(10.0, -8.0, -33.2),
        new THREE.Vector3(34, -12, -80),
        cp,
        0.24
      )
    );
  }

  return parts;
}
