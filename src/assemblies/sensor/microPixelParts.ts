import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { attachCadEdges, tagPartMeshes } from '../../engine/CadHelpers';
import { MICRO_EXPLANATIONS } from './explanations';
import { buildMicroPixelUltraParts } from './microPixelUltraParts';
import { buildMicroUltraAuditParts } from './sensorMicroUltraAuditParts';
import { buildMicroPixelDeepAuditParts } from './microPixelDeepAuditParts';

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

    const domeGeo = buildGaplessLensGeo(P - 0.14, 3.8, 12);

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
        new THREE.Vector3(0, 0, 12.8),
        new THREE.Vector3(0, 0, 34.0),
        cp,
        0.32
      )
    );
  }

  // =========================================================================
  // M2. [Phase 11] OCL Low-Index AR Top Coat & Organic Planarization Layer (z = +10.9)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision optical organic planarization leveling film sitting directly between OCL and CFA
    const planarLayer = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.4, arrayW + 0.4, 0.95),
      mats.evfAntiFogGlass
    );
    planarLayer.userData.edgeOpacity = 0.35;
    g.add(planarLayer);

    // 4 sub-wavelength porous-silica AR conformal interference rim rings (λ/4 n≈1.25)
    for (const pc of pixelCenters) {
      const arRim = new THREE.Mesh(
        new THREE.TorusGeometry(4.4, 0.16, 8, 28),
        mats.evfMlaGlass
      );
      arRim.position.set(pc.x, pc.y, 0.56);
      arRim.userData.noEdges = true;
      g.add(arRim);

      // Optical focal-plane leveling indicator dot at each pixel center
      const spot = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.4, 0.14, 18).rotateX(Math.PI / 2),
        mats.sswfGlass
      );
      spot.position.set(pc.x, pc.y, 0.52);
      spot.userData.noEdges = true;
      g.add(spot);
    }

    parts.push(
      finalizeMicroPart(
        'micro-ocl-ar-planar',
        2,
        '#7dd3fc',
        g,
        new THREE.Vector3(0, 0, 10.9),
        new THREE.Vector3(0, 0, 26.5),
        cp,
        0.28
      )
    );
  }

  // =========================================================================
  // M3. Bayer RGGB Color Filter Array & Tungsten Light-Guide Grid (z = +8.8)
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

    const gridBars: Array<[number, number, number, number]> = [
      [0, 0, gridW, arrayW + gridW],
      [0, 0, arrayW + gridW, gridW],
      [-arrayW / 2, 0, gridW, arrayW + gridW],
      [arrayW / 2, 0, gridW, arrayW + gridW],
      [0, arrayW / 2, arrayW + gridW, gridW],
      [0, -arrayW / 2, arrayW + gridW, gridW],
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
        3,
        '#2ca861',
        g,
        new THREE.Vector3(0, 0, 8.8),
        new THREE.Vector3(0, 0, 19.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M4. BSI Anti-Reflection Pyramid Nanostructure & Optical Shield (z = +6.6)
  // =========================================================================
  {
    const g = new THREE.Group();

    const passFilm = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.6, arrayW + 0.6, 0.55),
      mats.interlayerDielectric
    );
    g.add(passFilm);

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
        4,
        '#4b7cb8',
        g,
        new THREE.Vector3(0, 0, 6.6),
        new THREE.Vector3(0, 0, 12.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M5. BSI Photodiode Layer & Cross-Type Dual Pixel Split Wells (z = +2.4)
  // =========================================================================
  const pdDepth = 6.8;
  {
    const g = new THREE.Group();

    for (const pc of pixelCenters) {
      // Translucent p-type Silicon Epitaxial Substrate cell (leaving crisp 1.05 gap for FDTI cage!)
      const epi = new THREE.Mesh(
        new THREE.BoxGeometry(P - 1.15, P - 1.15, pdDepth),
        mats.siliconPhotodiode
      );
      epi.position.set(pc.x, pc.y, 0);
      g.add(epi);

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

        const splitBarrier = new THREE.Mesh(
          new THREE.BoxGeometry(subW + 0.4, 0.32, pdDepth - 0.6),
          mats.ftiOxide
        );
        splitBarrier.position.set(pc.x, pc.y, 0);
        g.add(splitBarrier);
      }
    }

    // Note: Perimeter Full-Depth Trench Isolation (FDTI) walls are now decoupled into M6 (micro-fdti-doping)!

    parts.push(
      finalizeMicroPart(
        'micro-pd-cross',
        5,
        '#3a6ea5',
        g,
        new THREE.Vector3(0, 0, 2.4),
        new THREE.Vector3(0, 0, 5.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M6. [Phase 11] Full-Depth Trench Isolation (FDTI) Cage & P-Type Conformal Doping (z = +2.4)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ftiW = 0.78;
    const ftiWalls: Array<[number, number, number, number]> = [
      [0, 0, ftiW, arrayW + ftiW],
      [0, 0, arrayW + ftiW, ftiW],
      [-arrayW / 2, 0, ftiW, arrayW + ftiW],
      [arrayW / 2, 0, ftiW, arrayW + ftiW],
      [0, arrayW / 2, arrayW + ftiW, ftiW],
      [0, -arrayW / 2, arrayW + ftiW, ftiW],
    ];
    for (const [fx, fy, fw, fh] of ftiWalls) {
      // Deep SiO2 oxide trench wall
      const ftiWall = new THREE.Mesh(
        new THREE.BoxGeometry(fw, fh, pdDepth + 0.2),
        mats.ftiOxide
      );
      ftiWall.position.set(fx, fy, 0);
      g.add(ftiWall);

      // Internal Tungsten optical light-reflection metal core inside FDTI trench
      const coreW = fw < fh ? fw * 0.36 : fw - 0.3;
      const coreH = fh < fw ? fh * 0.36 : fh - 0.3;
      const core = new THREE.Mesh(
        new THREE.BoxGeometry(coreW, coreH, pdDepth + 0.32),
        mats.tungstenGrid
      );
      core.position.set(fx, fy, 0);
      g.add(core);
    }

    // Boron P-Type Conformal Sidewall Doping Liner Strips (amber-purple hole-pinning shells!)
    for (const pc of pixelCenters) {
      const linerThick = 0.14;
      const span = P - 1.02;
      const sides: Array<[number, number, number, number]> = [
        [pc.x - span / 2, pc.y, linerThick, span],
        [pc.x + span / 2, pc.y, linerThick, span],
        [pc.x, pc.y + span / 2, span, linerThick],
        [pc.x, pc.y - span / 2, span, linerThick],
      ];
      for (const [sx, sy, sw, sh] of sides) {
        const liner = new THREE.Mesh(
          new THREE.BoxGeometry(sw, sh, pdDepth - 0.3),
          mats.evfDichroicMirror
        );
        liner.position.set(sx, sy, 0);
        liner.userData.noEdges = true;
        g.add(liner);
      }
    }

    parts.push(
      finalizeMicroPart(
        'micro-fdti-doping',
        6,
        '#a855f7',
        g,
        new THREE.Vector3(0, 0, 2.4),
        new THREE.Vector3(-22.0, 0, 5.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M7. 2-Layer Transistor Pixel Substrate, FinFET Source-Follower & BSC Interconnect (z = -3.4)
  // (D-VTG decoupled into M12; 3D MIM LOFIC decoupled into M13; Tungsten-shielded MEM decoupled into M14!)
  // =========================================================================
  {
    const g = new THREE.Group();
    const layerH = 3.6;

    const subMesh = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.6, arrayW + 0.6, layerH),
      mats.siliconTransistorLayer
    );
    g.add(subMesh);

    for (const pc of pixelCenters) {
      // Triple FinFET low-RTN Source-Follower / Reset / Select Amplifier Transistors
      for (let t = 0; t < 3; t++) {
        const fin = new THREE.Mesh(
          new THREE.BoxGeometry(4.2, 0.64, 1.55),
          mats.gatePolysilicon
        );
        fin.position.set(pc.x + 1.8, pc.y - 1.2 - t * 1.18, -0.55);
        g.add(fin);
      }

      // Floating Diffusion (FD) high-conversion-gain gold contact island + DCG switch gate
      const fdIsland = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 2.2, 0.9),
        mats.goldPlating
      );
      fdIsland.position.set(pc.x - 1.6, pc.y + 0.6, -0.45);
      g.add(fdIsland);

      // Buried Silicon Contact (BSC) vertical pillar linking PD wafer to 2-layer transistor wafer
      const bsc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 4.4, 12),
        mats.goldPlating
      );
      bsc.rotation.x = Math.PI / 2;
      bsc.position.set(pc.x - 0.1, pc.y + 0.1, 0.3);
      g.add(bsc);
    }

    parts.push(
      finalizeMicroPart(
        'micro-2layer-gs',
        7,
        '#d99b38',
        g,
        new THREE.Vector3(0, 0, -3.4),
        new THREE.Vector3(0, 0, -4.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M8. [Phase 11] 4-Metal Dual-Damascene Copper BEOL Interconnect Stack (z = -6.1)
  // =========================================================================
  {
    const g = new THREE.Group();
    const beolH = 2.4;

    // Translucent Low-k SiOC inter-metal dielectric matrix
    const lowK = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.6, arrayW + 0.6, beolH),
      mats.interlayerDielectric
    );
    g.add(lowK);

    // 4 Orthogonal Alternating Copper Metal Routing Layers (M1=X, M2=Y, M3=X GS Clock, M4=Y Bitlines)
    const metalZ = [0.85, 0.28, -0.28, -0.85];
    metalZ.forEach((mz, layerIdx) => {
      const isHoriz = layerIdx % 2 === 0;
      const mat = layerIdx === 2 ? mats.goldPlating : mats.copperHybridBond;
      for (let i = -3; i <= 3; i++) {
        const trace = new THREE.Mesh(
          isHoriz
            ? new THREE.BoxGeometry(arrayW - 0.6, 0.56, 0.26)
            : new THREE.BoxGeometry(0.56, arrayW - 0.6, 0.26),
          mat
        );
        if (isHoriz) {
          trace.position.set(0, i * 3.0, mz);
        } else {
          trace.position.set(i * 3.0, 0, mz);
        }
        g.add(trace);
      }
    });

    // Dual-Damascene Vertical Copper Vias bridging M1 -> M4 across each pixel corner
    const viaGeo = new THREE.CylinderGeometry(0.28, 0.28, beolH + 0.2, 10).rotateX(Math.PI / 2);
    for (const pc of pixelCenters) {
      for (const [vx, vy] of [
        [-2.7, -2.7],
        [2.7, 2.7],
      ] as Array<[number, number]>) {
        const via = new THREE.Mesh(viaGeo, mats.copperHybridBond);
        via.position.set(pc.x + vx, pc.y + vy, 0);
        g.add(via);
      }
    }

    parts.push(
      finalizeMicroPart(
        'micro-beol-wiring',
        8,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, -6.1),
        new THREE.Vector3(0, 0, -11.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M9. Cu-Cu Direct Hybrid Bonding Interconnect Interface (z = -8.7)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bondH = 2.6;

    const diel = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.6, arrayW + 0.6, bondH),
      mats.interlayerDielectric
    );
    g.add(diel);

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
        const cuTop = new THREE.Mesh(padGeo, mats.copperHybridBond);
        cuTop.position.set(pc.x + ox, pc.y + oy, 0.52);
        const cuBot = new THREE.Mesh(padGeo, mats.copperHybridBond);
        cuBot.position.set(pc.x + ox, pc.y + oy, -0.52);
        const via = new THREE.Mesh(viaGeo, mats.copperHybridBond);
        via.position.set(pc.x + ox, pc.y + oy, 0);
        g.add(cuTop, cuBot, via);
      }

      const busX = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.55, 0.32), mats.copperHybridBond);
      busX.position.set(pc.x, pc.y + 2.7, 1.05);
      const busY = new THREE.Mesh(new THREE.BoxGeometry(0.55, 7.2, 0.32), mats.copperHybridBond);
      busY.position.set(pc.x - 2.7, pc.y, -1.05);
      g.add(busX, busY);
    }

    parts.push(
      finalizeMicroPart(
        'micro-cucu',
        9,
        '#d87342',
        g,
        new THREE.Vector3(0, 0, -8.7),
        new THREE.Vector3(0, 0, -18.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M10. Wafer 2: Pixel/Column-Parallel 14-Bit CDS & Subthreshold ADC Logic (z = -12.4)
  // =========================================================================
  {
    const g = new THREE.Group();

    const logicSubstrate = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.8, arrayW + 0.8, 2.8),
      mats.siliconLogicLayer
    );
    g.add(logicSubstrate);

    for (let col = -3; col <= 3; col++) {
      const bus = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, arrayW - 0.6, 0.42),
        mats.copperHybridBond
      );
      bus.position.set(col * 3.0, 0, 1.45);
      g.add(bus);
    }
    for (const yPos of [-5.5, 5.5]) {
      const adcBlock = new THREE.Mesh(
        new THREE.BoxGeometry(arrayW - 1.4, 4.2, 1.1),
        mats.gatePolysilicon
      );
      adcBlock.position.set(0, yPos, 0.15);
      g.add(adcBlock);
    }

    parts.push(
      finalizeMicroPart(
        'micro-adc-dram',
        10,
        '#2d4868',
        g,
        new THREE.Vector3(0, 0, -12.4),
        new THREE.Vector3(0, 0, -30.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M11. [Phase 11] Wafer 3: Stacked 120fps DRAM Trench-Capacitor Array & Cu TSV (z = -15.8)
  // =========================================================================
  {
    const g = new THREE.Group();

    const bridge = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.4, arrayW + 0.4, 0.45),
      mats.copperHybridBond
    );
    bridge.position.z = 1.75;
    g.add(bridge);

    const dramBase = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.8, arrayW + 0.8, 3.0),
      [
        mats.dramCellArray,
        mats.dramCellArray,
        mats.dramCellArray,
        mats.dramCellArray,
        mats.siliconTsvDram,
        mats.dramCellArray,
      ]
    );
    g.add(dramBase);

    const bankGeo = new THREE.BoxGeometry(4.4, 4.4, 1.8);
    for (const bx of [-6.8, 0, 6.8]) {
      for (const by of [-6.8, 0, 6.8]) {
        const bank = new THREE.Mesh(bankGeo, mats.siliconDepletion);
        bank.position.set(bx, by, 0.25);
        g.add(bank);
      }
    }

    const tsvGeo = new THREE.CylinderGeometry(0.65, 0.65, 4.2, 14).rotateX(Math.PI / 2);
    for (const [tx, ty] of [
      [-9.8, 9.8],
      [9.8, 9.8],
      [-9.8, -9.8],
      [9.8, -9.8],
    ] as Array<[number, number]>) {
      const tsv = new THREE.Mesh(tsvGeo, mats.copperHybridBond);
      tsv.position.set(tx, ty, 0.2);
      g.add(tsv);
    }

    parts.push(
      finalizeMicroPart(
        'micro-stacked-dram',
        11,
        '#312e81',
        g,
        new THREE.Vector3(0, 0, -15.8),
        new THREE.Vector3(0, 0, -39.5),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // M12. [Phase 12] Dual Vertical Transfer Gate (D-VTG) Buried Poly-Si Pillar Array (z = -1.2)
  // =========================================================================
  {
    const g = new THREE.Group();
    const vtgGeo = new THREE.CylinderGeometry(0.62, 0.78, 3.8, 16).rotateX(Math.PI / 2);
    const oxideGeo = new THREE.CylinderGeometry(0.9, 1.0, 3.4, 16).rotateX(Math.PI / 2);

    for (const pc of pixelCenters) {
      // Twin independent vertical transfer gate pillars reaching each Dual Pixel split well!
      const offsets: Array<[number, number]> =
        pc.split === 'H'
          ? [
              [-2.2, 1.6],
              [2.2, 1.6],
            ]
          : [
              [-2.2, 2.2],
              [-2.2, -1.6],
            ];
      for (const [ox, oy] of offsets) {
        const pillar = new THREE.Mesh(vtgGeo, mats.gatePolysilicon);
        pillar.position.set(pc.x + ox, pc.y + oy, 0.2);
        const oxide = new THREE.Mesh(oxideGeo, mats.ftiOxide);
        oxide.position.set(pc.x + ox, pc.y + oy, 0.2);
        oxide.userData.noEdges = true;
        g.add(pillar, oxide);
      }

      // Horizontal polysilicon transfer-gate drive bus linking pixel D-VTG gates
      const bus = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.72, 0.55), mats.gatePolysilicon);
      bus.position.set(pc.x, pc.y + 1.6, -1.65);
      g.add(bus);
    }

    parts.push(
      finalizeMicroPart(
        'micro-dual-vtg',
        12,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, -1.2),
        new THREE.Vector3(24.0, 0, -1.0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M13. [Phase 12] 3D High-k MIM LOFIC Lateral Overflow Integration Capacitor Bank (z = -3.8)
  // (Sony 2026 LYTIA L910 / STARVIS 3 single-exposure 106 dB HDR technology)
  // =========================================================================
  {
    const g = new THREE.Group();

    for (const pc of pixelCenters) {
      const cx = pc.x - 2.2;
      const cy = pc.y - 2.4;

      // Multi-plate 3D folded MIM capacitor stack: TiN bottom electrode + High-k ZrO2/HfO2 + TiN top
      const botPlate = new THREE.Mesh(new THREE.BoxGeometry(4.6, 3.4, 0.42), mats.stainlessMachined);
      botPlate.position.set(cx, cy, -0.72);
      const dielCore = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.2, 0.92), mats.loficDielectric);
      dielCore.position.set(cx, cy, 0);
      const topPlate = new THREE.Mesh(new THREE.BoxGeometry(4.6, 3.4, 0.42), mats.copperHybridBond);
      topPlate.position.set(cx, cy, 0.72);
      g.add(botPlate, dielCore, topPlate);

      // 3D folded vertical high-k capacitor fins multiplying surface area & full-well capacity (>180ke-)
      for (let f = -1; f <= 1; f++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.45, 2.8, 1.5), mats.loficDielectric);
        fin.position.set(cx + f * 1.35, cy, 0);
        g.add(fin);
      }

      // Overflow bridge gate contact routing excess photoelectrons from PD/FD into LOFIC tank
      const overflowLink = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.8, 0.45), mats.goldPlating);
      overflowLink.position.set(cx + 1.8, cy + 2.1, 0.65);
      g.add(overflowLink);
    }

    parts.push(
      finalizeMicroPart(
        'micro-lofic-cap',
        13,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, -3.8),
        new THREE.Vector3(-24.0, -14.0, -7.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M14. [Phase 12] Tungsten-Shielded Global Shutter Storage Memory Node (MEM) & PLS Box (z = -2.8)
  // =========================================================================
  {
    const g = new THREE.Group();

    for (const pc of pixelCenters) {
      const mx = pc.x + 2.2;
      const my = pc.y + 2.1;

      // 3D Light-Tight Tungsten Parasitic Light Shield (PLS < -100 dB) top cap + deep lateral skirts
      const wTop = new THREE.Mesh(new THREE.BoxGeometry(4.6, 4.0, 0.55), mats.tungstenLightShield);
      wTop.position.set(mx, my, 1.05);
      const skirtL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 4.0, 2.1), mats.tungstenLightShield);
      skirtL.position.set(mx - 2.1, my, 0.15);
      const skirtR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 4.0, 2.1), mats.tungstenLightShield);
      skirtR.position.set(mx + 2.1, my, 0.15);
      const skirtT = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.42, 2.1), mats.tungstenLightShield);
      skirtT.position.set(mx, my + 1.8, 0.15);
      g.add(wTop, skirtL, skirtR, skirtT);

      // Internal Buried-Channel Global Shutter Charge Storage Core (MEM) nestled inside tungsten vault
      const memCore = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.6, 1.35), mats.siliconDepletion);
      memCore.position.set(mx, my, 0.05);
      g.add(memCore);
    }

    parts.push(
      finalizeMicroPart(
        'micro-gs-mem-shield',
        14,
        '#475569',
        g,
        new THREE.Vector3(0, 0, -2.8),
        new THREE.Vector3(24.0, 14.0, -4.5),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // M15. [Phase 12] ISSCC 2025 Pixel-Parallel 4x2 ADC Tile RDL & 50.4M Cu-Cu Adapter (z = -10.4)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Translucent SiO2/Low-k Redistribution Dielectric Matrix between Cu-Cu (M9) and ADC Wafer (M10)
    const rdlDiel = new THREE.Mesh(
      new THREE.BoxGeometry(arrayW + 0.6, arrayW + 0.6, 1.35),
      mats.interlayerDielectric
    );
    g.add(rdlDiel);

    // 4x2 Pixel-Parallel ADC Tile Distribution Copper Grid + Gold Fan-Out Vias (ISSCC 2025 25.2MP GS!)
    for (const pc of pixelCenters) {
      // Dedicated per-pixel dual Cu-Cu -> ADC differential fan-out pads
      for (const sx of [-2.4, 2.4]) {
        const fanTrace = new THREE.Mesh(new THREE.BoxGeometry(0.65, 5.2, 0.34), mats.copperHybridBond);
        fanTrace.position.set(pc.x + sx, pc.y, 0.25);
        const goldPad = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.45), mats.goldPlating);
        goldPad.position.set(pc.x + sx, pc.y - 2.2, -0.45);
        g.add(fanTrace, goldPad);
      }

      // Local tile reference ramp & comparator clock crossbar
      const rampBar = new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.55, 0.28), mats.goldPlating);
      rampBar.position.set(pc.x, pc.y + 2.6, -0.32);
      g.add(rampBar);
    }

    // Perimeter tile shield bus enclosing the 4x2 ADC tile cluster
    const tileFrame = new THREE.Mesh(new THREE.BoxGeometry(arrayW - 0.8, 0.5, 0.32), mats.copperHybridBond);
    tileFrame.position.set(0, 0, 0.5);
    const tileFrameV = new THREE.Mesh(new THREE.BoxGeometry(0.5, arrayW - 0.8, 0.32), mats.copperHybridBond);
    tileFrameV.position.set(0, 0, 0.5);
    g.add(tileFrame, tileFrameV);

    parts.push(
      finalizeMicroPart(
        'micro-pixel-adc-rdl',
        15,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, -10.4),
        new THREE.Vector3(0, 0, -24.5),
        cp,
        0.26
      )
    );
  }

  // Phase 14: Append 12 standalone-only ultra-nano semiconductor cross-section layers (M16–M27)
  parts.push(...buildMicroPixelUltraParts(mats));

  // Phase 19B: Append 8 standalone-only ISSCC/IEDM nano-pixel deep-audit layers (M28–M35)
  parts.push(...buildMicroUltraAuditParts(mats));

  // Phase 20A: Append 15 standalone-only IEDM/EDTM/ISSCC nano-semiconductor layers (M36–M50)
  parts.push(...buildMicroPixelDeepAuditParts(mats));

  return parts;
}
