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
 * Phase 15: Build 24 Standalone-Only Rear 4-Axis Multi-Angle LCD Monitor OEM & Optical Micro-Parts (D28–D51).
 * Strictly omitted in whole-camera views ('integrated' / 'camera_body'); rendered ONLY in standalone 'lcd' view.
 * Returns both `parts` (all 24) and `monitorParts` (monitor-attached subset that articulates in lockstep with live 4-axis physics).
 */
export function buildLcdMicroParts(
  mats: MaterialLibrary
): { parts: CadPart[]; monitorParts: CadPart[] } {
  const parts: CadPart[] = [];
  const monitorParts: CadPart[] = [];
  const cp = mats.clippingPlanes;
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
      extrudeCentered(createRoundedRectShape(LCD_WIDTH - 1.2, LCD_HEIGHT - 1.2, 3.0), 0.12, 0.02, 0.02, 16),
      mats.lcdCoverGlass
    );
    coatPane.userData.noEdges = true;
    g.add(coatPane);

    // Subtle AR interference edge-bevel sheen frame (clean crystal tint, no magenta rim bleed)
    const arRim = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH - 1.2, LCD_HEIGHT - 1.2, 3.0, LCD_WIDTH - 3.6, LCD_HEIGHT - 3.6, 2.4),
        0.14,
        0.02,
        0.02,
        14
      ),
      mats.lcdOcaFilm
    );
    arRim.position.z = -0.02;
    g.add(arRim);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-ar-af-hardcoat',
        28,
        '#38bdf8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -36.12),
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
      extrudeCentered(createRoundedRectShape(cellW + 1.0, cellH + 1.0, 2.0), 0.16, 0.02, 0.02, 14),
      mats.lcdOcaFilm
    );
    g.add(ocaSheet);

    // Perimeter vacuum-lamination UV curing border trace
    const uvBorder = new THREE.Mesh(
      extrudeCentered(createFrameShape(cellW + 1.2, cellH + 1.2, 2.0, cellW - 0.6, cellH - 0.6, 1.4), 0.18, 0.01, 0.01, 14),
      mats.opticalCementClear
    );
    g.add(uvBorder);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-oca-bonding-film',
        29,
        '#7dd3fc',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -35.42),
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
    const tapeFrame = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH - 0.8, LCD_HEIGHT - 0.8, 3.2, LCD_WIDTH - 6.8, LCD_HEIGHT - 6.4, 1.8),
        0.28,
        0.03,
        0.03,
        16
      ),
      mats.epdmGasket
    );
    g.add(tapeFrame);

    // Inner matte ceramic black frit light-blocking lip
    const fritLip = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH - 6.6, LCD_HEIGHT - 6.2, 1.8, LCD_WIDTH - 8.6, LCD_HEIGHT - 8.2, 1.2),
        0.16,
        0.02,
        0.02,
        14
      ),
      mats.matteBlackAnodized
    );
    fritLip.position.z = -0.06;
    g.add(fritLip);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-bezel-wp-psa-tape',
        30,
        '#1f2937',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -35.55),
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
    const baseFilm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(cellW, cellH, 1.6), 0.12, 0.01, 0.01, 12),
      mats.lcdCoverGlass
    );
    baseFilm.userData.noEdges = true;
    g.add(baseFilm);

    // Diamond-mesh Tx/Rx ITO electrodes & micro-bridge crossover nodes (ultra-translucent when assembled)
    const diamondGeo = new THREE.BoxGeometry(3.4, 3.4, 0.08);
    const cols = 10;
    const rows = 6;
    const diamonds = new THREE.InstancedMesh(diamondGeo, mats.lcdCoverGlass, cols * rows);
    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        const dx = -27.0 + ix * 6.0;
        const dy = -15.0 + iy * 6.0;
        dummy.position.set(dx, dy, -0.06);
        dummy.rotation.set(0, 0, Math.PI / 4);
        dummy.updateMatrix();
        diamonds.setMatrixAt(idx++, dummy.matrix);
      }
    }
    diamonds.instanceMatrix.needsUpdate = true;
    g.add(diamonds);

    // Perimeter fine silver routing bus framing the active ITO mesh
    const busFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(cellW - 0.6, cellH - 0.6, 1.4, cellW - 2.6, cellH - 2.6, 1.0), 0.14, 0.01, 0.01, 12),
      mats.sinteredSilver
    );
    busFrame.position.z = 0.02;
    g.add(busFrame);

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-ito-touch-bridge',
        31,
        '#06b6d4',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -35.62),
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
    const rearPol = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(pW, pH, 1.2), 0.24, 0.02, 0.02, 14),
      mats.lcdPolarizerFilm
    );
    g.add(rearPol);

    // Twin TAC outer laminated skin edge rails + 90° alignment fiducial tab (zero text)
    const tacSkin = new THREE.Mesh(
      extrudeCentered(createFrameShape(pW + 0.3, pH + 0.3, 1.2, pW - 1.2, pH - 1.2, 0.8), 0.26, 0.02, 0.02, 12),
      mats.aluminaHighKFilm
    );
    g.add(tacSkin);

    const alignTab = new THREE.Mesh(new THREE.BoxGeometry(1.4, 5.2, 0.28), mats.goldPlating);
    alignTab.position.set(-pW * 0.5 - 0.5, -pH * 0.32, 0);
    g.add(alignTab);

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
    // Black Matrix (BM) outer light-blocking lattice frame
    const bmFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(cellW - 0.6, cellH - 0.6, 1.2, cellW - 4.0, cellH - 4.0, 0.8), 0.22, 0.02, 0.02, 12),
      mats.matteBlackAnodized
    );
    g.add(bmFrame);

    // Macro-represented DCI-P3 RGB Color Filter Stripe Mosaic (12 triplets across active area)
    const stripeW = (cellW - 5.0) / 18;
    const stripeH = cellH - 4.8;
    const rgbMats = [mats.cfaRed, mats.cfaGreen, mats.cfaBlue];
    for (let i = 0; i < 18; i++) {
      const sx = -(cellW - 5.0) * 0.5 + (i + 0.5) * stripeW;
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(stripeW * 0.82, stripeH, 0.16), rgbMats[i % 3]);
      stripe.position.set(sx, 0, 0);
      g.add(stripe);
    }

    // Horizontal Black Matrix dividing bars
    for (let ry = -16; ry <= 16; ry += 8) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(cellW - 4.4, 0.45, 0.2), mats.matteBlackAnodized);
      bar.position.set(0, ry, -0.02);
      g.add(bar);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-cf-black-matrix',
        33,
        '#ec4899',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.62),
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
    // Perimeter UV-cured epoxy main-seal dam trapping liquid crystal fluid
    const mainSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(cellW - 0.8, cellH - 0.8, 1.2, cellW - 3.6, cellH - 3.6, 0.8), 0.32, 0.03, 0.03, 12),
      mats.cinnabarAnodized
    );
    g.add(mainSeal);

    // Translucent nematic LC fluid slab
    const lcSlab = new THREE.Mesh(
      new THREE.BoxGeometry(cellW - 3.8, cellH - 3.8, 0.16),
      mats.evfLensEd
    );
    g.add(lcSlab);

    // Array of elastic resin photo-spacer columns maintaining uniform 3.2 μm cell gap
    const spacerGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.34, 10).rotateX(Math.PI / 2);
    const spacerPts: Array<[number, number]> = [];
    for (let sx = -24; sx <= 24; sx += 12) {
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

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-lc-photo-spacers',
        34,
        '#14b8a6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.42),
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
    for (const dz of [-0.14, 0.14]) {
      const piFilm = new THREE.Mesh(
        extrudeCentered(createRoundedRectShape(cellW - 2.6, cellH - 2.6, 1.0), 0.08, 0.01, 0.01, 12),
        mats.aluminaHighKFilm
      );
      piFilm.position.z = dz;
      g.add(piFilm);
    }

    // Visualized parallel photo-alignment molecular groove lines
    for (let gy = -16; gy <= 16; gy += 4) {
      const groove = new THREE.Mesh(new THREE.BoxGeometry(cellW - 6.0, 0.2, 0.34), mats.goldPlating);
      groove.position.set(0, gy, 0);
      g.add(groove);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-pi-alignment-films',
        35,
        '#8b5cf6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.5),
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
    const tftSub = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(cellW - 0.8, cellH - 0.8, 1.2), 0.2, 0.02, 0.02, 12),
      mats.siliconTransistorLayer
    );
    g.add(tftSub);

    // Gate-in-Panel (GIP) integrated side scan driver strips along left/right glass borders
    for (const sx of [-1, 1]) {
      const gip = new THREE.Mesh(new THREE.BoxGeometry(2.2, cellH - 4.0, 0.26), mats.copperHybridBond);
      gip.position.set(sx * (cellW * 0.5 - 1.8), 0, -0.04);
      g.add(gip);
    }

    // Interdigitated IPS comb-shaped lateral-field electrodes across pixel array
    for (let ix = -26; ix <= 26; ix += 6.5) {
      const sourceLine = new THREE.Mesh(new THREE.BoxGeometry(0.32, cellH - 4.2, 0.24), mats.goldPlating);
      sourceLine.position.set(ix, 0, -0.06);
      g.add(sourceLine);
    }
    for (let iy = -16; iy <= 16; iy += 8.0) {
      const gateLine = new THREE.Mesh(new THREE.BoxGeometry(cellW - 5.2, 0.32, 0.24), mats.copperHybridBond);
      gateLine.position.set(0, iy, -0.06);
      g.add(gateLine);
    }

    pushPart(
      finalizeStandaloneLcdMicroPart(
        'lcd-ltps-tft-comb-array',
        36,
        '#0284c7',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.22),
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
    // Extended lower TFT glass ledge carrying Chip-on-Glass DDIC (tucked cleanly under bottom bezel!)
    const ledge = new THREE.Mesh(new THREE.BoxGeometry(32.0, 2.8, 0.3), mats.sswfGlass);
    ledge.position.set(-4.0, ledgeY, 0);
    g.add(ledge);

    // Translucent amber-gold ACF adhesive tape strip embedded with conductive micro-beads
    const acfRibbon = new THREE.Mesh(new THREE.BoxGeometry(26.0, 2.0, 0.16), mats.dustCatcherGel);
    acfRibbon.position.set(-4.0, ledgeY, -0.2);
    g.add(acfRibbon);

    // Gold conductive micro-particle bump indicators along ACF strip
    for (let bx = -15; bx <= 7; bx += 2.2) {
      const bump = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 8), mats.goldPlating);
      bump.position.set(bx, ledgeY, -0.32);
      bump.userData.noEdges = true;
      g.add(bump);
    }

    // Long monolithic silicon Display Driver IC (DDIC) flip-chip bonded onto ACF
    const ddicDie = new THREE.Mesh(new THREE.BoxGeometry(21.0, 1.7, 0.55), mats.ispSiliconDie);
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
    const dbefSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(blW, blH, 1.2), 0.2, 0.02, 0.02, 14),
      mats.lcdDbefIridescent
    );
    g.add(dbefSheet);

    // Positioning registration ear tabs typical of real BLU optical films
    for (const ex of [-blW * 0.3, blW * 0.3]) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.4, 0.2), mats.lcdDbefIridescent);
      ear.position.set(ex, blH * 0.5 + 0.6, 0);
      g.add(ear);
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
    const diffSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(blW, blH, 1.2), 0.18, 0.02, 0.02, 14),
      mats.lcdDiffuserMatte
    );
    g.add(diffSheet);

    // Asymmetric alignment ear tabs preventing upside-down factory assembly
    const earL = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.4, 0.18), mats.lcdDiffuserMatte);
    earL.position.set(-blW * 0.36, blH * 0.5 + 0.6, 0);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.4, 0.18), mats.lcdDiffuserMatte);
    earR.position.set(blW * 0.22, blH * 0.5 + 0.6, 0);
    g.add(earL, earR);

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
    // White TiO2 reflective middle plastic mold frame cradling BLU optical stack
    const moldFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(blW + 2.4, blH + 2.4, 1.8, blW - 0.8, blH - 0.8, 1.0), 1.1, 0.06, 0.06, 14),
      mats.pomGear
    );
    g.add(moldFrame);

    // Top-facing opaque black light-blocking shading tape sealing LCD glass perimeter
    const shadeTape = new THREE.Mesh(
      extrudeCentered(createFrameShape(blW + 2.2, blH + 2.2, 1.7, blW - 2.0, blH - 2.0, 0.9), 0.18, 0.02, 0.02, 14),
      mats.matteBlackAnodized
    );
    shadeTape.position.z = -0.62;
    g.add(shadeTape);

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
    // Copper-aluminum metal-core heat spreader bar beneath the LED strip
    const heatBar = new THREE.Mesh(new THREE.BoxGeometry(blW - 3.6, 2.8, 0.45), mats.copperHeatSpreader);
    heatBar.position.set(0, -blH * 0.5 + 1.0, 0.42);
    g.add(heatBar);

    // 10 KSF Red/Green Phosphor-Enhanced Side-View LED Packages with amber-pink KSF dome tint
    const ksfMat = new THREE.MeshStandardMaterial({
      color: 0xffd1dc,
      emissive: 0xfda4af,
      emissiveIntensity: 1.05,
      roughness: 0.2,
      clippingPlanes: cp,
    });
    for (let i = 0; i < 10; i++) {
      const lx = -blW * 0.42 + (i / 9) * (blW * 0.84);
      const pkg = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.4, 0.65), mats.zifIvoryPlastic);
      pkg.position.set(lx, -blH * 0.5 + 1.1, 0.05);
      const ksfCup = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 0.42), ksfMat);
      ksfCup.position.set(lx, -blH * 0.5 + 1.35, -0.05);
      ksfCup.userData.noEdges = true;
      g.add(pkg, ksfCup);
    }

    // Power anode/cathode solder tail on right end
    const tail = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.0, 0.22), mats.polyimideFpc);
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
    // Ultra-thin rigid-flex PD-1072 sub-board nestled behind backlight EMI plate
    const pcb = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(26.0, 12.0, 1.4), 0.55, 0.04, 0.04, 12),
      mats.hdiMainboardPcb
    );
    pcb.position.set(10.0, -4.0, 0);
    g.add(pcb);

    // 28V LED boost ferrite power inductor + boost driver IC + TFT bias PMIC
    const inductor = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.6, 1.05), mats.ferriteInductor);
    inductor.position.set(2.5, -4.0, 0.65);
    const boostIc = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 0.65), mats.icEpoxy);
    boostIc.position.set(8.2, -3.5, 0.52);
    const pmic = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.4, 0.65), mats.icEpoxy);
    pmic.position.set(14.5, -4.5, 0.52);
    // Micro-coax receptacle connector receiving Ref.156 bundle
    const coaxConn = new THREE.Mesh(new THREE.BoxGeometry(2.6, 9.2, 0.78), mats.goldPlating);
    coaxConn.position.set(20.6, -4.0, 0.58);
    // SMD boost capacitors
    for (let i = 0; i < 4; i++) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 0.55), mats.tantalumCapYellow);
      cap.position.set(2.0 + i * 3.2, -7.8, 0.45);
      g.add(cap);
    }
    g.add(inductor, boostIc, pmic, coaxConn);

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
    // 5 twisted braided micro-coax sub-bundles representing the 36-strand fine coax rope!
    const basePts = [
      new THREE.Vector3(-10.5, 1.5, -1.0),
      new THREE.Vector3(-3.5, 3.2, 0.5),
      new THREE.Vector3(1.6, 0.8, 1.8),
      new THREE.Vector3(0.6, -3.8, 1.6),
      new THREE.Vector3(-4.0, -5.6, 1.0),
      new THREE.Vector3(-10.2, -5.8, 1.6),
    ];
    for (let s = 0; s < 5; s++) {
      const ang = (s / 5) * Math.PI * 2;
      const offsetPts = basePts.map(
        (pt, pIdx) =>
          new THREE.Vector3(
            pt.x + Math.cos(ang + pIdx * 0.9) * 0.52,
            pt.y + Math.sin(ang + pIdx * 0.9) * 0.52,
            pt.z + Math.cos(ang * 2 + pIdx * 0.6) * 0.35
          )
      );
      const curve = new THREE.CatmullRomCurve3(offsetPts);
      const strand = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 26, 0.24, 6, false),
        s % 2 === 0 ? mats.rfGoldCoax : mats.coaxShieldCopper
      );
      strand.userData.noEdges = true;
      g.add(strand);
    }

    // Dual metal-shielded micro-coax plug bars with mechanical pull-tabs
    const plugMonitor = new THREE.Mesh(new THREE.BoxGeometry(2.6, 8.4, 0.9), mats.emiShieldCan);
    plugMonitor.position.set(-10.8, 1.5, -1.0);
    const plugBody = new THREE.Mesh(new THREE.BoxGeometry(2.6, 8.8, 0.9), mats.emiShieldCan);
    plugBody.position.set(-10.6, -5.8, 1.6);
    g.add(plugMonitor, plugBody);

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
    // S-curve planar roll-flex ribbon bridging rear tilt frame to +X swivel hinge entry
    const pts = [
      new THREE.Vector3(14.0, -5.5, 1.2),
      new THREE.Vector3(24.0, -5.5, 0.4),
      new THREE.Vector3(31.0, -2.5, -0.4),
      new THREE.Vector3(35.0, 2.0, -0.8),
    ];
    const curve = new THREE.CatmullRomCurve3(pts);
    const ribbon = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.72, 6, false), mats.polyimideFpc);
    ribbon.scale.set(1, 3.2, 0.35);
    ribbon.userData.noEdges = true;
    g.add(ribbon);

    // Black EMI shielding overlay + FR-4 connector stiffeners at both ends
    const shieldBar = new THREE.Mesh(new THREE.BoxGeometry(16.0, 6.2, 0.24), mats.emiShieldFilm);
    shieldBar.position.set(22.0, -5.0, 0.5);
    const stiffL = new THREE.Mesh(new THREE.BoxGeometry(4.2, 7.2, 0.48), mats.goldPlating);
    stiffL.position.set(13.5, -5.5, 1.1);
    const stiffR = new THREE.Mesh(new THREE.BoxGeometry(4.2, 7.2, 0.48), mats.goldPlating);
    stiffR.position.set(34.5, 2.0, -0.8);
    g.add(shieldBar, stiffL, stiffR);

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
    // Silver Ni-Cu conductive foam cushion compressing onto PD-1072 coaxial connector
    const gasketBlock = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.8, 11.4, 0.9), 1.35, 0.14, 0.14, 12),
      mats.sinteredSilver
    );
    gasketBlock.position.set(20.6, -4.0, 0.95);
    g.add(gasketBlock);

    // Conductive copper-foil grounding bridge strap connecting gasket to rear shell GND
    const gndStrap = new THREE.Mesh(new THREE.BoxGeometry(10.5, 4.2, 0.18), mats.copperHeatSpreader);
    gndStrap.position.set(26.5, -4.0, 0.72);
    g.add(gndStrap);

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
    // Continuous silicone waterproof potting bead inside LCD CAB R ASSY perimeter
    const potBead = new THREE.Mesh(
      extrudeCentered(
        createFrameShape(LCD_WIDTH - 1.0, LCD_HEIGHT - 1.0, 3.2, LCD_WIDTH - 3.0, LCD_HEIGHT - 3.0, 2.6),
        0.48,
        0.08,
        0.08,
        16
      ),
      mats.antiVibRubber
    );
    g.add(potBead);

    // 4x Ref.158 M1.4x3.0 Ecology Tapping Screws sealing front/rear LCD shell + 3 hidden under-LCD bolts
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
      const sc = createPrecisionScrew(1.05, 0.48, 2.4, mats.stainlessMachined);
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
  // D47: Split Front & Rear Hinge Armor Clamshell Covers (Sony Ref.159: 501160401 / Ref.161: A5043354A)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculpted Front Clamshell Cover (Ref.161) wrapping -Z face of hinge barrel
    const frontCover = new THREE.Mesh(
      new THREE.CylinderGeometry(4.5, 4.5, 23.6, 18, 1, false, Math.PI * 0.5, Math.PI),
      mats.bodyMgShell
    );
    frontCover.position.set(0, 0, -0.35);
    g.add(frontCover);

    // Sculpted Rear Clamshell Cover (Ref.159) wrapping +Z face of hinge barrel
    const rearCover = new THREE.Mesh(
      new THREE.CylinderGeometry(4.5, 4.5, 23.6, 18, 1, false, -Math.PI * 0.5, Math.PI),
      mats.matteBlackAnodized
    );
    rearCover.position.set(0, 0, 0.35);
    g.add(rearCover);

    // Side cable-entry cheek fairing + 2x M1.4 joining micro-screws
    const fairing = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(6.2, 11.4, 2.0), 4.6, 0.25, 0.25, 12),
      mats.bodyMgShell
    );
    fairing.position.set(-2.6, 0, 0);
    g.add(fairing);

    for (const sy of [-8.8, 8.8]) {
      const sc = createPrecisionScrew(0.95, 0.42, 1.8, mats.stainlessMachined);
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
    // Molded protective rear baffle plate covering the open scissor-arm pocket
    const guardPlate = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(LCD_WIDTH - 10.0, LCD_HEIGHT - 12.0, 2.6), 0.72, 0.08, 0.08, 16),
      mats.matteBlackAnodized
    );
    g.add(guardPlate);

    // Recessed cable relief channel & horizontal stiffening ribs
    for (const ry of [-10.0, 0, 10.0]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(LCD_WIDTH - 18.0, 1.6, 0.95), mats.bodyMgShell);
      rib.position.set(0, ry, 0.2);
      g.add(rib);
    }

    // Twin left/right clip retention tabs locking onto D14 base frame
    for (const sx of [-1, 1]) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(3.2, 10.0, 1.1), mats.pomGear);
      clip.position.set(sx * (LCD_WIDTH * 0.5 - 5.2), 0, 0.35);
      g.add(clip);
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
  // D49: Die-Cut Hinge Base Waterproof Sealing Tape SV ADHESIVE (HINGE) (Sony Ref.155: 501161301)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision L-shaped & oval die-cut waterproof adhesive sealing sheet around hinge base
    const ovalSeal = new THREE.Mesh(
      extrudeCentered(createFrameShape(11.8, 24.0, 3.0, 7.6, 19.6, 2.0), 0.22, 0.02, 0.02, 16),
      mats.thermalTransferTape
    );
    g.add(ovalSeal);

    const lipTab = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(7.2, 8.8, 1.4), 0.22, 0.02, 0.02, 10),
      mats.mylarInsulatorFilm
    );
    lipTab.position.set(-6.6, -4.0, 0.15);
    g.add(lipTab);

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
    // Keyed MIM stainless cruciform interlock collar blocking 270° twist when open < 35°
    const camRing = new THREE.Mesh(
      new THREE.CylinderGeometry(4.3, 4.3, 2.4, 22),
      mats.titaniumRivet
    );
    camRing.position.set(0, 5.2, 0);
    g.add(camRing);

    // Interlocking key lug engaging horizontal swivel shaft notch
    const keyLug = new THREE.Mesh(new THREE.BoxGeometry(4.6, 2.4, 2.2), mats.mountStainlessFlange);
    keyLug.position.set(-3.8, 5.2, 0);
    g.add(keyLug);

    // Sculpted wave spring washer eliminating axial play along vertical hinge barrel
    const wavePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      wavePts.push(new THREE.Vector3(Math.cos(a) * 3.8, 7.8 + Math.sin(a * 3) * 0.45, Math.sin(a) * 3.8));
    }
    const waveCurve = new THREE.CatmullRomCurve3(wavePts, true);
    const waveWasher = new THREE.Mesh(
      new THREE.TubeGeometry(waveCurve, 36, 0.28, 8, true),
      mats.beCuSpring
    );
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

      // Precision MIM meshing sector gear wheel on left/right pantograph pivot
      const gearHub = new THREE.Mesh(
        new THREE.CylinderGeometry(3.5, 3.5, 1.5, 20).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      gearHub.position.set(gx, gy, 0);
      g.add(gearHub);

      // Individual involute gear teeth around sector arc
      for (let t = 0; t < 8; t++) {
        const ta = -0.85 + t * 0.24;
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.72, 0.95), mats.brassGear);
        tooth.position.set(gx, gy + Math.sin(ta) * 3.7, Math.cos(ta) * 3.7);
        tooth.rotation.x = -ta;
        g.add(tooth);
      }

      // Hardened overload end-stop pin catching 98° up / 40° down limits
      const stopPin = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05, 1.05, 3.6, 12).rotateZ(Math.PI / 2),
        mats.titaniumRivet
      );
      stopPin.position.set(gx - sx * 2.2, gy - 4.4, -0.4);
      g.add(stopPin);
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

  return { parts, monitorParts };
}
