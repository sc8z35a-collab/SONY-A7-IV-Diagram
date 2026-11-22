import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  createSpurGearGeometry,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { BODY_EXPLANATIONS } from './bodyExplanations';
import { LCD_CENTER_X, LCD_CENTER_Y, LCD_HEIGHT, LCD_WIDTH } from '../lcd/lcdParts';
import { EVF_OPTICAL_Y } from '../evf/evfParts';

export interface BodyDynamicRig {
  shutterButtonCap: THREE.Mesh;
  frontDialMesh: THREE.Object3D;
  rearDialMesh: THREE.Object3D;
  afJoystickCap: THREE.Group;
  applyDynamics: (elapsed: number, physicsActive: boolean) => void;
}

function finalizeBodyPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  integratedExplodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.22
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
    integratedExplodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: BODY_EXPLANATIONS[id],
  };
}

/**
 * Create a precision knurled cylindrical dial (metal bezel + perimeter grip teeth).
 */
function createKnurledDial(
  radius: number,
  height: number,
  teeth: number,
  bodyMat: THREE.Material,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 1.02, height, 32), bodyMat);
  g.add(cyl);

  // Fine perimeter knurling grooves batched into a single InstancedMesh draw call!
  const ribGeo = new THREE.BoxGeometry(0.6, height * 0.72, 0.55);
  const inst = new THREE.InstancedMesh(ribGeo, accentMat, teeth);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * (radius + 0.15), 0, Math.sin(a) * (radius + 0.15));
    dummy.rotation.set(0, -a, 0);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  inst.instanceMatrix.needsUpdate = true;
  g.add(inst);
  return g;
}

/**
 * Build all 26 ultra-detailed CAD sub-assemblies of the 2024-2026 Flagship Mirrorless
 * Camera Body — 12 external monocoque/battery/control assemblies + 14 deep internal
 * watchmaker electromechanical assemblies (snap-dome switches, optical dial encoders,
 * lock-pin ratchets, heart-cam card ejectors, gimbal joystick, hollow rear wheel encoder,
 * hot-shoe leaf springs, forged strap anchors, ePTFE acoustic breather & 3D weather gaskets).
 *
 * TRUE CAMERA HANDEDNESS (1 unit = 1 mm, optical axis = (0, 0)):
 *  - +Z = Front (Lens Mount at z = +30.6..+32.0, 50mm F1.2 Lens at z = +32.5..+138)
 *  - -Z = Rear (EVF Eyecup at y=39.5, z=-37.2; 4-Axis LCD at x=+6, y=-7, z=-28.8..-35.8)
 *  - -X = Photographer's RIGHT-HAND SIDE (Deep Grip, 7.2V Battery, Shutter, Command Dials, Card Door, Thumb Controls)
 *  - +X = Photographer's LEFT-HAND SIDE (Split I/O Doors, Left Drive/AF Dial, LCD Swivel Hinge)
 */
export function buildBodyParts(mats: MaterialLibrary): { parts: CadPart[]; rig: BodyDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // B01: 7.2V High-Discharge 6.0A Dual-Cell Li-Ion Battery Pack + Smart BMS
  // Positioned inside the deep -X right-hand grip bay (x = -54.5, y = -6.0, z = +1.0)
  // =========================================================================
  const batteryGroup = new THREE.Group();
  {
    // Main battery casing (37.8 W x 51.0 H x 21.8 D mm, realistic NP-FZ100 / LP-E6P size!)
    // Cutaway back/outer half so BOTH blue high-discharge 18650 cells + BMS PCB are visible!
    const shellBody = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(20.5, 50.5, 3.2), 36.2, 0.25, 0.25, 18),
      mats.bodyBatteryShell
    );
    shellBody.position.set(2.0, 0, 0);
    batteryGroup.add(shellBody);

    // Cutaway outer collar rim framing the exposed internal dual Li-Ion cells
    const cutWindowFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(21.6, 51.2, 3.4, 17.6, 40.0, 2.2), 36.8, 0.2, 0.2, 18),
      mats.bodyBatteryShell
    );
    cutWindowFrame.position.set(1.5, 0, 0);
    batteryGroup.add(cutWindowFrame);

    // 2x Series-Connected 3.6V -> 7.2V High-Discharge 6A Cobalt-Blue Cylindrical Li-Ion Cells!
    for (const sz of [-8.8, 8.8]) {
      const cell = new THREE.Mesh(
        new THREE.CylinderGeometry(7.9, 7.9, 41.5, 28),
        mats.bodyBatteryCell
      );
      cell.position.set(-2.2, -2.2, sz);
      batteryGroup.add(cell);

      // Positive stainless cathode terminal button + nickel busbar tab on top of cell
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(3.4, 3.6, 1.4, 18),
        mats.stainlessMachined
      );
      cap.position.set(-2.2, 19.2, sz);
      batteryGroup.add(cap);
    }

    // Nickel-strip series weld busbar linking Cell 1 & Cell 2 at bottom
    const busbar = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.0, 22.0), mats.stainlessMachined);
    busbar.position.set(-2.2, -23.4, 0);
    batteryGroup.add(busbar);

    // Top Smart BMS Protection & Fuel-Gauge PCB (green HDI PCB + MOSFETs + auth IC)
    const bmsPcb = new THREE.Mesh(new THREE.BoxGeometry(15.5, 1.8, 31.0), mats.hdiMainboardPcb);
    bmsPcb.position.set(0.0, 21.8, 0);
    batteryGroup.add(bmsPcb);

    for (const icZ of [-9.5, 0, 9.5]) {
      const ic = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.1, 4.6), mats.icEpoxy);
      ic.position.set(-1.5, 23.1, icZ);
      batteryGroup.add(ic);
    }

    // 4 Recessed Gold Power & Smart-Data Terminal Slots on top face (+Y)
    for (let i = 0; i < 4; i++) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(5.5, 2.2, 2.6), mats.goldPlating);
      slot.position.set(4.5, 24.8, -9.0 + i * 6.0);
      batteryGroup.add(slot);
    }

    // Subtle metallic polarity chevron indicator stripe (strictly zero text!)
    const accentStripe = new THREE.Mesh(new THREE.BoxGeometry(0.6, 6.0, 32.0), mats.lensAccentRing);
    accentStripe.position.set(12.2, 16.0, 0);
    accentStripe.userData.noEdges = true;
    batteryGroup.add(accentStripe);
  }
  parts.push(
    finalizeBodyPart(
      'body-battery-pack',
      1,
      '#0284c7',
      batteryGroup,
      new THREE.Vector3(-54.5, -6.0, 1.5),
      new THREE.Vector3(-64, -56, 20),
      new THREE.Vector3(-130, -60, 16),
      cp,
      0.22
    )
  );

  // =========================================================================
  // B02: Sealed Battery Chamber Cage, Gold Terminals & Bottom Locking Hatch
  // =========================================================================
  const chamberGroup = new THREE.Group();
  {
    // Internal protective chamber sleeve hugging B01 cleanly
    const sleeveShape = createFrameShape(25.2, 40.4, 3.8, 22.8, 37.8, 3.0);
    const sleeveGeo = extrudeCentered(sleeveShape, 53.0, 0.14, 0.14, 18);
    sleeveGeo.rotateX(Math.PI / 2); // Open vertically along Y!
    const sleeve = new THREE.Mesh(sleeveGeo, mats.shutterChassis);
    chamberGroup.add(sleeve);

    // Top structural ceiling cap (B14 Gold Terminal Block mounts directly beneath this!)
    const ceiling = new THREE.Mesh(new THREE.BoxGeometry(24.0, 1.8, 39.2), mats.shutterChassis);
    ceiling.position.set(0, 27.2, 0);
    chamberGroup.add(ceiling);

    // Bottom waterproof slide-lock hinged battery bay door + EPDM rubber seal
    const doorPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(26.4, 41.2, 3.8), 2.4, 0.2, 0.2, 16).rotateX(Math.PI / 2),
      mats.bodyMgShell
    );
    doorPlate.position.set(0, -29.2, 0);
    chamberGroup.add(doorPlate);

    const doorGasket = new THREE.Mesh(
      extrudeCentered(createFrameShape(24.8, 39.4, 3.2, 22.0, 36.8, 2.6), 0.9, 0.08, 0.08, 16).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    doorGasket.position.set(0, -27.8, 0);
    chamberGroup.add(doorGasket);
  }
  parts.push(
    finalizeBodyPart(
      'body-battery-chamber',
      2,
      '#475569',
      chamberGroup,
      new THREE.Vector3(-54.5, -6.0, 1.5),
      new THREE.Vector3(-34, -22, 4),
      new THREE.Vector3(-82, -24, 4),
      cp,
      0.22
    )
  );

  // =========================================================================
  // B03: Deep Ergonomic Right-Hand Grip & Pebble-Grain Leatherette Skin
  // Sculpted flagship protrusion at -X (x = -46 .. -70, y = -36 .. +35, z = -30 .. +41)
  // =========================================================================
  const gripGroup = new THREE.Group();
  {
    // Sculpted horizontal cross-section (X-Z plan view extruded along Y) giving genuine organic flagship camera grip curve!
    const gripProfile = new THREE.Shape();
    // Local origin at (-56, -2, +6)
    gripProfile.moveTo(10.0, -30.0); // Rear inner seam near LCD/rear panel
    gripProfile.lineTo(-10.5, -30.0); // Rear outer palm curve
    gripProfile.quadraticCurveTo(-15.5, -24.0, -14.8, -6.0); // Outer palm flank (card door recess sits here)
    gripProfile.quadraticCurveTo(-14.5, 18.0, -9.0, 31.5); // Outer front grip nose
    gripProfile.quadraticCurveTo(-2.0, 37.0, 5.5, 34.5); // Deep finger front tip (protrudes to world z = +41!)
    gripProfile.quadraticCurveTo(10.5, 32.0, 10.5, 22.0); // Inner middle-finger undercut groove!
    gripProfile.lineTo(10.0, -30.0);

    // Main pebble-grained leatherette wrapped outer grip body
    const gripGeo = extrudeCentered(gripProfile, 69.0, 2.2, 2.2, 28);
    gripGeo.rotateX(Math.PI / 2); // Extrusion along Y height (-34.5 .. +34.5)!
    const gripMesh = new THREE.Mesh(gripGeo, mats.bodyLeatherette);
    gripGroup.add(gripMesh);

    // Sculpted upper sloped shutter saddle bridge curving forward-downward toward shutter button
    const saddleGeo = new THREE.CylinderGeometry(11.6, 12.6, 18.0, 28);
    saddleGeo.rotateX(Math.PI * 0.16);
    const saddle = new THREE.Mesh(saddleGeo, mats.bodyMgShell);
    saddle.position.set(-1.0, 30.5, 18.0);
    gripGroup.add(saddle);

    // Signature crimson accent stripe tucked neatly inside the inner middle-finger groove (iconic flagship cue, zero text!)
    const redAccent = new THREE.Mesh(new THREE.BoxGeometry(1.4, 34.0, 2.8), mats.bodyRecRed);
    redAccent.position.set(10.2, 4.0, 29.8);
    redAccent.rotation.x = 0.08;
    gripGroup.add(redAccent);

    // Front tactile IR remote sensor & grip-side custom button bezel
    const irEye = new THREE.Mesh(
      new THREE.CylinderGeometry(2.0, 2.0, 1.2, 16).rotateX(Math.PI / 2),
      mats.evfIrEmitter
    );
    irEye.position.set(1.5, 18.0, 35.6);
    gripGroup.add(irEye);
  }
  parts.push(
    finalizeBodyPart(
      'body-ergo-grip',
      3,
      '#1e293b',
      gripGroup,
      new THREE.Vector3(-56.0, -2.0, 6.0),
      new THREE.Vector3(-76, 8, 48),
      new THREE.Vector3(-148, 8, 56),
      cp,
      0.18
    )
  );

  // =========================================================================
  // B04: 2-Stage Metal-Dome Shutter Button, Power Ring & Front/Rear Command Dials
  // =========================================================================
  const shutterDialsGroup = new THREE.Group();
  let shutterButtonCap: THREE.Mesh;
  let frontDialMesh: THREE.Object3D;
  let rearDialMesh: THREE.Object3D;
  {
    // Sloped ergonomic shutter deck bezel (angled ~24° forward-down for natural index finger drop)
    const shutterPod = new THREE.Group();
    shutterPod.position.set(0, 6.5, 12.0);
    shutterPod.rotation.x = THREE.MathUtils.degToRad(24);

    // Coaxial Power ON/OFF rotary collar with tactile thumb spur
    const pwrRing = new THREE.Mesh(
      new THREE.CylinderGeometry(7.2, 7.8, 2.4, 32),
      mats.bodyMgShell
    );
    shutterPod.add(pwrRing);

    const pwrLever = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.4, 6.2), mats.stainlessMachined);
    pwrLever.position.set(-5.8, 0.2, 4.8);
    pwrLever.rotation.y = -0.5;
    shutterPod.add(pwrLever);

    // Gleaming brushed stainless 2-stage Shutter Release Button Cap (animated half/full press!)
    shutterButtonCap = new THREE.Mesh(
      new THREE.CylinderGeometry(5.1, 5.4, 3.6, 32),
      mats.stainlessMachined
    );
    shutterButtonCap.position.y = 2.2;
    shutterPod.add(shutterButtonCap);

    shutterDialsGroup.add(shutterPod);

    // Front Knurled Index-Finger Command Dial protruding proudly beneath the shutter button!
    const frontDial = createKnurledDial(8.4, 4.2, 28, mats.bodyMgShell, mats.stainlessMachined);
    frontDial.rotation.x = THREE.MathUtils.degToRad(24);
    frontDial.position.set(-0.5, -1.0, 29.8);
    shutterDialsGroup.add(frontDial);
    frontDialMesh = frontDial;

    // Crimson Anodized Dedicated Movie REC Button perched cleanly behind shutter button
    const recCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(3.9, 4.2, 1.8, 24),
      mats.matteBlackAnodized
    );
    recCollar.position.set(7.2, 7.6, -1.0);
    shutterDialsGroup.add(recCollar);

    const recBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(3.0, 3.0, 2.2, 24),
      mats.bodyRecRed
    );
    recBtn.position.set(7.2, 8.4, -1.0);
    shutterDialsGroup.add(recBtn);

    // Dedicated C1 / ISO quick tactile button beside REC
    const c1Btn = new THREE.Mesh(
      new THREE.CylinderGeometry(2.8, 3.0, 2.0, 22),
      mats.matteBlackAnodized
    );
    c1Btn.position.set(14.5, 7.4, -2.5);
    shutterDialsGroup.add(c1Btn);

    // Rear Knurled Thumb Command Dial embedded at upper-rear right shoulder (protruding cleanly toward -Z!)
    const rearDial = createKnurledDial(8.8, 4.2, 30, mats.bodyMgShell, mats.stainlessMachined);
    rearDial.position.set(1.5, 4.5, -36.5);
    shutterDialsGroup.add(rearDial);
    rearDialMesh = rearDial;
  }
  parts.push(
    finalizeBodyPart(
      'body-shutter-dials',
      4,
      '#dc2626',
      shutterDialsGroup,
      new THREE.Vector3(-54.5, 31.0, 9.0),
      new THREE.Vector3(-34, 48, 22),
      new THREE.Vector3(-72, 114, 28),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B05: Center-Lock Mode Dial, Left Dual-Deck Drive/AF Dial & Top Status Sub-OLED
  // =========================================================================
  const topDialsGroup = new THREE.Group();
  {
    // 1. Right-Shoulder Center-Lock Exposure Compensation / Mode Dial (x = -33.5, z = -12.0)
    const modeDialGroup = new THREE.Group();
    modeDialGroup.position.set(-33.5, 2.5, -13.0);

    const modeDial = createKnurledDial(9.2, 6.2, 32, mats.bodyMgShell, mats.stainlessMachined);
    modeDialGroup.add(modeDial);

    // Center push-lock stainless release button
    const modeLock = new THREE.Mesh(
      new THREE.CylinderGeometry(3.4, 3.6, 2.4, 24),
      mats.stainlessMachined
    );
    modeLock.position.y = 3.8;
    modeDialGroup.add(modeLock);

    // Photo / Movie / S&Q lower sub-collar lever beneath mode dial
    const subCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(10.6, 10.8, 2.2, 32),
      mats.matteBlackAnodized
    );
    subCollar.position.y = -3.8;
    modeDialGroup.add(subCollar);

    topDialsGroup.add(modeDialGroup);

    // 2. Top-Shoulder Reflective/Emissive Graphical Status Sub-OLED (x = -35.0, z = +7.5) — STRICTLY ZERO TEXT!
    const subOledBezel = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(23.6, 16.4, 2.4), 2.2, 0.2, 0.2, 16).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    subOledBezel.position.set(-35.0, -1.0, 8.0);
    topDialsGroup.add(subOledBezel);

    const subOledScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(20.6, 13.4),
      mats.bodyTopSubOled
    );
    subOledScreen.rotation.x = -Math.PI / 2;
    subOledScreen.position.set(-35.0, 0.25, 8.0);
    subOledScreen.userData.noEdges = true;
    topDialsGroup.add(subOledScreen);

    // 3. Left-Shoulder (+X) Dual-Deck Lockable Drive-Mode & AF-Mode Dial Stack (x = +38.5, z = -4.0)
    const leftDialGroup = new THREE.Group();
    leftDialGroup.position.set(38.5, 2.0, -4.0);

    // Lower Focus-Mode ring deck
    const lowerDeck = createKnurledDial(11.6, 4.2, 36, mats.matteBlackAnodized, mats.stainlessMachined);
    lowerDeck.position.y = -2.2;
    leftDialGroup.add(lowerDeck);

    // Upper Drive-Rate / Burst-Speed dial deck
    const upperDeck = createKnurledDial(9.4, 5.4, 30, mats.bodyMgShell, mats.stainlessMachined);
    upperDeck.position.y = 2.6;
    leftDialGroup.add(upperDeck);

    // Center lock push pin
    const leftLock = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.4, 2.2, 22),
      mats.stainlessMachined
    );
    leftLock.position.y = 5.8;
    leftDialGroup.add(leftLock);

    // Red visual alignment pip on deck shoulder (zero text)
    const indexPip = new THREE.Mesh(new THREE.SphereGeometry(0.85, 12, 12), mats.bodyRecRed);
    indexPip.position.set(0, -3.2, 12.2);
    indexPip.userData.noEdges = true;
    leftDialGroup.add(indexPip);

    topDialsGroup.add(leftDialGroup);
  }
  parts.push(
    finalizeBodyPart(
      'body-top-dials',
      5,
      '#0ea5e9',
      topDialsGroup,
      new THREE.Vector3(0, 38.8, -2.0),
      new THREE.Vector3(0, 62, 0),
      new THREE.Vector3(0, 132, 6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B06: 21-Pin Digital Audio Multi-Interface Hot Shoe (Crowning EVF Pentaprism!)
  // =========================================================================
  const hotshoeGroup = new THREE.Group();
  {
    // Base stainless steel mounting plate bolted into EVF magnesium roof
    const basePlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(22.4, 23.0, 1.8), 1.6, 0.14, 0.14, 14).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    hotshoeGroup.add(basePlate);

    // Left & Right C-channel flash foot retaining rails (+X / -X)
    for (const sx of [-1, 1]) {
      const sideWall = new THREE.Mesh(new THREE.BoxGeometry(2.6, 4.2, 21.6), mats.mountStainlessFlange);
      sideWall.position.set(sx * 9.8, 2.6, 0);
      hotshoeGroup.add(sideWall);

      const topLip = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.4, 21.6), mats.mountStainlessFlange);
      topLip.position.set(sx * 8.4, 4.6, 0);
      hotshoeGroup.add(topLip);
    }

    // Center X-sync brass contact pad (B19 Leaf Spring Plate mounts directly beneath rails!)
    const xPad = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 1.9, 0.8, 16),
      mats.goldPlating
    );
    xPad.position.set(0, 1.0, -2.5);
    hotshoeGroup.add(xPad);

    // Front 21-Pin Digital Audio & Smart Flash Micro-Connector Block (+Z front of hot shoe!)
    const pinHousing = new THREE.Mesh(
      new THREE.BoxGeometry(15.2, 3.6, 3.8),
      mats.mountPpsInsulator
    );
    pinHousing.position.set(0, 2.4, 9.2);
    hotshoeGroup.add(pinHousing);

    // 21 Individual micro gold contact pins visible along the front digital bus!
    for (let i = 0; i < 21; i++) {
      const px = -6.5 + (i / 20) * 13.0;
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.6, 1.4), mats.goldPlating);
      pin.position.set(px, 2.4, 7.2);
      pin.userData.noEdges = true;
      hotshoeGroup.add(pin);
    }

    // 4 High-tensile mounting screws anchoring hot shoe to EVF magnesium roof
    for (const [sx, sz] of [
      [-8.5, -8.5],
      [8.5, -8.5],
      [-8.5, 8.5],
      [8.5, 8.5],
    ]) {
      const scr = createPrecisionScrew(1.1, 0.5, 2.0, mats.stainlessMachined);
      scr.rotation.x = -Math.PI / 2;
      scr.position.set(sx, 1.0, sz);
      hotshoeGroup.add(scr);
    }
  }
  parts.push(
    finalizeBodyPart(
      'body-mi-hotshoe',
      6,
      '#cbd5e1',
      hotshoeGroup,
      new THREE.Vector3(0, 57.6, -7.5),
      new THREE.Vector3(0, 72, -4),
      new THREE.Vector3(0, 152, -6),
      cp,
      0.26
    )
  );

  // =========================================================================
  // B07: Thixomolded AZ91D Magnesium Alloy Front Monocoque Shell
  // Wraps cleanly around x ∈ [-60, +54], y ∈ [-37, +37], with exact φ69.4mm circular opening for 55mm Mount!
  // =========================================================================
  const frontShellGroup = new THREE.Group();
  {
    // Main front chassis plate (width 114mm centered at x = -3.0 => spans [-60, +54], height 74mm => [-37, +37])
    const frontShape = createRoundedRectShape(114.0, 74.0, 7.5);
    // Exact circular opening at optical axis (world x = 0 => local x = +3.0, y = 0, R = 34.7 mm!)
    addCircleHoles(frontShape, [
      [3.0, 0, 34.7], // Precision clearance around M01 55mm Stainless Flange (OD 68.8 => R 34.4!)
      [42.0, -12.0, 4.4], // Lens release button pocket at world x = +39, y = -12!
    ]);

    const frontFace = new THREE.Mesh(
      extrudeCentered(frontShape, 4.2, 0.5, 0.5, 48),
      mats.bodyMgShell
    );
    frontShellGroup.add(frontFace);

    // Sculpted chamfered lens-mount collar boss strengthening the circular throat perimeter
    const mountCollar = new THREE.Shape();
    mountCollar.absarc(3.0, 0, 38.2, 0, Math.PI * 2, false);
    const mcHole = new THREE.Path();
    mcHole.absarc(3.0, 0, 34.6, 0, Math.PI * 2, true);
    mountCollar.holes.push(mcHole);
    const collarMesh = new THREE.Mesh(
      extrudeCentered(mountCollar, 3.2, 0.35, 0.35, 48),
      mats.bodyMgShell
    );
    collarMesh.position.z = 1.6;
    frontShellGroup.add(collarMesh);

    // Left-hand (+X) front leatherette palm wrap panel (between mount collar and left edge)
    const leftGripPad = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(15.5, 58.0, 3.2), 1.6, 0.25, 0.25, 16),
      mats.bodyLeatherette
    );
    leftGripPad.position.set(47.2, -1.0, 2.2);
    frontShellGroup.add(leftGripPad);

    // Left (+X) side outer magnesium return wall sealing front -> rear (open window for B11 Split I/O Doors!)
    const leftSideWallShape = createFrameShape(60.0, 72.0, 5.0, 32.0, 50.0, 3.0, -6.0, -2.0);
    const leftSideWall = new THREE.Mesh(
      extrudeCentered(leftSideWallShape, 3.0, 0.3, 0.3, 18).rotateY(Math.PI / 2),
      mats.bodyMgShell
    );
    leftSideWall.position.set(55.5, 0, -29.0);
    frontShellGroup.add(leftSideWall);

    // Right-hand (-X) front-custom Fn button nestled cleanly beside mount throat
    const frontFnBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.5, 2.8, 20).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    frontFnBtn.position.set(-36.5, -13.0, 2.6);
    frontShellGroup.add(frontFnBtn);

    // Upper AF-Assist Illuminator / Video Tally Red-Amber LED lens window (top-right front face)
    const tallyLens = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.8, 1.8, 20).rotateX(Math.PI / 2),
      mats.bodyRecRed
    );
    tallyLens.position.set(-35.5, 24.5, 2.4);
    frontShellGroup.add(tallyLens);

    // Left & Right High-Load Stainless Neck-Strap Lugs anchored directly into magnesium body flanks!
    for (const sx of [-1, 1]) {
      const lugX = sx === 1 ? 58.2 : -58.2;
      const lugZ = sx === 1 ? -14.0 : -1.2;
      const lug = new THREE.Mesh(
        new THREE.TorusGeometry(3.8, 1.05, 12, 22),
        mats.stainlessMachined
      );
      lug.rotation.y = Math.PI / 2;
      lug.position.set(lugX, 23.0, lugZ);
      frontShellGroup.add(lug);
    }
  }
  parts.push(
    finalizeBodyPart(
      'body-mg-front-shell',
      7,
      '#334155',
      frontShellGroup,
      new THREE.Vector3(-3.0, 0, 27.6),
      new THREE.Vector3(0, 0, 56),
      new THREE.Vector3(0, 0, 80), // Lands cleanly at z = +107.6 between Shutter (+92) and Mount (+124)!
      cp,
      0.22
    )
  );

  // =========================================================================
  // B08: Sculpted Magnesium Alloy Top Deck & EVF Pentaprism Roof Housing
  // Covers y = +36.8 mm shoulders + iconic EVF pentaprism dome rising cleanly to y = +57.2 mm!
  // =========================================================================
  const topDeckGroup = new THREE.Group();
  {
    // Main flat-sculpted top shoulder plate spanning x ∈ [-68, +56], z ∈ [-33, +29]
    const deckShape = createRoundedRectShape(122.0, 62.0, 7.5);
    const deckPlate = new THREE.Mesh(
      extrudeCentered(deckShape, 3.6, 0.6, 0.6, 24).rotateX(Math.PI / 2),
      mats.bodyMgShell
    );
    deckPlate.position.set(-6.0, 0, -2.0);
    topDeckGroup.add(deckPlate);

    // Iconic Flagship EVF Pentaprism-Style Hump (clean faceted architectural bridge enveloping EVF E01..E14!)
    const humpProfile = new THREE.Shape();
    humpProfile.moveTo(-33.2, 0.0); // Rear brow flush with rear chassis & EVF eyecup collar
    humpProfile.lineTo(-33.2, 19.6); // Rear EVF vertical crown
    humpProfile.lineTo(-14.0, 20.6); // Flat roof deck supporting 21-pin Hot Shoe
    humpProfile.lineTo(10.5, 20.6); // Front roof edge
    humpProfile.lineTo(22.5, 11.5); // Iconic sleek front chamfered prism nose!
    humpProfile.lineTo(24.5, 0.0); // Meets top of lens mount shoulder cleanly!
    humpProfile.closePath();

    // Hollowed outer shell walls (left flank, right flank, roof, and sloped front brow — open inside for EVF!)
    const roofPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(44.2, 44.0, 2.8), 2.6, 0.4, 0.4, 18).rotateX(Math.PI / 2),
      mats.bodyMgShell
    );
    roofPlate.position.set(0, 19.6, -11.4);
    topDeckGroup.add(roofPlate);

    // Front angled brow shield of EVF pentaprism hump
    const frontBrow = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(42.0, 18.0, 2.4), 2.6, 0.35, 0.35, 16),
      mats.bodyMgShell
    );
    frontBrow.position.set(0, 11.5, 15.2);
    frontBrow.rotation.x = THREE.MathUtils.degToRad(-42);
    topDeckGroup.add(frontBrow);

    // Left & Right chamfered EVF pentaprism cheek plates (x = ±21.4 mm, clearing EVF internal housing!)
    for (const sx of [-1, 1]) {
      const cheek = new THREE.Mesh(
        extrudeCentered(humpProfile, 2.4, 0.35, 0.35, 16).rotateY(-Math.PI / 2),
        mats.bodyMgShell
      );
      cheek.position.set(sx * 21.4, 0.0, 0.0);
      topDeckGroup.add(cheek);
    }

    // Subtle geometric crest line inlay on front pentaprism brow (strictly zero text/logos!)
    const crestBar = new THREE.Mesh(new THREE.BoxGeometry(16.0, 1.4, 0.8), mats.stainlessMachined);
    crestBar.position.set(0, 13.0, 17.5);
    crestBar.rotation.x = THREE.MathUtils.degToRad(-42);
    topDeckGroup.add(crestBar);

    // Dual Built-in Stereo Microphone acoustic grille holes on front top shoulder flanks
    for (const sx of [-1, 1]) {
      for (let k = 0; k < 3; k++) {
        const hole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.65, 0.65, 1.2, 10),
          mats.mountVelvetBaffle
        );
        hole.position.set(sx * 25.5 + k * sx * 2.1, 1.9, 17.5);
        hole.userData.noEdges = true;
        topDeckGroup.add(hole);
      }
    }

    // Focal-plane index mark symbol (circle + bar, purely geometric standard ISO mark, zero text!)
    const fpRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.35, 8, 24).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    fpRing.position.set(27.0, 1.95, 0.0); // Exactly at z = 0 sensor focal plane!
    const fpBar = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.4, 0.55), mats.stainlessMachined);
    fpBar.position.set(27.0, 1.95, 0.0);
    topDeckGroup.add(fpRing, fpBar);
  }
  parts.push(
    finalizeBodyPart(
      'body-top-deck',
      8,
      '#475569',
      topDeckGroup,
      new THREE.Vector3(0, 36.8, 0),
      new THREE.Vector3(0, 38, 0),
      new THREE.Vector3(0, 96, 2),
      cp,
      0.22
    )
  );

  // =========================================================================
  // B09: Rear Magnesium Wall, Thumb Rest, 8-Way AF Joystick & Control Wheel
  // Cleanly frames the 4-Axis Rear LCD (x=+6, y=-7, 74x50) and EVF Eyecup (x=0, y=39.5)!
  // =========================================================================
  const rearGroup = new THREE.Group();
  let afJoystickCap: THREE.Group;
  {
    // Main rear chassis surround plate (124 W centered at x = -6 => [-68, +56], 74 H => [-37, +37])
    // Recessed window cleanly frames the 4-Axis Rear LCD at world x = +6 => local x = +12!
    const rearPlateShape = createFrameShape(
      124.0,
      74.0,
      7.0,
      LCD_WIDTH + 3.2,
      LCD_HEIGHT + 3.0,
      4.2,
      LCD_CENTER_X + 6.0, // local x = +12.0 -> world x = +6.0!
      LCD_CENTER_Y // local y = -7.0 -> world y = -7.0!
    );
    const rearPlate = new THREE.Mesh(
      extrudeCentered(rearPlateShape, 3.6, 0.45, 0.45, 22),
      mats.bodyMgShell
    );
    rearGroup.add(rearPlate);

    // Sculpted Right-Hand Ergonomic Thumb Rest Ridge on -X upper flank (local x = -46 .. -60, y = +12 .. +28)
    const thumbRest = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 13.5, 4.5), 6.2, 1.0, 1.0, 18),
      mats.bodyLeatherette
    );
    thumbRest.position.set(-48.5, 20.5, -3.2);
    rearGroup.add(thumbRest);

    // Dedicated Tactile AF-ON Thumb Button right beside thumb rest!
    const afOnBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(4.2, 4.6, 2.8, 24).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    afOnBtn.position.set(-34.5, 21.0, -2.5);
    rearGroup.add(afOnBtn);

    // 8-Way Textured Flagship AF Multi-Selector Joystick (world x = -44, y = +7.5, z = -36!)
    afJoystickCap = new THREE.Group();
    afJoystickCap.position.set(-38.0, 7.5, -2.6);

    const joyStem = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 2.4, 3.4, 16).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    joyStem.position.z = -1.2;
    afJoystickCap.add(joyStem);

    const joyHead = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 3.6, 2.2, 24).rotateX(Math.PI / 2),
      mats.lensRubberGrip
    );
    joyHead.position.z = -2.8;
    afJoystickCap.add(joyHead);

    // Tactile micro-nub grip ring on joystick cap
    const joyRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.45, 8, 20),
      mats.stainlessMachined
    );
    joyRing.position.z = -3.9;
    afJoystickCap.add(joyRing);
    rearGroup.add(afJoystickCap);

    // Rear Rotary 4-Way Control Wheel + Center Confirm Button (world x = -48, y = -13, z = -35.8!)
    const wheelRing = new THREE.Mesh(
      new THREE.TorusGeometry(9.6, 2.2, 14, 36),
      mats.bodyMgShell
    );
    wheelRing.position.set(-42.0, -13.0, -2.2);
    rearGroup.add(wheelRing);

    const wheelCenter = new THREE.Mesh(
      new THREE.CylinderGeometry(5.6, 5.8, 2.6, 26).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    wheelCenter.position.set(-42.0, -13.0, -2.2);
    rearGroup.add(wheelCenter);

    // Subtle tactile buttons: Fn, Playback, Trash & Menu (purely physical sculpted shapes, zero text!)
    const rearBtns: Array<[number, number, number]> = [
      [-51.0, 7.5, 3.2], // AEL / Custom button
      [-49.5, -28.5, 3.1], // Playback button
      [-36.5, -28.5, 3.1], // Delete / C4 button
      [34.0, 26.5, 3.4], // Upper-left Menu button (beside EVF)
      [46.5, 26.5, 3.1], // Upper-left Custom C3 button
    ];
    for (const [bx, by, br] of rearBtns) {
      const btn = new THREE.Mesh(
        new THREE.CylinderGeometry(br, br * 1.06, 2.4, 20).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      btn.position.set(bx, by, -2.2);
      rearGroup.add(btn);
    }

    // Dual-color Card Access Activity micro LED beside wheel
    const cardLed = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 12), mats.bodyRecRed);
    cardLed.position.set(-55.0, -18.5, -2.2);
    cardLed.userData.noEdges = true;
    rearGroup.add(cardLed);

    // Subtle EVF Eyecup Mounting Collar framing the upper-center EVF rear entry
    const evfRearBridge = new THREE.Mesh(
      extrudeCentered(createFrameShape(36.0, 28.0, 5.4, 29.0, 22.0, 4.0), 3.4, 0.35, 0.35, 20),
      mats.bodyMgShell
    );
    evfRearBridge.position.set(6.0, EVF_OPTICAL_Y, 0.5);
    rearGroup.add(evfRearBridge);
  }
  parts.push(
    finalizeBodyPart(
      'body-rear-controls',
      9,
      '#64748b',
      rearGroup,
      new THREE.Vector3(-6.0, 0, -33.0),
      new THREE.Vector3(0, 0, -54),
      new THREE.Vector3(-56, 0, -196),
      cp,
      0.22
    )
  );

  // =========================================================================
  // B10: Weather-Sealed Slide-Lock Dual CFexpress / SD Card Bay Door (-X flank)
  // =========================================================================
  const cardDoorGroup = new THREE.Group();
  {
    // Main sculpted outer door clad in continuous pebble leatherette
    const doorOuter = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 46.0, 3.4), 2.6, 0.35, 0.35, 18).rotateY(Math.PI / 2),
      mats.bodyLeatherette
    );
    cardDoorGroup.add(doorOuter);

    // Inner CNC magnesium stiffening plate & EPDM perimeter waterproof gasket
    const doorInner = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.5, 43.0, 2.6), 1.0, 0.12, 0.12, 16).rotateY(Math.PI / 2),
      mats.magnesiumCast
    );
    doorInner.position.x = 1.6;
    cardDoorGroup.add(doorInner);

    const doorSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(22.4, 44.2, 2.8, 19.6, 41.4, 2.2), 1.1, 0.08, 0.08, 16).rotateY(Math.PI / 2),
      mats.epdmGasket
    );
    doorSeal.position.x = 2.0;
    cardDoorGroup.add(doorSeal);

    // Slide-lock tactile switch knob on outer face
    const lockSlider = new THREE.Mesh(new THREE.BoxGeometry(1.8, 11.0, 5.2), mats.stainlessMachined);
    lockSlider.position.set(-1.6, 12.0, 4.0);
    cardDoorGroup.add(lockSlider);

    // Stainless hinge barrel along rear edge (-Z)
    const hingePin = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 38.0, 14),
      mats.stainlessMachined
    );
    hingePin.position.set(1.8, 0, -11.4);
    cardDoorGroup.add(hingePin);
  }
  parts.push(
    finalizeBodyPart(
      'body-card-door',
      10,
      '#1e293b',
      cardDoorGroup,
      new THREE.Vector3(-70.8, -5.0, -13.5),
      new THREE.Vector3(-62, 0, -18),
      new THREE.Vector3(-140, 0, -32),
      cp,
      0.22
    )
  );

  // =========================================================================
  // B11: Split 3-Door Weather-Sealed I/O Port Covers (+X photographer's left)
  // Covers Mainboard Audio / HDMI + USB-C / 2.5GbE LAN jacks cleanly!
  // =========================================================================
  const ioDoorsGroup = new THREE.Group();
  {
    const doorSpecs: Array<{ y: number; h: number; z: number; w: number }> = [
      { y: 15.5, h: 14.5, z: -2.0, w: 24.0 }, // Upper Audio (Mic + Headphone) door
      { y: -1.5, h: 16.5, z: -2.0, w: 26.0 }, // Middle Full-Size HDMI + USB-C PD door
      { y: -19.5, h: 15.5, z: -2.0, w: 24.0 }, // Lower 2.5GbE LAN / Sync Terminal door
    ];

    for (const d of doorSpecs) {
      const panel = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(d.w, d.h, 2.2), 2.4, 0.25, 0.25, 16).rotateY(Math.PI / 2),
        mats.bodyMgShell
      );
      panel.position.set(0, d.y, d.z);
      ioDoorsGroup.add(panel);

      // Inner EPDM waterproof seal plug ring
      const seal = new THREE.Mesh(
        extrudeCentered(createFrameShape(d.w - 2.4, d.h - 2.4, 1.8, d.w - 5.2, d.h - 5.2, 1.2), 1.4, 0.08, 0.08, 14).rotateY(Math.PI / 2),
        mats.epdmGasket
      );
      seal.position.set(-1.6, d.y, d.z);
      ioDoorsGroup.add(seal);

      // Subtle tactile fingernail pull ridge at rear edge
      const pull = new THREE.Mesh(new THREE.BoxGeometry(1.1, d.h * 0.52, 2.2), mats.lensRubberGrip);
      pull.position.set(1.3, d.y, d.z - d.w * 0.4);
      ioDoorsGroup.add(pull);
    }

    // Stainless vertical hinge spine anchoring all 3 split doors cleanly
    const spine = new THREE.Mesh(
      new THREE.CylinderGeometry(1.35, 1.35, 52.0, 14),
      mats.stainlessMachined
    );
    spine.position.set(-1.2, -2.0, 11.2);
    ioDoorsGroup.add(spine);
  }
  parts.push(
    finalizeBodyPart(
      'body-io-doors',
      11,
      '#475569',
      ioDoorsGroup,
      new THREE.Vector3(56.5, -2.0, -7.0),
      new THREE.Vector3(56, 0, -8),
      new THREE.Vector3(98, 0, -14),
      cp,
      0.22
    )
  );

  // =========================================================================
  // B12: Magnesium Baseplate & Optical-Axis Stainless 1/4-20 UNC Tripod Socket
  // =========================================================================
  const baseplateGroup = new THREE.Group();
  {
    // Main baseplate floor spanning x ∈ [-68, +56], z ∈ [-33, +29]
    // Circular optical-axis tripod mount bore at world x = 0 => local x = +6.0!
    const baseShape = createRoundedRectShape(124.0, 62.0, 7.2);
    const baseGeo = extrudeCentered(baseShape, 3.4, 0.45, 0.45, 22);
    baseGeo.rotateX(Math.PI / 2);
    const basePlate = new THREE.Mesh(baseGeo, mats.bodyMgShell);
    baseplateGroup.add(basePlate);

    // Forward baseplate tongue extending under the deep -X ergonomic grip!
    const gripTongue = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 18.0, 6.5), 3.4, 0.45, 0.45, 18).rotateX(Math.PI / 2),
      mats.bodyMgShell
    );
    gripTongue.position.set(-50.0, 0, 31.0);
    baseplateGroup.add(gripTongue);

    // Gleaming High-Load Stainless Steel 1/4-20 UNC Tripod Load Socket centered EXACTLY on Optical Axis (world x=0, z=0)!
    const tripodBoss = new THREE.Mesh(
      new THREE.CylinderGeometry(9.2, 9.6, 4.4, 32),
      mats.mountStainlessFlange
    );
    tripodBoss.position.set(6.0, 0.2, 1.0);
    baseplateGroup.add(tripodBoss);

    // Threaded inner bore recess
    const threadHole = new THREE.Mesh(
      new THREE.CylinderGeometry(3.4, 3.4, 4.8, 22),
      mats.mountVelvetBaffle
    );
    threadHole.position.set(6.0, 0.1, 1.0);
    baseplateGroup.add(threadHole);

    // Anti-twist video alignment pin hole (+Z ahead of tripod socket)
    const videoPinHole = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 1.8, 4.0, 16),
      mats.mountVelvetBaffle
    );
    videoPinHole.position.set(6.0, -0.1, 13.5);
    baseplateGroup.add(videoPinHole);

    // Anti-slip rubber tripod contact pad ring framing the tripod socket
    const tripodPad = new THREE.Mesh(
      extrudeCentered(createFrameShape(34.0, 34.0, 4.0, 21.0, 21.0, 10.0), 0.7, 0.08, 0.08, 20).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    tripodPad.position.set(6.0, -1.9, 2.0);
    baseplateGroup.add(tripodPad);

    // 6 Stainless bottom perimeter assembly screws
    for (const [sx, sz] of [
      [-54, -24],
      [-10, -24],
      [48, -24],
      [-54, 24],
      [-10, 24],
      [48, 24],
    ]) {
      const scr = createPrecisionScrew(1.2, 0.5, 2.0, mats.stainlessMachined);
      scr.rotation.x = Math.PI / 2;
      scr.position.set(sx, -1.8, sz);
      baseplateGroup.add(scr);
    }
  }
  parts.push(
    finalizeBodyPart(
      'body-baseplate-tripod',
      12,
      '#334155',
      baseplateGroup,
      new THREE.Vector3(-6.0, -37.2, -1.0),
      new THREE.Vector3(0, -48, 0),
      new THREE.Vector3(0, -88, 0),
      cp,
      0.22
    )
  );

  // =========================================================================
  // B13: Spring-Loaded Battery Retention Claw, Torsion Spring & Slide-Lock Latch
  // =========================================================================
  const battEjectGroup = new THREE.Group();
  {
    // Machined stainless slide-lock carrier bracket seated at battery bay mouth
    const bracket = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 22.0, 2.2), 1.4, 0.1, 0.1, 14).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    battEjectGroup.add(bracket);

    // Signature Blue POM Pivoting Retention Claw (auto-locks battery against drop!)
    const clawArm = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.8, 12.5), mats.mountThreadLockBlue);
    clawArm.position.set(-4.2, 1.8, 3.2);
    battEjectGroup.add(clawArm);

    // 45° cam-chamfer nose lip that deflects on battery insertion
    const clawNose = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.2, 3.4), mats.mountThreadLockBlue);
    clawNose.position.set(-1.0, 2.2, 8.2);
    clawNose.rotation.z = -0.55;
    battEjectGroup.add(clawNose);

    // Stainless pivot pin + helical torsion return spring
    const pivotPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 5.4, 14),
      mats.stainlessMachined
    );
    pivotPin.position.set(-5.8, 1.4, -2.0);
    battEjectGroup.add(pivotPin);

    const torsionCoil = new THREE.Mesh(
      createHelicalSpringGeometry(1.65, 2.8, 4, 0.24).rotateX(Math.PI / 2),
      mats.mountSpringSteel
    );
    torsionCoil.position.set(-5.8, 1.6, -2.0);
    torsionCoil.userData.noEdges = true;
    battEjectGroup.add(torsionCoil);

    // Bottom hatch dual-stage stainless slide-lock bar + compression return spring
    const slideBar = new THREE.Mesh(new THREE.BoxGeometry(12.8, 1.6, 4.2), mats.matteBlackAnodized);
    slideBar.position.set(1.5, -1.6, -6.5);
    battEjectGroup.add(slideBar);

    const slideSpring = new THREE.Mesh(
      createHelicalSpringGeometry(0.9, 5.2, 6, 0.18).rotateY(Math.PI / 2),
      mats.brassGear
    );
    slideSpring.position.set(-5.8, -1.6, -6.5);
    slideSpring.userData.noEdges = true;
    battEjectGroup.add(slideSpring);
  }
  parts.push(
    finalizeBodyPart(
      'body-battery-ejector',
      13,
      '#2563eb',
      battEjectGroup,
      new THREE.Vector3(-54.5, -31.8, 1.5),
      new THREE.Vector3(-68, -32, -22),
      new THREE.Vector3(-118, -44, -24),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B14: High-Current 6A 4-Pin Gold Twin-Contact Terminal Block & Power FPC
  // =========================================================================
  const battTermGroup = new THREE.Group();
  {
    // Heat-resistant PPS insulated terminal header block seated at battery bay ceiling
    const header = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(21.4, 34.0, 2.6), 3.0, 0.14, 0.14, 16).rotateX(Math.PI / 2),
      mats.mountPpsInsulator
    );
    battTermGroup.add(header);

    // 4 Redundant Twin-Prong Gold-Plated Phosphor-Bronze High-Current Leaf Springs (+V / -GND / NTC / BMS)
    for (let i = 0; i < 4; i++) {
      const tz = -9.0 + i * 6.0;
      for (const prongOff of [-0.65, 0.65]) {
        const leaf = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.8, 0.55), mats.goldPlating);
        leaf.position.set(4.2, -2.6, tz + prongOff);
        battTermGroup.add(leaf);
      }
      // Top solder lug tab emerging into heavy-copper busbar
      const lug = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 2.2), mats.goldPlating);
      lug.position.set(5.2, 1.8, tz);
      battTermGroup.add(lug);
    }

    // Ceiling helical battery-ejection push spring + POM plunger cap
    const ejectCoil = new THREE.Mesh(
      createHelicalSpringGeometry(2.3, 6.2, 5, 0.36).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    ejectCoil.position.set(-5.2, -4.4, 0);
    ejectCoil.userData.noEdges = true;
    battTermGroup.add(ejectCoil);

    const plungerCap = new THREE.Mesh(
      new THREE.CylinderGeometry(2.8, 2.8, 1.1, 18),
      mats.pomGear
    );
    plungerCap.position.set(-5.2, -7.6, 0);
    battTermGroup.add(plungerCap);

    // Heavy-Copper 2oz Polyimide Power-Delivery Busbar FPC routing +X toward Mainboard PMIC
    const pwrBus = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.65, 18.0), mats.polyimideFpc);
    pwrBus.position.set(13.8, 1.4, -3.5);
    battTermGroup.add(pwrBus);

    const cuTrace = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.85, 5.2), mats.copperHeatSpreader);
    cuTrace.position.set(13.8, 1.45, -3.5);
    battTermGroup.add(cuTrace);

    const b2bPlug = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.5, 12.0), mats.zifIvoryPlastic);
    b2bPlug.position.set(18.6, 1.1, -3.5);
    battTermGroup.add(b2bPlug);
  }
  parts.push(
    finalizeBodyPart(
      'body-battery-terminals',
      14,
      '#eab308',
      battTermGroup,
      new THREE.Vector3(-54.5, 19.6, 1.5),
      new THREE.Vector3(-54, 20, 18),
      new THREE.Vector3(-102, 24, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B15: Two-Stage Stainless Snap-Dome Shutter Switch & Coaxial Power Wiper
  // =========================================================================
  const shutterSwitchGroup = new THREE.Group();
  const shutterPlunger = new THREE.Mesh(
    new THREE.CylinderGeometry(1.4, 1.4, 2.6, 18),
    mats.stainlessMachined
  );
  {
    const tiltedPod = new THREE.Group();
    tiltedPod.rotation.x = THREE.MathUtils.degToRad(24);

    // Precision circular switch carrier PCB + concentric gold S1/S2 contact rings
    const swPcb = new THREE.Mesh(
      new THREE.CylinderGeometry(7.4, 7.4, 1.1, 28),
      mats.hdiMainboardPcb
    );
    tiltedPod.add(swPcb);

    const outerGoldRing = new THREE.Mesh(
      new THREE.TorusGeometry(5.8, 0.42, 8, 28).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    outerGoldRing.position.y = 0.65;
    outerGoldRing.userData.noEdges = true;
    tiltedPod.add(outerGoldRing);

    // Lower Stage-2 Full-Press Stainless Snap Dome (2.8 N crisp actuation)
    const domeS2 = new THREE.Mesh(
      new THREE.SphereGeometry(4.1, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.42),
      mats.mountSpringSteel
    );
    domeS2.position.y = -0.35;
    domeS2.userData.noEdges = true;
    tiltedPod.add(domeS2);

    // Upper Stage-1 Half-Press Gold-Stainless Snap Dome (1.2 N AF-lock actuation)
    const domeS1 = new THREE.Mesh(
      new THREE.SphereGeometry(3.2, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.42),
      mats.goldPlating
    );
    domeS1.position.y = 0.85;
    domeS1.userData.noEdges = true;
    tiltedPod.add(domeS1);

    // Central stainless plunger pin driven by external shutter cap
    shutterPlunger.position.y = 3.2;
    tiltedPod.add(shutterPlunger);

    // Coaxial Power-Ring Phosphor-Bronze Rotary Wiper Arc & Waterproof EPDM Gland
    const wiperArc = new THREE.Mesh(
      new THREE.TorusGeometry(6.3, 0.36, 8, 20, Math.PI * 0.85).rotateX(Math.PI / 2),
      mats.brassGear
    );
    wiperArc.position.y = 1.4;
    wiperArc.userData.noEdges = true;
    tiltedPod.add(wiperArc);

    const sealRing = new THREE.Mesh(
      new THREE.TorusGeometry(5.1, 0.45, 10, 26).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    sealRing.position.y = 2.1;
    sealRing.userData.noEdges = true;
    tiltedPod.add(sealRing);

    // Kapton signal flex tail dropping toward top-deck switch PCB
    const swTail = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.3, 9.2), mats.polyimideFpc);
    swTail.position.set(1.5, -0.4, -7.8);
    tiltedPod.add(swTail);

    shutterSwitchGroup.add(tiltedPod);
  }
  parts.push(
    finalizeBodyPart(
      'body-shutter-switch',
      15,
      '#f59e0b',
      shutterSwitchGroup,
      new THREE.Vector3(-54.5, 31.8, 20.5),
      new THREE.Vector3(-34, 28, 42),
      new THREE.Vector3(-72, 74, 44),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B16: Front & Rear Command Dial Optical Slotted Encoders & Steel-Ball Detents
  // =========================================================================
  const cmdEncodersGroup = new THREE.Group();
  const frontEncoderWheel = new THREE.Group();
  const rearEncoderWheel = new THREE.Group();
  {
    const buildDialEncoderUnit = (wheelOut: THREE.Group, tiltDeg: number): THREE.Group => {
      const unit = new THREE.Group();
      unit.rotation.x = THREE.MathUtils.degToRad(tiltDeg);

      // Matte anodized encoder stator frame
      const stator = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(16.0, 15.0, 3.0), 1.8, 0.1, 0.1, 14).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      unit.add(stator);

      // Slotted Stainless Steel Optical Chopper Wheel (24 precision slots -> spins live!)
      const chopper = new THREE.Mesh(
        createSpurGearGeometry(24, 6.2, 1.0, 0.65).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      wheelOut.add(chopper);

      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 4.4, 18),
        mats.brassGear
      );
      wheelOut.add(hub);

      // Shaft EPDM weather-seal O-ring
      const shaftSeal = new THREE.Mesh(
        new THREE.TorusGeometry(2.45, 0.32, 8, 22).rotateX(Math.PI / 2),
        mats.epdmGasket
      );
      shaftSeal.position.y = 1.6;
      shaftSeal.userData.noEdges = true;
      wheelOut.add(shaftSeal);

      wheelOut.position.y = 1.5;
      unit.add(wheelOut);

      // Dual-Phase (A/B Quadrature) IR Optical Photo-Interrupter Fork straddling the wheel rim
      const fork = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.6, 4.6), mats.icEpoxy);
      fork.position.set(6.4, 1.8, 0);
      unit.add(fork);

      // Hardened Steel Detent Ball + Brass Compression Plunger Spring giving crisp tactile clicks!
      const detentBall = new THREE.Mesh(new THREE.SphereGeometry(0.95, 14, 12), mats.stainlessMachined);
      detentBall.position.set(0, 1.6, -6.4);
      detentBall.userData.noEdges = true;
      unit.add(detentBall);

      const detentSpring = new THREE.Mesh(
        createHelicalSpringGeometry(0.85, 3.8, 6, 0.16),
        mats.brassGear
      );
      detentSpring.position.set(0, 1.6, -8.6);
      detentSpring.userData.noEdges = true;
      unit.add(detentSpring);

      return unit;
    };

    // Front Command Dial Optical Encoder (tucked cleanly inside front grip shoulder)
    const frontUnit = buildDialEncoderUnit(frontEncoderWheel, 24);
    frontUnit.position.set(-0.5, -2.5, 22.0);
    cmdEncodersGroup.add(frontUnit);

    // Rear Command Dial Optical Encoder (tucked cleanly inside rear shoulder)
    const rearUnit = buildDialEncoderUnit(rearEncoderWheel, 0);
    rearUnit.position.set(1.5, 2.0, -25.0);
    cmdEncodersGroup.add(rearUnit);

    // Connecting amber polyimide encoder bus harness linking front & rear encoders
    const harness = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.35, 44.0), mats.polyimideFpc);
    harness.position.set(1.5, -0.5, -1.5);
    cmdEncodersGroup.add(harness);
  }
  parts.push(
    finalizeBodyPart(
      'body-command-encoders',
      16,
      '#0284c7',
      cmdEncodersGroup,
      new THREE.Vector3(-54.5, 25.8, 5.5),
      new THREE.Vector3(-68, 40, 12),
      new THREE.Vector3(-118, 88, 12),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B17: Center-Push Mode Dial Lock-Pin Ratchet & Left Dual-Deck Planetary Shaft
  // =========================================================================
  const modeRatchetGroup = new THREE.Group();
  {
    // 1. Right-Shoulder Center-Lock Mode Dial Ratchet Assembly (local x = -33.5, z = -6.5)
    const rightLock = new THREE.Group();
    rightLock.position.set(-33.5, 0, -6.5);

    const ratchetGear = new THREE.Mesh(
      createSpurGearGeometry(20, 7.6, 2.4, 0.85).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    rightLock.add(ratchetGear);

    // Center push-lock vertical plunger shaft + helical return spring
    const lockPin = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 8.2, 16),
      mats.brassGear
    );
    lockPin.position.y = 1.6;
    rightLock.add(lockPin);

    const lockSpring = new THREE.Mesh(
      createHelicalSpringGeometry(2.1, 4.2, 5, 0.24).rotateX(Math.PI / 2),
      mats.mountSpringSteel
    );
    lockSpring.position.y = -0.8;
    lockSpring.userData.noEdges = true;
    rightLock.add(lockSpring);

    // Spring-biased stainless ratchet locking pawl tooth
    const pawl = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.8, 2.4), mats.mountSpringSteel);
    pawl.position.set(8.6, 0.2, 0);
    rightLock.add(pawl);

    // Twin stainless detent balls seated at 180°
    for (const sz of [-6.8, 6.8]) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.95, 12, 10), mats.stainlessMachined);
      b.position.set(0, -1.6, sz);
      b.userData.noEdges = true;
      rightLock.add(b);
    }
    modeRatchetGroup.add(rightLock);

    // 2. Left-Shoulder Dual-Deck Drive/AF Concentric Hollow Shaft & Planetary Cam Plate (local x = +38.5, z = +2.5)
    const leftDual = new THREE.Group();
    leftDual.position.set(38.5, 0, 2.5);

    // Lower deck hollow outer planetary cam gear (controls AF mode independently!)
    const outerCamGear = new THREE.Mesh(
      createSpurGearGeometry(24, 9.2, 2.2, 0.8).rotateX(Math.PI / 2),
      mats.pomGear
    );
    outerCamGear.position.y = -1.2;
    leftDual.add(outerCamGear);

    // Hollow outer brass sleeve shaft
    const hollowOuterShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(3.4, 3.4, 5.2, 22),
      mats.brassGear
    );
    hollowOuterShaft.position.y = 0.6;
    leftDual.add(hollowOuterShaft);

    // Concentric solid stainless inner shaft + upper ratchet gear (controls Drive speed independently!)
    const innerSolidShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 8.8, 18),
      mats.stainlessMachined
    );
    innerSolidShaft.position.y = 1.6;
    leftDual.add(innerSolidShaft);

    const upperRatchet = new THREE.Mesh(
      createSpurGearGeometry(16, 6.2, 1.8, 0.75).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    upperRatchet.position.y = 1.8;
    leftDual.add(upperRatchet);

    // Concentric lock return spring
    const leftSpring = new THREE.Mesh(
      createHelicalSpringGeometry(2.2, 3.6, 5, 0.22).rotateX(Math.PI / 2),
      mats.mountSpringSteel
    );
    leftSpring.position.y = -2.2;
    leftSpring.userData.noEdges = true;
    leftDual.add(leftSpring);

    modeRatchetGroup.add(leftDual);
  }
  parts.push(
    finalizeBodyPart(
      'body-mode-lock-ratchet',
      17,
      '#d97706',
      modeRatchetGroup,
      new THREE.Vector3(0, 32.8, -6.5),
      new THREE.Vector3(0, 48, -16),
      new THREE.Vector3(0, 112, -16),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B18: Top-Deck U-Shaped Rigid-Flex Control Sub-PCB & Gray-Code Wiper Pads
  //      (Clears central EVF barrel completely with authentic horseshoe U-bridge!)
  // =========================================================================
  const topFpcGroup = new THREE.Group();
  {
    // U-shaped horseshoe rigid-flex harness wrapping neatly in front of EVF barrel (z = +13..+22)
    const rightWing = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.0, 40.0, 3.2), 0.7, 0.06, 0.06, 16).rotateX(Math.PI / 2),
      mats.hdiMainboardPcb
    );
    rightWing.position.set(-34.0, 0, -4.0);
    topFpcGroup.add(rightWing);

    const leftWing = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 34.0, 3.0), 0.7, 0.06, 0.06, 16).rotateX(Math.PI / 2),
      mats.hdiMainboardPcb
    );
    leftWing.position.set(42.5, 0, -6.0);
    topFpcGroup.add(leftWing);

    // Flexible polyimide front arch ribbon bridging right & left shoulder wings in front of EVF
    const frontBridge = new THREE.Mesh(new THREE.BoxGeometry(76.0, 0.32, 7.6), mats.polyimideFpc);
    frontBridge.position.set(4.5, 0.1, 14.5);
    topFpcGroup.add(frontBridge);

    // Twin Concentric Gold Gray-Code Absolute Rotary Wiper Track Rings (Mode Dial & Drive Dial!)
    for (const [wx, wz, r] of [
      [-27.5, -17.0, 7.2],
      [44.5, -8.0, 8.2],
    ]) {
      for (const frac of [0.55, 0.78, 1.0]) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(r * frac, 0.35, 8, 28).rotateX(Math.PI / 2),
          mats.goldPlating
        );
        ring.position.set(wx, 0.45, wz);
        ring.userData.noEdges = true;
        topFpcGroup.add(ring);
      }
    }

    // REC & C1/ISO Stainless Metal-Dome Tactile Switches + Sub-OLED ZIF Ribbon Header
    for (const [sx, sz] of [
      [-41.5, 4.0],
      [-34.0, 2.5],
    ]) {
      const dome = new THREE.Mesh(
        new THREE.CylinderGeometry(2.3, 2.6, 0.7, 18),
        mats.stainlessMachined
      );
      dome.position.set(sx, 0.65, sz);
      topFpcGroup.add(dome);
    }

    const oledZif = new THREE.Mesh(new THREE.BoxGeometry(11.0, 1.1, 2.6), mats.zifIvoryPlastic);
    oledZif.position.set(-29.0, 0.65, 9.5);
    topFpcGroup.add(oledZif);

    // ESD TVS protection IC + downward drop tail to Mainboard
    const esdIc = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.9, 4.2), mats.icEpoxy);
    esdIc.position.set(-24.0, 0.65, -2.0);
    topFpcGroup.add(esdIc);
  }
  parts.push(
    finalizeBodyPart(
      'body-top-switch-fpc',
      18,
      '#059669',
      topFpcGroup,
      new THREE.Vector3(-6.0, 34.0, 4.0),
      new THREE.Vector3(-6, 22, 16),
      new THREE.Vector3(-6, 76, 16),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B19: Hot-Shoe Stainless Leaf-Spring Retention Plate, Rain Seal & 21-Pin FPC
  // =========================================================================
  const hotshoeSpringGroup = new THREE.Group();
  {
    // Stamped SUS301 stainless steel dual-cantilever leaf-spring grounding & retention plate
    const springFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(18.6, 19.6, 1.4, 12.0, 13.0, 1.0), 0.45, 0.04, 0.04, 14).rotateX(Math.PI / 2),
      mats.mountSpringSteel
    );
    hotshoeSpringGroup.add(springFrame);

    // Left & right arched cantilever leaf springs pressing flash foot upward with 12 N preload!
    for (const sx of [-5.2, 5.2]) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.55, 13.4), mats.mountSpringSteel);
      leaf.position.set(sx, 0.72, -1.2);
      leaf.rotation.x = 0.06;
      hotshoeSpringGroup.add(leaf);

      const archTip = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.5, 3.2), mats.goldPlating);
      archTip.position.set(sx, 1.0, 4.8);
      hotshoeSpringGroup.add(archTip);
    }

    // Molded Silicone Perimeter Rain-Seal Skirt sealing EVF pentaprism roof pass-through
    const rainSkirt = new THREE.Mesh(
      extrudeCentered(createFrameShape(21.4, 22.0, 2.0, 17.8, 18.4, 1.4), 1.1, 0.08, 0.08, 16).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    rainSkirt.position.y = -0.85;
    hotshoeSpringGroup.add(rainSkirt);

    // 21-Pin Digital Audio Micro-Connector Rear Tail & Black EMI-Shielded Polyimide FPC
    const fpcBridge = new THREE.Mesh(new THREE.BoxGeometry(12.4, 0.3, 6.2), mats.polyimideFpc);
    fpcBridge.position.set(0, -1.2, 10.6);
    hotshoeSpringGroup.add(fpcBridge);

    const fpcDrop = new THREE.Mesh(new THREE.BoxGeometry(10.6, 8.2, 0.35), mats.emiShieldFilm);
    fpcDrop.position.set(0, -5.2, 13.5);
    hotshoeSpringGroup.add(fpcDrop);

    const goldEnd = new THREE.Mesh(new THREE.BoxGeometry(10.2, 1.8, 0.4), mats.goldPlating);
    goldEnd.position.set(0, -9.2, 13.5);
    hotshoeSpringGroup.add(goldEnd);
  }
  parts.push(
    finalizeBodyPart(
      'body-hotshoe-springs',
      19,
      '#94a3b8',
      hotshoeSpringGroup,
      new THREE.Vector3(0, 57.2, -7.5),
      new THREE.Vector3(0, 56, -4),
      new THREE.Vector3(0, 134, -6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B20: Dual CFexpress / SD Push-Push "Heart-Cam" Card Ejector Rails & Switches
  // =========================================================================
  const cardEjectorGroup = new THREE.Group();
  {
    // Twin stacked push-push mechanical ejector modules (Upper Slot 1 + Lower Slot 2)
    for (const [sy, accentMat] of [
      [10.2, mats.brassGear],
      [-10.2, mats.copperHeatSpreader],
    ] as Array<[number, THREE.Material]>) {
      const slotUnit = new THREE.Group();
      slotUnit.position.set(0, sy, 0);

      // Precision stamped stainless slider cage rails
      const guideRail = new THREE.Mesh(new THREE.BoxGeometry(12.0, 16.0, 2.2), mats.stainlessMachined);
      guideRail.position.set(0, 0, -7.2);
      slotUnit.add(guideRail);

      const carrierSlide = new THREE.Mesh(new THREE.BoxGeometry(9.6, 13.8, 3.2), mats.pomGear);
      carrierSlide.position.set(1.0, 0, -3.5);
      slotUnit.add(carrierSlide);

      // Iconic Precision Brass Heart-Cam Closed-Loop Track Plate!
      const heartPlate = new THREE.Mesh(new THREE.BoxGeometry(8.2, 6.4, 1.4), accentMat);
      heartPlate.position.set(-1.5, 4.4, -0.5);
      slotUnit.add(heartPlate);

      // Recessed dark V-heart groove & stainless wire cam-follower pin riding the heart track!
      const heartV1 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.8, 0.7), mats.matteBlackAnodized);
      heartV1.position.set(-1.6, 5.2, 0.15);
      heartV1.rotation.z = 0.48;
      slotUnit.add(heartV1);

      const heartV2 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.8, 0.7), mats.matteBlackAnodized);
      heartV2.position.set(-1.6, 3.6, 0.15);
      heartV2.rotation.z = -0.48;
      slotUnit.add(heartV2);

      const followerWire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.32, 8.8, 10).rotateZ(Math.PI / 2),
        mats.mountSpringSteel
      );
      followerWire.position.set(-4.2, 4.4, 0.45);
      slotUnit.add(followerWire);

      // High-Force Push-Push Card Ejection Helical Coil Spring
      const ejectSpring = new THREE.Mesh(
        createHelicalSpringGeometry(1.5, 9.8, 8, 0.24).rotateY(Math.PI / 2),
        mats.stainlessMachined
      );
      ejectSpring.position.set(-0.2, -3.8, -1.2);
      ejectSpring.userData.noEdges = true;
      slotUnit.add(ejectSpring);

      // Gold-plated Card-Detect & Write-Protect Leaf Micro-Switch
      const detectSwitch = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 1.4), mats.goldPlating);
      detectSwitch.position.set(3.2, -6.2, -4.2);
      slotUnit.add(detectSwitch);

      cardEjectorGroup.add(slotUnit);
    }

    // Common stainless vertical chassis mounting spine joining both card ejectors
    const spine = new THREE.Mesh(new THREE.BoxGeometry(1.6, 36.0, 14.0), mats.shutterChassis);
    spine.position.set(6.4, 0, -2.5);
    cardEjectorGroup.add(spine);
  }
  parts.push(
    finalizeBodyPart(
      'body-card-ejectors',
      20,
      '#b45309',
      cardEjectorGroup,
      new THREE.Vector3(-59.5, -5.0, -14.5),
      new THREE.Vector3(-42, -6, -34),
      new THREE.Vector3(-102, -6, -42),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B21: Card Door Dual-Action Slide-Lock Catch Cam & Safety Interlock Switch
  // =========================================================================
  const cardLatchGroup = new THREE.Group();
  {
    // Vertical stainless dual-hook slide-lock striker bar mounted inside door threshold
    const camBar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 36.0, 3.6), mats.mountStainlessFlange);
    cardLatchGroup.add(camBar);

    // Twin tapered stainless lock catch hooks compressing EPDM seal uniformly by 25%
    for (const hy of [-12.0, 12.0]) {
      const hook = new THREE.Mesh(new THREE.BoxGeometry(3.4, 4.4, 3.0), mats.stainlessMachined);
      hook.position.set(-1.6, hy, 1.4);
      cardLatchGroup.add(hook);
    }

    // Slide-return tension coil spring
    const retSpring = new THREE.Mesh(
      createHelicalSpringGeometry(1.1, 8.2, 7, 0.2).rotateX(Math.PI / 2),
      mats.brassGear
    );
    retSpring.position.set(0.5, 0, 2.4);
    retSpring.userData.noEdges = true;
    cardLatchGroup.add(retSpring);

    // Rear hinge pop-open torsion spring sleeve
    const hingeTorsion = new THREE.Mesh(
      createHelicalSpringGeometry(1.7, 9.0, 6, 0.25).rotateX(Math.PI / 2),
      mats.mountSpringSteel
    );
    hingeTorsion.position.set(0.8, 0, -9.8);
    hingeTorsion.userData.noEdges = true;
    cardLatchGroup.add(hingeTorsion);

    // Ultra-Fast Door-Open Data-Safety Interlock Micro-Switch (white housing + red plunger!)
    const swBody = new THREE.Mesh(new THREE.BoxGeometry(3.2, 6.2, 4.4), mats.zifIvoryPlastic);
    swBody.position.set(1.8, -14.5, 4.2);
    cardLatchGroup.add(swBody);

    const swPlunger = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.9, 2.4, 14).rotateZ(Math.PI / 2),
      mats.bodyRecRed
    );
    swPlunger.position.set(-0.8, -14.5, 4.2);
    cardLatchGroup.add(swPlunger);
  }
  parts.push(
    finalizeBodyPart(
      'body-card-door-latch',
      21,
      '#dc2626',
      cardLatchGroup,
      new THREE.Vector3(-67.8, -5.0, -13.5),
      new THREE.Vector3(-56, 22, -26),
      new THREE.Vector3(-124, 24, -36),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B22: 8-Way AF Multi-Selector 4-Axis Gimbal Rocker & 5-Dome Tactile PCB
  // =========================================================================
  const joyGimbalGroup = new THREE.Group();
  {
    // Miniature green 5-dome tactile switch sub-PCB right behind rear wall
    const joyPcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(13.6, 13.6, 2.4), 0.9, 0.06, 0.06, 14),
      mats.hdiMainboardPcb
    );
    joyPcb.position.z = 1.4;
    joyGimbalGroup.add(joyPcb);

    // 5 Gold-Plated Micro Snap Domes (4 cardinal directions + center push confirm)
    for (const [dx, dy] of [
      [0, 0],
      [0, 4.0],
      [0, -4.0],
      [4.0, 0],
      [-4.0, 0],
    ]) {
      const dome = new THREE.Mesh(
        new THREE.CylinderGeometry(1.35, 1.55, 0.55, 16).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      dome.position.set(dx, dy, 0.72);
      joyGimbalGroup.add(dome);
    }

    // Stainless 4-Axis Cross-Gimbal Rocker Actuator Cage
    const gimbalBarH = new THREE.Mesh(new THREE.BoxGeometry(10.8, 2.2, 1.4), mats.stainlessMachined);
    gimbalBarH.position.z = -0.25;
    const gimbalBarV = new THREE.Mesh(new THREE.BoxGeometry(2.2, 10.8, 1.4), mats.stainlessMachined);
    gimbalBarV.position.z = -0.25;
    joyGimbalGroup.add(gimbalBarH, gimbalBarV);

    // Weather-sealing Silicone Bellows Ring around central actuator shaft
    const bellows = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.72, 10, 24),
      mats.epdmGasket
    );
    bellows.position.z = -1.1;
    bellows.userData.noEdges = true;
    joyGimbalGroup.add(bellows);

    // Amber Kapton tail routing inward
    const flexTail = new THREE.Mesh(new THREE.BoxGeometry(4.6, 7.2, 0.25), mats.polyimideFpc);
    flexTail.position.set(0, -9.2, 1.5);
    joyGimbalGroup.add(flexTail);
  }
  parts.push(
    finalizeBodyPart(
      'body-joystick-gimbal',
      22,
      '#10b981',
      joyGimbalGroup,
      new THREE.Vector3(-44.0, 7.5, -30.0),
      new THREE.Vector3(-34, 16, -38),
      new THREE.Vector3(-78, 18, -162),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B23: Rear Control Wheel Hollow-Center Optical Ring Encoder & 4-Way Domes
  // =========================================================================
  const rearWheelEncGroup = new THREE.Group();
  const rearWheelRotor = new THREE.Group();
  {
    // Circular emerald sub-PCB mounting 4 cardinal + 1 center snap domes
    const wheelPcb = new THREE.Mesh(
      new THREE.CylinderGeometry(11.4, 11.4, 0.85, 32).rotateX(Math.PI / 2),
      mats.hdiMainboardPcb
    );
    wheelPcb.position.z = 1.4;
    rearWheelEncGroup.add(wheelPcb);

    for (const [dx, dy] of [
      [0, 0],
      [0, 7.6],
      [0, -7.6],
      [7.6, 0],
      [-7.6, 0],
    ]) {
      const dome = new THREE.Mesh(
        new THREE.CylinderGeometry(1.7, 1.9, 0.6, 18).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      dome.position.set(dx, dy, 0.72);
      rearWheelEncGroup.add(dome);
    }

    // Hollow-Center Annular Optical Slotted Encoder Ring (36 teeth — rotates live!)
    const outerRing = new THREE.Mesh(
      createSpurGearGeometry(36, 10.6, 0.75, 0.55),
      mats.stainlessMachined
    );
    rearWheelRotor.add(outerRing);

    const brassDetentRing = new THREE.Mesh(
      new THREE.TorusGeometry(8.4, 0.52, 8, 32),
      mats.brassGear
    );
    brassDetentRing.position.z = -0.5;
    brassDetentRing.userData.noEdges = true;
    rearWheelRotor.add(brassDetentRing);

    rearWheelRotor.position.z = -0.2;
    rearWheelEncGroup.add(rearWheelRotor);

    // Twin optical photo-interrupter sensors at 10 o'clock & 2 o'clock
    for (const sx of [-8.8, 8.8]) {
      const opto = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.2, 2.2), mats.icEpoxy);
      opto.position.set(sx, 6.2, 0.2);
      rearWheelEncGroup.add(opto);
    }

    // Thin waterproof silicone dome membrane rim
    const sealRing = new THREE.Mesh(
      new THREE.TorusGeometry(11.1, 0.45, 8, 32),
      mats.epdmGasket
    );
    sealRing.position.z = -0.9;
    sealRing.userData.noEdges = true;
    rearWheelEncGroup.add(sealRing);
  }
  parts.push(
    finalizeBodyPart(
      'body-rear-wheel-encoder',
      23,
      '#6366f1',
      rearWheelEncGroup,
      new THREE.Vector3(-48.0, -13.0, -30.0),
      new THREE.Vector3(-36, -16, -38),
      new THREE.Vector3(-84, -18, -162),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B24: Left & Right Forged Stainless Neck-Strap Lug Internal Anchor Plates
  // =========================================================================
  const strapAnchorsGroup = new THREE.Group();
  {
    // Both forged anchors positioned strictly INSIDE left (+49.5) and right (-54.5) body walls!
    const anchorSpecs: Array<{ x: number; z: number; sx: number }> = [
      { x: -54.5, z: 22.0, sx: -1 }, // Right-shoulder grip corner internal anchor
      { x: 49.5, z: 13.6, sx: 1 }, // Left-shoulder side wall internal anchor
    ];
    for (const a of anchorSpecs) {
      const plateGroup = new THREE.Group();
      plateGroup.position.set(a.x, 0, a.z);

      // Thick Forged SUS304 L-shaped high-load reinforcement backplate (500 N proof load!)
      const verticalPlate = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(11.0, 17.5, 2.2), 2.2, 0.14, 0.14, 14).rotateY(Math.PI / 2),
        mats.mountStainlessFlange
      );
      plateGroup.add(verticalPlate);

      const topGusset = new THREE.Mesh(
        new THREE.BoxGeometry(6.8, 2.2, 9.6),
        mats.mountStainlessFlange
      );
      topGusset.position.set(-a.sx * 2.8, 7.2, 0);
      plateGroup.add(topGusset);

      // EPDM waterproof pass-through grommet ring backing the external eyelet
      const grommet = new THREE.Mesh(
        new THREE.TorusGeometry(2.6, 0.65, 8, 20).rotateY(Math.PI / 2),
        mats.epdmGasket
      );
      grommet.position.set(a.sx * 1.4, 0.5, 0);
      grommet.userData.noEdges = true;
      plateGroup.add(grommet);

      // 3 Triangular-pattern High-Tensile M2.0 Stainless Anchor Bolts
      for (const [by, bz] of [
        [5.2, -3.2],
        [5.2, 3.2],
        [-5.6, 0],
      ]) {
        const bolt = createPrecisionScrew(1.05, 0.5, 2.4, mats.stainlessMachined);
        bolt.rotation.y = a.sx > 0 ? -Math.PI / 2 : Math.PI / 2;
        bolt.position.set(-a.sx * 1.3, by, bz);
        plateGroup.add(bolt);
      }

      strapAnchorsGroup.add(plateGroup);
    }
  }
  parts.push(
    finalizeBodyPart(
      'body-strap-anchors',
      24,
      '#64748b',
      strapAnchorsGroup,
      new THREE.Vector3(0, 22.5, 0),
      new THREE.Vector3(0, 26, -34),
      new THREE.Vector3(0, 44, -36),
      cp,
      0.26
    )
  );

  // =========================================================================
  // B25: Waterproof Stereo MEMS Mic Chambers, Piezo Buzzer & ePTFE Breather Vent
  // =========================================================================
  const acousticGroup = new THREE.Group();
  {
    // Left & Right Vibration-Isolated Silicone Stereo MEMS Microphone Acoustic Chambers
    for (const sx of [-1, 1]) {
      const micBoot = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(11.0, 7.6, 2.0), 3.4, 0.2, 0.2, 14).rotateX(Math.PI / 2),
        mats.damperElastomer
      );
      micBoot.position.set(sx * 27.5, 0, 0);
      acousticGroup.add(micBoot);

      // White Hydrophobic Microporous ePTFE (Gore-Tex style) Acoustic Waterproof Membrane
      const ptfeMesh = new THREE.Mesh(
        new THREE.BoxGeometry(8.2, 0.4, 4.8),
        mats.ceramicAlumina
      );
      ptfeMesh.position.set(sx * 27.5, 1.85, 0);
      acousticGroup.add(ptfeMesh);

      // Gold-shielded digital MEMS microphone IC package tucked beneath boot
      const memsCan = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.2, 3.4), mats.goldPlating);
      memsCan.position.set(sx * 27.5, -1.5, 0);
      acousticGroup.add(memsCan);
    }

    // Center Brass Diaphragm Piezo Confirmation Buzzer (AF-lock beep)
    const piezoDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(5.6, 5.6, 1.2, 26),
      mats.brassGear
    );
    piezoDisc.position.set(0, -0.4, 0.6);
    acousticGroup.add(piezoDisc);

    const piezoCeramic = new THREE.Mesh(
      new THREE.CylinderGeometry(3.8, 3.8, 0.45, 22),
      mats.ceramicAlumina
    );
    piezoCeramic.position.set(0, 0.35, 0.6);
    acousticGroup.add(piezoCeramic);

    // Barometric Pressure-Equalizing ePTFE Breather Valve (right flank beside buzzer)
    const breatherHousing = new THREE.Mesh(
      new THREE.CylinderGeometry(3.0, 3.0, 1.8, 20),
      mats.matteBlackAnodized
    );
    breatherHousing.position.set(13.0, 0, -1.2);
    acousticGroup.add(breatherHousing);

    const breatherMembrane = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.1, 0.35, 20),
      mats.ceramicAlumina
    );
    breatherMembrane.position.set(13.0, 0.95, -1.2);
    acousticGroup.add(breatherMembrane);

    // Connecting slim polyimide stereo audio flex ribbon
    const micFlex = new THREE.Mesh(new THREE.BoxGeometry(58.0, 0.25, 3.2), mats.polyimideFpc);
    micFlex.position.set(0, -1.7, 0);
    acousticGroup.add(micFlex);
  }
  parts.push(
    finalizeBodyPart(
      'body-acoustic-breather',
      25,
      '#06b6d4',
      acousticGroup,
      new THREE.Vector3(0, 33.0, 17.5),
      new THREE.Vector3(0, 26, 36),
      new THREE.Vector3(0, 68, 42),
      cp,
      0.24
    )
  );

  // =========================================================================
  // B26: Full-Body 3D Molded Silicone Weather-Sealing Perimeter Gaskets
  //      (Sized strictly inset inside magnesium shell joints so ZERO protrusion
  //       when assembled, blooming into a dramatic 3D weather-seal cage exploded!)
  // =========================================================================
  const gasketsGroup = new THREE.Group();
  {
    // 1. Top-Deck Perimeter Labyrinth Weather-Seal Loop (y = +34.6, inset inside top deck)
    const topLoop = new THREE.Mesh(
      extrudeCentered(createFrameShape(115.0, 53.0, 6.2, 111.0, 49.0, 5.2), 1.4, 0.12, 0.12, 22).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    topLoop.position.set(0, 34.4, 0);
    topLoop.userData.noEdges = true;
    gasketsGroup.add(topLoop);

    // 2. Bottom Baseplate Perimeter Weather-Seal Loop (y = -34.8, inset inside baseplate)
    const botLoop = new THREE.Mesh(
      extrudeCentered(createFrameShape(115.0, 53.0, 6.2, 111.0, 49.0, 5.2), 1.4, 0.12, 0.12, 22).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    botLoop.position.set(0, -34.8, 0);
    botLoop.userData.noEdges = true;
    gasketsGroup.add(botLoop);

    // 3. Front Monocoque Perimeter Seam Seal + Circular Lens-Mount Throat O-Ring (z = +26.4 -> local +26.4)
    const frontPerimeter = new THREE.Mesh(
      extrudeCentered(createFrameShape(110.0, 71.0, 6.5, 106.4, 67.4, 5.5), 1.3, 0.1, 0.1, 22),
      mats.epdmGasket
    );
    frontPerimeter.position.set(3.0, 0, 26.8);
    frontPerimeter.userData.noEdges = true;
    gasketsGroup.add(frontPerimeter);

    // Dedicated Circular Bayonet Mount Weather-Seal O-Ring centered on Optical Axis (world x = 0 -> local +6.0)
    const mountSealRing = new THREE.Mesh(
      new THREE.TorusGeometry(35.8, 0.95, 10, 48),
      mats.epdmGasket
    );
    mountSealRing.position.set(6.0, 0, 27.0);
    mountSealRing.userData.noEdges = true;
    gasketsGroup.add(mountSealRing);

    // 4. Rear Chassis Perimeter Seam Seal (local z = -28.8 -> world z = -30.8, strictly outside LCD recess!)
    const rearPerimeter = new THREE.Mesh(
      extrudeCentered(createFrameShape(118.0, 71.2, 6.4, 114.6, 68.0, 5.4), 1.3, 0.1, 0.1, 22),
      mats.epdmGasket
    );
    rearPerimeter.position.set(0, 0, -28.8);
    rearPerimeter.userData.noEdges = true;
    gasketsGroup.add(rearPerimeter);

    // 4 Vertical Corner Seal Pillars connecting top, bottom, front & rear weather-seal loops into one 3D cage!
    for (const [cx, cz] of [
      [-55.5, -26.5],
      [55.5, -26.5],
      [-52.0, 25.0],
      [54.0, 25.0],
    ]) {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 68.0, 10),
        mats.epdmGasket
      );
      pillar.position.set(cx, 0, cz);
      pillar.userData.noEdges = true;
      gasketsGroup.add(pillar);
    }
  }
  parts.push(
    finalizeBodyPart(
      'body-chassis-gaskets',
      26,
      '#0f766e',
      gasketsGroup,
      new THREE.Vector3(-6.0, 0, -2.0),
      new THREE.Vector3(0, -26, -30),
      new THREE.Vector3(0, -56, -30),
      cp,
      0.16
    )
  );

  // =========================================================================
  // Live Ergonomic & Internal Mechanical Dynamics (Shutter Switch, Encoders, Joystick)
  // =========================================================================
  const rig: BodyDynamicRig = {
    shutterButtonCap,
    frontDialMesh,
    rearDialMesh,
    afJoystickCap,
    applyDynamics: (elapsed, physicsActive) => {
      if (!physicsActive) {
        shutterButtonCap.position.y = 2.2;
        shutterPlunger.position.y = 3.2;
        frontDialMesh.rotation.y = 0;
        rearDialMesh.rotation.y = 0;
        frontEncoderWheel.rotation.y = 0;
        rearEncoderWheel.rotation.y = 0;
        rearWheelRotor.rotation.z = 0;
        afJoystickCap.rotation.set(0, 0, 0);
        return;
      }

      // 2-stage shutter release pulse (half-press S1 dome -> full-press S2 dome!)
      const cycle = (elapsed * 0.75) % 1;
      let pressDepth = 0;
      if (cycle > 0.35 && cycle < 0.62) pressDepth = 0.65; // Half-press AF lock
      else if (cycle >= 0.62 && cycle < 0.76) pressDepth = 1.45; // Full-press shutter fire!
      shutterButtonCap.position.y = 2.2 - pressDepth;
      shutterPlunger.position.y = 3.2 - pressDepth * 0.85;

      // Synchronized external command dials & internal optical slotted encoder wheels!
      frontDialMesh.rotation.y = elapsed * 0.9;
      frontEncoderWheel.rotation.y = elapsed * 0.9;
      rearDialMesh.rotation.y = -elapsed * 0.75;
      rearEncoderWheel.rotation.y = -elapsed * 0.75;
      rearWheelRotor.rotation.z = elapsed * 0.65;

      // 8-way AF joystick orbit sweep
      afJoystickCap.rotation.x = Math.sin(elapsed * 2.1) * 0.18;
      afJoystickCap.rotation.y = Math.cos(elapsed * 1.6) * 0.18;
    },
  };

  return { parts, rig };
}
