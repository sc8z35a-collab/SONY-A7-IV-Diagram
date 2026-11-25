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
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeDeepPixelV2Part(
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
    subsystem: 'micro_v2',
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

/** Connect two 3D points with a fine atomic covalent bond / micro-interconnect strut */
function makeBondStrut(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius: number,
  mat: THREE.Material,
  segs = 7
): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = Math.max(0.01, dir.length());
  const mesh = new THREE.Mesh(hiResCyl(radius, radius, len, segs), mat);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  mesh.userData.noEdges = true;
  return mesh;
}

/**
 * Build Phase 29 TEM/SEM-Grade Ultra-Sub-Nanometer & Atomic Reliability Expansion for Pixel V2
 * (`P2-31` – `P2-55`, strictly 25 parts -> 55 total Pixel V2 parts).
 *
 * Every single component is sculpted with authentic 2025–2026 research-verified physical micro-structures:
 * corner-sharing ABX3 perovskite octahedra + ETL/HTL + ITO fingers, plasmonic bullseye QDPD cavity,
 * suspended Si3N4 light-pipe with dual-tier spider struts, Bosch-scalloped 7.2/7.5um dual-depth GS DTI,
 * dual-axis sub-5nm vernier BSI fiducial, 4-tier corrugated W/TiN PLS hood, 3-layer Si(100) 2x1 dimer
 * + heavy Si-D deuterium monolayer, SUMCO double-epi C3H6/CH2P carbon bucky-cages catching Fe/Cu/Ni,
 * 20nm P+ boron acceptor skin, 5-terrace graded N-/N/N+ potential funnel, imec O* & H* radical-ox IL,
 * deep-epi D-VTG twin blades, 3D hyperbolic VOD saddle, PNAS SiO4 RTS E' vacancy cage + 2-level pulses,
 * Fossum QIS Pump-Gate Jot + PCH peaks, IEDM 2025 Ge-on-Si SAGCM 1550nm SWIR-SPAD, P+PNPP+ self-harvesting
 * PD, Sony-Prophesee 4-stage EVS pixel, imec 200nm W2W Cu/SiCN hybrid array, GS buried SN armor vault,
 * centroid-matched 16-cell Thermometer Ramp DAC, 16:1 TSPC/CML serializer with dual octagonal T-coils,
 * labyrinth-baffled OB dummy cell, double-moat cosmic/alpha guard ring, and common-centroid Dual-CDS bridge!
 */
export function buildMicroPixelV2DeepParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // TIER 1 — SUB-WAVELENGTH PEROVSKITE, QDPD-METASURFACE & DUAL-DEPTH DTI (P2-31 – P2-36)
  // =========================================================================

  // P2-31. 3-Layer Vertical Halide Perovskite Filterless RGB Stack (ETH Zurich / Empa 2025)
  {
    const g = new THREE.Group();
    const baseGeo = extrudeHiRes(createRoundedRectShape(4.6, 4.6, 0.5), 0.34, 0.05, 0.05, 2, 12);
    baseGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(baseGeo, 4.6, 4.6, 'xz');
    const basePlate = new THREE.Mesh(baseGeo, u.v2PixelPerovskiteStack);
    basePlate.position.y = -1.78;
    g.add(basePlate);

    // 3 vertically stacked filterless ABX3 perovskite bands (Red bottom 1.75eV, Green mid 2.15eV, Blue top 2.45eV)
    // with SnO2/NiOx ETL/HTL charge-transport interlayers, ITO micro-finger electrodes & corner-sharing PbX6 octahedra!
    const layerSpecs = [
      { y: -1.06, mat: mats.cfaRed, octMat: mats.bodyRecRed, halideMat: mats.goldPlating, penY: -0.78 },
      { y: 0.02, mat: mats.cfaGreen, octMat: u.batSocLedGlow, halideMat: mats.fluorineCoatCyan, penY: 0.28 },
      { y: 1.1, mat: mats.cfaBlue, octMat: mats.vcWorkingFluidCyan, halideMat: mats.silverElectrode, penY: 1.34 },
    ];
    const octaGeo = new THREE.OctahedronGeometry(0.32, 0);
    const halideGeo = hiResSphere(0.085, 7, 5);
    const cationGeo = hiResSphere(0.11, 8, 6);

    for (let li = 0; li < layerSpecs.length; li++) {
      const ls = layerSpecs[li];
      // SnO2 Electron Transport Layer (ETL) beneath + NiOx Hole Transport Layer (HTL) above each perovskite band
      const etl = new THREE.Mesh(
        createChamferedBoxGeo(3.68, 0.1, 3.68, 0.12, 0.02, 'y'),
        mats.aluminaHighKFilm
      );
      etl.position.y = ls.y - 0.36;
      etl.userData.noEdges = true;
      const slab = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.32, 3.6, 0.12, 0.04, 'y'),
        ls.mat
      );
      slab.position.y = ls.y - 0.14;
      g.add(etl, slab);

      // Transparent ITO readout frame + 3 interdigitated ITO micro-finger collector traces
      const itoRim = makeHiResHorizPlate(
        createFrameShape(3.96, 3.96, 0.24, 3.36, 3.36, 0.14),
        0.09,
        mats.quartzOlpf,
        0.02,
        1,
        10
      );
      itoRim.position.y = ls.y + 0.12;
      g.add(itoRim);
      for (const fz of [-1.05, 0, 1.05]) {
        const finger = new THREE.Mesh(
          new THREE.BoxGeometry(3.3, 0.04, 0.12),
          mats.silverElectrode
        );
        finger.position.set(0, ls.y + 0.13, fz);
        finger.userData.noEdges = true;
        g.add(finger);
      }

      // Stepped side gold contact tab wired to its dedicated vertical readout busbar
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(0.76, 0.14, 0.46, 0.03, 0.02, 'y'),
        mats.goldPlating
      );
      tab.position.set(2.14, ls.y + 0.12, (li - 1) * 0.95);
      tab.userData.noEdges = true;
      g.add(tab);

      // 2x2 corner-sharing PbX6 octahedral cages linked by shared halide Br-/I- vertex bridges + central Cs+/FA+ cation!
      for (const ox of [-0.72, 0.72]) {
        for (const oz of [-0.72, 0.72]) {
          const oct = new THREE.Mesh(octaGeo, ls.octMat);
          oct.position.set(ox, ls.y + 0.36, oz);
          oct.userData.noEdges = true;
          g.add(oct);
        }
      }
      for (const [hx, hz] of [
        [0, -0.72],
        [0, 0.72],
        [-0.72, 0],
        [0.72, 0],
      ]) {
        const hal = new THREE.Mesh(halideGeo, ls.halideMat);
        hal.position.set(hx, ls.y + 0.36, hz);
        hal.userData.noEdges = true;
        g.add(hal);
      }
      const cation = new THREE.Mesh(cationGeo, mats.goldPlating);
      cation.position.set(0, ls.y + 0.36, 0);
      cation.userData.noEdges = true;
      g.add(cation);
    }

    // 3 color-coded spectral penetration guide beams (Blue stops at top, Green mid, Red penetrates to bottom!)
    const raySpecs = [
      { x: -1.48, yEnd: 1.18, mat: mats.cfaBlue },
      { x: -1.82, yEnd: 0.1, mat: mats.cfaGreen },
      { x: -2.14, yEnd: -0.98, mat: mats.cfaRed },
    ];
    for (const rs of raySpecs) {
      const beam = makeBondStrut(
        new THREE.Vector3(rs.x, 1.98, 1.55),
        new THREE.Vector3(rs.x, rs.yEnd, 1.55),
        0.055,
        rs.mat,
        6
      );
      const tip = new THREE.Mesh(hiResCyl(0.01, 0.13, 0.24, 6), rs.mat);
      tip.rotation.x = Math.PI;
      tip.position.set(rs.x, rs.yEnd - 0.08, 1.55);
      tip.userData.noEdges = true;
      g.add(beam, tip);
    }

    // 3 dedicated right-side vertical B/G/R photocurrent collection risers + corner structural posts
    for (let li = 0; li < 3; li++) {
      const rz = (li - 1) * 0.95;
      const riser = new THREE.Mesh(hiResCyl(0.09, 0.09, 3.65, 8), mats.copperHybridBond);
      riser.position.set(2.35, 0.02, rz);
      riser.userData.noEdges = true;
      const pad = new THREE.Mesh(hiResCyl(0.18, 0.18, 0.14, 8), mats.goldPlating);
      pad.position.set(2.35, -1.62, rz);
      pad.userData.noEdges = true;
      g.add(riser, pad);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-perovskite-3rgb-stack',
        31,
        '#10b981',
        g,
        new THREE.Vector3(-15.4, 12.2, -5.8),
        new THREE.Vector3(-46.0, 46.0, -20.0),
        cp,
        0.22
      )
    );
  }

  // P2-32. imec IEDM 2025 Colloidal QDPD Co-Integrated Directly on Plasmonic Metasurface Cavity
  {
    const g = new THREE.Group();
    // Bottom CMOS readout pedestal + TiN contact via stub + Gold plasmonic bullseye nanohole floor!
    const cmosSub = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.6, 0.45),
      0.34,
      mats.siliconLogicLayer,
      0.04,
      2,
      12
    );
    cmosSub.position.y = -1.52;
    const goldFloor = makeHiResHorizPlate(
      createRoundedRectShape(4.3, 4.3, 0.38),
      0.24,
      mats.goldPlating,
      0.04,
      2,
      12
    );
    goldFloor.position.y = -1.18;
    g.add(cmosSub, goldFloor);

    // Concentric plasmonic bullseye Bragg grating grooves + 3x3 sub-wavelength nanohole cavities!
    for (const r of [0.82, 1.38, 1.88]) {
      const groove = new THREE.Mesh(hiResTorus(r, 0.06, 6, 20), mats.nanoArIridescent);
      groove.rotation.x = Math.PI / 2;
      groove.position.y = -1.03;
      groove.userData.noEdges = true;
      g.add(groove);
    }
    const pitGeo = hiResCyl(0.24, 0.2, 0.22, 10);
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const pit = new THREE.Mesh(pitGeo, mats.matteBlackAnodized);
        pit.position.set(ix * 1.08, -1.02, iz * 1.08);
        pit.userData.noEdges = true;
        g.add(pit);
      }
    }

    // Tunable multi-layer SiO2 / TiN Fabry-Perot phase-matching cavity posts + central MoO3 hole-transport pillar
    for (const [px, pz] of [
      [-1.72, -1.72],
      [1.72, -1.72],
      [-1.72, 1.72],
      [1.72, 1.72],
    ]) {
      const post = new THREE.Mesh(hiResCyl(0.18, 0.22, 1.38, 10), mats.aluminaHighKFilm);
      post.position.set(px, -0.34, pz);
      post.userData.noEdges = true;
      const band = new THREE.Mesh(hiResTorus(0.24, 0.045, 6, 10), mats.taNBarrierLiner);
      band.rotation.x = Math.PI / 2;
      band.position.set(px, -0.34, pz);
      band.userData.noEdges = true;
      g.add(post, band);
    }
    const moo3Core = new THREE.Mesh(hiResCyl(0.56, 0.62, 1.28, 12), mats.quartzOlpf);
    moo3Core.position.y = -0.36;
    moo3Core.userData.noEdges = true;
    g.add(moo3Core);

    // Active colloidal PbS/InAs QDPD absorber puck + ZnO electron buffer + top transparent ITO/graphene mesh!
    const znoLayer = new THREE.Mesh(hiResCyl(1.78, 1.84, 0.18, 18), mats.fluorineCoatCyan);
    znoLayer.position.y = 0.26;
    const qdpdPuck = new THREE.Mesh(hiResCyl(1.72, 1.8, 0.54, 18), mats.cinnabarAnodized);
    qdpdPuck.position.y = 0.62;
    const topElectrodeRing = new THREE.Mesh(hiResTorus(1.52, 0.11, 8, 20), mats.goldPlating);
    topElectrodeRing.rotation.x = Math.PI / 2;
    topElectrodeRing.position.y = 0.94;
    topElectrodeRing.userData.noEdges = true;
    g.add(znoLayer, qdpdPuck, topElectrodeRing);

    // Core-shell PbS@CdS quantum-dot hex cluster on top surface bridged by short dithiol organic ligand struts!
    const qdCoreGeo = hiResSphere(0.17, 8, 6);
    const qdShellGeo = hiResTorus(0.23, 0.04, 6, 10);
    const qdCoords: Array<[number, number]> = [[0, 0]];
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      qdCoords.push([Math.cos(a) * 0.92, Math.sin(a) * 0.92]);
    }
    for (let i = 0; i < qdCoords.length; i++) {
      const [qx, qz] = qdCoords[i];
      const qd = new THREE.Mesh(qdCoreGeo, mats.bodyRecRed);
      qd.position.set(qx, 1.02, qz);
      qd.userData.noEdges = true;
      const sh = new THREE.Mesh(qdShellGeo, mats.goldPlating);
      sh.rotation.x = Math.PI / 2;
      sh.position.set(qx, 1.02, qz);
      sh.userData.noEdges = true;
      g.add(qd, sh);
      if (i > 0) {
        g.add(
          makeBondStrut(
            new THREE.Vector3(0, 1.02, 0),
            new THREE.Vector3(qx, 1.02, qz),
            0.032,
            mats.silverElectrode,
            5
          )
        );
      }
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-qdpd-metasurface-cavity',
        32,
        '#f43f5e',
        g,
        new THREE.Vector3(15.4, 11.8, -5.8),
        new THREE.Vector3(46.0, 44.0, -20.0),
        cp,
        0.22
      )
    );
  }

  // P2-33. Sub-Wavelength Air-Gap Optical Light-Pipe Core (High-n Si3N4 Funnel)
  {
    const g = new THREE.Group();
    // Outer square tungsten baffle wall with internal stepped optical knife-edge teeth
    const outerFrame = makeHiResHorizPlate(
      createFrameShape(4.65, 4.65, 0.45, 3.65, 3.65, 0.3),
      2.45,
      mats.tungstenGrid,
      0.06,
      2,
      12
    );
    g.add(outerFrame);
    for (const by of [-0.72, 0, 0.72]) {
      const innerTooth = makeHiResHorizPlate(
        createFrameShape(3.72, 3.72, 0.25, 3.24, 3.24, 0.2),
        0.16,
        mats.matteBlackAnodized,
        0.02,
        1,
        10
      );
      innerTooth.position.y = by;
      innerTooth.userData.noEdges = true;
      g.add(innerTooth);
    }

    // Suspended 3-tier stepped high-index Si3N4 hexagonal funnel core (n = 2.02) inside true n = 1.0 air-gap!
    const upperFunnel = new THREE.Mesh(hiResCyl(1.42, 1.18, 0.92, 6), mats.lensXaGlass);
    upperFunnel.position.y = 0.88;
    const midFunnel = new THREE.Mesh(hiResCyl(1.18, 0.94, 0.92, 6), mats.lensEdGlass);
    midFunnel.position.y = 0.0;
    const lowerThroat = new THREE.Mesh(hiResCyl(0.94, 0.76, 0.86, 6), mats.vcWorkingFluidCyan);
    lowerThroat.position.y = -0.84;
    g.add(upperFunnel, midFunnel, lowerThroat);

    // Graded-index SiON anti-reflection impedance-matching rings at entrance, waist, and PD exit mouth!
    for (const [ry, rr, rmat] of [
      [1.36, 1.44, mats.fluorineCoatCyan],
      [0.44, 1.18, mats.nanoArIridescent],
      [-0.42, 0.96, mats.nanoArIridescent],
      [-1.26, 0.84, mats.goldPlating],
    ] as const) {
      const ring = new THREE.Mesh(hiResTorus(rr, 0.085, 7, 18), rmat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = ry;
      ring.userData.noEdges = true;
      g.add(ring);
    }

    // 8 gossamer sub-50nm SiO2 spider-web suspension micro-bridges at TWO elevations holding core in air!
    for (const sy of [0.76, -0.56]) {
      const innerR = sy > 0 ? 1.24 : 0.88;
      for (let k = 0; k < 4; k++) {
        const a = (k * Math.PI) / 2 + Math.PI / 4;
        g.add(
          makeBondStrut(
            new THREE.Vector3(Math.cos(a) * innerR, sy, Math.sin(a) * innerR),
            new THREE.Vector3(Math.cos(a) * 1.98, sy, Math.sin(a) * 1.98),
            0.065,
            mats.quartzOlpf,
            6
          )
        );
      }
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-subwave-airgap-lightpipe',
        33,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 10.6, -15.4),
        new THREE.Vector3(0, 38.0, -46.0),
        cp,
        0.22
      )
    );
  }

  // P2-34. Single-Mask Dual-Depth 7.2 / 7.5 um Global Shutter DTI Wall (IISW 2025)
  {
    const g = new THREE.Group();
    // Authentic TEM silicon pixel cutaway block showing side-by-side ARDE microloading dual-depth trenches!
    const hostSi = new THREE.Mesh(
      createChamferedBoxGeo(2.9, 4.7, 4.7, 0.14, 0.05, 'y'),
      mats.siliconPhotodiode
    );
    hostSi.position.set(0.38, 0, 0);
    g.add(hostSi);

    // Top SiN hardmask strip clearly depicting the narrower slit (7.2um) vs wider slit (7.5um) single-mask trick!
    const maskFront = new THREE.Mesh(
      createChamferedBoxGeo(0.95, 0.24, 1.55, 0.03, 0.02, 'y'),
      mats.goldPlating
    );
    maskFront.position.set(-0.92, 2.48, 1.48);
    const maskMid = new THREE.Mesh(
      createChamferedBoxGeo(0.95, 0.24, 0.72, 0.03, 0.02, 'y'),
      mats.goldPlating
    );
    maskMid.position.set(-0.92, 2.48, 0.08);
    const maskBack = new THREE.Mesh(
      createChamferedBoxGeo(0.95, 0.24, 1.25, 0.03, 0.02, 'y'),
      mats.goldPlating
    );
    maskBack.position.set(-0.92, 2.48, -1.68);
    g.add(maskFront, maskMid, maskBack);

    // Shallow 7.2um inter-pixel DTI (narrower!) with Bosch RIE scalloped ripples + rounded bottom
    const dtiShallow = new THREE.Mesh(
      createChamferedBoxGeo(0.48, 3.82, 1.55, 0.06, 0.03, 'y'),
      mats.aluminaHighKFilm
    );
    dtiShallow.position.set(-0.92, 0.4, 1.18);
    const shallowFoot = new THREE.Mesh(hiResCyl(0.24, 0.14, 0.34, 10), mats.aluminaHighKFilm);
    shallowFoot.position.set(-0.92, -1.6, 1.18);
    shallowFoot.userData.noEdges = true;

    // Ultra-deep 7.5um GS storage-node DTI (wider & deeper!) with W-core + 3-layer SiO2/Al2O3/HfO2 liner!
    const dtiDeepCore = new THREE.Mesh(
      createChamferedBoxGeo(0.56, 4.98, 1.98, 0.06, 0.03, 'y'),
      mats.tungstenLightShield
    );
    dtiDeepCore.position.set(-0.92, -0.18, -1.08);
    const linerSiO2 = new THREE.Mesh(
      createChamferedBoxGeo(0.1, 4.98, 2.1, 0.02, 0.01, 'y'),
      mats.quartzOlpf
    );
    linerSiO2.position.set(-1.24, -0.18, -1.08);
    linerSiO2.userData.noEdges = true;
    const linerAl2O3 = new THREE.Mesh(
      createChamferedBoxGeo(0.1, 4.98, 2.2, 0.02, 0.01, 'y'),
      mats.fluorineCoatCyan
    );
    linerAl2O3.position.set(-1.35, -0.18, -1.08);
    linerAl2O3.userData.noEdges = true;
    g.add(dtiShallow, shallowFoot, dtiDeepCore, linerSiO2, linerAl2O3);

    // Authentic Bosch-etch horizontal micro-scallop ribs along deep trench sidewall
    for (let k = -4; k <= 4; k++) {
      const rib = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.1, 2.02),
        mats.silverElectrode
      );
      rib.position.set(-1.2, k * 0.48 - 0.12, -1.08);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-dual-depth-gs-dti',
        34,
        '#64748b',
        g,
        new THREE.Vector3(-15.4, 4.8, 2.4),
        new THREE.Vector3(-48.0, 14.0, 8.0),
        cp,
        0.24
      )
    );
  }

  // P2-35. Front/Back Wafer Alignment Deep-Trench Vernier Fiducial (IISW 2025)
  {
    const g = new THREE.Group();
    const waferPedestal = makeHiResHorizPlate(
      createRoundedRectShape(4.4, 4.4, 0.4),
      0.56,
      mats.siliconBulk,
      0.06,
      2,
      12
    );
    waferPedestal.position.y = -0.78;
    g.add(waferPedestal);

    // Dual-layer Box-in-Box + Cross-in-Box optical overlay target (Front-wafer gold box + Back-wafer dark trench box!)
    const outerBox = makeHiResHorizPlate(
      createFrameShape(3.55, 3.55, 0.16, 2.75, 2.75, 0.12),
      0.58,
      mats.tungstenGrid,
      0.04,
      1,
      10
    );
    outerBox.position.y = -0.18;
    const innerBox = makeHiResHorizPlate(
      createFrameShape(2.25, 2.25, 0.12, 1.65, 1.65, 0.08),
      0.72,
      mats.fluorineCoatCyan,
      0.03,
      1,
      10
    );
    innerBox.position.y = -0.1;
    const crossX = new THREE.Mesh(
      createChamferedBoxGeo(1.42, 0.86, 0.28, 0.03, 0.02, 'y'),
      mats.goldPlating
    );
    crossX.position.y = -0.02;
    const crossZ = new THREE.Mesh(
      createChamferedBoxGeo(0.28, 0.86, 1.42, 0.03, 0.02, 'y'),
      mats.goldPlating
    );
    crossZ.position.y = -0.02;
    g.add(outerBox, innerBox, crossX, crossZ);

    // 4 corner 45-degree KOH pyramidal laser-inspection mirror facets
    const pyrGeo = new THREE.ConeGeometry(0.32, 0.42, 4);
    for (const [px, pz] of [
      [-1.78, -1.78],
      [1.78, -1.78],
      [-1.78, 1.78],
      [1.78, 1.78],
    ]) {
      const pyr = new THREE.Mesh(pyrGeo, mats.silverElectrode);
      pyr.position.set(px, 0.24, pz);
      pyr.rotation.y = Math.PI / 4;
      pyr.userData.noEdges = true;
      g.add(pyr);
    }

    // Dual-axis X and Z sub-5nm interlocking vernier metrology comb gratings!
    for (let k = -4; k <= 4; k++) {
      const tx = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.24, k === 0 ? 0.68 : 0.4),
        k === 0 ? mats.bodyRecRed : mats.silverElectrode
      );
      tx.position.set(k * 0.34, 0.42, 1.92);
      tx.userData.noEdges = true;
      const tz = new THREE.Mesh(
        new THREE.BoxGeometry(k === 0 ? 0.68 : 0.4, 0.24, 0.12),
        k === 0 ? mats.bodyRecRed : mats.goldPlating
      );
      tz.position.set(1.92, 0.42, k * 0.34);
      tz.userData.noEdges = true;
      g.add(tx, tz);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-bsi-align-fiducial-trench',
        35,
        '#eab308',
        g,
        new THREE.Vector3(15.2, 8.0, 7.6),
        new THREE.Vector3(44.0, 26.0, 26.0),
        cp,
        0.24
      )
    );
  }

  // P2-36. Dual-Metal Tungsten/TiN Anti-PLS Parabolic Light-Shield Hood (PLS < -105 dB)
  {
    const g = new THREE.Group();
    // Recessed dark-trap optical moat base + shielded buried storage node visible through front cutout
    const baseMoat = makeHiResHorizPlate(
      createFrameShape(4.5, 4.5, 0.3, 3.2, 3.2, 0.2),
      0.32,
      mats.matteBlackAnodized,
      0.04,
      1,
      12
    );
    baseMoat.position.y = -1.06;
    const shieldedSn = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.64, 1.75, 0.12, 0.03, 'y'),
      mats.vcWorkingFluidCyan
    );
    shieldedSn.position.y = -0.82;
    g.add(baseMoat, shieldedSn);

    // 4-tier corrugated optical knife-edge parabolic Tungsten hood + golden TiN CVD conformal barrier!
    const tiers = [
      { y: 0.96, w: 2.05, h: 0.44, mat: mats.tungstenLightShield },
      { y: 0.46, w: 2.75, h: 0.46, mat: mats.tungstenGrid },
      { y: -0.06, w: 3.45, h: 0.48, mat: mats.tungstenLightShield },
      { y: -0.6, w: 4.18, h: 0.52, mat: mats.tungstenGrid },
    ];
    for (const t of tiers) {
      const shell = makeHiResHorizPlate(
        createFrameShape(t.w, t.w, 0.2, t.w - 0.62, t.w - 0.62, 0.12),
        t.h,
        t.mat,
        0.04,
        2,
        12
      );
      shell.position.y = t.y;
      const tinRib = makeHiResHorizPlate(
        createFrameShape(t.w - 0.18, t.w - 0.18, 0.16, t.w - 0.72, t.w - 0.72, 0.1),
        0.1,
        mats.goldPlating,
        0.02,
        1,
        10
      );
      tinRib.position.y = t.y + t.h * 0.5 + 0.03;
      tinRib.userData.noEdges = true;
      g.add(shell, tinRib);
    }

    // Inner parabolic TiN CVD absorption liner cone + top aperture knife-edge crown
    const tinCone = new THREE.Mesh(hiResCyl(0.84, 1.56, 2.05, 16, true), mats.taNBarrierLiner);
    tinCone.position.y = 0.14;
    tinCone.userData.noEdges = true;
    const crownRim = new THREE.Mesh(hiResTorus(0.98, 0.11, 8, 18), mats.goldPlating);
    crownRim.rotation.x = Math.PI / 2;
    crownRim.position.y = 1.24;
    crownRim.userData.noEdges = true;
    g.add(tinCone, crownRim);

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-dual-metal-pls-hood',
        36,
        '#475569',
        g,
        new THREE.Vector3(-15.2, 8.2, 8.4),
        new THREE.Vector3(-44.0, 26.0, 28.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // TIER 2 — ATOMIC INTERFACE, DEUTERIUM PASSIVATION, GETTERING & DEFECT PHYSICS (P2-37 – P2-44)
  // =========================================================================

  // P2-37. Deuterium (Si-D / 2H) Heavy-Isotope Dangling-Bond Passivation Monolayer
  {
    const g = new THREE.Group();
    const subGeo = extrudeHiRes(createRoundedRectShape(4.7, 4.7, 0.45), 0.46, 0.05, 0.05, 2, 12);
    subGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(subGeo, 4.7, 4.7, 'xz');
    const siBase = new THREE.Mesh(subGeo, u.v2PixelDeuteriumInterface);
    siBase.position.y = -1.36;
    g.add(siBase);

    // 2-tier diamond-cubic Si(100) subsurface lattice + 2x1 reconstructed surface Si dimers + heavy 2H Deuterium caps!
    const siSubGeo = hiResSphere(0.22, 8, 6);
    const siTopGeo = hiResSphere(0.26, 9, 7);
    const dAtomGeo = hiResSphere(0.22, 9, 7);
    const neutronRingGeo = hiResTorus(0.32, 0.048, 6, 12); // Iconic heavy-isotope (proton + neutron) twin-nucleon halo!

    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const ax = ix * 1.26;
        const az = iz * 1.26;
        const pSub = new THREE.Vector3(ax, -0.78, az);
        const pSurf = new THREE.Vector3(ax + (ix === 0 ? 0.12 : 0), -0.1, az);
        const pDeut = new THREE.Vector3(ax + (ix === 0 ? 0.12 : 0), 0.86, az);

        const nSub = new THREE.Mesh(siSubGeo, mats.siliconBulk);
        nSub.position.copy(pSub);
        nSub.userData.noEdges = true;
        const nSurf = new THREE.Mesh(siTopGeo, mats.vcWorkingFluidCyan);
        nSurf.position.copy(pSurf);
        nSurf.userData.noEdges = true;
        const nDeut = new THREE.Mesh(dAtomGeo, mats.goldPlating);
        nDeut.position.copy(pDeut);
        nDeut.userData.noEdges = true;

        const siSiBond = makeBondStrut(pSub, pSurf, 0.07, mats.silverElectrode, 6);
        const siDBond = makeBondStrut(pSurf, pDeut, 0.105, u.batSocLedGlow, 7); // Stronger Si-D kinetic-isotope bond!
        const dHalo = new THREE.Mesh(neutronRingGeo, mats.fluorineCoatCyan);
        dHalo.rotation.x = Math.PI / 2;
        dHalo.position.copy(pDeut);
        dHalo.userData.noEdges = true;
        g.add(nSub, nSurf, nDeut, siSiBond, siDBond, dHalo);

        // Zig-zag subsurface Si-Si covalent bridge along X
        if (ix < 1) {
          const pNextSub = new THREE.Vector3((ix + 1) * 1.26, -0.78, az);
          g.add(makeBondStrut(pSurf, pNextSub, 0.055, mats.silverElectrode, 5));
        }
      }
    }

    // Amorphous Si-O-Si silica network frame hovering cleanly above the passivated Si-D plane
    const oxCap = makeHiResHorizPlate(
      createFrameShape(4.5, 4.5, 0.35, 3.6, 3.6, 0.2),
      0.24,
      mats.quartzOlpf,
      0.03,
      1,
      10
    );
    oxCap.position.y = 1.44;
    g.add(oxCap);
    for (const ox of [-1.2, 0, 1.2]) {
      const bridgeO = new THREE.Mesh(hiResSphere(0.14, 7, 5), mats.bodyRecRed);
      bridgeO.position.set(ox, 1.44, 1.98);
      bridgeO.userData.noEdges = true;
      g.add(bridgeO);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-deuterium-sid-passivation',
        37,
        '#f59e0b',
        g,
        new THREE.Vector3(15.4, 4.4, -0.4),
        new THREE.Vector3(48.0, 14.0, 0),
        cp,
        0.22
      )
    );
  }

  // P2-38. Hydrocarbon Molecular-Ion (C3H6 / CH2P) Heavy-Metal Gettering Trap Zone (SUMCO 2025 / MDPI 2026)
  {
    const g = new THREE.Group();
    // 3-tier Double-Epitaxial BSI Wafer cross-section: Bottom CZ substrate -> Mid C3H6/CH2P Sink Band -> Pure Top Epi!
    const czBase = makeHiResHorizPlate(
      createRoundedRectShape(4.7, 4.7, 0.45),
      0.44,
      mats.siliconBulk,
      0.06,
      2,
      12
    );
    czBase.position.y = -1.42;
    const oxBarrierMesh = makeHiResHorizPlate(
      createFrameShape(4.55, 4.55, 0.38, 3.85, 3.85, 0.24),
      0.2,
      mats.quartzOlpf,
      0.02,
      1,
      10
    );
    oxBarrierMesh.position.y = -0.92; // Oxygen diffusion barrier blocking CZ SiOx from reaching PD!
    const pureTopEpi = makeHiResHorizPlate(
      createFrameShape(4.7, 4.7, 0.45, 3.6, 3.6, 0.24),
      0.34,
      mats.siliconPhotodiode,
      0.04,
      1,
      12
    );
    pureTopEpi.position.y = 1.32;
    g.add(czBase, oxBarrierMesh, pureTopEpi);

    // 4 sculpted tetrahedral Carbon-Cluster (C3H6/CH2P) bucky-cages physically trapping migrating Fe/Cu/Ni/W atoms!
    const carbonGeo = hiResSphere(0.18, 8, 6);
    const metalGeo = hiResSphere(0.3, 9, 7);
    const hBeadGeo = hiResSphere(0.11, 7, 5);
    const cageOffsets: Array<[number, number, THREE.Material]> = [
      [-1.08, -1.08, mats.copperCoil], // Fe
      [1.08, -1.08, mats.copperHybridBond], // Cu
      [-1.08, 1.08, mats.goldPlating], // Ni
      [1.08, 1.08, mats.tungstenLightShield], // W
    ];
    for (const [cx, cz, mMat] of cageOffsets) {
      const center = new THREE.Vector3(cx, -0.02, cz);
      const trappedMetal = new THREE.Mesh(metalGeo, mMat);
      trappedMetal.position.copy(center);
      trappedMetal.userData.noEdges = true;
      const trapRing = new THREE.Mesh(hiResTorus(0.42, 0.045, 6, 12), mats.bodyRecRed);
      trapRing.rotation.x = Math.PI / 2;
      trapRing.position.copy(center);
      trapRing.userData.noEdges = true;
      g.add(trappedMetal, trapRing);

      // 4 tetrahedral carbon cage vertices + carbon-to-carbon cage frame + upward H-release passivation bead!
      const verts = [
        new THREE.Vector3(cx + 0.56, 0.5, cz + 0.56),
        new THREE.Vector3(cx - 0.56, 0.5, cz - 0.56),
        new THREE.Vector3(cx + 0.56, -0.5, cz - 0.56),
        new THREE.Vector3(cx - 0.56, -0.5, cz + 0.56),
      ];
      for (let vi = 0; vi < verts.length; vi++) {
        const cAtom = new THREE.Mesh(carbonGeo, mats.matteBlackAnodized);
        cAtom.position.copy(verts[vi]);
        cAtom.userData.noEdges = true;
        g.add(
          cAtom,
          makeBondStrut(center, verts[vi], 0.048, mats.silverElectrode, 5),
          makeBondStrut(verts[vi], verts[(vi + 1) % 4], 0.042, mats.tungstenGrid, 5)
        );
      }
      // Upward released local Hydrogen atom diffusing toward top epitaxial interface
      const hUp = new THREE.Mesh(hBeadGeo, mats.vcWorkingFluidCyan);
      hUp.position.set(cx, 0.92, cz);
      hUp.userData.noEdges = true;
      g.add(hUp, makeBondStrut(new THREE.Vector3(cx, 0.54, cz), new THREE.Vector3(cx, 0.88, cz), 0.03, mats.fluorineCoatCyan, 5));
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-carbon-cluster-gettering',
        38,
        '#c2410c',
        g,
        new THREE.Vector3(-15.4, 1.0, -7.2),
        new THREE.Vector3(-48.0, 4.0, -24.0),
        cp,
        0.22
      )
    );
  }

  // P2-39. 20nm P+ Boron Surface-Pinning Hole-Accumulation Skin (V_surf = 0V)
  {
    const g = new THREE.Group();
    // 3-tier vertical doping cutaway: Bottom N-type depleted PD -> Mid Space-Charge Junction -> 20nm P+ Boron Skin -> Top SiO2!
    const nDepl = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 0.66, 2.8, 0.14, 0.04, 'y'),
      mats.siliconDepletion
    );
    nDepl.position.y = -0.96;
    const scrBand = new THREE.Mesh(
      createChamferedBoxGeo(6.5, 0.18, 2.88, 0.06, 0.02, 'y'),
      mats.varistorRingBlue
    );
    scrBand.position.y = -0.52;
    const pPlusSkin = new THREE.Mesh(
      createChamferedBoxGeo(6.55, 0.36, 2.94, 0.12, 0.04, 'y'),
      mats.bodyRecRed
    );
    pPlusSkin.position.y = -0.22;
    const topOxRim = makeHiResHorizPlate(
      createFrameShape(6.6, 3.0, 0.25, 5.7, 2.1, 0.14),
      0.18,
      mats.quartzOlpf,
      0.02,
      1,
      12
    );
    topOxRim.position.y = 0.52;
    g.add(nDepl, scrBand, pPlusSkin, topOxRim);

    // Dense 5x2 Boron substitutional acceptor lattice + mobile positive hole cloud (h+) + 0V Ground Pinning Clamps!
    const holeGeo = hiResSphere(0.17, 8, 6);
    const bCoreGeo = hiResCyl(0.11, 0.11, 0.38, 8);
    const ringGeo = hiResTorus(0.25, 0.04, 6, 12);
    for (let ix = -2; ix <= 2; ix++) {
      for (const iz of [-0.66, 0.66]) {
        const bIon = new THREE.Mesh(bCoreGeo, mats.goldPlating);
        bIon.position.set(ix * 1.18, 0.08, iz);
        bIon.userData.noEdges = true;
        const hole = new THREE.Mesh(holeGeo, mats.fluorineCoatCyan);
        hole.position.set(ix * 1.18, 0.36, iz);
        hole.userData.noEdges = true;
        const halo = new THREE.Mesh(ringGeo, mats.goldPlating);
        halo.rotation.x = Math.PI / 2;
        halo.position.set(ix * 1.18, 0.36, iz);
        halo.userData.noEdges = true;
        g.add(bIon, hole, halo);
      }
    }
    // End-cap 0V P-well ground-pinning metal tie clamps locking V_surf = 0.00V!
    for (const sx of [-3.32, 3.32]) {
      const clamp = new THREE.Mesh(
        createChamferedBoxGeo(0.32, 1.18, 1.4, 0.06, 0.03, 'y'),
        mats.copperHybridBond
      );
      clamp.position.set(sx, -0.35, 0);
      g.add(clamp);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-pp-surface-pinning-skin',
        39,
        '#ec4899',
        g,
        new THREE.Vector3(0, 6.8, 15.2),
        new THREE.Vector3(0, 24.0, 46.0),
        cp,
        0.22
      )
    );
  }

  // P2-40. Multi-Implant Graded N-/N/N+ Zero-Lag Electrostatic Potential Stair
  {
    const g = new THREE.Group();
    // 5 terraced descending doping steps with progressively denser P/As donor ion clusters & drift chevron guide!
    const stepMats = [
      mats.siliconBulk,
      mats.siliconPhotodiode,
      mats.siliconDepletion,
      mats.varistorRingBlue,
      mats.vcWorkingFluidCyan,
    ];
    const donorGeo = hiResSphere(0.11, 7, 5);
    const eSphereGeo = hiResSphere(0.16, 8, 6);

    for (let i = 0; i < 5; i++) {
      const yStep = 1.12 - i * 0.52;
      const zStep = -1.7 + i * 0.85;
      const wStep = 4.35 - i * 0.32;
      const terrace = new THREE.Mesh(
        createChamferedBoxGeo(wStep, 0.42, 0.84, 0.08, 0.03, 'y'),
        stepMats[i]
      );
      terrace.position.set(0, yStep, zStep);
      g.add(terrace);

      // Increasing donor concentration (N- -> N -> N+): 1, 2, 3, 4, 5 donor atoms embedded across each step!
      const count = i + 1;
      for (let d = 0; d < count; d++) {
        const dx = count === 1 ? 0 : -wStep * 0.34 + (d / (count - 1)) * wStep * 0.68;
        const donor = new THREE.Mesh(donorGeo, mats.goldPlating);
        donor.position.set(dx, yStep + 0.24, zStep - 0.16);
        donor.userData.noEdges = true;
        g.add(donor);
      }

      // Sliding photoelectron orb + directional slide rail connecting steps down toward TG throat
      const eOrb = new THREE.Mesh(eSphereGeo, mats.fluorineCoatCyan);
      eOrb.position.set(0, yStep + 0.36, zStep + 0.14);
      eOrb.userData.noEdges = true;
      g.add(eOrb);
      if (i < 4) {
        g.add(
          makeBondStrut(
            new THREE.Vector3(0, yStep + 0.32, zStep + 0.18),
            new THREE.Vector3(0, yStep - 0.18, zStep + 0.92),
            0.055,
            mats.goldPlating,
            6
          )
        );
      }
    }

    // Tapered P-well side containment cheeks + front Transfer-Gate saddle lip
    for (const sx of [-2.28, 2.28]) {
      const cheek = new THREE.Mesh(
        createChamferedBoxGeo(0.32, 3.0, 4.55, 0.06, 0.03, 'y'),
        mats.tungstenGrid
      );
      cheek.position.set(sx, 0.02, 0);
      const topTrim = new THREE.Mesh(
        createChamferedBoxGeo(0.36, 0.16, 4.6, 0.04, 0.02, 'y'),
        mats.copperHybridBond
      );
      topTrim.position.set(sx, 1.56, 0);
      topTrim.userData.noEdges = true;
      g.add(cheek, topTrim);
    }
    const tgLip = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 0.38, 0.42, 0.06, 0.02, 'y'),
      mats.gatePolysilicon
    );
    tgLip.position.set(0, -1.18, 2.28);
    g.add(tgLip);

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-graded-potential-stair',
        40,
        '#0284c7',
        g,
        new THREE.Vector3(15.4, 1.0, -7.2),
        new THREE.Vector3(48.0, 4.0, -24.0),
        cp,
        0.24
      )
    );
  }

  // P2-41. Radical-Oxidation (O* / H*) Charge-Free Interfacial Oxide (IEDM 2025 Paper 40-1)
  {
    const g = new THREE.Group();
    // L-shaped Si(100) planar + Si(110) vertical corner block showing isotropic conformal O*/H* radical oxidation!
    const siSub = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 0.62, 3.2, 0.12, 0.04, 'y'),
      mats.siliconPhotodiode
    );
    siSub.position.y = -0.96;
    const siCornerStep = new THREE.Mesh(
      createChamferedBoxGeo(1.1, 0.92, 3.2, 0.08, 0.03, 'y'),
      mats.siliconPhotodiode
    );
    siCornerStep.position.set(-2.35, -0.25, 0);
    // 0.5nm Charge-Free SiO2 Interfacial Layer wrapping BOTH horizontal (100) AND vertical (110) faces seamlessly!
    const ilHoriz = new THREE.Mesh(
      createChamferedBoxGeo(4.85, 0.22, 3.3, 0.06, 0.02, 'y'),
      mats.fluorineCoatCyan
    );
    ilHoriz.position.set(0.52, -0.52, 0);
    const ilVert = new THREE.Mesh(
      createChamferedBoxGeo(0.22, 1.08, 3.3, 0.04, 0.02, 'y'),
      mats.fluorineCoatCyan
    );
    ilVert.position.set(-1.72, -0.1, 0);
    const hfo2Top = new THREE.Mesh(
      createChamferedBoxGeo(4.55, 0.36, 3.05, 0.08, 0.03, 'y'),
      mats.aluminaHighKFilm
    );
    hfo2Top.position.set(0.66, -0.18, 0);
    g.add(siSub, siCornerStep, ilHoriz, ilVert, hfo2Top);

    // Plasma showerhead radical-manifold plate overhead emitting paired O* (cyan) & H* (gold) active radicals!
    const showerPlate = makeHiResHorizPlate(
      createRoundedRectShape(5.6, 2.4, 0.3),
      0.22,
      mats.silverElectrode,
      0.03,
      1,
      12
    );
    showerPlate.position.y = 1.24;
    g.add(showerPlate);
    const radGeo = hiResSphere(0.14, 8, 6);
    for (let ix = -2; ix <= 2; ix++) {
      for (const rz of [-0.62, 0.62]) {
        const isO = (ix + (rz > 0 ? 1 : 0)) % 2 === 0;
        const orb = new THREE.Mesh(radGeo, isO ? mats.vcWorkingFluidCyan : mats.goldPlating);
        orb.position.set(ix * 1.02, 0.68, rz);
        orb.userData.noEdges = true;
        const stream = makeBondStrut(
          new THREE.Vector3(ix * 1.02, 1.12, rz),
          new THREE.Vector3(ix * 1.02, 0.04, rz),
          0.035,
          isO ? mats.fluorineCoatCyan : mats.goldPlating,
          5
        );
        g.add(orb, stream);
      }
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-radical-ox-chargefree-il',
        41,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 3.6, -15.4),
        new THREE.Vector3(0, 12.0, -48.0),
        cp,
        0.22
      )
    );
  }

  // P2-42. Dual Vertical Transfer Gate (D-VTG) Twin-Pillar Trench (Oct 2025)
  {
    const g = new THREE.Group();
    // Top polysilicon gate strap + twin tungsten gate contact vias + M1 control busbar
    const topBridge = new THREE.Mesh(
      createChamferedBoxGeo(4.3, 0.56, 3.6, 0.14, 0.05, 'y'),
      mats.gatePolysilicon
    );
    topBridge.position.y = 1.54;
    const m1Bus = new THREE.Mesh(
      createChamferedBoxGeo(4.5, 0.24, 0.88, 0.06, 0.03, 'y'),
      mats.copperHybridBond
    );
    m1Bus.position.y = 2.38;
    g.add(topBridge, m1Bus);

    // Twin tapered vertical polysilicon gate blades wrapped in SiO2 gate oxide + TiN barrier + W core + tip P-collars!
    for (const px of [-1.2, 1.2]) {
      const via = new THREE.Mesh(hiResCyl(0.28, 0.32, 0.64, 10), mats.goldPlating);
      via.position.set(px, 2.02, 0);
      via.userData.noEdges = true;
      const oxWrap = new THREE.Mesh(
        createChamferedBoxGeo(1.06, 3.45, 2.75, 0.14, 0.03, 'y'),
        mats.quartzOlpf
      );
      oxWrap.position.set(px, -0.42, 0);
      oxWrap.userData.noEdges = true;
      const polyBlade = new THREE.Mesh(
        createChamferedBoxGeo(0.84, 3.35, 2.48, 0.1, 0.04, 'y'),
        mats.gatePolysilicon
      );
      polyBlade.position.set(px, -0.4, 0);
      const wCore = new THREE.Mesh(
        createChamferedBoxGeo(0.36, 3.15, 1.85, 0.05, 0.02, 'y'),
        mats.tungstenGrid
      );
      wCore.position.set(px, -0.32, 0);
      wCore.userData.noEdges = true;
      // Negative-bias hole-accumulation P-collar ring suppressing trench-tip dark current!
      const tipCollar = new THREE.Mesh(hiResTorus(0.68, 0.09, 7, 16), mats.bodyRecRed);
      tipCollar.rotation.x = Math.PI / 2;
      tipCollar.position.set(px, -2.06, 0);
      tipCollar.userData.noEdges = true;
      g.add(via, oxWrap, polyBlade, wCore, tipCollar);
    }

    // Hourglass dual-pinched central electron conduit rising from deep-epi into top FD landing dome!
    const lowerConduit = new THREE.Mesh(hiResCyl(0.34, 0.62, 1.65, 12), mats.vcWorkingFluidCyan);
    lowerConduit.position.set(0, -1.2, 0);
    lowerConduit.userData.noEdges = true;
    const upperConduit = new THREE.Mesh(hiResCyl(0.56, 0.34, 1.65, 12), mats.fluorineCoatCyan);
    upperConduit.position.set(0, 0.42, 0);
    upperConduit.userData.noEdges = true;
    const fdNode = new THREE.Mesh(hiResCyl(0.64, 0.64, 0.28, 14), mats.goldPlating);
    fdNode.position.set(0, 1.24, 1.48);
    g.add(lowerConduit, upperConduit, fdNode);

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-dual-vtg-twin-pillar',
        42,
        '#d97706',
        g,
        new THREE.Vector3(15.2, 0.4, 7.2),
        new THREE.Vector3(48.0, 2.0, 24.0),
        cp,
        0.24
      )
    );
  }

  // P2-43. Vertical Overflow Drain (VOD) Anti-Blooming Potential Saddle
  {
    const g = new THREE.Group();
    // High inter-pixel isolation walls (left/right) flanking a lower central φ_VOD overflow spillway saddle!
    for (const sx of [-1.85, 1.85]) {
      const isoWall = new THREE.Mesh(
        createChamferedBoxGeo(0.74, 2.05, 4.2, 0.1, 0.04, 'y'),
        mats.tungstenLightShield
      );
      isoWall.position.set(sx, 0.42, 0);
      const wallCap = new THREE.Mesh(
        createChamferedBoxGeo(0.78, 0.16, 4.24, 0.04, 0.02, 'y'),
        mats.bodyRecRed
      );
      wallCap.position.set(sx, 1.5, 0);
      wallCap.userData.noEdges = true;
      g.add(isoWall, wallCap);
    }

    // Central recessed VOD potential saddle (0.3V lower than side walls!) + twin overflow spillway chutes!
    const saddleDeck = new THREE.Mesh(
      createChamferedBoxGeo(2.9, 0.88, 3.8, 0.14, 0.04, 'y'),
      mats.siliconTransistorLayer
    );
    saddleDeck.position.y = 0.22;
    const vodCrest = new THREE.Mesh(
      createChamferedBoxGeo(2.85, 0.22, 0.82, 0.05, 0.02, 'y'),
      mats.goldPlating
    );
    vodCrest.position.y = 0.76;
    const drainGutter = makeHiResHorizPlate(
      createRoundedRectShape(4.7, 4.5, 0.45),
      0.56,
      mats.copperHeatSpreader,
      0.06,
      2,
      12
    );
    drainGutter.position.y = -1.35;
    g.add(saddleDeck, vodCrest, drainGutter);

    // 4 sculpted curved overflow electron chutes + glowing highlight electron droplets draining safely into N-sub!
    const dropGeo = hiResSphere(0.15, 8, 6);
    for (const [sx, sz] of [
      [-1.05, -1.15],
      [1.05, -1.15],
      [-1.05, 1.15],
      [1.05, 1.15],
    ]) {
      const chute = new THREE.Mesh(hiResCyl(0.28, 0.44, 1.52, 10), mats.vcWorkingFluidCyan);
      chute.position.set(sx, -0.48, sz);
      chute.userData.noEdges = true;
      const drop = new THREE.Mesh(dropGeo, mats.goldPlating);
      drop.position.set(sx, 0.56, sz);
      drop.userData.noEdges = true;
      const stud = new THREE.Mesh(hiResCyl(0.26, 0.26, 0.28, 8), mats.goldPlating);
      stud.position.set(sx * 1.65, -1.04, sz * 1.45);
      stud.userData.noEdges = true;
      g.add(chute, drop, stud);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-vod-antiblooming-barrier',
        43,
        '#f97316',
        g,
        new THREE.Vector3(-15.2, -1.2, 7.6),
        new THREE.Vector3(-48.0, -4.0, 26.0),
        cp,
        0.24
      )
    );
  }

  // P2-44. Single-Electron RTS Oxide Border-Trap Defect Cage (E' / Pb Center, PNAS 2025)
  {
    const g = new THREE.Group();
    // Bottom Si SF inversion channel slab + 2nm amorphous SiO2 border-trap matrix + 2-level RTS pulse waveform bars!
    const chFloor = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.6, 0.45),
      0.42,
      mats.siliconTransistorLayer,
      0.05,
      2,
      12
    );
    chFloor.position.y = -1.42;
    const invRibbon = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.16, 1.25, 0.05, 0.02, 'y'),
      mats.vcWorkingFluidCyan
    );
    invRibbon.position.y = -1.14;
    g.add(chFloor, invRibbon);

    // Central single-electron oxygen-vacancy E' defect core (Si3≡Si· ·Si≡Si3 broken dimer!) with twin capture/emission halos
    const trapCore = new THREE.Mesh(hiResSphere(0.42, 12, 10), mats.bodyRecRed);
    trapCore.position.y = 0.22;
    const ringA = new THREE.Mesh(hiResTorus(0.84, 0.06, 7, 18), mats.goldPlating);
    ringA.rotation.set(Math.PI / 3, 0.4, 0);
    ringA.position.y = 0.22;
    ringA.userData.noEdges = true;
    const ringB = new THREE.Mesh(hiResTorus(0.84, 0.06, 7, 18), mats.fluorineCoatCyan);
    ringB.rotation.set(-Math.PI / 3, -0.4, 0);
    ringB.position.y = 0.22;
    ringB.userData.noEdges = true;
    // Vertical quantum-tunneling transition rail from inversion channel straight into the 1.5nm oxide border trap!
    const tunnelRail = makeBondStrut(
      new THREE.Vector3(0, -1.08, 0),
      new THREE.Vector3(0, -0.18, 0),
      0.08,
      mats.goldPlating,
      7
    );
    g.add(trapCore, ringA, ringB, tunnelRail);

    // 4 tetrahedral SiO4 amorphous cage corners + secondary oxygen bridge atoms!
    const cornerPos = [
      new THREE.Vector3(1.28, 1.28, 1.28),
      new THREE.Vector3(-1.28, 1.28, -1.28),
      new THREE.Vector3(1.28, -0.58, -1.28),
      new THREE.Vector3(-1.28, -0.58, 1.28),
    ];
    const siCornerGeo = hiResSphere(0.26, 9, 7);
    const oxMidGeo = hiResSphere(0.15, 7, 5);
    for (let i = 0; i < cornerPos.length; i++) {
      const cpnt = cornerPos[i];
      const atom = new THREE.Mesh(siCornerGeo, mats.quartzOlpf);
      atom.position.copy(cpnt);
      atom.userData.noEdges = true;
      const midO = new THREE.Mesh(oxMidGeo, mats.cinnabarAnodized);
      midO.position.copy(cpnt).lerp(new THREE.Vector3(0, 0.22, 0), 0.45);
      midO.userData.noEdges = true;
      g.add(
        atom,
        midO,
        makeBondStrut(new THREE.Vector3(0, 0.22, 0), cpnt, 0.06, mats.silverElectrode, 6),
        makeBondStrut(cpnt, cornerPos[(i + 1) % 4], 0.04, mats.aluminaHighKFilm, 5)
      );
    }

    // Front pedestal raised 2-level discrete RTS telegraph pulse waveform bars (High/Low capture-emission states!)
    const rtsLevels = [0.22, 0.62, 0.62, 0.22, 0.62, 0.22, 0.22, 0.62];
    for (let i = 0; i < rtsLevels.length; i++) {
      const h = rtsLevels[i];
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.36, h, 0.24, 0.03, 0.01, 'y'),
        h > 0.4 ? mats.bodyRecRed : mats.vcWorkingFluidCyan
      );
      bar.position.set(-1.54 + i * 0.44, -1.2 + h * 0.5, 2.08);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-rts-oxide-border-trap',
        44,
        '#ef4444',
        g,
        new THREE.Vector3(-15.4, -2.6, -0.4),
        new THREE.Vector3(-48.0, -8.0, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // TIER 3 — QIS JOT, Ge-on-Si SWIR SPAD, EVENT VISION & 200nm W2W HYBRID BOND (P2-45 – P2-50)
  // =========================================================================

  // P2-45. Room-Temp Sub-Electron Quanta Image Sensor (QIS) Pump-Gate Jot (C_FD ~ 0.15 fF)
  {
    const g = new THREE.Group();
    const jotBase = makeHiResHorizPlate(
      createRoundedRectShape(4.8, 4.2, 0.4),
      0.32,
      mats.siliconBulk,
      0.04,
      2,
      12
    );
    jotBase.position.y = -1.22;
    g.add(jotBase);

    // Authentic Fossum BSI Pump-Gate Jot TCAD structure:
    // Deep buried Storage Well (SW) cup -> Virtual-Phase Potential Barrier (PB) ring -> Tapered Pump-Gate (TG)
    // -> Ultra-tiny needle Distal Floating Diffusion (FD, C_FD = 0.15 fF!) -> Tapered Reset Gate (RG)!
    const swWell = new THREE.Mesh(hiResCyl(1.26, 1.42, 1.22, 16), mats.siliconPhotodiode);
    swWell.position.set(-0.98, -0.46, 0);
    const pbRing = new THREE.Mesh(hiResTorus(1.32, 0.13, 7, 18), mats.bodyRecRed);
    pbRing.rotation.x = Math.PI / 2;
    pbRing.position.set(-0.98, 0.18, 0);
    pbRing.userData.noEdges = true;
    const pgSleeve = new THREE.Mesh(hiResTorus(1.28, 0.14, 7, 18), mats.gatePolysilicon);
    pgSleeve.rotation.x = Math.PI / 2;
    pgSleeve.position.set(-0.98, 0.44, 0);
    pgSleeve.userData.noEdges = true;

    // Stepped zero-overlap tapered Pump-Gate bridge narrowing dramatically toward the distal FD pin!
    const tgWide = new THREE.Mesh(
      createChamferedBoxGeo(1.05, 0.34, 1.12, 0.06, 0.03, 'y'),
      mats.goldPlating
    );
    tgWide.position.set(-0.08, 0.56, 0);
    const tgNarrow = new THREE.Mesh(
      createChamferedBoxGeo(0.95, 0.28, 0.48, 0.05, 0.02, 'y'),
      mats.goldPlating
    );
    tgNarrow.position.set(0.76, 0.58, 0);

    // Distal Floating Diffusion (FD) sub-0.15 fF needle-island + tapered Reset Gate (RG) behind!
    const distalFd = new THREE.Mesh(hiResCyl(0.32, 0.22, 0.96, 14), mats.vcWorkingFluidCyan);
    distalFd.position.set(1.52, 0.38, 0);
    const fdAirHalo = new THREE.Mesh(hiResTorus(0.54, 0.055, 6, 16), mats.fluorineCoatCyan);
    fdAirHalo.rotation.x = Math.PI / 2;
    fdAirHalo.position.set(1.52, 0.52, 0);
    fdAirHalo.userData.noEdges = true;
    const rgTaper = new THREE.Mesh(
      createChamferedBoxGeo(0.66, 0.26, 0.72, 0.05, 0.02, 'y'),
      mats.copperHybridBond
    );
    rgTaper.position.set(1.52, 0.38, -0.96);
    const photonOrb = new THREE.Mesh(hiResSphere(0.22, 9, 7), u.batSocLedGlow);
    photonOrb.position.set(1.52, 1.14, 0);
    photonOrb.userData.noEdges = true;
    g.add(swWell, pbRing, pgSleeve, tgWide, tgNarrow, distalFd, fdAirHalo, rgTaper, photonOrb);

    // Sculpted Photon-Counting Histogram (PCH) quantized peaks (0e-, 1e-, 2e-, 3e-) on front telemetry lip!
    const pchHeights = [0.28, 0.62, 0.88, 0.52];
    for (let k = 0; k < pchHeights.length; k++) {
      const pk = new THREE.Mesh(
        hiResCyl(0.06, 0.22, pchHeights[k], 8),
        k === 2 ? u.batSocLedGlow : mats.vcWorkingFluidCyan
      );
      pk.position.set(-0.9 + k * 0.68, -1.04 + pchHeights[k] * 0.5, 1.58);
      pk.userData.noEdges = true;
      g.add(pk);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-qis-pump-gate-jot',
        45,
        '#22d3ee',
        g,
        new THREE.Vector3(15.4, -3.4, 0.8),
        new THREE.Vector3(48.0, -12.0, 4.0),
        cp,
        0.22
      )
    );
  }

  // P2-46. 10um-Pitch Ge-on-Si 1550nm SWIR SPAD Multiplication Junction (IEDM 2025 Paper 8-1)
  {
    const g = new THREE.Group();
    // Authentic SAGCM 5-layer cutaway mesa: Deep P-well guard collar + Intrinsic Si Avalanche Multiplication Core
    // + Boron P+ Charge Sheet + 3-band SiGe dislocation-filter superlattice + AR-coated Ge SWIR absorption mesa!
    const subContact = new THREE.Mesh(hiResCyl(2.05, 2.15, 0.34, 18), mats.copperHybridBond);
    subContact.position.y = -1.72;
    const siAvalanche = new THREE.Mesh(hiResCyl(1.62, 1.72, 1.05, 18), mats.siliconDepletion);
    siAvalanche.position.y = -1.02;
    // Double-diffused deep P-well guard ring & active quenching polysilicon resistor collar
    const guardRing = new THREE.Mesh(hiResTorus(1.94, 0.18, 8, 22), mats.tungstenGrid);
    guardRing.rotation.x = Math.PI / 2;
    guardRing.position.y = -0.96;
    guardRing.userData.noEdges = true;
    const quenchRing = new THREE.Mesh(hiResTorus(1.94, 0.1, 7, 22), mats.gatePolysilicon);
    quenchRing.rotation.x = Math.PI / 2;
    quenchRing.position.y = -0.62;
    quenchRing.userData.noEdges = true;

    // Razor-thin Boron P+ Charge Sheet decoupling low-field Ge from >3e5 V/cm Si avalanche field!
    const chargeSheet = new THREE.Mesh(hiResCyl(1.74, 1.74, 0.2, 18), mats.goldPlating);
    chargeSheet.position.y = -0.38;
    // 3-band composition-graded SiGe dislocation-filter superlattice (4.2% lattice mismatch relief!)
    const sige1 = new THREE.Mesh(hiResCyl(1.68, 1.72, 0.16, 18), mats.taNBarrierLiner);
    sige1.position.y = -0.18;
    const sige2 = new THREE.Mesh(hiResCyl(1.64, 1.68, 0.16, 18), mats.silverElectrode);
    sige2.position.y = -0.02;
    const sige3 = new THREE.Mesh(hiResCyl(1.6, 1.64, 0.16, 18), mats.taNBarrierLiner);
    sige3.position.y = 0.14;
    // Top Germanium SWIR absorption mesa (E_g = 0.66 eV) + AR dielectric cap + annular gold top cathode ring!
    const geAbsorber = new THREE.Mesh(hiResCyl(1.42, 1.58, 1.18, 18), mats.cinnabarAnodized);
    geAbsorber.position.y = 0.82;
    const arCap = new THREE.Mesh(hiResCyl(1.38, 1.42, 0.14, 18), mats.nanoArIridescent);
    arCap.position.y = 1.48;
    const topCathodeRing = new THREE.Mesh(hiResTorus(1.36, 0.11, 7, 20), mats.goldPlating);
    topCathodeRing.rotation.x = Math.PI / 2;
    topCathodeRing.position.y = 1.56;
    topCathodeRing.userData.noEdges = true;
    g.add(
      subContact,
      siAvalanche,
      guardRing,
      quenchRing,
      chargeSheet,
      sige1,
      sige2,
      sige3,
      geAbsorber,
      arCap,
      topCathodeRing
    );

    // Sculpted glowing avalanche electron-hole impact-ionization sparks orbiting the Si multiplication rim!
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      g.add(
        makeBondStrut(
          new THREE.Vector3(Math.cos(a) * 1.78, -0.45, Math.sin(a) * 1.78),
          new THREE.Vector3(Math.cos(a + 0.18) * 1.88, -1.45, Math.sin(a + 0.18) * 1.88),
          0.045,
          mats.vcWorkingFluidCyan,
          5
        )
      );
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-ge-on-si-swir-spad',
        46,
        '#e11d48',
        g,
        new THREE.Vector3(15.4, -4.6, -7.8),
        new THREE.Vector3(48.0, -16.0, -28.0),
        cp,
        0.22
      )
    );
  }

  // P2-47. Double-Junction P+PNPP+ Self-Energy-Harvesting Photodiode (2025)
  {
    const g = new THREE.Group();
    // Explicit 5-layer color-coded vertical sandwich: P+ pinning -> N_img imaging well -> P_iso barrier
    // -> N_pv infrared photovoltaic collector -> P+ bottom substrate + side MIM harvest capacitor bank!
    const pTop = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.24, 4.2, 0.1, 0.02, 'y'),
      mats.bodyRecRed
    );
    pTop.position.y = 1.38;
    const nImg = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.72, 4.2, 0.12, 0.04, 'y'),
      mats.siliconPhotodiode
    );
    nImg.position.y = 0.88;
    const pIso = new THREE.Mesh(
      createChamferedBoxGeo(4.42, 0.3, 4.42, 0.1, 0.03, 'y'),
      mats.aluminaHighKFilm
    );
    pIso.position.y = 0.34;
    const nPv = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.78, 4.2, 0.12, 0.04, 'y'),
      u.batCellWrapGreen
    );
    nPv.position.y = -0.22;
    const pBot = new THREE.Mesh(
      createChamferedBoxGeo(4.35, 0.36, 4.35, 0.12, 0.03, 'y'),
      mats.siliconBulk
    );
    pBot.position.y = -0.82;
    g.add(pTop, nImg, pIso, nPv, pBot);

    // Interdigitated backside photovoltaic solar busbar fingers + side micro-storage harvest capacitor!
    for (let k = -1; k <= 1; k++) {
      const bus = new THREE.Mesh(
        createChamferedBoxGeo(4.5, 0.16, 0.32, 0.03, 0.01, 'y'),
        mats.copperHybridBond
      );
      bus.position.set(0, -1.1, k * 1.22);
      bus.userData.noEdges = true;
      g.add(bus);
    }
    for (const sx of [-2.32, 2.32]) {
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(0.26, 0.96, 3.8, 0.04, 0.02, 'y'),
        mats.goldPlating
      );
      rail.position.set(sx, -0.34, 0);
      g.add(rail);
    }
    // Integrated MIM harvest charge-storage capacitor tower on front corner
    const capTower = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.96, 12), u.batSocLedGlow);
    capTower.position.set(1.65, 1.56, 1.55);
    const capLid = new THREE.Mesh(hiResCyl(0.5, 0.5, 0.12, 12), mats.goldPlating);
    capLid.position.set(1.65, 2.08, 1.55);
    capLid.userData.noEdges = true;
    g.add(capTower, capLid);

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-double-junction-harvest-pd',
        47,
        '#16a34a',
        g,
        new THREE.Vector3(-15.4, -5.2, -7.8),
        new THREE.Vector3(-48.0, -18.0, -28.0),
        cp,
        0.24
      )
    );
  }

  // P2-48. In-Pixel Asynchronous Log-Photoreceptor & ON/OFF Event Comparator (Sony-Prophesee 2026)
  {
    const g = new THREE.Group();
    const circuitDeck = makeHiResHorizPlate(
      createRoundedRectShape(6.5, 3.4, 0.4),
      0.42,
      mats.siliconLogicLayer,
      0.05,
      2,
      14
    );
    circuitDeck.position.y = -0.74;
    g.add(circuitDeck);

    // Stage 1: Sub-threshold Logarithmic Photoreceptor MOSFET pair + feedback loop
    const logAmp = new THREE.Mesh(
      createChamferedBoxGeo(1.38, 0.92, 2.1, 0.1, 0.04, 'y'),
      mats.ispSiliconDie
    );
    logAmp.position.set(-2.22, -0.02, 0);
    const logRing = new THREE.Mesh(hiResTorus(0.48, 0.07, 6, 14), mats.goldPlating);
    logRing.rotation.x = Math.PI / 2;
    logRing.position.set(-2.22, 0.52, 0);
    logRing.userData.noEdges = true;

    // Stage 2: Unity-gain Source Follower buffer isolating photoreceptor from switching transients
    const sfBuf = new THREE.Mesh(
      createChamferedBoxGeo(0.86, 0.72, 1.72, 0.08, 0.03, 'y'),
      mats.varistorRingBlue
    );
    sfBuf.position.set(-0.92, -0.1, 0);

    // Stage 3: High-gain Switched-Capacitor Differential Amplifier (twin C1/C2 MIM ratio plates + reset switch!)
    const capC1 = new THREE.Mesh(hiResCyl(0.52, 0.52, 0.88, 12), mats.loficDielectric);
    capC1.position.set(0.28, -0.02, -0.58);
    const capC2 = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.88, 12), mats.fluorineCoatCyan);
    capC2.position.set(0.28, -0.02, 0.58);
    const rstSw = new THREE.Mesh(
      createChamferedBoxGeo(0.56, 0.24, 1.32, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    rstSw.position.set(0.28, 0.54, 0);

    // Stage 4: Dual Hysteresis ON (+θ cyan) & OFF (-θ crimson) Comparators + 4-phase AER REQ/ACK handshake rails!
    const onComp = new THREE.Mesh(hiResCyl(0.46, 0.46, 1.38, 12), mats.vcWorkingFluidCyan);
    onComp.position.set(1.68, 0.26, -0.78);
    const offComp = new THREE.Mesh(hiResCyl(0.46, 0.46, 1.38, 12), mats.bodyRecRed);
    offComp.position.set(1.68, 0.26, 0.78);
    for (const [az, amat] of [
      [-1.08, mats.goldPlating],
      [-0.36, mats.copperHybridBond],
      [0.36, mats.silverElectrode],
      [1.08, mats.fluorineCoatCyan],
    ] as const) {
      const aerPin = new THREE.Mesh(
        createChamferedBoxGeo(0.76, 0.24, 0.24, 0.03, 0.01, 'y'),
        amat
      );
      aerPin.position.set(2.74, -0.34, az);
      aerPin.userData.noEdges = true;
      g.add(aerPin);
    }

    const sigBus = makeBondStrut(
      new THREE.Vector3(-2.1, 0.52, 0),
      new THREE.Vector3(1.68, 0.72, -0.72),
      0.065,
      mats.goldPlating,
      6
    );
    const sigBus2 = makeBondStrut(
      new THREE.Vector3(0.32, 0.54, 0.1),
      new THREE.Vector3(1.68, 0.72, 0.72),
      0.065,
      mats.copperHybridBond,
      6
    );
    g.add(logAmp, logRing, sfBuf, capC1, capC2, rstSw, onComp, offComp, sigBus, sigBus2);

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-evs-log-change-pixel',
        48,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, -3.6, 15.2),
        new THREE.Vector3(0, -12.0, 48.0),
        cp,
        0.24
      )
    );
  }

  // P2-49. 200nm-Pitch Wafer-to-Wafer (W2W) Cu/SiCN Micro-Bond Array (imec IEDM 2025 Paper 33-5)
  {
    const g = new THREE.Group();
    const sicnGeo = extrudeHiRes(createRoundedRectShape(6.2, 3.8, 0.4), 0.36, 0.05, 0.05, 2, 12);
    sicnGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(sicnGeo, 6.2, 3.8, 'xz');
    const bottomDie = new THREE.Mesh(sicnGeo, u.v2PixelHybridBondCu);
    bottomDie.position.y = -0.96;
    const midSicnSeam = makeHiResHorizPlate(
      createFrameShape(6.2, 3.8, 0.38, 5.3, 2.9, 0.2),
      0.16,
      mats.fluorineCoatCyan,
      0.02,
      1,
      10
    );
    const topDieRim = makeHiResHorizPlate(
      createFrameShape(6.2, 3.8, 0.38, 5.0, 2.6, 0.2),
      0.34,
      mats.siliconBulk,
      0.04,
      1,
      12
    );
    topDieRim.position.y = 0.96;
    g.add(bottomDie, midSicnSeam, topDieRim);

    // 5x3 ultra-dense 200nm-pitch Cu hybrid-bond pairs (top + bottom CMP thermally expanded fusion domes + TaN wraps!)
    const cuHalfGeo = hiResCyl(0.22, 0.25, 0.62, 10);
    const linerGeo = hiResCyl(0.29, 0.31, 0.56, 10);
    const seamCollarGeo = hiResTorus(0.28, 0.045, 6, 10);
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const px = ix * 1.04;
        const pz = iz * 0.98;
        const botWrap = new THREE.Mesh(linerGeo, mats.taNBarrierLiner);
        botWrap.position.set(px, -0.34, pz);
        botWrap.userData.noEdges = true;
        const botCu = new THREE.Mesh(cuHalfGeo, mats.copperHybridBond);
        botCu.position.set(px, -0.34, pz);
        botCu.userData.noEdges = true;
        const topCu = new THREE.Mesh(cuHalfGeo, mats.copperHeatSpreader);
        topCu.position.set(px, 0.34, pz);
        topCu.userData.noEdges = true;
        const weld = new THREE.Mesh(seamCollarGeo, mats.goldPlating);
        weld.rotation.x = Math.PI / 2;
        weld.position.set(px, 0.0, pz);
        weld.userData.noEdges = true;
        g.add(botWrap, botCu, topCu, weld);
      }
      // Top M_top redistribution copper bus track feeding each column of 200nm bond pillars
      const rdl = new THREE.Mesh(
        createChamferedBoxGeo(0.22, 0.14, 3.3, 0.02, 0.01, 'y'),
        mats.copperHybridBond
      );
      rdl.position.set(ix * 1.04, 0.72, 0);
      rdl.userData.noEdges = true;
      g.add(rdl);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-200nm-w2w-hybrid-array',
        49,
        '#d97736',
        g,
        new THREE.Vector3(0, -7.2, -15.4),
        new THREE.Vector3(0, -24.0, -48.0),
        cp,
        0.24
      )
    );
  }

  // P2-50. Buried Charge-Domain GS Storage Node (SN) Light-Shield Trench
  {
    const g = new THREE.Group();
    // Hermetic Tungsten armor vault + top overhang light visor + inner SiO2 conformal liner + pinned P+/N/P storage diode!
    const outerVault = makeHiResHorizPlate(
      createFrameShape(4.5, 4.1, 0.4, 3.25, 2.85, 0.24),
      2.15,
      mats.tungstenLightShield,
      0.06,
      2,
      12
    );
    const visorRoof = makeHiResHorizPlate(
      createFrameShape(4.85, 4.45, 0.36, 2.6, 2.2, 0.2),
      0.24,
      mats.tungstenGrid,
      0.04,
      1,
      12
    );
    visorRoof.position.y = 1.18;
    const oxideBed = new THREE.Mesh(
      createChamferedBoxGeo(3.15, 0.3, 2.75, 0.1, 0.03, 'y'),
      mats.quartzOlpf
    );
    oxideBed.position.y = -0.84;
    // Pinned P+ / N / P subterranean storage diode sandwich inside the armor vault
    const snNWell = new THREE.Mesh(
      createChamferedBoxGeo(2.55, 0.88, 2.15, 0.14, 0.04, 'y'),
      mats.dramCellArray
    );
    snNWell.position.y = -0.16;
    const snPinCap = new THREE.Mesh(
      createChamferedBoxGeo(2.58, 0.2, 2.18, 0.08, 0.02, 'y'),
      mats.bodyRecRed
    );
    snPinCap.position.y = 0.4;
    g.add(outerVault, visorRoof, oxideBed, snNWell, snPinCap);

    // Left SG (Global Transfer-In) vertical gate arm + Right TG2 (Row Readout) planar gate + overflow reset tap!
    const sgArm = new THREE.Mesh(
      createChamferedBoxGeo(1.18, 0.36, 1.25, 0.06, 0.02, 'y'),
      mats.gatePolysilicon
    );
    sgArm.position.set(-2.38, 0.72, 0);
    const sgDrop = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 1.35, 1.1, 0.04, 0.02, 'y'),
      mats.gatePolysilicon
    );
    sgDrop.position.set(-1.95, 0.15, 0);
    const tg2Arm = new THREE.Mesh(
      createChamferedBoxGeo(1.18, 0.36, 1.25, 0.06, 0.02, 'y'),
      mats.goldPlating
    );
    tg2Arm.position.set(2.38, 0.72, 0);
    const ofdTap = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.78, 10), mats.copperHybridBond);
    ofdTap.position.set(0, 0.78, -1.78);
    g.add(sgArm, sgDrop, tg2Arm, ofdTap);

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-gs-storage-node-trench',
        50,
        '#334155',
        g,
        new THREE.Vector3(-15.2, -7.4, 6.4),
        new THREE.Vector3(-48.0, -26.0, 22.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // TIER 4 — RAMP DAC, 16:1 CML SERIALIZER, OB DUMMY, ALPHA GUARD & DUAL-CDS (P2-51 – P2-55)
  // =========================================================================

  // P2-51. Column-Parallel Thermometer Current-Steering Multi-Slope Ramp DAC (Sensors 2025)
  {
    const g = new THREE.Group();
    const dacBase = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.8, 0.4),
      0.42,
      mats.siliconLogicLayer,
      0.05,
      2,
      12
    );
    dacBase.position.y = -1.02;
    g.add(dacBase);

    // 4x4 Common-Centroid Matched Thermometer Current-Source Matrix (16 unary cells eliminating DNL glitches!)
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 4; iz++) {
        const idx = ix * 4 + iz;
        const h = 0.34 + idx * 0.11;
        const cell = new THREE.Mesh(
          createChamferedBoxGeo(0.68, h, 0.68, 0.05, 0.02, 'y'),
          idx >= 12 ? mats.goldPlating : (ix + iz) % 2 === 0 ? mats.varistorRingBlue : mats.vcWorkingFluidCyan
        );
        cell.position.set(-1.32 + ix * 0.88, -0.8 + h * 0.5, -1.32 + iz * 0.88);
        cell.userData.noEdges = true;
        g.add(cell);
      }
    }

    // 3-way Multi-Slope Gear-Switch Mux bar + Precision Laser-Trimmed Serpentine Load Resistor along right edge!
    const cascodeRail = new THREE.Mesh(
      createChamferedBoxGeo(3.8, 0.26, 0.34, 0.04, 0.02, 'y'),
      mats.copperHybridBond
    );
    cascodeRail.position.set(0, -0.68, 1.98);
    // Piece-wise Dual-Slope Ramp Curve sculpture (gentle high-precision dark slope -> steep fast highlight slope!)
    const slopeLow = makeBondStrut(
      new THREE.Vector3(-1.75, -0.22, 2.02),
      new THREE.Vector3(0.25, 0.44, 2.02),
      0.09,
      mats.vcWorkingFluidCyan,
      7
    );
    const slopeHigh = makeBondStrut(
      new THREE.Vector3(0.25, 0.44, 2.02),
      new THREE.Vector3(1.75, 1.62, 2.02),
      0.09,
      mats.goldPlating,
      7
    );
    const kneeNode = new THREE.Mesh(hiResSphere(0.18, 8, 6), mats.bodyRecRed);
    kneeNode.position.set(0.25, 0.44, 2.02);
    kneeNode.userData.noEdges = true;
    g.add(cascodeRail, slopeLow, slopeHigh, kneeNode);

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-thermometer-ramp-dac',
        51,
        '#3b82f6',
        g,
        new THREE.Vector3(15.2, -8.8, 7.0),
        new THREE.Vector3(48.0, -32.0, 24.0),
        cp,
        0.24
      )
    );
  }

  // P2-52. High-Speed 16:1 TSPC/CML Post-Emphasis Pixel Serializer (Sensors 2026)
  {
    const g = new THREE.Group();
    const serDeck = makeHiResHorizPlate(
      createRoundedRectShape(6.8, 3.4, 0.4),
      0.4,
      mats.ispSiliconDie,
      0.05,
      2,
      14
    );
    serDeck.position.y = -0.62;
    g.add(serDeck);

    // 8 fine parallel ADC input bus pins on far left entering the 4-stage binary mux funnel!
    for (let i = 0; i < 8; i++) {
      const inTrace = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.1, 0.14),
        mats.silverElectrode
      );
      inTrace.position.set(-2.96, -0.34, -1.12 + i * 0.32);
      inTrace.userData.noEdges = true;
      g.add(inTrace);
    }

    // 4-stage binary funnel: 16:8 TSPC -> 8:4 TSPC -> 4:2 TSPC -> 2:1 High-Speed CML + 2-tap Post-Emphasis Driver!
    const stageSpecs = [
      { x: -2.18, w: 0.7, d: 2.6, mat: mats.siliconLogicLayer },
      { x: -1.04, w: 0.7, d: 1.9, mat: mats.varistorRingBlue },
      { x: 0.08, w: 0.7, d: 1.25, mat: mats.copperHybridBond },
      { x: 1.18, w: 0.84, d: 0.86, mat: mats.goldPlating },
    ];
    for (const st of stageSpecs) {
      const blk = new THREE.Mesh(
        createChamferedBoxGeo(st.w, 0.68, st.d, 0.07, 0.03, 'y'),
        st.mat
      );
      blk.position.set(st.x, -0.04, 0);
      g.add(blk);
    }
    // 2-tap FIR Post-Emphasis auxiliary tail driver block
    const preEmph = new THREE.Mesh(
      createChamferedBoxGeo(0.68, 0.44, 0.56, 0.05, 0.02, 'y'),
      mats.bodyRecRed
    );
    preEmph.position.set(1.18, 0.46, 0);
    g.add(preEmph);

    // Twin multi-turn concentric octagonal spiral T-coil inductive-peaking inductors + 100-ohm differential SLVS-EC launch pads!
    for (const sz of [-0.78, 0.78]) {
      for (const rad of [0.28, 0.48, 0.66]) {
        const turn = new THREE.Mesh(hiResTorus(rad, 0.055, 6, 8), mats.copperCoil);
        turn.rotation.x = Math.PI / 2;
        turn.position.set(2.38, 0.14, sz);
        turn.userData.noEdges = true;
        g.add(turn);
      }
      const tapVia = new THREE.Mesh(hiResCyl(0.11, 0.11, 0.52, 8), mats.goldPlating);
      tapVia.position.set(2.38, 0.14, sz);
      tapVia.userData.noEdges = true;
      const outPad = new THREE.Mesh(
        createChamferedBoxGeo(0.42, 0.24, 0.42, 0.04, 0.02, 'y'),
        mats.goldPlating
      );
      outPad.position.set(3.16, -0.26, sz);
      outPad.userData.noEdges = true;
      g.add(tapVia, outPad);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-16to1-cml-serializer',
        52,
        '#f59e0b',
        g,
        new THREE.Vector3(0, -10.8, 15.2),
        new THREE.Vector3(0, -38.0, 48.0),
        cp,
        0.24
      )
    );
  }

  // P2-53. Optical Black (OB) Dark-Current Reference Dummy Cell
  {
    const g = new THREE.Group();
    // Exact twin of an active pixel photodiode + dummy TG buried beneath a 3-layer labyrinthine Al/W/Black Faraday cap!
    const dummyPd = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 1.24, 3.6, 0.14, 0.04, 'y'),
      mats.siliconPhotodiode
    );
    dummyPd.position.y = -0.78;
    const dummyTg = new THREE.Mesh(
      createChamferedBoxGeo(1.15, 0.32, 1.5, 0.05, 0.02, 'y'),
      mats.gatePolysilicon
    );
    dummyTg.position.set(0.92, -0.02, 0);
    // 3-layer labyrinthine optical seal roof (Tungsten core + Matte Black Polymer + Top Aluminum mirror)
    const wShield = new THREE.Mesh(
      createChamferedBoxGeo(4.25, 0.34, 4.25, 0.12, 0.04, 'y'),
      mats.tungstenLightShield
    );
    wShield.position.y = 0.28;
    const blackAbs = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.36, 4.4, 0.14, 0.04, 'y'),
      mats.matteBlackAnodized
    );
    blackAbs.position.y = 0.68;
    const alCap = new THREE.Mesh(
      createChamferedBoxGeo(4.58, 0.28, 4.58, 0.14, 0.04, 'y'),
      mats.silverElectrode
    );
    alCap.position.y = 1.06;
    g.add(dummyPd, dummyTg, wShield, blackAbs, alCap);

    // Staggered perimeter light-baffle teeth blocking lateral waveguide creep + digital black-clamp feedback register!
    for (let k = -1; k <= 1; k++) {
      const tooth = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 1.15, 0.64, 0.04, 0.02, 'y'),
        mats.tungstenGrid
      );
      tooth.position.set(-2.06, -0.34, k * 1.18);
      tooth.userData.noEdges = true;
      g.add(tooth);
    }
    const clampReg = new THREE.Mesh(
      createChamferedBoxGeo(0.86, 0.96, 1.95, 0.08, 0.03, 'y'),
      mats.varistorRingBlue
    );
    clampReg.position.set(2.12, -0.42, 0);
    const clampPin = new THREE.Mesh(hiResCyl(0.18, 0.18, 1.25, 10), mats.goldPlating);
    clampPin.position.set(2.12, 0.42, 0);
    g.add(clampReg, clampPin);

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-ob-dark-ref-pixel',
        53,
        '#1e293b',
        g,
        new THREE.Vector3(-15.2, -11.8, -1.6),
        new THREE.Vector3(-48.0, -42.0, -6.0),
        cp,
        0.24
      )
    );
  }

  // P2-54. Low-Alpha / Cosmic-Ray Deep Substrate Charge-Collection Guard Ring
  {
    const g = new THREE.Group();
    // Double-moat octagonal deep substrate chassis: Outer N-buried Collector Moat + Inner Deep P-Well Barrier Moat!
    const outerMoat = makeHiResHorizPlate(
      createFrameShape(29.0, 29.0, 2.4, 25.6, 25.6, 1.8),
      0.92,
      mats.tungstenGrid,
      0.08,
      2,
      18
    );
    const innerMoat = makeHiResHorizPlate(
      createFrameShape(24.8, 24.8, 1.7, 23.0, 23.0, 1.4),
      0.64,
      mats.siliconTransistorLayer,
      0.05,
      1,
      14
    );
    innerMoat.position.y = 0.14;
    const buriedBus = makeHiResHorizPlate(
      createFrameShape(27.5, 27.5, 2.0, 26.1, 26.1, 1.6),
      0.34,
      mats.copperHybridBond,
      0.04,
      1,
      14
    );
    buriedBus.position.y = 0.56;
    g.add(outerMoat, innerMoat, buriedBus);

    // 8 perimeter tungsten substrate contact via turrets along all 4 sides
    for (const [vx, vz] of [
      [-6.5, -13.6],
      [6.5, -13.6],
      [-6.5, 13.6],
      [6.5, 13.6],
      [-13.6, -6.5],
      [-13.6, 6.5],
      [13.6, -6.5],
      [13.6, 6.5],
    ]) {
      const via = new THREE.Mesh(hiResCyl(0.46, 0.52, 1.15, 8), mats.silverElectrode);
      via.position.set(vx, 0.34, vz);
      via.userData.noEdges = true;
      g.add(via);
    }

    // 4 heavy corner ionizing-charge drain sumps with Kelvin sense rings & deflected alpha-track arcs!
    for (const [cx, cz] of [
      [-13.4, -13.4],
      [13.4, -13.4],
      [-13.4, 13.4],
      [13.4, 13.4],
    ]) {
      const sump = new THREE.Mesh(hiResCyl(1.18, 1.38, 1.45, 8), mats.goldPlating);
      sump.position.set(cx, 0.26, cz);
      const collar = new THREE.Mesh(hiResTorus(1.48, 0.14, 7, 16), mats.bodyRecRed);
      collar.rotation.x = Math.PI / 2;
      collar.position.set(cx, 0.68, cz);
      collar.userData.noEdges = true;
      const kelvinRing = new THREE.Mesh(hiResTorus(1.88, 0.08, 6, 16), mats.fluorineCoatCyan);
      kelvinRing.rotation.x = Math.PI / 2;
      kelvinRing.position.set(cx, 0.25, cz);
      kelvinRing.userData.noEdges = true;
      g.add(sump, collar, kelvinRing);
    }

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-cosmic-alpha-guard-ring',
        54,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -15.8, 0),
        new THREE.Vector3(0, -64.0, 0),
        cp,
        0.22
      )
    );
  }

  // P2-55. In-Pixel Column-Parallel Switched-Cap Dual-CDS Clamp Bridge
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.8, 0.4),
      0.42,
      mats.siliconLogicLayer,
      0.05,
      2,
      12
    );
    base.position.y = -0.96;
    g.add(base);

    // Twin Common-Centroid Fingered MIM Sample-and-Hold Capacitors (C_rst & C_sig) canceling kTC reset noise!
    for (const [cz, capMat] of [
      [-1.16, mats.loficDielectric],
      [1.16, mats.vcWorkingFluidCyan],
    ] as const) {
      const cap = new THREE.Mesh(hiResCyl(0.9, 0.9, 1.32, 16), capMat);
      cap.position.set(-0.78, -0.06, cz);
      const topPlate = new THREE.Mesh(hiResCyl(0.94, 0.94, 0.16, 16), mats.goldPlating);
      topPlate.position.set(-0.78, 0.68, cz);
      topPlate.userData.noEdges = true;
      // Bootstrapped NMOS sampling switch + half-size dummy charge-injection canceller switch
      const mainSw = new THREE.Mesh(
        createChamferedBoxGeo(0.54, 0.46, 0.62, 0.05, 0.02, 'y'),
        mats.gatePolysilicon
      );
      mainSw.position.set(0.42, -0.48, cz);
      const dummySw = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 0.36, 0.56, 0.04, 0.01, 'y'),
        mats.bodyRecRed
      );
      dummySw.position.set(0.86, -0.52, cz);
      dummySw.userData.noEdges = true;
      g.add(cap, topPlate, mainSw, dummySw);
    }

    // Differential Auto-Zero Pre-Amp + Digital Up/Down Counter subtraction bridge on right side!
    const diffBridge = new THREE.Mesh(
      createChamferedBoxGeo(1.08, 1.12, 3.35, 0.1, 0.04, 'y'),
      mats.ispSiliconDie
    );
    diffBridge.position.set(1.52, -0.1, 0);
    const upDownBus = new THREE.Mesh(
      createChamferedBoxGeo(0.42, 0.32, 2.8, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    upDownBus.position.set(1.52, 0.62, 0);
    const linkA = makeBondStrut(
      new THREE.Vector3(-0.35, 0.64, -1.16),
      new THREE.Vector3(1.42, 0.54, -0.92),
      0.075,
      mats.copperHybridBond,
      6
    );
    const linkB = makeBondStrut(
      new THREE.Vector3(-0.35, 0.64, 1.16),
      new THREE.Vector3(1.42, 0.54, 0.92),
      0.075,
      mats.copperHybridBond,
      6
    );
    g.add(diffBridge, upDownBus, linkA, linkB);

    parts.push(
      finalizeDeepPixelV2Part(
        'pv2-dual-cds-clamp-bridge',
        55,
        '#0d9488',
        g,
        new THREE.Vector3(15.2, -12.4, -1.6),
        new THREE.Vector3(48.0, -44.0, -6.0),
        cp,
        0.24
      )
    );
  }

  // Preserve full electron-microscope micro-tessellation on every sculpted geometry
  for (const part of parts) {
    part.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.geometry) {
        markHiRes(obj.geometry);
      }
    });
  }

  return parts;
}
