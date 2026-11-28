//@FLOW_MAP|file=src/assemblies/body/bodyUltraAuditParts.ts|unit=body|lines=849|exports=buildBodyUltraAuditParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeStandaloneBodyAuditPart(
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
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

/**
 * Build 16 deep-audit standalone-only missing Sony OEM & flagship Camera Body micro-parts (B61–B76).
 * Rendered ONLY in standalone 'body' view (total 76 parts in standalone);
 * completely omitted in whole-camera views ('integrated', 'camera_body').
 */
export function buildBodyUltraAuditParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // B61. Sony OEM DL-1008 Flex (Ref.411), One-Time Socket BH0001 & Li-Mn Cell BT0001
  // =========================================================================
  {
    const g = new THREE.Group();

    // DL-1008 polyimide flex board adhering to battery holder outer wall (Ref.411: A5033446A)
    const dlFlex = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(14.5, 22.0, 1.4), 0.24, 0.02, 0.02, 12),
      mats.polyimideFpc
    );
    // Adhesive DL TOP backing sheet (Ref.410: 500708501)
    const adhSheet = new THREE.Mesh(new THREE.BoxGeometry(13.8, 21.0, 0.14), mats.mylarInsulatorFilm);
    adhSheet.position.z = 0.22;
    // One-time-use stainless/LCP battery socket BH0001 (125192821) + secondary Li-Mn coin cell BT0001
    const sockRing = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.55, 10, 24),
      mats.zifIvoryPlastic
    );
    sockRing.position.set(0, 2.5, -0.65);
    const cell = new THREE.Mesh(
      new THREE.CylinderGeometry(3.65, 3.65, 1.4, 22).rotateX(Math.PI / 2),
      mats.neodymiumMagnet
    );
    cell.position.set(0, 2.5, -0.82);
    const springTab = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.4, 0.22), mats.goldPlating);
    springTab.position.set(0, 2.5, -1.62);
    // Micro ZIF tail downward toward mainboard RTC line
    const tail = new THREE.Mesh(new THREE.BoxGeometry(4.4, 8.2, 0.22), mats.polyimideFpc);
    tail.position.set(2.2, -14.5, 0);

    g.add(dlFlex, adhSheet, sockRing, cell, springTab, tail);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-dl1008-rtc-flex',
        61,
        '#f59e0b',
        g,
        new THREE.Vector3(-42.5, -18.0, -5.5),
        new THREE.Vector3(-58, -42, -26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B62. Sony OEM BT_SOLDER / BT-2033 Heavy-Copper Power Flex (Ref.401) & Cable (Ref.413)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Heavy 2oz copper polyimide battery power bus flex (Ref.401: A5023247A)
    const busCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8.0, 12.0, 4.0),
      new THREE.Vector3(-4.0, 4.0, 0.0),
      new THREE.Vector3(2.0, -8.0, -4.0),
      new THREE.Vector3(10.0, -14.0, -6.5),
    ]);
    const busGeo = new THREE.TubeGeometry(busCurve, 20, 4.2, 6, false);
    busGeo.scale(1, 1, 0.16);
    const busFpc = new THREE.Mesh(busGeo, mats.polyimideFpc);
    // Exposed thick copper power lanes & 4 solder pads at battery terminal top
    const cuOverlay = new THREE.Mesh(new THREE.BoxGeometry(10.5, 5.2, 0.45), mats.copperHeatSpreader);
    cuOverlay.position.set(-8.0, 12.2, 4.1);
    for (let i = -1.5; i <= 1.51; i += 1.0) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.8, 0.55), mats.solderBallSilver);
      pad.position.set(-8.0 + i * 2.4, 12.2, 4.2);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    // Companion shielded power wire harness (Ref.413: 184678731) + black retention tape (Ref.402)
    const wireCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9.0, 8.0, 3.0),
      new THREE.Vector3(-1.0, 0.0, 2.0),
      new THREE.Vector3(8.5, -10.0, -3.5),
    ]);
    const wire = new THREE.Mesh(
      new THREE.TubeGeometry(wireCurve, 16, 0.65, 8, false),
      mats.coaxShieldCopper
    );
    const tape = new THREE.Mesh(new THREE.BoxGeometry(7.2, 3.6, 0.32), mats.thermalTransferTape);
    tape.position.set(-1.0, 1.5, 1.4);

    g.add(busFpc, cuOverlay, wire, tape);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-bt2033-power-fpc',
        62,
        '#d97706',
        g,
        new THREE.Vector3(-48.0, -8.0, 5.5),
        new THREE.Vector3(-76, -16, 36),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B63. Sony OEM 4-Branch Modular Rear Flex Harness (RS-1024 / SW-1041 / JS-1012 / KY-1035)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 1. RS-1024 Master Rear Relay Hub Flex (Ref.55: A5033449A)
    const rs1024 = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(26.0, 50.0, 2.0), 0.24, 0.02, 0.02, 14),
      mats.polyimideFpc
    );
    rs1024.position.set(-36.0, 0.0, 0);
    // Main wide backplate-to-mainboard ribbon tongue
    const mainTongue = new THREE.Mesh(new THREE.BoxGeometry(22.0, 8.6, 0.26), mats.polyimideFpc);
    mainTongue.position.set(-14.0, -8.0, 0.6);
    const goldEnd = new THREE.Mesh(new THREE.BoxGeometry(2.2, 8.2, 0.32), mats.goldPlating);
    goldEnd.position.set(-3.2, -8.0, 0.6);

    // 2. SW-1041 Lower Playback/Delete/Fn Sub-Flex (Ref.62: A5033451A)
    const sw1041 = new THREE.Mesh(new THREE.BoxGeometry(22.0, 16.0, 0.24), mats.hdiMainboardPcb);
    sw1041.position.set(-40.0, -18.5, -0.45);
    // 3. JS-1012 Dedicated 5-Way AF Joystick Sub-Flex (Ref.63: A5001912A)
    const js1012 = new THREE.Mesh(new THREE.BoxGeometry(11.5, 11.5, 0.28), mats.copperHeatSpreader);
    js1012.position.set(-46.5, 8.5, -0.45);
    // 4. KY-1035 Upper MENU/C3/AF-ON/AEL Sub-Flex spanning left & right rear shoulders (Ref.105)
    const ky1035Bar = new THREE.Mesh(new THREE.BoxGeometry(86.0, 8.2, 0.24), mats.polyimideFpc);
    ky1035Bar.position.set(-4.0, 24.5, -0.42);
    // Metallic tactile snap-domes on each sub-flex
    for (const [dx, dy] of [
      [-46.5, 8.5],
      [-46.0, -16.0],
      [-36.0, -21.0],
      [-42.0, 24.5],
      [-32.0, 24.5],
      [26.0, 24.5],
      [35.0, 24.5],
    ] as Array<[number, number]>) {
      const dome = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.9, 0.32, 14).rotateX(Math.PI / 2),
        mats.sinteredSilver
      );
      dome.position.set(dx, dy, -0.68);
      dome.userData.noEdges = true;
      g.add(dome);
    }

    g.add(rs1024, mainTongue, goldEnd, sw1041, js1012, ky1035Bar);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-rs1024-rear-bus',
        63,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, -30.2),
        new THREE.Vector3(-24, 12, -78),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B64. Sony OEM RL-1071 Shutter Flex (Ref.257), RL FPC BASE (Ref.251) & CNT D F HOLDER PLATE (Ref.256)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Molded rigid carrier RL FPC BASE supporting shutter & front dial (Ref.251: 502790701)
    const rlBase = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(22.0, 18.0, 2.4), 2.4, 0.12, 0.12, 14).rotateX(Math.PI / 2),
      mats.mountPpsInsulator
    );
    // RL-1071 flexible release circuit & 2-stage shutter switch block (Ref.257 / Ref.258)
    const rlFlex = new THREE.Mesh(new THREE.BoxGeometry(19.0, 0.28, 15.0), mats.polyimideFpc);
    rlFlex.position.y = 1.4;
    const swBlock = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.4, 2.2, 20), mats.stainlessMachined);
    swBlock.position.set(-2.5, 2.6, 2.5);
    const domeTop = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.8, 0.55, 16), mats.goldPlating);
    domeTop.position.set(-2.5, 3.9, 2.5);
    // Front Command Dial Stainless Holder Plate (Ref.256: 500382401 CNT D F HOLDER PLATE)
    const dialPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.5, 8.2, 1.4), 0.9, 0.06, 0.06, 12),
      mats.mountStainlessFlange
    );
    dialPlate.position.set(1.5, -2.2, 8.6);
    const scr = createPrecisionScrew(0.95, 0.36, 2.5, mats.stainlessMachined);
    scr.position.set(7.5, -2.2, 9.2);

    g.add(rlBase, rlFlex, swBlock, domeTop, dialPlate, scr);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-rl1071-shutter-fpc',
        64,
        '#f97316',
        g,
        new THREE.Vector3(-51.5, 32.2, 16.5),
        new THREE.Vector3(-68, 56, 56),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B65. Sony OEM SH-1035 Top Main Flex (Ref.307), TOP CONNECT PLATE L (Ref.313) & EYELET PLATE G (Ref.261)
  // =========================================================================
  {
    const g = new THREE.Group();

    // U-shaped Top-Deck Master Interconnect Flex SH-1035 (Ref.307: A5033450A)
    const sh1035 = new THREE.Mesh(
      extrudeCentered(createFrameShape(92.0, 22.0, 2.6, 30.0, 14.0, 1.8, 0, -2.0), 0.28, 0.02, 0.02, 14).rotateX(
        Math.PI / 2
      ),
      mats.polyimideFpc
    );
    // Heavy stainless Left Top Connect Plate L (Ref.313: 502790501)
    const plateL = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.5, 19.0, 1.8), 1.4, 0.08, 0.08, 12).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    plateL.position.set(46.0, -1.2, 0);
    // Heavy stainless Grip-Side Eyelet Plate G (Ref.261: 502790601)
    const plateG = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(17.5, 20.0, 1.8), 1.4, 0.08, 0.08, 12).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    plateG.position.set(-54.0, -1.2, 2.0);
    // 4 long M1.7 L=5.5mm SG SPIN structural tie bolts (Ref.259 / Ref.312)
    for (const [bx, bz] of [
      [48.0, -4.5],
      [48.0, 4.5],
      [-56.0, -3.5],
      [-56.0, 5.5],
    ] as Array<[number, number]>) {
      const bolt = createPrecisionScrew(1.05, 0.4, 5.5, mats.stainlessMachined);
      bolt.rotation.x = -Math.PI / 2;
      bolt.position.set(bx, 1.2, bz);
      g.add(bolt);
    }

    g.add(sh1035, plateL, plateG);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-sh1035-top-connect',
        65,
        '#94a3b8',
        g,
        new THREE.Vector3(-4.0, 35.8, -2.0),
        new THREE.Vector3(0, 72, 16),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B66. Ergonomic Rear Thumb-Rest High-Friction Elastomer & Internal REAR PLATE (Ref.77)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sculpted rear thumb-rest overhanging elastomer grip pad
    const thumbBase = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(23.5, 34.0, 3.6), 2.4, 0.35, 0.35, 16),
      mats.bodyLeatherette
    );
    // Ergonomic 28° upper overhanging thumb-hook ridge
    const ridge = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.0, 7.6, 2.2), 4.6, 0.45, 0.45, 14),
      mats.bodyLeatherette
    );
    ridge.position.set(-0.5, 12.5, -1.6);
    ridge.rotation.x = -0.35;
    // Internal stainless REAR PLATE structural stiffener behind thumb rest (Ref.77: 502794501)
    const rearPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 38.0, 2.2), 0.75, 0.06, 0.06, 14),
      mats.stainlessMachined
    );
    rearPlate.position.set(0.5, -1.0, 2.6);

    g.add(thumbBase, ridge, rearPlate);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-rear-thumb-grip',
        66,
        '#1e293b',
        g,
        new THREE.Vector3(-52.5, 2.5, -33.2),
        new THREE.Vector3(-82, 8, -72),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B67. Hinged Side I/O Door Stainless Spring-Hinge Pins & 4-Bay Silicone Lip Seals
  // =========================================================================
  {
    const g = new THREE.Group();

    // 4 independent molded silicone perimeter compression lip-seal gaskets (Mic, HP, HDMI, USB-C)
    const baySpecs: Array<[number, number, number, number]> = [
      [14.0, 2.0, 9.5, 8.8],   // Mic / Audio upper bay
      [3.0, 2.0, 9.5, 8.8],    // Headphone bay
      [-8.5, 2.0, 10.5, 11.5], // Full-size HDMI Type-A bay
      [-21.0, 2.0, 10.5, 10.2], // USB-C / Multi bay
    ];
    for (const [by, bz, bw, bh] of baySpecs) {
      const lip = new THREE.Mesh(
        extrudeCentered(createFrameShape(bw, bh, 1.4, bw - 2.6, bh - 2.6, 0.8), 1.8, 0.14, 0.14, 14).rotateY(
          Math.PI / 2
        ),
        mats.epdmGasket
      );
      lip.position.set(0, by, bz);
      // Stainless hinge axle pin + micro retention click spring along rear door edge
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.58, 0.58, bh - 1.2, 12),
        mats.stainlessMachined
      );
      pin.position.set(0.8, by, bz - bw * 0.54);
      const spr = new THREE.Mesh(
        createHelicalSpringGeometry(0.82, 2.6, 4, 0.14).rotateX(Math.PI / 2),
        mats.mountSpringSteel
      );
      spr.position.set(0.8, by, bz - bw * 0.54);
      spr.userData.noEdges = true;
      g.add(lip, pin, spr);
    }

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-io-port-flap-seals',
        67,
        '#0ea5e9',
        g,
        new THREE.Vector3(56.2, 0, -5.0),
        new THREE.Vector3(96, 6, -12),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B68. Sony OEM GASKET BOT S (Ref.56: 503623301) Bottom Seam Seal & Boss O-Rings
  // =========================================================================
  {
    const g = new THREE.Group();

    // Long contoured rear-bottom waterproof labyrinth gasket strip (Ref.56: GASKET BOT S)
    const botStrip = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(112.0, 4.6, 1.4), 1.35, 0.12, 0.12, 14).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    botStrip.position.set(0, 0, -18.5);
    // Side return seal lips wrapping corners
    for (const sx of [-54.5, 54.5]) {
      const sideLeg = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.35, 22.0), mats.epdmGasket);
      sideLeg.position.set(sx, 0, -7.5);
      g.add(sideLeg);
    }
    // 6 bottom screw-boss waterproofing O-rings sealing baseplate screw holes
    for (const [ox, oz] of [
      [-42, -14],
      [0, -15],
      [42, -14],
      [-36, 14],
      [12, 14],
      [44, 14],
    ] as Array<[number, number]>) {
      const oring = new THREE.Mesh(
        new THREE.TorusGeometry(1.75, 0.36, 8, 18).rotateX(Math.PI / 2),
        mats.butylDamperRubber
      );
      oring.position.set(ox, -0.45, oz);
      oring.userData.noEdges = true;
      g.add(oring);
    }

    g.add(botStrip);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-bottom-gasket-bot-s',
        68,
        '#334155',
        g,
        new THREE.Vector3(-4.0, -35.8, -2.0),
        new THREE.Vector3(0, -94, -18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B69. Sony OEM MEDIA LID BASE (Ref.60), GASKET MED (Ref.61) & MEDIA LID WP CUSHION (Ref.122)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Molded rigid card-bay door subframe (Ref.60: 502794801 MEDIA LID BASE)
    const baseFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(18.5, 42.0, 2.4, 11.8, 34.0, 1.4), 2.2, 0.12, 0.12, 16).rotateY(
        Math.PI / 2
      ),
      mats.mountPpsInsulator
    );
    // Outer bay perimeter waterproof gasket (Ref.61: 502863501 GASKET MED)
    const gaskMed = new THREE.Mesh(
      extrudeCentered(createFrameShape(17.4, 40.8, 2.2, 14.6, 38.0, 1.8), 1.1, 0.08, 0.08, 16).rotateY(
        Math.PI / 2
      ),
      mats.epdmGasket
    );
    gaskMed.position.x = -1.45;
    // Inner door-side secondary compression seal (Ref.122: 502862701 MEDIA LID WP CUSHION)
    const wpCush = new THREE.Mesh(
      extrudeCentered(createFrameShape(16.0, 39.2, 2.0, 13.4, 36.6, 1.6), 0.95, 0.08, 0.08, 16).rotateY(
        Math.PI / 2
      ),
      mats.butylDamperRubber
    );
    wpCush.position.x = -2.45;

    g.add(baseFrame, gaskMed, wpCush);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-media-lid-base-seal',
        69,
        '#475569',
        g,
        new THREE.Vector3(-61.8, 1.5, -14.5),
        new THREE.Vector3(-102, 4, -24),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B70. Night-Shooting Illuminated Button 0402 Micro-LED Array & Silicone Light-Guide Sheet
  // =========================================================================
  {
    const g = new THREE.Group();

    // Translucent optical silicone TIR light-guide film spanning rear button cluster
    const lgRight = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(20.0, 44.0, 2.0), 0.28, 0.02, 0.02, 14),
      mats.lcdOcaFilm
    );
    lgRight.position.set(-42.0, 0, 0);
    const lgLeft = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(20.0, 10.5, 1.6), 0.28, 0.02, 0.02, 12),
      mats.lcdOcaFilm
    );
    lgLeft.position.set(28.0, 24.5, 0);

    // 6 miniature warm-white 0402 backlight LED emitters + glowing halo dots
    const ledPts: Array<[number, number]> = [
      [-46.0, 18.0],
      [-37.0, 18.0],
      [-46.0, -14.0],
      [-38.0, -20.0],
      [23.0, 24.5],
      [33.0, 24.5],
    ];
    for (const [lx, ly] of ledPts) {
      const led = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.45), mats.tantalumCapYellow);
      led.position.set(lx, ly, -0.25);
      const halo = new THREE.Mesh(new THREE.RingGeometry(1.6, 2.5, 16), mats.lcdDiffuserMatte);
      halo.rotation.y = Math.PI;
      halo.position.set(lx, ly, -0.32);
      halo.userData.noEdges = true;
      g.add(led, halo);
    }

    g.add(lgRight, lgLeft);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-backlit-button-leds',
        70,
        '#fde047',
        g,
        new THREE.Vector3(0, 0, -32.2),
        new THREE.Vector3(-42, 22, -84),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // B71. Dual Front/Rear Video Recording Tally LEDs, Prism Diffusers & AF-Assist Fresnel Lens
  // =========================================================================
  {
    const g = new THREE.Group();

    // Front Red Tally Lamp & AF-Assist Fresnel Lens module tucked beside front grip
    const frontPod = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(7.2, 13.5, 1.8), 4.2, 0.12, 0.12, 14),
      mats.matteBlackAnodized
    );
    frontPod.position.set(-39.0, 18.5, 22.8);
    const frontTally = new THREE.Mesh(
      new THREE.SphereGeometry(2.1, 16, 12),
      mats.bodyRecRed
    );
    frontTally.scale.set(1, 1, 0.55);
    frontTally.position.set(-39.0, 21.8, 25.0);
    const afFresnel = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.4, 1.0, 20).rotateX(Math.PI / 2),
      mats.evfIrEmitter
    );
    afFresnel.position.set(-39.0, 15.2, 24.9);

    // Rear Red Recording Tally Indicator Prism next to EVF/right shoulder
    const rearTallyBase = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.2, 3.4), mats.matteBlackAnodized);
    rearTallyBase.position.set(-28.0, 26.8, -31.8);
    const rearTallyPrism = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.0, 1.4), mats.bodyRecRed);
    rearTallyPrism.position.set(-28.0, 26.8, -33.6);

    g.add(frontPod, frontTally, afFresnel, rearTallyBase, rearTallyPrism);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-tally-lamp-diffuser',
        71,
        '#ef4444',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-44, 34, 68),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B72. Exposure / Custom-R Dial Center Push-Toggle Lock Button & Heart-Cam Plunger
  // =========================================================================
  {
    const g = new THREE.Group();

    // Center anodized push-to-lock button cap protruding atop Exposure/Custom-R Dial
    const btnCap = new THREE.Mesh(
      new THREE.CylinderGeometry(3.8, 4.0, 2.6, 24),
      mats.matteBlackAnodized
    );
    btnCap.position.y = 3.2;
    // Stainless heart-cam toggle plunger shaft
    const plunger = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65, 1.65, 7.6, 16),
      mats.stainlessMachined
    );
    plunger.position.y = -0.8;
    // Brass heart-cam collar & follower pin + lock engagement spline tooth
    const camCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.2, 2.8, 18),
      mats.brassGear
    );
    camCollar.position.y = -2.0;
    const lockTooth = new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.4, 2.2), mats.mountSpringSteel);
    lockTooth.position.y = -4.2;
    // Return coil spring & top waterproof O-ring
    const spr = new THREE.Mesh(
      createHelicalSpringGeometry(2.15, 4.6, 5, 0.2).rotateX(Math.PI / 2),
      mats.beCuSpring
    );
    spr.position.y = -2.2;
    spr.userData.noEdges = true;
    const oring = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.34, 8, 22).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    oring.position.y = 1.6;
    oring.userData.noEdges = true;

    g.add(btnCap, plunger, camCollar, lockTooth, spr, oring);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-exp-dial-lock-btn',
        72,
        '#eab308',
        g,
        new THREE.Vector3(-43.0, 38.6, -15.0),
        new THREE.Vector3(-64, 88, -32),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B73. Sony OEM SV DIAL FPC COVER (Ref.310) & Sealed Mode Dial Block MD DIAL BLOCK ASSY (Ref.323)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sealed cylindrical Gray-code rotary encoder block MD DIAL BLOCK ASSY (Ref.323: A5033617A)
    const drum = new THREE.Mesh(
      new THREE.CylinderGeometry(9.6, 10.2, 4.4, 28),
      mats.icEpoxy
    );
    // Gold-plated multi-pole wiper contact base ring
    const contactRing = new THREE.Mesh(
      new THREE.CylinderGeometry(10.6, 10.6, 0.65, 28),
      mats.goldPlating
    );
    contactRing.position.y = -2.4;
    // Splash-proof dome shield SV DIAL FPC COVER (Ref.310: A5038708A)
    const domeCover = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 22.0, 4.2), 1.25, 0.1, 0.1, 16).rotateX(Math.PI / 2),
      mats.mountPpsInsulator
    );
    domeCover.position.y = -3.4;
    const flexTail = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.24, 14.0), mats.polyimideFpc);
    flexTail.position.set(0, -3.2, 11.0);

    g.add(drum, contactRing, domeCover, flexTail);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-sv-dial-fpc-cover',
        73,
        '#6366f1',
        g,
        new THREE.Vector3(-24.0, 35.6, -6.0),
        new THREE.Vector3(-34, 96, -24),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B74. Sony OEM 3-Way Shell T-Junction Waterproof Foam Dams (Ref.51 / Ref.74 / Ref.254)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 1. REAR FRONT WP CUSHION (Ref.51: 501034701) along front-to-rear left flank seam
    const c51 = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(5.2, 52.0, 1.2), 2.4, 0.14, 0.14, 12),
      mats.epdmGasket
    );
    c51.position.set(52.0, 0, -18.5);
    // 2. REAR FTB WP CUSHION (Ref.74: 502862901) at upper rear-top-body T-junction
    const c74 = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(46.0, 4.8, 1.2), 2.4, 0.14, 0.14, 12),
      mats.butylDamperRubber
    );
    c74.position.set(-18.0, 31.8, -28.5);
    // 3. AF CUSHION (Ref.254: 501141301) at upper right grip-top junction
    const c254 = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 6.2, 1.4), 2.6, 0.14, 0.14, 12).rotateX(Math.PI / 2),
      mats.lensFoamSeal
    );
    c254.position.set(-46.0, 34.5, 4.5);

    g.add(c51, c74, c254);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-rear-ftb-wp-cushions',
        74,
        '#0f172a',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(38, 42, -52),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B75. NP-FZ100 Internal Li-Ion Safety Architecture (PTC, CID Vent, Cell NTC & Dual-MOSFET BMS)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Dual 3.6V cylindrical Li-Ion safety top-cap CID pressure vents + spot-welded nickel tabs
    for (const sz of [-6.4, 6.4]) {
      const cidCap = new THREE.Mesh(
        new THREE.CylinderGeometry(6.6, 6.6, 1.2, 22),
        mats.stainlessMachined
      );
      cidCap.position.set(0, 19.2, sz);
      const cidDisk = new THREE.Mesh(
        new THREE.CylinderGeometry(3.8, 3.8, 1.4, 16),
        mats.bodyRecRed
      );
      cidDisk.position.set(0, 19.4, sz);
      g.add(cidCap, cidDisk);
    }
    // Pure nickel spot-welded series busbar tab linking 2S1P cells
    const niTab = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.35, 16.5), mats.sinteredSilver);
    niTab.position.set(0, 20.1, 0);
    // Resettable PTC Thermal Fuse + Dual-MOSFET Protection BMS PCB at battery crown
    const bmsPcb = new THREE.Mesh(new THREE.BoxGeometry(14.0, 1.1, 24.0), mats.hdiMainboardPcb);
    bmsPcb.position.set(0, 21.8, 0);
    const ptc = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.85, 6.2), mats.tantalumCapYellow);
    ptc.position.set(-3.2, 22.6, 5.5);
    const mosfet = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.78, 5.2), mats.icEpoxy);
    mosfet.position.set(2.8, 22.6, -4.5);
    // Cell-wall glued NTC temperature thermistor & amber Kapton strap
    const ntcStrap = new THREE.Mesh(new THREE.BoxGeometry(3.8, 18.0, 0.26), mats.polyimideFpc);
    ntcStrap.position.set(7.6, 10.0, 0);
    const ntcBead = new THREE.Mesh(new THREE.SphereGeometry(1.05, 10, 8), mats.pztCeramic);
    ntcBead.position.set(7.8, 4.5, 0);
    ntcBead.userData.noEdges = true;

    g.add(niTab, bmsPcb, ptc, mosfet, ntcStrap, ntcBead);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-battery-cell-safety',
        75,
        '#10b981',
        g,
        new THREE.Vector3(-54.0, -8.5, 5.0),
        new THREE.Vector3(-94, -54, 48),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B76. Bottom Anti-Twist Video-Head Pin Socket, Recessed Serial/QR Nameplate & Anti-Slip Pad
  // =========================================================================
  {
    const g = new THREE.Group();

    // Micro-textured anti-slip tripod contact pad framing 1/4-20 UNC tripod socket
    const padShape = createFrameShape(28.0, 24.0, 3.0, 9.6, 9.6, 4.8);
    const antiSlipPad = new THREE.Mesh(
      extrudeCentered(padShape, 0.55, 0.04, 0.04, 20).rotateX(Math.PI / 2),
      mats.bodyLeatherette
    );
    // Stainless anti-twist video-head alignment boss socket directly forward of tripod thread
    const pinRing = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.8, 2.2, 18),
      mats.stainlessMachined
    );
    pinRing.position.set(0, 0.6, 14.2);
    const pinBore = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65, 1.65, 2.4, 14),
      mats.velvetFlockTrap
    );
    pinBore.position.set(0, 0.55, 14.2);
    // Recessed anodized Model / Serial / Certification / QR Nameplate on +X bottom floor
    const nameRecess = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.0, 18.0, 1.8), 0.48, 0.04, 0.04, 14).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    nameRecess.position.set(32.0, -0.15, -2.0);
    // Engraved silver QR & serial data matrix accent block (zero legible text — geometric CAD cue)
    const qrPlate = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.16, 6.8), mats.sinteredSilver);
    qrPlate.position.set(42.5, -0.45, -2.0);
    qrPlate.userData.noEdges = true;
    const specBar = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.16, 2.2), mats.goldPlating);
    specBar.position.set(27.5, -0.45, -5.5);
    specBar.userData.noEdges = true;

    g.add(antiSlipPad, pinRing, pinBore, nameRecess, qrPlate, specBar);

    parts.push(
      finalizeStandaloneBodyAuditPart(
        'body-anti-twist-tripod-pin',
        76,
        '#64748b',
        g,
        new THREE.Vector3(0, -36.9, 0),
        new THREE.Vector3(16, -98, 22),
        cp,
        0.26
      )
    );
  }

  return parts;
}
