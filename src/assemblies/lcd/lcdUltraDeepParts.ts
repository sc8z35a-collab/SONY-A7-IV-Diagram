import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildPhillipsScrew,
  buildShieldedInductor,
  buildSmdPassive,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';
import { LCD_CENTER_X, LCD_CENTER_Y, LCD_HEIGHT, LCD_WIDTH } from './lcdParts';

function finalizeLcdDeepPart(
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
    subsystem: 'lcd',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

/**
 * Phase 35 + Phase 36 Ultra-HD Overhaul:
 * Build 40 Standalone-Only Ultra-Deep Audit Rear 4-Axis LCD Monitor &
 * 2026+ Post-LCD Emissive Frontier Parts (D111–D150 -> 150 Total Standalone LCD Parts).
 */
export function buildLcdUltraDeepParts(
  mats: MaterialLibrary
): { parts: CadPart[]; monitorParts: CadPart[] } {
  const parts: CadPart[] = [];
  const monitorParts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;
  const hx = LCD_CENTER_X + LCD_WIDTH * 0.5 + 1.8;

  const cellW = LCD_WIDTH - 4.8;
  const cellH = LCD_HEIGHT - 4.8;
  const blW = LCD_WIDTH - 5.4;
  const blH = LCD_HEIGHT - 5.4;

  const pushPart = (p: CadPart, attachedToMonitor: boolean) => {
    parts.push(p);
    if (attachedToMonitor) monitorParts.push(p);
  };

  // =========================================================================
  // GROUP H: Polarizer Molecular Core, IPS Compensation & IM-ITO Optics (D111–D117)
  // =========================================================================

  // D111: Stretched Iodine-Dyed PVA Dichroic Core (~20 μm + Boric Acid Cross-Link)
  {
    const g = new THREE.Group();
    const w = cellW - 2.0;
    const h = cellH - 2.0;
    const pvaGeo = createChamferedBoxGeo(w, h, 0.24, 0.4, 0.03, 'z');
    applyPlanarUVs(pvaGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(pvaGeo, u.lcdPvaIodineStretch));

    for (let i = -3; i <= 3; i++) {
      const rod = new THREE.Mesh(hiResCyl(0.20, 0.20, cellW - 10, 12), mats.lcdDbefIridescent);
      rod.rotation.z = Math.PI * 0.5;
      rod.position.set(0, i * 4.4, -0.16);
      rod.userData.noEdges = true;
      g.add(rod);
    }
    for (const sx of [-1, 1]) {
      const clamp = new THREE.Mesh(createChamferedBoxGeo(1.15, cellH - 6.0, 0.36, 0.2, 0.03, 'z'), u.lcdBrushedSus304Blu);
      clamp.position.set(sx * (cellW * 0.5 - 1.5), 0, 0);
      g.add(clamp);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-pva-iodine-core',
        111,
        '#4f46e5',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.16),
        new THREE.Vector3(-142, 64, -102),
        cp
      ),
      true
    );
  }

  // D112: Dual UV-Blocking TAC Support Films (40–60 μm) & Optical PSA Adhesive Layer
  {
    const g = new THREE.Group();
    const tacFront = new THREE.Mesh(
      createChamferedBoxGeo(cellW - 1.6, cellH - 1.6, 0.22, 0.4, 0.03, 'z'),
      mats.irCutGlass
    );
    tacFront.position.z = -0.34;
    g.add(tacFront);

    const tacRear = new THREE.Mesh(
      createChamferedBoxGeo(cellW - 1.6, cellH - 1.6, 0.22, 0.4, 0.03, 'z'),
      mats.lcdOcaFilm
    );
    tacRear.position.z = 0.26;
    g.add(tacRear);

    const psaFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW - 1.0, cellH - 1.0, 0.6, cellW - 4.6, cellH - 4.6, 0.42), 0.16, 0.02, 1),
      mats.opticalCementClear
    );
    psaFrame.position.z = 0.36;
    const uvBadge = new THREE.Mesh(createChamferedBoxGeo(8.2, 2.4, 0.18, 0.3, 0.02, 'z'), mats.makeupSealViolet);
    uvBadge.position.set(-cellW * 0.5 + 6.4, cellH * 0.5 - 3.2, -0.46);
    const peelTab = new THREE.Mesh(createChamferedBoxGeo(4.8, 1.8, 0.14, 0.25, 0.02, 'z'), mats.goldPlating);
    peelTab.position.set(cellW * 0.44, cellH * 0.5 + 0.6, 0.36);
    g.add(psaFrame, uvBadge, peelTab);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-tac-uv-psa-barrier',
        112,
        '#7c3aed',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.12),
        new THREE.Vector3(-142, 24, -104),
        cp
      ),
      true
    );
  }

  // D113: IPS Off-Axis +A-Plate (138 nm) & +C-Plate (86 nm) Biaxial Optical Compensation Film
  {
    const g = new THREE.Group();
    const aw = cellW - 2.2;
    const ah = cellH - 2.2;
    const aPlateGeo = createChamferedBoxGeo(aw, ah, 0.22, 0.4, 0.03, 'z');
    applyPlanarUVs(aPlateGeo, aw, ah, 'xy-back');
    const aPlate = new THREE.Mesh(aPlateGeo, u.lcdQwpRetarderFilm);
    aPlate.position.z = -0.22;
    g.add(aPlate);

    const cPlateGeo = createChamferedBoxGeo(cellW - 3.2, cellH - 3.2, 0.22, 0.4, 0.03, 'z');
    applyPlanarUVs(cPlateGeo, cellW - 3.2, cellH - 3.2, 'xy-back');
    const cPlate = new THREE.Mesh(cPlateGeo, u.lcdDbefOpticalPrism);
    cPlate.position.z = 0.22;
    g.add(cPlate);

    for (const ang of [Math.PI * 0.25, -Math.PI * 0.25]) {
      const axis = new THREE.Mesh(createChamferedBoxGeo(cellH * 0.72, 0.55, 0.16, 0.12, 0.02, 'z'), mats.goldPlating);
      axis.rotation.z = ang;
      axis.position.z = -0.36;
      g.add(axis);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-ips-ac-comp-film',
        113,
        '#06b6d4',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.08),
        new THREE.Vector3(-142, -16, -104),
        cp
      ),
      true
    );
  }

  // D114: Index-Matched ITO (IM-ITO: 8.5 nm Nb2O5 + 49 nm SiO2) Invisible Touch Coating
  {
    const g = new THREE.Group();
    const w = cellW - 2.4;
    const h = cellH - 2.4;
    const sio2 = new THREE.Mesh(createChamferedBoxGeo(w, h, 0.18, 0.35, 0.02, 'z'), mats.lcdCoverGlass);
    sio2.position.z = 0.26;
    const nb2o5 = new THREE.Mesh(createChamferedBoxGeo(w - 0.4, h - 0.4, 0.16, 0.35, 0.02, 'z'), mats.fluorineCoatCyan);
    nb2o5.position.z = 0.02;
    const itoGeo = createChamferedBoxGeo(w - 0.8, h - 0.8, 0.16, 0.35, 0.02, 'z');
    applyPlanarUVs(itoGeo, w - 0.8, h - 0.8, 'xy-back');
    const itoSheet = new THREE.Mesh(itoGeo, u.lcdItoDiamondTouchGrid);
    itoSheet.position.z = -0.20;
    g.add(sio2, nb2o5, itoSheet);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-im-ito-matching',
        114,
        '#0ea5e9',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.04),
        new THREE.Vector3(-142, -56, -102),
        cp
      ),
      true
    );
  }

  // D115: Dual-Domain Chevron (±10° Zig-Zag V-Bend) IPS Sub-Pixel Slit Geometry
  {
    const g = new THREE.Group();
    const w = cellW - 3.0;
    const h = cellH - 3.0;
    const baseGeo = createChamferedBoxGeo(w, h, 0.28, 0.35, 0.03, 'z');
    applyPlanarUVs(baseGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(baseGeo, u.lcdDualDomainChevron));

    // Delicate precision ±10° V-chevron metallic ITO electrode relief ribs framing the full micrograph
    for (let x = -22; x <= 22; x += 6.2) {
      const upperLeg = new THREE.Mesh(createChamferedBoxGeo(0.32, 13.0, 0.18, 0.06, 0.02, 'z'), mats.silverElectrode);
      upperLeg.position.set(x + 1.0, 6.4, -0.20);
      upperLeg.rotation.z = -0.175;
      upperLeg.userData.noEdges = true;
      const lowerLeg = new THREE.Mesh(createChamferedBoxGeo(0.32, 13.0, 0.18, 0.06, 0.02, 'z'), mats.silverElectrode);
      lowerLeg.position.set(x + 1.0, -6.4, -0.20);
      lowerLeg.rotation.z = 0.175;
      lowerLeg.userData.noEdges = true;
      g.add(upperLeg, lowerLeg);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-chevron-ips-slit',
        115,
        '#ec4899',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.76),
        new THREE.Vector3(142, 56, -102),
        cp
      ),
      true
    );
  }

  // D116: Fluorinated Negative-Δε Nematic Liquid Crystal & Chiral Dopant Layer (T_NI > 90 °C)
  {
    const g = new THREE.Group();
    const w = cellW - 4.0;
    const h = cellH - 4.0;
    const envGeo = createChamferedBoxGeo(w, h, 0.34, 0.4, 0.04, 'z');
    applyPlanarUVs(envGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(envGeo, u.lcdNematicLiquidCrystal));

    for (let r = -3; r <= 3; r++) {
      for (let c = -5; c <= 5; c++) {
        const mol = new THREE.Mesh(hiResCyl(0.36, 0.36, 2.5, 12), r >= 0 ? mats.cfaBlue : mats.cfaGreen);
        mol.rotation.z = Math.PI * 0.5 + (r >= 0 ? -0.22 : 0.22);
        mol.position.set(c * 4.8, r * 4.4, -0.24);
        mol.userData.noEdges = true;
        const fl = new THREE.Mesh(hiResSphere(0.28, 10), mats.goldPlating);
        fl.position.set(c * 4.8, r * 4.4 + 0.48, -0.24);
        fl.userData.noEdges = true;
        g.add(mol, fl);
      }
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-neg-nematic-lc',
        116,
        '#14b8a6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.66),
        new THREE.Vector3(142, 16, -104),
        cp
      ),
      true
    );
  }

  // D117: Anti-Newton-Ring (ANR) Micro-Spacer Silica Bead Optical Interference Barrier
  {
    const g = new THREE.Group();
    const filmGeo = createChamferedBoxGeo(cellW - 2.2, cellH - 2.2, 0.20, 0.35, 0.02, 'z');
    applyBoxUVs(filmGeo, 16);
    g.add(new THREE.Mesh(filmGeo, u.lcdNanoEtchGlass));

    for (let r = -3; r <= 3; r++) {
      for (let c = -5; c <= 5; c++) {
        const jx = ((r * 7 + c * 13) % 5) * 0.22;
        const jy = ((r * 11 + c * 3) % 5) * 0.22;
        const bead = new THREE.Mesh(hiResSphere(0.45, 12), mats.microlensGlass);
        bead.position.set(c * 5.2 + jx, r * 4.8 + jy, -0.20);
        bead.userData.noEdges = true;
        g.add(bead);
      }
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-anti-newton-spacer',
        117,
        '#38bdf8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.98),
        new THREE.Vector3(142, -24, -104),
        cp
      ),
      true
    );
  }

  // =========================================================================
  // GROUP I: IPS Panel Reliability, Fab Yield-Salvage & BLU Micro-Optics (D118–D125)
  // =========================================================================

  // D118: COG Glass-Ledge UV Silicone Anti-Corrosion Encapsulation ("Tuffy" Resin Bead)
  {
    const g = new THREE.Group();
    const ledge = new THREE.Mesh(createChamferedBoxGeo(cellW - 6.0, 5.4, 0.42, 0.25, 0.04, 'z'), mats.coverGlass);
    g.add(ledge);

    const acfGeo = createChamferedBoxGeo(24.0, 2.8, 0.14, 0.12, 0.02, 'z');
    applyPlanarUVs(acfGeo, 24.0, 2.8, 'xy-back');
    const acfBase = new THREE.Mesh(acfGeo, u.lcdAcfGoldMicrospheres);
    acfBase.position.set(0, 0.4, -0.22);
    g.add(acfBase);

    const dieGeo = createChamferedBoxGeo(22.0, 2.2, 0.36, 0.12, 0.03, 'z');
    applyPlanarUVs(dieGeo, 22.0, 2.2, 'xy-back');
    const dieBar = new THREE.Mesh(dieGeo, u.lcdDdicSiliconDie);
    dieBar.position.set(0, 0.4, -0.40);
    g.add(dieBar);

    const beadTop = new THREE.Mesh(createChamferedBoxGeo(cellW - 7.0, 1.35, 0.56, 0.45, 0.14, 'z'), mats.dustCatcherGel);
    beadTop.position.set(0, 1.9, -0.44);
    const beadBot = new THREE.Mesh(createChamferedBoxGeo(cellW - 7.0, 1.35, 0.56, 0.45, 0.14, 'z'), mats.dustCatcherGel);
    beadBot.position.set(0, -1.6, -0.44);
    g.add(beadTop, beadBot);

    for (let x = -24; x <= 24; x += 2.4) {
      const tr = new THREE.Mesh(createChamferedBoxGeo(0.25, 4.6, 0.08, 0.04, 0.01, 'z'), mats.goldPlating);
      tr.position.set(x, 0, -0.22);
      tr.userData.noEdges = true;
      g.add(tr);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-cog-tuffy-resin',
        118,
        '#f59e0b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y - cellH * 0.5 + 3.2, -33.48),
        new THREE.Vector3(-146, 76, -60),
        cp
      ),
      true
    );
  }

  // D119: Panel Perimeter Dummy Pixel Guard Ring (4–8 Rows/Cols Alignment & Field Buffer)
  {
    const g = new THREE.Group();
    const ringGeo = extrudeHiRes(
      createFrameShape(cellW - 2.6, cellH - 2.6, 0.4, cellW - 8.2, cellH - 8.2, 0.28),
      0.30,
      0.03,
      1
    );
    applyPlanarUVs(ringGeo, cellW - 2.6, cellH - 2.6, 'xy-back');
    g.add(new THREE.Mesh(ringGeo, u.lcdLtpsTftSilicon));

    for (let x = -28; x <= 28; x += 4.0) {
      for (const sy of [-1, 1]) {
        const dp = new THREE.Mesh(createChamferedBoxGeo(1.6, 1.8, 0.16, 0.08, 0.02, 'z'), mats.tungstenGrid);
        dp.position.set(x, sy * (cellH * 0.5 - 2.6), -0.18);
        g.add(dp);
      }
    }
    for (let y = -16; y <= 16; y += 4.0) {
      for (const sx of [-1, 1]) {
        const dp = new THREE.Mesh(createChamferedBoxGeo(1.8, 1.6, 0.16, 0.08, 0.02, 'z'), mats.tungstenGrid);
        dp.position.set(sx * (cellW * 0.5 - 2.6), y, -0.18);
        g.add(dp);
      }
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-dummy-pixel-ring',
        119,
        '#64748b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.58),
        new THREE.Vector3(-146, 16, -60),
        cp
      ),
      true
    );
  }

  // D120: Fab Redundant Laser-Repair Bus Ring (355 nm UV Cut / 532 nm Weld) & ESD Shorting Bar
  {
    const g = new THREE.Group();
    const outerLoop = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW - 1.4, cellH - 1.4, 0.3, cellW - 4.0, cellH - 4.0, 0.21), 0.24, 0.02, 1),
      mats.goldPlating
    );
    const innerLoop = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW - 4.4, cellH - 4.4, 0.2, cellW - 6.1, cellH - 6.1, 0.15), 0.22, 0.02, 1),
      mats.copperHybridBond
    );
    g.add(outerLoop, innerLoop);

    for (const [nx, ny] of [
      [-18, cellH * 0.5 - 2.0],
      [18, cellH * 0.5 - 2.0],
      [-18, -cellH * 0.5 + 2.0],
      [18, -cellH * 0.5 + 2.0],
    ]) {
      const weld = new THREE.Mesh(hiResCyl(1.15, 1.15, 0.44, 18), mats.bodyRecRed);
      weld.rotation.x = Math.PI * 0.5;
      weld.position.set(nx, ny, -0.18);
      g.add(weld);
    }
    // Top & bottom ESD diode shorting bar comb teeth
    for (let x = -12; x <= 12; x += 4) {
      const esdTooth = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.8, 0.28), mats.sinteredSilver);
      esdTooth.position.set(x, cellH * 0.5 - 1.8, -0.14);
      g.add(esdTooth);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-laser-repair-ring',
        120,
        '#ef4444',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.52),
        new THREE.Vector3(-146, -24, -60),
        cp
      ),
      true
    );
  }

  // D121: Side-View 0.4 mm White LED Internal Package Anatomy (InGaN Die, Au Wire, EMC Cavity, Cu Leadframe)
  {
    const g = new THREE.Group();
    const emcBack = new THREE.Mesh(createChamferedBoxGeo(14.0, 5.2, 2.2, 0.35, 0.08, 'z'), mats.ceramicAlumina);
    emcBack.position.z = 1.2;
    g.add(emcBack);
    for (const sy of [-1, 1]) {
      const wall = new THREE.Mesh(createChamferedBoxGeo(14.0, 1.1, 3.6, 0.2, 0.05, 'z'), mats.ceramicAlumina);
      wall.position.set(0, sy * 2.1, -0.2);
      g.add(wall);
    }
    // Internal silver-plated copper leadframe island + external gull-wing solder pads
    const centerPad = new THREE.Mesh(createChamferedBoxGeo(9.6, 2.8, 0.35, 0.15, 0.03, 'z'), mats.sinteredSilver);
    centerPad.position.set(0, 0, 0.1);
    g.add(centerPad);

    for (const sx of [-1, 1]) {
      const lead = new THREE.Mesh(createChamferedBoxGeo(3.6, 2.8, 0.9, 0.15, 0.05, 'z'), mats.silverElectrode);
      lead.position.set(sx * 7.6, 0, 0.8);
      const solder = new THREE.Mesh(createChamferedBoxGeo(2.2, 2.6, 0.45, 0.15, 0.04, 'z'), mats.goldPlating);
      solder.position.set(sx * 8.4, 0, 1.35);
      g.add(lead, solder);
    }
    // Dual blue 450 nm InGaN sapphire-substrate LED chips + 20 μm 99.99% Gold wirebond arches + Zener ESD die
    for (const dx of [-2.8, 2.8]) {
      const die = new THREE.Mesh(createChamferedBoxGeo(2.4, 2.0, 0.7, 0.1, 0.04, 'z'), mats.cfaBlue);
      die.position.set(dx, 0, -0.1);
      const wire = new THREE.Mesh(hiResTorus(1.4, 0.14, 10, 22, Math.PI), mats.goldPlating);
      wire.position.set(dx + 0.8, 0, -0.45);
      wire.rotation.x = Math.PI * 0.5;
      g.add(die, wire);
    }
    const zener = new THREE.Mesh(createChamferedBoxGeo(1.1, 1.1, 0.45, 0.08, 0.03, 'z'), mats.icEpoxy);
    zener.position.set(0, 0, -0.1);
    g.add(zener);

    // Warm pink-gold KSF (K2SiF6:Mn4+) + β-SiAlON phosphor silicone encapsulant window
    const phos = new THREE.Mesh(createChamferedBoxGeo(11.4, 3.0, 0.7, 0.2, 0.04, 'z'), mats.tantalumCapYellow);
    phos.position.set(0, 0, -1.65);
    g.add(phos);
    g.scale.setScalar(0.46);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-side-led-anatomy',
        121,
        '#fbbf24',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y - blH * 0.5 + 1.8, -32.75),
        new THREE.Vector3(146, -60, -64),
        cp
      ),
      true
    );
  }

  // D122: LGP Bottom-Face Laser Micro-Dot Density-Gradient Extraction Pattern (Sparse → Dense)
  {
    const g = new THREE.Group();
    const w = blW - 1.2;
    const h = blH - 1.2;
    const lgpGeo = createChamferedBoxGeo(w, h, 0.34, 0.35, 0.03, 'z');
    applyPlanarUVs(lgpGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(lgpGeo, u.lcdLgpDotGradient));

    for (let row = 0; row < 6; row++) {
      const t = row / 5;
      const y = -blH * 0.40 + t * blH * 0.80;
      const dotR = 0.24 + t * 0.50;
      const count = 7 + row;
      for (let c = 0; c < count; c++) {
        const x = -blW * 0.42 + (c / (count - 1)) * blW * 0.84;
        const dot = new THREE.Mesh(hiResCyl(dotR, dotR * 1.15, 0.16, 12), mats.lcdBacklightPrism);
        dot.rotation.x = Math.PI * 0.5;
        dot.position.set(x, y, -0.22);
        dot.userData.noEdges = true;
        g.add(dot);
      }
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-lgp-dot-gradient',
        122,
        '#0284c7',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.68),
        new THREE.Vector3(166, 58, -42),
        cp
      ),
      true
    );
  }

  // D123: LGP Top-Face Powder-Blasted Matte Micro-Texture & BLU Anti-Static (ESD) Coat
  {
    const g = new THREE.Group();
    const sheetGeo = createChamferedBoxGeo(blW - 1.4, blH - 1.4, 0.20, 0.35, 0.02, 'z');
    applyBoxUVs(sheetGeo, 16);
    g.add(new THREE.Mesh(sheetGeo, u.lcdDiffuserMicroBeads));

    const esdBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(blW - 1.2, blH - 1.2, 0.3, blW - 3.2, blH - 3.2, 0.21), 0.24, 0.02, 1),
      u.lcdNiCuConductiveFoam
    );
    esdBorder.position.z = -0.04;
    const gndEar = new THREE.Mesh(createChamferedBoxGeo(4.2, 1.8, 0.22, 0.2, 0.02, 'z'), mats.goldPlating);
    gndEar.position.set(blW * 0.35, -blH * 0.5 - 0.6, -0.04);
    g.add(esdBorder, gndEar);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-lgp-matte-esd',
        123,
        '#94a3b8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.86),
        new THREE.Vector3(146, 8, -32),
        cp
      ),
      true
    );
  }

  // D124: Cell-to-BLU Black Perimeter Light-Blocking Shading Double-Sided Tape
  {
    const g = new THREE.Group();
    const blackGeo = extrudeHiRes(
      createFrameShape(cellW - 0.6, cellH - 0.6, 0.45, cellW - 5.0, cellH - 5.0, 0.32),
      0.30,
      0.02,
      1
    );
    applyBoxUVs(blackGeo, 14);
    g.add(new THREE.Mesh(blackGeo, u.lcdPoronAcousticFoam));

    const whiteGeo = extrudeHiRes(
      createFrameShape(cellW - 0.8, cellH - 0.8, 0.4, cellW - 4.6, cellH - 4.6, 0.28),
      0.10,
      0.01,
      1
    );
    applyBoxUVs(whiteGeo, 14);
    const whiteBack = new THREE.Mesh(whiteGeo, u.lcdDiffuserMicroBeads);
    whiteBack.position.z = 0.20;
    const peelCorner = new THREE.Mesh(createChamferedBoxGeo(3.8, 1.6, 0.14, 0.2, 0.02, 'z'), mats.goldPlating);
    peelCorner.position.set(-cellW * 0.46, cellH * 0.5 + 0.5, 0.20);
    g.add(whiteBack, peelCorner);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-lcm-shading-tape',
        124,
        '#1e293b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.24),
        new THREE.Vector3(146, -32, -32),
        cp
      ),
      true
    );
  }

  // D125: LCM Back Chassis Factory Serial QR Barcode Plate & AOI Optical Inspection Fiducials
  {
    const g = new THREE.Group();
    const plateGeo = createChamferedBoxGeo(18.6, 11.2, 0.26, 0.4, 0.03, 'z');
    applyPlanarUVs(plateGeo, 18.6, 11.2, 'xy-back');
    g.add(new THREE.Mesh(plateGeo, u.lcdLcmFactoryQrLabel));

    for (const [fx, fy] of [
      [-10.8, 6.4],
      [10.8, 6.4],
      [-10.8, -6.4],
      [10.8, -6.4],
    ]) {
      const outer = new THREE.Mesh(hiResCyl(1.25, 1.25, 0.18, 18).rotateX(Math.PI * 0.5), mats.matteBlackAnodized);
      outer.position.set(fx, fy, 0.02);
      const inner = new THREE.Mesh(hiResCyl(0.78, 0.78, 0.24, 18).rotateX(Math.PI * 0.5), mats.goldPlating);
      inner.position.set(fx, fy, 0);
      g.add(outer, inner);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-lcm-qr-fiducial',
        125,
        '#cbd5e1',
        g,
        new THREE.Vector3(LCD_CENTER_X - 8.0, LCD_CENTER_Y + 6.0, -31.82),
        new THREE.Vector3(-146, -64, -26),
        cp
      ),
      true
    );
  }

  // =========================================================================
  // GROUP J: Sony α9 III / α1 II 4-Axis OEM Extended & Hinge Precision Mechanics (D126–D133)
  // =========================================================================

  // D126: α1 II Upgraded 4-Axis Hinge Block Core (A-5069-244-A) & α9 III Mold B Rev.2 (5-036-109-02)
  {
    const g = new THREE.Group();
    const mainGeo = createChamferedBoxGeo(5.2, 24.5, 3.2, 0.55, 0.12, 'z');
    applyBoxUVs(mainGeo, 12);
    g.add(new THREE.Mesh(mainGeo, u.lcdMaHingeMg));

    for (const ky of [-8.2, 8.2]) {
      const boss = new THREE.Mesh(hiResCyl(1.68, 1.68, 3.6, 24).rotateZ(Math.PI * 0.5), u.lcdBrushedSus304Blu);
      boss.position.set(0.0, ky, 0);
      const bush = new THREE.Mesh(hiResCyl(1.18, 1.18, 3.78, 18).rotateZ(Math.PI * 0.5), u.lcdSinteredBronzePore);
      bush.position.set(0.0, ky, 0);
      const bore = new THREE.Mesh(hiResCyl(0.82, 0.82, 3.95, 16).rotateZ(Math.PI * 0.5), mats.matteBlackAnodized);
      bore.position.set(0.0, ky, 0);
      bore.userData.noEdges = true;
      g.add(boss, bush, bore);
    }
    const moldB = new THREE.Mesh(createChamferedBoxGeo(4.2, 20.5, 0.9, 0.3, 0.06, 'z'), mats.mountPpsInsulator);
    moldB.position.set(-0.6, 0, 1.4);
    const scr = buildPhillipsScrew(0.95, 0.4, 0.45, 1.8, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
    scr.rotation.x = Math.PI / 2;
    scr.position.set(0, 0, -1.7);
    g.add(moldB, scr);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-a1m2-hinge-rev2',
        126,
        '#475569',
        g,
        new THREE.Vector3(hx - 2.6, LCD_CENTER_Y, -29.2),
        new THREE.Vector3(146, 56, 22),
        cp
      ),
      false
    );
  }

  // D127: Sony α9 III / α1 II Rear Cabinet LCD Relay Board & Mount (RS-1029 / RS-1026)
  {
    const g = new THREE.Group();
    const pcbGeo = createChamferedBoxGeo(16.5, 11.5, 0.85, 0.45, 0.06, 'z');
    applyPlanarUVs(pcbGeo, 16.5, 11.5, 'xy-back');
    g.add(new THREE.Mesh(pcbGeo, u.lcdPcbPd1072HiRes));

    for (const cx of [-4.2, 4.2]) {
      const b2b = new THREE.Mesh(createChamferedBoxGeo(5.8, 2.2, 0.95, 0.15, 0.04, 'z'), mats.zifIvoryPlastic);
      b2b.position.set(cx, 2.4, -0.82);
      const pins = new THREE.Mesh(new THREE.BoxGeometry(5.0, 2.5, 0.24), mats.goldPlating);
      pins.position.set(cx, 2.4, -0.58);
      g.add(b2b, pins);
    }
    const flexGeo = createChamferedBoxGeo(9.4, 4.2, 0.22, 0.25, 0.02, 'z');
    applyPlanarUVs(flexGeo, 9.4, 4.2, 'xy-back');
    const flexTail = new THREE.Mesh(flexGeo, u.lcdFpcFlexCircuit);
    flexTail.position.set(0, -6.2, -0.1);
    const mountBracket = new THREE.Mesh(createChamferedBoxGeo(18.2, 2.2, 0.65, 0.25, 0.04, 'z'), u.lcdBrushedSus304Blu);
    mountBracket.position.set(0, 5.2, 0.55);
    for (let i = -1; i <= 1; i++) {
      const c = buildSmdPassive(1.3, 0.7, 0.5, mats.smdCeramic, mats.solderBallSilver, 'z');
      c.position.set(i * 3.0, -2.0, -0.68);
      g.add(c);
    }
    g.add(flexTail, mountBracket);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-rs1029-rear-board',
        127,
        '#10b981',
        g,
        new THREE.Vector3(LCD_CENTER_X + 18.0, LCD_CENTER_Y + 4.0, -25.4),
        new THREE.Vector3(146, 16, 28),
        cp
      ),
      false
    );
  }

  // D128: Counterbalance Cam-Follower Torsion Assist Spring (Gravity-Neutral 4-Axis Tilt)
  {
    const g = new THREE.Group();
    for (const sy of [-5.2, 5.2]) {
      for (let i = 0; i < 6; i++) {
        const turn = new THREE.Mesh(hiResTorus(1.48, 0.26, 10, 24), mats.mountSpringSteel);
        turn.rotation.x = Math.PI * 0.5;
        turn.position.set(0, sy - 1.3 + i * 0.52, 0);
        g.add(turn);
      }
      const armA = new THREE.Mesh(hiResCyl(0.26, 0.26, 4.6, 12), mats.mountSpringSteel);
      armA.rotation.z = Math.PI * 0.32;
      armA.position.set(-1.5, sy + 1.5, 0.9);
      const armB = new THREE.Mesh(hiResCyl(0.26, 0.26, 4.4, 12), mats.mountSpringSteel);
      armB.rotation.z = -Math.PI * 0.28;
      armB.position.set(1.2, sy - 1.4, -0.9);
      const bush = new THREE.Mesh(hiResCyl(1.22, 1.22, 1.1, 18), u.lcdSinteredBronzePore);
      bush.position.set(0, sy, 0);
      g.add(armA, armB, bush);
    }
    const corePin = new THREE.Mesh(hiResCyl(0.95, 0.95, 15.8, 20), u.lcdBrushedSus304Blu);
    g.add(corePin);
    pushPart(
      finalizeLcdDeepPart(
        'lcd-torsion-assist-spring',
        128,
        '#94a3b8',
        g,
        new THREE.Vector3(hx - 2.8, LCD_CENTER_Y, -28.8),
        new THREE.Vector3(146, -24, 28),
        cp
      ),
      false
    );
  }

  // D129: Hinge Axial Preload Calibration Shim Washers (0.05–0.10 mm Precision Torque Shims)
  {
    const g = new THREE.Group();
    const shimMats = [
      u.lcdLaserDimpleFriction,
      mats.mountShimBlue,
      u.lcdBrushedSus304Blu,
      u.lcdSinteredBronzePore,
      mats.mountShimBlue,
      u.lcdLaserDimpleFriction,
    ];
    for (let i = 0; i < 6; i++) {
      const ringGeo = hiResTorus(1.88, 0.34, 12, 28);
      applyBoxUVs(ringGeo, 6);
      const ring = new THREE.Mesh(ringGeo, shimMats[i]);
      ring.scale.set(1, 1, 0.38);
      ring.position.set(0, -5.5 + i * 2.2, 0);
      ring.rotation.x = Math.PI * 0.5;
      g.add(ring);
    }
    const mandrel = new THREE.Mesh(hiResCyl(1.05, 1.05, 14.2, 20), u.lcdBrushedSus304Blu);
    const eClip = new THREE.Mesh(hiResTorus(1.38, 0.18, 8, 18, Math.PI * 1.5).rotateX(Math.PI / 2), mats.mountSpringSteel);
    eClip.position.y = 6.8;
    g.add(mandrel, eClip);
    pushPart(
      finalizeLcdDeepPart(
        'lcd-torque-preload-shims',
        129,
        '#d97706',
        g,
        new THREE.Vector3(hx - 2.6, LCD_CENTER_Y - 1.0, -29.6),
        new THREE.Vector3(146, -60, 22),
        cp
      ),
      false
    );
  }

  // D130: 4-Axis Pantograph End-Travel Acoustic Silicone Dampers (Silent Cinema Stop Cushions)
  {
    const g = new THREE.Group();
    for (const [dx, dy] of [
      [-18.0, 14.0],
      [18.0, 14.0],
      [-18.0, -14.0],
      [18.0, -14.0],
    ]) {
      const bGeo = createChamferedBoxGeo(5.4, 2.8, 1.8, 0.45, 0.14, 'z');
      applyBoxUVs(bGeo, 8);
      const bumper = new THREE.Mesh(bGeo, u.lcdPoronAcousticFoam);
      bumper.position.set(dx, dy, 0);
      const psa = new THREE.Mesh(createChamferedBoxGeo(5.6, 3.0, 0.16, 0.4, 0.02, 'z'), mats.thermalTransferTape);
      psa.position.set(dx, dy, 0.96);
      g.add(bumper, psa);
      for (let rx = -1.6; rx <= 1.6; rx += 1.06) {
        const rib = new THREE.Mesh(createChamferedBoxGeo(0.42, 2.2, 0.45, 0.08, 0.04, 'z'), mats.epdmGasket);
        rib.position.set(dx + rx, dy, -1.05);
        g.add(rib);
      }
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-pantograph-end-dampers',
        130,
        '#334155',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -27.2),
        new THREE.Vector3(146, 42, 66),
        cp
      ),
      false
    );
  }

  // D131: Hinge-Exit Micro-Coax Anti-Kink Silicone Strain-Relief Sleeve & Retaining Clip
  {
    const g = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const cGeo = hiResCyl(1.45 - i * 0.07, 1.62 - i * 0.07, 0.92, 20);
      applyBoxUVs(cGeo, 6);
      const collar = new THREE.Mesh(cGeo, u.lcdPoronAcousticFoam);
      collar.rotation.z = Math.PI * 0.5;
      collar.position.set(-2.8 + i * 1.12, 0, 0);
      g.add(collar);
    }
    const clip = new THREE.Mesh(hiResTorus(1.90, 0.28, 10, 24, Math.PI * 1.55), u.lcdBrushedSus304Blu);
    clip.rotation.y = Math.PI * 0.5;
    clip.position.set(-3.1, 0, 0);
    const wire = new THREE.Mesh(hiResCyl(0.68, 0.68, 8.2, 16), mats.rfGoldCoax);
    wire.rotation.z = Math.PI * 0.5;
    const braid = new THREE.Mesh(hiResCyl(0.76, 0.76, 3.2, 16), u.lcdNiCuConductiveFoam);
    braid.rotation.z = Math.PI * 0.5;
    braid.position.x = 3.2;
    g.add(clip, wire, braid);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-coax-strain-sleeve',
        131,
        '#f97316',
        g,
        new THREE.Vector3(hx - 4.6, LCD_CENTER_Y - 6.0, -28.4),
        new THREE.Vector3(146, 0, 68),
        cp
      ),
      false
    );
  }

  // D132: Rear Bay Waterproof Breathable ePTFE Pressure-Equalization Vent Membrane (IP68)
  {
    const g = new THREE.Group();
    const housingRing = new THREE.Mesh(hiResCyl(5.6, 5.6, 0.75, 30).rotateX(Math.PI * 0.5), u.lcdMaHingeMg);
    g.add(housingRing);

    const discGeo = hiResCyl(4.45, 4.45, 0.42, 30).rotateX(Math.PI * 0.5);
    applyPlanarUVs(discGeo, 8.9, 8.9, 'xy-back');
    const eptfeDisc = new THREE.Mesh(discGeo, u.lcdRearBayEptfeVent);
    eptfeDisc.position.z = -0.22;
    g.add(eptfeDisc);

    const oRing = new THREE.Mesh(hiResTorus(5.0, 0.45, 12, 30), mats.epdmGasket);
    oRing.position.z = 0.40;
    g.add(oRing);

    for (let i = -2; i <= 2; i++) {
      const bar = new THREE.Mesh(createChamferedBoxGeo(7.6, 0.35, 0.16, 0.05, 0.02, 'z'), u.lcdBrushedSus304Blu);
      bar.position.set(0, i * 1.4, -0.46);
      g.add(bar);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-rear-bay-eptfe-vent',
        132,
        '#06b6d4',
        g,
        new THREE.Vector3(LCD_CENTER_X - 18.0, LCD_CENTER_Y - 12.0, -24.8),
        new THREE.Vector3(0, 32, 118),
        cp
      ),
      false
    );
  }

  // D133: External Magnetic 3.2" Outdoor Glare Hood / ±3D Optical Loupe Mount Interface
  {
    const g = new THREE.Group();
    const baseGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH + 1.4, LCD_HEIGHT + 1.4, 1.4, LCD_WIDTH - 3.4, LCD_HEIGHT - 3.4, 0.98),
      0.75,
      0.08,
      1
    );
    applyBoxUVs(baseGeo, 18);
    g.add(new THREE.Mesh(baseGeo, u.lcdMaHingeMg));

    for (const [mx, my] of [
      [-LCD_WIDTH * 0.45, LCD_HEIGHT * 0.44],
      [LCD_WIDTH * 0.45, LCD_HEIGHT * 0.44],
      [-LCD_WIDTH * 0.45, -LCD_HEIGHT * 0.44],
      [LCD_WIDTH * 0.45, -LCD_HEIGHT * 0.44],
    ]) {
      const mag = new THREE.Mesh(hiResCyl(1.2, 1.2, 0.85, 18).rotateX(Math.PI * 0.5), mats.neodymiumMagnet);
      mag.position.set(mx, my, -0.35);
      const ring = new THREE.Mesh(hiResTorus(1.45, 0.18, 8, 18), mats.goldPlating);
      ring.position.set(mx, my, -0.76);
      g.add(mag, ring);
    }
    // Collapsible matte-velvet top & left/right glare-baffle visor wings
    const topVisor = new THREE.Mesh(createChamferedBoxGeo(LCD_WIDTH - 2.0, 1.4, 1.8, 0.25, 0.06, 'z'), mats.velvetFlockTrap);
    topVisor.position.set(0, LCD_HEIGHT * 0.5 + 0.1, -1.0);
    const leftVisor = new THREE.Mesh(createChamferedBoxGeo(1.3, LCD_HEIGHT - 2.0, 1.5, 0.2, 0.05, 'z'), mats.velvetFlockTrap);
    leftVisor.position.set(-LCD_WIDTH * 0.5 - 0.1, 0, -0.85);
    const rightVisor = new THREE.Mesh(createChamferedBoxGeo(1.3, LCD_HEIGHT - 2.0, 1.5, 0.2, 0.05, 'z'), mats.velvetFlockTrap);
    rightVisor.position.set(LCD_WIDTH * 0.5 + 0.1, 0, -0.85);
    g.add(topVisor, leftVisor, rightVisor);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-magnetic-glare-loupe',
        133,
        '#334155',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.26),
        new THREE.Vector3(0, 0, -138),
        cp
      ),
      true
    );
  }

  // =========================================================================
  // GROUP K: Advanced Touch, Power Safety, Signal Conditioning & Display Firmware Hardware (D134–D140)
  // =========================================================================

  // D134: Hybrid Mutual + Self-Capacitance Wet-Finger & Winter-Glove Touch AFE Engine
  {
    const g = new THREE.Group();
    const boardGeo = createChamferedBoxGeo(16.0, 11.0, 0.65, 0.35, 0.05, 'z');
    applyPlanarUVs(boardGeo, 16.0, 11.0, 'xy-back');
    g.add(new THREE.Mesh(boardGeo, u.lcdPcbPd1072HiRes));

    const afeIc = buildChipPackage({
      w: 6.4,
      d: 6.4,
      h: 0.82,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    afeIc.position.set(-2.4, 0, -0.75);
    g.add(afeIc);

    for (let i = 0; i < 4; i++) {
      const smd = buildSmdPassive(1.2, 0.65, 0.55, mats.smdCeramic, mats.solderBallSilver, 'z');
      smd.position.set(4.5, -3.0 + i * 2.0, -0.58);
      g.add(smd);
    }
    const osc = new THREE.Mesh(createChamferedBoxGeo(2.6, 2.0, 0.65, 0.12, 0.04, 'z'), mats.goldPlating);
    osc.position.set(4.5, 3.6, -0.62);
    g.add(osc);
    pushPart(
      finalizeLcdDeepPart(
        'lcd-hybrid-wet-touch-afe',
        134,
        '#0ea5e9',
        g,
        new THREE.Vector3(LCD_CENTER_X + 12.0, LCD_CENTER_Y - 12.0, -32.18),
        new THREE.Vector3(-126, -102, -38),
        cp
      ),
      true
    );
  }

  // D135: Mainboard-Side Display eFuse Power Load-Switch (OVP/OCP/SCP Short-Circuit Isolation)
  {
    const g = new THREE.Group();
    const subGeo = createChamferedBoxGeo(15.0, 10.5, 0.72, 0.35, 0.05, 'z');
    applyPlanarUVs(subGeo, 15.0, 10.5, 'xy-back');
    g.add(new THREE.Mesh(subGeo, u.lcdPcbPd1072HiRes));

    const efuse = buildChipPackage({
      w: 5.2,
      d: 4.4,
      h: 0.85,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    efuse.position.set(-2.2, 0.5, -0.78);
    const shunt = new THREE.Mesh(createChamferedBoxGeo(3.2, 1.6, 0.58, 0.1, 0.03, 'z'), mats.copperHeatSpreader);
    shunt.position.set(4.0, 2.2, -0.65);
    const tCap = buildTantalumCap(3.2, 1.8, 1.1, mats.tantalumCapYellow, mats.copperCoil, mats.solderBallSilver, 'z');
    tCap.position.set(4.0, -2.0, -0.88);
    const tvs = buildSmdPassive(2.2, 1.2, 0.72, mats.icEpoxy, mats.solderBallSilver, 'z', mats.sinteredSilver);
    tvs.position.set(-2.2, -3.4, -0.68);
    g.add(efuse, shunt, tCap, tvs);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-efuse-ovp-ocp-switch',
        135,
        '#f43f5e',
        g,
        new THREE.Vector3(LCD_CENTER_X - 10.0, LCD_CENTER_Y - 8.0, -25.2),
        new THREE.Vector3(-84, -102, 22),
        cp
      ),
      false
    );
  }

  // D136: 2.5 Gbps MIPI D-PHY 1.2 Signal ReDriver & Pre-Emphasis Equalizer IC (PI2MEQX2505Q Class)
  {
    const g = new THREE.Group();
    const boardGeo = createChamferedBoxGeo(16.5, 10.5, 0.68, 0.35, 0.05, 'z');
    applyPlanarUVs(boardGeo, 16.5, 10.5, 'xy-back');
    g.add(new THREE.Mesh(boardGeo, u.lcdPcbPd1072HiRes));

    const redriver = buildChipPackage({
      w: 6.8,
      d: 4.8,
      h: 0.78,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    redriver.position.set(0, 0, -0.72);
    g.add(redriver);

    for (let i = -2; i <= 2; i++) {
      const trL = new THREE.Mesh(createChamferedBoxGeo(4.2, 0.34, 0.10, 0.04, 0.01, 'z'), mats.goldPlating);
      trL.position.set(-5.8, i * 1.45, -0.38);
      const trR = new THREE.Mesh(createChamferedBoxGeo(4.2, 0.34, 0.10, 0.04, 0.01, 'z'), mats.goldPlating);
      trR.position.set(5.8, i * 1.45, -0.38);
      g.add(trL, trR);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-mipi-redriver-eq',
        136,
        '#6366f1',
        g,
        new THREE.Vector3(LCD_CENTER_X + 6.0, LCD_CENTER_Y - 8.0, -25.6),
        new THREE.Vector3(-42, -102, -18),
        cp
      ),
      false
    );
  }

  // D137: Real-Time Sunlight Readability Enhancement (SRE) Local Tone-Mapping & Hysteresis Engine
  {
    const g = new THREE.Group();
    const interGeo = createChamferedBoxGeo(15.5, 11.0, 0.65, 0.35, 0.05, 'z');
    applyPlanarUVs(interGeo, 15.5, 11.0, 'xy-back');
    g.add(new THREE.Mesh(interGeo, u.lcdPcbPd1072HiRes));

    const dieGeo = createChamferedBoxGeo(11.4, 7.6, 0.55, 0.2, 0.04, 'z');
    applyPlanarUVs(dieGeo, 11.4, 7.6, 'xy-back');
    const die = new THREE.Mesh(dieGeo, u.lcdDdicSiliconDie);
    die.position.z = -0.58;
    g.add(die);

    for (let i = -2; i <= 2; i++) {
      const c = buildSmdPassive(1.1, 0.6, 0.45, mats.tantalumCapYellow, mats.goldPlating, 'z');
      c.position.set(i * 2.4, -4.4, -0.52);
      g.add(c);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-sre-sunlight-engine',
        137,
        '#f59e0b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y - 11.0, -32.14),
        new THREE.Vector3(0, -102, -38),
        cp
      ),
      true
    );
  }

  // D138: Panel Self-Refresh (PSR) Embedded Remote Frame Buffer (RFB) & Power-Gating Controller
  {
    const g = new THREE.Group();
    const subGeo = createChamferedBoxGeo(16.0, 10.5, 0.65, 0.35, 0.05, 'z');
    applyPlanarUVs(subGeo, 16.0, 10.5, 'xy-back');
    g.add(new THREE.Mesh(subGeo, u.lcdPcbPd1072HiRes));

    const sramGeo = createChamferedBoxGeo(9.2, 6.8, 0.52, 0.18, 0.03, 'z');
    applyPlanarUVs(sramGeo, 9.2, 6.8, 'xy-back');
    const sram = new THREE.Mesh(sramGeo, u.lcdAudioDisplayChipDie);
    sram.position.set(-2.2, 0, -0.56);
    const ind = buildShieldedInductor(3.2, 1.4, mats.ferriteInductor, mats.solderBallSilver, mats.silverElectrode, 'z');
    ind.position.set(5.0, 0, -0.95);
    g.add(sram, ind);

    for (const sy of [-3.2, 3.2]) {
      const cap = buildSmdPassive(1.4, 0.8, 0.55, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(5.0, sy, -0.56);
      g.add(cap);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-psr-frame-buffer',
        138,
        '#22c55e',
        g,
        new THREE.Vector3(LCD_CENTER_X - 10.0, LCD_CENTER_Y - 12.0, -32.12),
        new THREE.Vector3(42, -102, -18),
        cp
      ),
      true
    );
  }

  // D139: Multi-Point NTC Temperature Sensor Network & Cold-Weather (−20 °C) LC Overdrive (OD) Dynamic LUT
  {
    const g = new THREE.Group();
    const flexGeo = createChamferedBoxGeo(18.0, 9.5, 0.36, 0.35, 0.03, 'z');
    applyPlanarUVs(flexGeo, 18.0, 9.5, 'xy-back');
    g.add(new THREE.Mesh(flexGeo, u.lcdFpcFlexCircuit));

    for (const [nx, ny] of [
      [-6.5, 2.4],
      [0.0, 0.0],
      [6.5, -2.4],
    ]) {
      const ntc = buildSmdPassive(1.8, 1.0, 0.85, mats.thermalPadPink, mats.solderBallSilver, 'z');
      ntc.position.set(nx, ny, -0.55);
      g.add(ntc);
    }
    const lutIc = buildChipPackage({
      w: 4.8,
      d: 4.8,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    lutIc.position.set(-5.0, -2.0, -0.56);
    g.add(lutIc);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-cold-od-thermal-lut',
        139,
        '#38bdf8',
        g,
        new THREE.Vector3(LCD_CENTER_X + 14.0, LCD_CENTER_Y - 6.0, -32.10),
        new THREE.Vector3(84, -102, 22),
        cp
      ),
      true
    );
  }

  // D140: Display Individual Calibration EDID / 3D Color Matrix & Serial Security Handshake IF
  {
    const g = new THREE.Group();
    const subGeo = createChamferedBoxGeo(15.0, 10.0, 0.65, 0.35, 0.05, 'z');
    applyPlanarUVs(subGeo, 15.0, 10.0, 'xy-back');
    g.add(new THREE.Mesh(subGeo, u.lcdPcbPd1072HiRes));

    const secIc = buildChipPackage({
      w: 5.6,
      d: 5.6,
      h: 0.78,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    secIc.position.set(-1.6, 0, -0.70);
    g.add(secIc);

    for (let i = 0; i < 4; i++) {
      const pad = new THREE.Mesh(hiResCyl(0.75, 0.75, 0.16, 16).rotateX(Math.PI * 0.5), mats.goldPlating);
      pad.position.set(4.8, -2.7 + i * 1.8, -0.40);
      g.add(pad);
    }
    const cap = buildSmdPassive(1.4, 0.8, 0.55, mats.smdCeramic, mats.solderBallSilver, 'z');
    cap.position.set(-5.6, 3.0, -0.56);
    g.add(cap);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-edid-color-handshake',
        140,
        '#a855f7',
        g,
        new THREE.Vector3(LCD_CENTER_X - 16.0, LCD_CENTER_Y - 6.0, -32.08),
        new THREE.Vector3(126, -102, -38),
        cp
      ),
      true
    );
  }

  // =========================================================================
  // GROUP L: 2026+ Post-LCD / Next-Gen Emissive Frontier Deep-Dive (D141–D150)
  // =========================================================================

  // D141: 2026 Pol-Less OLED COE (Color Filter on Encapsulation + Black Pixel Define Layer BPDL)
  {
    const g = new THREE.Group();
    const w = cellW - 4.0;
    const h = cellH - 4.0;
    const coeGeo = createChamferedBoxGeo(w, h, 0.34, 0.4, 0.03, 'z');
    applyPlanarUVs(coeGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(coeGeo, u.lcdCoePollessOled));

    const bpdlRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW - 3.2, cellH - 3.2, 0.5, cellW - 6.8, cellH - 6.8, 0.35), 0.42, 0.04, 1),
      mats.velvetFlockTrap
    );
    const cathTab = new THREE.Mesh(createChamferedBoxGeo(12.0, 1.2, 0.46, 0.15, 0.02, 'z'), mats.goldPlating);
    cathTab.position.set(0, -cellH * 0.5 + 1.4, 0);
    g.add(bpdlRim, cathTab);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-coe-polless-oled',
        141,
        '#ec4899',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.36),
        new THREE.Vector3(-124, 144, -56),
        cp
      ),
      true
    );
  }

  // D142: 2026 OLED Multi-Barrier Thin-Film Encapsulation TFE (ALD Al2O3/SiNx + Inkjet Organic, WVTR < 10^-6)
  {
    const g = new THREE.Group();
    const w = cellW - 4.2;
    const h = cellH - 4.2;
    const inorg1Geo = createChamferedBoxGeo(w, h, 0.16, 0.35, 0.02, 'z');
    applyPlanarUVs(inorg1Geo, w, h, 'xy-back');
    const inorg1 = new THREE.Mesh(inorg1Geo, u.lcdTfeAldBarrier);
    inorg1.position.z = -0.26;
    const orgIjp = new THREE.Mesh(createChamferedBoxGeo(w - 1.0, h - 1.0, 0.22, 0.35, 0.02, 'z'), mats.opticalCementClear);
    orgIjp.position.z = 0.0;
    const inorg2Geo = createChamferedBoxGeo(w, h, 0.16, 0.35, 0.02, 'z');
    applyPlanarUVs(inorg2Geo, w, h, 'xy-back');
    const inorg2 = new THREE.Mesh(inorg2Geo, u.lcdTfeAldBarrier);
    inorg2.position.z = 0.26;
    const damWall = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW - 3.6, cellH - 3.6, 0.4, cellW - 6.0, cellH - 6.0, 0.28), 0.72, 0.04, 1),
      mats.aluminaHighKFilm
    );
    g.add(inorg1, orgIjp, inorg2, damWall);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-tfe-ald-barrier',
        142,
        '#06b6d4',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.32),
        new THREE.Vector3(-62, 146, -56),
        cp
      ),
      true
    );
  }

  // D143: 2026 OLED Micro-Lens Array (MLA) Light-Extraction Dome Layer (+30% Luminance at Zero Extra Power)
  {
    const g = new THREE.Group();
    const w = cellW - 4.0;
    const h = cellH - 4.0;
    const mlaGeo = createChamferedBoxGeo(w, h, 0.28, 0.4, 0.03, 'z');
    applyPlanarUVs(mlaGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(mlaGeo, u.lcdMlaDomeLens));

    for (let r = -2; r <= 2; r++) {
      for (let c = -4; c <= 4; c++) {
        const dome = new THREE.Mesh(hiResSphere(1.45, 16), mats.evfMlaGlass);
        dome.scale.set(1, 1, 0.44);
        dome.position.set(c * 5.6 + (r % 2 === 0 ? 0 : 2.8), r * 5.2, -0.20);
        dome.userData.noEdges = true;
        g.add(dome);
      }
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-mla-dome-extractor',
        143,
        '#38bdf8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.30),
        new THREE.Vector3(0, 148, -56),
        cp
      ),
      true
    );
  }

  // D144: 2026 Blue Phosphorescent (PHOLED) / MR-TADF Hyperfluorescence 100% IQE Emitter Layer
  {
    const g = new THREE.Group();
    const w = cellW - 4.4;
    const h = cellH - 4.4;
    const hostGeo = createChamferedBoxGeo(w, h, 0.30, 0.35, 0.03, 'z');
    applyPlanarUVs(hostGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(hostGeo, u.lcdBluePholedStack));

    for (let i = -3; i <= 3; i++) {
      const band = new THREE.Mesh(createChamferedBoxGeo(cellW - 10.0, 1.6, 0.22, 0.2, 0.02, 'z'), mats.cfaBlue);
      band.position.set(0, i * 4.4, -0.22);
      band.userData.noEdges = true;
      g.add(band);
    }
    for (let x = -20; x <= 20; x += 8) {
      const node = new THREE.Mesh(hiResSphere(0.75, 14), mats.goldPlating);
      node.position.set(x, 0, -0.44);
      node.userData.noEdges = true;
      g.add(node);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-blue-pholed-hf',
        144,
        '#3b82f6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.28),
        new THREE.Vector3(62, 146, -56),
        cp
      ),
      true
    );
  }

  // D145: 2026 Inorganic GaN RGB MicroLED Mass-Transfer Subpixel Array (10 μm, >3,000 nit, Zero Burn-In)
  {
    const g = new THREE.Group();
    const w = cellW - 4.0;
    const h = cellH - 4.0;
    const bpGeo = createChamferedBoxGeo(w, h, 0.36, 0.4, 0.04, 'z');
    applyPlanarUVs(bpGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(bpGeo, u.lcdMicroLedGanArray));

    const chipMats = [mats.cfaRed, mats.cfaGreen, mats.cfaBlue];
    for (let r = -2; r <= 2; r++) {
      for (let c = -3; c <= 3; c++) {
        for (let k = 0; k < 3; k++) {
          const chip = new THREE.Mesh(createChamferedBoxGeo(0.95, 2.1, 0.32, 0.08, 0.02, 'z'), chipMats[k]);
          chip.position.set(c * 7.6 + (k - 1) * 1.45, r * 6.2, -0.32);
          chip.userData.noEdges = true;
          g.add(chip);
        }
      }
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-microled-gan-array',
        145,
        '#f43f5e',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.26),
        new THREE.Vector3(124, 144, -56),
        cp
      ),
      true
    );
  }

  // D146: 2026 Pixel-Level Cu-Cu Hybrid-Bonded MicroLED-to-CMOS/LTPS Interconnect Layer
  {
    const g = new THREE.Group();
    const w = cellW - 4.6;
    const h = cellH - 4.6;
    const waGeo = createChamferedBoxGeo(w, h, 0.38, 0.35, 0.04, 'z');
    applyPlanarUVs(waGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(waGeo, u.lcdMicroLedCuCuBond));

    for (let r = -2; r <= 2; r++) {
      for (let c = -4; c <= 4; c++) {
        const pillar = new THREE.Mesh(hiResCyl(0.56, 0.56, 0.44, 14).rotateX(Math.PI * 0.5), mats.copperHybridBond);
        pillar.position.set(c * 5.8, r * 5.8, -0.34);
        pillar.userData.noEdges = true;
        g.add(pillar);
      }
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-microled-cucu-bond',
        146,
        '#ea580c',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.22),
        new THREE.Vector3(-124, 144, 16),
        cp
      ),
      true
    );
  }

  // D147: 2026 Chip-on-Plastic (COP) 180°-Folded Polyimide Zero-Chin Flex Substrate
  {
    const g = new THREE.Group();
    const frontGeo = createChamferedBoxGeo(cellW - 6.0, 8.5, 0.24, 0.25, 0.02, 'z');
    applyPlanarUVs(frontGeo, cellW - 6.0, 8.5, 'xy-back');
    const frontTab = new THREE.Mesh(frontGeo, u.lcdFpcFlexCircuit);
    frontTab.position.set(0, 2.0, -0.65);

    const bend = new THREE.Mesh(
      hiResCyl(0.72, 0.72, cellW - 6.0, 22, true, 0, Math.PI),
      u.lcdFpcFlexCircuit
    );
    bend.rotation.z = Math.PI * 0.5;
    bend.rotation.x = Math.PI * 0.5;
    bend.position.set(0, -2.2, 0);

    const rearGeo = createChamferedBoxGeo(cellW - 6.0, 8.5, 0.24, 0.25, 0.02, 'z');
    applyPlanarUVs(rearGeo, cellW - 6.0, 8.5, 'xy');
    const rearTab = new THREE.Mesh(rearGeo, u.lcdFpcFlexCircuit);
    rearTab.position.set(0, 2.0, 0.65);

    const copGeo = createChamferedBoxGeo(22.0, 3.6, 0.45, 0.14, 0.04, 'z');
    applyPlanarUVs(copGeo, 22.0, 3.6, 'xy');
    const copDdic = new THREE.Mesh(copGeo, u.lcdDdicSiliconDie);
    copDdic.position.set(0, 2.4, 0.98);
    g.add(frontTab, bend, rearTab, copDdic);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-cop-folded-bezel',
        147,
        '#d97706',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y - cellH * 0.5 + 4.5, -32.90),
        new THREE.Vector3(-62, 146, 16),
        cp
      ),
      true
    );
  }

  // D148: 2026 In-Cell Direct-Touch on TFE (Y-OCTA / TOE Zero-Add-On Metal-Mesh Touch)
  {
    const g = new THREE.Group();
    const w = cellW - 4.2;
    const h = cellH - 4.2;
    const meshGeo = createChamferedBoxGeo(w, h, 0.18, 0.35, 0.02, 'z');
    applyPlanarUVs(meshGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(meshGeo, u.lcdYoctaMetalMesh));

    for (let x = -24; x <= 24; x += 6.0) {
      const mLine = new THREE.Mesh(createChamferedBoxGeo(0.22, cellH - 7.0, 0.16, 0.04, 0.01, 'z'), mats.titaniumRivet);
      mLine.position.set(x, 0, -0.14);
      mLine.userData.noEdges = true;
      g.add(mLine);
    }
    for (let y = -15; y <= 15; y += 5.0) {
      const mLine = new THREE.Mesh(createChamferedBoxGeo(cellW - 7.0, 0.22, 0.16, 0.04, 0.01, 'z'), mats.silverElectrode);
      mLine.position.set(0, y, -0.16);
      mLine.userData.noEdges = true;
      g.add(mLine);
    }
    pushPart(
      finalizeLcdDeepPart(
        'lcd-yocta-toe-mesh',
        148,
        '#14b8a6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.34),
        new THREE.Vector3(0, 148, 16),
        cp
      ),
      true
    );
  }

  // D149: 2026 Solid-State Piezo Localized Haptic Feedback Actuator Array Behind Display
  {
    const g = new THREE.Group();
    const carGeo = createChamferedBoxGeo(cellW - 8.0, cellH - 8.0, 0.36, 0.45, 0.04, 'z');
    applyBoxUVs(carGeo, 18);
    g.add(new THREE.Mesh(carGeo, u.lcdBrushedSus304Blu));

    for (const sx of [-13.0, 13.0]) {
      const pztGeo = createChamferedBoxGeo(16.0, 14.0, 0.68, 0.3, 0.05, 'z');
      applyPlanarUVs(pztGeo, 16.0, 14.0, 'xy-back');
      const pzt = new THREE.Mesh(pztGeo, u.lcdPiezoHaptTile);
      pzt.position.set(sx, 0, -0.45);
      const cymbal = new THREE.Mesh(createChamferedBoxGeo(14.5, 12.2, 0.22, 0.35, 0.03, 'z'), mats.brassGear);
      cymbal.position.set(sx, 0, -0.88);
      g.add(pzt, cymbal);
    }
    const drv = buildChipPackage({
      w: 4.2,
      d: 4.2,
      h: 0.65,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    drv.position.set(0, -10.0, -0.50);
    const flexTap = new THREE.Mesh(createChamferedBoxGeo(10.0, 3.2, 0.16, 0.2, 0.02, 'z'), u.lcdFpcFlexCircuit);
    flexTap.position.set(0, -14.8, -0.28);
    g.add(drv, flexTap);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-piezo-local-haptics',
        149,
        '#eab308',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.94),
        new THREE.Vector3(62, 146, 16),
        cp
      ),
      true
    );
  }

  // D150: 2026 Switchable Electronic Privacy / Narrow-Angle Viewing LC Shutter Layer
  {
    const g = new THREE.Group();
    const w = cellW - 3.6;
    const h = cellH - 3.6;
    const cellGeo = createChamferedBoxGeo(w, h, 0.30, 0.4, 0.03, 'z');
    applyPlanarUVs(cellGeo, w, h, 'xy-back');
    g.add(new THREE.Mesh(cellGeo, u.lcdPrivacyMicroLouver));

    for (let x = -24; x <= 24; x += 3.2) {
      const louver = new THREE.Mesh(createChamferedBoxGeo(0.24, cellH - 6.0, 0.36, 0.04, 0.01, 'z'), mats.matteBlackAnodized);
      louver.position.set(x, 0, -0.18);
      louver.userData.noEdges = true;
      g.add(louver);
    }
    const bus = new THREE.Mesh(createChamferedBoxGeo(1.4, cellH - 6.0, 0.34, 0.12, 0.03, 'z'), mats.goldPlating);
    bus.position.set(cellW * 0.5 - 2.6, 0, 0);
    const swFlex = new THREE.Mesh(createChamferedBoxGeo(5.0, 2.8, 0.18, 0.2, 0.02, 'z'), u.lcdFpcFlexCircuit);
    swFlex.position.set(cellW * 0.5 - 1.0, -cellH * 0.4, 0);
    g.add(bus, swFlex);

    pushPart(
      finalizeLcdDeepPart(
        'lcd-switchable-privacy-lc',
        150,
        '#8b5cf6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.92),
        new THREE.Vector3(124, 144, 16),
        cp
      ),
      true
    );
  }

  void createRoundedRectShape;

  return { parts, monitorParts };
}
