//@FLOW_MAP|file=src/assemblies/lcd/lcdParts.ts|unit=lcd|lines=1660|exports=LCD_CENTER_X,LCD_CENTER_Y,LCD_WIDTH,LCD_HEIGHT,LcdDynamicRig,buildLcdParts
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
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildPhillipsScrew,
  buildSmdPassive,
  createChamferedBoxGeo,
  hiResCyl,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

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
    explanation: lazyExplanationStub(id),
  };
}

/**
 * Build ALL 27 core watchmaker CAD sub-assemblies of a 2024-2026 Flagship
 * 4-Axis Multi-Angle 3.2-Type 2.1M-Dot Rear LCD Monitor & Pantograph/Vari-Angle Hinge (D01–D27).
 * Phase 36 Ultra-HD Surface, Texture & Micro-Geometry Overhaul across ALL 27 core parts.
 */
export function buildLcdParts(
  mats: MaterialLibrary,
  _includeStandalone = true
): { parts: CadPart[]; rig: LcdDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;
  const tiltCradleLinks: THREE.Group[] = [];
  const hingeWorldX = LCD_CENTER_X + LCD_WIDTH * 0.5 + 1.8;

  // =========================================================================
  // D01: OCA Optically Bonded Cover Glass & PCAP ITO Touch Layer (z = -35.8 mm)
  // =========================================================================
  const glassGroup = new THREE.Group();
  {
    // Jet-black ceramic-frit front cover glass bezel with crisp silkscreened SONY logo & ALS sensor window
    const bezelShape = createFrameShape(
      LCD_WIDTH,
      LCD_HEIGHT,
      3.4,
      LCD_WIDTH - 8.0,
      LCD_HEIGHT - 7.6,
      1.2
    );
    const bezelGeo = extrudeCentered(bezelShape, 0.72, 0.08, 0.08, 22);
    applyPlanarUVs(bezelGeo, LCD_WIDTH, LCD_HEIGHT, 'xy-back');
    glassGroup.add(new THREE.Mesh(bezelGeo, u.lcdFrontBezelGlass));

    // Precision 2.5D diamond-chamfered sapphire-hard aluminosilicate outer edge rim
    const outerChamfer = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH + 0.15, LCD_HEIGHT + 0.15, 3.45, LCD_WIDTH - 1.2, LCD_HEIGHT - 1.2, 2.9),
        0.58,
        0.05,
        0.05,
        20
      ),
      u.lcdBrushedSus304Blu
    );
    outerChamfer.position.z = 0.06;
    glassGroup.add(outerChamfer);

    // Crystal-clear AR-coated optical glass viewing window (zero hazy foreground bars!)
    const glassPane = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(LCD_WIDTH - 0.8, LCD_HEIGHT - 0.8, 3.2), 0.50, 0.04, 0.04, 18),
      mats.lcdCoverGlass
    );
    glassPane.position.z = -0.22;
    glassPane.userData.noEdges = true;
    glassGroup.add(glassPane);

    // Hidden bezel-perimeter silver micro-routing bus strip along lower rear rim (tucked behind black frit)
    const busStripGeo = createChamferedBoxGeo(LCD_WIDTH - 12.0, 2.2, 0.08, 0.2, 0.02, 'z');
    applyPlanarUVs(busStripGeo, LCD_WIDTH - 12.0, 2.2, 'xy-back');
    const busStrip = new THREE.Mesh(busStripGeo, u.lcdSilverBezelBus);
    busStrip.position.set(0, -LCD_HEIGHT * 0.5 + 2.4, 0.36);
    glassGroup.add(busStrip);

    // Multi-trace polyimide PCAP touch tail FPC with gold contact fingers & FR-4 stiffener
    const touchFpcGeo = createChamferedBoxGeo(11.6, 4.4, 0.24, 0.3, 0.03, 'z');
    applyPlanarUVs(touchFpcGeo, 11.6, 4.4, 'xy-back');
    const touchFpc = new THREE.Mesh(touchFpcGeo, u.lcdFpcFlexCircuit);
    touchFpc.position.set(16.0, -LCD_HEIGHT * 0.5 + 1.9, 0.36);
    glassGroup.add(touchFpc);

    for (let p = 0; p < 8; p++) {
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.3, 0.14), mats.goldPlating);
      finger.position.set(12.2 + p * 1.1, -LCD_HEIGHT * 0.5 + 0.55, 0.44);
      finger.userData.noEdges = true;
      glassGroup.add(finger);
    }
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

    // Alkali-free twin-glass laminated IPS cell body with LTPS micro-pattern visible on rear face
    const cellBodyGeo = extrudeCentered(createRoundedRectShape(cellW, cellH, 1.4), 0.72, 0.05, 0.05, 16);
    applyPlanarUVs(cellBodyGeo, cellW, cellH, 'xy');
    ipsGroup.add(new THREE.Mesh(cellBodyGeo, u.lcdLtpsTftSilicon));

    // Vibrant 2.1M-dot live-view active display plane (faces -Z viewer cleanly!)
    const screenPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(cellW - 3.6, cellH - 3.2),
      mats.lcdLiveViewActive
    );
    screenPlane.position.z = -0.40;
    screenPlane.rotation.y = Math.PI;
    screenPlane.userData.noEdges = true;
    ipsGroup.add(screenPlane);

    // Matte-black polarizer light-seal bezel step framing active display aperture
    const polFrameGeo = extrudeCentered(
      createFrameShape(cellW, cellH, 1.2, cellW - 3.6, cellH - 3.2, 0.5),
      0.24,
      0.02,
      0.02,
      14
    );
    applyBoxUVs(polFrameGeo, 16);
    const polFrame = new THREE.Mesh(polFrameGeo, u.lcdMaHingeMg);
    polFrame.position.z = -0.38;
    ipsGroup.add(polFrame);

    // Corner precision glass-cell laser alignment fiducials
    for (const [fx, fy] of [
      [-cellW * 0.48, cellH * 0.48],
      [cellW * 0.48, cellH * 0.48],
    ]) {
      const fid = new THREE.Mesh(hiResCyl(0.55, 0.55, 0.14, 12).rotateX(Math.PI / 2), mats.goldPlating);
      fid.position.set(fx, fy, -0.48);
      fid.userData.noEdges = true;
      ipsGroup.add(fid);
    }

    // Extended COF polyimide ribbon with fine copper routing + ACF gold microsphere bond zone (tucked flush in chin)
    const cofGeo = createChamferedBoxGeo(26.4, 4.4, 0.24, 0.3, 0.02, 'z');
    applyPlanarUVs(cofGeo, 26.4, 4.4, 'xy-back');
    const cofFilm = new THREE.Mesh(cofGeo, u.lcdFpcFlexCircuit);
    cofFilm.position.set(-4.0, -cellH * 0.5 + 0.65, 0.24);
    ipsGroup.add(cofFilm);

    const acfBondGeo = createChamferedBoxGeo(22.0, 1.5, 0.14, 0.15, 0.02, 'z');
    applyPlanarUVs(acfBondGeo, 22.0, 1.5, 'xy-back');
    const acfBond = new THREE.Mesh(acfBondGeo, u.lcdAcfGoldMicrospheres);
    acfBond.position.set(-4.0, -cellH * 0.5 + 1.55, 0.36);
    ipsGroup.add(acfBond);

    // Elongated bare-silicon COG/COF Display Driver IC die with visible floorplan & UV dam fillet
    const ddicGeo = createChamferedBoxGeo(15.2, 2.2, 0.54, 0.14, 0.04, 'z');
    applyPlanarUVs(ddicGeo, 15.2, 2.2, 'xy-back');
    const driverIc = new THREE.Mesh(ddicGeo, u.lcdDdicSiliconDie);
    driverIc.position.set(-4.0, -cellH * 0.5 + 0.65, 0.52);
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

    // Front Horizontal-Groove V-BEF micro-prism optical sheet
    const vBefGeo = extrudeCentered(createRoundedRectShape(blW, blH, 1.2), 0.20, 0.02, 0.02, 16);
    applyBoxUVs(vBefGeo, 18);
    const vBef = new THREE.Mesh(vBefGeo, u.lcdBefPrismGroovesV);
    vBef.position.z = -0.18;
    blGroup.add(vBef);

    // Crossed 90° Vertical-Groove H-BEF micro-prism optical sheet
    const hBefGeo = extrudeCentered(createRoundedRectShape(blW - 0.3, blH - 0.3, 1.1), 0.20, 0.02, 0.02, 16);
    applyBoxUVs(hBefGeo, 18);
    const hBef = new THREE.Mesh(hBefGeo, u.lcdBefPrismGroovesH);
    hBef.position.z = 0.08;
    blGroup.add(hBef);

    // White high-reflectance TiO2 perimeter cradle collar with keyed alignment ears
    const cradleGeo = extrudeCentered(
      createFrameShape(blW + 1.4, blH + 1.4, 1.6, blW - 0.6, blH - 0.6, 1.0),
      0.78,
      0.05,
      0.05,
      16
    );
    applyBoxUVs(cradleGeo, 20);
    blGroup.add(new THREE.Mesh(cradleGeo, u.lcdDiffuserMicroBeads));

    for (const [ex, ey] of [
      [-blW * 0.32, blH * 0.5 + 0.55],
      [blW * 0.26, blH * 0.5 + 0.55],
      [0, -blH * 0.5 - 0.55],
    ]) {
      const ear = new THREE.Mesh(createChamferedBoxGeo(4.4, 1.2, 0.26, 0.2, 0.02, 'z'), mats.goldPlating);
      ear.position.set(ex, ey, -0.18);
      blGroup.add(ear);
    }
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
    // Main AZ91D die-cast magnesium rear tray with authentic Sony Alpha rear laser-etched finish
    const trayGeo = extrudeCentered(createRoundedRectShape(LCD_WIDTH + 1.2, LCD_HEIGHT + 1.2, 3.8), 1.4, 0.22, 0.22, 22);
    applyPlanarUVs(trayGeo, LCD_WIDTH + 1.2, LCD_HEIGHT + 1.2, 'xy');
    const trayBack = new THREE.Mesh(trayGeo, u.lcdRearShellMgLabel);
    trayBack.position.z = 0.2;
    shellGroup.add(trayBack);

    // Micro-pebbled matte satin magnesium perimeter wrap-around wall
    const rimGeo = extrudeCentered(
      createFrameShape(LCD_WIDTH + 1.4, LCD_HEIGHT + 1.4, 3.8, LCD_WIDTH - 1.2, LCD_HEIGHT - 1.2, 3.0),
      4.4,
      0.2,
      0.2,
      22
    );
    applyBoxUVs(rimGeo, 18);
    const rim = new THREE.Mesh(rimGeo, u.lcdMaHingeMg);
    rim.position.z = -1.6;
    shellGroup.add(rim);

    // Internal cast structural cross-ribs & 4 brass threaded M1.4 corner insert bosses
    for (const ry of [-12.0, 12.0]) {
      const rib = new THREE.Mesh(createChamferedBoxGeo(LCD_WIDTH - 14.0, 1.5, 0.65, 0.2, 0.04, 'z'), u.lcdMaHingeMg);
      rib.position.set(-2.0, ry, -0.58);
      shellGroup.add(rib);
    }
    for (const [bx, by] of [
      [-LCD_WIDTH * 0.44, LCD_HEIGHT * 0.42],
      [LCD_WIDTH * 0.44, LCD_HEIGHT * 0.42],
      [-LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.42],
      [LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.42],
    ]) {
      const insert = new THREE.Mesh(hiResCyl(1.45, 1.45, 1.0, 16).rotateX(Math.PI / 2), mats.brassGear);
      insert.position.set(bx, by, -0.45);
      shellGroup.add(insert);
    }

    // Brushed SUS304 CNC hinge reinforcement boss plate with 4 countersunk micro-screws
    const bossGeo = extrudeCentered(createRoundedRectShape(7.6, 22.4, 1.8), 2.4, 0.14, 0.14, 16);
    applyBoxUVs(bossGeo, 16);
    const bossPlate = new THREE.Mesh(bossGeo, u.lcdBrushedSus304Blu);
    bossPlate.position.set(LCD_WIDTH * 0.5 - 2.6, 0, 0.4);
    shellGroup.add(bossPlate);

    for (const sy of [-7.8, 7.8]) {
      const scr = buildPhillipsScrew(1.15, 0.5, 0.58, 2.2, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
      scr.rotation.x = Math.PI / 2;
      scr.position.set(LCD_WIDTH * 0.5 - 2.6, sy, 1.55);
      shellGroup.add(scr);
    }

    // Ergonomic sculpted thumb-lift finger scoop with tactile micro-ridges
    const fingerNotch = new THREE.Mesh(createChamferedBoxGeo(10.6, 2.3, 1.4, 0.6, 0.12, 'z'), u.lcdMaHingeMg);
    fingerNotch.position.set(-LCD_WIDTH * 0.28, -LCD_HEIGHT * 0.5 - 0.3, -1.2);
    shellGroup.add(fingerNotch);
    for (let r = -3; r <= 3; r++) {
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.4, 0.3), mats.stainlessMachined);
      grip.position.set(-LCD_WIDTH * 0.28 + r * 1.15, -LCD_HEIGHT * 0.5 - 0.35, -1.85);
      grip.userData.noEdges = true;
      shellGroup.add(grip);
    }
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
  // D05: Dual-Axis Magnetic Hall Flip/Stow Orientation Sensor & Magnets (z = -30.9 mm)
  // =========================================================================
  const hallGroup = new THREE.Group();
  {
    const hallPcbGeo = extrudeCentered(createRoundedRectShape(16.4, 5.8, 1.0), 0.85, 0.05, 0.05, 14);
    applyPlanarUVs(hallPcbGeo, 16.4, 5.8, 'xy-back');
    const hallPcb = new THREE.Mesh(hallPcbGeo, u.lcdPcbPd1072HiRes);
    hallPcb.position.set(-LCD_WIDTH * 0.32, -LCD_HEIGHT * 0.36, 0.2);
    hallGroup.add(hallPcb);

    for (const dx of [-4.2, 4.2]) {
      const hallIc = buildChipPackage({
        w: 2.6,
        d: 2.4,
        h: 0.72,
        style: 'qfn',
        pinsPerSide: 4,
        bodyMat: u.lcdAudioDisplayChipDie,
        leadMat: mats.goldPlating,
        axis: 'z',
      });
      hallIc.position.set(-LCD_WIDTH * 0.32 + dx, -LCD_HEIGHT * 0.36, -0.58);
      hallGroup.add(hallIc);
    }

    // 0201 decoupling MLCCs & gold test pads between dual Hall ICs
    for (const dy of [-1.4, 1.4]) {
      const cap = buildSmdPassive(1.2, 0.65, 0.45, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(-LCD_WIDTH * 0.32, -LCD_HEIGHT * 0.36 + dy, -0.45);
      hallGroup.add(cap);
    }

    // Twin N52 trigger magnets with N/S polarity laser stripes
    const stowMag = new THREE.Mesh(createChamferedBoxGeo(4.4, 2.3, 1.1, 0.2, 0.05, 'z'), mats.neodymiumMagnet);
    stowMag.position.set(-LCD_WIDTH * 0.36, -LCD_HEIGHT * 0.36, -0.82);
    const stowN = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.34, 0.12), mats.bodyRecRed);
    stowN.position.set(-LCD_WIDTH * 0.36 - 1.1, -LCD_HEIGHT * 0.36, -1.38);
    stowN.userData.noEdges = true;
    hallGroup.add(stowMag, stowN);

    const flipMag = new THREE.Mesh(createChamferedBoxGeo(3.6, 2.6, 1.1, 0.2, 0.05, 'z'), mats.neodymiumMagnet);
    flipMag.position.set(LCD_WIDTH * 0.4, 7.5, -0.4);
    const flipN = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.64, 0.12), mats.bodyRecRed);
    flipN.position.set(LCD_WIDTH * 0.4 - 0.85, 7.5, -0.96);
    flipN.userData.noEdges = true;
    hallGroup.add(flipMag, flipN);

    const hallFlexGeo = createChamferedBoxGeo(3.4, 14.2, 0.24, 0.2, 0.02, 'z');
    applyPlanarUVs(hallFlexGeo, 3.4, 14.2, 'xy-back');
    const hallFlex = new THREE.Mesh(hallFlexGeo, u.lcdFpcFlexCircuit);
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
  // D06: 270° Horizontal-Axis Belleville Disc-Spring Friction Torque Clutch
  // =========================================================================
  const clutchGroup = new THREE.Group();
  {
    // Brushed D-cut hollow stainless torque shaft core
    const shaftGeo = hiResCyl(2.0, 2.0, 11.8, 22).rotateZ(Math.PI / 2);
    applyBoxUVs(shaftGeo, 8);
    const coreShaft = new THREE.Mesh(shaftGeo, u.lcdBrushedSus304Blu);
    coreShaft.position.set(-4.8, 0, -0.6);
    clutchGroup.add(coreShaft);

    // Milled D-flat keyway along torque shaft preventing Belleville washers from spinning
    const keyFlat = new THREE.Mesh(createChamferedBoxGeo(9.2, 0.38, 1.8, 0.1, 0.03, 'z'), mats.titaniumRivet);
    keyFlat.position.set(-4.8, 1.82, -0.6);
    clutchGroup.add(keyFlat);

    // 10 alternating conical Belleville disc springs (laser-dimpled steel) & sintered bronze friction washers
    for (let i = 0; i < 10; i++) {
      const isSpring = i % 2 === 0;
      const dGeo = hiResCyl(3.58, isSpring ? 3.18 : 3.58, 0.52, 24).rotateZ(Math.PI / 2);
      applyBoxUVs(dGeo, 6);
      const disc = new THREE.Mesh(dGeo, isSpring ? u.lcdLaserDimpleFriction : u.lcdSinteredBronzePore);
      disc.position.set(-1.0 - i * 0.85, 0, -0.6);
      clutchGroup.add(disc);
    }

    // Precision serrated flange hex torque-calibration lock nut + blue nylon locking insert
    const lockNut = new THREE.Mesh(hiResCyl(2.95, 2.95, 1.4, 6).rotateZ(Math.PI / 2), u.lcdBrushedSus304Blu);
    lockNut.position.set(-9.9, 0, -0.6);
    const nyloc = new THREE.Mesh(hiResTorus(2.05, 0.28, 10, 18), mats.mountThreadLockBlue);
    nyloc.rotation.y = Math.PI / 2;
    nyloc.position.set(-10.65, 0, -0.6);
    clutchGroup.add(lockNut, nyloc);
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
    const barrelGeo = hiResCyl(3.1, 3.1, 22.2, 24);
    applyBoxUVs(barrelGeo, 10);
    const vertBarrel = new THREE.Mesh(barrelGeo, u.lcdBrushedSus304Blu);
    hingeGroup.add(vertBarrel);

    // Sintered bronze & laser-dimpled friction thrust washers along vertical swivel axis
    for (let i = -3; i <= 3; i++) {
      const wGeo = hiResCyl(3.78, 3.78, 0.58, 22);
      applyBoxUVs(wGeo, 8);
      const washer = new THREE.Mesh(wGeo, i % 2 === 0 ? u.lcdSinteredBronzePore : u.lcdLaserDimpleFriction);
      washer.position.y = i * 2.45;
      hingeGroup.add(washer);
    }

    // Top & bottom chamfered stainless end-caps
    for (const ey of [-11.3, 11.3]) {
      const cap = new THREE.Mesh(hiResCyl(3.35, 3.35, 0.65, 22), mats.titaniumRivet);
      cap.position.y = ey;
      hingeGroup.add(cap);
    }

    // Die-cast magnesium pivot yoke block with satin powder-coat texture & milled lightening step
    const yokeGeo = extrudeCentered(createRoundedRectShape(8.4, 9.8, 2.2), 6.2, 0.18, 0.18, 18);
    applyBoxUVs(yokeGeo, 12);
    const yokeBlock = new THREE.Mesh(yokeGeo, u.lcdMaHingeMg);
    yokeBlock.position.set(-0.6, 0, -0.2);
    hingeGroup.add(yokeBlock);

    for (const sy of [-8.2, 8.2]) {
      const scr = buildPhillipsScrew(1.15, 0.55, 0.55, 1.8, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
      scr.rotation.x = Math.PI / 2;
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
  // D08: 0° / 90° / 180° Steel Detent Ball & Hardened MIM Stop-Cam Collar
  // =========================================================================
  const detentGroup = new THREE.Group();
  {
    const camGeo = hiResCyl(4.25, 4.25, 3.2, 26);
    applyBoxUVs(camGeo, 8);
    const stopCam = new THREE.Mesh(camGeo, u.lcdLaserDimpleFriction);
    stopCam.position.set(0, -6.2, 0);
    detentGroup.add(stopCam);

    // 3 Precision 0° / 90° / 180° V-detent index notches around cam rim
    for (const a of [0, Math.PI * 0.5, Math.PI]) {
      const notch = new THREE.Mesh(createChamferedBoxGeo(0.75, 1.6, 0.75, 0.1, 0.03, 'z'), mats.matteBlackAnodized);
      notch.position.set(Math.cos(a) * 4.15, -6.2, Math.sin(a) * 4.15);
      notch.rotation.y = -a;
      detentGroup.add(notch);
    }

    // Hardened MIM stop lug + bronze bushing sleeve
    const stopLug = new THREE.Mesh(createChamferedBoxGeo(2.4, 2.8, 3.6, 0.3, 0.08, 'z'), u.lcdBrushedSus304Blu);
    stopLug.position.set(3.2, -6.2, -1.6);
    detentGroup.add(stopLug);

    // Mirror-polished chrome steel detent ball bearing + coiled spring + brass plunger cup
    const detentBall = new THREE.Mesh(new THREE.SphereGeometry(1.25, 16, 14), mats.mountStainlessFlange);
    detentBall.position.set(-4.3, -6.2, 0);
    detentGroup.add(detentBall);

    const detSpring = new THREE.Mesh(
      createHelicalSpringGeometry(0.9, 4.2, 5, 0.22).rotateY(Math.PI / 2),
      mats.brassGear
    );
    detSpring.position.set(-6.8, -6.2, 0);
    detSpring.userData.noEdges = true;
    detentGroup.add(detSpring);

    const plungerCup = new THREE.Mesh(hiResCyl(1.35, 1.35, 2.2, 16).rotateZ(Math.PI / 2), u.lcdSinteredBronzePore);
    plungerCup.position.set(-8.6, -6.2, 0);
    detentGroup.add(plungerCup);

    const bumperGeo = createChamferedBoxGeo(1.7, 2.5, 1.8, 0.3, 0.08, 'z');
    applyBoxUVs(bumperGeo, 8);
    const bumper = new THREE.Mesh(bumperGeo, u.lcdPoronAcousticFoam);
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
  // D09: Hollow-Shaft Helical Torsion-Relief Coaxial MIPI-DSI Flex Harness
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
    const fpcRibbon = new THREE.Mesh(new THREE.TubeGeometry(fpcCurve, 32, 0.92, 10, false), u.lcdFpcFlexCircuit);
    fpcRibbon.userData.noEdges = true;
    fpcGroup.add(fpcRibbon);

    // Conductive Ni/Cu ripstop braided EMI noise-shield wrap sleeve over coaxial hinge loop
    const sleeveGeo = hiResCyl(1.52, 1.52, 6.4, 18);
    applyBoxUVs(sleeveGeo, 8);
    const shieldSleeve = new THREE.Mesh(sleeveGeo, u.lcdNiCuConductiveFoam);
    shieldSleeve.position.set(1.8, -1.2, 2.2);
    fpcGroup.add(shieldSleeve);

    // Dual 30-pin fine-pitch B2B connectors with visible gold pin rows & steel hold-down brackets
    for (const [cx, cy, cz, w, h] of [
      [-9.2, 2.5, -0.8, 3.8, 4.4],
      [-10.2, -6.0, 1.8, 4.4, 4.8],
    ]) {
      const body = new THREE.Mesh(createChamferedBoxGeo(w, h, 0.85, 0.25, 0.06, 'z'), mats.zifIvoryPlastic);
      body.position.set(cx, cy, cz);
      const pins = new THREE.Mesh(new THREE.BoxGeometry(w + 0.5, h - 0.6, 0.35), mats.goldPlating);
      pins.position.set(cx, cy, cz + 0.12);
      const clamp = new THREE.Mesh(createChamferedBoxGeo(w - 0.8, h + 0.6, 0.26, 0.15, 0.03, 'z'), u.lcdBrushedSus304Blu);
      clamp.position.set(cx, cy, cz - 0.52);
      fpcGroup.add(body, pins, clamp);
    }
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
  // D10: Symmetrical CNC Stainless Dual-Link 4-Axis Tilt Pantograph Arms (z = -29.4 mm)
  // =========================================================================
  const pantoGroup = new THREE.Group();
  {
    const cradleGeo = extrudeCentered(
      createFrameShape(LCD_WIDTH - 2.0, LCD_HEIGHT - 4.0, 2.8, LCD_WIDTH - 16.0, LCD_HEIGHT - 16.0, 2.0),
      1.4,
      0.12,
      0.12,
      18
    );
    applyBoxUVs(cradleGeo, 18);
    const innerCradle = new THREE.Mesh(cradleGeo, u.lcdBrushedSus304Blu);
    innerCradle.position.z = -0.4;
    pantoGroup.add(innerCradle);

    for (const sx of [-1, 1]) {
      const linkPair = new THREE.Group();
      linkPair.position.set(sx * (LCD_WIDTH * 0.42), 0, 0.2);

      // CNC stainless primary scissor link with weight-saving milled slot
      const arm1Geo = extrudeCentered(
        createFrameShape(3.8, 28.4, 1.4, 1.2, 16.0, 0.55),
        1.1,
        0.08,
        0.08,
        14
      );
      applyBoxUVs(arm1Geo, 10);
      const arm1 = new THREE.Mesh(arm1Geo, u.lcdBrushedSus304Blu);
      arm1.position.set(0, 4.0, -0.4);
      arm1.rotation.z = sx * 0.14;
      linkPair.add(arm1);

      // Sintered bronze secondary cross-link arm
      const arm2Geo = extrudeCentered(createRoundedRectShape(3.0, 22.4, 1.2), 1.0, 0.08, 0.08, 14);
      applyBoxUVs(arm2Geo, 10);
      const arm2 = new THREE.Mesh(arm2Geo, u.lcdSinteredBronzePore);
      arm2.position.set(-sx * 2.2, -5.0, 0.35);
      arm2.rotation.z = -sx * 0.18;
      linkPair.add(arm2);

      for (const py of [-13.5, 0, 14.5]) {
        const rivet = new THREE.Mesh(hiResCyl(1.48, 1.48, 2.45, 16).rotateX(Math.PI / 2), mats.titaniumRivet);
        rivet.position.set(0, py, 0);
        const pomBush = new THREE.Mesh(hiResCyl(1.88, 1.88, 0.45, 16).rotateX(Math.PI / 2), mats.pomGear);
        pomBush.position.set(0, py, -0.75);
        linkPair.add(rivet, pomBush);
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
  // D11: Optical-Axis Tilt Friction Drum Brakes & Torsion Assist Springs (z = -29.2 mm)
  // =========================================================================
  const tiltTorqueGroup = new THREE.Group();
  {
    for (const sx of [-1, 1]) {
      const drumX = sx * (LCD_WIDTH * 0.34);
      const drumY = LCD_HEIGHT * 0.36;

      const drumGeo = hiResCyl(3.25, 3.25, 7.6, 22).rotateZ(Math.PI / 2);
      applyBoxUVs(drumGeo, 8);
      const drum = new THREE.Mesh(drumGeo, u.lcdLaserDimpleFriction);
      drum.position.set(drumX, drumY, 0);
      tiltTorqueGroup.add(drum);

      const bandGeo = hiResCyl(3.72, 3.72, 3.8, 22).rotateZ(Math.PI / 2);
      applyBoxUVs(bandGeo, 8);
      const bandClamp = new THREE.Mesh(bandGeo, u.lcdMaHingeMg);
      bandClamp.position.set(drumX, drumY, 0);
      tiltTorqueGroup.add(bandClamp);

      // Tensioning pinch lug & calibration bolt on friction band clamp
      const clampLug = new THREE.Mesh(createChamferedBoxGeo(1.8, 2.2, 2.4, 0.2, 0.05, 'z'), u.lcdBrushedSus304Blu);
      clampLug.position.set(drumX, drumY - 3.6, 0);
      tiltTorqueGroup.add(clampLug);

      const assistSpring = new THREE.Mesh(
        createTorsionSpringGeometry(2.1, 4.2, 5, 0.3, 4.2).rotateY(Math.PI / 2),
        mats.mountSpringSteel
      );
      assistSpring.position.set(drumX - sx * 6.5, drumY, 0);
      assistSpring.userData.noEdges = true;
      tiltTorqueGroup.add(assistSpring);

      // Circlip retainer collar
      const clip = new THREE.Mesh(hiResTorus(1.45, 0.22, 10, 18), mats.beCuSpring);
      clip.rotation.y = Math.PI / 2;
      clip.position.set(drumX - sx * 9.5, drumY, 0);
      tiltTorqueGroup.add(clip);
    }

    const syncBar = new THREE.Mesh(hiResCyl(1.08, 1.08, LCD_WIDTH * 0.66, 16).rotateZ(Math.PI / 2), u.lcdBrushedSus304Blu);
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
  // D12: Downward-Tilt Linear Guide Slots & POM Slider Shoes (z = -29.0 mm)
  // =========================================================================
  const slideRailsGroup = new THREE.Group();
  {
    for (const sx of [-1, 1]) {
      const rx = sx * (LCD_WIDTH * 0.43);
      const trackGeo = extrudeCentered(createFrameShape(5.5, 30.2, 1.6, 2.2, 22.0, 0.9), 1.6, 0.08, 0.08, 16);
      applyBoxUVs(trackGeo, 10);
      const track = new THREE.Mesh(trackGeo, u.lcdBrushedSus304Blu);
      track.position.set(rx, -2.0, 0);
      slideRailsGroup.add(track);

      // Molded white POM low-friction slider shoe with PFPE grease relief grooves
      const pomShoe = new THREE.Mesh(createChamferedBoxGeo(3.5, 6.6, 2.15, 0.45, 0.08, 'z'), mats.pomGear);
      pomShoe.position.set(rx, -7.5, -0.2);
      slideRailsGroup.add(pomShoe);

      // Sintered bronze guide pin + spring E-clip
      const gPin = new THREE.Mesh(hiResCyl(0.98, 0.98, 2.6, 16).rotateX(Math.PI / 2), u.lcdSinteredBronzePore);
      gPin.position.set(rx, -7.5, -0.2);
      const eClip = new THREE.Mesh(hiResTorus(1.18, 0.18, 8, 16, Math.PI * 1.5), mats.mountSpringSteel);
      eClip.position.set(rx, -7.5, -1.52);
      // Soft Poron end-travel stop pads at top & bottom of linear slot
      const topStop = new THREE.Mesh(createChamferedBoxGeo(2.4, 1.4, 1.2, 0.2, 0.04, 'z'), u.lcdPoronAcousticFoam);
      topStop.position.set(rx, 8.8, -0.2);
      const botStop = new THREE.Mesh(createChamferedBoxGeo(2.4, 1.4, 1.2, 0.2, 0.04, 'z'), u.lcdPoronAcousticFoam);
      botStop.position.set(rx, -12.8, -0.2);
      slideRailsGroup.add(gPin, eClip, topStop, botStop);
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
  // D13: Magnetic Flush-Stow Retention Catch & Silicone Bumpers (z = -28.9 mm)
  // =========================================================================
  const locksGroup = new THREE.Group();
  {
    for (const mx of [-18.0, 14.0]) {
      // High-permeability soft-iron flux-concentrator U-cup + N52 magnet with polarity stripe
      const catchCup = new THREE.Mesh(createChamferedBoxGeo(7.0, 3.4, 1.45, 0.3, 0.06, 'z'), mats.softIronYoke);
      catchCup.position.set(mx, -LCD_HEIGHT * 0.44, 0);
      const catchMag = new THREE.Mesh(createChamferedBoxGeo(5.3, 2.2, 1.65, 0.2, 0.05, 'z'), mats.neodymiumMagnet);
      catchMag.position.set(mx, -LCD_HEIGHT * 0.44, -0.22);
      const polBand = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.24, 0.14), mats.bodyRecRed);
      polBand.position.set(mx - 1.3, -LCD_HEIGHT * 0.44, -1.06);
      polBand.userData.noEdges = true;
      locksGroup.add(catchCup, catchMag, polBand);
    }

    // 4 Corner molded micro-cellular silicone anti-rattle shock bumpers with concentric compression ring
    for (const [bx, by] of [
      [-LCD_WIDTH * 0.44, LCD_HEIGHT * 0.4],
      [LCD_WIDTH * 0.44, LCD_HEIGHT * 0.4],
      [-LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.4],
      [LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.4],
    ]) {
      const padGeo = hiResCyl(2.15, 2.35, 1.4, 18).rotateX(Math.PI / 2);
      applyBoxUVs(padGeo, 6);
      const pad = new THREE.Mesh(padGeo, u.lcdPoronAcousticFoam);
      pad.position.set(bx, by, -0.4);
      const ring = new THREE.Mesh(hiResTorus(1.45, 0.24, 8, 18), mats.epdmGasket);
      ring.position.set(bx, by, -1.12);
      locksGroup.add(pad, ring);
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
    const baseGeo = extrudeCentered(
      createFrameShape(LCD_WIDTH + 2.4, LCD_HEIGHT + 2.2, 3.8, LCD_WIDTH - 14.0, LCD_HEIGHT - 14.0, 2.4),
      1.8,
      0.16,
      0.16,
      20
    );
    applyBoxUVs(baseGeo, 20);
    const baseFrame = new THREE.Mesh(baseGeo, u.lcdMaHingeMg);
    baseFrame.position.z = 0.6;
    cradleGroup.add(baseFrame);

    // Molded cable portal grommet collar + FPC feedthrough
    const fpcPortGeo = createChamferedBoxGeo(14.2, 4.2, 1.4, 0.4, 0.08, 'z');
    applyPlanarUVs(fpcPortGeo, 14.2, 4.2, 'xy-back');
    const fpcPort = new THREE.Mesh(fpcPortGeo, u.lcdFpcFlexCircuit);
    fpcPort.position.set(LCD_WIDTH * 0.36, -6.0, 1.2);
    const portLip = new THREE.Mesh(
      extrudeCentered(createFrameShape(16.0, 5.8, 1.0, 13.8, 3.8, 0.5), 0.75, 0.06, 0.06, 14),
      u.lcdPoronAcousticFoam
    );
    portLip.position.set(LCD_WIDTH * 0.36, -6.0, 1.1);
    cradleGroup.add(fpcPort, portLip);

    // 4 Corner brass mounting boss collars + black-oxide Phillips micro-screws
    for (const [cx, cy] of [
      [-LCD_WIDTH * 0.44, LCD_HEIGHT * 0.42],
      [LCD_WIDTH * 0.44, LCD_HEIGHT * 0.42],
      [-LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.42],
      [LCD_WIDTH * 0.44, -LCD_HEIGHT * 0.42],
    ]) {
      const collar = new THREE.Mesh(hiResCyl(2.05, 2.05, 0.6, 16).rotateX(Math.PI / 2), mats.brassGear);
      collar.position.set(cx, cy, -0.25);
      const screw = buildPhillipsScrew(1.3, 0.55, 0.65, 2.2, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
      screw.position.set(cx, cy, -0.6);
      screw.rotation.x = -Math.PI / 2;
      cradleGroup.add(collar, screw);
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
  // D15: 240Hz PCAP Touch-Sensing Controller ASIC Sub-FPC & ESD Array
  // =========================================================================
  const touchCtrlGroup = new THREE.Group();
  {
    const subFpcGeo = extrudeCentered(createRoundedRectShape(20.4, 7.8, 1.2), 0.32, 0.03, 0.03, 14);
    applyPlanarUVs(subFpcGeo, 20.4, 7.8, 'xy-back');
    const subFpc = new THREE.Mesh(subFpcGeo, u.lcdFpcFlexCircuit);
    subFpc.position.set(16.0, -LCD_HEIGHT * 0.44, 0);
    touchCtrlGroup.add(subFpc);

    // 240Hz Mutual-Capacitance Touch Controller QFN-48 ASIC with laser-etched silicon top
    const touchAsic = buildChipPackage({
      w: 5.6,
      d: 5.2,
      h: 0.85,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    touchAsic.position.set(15.2, -LCD_HEIGHT * 0.44, 0.58);
    touchCtrlGroup.add(touchAsic);

    // 4-Channel ESD TVS DFN array + 0201 passive decoupling capacitors
    const esdIc = buildChipPackage({
      w: 3.4,
      d: 2.2,
      h: 0.65,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    esdIc.position.set(21.6, -LCD_HEIGHT * 0.44 + 1.0, 0.50);
    touchCtrlGroup.add(esdIc);

    for (let i = 0; i < 3; i++) {
      const cap = buildSmdPassive(1.15, 0.62, 0.45, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(20.0 + i * 1.6, -LCD_HEIGHT * 0.44 - 1.8, 0.42);
      touchCtrlGroup.add(cap);
    }

    // Ripstop Ni/Cu conductive EMI noise-rejection foil over touch flex tail
    const emiFoilGeo = createChamferedBoxGeo(6.4, 4.6, 0.26, 0.25, 0.03, 'z');
    applyBoxUVs(emiFoilGeo, 8);
    const emiFoil = new THREE.Mesh(emiFoilGeo, u.lcdNiCuConductiveFoam);
    emiFoil.position.set(9.4, -LCD_HEIGHT * 0.44, 0.28);
    const goldB2b = new THREE.Mesh(createChamferedBoxGeo(5.0, 1.8, 0.48, 0.15, 0.03, 'z'), mats.goldPlating);
    goldB2b.position.set(15.2, -LCD_HEIGHT * 0.5 + 0.5, 0.4);
    touchCtrlGroup.add(emiFoil, goldB2b);
  }
  const pTouchCtrl = finalizeLcdPart(
    'lcd-touch-controller',
    15,
    '#0284c7',
    touchCtrlGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.60),
    new THREE.Vector3(24, -26, -64),
    new THREE.Vector3(24, -26, -338),
    cp,
    0.24
  );
  parts.push(pTouchCtrl);

  // =========================================================================
  // D16: Crossed 0°/90° Wide-View Polarizer Films & Retarder Stack
  // =========================================================================
  const polGroup = new THREE.Group();
  {
    const pW = LCD_WIDTH - 4.8;
    const pH = LCD_HEIGHT - 4.8;
    // Front 0° Analyzer Polarizer with stretched iodine-PVA optical texture
    const frontPolGeo = extrudeCentered(createRoundedRectShape(pW, pH, 1.2), 0.24, 0.02, 0.02, 16);
    applyPlanarUVs(frontPolGeo, pW, pH, 'xy-back');
    const frontPol = new THREE.Mesh(frontPolGeo, u.lcdPvaIodineStretch);
    frontPol.position.z = -0.20;
    frontPol.userData.edgeOpacity = 0.34;
    polGroup.add(frontPol);

    // Biaxial wide-view optical compensation retarder sheet behind front polarizer
    const retGeo = extrudeCentered(createRoundedRectShape(pW - 0.6, pH - 0.6, 1.0), 0.18, 0.02, 0.02, 14);
    applyPlanarUVs(retGeo, pW - 0.6, pH - 0.6, 'xy-back');
    const retarder = new THREE.Mesh(retGeo, u.lcdQwpRetarderFilm);
    retarder.position.z = 0.18;
    retarder.userData.edgeOpacity = 0.3;
    polGroup.add(retarder);

    // 0° / 90° optical-axis alignment ear tabs + peel-liner corner notch
    const tab0 = new THREE.Mesh(createChamferedBoxGeo(4.4, 1.2, 0.30, 0.15, 0.02, 'z'), mats.goldPlating);
    tab0.position.set(-pW * 0.42, pH * 0.5 + 0.45, -0.20);
    const tab90 = new THREE.Mesh(createChamferedBoxGeo(1.2, 4.4, 0.30, 0.15, 0.02, 'z'), mats.beCuSpring);
    tab90.position.set(pW * 0.5 + 0.45, pH * 0.4, 0.18);
    polGroup.add(tab0, tab90);
  }
  const pPolarizer = finalizeLcdPart(
    'lcd-polarizer-stack',
    16,
    '#6366f1',
    polGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.24),
    new THREE.Vector3(0, 0, -64),
    new THREE.Vector3(0, 0, -338),
    cp,
    0.26
  );
  parts.push(pPolarizer);

  // =========================================================================
  // D17: 10x High-CRI Edge W-LED Bar, Laser-Dot PMMA LGP & ESR Mirror
  // =========================================================================
  const lgpGroup = new THREE.Group();
  {
    const blW = LCD_WIDTH - 5.2;
    const blH = LCD_HEIGHT - 5.2;

    // Laser-etched micro-dot gradient PMMA Light-Guide Plate (LGP)
    const lgpGeo = extrudeCentered(createRoundedRectShape(blW, blH, 1.2), 0.60, 0.04, 0.04, 16);
    applyPlanarUVs(lgpGeo, blW, blH, 'xy-back');
    const lgpPlate = new THREE.Mesh(lgpGeo, u.lcdLgpDotGradient);
    lgpPlate.userData.edgeOpacity = 0.38;
    lgpGroup.add(lgpPlate);

    // Mirror-bright 98.5% Enhanced Specular Reflector (ESR) polymer sheet on +Z back
    const esrGeo = createChamferedBoxGeo(blW - 1.0, blH - 1.0, 0.16, 0.4, 0.02, 'z');
    applyPlanarUVs(esrGeo, blW - 1.0, blH - 1.0, 'xy-back');
    const esrMirror = new THREE.Mesh(esrGeo, u.lcdDbefOpticalPrism);
    esrMirror.position.z = 0.42;
    lgpGroup.add(esrMirror);

    // Lower edge white-masked aluminum MCPCB LED strip + 10 sculpted 3806 high-CRI W-LED packages
    const ledBarGeo = createChamferedBoxGeo(blW - 4.6, 2.4, 0.85, 0.25, 0.04, 'z');
    applyPlanarUVs(ledBarGeo, blW - 4.6, 2.4, 'xy-back');
    const ledBar = new THREE.Mesh(ledBarGeo, u.lcdSideLedMcpcb);
    ledBar.position.set(0, -blH * 0.5 + 1.1, 0);
    lgpGroup.add(ledBar);

    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xe0f2fe,
      emissiveIntensity: 1.5,
      roughness: 0.14,
      clippingPlanes: cp,
    });
    for (let i = 0; i < 10; i++) {
      const lx = -blW * 0.42 + (i / 9) * (blW * 0.84);
      const emcPkg = new THREE.Mesh(new THREE.BoxGeometry(2.15, 1.35, 0.72), mats.ceramicAlumina);
      emcPkg.position.set(lx, -blH * 0.5 + 1.35, -0.10);
      const led = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.85, 0.56), ledMat);
      led.position.set(lx, -blH * 0.5 + 1.55, -0.22);
      led.userData.noEdges = true;
      lgpGroup.add(emcPkg, led);
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
  // D18: Ultra-Thin Stainless EMI Backplate & Graphite Thermal Liner
  // =========================================================================
  const emiThermalGroup = new THREE.Group();
  {
    // 0.25mm stamped SUS304 EMI shielding backplate with brushed grain & embossed stiffening ribs
    const emiGeo = extrudeCentered(createRoundedRectShape(LCD_WIDTH - 4.0, LCD_HEIGHT - 4.0, 1.8), 0.26, 0.03, 0.03, 16);
    applyBoxUVs(emiGeo, 20);
    const emiPlate = new THREE.Mesh(emiGeo, u.lcdBrushedSus304Blu);
    emiThermalGroup.add(emiPlate);

    // High-conductivity 3K woven artificial graphite thermal spreading sheet
    const graphGeo = createChamferedBoxGeo(LCD_WIDTH - 13.0, LCD_HEIGHT - 13.0, 0.22, 1.2, 0.03, 'z');
    applyBoxUVs(graphGeo, 14);
    const graphitePad = new THREE.Mesh(graphGeo, u.lcdCarbonWeaveStiffener);
    graphitePad.position.set(-2.0, 0, 0.24);
    emiThermalGroup.add(graphitePad);

    // Copper grounding bridge tab + Ni/Cu conductive EMI sponge bar
    const gndTab = new THREE.Mesh(createChamferedBoxGeo(7.4, 5.4, 0.28, 0.3, 0.03, 'z'), mats.copperHeatSpreader);
    gndTab.position.set(LCD_WIDTH * 0.46, 0, 0.14);
    const emiBarGeo = createChamferedBoxGeo(2.8, 16.0, 0.55, 0.3, 0.05, 'z');
    applyBoxUVs(emiBarGeo, 8);
    const emiBar = new THREE.Mesh(emiBarGeo, u.lcdNiCuConductiveFoam);
    emiBar.position.set(LCD_WIDTH * 0.40, 0, 0.38);
    emiThermalGroup.add(gndTab, emiBar);
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
  // D19: Self-Closing Pull-In Over-Center Cam Hinge & Preload Spring
  // =========================================================================
  const pullInGroup = new THREE.Group();
  {
    for (const sy of [-6.8, 6.8]) {
      const camShape = new THREE.Shape();
      camShape.absarc(0, 0, 3.6, 0, Math.PI * 1.45, false);
      camShape.lineTo(4.9, -1.6);
      camShape.lineTo(3.6, 0);
      const camGeo = extrudeCentered(camShape, 2.2, 0.08, 0.08, 22).rotateX(Math.PI / 2);
      applyBoxUVs(camGeo, 8);
      const cam = new THREE.Mesh(camGeo, u.lcdLaserDimpleFriction);
      cam.position.set(0, sy, 0);
      pullInGroup.add(cam);

      // Sintered bronze cam follower roller on hardened stainless pin
      const follower = new THREE.Mesh(hiResCyl(1.15, 1.15, 2.4, 18), u.lcdSinteredBronzePore);
      follower.position.set(-4.3, sy, 0.6);
      const rollerPin = new THREE.Mesh(hiResCyl(0.45, 0.45, 3.2, 12), mats.titaniumRivet);
      rollerPin.position.set(-4.3, sy, 0.6);
      const pullSpr = new THREE.Mesh(
        createHelicalSpringGeometry(1.2, 4.6, 6, 0.24).rotateY(Math.PI / 2),
        mats.beCuSpring
      );
      pullSpr.position.set(-7.2, sy, 0.6);
      pullSpr.userData.noEdges = true;
      const guideRod = new THREE.Mesh(hiResCyl(0.48, 0.48, 5.2, 12).rotateZ(Math.PI / 2), u.lcdBrushedSus304Blu);
      guideRod.position.set(-7.2, sy, 0.6);
      pullInGroup.add(follower, rollerPin, pullSpr, guideRod);
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
  // D20: Molded Accordion EPDM Hinge Weather-Seal Boots & O-Rings
  // =========================================================================
  const bootsGroup = new THREE.Group();
  {
    const slotGeo = extrudeCentered(createFrameShape(11.8, 25.2, 2.6, 6.4, 19.8, 1.6), 1.35, 0.12, 0.12, 18);
    applyBoxUVs(slotGeo, 10);
    const slotGasket = new THREE.Mesh(slotGeo, u.lcdPoronAcousticFoam);
    slotGasket.position.z = 1.2;
    bootsGroup.add(slotGasket);

    // 6-pleat molded accordion waterproof EPDM bellows wrapping hinge neck
    for (let i = 0; i < 6; i++) {
      const rRib = i % 2 === 0 ? 4.45 : 3.55;
      const rib = new THREE.Mesh(hiResTorus(rRib, 0.46, 12, 26).rotateX(Math.PI / 2), mats.epdmGasket);
      rib.position.set(0, -10.0 + i * 4.0, -0.1);
      rib.userData.noEdges = true;
      bootsGroup.add(rib);
    }

    // Twin fluorine-coated dynamic rotary shaft O-rings + inner dust lip
    for (const oy of [-11.6, 11.6]) {
      const oRing = new THREE.Mesh(hiResTorus(3.25, 0.42, 12, 26).rotateX(Math.PI / 2), mats.antiVibRubber);
      oRing.position.set(0, oy, -0.4);
      oRing.userData.noEdges = true;
      const retainerRing = new THREE.Mesh(hiResTorus(3.65, 0.20, 8, 24).rotateX(Math.PI / 2), u.lcdBrushedSus304Blu);
      retainerRing.position.set(0, oy + (oy > 0 ? 0.42 : -0.42), -0.4);
      bootsGroup.add(oRing, retainerRing);
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
  // D21: Body-Side Bulkhead MIPI-DSI B2B Relay PCB & Clamp Plate
  // =========================================================================
  const bulkheadB2bGroup = new THREE.Group();
  {
    const bx = LCD_WIDTH * 0.24;
    const by = -6.0;
    const relayGeo = extrudeCentered(createRoundedRectShape(24.4, 14.2, 1.6), 1.0, 0.08, 0.08, 16);
    applyPlanarUVs(relayGeo, 24.4, 14.2, 'xy-back');
    const relayPcb = new THREE.Mesh(relayGeo, u.lcdPcbPd1072HiRes);
    relayPcb.position.set(bx, by, 0);
    bulkheadB2bGroup.add(relayPcb);

    // 30-pin high-speed 100Ω differential MIPI-DSI B2B socket with individual visible gold pin combs
    const b2bSocket = new THREE.Mesh(createChamferedBoxGeo(12.6, 3.2, 1.05, 0.25, 0.06, 'z'), mats.zifIvoryPlastic);
    b2bSocket.position.set(bx, by + 2.4, -0.8);
    bulkheadB2bGroup.add(b2bSocket);
    for (let i = 0; i < 15; i++) {
      const px = bx - 5.2 + i * 0.74;
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.28, 3.7, 0.26), mats.goldPlating);
      pin.position.set(px, by + 2.4, -0.54);
      pin.userData.noEdges = true;
      bulkheadB2bGroup.add(pin);
    }

    // ESD TVS DFN array + 90-ohm common-mode choke + 0201 bypass MLCCs
    const esdChip = buildChipPackage({
      w: 4.4,
      d: 2.2,
      h: 0.72,
      style: 'dfn',
      pinsPerSide: 5,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    esdChip.position.set(bx - 5.2, by - 3.2, -0.78);
    const cmc = buildSmdPassive(2.6, 1.8, 0.85, mats.ferriteInductor, mats.goldPlating, 'z');
    cmc.position.set(bx + 3.8, by - 3.2, -0.82);
    bulkheadB2bGroup.add(esdChip, cmc);

    // Brushed stainless B2B retention clamp bar + 2 Phillips M1.4 screws with blue threadlock
    const clampGeo = createChamferedBoxGeo(16.8, 4.4, 0.52, 0.35, 0.05, 'z');
    applyBoxUVs(clampGeo, 10);
    const clampBar = new THREE.Mesh(clampGeo, u.lcdBrushedSus304Blu);
    clampBar.position.set(bx, by + 2.4, -1.55);
    bulkheadB2bGroup.add(clampBar);
    for (const dx of [-7.0, 7.0]) {
      const sc = buildPhillipsScrew(1.05, 0.42, 0.52, 1.6, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
      sc.position.set(bx + dx, by + 2.4, -1.85);
      sc.rotation.x = -Math.PI / 2;
      bulkheadB2bGroup.add(sc);
    }

    const jumperGeo = createChamferedBoxGeo(9.4, 6.4, 0.26, 0.3, 0.02, 'z');
    applyPlanarUVs(jumperGeo, 9.4, 6.4, 'xy-back');
    const jumper = new THREE.Mesh(jumperGeo, u.lcdFpcFlexCircuit);
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
  // D22: Rear Monitor Carbon-Steel Anti-Warp Stiffener Plate (Monitor-Attached!)
  // =========================================================================
  const stiffenerGroup = new THREE.Group();
  {
    const stiffGeo = extrudeCentered(
      createFrameShape(LCD_WIDTH - 4.4, LCD_HEIGHT - 4.4, 2.6, LCD_WIDTH - 24.0, LCD_HEIGHT - 22.0, 1.8),
      0.38,
      0.03,
      0.03,
      18
    );
    applyBoxUVs(stiffGeo, 18);
    stiffenerGroup.add(new THREE.Mesh(stiffGeo, u.lcdBrushedSus304Blu));

    // 3K woven carbon-fiber diagonal anti-torsion X-ribs + central titanium riveted gusset plate
    for (const ang of [0.54, -0.54]) {
      const ribGeo = createChamferedBoxGeo(56.0, 2.4, 0.48, 0.25, 0.04, 'z');
      applyBoxUVs(ribGeo, 12);
      const rib = new THREE.Mesh(ribGeo, u.lcdCarbonWeaveStiffener);
      rib.rotation.z = ang;
      stiffenerGroup.add(rib);
    }
    const gusset = new THREE.Mesh(createChamferedBoxGeo(9.6, 6.4, 0.62, 0.6, 0.06, 'z'), u.lcdBrushedSus304Blu);
    stiffenerGroup.add(gusset);
    for (const [rx, ry] of [[-3.2, 1.8], [3.2, 1.8], [-3.2, -1.8], [3.2, -1.8]]) {
      const rv = new THREE.Mesh(hiResCyl(0.55, 0.55, 0.78, 12).rotateX(Math.PI / 2), mats.titaniumRivet);
      rv.position.set(rx, ry, 0);
      stiffenerGroup.add(rv);
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
  // D23: 4-Axis Hinge Belleville Disc-Spring Friction Torque Washer Stack
  // =========================================================================
  const torqueWashersGroup = new THREE.Group();
  {
    for (let i = 0; i < 6; i++) {
      const wy = -6.0 + i * 2.4;
      const bGeo = hiResCyl(3.82, 4.42, 0.52, 26);
      applyBoxUVs(bGeo, 8);
      const belleville = new THREE.Mesh(bGeo, i % 2 === 0 ? u.lcdLaserDimpleFriction : u.lcdSinteredBronzePore);
      belleville.position.set(0, wy, 0);
      torqueWashersGroup.add(belleville);

      const ptfeSlip = new THREE.Mesh(hiResCyl(4.12, 4.12, 0.24, 24), mats.zifIvoryPlastic);
      ptfeSlip.position.set(0, wy + 0.52, 0);
      torqueWashersGroup.add(ptfeSlip);
    }

    // Precision self-locking serrated flange tension locknut + blue threadlock collar
    const lockNut = new THREE.Mesh(hiResCyl(4.32, 4.32, 1.45, 6), u.lcdBrushedSus304Blu);
    lockNut.position.set(0, 8.6, 0);
    const flange = new THREE.Mesh(hiResCyl(4.85, 4.85, 0.35, 24), mats.titaniumRivet);
    flange.position.set(0, 7.8, 0);
    const nyloc = new THREE.Mesh(hiResTorus(2.8, 0.32, 10, 20).rotateX(Math.PI / 2), mats.mountThreadLockBlue);
    nyloc.position.set(0, 9.35, 0);
    torqueWashersGroup.add(lockNut, flange, nyloc);
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
  // D24: Rear-Bezel RGB Ambient Light & Color-Temperature Sensor (Monitor-Attached!)
  // =========================================================================
  const ambColorGroup = new THREE.Group();
  {
    const pcbGeo = createChamferedBoxGeo(10.0, 4.4, 0.65, 0.35, 0.05, 'z');
    applyPlanarUVs(pcbGeo, 10.0, 4.4, 'xy-back');
    const pcb = new THREE.Mesh(pcbGeo, u.lcdPcbPd1072HiRes);
    pcb.position.set(0, -LCD_HEIGHT * 0.44, 0);

    // Authentic TCS3472-class optical package showing 4-quadrant R/G/B/Clear photodiode die window
    const rgbPkg = new THREE.Mesh(createChamferedBoxGeo(3.2, 2.4, 0.62, 0.15, 0.04, 'z'), mats.icEpoxy);
    rgbPkg.position.set(0, -LCD_HEIGHT * 0.44, -0.58);
    const pdColors = [mats.cfaRed, mats.cfaGreen, mats.cfaBlue, mats.lcdCoverGlass];
    for (let q = 0; q < 4; q++) {
      const pd = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.52, 0.14), pdColors[q]);
      pd.position.set((q % 2 === 0 ? -0.4 : 0.4), -LCD_HEIGHT * 0.44 + (q < 2 ? 0.34 : -0.34), -0.90);
      pd.userData.noEdges = true;
      ambColorGroup.add(pd);
    }

    const lens = new THREE.Mesh(hiResCyl(1.05, 1.05, 0.28, 18).rotateX(Math.PI / 2), mats.lcdCoverGlass);
    lens.position.set(0, -LCD_HEIGHT * 0.44, -1.04);
    lens.userData.noEdges = true;

    // 0201 I2C pull-up resistors & decoupling cap
    for (const sx of [-3.2, 3.2]) {
      const smd = buildSmdPassive(1.1, 0.6, 0.42, mats.smdCeramic, mats.solderBallSilver, 'z');
      smd.position.set(sx, -LCD_HEIGHT * 0.44, -0.48);
      ambColorGroup.add(smd);
    }

    const fpcGeo = createChamferedBoxGeo(12.2, 2.4, 0.20, 0.2, 0.02, 'z');
    applyPlanarUVs(fpcGeo, 12.2, 2.4, 'xy-back');
    const fpc = new THREE.Mesh(fpcGeo, u.lcdFpcFlexCircuit);
    fpc.position.set(9.8, -LCD_HEIGHT * 0.44, 0.15);
    ambColorGroup.add(pcb, rgbPkg, lens, fpc);
  }
  const pAmbColor = finalizeLcdPart(
    'lcd-ambient-color-sensor',
    24,
    '#0ea5e9',
    ambColorGroup,
    new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.75),
    new THREE.Vector3(0, -34, -64),
    new THREE.Vector3(0, -34, -318),
    cp,
    0.24
  );
  parts.push(pAmbColor);

  // =========================================================================
  // D25: Selfie 180° Flip & Closed-Dock Auto-Rotate Hall/Reed Magnet Pair (Monitor-Attached!)
  // =========================================================================
  const flipMagGroup = new THREE.Group();
  {
    for (const [mx, my] of [
      [-LCD_WIDTH * 0.42, LCD_HEIGHT * 0.34],
      [LCD_WIDTH * 0.38, -LCD_HEIGHT * 0.38],
    ] as Array<[number, number]>) {
      const mag = new THREE.Mesh(createChamferedBoxGeo(3.9, 2.3, 1.05, 0.2, 0.05, 'z'), mats.neodymiumMagnet);
      mag.position.set(mx, my, 0);
      const nStripe = new THREE.Mesh(new THREE.BoxGeometry(1.85, 2.34, 0.12), mats.bodyRecRed);
      nStripe.position.set(mx - 0.95, my, -0.54);
      nStripe.userData.noEdges = true;
      const keeper = new THREE.Mesh(createChamferedBoxGeo(4.4, 2.7, 0.38, 0.2, 0.04, 'z'), mats.softIronYoke);
      keeper.position.set(mx, my, 0.65);
      flipMagGroup.add(mag, nStripe, keeper);
    }

    const podGeo = createChamferedBoxGeo(6.0, 4.2, 0.72, 0.3, 0.05, 'z');
    applyPlanarUVs(podGeo, 6.0, 4.2, 'xy-back');
    const hallPod = new THREE.Mesh(podGeo, u.lcdPcbPd1072HiRes);
    hallPod.position.set(LCD_WIDTH * 0.38, LCD_HEIGHT * 0.34, 0.5);
    const hallIc = buildChipPackage({
      w: 2.2,
      d: 1.8,
      h: 0.58,
      style: 'sot23',
      pinsPerSide: 3,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    hallIc.position.set(LCD_WIDTH * 0.38, LCD_HEIGHT * 0.34, 0.04);
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
  // D26: Spiral FPC Hinge-Axle Anti-Chafe PTFE Sleeve & Strain-Relief Grommet
  // =========================================================================
  const hingeGrommetGroup = new THREE.Group();
  {
    // Low-friction white PTFE hollow axle sleeve with molded axial relief ribs
    const ptfeTube = new THREE.Mesh(
      new THREE.CylinderGeometry(2.55, 2.55, 22.0, 24, 1, true),
      mats.zifIvoryPlastic
    );
    hingeGrommetGroup.add(ptfeTube);

    for (let y = -8.0; y <= 8.0; y += 4.0) {
      const lubeRing = new THREE.Mesh(hiResTorus(2.62, 0.16, 8, 24).rotateX(Math.PI / 2), mats.lcdDiffuserMatte);
      lubeRing.position.y = y;
      lubeRing.userData.noEdges = true;
      hingeGrommetGroup.add(lubeRing);
    }

    // Dual flared curvature-limiting EPDM strain-relief end grommets + locking collars
    for (const gy of [-11.2, 11.2]) {
      const flare = new THREE.Mesh(hiResTorus(2.88, 0.68, 12, 26).rotateX(Math.PI / 2), mats.epdmGasket);
      flare.position.y = gy;
      flare.userData.noEdges = true;
      const collar = new THREE.Mesh(hiResTorus(3.25, 0.22, 8, 24).rotateX(Math.PI / 2), u.lcdBrushedSus304Blu);
      collar.position.y = gy + (gy > 0 ? -0.65 : 0.65);
      hingeGrommetGroup.add(flare, collar);
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
  // D27: 4-Corner Micro-Cellular Urethane Monitor Dock Cushion Pads & Catch
  // =========================================================================
  const dockBumpersGroup = new THREE.Group();
  {
    for (const [cx, cy] of [
      [-LCD_WIDTH * 0.43, LCD_HEIGHT * 0.4],
      [LCD_WIDTH * 0.43, LCD_HEIGHT * 0.4],
      [-LCD_WIDTH * 0.43, -LCD_HEIGHT * 0.4],
      [LCD_WIDTH * 0.43, -LCD_HEIGHT * 0.4],
    ] as Array<[number, number]>) {
      const padGeo = extrudeCentered(createRoundedRectShape(6.4, 4.6, 1.1), 1.05, 0.1, 0.1, 14);
      applyBoxUVs(padGeo, 8);
      const pad = new THREE.Mesh(padGeo, u.lcdPoronAcousticFoam);
      pad.position.set(cx, cy, 0);
      // Die-cut 3M PSA acrylic adhesive liner backing rim
      const psaRim = new THREE.Mesh(createChamferedBoxGeo(6.8, 5.0, 0.14, 1.1, 0.02, 'z'), mats.thermalTransferTape);
      psaRim.position.set(cx, cy, 0.56);
      dockBumpersGroup.add(pad, psaRim);
    }

    // Bottom center POM tactile seating catch clip with CuBe2 leaf spring & pivot axle
    const seatCatch = new THREE.Mesh(createChamferedBoxGeo(11.0, 2.9, 1.65, 0.45, 0.08, 'z'), mats.pomGear);
    seatCatch.position.set(0, -LCD_HEIGHT * 0.47, -0.3);
    const catchSpring = new THREE.Mesh(createChamferedBoxGeo(8.6, 1.4, 0.30, 0.2, 0.03, 'z'), mats.beCuSpring);
    catchSpring.position.set(0, -LCD_HEIGHT * 0.47, 0.65);
    const pivotPin = new THREE.Mesh(hiResCyl(0.45, 0.45, 11.8, 12).rotateZ(Math.PI / 2), mats.stainlessMachined);
    pivotPin.position.set(0, -LCD_HEIGHT * 0.47 + 0.55, 0.15);
    dockBumpersGroup.add(seatCatch, catchSpring, pivotPin);
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

  // Keep reference to createPrecisionScrew in case other modules inspect
  void createPrecisionScrew;

  const monitorParts: CadPart[] = [
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
          const cosT = Math.cos(tiltAngle);
          const sinT = Math.sin(tiltAngle);
          y = tiltPivotY + dy * cosT - dz * sinT;
          z = tiltPivotZ + dy * sinT + dz * cosT - Math.sin(tiltAngle) * 3.5;
          mp.group.position.set(x, y, z);
          mp.group.rotation.set(tiltAngle, 0, 0);
        } else if (openAngle > 0.001) {
          const dx = x - openPivotX;
          const dz = z - openPivotZ;
          const cosO = Math.cos(-openAngle);
          const sinO = Math.sin(-openAngle);
          x = openPivotX + dx * cosO + dz * sinO;
          z = openPivotZ - dx * sinO + dz * cosO;
          mp.group.position.set(x, y, z);
          mp.group.rotation.set(0, -openAngle, 0);
        } else {
          mp.group.rotation.set(0, 0, 0);
        }
      }

      pHinge.group.rotation.set(tiltAngle, -openAngle * 0.5, 0);
    },
  };

  return { parts, rig };
}
