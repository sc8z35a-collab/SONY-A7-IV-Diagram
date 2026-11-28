//@FLOW_MAP|file=src/assemblies/lcd/lcdMicroParts.ts|unit=lcd|lines=1214|exports=buildLcdMicroParts
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
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildPhillipsScrew,
  buildShieldedInductor,
  buildSmdPassive,
  buildTantalumCap,
  createChamferedBoxGeo,
  hiResCyl,
  hiResSphere,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';
import { LCD_CENTER_X, LCD_CENTER_Y, LCD_HEIGHT, LCD_WIDTH } from './lcdParts';

function finalizeStandaloneLcdMicroPart(
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
 * Phase 15 + Phase 36 Ultra-HD Overhaul:
 * Build 24 Standalone-Only Rear 4-Axis Multi-Angle LCD Monitor OEM & Optical Micro-Parts (D28–D51).
 * Strictly omitted in whole-camera views ('integrated' / 'camera_body'); rendered ONLY in standalone 'lcd' view.
 */
export function buildLcdMicroParts(
  mats: MaterialLibrary
): { parts: CadPart[]; monitorParts: CadPart[] } {
  const parts: CadPart[] = [];
  const monitorParts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;
  const hingeWorldX = LCD_CENTER_X + LCD_WIDTH * 0.5 + 1.8;

  const cellW = LCD_WIDTH - 4.4;
  const cellH = LCD_HEIGHT - 4.4;
  const blW = LCD_WIDTH - 5.2;
  const blH = LCD_HEIGHT - 5.2;

  const pushPart = (p: CadPart, attachedToMonitor: boolean) => {
    parts.push(p);
    if (attachedToMonitor) monitorParts.push(p);
  };

  // =========================================================================
  // D28: Tri-Layer Cover-Glass Functional Coat (Fluorine AF + Multi-Layer AR + Hardcoat)
  // =========================================================================
  {
    const g = new THREE.Group();
    const coatPane = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(LCD_WIDTH - 1.2, LCD_HEIGHT - 1.2, 3.0), 0.10, 0.02, 0.02, 18),
      mats.lcdCoverGlass
    );
    coatPane.userData.noEdges = true;
    g.add(coatPane);

    // Multi-layer ZrO2/SiO2 AR interference outer bevel sheen frame
    const arRim = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH - 1.2, LCD_HEIGHT - 1.2, 3.0, LCD_WIDTH - 3.8, LCD_HEIGHT - 3.8, 2.4),
        0.14,
        0.02,
        0.02,
        16
      ),
      mats.nanoArIridescent
    );
    arRim.position.z = -0.02;
    g.add(arRim);

    // Fluorine oleophobic >115° lotus-effect beading micro-droplets on corner demonstration zone
    for (const [dx, dy, r] of [
      [-28.0, 18.0, 0.75],
      [-25.4, 19.2, 0.52],
      [-29.6, 15.8, 0.44],
      [28.2, 18.2, 0.68],
      [25.8, 16.4, 0.48],
    ]) {
      const drop = new THREE.Mesh(hiResSphere(r, 12, 10), mats.fluorineCoatCyan);
      drop.scale.set(1, 1, 0.65);
      drop.position.set(dx, dy, -0.10);
      drop.userData.noEdges = true;
      g.add(drop);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-ar-af-hardcoat',
        28,
        '#38bdf8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.36),
        new THREE.Vector3(0, 0, -90),
        cp,
        0.24
      ),
      true
    );
  }

  // =========================================================================
  // D29: Zero-Air-Gap 150 μm Optically Clear Adhesive (OCA) Full-Lamination Film
  // =========================================================================
  {
    const g = new THREE.Group();
    const ocaSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(cellW + 1.0, cellH + 1.0, 2.0), 0.16, 0.02, 0.02, 16),
      mats.lcdOcaFilm
    );
    g.add(ocaSheet);

    // Perimeter vacuum-lamination UV curing meniscus frame + corner factory peel-liner release tab
    const uvBorder = new THREE.Mesh(
      extrudeCentered(createFrameShape(cellW + 1.2, cellH + 1.2, 2.0, cellW - 0.8, cellH - 0.8, 1.4), 0.18, 0.015, 0.015, 16),
      mats.opticalCementClear
    );
    const peelTab = new THREE.Mesh(createChamferedBoxGeo(5.2, 2.4, 0.14, 0.3, 0.02, 'z'), mats.fluorineCoatCyan);
    peelTab.position.set(cellW * 0.44, cellH * 0.5 + 1.1, -0.04);
    g.add(uvBorder, peelTab);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-oca-bonding-film',
        29,
        '#7dd3fc',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.34),
        new THREE.Vector3(0, 0, -71),
        cp,
        0.3
      ),
      true
    );
  }

  // =========================================================================
  // D30: Perimeter Die-Cut Waterproof Foam PSA Gasket Tape & Ceramic Black Bezel Mask
  // =========================================================================
  {
    const g = new THREE.Group();
    const tapeGeo = extrudeCentered(
      createFrameShape(LCD_WIDTH - 0.8, LCD_HEIGHT - 0.8, 3.2, LCD_WIDTH - 6.8, LCD_HEIGHT - 6.4, 1.8),
      0.28,
      0.03,
      0.03,
      18
    );
    applyBoxUVs(tapeGeo, 14);
    g.add(new THREE.Mesh(tapeGeo, u.lcdPoronAcousticFoam));

    // Inner matte ceramic black frit light-blocking lip + bottom ALS optical sensor cutout accent
    const fritLip = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH - 6.6, LCD_HEIGHT - 6.2, 1.8, LCD_WIDTH - 8.6, LCD_HEIGHT - 8.2, 1.2),
        0.16,
        0.02,
        0.02,
        16
      ),
      u.lcdMaHingeMg
    );
    fritLip.position.z = -0.06;
    const alsNotch = new THREE.Mesh(hiResCyl(1.1, 1.1, 0.32, 14).rotateX(Math.PI / 2), mats.fluorineCoatCyan);
    alsNotch.position.set(16.0, -LCD_HEIGHT * 0.45, -0.02);
    alsNotch.userData.noEdges = true;
    g.add(fritLip, alsNotch);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-bezel-wp-psa-tape',
        30,
        '#1f2937',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.35),
        new THREE.Vector3(0, 36, -72),
        cp,
        0.24
      ),
      true
    );
  }

  // =========================================================================
  // D31: Mutual-Capacitance Transparent ITO Diamond Sensor Grid (Tx/Rx) & SiO2 Bridges
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-magnification optical microscopy PCAP ITO diamond electrode grid (cleanly tucked at z=-34.32 assembled!)
    const itoGeo = extrudeCentered(createRoundedRectShape(cellW, cellH, 1.6), 0.14, 0.015, 0.015, 16);
    applyPlanarUVs(itoGeo, cellW, cellH, 'xy-back');
    const baseFilm = new THREE.Mesh(itoGeo, u.lcdItoDiamondTouchGrid);
    g.add(baseFilm);

    // Perimeter laser-etched fine silver-paste routing collar + bottom ACF gold bonding fingers
    const busGeo = extrudeCentered(
      createFrameShape(cellW - 0.4, cellH - 0.4, 1.4, cellW - 3.2, cellH - 3.2, 1.0),
      0.16,
      0.015,
      0.015,
      14
    );
    applyPlanarUVs(busGeo, cellW - 0.4, cellH - 0.4, 'xy-back');
    const busFrame = new THREE.Mesh(busGeo, u.lcdSilverBezelBus);
    busFrame.position.z = 0.03;
    g.add(busFrame);

    for (let i = 0; i < 12; i++) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.4, 0.18), mats.goldPlating);
      pad.position.set(-7.2 + i * 1.3, -cellH * 0.48, -0.06);
      pad.userData.noEdges = true;
      g.add(pad);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-ito-touch-bridge',
        31,
        '#06b6d4',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.32),
        new THREE.Vector3(-48, 0, -70),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // D32: Rear 90° Input Polarizer Film (PVA Core + Twin TAC Protective Layers)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pW = LCD_WIDTH - 4.8;
    const pH = LCD_HEIGHT - 4.8;
    const rearGeo = extrudeCentered(createRoundedRectShape(pW, pH, 1.2), 0.24, 0.02, 0.02, 16);
    applyPlanarUVs(rearGeo, pW, pH, 'xy-back');
    const rearPol = new THREE.Mesh(rearGeo, u.lcdPvaIodineStretch);
    g.add(rearPol);

    // Twin TAC outer laminated skin edge rails + 90° alignment fiducial ear
    const tacSkin = new THREE.Mesh(
      extrudeCentered(createFrameShape(pW + 0.3, pH + 0.3, 1.2, pW - 1.4, pH - 1.4, 0.8), 0.26, 0.02, 0.02, 14),
      mats.aluminaHighKFilm
    );
    const alignTab = new THREE.Mesh(createChamferedBoxGeo(1.5, 5.4, 0.28, 0.2, 0.02, 'z'), mats.goldPlating);
    alignTab.position.set(-pW * 0.5 - 0.5, -pH * 0.32, 0);
    // 90° polarization orthogonal marker ticks
    const axisTick = new THREE.Mesh(createChamferedBoxGeo(0.55, 8.2, 0.30, 0.1, 0.02, 'z'), mats.fluorineCoatCyan);
    axisTick.position.set(-pW * 0.44, 0, -0.14);
    g.add(tacSkin, alignTab, axisTick);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-front-rear-pol-psa',
        32,
        '#4f46e5',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.85),
        new THREE.Vector3(0, 0, -44),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // D33: Internal IPS Cell Wide-Gamut RGB Color Filter Mosaic & Opaque Black Matrix (BM) Grid
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-magnification RGB Color Filter + Carbon Black Matrix full-panel optical microscope layer
    const cfGeo = extrudeCentered(createRoundedRectShape(cellW - 0.8, cellH - 0.8, 1.1), 0.20, 0.02, 0.02, 16);
    applyPlanarUVs(cfGeo, cellW - 0.8, cellH - 0.8, 'xy-back');
    g.add(new THREE.Mesh(cfGeo, u.lcdColorFilterBmMosaic));

    // Opaque carbon-resin perimeter Black Matrix framing aperture
    const bmFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(cellW - 0.4, cellH - 0.4, 1.2, cellW - 4.0, cellH - 4.0, 0.8), 0.24, 0.02, 0.02, 14),
      mats.matteBlackAnodized
    );
    g.add(bmFrame);

    // 3D Sculpted relief RGB DCI-P3 subpixel filter prism triplets along lower optical showcase band
    const rgbMats = [mats.cfaRed, mats.cfaGreen, mats.cfaBlue];
    for (let i = 0; i < 15; i++) {
      const sx = -25.2 + i * 3.6;
      const cell = new THREE.Mesh(createChamferedBoxGeo(2.8, 4.6, 0.16, 0.12, 0.02, 'z'), rgbMats[i % 3]);
      cell.position.set(sx, -cellH * 0.34, -0.14);
      cell.userData.noEdges = true;
      g.add(cell);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-cf-black-matrix',
        33,
        '#ec4899',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.28),
        new THREE.Vector3(-52, 22, -52),
        cp,
        0.24
      ),
      true
    );
  }

  // =========================================================================
  // D34: Nematic Liquid Crystal Layer (3.2 μm), Photo-Spacers & UV Perimeter Main Seal
  // =========================================================================
  {
    const g = new THREE.Group();
    const mainSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(cellW - 0.8, cellH - 0.8, 1.2, cellW - 3.6, cellH - 3.6, 0.8), 0.32, 0.03, 0.03, 14),
      mats.cinnabarAnodized
    );
    g.add(mainSeal);

    // Birefringent nematic liquid crystal fluid slab with aligned mesogen micro-texture
    const lcGeo = createChamferedBoxGeo(cellW - 3.8, cellH - 3.8, 0.18, 0.4, 0.02, 'z');
    applyPlanarUVs(lcGeo, cellW - 3.8, cellH - 3.8, 'xy-back');
    g.add(new THREE.Mesh(lcGeo, u.lcdNematicLiquidCrystal));

    // Dense array of 3.2 μm elastic resin photo-spacer columns
    const spacerGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.36, 12).rotateX(Math.PI / 2);
    const spacerPts: Array<[number, number]> = [];
    for (let sx = -24; sx <= 24; sx += 8) {
      for (let sy = -14; sy <= 14; sy += 7) {
        spacerPts.push([sx, sy]);
      }
    }
    const spacers = new THREE.InstancedMesh(spacerGeo, mats.goldPlating, spacerPts.length);
    const dummy = new THREE.Object3D();
    spacerPts.forEach(([px, py], i) => {
      dummy.position.set(px, py, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      spacers.setMatrixAt(i, dummy.matrix);
    });
    spacers.instanceMatrix.needsUpdate = true;
    g.add(spacers);

    // UV-cured ODF liquid-crystal injection fill-port seal plug
    const fillPlug = new THREE.Mesh(createChamferedBoxGeo(4.8, 1.4, 0.38, 0.25, 0.04, 'z'), mats.opticalCementClear);
    fillPlug.position.set(0, cellH * 0.48, 0);
    g.add(fillPlug);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-lc-photo-spacers',
        34,
        '#14b8a6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.20),
        new THREE.Vector3(-54, -18, -50),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // D35: Twin 50 nm Photo-Aligned Polyimide (PI) Molecular Alignment Films
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const dz of [-0.15, 0.15]) {
      const piGeo = extrudeCentered(createRoundedRectShape(cellW - 2.6, cellH - 2.6, 1.0), 0.08, 0.01, 0.01, 14);
      applyPlanarUVs(piGeo, cellW - 2.6, cellH - 2.6, 'xy-back');
      const piFilm = new THREE.Mesh(piGeo, u.lcdPiPhotoAlignment);
      piFilm.position.z = dz;
      g.add(piFilm);
    }

    // Visualized LPUV polarized molecular anchoring director bars
    for (let gy = -16; gy <= 16; gy += 4) {
      const groove = new THREE.Mesh(new THREE.BoxGeometry(cellW - 6.0, 0.18, 0.34), mats.goldPlating);
      groove.position.set(0, gy, 0);
      groove.userData.noEdges = true;
      g.add(groove);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-pi-alignment-films',
        35,
        '#8b5cf6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.22),
        new THREE.Vector3(0, 38, -50),
        cp,
        0.24
      ),
      true
    );
  }

  // =========================================================================
  // D36: LTPS Thin-Film Transistor Pixel Switch Matrix & Interdigitated IPS Comb Electrodes
  // =========================================================================
  {
    const g = new THREE.Group();
    const tftGeo = extrudeCentered(createRoundedRectShape(cellW - 0.8, cellH - 0.8, 1.2), 0.20, 0.02, 0.02, 16);
    applyPlanarUVs(tftGeo, cellW - 0.8, cellH - 0.8, 'xy-back');
    g.add(new THREE.Mesh(tftGeo, u.lcdLtpsTftSilicon));

    // Gate-in-Panel (GIP) integrated side scan driver strips along left/right glass borders
    for (const sx of [-1, 1]) {
      const gipGeo = createChamferedBoxGeo(2.4, cellH - 4.0, 0.28, 0.2, 0.03, 'z');
      applyPlanarUVs(gipGeo, 2.4, cellH - 4.0, 'xy-back');
      const gip = new THREE.Mesh(gipGeo, u.lcdDdicSiliconDie);
      gip.position.set(sx * (cellW * 0.5 - 1.8), 0, -0.04);
      g.add(gip);
    }

    // Precision Mo/Al/Mo gate & copper source busbar highlight overlays
    for (let ix = -26; ix <= 26; ix += 6.5) {
      const sourceLine = new THREE.Mesh(new THREE.BoxGeometry(0.26, cellH - 4.2, 0.24), mats.goldPlating);
      sourceLine.position.set(ix, 0, -0.06);
      sourceLine.userData.noEdges = true;
      g.add(sourceLine);
    }
    for (let iy = -16; iy <= 16; iy += 8.0) {
      const gateLine = new THREE.Mesh(new THREE.BoxGeometry(cellW - 5.2, 0.26, 0.24), mats.copperHybridBond);
      gateLine.position.set(0, iy, -0.06);
      gateLine.userData.noEdges = true;
      g.add(gateLine);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-ltps-tft-comb-array',
        36,
        '#0284c7',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.16),
        new THREE.Vector3(48, 28, -48),
        cp,
        0.24
      ),
      true
    );
  }

  // =========================================================================
  // D37: Anisotropic Conductive Film (ACF: 3 μm Gold Spheres) & COG Display Driver IC (DDIC)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ledgeY = -cellH * 0.5 - 0.1;
    const ledge = new THREE.Mesh(createChamferedBoxGeo(32.4, 3.0, 0.30, 0.2, 0.03, 'z'), mats.sswfGlass);
    ledge.position.set(-4.0, ledgeY, 0);
    g.add(ledge);

    // ArrayFix® ACF adhesive strip with gold-microsphere SEM texture
    const acfGeo = createChamferedBoxGeo(26.4, 2.2, 0.16, 0.15, 0.02, 'z');
    applyPlanarUVs(acfGeo, 26.4, 2.2, 'xy-back');
    const acfRibbon = new THREE.Mesh(acfGeo, u.lcdAcfGoldMicrospheres);
    acfRibbon.position.set(-4.0, ledgeY, -0.20);
    g.add(acfRibbon);

    // 3D compressed 3 μm conductive gold micro-spheres along ACF bond line
    for (let bx = -15.5; bx <= 7.5; bx += 1.65) {
      const bump = new THREE.Mesh(hiResSphere(0.30, 10, 8), mats.goldPlating);
      bump.position.set(bx, ledgeY, -0.32);
      bump.userData.noEdges = true;
      g.add(bump);
    }

    // Elongated monolithic bare-silicon COG DDIC die with full lithographic floorplan
    const ddicGeo = createChamferedBoxGeo(21.4, 1.85, 0.55, 0.12, 0.04, 'z');
    applyPlanarUVs(ddicGeo, 21.4, 1.85, 'xy-back');
    const ddicDie = new THREE.Mesh(ddicGeo, u.lcdDdicSiliconDie);
    ddicDie.position.set(-4.0, ledgeY, -0.56);
    g.add(ddicDie);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-acf-cog-ddic',
        37,
        '#eab308',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.75),
        new THREE.Vector3(-26, -38, -52),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // D38: Multi-Layer Reflective Polarizer DBEF Light-Recycling Film
  // =========================================================================
  {
    const g = new THREE.Group();
    const dbefGeo = extrudeCentered(createRoundedRectShape(blW, blH, 1.2), 0.20, 0.02, 0.02, 16);
    applyPlanarUVs(dbefGeo, blW, blH, 'xy-back');
    g.add(new THREE.Mesh(dbefGeo, u.lcdDbefOpticalPrism));

    // Precision factory registration ear tabs with punched dowel holes
    for (const ex of [-blW * 0.3, blW * 0.3]) {
      const ear = new THREE.Mesh(createChamferedBoxGeo(4.4, 1.5, 0.22, 0.25, 0.02, 'z'), u.lcdDbefOpticalPrism);
      ear.position.set(ex, blH * 0.5 + 0.65, 0);
      const hole = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.26, 12).rotateX(Math.PI / 2), mats.matteBlackAnodized);
      hole.position.set(ex, blH * 0.5 + 0.72, 0);
      hole.userData.noEdges = true;
      g.add(ear, hole);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-dbef-reflective-pol',
        38,
        '#a855f7',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.55),
        new THREE.Vector3(48, 0, -40),
        cp,
        0.28
      ),
      true
    );
  }

  // =========================================================================
  // D39: Micro-Bead Coated PET Optical Diffuser Film (Uniform Lambertian Layer)
  // =========================================================================
  {
    const g = new THREE.Group();
    const diffGeo = extrudeCentered(createRoundedRectShape(blW, blH, 1.2), 0.18, 0.02, 0.02, 16);
    applyBoxUVs(diffGeo, 18);
    g.add(new THREE.Mesh(diffGeo, u.lcdDiffuserMicroBeads));

    // Asymmetric poka-yoke factory assembly ear tabs with punched registration holes
    for (const ex of [-blW * 0.36, blW * 0.22]) {
      const ear = new THREE.Mesh(createChamferedBoxGeo(4.6, 1.5, 0.18, 0.25, 0.02, 'z'), u.lcdDiffuserMicroBeads);
      ear.position.set(ex, blH * 0.5 + 0.65, 0);
      const hole = new THREE.Mesh(hiResCyl(0.42, 0.42, 0.22, 12).rotateX(Math.PI / 2), mats.matteBlackAnodized);
      hole.position.set(ex, blH * 0.5 + 0.70, 0);
      hole.userData.noEdges = true;
      g.add(ear, hole);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-bottom-diffuser-sheet',
        39,
        '#e2e8f0',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.85),
        new THREE.Vector3(0, 0, -32),
        cp,
        0.28
      ),
      true
    );
  }

  // =========================================================================
  // D40: White TiO2 Reflective Polycarbonate BLU Mold Frame & Black Light-Blocking Shading Tape
  // =========================================================================
  {
    const g = new THREE.Group();
    const moldGeo = extrudeCentered(
      createFrameShape(blW + 2.4, blH + 2.4, 1.8, blW - 0.8, blH - 0.8, 1.0),
      1.1,
      0.06,
      0.06,
      16
    );
    applyBoxUVs(moldGeo, 18);
    g.add(new THREE.Mesh(moldGeo, u.lcdDiffuserMicroBeads));

    // Top-facing opaque black light-blocking perimeter shading tape
    const shadeGeo = extrudeCentered(
      createFrameShape(blW + 2.2, blH + 2.2, 1.7, blW - 2.0, blH - 2.0, 0.9),
      0.18,
      0.02,
      0.02,
      16
    );
    applyBoxUVs(shadeGeo, 16);
    const shadeTape = new THREE.Mesh(shadeGeo, u.lcdPoronAcousticFoam);
    shadeTape.position.z = -0.62;
    g.add(shadeTape);

    // 6 Molded snap-hook retention lugs locking BLU optical sheets into SUS304 tray
    for (const sx of [-22, 0, 22]) {
      for (const sy of [-1, 1]) {
        const lug = new THREE.Mesh(createChamferedBoxGeo(3.4, 1.1, 0.85, 0.15, 0.04, 'z'), mats.pomGear);
        lug.position.set(sx, sy * (blH * 0.5 + 1.45), 0.12);
        g.add(lug);
      }
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-blu-mold-frame-tape',
        40,
        '#cbd5e1',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.7),
        new THREE.Vector3(0, 38, -30),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // D41: Wide-Gamut KSF Red-Phosphor Side-View LED Bar & Metal-Core Thermal Strip
  // =========================================================================
  {
    const g = new THREE.Group();
    // Copper-aluminum MCPCB heat spreader bar + white high-reflectance LED strip PCB
    const heatBar = new THREE.Mesh(createChamferedBoxGeo(blW - 3.6, 2.8, 0.44, 0.25, 0.04, 'z'), mats.copperHeatSpreader);
    heatBar.position.set(0, -blH * 0.5 + 1.0, 0.44);
    const mcpcbGeo = createChamferedBoxGeo(blW - 3.8, 2.4, 0.26, 0.2, 0.02, 'z');
    applyPlanarUVs(mcpcbGeo, blW - 3.8, 2.4, 'xy-back');
    const mcpcb = new THREE.Mesh(mcpcbGeo, u.lcdSideLedMcpcb);
    mcpcb.position.set(0, -blH * 0.5 + 1.0, 0.08);
    g.add(heatBar, mcpcb);

    // 10 KSF Red/Green Phosphor-Enhanced 3806 Side-View LED Packages + silver solder fillets
    const ksfMat = new THREE.MeshStandardMaterial({
      color: 0xffd1dc,
      emissive: 0xfda4af,
      emissiveIntensity: 1.15,
      roughness: 0.18,
      clippingPlanes: cp,
    });
    for (let i = 0; i < 10; i++) {
      const lx = -blW * 0.42 + (i / 9) * (blW * 0.84);
      const pkg = new THREE.Mesh(createChamferedBoxGeo(2.2, 1.4, 0.65, 0.15, 0.04, 'z'), mats.ceramicAlumina);
      pkg.position.set(lx, -blH * 0.5 + 1.1, -0.05);
      const ksfCup = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.85, 0.44), ksfMat);
      ksfCup.position.set(lx, -blH * 0.5 + 1.38, -0.14);
      ksfCup.userData.noEdges = true;
      const padL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.42), mats.goldPlating);
      padL.position.set(lx - 1.22, -blH * 0.5 + 1.1, -0.04);
      const padR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.42), mats.goldPlating);
      padR.position.set(lx + 1.22, -blH * 0.5 + 1.1, -0.04);
      padL.userData.noEdges = true;
      padR.userData.noEdges = true;
      g.add(pkg, ksfCup, padL, padR);
    }

    const tailGeo = createChamferedBoxGeo(5.8, 2.2, 0.22, 0.2, 0.02, 'z');
    applyPlanarUVs(tailGeo, 5.8, 2.2, 'xy-back');
    const tail = new THREE.Mesh(tailGeo, u.lcdFpcFlexCircuit);
    tail.position.set(blW * 0.46, -blH * 0.5 + 1.1, 0.25);
    g.add(tail);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-ksf-led-phosphor-sink',
        41,
        '#f43f5e',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.45),
        new THREE.Vector3(32, -38, -28),
        cp,
        0.24
      ),
      true
    );
  }

  // =========================================================================
  // D42: Sony OEM In-Monitor LED Boost & Interface Relay Sub-Board PD-1072 (Ref.LCD901)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcbGeo = extrudeCentered(createRoundedRectShape(26.4, 12.2, 1.4), 0.58, 0.04, 0.04, 16);
    applyPlanarUVs(pcbGeo, 26.4, 12.2, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, u.lcdPcbPd1072HiRes);
    pcb.position.set(10.0, -4.0, 0);
    g.add(pcb);

    // 28V Shielded Ferrite Boost Power Inductor + TPS61165 Boost QFN + Multi-Rail TFT Bias PMIC
    const inductor = buildShieldedInductor(3.8, 1.2, mats.ferriteInductor, mats.solderBallSilver, mats.sinteredSilver, 'z');
    inductor.position.set(2.5, -4.0, 0.85);
    const boostIc = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    boostIc.position.set(8.2, -3.5, 0.62);
    const pmic = buildChipPackage({
      w: 4.0,
      d: 3.6,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    pmic.position.set(14.5, -4.5, 0.62);

    // Shielded I-PEX micro-coax receptacle with gold contact pin comb
    const coaxConn = new THREE.Mesh(createChamferedBoxGeo(2.8, 9.4, 0.82, 0.25, 0.05, 'z'), u.lcdBrushedSus304Blu);
    coaxConn.position.set(20.6, -4.0, 0.62);
    const coaxPins = new THREE.Mesh(new THREE.BoxGeometry(3.2, 8.2, 0.24), mats.goldPlating);
    coaxPins.position.set(20.6, -4.0, 0.36);

    // Tantalum bulk reservoir cap + 0201 SMD boost filter bank
    const tant = buildTantalumCap(2.6, 1.4, 0.95, mats.tantalumCapYellow, mats.cinnabarAnodized, mats.solderBallSilver, 'z');
    tant.position.set(2.2, -7.8, 0.68);
    g.add(inductor, boostIc, pmic, coaxConn, coaxPins, tant);
    for (let i = 1; i < 5; i++) {
      const cap = buildSmdPassive(1.3, 0.72, 0.55, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(2.4 + i * 3.1, -7.8, 0.52);
      g.add(cap);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-pd1072-driver-board',
        42,
        '#10b981',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.78),
        new THREE.Vector3(-48, -4, -22),
        cp,
        0.24
      ),
      true
    );
  }

  // =========================================================================
  // D43: 36-Strand AWG44 Ultra-Fine Micro-Coaxial Swivel Harness (Sony Ref.156: 100597621)
  // =========================================================================
  {
    const g = new THREE.Group();
    const basePts = [
      new THREE.Vector3(-10.5, 1.5, -1.0),
      new THREE.Vector3(-3.5, 3.2, 0.5),
      new THREE.Vector3(1.6, 0.8, 1.8),
      new THREE.Vector3(0.6, -3.8, 1.6),
      new THREE.Vector3(-4.0, -5.6, 1.0),
      new THREE.Vector3(-10.2, -5.8, 1.6),
    ];
    // 8 Helically twisted micro-coax sub-bundles (gold/copper/silver braid contrast!)
    for (let s = 0; s < 8; s++) {
      const ang = (s / 8) * Math.PI * 2;
      const offsetPts = basePts.map(
        (pt, pIdx) =>
          new THREE.Vector3(
            pt.x + Math.cos(ang + pIdx * 0.95) * 0.56,
            pt.y + Math.sin(ang + pIdx * 0.95) * 0.56,
            pt.z + Math.cos(ang * 2 + pIdx * 0.65) * 0.38
          )
      );
      const curve = new THREE.CatmullRomCurve3(offsetPts);
      const strand = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 30, 0.21, 8, false),
        s % 3 === 0 ? mats.rfGoldCoax : s % 3 === 1 ? mats.coaxShieldCopper : mats.sinteredSilver
      );
      strand.userData.noEdges = true;
      g.add(strand);
    }

    // Center Ni/Cu ripstop braided EMI sleeve band
    const midWrap = new THREE.Mesh(hiResCyl(1.18, 1.18, 4.2, 16), u.lcdNiCuConductiveFoam);
    midWrap.position.set(1.2, -1.5, 1.75);
    g.add(midWrap);

    // Dual I-PEX shielded metal micro-coax plug bars with gold ground bars & locking pull-tabs
    for (const [px, py, pz, h] of [
      [-10.8, 1.5, -1.0, 8.6],
      [-10.6, -5.8, 1.6, 9.0],
    ]) {
      const plug = new THREE.Mesh(createChamferedBoxGeo(2.7, h, 0.92, 0.25, 0.06, 'z'), u.lcdBrushedSus304Blu);
      plug.position.set(px, py, pz);
      const gnd = new THREE.Mesh(new THREE.BoxGeometry(0.95, h - 0.8, 0.42), mats.goldPlating);
      gnd.position.set(px + 1.2, py, pz);
      g.add(plug, gnd);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-fine-coaxial-bundle',
        43,
        '#d97706',
        g,
        new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.4),
        new THREE.Vector3(74, 14, 14),
        cp,
        0.26
      ),
      false
    );
  }

  // =========================================================================
  // D44: 4-Axis Tilt-Stage Intermediate Flex PCB LC-1058 (Sony 4-Axis OEM)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pts = [
      new THREE.Vector3(14.0, -5.5, 1.2),
      new THREE.Vector3(24.0, -5.5, 0.4),
      new THREE.Vector3(31.0, -2.5, -0.4),
      new THREE.Vector3(35.0, 2.0, -0.8),
    ];
    const curve = new THREE.CatmullRomCurve3(pts);
    const ribbon = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.72, 8, false), u.lcdFpcFlexCircuit);
    ribbon.scale.set(1, 3.2, 0.35);
    ribbon.userData.noEdges = true;
    g.add(ribbon);

    // Textured LC-1058 EMI shield overlay + dual FR-4 stiffened ends with 30-pin gold B2B plugs
    const shieldGeo = createChamferedBoxGeo(16.4, 6.4, 0.24, 0.3, 0.02, 'z');
    applyPlanarUVs(shieldGeo, 16.4, 6.4, 'xy-back');
    const shieldBar = new THREE.Mesh(shieldGeo, u.lcdFpcFlexCircuit);
    shieldBar.position.set(22.0, -5.0, 0.5);
    g.add(shieldBar);

    for (const [sx, sy, sz] of [
      [13.5, -5.5, 1.1],
      [34.5, 2.0, -0.8],
    ]) {
      const stiff = new THREE.Mesh(createChamferedBoxGeo(4.4, 7.4, 0.48, 0.25, 0.04, 'z'), mats.zifIvoryPlastic);
      stiff.position.set(sx, sy, sz);
      const pins = new THREE.Mesh(new THREE.BoxGeometry(1.8, 6.2, 0.56), mats.goldPlating);
      pins.position.set(sx, sy, sz);
      g.add(stiff, pins);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-lc1058-tilt-flex',
        44,
        '#ea580c',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -29.0),
        new THREE.Vector3(-48, -14, 16),
        cp,
        0.24
      ),
      false
    );
  }

  // =========================================================================
  // D45: Conductive Fabric-Over-Foam Connector Gasket S (Sony Ref.152: 503623601)
  // =========================================================================
  {
    const g = new THREE.Group();
    const gGeo = extrudeCentered(createRoundedRectShape(5.0, 11.6, 0.9), 1.38, 0.14, 0.14, 16);
    applyBoxUVs(gGeo, 8);
    const gasketBlock = new THREE.Mesh(gGeo, u.lcdNiCuConductiveFoam);
    gasketBlock.position.set(20.6, -4.0, 0.95);
    g.add(gasketBlock);

    // Conductive acrylic PSA base pad + copper-foil grounding bridge strap with contact rivets
    const psaPad = new THREE.Mesh(createChamferedBoxGeo(5.2, 11.8, 0.16, 0.8, 0.02, 'z'), mats.thermalTransferTape);
    psaPad.position.set(20.6, -4.0, 0.22);
    const gndStrap = new THREE.Mesh(createChamferedBoxGeo(10.8, 4.4, 0.18, 0.3, 0.02, 'z'), mats.copperHeatSpreader);
    gndStrap.position.set(26.5, -4.0, 0.72);
    for (const dx of [24.0, 29.0]) {
      const dot = new THREE.Mesh(hiResCyl(0.65, 0.65, 0.26, 12).rotateX(Math.PI / 2), mats.goldPlating);
      dot.position.set(dx, -4.0, 0.72);
      g.add(dot);
    }
    g.add(psaPad, gndStrap);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-gasket-s-emi-foam',
        45,
        '#94a3b8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.7),
        new THREE.Vector3(-48, -28, -22),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // D46: Rear LCD Cover Waterproof Potting Seal (Ref.151) & M1.7/M1.4 Micro-Screws (Ref.153/158)
  // =========================================================================
  {
    const g = new THREE.Group();
    const potGeo = extrudeCentered(
      createFrameShape(LCD_WIDTH - 1.0, LCD_HEIGHT - 1.0, 3.2, LCD_WIDTH - 3.2, LCD_HEIGHT - 3.2, 2.5),
      0.48,
      0.08,
      0.08,
      18
    );
    applyBoxUVs(potGeo, 14);
    g.add(new THREE.Mesh(potGeo, u.lcdPoronAcousticFoam));

    // Inner secondary lip seal rib
    const innerLip = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH - 3.4, LCD_HEIGHT - 3.4, 2.5, LCD_WIDTH - 4.4, LCD_HEIGHT - 4.4, 2.2),
        0.32,
        0.04,
        0.04,
        16
      ),
      mats.epdmGasket
    );
    innerLip.position.z = -0.14;
    g.add(innerLip);

    // 7x Precision black-oxide Phillips tapping screws with blue threadlock bands
    const screwPts: Array<[number, number, number]> = [
      [-LCD_WIDTH * 0.42, LCD_HEIGHT * 0.4, 0.1],
      [LCD_WIDTH * 0.42, LCD_HEIGHT * 0.4, 0.1],
      [-LCD_WIDTH * 0.42, -LCD_HEIGHT * 0.4, 0.1],
      [LCD_WIDTH * 0.42, -LCD_HEIGHT * 0.4, 0.1],
      [-18.0, 0, 1.2],
      [0, 0, 1.2],
      [18.0, 0, 1.2],
    ];
    for (const [sx, sy, sz] of screwPts) {
      const sc = buildPhillipsScrew(1.15, 0.5, 0.56, 2.5, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
      sc.rotation.x = Math.PI / 2;
      sc.position.set(sx, sy, sz);
      g.add(sc);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-cab-r-potting-seal',
        46,
        '#2563eb',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.15),
        new THREE.Vector3(0, 0, -6),
        cp,
        0.24
      ),
      true
    );
  }

  // =========================================================================
  // D47: Split Front & Rear Hinge Armor Clamshell Covers (Sony Ref.159 / Ref.161)
  // =========================================================================
  {
    const g = new THREE.Group();
    const frontGeo = hiResCyl(4.55, 4.55, 23.6, 24, false, Math.PI * 0.5, Math.PI);
    applyBoxUVs(frontGeo, 12);
    const frontCover = new THREE.Mesh(frontGeo, u.lcdMaHingeMg);
    frontCover.position.set(0, 0, -0.35);
    g.add(frontCover);

    const rearGeo = hiResCyl(4.55, 4.55, 23.6, 24, false, -Math.PI * 0.5, Math.PI);
    applyBoxUVs(rearGeo, 12);
    const rearCover = new THREE.Mesh(rearGeo, u.lcdMaHingeMg);
    rearCover.position.set(0, 0, 0.35);
    g.add(rearCover);

    // Brushed metallic upper/lower hinge decorative accent rings + cable-entry cheek fairing
    for (const ry of [-11.5, 11.5]) {
      const trim = new THREE.Mesh(hiResCyl(4.65, 4.65, 0.55, 24), u.lcdBrushedSus304Blu);
      trim.position.set(0, ry, 0);
      g.add(trim);
    }
    const fairingGeo = extrudeCentered(createRoundedRectShape(6.2, 11.4, 2.0), 4.6, 0.25, 0.25, 16);
    applyBoxUVs(fairingGeo, 10);
    const fairing = new THREE.Mesh(fairingGeo, u.lcdMaHingeMg);
    fairing.position.set(-2.6, 0, 0);
    g.add(fairing);

    for (const sy of [-8.8, 8.8]) {
      const sc = buildPhillipsScrew(1.0, 0.42, 0.48, 1.8, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
      sc.rotation.x = Math.PI / 2;
      sc.position.set(2.2, sy, 3.6);
      g.add(sc);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-sv-hinge-covers',
        47,
        '#334155',
        g,
        new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.4),
        new THREE.Vector3(76, -18, 0),
        cp,
        0.24
      ),
      false
    );
  }

  // =========================================================================
  // D48: 4-Axis Multi-Angle Rear Pantograph Cavity Molded Guard (Sony MA HINGE BACK MOLD B)
  // =========================================================================
  {
    const g = new THREE.Group();
    const guardGeo = extrudeCentered(createRoundedRectShape(LCD_WIDTH - 10.0, LCD_HEIGHT - 12.0, 2.6), 0.72, 0.08, 0.08, 18);
    applyBoxUVs(guardGeo, 18);
    g.add(new THREE.Mesh(guardGeo, u.lcdMaHingeMg));

    for (const ry of [-10.0, 0, 10.0]) {
      const rib = new THREE.Mesh(createChamferedBoxGeo(LCD_WIDTH - 18.0, 1.6, 0.95, 0.25, 0.06, 'z'), u.lcdMaHingeMg);
      rib.position.set(0, ry, 0.2);
      g.add(rib);
    }

    // Twin POM snap-fit retention hooks + recessed stainless wear guide rails
    for (const sx of [-1, 1]) {
      const clip = new THREE.Mesh(createChamferedBoxGeo(3.2, 10.2, 1.15, 0.3, 0.06, 'z'), mats.pomGear);
      clip.position.set(sx * (LCD_WIDTH * 0.5 - 5.2), 0, 0.35);
      const wearRail = new THREE.Mesh(createChamferedBoxGeo(1.8, 22.0, 0.35, 0.2, 0.03, 'z'), u.lcdBrushedSus304Blu);
      wearRail.position.set(sx * 22.0, 0, -0.35);
      g.add(clip, wearRail);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-ma-hinge-back-mold',
        48,
        '#475569',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -28.4),
        new THREE.Vector3(0, 0, 20),
        cp,
        0.24
      ),
      false
    );
  }

  // =========================================================================
  // D49: Die-Cut Hinge Base Waterproof Sealing Tape SV ADHESIVE (HINGE) (Sony Ref.155)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ovalGeo = extrudeCentered(createFrameShape(11.8, 24.0, 3.0, 7.6, 19.6, 2.0), 0.24, 0.02, 0.02, 18);
    applyBoxUVs(ovalGeo, 10);
    g.add(new THREE.Mesh(ovalGeo, u.lcdPoronAcousticFoam));

    // Die-cut translucent polyester release pull-tab + screw-clearance punched eyelets
    const lipTab = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(7.2, 8.8, 1.4), 0.22, 0.02, 0.02, 12),
      mats.mylarInsulatorFilm
    );
    lipTab.position.set(-6.6, -4.0, 0.15);
    g.add(lipTab);
    for (const sy of [-9.5, 9.5]) {
      const punch = new THREE.Mesh(hiResCyl(0.85, 0.85, 0.30, 12).rotateX(Math.PI / 2), mats.goldPlating);
      punch.position.set(0, sy, 0);
      g.add(punch);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-sv-hinge-adhesive',
        49,
        '#0ea5e9',
        g,
        new THREE.Vector3(hingeWorldX - 0.8, LCD_CENTER_Y, -30.1),
        new THREE.Vector3(64, -30, 24),
        cp,
        0.26
      ),
      false
    );
  }

  // =========================================================================
  // D50: Dual-Axis Anti-Collision Interlock Cam Plate & Axial Wave Washer
  // =========================================================================
  {
    const g = new THREE.Group();
    const camGeo = hiResCyl(4.35, 4.35, 2.4, 24);
    applyBoxUVs(camGeo, 8);
    const camRing = new THREE.Mesh(camGeo, u.lcdLaserDimpleFriction);
    camRing.position.set(0, 5.2, 0);
    g.add(camRing);

    const keyLug = new THREE.Mesh(createChamferedBoxGeo(4.6, 2.4, 2.2, 0.25, 0.06, 'z'), u.lcdBrushedSus304Blu);
    keyLug.position.set(-3.8, 5.2, 0);
    const thrustShim = new THREE.Mesh(hiResCyl(4.5, 4.5, 0.35, 24), u.lcdSinteredBronzePore);
    thrustShim.position.set(0, 3.7, 0);
    g.add(keyLug, thrustShim);

    // 3-crest wave spring washer eliminating vertical hinge barrel axial backlash
    const wavePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 30; i++) {
      const a = (i / 30) * Math.PI * 2;
      wavePts.push(new THREE.Vector3(Math.cos(a) * 3.8, 7.8 + Math.sin(a * 3) * 0.45, Math.sin(a) * 3.8));
    }
    const waveCurve = new THREE.CatmullRomCurve3(wavePts, true);
    const waveWasher = new THREE.Mesh(new THREE.TubeGeometry(waveCurve, 40, 0.28, 10, true), mats.beCuSpring);
    waveWasher.userData.noEdges = true;
    g.add(waveWasher);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-dual-axis-interlock-cam',
        50,
        '#f59e0b',
        g,
        new THREE.Vector3(hingeWorldX, LCD_CENTER_Y, -30.4),
        new THREE.Vector3(64, 34, -4),
        cp,
        0.26
      ),
      false
    );
  }

  // =========================================================================
  // D51: 4-Axis Tilt Left/Right Synchronizing Sector Gears & Overload End-Stop Pins
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const sx of [-1, 1]) {
      const gx = sx * (LCD_WIDTH * 0.41);
      const gy = LCD_HEIGHT * 0.36;

      const hubGeo = hiResCyl(3.55, 3.55, 1.55, 24).rotateZ(Math.PI / 2);
      applyBoxUVs(hubGeo, 8);
      const gearHub = new THREE.Mesh(hubGeo, u.lcdBrushedSus304Blu);
      gearHub.position.set(gx, gy, 0);
      const bore = new THREE.Mesh(hiResCyl(1.35, 1.35, 1.85, 16).rotateZ(Math.PI / 2), u.lcdSinteredBronzePore);
      bore.position.set(gx, gy, 0);
      g.add(gearHub, bore);

      // 10 Precision chamfered brass involute gear teeth around sector arc
      for (let t = 0; t < 10; t++) {
        const ta = -0.95 + t * 0.21;
        const tooth = new THREE.Mesh(createChamferedBoxGeo(1.48, 0.68, 0.96, 0.1, 0.04, 'z'), mats.brassGear);
        tooth.position.set(gx, gy + Math.sin(ta) * 3.72, Math.cos(ta) * 3.72);
        tooth.rotation.x = -ta;
        g.add(tooth);
      }

      // Hardened overload end-stop pin + Poron silent impact sleeve
      const stopPin = new THREE.Mesh(hiResCyl(1.05, 1.05, 3.6, 16).rotateZ(Math.PI / 2), mats.titaniumRivet);
      stopPin.position.set(gx - sx * 2.2, gy - 4.4, -0.4);
      const stopSleeve = new THREE.Mesh(hiResCyl(1.32, 1.32, 1.6, 16).rotateZ(Math.PI / 2), u.lcdPoronAcousticFoam);
      stopSleeve.position.set(gx - sx * 2.2, gy - 4.4, -0.4);
      g.add(stopPin, stopSleeve);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-pantograph-sync-gears',
        51,
        '#ca8a04',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -29.3),
        new THREE.Vector3(0, 42, 6),
        cp,
        0.26
      ),
      false
    );
  }

  void createPrecisionScrew;

  return { parts, monitorParts };
}
