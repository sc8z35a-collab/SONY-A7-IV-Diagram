import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeBionzPart(
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
    subsystem: 'bionz',
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

/** Helper to rotate a centered XY-extruded plate so its thickness lies along Y (horizontal package layer). */
function makeHorizontalPlate(
  shape: THREE.Shape,
  thickness: number,
  mat: THREE.Material,
  bevel = 0.08,
  curveSegs = 16
): THREE.Mesh {
  const geo = extrudeCentered(shape, thickness, bevel, bevel, curveSegs);
  geo.rotateX(Math.PI / 2);
  return new THREE.Mesh(geo, mat);
}

/**
 * Build all 36 ultra-detailed 3D CAD sub-assemblies of the Sony BIONZ XR / BIONZ XR2
 * Semiconductor Package Internal Ultra-Dissection (XR01–XR36).
 *
 * Magnified 2:1 CAD scale (16x16 mm real flagship package -> 32x32 CAD units), centered at (0, 0, 0).
 * Stack orientation: +Y = Top EMI Lid / Copper IHS / PoP LPDDR5X -> Y=0 = BIONZ XR/XR2 Silicon Die & 16 IP Blocks
 * -> -Y = FEOL/BEOL / Cetus Chiplet / 2.5D Silicon Bridge / C4 Micro-Bumps / Underfill / eSiCap / ABF Substrate / SAC305 BGA Balls!
 * Strictly visible ONLY in standalone 'bionz' mode.
 */
export function buildBionzParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const PKG_W = 32.0; // Package width (X) & depth (Z)
  const DIE_W = 20.8; // Main BIONZ XR / XR2 silicon die footprint

  // =========================================================================
  // XR01. Conformal Sputtered EMI Shield & Laser-Marked Top Lid (y = +12.6)
  // =========================================================================
  {
    const g = new THREE.Group();
    const lidFrame = makeHorizontalPlate(
      createFrameShape(PKG_W + 0.3, PKG_W + 0.3, 1.8, PKG_W - 2.6, PKG_W - 2.6, 1.0),
      0.52,
      mats.emiShieldCan,
      0.06,
      16
    );
    const topCap = makeHorizontalPlate(
      createRoundedRectShape(PKG_W - 2.2, PKG_W - 2.2, 0.9),
      0.24,
      mats.emiShieldFilm,
      0.03,
      14
    );
    topCap.position.y = 0.16;

    // Laser-etched badge frame & Pin-1 triangular alignment chamfer marker
    const markBorder = makeHorizontalPlate(
      createFrameShape(18.0, 12.0, 0.6, 16.8, 10.8, 0.4),
      0.08,
      mats.silverElectrode,
      0.01,
      10
    );
    markBorder.position.y = 0.31;
    const pin1Dot = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.12, 12), mats.goldPlating);
    pin1Dot.position.set(-12.2, 0.32, -12.2);
    pin1Dot.userData.noEdges = true;

    // 4 side grounding skirt tabs curving down toward perimeter GND ring
    for (const [sx, sz, rotY] of [
      [0, PKG_W * 0.5 + 0.1, 0],
      [0, -PKG_W * 0.5 - 0.1, 0],
      [PKG_W * 0.5 + 0.1, 0, Math.PI / 2],
      [-PKG_W * 0.5 - 0.1, 0, Math.PI / 2],
    ] as Array<[number, number, number]>) {
      const skirt = new THREE.Mesh(new THREE.BoxGeometry(22.0, 1.1, 0.22), mats.emiShieldCan);
      skirt.position.set(sx, -0.45, sz);
      skirt.rotation.y = rotY;
      g.add(skirt);
    }

    g.add(lidFrame, topCap, markBorder, pin1Dot);
    parts.push(
      finalizeBionzPart(
        'xr-emi-conformal-shield',
        1,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 12.6, 0),
        new THREE.Vector3(0, 56.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR02. Nickel-Plated Oxygen-Free Copper IHS Heat Spreader (y = +11.4)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ihsTop = makeHorizontalPlate(
      createRoundedRectShape(PKG_W - 0.8, PKG_W - 0.8, 1.6),
      1.15,
      mats.vaporChamberCopper,
      0.14,
      18
    );
    // Stepped inner thermal contact pedestal pressing down on TIM1
    const pedestal = makeHorizontalPlate(
      createRoundedRectShape(DIE_W + 2.4, DIE_W + 2.4, 1.0),
      0.65,
      mats.copperHeatSpreader,
      0.08,
      14
    );
    pedestal.position.y = -0.82;
    // Outer support flange legs resting on substrate corners
    const flange = makeHorizontalPlate(
      createFrameShape(PKG_W - 0.8, PKG_W - 0.8, 1.6, PKG_W - 4.4, PKG_W - 4.4, 1.1),
      1.35,
      mats.stainlessMachined,
      0.08,
      16
    );
    flange.position.y = -1.1;

    g.add(ihsTop, pedestal, flange);
    parts.push(
      finalizeBionzPart(
        'xr-nickel-cu-ihs',
        2,
        '#d97d4e',
        g,
        new THREE.Vector3(0, 11.4, 0),
        new THREE.Vector3(0, 48.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR03. Die-to-IHS Thermal Interface Material 1 (Indium STIM) (y = +9.9)
  // =========================================================================
  {
    const g = new THREE.Group();
    const timSheet = makeHorizontalPlate(
      createRoundedRectShape(DIE_W + 1.6, DIE_W + 1.6, 0.8),
      0.48,
      mats.sinteredSilver,
      0.04,
      14
    );
    // High-k thermal micro-grid relief pattern representing Indium solder reflow interface
    const innerPad = new THREE.Mesh(
      new THREE.BoxGeometry(DIE_W - 1.2, 0.56, DIE_W - 1.2),
      mats.thermalPadPink
    );
    innerPad.position.y = 0.02;
    g.add(timSheet, innerPad);
    parts.push(
      finalizeBionzPart(
        'xr-tim1-indium-bond',
        3,
        '#f472b6',
        g,
        new THREE.Vector3(0, 9.9, 0),
        new THREE.Vector3(0, 41.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR04. Top PoP LPDDR5X DRAM & NAND MCP Molded Encapsulant (y = +8.6)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Mold cap with central observation window lip so inner 4-die DRAM stack shows in cutaway
    const moldCap = makeHorizontalPlate(
      createFrameShape(PKG_W - 2.4, PKG_W - 2.4, 1.4, 20.6, 20.6, 0.9),
      1.65,
      mats.icEpoxy,
      0.12,
      16
    );
    const translucentTop = new THREE.Mesh(
      new THREE.BoxGeometry(20.8, 0.36, 20.8),
      mats.opticalCementClear
    );
    translucentTop.position.y = 0.65;
    g.add(moldCap, translucentTop);
    parts.push(
      finalizeBionzPart(
        'xr-pop-lpddr5x-package',
        4,
        '#334155',
        g,
        new THREE.Vector3(0, 8.6, 0),
        new THREE.Vector3(0, 35.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR05. Quad-Die Stacked LPDDR5X-8533 Frame-Buffer DRAM Silicon Stack (y = +8.3)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4 stepped ultra-thin DRAM silicon dies + thin DAF adhesive film between them
    for (let i = 0; i < 4; i++) {
      const w = 18.6 - i * 1.1;
      const d = 17.4 - i * 0.9;
      const die = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.28, d),
        i % 2 === 0 ? mats.siliconDramLayer : mats.siliconTsvDram
      );
      die.position.set(i * 0.32 - 0.45, -0.5 + i * 0.36, 0);
      g.add(die);

      if (i > 0) {
        const daf = new THREE.Mesh(
          new THREE.BoxGeometry(w + 0.15, 0.08, d + 0.15),
          mats.thermalTransferTape
        );
        daf.position.set(i * 0.32 - 0.45, -0.68 + i * 0.36, 0);
        daf.userData.noEdges = true;
        g.add(daf);
      }
    }
    parts.push(
      finalizeBionzPart(
        'xr-pop-dram-dies',
        5,
        '#2563eb',
        g,
        new THREE.Vector3(0, 8.3, 0),
        new THREE.Vector3(0, 29.0, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // XR06. Cascaded Gold Wire-Bond Array & Top PoP Interposer Substrate (y = +7.1)
  // =========================================================================
  {
    const g = new THREE.Group();
    const interposer = makeHorizontalPlate(
      createRoundedRectShape(PKG_W - 2.6, PKG_W - 2.6, 1.3),
      0.52,
      mats.sensorPcb,
      0.06,
      16
    );
    g.add(interposer);

    // Cascaded gold wirebond arches on left & right terraces of the 4-die DRAM stack
    for (const side of [-1, 1]) {
      for (let i = -6; i <= 6; i++) {
        const z = i * 1.18;
        const tier = Math.abs(i) % 3;
        const startX = side * (7.2 + tier * 0.7);
        const endX = side * 11.8;
        const startY = 0.55 + (2 - tier) * 0.36;
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(startX, startY, z),
          new THREE.Vector3((startX + endX) * 0.5, startY + 0.95, z),
          new THREE.Vector3(endX, 0.28, z)
        );
        const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 8, 0.08, 4, false), mats.goldPlating);
        wire.userData.noEdges = true;
        g.add(wire);
      }
    }
    parts.push(
      finalizeBionzPart(
        'xr-pop-wirebond-interposer',
        6,
        '#eab308',
        g,
        new THREE.Vector3(0, 7.1, 0),
        new THREE.Vector3(0, 23.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR07. PoP Inter-Package Solder Balls & TMV / TIV Vertical Copper Pillars (y = +5.4)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ballGeo = new THREE.SphereGeometry(0.46, 8, 6);
    const pillarGeo = new THREE.CylinderGeometry(0.28, 0.28, 2.35, 7);

    // 2 perimeter rings of PoP balls & Through-Mold Via (TMV) pillars around the SoC die
    const coords: Array<[number, number]> = [];
    for (const ring of [12.4, 14.0]) {
      for (let t = -12; t <= 12; t += 2.0) {
        coords.push([t, ring], [t, -ring]);
        if (Math.abs(t) < ring - 0.5) {
          coords.push([ring, t], [-ring, t]);
        }
      }
    }

    const balls = new THREE.InstancedMesh(ballGeo, mats.solderBallSilver, coords.length);
    const pillars = new THREE.InstancedMesh(pillarGeo, mats.copperHybridBond, coords.length);
    const dummy = new THREE.Object3D();
    coords.forEach(([x, z], idx) => {
      dummy.position.set(x, 0.95, z);
      dummy.updateMatrix();
      balls.setMatrixAt(idx, dummy.matrix);

      dummy.position.set(x, -0.55, z);
      dummy.updateMatrix();
      pillars.setMatrixAt(idx, dummy.matrix);
    });
    balls.instanceMatrix.needsUpdate = true;
    pillars.instanceMatrix.needsUpdate = true;
    g.add(balls, pillars);

    parts.push(
      finalizeBionzPart(
        'xr-tmv-pop-balls',
        7,
        '#d97736',
        g,
        new THREE.Vector3(0, 5.4, 0),
        new THREE.Vector3(0, 17.5, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR08. Low-Warpage Silica EMC Mold Frame & Stainless Anti-Warpage Stiffener (y = +3.3)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Perimeter EMC resin frame leaving the central SoC die floorplan crystal clear
    const emcFrame = makeHorizontalPlate(
      createFrameShape(PKG_W - 0.6, PKG_W - 0.6, 1.5, DIE_W + 2.6, DIE_W + 2.6, 0.9),
      2.3,
      mats.icEpoxy,
      0.1,
      16
    );
    // Stainless steel stiffener ring bonded on top rim
    const stiffener = makeHorizontalPlate(
      createFrameShape(PKG_W - 0.2, PKG_W - 0.2, 1.6, PKG_W - 3.6, PKG_W - 3.6, 1.0),
      0.55,
      mats.midPlateSteel,
      0.06,
      16
    );
    stiffener.position.y = 1.38;
    g.add(emcFrame, stiffener);

    parts.push(
      finalizeBionzPart(
        'xr-emc-mold-frame',
        8,
        '#475569',
        g,
        new THREE.Vector3(0, 3.3, 0),
        new THREE.Vector3(0, 12.2, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR09. Back-Grinded Silicon Bulk Substrate & Perimeter Crack-Stop Seal Ring (y = +2.3)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bulkSi = makeHorizontalPlate(
      createRoundedRectShape(DIE_W, DIE_W, 0.55),
      0.75,
      mats.siliconBulk,
      0.04,
      12
    );
    // Dual copper/tungsten perimeter crack-stop & moisture seal ring
    const sealOuter = makeHorizontalPlate(
      createFrameShape(DIE_W + 0.2, DIE_W + 0.2, 0.6, DIE_W - 0.5, DIE_W - 0.5, 0.4),
      0.92,
      mats.copperHybridBond,
      0.02,
      12
    );
    const sealInner = makeHorizontalPlate(
      createFrameShape(DIE_W - 0.75, DIE_W - 0.75, 0.45, DIE_W - 1.15, DIE_W - 1.15, 0.35),
      0.86,
      mats.tungstenGrid,
      0.02,
      12
    );
    g.add(bulkSi, sealOuter, sealInner);

    parts.push(
      finalizeBionzPart(
        'xr-die-bulk-silicon',
        9,
        '#3b638f',
        g,
        new THREE.Vector3(0, 2.3, 0),
        new THREE.Vector3(0, 7.6, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR10–XR25. 16 INTERNAL SILICON DIE FUNCTIONAL IP BLOCKS (4x4 Floorplan at y = +1.35)
  // Assembled neatly inside DIE_W (18.8 x 18.8 usable active core area);
  // Exploded: rises to a clean stepped gallery with radial X/Z separation so EVERY IP block is readable!
  // =========================================================================
  interface IpBlockDef {
    id: string;
    order: number;
    swatch: string;
    x: number;
    z: number;
    w: number;
    d: number;
    h: number;
    mat: THREE.Material;
    accentMat: THREE.Material;
    exY: number;
    detailKind: 'lanes' | 'grid' | 'cores' | 'ring' | 'vault' | 'bars';
  }

  const ipBlocks: IpBlockDef[] = [
    // Row 0 (Front -Z edge: Sensor ingress & RAW ISP pipeline)
    {
      id: 'xr-slvsec-rx-phy',
      order: 10,
      swatch: '#06b6d4',
      x: -6.9,
      z: -6.9,
      w: 4.3,
      d: 4.3,
      h: 0.78,
      mat: mats.vcWorkingFluidCyan,
      accentMat: mats.goldPlating,
      exY: 4.2,
      detailKind: 'lanes',
    },
    {
      id: 'xr-raw-isp-frontend',
      order: 11,
      swatch: '#0ea5e9',
      x: -2.3,
      z: -6.9,
      w: 4.3,
      d: 4.3,
      h: 0.84,
      mat: mats.ispSiliconDie,
      accentMat: mats.cfaGreen,
      exY: 4.6,
      detailKind: 'grid',
    },
    {
      id: 'xr-nr-detail-engine',
      order: 12,
      swatch: '#14b8a6',
      x: 2.3,
      z: -6.9,
      w: 4.3,
      d: 4.3,
      h: 0.84,
      mat: mats.siliconSensorDie,
      accentMat: mats.fluorineCoatCyan,
      exY: 4.6,
      detailKind: 'bars',
    },
    {
      id: 'xr-color-3dlut-engine',
      order: 13,
      swatch: '#f59e0b',
      x: 6.9,
      z: -6.9,
      w: 4.3,
      d: 4.3,
      h: 0.84,
      mat: mats.cinnabarAnodized,
      accentMat: mats.cfaRed,
      exY: 4.2,
      detailKind: 'grid',
    },
    // Row 1 (Core Compute: AI NPU, Quad ARM CPU, SA DSP, Video Codec)
    {
      id: 'xr-ai-npu-systolic',
      order: 14,
      swatch: '#8b5cf6',
      x: -6.9,
      z: -2.3,
      w: 4.3,
      d: 4.3,
      h: 0.96,
      mat: mats.npuSiliconDie,
      accentMat: mats.makeupSealViolet,
      exY: 5.8,
      detailKind: 'grid',
    },
    {
      id: 'xr-arm-cpu-cluster',
      order: 15,
      swatch: '#2563eb',
      x: -2.3,
      z: -2.3,
      w: 4.3,
      d: 4.3,
      h: 0.92,
      mat: mats.siliconLogicLayer,
      accentMat: mats.goldPlating,
      exY: 6.2,
      detailKind: 'cores',
    },
    {
      id: 'xr-sa-dsp-af-core',
      order: 16,
      swatch: '#0d9488',
      x: 2.3,
      z: -2.3,
      w: 4.3,
      d: 4.3,
      h: 0.90,
      mat: mats.siliconPhotodiode,
      accentMat: mats.vcWorkingFluidCyan,
      exY: 6.2,
      detailKind: 'cores',
    },
    {
      id: 'xr-video-codec-hevc',
      order: 17,
      swatch: '#e11d48',
      x: 6.9,
      z: -2.3,
      w: 4.3,
      d: 4.3,
      h: 0.94,
      mat: mats.gMasterRedBadge,
      accentMat: mats.bodyRecRed,
      exY: 5.8,
      detailKind: 'bars',
    },
    // Row 2 (Audio DSP, Shared SRAM, LPDDR5X Controller, C2PA Security Enclave)
    {
      id: 'xr-audio-dsp-noisecut',
      order: 18,
      swatch: '#10b981',
      x: -6.9,
      z: 2.3,
      w: 4.3,
      d: 4.3,
      h: 0.82,
      mat: mats.cfaGreen,
      accentMat: mats.goldPlating,
      exY: 5.2,
      detailKind: 'bars',
    },
    {
      id: 'xr-sram-linebuffer',
      order: 19,
      swatch: '#38bdf8',
      x: -2.3,
      z: 2.3,
      w: 4.3,
      d: 4.3,
      h: 0.86,
      mat: mats.dramCellArray,
      accentMat: mats.siliconDepletion,
      exY: 5.6,
      detailKind: 'grid',
    },
    {
      id: 'xr-ddr-mem-controller',
      order: 20,
      swatch: '#1d4ed8',
      x: 2.3,
      z: 2.3,
      w: 4.3,
      d: 4.3,
      h: 0.86,
      mat: mats.siliconTsvDram,
      accentMat: mats.mountShimBlue,
      exY: 5.6,
      detailKind: 'lanes',
    },
    {
      id: 'xr-c2pa-crypto-enclave',
      order: 21,
      swatch: '#d97706',
      x: 6.9,
      z: 2.3,
      w: 4.3,
      d: 4.3,
      h: 0.88,
      mat: mats.goldPlating,
      accentMat: mats.matteBlackAnodized,
      exY: 5.2,
      detailKind: 'vault',
    },
    // Row 3 (Rear +Z edge: Storage, Display/HDMI, USB/Wi-Fi 6E, Clock/DVFS)
    {
      id: 'xr-pcie-cfx-dma',
      order: 22,
      swatch: '#ea580c',
      x: -6.9,
      z: 6.9,
      w: 4.3,
      d: 4.3,
      h: 0.80,
      mat: mats.copperCoil,
      accentMat: mats.goldPlating,
      exY: 3.8,
      detailKind: 'lanes',
    },
    {
      id: 'xr-display-evf-hdmi-tx',
      order: 23,
      swatch: '#0284c7',
      x: -2.3,
      z: 6.9,
      w: 4.3,
      d: 4.3,
      h: 0.82,
      mat: mats.cfaBlue,
      accentMat: mats.evfAntiFogGlass,
      exY: 4.2,
      detailKind: 'lanes',
    },
    {
      id: 'xr-usb-network-hub',
      order: 24,
      swatch: '#6366f1',
      x: 2.3,
      z: 6.9,
      w: 4.3,
      d: 4.3,
      h: 0.80,
      mat: mats.varistorRingBlue,
      accentMat: mats.rfGoldCoax,
      exY: 4.2,
      detailKind: 'cores',
    },
    {
      id: 'xr-pll-clock-dvfs-ring',
      order: 25,
      swatch: '#ec4899',
      x: 6.9,
      z: 6.9,
      w: 4.3,
      d: 4.3,
      h: 0.80,
      mat: mats.thermalPadPink,
      accentMat: mats.goldPlating,
      exY: 3.8,
      detailKind: 'ring',
    },
  ];

  for (const blk of ipBlocks) {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(blk.w, blk.h, blk.d), blk.mat);
    g.add(base);

    // Sculpted micro-circuit architectural relief on top of each IP block
    const topY = blk.h * 0.5 + 0.08;
    if (blk.detailKind === 'lanes') {
      for (let i = -1.5; i <= 1.5; i += 0.75) {
        const lane = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, blk.d - 0.8), blk.accentMat);
        lane.position.set(i, topY, 0);
        lane.userData.noEdges = true;
        g.add(lane);
      }
    } else if (blk.detailKind === 'grid') {
      for (let ix = -1.2; ix <= 1.21; ix += 0.8) {
        for (let iz = -1.2; iz <= 1.21; iz += 0.8) {
          const cell = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.16, 0.54), blk.accentMat);
          cell.position.set(ix, topY, iz);
          cell.userData.noEdges = true;
          g.add(cell);
        }
      }
    } else if (blk.detailKind === 'cores') {
      for (const [cx, cz] of [
        [-1.0, -1.0],
        [1.0, -1.0],
        [-1.0, 1.0],
        [1.0, 1.0],
      ] as Array<[number, number]>) {
        const core = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.18, 1.55), blk.accentMat);
        core.position.set(cx, topY, cz);
        core.userData.noEdges = true;
        g.add(core);
      }
    } else if (blk.detailKind === 'vault') {
      const shield = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 0.22, 6), blk.accentMat);
      shield.position.y = topY + 0.02;
      const coreKey = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.26, 1.0), mats.goldPlating);
      coreKey.position.y = topY + 0.08;
      shield.userData.noEdges = true;
      coreKey.userData.noEdges = true;
      g.add(shield, coreKey);
    } else if (blk.detailKind === 'ring') {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.24, 6, 20), blk.accentMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = topY + 0.04;
      const center = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.24, 12), mats.goldPlating);
      center.position.y = topY + 0.04;
      ring.userData.noEdges = true;
      center.userData.noEdges = true;
      g.add(ring, center);
    } else {
      for (let iz = -1.35; iz <= 1.36; iz += 0.9) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(blk.w - 0.75, 0.16, 0.45), blk.accentMat);
        bar.position.set(0, topY, iz);
        bar.userData.noEdges = true;
        g.add(bar);
      }
    }

    // Radial fanning during explode keeps every IP block distinct and easy to pick!
    parts.push(
      finalizeBionzPart(
        blk.id,
        blk.order,
        blk.swatch,
        g,
        new THREE.Vector3(blk.x, 1.35, blk.z),
        new THREE.Vector3(blk.x * 1.45, blk.exY, blk.z * 1.45),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // XR26. FEOL FinFET / GAA Nanosheet Transistor Layer (y = +0.42)
  // =========================================================================
  {
    const g = new THREE.Group();
    const feolBase = new THREE.Mesh(
      new THREE.BoxGeometry(DIE_W - 0.6, 0.32, DIE_W - 0.6),
      mats.siliconTransistorLayer
    );
    g.add(feolBase);

    // FinFET/GAA nanosheet fins & High-k metal gate rails running orthogonally
    const finGeo = new THREE.BoxGeometry(DIE_W - 2.2, 0.28, 0.36);
    for (let z = -8.2; z <= 8.21; z += 1.64) {
      const fin = new THREE.Mesh(finGeo, mats.siliconDepletion);
      fin.position.set(0, 0.26, z);
      fin.userData.noEdges = true;
      g.add(fin);
    }
    const gateGeo = new THREE.BoxGeometry(0.42, 0.36, DIE_W - 2.2);
    for (let x = -7.8; x <= 7.81; x += 2.6) {
      const gate = new THREE.Mesh(gateGeo, mats.gatePolysilicon);
      gate.position.set(x, 0.28, 0);
      gate.userData.noEdges = true;
      g.add(gate);
    }

    parts.push(
      finalizeBionzPart(
        'xr-feol-finfet-gaa',
        26,
        '#d99b38',
        g,
        new THREE.Vector3(0, 0.42, 0),
        new THREE.Vector3(0, -3.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR27. BEOL 14-Layer Dual-Damascene Copper Interconnect Stack (y = -0.35)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-Low-k dielectric matrix housing orthogonal M1-M14 copper wiring tiers
    const ulkBlock = new THREE.Mesh(
      new THREE.BoxGeometry(DIE_W - 0.4, 0.82, DIE_W - 0.4),
      mats.interlayerDielectric
    );
    g.add(ulkBlock);

    for (let layer = 0; layer < 4; layer++) {
      const y = -0.28 + layer * 0.20;
      const thick = 0.08 + layer * 0.025;
      const isX = layer % 2 === 0;
      const count = 7 - layer;
      const span = DIE_W - 2.4;
      for (let i = 0; i < count; i++) {
        const offset = -span * 0.42 + (i / Math.max(1, count - 1)) * span * 0.84;
        const wire = new THREE.Mesh(
          new THREE.BoxGeometry(isX ? span : thick * 2.6, thick, isX ? thick * 2.6 : span),
          mats.copperHybridBond
        );
        wire.position.set(isX ? 0 : offset, y, isX ? offset : 0);
        wire.userData.noEdges = true;
        g.add(wire);
      }
    }

    parts.push(
      finalizeBionzPart(
        'xr-beol-cu-metals',
        27,
        '#c96b1c',
        g,
        new THREE.Vector3(0, -0.35, 0),
        new THREE.Vector3(0, -9.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR28. Secondary Image Processor Co-Processor Chiplet (CXD90058 "Cetus") (y = +0.9, side bay)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Compact companion chiplet positioned beside main die edge in extended SiP cavity
    const cetusDie = makeHorizontalPlate(
      createRoundedRectShape(4.6, 13.8, 0.5),
      1.35,
      mats.npuSiliconDie,
      0.06,
      12
    );
    // 4 Cortex-A35 real-time cores etched on top surface
    for (let i = -1.5; i <= 1.5; i += 1.0) {
      const tile = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.16, 2.2), mats.goldPlating);
      tile.position.set(0, 0.72, i * 2.9);
      tile.userData.noEdges = true;
      g.add(tile);
    }
    g.add(cetusDie);

    parts.push(
      finalizeBionzPart(
        'xr-secondary-cetus-chiplet',
        28,
        '#7c3aed',
        g,
        new THREE.Vector3(13.2, 0.9, 0),
        new THREE.Vector3(26.0, 2.5, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // XR29. 2.5D Local Silicon Interconnect (LSI) Bridge & Fine Cu-RDL (y = -1.35)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Embedded silicon bridge spanning main BIONZ XR die edge to companion Cetus chiplet!
    const bridgeBody = makeHorizontalPlate(
      createRoundedRectShape(8.4, 15.6, 0.4),
      0.55,
      mats.siliconLogicLayer,
      0.04,
      12
    );
    bridgeBody.position.x = 10.2;
    // Ultra-fine 2/2 um copper RDL traces across the bridge
    for (let z = -6.2; z <= 6.21; z += 0.95) {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.10, 0.24), mats.copperHybridBond);
      trace.position.set(10.2, 0.30, z);
      trace.userData.noEdges = true;
      g.add(trace);
    }
    // Fan-out RDL ring underneath main die
    const rdlRing = makeHorizontalPlate(
      createFrameShape(DIE_W + 1.8, DIE_W + 1.8, 0.8, DIE_W - 2.6, DIE_W - 2.6, 0.5),
      0.32,
      mats.taNBarrierLiner,
      0.02,
      14
    );
    g.add(bridgeBody, rdlRing);

    parts.push(
      finalizeBionzPart(
        'xr-silicon-bridge-lsi',
        29,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, -1.35, 0),
        new THREE.Vector3(8.5, -15.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR30. Flip-Chip C4 Copper-Pillar Micro-Bump Array (y = -2.25)
  // =========================================================================
  {
    const g = new THREE.Group();
    const gridN = 12;
    const total = gridN * gridN;
    const cuGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.56, 7);
    const capGeo = new THREE.SphereGeometry(0.34, 7, 5);
    const pillars = new THREE.InstancedMesh(cuGeo, mats.copperHybridBond, total);
    const caps = new THREE.InstancedMesh(capGeo, mats.solderBallSilver, total);

    const dummy = new THREE.Object3D();
    let idx = 0;
    const step = (DIE_W - 2.4) / (gridN - 1);
    for (let ix = 0; ix < gridN; ix++) {
      for (let iz = 0; iz < gridN; iz++) {
        const x = -(DIE_W - 2.4) * 0.5 + ix * step;
        const z = -(DIE_W - 2.4) * 0.5 + iz * step;
        dummy.position.set(x, 0.14, z);
        dummy.updateMatrix();
        pillars.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(x, -0.22, z);
        dummy.updateMatrix();
        caps.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    pillars.instanceMatrix.needsUpdate = true;
    caps.instanceMatrix.needsUpdate = true;
    g.add(pillars, caps);

    parts.push(
      finalizeBionzPart(
        'xr-c4-copper-bumps',
        30,
        '#d97736',
        g,
        new THREE.Vector3(0, -2.25, 0),
        new THREE.Vector3(0, -21.5, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // XR31. Capillary Underfill (CUF) Silica-Filled Epoxy Layer (y = -2.45)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Translucent perimeter fillet collar wrapping the C4 bump field
    const fillet = makeHorizontalPlate(
      createFrameShape(DIE_W + 2.2, DIE_W + 2.2, 1.0, DIE_W - 1.2, DIE_W - 1.2, 0.5),
      0.88,
      mats.loficDielectric,
      0.08,
      14
    );
    const coreSheet = new THREE.Mesh(
      new THREE.BoxGeometry(DIE_W - 1.0, 0.42, DIE_W - 1.0),
      mats.opticalCementClear
    );
    g.add(fillet, coreSheet);

    parts.push(
      finalizeBionzPart(
        'xr-capillary-underfill',
        31,
        '#64748b',
        g,
        new THREE.Vector3(0, -2.45, 0),
        new THREE.Vector3(-12.0, -26.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR32. Embedded Silicon Trench Capacitors (eSiCap) & Land-Side 01005 MLCCs (y = -8.6)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Embedded silicon trench capacitors (top of substrate center)
    for (const [cx, cz] of [
      [-4.2, 0],
      [4.2, 0],
      [0, -4.2],
      [0, 4.2],
    ] as Array<[number, number]>) {
      const esicap = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.34, 2.2), mats.siliconDramLayer);
      esicap.position.set(cx, 4.9, cz);
      g.add(esicap);
    }

    // 20 Land-Side 01005 Ultra-Low-ESL MLCC decoupling capacitors underneath package center
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1.5; iz <= 1.5; iz += 1.0) {
        const capBody = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.62, 0.62), mats.smdCeramic);
        capBody.position.set(ix * 2.1, -0.1, iz * 2.1);
        capBody.userData.noEdges = true;
        const termL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.64, 0.64), mats.silverElectrode);
        termL.position.set(ix * 2.1 - 0.5, -0.1, iz * 2.1);
        termL.userData.noEdges = true;
        const termR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.64, 0.64), mats.silverElectrode);
        termR.position.set(ix * 2.1 + 0.5, -0.1, iz * 2.1);
        termR.userData.noEdges = true;
        g.add(capBody, termL, termR);
      }
    }

    parts.push(
      finalizeBionzPart(
        'xr-esicap-mlcc-decaps',
        32,
        '#c29258',
        g,
        new THREE.Vector3(0, -8.6, 0),
        new THREE.Vector3(14.0, -49.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // XR33. Top Ajinomoto Build-Up Film (ABF) Micro-Routing Layers (y = -3.7)
  // =========================================================================
  {
    const g = new THREE.Group();
    const abfTop = makeHorizontalPlate(
      createRoundedRectShape(PKG_W, PKG_W, 1.5),
      1.15,
      mats.abfSubstrate,
      0.08,
      16
    );
    g.add(abfTop);

    // Radial SAP 9/12 um copper fan-out traces spreading from die pitch to outer substrate
    for (let a = 0; a < 16; a++) {
      const ang = (a / 16) * Math.PI * 2;
      const trace = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.12, 0.28), mats.copperHybridBond);
      trace.position.set(Math.cos(ang) * 10.6, 0.62, Math.sin(ang) * 10.6);
      trace.rotation.y = -ang;
      trace.userData.noEdges = true;
      g.add(trace);
    }

    parts.push(
      finalizeBionzPart(
        'xr-abf-top-buildup',
        33,
        '#15803d',
        g,
        new THREE.Vector3(0, -3.7, 0),
        new THREE.Vector3(0, -32.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR34. Low-CTE Glass-Cloth BT-Resin Rigid Core & PTH Core Vias (y = -5.4)
  // =========================================================================
  {
    const g = new THREE.Group();
    const core = makeHorizontalPlate(
      createRoundedRectShape(PKG_W, PKG_W, 1.5),
      1.75,
      mats.pcbEdgeLaminate,
      0.08,
      16
    );
    // Copper reference ground/power planes on top & bottom of BT core
    const gndTop = new THREE.Mesh(new THREE.BoxGeometry(PKG_W - 1.6, 0.14, PKG_W - 1.6), mats.copperHeatSpreader);
    gndTop.position.y = 0.92;
    const gndBot = new THREE.Mesh(new THREE.BoxGeometry(PKG_W - 1.6, 0.14, PKG_W - 1.6), mats.copperHeatSpreader);
    gndBot.position.y = -0.92;
    g.add(core, gndTop, gndBot);

    // 8x8 Plated Through-Hole (PTH) copper vertical barrels visible along section/edge
    const pthGeo = new THREE.CylinderGeometry(0.36, 0.36, 2.02, 8);
    const pthInst = new THREE.InstancedMesh(pthGeo, mats.copperHybridBond, 64);
    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let ix = 0; ix < 8; ix++) {
      for (let iz = 0; iz < 8; iz++) {
        dummy.position.set(-12.6 + ix * 3.6, 0, -12.6 + iz * 3.6);
        dummy.updateMatrix();
        pthInst.setMatrixAt(idx++, dummy.matrix);
      }
    }
    pthInst.instanceMatrix.needsUpdate = true;
    g.add(pthInst);

    parts.push(
      finalizeBionzPart(
        'xr-bt-glass-core-pth',
        34,
        '#92400e',
        g,
        new THREE.Vector3(0, -5.4, 0),
        new THREE.Vector3(0, -39.0, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR35. Bottom ABF Fan-Out Layers, Green Solder Resist Mask & ENEPIG Pads (y = -7.1)
  // =========================================================================
  {
    const g = new THREE.Group();
    const abfBot = makeHorizontalPlate(
      createRoundedRectShape(PKG_W, PKG_W, 1.5),
      1.15,
      mats.hdiMainboardPcb,
      0.08,
      16
    );
    g.add(abfBot);

    // Gold ENEPIG (Ni/Pd/Au) SMD solder pad matrix on bottom surface
    const padCoords: Array<[number, number]> = [];
    for (let ix = -6; ix <= 6; ix++) {
      for (let iz = -6; iz <= 6; iz++) {
        if (Math.abs(ix) <= 2 && Math.abs(iz) <= 2) continue; // Center reserved for Land-Side MLCCs!
        padCoords.push([ix * 2.25, iz * 2.25]);
      }
    }
    const padGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.14, 8);
    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, padCoords.length);
    const dummy = new THREE.Object3D();
    padCoords.forEach(([x, z], i) => {
      dummy.position.set(x, -0.62, z);
      dummy.updateMatrix();
      padInst.setMatrixAt(i, dummy.matrix);
    });
    padInst.instanceMatrix.needsUpdate = true;
    g.add(padInst);

    parts.push(
      finalizeBionzPart(
        'xr-abf-bottom-solder-mask',
        35,
        '#166534',
        g,
        new THREE.Vector3(0, -7.1, 0),
        new THREE.Vector3(0, -45.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // XR36. SAC305 Lead-Free BGA Solder Ball Matrix (y = -8.45)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ballCoords: Array<[number, number]> = [];
    for (let ix = -6; ix <= 6; ix++) {
      for (let iz = -6; iz <= 6; iz++) {
        if (Math.abs(ix) <= 2 && Math.abs(iz) <= 2) continue; // Center cavity for Land-Side MLCCs
        ballCoords.push([ix * 2.25, iz * 2.25]);
      }
    }
    const bgaGeo = new THREE.SphereGeometry(0.68, 9, 7);
    const bgaInst = new THREE.InstancedMesh(bgaGeo, mats.solderBallSilver, ballCoords.length);
    const dummy = new THREE.Object3D();
    ballCoords.forEach(([x, z], i) => {
      dummy.position.set(x, 0, z);
      dummy.updateMatrix();
      bgaInst.setMatrixAt(i, dummy.matrix);
    });
    bgaInst.instanceMatrix.needsUpdate = true;
    g.add(bgaInst);

    parts.push(
      finalizeBionzPart(
        'xr-sac305-bga-balls',
        36,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, -8.45, 0),
        new THREE.Vector3(0, -54.0, 0),
        cp,
        0.18
      )
    );
  }

  return parts;
}
