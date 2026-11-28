//@FLOW_MAP|file=src/assemblies/body/bodyNextGenParts.ts|unit=body|lines=1265|exports=buildBodyNextGenParts
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

function finalizeBodyNextGenPart(
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
 * Phase 24 — 25 Standalone-Only Next-Gen Camera Body & Official Sony ILCE-7M4 OEM Deep-Audit Parts (B77–B101 -> 101 total).
 * Strictly visible ONLY in standalone 'body' view; completely omitted in whole-camera views ('integrated', 'camera_body').
 */
export function buildBodyNextGenParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // B77. Front Visible Light + Infrared (VL+IR) Ambient AWB Sensor & Prism Window
  // =========================================================================
  {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(8.4, 5.2, 1.1), 2.8, 0.08, 0.08, 10),
      mats.matteBlackAnodized
    );
    // Frosted white optical diffuser window & IR-pass dual window
    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.0, 0.65), mats.lcdDiffuserMatte);
    diffuser.position.set(-1.7, 0, 1.45);
    const irWin = new THREE.Mesh(new THREE.BoxGeometry(2.8, 3.0, 0.65), mats.evfIrWindowBlack);
    irWin.position.set(1.8, 0, 1.45);
    // Waterproof EPDM perimeter O-ring seal
    const wpRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(8.8, 5.6, 1.2, 7.6, 4.4, 0.8), 0.55, 0.05, 0.05, 10),
      mats.epdmGasket
    );
    wpRing.position.z = 1.1;
    // Internal RGB+IR photodiode PCB + flex tail
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(7.6, 4.4, 0.5), mats.sensorPcb);
    pcb.position.z = -1.2;
    const flex = new THREE.Mesh(new THREE.BoxGeometry(3.2, 7.5, 0.2), mats.polyimideFpc);
    flex.position.set(0, -5.2, -1.35);
    g.add(housing, diffuser, irWin, wpRing, pcb, flex);

    parts.push(
      finalizeBodyNextGenPart(
        'body-vl-ir-awb-sensor',
        77,
        '#38bdf8',
        g,
        new THREE.Vector3(-28.0, 26.5, 29.2),
        new THREE.Vector3(-36, 44, 78),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B78. Front Grip Infrared Remote Receiver Window & Demodulator PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    const bezel = new THREE.Mesh(
      extrudeCentered(createFrameShape(7.2, 9.6, 1.5, 5.2, 7.6, 1.0), 1.4, 0.06, 0.06, 10),
      mats.bodyMgShell
    );
    // Dark ruby IR-pass acrylic lens (blocks visible, passes 940nm)
    const irLens = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(5.0, 7.4, 0.9), 1.1, 0.08, 0.08, 10),
      mats.evfIrWindowBlack
    );
    irLens.position.z = 0.22;
    // Shielded IR receiver IC & gasket
    const rxIc = new THREE.Mesh(new THREE.BoxGeometry(4.2, 5.4, 1.8), mats.emiShieldCan);
    rxIc.position.z = -1.35;
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(6.0, 8.2, 0.55), mats.hdiMainboardPcb);
    pcb.position.z = -2.45;
    const gasket = new THREE.Mesh(
      extrudeCentered(createFrameShape(7.6, 10.0, 1.6, 6.2, 8.6, 1.2), 0.45, 0.04, 0.04, 10),
      mats.epdmGasket
    );
    gasket.position.z = -0.3;
    g.add(bezel, irLens, rxIc, pcb, gasket);

    parts.push(
      finalizeBodyNextGenPart(
        'body-front-ir-remote-window',
        78,
        '#9f1239',
        g,
        new THREE.Vector3(-52.0, 14.5, 28.8),
        new THREE.Vector3(-88, 22, 74),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // B79. OEM E-Mount Protective Body Cap CAP, BODY (Ref.551: 418853601 / ALC-B1EM)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main circular anti-static ABS cap face sized flush to the 69.4mm (R=34.7mm) front mount throat
    const outerRim = new THREE.Mesh(
      new THREE.CylinderGeometry(35.6, 36.2, 4.2, 40).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    outerRim.position.z = 2.6;
    const innerDish = new THREE.Mesh(
      new THREE.CylinderGeometry(29.8, 30.8, 2.2, 36).rotateX(Math.PI / 2),
      mats.bodyBatteryShell
    );
    innerDish.position.z = 4.4;
    // Knurled grip ribs around perimeter
    for (let i = 0; i < 28; i++) {
      const ang = (i / 28) * Math.PI * 2;
      const rib = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.9, 3.6), mats.epdmGasket);
      rib.position.set(Math.cos(ang) * 36.0, Math.sin(ang) * 36.0, 2.6);
      rib.rotation.z = ang;
      rib.userData.noEdges = true;
      g.add(rib);
    }
    // Inner bayonet barrel + 3 locking E-mount bayonet lugs
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(28.4, 28.4, 5.4, 36, 1, true).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    barrel.position.z = -1.4;
    for (let k = 0; k < 3; k++) {
      const ang = (k / 3) * Math.PI * 2 + 0.35;
      const lug = new THREE.Mesh(new THREE.BoxGeometry(12.0, 3.2, 1.5), mats.matteBlackAnodized);
      lug.position.set(Math.cos(ang) * 29.4, Math.sin(ang) * 29.4, -3.2);
      lug.rotation.z = ang + Math.PI / 2;
      g.add(lug);
    }
    // White alignment index dot on cap rim
    const idxDot = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 0.5, 12).rotateX(Math.PI / 2),
      mats.lcdDiffuserMatte
    );
    idxDot.position.set(0, 32.8, 4.8);
    g.add(outerRim, innerDish, barrel, idxDot);

    parts.push(
      finalizeBodyNextGenPart(
        'body-bodycap-alc-b1em',
        79,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 30.8),
        new THREE.Vector3(0, 4, 96),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B80. Sony SORPLAS™ Recycled Liner & CFRP Sereebo® Hybrid Composite Shell
  // =========================================================================
  {
    const g = new THREE.Group();
    // Composite structural U-frame inner reinforcement shell with circular sensor/LCD cutout
    const shellFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(114.0, 68.0, 4.2, 66.0, 44.0, 3.0), 2.4, 0.12, 0.12, 12),
      mats.carbonFiberBlade
    );
    // Recycled SORPLAS flame-retardant thermal-isolation inner baffle panels
    const leftLiner = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(20.0, 56.0, 2.4), 1.6, 0.08, 0.08, 10),
      mats.bodyBatteryShell
    );
    leftLiner.position.set(44.5, 0, 1.8);
    const rightLiner = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(18.0, 56.0, 2.4), 1.6, 0.08, 0.08, 10),
      mats.bodyBatteryShell
    );
    rightLiner.position.set(-44.5, 0, 1.8);
    // Cross-bracing carbon composite ribs
    for (const ry of [-28.0, 28.0]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(92.0, 2.6, 3.2), mats.carbonFiberBladeRear);
      rib.position.set(0, ry, -0.5);
      g.add(rib);
    }
    // Eco green-accent material identification stripe on inner liner
    const ecoMark = new THREE.Mesh(new THREE.BoxGeometry(28.0, 2.2, 0.35), mats.cfaGreen);
    ecoMark.position.set(0, -31.2, -1.35);
    g.add(shellFrame, leftLiner, rightLiner, ecoMark);

    parts.push(
      finalizeBodyNextGenPart(
        'body-sorplas-sereebo-liner',
        80,
        '#10b981',
        g,
        new THREE.Vector3(-6.0, 0, -24.5),
        new THREE.Vector3(24, 18, -94),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B81. Deep-Grip Internal Ergonomic Rib Core & Finger-Well Insert (α9 III / α1 II)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Contoured inner deep-grip skeletal core wrapping battery chamber front
    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(14.8, 13.8, 62.0, 20, 1, false, -Math.PI * 0.65, Math.PI * 1.15),
      mats.magnesiumCast
    );
    core.position.set(-2.5, 0, 4.5);
    // Horizontal structural honeycomb load ribs absorbing heavy telephoto torque
    for (let i = -3; i <= 3; i++) {
      const rib = new THREE.Mesh(
        new THREE.BoxGeometry(16.5, 1.35, 11.5),
        mats.stainlessMachined
      );
      rib.position.set(-4.0, i * 8.2, 6.2);
      rib.userData.noEdges = true;
      g.add(rib);
    }
    // Deep middle-finger undercut saddle & angled shutter deck bolster
    const fingerSaddle = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.0, 16.0, 3.2), 7.5, 0.2, 0.2, 10),
      mats.butylDamperRubber
    );
    fingerSaddle.position.set(8.2, 10.5, 11.0);
    fingerSaddle.rotation.y = 0.28;
    const topBolster = new THREE.Mesh(new THREE.BoxGeometry(18.0, 5.2, 16.0), mats.magnesiumCast);
    topBolster.position.set(-2.0, 29.0, 8.0);
    topBolster.rotation.x = 0.24;
    g.add(core, fingerSaddle, topBolster);

    parts.push(
      finalizeBodyNextGenPart(
        'body-front-grip-thumb-insert',
        81,
        '#64748b',
        g,
        new THREE.Vector3(-53.5, -2.5, 11.5),
        new THREE.Vector3(-96, -8, 62),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B82. Removable Deep Eyepiece Cup EYE CUP ASSY (Ref.5: X50009261 / FDA-EP21)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Inner hard polycarbonate slide-rail bayonet frame
    const pcFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(35.0, 23.5, 3.8, 24.5, 15.5, 2.2), 3.6, 0.12, 0.12, 12),
      mats.matteBlackAnodized
    );
    // Deep contoured soft-silicone light-blocking outer eyecup flare (FDA-EP21 style)
    const softFlare = new THREE.Mesh(
      extrudeCentered(createFrameShape(42.5, 29.5, 6.5, 25.0, 16.2, 3.0), 8.2, 0.45, 0.45, 14),
      mats.evfEyecupRubber
    );
    softFlare.position.z = -5.6;
    // Upper sun-visor brow extension
    const brow = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(40.0, 5.5, 2.2), 4.8, 0.2, 0.2, 10),
      mats.evfEyecupRubber
    );
    brow.position.set(0, 12.8, -9.8);
    // Dual lower snap-lock retention clips
    for (const sx of [-11.5, 11.5]) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.5, 2.4), mats.stainlessMachined);
      clip.position.set(sx, -11.5, 1.4);
      g.add(clip);
    }
    g.add(pcFrame, softFlare, brow);

    parts.push(
      finalizeBodyNextGenPart(
        'body-deep-eyecup-ep21',
        82,
        '#1e293b',
        g,
        new THREE.Vector3(0, 47.5, -36.5),
        new THREE.Vector3(0, 62, -78),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B83. External Diopter Adjustment Dial (Ref.2: 500367201) & WP Sheet B (Ref.301)
  // =========================================================================
  {
    const g = new THREE.Group();
    // External knurled cylindrical diopter dial protruding from side of EVF penthouse
    const dialWheel = new THREE.Mesh(
      new THREE.CylinderGeometry(5.6, 5.6, 4.2, 24).rotateZ(Math.PI / 2),
      mats.matteBlackAnodized
    );
    dialWheel.position.x = -2.2;
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2;
      const knurl = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.55, 0.65), mats.bodyLeatherette);
      knurl.position.set(-2.2, Math.cos(ang) * 5.75, Math.sin(ang) * 5.75);
      knurl.rotation.x = ang;
      knurl.userData.noEdges = true;
      g.add(knurl);
    }
    // Internal precision shaft + worm gear cam + waterproof EPDM shaft O-ring
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 1.8, 11.5, 14).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    shaft.position.x = 3.2;
    const oRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.3, 0.55, 8, 18).rotateY(Math.PI / 2),
      mats.epdmGasket
    );
    oRing.position.x = 0.6;
    // Die-cut DIOPTER COVER WP SHEET B (Ref.301: 500374001)
    const wpSheet = new THREE.Mesh(
      extrudeCentered(createFrameShape(13.0, 13.0, 2.0, 4.6, 4.6, 2.2), 0.35, 0.03, 0.03, 10).rotateY(Math.PI / 2),
      mats.mylarInsulatorFilm
    );
    wpSheet.position.x = 1.4;
    const camGear = new THREE.Mesh(
      new THREE.CylinderGeometry(3.4, 3.4, 2.2, 16).rotateZ(Math.PI / 2),
      mats.brassGear
    );
    camGear.position.x = 7.8;
    g.add(dialWheel, shaft, oRing, wpSheet, camGear);

    parts.push(
      finalizeBodyNextGenPart(
        'body-diopter-dial-wp',
        83,
        '#d97706',
        g,
        new THREE.Vector3(-21.5, 48.0, -24.5),
        new THREE.Vector3(-46, 78, -58),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B84. EVF Eye-Sensor Window (Ref.117), ES-1008 Flex (Ref.116) & EVF Protector (Ref.303)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dark IR proximity window under eyepiece (Ref.117: 501034401)
    const irWin = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(12.6, 4.2, 0.9), 1.2, 0.05, 0.05, 10),
      mats.evfIrWindowBlack
    );
    irWin.position.z = -0.8;
    // Dual waterproof & retention cushions (Ref.114 / Ref.118)
    const wpCush = new THREE.Mesh(
      extrudeCentered(createFrameShape(14.8, 6.2, 1.2, 11.4, 3.4, 0.6), 0.9, 0.04, 0.04, 10),
      mats.epdmGasket
    );
    wpCush.position.z = 0.2;
    // ES-1008 flexible sensor board (Ref.116: A5022315A) with IR emitter & photodiode
    const esFlex = new THREE.Mesh(new THREE.BoxGeometry(14.0, 5.4, 0.32), mats.polyimideFpc);
    esFlex.position.z = 1.2;
    for (const sx of [-3.0, 3.0]) {
      const diode = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 0.95), mats.evfIrEmitter);
      diode.position.set(sx, 0, 0.65);
      g.add(diode);
    }
    // ES GND SHEET (Ref.115: 502997201) conducting face ESD away to chassis
    const gndSheet = new THREE.Mesh(new THREE.BoxGeometry(15.2, 6.4, 0.18), mats.emiShieldFilm);
    gndSheet.position.z = 1.7;
    // Upper protective armor shield EVF PROTECTOR (Ref.303: 502790801)
    const evfProt = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.0, 4.6, 1.2), 18.0, 0.1, 0.1, 10),
      mats.evfHousingMg
    );
    evfProt.position.set(0, 18.5, 10.5);
    g.add(irWin, wpCush, esFlex, gndSheet, evfProt);

    parts.push(
      finalizeBodyNextGenPart(
        'body-evf-eye-sensor-bezel',
        84,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 37.5, -34.2),
        new THREE.Vector3(22, 46, -78),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B85. Dedicated Rear Voice Memo Microphone Chamber & Wind Mesh (Sony α9 III / α1 II)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rear-facing 3-hole acoustic port grille bezel near photographer's mouth
    const bezel = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.5, 6.0, 1.5), 1.4, 0.08, 0.08, 10),
      mats.matteBlackAnodized
    );
    for (const hx of [-2.8, 0, 2.8]) {
      const hole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 1.6, 12).rotateX(Math.PI / 2),
        mats.velvetFlockTrap
      );
      hole.position.set(hx, 0, -0.1);
      hole.userData.noEdges = true;
      g.add(hole);
    }
    // Hydrophobic wind-resistant acoustic mesh + anti-vibration silicone boot
    const meshFilm = new THREE.Mesh(new THREE.BoxGeometry(9.8, 4.6, 0.3), mats.stainlessMachined);
    meshFilm.position.z = 0.95;
    const boot = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(9.4, 5.4, 1.2), 3.2, 0.1, 0.1, 10),
      mats.antiVibRubber
    );
    boot.position.z = 2.6;
    // High-SNR directional MEMS mic capsule + shielded flex
    const mems = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.6, 1.4), mats.goldPlating);
    mems.position.z = 3.6;
    const flex = new THREE.Mesh(new THREE.BoxGeometry(3.4, 9.5, 0.22), mats.polyimideFpc);
    flex.position.set(0, -6.2, 3.8);
    g.add(bezel, meshFilm, boot, mems, flex);

    parts.push(
      finalizeBodyNextGenPart(
        'body-voice-memo-mic',
        85,
        '#0ea5e9',
        g,
        new THREE.Vector3(-28.5, 29.5, -33.8),
        new THREE.Vector3(-54, 42, -88),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B86. Multi-Selector 4-Layer Weatherproof Sandwich Stack (Ref.70–73)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Layer 1: JOY KNOB (Ref.71: 500389901) with textured thumb crown
    const knobStem = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.6, 3.6, 16).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    knobStem.position.z = -2.4;
    const knobCap = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 3.8, 1.8, 20).rotateX(Math.PI / 2),
      mats.bodyLeatherette
    );
    knobCap.position.z = -4.2;
    // Layer 2: JOY RUBBER (Ref.73: 500390101) flexible corrugated waterproof bellows boot
    const bellows1 = new THREE.Mesh(
      new THREE.TorusGeometry(4.8, 0.9, 10, 20),
      mats.epdmGasket
    );
    bellows1.position.z = -1.2;
    const bellowsFlange = new THREE.Mesh(
      extrudeCentered(createFrameShape(14.5, 14.5, 2.5, 6.2, 6.2, 3.0), 0.75, 0.05, 0.05, 12),
      mats.epdmGasket
    );
    bellowsFlange.position.z = -0.3;
    // Layer 3: JOY RETAINER PLATE (Ref.70: 502794401) stainless clamp plate
    const retainer = new THREE.Mesh(
      extrudeCentered(createFrameShape(17.5, 17.5, 2.2, 9.2, 9.2, 4.4), 0.65, 0.04, 0.04, 12),
      mats.stainlessMachined
    );
    retainer.position.z = 0.55;
    // Layer 4: JOY HOLDER PLATE (Ref.72: A5014708A) rigid backing plate + 2 fixing screws
    const holder = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(19.0, 19.0, 2.4), 0.85, 0.05, 0.05, 12),
      mats.midPlateSteel
    );
    holder.position.z = 1.65;
    for (const [sx, sy] of [[-7.2, 7.2], [7.2, -7.2]]) {
      const scr = createPrecisionScrew(1.2, 0.8, 2.4, mats.stainlessMachined);
      scr.rotation.x = Math.PI / 2;
      scr.position.set(sx, sy, 1.4);
      g.add(scr);
    }
    g.add(knobStem, knobCap, bellows1, bellowsFlange, retainer, holder);

    parts.push(
      finalizeBodyNextGenPart(
        'body-joy-retainer-stack',
        86,
        '#475569',
        g,
        new THREE.Vector3(-44.0, 7.5, -33.8),
        new THREE.Vector3(-66, 20, -86),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B87. Memory Card Door Stainless Shaft (Ref.120: 501035811) & Torsion Spring (Ref.121)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision ground stainless hinge pivot shaft (Ref.120: 501035811)
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.15, 42.0, 16),
      mats.stainlessMachined
    );
    // Upper & lower hinge knuckles anchoring to MEDIA LID BASE
    for (const ky of [-15.0, 0, 15.0]) {
      const knuckle = new THREE.Mesh(
        new THREE.CylinderGeometry(2.3, 2.3, 4.6, 16),
        mats.magnesiumCast
      );
      knuckle.position.y = ky;
      g.add(knuckle);
    }
    // Coaxial pop-open torsion spring (Ref.121: 501035701) + dual torsion legs
    const spring = new THREE.Mesh(
      createHelicalSpringGeometry(2.05, 9.5, 7, 0.36),
      mats.beCuSpring
    );
    spring.position.y = 7.5;
    const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 7.5), mats.beCuSpring);
    leg1.position.set(2.0, 12.2, 3.6);
    const leg2 = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.45, 0.45), mats.beCuSpring);
    leg2.position.set(2.4, 2.8, 1.8);
    // E-clip retaining washer at bottom end
    const eClip = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.35, 8, 16).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    eClip.position.y = -20.4;
    g.add(shaft, spring, leg1, leg2, eClip);

    parts.push(
      finalizeBodyNextGenPart(
        'body-media-lid-hinge-spring',
        87,
        '#94a3b8',
        g,
        new THREE.Vector3(-70.0, -5.0, -24.0),
        new THREE.Vector3(-110, -22, -46),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B88. Weather-Sealed Isolated Active Cooling Micro-Blower Fan & Heatsink Tunnel (FX3/FX5)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Isolated sealed aluminum finned heat-exchanger tunnel (completely separated from electronics)
    const tunnelWall = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.0, 14.0, 2.2), 6.2, 0.12, 0.12, 12),
      mats.stainlessMachined
    );
    tunnelWall.position.set(0, 11.5, 0);
    // Cooling fins inside tunnel
    for (let fx = -13.5; fx <= 13.51; fx += 3.0) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.75, 11.5, 4.6), mats.copperHeatSpreader);
      fin.position.set(fx, 11.5, -1.0);
      fin.userData.noEdges = true;
      g.add(fin);
    }
    // Ultra-thin centrifugal micro-blower fan shroud + brushless hub + 14 curved impeller blades
    const shroud = new THREE.Mesh(
      new THREE.CylinderGeometry(13.2, 13.2, 5.2, 28).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    shroud.position.set(0, -6.5, 0);
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 4.4, 5.5, 20).rotateX(Math.PI / 2),
      mats.vcWorkingFluidCyan
    );
    hub.position.set(0, -6.5, 0);
    for (let b = 0; b < 14; b++) {
      const ang = (b / 14) * Math.PI * 2;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.85, 3.8), mats.carbonFiberBlade);
      blade.position.set(Math.cos(ang) * 8.0, -6.5 + Math.sin(ang) * 8.0, 0);
      blade.rotation.z = ang + 0.45;
      blade.userData.noEdges = true;
      g.add(blade);
    }
    // Perimeter waterproof isolation gasket separating duct from PCB cavity
    const isoSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(36.0, 34.0, 3.0, 31.0, 29.0, 2.2), 1.0, 0.06, 0.06, 12),
      mats.epdmGasket
    );
    isoSeal.position.set(0, 2.0, 3.4);
    g.add(tunnelWall, shroud, hub, isoSeal);

    parts.push(
      finalizeBodyNextGenPart(
        'body-active-cooling-fan-duct',
        88,
        '#06b6d4',
        g,
        new THREE.Vector3(22.0, 12.0, -21.5),
        new THREE.Vector3(68, 34, -74),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // B89. OEM Mainboard Thermal Bridge Stack: HEAT_PLATE (Ref.355), Sheet A (Ref.357), Insulators A/B
  // =========================================================================
  {
    const g = new THREE.Group();
    // INSULATING SHEET A (Ref.356: 502992401) — front electrical barrier facing mainboard
    const insulA = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(58.0, 42.0, 2.5), 0.32, 0.02, 0.02, 10),
      mats.mylarInsulatorFilm
    );
    insulA.position.z = 2.0;
    // HEAT TRANSFER SHEET A (Ref.357: 502860201) — soft pink thermal interface pad over BIONZ XR
    const timPad = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 22.0, 1.8), 1.25, 0.06, 0.06, 10),
      mats.thermalPadPink
    );
    timPad.position.set(-4.0, 2.0, 1.15);
    // HEAT_PLATE (Ref.355: 502789301) — stamped aluminum-copper heat spreader bridge
    const heatPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(62.0, 46.0, 3.0), 1.15, 0.06, 0.06, 12),
      mats.copperHeatSpreader
    );
    // Sigma-shaped pyrolytic graphite strip bonded to rear face
    const sigmaStrip = new THREE.Mesh(new THREE.BoxGeometry(52.0, 10.5, 0.4), mats.pyroGraphite);
    sigmaStrip.position.set(0, -12.0, -0.85);
    // INSULATING SHEET B (Ref.361: 502992501) — rear electrical isolation barrier
    const insulB = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(60.0, 44.0, 2.6), 0.32, 0.02, 0.02, 10),
      mats.mylarInsulatorFilm
    );
    insulB.position.z = -1.65;
    g.add(insulA, timPad, heatPlate, sigmaStrip, insulB);

    parts.push(
      finalizeBodyNextGenPart(
        'body-sigma-graphite-heatplate',
        89,
        '#f97316',
        g,
        new THREE.Vector3(4.0, -3.0, -24.0),
        new THREE.Vector3(28, -28, -86),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // B90. CFexpress Card Slot Thermal Gap-Filler Pad & Chassis Heat-Spreader Bridge
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual soft high-k blue thermal gap pads pressed directly against CFexpress Slot 1 & 2 metal cages
    for (const sz of [-4.2, 4.2]) {
      const pad = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(2.2, 30.0, 0.6), 7.2, 0.06, 0.06, 8),
        mats.thermalPadBlue
      );
      pad.position.set(0, 0, sz);
      g.add(pad);
    }
    // Copper-foil & graphite L-shaped spreader conducting card heat downward into Mg baseplate
    const spreaderV = new THREE.Mesh(new THREE.BoxGeometry(1.2, 36.0, 21.0), mats.copperHeatSpreader);
    spreaderV.position.set(2.0, -2.0, 0);
    const spreaderFoot = new THREE.Mesh(new THREE.BoxGeometry(18.0, 1.2, 20.0), mats.pyroGraphite);
    spreaderFoot.position.set(10.5, -19.5, 0);
    g.add(spreaderV, spreaderFoot);

    parts.push(
      finalizeBodyNextGenPart(
        'body-cfexpress-thermal-bridge',
        90,
        '#3b82f6',
        g,
        new THREE.Vector3(-56.0, -5.0, -14.0),
        new THREE.Vector3(-88, -32, -42),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // B91. External Cooling Grip Airflow Louver & Hydrophobic Mesh Vent (EOS R5 Mark II Gen)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bottom-to-side angled intake/exhaust louver manifold
    const manifold = new THREE.Mesh(
      extrudeCentered(createFrameShape(32.0, 14.0, 2.2, 26.0, 9.0, 1.4), 3.4, 0.1, 0.1, 10).rotateX(Math.PI / 2),
      mats.bodyMgShell
    );
    // Angled weather-deflecting louver slats
    for (let lx = -10.5; lx <= 10.51; lx += 3.5) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.8, 8.8), mats.stainlessMachined);
      slat.position.set(lx, 0, 0);
      slat.rotation.z = 0.42;
      slat.userData.noEdges = true;
      g.add(slat);
    }
    // Hydrophobic stainless micro-mesh screen & EPDM docking seal for CF-R20EP cooling grip
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(27.0, 0.4, 10.0), mats.conductiveNiCuFoam);
    mesh.position.y = 1.9;
    const dockSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(34.5, 16.5, 2.5, 29.0, 11.5, 1.8), 0.9, 0.05, 0.05, 10).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    dockSeal.position.y = -2.1;
    g.add(manifold, mesh, dockSeal);

    parts.push(
      finalizeBodyNextGenPart(
        'body-external-cooling-vent-port',
        91,
        '#0284c7',
        g,
        new THREE.Vector3(34.0, -35.8, -14.0),
        new THREE.Vector3(76, -78, -36),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // B92. OEM Detachable HDMI / USB-C Cable Protector Clamp & Captive Thumb Screw
  // =========================================================================
  {
    const g = new THREE.Group();
    // U-channel glass-filled polycarbonate clamp body locking onto left body I/O edge
    const bodyClamp = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(8.5, 34.0, 1.8), 16.5, 0.14, 0.14, 10),
      mats.matteBlackAnodized
    );
    // Two notched strain-relief cable grips (upper HDMI + lower USB-C)
    for (const cy of [7.5, -7.5]) {
      const jaw = new THREE.Mesh(
        extrudeCentered(createFrameShape(7.2, 11.5, 1.4, 4.6, 7.6, 1.0), 11.0, 0.08, 0.08, 10),
        mats.bodyBatteryShell
      );
      jaw.position.set(5.5, cy, 0);
      g.add(jaw);
    }
    // Captive knurled stainless thumbscrew anchoring into B34 left side boss
    const thumbHead = new THREE.Mesh(
      new THREE.CylinderGeometry(3.8, 3.8, 3.6, 20).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    thumbHead.position.set(6.5, 0, 0);
    const thumbShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 9.0, 12).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    thumbShaft.position.set(-2.5, 0, 0);
    g.add(bodyClamp, thumbHead, thumbShaft);

    parts.push(
      finalizeBodyNextGenPart(
        'body-cable-protector-clamp',
        92,
        '#64748b',
        g,
        new THREE.Vector3(61.0, -2.0, -7.0),
        new THREE.Vector3(108, -18, 12),
        cp,
        0.25
      )
    );
  }

  // =========================================================================
  // B93. 2026 Pro Dual USB-C (PD + 10Gbps Data) & 2.5GBASE-T Wired LAN RJ-45 Bay
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stainless EMI cage housing all 3 high-speed pro ports
    const bayBracket = new THREE.Mesh(new THREE.BoxGeometry(2.2, 40.0, 19.0), mats.stainlessMachined);
    // Dual stacked USB Type-C metallic receptacles (USB-C1 Data/TC + USB-C2 100W PD Power)
    for (const [uy, col] of [[12.5, mats.goldPlating], [3.5, mats.cinnabarAnodized]] as const) {
      const shell = new THREE.Mesh(
        extrudeCentered(createFrameShape(11.0, 5.2, 1.6, 8.6, 3.0, 1.0), 9.5, 0.06, 0.06, 12).rotateY(Math.PI / 2),
        mats.emiShieldCan
      );
      shell.position.set(-4.5, uy, 0);
      const tongue = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.9, 6.8), col);
      tongue.position.set(-4.2, uy, 0);
      g.add(shell, tongue);
    }
    // Reinforced 2.5GBASE-T RJ-45 Ethernet jack with integrated magnetics & green/amber link LEDs
    const rj45 = new THREE.Mesh(new THREE.BoxGeometry(14.5, 13.8, 15.6), mats.emiShieldCan);
    rj45.position.set(-6.8, -10.5, 0);
    const rjCavity = new THREE.Mesh(new THREE.BoxGeometry(2.2, 9.6, 11.6), mats.velvetFlockTrap);
    rjCavity.position.set(0.2, -10.5, 0);
    const ledG = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.8, 1.8), mats.cfaGreen);
    ledG.position.set(0.8, -4.6, -5.2);
    const ledA = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.8, 1.8), mats.tantalumCapYellow);
    ledA.position.set(0.8, -4.6, 5.2);
    g.add(bayBracket, rj45, rjCavity, ledG, ledA);

    parts.push(
      finalizeBodyNextGenPart(
        'body-dual-usbc-25g-lan-bay',
        93,
        '#2563eb',
        g,
        new THREE.Vector3(51.5, -4.5, -8.5),
        new THREE.Vector3(94, 24, -26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B94. OEM 3.5mm Audio Jack Module: JK HOLDER (Ref.205), JACK PLATE (Ref.353) & JK-1028 Flex (Ref.206)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Metal JACK PLATE (Ref.353: 502789401) grounding face
    const jackPlate = new THREE.Mesh(new THREE.BoxGeometry(1.6, 22.0, 12.0), mats.stainlessMachined);
    // Rigid molded JK HOLDER block (Ref.205: 502789601)
    const holder = new THREE.Mesh(new THREE.BoxGeometry(11.5, 19.5, 10.5), mats.matteBlackAnodized);
    holder.position.x = -6.2;
    // Red-ring Mic input jack & Black-ring Headphone output jack (3.5mm TRS)
    const micRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.75, 10, 20).rotateY(Math.PI / 2),
      mats.bodyRecRed
    );
    micRing.position.set(1.1, 5.0, 0);
    const hpRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.75, 10, 20).rotateY(Math.PI / 2),
      mats.cfaGreen
    );
    hpRing.position.set(1.1, -5.0, 0);
    for (const jy of [5.0, -5.0]) {
      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 2.6, 12.2, 16).rotateZ(Math.PI / 2),
        mats.goldPlating
      );
      barrel.position.set(-5.2, jy, 0);
      g.add(barrel);
    }
    // Isolated JK-1028 flexible board (Ref.206: A5022316A) routing audio to mainboard away from digital noise
    const jkFlex = new THREE.Mesh(new THREE.BoxGeometry(14.5, 14.0, 0.3), mats.polyimideFpc);
    jkFlex.position.set(-14.5, -2.0, -3.5);
    g.add(jackPlate, holder, micRing, hpRing, jkFlex);

    parts.push(
      finalizeBodyNextGenPart(
        'body-audio-jack-jk1028',
        94,
        '#ef4444',
        g,
        new THREE.Vector3(51.0, 14.5, -6.5),
        new THREE.Vector3(92, 46, -12),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B95. 2x2 MIMO 5/6GHz Diversity 2nd Antenna & Ferrite-Backed NFC Loop Coil
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dark sintered ferrite magnetic flux shield backing sheet (prevents Mg body eddy-current loss)
    const ferrite = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 22.0, 2.0), 0.55, 0.03, 0.03, 10).rotateY(Math.PI / 2),
      mats.softIronYoke
    );
    // Multi-turn copper 13.56MHz NFC flat spiral coil on outer face of ferrite sheet
    for (let t = 0; t < 3; t++) {
      const w = 13.5 - t * 2.4;
      const h = 19.5 - t * 2.4;
      const turn = new THREE.Mesh(
        extrudeCentered(createFrameShape(w, h, 1.2, w - 1.1, h - 1.1, 0.8), 0.25, 0.02, 0.02, 8).rotateY(Math.PI / 2),
        mats.copperCoil
      );
      turn.position.x = -0.5;
      turn.userData.noEdges = true;
      g.add(turn);
    }
    // Secondary 2x2 MIMO 5/6GHz diversity LDS antenna strip mounted orthogonally above NFC coil
    const mimoBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 8.5, 22.0), mats.zifIvoryPlastic);
    mimoBase.position.set(1.2, 16.5, -1.5);
    const mimoTrace = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.2, 19.5), mats.rfGoldCoax);
    mimoTrace.position.set(-0.2, 16.5, -1.5);
    // Micro-coax feedline tail
    const coax = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 24.0, 10),
      mats.coaxShieldCopper
    );
    coax.position.set(2.2, 4.0, -10.5);
    g.add(ferrite, mimoBase, mimoTrace, coax);

    parts.push(
      finalizeBodyNextGenPart(
        'body-mimo-wifi6e-nfc-coil',
        95,
        '#eab308',
        g,
        new THREE.Vector3(-66.5, 4.0, 4.0),
        new THREE.Vector3(-108, 32, 34),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B96. OEM Bottom Waterproof Potting Assembly BOTTOM WP POTTING B-ASSY (Ref.17: A5025879A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cured silicone waterproof potting ring sealing underside perimeter & corner seams
    const potRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(116.0, 48.0, 5.5, 106.0, 38.0, 4.0), 1.65, 0.14, 0.14, 14).rotateX(Math.PI / 2),
      mats.makeupSealViolet
    );
    // Molded potting dam around vertical-grip contact pass-through & tripod base bosses
    const vgDam = new THREE.Mesh(
      extrudeCentered(createFrameShape(24.0, 14.0, 2.2, 18.0, 8.0, 1.4), 2.2, 0.12, 0.12, 10).rotateX(Math.PI / 2),
      mats.makeupSealViolet
    );
    vgDam.position.set(-22.0, 0.3, -12.0);
    // Potting encapsulation beads at 6 bottom screw-boss water-ingress points
    for (const [bx, bz] of [[-48, -16], [0, -16], [48, -16], [-48, 16], [0, 16], [48, 16]]) {
      const bead = new THREE.Mesh(
        new THREE.TorusGeometry(3.0, 0.85, 8, 16).rotateX(Math.PI / 2),
        mats.epdmGasket
      );
      bead.position.set(bx, 0.2, bz);
      bead.userData.noEdges = true;
      g.add(bead);
    }
    g.add(potRing, vgDam);

    parts.push(
      finalizeBodyNextGenPart(
        'body-bottom-wp-potting',
        96,
        '#8b5cf6',
        g,
        new THREE.Vector3(-6.0, -36.5, -2.0),
        new THREE.Vector3(-30, -104, 14),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B97. Direct-to-Chassis 5-Point Stainless 1/4-20 UNC Rig Bosses (Sony FX3 / FX5 Cinema Line)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 5 heavy-duty blind-hole stainless 1/4-20 UNC threaded inserts (3 top + 1 left + 1 right)
    const bossCoords: Array<[number, number, number, number]> = [
      [-32.0, 1.2, -10.0, 0], // Top-right shoulder
      [26.0, 1.2, -10.0, 0],  // Top-left shoulder
      [26.0, 1.2, 8.0, 0],    // Top-left front
      [54.5, -18.0, 4.0, 1],  // Left side rig boss
      [-64.5, -18.0, 10.0, -1], // Right side rig boss
    ];
    for (const [bx, by, bz, side] of bossCoords) {
      const bossGrp = new THREE.Group();
      bossGrp.position.set(bx, by, bz);
      if (side !== 0) bossGrp.rotation.z = side * (Math.PI / 2);
      const flange = new THREE.Mesh(
        new THREE.CylinderGeometry(5.6, 6.2, 2.2, 20),
        mats.stainlessMachined
      );
      const threadCup = new THREE.Mesh(
        new THREE.CylinderGeometry(3.4, 3.4, 6.8, 16),
        mats.titaniumRivet
      );
      threadCup.position.y = -2.8;
      const bore = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 2.4, 14),
        mats.velvetFlockTrap
      );
      bore.position.y = 0.2;
      // Anti-twist ARRI locating pinhole beside thread
      const pinHole = new THREE.Mesh(
        new THREE.CylinderGeometry(1.0, 1.0, 2.3, 10),
        mats.velvetFlockTrap
      );
      pinHole.position.set(7.4, 0.1, 0);
      bossGrp.add(flange, threadCup, bore, pinHole);
      g.add(bossGrp);
    }
    // Internal titanium tie-bar linking the top shoulder rig bosses
    const tieBar = new THREE.Mesh(new THREE.BoxGeometry(66.0, 1.6, 4.8), mats.midPlateSteel);
    tieBar.position.set(-3.0, -1.6, -10.0);
    g.add(tieBar);

    parts.push(
      finalizeBodyNextGenPart(
        'body-cinema-cage-threads',
        97,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 36.2, 2.0),
        new THREE.Vector3(46, 86, 26),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B98. OEM Multi-Interface Shoe Structural & Waterproof Stack (Ref.311 / 324 / 325 / 327 / 328)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Upper MI SHOE SHELL PLATE (Ref.327: 500294302) + screw cover (Ref.329)
    const shellPlate = new THREE.Mesh(
      extrudeCentered(createFrameShape(23.0, 22.0, 1.6, 14.0, 16.0, 1.0), 1.4, 0.06, 0.06, 10).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    shellPlate.position.y = 2.6;
    // Lower under-roof MI SHOE FIX PLATE (Ref.311: 500395901) load-spreading sandwich plate
    const fixPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(26.5, 25.0, 2.0), 1.8, 0.08, 0.08, 10).rotateX(Math.PI / 2),
      mats.midPlateSteel
    );
    fixPlate.position.y = -2.2;
    // 4 Special-head anti-shear M1.7 screws (Ref.328: 500294701) locking upper shell to fix plate
    for (const [sx, sz] of [[-8.8, -8.2], [8.8, -8.2], [-8.8, 8.2], [8.8, 8.2]]) {
      const scr = createPrecisionScrew(1.4, 0.9, 5.2, mats.goldPlating);
      scr.position.set(sx, 0.4, sz);
      g.add(scr);
    }
    // MI SHOE FPC WP RUBBER (Ref.324: 501695501) waterproofing boot around 21-pin digital flex
    const wpBoot = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 6.2, 1.2), 2.8, 0.08, 0.08, 10).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    wpBoot.position.set(0, 0.2, 8.8);
    // MIS-2006 21-pin digital audio/power flexible board (Ref.325: A5001908A)
    const misFlex = new THREE.Mesh(new THREE.BoxGeometry(13.5, 7.5, 0.32), mats.polyimideFpc);
    misFlex.position.set(0, -4.6, 9.0);
    g.add(shellPlate, fixPlate, wpBoot, misFlex);

    parts.push(
      finalizeBodyNextGenPart(
        'body-mi-shoe-fix-wp-stack',
        98,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 54.5, -7.5),
        new THREE.Vector3(0, 96, -22),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B99. OEM 4-Zone Waterproof Urethane Foam Dams (Ref.269 / Ref.322 / Ref.54 / Ref.124)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 1. TOP WP CUSHION F3 (Ref.269: 501030701) along top front deck seam
    const topF3 = new THREE.Mesh(new THREE.BoxGeometry(36.0, 1.8, 4.2), mats.epdmGasket);
    topF3.position.set(-22.0, 15.0, 32.0);
    // 2. SV WP CUSHION B (Ref.322: 502861101) circular dam under Still/Movie/S&Q dial collar
    const svB = new THREE.Mesh(
      new THREE.TorusGeometry(9.6, 1.25, 10, 24).rotateX(Math.PI / 2),
      mats.butylDamperRubber
    );
    svB.position.set(-14.0, 14.5, 14.0);
    // 3. RE LC WP CUSHION A (Ref.54: 502863001) upper-left LCD recess waterproof foam dam
    const reLcA = new THREE.Mesh(
      extrudeCentered(createFrameShape(66.0, 48.0, 2.8, 60.5, 42.5, 2.0), 1.4, 0.06, 0.06, 10),
      mats.epdmGasket
    );
    reLcA.position.set(18.0, -24.0, -14.2);
    // 4. RE LC WP CUSHION B (Ref.124: 502863101) lower LCD hinge recess seal strip
    const reLcB = new THREE.Mesh(new THREE.BoxGeometry(4.6, 42.0, 1.6), mats.butylDamperRubber);
    reLcB.position.set(51.5, -24.0, -14.2);
    g.add(topF3, svB, reLcA, reLcB);

    parts.push(
      finalizeBodyNextGenPart(
        'body-top-wp-cushions-sv',
        99,
        '#475569',
        g,
        new THREE.Vector3(-14.0, 22.0, -18.0),
        new THREE.Vector3(-18, 66, -68),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B100. 2026 NP-SA100 (2670mAh) Health-Telemetry BMS & 100W USB-PD DC-C2 Coupler
  // =========================================================================
  {
    const g = new THREE.Group();
    // Next-gen SA-series DC-C2 dummy-coupler shell with 100W USB-PD regulator internals
    const couplerBody = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.5, 14.5, 2.8), 17.0, 0.14, 0.14, 12),
      mats.bodyBatteryShell
    );
    // Gold InfoLITHIUM telemetry + high-current contact bus bar at top
    const bmsPcb = new THREE.Mesh(new THREE.BoxGeometry(18.0, 2.2, 13.0), mats.hdiMainboardPcb);
    bmsPcb.position.y = 8.4;
    for (let i = -1.5; i <= 1.51; i += 1.0) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.2, 4.2), mats.goldPlating);
      pin.position.set(i * 4.2, 9.6, 2.2);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    // 100W USB-PD inline regulation brick & braided strain-relief cable tucked cleanly at battery base
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -6.5, -2.5),
      new THREE.Vector3(0, -10.5, -8.5),
      new THREE.Vector3(2.5, -12.0, -14.0),
    ]);
    const cable = new THREE.Mesh(
      new THREE.TubeGeometry(cableCurve, 16, 1.55, 10, false),
      mats.epdmGasket
    );
    const pdPlug = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(10.5, 5.4, 1.2), 9.5, 0.1, 0.1, 10),
      mats.matteBlackAnodized
    );
    pdPlug.position.set(3.2, -12.2, -17.5);
    const pdAccent = new THREE.Mesh(new THREE.BoxGeometry(10.8, 1.2, 2.2), mats.varistorRingBlue);
    pdAccent.position.set(3.2, -12.2, -14.8);
    // High-energy SA100 badge bar
    const saStripe = new THREE.Mesh(new THREE.BoxGeometry(19.0, 2.6, 0.4), mats.cinnabarAnodized);
    saStripe.position.set(0, 1.5, 8.65);
    g.add(couplerBody, bmsPcb, cable, pdPlug, pdAccent, saStripe);

    parts.push(
      finalizeBodyNextGenPart(
        'body-np-sa100-dc-c2-pd',
        100,
        '#f97316',
        g,
        new THREE.Vector3(-54.5, -20.5, 1.5),
        new THREE.Vector3(-88, -86, 32),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B101. Anti-Theft Kensington Security Slot & C2PA Hardware Authenticity Chip (HSM)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Hardened stainless backing bracket + 7x3mm Kensington security lock slot
    const lockPlate = new THREE.Mesh(
      extrudeCentered(createFrameShape(16.0, 10.0, 1.8, 7.2, 3.2, 0.8), 2.2, 0.08, 0.08, 10).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    lockPlate.position.x = 7.5;
    // Internal structural anchor gusset bolting into Mg main frame
    const anchorBracket = new THREE.Mesh(new THREE.BoxGeometry(10.5, 12.0, 12.0), mats.midPlateSteel);
    anchorBracket.position.x = 1.5;
    for (const sy of [-4.2, 4.2]) {
      const scr = createPrecisionScrew(1.3, 0.85, 3.6, mats.titaniumRivet);
      scr.rotation.z = Math.PI / 2;
      scr.position.set(3.5, sy, 4.2);
      g.add(scr);
    }
    // Tamper-resistant C2PA Hardware Root-of-Trust Cryptographic Authenticity Module (HSM)
    const hsmBoard = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(14.0, 14.0, 1.6), 1.0, 0.05, 0.05, 10),
      mats.sensorPcb
    );
    hsmBoard.position.set(-7.0, 0, -4.5);
    const hsmDie = new THREE.Mesh(new THREE.BoxGeometry(7.2, 7.2, 1.6), mats.icEpoxy);
    hsmDie.position.set(-7.0, 0, -3.5);
    // Gold cryptographic mesh shield & blue authenticity LED badge
    const cryptoSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(9.8, 9.8, 1.0, 7.6, 7.6, 0.6), 0.35, 0.03, 0.03, 10),
      mats.goldPlating
    );
    cryptoSeal.position.set(-7.0, 0, -2.55);
    const c2paGem = new THREE.Mesh(new THREE.OctahedronGeometry(1.75, 0), mats.varistorRingBlue);
    c2paGem.position.set(-7.0, 0, -2.1);
    g.add(lockPlate, anchorBracket, hsmBoard, hsmDie, cryptoSeal, c2paGem);

    parts.push(
      finalizeBodyNextGenPart(
        'body-c2pa-security-kensington',
        101,
        '#2563eb',
        g,
        new THREE.Vector3(46.0, -24.5, 10.5),
        new THREE.Vector3(88, -56, 46),
        cp,
        0.26
      )
    );
  }

  return parts;
}
