import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { attachCadEdges, createFrameShape, extrudeCentered, tagPartMeshes } from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';
import { scaleRadialSegmentsForQuality } from '../../core/geometry_quality';

function finalizeUltraMicroPixelPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.26
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);

  return {
    id,
    subsystem: 'micro',
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
 * Phase 14: 12 Ultra-Nano Semiconductor Layers for the 2x2 Bayer Micro Pixel Cross-Section (M16–M27).
 * Rendered exclusively in standalone 'micro' view (omitted in whole-camera views).
 * Scale: 1 pixel = 11.0 CAD units, 2x2 array = 22.0 x 22.0 units.
 */
export function buildMicroPixelUltraParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const P = 11.0;
  const halfP = P / 2;
  const arrayW = P * 2; // 22.0

  const pixelCenters: Array<{ x: number; y: number }> = [
    { x: -halfP, y: halfP },
    { x: halfP, y: halfP },
    { x: -halfP, y: -halfP },
    { x: halfP, y: -halfP },
  ];

  // =========================================================================
  // M16: On-Chip Phase-Detection AF (PDAF) 2x1 Shared OCL & Half Tungsten Mask
  // =========================================================================
  {
    const g = new THREE.Group();
    // 2x1 horizontal shared cylindrical/elliptical PDAF bridge lens spanning top pixel pair
    const sharedBridge = new THREE.Mesh(
      new THREE.SphereGeometry(
        5.0,
        scaleRadialSegmentsForQuality(24, 8),
        scaleRadialSegmentsForQuality(16, 6),
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.5
      ).rotateX(Math.PI / 2),
      mats.evfMlaGlass
    );
    sharedBridge.scale.set(1.94, 0.92, 0.36);
    sharedBridge.position.set(0, halfP, 0.2);
    sharedBridge.userData.noEdges = true;
    g.add(sharedBridge);

    // Half-aperture tungsten phase-mask blinds over lower pixel pair (left/right pupil split)
    const maskLeft = new THREE.Mesh(new THREE.BoxGeometry(4.9, 9.8, 0.28), mats.tungstenLightShield);
    maskLeft.position.set(-halfP - 2.35, -halfP, -0.22);
    const maskRight = new THREE.Mesh(new THREE.BoxGeometry(4.9, 9.8, 0.28), mats.tungstenLightShield);
    maskRight.position.set(halfP + 2.35, -halfP, -0.22);
    g.add(maskLeft, maskRight);

    // Subtle open pupil aperture frames flush inside 2x2 cube perimeter
    const winFrame = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW - 0.1, arrayW - 0.1, 0.3, arrayW - 1.1, arrayW - 1.1, 0.2), 0.24, 0.02, 0.02, 12),
      mats.tungstenGrid
    );
    winFrame.position.z = -0.22;
    g.add(winFrame);

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-pdaf-ocl-mask',
        16,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 11.15),
        new THREE.Vector3(26, 12, 32),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M17: Sub-CFA 25 nm Silicon Nitride (SiN) Refractive Index-Matching & Etch-Stop Film
  // =========================================================================
  {
    const g = new THREE.Group();
    const sinFilm = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.5, arrayW + 0.5, 0.42),
      mats.aluminaHighKFilm
    );
    g.add(sinFilm);

    // Etch-stop grid landing marks matching the overlying tungsten light-guide cross
    const barV = new THREE.Mesh(new THREE.BoxGeometry(0.82, arrayW + 0.4, 0.48), mats.sswfGlass);
    const barH = new THREE.Mesh(new THREE.BoxGeometry(arrayW + 0.4, 0.82, 0.48), mats.sswfGlass);
    g.add(barV, barH);

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-sin-etch-stop',
        17,
        '#8b5cf6',
        g,
        new THREE.Vector3(0, 0, 7.3),
        new THREE.Vector3(-26, 12, 16),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M18: ALD 5 nm Negative Fixed-Charge Passivation Film (Al2O3 / HfO2) & Hole Accumulation
  // =========================================================================
  {
    const g = new THREE.Group();
    // Conformal top sheet + vertical trench-lining walls coating the pixel cavity walls
    const topBlanket = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.4, arrayW + 0.4, 0.34),
      mats.aluminaHighKFilm
    );
    topBlanket.position.z = 0.25;
    g.add(topBlanket);

    // Conformal vertical ALD trench wall liners descending down pixel boundaries
    for (const gx of [-arrayW / 2, 0, arrayW / 2]) {
      const linerV = new THREE.Mesh(new THREE.BoxGeometry(0.32, arrayW, 2.2), mats.aluminaHighKFilm);
      linerV.position.set(gx, 0, -0.85);
      g.add(linerV);
    }
    for (const gy of [-arrayW / 2, 0, arrayW / 2]) {
      const linerH = new THREE.Mesh(new THREE.BoxGeometry(arrayW, 0.32, 2.2), mats.aluminaHighKFilm);
      linerH.position.set(0, gy, -0.85);
      g.add(linerH);
    }

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-neg-fixed-charge',
        18,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 0, 6.05),
        new THREE.Vector3(26, -12, 11),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M19: Pinned Photodiode (PPD / HAD) Surface P++ Pinning Implant & Potential Well
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 P++ doped surface pinning caps burying the N-type photodiode electron buckets
    for (const pc of pixelCenters) {
      const pPlusCap = new THREE.Mesh(
        new THREE.BoxGeometry(9.4, 9.4, 0.55),
        mats.loficDielectric
      );
      pPlusCap.position.set(pc.x, pc.y, 0.32);
      g.add(pPlusCap);

      // Graded buried depletion basin rim beneath P++ cap
      const wellRim = new THREE.Mesh(
        extrudeCentered(createFrameShape(9.0, 9.0, 0.9, 6.4, 6.4, 0.6), 0.72, 0.06, 0.06, 14),
        mats.siliconDepletion
      );
      wellRim.position.set(pc.x, pc.y, -0.35);
      g.add(wellRim);
    }

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-p-well-pinning',
        19,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 4.8),
        new THREE.Vector3(-26, -12, 8),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M20: Anti-Blooming Overflow Drain (OFD) & Barrier Gate (ABG) Spillway
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 corner overflow spillway chutes + VDD drain collector pipes per pixel
    for (const pc of pixelCenters) {
      // Spillway gate bar (ABG) sitting on photodiode corner rim
      const abgBar = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.15, 0.85), mats.gatePolysilicon);
      abgBar.position.set(pc.x - 3.1, pc.y - 3.2, 0);
      g.add(abgBar);

      // Overflow drain N+ sink pillar routing excess electrons safely to VDD rail
      const ofdPipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.72, 2.4, 14).rotateX(Math.PI / 2),
        mats.copperHybridBond
      );
      ofdPipe.position.set(pc.x - 4.1, pc.y - 4.1, -0.5);
      g.add(ofdPipe);
    }

    // Shared perimeter VDD anti-blooming collector ring
    const vddRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 0.3, arrayW + 0.3, 0.5, arrayW - 1.1, arrayW - 1.1, 0.3), 0.42, 0.03, 0.03, 14),
      mats.copperCoil
    );
    vddRing.position.z = -1.55;
    g.add(vddRing);

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-anti-blooming-ofd',
        20,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, 1.4),
        new THREE.Vector3(28, -16, 1),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M21: Floating Diffusion (FD) Sense Node & Dual Conversion Gain (DCG) Switch
  // =========================================================================
  {
    const g = new THREE.Group();
    // Central shared N+ Floating Diffusion island + 4 micro charge-transfer necks
    const fdCore = new THREE.Mesh(
      new THREE.CylinderGeometry(1.85, 1.85, 0.95, 22).rotateX(Math.PI / 2),
      mats.goldPlating
    );
    g.add(fdCore);

    for (const pc of pixelCenters) {
      // Transfer neck from each pixel's VTG to the central low-C FD measuring node
      const neck = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.85, 0.45), mats.taNBarrierLiner);
      neck.position.set(pc.x * 0.42, pc.y * 0.42, 0.05);
      neck.rotation.z = Math.atan2(pc.y, pc.x);
      g.add(neck);

      // DCG switch gate & secondary LCG capacitance pad per quadrant
      const dcgGate = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, 0.72), mats.gatePolysilicon);
      dcgGate.position.set(pc.x * 0.82, pc.y * 0.82, -0.1);
      const lcgCap = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 0.52), mats.loficDielectric);
      lcgCap.position.set(pc.x * 0.82, pc.y * 0.82, -0.68);
      g.add(dcgGate, lcgCap);
    }

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-fd-dcg-switch',
        21,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, -0.4),
        new THREE.Vector3(-28, 16, -2),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M22: 2-Layer Transistor Pixel Buried Sublocal Connection (BSC: 0.46 μm Vertical Via)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Inter-layer sequential thermal-oxide bonding sheet (1,000°C resistant SiO2)
    const seqOxide = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW, arrayW, 0.45),
      mats.interlayerDielectric
    );
    g.add(seqOxide);

    // High-aspect vertical tungsten/poly-Si deep contacts piercing Layer 1 -> Layer 2
    const viaCoords: Array<[number, number]> = [
      [0, 0],
      [-2.2, 2.2],
      [2.2, 2.2],
      [-2.2, -2.2],
      [2.2, -2.2],
      [-7.2, 0],
      [7.2, 0],
      [0, -7.2],
      [0, 7.2],
    ];
    for (const [vx, vy] of viaCoords) {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.52, 0.52, 3.0, 14).rotateX(Math.PI / 2),
        mats.tungstenGrid
      );
      pillar.position.set(vx, vy, 0);
      const padTop = new THREE.Mesh(
        new THREE.CylinderGeometry(0.92, 0.92, 0.25, 16).rotateX(Math.PI / 2),
        mats.taNBarrierLiner
      );
      padTop.position.set(vx, vy, 1.48);
      g.add(pillar, padTop);
    }

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-bsc-vertical-via',
        22,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -2.0),
        new THREE.Vector3(-28, -2, -6),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M23: 2nd Silicon Layer — 3D SOI FinFET Source-Follower Amp (SF), RST & SEL Transistors
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dedicated Layer-2 SOI active silicon substrate slab (free from photodiode competition!)
    const soiBase = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW - 0.6, arrayW - 0.6, 0.55),
      mats.siliconTransistorLayer
    );
    soiBase.position.z = -0.35;
    g.add(soiBase);

    // Enlarged 3D multi-fin SOI FinFET Source-Follower (AMP) occupying upper half
    for (const fy of [2.4, 4.6, 6.8]) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.72, 1.35), mats.siliconPhotodiode);
      fin.position.set(0, fy, 0.35);
      g.add(fin);
    }
    // 3-sided wrap-around high-k metal gate straddling all 3 AMP fins!
    const ampGate = new THREE.Mesh(new THREE.BoxGeometry(5.6, 8.2, 1.75), mats.taNBarrierLiner);
    ampGate.position.set(0, 4.6, 0.45);
    g.add(ampGate);

    // RST (Reset) & SEL (Row Select) transistors occupying lower half of Layer 2
    for (const [tx, col] of [
      [-5.2, mats.gatePolysilicon],
      [5.2, mats.copperHybridBond],
    ] as Array<[number, THREE.Material]>) {
      const ch = new THREE.Mesh(new THREE.BoxGeometry(7.2, 2.6, 0.95), mats.siliconPhotodiode);
      ch.position.set(tx, -5.4, 0.25);
      const gate = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.8, 1.35), col);
      gate.position.set(tx, -5.4, 0.4);
      g.add(ch, gate);
    }

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-finfet-amp-rst-sel',
        23,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -4.6),
        new THREE.Vector3(28, 2, -10),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M24: Hybrid Bonding Plasma-Activated SiO2 Fusion Layer & TaN/SiCN Cu Barrier Liner
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-flat CMP SiO2/SiCN dielectric fusion wafer matrix
    const sio2Matrix = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.4, arrayW + 0.4, 0.52),
      mats.opticalCementClear
    );
    g.add(sio2Matrix);

    // 16 TaN/SiCN cylindrical copper-diffusion barrier armor sleeves encircling Cu-Cu bond pads
    for (let ix = -1.5; ix <= 1.5; ix += 1.0) {
      for (let iy = -1.5; iy <= 1.5; iy += 1.0) {
        const sleeve = new THREE.Mesh(
          new THREE.TorusGeometry(1.15, 0.24, 10, 20),
          mats.taNBarrierLiner
        );
        sleeve.position.set(ix * 5.2, iy * 5.2, 0);
        g.add(sleeve);
      }
    }

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-sio2-sicn-barrier',
        24,
        '#c8a46e',
        g,
        new THREE.Vector3(0, 0, -8.35),
        new THREE.Vector3(-26, 14, -19),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M25: Inter-Wafer Analog/Digital Ground Isolation Shield Metal Plane (M5 Faraday Floor)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Solid Faraday copper/aluminum ground slab isolating quiet analog pixels from digital logic below
    const shieldSlab = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.5, arrayW + 0.5, 0.48),
      mats.emiShieldCan
    );
    g.add(shieldSlab);

    // 4 insulated signal feed-through anti-pad clearance rings (allowing analog bus through safely)
    for (const pc of pixelCenters) {
      const antiPad = new THREE.Mesh(
        new THREE.TorusGeometry(1.35, 0.28, 8, 20),
        mats.interlayerDielectric
      );
      antiPad.position.set(pc.x, pc.y, 0.26);
      const viaCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 0.62, 14).rotateX(Math.PI / 2),
        mats.copperHybridBond
      );
      viaCore.position.set(pc.x, pc.y, 0);
      g.add(antiPad, viaCore);
    }

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-analog-digital-shield',
        25,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, -7.45),
        new THREE.Vector3(26, -14, -16),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M26: Bottom-Side Long-Wavelength (Red/NIR) Optical Reflector Mirror & Diffraction Grid
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 bright metallic optical reflector pads under each photodiode bouncing red/NIR light back up
    for (const pc of pixelCenters) {
      const mirror = new THREE.Mesh(
        new THREE.BoxGeometry(8.2, 8.2, 0.32),
        mats.silverElectrode
      );
      mirror.position.set(pc.x, pc.y, 0);
      g.add(mirror);

      // 3 micro-diffraction scatter ridges increasing oblique trapping path inside thin BSI silicon
      for (const dy of [-2.4, 0, 2.4]) {
        const ridge = new THREE.Mesh(
          new THREE.BoxGeometry(7.2, 0.55, 0.48),
          mats.goldPlating
        );
        ridge.position.set(pc.x, pc.y + dy, 0.24);
        g.add(ridge);
      }
    }

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-nir-reflector-grid',
        26,
        '#f43f5e',
        g,
        new THREE.Vector3(0, 0, -5.2),
        new THREE.Vector3(-26, -18, -15),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M27: Logic-Wafer Embedded On-Die MIM Decoupling Capacitors (DeCap) & ESD Clamp Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    // Perimeter ESD dual-diode lightning-rod clamp ring around chip edge
    const esdRing = new THREE.Mesh(
      extrudeCentered(createFrameShape(arrayW + 1.0, arrayW + 1.0, 0.6, arrayW - 1.8, arrayW - 1.8, 0.3), 0.72, 0.05, 0.05, 16),
      mats.bodyRecRed
    );
    g.add(esdRing);

    // 4 embedded high-density MIM on-die DeCap arrays supplying picosecond ADC surge current
    for (const pc of pixelCenters) {
      const botPlate = new THREE.Mesh(new THREE.BoxGeometry(7.6, 7.6, 0.28), mats.copperHybridBond);
      botPlate.position.set(pc.x, pc.y, -0.35);
      const diel = new THREE.Mesh(new THREE.BoxGeometry(7.2, 7.2, 0.32), mats.loficDielectric);
      diel.position.set(pc.x, pc.y, 0);
      const topPlate = new THREE.Mesh(new THREE.BoxGeometry(7.6, 7.6, 0.28), mats.taNBarrierLiner);
      topPlate.position.set(pc.x, pc.y, 0.35);
      g.add(botPlate, diel, topPlate);
    }

    parts.push(
      finalizeUltraMicroPixelPart(
        'micro-ondie-decap-esd',
        27,
        '#ef4444',
        g,
        new THREE.Vector3(0, 0, -13.8),
        new THREE.Vector3(26, 10, -34),
        cp,
        0.28
      )
    );
  }

  return parts;
}
