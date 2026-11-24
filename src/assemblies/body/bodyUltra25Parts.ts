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
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeBodyUltra25Part(
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
 * Phase 25B — 15 Standalone-Only Next-Gen Camera Body & Official Sony ILCE-7M4 OEM Parts (B102–B116 -> 116 total).
 * Rendered ONLY in standalone 'body' mode; omitted completely in whole-camera views (0 startup overhead).
 */
export function buildBodyUltra25Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // B102. Sony OEM Dial Steel Detent Ball, Ball Holder & SV Dial Spring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Wave-detent crown ring
    const crown = new THREE.Mesh(
      createSpurGearGeometry(16, 6.2, 1.3, 0.45).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    crown.position.y = 1.6;
    // Brass ball holder barrel (Ref.320: AM DIAL BALL HOLDER)
    const holder = new THREE.Mesh(
      new THREE.CylinderGeometry(1.75, 1.75, 4.4, 16),
      mats.brassGear
    );
    holder.position.set(5.4, -0.6, 0);
    // Mirror-finished hardened steel click ball (Ref.321: BALL, STEEL)
    const ball = new THREE.Mesh(new THREE.SphereGeometry(1.15, 16, 14), mats.mountStainlessFlange);
    ball.position.set(5.4, 1.45, 0);
    ball.userData.noEdges = true;
    // Helical SV dial preload spring (Ref.319: SV DIAL SPRING)
    const spring = new THREE.Mesh(
      createHelicalSpringGeometry(1.05, 4.2, 6, 0.2).rotateX(Math.PI / 2),
      mats.mountSpringSteel
    );
    spring.position.set(5.4, -1.6, 0);
    spring.userData.noEdges = true;
    g.add(crown, holder, ball, spring);

    parts.push(
      finalizeBodyUltra25Part(
        'body-dial-detent-ball-spring',
        102,
        '#f59e0b',
        g,
        new THREE.Vector3(-33.5, 34.2, -6.5),
        new THREE.Vector3(-76, 138, -28),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B103. Sony OEM Rear 8-Key Tactile Keycap & Dual-Color Silicone Dome Set
  // =========================================================================
  {
    const g = new THREE.Group();
    // Waterproof silicone membrane carrier sheet tucked flush inside rear shell
    const membrane = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 44.0, 2.2), 0.75, 0.05, 0.05, 10),
      mats.epdmGasket
    );
    membrane.position.z = 0.65;
    g.add(membrane);

    // 8 distinct ergonomic keycaps (AF-ON, AEL, C1/C3, MENU, Fn, Play, Delete)
    const keyCoords: Array<[number, number, number]> = [
      [-5.5, 16.5, 3.0], // AF-ON (largest!)
      [5.5, 16.5, 2.4], // AEL
      [-5.5, 7.2, 2.4], // Fn
      [5.5, 7.2, 2.2], // C3
      [-5.5, -2.5, 2.5], // MENU
      [5.5, -2.5, 2.2], // C1
      [-5.5, -14.5, 2.4], // Playback
      [5.5, -14.5, 2.4], // Delete/C4
    ];
    for (const [kx, ky, kr] of keyCoords) {
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(kr, kr * 1.06, 2.2, 16).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      cap.position.set(kx, ky, -0.55);
      const collar = new THREE.Mesh(
        new THREE.TorusGeometry(kr * 1.12, 0.35, 8, 18),
        mats.butylDamperRubber
      );
      collar.position.set(kx, ky, 0.35);
      collar.userData.noEdges = true;
      g.add(cap, collar);
    }

    parts.push(
      finalizeBodyUltra25Part(
        'body-oem-keycap-dome-set',
        103,
        '#64748b',
        g,
        new THREE.Vector3(-41.0, 2.0, -32.6),
        new THREE.Vector3(-124, 6, -134),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B104. Sony OEM Forged Stainless Strap Eyelets (EYELET G / L)
  // =========================================================================
  {
    const g = new THREE.Group();
    const buildLug = (xPos: number, dir: -1 | 1) => {
      const lug = new THREE.Group();
      lug.position.set(xPos, 0, 0);
      // Forged stainless external loop post
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 2.8, 5.4, 16).rotateZ(Math.PI / 2),
        mats.mountStainlessFlange
      );
      post.position.x = dir * 1.2;
      const eyeLoop = new THREE.Mesh(
        new THREE.TorusGeometry(2.4, 0.85, 10, 20).rotateY(Math.PI / 2),
        mats.stainlessMachined
      );
      eyeLoop.position.x = dir * 3.2;
      // Waterproof EPDM shaft O-ring
      const oRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.75, 0.42, 8, 20).rotateY(Math.PI / 2),
        mats.epdmGasket
      );
      oRing.position.x = dir * 0.2;
      oRing.userData.noEdges = true;
      // Internal forged load-spreader anchor bracket & twin bolts
      const anchor = new THREE.Mesh(new THREE.BoxGeometry(2.2, 12.5, 8.6), mats.midPlateSteel);
      anchor.position.x = -dir * 2.2;
      const bolt1 = createPrecisionScrew(1.4, 0.8, 3.2, mats.titaniumRivet);
      bolt1.rotation.z = dir * (Math.PI / 2);
      bolt1.position.set(-dir * 3.0, 4.0, 0);
      const bolt2 = createPrecisionScrew(1.4, 0.8, 3.2, mats.titaniumRivet);
      bolt2.rotation.z = dir * (Math.PI / 2);
      bolt2.position.set(-dir * 3.0, -4.0, 0);
      lug.add(post, eyeLoop, oRing, anchor, bolt1, bolt2);
      return lug;
    };
    g.add(buildLug(-64.5, -1), buildLug(54.5, 1));

    parts.push(
      finalizeBodyUltra25Part(
        'body-forged-strap-eyelets',
        104,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 18.5, 1.0),
        new THREE.Vector3(0, 118, 86),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B105. Sony OEM Molded Battery Holder Frame (BTH ASSY) & FP-2438 Flex
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded ribbed inner battery cage skeleton tucked cleanly inside grip chamber
    const cageWall = new THREE.Mesh(
      extrudeCentered(createFrameShape(21.2, 34.4, 2.6, 18.6, 31.8, 1.8), 41.0, 0.08, 0.08, 12).rotateX(Math.PI / 2),
      mats.mountPpsInsulator
    );
    // Side anti-rattle leaf tension spring
    const leafSpring = new THREE.Mesh(new THREE.BoxGeometry(0.45, 22.0, 5.6), mats.beCuSpring);
    leafSpring.position.set(9.8, 2.0, 0);
    // FP-2438 amber polyimide power/data interconnect ribbon toward mainboard
    const fp2438 = new THREE.Mesh(new THREE.BoxGeometry(22.0, 7.2, 0.3), mats.polyimideFpc);
    fp2438.position.set(19.5, 14.0, -9.5);
    const zifEnd = new THREE.Mesh(new THREE.BoxGeometry(2.8, 7.8, 0.9), mats.goldPlating);
    zifEnd.position.set(29.8, 14.0, -9.5);
    g.add(cageWall, leafSpring, fp2438, zifEnd);

    parts.push(
      finalizeBodyUltra25Part(
        'body-bth-assy-fp2438',
        105,
        '#d97706',
        g,
        new THREE.Vector3(-54.5, -5.5, 1.5),
        new THREE.Vector3(-156, -54, 48),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B106. Optical Touch AF Smart Controller (IR Optical Trackpad AF-ON)
  // =========================================================================
  {
    const g = new THREE.Group();
    const outerCap = new THREE.Mesh(
      new THREE.CylinderGeometry(4.6, 4.8, 2.2, 24).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    // Central flush IR optical micro-lens window
    const irGlass = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 0.6, 20).rotateX(Math.PI / 2),
      mats.evfIrWindowBlack
    );
    irGlass.position.z = -0.95;
    // Internal 2D optical flow sensor IC + IR emitter + flex tail
    const optPcb = new THREE.Mesh(new THREE.BoxGeometry(9.2, 9.2, 0.6), mats.sensorPcb);
    optPcb.position.z = 1.6;
    const irLed = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 0.7), mats.evfIrEmitter);
    irLed.position.set(-1.5, 0, 1.1);
    const cmosFlow = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 0.7), mats.siliconLogicLayer);
    cmosFlow.position.set(1.5, 0, 1.1);
    const flex = new THREE.Mesh(new THREE.BoxGeometry(3.4, 11.0, 0.22), mats.polyimideFpc);
    flex.position.set(0, -8.5, 1.6);
    g.add(outerCap, irGlass, optPcb, irLed, cmosFlow, flex);

    parts.push(
      finalizeBodyUltra25Part(
        'body-optical-smart-controller',
        106,
        '#8b5cf6',
        g,
        new THREE.Vector3(-43.5, 22.0, -32.8),
        new THREE.Vector3(-124, 66, -124),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B107. Built-In Multi-Constellation GNSS Ceramic Patch Antenna & LNA
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-permittivity square beige ceramic patch element (14x14x3 mm)
    const patch = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(14.0, 14.0, 1.0), 2.8, 0.08, 0.08, 10).rotateX(Math.PI / 2),
      mats.ceramicAlumina
    );
    patch.position.y = 1.2;
    // Silver resonant top electrode with chamfered circular-polarization corners
    const electrode = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.22, 11.4), mats.silverElectrode);
    electrode.position.y = 2.68;
    const feedPin = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.6, 12), mats.goldPlating);
    feedPin.position.set(1.8, 2.72, 0);
    // Ground plane PCB + LNA/SAW RF EMI shield can below
    const gndPcb = new THREE.Mesh(new THREE.BoxGeometry(17.5, 0.75, 17.5), mats.hdiMainboardPcb);
    gndPcb.position.y = -0.55;
    const lnaShield = new THREE.Mesh(new THREE.BoxGeometry(8.5, 1.6, 6.2), mats.emiShieldCan);
    lnaShield.position.set(0, -1.65, 0);
    g.add(patch, electrode, feedPin, gndPcb, lnaShield);

    parts.push(
      finalizeBodyUltra25Part(
        'body-gnss-ceramic-antenna',
        107,
        '#10b981',
        g,
        new THREE.Vector3(-16.0, 35.4, -12.0),
        new THREE.Vector3(-44, 152, -52),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B108. Pro Cinema Timecode (TC IN/OUT) Lockable Coax Port & TCXO Sync
  // =========================================================================
  {
    const g = new THREE.Group();
    const coaxBody = new THREE.Mesh(
      new THREE.CylinderGeometry(4.2, 4.2, 7.6, 20).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    const tcCollar = new THREE.Mesh(
      new THREE.TorusGeometry(4.35, 0.55, 8, 22).rotateY(Math.PI / 2),
      mats.cinnabarAnodized
    );
    tcCollar.position.x = 3.2;
    tcCollar.userData.noEdges = true;
    const centerPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.85, 5.2, 12).rotateZ(Math.PI / 2),
      mats.goldPlating
    );
    centerPin.position.x = 1.6;
    const syncPcb = new THREE.Mesh(new THREE.BoxGeometry(2.0, 12.0, 10.5), mats.hdiMainboardPcb);
    syncPcb.position.set(-4.2, 0, 0);
    const tcxo = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3.6, 3.0), mats.goldPlating);
    tcxo.position.set(-5.6, 2.5, 0);
    g.add(coaxBody, tcCollar, centerPin, syncPcb, tcxo);

    parts.push(
      finalizeBodyUltra25Part(
        'body-timecode-sync-port',
        108,
        '#ef4444',
        g,
        new THREE.Vector3(51.2, 6.5, 6.5),
        new THREE.Vector3(154, 34, 42),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B109. Solid-State Force-Sensing Piezo Haptic Button Module (Sigma BF)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Seamless anodized touch surface (zero gap!)
    const solidPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 11.0, 2.4), 1.3, 0.08, 0.08, 12),
      mats.bodyMgShell
    );
    // Underlying strain-gauge force sensing film
    const strainFilm = new THREE.Mesh(new THREE.BoxGeometry(14.0, 9.0, 0.25), mats.polyimideFpc);
    strainFilm.position.z = 0.85;
    // Multilayer ceramic piezoelectric haptic actuator bar
    const piezoBar = new THREE.Mesh(new THREE.BoxGeometry(12.6, 5.2, 1.35), mats.pztCeramic);
    piezoBar.position.z = 1.7;
    const electrodes = new THREE.Mesh(new THREE.BoxGeometry(13.2, 5.5, 0.28), mats.silverElectrode);
    electrodes.position.z = 2.45;
    g.add(solidPlate, strainFilm, piezoBar, electrodes);

    parts.push(
      finalizeBodyUltra25Part(
        'body-haptic-piezo-buttons',
        109,
        '#06b6d4',
        g,
        new THREE.Vector3(-47.0, -14.0, -32.6),
        new THREE.Vector3(-136, -54, -124),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B110. Front Independent Mechanical Focus-Mode Lever (AF-S/AF-C/DMF/MF)
  // =========================================================================
  {
    const g = new THREE.Group();
    const dialBase = new THREE.Mesh(
      new THREE.CylinderGeometry(5.8, 6.2, 2.4, 24).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    const leverArm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(3.6, 8.6, 1.4), 1.8, 0.08, 0.08, 10),
      mats.bodyMgShell
    );
    leverArm.position.set(0, 4.4, 0.6);
    const centerBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 2.8, 18).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    centerBtn.position.z = 0.65;
    const wpO = new THREE.Mesh(new THREE.TorusGeometry(5.6, 0.45, 8, 22), mats.epdmGasket);
    wpO.position.z = -1.2;
    wpO.userData.noEdges = true;
    const wafer = new THREE.Mesh(
      new THREE.CylinderGeometry(5.4, 5.4, 0.9, 20).rotateX(Math.PI / 2),
      mats.hdiMainboardPcb
    );
    wafer.position.z = -2.4;
    const goldWiper = new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.2, 0.35), mats.goldPlating);
    goldWiper.position.z = -1.85;
    g.add(dialBase, leverArm, centerBtn, wpO, wafer, goldWiper);

    parts.push(
      finalizeBodyUltra25Part(
        'body-focus-mode-lever',
        110,
        '#3b82f6',
        g,
        new THREE.Vector3(34.5, -18.5, 27.6),
        new THREE.Vector3(96, -54, 104),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B111. Left-Shoulder Drive Mode & Burst Sub-Dial with Center Push-Lock
  // =========================================================================
  {
    const g = new THREE.Group();
    // Lower focus-mode ring
    const lowerRing = new THREE.Mesh(
      new THREE.CylinderGeometry(9.6, 10.0, 2.8, 28),
      mats.matteBlackAnodized
    );
    lowerRing.position.y = -1.2;
    // Upper knurled drive-mode dial
    const upperDial = new THREE.Mesh(
      createSpurGearGeometry(30, 8.2, 4.2, 0.32).rotateX(Math.PI / 2),
      mats.bodyMgShell
    );
    upperDial.position.y = 2.4;
    // Center push-lock button + internal stainless coaxial shaft
    const lockBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.2, 5.2, 20),
      mats.stainlessMachined
    );
    lockBtn.position.y = 3.2;
    const wpO = new THREE.Mesh(
      new THREE.TorusGeometry(6.8, 0.48, 8, 22).rotateX(Math.PI / 2),
      mats.epdmGasket
    );
    wpO.position.y = -2.8;
    wpO.userData.noEdges = true;
    const coaxShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 7.5, 16),
      mats.brassGear
    );
    coaxShaft.position.y = -4.2;
    g.add(lowerRing, upperDial, lockBtn, wpO, coaxShaft);

    parts.push(
      finalizeBodyUltra25Part(
        'body-drive-mode-lock-subdial',
        111,
        '#f97316',
        g,
        new THREE.Vector3(34.5, 36.2, -5.5),
        new THREE.Vector3(92, 138, -28),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B112. 3-Axis High-G Freefall Drop-Detection Accelerometer & Backup Rail
  // =========================================================================
  {
    const g = new THREE.Group();
    const rigidIsland = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 12.0, 1.5), 1.6, 0.08, 0.08, 10).rotateX(Math.PI / 2),
      mats.magnesiumCast
    );
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(13.5, 0.65, 9.6), mats.sensorPcb);
    pcb.position.y = 1.15;
    const imuIc = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.1, 3.6), mats.icEpoxy);
    imuIc.position.set(-2.5, 2.0, 0);
    const backupCap = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.4, 1.8, 16),
      mats.tantalumCapYellow
    );
    backupCap.position.set(3.2, 2.3, 0);
    g.add(rigidIsland, pcb, imuIc, backupCap);

    parts.push(
      finalizeBodyUltra25Part(
        'body-drop-freefall-imu',
        112,
        '#e11d48',
        g,
        new THREE.Vector3(-16.0, -24.5, -10.5),
        new THREE.Vector3(-56, -138, -58),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B113. Vertical-Grip (VG-C5/C6) Anti-Twist Locking Pin Bay & Base Seat
  // =========================================================================
  {
    const g = new THREE.Group();
    // Thick stainless/titanium base load-spreader plate flush on bottom floor
    const spreader = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(26.0, 16.0, 2.2), 1.8, 0.08, 0.08, 10).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    // Hardened anti-twist locating pin socket (VG-C5 / VG-C6)
    const pinBushing = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.4, 3.8, 18),
      mats.titaniumRivet
    );
    pinBushing.position.set(-7.5, 0.6, 0);
    const bossCollar = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.5, 8, 20).rotateX(Math.PI / 2),
      mats.brassGear
    );
    bossCollar.position.set(7.0, -0.7, 0);
    g.add(spreader, pinBushing, bossCollar);

    parts.push(
      finalizeBodyUltra25Part(
        'body-vgrip-locking-pin-bay',
        113,
        '#94a3b8',
        g,
        new THREE.Vector3(-24.0, -35.6, 0.5),
        new THREE.Vector3(-82, -142, 42),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B114. Sony OEM Control Switch Blocks (CNT DIAL F / RL88100 / BK88100)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Modular bracket holding front dial block + twin tactile switch blocks
    const bracket = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 26.0, 2.0), 1.4, 0.06, 0.06, 10),
      mats.shutterChassis
    );
    const cntDialF = new THREE.Mesh(new THREE.BoxGeometry(10.5, 9.5, 3.2), mats.hdiMainboardPcb);
    cntDialF.position.set(0, 8.2, 2.0);
    const rl88100 = new THREE.Mesh(new THREE.BoxGeometry(11.5, 6.2, 1.4), mats.sensorPcb);
    rl88100.position.set(0, -1.5, -1.2);
    const bk88100 = new THREE.Mesh(new THREE.BoxGeometry(11.5, 6.2, 1.4), mats.sensorPcb);
    bk88100.position.set(0, -9.2, -1.2);
    const zifBus = new THREE.Mesh(new THREE.BoxGeometry(4.2, 18.0, 0.28), mats.polyimideFpc);
    zifBus.position.set(8.5, -1.0, 0);
    g.add(bracket, cntDialF, rl88100, bk88100, zifBus);

    parts.push(
      finalizeBodyUltra25Part(
        'body-cnt-dial-switch-blocks',
        114,
        '#14b8a6',
        g,
        new THREE.Vector3(-49.0, 22.0, -8.5),
        new THREE.Vector3(-164, 72, -46),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // B115. Magnesium Plasma Electrolytic Oxidation (PEO) & Fluorine Topcoat
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stepped 4-layer cutaway armor stack mounted cleanly on top front crown
    const lMg = new THREE.Mesh(new THREE.BoxGeometry(24.0, 0.85, 11.0), mats.magnesiumCast);
    lMg.position.y = -0.9;
    const lPeo = new THREE.Mesh(new THREE.BoxGeometry(22.0, 0.55, 10.0), mats.ceramicAlumina);
    lPeo.position.y = -0.15;
    const lUrethane = new THREE.Mesh(new THREE.BoxGeometry(19.6, 0.45, 9.0), mats.bodyMgShell);
    lUrethane.position.y = 0.42;
    const lFluorine = new THREE.Mesh(new THREE.BoxGeometry(16.8, 0.25, 8.0), mats.fluorineCoatCyan);
    lFluorine.position.y = 0.86;
    g.add(lMg, lPeo, lUrethane, lFluorine);

    parts.push(
      finalizeBodyUltra25Part(
        'body-peo-anti-corrosion-coat',
        115,
        '#22d3ee',
        g,
        new THREE.Vector3(0.0, 35.6, 12.0),
        new THREE.Vector3(16, 134, 68),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // B116. Starlight Night-Vision Red Dimmer Window & 360° Tally Prism
  // =========================================================================
  {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(11.4, 4.6, 1.0), 6.2, 0.06, 0.06, 10),
      mats.matteBlackAnodized
    );
    // Optical PMMA light-guide prism bar & deep-red 660 nm night-vision lens window
    const redPrism = new THREE.Mesh(new THREE.BoxGeometry(8.6, 2.2, 6.8), mats.bodyRecRed);
    redPrism.position.set(0, 0.65, 0.2);
    const topWindow = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.55, 2.6), mats.gMasterRedBadge);
    topWindow.position.set(0, 2.25, -0.4);
    const ledPcb = new THREE.Mesh(new THREE.BoxGeometry(8.0, 0.6, 4.4), mats.sensorPcb);
    ledPcb.position.set(0, -2.0, 0);
    g.add(housing, redPrism, topWindow, ledPcb);

    parts.push(
      finalizeBodyUltra25Part(
        'body-starlight-red-tally-filter',
        116,
        '#dc2626',
        g,
        new THREE.Vector3(-22.0, 35.4, 21.5),
        new THREE.Vector3(-68, 122, 92),
        cp,
        0.26
      )
    );
  }

  return parts;
}
