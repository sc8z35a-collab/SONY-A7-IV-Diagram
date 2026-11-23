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
import { LCD_EXPLANATIONS } from './lcdExplanations';

/** Shared Rear LCD Monitor center coordinates (fits cleanly below EVF eyecup & left of -X right-hand thumb controls) */
export const LCD_CENTER_X = 6.0;
export const LCD_CENTER_Y = -7.0;
export const LCD_WIDTH = 74.0;
export const LCD_HEIGHT = 50.0;

export interface LcdDynamicRig {
  monitorParts: CadPart[];
  tiltCradleLinks: THREE.Group[];
  applyDynamics: (
    elapsed: number,
    physicsActive: boolean,
    explodeFactor: number,
    integrated: boolean
  ) => void;
}

function finalizeLcdPart(
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
    subsystem: 'lcd',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: LCD_EXPLANATIONS[id],
  };
}

/**
 * Build ALL 14 ultra-dissected watchmaker CAD sub-assemblies of a 2024-2026 Flagship
 * 4-Axis Multi-Angle 3.2-Type 2.1M-Dot Rear LCD Monitor & Pantograph/Vari-Angle Hinge:
 *  - D01: OCA Optically Bonded Aluminosilicate Touch Cover Glass & PCAP ITO Grid
 *  - D02: 3.2-Type Wide-Gamut IPS Liquid Crystal Cell & COF Driver IC
 *  - D03: Dual-BEF Micro-Prism Stack, Edge LED Array & Acrylic Light-Guide Plate
 *  - D04: Ultra-Slim CNC Aluminum/Magnesium Monitor Rear Shell & Graphite Foil
 *  - D05: Dual-Axis Magnetic Hall Flip/Stow Orientation Sensor PCB & Magnets (NEW!)
 *  - D06: 270° Horizontal-Axis Belleville Disc-Spring Friction Torque Clutch (NEW!)
 *  - D07: 176° Vertical-Axis Side-Opening Vari-Angle Stainless Hinge Barrel & Yoke
 *  - D08: 0° / 90° / 180° Spring-Loaded Steel Detent Ball & MIM Stop-Cam Collar (NEW!)
 *  - D09: Hollow-Shaft Helical Torsion-Relief Coaxial MIPI-DSI Flex Harness (NEW!)
 *  - D10: Symmetrical CNC Stainless Dual-Link 4-Axis Tilt Pantograph Scissor Arms (NEW!)
 *  - D11: Optical-Axis Tilt Friction Drum Brakes & Torsion Assist Springs (NEW!)
 *  - D12: Downward-Tilt Linear Guide Slots & Self-Lubricating POM Slider Shoes (NEW!)
 *  - D13: Magnetic Flush-Stow Retention Catch & Silicone Anti-Rattle Bumpers (NEW!)
 *  - D14: Recessed Magnesium/Stainless 4-Axis Stationary Base Mounting Frame
 */
export function buildLcdParts(mats: MaterialLibrary): { parts: CadPart[]; rig: LcdDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const tiltCradleLinks: THREE.Group[] = [];
  const hingeWorldX = LCD_CENTER_X + LCD_WIDTH * 0.5 + 1.8;

  // =========================================================================
  // D01: OCA Optically Bonded Cover Glass & PCAP ITO Touch Layer (z = -35.8 mm)
  // =========================================================================
  const glassGroup = new THREE.Group();
  {
    const bezelShape = createFrameShape(
      LCD_WIDTH,
      LCD_HEIGHT,
      3.4,
      LCD_WIDTH - 8.0,
      LCD_HEIGHT - 7.6,
      1.2
    );
    glassGroup.add(
      new THREE.Mesh(extrudeCentered(bezelShape, 0.72, 0.08, 0.08, 18), mats.matteBlackAnodized)
    );

    const glassPane = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(LCD_WIDTH - 0.6, LCD_HEIGHT - 0.6, 3.2), 0.55, 0.04, 0.04, 16),
      mats.lcdCoverGlass
    );
    glassPane.position.z = -0.25;
    glassPane.userData.noEdges = true;
    glassGroup.add(glassPane);

    const gridMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.3,
      roughness: 0.35,
      transparent: true,
      opacity: 0.22,
      clippingPlanes: cp,
    });
    for (let x = -28; x <= 28; x += 8) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(0.18, LCD_HEIGHT - 9.0, 0.05), gridMat);
      trace.position.set(x, 0, 0.25);
      trace.userData.noEdges = true;
      glassGroup.add(trace);
    }
    for (let y = -16; y <= 16; y += 8) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(LCD_WIDTH - 9.0, 0.18, 0.05), gridMat);
      trace.position.set(0, y, 0.25);
      trace.userData.noEdges = true;
      glassGroup.add(trace);
    }

    const touchFpc = new THREE.Mesh(new THREE.BoxGeometry(11.0, 4.2, 0.25), mats.polyimideFpc);
    touchFpc.position.set(16.0, -LCD_HEIGHT * 0.5 + 1.8, 0.35);
    glassGroup.add(touchFpc);
  }
  const pGlass = finalizeLcdPart(
    'lcd-rear-bezel-glass',
    1,
    '#38bdf8',
    glassGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -35.8),
    new THREE.Vector3(0, 0, -78),
    new THREE.Vector3(0, 0, -352),
    cp,
    0.22
  );
  parts.push(pGlass);

  // =========================================================================
  // D02: 3.2-Type 2.1M-Dot Wide-Gamut IPS LCD Active Cell (z = -34.4 mm)
  // =========================================================================
  const ipsGroup = new THREE.Group();
  {
    const cellW = LCD_WIDTH - 4.4;
    const cellH = LCD_HEIGHT - 4.4;

    ipsGroup.add(
      new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(cellW, cellH, 1.4), 0.75, 0.05, 0.05, 14),
        mats.siliconBulk
      )
    );

    const screenPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(cellW - 3.6, cellH - 3.2),
      mats.lcdLiveViewActive
    );
    screenPlane.position.z = -0.42;
    screenPlane.rotation.y = Math.PI;
    screenPlane.userData.noEdges = true;
    ipsGroup.add(screenPlane);

    const polFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(cellW, cellH, 1.2, cellW - 3.6, cellH - 3.2, 0.5), 0.24, 0.02, 0.02, 12),
      mats.matteBlackAnodized
    );
    polFrame.position.z = -0.4;
    ipsGroup.add(polFrame);

    const cofFilm = new THREE.Mesh(new THREE.BoxGeometry(26.0, 5.4, 0.25), mats.polyimideFpc);
    cofFilm.position.set(-4.0, -cellH * 0.5 - 1.2, 0.2);
    ipsGroup.add(cofFilm);

    const driverIc = new THREE.Mesh(new THREE.BoxGeometry(13.5, 2.1, 0.55), mats.icEpoxy);
    driverIc.position.set(-4.0, -cellH * 0.5 - 1.2, 0.48);
    ipsGroup.add(driverIc);
  }
  const pIps = finalizeLcdPart(
    'lcd-ips-panel',
    2,
    '#0ea5e9',
    ipsGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.4),
    new THREE.Vector3(0, 0, -50),
    new THREE.Vector3(0, 0, -324),
    cp,
    0.24
  );
  parts.push(pIps);

  // =========================================================================
  // D03: Dual-BEF & DBEF Micro-Prism Optical Luminance Collimation Film Stack (z = -33.2 mm)
  // =========================================================================
  const blGroup = new THREE.Group();
  {
    const blW = LCD_WIDTH - 5.2;
    const blH = LCD_HEIGHT - 5.2;

    // Crossed Dual-BEF + DBEF prismatic optical sheets (decoupled from D17 LGP/LED bar!)
    blGroup.add(
      new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(blW, blH, 1.2), 0.55, 0.04, 0.04, 14),
        mats.lcdBacklightPrism
      )
    );

    blGroup.add(
      new THREE.Mesh(
        extrudeCentered(createFrameShape(blW + 1.4, blH + 1.4, 1.6, blW - 0.6, blH - 0.6, 1.0), 0.78, 0.05, 0.05, 14),
        mats.ceramicAlumina
      )
    );
  }
  const pBacklight = finalizeLcdPart(
    'lcd-backlight-stack',
    3,
    '#7dd3fc',
    blGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.2),
    new THREE.Vector3(0, 0, -38),
    new THREE.Vector3(0, 0, -312),
    cp,
    0.22
  );
  parts.push(pBacklight);

  // =========================================================================
  // D04: Ultra-Slim CNC Aluminum/Magnesium Monitor Rear Shell (z = -31.5 mm)
  // =========================================================================
  const shellGroup = new THREE.Group();
  {
    const trayBack = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(LCD_WIDTH + 1.2, LCD_HEIGHT + 1.2, 3.8), 1.4, 0.22, 0.22, 18),
      mats.bodyMgShell
    );
    trayBack.position.z = 0.2;
    shellGroup.add(trayBack);

    const rim = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH + 1.4, LCD_HEIGHT + 1.4, 3.8, LCD_WIDTH - 1.2, LCD_HEIGHT - 1.2, 3.0),
        4.4,
        0.2,
        0.2,
        18
      ),
      mats.bodyMgShell
    );
    rim.position.z = -1.6;
    shellGroup.add(rim);

    // Note: Graphite thermal spreading liner & stainless EMI backplate are decoupled into D18 (lcd-emi-thermal-shield)!

    const bossPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(7.5, 22.0, 1.8), 2.4, 0.14, 0.14, 12),
      mats.stainlessMachined
    );
    bossPlate.position.set(LCD_WIDTH * 0.5 - 2.6, 0, 0.4);
    shellGroup.add(bossPlate);

    const fingerNotch = new THREE.Mesh(new THREE.BoxGeometry(10.0, 2.2, 1.4), mats.matteBlackAnodized);
    fingerNotch.position.set(-LCD_WIDTH * 0.28, -LCD_HEIGHT * 0.5 - 0.3, -1.2);
    shellGroup.add(fingerNotch);
  }
  const pShell = finalizeLcdPart(
    'lcd-chassis-shell',
    4,
    '#334155',
    shellGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.5),
    new THREE.Vector3(0, 0, -14),
    new THREE.Vector3(0, 0, -288),
    cp,
    0.24
  );
  parts.push(pShell);

  // =========================================================================
  // D05: [NEW!] Dual-Axis Magnetic Hall Flip/Stow Orientation Sensor & Magnets (z = -30.9 mm)
  // =========================================================================
  const hallGroup = new THREE.Group();
  {
    // Emerald dual-Hall sensor sub-PCB mounted along lower-left monitor cradle border
    const hallPcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.0, 5.4, 1.0), 0.85, 0.05, 0.05, 10),
      mats.hdiMainboardPcb
    );
    hallPcb.position.set(-LCD_WIDTH * 0.32, -LCD_HEIGHT * 0.36, 0.2);
    hallGroup.add(hallPcb);

    for (const dx of [-4.2, 4.2]) {
      const hallIc = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.4, 0.75), mats.icEpoxy);
      hallIc.position.set(-LCD_WIDTH * 0.32 + dx, -LCD_HEIGHT * 0.36, -0.45);
      hallGroup.add(hallIc);
    }

    // Twin N52 trigger magnets (stow magnet on lower -X rim + 180° flip magnet near hinge!)
    const stowMag = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.2, 1.1), mats.neodymiumMagnet);
    stowMag.position.set(-LCD_WIDTH * 0.36, -LCD_HEIGHT * 0.36, -0.8);
    hallGroup.add(stowMag);

    const flipMag = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.6, 1.1), mats.neodymiumMagnet);
    flipMag.position.set(LCD_WIDTH * 0.4, 7.5, -0.4);
    hallGroup.add(flipMag);

    const hallFlex = new THREE.Mesh(new THREE.BoxGeometry(3.2, 14.0, 0.25), mats.polyimideFpc);
    hallFlex.position.set(-LCD_WIDTH * 0.22, -LCD_HEIGHT * 0.2, 0.35);
    hallGroup.add(hallFlex);
  }
  parts.push(
    finalizeLcdPart(
      'lcd-orientation-hall',
      5,
      '#16a34a',
      hallGroup,
      new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -30.9),
      new THREE.Vector3(-26, -22, -8),
      new THREE.Vector3(-28, -22, -282),
      cp,
      0.26
    )
  );

  // =========================================================================
  // D06: [NEW!] 270° Horizontal-Axis Belleville Disc-Spring Friction Torque Clutch
  // =========================================================================
  const clutchGroup = new THREE.Group();
  {
    // Horizontal torque shaft core extending into monitor boss
    const coreShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(2.0, 2.0, 11.4, 18).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    coreShaft.position.set(-4.8, 0, -0.6);
    clutchGroup.add(coreShaft);

    // 10 alternating conical Belleville disc springs (stainless) & phosphor-bronze friction washers
    for (let i = 0; i < 10; i++) {
      const isSpring = i % 2 === 0;
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(3.55, isSpring ? 3.2 : 3.55, 0.55, 20).rotateZ(Math.PI / 2),
        isSpring ? mats.mountStainlessFlange : mats.brassGear
      );
      disc.position.set(-1.0 - i * 0.85, 0, -0.6);
      clutchGroup.add(disc);
    }

    // Precision hex torque-calibration lock nut on shaft end
    const lockNut = new THREE.Mesh(
      new THREE.CylinderGeometry(2.9, 2.9, 1.4, 6).rotateZ(Math.PI / 2),
      mats.mountSpringSteel
    );
    lockNut.position.set(-9.9, 0, -0.6);
    clutchGroup.add(lockNut);
  }
  parts.push(
    finalizeLcdPart(
      'lcd-swivel-clutch',
      6,
      '#eab308',
      clutchGroup,
      new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.4),
      new THREE.Vector3(30, 18, -10),
      new THREE.Vector3(32, 18, -278),
      cp,
      0.26
    )
  );

  // =========================================================================
  // D07: 176° Vertical-Axis Side-Opening Stainless Hinge Barrel & Yoke
  // =========================================================================
  const hingeGroup = new THREE.Group();
  {
    const vertBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(3.1, 3.1, 22.0, 20),
      mats.stainlessMachined
    );
    hingeGroup.add(vertBarrel);

    for (let i = -3; i <= 3; i++) {
      const washer = new THREE.Mesh(
        new THREE.CylinderGeometry(3.75, 3.75, 0.6, 18),
        i % 2 === 0 ? mats.brassGear : mats.stainlessMachined
      );
      washer.position.y = i * 2.4;
      hingeGroup.add(washer);
    }

    const yokeBlock = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(8.4, 9.6, 2.2), 6.2, 0.18, 0.18, 14),
      mats.bodyMgShell
    );
    yokeBlock.position.set(-0.6, 0, -0.2);
    hingeGroup.add(yokeBlock);

    for (const sy of [-8.2, 8.2]) {
      const scr = createPrecisionScrew(1.1, 0.55, 1.8, mats.stainlessMachined);
      scr.position.set(1.8, sy, 1.8);
      hingeGroup.add(scr);
    }
  }
  const pHinge = finalizeLcdPart(
    'lcd-swivel-hinge',
    7,
    '#d97706',
    hingeGroup,
    new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.4),
    new THREE.Vector3(36, 0, 4),
    new THREE.Vector3(38, 0, -266),
    cp,
    0.24
  );
  parts.push(pHinge);

  // =========================================================================
  // D08: [NEW!] 0° / 90° / 180° Steel Detent Ball & Hardened MIM Stop-Cam Collar
  // =========================================================================
  const detentGroup = new THREE.Group();
  {
    // MIM hardened stainless notched stop-cam collar limiting rotation to safe 270°
    const stopCam = new THREE.Mesh(
      new THREE.CylinderGeometry(4.2, 4.2, 3.2, 22),
      mats.matteBlackAnodized
    );
    stopCam.position.set(0, -6.2, 0);
    detentGroup.add(stopCam);

    // Physical stop lug tab protruding off cam collar
    const stopLug = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.8, 3.6), mats.stainlessMachined);
    stopLug.position.set(3.2, -6.2, -1.6);
    detentGroup.add(stopLug);

    // Precision steel detent ball bearing + brass compression spring plunger
    const detentBall = new THREE.Mesh(new THREE.SphereGeometry(1.25, 12, 10), mats.mountStainlessFlange);
    detentBall.position.set(-4.3, -6.2, 0);
    detentGroup.add(detentBall);

    const detSpring = new THREE.Mesh(
      createHelicalSpringGeometry(0.9, 4.2, 4, 0.22).rotateY(Math.PI / 2),
      mats.brassGear
    );
    detSpring.position.set(-6.8, -6.2, 0);
    detSpring.userData.noEdges = true;
    detentGroup.add(detSpring);

    // Elastomer end-stop shock cushion bumper
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 1.8), mats.damperElastomer);
    bumper.position.set(3.2, -6.2, 1.4);
    detentGroup.add(bumper);
  }
  parts.push(
    finalizeLcdPart(
      'lcd-detent-stops',
      8,
      '#f59e0b',
      detentGroup,
      new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.4),
      new THREE.Vector3(30, -18, -4),
      new THREE.Vector3(32, -18, -272),
      cp,
      0.26
    )
  );

  // =========================================================================
  // D09: [NEW!] Hollow-Shaft Helical Torsion-Relief Coaxial MIPI-DSI Flex Harness
  // =========================================================================
  const fpcGroup = new THREE.Group();
  {
    const fpcLoopPts = [
      new THREE.Vector3(-8.5, 2.5, -0.8),
      new THREE.Vector3(-2.5, 4.0, 0.8),
      new THREE.Vector3(2.4, 1.2, 2.5),
      new THREE.Vector3(1.2, -3.6, 2.0),
      new THREE.Vector3(-3.2, -5.8, 1.2),
      new THREE.Vector3(-9.5, -6.0, 1.8),
    ];
    const fpcCurve = new THREE.CatmullRomCurve3(fpcLoopPts);
    const fpcRibbon = new THREE.Mesh(
      new THREE.TubeGeometry(fpcCurve, 28, 0.9, 8, false),
      mats.polyimideFpc
    );
    fpcRibbon.userData.noEdges = true;
    fpcGroup.add(fpcRibbon);

    // Silver EMI noise-shield wrap sleeve over coaxial section
    const shieldSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 6.2, 14),
      mats.emiShieldFilm
    );
    shieldSleeve.position.set(1.8, -1.2, 2.2);
    fpcGroup.add(shieldSleeve);

    // Dual gold B2B micro-connectors at monitor & mainboard ends
    const connA = new THREE.Mesh(new THREE.BoxGeometry(3.8, 4.2, 0.8), mats.goldPlating);
    connA.position.set(-9.2, 2.5, -0.8);
    const connB = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.6, 0.8), mats.goldPlating);
    connB.position.set(-10.2, -6.0, 1.8);
    fpcGroup.add(connA, connB);
  }
  parts.push(
    finalizeLcdPart(
      'lcd-coaxial-fpc',
      9,
      '#f97316',
      fpcGroup,
      new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.4),
      new THREE.Vector3(52, 0, 12),
      new THREE.Vector3(54, 0, -258),
      cp,
      0.26
    )
  );

  // =========================================================================
  // D10: [NEW!] Symmetrical CNC Stainless Dual-Link 4-Axis Tilt Pantograph Arms (z = -29.4 mm)
  // =========================================================================
  const pantoGroup = new THREE.Group();
  {
    // Movable inner stainless tilt carrier frame coupled to the +X vari-angle hinge
    const innerCradle = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH - 2.0, LCD_HEIGHT - 4.0, 2.8, LCD_WIDTH - 16.0, LCD_HEIGHT - 16.0, 2.0),
        1.4,
        0.12,
        0.12,
        16
      ),
      mats.stainlessMachined
    );
    innerCradle.position.z = -0.4;
    pantoGroup.add(innerCradle);

    for (const sx of [-1, 1]) {
      const linkPair = new THREE.Group();
      linkPair.position.set(sx * (LCD_WIDTH * 0.42), 0, 0.2);

      const arm1 = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.6, 28.0, 1.4), 1.1, 0.08, 0.08, 12),
        mats.stainlessMachined
      );
      arm1.position.set(0, 4.0, -0.4);
      arm1.rotation.z = sx * 0.14;
      linkPair.add(arm1);

      const arm2 = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.0, 22.0, 1.2), 1.0, 0.08, 0.08, 12),
        mats.brassGear
      );
      arm2.position.set(-sx * 2.2, -5.0, 0.35);
      arm2.rotation.z = -sx * 0.18;
      linkPair.add(arm2);

      for (const py of [-13.5, 0, 14.5]) {
        const rivet = new THREE.Mesh(
          new THREE.CylinderGeometry(1.45, 1.45, 2.4, 12).rotateX(Math.PI / 2),
          mats.stainlessMachined
        );
        rivet.position.set(0, py, 0);
        linkPair.add(rivet);
      }

      pantoGroup.add(linkPair);
      tiltCradleLinks.push(linkPair);
    }
  }
  parts.push(
    finalizeLcdPart(
      'lcd-pantograph-links',
      10,
      '#94a3b8',
      pantoGroup,
      new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -29.4),
      new THREE.Vector3(0, 0, 4),
      new THREE.Vector3(0, 0, -270),
      cp,
      0.24
    )
  );

  // =========================================================================
  // D11: [NEW!] Optical-Axis Tilt Friction Drum Brakes & Torsion Assist Springs (z = -29.2 mm)
  // =========================================================================
  const tiltTorqueGroup = new THREE.Group();
  {
    // Left & right upper tilt friction drum brakes + gravity-compensating torsion springs
    for (const sx of [-1, 1]) {
      const drumX = sx * (LCD_WIDTH * 0.34);
      const drumY = LCD_HEIGHT * 0.36;

      const drum = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.2, 7.6, 18).rotateZ(Math.PI / 2),
        mats.brassGear
      );
      drum.position.set(drumX, drumY, 0);
      tiltTorqueGroup.add(drum);

      const bandClamp = new THREE.Mesh(
        new THREE.CylinderGeometry(3.65, 3.65, 3.8, 18).rotateZ(Math.PI / 2),
        mats.shutterChassis
      );
      bandClamp.position.set(drumX, drumY, 0);
      tiltTorqueGroup.add(bandClamp);

      const assistSpring = new THREE.Mesh(
        createTorsionSpringGeometry(2.1, 4.2, 4, 0.3, 4.2).rotateY(Math.PI / 2),
        mats.stainlessMachined
      );
      assistSpring.position.set(drumX - sx * 6.5, drumY, 0);
      assistSpring.userData.noEdges = true;
      tiltTorqueGroup.add(assistSpring);
    }

    // Horizontal synchronizing torsion bar coupling left & right tilt drums equally
    const syncBar = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.05, LCD_WIDTH * 0.66, 12).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    syncBar.position.set(0, LCD_HEIGHT * 0.36, 0);
    tiltTorqueGroup.add(syncBar);
  }
  parts.push(
    finalizeLcdPart(
      'lcd-tilt-torque-cams',
      11,
      '#b45309',
      tiltTorqueGroup,
      new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -29.2),
      new THREE.Vector3(0, 28, 16),
      new THREE.Vector3(0, 28, -260),
      cp,
      0.24
    )
  );

  // =========================================================================
  // D12: [NEW!] Downward-Tilt Linear Guide Slots & POM Slider Shoes (z = -29.0 mm)
  // =========================================================================
  const slideRailsGroup = new THREE.Group();
  {
    for (const sx of [-1, 1]) {
      const rx = sx * (LCD_WIDTH * 0.43);
      // Slotted stainless linear guide rail channel
      const track = new THREE.Mesh(
        extrudeCentered(createFrameShape(5.4, 30.0, 1.6, 2.2, 22.0, 0.9), 1.6, 0.08, 0.08, 12),
        mats.stainlessMachined
      );
      track.position.set(rx, -2.0, 0);
      slideRailsGroup.add(track);

      // Low-friction white POM rectangular slider shoe riding cleanly inside slot
      const pomShoe = new THREE.Mesh(new THREE.BoxGeometry(3.4, 6.4, 2.1), mats.pomGear);
      pomShoe.position.set(rx, -7.5, -0.2);
      slideRailsGroup.add(pomShoe);

      // Brass guide pin locking pantograph end into POM shoe
      const gPin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 2.5, 12).rotateX(Math.PI / 2),
        mats.brassGear
      );
      gPin.position.set(rx, -7.5, -0.2);
      slideRailsGroup.add(gPin);
    }
  }
  parts.push(
    finalizeLcdPart(
      'lcd-tilt-slide-rails',
      12,
      '#cbd5e1',
      slideRailsGroup,
      new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -29.0),
      new THREE.Vector3(0, -28, 16),
      new THREE.Vector3(0, -28, -260),
      cp,
      0.24
    )
  );

  // =========================================================================
  // D13: [NEW!] Magnetic Flush-Stow Retention Catch & Silicone Bumpers (z = -28.9 mm)
  // =========================================================================
  const locksGroup = new THREE.Group();
  {
    // Dual N52 flush-stow magnetic catches along bottom edge (-Y)
    for (const mx of [-18.0, 14.0]) {
      const catchCup = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.2, 1.4), mats.softIronYoke);
      catchCup.position.set(mx, -LCD_HEIGHT * 0.44, 0);
      locksGroup.add(catchCup);

      const catchMag = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.2, 1.6), mats.neodymiumMagnet);
      catchMag.position.set(mx, -LCD_HEIGHT * 0.44, -0.2);
      locksGroup.add(catchMag);
    }

    // 4 Corner cylindrical silicone anti-rattle shock bumpers
    for (const [bx, by] of [
      [-LCD_WIDTH * 0.44, LCD_HEIGHT * 0.4],
      [LCD_WIDTH * 0.44, LCD_HEIGHT * 0.4],
      [-LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.4],
      [LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.4],
    ]) {
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.3, 1.4, 14).rotateX(Math.PI / 2),
        mats.damperElastomer
      );
      pad.position.set(bx, by, -0.4);
      locksGroup.add(pad);
    }
  }
  parts.push(
    finalizeLcdPart(
      'lcd-cradle-locks',
      13,
      '#ec4899',
      locksGroup,
      new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -28.9),
      new THREE.Vector3(-26, 24, 22),
      new THREE.Vector3(-28, 24, -252),
      cp,
      0.24
    )
  );

  // =========================================================================
  // D14: Recessed Magnesium/Stainless 4-Axis Stationary Base Mounting Frame (z = -28.8 mm)
  // =========================================================================
  const cradleGroup = new THREE.Group();
  {
    const baseFrame = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH + 2.4, LCD_HEIGHT + 2.2, 3.8, LCD_WIDTH - 14.0, LCD_HEIGHT - 14.0, 2.4),
        1.8,
        0.16,
        0.16,
        18
      ),
      mats.magnesiumCast
    );
    baseFrame.position.z = 0.6;
    cradleGroup.add(baseFrame);

    const fpcPort = new THREE.Mesh(new THREE.BoxGeometry(14.0, 4.0, 1.4), mats.polyimideFpc);
    fpcPort.position.set(LCD_WIDTH * 0.36, -6.0, 1.2);
    cradleGroup.add(fpcPort);

    for (const [cx, cy] of [
      [-LCD_WIDTH * 0.44, LCD_HEIGHT * 0.42],
      [LCD_WIDTH * 0.44, LCD_HEIGHT * 0.42],
      [-LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.42],
      [LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.42],
    ]) {
      const screw = createPrecisionScrew(1.3, 0.6, 2.2, mats.stainlessMachined);
      screw.position.set(cx, cy, -0.6);
      screw.rotation.y = Math.PI;
      cradleGroup.add(screw);
    }
  }
  parts.push(
    finalizeLcdPart(
      'lcd-4axis-tilt-frame',
      14,
      '#64748b',
      cradleGroup,
      new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -28.8),
      new THREE.Vector3(0, 0, 34),
      new THREE.Vector3(0, 0, -244),
      cp,
      0.24
    )
  );

  // =========================================================================
  // D15: [Phase 11] 240Hz PCAP Touch-Sensing Controller ASIC Sub-FPC & ESD Array
  // =========================================================================
  const touchCtrlGroup = new THREE.Group();
  {
    const subFpc = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(20.0, 7.6, 1.2), 0.32, 0.03, 0.03, 12),
      mats.polyimideFpc
    );
    subFpc.position.set(16.0, -LCD_HEIGHT * 0.44, 0);
    touchCtrlGroup.add(subFpc);

    // 240Hz Mutual-Capacitance Touch Controller QFN ASIC + ESD TVS protection chips
    const touchAsic = new THREE.Mesh(new THREE.BoxGeometry(5.6, 5.2, 0.85), mats.icEpoxy);
    touchAsic.position.set(15.2, -LCD_HEIGHT * 0.44, 0.56);
    const esdIc = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, 0.65), mats.icEpoxy);
    esdIc.position.set(21.6, -LCD_HEIGHT * 0.44, 0.48);
    // Silver EMI noise-rejection foil over touch flex tail
    const emiFoil = new THREE.Mesh(new THREE.BoxGeometry(6.2, 4.4, 0.25), mats.emiShieldFilm);
    emiFoil.position.set(9.4, -LCD_HEIGHT * 0.44, 0.28);
    const goldB2b = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.8, 0.48), mats.goldPlating);
    goldB2b.position.set(15.2, -LCD_HEIGHT * 0.5 + 0.5, 0.4);
    touchCtrlGroup.add(touchAsic, esdIc, emiFoil, goldB2b);
  }
  const pTouchCtrl = finalizeLcdPart(
    'lcd-touch-controller',
    15,
    '#0284c7',
    touchCtrlGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -35.2),
    new THREE.Vector3(24, -26, -64),
    new THREE.Vector3(24, -26, -338),
    cp,
    0.24
  );
  parts.push(pTouchCtrl);

  // =========================================================================
  // D16: [Phase 11] Crossed 0°/90° Wide-View Polarizer Films & Retarder Stack
  // =========================================================================
  const polGroup = new THREE.Group();
  {
    const pW = LCD_WIDTH - 4.8;
    const pH = LCD_HEIGHT - 4.8;
    // Front 0° Analyzer Polarizer + TAC protective substrate
    const frontPol = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(pW, pH, 1.2), 0.26, 0.02, 0.02, 14),
      mats.lcdPolarizerFilm
    );
    frontPol.position.z = -0.22;
    frontPol.userData.edgeOpacity = 0.34;
    polGroup.add(frontPol);

    // Biaxial wide-view optical compensation retarder sheet behind front polarizer
    const retarder = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(pW - 0.6, pH - 0.6, 1.0), 0.18, 0.02, 0.02, 12),
      mats.evfDichroicMirror
    );
    retarder.position.z = 0.18;
    retarder.userData.edgeOpacity = 0.3;
    polGroup.add(retarder);

    // Subtle 0° / 90° polarization axis corner alignment notches (zero text)
    const tab0 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.1, 0.3), mats.goldPlating);
    tab0.position.set(-pW * 0.42, pH * 0.5 + 0.4, -0.22);
    const tab90 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 4.2, 0.3), mats.beCuSpring);
    tab90.position.set(pW * 0.5 + 0.4, pH * 0.4, 0.18);
    polGroup.add(tab0, tab90);
  }
  const pPolarizer = finalizeLcdPart(
    'lcd-polarizer-stack',
    16,
    '#6366f1',
    polGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -35.05),
    new THREE.Vector3(0, 0, -64),
    new THREE.Vector3(0, 0, -338),
    cp,
    0.26
  );
  parts.push(pPolarizer);

  // =========================================================================
  // D17: [Phase 11] 10x High-CRI Edge W-LED Bar, Laser-Dot PMMA LGP & ESR Mirror
  // =========================================================================
  const lgpGroup = new THREE.Group();
  {
    const blW = LCD_WIDTH - 5.2;
    const blH = LCD_HEIGHT - 5.2;

    // Laser-etched micro-dot acrylic Light-Guide Plate (LGP) distributing edge light evenly
    const lgpPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(blW, blH, 1.2), 0.62, 0.04, 0.04, 14),
      mats.sswfGlass
    );
    lgpPlate.userData.edgeOpacity = 0.38;
    lgpGroup.add(lgpPlate);

    // Mirror-bright 98.5% Enhanced Specular Reflector (ESR) polymer sheet on +Z back
    const esrMirror = new THREE.Mesh(
      new THREE.BoxGeometry(blW - 1.0, blH - 1.0, 0.16),
      mats.sinteredSilver
    );
    esrMirror.position.z = 0.42;
    lgpGroup.add(esrMirror);

    // Lower edge copper-polyimide LED strip bar + 10 high-CRI glowing side-emitting W-LEDs
    const ledBar = new THREE.Mesh(new THREE.BoxGeometry(blW - 5.0, 2.2, 0.85), mats.polyimideFpc);
    ledBar.position.set(0, -blH * 0.5 + 1.1, 0);
    lgpGroup.add(ledBar);

    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xe0f2fe,
      emissiveIntensity: 1.45,
      roughness: 0.15,
      clippingPlanes: cp,
    });
    for (let i = 0; i < 10; i++) {
      const lx = -blW * 0.42 + (i / 9) * (blW * 0.84);
      const led = new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.25, 0.72), ledMat);
      led.position.set(lx, -blH * 0.5 + 1.4, -0.14);
      led.userData.noEdges = true;
      lgpGroup.add(led);
    }
  }
  const pLgpLed = finalizeLcdPart(
    'lcd-lgp-led-bar',
    17,
    '#bae6fd',
    lgpGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.45),
    new THREE.Vector3(0, 0, -26),
    new THREE.Vector3(0, 0, -300),
    cp,
    0.24
  );
  parts.push(pLgpLed);

  // =========================================================================
  // D18: [Phase 11] Ultra-Thin Stainless EMI Backplate & Graphite Thermal Liner
  // =========================================================================
  const emiThermalGroup = new THREE.Group();
  {
    // 0.25mm stamped SUS304 EMI shielding stiffener preventing touch pooling
    const emiPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(LCD_WIDTH - 4.0, LCD_HEIGHT - 4.0, 1.8), 0.26, 0.03, 0.03, 14),
      mats.emiShieldCan
    );
    emiThermalGroup.add(emiPlate);

    // High-conductivity artificial graphite thermal spreading sheet diffusing bottom LED heat upward
    const graphitePad = new THREE.Mesh(
      new THREE.BoxGeometry(LCD_WIDTH - 14.0, LCD_HEIGHT - 14.0, 0.22),
      mats.thermalTransferTape
    );
    graphitePad.position.set(-2.0, 0, 0.24);
    emiThermalGroup.add(graphitePad);

    // Copper conductive grounding bridge tab linking shield to +X hinge GND
    const gndTab = new THREE.Mesh(new THREE.BoxGeometry(7.2, 5.2, 0.28), mats.copperHeatSpreader);
    gndTab.position.set(LCD_WIDTH * 0.46, 0, 0.14);
    emiThermalGroup.add(gndTab);
  }
  const pEmiThermal = finalizeLcdPart(
    'lcd-emi-thermal-shield',
    18,
    '#475569',
    emiThermalGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.95),
    new THREE.Vector3(-26, 20, -20),
    new THREE.Vector3(-28, 20, -294),
    cp,
    0.24
  );
  parts.push(pEmiThermal);

  // =========================================================================
  // D19: [Phase 11] Self-Closing Pull-In Over-Center Cam Hinge & Preload Spring
  // =========================================================================
  const pullInGroup = new THREE.Group();
  {
    for (const sy of [-6.8, 6.8]) {
      // Sculpted over-center heart cam profile (generates closing pull-in force in 0°..15°!)
      const camShape = new THREE.Shape();
      camShape.absarc(0, 0, 3.6, 0, Math.PI * 1.45, false);
      camShape.lineTo(4.9, -1.6);
      camShape.lineTo(3.6, 0);
      const cam = new THREE.Mesh(
        extrudeCentered(camShape, 2.2, 0.08, 0.08, 18).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      cam.position.set(0, sy, 0);
      pullInGroup.add(cam);

      // Brass cam follower roller & CuBe2 heavy pull-in preload coil spring
      const follower = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 1.1, 2.4, 14),
        mats.brassGear
      );
      follower.position.set(-4.3, sy, 0.6);
      const pullSpr = new THREE.Mesh(
        createHelicalSpringGeometry(1.2, 4.6, 5, 0.24).rotateY(Math.PI / 2),
        mats.beCuSpring
      );
      pullSpr.position.set(-7.2, sy, 0.6);
      pullSpr.userData.noEdges = true;
      pullInGroup.add(follower, pullSpr);
    }
  }
  parts.push(
    finalizeLcdPart(
      'lcd-pullin-cam-spring',
      19,
      '#d97706',
      pullInGroup,
      new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.4),
      new THREE.Vector3(44, 24, 4),
      new THREE.Vector3(46, 24, -266),
      cp,
      0.24
    )
  );

  // =========================================================================
  // D20: [Phase 11] Molded Accordion EPDM Hinge Weather-Seal Boots & O-Rings
  // =========================================================================
  const bootsGroup = new THREE.Group();
  {
    // Bulkhead slot EPDM perimeter sealing gasket
    const slotGasket = new THREE.Mesh(
      extrudeCentered(createFrameShape(11.6, 25.0, 2.6, 6.4, 19.8, 1.6), 1.35, 0.12, 0.12, 16),
      mats.epdmGasket
    );
    slotGasket.position.z = 1.2;
    bootsGroup.add(slotGasket);

    // Molded ribbed accordion waterproof rubber bellows wrapping hinge neck
    for (let i = 0; i < 4; i++) {
      const rRib = i % 2 === 0 ? 4.4 : 3.55;
      const rib = new THREE.Mesh(
        new THREE.TorusGeometry(rRib, 0.55, 10, 24).rotateX(Math.PI / 2),
        mats.epdmGasket
      );
      rib.position.set(0, -9.2 + i * 6.1, -0.1);
      rib.userData.noEdges = true;
      bootsGroup.add(rib);
    }

    // Twin dynamic rotary shaft O-rings (fluorine low-friction coated!)
    for (const oy of [-11.4, 11.4]) {
      const oRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.2, 0.42, 10, 24).rotateX(Math.PI / 2),
        mats.antiVibRubber
      );
      oRing.position.set(0, oy, -0.4);
      oRing.userData.noEdges = true;
      bootsGroup.add(oRing);
    }
  }
  parts.push(
    finalizeLcdPart(
      'lcd-hinge-weather-boots',
      20,
      '#1f2937',
      bootsGroup,
      new THREE.Vector3(hingeWorldX - 1.2, LCD_CENTER_Y, -29.2),
      new THREE.Vector3(46, -24, 14),
      new THREE.Vector3(48, -24, -256),
      cp,
      0.24
    )
  );

  // =========================================================================
  // D21: [Phase 11] Body-Side Bulkhead MIPI-DSI B2B Relay PCB & Clamp Plate
  // =========================================================================
  const bulkheadB2bGroup = new THREE.Group();
  {
    const bx = LCD_WIDTH * 0.24;
    const by = -6.0;
    const relayPcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(24.0, 14.0, 1.6), 1.0, 0.08, 0.08, 14),
      mats.hdiMainboardPcb
    );
    relayPcb.position.set(bx, by, 0);
    bulkheadB2bGroup.add(relayPcb);

    // 30-pin high-speed 100Ω differential MIPI-DSI B2B socket + ESD TVS protection ICs
    const b2bSocket = new THREE.Mesh(new THREE.BoxGeometry(12.4, 3.2, 1.05), mats.zifIvoryPlastic);
    b2bSocket.position.set(bx, by + 2.4, -0.8);
    const goldPins = new THREE.Mesh(new THREE.BoxGeometry(11.6, 3.6, 0.22), mats.goldPlating);
    goldPins.position.set(bx, by + 2.4, -0.52);
    const esdChip = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.2, 0.72), mats.icEpoxy);
    esdChip.position.set(bx - 5.2, by - 3.2, -0.78);
    bulkheadB2bGroup.add(b2bSocket, goldPins, esdChip);

    // Stainless B2B retention clamp bar + 2 M1.4 screws preventing drop-shock disconnect!
    const clampBar = new THREE.Mesh(new THREE.BoxGeometry(16.6, 4.4, 0.52), mats.emiShieldCan);
    clampBar.position.set(bx, by + 2.4, -1.55);
    bulkheadB2bGroup.add(clampBar);
    for (const dx of [-7.0, 7.0]) {
      const sc = createPrecisionScrew(1.0, 0.42, 1.6, mats.stainlessMachined);
      sc.position.set(bx + dx, by + 2.4, -1.85);
      sc.rotation.y = Math.PI;
      bulkheadB2bGroup.add(sc);
    }

    // Short internal jumper FPC routing forward (+Z) into Mainboard
    const jumper = new THREE.Mesh(new THREE.BoxGeometry(9.2, 6.2, 0.28), mats.polyimideFpc);
    jumper.position.set(bx - 4.0, by + 8.5, 0.8);
    bulkheadB2bGroup.add(jumper);
  }
  parts.push(
    finalizeLcdPart(
      'lcd-bulkhead-b2b-pcb',
      21,
      '#10b981',
      bulkheadB2bGroup,
      new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -27.4),
      new THREE.Vector3(0, 0, 48),
      new THREE.Vector3(0, 0, -230),
      cp,
      0.24
    )
  );

  // =========================================================================
  // D22: [Phase 12] Rear Monitor Carbon-Steel Anti-Warp Stiffener Plate (Monitor-Attached!)
  // =========================================================================
  const stiffenerGroup = new THREE.Group();
  {
    const stiffPlate = new THREE.Mesh(
      extrudeCentered(createFrameShape(LCD_WIDTH - 4.4, LCD_HEIGHT - 4.4, 2.6, LCD_WIDTH - 24.0, LCD_HEIGHT - 22.0, 1.8), 0.36, 0.03, 0.03, 16),
      mats.mountStainlessFlange
    );
    stiffenerGroup.add(stiffPlate);

    // Diagonal anti-torsion X-ribs stiffening cantilever vari-angle screen under touch force!
    for (const ang of [0.54, -0.54]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(56.0, 2.2, 0.48), mats.carbonFiberBlade);
      rib.rotation.z = ang;
      stiffenerGroup.add(rib);
    }
  }
  const pStiffener = finalizeLcdPart(
    'lcd-rear-stiffener',
    22,
    '#64748b',
    stiffenerGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.2),
    new THREE.Vector3(0, 0, -24),
    new THREE.Vector3(0, 0, -276),
    cp,
    0.24
  );
  parts.push(pStiffener);

  // =========================================================================
  // D23: [Phase 12] 4-Axis Hinge Belleville Disc-Spring Friction Torque Washer Stack
  // =========================================================================
  const torqueWashersGroup = new THREE.Group();
  {
    // 6 alternating Belleville conical spring washers + PTFE slip discs along rotary hinge axle
    for (let i = 0; i < 6; i++) {
      const wy = -6.0 + i * 2.4;
      const belleville = new THREE.Mesh(
        new THREE.CylinderGeometry(3.8, 4.4, 0.52, 24),
        i % 2 === 0 ? mats.mountSpringSteel : mats.brassGear
      );
      belleville.position.set(0, wy, 0);
      torqueWashersGroup.add(belleville);

      const ptfeSlip = new THREE.Mesh(
        new THREE.CylinderGeometry(4.1, 4.1, 0.24, 24),
        mats.zifIvoryPlastic
      );
      ptfeSlip.position.set(0, wy + 0.5, 0);
      torqueWashersGroup.add(ptfeSlip);
    }

    // Precision self-locking serrated tension locknut crowning the stack
    const lockNut = new THREE.Mesh(
      new THREE.CylinderGeometry(4.3, 4.3, 1.4, 6),
      mats.stainlessMachined
    );
    lockNut.position.set(0, 8.6, 0);
    torqueWashersGroup.add(lockNut);
  }
  parts.push(
    finalizeLcdPart(
      'lcd-torque-washers',
      23,
      '#d97706',
      torqueWashersGroup,
      new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.5),
      new THREE.Vector3(56, 22, -16),
      new THREE.Vector3(58, 22, -284),
      cp,
      0.26
    )
  );

  // =========================================================================
  // D24: [Phase 12] Rear-Bezel RGB Ambient Light & Color-Temperature Sensor (Monitor-Attached!)
  // =========================================================================
  const ambColorGroup = new THREE.Group();
  {
    const pcb = new THREE.Mesh(new THREE.BoxGeometry(9.6, 4.2, 0.65), mats.hdiMainboardPcb);
    pcb.position.set(0, -LCD_HEIGHT * 0.44, 0);
    const rgbIc = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.0, 0.6), mats.icEpoxy);
    rgbIc.position.set(0, -LCD_HEIGHT * 0.44, -0.58);
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 0.3, 14).rotateX(Math.PI / 2),
      mats.lcdCoverGlass
    );
    lens.position.set(0, -LCD_HEIGHT * 0.44, -0.95);
    lens.userData.noEdges = true;
    const fpc = new THREE.Mesh(new THREE.BoxGeometry(12.0, 2.2, 0.2), mats.polyimideFpc);
    fpc.position.set(9.5, -LCD_HEIGHT * 0.44, 0.15);
    ambColorGroup.add(pcb, rgbIc, lens, fpc);
  }
  const pAmbColor = finalizeLcdPart(
    'lcd-ambient-color-sensor',
    24,
    '#0ea5e9',
    ambColorGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.8),
    new THREE.Vector3(0, -34, -64),
    new THREE.Vector3(0, -34, -318),
    cp,
    0.24
  );
  parts.push(pAmbColor);

  // =========================================================================
  // D25: [Phase 12] Selfie 180° Flip & Closed-Dock Auto-Rotate Hall/Reed Magnet Pair (Monitor-Attached!)
  // =========================================================================
  const flipMagGroup = new THREE.Group();
  {
    // Twin N52 detection micro-magnets embedded along upper & right bezel edges
    for (const [mx, my] of [
      [-LCD_WIDTH * 0.42, LCD_HEIGHT * 0.34],
      [LCD_WIDTH * 0.38, -LCD_HEIGHT * 0.38],
    ] as Array<[number, number]>) {
      const mag = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.2, 1.05), mats.neodymiumMagnet);
      mag.position.set(mx, my, 0);
      const keeper = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 0.35), mats.softIronYoke);
      keeper.position.set(mx, my, 0.65);
      flipMagGroup.add(mag, keeper);
    }

    // Companion bipolar Hall IC sensor pad indicator on lower-right dock axis
    const hallPod = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.8, 0.72), mats.hdiMainboardPcb);
    hallPod.position.set(LCD_WIDTH * 0.38, LCD_HEIGHT * 0.34, 0.5);
    const hallIc = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.0, 0.55), mats.icEpoxy);
    hallIc.position.set(LCD_WIDTH * 0.38, LCD_HEIGHT * 0.34, 0.1);
    flipMagGroup.add(hallPod, hallIc);
  }
  const pFlipMags = finalizeLcdPart(
    'lcd-flip-reed-magnets',
    25,
    '#6366f1',
    flipMagGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.2),
    new THREE.Vector3(-42, 26, -34),
    new THREE.Vector3(-44, 26, -290),
    cp,
    0.24
  );
  parts.push(pFlipMags);

  // =========================================================================
  // D26: [Phase 12] Spiral FPC Hinge-Axle Anti-Chafe PTFE Sleeve & Strain-Relief Grommet
  // =========================================================================
  const hingeGrommetGroup = new THREE.Group();
  {
    // Low-friction white PTFE hollow axle sleeve lining the 270° hinge barrel
    const ptfeTube = new THREE.Mesh(
      new THREE.CylinderGeometry(2.55, 2.55, 22.0, 20, 1, true),
      mats.zifIvoryPlastic
    );
    hingeGrommetGroup.add(ptfeTube);

    // Dual flared silicone curvature-limiting strain-relief grommets at tube ends
    for (const gy of [-11.2, 11.2]) {
      const flare = new THREE.Mesh(
        new THREE.TorusGeometry(2.85, 0.68, 10, 22).rotateX(Math.PI / 2),
        mats.epdmGasket
      );
      flare.position.y = gy;
      flare.userData.noEdges = true;
      hingeGrommetGroup.add(flare);
    }
  }
  parts.push(
    finalizeLcdPart(
      'lcd-hinge-grommet',
      26,
      '#f8fafc',
      hingeGrommetGroup,
      new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.4),
      new THREE.Vector3(62, -6, -4),
      new THREE.Vector3(64, -6, -270),
      cp,
      0.24
    )
  );

  // =========================================================================
  // D27: [Phase 12] 4-Corner Micro-Cellular Urethane Monitor Dock Cushion Pads & Catch
  // =========================================================================
  const dockBumpersGroup = new THREE.Group();
  {
    // 4 high-damping PORON micro-cellular urethane bumpers seated in cradle corners
    for (const [cx, cy] of [
      [-LCD_WIDTH * 0.43, LCD_HEIGHT * 0.4],
      [LCD_WIDTH * 0.43, LCD_HEIGHT * 0.4],
      [-LCD_WIDTH * 0.43, -LCD_HEIGHT * 0.4],
      [LCD_WIDTH * 0.43, -LCD_HEIGHT * 0.4],
    ] as Array<[number, number]>) {
      const pad = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(6.2, 4.4, 1.1), 1.05, 0.1, 0.1, 10),
        mats.damperElastomer
      );
      pad.position.set(cx, cy, 0);
      dockBumpersGroup.add(pad);
    }

    // Bottom center POM tactile seating catch clip eliminating closed-monitor rattle
    const seatCatch = new THREE.Mesh(new THREE.BoxGeometry(10.8, 2.8, 1.6), mats.pomGear);
    seatCatch.position.set(0, -LCD_HEIGHT * 0.47, -0.3);
    const catchSpring = new THREE.Mesh(new THREE.BoxGeometry(8.4, 1.4, 0.3), mats.beCuSpring);
    catchSpring.position.set(0, -LCD_HEIGHT * 0.47, 0.65);
    dockBumpersGroup.add(seatCatch, catchSpring);
  }
  parts.push(
    finalizeLcdPart(
      'lcd-dock-bumper-pads',
      27,
      '#334155',
      dockBumpersGroup,
      new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -29.2),
      new THREE.Vector3(0, -30, 32),
      new THREE.Vector3(0, -30, -244),
      cp,
      0.24
    )
  );

  // =========================================================================
  // Live 4-Axis Articulation Kinematic Demo (active when assembled & physics ON)
  // =========================================================================
  const monitorParts = [
    pGlass,
    pTouchCtrl,
    pPolarizer,
    pIps,
    pBacklight,
    pLgpLed,
    pEmiThermal,
    pShell,
    pStiffener,
    pAmbColor,
    pFlipMags,
  ];

  const rig: LcdDynamicRig = {
    monitorParts,
    tiltCradleLinks,
    applyDynamics: (elapsed, physicsActive, explodeFactor, _integrated) => {
      const artBlend = physicsActive ? Math.max(0, 1 - explodeFactor * 5.0) : 0;

      if (artBlend <= 0.001) {
        for (const mp of monitorParts) {
          mp.group.rotation.set(0, 0, 0);
        }
        pHinge.group.rotation.set(0, 0, 0);
        return;
      }

      const cycle = (elapsed * 0.42) % (Math.PI * 2);
      const tiltAngle = Math.max(0, Math.sin(cycle)) * THREE.MathUtils.degToRad(38) * artBlend;
      const openAngle = Math.max(0, -Math.sin(cycle)) * THREE.MathUtils.degToRad(48) * artBlend;

      const tiltPivotY = LCD_CENTER_Y + 21.0;
      const tiltPivotZ = -30.2;
      const openPivotX = hingeWorldX;
      const openPivotZ = -30.4;

      for (const mp of monitorParts) {
        let x = mp.group.position.x;
        let y = mp.group.position.y;
        let z = mp.group.position.z;

        if (tiltAngle > 0.001) {
          const dy = y - tiltPivotY;
          const dz = z - tiltPivotZ;
          const cosT = Math.cos(-tiltAngle);
          const sinT = Math.sin(-tiltAngle);
          y = tiltPivotY + dy * cosT - dz * sinT;
          z = tiltPivotZ + dy * sinT + dz * cosT - Math.sin(tiltAngle) * 5.5;
          mp.group.position.set(x, y, z);
          mp.group.rotation.set(-tiltAngle, 0, 0);
        } else if (openAngle > 0.001) {
          const dx = x - openPivotX;
          const dz = z - openPivotZ;
          const cosO = Math.cos(openAngle);
          const sinO = Math.sin(openAngle);
          x = openPivotX + dx * cosO + dz * sinO;
          z = openPivotZ - dx * sinO + dz * cosO;
          mp.group.position.set(x, y, z);
          mp.group.rotation.set(0, openAngle, 0);
        } else {
          mp.group.rotation.set(0, 0, 0);
        }
      }

      pHinge.group.rotation.set(-tiltAngle, openAngle * 0.5, 0);
    },
  };

  return { parts, rig };
}
