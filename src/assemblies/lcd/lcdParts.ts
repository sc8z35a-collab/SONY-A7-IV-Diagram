import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createPrecisionScrew,
  createRoundedRectShape,
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
 * Build all 6 ultra-detailed CAD sub-assemblies of a 2024-2026 Flagship
 * 4-Axis Multi-Angle 3.2-Type 2.1M-Dot Rear LCD Monitor:
 * - D01: OCA Optically Bonded Aluminosilicate Touch Cover Glass & PCAP ITO Grid
 * - D02: 3.2-Type Wide-Gamut IPS Liquid Crystal Cell & COF Driver IC (live zero-text viewfinder screen)
 * - D03: Dual-BEF Micro-Prism Stack, Edge LED Array & Acrylic Light-Guide Plate
 * - D04: Ultra-Slim CNC Aluminum/Magnesium Rear Shell & Thermal Foil
 * - D05: Dual-Axis 176°/270° Vari-Angle Friction Swivel Hinge (+X side, opening clear of -X right grip!)
 * - D06: 4-Axis Optical-Axis Dual-Link Tilt Cradle Frame (mounted flush behind Mainboard at z = -28.8 mm)
 */
export function buildLcdParts(mats: MaterialLibrary): { parts: CadPart[]; rig: LcdDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const tiltCradleLinks: THREE.Group[] = [];

  // =========================================================================
  // D01: OCA Optically Bonded Cover Glass & PCAP ITO Touch Layer (z = -35.8 mm)
  // =========================================================================
  const glassGroup = new THREE.Group();
  {
    // Matte black glass outer border bezel frame (flush edge-to-edge modern flagship display)
    const bezelShape = createFrameShape(
      LCD_WIDTH,
      LCD_HEIGHT,
      3.4,
      LCD_WIDTH - 8.0,
      LCD_HEIGHT - 7.6,
      1.2
    );
    const bezelMesh = new THREE.Mesh(
      extrudeCentered(bezelShape, 0.72, 0.08, 0.08, 20),
      mats.matteBlackAnodized
    );
    glassGroup.add(bezelMesh);

    // Translucent tempered aluminosilicate cover glass pane
    const glassPane = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(LCD_WIDTH - 0.6, LCD_HEIGHT - 0.6, 3.2), 0.55, 0.04, 0.04, 18),
      mats.lcdCoverGlass
    );
    glassPane.position.z = -0.25;
    glassPane.userData.noEdges = true;
    glassGroup.add(glassPane);

    // Subtle PCAP capacitive ITO diamond sensing grid lines on inner surface
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

    // Bottom capacitive touch controller FPC tail
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
    new THREE.Vector3(0, 0, -56),
    new THREE.Vector3(0, 0, -322),
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

    // TFT-LCD glass substrate sandwich carrier
    const substrate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(cellW, cellH, 1.4), 0.75, 0.05, 0.05, 16),
      mats.siliconBulk
    );
    ipsGroup.add(substrate);

    // Active Live-View Screen surface facing -Z (photographer's view — strictly zero text!)
    const screenPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(cellW - 3.6, cellH - 3.2),
      mats.lcdLiveViewActive
    );
    screenPlane.position.z = -0.42;
    screenPlane.rotation.y = Math.PI; // Face toward -Z rear viewer cleanly!
    screenPlane.userData.noEdges = true;
    ipsGroup.add(screenPlane);

    // Perimeter thin black polarizer frame
    const polFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(cellW, cellH, 1.2, cellW - 3.6, cellH - 3.2, 0.5), 0.24, 0.02, 0.02, 14),
      mats.matteBlackAnodized
    );
    polFrame.position.z = -0.40;
    ipsGroup.add(polFrame);

    // Bottom COF (Chip-on-Film) MIPI-DSI source driver IC & flexible polyimide tab
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
    new THREE.Vector3(0, 0, -36),
    new THREE.Vector3(0, 0, -304),
    cp,
    0.24
  );
  parts.push(pIps);

  // =========================================================================
  // D03: Dual-BEF Micro-Prism Stack & Edge LED Backlight LGP (z = -32.9 mm)
  // =========================================================================
  const blGroup = new THREE.Group();
  {
    const blW = LCD_WIDTH - 5.2;
    const blH = LCD_HEIGHT - 5.2;

    // Acrylic Light-Guide Plate (LGP) + Dual BEF micro-prism luminance stack
    const prismSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(blW, blH, 1.2), 0.95, 0.05, 0.05, 16),
      mats.lcdBacklightPrism
    );
    blGroup.add(prismSheet);

    // Rear ESR 98% mirror reflector film (+Z side)
    const esrMirror = new THREE.Mesh(
      new THREE.BoxGeometry(blW - 1.2, blH - 1.2, 0.16),
      mats.stainlessMachined
    );
    esrMirror.position.z = 0.54;
    blGroup.add(esrMirror);

    // Bottom edge high-CRI white LED emitter strip (10 SMD LEDs feeding acrylic LGP)
    const ledBar = new THREE.Mesh(new THREE.BoxGeometry(blW - 6.0, 2.2, 0.95), mats.polyimideFpc);
    ledBar.position.set(0, -blH * 0.5 + 1.1, 0);
    blGroup.add(ledBar);

    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xe0f2fe,
      emissiveIntensity: 1.4,
      roughness: 0.15,
      clippingPlanes: cp,
    });
    for (let i = 0; i < 10; i++) {
      const lx = -blW * 0.42 + (i / 9) * (blW * 0.84);
      const led = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 0.8), ledMat);
      led.position.set(lx, -blH * 0.5 + 1.4, -0.15);
      led.userData.noEdges = true;
      blGroup.add(led);
    }

    // White polycarbonate light-containment surround frame
    const blFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(blW + 1.4, blH + 1.4, 1.6, blW - 0.6, blH - 0.6, 1.0), 1.25, 0.06, 0.06, 16),
      mats.ceramicAlumina
    );
    blGroup.add(blFrame);
  }
  const pBacklight = finalizeLcdPart(
    'lcd-backlight-stack',
    3,
    '#7dd3fc',
    blGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.9),
    new THREE.Vector3(0, 0, -16),
    new THREE.Vector3(0, 0, -286),
    cp,
    0.22
  );
  parts.push(pBacklight);

  // =========================================================================
  // D04: Ultra-Slim CNC Aluminum/Magnesium Monitor Rear Shell (z = -31.5 mm)
  // =========================================================================
  const shellGroup = new THREE.Group();
  {
    // Main outer slim tray chassis
    const trayBack = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(LCD_WIDTH + 1.2, LCD_HEIGHT + 1.2, 3.8), 1.4, 0.22, 0.22, 20),
      mats.bodyMgShell
    );
    trayBack.position.z = 0.2;
    shellGroup.add(trayBack);

    // Raised perimeter lip cradling D01..D03 cleanly
    const rim = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH + 1.4, LCD_HEIGHT + 1.4, 3.8, LCD_WIDTH - 1.2, LCD_HEIGHT - 1.2, 3.0),
        4.4,
        0.2,
        0.2,
        20
      ),
      mats.bodyMgShell
    );
    rim.position.z = -1.6;
    shellGroup.add(rim);

    // Interior pyrolytic graphite heat-spreader patch on inside of tray
    const graphitePad = new THREE.Mesh(
      new THREE.BoxGeometry(LCD_WIDTH - 16.0, LCD_HEIGHT - 16.0, 0.25),
      mats.pyroGraphite
    );
    graphitePad.position.set(-2.0, 0, -0.58);
    shellGroup.add(graphitePad);

    // Reinforced stainless steel hinge-boss mounting flange on +X (photographer's left) edge
    const bossPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(7.5, 22.0, 1.8), 2.4, 0.14, 0.14, 14),
      mats.stainlessMachined
    );
    bossPlate.position.set(LCD_WIDTH * 0.5 - 2.6, 0, 0.4);
    shellGroup.add(bossPlate);

    // Finger pull notch on bottom-right (-X, -Y) edge for instant tilt opening
    const fingerNotch = new THREE.Mesh(new THREE.BoxGeometry(10.0, 2.2, 1.4), mats.matteBlackAnodized);
    fingerNotch.position.set(-LCD_WIDTH * 0.28, -LCD_HEIGHT * 0.5 - 0.3, -1.2);
    shellGroup.add(fingerNotch);

    // Hall-effect stowage detection micro-magnet on lower -X inner rim
    const stowMag = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.8, 0.9), mats.neodymiumMagnet);
    stowMag.position.set(-LCD_WIDTH * 0.4, -LCD_HEIGHT * 0.36, 0.8);
    shellGroup.add(stowMag);
  }
  const pShell = finalizeLcdPart(
    'lcd-chassis-shell',
    4,
    '#334155',
    shellGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.5),
    new THREE.Vector3(0, 0, 4),
    new THREE.Vector3(0, 0, -268),
    cp,
    0.24
  );
  parts.push(pShell);

  // =========================================================================
  // D05: Dual-Axis 176°/270° Vari-Angle Friction Swivel Hinge (+X side, z = -30.4 mm)
  // =========================================================================
  const hingeGroup = new THREE.Group();
  {
    // Main vertical open-axis barrel (176° side-swing axis along Y!)
    const vertBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(3.1, 3.1, 22.0, 24),
      mats.stainlessMachined
    );
    hingeGroup.add(vertBarrel);

    // Stacked Belleville spring friction washers along vertical barrel
    for (let i = -3; i <= 3; i++) {
      const washer = new THREE.Mesh(
        new THREE.CylinderGeometry(3.75, 3.75, 0.65, 22),
        i % 2 === 0 ? mats.brassGear : mats.stainlessMachined
      );
      washer.position.y = i * 2.4;
      hingeGroup.add(washer);
    }

    // Horizontal swivel shaft extending into monitor shell (270° rotation axis along X!)
    const swivelShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 10.5, 22).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    swivelShaft.position.set(-4.8, 0, -0.6);
    hingeGroup.add(swivelShaft);

    // Swivel friction cam yoke collar connecting vertical & horizontal axes
    const yokeBlock = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(8.4, 9.6, 2.2), 6.2, 0.18, 0.18, 16),
      mats.bodyMgShell
    );
    yokeBlock.position.set(-0.6, 0, -0.2);
    hingeGroup.add(yokeBlock);

    // Coiled flexible display polyimide FPC routed safely through hollow hinge core!
    const fpcLoopPts = [
      new THREE.Vector3(-8.0, 2.5, -0.8),
      new THREE.Vector3(-2.5, 3.8, 0.8),
      new THREE.Vector3(2.0, 1.0, 2.4),
      new THREE.Vector3(0.4, -3.5, 1.8),
      new THREE.Vector3(-5.2, -5.0, 1.4),
    ];
    const fpcCurve = new THREE.CatmullRomCurve3(fpcLoopPts);
    const fpcRibbon = new THREE.Mesh(
      new THREE.TubeGeometry(fpcCurve, 28, 0.85, 8, false),
      mats.polyimideFpc
    );
    hingeGroup.add(fpcRibbon);

    // Dual hinge bracket anchor screws
    for (const sy of [-8.2, 8.2]) {
      const scr = createPrecisionScrew(1.1, 0.55, 1.8, mats.stainlessMachined);
      scr.position.set(1.8, sy, 1.8);
      hingeGroup.add(scr);
    }
  }
  const pHinge = finalizeLcdPart(
    'lcd-swivel-hinge',
    5,
    '#d97706',
    hingeGroup,
    new THREE.Vector3(LCD_CENTER_X + LCD_WIDTH * 0.5 + 1.8, LCD_CENTER_Y, -30.4),
    new THREE.Vector3(28, 0, 14),
    new THREE.Vector3(30, 0, -254),
    cp,
    0.24
  );
  parts.push(pHinge);

  // =========================================================================
  // D06: 4-Axis Optical-Axis Dual-Link Tilt Cradle Frame (z = -28.8 mm)
  // =========================================================================
  const cradleGroup = new THREE.Group();
  {
    // Main recessed camera-back stainless/magnesium mounting frame sitting flush behind Mainboard!
    const baseFrame = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH + 2.4, LCD_HEIGHT + 2.2, 3.8, LCD_WIDTH - 14.0, LCD_HEIGHT - 14.0, 2.4),
        1.8,
        0.16,
        0.16,
        20
      ),
      mats.magnesiumCast
    );
    baseFrame.position.z = 0.6;
    cradleGroup.add(baseFrame);

    // Movable inner tilt cradle carrier frame (links directly to the +X vari-angle hinge!)
    const innerCradle = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH - 2.0, LCD_HEIGHT - 4.0, 2.8, LCD_WIDTH - 16.0, LCD_HEIGHT - 16.0, 2.0),
        1.5,
        0.12,
        0.12,
        18
      ),
      mats.stainlessMachined
    );
    innerCradle.position.z = -0.9;
    cradleGroup.add(innerCradle);

    // Symmetrical Left & Right Dual-Link Pantograph Scissors Arms (the secret of 4-Axis Tilt!)
    for (const sx of [-1, 1]) {
      const linkPair = new THREE.Group();
      linkPair.position.set(sx * (LCD_WIDTH * 0.42), 0, -0.1);

      // Upper primary tilt arm
      const arm1 = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.6, 28.0, 1.4), 1.1, 0.08, 0.08, 12),
        mats.stainlessMachined
      );
      arm1.position.set(0, 4.0, -0.4);
      arm1.rotation.z = sx * 0.14;
      linkPair.add(arm1);

      // Lower secondary counter-link arm
      const arm2 = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(3.0, 22.0, 1.2), 1.0, 0.08, 0.08, 12),
        mats.brassGear
      );
      arm2.position.set(-sx * 2.2, -5.0, 0.35);
      arm2.rotation.z = -sx * 0.18;
      linkPair.add(arm2);

      // Top & bottom hardened stainless pivot rivets
      for (const py of [-13.5, 0, 14.5]) {
        const rivet = new THREE.Mesh(
          new THREE.CylinderGeometry(1.45, 1.45, 2.4, 14).rotateX(Math.PI / 2),
          mats.stainlessMachined
        );
        rivet.position.set(0, py, 0);
        linkPair.add(rivet);
      }

      cradleGroup.add(linkPair);
      tiltCradleLinks.push(linkPair);
    }

    // Mainboard B2B display FPC pass-through slot & grommet on right side
    const fpcPort = new THREE.Mesh(new THREE.BoxGeometry(14.0, 4.0, 1.4), mats.polyimideFpc);
    fpcPort.position.set(LCD_WIDTH * 0.36, -6.0, 1.2);
    cradleGroup.add(fpcPort);

    // 4 Corner mounting screws bolting cradle frame to rear camera chassis
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
  const pCradle = finalizeLcdPart(
    'lcd-4axis-tilt-frame',
    6,
    '#64748b',
    cradleGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -28.8),
    new THREE.Vector3(0, 0, 26),
    new THREE.Vector3(0, 0, -246),
    cp,
    0.24
  );
  parts.push(pCradle);

  // =========================================================================
  // Live 4-Axis Articulation Kinematic Demo (active when assembled & physics ON)
  // =========================================================================
  const monitorParts = [pGlass, pIps, pBacklight, pShell];

  const rig: LcdDynamicRig = {
    monitorParts,
    tiltCradleLinks,
    applyDynamics: (elapsed, physicsActive, explodeFactor, _integrated) => {
      // Smoothly phase out articulated swing as user drags explode slider so flat axial explosion stays crystal-clear!
      const artBlend = physicsActive ? Math.max(0, 1 - explodeFactor * 5.0) : 0;

      if (artBlend <= 0.001) {
        for (const mp of monitorParts) {
          mp.group.rotation.set(0, 0, 0);
        }
        pHinge.group.rotation.set(0, 0, 0);
        return;
      }

      // Alternating 4-axis showcase: Phase A = Optical-axis Upward Tilt (0..38°), Phase B = Side-Opening Vari-Angle Swing (+X)!
      const cycle = (elapsed * 0.42) % (Math.PI * 2);
      const tiltAngle = Math.max(0, Math.sin(cycle)) * THREE.MathUtils.degToRad(38) * artBlend;
      const openAngle = Math.max(0, -Math.sin(cycle)) * THREE.MathUtils.degToRad(48) * artBlend;

      // Tilt pivot along top optical-axis edge of cradle (y = LCD_CENTER_Y + 22, z = -29.8)
      const tiltPivotY = LCD_CENTER_Y + 21.0;
      const tiltPivotZ = -30.2;

      // Vari-angle pivot along +X swivel hinge axis (x = LCD_CENTER_X + LCD_WIDTH/2 + 1.8, z = -30.4)
      const openPivotX = LCD_CENTER_X + LCD_WIDTH * 0.5 + 1.8;
      const openPivotZ = -30.4;

      for (const mp of monitorParts) {
        // Start from assembled position
        let x = mp.group.position.x;
        let y = mp.group.position.y;
        let z = mp.group.position.z;

        if (tiltAngle > 0.001) {
          // Rotate around X axis (bottom edge tilts rearward toward -Z / upward facing photographer!)
          const dy = y - tiltPivotY;
          const dz = z - tiltPivotZ;
          const cosT = Math.cos(-tiltAngle);
          const sinT = Math.sin(-tiltAngle);
          y = tiltPivotY + dy * cosT - dz * sinT;
          z = tiltPivotZ + dy * sinT + dz * cosT - Math.sin(tiltAngle) * 5.5;
          mp.group.position.set(x, y, z);
          mp.group.rotation.set(-tiltAngle, 0, 0);
        } else if (openAngle > 0.001) {
          // Swing monitor outward around +X hinge toward -Z/+X
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
