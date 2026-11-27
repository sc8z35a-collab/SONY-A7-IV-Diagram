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
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeUltraBionzV2Part(
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

/** Connect two 3D points with a fine nanoscale strut or atomic bond */
function makeNanoLink(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius: number,
  mat: THREE.Material,
  segs = 6
): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = Math.max(0.01, dir.length());
  const mesh = new THREE.Mesh(hiResCyl(radius, radius, len, segs), mat);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  mesh.userData.noEdges = true;
  return mesh;
}

/** Create authentic {111} crystal-faceted diamond epitaxial S/D cross-section */
function createEpiDiamondShape(w: number, h: number): THREE.Shape {
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

/** Create an L-shaped corner seal-ring cutaway baseplate */
function createCornerLShape(outer: number, leg: number): THREE.Shape {
  const h = outer * 0.5;
  const s = new THREE.Shape();
  s.moveTo(-h, -h);
  s.lineTo(h, -h);
  s.lineTo(h, -h + leg);
  s.lineTo(-h + leg, -h + leg);
  s.lineTo(-h + leg, h);
  s.lineTo(-h, h);
  s.closePath();
  return s;
}

/**
 * Build the +30-part Ultra-Detail Expansion for BIONZ XR / XR2 V2 (`X2-56` – `X2-85`, bringing total to 85 parts).
 *
 * Covers five previously omitted real-world physical & architectural domains verified against 2025–2026 research
 * (IEDM 2025/2026, ISSCC 2026, VLSI 2025/2026, ECTC 2026, EOS/ESD Roadmap 2027, IEEE 1838 3D-IC DFT) and
 * Sony α7 V (ILCE-7M5) / FX5 BIONZ XR2 camera silicon:
 *   - Tier A (X2-56 – X2-61): 1.4nm-class FEOL (TSMC A14 NanoFlex Pro/Boost, Intel 14A RibbonFET 2/PowerDirect,
 *                             imec Outer-Wall Forksheet, Full BDI, SDB/SAGC, Active Backside 300nm Vertical ESD)
 *   - Tier B (X2-62 – X2-67): MOL/BEOL/Thinning & Protection (ALD MoN->Mo Linerless Via, SAC SiN Helmet,
 *                             BSPDN SiGe Etch-Stop, Die Crack-Stop & MOB Seal Ring, DTI Guard Ring, M3D Si/IGO SRAM)
 *   - Tier C (X2-68 – X2-73): ISSCC 2026 Clocking, Power Integrity & DFT (71.5fs ADPLL/DTC, Nanosecond Droop FLL,
 *                             2nm Clock-Edge Latch, 2.1ppm/C Super-PTAT BGR, 350mV SRAM NBL/OTP, IEEE 1838 DFT/SLM)
 *   - Tier D (X2-74 – X2-79): ECTC 2026 3.5D Packaging & Grand Thermal/Optical Crowns (200-450nm Cu/SiCN Hybrid Bond,
 *                             EMIB-T TSV Silicon Bridge, eSTC & Coax TGV, Cu-Pillar IMC/CUF, Cu-Diamond sTIM Lid,
 *                             3.5D Invar Stiffener & Detachable Optical MT-Ferrule Frame)
 *   - Tier E (X2-80 – X2-85): Sony BIONZ XR2 Dedicated Camera ISP & Media Silicon (759-pt PDAF & 60Hz Pose AF+,
 *                             16-Stop Dual-Gain HDR & Composite RAW, 10-bit 4:2:2 XAVC HS/AV1 Codec, 33^3 3D LUT &
 *                             Breathing Warp, 30fps Pre-Capture Ring DMA & CFexpress/USB-C, 240Hz EVF & HDMI 2.1 FRL)
 */
export function buildBionzV2UltraParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // TIER A — 1.4nm-CLASS FEOL, FORKSHEET, FULL BDI, SDB/SAGC & BACKSIDE ESD (X2-56 – X2-61)
  // =========================================================================

  // X2-56. TSMC A14 NanoFlex Pro 2nd-Gen GAA & Boost Cell + <0.017um^2 SRAM Tile (IEDM 2026 Paper 3-2)
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.36),
      0.34,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -1.08;
    g.add(base);

    // Left: Tall A14 Boost Cell (4-tier wide 2nd-gen nanosheets + VT-Flex dual-colored HKMG gates)
    const boostGate = new THREE.Mesh(
      createChamferedBoxGeo(0.92, 2.02, 1.85, 0.06, 0.03, 'y'),
      mats.goldPlating
    );
    boostGate.position.set(-0.98, 0.06, 0.45);
    const boostHfo2 = new THREE.Mesh(
      createChamferedBoxGeo(1.12, 1.88, 1.98, 0.06, 0.02, 'y'),
      mats.aluminaHighKFilm
    );
    boostHfo2.position.set(-0.98, 0.04, 0.45);
    g.add(boostHfo2, boostGate);

    const sheetGeo = createChamferedBoxGeo(2.08, 0.16, 1.56, 0.03, 0.015, 'y');
    for (let i = 0; i < 4; i++) {
      const sh = new THREE.Mesh(sheetGeo, mats.vcWorkingFluidCyan);
      sh.position.set(-0.98, -0.64 + i * 0.44, 0.45);
      sh.userData.noEdges = true;
      g.add(sh);
    }
    const epiGeo = extrudeHiRes(createEpiDiamondShape(1.52, 1.65), 0.46, 0.04, 0.04, 1, 8);
    epiGeo.rotateY(Math.PI / 2);
    for (const sx of [-1.96, -0.02]) {
      const ep = new THREE.Mesh(epiGeo, mats.siliconPhotodiode);
      ep.position.set(sx, 0.02, 0.45);
      g.add(ep);
    }

    // Right: Ultra-compact A14 <0.017um^2 6T SRAM cell tile (short height, narrow sheets, VT-Flex gate)
    const sramPedestal = new THREE.Mesh(
      createChamferedBoxGeo(1.78, 0.24, 3.3, 0.05, 0.02, 'y'),
      u.v2BionzSramArray
    );
    sramPedestal.position.set(1.18, -0.78, 0);
    g.add(sramPedestal);

    const sramGateGeo = createChamferedBoxGeo(0.32, 1.12, 3.0, 0.04, 0.02, 'y');
    for (const [gx, gmat] of [
      [0.74, mats.cinnabarAnodized],
      [1.62, mats.fluorineCoatCyan],
    ] as const) {
      const sg = new THREE.Mesh(sramGateGeo, gmat);
      sg.position.set(gx, -0.1, 0);
      g.add(sg);
    }
    const sramBitGeo = createChamferedBoxGeo(1.52, 0.14, 0.44, 0.02, 0.01, 'y');
    for (const sz of [-0.95, 0, 0.95]) {
      for (const sy of [-0.46, 0.04]) {
        const b = new THREE.Mesh(sramBitGeo, mats.mofEmerald);
        b.position.set(1.18, sy, sz);
        b.userData.noEdges = true;
        g.add(b);
      }
    }

    // Top shared M0 NanoFlex Pro stepped rail bridge
    const railBridge = new THREE.Mesh(
      createChamferedBoxGeo(4.1, 0.18, 0.34, 0.03, 0.015, 'y'),
      mats.sinteredSilver
    );
    railBridge.position.set(0, 1.16, 0.45);
    railBridge.userData.noEdges = true;
    g.add(railBridge);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-a14-nanoflex-pro-boost',
        56,
        '#0ea5e9',
        g,
        new THREE.Vector3(-13.8, 0.8, 20),
        new THREE.Vector3(-42, 2.5, 56),
        cp,
        0.22
      )
    );
  }

  // X2-57. Intel 14A RibbonFET 2 + PowerDirect Direct Backside S/D & Turbo Cells (2026 PDK 0.9)
  {
    const g = new THREE.Group();
    // Backside PowerDirect heavy copper manifold base
    const pdPlate = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.38,
      mats.copperHybridBond,
      0.04,
      2,
      10
    );
    pdPlate.position.y = -1.06;
    const thinnedSi = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.28, 3.8, 0.06, 0.02, 'y'),
      mats.siliconBulk
    );
    thinnedSi.position.y = -0.68;
    g.add(pdPlate, thinnedSi);

    // Direct PowerDirect vertical tungsten/copper contact stems piercing directly into lower S/D epi!
    const stemGeo = hiResCyl(0.24, 0.3, 0.92, 10);
    for (const sx of [-1.42, 1.42]) {
      for (const sz of [-0.72, 0.72]) {
        const stem = new THREE.Mesh(stemGeo, mats.goldPlating);
        stem.position.set(sx, -0.44, sz);
        stem.userData.noEdges = true;
        g.add(stem);
      }
    }

    // 4-Ribbon RibbonFET 2 horizontal GAA channel stack + central HKMG gate wrap
    const rGate = new THREE.Mesh(
      createChamferedBoxGeo(1.16, 1.72, 2.75, 0.06, 0.03, 'y'),
      mats.aluminaHighKFilm
    );
    rGate.position.y = 0.28;
    const rCore = new THREE.Mesh(
      createChamferedBoxGeo(0.84, 1.88, 2.55, 0.05, 0.02, 'y'),
      mats.stainlessMachined
    );
    rCore.position.y = 0.32;
    g.add(rGate, rCore);

    const ribbonGeo = createChamferedBoxGeo(3.25, 0.14, 2.15, 0.03, 0.015, 'y');
    for (let i = 0; i < 4; i++) {
      const rib = new THREE.Mesh(ribbonGeo, mats.vcWorkingFluidCyan);
      rib.position.y = -0.28 + i * 0.38;
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Twin {111} faceted S/D epi blocks directly seated on PowerDirect stems
    const epiGeo = extrudeHiRes(createEpiDiamondShape(2.2, 1.48), 0.68, 0.04, 0.04, 1, 8);
    epiGeo.rotateY(Math.PI / 2);
    for (const sx of [-1.42, 1.42]) {
      const ep = new THREE.Mesh(epiGeo, mats.siliconPhotodiode);
      ep.position.set(sx, 0.28, 0);
      g.add(ep);
    }

    // Top Turbo Cell dual overdrive speed rails (zero frontside power congestion!)
    const turboGeo = createChamferedBoxGeo(4.0, 0.18, 0.26, 0.03, 0.015, 'y');
    for (const tz of [-0.92, 0.92]) {
      const rail = new THREE.Mesh(turboGeo, mats.bodyRecRed);
      rail.position.set(0, 1.24, tz);
      rail.userData.noEdges = true;
      g.add(rail);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-14a-ribbonfet2-powerdirect',
        57,
        '#f97316',
        g,
        new THREE.Vector3(-6.9, 0.8, 20),
        new THREE.Vector3(-21, 2.5, 56),
        cp,
        0.22
      )
    );
  }

  // X2-58. imec A10 Outer-Wall Forksheet FET & Continuous S/D Channel Strain Wall (VLSI 2025/2026)
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.34,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -1.06;
    g.add(base);

    // Outer SiN Dielectric Walls flanking the OUTER boundaries (left & right Z) enabling continuous S/D strain!
    const wallGeo = createChamferedBoxGeo(4.2, 2.08, 0.34, 0.04, 0.02, 'y');
    for (const wz of [-1.52, 1.52]) {
      const wall = new THREE.Mesh(wallGeo, mats.quartzOlpf);
      wall.position.set(0, 0.06, wz);
      g.add(wall);
    }

    // Fork-shaped tri-gate wraps hugging nMOS (+Z) and pMOS (-Z) 3-sheet stacks from the inner side
    const forkSpine = new THREE.Mesh(
      createChamferedBoxGeo(1.05, 1.92, 0.36, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    forkSpine.position.set(0, 0.08, 0);
    g.add(forkSpine);

    const tineGeo = createChamferedBoxGeo(1.05, 0.16, 1.15, 0.02, 0.01, 'y');
    for (const fz of [-0.72, 0.72]) {
      for (const fy of [-0.72, -0.18, 0.36, 0.9]) {
        const tine = new THREE.Mesh(tineGeo, mats.goldPlating);
        tine.position.set(0, fy, fz);
        tine.userData.noEdges = true;
        g.add(tine);
      }
    }

    // Suspended 3-sheet nMOS (cyan) & pMOS (rose-red) channels sandwiched inside the fork tines
    const chGeo = createChamferedBoxGeo(3.6, 0.18, 0.88, 0.03, 0.015, 'y');
    for (let i = 0; i < 3; i++) {
      const y = -0.45 + i * 0.54;
      const nCh = new THREE.Mesh(chGeo, mats.vcWorkingFluidCyan);
      nCh.position.set(0, y, 0.74);
      nCh.userData.noEdges = true;
      const pCh = new THREE.Mesh(chGeo, mats.bodyRecRed);
      pCh.position.set(0, y, -0.74);
      pCh.userData.noEdges = true;
      g.add(nCh, pCh);
    }

    // Continuous full-stress S/D epi stressors on both X ends (+33% drive current recovery)
    const stressGeo = createChamferedBoxGeo(0.58, 1.62, 0.96, 0.05, 0.02, 'y');
    for (const sx of [-1.72, 1.72]) {
      const nSt = new THREE.Mesh(stressGeo, mats.siliconPhotodiode);
      nSt.position.set(sx, 0.08, 0.74);
      const pSt = new THREE.Mesh(stressGeo, mats.cinnabarAnodized);
      pSt.position.set(sx, 0.08, -0.74);
      g.add(nSt, pSt);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-outer-wall-forksheet-fet',
        58,
        '#8b5cf6',
        g,
        new THREE.Vector3(0, 0.8, 20),
        new THREE.Vector3(0, 2.5, 58),
        cp,
        0.22
      )
    );
  }

  // X2-59. 2nm GAA Full Bottom Dielectric Isolation (Full BDI) & Parasitic Sub-Channel Stopper
  {
    const g = new THREE.Group();
    // Bulk Si substrate block at bottom
    const bulkSub = new THREE.Mesh(
      createChamferedBoxGeo(4.5, 0.64, 3.8, 0.08, 0.03, 'y'),
      mats.siliconBulk
    );
    bulkSub.position.y = -0.96;
    g.add(bulkSub);

    // Thick continuous Full-BDI dielectric shelf (sacrificial 45% SiGe etch -> SiN/SiO2 backfill) spanning BOTH gate & S/D!
    const bdiShelf = new THREE.Mesh(
      createChamferedBoxGeo(4.56, 0.34, 3.86, 0.05, 0.02, 'y'),
      mats.loficDielectric
    );
    bdiShelf.position.y = -0.44;
    const bdiRim = new THREE.Mesh(
      createChamferedBoxGeo(4.62, 0.1, 3.92, 0.02, 0.01, 'y'),
      mats.fluorineCoatCyan
    );
    bdiRim.position.y = -0.26;
    bdiRim.userData.noEdges = true;
    g.add(bdiShelf, bdiRim);

    // Blocked sub-fin leakage warning stubs trapped below BDI
    const leakGeo = hiResCyl(0.11, 0.11, 0.42, 8);
    for (const lx of [-1.2, 0, 1.2]) {
      const lk = new THREE.Mesh(leakGeo, mats.bodyRecRed);
      lk.position.set(lx, -0.68, 1.72);
      lk.userData.noEdges = true;
      g.add(lk);
    }

    // 3 suspended GAA Si nanosheets + HKMG gate cleanly elevated above Full BDI
    const gateBox = new THREE.Mesh(
      createChamferedBoxGeo(1.18, 1.38, 2.55, 0.06, 0.03, 'y'),
      mats.goldPlating
    );
    gateBox.position.y = 0.52;
    g.add(gateBox);

    const nsGeo = createChamferedBoxGeo(3.4, 0.16, 2.05, 0.03, 0.015, 'y');
    for (let i = 0; i < 3; i++) {
      const sh = new THREE.Mesh(nsGeo, mats.vcWorkingFluidCyan);
      sh.position.y = 0.06 + i * 0.44;
      sh.userData.noEdges = true;
      g.add(sh);
    }

    // Seated diamond S/D epi crystals resting cleanly on top of BDI (zero bulk leakage path!)
    const epiGeo = extrudeHiRes(createEpiDiamondShape(2.05, 1.24), 0.62, 0.04, 0.04, 1, 8);
    epiGeo.rotateY(Math.PI / 2);
    for (const sx of [-1.52, 1.52]) {
      const ep = new THREE.Mesh(epiGeo, mats.siliconPhotodiode);
      ep.position.set(sx, 0.48, 0);
      g.add(ep);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-full-bdi-subfin-stopper',
        59,
        '#06b6d4',
        g,
        new THREE.Vector3(6.9, 0.8, 20),
        new THREE.Vector3(21, 2.5, 56),
        cp,
        0.22
      )
    );
  }

  // X2-60. Single Diffusion Break (SDB) & Self-Aligned Gate Cut (SAGC) Cell Isolation Trench
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.34,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -1.06;
    g.add(base);

    // Two adjacent active GAA cells (Left Cell A & Right Cell B)
    const cellSheetGeo = createChamferedBoxGeo(1.55, 0.16, 1.1, 0.02, 0.01, 'y');
    for (const cx of [-1.25, 1.25]) {
      for (const cz of [-0.95, 0.95]) {
        for (let i = 0; i < 3; i++) {
          const s = new THREE.Mesh(cellSheetGeo, mats.vcWorkingFluidCyan);
          s.position.set(cx, -0.58 + i * 0.42, cz);
          s.userData.noEdges = true;
          g.add(s);
        }
      }
      // Twin HKMG metal gates running along Z, cleanly severed in the middle by SAGC!
      for (const gz of [-0.95, 0.95]) {
        const gt = new THREE.Mesh(
          createChamferedBoxGeo(0.68, 1.52, 1.38, 0.04, 0.02, 'y'),
          mats.goldPlating
        );
        gt.position.set(cx, -0.1, gz);
        g.add(gt);
      }
    }

    // Razor-thin central Single Diffusion Break (SDB) deep SiN isolation wall slicing X=0 straight down into bulk Si!
    const sdbWall = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 2.28, 3.65, 0.04, 0.02, 'y'),
      mats.bodyRecRed
    );
    sdbWall.position.set(0, 0.04, 0);
    // Orthogonal Self-Aligned Gate Cut (SAGC) dielectric blade cleanly severing the metal gates along Z=0!
    const sagcBlade = new THREE.Mesh(
      createChamferedBoxGeo(4.25, 1.72, 0.28, 0.04, 0.02, 'y'),
      mats.aluminaHighKFilm
    );
    sagcBlade.position.set(0, 0.12, 0);
    g.add(sdbWall, sagcBlade);

    // Top dielectric isolation cap ridges highlighting the clean cross-cut
    const capSdb = new THREE.Mesh(
      createChamferedBoxGeo(0.4, 0.14, 3.7, 0.02, 0.01, 'y'),
      mats.quartzOlpf
    );
    capSdb.position.set(0, 1.2, 0);
    capSdb.userData.noEdges = true;
    g.add(capSdb);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-sdb-sagc-cell-isolation',
        60,
        '#f43f5e',
        g,
        new THREE.Vector3(13.8, 0.8, 20),
        new THREE.Vector3(42, 2.5, 56),
        cp,
        0.22
      )
    );
  }

  // X2-61. Active Backside 300nm Thinned-Si Vertical ESD Protection Diode & CDM Clamp
  {
    const g = new THREE.Group();
    // Heavy Copper Backside Metal (BSM) thermal heatsink & surge drain plate
    const bsmSink = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.54,
      mats.copperHybridBond,
      0.05,
      2,
      10
    );
    bsmSink.position.y = -0.96;
    // p+ Active Backside epitaxial collector layer + ultra-thin 300nm Si body
    const pPlusEpi = new THREE.Mesh(
      createChamferedBoxGeo(4.3, 0.24, 3.65, 0.05, 0.02, 'y'),
      mats.cinnabarAnodized
    );
    pPlusEpi.position.y = -0.52;
    const thinSi = new THREE.Mesh(
      createChamferedBoxGeo(4.3, 0.34, 3.65, 0.05, 0.02, 'y'),
      mats.siliconBulk
    );
    thinSi.position.y = -0.22;
    g.add(bsmSink, pPlusEpi, thinSi);

    // 3x3 Vertical N+/P+ ESD Surge Diode Pillars discharging straight down into BSM!
    const diodeGeo = hiResCyl(0.28, 0.28, 0.88, 10);
    const anodeGeo = hiResCyl(0.32, 0.32, 0.16, 10);
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const pil = new THREE.Mesh(diodeGeo, mats.vcWorkingFluidCyan);
        pil.position.set(ix * 1.18, 0.22, iz * 1.02);
        pil.userData.noEdges = true;
        const cap = new THREE.Mesh(anodeGeo, mats.goldPlating);
        cap.position.set(ix * 1.18, 0.7, iz * 1.02);
        cap.userData.noEdges = true;
        g.add(pil, cap);
      }
    }

    // Top ESD / CDM dual-bus surge clamp rails (VDD_ESD & VSS_ESD)
    const railGeo = createChamferedBoxGeo(3.9, 0.22, 0.36, 0.04, 0.02, 'y');
    for (const [rz, rmat] of [
      [-1.02, mats.bodyRecRed],
      [0, mats.goldPlating],
      [1.02, mats.fluorineCoatCyan],
    ] as const) {
      const r = new THREE.Mesh(railGeo, rmat);
      r.position.set(0, 0.92, rz);
      g.add(r);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-gaa-active-backside-esd',
        61,
        '#ef4444',
        g,
        new THREE.Vector3(10.5, -16, -20),
        new THREE.Vector3(32, -58, -56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // TIER B — MOL / BEOL / WAFER THINNING, DIE SEAL RING, DTI & M3D SRAM (X2-62 – X2-67)
  // =========================================================================

  // X2-62. ALD MoN->Mo Linerless Barrier-Free Molybdenum Super-Via & M0 (IEDM 2025 / VLSI 2026)
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.34,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -1.04;
    // Translucent ULK dielectric cutaway slab exposing zero-liner vertical Mo super-vias
    const ulkCut = new THREE.Mesh(
      createChamferedBoxGeo(4.35, 1.48, 2.2, 0.06, 0.03, 'y'),
      mats.quartzOlpf
    );
    ulkCut.position.set(0, -0.1, -0.78);
    g.add(base, ulkCut);

    // 4 Bottom-up ALD Pure Molybdenum (Mo) barrierless columnar vias + thin atomic MoN conversion seed rings!
    const moColGeo = hiResCyl(0.26, 0.22, 1.62, 12);
    const monRingGeo = hiResTorus(0.28, 0.055, 7, 14);
    for (let i = 0; i < 4; i++) {
      const vx = -1.44 + i * 0.96;
      for (const vz of [-0.4, 0.92]) {
        const col = new THREE.Mesh(moColGeo, u.cfeMolyWordlineMetal);
        col.position.set(vx, -0.02, vz);
        col.userData.noEdges = true;
        const seed = new THREE.Mesh(monRingGeo, mats.goldPlating);
        seed.rotation.x = Math.PI / 2;
        seed.position.set(vx, -0.72, vz);
        seed.userData.noEdges = true;
        g.add(col, seed);
      }
    }

    // Top M0/M1 pure linerless Molybdenum horizontal tracks landing cleanly atop the vias
    const trackGeo = createChamferedBoxGeo(4.15, 0.24, 0.44, 0.04, 0.02, 'y');
    for (const tz of [-0.4, 0.92]) {
      const tr = new THREE.Mesh(trackGeo, mats.sinteredSilver);
      tr.position.set(0, 0.92, tz);
      g.add(tr);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-ald-mon-linerless-mo-via',
        62,
        '#94a3b8',
        g,
        new THREE.Vector3(-6.9, 7.6, -20),
        new THREE.Vector3(-21, 25, -56),
        cp,
        0.22
      )
    );
  }

  // X2-63. Self-Aligned Contact (SAC) SiN Gate Helmet Cap & Air-Gap V0 Via
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.34,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -1.04;
    g.add(base);

    // 3 Parallel Metal Gates (MG), each topped with a chamfered high-selectivity SiN SAC protective helmet cap!
    const mgGeo = createChamferedBoxGeo(0.58, 1.05, 3.4, 0.04, 0.02, 'y');
    const sacCapGeo = createChamferedBoxGeo(0.76, 0.48, 3.46, 0.08, 0.04, 'y');
    for (const gx of [-1.42, 0, 1.42]) {
      const mg = new THREE.Mesh(mgGeo, mats.goldPlating);
      mg.position.set(gx, -0.34, 0);
      const helmet = new THREE.Mesh(sacCapGeo, mats.aluminaHighKFilm);
      helmet.position.set(gx, 0.44, 0);
      g.add(mg, helmet);
    }

    // Self-Aligned Co/W Trench Contacts (CA/MD) slotting cleanly between helmets with zero gate-short!
    const caGeo = createChamferedBoxGeo(0.46, 1.56, 3.0, 0.04, 0.02, 'y');
    const v0Geo = hiResCyl(0.18, 0.18, 0.56, 10);
    for (const cx of [-0.71, 0.71]) {
      const ca = new THREE.Mesh(caGeo, mats.sinteredSilver);
      ca.position.set(cx, -0.06, 0);
      g.add(ca);
      for (const vz of [-0.95, 0, 0.95]) {
        const v0 = new THREE.Mesh(v0Geo, mats.copperHybridBond);
        v0.position.set(cx, 0.88, vz);
        v0.userData.noEdges = true;
        g.add(v0);
      }
    }

    // Upper M0 signal bridge landing across V0 vias
    const m0Geo = createChamferedBoxGeo(2.8, 0.16, 0.34, 0.03, 0.015, 'y');
    for (const vz of [-0.95, 0.95]) {
      const m0 = new THREE.Mesh(m0Geo, mats.vcWorkingFluidCyan);
      m0.position.set(0, 1.16, vz);
      m0.userData.noEdges = true;
      g.add(m0);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-self-aligned-sac-v0-cap',
        63,
        '#a855f7',
        g,
        new THREE.Vector3(6.9, 7.6, -20),
        new THREE.Vector3(21, 25, -56),
        cp,
        0.22
      )
    );
  }

  // X2-64. BSPDN Epitaxial SiGe Wafer-Thinning Etch-Stop (TTV < 40nm) & Backside IR Alignment Vernier
  {
    const g = new THREE.Group();
    // Bottom SiCN Carrier Fusion-Bond Wafer Layer
    const carrier = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.42,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    carrier.position.y = -0.98;
    // Ultra-thin 300nm Active Silicon Layer (thinned 2,500x from 775um!)
    const activeSi = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.24, 3.76, 0.05, 0.02, 'y'),
      mats.siliconPhotodiode
    );
    activeSi.position.y = -0.58;
    // Epitaxial SiGe Wet-Etch-Stop Plane (TTV < 40nm soft-landing horizon!)
    const sigeStop = new THREE.Mesh(
      createChamferedBoxGeo(4.46, 0.22, 3.82, 0.04, 0.02, 'y'),
      mats.mofEmerald
    );
    sigeStop.position.y = -0.28;
    // Backside SiO2/SiN passivation window with etched through-Si Infrared (IR) Alignment Verniers!
    const bsPassiv = new THREE.Mesh(
      createChamferedBoxGeo(4.36, 0.26, 3.72, 0.05, 0.02, 'y'),
      mats.quartzOlpf
    );
    bsPassiv.position.y = 0.04;
    g.add(carrier, activeSi, sigeStop, bsPassiv);

    // Golden Through-Si IR Alignment Vernier Crosshairs & Stepped Calibration Grating on top
    const barX = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 0.14, 0.24, 0.02, 0.01, 'y'),
      mats.goldPlating
    );
    barX.position.set(0, 0.28, 0);
    const barZ = new THREE.Mesh(
      createChamferedBoxGeo(0.24, 0.14, 2.4, 0.02, 0.01, 'y'),
      mats.goldPlating
    );
    barZ.position.set(0, 0.28, 0);
    const irRing = new THREE.Mesh(hiResTorus(0.96, 0.07, 7, 20), mats.bodyRecRed);
    irRing.rotation.x = Math.PI / 2;
    irRing.position.set(0, 0.42, 0);
    irRing.userData.noEdges = true;
    g.add(barX, barZ, irRing);

    // 4 Corner Backside nTSV Alignment Test Pillars
    const tsvGeo = hiResCyl(0.16, 0.16, 0.72, 8);
    for (const [tx, tz] of [
      [-1.55, -1.25],
      [1.55, -1.25],
      [-1.55, 1.25],
      [1.55, 1.25],
    ]) {
      const tsv = new THREE.Mesh(tsvGeo, mats.copperHybridBond);
      tsv.position.set(tx, 0.56, tz);
      tsv.userData.noEdges = true;
      g.add(tsv);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-bspdn-sige-etch-stop-thinning',
        64,
        '#10b981',
        g,
        new THREE.Vector3(-10.5, -16, -20),
        new THREE.Vector3(-32, -58, -56),
        cp,
        0.22
      )
    );
  }

  // X2-65. Die-Perimeter Multi-Tier Cu/Al Crack-Stop & Moisture Oxidation Barrier (MOB) Seal Ring
  {
    const g = new THREE.Group();
    // Base silicon die corner + scribe-street saw kerf step on the outer edge
    const dieBase = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.26),
      0.42,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    dieBase.position.y = -0.96;
    g.add(dieBase);

    // Outer deep Si-anchored Crack-Stop (CS) L-shaped titanium/steel stress-deflection wall
    const csOuter = makeHiResHorizPlate(createCornerLShape(4.2, 0.48), 1.64, mats.stainlessMachined, 0.03, 1, 8);
    csOuter.position.y = 0.08;
    // Inner 6-tier continuous stacked Cu via-bar Moisture Oxidation Barrier (MOB) fortress wall!
    for (let t = 0; t < 6; t++) {
      const mobTier = makeHiResHorizPlate(
        createCornerLShape(3.15, 0.44),
        0.18,
        t % 2 === 0 ? mats.copperHybridBond : mats.goldPlating,
        0.02,
        1,
        8
      );
      mobTier.position.set(0.38, -0.62 + t * 0.29, 0.34);
      if (t % 2 === 1) mobTier.userData.noEdges = true;
      g.add(mobTier);
    }

    // Protected inner fragile ULK active routing block nestled safely behind the MOB corner
    const ulkSafe = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 1.38, 1.55, 0.06, 0.02, 'y'),
      mats.quartzOlpf
    );
    ulkSafe.position.set(1.02, 0.02, 0.88);
    const activeChip = new THREE.Mesh(
      createChamferedBoxGeo(1.38, 0.26, 1.2, 0.04, 0.02, 'y'),
      mats.vcWorkingFluidCyan
    );
    activeChip.position.set(1.02, 0.84, 0.88);
    g.add(csOuter, ulkSafe, activeChip);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-die-crackstop-mob-seal-ring',
        65,
        '#d97706',
        g,
        new THREE.Vector3(-13.8, 8.2, -20),
        new THREE.Vector3(-42, 28, -56),
        cp,
        0.22
      )
    );
  }

  // X2-66. Mixed-Signal Deep Trench Isolation (DTI) & Triple-Well Substrate Noise Guard Ring
  {
    const g = new THREE.Group();
    const pSub = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.44,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    pSub.position.y = -0.96;
    g.add(pSub);

    // Outer Deep Trench Isolation (DTI) Oxide Moat Frame blocking digital switching noise!
    const dtiOuter = makeHiResHorizPlate(
      createFrameShape(4.2, 3.6, 0.34, 3.45, 2.85, 0.24),
      1.32,
      mats.quartzOlpf,
      0.04,
      1,
      12
    );
    dtiOuter.position.y = -0.08;
    // Inner Golden Double Guard Ring (p+ & n+ low-impedance substrate tap ring)
    const guardRing = makeHiResHorizPlate(
      createFrameShape(3.25, 2.68, 0.26, 2.52, 1.95, 0.18),
      0.86,
      mats.goldPlating,
      0.03,
      1,
      12
    );
    guardRing.position.y = -0.24;
    // Buried Deep N-Well (DNW) Faraday tub + quiet precision differential analog pair inside
    const dnwFloor = new THREE.Mesh(
      createChamferedBoxGeo(2.38, 0.26, 1.82, 0.04, 0.02, 'y'),
      mats.ispSiliconDie
    );
    dnwFloor.position.y = -0.52;
    g.add(dtiOuter, guardRing, dnwFloor);

    const diffGeo = createChamferedBoxGeo(0.68, 0.88, 1.24, 0.05, 0.02, 'y');
    for (const dx of [-0.52, 0.52]) {
      const m = new THREE.Mesh(diffGeo, mats.vcWorkingFluidCyan);
      m.position.set(dx, 0.06, 0);
      g.add(m);
    }
    // Perimeter Faraday ground vias around guard ring
    const viaGeo = hiResCyl(0.11, 0.11, 0.72, 8);
    for (const [vx, vz] of [
      [-1.42, -1.16],
      [0, -1.16],
      [1.42, -1.16],
      [-1.42, 1.16],
      [0, 1.16],
      [1.42, 1.16],
    ]) {
      const v = new THREE.Mesh(viaGeo, mats.copperHybridBond);
      v.position.set(vx, 0.54, vz);
      v.userData.noEdges = true;
      g.add(v);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-dti-mixed-signal-guard-ring',
        66,
        '#0d9488',
        g,
        new THREE.Vector3(13.8, 8.2, -20),
        new THREE.Vector3(42, 28, -56),
        cp,
        0.22
      )
    );
  }

  // X2-67. Monolithic-3D Hybrid Si-Nanosheet Latch + BEOL Double-Gate IGO Pass-Gate 6T SRAM (Aug 2026)
  {
    const g = new THREE.Group();
    // Bottom FEOL deck: 2nm Si-Nanosheet Cross-Coupled Inverter Latch on Buried Power Rails (BPR)
    const bprDeck = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.34,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    bprDeck.position.y = -1.06;
    const bprRail = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.18, 0.36, 0.02, 0.01, 'y'),
      mats.copperHybridBond
    );
    bprRail.position.set(0, -0.82, 0);
    bprRail.userData.noEdges = true;
    g.add(bprDeck, bprRail);

    // FEOL Si-nanosheet pull-down & pull-up latch transistors
    const latchGeo = createChamferedBoxGeo(1.45, 0.44, 0.88, 0.04, 0.02, 'y');
    for (const [lx, lz, lmat] of [
      [-1.08, -0.85, mats.vcWorkingFluidCyan],
      [1.08, -0.85, mats.bodyRecRed],
      [-1.08, 0.85, mats.bodyRecRed],
      [1.08, 0.85, mats.vcWorkingFluidCyan],
    ] as const) {
      const tr = new THREE.Mesh(latchGeo, lmat);
      tr.position.set(lx, -0.48, lz);
      g.add(tr);
    }

    // Translucent M3D interlayer isolation + vertical Ruthenium M3D storage-node vias rising to upper BEOL!
    const m3dIld = new THREE.Mesh(
      createChamferedBoxGeo(4.3, 0.16, 3.65, 0.03, 0.01, 'y'),
      mats.quartzOlpf
    );
    m3dIld.position.y = 0.08;
    g.add(m3dIld);

    const viaGeo = hiResCyl(0.14, 0.14, 1.08, 8);
    for (const [vx, vz] of [
      [-1.2, -0.85],
      [1.2, -0.85],
      [-1.2, 0.85],
      [1.2, 0.85],
    ]) {
      const v = new THREE.Mesh(viaGeo, mats.sinteredSilver);
      v.position.set(vx, 0.16, vz);
      v.userData.noEdges = true;
      g.add(v);
    }

    // Upper BEOL Tier: Twin Double-Gate Ga-doped In2O3 (IGO) Pass-Gate Transistors + tri-layer HZH wrap!
    const igoChanGeo = createChamferedBoxGeo(3.65, 0.24, 0.68, 0.04, 0.02, 'y');
    const hzhWrapGeo = createChamferedBoxGeo(1.05, 0.56, 0.92, 0.05, 0.02, 'y');
    for (const pz of [-0.85, 0.85]) {
      const igo = new THREE.Mesh(igoChanGeo, mats.mofEmerald);
      igo.position.set(0, 0.72, pz);
      const hzh = new THREE.Mesh(hzhWrapGeo, mats.goldPlating);
      hzh.position.set(0, 0.74, pz);
      g.add(igo, hzh);
    }
    // Shared neighbor-cell bitline bar across top
    const blBar = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 0.16, 3.4, 0.02, 0.01, 'y'),
      mats.copperHybridBond
    );
    blBar.position.set(1.58, 1.06, 0);
    blBar.userData.noEdges = true;
    g.add(blBar);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-m3d-si-igo-hybrid-sram',
        67,
        '#14b8a6',
        g,
        new THREE.Vector3(-20, -6.4, 10.5),
        new THREE.Vector3(-56, -24, 30),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // TIER C — ISSCC 2026 CLOCKING, DROOP FLL, PRECISION BGR, SRAM/OTP & 3D-IC DFT (X2-68 – X2-73)
  // =========================================================================

  // X2-68. ISSCC 2026 71.5fs Sub-100fs Fractional-N All-Digital PLL (ADPLL) & Dual-Ramp DTC
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.36,
      mats.ispSiliconDie,
      0.04,
      2,
      10
    );
    base.position.y = -0.88;
    g.add(base);

    // Symmetrical 3-turn Octagonal Copper Spiral LC-DCO Tank Inductor on left/center
    for (let t = 0; t < 3; t++) {
      const r = 1.28 - t * 0.3;
      const coil = new THREE.Mesh(hiResTorus(r, 0.09, 8, 8), mats.copperHybridBond);
      coil.rotation.x = Math.PI / 2;
      coil.rotation.z = Math.PI / 8;
      coil.position.set(-0.72, -0.36 + t * 0.18, 0);
      coil.userData.noEdges = true;
      g.add(coil);
    }
    // Center magnetic flux core & switched MIM varactor comb
    const core = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.72, 12), mats.goldPlating);
    core.position.set(-0.72, -0.22, 0);
    g.add(core);

    // Right: Supply-Resilient Time-Amplifying Dual-Ramp Digital-to-Time Converter (DTC) staircase
    for (let s = 0; s < 5; s++) {
      const h = 0.24 + s * 0.18;
      const step = new THREE.Mesh(
        createChamferedBoxGeo(0.24, h, 2.8, 0.03, 0.015, 'y'),
        s % 2 === 0 ? mats.vcWorkingFluidCyan : mats.goldPlating
      );
      step.position.set(0.66 + s * 0.34, -0.68 + h * 0.5, 0);
      step.userData.noEdges = true;
      g.add(step);
    }
    const loopFilter = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 0.24, 0.62, 0.04, 0.02, 'y'),
      mats.aluminaHighKFilm
    );
    loopFilter.position.set(1.26, 0.56, 0);
    g.add(loopFilter);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-sub100fs-adpll-dtcloop',
        68,
        '#eab308',
        g,
        new THREE.Vector3(-13.8, -6.4, -20),
        new THREE.Vector3(-42, -24, -56),
        cp,
        0.22
      )
    );
  }

  // X2-69. ISSCC 2026 Nanosecond di/dt Dynamic Voltage Droop Detector & Adaptive Clock FLL
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.36,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -0.88;
    g.add(base);

    // Circular Critical-Path Inverter Delay-Chain Droop Sensor Ring (12 discrete delay taps!)
    const ringTrack = new THREE.Mesh(hiResTorus(1.18, 0.09, 8, 24), mats.copperHybridBond);
    ringTrack.rotation.x = Math.PI / 2;
    ringTrack.position.set(-0.66, -0.44, 0);
    ringTrack.userData.noEdges = true;
    g.add(ringTrack);

    const tapGeo = createChamferedBoxGeo(0.24, 0.42, 0.24, 0.03, 0.01, 'y');
    for (let k = 0; k < 10; k++) {
      const ang = (k / 10) * Math.PI * 2;
      const tap = new THREE.Mesh(tapGeo, k < 3 ? mats.bodyRecRed : mats.vcWorkingFluidCyan);
      tap.position.set(-0.66 + Math.cos(ang) * 1.18, -0.26, Math.sin(ang) * 1.18);
      tap.userData.noEdges = true;
      g.add(tap);
    }

    // Right: Reflexive Adaptive Clock Stretcher / Glitchless Multi-Phase FLL Mux Bank
    const fllDeck = new THREE.Mesh(
      createChamferedBoxGeo(1.55, 0.62, 3.15, 0.06, 0.02, 'y'),
      mats.ispSiliconDie
    );
    fllDeck.position.set(1.26, -0.34, 0);
    g.add(fllDeck);

    // Stretched clock-period indicator bars (visualizing instant period expansion during voltage droop)
    const widths = [0.24, 0.24, 0.42, 0.56, 0.36];
    for (let i = 0; i < widths.length; i++) {
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(1.18, 0.44, widths[i], 0.03, 0.01, 'y'),
        i === 3 ? mats.bodyRecRed : mats.goldPlating
      );
      bar.position.set(1.26, 0.22, -1.12 + i * 0.56);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-droop-adaptive-clock-fll',
        69,
        '#f59e0b',
        g,
        new THREE.Vector3(-6.9, -6.4, -20),
        new THREE.Vector3(-21, -24, -56),
        cp,
        0.22
      )
    );
  }

  // X2-70. ISSCC 2026 Paper 10.3 2nm Clock-Edge Architecture & Low-Power Multi-Bit Pulse Latch
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.36,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -0.88;
    g.add(base);

    // Central Twin-Edge Pulse Generator Spine
    const spine = new THREE.Mesh(
      createChamferedBoxGeo(0.68, 0.84, 3.35, 0.06, 0.03, 'y'),
      mats.goldPlating
    );
    spine.position.set(0, -0.22, 0);
    g.add(spine);

    // 4 Symmetric Quad-Bit Compact Pulse-Latch Banks connected via ultra-short low-C local stubs
    const bankGeo = createChamferedBoxGeo(1.42, 0.64, 1.24, 0.05, 0.02, 'y');
    const stubGeo = createChamferedBoxGeo(0.75, 0.16, 0.2, 0.02, 0.01, 'y');
    for (const [bx, bz] of [
      [-1.34, -0.88],
      [1.34, -0.88],
      [-1.34, 0.88],
      [1.34, 0.88],
    ]) {
      const bank = new THREE.Mesh(bankGeo, mats.ispSiliconDie);
      bank.position.set(bx, -0.34, bz);
      const stub = new THREE.Mesh(stubGeo, mats.vcWorkingFluidCyan);
      stub.position.set(bx * 0.44, 0.14, bz);
      stub.userData.noEdges = true;
      g.add(bank, stub);
      // 4 micro latch bit-cells crowning each quad-bit bank
      for (let b = 0; b < 4; b++) {
        const bit = new THREE.Mesh(
          createChamferedBoxGeo(0.24, 0.22, 0.46, 0.02, 0.01, 'y'),
          b % 2 === 0 ? mats.vcWorkingFluidCyan : mats.mofEmerald
        );
        bit.position.set(bx - 0.42 + b * 0.28, 0.12, bz);
        bit.userData.noEdges = true;
        g.add(bit);
      }
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-2nm-clock-edge-lowpower',
        70,
        '#38bdf8',
        g,
        new THREE.Vector3(6.9, -6.4, -20),
        new THREE.Vector3(21, -24, -56),
        cp,
        0.22
      )
    );
  }

  // X2-71. ISSCC 2026 2.1ppm/C Curvature-Compensated CMOS Bandgap Voltage Reference (Super-PTAT BGR)
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.36,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -0.88;
    g.add(base);

    // Common-Centroid 3x3 Matched PNP Bipolar Core Array (canceling die thermal/stress gradients!)
    const bjtGeo = createChamferedBoxGeo(0.56, 0.56, 0.56, 0.04, 0.02, 'y');
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const isCenter = ix === 0 && iz === 0;
        const bjt = new THREE.Mesh(bjtGeo, isCenter ? mats.goldPlating : mats.cinnabarAnodized);
        bjt.position.set(-0.88 + ix * 0.72, -0.34, iz * 0.78);
        g.add(bjt);
      }
    }

    // Right: Laser/eFuse-Trimmed Precision Serpentine Resistor Ladder & Ping-Pong Super-PTAT Cap Plates
    const resGeo = createChamferedBoxGeo(1.18, 0.16, 0.22, 0.02, 0.01, 'y');
    for (let r = 0; r < 6; r++) {
      const strip = new THREE.Mesh(resGeo, mats.sinteredSilver);
      strip.position.set(1.24, -0.44, -1.25 + r * 0.5);
      strip.userData.noEdges = true;
      g.add(strip);
    }
    // Twin Ping-Pong Switched-Capacitor Curvature Compensator Plates floating above resistor ladder
    const capGeo = createChamferedBoxGeo(1.22, 0.24, 1.18, 0.04, 0.02, 'y');
    for (const cz of [-0.72, 0.72]) {
      const cap = new THREE.Mesh(capGeo, mats.aluminaHighKFilm);
      cap.position.set(1.24, 0.18, cz);
      g.add(cap);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-curvature-comp-bgr-ref',
        71,
        '#f43f5e',
        g,
        new THREE.Vector3(13.8, -6.4, -20),
        new THREE.Vector3(42, -24, -56),
        cp,
        0.22
      )
    );
  }

  // X2-72. ISSCC 2026 Paper 15.2 350mV Single-Rail 2nm SRAM NBL Assist & Anti-Fuse OTP Redundancy
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.36,
      u.v2BionzSramArray,
      0.04,
      2,
      10
    );
    base.position.y = -0.88;
    g.add(base);

    // Left: Negative-Bitline (NBL) Boost Coupling Fin Capacitor Bank & Differential Sense-Amp Bar
    const finGeo = createChamferedBoxGeo(0.16, 0.92, 2.8, 0.02, 0.01, 'y');
    for (let f = 0; f < 6; f++) {
      const fin = new THREE.Mesh(finGeo, f % 2 === 0 ? mats.copperHybridBond : mats.vcWorkingFluidCyan);
      fin.position.set(-1.76 + f * 0.32, -0.18, 0);
      fin.userData.noEdges = true;
      g.add(fin);
    }
    const saBar = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 0.28, 0.56, 0.04, 0.02, 'y'),
      mats.goldPlating
    );
    saBar.position.set(-0.96, 0.48, 0);
    g.add(saBar);

    // Right: 4x4 Gate-Oxide Breakdown Anti-Fuse OTP Cell Matrix (burned conductive filaments vs intact oxide!)
    const otpBase = new THREE.Mesh(
      createChamferedBoxGeo(1.92, 0.32, 3.1, 0.05, 0.02, 'y'),
      mats.siliconBulk
    );
    otpBase.position.set(1.16, -0.5, 0);
    g.add(otpBase);

    const cellGeo = hiResCyl(0.16, 0.16, 0.56, 8);
    const blownMask = [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const blown = blownMask[r * 4 + c] === 1;
        const cell = new THREE.Mesh(cellGeo, blown ? mats.goldPlating : mats.quartzOlpf);
        cell.position.set(0.5 + c * 0.44, -0.02, -1.05 + r * 0.7);
        cell.userData.noEdges = true;
        g.add(cell);
      }
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-350mv-sram-assist-otp',
        72,
        '#3b82f6',
        g,
        new THREE.Vector3(0, -6.4, -20),
        new THREE.Vector3(0, -24, -58),
        cp,
        0.22
      )
    );
  }

  // X2-73. IEEE 1838 3D-IC DFT Die Wrapper Register (DWR) / FPP & Silicon Lifecycle Telemetry (SLM)
  {
    const g = new THREE.Group();
    // Bottom PTAP Base Die Deck + Upper STAP Shadowed Die Deck
    const ptapDeck = makeHiResHorizPlate(
      createRoundedRectShape(4.5, 3.8, 0.32),
      0.34,
      mats.ispSiliconDie,
      0.04,
      2,
      10
    );
    ptapDeck.position.y = -0.94;
    const stapDeck = makeHiResHorizPlate(
      createRoundedRectShape(3.6, 3.0, 0.26),
      0.3,
      mats.npuSiliconDie,
      0.04,
      2,
      10
    );
    stapDeck.position.y = 0.62;
    g.add(ptapDeck, stapDeck);

    // Perimeter Die Wrapper Register (DWR) golden boundary-scan collar
    const dwrCollar = makeHiResHorizPlate(
      createFrameShape(4.15, 3.45, 0.28, 3.55, 2.85, 0.2),
      0.22,
      mats.goldPlating,
      0.03,
      1,
      12
    );
    dwrCollar.position.y = -0.58;
    g.add(dwrCollar);

    // Vertical 3D-IC Flexible Parallel Port (FPP) Streaming Scan TSV Elevator Spine!
    const tsvGeo = hiResCyl(0.14, 0.14, 1.48, 8);
    for (let ix = -2; ix <= 2; ix++) {
      for (const iz of [-0.68, 0.68]) {
        const tsv = new THREE.Mesh(tsvGeo, ix === 0 ? mats.bodyRecRed : mats.vcWorkingFluidCyan);
        tsv.position.set(ix * 0.64, -0.14, iz);
        tsv.userData.noEdges = true;
        g.add(tsv);
      }
    }

    // Top SLM (Silicon Lifecycle Management) In-Field Path-Delay Telemetry Agents
    const slmGeo = createChamferedBoxGeo(0.76, 0.28, 0.76, 0.04, 0.02, 'y');
    for (const [sx, sz] of [
      [-1.0, -0.78],
      [1.0, -0.78],
      [-1.0, 0.78],
      [1.0, 0.78],
    ]) {
      const agent = new THREE.Mesh(slmGeo, mats.mofEmerald);
      agent.position.set(sx, 0.94, sz);
      g.add(agent);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-ieee1838-3dic-dft-slm',
        73,
        '#10b981',
        g,
        new THREE.Vector3(0, 14.8, -20),
        new THREE.Vector3(0, 56, -58),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // TIER D — ECTC 2026 SUB-500nm BONDING, EMIB-T, eSTC, CUF & GRAND CROWNS (X2-74 – X2-79)
  // =========================================================================

  // X2-74. ECTC 2026 200-450nm Pitch Cu/SiCN Hybrid Bonding & Void-Free Bonding-Front Wave
  {
    const g = new THREE.Group();
    // Bottom & Top opposing SiCN plasma-activated hydrophilic dielectric layers
    const botSiCn = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.42,
      mats.quartzOlpf,
      0.04,
      2,
      10
    );
    botSiCn.position.y = -0.84;
    const topSiCn = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.34,
      mats.quartzOlpf,
      0.04,
      2,
      10
    );
    topSiCn.position.y = 0.62;
    g.add(botSiCn, topSiCn);

    // 4x3 Ultra-fine-pitch (200-450nm) Fine-Grain Cu Hybrid-Bond Pillars bridging sub-nm CMP dishing gap!
    const padGeo = hiResCyl(0.24, 0.24, 1.06, 10);
    const grainRingGeo = hiResTorus(0.26, 0.045, 6, 12);
    for (let ix = -1.5; ix <= 1.5; ix += 1) {
      for (let iz = -1; iz <= 1; iz += 1) {
        const pad = new THREE.Mesh(padGeo, mats.copperHybridBond);
        pad.position.set(ix * 1.02, -0.1, iz * 1.06);
        pad.userData.noEdges = true;
        const seam = new THREE.Mesh(grainRingGeo, mats.goldPlating);
        seam.rotation.x = Math.PI / 2;
        seam.position.set(ix * 1.02, -0.1, iz * 1.06);
        seam.userData.noEdges = true;
        g.add(pad, seam);
      }
    }

    // Concentric Void-Free Center-to-Edge Bonding-Front Wave Rings crowning the top die (ASE ECTC 2026!)
    for (let w = 0; w < 3; w++) {
      const wave = new THREE.Mesh(hiResTorus(0.54 + w * 0.52, 0.055, 7, 22), mats.vcWorkingFluidCyan);
      wave.rotation.x = Math.PI / 2;
      wave.position.set(0, 0.94 + (2 - w) * 0.08, 0);
      wave.userData.noEdges = true;
      g.add(wave);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-sub500nm-sicn-hybrid-bond',
        74,
        '#d97736',
        g,
        new THREE.Vector3(-13.8, 15.8, -20),
        new THREE.Vector3(-42, 60, -56),
        cp,
        0.22
      )
    );
  }

  // X2-75. EMIB-T / LSI-TSV Power-Through Active Silicon Bridge Interconnect
  {
    const g = new THREE.Group();
    // Recessed Package Organic/Glass Cavity Base
    const pkgBase = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.44,
      u.bionzAbfSubstrate,
      0.04,
      2,
      10
    );
    pkgBase.position.y = -0.94;
    // Embedded Silicon Bridge Inlay with vertical Power TSVs passing straight through!
    const bridgeDie = new THREE.Mesh(
      createChamferedBoxGeo(2.85, 0.56, 3.25, 0.06, 0.02, 'y'),
      mats.ispSiliconDie
    );
    bridgeDie.position.y = -0.34;
    g.add(pkgBase, bridgeDie);

    // Vertical Golden Power-TSV Columns piercing right through the silicon bridge (EMIB-T breakthrough!)
    const tsvGeo = hiResCyl(0.16, 0.16, 1.38, 10);
    for (const tx of [-0.72, 0, 0.72]) {
      for (const tz of [-0.96, 0, 0.96]) {
        const tsv = new THREE.Mesh(tsvGeo, mats.goldPlating);
        tsv.position.set(tx, -0.28, tz);
        tsv.userData.noEdges = true;
        g.add(tsv);
      }
    }

    // Twin Flanking Chiplets bridged horizontally by ultra-fine 0.8/0.8um RDL copper traces
    const chipletGeo = createChamferedBoxGeo(1.42, 0.44, 3.2, 0.06, 0.02, 'y');
    for (const [cx, cmat] of [
      [-1.42, mats.siliconLogicLayer],
      [1.42, mats.npuSiliconDie],
    ] as const) {
      const ch = new THREE.Mesh(chipletGeo, cmat);
      ch.position.set(cx, 0.64, 0);
      g.add(ch);
    }
    const rdlGeo = createChamferedBoxGeo(2.6, 0.12, 0.16, 0.02, 0.01, 'y');
    for (let r = -3; r <= 3; r++) {
      const trace = new THREE.Mesh(rdlGeo, mats.copperHybridBond);
      trace.position.set(0, 0.14, r * 0.42);
      trace.userData.noEdges = true;
      g.add(trace);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-emib-t-silicon-bridge-tsv',
        75,
        '#0284c7',
        g,
        new THREE.Vector3(-6.9, 14.8, -20),
        new THREE.Vector3(-21, 56, -56),
        cp,
        0.22
      )
    );
  }

  // X2-76. Embedded Deep-Trench Silicon Capacitor (eSTC) & Coaxial-Shielded Glass-Core TGV
  {
    const g = new THREE.Group();
    // Transparent Glass-Core Substrate Slab with central eSTC cavity
    const glassCore = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.92,
      mats.quartzOlpf,
      0.05,
      2,
      10
    );
    glassCore.position.y = -0.32;
    g.add(glassCore);

    // Central Embedded Black-Silicon Deep-Trench Capacitor (eSTC, >1.5 uF/mm^2, <10 pH ESL!)
    const estcBody = new THREE.Mesh(
      createChamferedBoxGeo(1.92, 1.08, 2.55, 0.06, 0.02, 'y'),
      mats.siliconBulk
    );
    estcBody.position.y = -0.22;
    g.add(estcBody);

    // High-aspect-ratio MIM deep-trench fins crowning eSTC
    const trenchGeo = createChamferedBoxGeo(0.14, 0.48, 2.25, 0.02, 0.01, 'y');
    for (let t = -3; t <= 3; t++) {
      const tr = new THREE.Mesh(trenchGeo, t % 2 === 0 ? mats.aluminaHighKFilm : mats.goldPlating);
      tr.position.set(t * 0.24, 0.56, 0);
      tr.userData.noEdges = true;
      g.add(tr);
    }

    // Left & Right Coaxial-Shielded 5-Via Glass TGV Clusters (1 Center Signal TGV + 4 Ground Shield TGVs!)
    const sigGeo = hiResCyl(0.14, 0.14, 1.56, 10);
    const gndGeo = hiResCyl(0.1, 0.1, 1.48, 8);
    for (const cx of [-1.62, 1.62]) {
      for (const cz of [-0.9, 0.9]) {
        const sig = new THREE.Mesh(sigGeo, mats.goldPlating);
        sig.position.set(cx, -0.18, cz);
        sig.userData.noEdges = true;
        g.add(sig);
        for (let k = 0; k < 4; k++) {
          const ang = (k / 4) * Math.PI * 2 + Math.PI / 4;
          const gnd = new THREE.Mesh(gndGeo, mats.copperHybridBond);
          gnd.position.set(cx + Math.cos(ang) * 0.36, -0.2, cz + Math.sin(ang) * 0.36);
          gnd.userData.noEdges = true;
          g.add(gnd);
        }
      }
    }

    // Mount X2-76 glass base flush against X2-04 underside with deep-trench eSTC capacitor fins facing DOWN,
    // recessed strictly ABOVE the perimeter BGA solder-ball stand-off plane (real motherboard PCB clearance)!
    const landSideWrap = new THREE.Group();
    landSideWrap.rotation.z = Math.PI;
    landSideWrap.scale.set(1, 0.62, 1);
    while (g.children.length > 0) {
      landSideWrap.add(g.children[0]);
    }
    g.add(landSideWrap);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-embedded-stc-package-decap',
        76,
        '#38bdf8',
        g,
        new THREE.Vector3(6.9, 13.8, -20),
        new THREE.Vector3(21, 52, -56),
        cp,
        0.22
      )
    );
  }

  // X2-77. Cu-Pillar Micro-Bump (Cu/Ni/SnAg IMC) & Nano-Silica Capillary Underfill (CUF)
  {
    const g = new THREE.Group();
    const subPad = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.36,
      u.bionzAbfSubstrate,
      0.04,
      2,
      10
    );
    subPad.position.y = -0.96;
    const topDie = makeHiResHorizPlate(
      createRoundedRectShape(4.4, 3.8, 0.3),
      0.28,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    topDie.position.y = 0.88;
    // Translucent Nano-Silica Capillary Underfill (CUF) cutaway fillet protecting rear half of bumps!
    const cufResin = new THREE.Mesh(
      createChamferedBoxGeo(4.45, 1.38, 1.92, 0.08, 0.04, 'y'),
      u.bionzCufSilica
    );
    cufResin.position.set(0, -0.06, -0.92);
    g.add(subPad, topDie, cufResin);

    // 3x3 Precision Cu-Pillar Micro-Bumps: Copper pillar + Ni diffusion ring + SnAg solder dome + Cu6Sn5 IMC!
    const cuGeo = hiResCyl(0.28, 0.28, 0.72, 12);
    const niGeo = hiResCyl(0.3, 0.3, 0.14, 12);
    const snGeo = hiResSphere(0.32, 10, 8);
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const bx = ix * 1.24;
        const bz = iz * 1.08;
        const cu = new THREE.Mesh(cuGeo, mats.copperHybridBond);
        cu.position.set(bx, 0.36, bz);
        cu.userData.noEdges = true;
        const ni = new THREE.Mesh(niGeo, mats.stainlessMachined);
        ni.position.set(bx, -0.04, bz);
        ni.userData.noEdges = true;
        const sn = new THREE.Mesh(snGeo, mats.solderBallSilver);
        sn.scale.set(1, 0.78, 1);
        sn.position.set(bx, -0.44, bz);
        sn.userData.noEdges = true;
        g.add(cu, ni, sn);
      }
    }

    // Nano-silica low-CTE filler microspheres visible along the CUF fillet edge
    const beadGeo = hiResSphere(0.11, 7, 5);
    for (let b = -3; b <= 3; b++) {
      const bead = new THREE.Mesh(beadGeo, mats.quartzOlpf);
      bead.position.set(b * 0.58, -0.35 + (b % 2) * 0.42, 0.08);
      bead.userData.noEdges = true;
      g.add(bead);
    }

    // Match BGA stand-off height flush with X2-04 perimeter SAC305 BGA solder-ball plane!
    const bgaScaleWrap = new THREE.Group();
    bgaScaleWrap.scale.set(1, 0.6, 1);
    while (g.children.length > 0) {
      bgaScaleWrap.add(g.children[0]);
    }
    g.add(bgaScaleWrap);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-bga-micro-c4-imc-underfill',
        77,
        '#cbd5e1',
        g,
        new THREE.Vector3(13.8, 13.8, -20),
        new THREE.Vector3(42, 52, -56),
        cp,
        0.22
      )
    );
  }

  // X2-78. [TOP GRAND THERMAL CROWN] Sintered-Ag/Indium sTIM (bottom) & Cu-Diamond Composite Heat Spreader Lid (fins UP!)
  {
    const g = new THREE.Group();
    // Main CVD Cu-Diamond Composite Thermal Spreader Lid sealing the TOP of X2-52 Microfluidic Si Cooler
    const lidMain = makeHiResHorizPlate(
      createRoundedRectShape(42.6, 37.6, 2.2),
      0.86,
      mats.copperHeatSpreader,
      0.12,
      2,
      20
    );
    lidMain.position.y = 0.32;
    // Perimeter Invar-36 Warpage-Control Structural Flange Skirt facing DOWN around cooler perimeter
    const invarSkirt = makeHiResHorizPlate(
      createFrameShape(43.2, 38.2, 2.3, 37.8, 32.8, 1.6),
      0.56,
      mats.stainlessMachined,
      0.08,
      2,
      16
    );
    invarSkirt.position.y = -0.36;
    // Bottom Sintered-Silver / Indium Liquid-Metal sTIM Waffle Interface Plate (facing DOWN flush onto X2-52!)
    const stimPlate = makeHiResHorizPlate(
      createRoundedRectShape(35.6, 30.6, 1.4),
      0.34,
      mats.sinteredSilver,
      0.05,
      1,
      14
    );
    stimPlate.position.y = -0.3;
    g.add(lidMain, invarSkirt, stimPlate);

    // Sintered-Ag/Indium thermal micro-grid channels facing DOWN into X2-52 top manifold
    const stripGeo = createChamferedBoxGeo(32.0, 0.16, 0.56, 0.03, 0.015, 'y');
    for (let iz = -5; iz <= 5; iz++) {
      const st = new THREE.Mesh(stripGeo, iz % 2 === 0 ? mats.pyroGraphite : mats.goldPlating);
      st.position.set(0, -0.56, iz * 2.65);
      st.userData.noEdges = true;
      g.add(st);
    }

    // Topside Radial Heat-Extraction Cooling Fins facing UP (+Y) toward the camera magnesium chassis heatsink!
    const finGeo = createChamferedBoxGeo(0.46, 0.36, 31.6, 0.04, 0.02, 'y');
    for (let ix = -7; ix <= 7; ix++) {
      const fin = new THREE.Mesh(finGeo, mats.copperHybridBond);
      fin.position.set(ix * 2.55, 0.85, 0);
      fin.userData.noEdges = true;
      g.add(fin);
    }

    // 4 Corner Torque-Controlled Titanium Chassis Clamp Bosses
    const bossGeo = hiResCyl(1.15, 1.25, 1.38, 14);
    const screwGeo = hiResCyl(0.54, 0.54, 1.54, 6);
    for (const [bx, bz] of [
      [-19.2, -16.7],
      [19.2, -16.7],
      [-19.2, 16.7],
      [19.2, 16.7],
    ]) {
      const boss = new THREE.Mesh(bossGeo, mats.titaniumRivet);
      boss.position.set(bx, -0.02, bz);
      const screw = new THREE.Mesh(screwGeo, mats.goldPlating);
      screw.position.set(bx, 0.04, bz);
      screw.userData.noEdges = true;
      g.add(boss, screw);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-stim-cu-diamond-thermal-lid',
        78,
        '#ea580c',
        g,
        new THREE.Vector3(0, 24.0, 0),
        new THREE.Vector3(0, 92, 0),
        cp,
        0.22
      )
    );
  }

  // X2-79. [SUBSTRATE PERIMETER MECHANICAL CROWN] 3.5D Invar Warpage Stiffener & Detachable Optical MT-Ferrule Frame
  {
    const g = new THREE.Group();
    // Open-Center Low-CTE Invar/Stainless 3.5D Warpage-Control Stiffener Frame seated FLUSH on X2-04 Glass Core Substrate!
    const stiffener = makeHiResHorizPlate(
      createFrameShape(54.8, 49.8, 2.5, 49.2, 44.2, 1.9),
      2.2,
      mats.stainlessMachined,
      0.1,
      2,
      20
    );
    // Gold-plated EMI perimeter grounding rail inset along top lip
    const emiLip = makeHiResHorizPlate(
      createFrameShape(53.2, 48.2, 2.2, 50.8, 45.8, 1.9),
      0.24,
      mats.goldPlating,
      0.04,
      1,
      16
    );
    emiLip.position.y = 1.22;
    g.add(stiffener, emiLip);

    // 4 Perimeter BeCu EMI Grounding Spring Finger Arrays
    const fingerGeo = createChamferedBoxGeo(1.1, 0.24, 0.52, 0.03, 0.015, 'y');
    for (let k = -5; k <= 5; k++) {
      const fnN = new THREE.Mesh(fingerGeo, mats.beCuSpring);
      fnN.position.set(k * 3.8, 1.26, -24.0);
      fnN.userData.noEdges = true;
      const fnS = new THREE.Mesh(fingerGeo, mats.beCuSpring);
      fnS.position.set(k * 3.8, 1.26, 24.0);
      fnS.userData.noEdges = true;
      g.add(fnN, fnS);
    }
    for (let k = -4; k <= 4; k++) {
      const fnW = new THREE.Mesh(fingerGeo, mats.beCuSpring);
      fnW.rotation.y = Math.PI / 2;
      fnW.position.set(-26.5, 1.26, k * 3.8);
      fnW.userData.noEdges = true;
      const fnE = new THREE.Mesh(fingerGeo, mats.beCuSpring);
      fnE.rotation.y = Math.PI / 2;
      fnE.position.set(26.5, 1.26, k * 3.8);
      fnE.userData.noEdges = true;
      g.add(fnW, fnE);
    }

    // 4 Corner Detachable Optical MPO/MT-Ferrule Latch Docks aligned directly to X2-55 COUPE corner V-grooves!
    const pinGeo = hiResCyl(0.18, 0.18, 1.4, 10);
    for (const [cx, cz, rot] of [
      [-24.8, -22.3, Math.PI / 4],
      [24.8, -22.3, -Math.PI / 4],
      [-24.8, 22.3, (3 * Math.PI) / 4],
      [24.8, 22.3, -(3 * Math.PI) / 4],
    ]) {
      const mt = new THREE.Group();
      mt.position.set(cx, 0.65, cz);
      mt.rotation.y = rot;
      const housing = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 1.28, 3.0, 0.12, 0.04, 'y'),
        mats.matteBlackAnodized
      );
      const latchClip = new THREE.Mesh(
        createChamferedBoxGeo(1.1, 0.42, 3.2, 0.06, 0.02, 'y'),
        mats.cinnabarAnodized
      );
      latchClip.position.set(0.32, 0.72, 0);
      mt.add(housing, latchClip);
      for (const pz of [-0.88, 0.88]) {
        const dowel = new THREE.Mesh(pinGeo, mats.titaniumRivet);
        dowel.rotation.z = Math.PI / 2;
        dowel.position.set(-1.95, 0.05, pz);
        dowel.userData.noEdges = true;
        mt.add(dowel);
      }
      g.add(mt);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-35d-stiffener-mt-ferrule-frame',
        79,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -16.0, 0),
        new THREE.Vector3(0, -56, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // TIER E — SONY BIONZ XR2 DEDICATED CAMERA ISP, AF+, HDR, CODEC & I/O SILICON (X2-80 – X2-85)
  // =========================================================================

  // X2-80. BIONZ XR2 759-Point PDAF Phase-Correlation & 60Hz AI 3D Skeletal Pose AF+ Engine
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.38,
      mats.npuSiliconDie,
      0.04,
      2,
      10
    );
    base.position.y = -0.94;
    g.add(base);

    // 759-Point Phase-Detection Focus Crosshair Tile Grid on die surface
    const dotGeo = createChamferedBoxGeo(0.18, 0.12, 0.18, 0.02, 0.01, 'y');
    for (let ix = -3; ix <= 3; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        const pt = new THREE.Mesh(
          dotGeo,
          Math.abs(ix) <= 1 && Math.abs(iz) <= 1 ? mats.goldPlating : mats.vcWorkingFluidCyan
        );
        pt.position.set(ix * 0.56, -0.66, iz * 0.62);
        pt.userData.noEdges = true;
        g.add(pt);
      }
    }

    // Twin Left/Right Stereo Phase-Shift Correlation Wave Bars
    const waveGeo = createChamferedBoxGeo(0.22, 0.48, 0.24, 0.02, 0.01, 'y');
    for (let i = 0; i < 5; i++) {
      const hL = 0.28 + Math.sin(i * 0.8) * 0.22;
      const wL = new THREE.Mesh(waveGeo, mats.vcWorkingFluidCyan);
      wL.scale.y = hL / 0.48;
      wL.position.set(-1.55 + i * 0.34, -0.52 + hL * 0.5, 1.38);
      wL.userData.noEdges = true;
      const wR = new THREE.Mesh(waveGeo, mats.cinnabarAnodized);
      wR.scale.y = hL / 0.48;
      wR.position.set(0.18 + i * 0.34, -0.52 + hL * 0.5, 1.38);
      wR.userData.noEdges = true;
      g.add(wL, wR);
    }

    // Rising 3D Human Skeletal Keypoint Pose Graph (Head / Eye Lock / Shoulders / Torso / Elbows)
    const joints: Record<string, THREE.Vector3> = {
      head: new THREE.Vector3(0, 0.96, -0.15),
      neck: new THREE.Vector3(0, 0.56, -0.15),
      lSh: new THREE.Vector3(-0.78, 0.48, -0.15),
      rSh: new THREE.Vector3(0.78, 0.48, -0.15),
      lEl: new THREE.Vector3(-1.22, -0.02, 0.22),
      rEl: new THREE.Vector3(1.22, -0.02, 0.22),
      hip: new THREE.Vector3(0, -0.18, -0.15),
    };
    const jGeo = hiResSphere(0.15, 8, 6);
    for (const [key, pos] of Object.entries(joints)) {
      const node = new THREE.Mesh(jGeo, key === 'head' ? mats.mofEmerald : mats.goldPlating);
      node.position.copy(pos);
      node.userData.noEdges = true;
      g.add(node);
    }
    const bones: Array<[string, string]> = [
      ['head', 'neck'],
      ['neck', 'lSh'],
      ['neck', 'rSh'],
      ['lSh', 'lEl'],
      ['rSh', 'rEl'],
      ['neck', 'hip'],
    ];
    for (const [a, b] of bones) {
      g.add(makeNanoLink(joints[a], joints[b], 0.055, mats.vcWorkingFluidCyan, 6));
    }
    // Green Eye-AF Lock Reticle Ring around Head
    const eyeLock = new THREE.Mesh(hiResTorus(0.34, 0.045, 7, 16), mats.mofEmerald);
    eyeLock.position.copy(joints.head);
    eyeLock.userData.noEdges = true;
    g.add(eyeLock);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-pdaf-759-pose-af-engine',
        80,
        '#10b981',
        g,
        new THREE.Vector3(-14, -6.4, 20),
        new THREE.Vector3(-42, -24, 56),
        cp,
        0.22
      )
    );
  }

  // X2-81. BIONZ XR2 16-Stop Dynamic Range Dual-Gain HDR Fusion & Composite RAW NR Engine
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.38,
      mats.ispSiliconDie,
      0.04,
      2,
      10
    );
    base.position.y = -0.94;
    g.add(base);

    // Parallel High-Gain (Shadow Cyan) & Low-Gain (Highlight Amber) Dual-Conversion Pipelines
    const pipeGeo = createChamferedBoxGeo(1.48, 0.42, 0.96, 0.05, 0.02, 'y');
    const hiGain = new THREE.Mesh(pipeGeo, mats.vcWorkingFluidCyan);
    hiGain.position.set(-1.38, -0.44, -0.84);
    const loGain = new THREE.Mesh(pipeGeo, mats.goldPlating);
    loGain.position.set(-1.38, -0.44, 0.84);
    g.add(hiGain, loGain);

    // Central Pyramidal 16-Stop Linear HDR Tone-Fusion Prism
    const prism = new THREE.Mesh(hiResCyl(0.28, 1.08, 1.38, 4), mats.evfDichroicMirror);
    prism.rotation.y = Math.PI / 4;
    prism.position.set(0.18, 0.06, 0);
    g.add(prism);

    // Right: 4-Frame Stacked Composite RAW Multi-Frame Noise Reduction (MFNR) Alignment Stack
    const frameGeo = createChamferedBoxGeo(1.18, 0.16, 2.75, 0.03, 0.015, 'y');
    for (let f = 0; f < 4; f++) {
      const fr = new THREE.Mesh(frameGeo, f === 3 ? mats.mofEmerald : mats.siliconPhotodiode);
      fr.position.set(1.52, -0.52 + f * 0.34, 0);
      fr.userData.noEdges = true;
      g.add(fr);
    }

    // Converging data links into HDR fusion prism
    g.add(
      makeNanoLink(new THREE.Vector3(-0.62, -0.3, -0.84), new THREE.Vector3(0.0, 0.0, 0), 0.07, mats.vcWorkingFluidCyan),
      makeNanoLink(new THREE.Vector3(-0.62, -0.3, 0.84), new THREE.Vector3(0.0, 0.0, 0), 0.07, mats.goldPlating)
    );

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-16stop-dual-gain-hdr-fusion',
        81,
        '#f59e0b',
        g,
        new THREE.Vector3(-8.4, -6.4, 20),
        new THREE.Vector3(-25, -24, 56),
        cp,
        0.22
      )
    );
  }

  // X2-82. BIONZ XR2 4K 60p/120p 10-bit 4:2:2 XAVC HS (HEVC/AV1) Video Codec & Motion-Estimation Engine
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.38,
      mats.ispSiliconDie,
      0.04,
      2,
      10
    );
    base.position.y = -0.94;
    g.add(base);

    // Left: Quad-Tree Partitioned CTU (64x64 / 32x32 / 16x16) Coding Tree Unit Macroblock Array
    const ctuBig = new THREE.Mesh(
      createChamferedBoxGeo(1.18, 0.44, 1.18, 0.04, 0.02, 'y'),
      mats.bodyRecRed
    );
    ctuBig.position.set(-1.32, -0.44, -0.86);
    g.add(ctuBig);
    const ctuSubGeo = createChamferedBoxGeo(0.52, 0.56, 0.52, 0.03, 0.015, 'y');
    for (const [sx, sz, smat] of [
      [-1.64, 0.52, mats.vcWorkingFluidCyan],
      [-1.0, 0.52, mats.goldPlating],
      [-1.64, 1.16, mats.mofEmerald],
      [-1.0, 1.16, mats.vcWorkingFluidCyan],
    ] as const) {
      const sub = new THREE.Mesh(ctuSubGeo, smat);
      sub.position.set(sx, -0.38, sz);
      sub.userData.noEdges = true;
      g.add(sub);
    }

    // Center: Systolic DCT/DST Transform & Quantization Pipeline Pillars
    const dctGeo = createChamferedBoxGeo(0.32, 0.92, 2.75, 0.04, 0.02, 'y');
    for (let i = 0; i < 3; i++) {
      const p = new THREE.Mesh(dctGeo, i === 1 ? mats.goldPlating : mats.siliconPhotodiode);
      p.position.set(-0.22 + i * 0.46, -0.18 + i * 0.14, 0);
      g.add(p);
    }

    // Right: CABAC Entropy Bitstream Compression Funnel outputting 10-bit 4:2:2 XAVC HS stream
    const funnel = new THREE.Mesh(hiResCyl(0.36, 0.92, 1.24, 12), mats.copperHybridBond);
    funnel.rotation.z = -Math.PI / 2;
    funnel.position.set(1.48, 0.14, 0);
    g.add(funnel);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-xavc-hs-10bit-422-codec',
        82,
        '#e11d48',
        g,
        new THREE.Vector3(-2.8, -6.4, 20),
        new THREE.Vector3(-8.5, -24, 56),
        cp,
        0.22
      )
    );
  }

  // X2-83. BIONZ XR2 33^3 Tetrahedral 3D Color LUT (S-Log3/S-Cinetone) & Optical Breathing Warp Engine
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.38,
      mats.ispSiliconDie,
      0.04,
      2,
      10
    );
    base.position.y = -0.94;
    g.add(base);

    // Left: Sculpted 3x3x3 Tetrahedral 3D RGB Color-Cube LUT Lattice (27 chromatic vertices!)
    const nodeGeo = hiResSphere(0.14, 8, 6);
    const palette = [mats.bodyRecRed, mats.mofEmerald, mats.vcWorkingFluidCyan, mats.goldPlating, mats.aluminaHighKFilm];
    for (let ix = 0; ix < 3; ix++) {
      for (let iy = 0; iy < 3; iy++) {
        for (let iz = 0; iz < 3; iz++) {
          const idx = (ix + iy * 2 + iz) % palette.length;
          const v = new THREE.Mesh(nodeGeo, palette[idx]);
          v.position.set(-1.58 + ix * 0.62, -0.44 + iy * 0.56, -0.62 + iz * 0.62);
          v.userData.noEdges = true;
          g.add(v);
        }
      }
    }
    // Outer cube frame rails linking the 3D LUT cube corners
    g.add(
      makeNanoLink(new THREE.Vector3(-1.58, -0.44, -0.62), new THREE.Vector3(-0.34, 0.68, 0.62), 0.045, mats.goldPlating),
      makeNanoLink(new THREE.Vector3(-0.34, -0.44, -0.62), new THREE.Vector3(-1.58, 0.68, 0.62), 0.045, mats.vcWorkingFluidCyan)
    );

    // Right: Curved Bicubic Optical Lens Distortion / Focus Breathing Geometric Mesh Warper
    const ribGeo = createChamferedBoxGeo(1.48, 0.1, 0.16, 0.02, 0.01, 'y');
    for (let iz = -2; iz <= 2; iz++) {
      const barrelY = 0.08 + (1 - Math.abs(iz) * 0.28) * 0.58;
      const rib = new THREE.Mesh(ribGeo, mats.lensXaGlass);
      rib.position.set(1.18, barrelY, iz * 0.54);
      rib.rotation.x = iz * 0.12;
      rib.userData.noEdges = true;
      g.add(rib);
    }
    const warpCore = new THREE.Mesh(
      createChamferedBoxGeo(1.48, 0.34, 2.55, 0.05, 0.02, 'y'),
      mats.siliconPhotodiode
    );
    warpCore.position.set(1.18, -0.48, 0);
    g.add(warpCore);

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-3d-lut-breathing-warp-isp',
        83,
        '#ec4899',
        g,
        new THREE.Vector3(2.8, -6.4, 20),
        new THREE.Vector3(8.5, -24, 56),
        cp,
        0.22
      )
    );
  }

  // X2-84. BIONZ XR2 30fps 1-Second Pre-Capture Ring-Buffer DMA & CFexpress Type A / Dual USB-C Controller
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.38,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -0.94;
    g.add(base);

    // Left: Circular Toroidal 30fps Pre-Capture Zero-Copy Ring-Buffer Memory Carousel!
    const ring = new THREE.Mesh(hiResTorus(1.06, 0.24, 10, 24), mats.vcWorkingFluidCyan);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(-0.78, -0.26, 0);
    g.add(ring);

    // 8 Discrete Frame Slots around Ring Buffer + Glowing Red Shutter-Trigger Write Pointer Gate
    const slotGeo = createChamferedBoxGeo(0.24, 0.34, 0.24, 0.02, 0.01, 'y');
    for (let k = 0; k < 8; k++) {
      const ang = (k / 8) * Math.PI * 2;
      const sl = new THREE.Mesh(slotGeo, k === 0 ? mats.bodyRecRed : mats.goldPlating);
      sl.position.set(-0.78 + Math.cos(ang) * 1.06, 0.08, Math.sin(ang) * 1.06);
      sl.userData.noEdges = true;
      g.add(sl);
    }

    // Right: Scatter-Gather DMA Bridge feeding PCIe Gen4/5 CFexpress Type A & Dual USB-C 10Gbps Lanes
    const dmaBlock = new THREE.Mesh(
      createChamferedBoxGeo(1.42, 0.62, 1.38, 0.05, 0.02, 'y'),
      mats.ispSiliconDie
    );
    dmaBlock.position.set(1.26, -0.34, -0.78);
    const usbBlock = new THREE.Mesh(
      createChamferedBoxGeo(1.42, 0.56, 1.18, 0.05, 0.02, 'y'),
      mats.copperHybridBond
    );
    usbBlock.position.set(1.26, -0.38, 0.86);
    g.add(dmaBlock, usbBlock);

    const laneGeo = createChamferedBoxGeo(0.96, 0.12, 0.16, 0.02, 0.01, 'y');
    for (const lz of [-1.06, -0.5, 0.64, 1.08]) {
      const ln = new THREE.Mesh(laneGeo, mats.goldPlating);
      ln.position.set(1.26, 0.14, lz);
      ln.userData.noEdges = true;
      g.add(ln);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-precapture-ring-dma-cfe',
        84,
        '#06b6d4',
        g,
        new THREE.Vector3(8.4, -6.4, 20),
        new THREE.Vector3(25, -24, 56),
        cp,
        0.22
      )
    );
  }

  // X2-85. BIONZ XR2 Blackout-Free 240Hz EVF Display Compositor & 4K 16-bit RAW HDMI 2.1 (FRL) Engine
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(
      createRoundedRectShape(4.6, 4.0, 0.34),
      0.38,
      mats.siliconBulk,
      0.04,
      2,
      10
    );
    base.position.y = -0.94;
    g.add(base);

    // Left: Multi-Plane Line-Based Blackout-Free Display Compositor (Live Image + OSD/Peaking/Zebra Layers!)
    const planeGeo = createChamferedBoxGeo(2.05, 0.14, 2.75, 0.04, 0.015, 'y');
    for (const [py, pmat] of [
      [-0.44, mats.ispSiliconDie],
      [-0.08, mats.vcWorkingFluidCyan],
      [0.28, mats.quartzOlpf],
      [0.62, mats.mofEmerald],
    ] as const) {
      const pl = new THREE.Mesh(planeGeo, pmat);
      pl.position.set(-0.96, py, 0);
      if (py > -0.3) pl.userData.noEdges = true;
      g.add(pl);
    }

    // Right: Dual Output PHY Docks — MIPI-DSI 240Hz EVF Bridge (Rear) & 4-Lane Gold HDMI 2.1 FRL Engine (Front)
    const dsiDock = new THREE.Mesh(
      createChamferedBoxGeo(1.48, 0.62, 1.24, 0.05, 0.02, 'y'),
      mats.aluminaHighKFilm
    );
    dsiDock.position.set(1.24, -0.34, -0.88);
    const hdmiDock = new THREE.Mesh(
      createChamferedBoxGeo(1.48, 0.68, 1.38, 0.05, 0.02, 'y'),
      mats.goldPlating
    );
    hdmiDock.position.set(1.24, -0.3, 0.86);
    g.add(dsiDock, hdmiDock);

    // 4-Lane 48Gbps HDMI 2.1 FRL Differential Output Pins
    const frlGeo = hiResCyl(0.1, 0.1, 0.72, 8);
    for (let l = 0; l < 4; l++) {
      const pin = new THREE.Mesh(frlGeo, mats.copperHybridBond);
      pin.rotation.z = Math.PI / 2;
      pin.position.set(1.78, 0.18, 0.36 + l * 0.32);
      pin.userData.noEdges = true;
      g.add(pin);
    }

    parts.push(
      finalizeUltraBionzV2Part(
        'xv2-blackoutfree-evf-hdmi-disp',
        85,
        '#2563eb',
        g,
        new THREE.Vector3(14, -6.4, 20),
        new THREE.Vector3(42, -24, 56),
        cp,
        0.22
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
