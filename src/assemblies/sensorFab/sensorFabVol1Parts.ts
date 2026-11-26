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
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

/**
 * Lean CNC-chamfered rectangular block tailored for the 32-station Vol.1 diorama:
 * - Micro-bars / pads / gates (< 2.15mm min side or thin < 0.28mm) use crisp 12-tri BoxGeometry with planar UVs
 * - Major pedestals, optical slabs & wafer stages use 1-bevel / 5-curve-seg beveled extrusions (~5x lighter & faster)
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

function finalizeVol1Part(
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
    fabVolume: 1,
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

/** Machined exhibition pedestal for Vol.1 stations */
function makeStationPlinth(
  w: number,
  d: number,
  h: number,
  mats: MaterialLibrary,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    createChamferedBoxGeo(w, h, d, 0.5, 0.12, 'y'),
    mats.stainlessMachined
  );
  body.position.y = -h * 0.5;
  g.add(body);

  const trim = new THREE.Mesh(
    createChamferedBoxGeo(w * 0.93, 0.18, d * 0.93, 0.38, 0.04, 'y'),
    accentMat
  );
  trim.position.y = 0.09;
  trim.userData.noEdges = true;
  g.add(trim);

  const footGeo = hiResCyl(0.28, 0.34, 0.26, 8);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeo, mats.matteBlackAnodized);
      foot.position.set(sx * (w * 0.4), -h - 0.12, sz * (d * 0.4));
      foot.userData.noEdges = true;
      g.add(foot);
    }
  }
  return g;
}

/** Architectural gallery pedestal for the 7 generation / architecture cutaways */
function makeArchShowcasePedestal(
  mats: MaterialLibrary,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const ped = new THREE.Mesh(
    createChamferedBoxGeo(9.6, 1.15, 7.6, 0.48, 0.13, 'y'),
    mats.matteBlackAnodized
  );
  ped.position.y = -0.58;
  g.add(ped);

  const stripe = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.24, 0.52), accentMat);
  stripe.position.set(0, 0.12, 3.28);
  stripe.userData.noEdges = true;
  g.add(stripe);
  return g;
}

/** 300mm scaled silicon wafer disc with crisp V-notch bevel and yield texture */
function makeWaferDisc(
  radius: number,
  thickness: number,
  topMat: THREE.Material,
  edgeMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(hiResCyl(radius, radius, thickness, 24), edgeMat);
  g.add(base);

  const topGeo = markHiRes(new THREE.CircleGeometry(radius * 0.972, 24));
  topGeo.rotateX(-Math.PI / 2);
  applyPlanarUVs(topGeo, radius * 1.944, radius * 1.944, 'xz');
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

/**
 * Build all 32 museum-grade, ultra-high-definition 3D CAD sculptures for
 * **Vol.1: 超入門 ── 一眼カメラセンサーのしくみと2026年最新アーキテクチャ (`F1-01` – `F1-32`)**.
 *
 * Zero-occlusion 4-Deck Architectural Layout:
 * - **Hero Crown & Deck Base (`F1-01`–`F1-02`)**: Floating Wavelength-Depth Photoelectric Monument (`Z=-23, Y=+21`) + 4-Zone Exhibition Plinth (`Y=-2.8`).
 * - **Deck A (`F1-03`–`F1-09`)**: Light-to-Photo 5 Steps, 4T-PPD + DCG + CDS + Column/Pixel-Parallel 14-bit ADC, and CCD vs CMOS comparison.
 * - **Deck B (`F1-10`–`F1-16`)**: Rear Gallery of ALL 6+1 Commercial 2026 Architectures (`Z=-20`: FSI → BSI → Partially Stacked → 2-Layer Full Stack → 3-Layer DRAM → Global Shutter → 2-Layer Tr Pixel).
 * - **Deck C (`F1-17`–`F1-23`)**: Sony vs Canon AF Duel (Dual Pixel, EOS R1 90°-rotated Cross-Type AF, Sony Mask + 2×1/2×2 OCL) & All 3 Global Shutter Methods (Charge-Domain, Voltage-Domain α9 III, ISSCC 2025 Pixel-Parallel ADC).
 * - **Deck D (`F1-24`–`F1-32`)**: Full-Frame Exposure Wall (`26×33` vs `27×38`, Canon `FPA-6300ESW` & `FPA-5550iX`, Stitching) + Lower Subterranean 300mm Wafer Die-Count & 10-Particle Yield Gallery (`640 → 134 → 48 → 26`) + Stacked Yield Multiplication Trap.
 */
export function buildSensorFabVol1Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // HERO CROWN & 4-ZONE EXHIBITION BASE (F1-01 – F1-02)
  // =========================================================================

  // F1-01. 波長別光電効果プリズム＆36×24mm センサー光学マスター・モニュメント
  {
    const g = new THREE.Group();

    // Machined dark silicon optical cutaway slab (shows shallow Blue, mid Green, deep Red/IR photon absorption!)
    const siBlock = new THREE.Mesh(
      createChamferedBoxGeo(22.0, 4.4, 9.6, 0.55, 0.16, 'y'),
      mats.siliconSensorDie
    );
    siBlock.position.y = 0;
    g.add(siBlock);

    // Sub-surface logic & Cu-Cu base plinth beneath silicon
    const basePlinth = new THREE.Mesh(
      createChamferedBoxGeo(23.6, 1.1, 11.0, 0.65, 0.14, 'y'),
      mats.ceramicAlumina
    );
    basePlinth.position.y = -2.75;
    g.add(basePlinth);

    const cuStripGeo = createChamferedBoxGeo(21.4, 0.45, 9.2, 0.35, 0.06, 'y');
    applyPlanarUVs(cuStripGeo, 21.4, 9.2, 'xz');
    const cuStrip = new THREE.Mesh(cuStripGeo, u.v2PixelHybridBondCu);
    cuStrip.position.y = -2.0;
    g.add(cuStrip);

    // 3 Vivid Wavelength Penetration Cutaway Channels in front face (+Z):
    // Blue 450nm (shallow ~0.4um), Green 530nm (medium ~1.2um), Red 650nm (deep ~3.0um)
    const waveSpecs: Array<{
      x: number;
      depth: number;
      cfaMat: THREE.Material;
      beamMat: THREE.Material;
    }> = [
      { x: -6.2, depth: 1.25, cfaMat: mats.cfaBlue, beamMat: mats.fluorineCoatCyan },
      { x: 0.0, depth: 2.35, cfaMat: mats.cfaGreen, beamMat: u.batCellWrapGreen },
      { x: 6.2, depth: 3.65, cfaMat: mats.cfaRed, beamMat: mats.bodyRecRed },
    ];

    const domeGeo = hiResSphere(1.95, 14, 9, 0, Math.PI * 2, 0, Math.PI * 0.52);
    const eSphereGeo = hiResSphere(0.32, 8, 6);

    for (const w of waveSpecs) {
      // Bayer color filter tile
      const cfa = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.48, 4.6), w.cfaMat);
      cfa.position.set(w.x, 2.46, 0);
      cfa.userData.noEdges = true;
      g.add(cfa);

      // Large sculptural microlens dome
      const dome = new THREE.Mesh(domeGeo, mats.microlensGlass);
      dome.scale.set(1.12, 0.72, 1.12);
      dome.position.set(w.x, 2.72, 0);
      dome.userData.noEdges = true;
      g.add(dome);

      // Incoming camera lens photon ray cone above microlens
      const rayTop = new THREE.Mesh(hiResCyl(0.58, 0.22, 3.0, 12), w.beamMat);
      rayTop.position.set(w.x, 5.1, 0);
      rayTop.userData.noEdges = true;
      g.add(rayTop);

      // Penetration depth shaft carved onto front face of silicon slab
      const penBeam = new THREE.Mesh(new THREE.BoxGeometry(0.72, w.depth, 0.42), w.beamMat);
      penBeam.position.set(w.x, 2.15 - w.depth * 0.5, 4.88);
      penBeam.userData.noEdges = true;
      g.add(penBeam);

      // Generated electron cluster spheres blooming at exact wavelength absorption depth!
      for (let k = -1; k <= 1; k++) {
        const el = new THREE.Mesh(eSphereGeo, mats.goldPlating);
        el.position.set(w.x + k * 0.85, 2.15 - w.depth, 5.05);
        el.userData.noEdges = true;
        g.add(el);
      }
    }

    // Floating circular multi-element camera objective glass ring hovering above the 3 beams
    const lensRing = new THREE.Mesh(hiResTorus(7.6, 0.45, 8, 28), mats.matteBlackAnodized);
    lensRing.rotation.x = Math.PI / 2;
    lensRing.position.set(0, 6.75, 0);
    g.add(lensRing);

    const lensElement = new THREE.Mesh(hiResCyl(7.2, 7.2, 0.34, 24), mats.evfLensAspheric);
    lensElement.position.set(0, 6.75, 0);
    lensElement.userData.noEdges = true;
    g.add(lensElement);

    parts.push(
      finalizeVol1Part(
        'fab1-hero-optics-photonics',
        1,
        '#0ea5e9',
        g,
        new THREE.Vector3(0.0, 21.5, -22.5),
        new THREE.Vector3(0.0, 36.0, -10.0),
        cp,
        0.2
      )
    );
  }

  // F1-02. 第1巻 4章アーキテクチャ展示クリーンルーム基盤＆世代系統樹フレーム
  {
    const g = new THREE.Group();
    const deckW = 112.0;
    const deckD = 54.0;
    const deckZ = -2.2;

    // Main Exhibition Plinth with bespoke 4-Chapter Blueprint Floor
    const deckGeo = extrudeHiRes(createRoundedRectShape(deckW, deckD, 2.8), 1.45, 0.22, 0.18, 1, 12);
    deckGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(deckGeo, deckW, deckD, 'xz');
    const deckMesh = new THREE.Mesh(deckGeo, u.fab1ArchExhibitionDeck);
    deckMesh.position.set(0, 0, deckZ);
    g.add(deckMesh);

    const skirt = makeHiResHorizPlate(
      createFrameShape(deckW - 1.4, deckD - 1.4, 2.4, deckW - 6.8, deckD - 6.8, 1.8),
      1.05,
      mats.matteBlackAnodized,
      0.1,
      1,
      10
    );
    skirt.position.set(0, -1.2, deckZ);
    g.add(skirt);

    // 4 Chapter Color-Coded Front Bezel Milestone Bars (Ch.1 Sky, Ch.2 Royal Blue, Ch.3 Violet, Ch.4 Amber)
    const chMats = [
      mats.fluorineCoatCyan,
      mats.siliconPhotodiode,
      mats.makeupSealViolet,
      mats.goldPlating,
    ];
    for (let i = 0; i < 4; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(23.5, 0.52, 1.2), chMats[i]);
      bar.position.set(-39.0 + i * 26.0, 0.9, deckZ + deckD * 0.5 - 1.25);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    // 4 Corner Structural Columns descending to Subterranean Wafer-Yield Gallery (Y = -14.2)
    const colGeo = hiResCyl(1.1, 1.35, 13.0, 12);
    const flGeo = hiResCyl(1.8, 1.8, 0.42, 12);
    for (const [cx, cz] of [
      [-51.5, -24.5],
      [51.5, -24.5],
      [-51.5, 19.5],
      [51.5, 19.5],
    ]) {
      const col = new THREE.Mesh(colGeo, mats.stainlessMachined);
      col.position.set(cx, -7.8, cz);
      g.add(col);
      const tFl = new THREE.Mesh(flGeo, mats.matteBlackAnodized);
      tFl.position.set(cx, -1.6, cz);
      tFl.userData.noEdges = true;
      const bFl = new THREE.Mesh(flGeo, mats.matteBlackAnodized);
      bFl.position.set(cx, -14.1, cz);
      bFl.userData.noEdges = true;
      g.add(tFl, bFl);
    }

    // Lower Sweeping Semi-Arc Wafer Yield Exhibition Shelf Track (Y = -14.0)
    const arcPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 28; i++) {
      const t = i / 28;
      const a = Math.PI * (0.12 + t * 0.76);
      arcPts.push(new THREE.Vector3(-Math.cos(a) * 45.0, -14.0, Math.sin(a) * 16.5 - 0.5));
    }
    const arcCurve = new THREE.CatmullRomCurve3(arcPts, false);
    const arcRail = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(arcCurve, 32, 0.65, 8, false)),
      mats.matteBlackAnodized
    );
    g.add(arcRail);

    parts.push(
      finalizeVol1Part(
        'fab1-base-exhibition-deck',
        2,
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
  // DECK A — CHAPTER 1: 5 STEPS LIGHT->PHOTO, 4T-PPD, DCG, CDS, ADC & CCD vs CMOS (F1-03 – F1-09)
  // =========================================================================

  // F1-03. ステップ①② フォトダイオード（PD：光のバケツ）＆飽和電子数 FWC 対比（フルサイズ vs スマホ）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(8.8, 8.2, 1.25, mats, mats.fluorineCoatCyan));

    // Left (Hero): Huge Full-Frame PD Rainwater Bucket (3.7-6um pitch -> ~100,000 e- FWC!)
    const ffWall = new THREE.Mesh(hiResCyl(2.25, 2.05, 4.1, 20, true), mats.siliconPhotodiode);
    ffWall.position.set(-1.35, 2.15, 0);
    g.add(ffWall);
    const ffRim = new THREE.Mesh(hiResTorus(2.25, 0.16, 6, 20), mats.ftiOxide);
    ffRim.rotation.x = Math.PI / 2;
    ffRim.position.set(-1.35, 4.2, 0);
    ffRim.userData.noEdges = true;
    g.add(ffRim);
    // Glowing sea of captured photo-electrons filling the deep bucket
    const ffFill = new THREE.Mesh(hiResCyl(1.96, 1.85, 3.1, 18), mats.fluorineCoatCyan);
    ffFill.position.set(-1.35, 1.65, 0);
    ffFill.userData.noEdges = true;
    g.add(ffFill);

    // Floating photon raindrop spheres plunging into bucket
    const pGeo = hiResSphere(0.26, 8, 6);
    for (const [px, py, pz] of [
      [-1.9, 5.1, 0.4],
      [-1.2, 5.7, -0.3],
      [-0.7, 4.9, 0.2],
    ]) {
      const drop = new THREE.Mesh(pGeo, mats.goldPlating);
      drop.position.set(px, py, pz);
      drop.userData.noEdges = true;
      g.add(drop);
    }

    // Right: Tiny Smartphone 0.6-1.2um PD Bucket overflowing easily (white-clipping comparison!)
    const spWall = new THREE.Mesh(hiResCyl(0.82, 0.76, 1.6, 14, true), mats.siliconPhotodiode);
    spWall.position.set(2.45, 0.9, 0.3);
    g.add(spWall);
    const spOverflow = new THREE.Mesh(hiResSphere(0.86, 10, 7), mats.bodyRecRed);
    spOverflow.scale.set(1.15, 0.55, 1.15);
    spOverflow.position.set(2.45, 1.85, 0.3);
    spOverflow.userData.noEdges = true;
    g.add(spOverflow);

    parts.push(
      finalizeVol1Part(
        'fab1-step1-pd-bucket-fwc',
        3,
        '#0ea5e9',
        g,
        new THREE.Vector3(-44.0, 1.0, 12.0),
        new THREE.Vector3(-46.0, 12.0, 22.0),
        cp
      )
    );
  }

  // F1-04. ステップ③ 転送ゲート（TG：バケツ底の水門スイッチ＆ポテンシャル階段）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(8.8, 8.2, 1.25, mats, mats.siliconTransistorLayer));

    // Pinned Photodiode left reservoir + FD right well separated by TG channel
    const pdWell = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 2.8, 4.4, 0.25, 0.08, 'y'),
      mats.siliconPhotodiode
    );
    pdWell.position.set(-2.3, 1.5, 0);
    g.add(pdWell);

    const fdWell = new THREE.Mesh(
      createChamferedBoxGeo(2.0, 1.8, 4.0, 0.22, 0.07, 'y'),
      mats.copperHybridBond
    );
    fdWell.position.set(2.5, 1.0, 0);
    g.add(fdWell);

    // Sculptural Polysilicon Transfer Gate (TG) Sluice Door raised slightly to release electron stream!
    const gateOxide = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.32, 4.6), mats.ftiOxide);
    gateOxide.position.set(0.1, 2.2, 0);
    gateOxide.userData.noEdges = true;
    g.add(gateOxide);

    const polyGate = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 2.3, 4.4, 0.2, 0.07, 'y'),
      mats.gatePolysilicon
    );
    polyGate.position.set(0.1, 3.6, 0);
    g.add(polyGate);

    // Gold TG control electrode tower on top
    const tgPin = new THREE.Mesh(hiResCyl(0.32, 0.32, 1.35, 10), mats.goldPlating);
    tgPin.position.set(0.1, 5.25, 0);
    tgPin.userData.noEdges = true;
    g.add(tgPin);

    // Electron waterfall stream flowing under the open sluice gate (PD -> FD)
    const eGeo = hiResSphere(0.28, 8, 6);
    for (let i = 0; i < 5; i++) {
      const el = new THREE.Mesh(eGeo, mats.fluorineCoatCyan);
      el.position.set(-1.3 + i * 0.72, 1.55 - i * 0.14, (i % 2 === 0 ? 0.5 : -0.5));
      el.userData.noEdges = true;
      g.add(el);
    }

    parts.push(
      finalizeVol1Part(
        'fab1-step3-tg-sluice-gate',
        4,
        '#0284c7',
        g,
        new THREE.Vector3(-33.0, 1.0, 12.0),
        new THREE.Vector3(-34.0, 14.0, 24.0),
        cp
      )
    );
  }

  // F1-05. ステップ④ FD（計量カップ）＆ デュアル・コンバージョン・ゲイン（DCG：デュアルネイティブISO）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(8.8, 8.2, 1.25, mats, mats.goldPlating));

    // Left: Small High-Conversion-Gain (HCG) Precision Measuring Cup (Night / ISO 800 low noise!)
    const smallCup = new THREE.Mesh(hiResCyl(1.15, 1.05, 3.8, 18, true), mats.goldPlating);
    smallCup.position.set(-2.1, 2.0, 0);
    g.add(smallCup);
    const smallVol = new THREE.Mesh(hiResCyl(0.95, 0.9, 3.25, 14), mats.cfaGreen);
    smallVol.position.set(-2.1, 1.75, 0);
    smallVol.userData.noEdges = true;
    g.add(smallVol);

    // Center: DCG Switch Transistor Bridge connecting Small Cup <-> Auxiliary Large Cup
    const dcgGate = new THREE.Mesh(
      createChamferedBoxGeo(1.7, 1.25, 1.8, 0.16, 0.05, 'y'),
      mats.gatePolysilicon
    );
    dcgGate.position.set(0.0, 1.55, 0);
    g.add(dcgGate);
    const dcgLever = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.28, 0.48), mats.copperHybridBond);
    dcgLever.position.set(0.0, 2.45, 0);
    dcgLever.rotation.z = 0.22;
    dcgLever.userData.noEdges = true;
    g.add(dcgLever);

    // Right: Auxiliary Large Low-Conversion-Gain (LCG) Cup (Daylight / high FWC!)
    const bigCup = new THREE.Mesh(hiResCyl(1.85, 1.75, 2.8, 20, true), mats.copperHybridBond);
    bigCup.position.set(2.15, 1.5, 0);
    g.add(bigCup);
    const bigVol = new THREE.Mesh(hiResCyl(1.62, 1.56, 1.15, 16), mats.fluorineCoatCyan);
    bigVol.position.set(2.15, 0.7, 0);
    bigVol.userData.noEdges = true;
    g.add(bigVol);

    // Voltage level indicator rods rising from each cup (steep tall bar on HCG vs wide steady bar on LCG)
    const hcgBar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.4, 0.45), u.batSocLedGlow);
    hcgBar.position.set(-2.1, 4.5, 0);
    hcgBar.userData.noEdges = true;
    const lcgBar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.55, 0.45), mats.fluorineCoatCyan);
    lcgBar.position.set(2.15, 3.25, 0);
    lcgBar.userData.noEdges = true;
    g.add(hcgBar, lcgBar);

    parts.push(
      finalizeVol1Part(
        'fab1-step4-fd-dcg-cups',
        5,
        '#d97706',
        g,
        new THREE.Vector3(-22.0, 1.0, 12.0),
        new THREE.Vector3(-22.0, 16.0, 24.0),
        cp
      )
    );
  }

  // F1-06. ステップ④後半 リセット / 増幅(SF) / 選択 3トランジスタ ＆ CDS（相関二重サンプリング）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(8.8, 8.2, 1.25, mats, mats.makeupSealViolet));

    // Active silicon transistor island
    const siIsland = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 0.9, 3.0, 0.22, 0.06, 'y'),
      mats.siliconTransistorLayer
    );
    siIsland.position.set(0, 0.55, -1.35);
    g.add(siIsland);

    // 3 Sculpted Transistors: RST (Amber), SF Source Follower (Blue-Gold large!), SEL (Green)
    const trSpecs: Array<[number, number, THREE.Material]> = [
      [-2.35, 1.45, mats.cinnabarAnodized],
      [0.0, 2.25, mats.goldPlating],
      [2.35, 1.45, u.batCellWrapGreen],
    ];
    for (const [tx, th, tMat] of trSpecs) {
      const gate = new THREE.Mesh(new THREE.BoxGeometry(1.15, th, 2.2), tMat);
      gate.position.set(tx, 1.0 + th * 0.5, -1.35);
      g.add(gate);
      const via = new THREE.Mesh(hiResCyl(0.18, 0.18, 1.1, 8), mats.copperHybridBond);
      via.position.set(tx, 1.0 + th + 0.5, -1.35);
      via.userData.noEdges = true;
      g.add(via);
    }

    // Front Differential CDS (Correlated Double Sampling) Subtractor: [V_reset] - [V_signal] -> Clean Signal!
    const vRstCap = new THREE.Mesh(hiResCyl(0.95, 0.95, 1.7, 14), mats.bodyRecRed);
    vRstCap.position.set(-2.1, 1.0, 1.9);
    const vSigCap = new THREE.Mesh(hiResCyl(0.95, 0.95, 2.6, 14), mats.fluorineCoatCyan);
    vSigCap.position.set(0.3, 1.45, 1.9);
    const diffAmp = new THREE.Mesh(
      createChamferedBoxGeo(1.9, 1.8, 1.9, 0.2, 0.05, 'y'),
      mats.siliconLogicLayer
    );
    diffAmp.position.set(2.65, 1.05, 1.9);
    g.add(vRstCap, vSigCap, diffAmp);

    // Horizontal bus bar linking CDS inputs into differential comparator
    const bus = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.22, 0.32), mats.goldPlating);
    bus.position.set(0.25, 2.35, 1.9);
    bus.userData.noEdges = true;
    g.add(bus);

    parts.push(
      finalizeVol1Part(
        'fab1-step5-rst-sf-sel-cds',
        6,
        '#7c3aed',
        g,
        new THREE.Vector3(-11.0, 1.0, 12.0),
        new THREE.Vector3(-11.0, 14.0, 24.0),
        cp
      )
    );
  }

  // F1-07. ステップ⑤ 列並列 14-bit カラム ADC アレイ（6,000列同時・16,384段階デジタル翻訳機）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(8.8, 8.2, 1.25, mats, mats.siliconLogicLayer));

    // Silicon Logic Die Base textured with authentic Column ADC die art
    const dieGeo = createChamferedBoxGeo(7.6, 0.72, 6.8, 0.24, 0.06, 'y');
    applyPlanarUVs(dieGeo, 7.6, 6.8, 'xz');
    const die = new THREE.Mesh(dieGeo, u.sensorLogicAdcDie);
    die.position.y = 0.46;
    g.add(die);

    // 8 Parallel Column ADC Blades standing side-by-side (symbolizing 6,000 parallel columns!)
    const bladeGeo = new THREE.BoxGeometry(0.56, 2.6, 5.4);
    const bitGeo = new THREE.BoxGeometry(0.46, 0.22, 0.46);
    for (let c = 0; c < 8; c++) {
      const x = -3.15 + c * 0.9;
      const blade = new THREE.Mesh(
        bladeGeo,
        c % 2 === 0 ? mats.siliconLogicLayer : mats.siliconTransistorLayer
      );
      blade.position.set(x, 2.1, 0);
      blade.userData.noEdges = true;
      g.add(blade);

      // Stepped 14-bit ramp staircase bars along top of each column
      const rampH = 0.45 + ((c * 3 + 2) % 7) * 0.24;
      const bit = new THREE.Mesh(bitGeo, c % 2 === 0 ? mats.fluorineCoatCyan : mats.goldPlating);
      bit.scale.set(1, rampH / 0.22, 1);
      bit.position.set(x, 3.45 + rampH * 0.5, 1.6);
      bit.userData.noEdges = true;
      g.add(bit);
    }

    // Master Ramp-DAC Reference Generator Bridge across the rear of all columns
    const rampBar = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.75, 1.2, 0.14, 0.04, 'y'),
      mats.copperHybridBond
    );
    rampBar.position.set(0, 3.85, -2.15);
    g.add(rampBar);

    parts.push(
      finalizeVol1Part(
        'fab1-column-14bit-adc',
        7,
        '#2563eb',
        g,
        new THREE.Vector3(0.0, 1.0, 12.0),
        new THREE.Vector3(0.0, 12.0, 24.0),
        cp
      )
    );
  }

  // F1-08. 次世代進化：画素並列 14-bit ADC ユニット（画素直下デジタル化への架け橋）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(8.8, 8.2, 1.25, mats, u.batSocLedGlow));

    // Lower 40nm Logic Tier with 4×2 Micro Sub-Threshold 14-bit ADC Tiles directly underneath pixels!
    const logicBaseGeo = createChamferedBoxGeo(7.4, 1.15, 6.4, 0.24, 0.06, 'y');
    applyPlanarUVs(logicBaseGeo, 7.4, 6.4, 'xz');
    const logicBase = new THREE.Mesh(logicBaseGeo, u.v2PixelAiCircuit);
    logicBase.position.y = 0.68;
    g.add(logicBase);

    const adcTileGeo = new THREE.BoxGeometry(1.42, 0.72, 2.2);
    const pillarGeo = hiResCyl(0.14, 0.14, 1.35, 8);
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 2; iz++) {
        const px = -2.4 + ix * 1.6;
        const pz = iz === 0 ? -1.45 : 1.45;
        const tile = new THREE.Mesh(adcTileGeo, mats.siliconDramLayer);
        tile.position.set(px, 1.62, pz);
        tile.userData.noEdges = true;
        g.add(tile);

        // Twin Cu-Cu vertical hybrid bond pillars per pixel into its dedicated ADC below
        const p1 = new THREE.Mesh(pillarGeo, mats.copperHybridBond);
        p1.position.set(px - 0.32, 2.6, pz);
        p1.userData.noEdges = true;
        const p2 = new THREE.Mesh(pillarGeo, mats.goldPlating);
        p2.position.set(px + 0.32, 2.6, pz);
        p2.userData.noEdges = true;
        g.add(p1, p2);
      }
    }

    // Upper 90nm Pixel Wafer Roof suspended directly above the Cu-Cu pillars
    const topPixel = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 0.85, 6.4, 0.22, 0.06, 'y'),
      mats.siliconSensorDie
    );
    topPixel.position.y = 3.68;
    g.add(topPixel);

    // Mini OCL domes across upper pixel tier
    const miniDome = hiResSphere(0.58, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.5);
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 2; iz++) {
        const d = new THREE.Mesh(miniDome, mats.microlensGlass);
        d.position.set(-2.4 + ix * 1.6, 4.12, iz === 0 ? -1.45 : 1.45);
        d.userData.noEdges = true;
        g.add(d);
      }
    }

    parts.push(
      finalizeVol1Part(
        'fab1-pixel-parallel-adc',
        8,
        '#10b981',
        g,
        new THREE.Vector3(11.0, 1.0, 12.0),
        new THREE.Vector3(11.0, 14.0, 24.0),
        cp
      )
    );
  }

  // F1-09. CCD（バケツリレー転送） vs CMOS（画素内増幅＆高速並列）構造比較アリーナ
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 8.4, 1.25, mats, mats.silverElectrode));

    // Left Half: Classic CCD Serial Bucket-Brigade Channel -> Single Corner Output Amplifier (slow, high power)
    const ccdSlab = new THREE.Mesh(
      createChamferedBoxGeo(3.8, 0.85, 6.2, 0.2, 0.05, 'y'),
      mats.ceramicAlumina
    );
    ccdSlab.position.set(-2.35, 0.52, 0);
    g.add(ccdSlab);

    const bucketGeo = hiResCyl(0.42, 0.36, 0.95, 10);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 2; c++) {
        const b = new THREE.Mesh(bucketGeo, mats.cinnabarAnodized);
        b.position.set(-3.1 + c * 1.45, 1.45, -1.8 + r * 1.55);
        b.userData.noEdges = true;
        g.add(b);
      }
    }
    // Single bottleneck CCD output amp tower at front corner
    const ccdAmp = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 1.1), mats.bodyRecRed);
    ccdAmp.position.set(-2.35, 2.05, 2.5);
    g.add(ccdAmp);

    // Center metallic divider wall
    const divider = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.6, 6.8), mats.stainlessMachined);
    divider.position.set(0, 1.4, 0);
    divider.userData.noEdges = true;
    g.add(divider);

    // Right Half: Modern CMOS Parallel Pixel-Amplifier Array + Integrated On-Chip Column ADCs (30-120fps / 8K!)
    const cmosSlab = new THREE.Mesh(
      createChamferedBoxGeo(3.8, 0.85, 6.2, 0.2, 0.05, 'y'),
      mats.siliconLogicLayer
    );
    cmosSlab.position.set(2.35, 0.52, 0);
    g.add(cmosSlab);

    const cellGeo = new THREE.BoxGeometry(1.1, 1.15, 1.1);
    const ampGeo = new THREE.BoxGeometry(0.4, 1.75, 0.4);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 2; c++) {
        const cx = 1.6 + c * 1.45;
        const cz = -1.8 + r * 1.55;
        const cell = new THREE.Mesh(cellGeo, mats.fluorineCoatCyan);
        cell.position.set(cx, 1.52, cz);
        cell.userData.noEdges = true;
        const amp = new THREE.Mesh(ampGeo, mats.goldPlating);
        amp.position.set(cx + 0.45, 1.85, cz);
        amp.userData.noEdges = true;
        g.add(cell, amp);
      }
    }
    // Parallel high-speed output lanes at front edge
    for (let l = 0; l < 4; l++) {
      const lane = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.65, 1.2), u.batCellWrapGreen);
      lane.position.set(1.0 + l * 0.9, 1.3, 2.45);
      lane.userData.noEdges = true;
      g.add(lane);
    }

    parts.push(
      finalizeVol1Part(
        'fab1-ccd-vs-cmos-arena',
        9,
        '#64748b',
        g,
        new THREE.Vector3(-44.0, 1.0, -3.0),
        new THREE.Vector3(-48.0, 12.0, -4.0),
        cp
      )
    );
  }

  // =========================================================================
  // DECK B — CHAPTER 2: 2026 COMMERCIAL 6 MAJOR ARCHITECTURES + 3-LAYER DRAM GALLERY (F1-10 – F1-16)
  // =========================================================================

  const galleryOclGeo = hiResSphere(0.72, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const addGalleryMicrolenses = (
    g: THREE.Group,
    yTop: number,
    cfaMode: 'solid' | 'bayer' = 'solid'
  ) => {
    const bayer = [mats.cfaRed, mats.cfaGreen, mats.cfaGreen, mats.cfaBlue];
    const tileGeo = new THREE.BoxGeometry(1.24, 0.24, 1.32);
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        if (cfaMode === 'bayer') {
          const tile = new THREE.Mesh(tileGeo, bayer[(ix + 2) % 2 + ((iz + 1) % 2) * 2]);
          tile.position.set(ix * 1.36, yTop - 0.14, iz * 1.56);
          tile.userData.noEdges = true;
          g.add(tile);
        }
        const dome = new THREE.Mesh(galleryOclGeo, mats.microlensGlass);
        dome.scale.set(0.95, 0.62, 0.95);
        dome.position.set(ix * 1.36, yTop, iz * 1.56);
        dome.userData.noEdges = true;
        g.add(dome);
      }
    }
  };

  // F1-10. ① 表面照射型 FSI（キヤノン EOS R6 Mark III / 32.5MP 系統：配線が光を遮る平屋構造）
  {
    const g = new THREE.Group();
    g.add(makeArchShowcasePedestal(mats, mats.silverElectrode));

    // Bottom Bulk Silicon + PD Layer (buried BELOW metal interconnect!)
    const pdLayer = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 2.0, 5.6, 0.22, 0.08, 'y'),
      mats.siliconPhotodiode
    );
    pdLayer.position.y = 1.1;
    g.add(pdLayer);

    // Thick Front-Side Copper Wiring Maze ABOVE the Photodiode (blocks oblique rays!)
    const wireGeo = new THREE.BoxGeometry(0.46, 0.26, 5.0);
    for (let ly = 0; ly < 3; ly++) {
      for (const wx of [-2.4, -0.8, 0.8, 2.4]) {
        const w = new THREE.Mesh(wireGeo, mats.copperHybridBond);
        w.position.set(wx + (ly % 2) * 0.25, 2.38 + ly * 0.44, 0);
        w.userData.noEdges = true;
        g.add(w);
      }
    }

    // Top CFA & Microlens sitting high above the wiring maze
    const cfa = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.34, 5.4), mats.cfaGreen);
    cfa.position.y = 3.92;
    cfa.userData.noEdges = true;
    g.add(cfa);
    addGalleryMicrolenses(g, 4.1);

    parts.push(
      finalizeVol1Part(
        'fab1-arch1-fsi-r6m3',
        10,
        '#64748b',
        g,
        new THREE.Vector3(-34.0, 1.0, -20.0),
        new THREE.Vector3(-38.0, 16.0, -24.0),
        cp
      )
    );
  }

  // F1-11. ② 裏面照射型 BSI（ソニー α7 IV / α7R V・ニコン Zf / Z5II：反転＆無遮蔽受光）
  {
    const g = new THREE.Group();
    g.add(makeArchShowcasePedestal(mats, mats.fluorineCoatCyan));

    // Bottom Support Carrier + Rear-Relocated Metal Wiring (out of light's way!)
    const carrier = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.45, 5.6, 0.22, 0.08, 'y'),
      mats.siliconBulk
    );
    carrier.position.y = 0.82;
    g.add(carrier);

    const wireGeo = new THREE.BoxGeometry(0.42, 0.22, 5.0);
    for (let ly = 0; ly < 2; ly++) {
      for (const wx of [-2.45, -0.85, 0.85, 2.45]) {
        const w = new THREE.Mesh(wireGeo, mats.copperHybridBond);
        w.position.set(wx, 1.82 + ly * 0.38, 0);
        w.userData.noEdges = true;
        g.add(w);
      }
    }

    // Top Unobstructed Thinned BSI Photodiode Slab
    const bsiPd = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.3, 5.6, 0.2, 0.07, 'y'),
      mats.siliconPhotodiode
    );
    bsiPd.position.y = 3.12;
    g.add(bsiPd);

    const cfa = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.34, 5.4), mats.fluorineCoatCyan);
    cfa.position.y = 3.96;
    cfa.userData.noEdges = true;
    g.add(cfa);
    addGalleryMicrolenses(g, 4.14);

    parts.push(
      finalizeVol1Part(
        'fab1-arch2-bsi-a7iv',
        11,
        '#0ea5e9',
        g,
        new THREE.Vector3(-22.0, 1.0, -20.0),
        new THREE.Vector3(-24.0, 17.0, -25.0),
        cp
      )
    );
  }

  // F1-12. ③ 部分積層型 Partially Stacked BSI（ニコン Z6III / LUMIX S1II / ソニー α7 V 33MP・16stop DR）
  {
    const g = new THREE.Group();
    g.add(makeArchShowcasePedestal(mats, mats.siliconLogicLayer));

    // Base Support Substrate
    const sub = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.85, 5.6, 0.22, 0.06, 'y'),
      mats.siliconBulk
    );
    sub.position.y = 0.52;
    g.add(sub);

    // AUTHENTIC PARTIALLY STACKED STRUCTURE:
    // Twin High-Speed Logic/ADC Ribbon Chips stacked ONLY along North (-Z) & South (+Z) rims!
    for (const sz of [-1.92, 1.92]) {
      const rimChip = new THREE.Mesh(
        createChamferedBoxGeo(7.4, 1.25, 1.48, 0.16, 0.05, 'y'),
        mats.siliconLogicLayer
      );
      rimChip.position.set(0, 1.6, sz);
      g.add(rimChip);

      const rimBond = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.26, 1.1), mats.copperHybridBond);
      rimBond.position.set(0, 2.38, sz);
      rimBond.userData.noEdges = true;
      g.add(rimBond);
    }

    // Center unstacked dielectric spacer (dramatically lowering wafer cost vs full-area stacking!)
    const midVoid = new THREE.Mesh(new THREE.BoxGeometry(7.0, 1.15, 2.05), mats.interlayerDielectric);
    midVoid.position.set(0, 1.6, 0);
    midVoid.userData.noEdges = true;
    g.add(midVoid);

    // Upper BSI Pixel Wafer with Dual-Gain Simultaneous Readout capability
    const bsiTop = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.25, 5.6, 0.2, 0.07, 'y'),
      mats.siliconSensorDie
    );
    bsiTop.position.y = 3.25;
    g.add(bsiTop);
    addGalleryMicrolenses(g, 4.12, 'bayer');

    parts.push(
      finalizeVol1Part(
        'fab1-arch3-partial-stack-a7v',
        12,
        '#2563eb',
        g,
        new THREE.Vector3(-10.0, 1.0, -20.0),
        new THREE.Vector3(-10.0, 19.0, -26.0),
        cp
      )
    );
  }

  // F1-13. ④ 2層フル積層型 Stacked BSI（α1 II・α7R VI 66.8MP・EOS R1・R5 II・Z9・LI8030SA 4.1億画素）
  {
    const g = new THREE.Group();
    g.add(makeArchShowcasePedestal(mats, mats.goldPlating));

    // Golden Reference Highlight Ring
    const goldFrame = makeHiResHorizPlate(
      createFrameShape(8.7, 6.7, 0.42, 7.8, 5.8, 0.24),
      0.24,
      mats.goldPlating,
      0.03,
      1,
      10
    );
    goldFrame.position.y = 0.14;
    g.add(goldFrame);

    // Full-Area Bottom Logic/ISP/ADC Chip (100% area match under pixel wafer!)
    const logicGeo = createChamferedBoxGeo(7.6, 1.55, 5.6, 0.22, 0.08, 'y');
    applyPlanarUVs(logicGeo, 7.6, 5.6, 'xz');
    const logic = new THREE.Mesh(logicGeo, u.v2PixelAiCircuit);
    logic.position.y = 0.96;
    g.add(logic);

    // Full-Area Cu-Cu Hybrid Bond Interface Plane
    const bondGeo = createChamferedBoxGeo(7.4, 0.56, 5.4, 0.18, 0.05, 'y');
    applyPlanarUVs(bondGeo, 7.4, 5.4, 'xz');
    const bond = new THREE.Mesh(bondGeo, u.sensorCuCuHybrid);
    bond.position.y = 2.06;
    g.add(bond);

    // Full-Area Thinned BSI Pixel Layer + Vivid Bayer CFA & Microlenses
    const bsi = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.32, 5.6, 0.2, 0.07, 'y'),
      mats.siliconSensorDie
    );
    bsi.position.y = 3.04;
    g.add(bsi);
    addGalleryMicrolenses(g, 3.98, 'bayer');

    parts.push(
      finalizeVol1Part(
        'fab1-arch4-full-stack-a7rvi',
        13,
        '#d97706',
        g,
        new THREE.Vector3(2.0, 1.0, -20.0),
        new THREE.Vector3(2.0, 21.0, -27.0),
        cp
      )
    );
  }

  // F1-14. 第4世代A：3層積層 DRAM 内蔵型（画素＋高速 DRAM バッファ＋ロジックの3階建て）
  {
    const g = new THREE.Group();
    g.add(makeArchShowcasePedestal(mats, mats.siliconDramLayer));

    // Floor 1 (Bottom): High-Speed Logic & Column ADC Wafer
    const logic = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.15, 5.6, 0.22, 0.07, 'y'),
      mats.siliconLogicLayer
    );
    logic.position.y = 0.72;
    g.add(logic);

    // Floor 2 (Middle): Dedicated High-Bandwidth DRAM Frame-Buffer Wafer
    const dramGeo = createChamferedBoxGeo(7.5, 1.15, 5.5, 0.2, 0.07, 'y');
    applyPlanarUVs(dramGeo, 7.5, 5.5, 'xz');
    const dram = new THREE.Mesh(dramGeo, u.sensorDramDie);
    dram.position.y = 2.15;
    g.add(dram);

    // Cu-Cu Bond Seam
    const bond = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.36, 5.2), mats.copperHybridBond);
    bond.position.y = 2.94;
    bond.userData.noEdges = true;
    g.add(bond);

    // Floor 3 (Top): BSI Pixel Wafer
    const pixel = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.15, 5.6, 0.2, 0.07, 'y'),
      mats.siliconSensorDie
    );
    pixel.position.y = 3.74;
    g.add(pixel);

    // 4 Corner Through-Silicon Vias (TSV) spanning all 3 wafers
    const tsvGeo = hiResCyl(0.22, 0.22, 4.1, 10);
    for (const sx of [-3.35, 3.35]) {
      for (const sz of [-2.35, 2.35]) {
        const tsv = new THREE.Mesh(tsvGeo, mats.goldPlating);
        tsv.position.set(sx, 2.25, sz);
        tsv.userData.noEdges = true;
        g.add(tsv);
      }
    }
    addGalleryMicrolenses(g, 4.54);

    parts.push(
      finalizeVol1Part(
        'fab1-arch4b-3layer-dram',
        14,
        '#4f46e5',
        g,
        new THREE.Vector3(14.0, 1.0, -20.0),
        new THREE.Vector3(16.0, 19.0, -26.0),
        cp
      )
    );
  }

  // F1-15. ⑤ グローバルシャッター積層型 GS（α9 III IMX810AQL・IMX927 105.51MP 正方・1/80,000s 同調）
  {
    const g = new THREE.Group();
    g.add(makeArchShowcasePedestal(mats, mats.bodyRecRed));

    // Bottom High-Speed Parallel Logic / Readout Wafer
    const logic = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.35, 5.6, 0.22, 0.07, 'y'),
      mats.siliconLogicLayer
    );
    logic.position.y = 0.82;
    g.add(logic);

    // Middle Simultaneous Voltage/Memory Hold Array (In-Pixel Capacitors + Shielded Nodes)
    const memTier = new THREE.Mesh(
      createChamferedBoxGeo(7.5, 0.95, 5.5, 0.18, 0.05, 'y'),
      mats.memoryNodeShield
    );
    memTier.position.y = 2.08;
    g.add(memTier);

    // Cu-Cu Micro-Contacts
    const bond = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.34, 5.2), mats.copperHybridBond);
    bond.position.y = 2.75;
    bond.userData.noEdges = true;
    g.add(bond);

    // Top BSI Pixel Layer + Simultaneous Global Exposure Strobe Frame
    const pdTier = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.1, 5.6, 0.18, 0.06, 'y'),
      mats.siliconSensorDie
    );
    pdTier.position.y = 3.5;
    g.add(pdTier);
    addGalleryMicrolenses(g, 4.24, 'bayer');

    // Hovering Global Simultaneous Exposure Plane Halo (1/80,000s flash sync symbol!)
    const flashFrame = makeHiResHorizPlate(
      createFrameShape(7.8, 5.8, 0.35, 6.9, 4.9, 0.2),
      0.2,
      mats.bodyRecRed,
      0.03,
      1,
      10
    );
    flashFrame.position.y = 5.15;
    g.add(flashFrame);

    parts.push(
      finalizeVol1Part(
        'fab1-arch5-gs-stacked-a9iii',
        15,
        '#dc2626',
        g,
        new THREE.Vector3(26.0, 1.0, -20.0),
        new THREE.Vector3(28.0, 18.0, -25.0),
        cp
      )
    );
  }

  // F1-16. ⑥ 2層トランジスタ画素積層型（ソニー Exmor T / LYTIA：PD層と画素Tr層分離・FWC 2倍）
  {
    const g = new THREE.Group();
    g.add(makeArchShowcasePedestal(mats, mats.makeupSealViolet));

    // Floor 1 (Bottom): Logic/ADC Wafer
    const logic = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.15, 5.6, 0.22, 0.07, 'y'),
      mats.siliconLogicLayer
    );
    logic.position.y = 0.72;
    g.add(logic);

    // Floor 2 (Middle): Dedicated Enlarged Pixel Transistor Layer (SF/RST/SEL separated from PD -> ultra-low RTS noise!)
    const trLayer = new THREE.Mesh(
      createChamferedBoxGeo(7.5, 1.15, 5.5, 0.2, 0.07, 'y'),
      mats.siliconTransistorLayer
    );
    trLayer.position.y = 2.15;
    g.add(trLayer);

    // Vertical BSC (Buried Sublocal Connection) Gold/Copper Pillars bridging Tr <-> PD
    const bscGeo = hiResCyl(0.18, 0.18, 0.9, 8);
    for (let ix = -2; ix <= 2; ix++) {
      const bsc = new THREE.Mesh(bscGeo, mats.goldPlating);
      bsc.position.set(ix * 1.4, 3.05, 0);
      bsc.userData.noEdges = true;
      g.add(bsc);
    }

    // Floor 3 (Top): 100% Full-Area Dedicated Photodiode Wafer (2x FWC Saturation!)
    const pdLayer = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.25, 5.6, 0.2, 0.07, 'y'),
      mats.siliconPhotodiode
    );
    pdLayer.position.y = 4.05;
    g.add(pdLayer);
    addGalleryMicrolenses(g, 4.92, 'bayer');

    parts.push(
      finalizeVol1Part(
        'fab1-arch6-2layer-tr-lytia',
        16,
        '#9333ea',
        g,
        new THREE.Vector3(38.0, 1.0, -20.0),
        new THREE.Vector3(42.0, 17.0, -24.0),
        cp
      )
    );
  }

  // =========================================================================
  // DECK C — CHAPTER 3: SONY vs CANON AF DUEL & 3 GLOBAL SHUTTER ARCHITECTURES (F1-17 – F1-23)
  // =========================================================================

  // F1-17. キヤノン：デュアルピクセル CMOS AF（全画素 左右2分割 PD A像・B像 ＋ 2本転送ゲート）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 8.4, 1.25, mats, mats.bodyRecRed));

    // Silicon substrate housing twin Left (A) & Right (B) Photodiodes under ONE shared microlens!
    const siBase = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.1, 6.2, 0.24, 0.06, 'y'),
      mats.siliconBulk
    );
    siBase.position.y = 0.65;
    g.add(siBase);

    // Left PD-A (Red-Amber tint) and Right PD-B (Cyan-Blue tint) split by ultra-thin DTI septum
    const pdA = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 1.55, 5.2, 0.16, 0.05, 'y'),
      mats.cinnabarAnodized
    );
    pdA.position.set(-1.82, 1.98, 0);
    const pdB = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 1.55, 5.2, 0.16, 0.05, 'y'),
      mats.fluorineCoatCyan
    );
    pdB.position.set(1.82, 1.98, 0);
    const dtiWall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.75, 5.4), mats.ftiOxide);
    dtiWall.position.set(0, 2.02, 0);
    dtiWall.userData.noEdges = true;
    g.add(pdA, pdB, dtiWall);

    // Twin Transfer Gates (TG-A & TG-B) at front rim
    for (const gx of [-1.8, 1.8]) {
      const tg = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.72), mats.gatePolysilicon);
      tg.position.set(gx, 1.45, 2.95);
      tg.userData.noEdges = true;
      g.add(tg);
    }

    // One Giant Shared Microlens Dome focusing Left & Right Exit-Pupil Cones into PD-A & PD-B
    const bigOcl = new THREE.Mesh(
      hiResSphere(3.45, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mats.microlensGlass
    );
    bigOcl.scale.set(1.06, 0.65, 0.85);
    bigOcl.position.set(0, 2.8, 0);
    g.add(bigOcl);

    // Converging A-pupil & B-pupil light rays above dome
    const rayA = new THREE.Mesh(hiResCyl(0.24, 0.14, 2.5, 10), mats.bodyRecRed);
    rayA.position.set(-1.35, 5.25, 0);
    rayA.rotation.z = -0.34;
    rayA.userData.noEdges = true;
    const rayB = new THREE.Mesh(hiResCyl(0.24, 0.14, 2.5, 10), mats.fluorineCoatCyan);
    rayB.position.set(1.35, 5.25, 0);
    rayB.rotation.z = 0.34;
    rayB.userData.noEdges = true;
    g.add(rayA, rayB);

    parts.push(
      finalizeVol1Part(
        'fab1-canon-dpaf-standard',
        17,
        '#dc2626',
        g,
        new THREE.Vector3(-30.0, 1.0, -3.0),
        new THREE.Vector3(-32.0, 15.0, -4.0),
        cp
      )
    );
  }

  // F1-18. キヤノン EOS R1：世界初クロスタイプ像面位相差 AF（90°回転 上下2分割 PD 混在配列）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 8.4, 1.25, mats, mats.goldPlating));

    // Base silicon die
    const siBase = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.95, 6.4, 0.24, 0.06, 'y'),
      mats.siliconSensorDie
    );
    siBase.position.y = 0.58;
    g.add(siBase);

    // 2×2 Mosaic contrasting Horizontal-Split (Left/Right A/B) and 90°-Rotated Vertical-Split (Top/Bottom C/D)!
    const subDomeGeo = hiResSphere(1.45, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const cells: Array<{ x: number; z: number; vertical: boolean }> = [
      { x: -1.85, z: -1.5, vertical: false },
      { x: 1.85, z: -1.5, vertical: true },
      { x: -1.85, z: 1.5, vertical: true },
      { x: 1.85, z: 1.5, vertical: false },
    ];
    for (const c of cells) {
      if (!c.vertical) {
        // Horizontal Left/Right split (captures vertical lines)
        const l = new THREE.Mesh(new THREE.BoxGeometry(1.32, 1.2, 2.35), mats.cinnabarAnodized);
        l.position.set(c.x - 0.74, 1.65, c.z);
        const r = new THREE.Mesh(new THREE.BoxGeometry(1.32, 1.2, 2.35), mats.fluorineCoatCyan);
        r.position.set(c.x + 0.74, 1.65, c.z);
        l.userData.noEdges = true;
        r.userData.noEdges = true;
        g.add(l, r);
      } else {
        // 90°-Rotated Top/Bottom split (captures horizontal lines like bird wings / sports nets!)
        const t = new THREE.Mesh(new THREE.BoxGeometry(2.75, 1.2, 1.08), mats.goldPlating);
        t.position.set(c.x, 1.65, c.z - 0.62);
        const b = new THREE.Mesh(new THREE.BoxGeometry(2.75, 1.2, 1.08), mats.makeupSealViolet);
        b.position.set(c.x, 1.65, c.z + 0.62);
        t.userData.noEdges = true;
        b.userData.noEdges = true;
        g.add(t, b);
      }
      const d = new THREE.Mesh(subDomeGeo, mats.microlensGlass);
      d.scale.set(1.0, 0.6, 0.88);
      d.position.set(c.x, 2.3, c.z);
      d.userData.noEdges = true;
      g.add(d);
    }

    // Crisp Floating Crosshair Emblem (+) hovering above the cross-type AF array
    const chX = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.24, 0.45), mats.goldPlating);
    chX.position.set(0, 4.45, 0);
    const chZ = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.24, 4.6), mats.bodyRecRed);
    chZ.position.set(0, 4.45, 0);
    chX.userData.noEdges = true;
    chZ.userData.noEdges = true;
    g.add(chX, chZ);

    parts.push(
      finalizeVol1Part(
        'fab1-canon-r1-crosstype-af',
        18,
        '#f59e0b',
        g,
        new THREE.Vector3(-17.0, 1.0, -3.0),
        new THREE.Vector3(-18.0, 17.0, -5.0),
        cp
      )
    );
  }

  // F1-19. ソニー：像面位相差 AF（遮光膜型 ＋ 2×1 OCL / 2×2 OCL 共有オンチップレンズ型）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 8.4, 1.25, mats, mats.fluorineCoatCyan));

    const siBase = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.25, 6.4, 0.24, 0.06, 'y'),
      mats.siliconPhotodiode
    );
    siBase.position.y = 0.72;
    g.add(siBase);

    // Left Half: Shielded-Mask PDAF Pixels (half-covered by matte tungsten metal mask!)
    const maskDomeGeo = hiResSphere(1.15, 10, 7, 0, Math.PI * 2, 0, Math.PI * 0.5);
    for (const mz of [-1.45, 1.45]) {
      const mask = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.28, 2.25), mats.tungstenGrid);
      mask.position.set(-2.55, 1.52, mz);
      mask.userData.noEdges = true;
      const openCfa = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.26, 2.25), mats.cfaGreen);
      openCfa.position.set(-1.35, 1.52, mz);
      openCfa.userData.noEdges = true;
      const dome = new THREE.Mesh(maskDomeGeo, mats.microlensGlass);
      dome.scale.set(1.05, 0.65, 1.0);
      dome.position.set(-1.95, 1.72, mz);
      dome.userData.noEdges = true;
      g.add(mask, openCfa, dome);
    }

    // Right Half: Sony 2×1 OCL & 2×2 OCL Shared Elongated Microlens Covering Twin Full-Sensitivity Pixels!
    // Top-right: 2x1 OCL shared lens spanning 2 adjacent pixels
    const ocl2x1 = new THREE.Mesh(
      hiResSphere(1.45, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mats.evfLensAspheric
    );
    ocl2x1.scale.set(1.22, 0.72, 0.78);
    ocl2x1.position.set(1.9, 1.72, -1.55);
    g.add(ocl2x1);

    // Bottom-right: 2x2 OCL giant quad-pixel shared dome (100% light efficiency, zero mask loss!)
    const ocl2x2 = new THREE.Mesh(
      hiResSphere(1.72, 14, 9, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mats.fluorineCoatCyan
    );
    ocl2x2.scale.set(1.05, 0.8, 0.92);
    ocl2x2.position.set(1.9, 1.72, 1.45);
    g.add(ocl2x2);

    // CFA tiles visible underneath the OCL domes
    for (const [cx, cz, m] of [
      [1.2, -1.55, mats.cfaBlue],
      [2.6, -1.55, mats.cfaBlue],
      [1.2, 0.85, mats.cfaGreen],
      [2.6, 0.85, mats.cfaGreen],
      [1.2, 2.05, mats.cfaGreen],
      [2.6, 2.05, mats.cfaGreen],
    ] as Array<[number, number, THREE.Material]>) {
      const t = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.24, 1.05), m);
      t.position.set(cx, 1.5, cz);
      t.userData.noEdges = true;
      g.add(t);
    }

    parts.push(
      finalizeVol1Part(
        'fab1-sony-pdaf-mask-ocl',
        19,
        '#06b6d4',
        g,
        new THREE.Vector3(-4.0, 1.0, -3.0),
        new THREE.Vector3(-4.0, 17.0, -5.0),
        cp
      )
    );
  }

  // F1-20. ローリングシャッター歪み（順次読み出し） vs グローバルシャッター（全画素同時露光）対比
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.8, 8.4, 1.25, mats, mats.bodyRecRed));

    // Left: Rolling Shutter 6 horizontal scanline slices staggered over time -> slanted curved golf club!
    const sliceGeo = new THREE.BoxGeometry(3.5, 0.36, 0.52);
    for (let r = 0; r < 6; r++) {
      const sl = new THREE.Mesh(sliceGeo, r === 2 ? mats.bodyRecRed : mats.matteBlackAnodized);
      sl.position.set(-2.45 + r * 0.28, 0.85 + r * 0.65, -0.3);
      sl.userData.noEdges = true;
      g.add(sl);
    }
    // Bent golf-club / propeller silhouette curving diagonally across rolling scanlines
    const clubCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-3.3, 0.6, 0.45),
      new THREE.Vector3(-2.5, 2.5, 0.45),
      new THREE.Vector3(-0.9, 4.7, 0.45)
    );
    const bentClub = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(clubCurve, 12, 0.16, 8, false)),
      mats.cinnabarAnodized
    );
    g.add(bentClub);

    // Center divider pillar
    const sep = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.4, 5.4), mats.stainlessMachined);
    sep.position.set(0.05, 2.25, 0);
    sep.userData.noEdges = true;
    g.add(sep);

    // Right: Global Shutter Simultaneous Snapshot Plane -> 100% razor-straight vertical rod + 1/80,000s flash bar!
    const gsPlane = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 4.0, 0.45, 0.18, 0.05, 'z'),
      mats.fluorineCoatCyan
    );
    gsPlane.position.set(2.45, 2.45, -0.3);
    g.add(gsPlane);

    const straightRod = new THREE.Mesh(hiResCyl(0.18, 0.18, 4.3, 10), mats.goldPlating);
    straightRod.position.set(2.45, 2.55, 0.45);
    straightRod.userData.noEdges = true;
    g.add(straightRod);

    // Top 1/80,000s full-speed strobe flash tube crown
    const strobe = new THREE.Mesh(hiResCyl(0.35, 0.35, 3.4, 12), u.batSocLedGlow);
    strobe.rotation.z = Math.PI / 2;
    strobe.position.set(2.45, 5.05, 0);
    strobe.userData.noEdges = true;
    g.add(strobe);

    parts.push(
      finalizeVol1Part(
        'fab1-gs-rolling-vs-global',
        20,
        '#ef4444',
        g,
        new THREE.Vector3(10.0, 1.0, -3.0),
        new THREE.Vector3(10.0, 16.0, -4.0),
        cp
      )
    );
  }

  // F1-21. GS方式① 電荷ドメイン型（Charge-Domain GS / Pregius系：遮光メモリノード＆PLS寄生光対策）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(8.8, 8.2, 1.25, mats, mats.tungstenGrid));

    const si = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 1.4, 5.8, 0.22, 0.06, 'y'),
      mats.siliconPhotodiode
    );
    si.position.y = 0.8;
    g.add(si);

    // Left: Open Photodiode window receiving light
    const pdWin = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.35, 4.4), mats.cfaGreen);
    pdWin.position.set(-1.95, 1.68, 0);
    pdWin.userData.noEdges = true;
    const pdLens = new THREE.Mesh(
      hiResSphere(1.5, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mats.microlensGlass
    );
    pdLens.scale.set(0.95, 0.72, 1.25);
    pdLens.position.set(-1.95, 1.9, 0);
    pdLens.userData.noEdges = true;
    g.add(pdWin, pdLens);

    // Right: Thick Tungsten-Shielded Charge Memory Node (MN) blocking stray parasitic light (PLS)!
    const mnWell = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 1.35, 4.4, 0.18, 0.05, 'y'),
      mats.fluorineCoatCyan
    );
    mnWell.position.set(1.9, 2.2, 0);
    g.add(mnWell);

    const wArmor = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 0.72, 5.0, 0.2, 0.06, 'y'),
      mats.tungstenGrid
    );
    wArmor.position.set(1.9, 3.25, 0);
    g.add(wArmor);

    // Transfer bridge between PD and Memory Node
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.65, 2.2), mats.gatePolysilicon);
    bridge.position.set(0.0, 1.82, 0);
    bridge.userData.noEdges = true;
    g.add(bridge);

    parts.push(
      finalizeVol1Part(
        'fab1-gs-charge-domain',
        21,
        '#475569',
        g,
        new THREE.Vector3(23.0, 1.0, 12.0),
        new THREE.Vector3(24.0, 13.0, 22.0),
        cp
      )
    );
  }

  // F1-22. GS方式② 電圧ドメイン型（ソニー α9 III / IMX810AQL 24.6MP・5.9µm：画素内電圧変換＆保持容量）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(8.8, 8.2, 1.25, mats, mats.cinnabarAnodized));

    // Bottom Stacked Logic Readout Wafer
    const logic = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 1.15, 5.8, 0.22, 0.06, 'y'),
      mats.siliconLogicLayer
    );
    logic.position.y = 0.68;
    g.add(logic);

    // Middle Layer: Twin In-Pixel Voltage Sample-and-Hold MIM Capacitors (C_S1 & C_S2) + Pre-Amp
    const cap1 = new THREE.Mesh(hiResCyl(1.15, 1.15, 1.65, 16), mats.goldPlating);
    cap1.position.set(-1.65, 2.1, 0.2);
    const cap2 = new THREE.Mesh(hiResCyl(1.15, 1.15, 1.65, 16), mats.copperHybridBond);
    cap2.position.set(1.65, 2.1, 0.2);
    const preAmp = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.3, 1.8), mats.cinnabarAnodized);
    preAmp.position.set(0, 1.95, -1.6);
    preAmp.userData.noEdges = true;
    g.add(cap1, cap2, preAmp);

    // Top 5.9um Pitch BSI Pixel Roof (3/4 open cutaway so twin capacitors shine inside!)
    const pdRoof = new THREE.Mesh(
      createChamferedBoxGeo(7.2, 0.72, 2.8, 0.18, 0.05, 'y'),
      mats.siliconSensorDie
    );
    pdRoof.position.set(0, 3.45, -1.35);
    g.add(pdRoof);

    const oclGeo = hiResSphere(0.75, 10, 7, 0, Math.PI * 2, 0, Math.PI * 0.5);
    for (let i = -2; i <= 2; i++) {
      const d = new THREE.Mesh(oclGeo, mats.microlensGlass);
      d.position.set(i * 1.32, 3.84, -1.35);
      d.userData.noEdges = true;
      g.add(d);
    }

    parts.push(
      finalizeVol1Part(
        'fab1-gs-voltage-domain-a9iii',
        22,
        '#ea580c',
        g,
        new THREE.Vector3(34.0, 1.0, 12.0),
        new THREE.Vector3(36.0, 15.0, 22.0),
        cp
      )
    );
  }

  // F1-23. GS方式③ 画素並列 ADC 型（ソニー ISSCC 2025：90nm/40nm・5,040万 Cu-Cu・8×1画素直下 4×2 14-bit ADC）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(8.8, 8.2, 1.25, mats, mats.makeupSealViolet));

    // Bottom 40nm Logic Wafer carrying 4×2 Array of Sub-Threshold 14-bit ADCs (1,545mW / 2.66 e-rms / 120fps!)
    const logicGeo = createChamferedBoxGeo(7.6, 1.15, 6.2, 0.22, 0.06, 'y');
    applyPlanarUVs(logicGeo, 7.6, 6.2, 'xz');
    const logic = new THREE.Mesh(logicGeo, u.v2PixelAiCircuit);
    logic.position.y = 0.68;
    g.add(logic);

    // 4×2 ADC Blocks + 16 Dense Cu-Cu Hybrid Bond Pillars (2 contacts per pixel × 8 pixels = 50.4M total!)
    const adcGeo = new THREE.BoxGeometry(1.5, 0.78, 2.25);
    const cuPinGeo = hiResCyl(0.14, 0.14, 1.55, 8);
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 2; iz++) {
        const px = -2.47 + ix * 1.65;
        const pz = iz === 0 ? -1.45 : 1.45;
        const adc = new THREE.Mesh(adcGeo, mats.makeupSealViolet);
        adc.position.set(px, 1.66, pz);
        adc.userData.noEdges = true;
        g.add(adc);

        // Twin Cu-Cu hybrid contacts per pixel
        for (const ox of [-0.34, 0.34]) {
          const pin = new THREE.Mesh(cuPinGeo, ox < 0 ? mats.copperHybridBond : mats.goldPlating);
          pin.position.set(px + ox, 2.82, pz);
          pin.userData.noEdges = true;
          g.add(pin);
        }
      }
    }

    // Upper 90nm Pixel Wafer Strip (8×1 Pixel Cluster at 5.94um pitch) hovering directly above the 50.4M Cu-Cu forest!
    const pxStrip = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.75, 5.8, 0.2, 0.05, 'y'),
      mats.siliconSensorDie
    );
    pxStrip.position.y = 3.98;
    g.add(pxStrip);

    const bayer = [mats.cfaRed, mats.cfaGreen, mats.cfaGreen, mats.cfaBlue];
    const tGeo = new THREE.BoxGeometry(1.48, 0.22, 2.2);
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 2; iz++) {
        const t = new THREE.Mesh(tGeo, bayer[(ix % 2) + iz * 2]);
        t.position.set(-2.47 + ix * 1.65, 4.46, iz === 0 ? -1.45 : 1.45);
        t.userData.noEdges = true;
        g.add(t);
      }
    }

    parts.push(
      finalizeVol1Part(
        'fab1-gs-pixel-adc-isscc2025',
        23,
        '#9333ea',
        g,
        new THREE.Vector3(45.0, 1.0, 12.0),
        new THREE.Vector3(48.0, 17.0, 22.0),
        cp
      )
    );
  }

  // =========================================================================
  // DECK D — CHAPTER 4: FULL-FRAME EXPOSURE WALL & 300mm WAFER YIELD ARITHMETIC (F1-24 – F1-32)
  // =========================================================================

  // F1-24. 壁①：標準露光画角 26×33mm（858mm²） vs フルサイズチップ外形 27×38mm（1,026mm²）はみ出し実寸対比
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(10.0, 8.6, 1.25, mats, mats.bodyRecRed));

    // Scaled 1:5 proportional plates (27x38mm -> 7.6 x 5.4 units; 26x33mm -> 6.6 x 5.2 units!)
    // Bottom: Full-Frame Die Footprint 38×27mm (1,026 mm²) with crimson OVERFLOW wings!
    const ffDie = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.72, 5.4, 0.16, 0.05, 'y'),
      mats.siliconSensorDie
    );
    ffDie.position.y = 0.5;
    g.add(ffDie);

    // Highlight the two left/right overflow strips that EXCEED the standard 33mm scanner field!
    for (const sx of [-3.55, 3.55]) {
      const ov = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.85, 5.46), mats.bodyRecRed);
      ov.position.set(sx, 0.56, 0);
      ov.userData.noEdges = true;
      g.add(ov);
    }

    // Active 36×24mm imaging area outline inside the 38×27mm chip
    const activeArea = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.18, 4.8), mats.fluorineCoatCyan);
    activeArea.position.y = 0.94;
    activeArea.userData.noEdges = true;
    g.add(activeArea);

    // Floating Standard ArF/KrF Scanner Field Frame (33×26mm = 858 mm²) — visibly TOO NARROW!
    const stdFrame = makeHiResHorizPlate(
      createFrameShape(6.6, 5.2, 0.15, 6.0, 4.6, 0.08),
      0.34,
      mats.goldPlating,
      0.04,
      1,
      10
    );
    stdFrame.position.y = 2.65;
    g.add(stdFrame);

    // 4 Translucent Projection Beam Posts dropping from the 26×33mm standard frame onto the die
    const pGeo = hiResCyl(0.08, 0.08, 1.85, 8);
    for (const sx of [-3.15, 3.15]) {
      for (const sz of [-2.45, 2.45]) {
        const p = new THREE.Mesh(pGeo, mats.goldPlating);
        p.position.set(sx, 1.72, sz);
        p.userData.noEdges = true;
        g.add(p);
      }
    }

    parts.push(
      finalizeVol1Part(
        'fab1-wall-field-overflow',
        24,
        '#dc2626',
        g,
        new THREE.Vector3(24.0, 1.0, -3.0),
        new THREE.Vector3(26.0, 14.0, -4.0),
        cp
      )
    );
  }

  // F1-25. 突破法①-A キヤノン FPA-6300ESW（KrF 248nm・1:3.125・33×42.2mm 世界唯一の一括露光スキャナー）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.8, 8.6, 1.25, mats, mats.goldPlating));

    // Full-Size Wafer Stage with Seamless Golden 33×42.2mm Single-Shot Field fully enveloping the 27×38mm die!
    const stage = makeWaferDisc(3.55, 0.36, u.fabWafer300mmDieMap, mats.siliconBulk);
    stage.position.y = 0.45;
    g.add(stage);

    const wideShot = makeHiResHorizPlate(
      createFrameShape(5.2, 3.9, 0.18, 4.5, 3.2, 0.1),
      0.24,
      mats.goldPlating,
      0.03,
      1,
      10
    );
    wideShot.position.y = 0.8;
    g.add(wideShot);

    // Massive Ultra-Wide-Field Canon KrF 248nm Projection Barrel (1:3.125 magnification!)
    const barrelBot = new THREE.Mesh(hiResCyl(1.75, 2.1, 1.4, 20), mats.matteBlackAnodized);
    barrelBot.position.y = 2.65;
    const barrelMid = new THREE.Mesh(hiResCyl(2.25, 1.85, 1.75, 20), mats.stainlessMachined);
    barrelMid.position.y = 4.15;
    const goldRing = new THREE.Mesh(hiResTorus(2.26, 0.16, 6, 22), mats.goldPlating);
    goldRing.rotation.x = Math.PI / 2;
    goldRing.position.y = 4.55;
    goldRing.userData.noEdges = true;
    g.add(barrelBot, barrelMid, goldRing);

    // 248nm UV KrF Projection Cone enveloping the entire single-shot frame with ZERO seams!
    const uvCone = new THREE.Mesh(hiResCyl(1.2, 2.35, 1.3, 18), mats.makeupSealViolet);
    uvCone.position.y = 1.45;
    uvCone.userData.noEdges = true;
    g.add(uvCone);

    // Top Large Reticle Stage with Chrome-on-Quartz Mask
    const maskGeo = createChamferedBoxGeo(4.4, 0.32, 3.6, 0.15, 0.04, 'y');
    applyPlanarUVs(maskGeo, 4.4, 3.6, 'xz');
    const mask = new THREE.Mesh(maskGeo, u.fabQuartzReticleMask);
    mask.position.y = 5.3;
    g.add(mask);

    parts.push(
      finalizeVol1Part(
        'fab1-canon-fpa6300esw',
        25,
        '#d97706',
        g,
        new THREE.Vector3(36.0, 1.0, -3.0),
        new THREE.Vector3(40.0, 16.0, -5.0),
        cp
      )
    );
  }

  // F1-26. 突破法①-B キヤノン FPA-5550iX（i線 365nm・50×50mm 超広画角ステッパー＆BSI 赤外線アライメント）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 8.6, 1.25, mats, mats.fluorineCoatCyan));

    // Giant 50×50mm Square Single-Shot Exposure Field on Wafer Chuck
    const chuck = new THREE.Mesh(hiResCyl(3.55, 3.7, 0.55, 22), mats.matteBlackAnodized);
    chuck.position.y = 0.45;
    g.add(chuck);

    const sq50 = makeHiResHorizPlate(
      createFrameShape(5.4, 5.4, 0.2, 4.7, 4.7, 0.1),
      0.26,
      mats.fluorineCoatCyan,
      0.03,
      1,
      10
    );
    sq50.position.y = 0.92;
    g.add(sq50);

    // i-Line 365nm Large Telecentric Lens Column
    const col = new THREE.Mesh(hiResCyl(1.95, 2.2, 2.75, 20), mats.stainlessMachined);
    col.position.y = 3.4;
    const cap = new THREE.Mesh(hiResCyl(2.25, 2.25, 0.65, 20), mats.matteBlackAnodized);
    cap.position.y = 5.05;
    const iLineBeam = new THREE.Mesh(hiResCyl(1.45, 2.55, 1.35, 18), mats.fluorineCoatCyan);
    iLineBeam.position.y = 1.55;
    iLineBeam.userData.noEdges = true;
    g.add(col, cap, iLineBeam);

    // Twin Silicon-Penetrating IR Backside Alignment Sensors (for BSI wafer-to-wafer marks!)
    for (const sx of [-2.85, 2.85]) {
      const irPod = new THREE.Mesh(hiResCyl(0.42, 0.42, 1.35, 10), mats.irLedLens);
      irPod.position.set(sx, 2.55, 1.55);
      irPod.rotation.z = sx < 0 ? -0.32 : 0.32;
      irPod.userData.noEdges = true;
      g.add(irPod);
    }

    parts.push(
      finalizeVol1Part(
        'fab1-canon-fpa5550ix',
        26,
        '#0284c7',
        g,
        new THREE.Vector3(47.0, 1.0, -3.0),
        new THREE.Vector3(52.0, 16.0, -5.0),
        cp
      )
    );
  }

  // F1-27. 突破法② スティッチング露光（2〜3回分割つなぎ露光・Tower Semiconductor 中判44×33mm対応）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.8, 8.4, 1.25, mats, mats.makeupSealViolet));

    // Medium-Format / Full-Frame Giant Substrate receiving 3 Stitched Reticle Shots (Left + Center + Right)
    const bigDie = new THREE.Mesh(
      createChamferedBoxGeo(7.8, 0.72, 5.4, 0.18, 0.05, 'y'),
      mats.siliconSensorDie
    );
    bigDie.position.y = 0.5;
    g.add(bigDie);

    // 3 Separate Stitched Sub-Fields hovering at slightly staggered altitudes to show sequential exposure!
    const shotMats = [mats.fluorineCoatCyan, mats.goldPlating, mats.makeupSealViolet];
    for (let s = -1; s <= 1; s++) {
      const frame = makeHiResHorizPlate(
        createFrameShape(2.45, 4.9, 0.12, 2.05, 4.45, 0.06),
        0.26,
        shotMats[s + 1],
        0.03,
        1,
        8
      );
      frame.position.set(s * 2.42, 2.15 + Math.abs(s) * 0.45, 0);
      g.add(frame);
    }

    // Twin Critical Nanometer Stitch-Seam Laser Alignment Lines (banding risk monitor!)
    for (const sx of [-1.21, 1.21]) {
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.9, 5.2), mats.bodyRecRed);
      seam.position.set(sx, 1.55, 0);
      seam.userData.noEdges = true;
      g.add(seam);
    }

    parts.push(
      finalizeVol1Part(
        'fab1-stitching-exposure',
        27,
        '#7c3aed',
        g,
        new THREE.Vector3(-35.0, -13.5, 8.0),
        new THREE.Vector3(-42.0, -24.0, 16.0),
        cp
      )
    );
  }

  // Helper for the 4 Sensor-Size 300mm Wafer Yield Pedestals (F1-28 – F1-31)
  const buildWaferYieldStation = (
    id: string,
    order: number,
    swatch: string,
    pos: THREE.Vector3,
    explode: THREE.Vector3,
    waferMat: THREE.Material,
    accentMat: THREE.Material,
    yieldFraction: number,
    sampleDieW: number,
    sampleDieD: number
  ) => {
    const g = new THREE.Group();
    g.add(makeStationPlinth(10.8, 9.8, 1.15, mats, accentMat));

    // Tilted 300mm Silicon Wafer Disc showing exact die count & 10 dust particle hits!
    const tilt = new THREE.Group();
    tilt.rotation.x = 0.34;
    tilt.position.set(-0.5, 2.55, -0.4);
    tilt.add(makeWaferDisc(4.2, 0.34, waferMat, mats.siliconBulk));
    g.add(tilt);

    // Real-scale extracted single chip comparison plaque standing at front-right corner
    const diePlaque = new THREE.Mesh(
      createChamferedBoxGeo(sampleDieW, 0.48, sampleDieD, 0.1, 0.04, 'y'),
      accentMat
    );
    diePlaque.position.set(3.4, 0.42, 3.15);
    g.add(diePlaque);

    // Vertical 3D Yield Gauge Column at rear-right (Green = Good Yield, Red = Lost to 10 Dust Particles!)
    const totalH = 4.4;
    const goodH = totalH * yieldFraction;
    const badH = Math.max(0.18, totalH * (1 - yieldFraction));

    const goodBar = new THREE.Mesh(hiResCyl(0.55, 0.55, goodH, 12), u.batCellWrapGreen);
    goodBar.position.set(4.15, 0.2 + goodH * 0.5, -2.9);
    goodBar.userData.noEdges = true;
    const badBar = new THREE.Mesh(hiResCyl(0.55, 0.55, badH, 12), mats.bodyRecRed);
    badBar.position.set(4.15, 0.2 + goodH + badH * 0.5, -2.9);
    badBar.userData.noEdges = true;
    g.add(goodBar, badBar);

    parts.push(finalizeVol1Part(id, order, swatch, g, pos, explode, cp, 0.2));
  };

  // F1-28. 300mmウェーハ比較① スマホ 1/1.3型（11×9mm / 99mm² / 約640個 / 歩留まり約98%）
  buildWaferYieldStation(
    'fab1-wafer-smartphone-640',
    28,
    '#10b981',
    new THREE.Vector3(-20.0, -13.5, 13.0),
    new THREE.Vector3(-24.0, -26.0, 24.0),
    u.fab1WaferSmartphone640,
    u.batCellWrapGreen,
    0.98,
    0.95,
    0.78
  );

  // F1-29. 300mmウェーハ比較② APS-C 一眼用（25×17mm / 425mm² / 約134個 / 歩留まり約93%）
  buildWaferYieldStation(
    'fab1-wafer-apsc-134',
    29,
    '#0ea5e9',
    new THREE.Vector3(-4.0, -13.5, 15.0),
    new THREE.Vector3(-6.0, -27.0, 28.0),
    u.fab1WaferApsc134,
    mats.fluorineCoatCyan,
    0.93,
    1.85,
    1.28
  );

  // F1-30. 300mmウェーハ比較③ フルサイズ一眼用（38×27mm / 1,026mm² / 約48個 / 歩留まり約81%）
  buildWaferYieldStation(
    'fab1-wafer-fullframe-48',
    30,
    '#f59e0b',
    new THREE.Vector3(12.0, -13.5, 15.0),
    new THREE.Vector3(12.0, -27.0, 28.0),
    u.fabWaferBinningMap,
    mats.goldPlating,
    0.81,
    2.65,
    1.9
  );

  // F1-31. 300mmウェーハ比較④ 中判 44×33mm（46×35mm / 1,610mm² / 約26個 / 歩留まり約68%）
  buildWaferYieldStation(
    'fab1-wafer-mediumformat-26',
    31,
    '#dc2626',
    new THREE.Vector3(28.0, -13.5, 13.0),
    new THREE.Vector3(30.0, -26.0, 24.0),
    u.fab1WaferMediumFormat26,
    mats.bodyRecRed,
    0.68,
    3.15,
    2.4
  );

  // F1-32. 積層歩留まりの掛け算の罠（画素×ロジック×ボイド＝ペア廃棄 ＆ 部分積層ブレイクスルー）
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(10.8, 9.6, 1.15, mats, mats.cinnabarAnodized));

    // Bottom 300mm Logic Wafer (~81% yield)
    const botWafer = makeWaferDisc(3.85, 0.34, u.fabWaferBinningMap, mats.siliconLogicLayer);
    botWafer.position.set(0, 0.65, 0);
    g.add(botWafer);

    // Top 300mm Pixel Wafer (~81% yield) descending face-to-face for Wafer-to-Wafer Cu-Cu Bonding!
    const topWafer = makeWaferDisc(3.85, 0.34, u.fabWafer300mmDieMap, mats.siliconPhotodiode);
    topWafer.position.set(0, 4.15, 0);
    g.add(topWafer);

    // Vertical Pair-Survival vs Pair-Discard Columns between the two wafers:
    // Green = Good × Good (Survives ~65%) | Red = Good × Bad (Whole Pair Scrapped!) | Amber Sphere = Bond Void Defect!
    const colSpecs: Array<[number, number, 'good' | 'scrap' | 'void']> = [
      [-1.7, -1.2, 'good'],
      [0.0, -1.4, 'scrap'],
      [1.7, -1.2, 'good'],
      [-1.6, 1.3, 'void'],
      [0.2, 1.4, 'good'],
      [1.8, 1.2, 'scrap'],
    ];
    const pairCyl = hiResCyl(0.32, 0.32, 3.15, 10);
    const voidSphere = hiResSphere(0.58, 10, 8);
    for (const [cx, cz, kind] of colSpecs) {
      const col = new THREE.Mesh(
        pairCyl,
        kind === 'good' ? u.batCellWrapGreen : mats.bodyRecRed
      );
      col.position.set(cx, 2.4, cz);
      col.userData.noEdges = true;
      g.add(col);
      if (kind === 'void') {
        const bubble = new THREE.Mesh(voidSphere, mats.cinnabarAnodized);
        bubble.position.set(cx, 2.4, cz);
        bubble.userData.noEdges = true;
        g.add(bubble);
      }
    }

    parts.push(
      finalizeVol1Part(
        'fab1-stacked-yield-multiply',
        32,
        '#ea580c',
        g,
        new THREE.Vector3(43.0, -13.5, 6.0),
        new THREE.Vector3(50.0, -24.0, 14.0),
        cp
      )
    );
  }

  return parts;
}
