import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeCfexpressUltra28Part(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.2
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 32, edgeOpacity);

  return {
    id,
    subsystem: 'cfexpress',
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

/**
 * Phase 28 — Standalone CFexpress 4.0 Card Ultra-Microscopic & 2026 Cutting-Edge Expansion
 * (+30 Parts C71–C100 -> 100 Total Parts!).
 */
export function buildCfexpressUltra28Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // C71. 30 μin Cobalt-Hardened Gold + 150 μin Nickel Diffusion Barrier Cross-Section
  // =========================================================================
  {
    const g = new THREE.Group();
    // 5-tier stepped metallurgical cutaway slab of an edge finger:
    // 1) Megtron dielectric substrate  2) 35μm Pure Copper pad  3) 150μin Nickel barrier with columnar grain ribs
    // 4) 30μin Cobalt-Hardened Gold armor  5) 5 stepped sample fingers with Cobalt micro-hardening nodes!
    const subCore = new THREE.Mesh(
      createChamferedBoxGeo(11.9, 4.1, 0.16, 0.26, 0.03, 'z'),
      u.cfeGlassWeaveCore
    );
    subCore.position.z = -0.40;

    const cuBase = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 3.8, 0.22, 0.24, 0.04, 'z'),
      mats.copperCoil
    );
    cuBase.position.z = -0.22;

    const niBarrier = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 3.65, 0.20, 0.22, 0.04, 'z'),
      mats.stainlessMachined
    );
    niBarrier.position.z = 0.02;

    // Micro columnar Nickel grain ribs exposed along the cutaway lower edge
    const grainGeo = new THREE.BoxGeometry(0.14, 0.22, 0.18);
    for (let i = -10; i <= 10; i++) {
      const gr = new THREE.Mesh(grainGeo, mats.silverElectrode);
      gr.position.set(i * 0.52, -1.84, 0.02);
      gr.userData.noEdges = true;
      g.add(gr);
    }

    const coAuTop = new THREE.Mesh(
      createChamferedBoxGeo(11.2, 3.5, 0.18, 0.2, 0.04, 'z'),
      mats.goldPlating
    );
    coAuTop.position.z = 0.22;

    // 5 stepped individual metallurgical sample fingers + micro cobalt hardening crystal nodes
    const tipGeo = createChamferedBoxGeo(1.18, 2.75, 0.12, 0.22, 0.03, 'z');
    const coNodeGeo = hiResSphere(0.12, 8, 6);
    for (let i = 0; i < 5; i++) {
      const fx = -4.2 + i * 2.1;
      const tip = new THREE.Mesh(tipGeo, mats.rfGoldCoax);
      tip.position.set(fx, -0.15, 0.36);
      tip.userData.noEdges = true;
      g.add(tip);
      for (const cy of [-0.75, 0.55]) {
        const co = new THREE.Mesh(coNodeGeo, mats.vcWorkingFluidCyan);
        co.position.set(fx, cy, 0.44);
        co.userData.noEdges = true;
        g.add(co);
      }
    }

    g.add(subCore, cuBase, niBarrier, coAuTop);
    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-hard-gold-ni-barrier',
        71,
        '#facc15',
        g,
        new THREE.Vector3(-4.5, -24.4, 0.05),
        new THREE.Vector3(-26, -92, 42),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C72. PCIe Gen4 AC-Coupling Capacitor Ground Reference Anti-Pad Void Cutout
  // =========================================================================
  {
    const g = new THREE.Group();
    const l2Void = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.8, 5.8, 0.45, 9.6, 2.8, 0.28), 0.14, 0.02, 0.02, 1, 16),
      u.cfeCopperThermal
    );
    l2Void.position.z = 0.14;

    const l3Void = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.8, 5.8, 0.45, 8.8, 2.2, 0.24), 0.14, 0.02, 0.02, 1, 16),
      mats.copperCoil
    );
    l3Void.position.z = -0.18;

    // Dielectric core visible inside the carved void window + 4 gold SMT pad pairs + miniature 0201 cap footprints!
    const coreWindow = new THREE.Mesh(
      createChamferedBoxGeo(9.4, 2.6, 0.18, 0.2, 0.02, 'z'),
      u.cfeGlassWeaveCore
    );
    coreWindow.position.z = -0.02;
    coreWindow.userData.noEdges = true;

    const traceGeo = new THREE.BoxGeometry(0.24, 1.35, 0.07);
    for (let i = 0; i < 4; i++) {
      const px = -3.9 + i * 2.6;
      for (const py of [-0.72, 0.72]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.68, 0.08), mats.goldPlating);
        pad.position.set(px, py, 0.28);
        pad.userData.noEdges = true;
        const lead = new THREE.Mesh(traceGeo, mats.copperCoil);
        lead.position.set(px, py * 2.55, 0.26);
        lead.userData.noEdges = true;
        g.add(pad, lead);
      }
      const miniCap = buildSmdPassive(1.55, 0.85, 0.34, mats.smdCeramic, mats.silverElectrode, 'z');
      miniCap.rotation.z = Math.PI / 2;
      miniCap.position.set(px, 0, 0.46);
      g.add(miniCap);
    }

    // 10 flanking ground-return stitching vias ringing the anti-pad void perimeter
    const viaGeo = hiResCyl(0.20, 0.20, 0.48, 10).rotateX(Math.PI / 2);
    for (let v = 0; v < 5; v++) {
      const vx = -5.2 + v * 2.6;
      for (const vy of [-2.2, 2.2]) {
        const via = new THREE.Mesh(viaGeo, mats.goldPlating);
        via.position.set(vx, vy, 0);
        via.userData.noEdges = true;
        g.add(via);
      }
    }

    g.add(l2Void, l3Void, coreWindow);
    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-ac-cap-antipad-void',
        72,
        '#06b6d4',
        g,
        new THREE.Vector3(-2.0, -18.5, 0.24),
        new THREE.Vector3(-64, -92, 18),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C73. Low-Dk Spread E-Glass Weave Core & 10° Rotated Skew-Free Routing
  // =========================================================================
  {
    const g = new THREE.Group();
    const weaveGeo = createChamferedBoxGeo(12.4, 8.6, 0.26, 0.45, 0.04, 'z');
    applyPlanarUVs(weaveGeo, 12.4, 8.6, 'xy');
    const weaveSlab = new THREE.Mesh(weaveGeo, u.cfeGlassWeaveCore);
    g.add(weaveSlab);

    // True interlaced over/under spread 1067 E-glass cylindrical fiber bundles (warp + weft)!
    const weftGeo = hiResCyl(0.14, 0.14, 11.6, 8).rotateZ(Math.PI / 2);
    for (let r = -2; r <= 2; r++) {
      const weft = new THREE.Mesh(weftGeo, mats.quartzOlpf);
      weft.scale.set(1, 1.35, 0.45);
      weft.position.set(0, r * 1.45, 0.16);
      weft.userData.noEdges = true;
      g.add(weft);
    }
    const warpGeo = hiResCyl(0.14, 0.14, 7.8, 8);
    for (let c = -3; c <= 3; c++) {
      const warp = new THREE.Mesh(warpGeo, mats.interlayerDielectric);
      warp.scale.set(1.35, 1, 0.45);
      warp.position.set(c * 1.65, 0, 0.18);
      warp.userData.noEdges = true;
      g.add(warp);
    }

    // 10-degree angled zig-zag differential PCIe Gen4 copper/gold pair crossing glass weave uniformly + angle guide!
    for (const offset of [-0.52, 0.52]) {
      const pts = [
        new THREE.Vector3(-5.3, offset - 0.92, 0.28),
        new THREE.Vector3(-1.8, offset + 0.18, 0.28),
        new THREE.Vector3(1.8, offset - 0.36, 0.28),
        new THREE.Vector3(5.3, offset + 0.72, 0.28),
      ];
      const curve = new THREE.CatmullRomCurve3(pts);
      const trace = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(curve, 24, 0.14, 6, false)),
        offset < 0 ? mats.copperCoil : mats.goldPlating
      );
      trace.userData.noEdges = true;
      g.add(trace);
    }

    // Reference 0° horizontal axis hair-line + 10° arc sector illustrating anti-skew weave rotation!
    const refAxis = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.08, 0.06), mats.vcWorkingFluidCyan);
    refAxis.position.set(0, -2.95, 0.24);
    refAxis.userData.noEdges = true;
    const degArc = new THREE.Mesh(hiResTorus(2.2, 0.06, 6, 16, 0.35), mats.goldPlating);
    degArc.position.set(-4.6, -2.95, 0.25);
    degArc.userData.noEdges = true;
    g.add(refAxis, degArc);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-glass-weave-rotated',
        73,
        '#10b981',
        g,
        new THREE.Vector3(-3.0, -14.0, -0.18),
        new THREE.Vector3(-102, -56, -24),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C74. Perimeter λ/20 GND Stitching Via Fence & Teardrop Trace Fillets
  // =========================================================================
  {
    const g = new THREE.Group();
    const topRail = new THREE.Mesh(
      extrudeHiRes(createFrameShape(32.2, 44.6, 1.35, 31.1, 43.5, 1.15), 0.12, 0.02, 0.02, 1, 18),
      mats.goldPlating
    );
    topRail.position.z = 0.42;
    const botRail = new THREE.Mesh(
      extrudeHiRes(createFrameShape(32.2, 44.6, 1.35, 31.1, 43.5, 1.15), 0.12, 0.02, 0.02, 1, 18),
      mats.copperCoil
    );
    botRail.position.z = -0.42;
    g.add(topRail, botRail);

    // 48 dense λ/20 microwave picket-fence vias + teardrop copper capture collars on EVERY via!
    const viaPositions: Array<[number, number]> = [];
    for (let i = -7; i <= 7; i++) {
      viaPositions.push([-15.8, i * 2.85], [15.8, i * 2.85]);
    }
    for (let j = -4; j <= 4; j++) {
      viaPositions.push([j * 3.25, 22.0], [j * 3.25, -22.0]);
    }
    const viaGeo = hiResCyl(0.24, 0.24, 0.92, 10).rotateX(Math.PI / 2);
    const tearGeo = hiResCyl(0.42, 0.42, 0.10, 10).rotateX(Math.PI / 2);
    const viaInst = new THREE.InstancedMesh(viaGeo, mats.goldPlating, viaPositions.length);
    const tearInst = new THREE.InstancedMesh(tearGeo, mats.copperHybridBond, viaPositions.length);
    const dm = new THREE.Object3D();
    viaPositions.forEach(([vx, vy], idx) => {
      dm.position.set(vx, vy, 0);
      dm.updateMatrix();
      viaInst.setMatrixAt(idx, dm.matrix);
      dm.position.set(vx, vy, 0.48);
      dm.updateMatrix();
      tearInst.setMatrixAt(idx, dm.matrix);
    });
    viaInst.instanceMatrix.needsUpdate = true;
    tearInst.instanceMatrix.needsUpdate = true;
    viaInst.userData.noEdges = true;
    tearInst.userData.noEdges = true;
    g.add(viaInst, tearInst);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-perimeter-via-fence',
        74,
        '#eab308',
        g,
        new THREE.Vector3(0, 0.6, 0),
        new THREE.Vector3(106, -54, 16),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C75. 30 μm Ultra-Thin NAND Die Backside Support Film (DBS) & Stealth-Dice Edge
  // =========================================================================
  {
    const g = new THREE.Group();
    const thinDieGeo = createChamferedBoxGeo(14.8, 10.6, 0.14, 0.18, 0.02, 'z');
    applyPlanarUVs(thinDieGeo, 14.8, 10.6, 'xy');
    const thinDie = new THREE.Mesh(thinDieGeo, u.cfeBiCS10WaferDie);
    thinDie.position.z = 0.14;

    const dbsFilm = new THREE.Mesh(
      createChamferedBoxGeo(15.2, 11.0, 0.12, 0.24, 0.02, 'z'),
      mats.polyimideFpc
    );
    dbsFilm.position.z = -0.06;

    // Laser stealth-dicing beveled stress-relief rim + backside diamond-grind micro-swirl ring + 4 collet pickup pads!
    const kerfRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.5, 11.3, 0.26, 14.5, 10.3, 0.18), 0.22, 0.04, 0.04, 2, 14),
      mats.siliconBulk
    );
    kerfRim.position.z = 0.06;

    const grindRing = new THREE.Mesh(hiResTorus(3.2, 0.06, 6, 28), mats.silverElectrode);
    grindRing.position.z = -0.14;
    grindRing.userData.noEdges = true;

    const markGeo = new THREE.BoxGeometry(0.85, 0.85, 0.06);
    for (const [mx, my] of [
      [-6.4, 4.3],
      [6.4, 4.3],
      [-6.4, -4.3],
      [6.4, -4.3],
    ]) {
      const mk = new THREE.Mesh(markGeo, mats.goldPlating);
      mk.position.set(mx, my, 0.23);
      mk.userData.noEdges = true;
      g.add(mk);
    }
    g.add(thinDie, dbsFilm, kerfRim, grindRing);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-die-backside-dbs-film',
        75,
        '#d97706',
        g,
        new THREE.Vector3(0, 12.6, 0.92),
        new THREE.Vector3(-114, 58, -18),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C76. ENEPIG (Electroless Ni-Pd-Au) 3-Layer Wirebond Pad & Anti-Black-Pad Barrier
  // =========================================================================
  {
    const g = new THREE.Group();
    const subCarrier = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 6.4, 0.22, 0.35, 0.04, 'z'),
      u.bionzAbfSubstrate
    );
    subCarrier.position.z = -0.18;
    g.add(subCarrier);

    // 8 stepped 4-strata ENEPIG wirebond fingers: Copper base -> Electroless Ni -> Palladium barrier -> Immersion Gold!
    // Stepped slightly along Y so ALL 4 metallic layers shine cleanly like a metallurgical staircase!
    const cuGeo = new THREE.BoxGeometry(0.92, 4.8, 0.10);
    const niGeo = new THREE.BoxGeometry(0.86, 4.2, 0.11);
    const pdGeo = new THREE.BoxGeometry(0.80, 3.6, 0.09);
    const auGeo = new THREE.BoxGeometry(0.74, 3.0, 0.08);
    const footGeo = hiResCyl(0.18, 0.22, 0.12, 10).rotateX(Math.PI / 2);

    for (let i = 0; i < 8; i++) {
      const px = -4.55 + i * 1.3;
      const cuPad = new THREE.Mesh(cuGeo, mats.copperCoil);
      cuPad.position.set(px, 0, -0.02);
      cuPad.userData.noEdges = true;

      const niPad = new THREE.Mesh(niGeo, mats.stainlessMachined);
      niPad.position.set(px, 0.22, 0.08);
      niPad.userData.noEdges = true;

      const pdShield = new THREE.Mesh(pdGeo, mats.silverElectrode);
      pdShield.position.set(px, 0.42, 0.18);
      pdShield.userData.noEdges = true;

      const auCap = new THREE.Mesh(auGeo, mats.goldPlating);
      auCap.position.set(px, 0.62, 0.26);
      auCap.userData.noEdges = true;

      // Miniature gold wedge-stitch landing foot on top of each ENEPIG gold finger
      const wedge = new THREE.Mesh(footGeo, mats.rfGoldCoax);
      wedge.position.set(px, 1.35, 0.34);
      wedge.userData.noEdges = true;

      g.add(cuPad, niPad, pdShield, auCap, wedge);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-enepig-wirebond-pad',
        76,
        '#cbd5e1',
        g,
        new THREE.Vector3(8.5, 12.6, 0.85),
        new THREE.Vector3(-116, 16, 46),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C77. Fine-Pitch 0.4 mm BGA NSMD Copper Pads & Solder-Mask Dam Grid
  // =========================================================================
  {
    const g = new THREE.Group();
    const basePcb = new THREE.Mesh(
      createChamferedBoxGeo(10.6, 10.6, 0.22, 0.4, 0.04, 'z'),
      u.cfeHdiPcb
    );
    basePcb.position.z = -0.14;
    g.add(basePcb);

    // Raised emerald solder-mask anti-bridge dam ribs separating every single BGA column & row!
    for (let i = -2; i <= 2; i++) {
      const hDam = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.28, 0.20), mats.cfaGreen);
      hDam.position.set(0, i * 1.9, 0.05);
      hDam.userData.noEdges = true;
      const vDam = new THREE.Mesh(new THREE.BoxGeometry(0.28, 9.6, 0.20), mats.cfaGreen);
      vDam.position.set(i * 1.9, 0, 0.05);
      vDam.userData.noEdges = true;
      g.add(hDam, vDam);
    }

    // 4×4 exposed circular NSMD copper pads + clearance moats + spherical SAC305 fillets + dog-bone micro-vias!
    const moatGeo = hiResCyl(0.68, 0.68, 0.06, 16).rotateX(Math.PI / 2);
    const padGeo = hiResCyl(0.52, 0.52, 0.12, 16).rotateX(Math.PI / 2);
    const filletGeo = hiResSphere(0.36, 10, 8);
    const viaGeo = hiResCyl(0.16, 0.16, 0.22, 10).rotateX(Math.PI / 2);

    const moatInst = new THREE.InstancedMesh(moatGeo, mats.pcbEdgeLaminate, 16);
    const padInst = new THREE.InstancedMesh(padGeo, mats.copperHybridBond, 16);
    const filletInst = new THREE.InstancedMesh(filletGeo, mats.solderBallSilver, 16);
    const viaInst = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 16);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const bx = -2.85 + c * 1.9;
        const by = -2.85 + r * 1.9;
        dm.position.set(bx, by, 0.01);
        dm.updateMatrix();
        moatInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(bx, by, 0.05);
        dm.updateMatrix();
        padInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(bx, by, 0.27);
        dm.updateMatrix();
        filletInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(bx + 0.56, by + 0.56, 0.02);
        dm.updateMatrix();
        viaInst.setMatrixAt(idx, dm.matrix);
        idx++;
      }
    }
    for (const inst of [moatInst, padInst, filletInst, viaInst]) {
      inst.instanceMatrix.needsUpdate = true;
      inst.userData.noEdges = true;
      g.add(inst);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-bga-solder-mask-dam',
        77,
        '#22c55e',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.52),
        new THREE.Vector3(-112, -26, -52),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C78. Macaroni Hollow Polysilicon Channel & Central SiO₂ Oxide Core Filler
  // =========================================================================
  {
    const g = new THREE.Group();
    const tilt = new THREE.Group();
    // Concentric cutaway of a single 80 nm Macaroni-Channel 3D NAND pillar:
    // Center pure quartz SiO2 filler -> Thin hollow Poly-Si electron tube -> Tunnel SiO2 -> Si3N4 trap -> Al2O3 -> Mo gate rings!
    const oxideCore = new THREE.Mesh(hiResCyl(0.74, 0.74, 3.8, 28), mats.quartzOlpf);
    const polyTube = new THREE.Mesh(
      hiResCyl(1.24, 1.24, 3.35, 32, true, 0, Math.PI * 1.60),
      mats.gatePolysilicon
    );
    const tunnelWall = new THREE.Mesh(
      hiResCyl(1.62, 1.62, 2.95, 32, true, 0, Math.PI * 1.42),
      mats.ftiOxide
    );
    const onoSleeve = new THREE.Mesh(
      hiResCyl(1.98, 1.98, 2.55, 32, true, 0, Math.PI * 1.26),
      mats.loficDielectric
    );

    // 5 stacked Barrierless Molybdenum gate rings + top Bitline contact cap + rising vertical electron flow beads!
    for (let k = -2; k <= 2; k++) {
      const gateRing = new THREE.Mesh(hiResTorus(2.26, 0.15, 10, 30, Math.PI * 1.22), u.cfeMolyWordlineMetal);
      gateRing.rotation.x = Math.PI / 2;
      gateRing.position.y = k * 0.54;
      gateRing.userData.noEdges = true;
      tilt.add(gateRing);
    }
    const blTopCap = new THREE.Mesh(hiResCyl(1.15, 1.15, 0.24, 24), mats.copperHeatSpreader);
    blTopCap.position.y = 1.98;
    blTopCap.userData.noEdges = true;

    const eGeo = hiResSphere(0.14, 8, 6);
    for (let i = -2; i <= 2; i++) {
      const eDot = new THREE.Mesh(eGeo, mats.goldPlating);
      eDot.position.set(1.22, i * 0.62, 0.18);
      eDot.userData.noEdges = true;
      tilt.add(eDot);
    }

    tilt.add(oxideCore, polyTube, tunnelWall, onoSleeve, blTopCap);
    tilt.rotation.x = Math.PI * 0.36;
    tilt.rotation.z = 0.22;
    tilt.scale.setScalar(0.68);
    g.add(tilt);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-macaroni-channel-core',
        78,
        '#38bdf8',
        g,
        new THREE.Vector3(-4.0, 14.2, 0.36),
        new THREE.Vector3(-32, 96, 68),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C79. Multi-Deck (2–3 Tier) Inter-Deck Channel Joint & P+ IDB Erase Collar
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3-Deck BiCS10 String Stacking cutaway (Lower Deck + Mid Deck + Upper Deck) with flared trumpet N+ joints + P+ IDB!
    const deckDefs: Array<[number, THREE.Material]> = [
      [-0.58, u.bionzIpDieTile],
      [0.0, u.cfeMolyWordlineMetal],
      [0.58, u.bionzCetusDie],
    ];
    for (const [dz, mat] of deckDefs) {
      const dk = new THREE.Mesh(createChamferedBoxGeo(9.6, 5.2, 0.36, 0.28, 0.04, 'z'), mat);
      dk.position.z = dz;
      g.add(dk);
    }

    // Dual P+ Inter-Deck-Body (IDB) hole-injection erase collars seated cleanly between decks 1-2 and 2-3!
    for (const iz of [-0.29, 0.29]) {
      const idbPlane = new THREE.Mesh(
        createChamferedBoxGeo(10.0, 5.5, 0.14, 0.30, 0.03, 'z'),
        mats.cinnabarAnodized
      );
      idbPlane.position.z = iz;
      g.add(idbPlane);
    }

    // 3×2 vertical 3-tier pillars with flared trumpet-shaped N+ landing collars at BOTH inter-deck seams!
    const shaftGeo = hiResCyl(0.28, 0.24, 0.56, 14).rotateX(Math.PI / 2);
    const flareGeo = hiResCyl(0.52, 0.34, 0.22, 16).rotateX(Math.PI / 2);
    for (const px of [-2.8, 0, 2.8]) {
      for (const py of [-1.25, 1.25]) {
        for (const dz of [-0.56, 0.0, 0.56]) {
          const seg = new THREE.Mesh(shaftGeo, dz > 0 ? mats.vcWorkingFluidCyan : mats.siliconPhotodiode);
          seg.position.set(px, py, dz);
          seg.userData.noEdges = true;
          g.add(seg);
        }
        for (const iz of [-0.29, 0.29]) {
          const collar = new THREE.Mesh(flareGeo, mats.goldPlating);
          collar.position.set(px, py, iz);
          collar.userData.noEdges = true;
          g.add(collar);
        }
      }
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-inter-deck-channel-joint',
        79,
        '#f97316',
        g,
        new THREE.Vector3(0, 15.2, 1.18),
        new THREE.Vector3(0, 102, 42),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C80. -70°C Cryogenic Plasma HARC (>100:1 Aspect Ratio) Channel Hole Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // 5-tier dielectric/nitride monolith + bottom tungsten etch-stop liner
    const etchStop = new THREE.Mesh(createChamferedBoxGeo(10.0, 6.0, 0.14, 0.32, 0.02, 'z'), mats.tungstenGrid);
    etchStop.position.z = -0.66;
    g.add(etchStop);

    for (let k = 0; k < 5; k++) {
      const slab = new THREE.Mesh(
        createChamferedBoxGeo(9.8, 5.8, 0.18, 0.30, 0.02, 'z'),
        k % 2 === 0 ? mats.interlayerDielectric : mats.quartzOlpf
      );
      slab.position.z = -0.46 + k * 0.23;
      g.add(slab);
    }

    // Cryogenic -70°C plasma-etch showerhead halo + downward ion-beam needles entering the >100:1 HARC channels!
    const cryoRing = new THREE.Mesh(hiResTorus(3.15, 0.14, 10, 32), mats.vcWorkingFluidCyan);
    cryoRing.position.z = 0.72;
    cryoRing.userData.noEdges = true;
    g.add(cryoRing);

    const holeGeo = hiResCyl(0.30, 0.30, 1.32, 14).rotateX(Math.PI / 2);
    const ionGeo = hiResCyl(0.08, 0.18, 0.42, 10).rotateX(Math.PI / 2);
    const holeInst = new THREE.InstancedMesh(holeGeo, mats.siliconTsvDram, 12);
    const ionInst = new THREE.InstancedMesh(ionGeo, mats.vcWorkingFluidCyan, 12);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const hx = -3.15 + c * 2.1;
        const hy = -1.6 + r * 1.6;
        dm.position.set(hx, hy, -0.02);
        dm.updateMatrix();
        holeInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(hx, hy, 0.72);
        dm.updateMatrix();
        ionInst.setMatrixAt(idx, dm.matrix);
        idx++;
      }
    }
    holeInst.instanceMatrix.needsUpdate = true;
    ionInst.instanceMatrix.needsUpdate = true;
    holeInst.userData.noEdges = true;
    ionInst.userData.noEdges = true;
    g.add(holeInst, ionInst);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-cryo-harc-etch-pillar',
        80,
        '#06b6d4',
        g,
        new THREE.Vector3(4.5, 14.2, 1.22),
        new THREE.Vector3(34, 96, 68),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C81. 2026 Barrierless Molybdenum (Mo) Wordlines & Sub-30 nm Z-Pitch Stack
  // =========================================================================
  {
    const g = new THREE.Group();
    // 9 ultra-thin alternating Barrierless Molybdenum (Mo) wordlines & Al2O3/SiO2 spacers (eliminating TiN glue liner!)
    const moGeo = createChamferedBoxGeo(10.8, 5.8, 0.11, 0.22, 0.02, 'z');
    const oxGeo = createChamferedBoxGeo(10.5, 5.5, 0.055, 0.20, 0.01, 'z');
    for (let k = 0; k < 9; k++) {
      const isMo = k % 2 === 0;
      const sheet = new THREE.Mesh(
        isMo ? moGeo : oxGeo,
        isMo ? u.cfeMolyWordlineMetal : mats.aluminaHighKFilm
      );
      sheet.position.z = (k - 4) * 0.16;
      g.add(sheet);
    }

    // 4 concentric Macaroni memory channel pillars passing cleanly through the sub-30 nm Molybdenum stack
    const outerGeo = hiResCyl(0.42, 0.42, 1.48, 16).rotateX(Math.PI / 2);
    const innerGeo = hiResCyl(0.22, 0.22, 1.56, 12).rotateX(Math.PI / 2);
    for (const px of [-3.6, -1.2, 1.2, 3.6]) {
      const ch = new THREE.Mesh(outerGeo, mats.goldPlating);
      ch.position.set(px, 0, 0);
      ch.userData.noEdges = true;
      const core = new THREE.Mesh(innerGeo, mats.quartzOlpf);
      core.position.set(px, 0, 0);
      core.userData.noEdges = true;
      g.add(ch, core);
    }

    // Side sub-30nm Z-pitch reference caliper bar highlighting compact Molybdenum thickness!
    const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.36, 1.44), mats.vcWorkingFluidCyan);
    caliper.position.set(5.65, 0, 0);
    caliper.userData.noEdges = true;
    g.add(caliper);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-barrierless-moly-wl',
        81,
        '#94a3b8',
        g,
        new THREE.Vector3(-6.2, 14.5, 1.15),
        new THREE.Vector3(-68, 94, 34),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C82. Inter-Wordline Nanoscale Air-Gap Isolation (k = 1.0 Z-Interference Shield)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 6 horizontal Molybdenum gate fins separated by 5 recessed nanoscale k=1.0 air-gap voids!
    for (let k = 0; k < 6; k++) {
      const zPos = -0.68 + k * 0.27;
      const wl = new THREE.Mesh(
        createChamferedBoxGeo(10.2, 5.4, 0.11, 0.2, 0.02, 'z'),
        u.cfeMolyWordlineMetal
      );
      wl.position.z = zPos;
      g.add(wl);
      if (k < 5) {
        const airPocket = new THREE.Mesh(
          createChamferedBoxGeo(7.8, 4.0, 0.12, 0.22, 0.02, 'z'),
          mats.vcWorkingFluidCyan
        );
        airPocket.position.set(0.3, 0, zPos + 0.135);
        airPocket.userData.noEdges = true;
        g.add(airPocket);
      }
    }
    // Left vertical Macaroni channel pillar + Right PECVD pinched-off oxide sealing cap locking air gaps in place!
    const chPillar = new THREE.Mesh(hiResCyl(0.54, 0.54, 1.62, 18).rotateX(Math.PI / 2), mats.gatePolysilicon);
    chPillar.position.set(-3.65, 0, 0);
    chPillar.userData.noEdges = true;
    const chCore = new THREE.Mesh(hiResCyl(0.26, 0.26, 1.68, 14).rotateX(Math.PI / 2), mats.quartzOlpf);
    chCore.position.set(-3.65, 0, 0);
    chCore.userData.noEdges = true;

    const pinchCap = new THREE.Mesh(
      createChamferedBoxGeo(0.85, 5.5, 1.56, 0.14, 0.04, 'z'),
      mats.ftiOxide
    );
    pinchCap.position.x = 5.1;
    g.add(chPillar, chCore, pinchCap);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-wordline-airgap-iso',
        82,
        '#38bdf8',
        g,
        new THREE.Vector3(6.2, 14.5, 1.15),
        new THREE.Vector3(68, 94, 34),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C83. Slit Trench (Gate-Line Slit) & Common Source Line (CSL) Tungsten Wall
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left & right multi-layered 3D NAND array halves with visible horizontal wordline strata along the trench cut!
    for (const sx of [-3.4, 3.4]) {
      const arrayHalf = new THREE.Mesh(
        createChamferedBoxGeo(4.2, 6.2, 1.18, 0.2, 0.05, 'z'),
        u.bionzIpDieTile
      );
      arrayHalf.position.x = sx;
      g.add(arrayHalf);

      for (let k = -2; k <= 2; k++) {
        const strata = new THREE.Mesh(new THREE.BoxGeometry(4.26, 6.0, 0.08), u.cfeMolyWordlineMetal);
        strata.position.set(sx, 0, k * 0.22);
        strata.userData.noEdges = true;
        g.add(strata);
      }
    }
    // Dual oxide isolation sidewalls preventing CSL-to-WL shorts
    for (const lx of [-0.72, 0.72]) {
      const liner = new THREE.Mesh(new THREE.BoxGeometry(0.28, 6.4, 1.32), mats.ftiOxide);
      liner.position.x = lx;
      liner.userData.noEdges = true;
      g.add(liner);
    }
    // Central high-conductivity tungsten CSL wall + bottom N+ source diffusion floor + top M1 CSL copper strap!
    const cslWall = new THREE.Mesh(
      createChamferedBoxGeo(1.02, 6.5, 1.40, 0.12, 0.04, 'z'),
      mats.tungstenGrid
    );
    const sourceFloor = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 6.4, 0.22, 0.2, 0.03, 'z'),
      mats.copperHybridBond
    );
    sourceFloor.position.z = -0.74;
    const topStrap = new THREE.Mesh(createChamferedBoxGeo(1.45, 6.5, 0.14, 0.12, 0.02, 'z'), mats.goldPlating);
    topStrap.position.z = 0.74;
    topStrap.userData.noEdges = true;

    g.add(cslWall, sourceFloor, topStrap);
    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-slit-trench-csl-wall',
        83,
        '#64748b',
        g,
        new THREE.Vector3(-4.2, 11.4, 1.15),
        new THREE.Vector3(-36, 98, -26),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C84. BiCS10 On-Pitch Select Gate Drain (OP-SGD) & GIDL Erase Transistor Deck
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bottom GIDL hole-injection + SGS Source Select Gate deck
    const sgsBase = new THREE.Mesh(
      createChamferedBoxGeo(10.8, 5.4, 0.26, 0.22, 0.04, 'z'),
      mats.cinnabarAnodized
    );
    sgsBase.position.z = -0.58;
    g.add(sgsBase);

    // 6 tightly packed BiCS10 On-Pitch SGD selector bars (zero wasted dummy string space!) + dielectric cut slits + top Bitline straps!
    const shaftGeo = hiResCyl(0.28, 0.28, 1.24, 14).rotateX(Math.PI / 2);
    for (let i = 0; i < 6; i++) {
      const bx = -4.25 + i * 1.70;
      const sgdBar = new THREE.Mesh(
        createChamferedBoxGeo(1.42, 5.2, 0.22, 0.12, 0.03, 'z'),
        i % 2 === 0 ? mats.goldPlating : mats.cfaBlue
      );
      sgdBar.position.set(bx, 0, 0.54);
      g.add(sgdBar);

      if (i < 5) {
        const cutSlit = new THREE.Mesh(new THREE.BoxGeometry(0.14, 5.1, 0.26), mats.ftiOxide);
        cutSlit.position.set(bx + 0.85, 0, 0.54);
        cutSlit.userData.noEdges = true;
        g.add(cutSlit);
      }

      for (const py of [-1.45, 1.45]) {
        const shaft = new THREE.Mesh(shaftGeo, mats.siliconPhotodiode);
        shaft.position.set(bx, py, 0);
        shaft.userData.noEdges = true;
        g.add(shaft);
      }
    }
    // Dual copper top Bitline collector straps tying the 6 OP-SGD strings
    for (const py of [-1.45, 1.45]) {
      const bl = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.24, 0.10), mats.copperCoil);
      bl.position.set(0, py, 0.72);
      bl.userData.noEdges = true;
      g.add(bl);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-op-sgd-select-gates',
        84,
        '#2563eb',
        g,
        new THREE.Vector3(4.2, 11.4, 1.15),
        new THREE.Vector3(36, 98, -26),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C85. Edge Dummy Wordlines (Dummy WL) & Fringe-Field Disturb Cushion Stack
  // =========================================================================
  {
    const g = new THREE.Group();
    // 10-tier stack: 2 top + 2 bottom amber-gold Dummy Edge WLs cushioning 6 electric-blue user-data WLs!
    for (let k = 0; k < 10; k++) {
      const isDummy = k < 2 || k >= 8;
      const layer = new THREE.Mesh(
        createChamferedBoxGeo(9.8, 5.2, 0.095, 0.2, 0.018, 'z'),
        isDummy ? mats.tantalumCapYellow : mats.cfaBlue
      );
      layer.position.z = (k - 4.5) * 0.165;
      g.add(layer);
    }
    // 3 vertical channel pillars + side fringe-field cushion guard shields
    const pGeo = hiResCyl(0.34, 0.34, 1.66, 16).rotateX(Math.PI / 2);
    for (const px of [-3.0, 0, 3.0]) {
      const p = new THREE.Mesh(pGeo, mats.silverElectrode);
      p.position.set(px, 0, 0);
      p.userData.noEdges = true;
      g.add(p);
    }
    for (const sz of [-0.72, 0.72]) {
      const shield = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.32, 0.12), mats.goldPlating);
      shield.position.set(0, 2.75, sz);
      shield.userData.noEdges = true;
      g.add(shield);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-dummy-edge-wordlines',
        85,
        '#f59e0b',
        g,
        new THREE.Vector3(-8.5, 12.6, 1.12),
        new THREE.Vector3(-92, 84, -38),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C86. 2026 BiCS10 / G9 6-Plane Independent Read (MPIR) 332-Layer Silicon Die Floorplan
  // =========================================================================
  {
    const g = new THREE.Group();
    const dieGeo = createChamferedBoxGeo(16.8, 12.2, 0.32, 0.35, 0.05, 'z');
    applyPlanarUVs(dieGeo, 16.8, 12.2, 'xy');
    const diePlate = new THREE.Mesh(dieGeo, u.cfeBiCS10WaferDie);
    g.add(diePlate);

    // Dual-moat beveled perimeter gold & copper wafer crack-stopper seal ring + 4 corner ASML stepper alignment marks!
    const outerSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.6, 12.0, 0.32, 16.12, 11.52, 0.24), 0.09, 0.015, 0.015, 1, 16),
      mats.goldPlating
    );
    outerSeal.position.z = 0.19;
    outerSeal.userData.noEdges = true;
    const innerSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.92, 11.32, 0.24, 15.62, 11.02, 0.18), 0.07, 0.01, 0.01, 1, 14),
      mats.copperHybridBond
    );
    innerSeal.position.z = 0.19;
    innerSeal.userData.noEdges = true;
    g.add(outerSeal, innerSeal);

    const alignH = new THREE.BoxGeometry(0.68, 0.10, 0.08);
    const alignV = new THREE.BoxGeometry(0.10, 0.68, 0.08);
    for (const [ax, ay] of [
      [-7.45, 5.15],
      [7.45, 5.15],
      [-7.45, -5.15],
      [7.45, -5.15],
    ]) {
      const ch = new THREE.Mesh(alignH, mats.goldPlating);
      ch.position.set(ax, ay, 0.21);
      ch.userData.noEdges = true;
      const cv = new THREE.Mesh(alignV, mats.goldPlating);
      cv.position.set(ax, ay, 0.21);
      cv.userData.noEdges = true;
      g.add(ch, cv);
    }

    // 6 sculpted independent Plane sub-arrays (3×2) — each with 6 bitline sub-blocks, Gold WL Staircase Decoder, Cyan 16KB Page Buffer & Charge Pump!
    const subTileGeo = createChamferedBoxGeo(1.02, 1.56, 0.08, 0.04, 0.01, 'z');
    const subTileInst = new THREE.InstancedMesh(subTileGeo, mats.siliconTsvDram, 36);
    const dm = new THREE.Object3D();
    let stIdx = 0;

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const px = -5.0 + c * 5.0;
        const py = r === 0 ? 2.85 : -2.85;
        const planeTile = new THREE.Mesh(
          createChamferedBoxGeo(4.24, 4.28, 0.11, 0.14, 0.02, 'z'),
          mats.siliconSensorDie
        );
        planeTile.position.set(px, py, 0.20);
        planeTile.userData.noEdges = true;

        // 3×2 sculpted sub-block bitline diffraction micro-tiles inside each independent plane!
        for (let sr = 0; sr < 2; sr++) {
          for (let sc = 0; sc < 3; sc++) {
            dm.position.set(px - 0.85 + sc * 1.08, py + (sr === 0 ? 0.92 : -0.82) + (r === 0 ? 0.24 : -0.24), 0.27);
            dm.updateMatrix();
            subTileInst.setMatrixAt(stIdx++, dm.matrix);
          }
        }

        // Independent per-plane gold Row / Wordline Staircase Decoder sidebar + 4 staircase contact steps
        const rowDec = new THREE.Mesh(new THREE.BoxGeometry(0.44, 4.16, 0.14), mats.goldPlating);
        rowDec.position.set(px - 1.98, py, 0.24);
        rowDec.userData.noEdges = true;

        // Independent per-plane cyan 16KB Page Buffer & LBUS Coupling Sense-Amp bar
        const pageBuf = new THREE.Mesh(new THREE.BoxGeometry(3.62, 0.48, 0.14), mats.vcWorkingFluidCyan);
        pageBuf.position.set(px + 0.16, r === 0 ? 0.92 : -0.92, 0.24);
        pageBuf.userData.noEdges = true;

        // Per-plane local HV charge-pump copper micro-block on outer plane corner
        const cpBlk = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.34, 0.13), mats.copperHeatSpreader);
        cpBlk.position.set(px + 1.56, r === 0 ? 4.68 : -4.68, 0.23);
        cpBlk.userData.noEdges = true;

        g.add(planeTile, rowDec, pageBuf, cpBlk);
      }
    }
    subTileInst.instanceMatrix.needsUpdate = true;
    subTileInst.userData.noEdges = true;
    g.add(subTileInst);

    // Central horizontal BWWPC Cu-Cu hybrid-bond power/IO spine studded with 24 instanced copper micro-vias!
    const ioSpine = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.46, 0.14), mats.copperHybridBond);
    ioSpine.position.set(0, 0, 0.24);
    ioSpine.userData.noEdges = true;

    const cuPadGeo = hiResCyl(0.14, 0.14, 0.10, 10).rotateX(Math.PI / 2);
    const cuPadInst = new THREE.InstancedMesh(cuPadGeo, mats.goldPlating, 24);
    for (let i = 0; i < 24; i++) {
      dm.position.set(-7.15 + i * 0.62, 0, 0.32);
      dm.updateMatrix();
      cuPadInst.setMatrixAt(i, dm.matrix);
    }
    cuPadInst.instanceMatrix.needsUpdate = true;
    cuPadInst.userData.noEdges = true;

    // Bottom edge row of 24 fine-pitch ENEPIG gold wirebond pads inside recessed passivation windows (InstancedMesh!)
    const padWinGeo = new THREE.BoxGeometry(0.46, 0.54, 0.08);
    const padGoldGeo = new THREE.BoxGeometry(0.36, 0.44, 0.11);
    const padWinInst = new THREE.InstancedMesh(padWinGeo, mats.matteBlackAnodized, 24);
    const padGoldInst = new THREE.InstancedMesh(padGoldGeo, mats.goldPlating, 24);
    for (let b = 0; b < 24; b++) {
      const bx = -7.15 + b * 0.62;
      dm.position.set(bx, -5.58, 0.20);
      dm.updateMatrix();
      padWinInst.setMatrixAt(b, dm.matrix);
      dm.position.set(bx, -5.58, 0.22);
      dm.updateMatrix();
      padGoldInst.setMatrixAt(b, dm.matrix);
    }
    padWinInst.instanceMatrix.needsUpdate = true;
    padGoldInst.instanceMatrix.needsUpdate = true;
    padWinInst.userData.noEdges = true;
    padGoldInst.userData.noEdges = true;

    g.add(ioSpine, cuPadInst, padWinInst, padGoldInst);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-multiplane-6plane-mpir',
        86,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 12.6, 1.32),
        new THREE.Vector3(0, 96, 96),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C87. Wafer Die Perimeter Crack-Stopper & Moisture Seal Ring Fortress
  // =========================================================================
  {
    const g = new THREE.Group();
    const outerMoat = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.8, 10.8, 0.45, 13.3, 9.3, 0.3), 0.42, 0.05, 0.05, 2, 16),
      mats.goldPlating
    );
    const innerMoat = new THREE.Mesh(
      extrudeHiRes(createFrameShape(12.6, 8.6, 0.35, 11.4, 7.4, 0.25), 0.36, 0.04, 0.04, 2, 16),
      mats.copperHybridBond
    );
    innerMoat.position.z = 0.04;
    const passivationLip = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.4, 11.4, 0.52, 14.6, 10.6, 0.42), 0.24, 0.03, 0.03, 1, 16),
      mats.polyimideFpc
    );
    passivationLip.position.z = -0.06;

    // 24 stacked tungsten/copper corner-reinforced via-bar pillars stopping dicing crack propagation (InstancedMesh!)
    const pilGeo = hiResCyl(0.24, 0.24, 0.52, 10).rotateX(Math.PI / 2);
    const pilInst = new THREE.InstancedMesh(pilGeo, mats.tungstenGrid, 24);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let c = -3; c <= 3; c++) {
      for (const py of [-4.95, 4.95]) {
        dm.position.set(c * 2.05, py, 0.04);
        dm.updateMatrix();
        pilInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    for (let r = -2; r <= 2; r++) {
      for (const px of [-6.95, 6.95]) {
        dm.position.set(px, r * 1.9, 0.04);
        dm.updateMatrix();
        pilInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    pilInst.instanceMatrix.needsUpdate = true;
    pilInst.userData.noEdges = true;
    g.add(outerMoat, innerMoat, passivationLip, pilInst);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-wafer-seal-ring-guard',
        87,
        '#d97706',
        g,
        new THREE.Vector3(0, 12.6, 1.02),
        new THREE.Vector3(92, 84, -38),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C88. 2026 Toggle DDR 6.0 (4.8 Gb/s) & SCA (Separate Command Address) Express Bus
  // =========================================================================
  {
    const g = new THREE.Group();
    const bridgeBase = new THREE.Mesh(
      createChamferedBoxGeo(12.0, 6.6, 0.26, 0.3, 0.04, 'z'),
      u.bionzCetusDie
    );
    g.add(bridgeBase);

    // Upper cinnabar SCA (Separate Command/Address) express lanes + dedicated gold SCA clock strobe
    for (let k = 0; k < 2; k++) {
      const scaLane = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.44, 0.16), mats.cinnabarAnodized);
      scaLane.position.set(0, 2.05 - k * 0.78, 0.2);
      scaLane.userData.noEdges = true;
      g.add(scaLane);
    }
    const scaClk = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.24, 0.16), mats.goldPlating);
    scaClk.position.set(0, 0.62, 0.2);
    scaClk.userData.noEdges = true;
    g.add(scaClk);

    // Lower 8-lane cyan 4.8 Gb/s Toggle DDR 6.0 DQ[7:0] highway + paired gold DQS/RE# differential strobe rails!
    for (let d = 0; d < 8; d++) {
      const dx = -4.4 + d * 1.08;
      const dq = new THREE.Mesh(new THREE.BoxGeometry(0.62, 2.45, 0.16), mats.vcWorkingFluidCyan);
      dq.position.set(dx, -1.32, 0.2);
      dq.userData.noEdges = true;
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.38, 0.14), mats.goldPlating);
      pad.position.set(dx, -2.82, 0.2);
      pad.userData.noEdges = true;
      g.add(dq, pad);
    }
    for (const sx of [4.25, 4.85]) {
      const dqs = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.55, 0.18), mats.goldPlating);
      dqs.position.set(sx, -1.32, 0.22);
      dqs.userData.noEdges = true;
      g.add(dqs);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-toggle6-sca-bus',
        88,
        '#06b6d4',
        g,
        new THREE.Vector3(3.5, 3.6, 0.85),
        new THREE.Vector3(108, 48, 52),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C89. ONFI 6.0 / BiCS10 PI-LTT (Power-Isolated Low-Tapped Termination) & VccQL Driver
  // =========================================================================
  {
    const g = new THREE.Group();
    const vccqIsland = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 5.2, 0.32, 0.22, 0.04, 'z'),
      mats.cfaBlue
    );
    vccqIsland.position.x = -2.6;

    const vccqlIsland = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 5.2, 0.32, 0.22, 0.04, 'z'),
      mats.cfaGreen
    );
    vccqlIsland.position.x = 2.6;

    // Deep oxide isolation moat separating 1.2V VCCQ and 0.6V VccQL power domains (-34% I/O heat!)
    const isoTrench = new THREE.Mesh(
      createChamferedBoxGeo(0.72, 5.4, 0.26, 0.12, 0.03, 'z'),
      mats.ftiOxide
    );
    // 4 bridged gold low-tapped pull-up/pull-down driver fingers + right-edge low-swing output pads!
    for (let k = 0; k < 4; k++) {
      const ty = -1.65 + k * 1.1;
      const tap = new THREE.Mesh(new THREE.BoxGeometry(6.9, 0.30, 0.12), mats.goldPlating);
      tap.position.set(0, ty, 0.22);
      tap.userData.noEdges = true;
      const fet = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.62, 0.16), mats.copperHybridBond);
      fet.position.set(2.5, ty, 0.25);
      fet.userData.noEdges = true;
      const outPad = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.46, 0.14), mats.vcWorkingFluidCyan);
      outPad.position.set(4.35, ty, 0.24);
      outPad.userData.noEdges = true;
      g.add(tap, fet, outPad);
    }
    g.add(vccqIsland, vccqlIsland, isoTrench);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-pi-ltt-vccql-io',
        89,
        '#10b981',
        g,
        new THREE.Vector3(10.2, 4.2, 0.85),
        new THREE.Vector3(114, 24, 14),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C90. 0.1% Precision 240 Ω External ZQ Calibration Resistors & ODT Ladder
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrier = new THREE.Mesh(
      createChamferedBoxGeo(9.8, 5.6, 0.18, 0.28, 0.03, 'z'),
      u.cfeHdiPcb
    );
    carrier.position.z = -0.14;
    g.add(carrier);

    // Pair of precision ±0.1% 240-ohm blue thin-film ZQ reference resistors with visible laser-trim kerf!
    for (const ry of [-1.32, 1.32]) {
      const rZq = buildSmdPassive(3.3, 1.48, 0.60, mats.mountShimBlue, mats.goldPlating, 'z');
      rZq.position.set(-2.25, ry, 0.16);
      // Laser-trimmed L-cut kerf line across the blue NiCr thin-film element!
      const kerf = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.14, 0.06), mats.goldPlating);
      kerf.position.set(-2.25, ry + 0.12, 0.48);
      kerf.userData.noEdges = true;
      const link = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.22, 0.08), mats.copperCoil);
      link.position.set(0.1, ry, 0.02);
      link.userData.noEdges = true;
      g.add(rZq, kerf, link);
    }
    // 6-bit binary-weighted On-Die Termination (ODT) parallel resistor ladder (R/1 .. R/32) on right!
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.4, 0.14), mats.goldPlating);
    spine.position.set(0.85, 0, 0.08);
    spine.userData.noEdges = true;
    g.add(spine);
    for (let b = 0; b < 6; b++) {
      const w = 0.85 + b * 0.42;
      const rung = new THREE.Mesh(new THREE.BoxGeometry(w, 0.36, 0.20), mats.copperHybridBond);
      rung.position.set(1.0 + w * 0.5, -1.85 + b * 0.74, 0.12);
      rung.userData.noEdges = true;
      g.add(rung);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-zq-240ohm-odt-cal',
        90,
        '#3b82f6',
        g,
        new THREE.Vector3(11.4, -1.8, 0.72),
        new THREE.Vector3(108, -2, 54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C91. 4.8 Gb/s Duty-Cycle Corrector (DCC/WDCA) & Per-Pin VrefQ Eye Trainer
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(10.0, 6.0, 0.28, 0.24, 0.04, 'z');
    applyPlanarUVs(baseGeo, 10.0, 6.0, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzIpDieTile);
    g.add(base);

    // 3D sculpted Golden "Eye Diagram" waveform arcs + inner cyan safety mask + VrefQ crosshair + DCC DAC bars!
    const topArc = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.0, 0, 0.26),
      new THREE.Vector3(-1.8, 1.72, 0.34),
      new THREE.Vector3(1.8, 1.72, 0.34),
      new THREE.Vector3(4.0, 0, 0.26),
    ]);
    const botArc = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.0, 0, 0.26),
      new THREE.Vector3(-1.8, -1.72, 0.34),
      new THREE.Vector3(1.8, -1.72, 0.34),
      new THREE.Vector3(4.0, 0, 0.26),
    ]);
    const eyeTop = new THREE.Mesh(markHiRes(new THREE.TubeGeometry(topArc, 24, 0.14, 8, false)), mats.goldPlating);
    const eyeBot = new THREE.Mesh(markHiRes(new THREE.TubeGeometry(botArc, 24, 0.14, 8, false)), mats.goldPlating);
    eyeTop.userData.noEdges = true;
    eyeBot.userData.noEdges = true;

    // Crosshair VrefQ vertical/horizontal sweep vernier rails + central optimal sampling dot!
    const vRefH = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.09, 0.10), mats.vcWorkingFluidCyan);
    vRefH.position.set(0, 0, 0.24);
    vRefH.userData.noEdges = true;
    const tSweepV = new THREE.Mesh(new THREE.BoxGeometry(0.09, 3.4, 0.10), mats.vcWorkingFluidCyan);
    tSweepV.position.set(0, 0, 0.24);
    tSweepV.userData.noEdges = true;

    const sampleDot = new THREE.Mesh(hiResSphere(0.42, 14, 10), mats.vcWorkingFluidCyan);
    sampleDot.position.set(0, 0, 0.36);
    sampleDot.userData.noEdges = true;

    // 4-bit DCC / WDCA duty-cycle DAC trim blocks along bottom edge
    for (let i = 0; i < 4; i++) {
      const dac = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.44, 0.14), mats.cfaGreen);
      dac.position.set(-2.25 + i * 1.5, -2.35, 0.24);
      dac.userData.noEdges = true;
      g.add(dac);
    }
    g.add(eyeTop, eyeBot, vRefH, tSweepV, sampleDot);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-dcc-vrefq-eye-trainer',
        91,
        '#facc15',
        g,
        new THREE.Vector3(7.4, 2.2, 0.85),
        new THREE.Vector3(114, 44, -22),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C92. CFA VPG Profile 5.0 (VPG800 / VPG1600) Preconditioning & TRIM Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const modGeo = createChamferedBoxGeo(9.8, 6.0, 0.32, 0.26, 0.04, 'z');
    applyPlanarUVs(modGeo, 9.8, 6.0, 'xy');
    const modBase = new THREE.Mesh(modGeo, u.icEpoxyLaser);
    g.add(modBase);

    // Upper golden TRIM / Deallocate background preconditioning pipeline bar
    const trimRail = new THREE.Mesh(createChamferedBoxGeo(8.2, 0.56, 0.20, 0.12, 0.03, 'z'), mats.goldPlating);
    trimRail.position.set(0, 2.15, 0.24);
    trimRail.userData.noEdges = true;
    g.add(trimRail);

    // 4 gleaming emerald "Pre-Erased Clean NAND Superblock" lanes with internal sub-page stripes!
    for (let i = 0; i < 4; i++) {
      const lx = -3.15 + i * 2.1;
      const cleanBlock = new THREE.Mesh(
        createChamferedBoxGeo(1.72, 3.2, 0.22, 0.14, 0.03, 'z'),
        i < 3 ? mats.cfaGreen : mats.vcWorkingFluidCyan
      );
      cleanBlock.position.set(lx, -0.35, 0.24);
      cleanBlock.userData.noEdges = true;
      // Subtle stripe dividers inside each guaranteed-bandwidth superblock
      for (const sy of [-0.75, 0, 0.75]) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.12, 0.08), mats.goldPlating);
        stripe.position.set(lx, -0.35 + sy, 0.37);
        stripe.userData.noEdges = true;
        g.add(stripe);
      }
      g.add(cleanBlock);
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-vpg5-precond-engine',
        92,
        '#22c55e',
        g,
        new THREE.Vector3(-6.2, -5.2, 1.32),
        new THREE.Vector3(-108, 22, 74),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C93. NVMe 2.4 (Aug 2026) Post-Quantum Cryptography (ML-DSA) & Silicon PUF Vault
  // =========================================================================
  {
    const g = new THREE.Group();
    const vaultGeo = createChamferedBoxGeo(10.6, 8.8, 0.42, 0.35, 0.06, 'z');
    applyPlanarUVs(vaultGeo, 10.6, 8.8, 'xy');
    const vaultDie = new THREE.Mesh(vaultGeo, u.cfePqcSecurityDie);

    // Armored stepped golden Faraday security collar + 4 corner tamper-seal hex bolts!
    const secFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(11.3, 9.5, 0.42, 10.1, 8.3, 0.28), 0.32, 0.05, 0.05, 2, 16),
      mats.goldPlating
    );
    secFrame.position.z = 0.14;

    const boltGeo = hiResCyl(0.32, 0.32, 0.24, 6).rotateX(Math.PI / 2);
    for (const [bx, by] of [
      [-5.15, 4.25],
      [5.15, 4.25],
      [-5.15, -4.25],
      [5.15, -4.25],
    ]) {
      const bolt = new THREE.Mesh(boltGeo, mats.titaniumRivet);
      bolt.position.set(bx, by, 0.32);
      bolt.userData.noEdges = true;
      g.add(bolt);
    }

    // Raised 3D ML-DSA lattice vector nodes + central golden Silicon PUF SRAM fingerprint ring!
    const pufRing = new THREE.Mesh(hiResTorus(1.15, 0.14, 8, 24), mats.vcWorkingFluidCyan);
    pufRing.position.set(0, 0, 0.28);
    pufRing.userData.noEdges = true;
    const nodeGeo = hiResSphere(0.18, 8, 6);
    for (let i = 0; i < 6; i++) {
      const ang = (i * Math.PI) / 3;
      const n = new THREE.Mesh(nodeGeo, mats.goldPlating);
      n.position.set(Math.cos(ang) * 2.85, Math.sin(ang) * 2.15, 0.28);
      n.userData.noEdges = true;
      g.add(n);
    }
    g.add(vaultDie, secFrame, pufRing);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-nvme24-pqc-puf-root',
        93,
        '#f59e0b',
        g,
        new THREE.Vector3(-9.2, -10.8, 1.28),
        new THREE.Vector3(-116, -24, 58),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C94. PCIe ASPM L1.2 Substate & NVMe PS0–PS4 Dynamic Power-State FSM
  // =========================================================================
  {
    const g = new THREE.Group();
    const fsmBase = new THREE.Mesh(
      createChamferedBoxGeo(9.8, 5.6, 0.28, 0.26, 0.04, 'z'),
      u.bionzIpDieTile
    );
    g.add(fsmBase);

    // 5 stepped power-state pillars (PS0 Turbo 4W -> PS4 Deep Sleep <5mW) + transition bridges + power-gate switch rail!
    const stateMats = [
      mats.cinnabarAnodized,
      mats.tantalumCapYellow,
      mats.goldPlating,
      mats.cfaGreen,
      mats.vcWorkingFluidCyan,
    ];
    for (let s = 0; s < 5; s++) {
      const sx = -3.4 + s * 1.7;
      const barH = 0.88 - s * 0.15;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(1.26, 2.8, barH, 0.14, 0.03, 'z'),
        stateMats[s]
      );
      bar.position.set(sx, 0.25, 0.14 + barH * 0.5);
      bar.userData.noEdges = true;
      g.add(bar);

      if (s < 4) {
        const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.26, 0.14), mats.goldPlating);
        bridge.position.set(sx + 0.85, 0.25, 0.28);
        bridge.userData.noEdges = true;
        g.add(bridge);
      }
    }
    // Lower CLKREQ# L1.2 power-gating MOSFET header bar
    const pgRail = new THREE.Mesh(createChamferedBoxGeo(8.2, 0.62, 0.20, 0.10, 0.02, 'z'), mats.copperHeatSpreader);
    pgRail.position.set(0, -1.92, 0.24);
    pgRail.userData.noEdges = true;
    g.add(pgRail);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-pcie-l12-pm-fsm',
        94,
        '#06b6d4',
        g,
        new THREE.Vector3(6.8, -14.8, -0.78),
        new THREE.Vector3(108, -28, -54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C95. NVMe HCTM (Host Controlled Thermal Management) & 18-Step DVFS Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(9.6, 5.8, 0.28, 0.26, 0.04, 'z'),
      u.icEpoxyLaser
    );
    g.add(base);

    // Smooth 12-step thermal DVFS frequency staircase transitioning gently without 8K frame drops!
    for (let i = 0; i < 12; i++) {
      const h = 0.72 - i * 0.042;
      const mat = i < 4 ? mats.cfaGreen : i < 8 ? mats.tantalumCapYellow : mats.cinnabarAnodized;
      const step = new THREE.Mesh(new THREE.BoxGeometry(0.52, 2.95, h), mat);
      step.position.set(-3.75 + i * 0.68, -0.35, 0.14 + h * 0.5);
      step.userData.noEdges = true;
      g.add(step);
    }
    // Dual TMT1 (gold) & TMT2 (cinnabar) host-negotiated threshold cursor rails along top!
    const tmt1 = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.34, 0.18), mats.goldPlating);
    tmt1.position.set(0, 2.1, 0.24);
    tmt1.userData.noEdges = true;
    const tmt2 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.28, 0.20), mats.cinnabarAnodized);
    tmt2.position.set(2.0, 1.52, 0.26);
    tmt2.userData.noEdges = true;
    g.add(tmt1, tmt2);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-hctm-thermal-fsm',
        95,
        '#f43f5e',
        g,
        new THREE.Vector3(-2.4, -3.5, 0.95),
        new THREE.Vector3(-98, -68, 54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C96. Dynamic NAND Vth Valley-Tracking & Soft-Decision LDPC Read-Retry Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(11.0, 5.6, 0.26, 0.24, 0.04, 'z'),
      u.bionzCetusDie
    );
    g.add(base);

    // 8 bell-curved 3D Gaussian TLC threshold-voltage lobes + 7 golden valley-tracking blades + lower DAC voltage sweep rail!
    const lobeGeo = hiResCyl(0.14, 0.48, 0.72, 16).rotateX(Math.PI / 2);
    const capGeo = hiResSphere(0.16, 10, 8);
    for (let lv = 0; lv < 8; lv++) {
      const px = -4.2 + lv * 1.2;
      const hill = new THREE.Mesh(lobeGeo, lv % 2 === 0 ? mats.cfaBlue : mats.vcWorkingFluidCyan);
      hill.position.set(px, 0.25, 0.48);
      hill.userData.noEdges = true;
      const cap = new THREE.Mesh(capGeo, mats.vcWorkingFluidCyan);
      cap.position.set(px, 0.25, 0.82);
      cap.userData.noEdges = true;
      g.add(hill, cap);

      if (lv < 7) {
        const cursor = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 0.62), mats.goldPlating);
        cursor.position.set(px + 0.6, 0.25, 0.42);
        cursor.userData.noEdges = true;
        g.add(cursor);
      }
    }
    // Lower Vref DAC micro-step read-retry rail
    const dacRail = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.36, 0.16), mats.copperHybridBond);
    dacRail.position.set(0, -2.05, 0.22);
    dacRail.userData.noEdges = true;
    g.add(dacRail);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-vth-read-retry-tracker',
        96,
        '#3b82f6',
        g,
        new THREE.Vector3(3.6, 10.6, 1.18),
        new THREE.Vector3(98, 72, 62),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C97. Hardware LFSR Data Scrambler & Anti-Pattern Cell-Disturb Balancer
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(9.6, 5.4, 0.28, 0.24, 0.04, 'z'),
      u.bionzIpDieTile
    );
    g.add(base);

    // Left: uniform 0000/1111 risky pattern bars -> Center: Gold LFSR feedback XOR ring + shift-register taps -> Right: 4×4 balanced 50/50 checkerboard!
    for (let i = 0; i < 4; i++) {
      const raw = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.56, 0.16), mats.cinnabarAnodized);
      raw.position.set(-3.25, -1.25 + i * 0.84, 0.22);
      raw.userData.noEdges = true;
      g.add(raw);
    }
    const xorRing = new THREE.Mesh(hiResTorus(0.95, 0.15, 10, 24), mats.goldPlating);
    xorRing.position.set(-0.2, 0, 0.28);
    xorRing.userData.noEdges = true;
    const xorCrossH = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.16, 0.14), mats.goldPlating);
    xorCrossH.position.set(-0.2, 0, 0.28);
    xorCrossH.userData.noEdges = true;
    const xorCrossV = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.65, 0.14), mats.goldPlating);
    xorCrossV.position.set(-0.2, 0, 0.28);
    xorCrossV.userData.noEdges = true;
    g.add(xorRing, xorCrossH, xorCrossV);

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const balanced = new THREE.Mesh(
          new THREE.BoxGeometry(0.54, 0.56, 0.16),
          (r + c) % 2 === 0 ? mats.vcWorkingFluidCyan : mats.cfaGreen
        );
        balanced.position.set(1.75 + c * 0.72, -1.25 + r * 0.84, 0.22);
        balanced.userData.noEdges = true;
        g.add(balanced);
      }
    }

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-ldpc-data-scrambler',
        97,
        '#a855f7',
        g,
        new THREE.Vector3(-6.2, -10.4, 1.32),
        new THREE.Vector3(-74, -42, 76),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C98. PMIC Integrated OVP / UVLO / OCP Triple-Window Comparator & Bandgap Ref
  // =========================================================================
  {
    const g = new THREE.Group();
    const guardIc = buildChipPackage({
      w: 5.8,
      d: 4.4,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      pin1Mat: mats.cinnabarAnodized,
      axis: 'z',
    });
    guardIc.rotation.y = Math.PI;

    // Upper OVP (+3.63V red), Center Bandgap Reference (1.2V gold), Lower UVLO (2.97V amber) + precision divider resistors!
    const ovpBar = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.54, 0.14), mats.cinnabarAnodized);
    ovpBar.position.set(0, 1.1, -0.44);
    ovpBar.userData.noEdges = true;
    const bgRef = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.54, 0.14), mats.goldPlating);
    bgRef.position.set(0, 0, -0.44);
    bgRef.userData.noEdges = true;
    const uvloBar = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.54, 0.14), mats.tantalumCapYellow);
    uvloBar.position.set(0, -1.1, -0.44);
    uvloBar.userData.noEdges = true;

    // Twin precision 0.5% voltage-divider sense resistors + crowbar protection MOSFET flanking the IC!
    for (const ry of [-1.0, 1.0]) {
      const rDiv = buildSmdPassive(1.25, 0.62, 0.42, mats.mountShimBlue, mats.silverElectrode, 'z');
      rDiv.rotation.y = Math.PI;
      rDiv.position.set(-3.95, ry, -0.08);
      g.add(rDiv);
    }
    const clampFet = buildChipPackage({
      w: 1.85,
      d: 1.55,
      h: 0.56,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.copperHeatSpreader,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    clampFet.rotation.y = Math.PI;
    clampFet.position.set(4.15, 0, -0.06);

    g.add(guardIc, ovpBar, bgRef, uvloBar, clampFet);
    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-pmic-ovp-uvlo-guard',
        98,
        '#ef4444',
        g,
        new THREE.Vector3(7.2, -11.4, -0.86),
        new THREE.Vector3(74, -62, -58),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C99. USB4 40 Gbps Reader (Sony MRW-G3) PCIe Tunneling & CNC Thermal Dock Crown
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sleek cutaway CNC-machined bead-blasted gunmetal aluminum Sony MRW-G3 USB4 40Gbps reader crown
    // seated cleanly above the top pull-tab edge (y = +28.95) so BOTH card hero faces stay 100% unobstructed!
    const crownBaseGeo = createChamferedBoxGeo(35.2, 1.76, 4.7, 0.65, 0.12, 'z');
    applyPlanarUVs(crownBaseGeo, 35.2, 1.76, 'xy');
    const crownBase = new THREE.Mesh(crownBaseGeo, u.cfeMrwg3CncAluminum);
    crownBase.position.y = 0.08;

    // Dedicated rear (-Z) CNC aluminum nameplate plaque with upright 'xy-back' UVs (zero mirrored SONY MRW-G3 text!)
    const rearPlaqueGeo = createChamferedBoxGeo(34.6, 1.68, 0.10, 0.50, 0.02, 'z');
    applyPlanarUVs(rearPlaqueGeo, 34.6, 1.68, 'xy-back');
    const rearPlaque = new THREE.Mesh(rearPlaqueGeo, u.cfeMrwg3CncAluminum);
    rearPlaque.position.set(0, 0.08, -2.33);
    rearPlaque.userData.noEdges = true;

    // Lower pure-copper thermal-transfer coupling bridge + recessed compliant pink TIM strip contacting card top!
    const thermalBridge = new THREE.Mesh(
      createChamferedBoxGeo(29.8, 0.24, 3.6, 0.35, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    thermalBridge.position.set(0, -0.84, 0);
    thermalBridge.userData.noEdges = true;

    const timContactGeo = createChamferedBoxGeo(27.8, 0.12, 2.75, 0.25, 0.02, 'z');
    applyBoxUVs(timContactGeo, 8.0);
    const timContact = new THREE.Mesh(timContactGeo, u.cfeTimSiliconeWaffle);
    timContact.position.set(0, -0.96, 0);
    timContact.userData.noEdges = true;

    // Recessed dark-anodized inter-fin airflow plenum + 15 precision CNC chamfered cooling fins dissipating 40Gbps offload heat!
    const plenum = new THREE.Mesh(
      createChamferedBoxGeo(33.4, 0.24, 4.15, 0.28, 0.03, 'z'),
      mats.matteBlackAnodized
    );
    plenum.position.set(0, 1.00, 0);
    plenum.userData.noEdges = true;

    const finGeo = createChamferedBoxGeo(0.84, 0.98, 4.35, 0.14, 0.04, 'z');
    for (let i = -7; i <= 7; i++) {
      if (Math.abs(i) <= 1) continue; // Clear central cradle for USB4 Type-C port housing!
      const fin = new THREE.Mesh(finGeo, mats.stainlessMachined);
      fin.position.set(i * 2.18, 1.18, 0);
      fin.userData.noEdges = true;
      g.add(fin);
    }

    // Ultra-detailed seamless stainless USB4 Type-C 24-pin receptacle (drawn shell, EMI dimples, LCP tongue, stainless mid-plate, 2×12 gold pins!)
    const usbcShell = new THREE.Mesh(
      extrudeHiRes(createFrameShape(8.4, 2.35, 0.96, 7.1, 1.44, 0.56), 1.45, 0.07, 0.07, 2, 20),
      mats.titaniumRivet
    );
    usbcShell.rotation.x = Math.PI / 2;
    usbcShell.position.set(0, 1.94, 0);

    // Top laser-welded seam line & dual EMI grounding retention dimples on front/rear of Type-C shroud
    const dimpleGeo = hiResCyl(0.24, 0.24, 0.10, 10).rotateX(Math.PI / 2);
    for (const dx of [-2.2, 2.2]) {
      for (const dz of [-1.20, 1.20]) {
        const dmp = new THREE.Mesh(dimpleGeo, mats.stainlessMachined);
        dmp.position.set(dx, 1.96, dz);
        dmp.userData.noEdges = true;
        g.add(dmp);
      }
    }

    const usbcTongueGeo = createChamferedBoxGeo(5.9, 0.88, 0.34, 0.14, 0.03, 'z');
    applyBoxUVs(usbcTongueGeo, 4.0);
    const usbcTongue = new THREE.Mesh(usbcTongueGeo, u.cfeToughResinMold);
    usbcTongue.position.set(0, 1.94, 0);
    usbcTongue.userData.noEdges = true;

    // Stainless internal EMC mid-plate shield & side locking hooks inside the Type-C tongue
    const midPlate = new THREE.Mesh(new THREE.BoxGeometry(6.25, 0.92, 0.08), mats.stainlessMachined);
    midPlate.position.set(0, 1.94, 0);
    midPlate.userData.noEdges = true;

    const pinGeo = new THREE.BoxGeometry(0.22, 0.74, 0.07);
    const pinInst = new THREE.InstancedMesh(pinGeo, mats.goldPlating, 24);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let p = 0; p < 12; p++) {
      const px = -2.475 + p * 0.45;
      for (const pz of [-0.19, 0.19]) {
        dm.position.set(px, 1.94, pz);
        dm.updateMatrix();
        pinInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    pinInst.instanceMatrix.needsUpdate = true;
    pinInst.userData.noEdges = true;

    // Sculpted emerald USB4 40Gbps ACCESS status jewel LED + chamfered stainless bezel (front x=+14.8, rear x=-14.8 matching xy-back!)
    for (const [lx, sz] of [
      [14.8, 2.38],
      [-14.8, -2.38],
    ]) {
      const ledBezel = new THREE.Mesh(hiResTorus(0.36, 0.08, 6, 16), mats.stainlessMachined);
      ledBezel.position.set(lx, 0.08, sz);
      ledBezel.userData.noEdges = true;
      const ledJewel = new THREE.Mesh(hiResSphere(0.26, 10, 8), mats.cfaGreen);
      ledJewel.position.set(lx, 0.08, sz);
      ledJewel.userData.noEdges = true;
      g.add(ledBezel, ledJewel);
    }

    // Precision machined Torx-T3 assembly micro-screws with 6-lobe star drive recesses (front x=-16.35, rear x=+16.35 matching xy-back!)
    const screwHeadGeo = hiResCyl(0.40, 0.40, 0.12, 16).rotateX(Math.PI / 2);
    const torxSocketGeo = hiResCyl(0.18, 0.18, 0.14, 6).rotateX(Math.PI / 2);
    for (const [sx, sz] of [
      [-16.35, 2.36],
      [16.35, -2.36],
    ]) {
      const head = new THREE.Mesh(screwHeadGeo, mats.stainlessMachined);
      head.position.set(sx, 0.08, sz);
      head.userData.noEdges = true;
      const socket = new THREE.Mesh(torxSocketGeo, mats.matteBlackAnodized);
      socket.position.set(sx, 0.08, sz + (sz > 0 ? 0.02 : -0.02));
      socket.userData.noEdges = true;
      g.add(head, socket);
    }

    g.add(crownBase, rearPlaque, thermalBridge, timContact, plenum, usbcShell, usbcTongue, midPlate, pinInst);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-usb4-mrwg3-bridge-if',
        99,
        '#64748b',
        g,
        new THREE.Vector3(0, 28.95, 0),
        new THREE.Vector3(0, 62, -84),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C100. 6-Layer Environmental Protection Barrier (X-Ray / Magnetic / UV / ESD / Drop / IP57)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sleek internal multi-material protection perimeter frame seated strictly INSIDE the top armor recess!
    const magBarrier = new THREE.Mesh(
      extrudeHiRes(createFrameShape(35.8, 47.6, 1.9, 33.8, 45.6, 1.5), 0.18, 0.03, 0.03, 2, 20),
      mats.lensPermalloyShield
    );
    magBarrier.position.z = 0.08;

    const uvShield = new THREE.Mesh(
      extrudeHiRes(createFrameShape(34.6, 46.4, 1.7, 32.8, 44.6, 1.35), 0.16, 0.03, 0.03, 1, 20),
      mats.matteBlackAnodized
    );
    uvShield.position.z = -0.10;

    // Fine metallic ESD/X-ray Faraday perimeter grounding rail between the two shields
    const esdRail = new THREE.Mesh(
      extrudeHiRes(createFrameShape(35.1, 46.9, 1.8, 34.4, 46.2, 1.65), 0.08, 0.015, 0.015, 1, 18),
      mats.copperCoil
    );
    esdRail.position.z = 0.0;
    esdRail.userData.noEdges = true;

    // 4 gleaming corner dual-ring hexagonal environmental shield medallions (X-Ray / Magnetic / UV / ESD)
    const cornerCoords: Array<[number, number, THREE.Material]> = [
      [-15.2, 20.8, mats.goldPlating],
      [15.2, 20.8, mats.vcWorkingFluidCyan],
      [-15.2, -20.8, mats.cinnabarAnodized],
      [15.2, -20.8, mats.cfaGreen],
    ];
    const outerHexGeo = hiResCyl(1.48, 1.48, 0.22, 6).rotateX(Math.PI / 2);
    const innerHexGeo = hiResCyl(0.86, 0.86, 0.28, 6).rotateX(Math.PI / 2);
    for (const [cx, cy, mat] of cornerCoords) {
      const badge = new THREE.Mesh(outerHexGeo, mats.titaniumRivet);
      badge.position.set(cx, cy, 0.04);
      badge.userData.noEdges = true;
      const core = new THREE.Mesh(innerHexGeo, mat);
      core.position.set(cx, cy, 0.06);
      core.userData.noEdges = true;
      g.add(badge, core);
    }
    g.add(magBarrier, uvShield, esdRail);

    parts.push(
      finalizeCfexpressUltra28Part(
        'cfe-xray-magnetic-uv-shield',
        100,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 1.3, 1.88),
        new THREE.Vector3(-42, -30, 96),
        cp,
        0.16
      )
    );
  }

  return parts;
}
