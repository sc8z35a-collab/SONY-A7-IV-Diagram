import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyPlanarUVs,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

/**
 * Lean CNC-chamfered rectangular block tailored for the 36-station Vol.2 diorama:
 * - Micro-bars / wafers / brackets (< 2.15mm min side or thin < 0.28mm) use crisp 12-tri BoxGeometry with planar UVs
 * - Major pedestals, furnace decks, chambers & structural housings use 1-bevel / 5-curve-seg beveled extrusions
 */
function createChamferedBoxGeo(
  w: number,
  h: number,
  d: number,
  cornerR = 0.14,
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
  const shape = createRoundedRectShape(rw, rh, Math.min(cornerR, rw * 0.22, rh * 0.22));
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

function finalizeVol2Part(
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
    fabVolume: 2,
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

/** Machined industrial / cleanroom station pedestal sitting flush on Y = -0.7 deck surface */
function makeStationPlinth(
  w: number,
  d: number,
  h: number,
  mats: MaterialLibrary,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    createChamferedBoxGeo(w, h, d, 0.45, 0.11, 'y'),
    mats.stainlessMachined
  );
  body.position.y = -h * 0.5;
  g.add(body);

  const trim = new THREE.Mesh(
    createChamferedBoxGeo(w * 0.92, 0.18, d * 0.92, 0.34, 0.04, 'y'),
    accentMat
  );
  trim.position.y = 0.09;
  trim.userData.noEdges = true;
  g.add(trim);

  const footGeo = hiResCyl(0.24, 0.30, 0.22, 8);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeo, mats.matteBlackAnodized);
      foot.position.set(sx * (w * 0.39), -h - 0.10, sz * (d * 0.39));
      foot.userData.noEdges = true;
      g.add(foot);
    }
  }
  return g;
}

/** Scaled 300mm silicon wafer disc with crisp V-notch bevel */
function makeWaferDisc(
  radius: number,
  thickness: number,
  topMat: THREE.Material,
  edgeMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(hiResCyl(radius, radius, thickness, 24), edgeMat);
  g.add(base);

  const topGeo = new THREE.CircleGeometry(radius * 0.975, 24);
  topGeo.rotateX(-Math.PI / 2);
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = thickness * 0.5 + 0.014;
  top.userData.noEdges = true;
  g.add(top);

  // Iconic 1mm SEMI V-notch marker at +Z edge
  const notch = new THREE.Mesh(
    new THREE.BoxGeometry(radius * 0.11, thickness * 1.24, radius * 0.14),
    edgeMat
  );
  notch.rotation.y = Math.PI / 4;
  notch.position.set(0, 0, radius * 0.95);
  notch.userData.noEdges = true;
  g.add(notch);
  return g;
}

/**
 * Build all 36 Ultra-HD 3D CAD sculptural assemblies for **Sensor Manufacturing Process Vol.2**:
 * 「フェーズ1 ── 砂（珪石）から超純度エピタキシャルウェーハまで（P01-001〜060）」
 *
 * Spatial Layout (1 unit = 1 mm, strictly collision-free across all 36 stations):
 * - Hero Monument (`F2-01`): Floating at `(0, +18.2, -2.0)` (clears tallest 12.4mm MCZ ingot!)
 * - Master 7-Block Plant Deck (`F2-02`): `(0, -1.6, 0)`, size `112 × 1.8 × 60`
 * - Back Row (`Z = -21.5`, 9 stations, pitch `12.0mm`):
 *   - Block 1-A (`F2-03`–`F2-06`, P01-001–008): Quartzite Mining -> Submerged Arc Furnace 2,000°C -> MG-Si
 *   - Block 1-B (`F2-07`–`F2-11`, P01-009–018): TCS -> Distillation -> Siemens 11N Bell-Jar -> Clean Nuggets
 * - Middle Row (`Z = -2.0`, 10 stations, pitch `11.0mm`):
 *   - Block 1-C (`F2-12`–`F2-17`, P01-019–029): Spruce Pine 32" Crucible -> MCZ Superconducting Magnet -> Dash Neck -> 300mm Ingot
 *   - Block 1-D (`F2-18`–`F2-21`, P01-030–037): OD Grind 300.00mm -> X-Ray & V-Notch -> 1,000-Wire Saw -> Laser T7 ID
 * - Front Row (`Z = +18.0`, 10 stations, pitch `11.0mm`):
 *   - Block 1-E (`F2-22`–`F2-26`, P01-038–046): Edge Bevel/Grind -> Etch/Donor Killer -> DSP 775µm -> Finish CMP Ra<0.1nm -> RCA Megasonic
 *   - Block 1-F (`F2-27`–`F2-31`, P01-047–053): Backside Seal/DHF -> Molecular Ion Implanter -> 2026 SUMCO 5nm CI Gettering Cutaway -> Single-Wafer Epi 4–10µm -> Double-Epi
 * - Lower ISO Class 1 Metrology & Logistics Sub-Deck (`Y = -12.5`, `Z = +10.0`, 5 grand stations, pitch `20.0mm`):
 *   - Block 1-G (`F2-32`–`F2-36`, P01-054–060): Surfscan 19–30nm LPD -> WaferSight Nanotopo/FTIR -> VPD-ICP-MS/Hotspot -> 25-Wafer FOSB -> Air-Ride Logistics to Vol.3
 */
export function buildSensorFabVol2Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // ===========================================================================
  // HERO & PLANT DECK (F2-01 – F2-02)
  // ===========================================================================

  // F2-01: 11N Purity & Ra < 0.1nm Mirror Canvas Hero Monument
  {
    const g = new THREE.Group();
    const baseRing = new THREE.Mesh(hiResTorus(8.4, 0.34, 10, 32), mats.goldPlating);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -2.2;
    g.add(baseRing);

    const innerRing = new THREE.Mesh(hiResTorus(6.2, 0.22, 8, 28), mats.vcWorkingFluidCyan);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = -2.0;
    innerRing.userData.noEdges = true;
    g.add(innerRing);

    // Hero floating 300mm CIS Epi Mirror Wafer (tilted forward toward viewer!)
    const heroWafer = makeWaferDisc(6.6, 0.48, mats.ultra.fab2NanotopoMap, mats.stainlessMachined);
    heroWafer.rotation.x = 0.24;
    heroWafer.position.set(0, 1.2, 0);
    g.add(heroWafer);

    // Left Scale-Sense Sphere: 11N Purity (Tokyo Dome x4 white spheres + 1 tiny crimson impurity!)
    const domeShell = new THREE.Mesh(hiResSphere(2.4, 18, 12), mats.coverGlass);
    domeShell.position.set(-9.4, 0.4, 0.6);
    g.add(domeShell);
    const siOrbGeo = hiResSphere(0.32, 8, 6);
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2;
      const orb = new THREE.Mesh(siOrbGeo, mats.sinteredSilver);
      orb.position.set(
        -9.4 + Math.cos(ang) * 1.15,
        0.4 + Math.sin(ang * 2) * 0.72,
        0.6 + Math.sin(ang) * 1.15
      );
      orb.userData.noEdges = true;
      g.add(orb);
    }
    const redImpurity = new THREE.Mesh(hiResSphere(0.38, 10, 8), mats.bodyRecRed);
    redImpurity.position.set(-9.4, 0.4, 0.6);
    redImpurity.userData.noEdges = true;
    g.add(redImpurity);
    const domeCollar = new THREE.Mesh(hiResCyl(2.2, 2.5, 0.55, 16), mats.matteBlackAnodized);
    domeCollar.position.set(-9.4, -2.1, 0.6);
    g.add(domeCollar);

    // Right Scale-Sense Plaque: Ra < 0.1nm (Japan 3,000km vs 1mm coin + Clean Night Sky vs White Spots!)
    const flatBase = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.62, 4.4, 0.32, 0.08, 'y'),
      mats.matteBlackAnodized
    );
    flatBase.position.set(9.4, -1.9, 0.6);
    g.add(flatBase);
    // Clean night-sky dark panel vs contaminated white-spot panel
    const cleanTile = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.24, 3.2), mats.siliconDramLayer);
    cleanTile.position.set(8.1, -1.45, 0.6);
    g.add(cleanTile);
    const spotTile = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.24, 3.2), mats.matteBlackAnodized);
    spotTile.position.set(10.7, -1.45, 0.6);
    g.add(spotTile);
    const whiteDotGeo = hiResSphere(0.14, 6, 5);
    for (const [dx, dz] of [
      [-0.6, -0.9],
      [0.4, -0.4],
      [-0.2, 0.3],
      [0.7, 0.8],
      [-0.5, 1.0],
      [0.2, -1.1],
    ]) {
      const dot = new THREE.Mesh(whiteDotGeo, mats.zifIvoryPlastic);
      dot.position.set(10.7 + dx, -1.25, 0.6 + dz);
      dot.userData.noEdges = true;
      g.add(dot);
    }
    // 1-yen coin flatness disc emblem floating above
    const coinDisc = new THREE.Mesh(hiResCyl(1.45, 1.45, 0.18, 18), mats.sinteredSilver);
    coinDisc.rotation.x = 0.35;
    coinDisc.position.set(9.4, 0.85, 0.6);
    g.add(coinDisc);

    // Twin connecting arms linking the 3 Hero Benchmarks
    const armGeo = new THREE.BoxGeometry(20.0, 0.26, 0.45);
    const arm = new THREE.Mesh(armGeo, mats.goldPlating);
    arm.position.set(0, -2.2, 0.6);
    g.add(arm);

    parts.push(
      finalizeVol2Part(
        'fab2-hero-purity-mirror-monument',
        1,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 18.2, -2.0),
        new THREE.Vector3(0, 14.0, 0),
        cp
      )
    );
  }

  // F2-02: Phase 1 60-Step / 7-Block Industrial & Cleanroom Master Deck
  {
    const g = new THREE.Group();
    const deck = new THREE.Mesh(
      createChamferedBoxGeo(112.0, 1.8, 60.0, 1.6, 0.22, 'y'),
      mats.stainlessMachined
    );
    g.add(deck);

    const topMatGeo = new THREE.PlaneGeometry(110.0, 58.0);
    topMatGeo.rotateX(-Math.PI / 2);
    const topBlueprint = new THREE.Mesh(topMatGeo, mats.ultra.fab2Phase1PlantDeck);
    topBlueprint.position.y = 0.92;
    topBlueprint.userData.noEdges = true;
    g.add(topBlueprint);

    // Raised zone divider guardrails along aisles
    const railGeo = new THREE.BoxGeometry(108.0, 0.24, 0.34);
    for (const rz of [-11.8, 8.0]) {
      const rail = new THREE.Mesh(railGeo, mats.mountShimBlue);
      rail.position.set(0, 1.04, rz);
      rail.userData.noEdges = true;
      g.add(rail);
    }

    // 4 heavy shock-isolated structural legs down to lower metrology bay
    const legGeo = hiResCyl(1.4, 1.75, 11.2, 12);
    for (const sx of [-52, 52]) {
      for (const sz of [-26, 26]) {
        const leg = new THREE.Mesh(legGeo, mats.matteBlackAnodized);
        leg.position.set(sx, -6.5, sz);
        g.add(leg);
      }
    }

    // Lower metrology bay sub-platform carrying Block 1-G (F2-32–F2-36)
    const subDeck = new THREE.Mesh(
      createChamferedBoxGeo(102.0, 1.1, 18.5, 1.2, 0.16, 'y'),
      mats.matteBlackAnodized
    );
    subDeck.position.set(0, -12.6, 10.0);
    g.add(subDeck);

    const subTrim = new THREE.Mesh(
      new THREE.BoxGeometry(99.0, 0.18, 16.5),
      mats.ultra.fabCleanroomProcessDeck
    );
    subTrim.position.set(0, -11.96, 10.0);
    subTrim.userData.noEdges = true;
    g.add(subTrim);

    parts.push(
      finalizeVol2Part(
        'fab2-phase1-plant-deck',
        2,
        '#475569',
        g,
        new THREE.Vector3(0, -1.6, 0),
        new THREE.Vector3(0, -12.0, 0),
        cp,
        0.16
      )
    );
  }

  // ===========================================================================
  // BLOCK 1-A: QUARTZITE MINING & METALLURGICAL SILICON REDUCTION (P01-001–008)
  // Back-Left Row: Z = -21.5, X = -48, -36, -24, -12
  // ===========================================================================

  // F2-03: Quartzite Mining, Crushing & Magnetic Beneficiation (P01-001–002)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 9.2, 1.2, mats, mats.cinnabarAnodized));

    // White high-purity quartzite rock massif (SiO2 >= 99%)
    const rockCoords: [number, number, number, number][] = [
      [-2.5, 1.6, -1.8, 1.75],
      [-1.3, 2.3, -1.0, 1.45],
      [-2.8, 1.2, 0.2, 1.25],
      [-1.1, 1.0, -2.5, 1.15],
    ];
    for (const [rx, ry, rz, rad] of rockCoords) {
      const rock = new THREE.Mesh(new THREE.OctahedronGeometry(rad, 1), mats.zifIvoryPlastic);
      rock.position.set(rx, ry, rz);
      rock.rotation.set(rx * 0.5, ry * 0.8, rz * 0.4);
      g.add(rock);
    }

    // Twin jaw-crusher steel rollers (20–100mm)
    const rollerGeo = hiResCyl(0.85, 0.85, 2.8, 14);
    rollerGeo.rotateX(Math.PI / 2);
    for (const dx of [0.8, 2.55]) {
      const roller = new THREE.Mesh(rollerGeo, mats.softIronYoke);
      roller.position.set(dx, 2.2, -1.2);
      g.add(roller);
    }
    const hopper = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 2.4, 3.2, 0.2, 0.06, 'y'),
      mats.magnesiumCast
    );
    hopper.position.set(1.65, 4.1, -1.2);
    g.add(hopper);

    // Overhead electromagnetic iron-separator drum + clean water wash chute
    const magDrum = new THREE.Mesh(hiResCyl(1.05, 1.05, 2.4, 16), mats.neodymiumMagnet);
    magDrum.rotation.z = Math.PI / 2;
    magDrum.position.set(1.8, 2.4, 2.2);
    g.add(magDrum);

    const washChute = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 0.55, 2.4, 0.2, 0.05, 'y'),
      mats.vcWorkingFluidCyan
    );
    washChute.rotation.z = -0.14;
    washChute.position.set(0.2, 0.85, 2.2);
    g.add(washChute);

    // Crushed white pebbles + separated dark Fe particles
    const pebGeo = hiResSphere(0.28, 6, 5);
    for (let i = 0; i < 6; i++) {
      const peb = new THREE.Mesh(pebGeo, mats.zifIvoryPlastic);
      peb.position.set(-2.2 + i * 0.78, 1.45 - i * 0.1, 2.2 + ((i % 2) - 0.5) * 0.7);
      peb.userData.noEdges = true;
      g.add(peb);
    }
    for (let i = 0; i < 4; i++) {
      const fe = new THREE.Mesh(pebGeo, mats.ferriteInductor);
      fe.position.set(3.2 + (i % 2) * 0.45, 0.45, 1.8 + Math.floor(i / 2) * 0.55);
      fe.userData.noEdges = true;
      g.add(fe);
    }

    parts.push(
      finalizeVol2Part(
        'fab2-quartzite-mine-crusher',
        3,
        '#ea580c',
        g,
        new THREE.Vector3(-48, 0.5, -21.5),
        new THREE.Vector3(-12, 8, -14),
        cp
      )
    );
  }

  // F2-04: Carbon Reductant Blending & Arc Furnace Charging Silos (P01-003–004)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 9.2, 1.2, mats, mats.cinnabarAnodized));

    // Silo 1: Pure White Quartzite (SiO2)
    const silo1 = new THREE.Mesh(hiResCyl(1.75, 1.75, 4.8, 18), mats.stainlessMachined);
    silo1.position.set(-2.3, 4.6, -1.4);
    g.add(silo1);
    const cone1 = new THREE.Mesh(hiResCyl(1.75, 0.48, 1.7, 18), mats.stainlessMachined);
    cone1.position.set(-2.3, 1.35, -1.4);
    g.add(cone1);
    const cap1 = new THREE.Mesh(hiResCyl(1.6, 1.6, 0.4, 16), mats.zifIvoryPlastic);
    cap1.position.set(-2.3, 7.1, -1.4);
    g.add(cap1);

    // Silo 2: Low-Ash Charcoal / Coal / Woodchips (2C)
    const silo2 = new THREE.Mesh(hiResCyl(1.75, 1.75, 4.8, 18), mats.matteBlackAnodized);
    silo2.position.set(2.1, 4.6, -1.4);
    g.add(silo2);
    const cone2 = new THREE.Mesh(hiResCyl(1.75, 0.48, 1.7, 18), mats.matteBlackAnodized);
    cone2.position.set(2.1, 1.35, -1.4);
    g.add(cone2);
    const cap2 = new THREE.Mesh(hiResCyl(1.6, 1.6, 0.4, 16), mats.pyroGraphite);
    cap2.position.set(2.1, 7.1, -1.4);
    g.add(cap2);

    // Stoichiometric SiO2 : 2C precision screw-blender trough & charging conveyor
    const mixerTube = new THREE.Mesh(hiResCyl(0.72, 0.72, 7.2, 14), mats.copperHeatSpreader);
    mixerTube.rotation.z = Math.PI / 2;
    mixerTube.position.set(0.1, 1.15, 1.6);
    g.add(mixerTube);

    // Overhead structural steel gantry & load-cell weigh scale
    const frameBeam = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.42, 0.62), mats.titaniumRivet);
    frameBeam.position.set(-0.1, 7.6, -1.4);
    g.add(frameBeam);
    for (const sx of [-4.0, 3.8]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.45, 7.6, 0.45), mats.titaniumRivet);
      col.position.set(sx, 3.8, -1.4);
      g.add(col);
    }
    const chargeChute = new THREE.Mesh(hiResCyl(0.55, 0.55, 4.2, 12), mats.brassGear);
    chargeChute.rotation.z = -0.58;
    chargeChute.position.set(2.4, 2.8, 1.6);
    g.add(chargeChute);

    parts.push(
      finalizeVol2Part(
        'fab2-carbon-reductant-blender',
        4,
        '#d97706',
        g,
        new THREE.Vector3(-36, 0.5, -21.5),
        new THREE.Vector3(-8, 9, -14),
        cp
      )
    );
  }

  // F2-05: Submerged Arc Furnace — 2,000°C Carbothermic Reduction (P01-005)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.6, 9.4, 1.2, mats, mats.cinnabarAnodized));

    // Cylindrical steel furnace shell with cutaway revealing glowing 2,000°C carbon-arc hearth!
    const shell = new THREE.Mesh(
      new THREE.CylinderGeometry(3.75, 3.9, 4.6, 22, 1, false, 0.5, Math.PI * 1.68),
      mats.magnesiumCast
    );
    shell.position.set(0, 2.45, 0);
    g.add(shell);

    const lining = new THREE.Mesh(
      new THREE.CylinderGeometry(3.25, 3.35, 4.2, 20, 1, false, 0.5, Math.PI * 1.68),
      mats.ceramicAlumina
    );
    lining.position.set(0, 2.4, 0);
    g.add(lining);

    // Incandescent 2,000°C molten reaction bed (SiO2 + 2C -> Si + 2CO↑)
    const hearthGlow = new THREE.Mesh(hiResCyl(3.15, 3.2, 1.65, 20), mats.cinnabarAnodized);
    hearthGlow.position.set(0, 1.15, 0);
    hearthGlow.userData.noEdges = true;
    g.add(hearthGlow);
    const arcCore = new THREE.Mesh(hiResCyl(2.2, 2.4, 0.85, 16), mats.goldPlating);
    arcCore.position.set(0, 2.05, 0);
    arcCore.userData.noEdges = true;
    g.add(arcCore);

    // 3 Massive 3-phase vertical Söderberg carbon electrodes (11–13 MWh/t!)
    const elecGeo = hiResCyl(0.64, 0.64, 7.6, 14);
    const clampGeo = hiResCyl(0.92, 0.92, 0.65, 14);
    for (let i = 0; i < 3; i++) {
      const ang = (i * Math.PI * 2) / 3 + Math.PI / 6;
      const ex = Math.cos(ang) * 1.45;
      const ez = Math.sin(ang) * 1.45;
      const elec = new THREE.Mesh(elecGeo, mats.pyroGraphite);
      elec.position.set(ex, 6.2, ez);
      g.add(elec);

      const clamp = new THREE.Mesh(clampGeo, mats.copperCoil);
      clamp.position.set(ex, 7.4, ez);
      g.add(clamp);

      const busbar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 2.6), mats.copperHeatSpreader);
      busbar.position.set(ex, 8.6, ez - 0.8);
      g.add(busbar);
    }

    // Top fume hood & CO exhaust stack
    const hood = new THREE.Mesh(hiResCyl(2.6, 3.85, 1.2, 18), mats.stainlessMachined);
    hood.position.set(0, 5.35, 0);
    g.add(hood);
    const exhaust = new THREE.Mesh(hiResCyl(0.75, 0.75, 2.4, 12), mats.softIronYoke);
    exhaust.position.set(-2.5, 7.2, -2.1);
    g.add(exhaust);

    parts.push(
      finalizeVol2Part(
        'fab2-submerged-arc-furnace',
        5,
        '#dc2626',
        g,
        new THREE.Vector3(-24, 0.5, -21.5),
        new THREE.Vector3(-4, 11, -14),
        cp
      )
    );
  }

  // F2-06: Tapping Molten MG-Si, Ladle Refining & Fine Powder Mill (P01-006–008)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 9.2, 1.2, mats, mats.cinnabarAnodized));

    // Refractory tapping launder pouring 1,500°C glowing orange molten MG-Si
    const launder = new THREE.Mesh(
      createChamferedBoxGeo(3.4, 0.62, 1.4, 0.15, 0.05, 'y'),
      mats.ceramicAlumina
    );
    launder.rotation.z = -0.22;
    launder.position.set(-2.6, 4.4, -1.5);
    g.add(launder);
    const pourStream = new THREE.Mesh(hiResCyl(0.28, 0.34, 2.1, 10), mats.cinnabarAnodized);
    pourStream.position.set(-1.1, 3.05, -1.5);
    pourStream.userData.noEdges = true;
    g.add(pourStream);

    // Refractory refining ladle with O2/air gas lance (skimming Ca/Al slag -> 98.5–99.2% MG-Si)
    const ladle = new THREE.Mesh(hiResCyl(2.05, 1.65, 2.8, 18), mats.softIronYoke);
    ladle.position.set(-1.1, 1.55, -1.5);
    g.add(ladle);
    const meltTop = new THREE.Mesh(hiResCyl(1.82, 1.82, 0.25, 18), mats.goldPlating);
    meltTop.position.set(-1.1, 2.95, -1.5);
    meltTop.userData.noEdges = true;
    g.add(meltTop);
    const gasLance = new THREE.Mesh(hiResCyl(0.18, 0.18, 5.2, 10), mats.stainlessMachined);
    gasLance.position.set(-0.6, 4.8, -1.5);
    g.add(gasLance);

    // Flat ingot casting mold beds (cooled metallic gray MG-Si slabs)
    for (let i = 0; i < 2; i++) {
      const mold = new THREE.Mesh(
        createChamferedBoxGeo(3.2, 0.72, 2.1, 0.16, 0.05, 'y'),
        mats.matteBlackAnodized
      );
      mold.position.set(2.4, 0.55, -1.8 + i * 2.7);
      g.add(mold);
      const slab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 1.55), mats.sinteredSilver);
      slab.position.set(2.4, 0.96, -1.8 + i * 2.7);
      g.add(slab);
    }

    // 50–500µm fine-powder rotary ball mill at front-left
    const millDrum = new THREE.Mesh(hiResCyl(1.35, 1.35, 3.6, 16), mats.tungstenCopper);
    millDrum.rotation.z = Math.PI / 2;
    millDrum.position.set(-1.3, 1.75, 2.3);
    g.add(millDrum);
    const powderTray = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 1.8), mats.titaniumRivet);
    powderTray.position.set(2.2, 0.4, 2.8);
    g.add(powderTray);

    parts.push(
      finalizeVol2Part(
        'fab2-ladle-refining-grinding',
        6,
        '#f59e0b',
        g,
        new THREE.Vector3(-12, 0.5, -21.5),
        new THREE.Vector3(-1, 8, -14),
        cp
      )
    );
  }

  // ===========================================================================
  // BLOCK 1-B: CHEMICAL DISTILLATION & SIEMENS 11N POLYSILICON (P01-009–018)
  // Back-Right Row: Z = -21.5, X = 0, +12, +24, +36, +48
  // ===========================================================================

  // F2-07: Fluidized-Bed TCS Synthesis & Cyclone Condenser (P01-009–010)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 9.2, 1.2, mats, mats.vcWorkingFluidCyan));

    // Pressurized fluidized-bed TCS synthesis column (300–350°C, HCl + MG-Si -> SiHCl3)
    const reactor = new THREE.Mesh(hiResCyl(1.75, 1.75, 6.2, 18), mats.stainlessMachined);
    reactor.position.set(-2.2, 3.7, -0.8);
    g.add(reactor);
    const domeTop = new THREE.Mesh(hiResSphere(1.75, 16, 10), mats.stainlessMachined);
    domeTop.scale.y = 0.55;
    domeTop.position.set(-2.2, 6.8, -0.8);
    g.add(domeTop);
    const hclRing = new THREE.Mesh(hiResTorus(1.95, 0.22, 8, 20), mats.vcWorkingFluidCyan);
    hclRing.rotation.x = Math.PI / 2;
    hclRing.position.set(-2.2, 1.6, -0.8);
    g.add(hclRing);

    // Conical cyclone dust separator
    const cycCyl = new THREE.Mesh(hiResCyl(1.15, 1.15, 2.0, 14), mats.invarScaleBar);
    cycCyl.position.set(1.2, 5.4, -0.8);
    g.add(cycCyl);
    const cycCone = new THREE.Mesh(hiResCyl(1.15, 0.28, 2.4, 14), mats.invarScaleBar);
    cycCone.position.set(1.2, 3.2, -0.8);
    g.add(cycCone);

    // Chilled shell-and-tube TCS condenser (<30°C, TCS bp = 31.8°C!) + liquid tank
    const condenser = new THREE.Mesh(hiResCyl(0.95, 0.95, 4.6, 16), mats.mountShimBlue);
    condenser.rotation.z = Math.PI / 2;
    condenser.position.set(1.8, 2.2, 2.2);
    g.add(condenser);
    const pipe = new THREE.Mesh(hiResCyl(0.24, 0.24, 3.6, 10), mats.brassGear);
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set(-0.5, 6.5, -0.8);
    g.add(pipe);

    parts.push(
      finalizeVol2Part(
        'fab2-tcs-fluidized-cyclone',
        7,
        '#0891b2',
        g,
        new THREE.Vector3(0, 0.5, -21.5),
        new THREE.Vector3(2, 9, -14),
        cp
      )
    );
  }

  // F2-08: Multi-Stage Fractional Distillation Column Battery (ppb–ppt) (P01-011)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 9.2, 1.2, mats, mats.vcWorkingFluidCyan));

    // 4 Towering Stainless Multi-Tray Fractional Distillation Columns in Series!
    const colPositions: [number, number, number][] = [
      [-3.1, -1.6, 8.6],
      [-1.0, 1.4, 9.8],
      [1.2, -1.4, 10.6],
      [3.2, 1.3, 11.4],
    ];
    for (let i = 0; i < colPositions.length; i++) {
      const [cx, cz, ch] = colPositions[i];
      const col = new THREE.Mesh(hiResCyl(0.86, 0.86, ch, 16), mats.stainlessMachined);
      col.position.set(cx, ch * 0.5 + 0.3, cz);
      g.add(col);
      // Distillation tray inspection rings
      for (let t = 1.6; t < ch - 0.6; t += 1.8) {
        const ring = new THREE.Mesh(hiResTorus(0.92, 0.08, 6, 16), mats.vcWorkingFluidCyan);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(cx, t, cz);
        ring.userData.noEdges = true;
        g.add(ring);
      }
      // Top reflux condenser drum
      const ref = new THREE.Mesh(hiResCyl(0.42, 0.42, 1.4, 10), mats.mountShimBlue);
      ref.rotation.z = Math.PI / 2;
      ref.position.set(cx, ch + 0.6, cz);
      g.add(ref);
      // Reboiler drum at base
      const reb = new THREE.Mesh(hiResCyl(0.45, 0.45, 1.2, 10), mats.copperHeatSpreader);
      reb.rotation.z = Math.PI / 2;
      reb.position.set(cx, 0.95, cz + 1.05);
      g.add(reb);
    }

    // Inter-column overhead transfer manifolds
    const man = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.24, 0.24), mats.goldPlating);
    man.position.set(0.1, 7.2, 0);
    g.add(man);

    parts.push(
      finalizeVol2Part(
        'fab2-multistage-distillation',
        8,
        '#06b6d4',
        g,
        new THREE.Vector3(12, 0.5, -21.5),
        new THREE.Vector3(4, 12, -14),
        cp
      )
    );
  }

  // F2-09: 7N Ultra-Pure H2 Purifier & Inverted-U Slim Rods Preheating (P01-012–014)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 9.2, 1.2, mats, mats.vcWorkingFluidCyan));

    // Left: Palladium-membrane 7N (99.99999%) H2 purifier bank
    for (let i = 0; i < 3; i++) {
      const cell = new THREE.Mesh(hiResCyl(0.62, 0.62, 5.2, 14), mats.sinteredSilver);
      cell.position.set(-3.1 + i * 1.4, 2.8, -1.6);
      g.add(cell);
    }
    const h2Header = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.55, 1.1), mats.vcWorkingFluidCyan);
    h2Header.position.set(-1.7, 5.6, -1.6);
    g.add(h2Header);

    // Right: Open Siemens Baseplate with glowing red-hot (1,100°C) 7–10mm inverted-U slim rods!
    const baseplate = new THREE.Mesh(hiResCyl(2.85, 2.95, 0.65, 22), mats.stainlessMachined);
    baseplate.position.set(1.6, 0.55, 1.0);
    g.add(baseplate);

    const rodGeo = hiResCyl(0.16, 0.16, 5.4, 8);
    const bridgeGeo = new THREE.BoxGeometry(0.95, 0.24, 0.24);
    for (let u = 0; u < 5; u++) {
      const ang = (u / 5) * Math.PI * 2;
      const ux = 1.6 + Math.cos(ang) * 1.45;
      const uz = 1.0 + Math.sin(ang) * 1.45;
      const leg1 = new THREE.Mesh(rodGeo, mats.cinnabarAnodized);
      leg1.position.set(ux - 0.36, 3.5, uz);
      leg1.userData.noEdges = true;
      g.add(leg1);
      const leg2 = new THREE.Mesh(rodGeo, mats.cinnabarAnodized);
      leg2.position.set(ux + 0.36, 3.5, uz);
      leg2.userData.noEdges = true;
      g.add(leg2);
      const bridge = new THREE.Mesh(bridgeGeo, mats.goldPlating);
      bridge.position.set(ux, 6.25, uz);
      bridge.userData.noEdges = true;
      g.add(bridge);
    }

    parts.push(
      finalizeVol2Part(
        'fab2-h2-purifier-slimrods',
        9,
        '#0284c7',
        g,
        new THREE.Vector3(24, 0.5, -21.5),
        new THREE.Vector3(6, 9, -14),
        cp
      )
    );
  }

  // F2-10: Siemens Bell-Jar CVD Reactor (11N Rods) & 95% Off-Gas Loop (P01-015–016)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.6, 9.4, 1.2, mats, mats.vcWorkingFluidCyan));

    // Water-cooled double-walled stainless Bell-Jar cutaway revealing thick 150–200mm 11N Si rods!
    const bellShell = new THREE.Mesh(
      new THREE.CylinderGeometry(3.25, 3.35, 6.4, 24, 1, false, 0.45, Math.PI * 1.62),
      mats.stainlessMachined
    );
    bellShell.position.set(-0.6, 3.7, -0.4);
    g.add(bellShell);

    const bellDome = new THREE.Mesh(
      new THREE.SphereGeometry(3.25, 22, 12, 0.45, Math.PI * 1.62, 0, Math.PI * 0.5),
      mats.stainlessMachined
    );
    bellDome.scale.y = 0.62;
    bellDome.position.set(-0.6, 6.9, -0.4);
    g.add(bellDome);

    const flange = new THREE.Mesh(hiResCyl(3.65, 3.65, 0.58, 24), mats.titaniumRivet);
    flange.position.set(-0.6, 0.48, -0.4);
    g.add(flange);

    // 7 Thick glistening metallic 11N polysilicon CVD rods grown over 3–5 days!
    const polyGeo = hiResCyl(0.56, 0.62, 5.8, 12);
    const rodCoords: [number, number][] = [
      [0, 0],
      [1.35, 0],
      [-1.35, 0],
      [0.68, 1.2],
      [-0.68, 1.2],
      [0.68, -1.2],
      [-0.68, -1.2],
    ];
    for (const [rx, rz] of rodCoords) {
      const rod = new THREE.Mesh(polyGeo, mats.sinteredSilver);
      rod.position.set(-0.6 + rx, 3.65, -0.4 + rz);
      g.add(rod);
    }

    // Closed-loop >=95% Off-Gas Hydrogenation & Recycling Manifold on right side
    const recTank = new THREE.Mesh(hiResCyl(1.1, 1.1, 4.8, 14), mats.vcWorkingFluidCyan);
    recTank.position.set(3.4, 2.8, 1.8);
    g.add(recTank);
    const loopPipe = new THREE.Mesh(hiResTorus(1.4, 0.22, 8, 18, Math.PI), mats.goldPlating);
    loopPipe.position.set(2.0, 5.3, 1.8);
    g.add(loopPipe);

    parts.push(
      finalizeVol2Part(
        'fab2-siemens-cvd-reactor',
        10,
        '#14b8a6',
        g,
        new THREE.Vector3(36, 0.5, -21.5),
        new THREE.Vector3(9, 11, -14),
        cp
      )
    );
  }

  // F2-11: Non-Metal Crushing, HF+HNO3 Acid Etch & 11N Vacuum Packaging (P01-017–018)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 9.2, 1.2, mats, mats.vcWorkingFluidCyan));

    // Cleanroom non-metallic WC/Silicon breaker housing
    const breaker = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 3.8, 3.2, 0.26, 0.08, 'y'),
      mats.coverGlass
    );
    breaker.position.set(-2.3, 2.1, -1.5);
    g.add(breaker);
    const siHammer = new THREE.Mesh(hiResCyl(0.58, 0.58, 2.6, 12), mats.siliconBulk);
    siHammer.position.set(-2.3, 3.4, -1.5);
    g.add(siHammer);

    // HF + HNO3 Acid Etch & UPW Rinse Dual Clean Bath
    const bath = new THREE.Mesh(
      createChamferedBoxGeo(3.8, 2.2, 3.2, 0.24, 0.07, 'y'),
      mats.zifIvoryPlastic
    );
    bath.position.set(2.1, 1.3, -1.5);
    g.add(bath);
    const acidLiquid = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.42, 2.6), mats.vcWorkingFluidCyan);
    acidLiquid.position.set(2.1, 2.25, -1.5);
    acidLiquid.userData.noEdges = true;
    g.add(acidLiquid);

    // Double-bagged vacuum-sealed 11N SEG-Si glistening silver nugget packs (<10^9 atoms/cm^2)
    for (let p = 0; p < 2; p++) {
      const bag = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 1.45, 2.6, 0.35, 0.08, 'y'),
        mats.coverGlass
      );
      bag.position.set(-1.9 + p * 3.9, 0.95, 2.3);
      g.add(bag);
      for (let n = 0; n < 5; n++) {
        const nug = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), mats.sinteredSilver);
        nug.position.set(-2.8 + p * 3.9 + n * 0.46, 0.92 + (n % 2) * 0.24, 2.2 + ((n % 3) - 1) * 0.36);
        nug.userData.noEdges = true;
        g.add(nug);
      }
    }

    parts.push(
      finalizeVol2Part(
        'fab2-nonmetal-crush-acid-pack',
        11,
        '#10b981',
        g,
        new THREE.Vector3(48, 0.5, -21.5),
        new THREE.Vector3(12, 8, -14),
        cp
      )
    );
  }

  // ===========================================================================
  // BLOCK 1-C: SPRUCE PINE CRUCIBLE & MCZ SINGLE-CRYSTAL PULLING (P01-019–029)
  // Middle-Left Row: Z = -2.0, X = -49.5, -38.5, -27.5, -16.5, -5.5, +5.5
  // ===========================================================================

  // F2-12: Spruce Pine NC 32-Inch Single-Use Ultra-Pure Quartz Crucible (P01-019)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.goldPlating));

    // Split machined black graphite susceptor cradle
    const susceptor = new THREE.Mesh(
      new THREE.CylinderGeometry(3.65, 3.2, 4.2, 24, 1, false, 0.4, Math.PI * 1.68),
      mats.pyroGraphite
    );
    susceptor.position.set(0, 2.4, -0.4);
    g.add(susceptor);

    // 32-inch (~800mm) Arc-Fused Ultra-Pure Translucent Quartz Crucible (bubble-free inner wall!)
    const quartzOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(3.32, 2.95, 4.5, 24, 1, false, 0.35, Math.PI * 1.72),
      mats.quartzOlpf
    );
    quartzOuter.position.set(0, 2.85, -0.4);
    g.add(quartzOuter);
    const quartzRim = new THREE.Mesh(hiResTorus(3.26, 0.18, 8, 28), mats.coverGlass);
    quartzRim.rotation.x = Math.PI / 2;
    quartzRim.position.set(0, 5.1, -0.4);
    g.add(quartzRim);
    const quartzFloor = new THREE.Mesh(hiResCyl(2.85, 2.85, 0.45, 22), mats.quartzOlpf);
    quartzFloor.position.set(0, 0.85, -0.4);
    g.add(quartzFloor);

    // Spruce Pine NC ultra-pure quartz sand sample dish in front (80% world supply!)
    const sandDish = new THREE.Mesh(hiResCyl(1.55, 1.7, 0.55, 16), mats.goldPlating);
    sandDish.position.set(0, 0.42, 3.25);
    g.add(sandDish);
    const sandMound = new THREE.Mesh(hiResSphere(1.25, 12, 8), mats.zifIvoryPlastic);
    sandMound.scale.y = 0.42;
    sandMound.position.set(0, 0.72, 3.25);
    sandMound.userData.noEdges = true;
    g.add(sandMound);

    parts.push(
      finalizeVol2Part(
        'fab2-spruce-pine-crucible',
        12,
        '#f59e0b',
        g,
        new THREE.Vector3(-49.5, 0.5, -2.0),
        new THREE.Vector3(-14, 9, -2),
        cp
      )
    );
  }

  // F2-13: 11N Polysilicon 300–450kg + Boron Dopant Loading & Ar Purge (P01-020–021)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.goldPlating));

    // Crucible packed with 300–450kg gleaming 11N polysilicon nuggets
    const cruc = new THREE.Mesh(hiResCyl(3.05, 2.75, 3.6, 22), mats.quartzOlpf);
    cruc.position.set(-0.6, 2.0, -0.6);
    g.add(cruc);
    for (let i = 0; i < 14; i++) {
      const ang = i * 1.12;
      const rr = (i % 4) * 0.58;
      const chunk = new THREE.Mesh(new THREE.OctahedronGeometry(0.54, 0), mats.sinteredSilver);
      chunk.position.set(-0.6 + Math.cos(ang) * rr, 3.6 + (i % 3) * 0.42, -0.6 + Math.sin(ang) * rr);
      chunk.userData.noEdges = true;
      g.add(chunk);
    }

    // Milligram-precision Boron (B, P-type dopant) micro-dosing vial & dispenser arm
    const bArm = new THREE.Mesh(new THREE.BoxGeometry(0.42, 4.6, 0.42), mats.stainlessMachined);
    bArm.position.set(2.8, 3.2, -0.6);
    g.add(bArm);
    const bVial = new THREE.Mesh(hiResCyl(0.45, 0.35, 1.45, 12), mats.makeupSealViolet);
    bVial.position.set(0.4, 5.6, -0.6);
    g.add(bVial);
    const bRail = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.28, 0.28), mats.goldPlating);
    bRail.position.set(1.5, 5.8, -0.6);
    g.add(bRail);

    // Vacuum dry pump & High-purity Argon (Ar) cylinder manifold
    const arBottle = new THREE.Mesh(hiResCyl(0.82, 0.82, 4.2, 14), mats.mountShimBlue);
    arBottle.position.set(2.9, 2.25, 2.4);
    g.add(arBottle);
    const vacPump = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 1.8, 2.0, 0.2, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    vacPump.position.set(-2.2, 1.1, 2.8);
    g.add(vacPump);

    parts.push(
      finalizeVol2Part(
        'fab2-poly-boron-dopant-load',
        13,
        '#6366f1',
        g,
        new THREE.Vector3(-38.5, 0.5, -2.0),
        new THREE.Vector3(-10, 8, -2),
        cp
      )
    );
  }

  // F2-14: Meltdown 1,420°C & Superconducting Horizontal Magnetic Field MCZ (0.3–0.4T) (P01-022–023)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.2, 9.8, 1.2, mats, mats.mountShimBlue));

    // Cutaway MCZ furnace hot-zone + picket-fence graphite heater glowing around golden 1,420°C melt!
    const furnaceVessel = new THREE.Mesh(
      new THREE.CylinderGeometry(3.05, 3.05, 6.2, 22, 1, false, 0.5, Math.PI * 1.65),
      mats.stainlessMachined
    );
    furnaceVessel.position.set(0, 3.5, 0);
    g.add(furnaceVessel);

    const heater = new THREE.Mesh(hiResCyl(2.45, 2.45, 3.6, 18), mats.pyroGraphite);
    heater.position.set(0, 2.4, 0);
    g.add(heater);

    // Golden radiant molten silicon pool (1,420–1,500°C, Si mp 1,414°C)
    const melt = new THREE.Mesh(hiResCyl(2.05, 1.9, 2.1, 20), mats.goldPlating);
    melt.position.set(0, 2.45, 0);
    melt.userData.noEdges = true;
    g.add(melt);

    // Twin massive cryogenic Liquid-He Superconducting Saddle Magnet Coils (0.3–0.4 Tesla!)
    for (const sx of [-3.55, 3.55]) {
      const cryostat = new THREE.Mesh(
        createChamferedBoxGeo(1.75, 5.2, 5.4, 0.45, 0.12, 'y'),
        mats.mountShimBlue
      );
      cryostat.position.set(sx, 3.5, 0);
      g.add(cryostat);
      const coilRing = new THREE.Mesh(hiResTorus(1.45, 0.28, 8, 20), mats.copperCoil);
      coilRing.rotation.y = Math.PI / 2;
      coilRing.position.set(sx * 0.85, 3.5, 0);
      g.add(coilRing);
    }

    // Upper pull-head throat tower
    const pullChamber = new THREE.Mesh(hiResCyl(1.35, 1.55, 3.6, 16), mats.invarScaleBar);
    pullChamber.position.set(0, 8.4, 0);
    g.add(pullChamber);

    parts.push(
      finalizeVol2Part(
        'fab2-mcz-superconducting-magnet',
        14,
        '#4f46e5',
        g,
        new THREE.Vector3(-27.5, 0.5, -2.0),
        new THREE.Vector3(-6, 11, -2),
        cp
      )
    );
  }

  // F2-15: <100> Seed Dipping & 3–4mm Dash Necking Dislocation Escape (P01-024–025)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.goldPlating));

    // Magnified golden molten silicon meniscus pool at bottom
    const meltPool = new THREE.Mesh(hiResCyl(3.3, 3.4, 1.5, 22), mats.goldPlating);
    meltPool.position.set(0, 0.9, 0);
    meltPool.userData.noEdges = true;
    g.add(meltPool);

    // Flaring upper shoulder cone emerging from the ultra-thin Dash Neck
    const shoulder = new THREE.Mesh(hiResCyl(0.32, 2.55, 2.8, 22), mats.sinteredSilver);
    shoulder.position.set(0, 3.05, 0);
    g.add(shoulder);

    // Ultra-thin 3–4mm Dash Neck cylinder (dramatically highlighted!)
    const dashNeck = new THREE.Mesh(hiResCyl(0.28, 0.28, 3.4, 14), mats.vcWorkingFluidCyan);
    dashNeck.position.set(0, 6.15, 0);
    g.add(dashNeck);

    // <100> Monocrystal seed rod & seed chuck above
    const seed = new THREE.Mesh(hiResCyl(0.55, 0.55, 1.8, 12), mats.siliconSensorDie);
    seed.position.set(0, 8.6, 0);
    g.add(seed);
    const chuck = new THREE.Mesh(hiResCyl(1.05, 0.85, 1.1, 14), mats.stainlessMachined);
    chuck.position.set(0, 9.95, 0);
    g.add(chuck);

    // Visualizing thermal-shock dislocation lines exiting the side of the thin Dash Neck!
    for (let d = 0; d < 4; d++) {
      const ang = (d * Math.PI) / 2 + 0.4;
      const disloc = new THREE.Mesh(hiResCyl(0.08, 0.08, 1.65, 6), mats.bodyRecRed);
      disloc.position.set(Math.cos(ang) * 0.65, 6.45 - d * 0.45, Math.sin(ang) * 0.65);
      disloc.rotation.z = Math.cos(ang) * 0.9;
      disloc.rotation.x = Math.sin(ang) * 0.9;
      disloc.userData.noEdges = true;
      g.add(disloc);
    }

    // Precision optical diameter camera pod
    const camPod = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.1, 1.4), mats.matteBlackAnodized);
    camPod.position.set(3.2, 5.2, 2.2);
    g.add(camPod);

    parts.push(
      finalizeVol2Part(
        'fab2-seed-dash-necking',
        15,
        '#3b82f6',
        g,
        new THREE.Vector3(-16.5, 0.5, -2.0),
        new THREE.Vector3(-3, 12, -2),
        cp
      )
    );
  }

  // F2-16: 300mm MCZ Body Pulling & V/G Ratio Defect-Free Monocrystal Ingot (P01-026–027)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.vcWorkingFluidCyan));

    // Counter-rotating crucible pedestal at base
    const crucBase = new THREE.Mesh(hiResCyl(3.4, 3.6, 1.35, 22), mats.pyroGraphite);
    crucBase.position.set(0, 0.8, 0);
    g.add(crucBase);
    const meltRim = new THREE.Mesh(hiResTorus(2.85, 0.2, 8, 24), mats.goldPlating);
    meltRim.rotation.x = Math.PI / 2;
    meltRim.position.set(0, 1.55, 0);
    meltRim.userData.noEdges = true;
    g.add(meltRim);

    // Monumental 300mm × 2m scaled gleaming Monocrystal Silicon Ingot with bespoke V/G Crystal Texture!
    const ingotBody = new THREE.Mesh(hiResCyl(2.25, 2.25, 7.6, 26), mats.ultra.fab2IngotVgCrystalMap);
    ingotBody.position.set(0, 5.65, 0);
    g.add(ingotBody);

    // Crown (Shoulder) cone & Dash Neck & pull cable at apex
    const crown = new THREE.Mesh(hiResCyl(0.28, 2.25, 1.65, 24), mats.sinteredSilver);
    crown.position.set(0, 10.28, 0);
    g.add(crown);
    const topNeck = new THREE.Mesh(hiResCyl(0.24, 0.24, 1.0, 10), mats.vcWorkingFluidCyan);
    topNeck.position.set(0, 11.55, 0);
    g.add(topNeck);

    // 4 Radial crystal growth ridges (<100> 4-fold symmetry lines!)
    for (let r = 0; r < 4; r++) {
      const ang = (r * Math.PI) / 2;
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 7.5, 0.24), mats.sinteredSilver);
      ridge.position.set(Math.cos(ang) * 2.26, 5.65, Math.sin(ang) * 2.26);
      ridge.rotation.y = -ang;
      ridge.userData.noEdges = true;
      g.add(ridge);
    }

    parts.push(
      finalizeVol2Part(
        'fab2-mcz-body-pulling-vg',
        16,
        '#2563eb',
        g,
        new THREE.Vector3(-5.5, 0.5, -2.0),
        new THREE.Vector3(0, 14, -2),
        cp
      )
    );
  }

  // F2-17: Tail Cone Detachment & Controlled Cooling Gantry Crane Unloading (P01-028–029)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.mountShimBlue));

    // Twin-pillar cleanroom ingot crane gantry
    for (const sx of [-3.5, 3.5]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.55, 9.2, 0.55), mats.stainlessMachined);
      post.position.set(sx, 4.7, -1.6);
      g.add(post);
    }
    const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.65, 0.9), mats.goldPlating);
    crossBeam.position.set(0, 9.5, -1.6);
    g.add(crossBeam);

    // Cooled complete ingot with Crown + Straight Body + Conical Tail suspended safely
    const ingotGrp = new THREE.Group();
    const crown = new THREE.Mesh(hiResCyl(0.25, 1.65, 1.3, 20), mats.sinteredSilver);
    crown.position.y = 2.75;
    ingotGrp.add(crown);
    const body = new THREE.Mesh(hiResCyl(1.65, 1.65, 4.2, 22), mats.siliconSensorDie);
    body.position.y = 0;
    ingotGrp.add(body);
    // Critical tapered Tail Cone preventing thermal-shock dislocation slip-back!
    const tail = new THREE.Mesh(hiResCyl(1.65, 0.16, 1.9, 20), mats.vcWorkingFluidCyan);
    tail.position.y = -3.05;
    ingotGrp.add(tail);
    ingotGrp.position.set(0, 5.2, -1.6);
    g.add(ingotGrp);

    // Padded horizontal ingot transport cradle trolley waiting in front
    const trolley = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 0.72, 2.6, 0.25, 0.07, 'y'),
      mats.matteBlackAnodized
    );
    trolley.position.set(0, 0.65, 2.3);
    g.add(trolley);
    for (const vx of [-2.0, 2.0]) {
      const vblock = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.95, 2.2), mats.damperElastomer);
      vblock.position.set(vx, 1.35, 2.3);
      g.add(vblock);
    }

    parts.push(
      finalizeVol2Part(
        'fab2-tail-detachment-unloading',
        17,
        '#0ea5e9',
        g,
        new THREE.Vector3(5.5, 0.5, -2.0),
        new THREE.Vector3(3, 10, -2),
        cp
      )
    );
  }

  // ===========================================================================
  // BLOCK 1-D: INGOT SHAPING & MULTI-WIRE SAW SLICING (P01-030–037)
  // Middle-Right Row: Z = -2.0, X = +16.5, +27.5, +38.5, +49.5
  // ===========================================================================

  // F2-18: Crown/Tail Cropping & 300.00mm Cylindrical OD Grinding (P01-030–031)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.mountShimBlue));

    // Left: Horizontal cropped monocrystal cylinder spinning on OD grinder centers (300.00 ± 0.20mm!)
    const block = new THREE.Mesh(hiResCyl(1.65, 1.65, 4.8, 22), mats.sinteredSilver);
    block.rotation.z = Math.PI / 2;
    block.position.set(0, 2.6, 0.6);
    g.add(block);

    // Detached crown & tail cones resting at rear inspection tray
    const cutCrown = new THREE.Mesh(hiResCyl(0.25, 1.2, 1.2, 16), mats.invarScaleBar);
    cutCrown.rotation.z = Math.PI / 2;
    cutCrown.position.set(-2.2, 1.3, -2.6);
    g.add(cutCrown);
    const cutTail = new THREE.Mesh(hiResCyl(1.2, 0.18, 1.5, 16), mats.invarScaleBar);
    cutTail.rotation.z = -Math.PI / 2;
    cutTail.position.set(2.1, 1.3, -2.6);
    g.add(cutTail);

    // Diamond cylindrical OD grinding wheel & laser diameter micrometer arch
    const wheel = new THREE.Mesh(hiResCyl(1.55, 1.55, 0.72, 20), mats.tungstenCopper);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(0.4, 4.5, 0.6);
    g.add(wheel);
    const spindle = new THREE.Mesh(hiResCyl(0.55, 0.55, 2.2, 12), mats.matteBlackAnodized);
    spindle.position.set(0.4, 6.2, 0.6);
    g.add(spindle);

    // Headstock & tailstock chucks
    for (const sx of [-2.9, 2.9]) {
      const stock = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.2, 2.2), mats.matteBlackAnodized);
      stock.position.set(sx, 1.75, 0.6);
      g.add(stock);
    }

    parts.push(
      finalizeVol2Part(
        'fab2-crop-od-grinding',
        18,
        '#0284c7',
        g,
        new THREE.Vector3(16.5, 0.5, -2.0),
        new THREE.Vector3(6, 9, -2),
        cp
      )
    );
  }

  // F2-19: X-Ray Crystal Orientation (<100>/<110>) & 1mm V-Notch "North Star" (P01-032–033)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.mountShimBlue));

    // Precision 300.00mm Silicon Ingot Block with carved longitudinal 1mm V-Notch groove!
    const ingot = new THREE.Mesh(hiResCyl(1.85, 1.85, 5.2, 24), mats.siliconSensorDie);
    ingot.rotation.z = Math.PI / 2;
    ingot.position.set(0, 2.4, 0.4);
    g.add(ingot);
    // Glowing golden V-Notch reference line running full length ("North Star" for 2,110 steps!)
    const notchBar = new THREE.Mesh(new THREE.BoxGeometry(5.26, 0.34, 0.34), mats.goldPlating);
    notchBar.rotation.x = Math.PI / 4;
    notchBar.position.set(0, 2.4, 2.25);
    g.add(notchBar);

    // X-Ray Diffraction Goniometer Arc (±0.1° accuracy!)
    const gonioArc = new THREE.Mesh(hiResTorus(3.0, 0.24, 8, 22, Math.PI), mats.stainlessMachined);
    gonioArc.position.set(0, 2.4, -1.8);
    g.add(gonioArc);
    const xrayTube = new THREE.Mesh(hiResCyl(0.42, 0.42, 1.8, 12), mats.bodyRecRed);
    xrayTube.rotation.z = -0.65;
    xrayTube.position.set(-2.2, 5.0, -1.2);
    g.add(xrayTube);
    const xrayDet = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 1.2), mats.vcWorkingFluidCyan);
    xrayDet.rotation.z = 0.65;
    xrayDet.position.set(2.2, 5.0, -1.2);
    g.add(xrayDet);

    // Diamond pencil V-notch grinding head at front
    const pencilWheel = new THREE.Mesh(hiResCyl(0.72, 0.16, 0.55, 16), mats.copperCoil);
    pencilWheel.rotation.x = Math.PI / 2;
    pencilWheel.position.set(0, 2.4, 2.95);
    g.add(pencilWheel);

    parts.push(
      finalizeVol2Part(
        'fab2-xray-notch-grinding',
        19,
        '#0369a1',
        g,
        new THREE.Vector3(27.5, 0.5, -2.0),
        new THREE.Vector3(9, 10, -2),
        cp
      )
    );
  }

  // F2-20: Multi-Wire Saw Slicing (100µm Diamond Wire × 1,000 Parallel Cuts!) (P01-034–035)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.2, 9.8, 1.2, mats, mats.vcWorkingFluidCyan));

    // Twin massive grooved polyurethane wire-guide rollers
    const rollerGeo = hiResCyl(1.18, 1.18, 6.4, 18);
    rollerGeo.rotateZ(Math.PI / 2);
    for (const rz of [-2.4, 2.4]) {
      const r = new THREE.Mesh(rollerGeo, mats.mountShimBlue);
      r.position.set(0, 2.1, rz);
      g.add(r);
    }

    // Ultra-dense harp of shimmering 100µm parallel cutting wires spanning between rollers!
    const wireGeo = new THREE.BoxGeometry(0.055, 0.055, 4.8);
    for (let w = 0; w < 21; w++) {
      const wx = -2.8 + w * 0.28;
      const wire = new THREE.Mesh(wireGeo, mats.goldPlating);
      wire.position.set(wx, 3.25, 0);
      wire.userData.noEdges = true;
      g.add(wire);
    }

    // Carbon mounting beam holding the 300mm ingot pressing down through the wire web into 1,000+ wafers!
    const beam = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 0.85, 1.4, 0.18, 0.05, 'y'),
      mats.pyroGraphite
    );
    beam.position.set(0, 6.2, 0);
    g.add(beam);

    // Sliced stack of thin 850–950µm discs emerging underneath the wire web!
    const sliceGeo = hiResCyl(1.55, 1.55, 0.13, 18);
    sliceGeo.rotateZ(Math.PI / 2);
    for (let s = 0; s < 15; s++) {
      const disc = new THREE.Mesh(sliceGeo, s % 2 === 0 ? mats.sinteredSilver : mats.siliconSensorDie);
      disc.position.set(-2.45 + s * 0.35, 4.25, 0);
      disc.userData.noEdges = true;
      g.add(disc);
    }

    // Vertical feed gantry posts
    for (const sx of [-3.7, 3.7]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.65, 6.8, 1.2), mats.stainlessMachined);
      col.position.set(sx, 3.55, 0);
      g.add(col);
    }

    parts.push(
      finalizeVol2Part(
        'fab2-multiwire-saw-slicing',
        20,
        '#06b6d4',
        g,
        new THREE.Vector3(38.5, 0.5, -2.0),
        new THREE.Vector3(12, 12, -2),
        cp
      )
    );
  }

  // F2-21: Beam Debonding, Ultrasonic Pre-Clean & Laser T7 ID Marking (P01-036–037)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.vcWorkingFluidCyan));

    // Ultrasonic warm-water surfactant debond bath holding wafer cassette
    const tank = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 2.4, 4.2, 0.25, 0.06, 'y'),
      mats.coverGlass
    );
    tank.position.set(-2.2, 1.35, -0.4);
    g.add(tank);
    const bathWater = new THREE.Mesh(new THREE.BoxGeometry(3.1, 1.75, 3.6), mats.vcWorkingFluidCyan);
    bathWater.position.set(-2.2, 1.25, -0.4);
    bathWater.userData.noEdges = true;
    g.add(bathWater);

    // Wafer on precision Laser T7 ID Marking stage (right)
    const idWafer = makeWaferDisc(2.25, 0.28, mats.siliconBulk, mats.stainlessMachined);
    idWafer.position.set(2.0, 1.15, 0.6);
    g.add(idWafer);
    // Glowing golden laser-inscribed T7 barcode strip near edge!
    const t7Mark = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.28), mats.goldPlating);
    t7Mark.position.set(2.0, 1.35, 2.35);
    t7Mark.userData.noEdges = true;
    g.add(t7Mark);

    // Overhead UV laser marking head + OCR verifier camera
    const laserTower = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.2, 1.4), mats.matteBlackAnodized);
    laserTower.position.set(2.0, 4.8, 2.2);
    g.add(laserTower);
    const beam = new THREE.Mesh(hiResCyl(0.08, 0.12, 2.2, 8), mats.bodyRecRed);
    beam.position.set(2.0, 2.45, 2.2);
    beam.userData.noEdges = true;
    g.add(beam);

    parts.push(
      finalizeVol2Part(
        'fab2-debond-laser-id',
        21,
        '#0891b2',
        g,
        new THREE.Vector3(49.5, 0.5, -2.0),
        new THREE.Vector3(14, 9, -2),
        cp
      )
    );
  }

  // ===========================================================================
  // BLOCK 1-E: BEVELING, GRINDING, ETCHING, DSP & ATOMIC CMP (P01-038–046)
  // Front-Left Row: Z = +18.0, X = -49.5, -38.5, -27.5, -16.5, -5.5
  // ===========================================================================

  // F2-22: Edge Beveling & Double-Side Planar Grinding (P01-038–039)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.cfaGreen));

    // Left: Edge beveling turntable + grooved diamond bevel wheel rounding wafer rim
    const bevWafer = makeWaferDisc(2.15, 0.34, mats.siliconBulk, mats.goldPlating);
    bevWafer.position.set(-2.1, 1.45, 0.8);
    g.add(bevWafer);
    const bevWheel = new THREE.Mesh(hiResCyl(0.85, 0.85, 0.55, 16), mats.tungstenCopper);
    bevWheel.position.set(-2.1, 1.55, -1.9);
    g.add(bevWheel);

    // Right: Opposing Twin-Spindle Double-Side Grinding (DISCO/Okamoto -> ~800µm TTV flat!)
    const grindWafer = makeWaferDisc(2.15, 0.28, mats.sinteredSilver, mats.stainlessMachined);
    grindWafer.position.set(2.1, 3.1, 0.4);
    g.add(grindWafer);
    const topCup = new THREE.Mesh(hiResCyl(1.75, 1.95, 0.85, 18), mats.matteBlackAnodized);
    topCup.position.set(2.1, 4.6, 0.4);
    g.add(topCup);
    const botCup = new THREE.Mesh(hiResCyl(1.95, 1.75, 0.85, 18), mats.matteBlackAnodized);
    botCup.position.set(2.1, 1.6, 0.4);
    g.add(botCup);
    const spinTop = new THREE.Mesh(hiResCyl(0.52, 0.52, 2.2, 12), mats.stainlessMachined);
    spinTop.position.set(2.1, 6.1, 0.4);
    g.add(spinTop);

    parts.push(
      finalizeVol2Part(
        'fab2-edge-bevel-grinding',
        22,
        '#10b981',
        g,
        new THREE.Vector3(-49.5, 0.5, 18.0),
        new THREE.Vector3(-14, 8, 12),
        cp
      )
    );
  }

  // F2-23: Chemical Damage Etching (20–40µm) & 650°C Donor Killer Furnace (P01-040–041)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.cfaGreen));

    // Left: Alkaline (KOH/NaOH) / Acid (HF+HNO3) Chemical Etch Bath dissolving 20–40µm damage!
    const etchBath = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 2.5, 4.6, 0.22, 0.06, 'y'),
      mats.zifIvoryPlastic
    );
    etchBath.position.set(-2.2, 1.4, 0.4);
    g.add(etchBath);
    const chemPool = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.45, 4.0), mats.cfaGreen);
    chemPool.position.set(-2.2, 2.55, 0.4);
    chemPool.userData.noEdges = true;
    g.add(chemPool);
    for (let i = 0; i < 4; i++) {
      const w = new THREE.Mesh(hiResCyl(1.1, 1.1, 0.14, 14), mats.sinteredSilver);
      w.rotation.x = Math.PI / 2;
      w.position.set(-2.2, 2.4, -0.8 + i * 0.78);
      w.userData.noEdges = true;
      g.add(w);
    }

    // Right: KOKUSAI ELECTRIC Vertical Quartz Thermal-Donor Annihilation Furnace (600–700°C!)
    const tube = new THREE.Mesh(hiResCyl(1.85, 1.85, 6.8, 20), mats.quartzOlpf);
    tube.position.set(2.1, 4.2, -0.2);
    g.add(tube);
    // Glowing 650°C amber resistance coils wrapping vertical quartz tube
    for (let c = 0; c < 6; c++) {
      const coil = new THREE.Mesh(hiResTorus(1.98, 0.12, 6, 20), mats.cinnabarAnodized);
      coil.rotation.x = Math.PI / 2;
      coil.position.set(2.1, 1.6 + c * 1.0, -0.2);
      coil.userData.noEdges = true;
      g.add(coil);
    }
    // Wafer boat stacked inside tube
    for (let b = 0; b < 5; b++) {
      const bw = new THREE.Mesh(hiResCyl(1.35, 1.35, 0.16, 14), mats.siliconSensorDie);
      bw.position.set(2.1, 2.1 + b * 1.0, -0.2);
      bw.userData.noEdges = true;
      g.add(bw);
    }

    parts.push(
      finalizeVol2Part(
        'fab2-chem-etch-donor-killer',
        23,
        '#059669',
        g,
        new THREE.Vector3(-38.5, 0.5, 18.0),
        new THREE.Vector3(-10, 9, 12),
        cp
      )
    );
  }

  // F2-24: Edge Mirror Polishing & Planetary Double-Side Polishing DSP (775µm / SFQR<15nm) (P01-042–043)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.2, 9.8, 1.2, mats, mats.cfaGreen));

    // Lower giant planetary polishing platen + blue polyurethane pad
    const lowerPlaten = new THREE.Mesh(hiResCyl(3.9, 4.0, 1.05, 26), mats.stainlessMachined);
    lowerPlaten.position.set(0, 0.72, 0.2);
    g.add(lowerPlaten);
    const lowerPad = new THREE.Mesh(hiResCyl(3.75, 3.75, 0.25, 26), mats.mountShimBlue);
    lowerPad.position.set(0, 1.35, 0.2);
    lowerPad.userData.noEdges = true;
    g.add(lowerPad);

    // 4 Planetary carrier discs holding 300mm wafers around central sun gear!
    const sunGear = new THREE.Mesh(hiResCyl(0.75, 0.75, 0.65, 14), mats.brassGear);
    sunGear.position.set(0, 1.75, 0.2);
    g.add(sunGear);
    for (let k = 0; k < 4; k++) {
      const ang = (k * Math.PI) / 2 + Math.PI / 4;
      const carrier = new THREE.Mesh(hiResCyl(1.22, 1.22, 0.22, 16), mats.sinteredSilver);
      carrier.position.set(Math.cos(ang) * 2.15, 1.66, 0.2 + Math.sin(ang) * 2.15);
      g.add(carrier);
      const w = new THREE.Mesh(hiResCyl(0.95, 0.95, 0.26, 16), mats.siliconSensorDie);
      w.position.set(Math.cos(ang) * 2.15, 1.72, 0.2 + Math.sin(ang) * 2.15);
      w.userData.noEdges = true;
      g.add(w);
    }

    // Elevated upper opposing polishing platen (lifted slightly so planetary wafers shine through!)
    const upperPad = new THREE.Mesh(hiResCyl(3.75, 3.75, 0.28, 26), mats.mountShimBlue);
    upperPad.position.set(0, 4.15, 0.2);
    g.add(upperPad);
    const upperPlaten = new THREE.Mesh(hiResCyl(3.9, 3.9, 0.95, 26), mats.stainlessMachined);
    upperPlaten.position.set(0, 4.78, 0.2);
    g.add(upperPlaten);
    const mainShaft = new THREE.Mesh(hiResCyl(0.85, 0.85, 2.2, 14), mats.matteBlackAnodized);
    mainShaft.position.set(0, 6.25, 0.2);
    g.add(mainShaft);

    // FUJIMI Colloidal Silica alkaline slurry dispenser line
    const slurryPipe = new THREE.Mesh(hiResCyl(0.22, 0.22, 4.4, 8), mats.zifIvoryPlastic);
    slurryPipe.position.set(-3.4, 4.6, -2.8);
    g.add(slurryPipe);

    parts.push(
      finalizeVol2Part(
        'fab2-edge-mirror-dsp',
        24,
        '#0d9488',
        g,
        new THREE.Vector3(-27.5, 0.5, 18.0),
        new THREE.Vector3(-6, 11, 12),
        cp
      )
    );
  }

  // F2-25: Final Finish Single-Side CMP — Ra < 0.1nm (< 1 Atom Step!) (P01-044)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.vcWorkingFluidCyan));

    // Precision single-side CMP platen with ultra-fine pad & gimbal polishing carrier head
    const platen = new THREE.Mesh(hiResCyl(3.55, 3.65, 1.15, 26), mats.stainlessMachined);
    platen.position.set(0, 0.78, 0.6);
    g.add(platen);
    const finePad = new THREE.Mesh(hiResCyl(3.4, 3.4, 0.22, 26), mats.vcWorkingFluidCyan);
    finePad.position.set(0, 1.45, 0.6);
    finePad.userData.noEdges = true;
    g.add(finePad);

    // Gimbal carrier head & swing arm
    const head = new THREE.Mesh(hiResCyl(1.65, 1.85, 1.05, 20), mats.matteBlackAnodized);
    head.position.set(0.95, 2.15, 0.8);
    g.add(head);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.55, 0.9), mats.stainlessMachined);
    arm.position.set(2.2, 3.45, -0.6);
    arm.rotation.y = 0.45;
    g.add(arm);
    const pillar = new THREE.Mesh(hiResCyl(0.65, 0.72, 4.2, 14), mats.titaniumRivet);
    pillar.position.set(3.2, 2.2, -2.4);
    g.add(pillar);

    // Elevated Atomic-Mirror Wafer Showcase hovering above platen illustrating Ra < 0.1nm!
    const mirrorWafer = makeWaferDisc(2.55, 0.28, mats.nanoArIridescent, mats.sinteredSilver);
    mirrorWafer.rotation.x = 0.22;
    mirrorWafer.position.set(-0.6, 5.4, 0.2);
    g.add(mirrorWafer);

    parts.push(
      finalizeVol2Part(
        'fab2-final-finish-cmp',
        25,
        '#06b6d4',
        g,
        new THREE.Vector3(-16.5, 0.5, 18.0),
        new THREE.Vector3(-3, 12, 12),
        cp
      )
    );
  }

  // F2-26: Post-CMP Multi-Stage RCA Clean (SC-1/SC-2 + 1MHz Megasonic) & PW Check (P01-045–046)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.vcWorkingFluidCyan));

    // Dual SC-1 (NH4OH+H2O2) & SC-2 (HCl+H2O2) Clean Wet Chambers
    for (let s = 0; s < 2; s++) {
      const box = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 2.4, 3.6, 0.22, 0.06, 'y'),
        mats.coverGlass
      );
      box.position.set(-2.1 + s * 4.2, 1.4, -1.6);
      g.add(box);
      const liq = new THREE.Mesh(
        new THREE.BoxGeometry(3.1, 1.45, 3.1),
        s === 0 ? mats.vcWorkingFluidCyan : mats.mountShimBlue
      );
      liq.position.set(-2.1 + s * 4.2, 1.15, -1.6);
      liq.userData.noEdges = true;
      g.add(liq);
    }

    // 1MHz Megasonic quartz ultrasonic wave horn above SC-1 bath
    const megaHorn = new THREE.Mesh(hiResCyl(0.32, 0.85, 2.6, 14), mats.goldPlating);
    megaHorn.position.set(-2.1, 4.1, -1.6);
    g.add(megaHorn);

    // Front Pre-Epi Polished Wafer (PW) Laser Surface Inspection Deck (20–30nm LPD)
    const pwWafer = makeWaferDisc(2.35, 0.25, mats.ultra.fab2LpdDefectMap, mats.stainlessMachined);
    pwWafer.position.set(0, 0.65, 2.3);
    g.add(pwWafer);
    const pwLaser = new THREE.Mesh(hiResCyl(0.32, 0.32, 1.6, 10), mats.makeupSealViolet);
    pwLaser.rotation.z = 0.62;
    pwLaser.position.set(-2.4, 2.75, 2.3);
    g.add(pwLaser);

    parts.push(
      finalizeVol2Part(
        'fab2-rca-megasonic-pw-check',
        26,
        '#0ea5e9',
        g,
        new THREE.Vector3(-5.5, 0.5, 18.0),
        new THREE.Vector3(0, 9, 12),
        cp
      )
    );
  }

  // ===========================================================================
  // BLOCK 1-F: CIS-EXCLUSIVE MOLECULAR ION GETTERING & EPI GROWTH (P01-047–053)
  // Front-Right Row: Z = +18.0, X = +5.5, +16.5, +27.5, +38.5, +49.5
  // ===========================================================================

  // F2-27: Backside Oxide Seal (Autodoping Guard) & Pre-Epi DHF Clean (P01-047, P01-049)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.makeupSealViolet));

    // Left: Low-Temp CVD Backside SiO2 Seal Chuck (blocks boron autodoping at 1,100°C!)
    const cvdChuck = new THREE.Mesh(hiResCyl(2.1, 2.2, 1.4, 18), mats.matteBlackAnodized);
    cvdChuck.position.set(-2.1, 0.9, -0.6);
    g.add(cvdChuck);
    const sealedWafer = makeWaferDisc(1.95, 0.28, mats.ftiOxide, mats.goldPlating);
    sealedWafer.position.set(-2.1, 1.78, -0.6);
    g.add(sealedWafer);
    const showerHead = new THREE.Mesh(hiResCyl(2.0, 1.7, 0.95, 18), mats.stainlessMachined);
    showerHead.position.set(-2.1, 3.6, -0.6);
    g.add(showerHead);

    // Right: Single-Wafer Spin DHF (Dilute HF) Chamber stripping ~1nm native oxide -> H-terminated!
    const spinBowl = new THREE.Mesh(hiResCyl(2.35, 2.15, 2.1, 20), mats.zifIvoryPlastic);
    spinBowl.position.set(2.1, 1.2, 0.8);
    g.add(spinBowl);
    const spinWafer = makeWaferDisc(1.85, 0.24, mats.siliconSensorDie, mats.sinteredSilver);
    spinWafer.position.set(2.1, 2.32, 0.8);
    g.add(spinWafer);
    const dhfNozzle = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.24, 0.28), mats.vcWorkingFluidCyan);
    dhfNozzle.position.set(2.7, 3.4, 0.8);
    g.add(dhfNozzle);

    parts.push(
      finalizeVol2Part(
        'fab2-backside-seal-preclean',
        27,
        '#8b5cf6',
        g,
        new THREE.Vector3(5.5, 0.5, 18.0),
        new THREE.Vector3(3, 8, 12),
        cp
      )
    );
  }

  // F2-28: CIS-Exclusive Molecular Ion Implanter (C3H5+ / SiHx + C2Hy) (P01-048)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.2, 9.8, 1.2, mats, mats.makeupSealViolet));

    // Molecular Ion Source Box (Rear-Left)
    const ionSrc = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.6, 2.6, 0.26, 0.08, 'y'),
      mats.matteBlackAnodized
    );
    ionSrc.position.set(-2.8, 4.8, -2.4);
    g.add(ionSrc);

    // 90° Mass-Analyzing Bending Electromagnet Arc (separates exact C3H5+ / SiHx / C2Hy mass!)
    const analyzer = new THREE.Mesh(hiResTorus(2.4, 0.68, 10, 20, Math.PI * 0.55), mats.makeupSealViolet);
    analyzer.rotation.x = Math.PI / 2;
    analyzer.position.set(-0.6, 4.8, -2.4);
    g.add(analyzer);

    // Electrostatic Acceleration Column (tens of keV) & Scanning Ribbon Beam Funnel
    const accelCol = new THREE.Mesh(hiResCyl(0.88, 1.15, 2.8, 16), mats.goldPlating);
    accelCol.position.set(1.8, 4.5, -0.4);
    g.add(accelCol);
    // Glowing magenta molecular-ion beam cone illuminating spinning 300mm wafer!
    const beamCone = new THREE.Mesh(hiResCyl(0.45, 2.35, 2.4, 18), mats.makeupSealViolet);
    beamCone.position.set(1.8, 2.15, 0.8);
    beamCone.userData.noEdges = true;
    g.add(beamCone);

    // Spinning 300mm Wafer Process End-Station
    const endPlaten = new THREE.Mesh(hiResCyl(2.75, 2.9, 0.85, 22), mats.stainlessMachined);
    endPlaten.position.set(1.8, 0.55, 1.2);
    g.add(endPlaten);
    const targetWafer = makeWaferDisc(2.45, 0.26, mats.siliconSensorDie, mats.goldPlating);
    targetWafer.position.set(1.8, 1.12, 1.2);
    g.add(targetWafer);

    parts.push(
      finalizeVol2Part(
        'fab2-molecular-ion-implanter',
        28,
        '#a855f7',
        g,
        new THREE.Vector3(16.5, 0.5, 18.0),
        new THREE.Vector3(6, 11, 12),
        cp
      )
    );
  }

  // F2-29: CROWN-JEWEL 2026 SUMCO 5nm CI-Complex Proximity Gettering Atomic Cutaway! (P01-048 Deep Dive)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.4, 9.8, 1.2, mats, mats.goldPlating));

    // Bottom Slab: P+ Czochralski Bulk Silicon Substrate
    const bulkSub = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.75, 6.4, 0.28, 0.08, 'y'),
      mats.siliconBulk
    );
    bulkSub.position.set(0, 1.05, 0);
    g.add(bulkSub);

    // MIDDLE CROWN-JEWEL LAYER: Ultra-Thin ~5nm CI-Complex Proximity Gettering Sheet!
    // (C3H5+ / SiHx+C2Hy -> Carbon-Interstitial Silicon Complexes trapping Cu 9.7x10^12/cm^2!)
    const getteringSheet = new THREE.Mesh(
      createChamferedBoxGeo(7.72, 1.05, 6.52, 0.24, 0.06, 'y'),
      mats.goldPlating
    );
    getteringSheet.position.set(0, 2.55, 0);
    g.add(getteringSheet);

    // Dense array of ~5nm CI-Complex atomic clusters (violet) locking wandering red Cu/Fe metal atoms!
    const ciGeo = hiResSphere(0.34, 8, 6);
    const metalGeo = hiResSphere(0.22, 6, 5);
    const h2Geo = hiResSphere(0.18, 6, 5);
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const cx = ix * 1.45;
        const cz = iz * 1.85;
        const ciCluster = new THREE.Mesh(ciGeo, mats.makeupSealViolet);
        ciCluster.position.set(cx, 3.25, cz);
        ciCluster.userData.noEdges = true;
        g.add(ciCluster);
        // Captured Cu/Fe red/copper impurity spheres locked tightly onto the CI trap!
        const cuAtom = new THREE.Mesh(metalGeo, mats.bodyRecRed);
        cuAtom.position.set(cx + 0.34, 3.15, cz + 0.24);
        cuAtom.userData.noEdges = true;
        g.add(cuAtom);
      }
    }

    // Floating TOP SLAB: Defect-Free Photodiode Epitaxial Silicon Layer (4–10µm, White Spots -32%, Dark Current -13%!)
    const epiLayer = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 2.35, 6.4, 0.28, 0.08, 'y'),
      mats.vcWorkingFluidCyan
    );
    epiLayer.position.set(0, 5.25, 0);
    g.add(epiLayer);

    // Top SiO2/Si interface gate dielectric with rising cyan H2 passivation spheres healing dangling bonds!
    const oxideCap = new THREE.Mesh(
      createChamferedBoxGeo(7.65, 0.38, 6.45, 0.2, 0.04, 'y'),
      mats.coverGlass
    );
    oxideCap.position.set(0, 6.7, 0);
    g.add(oxideCap);
    for (let h = 0; h < 6; h++) {
      const hOrb = new THREE.Mesh(h2Geo, mats.fluorineCoatCyan);
      hOrb.position.set(-2.8 + h * 1.12, 6.95, ((h % 2) - 0.5) * 2.2);
      hOrb.userData.noEdges = true;
      g.add(hOrb);
    }

    // 4 Corner precision acrylic risers suspending the clean Epi layer above the CI trap sheet
    const postGeo = hiResCyl(0.16, 0.16, 4.4, 8);
    for (const sx of [-3.4, 3.4]) {
      for (const sz of [-2.8, 2.8]) {
        const post = new THREE.Mesh(postGeo, mats.stainlessMachined);
        post.position.set(sx, 3.4, sz);
        post.userData.noEdges = true;
        g.add(post);
      }
    }

    parts.push(
      finalizeVol2Part(
        'fab2-ci-complex-gettering-cutaway',
        29,
        '#d946ef',
        g,
        new THREE.Vector3(27.5, 0.5, 18.0),
        new THREE.Vector3(9, 14, 14),
        cp
      )
    );
  }

  // F2-30: Single-Wafer Epitaxial Reactor — In-Situ H2 Bake & 4–10µm Zero-COP Epi (P01-050–051)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.2, 9.8, 1.2, mats, mats.makeupSealViolet));

    // Cutaway AMAT Centura / ASM Epsilon quartz-dome radiant single-wafer epi chamber!
    const lowerChamber = new THREE.Mesh(hiResCyl(3.6, 3.8, 1.65, 22), mats.stainlessMachined);
    lowerChamber.position.set(0, 1.0, 0);
    g.add(lowerChamber);

    // Upper & lower glowing radiant halogen lamp banks (1,050–1,150°C!)
    for (let l = 0; l < 6; l++) {
      const ang = (l / 6) * Math.PI * 2;
      const lamp = new THREE.Mesh(hiResCyl(0.24, 0.24, 2.2, 8), mats.goldPlating);
      lamp.rotation.z = Math.PI / 2;
      lamp.rotation.y = ang;
      lamp.position.set(Math.cos(ang) * 1.9, 5.4, Math.sin(ang) * 1.9);
      lamp.userData.noEdges = true;
      g.add(lamp);
    }

    // Translucent quartz dome enclosing rotating black SiC susceptor + 300mm CIS Epi Wafer!
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(3.45, 22, 12, 0.35, Math.PI * 1.65, 0, Math.PI * 0.52),
      mats.quartzOlpf
    );
    dome.scale.y = 0.72;
    dome.position.set(0, 2.0, 0);
    g.add(dome);

    const sicSusceptor = new THREE.Mesh(hiResCyl(2.75, 2.65, 0.42, 22), mats.pyroGraphite);
    sicSusceptor.position.set(0, 2.35, 0);
    g.add(sicSusceptor);
    const epiWafer = makeWaferDisc(2.45, 0.28, mats.nanoArIridescent, mats.sinteredSilver);
    epiWafer.position.set(0, 2.75, 0);
    g.add(epiWafer);

    // Laminar TCS + H2 + Dopant side gas-injector flange & exhaust plenum
    const injector = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.1, 3.2), mats.vcWorkingFluidCyan);
    injector.position.set(-3.7, 2.8, 0);
    g.add(injector);
    const exhaust = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.1, 3.2), mats.copperHeatSpreader);
    exhaust.position.set(3.7, 2.8, 0);
    g.add(exhaust);

    // Top lamp reflector cap
    const cap = new THREE.Mesh(hiResCyl(3.5, 3.7, 0.85, 22), mats.goldPlating);
    cap.position.set(0, 6.2, 0);
    g.add(cap);

    parts.push(
      finalizeVol2Part(
        'fab2-single-wafer-epi-reactor',
        30,
        '#c026d3',
        g,
        new THREE.Vector3(38.5, 0.5, 18.0),
        new THREE.Vector3(12, 12, 12),
        cp
      )
    );
  }

  // F2-31: Double-Epi P+ BSI Etch-Stop Stack & Post-Epi Ozone Protective Veil Clean (P01-052–053)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(9.0, 9.6, 1.2, mats, mats.makeupSealViolet));

    // Left: Stepped Double-Epi / Graded Profile Architectural Cutaway (Substrate -> P+ Etch-Stop -> Epi1 -> Epi2)
    const layers: [number, number, THREE.Material][] = [
      [0.8, 1.1, mats.siliconBulk],
      [1.75, 0.65, mats.cinnabarAnodized], // High-concentration P+ BSI etch-stop barrier!
      [2.65, 1.0, mats.siliconPhotodiode],
      [3.85, 1.15, mats.vcWorkingFluidCyan], // Thick 4–10µm graded photodiode epi
      [4.7, 0.35, mats.coverGlass], // Ultra-clean ozone chemical-oxide protective veil
    ];
    for (let i = 0; i < layers.length; i++) {
      const [ly, lh, mat] = layers[i];
      const w = 3.8 - i * 0.24;
      const slab = new THREE.Mesh(createChamferedBoxGeo(w, lh, 3.8 - i * 0.24, 0.16, 0.04, 'y'), mat);
      slab.position.set(-1.9, ly, -0.6);
      g.add(slab);
    }

    // Right: Cooling Chamber & Ozone/UPW Anti-Static Final Rinse Module
    const coolChamber = new THREE.Mesh(hiResCyl(1.95, 2.05, 3.4, 18), mats.stainlessMachined);
    coolChamber.position.set(2.2, 1.85, 0.8);
    g.add(coolChamber);
    const o3Ring = new THREE.Mesh(hiResTorus(1.85, 0.22, 8, 20), mats.fluorineCoatCyan);
    o3Ring.rotation.x = Math.PI / 2;
    o3Ring.position.set(2.2, 3.7, 0.8);
    g.add(o3Ring);
    const coolWafer = makeWaferDisc(1.65, 0.22, mats.ultra.fab2NanotopoMap, mats.sinteredSilver);
    coolWafer.position.set(2.2, 4.15, 0.8);
    g.add(coolWafer);

    parts.push(
      finalizeVol2Part(
        'fab2-double-epi-post-clean',
        31,
        '#9333ea',
        g,
        new THREE.Vector3(49.5, 0.5, 18.0),
        new THREE.Vector3(14, 9, 12),
        cp
      )
    );
  }

  // ===========================================================================
  // BLOCK 1-G: NANO METROLOGY, 25-WAFER FOSB & LOGISTICS (P01-054–060)
  // Lower ISO Class 1 Metrology Sub-Deck: Y = -12.5, Z = +10.0, X = -40..+40
  // ===========================================================================

  // F2-32: KLA Surfscan SP Oblique Laser 19–30nm LPD Full Inspection (P01-054)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(14.0, 12.0, 1.1, mats, mats.mountShimBlue));

    // Precision granite anti-vibration stage & 300mm LPD defect-mapped wafer!
    const stage = new THREE.Mesh(hiResCyl(4.5, 4.7, 0.85, 28), mats.matteBlackAnodized);
    stage.position.set(-1.2, 0.62, 0.4);
    g.add(stage);
    const lpdWafer = makeWaferDisc(4.2, 0.3, mats.ultra.fab2LpdDefectMap, mats.stainlessMachined);
    lpdWafer.position.set(-1.2, 1.2, 0.4);
    g.add(lpdWafer);

    // Dual hemispherical dark-field scattering collector domes & blue-violet laser emitter!
    const arch = new THREE.Mesh(hiResTorus(4.5, 0.42, 10, 24, Math.PI), mats.stainlessMachined);
    arch.position.set(-1.2, 1.6, 0.4);
    g.add(arch);
    const collector = new THREE.Mesh(hiResSphere(1.55, 16, 10), mats.mountShimBlue);
    collector.scale.y = 0.58;
    collector.position.set(-1.2, 4.9, 0.4);
    g.add(collector);
    const laserGun = new THREE.Mesh(hiResCyl(0.38, 0.38, 2.2, 12), mats.makeupSealViolet);
    laserGun.rotation.z = 0.85;
    laserGun.position.set(3.6, 3.6, 0.4);
    g.add(laserGun);

    // Side dark-field control console
    const consoleBox = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 4.2, 4.6, 0.25, 0.08, 'y'),
      mats.invarScaleBar
    );
    consoleBox.position.set(4.8, 2.25, -1.6);
    g.add(consoleBox);

    parts.push(
      finalizeVol2Part(
        'fab2-surfscan-lpd-inspection',
        32,
        '#2563eb',
        g,
        new THREE.Vector3(-40, -12.5, 10.0),
        new THREE.Vector3(-12, -10, 12),
        cp
      )
    );
  }

  // F2-33: KLA WaferSight Nanotopography & FTIR/Eddy Epi Mapping (P01-055–056)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(14.0, 12.0, 1.1, mats, mats.vcWorkingFluidCyan));

    // Vertical dual-sided Fizeau optical interferometer holding wafer vertically between twin glass flats!
    const leftFlat = new THREE.Mesh(hiResCyl(3.4, 3.4, 0.55, 24), mats.coverGlass);
    leftFlat.rotation.z = Math.PI / 2;
    leftFlat.position.set(-3.4, 3.8, 0.2);
    g.add(leftFlat);
    const rightFlat = new THREE.Mesh(hiResCyl(3.4, 3.4, 0.55, 24), mats.coverGlass);
    rightFlat.rotation.z = Math.PI / 2;
    rightFlat.position.set(0.2, 3.8, 0.2);
    g.add(rightFlat);

    // Vertical nanotopography rainbow-mapped 300mm wafer clamped at 3 edge pins!
    const vertWafer = makeWaferDisc(3.25, 0.26, mats.ultra.fab2NanotopoMap, mats.goldPlating);
    vertWafer.rotation.z = -Math.PI / 2;
    vertWafer.position.set(-1.6, 3.8, 0.2);
    g.add(vertWafer);

    // Right: FTIR & Non-Contact Eddy-Current Multi-Point Epi Thickness/Resistivity Scanner
    const ftirStage = new THREE.Mesh(hiResCyl(2.55, 2.65, 0.85, 20), mats.matteBlackAnodized);
    ftirStage.position.set(3.8, 0.6, 1.2);
    g.add(ftirStage);
    const ftirWafer = makeWaferDisc(2.35, 0.24, mats.ultra.fab2NanotopoMap, mats.stainlessMachined);
    ftirWafer.position.set(3.8, 1.18, 1.2);
    g.add(ftirWafer);
    const ftirHead = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.4, 1.6), mats.vcWorkingFluidCyan);
    ftirHead.position.set(3.8, 3.6, 1.2);
    g.add(ftirHead);

    parts.push(
      finalizeVol2Part(
        'fab2-wafersight-epi-mapping',
        33,
        '#06b6d4',
        g,
        new THREE.Vector3(-20, -12.5, 10.0),
        new THREE.Vector3(-6, -12, 12),
        cp
      )
    );
  }

  // F2-34: VPD-ICP-MS Trace Metal (<10^9/cm^2), μ-PCD & Edge/Backside Hotspot Guard (P01-057–058)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(14.0, 12.0, 1.1, mats, mats.bodyRecRed));

    // Left: VPD-ICP-MS Vapor-Phase Decomposition droplet-scanning trace metal analyzer
    const vpdWafer = makeWaferDisc(2.85, 0.26, mats.siliconSensorDie, mats.stainlessMachined);
    vpdWafer.position.set(-3.2, 1.15, 0.2);
    g.add(vpdWafer);
    // HF-vapor droplet & robotic scanning pipette + plasma ICP-MS torch!
    const droplet = new THREE.Mesh(hiResSphere(0.42, 10, 8), mats.vcWorkingFluidCyan);
    droplet.scale.y = 0.65;
    droplet.position.set(-2.6, 1.5, 0.6);
    droplet.userData.noEdges = true;
    g.add(droplet);
    const icpTorch = new THREE.Mesh(hiResCyl(0.58, 0.58, 3.6, 14), mats.quartzOlpf);
    icpTorch.position.set(-3.2, 4.2, -2.4);
    g.add(icpTorch);
    const plasmaCore = new THREE.Mesh(hiResCyl(0.32, 0.32, 1.8, 10), mats.makeupSealViolet);
    plasmaCore.position.set(-3.2, 4.8, -2.4);
    plasmaCore.userData.noEdges = true;
    g.add(plasmaCore);

    // Right: Backside Particle "Hotspot" Vacuum-Chuck Defocus Warning Model + Edge Optical Camera!
    const chuck = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 1.15, 5.2, 0.28, 0.08, 'y'),
      mats.matteBlackAnodized
    );
    chuck.position.set(3.2, 0.72, 0.6);
    g.add(chuck);
    // Single rogue backside particle causing localized wafer dome bump ("Hotspot" defocus!)
    const rogueDust = new THREE.Mesh(hiResSphere(0.42, 8, 6), mats.bodyRecRed);
    rogueDust.position.set(3.2, 1.55, 0.6);
    rogueDust.userData.noEdges = true;
    g.add(rogueDust);
    const waferSpan = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 0.26, 4.6, 0.2, 0.04, 'y'),
      mats.sinteredSilver
    );
    waferSpan.position.set(3.2, 2.05, 0.6);
    g.add(waferSpan);
    const hotspotDome = new THREE.Mesh(hiResSphere(1.15, 14, 8), mats.cinnabarAnodized);
    hotspotDome.scale.y = 0.42;
    hotspotDome.position.set(3.2, 2.25, 0.6);
    hotspotDome.userData.noEdges = true;
    g.add(hotspotDome);
    // Edge/Backside multi-angle inspection camera gantry
    const camHead = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 1.6), mats.goldPlating);
    camHead.position.set(3.2, 4.8, 0.6);
    g.add(camHead);

    parts.push(
      finalizeVol2Part(
        'fab2-vpd-icpms-edge-check',
        34,
        '#f43f5e',
        g,
        new THREE.Vector3(0, -12.5, 10.0),
        new THREE.Vector3(0, -14, 12),
        cp
      )
    );
  }

  // F2-35: ISO Class 1–2 Clean Robot & 25-Wafer Hermetic N2 FOSB Cassette (P01-059)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(14.0, 12.0, 1.1, mats, mats.cfaGreen));

    // Cutaway 25-Wafer Polycarbonate FOSB (Shin-Etsu Polymer / Miraial, ISO Class 1–2, N2 Purge!)
    const fosbBack = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 5.8, 1.1, 0.28, 0.08, 'y'),
      mats.zifIvoryPlastic
    );
    fosbBack.position.set(-2.4, 3.05, -2.6);
    g.add(fosbBack);
    for (const sx of [-5.4, 0.6]) {
      const side = new THREE.Mesh(
        createChamferedBoxGeo(0.7, 5.8, 5.8, 0.22, 0.06, 'y'),
        mats.coverGlass
      );
      side.position.set(sx, 3.05, 0.1);
      g.add(side);
    }
    const fosbRoof = new THREE.Mesh(
      createChamferedBoxGeo(6.8, 0.62, 6.2, 0.28, 0.08, 'y'),
      mats.mountShimBlue
    );
    fosbRoof.position.set(-2.4, 6.1, 0.1);
    g.add(fosbRoof);

    // 13 visible gleaming mirror epi wafers stacked inside precision 25-slot blue combs!
    const slotGeo = hiResCyl(2.45, 2.45, 0.14, 20);
    for (let w = 0; w < 13; w++) {
      const wf = new THREE.Mesh(slotGeo, w % 2 === 0 ? mats.sinteredSilver : mats.nanoArIridescent);
      wf.position.set(-2.4, 0.95 + w * 0.38, 0.1);
      wf.userData.noEdges = true;
      g.add(wf);
    }
    // Top OHT robotic hoist mushroom flange & gold RFID tag
    const ohtFlange = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.65, 2.2), mats.matteBlackAnodized);
    ohtFlange.position.set(-2.4, 6.72, 0.1);
    g.add(ohtFlange);
    const rfidTag = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.22), mats.goldPlating);
    rfidTag.position.set(-2.4, 1.1, 3.1);
    g.add(rfidTag);

    // Articulated ISO Class 1 Wafer-Handling End-Effector Robot sliding the 25th wafer in touch-free!
    const robBase = new THREE.Mesh(hiResCyl(1.45, 1.65, 2.6, 16), mats.stainlessMachined);
    robBase.position.set(4.1, 1.45, 1.2);
    g.add(robBase);
    const robArm = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.35, 0.9), mats.invarScaleBar);
    robArm.position.set(1.8, 3.1, 1.6);
    robArm.rotation.y = 0.22;
    g.add(robArm);
    const loadWafer = makeWaferDisc(2.1, 0.18, mats.ultra.fab2NanotopoMap, mats.goldPlating);
    loadWafer.position.set(-0.2, 3.35, 2.2);
    g.add(loadWafer);

    parts.push(
      finalizeVol2Part(
        'fab2-fosb-25wafer-clean-load',
        35,
        '#10b981',
        g,
        new THREE.Vector3(20, -12.5, 10.0),
        new THREE.Vector3(6, -12, 12),
        cp
      )
    );
  }

  // F2-36: Air-Ride Shock/Temp-Logged Logistics & Sony/Canon Fab Receiving -> Vol.3 Bridge (P01-060)
  {
    const g = new THREE.Group();
    g.add(makeStationPlinth(14.0, 12.0, 1.1, mats, mats.goldPlating));

    // Vibration-damped cleanroom logistics crate on pneumatic isolators
    for (const sx of [-4.4, 0.2]) {
      for (const sz of [-2.4, 2.4]) {
        const isoPad = new THREE.Mesh(hiResCyl(0.65, 0.72, 0.75, 12), mats.damperElastomer);
        isoPad.position.set(sx, 0.52, sz);
        g.add(isoPad);
      }
    }
    const shipCrate = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 4.4, 6.2, 0.35, 0.1, 'y'),
      mats.stainlessMachined
    );
    shipCrate.position.set(-2.1, 3.1, 0);
    g.add(shipCrate);
    // Shock-G & Temp/Humidity Digital Telemetry Logger Module mounted on crate front
    const logger = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.4, 0.42), mats.matteBlackAnodized);
    logger.position.set(-2.1, 3.4, 3.25);
    g.add(logger);
    const loggerLed = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.55, 0.14), mats.cfaGreen);
    loggerLed.position.set(-2.1, 3.55, 3.48);
    loggerLed.userData.noEdges = true;
    g.add(loggerLed);

    // Receiving Fab Gate (Sony Kumamoto/Nagasaki/Oita & Canon Kawasaki/Hiratsuka/Ayase) -> Vol.3 Photomask Portal!
    const gateFrame = new THREE.Mesh(hiResTorus(2.85, 0.38, 10, 24), mats.goldPlating);
    gateFrame.rotation.y = Math.PI / 2;
    gateFrame.position.set(4.1, 3.6, 0);
    g.add(gateFrame);
    // Glowing miniature Photomask Reticle preview hovering inside the Vol.3 portal!
    const vol3Preview = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 3.4, 3.4, 0.14, 0.04, 'z'),
      mats.ultra.fabQuartzReticleMask
    );
    vol3Preview.position.set(4.1, 3.6, 0);
    g.add(vol3Preview);

    parts.push(
      finalizeVol2Part(
        'fab2-controlled-logistics-fab-bridge',
        36,
        '#f59e0b',
        g,
        new THREE.Vector3(40, -12.5, 10.0),
        new THREE.Vector3(12, -10, 12),
        cp
      )
    );
  }

  return parts;
}
