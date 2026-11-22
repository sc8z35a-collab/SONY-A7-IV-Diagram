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
 * Build all 12 ultra-detailed CAD sub-assemblies of the 2024-2026 Flagship Mirrorless
 * Camera Body, High-Discharge 7.2V/6A Battery, Deep Leatherette Grip, 21-Pin Hot Shoe,
 * Sculpted Magnesium Monocoque Shell, Top/Rear Dials, AF Joystick, Card/I/O Doors & Tripod Baseplate.
 *
 * TRUE CAMERA HANDEDNESS (1 unit = 1 mm, optical axis = (0, 0)):
 *  - +Z = Front (Lens Mount at z = +30.6..+32.0, 50mm F1.2 Lens at z = +32.5..+138)
 *  - -Z = Rear (EVF Eyecup at y=39.5, z=-37.2; 4-Axis LCD at x=+6, y=-7, z=-28.8..-35.8)
 *  - -X = Photographer's RIGHT-HAND SIDE (Deep Grip, 7.2V Battery, Shutter, Command Dials, Card Door, Thumb Controls)
 *  - +X = Photographer's LEFT-HAND SIDE (Split I/O Doors, Left Drive/AF Dial, LCD Swivel Hinge)
 *
 * Wraps cleanly around all 68 core camera layers with ZERO mesh collision and blooms outward
 * radially in 6 directions when exploded!
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

    // Top ceiling plate with 4 Gold Twin-Contact Leaf Springs mating B01 terminals
    const ceiling = new THREE.Mesh(new THREE.BoxGeometry(24.0, 2.2, 39.2), mats.mountPpsInsulator);
    ceiling.position.set(0, 26.8, 0);
    chamberGroup.add(ceiling);

    for (let i = 0; i < 4; i++) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.4, 1.4), mats.goldPlating);
      leaf.position.set(4.5, 25.0, -9.0 + i * 6.0);
      chamberGroup.add(leaf);
    }

    // Ejection helper helical spring inside ceiling
    const ejectSpring = new THREE.Mesh(
      createHelicalSpringGeometry(2.4, 8.0, 5, 0.4).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    ejectSpring.position.set(-5.5, 23.0, 0);
    chamberGroup.add(ejectSpring);

    // Power-delivery orange heavy-current FPC strap routing +X toward Mainboard PMIC!
    const pwrFpc = new THREE.Mesh(new THREE.BoxGeometry(12.0, 14.0, 1.2), mats.polyimideFpc);
    pwrFpc.position.set(16.0, 14.0, -14.5);
    chamberGroup.add(pwrFpc);

    // Bottom waterproof slide-lock hinged battery bay door + EPDM rubber seal + blue retention latch
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

    // Blue spring-loaded battery retention catch lever
    const latch = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 8.5), mats.mountThreadLockBlue);
    latch.position.set(-9.2, -26.5, 13.5);
    chamberGroup.add(latch);
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

    // Internal dual-stage stainless metal snap-dome contact assembly (visible beneath)
    const domeBase = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 4.6, 1.8, 24), mats.goldPlating);
    domeBase.position.y = -2.0;
    shutterPod.add(domeBase);

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

    // Center X-sync brass contact pad + leaf springs
    const xPad = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 1.9, 0.8, 16),
      mats.goldPlating
    );
    xPad.position.set(0, 1.0, -2.5);
    hotshoeGroup.add(xPad);

    for (const sx of [-5.2, 5.2]) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 13.0), mats.mountSpringSteel);
      leaf.position.set(sx, 1.15, -1.5);
      hotshoeGroup.add(leaf);
    }

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
  // Live Ergonomic Interaction Dynamics (Shutter Half/Full Press, Dials, AF Joystick)
  // =========================================================================
  const rig: BodyDynamicRig = {
    shutterButtonCap,
    frontDialMesh,
    rearDialMesh,
    afJoystickCap,
    applyDynamics: (elapsed, physicsActive) => {
      if (!physicsActive) {
        shutterButtonCap.position.y = 2.2;
        frontDialMesh.rotation.y = 0;
        rearDialMesh.rotation.y = 0;
        afJoystickCap.rotation.set(0, 0, 0);
        return;
      }

      // 2-stage shutter release pulse (half-press hold -> crisp full-press release)
      const cycle = (elapsed * 0.75) % 1;
      let pressDepth = 0;
      if (cycle > 0.35 && cycle < 0.62) pressDepth = 0.65; // Half-press AF lock
      else if (cycle >= 0.62 && cycle < 0.76) pressDepth = 1.45; // Full-press shutter fire!
      shutterButtonCap.position.y = 2.2 - pressDepth;

      // Subtle precision command dial clicks & 8-way AF joystick orbit sweep
      frontDialMesh.rotation.y = elapsed * 0.9;
      rearDialMesh.rotation.y = -elapsed * 0.75;
      afJoystickCap.rotation.x = Math.sin(elapsed * 2.1) * 0.18;
      afJoystickCap.rotation.y = Math.cos(elapsed * 1.6) * 0.18;
    },
  };

  return { parts, rig };
}
