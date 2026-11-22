import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { attachCadEdges, tagPartMeshes } from '../../engine/CadHelpers';
import { MICRO_EXPLANATIONS } from './explanations';

function finalizeMicroPart(
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
    explanation: MICRO_EXPLANATIONS[id],
  };
}

/**
 * Build a nano-scale 2x2 Bayer Pixel Array 3D CAD cross-section model
 * showcasing 2025-2026 flagship sensor semiconductor architecture:
 * - Gapless Aspheric On-Chip Microlenses (OCL)
 * - RGGB Bayer Color Filter Array + Tungsten Metal Light-Guide Grid
 * - BSI Back-Side Anti-Reflection Pyramid Nanostructure
 * - Cross-Type Dual Pixel Split Photodiodes + Full Trench Isolation (FTI)
 * - 2-Layer Transistor Pixel (SVG Vertical Transfer Gate + Shielded Global Shutter Memory Node + LOFIC + FinFET Amp)
 * - Cu-Cu Direct Hybrid Bonding Interconnect Interface
 * - Logic / Column-Parallel CDS & ADC + Stacked High-Speed DRAM Frame Buffer
 *
 * Scale: 1 pixel = 11.0 CAD units (representing ~3.6-5.9 um pitch), 2x2 array = 22 x 22 units.
 * Optical axis = +Z (incident light) -> -Z (deep silicon & logic).
 */
export function buildMicroPixelParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const P = 11.0; // Single pixel width
  const halfP = P / 2;
  const arrayW = P * 2; // 22.0

  // Pixel centers: [0]=R(-,+), [1]=G1(+,+), [2]=G2(-,-), [3]=B(+,-)
  const pixelCenters: Array<{ x: number; y: number; color: 'R' | 'G1' | 'G2' | 'B'; split: 'H' | 'V' }> = [
    { x: -halfP, y: halfP, color: 'R', split: 'V' }, // Vertically split PD -> detects horizontal edges
    { x: halfP, y: halfP, color: 'G1', split: 'H' }, // Horizontally split PD -> detects vertical edges
    { x: -halfP, y: -halfP, color: 'G2', split: 'V' }, // Vertically split PD -> detects horizontal edges
    { x: halfP, y: -halfP, color: 'B', split: 'H' }, // Horizontally split PD -> detects vertical edges
  ];

  // =========================================================================
  // M1. Gapless Aspheric On-Chip Microlens Array (OCL) (z = +11.6)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Build custom gapless square-base aspheric microlens dome geometry
    const buildGaplessLensGeo = (size: number, height: number, segs = 28) => {
      const geo = new THREE.PlaneGeometry(size, size, segs, segs);
      const pos = geo.attributes.position;
      const half = size / 2;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const nx = x / half;
        const ny = y / half;
        // Super-elliptical smooth gapless aspheric dome profile
        const r2 = nx * nx + ny * ny;
        const r4 = nx * nx * nx * nx + ny * ny * ny * ny;
        const profile = Math.max(0, 1 - 0.72 * r2 - 0.14 * r4);
        const z = Math.pow(profile, 0.75) * height;
        pos.setZ(i, z);
      }
      geo.computeVertexNormals();
      return geo;
    };

    const domeGeo = buildGaplessLensGeo(P - 0.14, 3.8, 30);

    for (const pc of pixelCenters) {
      const lens = new THREE.Mesh(domeGeo, mats.microlensGlass);
      lens.position.set(pc.x, pc.y, 0.45);
      lens.userData.noEdges = true;
      g.add(lens);

      // Thin lens base rim
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(P - 0.14, P - 0.14, 0.9),
        mats.microlensGlass
      );
      base.position.set(pc.x, pc.y, 0);
      base.userData.edgeOpacity = 0.35;
      g.add(base);
    }

    parts.push(
      finalizeMicroPart(
        'micro-ocl',
        1,
        '#b8e0fa',
        g,
        new THREE.Vector3(0, 0, 11.6),
        new THREE.Vector3(0, 0, 24.0),
        cp,
        0.32
      )
    );
  }

  // =========================================================================
  // M2. Bayer RGGB Color Filter Array & Tungsten Light-Guide Grid (z = +8.8)
  // =========================================================================
  {
    const g = new THREE.Group();
    const cfaThick = 2.6;
    const gridW = 0.72;

    for (const pc of pixelCenters) {
      const mat =
        pc.color === 'R'
          ? mats.cfaRed
          : pc.color === 'B'
            ? mats.cfaBlue
            : mats.cfaGreen;
      const filterBlock = new THREE.Mesh(
        new THREE.BoxGeometry(P - gridW - 0.08, P - gridW - 0.08, cfaThick),
        mat
      );
      filterBlock.position.set(pc.x, pc.y, 0);
      filterBlock.userData.edgeOpacity = 0.32;
      g.add(filterBlock);
    }

    // Precision Tungsten Metal Optical Waveguide Grid preventing inter-pixel color crosstalk
    const gridBars: Array<[number, number, number, number]> = [
      [0, 0, gridW, arrayW + gridW], // center vertical wall
      [0, 0, arrayW + gridW, gridW], // center horizontal wall
      [-arrayW / 2, 0, gridW, arrayW + gridW], // outer left
      [arrayW / 2, 0, gridW, arrayW + gridW], // outer right
      [0, arrayW / 2, arrayW + gridW, gridW], // outer top
      [0, -arrayW / 2, arrayW + gridW, gridW], // outer bottom
    ];
    for (const [gx, gy, gw, gh] of gridBars) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(gw, gh, cfaThick + 0.18),
        mats.tungstenGrid
      );
      bar.position.set(gx, gy, 0);
      g.add(bar);
    }

    parts.push(
      finalizeMicroPart(
        'micro-cfa',
        2,
        '#2ca861',
        g,
        new THREE.Vector3(0, 0, 8.8),
        new THREE.Vector3(0, 0, 16.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M3. BSI Anti-Reflection Pyramid Nanostructure & Optical Shield (z = +6.6)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Ultra-thin HfO2 / Ta2O5 high-k dielectric passivation & AR base film
    const passFilm = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.6, arrayW + 0.6, 0.55),
      mats.interlayerDielectric
    );
    g.add(passFilm);

    // Inverted/upright Moth-Eye Pyramid Nanostructure etched into BSI Silicon top surface
    const pyrGeo = new THREE.ConeGeometry(0.68, 0.95, 4);
    pyrGeo.rotateX(Math.PI / 2);
    pyrGeo.rotateZ(Math.PI / 4);
    const pyrPerAxis = 6;
    const totalPyrs = 4 * pyrPerAxis * pyrPerAxis;
    const pyrs = new THREE.InstancedMesh(pyrGeo, mats.siliconDepletion, totalPyrs);
    const dummy = new THREE.Object3D();
    let pi = 0;
    for (const pc of pixelCenters) {
      for (let ix = 0; ix < pyrPerAxis; ix++) {
        for (let iy = 0; iy < pyrPerAxis; iy++) {
          const px = pc.x - 3.6 + ix * 1.44;
          const py = pc.y - 3.6 + iy * 1.44;
          dummy.position.set(px, py, 0.55);
          dummy.updateMatrix();
          pyrs.setMatrixAt(pi++, dummy.matrix);
        }
      }
    }
    pyrs.instanceMatrix.needsUpdate = true;
    g.add(pyrs);

    // Optical Tungsten Shield Aperture Frame (blocks oblique leakage into peripheral circuits)
    for (const [gx, gy, gw, gh] of [
      [0, 0, 0.85, arrayW + 0.8],
      [0, 0, arrayW + 0.8, 0.85],
      [-arrayW / 2, 0, 0.85, arrayW + 0.8],
      [arrayW / 2, 0, 0.85, arrayW + 0.8],
      [0, arrayW / 2, arrayW + 0.8, 0.85],
      [0, -arrayW / 2, arrayW + 0.8, 0.85],
    ] as Array<[number, number, number, number]>) {
      const shield = new THREE.Mesh(
        new THREE.BoxGeometry(gw, gh, 0.72),
        mats.memoryNodeShield
      );
      shield.position.set(gx, gy, 0.25);
      g.add(shield);
    }

    parts.push(
      finalizeMicroPart(
        'micro-bsi-ar',
        3,
        '#4b7cb8',
        g,
        new THREE.Vector3(0, 0, 6.6),
        new THREE.Vector3(0, 0, 9.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M4. BSI Photodiode Layer, Cross-Type Dual Pixel Split & FTI (z = +2.4)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pdDepth = 6.8;

    for (const pc of pixelCenters) {
      // Translucent p-type Silicon Epitaxial Substrate cell
      const epi = new THREE.Mesh(
        new THREE.BoxGeometry(P - 0.9, P - 0.9, pdDepth),
        mats.siliconPhotodiode
      );
      epi.position.set(pc.x, pc.y, 0);
      g.add(epi);

      // Cross-Type Dual Pixel CMOS AF Split Pinned Photodiode Wells (n-type depletion regions)
      // H-split (Left/Right) detects vertical subject lines; V-split (Top/Bottom) detects horizontal lines!
      if (pc.split === 'H') {
        const subW = (P - 2.6) / 2;
        const subH = P - 2.0;
        const pdA = new THREE.Mesh(
          new THREE.BoxGeometry(subW, subH, pdDepth - 1.1),
          mats.siliconDepletion
        );
        pdA.position.set(pc.x - subW * 0.56, pc.y, 0.15);
        const pdB = new THREE.Mesh(
          new THREE.BoxGeometry(subW, subH, pdDepth - 1.1),
          mats.siliconDepletion
        );
        pdB.position.set(pc.x + subW * 0.56, pc.y, 0.15);
        g.add(pdA, pdB);

        // Central shallow DTI separator between Dual Pixel A & B photodiodes
        const splitBarrier = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, subH + 0.4, pdDepth - 0.6),
          mats.ftiOxide
        );
        splitBarrier.position.set(pc.x, pc.y, 0);
        g.add(splitBarrier);
      } else {
        const subW = P - 2.0;
        const subH = (P - 2.6) / 2;
        const pdA = new THREE.Mesh(
          new THREE.BoxGeometry(subW, subH, pdDepth - 1.1),
          mats.siliconDepletion
        );
        pdA.position.set(pc.x, pc.y + subH * 0.56, 0.15);
        const pdB = new THREE.Mesh(
          new THREE.BoxGeometry(subW, subH, pdDepth - 1.1),
          mats.siliconDepletion
        );
        pdB.position.set(pc.x, pc.y - subH * 0.56, 0.15);
        g.add(pdA, pdB);

        // Central horizontal DTI separator for Cross-Type Horizontal Line AF
        const splitBarrier = new THREE.Mesh(
          new THREE.BoxGeometry(subW + 0.4, 0.32, pdDepth - 0.6),
          mats.ftiOxide
        );
        splitBarrier.position.set(pc.x, pc.y, 0);
        g.add(splitBarrier);
      }
    }

    // Full Trench Isolation (FTI) deep oxide + metal walls isolating every pixel completely
    const ftiW = 0.78;
    for (const [fx, fy, fw, fh] of [
      [0, 0, ftiW, arrayW + ftiW],
      [0, 0, arrayW + ftiW, ftiW],
      [-arrayW / 2, 0, ftiW, arrayW + ftiW],
      [arrayW / 2, 0, ftiW, arrayW + ftiW],
      [0, arrayW / 2, arrayW + ftiW, ftiW],
      [0, -arrayW / 2, arrayW + ftiW, ftiW],
    ] as Array<[number, number, number, number]>) {
      const ftiWall = new THREE.Mesh(
        new THREE.BoxGeometry(fw, fh, pdDepth + 0.2),
        mats.ftiOxide
      );
      ftiWall.position.set(fx, fy, 0);
      g.add(ftiWall);
    }

    parts.push(
      finalizeMicroPart(
        'micro-pd-cross',
        4,
        '#3a6ea5',
        g,
        new THREE.Vector3(0, 0, 2.4),
        new THREE.Vector3(0, 0, 1.8),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M5. 2-Layer Transistor Pixel + Global Shutter Memory Node + LOFIC (z = -3.4)
  // =========================================================================
  {
    const g = new THREE.Group();
    const layerH = 3.8;

    // 2nd Silicon Substrate Layer exclusively housing Pixel Transistors, GS Memory & LOFIC
    const subMesh = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.6, arrayW + 0.6, layerH),
      mats.siliconTransistorLayer
    );
    g.add(subMesh);

    for (const pc of pixelCenters) {
      // Single Vertical Transfer Gate (SVG) pillar penetrating upward into Photodiode layer
      const svg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.85, 0.85, 3.2, 16),
        mats.gatePolysilicon
      );
      svg.rotation.x = Math.PI / 2;
      svg.position.set(pc.x - 2.3, pc.y + 1.8, 2.1);
      g.add(svg);

      // Shielded Global Shutter Memory Node (MEM) enclosed by dark tungsten optical shield
      const memShield = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 3.6, 2.2),
        mats.memoryNodeShield
      );
      memShield.position.set(pc.x + 2.2, pc.y + 2.0, 0.65);
      g.add(memShield);

      const memCore = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 2.6, 1.5),
        mats.siliconDepletion
      );
      memCore.position.set(pc.x + 2.2, pc.y + 2.0, 0.3);
      g.add(memCore);

      // LOFIC (Lateral Overflow Integration Capacitor) high-density MIM capacitor block
      const loficCap = new THREE.Mesh(
        new THREE.BoxGeometry(4.4, 3.2, 1.8),
        mats.copperHybridBond
      );
      loficCap.position.set(pc.x - 2.0, pc.y - 2.3, -0.4);
      g.add(loficCap);

      // Enlarged Low-Noise Amplifier FinFET (Source Follower), Reset & Select Gates
      for (let t = 0; t < 3; t++) {
        const fin = new THREE.Mesh(
          new THREE.BoxGeometry(3.8, 0.62, 1.5),
          mats.gatePolysilicon
        );
        fin.position.set(pc.x + 2.1, pc.y - 1.3 - t * 1.15, -0.55);
        g.add(fin);
      }

      // Buried Sublocal Connection (BSC) tungsten vertical deep contact
      const bsc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 4.4, 12),
        mats.goldPlating
      );
      bsc.rotation.x = Math.PI / 2;
      bsc.position.set(pc.x - 0.1, pc.y + 0.1, 0.3);
      g.add(bsc);
    }

    parts.push(
      finalizeMicroPart(
        'micro-2layer-gs',
        5,
        '#d99b38',
        g,
        new THREE.Vector3(0, 0, -3.4),
        new THREE.Vector3(0, 0, -6.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M6. Cu-Cu Direct Hybrid Bonding Interconnect Interface (z = -7.0)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bondH = 2.6;

    // SiO2 dielectric fusion bonding matrix
    const diel = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.6, arrayW + 0.6, bondH),
      mats.interlayerDielectric
    );
    g.add(diel);

    // High-density pixel-level Cu-Cu direct hybrid bonding copper pads & vertical vias
    const padGeo = new THREE.BoxGeometry(1.75, 1.75, 1.15);
    const viaGeo = new THREE.CylinderGeometry(0.42, 0.42, bondH + 0.4, 12);
    viaGeo.rotateX(Math.PI / 2);

    for (const pc of pixelCenters) {
      for (const [ox, oy] of [
        [-2.7, -2.7],
        [2.7, -2.7],
        [-2.7, 2.7],
        [2.7, 2.7],
      ] as Array<[number, number]>) {
        // Upper pixel-wafer Cu pad
        const cuTop = new THREE.Mesh(padGeo, mats.copperHybridBond);
        cuTop.position.set(pc.x + ox, pc.y + oy, 0.52);
        // Lower logic-wafer Cu pad fused directly at molecular Cu-Cu seam
        const cuBot = new THREE.Mesh(padGeo, mats.copperHybridBond);
        cuBot.position.set(pc.x + ox, pc.y + oy, -0.52);
        // Vertical via stud
        const via = new THREE.Mesh(viaGeo, mats.copperHybridBond);
        via.position.set(pc.x + ox, pc.y + oy, 0);
        g.add(cuTop, cuBot, via);
      }

      // Horizontal local copper redistribution bus (M1)
      const busX = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.55, 0.32), mats.copperHybridBond);
      busX.position.set(pc.x, pc.y + 2.7, 1.05);
      const busY = new THREE.Mesh(new THREE.BoxGeometry(0.55, 7.2, 0.32), mats.copperHybridBond);
      busY.position.set(pc.x - 2.7, pc.y, -1.05);
      g.add(busX, busY);
    }

    parts.push(
      finalizeMicroPart(
        'micro-cucu',
        6,
        '#d87342',
        g,
        new THREE.Vector3(0, 0, -7.0),
        new THREE.Vector3(0, 0, -14.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M7. Logic / Column-Parallel CDS & ADC + Stacked High-Speed DRAM Die (z = -11.4)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Upper Logic / Column-Parallel CDS + Dual-Gain ADC circuit block
    const logicSubstrate = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.8, arrayW + 0.8, 2.8),
      mats.siliconLogicLayer
    );
    logicSubstrate.position.z = 1.4;
    g.add(logicSubstrate);

    // Multi-layer copper signal routing buses & column ADC blocks embedded on top of logic die
    for (let col = -3; col <= 3; col++) {
      const bus = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, arrayW - 0.6, 0.42),
        mats.copperHybridBond
      );
      bus.position.set(col * 3.0, 0, 2.85);
      g.add(bus);
    }
    for (const yPos of [-5.5, 5.5]) {
      const adcBlock = new THREE.Mesh(
        new THREE.BoxGeometry(arrayW - 1.4, 4.2, 1.1),
        mats.gatePolysilicon
      );
      adcBlock.position.set(0, yPos, 1.55);
      g.add(adcBlock);
    }

    // Intermediate TSV / Hybrid Bond Bridge between Logic and DRAM
    const bridge = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.4, arrayW + 0.4, 0.45),
      mats.copperHybridBond
    );
    bridge.position.z = -0.22;
    g.add(bridge);

    // Bottom Ultra-High-Speed Stacked DRAM Die (120fps buffer storage)
    const dramBase = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.8, arrayW + 0.8, 3.0),
      mats.dramCellArray
    );
    dramBase.position.z = -1.95;
    g.add(dramBase);

    // High-aspect-ratio DRAM trench capacitor banks visualized cleanly on bottom/sides
    const bankGeo = new THREE.BoxGeometry(4.4, 4.4, 1.6);
    for (const bx of [-6.8, 0, 6.8]) {
      for (const by of [-6.8, 0, 6.8]) {
        const bank = new THREE.Mesh(bankGeo, mats.siliconDepletion);
        bank.position.set(bx, by, -1.7);
        g.add(bank);
      }
    }

    parts.push(
      finalizeMicroPart(
        'micro-adc-dram',
        7,
        '#2d4868',
        g,
        new THREE.Vector3(0, 0, -11.4),
        new THREE.Vector3(0, 0, -22.5),
        cp,
        0.24
      )
    );
  }

  return parts;
}
