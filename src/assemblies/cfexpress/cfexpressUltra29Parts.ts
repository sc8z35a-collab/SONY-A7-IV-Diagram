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
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeCfexpressUltra29Part(
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
 * Phase 29 — Sub-Nanometer Quantum, Packaging Metallurgy, Multi-GHz PCB Microstructure,
 * 6nm/2nm SerDes Transistor-Level Engine & 2026 Next-Gen Frontier (+30 Parts C101–C130 -> 130 Total Parts!).
 *
 * Every part sits strictly inside the assembled Sony CEA-G1920T TOUGH envelope
 * (|x| <= 17.4, y in [-23.5, +24.0], |z| <= 2.02) and explodes into a watchmaker-grade
 * outer orbital ring that leaves the hero C01/C02 exterior faces 100% unobstructed.
 */
export function buildCfexpressUltra29Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // C101. BE-SONOS Bandgap-Engineered Tunnel Oxide (O1 / N1 / O2 Quantum Barrier)
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(8.8, 5.2, 0.26, 0.35, 0.04, 'z');
    applyPlanarUVs(baseGeo, 8.8, 5.2, 'xy');
    const slab = new THREE.Mesh(baseGeo, u.cfeQuantumChargeTrapStack);
    g.add(slab);

    // Left Poly-Si channel carrier bar + 3 energy-bandgap stepped O1 (1.3 nm SiO2) / N1 (2.0 nm Si3N4 crest) / O2 (1.8 nm SiO2) barriers + right trap sink!
    const chBar = new THREE.Mesh(createChamferedBoxGeo(0.75, 4.1, 0.24, 0.10, 0.02, 'z'), mats.gatePolysilicon);
    chBar.position.set(-3.45, 0.15, 0.26);
    chBar.userData.noEdges = true;
    g.add(chBar);

    const barrierDefs: Array<[number, number, THREE.Material]> = [
      [-1.75, 0.36, mats.goldPlating],
      [0.10, 0.62, mats.siliconLogicLayer],
      [1.95, 0.42, mats.vcWorkingFluidCyan],
    ];
    for (const [bx, bh, mat] of barrierDefs) {
      const layer = new THREE.Mesh(createChamferedBoxGeo(1.55, 4.1, bh, 0.14, 0.03, 'z'), mat);
      layer.position.set(bx, 0.15, 0.14 + bh * 0.5);
      layer.userData.noEdges = true;
      g.add(layer);
    }

    // Continuous quantum tunneling wavepacket tube + 7 glowing electron probability spheres traversing the stepped barrier!
    const wavePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const wx = -3.6 + t * 7.2;
      const amp = 0.85 * Math.exp(-t * 0.65);
      wavePts.push(new THREE.Vector3(wx, Math.sin(t * Math.PI * 3.5) * amp, 0.82 - t * 0.14));
    }
    const waveTube = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wavePts), 28, 0.08, 6, false)),
      mats.vcWorkingFluidCyan
    );
    waveTube.userData.noEdges = true;
    g.add(waveTube);

    const eGeo = hiResSphere(0.20, 10, 8);
    for (let i = 0; i < 7; i++) {
      const p = wavePts[i * 2];
      const eDot = new THREE.Mesh(eGeo, mats.goldPlating);
      eDot.position.copy(p);
      eDot.userData.noEdges = true;
      g.add(eDot);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-besonos-tunnel-oxide',
        101,
        '#facc15',
        g,
        new THREE.Vector3(-4.2, 11.4, 0.52),
        new THREE.Vector3(-94, 92, 34),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C102. High-k Al2O3 / LaAlOx Blocking Dielectric & Gate Back-Tunneling Wall
  // =========================================================================
  {
    const g = new THREE.Group();
    const wallCarrier = new THREE.Mesh(
      createChamferedBoxGeo(8.6, 5.2, 0.26, 0.32, 0.04, 'z'),
      u.cfeMolyWordlineMetal
    );
    g.add(wallCarrier);

    // 4-strata blocking wall: Si3N4 trap -> High-k Al2O3 -> La-doped LaAlOx dipole barrier -> HfO2 cap -> Barrierless Mo gate!
    const strataDefs: Array<[number, number, number, THREE.Material]> = [
      [-2.85, 1.35, 0.42, mats.loficDielectric],
      [-1.30, 1.45, 0.54, mats.vcWorkingFluidCyan],
      [0.30, 1.45, 0.62, mats.quartzOlpf],
      [1.70, 0.95, 0.56, mats.aluminaHighKFilm],
      [3.00, 1.35, 0.48, mats.stainlessMachined],
    ];
    for (const [sx, sw, sh, mat] of strataDefs) {
      const wall = new THREE.Mesh(createChamferedBoxGeo(sw, 4.2, sh, 0.12, 0.03, 'z'), mat);
      wall.position.set(sx, 0, 0.14 + sh * 0.5);
      wall.userData.noEdges = true;
      g.add(wall);
    }

    // 6 Lanthanum (La3+) dipole dopant crystal spheres inside LaAlOx + reflected back-tunneling arc!
    const laGeo = hiResSphere(0.19, 10, 8);
    for (let i = 0; i < 6; i++) {
      const laDot = new THREE.Mesh(laGeo, mats.cinnabarAnodized);
      laDot.position.set(0.30 + (i % 2 === 0 ? -0.25 : 0.25), -1.5 + i * 0.60, 0.78);
      laDot.userData.noEdges = true;
      g.add(laDot);
    }
    const bounceArc = new THREE.Mesh(hiResTorus(0.95, 0.09, 8, 20, Math.PI), mats.goldPlating);
    bounceArc.rotation.z = -Math.PI / 2;
    bounceArc.position.set(2.4, 0, 0.80);
    bounceArc.userData.noEdges = true;
    g.add(bounceArc);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-highk-al2o3-blocking',
        102,
        '#0284c7',
        g,
        new THREE.Vector3(-1.4, 13.8, 0.58),
        new THREE.Vector3(-68, 108, 42),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C103. Amorphous Si3N4 0.87 eV Quantum Trap Energy Wells & Lateral Migration Cut
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(8.8, 5.4, 0.26, 0.32, 0.04, 'z');
    applyPlanarUVs(baseGeo, 8.8, 5.4, 'xy');
    const matrix = new THREE.Mesh(baseGeo, u.cfeQuantumChargeTrapStack);
    g.add(matrix);

    // 3×2 sculpted 0.87 eV funnel-shaped quantum potential wells (outer rim + stepped inner funnel + glowing trapped electron!)
    const outerRimGeo = hiResTorus(0.76, 0.12, 10, 22);
    const innerFunnelGeo = hiResCyl(0.56, 0.32, 0.24, 16, true).rotateX(Math.PI / 2);
    const electronGeo = hiResSphere(0.28, 12, 10);

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const wx = -2.45 + c * 2.45;
        const wy = -1.08 + r * 2.16;
        const wellRing = new THREE.Mesh(outerRimGeo, mats.siliconLogicLayer);
        wellRing.position.set(wx, wy, 0.30);
        wellRing.userData.noEdges = true;

        const funnel = new THREE.Mesh(innerFunnelGeo, mats.loficDielectric);
        funnel.position.set(wx, wy, 0.24);
        funnel.userData.noEdges = true;

        const electron = new THREE.Mesh(electronGeo, mats.goldPlating);
        electron.position.set(wx, wy, 0.34);
        electron.userData.noEdges = true;
        g.add(wellRing, funnel, electron);
      }
    }

    // 2 full-height vertical dielectric migration-cut trench walls + top/bottom wordline isolation curbs!
    for (const tx of [-1.22, 1.22]) {
      const cutWall = new THREE.Mesh(createChamferedBoxGeo(0.22, 4.7, 0.56, 0.06, 0.02, 'z'), mats.vcWorkingFluidCyan);
      cutWall.position.set(tx, 0, 0.36);
      cutWall.userData.noEdges = true;
      g.add(cutWall);
    }
    for (const cy of [-2.42, 2.42]) {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.22, 0.24), mats.tungstenGrid);
      curb.position.set(0, cy, 0.26);
      curb.userData.noEdges = true;
      g.add(curb);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-si3n4-trap-energy-wells',
        103,
        '#9333ea',
        g,
        new THREE.Vector3(2.2, 14.5, 0.54),
        new THREE.Vector3(-40, 118, 36),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C104. Adaptive ISPP Step-Pulse Verify & Channel Self-Boost Program Inhibit
  // =========================================================================
  {
    const g = new THREE.Group();
    const board = new THREE.Mesh(
      createChamferedBoxGeo(9.2, 5.2, 0.24, 0.3, 0.04, 'z'),
      u.icEpoxyLaser
    );
    g.add(board);

    // 8 ascending ISPP staircase voltage pulses (14V -> 24V) paired with golden verify ticks & continuous ramp trace!
    const rampPts: THREE.Vector3[] = [];
    for (let i = 0; i < 8; i++) {
      const px = -3.65 + i * 1.02;
      const hProg = 0.85 + i * 0.36;
      const pulse = new THREE.Mesh(
        createChamferedBoxGeo(0.50, hProg, 0.32, 0.08, 0.02, 'z'),
        i >= 5 ? mats.cinnabarAnodized : mats.copperHeatSpreader
      );
      pulse.position.set(px, -1.95 + hProg * 0.5, 0.28);
      pulse.userData.noEdges = true;
      rampPts.push(new THREE.Vector3(px, -1.95 + hProg, 0.48));

      if (i < 7) {
        const ver = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.62, 0.26), mats.goldPlating);
        ver.position.set(px + 0.48, -1.62, 0.24);
        ver.userData.noEdges = true;
        g.add(ver);
      }
      g.add(pulse);
    }
    const rampWire = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rampPts), 22, 0.07, 6, false)),
      mats.goldPlating
    );
    rampWire.userData.noEdges = true;

    // Floating cyan self-boosted 8V program-inhibit shield rail + emerald Vth-lock verify target marker along top!
    const boostRail = new THREE.Mesh(
      createChamferedBoxGeo(7.6, 0.42, 0.34, 0.1, 0.02, 'z'),
      mats.vcWorkingFluidCyan
    );
    boostRail.position.set(-0.35, 2.02, 0.32);
    const lockFlag = new THREE.Mesh(hiResCyl(0.42, 0.42, 0.36, 6).rotateX(Math.PI / 2), mats.cfaGreen);
    lockFlag.position.set(3.85, 2.02, 0.34);
    lockFlag.userData.noEdges = true;
    g.add(rampWire, boostRail, lockFlag);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-ispp-step-pulse-verify',
        104,
        '#f97316',
        g,
        new THREE.Vector3(-7.4, 8.6, 0.46),
        new THREE.Vector3(-108, 72, 16),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C105. 332–400-Layer Wafer Backside High-Stress PVD SiN/SiON Bow Compensation Film
  // =========================================================================
  {
    const g = new THREE.Group();
    const siDieGeo = createChamferedBoxGeo(8.8, 5.8, 0.22, 0.3, 0.03, 'z');
    applyPlanarUVs(siDieGeo, 8.8, 5.8, 'xy');
    const siDie = new THREE.Mesh(siDieGeo, u.cfeBiCS10WaferDie);
    siDie.position.z = 0.16;

    // Multi-zone reactive-sputtered PVD SiN/SiON compressive stress layer on wafer backside
    const sinFilm = new THREE.Mesh(
      createChamferedBoxGeo(8.6, 5.6, 0.24, 0.28, 0.04, 'z'),
      mats.siliconSensorDie
    );
    sinFilm.position.z = -0.14;

    // 8 radial compressive stress-vector ribs + dual concentric tuning rings stabilizing >300-layer wafer bow!
    const ribGeo = new THREE.BoxGeometry(2.4, 0.22, 0.20);
    for (let i = 0; i < 8; i++) {
      const ang = (i * Math.PI) / 4;
      const rib = new THREE.Mesh(ribGeo, i % 2 === 0 ? mats.vcWorkingFluidCyan : mats.goldPlating);
      rib.position.set(Math.cos(ang) * 2.25, Math.sin(ang) * 1.48, -0.32);
      rib.rotation.z = ang;
      rib.userData.noEdges = true;
      g.add(rib);
    }
    const innerRing = new THREE.Mesh(hiResTorus(0.95, 0.11, 8, 24), mats.titaniumRivet);
    innerRing.position.z = -0.34;
    innerRing.userData.noEdges = true;
    const outerRing = new THREE.Mesh(hiResTorus(2.05, 0.09, 8, 28), mats.vcWorkingFluidCyan);
    outerRing.scale.set(1.35, 0.88, 1.0);
    outerRing.position.z = -0.34;
    outerRing.userData.noEdges = true;

    g.add(siDie, sinFilm, innerRing, outerRing);
    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-wafer-backside-stress-sin',
        105,
        '#0ea5e9',
        g,
        new THREE.Vector3(-4.6, 15.6, -0.45),
        new THREE.Vector3(-82, 114, -8),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C106. CBA Hybrid-Bond SiCN Dielectric Interface & Sub-2 nm CMP Dishing Mirror
  // =========================================================================
  {
    const g = new THREE.Group();
    const topSicn = new THREE.Mesh(
      createChamferedBoxGeo(8.6, 5.2, 0.22, 0.3, 0.04, 'z'),
      mats.quartzOlpf
    );
    topSicn.position.z = 0.28;
    const botSicn = new THREE.Mesh(
      createChamferedBoxGeo(8.6, 5.2, 0.22, 0.3, 0.04, 'z'),
      mats.siliconLogicLayer
    );
    botSicn.position.z = -0.28;

    // Plasma-activated Si-OH hydrophilic fusion interface frame at z = 0!
    const siOhRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(8.4, 5.0, 0.28, 7.6, 4.2, 0.22), 0.10, 0.02, 0.02, 1, 14),
      mats.vcWorkingFluidCyan
    );
    siOhRing.userData.noEdges = true;
    g.add(topSicn, botSicn, siOhRing);

    // 5×7 direct Cu-Cu bumpless hybrid bond micro-pillars + recessed CMP dishing collars (InstancedMesh!)
    const padGeo = hiResCyl(0.26, 0.26, 0.50, 12).rotateX(Math.PI / 2);
    const dishGeo = hiResTorus(0.30, 0.045, 6, 14);
    const padInst = new THREE.InstancedMesh(padGeo, mats.copperHeatSpreader, 35);
    const dishInst = new THREE.InstancedMesh(dishGeo, mats.goldPlating, 35);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 7; c++) {
        const px = -3.3 + c * 1.1;
        const py = -1.8 + r * 0.9;
        dm.position.set(px, py, 0);
        dm.updateMatrix();
        padInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(px, py, 0.39);
        dm.updateMatrix();
        dishInst.setMatrixAt(idx, dm.matrix);
        idx++;
      }
    }
    padInst.instanceMatrix.needsUpdate = true;
    dishInst.instanceMatrix.needsUpdate = true;
    padInst.userData.noEdges = true;
    dishInst.userData.noEdges = true;
    g.add(padInst, dishInst);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-sicn-cmp-sub2nm-dishing',
        106,
        '#d97706',
        g,
        new THREE.Vector3(0.5, 16.4, -0.32),
        new THREE.Vector3(-48, 124, -18),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C107. 25 μm Thin-Wafer Stealth Dicing (1117 nm NIR Subsurface MOD Layer)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stretched translucent dicing-expand tape carrier beneath the separated wafer halves!
    const expandTape = new THREE.Mesh(
      createChamferedBoxGeo(9.2, 5.8, 0.12, 0.26, 0.02, 'z'),
      mats.vcWorkingFluidCyan
    );
    expandTape.position.z = -0.34;
    expandTape.userData.noEdges = true;
    g.add(expandTape);

    // Split 25 μm silicon wafer pair separated cleanly along a zero-kerf internal laser modified (MOD) plane
    for (const sx of [-2.28, 2.28]) {
      const halfGeo = createChamferedBoxGeo(3.9, 5.4, 0.42, 0.22, 0.04, 'z');
      applyPlanarUVs(halfGeo, 3.9, 5.4, 'xy');
      const half = new THREE.Mesh(halfGeo, u.cfeBiCS10WaferDie);
      half.position.x = sx;
      g.add(half);
    }

    // 9 glowing 1117 nm NIR subsurface modified (MOD) focal beads + internal hairline fracture seam
    const beadGeo = hiResSphere(0.20, 10, 8);
    for (let i = -4; i <= 4; i++) {
      const modBead = new THREE.Mesh(beadGeo, mats.cinnabarAnodized);
      modBead.position.set(0, i * 0.58, 0);
      modBead.userData.noEdges = true;
      g.add(modBead);
    }
    const fractureSeam = new THREE.Mesh(new THREE.BoxGeometry(0.08, 5.2, 0.44), mats.goldPlating);
    fractureSeam.userData.noEdges = true;

    // Crimson 1117 nm NIR laser focusing cone + miniature optical objective collar entering from backside!
    const laserCone = new THREE.Mesh(hiResCyl(0.08, 0.58, 1.05, 14).rotateX(Math.PI / 2), mats.cinnabarAnodized);
    laserCone.position.set(0, 0, -0.78);
    laserCone.userData.noEdges = true;
    const lensCollar = new THREE.Mesh(hiResTorus(0.62, 0.10, 8, 20), mats.titaniumRivet);
    lensCollar.position.set(0, 0, -1.26);
    lensCollar.userData.noEdges = true;
    g.add(fractureSeam, laserCone, lensCollar);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-stealth-dicing-mod-layer',
        107,
        '#ef4444',
        g,
        new THREE.Vector3(-9.2, 12.2, -0.58),
        new THREE.Vector3(-114, 48, -14),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C108. 2026 Frontier: Ferroelectric HZO (Hf0.5Zr0.5O2) + a-IGZO FeNAND Cell
  // =========================================================================
  {
    const g = new THREE.Group();
    const hzoGeo = createChamferedBoxGeo(9.0, 5.8, 0.34, 0.36, 0.05, 'z');
    applyPlanarUVs(hzoGeo, 9.0, 5.8, 'xy');
    const hzoSlab = new THREE.Mesh(hzoGeo, u.cfeFerroelectricHzoCrystal);
    g.add(hzoSlab);

    // Central transparent cyan a-IGZO vertical oxide-semiconductor channel ring + quartz core + outer Mo gate ring!
    const moGateRing = new THREE.Mesh(hiResTorus(2.05, 0.16, 10, 28), u.cfeMolyWordlineMetal);
    moGateRing.position.z = 0.28;
    moGateRing.userData.noEdges = true;

    const igzoRing = new THREE.Mesh(hiResCyl(1.42, 1.42, 0.68, 24).rotateX(Math.PI / 2), mats.vcWorkingFluidCyan);
    igzoRing.position.z = 0.24;
    const innerCore = new THREE.Mesh(hiResCyl(0.74, 0.74, 0.78, 20).rotateX(Math.PI / 2), mats.quartzOlpf);
    innerCore.position.z = 0.26;
    innerCore.userData.noEdges = true;
    g.add(moGateRing, igzoRing, innerCore);

    // 8 crisp vertical opposing ferroelectric +P (gold up) / -P (cinnabar down) dipole arrows flanking the Mo gate ring!
    const shaftGeo = hiResCyl(0.11, 0.11, 0.72, 10);
    const headGeo = hiResCyl(0.02, 0.24, 0.34, 10);
    const dipoleCoords: Array<[number, number, boolean]> = [
      [-3.55, 1.35, true],
      [-2.75, 1.35, false],
      [-3.55, -1.25, false],
      [-2.75, -1.25, true],
      [2.75, 1.35, true],
      [3.55, 1.35, false],
      [2.75, -1.25, false],
      [3.55, -1.25, true],
    ];
    for (const [dx, dy, isUp] of dipoleCoords) {
      const mat = isUp ? mats.goldPlating : mats.cinnabarAnodized;
      const dip = new THREE.Mesh(shaftGeo, mat);
      dip.position.set(dx, dy, 0.42);
      dip.userData.noEdges = true;

      const tip = new THREE.Mesh(headGeo, mat);
      tip.position.set(dx, dy + (isUp ? 0.50 : -0.50), 0.42);
      if (!isUp) tip.rotation.z = Math.PI;
      tip.userData.noEdges = true;
      g.add(dip, tip);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-fenand-hzo-igzo-2026',
        108,
        '#d946ef',
        g,
        new THREE.Vector3(3.2, 17.8, 0.62),
        new THREE.Vector3(-16, 126, 10),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C109. SAC305 BGA Solder Intermetallic (Cu6Sn5 / Cu3Sn) & Kirkendall Void Guard
  // =========================================================================
  {
    const g = new THREE.Group();
    const blockGeo = createChamferedBoxGeo(8.2, 5.2, 0.54, 0.34, 0.05, 'z');
    applyPlanarUVs(blockGeo, 8.2, 5.2, 'xy');
    const block = new THREE.Mesh(blockGeo, u.cfeSolderImcMicrostructure);
    g.add(block);

    // Pure Copper PCB pad -> Ni Kirkendall diffusion guard -> planar ε-Cu3Sn -> scalloped η-Cu6Sn5 domes -> Ag3Sn speckles!
    const cuPad = new THREE.Mesh(createChamferedBoxGeo(7.8, 0.92, 0.66, 0.14, 0.04, 'z'), mats.copperHeatSpreader);
    cuPad.position.set(0, -1.98, 0.06);
    const niGuard = new THREE.Mesh(createChamferedBoxGeo(7.7, 0.24, 0.68, 0.08, 0.02, 'z'), mats.stainlessMachined);
    niGuard.position.set(0, -1.44, 0.07);
    niGuard.userData.noEdges = true;
    const cu3sn = new THREE.Mesh(createChamferedBoxGeo(7.6, 0.36, 0.70, 0.08, 0.02, 'z'), mats.beCuSpring);
    cu3sn.position.set(0, -1.14, 0.08);
    g.add(cuPad, niGuard, cu3sn);

    // 7 scalloped η-Cu6Sn5 intermetallic crystal domes + 12 bulk SAC305 Ag3Sn precipitate micro-speckles!
    const domeGeo = hiResSphere(0.50, 12, 10);
    for (let i = 0; i < 7; i++) {
      const dome = new THREE.Mesh(domeGeo, mats.solderBallSilver);
      dome.scale.set(1.0, 0.74, 0.68);
      dome.position.set(-3.15 + i * 1.05, -0.74, 0.28);
      dome.userData.noEdges = true;
      g.add(dome);
    }
    const specGeo = hiResSphere(0.14, 8, 6);
    for (let i = 0; i < 12; i++) {
      const sp = new THREE.Mesh(specGeo, mats.goldPlating);
      sp.position.set(-3.1 + (i % 6) * 1.24, 0.35 + Math.floor(i / 6) * 1.25 + (i % 2) * 0.22, 0.32);
      sp.userData.noEdges = true;
      g.add(sp);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-sac305-imc-cu6sn5-cu3sn',
        109,
        '#94a3b8',
        g,
        new THREE.Vector3(5.6, 10.2, -0.62),
        new THREE.Vector3(38, 116, -24),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C110. Flip-Chip 60 μm Copper Pillar & Ti/Cu/Ni Trilayer UBM Metallurgy
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrier = new THREE.Mesh(
      createChamferedBoxGeo(8.4, 5.4, 0.24, 0.3, 0.04, 'z'),
      u.bionzAbfSubstrate
    );
    g.add(carrier);

    // 4×2 precision 60 μm flip-chip Cu pillars with 5 metallurgical strata + copper substrate trace breakouts!
    const rdlGeo = new THREE.BoxGeometry(0.24, 1.25, 0.07);
    const tiGeo = hiResCyl(0.58, 0.58, 0.14, 16).rotateX(Math.PI / 2);
    const seedGeo = hiResCyl(0.52, 0.52, 0.09, 16).rotateX(Math.PI / 2);
    const cuGeo = hiResCyl(0.46, 0.46, 0.56, 16).rotateX(Math.PI / 2);
    const niGeo = hiResCyl(0.49, 0.49, 0.14, 16).rotateX(Math.PI / 2);
    const snGeo = hiResSphere(0.45, 12, 10);

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const px = -2.7 + c * 1.8;
        const py = -1.15 + r * 2.3;
        const trace = new THREE.Mesh(rdlGeo, mats.copperCoil);
        trace.position.set(px, py + (r === 0 ? -0.75 : 0.75), 0.15);
        trace.userData.noEdges = true;

        const tiBase = new THREE.Mesh(tiGeo, mats.titaniumRivet);
        tiBase.position.set(px, py, 0.19);
        const cuSeed = new THREE.Mesh(seedGeo, mats.goldPlating);
        cuSeed.position.set(px, py, 0.29);
        const cuPil = new THREE.Mesh(cuGeo, mats.copperHeatSpreader);
        cuPil.position.set(px, py, 0.60);
        const niBar = new THREE.Mesh(niGeo, mats.stainlessMachined);
        niBar.position.set(px, py, 0.94);
        const snCap = new THREE.Mesh(snGeo, mats.solderBallSilver);
        snCap.scale.set(1, 1, 0.64);
        snCap.position.set(px, py, 1.07);

        for (const m of [tiBase, cuSeed, cuPil, niBar, snCap]) {
          m.userData.noEdges = true;
          g.add(m);
        }
        g.add(trace);
      }
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-cu-pillar-ubm-trilayer',
        110,
        '#ea580c',
        g,
        new THREE.Vector3(7.4, 7.6, -0.52),
        new THREE.Vector3(72, 108, -32),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C111. Pd-Coated Copper (PdCu) Wirebond & Free-Air-Ball (FAB) Cu-Al-Pd IMC
  // =========================================================================
  {
    const g = new THREE.Group();
    const padSlab = new THREE.Mesh(
      createChamferedBoxGeo(8.4, 5.0, 0.28, 0.3, 0.04, 'z'),
      u.cfeHdiPcb
    );
    g.add(padSlab);

    // 4 Al die pads + Pd-rich Cu-Al-Pd IMC collar + squashed copper FAB sphere + realistic reverse-kink PdCu wirebond loops + ENEPIG wedge feet!
    const alGeo = createChamferedBoxGeo(1.18, 1.18, 0.14, 0.12, 0.02, 'z');
    const fabGeo = hiResSphere(0.40, 12, 10);
    const pdGeo = hiResTorus(0.42, 0.08, 8, 18);
    const enepigGeo = createChamferedBoxGeo(0.92, 0.96, 0.14, 0.10, 0.02, 'z');

    for (let i = 0; i < 4; i++) {
      const wx = -2.85 + i * 1.9;
      const alPad = new THREE.Mesh(alGeo, mats.stainlessMachined);
      alPad.position.set(wx, -1.45, 0.22);
      const fabBall = new THREE.Mesh(fabGeo, mats.copperCoil);
      fabBall.scale.set(1.0, 1.0, 0.68);
      fabBall.position.set(wx, -1.45, 0.42);
      const pdRim = new THREE.Mesh(pdGeo, mats.titaniumRivet);
      pdRim.position.set(wx, -1.45, 0.34);

      const enepigPad = new THREE.Mesh(enepigGeo, mats.goldPlating);
      enepigPad.position.set(wx, 1.55, 0.22);

      // Authentic semiconductor ball-to-stitch trajectory (vertical neck -> NEC kink -> sweeping arch -> wedge stitch)
      const wireCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(wx, -1.45, 0.44),
        new THREE.Vector3(wx, -1.35, 1.25),
        new THREE.Vector3(wx, -0.35, 1.42),
        new THREE.Vector3(wx, 0.85, 1.02),
        new THREE.Vector3(wx, 1.55, 0.32),
      ]);
      const wire = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(wireCurve, 16, 0.085, 8, false)),
        mats.copperHeatSpreader
      );
      for (const m of [alPad, fabBall, pdRim, enepigPad, wire]) {
        m.userData.noEdges = true;
        g.add(m);
      }
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-pdcu-wirebond-fab-imc',
        111,
        '#f59e0b',
        g,
        new THREE.Vector3(8.6, 13.4, -0.42),
        new THREE.Vector3(104, 92, -38),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C112. 16-Die Stacked NAND Film-Over-Wire (FOW) Void-Free Encapsulation Adhesive
  // =========================================================================
  {
    const g = new THREE.Group();
    // 5 alternating layers of ultra-thin 25 μm silicon dies separated by translucent Film-Over-Wire (FOW) adhesive
    // completely encapsulating actual arching gold bond wires with ZERO void or die tilt!
    for (let i = 0; i < 5; i++) {
      const zOff = -0.74 + i * 0.35;
      const wDie = 8.0 - i * 0.22;
      const hDie = 4.7 - i * 0.12;
      const xShift = i * 0.14;

      const fowLayer = new THREE.Mesh(
        createChamferedBoxGeo(wDie + 0.24, hDie + 0.24, 0.16, 0.22, 0.02, 'z'),
        mats.quartzOlpf
      );
      fowLayer.position.set(xShift, 0, zOff);

      const dieThin = new THREE.Mesh(
        createChamferedBoxGeo(wDie, hDie, 0.13, 0.20, 0.02, 'z'),
        u.cfeBiCS10WaferDie
      );
      dieThin.position.set(xShift, 0, zOff + 0.15);
      g.add(fowLayer, dieThin);

      // True arching gold bond wires rising off lower die edge & embedded right inside the upper FOW film!
      for (let w = -1; w <= 1; w++) {
        const wy = w * 1.25;
        const edgeX = xShift - wDie * 0.5 + 0.15;
        const arcCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(edgeX + 0.22, wy, zOff + 0.22),
          new THREE.Vector3(edgeX - 0.15, wy, zOff + 0.34),
          new THREE.Vector3(edgeX - 0.72, wy, zOff - 0.08),
        ]);
        const wire = new THREE.Mesh(
          markHiRes(new THREE.TubeGeometry(arcCurve, 10, 0.06, 6, false)),
          mats.goldPlating
        );
        wire.userData.noEdges = true;
        g.add(wire);
      }
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-fow-film-over-wire-stack',
        112,
        '#38bdf8',
        g,
        new THREE.Vector3(9.4, 15.8, -0.25),
        new THREE.Vector3(126, 66, -26),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C113. Ultra-Low-Alpha (ULA) 88 wt% Spherical Fused-Silica EMC Filler Matrix
  // =========================================================================
  {
    const g = new THREE.Group();
    const moldBase = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 5.4, 0.42, 0.34, 0.05, 'z'),
      u.icEpoxyLaser
    );
    // Stepped cutaway rim exposing the packed 88 wt% spherical silica interior + lower copper CTE-match frame!
    const cutawayRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(8.2, 5.4, 0.34, 7.2, 4.4, 0.22), 0.28, 0.04, 0.04, 1, 14),
      mats.matteBlackAnodized
    );
    cutawayRim.position.z = 0.26;
    const cteBar = new THREE.Mesh(createChamferedBoxGeo(8.0, 0.48, 0.16, 0.10, 0.02, 'z'), mats.copperHeatSpreader);
    cteBar.position.set(0, -2.55, -0.18);
    cteBar.userData.noEdges = true;
    g.add(moldBase, cutawayRim, cteBar);

    // 36 densely packed multi-diameter spherical fused-silica (SiO2) ULA microbeads across 2 depths (InstancedMesh!)
    const beadGeo = hiResSphere(0.42, 10, 8);
    const beadInst = new THREE.InstancedMesh(beadGeo, mats.quartzOlpf, 36);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 6; c++) {
        const sc = 0.66 + ((r * 7 + c * 3) % 5) * 0.11;
        dm.position.set(-2.95 + c * 1.18 + (r % 2) * 0.20, -1.62 + r * 1.08, 0.34);
        dm.scale.setScalar(sc);
        dm.updateMatrix();
        beadInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    // 12 smaller interstitial micro-silica spheres packing the gaps to hit 88 wt% loading!
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        dm.position.set(-2.1 + c * 1.4, -1.08 + r * 1.08, 0.48);
        dm.scale.setScalar(0.46);
        dm.updateMatrix();
        beadInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    beadInst.instanceMatrix.needsUpdate = true;
    beadInst.userData.noEdges = true;
    g.add(beadInst);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-ula-silica-emc-filler',
        113,
        '#64748b',
        g,
        new THREE.Vector3(10.2, 6.2, -0.74),
        new THREE.Vector3(132, 34, -42),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C114. 11N Ultra-Pure (99.999999999%) CZ Single-Crystal {100} Silicon Ingot Slice
  // =========================================================================
  {
    const g = new THREE.Group();
    const discGeo = hiResCyl(3.35, 3.35, 0.34, 36).rotateX(Math.PI / 2);
    applyPlanarUVs(discGeo, 6.7, 6.7, 'xy');
    const disc = new THREE.Mesh(discGeo, u.cfeBiCS10WaferDie);
    const bevelRing = new THREE.Mesh(hiResTorus(3.36, 0.12, 10, 36), mats.stainlessMachined);
    const notchMarker = new THREE.Mesh(createChamferedBoxGeo(0.55, 0.55, 0.42, 0.08, 0.02, 'z'), mats.goldPlating);
    notchMarker.position.set(0, -3.26, 0);

    // Subtle {100} wafer scribe-street die grid + central raised 3D diamond-cubic Si atomic unit cell!
    for (let i = -2; i <= 2; i++) {
      const hBar = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.06, 0.06), mats.vcWorkingFluidCyan);
      hBar.position.set(0, i * 0.9, 0.22);
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 4.4, 0.06), mats.vcWorkingFluidCyan);
      vBar.position.set(i * 0.9, 0, 0.22);
      hBar.userData.noEdges = true;
      vBar.userData.noEdges = true;
      g.add(hBar, vBar);
    }

    // Raised 3D Silicon {100} diamond-cubic crystal atoms (8 corner + face-center atoms) at wafer center
    const atomGeo = hiResSphere(0.18, 10, 8);
    const atomCoords: Array<[number, number, number]> = [
      [-0.75, -0.75, 0.34],
      [0.75, -0.75, 0.34],
      [-0.75, 0.75, 0.34],
      [0.75, 0.75, 0.34],
      [0, 0, 0.56],
      [-0.38, -0.38, 0.45],
      [0.38, 0.38, 0.45],
    ];
    for (const [ax, ay, az] of atomCoords) {
      const atom = new THREE.Mesh(atomGeo, az > 0.44 ? mats.goldPlating : mats.vcWorkingFluidCyan);
      atom.position.set(ax, ay, az);
      atom.userData.noEdges = true;
      g.add(atom);
    }
    g.add(disc, bevelRing, notchMarker);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-wafer-11n-cz-monocrystal',
        114,
        '#38bdf8',
        g,
        new THREE.Vector3(1.8, 12.2, -0.78),
        new THREE.Vector3(18, 122, -62),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C115. HVLP2 Ultra-Smooth Copper Foil (Rz < 2.0 μm) & Skin-Effect Silane Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    const resinBase = new THREE.Mesh(
      createChamferedBoxGeo(8.8, 4.8, 0.34, 0.28, 0.04, 'z'),
      u.cfeGlassWeaveCore
    );
    const silaneBond = new THREE.Mesh(
      createChamferedBoxGeo(8.6, 4.5, 0.14, 0.24, 0.02, 'z'),
      mats.vcWorkingFluidCyan
    );
    silaneBond.position.z = 0.24;

    // Comparative side-by-side copper foil: Left = rough standard ED teeth vs Right = mirror-smooth HVLP2 (Rz < 2 μm)!
    const roughLeft = new THREE.Mesh(createChamferedBoxGeo(3.8, 4.2, 0.26, 0.18, 0.03, 'z'), mats.copperCoil);
    roughLeft.position.set(-2.2, 0, 0.44);
    const toothGeo = hiResCyl(0.06, 0.22, 0.24, 8).rotateX(Math.PI / 2);
    for (let i = 0; i < 6; i++) {
      const tooth = new THREE.Mesh(toothGeo, mats.cinnabarAnodized);
      tooth.position.set(-3.6 + i * 0.56, -2.05, 0.32);
      tooth.userData.noEdges = true;
      g.add(tooth);
    }

    const hvlpRight = new THREE.Mesh(createChamferedBoxGeo(4.2, 4.2, 0.28, 0.22, 0.04, 'z'), mats.copperHeatSpreader);
    hvlpRight.position.set(2.0, 0, 0.46);

    // 4 gleaming top-surface 0.6 μm skin-depth current highways gliding smoothly over the mirror HVLP2 foil!
    for (let i = 0; i < 4; i++) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.38, 0.12), mats.goldPlating);
      strip.position.set(2.0, -1.35 + i * 0.9, 0.66);
      strip.userData.noEdges = true;
      g.add(strip);
    }
    g.add(resinBase, silaneBond, roughLeft, hvlpRight);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-hvlp2-copper-skin-depth',
        115,
        '#ea580c',
        g,
        new THREE.Vector3(10.8, 1.4, 0.22),
        new THREE.Vector3(134, 4, -14),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C116. Megtron 7/8 Ultra-Low-Df (<=0.002) High-Frequency Resin & T-Glass Prepreg
  // =========================================================================
  {
    const g = new THREE.Group();
    // 5-layer laminated Megtron 7/8 PCB cutaway: Bot GND -> Core -> Low-Df Hydrocarbon -> Embedded Diff Stripline -> Top Resin!
    const botGnd = new THREE.Mesh(createChamferedBoxGeo(8.8, 5.4, 0.12, 0.32, 0.02, 'z'), mats.copperHeatSpreader);
    botGnd.position.z = -0.34;
    const coreGeo = createChamferedBoxGeo(8.6, 5.2, 0.34, 0.30, 0.04, 'z');
    applyBoxUVs(coreGeo, 8.0);
    const core = new THREE.Mesh(coreGeo, u.cfeGlassWeaveCore);
    const topResin = new THREE.Mesh(createChamferedBoxGeo(8.3, 4.9, 0.14, 0.26, 0.02, 'z'), mats.cfaGreen);
    topResin.position.z = 0.26;
    g.add(botGnd, core, topResin);

    // Embedded 85-ohm gold differential stripline pair + 10 flanking coplanar shield vias!
    for (const sy of [-0.68, 0.68]) {
      const pair = new THREE.Mesh(createChamferedBoxGeo(7.8, 0.42, 0.16, 0.08, 0.02, 'z'), mats.goldPlating);
      pair.position.set(0, sy, 0.40);
      pair.userData.noEdges = true;
      g.add(pair);
    }
    const viaGeo = hiResCyl(0.18, 0.18, 0.86, 10).rotateX(Math.PI / 2);
    for (let v = 0; v < 5; v++) {
      const vx = -3.2 + v * 1.6;
      for (const vy of [-1.85, 1.85]) {
        const via = new THREE.Mesh(viaGeo, mats.goldPlating);
        via.position.set(vx, vy, 0.04);
        via.userData.noEdges = true;
        g.add(via);
      }
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-megtron7-ultralow-df-resin',
        116,
        '#10b981',
        g,
        new THREE.Vector3(10.6, -3.4, -0.18),
        new THREE.Vector3(132, -28, -24),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C117. UV-Laser Drilled 50 μm Copper-Filled Stacked Microvias (±10 μm Registration)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4-deck HDI dielectric cutaway penetrated by 4 vertical 3-tier stacked tapered UV-laser copper-filled microvias!
    for (let d = 0; d < 4; d++) {
      const deck = new THREE.Mesh(
        createChamferedBoxGeo(8.4, 5.0, 0.12, 0.26, 0.02, 'z'),
        d % 2 === 0 ? u.cfeHdiPcb : u.cfeGlassWeaveCore
      );
      deck.position.z = -0.54 + d * 0.36;
      g.add(deck);
    }
    const coneGeo = hiResCyl(0.42, 0.28, 0.34, 16).rotateX(Math.PI / 2);
    const padGeo = hiResCyl(0.58, 0.58, 0.08, 16).rotateX(Math.PI / 2);
    const regGeo = hiResTorus(0.68, 0.05, 6, 18);

    for (let i = 0; i < 4; i++) {
      const vx = -2.7 + i * 1.8;
      for (let tier = 0; tier < 3; tier++) {
        const via = new THREE.Mesh(coneGeo, mats.copperHeatSpreader);
        via.position.set(vx, 0, -0.36 + tier * 0.36);
        via.userData.noEdges = true;
        const capturePad = new THREE.Mesh(padGeo, mats.goldPlating);
        capturePad.position.set(vx, 0, -0.18 + tier * 0.36);
        capturePad.userData.noEdges = true;
        g.add(via, capturePad);
      }
      // Top ±10 μm UV-laser registration target halo
      const regHalo = new THREE.Mesh(regGeo, mats.vcWorkingFluidCyan);
      regHalo.position.set(vx, 0, 0.64);
      regHalo.userData.noEdges = true;
      g.add(regHalo);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-uv-laser-50um-microvia',
        117,
        '#eab308',
        g,
        new THREE.Vector3(9.4, -9.8, -0.12),
        new THREE.Vector3(124, -60, -18),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C118. MLCC BaTiO3 Ferroelectric Ceramic Stack & Flex-Proof Soft Termination
  // =========================================================================
  {
    const g = new THREE.Group();
    // Museum-grade cutaway of a TOUGH-grade MLCC revealing 11 interdigitated internal Ni plates + 4-layer Soft Termination!
    const ceramicBody = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 4.0, 1.05, 0.26, 0.05, 'z'),
      mats.smdCeramic
    );
    g.add(ceramicBody);

    // 11 alternating interdigitated internal Nickel electrode leaves visible cleanly across the cutaway front face!
    const plateGeo = new THREE.BoxGeometry(5.1, 0.13, 0.14);
    for (let i = 0; i < 11; i++) {
      const leftSide = i % 2 === 0;
      const plate = new THREE.Mesh(plateGeo, mats.stainlessMachined);
      plate.position.set(leftSide ? -0.46 : 0.46, -1.55 + i * 0.31, 0.56);
      plate.userData.noEdges = true;
      g.add(plate);
    }

    // Authentic 4-layer Soft Termination on BOTH ends: Cu base -> Cinnabar Ag-epoxy flex cushion -> Ni barrier -> Sn outer cap + solder fillets!
    for (const sx of [-1, 1]) {
      const cuBase = new THREE.Mesh(createChamferedBoxGeo(0.28, 4.06, 1.12, 0.08, 0.02, 'z'), mats.copperCoil);
      cuBase.position.x = sx * 3.24;
      const softResin = new THREE.Mesh(createChamferedBoxGeo(0.46, 4.14, 1.18, 0.12, 0.04, 'z'), mats.cinnabarAnodized);
      softResin.position.x = sx * 3.58;
      const niBar = new THREE.Mesh(createChamferedBoxGeo(0.22, 4.18, 1.22, 0.08, 0.02, 'z'), mats.stainlessMachined);
      niBar.position.x = sx * 3.88;
      const snCap = new THREE.Mesh(createChamferedBoxGeo(0.62, 4.24, 1.26, 0.16, 0.05, 'z'), mats.solderBallSilver);
      snCap.position.x = sx * 4.24;
      for (const m of [cuBase, softResin, niBar, snCap]) {
        m.userData.noEdges = true;
        g.add(m);
      }
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-mlcc-batio3-soft-term',
        118,
        '#d97706',
        g,
        new THREE.Vector3(8.2, -15.4, 0.62),
        new THREE.Vector3(106, -86, 14),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C119. 35°15' AT-Cut Quartz Shear-Mode Piezo Resonator & N2 Ceramic Cavity
  // =========================================================================
  {
    const g = new THREE.Group();
    const cavity = new THREE.Mesh(
      extrudeHiRes(createFrameShape(8.0, 5.2, 0.6, 6.4, 3.6, 0.35), 0.72, 0.08, 0.08, 2, 18),
      mats.matteBlackAnodized
    );
    const floor = new THREE.Mesh(createChamferedBoxGeo(7.8, 5.0, 0.22, 0.5, 0.03, 'z'), mats.titaniumRivet);
    floor.position.z = -0.32;
    const goldSeam = new THREE.Mesh(
      extrudeHiRes(createFrameShape(8.0, 5.2, 0.6, 7.1, 4.3, 0.4), 0.14, 0.03, 0.03, 1, 18),
      mats.goldPlating
    );
    goldSeam.position.z = 0.42;

    // 4 castellated corner gold termination pads on the bottom ceramic package!
    const castGeo = new THREE.BoxGeometry(1.25, 0.95, 0.26);
    for (const [cx, cy] of [
      [-3.45, -2.15],
      [3.45, -2.15],
      [-3.45, 2.15],
      [3.45, 2.15],
    ]) {
      const cast = new THREE.Mesh(castGeo, mats.goldPlating);
      cast.position.set(cx, cy, -0.34);
      cast.userData.noEdges = true;
      g.add(cast);
    }

    // Cantilevered 35°15' AT-cut translucent quartz blank + twin vapor-deposited gold electrodes + lead-out tabs!
    const quartzBlank = new THREE.Mesh(
      createChamferedBoxGeo(5.3, 2.9, 0.22, 0.22, 0.04, 'z'),
      mats.quartzOlpf
    );
    quartzBlank.position.set(0.28, 0, 0.06);
    const drivePad = new THREE.Mesh(hiResCyl(0.98, 0.98, 0.28, 24).rotateX(Math.PI / 2), mats.goldPlating);
    drivePad.position.set(0.35, 0, 0.08);
    drivePad.userData.noEdges = true;
    const leadTab1 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.34, 0.08), mats.goldPlating);
    leadTab1.position.set(-1.1, 0.65, 0.19);
    leadTab1.userData.noEdges = true;
    const leadTab2 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.34, 0.08), mats.goldPlating);
    leadTab2.position.set(-1.1, -0.65, -0.05);
    leadTab2.userData.noEdges = true;

    // Dual conductive silver-silicone shock cantilever mounts + thickness-shear oscillation indicators!
    for (const sy of [-0.82, 0.82]) {
      const mount = new THREE.Mesh(hiResCyl(0.34, 0.34, 0.44, 12).rotateX(Math.PI / 2), mats.silverElectrode);
      mount.position.set(-2.35, sy, -0.04);
      mount.userData.noEdges = true;
      g.add(mount);
    }
    const shearHalo = new THREE.Mesh(hiResTorus(1.22, 0.06, 6, 24), mats.vcWorkingFluidCyan);
    shearHalo.position.set(0.35, 0, 0.24);
    shearHalo.userData.noEdges = true;
    g.add(cavity, floor, goldSeam, quartzBlank, drivePad, leadTab1, leadTab2, shearHalo);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-atcut-quartz-shear-cavity',
        119,
        '#facc15',
        g,
        new THREE.Vector3(9.4, -12.2, 0.72),
        new THREE.Vector3(126, -42, 32),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C120. 0.2 pF Ultra-Low-Capacitance Deep-Snapback TVS ESD PNPN Micro-Junction
  // =========================================================================
  {
    const g = new THREE.Group();
    const pkg = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 4.6, 0.28, 0.3, 0.04, 'z'),
      u.icEpoxyLaser
    );
    g.add(pkg);

    // 4-zone sculpted PNPN deep-snapback silicon thyristor (P+ / N- / P / N+) + depletion junction seams + I/O flow-through pins!
    const zones: Array<[number, THREE.Material]> = [
      [-2.4, mats.cinnabarAnodized],
      [-0.8, mats.vcWorkingFluidCyan],
      [0.8, mats.copperHeatSpreader],
      [2.4, mats.siliconLogicLayer],
    ];
    for (const [zx, mat] of zones) {
      const block = new THREE.Mesh(createChamferedBoxGeo(1.38, 2.85, 0.44, 0.14, 0.03, 'z'), mat);
      block.position.set(zx, 0.18, 0.34);
      block.userData.noEdges = true;
      g.add(block);
    }
    // 3 thin golden P-N depletion junction contact seams + top surge-entry rail + bottom GND shunt bus!
    for (const jx of [-1.6, 0, 1.6]) {
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.10, 2.85, 0.48), mats.goldPlating);
      seam.position.set(jx, 0.18, 0.35);
      seam.userData.noEdges = true;
      g.add(seam);
    }
    const ioRail = new THREE.Mesh(createChamferedBoxGeo(7.4, 0.34, 0.24, 0.08, 0.02, 'z'), mats.vcWorkingFluidCyan);
    ioRail.position.set(0, 1.88, 0.34);
    ioRail.userData.noEdges = true;
    const gndShunt = new THREE.Mesh(createChamferedBoxGeo(7.4, 0.38, 0.28, 0.08, 0.02, 'z'), mats.goldPlating);
    gndShunt.position.set(0, -1.72, 0.38);
    g.add(ioRail, gndShunt);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-tvs-snapback-esd-junction',
        120,
        '#e11d48',
        g,
        new THREE.Vector3(8.8, -18.2, 0.68),
        new THREE.Vector3(112, -10, 46),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C121. PCIe Gen4/5 TX 3-Tap FFE Pre-Emphasis & Differential CML Output Driver
  // =========================================================================
  {
    const g = new THREE.Group();
    const dieGeo = createChamferedBoxGeo(9.0, 5.6, 0.3, 0.34, 0.05, 'z');
    applyPlanarUVs(dieGeo, 9.0, 5.6, 'xy');
    const die = new THREE.Mesh(dieGeo, u.cfeSerdesEyeDiagramDie);
    g.add(die);

    // 3 weighted FFE tap driver towers (Pre-cursor C-1, Main C0, Post-cursor C+1) + 3D pre-emphasized waveform + CML TX+/TX-!
    const tapHeights: Array<[number, number, THREE.Material]> = [
      [-2.4, 0.42, mats.vcWorkingFluidCyan],
      [0.0, 0.90, mats.goldPlating],
      [2.4, 0.56, mats.cinnabarAnodized],
    ];
    for (const [tx, th, mat] of tapHeights) {
      const bar = new THREE.Mesh(createChamferedBoxGeo(1.42, 1.95, th, 0.16, 0.04, 'z'), mat);
      bar.position.set(tx, 0.85, 0.16 + th * 0.5);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    // 3D pre-emphasized overshoot waveform ribbon showing high-frequency de-emphasis boost!
    const wfCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.8, -0.55, 0.34),
      new THREE.Vector3(-2.4, -0.55, 0.34),
      new THREE.Vector3(-1.5, 0.15, 0.44),
      new THREE.Vector3(-0.3, -0.15, 0.38),
      new THREE.Vector3(1.1, -0.15, 0.38),
      new THREE.Vector3(2.2, -0.78, 0.30),
      new THREE.Vector3(3.8, -0.55, 0.34),
    ]);
    const wfMesh = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(wfCurve, 26, 0.09, 6, false)),
      mats.vcWorkingFluidCyan
    );
    wfMesh.userData.noEdges = true;
    g.add(wfMesh);

    for (const dy of [-2.05, -1.45]) {
      const diffLine = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.24, 0.20), mats.goldPlating);
      diffLine.position.set(0, dy, 0.26);
      diffLine.userData.noEdges = true;
      g.add(diffLine);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-pcie-tx-ffe-3tap-driver',
        121,
        '#2563eb',
        g,
        new THREE.Vector3(2.4, -14.8, 0.64),
        new THREE.Vector3(74, -102, 26),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C122. PCIe Gen4/5 RX 2nd-Order CTLE Linear + Multi-Tap DFE Feedback Equalizer
  // =========================================================================
  {
    const g = new THREE.Group();
    const dieGeo = createChamferedBoxGeo(9.4, 5.8, 0.32, 0.36, 0.05, 'z');
    applyPlanarUVs(dieGeo, 9.4, 5.8, 'xy');
    const die = new THREE.Mesh(dieGeo, u.cfeSerdesEyeDiagramDie);
    g.add(die);

    // Sculpted 3D multi-trace open Eye-Diagram (outer gold + inner cyan safety eye + sampling crosshair!)
    const eyeOuter = new THREE.Mesh(hiResTorus(1.65, 0.14, 12, 30), mats.goldPlating);
    eyeOuter.scale.set(1.48, 0.78, 1.0);
    eyeOuter.position.set(-1.35, 0, 0.34);
    eyeOuter.userData.noEdges = true;

    const eyeInner = new THREE.Mesh(hiResTorus(1.32, 0.12, 10, 26), mats.vcWorkingFluidCyan);
    eyeInner.scale.set(1.42, 0.66, 1.0);
    eyeInner.position.set(-1.35, 0, 0.38);
    eyeInner.userData.noEdges = true;

    const crosshair = new THREE.Mesh(hiResSphere(0.30, 12, 10), mats.goldPlating);
    crosshair.position.set(-1.35, 0, 0.44);
    crosshair.userData.noEdges = true;

    const vTick = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.2, 0.12), mats.cfaGreen);
    vTick.position.set(-1.35, 0, 0.34);
    vTick.userData.noEdges = true;
    const hTick = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 0.12), mats.cfaGreen);
    hTick.position.set(-1.35, 0, 0.34);
    hTick.userData.noEdges = true;
    g.add(eyeOuter, eyeInner, crosshair, vTick, hTick);

    // 3-Tap DFE feedback slicer cascade + vertical golden feedback summation rail!
    const fbSpine = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.6, 0.18), mats.goldPlating);
    fbSpine.position.set(1.85, 0, 0.34);
    fbSpine.userData.noEdges = true;
    g.add(fbSpine);
    for (let t = 0; t < 3; t++) {
      const slicer = new THREE.Mesh(
        createChamferedBoxGeo(1.45, 0.84, 0.42, 0.12, 0.03, 'z'),
        t === 0 ? mats.siliconLogicLayer : t === 1 ? mats.cfaBlue : mats.copperHybridBond
      );
      slicer.position.set(2.95, -1.45 + t * 1.45, 0.36);
      slicer.userData.noEdges = true;
      g.add(slicer);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-pcie-rx-ctle-dfe-eq',
        122,
        '#06b6d4',
        g,
        new THREE.Vector3(-0.8, -15.6, 0.66),
        new THREE.Vector3(42, -112, 34),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C123. SerDes On-Chip Spiral LC-Tank PLL & Phase-Interpolator (PI) CDR
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(8.8, 5.6, 0.28, 0.34, 0.04, 'z'),
      u.cfeSerdesEyeDiagramDie
    );
    g.add(base);

    // Dual 4-turn thick top-metal octagonal golden LC-Tank VCO spiral inductors with center-tap & varactor cap banks!
    for (const cx of [-2.15, 2.15]) {
      for (let r = 0.48; r <= 1.56; r += 0.34) {
        const coil = new THREE.Mesh(hiResTorus(r, 0.085, 8, 8), mats.goldPlating);
        coil.position.set(cx, 0.42, 0.34);
        coil.userData.noEdges = true;
        g.add(coil);
      }
      const cTap = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.5, 0.14), mats.copperHeatSpreader);
      cTap.position.set(cx, 0.42, 0.38);
      cTap.userData.noEdges = true;
      g.add(cTap);
    }

    // Central 64-step Phase-Interpolator (PI) CDR circular clock dial with 8 phase-vector spoke ticks!
    const piDial = new THREE.Mesh(hiResCyl(0.86, 0.86, 0.34, 24).rotateX(Math.PI / 2), mats.vcWorkingFluidCyan);
    piDial.position.set(0, -1.65, 0.32);
    const piRim = new THREE.Mesh(hiResTorus(0.92, 0.08, 8, 24), mats.goldPlating);
    piRim.position.set(0, -1.65, 0.42);
    piRim.userData.noEdges = true;
    const spokeGeo = new THREE.BoxGeometry(1.55, 0.08, 0.08);
    for (let s = 0; s < 4; s++) {
      const sp = new THREE.Mesh(spokeGeo, mats.goldPlating);
      sp.position.set(0, -1.65, 0.50);
      sp.rotation.z = (s * Math.PI) / 4;
      sp.userData.noEdges = true;
      g.add(sp);
    }
    g.add(piDial, piRim);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-serdes-lctank-pll-cdr',
        123,
        '#fbbf24',
        g,
        new THREE.Vector3(-4.2, -16.2, 0.62),
        new THREE.Vector3(8, -116, 22),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C124. PCIe 128b/130b Block Encoder (98.46% Eff.) & LTSSM Equalization FSM
  // =========================================================================
  {
    const g = new THREE.Group();
    const macDie = new THREE.Mesh(
      createChamferedBoxGeo(9.0, 5.2, 0.28, 0.32, 0.04, 'z'),
      u.cfeControllerPkg
    );
    g.add(macDie);

    // 2-bit Sync Header (gold) + 128-bit Payload Block (4 cyan blocks) + 4 LTSSM state nodes connected by transition arrows!
    const syncHdr = new THREE.Mesh(createChamferedBoxGeo(0.96, 1.58, 0.42, 0.1, 0.03, 'z'), mats.goldPlating);
    syncHdr.position.set(-3.42, 0.92, 0.36);
    g.add(syncHdr);

    const arrowBar = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.18, 0.16), mats.goldPlating);
    arrowBar.position.set(0, -1.25, 0.28);
    arrowBar.userData.noEdges = true;
    g.add(arrowBar);

    for (let i = 0; i < 4; i++) {
      const payload = new THREE.Mesh(createChamferedBoxGeo(1.45, 1.58, 0.38, 0.12, 0.03, 'z'), mats.vcWorkingFluidCyan);
      payload.position.set(-1.78 + i * 1.68, 0.92, 0.34);
      payload.userData.noEdges = true;

      // LTSSM state node (Detect -> Polling -> Config/EQ -> L0 Active emerald ring!)
      const sx = -2.7 + i * 1.8;
      const stateNode = new THREE.Mesh(
        hiResCyl(0.48, 0.48, 0.34, 16).rotateX(Math.PI / 2),
        i === 3 ? mats.cfaGreen : mats.siliconLogicLayer
      );
      stateNode.position.set(sx, -1.25, 0.34);
      stateNode.userData.noEdges = true;
      const ring = new THREE.Mesh(hiResTorus(0.56, 0.07, 6, 16), i === 3 ? mats.goldPlating : mats.vcWorkingFluidCyan);
      ring.position.set(sx, -1.25, 0.42);
      ring.userData.noEdges = true;
      g.add(payload, stateNode, ring);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-pcie-ltssm-128b130b-mac',
        124,
        '#3b82f6',
        g,
        new THREE.Vector3(-7.4, -15.4, 0.64),
        new THREE.Vector3(-26, -112, 42),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C125. 6nm FinFET / 2nm GAA Nanosheet Transistor & Controller 6T SRAM Bitcell
  // =========================================================================
  {
    const g = new THREE.Group();
    const waferBase = new THREE.Mesh(
      createChamferedBoxGeo(9.0, 5.6, 0.24, 0.34, 0.04, 'z'),
      u.bionzDieFloorplan
    );
    // Shallow Trench Isolation (STI) oxide floor beneath the GAA nanosheet channels
    const stiOxide = new THREE.Mesh(createChamferedBoxGeo(8.2, 4.8, 0.12, 0.24, 0.02, 'z'), mats.ftiOxide);
    stiOxide.position.z = 0.18;
    stiOxide.userData.noEdges = true;
    g.add(waferBase, stiOxide);

    // 3×3 stacked horizontal Gate-All-Around (GAA) cyan silicon nanosheets suspended cleanly through wrapping gold metal gate!
    const sheetGeo = createChamferedBoxGeo(6.8, 0.56, 0.14, 0.08, 0.02, 'z');
    for (let f = -1; f <= 1; f++) {
      for (let tier = 0; tier < 3; tier++) {
        const sheet = new THREE.Mesh(sheetGeo, mats.vcWorkingFluidCyan);
        sheet.position.set(0, f * 1.44, 0.36 + tier * 0.24);
        sheet.userData.noEdges = true;
        g.add(sheet);
      }
      // Raised epitaxial Source/Drain SiGe landing blocks at both ends of each nanosheet stack!
      for (const ex of [-2.85, 2.85]) {
        const epi = new THREE.Mesh(createChamferedBoxGeo(1.15, 0.72, 0.72, 0.12, 0.03, 'z'), mats.siliconLogicLayer);
        epi.position.set(ex, f * 1.44, 0.58);
        epi.userData.noEdges = true;
        g.add(epi);
      }
    }

    // Wrapping High-k Metal Gate (HKMG) completely encircling all 9 GAA nanosheet channels!
    const gaaGate = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 4.5, 0.98, 0.16, 0.05, 'z'),
      mats.goldPlating
    );
    gaaGate.position.set(0, 0, 0.66);
    g.add(gaaGate);

    // 6 vertical tungsten Source/Drain contact vias + twin M0 copper local-interconnect 6T SRAM bitline rails!
    const viaGeo = hiResCyl(0.22, 0.22, 0.86, 12).rotateX(Math.PI / 2);
    for (const sx of [-2.85, 2.85]) {
      for (let r = -1; r <= 1; r++) {
        const contact = new THREE.Mesh(viaGeo, mats.stainlessMachined);
        contact.position.set(sx, r * 1.44, 0.74);
        contact.userData.noEdges = true;
        g.add(contact);
      }
      const m0Rail = new THREE.Mesh(new THREE.BoxGeometry(0.32, 4.2, 0.12), mats.copperHeatSpreader);
      m0Rail.position.set(sx, 0, 1.14);
      m0Rail.userData.noEdges = true;
      g.add(m0Rail);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-6nm-finfet-6t-sram-cell',
        125,
        '#7c3aed',
        g,
        new THREE.Vector3(-8.4, -10.8, 0.58),
        new THREE.Vector3(-58, -104, 18),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C126. 2026 CGLLR Graded Soft-Decision LDPC & Log-Likelihood Ratio (LLR) Decoder
  // =========================================================================
  {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      createChamferedBoxGeo(9.0, 5.6, 0.28, 0.34, 0.04, 'z'),
      u.cfeControllerPkg
    );
    g.add(base);

    // 5 Variable Nodes (cyan) + 4 Check Nodes (gold) + 12 Tanner-graph message tubes + bottom 7-step 25 mV LLR quantizer!
    const vPos: number[] = [];
    for (let i = 0; i < 5; i++) {
      const nx = -3.2 + i * 1.6;
      vPos.push(nx);
      const vNode = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.36, 18).rotateX(Math.PI / 2), mats.vcWorkingFluidCyan);
      vNode.position.set(nx, 1.65, 0.34);
      vNode.userData.noEdges = true;
      g.add(vNode);
    }
    for (let j = 0; j < 4; j++) {
      const cx = -2.4 + j * 1.6;
      const cNode = new THREE.Mesh(createChamferedBoxGeo(0.86, 0.86, 0.40, 0.12, 0.03, 'z'), mats.goldPlating);
      cNode.position.set(cx, -0.55, 0.36);
      cNode.userData.noEdges = true;
      g.add(cNode);

      // True angled Tanner-graph belief-propagation message tubes connecting check node to adjacent variable nodes!
      for (const targetX of [vPos[j], vPos[j + 1]]) {
        const edgeCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(cx, -0.55, 0.28),
          new THREE.Vector3((cx + targetX) * 0.5, 0.55, 0.36),
          new THREE.Vector3(targetX, 1.65, 0.28),
        ]);
        const edge = new THREE.Mesh(
          markHiRes(new THREE.TubeGeometry(edgeCurve, 10, 0.075, 6, false)),
          mats.cfaGreen
        );
        edge.userData.noEdges = true;
        g.add(edge);
      }
    }

    // Bottom 7-step 25 mV Graded CGLLR soft-decision quantizer staircase!
    for (let s = 0; s < 7; s++) {
      const qh = 0.24 + Math.abs(s - 3) * 0.14;
      const qBar = new THREE.Mesh(
        createChamferedBoxGeo(0.88, 0.62, qh, 0.08, 0.02, 'z'),
        s === 3 ? mats.cinnabarAnodized : mats.goldPlating
      );
      qBar.position.set(-3.15 + s * 1.05, -2.02, 0.14 + qh * 0.5);
      qBar.userData.noEdges = true;
      g.add(qBar);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-ldpc-soft-llr-cgllr',
        126,
        '#10b981',
        g,
        new THREE.Vector3(3.2, -10.8, -0.58),
        new THREE.Vector3(56, -106, -46),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C127. End-to-End (E2E) Data-Path Protection: T10 DIF CRC-32C & SRAM ECC Shield
  // =========================================================================
  {
    const g = new THREE.Group();
    const frame = new THREE.Mesh(
      createChamferedBoxGeo(9.0, 5.2, 0.28, 0.32, 0.04, 'z'),
      u.cfePqcSecurityDie
    );
    g.add(frame);

    // Dual parallel 4KB Data Bus (cyan) + 8-Byte T10 DIF Metadata Guard Bus (gold) passing through 4 hexagonal checkpoint shields!
    const dataBus = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.42, 0.22), mats.vcWorkingFluidCyan);
    dataBus.position.set(0, 0.42, 0.26);
    dataBus.userData.noEdges = true;
    const difBus = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.28, 0.22), mats.goldPlating);
    difBus.position.set(0, -0.45, 0.26);
    difBus.userData.noEdges = true;
    g.add(dataBus, difBus);

    const outerHex = hiResCyl(0.80, 0.80, 0.38, 6).rotateX(Math.PI / 2);
    const innerHex = hiResCyl(0.46, 0.46, 0.48, 6).rotateX(Math.PI / 2);
    const shieldMats = [mats.vcWorkingFluidCyan, mats.goldPlating, mats.cinnabarAnodized, mats.cfaGreen];
    for (let i = 0; i < 4; i++) {
      const gx = -2.85 + i * 1.9;
      const outer = new THREE.Mesh(outerHex, mats.titaniumRivet);
      outer.position.set(gx, 0.05, 0.34);
      outer.userData.noEdges = true;
      const core = new THREE.Mesh(innerHex, shieldMats[i]);
      core.position.set(gx, 0.05, 0.38);
      core.userData.noEdges = true;
      g.add(outer, core);
    }

    // Bottom CRC-32C hardware polynomial checker strip
    const crcStrip = new THREE.Mesh(createChamferedBoxGeo(6.8, 0.56, 0.22, 0.10, 0.02, 'z'), mats.copperHeatSpreader);
    crcStrip.position.set(0, -1.78, 0.26);
    crcStrip.userData.noEdges = true;
    g.add(crcStrip);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-nvme-e2e-crc32c-dif',
        127,
        '#14b8a6',
        g,
        new THREE.Vector3(-9.6, -7.2, 0.56),
        new THREE.Vector3(-92, -88, 22),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C128. 2026 NVMe Flexible Data Placement (FDP: TP4146) Reclaim Units (WAF ~1.03)
  // =========================================================================
  {
    const g = new THREE.Group();
    const chassis = new THREE.Mesh(
      createChamferedBoxGeo(9.0, 5.6, 0.28, 0.32, 0.04, 'z'),
      u.cfeHdiPcb
    );
    g.add(chassis);

    // Upper Host Placement-ID (PID) router header dispatching 4 segregated data streams into 4 isolated Reclaim Unit (RU) vaults!
    const pidRouter = new THREE.Mesh(createChamferedBoxGeo(8.0, 0.62, 0.34, 0.14, 0.03, 'z'), mats.titaniumRivet);
    pidRouter.position.set(0, 2.02, 0.32);
    g.add(pidRouter);

    const ruMats: THREE.Material[] = [
      mats.cinnabarAnodized,
      mats.goldPlating,
      mats.vcWorkingFluidCyan,
      mats.cfaGreen,
    ];
    for (let i = 0; i < 4; i++) {
      const rx = -3.0 + i * 2.0;
      const chute = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.62, 0.22), ruMats[i]);
      chute.position.set(rx, 1.48, 0.34);
      chute.userData.noEdges = true;

      const vault = new THREE.Mesh(createChamferedBoxGeo(1.56, 3.15, 0.46, 0.16, 0.04, 'z'), ruMats[i]);
      vault.position.set(rx, -0.45, 0.38);
      vault.userData.noEdges = true;

      // Internal wear-isolated block stripe lines inside each RU vault
      for (const sy of [-0.95, 0, 0.95]) {
        const line = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.14, 0.08), mats.matteBlackAnodized);
        line.position.set(rx, -0.45 + sy, 0.63);
        line.userData.noEdges = true;
        g.add(line);
      }
      g.add(chute, vault);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-nvme-fdp-reclaim-units',
        128,
        '#f97316',
        g,
        new THREE.Vector3(-10.4, -2.4, 0.54),
        new THREE.Vector3(-116, -60, 14),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C129. Multi-Channel Die Interleaving & Superblock / Superpage Striping Matrix
  // =========================================================================
  {
    const g = new THREE.Group();
    const board = new THREE.Mesh(
      createChamferedBoxGeo(9.2, 5.6, 0.26, 0.32, 0.04, 'z'),
      u.cfeBiCS10WaferDie
    );
    g.add(board);

    // 4×4 interleaved die-bank cubes (4 channels × 4 ways) + vertical channel buses + horizontal golden Superpage stripes + right XOR parity column!
    const cubeGeo = createChamferedBoxGeo(1.32, 0.82, 0.34, 0.10, 0.03, 'z');
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const cx = -3.15 + c * 1.72;
        const cy = -1.68 + r * 1.12;
        const dieCell = new THREE.Mesh(
          cubeGeo,
          (r + c) % 2 === 0 ? mats.vcWorkingFluidCyan : mats.siliconLogicLayer
        );
        dieCell.position.set(cx, cy, 0.30);
        dieCell.userData.noEdges = true;
        g.add(dieCell);
      }
    }
    // 4 vertical copper NAND-channel rails beneath the 4 columns
    for (let c = 0; c < 4; c++) {
      const chRail = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.4, 0.12), mats.copperCoil);
      chRail.position.set(-3.15 + c * 1.72, 0, 0.18);
      chRail.userData.noEdges = true;
      g.add(chRail);
    }
    // Right-hand emerald XOR Superblock parity column
    const parityCol = new THREE.Mesh(createChamferedBoxGeo(0.92, 4.2, 0.38, 0.12, 0.03, 'z'), mats.cfaGreen);
    parityCol.position.set(3.55, 0, 0.34);
    parityCol.userData.noEdges = true;
    g.add(parityCol);

    // Dual glowing horizontal Superpage striping bars uniting all 4 channels + parity!
    for (const sy of [-0.56, 1.68]) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.22, 0.20), mats.goldPlating);
      stripe.position.set(0.18, sy, 0.56);
      stripe.userData.noEdges = true;
      g.add(stripe);
    }

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-superblock-interleave-mux',
        129,
        '#0ea5e9',
        g,
        new THREE.Vector3(-10.8, 3.2, 0.48),
        new THREE.Vector3(-124, -22, 6),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C130. 1064 nm MOPA Fiber-Laser Non-Ablative Oxide Annealing & PVD Armor Grain
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stainless steel backplate nano-cutaway -> PVD crystal coat -> 5 glossy 100 nm Cr2O3 interference bars (zero gouge!) -> 1064 nm MOPA beam + optical head!
    const susBase = new THREE.Mesh(
      createChamferedBoxGeo(8.8, 5.2, 0.34, 0.32, 0.05, 'z'),
      mats.stainlessMachined
    );
    const pvdCoat = new THREE.Mesh(
      createChamferedBoxGeo(8.4, 4.8, 0.14, 0.28, 0.02, 'z'),
      mats.titaniumRivet
    );
    pvdCoat.position.z = 0.24;

    // 5 glossy dark annealed Cr2O3 / Fe3O4 nano-oxide interference bars + subtle thin-film iridescence edge strips!
    for (let i = 0; i < 5; i++) {
      const oy = -1.5 + i * 0.75;
      const oxBar = new THREE.Mesh(
        createChamferedBoxGeo(6.8, 0.42, 0.14, 0.08, 0.02, 'z'),
        mats.matteBlackAnodized
      );
      oxBar.position.set(0, oy, 0.38);
      oxBar.userData.noEdges = true;
      const sheen = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.10, 0.06), mats.nanoArIridescent);
      sheen.position.set(0, oy, 0.47);
      sheen.userData.noEdges = true;
      g.add(oxBar, sheen);
    }

    // Miniature 1064 nm MOPA focused optical beam cone + thermal annealing glow halo + focusing lens nozzle!
    const beam = new THREE.Mesh(hiResCyl(0.08, 0.56, 0.96, 16).rotateX(Math.PI / 2), mats.goldPlating);
    beam.position.set(2.35, 1.5, 0.92);
    beam.userData.noEdges = true;
    const annealHalo = new THREE.Mesh(hiResTorus(0.46, 0.07, 8, 20), mats.cinnabarAnodized);
    annealHalo.position.set(2.35, 1.5, 0.46);
    annealHalo.userData.noEdges = true;
    const nozzle = new THREE.Mesh(hiResCyl(0.68, 0.58, 0.24, 18).rotateX(Math.PI / 2), mats.titaniumRivet);
    nozzle.position.set(2.35, 1.5, 1.44);
    nozzle.userData.noEdges = true;

    g.add(susBase, pvdCoat, beam, annealHalo, nozzle);

    parts.push(
      finalizeCfexpressUltra29Part(
        'cfe-mopa-laser-oxide-pvd-coat',
        130,
        '#64748b',
        g,
        new THREE.Vector3(6.4, 9.2, -1.68),
        new THREE.Vector3(84, 72, -96),
        cp,
        0.18
      )
    );
  }

  return parts;
}
