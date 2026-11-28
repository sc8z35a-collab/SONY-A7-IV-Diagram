//@FLOW_MAP|file=src/assemblies/cfexpress/cfexpressUltra35Parts.ts|unit=cfexpress|lines=1897|exports=buildCfexpressUltra35Parts
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
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeCfexpressUltra35Part(
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
 * Phase 35B — Ultra-Granular CFexpress 4.0 Type A Deep Architecture Expansion (+40 Parts C131–C170 -> 170 Total Parts!).
 *
 * Covers 6 deeply researched engineering domains with zero overlap against C01–C130:
 *   Group A (C131–C137): Kioxia BiCS10 ISSCC 2025/2026 & 3D NAND Ultra-Micro Architecture
 *   Group B (C138–C149): PCIe 4.0 PHY/DLL/Transaction & NVMe 2.1–2.4 Protocol Hardware Engines
 *   Group C (C150–C153): LPDDR4X-4266 Internal Dual-Channel Sub-Circuits
 *   Group D (C154–C160): Board-Level Discrete Analog, Power, Sequencing & ESD Support Circuits
 *   Group E (C161–C167): mSAP 12/12um ABF, TCB/LAB, LTS Bi-Sn, C-SAM QA & Environmental Armor
 *   Group F (C168–C170): ASMedia ASM2464PD USB4 40Gbps Bridge, USB-C PD/CC & Sony α7 IV Combo-Slot Internals
 *
 * Strict Envelope Guarantee:
 *   - Every internal part (C131–C167) sits strictly inside the assembled Sony CEA-G1920T TOUGH housing
 *     (|x| + hx <= 15.8, y in [-21.8, +22.8], |z| + hz <= 1.65) -> ZERO bleed on C01/C02/C03/C05!
 *   - Reader parts (C168–C169) nest strictly inside C99 MRW-G3 crown (y=28.95, |z| <= 1.45).
 *   - Combo-slot part (C170) nests strictly inside C64 recessed bay (y=-29.35, z in [-1.05, -0.05]).
 */
export function buildCfexpressUltra35Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // GROUP A: Kioxia BiCS10 ISSCC 2025/2026 & 3D NAND Ultra-Micro Architecture (C131–C137)
  // =========================================================================

  // C131. BWWPC (Bonding Pads for Wafer-to-Wafer Power Connection) Top-Metal Power Grid
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.8, 0.22, 0.28, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.8, 'xy');
    const cmosWafer = new THREE.Mesh(baseGeo, u.v2BionzBacksidePdn);
    cmosWafer.position.z = -0.22;
    g.add(cmosWafer);

    const arrayWaferGeo = createChamferedBoxGeo(7.2, 4.4, 0.18, 0.24, 0.025, 'z');
    applyPlanarUVs(arrayWaferGeo, 7.2, 4.4, 'xy');
    const arrayWafer = new THREE.Mesh(arrayWaferGeo, u.cfeBiCS10WaferDie);
    arrayWafer.position.z = 0.24;
    g.add(arrayWafer);

    // 4-plane vertical floorplan BWWPC heavy copper power rails + 4×6 direct wafer-to-wafer Cu bonding pillar matrix!
    const railGeo = createChamferedBoxGeo(6.6, 0.24, 0.12, 0.05, 0.02, 'z');
    for (let r = -1.5; r <= 1.5; r += 1) {
      const rail = new THREE.Mesh(railGeo, mats.copperHybridBond);
      rail.position.set(0, r * 1.02, 0.02);
      rail.userData.noEdges = true;
      g.add(rail);
    }
    const padGeo = hiResCyl(0.18, 0.18, 0.26, 10).rotateX(Math.PI / 2);
    const padInst = new THREE.InstancedMesh(padGeo, mats.goldPlating, 24);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let cx = 0; cx < 6; cx++) {
      for (let cy = 0; cy < 4; cy++) {
        dm.position.set(-2.65 + cx * 1.06, -1.53 + cy * 1.02, 0.02);
        dm.updateMatrix();
        padInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    padInst.instanceMatrix.needsUpdate = true;
    padInst.userData.noEdges = true;
    g.add(padInst);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-bwwpc-wafer-power-grid',
        131,
        '#f59e0b',
        g,
        new THREE.Vector3(-4.2, 13.8, 0.42),
        new THREE.Vector3(-136, 118, 56),
        cp,
        0.18
      )
    );
  }

  // C132. BiCS10 2TI-DFE with Data-Driven Self-Reset (DDSR) & Per-Pin VREF Training Receiver
  {
    const g = new THREE.Group();
    const carrierGeo = createChamferedBoxGeo(7.6, 4.6, 0.22, 0.28, 0.03, 'z');
    applyPlanarUVs(carrierGeo, 7.6, 4.6, 'xy');
    const carrier = new THREE.Mesh(carrierGeo, u.cfeSerdesEyeDiagramDie);
    g.add(carrier);

    // 2-way Time-Interleaved DFE sense-amp twin cores (cut from 4 to 2!) + central 3-input NAND DDSR latch ring
    for (const sx of [-2.05, 2.05]) {
      const saBlock = new THREE.Mesh(
        createChamferedBoxGeo(2.0, 2.6, 0.26, 0.22, 0.03, 'z'),
        mats.siliconLogicLayer
      );
      saBlock.position.set(sx, 0.1, 0.22);
      const vrefTrim = new THREE.Mesh(
        createChamferedBoxGeo(1.5, 0.48, 0.12, 0.08, 0.02, 'z'),
        mats.goldPlating
      );
      vrefTrim.position.set(sx, -1.45, 0.18);
      vrefTrim.userData.noEdges = true;
      g.add(saBlock, vrefTrim);
    }
    const ddsrRing = new THREE.Mesh(hiResTorus(0.76, 0.14, 8, 20), mats.vcWorkingFluidCyan);
    ddsrRing.position.set(0, 0.15, 0.28);
    ddsrRing.userData.noEdges = true;
    const ddsrCore = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.26, 16).rotateX(Math.PI / 2), mats.copperCoil);
    ddsrCore.position.set(0, 0.15, 0.24);
    ddsrCore.userData.noEdges = true;
    g.add(ddsrRing, ddsrCore);

    // Feedback tap bridge connecting twin 2TI-DFE stages
    const fbPts = [
      new THREE.Vector3(-2.05, 1.45, 0.36),
      new THREE.Vector3(0, 1.85, 0.44),
      new THREE.Vector3(2.05, 1.45, 0.36),
    ];
    const fbTube = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(fbPts), 18, 0.09, 6, false)),
      mats.goldPlating
    );
    fbTube.userData.noEdges = true;
    g.add(fbTube);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-2ti-dfe-ddsr-receiver',
        132,
        '#06b6d4',
        g,
        new THREE.Vector3(-0.8, 10.2, 0.48),
        new THREE.Vector3(-114, 134, 62),
        cp,
        0.18
      )
    );
  }

  // C133. Unselected Word-Line Intermediate-Potential Swing Reduction Precharge Bank
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.28, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeMolyWordlineMetal);
    g.add(base);

    // 7 parallel Mo wordline bus fingers: 1 hot selected WL (gold) + 6 intermediate-potential precharge WLs (cyan/copper)
    for (let i = 0; i < 7; i++) {
      const y = -1.62 + i * 0.54;
      const isSelected = i === 3;
      const wl = new THREE.Mesh(
        createChamferedBoxGeo(6.4, 0.24, isSelected ? 0.28 : 0.18, 0.06, 0.02, 'z'),
        isSelected ? mats.goldPlating : i % 2 === 0 ? mats.vcWorkingFluidCyan : mats.copperHeatSpreader
      );
      wl.position.set(0, y, isSelected ? 0.24 : 0.19);
      wl.userData.noEdges = true;
      g.add(wl);
    }
    // Intermediate-V reservoir capacitor bar on left flank
    const resBar = new THREE.Mesh(
      createChamferedBoxGeo(0.76, 3.9, 0.34, 0.14, 0.03, 'z'),
      mats.siliconDramLayer
    );
    resBar.position.set(-3.1, 0, 0.26);
    g.add(resBar);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-wl-swing-precharge',
        133,
        '#38bdf8',
        g,
        new THREE.Vector3(2.8, 12.2, 0.44),
        new THREE.Vector3(-86, 146, 54),
        cp,
        0.18
      )
    );
  }

  // C134. 32-Die Twin-Tower Sub-2mm Package Stack & Cantilever Overhang Wirebond Pyramid
  {
    const g = new THREE.Group();
    const subGeo = createChamferedBoxGeo(7.8, 4.8, 0.18, 0.26, 0.03, 'z');
    applyPlanarUVs(subGeo, 7.8, 4.8, 'xy');
    const sub = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);
    sub.position.z = -0.26;
    g.add(sub);

    // Twin 8-stepped micro-towers (visualizing 16+16 = 32 ultrathin 30μm stepped NAND dies with staggered overhang)
    for (const side of [-1, 1]) {
      for (let tier = 0; tier < 8; tier++) {
        const w = 2.65 - tier * 0.06;
        const h = 3.55 - tier * 0.04;
        const die = new THREE.Mesh(
          createChamferedBoxGeo(w, h, 0.055, 0.08, 0.01, 'z'),
          tier % 2 === 0 ? mats.siliconBulk : mats.siliconLogicLayer
        );
        die.position.set(side * (1.85 - tier * 0.08), 0, -0.13 + tier * 0.068);
        die.userData.noEdges = true;
        g.add(die);
      }
      // Fine cantilever gold wirebond cascade down the outer step edge
      for (let wIdx = 0; wIdx < 4; wIdx++) {
        const wy = -1.2 + wIdx * 0.8;
        const wirePts = [
          new THREE.Vector3(side * 1.45, wy, 0.36),
          new THREE.Vector3(side * 2.95, wy, 0.22),
          new THREE.Vector3(side * 3.55, wy, -0.14),
        ];
        const wire = new THREE.Mesh(
          markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wirePts), 12, 0.045, 5, false)),
          mats.goldPlating
        );
        wire.userData.noEdges = true;
        g.add(wire);
      }
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-32die-twintower-stack',
        134,
        '#6366f1',
        g,
        new THREE.Vector3(-1.4, 15.6, -0.35),
        new THREE.Vector3(-54, 156, 46),
        cp,
        0.18
      )
    );
  }

  // C135. 3D NAND Dummy Channel Support Pillars (Replacement-Gate Anti-Collapse Columns)
  {
    const g = new THREE.Group();
    const plateGeo = createChamferedBoxGeo(7.4, 4.6, 0.16, 0.24, 0.025, 'z');
    applyPlanarUVs(plateGeo, 7.4, 4.6, 'xy');
    const floor = new THREE.Mesh(plateGeo, u.cfeQuantumChargeTrapStack);
    floor.position.z = -0.26;
    const roof = new THREE.Mesh(
      extrudeHiRes(createFrameShape(7.2, 4.4, 0.24, 5.9, 3.1, 0.14), 0.14, 0.02, 0.02, 1, 14),
      mats.tungstenGrid
    );
    roof.position.z = 0.20;
    g.add(floor, roof);

    // 18 hexagonal structural dummy SiO2/Poly-Si support pillars bracing 332-layer wordline decks against collapse
    const pilGeo = hiResCyl(0.18, 0.20, 0.56, 6).rotateX(Math.PI / 2);
    const pilInst = new THREE.InstancedMesh(pilGeo, mats.ceramicAlumina, 18);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let ix = 0; ix < 6; ix++) {
      for (let iy = 0; iy < 3; iy++) {
        dm.position.set(-2.5 + ix * 1.0 + (iy % 2) * 0.22, -1.25 + iy * 1.25, 0.02);
        dm.updateMatrix();
        pilInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    pilInst.instanceMatrix.needsUpdate = true;
    pilInst.userData.noEdges = true;
    g.add(pilInst);

    // 4 golden active channel pillars highlighting mechanical vs electrical column distinction
    const actGeo = hiResCyl(0.13, 0.13, 0.62, 10).rotateX(Math.PI / 2);
    for (const [ax, ay] of [
      [-1.5, -0.6],
      [0.5, 0.6],
      [1.5, -0.6],
      [-0.5, 0.6],
    ]) {
      const act = new THREE.Mesh(actGeo, mats.goldPlating);
      act.position.set(ax, ay, 0.04);
      act.userData.noEdges = true;
      g.add(act);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-dummy-channel-support',
        135,
        '#cbd5e1',
        g,
        new THREE.Vector3(-6.2, 16.4, 0.36),
        new THREE.Vector3(-152, 92, 42),
        cp,
        0.18
      )
    );
  }

  // C136. On-Die eFuse Redundancy & Bad-Column/Block Remap Bank
  {
    const g = new THREE.Group();
    const dieGeo = createChamferedBoxGeo(7.2, 4.4, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(dieGeo, 7.2, 4.4, 'xy');
    const die = new THREE.Mesh(dieGeo, u.v2BionzSramArray);
    g.add(die);

    // 10 blown/intact copper eFuse links (blown fuses show red gap + rerouted cyan spare column bar!)
    for (let i = 0; i < 10; i++) {
      const fx = -2.7 + i * 0.60;
      const blown = i === 2 || i === 7;
      if (blown) {
        const topHalf = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.95, 0.16), mats.copperCoil);
        topHalf.position.set(fx, 0.85, 0.18);
        const botHalf = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.95, 0.16), mats.copperCoil);
        botHalf.position.set(fx, -0.85, 0.18);
        const burnGap = new THREE.Mesh(hiResSphere(0.16, 8, 6), mats.cfaRed);
        burnGap.position.set(fx, 0, 0.22);
        topHalf.userData.noEdges = botHalf.userData.noEdges = burnGap.userData.noEdges = true;
        g.add(topHalf, botHalf, burnGap);
      } else {
        const intact = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.65, 0.16), mats.goldPlating);
        intact.position.set(fx, 0, 0.18);
        intact.userData.noEdges = true;
        g.add(intact);
      }
    }
    // Redundant spare column crossbar at top
    const spareBus = new THREE.Mesh(
      createChamferedBoxGeo(6.2, 0.44, 0.22, 0.08, 0.02, 'z'),
      mats.vcWorkingFluidCyan
    );
    spareBus.position.set(0, 1.68, 0.20);
    g.add(spareBus);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-efuse-redundancy-repair',
        136,
        '#ef4444',
        g,
        new THREE.Vector3(6.2, 14.8, 0.46),
        new THREE.Vector3(-156, 60, 28),
        cp,
        0.18
      )
    );
  }

  // C137. Program-Suspend / Read-Resume & Multi-Plane Cache-Read Pipeline
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeBiCS10WaferDie);
    g.add(base);

    // Split TLC write bar paused in mid-flight (amber blocks) + urgent high-priority read lane (bright cyan bridge jumping over!)
    for (const [bx, bw] of [
      [-2.15, 2.2],
      [2.15, 2.2],
    ]) {
      const progBar = new THREE.Mesh(
        createChamferedBoxGeo(bw, 1.35, 0.26, 0.14, 0.03, 'z'),
        mats.tantalumCapYellow
      );
      progBar.position.set(bx, -0.75, 0.22);
      g.add(progBar);
    }
    // Central pause gate (twin vertical emerald pause bars)
    for (const px of [-0.32, 0.32]) {
      const pauseBar = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 1.35, 0.36, 0.06, 0.02, 'z'),
        mats.cfaGreen
      );
      pauseBar.position.set(px, -0.75, 0.28);
      pauseBar.userData.noEdges = true;
      g.add(pauseBar);
    }
    // Fast cache-read bypass rail on upper half
    const readRail = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 0.72, 0.28, 0.14, 0.03, 'z'),
      mats.vcWorkingFluidCyan
    );
    readRail.position.set(0, 1.15, 0.24);
    g.add(readRail);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-prog-suspend-resume',
        137,
        '#10b981',
        g,
        new THREE.Vector3(-8.4, 10.6, 0.44),
        new THREE.Vector3(-164, 24, 18),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // GROUP B: PCIe 4.0 PHY/DLL/Transaction & NVMe 2.1–2.4 Protocol Hardware Engines (C138–C149)
  // =========================================================================

  // C138. PCIe 4.0 SRIS / SSC (5000 ppm) RX Elastic Buffer & SKP Ordered-Set Compensator
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeSerdesEyeDiagramDie);
    g.add(base);

    // 8-slot circular FIFO elastic buffer ring with dual read/write clock domain pointers (host SSC vs local XTAL)
    const ring = new THREE.Mesh(hiResTorus(1.45, 0.22, 10, 28), mats.siliconLogicLayer);
    ring.position.set(0, 0, 0.24);
    g.add(ring);

    const slotGeo = createChamferedBoxGeo(0.42, 0.42, 0.22, 0.08, 0.02, 'z');
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2;
      const slot = new THREE.Mesh(
        slotGeo,
        i === 0 ? mats.cfaRed : i === 4 ? mats.vcWorkingFluidCyan : mats.goldPlating
      );
      slot.position.set(Math.cos(ang) * 1.45, Math.sin(ang) * 1.45, 0.34);
      slot.rotation.z = ang;
      slot.userData.noEdges = true;
      g.add(slot);
    }
    // Left RX / Right Core clock-domain isolator bars
    for (const [bx, mat] of [
      [-2.95, mats.copperHeatSpreader],
      [2.95, mats.vcWorkingFluidCyan],
    ] as Array<[number, THREE.Material]>) {
      const bar = new THREE.Mesh(createChamferedBoxGeo(0.75, 3.4, 0.26, 0.12, 0.03, 'z'), mat);
      bar.position.set(bx, 0, 0.22);
      g.add(bar);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-sris-elastic-skp-buf',
        138,
        '#0ea5e9',
        g,
        new THREE.Vector3(-4.6, -13.6, 0.42),
        new THREE.Vector3(-168, -12, 26),
        cp,
        0.18
      )
    );
  }

  // C139. PCIe 4.0 Lane Margining at Receiver (LMR) Control-SKP Eye Scanner
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeSerdesEyeDiagramDie);
    g.add(base);

    // Sculpted 3D PCIe Gen4 16 GT/s open eye contour diamond + 4-axis timing/voltage margin crosshairs!
    const eyeTopPts = [
      new THREE.Vector3(-2.6, 0, 0.28),
      new THREE.Vector3(0, 1.35, 0.42),
      new THREE.Vector3(2.6, 0, 0.28),
    ];
    const eyeBotPts = [
      new THREE.Vector3(-2.6, 0, 0.28),
      new THREE.Vector3(0, -1.35, 0.42),
      new THREE.Vector3(2.6, 0, 0.28),
    ];
    for (const pts of [eyeTopPts, eyeBotPts]) {
      const curve = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 22, 0.11, 8, false)),
        mats.vcWorkingFluidCyan
      );
      curve.userData.noEdges = true;
      g.add(curve);
    }
    const hAxis = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.14, 0.14), mats.goldPlating);
    hAxis.position.set(0, 0, 0.30);
    const vAxis = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.4, 0.14), mats.cfaRed);
    vAxis.position.set(0, 0, 0.32);
    const centerDot = new THREE.Mesh(hiResSphere(0.24, 10, 8), mats.goldPlating);
    centerDot.position.set(0, 0, 0.38);
    hAxis.userData.noEdges = vAxis.userData.noEdges = centerDot.userData.noEdges = true;
    g.add(hAxis, vAxis, centerDot);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-pcie-lmr-eye-scanner',
        139,
        '#22d3ee',
        g,
        new THREE.Vector3(-1.2, -13.2, 0.48),
        new THREE.Vector3(-162, -48, 38),
        cp,
        0.18
      )
    );
  }

  // C140. PCIe Data-Link Layer TLP Replay (Retry) Buffer & 32-bit LCRC / Ack-Nak Engine
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzFeolFinfet);
    g.add(base);

    // 4 stacked TLP packet frames waiting in replay queue + curved golden retry loop tube + green Ack / red Nak gate
    for (let i = 0; i < 4; i++) {
      const pkt = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 2.2, 0.24, 0.12, 0.025, 'z'),
        i === 3 ? mats.cfaGreen : mats.siliconLogicLayer
      );
      pkt.position.set(-2.35 + i * 1.38, -0.35, 0.22);
      g.add(pkt);
    }
    const loopPts = [
      new THREE.Vector3(1.8, 0.95, 0.36),
      new THREE.Vector3(0, 1.72, 0.48),
      new THREE.Vector3(-2.35, 0.95, 0.36),
    ];
    const retryTube = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(loopPts), 20, 0.10, 6, false)),
      mats.goldPlating
    );
    retryTube.userData.noEdges = true;
    const lcrcBadge = new THREE.Mesh(
      createChamferedBoxGeo(1.1, 2.2, 0.28, 0.14, 0.03, 'z'),
      mats.copperHeatSpreader
    );
    lcrcBadge.position.set(2.95, -0.35, 0.24);
    g.add(retryTube, lcrcBadge);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-pcie-tlp-replay-lcrc',
        140,
        '#f97316',
        g,
        new THREE.Vector3(-6.8, -12.6, -0.42),
        new THREE.Vector3(-148, -82, -26),
        cp,
        0.18
      )
    );
  }

  // C141. PCIe Configuration Space (Class 01:08:02), BAR0 MMIO & Bus-Master Bridge
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeControllerPkg);
    g.add(base);

    // 4-register BAR0 / CAP / AQA / CC golden MMIO register bank + Bus-Master DMA switch bridge
    const regColors = [mats.goldPlating, mats.vcWorkingFluidCyan, mats.copperHeatSpreader, mats.cfaGreen];
    for (let i = 0; i < 4; i++) {
      const reg = new THREE.Mesh(
        createChamferedBoxGeo(5.8, 0.56, 0.22, 0.08, 0.02, 'z'),
        regColors[i]
      );
      reg.position.set(-0.25, 1.38 - i * 0.92, 0.22);
      reg.userData.noEdges = true;
      g.add(reg);
    }
    const dmaBridge = new THREE.Mesh(
      createChamferedBoxGeo(0.72, 3.6, 0.32, 0.12, 0.03, 'z'),
      mats.stainlessMachined
    );
    dmaBridge.position.set(3.05, 0, 0.26);
    g.add(dmaBridge);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-pcie-bar0-cfg-space',
        141,
        '#eab308',
        g,
        new THREE.Vector3(-7.6, -9.4, 0.44),
        new THREE.Vector3(-126, -112, 32),
        cp,
        0.18
      )
    );
  }

  // C142. NVMe Submission/Completion Ring Queues (SQ/CQ) & 4-Byte BAR0 Doorbell Detector
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.8, 4.8, 0.20, 0.28, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.8, 4.8, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzBeolDamascene);
    g.add(base);

    // Twin interlocking circular SQ (cyan, left) & CQ (emerald, right) ring buffers + central golden 4-byte Doorbell chime!
    const sqRing = new THREE.Mesh(hiResTorus(1.32, 0.22, 10, 26), mats.vcWorkingFluidCyan);
    sqRing.position.set(-1.75, 0, 0.26);
    const cqRing = new THREE.Mesh(hiResTorus(1.32, 0.22, 10, 26), mats.cfaGreen);
    cqRing.position.set(1.75, 0, 0.26);
    const bellCore = new THREE.Mesh(hiResCyl(0.54, 0.64, 0.34, 16).rotateX(Math.PI / 2), mats.goldPlating);
    bellCore.position.set(0, 0, 0.30);
    const bellDot = new THREE.Mesh(hiResSphere(0.22, 10, 8), mats.cfaRed);
    bellDot.position.set(0, 0, 0.50);
    bellDot.userData.noEdges = true;
    g.add(sqRing, cqRing, bellCore, bellDot);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-nvme-sqcq-doorbell',
        142,
        '#14b8a6',
        g,
        new THREE.Vector3(-4.2, -9.2, 0.46),
        new THREE.Vector3(-98, -134, 48),
        cp,
        0.18
      )
    );
  }

  // C143. NVMe PRP / SGL Hardware Scatter-Gather Zero-Copy DMA Engine
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeControllerPkg);
    g.add(base);

    // 4 scattered 4KB host RAM page tiles on left funneling via 4 curved copper DMA conduits into 1 contiguous NAND stream on right
    for (let i = 0; i < 4; i++) {
      const py = -1.42 + i * 0.95;
      const page = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 0.62, 0.22, 0.08, 0.02, 'z'),
        mats.siliconDramLayer
      );
      page.position.set(-2.65, py, 0.22);
      page.userData.noEdges = true;
      const dmaTube = new THREE.Mesh(
        markHiRes(
          new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-2.05, py, 0.26),
              new THREE.Vector3(-0.2, py * 0.45, 0.38),
              new THREE.Vector3(1.55, 0, 0.26),
            ]),
            16,
            0.075,
            6,
            false
          )
        ),
        mats.copperHeatSpreader
      );
      dmaTube.userData.noEdges = true;
      g.add(page, dmaTube);
    }
    const gatherBlock = new THREE.Mesh(
      createChamferedBoxGeo(1.65, 3.2, 0.30, 0.16, 0.03, 'z'),
      mats.vcWorkingFluidCyan
    );
    gatherBlock.position.set(2.45, 0, 0.26);
    g.add(gatherBlock);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-nvme-prp-sgl-dma',
        143,
        '#3b82f6',
        g,
        new THREE.Vector3(-5.8, -6.4, -0.44),
        new THREE.Vector3(-66, -148, -32),
        cp,
        0.18
      )
    );
  }

  // C144. NVMe MSI-X Per-Queue Interrupt Vector Table & Coalescing Aggregator
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.4, 4.4, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.4, 4.4, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzFeolFinfet);
    g.add(base);

    // 16-entry MSI-X vector matrix (4×4 gold tiles) converging into a single coalesced IRQ beacon dome
    const cellGeo = createChamferedBoxGeo(0.76, 0.62, 0.20, 0.08, 0.02, 'z');
    for (let cx = 0; cx < 4; cx++) {
      for (let cy = 0; cy < 4; cy++) {
        const cell = new THREE.Mesh(cellGeo, (cx + cy) % 2 === 0 ? mats.goldPlating : mats.siliconLogicLayer);
        cell.position.set(-2.55 + cx * 0.96, -1.2 + cy * 0.80, 0.20);
        cell.userData.noEdges = true;
        g.add(cell);
      }
    }
    const aggRing = new THREE.Mesh(hiResTorus(0.96, 0.16, 8, 22), mats.cfaRed);
    aggRing.position.set(2.15, 0, 0.24);
    const aggDome = new THREE.Mesh(hiResSphere(0.48, 12, 10), mats.goldPlating);
    aggDome.scale.set(1, 1, 0.6);
    aggDome.position.set(2.15, 0, 0.28);
    aggDome.userData.noEdges = true;
    g.add(aggRing, aggDome);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-nvme-msix-coalescing',
        144,
        '#f43f5e',
        g,
        new THREE.Vector3(-8.8, -5.2, 0.42),
        new THREE.Vector3(-32, -156, 36),
        cp,
        0.18
      )
    );
  }

  // C145. NVMe Sanitize (Opcode 0x84) Crypto-Erase & Silicon-Fused HUK / MEK TCG Opal Vault
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.8, 0.22, 0.28, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.8, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfePqcSecurityDie);
    g.add(base);

    // Armored titanium security vault frame + dual concentric key lock cylinders (HUK inner + MEK outer!)
    const vaultFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(6.2, 3.6, 0.32, 4.9, 2.4, 0.20), 0.26, 0.03, 0.03, 1, 16),
      mats.titaniumRivet
    );
    vaultFrame.position.z = 0.22;
    const mekRing = new THREE.Mesh(hiResTorus(1.02, 0.16, 8, 24), mats.goldPlating);
    mekRing.position.set(0, 0, 0.30);
    const hukCore = new THREE.Mesh(hiResCyl(0.52, 0.52, 0.34, 6).rotateX(Math.PI / 2), mats.cinnabarAnodized);
    hukCore.position.set(0, 0, 0.30);
    // 6-pin laser-fused HUK bit bar on left
    for (let i = 0; i < 6; i++) {
      const bit = new THREE.Mesh(hiResCyl(0.11, 0.11, 0.28, 8).rotateX(Math.PI / 2), mats.vcWorkingFluidCyan);
      bit.position.set(-2.05, -0.95 + i * 0.38, 0.26);
      bit.userData.noEdges = true;
      g.add(bit);
    }
    g.add(vaultFrame, mekRing, hukCore);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-nvme-sanitize-huk-mek',
        145,
        '#a855f7',
        g,
        new THREE.Vector3(-8.4, -2.0, -0.46),
        new THREE.Vector3(6, -158, -42),
        cp,
        0.18
      )
    );
  }

  // C146. NVMe APST Autonomous Power State Timer & Dynamic Auto Power Save (-89%)
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.4, 4.4, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.4, 4.4, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzPmicIc);
    g.add(base);

    // 5 stepped power-state terraces (PS0 Active 3.8W -> PS1 -> PS2 -> PS3 -> PS4 Deep Sleep 0.05W = -89%!)
    const psHeights = [0.58, 0.44, 0.32, 0.22, 0.14];
    const psMats = [mats.cfaRed, mats.copperHeatSpreader, mats.goldPlating, mats.vcWorkingFluidCyan, mats.cfaGreen];
    for (let i = 0; i < 5; i++) {
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.95, 2.6, psHeights[i], 0.10, 0.02, 'z'),
        psMats[i]
      );
      bar.position.set(-2.35 + i * 1.18, -0.15, 0.10 + psHeights[i] * 0.5);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    // Watchdog idle timer ring above PS3/PS4
    const timerRing = new THREE.Mesh(hiResTorus(0.58, 0.10, 8, 20), mats.cfaGreen);
    timerRing.position.set(2.35, 1.38, 0.26);
    timerRing.userData.noEdges = true;
    g.add(timerRing);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-nvme-apst-autosave',
        146,
        '#22c55e',
        g,
        new THREE.Vector3(-4.2, -5.2, 0.42),
        new THREE.Vector3(44, -154, 44),
        cp,
        0.18
      )
    );
  }

  // C147. NVMe Persistent Event Log & Media Scan Utility Telemetry Black-Box
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.4, 4.4, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.4, 4.4, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeControllerPkg);
    g.add(base);

    // Circular flight-recorder black-box ring + 3 diagnostic telemetry ledger bars (Thermal / ECC Retry / Power Loss)
    const dial = new THREE.Mesh(hiResCyl(1.22, 1.22, 0.26, 22).rotateX(Math.PI / 2), mats.matteBlackAnodized);
    dial.position.set(-1.75, 0, 0.22);
    const dialRim = new THREE.Mesh(hiResTorus(1.24, 0.14, 8, 24), mats.copperHeatSpreader);
    dialRim.position.set(-1.75, 0, 0.28);
    g.add(dial, dialRim);

    for (let i = 0; i < 3; i++) {
      const ledger = new THREE.Mesh(
        createChamferedBoxGeo(2.85, 0.62, 0.22, 0.10, 0.02, 'z'),
        i === 0 ? mats.cfaRed : i === 1 ? mats.goldPlating : mats.vcWorkingFluidCyan
      );
      ledger.position.set(1.55, 1.05 - i * 1.05, 0.22);
      ledger.userData.noEdges = true;
      g.add(ledger);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-nvme-telemetry-log',
        147,
        '#f59e0b',
        g,
        new THREE.Vector3(-1.4, -6.2, -0.44),
        new THREE.Vector3(78, -144, -36),
        cp,
        0.18
      )
    );
  }

  // C148. FTL Background Garbage Collection (GC) Valid-Page Compactor & Dynamic OP Spare Pool
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.v2BionzSramArray);
    g.add(base);

    // Left fragmented dirty block (mixed valid cyan & stale red pages) -> right compacted clean block + gold 12% OP reserve
    const pageGeo = createChamferedBoxGeo(0.68, 0.68, 0.20, 0.08, 0.02, 'z');
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const isValid = (r + c) % 2 === 0;
        const p = new THREE.Mesh(pageGeo, isValid ? mats.vcWorkingFluidCyan : mats.cfaRed);
        p.position.set(-2.65 + c * 0.85, -0.95 + r * 0.95, 0.22);
        p.userData.noEdges = true;
        g.add(p);
      }
    }
    // Compacted destination block (all clean cyan) + OP gold reserve bar
    const cleanBlock = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 2.55, 0.28, 0.14, 0.03, 'z'),
      mats.vcWorkingFluidCyan
    );
    cleanBlock.position.set(1.25, 0, 0.24);
    const opReserve = new THREE.Mesh(
      createChamferedBoxGeo(0.76, 2.55, 0.30, 0.12, 0.03, 'z'),
      mats.goldPlating
    );
    opReserve.position.set(2.85, 0, 0.26);
    g.add(cleanBlock, opReserve);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-ftl-gc-op-compactor',
        148,
        '#06b6d4',
        g,
        new THREE.Vector3(-7.6, 1.4, 0.44),
        new THREE.Vector3(-148, -118, 22),
        cp,
        0.18
      )
    );
  }

  // C149. NVMe ZNS (Zoned Namespaces) Sequential Cinema Write-Stream Zone Buffer
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeBiCS10WaferDie);
    g.add(base);

    // 4 parallel append-only cinema ZNS zones (8K RAW / X-OCN / Proxy / Audio) with write-pointer cursors!
    const zMats = [mats.vcWorkingFluidCyan, mats.cfaGreen, mats.goldPlating, mats.copperHeatSpreader];
    const fillFracs = [0.85, 0.62, 0.45, 0.92];
    for (let i = 0; i < 4; i++) {
      const zy = 1.38 - i * 0.92;
      const track = new THREE.Mesh(
        createChamferedBoxGeo(6.2, 0.56, 0.14, 0.08, 0.02, 'z'),
        mats.matteBlackAnodized
      );
      track.position.set(0, zy, 0.16);
      track.userData.noEdges = true;
      const fw = 6.0 * fillFracs[i];
      const fill = new THREE.Mesh(
        createChamferedBoxGeo(fw, 0.42, 0.22, 0.06, 0.02, 'z'),
        zMats[i]
      );
      fill.position.set(-3.0 + fw * 0.5, zy, 0.24);
      fill.userData.noEdges = true;
      const wp = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.34, 10).rotateX(Math.PI / 2), mats.cfaRed);
      wp.position.set(-3.0 + fw, zy, 0.28);
      wp.userData.noEdges = true;
      g.add(track, fill, wp);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-nvme-zns-cinema-zone',
        149,
        '#ec4899',
        g,
        new THREE.Vector3(-4.2, 3.6, -0.42),
        new THREE.Vector3(-124, -142, -24),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // GROUP C: LPDDR4X-4266 Internal Dual-Channel Sub-Circuits (C150–C153)
  // =========================================================================

  // C150. LPDDR4X Dual-Channel 8-Bank 1T1C Trench-Capacitor Array & Row Sense-Amps
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.8, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.8, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzLpddr5xDie);
    g.add(base);

    // 2×4 = 8 independent DRAM banks (Ch-A left 4, Ch-B right 4) with central sense-amp spine
    const bankGeo = createChamferedBoxGeo(1.42, 1.56, 0.26, 0.12, 0.025, 'z');
    for (let bx = 0; bx < 4; bx++) {
      for (let by = 0; by < 2; by++) {
        const bank = new THREE.Mesh(
          bankGeo,
          bx < 2 ? mats.siliconDramLayer : mats.siliconTsvDram
        );
        bank.position.set(-2.65 + bx * 1.62 + (bx >= 2 ? 0.44 : 0), -0.95 + by * 1.9, 0.22);
        bank.userData.noEdges = true;
        g.add(bank);
      }
    }
    const senseSpine = new THREE.Mesh(
      createChamferedBoxGeo(0.36, 4.0, 0.34, 0.06, 0.02, 'z'),
      mats.goldPlating
    );
    senseSpine.position.set(0, 0, 0.26);
    g.add(senseSpine);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-lpddr4x-8bank-1t1c',
        150,
        '#8b5cf6',
        g,
        new THREE.Vector3(8.6, -7.8, 0.46),
        new THREE.Vector3(114, -126, 44),
        cp,
        0.18
      )
    );
  }

  // C151. LPDDR4X Data Bus Inversion (DBI-AC/DC) Low-SSO Switching Encoder
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.4, 4.4, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.4, 4.4, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeLpddr4Pkg);
    g.add(base);

    // 8 DQ bit bars + 9th DBI_n inversion flag bar (amber) illustrating majority-vote bit-flip suppression
    for (let i = 0; i < 9; i++) {
      const isDbi = i === 8;
      const h = isDbi ? 0.36 : i % 3 === 0 ? 0.28 : 0.16;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.46, 3.1, h, 0.08, 0.02, 'z'),
        isDbi ? mats.goldPlating : i % 3 === 0 ? mats.vcWorkingFluidCyan : mats.siliconDramLayer
      );
      bar.position.set(-2.8 + i * 0.70, 0, 0.10 + h * 0.5);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-lpddr4x-dbi-encoder',
        151,
        '#a855f7',
        g,
        new THREE.Vector3(9.4, -10.8, -0.44),
        new THREE.Vector3(138, -102, 26),
        cp,
        0.18
      )
    );
  }

  // C152. LPDDR4X Target Row Refresh (TRR) RowHammer Guard & TCSR Thermal Refresh
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.4, 4.4, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.4, 4.4, 'xy');
    const base = new THREE.Mesh(baseGeo, u.bionzLpddr5xDie);
    g.add(base);

    // 5 horizontal DRAM rows: center red hammered Aggressor Row flanked by 2 glowing emerald TRR-protected Victim Rows!
    const rowMats = [mats.siliconDramLayer, mats.cfaGreen, mats.cfaRed, mats.cfaGreen, mats.siliconDramLayer];
    for (let i = 0; i < 5; i++) {
      const row = new THREE.Mesh(
        createChamferedBoxGeo(5.2, 0.48, i === 2 ? 0.30 : 0.20, 0.08, 0.02, 'z'),
        rowMats[i]
      );
      row.position.set(-0.55, 1.4 - i * 0.70, 0.22);
      row.userData.noEdges = true;
      g.add(row);
    }
    // TCSR on-die thermal sensor bulb on right
    const thermBulb = new THREE.Mesh(hiResSphere(0.56, 12, 10), mats.copperHeatSpreader);
    thermBulb.scale.set(1, 1, 0.6);
    thermBulb.position.set(2.65, 0, 0.28);
    thermBulb.userData.noEdges = true;
    g.add(thermBulb);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-lpddr4x-trr-tcsr',
        152,
        '#ef4444',
        g,
        new THREE.Vector3(7.4, -5.2, -0.42),
        new THREE.Vector3(154, -74, -22),
        cp,
        0.18
      )
    );
  }

  // C153. LPDDR4X Write Leveling (DWL) & CS/CA-Vref 4266 MT/s Skew Training Engine
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.4, 4.4, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(baseGeo, 7.4, 4.4, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeSerdesEyeDiagramDie);
    g.add(base);

    // Dual phase-aligned CK (gold) & DQS (cyan) serpentine delay-line tuning coils
    for (const [zOff, yOff, mat] of [
      [0.24, 0.78, mats.goldPlating],
      [0.24, -0.78, mats.vcWorkingFluidCyan],
    ] as Array<[number, number, THREE.Material]>) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        pts.push(new THREE.Vector3(-2.8 + t * 5.6, yOff + Math.sin(t * Math.PI * 5) * 0.42, zOff + 0.08));
      }
      const wave = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 28, 0.085, 6, false)),
        mat
      );
      wave.userData.noEdges = true;
      g.add(wave);
    }
    // Phase-lock alignment vernier bar across center
    const vernier = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.4, 0.24), mats.cfaGreen);
    vernier.position.set(0, 0, 0.28);
    vernier.userData.noEdges = true;
    g.add(vernier);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-lpddr4x-dwl-ca-train',
        153,
        '#c084fc',
        g,
        new THREE.Vector3(8.6, -13.2, 0.42),
        new THREE.Vector3(162, -40, 38),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // GROUP D: Board-Level Discrete Analog, Power & ESD Support Circuits (C154–C160)
  // =========================================================================

  // C154. Ultra-Low-Noise SerDes Analog LDO Post-Regulator (AVDD 0.85V/1.8V, >65 dB PSRR)
  {
    const g = new THREE.Group();
    const pcbGeo = createChamferedBoxGeo(7.2, 4.4, 0.18, 0.24, 0.025, 'z');
    applyPlanarUVs(pcbGeo, 7.2, 4.4, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, u.cfeHdiPcb);
    g.add(pcb);

    // DFN-6 Ultra-low-noise LDO IC + flanked input/output low-ESR MLCCs & ferrite bead PI-filter
    const ldoPkg = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 2.4, 0.34, 0.18, 0.03, 'z'),
      u.icEpoxyLaser
    );
    ldoPkg.position.set(0, 0, 0.24);
    const pin1Dot = new THREE.Mesh(hiResCyl(0.18, 0.18, 0.04, 10).rotateX(Math.PI / 2), mats.goldPlating);
    pin1Dot.position.set(-0.75, 0.75, 0.42);
    pin1Dot.userData.noEdges = true;
    g.add(ldoPkg, pin1Dot);

    for (const [cx, cy] of [
      [-2.35, 0.85],
      [-2.35, -0.85],
      [2.35, 0.85],
      [2.35, -0.85],
    ]) {
      const cap = buildSmdPassive(1.15, 0.62, 0.34, mats.smdCeramic, mats.solderBallSilver);
      cap.position.set(cx, cy, 0.24);
      g.add(cap);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-serdes-uln-ldo-avdd',
        154,
        '#38bdf8',
        g,
        new THREE.Vector3(3.2, -16.8, 0.46),
        new THREE.Vector3(168, -6, 22),
        cp,
        0.18
      )
    );
  }

  // C155. Precision Power-On-Reset (POR) & Brown-Out Voltage Supervisor (BOR) IC
  {
    const g = new THREE.Group();
    const pcbGeo = createChamferedBoxGeo(7.0, 4.2, 0.18, 0.24, 0.025, 'z');
    applyPlanarUVs(pcbGeo, 7.0, 4.2, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, u.cfeHdiPcb);
    g.add(pcb);

    // SOT-23-5 precision voltage supervisor + 5 gull-wing silver leads + threshold comparator LED ring
    const sotBody = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 1.85, 0.34, 0.16, 0.03, 'z'),
      u.icEpoxyLaser
    );
    sotBody.position.set(-0.4, 0, 0.24);
    g.add(sotBody);

    for (const [lx, ly] of [
      [-1.15, 1.25],
      [-0.4, 1.25],
      [0.35, 1.25],
      [-1.05, -1.25],
      [0.25, -1.25],
    ]) {
      const lead = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.56, 0.14), mats.silverElectrode);
      lead.position.set(lx, ly, 0.16);
      lead.userData.noEdges = true;
      g.add(lead);
    }
    const rstHalo = new THREE.Mesh(hiResTorus(0.72, 0.12, 8, 20), mats.cfaRed);
    rstHalo.position.set(2.15, 0, 0.24);
    rstHalo.userData.noEdges = true;
    g.add(rstHalo);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-por-bor-supervisor',
        155,
        '#fb7185',
        g,
        new THREE.Vector3(5.6, -18.2, -0.44),
        new THREE.Vector3(168, 28, -18),
        cp,
        0.18
      )
    );
  }

  // C156. Controller 0201 Bootstrap Strap Resistors (0-Ohm) & ROM_SAFE Factory Recovery Pads
  {
    const g = new THREE.Group();
    const pcbGeo = createChamferedBoxGeo(7.2, 4.4, 0.18, 0.24, 0.025, 'z');
    applyPlanarUVs(pcbGeo, 7.2, 4.4, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, u.cfeHdiPcbRear);
    g.add(pcb);

    // 6 ultra-tiny 0201 strap resistors + pair of exposed circular ENIG gold ROM_SAFE shorting test pads!
    for (let i = 0; i < 6; i++) {
      const res = buildSmdPassive(0.92, 0.46, 0.24, mats.matteBlackAnodized, mats.silverElectrode);
      res.position.set(-2.35 + (i % 3) * 1.35, i < 3 ? 0.92 : -0.92, 0.20);
      g.add(res);
    }
    for (const ry of [-0.78, 0.78]) {
      const pad = new THREE.Mesh(hiResCyl(0.56, 0.56, 0.14, 16).rotateX(Math.PI / 2), mats.goldPlating);
      pad.position.set(2.25, ry, 0.18);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    const jumper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.56, 0.08), mats.copperCoil);
    jumper.position.set(2.25, 0, 0.24);
    jumper.userData.noEdges = true;
    g.add(jumper);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-bootstrap-strap-0ohm',
        156,
        '#facc15',
        g,
        new THREE.Vector3(-8.8, -16.2, -0.42),
        new THREE.Vector3(162, 62, 34),
        cp,
        0.18
      )
    );
  }

  // C157. SMBus / I2C Sideband Management (NVMe-MI) & Pull-Up Resistor Network
  {
    const g = new THREE.Group();
    const pcbGeo = createChamferedBoxGeo(7.2, 4.2, 0.18, 0.24, 0.025, 'z');
    applyPlanarUVs(pcbGeo, 7.2, 4.2, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, u.cfeHdiPcb);
    g.add(pcb);

    // Twin SMBCLK (gold) & SMBDAT (cyan) sideband rails + 2 pull-up SMD resistors + 4-pin NVMe-MI transceiver die
    for (const [ry, mat] of [
      [0.85, mats.goldPlating],
      [-0.85, mats.vcWorkingFluidCyan],
    ] as Array<[number, THREE.Material]>) {
      const trace = new THREE.Mesh(createChamferedBoxGeo(6.2, 0.24, 0.12, 0.05, 0.02, 'z'), mat);
      trace.position.set(0, ry, 0.16);
      trace.userData.noEdges = true;
      const pullup = buildSmdPassive(0.95, 0.50, 0.26, mats.matteBlackAnodized, mats.silverElectrode);
      pullup.position.set(-1.95, ry, 0.24);
      g.add(trace, pullup);
    }
    const miChip = new THREE.Mesh(
      createChamferedBoxGeo(2.0, 2.4, 0.30, 0.16, 0.03, 'z'),
      u.icEpoxyLaser
    );
    miChip.position.set(1.55, 0, 0.24);
    g.add(miChip);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-smbus-nvme-mi-bus',
        157,
        '#14b8a6',
        g,
        new THREE.Vector3(6.2, -16.4, 0.44),
        new THREE.Vector3(152, 92, 14),
        cp,
        0.18
      )
    );
  }

  // C158. PCIe Edge Sawtooth Copper Spark-Gap ESD Arrestor & 1 M-Ohm Bleed Resistor
  {
    const g = new THREE.Group();
    const pcbGeo = createChamferedBoxGeo(7.4, 4.4, 0.18, 0.24, 0.025, 'z');
    applyPlanarUVs(pcbGeo, 7.4, 4.4, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, u.cfeHdiPcb);
    g.add(pcb);

    // Opposing triangular copper/gold spark-gap lightning teeth separated by 0.15mm micro-air-gap!
    const toothGeo = hiResCyl(0.05, 0.46, 0.85, 4).rotateZ(-Math.PI / 2);
    for (let i = -1; i <= 1; i++) {
      const leftTooth = new THREE.Mesh(toothGeo, mats.goldPlating);
      leftTooth.position.set(-1.05, i * 1.15, 0.22);
      leftTooth.userData.noEdges = true;
      const rightTooth = new THREE.Mesh(toothGeo, mats.copperHeatSpreader);
      rightTooth.rotation.z = Math.PI;
      rightTooth.position.set(0.35, i * 1.15, 0.22);
      rightTooth.userData.noEdges = true;
      const arc = new THREE.Mesh(hiResSphere(0.14, 8, 6), mats.vcWorkingFluidCyan);
      arc.position.set(-0.35, i * 1.15, 0.24);
      arc.userData.noEdges = true;
      g.add(leftTooth, rightTooth, arc);
    }
    // 1 M-Ohm static bleed resistor on right flank
    const bleedR = buildSmdPassive(1.5, 0.78, 0.34, mats.varistorRingBlue, mats.silverElectrode);
    bleedR.position.set(2.35, 0, 0.24);
    g.add(bleedR);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-pcb-sparkgap-esd',
        158,
        '#facc15',
        g,
        new THREE.Vector3(-2.8, -19.2, 0.44),
        new THREE.Vector3(138, 120, 42),
        cp,
        0.18
      )
    );
  }

  // C159. PMIC Synchronized Soft-Start & Active Rail-Discharge FET Array
  {
    const g = new THREE.Group();
    const pcbGeo = createChamferedBoxGeo(7.4, 4.4, 0.18, 0.24, 0.025, 'z');
    applyPlanarUVs(pcbGeo, 7.4, 4.4, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, u.bionzPmicIc);
    g.add(pcb);

    // 4 stepped Power-MOSFET discharge switches + diagonal soft-start ramp busbar
    for (let i = 0; i < 4; i++) {
      const fet = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 1.45, 0.24 + i * 0.04, 0.12, 0.02, 'z'),
        i < 2 ? mats.siliconLogicLayer : mats.copperHeatSpreader
      );
      fet.position.set(-2.25 + i * 1.5, -0.55, 0.22);
      fet.userData.noEdges = true;
      g.add(fet);
    }
    const rampPts = [
      new THREE.Vector3(-2.85, 0.65, 0.22),
      new THREE.Vector3(-0.6, 1.45, 0.36),
      new THREE.Vector3(1.6, 1.45, 0.36),
      new THREE.Vector3(2.85, 0.65, 0.22),
    ];
    const rampTube = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rampPts), 18, 0.09, 6, false)),
      mats.cfaGreen
    );
    rampTube.userData.noEdges = true;
    g.add(rampTube);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-pmic-active-discharge',
        159,
        '#f97316',
        g,
        new THREE.Vector3(1.2, -18.8, -0.44),
        new THREE.Vector3(168, -26, -34),
        cp,
        0.18
      )
    );
  }

  // C160. Multi-Decade PDN Plane Capacitance & Anti-Resonance Decoupling Cascade
  {
    const g = new THREE.Group();
    const pcbGeo = createChamferedBoxGeo(7.6, 4.6, 0.18, 0.26, 0.025, 'z');
    applyPlanarUVs(pcbGeo, 7.6, 4.6, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, u.cfeHdiPcb);
    g.add(pcb);

    // 4 staggered MLCC package sizes (0603 10uF -> 0402 1uF -> 0201 100nF -> 01005 10nF) flattening 100kHz–5GHz PDN impedance!
    const caps: Array<[number, number, number, number, THREE.Material]> = [
      [-2.35, 1.8, 0.95, 0.44, mats.tantalumCapYellow],
      [-0.45, 1.35, 0.72, 0.34, mats.smdCeramic],
      [1.20, 0.96, 0.52, 0.26, mats.copperHeatSpreader],
      [2.55, 0.68, 0.38, 0.20, mats.vcWorkingFluidCyan],
    ];
    for (const [cx, cw, ch, cd, mat] of caps) {
      const cTop = buildSmdPassive(cw, ch, cd, mat, mats.solderBallSilver);
      cTop.position.set(cx, 0.95, 0.12 + cd * 0.5);
      const cBot = buildSmdPassive(cw, ch, cd, mat, mats.solderBallSilver);
      cBot.position.set(cx, -0.95, 0.12 + cd * 0.5);
      g.add(cTop, cBot);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-pdn-multidecade-mlcc',
        160,
        '#eab308',
        g,
        new THREE.Vector3(4.2, -13.8, -0.44),
        new THREE.Vector3(164, 52, -36),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // GROUP E: Advanced Substrate, Packaging, Metallurgy, QA & Environmental Armor (C161–C167)
  // =========================================================================

  // C161. mSAP (Modified Semi-Additive Process) 12/12 um Ultra-Fine ABF Build-Up Copper Traces
  {
    const g = new THREE.Group();
    const abfGeo = createChamferedBoxGeo(7.6, 4.6, 0.20, 0.26, 0.03, 'z');
    applyPlanarUVs(abfGeo, 7.6, 4.6, 'xy');
    const abf = new THREE.Mesh(abfGeo, u.bionzAbfSubstrate);
    g.add(abf);

    // 10 razor-sharp rectangular vertical-wall mSAP 12/12um copper traces (no trapezoidal etch undercut!) + electroless seed layer
    const seedLayer = new THREE.Mesh(new THREE.BoxGeometry(6.6, 3.8, 0.05), mats.silverElectrode);
    seedLayer.position.set(0, 0, 0.12);
    seedLayer.userData.noEdges = true;
    g.add(seedLayer);

    for (let i = 0; i < 10; i++) {
      const tr = new THREE.Mesh(
        createChamferedBoxGeo(6.4, 0.16, 0.22, 0.02, 0.015, 'z'),
        mats.copperHybridBond
      );
      tr.position.set(0, -1.62 + i * 0.36, 0.24);
      tr.userData.noEdges = true;
      g.add(tr);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-msap-12um-abf-trace',
        161,
        '#d97706',
        g,
        new THREE.Vector3(4.6, 1.8, -0.42),
        new THREE.Vector3(114, 134, -34),
        cp,
        0.18
      )
    );
  }

  // C162. Thermal Compression / Laser-Assisted Bonding (TCB/LAB) & Non-Conductive Film (NCF)
  {
    const g = new THREE.Group();
    const subGeo = createChamferedBoxGeo(7.4, 4.6, 0.18, 0.24, 0.025, 'z');
    applyPlanarUVs(subGeo, 7.4, 4.6, 'xy');
    const sub = new THREE.Mesh(subGeo, u.bionzCufSilica);
    sub.position.z = -0.20;
    // Translucent cyan NCF dielectric sheet pre-applied before laser compression
    const ncfSheet = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 3.8, 0.16, 0.18, 0.02, 'z'),
      mats.fluorineCoatCyan
    );
    ncfSheet.position.z = 0.02;
    const topDie = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 3.2, 0.18, 0.18, 0.025, 'z'),
      u.cfeControllerPkg
    );
    topDie.position.z = 0.24;
    g.add(sub, ncfSheet, topDie);

    // 16 fine-pitch Cu-pillar microbumps compressed straight through NCF
    const bumpGeo = hiResCyl(0.14, 0.14, 0.30, 8).rotateX(Math.PI / 2);
    const bumpInst = new THREE.InstancedMesh(bumpGeo, mats.goldPlating, 16);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let ix = 0; ix < 4; ix++) {
      for (let iy = 0; iy < 4; iy++) {
        dm.position.set(-1.95 + ix * 1.3, -1.05 + iy * 0.70, 0.04);
        dm.updateMatrix();
        bumpInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    bumpInst.instanceMatrix.needsUpdate = true;
    bumpInst.userData.noEdges = true;
    g.add(bumpInst);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-tcb-lab-ncf-bond',
        162,
        '#f43f5e',
        g,
        new THREE.Vector3(-4.6, -1.6, -0.44),
        new THREE.Vector3(84, 148, -46),
        cp,
        0.18
      )
    );
  }

  // C163. Low-Temperature Bi-Sn Solder (LTS, ~138-170 C) Warpage-Control BGA Interconnect
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(7.6, 4.6, 0.18, 0.26, 0.025, 'z');
    applyPlanarUVs(baseGeo, 7.6, 4.6, 'xy');
    const base = new THREE.Mesh(baseGeo, u.cfeSolderImcMicrostructure);
    g.add(base);

    // 3×5 array of dual-phase Bi-Sn eutectic low-temp solder spheres (silvery-blue sheen on Cu pads)
    const ballGeo = hiResSphere(0.32, 10, 8);
    const padGeo = hiResCyl(0.38, 0.38, 0.08, 12).rotateX(Math.PI / 2);
    for (let ix = 0; ix < 5; ix++) {
      for (let iy = 0; iy < 3; iy++) {
        const px = -2.4 + ix * 1.2;
        const py = -1.2 + iy * 1.2;
        const pad = new THREE.Mesh(padGeo, mats.copperCoil);
        pad.position.set(px, py, 0.12);
        const ball = new THREE.Mesh(ballGeo, mats.sinteredSilver);
        ball.position.set(px, py, 0.34);
        pad.userData.noEdges = ball.userData.noEdges = true;
        g.add(pad, ball);
      }
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-lts-bisn-warpage-joint',
        163,
        '#94a3b8',
        g,
        new THREE.Vector3(5.4, 5.2, -0.46),
        new THREE.Vector3(48, 158, -56),
        cp,
        0.18
      )
    );
  }

  // C164. C-SAM Ultrasonic & 3D Micro-CT X-Ray BGA/Underfill Void Inspection Gate
  {
    const g = new THREE.Group();
    const frame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(7.6, 4.8, 0.34, 6.2, 3.4, 0.22), 0.24, 0.03, 0.03, 1, 16),
      mats.stainlessMachined
    );
    g.add(frame);

    // Ultrasonic acoustic scan screen + concentric C-SAM transducer probe beam scanning BGA void map!
    const scanScreenGeo = createChamferedBoxGeo(6.1, 3.3, 0.14, 0.16, 0.02, 'z');
    applyPlanarUVs(scanScreenGeo, 6.1, 3.3, 'xy');
    const scanScreen = new THREE.Mesh(scanScreenGeo, u.cfeSolderImcMicrostructure);
    g.add(scanScreen);

    for (const r of [0.55, 1.05, 1.48]) {
      const wave = new THREE.Mesh(hiResTorus(r, 0.06, 8, 24), mats.vcWorkingFluidCyan);
      wave.position.set(0, 0, 0.22);
      wave.userData.noEdges = true;
      g.add(wave);
    }
    const probeTip = new THREE.Mesh(hiResCyl(0.24, 0.10, 0.42, 12).rotateX(Math.PI / 2), mats.goldPlating);
    probeTip.position.set(0, 0, 0.34);
    probeTip.userData.noEdges = true;
    g.add(probeTip);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-csam-xray-void-gate',
        164,
        '#06b6d4',
        g,
        new THREE.Vector3(0.4, 6.2, -0.46),
        new THREE.Vector3(12, 162, -62),
        cp,
        0.18
      )
    );
  }

  // C165. 150 N 3-Point Bend Neutral-Axis PCB Placement & Shear-Load Armor Spine
  {
    const g = new THREE.Group();
    // 3-layer composite sandwich cutaway: Top compression armor (titanium) / Zero-strain Neutral-Axis PCB (gold!) / Bottom tension armor (steel)
    const topArmor = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.15, 0.24, 0.16, 0.03, 'z'),
      u.cfeInnerArmorCnc
    );
    topArmor.position.set(0, 1.45, 0.04);
    const neutralPlane = new THREE.Mesh(
      createChamferedBoxGeo(7.8, 0.72, 0.22, 0.12, 0.025, 'z'),
      mats.goldPlating
    );
    neutralPlane.position.set(0, 0, 0.10);
    const botArmor = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 1.15, 0.24, 0.16, 0.03, 'z'),
      mats.stainlessMachined
    );
    botArmor.position.set(0, -1.45, 0.04);
    g.add(topArmor, neutralPlane, botArmor);

    // 3-point bend fulcrum anvil rollers (top center 150 N load anvil + bottom twin support anvils)
    const anvilGeo = hiResCyl(0.32, 0.32, 0.56, 14).rotateX(Math.PI / 2);
    const topAnvil = new THREE.Mesh(anvilGeo, mats.cfaRed);
    topAnvil.position.set(0, 2.22, 0.06);
    const leftAnvil = new THREE.Mesh(anvilGeo, mats.titaniumRivet);
    leftAnvil.position.set(-2.95, -2.22, 0.06);
    const rightAnvil = new THREE.Mesh(anvilGeo, mats.titaniumRivet);
    rightAnvil.position.set(2.95, -2.22, 0.06);
    topAnvil.userData.noEdges = leftAnvil.userData.noEdges = rightAnvil.userData.noEdges = true;
    g.add(topAnvil, leftAnvil, rightAnvil);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-neutral-axis-150n-bend',
        165,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 2.2, -0.58),
        new THREE.Vector3(-24, 160, -56),
        cp,
        0.18
      )
    );
  }

  // C166. Ultrasonic Hermetic Seam & Micro-Porous ePTFE Barometric Pressure Breather
  {
    const g = new THREE.Group();
    // Outer stainless ultrasonic weld bezel + white hydrophobic micro-porous ePTFE breather disc!
    const weldRing = new THREE.Mesh(hiResTorus(2.05, 0.28, 10, 28), mats.stainlessMachined);
    const gasketRing = new THREE.Mesh(hiResTorus(1.65, 0.18, 8, 24), mats.epdmGasket);
    gasketRing.position.z = 0.08;
    const eptfeGeo = hiResCyl(1.48, 1.48, 0.18, 24).rotateX(Math.PI / 2);
    applyPlanarUVs(eptfeGeo, 3.0, 3.0, 'xy');
    const eptfeDisc = new THREE.Mesh(eptfeGeo, u.sensorEptfeVent);
    g.add(weldRing, gasketRing, eptfeDisc);

    // Water droplet repelled on outer rim (cyan bead) + air molecules passing through (emerald rings)
    const drop = new THREE.Mesh(hiResSphere(0.32, 10, 8), mats.vcWorkingFluidCyan);
    drop.position.set(1.25, 1.25, 0.30);
    drop.userData.noEdges = true;
    const ventDots = [
      [-0.55, 0],
      [0, 0.48],
      [0.55, 0],
      [0, -0.48],
    ];
    for (const [vx, vy] of ventDots) {
      const m = new THREE.Mesh(hiResCyl(0.12, 0.12, 0.30, 8).rotateX(Math.PI / 2), mats.cfaGreen);
      m.position.set(vx, vy, 0.14);
      m.userData.noEdges = true;
      g.add(m);
    }
    g.add(drop);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-eptfe-pressure-vent',
        166,
        '#e2e8f0',
        g,
        new THREE.Vector3(-11.2, 18.6, 0.0),
        new THREE.Vector3(-64, 152, -46),
        cp,
        0.18
      )
    );
  }

  // C167. ISO 7816-1 (0.1 Gy) X-Ray Immunity & Ultra-Low-Alpha (<0.002 cph/cm2) SER Guard
  {
    const g = new THREE.Group();
    // High-Z metallic Ag/Sn X-ray attenuation plate + ULA silica shielding deck + deflected gamma/alpha trajectory rays!
    const shieldGeo = createChamferedBoxGeo(7.6, 4.6, 0.24, 0.28, 0.03, 'z');
    applyPlanarUVs(shieldGeo, 7.6, 4.6, 'xy');
    const shield = new THREE.Mesh(shieldGeo, u.cfeEmiShieldCan);
    g.add(shield);

    const ulaCore = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 3.0, 0.16, 0.20, 0.025, 'z'),
      mats.lensPermalloyShield
    );
    ulaCore.position.z = 0.18;
    g.add(ulaCore);

    // 3 X-ray / alpha radiation rays deflected off high-Z shield surface
    for (let i = -1; i <= 1; i++) {
      const rayPts = [
        new THREE.Vector3(-3.2, i * 1.05 + 0.45, 0.42),
        new THREE.Vector3(0, i * 1.05, 0.28),
        new THREE.Vector3(3.1, i * 1.05 + 0.55, 0.46),
      ];
      const ray = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rayPts), 14, 0.075, 6, false)),
        i === 0 ? mats.goldPlating : mats.cfaRed
      );
      ray.userData.noEdges = true;
      g.add(ray);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-iso7816-xray-ser-guard',
        167,
        '#64748b',
        g,
        new THREE.Vector3(10.6, 17.8, 0.0),
        new THREE.Vector3(-104, 138, -36),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // GROUP F: USB4 40Gbps Reader (MRW-G3 / ASM2464PD) & Sony α7 IV Combo-Slot Internals (C168–C170)
  // =========================================================================

  // C168. ASMedia ASM2464PD USB4 Gen3x2 (40 Gbps) PCIe Tunneling Bridge SoC & Dual 20G PHY
  // Nested strictly inside left interior of C99 MRW-G3 aluminum crown (y=28.95, |z| <= 1.35 -> ZERO bleed!)
  {
    const g = new THREE.Group();
    const bridgePcbGeo = createChamferedBoxGeo(7.6, 1.38, 2.55, 0.18, 0.03, 'z');
    applyPlanarUVs(bridgePcbGeo, 7.6, 1.38, 'xy');
    const bridgePcb = new THREE.Mesh(bridgePcbGeo, u.cfeHdiPcb);
    g.add(bridgePcb);

    // 10×10mm FCCSP ASMedia ASM2464PD USB4 Bridge SoC + twin 20Gbps SerDes PHY copper shields + 25MHz XTAL!
    const asmPkgGeo = createChamferedBoxGeo(3.6, 1.10, 0.34, 0.16, 0.03, 'z');
    applyPlanarUVs(asmPkgGeo, 3.6, 1.10, 'xy');
    const asmPkg = new THREE.Mesh(asmPkgGeo, u.cfeControllerPkg);
    asmPkg.position.set(-0.6, 0, 1.32);
    g.add(asmPkg);

    const xtal = new THREE.Mesh(
      createChamferedBoxGeo(1.15, 0.78, 0.24, 0.08, 0.02, 'z'),
      mats.goldPlating
    );
    xtal.position.set(2.35, 0.15, 1.30);
    xtal.userData.noEdges = true;
    const phyBar = new THREE.Mesh(
      createChamferedBoxGeo(1.15, 0.42, 0.20, 0.06, 0.02, 'z'),
      mats.vcWorkingFluidCyan
    );
    phyBar.position.set(2.35, -0.35, 1.30);
    phyBar.userData.noEdges = true;
    g.add(xtal, phyBar);

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-asm2464pd-usb4-bridge',
        168,
        '#0ea5e9',
        g,
        new THREE.Vector3(-8.4, 28.95, 0.0),
        new THREE.Vector3(-46, 114, -96),
        cp,
        0.18
      )
    );
  }

  // C169. USB Type-C CC1/CC2 Orientation Flip Logic & BMC USB-PD 3.1 Sink Controller
  // Nested strictly inside right interior of C99 MRW-G3 aluminum crown (y=28.95, |z| <= 1.35 -> ZERO bleed!)
  {
    const g = new THREE.Group();
    const pdPcbGeo = createChamferedBoxGeo(7.2, 1.34, 2.45, 0.18, 0.03, 'z');
    applyPlanarUVs(pdPcbGeo, 7.2, 1.34, 'xy');
    const pdPcb = new THREE.Mesh(pdPcbGeo, u.cfeHdiPcb);
    g.add(pdPcb);

    // QFN-24 USB-PD 3.1 Controller IC + CC1/CC2 5.1k Rd pull-down resistors + High-speed MUX crossbar
    const pdIc = new THREE.Mesh(
      createChamferedBoxGeo(2.4, 1.02, 0.30, 0.14, 0.03, 'z'),
      u.icEpoxyLaser
    );
    pdIc.position.set(-1.1, 0, 1.28);
    const muxIc = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 0.96, 0.26, 0.12, 0.025, 'z'),
      mats.siliconLogicLayer
    );
    muxIc.position.set(1.65, 0, 1.26);
    g.add(pdIc, muxIc);

    for (const [ry, mat] of [
      [0.36, mats.goldPlating],
      [-0.36, mats.cfaGreen],
    ] as Array<[number, THREE.Material]>) {
      const ccLine = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.14, 0.10), mat);
      ccLine.position.set(0, ry, -1.26);
      ccLine.userData.noEdges = true;
      g.add(ccLine);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-usbc-cc-bmc-pd-ctrl',
        169,
        '#10b981',
        g,
        new THREE.Vector3(8.4, 28.95, 0.0),
        new THREE.Vector3(48, 114, -96),
        cp,
        0.18
      )
    );
  }

  // C170. Sony α7 IV Dual-Standard CFexpress Type A / SD UHS-II Stacked Contact Interlock
  // Nested strictly inside recessed interior of C64 Combo-Slot Wiper Bay (y=-29.35, z in [-1.02, -0.08] -> ZERO bleed!)
  {
    const g = new THREE.Group();
    // Recessed LCP insulator guide ramp carrying the 17-pin dual-row SD UHS-II contact tier right beneath the 21-pin CFexpress tier!
    const rampGeo = createChamferedBoxGeo(23.6, 1.92, 0.44, 0.22, 0.03, 'z');
    applyBoxUVs(rampGeo, 6.0);
    const ramp = new THREE.Mesh(rampGeo, u.cfeToughResinMold);
    g.add(ramp);

    // Row 1: 9 standard SD/UHS-I gold spring wipers + Row 2: 8 UHS-II LVDS high-speed differential wipers (17 pins total!)
    const pinGeo = createChamferedBoxGeo(0.68, 0.68, 0.22, 0.08, 0.02, 'z');
    const row1Inst = new THREE.InstancedMesh(pinGeo, mats.goldPlating, 9);
    const row2Inst = new THREE.InstancedMesh(pinGeo, mats.copperHeatSpreader, 8);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 9; i++) {
      dm.position.set(-9.6 + i * 2.4, 0.46, 0.24);
      dm.updateMatrix();
      row1Inst.setMatrixAt(i, dm.matrix);
    }
    for (let i = 0; i < 8; i++) {
      dm.position.set(-8.4 + i * 2.4, -0.46, 0.24);
      dm.updateMatrix();
      row2Inst.setMatrixAt(i, dm.matrix);
    }
    row1Inst.instanceMatrix.needsUpdate = row2Inst.instanceMatrix.needsUpdate = true;
    row1Inst.userData.noEdges = row2Inst.userData.noEdges = true;
    g.add(row1Inst, row2Inst);

    // Dual mechanical width-discriminator interlock cams (20mm Type A vs 24mm SD card bay auto-guide!)
    for (const sx of [-11.3, 11.3]) {
      const cam = new THREE.Mesh(
        createChamferedBoxGeo(0.95, 1.72, 0.62, 0.14, 0.03, 'z'),
        mats.stainlessMachined
      );
      cam.position.set(sx, 0, 0.08);
      cam.userData.noEdges = true;
      g.add(cam);
    }

    parts.push(
      finalizeCfexpressUltra35Part(
        'cfe-combo-sd-uhs2-interlock',
        170,
        '#f59e0b',
        g,
        new THREE.Vector3(0, -29.35, -0.58),
        new THREE.Vector3(0, -138, 48),
        cp,
        0.18
      )
    );
  }

  return parts;
}
