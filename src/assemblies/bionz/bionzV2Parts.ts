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

function finalizeBionzV2Part(
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

/** Create authentic {111} crystal-faceted diamond/octagonal epitaxial SiGe/SiP Source/Drain cross-section */
function createFacetedEpiShape(w: number, h: number): THREE.Shape {
  const hw = w * 0.5;
  const hh = h * 0.5;
  const ch = Math.min(hw, hh) * 0.42;
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
 * Create a true open 270° C-channel architectural cutaway sleeve (open on -X in 2D shape space,
 * which maps to the front +Z viewer face after rotateY(+Math.PI/2)) so all 4 horizontal GAA
 * nanosheet channels are unobstructedly visible emerging from the HfO2 + WFM gate wrap!
 */
function createGateCutawayFrame(outerW: number, outerH: number, innerW: number, innerH: number): THREE.Shape {
  const ow = outerW * 0.5;
  const oh = outerH * 0.5;
  const iw = innerW * 0.5;
  const ih = innerH * 0.5;
  const cutX = -ow * 0.32; // Open front cutaway window facing +Z after rotateY(+pi/2)
  const s = new THREE.Shape();
  s.moveTo(cutX, -oh);
  s.lineTo(ow, -oh);
  s.lineTo(ow, oh);
  s.lineTo(cutX, oh);
  s.lineTo(cutX, ih);
  s.lineTo(iw, ih);
  s.lineTo(iw, -ih);
  s.lineTo(cutX, -ih);
  s.closePath();
  return s;
}

/**
 * Build all 30 hyper-detailed, electron-microscope-grade 3D CAD nanoscale assemblies of the
 * BIONZ XR / BIONZ XR2 V2 Ultra-Microscopic 2nm GAA / A16 BSPDN & 2026 Silicon Core (`X2-01` – `X2-30`).
 *
 * Zooms 100,000x deeper inside the silicon heart of Sony's 2025–2026 BIONZ XR2 SoC & next-gen
 * sub-2nm roadmap (TSMC N2/A16 GAA Nanosheets + Super Power Rail BSPDN, Intel 18A PowerVia/CFET,
 * ISSCC 2026 1c LPDDR6 14.4Gb/s PHY, MediaTek xBIT 10T SRAM, CoWoS-L Active LSI, Glass Core TGV,
 * Silicon Photonics CPO, Samsung SF2 BEOL Metal Temp Sensor, Sony α7 V / α7R VI AI-AWB / C2PA / IBIS).
 * Upright architectural cutaway tower along +Y (packaging/BEOL) -> Center (GAA Nanosheet & CFET core)
 * -> -Y (TSMC A16 Backside Super Power Rail PDN & thermal phonon escape).
 * Strictly visible ONLY in standalone 'bionz_v2' mode (zero startup cost!).
 */
export function buildBionzV2Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;
  const DIE_W = 42.0;
  const DIE_D = 37.0;
  const SUB_W = 56.0;
  const SUB_D = 51.0;

  // =========================================================================
  // ZONE A — 2026 ADVANCED 3D PACKAGING, MEMORY PHY & OPTICAL D2D
  // =========================================================================

  // X2-01. TSMC SoIC 3D Sub-10um Pitch Face-to-Face Cu-Cu Hybrid Bonding Interface (2026 Volume)
  {
    const g = new THREE.Group();
    const topRim = makeHiResHorizPlate(
      createFrameShape(DIE_W - 0.4, DIE_D - 0.4, 1.8, DIE_W - 4.4, DIE_D - 4.4, 1.2),
      0.56,
      mats.siliconBulk,
      0.08,
      2,
      22
    );
    topRim.position.y = 0.72;
    const midDeckGeo = extrudeHiRes(createRoundedRectShape(DIE_W - 1.0, DIE_D - 1.0, 1.5), 0.44, 0.06, 0.06, 2, 20);
    midDeckGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(midDeckGeo, DIE_W - 1.0, DIE_D - 1.0, 'xz');
    const midDeck = new THREE.Mesh(midDeckGeo, u.v2PixelHybridBondCu);
    g.add(topRim, midDeck);

    // 7x5 sub-10um SoIC direct copper hybrid-bond micro-columns with SiO2/SiCN collar rings & alignment crosshairs
    const padGeo = hiResCyl(0.84, 0.92, 1.05, 18);
    const collarGeo = hiResTorus(1.02, 0.12, 8, 18);
    for (let ix = -3; ix <= 3; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        if (ix >= 2 && iz >= 1) continue; // Front-right cutaway viewing window!
        const px = ix * 5.0;
        const pz = iz * 5.6;
        const pad = new THREE.Mesh(padGeo, mats.copperHybridBond);
        pad.position.set(px, 0.28, pz);
        pad.userData.noEdges = true;
        const col = new THREE.Mesh(collarGeo, mats.fluorineCoatCyan);
        col.rotation.x = Math.PI / 2;
        col.position.set(px, 0.45, pz);
        col.userData.noEdges = true;
        g.add(pad, col);
      }
    }

    // 4 sub-100nm optical overlay alignment crosshairs on corners
    for (const [fx, fz] of [
      [-18.4, -15.8],
      [18.4, -15.8],
      [-18.4, 15.8],
      [18.4, 15.8],
    ]) {
      const h = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.14, 0.22), mats.goldPlating);
      h.position.set(fx, 1.04, fz);
      h.userData.noEdges = true;
      const v = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 1.4), mats.goldPlating);
      v.position.set(fx, 1.04, fz);
      v.userData.noEdges = true;
      g.add(h, v);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-soic-hybrid-bond-3d',
        1,
        '#d97736',
        g,
        new THREE.Vector3(0, 16.16, 0),
        new THREE.Vector3(0, 72, 0),
        cp,
        0.22
      )
    );
  }

  // X2-02. CoWoS-L Reconstituted RDL Interposer & Active Local Silicon Interconnect Bridges (Active LSI + UCIe-S, ISSCC 2026)
  {
    const g = new THREE.Group();
    // Full 41.6x36.6 CoWoS-L Reconstituted Organic/Molding RDL Interposer Carrier supporting all co-packaged chiplets flush
    const rdlCarrier = makeHiResHorizPlate(
      createRoundedRectShape(DIE_W - 0.4, DIE_D - 0.4, 1.6),
      0.72,
      mats.abfSubstrate,
      0.08,
      2,
      20
    );
    rdlCarrier.position.y = -0.14;
    // Recessed Active LSI Silicon Interconnect Bridge embedded flush inside the CoWoS-L RDL interposer!
    const bridgeBase = makeHiResHorizPlate(
      createRoundedRectShape(24.0, 11.4, 1.1),
      0.86,
      mats.siliconLogicLayer,
      0.1,
      2,
      20
    );
    bridgeBase.position.y = -0.06;
    g.add(rdlCarrier, bridgeBase);

    // 3 Embedded Active CMOS Repeater / Buffer micro-dies inside the silicon bridge (Active LSI!)
    for (const bx of [-6.8, 0, 6.8]) {
      const rep = buildChipPackage({
        w: 4.4,
        d: 5.8,
        h: 0.46,
        style: 'qfn',
        pinsPerSide: 5,
        bodyMat: mats.ispSiliconDie,
        leadMat: mats.goldPlating,
        topAccentMat: u.v2BionzSramArray,
      });
      rep.position.set(bx, 0.34, 0);
      g.add(rep);
    }

    // 8 Ultra-fine 2/2 um copper UCIe-S high-density die-to-die RDL ribbon lanes spanning the bridge
    for (let i = -3.5; i <= 3.5; i += 1) {
      const lane = new THREE.Mesh(
        createChamferedBoxGeo(36.0, 0.14, 0.42, 0.03, 0.02, 'y'),
        Math.round(i + 3.5) % 2 === 0 ? mats.copperHybridBond : mats.goldPlating
      );
      lane.position.set(0, 0.3, i * 1.18);
      lane.userData.noEdges = true;
      g.add(lane);
    }

    // Perimeter Cu RDL fanout routing traces connecting Logic Die <-> HBM4 / LPDDR6 / CPO / SLVS-EC!
    for (const rz of [-12.6, 12.6]) {
      const rdlBus = new THREE.Mesh(createChamferedBoxGeo(36.4, 0.14, 1.2, 0.03, 0.02, 'y'), mats.copperHybridBond);
      rdlBus.position.set(0, 0.3, rz);
      rdlBus.userData.noEdges = true;
      g.add(rdlBus);
    }

    // End-cap UCIe micro-bump landing arrays connecting left & right chiplets
    const bumpGeo = hiResSphere(0.28, 10, 8);
    for (const sx of [-11.0, 11.0]) {
      for (let iz = -4; iz <= 4; iz++) {
        const b = new THREE.Mesh(bumpGeo, mats.solderBallSilver);
        b.position.set(sx, 0.38, iz * 1.05);
        b.userData.noEdges = true;
        g.add(b);
      }
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-cowos-l-active-lsi',
        2,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 14.88, -7.8),
        new THREE.Vector3(0, 62, -26),
        cp,
        0.24
      )
    );
  }

  // X2-03. ISSCC 2026 1c LPDDR6 (14.4 Gb/s) Dual Sub-Channel PHY & Clock-Gating Controller
  {
    const g = new THREE.Group();
    const phyDie = makeHiResHorizPlate(
      createRoundedRectShape(23.6, 8.6, 1.0),
      0.86,
      mats.siliconDramLayer,
      0.1,
      2,
      20
    );
    g.add(phyDie);

    // Twin independent sub-channel DQ/DQS microstrip comb banks (Efficiency Mode can clock-gate Sub-Ch B!)
    for (const [cx, activeMat] of [
      [-6.2, mats.mountShimBlue],
      [6.2, mats.fluorineCoatCyan],
    ] as Array<[number, THREE.Material]>) {
      const subCh = new THREE.Mesh(createChamferedBoxGeo(9.4, 0.44, 6.2, 0.08, 0.05, 'y'), activeMat);
      subCh.position.set(cx, 0.62, 0);
      g.add(subCh);
      for (let i = -3; i <= 3; i++) {
        const dqTrace = new THREE.Mesh(
          createChamferedBoxGeo(0.34, 0.24, 7.6, 0.03, 0.02, 'y'),
          mats.goldPlating
        );
        dqTrace.position.set(cx + i * 1.18, 0.92, 0);
        dqTrace.userData.noEdges = true;
        g.add(dqTrace);
      }
    }

    // Central high-speed PLL + clock-gating power island + ZQ impedance calibration ladder
    const pllRing = new THREE.Mesh(hiResTorus(1.45, 0.26, 10, 28), mats.goldPlating);
    pllRing.rotation.x = Math.PI / 2;
    pllRing.position.set(0, 0.72, 0);
    const zqBlock = new THREE.Mesh(createChamferedBoxGeo(1.6, 0.56, 1.6, 0.06, 0.04, 'y'), mats.copperHybridBond);
    zqBlock.position.set(0, 0.72, 0);
    g.add(pllRing, zqBlock);

    parts.push(
      finalizeBionzV2Part(
        'xv2-lpddr6-1c-phy',
        3,
        '#2563eb',
        g,
        new THREE.Vector3(0, 14.88, 8.8),
        new THREE.Vector3(0, 62, 28),
        cp,
        0.24
      )
    );
  }

  // X2-04. 2026 Borosilicate Glass Core Package Substrate & Laser-Drilled Hourglass TGV Array
  {
    const g = new THREE.Group();
    const glassGeo = extrudeHiRes(createRoundedRectShape(SUB_W, SUB_D, 2.4), 1.45, 0.14, 0.14, 2, 24);
    glassGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(glassGeo, SUB_W, SUB_D, 'xz');
    const glassSlab = new THREE.Mesh(glassGeo, u.v2BionzGlassCoreTgv);
    g.add(glassSlab);

    // Authentic Hourglass-Profile Laser-Drilled Through-Glass Vias (TGV) coaxially aligned 1:1 onto the 4.8-pitch BGA pad grid!
    const topConeGeo = hiResCyl(0.82, 0.5, 0.78, 16);
    const botConeGeo = hiResCyl(0.5, 0.82, 0.78, 16);
    const catchRingGeo = hiResTorus(0.94, 0.14, 8, 20);
    for (const ix of [-4, -2, 0, 2, 4]) {
      for (const iz of [-4, -2, 0, 2, 4]) {
        if (Math.abs(ix) <= 2 && Math.abs(iz) < 2) continue; // Keep center optical & land-side eSTC cavity clear
        const tx = ix * 4.8;
        const tz = iz * 4.8;
        const cTop = new THREE.Mesh(topConeGeo, mats.copperHybridBond);
        cTop.position.set(tx, 0.36, tz);
        cTop.userData.noEdges = true;
        const cBot = new THREE.Mesh(botConeGeo, mats.copperHybridBond);
        cBot.position.set(tx, -0.36, tz);
        cBot.userData.noEdges = true;
        const padT = new THREE.Mesh(catchRingGeo, mats.goldPlating);
        padT.rotation.x = Math.PI / 2;
        padT.position.set(tx, 0.78, tz);
        padT.userData.noEdges = true;
        g.add(cTop, cBot, padT);
      }
    }

    // Underside Real-World Perimeter SAC305 BGA Solder Ball Grid Array (4.8 pitch, coaxial with TGVs!) + Central Land-Side eSTC Decap Cavity!
    const bgaGeo = hiResSphere(0.88, 12, 9);
    const bgaPadGeo = hiResCyl(0.94, 0.94, 0.14, 12);
    for (let ix = -5; ix <= 5; ix++) {
      for (let iz = -4; iz <= 4; iz++) {
        const bx = ix * 4.8;
        const bz = iz * 4.8;
        // Leave central Land-Side Decap Cavity clear for X2-76 (eSTC) & X2-77 (BGA/uC4 IMC Cutaway)!
        if (Math.abs(bx) < 12.2 && Math.abs(bz) < 6.8) continue;
        const pad = new THREE.Mesh(bgaPadGeo, mats.goldPlating);
        pad.position.set(bx, -0.82, bz);
        pad.userData.noEdges = true;
        const ball = new THREE.Mesh(bgaGeo, mats.solderBallSilver);
        ball.scale.set(1, 0.86, 1);
        ball.position.set(bx, -1.46, bz);
        ball.userData.noEdges = true;
        g.add(pad, ball);
      }
    }
    const cavityRim = makeHiResHorizPlate(
      createFrameShape(21.4, 11.4, 0.9, 19.6, 9.6, 0.6),
      0.24,
      mats.goldPlating,
      0.03,
      1,
      12
    );
    cavityRim.position.y = -0.9;
    g.add(cavityRim);

    parts.push(
      finalizeBionzV2Part(
        'xv2-glass-core-tgv',
        4,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 13.57, 0),
        new THREE.Vector3(-34, 52, 0),
        cp,
        0.2
      )
    );
  }

  // X2-05. ISSCC 2026 Silicon Photonics Electro-Optical Router & MZM Photonic Interposer (18ns Switch)
  {
    const g = new THREE.Group();
    const picBase = makeHiResHorizPlate(createRoundedRectShape(14.0, 11.4, 1.1), 0.76, mats.siliconSensorDie, 0.08, 2, 18);
    g.add(picBase);

    // Twin-arm Mach-Zehnder Modulator (MZM) silicon optical waveguide + GSG traveling-wave golden RF electrodes!
    for (const wz of [-2.8, 2.8]) {
      const wg = new THREE.Mesh(createChamferedBoxGeo(9.6, 0.28, 0.42, 0.04, 0.03, 'y'), mats.fluorineCoatCyan);
      wg.position.set(0.4, 0.56, wz);
      wg.userData.noEdges = true;
      const elec = new THREE.Mesh(createChamferedBoxGeo(6.4, 0.22, 0.88, 0.04, 0.03, 'y'), mats.goldPlating);
      elec.position.set(0.4, 0.82, wz);
      elec.userData.noEdges = true;
      // Y-branch angled optical splitter & combiner arms converging to input/output bus
      for (const sx of [-1, 1]) {
        const arm = new THREE.Mesh(createChamferedBoxGeo(2.6, 0.24, 0.34, 0.03, 0.02, 'y'), mats.fluorineCoatCyan);
        arm.position.set(0.4 + sx * 5.2, 0.56, wz * 0.5);
        arm.rotation.y = sx * Math.sign(wz) * 0.72;
        arm.userData.noEdges = true;
        g.add(arm);
      }
      g.add(wg, elec);
    }

    // Central high-speed photonic bus + 4 DWDM Micro-Ring Resonator optical wavelength filters (18ns routing!)
    const centerBus = new THREE.Mesh(createChamferedBoxGeo(12.8, 0.2, 0.32, 0.03, 0.02, 'y'), mats.fluorineCoatCyan);
    centerBus.position.set(0.2, 0.54, 0);
    centerBus.userData.noEdges = true;
    g.add(centerBus);
    for (let k = -1.5; k <= 1.5; k += 1) {
      const ring = new THREE.Mesh(hiResTorus(1.12, 0.16, 10, 24), mats.bodyRecRed);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(k * 2.85 + 0.2, 0.64, 0);
      ring.userData.noEdges = true;
      const heater = new THREE.Mesh(hiResTorus(0.76, 0.09, 6, 18), mats.goldPlating);
      heater.rotation.x = Math.PI / 2;
      heater.position.set(k * 2.85 + 0.2, 0.82, 0);
      heater.userData.noEdges = true;
      g.add(ring, heater);
    }

    // Laser input grating coupler fan + 4 etched silicon V-groove optical fiber ports at -X edge
    const coupler = new THREE.Mesh(createChamferedBoxGeo(1.8, 0.36, 4.8, 0.05, 0.04, 'y'), mats.nanoArIridescent);
    coupler.position.set(-5.8, 0.58, 0);
    g.add(coupler);
    for (let f = -1.5; f <= 1.5; f += 1) {
      const fiber = new THREE.Mesh(hiResCyl(0.18, 0.18, 2.2, 10), mats.quartzOlpf);
      fiber.rotation.z = Math.PI / 2;
      fiber.position.set(-7.1, 0.62, f * 1.1);
      fiber.userData.noEdges = true;
      g.add(fiber);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-electro-optical-cpo',
        5,
        '#ec4899',
        g,
        new THREE.Vector3(-8.4, 11.55, 0),
        new THREE.Vector3(-34, 42, 18),
        cp,
        0.24
      )
    );
  }

  // X2-06. SLVS-EC v3.0 / PAM4 Multi-Level SerDes Receiver & Digital Clock Recovery (DSP-CDR)
  {
    const g = new THREE.Group();
    const rxBase = makeHiResHorizPlate(createRoundedRectShape(14.0, 11.4, 1.1), 0.76, mats.ispSiliconDie, 0.08, 2, 18);
    g.add(rxBase);

    // 4-Level PAM4 Voltage Slicer Comparators + CTLE/DFE Equalizer + Spiral Inductive T-Coil ESD Peaking Coils!
    for (let i = 0; i < 4; i++) {
      const slicer = new THREE.Mesh(
        createChamferedBoxGeo(2.2, 0.36 + i * 0.18, 3.6, 0.06, 0.04, 'y'),
        i % 2 === 0 ? mats.mountShimBlue : mats.goldPlating
      );
      slicer.position.set(-4.2 + i * 2.8, 0.56 + i * 0.09, -2.6);
      slicer.userData.noEdges = true;
      g.add(slicer);
    }

    // Pair of planar spiral T-coil peaking inductors + circular phase-interpolator CDR ring
    for (const tx of [-3.6, 0.4]) {
      for (const r of [0.65, 1.12, 1.56]) {
        const turn = new THREE.Mesh(hiResTorus(r, 0.11, 8, 24), mats.copperHybridBond);
        turn.rotation.x = Math.PI / 2;
        turn.position.set(tx, 0.58, 2.6);
        turn.userData.noEdges = true;
        g.add(turn);
      }
    }
    const cdrRing = new THREE.Mesh(hiResTorus(1.75, 0.24, 10, 28), mats.fluorineCoatCyan);
    cdrRing.rotation.x = Math.PI / 2;
    cdrRing.position.set(4.5, 0.62, 2.6);
    g.add(cdrRing);

    parts.push(
      finalizeBionzV2Part(
        'xv2-slvsec-pam4-cdr',
        6,
        '#06b6d4',
        g,
        new THREE.Vector3(8.4, 11.55, 0),
        new THREE.Vector3(34, 42, -18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // ZONE B — 2026 SUB-2nm BEOL NANO-INTERCONNECTS & ON-DIE SENSORS (y = +8.0 .. +3.6)
  // =========================================================================

  // X2-07. Upper BEOL Nanoscale Air-Gap & Ultra-Low-k SiCOH (k < 2.2) Manhattan Interconnect Mesh
  {
    const g = new THREE.Group();
    const frame = makeHiResHorizPlate(
      createFrameShape(DIE_W - 0.4, DIE_D - 0.4, 1.5, DIE_W - 4.4, DIE_D - 4.4, 1.0),
      1.65,
      mats.interlayerDielectric,
      0.08,
      2,
      20
    );
    g.add(frame);

    // 3 Orthogonal Cu/Air-Gap BEOL layers (M3=X, M4=Z, M5=X) with wide open air canyons & dual-damascene vias!
    const layerY = [-0.52, 0.02, 0.56];
    layerY.forEach((ly, idx) => {
      const alongX = idx % 2 === 0;
      const mat = idx === 1 ? mats.goldPlating : mats.copperHybridBond;
      const halfCount = alongX ? 4 : 5;
      for (let i = -halfCount; i <= halfCount; i++) {
        if (i >= 2 && idx === 2) continue; // Step cutaway on top M5 layer to reveal M4 & M3 below!
        const bar = new THREE.Mesh(
          alongX
            ? createChamferedBoxGeo(DIE_W - 4.0, 0.34, 0.72, 0.05, 0.03, 'y')
            : createChamferedBoxGeo(0.72, 0.34, DIE_D - 4.0, 0.05, 0.03, 'y'),
          mat
        );
        if (alongX) bar.position.set(0, ly, i * 3.4);
        else bar.position.set(i * 3.4, ly, 0);
        bar.userData.noEdges = true;
        g.add(bar);
      }
    });

    // Inter-layer dual-damascene vias connecting M3 -> M4 -> M5
    const viaGeo = hiResCyl(0.28, 0.24, 1.35, 10);
    for (let i = -4; i <= 4; i += 2) {
      const v = new THREE.Mesh(viaGeo, mats.copperHeatSpreader);
      v.position.set(i * 3.4, 0.02, -i * 2.8);
      v.userData.noEdges = true;
      g.add(v);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-beol-airgap-ulk',
        7,
        '#ea580c',
        g,
        new THREE.Vector3(0, 10.34, 0),
        new THREE.Vector3(0, 34, 0),
        cp,
        0.24
      )
    );
  }

  // X2-08. Lowest M0/M1 21nm-Pitch Barrierless Ruthenium (Ru) & Molybdenum (Mo) Local Tracks
  {
    const g = new THREE.Group();
    const baseRim = makeHiResHorizPlate(
      createFrameShape(DIE_W - 0.4, DIE_D - 0.4, 1.4, 24.4, 21.4, 0.9),
      0.85,
      mats.taNBarrierLiner,
      0.06,
      2,
      18
    );
    g.add(baseRim);

    // Ultra-dense parallel 21nm-pitch Ruthenium (Ru) M0 lines + orthogonal Molybdenum (Mo) M1 lines + V0 plugs!
    for (let i = -4; i <= 4; i++) {
      const ruTrack = new THREE.Mesh(
        createChamferedBoxGeo(24.2, 0.36, 0.56, 0.05, 0.03, 'y'),
        mats.stainlessMachined
      );
      ruTrack.position.set(0, -0.22, i * 2.15);
      ruTrack.userData.noEdges = true;
      g.add(ruTrack);
    }
    for (let i = -4; i <= 4; i++) {
      if (i > 1) continue; // Half-cutaway on M1 to showcase M0 Ru rails underneath!
      const moTrack = new THREE.Mesh(
        createChamferedBoxGeo(0.64, 0.36, 21.2, 0.05, 0.03, 'y'),
        mats.silverElectrode
      );
      moTrack.position.set(i * 2.6, 0.28, 0);
      moTrack.userData.noEdges = true;
      g.add(moTrack);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-ru-mo-m0-tracks',
        8,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 7, 0),
        new THREE.Vector3(0, 21, 0),
        cp,
        0.24
      )
    );
  }

  // X2-09. ISSCC 2026 Samsung SF2 Compact BEOL Metal-Resistance On-Die Temperature Sensor (518x Rs, 1% Area)
  {
    const g = new THREE.Group();
    const pad = makeHiResHorizPlate(createRoundedRectShape(8.6, 8.6, 0.9), 0.44, mats.siliconLogicLayer, 0.06, 2, 16);
    g.add(pad);

    // Precision meandering high-sheet-resistance (518x) serpentine metal resistor trace + 4-wire Kelvin sense pads!
    for (let i = -3; i <= 3; i++) {
      const seg = new THREE.Mesh(
        createChamferedBoxGeo(6.4, 0.28, 0.36, 0.04, 0.02, 'y'),
        mats.bodyRecRed
      );
      seg.position.set(0, 0.38, i * 0.92);
      seg.userData.noEdges = true;
      g.add(seg);
      if (i < 3) {
        const turn = new THREE.Mesh(
          createChamferedBoxGeo(0.36, 0.28, 1.28, 0.04, 0.02, 'y'),
          mats.bodyRecRed
        );
        turn.position.set(i % 2 === 0 ? 3.02 : -3.02, 0.38, i * 0.92 + 0.46);
        turn.userData.noEdges = true;
        g.add(turn);
      }
    }
    // 4-wire Kelvin force/sense golden terminals
    for (const [kx, kz] of [
      [-3.5, -3.5],
      [3.5, -3.5],
      [-3.5, 3.5],
      [3.5, 3.5],
    ]) {
      const kPad = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.56, 12), mats.goldPlating);
      kPad.position.set(kx, 0.42, kz);
      kPad.userData.noEdges = true;
      g.add(kPad);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-beol-metal-temp-sensor',
        9,
        '#ef4444',
        g,
        new THREE.Vector3(-10.2, 7.68, 10.2),
        new THREE.Vector3(-34, 28, 24),
        cp,
        0.24
      )
    );
  }

  // X2-10. TSMC N2P Super-High-Performance 3D Trench MIM (SHPMIM) Power-Integrity Decoupling Bank
  {
    const g = new THREE.Group();
    const topBus = makeHiResHorizPlate(createRoundedRectShape(9.4, 9.4, 0.9), 0.36, mats.copperHybridBond, 0.05, 1, 16);
    topBus.position.y = 0.85;
    const botBus = makeHiResHorizPlate(createRoundedRectShape(9.4, 9.4, 0.9), 0.36, mats.stainlessMachined, 0.05, 1, 16);
    botBus.position.y = -0.85;
    g.add(topBus, botBus);

    // 7 pleated vertical high-k HfO2/ZrO2 MIM capacitor fins sandwiched between top VDD & bottom VSS plates
    for (let i = -3; i <= 3; i++) {
      const fin = new THREE.Mesh(
        createChamferedBoxGeo(8.2, 1.45, 0.44, 0.05, 0.03, 'y'),
        i % 2 === 0 ? mats.loficDielectric : mats.goldPlating
      );
      fin.position.set(0, 0, i * 1.18);
      fin.userData.noEdges = true;
      g.add(fin);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-shpmim-decap',
        10,
        '#8b5cf6',
        g,
        new THREE.Vector3(10.2, 8.49, 10.2),
        new THREE.Vector3(34, 28, 24),
        cp,
        0.24
      )
    );
  }

  // X2-11. Electromigration-Immune Cobalt (Co) Cap Layer & Redundant Double-Via Copper Reservoirs
  {
    const g = new THREE.Group();
    const cuTrack = new THREE.Mesh(createChamferedBoxGeo(14.0, 0.65, 2.8, 0.08, 0.05, 'y'), mats.copperHybridBond);
    // Thin silvery-blue Cobalt self-aligned EM diffusion-blocking cap layer atop the copper line!
    const coCap = new THREE.Mesh(createChamferedBoxGeo(14.1, 0.22, 2.88, 0.04, 0.03, 'y'), mats.fluorineCoatCyan);
    coCap.position.y = 0.44;
    g.add(cuTrack, coCap);

    // 4 pairs of redundant double-via copper reservoirs preventing void-induced open-circuit failure!
    for (const vx of [-5.2, -1.8, 1.8, 5.2]) {
      for (const vz of [-0.68, 0.68]) {
        const via = new THREE.Mesh(hiResCyl(0.42, 0.36, 1.35, 14), mats.copperHeatSpreader);
        via.position.set(vx, -0.82, vz);
        via.userData.noEdges = true;
        const liner = new THREE.Mesh(hiResTorus(0.48, 0.09, 6, 14), mats.taNBarrierLiner);
        liner.rotation.x = Math.PI / 2;
        liner.position.set(vx, -0.35, vz);
        liner.userData.noEdges = true;
        g.add(via, liner);
      }
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-em-reservoir-via',
        11,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 8.96, -10.8),
        new THREE.Vector3(0, 28, -32),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // ZONE C — ATOMIC HEART: 2026 TSMC N2 / A16 GAA NANOSHEET & MONOLITHIC CFET CORE (y = +2.4 .. -3.4)
  // =========================================================================

  // X2-12. 2nm / A16 4-Stack Horizontal Silicon Nanosheets (GAA Channel — Thickness ~5nm!)
  {
    const g = new THREE.Group();
    // 4 precision vertically stacked horizontal crystalline silicon ribbons spanning Source (-X) <-> Drain (+X)!
    const sheetY = [-2.1, -0.7, 0.7, 2.1];
    sheetY.forEach((sy, idx) => {
      const sheetGeo = createChamferedBoxGeo(16.8, 0.68, 6.2, 0.14, 0.08, 'y');
      applyPlanarUVs(sheetGeo, 16.8, 6.2, 'xz');
      const sheet = new THREE.Mesh(sheetGeo, u.v2BionzGaaNanosheet);
      sheet.position.set(0, sy, 0);
      g.add(sheet);

      // Subtle glowing electron-mobility center-lane guide strips along front cutaway face (+Z) of each nanosheet
      const edgeRibbon = new THREE.Mesh(
        createChamferedBoxGeo(16.6, 0.18, 0.14, 0.03, 0.02, 'z'),
        idx % 2 === 0 ? mats.fluorineCoatCyan : mats.goldPlating
      );
      edgeRibbon.position.set(0, sy, 3.12);
      edgeRibbon.userData.noEdges = true;
      g.add(edgeRibbon);
    });

    parts.push(
      finalizeBionzV2Part(
        'xv2-gaa-si-nanosheets',
        12,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(0, 2, 0),
        cp,
        0.26
      )
    );
  }

  // X2-13. 360° Gate-All-Around High-k HfO2 (1.5nm) & Multi-Work-Function Metal Gate (HKMG) Cutaway!
  {
    const g = new THREE.Group();
    const sheetY = [-2.1, -0.7, 0.7, 2.1];

    // Cutaway Gate Metal Body wrapping rear/top/bottom & weaving THROUGH all 3 gaps between the 4 nanosheets!
    // Cleanly recessed away from the front (+Z) viewer face so ALL 4 nanosheets + concentric HfO2 + WFM sleeves shine!
    const gateTopCap = new THREE.Mesh(createChamferedBoxGeo(6.4, 1.25, 5.6, 0.14, 0.1, 'y'), mats.stainlessMachined);
    gateTopCap.position.set(0, 3.42, -1.6);
    const gateBackWall = new THREE.Mesh(createChamferedBoxGeo(6.4, 7.6, 1.6, 0.12, 0.08, 'z'), mats.stainlessMachined);
    gateBackWall.position.set(0, 0.2, -4.1);
    const gateBotBase = new THREE.Mesh(createChamferedBoxGeo(6.4, 0.92, 5.6, 0.12, 0.08, 'y'), mats.stainlessMachined);
    gateBotBase.position.set(0, -3.22, -1.6);
    g.add(gateTopCap, gateBackWall, gateBotBase);

    // Inter-sheet Metal Gate Fingers weaving completely between every nanosheet pair (true Gate-All-Around!)
    for (const gy of [-1.4, 0.0, 1.4]) {
      const metalFill = new THREE.Mesh(
        createChamferedBoxGeo(6.1, 0.48, 5.4, 0.06, 0.04, 'y'),
        mats.tungstenGrid
      );
      metalFill.position.set(0, gy, -1.4);
      g.add(metalFill);
    }

    // Concentric 270° cutaway High-k HfO2 (1.5nm cyan) + TiN/TiAl Work-Function Metal (gold) sleeves around ALL 4 nanosheets!
    const hkFrameShape = createGateCutawayFrame(7.35, 1.14, 6.36, 0.72);
    const wfmFrameShape = createGateCutawayFrame(7.85, 1.38, 7.36, 1.14);
    for (const sy of sheetY) {
      const hkGeo = extrudeHiRes(hkFrameShape, 6.1, 0.04, 0.04, 1, 8);
      hkGeo.rotateY(Math.PI / 2);
      const hkSleeve = new THREE.Mesh(hkGeo, mats.fluorineCoatCyan);
      hkSleeve.position.set(0, sy, 0);
      hkSleeve.userData.noEdges = true;

      const wfmGeo = extrudeHiRes(wfmFrameShape, 5.85, 0.04, 0.04, 1, 8);
      wfmGeo.rotateY(Math.PI / 2);
      const wfmSleeve = new THREE.Mesh(wfmGeo, mats.goldPlating);
      wfmSleeve.position.set(0, sy, 0);
      wfmSleeve.userData.noEdges = true;
      g.add(hkSleeve, wfmSleeve);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-hkmg-all-around',
        13,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(0, 11, -18),
        cp,
        0.24
      )
    );
  }

  // X2-14. Atomic-Monolayer La/Al Interface Dipole Layer (Multi-Vth Threshold Voltage Tuning)
  {
    const g = new THREE.Group();
    const sheetY = [-2.1, -0.7, 0.7, 2.1];
    const atomGeo = hiResSphere(0.19, 10, 8);
    // Discrete glowing Lanthanum (La, nMOS) & Aluminum (Al, pMOS) atomic dipole chains encircling every nanosheet!
    for (const sy of sheetY) {
      for (let k = -4; k <= 4; k++) {
        const ax = k * 0.68;
        const aTop = new THREE.Mesh(atomGeo, k % 2 === 0 ? mats.bodyRecRed : mats.mountShimBlue);
        aTop.position.set(ax, sy + 0.44, 3.22);
        aTop.userData.noEdges = true;
        const aBot = new THREE.Mesh(atomGeo, k % 2 === 0 ? mats.mountShimBlue : mats.bodyRecRed);
        aBot.position.set(ax, sy - 0.44, 3.22);
        aBot.userData.noEdges = true;
        g.add(aTop, aBot);
      }
      // Subtle atomic monolayer band ribbon
      const band = new THREE.Mesh(
        createChamferedBoxGeo(6.1, 0.09, 0.22, 0.02, 0.01, 'z'),
        mats.loficDielectric
      );
      band.position.set(0, sy + 0.44, 3.22);
      band.userData.noEdges = true;
      g.add(band);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-hk-dipole-vth',
        14,
        '#a855f7',
        g,
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(0, 7, 24),
        cp,
        0.2
      )
    );
  }

  // X2-15. GAA Critical Scalloped SiN/SiBCN Inner Spacers (Inter-Sheet Parasitic Capacitance Blockers)
  {
    const g = new THREE.Group();
    // 3 vertical levels between the 4 nanosheets × Left & Right gate edges = 6 precision crescent-scalloped SiBCN plugs!
    // Plus 2 tall outer Si3N4 gate sidewall spacers flanking the top gate cap!
    for (const sx of [-3.65, 3.65]) {
      for (const gy of [-1.4, 0.0, 1.4]) {
        const innerPlug = new THREE.Mesh(
          createChamferedBoxGeo(1.05, 0.66, 6.6, 0.14, 0.1, 'z'),
          mats.aluminaHighKFilm
        );
        innerPlug.position.set(sx, gy, 0);
        g.add(innerPlug);

        // Crescent indent bead highlighting selective SiGe lateral cavity etch!
        const bead = new THREE.Mesh(hiResCyl(0.24, 0.24, 6.65, 12), mats.quartzOlpf);
        bead.rotation.x = Math.PI / 2;
        bead.position.set(sx - Math.sign(sx) * 0.42, gy, 0);
        bead.userData.noEdges = true;
        g.add(bead);
      }

      // Tall upper outer Si3N4 gate sidewall spacer
      const outerSp = new THREE.Mesh(
        createChamferedBoxGeo(1.05, 1.75, 8.1, 0.12, 0.08, 'y'),
        mats.aluminaHighKFilm
      );
      outerSp.position.set(sx, 3.35, -0.4);
      g.add(outerSp);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-sige-inner-spacer',
        15,
        '#6366f1',
        g,
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(-24, 4, 18),
        cp,
        0.24
      )
    );
  }

  // X2-16. Crystal-Faceted {111} Diamond-Shaped Epitaxial SiGe (pMOS) & SiP (nMOS) Source/Drain Stressors
  {
    const g = new THREE.Group();
    const epiShape = createFacetedEpiShape(5.2, 6.4);
    const epiGeo = extrudeHiRes(epiShape, 7.6, 0.24, 0.24, 2, 12);

    // Left Source: Compressive SiGe Epitaxial Crystal Block (deep emerald-teal diamond prism!)
    const srcEpi = new THREE.Mesh(epiGeo, mats.siliconPhotodiode);
    srcEpi.position.set(-7.1, 0.0, 0);
    // Right Drain: Tensile SiP Epitaxial Crystal Block (sapphire-blue diamond prism!)
    const drnEpi = new THREE.Mesh(epiGeo, mats.mountShimBlue);
    drnEpi.position.set(7.1, 0.0, 0);
    g.add(srcEpi, drnEpi);

    // Crystal-strain chevron indicator ribs along the {111} diamond faces showing lattice compression/tension!
    for (const sx of [-7.1, 7.1]) {
      for (const sy of [-1.6, 0.0, 1.6]) {
        const rib = new THREE.Mesh(
          createChamferedBoxGeo(3.6, 0.22, 0.36, 0.04, 0.03, 'z'),
          sx < 0 ? mats.bodyBatteryCell : mats.fluorineCoatCyan
        );
        rib.position.set(sx, sy, 3.88);
        rib.userData.noEdges = true;
        g.add(rib);
      }
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-sd-epi-strain',
        16,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(28, 2, 0),
        cp,
        0.24
      )
    );
  }

  // X2-17. MOL Wrap-Around TiSi2 / NiPtSi Silicide Interface & Cobalt/Tungsten Trench Contacts (M0A/CA)
  {
    const g = new THREE.Group();
    for (const sx of [-7.1, 7.1]) {
      // Wrap-around atomic ohmic silicide saddle hugging the top & sides of the faceted S/D epitaxy!
      const silicideTop = new THREE.Mesh(
        createChamferedBoxGeo(4.6, 0.52, 7.8, 0.08, 0.05, 'y'),
        mats.silverElectrode
      );
      silicideTop.position.set(sx, 3.45, 0);
      // Tall self-aligned Cobalt/Tungsten local trench contact bar (CA / M0A)
      const trenchBar = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 1.55, 7.4, 0.1, 0.06, 'y'),
        mats.stainlessMachined
      );
      trenchBar.position.set(sx, 4.42, 0);
      // 3 Vertical V0 contact vias stepping cleanly up to the M0 Ruthenium tracks!
      for (const vz of [-2.4, 0, 2.4]) {
        const v0 = new THREE.Mesh(hiResCyl(0.46, 0.42, 1.15, 14), mats.goldPlating);
        v0.position.set(sx, 5.55, vz);
        v0.userData.noEdges = true;
        g.add(v0);
      }
      g.add(silicideTop, trenchBar);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-mol-silicide-contact',
        17,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0.45, 0),
        new THREE.Vector3(-28, 12, 0),
        cp,
        0.24
      )
    );
  }

  // X2-18. 2026 Monolithic CFET (Vertically Stacked nMOS-Over-pMOS Complementary FET at 45nm Pitch!)
  {
    const g = new THREE.Group();
    // Bottom pMOS 2-nanosheet channel (emerald) + Middle SiO2 dielectric isolation wall + Top nMOS 2-nanosheet channel (blue)
    for (const py of [-1.85, -1.05]) {
      const pSheet = new THREE.Mesh(createChamferedBoxGeo(7.6, 0.42, 3.6, 0.06, 0.04, 'y'), mats.siliconPhotodiode);
      pSheet.position.set(0, py, 0);
      g.add(pSheet);
    }
    // Middle monolithic isolation wall separating bottom pMOS from top nMOS!
    const midIso = new THREE.Mesh(createChamferedBoxGeo(8.2, 0.65, 4.4, 0.08, 0.05, 'y'), mats.aluminaHighKFilm);
    midIso.position.set(0, -0.05, 0);
    g.add(midIso);

    for (const ny of [0.95, 1.75]) {
      const nSheet = new THREE.Mesh(createChamferedBoxGeo(7.6, 0.42, 3.6, 0.06, 0.04, 'y'), mats.mountShimBlue);
      nSheet.position.set(0, ny, 0);
      g.add(nSheet);
    }

    // Shared Dual-Work-Function Vertical Split Gate (bottom pWF gold + top nWF cyan) recessed cleanly for front cutaway visibility!
    const pGate = new THREE.Mesh(createChamferedBoxGeo(2.8, 2.2, 3.2, 0.08, 0.05, 'y'), mats.goldPlating);
    pGate.position.set(0, -1.45, -1.05);
    const nGate = new THREE.Mesh(createChamferedBoxGeo(2.8, 2.2, 3.2, 0.08, 0.05, 'y'), mats.fluorineCoatCyan);
    nGate.position.set(0, 1.35, -1.05);
    // Top frontside contact & Bottom backside contact!
    const topTap = new THREE.Mesh(hiResCyl(0.45, 0.45, 1.2, 12), mats.copperHybridBond);
    topTap.position.set(3.2, 2.55, 0);
    const botTap = new THREE.Mesh(hiResCyl(0.45, 0.45, 1.2, 12), mats.copperHybridBond);
    botTap.position.set(-3.2, -2.65, 0);
    g.add(pGate, nGate, topTap, botTap);

    parts.push(
      finalizeBionzV2Part(
        'xv2-monolithic-cfet',
        18,
        '#7c3aed',
        g,
        new THREE.Vector3(12.8, 0.2, 10.6),
        new THREE.Vector3(36, 2, 28),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // ZONE D — BIONZ XR2 SPECIALIZED SILICON MICRO-ARCHITECTURE CELLS (Radial Bays, y = -2.0 .. -4.8)
  // =========================================================================

  // X2-19. ISSCC 2026 MediaTek xBIT 10T Logic-Based SRAM Bitcell & N2 0.0175um^2 High-Density SRAM
  {
    const g = new THREE.Group();
    const sramGeo = extrudeHiRes(createRoundedRectShape(11.4, 9.4, 1.0), 1.05, 0.1, 0.1, 2, 18);
    sramGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(sramGeo, 11.4, 9.4, 'xz');
    const die = new THREE.Mesh(sramGeo, u.v2BionzSramArray);
    g.add(die);

    // Symmetrical 2-Bit Rectangular xBIT Block (4n/6p + 6n/4p = 20 transistors) + Q/Qbar butterfly cross-latches!
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz += 2) {
        const cell = new THREE.Mesh(
          createChamferedBoxGeo(1.45, 0.56, 2.6, 0.06, 0.04, 'y'),
          (ix + (iz > 0 ? 1 : 0)) % 2 === 0 ? mats.mountShimBlue : mats.goldPlating
        );
        cell.position.set(ix * 2.0, 0.78, iz * 2.1);
        cell.userData.noEdges = true;
        g.add(cell);
      }
      // Vertical M1 Bitline (BL / BLB) rail spanning both half-cells
      const bl = new THREE.Mesh(createChamferedBoxGeo(0.24, 0.18, 7.8, 0.03, 0.02, 'y'), mats.silverElectrode);
      bl.position.set(ix * 2.0, 1.12, 0);
      bl.userData.noEdges = true;
      g.add(bl);
    }
    // Dual Write/Read Wordlines (WWL / RWL) + diagonal cross-coupled Q/Qbar butterfly latch bars!
    for (const wz of [-0.55, 0.55]) {
      const wordline = new THREE.Mesh(
        createChamferedBoxGeo(10.6, 0.24, 0.42, 0.04, 0.03, 'y'),
        wz < 0 ? mats.copperHybridBond : mats.fluorineCoatCyan
      );
      wordline.position.set(0, 1.24, wz);
      wordline.userData.noEdges = true;
      g.add(wordline);
    }
    for (const bx of [-2.0, 2.0]) {
      const x1 = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.16, 0.22, 0.02, 0.02, 'y'), mats.bodyRecRed);
      x1.position.set(bx, 1.38, 0);
      x1.rotation.y = 0.68;
      x1.userData.noEdges = true;
      const x2 = new THREE.Mesh(createChamferedBoxGeo(2.8, 0.16, 0.22, 0.02, 0.02, 'y'), mats.bodyRecRed);
      x2.position.set(bx, 1.38, 0);
      x2.rotation.y = -0.68;
      x2.userData.noEdges = true;
      g.add(x1, x2);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-xbit-sram-cell',
        19,
        '#3b82f6',
        g,
        new THREE.Vector3(-10.2, -6.46, -10.8),
        new THREE.Vector3(-36, -24, -28),
        cp,
        0.24
      )
    );
  }

  // X2-20. BIONZ XR2 Integrated AI NPU Systolic Tensor MAC Array (INT4/INT8/FP8 + Zero-Skip)
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(createRoundedRectShape(11.8, 10.6, 1.0), 0.96, mats.npuSiliconDie, 0.1, 2, 18);
    g.add(base);

    // 5x5 3D Systolic Processing Element (PE) matrix + North Activation SRAM FIFO + West Weight FIFO + Zero-Skip gates!
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        const isSkippedZero = (ix + iz) % 4 === 0;
        const pe = new THREE.Mesh(
          createChamferedBoxGeo(1.24, isSkippedZero ? 0.36 : 0.92, 1.24, 0.06, 0.04, 'y'),
          isSkippedZero ? mats.matteBlackAnodized : (ix + iz) % 2 === 0 ? mats.goldPlating : mats.fluorineCoatCyan
        );
        pe.position.set(ix * 1.72 + 0.55, 0.48 + (isSkippedZero ? 0.18 : 0.46), iz * 1.56 + 0.48);
        pe.userData.noEdges = true;
        g.add(pe);
      }
      // Horizontal & vertical systolic data wave-front copper rails
      const hBus = new THREE.Mesh(createChamferedBoxGeo(8.4, 0.12, 0.18, 0.02, 0.01, 'y'), mats.copperHybridBond);
      hBus.position.set(0.55, 0.62, ix * 1.56 + 0.48);
      hBus.userData.noEdges = true;
      g.add(hBus);
    }
    // North Activation SRAM FIFO + West Quantized Weight FIFO feeding the systolic array
    const actFifo = new THREE.Mesh(createChamferedBoxGeo(9.2, 0.54, 1.15, 0.06, 0.03, 'y'), mats.varistorRingBlue);
    actFifo.position.set(0.55, 0.76, -4.25);
    const wgtFifo = new THREE.Mesh(createChamferedBoxGeo(1.15, 0.54, 8.2, 0.06, 0.03, 'y'), mats.copperCoil);
    wgtFifo.position.set(-4.65, 0.76, 0.48);
    g.add(actFifo, wgtFifo);

    parts.push(
      finalizeBionzV2Part(
        'xv2-npu-systolic-mac',
        20,
        '#8b5cf6',
        g,
        new THREE.Vector3(9.8, -6.4, -10.4),
        new THREE.Vector3(36, -24, -28),
        cp,
        0.24
      )
    );
  }

  // X2-21. Sony α7 V / α7R VI AI Auto White Balance (AI-AWB) Deep-Learning Spectral Illuminant DSP
  {
    const g = new THREE.Group();
    const tile = makeHiResHorizPlate(createRoundedRectShape(10.6, 8.6, 1.0), 0.88, mats.siliconLogicLayer, 0.08, 2, 18);
    g.add(tile);

    // 5-band RGB+Cyan+IR Spectral Chromaticity Prism Columns + Planckian Locus Calibration Ring + Illuminant Classifier LUT!
    const specCols = [
      { x: -3.55, mat: mats.cfaRed, h: 1.38 },
      { x: -2.1, mat: mats.cfaGreen, h: 1.78 },
      { x: -0.65, mat: mats.vcWorkingFluidCyan, h: 1.56 },
      { x: 0.8, mat: mats.cfaBlue, h: 1.48 },
      { x: 2.25, mat: mats.bodyRecRed, h: 1.18 },
    ];
    for (const sc of specCols) {
      const col = new THREE.Mesh(createChamferedBoxGeo(1.06, sc.h, 4.9, 0.08, 0.05, 'y'), sc.mat);
      col.position.set(sc.x, 0.44 + sc.h * 0.5, -0.45);
      col.userData.noEdges = true;
      const cap = new THREE.Mesh(createChamferedBoxGeo(0.86, 0.14, 4.2, 0.03, 0.01, 'y'), mats.silverElectrode);
      cap.position.set(sc.x, 0.52 + sc.h, -0.45);
      cap.userData.noEdges = true;
      g.add(col, cap);
    }
    const lutChip = new THREE.Mesh(createChamferedBoxGeo(1.75, 1.24, 5.4, 0.08, 0.05, 'y'), mats.goldPlating);
    lutChip.position.set(4.05, 1.06, -0.2);
    const planckBar = new THREE.Mesh(createChamferedBoxGeo(8.8, 0.36, 1.15, 0.06, 0.02, 'y'), mats.nanoArIridescent);
    planckBar.position.set(-0.3, 0.64, 3.15);
    g.add(lutChip, planckBar);

    parts.push(
      finalizeBionzV2Part(
        'xv2-ai-awb-spectral-dsp',
        21,
        '#10b981',
        g,
        new THREE.Vector3(-10.2, -7.37, 10.2),
        new THREE.Vector3(-36, -24, 28),
        cp,
        0.24
      )
    );
  }

  // X2-22. 16-bit Linear RAW Directional Demosaic & 7K->4K Oversampling Filter Bank
  {
    const g = new THREE.Group();
    const deck = makeHiResHorizPlate(createRoundedRectShape(11.6, 7.8, 1.0), 0.86, mats.ispSiliconDie, 0.08, 2, 18);
    g.add(deck);

    // 5-tap Lanczos / directional edge-sensing convolution filter bars + 16-bit precision accumulator + ping-pong SRAM line buffers!
    for (let k = -2; k <= 2; k++) {
      const hTap = 0.78 + (2 - Math.abs(k)) * 0.3;
      const tap = new THREE.Mesh(
        createChamferedBoxGeo(1.38, hTap, 4.3, 0.06, 0.04, 'y'),
        k === 0 ? mats.copperHybridBond : mats.silverElectrode
      );
      tap.position.set(k * 2.0, 0.43 + hTap * 0.5, 0);
      tap.userData.noEdges = true;
      const weightCap = new THREE.Mesh(
        createChamferedBoxGeo(1.12, 0.16, 1.12, 0.03, 0.01, 'y'),
        k === 0 ? mats.goldPlating : mats.vcWorkingFluidCyan
      );
      weightCap.position.set(k * 2.0, 0.52 + hTap, 0);
      weightCap.userData.noEdges = true;
      g.add(tap, weightCap);
    }
    for (const lz of [-2.95, 2.95]) {
      const lb = new THREE.Mesh(createChamferedBoxGeo(10.6, 0.52, 0.92, 0.05, 0.04, 'y'), mats.mountShimBlue);
      lb.position.set(0, 0.68, lz);
      const ptr = new THREE.Mesh(createChamferedBoxGeo(1.4, 0.24, 1.02, 0.03, 0.01, 'y'), mats.goldPlating);
      ptr.position.set(lz < 0 ? -2.4 : 2.4, 1.02, lz);
      ptr.userData.noEdges = true;
      g.add(lb, ptr);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-demosaic-ring-buffer',
        22,
        '#0284c7',
        g,
        new THREE.Vector3(5.2, -6.98, 10.2),
        new THREE.Vector3(24, -24, 28),
        cp,
        0.24
      )
    );
  }

  // X2-23. Sony α7R VI 8.5-Stop IBIS 6-Axis Gyro + Optical-Flow Sensor-Fusion Kalman Accelerator
  {
    const g = new THREE.Group();
    const base = makeHiResHorizPlate(createRoundedRectShape(11.6, 7.8, 1.0), 0.86, mats.siliconLogicLayer, 0.08, 2, 18);
    g.add(base);

    // Concentric 3-axis orthogonal gyro gimbal Kalman rings + 4 copper VCM torque coils + 6-axis IMU & optical-flow ports!
    const r1 = new THREE.Mesh(hiResTorus(2.65, 0.26, 10, 30), mats.goldPlating);
    r1.rotation.x = Math.PI / 2;
    r1.position.y = 0.92;
    const r2 = new THREE.Mesh(hiResTorus(1.98, 0.22, 10, 26), mats.fluorineCoatCyan);
    r2.rotation.set(Math.PI / 3, 0, 0);
    r2.position.y = 1.08;
    const r3 = new THREE.Mesh(hiResTorus(1.38, 0.18, 8, 22), mats.mountShimBlue);
    r3.rotation.set(0, Math.PI / 3, Math.PI / 2);
    r3.position.y = 1.08;
    const core = new THREE.Mesh(hiResSphere(0.76, 12, 10), mats.copperHybridBond);
    core.position.y = 1.08;
    g.add(r1, r2, r3, core);

    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2 + Math.PI / 4;
      const coil = new THREE.Mesh(hiResCyl(0.38, 0.38, 0.58, 12), mats.copperCoil);
      coil.position.set(Math.cos(ang) * 2.95, 0.78, Math.sin(ang) * 2.95);
      coil.userData.noEdges = true;
      g.add(coil);
    }

    for (const [sx, pmat] of [
      [-4.25, mats.stainlessMachined],
      [4.25, mats.ispSiliconDie],
    ] as const) {
      const ioPort = new THREE.Mesh(createChamferedBoxGeo(1.85, 0.74, 5.4, 0.06, 0.04, 'y'), pmat);
      ioPort.position.set(sx, 0.82, 0);
      g.add(ioPort);
      // 3 distinct SPI/PWM sensor-fusion trace pins on each port
      for (const pz of [-1.6, 0, 1.6]) {
        const pin = new THREE.Mesh(createChamferedBoxGeo(1.2, 0.18, 0.42, 0.02, 0.01, 'y'), mats.goldPlating);
        pin.position.set(sx, 1.24, pz);
        pin.userData.noEdges = true;
        g.add(pin);
      }
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-ibis-kalman-accelerator',
        23,
        '#f97316',
        g,
        new THREE.Vector3(-5.6, -7.64, -0.4),
        new THREE.Vector3(-24, -24, 0),
        cp,
        0.24
      )
    );
  }

  // X2-24. Sony Camera Authenticity (C2PA) SRAM-PUF Key Engine & ECDSA/SHA-384 Hardware Security Core
  {
    const g = new THREE.Group();
    const vault = buildChipPackage({
      w: 9.4,
      d: 9.4,
      h: 1.15,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
    });
    g.add(vault);

    // Active top tamper-detection security mesh + 4 corner continuity sense pillars + hexagonal ECDSA/PUF crypto core!
    for (let i = -2; i <= 2; i++) {
      const mx = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.14, 0.22), mats.goldPlating);
      mx.position.set(0, 0.68, i * 1.5);
      mx.userData.noEdges = true;
      const mz = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 7.6), mats.goldPlating);
      mz.position.set(i * 1.5, 0.78, 0);
      mz.userData.noEdges = true;
      g.add(mx, mz);
    }
    const keyCore = new THREE.Mesh(hiResCyl(1.48, 1.48, 0.62, 6), mats.fluorineCoatCyan);
    keyCore.position.y = 0.92;
    const shaRing = new THREE.Mesh(hiResTorus(2.25, 0.14, 7, 20), mats.copperHybridBond);
    shaRing.rotation.x = Math.PI / 2;
    shaRing.position.y = 0.88;
    shaRing.userData.noEdges = true;
    for (const [cx, cz] of [
      [-3.4, -3.4],
      [3.4, -3.4],
      [-3.4, 3.4],
      [3.4, 3.4],
    ]) {
      const sense = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.44, 8), mats.bodyRecRed);
      sense.position.set(cx, 0.84, cz);
      sense.userData.noEdges = true;
      g.add(sense);
    }
    g.add(keyCore, shaRing);

    parts.push(
      finalizeBionzV2Part(
        'xv2-c2pa-puf-ecdsa-core',
        24,
        '#0ea5e9',
        g,
        new THREE.Vector3(6.4, -6.23, 0.4),
        new THREE.Vector3(36, -24, 0),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // ZONE E — 2026 TSMC A16 SUPER POWER RAIL (BSPDN) & ATOMIC THERMAL ESCAPE (y = -5.4 .. -13.2)
  // =========================================================================

  // X2-25. Buried Power Rails (BPR) Embedded Deep Inside STI Oxide Trenches Beneath Transistors
  {
    const g = new THREE.Group();
    const waferDeck = makeHiResHorizPlate(
      createFrameShape(DIE_W - 0.4, DIE_D - 0.4, 1.4, 24.6, 13.6, 1.0),
      1.65,
      mats.siliconBulk,
      0.08,
      2,
      20
    );
    const stiSlab = makeHiResHorizPlate(
      createFrameShape(25.0, 14.0, 1.1, 21.8, 10.6, 0.8),
      1.65,
      mats.ftiOxide,
      0.08,
      2,
      18
    );
    g.add(waferDeck, stiSlab);

    // 4 heavy buried VDD & VSS Ru/W rails + TiN liners + precision vertical Via-to-BPR (VBPR) tap landing studs!
    const railZ = [-4.4, -1.5, 1.5, 4.4];
    railZ.forEach((rz, idx) => {
      const isVdd = idx % 2 === 0;
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(23.6, 1.35, 1.25, 0.1, 0.06, 'y'),
        isVdd ? mats.copperHybridBond : mats.stainlessMachined
      );
      rail.position.set(0, 0, rz);
      const liner = new THREE.Mesh(
        createChamferedBoxGeo(23.8, 1.55, 1.48, 0.06, 0.04, 'y'),
        mats.taNBarrierLiner
      );
      liner.position.set(0, -0.05, rz);
      liner.userData.noEdges = true;
      g.add(rail, liner);

      for (const tx of [-7.1, -2.4, 2.4, 7.1]) {
        const vbpr = new THREE.Mesh(hiResCyl(0.36, 0.42, 0.48, 10), isVdd ? mats.goldPlating : mats.fluorineCoatCyan);
        vbpr.position.set(tx, 0.72, rz);
        vbpr.userData.noEdges = true;
        g.add(vbpr);
      }
    });

    parts.push(
      finalizeBionzV2Part(
        'xv2-bpr-buried-rail',
        25,
        '#d97706',
        g,
        new THREE.Vector3(0, -9.22, 0),
        new THREE.Vector3(0, -34, 0),
        cp,
        0.24
      )
    );
  }

  // X2-26. TSMC A16 (VLSI 2026 Paper T1.5) Super Power Rail (SPR) Direct Vertical Backside Contacts (VB / nTSV)
  {
    const g = new THREE.Group();
    const viaConeGeo = hiResCyl(0.56, 0.88, 3.8, 16);
    const aldLinerGeo = hiResCyl(0.72, 1.04, 3.65, 16);
    const padGeo = hiResTorus(0.98, 0.16, 8, 18);
    const silicideCapGeo = hiResCyl(0.74, 0.74, 0.24, 6);

    for (const vx of [-7.1, -2.4, 2.4, 7.1]) {
      for (const vz of [-4.4, -1.5, 1.5, 4.4]) {
        const isVdd = Math.abs(vx) > 4.0;
        const liner = new THREE.Mesh(aldLinerGeo, mats.taNBarrierLiner);
        liner.position.set(vx, 0, vz);
        liner.userData.noEdges = true;
        const pillar = new THREE.Mesh(viaConeGeo, isVdd ? mats.goldPlating : mats.copperHybridBond);
        pillar.position.set(vx, 0.04, vz);
        pillar.userData.noEdges = true;
        // Hexagonal backside TiSi2 silicide contact cap kissing the S/D crystal bottom directly!
        const silCap = new THREE.Mesh(silicideCapGeo, mats.sinteredSilver);
        silCap.position.set(vx, 1.98, vz);
        silCap.userData.noEdges = true;
        const botPad = new THREE.Mesh(padGeo, mats.copperHeatSpreader);
        botPad.rotation.x = Math.PI / 2;
        botPad.position.set(vx, -1.85, vz);
        botPad.userData.noEdges = true;
        g.add(liner, pillar, silCap, botPad);
      }
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-a16-spr-vb-contact',
        26,
        '#f59e0b',
        g,
        new THREE.Vector3(0, -12.14, 0),
        new THREE.Vector3(0, -44, 0),
        cp,
        0.24
      )
    );
  }

  // X2-27. Flipped-Wafer Heavy Backside Metal Power Grid (BM0–BM4) & 10x Droop-Reduction PDN
  {
    const g = new THREE.Group();
    const pdnGeo = extrudeHiRes(createRoundedRectShape(DIE_W, DIE_D, 1.8), 1.25, 0.14, 0.14, 2, 22);
    pdnGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(pdnGeo, DIE_W, DIE_D, 'xz');
    const pdnBase = new THREE.Mesh(pdnGeo, u.v2BionzBacksidePdn);
    g.add(pdnBase);

    // Alternating BM2/BM3 X-axis mega-highways + orthogonal BM1 Z-axis distribution straps + bottom C4 solder bump array!
    for (let i = -3; i <= 3; i++) {
      const isVdd = i % 2 === 0;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(DIE_W - 2.6, 0.65, 2.0, 0.1, 0.06, 'y'),
        isVdd ? mats.copperHeatSpreader : mats.stainlessMachined
      );
      bar.position.set(0, -0.92, i * 4.6);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    for (const sx of [-15.0, -7.5, 0, 7.5, 15.0]) {
      const orthoStrap = new THREE.Mesh(
        createChamferedBoxGeo(1.45, 0.36, DIE_D - 3.0, 0.06, 0.03, 'y'),
        mats.goldPlating
      );
      orthoStrap.position.set(sx, 0.72, 0);
      orthoStrap.userData.noEdges = true;
      g.add(orthoStrap);
    }

    const bumpGeo = hiResSphere(0.72, 12, 9);
    for (let ix = -3; ix <= 3; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        const b = new THREE.Mesh(bumpGeo, mats.solderBallSilver);
        b.position.set(ix * 5.6, -1.65, iz * 6.4);
        b.userData.noEdges = true;
        g.add(b);
      }
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-backside-pdn-grid',
        27,
        '#b45309',
        g,
        new THREE.Vector3(0, -16.08, 0),
        new THREE.Vector3(0, -60, 0),
        cp,
        0.24
      )
    );
  }

  // X2-28. Backside Low-Skew Ruthenium Global H-Tree Clock Network & Backside MIM Decoupling Plane
  {
    const g = new THREE.Group();
    // Symmetrical fractal H-Tree Ruthenium clock network + central PLL spine buffer + 4 corner backside MIM decap islands!
    const trunk = new THREE.Mesh(createChamferedBoxGeo(16.0, 0.42, 0.95, 0.06, 0.04, 'y'), mats.goldPlating);
    const rootBuf = new THREE.Mesh(createChamferedBoxGeo(2.4, 0.72, 2.4, 0.08, 0.04, 'y'), mats.varistorRingBlue);
    rootBuf.position.y = 0.12;
    g.add(trunk, rootBuf);
    for (const hx of [-8.0, 8.0]) {
      const branch1 = new THREE.Mesh(createChamferedBoxGeo(0.95, 0.42, 14.0, 0.06, 0.04, 'y'), mats.goldPlating);
      branch1.position.set(hx, 0, 0);
      const midBuf = new THREE.Mesh(createChamferedBoxGeo(1.65, 0.62, 1.65, 0.06, 0.03, 'y'), mats.copperHybridBond);
      midBuf.position.set(hx, 0.1, 0);
      g.add(branch1, midBuf);
      for (const hz of [-7.0, 7.0]) {
        const branch2 = new THREE.Mesh(createChamferedBoxGeo(6.4, 0.36, 0.72, 0.05, 0.03, 'y'), mats.fluorineCoatCyan);
        branch2.position.set(hx, 0, hz);
        // Backside MIM decoupling island tucked beside each leaf branch
        const mimPad = new THREE.Mesh(createChamferedBoxGeo(2.6, 0.34, 2.0, 0.05, 0.02, 'y'), mats.loficDielectric);
        mimPad.position.set(hx * 0.52, -0.06, hz * 0.66);
        mimPad.userData.noEdges = true;
        g.add(branch2, mimPad);
        for (const tipX of [-3.0, 3.0]) {
          const clockTap = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.85, 12), mats.copperHybridBond);
          clockTap.position.set(hx + tipX, 0.36, hz);
          clockTap.userData.noEdges = true;
          g.add(clockTap);
        }
      }
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-backside-clock-tree',
        28,
        '#eab308',
        g,
        new THREE.Vector3(0, -14.94, 0),
        new THREE.Vector3(34, -52, 14),
        cp,
        0.24
      )
    );
  }

  // X2-29. BSPDN Self-Heating Paradox Thermal Solution: Dummy Phonon-Escape Vias & CVD Diamond Spreader
  {
    const g = new THREE.Group();
    const diamondPlate = makeHiResHorizPlate(
      createRoundedRectShape(24.0, 24.0, 1.8),
      0.72,
      mats.quartzOlpf,
      0.1,
      2,
      20
    );
    diamondPlate.position.y = -0.5;
    g.add(diamondPlate);

    // Central radial copper-diamond phonon heat-spreader X-bridges + 12 dummy thermal phonon-escape pillars with cooling fins!
    const spreadX = new THREE.Mesh(createChamferedBoxGeo(20.6, 0.28, 1.2, 0.06, 0.02, 'y'), mats.vaporChamberCopper);
    spreadX.position.y = 0.02;
    const spreadZ = new THREE.Mesh(createChamferedBoxGeo(1.2, 0.28, 20.6, 0.06, 0.02, 'y'), mats.vaporChamberCopper);
    spreadZ.position.y = 0.02;
    const centerDiamond = new THREE.Mesh(new THREE.OctahedronGeometry(1.65, 0), mats.lensXaGlass);
    centerDiamond.scale.set(1.2, 0.45, 1.2);
    centerDiamond.position.y = 0.36;
    centerDiamond.userData.noEdges = true;
    g.add(spreadX, spreadZ, centerDiamond);

    const tViaGeo = hiResCyl(0.75, 0.75, 2.2, 14);
    const finRingGeo = hiResTorus(1.05, 0.14, 7, 18);
    for (let k = 0; k < 12; k++) {
      const ang = (k / 12) * Math.PI * 2;
      const rx = Math.cos(ang) * 9.8;
      const rz = Math.sin(ang) * 9.8;
      const pillar = new THREE.Mesh(tViaGeo, mats.vaporChamberCopper);
      pillar.position.set(rx, 0.65, rz);
      pillar.userData.noEdges = true;
      const fin = new THREE.Mesh(finRingGeo, mats.cinnabarAnodized);
      fin.rotation.x = Math.PI / 2;
      fin.position.set(rx, 1.45, rz);
      fin.userData.noEdges = true;
      const finLow = new THREE.Mesh(finRingGeo, mats.goldPlating);
      finLow.rotation.x = Math.PI / 2;
      finLow.position.set(rx, 0.75, rz);
      finLow.userData.noEdges = true;
      g.add(pillar, fin, finLow);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-selfheating-phonon-via',
        29,
        '#ef4444',
        g,
        new THREE.Vector3(0, -20.23, 0),
        new THREE.Vector3(-34, -70, -14),
        cp,
        0.22
      )
    );
  }

  // X2-30. BIONZ XR2 Coherent Unified Memory NoC Ring Bus & Active Silicon Die Floorplan Backplane
  {
    const g = new THREE.Group();
    // Contiguous 42x37 Active Silicon Die Floorplan Substrate supporting all 30 BIONZ XR2 SoC macros flush
    const dieBackplane = makeHiResHorizPlate(
      createRoundedRectShape(DIE_W, DIE_D, 1.8),
      0.46,
      mats.siliconLogicLayer,
      0.06,
      2,
      20
    );
    dieBackplane.position.y = -0.14;
    // Perimeter Coherent NoC Ring Bus & 4-Quadrant Crossbar Highways (ISP | NPU+SRAM | Security | DTI-Clock)
    const nocRing = makeHiResHorizPlate(
      createFrameShape(DIE_W - 0.4, DIE_D - 0.4, 1.6, DIE_W - 3.8, DIE_D - 3.8, 1.2),
      0.48,
      mats.copperHybridBond,
      0.05,
      2,
      20
    );
    nocRing.position.y = -0.02;
    const innerTrack = makeHiResHorizPlate(
      createFrameShape(DIE_W - 1.4, DIE_D - 1.4, 1.5, DIE_W - 2.3, DIE_D - 2.3, 1.3),
      0.14,
      mats.vcWorkingFluidCyan,
      0.02,
      1,
      16
    );
    innerTrack.position.y = 0.2;
    const outerTrack = makeHiResHorizPlate(
      createFrameShape(DIE_W - 0.6, DIE_D - 0.6, 1.6, DIE_W - 1.3, DIE_D - 1.3, 1.4),
      0.14,
      mats.goldPlating,
      0.02,
      1,
      16
    );
    outerTrack.position.y = 0.2;
    // Internal 4-Quadrant Coherent Mesh Spine Bars separating ISP / NPU / Security / Clock zones!
    const spineX = new THREE.Mesh(createChamferedBoxGeo(DIE_W - 3.2, 0.14, 0.86, 0.02, 0.01, 'y'), mats.goldPlating);
    spineX.position.set(0, 0.16, 0);
    spineX.userData.noEdges = true;
    const spineZ = new THREE.Mesh(createChamferedBoxGeo(0.86, 0.14, DIE_D - 3.2, 0.02, 0.01, 'y'), mats.vcWorkingFluidCyan);
    spineZ.position.set(0, 0.16, 0);
    spineZ.userData.noEdges = true;
    g.add(dieBackplane, nocRing, innerTrack, outerTrack, spineX, spineZ);

    // 8 Fine-Grained Microsecond Power-Gating Header Switches + Cache-Coherent Directory Router Hubs along perimeter!
    const routerCoords: [number, number][] = [
      [-19.8, -11.5],
      [-19.8, 11.5],
      [19.8, -11.5],
      [19.8, 11.5],
      [-11.5, -17.3],
      [11.5, -17.3],
      [-11.5, 17.3],
      [11.5, 17.3],
    ];
    for (let k = 0; k < routerCoords.length; k++) {
      const [nx, nz] = routerCoords[k];
      const sw = new THREE.Mesh(
        createChamferedBoxGeo(2.0, 0.44, 2.0, 0.06, 0.03, 'y'),
        k % 2 === 0 ? mats.goldPlating : mats.mountShimBlue
      );
      sw.position.set(nx, 0.04, nz);
      sw.userData.noEdges = true;
      g.add(sw);
    }

    parts.push(
      finalizeBionzV2Part(
        'xv2-unified-memory-noc',
        30,
        '#14b8a6',
        g,
        new THREE.Vector3(0, -4.61, 0),
        new THREE.Vector3(0, -14, 0),
        cp,
        0.24
      )
    );
  }

  // 4-Corner Die-Perimeter Cu/TiN Crack-Stop Seal-Ring & TSV Continuity Columns connecting EVERY stacked
  // 42x37 deck monolithically from X2-02 CoWoS-L RDL Interposer -> X2-27 -> X2-25 -> X2-30 -> X2-08 -> X2-07 -> X2-01 -> X2-52
  // while preserving 360-degree unobstructed open cutaway faces on all 4 sides!
  const cornerColumnSpanByOrder: Record<number, number> = {
    2: 3.665,  // X2-02 CoWoS-L RDL -> X2-27 Backside PDN slab underside corners (clears inner C4 bumps!)
    27: 3.634, // X2-27 Backside PDN -> X2-25 BPR Wafer
    25: 5.671, // X2-25 BPR Wafer -> X2-30 NoC/SoC Backplane
    30: 2.75,  // X2-30 NoC/SoC -> X2-08 M0/M1 BEOL
    8: 2.49,   // X2-08 M0/M1 BEOL -> X2-07 Upper BEOL
    7: 2.18,   // X2-07 Upper BEOL -> X2-01 SoIC-X
    1: 2.65,   // X2-01 SoIC-X -> X2-52 Microfluidic Cooler
  };
  const dieCornerCoords: Array<[number, number]> = [
    [-19.95, -17.45],
    [19.95, -17.45],
    [-19.95, 17.45],
    [19.95, 17.45],
  ];

  // Harmonize macro proportions inside the realistic 42x37 logic die & 41.6x36.6 CoWoS-L interposer footprint:
  //   - X2-03, X2-05, X2-06, X2-19, X2-20, X2-24: 0.80x X/Z
  //   - X2-21, X2-22, X2-23 (ISP macros): 0.80x X/Z & 0.78x Y to match all 30 SoC floorplan tiles
  //   - X2-12..17 (Hero 2nm GAA core): 0.56x Y & X2-18 (CFET): 0.80x Y for crisp 5.6u FEOL chamber
  //   - X2-26 (A16 SPR direct backside VB contacts): 0.62x Y for realistic 300nm thinned-Si BSPDN height
  for (const part of parts) {
    let sx = 1.0;
    let sy = 1.0;
    let sz = 1.0;
    if (part.order === 3 || part.order === 5 || part.order === 6 || part.order === 19 || part.order === 20 || part.order === 24) {
      sx = 0.8;
      sz = 0.8;
    } else if (part.order >= 21 && part.order <= 23) {
      sx = 0.8;
      sy = 0.78;
      sz = 0.8;
    } else if (part.order >= 12 && part.order <= 17) {
      sy = 0.56;
    } else if (part.order === 18) {
      sy = 0.8;
    } else if (part.order === 26) {
      sy = 0.62;
    }
    if (sx !== 1.0 || sy !== 1.0 || sz !== 1.0) {
      const scaledHolder = new THREE.Group();
      scaledHolder.scale.set(sx, sy, sz);
      while (part.group.children.length > 0) {
        scaledHolder.add(part.group.children[0]);
      }
      part.group.add(scaledHolder);
    }

    const spanH = cornerColumnSpanByOrder[part.order];
    if (spanH !== undefined) {
      part.group.updateMatrixWorld(true);
      const localBox = new THREE.Box3();
      for (const ch of part.group.children) {
        localBox.expandByObject(ch);
      }
      // Subtract group world offset because finalizeBionzV2Part set group.position = assembledPos
      const deckTopLocalY = localBox.max.y - part.group.position.y;
      const isCowosDeck = part.order === 2;
      const rootY = isCowosDeck ? deckTopLocalY - 0.52 : deckTopLocalY - 0.2;
      const flangeBotY = isCowosDeck ? deckTopLocalY - 0.24 : deckTopLocalY + 0.04;
      const tipY = deckTopLocalY + spanH - 0.02;
      const colH = tipY - rootY;
      const colMidY = (rootY + tipY) * 0.5;

      const shaftGeo = hiResCyl(0.28, 0.28, colH, 12);
      const collarGeo = hiResCyl(0.39, 0.39, 0.22, 12);
      const ringGeo = hiResCyl(0.34, 0.34, 0.16, 12);
      const colGroup = new THREE.Group();
      colGroup.name = 'die-corner-seal-ring-columns';
      for (const [cx, cz] of dieCornerCoords) {
        const shaft = new THREE.Mesh(shaftGeo, mats.taNBarrierLiner);
        shaft.position.set(cx, colMidY, cz);
        shaft.userData.noEdges = true;
        const botFlange = new THREE.Mesh(collarGeo, mats.copperHybridBond);
        botFlange.position.set(cx, flangeBotY, cz);
        botFlange.userData.noEdges = true;
        const topFlange = new THREE.Mesh(collarGeo, mats.copperHybridBond);
        topFlange.position.set(cx, tipY - 0.11, cz);
        topFlange.userData.noEdges = true;
        const midBand = new THREE.Mesh(ringGeo, mats.goldPlating);
        midBand.position.set(cx, colMidY, cz);
        midBand.userData.noEdges = true;
        colGroup.add(shaft, botFlange, topFlange, midBand);
        part.interactiveMeshes.push(shaft, botFlange, topFlange, midBand);
      }
      tagPartMeshes(colGroup, part.id);
      part.group.add(colGroup);
    }

    part.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.geometry) {
        markHiRes(obj.geometry);
      }
    });
  }

  return parts;
}
