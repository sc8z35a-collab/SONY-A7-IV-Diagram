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
  applyPlanarUVs,
  buildChipPackage,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

/**
 * Lean CNC-chamfered rectangular block tailored for the 32-station Vol.0 diorama:
 * - Micro-bars / pads / traces (< 2.2mm min side or thin < 0.30mm) use ultra-fast 12-tri BoxGeometry
 * - Major pedestals, chambers & die slabs use 1-bevel / 5-curve-segment beveled extrusions (~5x lighter than 2/12!)
 */
function createChamferedBoxGeo(
  w: number,
  h: number,
  d: number,
  cornerR = 0.12,
  bevel = 0.08,
  axis: 'y' | 'z' = 'y'
): THREE.BufferGeometry {
  const rw = w;
  const rh = axis === 'y' ? d : h;
  const thick = axis === 'y' ? h : d;
  if (Math.min(rw, rh) < 2.15 || thick < 0.28) {
    const box = new THREE.BoxGeometry(w, h, d);
    applyPlanarUVs(box, rw, rh, axis === 'y' ? 'xz' : 'xy');
    return box;
  }
  const shape = new THREE.Shape();
  const hw = rw * 0.5;
  const hh = rh * 0.5;
  const r = Math.min(cornerR, hw * 0.45, hh * 0.45);
  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.absarc(hw - r, -hh + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(hw, hh - r);
  shape.absarc(hw - r, hh - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-hw + r, hh);
  shape.absarc(-hw + r, hh - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-hw, -hh + r);
  shape.absarc(-hw + r, -hh + r, r, Math.PI, Math.PI * 1.5, false);
  const effBevel = Math.min(bevel, thick * 0.35, rw * 0.15, rh * 0.15);
  const geo = extrudeHiRes(shape, thick, effBevel, effBevel, 1, 5);
  if (axis === 'y') {
    geo.rotateX(-Math.PI / 2);
    applyPlanarUVs(geo, rw, rh, 'xz');
  } else {
    applyPlanarUVs(geo, rw, rh, 'xy');
  }
  return geo;
}

function finalizeFabPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.22
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);

  return {
    id,
    subsystem: 'sensor_fab',
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

/** Build a precision cleanroom equipment pedestal base with beveled aluminum frame and corner feet */
function makeStationPlinth(
  w: number,
  d: number,
  h: number,
  mats: MaterialLibrary,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    createChamferedBoxGeo(w, h, d, 0.55, 0.14, 'y'),
    mats.stainlessMachined
  );
  body.position.y = -h * 0.5;
  g.add(body);

  const trim = new THREE.Mesh(
    createChamferedBoxGeo(w * 0.94, 0.18, d * 0.94, 0.42, 0.05, 'y'),
    accentMat
  );
  trim.position.y = 0.09;
  trim.userData.noEdges = true;
  g.add(trim);

  // 4 machined vibration-isolation feet
  const footGeo = hiResCyl(0.32, 0.38, 0.28, 10);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeo, mats.matteBlackAnodized);
      foot.position.set(sx * (w * 0.41), -h - 0.12, sz * (d * 0.41));
      foot.userData.noEdges = true;
      g.add(foot);
    }
  }
  return g;
}

/** Build a crisp 300mm scaled silicon wafer disc with beveled rim, V-notch & textured top surface */
function makeSiliconWaferDisc(
  radius: number,
  thickness: number,
  topMat: THREE.Material,
  edgeMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(hiResCyl(radius, radius, thickness, 24), edgeMat);
  g.add(base);

  const topGeo = markHiRes(new THREE.CircleGeometry(radius * 0.975, 24));
  topGeo.rotateX(-Math.PI / 2);
  applyPlanarUVs(topGeo, radius * 1.95, radius * 1.95, 'xz');
  const topDisc = new THREE.Mesh(topGeo, topMat);
  topDisc.position.y = thickness * 0.5 + 0.025;
  topDisc.userData.noEdges = true;
  g.add(topDisc);

  const rim = new THREE.Mesh(hiResTorus(radius * 0.985, thickness * 0.24, 6, 24), edgeMat);
  rim.rotation.x = Math.PI / 2;
  rim.userData.noEdges = true;
  g.add(rim);

  return g;
}

/** Build a precision miniature arched gold wirebond between two local coordinates */
function makeWirebondArch(
  a: THREE.Vector3,
  b: THREE.Vector3,
  archHeight: number,
  radius: number,
  mat: THREE.Material
): THREE.Mesh {
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  mid.y += archHeight;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  const geo = markHiRes(new THREE.TubeGeometry(curve, 10, radius, 6, false));
  const m = new THREE.Mesh(geo, mat);
  m.userData.noEdges = true;
  return m;
}

/** Build a stepped 3D architectural wafer cutaway slab for the 5 commercial sensor variants (V-01..V-05) */
function makeSensorVariantShowcaseBase(
  mats: MaterialLibrary,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const ped = new THREE.Mesh(
    createChamferedBoxGeo(9.4, 1.1, 7.6, 0.5, 0.14, 'y'),
    mats.matteBlackAnodized
  );
  ped.position.y = -0.55;
  g.add(ped);

  const badgeBar = new THREE.Mesh(
    createChamferedBoxGeo(8.2, 0.24, 0.55, 0.1, 0.04, 'y'),
    accentMat
  );
  badgeBar.position.set(0, 0.12, 3.25);
  badgeBar.userData.noEdges = true;
  g.add(badgeBar);
  return g;
}

/**
 * Build all 32 museum-grade, ultra-high-definition 3D CAD sculptural assemblies for
 * **Vol.0: センサー製造工程 総目次と全工程マップ（砂からミラーレス一眼へ・全2,110工程の完全設計図）**.
 *
 * Spatial CAD Choreography (100% collision-free assembled & exploded):
 * - **Deck 0 (`F0-01`–`F0-03`)**: Postage-Stamp 3D High-Tech City Hero Crown, 300mm Wafer Single-Shot vs Stitching Yield Board, and the 180-Day (T1–T5) Cleanroom Process Gantry Plinth.
 * - **Deck 1 (`F0-04`–`F0-15`, `P1`→`P12`)**: Full chronological 12-phase semiconductor fab & camera factory floor, featuring the authentic dual-track parallel Pixel Wafer (`P3+P4`) & Logic Wafer (`P5: 720 steps`) merge at `P6` (Cu-Cu Hybrid Bonding & 4um BSI Thinning) through `P12` (Mirrorless Camera Integration).
 * - **Deck 2 (`F0-16`–`F0-27`, `L-01`→`L-12`)**: Subterranean 12-station closed-loop Lithography Unit Carousel (`×96 cycles = 1,150 steps`) crowned up front by the Canon/ASML UV Stepper (`L-05`) and Hitachi/KLA ADI Rework Gate (`L-08`).
 * - **Deck 3 (`F0-28`–`F0-32`, `V-01`→`V-05`)**: Rear 5-Architecture Comparison Exhibition (FSI 1,500–1,650 steps → BSI → Partially Stacked → 2-Layer Full-Stack 2,110 Reference → 3-Layer DRAM / 2-Layer Transistor Pixel 2,400–3,100 steps).
 */
export function buildSensorFabParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // DECK 0 — MASTER OVERVIEW, 300mm WAFER YIELD & 6-MONTH CLEANROOM GANTRY (F0-01 – F0-03)
  // =========================================================================

  // F0-01. 切手サイズ（36×24mm）の超巨大ハイテク都市・フルサイズ積層CMOS基準モデル
  {
    const g = new THREE.Group();
    const cw = 21.6; // 36mm × 0.6 exact 3:2 full-frame proportion!
    const cd = 14.4; // 24mm × 0.6

    // Dark HTCC alumina ceramic base carrier + gold LGA perimeter pads
    const ceramic = new THREE.Mesh(
      createChamferedBoxGeo(cw + 3.2, 1.4, cd + 3.2, 0.7, 0.16, 'y'),
      mats.ceramicAlumina
    );
    ceramic.position.y = -2.4;
    g.add(ceramic);

    for (let ix = -5; ix <= 5; ix++) {
      for (const sz of [-1, 1]) {
        const pad = new THREE.Mesh(
          createChamferedBoxGeo(0.9, 0.18, 0.65, 0.08, 0.03, 'y'),
          mats.goldPlating
        );
        pad.position.set(ix * 2.0, -1.65, sz * (cd * 0.5 + 1.05));
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }

    // Bottom Layer: 40/28nm Logic Brain Die (ADC + DSP + SLVS-EC)
    const logicGeo = createChamferedBoxGeo(cw, 1.35, cd, 0.35, 0.09, 'y');
    applyPlanarUVs(logicGeo, cw, cd, 'xz');
    const logicDie = new THREE.Mesh(logicGeo, u.v2PixelAiCircuit);
    logicDie.position.y = -0.95;
    g.add(logicDie);

    // Middle Interconnect Forest: 50M+ Cu-Cu Hybrid Bond Micro-Pillar Array (stepped architectural cutaway!)
    const bondSlabGeo = createChamferedBoxGeo(cw * 0.94, 0.42, cd * 0.94, 0.25, 0.05, 'y');
    applyPlanarUVs(bondSlabGeo, cw * 0.94, cd * 0.94, 'xz');
    const bondSlab = new THREE.Mesh(bondSlabGeo, u.v2PixelHybridBondCu);
    bondSlab.position.y = 0.02;
    g.add(bondSlab);

    const pillarGeo = hiResCyl(0.24, 0.24, 1.15, 8);
    for (let ix = -5; ix <= 5; ix++) {
      for (let iz = -3; iz <= 3; iz++) {
        // Expose front-right corner pillars dramatically
        if (Math.abs(ix) < 4 && Math.abs(iz) < 2 && !(ix >= 2 && iz >= 1)) continue;
        const p = new THREE.Mesh(pillarGeo, mats.copperHybridBond);
        p.position.set(ix * 1.85, 0.72, iz * 1.9);
        p.userData.noEdges = true;
        g.add(p);
      }
    }

    // Upper Layer (Cutaway 3/4 slab): Thinned BSI Silicon Photodiode City (24M–66.8M light buckets!)
    const pdSlab = new THREE.Mesh(
      createChamferedBoxGeo(cw * 0.84, 1.15, cd * 0.84, 0.28, 0.08, 'y'),
      mats.siliconSensorDie
    );
    pdSlab.position.set(-1.3, 1.75, -0.9);
    g.add(pdSlab);

    // Bayer RGB Color Filter Mosaic + Tungsten Grid + Gapless Microlens City Dome Forest on top!
    const lensGeo = hiResSphere(0.76, 10, 7, 0, Math.PI * 2, 0, Math.PI * 0.52);
    const tileGeo = new THREE.BoxGeometry(1.62, 0.34, 1.62);
    const cfaMats = [mats.cfaRed, mats.cfaGreen, mats.cfaGreen, mats.cfaBlue];
    for (let ix = -4; ix <= 3; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        if (ix >= 2 && iz >= 1) continue; // cutaway corner revealing Cu-Cu pillars & logic die below!
        const mx = -1.3 + ix * 1.85;
        const mz = -0.9 + iz * 1.85;
        const cfaIdx = ((ix + 4) % 2) + ((iz + 2) % 2) * 2;
        const tile = new THREE.Mesh(tileGeo, cfaMats[cfaIdx]);
        tile.position.set(mx, 2.52, mz);
        tile.userData.noEdges = true;
        g.add(tile);

        const dome = new THREE.Mesh(lensGeo, mats.microlensGlass);
        dome.scale.set(1, 0.68, 1);
        dome.position.set(mx, 2.7, mz);
        dome.userData.noEdges = true;
        g.add(dome);
      }
    }

    // Gold perimeter wirebond arcs tying silicon die to ceramic shelf
    for (let i = -4; i <= 4; i++) {
      g.add(
        makeWirebondArch(
          new THREE.Vector3(i * 2.1, -0.3, cd * 0.48),
          new THREE.Vector3(i * 2.1, -1.65, cd * 0.5 + 1.05),
          1.25,
          0.09,
          mats.goldPlating
        )
      );
      g.add(
        makeWirebondArch(
          new THREE.Vector3(i * 2.1, -0.3, -cd * 0.48),
          new THREE.Vector3(i * 2.1, -1.65, -(cd * 0.5 + 1.05)),
          1.25,
          0.09,
          mats.goldPlating
        )
      );
    }

    // Elevated glass cover bevel ring frame around hero sensor
    const coverFrame = makeHiResHorizPlate(
      createFrameShape(cw + 2.8, cd + 2.8, 0.7, cw + 0.6, cd + 0.6, 0.4),
      0.34,
      mats.kovarSeal,
      0.06,
      1,
      16
    );
    coverFrame.position.y = 3.45;
    g.add(coverFrame);

    parts.push(
      finalizeFabPart(
        'fab0-hero-city-sensor',
        1,
        '#0ea5e9',
        g,
        new THREE.Vector3(2.0, 20.5, -24.0),
        new THREE.Vector3(2.0, 36.0, -10.0),
        cp,
        0.2
      )
    );
  }

  // F0-02. 300mmウェーハ・フルサイズダイ配列＆一括露光 vs スティッチング歩留まり盤
  {
    const g = new THREE.Group();

    // Precision 3-pin vacuum metrology chuck pedestal
    const chuckBase = new THREE.Mesh(hiResCyl(7.6, 8.6, 1.35, 32), mats.matteBlackAnodized);
    chuckBase.position.y = -1.25;
    g.add(chuckBase);

    const chuckRing = new THREE.Mesh(hiResTorus(7.4, 0.24, 10, 36), mats.stainlessMachined);
    chuckRing.rotation.x = Math.PI / 2;
    chuckRing.position.y = -0.52;
    chuckRing.userData.noEdges = true;
    g.add(chuckRing);

    // 300mm Silicon Wafer tilted slightly forward (+14 deg) for dramatic sculptural readability
    const waferTilt = new THREE.Group();
    waferTilt.rotation.x = 0.24;
    waferTilt.position.y = 0.35;

    const wafer = makeSiliconWaferDisc(10.2, 0.52, u.fabWafer300mmDieMap, mats.siliconBulk);
    waferTilt.add(wafer);

    // Reticle Comparison #1 (Left-Center): Wide-Field Single-Shot Exposure Frame (Canon FPA-6300ESW — Gold)
    const singleShotFrame = makeHiResHorizPlate(
      createFrameShape(4.4, 3.0, 0.16, 3.85, 2.45, 0.08),
      0.28,
      mats.goldPlating,
      0.04,
      1,
      12
    );
    singleShotFrame.position.set(-3.2, 1.35, 0.6);
    waferTilt.add(singleShotFrame);

    // Reticle Comparison #2 (Right-Center): 3-Zone Stitched Exposure Frames with seam bars (Blue)
    for (let s = -1; s <= 1; s++) {
      const stitchZone = makeHiResHorizPlate(
        createFrameShape(1.5, 3.0, 0.08, 1.18, 2.55, 0.05),
        0.26,
        mats.fluorineCoatCyan,
        0.03,
        1,
        10
      );
      stitchZone.position.set(3.4 + s * 1.48, 1.35, 0.6);
      waferTilt.add(stitchZone);
    }

    // 4 Corner vertical optical projection corner posts tying reticle frames to wafer dies
    const postGeo = hiResCyl(0.06, 0.06, 1.0, 8);
    for (const cx of [-5.2, -1.2, 1.3, 5.5]) {
      for (const cz of [-0.7, 1.9]) {
        const post = new THREE.Mesh(postGeo, mats.silverElectrode);
        post.position.set(cx, 0.8, cz);
        post.userData.noEdges = true;
        waferTilt.add(post);
      }
    }

    g.add(waferTilt);

    parts.push(
      finalizeFabPart(
        'fab0-wafer-300mm-stitch',
        2,
        '#6366f1',
        g,
        new THREE.Vector3(-38.5, 19.0, -22.5),
        new THREE.Vector3(-32.0, 34.0, -20.0),
        cp,
        0.2
      )
    );
  }

  // F0-03. 砂から出荷まで「約6か月間（180日）T1〜T5」時間軸＆OHT搬送クリーンルーム基盤
  {
    const g = new THREE.Group();
    const deckW = 108.0;
    const deckD = 54.0;
    const deckZ = -3.2;

    // Main ISO Class-1 Cleanroom Structural Plinth
    const deckGeo = extrudeHiRes(createRoundedRectShape(deckW, deckD, 2.8), 1.45, 0.24, 0.2, 2, 18);
    deckGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(deckGeo, deckW, deckD, 'xz');
    const deckMesh = new THREE.Mesh(deckGeo, u.fabCleanroomProcessDeck);
    deckMesh.position.set(0, 0, deckZ);
    g.add(deckMesh);

    // Dark anodized sub-frame chassis skirt
    const subSkirt = makeHiResHorizPlate(
      createFrameShape(deckW - 1.2, deckD - 1.2, 2.4, deckW - 6.8, deckD - 6.8, 1.8),
      1.1,
      mats.matteBlackAnodized,
      0.12,
      1,
      14
    );
    subSkirt.position.set(0, -1.2, deckZ);
    g.add(subSkirt);

    // 5 Sculpted 6-Month Timeline Milestone Bars (T1..T5) along the front chamfered bezel
    const tColors = [
      mats.stainlessMachined,
      mats.siliconPhotodiode,
      mats.copperHybridBond,
      mats.goldPlating,
      u.batCellWrapGreen,
    ];
    for (let i = 0; i < 5; i++) {
      const segW = 19.2;
      const sx = -40.8 + i * 20.4;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(segW, 0.55, 1.35, 0.2, 0.08, 'y'),
        tColors[i]
      );
      bar.position.set(sx, 0.92, deckZ + deckD * 0.5 - 1.3);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    // 4 Corner Architectural Support Columns descending to the Lower Lithography Loop Sub-Ring
    const colGeo = hiResCyl(1.1, 1.35, 13.0, 14);
    const flangeGeo = hiResCyl(1.85, 1.85, 0.45, 14);
    for (const [cx, cz] of [
      [-49.5, -24.5],
      [49.5, -24.5],
      [-49.5, 18.0],
      [49.5, 18.0],
    ]) {
      const col = new THREE.Mesh(colGeo, mats.stainlessMachined);
      col.position.set(cx, -7.8, cz);
      g.add(col);
      const topFl = new THREE.Mesh(flangeGeo, mats.matteBlackAnodized);
      topFl.position.set(cx, -1.6, cz);
      topFl.userData.noEdges = true;
      const botFl = new THREE.Mesh(flangeGeo, mats.matteBlackAnodized);
      botFl.position.set(cx, -14.1, cz);
      botFl.userData.noEdges = true;
      g.add(topFl, botFl);
    }

    // Lower Cleanroom Sub-Floor Elliptical Monorail Track supporting the 12-Step Litho Carousel (Y = -14.2)
    const ringPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 56; i++) {
      const a = (i / 56) * Math.PI * 2;
      ringPts.push(new THREE.Vector3(Math.cos(a) * 41.0, -13.9, Math.sin(a) * 18.5));
    }
    const trackCurve = new THREE.CatmullRomCurve3(ringPts, true);
    const trackTube = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(trackCurve, 56, 0.62, 8, true)),
      mats.matteBlackAnodized
    );
    g.add(trackTube);

    // Overhead OHT (Overhead Hoist Transport) cleanroom perimeter monorail gantry arch (100% clear of stations!)
    for (const zRail of [-11.5, 16.5]) {
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(56.0, 0.42, 0.55, 0.08, 0.05, 'y'),
        mats.silverElectrode
      );
      rail.position.set(-24.0, 12.2, zRail);
      rail.userData.noEdges = true;
      g.add(rail);

      for (const px of [-51.5, 3.8]) {
        const post = new THREE.Mesh(hiResCyl(0.32, 0.36, 11.8, 10), mats.stainlessMachined);
        post.position.set(px, 6.3, zRail);
        post.userData.noEdges = true;
        g.add(post);
      }

      // Miniature FOUP wafer-carrier pod suspended cleanly along OHT rail
      const foup = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 2.2, 2.6, 0.35, 0.08, 'y'),
        mats.microlensGlass
      );
      foup.position.set(zRail < 0 ? -24.0 : -11.5, 10.7, zRail);
      foup.userData.noEdges = true;
      g.add(foup);
    }

    parts.push(
      finalizeFabPart(
        'fab0-timeline-gantry',
        3,
        '#475569',
        g,
        new THREE.Vector3(0, -2.8, 0),
        new THREE.Vector3(0, -14.0, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // DECK 1 — THE 12 SEQUENTIAL MANUFACTURING PHASES P1 -> P12 (F0-04 – F0-15)
  // =========================================================================

  // F0-04 (P1). 原材料とウェーハ製造（60工程：珪石→11N多結晶→CZ単結晶→300mmエピウェーハ）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(10.2, 9.4, 1.3, mats, mats.stainlessMachined));

    // Left: Raw high-purity quartz rock crystal cluster (SiO2)
    const rockAngles: Array<[number, number, number, number, number]> = [
      [-3.4, 0.9, 1.6, 0.95, 2.1],
      [-2.7, 0.75, 2.3, 0.72, 1.5],
      [-3.8, 0.65, 2.5, 0.65, 1.3],
    ];
    for (const [rx, ry, rz, rad, h] of rockAngles) {
      const crystal = new THREE.Mesh(hiResCyl(rad * 0.22, rad, h, 6), mats.quartzOlpf);
      crystal.position.set(rx, ry, rz);
      crystal.rotation.set(0.18, rx, -0.22);
      g.add(crystal);
    }

    // Center: Spruce Pine high-purity quartz crucible + glowing molten silicon + pulled CZ ingot!
    const crucibleOuter = new THREE.Mesh(hiResCyl(2.45, 2.15, 2.35, 24), mats.ceramicAlumina);
    crucibleOuter.position.set(-0.3, 1.3, -0.4);
    g.add(crucibleOuter);

    const crucibleLiner = new THREE.Mesh(hiResCyl(2.1, 1.85, 2.45, 24), mats.quartzOlpf);
    crucibleLiner.position.set(-0.3, 1.38, -0.4);
    crucibleLiner.userData.noEdges = true;
    g.add(crucibleLiner);

    const meltPool = new THREE.Mesh(hiResCyl(1.92, 1.92, 0.3, 24), mats.copperCoil);
    meltPool.position.set(-0.3, 2.42, -0.4);
    meltPool.userData.noEdges = true;
    g.add(meltPool);

    // Czochralski (CZ) Monocrystalline Silicon Ingot pulled upward (cone crown + cylindrical body + seed shaft)
    const ingotBody = new THREE.Mesh(hiResCyl(1.12, 1.12, 3.2, 24), mats.siliconBulk);
    ingotBody.position.set(-0.3, 4.45, -0.4);
    g.add(ingotBody);
    const ingotCrown = new THREE.Mesh(hiResCyl(0.24, 1.12, 1.1, 24), mats.siliconBulk);
    ingotCrown.position.set(-0.3, 6.6, -0.4);
    g.add(ingotCrown);
    const seedShaft = new THREE.Mesh(hiResCyl(0.16, 0.16, 1.6, 12), mats.stainlessMachined);
    seedShaft.position.set(-0.3, 7.9, -0.4);
    seedShaft.userData.noEdges = true;
    g.add(seedShaft);

    // Right: Finished mirror-polished 300mm CIS Epitaxial Wafer standing vertically in inspection rack
    const epiWafer = makeSiliconWaferDisc(2.5, 0.24, mats.siliconSensorDie, mats.siliconBulk);
    epiWafer.rotation.x = Math.PI / 2 - 0.18;
    epiWafer.position.set(3.0, 2.65, 1.2);
    g.add(epiWafer);

    parts.push(
      finalizeFabPart(
        'fab0-p01-raw-wafer',
        4,
        '#64748b',
        g,
        new THREE.Vector3(-46.0, 1.0, 0.5),
        new THREE.Vector3(-34.0, 10.0, 2.0),
        cp,
        0.22
      )
    );
  }

  // F0-05 (P2). 設計とフォトマスク製作（50工程 / 96枚セット・TCAD/FDTD・E-Beam描画・ペリクル）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(10.0, 8.6, 1.2, mats, mats.makeupSealViolet));

    // Hero 6-inch Quartz Photomask (Reticle) Plate + Pellicle Membrane Frame
    const maskGeo = createChamferedBoxGeo(5.8, 0.42, 5.8, 0.25, 0.06, 'y');
    applyPlanarUVs(maskGeo, 5.8, 5.8, 'xz');
    const maskPlate = new THREE.Mesh(maskGeo, u.fabQuartzReticleMask);
    maskPlate.position.set(-1.3, 1.4, 0.4);
    g.add(maskPlate);

    const pellicleRim = makeHiResHorizPlate(
      createFrameShape(4.6, 4.6, 0.16, 4.0, 4.0, 0.1),
      0.55,
      mats.matteBlackAnodized,
      0.04,
      1,
      12
    );
    pellicleRim.position.set(-1.3, 1.88, 0.4);
    g.add(pellicleRim);

    const pellicleFilm = new THREE.Mesh(
      createChamferedBoxGeo(4.0, 0.06, 4.0, 0.08, 0.01, 'y'),
      mats.coverGlass
    );
    pellicleFilm.position.set(-1.3, 2.18, 0.4);
    pellicleFilm.userData.noEdges = true;
    g.add(pellicleFilm);

    // Electron-Beam (E-Beam) Mask Writer Column hovering over reticle
    const ebColumn = new THREE.Mesh(hiResCyl(0.75, 0.42, 3.6, 20), mats.goldPlating);
    ebColumn.position.set(-1.3, 4.75, 0.4);
    g.add(ebColumn);
    const ebHead = new THREE.Mesh(hiResCyl(1.15, 0.95, 0.9, 20), mats.matteBlackAnodized);
    ebHead.position.set(-1.3, 6.85, 0.4);
    g.add(ebHead);

    // Side Vertical Library Cassette holding stacked Reticle Plates (96-Mask Set!)
    const rackFrame = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 5.2, 4.6, 0.22, 0.07, 'y'),
      mats.stainlessMachined
    );
    rackFrame.position.set(3.1, 2.75, -0.4);
    g.add(rackFrame);

    for (let k = 0; k < 6; k++) {
      const slotMask = new THREE.Mesh(
        createChamferedBoxGeo(3.2, 0.22, 3.8, 0.08, 0.03, 'y'),
        k % 2 === 0 ? mats.quartzOlpf : mats.fluorineCoatCyan
      );
      slotMask.position.set(2.9, 0.85 + k * 0.72, -0.4);
      slotMask.userData.noEdges = true;
      g.add(slotMask);
    }

    parts.push(
      finalizeFabPart(
        'fab0-p02-design-photomask',
        5,
        '#7c3aed',
        g,
        new THREE.Vector3(-31.0, 3.2, -16.0),
        new THREE.Vector3(-20.0, 22.0, -18.0),
        cp,
        0.22
      )
    );
  }

  // F0-06 (P3). 画素ウェーハ前工程 FEOL（380工程 / 25マスク：STI/DTI・多段PPD注入・VTG・4T）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(10.0, 8.8, 1.3, mats, mats.siliconPhotodiode));

    // Wafer Chuck + Pixel Silicon Wafer
    const wafer = makeSiliconWaferDisc(3.8, 0.42, u.fabWafer300mmDieMap, mats.siliconPhotodiode);
    wafer.position.set(-0.6, 0.62, 0.2);
    g.add(wafer);

    // Raised Cutaway Zoom Block showing DTI walls, deep blue PPD wells & Polysilicon VTG gates
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const pdWell = new THREE.Mesh(
          createChamferedBoxGeo(1.15, 1.25, 1.15, 0.12, 0.05, 'y'),
          mats.siliconDepletion
        );
        pdWell.position.set(-0.6 + ix * 1.45, 1.5, 0.2 + iz * 1.45);
        pdWell.userData.noEdges = true;
        g.add(pdWell);

        // Vertical Transfer Gate (VTG) polysilicon pillar inside each pixel
        const vtg = new THREE.Mesh(hiResCyl(0.24, 0.24, 1.65, 12), mats.gatePolysilicon);
        vtg.position.set(-0.6 + ix * 1.45 + 0.32, 1.95, 0.2 + iz * 1.45 + 0.32);
        vtg.userData.noEdges = true;
        g.add(vtg);
      }
    }

    // DTI Isolation Grid Walls between pixel wells
    for (const d of [-0.72, 0.72]) {
      const wallX = new THREE.Mesh(
        createChamferedBoxGeo(4.4, 1.38, 0.18, 0.04, 0.02, 'y'),
        mats.ftiOxide
      );
      wallX.position.set(-0.6, 1.55, 0.2 + d);
      wallX.userData.noEdges = true;
      const wallZ = new THREE.Mesh(
        createChamferedBoxGeo(0.18, 1.38, 4.4, 0.04, 0.02, 'y'),
        mats.ftiOxide
      );
      wallZ.position.set(-0.6 + d, 1.55, 0.2);
      wallZ.userData.noEdges = true;
      g.add(wallX, wallZ);
    }

    // Dual High-Energy Ion Implantation Accelerator Beamline Head angled above wafer
    const implanterArm = new THREE.Mesh(hiResCyl(0.85, 0.55, 3.6, 18), mats.matteBlackAnodized);
    implanterArm.position.set(2.5, 4.35, -1.6);
    implanterArm.rotation.set(0.32, 0, 0.54);
    g.add(implanterArm);

    const ionMagnet = new THREE.Mesh(hiResTorus(0.95, 0.26, 10, 20), mats.copperCoil);
    ionMagnet.position.set(3.2, 5.2, -2.0);
    ionMagnet.rotation.set(0.4, 0.2, 0.5);
    ionMagnet.userData.noEdges = true;
    g.add(ionMagnet);

    parts.push(
      finalizeFabPart(
        'fab0-p03-pixel-feol',
        6,
        '#0284c7',
        g,
        new THREE.Vector3(-31.0, 1.0, -5.2),
        new THREE.Vector3(-20.0, 12.0, -10.0),
        cp,
        0.22
      )
    );
  }

  // F0-07 (P4). 画素ウェーハ配線工程 BEOL（210工程 / 13マスク：Wコンタクト・Cu 5層・CMP接合面）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(10.0, 8.8, 1.3, mats, mats.copperHybridBond));

    const baseWafer = makeSiliconWaferDisc(3.75, 0.4, mats.siliconBulk, mats.siliconBulk);
    baseWafer.position.set(-0.5, 0.55, 0.3);
    g.add(baseWafer);

    // 5-Layer Dual-Damascene Copper Interconnect Stack (M1..M5) inside dielectric frame
    for (let layer = 0; layer < 5; layer++) {
      const ly = 1.05 + layer * 0.62;
      const isHoriz = layer % 2 === 0;
      for (let t = -2; t <= 2; t++) {
        const track = new THREE.Mesh(
          createChamferedBoxGeo(
            isHoriz ? 4.8 : 0.36,
            0.24,
            isHoriz ? 0.36 : 4.8,
            0.05,
            0.03,
            'y'
          ),
          layer === 0 ? mats.tungstenGrid : mats.copperHybridBond
        );
        track.position.set(
          -0.5 + (isHoriz ? 0 : t * 0.92),
          ly,
          0.3 + (isHoriz ? t * 0.92 : 0)
        );
        track.userData.noEdges = true;
        g.add(track);
      }
      // Vertical tungsten/copper via pillars between metal tiers
      if (layer < 4) {
        for (const vx of [-1.8, 0, 1.8]) {
          const via = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.42, 8), mats.copperCoil);
          via.position.set(-0.5 + vx, ly + 0.31, 0.3 + (layer - 1.5) * 0.6);
          via.userData.noEdges = true;
          g.add(via);
        }
      }
    }

    // Top Rotary CMP Polishing Head & Diamond Conditioner Arm achieving <1nm flatness + Cu recess
    const cmpHead = new THREE.Mesh(hiResCyl(2.1, 2.25, 0.95, 24), mats.stainlessMachined);
    cmpHead.position.set(1.6, 4.9, -0.9);
    g.add(cmpHead);
    const cmpPad = new THREE.Mesh(hiResCyl(2.2, 2.2, 0.24, 24), mats.varistorRingBlue);
    cmpPad.position.set(1.6, 4.32, -0.9);
    cmpPad.userData.noEdges = true;
    g.add(cmpPad);
    const cmpSpindle = new THREE.Mesh(hiResCyl(0.42, 0.42, 2.1, 14), mats.matteBlackAnodized);
    cmpSpindle.position.set(1.6, 6.25, -0.9);
    cmpSpindle.userData.noEdges = true;
    g.add(cmpSpindle);

    parts.push(
      finalizeFabPart(
        'fab0-p04-pixel-beol',
        7,
        '#d97706',
        g,
        new THREE.Vector3(-16.5, 1.0, -5.2),
        new THREE.Vector3(-10.0, 12.0, -10.0),
        cp,
        0.22
      )
    );
  }

  // F0-08 (P5). ロジックウェーハ製造（720工程 / 48マスク・同時並行製造：40/28nm FEOL＋Cu 8層・ADC・SLVS-EC）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(13.2, 9.8, 1.4, mats, mats.siliconLogicLayer));

    // Massive Parallel 300mm Logic Wafer with high-density GAA/FinFET + 8-Layer Cu Circuitry
    const logicWafer = makeSiliconWaferDisc(4.4, 0.46, u.v2BionzGaaNanosheet, mats.siliconLogicLayer);
    logicWafer.position.set(-1.3, 0.64, 0.2);
    g.add(logicWafer);

    // Sculpted 40/28nm Column-Parallel / Pixel-Parallel ADC & High-Speed Logic Tower (720 steps!)
    const feolBase = new THREE.Mesh(
      createChamferedBoxGeo(6.0, 0.9, 5.2, 0.25, 0.08, 'y'),
      mats.siliconLogicLayer
    );
    feolBase.position.set(-1.3, 1.4, 0.2);
    g.add(feolBase);

    // 8-Tier High-Density Copper BEOL Mezzanine Ribs (M1..M8)
    for (let m = 0; m < 8; m++) {
      const mPlate = new THREE.Mesh(
        createChamferedBoxGeo(5.4 - m * 0.28, 0.22, 4.6 - m * 0.22, 0.16, 0.03, 'y'),
        m % 2 === 0 ? mats.copperHybridBond : mats.taNBarrierLiner
      );
      mPlate.position.set(-1.3, 2.02 + m * 0.36, 0.2);
      mPlate.userData.noEdges = true;
      g.add(mPlate);
    }

    // Dedicated Column/Pixel ADC & SLVS-EC High-Speed I/O Chiplets crowned on top
    const adcBlock = buildChipPackage({
      w: 2.8,
      d: 2.2,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: mats.icEpoxy,
      leadMat: mats.goldPlating,
      topAccentMat: u.v2PixelAiCircuit,
    });
    adcBlock.position.set(-1.3, 5.25, 0.2);
    g.add(adcBlock);

    // Parallel Fab FOUP Wafer Carrier Pod (representing separate Sony×TSMC Kumamoto logic fab!)
    const foupShell = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 3.8, 3.4, 0.42, 0.12, 'y'),
      mats.stainlessMachined
    );
    foupShell.position.set(4.1, 2.1, -0.5);
    g.add(foupShell);
    const foupWindow = new THREE.Mesh(
      createChamferedBoxGeo(2.3, 2.6, 0.24, 0.2, 0.04, 'y'),
      mats.fluorineCoatCyan
    );
    foupWindow.position.set(4.1, 2.15, 1.25);
    foupWindow.userData.noEdges = true;
    g.add(foupWindow);

    parts.push(
      finalizeFabPart(
        'fab0-p05-logic-wafer',
        8,
        '#2563eb',
        g,
        new THREE.Vector3(-23.5, 1.0, 9.8),
        new THREE.Vector3(-16.0, 12.0, 18.0),
        cp,
        0.22
      )
    );
  }

  // F0-09 (P6). Cu-Cuハイブリッド接合・極限裏面薄化・裏面光学構造（130工程 / 5マスク）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(11.4, 10.6, 1.4, mats, mats.copperHybridBond));

    // Twin Heavy Precision Hybrid-Bonding Hydraulic Frame Pillars
    for (const sx of [-4.6, 4.6]) {
      const col = new THREE.Mesh(hiResCyl(0.56, 0.64, 7.6, 16), mats.stainlessMachined);
      col.position.set(sx, 3.85, 0);
      g.add(col);
    }
    const topBridge = new THREE.Mesh(
      createChamferedBoxGeo(10.6, 0.9, 2.4, 0.35, 0.12, 'y'),
      mats.matteBlackAnodized
    );
    topBridge.position.set(0, 7.6, 0);
    g.add(topBridge);

    // Bottom Wafer: Logic Wafer (Face-Up)
    const botWafer = makeSiliconWaferDisc(3.8, 0.56, u.v2BionzGaaNanosheet, mats.siliconLogicLayer);
    botWafer.position.set(0, 0.8, 0);
    g.add(botWafer);

    // Center Glowing Cu-Cu Direct Hybrid Bond Interface (50M+ copper bond micro-pillars!)
    const cuRingGeo = createChamferedBoxGeo(5.8, 0.36, 5.8, 1.4, 0.05, 'y');
    applyPlanarUVs(cuRingGeo, 5.8, 5.8, 'xz');
    const cuSeam = new THREE.Mesh(cuRingGeo, u.v2PixelHybridBondCu);
    cuSeam.position.set(0, 1.65, 0);
    g.add(cuSeam);

    const cuPinGeo = hiResCyl(0.18, 0.18, 0.72, 10);
    for (let a = 0; a < 12; a++) {
      const ang = (a / 12) * Math.PI * 2;
      const pin = new THREE.Mesh(cuPinGeo, mats.copperHybridBond);
      pin.position.set(Math.cos(ang) * 3.1, 1.65, Math.sin(ang) * 3.1);
      pin.userData.noEdges = true;
      g.add(pin);
    }

    // Top Wafer: Pixel Wafer FLIPPED face-down & Ultra-Thinned from 775um -> 4um!
    // Left half thick (775um pre-grind), right half ultra-thin (4um BSI + HfO2/Al2O3 + W-grid!)
    const thickHalf = new THREE.Mesh(
      hiResCyl(3.8, 3.8, 1.2, 28, false, Math.PI * 0.5, Math.PI),
      mats.siliconBulk
    );
    thickHalf.position.set(0, 2.85, 0);
    g.add(thickHalf);

    const thinBsiHalf = new THREE.Mesh(
      hiResCyl(3.8, 3.8, 0.24, 28, false, -Math.PI * 0.5, Math.PI),
      mats.aluminaHighKFilm
    );
    thinBsiHalf.position.set(0, 2.38, 0);
    g.add(thinBsiHalf);

    // Exposed Tungsten Light-Shield Grid & B-DTI Bars on thinned BSI half
    for (let z = -2.0; z <= 2.0; z += 1.0) {
      const wBar = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 0.16, 0.16, 0.03, 0.02, 'y'),
        mats.tungstenGrid
      );
      wBar.position.set(1.65, 2.6, z);
      wBar.userData.noEdges = true;
      g.add(wBar);
    }

    // Overhead Precision Backside Grinding Wheel + Optical Interference Endpoint Laser Sensor
    const grinderWheel = new THREE.Mesh(hiResCyl(1.75, 1.75, 0.9, 24), mats.goldPlating);
    grinderWheel.position.set(-1.2, 5.15, 0);
    g.add(grinderWheel);
    const grinderShaft = new THREE.Mesh(hiResCyl(0.36, 0.36, 2.0, 14), mats.stainlessMachined);
    grinderShaft.position.set(-1.2, 6.4, 0);
    grinderShaft.userData.noEdges = true;
    g.add(grinderShaft);

    const irLaserHead = new THREE.Mesh(hiResCyl(0.45, 0.3, 1.6, 14), mats.bodyRecRed);
    irLaserHead.position.set(2.0, 5.8, 0);
    g.add(irLaserHead);

    parts.push(
      finalizeFabPart(
        'fab0-p06-cucu-bond-bsi',
        9,
        '#ea580c',
        g,
        new THREE.Vector3(-2.0, 1.6, 1.0),
        new THREE.Vector3(-1.0, 18.0, 2.0),
        cp,
        0.22
      )
    );
  }

  // F0-10 (P7). カラーフィルター・マイクロレンズ形成（95工程 / 5マスク：G/R/B WCM・CRAシフト・2×1 OCL）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.8, 9.0, 1.3, mats, mats.cfaGreen));

    const wafer = makeSiliconWaferDisc(3.65, 0.38, mats.siliconSensorDie, mats.siliconBulk);
    wafer.position.set(0, 0.58, 0.4);
    g.add(wafer);

    // Vivid 4×4 Bayer Color Filter Array (G/R/B PFAS-free WCM) + Gapless Thermal-Reflow Microlenses
    const bayerMats = [mats.cfaRed, mats.cfaGreen, mats.cfaGreen, mats.cfaBlue];
    const lensGeo = hiResSphere(0.52, 10, 7, 0, Math.PI * 2, 0, Math.PI * 0.52);
    const filterTileGeo = new THREE.BoxGeometry(1.12, 0.44, 1.12);
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 4; iz++) {
        const x = (ix - 1.5) * 1.24;
        const z = (iz - 1.5) * 1.24 + 0.4;
        const m = bayerMats[(ix % 2) + (iz % 2) * 2];
        const filterBlock = new THREE.Mesh(filterTileGeo, m);
        filterBlock.position.set(x, 1.12, z);
        filterBlock.userData.noEdges = true;
        g.add(filterBlock);

        // CRA-shifted gapless microlens domes (slightly shifted inward toward optical axis!)
        const craShiftX = -x * 0.06;
        const craShiftZ = -(z - 0.4) * 0.06;
        const ocl = new THREE.Mesh(lensGeo, mats.microlensGlass);
        ocl.scale.set(1.05, 0.72, 1.05);
        ocl.position.set(x + craShiftX, 1.38, z + craShiftZ);
        ocl.userData.noEdges = true;
        g.add(ocl);
      }
    }

    // 3 Color-Resist Dispenser Nozzles (R / G / B) mounted on precision gantry bar above
    const bar = new THREE.Mesh(
      createChamferedBoxGeo(6.8, 0.42, 0.62, 0.12, 0.04, 'y'),
      mats.matteBlackAnodized
    );
    bar.position.set(0, 5.1, -2.2);
    g.add(bar);
    const nozzleSpecs: Array<[number, THREE.Material]> = [
      [-2.1, mats.cfaRed],
      [0, mats.cfaGreen],
      [2.1, mats.cfaBlue],
    ];
    for (const [nx, nMat] of nozzleSpecs) {
      const tank = new THREE.Mesh(hiResCyl(0.46, 0.46, 1.5, 16), nMat);
      tank.position.set(nx, 4.4, -2.2);
      const tip = new THREE.Mesh(hiResCyl(0.18, 0.07, 1.1, 10), mats.stainlessMachined);
      tip.position.set(nx, 3.2, -1.6);
      tip.rotation.x = 0.55;
      tip.userData.noEdges = true;
      g.add(tank, tip);
    }

    parts.push(
      finalizeFabPart(
        'fab0-p07-cfa-microlens',
        10,
        '#16a34a',
        g,
        new THREE.Vector3(11.0, 1.0, 1.0),
        new THREE.Vector3(9.0, 12.0, 2.0),
        cp,
        0.22
      )
    );
  }

  // F0-11 (P8). ウェーハテスト CP光学・電気全数検査（30工程：プローブカード＆EMVA 1288光学測定）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.8, 9.0, 1.3, mats, u.batSocLedGlow));

    // Tested 300mm Wafer textured with authentic EMVA 1288 Yield/Binning Map
    const cpWafer = makeSiliconWaferDisc(3.75, 0.42, u.fabWaferBinningMap, mats.siliconBulk);
    cpWafer.position.set(0, 0.62, 0.2);
    g.add(cpWafer);

    // Circular Multi-Layer Probe Card PCB Ring hovering above wafer with gold tungsten probe needles
    const probePcb = makeHiResHorizPlate(
      createFrameShape(7.2, 7.2, 3.5, 3.2, 3.2, 1.55),
      0.38,
      mats.sensorPcb,
      0.06,
      1,
      28
    );
    probePcb.position.set(0, 2.65, 0.2);
    g.add(probePcb);

    // 16 Converging Gold Tungsten Micro-Probe Needles touching active die pads
    const needleGeo = hiResCyl(0.05, 0.03, 1.9, 8);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const needle = new THREE.Mesh(needleGeo, mats.goldPlating);
      needle.position.set(Math.cos(a) * 1.45, 1.75, 0.2 + Math.sin(a) * 1.45);
      needle.rotation.set(Math.sin(a) * 0.56, 0, -Math.cos(a) * 0.56);
      needle.userData.noEdges = true;
      g.add(needle);
    }

    // EMVA 1288 Uniform Optical Integrating Sphere & Collimator Light Source Dome on top!
    const sphere = new THREE.Mesh(hiResSphere(1.85, 22, 16), mats.stainlessMachined);
    sphere.position.set(0, 5.45, 0.2);
    g.add(sphere);
    const collimator = new THREE.Mesh(hiResCyl(0.95, 1.1, 1.5, 20), mats.matteBlackAnodized);
    collimator.position.set(0, 3.7, 0.2);
    g.add(collimator);
    const lightRing = new THREE.Mesh(hiResTorus(0.96, 0.14, 8, 22), mats.fluorineCoatCyan);
    lightRing.rotation.x = Math.PI / 2;
    lightRing.position.set(0, 2.95, 0.2);
    lightRing.userData.noEdges = true;
    g.add(lightRing);

    parts.push(
      finalizeFabPart(
        'fab0-p08-wafer-cp-test',
        11,
        '#10b981',
        g,
        new THREE.Vector3(23.0, 1.0, 1.0),
        new THREE.Vector3(18.0, 12.0, 2.0),
        cp,
        0.22
      )
    );
  }

  // F0-12 (P9). 後工程 ダイシング・セラミックパッケージ封止（85工程：ステルスダイシング・京セラ筐体・Auワイヤー・ARガラス）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(10.2, 9.0, 1.3, mats, mats.ceramicAlumina));

    // Rear-Left: Stealth Dicing Laser Head slicing a singulated wafer ring
    const dicingRing = makeHiResHorizPlate(
      createFrameShape(4.4, 4.4, 2.15, 3.4, 3.4, 1.65),
      0.24,
      mats.stainlessMachined,
      0.04,
      1,
      20
    );
    dicingRing.position.set(-2.3, 0.5, -1.7);
    g.add(dicingRing);
    const laserHead = new THREE.Mesh(hiResCyl(0.58, 0.22, 2.4, 16), mats.bodyRecRed);
    laserHead.position.set(-2.3, 3.1, -1.7);
    g.add(laserHead);

    // Center-Front Hero: Multilayer HTCC Alumina Ceramic Package Cavity + Singulated Full-Frame CMOS Die
    const cerPkg = makeHiResHorizPlate(
      createFrameShape(6.2, 4.6, 0.35, 4.6, 3.0, 0.14),
      1.15,
      mats.ceramicAlumina,
      0.08,
      2,
      16
    );
    cerPkg.position.set(1.1, 1.25, 1.1);
    g.add(cerPkg);

    const cerFloor = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 0.42, 4.2, 0.22, 0.05, 'y'),
      mats.tungstenCopper
    );
    cerFloor.position.set(1.1, 0.55, 1.1);
    g.add(cerFloor);

    const die = new THREE.Mesh(
      createChamferedBoxGeo(4.0, 0.36, 2.65, 0.1, 0.04, 'y'),
      mats.siliconSensorDie
    );
    die.position.set(1.1, 0.96, 1.1);
    g.add(die);

    // Miniature Gold Wirebond Loops around ceramic shelf
    for (let i = -3; i <= 3; i++) {
      g.add(
        makeWirebondArch(
          new THREE.Vector3(1.1 + i * 0.56, 1.16, 1.1 + 1.25),
          new THREE.Vector3(1.1 + i * 0.56, 1.82, 1.1 + 1.9),
          0.62,
          0.048,
          mats.goldPlating
        )
      );
      g.add(
        makeWirebondArch(
          new THREE.Vector3(1.1 + i * 0.56, 1.16, 1.1 - 1.25),
          new THREE.Vector3(1.1 + i * 0.56, 1.82, 1.1 - 1.9),
          0.62,
          0.048,
          mats.goldPlating
        )
      );
    }

    // Hovering Class-1 Hermetic AR Cover Glass Lid + Kovar Seal Ring descending onto package
    const lidGlass = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.24, 4.0, 0.2, 0.04, 'y'),
      mats.coverGlass
    );
    lidGlass.position.set(1.1, 3.35, 1.1);
    g.add(lidGlass);
    const lidRim = makeHiResHorizPlate(
      createFrameShape(6.0, 4.4, 0.28, 5.2, 3.6, 0.16),
      0.28,
      mats.kovarSeal,
      0.04,
      1,
      14
    );
    lidRim.position.set(1.1, 3.35, 1.1);
    g.add(lidRim);

    parts.push(
      finalizeFabPart(
        'fab0-p09-dicing-package',
        12,
        '#f59e0b',
        g,
        new THREE.Vector3(35.0, 1.0, 1.0),
        new THREE.Vector3(28.0, 12.0, 2.0),
        cp,
        0.22
      )
    );
  }

  // F0-13 (P10). 最終検査 FT・環境信頼性試験・出荷梱包（45工程）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.8, 9.0, 1.3, mats, mats.neodymiumMagnet));

    // Rear: Dark-Chamber Thermal Cycling Final Test (FT) Handler Hood (Hot Red / Cold Blue Fin Bank)
    const ftChamber = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 4.2, 3.6, 0.35, 0.1, 'y'),
      mats.matteBlackAnodized
    );
    ftChamber.position.set(0, 2.3, -1.8);
    g.add(ftChamber);

    for (let f = -4; f <= 4; f++) {
      const fin = new THREE.Mesh(
        createChamferedBoxGeo(0.26, 3.4, 0.65, 0.04, 0.02, 'y'),
        f < 0 ? mats.bodyRecRed : mats.fluorineCoatCyan
      );
      fin.position.set(f * 0.56, 2.4, -3.75);
      fin.userData.noEdges = true;
      g.add(fin);
    }

    // Front: Black ESD-Safe JEDEC Shipping Tray neatly holding 4 Hermetic Sensor Packages
    const tray = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.45, 3.8, 0.25, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    tray.position.set(0, 0.42, 2.1);
    g.add(tray);

    for (let s = 0; s < 4; s++) {
      const sx = -2.55 + s * 1.7;
      const pkg = new THREE.Mesh(
        createChamferedBoxGeo(1.38, 0.34, 1.95, 0.1, 0.03, 'y'),
        mats.ceramicAlumina
      );
      pkg.position.set(sx, 0.8, 2.1);
      pkg.userData.noEdges = true;
      const dieWin = new THREE.Mesh(
        createChamferedBoxGeo(1.02, 0.1, 1.48, 0.05, 0.02, 'y'),
        mats.siliconSensorDie
      );
      dieWin.position.set(sx, 1.0, 2.1);
      dieWin.userData.noEdges = true;
      g.add(pkg, dieWin);
    }

    parts.push(
      finalizeFabPart(
        'fab0-p10-final-test-ft',
        13,
        '#06b6d4',
        g,
        new THREE.Vector3(46.5, 1.0, 1.0),
        new THREE.Vector3(38.0, 12.0, 2.0),
        cp,
        0.22
      )
    );
  }

  // F0-14 (P11). センサーユニット組立（140工程：基板・放熱・OLPF/SSWF・5軸IBIS・あおり調整）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(10.8, 9.4, 1.3, mats, mats.copperHeatSpreader));

    // Upright Sculptural 5-Axis IBIS Sensor-Shift Carriage Assembly!
    const ibisRig = new THREE.Group();
    ibisRig.position.set(0, 3.6, 0);

    // Fixed Magnetic Yoke Frame
    const yoke = makeHiResHorizPlate(
      createFrameShape(7.6, 6.2, 0.55, 4.6, 3.2, 0.3),
      0.55,
      mats.softIronYoke,
      0.08,
      2,
      16
    );
    yoke.rotation.x = Math.PI / 2;
    yoke.position.z = -1.4;
    ibisRig.add(yoke);

    // 3x Si3N4 Ceramic Sliding Balls + Brass Micrometer Tilt Calibration Springs
    for (const [bx, by] of [
      [-2.9, 2.1],
      [2.9, 2.1],
      [0, -2.3],
    ]) {
      const ball = new THREE.Mesh(hiResSphere(0.36, 12, 10), mats.siliconNitrideBall);
      ball.position.set(bx, by, -0.75);
      ball.userData.noEdges = true;
      const screw = new THREE.Mesh(hiResCyl(0.34, 0.34, 1.2, 12), mats.brassGear);
      screw.rotation.x = Math.PI / 2;
      screw.position.set(bx, by, -2.15);
      screw.userData.noEdges = true;
      ibisRig.add(ball, screw);
    }

    // 3x Racetrack Copper VCM Voice Coils (X / Y1 / Y2 Roll)
    const coilPos: Array<[number, number, number]> = [
      [-1.55, -2.15, 0],
      [1.55, -2.15, 0],
      [3.15, 0.25, Math.PI / 2],
    ];
    for (const [cx, cy, rot] of coilPos) {
      const coil = makeHiResHorizPlate(
        createFrameShape(2.1, 0.92, 0.34, 1.25, 0.38, 0.14),
        0.34,
        mats.copperCoil,
        0.04,
        1,
        12
      );
      coil.rotation.x = Math.PI / 2;
      coil.rotation.z = rot;
      coil.position.set(cx, cy, -0.35);
      coil.userData.noEdges = true;
      ibisRig.add(coil);
    }

    // Moving Sensor Carrier PCB + Full-Frame Sensor Die + Graphite Heat Spreader Tail
    const pcb = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 4.6, 0.42, 0.32, 0.06, 'z'),
      mats.sensorPcb
    );
    pcb.position.z = 0.05;
    ibisRig.add(pcb);

    const sensorDie = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 2.8, 0.28, 0.1, 0.04, 'z'),
      mats.siliconSensorDie
    );
    sensorDie.position.z = 0.45;
    ibisRig.add(sensorDie);

    // Front Optical Stack: Quartz OLPF + Ultrasonic SSWF Piezo Bar
    const olpf = new THREE.Mesh(
      createChamferedBoxGeo(4.6, 3.2, 0.26, 0.14, 0.04, 'z'),
      mats.quartzOlpf
    );
    olpf.position.z = 1.15;
    ibisRig.add(olpf);

    const pztBar = new THREE.Mesh(
      createChamferedBoxGeo(0.52, 3.0, 0.34, 0.08, 0.03, 'z'),
      mats.pztCeramic
    );
    pztBar.position.set(-2.55, 0, 1.15);
    pztBar.userData.noEdges = true;
    ibisRig.add(pztBar);

    // Polyimide Flexible Ribbons & Copper Heat Sink Tail curving to back
    const fpcTail = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.4, 0.14, 0.15, 0.02, 'z'),
      mats.polyimideFpc
    );
    fpcTail.position.set(-3.4, -0.2, -0.8);
    fpcTail.rotation.y = 0.42;
    fpcTail.userData.noEdges = true;
    ibisRig.add(fpcTail);

    g.add(ibisRig);

    parts.push(
      finalizeFabPart(
        'fab0-p11-sensor-unit-ibis',
        14,
        '#c2410c',
        g,
        new THREE.Vector3(37.5, 1.0, 14.5),
        new THREE.Vector3(30.0, 12.0, 22.0),
        cp,
        0.22
      )
    );
  }

  // F0-15 (P12). カメラボディ統合・工場校正・最終検査・出荷（165工程）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(11.6, 9.6, 1.35, mats, mats.cinnabarAnodized));

    // Sculptural Flagship Mirrorless Camera Body Miniature (Cutaway-Ready Industrial Masterpiece!)
    const cam = new THREE.Group();
    cam.position.set(-0.8, 3.45, -0.2);

    // Main Magnesium-Alloy Monocoque Body Shell
    const bodyBox = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 5.4, 3.2, 0.55, 0.18, 'z'),
      mats.bodyMgShell
    );
    cam.add(bodyBox);

    // Ergonomic Right-Hand Rubberized Grip + Shutter Dial
    const grip = new THREE.Mesh(hiResCyl(1.45, 1.55, 5.1, 20), mats.bodyLeatherette);
    grip.position.set(3.45, -0.1, 1.15);
    cam.add(grip);

    const shutterBtn = new THREE.Mesh(hiResCyl(0.42, 0.46, 0.45, 16), mats.stainlessMachined);
    shutterBtn.position.set(3.45, 2.65, 1.35);
    shutterBtn.rotation.x = 0.35;
    shutterBtn.userData.noEdges = true;
    cam.add(shutterBtn);

    // Top Pentaprism EVF Hump + MI Hot Shoe + Mode Dial
    const evfHump = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 1.55, 3.5, 0.42, 0.14, 'z'),
      mats.bodyMgShell
    );
    evfHump.position.set(-0.35, 3.25, -0.15);
    cam.add(evfHump);

    const modeDial = new THREE.Mesh(hiResCyl(0.95, 0.95, 0.72, 20), mats.matteBlackAnodized);
    modeDial.position.set(-2.55, 3.0, 0.05);
    cam.add(modeDial);

    // Large-Diameter Stainless Steel Bayonet Mount Flange + Signature Cinnabar Accent Ring
    const mountFlange = makeHiResHorizPlate(
      createFrameShape(4.6, 4.6, 2.28, 3.5, 3.5, 1.72),
      0.48,
      mats.mountStainlessFlange,
      0.06,
      2,
      28
    );
    mountFlange.rotation.x = Math.PI / 2;
    mountFlange.position.set(-0.35, -0.15, 1.85);
    cam.add(mountFlange);

    const cinnabarRing = new THREE.Mesh(hiResTorus(2.26, 0.12, 8, 28), mats.cinnabarAnodized);
    cinnabarRing.position.set(-0.35, -0.15, 1.68);
    cinnabarRing.userData.noEdges = true;
    cam.add(cinnabarRing);

    // Iridescent Full-Frame CMOS Sensor visibly glowing inside the open bayonet throat!
    const mountedSensor = new THREE.Mesh(
      createChamferedBoxGeo(2.85, 1.9, 0.18, 0.06, 0.02, 'z'),
      mats.siliconSensorDie
    );
    mountedSensor.position.set(-0.35, -0.15, 1.58);
    cam.add(mountedSensor);

    // Rear BIONZ XR2 Engine Board Accent Visible on Rear Cutaway
    const rearEngine = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 3.4, 0.25, 0.2, 0.04, 'z'),
      mats.hdiMainboardPcb
    );
    rearEngine.position.set(-0.5, -0.1, -1.68);
    rearEngine.userData.noEdges = true;
    cam.add(rearEngine);

    g.add(cam);

    // Factory Optical Calibration Collimator Target facing the camera mount (PRNU/DSNU/AF/IBIS!)
    const calChart = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 3.2, 0.28, 0.16, 0.05, 'z'),
      mats.stainlessMachined
    );
    calChart.position.set(3.2, 3.2, 3.2);
    calChart.rotation.y = -0.72;
    g.add(calChart);
    const calCrossH = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 0.18, 0.34, 0.02, 0.01, 'z'),
      mats.bodyRecRed
    );
    calCrossH.position.set(3.2, 3.2, 3.2);
    calCrossH.rotation.y = -0.72;
    calCrossH.userData.noEdges = true;
    const calCrossV = new THREE.Mesh(
      createChamferedBoxGeo(0.18, 2.2, 0.34, 0.02, 0.01, 'z'),
      mats.bodyRecRed
    );
    calCrossV.position.set(3.2, 3.2, 3.2);
    calCrossV.rotation.y = -0.72;
    calCrossV.userData.noEdges = true;
    g.add(calCrossH, calCrossV);

    parts.push(
      finalizeFabPart(
        'fab0-p12-camera-integration',
        15,
        '#dc2626',
        g,
        new THREE.Vector3(21.5, 1.4, 15.0),
        new THREE.Vector3(18.0, 14.0, 24.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // DECK 2 — THE 12-STEP LITHOGRAPHY UNIT LOOP L-01 -> L-12 (×96 CYCLES = 1,150 STEPS!)
  // Arranged clockwise in a subterranean cleanroom oval at Y = -13.5, RX = 41.0, RZ = 18.5
  // =========================================================================

  const lithoDefs: Array<{
    id: string;
    order: number;
    angleDeg: number;
    swatch: string;
    build: (g: THREE.Group) => void;
  }> = [
    // L-01: 前洗浄・乾燥 (SCREEN / TEL Spin Clean & Megasonic DI Water)
    {
      id: 'fab0-l01-preclean',
      order: 16,
      angleDeg: 210,
      swatch: '#38bdf8',
      build: (g) => {
        const bowl = new THREE.Mesh(hiResCyl(2.7, 2.35, 1.5, 24), mats.stainlessMachined);
        bowl.position.y = 0.85;
        g.add(bowl);
        const wafer = makeSiliconWaferDisc(2.15, 0.24, mats.fluorineCoatCyan, mats.siliconBulk);
        wafer.position.y = 1.65;
        g.add(wafer);
        const arm = new THREE.Mesh(hiResCyl(0.18, 0.14, 2.6, 10), mats.silverElectrode);
        arm.position.set(-1.3, 2.8, 0);
        arm.rotation.z = -0.92;
        arm.userData.noEdges = true;
        g.add(arm);
        const spray = new THREE.Mesh(hiResCyl(0.1, 0.8, 1.2, 12), mats.vcWorkingFluidCyan);
        spray.position.set(0, 2.35, 0);
        spray.userData.noEdges = true;
        g.add(spray);
      },
    },
    // L-02: 密着促進・反射防止膜塗布 (HMDS Vapor Prime & BARC Coat)
    {
      id: 'fab0-l02-hmds-barc',
      order: 17,
      angleDeg: 180,
      swatch: '#818cf8',
      build: (g) => {
        const wafer = makeSiliconWaferDisc(2.35, 0.28, mats.makeupSealViolet, mats.siliconBulk);
        wafer.position.y = 0.6;
        g.add(wafer);
        const vaporBell = new THREE.Mesh(
          hiResSphere(2.45, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
          mats.coverGlass
        );
        vaporBell.position.y = 0.85;
        g.add(vaporBell);
        const inlet = new THREE.Mesh(hiResCyl(0.32, 0.32, 1.4, 12), mats.goldPlating);
        inlet.position.y = 3.7;
        inlet.userData.noEdges = true;
        g.add(inlet);
      },
    },
    // L-03: フォトレジスト塗布 (Photoresist Spin Coater — TEL / JSR / TOK / Shin-Etsu)
    {
      id: 'fab0-l03-resist-coat',
      order: 18,
      angleDeg: 150,
      swatch: '#f59e0b',
      build: (g) => {
        const chuck = new THREE.Mesh(hiResCyl(1.4, 1.6, 1.1, 20), mats.matteBlackAnodized);
        chuck.position.y = 0.6;
        g.add(chuck);
        const wafer = makeSiliconWaferDisc(2.55, 0.28, mats.polyimideFpc, mats.siliconBulk);
        wafer.position.y = 1.3;
        g.add(wafer);
        // Concentric spin-coat ripple rings
        for (const r of [0.85, 1.55, 2.15]) {
          const ring = new THREE.Mesh(hiResTorus(r, 0.06, 6, 24), mats.goldPlating);
          ring.rotation.x = Math.PI / 2;
          ring.position.y = 1.5;
          ring.userData.noEdges = true;
          g.add(ring);
        }
        const dispenser = new THREE.Mesh(hiResCyl(0.22, 0.08, 1.6, 12), mats.copperCoil);
        dispenser.position.set(0, 3.0, 0);
        g.add(dispenser);
        const drop = new THREE.Mesh(hiResSphere(0.24, 10, 8), mats.cinnabarAnodized);
        drop.position.set(0, 1.95, 0);
        drop.userData.noEdges = true;
        g.add(drop);
      },
    },
    // L-04: プリベーク / ソフトベーク (PAB Hotplate 90–110°C)
    {
      id: 'fab0-l04-softbake-pab',
      order: 19,
      angleDeg: 120,
      swatch: '#ef4444',
      build: (g) => {
        const hotplate = new THREE.Mesh(hiResCyl(2.75, 2.85, 0.85, 24), mats.copperHeatSpreader);
        hotplate.position.y = 0.55;
        g.add(hotplate);
        const heaterRing = new THREE.Mesh(hiResTorus(2.0, 0.14, 8, 24), mats.bodyRecRed);
        heaterRing.rotation.x = Math.PI / 2;
        heaterRing.position.y = 1.02;
        heaterRing.userData.noEdges = true;
        g.add(heaterRing);
        const wafer = makeSiliconWaferDisc(2.35, 0.24, mats.polyimideFpc, mats.siliconBulk);
        wafer.position.y = 1.38;
        g.add(wafer);
        const hood = new THREE.Mesh(hiResCyl(1.4, 2.55, 1.2, 20), mats.stainlessMachined);
        hood.position.y = 3.15;
        g.add(hood);
      },
    },
    // L-05: 精密アライメント＆露光 (HERO UV STEPPER / SCANNER — Canon FPA-6300ESW / FPA-6400ES6a / ASML!)
    {
      id: 'fab0-l05-exposure-align',
      order: 20,
      angleDeg: 90,
      swatch: '#6366f1',
      build: (g) => {
        // Interferometric XY Wafer Stage + Wafer
        const stage = new THREE.Mesh(
          createChamferedBoxGeo(5.8, 0.8, 5.2, 0.35, 0.1, 'y'),
          mats.matteBlackAnodized
        );
        stage.position.y = 0.55;
        g.add(stage);
        const wafer = makeSiliconWaferDisc(2.35, 0.26, u.fabWafer300mmDieMap, mats.siliconBulk);
        wafer.position.y = 1.15;
        g.add(wafer);

        // Glowing UV Exposure Beam Cone (i-line 365nm / KrF 248nm / ArF 193nm)
        const uvBeam = new THREE.Mesh(hiResCyl(1.3, 0.65, 1.85, 20), mats.fluorineCoatCyan);
        uvBeam.position.y = 2.15;
        uvBeam.userData.noEdges = true;
        g.add(uvBeam);

        // Towering Multi-Element Reduction Projection Lens Column (4:1 / 5:1 Zeiss/Canon Optics!)
        const barrelBot = new THREE.Mesh(hiResCyl(1.75, 1.42, 1.75, 24), mats.stainlessMachined);
        barrelBot.position.y = 3.65;
        const barrelMid = new THREE.Mesh(hiResCyl(2.05, 1.75, 1.45, 24), mats.matteBlackAnodized);
        barrelMid.position.y = 5.1;
        const lensRing = new THREE.Mesh(hiResTorus(1.9, 0.16, 8, 24), mats.goldPlating);
        lensRing.rotation.x = Math.PI / 2;
        lensRing.position.y = 4.45;
        lensRing.userData.noEdges = true;
        g.add(barrelBot, barrelMid, lensRing);

        // Upper Reticle Mask Stage holding miniature photomask
        const reticleBox = createChamferedBoxGeo(3.6, 0.28, 3.6, 0.15, 0.04, 'y');
        applyPlanarUVs(reticleBox, 3.6, 3.6, 'xz');
        const reticle = new THREE.Mesh(reticleBox, u.fabQuartzReticleMask);
        reticle.position.y = 6.25;
        g.add(reticle);

        const uvLamp = new THREE.Mesh(hiResCyl(1.15, 1.45, 0.95, 20), mats.makeupSealViolet);
        uvLamp.position.y = 7.1;
        g.add(uvLamp);
      },
    },
    // L-06: 露光後ベーク (PEB ±0.1°C Ultra-Precision Acid Catalysis Bake)
    {
      id: 'fab0-l06-peb',
      order: 21,
      angleDeg: 60,
      swatch: '#f97316',
      build: (g) => {
        const platen = new THREE.Mesh(hiResCyl(2.65, 2.75, 0.9, 24), mats.copperCoil);
        platen.position.y = 0.55;
        g.add(platen);
        for (const r of [0.9, 1.75, 2.35]) {
          const sensorRing = new THREE.Mesh(hiResTorus(r, 0.08, 6, 24), mats.goldPlating);
          sensorRing.rotation.x = Math.PI / 2;
          sensorRing.position.y = 1.05;
          sensorRing.userData.noEdges = true;
          g.add(sensorRing);
        }
        const wafer = makeSiliconWaferDisc(2.3, 0.24, mats.cinnabarAnodized, mats.siliconBulk);
        wafer.position.y = 1.38;
        g.add(wafer);
      },
    },
    // L-07: 現像・リンス・乾燥 (TMAH Alkaline Developer Slit Nozzle)
    {
      id: 'fab0-l07-develop',
      order: 22,
      angleDeg: 30,
      swatch: '#14b8a6',
      build: (g) => {
        const wafer = makeSiliconWaferDisc(2.5, 0.28, mats.siliconSensorDie, mats.siliconBulk);
        wafer.position.y = 0.65;
        g.add(wafer);
        // Sculpted patterned photoresist ridges revealed after development
        for (let r = -2; r <= 2; r++) {
          const ridge = new THREE.Mesh(
            createChamferedBoxGeo(3.4, 0.34, 0.34, 0.05, 0.03, 'y'),
            mats.polyimideFpc
          );
          ridge.position.set(0, 0.98, r * 0.72);
          ridge.userData.noEdges = true;
          g.add(ridge);
        }
        // Wide Slit TMAH Developer Nozzle Bar sweeping above wafer
        const slitBar = new THREE.Mesh(
          createChamferedBoxGeo(4.8, 0.65, 0.72, 0.14, 0.06, 'y'),
          mats.stainlessMachined
        );
        slitBar.position.set(0, 2.55, 0);
        g.add(slitBar);
        const puddle = new THREE.Mesh(
          createChamferedBoxGeo(4.2, 0.8, 0.16, 0.04, 0.02, 'y'),
          mats.vcWorkingFluidCyan
        );
        puddle.position.set(0, 1.85, 0);
        puddle.userData.noEdges = true;
        g.add(puddle);
      },
    },
    // L-08: 現像後計測 ADI (Hitachi CD-SEM & KLA Overlay — LAST REWORK CHECKPOINT!)
    {
      id: 'fab0-l08-adi-metrology',
      order: 23,
      angleDeg: 0,
      swatch: '#eab308',
      build: (g) => {
        const wafer = makeSiliconWaferDisc(2.45, 0.28, u.fabWafer300mmDieMap, mats.siliconBulk);
        wafer.position.y = 0.62;
        g.add(wafer);
        // Tall Electron-Beam CD-SEM Column + Gold Rework Checkpoint Halo Ring!
        const semCol = new THREE.Mesh(hiResCyl(0.88, 0.56, 3.8, 20), mats.matteBlackAnodized);
        semCol.position.set(-0.7, 3.05, 0);
        const semLens = new THREE.Mesh(hiResCyl(1.15, 0.95, 0.65, 20), mats.goldPlating);
        semLens.position.set(-0.7, 1.95, 0);
        g.add(semCol, semLens);

        // Secondary KLA Optical Overlay Microscope Tube beside CD-SEM
        const ovlScope = new THREE.Mesh(hiResCyl(0.46, 0.36, 2.7, 16), mats.stainlessMachined);
        ovlScope.position.set(1.25, 2.45, 0.2);
        ovlScope.rotation.z = 0.22;
        g.add(ovlScope);

        const gateHalo = new THREE.Mesh(hiResTorus(2.65, 0.16, 8, 28), mats.goldPlating);
        gateHalo.rotation.x = Math.PI / 2;
        gateHalo.position.y = 0.95;
        gateHalo.userData.noEdges = true;
        g.add(gateHalo);
      },
    },
    // L-09: 本加工：エッチング ＆ イオン注入 (TEL / Lam / AMAT / Sumitomo Heavy Industries)
    {
      id: 'fab0-l09-etch-implant',
      order: 24,
      angleDeg: -30,
      swatch: '#a855f7',
      build: (g) => {
        const chamber = new THREE.Mesh(hiResCyl(2.65, 2.65, 2.2, 24), mats.matteBlackAnodized);
        chamber.position.y = 1.2;
        g.add(chamber);
        // Glowing Violet ICP Plasma Chamber Window + 3-Turn Copper RF Induction Coil
        const plasmaDome = new THREE.Mesh(hiResCyl(2.2, 2.2, 1.4, 24), mats.makeupSealViolet);
        plasmaDome.position.y = 2.95;
        g.add(plasmaDome);
        for (let k = 0; k < 3; k++) {
          const rfCoil = new THREE.Mesh(hiResTorus(2.38, 0.13, 8, 28), mats.copperCoil);
          rfCoil.rotation.x = Math.PI / 2;
          rfCoil.position.y = 2.48 + k * 0.45;
          rfCoil.userData.noEdges = true;
          g.add(rfCoil);
        }
        // Angled Side Ion-Implant Beam Injector Horn
        const ionHorn = new THREE.Mesh(hiResCyl(0.55, 0.28, 2.2, 14), mats.fluorineCoatCyan);
        ionHorn.position.set(2.3, 3.85, 0);
        ionHorn.rotation.z = 0.82;
        g.add(ionHorn);
      },
    },
    // L-10: レジスト剥離・アッシング (O2 Plasma Ashing — Hitachi High-Tech / TEL / PSK)
    {
      id: 'fab0-l10-ashing-strip',
      order: 25,
      angleDeg: -60,
      swatch: '#ec4899',
      build: (g) => {
        const wafer = makeSiliconWaferDisc(2.4, 0.28, mats.siliconPhotodiode, mats.siliconBulk);
        wafer.position.y = 0.62;
        g.add(wafer);
        const plasmaRing = new THREE.Mesh(hiResTorus(1.85, 0.26, 10, 24), mats.thermalPadPink);
        plasmaRing.rotation.x = Math.PI / 2;
        plasmaRing.position.y = 2.1;
        plasmaRing.userData.noEdges = true;
        g.add(plasmaRing);
        const dome = new THREE.Mesh(hiResCyl(1.75, 2.5, 1.85, 22), mats.stainlessMachined);
        dome.position.y = 3.25;
        g.add(dome);
      },
    },
    // L-11: 加工後ウェット洗浄 (SPM / SC-1 / SC-2 / DHF Multi-Tank Wet Bench — SCREEN / TEL / Ebara)
    {
      id: 'fab0-l11-postclean',
      order: 26,
      angleDeg: -90,
      swatch: '#06b6d4',
      build: (g) => {
        // 4-Bath Chemical Wet Bench (SPM, SC-1, SC-2, DHF)
        const bathMats = [mats.bodyRecRed, mats.fluorineCoatCyan, mats.vcWorkingFluidCyan, mats.goldPlating];
        for (let b = 0; b < 4; b++) {
          const bx = -2.25 + b * 1.5;
          const tank = new THREE.Mesh(
            createChamferedBoxGeo(1.28, 1.85, 3.6, 0.14, 0.05, 'y'),
            mats.stainlessMachined
          );
          tank.position.set(bx, 1.0, 0);
          g.add(tank);
          const liquid = new THREE.Mesh(
            createChamferedBoxGeo(1.06, 0.16, 3.25, 0.08, 0.02, 'y'),
            bathMats[b]
          );
          liquid.position.set(bx, 1.96, 0);
          liquid.userData.noEdges = true;
          g.add(liquid);
        }
        // Quartz Wafer Cassette submerged halfway in SC-1 bath
        for (let w = -1; w <= 1; w++) {
          const miniW = new THREE.Mesh(hiResCyl(0.95, 0.95, 0.09, 18), mats.siliconSensorDie);
          miniW.rotation.z = Math.PI / 2;
          miniW.position.set(-0.75 + w * 0.24, 2.35, 0);
          miniW.userData.noEdges = true;
          g.add(miniW);
        }
      },
    },
    // L-12: 加工後計測・欠陥検査 AEI (KLA / Hitachi High-Tech / Lasertec Optical & E-Beam Scanner)
    {
      id: 'fab0-l12-aei-defect',
      order: 27,
      angleDeg: -120,
      swatch: '#22c55e',
      build: (g) => {
        const wafer = makeSiliconWaferDisc(2.45, 0.28, u.fabWaferBinningMap, mats.siliconBulk);
        wafer.position.y = 0.62;
        g.add(wafer);
        // Dual Oblique Dark-Field Laser Scatterometry Optics + Central Vertical Detector
        const centerDet = new THREE.Mesh(hiResCyl(0.7, 0.55, 2.8, 18), mats.matteBlackAnodized);
        centerDet.position.y = 2.85;
        g.add(centerDet);
        for (const sx of [-1, 1]) {
          const laser = new THREE.Mesh(hiResCyl(0.32, 0.2, 2.2, 14), u.batSocLedGlow);
          laser.position.set(sx * 1.65, 2.3, 0);
          laser.rotation.z = sx * 0.62;
          g.add(laser);
        }
      },
    },
  ];

  for (const l of lithoDefs) {
    const rad = (l.angleDeg * Math.PI) / 180;
    const x = Math.round(Math.cos(rad) * 41.0 * 1000) / 1000;
    const z = Math.round(Math.sin(rad) * 18.5 * 1000) / 1000;
    const g = new THREE.Group();
    g.add(makeStationPlinth(6.6, 5.8, 0.95, mats, mats.matteBlackAnodized));
    l.build(g);

    parts.push(
      finalizeFabPart(
        l.id,
        l.order,
        l.swatch,
        g,
        new THREE.Vector3(x, -13.5, z),
        new THREE.Vector3(x * 0.48, -26.0, z * 0.62),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // DECK 3 — THE 5 SENSOR ARCHITECTURE PROCESS VARIATIONS GALLERY (F0-28 – F0-32)
  // Rear Showcase Row (Z = -24.0, X = -14 -> +34): FSI -> BSI -> Partial -> 2-Stack (2,110) -> 3-Stack/2-Tr!
  // =========================================================================

  // F0-28 (V-01). 非積層・表面照射（FSI）型（約1,500〜1,650工程：EOS R6 Mark III等）
  {
    const g = new THREE.Group();
    g.add(makeSensorVariantShowcaseBase(mats, mats.stainlessMachined));

    // Thick Single Bulk Silicon + Photodiodes at bottom
    const bulkSi = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 2.2, 5.6, 0.22, 0.08, 'y'),
      mats.siliconPhotodiode
    );
    bulkSi.position.y = 1.25;
    g.add(bulkSi);

    // Copper Wiring Layers ON TOP of photodiodes (signature FSI light-tunnel obstruction!)
    for (let layer = 0; layer < 3; layer++) {
      for (const tx of [-2.4, -0.8, 0.8, 2.4]) {
        const wire = new THREE.Mesh(
          createChamferedBoxGeo(0.46, 0.24, 5.0, 0.04, 0.02, 'y'),
          mats.copperHybridBond
        );
        wire.position.set(tx, 2.6 + layer * 0.42, 0);
        wire.userData.noEdges = true;
        g.add(wire);
      }
    }

    // Top CFA + Microlens Dome Array
    const cfa = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 0.36, 5.4, 0.16, 0.04, 'y'),
      mats.cfaGreen
    );
    cfa.position.y = 4.0;
    g.add(cfa);

    const oclGeo = hiResSphere(0.75, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.5);
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const dome = new THREE.Mesh(oclGeo, mats.microlensGlass);
        dome.scale.set(1, 0.6, 1);
        dome.position.set(ix * 1.4, 4.2, iz * 1.55);
        dome.userData.noEdges = true;
        g.add(dome);
      }
    }

    parts.push(
      finalizeFabPart(
        'fab0-var-fsi',
        28,
        '#94a3b8',
        g,
        new THREE.Vector3(-14.0, 1.6, -24.0),
        new THREE.Vector3(-16.0, 18.0, -24.0),
        cp,
        0.22
      )
    );
  }

  // F0-29 (V-02). 非積層・裏面照射（BSI）型（約1,600〜1,700工程：α7 IV / α7R V等）
  {
    const g = new THREE.Group();
    g.add(makeSensorVariantShowcaseBase(mats, mats.siliconPhotodiode));

    // Passive Silicon Support Wafer at bottom (NO logic chip!)
    const supportWafer = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.65, 5.6, 0.22, 0.08, 'y'),
      mats.siliconBulk
    );
    supportWafer.position.y = 0.95;
    g.add(supportWafer);

    // Copper Wiring Moved UNDERNEATH Photodiodes!
    for (let layer = 0; layer < 2; layer++) {
      for (const tx of [-2.5, -0.85, 0.85, 2.5]) {
        const wire = new THREE.Mesh(
          createChamferedBoxGeo(0.42, 0.22, 5.0, 0.04, 0.02, 'y'),
          mats.copperHybridBond
        );
        wire.position.set(tx, 2.0 + layer * 0.4, 0);
        wire.userData.noEdges = true;
        g.add(wire);
      }
    }

    // Unobstructed Thinned BSI Photodiode Slab ON TOP!
    const bsiPd = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.25, 5.6, 0.2, 0.07, 'y'),
      mats.siliconPhotodiode
    );
    bsiPd.position.y = 3.35;
    g.add(bsiPd);

    const cfa = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 0.36, 5.4, 0.16, 0.04, 'y'),
      mats.cfaBlue
    );
    cfa.position.y = 4.22;
    g.add(cfa);

    const oclGeo = hiResSphere(0.75, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.5);
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const dome = new THREE.Mesh(oclGeo, mats.microlensGlass);
        dome.scale.set(1, 0.62, 1);
        dome.position.set(ix * 1.4, 4.42, iz * 1.55);
        dome.userData.noEdges = true;
        g.add(dome);
      }
    }

    parts.push(
      finalizeFabPart(
        'fab0-var-bsi',
        29,
        '#38bdf8',
        g,
        new THREE.Vector3(-2.0, 1.6, -24.0),
        new THREE.Vector3(-4.0, 18.0, -24.0),
        cp,
        0.22
      )
    );
  }

  // F0-30 (V-03). 部分積層（Partially Stacked）型（約1,750〜1,900工程：α7 V / Z6III / S1II）
  {
    const g = new THREE.Group();
    g.add(makeSensorVariantShowcaseBase(mats, mats.fluorineCoatCyan));

    // Base Support Frame
    const baseSub = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.8, 5.6, 0.22, 0.06, 'y'),
      mats.siliconBulk
    );
    baseSub.position.y = 0.5;
    g.add(baseSub);

    // Signature Partially-Stacked Architecture: Twin High-Speed ADC/Logic Edge Strip Chiplets ONLY at Top & Bottom Edges!
    for (const sz of [-1.95, 1.95]) {
      const strip = new THREE.Mesh(
        createChamferedBoxGeo(7.4, 1.15, 1.45, 0.16, 0.06, 'y'),
        mats.siliconLogicLayer
      );
      strip.position.set(0, 1.52, sz);
      g.add(strip);
      const bondLine = new THREE.Mesh(
        createChamferedBoxGeo(7.0, 0.24, 1.1, 0.08, 0.03, 'y'),
        mats.copperHybridBond
      );
      bondLine.position.set(0, 2.25, sz);
      bondLine.userData.noEdges = true;
      g.add(bondLine);
    }

    // Open Center Dielectric Spacer Window showing why Partial Stack saves ~250–350 steps!
    const centerFill = new THREE.Mesh(
      createChamferedBoxGeo(7.0, 1.15, 2.1, 0.12, 0.04, 'y'),
      mats.interlayerDielectric
    );
    centerFill.position.set(0, 1.52, 0);
    centerFill.userData.noEdges = true;
    g.add(centerFill);

    // Full-Size BSI Pixel Wafer + CFA + OCL above
    const bsiPd = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.2, 5.6, 0.2, 0.07, 'y'),
      mats.siliconSensorDie
    );
    bsiPd.position.y = 3.1;
    g.add(bsiPd);

    const oclGeo = hiResSphere(0.75, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.5);
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const dome = new THREE.Mesh(oclGeo, mats.microlensGlass);
        dome.scale.set(1, 0.62, 1);
        dome.position.set(ix * 1.4, 3.74, iz * 1.55);
        dome.userData.noEdges = true;
        g.add(dome);
      }
    }

    parts.push(
      finalizeFabPart(
        'fab0-var-partial-stack',
        30,
        '#0ea5e9',
        g,
        new THREE.Vector3(10.0, 1.6, -24.0),
        new THREE.Vector3(8.0, 18.0, -24.0),
        cp,
        0.22
      )
    );
  }

  // F0-31 (V-04). 2層フル積層 BSI 型【本書基準モデル 2,110工程】（α1 II / α7R VI / α9 III / EOS R1 / R5 Mark II）
  {
    const g = new THREE.Group();
    g.add(makeSensorVariantShowcaseBase(mats, mats.goldPlating));

    // Gold Reference Crown Frame around pedestal
    const refRing = makeHiResHorizPlate(
      createFrameShape(8.9, 7.0, 0.45, 7.9, 6.0, 0.26),
      0.28,
      mats.goldPlating,
      0.04,
      1,
      14
    );
    refRing.position.y = 0.14;
    g.add(refRing);

    // Full-Area 40/28nm Logic Wafer (ADC + DSP + SLVS-EC)
    const logicGeo = createChamferedBoxGeo(7.6, 1.55, 5.6, 0.22, 0.08, 'y');
    applyPlanarUVs(logicGeo, 7.6, 5.6, 'xz');
    const logicLayer = new THREE.Mesh(logicGeo, u.v2PixelAiCircuit);
    logicLayer.position.y = 1.05;
    g.add(logicLayer);

    // Full-Area 50M+ Cu-Cu Direct Hybrid Bond Seam
    const bondGeo = createChamferedBoxGeo(7.4, 0.56, 5.4, 0.18, 0.05, 'y');
    applyPlanarUVs(bondGeo, 7.4, 5.4, 'xz');
    const bondLayer = new THREE.Mesh(bondGeo, u.v2PixelHybridBondCu);
    bondLayer.position.y = 2.15;
    g.add(bondLayer);

    // Full-Area Thinned BSI Pixel Wafer
    const pixelLayer = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.35, 5.6, 0.2, 0.07, 'y'),
      mats.siliconSensorDie
    );
    pixelLayer.position.y = 3.2;
    g.add(pixelLayer);

    // RGB Bayer CFA + Gapless OCL Crown
    const oclGeo = hiResSphere(0.75, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const cfaRow = [mats.cfaRed, mats.cfaGreen, mats.cfaBlue];
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const cf = new THREE.Mesh(
          createChamferedBoxGeo(1.26, 0.28, 1.32, 0.08, 0.03, 'y'),
          cfaRow[(ix + iz + 6) % 3]
        );
        cf.position.set(ix * 1.4, 4.02, iz * 1.55);
        cf.userData.noEdges = true;
        const dome = new THREE.Mesh(oclGeo, mats.microlensGlass);
        dome.scale.set(1, 0.65, 1);
        dome.position.set(ix * 1.4, 4.18, iz * 1.55);
        dome.userData.noEdges = true;
        g.add(cf, dome);
      }
    }

    parts.push(
      finalizeFabPart(
        'fab0-var-full-2stack',
        31,
        '#d97706',
        g,
        new THREE.Vector3(22.0, 1.6, -24.0),
        new THREE.Vector3(20.0, 18.0, -24.0),
        cp,
        0.22
      )
    );
  }

  // F0-32 (V-05). 3層積層（DRAM内蔵）／2層トランジスタ画素積層型（約2,400〜3,100工程）
  {
    const g = new THREE.Group();
    g.add(makeSensorVariantShowcaseBase(mats, mats.makeupSealViolet));

    // Tier 1 (Bottom): High-Bandwidth 3rd-Wafer DRAM Memory Buffer
    const dramTier = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.15, 5.6, 0.22, 0.07, 'y'),
      mats.siliconDramLayer
    );
    dramTier.position.y = 0.72;
    g.add(dramTier);

    // Tier 2: High-Speed Logic & ADC Wafer + TSV vertical interconnect ring
    const logicTier = new THREE.Mesh(
      createChamferedBoxGeo(7.5, 1.15, 5.5, 0.2, 0.07, 'y'),
      mats.siliconLogicLayer
    );
    logicTier.position.y = 2.15;
    g.add(logicTier);

    // Cu-Cu Hybrid Bond Seam
    const bondTier = new THREE.Mesh(
      createChamferedBoxGeo(7.3, 0.42, 5.3, 0.16, 0.04, 'y'),
      mats.copperHybridBond
    );
    bondTier.position.y = 3.0;
    g.add(bondTier);

    // Tier 3: Dedicated Pixel-Transistor Layer (2-Layer Transistor Pixel — Large Amp Tr!)
    const trTier = new THREE.Mesh(
      createChamferedBoxGeo(7.5, 0.92, 5.5, 0.18, 0.06, 'y'),
      mats.siliconTransistorLayer
    );
    trTier.position.y = 3.76;
    g.add(trTier);

    // Tier 4 (Top): Full-Area Dedicated Photodiode-Only Layer + Microlenses
    const pdTier = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.0, 5.6, 0.18, 0.06, 'y'),
      mats.siliconSensorDie
    );
    pdTier.position.y = 4.82;
    g.add(pdTier);

    // 4 Corner Vertical Through-Silicon Vias (TSV) spanning the entire 3-wafer skyscraper!
    for (const sx of [-3.35, 3.35]) {
      for (const sz of [-2.35, 2.35]) {
        const tsv = new THREE.Mesh(hiResCyl(0.24, 0.24, 4.9, 12), mats.goldPlating);
        tsv.position.set(sx, 2.75, sz);
        tsv.userData.noEdges = true;
        g.add(tsv);
      }
    }

    const oclGeo = hiResSphere(0.74, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.5);
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const dome = new THREE.Mesh(oclGeo, mats.microlensGlass);
        dome.scale.set(1, 0.62, 1);
        dome.position.set(ix * 1.4, 5.35, iz * 1.55);
        dome.userData.noEdges = true;
        g.add(dome);
      }
    }

    parts.push(
      finalizeFabPart(
        'fab0-var-3stack-2layertr',
        32,
        '#9333ea',
        g,
        new THREE.Vector3(34.0, 1.6, -24.0),
        new THREE.Vector3(32.0, 18.0, -24.0),
        cp,
        0.22
      )
    );
  }

  return parts;
}
