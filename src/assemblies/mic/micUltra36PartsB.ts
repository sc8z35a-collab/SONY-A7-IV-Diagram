import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createFrameShape } from '../../engine/CadHelpers';
import {
  applyPlanarUVs,
  buildChipPackage,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { finalizeMicUltra36Part, makeTexturedHorizRect36 } from './micUltra36Parts';

/**
 * Phase 36 Part B — MC131–MC150 (+20 ultra-HD sculpted 3D CAD sub-assemblies):
 *  - GROUP 3 (MC131–MC140): SY-1122 Mainboard Audio AFE, Anti-Microphonic Passives, Power Tree & C7701 EMI Shield
 *  - GROUP 4 (MC141–MC150): Sony ECM-M1, XLR-K3M / XLR-A4, ECM-W3, HDMI ACR, USB-C UAC 2.0, XAVC DMA & Shutter Sync
 */
export function buildMicUltra36PartsB(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // GROUP 3 (MC131–MC140): SY-1122 AUDIO AFE, POWER TREE, EMI CAN & PASSIVES
  // =========================================================================

  // MC131. Anti-Microphonic C0G/NP0 & Soft-Termination Metal-Bracket AC-Coupling Capacitor Pair
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect36(4.2, 3.0, 0.24, 0.20, u.micAudioMainPcb, 0.04);
    g.add(pcb);

    // Pair of L/R differential C0G/NP0 anti-microphonic capacitors suspended on J-lead metal vibration brackets
    for (const zPos of [-0.66, 0.66]) {
      const capBody = new THREE.Mesh(createChamferedBoxGeo(1.75, 0.72, 0.78, 0.08), mats.ceramicAlumina);
      capBody.position.set(0, 0.68, zPos);
      // Soft-termination flexible silver-epoxy + Ni/Sn end-caps + spring metal lead brackets lifting body off PCB
      for (const sx of [-0.94, 0.94]) {
        const endCap = new THREE.Mesh(createChamferedBoxGeo(0.24, 0.76, 0.82, 0.04), mats.solderBallSilver);
        endCap.position.set(sx, 0.68, zPos);
        const leg = new THREE.Mesh(createChamferedBoxGeo(0.14, 0.44, 0.74, 0.02), mats.stainlessMachined);
        leg.position.set(sx * 1.12, 0.34, zPos);
        const foot = new THREE.Mesh(createChamferedBoxGeo(0.38, 0.10, 0.74, 0.02), mats.goldPlating);
        foot.position.set(sx * 1.16, 0.16, zPos);
        g.add(endCap, leg, foot);
      }
      g.add(capBody);
    }

    // Gold differential shield guard trace running between L and R input lines
    const guard = new THREE.Mesh(createChamferedBoxGeo(3.6, 0.06, 0.14, 0.01), mats.goldPlating);
    guard.position.set(0, 0.16, 0);
    g.add(guard);

    parts.push(
      finalizeMicUltra36Part(
        'mc-c0g-antimicrophonic-coupling-cap',
        131,
        '#d4a373',
        g,
        new THREE.Vector3(-8.2, -5.8, 3.4),
        new THREE.Vector3(-48.0, -64.0, 28.0),
        cp
      )
    );
  }

  // MC132. Ultra-Low-Current-Noise Susumu RG ±0.05% / ±5ppm/°C Thin-Film NiCr Matched Preamp Gain Array
  {
    const g = new THREE.Group();
    const basePcb = makeTexturedHorizRect36(4.2, 3.2, 0.24, 0.20, u.micStarGroundPcb, 0.04);
    g.add(basePcb);

    // 4 precision laser-trimmed NiCr thin-film RG1608 matched resistors arranged in thermal-tracking quad
    for (let i = 0; i < 4; i++) {
      const rx = i % 2 === 0 ? -0.98 : 0.98;
      const rz = i < 2 ? -0.68 : 0.68;
      const resBody = makeTexturedHorizRect36(1.48, 0.86, 0.34, 0.06, u.mc36ThinFilmResistorArray, 0.03);
      resBody.position.set(rx, 0.28, rz);
      for (const tx of [-0.74, 0.74]) {
        const term = new THREE.Mesh(createChamferedBoxGeo(0.24, 0.38, 0.88, 0.03), mats.solderBallSilver);
        term.position.set(rx + tx, 0.30, rz);
        g.add(term);
      }
      g.add(resBody);
    }

    // Central isothermal copper tie-bridge keeping all 4 resistors at identical temperature (zero CMRR drift!)
    const isoBar = new THREE.Mesh(createChamferedBoxGeo(0.42, 0.12, 2.25, 0.03), mats.copperHeatSpreader);
    isoBar.position.set(0, 0.22, 0);
    g.add(isoBar);

    parts.push(
      finalizeMicUltra36Part(
        'mc-thinfilm-005pct-gain-network',
        132,
        '#0ea5e9',
        g,
        new THREE.Vector3(-4.2, -5.8, 3.4),
        new THREE.Vector3(-24.0, -64.0, 28.0),
        cp
      )
    );
  }

  // MC133. AK4954A / AK4951 Inverting Charge-Pump Negative Rail (-AVDD) & 2.2uF Flying Cap (Capless HP Amp)
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect36(4.1, 3.2, 0.24, 0.20, u.micAudioMainPcb, 0.04);
    g.add(pcb);

    // Inverting Class-G Charge-Pump / Capless Headphone Driver IC block
    const cpIc = buildChipPackage({ w: 1.58, d: 1.58, h: 0.36, style: 'qfn', pinsPerSide: 6, bodyMat: u.micCodecQfnPackage, leadMat: mats.goldPlating });
    cpIc.position.set(-0.85, 0.34, 0);

    // 2.2uF CFLY flying ceramic capacitor + 2.2uF VEE negative reservoir cap (twin 0603 MLCC towers)
    const cFly = buildSmdPassive(1.12, 0.54, 0.62, mats.smdCeramic, mats.solderBallSilver);
    cFly.position.set(0.95, 0.44, -0.58);
    const cVee = buildSmdPassive(1.12, 0.54, 0.62, mats.tantalumCapYellow, mats.solderBallSilver);
    cVee.position.set(0.95, 0.44, 0.58);

    // Dual-rail +1.8V / -1.8V bus bars showing ground-centered 0V DC swing
    const posRail = new THREE.Mesh(createChamferedBoxGeo(0.20, 0.08, 2.3, 0.02), mats.bodyRecRed);
    posRail.position.set(1.78, 0.18, 0);
    const negRail = new THREE.Mesh(createChamferedBoxGeo(0.20, 0.08, 2.3, 0.02), mats.mountShimBlue);
    negRail.position.set(-1.82, 0.18, 0);
    g.add(cpIc, cFly, cVee, posRail, negRail);

    parts.push(
      finalizeMicUltra36Part(
        'mc-capless-hp-chargepump-rail',
        133,
        '#3b82f6',
        g,
        new THREE.Vector3(0.0, -5.8, 3.4),
        new THREE.Vector3(0.0, -64.0, 28.0),
        cp
      )
    );
  }

  // MC134. Ultra-Low-Noise VREF / VCOM 1.25V Bandgap Voltage Reference Buffer & 10uF Bypass Bank
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect36(4.0, 3.2, 0.24, 0.20, u.micStarGroundPcb, 0.04);
    g.add(pcb);

    // Precision bandgap VREF/VCOM buffer IC + Kelvin sense gold guard ring around VCOM node
    const vrefIc = buildChipPackage({ w: 1.38, d: 1.38, h: 0.34, style: 'qfn', pinsPerSide: 5, bodyMat: u.micMemsAsicDie, leadMat: mats.goldPlating });
    vrefIc.position.set(-0.92, 0.32, 0);
    const guardRing = new THREE.Mesh(hiResTorus(1.12, 0.06, 10, 28), mats.goldPlating);
    guardRing.rotation.x = Math.PI / 2;
    guardRing.position.set(-0.92, 0.20, 0);

    // Low-ESR 10uF conductive polymer tantalum bulk reference bypass + 0.1uF C0G HF shunt
    const cap10u = buildSmdPassive(1.32, 0.64, 0.86, mats.tantalumCapYellow, mats.solderBallSilver);
    cap10u.position.set(0.92, 0.48, -0.45);
    const cap01u = buildSmdPassive(0.68, 0.34, 0.42, mats.ceramicAlumina, mats.solderBallSilver);
    cap01u.position.set(0.92, 0.34, 0.68);
    g.add(vrefIc, guardRing, cap10u, cap01u);

    parts.push(
      finalizeMicUltra36Part(
        'mc-vcom-vref-bandgap-bypass',
        134,
        '#eab308',
        g,
        new THREE.Vector3(4.2, -5.8, 3.4),
        new THREE.Vector3(24.0, -64.0, 28.0),
        cp
      )
    );
  }

  // MC135. 4-Domain Audio Power-Rail Isolation Tree (AVDD / DVDD / CPVDD / MICBIAS Ferrite Pi Bridges)
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect36(4.3, 3.3, 0.24, 0.20, u.micAudioMainPcb, 0.04);
    g.add(pcb);

    // 4 parallel isolated power lanes: AVDD, DVDD, CPVDD, MICBIAS each with ferrite bead + polymer tank cap
    const laneMats = [mats.bodyRecRed, mats.mountShimBlue, mats.tantalumCapYellow, u.micGreenJackCollar];
    for (let i = 0; i < 4; i++) {
      const zPos = -1.12 + i * 0.74;
      const laneTrace = new THREE.Mesh(createChamferedBoxGeo(3.75, 0.06, 0.18, 0.01), laneMats[i]);
      laneTrace.position.set(0, 0.17, zPos);
      const fb = buildSmdPassive(0.64, 0.36, 0.36, mats.ferriteInductor, mats.solderBallSilver);
      fb.position.set(-0.78, 0.34, zPos);
      const bulk = buildSmdPassive(0.86, 0.44, 0.44, mats.tantalumCapYellow, mats.solderBallSilver);
      bulk.position.set(0.74, 0.38, zPos);
      g.add(laneTrace, fb, bulk);
    }

    // Milled copper isolation slot separating DVDD from AVDD
    const divider = new THREE.Mesh(createChamferedBoxGeo(3.9, 0.30, 0.10, 0.02), mats.matteBlackAnodized);
    divider.position.set(0, 0.16, -0.37);
    g.add(divider);

    parts.push(
      finalizeMicUltra36Part(
        'mc-avdd-dvdd-ferrite-powertree',
        135,
        '#8b5cf6',
        g,
        new THREE.Vector3(8.2, -5.8, 3.4),
        new THREE.Vector3(48.0, -64.0, 28.0),
        cp
      )
    );
  }

  // MC136. Mainboard SY-1122 Audio-Island Two-Piece C7701 Nickel-Silver Snap-On EMI Shield Can
  {
    const g = new THREE.Group();
    // Soldered lower C7701 perimeter fence frame (0.2mm CuNi18Zn20)
    const fenceShape = createFrameShape(4.1, 3.3, 0.18, 3.5, 2.7, 0.12);
    const fenceGeo = extrudeHiRes(fenceShape, 0.62, 0.03, 0.03, 2, 16);
    fenceGeo.rotateX(-Math.PI / 2);
    const fence = new THREE.Mesh(fenceGeo, mats.emiShieldCan);
    fence.position.y = -0.32;

    // Removable snap-on C7701 upper lid hovering slightly raised so internal codec island is visible!
    const lidTop = makeTexturedHorizRect36(4.22, 3.42, 0.24, 0.20, u.mc36C7701EmiShieldCan, 0.04);
    lidTop.position.y = 0.56;

    // Internal codec silicon silhouette visible inside the two-piece frame
    const innerIc = buildChipPackage({ w: 1.5, d: 1.5, h: 0.28, style: 'qfn', pinsPerSide: 5, bodyMat: u.micCodecQfnPackage, leadMat: mats.goldPlating });
    innerIc.position.set(0, -0.14, 0);

    // 8 perimeter locking spring dimples on lid skirt
    for (let i = 0; i < 4; i++) {
      const px = -1.35 + i * 0.90;
      for (const sz of [-1.66, 1.66]) {
        const dimple = new THREE.Mesh(hiResSphere(0.11, 10, 8), mats.mountStainlessFlange);
        dimple.position.set(px, 0.44, sz);
        g.add(dimple);
      }
    }
    g.add(fence, lidTop, innerIc);

    parts.push(
      finalizeMicUltra36Part(
        'mc-c7701-audio-emi-shield-can',
        136,
        '#cbd5e1',
        g,
        new THREE.Vector3(-8.2, -5.8, -3.6),
        new THREE.Vector3(-48.0, -66.0, -28.0),
        cp
      )
    );
  }

  // MC137. I2S / TDM8 Serial Audio Bus 33-Ohm Source-Series Damping Resistor Array (MCLK/BCLK/LRCLK/SDOUT)
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect36(4.3, 3.0, 0.24, 0.20, u.micAudioMainPcb, 0.04);
    g.add(pcb);

    // 4 length-matched I2S/TDM lines (MCLK 24.576MHz, BCLK, LRCLK, SDOUT) with 4x 33-ohm 0402 damping resistors
    for (let i = 0; i < 4; i++) {
      const zPos = -0.96 + i * 0.64;
      const trace = new THREE.Mesh(createChamferedBoxGeo(3.85, 0.06, 0.14, 0.01), mats.goldPlating);
      trace.position.set(0, 0.16, zPos);
      const r33 = buildSmdPassive(0.76, 0.30, 0.34, mats.matteBlackAnodized, mats.solderBallSilver);
      r33.position.set(-0.42, 0.30, zPos);
      // Coplanar ground guard trace between clock lines
      const gnd = new THREE.Mesh(createChamferedBoxGeo(3.85, 0.05, 0.07, 0.01), mats.copperHeatSpreader);
      gnd.position.set(0, 0.15, zPos + 0.32);
      g.add(trace, r33, gnd);
    }

    // Source driver QFN pad bar on left
    const drv = new THREE.Mesh(createChamferedBoxGeo(0.68, 0.34, 2.48, 0.05), u.micCodecQfnPackage);
    drv.position.set(-1.58, 0.32, 0);
    g.add(drv);

    parts.push(
      finalizeMicUltra36Part(
        'mc-i2s-33ohm-series-termination',
        137,
        '#14b8a6',
        g,
        new THREE.Vector3(-4.2, -5.8, -3.6),
        new THREE.Vector3(-24.0, -66.0, -28.0),
        cp
      )
    );
  }

  // MC138. 3.5 mm External Mic Jack Murata DLW21 Wirewound Common-Mode RF Choke (120–180 Ohm @ 100 MHz)
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect36(4.0, 3.0, 0.24, 0.18, u.micAudioMainPcb, 0.04);
    g.add(pcb);

    // Pair of Murata DLW21HN121SQ2L (2.0 x 1.2 mm scaled) bifilar wirewound ferrite common-mode chokes
    for (const zPos of [-0.66, 0.66]) {
      const core = new THREE.Mesh(createChamferedBoxGeo(1.75, 0.72, 0.86, 0.08), mats.ferriteInductor);
      core.position.set(0, 0.56, zPos);
      // Exposed bifilar enameled copper twin windings wrapped tightly around ferrite drum core
      for (let w = 0; w < 6; w++) {
        const turn = new THREE.Mesh(hiResTorus(0.42, 0.06, 8, 18), mats.copperCoil);
        turn.rotation.y = Math.PI / 2;
        turn.position.set(-0.55 + w * 0.22, 0.56, zPos);
        g.add(turn);
      }
      // 4 silver solder wrap-around electrodes per DLW21 choke
      for (const sx of [-0.88, 0.88]) {
        for (const sz of [-0.28, 0.28]) {
          const pad = new THREE.Mesh(createChamferedBoxGeo(0.24, 0.24, 0.26, 0.03), mats.solderBallSilver);
          pad.position.set(sx, 0.26, zPos + sz);
          g.add(pad);
        }
      }
      g.add(core);
    }

    parts.push(
      finalizeMicUltra36Part(
        'mc-dlw21-jack-cm-choke',
        138,
        '#ea580c',
        g,
        new THREE.Vector3(0.0, -5.8, -3.6),
        new THREE.Vector3(0.0, -66.0, -28.0),
        cp
      )
    );
  }

  // MC139. Hardware 0 / -10 / -20 dB U-Pad Attenuator & 2.2 kΩ Mic / 47 kΩ Line Low-Ron CMOS Switch Matrix
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect36(4.2, 3.2, 0.24, 0.20, u.micAudioMainPcb, 0.04);
    g.add(pcb);

    // Ultra-low-Ron (1.8 Ohm) TMUX-class CMOS analog switch IC
    const swIc = buildChipPackage({ w: 1.38, d: 1.38, h: 0.34, style: 'qfn', pinsPerSide: 5, bodyMat: u.micCodecQfnPackage, leadMat: mats.goldPlating });
    swIc.position.set(-0.92, 0.32, 0);

    // Precision U-pad resistor ladder (0 / -10 / -20 dB) + 2.2k/47k impedance selector network
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 2; c++) {
        const res = buildSmdPassive(0.68, 0.24, 0.30, u.mc36ThinFilmResistorArray, mats.solderBallSilver);
        res.position.set(0.55 + c * 0.92, 0.28, -0.82 + r * 0.82);
        g.add(res);
      }
    }

    // Gold differential input/output header bus
    const bus = new THREE.Mesh(createChamferedBoxGeo(0.18, 0.08, 2.55, 0.02), mats.goldPlating);
    bus.position.set(-1.85, 0.18, 0);
    g.add(swIc, bus);

    parts.push(
      finalizeMicUltra36Part(
        'mc-mic-line-attenuator-cmos-mux',
        139,
        '#f43f5e',
        g,
        new THREE.Vector3(4.2, -5.8, -3.6),
        new THREE.Vector3(24.0, -66.0, -28.0),
        cp
      )
    );
  }

  // MC140. 0.5 dB-Step Digital-Controlled Analog Resistor-Ladder Volume & Class-G Headphone Stage
  {
    const g = new THREE.Group();
    const pcb = makeTexturedHorizRect36(4.2, 3.2, 0.24, 0.20, u.micStarGroundPcb, 0.04);
    g.add(pcb);

    // Zero-crossing R-2R logarithmic stepped attenuator ladder (12 precision gold-tapped rungs)
    const rungGeo = createChamferedBoxGeo(0.16, 0.16, 1.48, 0.02);
    const rungs = new THREE.InstancedMesh(rungGeo, mats.goldPlating, 10);
    const d140 = new THREE.Object3D();
    for (let i = 0; i < 10; i++) {
      d140.position.set(-1.62 + i * 0.24, 0.28, 0);
      d140.scale.set(1, 0.7 + i * 0.12, 1);
      d140.updateMatrix();
      rungs.setMatrixAt(i, d140.matrix);
    }
    rungs.instanceMatrix.needsUpdate = true;

    // Class-G adaptive-rail headphone output driver die on right
    const hpAmp = buildChipPackage({ w: 1.28, d: 1.85, h: 0.36, style: 'qfn', pinsPerSide: 6, bodyMat: u.micCodecQfnPackage, leadMat: mats.goldPlating });
    hpAmp.position.set(1.18, 0.34, 0);
    g.add(rungs, hpAmp);

    parts.push(
      finalizeMicUltra36Part(
        'mc-05db-r2r-volume-headphone-stage',
        140,
        '#22c55e',
        g,
        new THREE.Vector3(8.2, -5.8, -3.6),
        new THREE.Vector3(48.0, -66.0, -28.0),
        cp
      )
    );
  }

  // =========================================================================
  // GROUP 4 (MC141–MC150): PRO ECOSYSTEM — ECM-M1, XLR-K3M/A4, ECM-W3, HDMI/UAC/XAVC
  // =========================================================================

  // MC141. Sony ECM-M1 4-Capsule Back-Electret Diamond Array & Waveguide Interference Tube
  {
    const g = new THREE.Group();
    const chassis = makeTexturedHorizRect36(4.1, 3.6, 0.34, 0.30, u.micOemHolderResin, 0.06);
    g.add(chassis);

    // 4-capsule precision diamond geometry (Front, Rear, Left, Right) enabling all 8 polar patterns!
    const diamondOffsets: [number, number][] = [
      [0, 1.05],
      [0, -1.05],
      [-1.12, 0],
      [1.12, 0],
    ];
    for (const [cx, cz] of diamondOffsets) {
      const can = new THREE.Mesh(hiResCyl(0.54, 0.54, 0.62, 24), u.micEcmSpunAluminum);
      can.position.set(cx, 0.48, cz);
      const cloth = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.08, 22), u.mc36EcmAcousticCloth);
      cloth.position.set(cx, 0.80, cz);
      const trim = new THREE.Mesh(hiResTorus(0.52, 0.05, 8, 22), mats.goldPlating);
      trim.rotation.x = Math.PI / 2;
      trim.position.set(cx, 0.80, cz);
      g.add(can, cloth, trim);
    }

    // Diamond beamforming phase-delay interconnect waveguides
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const strut = new THREE.Mesh(createChamferedBoxGeo(1.35, 0.14, 0.16, 0.02), mats.copperHeatSpreader);
      strut.position.set(Math.cos(a) * 0.56, 0.32, Math.sin(a) * 0.56);
      strut.rotation.y = -a + Math.PI / 2;
      g.add(strut);
    }

    // Center DSP summing core
    const dsp = buildChipPackage({ w: 0.88, d: 0.88, h: 0.24, style: 'qfn', pinsPerSide: 4, bodyMat: u.micAudioDsp32Float, leadMat: mats.goldPlating });
    dsp.position.set(0, 0.32, 0);
    g.add(dsp);

    parts.push(
      finalizeMicUltra36Part(
        'mc-ecmm1-4cap-diamond-array',
        141,
        '#38bdf8',
        g,
        new THREE.Vector3(-8.0, 5.2, 4.2),
        new THREE.Vector3(-48.0, 64.0, 32.0),
        cp
      )
    );
  }

  // MC142. Sony ECM-M1 Lockable 8-Mode Rotary Directivity Dial + ATT / NC·LC / DIG·ANA Switch Bank
  {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(createChamferedBoxGeo(4.2, 0.56, 3.2, 0.14), u.micOemHolderResin);
    g.add(housing);

    // Circular knurled 8-mode rotary directivity dial + center safety LOCK push-button
    const dialGeo = hiResCyl(1.18, 1.24, 0.42, 36);
    applyPlanarUVs(dialGeo, 2.48, 2.48, 'xz');
    const dial = new THREE.Mesh(dialGeo, u.mc36EcmM1ControlDial);
    dial.position.set(-0.78, 0.48, 0);
    const lockBtn = new THREE.Mesh(hiResCyl(0.38, 0.38, 0.54, 22), mats.mountStainlessFlange);
    lockBtn.position.set(-0.78, 0.54, 0);

    // 3 weather-sealed tactile slide switches on right: ATT (0/10/20dB), FILTER (NC/LC/OFF), DIGITAL/ANALOG
    for (let i = 0; i < 3; i++) {
      const sz = -0.84 + i * 0.84;
      const track = new THREE.Mesh(createChamferedBoxGeo(1.18, 0.16, 0.46, 0.04), mats.matteBlackAnodized);
      track.position.set(1.16, 0.32, sz);
      const slider = new THREE.Mesh(createChamferedBoxGeo(0.42, 0.30, 0.38, 0.04), i === 0 ? mats.bodyRecRed : mats.mountStainlessFlange);
      slider.position.set(1.16 + (i - 1) * 0.24, 0.44, sz);
      g.add(track, slider);
    }
    g.add(dial, lockBtn);

    parts.push(
      finalizeMicUltra36Part(
        'mc-ecmm1-8mode-dial-switches',
        142,
        '#f43f5e',
        g,
        new THREE.Vector3(-4.0, 5.2, 4.2),
        new THREE.Vector3(-24.0, 64.0, 32.0),
        cp
      )
    );
  }

  // MC143. Sony ECM-M1 / ECM-B1M Internal Dual-Axis Silicone Shock-Mount Suspension Stalk
  {
    const g = new THREE.Group();
    // Lower MI-Shoe clamp foot
    const lowerFoot = new THREE.Mesh(createChamferedBoxGeo(3.4, 0.36, 3.0, 0.10), mats.mountStainlessFlange);
    lowerFoot.position.y = -0.78;

    // Upper floating capsule-head carrier platform
    const upperDeck = new THREE.Mesh(createChamferedBoxGeo(3.6, 0.34, 3.2, 0.12), u.micOemHolderResin);
    upperDeck.position.y = 0.78;

    // 4 angled Shore-35A silicone elastomer shock-suspension bellows struts isolating X/Y/Z handling shock
    for (const [sx, sz] of [
      [-1.08, -0.92],
      [1.08, -0.92],
      [-1.08, 0.92],
      [1.08, 0.92],
    ]) {
      const strut = new THREE.Mesh(hiResCyl(0.24, 0.32, 1.38, 16), mats.antiVibRubber);
      strut.position.set(sx, 0, sz);
      strut.rotation.set(sz > 0 ? -0.18 : 0.18, 0, sx > 0 ? 0.18 : -0.18);
      const collar = new THREE.Mesh(hiResTorus(0.30, 0.07, 10, 18), mats.damperElastomer);
      collar.rotation.x = Math.PI / 2;
      collar.position.set(sx, 0, sz);
      g.add(strut, collar);
    }

    // Slack S-curved copper-polyimide micro-flex bridge passing signals with zero stiffness transfer
    const slackFlex = new THREE.Mesh(hiResTorus(0.62, 0.08, 10, 24, Math.PI * 1.25), mats.polyimideFpc);
    slackFlex.position.set(0, 0, 0);
    g.add(lowerFoot, upperDeck, slackFlex);

    parts.push(
      finalizeMicUltra36Part(
        'mc-ecmm1-shock-suspension-cradle',
        143,
        '#475569',
        g,
        new THREE.Vector3(0.0, 5.2, 1.5),
        new THREE.Vector3(0.0, 64.0, 32.0),
        cp
      )
    );
  }

  // MC144. Sony XLR-K3M / XLR-A4 IEC 61938 +48V Boost & 0.1% Matched 6.81kΩ Phantom Pair + Locking XLR Jack
  {
    const g = new THREE.Group();
    const panel = makeTexturedHorizRect36(4.2, 3.4, 0.28, 0.20, u.mc36XlrA4AudioPanel, 0.04);
    g.add(panel);

    // Neutrik-style 3-pin locking female XLR / TRS combo jack barrel + red spring push-latch
    const xlrRing = new THREE.Mesh(hiResCyl(0.92, 0.92, 0.88, 28), mats.matteBlackAnodized);
    xlrRing.position.set(-0.98, 0.58, 0);
    const xlrBezel = new THREE.Mesh(hiResTorus(0.92, 0.10, 12, 28), mats.mountStainlessFlange);
    xlrBezel.rotation.x = Math.PI / 2;
    xlrBezel.position.set(-0.98, 1.02, 0);
    const latch = new THREE.Mesh(createChamferedBoxGeo(0.46, 0.26, 0.34, 0.04), mats.bodyRecRed);
    latch.position.set(-0.98, 0.96, 1.05);

    // 3 gold balanced XLR contact sockets (Pin 1 GND, Pin 2 HOT +48V, Pin 3 COLD +48V)
    for (const [px, pz] of [
      [-1.32, -0.22],
      [-0.64, -0.22],
      [-0.98, 0.36],
    ]) {
      const sock = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.65, 14), mats.goldPlating);
      sock.position.set(px, 0.72, pz);
      g.add(sock);
    }

    // Isolated +48V DC-DC flyback boost inductor + matched 6.81kΩ ±0.1% IEC 61938 resistor pair + 63V blocking caps
    const boostCoil = new THREE.Mesh(createChamferedBoxGeo(0.98, 0.68, 0.98, 0.08), mats.ferriteInductor);
    boostCoil.position.set(1.12, 0.52, -0.78);
    for (const rz of [0.22, 0.88]) {
      const r681 = makeTexturedHorizRect36(1.22, 0.44, 0.26, 0.04, u.mc36ThinFilmResistorArray, 0.02);
      r681.position.set(1.12, 0.26, rz);
      g.add(r681);
    }
    g.add(xlrRing, xlrBezel, latch, boostCoil);

    parts.push(
      finalizeMicUltra36Part(
        'mc-xlrk3m-phantom48v-681k-pair',
        144,
        '#f59e0b',
        g,
        new THREE.Vector3(4.0, 5.2, 4.2),
        new THREE.Vector3(24.0, 64.0, 32.0),
        cp
      )
    );
  }

  // MC145. Sony XLR-A4 (2026) 4-Channel 32-Bit Float / 96 kHz Dual-ADC Digital MI-Shoe Adapter
  {
    const g = new THREE.Group();
    const deck = makeTexturedHorizRect36(4.3, 3.4, 0.34, 0.22, u.mc36XlrA4AudioPanel, 0.05);
    g.add(deck);

    // Dual-ADC (Low-Gain + High-Gain) 32-bit float / 96 kHz converter pair
    const adcHi = buildChipPackage({ w: 1.22, d: 1.22, h: 0.34, style: 'qfn', pinsPerSide: 5, bodyMat: u.micAudioDsp32Float, leadMat: mats.goldPlating });
    adcHi.position.set(-1.12, 0.40, -0.58);
    const adcLo = buildChipPackage({ w: 1.22, d: 1.22, h: 0.34, style: 'qfn', pinsPerSide: 5, bodyMat: u.micAudioDsp32Float, leadMat: mats.goldPlating });
    adcLo.position.set(1.12, 0.40, -0.58);

    // 4 precision knurled aluminum channel gain mixer pots across front edge
    for (let i = 0; i < 4; i++) {
      const knob = new THREE.Mesh(hiResCyl(0.32, 0.36, 0.56, 22), mats.lensBarrelAnodized);
      knob.position.set(-1.35 + i * 0.90, 0.54, 0.98);
      const cap = new THREE.Mesh(hiResCyl(0.26, 0.26, 0.06, 20), mats.mountStainlessFlange);
      cap.position.set(-1.35 + i * 0.90, 0.84, 0.98);
      g.add(knob, cap);
    }

    // Shielded USB-C direct audio output receptacle on rear side
    const usbc = new THREE.Mesh(createChamferedBoxGeo(0.95, 0.34, 0.58, 0.08), mats.mountStainlessFlange);
    usbc.position.set(0, 0.42, -1.52);
    g.add(adcHi, adcLo, usbc);

    parts.push(
      finalizeMicUltra36Part(
        'mc-xlra4-2026-32bit-96k-bridge',
        145,
        '#0284c7',
        g,
        new THREE.Vector3(8.0, 5.2, 4.2),
        new THREE.Vector3(48.0, 64.0, 32.0),
        cp
      )
    );
  }

  // MC146. Sony ECM-W3 Bluetooth 5.3 LC3plus Digital Wireless RF Module, Ceramic Chip Antenna & SAW Filter
  {
    const g = new THREE.Group();
    const rfBoard = makeTexturedHorizRect36(4.2, 3.2, 0.24, 0.20, u.micUwbRfModule, 0.04);
    g.add(rfBoard);

    // 2.4 GHz Bluetooth 5.3 LC3plus SoC RF shield + multilayer ceramic chip antenna + SAW bandpass filter
    const socCan = new THREE.Mesh(createChamferedBoxGeo(1.65, 0.44, 1.65, 0.06), u.mc36C7701EmiShieldCan);
    socCan.position.set(-0.92, 0.38, 0);

    // High-Q multilayer ceramic 2.4 GHz chip antenna with gold feed stub on RF keep-out edge
    const chipAnt = new THREE.Mesh(createChamferedBoxGeo(0.48, 0.38, 1.85, 0.05), mats.ceramicAlumina);
    chipAnt.position.set(1.56, 0.36, 0);
    const antFeed = new THREE.Mesh(createChamferedBoxGeo(0.54, 0.08, 0.16, 0.01), mats.goldPlating);
    antFeed.position.set(1.02, 0.18, 0);

    // 2.4 GHz SAW bandpass filter + antenna diversity SPDT switch
    const saw = buildChipPackage({ w: 0.76, d: 0.62, h: 0.24, style: 'qfn', pinsPerSide: 3, bodyMat: mats.matteBlackAnodized, leadMat: mats.goldPlating });
    saw.position.set(0.46, 0.28, -0.58);
    const sw = buildChipPackage({ w: 0.68, d: 0.68, h: 0.22, style: 'qfn', pinsPerSide: 3, bodyMat: u.micCodecQfnPackage, leadMat: mats.goldPlating });
    sw.position.set(0.46, 0.26, 0.58);
    g.add(socCan, chipAnt, antFeed, saw, sw);

    parts.push(
      finalizeMicUltra36Part(
        'mc-ecmw3-bt53-lc3plus-rf',
        146,
        '#6366f1',
        g,
        new THREE.Vector3(-8.0, 5.2, -5.2),
        new THREE.Vector3(-48.0, 64.0, -32.0),
        cp
      )
    );
  }

  // MC147. HDMI Type-A 4-Channel 24-Bit/48 kHz LPCM Packetizer & ACR (N = 6144 / CTS) Clock Regeneration Engine
  {
    const g = new THREE.Group();
    const deck = makeTexturedHorizRect36(4.2, 3.2, 0.26, 0.20, u.mc36HdmiUacSyncDeck, 0.04);
    g.add(deck);

    // Full-size HDMI Type-A stainless-steel trapezoidal receptacle shell with 19 gold contact pins
    const hdmiShell = new THREE.Mesh(createChamferedBoxGeo(1.75, 0.64, 1.18, 0.06), mats.mountStainlessFlange);
    hdmiShell.position.set(-0.98, 0.48, 0);
    const hdmiBore = new THREE.Mesh(createChamferedBoxGeo(1.48, 0.36, 0.88, 0.04), mats.matteBlackAnodized);
    hdmiBore.position.set(-1.14, 0.48, 0);
    const tongue = new THREE.Mesh(createChamferedBoxGeo(1.22, 0.10, 0.72, 0.02), mats.goldPlating);
    tongue.position.set(-1.05, 0.48, 0);

    // ACR N=6144 / CTS 20-bit fractional clock recovery & Data-Island packetizer ASIC
    const acrIc = buildChipPackage({ w: 1.52, d: 1.52, h: 0.34, style: 'qfn', pinsPerSide: 6, bodyMat: u.micCodecQfnPackage, leadMat: mats.goldPlating });
    acrIc.position.set(0.95, 0.34, 0);
    g.add(hdmiShell, hdmiBore, tongue, acrIc);

    parts.push(
      finalizeMicUltra36Part(
        'mc-hdmi-acr-n6144-lpcm-tx',
        147,
        '#0ea5e9',
        g,
        new THREE.Vector3(-4.0, 5.2, -5.2),
        new THREE.Vector3(-24.0, 64.0, -32.0),
        cp
      )
    );
  }

  // MC148. USB-C UAC 2.0 Asynchronous Isochronous Audio Bridge & Explicit Feedback Rate-Matcher
  {
    const g = new THREE.Group();
    const deck = makeTexturedHorizRect36(4.2, 3.2, 0.26, 0.20, u.mc36HdmiUacSyncDeck, 0.04);
    g.add(deck);

    // Reversible 24-pin USB Type-C stainless shell + mid-plate tongue
    const usbShell = new THREE.Mesh(createChamferedBoxGeo(1.48, 0.54, 1.12, 0.16), mats.mountStainlessFlange);
    usbShell.position.set(-1.12, 0.44, 0);
    const usbInner = new THREE.Mesh(createChamferedBoxGeo(1.24, 0.30, 0.84, 0.10), mats.matteBlackAnodized);
    usbInner.position.set(-1.26, 0.44, 0);
    const usbTongue = new THREE.Mesh(createChamferedBoxGeo(1.08, 0.08, 0.64, 0.02), mats.goldPlating);
    usbTongue.position.set(-1.18, 0.44, 0);

    // UAC 2.0 Asynchronous Isochronous PHY + local 24.576 MHz explicit feedback quartz crystal
    const uacIc = buildChipPackage({ w: 1.38, d: 1.38, h: 0.34, style: 'qfn', pinsPerSide: 5, bodyMat: u.micAudioDsp32Float, leadMat: mats.goldPlating });
    uacIc.position.set(0.68, 0.34, -0.35);
    const xtal = new THREE.Mesh(createChamferedBoxGeo(0.86, 0.26, 0.62, 0.04), u.micQuartzTcxoLid);
    xtal.position.set(0.92, 0.30, 0.92);
    g.add(usbShell, usbInner, usbTongue, uacIc, xtal);

    parts.push(
      finalizeMicUltra36Part(
        'mc-uac2-usb-c-async-bridge',
        148,
        '#10b981',
        g,
        new THREE.Vector3(0.0, 5.2, -5.2),
        new THREE.Vector3(0.0, 64.0, -32.0),
        cp
      )
    );
  }

  // MC149. XAVC-S / XAVC-HS Hardware Audio Encoder (LPCM 4ch / AAC-LC) & Zero-Drop DMA Ring-Buffer
  {
    const g = new THREE.Group();
    const base = makeTexturedHorizRect36(4.2, 3.4, 0.26, 0.20, u.mc36HdmiUacSyncDeck, 0.04);
    g.add(base);

    // Ping-pong circular DMA ring-buffer memory torus (8 segmented SDRAM audio frame blocks)
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const seg = new THREE.Mesh(
        hiResTorus(1.16, 0.18, 10, 12, Math.PI * 0.20),
        i % 2 === 0 ? mats.goldPlating : mats.mountShimBlue
      );
      seg.rotation.x = Math.PI / 2;
      seg.rotation.z = a;
      seg.position.y = 0.46;
      g.add(seg);
    }

    // Center XAVC hardware LPCM/AAC muxer core die
    const muxCore = buildChipPackage({ w: 1.18, d: 1.18, h: 0.38, style: 'qfn', pinsPerSide: 4, bodyMat: u.micAiNpuDie, leadMat: mats.goldPlating });
    muxCore.position.set(0, 0.38, 0);
    g.add(muxCore);

    parts.push(
      finalizeMicUltra36Part(
        'mc-xavc-audio-dma-ringbuffer',
        149,
        '#f59e0b',
        g,
        new THREE.Vector3(4.0, 5.2, -5.2),
        new THREE.Vector3(24.0, 64.0, -32.0),
        cp
      )
    );
  }

  // MC150. Mechanical Shutter-Curtain & Aperture-Blade Trigger-Synced Impulsive Click Gate & Neural Inpainter
  {
    const g = new THREE.Group();
    const deck = makeTexturedHorizRect36(4.2, 3.4, 0.26, 0.20, u.mc36HdmiUacSyncDeck, 0.04);
    g.add(deck);

    // Mini focal-plane shutter curtain sync trigger reference blade (AFE-3360 hardware strobe link)
    const bladeA = new THREE.Mesh(createChamferedBoxGeo(1.38, 0.10, 1.95, 0.02), mats.carbonFiberBlade);
    bladeA.position.set(-1.12, 0.42, 0);
    const syncBar = new THREE.Mesh(createChamferedBoxGeo(0.75, 0.08, 0.18, 0.02), mats.bodyRecRed);
    syncBar.position.set(-0.08, 0.42, 0);

    // Neural transient-inpainting NPU tile + 6 interpolated spectral audio bars
    const npu = buildChipPackage({ w: 1.32, d: 1.32, h: 0.36, style: 'qfn', pinsPerSide: 5, bodyMat: u.micAiNpuDie, leadMat: mats.goldPlating });
    npu.position.set(0.95, 0.36, -0.32);
    for (let i = 0; i < 6; i++) {
      const hBar = 0.24 + Math.abs(Math.sin(i * 0.9)) * 0.54;
      const bar = new THREE.Mesh(createChamferedBoxGeo(0.18, hBar, 0.22, 0.02), i === 2 || i === 3 ? mats.bodyRecRed : u.micGreenJackCollar);
      bar.position.set(0.32 + i * 0.26, 0.22 + hBar * 0.5, 0.96);
      g.add(bar);
    }
    g.add(bladeA, syncBar, npu);

    parts.push(
      finalizeMicUltra36Part(
        'mc-shutter-click-transient-inpainter',
        150,
        '#ec4899',
        g,
        new THREE.Vector3(8.0, 5.2, -5.2),
        new THREE.Vector3(48.0, 64.0, -32.0),
        cp
      )
    );
  }

  return parts;
}
