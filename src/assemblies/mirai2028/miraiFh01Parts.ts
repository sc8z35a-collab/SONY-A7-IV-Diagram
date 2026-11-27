import * as THREE from 'three';
import { CadPart } from '../types';
import { V2MaterialLibrary } from '../../core/v2_material_catalog';
import {
  addCircleHoles,
  createFrameShape,
  createRoundedRectShape,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  buildChipPackage,
  buildShieldedInductor,
  buildSmdPassive,
  createChamferedBoxGeo,
  hiResCyl,
  hiResSphere,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import {
  addTorxBolts,
  buildCurvedFpcRibbon,
  createGoldWirebondArchGeo,
  finalizeMiraiPart,
  InstanceTransform,
  makeHorizCncPlate,
  makeMiraiInstanced,
} from './miraiShared';

/**
 * FH01 Prototype Structure #1 — Full-Frame Single-Photon SPAD / QIS 3D Stacked Sensor
 * 16 Watchmaker-Grade Explodable 3D CAD Parts (`miraiSubView = 1`, order 1..16).
 *
 * Orientation: Horizontal XZ optical wafer stack (optical axis +Y), active die 36 x 24 mm,
 * HTCC ceramic cavity package 56 x 44 mm, 3-point datum CNC baseplate 63 x 51 mm.
 * Zero direct `new THREE.Mesh*Material` allocations — 100% ResourceCache & HeroMaterialSpec backed.
 */
export function buildMiraiFh01Parts(mats: V2MaterialLibrary): CadPart[] {
  const cp: THREE.Plane[] = mats.clippingPlanes;
  const parts: CadPart[] = [];

  // =========================================================================
  // FH01-01: CNC Knife-Edge Stray-Light Baffle Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    const outerShape = createFrameShape(58.4, 46.4, 3.0, 41.2, 29.2, 1.4);
    addCircleHoles(outerShape, [
      [-26.2, 20.2, 1.35],
      [26.2, 20.2, 1.35],
      [-26.2, -20.2, 1.35],
      [26.2, -20.2, 1.35],
    ]);
    const mainFrame = makeHorizCncPlate(outerShape, 1.42, mats.welcomeCoreSlate, {
      bevel: 0.16,
      bevelSegs: 2,
      curveSegs: 20,
    });
    g.add(mainFrame);

    // 3 stepped knife-edge stray-light baffle ribs tapering inward toward the 36x24 aperture
    const ribSpecs = [
      { ow: 43.2, oh: 31.2, iw: 40.2, ih: 28.2, y: 0.34, h: 0.32, mat: mats.velvetFlockTrap },
      { ow: 41.4, oh: 29.4, iw: 39.0, ih: 27.0, y: 0.0, h: 0.30, mat: mats.matteBlackAnodized },
      { ow: 39.8, oh: 27.8, iw: 38.0, ih: 26.0, y: -0.34, h: 0.28, mat: mats.velvetFlockTrap },
    ];
    for (const r of ribSpecs) {
      const rib = makeHorizCncPlate(
        createFrameShape(r.ow, r.oh, 1.1, r.iw, r.ih, 0.8),
        r.h,
        r.mat,
        { bevel: 0.04, bevelSegs: 1, curveSegs: 14 }
      );
      rib.position.y = r.y;
      g.add(rib);
    }

    // Precision machined emerald-teal MIRAI 2028 ID accent strip along front (+Z) top bevel
    const accent = new THREE.Mesh(
      createChamferedBoxGeo(22.0, 0.18, 1.2, 0.25, 0.04, 'y'),
      mats.mofEmerald
    );
    accent.position.set(0, 0.74, 20.4);
    g.add(accent);

    // 4 machined stainless alignment collar sleeves in corner counterbores
    const sleeveGeo = hiResCyl(1.72, 1.72, 0.44, 16);
    const sleeveTransforms: InstanceTransform[] = [
      { pos: [-26.2, 0.56, -20.2] },
      { pos: [26.2, 0.56, -20.2] },
      { pos: [-26.2, 0.56, 20.2] },
      { pos: [26.2, 0.56, 20.2] },
    ];
    g.add(makeMiraiInstanced(sleeveGeo, mats.stainlessMachined, sleeveTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-baffle-frame',
        1,
        1,
        '#334155',
        g,
        new THREE.Vector3(0, 6.15, 0),
        new THREE.Vector3(0, 38.0, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // FH01-02: Low-Reflectance Multi-AR Borosilicate Cover Glass & Frit Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const glass = makeHorizCncPlate(
      createRoundedRectShape(50.8, 38.8, 1.8),
      0.72,
      mats.opticalCementClear,
      { bevel: 0.10, bevelSegs: 2, curveSegs: 18 }
    );
    g.add(glass);

    // Kovar / gold-tin hermetic solder-frit perimeter border ring
    const fritRing = makeHorizCncPlate(
      createFrameShape(52.2, 40.2, 2.0, 47.6, 35.6, 1.4),
      0.34,
      mats.kovarSeal,
      { bevel: 0.05, bevelSegs: 1, curveSegs: 16 }
    );
    fritRing.position.y = -0.34;
    g.add(fritRing);

    // Subtle AR edge refraction bevel highlight collar
    const arRim = makeHorizCncPlate(
      createFrameShape(50.2, 38.2, 1.6, 48.4, 36.4, 1.3),
      0.16,
      mats.arItoFilm,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 14 }
    );
    arRim.position.y = 0.38;
    g.add(arRim);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-ar-coverglass',
        1,
        2,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 4.95, 0),
        new THREE.Vector3(0, 31.5, 0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // FH01-03: Gapless OCL On-Chip Microlens Array (384 Instanced Domes)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Perimeter refractive optical guard border (center kept crystal-clear so SPAD die glows through!)
    const border = makeHorizCncPlate(
      createFrameShape(35.8, 23.8, 0.7, 34.2, 22.2, 0.5),
      0.24,
      mats.quartzEdge,
      { bevel: 0.03, bevelSegs: 1, curveSegs: 12 }
    );
    border.position.y = 0.08;
    g.add(border);

    // 24 x 16 = 384 crystal-clear high-fill-factor gapless OCL dome hemispheres
    const cols = 24;
    const rows = 16;
    const pitchX = 33.6 / cols;
    const pitchZ = 21.6 / rows;
    const domeGeo = hiResSphere(
      Math.min(pitchX, pitchZ) * 0.47,
      10,
      7,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.5
    );
    domeGeo.scale(1.0, 0.58, 1.0);
    const domeTransforms: InstanceTransform[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        domeTransforms.push({
          pos: [
            (c - (cols - 1) * 0.5) * pitchX,
            0.05,
            (r - (rows - 1) * 0.5) * pitchZ,
          ],
        });
      }
    }
    g.add(makeMiraiInstanced(domeGeo, mats.opticalCementClear, domeTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-ocl-microlens-array',
        1,
        3,
        '#7dd3fc',
        g,
        new THREE.Vector3(0, 2.86, 0),
        new THREE.Vector3(0, 25.0, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH01-04: 1st Stacked Wafer — 36x24mm 3D-BSI SPAD / QIS Active Silicon Die
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bulk crystalline silicon die substrate
    const bulkDie = makeHorizCncPlate(
      createRoundedRectShape(36.0, 24.0, 0.55),
      0.54,
      mats.siliconBulk,
      { bevel: 0.07, bevelSegs: 2, curveSegs: 16 }
    );
    g.add(bulkDie);

    // High-DPI 1024px HeroMaterialSpec active SPAD/QIS photon-counting top surface
    const activeSurface = makeHorizCncPlate(
      createRoundedRectShape(35.6, 23.6, 0.45),
      0.10,
      mats.fh01SpadDieMap,
      {
        bevel: 0.02,
        bevelSegs: 1,
        curveSegs: 12,
        planarUv: { w: 35.6, h: 23.6 },
      }
    );
    activeSurface.position.y = 0.28;
    activeSurface.userData.noEdges = true;
    g.add(activeSurface);

    // Raised micro gold bond pad strips along all 4 perimeter edges (landing points for 64 wirebonds)
    const padGeo = markHiRes(new THREE.BoxGeometry(0.68, 0.10, 0.42));
    const padTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 20; i++) {
      const x = -15.2 + (30.4 * i) / 19;
      padTransforms.push({ pos: [x, 0.34, -11.35] });
      padTransforms.push({ pos: [x, 0.34, 11.35] });
    }
    for (let j = 0; j < 12; j++) {
      const z = -9.2 + (18.4 * j) / 11;
      padTransforms.push({ pos: [-17.35, 0.34, z], rot: [0, Math.PI / 2, 0] });
      padTransforms.push({ pos: [17.35, 0.34, z], rot: [0, Math.PI / 2, 0] });
    }
    g.add(makeMiraiInstanced(padGeo, mats.goldPlating, padTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-spad-top-die',
        1,
        4,
        '#0284c7',
        g,
        new THREE.Vector3(0, 2.38, 0),
        new THREE.Vector3(0, 19.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH01-05: Metallic F-DTI Optical Trench & HV Guard-Ring 3D Crossbar Grid
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer tungsten-oxide optical-black isolation perimeter frame
    const dtiFrame = makeHorizCncPlate(
      createFrameShape(35.6, 23.6, 0.5, 33.8, 21.8, 0.35),
      0.42,
      mats.tungstenGrid,
      { bevel: 0.04, bevelSegs: 1, curveSegs: 12 }
    );
    g.add(dtiFrame);

    // 19 longitudinal + 13 transverse metallic F-DTI optical crosstalk walls (suppresses SPAD secondary emission!)
    const wallXGeo = markHiRes(new THREE.BoxGeometry(0.14, 0.42, 22.0));
    const wallXTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 19; i++) {
      wallXTransforms.push({ pos: [-16.2 + (32.4 * i) / 18, 0, 0] });
    }
    g.add(makeMiraiInstanced(wallXGeo, mats.tungstenGrid, wallXTransforms));

    const wallZGeo = markHiRes(new THREE.BoxGeometry(34.0, 0.42, 0.14));
    const wallZTransforms: InstanceTransform[] = [];
    for (let j = 0; j < 13; j++) {
      wallZTransforms.push({ pos: [0, 0, -10.2 + (20.4 * j) / 12] });
    }
    g.add(makeMiraiInstanced(wallZGeo, mats.tungstenGrid, wallZTransforms));

    // Thin SiO2 high-voltage guard dielectric spacer ring
    const oxide = makeHorizCncPlate(
      createFrameShape(35.0, 23.0, 0.45, 33.4, 21.4, 0.3),
      0.12,
      mats.ftiOxide,
      { bevel: 0.01, bevelSegs: 1, curveSegs: 10 }
    );
    oxide.position.y = -0.22;
    g.add(oxide);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-dti-guard-grid',
        1,
        5,
        '#64748b',
        g,
        new THREE.Vector3(0, 1.68, 0),
        new THREE.Vector3(0, 13.5, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH01-06: Cu-Cu Hybrid Bonding Interconnect Layer (280 Copper Micro-Pillars)
  // =========================================================================
  {
    const g = new THREE.Group();
    // SiCN hybrid-bonding dielectric interposer film
    const sicn = makeHorizCncPlate(
      createRoundedRectShape(35.6, 23.6, 0.5),
      0.16,
      mats.interlayerDielectric,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 12 }
    );
    g.add(sicn);

    // 20 x 14 = 280 precision Cu-Cu hybrid bond pillars directly linking every SPAD cell to its quench/TDC counter
    const cols = 20;
    const rows = 14;
    const pillarGeo = hiResCyl(0.28, 0.28, 0.96, 10);
    const pillarTransforms: InstanceTransform[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pillarTransforms.push({
          pos: [
            -16.0 + (32.0 * c) / (cols - 1),
            0.0,
            -10.2 + (20.4 * r) / (rows - 1),
          ],
        });
      }
    }
    g.add(makeMiraiInstanced(pillarGeo, mats.copperHybridBond, pillarTransforms));

    // Perimeter copper dummy-fill CMP planarity guard ring
    const cmpRing = makeHorizCncPlate(
      createFrameShape(35.2, 23.2, 0.45, 33.8, 21.8, 0.35),
      0.24,
      mats.copperHeatSpreader,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 12 }
    );
    cmpRing.position.y = 0.04;
    g.add(cmpRing);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-cucu-microbumps',
        1,
        6,
        '#d97706',
        g,
        new THREE.Vector3(0, 0.85, 0),
        new THREE.Vector3(0, 8.2, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH01-07: 2nd Stacked Wafer — Pixel-Parallel Active Quench + TDC Logic Die
  // =========================================================================
  {
    const g = new THREE.Group();
    const wafer = makeHorizCncPlate(
      createRoundedRectShape(36.2, 24.2, 0.55),
      0.56,
      mats.siliconLogicLayer,
      { bevel: 0.07, bevelSegs: 2, curveSegs: 16 }
    );
    g.add(wafer);

    // 1024px HeroMaterialSpec 8x6 quench + TDC + 14-bit counter logic floorplan
    const topArt = makeHorizCncPlate(
      createRoundedRectShape(35.8, 23.8, 0.45),
      0.10,
      mats.fh01QuenchLogicMap,
      {
        bevel: 0.02,
        bevelSegs: 1,
        curveSegs: 12,
        planarUv: { w: 35.8, h: 23.8 },
      }
    );
    topArt.position.y = 0.29;
    topArt.userData.noEdges = true;
    g.add(topArt);

    // Dual lateral copper power-delivery rail bars along +/-Z wafer edges
    for (const sz of [-1, 1]) {
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(33.2, 0.16, 0.65, 0.12, 0.03, 'y'),
        mats.copperHeatSpreader
      );
      rail.position.set(0, 0.34, sz * 11.2);
      g.add(rail);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-quench-tdc-wafer',
        1,
        7,
        '#1d4ed8',
        g,
        new THREE.Vector3(0, 0.05, 0),
        new THREE.Vector3(0, 3.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH01-08: 3rd Stacked Wafer — Sub-Frame Integration DRAM Die + 48 TSVs
  // =========================================================================
  {
    const g = new THREE.Group();
    const dram = makeHorizCncPlate(
      createRoundedRectShape(36.4, 24.4, 0.55),
      0.62,
      mats.siliconTsvDram,
      { bevel: 0.07, bevelSegs: 2, curveSegs: 16 }
    );
    g.add(dram);

    // 4 quadrant DRAM bank relief tiles on top face
    const bankGeo = createChamferedBoxGeo(14.8, 0.14, 9.2, 0.3, 0.03, 'y');
    const bankTransforms: InstanceTransform[] = [
      { pos: [-8.2, 0.34, -5.2] },
      { pos: [8.2, 0.34, -5.2] },
      { pos: [-8.2, 0.34, 5.2] },
      { pos: [8.2, 0.34, 5.2] },
    ];
    g.add(makeMiraiInstanced(bankGeo, mats.dramCellArray, bankTransforms, false));

    // 48 perimeter Through-Silicon-Via (TSV) copper micro-pillars protruding cleanly through wafer edge
    const tsvGeo = hiResCyl(0.24, 0.24, 0.78, 8);
    const tsvTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 16; i++) {
      const x = -15.6 + (31.2 * i) / 15;
      tsvTransforms.push({ pos: [x, 0.02, -11.4] });
      tsvTransforms.push({ pos: [x, 0.02, 11.4] });
    }
    for (let j = 0; j < 8; j++) {
      const z = -8.6 + (17.2 * j) / 7;
      tsvTransforms.push({ pos: [-17.4, 0.02, z] });
      tsvTransforms.push({ pos: [17.4, 0.02, z] });
    }
    g.add(makeMiraiInstanced(tsvGeo, mats.copperHybridBond, tsvTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-dram-ring-die',
        1,
        8,
        '#4f46e5',
        g,
        new THREE.Vector3(0, -0.95, 0),
        new THREE.Vector3(0, -2.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH01-09: 20-28V High-Voltage Bias Charge-Pump Perimeter Collar
  // =========================================================================
  {
    const g = new THREE.Group();
    const ring = makeHorizCncPlate(
      createFrameShape(47.0, 35.0, 1.5, 38.4, 26.4, 0.9),
      0.56,
      mats.abfSubstrate,
      { bevel: 0.06, bevelSegs: 1, curveSegs: 16 }
    );
    g.add(ring);

    // Dual gold high-voltage distribution trace rings etched on top of collar
    const hvTrace = makeHorizCncPlate(
      createFrameShape(44.8, 32.8, 1.2, 43.8, 31.8, 1.0),
      0.08,
      mats.goldPlating,
      { bevel: 0.01, bevelSegs: 1, curveSegs: 14 }
    );
    hvTrace.position.y = 0.30;
    g.add(hvTrace);

    // 4 watchmaker QFN HV charge-pump controller ICs at the 4 corners of the collar
    const icCoords: Array<[number, number]> = [
      [-20.8, -14.8],
      [20.8, -14.8],
      [-20.8, 14.8],
      [20.8, 14.8],
    ];
    for (const [ix, iz] of icCoords) {
      const ic = buildChipPackage({
        w: 3.4,
        d: 3.4,
        h: 0.72,
        style: 'qfn',
        pinsPerSide: 5,
        bodyMat: mats.icEpoxy,
        leadMat: mats.solderBallSilver,
        pin1Mat: mats.goldPlating,
        axis: 'y',
      });
      ic.position.set(ix, 0.62, iz);
      g.add(ic);
    }

    // 4 micro shielded boost inductors adjacent to the HV ICs
    const indCoords: Array<[number, number]> = [
      [-15.8, -15.3],
      [15.8, -15.3],
      [-15.8, 15.3],
      [15.8, 15.3],
    ];
    for (const [lx, lz] of indCoords) {
      const ind = buildShieldedInductor(2.0, 0.82, mats.ferriteInductor, mats.solderBallSilver, mats.silverElectrode, 'y');
      ind.position.set(lx, 0.68, lz);
      g.add(ind);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-hv-chargepump-ring',
        1,
        9,
        '#0f766e',
        g,
        new THREE.Vector3(0, 1.45, 0),
        new THREE.Vector3(0, 11.0, 16.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH01-10: Stepped Hollow HTCC Alumina Ceramic Cavity Package
  // =========================================================================
  {
    const g = new THREE.Group();
    // Solid bottom ceramic floor plate (world Y = -3.15 .. -1.55)
    const floor = makeHorizCncPlate(
      createRoundedRectShape(56.0, 44.0, 2.4),
      1.60,
      mats.ceramicAlumina,
      { bevel: 0.14, bevelSegs: 2, curveSegs: 20 }
    );
    floor.position.y = -1.25;
    g.add(floor);

    // Sintered silver die-attach pad centered inside the cavity floor
    const dieAttach = makeHorizCncPlate(
      createRoundedRectShape(37.4, 25.4, 0.6),
      0.16,
      mats.sinteredSilver,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 12 }
    );
    dieAttach.position.y = -0.38;
    g.add(dieAttach);

    // Mid stepped ceramic wall (inner cavity 41.2 x 29.2, world Y = -1.55 .. +0.95)
    const midWall = makeHorizCncPlate(
      createFrameShape(56.0, 44.0, 2.4, 41.2, 29.2, 1.2),
      2.50,
      mats.ceramicAlumina,
      { bevel: 0.10, bevelSegs: 1, curveSegs: 20 }
    );
    midWall.position.y = 0.80;
    g.add(midWall);

    // Outer raised ceramic cavity wall (inner 47.6 x 35.6, world Y = +0.95 .. +4.35)
    const outerWall = makeHorizCncPlate(
      createFrameShape(56.0, 44.0, 2.4, 47.6, 35.6, 1.6),
      3.40,
      mats.ceramicAlumina,
      { bevel: 0.12, bevelSegs: 2, curveSegs: 20 }
    );
    outerWall.position.y = 3.75;
    g.add(outerWall);

    // Gold-plated wirebond terrace ring on mid-shelf ledge
    const bondShelf = makeHorizCncPlate(
      createFrameShape(44.2, 32.2, 1.3, 41.4, 29.4, 1.1),
      0.14,
      mats.goldPlating,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 16 }
    );
    bondShelf.position.y = 2.12;
    g.add(bondShelf);

    // Castellation side test pads along +/-X ceramic outer walls
    const castGeo = hiResCyl(0.45, 0.45, 4.6, 8);
    const castTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 8; i++) {
      const z = -14.0 + (28.0 * i) / 7;
      castTransforms.push({ pos: [-28.0, 1.2, z] });
      castTransforms.push({ pos: [28.0, 1.2, z] });
    }
    g.add(makeMiraiInstanced(castGeo, mats.goldPlating, castTransforms));

    // Underside 12 x 8 = 96 gold LGA solder land pads
    const lgaGeo = hiResCyl(0.56, 0.56, 0.22, 8);
    const lgaTransforms: InstanceTransform[] = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 12; c++) {
        if (r >= 2 && r <= 5 && c >= 3 && c <= 8) continue; // Center cleared for CuW thermal slug!
        lgaTransforms.push({
          pos: [-23.0 + (46.0 * c) / 11, -2.14, -17.5 + (35.0 * r) / 7],
        });
      }
    }
    g.add(makeMiraiInstanced(lgaGeo, mats.goldPlating, lgaTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-htcc-ceramic-pkg',
        1,
        10,
        '#475569',
        g,
        new THREE.Vector3(0, -1.10, 0),
        new THREE.Vector3(0, -9.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH01-11: Kovar Hermetic Weld Frame & 64 Arched 3D Gold Wirebonds
  // =========================================================================
  {
    const g = new THREE.Group();
    // Kovar seam-weld frame seated cleanly atop the ceramic rim (local Y = +1.78 -> world Y = +4.48)
    const kovarRim = makeHorizCncPlate(
      createFrameShape(54.8, 42.8, 2.2, 48.2, 36.2, 1.5),
      0.34,
      mats.kovarSeal,
      { bevel: 0.05, bevelSegs: 1, curveSegs: 18 }
    );
    kovarRim.position.y = 1.78;
    g.add(kovarRim);

    // 64 precision arched 3D gold wirebonds (20 top + 20 bottom + 12 left + 12 right)
    // Die pad sits at world Y = +2.72 (local +0.02); ceramic bond shelf sits at world Y = +1.08 (local -1.62)
    // Span horizontally = 3.55 mm outward from die edge onto stepped gold shelf!
    const archGeo = createGoldWirebondArchGeo(3.55, 1.05, -1.48);
    const wireTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 20; i++) {
      const x = -15.2 + (30.4 * i) / 19;
      // -Z edge arching outward toward -Z (+X rotated +90deg around Y points toward -Z!)
      wireTransforms.push({ pos: [x, 0.02, -11.35], rot: [0, Math.PI / 2, 0] });
      // +Z edge arching outward toward +Z (+X rotated -90deg around Y points toward +Z!)
      wireTransforms.push({ pos: [x, 0.02, 11.35], rot: [0, -Math.PI / 2, 0] });
    }
    for (let j = 0; j < 12; j++) {
      const z = -9.2 + (18.4 * j) / 11;
      // +X edge arching toward +X
      wireTransforms.push({ pos: [17.35, 0.02, z], rot: [0, 0, 0] });
      // -X edge arching toward -X
      wireTransforms.push({ pos: [-17.35, 0.02, z], rot: [0, Math.PI, 0] });
    }
    g.add(makeMiraiInstanced(archGeo, mats.goldPlating, wireTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-gold-wirebond-frame',
        1,
        11,
        '#eab308',
        g,
        new THREE.Vector3(0, 2.70, 0),
        new THREE.Vector3(0, 16.5, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH01-12: Low-ESL MLCC Decoupling Bank (36 Capacitors + 2 Low-Noise LDOs)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 18 MLCC capacitors along left (-X) and right (+X) outer ceramic ledges + 18 along +/-Z outer strips
    for (const sx of [-1, 1]) {
      for (let i = 0; i < 9; i++) {
        const cap = buildSmdPassive(1.6, 0.85, 0.65, mats.smdCeramic, mats.solderBallSilver, 'y');
        cap.position.set(sx * 22.8, 0, -12.0 + (24.0 * i) / 8);
        g.add(cap);
      }
    }
    for (const sz of [-1, 1]) {
      for (let i = 0; i < 9; i++) {
        const cap = buildSmdPassive(1.6, 0.85, 0.65, mats.smdCeramic, mats.solderBallSilver, 'y');
        cap.rotation.y = Math.PI / 2;
        cap.position.set(-14.0 + (28.0 * i) / 8, 0, sz * 17.0);
        g.add(cap);
      }
    }

    // 2 precision ultra-low-noise LDO voltage regulator DFN packages on left/right center shoulders
    for (const sx of [-1, 1]) {
      const ldo = buildChipPackage({
        w: 2.6,
        d: 3.4,
        h: 0.65,
        style: 'dfn',
        pinsPerSide: 4,
        bodyMat: mats.icEpoxy,
        leadMat: mats.goldPlating,
        axis: 'y',
      });
      ldo.position.set(sx * 25.4, 0.04, 0);
      g.add(ldo);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-mlcc-decoupling-bank',
        1,
        12,
        '#c2852a',
        g,
        new THREE.Vector3(0, 2.15, 0),
        new THREE.Vector3(16.0, 6.5, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH01-13: SLVS-EC 16-Lane High-Speed S-Curved FPC Harness
  // =========================================================================
  {
    const g = new THREE.Group();
    // Smooth S-curved polyimide FPC ribbon emerging cleanly from +X package edge
    const ribbonGeo = buildCurvedFpcRibbon(
      [
        [-5.2, 0.0],
        [-1.0, 0.0],
        [3.4, -0.35],
        [7.4, -2.2],
        [11.6, -3.55],
        [18.8, -3.55],
      ],
      0.26,
      28.0
    );
    g.add(new THREE.Mesh(ribbonGeo, mats.polyimideFpc));

    // EMI conductive silver-mesh backing film laminated cleanly atop mid-span (exact +0.20mm normal offset)
    const emiGeo = buildCurvedFpcRibbon(
      [
        [-2.2, 0.22],
        [1.4, 0.18],
        [3.6, -0.14],
        [7.6, -1.96],
        [11.8, -3.32],
        [13.4, -3.32],
      ],
      0.08,
      25.2
    );
    g.add(new THREE.Mesh(emiGeo, mats.emiShieldFilm));

    // Carbon-reinforced ZIF connector stiffener plate under tail
    const stiffener = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 0.42, 28.4, 0.4, 0.06, 'y'),
      mats.carbonFiberBlade
    );
    stiffener.position.set(16.4, -3.92, 0);
    g.add(stiffener);

    // Ivory ZIF lock retention collar bar
    const zifBar = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 0.56, 29.0, 0.25, 0.05, 'y'),
      mats.zifIvoryPlastic
    );
    zifBar.position.set(13.8, -3.28, 0);
    g.add(zifBar);

    // 28 gold-plated differential SLVS-EC contact fingers along ZIF tail
    const fingerGeo = markHiRes(new THREE.BoxGeometry(3.8, 0.08, 0.52));
    const fingerTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 28; i++) {
      fingerTransforms.push({
        pos: [17.1, -3.38, -12.6 + (25.2 * i) / 27],
      });
    }
    g.add(makeMiraiInstanced(fingerGeo, mats.goldPlating, fingerTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-slvs-fpc-harness',
        1,
        13,
        '#ea580c',
        g,
        new THREE.Vector3(32.5, -1.60, 0),
        new THREE.Vector3(24.0, -5.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH01-14: Machined CuW Low-CTE Heat Slug & Embedded NTC Thermistor
  // =========================================================================
  {
    const g = new THREE.Group();
    const slug = makeHorizCncPlate(
      createRoundedRectShape(45.6, 33.6, 2.0),
      1.04,
      mats.tungstenCopper,
      { bevel: 0.14, bevelSegs: 2, curveSegs: 18 }
    );
    g.add(slug);

    // Machined thermal expansion stress-relief solder grooves on top surface
    const grooveGeo = markHiRes(new THREE.BoxGeometry(38.0, 0.08, 0.45));
    const grooveTransforms: InstanceTransform[] = [
      { pos: [0, 0.54, -9.0] },
      { pos: [0, 0.54, 0.0] },
      { pos: [0, 0.54, 9.0] },
    ];
    g.add(makeMiraiInstanced(grooveGeo, mats.copperHeatSpreader, grooveTransforms));

    // Precision embedded NTC thermistor sensor boss + twin Kelvin gold leads on -X edge tab
    const ntcTab = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 0.58, 7.2, 0.4, 0.06, 'y'),
      mats.sensorPcb
    );
    ntcTab.position.set(-24.4, -0.10, 0);
    g.add(ntcTab);

    const ntcBead = buildSmdPassive(1.9, 1.1, 0.72, mats.rubyThermalFuse, mats.goldPlating, 'y');
    ntcBead.position.set(-24.6, 0.46, 0);
    g.add(ntcBead);

    for (const sz of [-1, 1]) {
      const lead = new THREE.Mesh(
        markHiRes(new THREE.BoxGeometry(2.4, 0.12, 0.28)),
        mats.goldPlating
      );
      lead.position.set(-22.4, 0.24, sz * 1.4);
      g.add(lead);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-cuw-slug-spreader',
        1,
        14,
        '#b45309',
        g,
        new THREE.Vector3(0, -3.72, 0),
        new THREE.Vector3(0, -16.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH01-15: Pyrolytic Graphite Sheet (PGS) & Silicone TIM Interface Pad
  // =========================================================================
  {
    const g = new THREE.Group();
    const pgs = makeHorizCncPlate(
      createRoundedRectShape(53.6, 41.6, 2.2),
      0.36,
      mats.pyroGraphite,
      { bevel: 0.05, bevelSegs: 1, curveSegs: 18 }
    );
    pgs.position.y = -0.18;
    g.add(pgs);

    // Compliant sky-blue silicone TIM interface pad centered atop PGS
    const tim = makeHorizCncPlate(
      createRoundedRectShape(43.2, 31.2, 1.6),
      0.42,
      mats.thermalPadBlue,
      { bevel: 0.08, bevelSegs: 1, curveSegs: 16 }
    );
    tim.position.y = 0.20;
    g.add(tim);

    // Subtle micro thermal contact waffle relief bars on TIM top
    const barGeo = markHiRes(new THREE.BoxGeometry(39.0, 0.06, 0.7));
    const barTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 9; i++) {
      barTransforms.push({ pos: [0, 0.43, -12.0 + (24.0 * i) / 8] });
    }
    g.add(makeMiraiInstanced(barGeo, mats.thermalPadTim, barTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-graphite-thermal-pad',
        1,
        15,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, -4.65, 0),
        new THREE.Vector3(0, -23.5, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // FH01-16: CNC 3-Point Datum Mounting Baseplate & 6 Watchmaker M1.4 Torx Bolts
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main precision CNC magnesium/aluminum chassis plate
    const plateShape = createRoundedRectShape(62.8, 50.8, 3.6);
    addCircleHoles(plateShape, [
      [-27.8, 21.8, 1.4],
      [27.8, 21.8, 1.4],
      [-27.8, -21.8, 1.4],
      [27.8, -21.8, 1.4],
      [-28.2, 0, 1.4],
      [28.2, 0, 1.4],
    ]);
    const basePlate = makeHorizCncPlate(plateShape, 1.48, mats.magnesiumCast, {
      bevel: 0.16,
      bevelSegs: 2,
      curveSegs: 20,
    });
    g.add(basePlate);

    // 3 triangular kinematic datum calibration bosses + brushed stainless shims
    const datumCoords: Array<[number, number]> = [
      [-24.2, -18.2],
      [24.2, -18.2],
      [0, 20.4],
    ];
    for (const [dx, dz] of datumCoords) {
      const boss = new THREE.Mesh(hiResCyl(3.4, 3.8, 0.65, 20), mats.stainlessMachined);
      boss.position.set(dx, 0.85, dz);
      applyBoxUVs(boss.geometry, 10);
      g.add(boss);

      const shim = new THREE.Mesh(hiResCyl(2.4, 2.4, 0.24, 16), mats.brassPrecision);
      shim.position.set(dx, 1.24, dz);
      g.add(shim);
    }

    // Perimeter machined titanium stiffening rail rib along bottom underside
    const ribFrame = makeHorizCncPlate(
      createFrameShape(59.4, 47.4, 2.8, 52.0, 40.0, 2.0),
      0.52,
      mats.welcomeCoreMid,
      { bevel: 0.08, bevelSegs: 1, curveSegs: 16 }
    );
    ribFrame.position.y = -0.94;
    g.add(ribFrame);

    // 6 watchmaker M1.4 Torx mounting bolts seated flush in counterbored ears (clear of 3 datum bosses!)
    addTorxBolts(
      g,
      [
        [-27.8, 0.78, -21.8],
        [27.8, 0.78, -21.8],
        [-27.8, 0.78, 21.8],
        [27.8, 0.78, 21.8],
        [-28.2, 0.78, 0],
        [28.2, 0.78, 0],
      ],
      mats,
      1.22,
      2.2
    );

    parts.push(
      finalizeMiraiPart(
        'mirai-fh01-precision-mount-base',
        1,
        16,
        '#64748b',
        g,
        new THREE.Vector3(0, -5.80, 0),
        new THREE.Vector3(0, -31.0, 0),
        cp,
        0.26
      )
    );
  }

  return parts;
}
