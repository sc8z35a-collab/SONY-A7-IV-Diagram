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
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildPhillipsScrew,
  buildShieldedInductor,
  buildSmdPassive,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';
import { LCD_CENTER_X, LCD_CENTER_Y, LCD_HEIGHT, LCD_WIDTH } from './lcdParts';

function finalizeLcdTechPart(
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
    subsystem: 'lcd',
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
 * Phase 34 Part 2 + Phase 36 Ultra-HD Overhaul:
 * Build 29 Standalone-Only Rear 4-Axis LCD Monitor Electronics,
 * Power/Signal Integrity, 4-Axis Hinge Tribology/Drainage/Tally & 2026 Frontier Display Parts (D82–D110).
 */
export function buildLcdUltraTechParts(
  mats: MaterialLibrary
): { parts: CadPart[]; monitorParts: CadPart[] } {
  const parts: CadPart[] = [];
  const monitorParts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;
  const hx = LCD_CENTER_X + LCD_WIDTH * 0.5 + 1.8;

  const cellW = LCD_WIDTH - 4.4;
  const cellH = LCD_HEIGHT - 4.4;
  const blW = LCD_WIDTH - 5.2;
  const blH = LCD_HEIGHT - 5.2;

  const pushPart = (p: CadPart, attachedToMonitor: boolean) => {
    parts.push(p);
    if (attachedToMonitor) monitorParts.push(p);
  };

  // =========================================================================
  // GROUP E: In-Monitor Power Electronics, Signal Integrity, DDIC Silicon & Coax (D82–D91)
  // =========================================================================

  // D82: Side-View LED Bar High-Thermal Aluminum MCPCB, Current-Balancing Resistors & NTC Thermistor
  {
    const g = new THREE.Group();
    const alGeo = createChamferedBoxGeo(blW - 3.0, 2.4, 0.55, 0.25, 0.05, 'z');
    applyBoxUVs(alGeo, 14);
    g.add(new THREE.Mesh(alGeo, u.lcdBrushedSus304Blu));

    const maskGeo = createChamferedBoxGeo(blW - 3.4, 2.15, 0.16, 0.2, 0.02, 'z');
    applyPlanarUVs(maskGeo, blW - 3.4, 2.15, 'xy-back');
    const whiteMask = new THREE.Mesh(maskGeo, u.lcdSideLedMcpcb);
    whiteMask.position.z = -0.34;
    g.add(whiteMask);

    for (let i = 0; i < 10; i++) {
      const lx = -27.0 + i * 6.0;
      const led = new THREE.Mesh(createChamferedBoxGeo(2.6, 1.15, 0.72, 0.15, 0.04, 'z'), mats.evfOledActive);
      led.position.set(lx, 0.2, -0.58);
      const balR = buildSmdPassive(1.2, 0.65, 0.42, mats.matteBlackAnodized, mats.solderBallSilver, 'z');
      balR.position.set(lx + 2.8, -0.45, -0.52);
      g.add(led, balR);
    }

    const ntc = buildSmdPassive(1.8, 1.0, 0.65, mats.cinnabarAnodized, mats.goldPlating, 'z');
    ntc.position.set(0, -0.55, -0.58);
    // Anode / cathode gold solder landing pads at strip ends
    for (const sx of [-1, 1]) {
      const term = new THREE.Mesh(createChamferedBoxGeo(1.8, 1.4, 0.22, 0.1, 0.02, 'z'), mats.goldPlating);
      term.position.set(sx * (blW * 0.5 - 2.6), 0, -0.46);
      g.add(term);
    }
    g.add(ntc);

    pushPart(
      finalizeLcdTechPart(
        'lcd-led-mcpcb-ntc',
        82,
        '#f59e0b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y - 22.8, -32.45),
        new THREE.Vector3(34, -64, -22),
        cp,
        0.26
      ),
      true
    );
  }

  // D83: 28V LED Boost Converter Power Stage (TPS61165-class 40V MOSFET, Schottky Diode & 200 mV R_set Shunt)
  {
    const g = new THREE.Group();
    const subGeo = createChamferedBoxGeo(16.0, 10.4, 0.62, 0.6, 0.06, 'z');
    applyPlanarUVs(subGeo, 16.0, 10.4, 'xy-back');
    g.add(new THREE.Mesh(subGeo, u.lcdPcbPd1072HiRes));

    const boostIc = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.95,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    boostIc.position.set(-4.2, 1.2, -0.78);
    g.add(boostIc);

    const ind = buildShieldedInductor(4.2, 1.85, mats.ferriteInductor, mats.solderBallSilver, mats.sinteredSilver, 'z');
    ind.position.set(1.2, 1.6, -1.18);
    g.add(ind);

    const schottky = buildSmdPassive(3.6, 1.8, 1.15, mats.icEpoxy, mats.solderBallSilver, 'z', mats.sinteredSilver);
    schottky.position.set(5.2, -2.4, -0.88);
    const rset = buildSmdPassive(2.8, 1.5, 0.68, mats.copperHeatSpreader, mats.goldPlating, 'z');
    rset.position.set(-4.0, -2.8, -0.68);
    g.add(schottky, rset);

    for (let i = 0; i < 2; i++) {
      const mlcc = buildSmdPassive(2.2, 1.2, 0.92, mats.smdCeramic, mats.solderBallSilver, 'z');
      mlcc.position.set(0.4 + i * 2.8, -2.8, -0.76);
      g.add(mlcc);
    }
    for (let i = 0; i < 4; i++) {
      const tp = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.14, 12).rotateX(Math.PI / 2), mats.goldPlating);
      tp.position.set(-6.0 + i * 4.0, 4.1, -0.36);
      tp.userData.noEdges = true;
      g.add(tp);
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-boost-schottky-rset',
        83,
        '#ea580c',
        g,
        new THREE.Vector3(LCD_CENTER_X - 12.0, LCD_CENTER_Y - 10.0, -31.65),
        new THREE.Vector3(-78, -56, -28),
        cp,
        0.26
      ),
      true
    );
  }

  // D84: TFT Multi-Rail Bias PMIC (AVDD +10V / VNEG -7V / VGH +18V / VGL -9V) & Flying Charge-Pump MLCCs
  {
    const g = new THREE.Group();
    const boardGeo = createChamferedBoxGeo(17.5, 11.2, 0.62, 0.6, 0.06, 'z');
    applyPlanarUVs(boardGeo, 17.5, 11.2, 'xy-back');
    g.add(new THREE.Mesh(boardGeo, u.lcdPcbPd1072HiRes));

    const pmic = buildChipPackage({
      w: 5.4,
      d: 5.4,
      h: 0.95,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    pmic.position.set(-2.2, 0.4, -0.78);
    g.add(pmic);

    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(2.1, 1.15, 0.85, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(3.4 + (i % 2) * 3.0, 2.6 - Math.floor(i / 2) * 3.6, -0.74);
      g.add(cap);
    }

    const tant = buildTantalumCap(3.4, 2.0, 1.25, mats.tantalumCapYellow, mats.cinnabarAnodized, mats.solderBallSilver, 'z');
    tant.position.set(-6.4, -3.2, -0.92);
    const avddInd = buildShieldedInductor(2.8, 1.15, mats.ferriteInductor, mats.solderBallSilver, mats.sinteredSilver, 'z');
    avddInd.position.set(-6.4, 2.4, -0.88);
    g.add(tant, avddInd);

    pushPart(
      finalizeLcdTechPart(
        'lcd-tft-bias-pmic',
        84,
        '#10b981',
        g,
        new THREE.Vector3(LCD_CENTER_X - 22.0, LCD_CENTER_Y + 4.0, -31.65),
        new THREE.Vector3(-92, -36, -12),
        cp,
        0.26
      ),
      true
    );
  }

  // D85: Programmable Digital VCOM Calibrator DAC & Flicker-Cancellation Reference Buffer
  {
    const g = new THREE.Group();
    const carrier = createChamferedBoxGeo(11.6, 8.2, 0.55, 0.5, 0.05, 'z');
    applyPlanarUVs(carrier, 11.6, 8.2, 'xy-back');
    g.add(new THREE.Mesh(carrier, u.lcdPcbPd1072HiRes));

    const vcomIc = buildChipPackage({
      w: 3.6,
      d: 3.0,
      h: 0.82,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    vcomIc.position.set(-2.2, 0.4, -0.70);
    g.add(vcomIc);

    const buf = buildChipPackage({
      w: 2.8,
      d: 1.8,
      h: 0.92,
      style: 'sot23',
      pinsPerSide: 3,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      axis: 'z',
    });
    buf.position.set(2.8, 0.8, -0.72);
    g.add(buf);

    for (let i = 0; i < 3; i++) {
      const r = buildSmdPassive(1.6, 0.8, 0.48, mats.varistorRingBlue, mats.solderBallSilver, 'z');
      r.position.set(-2.8 + i * 2.8, -2.4, -0.52);
      g.add(r);
    }
    const vcomPad = new THREE.Mesh(hiResCyl(0.62, 0.62, 0.14, 14).rotateX(Math.PI / 2), mats.goldPlating);
    vcomPad.position.set(4.4, -2.4, -0.34);
    g.add(vcomPad);

    pushPart(
      finalizeLcdTechPart(
        'lcd-vcom-calibrator-dac',
        85,
        '#06b6d4',
        g,
        new THREE.Vector3(LCD_CENTER_X + 8.0, LCD_CENTER_Y - 12.0, -31.65),
        new THREE.Vector3(-46, -64, -18),
        cp,
        0.26
      ),
      true
    );
  }

  // D86: Factory Individual 10-Bit Gamma LUT & D65 White-Point Calibration EEPROM/OTP IC
  {
    const g = new THREE.Group();
    const board = createChamferedBoxGeo(11.4, 8.0, 0.55, 0.5, 0.05, 'z');
    applyPlanarUVs(board, 11.4, 8.0, 'xy-back');
    g.add(new THREE.Mesh(board, u.lcdPcbPd1072HiRes));

    const eeprom = buildChipPackage({
      w: 4.8,
      d: 3.8,
      h: 1.15,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.solderBallSilver,
      axis: 'z',
    });
    eeprom.position.set(-0.6, 0.4, -0.82);
    g.add(eeprom);

    for (let i = 0; i < 5; i++) {
      const pad = new THREE.Mesh(hiResCyl(0.58, 0.58, 0.16, 14).rotateX(Math.PI / 2), mats.goldPlating);
      pad.position.set(-3.6 + i * 1.8, -2.8, -0.34);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    const pullUp = buildSmdPassive(1.3, 0.7, 0.45, mats.smdCeramic, mats.solderBallSilver, 'z');
    pullUp.position.set(3.8, 1.4, -0.48);
    g.add(pullUp);

    pushPart(
      finalizeLcdTechPart(
        'lcd-gamma-lut-eeprom',
        86,
        '#8b5cf6',
        g,
        new THREE.Vector3(LCD_CENTER_X + 18.0, LCD_CENTER_Y - 12.0, -31.65),
        new THREE.Vector3(-16, -66, -12),
        cp,
        0.26
      ),
      true
    );
  }

  // D87: MIPI-DSI 90-Ohm Differential Common-Mode Choke Filter Array (Murata DLM0NS / TDK TCM06U)
  {
    const g = new THREE.Group();
    const pcb = createChamferedBoxGeo(16.8, 7.6, 0.52, 0.4, 0.05, 'z');
    applyPlanarUVs(pcb, 16.8, 7.6, 'xy-back');
    g.add(new THREE.Mesh(pcb, u.lcdPcbPd1072HiRes));

    for (let i = 0; i < 5; i++) {
      const cx = -6.0 + i * 3.0;
      const cmcBody = new THREE.Mesh(createChamferedBoxGeo(1.9, 2.4, 0.95, 0.2, 0.06, 'z'), mats.ferriteInductor);
      cmcBody.position.set(cx, 0, -0.74);
      const coilBand = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.14), mats.copperCoil);
      coilBand.position.set(cx, 0, -1.24);
      coilBand.userData.noEdges = true;
      g.add(cmcBody, coilBand);

      for (const sx of [-0.55, 0.55]) {
        for (const sy of [-1.25, 1.25]) {
          const term = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.52), mats.goldPlating);
          term.position.set(cx + sx, sy, -0.52);
          term.userData.noEdges = true;
          g.add(term);
        }
        // Matched differential microstrip trace entry/exit stub
        const trace = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.6, 0.08), mats.goldPlating);
        trace.position.set(cx + sx, -2.75, -0.28);
        trace.userData.noEdges = true;
        g.add(trace);
      }
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-mipi-cmc-choke',
        87,
        '#0284c7',
        g,
        new THREE.Vector3(LCD_CENTER_X + 22.0, LCD_CENTER_Y + 2.0, -31.65),
        new THREE.Vector3(66, -60, -14),
        cp,
        0.26
      ),
      true
    );
  }

  // D88: COG Display Driver IC (T-CON / DDIC) Internal Silicon Functional Floorplan
  {
    const g = new THREE.Group();
    const dieGeo = createChamferedBoxGeo(28.0, 5.8, 0.56, 0.25, 0.06, 'z');
    applyPlanarUVs(dieGeo, 28.0, 5.8, 'xy-back');
    g.add(new THREE.Mesh(dieGeo, u.lcdDdicSiliconDie));

    for (let i = 0; i < 28; i++) {
      const bx = -12.8 + i * 0.95;
      const topBump = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.58, 0.28), mats.goldPlating);
      topBump.position.set(bx, 2.38, 0.36);
      topBump.userData.noEdges = true;
      g.add(topBump);
      if (i % 2 === 0) {
        const botBump = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.58, 0.28), mats.goldPlating);
        botBump.position.set(bx, -2.38, 0.36);
        botBump.userData.noEdges = true;
        g.add(botBump);
      }
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-ddic-silicon-arch',
        88,
        '#3b82f6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y - 21.8, -33.70),
        new THREE.Vector3(-46, -62, -48),
        cp,
        0.26
      ),
      true
    );
  }

  // D89: AWG44-46 Micro-Coaxial 4-Layer Cutaway & I-PEX CABLINE-CX II Multi-Point Ground Bar
  {
    const g = new THREE.Group();
    const plugGeo = createChamferedBoxGeo(14.5, 4.0, 1.35, 0.35, 0.08, 'z');
    applyBoxUVs(plugGeo, 10);
    const plugShell = new THREE.Mesh(plugGeo, u.lcdBrushedSus304Blu);
    plugShell.position.set(0, 7.6, 0);
    const lockBar = new THREE.Mesh(createChamferedBoxGeo(15.2, 1.1, 0.52, 0.2, 0.04, 'z'), mats.mountStainlessFlange);
    lockBar.position.set(0, 9.6, -0.45);
    const gndBar = new THREE.Mesh(createChamferedBoxGeo(13.8, 1.3, 0.55, 0.15, 0.04, 'z'), mats.goldPlating);
    gndBar.position.set(0, 5.2, -0.35);
    const emiTape = new THREE.Mesh(createChamferedBoxGeo(12.8, 2.6, 1.42, 0.2, 0.05, 'z'), u.lcdNiCuConductiveFoam);
    emiTape.position.set(0, -6.2, 0);
    g.add(plugShell, lockBar, gndBar, emiTape);

    for (let i = 0; i < 6; i++) {
      const sx = -5.0 + i * 2.0;
      const jacket = new THREE.Mesh(hiResCyl(0.56, 0.56, 7.2, 16), mats.matteBlackAnodized);
      jacket.position.set(sx, -5.6, 0);
      const shield = new THREE.Mesh(hiResCyl(0.44, 0.44, 4.4, 16), mats.coaxShieldCopper);
      shield.position.set(sx, 0.1, 0);
      const pfa = new THREE.Mesh(hiResCyl(0.30, 0.30, 3.2, 14), mats.lcdDiffuserMatte);
      pfa.position.set(sx, 3.4, 0);
      const core = new THREE.Mesh(hiResCyl(0.14, 0.14, 2.8, 12), mats.sinteredSilver);
      core.position.set(sx, 5.8, 0);
      g.add(jacket, shield, pfa, core);
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-micro-coax-4layer',
        89,
        '#d97706',
        g,
        new THREE.Vector3(hx, LCD_CENTER_Y, -30.40),
        new THREE.Vector3(108, -14, -18),
        cp,
        0.26
      ),
      false
    );
  }

  // D90: Panel-Side +-15 kV ESD TVS Diode Array & Ferrite-Bead Power Pi-Filter Network
  {
    const g = new THREE.Group();
    const board = createChamferedBoxGeo(13.5, 7.6, 0.52, 0.4, 0.05, 'z');
    applyPlanarUVs(board, 13.5, 7.6, 'xy-back');
    g.add(new THREE.Mesh(board, u.lcdPcbPd1072HiRes));

    for (const sx of [-3.4, 0.8]) {
      const tvs = buildChipPackage({
        w: 3.0,
        d: 1.6,
        h: 0.65,
        style: 'dfn',
        pinsPerSide: 5,
        bodyMat: u.lcdAudioDisplayChipDie,
        leadMat: mats.goldPlating,
        axis: 'z',
      });
      tvs.position.set(sx, 1.2, -0.62);
      g.add(tvs);
    }

    const fb = buildSmdPassive(2.2, 1.2, 0.95, mats.ferriteInductor, mats.solderBallSilver, 'z');
    fb.position.set(4.4, 0.4, -0.75);
    const c1 = buildSmdPassive(1.6, 0.9, 0.72, mats.smdCeramic, mats.solderBallSilver, 'z');
    c1.position.set(-3.4, -2.0, -0.64);
    const c2 = buildSmdPassive(1.6, 0.9, 0.72, mats.smdCeramic, mats.solderBallSilver, 'z');
    c2.position.set(0.8, -2.0, -0.64);
    const c3 = buildSmdPassive(1.6, 0.9, 0.72, mats.tantalumCapYellow, mats.solderBallSilver, 'z');
    c3.position.set(4.4, -2.0, -0.64);
    g.add(fb, c1, c2, c3);

    pushPart(
      finalizeLcdTechPart(
        'lcd-esd-tvs-pi-filter',
        90,
        '#ef4444',
        g,
        new THREE.Vector3(LCD_CENTER_X - 6.0, LCD_CENTER_Y - 16.0, -31.65),
        new THREE.Vector3(-82, -62, 4),
        cp,
        0.26
      ),
      true
    );
  }

  // D91: >20 kHz Flicker-Free Hybrid DC/PWM & Content-Adaptive Backlight Control (CABC) Dimmer IC
  {
    const g = new THREE.Group();
    const board = createChamferedBoxGeo(13.2, 8.6, 0.55, 0.5, 0.05, 'z');
    applyPlanarUVs(board, 13.2, 8.6, 'xy-back');
    g.add(new THREE.Mesh(board, u.lcdPcbPd1072HiRes));

    const cabc = buildChipPackage({
      w: 4.4,
      d: 4.4,
      h: 0.85,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    cabc.position.set(-1.6, 0.2, -0.72);
    g.add(cabc);

    for (let i = 0; i < 3; i++) {
      const p = buildSmdPassive(1.7, 0.95, 0.62, i === 1 ? mats.tantalumCapYellow : mats.smdCeramic, mats.solderBallSilver, 'z');
      p.position.set(3.8, 2.4 - i * 2.4, -0.62);
      g.add(p);
    }
    const pwmPad = new THREE.Mesh(hiResCyl(0.55, 0.55, 0.14, 12).rotateX(Math.PI / 2), mats.goldPlating);
    pwmPad.position.set(-5.0, -2.6, -0.34);
    g.add(pwmPad);

    pushPart(
      finalizeLcdTechPart(
        'lcd-cabc-pwm-dimmer',
        91,
        '#eab308',
        g,
        new THREE.Vector3(LCD_CENTER_X + 4.0, LCD_CENTER_Y - 4.0, -31.65),
        new THREE.Vector3(44, -64, 6),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // GROUP F: 4-Axis Hinge Tribology, Bearings, Fasteners, Drainage & Tally/IMU (D92–D100)
  // =========================================================================

  // D92: Hollow Forged Stainless D-Cut Anti-Rotation Torque Shaft & E-Ring / Push-Nut Axial Retainer
  {
    const g = new THREE.Group();
    const shaftGeo = hiResCyl(2.2, 2.2, 8.8, 24).rotateZ(Math.PI / 2);
    applyBoxUVs(shaftGeo, 8);
    const shaftOuter = new THREE.Mesh(shaftGeo, u.lcdBrushedSus304Blu);
    shaftOuter.position.x = -1.6;
    g.add(shaftOuter);

    for (const sy of [-1.95, 1.95]) {
      const flatKey = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.40, 2.4), mats.titaniumRivet);
      flatKey.position.set(-1.6, sy, 0);
      g.add(flatKey);
    }

    for (const sx of [-6.05, 2.85]) {
      const boreHole = new THREE.Mesh(hiResCyl(1.30, 1.30, 0.35, 18).rotateZ(Math.PI / 2), mats.matteBlackAnodized);
      boreHole.position.set(sx, 0, 0);
      boreHole.userData.noEdges = true;
      g.add(boreHole);
    }

    const eRing = new THREE.Mesh(hiResTorus(2.85, 0.38, 12, 24, Math.PI * 1.55), mats.mountSpringSteel);
    eRing.rotation.y = Math.PI / 2;
    eRing.position.set(-5.0, 0, 0);
    const thrustW = new THREE.Mesh(hiResCyl(3.0, 3.0, 0.32, 22).rotateZ(Math.PI / 2), u.lcdSinteredBronzePore);
    thrustW.position.set(2.0, 0, 0);
    g.add(eRing, thrustW);

    pushPart(
      finalizeLcdTechPart(
        'lcd-dcut-hollow-shaft',
        92,
        '#94a3b8',
        g,
        new THREE.Vector3(hx, LCD_CENTER_Y, -30.40),
        new THREE.Vector3(108, 30, -20),
        cp,
        0.28
      ),
      false
    );
  }

  // D93: Oil-Impregnated Sintered Bronze Pivot Bushings (SAE 841 / PTFE-Lined Steel-Backed Bearings)
  {
    const g = new THREE.Group();
    for (const sy of [-6.8, 6.8]) {
      const sGeo = hiResCyl(3.42, 3.42, 4.2, 26);
      applyBoxUVs(sGeo, 6);
      const sleeve = new THREE.Mesh(sGeo, u.lcdSinteredBronzePore);
      sleeve.position.set(0, sy, 0);
      const fGeo = hiResCyl(4.42, 4.42, 0.76, 26);
      applyBoxUVs(fGeo, 6);
      const flange = new THREE.Mesh(fGeo, u.lcdSinteredBronzePore);
      flange.position.set(0, sy + (sy > 0 ? -1.8 : 1.8), 0);
      const ptfeLiner = new THREE.Mesh(hiResCyl(2.55, 2.55, 4.3, 22), mats.epdmGasket);
      ptfeLiner.position.set(0, sy, 0);
      ptfeLiner.userData.noEdges = true;
      const oilGroove = new THREE.Mesh(hiResTorus(3.46, 0.14, 8, 22).rotateX(Math.PI / 2), mats.matteBlackAnodized);
      oilGroove.position.set(0, sy, 0);
      g.add(sleeve, flange, ptfeLiner, oilGroove);
    }

    const hGeo = hiResCyl(3.12, 3.12, 5.4, 24).rotateZ(Math.PI / 2);
    applyBoxUVs(hGeo, 6);
    const hBush = new THREE.Mesh(hGeo, u.lcdSinteredBronzePore);
    hBush.position.set(-2.6, 0, 0);
    g.add(hBush);

    pushPart(
      finalizeLcdTechPart(
        'lcd-sintered-bronze-bush',
        93,
        '#b45309',
        g,
        new THREE.Vector3(hx, LCD_CENTER_Y, -30.40),
        new THREE.Vector3(108, 52, 0),
        cp,
        0.28
      ),
      false
    );
  }

  // D94: Laser Micro-Dimpled Friction Discs & PFPE Fluorinated Damping Grease Film (-20C to +60C)
  {
    const g = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const xOff = -3.6 + i * 2.4;
      const dGeo = hiResCyl(4.62, 4.62, 0.44, 28).rotateZ(Math.PI / 2);
      applyBoxUVs(dGeo, 6);
      const disc = new THREE.Mesh(dGeo, i % 2 === 0 ? u.lcdLaserDimpleFriction : u.lcdSinteredBronzePore);
      disc.position.set(xOff, 0, 0);
      g.add(disc);

      if (i < 3) {
        const greaseFilm = new THREE.Mesh(hiResTorus(3.2, 0.32, 10, 26), mats.vcWorkingFluidCyan);
        greaseFilm.rotation.y = Math.PI / 2;
        greaseFilm.position.set(xOff + 1.2, 0, 0);
        greaseFilm.userData.noEdges = true;
        g.add(greaseFilm);
      }

      for (let d = 0; d < 10; d++) {
        const a = (d / 10) * Math.PI * 2;
        const pit = new THREE.Mesh(hiResSphere(0.24, 8, 6), mats.matteBlackAnodized);
        pit.position.set(xOff - 0.25, Math.sin(a) * 3.1, Math.cos(a) * 3.1);
        pit.userData.noEdges = true;
        g.add(pit);
      }
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-pfpe-dimple-grease',
        94,
        '#0ea5e9',
        g,
        new THREE.Vector3(hx, LCD_CENTER_Y, -30.45),
        new THREE.Vector3(82, 56, -16),
        cp,
        0.26
      ),
      false
    );
  }

  // D95: Stepped Stainless Rivet Pivot Pins, POM Thrust Washers & Tilt Cam Guide Bushings
  {
    const g = new THREE.Group();
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        const px = sx * 29.0;
        const py = sy * 15.5;
        const head = new THREE.Mesh(hiResCyl(2.22, 2.22, 0.78, 20).rotateZ(Math.PI / 2), u.lcdBrushedSus304Blu);
        head.position.set(px + sx * 1.4, py, 0);
        const shoulder = new THREE.Mesh(hiResCyl(1.45, 1.45, 3.2, 18).rotateZ(Math.PI / 2), mats.titaniumRivet);
        shoulder.position.set(px, py, 0);
        const pomWasher = new THREE.Mesh(hiResCyl(2.55, 2.55, 0.45, 22).rotateZ(Math.PI / 2), mats.pomGear);
        pomWasher.position.set(px + sx * 0.55, py, 0);
        const camBush = new THREE.Mesh(hiResCyl(1.98, 1.98, 1.28, 20).rotateZ(Math.PI / 2), u.lcdSinteredBronzePore);
        camBush.position.set(px - sx * 1.25, py, 0);
        g.add(head, shoulder, pomWasher, camBush);
      }
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-stepped-rivet-washers',
        95,
        '#cbd5e1',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -29.35),
        new THREE.Vector3(42, 56, 20),
        cp,
        0.26
      ),
      false
    );
  }

  // D96: Recessed LCD Bay Rain-Drainage Channel, Capillary Break Labyrinth & Conductive Ground Spring Fingers
  {
    const g = new THREE.Group();
    const troughGeo = createChamferedBoxGeo(LCD_WIDTH - 4.0, 4.2, 1.8, 0.6, 0.10, 'z');
    applyBoxUVs(troughGeo, 16);
    const trough = new THREE.Mesh(troughGeo, u.lcdMaHingeMg);
    trough.position.set(0, -LCD_HEIGHT * 0.46, 0);
    g.add(trough);

    for (const wx of [-20, 0, 20]) {
      const channel = new THREE.Mesh(createChamferedBoxGeo(4.2, 2.6, 1.2, 0.3, 0.05, 'z'), mats.vcWorkingFluidCyan);
      channel.position.set(wx, -LCD_HEIGHT * 0.48, -0.55);
      g.add(channel);
    }

    for (const [fx, fy] of [[-26, 16], [26, 16], [-26, -12], [26, -12]]) {
      const springBase = new THREE.Mesh(createChamferedBoxGeo(4.4, 2.0, 0.32, 0.2, 0.03, 'z'), mats.beCuSpring);
      springBase.position.set(fx, fy, -0.65);
      const leaf = new THREE.Mesh(createChamferedBoxGeo(3.6, 1.4, 0.25, 0.15, 0.02, 'z'), mats.goldPlating);
      leaf.position.set(fx, fy + 0.5, -1.25);
      leaf.rotation.x = -0.35;
      const rivet = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.48, 12).rotateX(Math.PI / 2), mats.titaniumRivet);
      rivet.position.set(fx - 1.2, fy, -0.65);
      g.add(springBase, leaf, rivet);
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-rain-drain-labyrinth',
        96,
        '#0284c7',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -27.20),
        new THREE.Vector3(0, -56, 58),
        cp,
        0.26
      ),
      false
    );
  }

  // D97: M1.4 / M1.7 Black-Oxide Precision Phillips Screws with Blue Micro-Capsule Threadlock
  {
    const g = new THREE.Group();
    const coords: Array<[number, number, number]> = [
      [-31, 20, 0],
      [31, 20, 0],
      [-31, -20, 0],
      [31, -20, 0],
      [0, 21, 0],
      [0, -21, 0],
      [36, 10, -0.6],
      [36, -10, -0.6],
    ];
    for (const [sx, sy, sz] of coords) {
      const screw = buildPhillipsScrew(1.55, 0.72, 0.78, 4.4, mats.matteBlackAnodized, mats.stainlessMachined, mats.mountThreadLockBlue);
      screw.rotation.x = Math.PI / 2;
      screw.position.set(sx, sy, sz);
      const washer = new THREE.Mesh(hiResTorus(1.12, 0.18, 8, 16), u.lcdBrushedSus304Blu);
      washer.position.set(sx, sy, sz + 0.75);
      g.add(screw, washer);
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-micro-screw-threadlock',
        97,
        '#2563eb',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -28.60),
        new THREE.Vector3(-56, -48, 36),
        cp,
        0.26
      ),
      false
    );
  }

  // D98: Recording Red-Frame Emphasis & Rear Tally / Access LED Light-Pipe Optics
  {
    const g = new THREE.Group();
    const pipeBar = new THREE.Mesh(createChamferedBoxGeo(18.0, 1.5, 1.25, 0.4, 0.08, 'z'), mats.bodyRecRed);
    g.add(pipeBar);
    // Micro-prism optical extraction ticks along tally light-pipe
    for (let i = -5; i <= 5; i++) {
      const notch = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.54, 0.25), mats.evfIrEmitter);
      notch.position.set(i * 1.4, 0, -0.64);
      notch.userData.noEdges = true;
      g.add(notch);
    }

    const ledBaseGeo = createChamferedBoxGeo(5.4, 3.4, 0.25, 0.25, 0.03, 'z');
    applyPlanarUVs(ledBaseGeo, 5.4, 3.4, 'xy-back');
    const ledBase = new THREE.Mesh(ledBaseGeo, u.lcdFpcFlexCircuit);
    ledBase.position.set(-10.2, 0, 0.45);
    const ledChip = new THREE.Mesh(createChamferedBoxGeo(1.8, 1.2, 0.75, 0.15, 0.04, 'z'), mats.evfIrEmitter);
    ledChip.position.set(-9.4, 0, -0.15);
    const ballast = buildSmdPassive(1.1, 0.6, 0.42, mats.matteBlackAnodized, mats.solderBallSilver, 'z');
    ballast.position.set(-11.4, 0, 0.12);
    g.add(ledBase, ledChip, ballast);

    const recHalo = new THREE.Mesh(
      extrudeHiRes(createFrameShape(LCD_WIDTH - 4.0, 2.2, 0.6, LCD_WIDTH - 6.0, 0.9, 0.3), 0.30, 0.03, 0.03, 1, 14),
      mats.bodyRecRed
    );
    recHalo.position.set(0, -1.6, -0.35);
    g.add(recHalo);

    pushPart(
      finalizeLcdTechPart(
        'lcd-tally-rec-lightpipe',
        98,
        '#ef4444',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y + 20.6, -33.90),
        new THREE.Vector3(0, 26, -108),
        cp,
        0.26
      ),
      true
    );
  }

  // D99: 6-Axis MEMS Orientation IMU Vertical-UI Auto-Rotate Link Module
  {
    const g = new THREE.Group();
    const imuBoard = createChamferedBoxGeo(12.4, 9.2, 0.62, 0.6, 0.06, 'z');
    applyPlanarUVs(imuBoard, 12.4, 9.2, 'xy-back');
    g.add(new THREE.Mesh(imuBoard, u.lcdPcbPd1072HiRes));

    const imuIc = buildChipPackage({
      w: 3.4,
      d: 2.8,
      h: 0.92,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    imuIc.position.set(0, 0.4, -0.78);
    g.add(imuIc);

    for (let i = 0; i < 2; i++) {
      const cap = buildSmdPassive(1.3, 0.7, 0.5, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(3.8, 1.4 - i * 2.4, -0.56);
      g.add(cap);
    }

    const xAxis = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.34, 0.25), mats.bodyRecRed);
    xAxis.position.set(-3.4, -2.8, -0.42);
    const yAxis = new THREE.Mesh(new THREE.BoxGeometry(0.34, 3.2, 0.25), mats.cfaGreen);
    yAxis.position.set(-4.8, -1.4, -0.42);
    const zDot = new THREE.Mesh(hiResSphere(0.42, 10, 8), mats.cfaBlue);
    zDot.position.set(-4.8, -2.8, -0.42);
    g.add(xAxis, yAxis, zDot);

    pushPart(
      finalizeLcdTechPart(
        'lcd-imu-vertical-link',
        99,
        '#10b981',
        g,
        new THREE.Vector3(LCD_CENTER_X - 20.0, LCD_CENTER_Y + 10.0, -27.25),
        new THREE.Vector3(-68, -16, 48),
        cp,
        0.26
      ),
      false
    );
  }

  // D100: Magnesium Rear Shell Internal Honeycomb Shock Ribs & 4-Corner Elastomer Drop Buffers
  {
    const g = new THREE.Group();
    const frameGeo = extrudeHiRes(
      createFrameShape(LCD_WIDTH - 4.0, LCD_HEIGHT - 4.0, 2.2, LCD_WIDTH - 9.0, LCD_HEIGHT - 9.0, 1.4),
      0.55,
      0.06,
      0.06,
      2,
      18
    );
    applyBoxUVs(frameGeo, 18);
    g.add(new THREE.Mesh(frameGeo, u.lcdMaHingeMg));

    for (let i = -3; i <= 3; i++) {
      const diagA = new THREE.Mesh(createChamferedBoxGeo(1.15, LCD_HEIGHT - 8.5, 0.48, 0.15, 0.04, 'z'), u.lcdMaHingeMg);
      diagA.position.set(i * 9.0, 0, 0);
      diagA.rotation.z = 0.42;
      const diagB = new THREE.Mesh(createChamferedBoxGeo(1.15, LCD_HEIGHT - 8.5, 0.48, 0.15, 0.04, 'z'), u.lcdMaHingeMg);
      diagB.position.set(i * 9.0, 0, 0);
      diagB.rotation.z = -0.42;
      g.add(diagA, diagB);
    }

    for (const [cx, cy] of [
      [-LCD_WIDTH * 0.45, LCD_HEIGHT * 0.43],
      [LCD_WIDTH * 0.45, LCD_HEIGHT * 0.43],
      [-LCD_WIDTH * 0.45, -LCD_HEIGHT * 0.43],
      [LCD_WIDTH * 0.45, -LCD_HEIGHT * 0.43],
    ]) {
      const bGeo = createChamferedBoxGeo(5.8, 5.2, 0.95, 1.2, 0.14, 'z');
      applyBoxUVs(bGeo, 8);
      const bumper = new THREE.Mesh(bGeo, u.lcdPoronAcousticFoam);
      bumper.position.set(cx, cy, -0.25);
      g.add(bumper);
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-rear-bezel-shock-rib',
        100,
        '#475569',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.35),
        new THREE.Vector3(-92, 24, -8),
        cp,
        0.26
      ),
      true
    );
  }

  // =========================================================================
  // GROUP G: 2025–2026 Next-Generation Flagship Rear Monitor Frontier Architecture (D101–D110)
  // =========================================================================

  // D101: 2026 Nano-Texture Micro-Etched Ultra-Low-Glare Cover Glass
  {
    const g = new THREE.Group();
    const nanoGeo = extrudeHiRes(createRoundedRectShape(LCD_WIDTH - 2.0, LCD_HEIGHT - 2.0, 2.8), 0.32, 0.06, 0.06, 2, 20);
    applyBoxUVs(nanoGeo, 16);
    g.add(new THREE.Mesh(nanoGeo, u.lcdNanoEtchGlass));

    // Iridescent nano-etch perimeter bezel highlight
    const rim = new THREE.Mesh(
      extrudeHiRes(
        createFrameShape(LCD_WIDTH - 2.0, LCD_HEIGHT - 2.0, 2.8, LCD_WIDTH - 4.2, LCD_HEIGHT - 4.2, 2.2),
        0.34,
        0.03,
        0.03,
        1,
        18
      ),
      mats.nanoArIridescent
    );
    g.add(rim);

    for (let i = -8; i <= 8; i++) {
      const cone = new THREE.Mesh(hiResCyl(0.12, 0.72, 0.42, 10).rotateX(-Math.PI / 2), mats.fluorineCoatCyan);
      cone.position.set(i * 3.4, -LCD_HEIGHT * 0.36, -0.32);
      cone.userData.noEdges = true;
      g.add(cone);
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-nano-texture-glass',
        101,
        '#94a3b8',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -34.00),
        new THREE.Vector3(-124, 96, -56),
        cp,
        0.22
      ),
      true
    );
  }

  // D102: Cd-Free InP Quantum Dot Enhancement Film (QDEF: FWHM 25 nm, DCI-P3 99% / BT.2020 90%)
  {
    const g = new THREE.Group();
    const qdefGeo = extrudeHiRes(createRoundedRectShape(blW, blH, 1.4), 0.24, 0.03, 0.03, 2, 18);
    applyPlanarUVs(qdefGeo, blW, blH, 'xy-back');
    g.add(new THREE.Mesh(qdefGeo, u.lcdQdefQuantumFilm));

    const barrier = new THREE.Mesh(
      extrudeHiRes(createFrameShape(blW + 0.6, blH + 0.6, 1.5, blW - 1.8, blH - 1.8, 1.0), 0.30, 0.03, 0.03, 1, 16),
      mats.nanoArIridescent
    );
    g.add(barrier);

    pushPart(
      finalizeLcdTechPart(
        'lcd-qdef-quantum-dot',
        102,
        '#ec4899',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.00),
        new THREE.Vector3(-62, 98, -56),
        cp,
        0.24
      ),
      true
    );
  }

  // D103: 2D Local-Dimming Mini-LED Matrix & Active-Matrix Driver IC Array (2,000-nit HDR FALD)
  {
    const g = new THREE.Group();
    const boardGeo = extrudeHiRes(createRoundedRectShape(blW, blH, 1.4), 0.42, 0.05, 0.05, 2, 18);
    applyPlanarUVs(boardGeo, blW, blH, 'xy-back');
    g.add(new THREE.Mesh(boardGeo, u.lcdMiniLedMatrix));

    for (let i = 0; i < 4; i++) {
      const drv = buildChipPackage({
        w: 4.0,
        d: 2.6,
        h: 0.65,
        style: 'qfn',
        pinsPerSide: 6,
        bodyMat: u.lcdAudioDisplayChipDie,
        leadMat: mats.goldPlating,
        axis: 'z',
      });
      drv.position.set(-21.0 + i * 14.0, -blH * 0.42, -0.52);
      g.add(drv);
    }
    const pwrBus = new THREE.Mesh(createChamferedBoxGeo(blW - 8.0, 1.1, 0.14, 0.15, 0.02, 'z'), mats.goldPlating);
    pwrBus.position.set(0, -blH * 0.48, -0.26);
    g.add(pwrBus);

    pushPart(
      finalizeLcdTechPart(
        'lcd-miniled-fald-matrix',
        103,
        '#0ea5e9',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.50),
        new THREE.Vector3(0, 100, -56),
        cp,
        0.24
      ),
      true
    );
  }

  // D104: Mini-LED High-Reflectance White Optical Cavity Array & Anti-Halo Diffusion Domes
  {
    const g = new THREE.Group();
    const baseGeo = extrudeHiRes(createRoundedRectShape(blW - 0.6, blH - 0.6, 1.2), 0.16, 0.02, 0.02, 1, 16);
    applyBoxUVs(baseGeo, 16);
    g.add(new THREE.Mesh(baseGeo, u.lcdDiffuserMicroBeads));

    for (let ix = 0; ix < 6; ix++) {
      for (let iy = 0; iy < 4; iy++) {
        const cx = -25.0 + ix * 10.0;
        const cy = -14.4 + iy * 9.6;
        const cup = new THREE.Mesh(hiResCyl(3.4, 1.8, 0.52, 14).rotateX(-Math.PI / 2), u.lcdDiffuserMicroBeads);
        cup.position.set(cx, cy, -0.34);
        const dome = new THREE.Mesh(hiResSphere(1.55, 12, 10), mats.evfLensAspheric);
        dome.scale.set(1, 1, 0.45);
        dome.position.set(cx, cy, -0.44);
        dome.userData.noEdges = true;
        g.add(cup, dome);
      }
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-miniled-white-cavity',
        104,
        '#f1f5f9',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -32.62),
        new THREE.Vector3(62, 98, -56),
        cp,
        0.22
      ),
      true
    );
  }

  // D105: 2026 Tandem Dual-Stack RGB OLED Emitter Architecture (2x Peak Luminance, 3x Lifespan)
  {
    const g = new THREE.Group();
    const stack1Geo = extrudeHiRes(createRoundedRectShape(cellW - 0.8, cellH - 0.8, 1.2), 0.18, 0.02, 0.02, 1, 18);
    applyPlanarUVs(stack1Geo, cellW - 0.8, cellH - 0.8, 'xy-back');
    const stack1 = new THREE.Mesh(stack1Geo, u.lcdTandemOledCgl);
    stack1.position.z = 0.24;
    g.add(stack1);

    const stack2Geo = extrudeHiRes(createRoundedRectShape(cellW - 1.6, cellH - 1.6, 1.2), 0.18, 0.02, 0.02, 1, 18);
    applyPlanarUVs(stack2Geo, cellW - 1.6, cellH - 1.6, 'xy-back');
    const stack2 = new THREE.Mesh(stack2Geo, u.lcdTandemOledCgl);
    stack2.position.z = -0.24;
    g.add(stack2);

    const rim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(cellW, cellH, 1.3, cellW - 2.2, cellH - 2.2, 0.9), 0.72, 0.03, 0.03, 1, 18),
      mats.sinteredSilver
    );
    const anodeBar = new THREE.Mesh(createChamferedBoxGeo(cellW - 4.0, 1.2, 0.76, 0.15, 0.02, 'z'), mats.goldPlating);
    anodeBar.position.set(0, -cellH * 0.48, 0);
    g.add(rim, anodeBar);

    pushPart(
      finalizeLcdTechPart(
        'lcd-tandem-oled-stack',
        105,
        '#a855f7',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.90),
        new THREE.Vector3(124, 96, -56),
        cp,
        0.24
      ),
      true
    );
  }

  // D106: Tandem OLED Ultra-Low-Loss Charge Generation Layer (CGL: <5% Optical Loss n/p Tunnel Junction)
  {
    const g = new THREE.Group();
    const cglGeo = extrudeHiRes(createRoundedRectShape(cellW - 1.2, cellH - 1.2, 1.2), 0.14, 0.02, 0.02, 1, 18);
    applyPlanarUVs(cglGeo, cellW - 1.2, cellH - 1.2, 'xy-back');
    g.add(new THREE.Mesh(cglGeo, u.lcdTfeAldBarrier));

    for (let ix = -4; ix <= 4; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        const pairE = new THREE.Mesh(hiResSphere(0.52, 10, 8), mats.vcWorkingFluidCyan);
        pairE.position.set(ix * 6.8 - 0.5, iy * 8.2, -0.18);
        const pairH = new THREE.Mesh(hiResSphere(0.52, 10, 8), mats.bodyRecRed);
        pairH.position.set(ix * 6.8 + 0.5, iy * 8.2, 0.18);
        pairE.userData.noEdges = true;
        pairH.userData.noEdges = true;
        g.add(pairE, pairH);
      }
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-tandem-cgl-layer',
        106,
        '#f59e0b',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.86),
        new THREE.Vector3(-124, 96, 16),
        cp,
        0.24
      ),
      true
    );
  }

  // D107: LTPO Hybrid Oxide (IGZO + LTPS) 1–120 Hz Variable Refresh Backplane
  {
    const g = new THREE.Group();
    const ltpoGeo = extrudeHiRes(createRoundedRectShape(cellW - 1.0, cellH - 1.0, 1.2), 0.22, 0.03, 0.03, 2, 18);
    applyPlanarUVs(ltpoGeo, cellW - 1.0, cellH - 1.0, 'xy-back');
    g.add(new THREE.Mesh(ltpoGeo, u.lcdLtpsTftSilicon));

    for (let r = -3; r <= 3; r++) {
      const igzoBar = new THREE.Mesh(new THREE.BoxGeometry(cellW - 6.0, 0.72, 0.28), mats.goldPlating);
      igzoBar.position.set(0, r * 5.6 + 1.2, -0.06);
      igzoBar.userData.noEdges = true;
      const ltpsBar = new THREE.Mesh(new THREE.BoxGeometry(cellW - 6.0, 0.72, 0.28), mats.fluorineCoatCyan);
      ltpsBar.position.set(0, r * 5.6 - 1.2, -0.06);
      ltpsBar.userData.noEdges = true;
      g.add(igzoBar, ltpsBar);
    }
    for (const sx of [-1, 1]) {
      const vrrDrv = new THREE.Mesh(createChamferedBoxGeo(1.8, cellH - 5.0, 0.30, 0.15, 0.02, 'z'), u.lcdDdicSiliconDie);
      vrrDrv.position.set(sx * (cellW * 0.5 - 2.0), 0, -0.04);
      g.add(vrrDrv);
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-ltpo-igzo-vrr',
        107,
        '#22d3ee',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -33.80),
        new THREE.Vector3(-62, 98, 16),
        cp,
        0.24
      ),
      true
    );
  }

  // D108: 0.3 mm Ultra-Thin Copper Sintered-Wick Vapor Chamber (UTVC)
  {
    const g = new THREE.Group();
    const vcGeo = extrudeHiRes(createRoundedRectShape(LCD_WIDTH - 6.0, LCD_HEIGHT - 6.0, 2.2), 0.38, 0.06, 0.06, 2, 20);
    applyPlanarUVs(vcGeo, LCD_WIDTH - 6.0, LCD_HEIGHT - 6.0, 'xy-back');
    g.add(new THREE.Mesh(vcGeo, u.lcdVaporChamberWick));

    const fillTail = new THREE.Mesh(createChamferedBoxGeo(5.8, 2.6, 0.30, 0.4, 0.04, 'z'), mats.copperHeatSpreader);
    fillTail.position.set(LCD_WIDTH * 0.42, -LCD_HEIGHT * 0.44, 0);
    const weldRim = new THREE.Mesh(
      extrudeHiRes(
        createFrameShape(LCD_WIDTH - 5.8, LCD_HEIGHT - 5.8, 2.2, LCD_WIDTH - 8.2, LCD_HEIGHT - 8.2, 1.8),
        0.42,
        0.03,
        0.03,
        1,
        18
      ),
      mats.copperHeatSpreader
    );
    g.add(fillTail, weldRim);

    for (let i = -2; i <= 2; i++) {
      const chan = new THREE.Mesh(new THREE.BoxGeometry(LCD_WIDTH - 14.0, 0.48, 0.42), mats.vcWorkingFluidCyan);
      chan.position.set(0, i * 6.6, 0);
      chan.userData.noEdges = true;
      g.add(chan);
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-utvc-vapor-chamber',
        108,
        '#ea580c',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.85),
        new THREE.Vector3(0, 100, 16),
        cp,
        0.26
      ),
      true
    );
  }

  // D109: Phase-Change Material (PCM) Latent-Heat Buffer & Silica Aerogel Thermal Isolation Barrier
  {
    const g = new THREE.Group();
    // Bespoke quilted micro-encapsulated paraffin PCM thermal mat + icy nanoporous silica aerogel barrier
    const pcmGeo = extrudeHiRes(createRoundedRectShape(LCD_WIDTH - 8.0, LCD_HEIGHT - 8.0, 2.0), 0.34, 0.05, 0.05, 2, 18);
    applyPlanarUVs(pcmGeo, LCD_WIDTH - 8.0, LCD_HEIGHT - 8.0, 'xy-back');
    g.add(new THREE.Mesh(pcmGeo, u.lcdPcmAerogelThermal));

    const aeroGeo = extrudeHiRes(createRoundedRectShape(LCD_WIDTH - 10.0, LCD_HEIGHT - 10.0, 1.8), 0.28, 0.04, 0.04, 2, 16);
    applyBoxUVs(aeroGeo, 16);
    const aero = new THREE.Mesh(aeroGeo, u.lcdNanoEtchGlass);
    aero.position.z = 0.32;
    g.add(aero);

    const pouchRim = new THREE.Mesh(
      extrudeHiRes(
        createFrameShape(LCD_WIDTH - 7.6, LCD_HEIGHT - 7.6, 2.0, LCD_WIDTH - 11.0, LCD_HEIGHT - 11.0, 1.4),
        0.42,
        0.04,
        0.04,
        1,
        16
      ),
      u.lcdBrushedSus304Blu
    );
    g.add(pouchRim);

    pushPart(
      finalizeLcdTechPart(
        'lcd-pcm-thermal-buffer',
        109,
        '#f472b6',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y, -31.22),
        new THREE.Vector3(62, 98, 16),
        cp,
        0.24
      ),
      true
    );
  }

  // D110: 10-Bit HDR (HLG/PQ/3D-LUT) Hardware Real-Time Waveform & False-Color Next-Gen T-CON SoC
  {
    const g = new THREE.Group();
    const interposer = createChamferedBoxGeo(16.4, 11.6, 0.65, 0.7, 0.06, 'z');
    applyPlanarUVs(interposer, 16.4, 11.6, 'xy-back');
    g.add(new THREE.Mesh(interposer, u.lcdPcbPd1072HiRes));

    const soc = buildChipPackage({
      w: 8.6,
      d: 6.4,
      h: 1.15,
      style: 'bga',
      pinsPerSide: 9,
      bodyMat: u.lcdAudioDisplayChipDie,
      leadMat: mats.solderBallSilver,
      topAccentMat: u.lcdDdicSiliconDie,
      axis: 'z',
    });
    soc.position.set(-0.6, 0.4, -0.88);
    g.add(soc);

    // Hermetic seam-welded gold 24 MHz crystal oscillator + 0201 decoupling MLCC bank
    const xtal = new THREE.Mesh(createChamferedBoxGeo(2.8, 2.2, 0.72, 0.2, 0.05, 'z'), mats.goldPlating);
    xtal.position.set(5.4, 2.4, -0.68);
    const xtalLid = new THREE.Mesh(createChamferedBoxGeo(2.3, 1.7, 0.16, 0.12, 0.02, 'z'), u.lcdBrushedSus304Blu);
    xtalLid.position.set(5.4, 2.4, -1.06);
    g.add(xtal, xtalLid);

    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(1.5, 0.85, 0.55, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.position.set(-4.8 + i * 2.4, -4.0, -0.58);
      g.add(cap);
    }

    pushPart(
      finalizeLcdTechPart(
        'lcd-hdr-waveform-tcon',
        110,
        '#6366f1',
        g,
        new THREE.Vector3(LCD_CENTER_X, LCD_CENTER_Y - 18.0, -31.62),
        new THREE.Vector3(124, 96, 16),
        cp,
        0.26
      ),
      true
    );
  }

  return { parts, monitorParts };
}
