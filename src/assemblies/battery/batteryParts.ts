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
  buildCrimpedSteelCanGeometry,
  buildShieldedInductor,
  buildSmdPassive,
  buildSpiralJellyRollGeometry,
  buildSpotWeldNuggets,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';
import { buildBatteryUltra27Parts } from './batteryUltra27Parts';
import { buildBatteryUltra30Parts } from './batteryUltra30Parts';
import { buildBatteryUltra31Parts } from './batteryUltra31Parts';

function finalizeBatteryPart(
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
    subsystem: 'battery',
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
 * Phase 26A — Standalone Flagship Camera Battery Pack Ultra-Dissection (Sony NP-FZ100 & Next-Gen: 70 Parts P01–P70).
 * True 1:1 mm NP-FZ100 architectural proportions (38.7 × 51.7 × 22.7 mm), centered at (0, 0, 0).
 * Left 18500 cell (x = -9.5) shows genuine Sony/Murata US18500GR olive-emerald wrapped steel pressure can;
 * Right 18500 cell (x = +9.5) reveals a true multi-turn spiral jelly-roll cutaway!
 */
export function buildBatteryParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // P01. Flame-Retardant UL94 V-0 Polycarbonate Front Shell & Ultrasonic Rib
  // =========================================================================
  {
    const g = new THREE.Group();
    // Genuine Sony jet-charcoal satin VDI-27 textured UL94 V-0 polycarbonate front housing (seamless box UVs!)
    const frontWallGeo = extrudeHiRes(createRoundedRectShape(38.7, 51.7, 4.4), 1.65, 0.42, 0.42, 3, 28);
    applyBoxUVs(frontWallGeo, 14.0);
    const frontWall = new THREE.Mesh(frontWallGeo, u.batPolycarbonateShell);
    frontWall.position.z = 5.15;

    const perimeterWallGeo = extrudeHiRes(
      createFrameShape(38.7, 51.7, 4.4, 35.9, 48.9, 3.2),
      10.8,
      0.24,
      0.24,
      2,
      28
    );
    applyBoxUVs(perimeterWallGeo, 14.0);
    const perimeterWall = new THREE.Mesh(perimeterWallGeo, u.batPolycarbonateShell);
    perimeterWall.position.z = 0.0;

    // Subtle molded perimeter label-recess border trim framing P03 nameplate cleanly
    const labelRecessTrim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(33.2, 35.6, 2.5, 31.4, 33.8, 2.1), 0.28, 0.06, 0.06, 2, 20),
      mats.matteBlackAnodized
    );
    labelRecessTrim.position.set(0, -2.0, 5.98);
    labelRecessTrim.userData.noEdges = true;

    // Molded tactile side insertion grip ribs on left & right shell flanks
    for (const sx of [-19.4, 19.4]) {
      for (let i = 0; i < 4; i++) {
        const grip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.0, 6.2), mats.matteBlackAnodized);
        grip.position.set(sx, -16.5 + i * 2.2, 1.5);
        grip.userData.noEdges = true;
        g.add(grip);
      }
    }

    // Precision injection-molded interior cell-cradle stiffening ribs & ejector boss posts (visible in exploded view!)
    for (const ry of [-15.0, -5.0, 5.0, 14.0]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(34.6, 0.72, 1.85), u.batPolycarbonateShell);
      rib.position.set(0, ry, 3.6);
      rib.userData.noEdges = true;
      g.add(rib);
    }
    const centerSeptum = new THREE.Mesh(new THREE.BoxGeometry(0.85, 36.0, 2.4), u.batPolycarbonateShell);
    centerSeptum.position.set(0, -2.0, 3.2);
    centerSeptum.userData.noEdges = true;
    g.add(centerSeptum);

    // Molded Sony recessed triangular insertion-direction chevron ('▲') above nameplate!
    const arrowShape = new THREE.Shape();
    arrowShape.moveTo(0, 1.05);
    arrowShape.lineTo(1.25, -0.75);
    arrowShape.lineTo(-1.25, -0.75);
    arrowShape.closePath();
    const arrowMesh = new THREE.Mesh(
      extrudeHiRes(arrowShape, 0.16, 0.03, 0.03, 1, 6),
      mats.stainlessMachined
    );
    arrowMesh.position.set(0, 23.6, 6.02);
    arrowMesh.userData.noEdges = true;

    // Authentic Sony NP-FZ100 top-edge 4-slot recessed gold terminal polarizing keyways (+ / T / S / -)
    const topTermBay = new THREE.Mesh(
      createChamferedBoxGeo(22.6, 0.52, 5.2, 0.65, 0.08, 'y'),
      mats.matteBlackAnodized
    );
    topTermBay.position.set(0, 25.82, 0.2);
    topTermBay.userData.noEdges = true;
    g.add(topTermBay);
    for (const tx of [-7.5, -2.5, 2.5, 7.5]) {
      const slotWall = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.56, 3.8), mats.mountPpsInsulator);
      slotWall.position.set(tx, 25.88, 0.2);
      slotWall.userData.noEdges = true;
      const goldLip = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.36, 2.85), mats.goldPlating);
      goldLip.position.set(tx, 26.02, 0.2);
      goldLip.userData.noEdges = true;
      g.add(slotWall, goldLip);
    }

    // Ultrasonic weld energy-director ridge along mating seam
    const weldRib = new THREE.Mesh(
      extrudeHiRes(createFrameShape(37.6, 50.6, 3.7, 36.8, 49.8, 3.4), 0.65, 0.06, 0.06, 1, 20),
      mats.matteBlackAnodized
    );
    weldRib.position.z = -5.4;
    g.add(frontWall, perimeterWall, labelRecessTrim, arrowMesh, weldRib);

    parts.push(
      finalizeBatteryPart(
        'bat-outer-shell-front',
        1,
        '#242830',
        g,
        new THREE.Vector3(0, 0, 5.4),
        new THREE.Vector3(0, 0, 58),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // P02. Rear Shell & Poka-Yoke Asymmetric Keying Guide Grooves
  // =========================================================================
  {
    const g = new THREE.Group();
    const rearWallGeo = extrudeHiRes(createRoundedRectShape(38.7, 51.7, 4.4), 1.65, 0.42, 0.42, 3, 28);
    applyBoxUVs(rearWallGeo, 14.0);
    const rearWall = new THREE.Mesh(rearWallGeo, u.batPolycarbonateShell);
    rearWall.position.z = -5.15;

    const rearRimGeo = extrudeHiRes(createFrameShape(38.7, 51.7, 4.4, 35.9, 48.9, 3.2), 10.8, 0.24, 0.24, 2, 28);
    applyBoxUVs(rearRimGeo, 14.0);
    const rearRim = new THREE.Mesh(rearRimGeo, u.batPolycarbonateShell);
    rearRim.position.z = 0.0;

    // Precision injection-molded interior rear cell-cradle ribs & center divider
    for (const ry of [-15.0, -5.0, 5.0, 14.0]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(34.6, 0.72, 1.85), u.batPolycarbonateShell);
      rib.position.set(0, ry, -3.6);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Asymmetric poka-yoke anti-reverse keying rail & chamfered lead-in ramp
    const keyRail = new THREE.Mesh(
      createChamferedBoxGeo(2.35, 44.2, 1.35, 0.45, 0.16, 'z'),
      mats.matteBlackAnodized
    );
    keyRail.position.set(-18.15, 1.0, -5.85);

    // Molded twin longitudinal cell-contour stiffening flutes on rear shell
    for (const fx of [-9.5, 9.5]) {
      const flute = new THREE.Mesh(
        createChamferedBoxGeo(1.1, 22.0, 0.35, 0.3, 0.06, 'z'),
        mats.matteBlackAnodized
      );
      flute.position.set(fx, 11.2, -5.95);
      flute.userData.noEdges = true;
      g.add(flute);
    }

    // Blue camera battery-door retaining latch recess pocket
    const latchNotch = new THREE.Mesh(
      createChamferedBoxGeo(7.0, 3.5, 1.1, 0.45, 0.12, 'z'),
      mats.mountShimBlue
    );
    latchNotch.position.set(11.4, -21.6, -5.9);
    g.add(rearWall, rearRim, keyRail, latchNotch);

    parts.push(
      finalizeBatteryPart(
        'bat-outer-shell-rear',
        2,
        '#1e2128',
        g,
        new THREE.Vector3(0, 0, -5.4),
        new THREE.Vector3(0, 0, -58),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // P03. Anti-Counterfeit 3D Hologram Seal & PSE / UN38.3 Spec Nameplate
  // =========================================================================
  {
    const g = new THREE.Group();
    const labelW = 31.6;
    const labelH = 34.0;

    // Full-resolution photorealistic Sony NP-FZ100 InfoLITHIUM Z nameplate!
    // (SONY serif, InfoLITHIUM [Z], NP-FZ100, 7.2V 2280mAh 16.4Wh, safety notice, Li-ion 20/PSE/CE/UKCA/WEEE/EAC)
    const specGeo = extrudeHiRes(createRoundedRectShape(labelW, labelH, 2.2), 0.28, 0.04, 0.04, 1, 22);
    applyPlanarUVs(specGeo, labelW, labelH, 'xy');
    const specPlate = new THREE.Mesh(specGeo, u.batFrontLabel);

    // Genuine rainbow-diffraction 3D Sony Security Hologram sticker seated EXACTLY in the upper-right recess!
    const holoW = 8.75;
    const holoH = 9.4;
    const holoGeo = extrudeHiRes(createRoundedRectShape(holoW, holoH, 0.55), 0.28, 0.04, 0.04, 1, 16);
    applyPlanarUVs(holoGeo, holoW, holoH, 'xy');
    const holoBadge = new THREE.Mesh(holoGeo, u.batHologramFoil);
    holoBadge.position.set(9.1, 10.12, 0.14);
    holoBadge.userData.noEdges = true;

    // Subtle metallic security micro-frame around hologram sticker
    const holoFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(holoW + 0.45, holoH + 0.45, 0.7, holoW - 0.1, holoH - 0.1, 0.45), 0.16, 0.03, 0.03, 1, 14),
      mats.silverElectrode
    );
    holoFrame.position.set(9.1, 10.12, 0.09);
    holoFrame.userData.noEdges = true;
    g.add(specPlate, holoBadge, holoFrame);

    parts.push(
      finalizeBatteryPart(
        'bat-hologram-label',
        3,
        '#a855f7',
        g,
        new THREE.Vector3(0, -2.0, 11.62),
        new THREE.Vector3(-42, 14, 78),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P04. 4-Pin Recessed Gold-Plated Terminal Block (+ / T / S / -)
  // =========================================================================
  {
    const g = new THREE.Group();
    const blockBody = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(22.4, 5.4, 0.85), 6.2, 0.12, 0.12, 2, 18),
      mats.mountPpsInsulator
    );
    g.add(blockBody);

    // 4 recessed bifurcated twin-wipe ENIG gold-plated contact forks (+, T, S, -) with curved entry ramps & dimples
    const pinX = [-7.5, -2.5, 2.5, 7.5];
    for (const px of pinX) {
      for (const side of [-1, 1]) {
        const fork = new THREE.Mesh(
          createChamferedBoxGeo(0.42, 4.35, 3.85, 0.1, 0.04, 'z'),
          mats.goldPlating
        );
        fork.position.set(px + side * 0.56, 0.55, 0);
        // Flared lead-in entry lip guiding camera blade smoothly
        const flare = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.85, 3.7), mats.goldPlating);
        flare.position.set(px + side * 0.78, 2.55, 0);
        flare.rotation.z = -side * 0.34;
        flare.userData.noEdges = true;
        // Raised hemispherical contact-wiping dimple pressing onto camera gold blade!
        const wipeDimple = new THREE.Mesh(hiResSphere(0.24, 10, 8), mats.goldPlating);
        wipeDimple.position.set(px + side * 0.36, 1.2, 0);
        wipeDimple.userData.noEdges = true;
        g.add(fork, flare, wipeDimple);
      }
      // Through-hole PCB solder tail descending into BMS board
      const pinTail = new THREE.Mesh(
        createChamferedBoxGeo(1.42, 2.35, 0.62, 0.12, 0.04, 'z'),
        mats.goldPlating
      );
      pinTail.position.set(px, -2.45, 0);
      g.add(pinTail);
    }

    parts.push(
      finalizeBatteryPart(
        'bat-terminal-block-4pin',
        4,
        '#eab308',
        g,
        new THREE.Vector3(0, 23.6, 0),
        new THREE.Vector3(0, 52, 18),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P05. Inter-Terminal Anti-Short Insulating Barrier Fins
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseBridge = new THREE.Mesh(
      createChamferedBoxGeo(24.6, 1.25, 7.1, 0.5, 0.12, 'y'),
      u.batPolycarbonateShell
    );
    baseBridge.position.y = -2.2;
    g.add(baseBridge);

    // 5 tapered dielectric anti-short barrier fins shielding each slot from coins/keys
    for (const fx of [-10.0, -5.0, 0.0, 5.0, 10.0]) {
      const fin = new THREE.Mesh(
        createChamferedBoxGeo(1.18, 5.45, 7.25, 0.35, 0.14, 'z'),
        u.batPolycarbonateShell
      );
      fin.position.set(fx, 0.5, 0);
      g.add(fin);
    }
    // Crisp molded '+' (left), 'T' & 'S' (center telemetry), and '-' (right) indicator reliefs on front header lip
    const plusH = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.32, 0.2), mats.silverElectrode);
    plusH.position.set(-7.5, -2.15, 3.62);
    plusH.userData.noEdges = true;
    const plusV = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.5, 0.2), mats.silverElectrode);
    plusV.position.set(-7.5, -2.15, 3.62);
    plusV.userData.noEdges = true;
    const tTop = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.24, 0.18), mats.silverElectrode);
    tTop.position.set(-2.5, -1.72, 3.62);
    tTop.userData.noEdges = true;
    const tStem = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.15, 0.18), mats.silverElectrode);
    tStem.position.set(-2.5, -2.22, 3.62);
    tStem.userData.noEdges = true;
    const sPip = new THREE.Mesh(hiResCyl(0.34, 0.34, 0.2, 14).rotateX(Math.PI / 2), mats.goldPlating);
    sPip.position.set(2.5, -2.15, 3.62);
    sPip.userData.noEdges = true;
    const minusH = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.32, 0.2), mats.silverElectrode);
    minusH.position.set(7.5, -2.15, 3.62);
    minusH.userData.noEdges = true;
    g.add(plusH, plusV, tTop, tStem, sPip, minusH);

    parts.push(
      finalizeBatteryPart(
        'bat-terminal-guide-ribs',
        5,
        '#334155',
        g,
        new THREE.Vector3(0, 24.4, 0),
        new THREE.Vector3(0, 62, -16),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P06. Multi-Layer BMS (Battery Management System) Protection & Control PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    // Conformal-coated deep emerald Sony NP-FZ100 BMS PCB with crisp B-/BM/B+/P+ T S P- silkscreen!
    const pcbGeo = extrudeHiRes(createRoundedRectShape(33.8, 13.6, 1.3), 1.02, 0.08, 0.08, 2, 20);
    pcbGeo.rotateX(-Math.PI / 2);
    applyPlanarUVs(pcbGeo, 33.8, 13.6, 'xz');
    const pcb = new THREE.Mesh(pcbGeo, u.batBmsPcb);

    // Raised heavy 2-oz copper high-current charge/discharge bus strip + gold nickel-weld pads
    const traceRail = new THREE.Mesh(
      createChamferedBoxGeo(29.8, 0.16, 2.1, 0.2, 0.02, 'y'),
      mats.copperHeatSpreader
    );
    traceRail.position.set(0, 0.56, 3.8);
    traceRail.userData.noEdges = true;

    for (const px of [-13.9, 13.9]) {
      const weldPad = new THREE.Mesh(
        createChamferedBoxGeo(4.3, 0.2, 4.3, 0.3, 0.03, 'y'),
        mats.goldPlating
      );
      weldPad.position.set(px, 0.56, 0);
      weldPad.userData.noEdges = true;
      g.add(weldPad);
    }

    // 4 plated through-hole terminal vias along front header + 8 dense 0201 bypass passives & micro vias
    for (let i = 0; i < 4; i++) {
      const via = new THREE.Mesh(hiResTorus(0.82, 0.24, 8, 18), mats.goldPlating);
      via.rotation.x = Math.PI / 2;
      via.position.set(-7.5 + i * 5.0, 0.54, 4.4);
      via.userData.noEdges = true;
      g.add(via);
    }
    for (let i = 0; i < 6; i++) {
      const smd = buildSmdPassive(1.05, 0.54, 0.38, i % 2 === 0 ? mats.smdCeramic : mats.matteBlackAnodized, mats.silverElectrode, 'y');
      smd.position.set(-10.5 + i * 4.2, 0.72, 5.45);
      g.add(smd);
      const microVia = new THREE.Mesh(hiResCyl(0.22, 0.22, 1.12, 10), mats.goldPlating);
      microVia.position.set(-10.5 + i * 4.2, 0.0, -5.5);
      microVia.userData.noEdges = true;
      g.add(microVia);
    }
    g.add(pcb, traceRail);

    parts.push(
      finalizeBatteryPart(
        'bat-bms-pcb',
        6,
        '#15803d',
        g,
        new THREE.Vector3(0, 20.6, 0),
        new THREE.Vector3(0, 44, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // P07. InfoLITHIUM Precision Fuel-Gauge & Coulomb-Counter IC
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic QFN-24 InfoLITHIUM fuel gauge & coulomb counter IC (TI BQ28Z610 / Sony custom ASIC)
    const qfn = buildChipPackage({
      w: 5.3,
      d: 5.3,
      h: 1.05,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    // Flanking 0402 VDD decoupling ceramic capacitors
    for (const dz of [-3.4, 3.4]) {
      const cap = buildSmdPassive(1.3, 0.72, 0.52, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(0, -0.22, dz);
      g.add(cap);
    }
    g.add(qfn);

    parts.push(
      finalizeBatteryPart(
        'bat-infolithium-fuelgauge',
        7,
        '#0ea5e9',
        g,
        new THREE.Vector3(-4.5, 21.6, 2.0),
        new THREE.Vector3(-34, 62, 34),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P08. Genuine Authentication Cryptographic MCU (Challenge-Response IC)
  // =========================================================================
  {
    const g = new THREE.Group();
    const mcu = buildChipPackage({
      w: 4.5,
      d: 4.5,
      h: 1.0,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    // Gold security-mesh cryptographic anti-tamper shield plate on package top
    const cryptoShield = new THREE.Mesh(
      createChamferedBoxGeo(2.85, 0.16, 2.85, 0.2, 0.03, 'y'),
      mats.goldPlating
    );
    cryptoShield.position.y = 0.56;
    cryptoShield.userData.noEdges = true;
    g.add(mcu, cryptoShield);

    parts.push(
      finalizeBatteryPart(
        'bat-auth-crypto-ic',
        8,
        '#8b5cf6',
        g,
        new THREE.Vector3(4.5, 21.6, 2.0),
        new THREE.Vector3(34, 62, 34),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P09. Back-to-Back Dual N-Channel Protection MOSFET Switch
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual DFN5x6 high-current low-RDS(on) power MOSFETs (charge + discharge back-to-back!)
    for (const sx of [-2.45, 2.45]) {
      const fet = buildChipPackage({
        w: 3.9,
        d: 4.6,
        h: 1.02,
        style: 'dfn',
        pinsPerSide: 4,
        bodyMat: u.icEpoxyLaser,
        leadMat: mats.silverElectrode,
        pin1Mat: mats.silverElectrode,
        axis: 'y',
      });
      fet.position.x = sx;
      // Exposed thick copper drain heatsink tab protruding cleanly at back edge
      const drainTab = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.32, 1.05, 0.14, 0.04, 'y'),
        mats.copperHeatSpreader
      );
      drainTab.position.set(sx, -0.35, 2.45);
      drainTab.userData.noEdges = true;
      g.add(fet, drainTab);
    }

    parts.push(
      finalizeBatteryPart(
        'bat-protection-mosfet',
        9,
        '#ef4444',
        g,
        new THREE.Vector3(-9.2, 21.6, -2.6),
        new THREE.Vector3(-54, 54, -26),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P10. Ultra-Low-Resistance Precision Current-Sense Shunt Resistor (5 mΩ)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic 2512 metal-strip R005 manganin current-sense shunt with heavy copper Kelvin terminals!
    const shunt = buildSmdPassive(
      5.8,
      3.0,
      0.86,
      mats.invarScaleBar,
      mats.copperHeatSpreader,
      'y',
      mats.silverElectrode
    );
    // Laser-trimmed calibration slot & top matte-black protective ink marking bar
    const inkBar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.45), mats.matteBlackAnodized);
    inkBar.position.y = 0.45;
    inkBar.userData.noEdges = true;
    g.add(shunt, inkBar);

    parts.push(
      finalizeBatteryPart(
        'bat-shunt-resistor',
        10,
        '#f59e0b',
        g,
        new THREE.Vector3(0.0, 21.5, -3.4),
        new THREE.Vector3(0, 54, -42),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P11. 2-Series (2S) Cell Voltage Monitor & Balancing Circuit IC
  // =========================================================================
  {
    const g = new THREE.Group();
    const balIc = buildChipPackage({
      w: 4.3,
      d: 3.6,
      h: 0.94,
      style: 'soic',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    // Two 0805 passive balancing bleed resistors with Ni-Sn end-caps
    for (const bx of [-2.25, 2.25]) {
      const bleed = buildSmdPassive(2.25, 1.25, 0.64, mats.matteBlackAnodized, mats.silverElectrode, 'y');
      bleed.position.set(bx, -0.1, 2.85);
      g.add(bleed);
    }
    g.add(balIc);

    parts.push(
      finalizeBatteryPart(
        'bat-cell-balancer-ic',
        11,
        '#14b8a6',
        g,
        new THREE.Vector3(9.4, 21.6, -2.4),
        new THREE.Vector3(54, 54, -26),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P12. Cell-Contact NTC Thermistor Temperature Sensor
  // =========================================================================
  {
    const g = new THREE.Group();
    // Glossy teardrop glass-encapsulated 10kΩ NTC thermistor bead
    const beadGeo = hiResSphere(1.42, 18, 14);
    beadGeo.scale(0.88, 1.18, 0.88);
    const bead = new THREE.Mesh(beadGeo, mats.cinnabarAnodized);
    bead.position.y = -11.0;

    // Gracefully twisted insulated enameled copper lead pair rising up to BMS PCB!
    for (const phase of [0, Math.PI]) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24;
        const y = -10.5 + t * 21.5;
        const ang = phase + t * Math.PI * 5.0;
        const rad = 0.42 * (1 - Math.abs(t - 0.5) * 0.4);
        pts.push(new THREE.Vector3(Math.cos(ang) * rad, y, Math.sin(ang) * rad));
      }
      const wireCurve = new THREE.CatmullRomCurve3(pts);
      const wire = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(wireCurve, 32, 0.21, 7, false)),
        mats.copperCoil
      );
      wire.userData.noEdges = true;
      g.add(wire);
    }

    // Translucent amber Kapton polyimide hold-down tape patch fixing NTC bead to cell waist
    const kaptonPatch = new THREE.Mesh(
      createChamferedBoxGeo(5.4, 6.4, 0.24, 0.4, 0.03, 'z'),
      mats.polyimideFpc
    );
    kaptonPatch.position.set(0, -11.0, 0.92);
    kaptonPatch.userData.noEdges = true;
    g.add(bead, kaptonPatch);

    parts.push(
      finalizeBatteryPart(
        'bat-ntc-thermistor',
        12,
        '#f97316',
        g,
        new THREE.Vector3(0.0, 8.5, 4.2),
        new THREE.Vector3(0, 26, 44),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // P13. Pack-Level Resettable PTC & Permanent Thermal Cutoff Fuse (SCP)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Polymer resettable PTC fuse with brushed nickel terminal plates
    const ptc = buildSmdPassive(5.5, 3.6, 1.32, mats.tantalumCapYellow, mats.silverElectrode, 'y');
    ptc.position.x = -3.35;

    // 3-terminal ceramic Self-Control Protector (SCP) thermal cutoff fuse (Dexerials SFH style)
    const scp = buildSmdPassive(5.1, 3.6, 1.32, mats.ceramicAlumina, mats.goldPlating, 'y', mats.bodyRecRed);
    scp.position.x = 3.35;
    g.add(ptc, scp);

    parts.push(
      finalizeBatteryPart(
        'bat-thermal-fuse-ptc',
        13,
        '#dc2626',
        g,
        new THREE.Vector3(0, 19.3, -2.2),
        new THREE.Vector3(-44, 34, -48),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P14. Spot-Welded Pure Nickel (Ni-200) Busbars & 2S Series Interconnects
  // =========================================================================
  {
    const g = new THREE.Group();
    // Formed pure nickel-200 bottom 2S series bridge linking Left Cell (-) to Right Cell (+)
    const bottomBridge = new THREE.Mesh(
      createChamferedBoxGeo(24.6, 0.44, 5.4, 0.8, 0.06, 'y'),
      mats.stainlessMachined
    );
    bottomBridge.position.set(0, -23.6, 0);

    // Side vertical BM center-tap nickel ribbon with 90° bend tabs rising to BMS
    const centerTap = new THREE.Mesh(
      createChamferedBoxGeo(0.42, 44.2, 4.0, 0.35, 0.04, 'z'),
      mats.stainlessMachined
    );
    centerTap.position.set(0, -1.6, -6.4);

    // Left & right top collector tabs reaching BMS B- / B+ pads
    const topTabL = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.44, 4.9, 0.6, 0.05, 'y'),
      mats.stainlessMachined
    );
    topTabL.position.set(-9.5, 18.8, 0);
    const topTabR = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.44, 4.9, 0.6, 0.05, 'y'),
      mats.stainlessMachined
    );
    topTabR.position.set(9.5, 18.8, 0);

    // Authentic twin resistance spot-weld fusion dimples (heat-affected halo + shiny nugget core!)
    const welds = buildSpotWeldNuggets(
      [
        [-10.5, -23.84, -1.1],
        [-8.5, -23.84, 1.1],
        [8.5, -23.84, -1.1],
        [10.5, -23.84, 1.1],
        [-10.4, 19.04, -0.9],
        [-8.6, 19.04, 0.9],
        [8.6, 19.04, -0.9],
        [10.4, 19.04, 0.9],
      ],
      0.56,
      'y',
      mats.brassGear,
      mats.silverElectrode
    );
    g.add(bottomBridge, centerTap, topTabL, topTabR, welds);

    parts.push(
      finalizeBatteryPart(
        'bat-nickel-busbar-weld',
        14,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -48, -28),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // P15. Shock-Absorbing Dual-Cell Inner Holder Frame & Silicone Potting
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded PPS central insulating divider with curved cell-cradle relief flutes
    const midDivider = new THREE.Mesh(
      createChamferedBoxGeo(1.25, 43.0, 16.0, 0.4, 0.1, 'y'),
      mats.mountPpsInsulator
    );

    // Contoured dual-barrel upper & lower cell retention cradles with true circular cell ports!
    const cradleShape = createRoundedRectShape(36.4, 17.8, 4.2);
    for (const cx of [-9.5, 9.5]) {
      const cellHole = new THREE.Path();
      cellHole.absarc(cx, 0, 7.2, 0, Math.PI * 2, true);
      cradleShape.holes.push(cellHole);
    }
    const topCradle = makeHiResHorizPlate(cradleShape, 2.35, mats.mountPpsInsulator, 0.14, 2, 24);
    topCradle.position.y = 17.5;
    const botCradle = makeHiResHorizPlate(cradleShape, 2.35, mats.mountPpsInsulator, 0.14, 2, 24);
    botCradle.position.y = -22.2;

    // Blue soft thermal silicone potting shock cushion beneath BMS
    const siliconeBlock = new THREE.Mesh(
      createChamferedBoxGeo(33.2, 2.1, 11.8, 1.4, 0.18, 'y'),
      mats.thermalPadBlue
    );
    siliconeBlock.position.y = 18.85;
    g.add(midDivider, topCradle, botCradle, siliconeBlock);

    parts.push(
      finalizeBatteryPart(
        'bat-cell-holder-frame',
        15,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -34, 34),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // P16. Blue Fish-Paper Insulator Rings & High-Temp Kapton Tape
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const cx of [-9.5, 9.5]) {
      const ringShape = new THREE.Shape();
      ringShape.absarc(0, 0, 8.72, 0, Math.PI * 2, false);
      const hole = new THREE.Path();
      hole.absarc(0, 0, 4.75, 0, Math.PI * 2, true);
      ringShape.holes.push(hole);
      const barleyRing = makeHiResHorizPlate(ringShape, 0.36, mats.mountShimBlue, 0.04, 1, 32);
      barleyRing.position.set(cx, 18.2, 0);
      g.add(barleyRing);
    }
    const kaptonStrip = new THREE.Mesh(
      createChamferedBoxGeo(34.2, 0.22, 14.6, 0.6, 0.02, 'y'),
      mats.polyimideFpc
    );
    kaptonStrip.position.set(0, 19.6, 0);
    g.add(kaptonStrip);

    parts.push(
      finalizeBatteryPart(
        'bat-kapton-barley-paper',
        16,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-48, 36, 20),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // P17. 18500 Cylindrical Nickel-Plated Steel Can (Left Full + Right Cutaway!)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Left cell: genuine Lathe-turned 18500 nickel-plated steel pressure can with waist necking groove & rolled crimp!
    const leftCan = new THREE.Mesh(
      buildCrimpedSteelCanGeometry(8.88, 40.2, 0, Math.PI * 2, 42),
      mats.stainlessMachined
    );
    leftCan.position.set(-9.5, -2.4, 0);

    // Right cell: 215° cutaway crimped steel pressure can exposing the full spiral jelly roll inside!
    const rightCanCut = new THREE.Mesh(
      buildCrimpedSteelCanGeometry(8.88, 40.2, Math.PI * 0.42, Math.PI * 1.16, 36),
      mats.stainlessMachined
    );
    rightCanCut.position.set(9.5, -2.4, 0);

    // Inner bright steel cut-edge liner rim for crisp wall thickness readability
    const rightInnerWall = new THREE.Mesh(
      hiResCyl(8.56, 8.56, 38.8, 34, true, Math.PI * 0.42, Math.PI * 1.16),
      mats.silverElectrode
    );
    rightInnerWall.position.set(9.5, -2.4, 0);
    rightInnerWall.userData.noEdges = true;
    g.add(leftCan, rightCanCut, rightInnerWall);

    parts.push(
      finalizeBatteryPart(
        'bat-18500-steel-can',
        17,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-44, -6, 0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P18. Heat-Shrink PET/PVC Cell Insulation Sleeve & Laser Lot Code
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic Sony / Murata US18500GR olive-emerald PVC heat-shrink wrap with dot-matrix laser code!
    const leftSleeve = new THREE.Mesh(
      hiResCyl(9.08, 9.08, 39.2, 40, true),
      u.batCellWrapGreen
    );
    leftSleeve.position.set(-9.5, -2.4, 0);
    // Heat-shrunk top & bottom rolled shoulder cuff rings wrapping over steel can lip
    for (const sy of [17.1, -21.9]) {
      const cuff = new THREE.Mesh(hiResTorus(8.75, 0.34, 10, 36), u.batCellWrapGreen);
      cuff.rotation.x = Math.PI / 2;
      cuff.position.set(-9.5, sy, 0);
      cuff.userData.noEdges = true;
      g.add(cuff);
    }

    // Right cutaway olive-emerald sleeve matching the 215° steel can cutaway
    const rightSleeveCut = new THREE.Mesh(
      hiResCyl(9.08, 9.08, 39.2, 36, true, Math.PI * 0.44, Math.PI * 1.12),
      u.batCellWrapGreen
    );
    rightSleeveCut.position.set(9.5, -2.4, 0);
    g.add(leftSleeve, rightSleeveCut);

    parts.push(
      finalizeBatteryPart(
        'bat-cell-pvc-sleeve',
        18,
        '#16654a',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-68, -6, 20),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P19. Cell Internal CID (Current Interrupt Device — Pressure Disc)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision stamped aluminum lower sub-disc with concentric score ring
    const lowerDisc = new THREE.Mesh(hiResCyl(6.25, 6.25, 0.42, 34), mats.silverElectrode);
    lowerDisc.position.y = -0.55;
    const scoreGroove = new THREE.Mesh(hiResTorus(3.9, 0.12, 8, 30), mats.matteBlackAnodized);
    scoreGroove.rotation.x = Math.PI / 2;
    scoreGroove.position.y = -0.32;
    scoreGroove.userData.noEdges = true;

    // Domed Lathe-turned upper snap-inversion pressure diaphragm disc
    const snapPts: THREE.Vector2[] = [
      new THREE.Vector2(0.01, 0.52),
      new THREE.Vector2(2.6, 0.48),
      new THREE.Vector2(4.9, 0.25),
      new THREE.Vector2(6.35, -0.08),
      new THREE.Vector2(6.35, -0.26),
      new THREE.Vector2(4.7, 0.05),
      new THREE.Vector2(0.01, 0.28),
    ];
    const snapGeo = markHiRes(new THREE.LatheGeometry(snapPts, 34));
    snapGeo.computeVertexNormals();
    const upperSnapDisc = new THREE.Mesh(snapGeo, mats.mountStainlessFlange);
    upperSnapDisc.position.y = 0.22;

    // Central laser-welded gold-highlighted frangible disconnect nib
    const weldNib = new THREE.Mesh(hiResCyl(1.12, 1.12, 0.78, 20), mats.goldPlating);
    g.add(lowerDisc, scoreGroove, upperSnapDisc, weldNib);

    parts.push(
      finalizeBatteryPart(
        'bat-cid-pressure-disc',
        19,
        '#e11d48',
        g,
        new THREE.Vector3(9.5, 16.4, 0),
        new THREE.Vector3(46, 36, 24),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P20. Cell-Cap Internal Donut PTC Thermistor Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const donutShape = new THREE.Shape();
    donutShape.absarc(0, 0, 6.6, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 3.5, 0, Math.PI * 2, true);
    donutShape.holes.push(hole);

    const ptcDonut = makeHiResHorizPlate(donutShape, 0.72, mats.cinnabarAnodized, 0.05, 2, 34);
    const cladTop = makeHiResHorizPlate(donutShape, 0.16, mats.silverElectrode, 0.02, 1, 34);
    cladTop.position.y = 0.42;
    const cladBot = makeHiResHorizPlate(donutShape, 0.16, mats.silverElectrode, 0.02, 1, 34);
    cladBot.position.y = -0.42;
    g.add(ptcDonut, cladTop, cladBot);

    parts.push(
      finalizeBatteryPart(
        'bat-cell-ptc-ring',
        20,
        '#ea580c',
        g,
        new THREE.Vector3(9.5, 17.3, 0),
        new THREE.Vector3(62, 46, 8),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P21. Explosion-Proof Safety Vent Cap & Polypropylene Hermetic Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    // Lathe-turned stepped positive top cap with rounded crown
    const capPts: THREE.Vector2[] = [
      new THREE.Vector2(0.01, 1.52),
      new THREE.Vector2(4.15, 1.52),
      new THREE.Vector2(4.45, 1.28),
      new THREE.Vector2(4.85, 0.35),
      new THREE.Vector2(6.65, 0.15),
      new THREE.Vector2(6.65, -0.32),
      new THREE.Vector2(0.01, -0.32),
    ];
    const capGeo = markHiRes(new THREE.LatheGeometry(capPts, 36));
    capGeo.computeVertexNormals();
    const posCap = new THREE.Mesh(capGeo, mats.stainlessMachined);

    // Molded translucent-white polypropylene hermetic crimp gasket ring
    const ppGasket = new THREE.Mesh(hiResTorus(7.6, 0.88, 14, 36), mats.lcdDiffuserMatte);
    ppGasket.rotation.x = Math.PI / 2;
    ppGasket.userData.noEdges = true;

    // 4 recessed radial safety gas-exhaust vent slots around cap shoulder
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const ventHole = new THREE.Mesh(
        createChamferedBoxGeo(1.65, 0.72, 1.15, 0.2, 0.04, 'y'),
        mats.matteBlackAnodized
      );
      ventHole.position.set(Math.cos(a) * 5.05, 0.52, Math.sin(a) * 5.05);
      ventHole.rotation.y = -a;
      g.add(ventHole);
    }
    g.add(posCap, ppGasket);

    parts.push(
      finalizeBatteryPart(
        'bat-safety-vent-gasket',
        21,
        '#f8fafc',
        g,
        new THREE.Vector3(9.5, 18.0, 0),
        new THREE.Vector3(76, 56, -12),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // P22. Cathode Sheet: High-Nickel NMC/NCA Active Material on Aluminum Foil
  // =========================================================================
  {
    const g = new THREE.Group();
    // TRUE 4.2-turn Archimedean spiral single-crystal NMC811 cathode ribbon + gleaming protruding Al foil edge!
    const nmcSpiral = new THREE.Mesh(
      buildSpiralJellyRollGeometry(2.65, 7.85, 4.2, 35.2, 0.22, Math.PI * 0.82, 0.36),
      u.batSingleCrystalNmc
    );
    const alFoilSpiral = new THREE.Mesh(
      buildSpiralJellyRollGeometry(2.77, 7.97, 4.2, 36.6, 0.1, Math.PI * 0.82, 0.36),
      mats.silverElectrode
    );
    alFoilSpiral.userData.noEdges = true;
    const alTopCrown = new THREE.Mesh(
      hiResTorus(5.3, 0.14, 10, 32, Math.PI * 1.1),
      mats.silverElectrode
    );
    alTopCrown.rotation.x = Math.PI / 2;
    alTopCrown.position.y = 18.25;
    alTopCrown.userData.noEdges = true;
    g.add(nmcSpiral, alFoilSpiral, alTopCrown);

    parts.push(
      finalizeBatteryPart(
        'bat-cathode-nmc-al',
        22,
        '#0284c7',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(46, 12, 16),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P23. Anode Sheet: Next-Gen Silicon-Carbon Composite (Si-C) on Copper Foil
  // =========================================================================
  {
    const g = new THREE.Group();
    // Interleaved 4.2-turn Archimedean spiral CVD Si-C graphite anode + bright copper current collector edge!
    const siAnodeSpiral = new THREE.Mesh(
      buildSpiralJellyRollGeometry(2.05, 7.25, 4.2, 34.6, 0.21, Math.PI * 0.82, 0.26),
      u.batSiCNanoScaffold
    );
    const cuFoilSpiral = new THREE.Mesh(
      buildSpiralJellyRollGeometry(2.17, 7.37, 4.2, 36.1, 0.1, Math.PI * 0.82, 0.26),
      mats.copperHeatSpreader
    );
    cuFoilSpiral.userData.noEdges = true;
    const cuBotCrown = new THREE.Mesh(
      hiResTorus(4.7, 0.14, 10, 32, Math.PI * 1.1),
      mats.copperHeatSpreader
    );
    cuBotCrown.rotation.x = Math.PI / 2;
    cuBotCrown.position.y = -18.0;
    cuBotCrown.userData.noEdges = true;
    g.add(siAnodeSpiral, cuFoilSpiral, cuBotCrown);

    parts.push(
      finalizeBatteryPart(
        'bat-anode-siox-cu',
        23,
        '#d97706',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(68, 4, 26),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P24. Ceramic (Alumina) Heat-Resistant Coated Microporous Separator Film
  // =========================================================================
  {
    const g = new THREE.Group();
    // Taller crisp matte-white alumina-coated microporous separator spiral extending safely past electrode edges!
    const sepSpiral = new THREE.Mesh(
      buildSpiralJellyRollGeometry(2.35, 7.55, 4.2, 37.4, 0.13, Math.PI * 0.82, 0.31),
      mats.ceramicAlumina
    );
    g.add(sepSpiral);

    parts.push(
      finalizeBatteryPart(
        'bat-ceramic-separator',
        24,
        '#e2e8f0',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(88, -4, 14),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P25. Organic Carbonate Electrolyte & Nano SEI Passivation Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    const electrolyteHalo = new THREE.Mesh(
      hiResCyl(4.95, 4.95, 34.2, 32, true, Math.PI * 0.14, Math.PI * 1.72),
      mats.vcWorkingFluidCyan
    );
    const seiFilm = new THREE.Mesh(
      hiResCyl(4.45, 4.45, 33.4, 32, true, Math.PI * 0.14, Math.PI * 1.72),
      mats.nanoArIridescent
    );
    g.add(electrolyteHalo, seiFilm);

    parts.push(
      finalizeBatteryPart(
        'bat-electrolyte-sei',
        25,
        '#22d3ee',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(106, -12, 0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P26. Jelly-Roll Hollow Stainless Center Mandrel Pin (Gas-Vent Tunnel)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rolled-seam hollow stainless steel center mandrel tube with longitudinal vent seam & chamfered rims
    const outerTube = new THREE.Mesh(
      hiResCyl(1.75, 1.75, 36.6, 28, true),
      mats.mountStainlessFlange
    );
    const innerBore = new THREE.Mesh(
      hiResCyl(1.18, 1.18, 36.8, 22),
      mats.matteBlackAnodized
    );
    for (const ey of [-18.3, 18.3]) {
      const lip = new THREE.Mesh(hiResTorus(1.48, 0.28, 10, 26), mats.stainlessMachined);
      lip.rotation.x = Math.PI / 2;
      lip.position.y = ey;
      lip.userData.noEdges = true;
      g.add(lip);
    }
    const seamLine = new THREE.Mesh(new THREE.BoxGeometry(0.16, 36.4, 0.2), mats.matteBlackAnodized);
    seamLine.position.set(0, 0, 1.72);
    seamLine.userData.noEdges = true;
    g.add(outerTube, innerBore, seamLine);

    parts.push(
      finalizeBatteryPart(
        'bat-center-mandrel-pin',
        26,
        '#64748b',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(86, -24, -22),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // P27. Internal Ultrasonic-Welded Aluminum Cathode & Nickel Anode Tabs
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultrasonic-knurled aluminum cathode collector tab + translucent amber Kapton burr-guard tape
    const alCathodeTab = new THREE.Mesh(
      createChamferedBoxGeo(3.25, 8.8, 0.34, 0.25, 0.04, 'z'),
      mats.silverElectrode
    );
    alCathodeTab.position.set(0, 14.5, 2.2);
    // Ultrasonic waffle-knurl weld pattern dots on cathode tab
    for (let r = 0; r < 3; r++) {
      for (let c = -1; c <= 1; c++) {
        const knurl = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.42), mats.stainlessMachined);
        knurl.position.set(c * 0.8, 16.5 + r * 0.72, 2.2);
        knurl.userData.noEdges = true;
        g.add(knurl);
      }
    }
    const tabProtectTape = new THREE.Mesh(
      createChamferedBoxGeo(4.3, 5.2, 0.44, 0.3, 0.03, 'z'),
      mats.polyimideFpc
    );
    tabProtectTape.position.set(0, 12.2, 2.2);
    tabProtectTape.userData.noEdges = true;

    const niAnodeTab = new THREE.Mesh(
      createChamferedBoxGeo(3.25, 7.6, 0.34, 0.25, 0.04, 'z'),
      mats.copperHeatSpreader
    );
    niAnodeTab.position.set(0, -19.2, -2.2);
    g.add(alCathodeTab, tabProtectTape, niAnodeTab);

    parts.push(
      finalizeBatteryPart(
        'bat-electrode-tabs-weld',
        27,
        '#fbbf24',
        g,
        new THREE.Vector3(9.5, -1.5, 0),
        new THREE.Vector3(64, -34, -32),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // P28. Next-Gen Integrated USB-C Direct Charging Port & Boost-Charge IC
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision deep-drawn oval stainless USB-C receptacle shell (16-pin direct-charge)
    const usbcShell = new THREE.Mesh(
      extrudeHiRes(createFrameShape(8.9, 3.2, 1.45, 7.6, 1.9, 0.85), 6.2, 0.1, 0.1, 2, 24).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    // Internal black LCP USB-C mid-plate tongue + 12 gleaming gold contact pins (top & bottom rows!)
    const tongue = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 0.58, 6.3, 0.2, 0.04, 'y'),
      mats.matteBlackAnodized
    );
    for (let i = 0; i < 6; i++) {
      for (const sy of [-0.31, 0.31]) {
        const pin = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 0.34), mats.goldPlating);
        pin.position.set(0.35, sy, -2.1 + i * 0.84);
        pin.userData.noEdges = true;
        g.add(pin);
      }
    }

    // Daughter charging PCB + molded shielded boost inductor + QFN boost-charge controller IC
    const chargePcbGeo = createChamferedBoxGeo(1.85, 11.0, 9.6, 0.6, 0.08, 'y');
    const chargePcb = new THREE.Mesh(chargePcbGeo, u.batBmsPcb);
    chargePcb.position.set(-4.0, 0, 0);

    const boostInductor = buildShieldedInductor(
      3.5,
      1.75,
      mats.ferriteInductor,
      mats.silverElectrode,
      mats.silverElectrode,
      'y'
    );
    boostInductor.rotation.z = Math.PI / 2;
    boostInductor.position.set(-5.75, 2.35, 0);

    const boostIc = buildChipPackage({
      w: 3.1,
      d: 3.1,
      h: 0.92,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    boostIc.rotation.z = Math.PI / 2;
    boostIc.position.set(-5.35, -2.4, 0);
    g.add(usbcShell, tongue, chargePcb, boostInductor, boostIc);

    parts.push(
      finalizeBatteryPart(
        'bat-usbc-pd-charger-ic',
        28,
        '#3b82f6',
        g,
        new THREE.Vector3(16.2, 12.0, 0),
        new THREE.Vector3(78, 28, 38),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // P29. Capacitive Touch 4-Level LED Battery Gauge & Light-Guide Window
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sleek flush-integrated upper-header LED gauge seated CLEANLY ABOVE the P03 nameplate (zero overlap!)
    const bezel = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(18.8, 4.4, 1.5), 0.56, 0.1, 0.1, 2, 20),
      mats.matteBlackAnodized
    );
    const chromeTrim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(18.4, 4.0, 1.35, 17.4, 3.0, 1.0), 0.16, 0.03, 0.03, 1, 18),
      mats.stainlessMachined
    );
    chromeTrim.position.z = 0.28;
    chromeTrim.userData.noEdges = true;

    // Smooth circular ENIG gold capacitive touch sensor coin with concentric tactile micro-ring
    const touchCoin = new THREE.Mesh(hiResCyl(1.22, 1.22, 0.42, 28).rotateX(Math.PI / 2), mats.goldPlating);
    touchCoin.position.set(-6.2, 0, 0.18);
    touchCoin.userData.noEdges = true;
    const touchInner = new THREE.Mesh(hiResTorus(0.72, 0.07, 8, 24), mats.matteBlackAnodized);
    touchInner.position.set(-6.2, 0, 0.40);
    touchInner.userData.noEdges = true;
    const touchRing = new THREE.Mesh(hiResTorus(1.38, 0.1, 8, 28), mats.silverElectrode);
    touchRing.position.set(-6.2, 0, 0.36);
    touchRing.userData.noEdges = true;
    g.add(bezel, chromeTrim, touchCoin, touchInner, touchRing);

    // 4 smooth circular opaque luminous emerald-green LED light-guide pips (25% / 50% / 75% / 100%)
    for (let i = 0; i < 4; i++) {
      const lx = -1.6 + i * 2.85;
      const ledRing = new THREE.Mesh(hiResTorus(0.76, 0.11, 8, 24), mats.stainlessMachined);
      ledRing.position.set(lx, 0, 0.36);
      ledRing.userData.noEdges = true;
      const ledWell = new THREE.Mesh(
        hiResCyl(0.68, 0.68, 0.24, 24).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      ledWell.position.set(lx, 0, 0.20);
      ledWell.userData.noEdges = true;
      const led = new THREE.Mesh(
        hiResSphere(0.56, 18, 12),
        u.batSocLedGlow
      );
      led.scale.set(1.0, 1.0, 0.46);
      led.position.set(lx, 0, 0.31);
      led.userData.noEdges = true;
      g.add(ledRing, ledWell, led);
    }

    parts.push(
      finalizeBatteryPart(
        'bat-touch-4led-gauge',
        29,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 19.6, 11.42),
        new THREE.Vector3(44, 28, 72),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // P30. High-Conductivity Thermal Graphite Wrap & Cold-Weather Buffer
  // =========================================================================
  {
    const g = new THREE.Group();
    const graphiteBack = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(35.0, 38.5, 2.4), 0.44, 0.06, 0.06, 2, 22),
      mats.pyroGraphite
    );
    graphiteBack.position.z = -9.6;

    // Micro-cellular cold-weather Poron thermal retention liner
    const coldFoam = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(34.2, 37.5, 2.2), 0.65, 0.08, 0.08, 2, 22),
      u.micAcousticFelt
    );
    coldFoam.position.z = -10.22;
    g.add(graphiteBack, coldFoam);

    parts.push(
      finalizeBatteryPart(
        'bat-thermal-graphite-wrap',
        30,
        '#6366f1',
        g,
        new THREE.Vector3(0, -2.2, 0),
        new THREE.Vector3(-42, -24, -46),
        cp,
        0.18
      )
    );
  }

  parts.push(...buildBatteryUltra27Parts(mats));
  parts.push(...buildBatteryUltra30Parts(mats));
  parts.push(...buildBatteryUltra31Parts(mats));
  return parts;
}
