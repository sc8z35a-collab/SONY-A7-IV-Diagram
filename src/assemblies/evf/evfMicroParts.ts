import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createOpticalLensGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { EVF_OPTICAL_Y } from './evfParts';
import { EVF_MICRO_EXPLANATIONS } from './evfMicroExplanations';

function finalizeStandaloneEvfMicroPart(
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
    subsystem: 'evf',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: EVF_MICRO_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

function createRingCell(
  innerR: number,
  outerR: number,
  depth: number,
  mat: THREE.Material
): THREE.Mesh {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const h = new THREE.Path();
  h.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(h);
  return new THREE.Mesh(extrudeCentered(s, depth, 0.05, 0.05, 36), mat);
}

/**
 * Build 24 ultra-fine standalone-only EVF & Viewfinder Surroundings OEM/optical micro-parts (E32–E55).
 * Rendered ONLY in standalone 'evf' view; completely omitted in whole-camera views
 * ('integrated', 'camera_body').
 *
 * Coordinate reference (matches evfParts.ts):
 * - Optical axis: x = 0, y = EVF_OPTICAL_Y (39.5)
 * - Eyecup E01: z = -37.2, Subframe E27: -35.8, Latch E02: -34.6, Antifog E03: -32.2
 * - Eye sensor E04: (0, 28.4, -30.6)
 * - Lenses: G4 (-15.4), G2/G3 (-9.2), G1 (-2.4), Polarizer (+0.65), MLA (+2.55), OLED (+3.6)
 * - Housing E18 center: (0, 39.5, -12.5), top shoe deck world center: (0, 55.5, -8.3)
 * - Diopter dial world center: (+19.6, 39.5, -15.6)
 */
export function buildEvfMicroParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // E32. Sony OEM FINDER COVER (89100) (Ref.113: A5038709A) Rear Trim & Labyrinth Frame
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sculpted rear trim shroud framing eyepiece + lower eye-sensor pocket
    const trimShape = createFrameShape(32.2, 27.6, 5.0, 24.0, 18.6, 3.6, 0, 1.4);
    const trimMesh = new THREE.Mesh(
      extrudeCentered(trimShape, 1.45, 0.14, 0.14, 24),
      mats.bodyMgShell
    );
    g.add(trimMesh);

    // Lower eye-sensor protective bezel extension
    const esPocket = new THREE.Mesh(
      extrudeCentered(createFrameShape(17.2, 6.2, 1.4, 13.8, 3.4, 0.8), 1.35, 0.08, 0.08, 14),
      mats.matteBlackAnodized
    );
    esPocket.position.set(0, -11.0, 0.1);
    g.add(esPocket);

    // Stepped perimeter dust/water labyrinth lip on inner (+Z) mating rim
    const labyrinth = new THREE.Mesh(
      extrudeCentered(createFrameShape(30.6, 25.8, 4.4, 28.4, 23.6, 3.8), 0.8, 0.06, 0.06, 22),
      mats.epdmGasket
    );
    labyrinth.position.z = 0.85;
    g.add(labyrinth);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-finder-cover',
        32,
        '#334155',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 1.2, -35.0),
        new THREE.Vector3(0, -4, -58),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E33. Sony OEM EYE SENSOR WINDOW (850) (Ref.117: 501034401) IR-Pass Window & Optical Septum
  // =========================================================================
  {
    const g = new THREE.Group();

    // Glossy deep-ruby-black 940nm IR-pass acrylic window
    const winGlass = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(14.2, 4.0, 1.0), 0.72, 0.06, 0.06, 14),
      mats.evfIrWindowBlack
    );
    g.add(winGlass);

    // Critical opaque matte-black internal optical isolation septum wall between emitter & receiver!
    const septum = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 3.6, 1.85),
      mats.velvetFlockTrap
    );
    septum.position.set(-1.4, 0, 0.72);
    g.add(septum);

    // Secondary divider wall separating ambient photodiode on right
    const sep2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 3.4, 1.55),
      mats.matteBlackAnodized
    );
    sep2.position.set(2.8, 0, 0.62);
    g.add(sep2);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-eye-sensor-window',
        33,
        '#be123c',
        g,
        new THREE.Vector3(0, 28.4, -32.15),
        new THREE.Vector3(0, -24, -46),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E34. Sony OEM EYE SENSOR WP/RET Cushions (Ref.114/118), ES GND Sheet (Ref.115) & ES-1008 Flex
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front Waterproof Compression Cushion Ring (Ref.118: 501034501)
    const wpCush = new THREE.Mesh(
      extrudeCentered(createFrameShape(15.2, 5.0, 1.2, 11.4, 2.4, 0.6), 0.65, 0.05, 0.05, 12),
      mats.epdmGasket
    );
    wpCush.position.z = -0.65;
    // Rear Retention Foam Pad (Ref.114: 501142001)
    const retCush = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(15.6, 4.8, 1.0), 0.72, 0.05, 0.05, 12),
      mats.butylDamperRubber
    );
    retCush.position.z = 1.15;
    // Conductive EMI/ESD Ground Sheet (Ref.115: 502997201)
    const gndSheet = new THREE.Mesh(
      new THREE.BoxGeometry(16.0, 4.6, 0.16),
      mats.conductiveNiCuFoam
    );
    gndSheet.position.z = 1.62;
    // ES-1008 Flexible Board routing ribbon (Ref.116: A5022315A)
    const esFlex = new THREE.Mesh(
      new THREE.BoxGeometry(5.6, 8.8, 0.22),
      mats.polyimideFpc
    );
    esFlex.position.set(-4.2, 5.8, 0.95);
    const goldPad = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.4, 0.26), mats.goldPlating);
    goldPad.position.set(-4.2, 9.8, 0.95);

    g.add(wpCush, retCush, gndSheet, esFlex, goldPad);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-eye-sensor-cushions',
        34,
        '#f97316',
        g,
        new THREE.Vector3(0, 28.4, -31.1),
        new THREE.Vector3(-18, -32, -38),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E35. Sony OEM VF SHEET, RADIATION (795) (Ref.203: 457578001) & VF Flexible Adhesive (Ref.202)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Authentic Sony blue rectangular radiation sheet with pink edge strip (4-575-780-01!)
    const radSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(23.8, 18.0, 1.6), 0.45, 0.04, 0.04, 14),
      mats.thermalPadBlue
    );
    const pinkEdge = new THREE.Mesh(
      new THREE.BoxGeometry(23.2, 3.2, 0.48),
      mats.thermalPadPink
    );
    pinkEdge.position.set(0, -7.2, 0);
    // Anti-adhesion VF Flexible Adhesive protection film (Ref.202: 457581811)
    const adhFilm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.4, 15.6, 1.2), 0.16, 0.02, 0.02, 12),
      mats.mylarInsulatorFilm
    );
    adhFilm.position.z = 0.42;

    g.add(radSheet, pinkEdge, adhFilm);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-vf-radiation-sheet',
        35,
        '#38bdf8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 12.15),
        new THREE.Vector3(0, 8, 84),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E36. Sony OEM EVF PROTECTOR (89100) (Ref.303: 502790801) Top-Hump Shield Arch
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sculpted arched crown protector shielding EVF barrel from hot-shoe impact & flash EMI
    const archShape = new THREE.Shape();
    archShape.moveTo(-13.5, -1.6);
    archShape.lineTo(-10.5, 1.2);
    archShape.lineTo(-4.2, 3.0);
    archShape.lineTo(4.2, 3.0);
    archShape.lineTo(10.5, 1.2);
    archShape.lineTo(13.5, -1.6);
    archShape.lineTo(12.2, -2.2);
    archShape.lineTo(9.6, 0.2);
    archShape.lineTo(3.8, 1.9);
    archShape.lineTo(-3.8, 1.9);
    archShape.lineTo(-9.6, 0.2);
    archShape.lineTo(-12.2, -2.2);
    archShape.closePath();

    const arch = new THREE.Mesh(
      extrudeCentered(archShape, 36.0, 0.12, 0.12, 14),
      mats.emiShieldCan
    );
    g.add(arch);

    // Top-side thin black insulating pad under hot-shoe fix plate
    const insPad = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.25, 22.0), mats.mylarInsulatorFilm);
    insPad.position.set(0, 3.15, 2.5);
    g.add(insPad);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-evf-protector',
        36,
        '#94a3b8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 13.8, -12.5),
        new THREE.Vector3(0, 44, 4),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E37. Sony OEM DIOPTER COVER WP SHEET B (Ref.301) & CV DIOPTER ADJUST DIAL (Ref.2)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Inner waterproof elastomeric sliding seal sheet (Ref.301: 500374001)
    const wpSheet = new THREE.Mesh(
      extrudeCentered(createFrameShape(11.6, 11.6, 2.2, 3.2, 3.2, 1.5), 0.45, 0.04, 0.04, 16).rotateY(
        Math.PI / 2
      ),
      mats.epdmGasket
    );
    wpSheet.position.x = -2.2;
    // Outer protective cosmetic diopter cap cover (Ref.2: 500367201) + center service screw
    const capDisk = new THREE.Mesh(
      new THREE.CylinderGeometry(3.85, 3.85, 0.72, 28).rotateZ(Math.PI / 2),
      mats.matteBlackAnodized
    );
    capDisk.position.x = 3.95;
    const capRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.85, 0.26, 8, 28).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    capRing.position.x = 4.28;
    const singleScrew = createPrecisionScrew(0.85, 0.32, 1.4, mats.stainlessMachined);
    singleScrew.rotation.y = Math.PI / 2;
    singleScrew.position.x = 3.4;

    g.add(wpSheet, capDisk, capRing, singleScrew);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-diopter-wp-sheet',
        37,
        '#475569',
        g,
        new THREE.Vector3(19.6, EVF_OPTICAL_Y, -15.6),
        new THREE.Vector3(52, -16, -26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E38. Sony OEM JK-1028 Flexible Relay Board (Ref.206) & JK HOLDER (Ref.205)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Molded plastic cable-routing JK HOLDER (Ref.205: 502789601) tucked cleanly beside rear OLED bay
    const holder = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(2.6, 12.2, 0.9), 8.8, 0.08, 0.08, 12),
      mats.mountPpsInsulator
    );
    // Contoured JK-1028 Flexible Board tucked safely along holder R-guide (Ref.206: A5022316A)
    const flexPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.45, 4.6, -3.6),
      new THREE.Vector3(-1.6, 0.0, 0.0),
      new THREE.Vector3(-1.45, -5.0, 3.4),
      new THREE.Vector3(-0.6, -9.8, 3.8),
    ]);
    const fGeo = new THREE.TubeGeometry(flexPath, 18, 1.85, 6, false);
    fGeo.scale(0.14, 1, 1);
    const flex = new THREE.Mesh(fGeo, mats.polyimideFpc);
    // Gold ZIF connector fingers at bottom end
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.0, 3.8), mats.goldPlating);
    tip.position.set(-0.6, -10.7, 3.8);

    g.add(holder, flex, tip);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-jk1028-flex-holder',
        38,
        '#ea580c',
        g,
        new THREE.Vector3(-13.8, EVF_OPTICAL_Y - 4.2, 5.2),
        new THREE.Vector3(-42, -14, 18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E39. Sony OEM VF-Block Precision M1.7 Screws (Ref.204/207/208) & Wave Washers
  // =========================================================================
  {
    const g = new THREE.Group();

    // 4 Rear Eyecup-Perimeter M1.7 L=4.0mm Screws (Ref.207) + wave washers
    for (const [sx, sy] of [
      [-13.4, 10.6],
      [13.4, 10.6],
      [-13.4, -10.6],
      [13.4, -10.6],
    ] as Array<[number, number]>) {
      const scr = createPrecisionScrew(1.05, 0.42, 4.0, mats.stainlessMachined);
      scr.rotation.x = Math.PI;
      scr.position.set(sx, sy, -22.2);
      const wave = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.16, 8, 18), mats.beCuSpring);
      wave.position.set(sx, sy, -21.6);
      wave.userData.noEdges = true;
      g.add(scr, wave);
    }

    // 3 Lower Chassis Mount M1.7 L=3.0mm & P2 L=2.5mm Screws (Ref.204 / Ref.208)
    for (const [bx, bz, len] of [
      [-12.2, -10.5, 3.0],
      [14.2, -10.5, 3.0],
      [0.0, 14.5, 2.5],
    ] as Array<[number, number, number]>) {
      const bScr = createPrecisionScrew(1.0, 0.38, len, mats.titaniumRivet);
      bScr.rotation.x = -Math.PI / 2;
      bScr.position.set(bx, -13.2, bz);
      const wash = new THREE.Mesh(
        new THREE.TorusGeometry(1.4, 0.18, 8, 18).rotateX(Math.PI / 2),
        mats.brassGear
      );
      wash.position.set(bx, -12.6, bz);
      wash.userData.noEdges = true;
      g.add(bScr, wash);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oem-vf-mounting-screws',
        39,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -12.5),
        new THREE.Vector3(-34, -22, -46),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E40. EVF-Crown MI Hot-Shoe Shell Plate (Ref.327), Fix Plate (Ref.311) & Screw Cover (Ref.329)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Upper ISO-518 / MI Shoe U-shaped stainless Shell Plate (Ref.327: 500294302)
    const shellShape = createFrameShape(20.6, 20.6, 1.4, 13.8, 16.0, 0.8, 0, -2.4);
    const shell = new THREE.Mesh(
      extrudeCentered(shellShape, 1.65, 0.12, 0.12, 16).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    shell.position.y = 1.65;
    // Slide-in central stainless Screw Cover Plate hiding 4 special bolts (Ref.329)
    const scrCover = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(13.2, 13.8, 0.8), 0.45, 0.04, 0.04, 12).rotateX(
        Math.PI / 2
      ),
      mats.stainlessMachined
    );
    scrCover.position.set(0, 0.72, -1.2);
    // Under-roof heavy sandwich Anchor Fix Plate (Ref.311: 500395901) + 4 M1.7 Special Screws (Ref.328)
    const fixPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.4, 21.2, 1.6), 1.15, 0.08, 0.08, 14).rotateX(
        Math.PI / 2
      ),
      mats.stainlessMachined
    );
    fixPlate.position.y = -1.6;
    for (const [sx, sz] of [
      [-6.8, -6.2],
      [6.8, -6.2],
      [-6.8, 5.2],
      [6.8, 5.2],
    ] as Array<[number, number]>) {
      const s = createPrecisionScrew(0.95, 0.34, 3.3, mats.stainlessMachined);
      s.rotation.x = -Math.PI / 2;
      s.position.set(sx, 0.3, sz);
      g.add(s);
    }

    g.add(shell, scrCover, fixPlate);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mi-shoe-shell',
        40,
        '#94a3b8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 17.6, -8.3),
        new THREE.Vector3(0, 58, 12),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E41. Sony OEM 21-Pin Digital Audio MIS-2006 Contact Block (Ref.325) & WP Rubber (Ref.324)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front-edge 21-pin insulator housing block (MIS-2006)
    const blk = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.4, 4.6, 0.6), 2.2, 0.06, 0.06, 10).rotateX(
        Math.PI / 2
      ),
      mats.icEpoxy
    );
    blk.position.set(0, 0.8, 7.2);
    // 21 fine gold-plated digital audio/flash comb contacts!
    for (let i = -10; i <= 10; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.55, 2.4), mats.goldPlating);
      pin.position.set(i * 0.68, 0.85, 6.2);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    // Molded EPDM Waterproof FPC Entry Boot (Ref.324: 501695501) + polyimide tail
    const wpBoot = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(18.0, 6.0, 1.0), 1.4, 0.08, 0.08, 12).rotateX(
        Math.PI / 2
      ),
      mats.epdmGasket
    );
    wpBoot.position.set(0, -1.0, 7.4);
    const fpcTail = new THREE.Mesh(new THREE.BoxGeometry(11.6, 5.8, 0.24), mats.polyimideFpc);
    fpcTail.position.set(0, -4.4, 9.6);

    g.add(blk, wpBoot, fpcTail);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mi-shoe-contacts',
        41,
        '#eab308',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 17.6, -8.3),
        new THREE.Vector3(24, 62, 26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E42. Sony OEM MI SHOE SPRING PLATE (Ref.331) & Dust Cap SHOE CAP (Ref.9)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Twin stainless anti-rattle cantilever leaf springs (Ref.331: 500294502)
    for (const sx of [-5.2, 5.2]) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.28, 12.8), mats.mountSpringSteel);
      leaf.position.set(sx, 0.35, -1.0);
      leaf.rotation.x = -0.06;
      g.add(leaf);
    }
    const crossTie = new THREE.Mesh(new THREE.BoxGeometry(13.2, 0.28, 2.2), mats.mountSpringSteel);
    crossTie.position.set(0, 0.0, -6.8);
    g.add(crossTie);

    // Removable protective slide-in SHOE CAP (Ref.9: 443873412) sitting cleanly atop rails
    const capTop = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.2, 21.6, 1.8), 2.1, 0.14, 0.14, 14).rotateX(
        Math.PI / 2
      ),
      mats.matteBlackAnodized
    );
    capTop.position.set(0, 3.2, 0);
    const capLip = new THREE.Mesh(new THREE.BoxGeometry(15.2, 1.1, 16.5), mats.bodyMgShell);
    capLip.position.set(0, 1.8, 0);
    g.add(capTop, capLip);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mi-shoe-springs',
        42,
        '#1e293b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 18.2, -8.3),
        new THREE.Vector3(-22, 74, 8),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E43. EVF-Flank Stereo MEMS Microphones, Rubber Boots (Ref.304) & Mic Holder (Ref.308)
  // =========================================================================
  {
    const g = new THREE.Group();

    for (const sx of [-15.2, 15.2]) {
      // Soft elastomer isolation boot (Ref.304: 502687801 RUBBER MICROPHONE)
      const boot = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.5, 4.2, 20),
        mats.butylDamperRubber
      );
      boot.position.set(sx, 0, 0);
      // Gold-cased MEMS microphone capsule suspended inside boot
      const micCan = new THREE.Mesh(
        new THREE.CylinderGeometry(2.15, 2.15, 1.6, 18),
        mats.goldPlating
      );
      micCan.position.set(sx, 0.4, 0);
      // Rigid outer MIC HOLDER cradle (Ref.308: 502790401)
      const holder = new THREE.Mesh(
        extrudeCentered(createFrameShape(8.4, 8.4, 1.6, 6.2, 6.2, 2.8), 2.4, 0.08, 0.08, 16).rotateX(
          Math.PI / 2
        ),
        mats.mountPpsInsulator
      );
      holder.position.set(sx, -0.8, 0);
      // Shielded flex tail descending toward mainboard audio codec
      const lead = new THREE.Mesh(new THREE.BoxGeometry(2.4, 7.6, 0.2), mats.polyimideFpc);
      lead.position.set(sx, -5.8, 0);

      g.add(boot, micCan, holder, lead);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-stereo-mics',
        43,
        '#d97706',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 10.6, 3.8),
        new THREE.Vector3(0, 44, 48),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E44. Microphone Port Hydrophobic Acoustic Wind-Noise Mesh & ePTFE Membrane
  // =========================================================================
  {
    const g = new THREE.Group();

    for (const sx of [-15.2, 15.2]) {
      // Porous white hydrophobic ePTFE waterproof acoustic membrane disk
      const ptfe = new THREE.Mesh(
        new THREE.CylinderGeometry(2.8, 2.8, 0.32, 20),
        mats.lcdDiffuserMatte
      );
      ptfe.position.set(sx, 0, 0);
      // Upper fine stainless acoustic wind-turbulence micro-mesh cap
      const meshCap = new THREE.Mesh(
        new THREE.CylinderGeometry(3.0, 3.0, 0.24, 20),
        mats.conductiveNiCuFoam
      );
      meshCap.position.set(sx, 0.34, 0);
      // 3 micro acoustic port pinholes crown accent
      for (const dz of [-1.2, 0, 1.2]) {
        const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.32, 10), mats.velvetFlockTrap);
        dot.position.set(sx, 0.44, dz);
        dot.userData.noEdges = true;
        g.add(dot);
      }
      g.add(ptfe, meshCap);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-mic-wind-mesh',
        44,
        '#06b6d4',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y + 13.2, 3.8),
        new THREE.Vector3(0, 62, 54),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E45. EVF-Hump Perimeter Die-Cut Weather-Seal Sponge Gasket & Light-Leak Seal
  // =========================================================================
  {
    const g = new THREE.Group();

    // Continuous 360° base perimeter EPDM weather-seal gasket under EVF hump
    const baseSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(32.0, 46.2, 3.8, 27.6, 41.8, 2.6), 1.05, 0.1, 0.1, 20).rotateX(
        Math.PI / 2
      ),
      mats.epdmGasket
    );
    g.add(baseSeal);

    // Front & rear vertical compression foam dams sealing top-cover seams
    for (const sz of [-22.4, 22.4]) {
      const dam = new THREE.Mesh(new THREE.BoxGeometry(26.0, 3.2, 1.2), mats.lensFoamSeal);
      dam.position.set(0, 1.8, sz);
      g.add(dam);
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-surr-hump-wp-gasket',
        45,
        '#0f172a',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 12.6, -12.5),
        new THREE.Vector3(0, -38, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E46. Micro-OLED 2-Stack Tandem White Emitter & Fabry-Pérot Optical Micro-Cavity
  // =========================================================================
  {
    const g = new THREE.Group();

    // Bottom reflective Al/Ag pixel anode mirror sheet
    const anodeMirror = new THREE.Mesh(new THREE.BoxGeometry(13.8, 10.4, 0.12), mats.sinteredSilver);
    anodeMirror.position.z = 0.24;
    // 1st Organic EL stack + Charge Generation Layer (CGL) + 2nd Organic EL stack
    const stack1 = new THREE.Mesh(new THREE.BoxGeometry(13.6, 10.2, 0.14), mats.evfLensAspheric);
    stack1.position.z = 0.08;
    const cgl = new THREE.Mesh(new THREE.BoxGeometry(13.6, 10.2, 0.08), mats.goldPlating);
    cgl.position.z = -0.04;
    const stack2 = new THREE.Mesh(new THREE.BoxGeometry(13.6, 10.2, 0.14), mats.evfLensEd);
    stack2.position.z = -0.16;
    // Top semi-transparent MgAg optical micro-cavity cathode
    const cathode = new THREE.Mesh(new THREE.BoxGeometry(13.8, 10.4, 0.1), mats.lcdDbefIridescent);
    cathode.position.z = -0.28;

    g.add(anodeMirror, stack1, cgl, stack2, cathode);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-tandem-cavity',
        46,
        '#38bdf8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 2.95),
        new THREE.Vector3(24, 10, 44),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // E47. Micro-OLED Silicon Die φ20μm Gold Wire-Bonds & Black Epoxy Glob-Top Dam
  // =========================================================================
  {
    const g = new THREE.Group();

    // Matte-black epoxy glob-top dam framing OLED active window
    const dam = new THREE.Mesh(
      extrudeCentered(createFrameShape(19.6, 15.6, 1.0, 15.2, 11.4, 0.4), 0.56, 0.08, 0.08, 14),
      mats.icEpoxy
    );
    g.add(dam);

    // 28 arched microscopic gold wire-bonds along top & bottom edges of CMOS silicon die
    for (let i = -6; i <= 6; i++) {
      for (const sy of [-1, 1]) {
        const wireCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(i * 1.12, sy * 5.6, 0.18),
          new THREE.Vector3(i * 1.12, sy * 6.5, -0.36),
          new THREE.Vector3(i * 1.12, sy * 7.4, 0.16),
        ]);
        const wire = new THREE.Mesh(
          new THREE.TubeGeometry(wireCurve, 8, 0.08, 6, false),
          mats.goldPlating
        );
        wire.userData.noEdges = true;
        g.add(wire);
      }
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-bondwires-glob',
        47,
        '#f59e0b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 3.22),
        new THREE.Vector3(28, -12, 46),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E48. OLED Panel Direct Polyimide FPC (LCD902), 0201 MLCC Decap Bank & SUS Stiffener
  // =========================================================================
  {
    const g = new THREE.Group();

    // Direct OLED polyimide tail descending from bottom of E14 ceramic package
    const fpc = new THREE.Mesh(new THREE.BoxGeometry(12.4, 11.2, 0.22), mats.polyimideFpc);
    // 10 miniature 0201 MLCC power decoupling capacitors right at OLED root
    for (let i = -4; i <= 4; i += 2) {
      const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.52, 0.36), mats.smdCeramic);
      c1.position.set(i * 1.15, 3.4, -0.24);
      const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.52, 0.36), mats.smdCeramic);
      c2.position.set(i * 1.15, 1.8, -0.24);
      c1.userData.noEdges = true;
      c2.userData.noEdges = true;
      g.add(c1, c2);
    }
    // SUS304 stainless ZIF connector stiffener + gold finger strip at distal end
    const stiffener = new THREE.Mesh(new THREE.BoxGeometry(12.4, 2.8, 0.26), mats.stainlessMachined);
    stiffener.position.set(0, -4.4, 0.2);
    const fingers = new THREE.Mesh(new THREE.BoxGeometry(11.4, 1.8, 0.28), mats.goldPlating);
    fingers.position.set(0, -4.6, -0.05);

    g.add(fpc, stiffener, fingers);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-fpc-decaps',
        48,
        '#d97706',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 12.2, 4.45),
        new THREE.Vector3(-22, -26, 48),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E49. 4-Element Eyepiece Multi-Layer Dielectric AR Coating (ZEISS T* / Nano AR II)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Iridescent ultra-thin vapor-deposited AR coating shells hugging G4, G2/G3, and G1 optical faces!
    const arG4 = new THREE.Mesh(
      createOpticalLensGeometry(11.1, 0.14, 2.48, -2.4, -0.6, 0.58, 16, 40),
      mats.lcdDbefIridescent
    );
    arG4.position.z = -15.4 - 1.18;
    const arG3 = new THREE.Mesh(
      createOpticalLensGeometry(9.9, 0.14, 2.28, -2.2, -0.3, 0.28, 16, 40),
      mats.lcdDbefIridescent
    );
    arG3.position.z = -9.2 - 2.02;
    const arG1 = new THREE.Mesh(
      createOpticalLensGeometry(9.3, 0.14, -0.42, 0.48, 0.12, -0.1, 16, 40),
      mats.lcdDbefIridescent
    );
    arG1.position.z = -2.4 + 1.02;

    g.add(arG4, arG3, arG1);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-lens-zeiss-tstar-coat',
        49,
        '#10b981',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 0),
        new THREE.Vector3(-34, 18, 8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // E50. Optical Edge Blackening (Sumi-Nuri) & 3-Point Silicone Lens Potting Dots
  // =========================================================================
  {
    const g = new THREE.Group();

    const lensSpecs: Array<[number, number, number]> = [
      [-15.4, 11.42, 2.1], // G4 rim
      [-9.2, 10.26, 4.2],  // G2/G3 doublet rim
      [-2.4, 9.62, 1.8],   // G1 rim
    ];
    for (const [lz, r, w] of lensSpecs) {
      // Matte-black optical Sumi-Nuri inked rim cylinder
      const inkBand = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, w, 40, 1, true).rotateX(Math.PI / 2),
        mats.velvetFlockTrap
      );
      inkBand.position.z = lz;
      g.add(inkBand);

      // 3x 120°-spaced translucent low-outgas silicone potting beads locking lens stress-free
      for (let k = 0; k < 3; k++) {
        const a = (k * Math.PI * 2) / 3 + 0.5;
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.62, 10, 8), mats.dustCatcherGel);
        dot.position.set(Math.cos(a) * (r + 0.2), Math.sin(a) * (r + 0.2), lz);
        dot.userData.noEdges = true;
        g.add(dot);
      }
    }

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-lens-edge-blackening',
        50,
        '#0f172a',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 0),
        new THREE.Vector3(-38, -8, 4),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E51. Precision Blackened-Brass Inter-Lens Spacer Rings & 5–20μm Shims
  // =========================================================================
  {
    const g = new THREE.Group();

    // Rear inter-lens spacer between G4 (-15.4) and G2/G3 (-9.2)
    const sp1 = createRingCell(10.4, 12.1, 2.0, mats.matteBlackAnodized);
    sp1.position.z = -12.6;
    const shim1 = createRingCell(10.5, 11.9, 0.22, mats.brassGear);
    shim1.position.z = -11.45;

    // Front inter-lens spacer between G2/G3 (-9.2) and G1 (-2.4)
    const sp2 = createRingCell(9.6, 11.4, 2.2, mats.matteBlackAnodized);
    sp2.position.z = -5.6;
    const shim2 = createRingCell(9.7, 11.2, 0.22, mats.brassGear);
    shim2.position.z = -4.35;

    g.add(sp1, shim1, sp2, shim2);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-lens-inter-spacers',
        51,
        '#ca8a04',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 0),
        new THREE.Vector3(34, 22, 16),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E52. Micro-OLED Knife-Edge Rectangular Field-Stop Aperture Mask
  // =========================================================================
  {
    const g = new THREE.Group();

    // Wafer-thin 0.10mm photo-etched stainless black rectangular theater-frame field mask
    const maskShape = createFrameShape(21.4, 17.6, 2.0, 13.8, 10.4, 0.35);
    const mask = new THREE.Mesh(
      extrudeCentered(maskShape, 0.22, 0.04, 0.04, 16),
      mats.velvetFlockTrap
    );
    // Razor-sharp inner silver/black knife-edge accent lip
    const lip = new THREE.Mesh(
      extrudeCentered(createFrameShape(14.3, 10.9, 0.4, 13.7, 10.3, 0.3), 0.14, 0, 0, 12),
      mats.matteBlackAnodized
    );
    lip.position.z = -0.14;
    g.add(mask, lip);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-oled-field-mask',
        52,
        '#1e293b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 1.65),
        new THREE.Vector3(0, 22, 36),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E53. Zero-Backlash Split Lead-Screw Nut & Fluorinated Optical Damping Grease
  // =========================================================================
  {
    const g = new THREE.Group();

    // Twin split-nut POM/brass halves bracketing lead screw threads
    const nutFront = new THREE.Mesh(
      new THREE.CylinderGeometry(1.85, 1.85, 1.6, 18).rotateX(Math.PI / 2),
      mats.pomGear
    );
    nutFront.position.z = 1.65;
    const nutRear = new THREE.Mesh(
      new THREE.CylinderGeometry(1.85, 1.85, 1.6, 18).rotateX(Math.PI / 2),
      mats.brassGear
    );
    nutRear.position.z = -1.65;
    // Anti-backlash coil spring spreading the twin nut halves onto opposite thread flanks!
    const spreadSpring = new THREE.Mesh(
      createHelicalSpringGeometry(1.45, 2.2, 4, 0.18),
      mats.beCuSpring
    );
    spreadSpring.userData.noEdges = true;
    // Translucent fluorinated PFPE optical damping grease film ring
    const greaseRing = new THREE.Mesh(
      new THREE.CylinderGeometry(1.32, 1.32, 4.8, 16, 1, true).rotateX(Math.PI / 2),
      mats.opticalCementClear
    );
    greaseRing.userData.noEdges = true;

    g.add(nutFront, nutRear, spreadSpring, greaseRing);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-diopter-antibacklash-nut',
        53,
        '#eab308',
        g,
        new THREE.Vector3(14.8, EVF_OPTICAL_Y, -9.2),
        new THREE.Vector3(44, -28, 22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E54. Diopter Shaft Dual-Lip FKM Waterproof O-Ring Gland & PTFE Washer
  // =========================================================================
  {
    const g = new THREE.Group();

    // Machined stainless rotary gland housing sleeve
    const gland = new THREE.Mesh(
      new THREE.CylinderGeometry(2.45, 2.45, 3.8, 22).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    // Twin fluororubber (FKM) waterproof O-rings (outer dust wiper + inner moisture seal)
    for (const ox of [-1.25, 1.25]) {
      const oring = new THREE.Mesh(
        new THREE.TorusGeometry(1.72, 0.36, 10, 24).rotateY(Math.PI / 2),
        mats.epdmGasket
      );
      oring.position.x = ox;
      oring.userData.noEdges = true;
      g.add(oring);
    }
    // White low-friction PTFE anti-extrusion backup washer between O-rings
    const ptfeWash = new THREE.Mesh(
      new THREE.TorusGeometry(1.75, 0.24, 8, 24).rotateY(Math.PI / 2),
      mats.lcdDiffuserMatte
    );
    ptfeWash.userData.noEdges = true;

    g.add(gland, ptfeWash);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-diopter-gland-seals',
        54,
        '#0ea5e9',
        g,
        new THREE.Vector3(16.2, EVF_OPTICAL_Y, -15.6),
        new THREE.Vector3(48, 8, -22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E55. 240Hz MIPI-DSI Shielded FPC, Ferrite Bead EMI Filter & Cu Ground Foil
  // =========================================================================
  {
    const g = new THREE.Group();

    // Silver-ink laminated impedance-matched MIPI-DSI flex jacket
    const jacket = new THREE.Mesh(new THREE.BoxGeometry(10.6, 11.4, 0.28), mats.emiShieldFilm);
    // 4 miniature common-mode ferrite bead choke blocks filtering 240Hz MIPI harmonics
    for (let i = -1.5; i <= 1.51; i += 1.0) {
      const fb = new THREE.Mesh(new THREE.BoxGeometry(1.65, 1.05, 0.72), mats.ferriteInductor);
      fb.position.set(i * 2.2, 3.8, 0.36);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.08, 0.74), mats.silverElectrode);
      cap.position.set(i * 2.2 + 0.75, 3.8, 0.36);
      cap.userData.noEdges = true;
      g.add(fb, cap);
    }
    // Conductive copper grounding foil strap linking FPC shield straight to EVF Mg housing
    const cuFoil = new THREE.Mesh(new THREE.BoxGeometry(14.8, 2.6, 0.16), mats.copperHeatSpreader);
    cuFoil.position.set(0, -3.6, 0.24);

    g.add(jacket, cuFoil);

    parts.push(
      finalizeStandaloneEvfMicroPart(
        'evf-mipi-ferrite-shield-fpc',
        55,
        '#6366f1',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 14.2, 7.65),
        new THREE.Vector3(24, -30, 62),
        cp,
        0.24
      )
    );
  }

  return parts;
}
