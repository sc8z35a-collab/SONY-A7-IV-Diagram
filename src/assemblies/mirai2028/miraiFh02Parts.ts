//@FLOW_MAP|file=src/assemblies/mirai2028/miraiFh02Parts.ts|unit=mirai2028|lines=885|exports=buildMiraiFh02Parts
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
  buildSmdPassive,
  createChamferedBoxGeo,
  hiResCyl,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import {
  addTorxBolts,
  buildCurvedFpcRibbon,
  buildMicroCoolingFins,
  createTerracedWaferShape,
  finalizeMiraiPart,
  InstanceTransform,
  makeHorizCncPlate,
  makeMiraiInstanced,
} from './miraiShared';

/**
 * FH02 Prototype Structure #2 — Filterless Perovskite / OPF 3-Layer Vertical RGB Sensor
 * 16 Watchmaker-Grade Explodable 3D CAD Parts (`miraiSubView = 2`, order 17..32).
 *
 * Signature visual architecture:
 *   Progressive front-right (+X, +Z) architectural step-terrace cutaway across the Top ITO,
 *   Cobalt-Blue (400-500nm), Emerald-Green (500-600nm), and Ruby-Red (600-700nm) perovskite
 *   layers so even at 0% Assembled, the filterless vertical RGB stack and 324 staggered
 *   3-height vertical copper/tungsten via columns gleam unmistakably through the ALD window!
 */
export function buildMiraiFh02Parts(mats: V2MaterialLibrary): CadPart[] {
  const cp: THREE.Plane[] = mats.clippingPlanes;
  const parts: CadPart[] = [];

  // =========================================================================
  // FH02-01: CNC Optical Hood Bezel & UV/Moisture Perimeter Elastomer Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    const bezelShape = createFrameShape(58.4, 46.4, 3.0, 41.6, 29.6, 1.5);
    addCircleHoles(bezelShape, [
      [-26.2, 20.2, 1.35],
      [26.2, 20.2, 1.35],
      [-26.2, -20.2, 1.35],
      [26.2, -20.2, 1.35],
    ]);
    const bezel = makeHorizCncPlate(bezelShape, 1.38, mats.welcomeCoreSlate, {
      bevel: 0.16,
      bevelSegs: 2,
      curveSegs: 20,
    });
    g.add(bezel);

    // Inner chamfered titanium optical aperture trim ring (bright studio rim contrast)
    const trim = makeHorizCncPlate(
      createFrameShape(43.2, 31.2, 1.6, 39.2, 27.2, 1.2),
      0.34,
      mats.welcomeTitaniumFace,
      { bevel: 0.06, bevelSegs: 1, curveSegs: 18 }
    );
    trim.position.y = 0.56;
    g.add(trim);

    // Continuous EPDM UV/moisture perimeter compression gasket seated underneath bezel
    const gasket = makeHorizCncPlate(
      createFrameShape(55.4, 43.4, 2.4, 51.6, 39.6, 1.8),
      0.36,
      mats.epdmGasket,
      { bevel: 0.06, bevelSegs: 1, curveSegs: 18 }
    );
    g.add(gasket);
    gasket.position.y = -0.78;

    // Signature RGB-triad micro indicator inlays along front (+Z) bevel lip
    const rgbMats = [mats.cfaBlue, mats.cfaGreen, mats.cfaRed];
    for (let k = 0; k < 3; k++) {
      const chip = new THREE.Mesh(
        createChamferedBoxGeo(5.2, 0.18, 1.1, 0.2, 0.04, 'y'),
        rgbMats[k]
      );
      chip.position.set((k - 1) * 6.2, 0.72, 20.4);
      g.add(chip);
    }

    // 4 machined titanium corner alignment bosses
    const bossGeo = hiResCyl(1.70, 1.70, 0.44, 16);
    const bossTransforms: InstanceTransform[] = [
      { pos: [-26.2, 0.56, -20.2] },
      { pos: [26.2, 0.56, -20.2] },
      { pos: [-26.2, 0.56, 20.2] },
      { pos: [26.2, 0.56, 20.2] },
    ];
    g.add(makeMiraiInstanced(bossGeo, mats.titaniumRivet, bossTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-optical-hood-bezel',
        2,
        17,
        '#334155',
        g,
        new THREE.Vector3(0, 6.15, 0),
        new THREE.Vector3(0, 39.5, 0),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // FH02-02: Multi-Layer ALD / TFE Ultra-Barrier Encapsulation Window
  // =========================================================================
  {
    const g = new THREE.Group();
    const barrierGlass = makeHorizCncPlate(
      createRoundedRectShape(50.8, 38.8, 1.8),
      0.72,
      mats.opticalCementClear,
      { bevel: 0.10, bevelSegs: 2, curveSegs: 18 }
    );
    g.add(barrierGlass);

    // Dual concentric inorganic Al2O3 / TiO2 atomic-layer edge seal frames
    const outerSeal = makeHorizCncPlate(
      createFrameShape(52.4, 40.4, 2.0, 49.4, 37.4, 1.6),
      0.34,
      mats.kovarSeal,
      { bevel: 0.05, bevelSegs: 1, curveSegs: 16 }
    );
    outerSeal.position.y = -0.34;
    g.add(outerSeal);

    const innerSeal = makeHorizCncPlate(
      createFrameShape(48.8, 36.8, 1.5, 47.0, 35.0, 1.3),
      0.22,
      mats.paryleneVioletGlaze,
      { bevel: 0.03, bevelSegs: 1, curveSegs: 14 }
    );
    innerSeal.position.y = -0.30;
    g.add(innerSeal);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-ald-tfe-barrier',
        2,
        18,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 4.95, 0),
        new THREE.Vector3(0, 33.0, 0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // FH02-03: Top Translucent ITO Common Electrode & Silver Busbar Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    const ito = makeHorizCncPlate(
      createTerracedWaferShape(35.0, 23.0, 0.65, 2.0, 0.2),
      0.10,
      mats.opticalCementClear,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 14 }
    );
    g.add(ito);

    // Silver low-sheet-resistance perimeter collector rails along -X, -Z, and partial +Z/+X edges
    const busN = new THREE.Mesh(createChamferedBoxGeo(34.6, 0.14, 0.72, 0.12, 0.02, 'y'), mats.silverElectrode);
    busN.position.set(0, 0.10, -11.0);
    g.add(busN);

    const busW = new THREE.Mesh(createChamferedBoxGeo(0.72, 0.14, 22.6, 0.12, 0.02, 'y'), mats.silverElectrode);
    busW.position.set(-17.0, 0.10, 0);
    g.add(busW);

    const busS = new THREE.Mesh(createChamferedBoxGeo(18.6, 0.14, 0.72, 0.12, 0.02, 'y'), mats.silverElectrode);
    busS.position.set(-8.0, 0.10, 11.0);
    g.add(busS);

    const busE = new THREE.Mesh(createChamferedBoxGeo(0.72, 0.14, 11.2, 0.12, 0.02, 'y'), mats.silverElectrode);
    busE.position.set(17.0, 0.10, -5.7);
    g.add(busE);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-top-ito-electrode',
        2,
        19,
        '#7dd3fc',
        g,
        new THREE.Vector3(0, 3.60, 0),
        new THREE.Vector3(0, 27.0, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH02-04: Layer 1 — Cobalt-Blue (400-500nm) Wide-Bandgap Perovskite Film
  // =========================================================================
  {
    const g = new THREE.Group();
    const blueFilm = makeHorizCncPlate(
      createTerracedWaferShape(35.2, 23.2, 0.65, 2.0, 0.2),
      0.54,
      mats.fh02BluePerovskiteMap,
      {
        bevel: 0.06,
        bevelSegs: 2,
        curveSegs: 16,
        planarUv: { w: 35.2, h: 23.2 },
      }
    );
    g.add(blueFilm);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-blue-perovskite-layer',
        2,
        20,
        '#2563eb',
        g,
        new THREE.Vector3(0, 3.06, 0),
        new THREE.Vector3(0, 21.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH02-05: ETL/HTL Charge-Transport Interlayer-1 & Optical Spacer
  // =========================================================================
  {
    const g = new THREE.Group();
    const etl1 = makeHorizCncPlate(
      createTerracedWaferShape(35.4, 23.4, 0.65, 2.2, 0.4),
      0.20,
      mats.opticalCementClear,
      { bevel: 0.03, bevelSegs: 1, curveSegs: 14 }
    );
    g.add(etl1);

    // Subtle micro gold extraction bus tabs along -X and +X non-cutaway edge
    const tabGeo = markHiRes(new THREE.BoxGeometry(0.95, 0.10, 0.45));
    const tabTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 10; i++) {
      tabTransforms.push({ pos: [-17.4, 0.14, -9.0 + (18.0 * i) / 9] });
    }
    g.add(makeMiraiInstanced(tabGeo, mats.goldPlating, tabTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-etl-htl-interlayer-1',
        2,
        21,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 2.52, 0),
        new THREE.Vector3(0, 16.5, 0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // FH02-06: Layer 2 — Emerald-Green (500-600nm) Perovskite / OPF Absorber
  // =========================================================================
  {
    const g = new THREE.Group();
    const greenFilm = makeHorizCncPlate(
      createTerracedWaferShape(35.6, 23.6, 0.65, 8.0, 4.2),
      0.54,
      mats.fh02GreenPerovskiteMap,
      {
        bevel: 0.06,
        bevelSegs: 2,
        curveSegs: 16,
        planarUv: { w: 35.6, h: 23.6 },
      }
    );
    g.add(greenFilm);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-green-perovskite-layer',
        2,
        22,
        '#059669',
        g,
        new THREE.Vector3(0, 1.96, 0),
        new THREE.Vector3(0, 11.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH02-07: ETL/HTL Interlayer-2 & Mid-ITO Readout Grid
  // =========================================================================
  {
    const g = new THREE.Group();
    const etl2 = makeHorizCncPlate(
      createTerracedWaferShape(35.8, 23.8, 0.65, 8.2, 4.4),
      0.20,
      mats.opticalCementClear,
      { bevel: 0.03, bevelSegs: 1, curveSegs: 14 }
    );
    g.add(etl2);

    // Fine silver mid-layer bias collector bars
    const barGeo = markHiRes(new THREE.BoxGeometry(0.16, 0.12, 22.0));
    const barTransforms: InstanceTransform[] = [];
    for (let i = 0; i < 8; i++) {
      barTransforms.push({ pos: [-15.0 + i * 3.5, 0.14, 0] });
    }
    g.add(makeMiraiInstanced(barGeo, mats.silverElectrode, barTransforms));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-etl-htl-interlayer-2',
        2,
        23,
        '#64748b',
        g,
        new THREE.Vector3(0, 1.40, 0),
        new THREE.Vector3(0, 6.5, 0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // FH02-08: Layer 3 — Ruby-Red (600-700nm) Narrow-Bandgap Perovskite Film
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full 36 x 24 mm footprint — forms the gleaming Ruby-Red floor beneath the terraced cutaway!
    const redFilm = makeHorizCncPlate(
      createRoundedRectShape(36.0, 24.0, 0.65),
      0.54,
      mats.fh02RedPerovskiteMap,
      {
        bevel: 0.06,
        bevelSegs: 2,
        curveSegs: 16,
        planarUv: { w: 36.0, h: 24.0 },
      }
    );
    g.add(redFilm);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-red-perovskite-layer',
        2,
        24,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0.82, 0),
        new THREE.Vector3(0, 1.8, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH02-09: 3-Height Staggered Vertical RGB Micro-Via Columns (324 Pillars)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 12 x 9 macro pixel cells; each cell contains 3 staggered vertical via pillars
    // tapping independently into Red (short), Green (mid), and Blue (tall) absorber films!
    const cols = 12;
    const rows = 9;
    const pitchX = 32.0 / (cols - 1);
    const pitchZ = 20.4 / (rows - 1);

    const redViaGeo = hiResCyl(0.20, 0.22, 0.90, 8);
    const greenViaGeo = hiResCyl(0.20, 0.22, 2.02, 8);
    const blueViaGeo = hiResCyl(0.20, 0.22, 3.16, 8);
    const collarGeo = hiResCyl(0.32, 0.32, 0.16, 8);

    const redT: InstanceTransform[] = [];
    const greenT: InstanceTransform[] = [];
    const blueT: InstanceTransform[] = [];
    const goldCollars: InstanceTransform[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx = -16.0 + c * pitchX;
        const bz = -10.2 + r * pitchZ;
        const inBlueCutout = bx > 2.4 && bz > 0.4;
        const inGreenCutout = bx > 8.4 && bz > 4.4;

        // Short Red-layer tap pillar (full 36x24 array, gleaming gold collars exposed on Ruby-Red step!)
        redT.push({ pos: [bx - 0.52, 0.45, bz] });
        goldCollars.push({ pos: [bx - 0.52, 0.90, bz] });

        // Medium Green-layer tap pillar (present across full Green terrace + cutaway showcase edge)
        if (!inGreenCutout) {
          greenT.push({ pos: [bx, 1.01, bz] });
          goldCollars.push({ pos: [bx, 2.02, bz] });
        }

        // Tall Blue-layer tap pillar (present across full Blue terrace + cleanly trimmed at cutaway)
        if (!inBlueCutout) {
          blueT.push({ pos: [bx + 0.52, 1.58, bz] });
          goldCollars.push({ pos: [bx + 0.52, 3.16, bz] });
        }
      }
    }

    g.add(makeMiraiInstanced(redViaGeo, mats.copperHybridBond, redT));
    g.add(makeMiraiInstanced(greenViaGeo, mats.copperHeatSpreader, greenT));
    g.add(makeMiraiInstanced(blueViaGeo, mats.tungstenCopper, blueT));
    g.add(makeMiraiInstanced(collarGeo, mats.goldPlating, goldCollars));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-vertical-via-pillars',
        2,
        25,
        '#d97706',
        g,
        new THREE.Vector3(0, 0.02, 0),
        new THREE.Vector3(22.0, 12.0, 14.0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH02-10: Grain-Boundary Passivation & Dark-Current Blocking Nano-Film
  // =========================================================================
  {
    const g = new THREE.Group();
    const passiv = makeHorizCncPlate(
      createRoundedRectShape(36.0, 24.0, 0.6),
      0.22,
      mats.aluminaHighKFilm,
      { bevel: 0.03, bevelSegs: 1, curveSegs: 14 }
    );
    g.add(passiv);

    // Gold perimeter dark-current leakage guard frame
    const guard = makeHorizCncPlate(
      createFrameShape(36.2, 24.2, 0.6, 34.8, 22.8, 0.5),
      0.16,
      mats.goldPlating,
      { bevel: 0.02, bevelSegs: 1, curveSegs: 14 }
    );
    guard.position.y = 0.06;
    g.add(guard);

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-passivation-darkblock',
        2,
        26,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 0.26, 0),
        new THREE.Vector3(0, -3.5, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // FH02-11: 300mm-Compatible 3-Ch Simultaneous RGB CMOS ROIC Silicon Wafer
  // =========================================================================
  {
    const g = new THREE.Group();
    const roic = makeHorizCncPlate(
      createRoundedRectShape(36.4, 24.4, 0.55),
      0.56,
      mats.siliconLogicLayer,
      { bevel: 0.07, bevelSegs: 2, curveSegs: 16 }
    );
    g.add(roic);

    // High-DPI 1024px HeroMaterialSpec 3-channel simultaneous RGB ROIC floorplan
    const roicArt = makeHorizCncPlate(
      createRoundedRectShape(36.0, 24.0, 0.45),
      0.10,
      mats.fh02RoicMap,
      {
        bevel: 0.02,
        bevelSegs: 1,
        curveSegs: 12,
        planarUv: { w: 36.0, h: 24.0 },
      }
    );
    roicArt.position.y = 0.29;
    roicArt.userData.noEdges = true;
    g.add(roicArt);

    // 48 perimeter copper micro-pad contacts along +/-X edges for dual FPC high-bandwidth readout
    const padGeo = markHiRes(new THREE.BoxGeometry(0.75, 0.12, 0.48));
    const padT: InstanceTransform[] = [];
    for (let i = 0; i < 24; i++) {
      const z = -10.8 + (21.6 * i) / 23;
      padT.push({ pos: [-17.6, 0.34, z] });
      padT.push({ pos: [17.6, 0.34, z] });
    }
    g.add(makeMiraiInstanced(padGeo, mats.goldPlating, padT));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-cmos-roic-wafer',
        2,
        27,
        '#1e40af',
        g,
        new THREE.Vector3(0, -0.30, 0),
        new THREE.Vector3(0, -8.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH02-12: Spectral-Crosstalk Color-Matrix DSP & Temp-Comp Die
  // =========================================================================
  {
    const g = new THREE.Group();
    const dsp = makeHorizCncPlate(
      createRoundedRectShape(33.2, 21.8, 0.55),
      0.52,
      mats.siliconDramLayer,
      { bevel: 0.06, bevelSegs: 2, curveSegs: 14 }
    );
    g.add(dsp);

    // 3×3 color-matrix MAC systolic array relief tiles
    const macGeo = createChamferedBoxGeo(8.8, 0.14, 5.4, 0.25, 0.03, 'y');
    const macT: InstanceTransform[] = [];
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        macT.push({ pos: [c * 10.2, 0.30, r * 6.4] });
      }
    }
    g.add(makeMiraiInstanced(macGeo, mats.ispSiliconDie, macT, false));

    // Perimeter Cu-Cu micro-bump link array connecting DSP upward to ROIC
    const bumpGeo = hiResCyl(0.24, 0.24, 0.34, 8);
    const bumpT: InstanceTransform[] = [];
    for (let i = 0; i < 14; i++) {
      const x = -14.2 + (28.4 * i) / 13;
      bumpT.push({ pos: [x, 0.32, -9.8] });
      bumpT.push({ pos: [x, 0.32, 9.8] });
    }
    g.add(makeMiraiInstanced(bumpGeo, mats.copperHybridBond, bumpT));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-color-matrix-dsp',
        2,
        28,
        '#4338ca',
        g,
        new THREE.Vector3(0, -1.10, 0),
        new THREE.Vector3(0, -14.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH02-13: N2-Purged Hermetic Ceramic Carrier & Kovar Laser Seam Flange
  // =========================================================================
  {
    const g = new THREE.Group();
    const floor = makeHorizCncPlate(
      createRoundedRectShape(56.0, 44.0, 2.4),
      1.60,
      mats.ceramicAlumina,
      { bevel: 0.14, bevelSegs: 2, curveSegs: 20 }
    );
    floor.position.y = -1.25;
    g.add(floor);

    const midWall = makeHorizCncPlate(
      createFrameShape(56.0, 44.0, 2.4, 40.4, 28.4, 1.2),
      2.40,
      mats.ceramicAlumina,
      { bevel: 0.10, bevelSegs: 1, curveSegs: 20 }
    );
    midWall.position.y = 0.75;
    g.add(midWall);

    const outerWall = makeHorizCncPlate(
      createFrameShape(56.0, 44.0, 2.4, 48.2, 36.2, 1.6),
      3.45,
      mats.ceramicAlumina,
      { bevel: 0.12, bevelSegs: 2, curveSegs: 20 }
    );
    outerWall.position.y = 3.70;
    g.add(outerWall);

    // Kovar hermetic laser seam-weld flange ring seated atop ceramic outer lip
    const flange = makeHorizCncPlate(
      createFrameShape(55.4, 43.4, 2.3, 48.8, 36.8, 1.5),
      0.34,
      mats.kovarSeal,
      { bevel: 0.05, bevelSegs: 1, curveSegs: 18 }
    );
    flange.position.y = 5.52;
    g.add(flange);

    // Underside silver LGA contact balls
    const ballGeo = hiResCyl(0.56, 0.56, 0.24, 8);
    const ballT: InstanceTransform[] = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 12; c++) {
        if (r >= 2 && r <= 5 && c >= 3 && c <= 8) continue;
        ballT.push({
          pos: [-23.0 + (46.0 * c) / 11, -2.14, -17.5 + (35.0 * r) / 7],
        });
      }
    }
    g.add(makeMiraiInstanced(ballGeo, mats.solderBallSilver, ballT));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-hermetic-ceramic-carrier',
        2,
        29,
        '#475569',
        g,
        new THREE.Vector3(0, -1.10, 0),
        new THREE.Vector3(0, -19.5, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // FH02-14: Inner-Moat Moisture & O2 Desiccant Getter Ring (10-Yr Stability)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sintered porous zeolite/CaO/MOF moisture-scavenging collar ring nested in the hermetic moat
    const moatRing = makeHorizCncPlate(
      createFrameShape(47.2, 35.2, 1.5, 39.2, 27.2, 1.0),
      0.95,
      mats.mofEmerald,
      { bevel: 0.10, bevelSegs: 1, curveSegs: 16 }
    );
    g.add(moatRing);

    // 8 machined titanium micro retention clips clamping the desiccant strip cleanly
    const clipGeo = createChamferedBoxGeo(2.4, 0.34, 4.4, 0.2, 0.04, 'y');
    const clipT: InstanceTransform[] = [
      { pos: [-14.0, 0.52, -15.6] },
      { pos: [0.0, 0.52, -15.6] },
      { pos: [14.0, 0.52, -15.6] },
      { pos: [-14.0, 0.52, 15.6] },
      { pos: [0.0, 0.52, 15.6] },
      { pos: [14.0, 0.52, 15.6] },
      { pos: [-21.6, 0.52, 0], rot: [0, Math.PI / 2, 0] },
      { pos: [21.6, 0.52, 0], rot: [0, Math.PI / 2, 0] },
    ];
    g.add(makeMiraiInstanced(clipGeo, mats.titaniumRivet, clipT, false));

    // Micro white PTFE vapor-permeable membrane windows along the desiccant track
    const ventGeo = markHiRes(new THREE.BoxGeometry(7.2, 0.12, 2.2));
    const ventT: InstanceTransform[] = [
      { pos: [-7.0, 0.50, -15.6] },
      { pos: [7.0, 0.50, -15.6] },
      { pos: [-7.0, 0.50, 15.6] },
      { pos: [7.0, 0.50, 15.6] },
    ];
    g.add(makeMiraiInstanced(ventGeo, mats.ptfeCleanWhite, ventT));

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-desiccant-getter-ring',
        2,
        30,
        '#10b981',
        g,
        new THREE.Vector3(0, 2.65, 0),
        new THREE.Vector3(-20.0, 13.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH02-15: Dual Symmetric 3x-Bandwidth FPC Ribbon Array & Decoupling Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual symmetric left (-X) and right (+X) S-curved ribbons carrying 3x full RGB simultaneous channels
    for (const sx of [-1, 1]) {
      const sideGrp = new THREE.Group();
      const ribbonGeo = buildCurvedFpcRibbon(
        [
          [27.4, 0.0],
          [31.4, 0.0],
          [35.2, -0.45],
          [39.0, -2.15],
          [43.0, -3.35],
          [49.8, -3.35],
        ],
        0.26,
        25.6
      );
      sideGrp.add(new THREE.Mesh(ribbonGeo, mats.polyimideFpc));

      const emiGeo = buildCurvedFpcRibbon(
        [
          [31.0, 0.20],
          [35.4, -0.24],
          [39.2, -1.92],
          [43.2, -3.12],
          [44.4, -3.12],
        ],
        0.08,
        23.4
      );
      sideGrp.add(new THREE.Mesh(emiGeo, mats.emiShieldFilm));

      const stiffener = new THREE.Mesh(
        createChamferedBoxGeo(5.6, 0.40, 26.0, 0.35, 0.05, 'y'),
        mats.carbonFiberBlade
      );
      stiffener.position.set(47.4, -3.72, 0);
      sideGrp.add(stiffener);

      const zifBar = new THREE.Mesh(
        createChamferedBoxGeo(1.7, 0.54, 26.6, 0.22, 0.05, 'y'),
        mats.zifIvoryPlastic
      );
      zifBar.position.set(44.9, -3.08, 0);
      sideGrp.add(zifBar);

      const fingerGeo = markHiRes(new THREE.BoxGeometry(3.6, 0.08, 0.48));
      const fingerT: InstanceTransform[] = [];
      for (let i = 0; i < 24; i++) {
        fingerT.push({ pos: [48.1, -3.18, -11.4 + (22.8 * i) / 23] });
      }
      sideGrp.add(makeMiraiInstanced(fingerGeo, mats.goldPlating, fingerT));

      // 16 MLCC decoupling caps per side (32 total) on carrier shoulder interface pads
      for (let c = 0; c < 16; c++) {
        const cap = buildSmdPassive(1.4, 0.78, 0.56, mats.smdCeramic, mats.solderBallSilver, 'y');
        cap.position.set(29.8, 0.38, -11.2 + (22.4 * c) / 15);
        sideGrp.add(cap);
      }

      if (sx === -1) {
        sideGrp.rotation.y = Math.PI;
      }
      g.add(sideGrp);
    }

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-highspeed-fpc-array',
        2,
        31,
        '#ea580c',
        g,
        new THREE.Vector3(0, -1.65, 0),
        new THREE.Vector3(0, -12.0, 22.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // FH02-16: Copper-Inlay Magnesium Thermal Baseplate, Micro-Fin Bank & Torx Bolts
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sculpted magnesium perimeter chassis plate with central copper thermal inlay pocket
    const mgShape = createFrameShape(62.8, 50.8, 3.6, 43.2, 31.2, 1.8);
    addCircleHoles(mgShape, [
      [-27.8, 21.8, 1.4],
      [27.8, 21.8, 1.4],
      [-27.8, -21.8, 1.4],
      [27.8, -21.8, 1.4],
      [-28.2, 0, 1.4],
      [28.2, 0, 1.4],
    ]);
    const mgPlate = makeHorizCncPlate(mgShape, 1.56, mats.magnesiumCast, {
      bevel: 0.16,
      bevelSegs: 2,
      curveSegs: 20,
    });
    g.add(mgPlate);

    // Pure copper inlaid thermal core block flush-mounted inside magnesium frame
    const cuInlay = makeHorizCncPlate(
      createRoundedRectShape(43.0, 31.0, 1.6),
      1.74,
      mats.copperHeatSpreader,
      { bevel: 0.12, bevelSegs: 2, curveSegs: 16 }
    );
    cuInlay.position.y = 0.08;
    g.add(cuInlay);

    // High-surface-area 22-fin machined copper micro-radiator bank along rear (-Z) edge (seated cleanly inside straight edge)
    g.add(
      buildMicroCoolingFins(
        22,
        42.0,
        0.70,
        2.15,
        4.4,
        [0, 0.25, -24.2],
        mats.copperHeatSpreader
      )
    );

    // 3 precision stainless kinematic datum standoffs (completely clear of 6 bolts!)
    const standCoords: Array<[number, number]> = [
      [-24.2, -18.2],
      [24.2, -18.2],
      [0, 20.4],
    ];
    for (const [dx, dz] of standCoords) {
      const boss = new THREE.Mesh(hiResCyl(3.3, 3.7, 0.68, 20), mats.stainlessMachined);
      boss.position.set(dx, 0.88, dz);
      applyBoxUVs(boss.geometry, 10);
      g.add(boss);
    }

    // 6 watchmaker M1.4 Torx bolts seated cleanly in counterbores
    addTorxBolts(
      g,
      [
        [-27.8, 0.82, -21.8],
        [27.8, 0.82, -21.8],
        [-27.8, 0.82, 21.8],
        [27.8, 0.82, 21.8],
        [-28.2, 0.82, 0],
        [28.2, 0.82, 0],
      ],
      mats,
      1.22,
      2.2
    );

    parts.push(
      finalizeMiraiPart(
        'mirai-fh02-thermal-chassis-plate',
        2,
        32,
        '#c26d38',
        g,
        new THREE.Vector3(0, -5.75, 0),
        new THREE.Vector3(0, -29.0, 0),
        cp,
        0.26
      )
    );
  }

  return parts;
}
