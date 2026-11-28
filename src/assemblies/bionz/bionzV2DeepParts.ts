//@FLOW_MAP|file=src/assemblies/bionz/bionzV2DeepParts.ts|unit=bionz|lines=2113|exports=buildBionzV2DeepParts
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

function finalizeDeepBionzV2Part(
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
    subsystem: 'bionz_v2',
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

/** Connect two 3D points with a fine atomic bond / nanoscale via strut */
function makeNanoStrut(
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

/** Create authentic {111} diamond-faceted epitaxial SiGe / SiP S/D crystal cross-section */
function createDiamondEpiShape(w: number, h: number): THREE.Shape {
  const hw = w * 0.5;
  const hh = h * 0.5;
  const ch = Math.min(hw, hh) * 0.4;
  const s = new THREE.Shape();
  s.moveTo(-hw + ch, -hh);
  s.lineTo(hw - ch, -hh);
  s.lineTo(hw, -hh + ch);
  s.lineTo(hw, hh - ch);
  s.lineTo(hw - ch, hh);
  s.lineTo(-hw + ch, hh);
  s.lineTo(-hw, hh - ch);
  s.lineTo(-hw, -hh + ch);
  s.closePath();
  return s;
}

/**
 * Build Phase 29 TEM/SEM-Grade Ångström-Era, 2D TMD Monolayer, CFET, High-NA EUV, AI-CIM & 3.5D Cooling
 * Expansion for BIONZ XR / XR2 V2 (`X2-31` – `X2-55`, strictly 25 parts -> 55 total BIONZ XR V2 parts).
 *
 * Every single part features authentic IEDM 2025 / ISSCC 2026 / VLSI 2026 cross-sectional semiconductor fidelity:
 * NanoFlex 40nm+15nm GAA with diamond {111} epi & inner spacers, Si(110)/Si(100) hybrid-orientation CFET,
 * true 7-hexagon 2H-MoS2 trigonal-prismatic trilayer + Bi/Sb vdW gap contacts, 5-layer O* & H* radical-ox MOS TEM,
 * TSMC NCI razor cut + L-shaped BCT, Intel/imec Epi-to-Epi via + dual BDI, Samsung 42nm 3+3 eMDI stacked FET,
 * Intel 18A-P dual frontside+backside Power Boost clamp, imec 16nm sRu keyhole air-gap + recessed FSAV,
 * High-NA EUV Mo/Si Bragg reticle + 4x/8x cone + Sn-oxo MOR, A7 2:1 gear-ratio M0/M1/M2 cube, twin-ring
 * NBTI/PBTI canary monitor, backside nano-TSV hexagonal TiSi2 landing, 5T+1 sCFET SRAM, 3x3 3D HfZrO2 FeFET CIM,
 * PE-ALD IGZO 2T0C eDRAM, perpendicular SOT-MRAM MTJ + SAF stack, 300mm monolithic GaN HEMT + Si pMOS + spiral IVR,
 * UCIe-S 56G shoreline macro, HBM4 2048-bit 4-quadrant base die, >110GHz GeSi EAM + GSG waveguides,
 * direct-to-Si microfluidic pin-fin turbulator cooler, AlScN/Si BAW Bragg clock, dual-rail WDDL + Faraday guard,
 * and TSMC 3.5D COUPE EIC-on-PIC optical ring with WDM resonators & 3-fiber V-groove microlens blocks!
 */
export function buildBionzV2DeepParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // TIER 1 — ÅNGSTRÖM TRANSISTOR, 2D TMD MONOLAYER & CFET MICRO-PHYSICS (X2-31 – X2-37)
  // =========================================================================

  // X2-31. TSMC N2/A16 NanoFlex Variable-Width GAA Nanosheet Pair (40nm HPC vs 15nm Dense)
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(5.0, 5.4, 0.45),
      0.38,
      mats.siliconBulk,
      0.05,
      2,
      12
    );
    base.position.y = -1.48;
    g.add(base);

    // Continuous shared HKMG gate spine (HfO2 wrap + TiAlC/TiN WFM + W core) spanning BOTH asymmetric cells!
    const hfo2Wrap = new THREE.Mesh(
      createChamferedBoxGeo(1.42, 2.48, 4.9, 0.08, 0.03, 'y'),
      mats.aluminaHighKFilm
    );
    hfo2Wrap.position.y = -0.02;
    const gateSpine = new THREE.Mesh(
      createChamferedBoxGeo(1.12, 2.66, 4.72, 0.07, 0.03, 'y'),
      mats.goldPlating
    );
    gateSpine.position.y = 0.04;
    g.add(hfo2Wrap, gateSpine);

    // Scalloped SiN inner spacers between nanosheet tiers flanking both sides of the shared gate!
    for (const sx of [-0.84, 0.84]) {
      for (const sy of [-0.4, 0.34]) {
        const spWide = new THREE.Mesh(
          createChamferedBoxGeo(0.28, 0.44, 1.88, 0.03, 0.01, 'y'),
          mats.quartzOlpf
        );
        spWide.position.set(sx, sy, 1.25);
        spWide.userData.noEdges = true;
        const spNarrow = new THREE.Mesh(
          createChamferedBoxGeo(0.28, 0.44, 0.72, 0.03, 0.01, 'y'),
          mats.quartzOlpf
        );
        spNarrow.position.set(sx, sy, -1.45);
        spNarrow.userData.noEdges = true;
        g.add(spWide, spNarrow);
      }
    }

    // Front cell: 40nm WIDE high-drive performance GAA nanosheets + wide diamond-faceted {111} SiP S/D epi!
    for (let i = 0; i < 3; i++) {
      const wideRibbon = new THREE.Mesh(
        createChamferedBoxGeo(4.2, 0.24, 1.88, 0.04, 0.02, 'y'),
        mats.vcWorkingFluidCyan
      );
      wideRibbon.position.set(0, -0.78 + i * 0.74, 1.25);
      g.add(wideRibbon);
    }
    const wideEpiGeo = extrudeHiRes(createDiamondEpiShape(1.92, 2.1), 0.72, 0.05, 0.05, 1, 8);
    wideEpiGeo.rotateY(Math.PI / 2);
    for (const sx of [-2.12, 1.4]) {
      const epi = new THREE.Mesh(wideEpiGeo, mats.siliconPhotodiode);
      epi.position.set(sx, -0.02, 1.25);
      g.add(epi);
    }

    // Rear cell: 15nm NARROW ultra-dense SRAM / low-power GAA nanosheets + slim diamond-faceted S/D epi!
    for (let i = 0; i < 3; i++) {
      const narrowRibbon = new THREE.Mesh(
        createChamferedBoxGeo(4.2, 0.24, 0.66, 0.04, 0.02, 'y'),
        mats.fluorineCoatCyan
      );
      narrowRibbon.position.set(0, -0.78 + i * 0.74, -1.45);
      g.add(narrowRibbon);
    }
    const slimEpiGeo = extrudeHiRes(createDiamondEpiShape(0.76, 2.05), 0.72, 0.04, 0.04, 1, 8);
    slimEpiGeo.rotateY(Math.PI / 2);
    for (const sx of [-2.12, 1.4]) {
      const epi = new THREE.Mesh(slimEpiGeo, mats.cinnabarAnodized);
      epi.position.set(sx, -0.02, -1.45);
      g.add(epi);
    }

    // Top M0 Ruthenium local interconnect tracks tapping both wide & narrow S/D crystals
    for (const sx of [-1.76, 1.76]) {
      const m0 = new THREE.Mesh(
        createChamferedBoxGeo(0.38, 0.24, 4.6, 0.04, 0.02, 'y'),
        mats.sinteredSilver
      );
      m0.position.set(sx, 1.48, -0.1);
      m0.userData.noEdges = true;
      g.add(m0);
    }

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-nanoflex-width-pair',
        31,
        '#0ea5e9',
        g,
        new THREE.Vector3(-20, 0.6, 0),
        new THREE.Vector3(-58, 2, 0),
        cp,
        0.24
      )
    );
  }

  // X2-32. Hybrid-Orientation Monolithic CFET (Si(110) pMOS / Si(100) nMOS, IEDM 2025 Paper 2.2)
  {
    const g = new THREE.Group();
    // Bottom Si(110) pMOS 2-sheet stack (rotated 45° <110> diamond rows -> 2.5x hole mobility!) + compressive SiGe S/D!
    const pmosSub = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.46, 4.4, 0.12, 0.04, 'y'),
      mats.cinnabarAnodized
    );
    pmosSub.position.y = -1.38;
    for (const py of [-0.94, -0.44]) {
      const pSheet = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.24, 2.3, 0.05, 0.02, 'y'),
        mats.bodyRecRed
      );
      pSheet.position.y = py;
      g.add(pSheet);
    }
    // Diagonal 45-degree <110> crystal orientation lattice beads visible along front edge of bottom wafer!
    const latGeo = hiResSphere(0.11, 7, 5);
    for (let k = -2; k <= 2; k++) {
      const atom = new THREE.Mesh(latGeo, mats.goldPlating);
      atom.position.set(k * 0.72, -0.68 + (k % 2 === 0 ? 0.14 : -0.14), 1.42);
      atom.userData.noEdges = true;
      g.add(atom);
    }

    // Ultra-thin direct-bonded SiO2 hybrid wafer-bonding seam with interface alignment beads
    const bondSeam = new THREE.Mesh(
      createChamferedBoxGeo(4.56, 0.24, 4.56, 0.08, 0.02, 'y'),
      mats.quartzOlpf
    );
    bondSeam.position.y = -0.02;

    // Upper Si(100) nMOS 2-sheet stack (orthogonal <100> cubic lattice -> peak electron mobility!) + tensile SiP S/D!
    for (const ny of [0.42, 0.92]) {
      const nSheet = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.24, 2.3, 0.05, 0.02, 'y'),
        mats.vcWorkingFluidCyan
      );
      nSheet.position.y = ny;
      g.add(nSheet);
    }
    for (let k = -2; k <= 2; k++) {
      const atom = new THREE.Mesh(latGeo, mats.fluorineCoatCyan);
      atom.position.set(k * 0.72, 0.68, 1.42);
      atom.userData.noEdges = true;
      g.add(atom);
    }

    // Split vertical work-function metal gate collar (TiN bottom p-WFM vs TiAlC top n-WFM)
    const botGate = new THREE.Mesh(
      createChamferedBoxGeo(1.08, 1.08, 3.1, 0.06, 0.03, 'y'),
      mats.taNBarrierLiner
    );
    botGate.position.y = -0.68;
    const topGate = new THREE.Mesh(
      createChamferedBoxGeo(1.08, 1.08, 3.1, 0.06, 0.03, 'y'),
      mats.goldPlating
    );
    topGate.position.y = 0.68;
    // Left/Right S/D epitaxy end-caps (SiGe bottom + SiP top)
    for (const sx of [-1.92, 1.92]) {
      const pEpi = new THREE.Mesh(
        createChamferedBoxGeo(0.58, 0.96, 2.6, 0.08, 0.03, 'y'),
        mats.cinnabarAnodized
      );
      pEpi.position.set(sx, -0.68, 0);
      const nEpi = new THREE.Mesh(
        createChamferedBoxGeo(0.58, 0.96, 2.6, 0.08, 0.03, 'y'),
        mats.siliconPhotodiode
      );
      nEpi.position.set(sx, 0.68, 0);
      g.add(pEpi, nEpi);
    }
    g.add(pmosSub, bondSeam, botGate, topGate);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-hybrid-orient-cfet',
        32,
        '#7c3aed',
        g,
        new THREE.Vector3(20, 0.6, -10.5),
        new THREE.Vector3(56, 2, -30),
        cp,
        0.24
      )
    );
  }

  // X2-33. 0.7nm Atomic Monolayer 2D MoS2 / WSe2 TMD Channel FET + van der Waals Contacts (IEDM 2025 10-1/10-6)
  {
    const g = new THREE.Group();
    // Back-gate tungsten electrode + high-k HfO2/Al2O3 seeding dielectric textured with 2D TMD honeycomb!
    const bgMetal = makeHiResHorizPlate(
      createRoundedRectShape(5.0, 5.0, 0.45),
      0.34,
      mats.tungstenGrid,
      0.04,
      2,
      12
    );
    bgMetal.position.y = -1.42;
    const subGeo = extrudeHiRes(createRoundedRectShape(4.85, 4.85, 0.42), 0.32, 0.04, 0.04, 2, 12);
    subGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(subGeo, 4.85, 4.85, 'xz');
    const bgDielectric = new THREE.Mesh(subGeo, u.v2Bionz2dTmdLattice);
    bgDielectric.position.y = -1.04;
    g.add(bgMetal, bgDielectric);

    // Authentic 7-hexagon 2H-MoS2 trigonal-prismatic atomic trilayer (0.65nm thick: upper S / central Mo / lower S!)
    const moGeo = hiResSphere(0.19, 9, 7);
    const sGeo = hiResSphere(0.125, 7, 5);
    const aLat = 0.68;
    const hexCenters: Array<[number, number]> = [
      [0, 0],
      [aLat * 1.5, aLat * 0.866],
      [-aLat * 1.5, aLat * 0.866],
      [aLat * 1.5, -aLat * 0.866],
      [-aLat * 1.5, -aLat * 0.866],
      [0, aLat * 1.732],
      [0, -aLat * 1.732],
    ];
    for (const [cx, cz] of hexCenters) {
      const moAtom = new THREE.Mesh(moGeo, mats.goldPlating);
      moAtom.position.set(cx, 0.02, cz);
      moAtom.userData.noEdges = true;
      g.add(moAtom);

      // Trigonal prismatic 3-fold upper & lower S/Se chalcogen atoms bonded to every Mo/W center!
      for (let k = 0; k < 3; k++) {
        const ang = (k * 2 * Math.PI) / 3;
        const sx = cx + Math.cos(ang) * 0.44;
        const sz = cz + Math.sin(ang) * 0.44;
        const pMo = new THREE.Vector3(cx, 0.02, cz);
        const pSTop = new THREE.Vector3(sx, 0.34, sz);
        const pSBot = new THREE.Vector3(sx, -0.3, sz);
        const sTop = new THREE.Mesh(sGeo, mats.vcWorkingFluidCyan);
        sTop.position.copy(pSTop);
        sTop.userData.noEdges = true;
        const sBot = new THREE.Mesh(sGeo, mats.fluorineCoatCyan);
        sBot.position.copy(pSBot);
        sBot.userData.noEdges = true;
        g.add(
          sTop,
          sBot,
          makeNanoStrut(pMo, pSTop, 0.036, mats.silverElectrode, 5),
          makeNanoStrut(pMo, pSBot, 0.036, mats.silverElectrode, 5)
        );
      }
    }

    // Selective semi-metal Bi/Sb van der Waals top contacts hovering cleanly across a 0.3nm vdW tunnel gap!
    // Plus central top-gate high-k dielectric ribbon & M0 copper contact vias!
    for (const sx of [-1.88, 1.88]) {
      const vdwGapGlow = new THREE.Mesh(
        createChamferedBoxGeo(0.92, 0.1, 3.85, 0.03, 0.01, 'y'),
        mats.nanoArIridescent
      );
      vdwGapGlow.position.set(sx, 0.56, 0);
      vdwGapGlow.userData.noEdges = true;
      const vdwContact = new THREE.Mesh(
        createChamferedBoxGeo(0.9, 0.56, 3.85, 0.08, 0.03, 'y'),
        mats.sinteredSilver
      );
      vdwContact.position.set(sx, 0.94, 0);
      const cuVia = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.48, 10), mats.copperHybridBond);
      cuVia.position.set(sx, 1.46, 0);
      cuVia.userData.noEdges = true;
      g.add(vdwGapGlow, vdwContact, cuVia);
    }
    const topGateBar = new THREE.Mesh(
      createChamferedBoxGeo(0.72, 0.48, 4.1, 0.06, 0.02, 'y'),
      mats.goldPlating
    );
    topGateBar.position.set(0, 1.02, 0);
    g.add(topGateBar);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-2d-tmd-mos2-channel',
        33,
        '#a855f7',
        g,
        new THREE.Vector3(20, 0.6, 0),
        new THREE.Vector3(58, 2, 0),
        cp,
        0.22
      )
    );
  }

  // X2-34. Charge-Free O* / H* Radical-Oxidized 0.5nm Interfacial Layer (IL) (IEDM 2025 Paper 40-1)
  {
    const g = new THREE.Group();
    // 5-layer MOS gate TEM cross-section: Si(100) channel -> 0.5nm ordered Si-O-Si IL -> HfO2 -> TiN WFM -> W gate fill!
    const siChannel = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 0.56, 3.3, 0.12, 0.04, 'y'),
      mats.siliconPhotodiode
    );
    siChannel.position.y = -1.04;
    const radicalIl = new THREE.Mesh(
      createChamferedBoxGeo(6.52, 0.22, 3.4, 0.06, 0.02, 'y'),
      mats.fluorineCoatCyan
    );
    radicalIl.position.y = -0.58;
    const hfo2Gate = new THREE.Mesh(
      createChamferedBoxGeo(6.3, 0.46, 3.16, 0.1, 0.03, 'y'),
      mats.aluminaHighKFilm
    );
    hfo2Gate.position.y = -0.18;
    const tinWfm = new THREE.Mesh(
      createChamferedBoxGeo(6.0, 0.28, 2.86, 0.08, 0.02, 'y'),
      mats.goldPlating
    );
    tinWfm.position.y = 0.24;
    const wFill = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.36, 2.5, 0.08, 0.03, 'y'),
      mats.tungstenGrid
    );
    wFill.position.y = 0.62;
    g.add(siChannel, radicalIl, hfo2Gate, tinWfm, wFill);

    // Ordered zero-vacancy Si-O-Si interface bridge spheres along front cutaway lip + overhead O*/H* radical nozzles!
    const oBridgeGeo = hiResSphere(0.11, 7, 5);
    const radGeo = hiResSphere(0.15, 8, 6);
    for (let ix = -2; ix <= 2; ix++) {
      const ob = new THREE.Mesh(oBridgeGeo, mats.vcWorkingFluidCyan);
      ob.position.set(ix * 1.18, -0.58, 1.72);
      ob.userData.noEdges = true;
      const noz = new THREE.Mesh(hiResCyl(0.16, 0.1, 0.34, 8), mats.silverElectrode);
      noz.position.set(ix * 1.18, 1.46, 0);
      noz.userData.noEdges = true;
      const rad = new THREE.Mesh(radGeo, ix % 2 === 0 ? mats.vcWorkingFluidCyan : mats.goldPlating);
      rad.position.set(ix * 1.18, 1.08, 0);
      rad.userData.noEdges = true;
      g.add(ob, noz, rad);
    }

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-radical-ox-il-layer',
        34,
        '#22d3ee',
        g,
        new THREE.Vector3(-6.9, 0.8, -20),
        new THREE.Vector3(-21, 2.5, -56),
        cp,
        0.22
      )
    );
  }

  // X2-35. CFET Nanosheet Cut Isolation (NCI) & Vertical Butt Contact (BCT) (TSMC IEDM 2025 Paper 2.5)
  {
    const g = new THREE.Group();
    const cellSub = makeHiResHorizPlate(
      createRoundedRectShape(4.8, 4.4, 0.4),
      0.34,
      mats.siliconBulk,
      0.04,
      2,
      12
    );
    cellSub.position.y = -1.52;
    g.add(cellSub);

    // Dual adjacent 2+2 stacked CFET cells (2 bottom pFET + 2 top nFET each) cleaved cleanly by central SiN NCI blade!
    for (const sx of [-1.22, 1.22]) {
      for (const py of [-0.96, -0.46]) {
        const pSh = new THREE.Mesh(
          createChamferedBoxGeo(1.72, 0.22, 3.2, 0.04, 0.02, 'y'),
          mats.cinnabarAnodized
        );
        pSh.position.set(sx, py, 0);
        g.add(pSh);
      }
      for (const ny of [0.36, 0.86]) {
        const nSh = new THREE.Mesh(
          createChamferedBoxGeo(1.72, 0.22, 3.2, 0.04, 0.02, 'y'),
          mats.vcWorkingFluidCyan
        );
        nSh.position.set(sx, ny, 0);
        g.add(nSh);
      }
      // Mid dielectric isolator between nFET and pFET inside each CFET column
      const midIso = new THREE.Mesh(
        createChamferedBoxGeo(1.78, 0.18, 3.25, 0.04, 0.01, 'y'),
        mats.aluminaHighKFilm
      );
      midIso.position.set(sx, -0.05, 0);
      midIso.userData.noEdges = true;
      g.add(midIso);
    }

    // Central high-aspect Nanosheet Cut Isolation (NCI) SiN razor-blade dielectric trench cutting all the way down!
    const nciWall = new THREE.Mesh(
      createChamferedBoxGeo(0.34, 3.05, 3.85, 0.04, 0.02, 'y'),
      mats.quartzOlpf
    );
    nciWall.position.y = 0.08;
    const nciTopCap = new THREE.Mesh(
      createChamferedBoxGeo(0.46, 0.2, 3.9, 0.04, 0.02, 'y'),
      mats.fluorineCoatCyan
    );
    nciTopCap.position.y = 1.66;
    nciTopCap.userData.noEdges = true;

    // Precision L-shaped tungsten/Mo Butt Contact (BCT) + TiSi2 silicide collars vertically shorting n-Drain to p-Drain!
    const bctVert = new THREE.Mesh(
      createChamferedBoxGeo(0.54, 2.38, 0.86, 0.06, 0.02, 'y'),
      mats.goldPlating
    );
    bctVert.position.set(2.04, -0.02, 1.18);
    const bctTopArm = new THREE.Mesh(
      createChamferedBoxGeo(1.62, 0.34, 0.86, 0.05, 0.02, 'y'),
      mats.goldPlating
    );
    bctTopArm.position.set(1.42, 0.96, 1.18);
    const bctBotArm = new THREE.Mesh(
      createChamferedBoxGeo(1.62, 0.34, 0.86, 0.05, 0.02, 'y'),
      mats.sinteredSilver
    );
    bctBotArm.position.set(1.42, -0.98, 1.18);
    // Shared M0 inverter output track on top
    const m0Out = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.24, 0.56, 0.04, 0.02, 'y'),
      mats.copperHybridBond
    );
    m0Out.position.set(0, 1.56, 1.18);
    g.add(nciWall, nciTopCap, bctVert, bctTopArm, bctBotArm, m0Out);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-cfet-nci-butt-contact',
        35,
        '#f59e0b',
        g,
        new THREE.Vector3(-20, 0.6, -10.5),
        new THREE.Vector3(-56, 2, -30),
        cp,
        0.24
      )
    );
  }

  // X2-36. CFET Epi-to-Epi Vertical Via & Dual Front/Back BDI Wall (Intel / imec VLSI 2026)
  {
    const g = new THREE.Group();
    // Dual Front-formed & Back-formed Bottom Dielectric Isolation (BDI) nitride shields pinching substrate leakage!
    const backBdi = new THREE.Mesh(
      createChamferedBoxGeo(4.5, 0.26, 4.3, 0.1, 0.03, 'y'),
      mats.aluminaHighKFilm
    );
    backBdi.position.y = -1.72;
    const frontBdi = new THREE.Mesh(
      createChamferedBoxGeo(4.5, 0.2, 4.3, 0.08, 0.02, 'y'),
      mats.fluorineCoatCyan
    );
    frontBdi.position.y = -1.44;
    // Diamond-faceted bottom pFET SiGe epi + middle dielectric isolator + top nFET SiP epi!
    const epiGeo = extrudeHiRes(createDiamondEpiShape(3.5, 1.05), 3.3, 0.08, 0.08, 1, 8);
    epiGeo.translate(0, 0, -1.65);
    const botEpi = new THREE.Mesh(epiGeo, mats.cinnabarAnodized);
    botEpi.position.y = -0.8;
    const midDiel = new THREE.Mesh(
      createChamferedBoxGeo(4.3, 0.24, 4.1, 0.08, 0.02, 'y'),
      mats.quartzOlpf
    );
    const topEpi = new THREE.Mesh(epiGeo, mats.siliconPhotodiode);
    topEpi.position.y = 0.8;

    // Vertical Tungsten Epi-to-Epi Via wrapped in conformal TiN liner bridging upper & lower crystals!
    const linerVia = new THREE.Mesh(hiResCyl(0.56, 0.56, 2.38, 14), mats.taNBarrierLiner);
    linerVia.position.set(1.18, 0, 1.15);
    linerVia.userData.noEdges = true;
    const epiVia = new THREE.Mesh(hiResCyl(0.42, 0.42, 2.54, 14), mats.goldPlating);
    epiVia.position.set(1.18, 0, 1.15);
    // Direct backside PowerVia copper pillar landing into bottom pFET epi through the BDI window!
    const bsPowerTap = new THREE.Mesh(hiResCyl(0.46, 0.62, 0.96, 12), mats.copperHybridBond);
    bsPowerTap.position.set(-1.05, -1.68, 0);
    const silicideCap = new THREE.Mesh(hiResCyl(0.68, 0.68, 0.16, 6), mats.sinteredSilver);
    silicideCap.position.set(-1.05, -1.24, 0);
    silicideCap.userData.noEdges = true;
    g.add(backBdi, frontBdi, botEpi, midDiel, topEpi, linerVia, epiVia, bsPowerTap, silicideCap);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-cfet-epi-via-bdi',
        36,
        '#14b8a6',
        g,
        new THREE.Vector3(20, 0.6, 10.5),
        new THREE.Vector3(56, 2, 30),
        cp,
        0.24
      )
    );
  }

  // X2-37. 42nm Gate-Pitch Triple-Sheet eMDI Stacked FET (Samsung VLSI 2026 Best Paper)
  {
    const g = new THREE.Group();
    const sub = makeHiResHorizPlate(
      createRoundedRectShape(6.4, 3.8, 0.4),
      0.36,
      mats.siliconBulk,
      0.05,
      2,
      12
    );
    sub.position.y = -1.64;
    g.add(sub);

    // 3 lower pFET sheets + dual-layer embedded Middle Dielectric Isolation (eMDI) septum + 3 upper nFET sheets!
    for (let i = 0; i < 3; i++) {
      const py = -1.16 + i * 0.42;
      const ny = 0.42 + i * 0.42;
      const pSheet = new THREE.Mesh(
        createChamferedBoxGeo(5.1, 0.19, 2.1, 0.04, 0.02, 'y'),
        mats.cinnabarAnodized
      );
      pSheet.position.y = py;
      const nSheet = new THREE.Mesh(
        createChamferedBoxGeo(5.1, 0.19, 2.1, 0.04, 0.02, 'y'),
        mats.vcWorkingFluidCyan
      );
      nSheet.position.y = ny;
      g.add(pSheet, nSheet);
    }

    // Embedded Middle Dielectric Isolation (eMDI) dual-layer septum cleanly dividing n/p gate work functions
    const emdiCore = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.22, 2.75, 0.05, 0.02, 'y'),
      mats.goldPlating
    );
    emdiCore.position.y = 0.04;
    const emdiOx = new THREE.Mesh(
      createChamferedBoxGeo(5.68, 0.09, 2.82, 0.03, 0.01, 'y'),
      mats.quartzOlpf
    );
    emdiOx.position.y = 0.18;
    emdiOx.userData.noEdges = true;
    g.add(emdiCore, emdiOx);

    // Ultra-compact 42nm CPP twin split-WFM gate pillars (lower TiN p-WFM + upper TiAlC n-WFM) + inner spacers!
    for (const gx of [-1.52, 1.52]) {
      const pGate = new THREE.Mesh(
        createChamferedBoxGeo(0.58, 1.38, 2.86, 0.06, 0.02, 'y'),
        mats.tungstenGrid
      );
      pGate.position.set(gx, -0.74, 0);
      const nGate = new THREE.Mesh(
        createChamferedBoxGeo(0.58, 1.38, 2.86, 0.06, 0.02, 'y'),
        mats.silverElectrode
      );
      nGate.position.set(gx, 0.88, 0);
      const spFront = new THREE.Mesh(
        createChamferedBoxGeo(0.16, 2.78, 2.2, 0.02, 0.01, 'y'),
        mats.aluminaHighKFilm
      );
      spFront.position.set(gx + (gx < 0 ? 0.36 : -0.36), 0.06, 0);
      spFront.userData.noEdges = true;
      g.add(pGate, nGate, spFront);
    }
    // 42nm pitch caliper bar overhead uniting the twin gates
    const pitchBar = makeNanoStrut(
      new THREE.Vector3(-1.52, 1.76, 0),
      new THREE.Vector3(1.52, 1.76, 0),
      0.065,
      mats.goldPlating,
      6
    );
    g.add(pitchBar);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-samsung-42nm-emdi-fet',
        37,
        '#6366f1',
        g,
        new THREE.Vector3(6.9, 0.8, -20),
        new THREE.Vector3(21, 2.5, -56),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // TIER 2 — 18A-P DUAL POWER BOOST, 16nm sRu AIR-GAP, HIGH-NA EUV & BTI (X2-38 – X2-43)
  // =========================================================================

  // X2-38. Intel 18A-P "Power Boost" Dual Frontside+Backside Contact Bridge (VLSI 2026)
  {
    const g = new THREE.Group();
    // Central diamond-faceted S/D epitaxial crystal with 3 horizontal GAA nanosheets entering from both sides!
    const sdGeo = extrudeHiRes(createDiamondEpiShape(2.9, 1.38), 2.8, 0.08, 0.08, 1, 8);
    sdGeo.translate(0, 0, -1.4);
    const sdCrystal = new THREE.Mesh(sdGeo, mats.siliconPhotodiode);
    g.add(sdCrystal);
    for (const sy of [-0.42, 0, 0.42]) {
      const ns = new THREE.Mesh(
        createChamferedBoxGeo(4.4, 0.16, 1.15, 0.03, 0.01, 'y'),
        mats.vcWorkingFluidCyan
      );
      ns.position.y = sy;
      ns.userData.noEdges = true;
      g.add(ns);
    }

    // Dual top & bottom NiPtSi/TiSi2 ohmic silicide caps clamping BOTH faces of the exact same S/D epitaxy!
    const topSilicide = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 0.18, 2.35, 0.06, 0.02, 'y'),
      mats.sinteredSilver
    );
    topSilicide.position.y = 0.74;
    const botSilicide = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 0.18, 2.35, 0.06, 0.02, 'y'),
      mats.sinteredSilver
    );
    botSilicide.position.y = -0.74;

    // Frontside M0/Via-0 Copper contact above + Backside PowerVia tapered tungsten/Cu column below!
    const frontContact = new THREE.Mesh(
      createChamferedBoxGeo(1.95, 0.78, 1.95, 0.08, 0.03, 'y'),
      mats.copperHybridBond
    );
    frontContact.position.y = 1.2;
    const backPowerVia = new THREE.Mesh(hiResCyl(0.84, 1.16, 1.12, 16), mats.goldPlating);
    backPowerVia.position.y = -1.36;
    const pvLiner = new THREE.Mesh(hiResTorus(1.06, 0.09, 7, 16), mats.taNBarrierLiner);
    pvLiner.rotation.x = Math.PI / 2;
    pvLiner.position.y = -1.36;
    pvLiner.userData.noEdges = true;

    // Thick dual top & bottom VDD rails linked by parallel side balance-current indicator rails (<10mV droop!)
    const topRail = new THREE.Mesh(
      createChamferedBoxGeo(4.6, 0.34, 1.3, 0.06, 0.03, 'y'),
      mats.copperHybridBond
    );
    topRail.position.y = 1.76;
    const botRail = new THREE.Mesh(
      createChamferedBoxGeo(4.6, 0.46, 1.65, 0.08, 0.03, 'y'),
      mats.goldPlating
    );
    botRail.position.y = -2.08;
    const sideTie = makeNanoStrut(
      new THREE.Vector3(2.15, 1.72, 0),
      new THREE.Vector3(2.15, -2.02, 0),
      0.11,
      mats.fluorineCoatCyan,
      7
    );
    g.add(topSilicide, botSilicide, frontContact, backPowerVia, pvLiner, topRail, botRail, sideTie);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-18ap-dual-power-boost',
        38,
        '#f97316',
        g,
        new THREE.Vector3(-20, 0.6, 10.5),
        new THREE.Vector3(-56, 2, 30),
        cp,
        0.24
      )
    );
  }

  // X2-39. 16nm-Pitch Subtractive Ruthenium (sRu) Air-Gap & Fully Self-Aligned Via (FSAV, IEDM 2025 33-7)
  {
    const g = new THREE.Group();
    const baseDielectric = makeHiResHorizPlate(
      createRoundedRectShape(4.8, 4.8, 0.4),
      0.34,
      mats.siliconBulk,
      0.05,
      2,
      12
    );
    baseDielectric.position.y = -1.24;
    g.add(baseDielectric);

    // 6 ultra-dense high-aspect-ratio (AR > 2.5) barrierless subtractive Ruthenium (sRu) fins separated by TRUE vacuum air-gaps!
    for (let i = 0; i < 6; i++) {
      const tx = -1.9 + i * 0.76;
      const ruTrack = new THREE.Mesh(
        createChamferedBoxGeo(0.32, 1.56, 4.2, 0.03, 0.02, 'y'),
        mats.sinteredSilver
      );
      ruTrack.position.set(tx, -0.26, 0);
      // Selective recessed dielectric hardmask cap on non-via tracks (enables Fully Self-Aligned Via landing!)
      const cap = new THREE.Mesh(
        createChamferedBoxGeo(0.34, 0.2, 4.2, 0.02, 0.01, 'y'),
        i % 2 === 0 ? mats.aluminaHighKFilm : mats.quartzOlpf
      );
      cap.position.set(tx, 0.62, 0);
      cap.userData.noEdges = true;
      g.add(ruTrack, cap);

      // Fully Self-Aligned Via (FSAV) recessed tungsten pedestal perched safely above alternating tracks!
      if (i % 2 === 0) {
        const fsav = new THREE.Mesh(hiResCyl(0.22, 0.26, 0.86, 10), mats.goldPlating);
        fsav.position.set(tx, 1.02, (i - 2) * 0.46);
        fsav.userData.noEdges = true;
        const mUpper = new THREE.Mesh(
          createChamferedBoxGeo(0.68, 0.24, 0.54, 0.03, 0.02, 'y'),
          mats.copperHybridBond
        );
        mUpper.position.set(tx, 1.52, (i - 2) * 0.46);
        mUpper.userData.noEdges = true;
        g.add(fsav, mUpper);
      }
    }

    // Pinched-off non-conformal SiCN air-gap keyhole roof beam along rear edge showing true enclosed vacuum canyons!
    const airGapRoof = new THREE.Mesh(
      createChamferedBoxGeo(4.56, 0.24, 0.72, 0.04, 0.02, 'y'),
      mats.fluorineCoatCyan
    );
    airGapRoof.position.set(0, 0.76, -1.78);
    g.add(airGapRoof);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-sru-16nm-fsav-airgap',
        39,
        '#cbd5e1',
        g,
        new THREE.Vector3(-20, 9, -6.9),
        new THREE.Vector3(-56, 31, -21),
        cp,
        0.24
      )
    );
  }

  // X2-40. High-NA EUV (0.55 NA) Anamorphic Metal-Oxide Resist (MOR) & Stochastic LER Guard (2026)
  {
    const g = new THREE.Group();
    // Bottom Si substrate -> SOC spin-on-carbon hardmask -> SiARC anti-reflective underlayer -> 18nm Tin-Oxo MOR fins!
    const waferFloor = makeHiResHorizPlate(
      createRoundedRectShape(4.8, 4.8, 0.4),
      0.32,
      mats.siliconBulk,
      0.04,
      2,
      12
    );
    waferFloor.position.y = -1.42;
    const socLayer = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.22, 4.4, 0.1, 0.02, 'y'),
      mats.matteBlackAnodized
    );
    socLayer.position.y = -1.14;
    const siarcLayer = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.14, 4.4, 0.08, 0.01, 'y'),
      mats.fluorineCoatCyan
    );
    siarcLayer.position.y = -0.95;
    g.add(waferFloor, socLayer, siarcLayer);

    // 6 crisp 14nm half-pitch Tin-Oxo Metal-Oxide Resist (MOR) fins + LER roughness metrology gauge needles!
    for (let i = 0; i < 6; i++) {
      const fx = -1.75 + i * 0.7;
      const morFin = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 0.78, 3.6, 0.03, 0.02, 'y'),
        mats.loficDielectric
      );
      morFin.position.set(fx, -0.48, 0);
      g.add(morFin);
    }
    const lerCaliper = makeNanoStrut(
      new THREE.Vector3(-1.85, -0.04, 1.92),
      new THREE.Vector3(1.85, -0.04, 1.92),
      0.055,
      mats.goldPlating,
      6
    );
    g.add(lerCaliper);

    // Overhead Mo/Si Bragg reflective EUV reticle + 4x/8x elliptical anamorphic 0.55 NA EUV converging beam cone!
    const braggMask = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.24, 2.25, 0.08, 0.02, 'y'),
      mats.silverElectrode
    );
    braggMask.position.y = 1.72;
    const euvCone = new THREE.Mesh(hiResCyl(1.75, 0.78, 1.48, 18, true), mats.evfDichroicMirror);
    euvCone.scale.set(1.0, 1.0, 0.58); // Authentic 4x/8x anamorphic optics!
    euvCone.position.y = 0.84;
    euvCone.userData.noEdges = true;
    const obsRing = new THREE.Mesh(hiResTorus(0.55, 0.07, 6, 16), mats.matteBlackAnodized); // Central EUV obscuration!
    obsRing.rotation.x = Math.PI / 2;
    obsRing.scale.set(1.0, 0.58, 1.0);
    obsRing.position.y = 1.56;
    obsRing.userData.noEdges = true;
    const apertureRing = new THREE.Mesh(hiResTorus(1.8, 0.1, 8, 20), mats.goldPlating);
    apertureRing.rotation.x = Math.PI / 2;
    apertureRing.scale.set(1.0, 0.58, 1.0);
    apertureRing.position.y = 1.56;
    apertureRing.userData.noEdges = true;
    g.add(braggMask, euvCone, obsRing, apertureRing);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-highna-euv-mor-ler',
        40,
        '#8b5cf6',
        g,
        new THREE.Vector3(20, 8.8, -6.9),
        new THREE.Vector3(56, 30, -21),
        cp,
        0.22
      )
    );
  }

  // X2-41. A7 Gear-Ratio 2:1 M1 Pin-Access Routing Comb (imec VLSI 2026)
  {
    const g = new THREE.Group();
    const mBase = makeHiResHorizPlate(
      createRoundedRectShape(6.4, 3.6, 0.4),
      0.34,
      mats.siliconLogicLayer,
      0.04,
      2,
      12
    );
    mBase.position.y = -0.96;
    g.add(mBase);

    // 8 ultra-fine M0 Ru local tracks -> staggered V0 via staircase -> 4 exact 2:1 integer-gear M1 copper highways -> 2 M2 bus bars!
    for (let i = 0; i < 8; i++) {
      const mx = -2.45 + i * 0.7;
      const m0 = new THREE.Mesh(
        createChamferedBoxGeo(0.26, 0.3, 2.85, 0.03, 0.01, 'y'),
        mats.sinteredSilver
      );
      m0.position.set(mx, -0.58, 0);
      m0.userData.noEdges = true;
      g.add(m0);
      if (i % 2 === 0) {
        const mz = -1.05 + (i / 2) * 0.7;
        const v0 = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.62, 8), mats.goldPlating);
        v0.position.set(mx, -0.14, mz);
        v0.userData.noEdges = true;
        g.add(v0);
      }
    }
    for (let j = 0; j < 4; j++) {
      const mz = -1.05 + j * 0.7;
      const m1 = new THREE.Mesh(
        createChamferedBoxGeo(5.8, 0.34, 0.38, 0.04, 0.02, 'y'),
        mats.copperHybridBond
      );
      m1.position.set(0, 0.32, mz);
      g.add(m1);
    }
    for (const m2x of [-1.55, 1.55]) {
      const m2 = new THREE.Mesh(
        createChamferedBoxGeo(0.62, 0.38, 3.1, 0.05, 0.02, 'y'),
        mats.goldPlating
      );
      m2.position.set(m2x, 0.92, 0);
      const v1 = new THREE.Mesh(hiResCyl(0.18, 0.18, 0.36, 8), mats.fluorineCoatCyan);
      v1.position.set(m2x, 0.6, m2x < 0 ? -0.35 : 0.35);
      v1.userData.noEdges = true;
      g.add(m2, v1);
    }

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-a7-gear-ratio-m1',
        41,
        '#d97736',
        g,
        new THREE.Vector3(0, 8.2, -20),
        new THREE.Vector3(0, 28, -58),
        cp,
        0.24
      )
    );
  }

  // X2-42. On-Die Atomic Hydrogen-Trap NBTI/PBTI Aging Monitor Cell
  {
    const g = new THREE.Group();
    const deck = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.6, 0.4),
      0.38,
      mats.ispSiliconDie,
      0.05,
      2,
      12
    );
    deck.position.y = -0.92;
    g.add(deck);

    // Twin matched 7-stage Ring-Oscillators: Unstressed Reference Ring (cyan) vs DC/AC-Stressed Aging Canary Ring (crimson)!
    for (const [rx, rz, ringMat, stageMat] of [
      [-0.86, -0.86, mats.vcWorkingFluidCyan, mats.fluorineCoatCyan],
      [0.86, 0.86, mats.bodyRecRed, mats.copperCoil],
    ] as const) {
      const ring = new THREE.Mesh(hiResTorus(1.12, 0.14, 8, 18), ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(rx, -0.18, rz);
      g.add(ring);
      for (let s = 0; s < 7; s++) {
        const ang = (s / 7) * Math.PI * 2;
        const inv = new THREE.Mesh(
          createChamferedBoxGeo(0.28, 0.36, 0.28, 0.03, 0.01, 'y'),
          stageMat
        );
        inv.position.set(rx + Math.cos(ang) * 1.12, 0.02, rz + Math.sin(ang) * 1.12);
        inv.rotation.y = -ang;
        inv.userData.noEdges = true;
        g.add(inv);
      }
    }

    // Central XOR Phase-Frequency Beat Detector (Δf -> ΔV_th) + AVFS closed-loop voltage-guardband output trace!
    const beatDet = new THREE.Mesh(
      createChamferedBoxGeo(1.16, 0.92, 1.16, 0.1, 0.03, 'y'),
      mats.goldPlating
    );
    beatDet.position.y = 0.08;
    const avfsBus = makeNanoStrut(
      new THREE.Vector3(0, 0.56, 0),
      new THREE.Vector3(-1.85, 0.56, 1.85),
      0.085,
      u.batSocLedGlow,
      6
    );
    const avfsPad = new THREE.Mesh(
      createChamferedBoxGeo(0.76, 0.56, 0.76, 0.06, 0.02, 'y'),
      u.batSocLedGlow
    );
    avfsPad.position.set(-1.68, -0.34, 1.68);
    g.add(beatDet, avfsBus, avfsPad);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-nbti-pbti-trap-monitor',
        42,
        '#ef4444',
        g,
        new THREE.Vector3(-20, 7.8, 6.9),
        new THREE.Vector3(-56, 26, 21),
        cp,
        0.24
      )
    );
  }

  // X2-43. Backside Nano-TSV Silicide Landing Pad & Wafer Carrier Bond Seam
  {
    const g = new THREE.Group();
    // Ultra-thinned <0.8um backside silicon membrane -> SiGe etch-stop seam -> SiO2-SiO2 carrier bond -> BM0 power rail!
    const thinSi = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.6, 0.45),
      0.44,
      mats.siliconBulk,
      0.05,
      2,
      12
    );
    thinSi.position.y = 0.62;
    const etchStop = makeHiResHorizPlate(
      createRoundedRectShape(4.68, 4.68, 0.42),
      0.14,
      mats.cinnabarAnodized,
      0.02,
      1,
      12
    );
    etchStop.position.y = -0.18;
    const carrierBond = makeHiResHorizPlate(
      createRoundedRectShape(4.8, 4.8, 0.45),
      0.26,
      mats.fluorineCoatCyan,
      0.03,
      1,
      12
    );
    carrierBond.position.y = -1.16;
    const bm0Rail = new THREE.Mesh(
      createChamferedBoxGeo(4.6, 0.36, 1.48, 0.06, 0.02, 'y'),
      mats.goldPlating
    );
    bm0Rail.position.y = -1.56;

    // Tapered Cu nano-TSV wrapped in concentric SiO2 liner + TaN diffusion barrier + hexagonal TiSi2 silicide landing collar!
    const sio2Liner = new THREE.Mesh(hiResCyl(0.86, 1.24, 1.88, 16), mats.quartzOlpf);
    sio2Liner.position.y = -0.24;
    sio2Liner.userData.noEdges = true;
    const tanWrap = new THREE.Mesh(hiResCyl(0.76, 1.12, 1.94, 16), mats.taNBarrierLiner);
    tanWrap.position.y = -0.24;
    tanWrap.userData.noEdges = true;
    const ntsvCu = new THREE.Mesh(hiResCyl(0.64, 0.98, 2.08, 16), mats.copperHybridBond);
    ntsvCu.position.y = -0.22;
    const silicideHex = new THREE.Mesh(hiResCyl(1.48, 1.48, 0.34, 6), mats.sinteredSilver);
    silicideHex.position.y = 1.02;
    const feolActiveFin = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 0.44, 0.56, 0.05, 0.02, 'y'),
      mats.siliconPhotodiode
    );
    feolActiveFin.position.y = 1.4;
    g.add(thinSi, etchStop, carrierBond, bm0Rail, sio2Liner, tanWrap, ntsvCu, silicideHex, feolActiveFin);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-backside-ntsv-landing',
        43,
        '#b45309',
        g,
        new THREE.Vector3(20, -14.2, 0),
        new THREE.Vector3(58, -46, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // TIER 3 — 5T+1 sCFET SRAM, 3D FeFET CIM, IGZO 2T0C, SOT-MRAM, GaN IVR & UCIe/HBM4 (X2-44 – X2-50)
  // =========================================================================

  // X2-44. imec VLSI 2026 5T+1 Split-Gate sCFET SRAM Bitcell (-12.5% Area, +15% Write Speed)
  {
    const g = new THREE.Group();
    const sramGeo = extrudeHiRes(createRoundedRectShape(4.8, 4.8, 0.4), 0.38, 0.05, 0.05, 2, 12);
    sramGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(sramGeo, 4.8, 4.8, 'xz');
    const base = new THREE.Mesh(sramGeo, u.v2BionzSramArray);
    base.position.y = -1.22;
    g.add(base);

    // 2 vertical CFET cross-coupled inverter towers (PU pFET bottom + PD nFET top) with diagonal Q/QB storage latches!
    for (const sx of [-1.28, 1.28]) {
      const pInv = new THREE.Mesh(
        createChamferedBoxGeo(1.12, 0.78, 1.68, 0.08, 0.03, 'y'),
        mats.cinnabarAnodized
      );
      pInv.position.set(sx, -0.54, -0.88);
      const midIso = new THREE.Mesh(
        createChamferedBoxGeo(1.18, 0.16, 1.74, 0.04, 0.01, 'y'),
        mats.quartzOlpf
      );
      midIso.position.set(sx, -0.06, -0.88);
      midIso.userData.noEdges = true;
      const nInv = new THREE.Mesh(
        createChamferedBoxGeo(1.12, 0.78, 1.68, 0.08, 0.03, 'y'),
        mats.siliconPhotodiode
      );
      nInv.position.set(sx, 0.44, -0.88);
      // Vertical BL / BLB bitline metal columns flanking the towers
      const bitline = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 0.24, 4.3, 0.03, 0.01, 'y'),
        mats.copperHybridBond
      );
      bitline.position.set(sx * 1.42, 1.18, 0);
      bitline.userData.noEdges = true;
      g.add(pInv, midIso, nInv, bitline);
    }

    // Single Split-Gate n-over-p CFET Transmission Pass-Gate ("5T+1") + dual WL / WLB complementary wordline rails!
    const pgBot = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 0.62, 0.96, 0.08, 0.03, 'y'),
      mats.bodyRecRed
    );
    pgBot.position.set(0, -0.5, 1.15);
    const pgSplitWall = new THREE.Mesh(
      createChamferedBoxGeo(2.45, 0.18, 1.04, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    pgSplitWall.position.set(0, -0.06, 1.15);
    const pgTop = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 0.62, 0.96, 0.08, 0.03, 'y'),
      mats.vcWorkingFluidCyan
    );
    pgTop.position.set(0, 0.38, 1.15);
    const wlRail = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.22, 0.3, 0.03, 0.01, 'y'),
      mats.goldPlating
    );
    wlRail.position.set(0, 0.88, 1.15);
    // Cross-coupled Q / QB internal BCT latches
    const crossA = makeNanoStrut(
      new THREE.Vector3(-1.02, 0.78, -0.88),
      new THREE.Vector3(1.02, -0.44, -0.88),
      0.075,
      mats.copperHybridBond,
      6
    );
    const crossB = makeNanoStrut(
      new THREE.Vector3(1.02, 0.78, -0.88),
      new THREE.Vector3(-1.02, -0.44, -0.88),
      0.075,
      mats.fluorineCoatCyan,
      6
    );
    g.add(pgBot, pgSplitWall, pgTop, wlRail, crossA, crossB);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-scfet-5t1-sram',
        44,
        '#3b82f6',
        g,
        new THREE.Vector3(-20, -6.4, -10.5),
        new THREE.Vector3(-56, -24, -30),
        cp,
        0.24
      )
    );
  }

  // X2-45. 3D Vertical 2TnF HfZrO2 Ferroelectric Gain-Cell AI Attention CIM (IEDM 2025 5.7/28.3)
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.8, 4.8, 0.4),
      0.38,
      mats.npuSiliconDie,
      0.05,
      2,
      12
    );
    base.position.y = -1.36;
    g.add(base);

    // 4 stacked horizontal TiN Wordline planes piercing a 3x3 vertical cylindrical HfZrO2 (HZO) FeFET pillar matrix!
    for (const wy of [-0.76, -0.22, 0.32, 0.86]) {
      const wlPlane = makeHiResHorizPlate(
        createFrameShape(4.1, 4.1, 0.25, 3.3, 3.3, 0.16),
        0.12,
        wy > 0 ? mats.goldPlating : mats.silverElectrode,
        0.02,
        1,
        10
      );
      wlPlane.position.y = wy;
      wlPlane.userData.noEdges = true;
      g.add(wlPlane);
    }

    const chCoreGeo = hiResCyl(0.24, 0.24, 2.38, 10);
    const hzoSleeveGeo = hiResCyl(0.36, 0.36, 2.18, 12);
    const dipoleRingGeo = hiResTorus(0.42, 0.06, 6, 12);
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const px = ix * 1.18;
        const pz = iz * 1.18;
        const sleeve = new THREE.Mesh(hzoSleeveGeo, mats.loficDielectric);
        sleeve.position.set(px, 0.04, pz);
        sleeve.userData.noEdges = true;
        const core = new THREE.Mesh(chCoreGeo, mats.siliconPhotodiode);
        core.position.set(px, 0.08, pz);
        core.userData.noEdges = true;
        g.add(sleeve, core);
        // Alternating UP (gold) / DOWN (cyan) ferroelectric polarization dipole bands!
        for (const ry of [-0.48, 0.06, 0.6]) {
          const isUp = (ix + iz + (ry > 0 ? 1 : 0)) % 2 === 0;
          const ring = new THREE.Mesh(dipoleRingGeo, isUp ? mats.goldPlating : mats.vcWorkingFluidCyan);
          ring.rotation.x = Math.PI / 2;
          ring.position.set(px, ry, pz);
          ring.userData.noEdges = true;
          g.add(ring);
        }
      }
    }

    // Top analog MAC current-summing bitline rails + front TIA/ADC readout bar
    for (const bz of [-1.18, 0, 1.18]) {
      const bl = new THREE.Mesh(
        createChamferedBoxGeo(3.9, 0.18, 0.22, 0.02, 0.01, 'y'),
        mats.copperHybridBond
      );
      bl.position.set(0, 1.36, bz);
      bl.userData.noEdges = true;
      g.add(bl);
    }
    const tiaBar = new THREE.Mesh(
      createChamferedBoxGeo(3.9, 0.38, 0.56, 0.05, 0.02, 'y'),
      mats.varistorRingBlue
    );
    tiaBar.position.set(0, -1.04, 2.02);
    g.add(tiaBar);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-3d-fefet-2tnf-cim',
        45,
        '#8b5cf6',
        g,
        new THREE.Vector3(20, -6.4, -10.5),
        new THREE.Vector3(56, -24, -30),
        cp,
        0.22
      )
    );
  }

  // X2-46. PE-ALD H2-Annealed IGZO 2T0C Capacitorless Embedded DRAM (IEDM 2025 40-5 / ACS Nano 2026)
  {
    const g = new THREE.Group();
    // Monolithic 3D BEOL-stacked 2T0C cell: Lower Read-Transistor (bare gate = Storage Node, ZERO capacitor!)
    // + Vertical Tungsten SN Stub + Upper Dual-Gate PE-ALD Emerald IGZO Write-Transistor + H2 passivation cap!
    const readChannel = new THREE.Mesh(
      createChamferedBoxGeo(4.3, 0.78, 3.8, 0.12, 0.04, 'y'),
      mats.siliconLogicLayer
    );
    readChannel.position.y = -0.96;
    const readGateSn = new THREE.Mesh(
      createChamferedBoxGeo(1.55, 0.32, 3.4, 0.06, 0.02, 'y'),
      mats.goldPlating
    );
    readGateSn.position.y = -0.36; // Gate capacitance itself stores 6-bit charge (>4000s)!
    const snStub = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.62, 10), mats.copperHybridBond);
    snStub.position.set(0.88, 0.04, 0);

    // Upper PE-ALD dense amorphous InGaZnO (IGZO) Write-Transistor channel + Bottom/Top Dual-Gate electrodes!
    const botWg = new THREE.Mesh(
      createChamferedBoxGeo(1.22, 0.2, 2.5, 0.04, 0.02, 'y'),
      mats.tungstenGrid
    );
    botWg.position.set(-0.25, 0.14, 0);
    const igzoChannel = new THREE.Mesh(
      createChamferedBoxGeo(4.1, 0.42, 1.85, 0.08, 0.03, 'y'),
      u.batSocLedGlow
    );
    igzoChannel.position.y = 0.52;
    const topWg = new THREE.Mesh(
      createChamferedBoxGeo(1.22, 0.32, 2.5, 0.06, 0.02, 'y'),
      mats.tungstenLightShield
    );
    topWg.position.set(-0.25, 0.94, 0);
    // H2-annealed PBTI passivation cap (<8 mV shift @ 50nm!) + orthogonal WWL/RWL/WBL/RBL rails
    const h2Cap = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.14, 2.1, 0.04, 0.01, 'y'),
      mats.fluorineCoatCyan
    );
    h2Cap.position.y = 0.78;
    h2Cap.userData.noEdges = true;
    const wblRail = new THREE.Mesh(
      createChamferedBoxGeo(0.46, 0.32, 4.1, 0.04, 0.02, 'y'),
      mats.copperHybridBond
    );
    wblRail.position.set(-1.68, 0.92, 0);
    const rblRail = new THREE.Mesh(
      createChamferedBoxGeo(0.46, 0.32, 4.1, 0.04, 0.02, 'y'),
      mats.silverElectrode
    );
    rblRail.position.set(1.68, -0.34, 0);
    g.add(readChannel, readGateSn, snStub, botWg, igzoChannel, topWg, h2Cap, wblRail, rblRail);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-igzo-2t0c-edram',
        46,
        '#10b981',
        g,
        new THREE.Vector3(-20, -6.4, 0),
        new THREE.Vector3(-58, -24, 0),
        cp,
        0.24
      )
    );
  }

  // X2-47. Perpendicular Spin-Orbit Torque (SOT-MRAM) MTJ Weight Pillar (IEDM 2025)
  {
    const g = new THREE.Group();
    // 3-terminal SOT-MRAM: Heavy-metal beta-W/Pt spin-Hall write channel + W-Source/Drain pads
    // -> CoFeB Free Layer -> 1nm crystalline MgO tunnel barrier -> CoFeB Ref -> Ru spacer -> [Co/Pt] SAF Pinned Stack -> RBL!
    const sotTrack = new THREE.Mesh(
      createChamferedBoxGeo(4.9, 0.48, 1.95, 0.1, 0.04, 'y'),
      mats.tungstenLightShield
    );
    sotTrack.position.y = -1.14;
    for (const sx of [-2.2, 2.2]) {
      const wTerm = new THREE.Mesh(
        createChamferedBoxGeo(0.68, 0.68, 2.15, 0.06, 0.03, 'y'),
        mats.copperHybridBond
      );
      wTerm.position.set(sx, -1.04, 0);
      g.add(wTerm);
    }

    // Perpendicular MTJ nanopillar stack (7 physically accurate functional magnetic/tunnel films!)
    const freeLayer = new THREE.Mesh(hiResCyl(1.12, 1.12, 0.36, 18), mats.vcWorkingFluidCyan);
    freeLayer.position.y = -0.64;
    const mgoBarrier = new THREE.Mesh(hiResCyl(1.16, 1.16, 0.16, 18), mats.quartzOlpf);
    mgoBarrier.position.y = -0.34;
    const refLayer = new THREE.Mesh(hiResCyl(1.12, 1.12, 0.34, 18), mats.bodyRecRed);
    refLayer.position.y = -0.06;
    const ruSpacer = new THREE.Mesh(hiResCyl(1.14, 1.14, 0.12, 18), mats.sinteredSilver);
    ruSpacer.position.y = 0.2;
    const safPinned = new THREE.Mesh(hiResCyl(1.12, 1.12, 0.42, 18), mats.cinnabarAnodized);
    safPinned.position.y = 0.52;
    const rblTopCap = new THREE.Mesh(hiResCyl(1.26, 1.26, 0.3, 18), mats.goldPlating);
    rblTopCap.position.y = 0.94;
    const rblBridge = new THREE.Mesh(
      createChamferedBoxGeo(0.56, 0.22, 3.6, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    rblBridge.position.y = 1.22;

    // Spin-Hall polarization torque precession halo + spin-up/down arrows around the CoFeB free layer!
    const spinHalo = new THREE.Mesh(hiResTorus(1.52, 0.075, 7, 20), mats.goldPlating);
    spinHalo.rotation.x = Math.PI / 2;
    spinHalo.position.y = -0.64;
    spinHalo.userData.noEdges = true;
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
      const orb = new THREE.Mesh(hiResSphere(0.14, 8, 6), mats.fluorineCoatCyan);
      orb.position.set(Math.cos(a) * 1.52, -0.64, Math.sin(a) * 1.52);
      orb.userData.noEdges = true;
      g.add(orb);
    }
    g.add(sotTrack, freeLayer, mgoBarrier, refLayer, ruSpacer, safPinned, rblTopCap, rblBridge, spinHalo);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-sot-mram-mtj-weights',
        47,
        '#ec4899',
        g,
        new THREE.Vector3(20, -6.4, 10.5),
        new THREE.Vector3(56, -24, 30),
        cp,
        0.22
      )
    );
  }

  // X2-48. 300mm Monolithic GaN nMOS + Si pMOS On-Die IVR Power Stage (Intel / UCSD VLSI 2026)
  {
    const g = new THREE.Group();
    const siSub = makeHiResHorizPlate(
      createRoundedRectShape(6.4, 3.8, 0.45),
      0.42,
      mats.siliconBulk,
      0.05,
      2,
      12
    );
    siSub.position.y = -0.98;
    g.add(siSub);

    // Left: Hexagonal Wurtzite AlGaN/GaN HEMT Power FET mesa on AlN buffer with glowing 2DEG sheet & T-gate field plate!
    const alnBuf = new THREE.Mesh(hiResCyl(1.44, 1.48, 0.24, 6), mats.aluminaHighKFilm);
    alnBuf.position.set(-1.62, -0.62, 0);
    const ganMesa = new THREE.Mesh(hiResCyl(1.32, 1.4, 0.72, 6), mats.nanoArIridescent);
    ganMesa.position.set(-1.62, -0.1, 0);
    const twoDegGlow = new THREE.Mesh(hiResCyl(1.35, 1.35, 0.1, 6), mats.vcWorkingFluidCyan);
    twoDegGlow.position.set(-1.62, 0.3, 0);
    twoDegGlow.userData.noEdges = true;
    const tGateStem = new THREE.Mesh(
      createChamferedBoxGeo(0.28, 0.48, 2.0, 0.03, 0.01, 'y'),
      mats.goldPlating
    );
    tGateStem.position.set(-1.62, 0.56, 0);
    const tGateFieldPlate = new THREE.Mesh(
      createChamferedBoxGeo(0.88, 0.16, 2.08, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    tGateFieldPlate.position.set(-1.52, 0.86, 0);

    // Right: Co-integrated Si pMOS driver + 4-turn planar spiral copper buck micro-inductor + output MIM decap bank!
    const siPmos = new THREE.Mesh(
      createChamferedBoxGeo(2.05, 0.68, 2.35, 0.1, 0.03, 'y'),
      mats.ispSiliconDie
    );
    siPmos.position.set(1.52, -0.34, 0);
    for (const rad of [0.34, 0.62, 0.9, 1.18]) {
      const turn = new THREE.Mesh(hiResTorus(rad, 0.08, 7, 16), mats.copperCoil);
      turn.rotation.x = Math.PI / 2;
      turn.position.set(1.52, 0.22, 0);
      turn.userData.noEdges = true;
      g.add(turn);
    }
    const magCore = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.58, 10), mats.ferriteInductor);
    magCore.position.set(1.52, 0.26, 0);
    // Switching node copper bridge uniting GaN HEMT drain directly to buck micro-inductor
    const swBridge = makeNanoStrut(
      new THREE.Vector3(-0.78, 0.34, 0),
      new THREE.Vector3(0.75, 0.34, 0),
      0.13,
      mats.copperHybridBond,
      8
    );
    const decapBank = new THREE.Mesh(
      createChamferedBoxGeo(0.86, 0.62, 2.4, 0.06, 0.02, 'y'),
      mats.loficDielectric
    );
    decapBank.position.set(0.02, -0.42, 0);
    g.add(alnBuf, ganMesa, twoDegGlow, tGateStem, tGateFieldPlate, siPmos, magCore, swBridge, decapBank);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-gan-si-monolithic-ivr',
        48,
        '#eab308',
        g,
        new THREE.Vector3(0, -16, -20),
        new THREE.Vector3(0, -58, -58),
        cp,
        0.24
      )
    );
  }

  // X2-49. ISSCC 2026 UCIe-S 56 Gb/s/lane High-Density D2D PHY Macro
  {
    const g = new THREE.Group();
    const phySub = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 5.4, 0.4),
      0.44,
      mats.siliconLogicLayer,
      0.05,
      2,
      12
    );
    phySub.position.y = -0.82;
    g.add(phySub);

    // 4x5 staggered 35um-pitch UCIe-S micro-bump shoreline grid (TX cyan, RX silver, Forwarded-CLK gold, Spare Repair red!)
    const bumpGeo = hiResSphere(0.21, 8, 6);
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 5; iz++) {
        const bx = -1.32 + ix * 0.88;
        const bz = -0.58 + iz * 0.68 + (ix % 2 === 0 ? 0 : 0.16);
        const bMat =
          ix === 1 && iz === 2
            ? mats.goldPlating
            : iz === 4
              ? mats.bodyRecRed
              : ix < 2
                ? mats.vcWorkingFluidCyan
                : mats.solderBallSilver;
        const b = new THREE.Mesh(bumpGeo, bMat);
        b.position.set(bx, -0.36, bz);
        b.userData.noEdges = true;
        g.add(b);
      }
    }

    // Forwarded-Clock 64-step Phase Interpolator (PI) deskew ring + 56G TX/RX Equalizer array + Sideband FSM!
    const piHousing = new THREE.Mesh(
      createChamferedBoxGeo(4.0, 0.56, 1.38, 0.08, 0.03, 'y'),
      mats.varistorRingBlue
    );
    piHousing.position.set(0, -0.26, -1.78);
    const piRing = new THREE.Mesh(hiResTorus(0.46, 0.08, 7, 16), mats.goldPlating);
    piRing.rotation.x = Math.PI / 2;
    piRing.position.set(-1.12, 0.12, -1.78);
    piRing.userData.noEdges = true;
    const eqBlock = new THREE.Mesh(
      createChamferedBoxGeo(1.65, 0.44, 0.88, 0.06, 0.02, 'y'),
      mats.copperHybridBond
    );
    eqBlock.position.set(0.86, 0.16, -1.78);
    g.add(piHousing, piRing, eqBlock);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-ucie-s-56g-d2d-phy',
        49,
        '#0284c7',
        g,
        new THREE.Vector3(20, 14.8, 6.9),
        new THREE.Vector3(56, 56, 21),
        cp,
        0.24
      )
    );
  }

  // X2-50. HBM4 2048-Bit Ultra-Wide Base-Die Logic Interface (ISSCC 2026)
  {
    const g = new THREE.Group();
    const baseDie = makeHiResHorizPlate(
      createRoundedRectShape(4.8, 5.4, 0.4),
      0.54,
      mats.dramCellArray,
      0.06,
      2,
      12
    );
    baseDie.position.y = -0.92;
    g.add(baseDie);

    // 4 independent 512-bit Pseudo-Channel TSV vertical stacks (total 2048-bit >2 TB/s!)
    for (const [qx, qz] of [
      [-1.16, -1.32],
      [1.16, -1.32],
      [-1.16, 1.32],
      [1.16, 1.32],
    ]) {
      const chTile = new THREE.Mesh(
        createChamferedBoxGeo(1.72, 0.56, 1.82, 0.08, 0.03, 'y'),
        mats.ispSiliconDie
      );
      chTile.position.set(qx, -0.32, qz);
      // 2x2 vertical copper TSV bundle rising cleanly from each 512-bit quadrant
      for (const [dx, dz] of [
        [-0.36, -0.38],
        [0.36, -0.38],
        [-0.36, 0.38],
        [0.36, 0.38],
      ]) {
        const tsv = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.58, 8), mats.copperHybridBond);
        tsv.position.set(qx + dx, 0.24, qz + dz);
        tsv.userData.noEdges = true;
        g.add(tsv);
      }
      const capRing = new THREE.Mesh(hiResTorus(0.66, 0.07, 6, 14), mats.goldPlating);
      capRing.rotation.x = Math.PI / 2;
      capRing.position.set(qx, 0.06, qz);
      capRing.userData.noEdges = true;
      g.add(chTile, capRing);
    }

    // Central custom N3/N5 logic controller & on-die SECDED ECC spine + IEEE 1500/1838 test-port row!
    const logicSpine = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.46, 0.62, 0.06, 0.02, 'y'),
      mats.goldPlating
    );
    logicSpine.position.set(0, -0.32, 0);
    g.add(logicSpine);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-hbm4-2048b-base-die',
        50,
        '#2563eb',
        g,
        new THREE.Vector3(-20, 14.8, 6.9),
        new THREE.Vector3(-56, 56, 21),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // TIER 4 — 110GHz GeSi EAM, MICROFLUIDIC COOLER, BAW CLOCK, SECURITY & 3.5D COUPE (X2-51 – X2-55)
  // =========================================================================

  // X2-51. >110 GHz C-Band GeSi Electro-Absorption Modulator (EAM) & Ge Photodetector (imec IEDM 2025 41-3)
  {
    const g = new THREE.Group();
    const boxSub = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 5.4, 0.4),
      0.42,
      mats.quartzOlpf,
      0.05,
      2,
      12
    );
    boxSub.position.y = -0.88;
    g.add(boxSub);

    // Tapered SiN edge-coupler spot-size converter -> rib-waveguide Franz-Keldysh GeSi EAM cavity -> Ge PIN photodiode!
    const taperCone = new THREE.Mesh(hiResCyl(0.16, 0.44, 1.05, 8), mats.evfDichroicMirror);
    taperCone.rotation.x = Math.PI / 2;
    taperCone.position.set(0, -0.4, -2.02);
    const ribWg = new THREE.Mesh(
      createChamferedBoxGeo(0.42, 0.34, 3.6, 0.04, 0.02, 'y'),
      mats.evfDichroicMirror
    );
    ribWg.position.set(0, -0.4, 0.1);
    const gesiMod = new THREE.Mesh(
      createChamferedBoxGeo(1.18, 0.64, 1.75, 0.08, 0.03, 'y'),
      mats.cinnabarAnodized
    );
    gesiMod.position.set(0, -0.22, -0.35);

    // Tapered Coplanar Waveguide (G-S-G) >110 GHz millimeter-wave gold transmission electrodes + 50-ohm termination!
    for (const ex of [-1.42, 1.42]) {
      const gndPad = new THREE.Mesh(
        createChamferedBoxGeo(0.92, 0.36, 2.35, 0.05, 0.02, 'y'),
        mats.goldPlating
      );
      gndPad.position.set(ex, -0.34, -0.35);
      const rfFinger = new THREE.Mesh(
        createChamferedBoxGeo(0.56, 0.16, 1.35, 0.02, 0.01, 'y'),
        mats.copperHybridBond
      );
      rfFinger.position.set(ex * 0.62, -0.1, -0.35);
      rfFinger.userData.noEdges = true;
      g.add(gndPad, rfFinger);
    }
    const termRes = new THREE.Mesh(
      createChamferedBoxGeo(0.52, 0.24, 0.32, 0.03, 0.01, 'y'),
      mats.matteBlackAnodized
    );
    termRes.position.set(1.42, -0.02, 0.98);

    // High-speed waveguide-integrated Germanium PIN Photodetector with coaxial metal cathode/anode rings!
    const gePd = new THREE.Mesh(hiResCyl(0.68, 0.74, 0.72, 16), mats.bodyRecRed);
    gePd.position.set(0, -0.18, 1.72);
    const pdRing = new THREE.Mesh(hiResTorus(0.58, 0.07, 6, 16), mats.goldPlating);
    pdRing.rotation.x = Math.PI / 2;
    pdRing.position.set(0, 0.22, 1.72);
    pdRing.userData.noEdges = true;
    g.add(taperCone, ribWg, gesiMod, termRes, gePd, pdRing);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-gesi-110ghz-eam-cpo',
        51,
        '#f43f5e',
        g,
        new THREE.Vector3(-20, 12.2, -6.9),
        new THREE.Vector3(-56, 46, -21),
        cp,
        0.24
      )
    );
  }

  // X2-52. Direct-to-Silicon 3D IC Microfluidic Micro-Channel Liquid Cooler (imec IEDM 2025 17-3, 140.7°C -> 70.8°C)
  {
    const g = new THREE.Group();
    const coolerGeo = extrudeHiRes(createRoundedRectShape(42.0, 37.0, 2.2), 0.96, 0.1, 0.1, 2, 18);
    coolerGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(coolerGeo, 42.0, 37.0, 'xz');
    const baseManifold = new THREE.Mesh(coolerGeo, u.v2BionzMicrofluidicGrid);
    g.add(baseManifold);

    // 12 deep-RIE sculpted parallel silicon micro-channel fins + staggered rows of 3D micro-pin-fin turbulators!
    const pinGeo = hiResCyl(0.28, 0.28, 0.64, 6);
    for (let i = -5.5; i <= 5.5; i += 1) {
      const rz = i * 2.65;
      const finWall = new THREE.Mesh(
        createChamferedBoxGeo(34.6, 0.62, 0.52, 0.05, 0.02, 'y'),
        mats.siliconBulk
      );
      finWall.position.set(0, 0.72, rz);
      finWall.userData.noEdges = true;
      g.add(finWall);

      // Staggered micro-pin-fin turbulators inside each coolant channel transitioning cold cyan -> warm amber!
      if (i < 5.5) {
        const chZ = rz + 1.325;
        for (let px = -14.0; px <= 14.0; px += 4.0) {
          const pin = new THREE.Mesh(
            pinGeo,
            px < -4 ? mats.vcWorkingFluidCyan : px < 4 ? mats.fluorineCoatCyan : mats.copperHeatSpreader
          );
          pin.position.set(px + (Math.round(i + 5.5) % 2 === 0 ? 1.0 : -1.0), 0.72, chZ);
          pin.userData.noEdges = true;
          g.add(pin);
        }
      }
    }

    // Bonded borosilicate glass manifold cutaway bezel frame + 4 corner O-ring micro-gasket bosses!
    const glassLidFrame = makeHiResHorizPlate(
      createFrameShape(41.4, 36.4, 2.0, 36.4, 31.4, 1.4),
      0.28,
      mats.quartzOlpf,
      0.04,
      1,
      16
    );
    glassLidFrame.position.y = 1.12;
    g.add(glassLidFrame);
    for (const [ox, oz] of [
      [-19.2, -16.8],
      [19.2, -16.8],
      [-19.2, 16.8],
      [19.2, 16.8],
    ]) {
      const boss = new THREE.Mesh(hiResTorus(0.86, 0.14, 7, 14), mats.bodyRecRed);
      boss.rotation.x = Math.PI / 2;
      boss.position.set(ox, 1.24, oz);
      boss.userData.noEdges = true;
      g.add(boss);
    }

    // Left Cold-Inlet (cyan) & Right Hot-Outlet (copper) manifold distribution plenums + flanged quick-seal nozzles!
    const inletHeader = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 1.42, 31.4, 0.22, 0.06, 'y'),
      mats.vcWorkingFluidCyan
    );
    inletHeader.position.set(-18.8, 0.48, 0);
    const outletHeader = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 1.42, 31.4, 0.22, 0.06, 'y'),
      mats.copperHeatSpreader
    );
    outletHeader.position.set(18.8, 0.48, 0);
    for (const [px, pmat, fmat] of [
      [-21.2, mats.silverElectrode, mats.vcWorkingFluidCyan],
      [21.2, mats.copperHybridBond, mats.goldPlating],
    ] as const) {
      const pipe = new THREE.Mesh(hiResCyl(1.05, 1.05, 2.4, 14), pmat);
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(px, 0.48, 0);
      const flange = new THREE.Mesh(hiResTorus(1.26, 0.16, 8, 16), fmat);
      flange.rotation.y = Math.PI / 2;
      flange.position.set(px + (px < 0 ? -0.9 : 0.9), 0.48, 0);
      flange.userData.noEdges = true;
      g.add(pipe, flange);
    }
    g.add(inletHeader, outletHeader);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-microfluidic-si-cooler',
        52,
        '#06b6d4',
        g,
        new THREE.Vector3(0, -22.99, 0),
        new THREE.Vector3(0, -80, 0),
        cp,
        0.22
      )
    );
  }

  // X2-53. Multi-Shear-Mode Silicon Bulk Acoustic (BAW) On-Die Precision Clock (IEDM 2025 13-1, 102ns/8hr)
  {
    const g = new THREE.Group();
    const cavityFrame = makeHiResHorizPlate(
      createFrameShape(6.4, 4.1, 0.45, 4.9, 2.8, 0.3),
      0.88,
      mats.siliconBulk,
      0.06,
      2,
      14
    );
    // Suspended monocrystalline hexagonal Silicon BAW plate + AlScN interdigitated piezoelectric top electrode fingers!
    const hexPlate = new THREE.Mesh(hiResCyl(1.24, 1.24, 0.46, 6), mats.siliconPhotodiode);
    hexPlate.position.y = 0.04;
    const alscnFilm = new THREE.Mesh(hiResCyl(1.12, 1.12, 0.14, 6), mats.goldPlating);
    alscnFilm.position.y = 0.34;
    for (let k = -2; k <= 2; k++) {
      const idtFinger = new THREE.Mesh(
        new THREE.BoxGeometry(1.45, 0.06, 0.12),
        k % 2 === 0 ? mats.copperHybridBond : mats.silverElectrode
      );
      idtFinger.position.set(0, 0.44, k * 0.3);
      idtFinger.userData.noEdges = true;
      g.add(idtFinger);
    }

    // Dual concentric alternating high/low-impedance Bragg Acoustic Mirror rings reflecting energy back into cavity!
    const braggInner = new THREE.Mesh(hiResTorus(1.52, 0.09, 7, 18), mats.fluorineCoatCyan);
    braggInner.rotation.x = Math.PI / 2;
    braggInner.position.y = 0.14;
    braggInner.userData.noEdges = true;
    const braggOuter = new THREE.Mesh(hiResTorus(1.88, 0.08, 7, 20), mats.aluminaHighKFilm);
    braggOuter.rotation.x = Math.PI / 2;
    braggOuter.position.y = 0.14;
    braggOuter.userData.noEdges = true;

    // 4 quarter-wave acoustic-isolation tether beams + dual-mode temperature-compensation PLL strip on edge!
    for (const [tx, tz] of [
      [-1, -0.35],
      [-1, 0.35],
      [1, -0.35],
      [1, 0.35],
    ]) {
      g.add(
        makeNanoStrut(
          new THREE.Vector3(tx * 1.15, 0.08, tz),
          new THREE.Vector3(tx * 2.55, 0.08, tz),
          0.085,
          mats.silverElectrode,
          7
        )
      );
    }
    const tempPll = new THREE.Mesh(
      createChamferedBoxGeo(0.74, 0.54, 2.2, 0.06, 0.02, 'y'),
      mats.varistorRingBlue
    );
    tempPll.position.set(2.82, 0.56, 0);
    g.add(cavityFrame, hexPlate, alscnFilm, braggInner, braggOuter, tempPll);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-si-baw-clock-resonator',
        53,
        '#eab308',
        g,
        new THREE.Vector3(0, -15, 20),
        new THREE.Vector3(0, -52, 58),
        cp,
        0.24
      )
    );
  }

  // X2-54. Dual-Rail Side-Channel Power-Masking & AI-Weight ECC Scrub Guard (2026)
  {
    const g = new THREE.Group();
    const shieldBase = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.8, 0.4),
      0.42,
      mats.tungstenGrid,
      0.05,
      2,
      12
    );
    shieldBase.position.y = -0.92;
    g.add(shieldBase);

    // 6 interleaved True (Q cyan) & Complementary Mask (QB gold) dual-rail precharge WDDL logic blades equalizing I(t)!
    for (let i = 0; i < 6; i++) {
      const bx = -1.55 + i * 0.62;
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(0.38, 0.92, 3.2, 0.04, 0.02, 'y'),
        i % 2 === 0 ? mats.vcWorkingFluidCyan : mats.goldPlating
      );
      blade.position.set(bx, -0.18, -0.2);
      g.add(blade);
    }

    // Front SECDED ECC syndrome-check parity bar + TRNG random-mask XOR injector cylinder
    const eccBar = new THREE.Mesh(
      createChamferedBoxGeo(3.9, 0.44, 0.54, 0.05, 0.02, 'y'),
      mats.varistorRingBlue
    );
    eccBar.position.set(0, -0.44, 1.88);
    const trngNode = new THREE.Mesh(hiResCyl(0.36, 0.36, 0.72, 12), mats.bodyRecRed);
    trngNode.position.set(0, 0.02, -1.92);

    // Active serpentine copper Faraday tamper-detection canopy mesh guarding C2PA private key registers!
    const meshCanopy = makeHiResHorizPlate(
      createFrameShape(4.4, 4.6, 0.35, 3.4, 3.6, 0.2),
      0.22,
      mats.copperHybridBond,
      0.03,
      1,
      12
    );
    meshCanopy.position.y = 0.68;
    for (let s = -2; s <= 2; s++) {
      const serp = new THREE.Mesh(
        new THREE.BoxGeometry(3.4, 0.09, 0.14),
        mats.copperHybridBond
      );
      serp.position.set(0, 0.68, s * 0.68);
      serp.userData.noEdges = true;
      g.add(serp);
    }
    g.add(eccBar, trngNode, meshCanopy);

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-sidechannel-ecc-guard',
        54,
        '#0d9488',
        g,
        new THREE.Vector3(20, -6.4, 0),
        new THREE.Vector3(58, -24, 0),
        cp,
        0.24
      )
    );
  }

  // X2-55. TSMC 3.5D COUPE 4.5um-Pitch Optical-Electrical Micro-Interposer Ring (VLSI 2026)
  {
    const g = new THREE.Group();
    // Lower Silicon Photonics (PIC) optical waveguide ring + 8 WDM micro-ring resonators + 4 EIC driver chiplets on 4.5um SoIC!
    const picRing = makeHiResHorizPlate(
      createFrameShape(47.4, 42.4, 2.2, 42.2, 37.2, 1.7),
      0.78,
      mats.quartzOlpf,
      0.08,
      2,
      20
    );
    const opticalWaveBus = makeHiResHorizPlate(
      createFrameShape(45.8, 40.8, 2.0, 44.0, 39.0, 1.6),
      0.28,
      mats.evfDichroicMirror,
      0.04,
      1,
      16
    );
    opticalWaveBus.position.y = 0.52;
    g.add(picRing, opticalWaveBus);

    // 4 perimeter Electronic IC (EIC) N6 driver chiplets stacked via 4.5um SoIC-X Cu micro-columns directly on PIC!
    for (const [ex, ez, rot] of [
      [0, -19.9, 0],
      [0, 19.9, 0],
      [-22.4, 0, Math.PI / 2],
      [22.4, 0, Math.PI / 2],
    ]) {
      const eicGroup = new THREE.Group();
      eicGroup.position.set(ex, 0.72, ez);
      eicGroup.rotation.y = rot;
      const eicDie = new THREE.Mesh(
        createChamferedBoxGeo(9.2, 0.52, 2.0, 0.14, 0.04, 'y'),
        mats.ispSiliconDie
      );
      eicDie.position.y = 0.34;
      eicGroup.add(eicDie);
      // 4.5um-pitch SoIC copper hybrid-bond micro-columns beneath each EIC driver!
      for (let bx = -3.6; bx <= 3.6; bx += 1.8) {
        const col = new THREE.Mesh(hiResCyl(0.18, 0.18, 0.36, 8), mats.copperHybridBond);
        col.position.set(bx, -0.06, 0);
        col.userData.noEdges = true;
        eicGroup.add(col);
      }
      // Twin WDM optical micro-ring resonators flanking each EIC driver!
      for (const rx of [-6.4, 6.4]) {
        const wdm = new THREE.Mesh(hiResTorus(0.66, 0.09, 7, 16), mats.bodyRecRed);
        wdm.rotation.x = Math.PI / 2;
        wdm.position.set(rx, -0.06, 0);
        wdm.userData.noEdges = true;
        eicGroup.add(wdm);
      }
      g.add(eicGroup);
    }

    // 4 Corner KOH-Etched V-Groove 3-Channel Fiber-Array Blocks mating directly into X2-79 MT-Ferrule Docks!
    for (const [cx, cz, rot] of [
      [-21.4, -18.9, Math.PI / 4],
      [21.4, -18.9, -Math.PI / 4],
      [-21.4, 18.9, (3 * Math.PI) / 4],
      [21.4, 18.9, -(3 * Math.PI) / 4],
    ]) {
      const dock = new THREE.Group();
      dock.position.set(cx, 0.44, cz);
      dock.rotation.y = rot;
      const vGroove = new THREE.Mesh(
        createChamferedBoxGeo(3.0, 0.92, 2.5, 0.12, 0.04, 'y'),
        mats.silverElectrode
      );
      const ferrule = new THREE.Mesh(
        createChamferedBoxGeo(0.72, 1.04, 2.65, 0.08, 0.03, 'y'),
        mats.goldPlating
      );
      ferrule.position.set(1.1, 0.14, 0);
      dock.add(vGroove, ferrule);

      for (const [fz, fmat] of [
        [-0.72, mats.vcWorkingFluidCyan],
        [0, mats.goldPlating],
        [0.72, mats.bodyRecRed],
      ] as const) {
        const fiber = new THREE.Mesh(hiResCyl(0.18, 0.18, 3.4, 10), fmat);
        fiber.rotation.z = Math.PI / 2;
        fiber.position.set(0.05, 0.56, fz);
        fiber.userData.noEdges = true;
        const mLens = new THREE.Mesh(hiResSphere(0.3, 9, 7), mats.lensXaGlass);
        mLens.position.set(-1.62, 0.56, fz);
        mLens.userData.noEdges = true;
        dock.add(fiber, mLens);
      }
      g.add(dock);
    }

    parts.push(
      finalizeDeepBionzV2Part(
        'xv2-coupe-35d-interposer',
        55,
        '#ec4899',
        g,
        new THREE.Vector3(0, 17.68, 0),
        new THREE.Vector3(0, 84, 0),
        cp,
        0.22
      )
    );
  }

  // Harmonize outlier vertical heights (X2-39/40 M0 tracks & X2-45 FeFET CiM) for tight, zero-gap architectural stacking
  // and preserve full electron-microscope micro-tessellation on every sculpted geometry
  for (const part of parts) {
    if (part.order === 39 || part.order === 40 || part.order === 45) {
      const sy = part.order === 45 ? 0.78 : 0.7;
      const scaledHolder = new THREE.Group();
      scaledHolder.scale.set(1.0, sy, 1.0);
      while (part.group.children.length > 0) {
        scaledHolder.add(part.group.children[0]);
      }
      part.group.add(scaledHolder);
    }
    part.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.geometry) {
        markHiRes(obj.geometry);
      }
    });
  }

  return parts;
}
