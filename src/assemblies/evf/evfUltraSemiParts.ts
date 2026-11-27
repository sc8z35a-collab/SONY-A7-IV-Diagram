import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildPhillipsScrew,
  buildSmdPassive,
  buildSpotWeldNuggets,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { EVF_OPTICAL_Y } from './evfParts';
import { lazyExplanationStub } from '../lazyExplanations';

export function finalizeStandaloneEvfUltraPart(
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
    subsystem: 'evf',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    integratedExplodeOffset: explodeOffset.clone(),
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    standaloneOnly: true,
  };
}

export function createUltraRingGeo(
  innerR: number,
  outerR: number,
  depth: number,
  bevel = 0.03,
  segs = 40
): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const h = new THREE.Path();
  h.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(h);
  return extrudeHiRes(s, depth, bevel, bevel, 2, segs);
}

/**
 * Build maximum-detail standalone EVF semiconductor, TCON SI/EMC, thermal/magnetic
 * and front optical-bench parts (E76–E90).
 */
export function buildEvfUltraSemiParts(mats: MaterialLibrary): CadPart[] {
  const cp = mats.clippingPlanes;
  const parts: CadPart[] = [];

  // =========================================================================
  // E76. Micro-OLED Black Polyimide PDL Pixel-Definition Bank & CMP Planarization
  //      (Z=+2.89, strictly within E59 +2.83 & E56 +2.95)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Multi-step SiO2/SiNx CMP planarization dielectric wafer slab + chamfered dicing kerf street
    const dicingRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.72, 11.92, 0.22, 15.18, 11.38, 0.16), 0.018, 0.003, 0.003, 1, 14),
      mats.siliconBulk
    );
    dicingRim.position.z = 0.014;
    const cmpBase = new THREE.Mesh(
      createChamferedBoxGeo(15.2, 11.4, 0.022, 0.14, 0.004, 'z'),
      mats.aluminaHighKFilm
    );
    cmpBase.position.z = 0.012;
    g.add(dicingRim, cmpBase);

    // Double-ring black polyimide moisture/light guard-dam outer bank frame with corner lithography reliefs
    const outerDam = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.48, 11.68, 0.24, 14.3, 10.5, 0.16), 0.024, 0.004, 0.004, 1, 14),
      mats.matteBlackAnodized
    );
    outerDam.position.z = -0.005;
    const innerDam = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.9, 10.1, 0.18, 12.88, 9.18, 0.12), 0.026, 0.004, 0.004, 1, 14),
      mats.matteBlackAnodized
    );
    innerDam.position.z = -0.007;
    g.add(outerDam, innerDam);

    // High-density Black Polyimide PDL Pixel-Well Bank Grid (11x9 tapered ribs)
    const ribVGeo = new THREE.BoxGeometry(0.13, 9.16, 0.024);
    for (let ix = -5; ix <= 5; ix++) {
      const rv = new THREE.Mesh(ribVGeo, mats.matteBlackAnodized);
      rv.position.set(ix * 1.16, 0, -0.009);
      rv.userData.noEdges = true;
      g.add(rv);
    }
    const ribHGeo = new THREE.BoxGeometry(12.86, 0.13, 0.024);
    for (let iy = -4; iy <= 4; iy++) {
      const rh = new THREE.Mesh(ribHGeo, mats.matteBlackAnodized);
      rh.position.set(0, iy * 1.02, -0.009);
      rh.userData.noEdges = true;
      g.add(rh);
    }

    // Recessed RGB sub-pixel aperture well glints + halftone black PDL spacer pillars (hSPC) at intersections
    const subWellGeo = new THREE.BoxGeometry(0.24, 0.66, 0.01);
    const spacerPostGeo = hiResCyl(0.08, 0.11, 0.032, 8).rotateX(Math.PI / 2);
    const cfaMats = [mats.cfaRed, mats.cfaGreen, mats.cfaBlue];
    for (let ix = -5; ix <= 4; ix++) {
      for (let iy = -4; iy <= 3; iy++) {
        const cx = (ix + 0.5) * 1.16;
        const cy = (iy + 0.5) * 1.02;
        for (let c = 0; c < 3; c++) {
          const well = new THREE.Mesh(subWellGeo, cfaMats[c]);
          well.position.set(cx + (c - 1) * 0.3, cy, -0.002);
          well.userData.noEdges = true;
          g.add(well);
        }
        if ((ix + iy) % 2 === 0) {
          const hspc = new THREE.Mesh(spacerPostGeo, mats.matteBlackAnodized);
          hspc.position.set(ix * 1.16, iy * 1.02, -0.015);
          hspc.userData.noEdges = true;
          g.add(hspc);
        }
      }
    }

    // Perimeter guard-ring micro-via chain + top wafer micro-probe test strip & backside Cu seal moat
    const viaGeo = hiResCyl(0.09, 0.09, 0.022, 8).rotateX(Math.PI / 2);
    const probePadGeo = new THREE.BoxGeometry(0.32, 0.16, 0.012);
    for (let i = -4; i <= 4; i++) {
      for (const sy of [-5.15, 5.15]) {
        const v = new THREE.Mesh(viaGeo, mats.goldPlating);
        v.position.set(i * 1.48, sy, -0.004);
        v.userData.noEdges = true;
        g.add(v);
      }
      const pp = new THREE.Mesh(probePadGeo, mats.silverElectrode);
      pp.position.set(i * 1.15, 5.6, -0.014);
      pp.userData.noEdges = true;
      g.add(pp);
    }
    const backMoat = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.8, 11.0, 0.18, 13.8, 10.0, 0.12), 0.012, 0.002, 0.002, 1, 14),
      mats.copperHybridBond
    );
    backMoat.position.z = 0.024;
    backMoat.userData.noEdges = true;
    const waferNotch = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.026, 3).rotateX(Math.PI / 2), mats.goldPlating);
    waferNotch.position.set(0, -5.62, -0.012);
    waferNotch.userData.noEdges = true;
    g.add(backMoat, waferNotch);

    // 4-corner Copper CMP dummy-fill planarization tiles & gold lithography vernier alignment crosses
    const tileGeo = new THREE.BoxGeometry(0.26, 0.26, 0.014);
    const vernierGeo = new THREE.BoxGeometry(0.56, 0.1, 0.016);
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        for (let dx = 0; dx < 2; dx++) {
          for (let dy = 0; dy < 2; dy++) {
            const tile = new THREE.Mesh(tileGeo, mats.copperHybridBond);
            tile.position.set(sx * (6.72 + dx * 0.36), sy * (4.72 + dy * 0.36), -0.008);
            tile.userData.noEdges = true;
            g.add(tile);
          }
        }
        const vh = new THREE.Mesh(vernierGeo, mats.goldPlating);
        vh.position.set(sx * 7.25, sy * 5.25, -0.012);
        vh.userData.noEdges = true;
        const vv = new THREE.Mesh(vernierGeo, mats.goldPlating);
        vv.rotation.z = Math.PI / 2;
        vv.position.set(sx * 7.25, sy * 5.25, -0.012);
        vv.userData.noEdges = true;
        g.add(vh, vv);
      }
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oled-pdl-planarization',
        76,
        '#1f2937',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 2.89),
        new THREE.Vector3(0, 18, 16),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // E77. Micro-OLED Backside Cu Redistribution Layer (RDL) & Thermal TSV Interposer
  //      (Z=+3.415, strictly between E56 +3.33 & E60 +3.50, inside E47 inner 17.0x13.2)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Chamfered silicon kerf carrier frame + backside amber polyimide RDL dielectric base
    const kerfFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.84, 12.04, 0.2, 15.26, 11.46, 0.14), 0.028, 0.004, 0.004, 1, 14),
      mats.siliconLogicLayer
    );
    const rdlBase = new THREE.Mesh(
      createChamferedBoxGeo(15.32, 11.52, 0.026, 0.14, 0.004, 'z'),
      mats.polyimideFpc
    );
    g.add(kerfFrame, rdlBase);

    // 4-Quadrant Thermal Stress-Relief Electroplated Copper RDL Islands + Fine Gold RDL Serpentine Bus Routing on BOTH faces!
    const islandGeo = createChamferedBoxGeo(6.25, 4.35, 0.02, 0.22, 0.004, 'z');
    const innerPadGeo = createChamferedBoxGeo(5.1, 3.3, 0.012, 0.14, 0.003, 'z');
    const rdlTraceHGeo = new THREE.BoxGeometry(5.2, 0.085, 0.012);
    const rdlTraceVGeo = new THREE.BoxGeometry(0.085, 3.4, 0.012);
    const cornerLGeo = new THREE.BoxGeometry(0.72, 0.12, 0.014);
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        for (const sz of [-1, 1]) {
          const island = new THREE.Mesh(islandGeo, mats.copperHeatSpreader);
          island.position.set(sx * 3.55, sy * 2.55, sz * 0.018);
          g.add(island);

          // Fine gold CoWoS-style RDL power/thermal redistribution trace ladder linking TSV rows inside each quadrant!
          for (const dy of [-0.96, 0.96]) {
            const trH = new THREE.Mesh(rdlTraceHGeo, mats.goldPlating);
            trH.position.set(sx * 3.55, sy * 2.55 + dy, sz * 0.029);
            trH.userData.noEdges = true;
            g.add(trH);
          }
          for (const dx of [-1.56, 0, 1.56]) {
            const trV = new THREE.Mesh(rdlTraceVGeo, mats.goldPlating);
            trV.position.set(sx * 3.55 + dx, sy * 2.55, sz * 0.029);
            trV.userData.noEdges = true;
            g.add(trV);
          }

          // Corner lithography L-registration fiducials
          const lh = new THREE.Mesh(cornerLGeo, mats.silverElectrode);
          lh.position.set(sx * 7.1, sy * 5.38, sz * 0.028);
          lh.userData.noEdges = true;
          const lv = new THREE.Mesh(cornerLGeo, mats.silverElectrode);
          lv.rotation.z = Math.PI / 2;
          lv.position.set(sx * 7.4, sy * 5.08, sz * 0.028);
          lv.userData.noEdges = true;
          g.add(lh, lv);
        }
        // Subtle recessed Ti/Cu seed plating sub-island on -Z face
        const seed = new THREE.Mesh(innerPadGeo, mats.copperHybridBond);
        seed.position.set(sx * 3.55, sy * 2.55, -0.028);
        seed.userData.noEdges = true;
        g.add(seed);

        // Diagonal corner stress-relief copper redistribution fanout spokes (both faces)
        for (const sz of [-1, 1]) {
          const spoke = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.22, 0.016), mats.copperHybridBond);
          spoke.position.set(sx * 6.85, sy * 4.95, sz * 0.022);
          spoke.rotation.z = sx * sy * (Math.PI / 4);
          spoke.userData.noEdges = true;
          g.add(spoke);
        }
      }
    }

    // Dense Staggered 9x5 Copper-Filled Thermal TSV Micro-Pillars with Gold UBM Collars & SnAg Solder Caps on BOTH faces!
    const tsvPillarGeo = hiResCyl(0.2, 0.2, 0.058, 12).rotateX(Math.PI / 2);
    const ubmRingGeo = createUltraRingGeo(0.21, 0.34, 0.014, 0.003, 14);
    const capGeo = hiResCyl(0.15, 0.18, 0.016, 10).rotateX(Math.PI / 2);
    for (let ix = -4; ix <= 4; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        if (ix === 0 || iy === 0) continue; // Keep thermal-expansion cross-kerf streets crisp!
        const vx = ix * 1.56;
        const vy = iy * 1.92;
        const pillar = new THREE.Mesh(tsvPillarGeo, mats.copperHybridBond);
        pillar.position.set(vx, vy, 0);
        pillar.userData.noEdges = true;
        g.add(pillar);
        for (const sz of [-1, 1]) {
          const ubm = new THREE.Mesh(ubmRingGeo, mats.goldPlating);
          ubm.position.set(vx, vy, sz * 0.032);
          ubm.userData.noEdges = true;
          const cap = new THREE.Mesh(capGeo, mats.solderBallSilver);
          cap.position.set(vx, vy, sz * 0.034);
          cap.userData.noEdges = true;
          g.add(ubm, cap);
        }
      }
    }

    // Dual-face perimeter AuSn eutectic micro-seal bars + 24 fine top/bottom RDL redistribution fingers + cross bus + center die-ID pad
    const sealGeo = extrudeHiRes(createFrameShape(15.2, 11.4, 0.18, 14.52, 10.72, 0.14), 0.018, 0.003, 0.003, 1, 14);
    const fingerGeo = new THREE.BoxGeometry(0.28, 0.65, 0.016);
    const crossHGeo = new THREE.BoxGeometry(13.2, 0.18, 0.016);
    const crossVGeo = new THREE.BoxGeometry(0.18, 9.4, 0.016);
    const centerDieIdGeo = createChamferedBoxGeo(1.15, 0.72, 0.016, 0.08, 0.003, 'z');
    for (const sz of [-1, 1]) {
      const seal = new THREE.Mesh(sealGeo, mats.goldPlating);
      seal.position.z = sz * 0.026;
      seal.userData.noEdges = true;
      g.add(seal);

      for (let i = -5; i <= 5; i++) {
        for (const sy of [-5.12, 5.12]) {
          const f = new THREE.Mesh(fingerGeo, mats.goldPlating);
          f.position.set(i * 1.14, sy, sz * 0.028);
          f.userData.noEdges = true;
          g.add(f);
        }
      }
      const crossH = new THREE.Mesh(crossHGeo, mats.goldPlating);
      crossH.position.set(0, 0, sz * 0.025);
      crossH.userData.noEdges = true;
      const crossV = new THREE.Mesh(crossVGeo, mats.goldPlating);
      crossV.position.set(0, 0, sz * 0.025);
      crossV.userData.noEdges = true;
      const dieId = new THREE.Mesh(centerDieIdGeo, mats.invarScaleBar);
      dieId.position.set(0, 0, sz * 0.032);
      dieId.userData.noEdges = true;
      g.add(crossH, crossV, dieId);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oled-tsv-rdl-interposer',
        77,
        '#d97706',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 3.415),
        new THREE.Vector3(0, -18, 26),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // E78. Wafer-Level BaO/CaO Moisture Getter Ring & Laser-Sealed AuSn/Frit Frame
  //      (Z=+1.38, outer 20.6x16.0, inner hole 17.5x13.8 — BOTH faces detailed with frit beads & getter pockets!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 2-tier stepped low-CTE Kovar structural carrier frame with 4 precision corner tooling bores
    const outerShape = createFrameShape(20.6, 16.0, 0.85, 17.6, 13.86, 0.55);
    addCircleHoles(outerShape, [
      [-9.62, -7.28, 0.34],
      [9.62, -7.28, 0.34],
      [-9.62, 7.28, 0.34],
      [9.62, 7.28, 0.34],
    ]);
    const kovarBase = new THREE.Mesh(
      extrudeHiRes(outerShape, 0.22, 0.025, 0.025, 2, 20),
      mats.kovarSeal
    );
    g.add(kovarBase);

    // 4 Corner precision CNC stainless alignment eyelet collars around tooling bores + side micro vacuum-seal tab
    const cornerCollarGeo = createUltraRingGeo(0.36, 0.62, 0.26, 0.018, 16);
    for (const sx of [-9.62, 9.62]) {
      for (const sy of [-7.28, 7.28]) {
        const cc = new THREE.Mesh(cornerCollarGeo, mats.stainlessMachined);
        cc.position.set(sx, sy, 0);
        g.add(cc);
      }
    }

    // Raised inner laser-frit sealing track lip on BOTH -Z (coverglass seal) & +Z (substrate seal) faces!
    const fritShelfGeo = extrudeHiRes(createFrameShape(18.6, 14.6, 0.65, 17.64, 13.9, 0.52), 0.1, 0.018, 0.018, 1, 18);
    for (const sz of [-1, 1]) {
      const shelf = new THREE.Mesh(fritShelfGeo, mats.invarScaleBar);
      shelf.position.z = sz * 0.11;
      g.add(shelf);
    }

    // Continuous laser-melted AuSn / glass-frit rippled micro-weld bead track on BOTH faces!
    const beadGeo = hiResCyl(0.2, 0.24, 0.06, 10).rotateX(Math.PI / 2);
    for (const sz of [-1, 1]) {
      for (let i = -5; i <= 5; i++) {
        for (const sy of [-7.12, 7.12]) {
          const b = new THREE.Mesh(beadGeo, mats.goldPlating);
          b.position.set(i * 1.56, sy, sz * 0.17);
          b.userData.noEdges = true;
          g.add(b);
        }
      }
      for (let j = -3; j <= 3; j++) {
        for (const sx of [-9.12, 9.12]) {
          const b = new THREE.Mesh(beadGeo, mats.goldPlating);
          b.position.set(sx, j * 1.72, sz * 0.17);
          b.userData.noEdges = true;
          g.add(b);
        }
      }
    }

    // 12-Compartment BaO/CaO Porous Thin-Film Desiccant Getter Pockets with Granular Pellets & Vent Straps (BOTH faces!)
    const pocketTrayH = createChamferedBoxGeo(3.6, 0.66, 0.12, 0.08, 0.012, 'z');
    const getterTabH = createChamferedBoxGeo(3.2, 0.44, 0.1, 0.06, 0.012, 'z');
    const ventBarH = new THREE.BoxGeometry(0.14, 0.58, 0.035);
    const pelletGeo = hiResSphere(0.11, 8, 6);
    for (const sz of [-1, 1]) {
      for (const sy of [-7.58, 7.58]) {
        for (const cx of [-6.0, -2.0, 2.0, 6.0]) {
          const tray = new THREE.Mesh(pocketTrayH, mats.matteBlackAnodized);
          tray.position.set(cx, sy, sz * 0.11);
          const tab = new THREE.Mesh(getterTabH, mats.ceramicAlumina);
          tab.position.set(cx, sy, sz * 0.14);
          tab.userData.noEdges = true;
          g.add(tray, tab);
          for (const vx of [-1.0, 0, 1.0]) {
            const vb = new THREE.Mesh(ventBarH, mats.stainlessMachined);
            vb.position.set(cx + vx, sy, sz * 0.19);
            vb.userData.noEdges = true;
            g.add(vb);
          }
          for (const px of [-0.5, 0.5]) {
            const pel = new THREE.Mesh(pelletGeo, mats.smdCeramic);
            pel.scale.set(1.2, 0.9, 0.35);
            pel.position.set(cx + px, sy, sz * 0.185);
            pel.userData.noEdges = true;
            g.add(pel);
          }
        }
      }
    }

    const pocketTrayV = createChamferedBoxGeo(0.66, 4.4, 0.12, 0.08, 0.012, 'z');
    const getterTabV = createChamferedBoxGeo(0.44, 3.9, 0.1, 0.06, 0.012, 'z');
    const ventBarV = new THREE.BoxGeometry(0.58, 0.14, 0.035);
    for (const sz of [-1, 1]) {
      for (const sx of [-9.72, 9.72]) {
        for (const cy of [-2.8, 2.8]) {
          const tray = new THREE.Mesh(pocketTrayV, mats.matteBlackAnodized);
          tray.position.set(sx, cy, sz * 0.11);
          const tab = new THREE.Mesh(getterTabV, mats.ceramicAlumina);
          tab.position.set(sx, cy, sz * 0.14);
          tab.userData.noEdges = true;
          g.add(tray, tab);
          for (const vy of [-1.2, 0, 1.2]) {
            const vb = new THREE.Mesh(ventBarV, mats.stainlessMachined);
            vb.position.set(sx, cy + vy, sz * 0.19);
            vb.userData.noEdges = true;
            g.add(vb);
          }
          for (const py of [-0.6, 0.6]) {
            const pel = new THREE.Mesh(pelletGeo, mats.smdCeramic);
            pel.scale.set(0.9, 1.2, 0.35);
            pel.position.set(sx, cy + py, sz * 0.185);
            pel.userData.noEdges = true;
            g.add(pel);
          }
        }
      }
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oled-moisture-getter-frit',
        78,
        '#94a3b8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 1.38),
        new THREE.Vector3(-24, 14, 10),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E79. Refractive-Index-Matched Optical Clear Adhesive (OCA n=1.49) Laminate
  //      (3M 8146 / LUCIACS step-cut PET kiss-cut liner, micro-egress vent matrix, double-sided fiducials!)
  //      (Z=+1.38, strictly between E58 +1.33 & E23 +1.43, inside E78 17.5x13.8!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Primary optically flat n=1.49 acrylic OCA sheet + inner active-area stepped optical polish bevel frames
    const ocaFilm = new THREE.Mesh(
      createChamferedBoxGeo(16.1, 12.4, 0.026, 0.18, 0.004, 'z'),
      mats.opticalCementClear
    );
    const activeBevel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.8, 11.2, 0.22, 13.7, 10.1, 0.14), 0.022, 0.004, 0.004, 1, 16),
      mats.evfAntiFogGlass
    );
    const innerOptRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.6, 10.0, 0.14, 13.15, 9.55, 0.1), 0.026, 0.003, 0.003, 1, 16),
      mats.fluorineCoatCyan
    );
    g.add(ocaFilm, activeBevel, innerOptRing);

    // Dual-stage step-cut kiss-cut anti-ooze silicone/PET perimeter micro-dam + inner metallic alignment datum rail
    const damOuter = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.6, 12.9, 0.28, 15.85, 12.15, 0.18), 0.03, 0.004, 0.004, 1, 16),
      mats.polyimideFpc
    );
    const kissGroove = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.72, 12.02, 0.18, 15.1, 11.4, 0.14), 0.032, 0.003, 0.003, 1, 16),
      mats.mylarInsulatorFilm
    );
    g.add(damOuter, kissGroove);

    // 24 precision radial air-egress de-bubble micro-channels + anti-Newton-ring spacer micro-dots on BOTH faces!
    const ventNotchH = new THREE.BoxGeometry(0.42, 0.62, 0.012);
    const ventNotchV = new THREE.BoxGeometry(0.62, 0.42, 0.012);
    const spacerDotGeo = hiResCyl(0.11, 0.11, 0.014, 8).rotateX(Math.PI / 2);
    for (const sz of [-1, 1]) {
      for (let ix = -3; ix <= 3; ix++) {
        for (const sy of [-6.05, 6.05]) {
          const vn = new THREE.Mesh(ventNotchH, mats.silverElectrode);
          vn.position.set(ix * 2.1, sy, sz * 0.018);
          vn.userData.noEdges = true;
          g.add(vn);
        }
        const dotTop = new THREE.Mesh(spacerDotGeo, mats.goldPlating);
        dotTop.position.set(ix * 1.95, 5.38, sz * 0.017);
        dotTop.userData.noEdges = true;
        const dotBot = new THREE.Mesh(spacerDotGeo, mats.goldPlating);
        dotBot.position.set(ix * 1.95, -5.38, sz * 0.017);
        dotBot.userData.noEdges = true;
        g.add(dotTop, dotBot);
      }
      for (let iy = -2; iy <= 2; iy++) {
        for (const sx of [-7.95, 7.95]) {
          const vn = new THREE.Mesh(ventNotchV, mats.silverElectrode);
          vn.position.set(sx, iy * 2.1, sz * 0.018);
          vn.userData.noEdges = true;
          g.add(vn);
        }
      }
    }

    // 4-corner double-crosshair + concentric bullseye vacuum registration fiducials on BOTH faces!
    const crossGeo = new THREE.BoxGeometry(0.76, 0.09, 0.014);
    const ringFidGeo = createUltraRingGeo(0.24, 0.38, 0.014, 0.002, 16);
    for (const sz of [-1, 1]) {
      for (const sx of [-7.35, 7.35]) {
        for (const sy of [-5.55, 5.55]) {
          const fh = new THREE.Mesh(crossGeo, mats.goldPlating);
          fh.position.set(sx, sy, sz * 0.02);
          fh.userData.noEdges = true;
          const fv = new THREE.Mesh(crossGeo, mats.goldPlating);
          fv.rotation.z = Math.PI / 2;
          fv.position.set(sx, sy, sz * 0.02);
          fv.userData.noEdges = true;
          const ring = new THREE.Mesh(ringFidGeo, mats.invarScaleBar);
          ring.position.set(sx, sy, sz * 0.019);
          ring.userData.noEdges = true;
          g.add(fh, fv, ring);
        }
      }
    }

    // Twin precision step-cut release-liner pull-tabs (light-release #1 & heavy-release #2) with peel arrows & grip ribs!
    const earGeo = createChamferedBoxGeo(0.72, 1.65, 0.024, 0.16, 0.004, 'z');
    const earArrowGeo = hiResCyl(0.22, 0.22, 0.032, 3).rotateX(Math.PI / 2);
    const earRibGeo = new THREE.BoxGeometry(0.08, 1.1, 0.032);
    for (const [ex, ey, dir] of [
      [8.28, 4.6, 1],
      [-8.28, -4.6, -1],
    ] as Array<[number, number, number]>) {
      const ear = new THREE.Mesh(earGeo, mats.polyimideFpc);
      ear.position.set(ex, ey, 0.002);
      ear.userData.noEdges = true;
      const arr = new THREE.Mesh(earArrowGeo, mats.goldPlating);
      arr.position.set(ex + dir * 0.14, ey, 0.002);
      arr.rotation.z = dir > 0 ? -Math.PI / 2 : Math.PI / 2;
      arr.userData.noEdges = true;
      const rib = new THREE.Mesh(earRibGeo, mats.copperHeatSpreader);
      rib.position.set(ex - dir * 0.16, ey, 0.002);
      rib.userData.noEdges = true;
      g.add(ear, arr, rib);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oled-oca-laminate',
        79,
        '#38bdf8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 1.38),
        new THREE.Vector3(24, 14, 12),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // E80. Anisotropic Conductive Film (ACF) PAL-ACF 3µm Au-Sphere FOG Bond Strip
  //      (Y=29.64, Z=+5.42 — strictly between E48 maxY=29.32, E15 minY=29.95, E14 maxZ=+5.05)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Lower amber polyimide COF/FPC land shelf + translucent thermoset epoxy ACF core + upper glass ITO electrode bar
    const cofShelf = new THREE.Mesh(
      createChamferedBoxGeo(12.6, 0.14, 0.5, 0.08, 0.015, 'y'),
      mats.polyimideFpc
    );
    cofShelf.position.y = -0.14;
    const acfResin = new THREE.Mesh(
      createChamferedBoxGeo(12.4, 0.22, 0.44, 0.08, 0.015, 'y'),
      mats.mylarInsulatorFilm
    );
    const glassBumpBar = new THREE.Mesh(
      createChamferedBoxGeo(12.2, 0.1, 0.42, 0.08, 0.012, 'y'),
      mats.evfAntiFogGlass
    );
    glassBumpBar.position.y = 0.14;
    // Upper continuous transparent ITO electrode bevel highlight + lower copper stiffener rail
    const itoEdge = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.035, 0.16), mats.fluorineCoatCyan);
    itoEdge.position.set(0, 0.195, -0.11);
    itoEdge.userData.noEdges = true;
    const cofStiffRail = new THREE.Mesh(new THREE.BoxGeometry(12.3, 0.04, 0.14), mats.copperHeatSpreader);
    cofStiffRail.position.set(0, -0.22, 0.14);
    cofStiffRail.userData.noEdges = true;
    g.add(cofShelf, acfResin, glassBumpBar, itoEdge, cofStiffRail);

    // 28 staggered fine-pitch Au-plated FOG bumps + fanned COF copper lead fingers + alternating solder-mask dams!
    const bumpGeo = new THREE.BoxGeometry(0.22, 0.28, 0.18);
    const cofLeadGeo = new THREE.BoxGeometry(0.16, 0.045, 0.52);
    const damGeo = new THREE.BoxGeometry(0.11, 0.18, 0.38);
    const crushedSphereGeo = hiResSphere(0.072, 8, 6);
    const freeSphereGeo = hiResSphere(0.052, 6, 5);
    for (let i = 0; i < 28; i++) {
      const fx = -5.4 + i * 0.4;
      const bump = new THREE.Mesh(bumpGeo, mats.goldPlating);
      bump.position.set(fx, 0.01, -0.15);
      bump.userData.noEdges = true;
      // Protruding gold-plated COF lead finger running across lower shelf width!
      const cofLead = new THREE.Mesh(cofLeadGeo, mats.goldPlating);
      cofLead.position.set(fx, -0.06, 0.01);
      cofLead.userData.noEdges = true;
      g.add(bump, cofLead);

      // Dexerials PAL-ACF precision-arrayed crushed Au/Ni conductive microsphere triplets (Z-axis conduction!)
      for (const sz of [-0.14, 0.0, 0.14]) {
        const sp = new THREE.Mesh(crushedSphereGeo, mats.copperHybridBond);
        sp.scale.set(1.18, 0.65, 1.18); // Visibly compressed in vertical thermocompression axis!
        sp.position.set(fx, 0.01, sz);
        sp.userData.noEdges = true;
        g.add(sp);
      }

      if (i < 27) {
        // Lateral resin insulation dam + uncompressed insulated microsphere suspended in gap (X-axis isolated!)
        const dam = new THREE.Mesh(damGeo, mats.matteBlackAnodized);
        dam.position.set(fx + 0.2, -0.08, 0.02);
        dam.userData.noEdges = true;
        const isoSp = new THREE.Mesh(freeSphereGeo, mats.silverElectrode);
        isoSp.position.set(fx + 0.2, 0.03, 0.18);
        isoSp.userData.noEdges = true;
        g.add(dam, isoSp);
      }
    }

    // Left & right optical alignment vernier comb marks, bullseye targets & UV-cured silicone edge strain-relief menisci
    const vernierToothGeo = new THREE.BoxGeometry(0.08, 0.24, 0.14);
    const bullGeo = createUltraRingGeo(0.07, 0.13, 0.05, 0.005, 12);
    const filletCoreGeo = hiResCyl(0.19, 0.24, 0.42, 14);
    const filletCapGeo = hiResSphere(0.18, 10, 8);
    for (const sx of [-1, 1]) {
      for (let t = 0; t < 3; t++) {
        const vt = new THREE.Mesh(vernierToothGeo, mats.silverElectrode);
        vt.position.set(sx * (5.76 + t * 0.14), 0.06, -0.2);
        vt.userData.noEdges = true;
        g.add(vt);
      }
      const bull = new THREE.Mesh(bullGeo, mats.goldPlating);
      bull.position.set(sx * 5.9, -0.08, -0.24);
      bull.userData.noEdges = true;
      const fillet = new THREE.Mesh(filletCoreGeo, mats.opticalCementClear);
      fillet.position.set(sx * 6.32, 0, 0);
      const cap = new THREE.Mesh(filletCapGeo, mats.opticalCementClear);
      cap.scale.set(1.1, 0.85, 1.1);
      cap.position.set(sx * 6.32, 0.12, 0);
      cap.userData.noEdges = true;
      g.add(bull, fillet, cap);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oled-acf-fog-bond',
        80,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 29.64, 5.42),
        new THREE.Vector3(0, -24, 20),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E81. MIPI D-PHY 4-Lane VESA DSC 3:1 Stream Decoder & Line-Buffer Bridge IC
  //      (TCON Side-B central top: X in [-3.3,+3.3], Y in [42.0,47.4], Z in [+6.60,+7.34])
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = new THREE.Group();
    sub.rotation.y = Math.PI;
    g.add(sub);

    // 6-layer emerald HDI sub-carrier island + perimeter copper ground-stitching rail
    const island = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 5.2, 0.12, 0.24, 0.02, 'z'),
      mats.sensorPcb
    );
    const gndRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(6.24, 5.04, 0.2, 5.96, 4.76, 0.14), 0.03, 0.004, 0.004, 1, 14),
      mats.copperHeatSpreader
    );
    gndRing.position.z = 0.07;
    gndRing.userData.noEdges = true;
    sub.add(island, gndRing);

    // 2-tier organic BT BGA-144 interposer substrate + visible 36-ball perimeter SnAgCu solder-ball skirt!
    const btSub = new THREE.Mesh(
      createChamferedBoxGeo(4.85, 4.05, 0.12, 0.14, 0.015, 'z'),
      mats.sensorPcb
    );
    btSub.position.z = 0.18;
    sub.add(btSub);

    const ballGeo = hiResSphere(0.085, 8, 6);
    for (let i = -4; i <= 4; i++) {
      for (const sy of [-1.85, 1.85]) {
        const b = new THREE.Mesh(ballGeo, mats.solderBallSilver);
        b.position.set(i * 0.5, sy, 0.11);
        b.userData.noEdges = true;
        sub.add(b);
      }
    }
    for (let j = -3; j <= 3; j++) {
      for (const sx of [-2.25, 2.25]) {
        const b = new THREE.Mesh(ballGeo, mats.solderBallSilver);
        b.position.set(sx, j * 0.5, 0.11);
        b.userData.noEdges = true;
        sub.add(b);
      }
    }

    // Molded laser-etched DSC 3:1 silicon package body + stepped copper IHS heat-slug lid + Pin-1 triangle!
    const bgaBody = buildChipPackage({
      w: 4.55,
      d: 3.75,
      h: 0.28,
      style: 'bga',
      pinsPerSide: 8,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    bgaBody.position.z = 0.36;
    sub.add(bgaBody);

    const slugRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(3.65, 2.95, 0.2, 3.1, 2.4, 0.12), 0.04, 0.008, 0.008, 1, 14),
      mats.silverElectrode
    );
    slugRim.position.z = 0.51;
    const slugLid = new THREE.Mesh(
      createChamferedBoxGeo(3.05, 2.35, 0.06, 0.16, 0.012, 'z'),
      mats.copperHeatSpreader
    );
    slugLid.position.z = 0.53;
    const pin1Tri = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.04, 3).rotateX(Math.PI / 2), mats.goldPlating);
    pin1Tri.position.set(-1.82, 1.45, 0.52);
    pin1Tri.userData.noEdges = true;
    sub.add(slugRim, slugLid, pin1Tri);

    // Impedance-matched 4-lane MIPI serpentine length-tuning differential microstrip traces along bottom edge
    const segV = new THREE.BoxGeometry(0.11, 0.42, 0.03);
    const segH = new THREE.BoxGeometry(0.24, 0.1, 0.03);
    for (let lane = -2; lane <= 2; lane++) {
      const lx = lane * 0.92;
      for (const dp of [-0.14, 0.14]) {
        const s1 = new THREE.Mesh(segV, mats.goldPlating);
        s1.position.set(lx + dp, -2.26, 0.08);
        s1.userData.noEdges = true;
        sub.add(s1);
      }
      const jog = new THREE.Mesh(segH, mats.goldPlating);
      jog.position.set(lx, -2.28, 0.082);
      jog.userData.noEdges = true;
      sub.add(jog);
    }

    // 8x 0201 VDD/AVDD decoupling MLCCs + core-rail ferrite bead flanking left/right/top edges
    for (const sx of [-2.82, 2.82]) {
      for (const sy of [-1.55, -0.52, 0.52, 1.55]) {
        const cap = buildSmdPassive(0.4, 0.72, 0.24, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.position.set(sx, sy, 0.18);
        sub.add(cap);
      }
    }
    const coreBead = buildSmdPassive(1.05, 0.48, 0.3, mats.ferriteInductor, mats.silverElectrode, 'z');
    coreBead.position.set(-1.35, 2.24, 0.21);
    sub.add(coreBead);

    // 6 gold JTAG/DSC debug test-point pads along top right + laser die-code bar & backside (-Z) thermal via matrix!
    const tpGeo = hiResCyl(0.13, 0.13, 0.04, 10).rotateX(Math.PI / 2);
    for (let i = 0; i < 6; i++) {
      const tp = new THREE.Mesh(tpGeo, mats.goldPlating);
      tp.position.set(0.15 + i * 0.42, 2.24, 0.08);
      tp.userData.noEdges = true;
      sub.add(tp);
    }
    const laserBar81 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.24, 0.02), mats.invarScaleBar);
    laserBar81.position.set(0, 0.52, 0.568);
    laserBar81.userData.noEdges = true;
    const backThermalPad81 = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 3.6, 0.024, 0.16, 0.004, 'z'),
      mats.copperHeatSpreader
    );
    backThermalPad81.position.z = -0.078;
    backThermalPad81.userData.noEdges = true;
    sub.add(laserBar81, backThermalPad81);
    const backVia81 = hiResCyl(0.12, 0.12, 0.032, 8).rotateX(Math.PI / 2);
    for (let ix = -2; ix <= 2; ix++) {
      for (let iy = -1; iy <= 1; iy++) {
        const bv = new THREE.Mesh(backVia81, mats.goldPlating);
        bv.position.set(ix * 0.85, iy * 1.15, -0.084);
        bv.userData.noEdges = true;
        sub.add(bv);
      }
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-oled-dsc-bridge-ic',
        81,
        '#334155',
        g,
        new THREE.Vector3(0, 44.7, 7.22),
        new THREE.Vector3(0, 26, 44),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E82. 0.3pF Ultra-Low-Cap 4-Lane MIPI-DSI ESD TVS Diode Array (Semtech RClamp0524P)
  //      (Flow-through Pins 1->10, 2->9, 4->7, 5->6 + merged central GND pad Pins 3 & 8!)
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = new THREE.Group();
    sub.rotation.y = Math.PI;
    g.add(sub);

    const island = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 1.72, 0.12, 0.18, 0.02, 'z'),
      mats.sensorPcb
    );
    // Backside (-Z) copper coplanar reference ground plane
    const backGnd82 = new THREE.Mesh(
      createChamferedBoxGeo(5.85, 1.32, 0.022, 0.14, 0.004, 'z'),
      mats.copperHeatSpreader
    );
    backGnd82.position.z = -0.078;
    backGnd82.userData.noEdges = true;
    sub.add(island, backGnd82);

    // Copper low-inductance ESD return ground planes flanking top & bottom with double-row stitched via fence
    const gndBarGeo = new THREE.BoxGeometry(6.15, 0.18, 0.035);
    for (const sy of [-0.74, 0.74]) {
      const gb = new THREE.Mesh(gndBarGeo, mats.copperHeatSpreader);
      gb.position.set(0, sy, 0.078);
      gb.userData.noEdges = true;
      sub.add(gb);
    }

    const viaGeo = hiResCyl(0.085, 0.085, 0.06, 8).rotateX(Math.PI / 2);
    for (let i = -6; i <= 6; i++) {
      for (const sy of [-0.74, 0.74]) {
        const v = new THREE.Mesh(viaGeo, mats.goldPlating);
        v.position.set(i * 0.48, sy, 0.085);
        v.userData.noEdges = true;
        sub.add(v);
      }
    }

    // 3x authentic Semtech SLP2510P8 flow-through 10-pin TVS packages + straight CPW differential traces!
    const traceGeo = new THREE.BoxGeometry(0.11, 1.32, 0.035);
    const filletGeo = new THREE.BoxGeometry(0.16, 0.18, 0.16);
    const centerGndGeo = new THREE.BoxGeometry(0.32, 1.48, 0.038);
    const cathodeBarGeo = new THREE.BoxGeometry(1.52, 0.1, 0.02);

    for (const tx of [-2.05, 0, 2.05]) {
      const tvs = buildChipPackage({
        w: 1.66,
        d: 0.76,
        h: 0.28,
        style: 'dfn',
        pinsPerSide: 5,
        bodyMat: mats.ultra.icEpoxyLaser,
        leadMat: mats.solderBallSilver,
        pin1Mat: mats.goldPlating,
        axis: 'z',
      });
      tvs.position.set(tx, 0, 0.22);
      sub.add(tvs);

      // Laser cathode polarity stripe on package lid
      const cBar = new THREE.Mesh(cathodeBarGeo, mats.silverElectrode);
      cBar.position.set(tx, 0.26, 0.37);
      cBar.userData.noEdges = true;
      sub.add(cBar);

      // Merged central Pins 3 & 8 wide copper ground shunt pad (per Semtech RClamp0524P datasheet!)
      const cGnd = new THREE.Mesh(centerGndGeo, mats.copperHeatSpreader);
      cGnd.position.set(tx, 0, 0.076);
      cGnd.userData.noEdges = true;
      sub.add(cGnd);

      // 4 straight flow-through 90Ω CPW differential traces (Pins 1->10, 2->9, 4->7, 5->6) + wettable fillets!
      for (const px of [-0.64, -0.34, 0.34, 0.64]) {
        const tr = new THREE.Mesh(traceGeo, mats.goldPlating);
        tr.position.set(tx + px, 0, 0.078);
        tr.userData.noEdges = true;
        sub.add(tr);
        for (const py of [-0.42, 0.42]) {
          const fil = new THREE.Mesh(filletGeo, mats.solderBallSilver);
          fil.position.set(tx + px, py, 0.14);
          fil.userData.noEdges = true;
          sub.add(fil);
        }
      }
    }

    // Twin flanking 0201 ESD shunt filter caps at far left & right board ends
    for (const ex of [-3.02, 3.02]) {
      const ec = buildSmdPassive(0.24, 0.56, 0.18, mats.smdCeramic, mats.silverElectrode, 'z');
      ec.position.set(ex, 0, 0.15);
      sub.add(ec);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-tcon-mipi-esd-tvs',
        82,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 34.35, 7.22),
        new THREE.Vector3(-14, -22, 40),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E83. 90Ω Differential Common-Mode Choke (CMC) EMI Filter Bank (Murata DLW21S/DLP0NS)
  //      (True H-shaped flanged ferrite drum cores + bifilar helical copper coils + ground-cutout moat!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Twin emerald PCB carrier rails with authentic Murata ground-plane cutout moat directly under chokes!
    const carrierRailGeo = createChamferedBoxGeo(6.3, 0.44, 0.1, 0.08, 0.015, 'z');
    for (const sy of [-0.82, 0.82]) {
      const rail = new THREE.Mesh(carrierRailGeo, mats.sensorPcb);
      rail.position.set(0, sy, 0.21);
      g.add(rail);
    }

    // Shared geometries for 5x bifilar H-core Ni-Zn ferrite common-mode chokes (CLK + Lanes 0..3)
    const endFlangeGeo = createChamferedBoxGeo(0.94, 0.24, 0.38, 0.06, 0.02, 'z');
    const waistCoreGeo = hiResCyl(0.19, 0.19, 0.72, 14);
    const topCapGeo = createChamferedBoxGeo(0.92, 1.16, 0.08, 0.06, 0.015, 'z');
    const turnGeo = hiResTorus(0.24, 0.046, 8, 18).rotateX(Math.PI / 2);
    const saddleGeo = createChamferedBoxGeo(0.3, 0.28, 0.4, 0.04, 0.015, 'z');
    const launchTraceGeo = new THREE.BoxGeometry(0.12, 0.42, 0.03);
    const pin1Dot83 = hiResCyl(0.08, 0.08, 0.025, 10).rotateX(Math.PI / 2);
    const railVia83 = hiResCyl(0.075, 0.075, 0.12, 8).rotateX(Math.PI / 2);

    for (let i = -2; i <= 2; i++) {
      const cx = i * 1.24;

      // H-core dumbbell: upper & lower ferrite flanges + recessed cylindrical central winding drum + top flux cap
      for (const fy of [-0.46, 0.46]) {
        const fl = new THREE.Mesh(endFlangeGeo, mats.ferriteInductor);
        fl.position.set(cx, fy, 0.01);
        g.add(fl);
      }
      const waist = new THREE.Mesh(waistCoreGeo, mats.ferriteInductor);
      waist.position.set(cx, 0, 0.01);
      waist.userData.noEdges = true;
      const topCap = new THREE.Mesh(topCapGeo, mats.ferriteInductor);
      topCap.position.set(cx, 0, -0.21);
      const pDot = new THREE.Mesh(pin1Dot83, mats.silverElectrode);
      pDot.position.set(cx - 0.28, 0.36, -0.255);
      pDot.userData.noEdges = true;
      g.add(waist, topCap, pDot);

      // 5 twin-strand bifilar enameled copper coil turns wrapped tightly around ferrite drum waist!
      for (let t = -2; t <= 2; t++) {
        const turnMat = t % 2 === 0 ? mats.copperCoil : mats.goldPlating;
        const turn = new THREE.Mesh(turnGeo, turnMat);
        turn.position.set(cx, t * 0.135, 0.01);
        turn.userData.noEdges = true;
        g.add(turn);
      }

      // 4 wrap-around stepped silver/tin saddle terminals + 90Ω differential entry/exit gold traces + rail vias
      for (const sx of [-0.28, 0.28]) {
        for (const sy of [-0.5, 0.5]) {
          const sad = new THREE.Mesh(saddleGeo, mats.solderBallSilver);
          sad.position.set(cx + sx, sy, 0.02);
          sad.userData.noEdges = true;
          g.add(sad);

          const lt = new THREE.Mesh(launchTraceGeo, mats.goldPlating);
          lt.position.set(cx + sx, sy * 1.65, 0.15);
          lt.userData.noEdges = true;
          g.add(lt);
        }
      }
      for (const sy of [-0.82, 0.82]) {
        const rv = new THREE.Mesh(railVia83, mats.goldPlating);
        rv.position.set(cx, sy, 0.21);
        rv.userData.noEdges = true;
        g.add(rv);
      }
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-tcon-cmc-filter-bank',
        83,
        '#6366f1',
        g,
        new THREE.Vector3(0, 36.7, 7.06),
        new THREE.Vector3(14, -22, 42),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E84. Ultra-Low-Noise Analog LDO (<10µVrms) & Programmable VCOM/Gamma Ref IC
  //      (Kelvin star-ground copper moat, QFN-16 DAC, DFN-8 LDO, MnO2 Tantalum, 0.1% bridge)
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = new THREE.Group();
    sub.rotation.y = Math.PI;
    g.add(sub);

    const island = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 3.04, 0.12, 0.2, 0.02, 'z'),
      mats.sensorPcb
    );
    // Etched copper Kelvin star-ground perimeter moat & thermal drain pad + backside (-Z) copper star-ground plane!
    const starMoat = new THREE.Mesh(
      extrudeHiRes(createFrameShape(6.2, 2.86, 0.18, 5.76, 2.42, 0.12), 0.032, 0.004, 0.004, 1, 14),
      mats.goldPlating
    );
    starMoat.position.z = 0.075;
    starMoat.userData.noEdges = true;
    const ldoThermalPad = new THREE.Mesh(
      createChamferedBoxGeo(1.9, 1.75, 0.03, 0.1, 0.005, 'z'),
      mats.copperHeatSpreader
    );
    ldoThermalPad.position.set(1.65, 0.42, 0.075);
    ldoThermalPad.userData.noEdges = true;
    const backStarGnd = new THREE.Mesh(
      createChamferedBoxGeo(5.75, 2.45, 0.024, 0.16, 0.004, 'z'),
      mats.copperHeatSpreader
    );
    backStarGnd.position.z = -0.078;
    backStarGnd.userData.noEdges = true;
    sub.add(island, starMoat, ldoThermalPad, backStarGnd);

    // 14 gold star-ground perimeter stitching micro-vias
    const viaGeo = hiResCyl(0.08, 0.08, 0.05, 8).rotateX(Math.PI / 2);
    for (let i = -3; i <= 3; i++) {
      for (const sy of [-1.32, 1.32]) {
        const v = new THREE.Mesh(viaGeo, mats.goldPlating);
        v.position.set(i * 0.85, sy, 0.085);
        v.userData.noEdges = true;
        sub.add(v);
      }
    }

    // Left: 10-Ch Programmable I2C Gamma & VCOM Reference Buffer DAC (QFN-16) + laser ID bar
    const gammaIc = buildChipPackage({
      w: 2.15,
      d: 2.15,
      h: 0.36,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    gammaIc.position.set(-1.62, 0.05, 0.25);
    const dacMark = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.16, 0.02), mats.invarScaleBar);
    dacMark.position.set(-1.62, -0.35, 0.445);
    dacMark.userData.noEdges = true;
    sub.add(gammaIc, dacMark);

    // Right-top: Dual-channel ultra-low-noise (<10µVrms, 85dB PSRR) analog LDO (DFN-8) + laser ID bar
    const ldoIc = buildChipPackage({
      w: 1.55,
      d: 1.45,
      h: 0.32,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.silverElectrode,
      axis: 'z',
    });
    ldoIc.position.set(1.65, 0.46, 0.23);
    const ldoMark = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.14, 0.02), mats.invarScaleBar);
    ldoMark.position.set(1.65, 0.32, 0.405);
    ldoMark.userData.noEdges = true;
    sub.add(ldoIc, ldoMark);

    // Right-bottom: Low-ESR MnO2 tantalum output reservoir cap with beveled polarity bar & J-leads
    const tant = buildTantalumCap(
      1.55,
      0.8,
      0.36,
      mats.tantalumCapYellow,
      mats.copperHeatSpreader,
      mats.silverElectrode,
      'z'
    );
    tant.position.set(1.65, -0.82, 0.25);
    sub.add(tant);

    // Gold Kelvin routing buses linking LDO -> Tantalum -> 0.1% resistor divider -> Gamma DAC
    for (const [rx, ry, rw, rh] of [
      [0.25, 0.44, 1.35, 0.11],
      [0.25, -0.68, 1.35, 0.11],
      [-0.45, 0.44, 0.65, 0.09],
    ] as Array<[number, number, number, number]>) {
      const bus = new THREE.Mesh(new THREE.BoxGeometry(rw, rh, 0.026), mats.goldPlating);
      bus.position.set(rx, ry, 0.078);
      bus.userData.noEdges = true;
      sub.add(bus);
    }

    // Center: Precision 4-resistor 0.1% thin-film Kelvin feedback divider bridge + 2 noise-bypass MLCCs
    for (const [rx, ry] of [
      [-0.08, 0.72],
      [0.52, 0.72],
      [-0.08, 0.16],
      [0.52, 0.16],
    ] as Array<[number, number]>) {
      const res = buildSmdPassive(0.46, 0.28, 0.2, mats.matteBlackAnodized, mats.silverElectrode, 'z');
      res.position.set(rx, ry, 0.16);
      sub.add(res);
    }
    for (const cx of [-0.05, 0.48]) {
      const cap = buildSmdPassive(0.42, 0.68, 0.22, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.position.set(cx, -0.68, 0.17);
      sub.add(cap);
    }

    // 3 circular gold Kelvin oscilloscope test-probe pads along bottom-left
    const tpGeo = hiResCyl(0.14, 0.14, 0.04, 12).rotateX(Math.PI / 2);
    for (let t = 0; t < 3; t++) {
      const tp = new THREE.Mesh(tpGeo, mats.goldPlating);
      tp.position.set(-2.25 + t * 0.56, -1.16, 0.085);
      tp.userData.noEdges = true;
      sub.add(tp);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-tcon-ldo-gamma-ref',
        84,
        '#eab308',
        g,
        new THREE.Vector3(0, 39.85, 7.22),
        new THREE.Vector3(-22, 6, 46),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E85. High-Frequency Sintered Ni-Zn Ferrite Magnetic EMI Noise-Absorber Sheet
  //      (True 9x7 individually micro-beveled pre-cracked sintered ceramic tiles on binder film!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Flexible dark elastomeric backing binder carrier + stepped PET dielectric edge liner + rear score grid!
    const binderBase = new THREE.Mesh(
      createChamferedBoxGeo(22.2, 17.0, 0.05, 0.72, 0.01, 'z'),
      mats.invarScaleBar
    );
    binderBase.position.z = -0.042;
    const petRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(22.8, 17.6, 0.85, 21.4, 16.2, 0.6), 0.036, 0.008, 0.008, 1, 16),
      mats.mylarInsulatorFilm
    );
    petRim.position.z = -0.09;
    // Backside (-Z) matte-black liner panel with subtle silver alignment arrow & score bars
    const rearLiner = new THREE.Mesh(
      createChamferedBoxGeo(21.2, 16.0, 0.022, 0.55, 0.005, 'z'),
      mats.matteBlackAnodized
    );
    rearLiner.position.z = -0.082;
    const rearArrow = new THREE.Mesh(hiResCyl(0.85, 0.85, 0.02, 3).rotateX(Math.PI / 2), mats.silverElectrode);
    rearArrow.position.set(0, 4.8, -0.095);
    rearArrow.userData.noEdges = true;
    g.add(binderBase, petRim, rearLiner, rearArrow);

    // Authentic 9x7 pre-cracked sintered Ni-Zn ferrite micro-beveled tile matrix (real TDK/Wurth flexible ferrite!)
    const tileGeo = createChamferedBoxGeo(2.22, 2.18, 0.11, 0.12, 0.022, 'z');
    for (let ix = -4; ix <= 4; ix++) {
      for (let iy = -3; iy <= 3; iy++) {
        // Leave 4 corner die-cut registration notches clean!
        if (Math.abs(ix) === 4 && Math.abs(iy) === 3) continue;
        const tile = new THREE.Mesh(tileGeo, mats.ferriteInductor);
        tile.position.set(ix * 2.4, iy * 2.36, 0.032);
        tile.userData.noEdges = true;
        g.add(tile);
      }
    }

    // 4 corner die-cut chamfered registration key-tabs + laser batch-code metallic print stripe + bottom-right peel tab
    const keyTabGeo = createChamferedBoxGeo(1.7, 1.6, 0.09, 0.25, 0.015, 'z');
    for (const sx of [-9.6, 9.6]) {
      for (const sy of [-7.08, 7.08]) {
        const kt = new THREE.Mesh(keyTabGeo, mats.matteBlackAnodized);
        kt.position.set(sx, sy, 0.02);
        g.add(kt);
      }
    }
    const batchPrint = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 1.4, 0.024, 0.15, 0.005, 'z'),
      mats.ultra.evfTconEmiCan
    );
    batchPrint.position.set(0, -5.0, 0.096);
    batchPrint.userData.noEdges = true;
    const peelTab = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 0.9, 0.04, 0.18, 0.008, 'z'),
      mats.polyimideFpc
    );
    peelTab.position.set(10.1, -8.15, -0.06);
    peelTab.userData.noEdges = true;
    g.add(batchPrint, peelTab);

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-tcon-ferrite-absorber',
        85,
        '#475569',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 10.4),
        new THREE.Vector3(0, 16, 62),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // E86. Sony OEM Ref.454 (500490202) Pyrolytic Graphite Heat-Spreader Bridge
  //      (Multi-tier PGS + V-chevron heat-funnel ribs + copper collector + lower chassis thermal foil!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Primary shaped PGS pyrolytic graphite sheet with downward main-chassis thermal tongue
    const pgsShape = new THREE.Shape();
    pgsShape.moveTo(-12.6, 8.6);
    pgsShape.lineTo(12.6, 8.6);
    pgsShape.lineTo(13.2, 7.8);
    pgsShape.lineTo(13.2, -7.8);
    pgsShape.lineTo(12.0, -8.8);
    pgsShape.lineTo(6.2, -8.8);
    pgsShape.lineTo(5.6, -11.2);
    pgsShape.lineTo(-5.6, -11.2);
    pgsShape.lineTo(-6.2, -8.8);
    pgsShape.lineTo(-12.0, -8.8);
    pgsShape.lineTo(-13.2, -7.8);
    pgsShape.lineTo(-13.2, 7.8);
    pgsShape.closePath();
    addCircleHoles(pgsShape, [
      [-11.4, 6.8, 0.72],
      [11.4, 6.8, 0.72],
      [-11.4, -6.8, 0.72],
      [11.4, -6.8, 0.72],
    ]);
    const pgsGeo = applyPlanarUVs(extrudeHiRes(pgsShape, 0.16, 0.02, 0.02, 1, 16), 26.4, 19.8, 'xy');
    const pgsBody = new THREE.Mesh(pgsGeo, mats.carbonFiberBlade);
    g.add(pgsBody);

    // Ref.356/361 wrap-around PET + amber Kapton dielectric edge-sealing border (prevents graphite dust shorts!)
    const insBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(25.6, 16.8, 0.9, 23.2, 14.4, 0.65), 0.045, 0.008, 0.008, 1, 16),
      mats.polyimideFpc
    );
    insBorder.position.z = -0.115;
    const petShield = new THREE.Mesh(
      extrudeHiRes(createFrameShape(24.6, 15.8, 0.8, 22.8, 14.0, 0.6), 0.03, 0.006, 0.006, 1, 16),
      mats.mylarInsulatorFilm
    );
    petShield.position.z = 0.105;
    // Backside (-Z) segmented acrylic thermal-interface adhesive transfer grid
    const backPsaTile = new THREE.BoxGeometry(5.8, 3.6, 0.026);
    for (const bx of [-4.2, 4.2]) {
      for (const by of [-2.8, 2.8]) {
        const bp = new THREE.Mesh(backPsaTile, mats.thermalTransferTape);
        bp.position.set(bx, by, -0.108);
        bp.userData.noEdges = true;
        g.add(bp);
      }
    }
    g.add(insBorder, petShield);

    // 4 CNC copper-foil reinforced alignment eyelet collars around mounting holes
    const eyeletGeo = createUltraRingGeo(0.74, 1.32, 0.19, 0.02, 20);
    for (const [ex, ey] of [
      [-11.4, 6.8],
      [11.4, 6.8],
      [-11.4, -6.8],
      [11.4, -6.8],
    ] as Array<[number, number]>) {
      const eye = new THREE.Mesh(eyeletGeo, mats.copperHeatSpreader);
      eye.position.set(ex, ey, 0.015);
      g.add(eye);
    }

    // Stepped dual-ply central copper-foil thermal collector patch with air-bleed vent pinholes + lower tongue copper pad!
    const cuCollectorShape = createRoundedRectShape(16.4, 9.6, 0.8);
    addCircleHoles(cuCollectorShape, [
      [-5.6, -2.8, 0.32],
      [5.6, -2.8, 0.32],
      [-5.6, 2.8, 0.32],
      [5.6, 2.8, 0.32],
    ]);
    const cuCollector = new THREE.Mesh(
      applyPlanarUVs(extrudeHiRes(cuCollectorShape, 0.055, 0.01, 0.01, 1, 16), 16.4, 9.6, 'xy'),
      mats.ultra.cfeCopperThermal
    );
    cuCollector.position.set(0, 0.6, 0.115);
    const tongueFoil = new THREE.Mesh(
      createChamferedBoxGeo(10.2, 2.0, 0.048, 0.25, 0.008, 'z'),
      mats.copperHeatSpreader
    );
    tongueFoil.position.set(0, -10.05, 0.105);
    g.add(cuCollector, tongueFoil);

    // Embossed vertical + angled V-chevron heat-flow directional crease ribs channeling thermal flux downward!
    const ribVGeo = createChamferedBoxGeo(0.46, 11.4, 0.045, 0.12, 0.008, 'z');
    for (const rx of [-3.6, 0, 3.6]) {
      const r = new THREE.Mesh(ribVGeo, mats.evfHousingMg);
      r.position.set(rx, -2.6, 0.15);
      r.userData.noEdges = true;
      g.add(r);
    }
    const chevGeo = createChamferedBoxGeo(0.32, 4.4, 0.04, 0.08, 0.008, 'z');
    for (const sx of [-1, 1]) {
      const ch = new THREE.Mesh(chevGeo, mats.invarScaleBar);
      ch.position.set(sx * 5.6, -5.6, 0.145);
      ch.rotation.z = sx * 0.42;
      ch.userData.noEdges = true;
      g.add(ch);
    }

    // Lower chassis-contact hinge crease bar + upper/lower acrylic thermal-transfer adhesive pads + OEM label
    const hingeCrease = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.24, 0.06), mats.stainlessMachined);
    hingeCrease.position.set(0, -8.82, 0.12);
    hingeCrease.userData.noEdges = true;
    for (const sy of [-10.05, 7.25]) {
      const pad = new THREE.Mesh(
        createChamferedBoxGeo(9.6, 1.45, 0.075, 0.22, 0.01, 'z'),
        mats.thermalTransferTape
      );
      pad.position.set(0, sy, 0.135);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    const label = new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.1, 0.036), mats.ultra.evfVfRadiationSheet);
    label.position.set(0, 1.2, 0.165);
    label.userData.noEdges = true;
    g.add(hingeCrease, label);

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-thermal-graphite-bridge',
        86,
        '#111827',
        g,
        new THREE.Vector3(0, 39.2, 15.02),
        new THREE.Vector3(0, -14, 88),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E87. Sony OEM Ref.352 (502789501) High-Permeability Permalloy Magnetic Field Cut Plate
  //      (Deep-drawn lip skirt + central E39 bore collar + cross-hatched flux swages + CuBe2 ground lances!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Formed 78% Ni-Fe Permalloy plate with true R=0.95mm central E39 OEM bolt bore at (0, -1.0)
    const plateShape = createRoundedRectShape(22.4, 13.0, 1.1);
    addCircleHoles(plateShape, [
      [0, -1.0, 0.95],
      [-9.6, -4.8, 0.72],
      [9.6, -4.8, 0.72],
      [-9.6, 4.8, 0.72],
      [9.6, 4.8, 0.72],
    ]);
    const plate = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(plateShape, 0.34, 0.035, 0.035, 2, 18).rotateX(Math.PI / 2), 18),
      mats.kovarSeal
    );
    g.add(plate);

    // Upturned deep-drawn perimeter stiffening & edge-flux containment flange skirt
    const lipSkirt = new THREE.Mesh(
      extrudeHiRes(createFrameShape(22.4, 13.0, 1.1, 21.1, 11.7, 0.75), 0.24, 0.025, 0.025, 2, 18).rotateX(
        Math.PI / 2
      ),
      mats.kovarSeal
    );
    lipSkirt.position.y = 0.2;
    g.add(lipSkirt);

    // Chamfered drawn reinforcement collar around central E39 OEM bolt clearance hole (0, -1.0)
    const boreCollar = new THREE.Mesh(
      createUltraRingGeo(0.98, 1.65, 0.16, 0.025, 24).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    boreCollar.position.set(0, 0.24, -1.0);
    g.add(boreCollar);

    // Cross-hatched magnetic flux-shunt louver swage ribs + 4 stamped quadrant annealing relief pockets!
    const longRibGeo = createChamferedBoxGeo(16.6, 0.18, 0.88, 0.22, 0.025, 'y');
    for (const rz of [-3.85, 3.55]) {
      const rib = new THREE.Mesh(longRibGeo, mats.stainlessMachined);
      rib.position.set(0, 0.25, rz);
      g.add(rib);
    }
    const crossRibGeo = createChamferedBoxGeo(0.72, 0.15, 6.2, 0.16, 0.02, 'y');
    for (const rx of [-6.8, -3.4, 3.4, 6.8]) {
      const cr = new THREE.Mesh(crossRibGeo, mats.invarScaleBar);
      cr.position.set(rx, 0.23, -0.15);
      cr.userData.noEdges = true;
      g.add(cr);
    }
    const reliefPocketGeo = createChamferedBoxGeo(2.05, 0.09, 1.75, 0.28, 0.015, 'y');
    for (const px of [-5.1, 5.1]) {
      for (const pz of [-1.45, 1.2]) {
        const rp = new THREE.Mesh(reliefPocketGeo, mats.matteBlackAnodized);
        rp.position.set(px, 0.2, pz);
        rp.userData.noEdges = true;
        g.add(rp);
      }
    }

    // 4 countersunk mounting bosses + 4 formed CuBe2 spring-grounding lances + spot-weld nuggets
    const bossRingGeo = createUltraRingGeo(0.74, 1.24, 0.14, 0.02, 18).rotateX(Math.PI / 2);
    const lanceGeo = createChamferedBoxGeo(1.8, 0.1, 0.72, 0.12, 0.015, 'y');
    for (const [bx, bz] of [
      [-9.6, -4.8],
      [9.6, -4.8],
      [-9.6, 4.8],
      [9.6, 4.8],
    ] as Array<[number, number]>) {
      const br = new THREE.Mesh(bossRingGeo, mats.stainlessMachined);
      br.position.set(bx, 0.22, bz);
      const lance = new THREE.Mesh(lanceGeo, mats.beCuSpring);
      lance.position.set(bx - Math.sign(bx) * 2.0, 0.26, bz);
      lance.rotation.z = Math.sign(bx) * 0.08;
      g.add(br, lance);
    }

    // Laser annealing ID stamp + directional arrow + notched underside flame-retardant Mylar dielectric insulator
    const idStamp = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.04, 1.5), mats.invarScaleBar);
    idStamp.position.set(0, 0.19, 1.65);
    idStamp.userData.noEdges = true;
    const annealArrow = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.05, 3), mats.goldPlating);
    annealArrow.position.set(0, 0.21, -2.55);
    annealArrow.userData.noEdges = true;
    const mylarShape = createRoundedRectShape(21.4, 12.0, 0.9);
    addCircleHoles(mylarShape, [[0, -1.0, 1.05]]);
    const mylar = new THREE.Mesh(
      extrudeHiRes(mylarShape, 0.08, 0.01, 0.01, 1, 16).rotateX(Math.PI / 2),
      mats.mylarInsulatorFilm
    );
    mylar.position.y = -0.25;
    mylar.userData.noEdges = true;
    g.add(
      idStamp,
      annealArrow,
      mylar,
      buildSpotWeldNuggets(
        [
          [-7.6, 0.23, -5.2],
          [7.6, 0.23, -5.2],
          [-7.6, 0.23, 5.2],
          [7.6, 0.23, 5.2],
        ],
        0.3,
        'y',
        mats.kovarSeal,
        mats.goldPlating
      )
    );

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-chassis-permalloy-shield',
        87,
        '#64748b',
        g,
        new THREE.Vector3(0, 24.78, -10.0),
        new THREE.Vector3(0, -38, -8),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E88. 45° Dichroic Beam-Splitter (E06) Kinematic 3-Point Cradle & CuBe2 Clips
  //      (Thorlabs Polaris-style: 3 sapphire-seated balls, bifurcated CuBe2 springs, 100-TPI brass lock-nuts!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // CNC lightweighted 7075 black-anodized cradle with 45° clear-edge relief & trunnion bore + dowel bores
    const cradleShape = new THREE.Shape();
    cradleShape.moveTo(-2.65, -2.75);
    cradleShape.lineTo(1.85, -2.75);
    cradleShape.lineTo(2.65, -1.95); // 45° clear-edge optical beam relief chamfer!
    cradleShape.lineTo(2.65, 2.75);
    cradleShape.lineTo(-1.85, 2.75);
    cradleShape.lineTo(-2.65, 1.95);
    cradleShape.closePath();
    addCircleHoles(cradleShape, [
      [0, 0, 1.15],
      [-1.85, -1.85, 0.34],
      [1.85, 1.85, 0.34],
    ]);
    const cradleGeo = extrudeHiRes(cradleShape, 0.72, 0.045, 0.045, 2, 20).rotateY(Math.PI / 2);
    const bronzeBushGeo = createUltraRingGeo(1.04, 1.24, 0.78, 0.025, 24).rotateY(Math.PI / 2);
    const sapphireSeatGeo = createUltraRingGeo(0.18, 0.44, 0.14, 0.02, 16).rotateY(Math.PI / 2);
    const ballGeo = hiResSphere(0.28, 12, 10);
    const leafFingerGeo = createChamferedBoxGeo(0.14, 4.3, 0.36, 0.04, 0.015, 'z');
    const rolledTipGeo = hiResCyl(0.15, 0.15, 0.42, 12).rotateX(Math.PI / 2);
    const lockCollarGeo = createUltraRingGeo(0.32, 0.64, 0.26, 0.025, 6).rotateY(Math.PI / 2);
    const tick45Geo = new THREE.BoxGeometry(0.05, 0.12, 0.95);

    for (const sx of [-1, 1]) {
      const cradle = new THREE.Mesh(cradleGeo, mats.matteBlackAnodized);
      cradle.position.set(sx * 12.88, 0, 0);
      const bush = new THREE.Mesh(bronzeBushGeo, mats.brassGear);
      bush.position.set(sx * 12.88, 0, 0);
      // Laser-etched 45° optical-plane calibration index marks on outer cradle face
      const tick = new THREE.Mesh(tick45Geo, mats.silverElectrode);
      tick.position.set(sx * 13.28, -2.25, -0.3);
      tick.rotation.x = Math.PI / 4;
      tick.userData.noEdges = true;
      g.add(cradle, bush, tick);

      // 3 hardened steel kinematic contact balls seated inside conical sapphire datum rings!
      for (const [by, bz] of [
        [-1.78, -1.78],
        [1.78, -1.78],
        [0, 1.92],
      ] as Array<[number, number]>) {
        const seat = new THREE.Mesh(sapphireSeatGeo, mats.evfMlaGlass);
        seat.position.set(sx * 12.5, by, bz);
        const ball = new THREE.Mesh(ballGeo, mats.titaniumRivet);
        ball.position.set(sx * 12.44, by, bz);
        ball.userData.noEdges = true;
        g.add(seat, ball);
      }

      // Bifurcated dual-finger 0.6N CuBe2 stress-free leaf spring angled at 45° with rolled gold contact tips!
      const springPivot = new THREE.Group();
      springPivot.position.set(sx * 13.32, 0, 0);
      springPivot.rotation.x = Math.PI / 4;
      for (const fz of [-0.34, 0.34]) {
        const finger = new THREE.Mesh(leafFingerGeo, mats.beCuSpring);
        finger.position.set(0, 0, fz);
        springPivot.add(finger);
        for (const ty of [-2.08, 2.08]) {
          const tip = new THREE.Mesh(rolledTipGeo, mats.goldPlating);
          tip.position.set(-sx * 0.08, ty, fz);
          tip.userData.noEdges = true;
          springPivot.add(tip);
        }
      }
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.15, 1.1), mats.beCuSpring);
      springPivot.add(bridge);
      g.add(springPivot);

      // Twin hex-fluted 100-TPI brass lock-nut collars + M1.0 stainless Phillips anchor screws (head facing outward!)
      for (const [sy, sz] of [
        [1.85, -1.65],
        [-1.85, 1.65],
      ] as Array<[number, number]>) {
        const collar = new THREE.Mesh(lockCollarGeo, mats.brassGear);
        collar.position.set(sx * 13.34, sy, sz);
        const scr = buildPhillipsScrew(
          0.52,
          0.22,
          0.26,
          0.56,
          mats.stainlessMachined,
          mats.matteBlackAnodized,
          mats.titaniumRivet
        );
        scr.rotation.z = sx > 0 ? Math.PI / 2 : -Math.PI / 2;
        scr.position.set(sx * 13.47, sy, sz);
        g.add(collar, scr);
      }
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-dichroic-kinematic-clips',
        88,
        '#f59e0b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -23.6),
        new THREE.Vector3(-28, 4, -20),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E89. Knife-Edge Exit-Pupil Lyot Glare-Stop Aperture Ring & Flocked Baffle
  //      (Multi-stepped sawtooth grooves + spanner notches + 15° optical-axis ticks + D-flat y=-10.08!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision CNC D-flat Lyot glare stop (outer R=11.25 clipped cleanly at y=-10.08 -> world Y=29.42, clears E20!)
    const outerR = 11.25;
    const flatY = -10.08;
    const flatHalfX = Math.sqrt(outerR * outerR - flatY * flatY);
    const startAng = Math.atan2(flatY, flatHalfX);
    const endAng = Math.atan2(flatY, -flatHalfX) + Math.PI * 2;
    const lyotShape = new THREE.Shape();
    lyotShape.absarc(0, 0, outerR, startAng, endAng, false);
    lyotShape.closePath();
    const pupilHole = new THREE.Path();
    pupilHole.absarc(0, 0, 9.25, 0, Math.PI * 2, true);
    lyotShape.holes.push(pupilHole);

    const lyotRing = new THREE.Mesh(
      extrudeHiRes(lyotShape, 0.13, 0.018, 0.018, 2, 56),
      mats.matteBlackAnodized
    );
    g.add(lyotRing);

    // 5 concentric micro-stepped sawtooth anti-reflection light-trap rings + bright knife-edge inner bevel on BOTH faces!
    for (const [ir, or, pz, mat] of [
      [9.04, 9.26, 0, mats.kovarSeal],
      [9.26, 9.54, -0.068, mats.velvetFlockTrap],
      [9.64, 9.88, -0.072, mats.invarScaleBar],
      [9.26, 9.54, 0.068, mats.velvetFlockTrap],
      [9.64, 9.88, 0.072, mats.invarScaleBar],
    ] as Array<[number, number, number, THREE.Material]>) {
      const step = new THREE.Mesh(createUltraRingGeo(ir, or, 0.032, 0.006, 52), mat);
      step.position.z = pz;
      step.userData.noEdges = true;
      g.add(step);
    }

    // CNC-machined lower D-flat stiffening flange rib + twin micro-bolts cleanly hugging y=-9.82 (strictly >= -10.06!)
    const dFlatRib = new THREE.Mesh(
      createChamferedBoxGeo(flatHalfX * 1.72, 0.36, 0.155, 0.08, 0.015, 'z'),
      mats.invarScaleBar
    );
    dFlatRib.position.set(0, -9.84, 0);
    g.add(dFlatRib);

    // Laser-etched 15° optical-axis alignment vernier scale ticks + 6 radial thermal kerf reliefs + 2 optical spanner notches!
    const kerfGeo = new THREE.BoxGeometry(0.68, 0.16, 0.165);
    for (const deg of [15, 55, 125, 165, 225, 315]) {
      const rad = (deg * Math.PI) / 180;
      const k = new THREE.Mesh(kerfGeo, mats.silverElectrode);
      k.position.set(Math.cos(rad) * 10.38, Math.sin(rad) * 10.38, 0);
      k.rotation.z = rad;
      k.userData.noEdges = true;
      g.add(k);
    }
    const fineTickGeo = new THREE.BoxGeometry(0.32, 0.08, 0.165);
    for (let deg = 0; deg <= 180; deg += 15) {
      if (deg === 15 || deg === 55 || deg === 125 || deg === 165) continue;
      const rad = (deg * Math.PI) / 180;
      const tk = new THREE.Mesh(fineTickGeo, mats.goldPlating);
      tk.position.set(Math.cos(rad) * 10.55, Math.sin(rad) * 10.55, 0);
      tk.rotation.z = rad;
      tk.userData.noEdges = true;
      g.add(tk);
    }
    // 2 machined optical-bench spanner-wrench assembly slot bushings at 0° and 180°
    const spannerSeatGeo = createUltraRingGeo(0.18, 0.36, 0.17, 0.015, 14);
    for (const sx of [-10.45, 10.45]) {
      const sp = new THREE.Mesh(spannerSeatGeo, mats.brassGear);
      sp.position.set(sx, 0, 0);
      g.add(sp);
    }

    // 3 spring-bent stepped stainless retention tangs (at +90°, +205°, +335°) with dual titanium micro-dowel pins!
    const tangGeo = createChamferedBoxGeo(0.82, 0.56, 0.155, 0.06, 0.015, 'z');
    const pinGeo = hiResCyl(0.14, 0.14, 0.175, 10).rotateX(Math.PI / 2);
    for (const ang of [Math.PI / 2, (205 * Math.PI) / 180, (335 * Math.PI) / 180]) {
      const tang = new THREE.Mesh(tangGeo, mats.mountStainlessFlange);
      tang.position.set(Math.cos(ang) * 11.12, Math.sin(ang) * 11.12, 0);
      tang.rotation.z = ang;
      const dowel = new THREE.Mesh(pinGeo, mats.titaniumRivet);
      dowel.position.set(Math.cos(ang) * 10.65, Math.sin(ang) * 10.65, 0);
      dowel.userData.noEdges = true;
      g.add(tang, dowel);
    }

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-pupil-glare-stop',
        89,
        '#0f172a',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -19.95),
        new THREE.Vector3(24, 14, -18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E90. Anti-Condensation Transparent ITO Micro-Heater Busbar & PTC Limiter
  //      (Abrisa/TFD heated optical glass: full 4-side gold/silver comb busbar, PTC + NTC + 4-pad FFC tail!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Sputtered transparent cyan-tinted ITO conductive heating film (Z in [-30.80, -30.70])
    const itoFilm = new THREE.Mesh(
      createChamferedBoxGeo(21.9, 16.3, 0.028, 2.1, 0.004, 'z'),
      mats.fluorineCoatCyan
    );
    g.add(itoFilm);

    // Hair-thin transparent conductive micro-mesh heating grid (11x7 micro-lines catching subtle light!)
    const meshVGeo = new THREE.BoxGeometry(0.055, 15.6, 0.014);
    for (let ix = -5; ix <= 5; ix++) {
      const mv = new THREE.Mesh(meshVGeo, mats.silverElectrode);
      mv.position.set(ix * 1.9, 0, -0.012);
      mv.userData.noEdges = true;
      g.add(mv);
    }
    const meshHGeo = new THREE.BoxGeometry(21.2, 0.055, 0.014);
    for (let iy = -3; iy <= 3; iy++) {
      const mh = new THREE.Mesh(meshHGeo, mats.silverElectrode);
      mh.position.set(0, iy * 2.1, -0.012);
      mh.userData.noEdges = true;
      g.add(mh);
    }

    // Dual-rail fired-silver frit perimeter collector busbar frame + full 4-side gold equalization ladder teeth (BOTH faces!)
    const silverBus = new THREE.Mesh(
      extrudeHiRes(createFrameShape(23.2, 17.6, 2.6, 21.6, 16.0, 2.1), 0.064, 0.01, 0.01, 1, 20),
      mats.kovarSeal
    );
    g.add(silverBus);

    const toothHGeo = new THREE.BoxGeometry(0.26, 0.44, 0.026);
    const toothVGeo = new THREE.BoxGeometry(0.44, 0.26, 0.026);
    const feederHGeo = new THREE.BoxGeometry(18.6, 0.3, 0.026);
    const feederVGeo = new THREE.BoxGeometry(0.3, 12.6, 0.026);
    const termTabGeo = createChamferedBoxGeo(1.55, 0.82, 0.036, 0.12, 0.006, 'z');
    const domeGeo = hiResSphere(0.18, 10, 8);
    const cornerPatchGeo = createChamferedBoxGeo(0.76, 0.76, 0.028, 0.22, 0.005, 'z');

    for (const sz of [-1, 1]) {
      for (let i = -4; i <= 4; i++) {
        for (const sy of [-7.95, 7.95]) {
          const th = new THREE.Mesh(toothHGeo, mats.goldPlating);
          th.position.set(i * 2.0, sy, sz * 0.034);
          th.userData.noEdges = true;
          g.add(th);
        }
      }
      for (let j = -2; j <= 2; j++) {
        for (const sx of [-10.75, 10.75]) {
          const tv = new THREE.Mesh(toothVGeo, mats.goldPlating);
          tv.position.set(sx, j * 2.35, sz * 0.034);
          tv.userData.noEdges = true;
          g.add(tv);
        }
      }
      for (const sy of [-8.38, 8.38]) {
        const f = new THREE.Mesh(feederHGeo, mats.goldPlating);
        f.position.set(0, sy, sz * 0.036);
        f.userData.noEdges = true;
        g.add(f);
      }
      for (const sx of [-11.18, 11.18]) {
        const fv = new THREE.Mesh(feederVGeo, mats.copperHeatSpreader);
        fv.position.set(sx, 0, sz * 0.036);
        fv.userData.noEdges = true;
        g.add(fv);
      }
    }

    // Corner polyimide stress-relief patches neatly tucked inside r=2.6 rounded busbar corner + corner solder domes!
    for (const [cx, cy] of [
      [-9.95, 7.22],
      [9.95, -7.22],
    ] as Array<[number, number]>) {
      const cpMesh = new THREE.Mesh(cornerPatchGeo, mats.polyimideFpc);
      cpMesh.position.set(cx, cy, -0.028);
      cpMesh.userData.noEdges = true;
      g.add(cpMesh);
    }
    for (const [tx, ty] of [
      [-9.2, -8.35],
      [9.2, 8.35],
    ] as Array<[number, number]>) {
      const tab = new THREE.Mesh(termTabGeo, mats.goldPlating);
      tab.position.set(tx, ty, -0.026);
      const dome = new THREE.Mesh(domeGeo, mats.solderBallSilver);
      dome.scale.set(1.2, 0.9, 0.28);
      dome.position.set(tx, ty, -0.044);
      dome.userData.noEdges = true;
      g.add(tab, dome);
    }

    // Bottom-right BaTiO3 ceramic PTC limiter (38°C) + 0201 NTC feedback thermistor + 4-pad gold FFC heater tail!
    const ptcPad = new THREE.Mesh(
      createChamferedBoxGeo(2.5, 0.96, 0.056, 0.12, 0.006, 'z'),
      mats.copperHeatSpreader
    );
    ptcPad.position.set(9.2, -8.35, 0);
    const ptc = buildSmdPassive(1.32, 0.72, 0.095, mats.smdCeramic, mats.silverElectrode, 'z');
    ptc.position.set(9.2, -8.35, -0.008);
    const ntc = buildSmdPassive(0.68, 0.38, 0.088, mats.icEpoxy, mats.silverElectrode, 'z');
    ntc.position.set(7.45, -8.35, -0.008);
    const flexTail = new THREE.Mesh(
      createChamferedBoxGeo(3.9, 0.84, 0.058, 0.14, 0.008, 'z'),
      mats.polyimideFpc
    );
    flexTail.position.set(4.85, -8.35, 0);
    const ffcPadGeo = new THREE.BoxGeometry(0.45, 0.54, 0.076);
    for (const vx of [3.35, 4.35, 5.35, 6.35]) {
      const fp = new THREE.Mesh(ffcPadGeo, mats.goldPlating);
      fp.position.set(vx, -8.35, 0);
      fp.userData.noEdges = true;
      g.add(fp);
    }
    g.add(ptcPad, ptc, ntc, flexTail);

    parts.push(
      finalizeStandaloneEvfUltraPart(
        'evf-eyepiece-ito-defogger',
        90,
        '#06b6d4',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -30.75),
        new THREE.Vector3(-26, -12, -42),
        cp,
        0.22
      )
    );
  }

  return parts;
}
