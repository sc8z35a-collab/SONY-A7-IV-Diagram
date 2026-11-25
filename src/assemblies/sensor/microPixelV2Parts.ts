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
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizePixelV2Part(
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

/**
 * 3/4 architectural cutaway frame shape leaving the front-right (+X, +Z) viewing window open
 * so deep nanoscale structures (Si atomic lattice, TG halo, 3D LOFIC pillars, hybrid bond domes)
 * remain dramatically visible even in the assembled state!
 */
function createCutawayWallShape(outerHalf: number, wallThick: number): THREE.Shape {
  const o = outerHalf;
  const i = outerHalf - wallThick;
  const cut = -1.6;
  const s = new THREE.Shape();
  s.moveTo(-o, -o);
  s.lineTo(cut, -o);
  s.lineTo(cut, -i);
  s.lineTo(-i, -i);
  s.lineTo(-i, i);
  s.lineTo(i, i);
  s.lineTo(i, -cut);
  s.lineTo(o, -cut);
  s.lineTo(o, o);
  s.lineTo(-o, o);
  s.closePath();
  return s;
}

/** Create a precision L-shaped or cross-shaped meta-atom pillar for authentic phase-gradient metasurfaces */
function createCrossPillarShape(armLen: number, armThick: number): THREE.Shape {
  const a = armLen * 0.5;
  const t = armThick * 0.5;
  const s = new THREE.Shape();
  s.moveTo(-t, -a);
  s.lineTo(t, -a);
  s.lineTo(t, -t);
  s.lineTo(a, -t);
  s.lineTo(a, t);
  s.lineTo(t, t);
  s.lineTo(t, a);
  s.lineTo(-t, a);
  s.lineTo(-t, t);
  s.lineTo(-a, t);
  s.lineTo(-a, -t);
  s.lineTo(-t, -t);
  s.closePath();
  return s;
}

/** Helper to connect two 3D points with a precision cylinder strut (covalent bonds, molecular bridges, interconnects) */
function makeStrutBetween(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius: number,
  mat: THREE.Material,
  segs = 8
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
 * Build all 30 hyper-detailed, electron-microscope-grade 3D CAD nanoscale assemblies of the
 * Pixel V2 Ultra-Microscopic Atomic & 2026 Quantum Dissection (`P2-01` – `P2-30`).
 *
 * Scale: Single Sub-Pixel zoomed 10x–50x closer than Pixel V1 (~1.0 um pitch -> 26 x 26 CAD units;
 * 1 CAD unit ≈ 35–40 nanometers!). Upright studio presentation along +Y (photon arrival)
 * down to -Y (3-wafer stacked on-sensor AI / Fine12bit ADC / Quad-Pixel PUF logic).
 * Every single component renders authentic micro-features: multi-pored soccer-ball brochosomes,
 * cross/elliptical phase-gradient TiO2 meta-atoms, core-shell colloidal quantum dots with ligand
 * bridges, full 3D (100) tetrahedral silicon supercell + excited e-/h+ pair, multi-layered B-DTI
 * stress-relief wall, 25 coaxial 3D LOFIC trench capacitors (front row cutaway!), inverted-T vertical
 * transfer gate with halo/pocket lobes, protruding CMP Cu-Cu hybrid bonds with -OH Si-O-Si covalent
 * bridges & lamellar <111> nanotwin crystal planes, barrierless Ru air-gap M0/M1 tracks, and
 * 2026 LYTIA 901 / CIP MAC / Fine12bit / Weighted SPAD TDC / CIS-PUF silicon blocks!
 */
export function buildMicroPixelV2Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;
  const W = 26.0;
  const H = W * 0.5; // 13.0

  // =========================================================================
  // ZONE A — 2026 NANOPHOTONICS & SUB-WAVELENGTH SURFACE ENGINEERING (y = +14.4 .. +7.7)
  // =========================================================================

  // P2-01. Biomimetic Nanoscale Brochosome Broadband Anti-Reflective Coating (AVS 2026)
  {
    const g = new THREE.Group();
    const baseRim = makeHiResHorizPlate(
      createFrameShape(W, W, 1.8, W - 2.4, W - 2.4, 1.1),
      0.42,
      mats.fluorineCoatCyan,
      0.09,
      2,
      22
    );
    g.add(baseRim);

    // Anti-static grounding micro-clips on rim corners
    for (const [cx, cz] of [
      [-11.8, -11.8],
      [11.8, -11.8],
      [-11.8, 11.8],
      [11.8, 11.8],
    ]) {
      const clip = new THREE.Mesh(
        createChamferedBoxGeo(1.4, 0.56, 1.4, 0.08, 0.05, 'y'),
        mats.goldPlating
      );
      clip.position.set(cx, 0.16, cz);
      clip.userData.noEdges = true;
      g.add(clip);
    }

    // 5x5 grid of sculpted multi-pored soccer-ball brochosome nanospheres (with 5-ring pentagonal dimple collars!)
    const shellGeo = hiResSphere(1.48, 18, 14);
    const poreCollarGeo = hiResTorus(0.46, 0.12, 8, 14);
    const poreHoleGeo = hiResCyl(0.36, 0.24, 0.34, 10);
    const pedGeo = hiResCyl(0.68, 0.84, 0.36, 12);

    const sideAngles = [0, 1.256, 2.513, 3.77, 5.026]; // 5-fold pentagonal brochosome symmetry!
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        // Leave front-right (+X, +Z) viewing window cutaway open to inspect underlying metasurface pillars
        if (ix >= 1 && iz >= 1) continue;
        const bx = ix * 4.45;
        const bz = iz * 4.45;

        const ped = new THREE.Mesh(pedGeo, mats.quartzOlpf);
        ped.position.set(bx, -0.1, bz);
        ped.userData.noEdges = true;
        g.add(ped);

        const dome = new THREE.Mesh(shellGeo, mats.fluorineCoatCyan);
        dome.scale.set(1, 0.84, 1);
        dome.position.set(bx, 0.62, bz);
        dome.userData.noEdges = true;
        g.add(dome);

        // Top central light-trap honeycomb pore + dark optical trap pit
        const topCollar = new THREE.Mesh(poreCollarGeo, mats.silverElectrode);
        topCollar.rotation.x = Math.PI / 2;
        topCollar.position.set(bx, 1.84, bz);
        topCollar.userData.noEdges = true;
        const topPit = new THREE.Mesh(poreHoleGeo, mats.matteBlackAnodized);
        topPit.position.set(bx, 1.68, bz);
        topPit.userData.noEdges = true;
        g.add(topCollar, topPit);

        // 5 angled lateral pentagonal dimples with recessed dark honeycomb cavities around each brochosome sphere!
        for (const ang of sideAngles) {
          const lx = bx + Math.cos(ang) * 1.14;
          const lz = bz + Math.sin(ang) * 1.14;
          const lookTarget = new THREE.Vector3(bx + Math.cos(ang) * 3.0, 2.2, bz + Math.sin(ang) * 3.0);
          const sCollar = new THREE.Mesh(poreCollarGeo, mats.silverElectrode);
          sCollar.position.set(lx, 1.16, lz);
          sCollar.lookAt(lookTarget);
          sCollar.scale.setScalar(0.84);
          sCollar.userData.noEdges = true;
          const sPit = new THREE.Mesh(hiResSphere(0.28, 8, 6), mats.matteBlackAnodized);
          sPit.position.set(bx + Math.cos(ang) * 1.06, 1.12, bz + Math.sin(ang) * 1.06);
          sPit.userData.noEdges = true;
          g.add(sCollar, sPit);
        }
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-brochosome-ar',
        1,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 14.3, 0),
        new THREE.Vector3(0, 54.0, 0),
        cp,
        0.18
      )
    );
  }

  // P2-02. Asymmetric Phase-Gradient TiO2 Metasurface Nano-Pillar Array (IEDM 2025 / 2026)
  {
    const g = new THREE.Group();
    const subGeo = extrudeHiRes(createRoundedRectShape(W - 0.3, W - 0.3, 1.5), 0.48, 0.07, 0.07, 2, 22);
    subGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(subGeo, W - 0.3, W - 0.3, 'xz');
    const subPlate = new THREE.Mesh(subGeo, u.v2PixelMetasurface);
    subPlate.position.y = -0.68;
    g.add(subPlate);

    // Alignment vernier scale bars along edges (50nm lithographic overlay metrology marks!)
    for (let k = -4; k <= 4; k++) {
      const tick = new THREE.Mesh(
        new THREE.BoxGeometry(k % 2 === 0 ? 0.32 : 0.16, 0.16, 0.9),
        mats.goldPlating
      );
      tick.position.set(k * 2.4, -0.38, H - 0.85);
      tick.userData.noEdges = true;
      g.add(tick);
    }

    // 7x7 phase-graded TiO2 meta-atoms: central high-phase cross pillars -> mid anisotropic bars -> outer cylinders
    const crossGeoBig = extrudeHiRes(createCrossPillarShape(2.1, 0.72), 2.35, 0.05, 0.05, 1, 6);
    crossGeoBig.rotateX(-Math.PI / 2);
    const crossGeoMid = extrudeHiRes(createCrossPillarShape(1.55, 0.52), 2.05, 0.04, 0.04, 1, 6);
    crossGeoMid.rotateX(-Math.PI / 2);

    for (let ix = -3; ix <= 3; ix++) {
      for (let iz = -3; iz <= 3; iz++) {
        const px = ix * 3.15;
        const pz = iz * 3.15;
        const dist = Math.hypot(ix, iz);
        let pillar: THREE.Mesh;
        if (dist <= 1.5) {
          pillar = new THREE.Mesh(crossGeoBig, mats.nanoArIridescent);
          pillar.position.set(px, 0.72, pz);
          pillar.rotation.y = (ix + iz) * 0.22;
        } else if (dist <= 2.9) {
          pillar = new THREE.Mesh(crossGeoMid, mats.aluminaHighKFilm);
          pillar.position.set(px, 0.56, pz);
          pillar.rotation.y = Math.atan2(iz, ix);
        } else {
          const r = Math.max(0.32, 0.72 - (dist - 2.9) * 0.18);
          const ph = Math.max(1.35, 1.85 - (dist - 2.9) * 0.2);
          pillar = new THREE.Mesh(hiResCyl(r * 0.88, r, ph, 12), mats.fluorineCoatCyan);
          pillar.position.set(px, ph * 0.5 - 0.44, pz);
        }
        pillar.userData.noEdges = true;
        g.add(pillar);

        // SiO2 phase-index pedestal ring at pillar base
        const baseDot = new THREE.Mesh(hiResCyl(0.95, 1.02, 0.14, 10), mats.quartzOlpf);
        baseDot.position.set(px, -0.38, pz);
        baseDot.userData.noEdges = true;
        g.add(baseDot);
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-meta-phase-pillars',
        2,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 12.2, 0),
        new THREE.Vector3(0, 45.0, 0),
        cp,
        0.22
      )
    );
  }

  // P2-03. Colloidal Quantum Dot (PbS / InAs CQD) SWIR & Visible Extended Nanocrystal Film
  {
    const g = new THREE.Group();
    // Transparent ITO top & bottom carrier-extraction interdigitated electrodes sandwiching the CQD film
    const matrix = makeHiResHorizPlate(
      createRoundedRectShape(W - 1.1, W - 1.1, 1.3),
      0.34,
      mats.lensEdGlass,
      0.05,
      1,
      18
    );
    matrix.position.y = -0.34;
    g.add(matrix);

    // Top transparent ITO charge-collection finger combs
    for (let i = -3; i <= 3; i++) {
      const comb = new THREE.Mesh(
        createChamferedBoxGeo(W - 2.4, 0.14, 0.36, 0.03, 0.02, 'y'),
        mats.fluorineCoatCyan
      );
      comb.position.set(0, 0.62, i * 3.0);
      comb.userData.noEdges = true;
      g.add(comb);
    }

    // Hexagonal close-packed Core-Shell Colloidal Quantum Dots + inorganic halide ligand bridge arms!
    const coreGeo = hiResSphere(0.54, 12, 10);
    const shellTorusGeo = hiResTorus(0.76, 0.11, 6, 14);
    const dotCenters: THREE.Vector3[] = [];
    for (let r = -3; r <= 3; r++) {
      for (let c = -3; c <= 3; c++) {
        const qx = c * 3.1 + (r % 2 === 0 ? 0 : 1.55);
        const qz = r * 2.72;
        if (Math.abs(qx) > H - 1.9 || Math.abs(qz) > H - 1.9) continue;
        const pos = new THREE.Vector3(qx, 0.14, qz);
        dotCenters.push(pos);

        // Size-tuned CQD cores (small=blue/green, medium=red, large=SWIR)
        const scale = 0.85 + ((Math.abs(r) + Math.abs(c)) % 3) * 0.24;
        const dotMat = (r + c) % 3 === 0 ? mats.bodyRecRed : (r + c) % 3 === 1 ? mats.goldPlating : mats.mountShimBlue;
        const dot = new THREE.Mesh(coreGeo, dotMat);
        dot.position.copy(pos);
        dot.scale.setScalar(scale);
        dot.userData.noEdges = true;
        g.add(dot);

        const shell = new THREE.Mesh(shellTorusGeo, mats.silverElectrode);
        shell.rotation.x = Math.PI / 2;
        shell.position.copy(pos);
        shell.scale.setScalar(scale * 0.95);
        shell.userData.noEdges = true;
        g.add(shell);
      }
    }
    // Halide ligand electron-hopping bridges between nearest CQD neighbors
    for (let i = 0; i < dotCenters.length; i++) {
      for (let j = i + 1; j < dotCenters.length; j++) {
        const d = dotCenters[i].distanceTo(dotCenters[j]);
        if (d > 2.4 && d < 3.35) {
          g.add(makeStrutBetween(dotCenters[i], dotCenters[j], 0.08, mats.copperHybridBond, 6));
        }
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-qd-swir-absorber',
        3,
        '#e11d48',
        g,
        new THREE.Vector3(0, 10.6, 0),
        new THREE.Vector3(-30.0, 38.0, 12.0),
        cp,
        0.2
      )
    );
  }

  // P2-04. Nano-Dispersed DPP Molecular Dye & Nanoparticle CFA Micro-Crystal Layer
  {
    const g = new THREE.Group();
    // Anti-bleed cross optical baffle blades separating the 4 micro-crystalline Bayer sub-tiles
    const bafX = new THREE.Mesh(createChamferedBoxGeo(W - 1.2, 1.08, 0.65, 0.06, 0.04, 'y'), mats.tungstenGrid);
    const bafZ = new THREE.Mesh(createChamferedBoxGeo(0.65, 1.08, W - 1.2, 0.06, 0.04, 'y'), mats.tungstenGrid);
    g.add(bafX, bafZ);

    const quadMats = [
      { x: -5.8, z: -5.8, mat: mats.cfaRed, crys: mats.bodyRecRed },
      { x: 5.8, z: -5.8, mat: mats.cfaGreen, crys: mats.bodyBatteryCell },
      { x: -5.8, z: 5.8, mat: mats.cfaGreen, crys: mats.bodyBatteryCell },
      { x: 5.8, z: 5.8, mat: mats.cfaBlue, crys: mats.mountShimBlue },
    ];
    const hexGeo = hiResCyl(0.72, 0.72, 0.42, 6);
    const coronaGeo = hiResTorus(0.92, 0.09, 6, 12);

    for (const q of quadMats) {
      const tile = makeHiResHorizPlate(
        createRoundedRectShape(10.6, 10.6, 0.85),
        0.88,
        q.mat,
        0.1,
        2,
        16
      );
      tile.position.set(q.x, 0, q.z);
      g.add(tile);

      // 3x3 array of dispersed 20nm hexagonal DPP pigment nanocrystals + polymeric dispersant corona rings!
      for (let ix = -1; ix <= 1; ix++) {
        for (let iz = -1; iz <= 1; iz++) {
          const cx = q.x + ix * 3.0;
          const cz = q.z + iz * 3.0;
          const crys = new THREE.Mesh(hexGeo, q.crys);
          crys.position.set(cx, 0.44, cz);
          crys.rotation.y = (ix + iz) * 0.4;
          crys.userData.noEdges = true;
          const corona = new THREE.Mesh(coronaGeo, mats.silverElectrode);
          corona.rotation.x = Math.PI / 2;
          corona.position.set(cx, 0.48, cz);
          corona.userData.noEdges = true;
          g.add(crys, corona);
        }
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-cfa-quantum-dye',
        4,
        '#16a34a',
        g,
        new THREE.Vector3(0, 9.5, 0),
        new THREE.Vector3(0, 32.0, 0),
        cp,
        0.22
      )
    );
  }

  // P2-05. Sub-Wavelength Plasmonic Metal Nano-Slit Light-Funneling Aperture
  {
    const g = new THREE.Group();
    const plate = makeHiResHorizPlate(
      createFrameShape(W - 0.5, W - 0.5, 1.4, 9.0, 9.0, 4.5),
      0.58,
      mats.goldPlating,
      0.09,
      2,
      26
    );
    g.add(plate);

    // 5 corrugated concentric sawtooth Bragg plasmonic coupling rings (top + bottom surface!)
    for (const [r, thick] of [
      [5.5, 0.26],
      [7.0, 0.28],
      [8.5, 0.30],
      [10.0, 0.28],
      [11.4, 0.24],
    ]) {
      const topRing = new THREE.Mesh(hiResTorus(r, thick, 10, 48), mats.copperHeatSpreader);
      topRing.rotation.x = Math.PI / 2;
      topRing.position.y = 0.32;
      topRing.userData.noEdges = true;
      g.add(topRing);
    }

    // 8 radial polarization-stabilizing impedance-matching nano-ribs around the sub-wavelength throat
    for (let k = 0; k < 8; k++) {
      const ang = (k / 8) * Math.PI * 2;
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 0.52, 0.32, 0.04, 0.03, 'y'),
        mats.silverElectrode
      );
      rib.position.set(Math.cos(ang) * 4.55, 0.08, Math.sin(ang) * 4.55);
      rib.rotation.y = -ang;
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Tapered metallic plasmonic funnel nozzle & tungsten anti-stray knife edge
    const nozzle = new THREE.Mesh(hiResCyl(4.45, 3.35, 0.72, 36, true), mats.tungstenGrid);
    nozzle.position.y = -0.35;
    const innerLip = new THREE.Mesh(hiResTorus(3.35, 0.22, 10, 36), mats.tungstenLightShield);
    innerLip.rotation.x = Math.PI / 2;
    innerLip.position.y = -0.68;
    g.add(nozzle, innerLip);

    parts.push(
      finalizePixelV2Part(
        'pv2-plasmonic-aperture',
        5,
        '#eab308',
        g,
        new THREE.Vector3(0, 8.6, 0),
        new THREE.Vector3(30.0, 26.0, -10.0),
        cp,
        0.24
      )
    );
  }

  // P2-06. In-Pixel Multi-Level Nano-Fresnel Diffractive Zone-Step Ring
  {
    const g = new THREE.Group();
    // 8-level stepped concentric SiN diffraction terraces (95% theoretical diffraction efficiency!)
    const radii = [11.8, 10.4, 9.0, 7.6, 6.2, 4.8, 3.4, 2.0];
    radii.forEach((r, idx) => {
      const innerR = idx < radii.length - 1 ? radii[idx + 1] + 0.08 : 0.75;
      const shape = new THREE.Shape();
      shape.absarc(0, 0, r, 0, Math.PI * 2, false);
      const hole = new THREE.Path();
      hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
      shape.holes.push(hole);
      const stepH = 0.24 + (idx % 4) * 0.20;
      const ring = makeHiResHorizPlate(
        shape,
        stepH,
        idx % 2 === 0 ? mats.quartzOlpf : mats.nanoArIridescent,
        0.04,
        1,
        40
      );
      ring.position.set(idx * 0.05, stepH * 0.5 - 0.35, idx * 0.05); // Subtle CRA off-axis shift!
      g.add(ring);
    });

    // 4 radial alignment fiducial spokes verifying multi-mask etch depth
    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2 + Math.PI / 4;
      const spoke = new THREE.Mesh(
        createChamferedBoxGeo(2.0, 0.24, 0.28, 0.03, 0.02, 'y'),
        mats.silverElectrode
      );
      spoke.position.set(Math.cos(ang) * 12.1, -0.15, Math.sin(ang) * 12.1);
      spoke.rotation.y = -ang;
      spoke.userData.noEdges = true;
      g.add(spoke);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-fresnel-zone-step',
        6,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 7.7, 0),
        new THREE.Vector3(-26.0, 21.0, -16.0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // ZONE B — ATOMIC SILICON SURFACE & QUANTUM PHOTOELECTRIC CORE (y = +6.9 .. +1.7)
  // =========================================================================

  // P2-07. Single-Crystal Silicon (100) Diamond Atomic Lattice & e-/h+ Pair Generation Site
  {
    const g = new THREE.Group();
    const siCoreGeo = extrudeHiRes(createCutawayWallShape(H - 1.2, 4.9), 4.7, 0.12, 0.12, 2, 18);
    siCoreGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(siCoreGeo, W - 2.4, W - 2.4, 'xz');
    const siBlock = new THREE.Mesh(siCoreGeo, u.v2PixelSiLattice);
    g.add(siBlock);

    // Full 3D Diamond-Cubic Silicon Unit-Cell Superlattice inside the wide-open front-right cutaway stage!
    // Corner + Face-Centered + Tetrahedral Interior atoms with EVERY sp3 covalent bond connected!
    const atomGeo = hiResSphere(0.48, 14, 12);
    const cellA = 3.55; // Lattice constant a = 0.5431 nm scaled for crystalline clarity
    const ox = 2.8;
    const oz = 2.8;
    const fccPts: THREE.Vector3[] = [];
    const tetPts: THREE.Vector3[] = [];

    for (let ix = 0; ix <= 2; ix++) {
      for (let iy = 0; iy <= 2; iy++) {
        for (let iz = 0; iz <= 2; iz++) {
          if ((ix + iy + iz) % 2 !== 0) continue; // FCC sublattice parity
          const p = new THREE.Vector3(
            ox + (ix - 0.5) * cellA,
            (iy - 1.0) * (cellA * 0.58),
            oz + (iz - 0.5) * cellA
          );
          fccPts.push(p);
          const atom = new THREE.Mesh(atomGeo, mats.mountShimBlue);
          atom.position.copy(p);
          atom.userData.noEdges = true;
          g.add(atom);
        }
      }
    }

    // 4 tetrahedral interior silicon atoms at (+1/4, +1/4, +1/4) offsets
    const tetOffsets: Array<[number, number, number]> = [
      [0.5, 0.5, 0.5],
      [1.5, 0.5, 1.5],
      [1.5, 1.5, 0.5],
      [0.5, 1.5, 1.5],
    ];
    tetOffsets.forEach(([tx, ty, tz], idx) => {
      const p = new THREE.Vector3(
        ox + (tx - 0.5) * cellA,
        (ty - 1.0) * (cellA * 0.58),
        oz + (tz - 0.5) * cellA
      );
      tetPts.push(p);
      const isExcited = idx === 1;
      const atom = new THREE.Mesh(
        hiResSphere(isExcited ? 0.62 : 0.46, 14, 12),
        isExcited ? mats.goldPlating : mats.fluorineCoatCyan
      );
      atom.position.copy(p);
      atom.userData.noEdges = true;
      g.add(atom);

      // Connect this tetrahedral atom to all 4 nearest FCC corner/face atoms (sp3 109.5° covalent bonds!)
      for (const fp of fccPts) {
        if (fp.distanceTo(p) < cellA * 0.9) {
          g.add(makeStrutBetween(p, fp, 0.11, isExcited ? mats.goldPlating : mats.silverElectrode, 8));
        }
      }
    });

    // Liberated photoelectron (e-) orbital halo + positive valence hole (h+) ring + incoming photon ray!
    const excitedSite = tetPts[1];
    const electronOrb = new THREE.Mesh(hiResSphere(0.42, 12, 10), mats.fluorineCoatCyan);
    electronOrb.position.set(excitedSite.x + 1.35, excitedSite.y - 1.05, excitedSite.z + 1.35);
    electronOrb.userData.noEdges = true;
    const eHalo = new THREE.Mesh(hiResTorus(0.62, 0.08, 6, 18), mats.fluorineCoatCyan);
    eHalo.position.copy(electronOrb.position);
    eHalo.rotation.set(Math.PI / 3, Math.PI / 4, 0);
    eHalo.userData.noEdges = true;
    const holeRing = new THREE.Mesh(hiResTorus(0.76, 0.12, 8, 18), mats.bodyRecRed);
    holeRing.position.copy(excitedSite);
    holeRing.rotation.x = Math.PI / 4;
    holeRing.userData.noEdges = true;
    const photonStart = new THREE.Vector3(excitedSite.x + 0.8, excitedSite.y + 2.4, excitedSite.z + 0.8);
    const photonRay = makeStrutBetween(photonStart, excitedSite, 0.1, mats.goldPlating, 8);
    g.add(electronOrb, eHalo, holeRing, photonRay);

    parts.push(
      finalizePixelV2Part(
        'pv2-si-diamond-lattice',
        7,
        '#0284c7',
        g,
        new THREE.Vector3(0, 4.4, 0),
        new THREE.Vector3(0, 12.0, 0),
        cp,
        0.24
      )
    );
  }

  // P2-08. ALD Atomic Layer Deposition Al2O3/HfO2/SiO2 Interface Dipole & 1nm Tunnel Oxide
  {
    const g = new THREE.Group();
    // 3 stepped ALD atomic films showing clean terraced cross-section
    const l1 = makeHiResHorizPlate(createRoundedRectShape(W - 1.4, W - 1.4, 1.1), 0.24, mats.aluminaHighKFilm, 0.04, 1, 18);
    l1.position.y = 0.30;
    const l2 = makeHiResHorizPlate(createRoundedRectShape(W - 2.3, W - 2.3, 1.0), 0.24, mats.loficDielectric, 0.04, 1, 18);
    l2.position.y = 0.0;
    const l3 = makeHiResHorizPlate(createRoundedRectShape(W - 3.2, W - 3.2, 0.9), 0.20, mats.quartzOlpf, 0.03, 1, 18);
    l3.position.y = -0.28;
    g.add(l1, l2, l3);

    // Sculpted atomic O2- / Al3+ / Hf4+ dipole dumbbells along all 4 terrace edges + accumulated +hole sheet!
    const negGeo = hiResSphere(0.28, 10, 8);
    const posGeo = hiResSphere(0.26, 10, 8);
    for (let i = -3; i <= 3; i++) {
      for (const side of [-1, 1]) {
        const ax = i * 3.0;
        const az = side * (H - 1.55);
        const topNeg = new THREE.Vector3(ax, 0.56, az);
        const botPos = new THREE.Vector3(ax, -0.52, az);
        const m = new THREE.Mesh(negGeo, mats.bodyRecRed);
        m.position.copy(topNeg);
        m.userData.noEdges = true;
        const p = new THREE.Mesh(posGeo, mats.mountShimBlue);
        p.position.copy(botPos);
        p.userData.noEdges = true;
        g.add(m, p, makeStrutBetween(topNeg, botPos, 0.07, mats.silverElectrode, 6));
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-ald-dipole-interface',
        8,
        '#7c3aed',
        g,
        new THREE.Vector3(0, 6.9, 0),
        new THREE.Vector3(28.0, 17.0, 14.0),
        cp,
        0.2
      )
    );
  }

  // P2-09. 3-Wafer 0.43um Multi-Layer Poly-Si B-DTI & Stress-Relief SiO2/SiN Composite Liner (IEDM 2025)
  {
    const g = new THREE.Group();
    // True 4-layer coaxial trench cross-section clearly visible at the cutaway ends!
    // Layer 1: Outer ALD Al2O3 negative-charge liner
    const aldWall = makeHiResHorizPlate(createCutawayWallShape(H, 1.55), 6.2, mats.aluminaHighKFilm, 0.06, 1, 16);
    // Layer 2: Compressive SiO2 stress-cushion liner
    const sio2Wall = makeHiResHorizPlate(createCutawayWallShape(H - 0.18, 1.18), 6.38, mats.ftiOxide, 0.05, 1, 16);
    // Layer 3: Tensile SiN stress-compensating counter-liner
    const sinWall = makeHiResHorizPlate(createCutawayWallShape(H - 0.36, 0.82), 6.55, mats.fluorineCoatCyan, 0.04, 1, 16);
    // Layer 4: Central negatively-biased doped Poly-Si electrode fill core
    const polyCore = makeHiResHorizPlate(createCutawayWallShape(H - 0.54, 0.46), 6.82, mats.gatePolysilicon, 0.04, 1, 16);
    g.add(aldWall, sio2Wall, sinWall, polyCore);

    // Top negative-bias (-1.5V) electrode contact busbars & tungsten tie-vias
    for (const [vx, vz] of [
      [-H + 0.78, -H + 0.78],
      [-H + 0.78, H - 0.78],
      [H - 0.78, -H + 0.78],
    ]) {
      const via = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.85, 12), mats.goldPlating);
      via.position.set(vx, 3.65, vz);
      via.userData.noEdges = true;
      g.add(via);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-dti-core-stress-liner',
        9,
        '#475569',
        g,
        new THREE.Vector3(0, 4.2, 0),
        new THREE.Vector3(-32.0, 10.0, -18.0),
        cp,
        0.24
      )
    );
  }

  // P2-10. 3D Potential Trough & Lateral Drift Electric-Field Profile (Sub-ns Electron Slide)
  {
    const g = new THREE.Group();
    // 6-tier sculpted 3D equipotential funnel chute (N1 -> N2 -> N3 -> N4) + directional drift field chevrons!
    const steps = 6;
    for (let s = 0; s < steps; s++) {
      const sz = 14.8 - s * 1.95;
      const ring = makeHiResHorizPlate(
        createFrameShape(sz, sz, 1.4 - s * 0.16, Math.max(1.8, sz - 1.65), Math.max(1.8, sz - 1.65), 0.65),
        0.42,
        s < 2 ? mats.siliconDepletion : s < 4 ? mats.siliconPhotodiode : mats.mountShimBlue,
        0.07,
        2,
        18
      );
      ring.position.set(0.95 * (s / steps), 1.35 - s * 0.48, 0.95 * (s / steps));
      g.add(ring);
    }

    // 4 sculpted 3D electrostatic drift-field guide rails converging from outer corners down into the TG exit!
    const exitPt = new THREE.Vector3(1.0, -1.35, 1.0);
    for (const [sx, sz] of [
      [-6.5, -6.5],
      [6.5, -6.5],
      [-6.5, 6.5],
      [6.5, 6.5],
    ]) {
      const startPt = new THREE.Vector3(sx, 1.55, sz);
      g.add(makeStrutBetween(startPt, exitPt, 0.16, mats.goldPlating, 8));
      const cone = new THREE.Mesh(hiResCyl(0.02, 0.36, 0.72, 10), mats.goldPlating);
      const mid = new THREE.Vector3().lerpVectors(startPt, exitPt, 0.65);
      cone.position.copy(mid);
      cone.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3().subVectors(exitPt, startPt).normalize()
      );
      cone.userData.noEdges = true;
      g.add(cone);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-quantum-confinement-well',
        10,
        '#2563eb',
        g,
        new THREE.Vector3(0, 3.2, 0),
        new THREE.Vector3(30.0, 7.0, 18.0),
        cp,
        0.22
      )
    );
  }

  // P2-11. Silicon Backside 2D Photonic-Crystal Nanohole Diffraction Grating (NIR Light Trapping)
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(W - 2.4, W - 2.4, 1.0),
      0.56,
      mats.siliconBulk,
      0.06,
      2,
      18
    );
    g.add(base);

    // Lower Bragg metallic NIR back-reflector mirror ring beneath the photonic slab
    const braggRim = makeHiResHorizPlate(
      createFrameShape(W - 2.6, W - 2.6, 0.9, W - 5.2, W - 5.2, 0.7),
      0.16,
      mats.goldPlating,
      0.03,
      1,
      18
    );
    braggRim.position.y = -0.34;
    g.add(braggRim);

    // 7x7 precision tapered photonic-crystal nanohole funnels + diffraction rim collars
    const holeRimGeo = hiResTorus(0.78, 0.15, 8, 18);
    const holeCoreGeo = hiResCyl(0.66, 0.42, 0.68, 14);
    for (let ix = -3; ix <= 3; ix++) {
      for (let iz = -3; iz <= 3; iz++) {
        if (Math.abs(ix) + Math.abs(iz) > 5) continue;
        const hx = ix * 2.95;
        const hz = iz * 2.95;
        const rim = new THREE.Mesh(holeRimGeo, mats.silverElectrode);
        rim.rotation.x = Math.PI / 2;
        rim.position.set(hx, 0.30, hz);
        rim.userData.noEdges = true;
        const core = new THREE.Mesh(holeCoreGeo, mats.matteBlackAnodized);
        core.position.set(hx, 0.02, hz);
        core.userData.noEdges = true;
        g.add(rim, core);
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-nir-photonic-crystal',
        11,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 6.2, 0),
        new THREE.Vector3(-30.0, 15.0, 18.0),
        cp,
        0.22
      )
    );
  }

  // P2-12. 6-Tap Short-Pulse iToF High-Speed Charge-Routing Gate Ring (G1–G6 & Drain GD, 2025/2026)
  {
    const g = new THREE.Group();
    // 6 contoured radial demodulation finger gates + tungsten gate vias + FD1–FD6 collection islands + skew-matched feed arcs!
    for (let t = 0; t < 6; t++) {
      const ang = (t / 6) * Math.PI * 2;
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);

      // Tapered high-speed gate finger
      const gateArm = new THREE.Mesh(
        createChamferedBoxGeo(4.6, 0.68, 1.85, 0.1, 0.06, 'y'),
        t % 2 === 0 ? mats.gatePolysilicon : mats.goldPlating
      );
      gateArm.position.set(cos * 6.0, 0, sin * 6.0);
      gateArm.rotation.y = -ang;
      g.add(gateArm);

      // Gate-oxide dielectric skirt under each tap gate
      const oxSkirt = new THREE.Mesh(
        createChamferedBoxGeo(4.8, 0.22, 2.05, 0.04, 0.03, 'y'),
        mats.quartzOlpf
      );
      oxSkirt.position.set(cos * 6.0, -0.44, sin * 6.0);
      oxSkirt.rotation.y = -ang;
      oxSkirt.userData.noEdges = true;
      g.add(oxSkirt);

      // Tungsten contact stud on top of each tap gate (776 ps rise-time drive feed!)
      const gVia = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.72, 10), mats.stainlessMachined);
      gVia.position.set(cos * 6.5, 0.65, sin * 6.5);
      gVia.userData.noEdges = true;
      g.add(gVia);

      // Dedicated FD1–FD6 tap diffusion island + copper readout via
      const tapBase = new THREE.Mesh(hiResCyl(1.35, 1.48, 0.56, 16), mats.siliconTransistorLayer);
      tapBase.position.set(cos * 9.5, -0.1, sin * 9.5);
      tapBase.userData.noEdges = true;
      const tapPad = new THREE.Mesh(hiResCyl(0.88, 0.88, 0.85, 16), mats.copperHybridBond);
      tapPad.position.set(cos * 9.5, 0.24, sin * 9.5);
      tapPad.userData.noEdges = true;
      g.add(tapBase, tapPad);
    }

    // Central circular overflow drain gate (GD) ring + 3 grounding radial spokes
    const gdRing = new THREE.Mesh(hiResTorus(2.85, 0.38, 12, 36), mats.tungstenGrid);
    gdRing.rotation.x = Math.PI / 2;
    const gdCore = new THREE.Mesh(hiResCyl(1.5, 1.5, 0.65, 20), mats.cinnabarAnodized);
    g.add(gdRing, gdCore);

    parts.push(
      finalizePixelV2Part(
        'pv2-multi-tap-iToF-gates',
        12,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 1.7, 0),
        new THREE.Vector3(34.0, 4.0, -14.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // ZONE C — TRANSFER GATE QUANTUM PHYSICS & SUB-1e- READOUT MECHANICS (y = +0.2 .. -4.4)
  // =========================================================================

  // P2-13. Transfer Gate Anti-Lag Pocket Implant & Halo Potential Barrier Profile
  {
    const g = new THREE.Group();
    // Inverted-T Vertical Transfer Gate (VTG) polysilicon pillar + 7nm curved gate oxide liner + SiN sidewall spacers!
    const tgTop = new THREE.Mesh(
      createChamferedBoxGeo(7.8, 1.15, 4.4, 0.14, 0.1, 'y'),
      mats.gatePolysilicon
    );
    tgTop.position.set(-2.5, 0.82, 0);
    const tgStem = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.35, 3.5, 0.12, 0.08, 'y'),
      mats.gatePolysilicon
    );
    tgStem.position.set(-2.5, -0.78, 0);
    // Thin 7nm thermal gate oxide shell wrapping the VTG pillar
    const gateOx = new THREE.Mesh(
      createChamferedBoxGeo(3.22, 2.52, 3.88, 0.08, 0.06, 'y'),
      mats.fluorineCoatCyan
    );
    gateOx.position.set(-2.5, -0.82, 0);
    gateOx.userData.noEdges = true;
    // Dual SiN sidewall dielectric spacers flanking the top polysilicon T-head
    for (const sx of [-6.55, 1.55]) {
      const spacer = new THREE.Mesh(
        createChamferedBoxGeo(0.65, 1.25, 4.45, 0.08, 0.05, 'y'),
        mats.aluminaHighKFilm
      );
      spacer.position.set(sx, 0.72, 0);
      spacer.userData.noEdges = true;
      g.add(spacer);
    }
    // Tungsten top gate contact stud + silicide cap
    const tgContact = new THREE.Mesh(hiResCyl(0.75, 0.75, 0.95, 16), mats.goldPlating);
    tgContact.position.set(-2.5, 1.78, 0);
    g.add(tgTop, tgStem, gateOx, tgContact);

    // Sculpted N-type anti-lag pocket ramp lobes (PPD heel) & P-type halo barrier sleeve (FD side)
    const pocket = new THREE.Mesh(hiResSphere(2.15, 18, 14), mats.mountShimBlue);
    pocket.scale.set(1.35, 0.62, 1.05);
    pocket.position.set(-4.8, -1.45, 0);
    const halo = new THREE.Mesh(
      createChamferedBoxGeo(1.55, 1.65, 4.15, 0.14, 0.08, 'y'),
      mats.cinnabarAnodized
    );
    halo.position.set(-0.2, -1.25, 0);
    g.add(pocket, halo);

    parts.push(
      finalizePixelV2Part(
        'pv2-tg-halo-pocket',
        13,
        '#dc2626',
        g,
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(-30.0, 1.0, 16.0),
        cp,
        0.24
      )
    );
  }

  // P2-14. Transfer Gate Feed-Through Canceller Rail (tg_null Anti-Phase Line, 2026 Photon Counting)
  {
    const g = new THREE.Group();
    // Coplanar differential TG rail + anti-phase tg_null rail + central grounded Faraday shield rail!
    const tgBus = new THREE.Mesh(createChamferedBoxGeo(21.4, 0.62, 1.35, 0.08, 0.05, 'y'), mats.copperHybridBond);
    tgBus.position.set(0, 0.22, -2.9);
    const gndShield = new THREE.Mesh(createChamferedBoxGeo(21.4, 0.42, 0.62, 0.05, 0.03, 'y'), mats.stainlessMachined);
    gndShield.position.set(0, 0.16, 0);
    const nullBus = new THREE.Mesh(createChamferedBoxGeo(21.4, 0.62, 1.35, 0.08, 0.05, 'y'), mats.mountShimBlue);
    nullBus.position.set(0, 0.22, 2.9);
    g.add(tgBus, gndShield, nullBus);

    // 3 precision interdigitated finger MOM coupling capacitor banks linking tg_null to FD node
    for (const cx of [-6.4, 0, 6.4]) {
      const capDeck = new THREE.Mesh(createChamferedBoxGeo(3.0, 0.34, 4.6, 0.06, 0.04, 'y'), mats.aluminaHighKFilm);
      capDeck.position.set(cx, -0.05, 0);
      g.add(capDeck);
      for (let f = -2; f <= 2; f++) {
        const finger = new THREE.Mesh(
          createChamferedBoxGeo(0.28, 0.42, 3.6, 0.03, 0.02, 'y'),
          f % 2 === 0 ? mats.goldPlating : mats.copperHybridBond
        );
        finger.position.set(cx + f * 0.46, 0.28, f % 2 === 0 ? -0.25 : 0.25);
        finger.userData.noEdges = true;
        g.add(finger);
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-tg-null-feedthrough',
        14,
        '#0284c7',
        g,
        new THREE.Vector3(0, -0.8, 0),
        new THREE.Vector3(32.0, -2.0, 16.0),
        cp,
        0.24
      )
    );
  }

  // P2-15. Ultra-Low-Capacitance Floating Diffusion (FD) Suspended Inside Nanoscale Air-Gap Pocket
  {
    const g = new THREE.Group();
    // Carved low-k dielectric moat wall + outer grounded Faraday guard ring
    const moatFrame = makeHiResHorizPlate(
      createFrameShape(11.2, 11.2, 1.6, 7.6, 7.6, 1.4),
      1.38,
      mats.interlayerDielectric,
      0.1,
      2,
      20
    );
    const guardCollar = makeHiResHorizPlate(
      createFrameShape(11.6, 11.6, 1.7, 10.6, 10.6, 1.5),
      0.34,
      mats.stainlessMachined,
      0.04,
      1,
      20
    );
    guardCollar.position.y = 0.72;
    g.add(moatFrame, guardCollar);

    // Ultra-compact N++ FD silicon island + NiSi ohmic silicide cap + vertical tungsten contact stud!
    const fdBase = new THREE.Mesh(hiResCyl(2.25, 1.85, 1.15, 24), mats.siliconTransistorLayer);
    const fdCap = new THREE.Mesh(hiResCyl(1.95, 2.15, 0.42, 24), mats.goldPlating);
    fdCap.position.y = 0.74;
    const sensePin = new THREE.Mesh(hiResCyl(0.58, 0.58, 2.8, 16), mats.copperHybridBond);
    sensePin.position.y = -0.35;
    const senseRing = new THREE.Mesh(hiResTorus(0.92, 0.14, 8, 20), mats.goldPlating);
    senseRing.rotation.x = Math.PI / 2;
    senseRing.position.y = 0.96;
    g.add(fdBase, fdCap, sensePin, senseRing);

    // 4 slender cantilevered SiO2 micro-bridges suspending the FD island across the k=1.0 air-gap moat!
    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2 + Math.PI / 4;
      const strut = new THREE.Mesh(
        createChamferedBoxGeo(2.9, 0.30, 0.42, 0.04, 0.03, 'y'),
        mats.quartzOlpf
      );
      strut.position.set(Math.cos(ang) * 3.25, 0.12, Math.sin(ang) * 3.25);
      strut.rotation.y = -ang;
      strut.userData.noEdges = true;
      g.add(strut);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-fd-airgap-isolation',
        15,
        '#facc15',
        g,
        new THREE.Vector3(4.4, -1.6, 4.4),
        new THREE.Vector3(26.0, -5.0, 26.0),
        cp,
        0.24
      )
    );
  }

  // P2-16. LYTIA L910 (June 2026) 3D Deep Cylindrical-Trench ZrO2/Al2O3 LOFIC High-Density Capacitor
  {
    const g = new THREE.Group();
    // Upper collector bus manifold + LOFIC overflow-transfer MOSFET switch module on top!
    const manifold = makeHiResHorizPlate(
      createRoundedRectShape(11.6, 11.6, 1.2),
      0.56,
      mats.stainlessMachined,
      0.08,
      2,
      18
    );
    manifold.position.y = 1.75;
    const swGate = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.65, 2.2, 0.08, 0.05, 'y'),
      mats.goldPlating
    );
    swGate.position.set(2.8, 2.28, 2.8);
    g.add(manifold, swGate);

    // 5x5 = 25 ultra-deep coaxial 3D cylindrical trench MIM pillars!
    // Front row (iz === 2) uses half-cylinder cutaway (thetaLength = PI) so you see ALL 4 coaxial layers inside!
    const fullOuterGeo = hiResCyl(0.84, 0.78, 3.7, 16);
    const fullZazGeo = hiResCyl(0.68, 0.63, 3.82, 14);
    const fullInnerGeo = hiResCyl(0.42, 0.38, 3.96, 12);
    const cutOuterGeo = hiResCyl(0.84, 0.78, 3.7, 14, false, Math.PI, Math.PI);
    const cutZazGeo = hiResCyl(0.68, 0.63, 3.82, 12, false, Math.PI, Math.PI);
    const cutInnerGeo = hiResCyl(0.42, 0.38, 3.96, 12);

    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        const px = ix * 2.08;
        const pz = iz * 2.08;
        const isCut = iz === 2;
        const outer = new THREE.Mesh(isCut ? cutOuterGeo : fullOuterGeo, mats.taNBarrierLiner);
        outer.position.set(px, -0.1, pz);
        outer.userData.noEdges = true;
        const diel = new THREE.Mesh(isCut ? cutZazGeo : fullZazGeo, mats.loficDielectric);
        diel.position.set(px, -0.04, pz);
        diel.userData.noEdges = true;
        const core = new THREE.Mesh(isCut ? cutInnerGeo : fullInnerGeo, mats.copperHybridBond);
        core.position.set(px, 0.02, pz);
        core.userData.noEdges = true;
        g.add(outer, diel, core);
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-lofic-3d-pillar-cap',
        16,
        '#8b5cf6',
        g,
        new THREE.Vector3(-5.8, -2.5, -5.2),
        new THREE.Vector3(-34.0, -8.0, -18.0),
        cp,
        0.22
      )
    );
  }

  // P2-17. Source-Follower SiON Interface RTN Single-Electron Trap Shield & Buried Channel
  {
    const g = new THREE.Group();
    // Recessed STI shoulders + silicon MOSFET body
    const body = new THREE.Mesh(createChamferedBoxGeo(11.0, 1.5, 5.6, 0.14, 0.1, 'y'), mats.siliconTransistorLayer);
    g.add(body);

    // Buried electron-channel conduction ribbon suspended 8nm BELOW the Si/SiON interface!
    const buriedRibbon = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.34, 4.9, 0.06, 0.04, 'y'),
      mats.mountShimBlue
    );
    buriedRibbon.position.set(0, 0.18, 0);
    buriedRibbon.userData.noEdges = true;

    // Ultra-clean nitrided SiON trap-passivation blanket + nitrogen-passivated interface dots
    const sionBlanket = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 0.32, 4.8, 0.06, 0.04, 'y'),
      mats.fluorineCoatCyan
    );
    sionBlanket.position.y = 0.88;
    const gateBar = new THREE.Mesh(createChamferedBoxGeo(4.2, 0.96, 6.0, 0.12, 0.08, 'y'), mats.gatePolysilicon);
    gateBar.position.y = 1.48;
    // Gate sidewall spacers
    for (const sx of [-2.35, 2.35]) {
      const sp = new THREE.Mesh(createChamferedBoxGeo(0.45, 0.92, 6.0, 0.05, 0.04, 'y'), mats.aluminaHighKFilm);
      sp.position.set(sx, 1.44, 0);
      sp.userData.noEdges = true;
      g.add(sp);
    }

    // Raised NiSi Source & Drain pads + twin tungsten contact plugs
    for (const sx of [-4.0, 4.0]) {
      const pad = new THREE.Mesh(createChamferedBoxGeo(2.1, 0.72, 4.4, 0.08, 0.06, 'y'), mats.goldPlating);
      pad.position.set(sx, 0.95, 0);
      const plugA = new THREE.Mesh(hiResCyl(0.36, 0.36, 1.15, 12), mats.stainlessMachined);
      plugA.position.set(sx, 1.75, -1.1);
      plugA.userData.noEdges = true;
      const plugB = new THREE.Mesh(hiResCyl(0.36, 0.36, 1.15, 12), mats.stainlessMachined);
      plugB.position.set(sx, 1.75, 1.1);
      plugB.userData.noEdges = true;
      g.add(pad, plugA, plugB);
    }
    g.add(buriedRibbon, sionBlanket, gateBar);

    parts.push(
      finalizePixelV2Part(
        'pv2-sf-rtnoise-trap-shield',
        17,
        '#06b6d4',
        g,
        new THREE.Vector3(-5.0, -3.5, 5.6),
        new THREE.Vector3(-30.0, -12.0, 22.0),
        cp,
        0.24
      )
    );
  }

  // P2-18. VLSI 2026 75.6 uV Ultra-Low-Noise Noise-Coupled In-Pixel Differential Amplifier
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(createRoundedRectShape(11.4, 9.8, 1.0), 0.72, mats.siliconLogicLayer, 0.08, 2, 18);
    g.add(base);

    // Guard-ring perimeter moat
    const moat = makeHiResHorizPlate(
      createFrameShape(10.8, 9.2, 0.9, 9.8, 8.2, 0.7),
      0.26,
      mats.goldPlating,
      0.03,
      1,
      16
    );
    moat.position.y = 0.45;
    g.add(moat);

    // Symmetrical multi-finger twin differential MOSFETs + cascode current mirrors
    for (const sx of [-2.9, 2.9]) {
      const fet = new THREE.Mesh(createChamferedBoxGeo(3.8, 1.05, 6.4, 0.1, 0.08, 'y'), mats.stainlessMachined);
      fet.position.set(sx, 0.85, 0);
      g.add(fet);
      for (const fg of [-0.9, 0, 0.9]) {
        const gateFinger = new THREE.Mesh(
          createChamferedBoxGeo(0.42, 1.28, 6.9, 0.05, 0.04, 'y'),
          mats.copperHybridBond
        );
        gateFinger.position.set(sx + fg, 0.96, 0);
        gateFinger.userData.noEdges = true;
        g.add(gateFinger);
      }
    }

    // Cross-coupled interdigitated feedback noise-cancellation capacitor arch bridging the twin amps!
    const arch1 = new THREE.Mesh(createChamferedBoxGeo(6.8, 0.34, 1.2, 0.06, 0.04, 'y'), mats.goldPlating);
    arch1.position.set(0, 1.85, -1.3);
    const arch2 = new THREE.Mesh(createChamferedBoxGeo(6.8, 0.34, 1.2, 0.06, 0.04, 'y'), mats.fluorineCoatCyan);
    arch2.position.set(0, 1.85, 1.3);
    g.add(arch1, arch2);

    parts.push(
      finalizePixelV2Part(
        'pv2-noise-coupled-pixel-amp',
        18,
        '#10b981',
        g,
        new THREE.Vector3(5.6, -4.2, -5.0),
        new THREE.Vector3(34.0, -14.0, -20.0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // ZONE D — 2026 SUB-MICRON 3-WAFER HYBRID BONDING & NANO-INTERCONNECTS (y = -6.2 .. -10.2)
  // =========================================================================

  // P2-19. 300nm–400nm Pitch Protruding Cu-Cu Hybrid Bond & Sub-2nm CMP Dishing Interface (2025/2026)
  {
    const g = new THREE.Group();
    const plateGeo = extrudeHiRes(createRoundedRectShape(W, W, 1.5), 0.76, 0.08, 0.08, 2, 22);
    plateGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(plateGeo, W, W, 'xz');
    const padDeck = new THREE.Mesh(plateGeo, u.v2PixelHybridBondCu);
    g.add(padDeck);

    // 4x4 grid of protruding precision-CMP copper hybrid bond pedestals with TaN barrier cups & fusion micro-domes!
    const barrierCupGeo = hiResCyl(1.68, 1.82, 0.92, 20);
    const cuPedGeo = hiResCyl(1.42, 1.56, 1.18, 22);
    const domeCapGeo = hiResSphere(1.40, 16, 10);
    const seedCollarGeo = hiResTorus(1.52, 0.12, 8, 22);

    for (let ix = -1.5; ix <= 1.5; ix += 1) {
      for (let iz = -1.5; iz <= 1.5; iz += 1) {
        const px = ix * 5.65;
        const pz = iz * 5.65;
        const cup = new THREE.Mesh(barrierCupGeo, mats.taNBarrierLiner);
        cup.position.set(px, 0.52, pz);
        cup.userData.noEdges = true;
        const ped = new THREE.Mesh(cuPedGeo, mats.copperHybridBond);
        ped.position.set(px, 0.68, pz);
        ped.userData.noEdges = true;
        const dome = new THREE.Mesh(domeCapGeo, mats.copperHeatSpreader);
        dome.scale.set(1, 0.25, 1);
        dome.position.set(px, 1.28, pz);
        dome.userData.noEdges = true;
        const collar = new THREE.Mesh(seedCollarGeo, mats.goldPlating);
        collar.rotation.x = Math.PI / 2;
        collar.position.set(px, 0.96, pz);
        collar.userData.noEdges = true;
        g.add(cup, ped, dome, collar);
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-hbond-protruding-cu',
        19,
        '#d97736',
        g,
        new THREE.Vector3(0, -6.2, 0),
        new THREE.Vector3(0, -22.0, 0),
        cp,
        0.24
      )
    );
  }

  // P2-20. Plasma-Activated SiCN Surface (-OH Van der Waals & Si-O-Si Covalent Fusion Seam)
  {
    const g = new THREE.Group();
    const seam = makeHiResHorizPlate(
      createFrameShape(W + 0.2, W + 0.2, 1.6, W - 4.8, W - 4.8, 1.2),
      0.46,
      mats.taNBarrierLiner,
      0.06,
      2,
      22
    );
    g.add(seam);

    // 24 explicit 3D Si–O–Si covalent molecular bridges (Si top + O bridge + Si bottom + covalent struts!)
    const siGeo = hiResSphere(0.30, 10, 8);
    const oxGeo = hiResSphere(0.36, 10, 8);
    for (let k = 0; k < 24; k++) {
      const ang = (k / 24) * Math.PI * 2;
      const r = 11.4;
      const cx = Math.cos(ang) * r;
      const cz = Math.sin(ang) * r;
      const pTop = new THREE.Vector3(cx, 0.66, cz);
      const pMid = new THREE.Vector3(cx + Math.cos(ang) * 0.22, 0.34, cz + Math.sin(ang) * 0.22);
      const pBot = new THREE.Vector3(cx, 0.04, cz);

      const s1 = new THREE.Mesh(siGeo, mats.mountShimBlue);
      s1.position.copy(pTop);
      s1.userData.noEdges = true;
      const ox = new THREE.Mesh(oxGeo, mats.bodyRecRed);
      ox.position.copy(pMid);
      ox.userData.noEdges = true;
      const s2 = new THREE.Mesh(siGeo, mats.goldPlating);
      s2.position.copy(pBot);
      s2.userData.noEdges = true;
      g.add(s1, ox, s2, makeStrutBetween(pTop, pMid, 0.08, mats.silverElectrode, 6), makeStrutBetween(pMid, pBot, 0.08, mats.silverElectrode, 6));
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-sicn-oh-fusion-seam',
        20,
        '#38bdf8',
        g,
        new THREE.Vector3(0, -7.2, 0),
        new THREE.Vector3(30.0, -25.0, 12.0),
        cp,
        0.22
      )
    );
  }

  // P2-21. Nanotwin (111)-Oriented Copper Grain Recrystallization Pillar Cluster
  {
    const g = new THREE.Group();
    // 5 multi-faceted hexagonal prismatic nanotwin Cu columns sliced to reveal 7 alternating <111> twin planes!
    const positions: Array<[number, number]> = [
      [-6.5, -6.5],
      [6.5, -6.5],
      [-6.5, 6.5],
      [6.5, 6.5],
      [0, 0],
    ];
    for (const [cx, cz] of positions) {
      for (let layer = 0; layer < 7; layer++) {
        const isTwin = layer % 2 === 1;
        const disc = new THREE.Mesh(
          hiResCyl(2.25 - (isTwin ? 0.16 : 0), 2.25 - (isTwin ? 0 : 0.16), 0.25, 6),
          isTwin ? mats.goldPlating : mats.copperHybridBond
        );
        disc.position.set(cx, -0.84 + layer * 0.27, cz);
        disc.rotation.y = isTwin ? Math.PI / 6 : 0;
        disc.userData.noEdges = true;
        g.add(disc);
      }
      // Recrystallization grain-growth vertical centerline core
      const axisCore = new THREE.Mesh(hiResCyl(0.45, 0.45, 2.2, 12), mats.copperHeatSpreader);
      axisCore.position.set(cx, 0, cz);
      axisCore.userData.noEdges = true;
      g.add(axisCore);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-cu-nanotwin-grain',
        21,
        '#ea580c',
        g,
        new THREE.Vector3(0, -8.2, 0),
        new THREE.Vector3(-30.0, -28.0, -12.0),
        cp,
        0.22
      )
    );
  }

  // P2-22. Barrierless Ruthenium (Ru) Local Pixel Wiring & Adjacent Air-Gap Low-C Trenches
  {
    const g = new THREE.Group();
    const frame = makeHiResHorizPlate(
      createFrameShape(W - 0.6, W - 0.6, 1.3, W - 3.4, W - 3.4, 0.9),
      1.05,
      mats.interlayerDielectric,
      0.06,
      2,
      18
    );
    g.add(frame);

    // M0 X-axis Ruthenium rails + M1 Z-axis Cobalt/Ru cross rails + staggered vertical V0 vias across genuine air gaps!
    for (let i = -3; i <= 3; i++) {
      const m0 = new THREE.Mesh(createChamferedBoxGeo(W - 3.0, 0.42, 0.88, 0.06, 0.04, 'y'), mats.stainlessMachined);
      m0.position.set(0, 0.28, i * 2.95);
      m0.userData.noEdges = true;
      const m1 = new THREE.Mesh(createChamferedBoxGeo(0.88, 0.42, W - 3.0, 0.06, 0.04, 'y'), mats.silverElectrode);
      m1.position.set(i * 2.95, -0.32, 0);
      m1.userData.noEdges = true;
      g.add(m0, m1);

      // Vertical V0 bridge vias at diagonal crossings
      const v0 = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.68, 10), mats.goldPlating);
      v0.position.set(i * 2.95, -0.02, i * 2.95);
      v0.userData.noEdges = true;
      g.add(v0);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-ru-airgap-local-beol',
        22,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -9.2, 0),
        new THREE.Vector3(0, -32.0, 0),
        cp,
        0.24
      )
    );
  }

  // P2-23. 3-Wafer Stacked F2F + F2B 6um-Pitch Vertical Nano-TSV Column Array
  {
    const g = new THREE.Group();
    const linerGeo = hiResCyl(1.06, 0.90, 8.8, 18);
    const barrierGeo = hiResCyl(0.82, 0.72, 9.0, 16);
    const coreGeo = hiResCyl(0.64, 0.56, 9.28, 16);
    const collarGeo = hiResTorus(1.16, 0.16, 8, 22);
    const kozRingGeo = hiResTorus(1.62, 0.09, 6, 20);
    const pts: Array<[number, number]> = [
      [-11.2, -11.2],
      [0, -11.2],
      [11.2, -11.2],
      [-11.2, 0],
      [11.2, 0],
      [-11.2, 11.2],
      [0, 11.2],
      [11.2, 11.2],
    ];
    for (const [tx, tz] of pts) {
      const liner = new THREE.Mesh(linerGeo, mats.quartzOlpf);
      liner.position.set(tx, 0, tz);
      liner.userData.noEdges = true;
      const barrier = new THREE.Mesh(barrierGeo, mats.taNBarrierLiner);
      barrier.position.set(tx, 0, tz);
      barrier.userData.noEdges = true;
      const core = new THREE.Mesh(coreGeo, mats.copperHybridBond);
      core.position.set(tx, 0, tz);
      core.userData.noEdges = true;
      const topC = new THREE.Mesh(collarGeo, mats.goldPlating);
      topC.rotation.x = Math.PI / 2;
      topC.position.set(tx, 4.35, tz);
      topC.userData.noEdges = true;
      const botC = new THREE.Mesh(collarGeo, mats.goldPlating);
      botC.rotation.x = Math.PI / 2;
      botC.position.set(tx, -4.35, tz);
      botC.userData.noEdges = true;
      const koz = new THREE.Mesh(kozRingGeo, mats.fluorineCoatCyan);
      koz.rotation.x = Math.PI / 2;
      koz.position.set(tx, 0, tz);
      koz.userData.noEdges = true;
      g.add(liner, barrier, core, topC, botC, koz);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-3wafer-f2f-f2b-tsv',
        23,
        '#b45309',
        g,
        new THREE.Vector3(0, -10.2, 0),
        new THREE.Vector3(-36.0, -35.0, 14.0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // ZONE E — 2026 ON-SENSOR AI, FINE12BIT, WEIGHTED SPAD & CIS-PUF (y = -11.4 .. -14.5)
  // =========================================================================

  // P2-24. Sony LYTIA 901 (2025/2026 World-First) On-Sensor AI Learning-Based Remosaicing Circuit
  {
    const g = new THREE.Group();
    const baseGeo = extrudeHiRes(createRoundedRectShape(12.2, 12.2, 1.0), 1.15, 0.1, 0.1, 2, 18);
    baseGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(baseGeo, 12.2, 12.2, 'xz');
    const die = new THREE.Mesh(baseGeo, u.v2PixelAiCircuit);
    g.add(die);

    // 4x4 CNN Remosaic Processing Elements + weight SRAM bank + horizontal data-waveguide busbars
    for (let ix = -1.5; ix <= 1.5; ix += 1) {
      for (let iz = -1.5; iz <= 1.5; iz += 1) {
        const pe = new THREE.Mesh(createChamferedBoxGeo(1.75, 0.68, 1.75, 0.08, 0.05, 'y'), mats.npuSiliconDie);
        pe.position.set(ix * 2.5, 0.80, iz * 2.5);
        pe.userData.noEdges = true;
        const cap = new THREE.Mesh(createChamferedBoxGeo(1.1, 0.18, 1.1, 0.03, 0.02, 'y'), mats.goldPlating);
        cap.position.set(ix * 2.5, 1.20, iz * 2.5);
        cap.userData.noEdges = true;
        g.add(pe, cap);
      }
      const bus = new THREE.Mesh(createChamferedBoxGeo(10.6, 0.16, 0.24, 0.02, 0.02, 'y'), mats.copperHybridBond);
      bus.position.set(0, 0.68, ix * 2.5);
      bus.userData.noEdges = true;
      g.add(bus);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-on-sensor-ai-remosaic',
        24,
        '#6366f1',
        g,
        new THREE.Vector3(-6.4, -11.4, -6.4),
        new THREE.Vector3(-25.0, -40.0, -25.0),
        cp,
        0.24
      )
    );
  }

  // P2-25. Compute-in-Pixel (CIP) Analog Multiply-Accumulate (MAC) Synapse Crossbar (Sony 2026)
  {
    const g = new THREE.Group();
    const sub = makeHiResHorizPlate(createRoundedRectShape(12.2, 12.2, 1.0), 0.95, mats.ispSiliconDie, 0.1, 2, 18);
    g.add(sub);

    // 5x5 analog crossbar word/bit lines + discrete synaptic weight-capacitor cylinders at every intersection!
    const synGeo = hiResCyl(0.32, 0.32, 0.56, 10);
    for (let i = -2; i <= 2; i++) {
      const row = new THREE.Mesh(createChamferedBoxGeo(10.2, 0.22, 0.44, 0.04, 0.03, 'y'), mats.goldPlating);
      row.position.set(0, 0.58, i * 2.0);
      row.userData.noEdges = true;
      const col = new THREE.Mesh(createChamferedBoxGeo(0.44, 0.22, 10.2, 0.04, 0.03, 'y'), mats.copperHybridBond);
      col.position.set(i * 2.0, 1.08, 0);
      col.userData.noEdges = true;
      g.add(row, col);

      for (let j = -2; j <= 2; j++) {
        const syn = new THREE.Mesh(synGeo, (i + j) % 2 === 0 ? mats.fluorineCoatCyan : mats.loficDielectric);
        syn.position.set(i * 2.0, 0.83, j * 2.0);
        syn.userData.noEdges = true;
        g.add(syn);
      }
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-compute-in-pixel-mac',
        25,
        '#0d9488',
        g,
        new THREE.Vector3(6.4, -11.4, -6.4),
        new THREE.Vector3(25.0, -40.0, -25.0),
        cp,
        0.24
      )
    );
  }

  // P2-26. Fine12bit / 14bit Folded Dual-Ramp High-Speed ADC & Gray-Code Ripple Counter
  {
    const g = new THREE.Group();
    const tile = makeHiResHorizPlate(createRoundedRectShape(12.2, 12.2, 1.0), 0.95, mats.siliconLogicLayer, 0.1, 2, 18);
    g.add(tile);

    // Binary/Gray-code stair-step capacitor DAC bank + comparator front-end strip + Gray bus traces!
    for (let k = 0; k < 7; k++) {
      const stepH = 0.36 + k * 0.17;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(1.15, stepH, 8.2, 0.06, 0.04, 'y'),
        k % 2 === 0 ? mats.mountShimBlue : mats.silverElectrode
      );
      bar.position.set(-4.6 + k * 1.52, 0.48 + stepH * 0.5, -0.8);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    const compRail = new THREE.Mesh(createChamferedBoxGeo(10.6, 0.62, 1.8, 0.08, 0.05, 'y'), mats.goldPlating);
    compRail.position.set(0, 0.78, 4.4);
    g.add(compRail);

    parts.push(
      finalizePixelV2Part(
        'pv2-fine12bit-dual-ramp',
        26,
        '#3b82f6',
        g,
        new THREE.Vector3(-6.4, -11.4, 6.4),
        new THREE.Vector3(-25.0, -40.0, 25.0),
        cp,
        0.24
      )
    );
  }

  // P2-27. Canon VLSI 2025/2026 Weighted Photon Counting SPAD Time-to-First-Photon TDC Core
  {
    const g = new THREE.Group();
    const pkg = makeHiResHorizPlate(createRoundedRectShape(12.2, 12.2, 1.0), 0.95, mats.siliconDramLayer, 0.1, 2, 18);
    g.add(pkg);

    // Dual concentric Vernier ring-oscillator TDC tracks + 12 picosecond inverter delay cells + avalanche quench core
    const outerOsc = new THREE.Mesh(hiResTorus(4.2, 0.34, 10, 40), mats.goldPlating);
    outerOsc.rotation.x = Math.PI / 2;
    outerOsc.position.y = 0.78;
    const innerOsc = new THREE.Mesh(hiResTorus(2.4, 0.28, 10, 32), mats.fluorineCoatCyan);
    innerOsc.rotation.x = Math.PI / 2;
    innerOsc.position.y = 0.88;
    const quenchHub = new THREE.Mesh(hiResCyl(1.15, 1.15, 0.85, 20), mats.bodyRecRed);
    quenchHub.position.y = 0.85;
    g.add(outerOsc, innerOsc, quenchHub);

    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2;
      const inv = new THREE.Mesh(
        createChamferedBoxGeo(0.92, 0.64, 0.92, 0.05, 0.04, 'y'),
        i % 2 === 0 ? mats.bodyRecRed : mats.copperHybridBond
      );
      inv.position.set(Math.cos(ang) * 4.2, 1.02, Math.sin(ang) * 4.2);
      inv.rotation.y = -ang;
      inv.userData.noEdges = true;
      g.add(inv);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-weighted-spad-tdc',
        27,
        '#ef4444',
        g,
        new THREE.Vector3(6.4, -11.4, 6.4),
        new THREE.Vector3(25.0, -40.0, 25.0),
        cp,
        0.24
      )
    );
  }

  // P2-28. 2026 2x2 Shared In-Pixel ADC Hybrid Global Shutter Synchronization Unit
  {
    const g = new THREE.Group();
    const hub = makeHiResHorizPlate(createRoundedRectShape(14.8, 14.8, 1.4), 0.92, mats.siliconLogicLayer, 0.1, 2, 20);
    g.add(hub);

    // Symmetrical H-tree clock-sync arms + 4-quadrant MUX switch nodes + central shared ADC core
    const crossX = new THREE.Mesh(createChamferedBoxGeo(12.6, 0.42, 1.35, 0.08, 0.05, 'y'), mats.copperHybridBond);
    crossX.position.y = 0.64;
    const crossZ = new THREE.Mesh(createChamferedBoxGeo(1.35, 0.42, 12.6, 0.08, 0.05, 'y'), mats.copperHybridBond);
    crossZ.position.y = 0.64;
    const syncCore = new THREE.Mesh(hiResCyl(2.45, 2.45, 0.92, 24), mats.goldPlating);
    syncCore.position.y = 0.78;
    const syncHalo = new THREE.Mesh(hiResTorus(3.15, 0.22, 10, 32), mats.fluorineCoatCyan);
    syncHalo.rotation.x = Math.PI / 2;
    syncHalo.position.y = 0.72;
    g.add(crossX, crossZ, syncCore, syncHalo);

    for (const [qx, qz] of [
      [-4.6, -4.6],
      [4.6, -4.6],
      [-4.6, 4.6],
      [4.6, 4.6],
    ]) {
      const mux = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.62, 2.8, 0.08, 0.05, 'y'), mats.stainlessMachined);
      mux.position.set(qx, 0.74, qz);
      mux.userData.noEdges = true;
      g.add(mux);
    }

    parts.push(
      finalizePixelV2Part(
        'pv2-2x2-shared-hybrid-gs',
        28,
        '#f97316',
        g,
        new THREE.Vector3(0, -13.0, 0),
        new THREE.Vector3(0, -48.0, 0),
        cp,
        0.24
      )
    );
  }

  // P2-29. ISVLSI 2026 Quad-Pixel CIS-PUF Hardware Authenticity Cryptographic Fingerprint Cell
  {
    const g = new THREE.Group();
    const shield = buildChipPackage({
      w: 11.6,
      d: 8.8,
      h: 1.2,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
    });
    g.add(shield);
    // 4 quad-pixel entropy sense cells + central differential comparator + hardware SHA/ECDSA hash ring
    for (const [px, pz] of [
      [-3.1, -2.0],
      [3.1, -2.0],
      [-3.1, 2.0],
      [3.1, 2.0],
    ]) {
      const bitCell = new THREE.Mesh(createChamferedBoxGeo(2.2, 0.52, 2.1, 0.06, 0.04, 'y'), mats.mountShimBlue);
      bitCell.position.set(px, 0.80, pz);
      bitCell.userData.noEdges = true;
      const cap = new THREE.Mesh(hiResCyl(0.55, 0.55, 0.24, 12), mats.goldPlating);
      cap.position.set(px, 1.12, pz);
      cap.userData.noEdges = true;
      g.add(bitCell, cap);
    }
    const pufCmp = new THREE.Mesh(hiResCyl(1.25, 1.25, 0.62, 18), mats.fluorineCoatCyan);
    pufCmp.position.y = 0.86;
    g.add(pufCmp);

    parts.push(
      finalizePixelV2Part(
        'pv2-quad-pixel-puf',
        29,
        '#0ea5e9',
        g,
        new THREE.Vector3(-6.8, -14.4, 0),
        new THREE.Vector3(-27.0, -56.0, 0),
        cp,
        0.24
      )
    );
  }

  // P2-30. Sony 2026 Hybrid Frame-HDR (HF-HDR) DCG + Ultra-Short Exposure On-Chip Fusion Engine
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(createRoundedRectShape(11.8, 8.8, 1.1), 1.12, mats.siliconDramLayer, 0.1, 2, 18);
    g.add(base);

    // Dual-input HDR pipeline (HCG/LCG DCG path + Ultra-Short VS path -> motion-adaptive pixel fusion block!)
    const pipeA = new THREE.Mesh(createChamferedBoxGeo(9.4, 0.44, 1.75, 0.08, 0.05, 'y'), mats.fluorineCoatCyan);
    pipeA.position.set(-0.4, 0.76, -2.25);
    const pipeB = new THREE.Mesh(createChamferedBoxGeo(9.4, 0.44, 1.75, 0.08, 0.05, 'y'), mats.goldPlating);
    pipeB.position.set(-0.4, 0.76, 2.25);
    const motionMask = new THREE.Mesh(createChamferedBoxGeo(2.4, 0.62, 2.2, 0.06, 0.04, 'y'), mats.bodyRecRed);
    motionMask.position.set(-1.2, 0.85, 0);
    const merger = new THREE.Mesh(createChamferedBoxGeo(3.4, 0.86, 6.4, 0.1, 0.06, 'y'), mats.copperHybridBond);
    merger.position.set(2.8, 0.94, 0);
    g.add(pipeA, pipeB, motionMask, merger);

    parts.push(
      finalizePixelV2Part(
        'pv2-hf-hdr-fusion-engine',
        30,
        '#ec4899',
        g,
        new THREE.Vector3(6.8, -14.4, 0),
        new THREE.Vector3(27.0, -56.0, 0),
        cp,
        0.24
      )
    );
  }

  // Preserve full watchmaker micro-tessellation on every custom geometry
  for (const part of parts) {
    part.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.geometry) {
        markHiRes(obj.geometry);
      }
    });
  }

  return parts;
}
