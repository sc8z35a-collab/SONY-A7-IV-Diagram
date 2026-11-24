import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  extrudeCentered,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import { BATTERY_ULTRA27_EXPLANATIONS } from './batteryUltra27Explanations';

function finalizeBatteryUltra27Part(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.25
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, edgeOpacity);

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
    explanation: BATTERY_ULTRA27_EXPLANATIONS[id],
    standaloneOnly: true,
  };
}

/**
 * Phase 27A — Standalone Camera Battery Pack Ultra-Deep Expansion (+30 Parts P31–P60 -> 60 Total).
 * Anatomically seated inside the true 1:1 mm NP-FZ100 envelope (38.7 × 51.7 × 22.7 mm),
 * with cleanly separated non-overlapping 6-way exploded offsets.
 */
export function buildBatteryUltra27Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // P31. Phosphor-Bronze Bifurcated Twin-Wipe Contact Springs (4-Pin Internal Clips)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pinXs = [-6.0, -2.0, 2.0, 6.0];
    for (const px of pinXs) {
      // Twin U-shaped bifurcated fingers gripping the camera terminal blade
      for (const dz of [-0.52, 0.52]) {
        for (const dx of [-0.28, 0.28]) {
          const finger = new THREE.Mesh(
            new THREE.BoxGeometry(0.42, 3.0, 0.24),
            mats.beCuSpring
          );
          finger.position.set(px + dx, 0, dz);
          finger.rotation.x = dz > 0 ? 0.14 : -0.14;
          g.add(finger);
        }
      }
      const bridge = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.45, 1.35),
        mats.goldPlating
      );
      bridge.position.set(px, -1.5, 0);
      g.add(bridge);
    }
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-terminal-contact-springs',
        31,
        '#d97706',
        g,
        new THREE.Vector3(0, 23.3, 0),
        new THREE.Vector3(-22, 72, 16),
        cp
      )
    );
  }

  // =========================================================================
  // P32. Camera Lock Latch Catch Pocket & Glove Extraction Lip
  // =========================================================================
  {
    const g = new THREE.Group();
    const catchBlock = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(3.0, 10.5, 0.6), 4.2, 0.1, 0.1, 8),
      mats.bodyBatteryShell
    );
    const pocket = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 3.8, 3.2),
      mats.matteBlackAnodized
    );
    pocket.position.set(-0.7, 1.8, 0);
    // Textured glove pull-lip with 5 tactile grip ridges
    for (let i = 0; i < 5; i++) {
      const rib = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.5, 3.8),
        mats.cinnabarAnodized
      );
      rib.position.set(-1.35, -4.4 + i * 0.95, 0);
      g.add(rib);
    }
    g.add(catchBlock, pocket);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-latch-catch-pocket',
        32,
        '#ea580c',
        g,
        new THREE.Vector3(-17.8, -18.0, -4.4),
        new THREE.Vector3(-74, -44, -22),
        cp
      )
    );
  }

  // =========================================================================
  // P33. USB-C Charging Port IP54 Silicone Dust Plug & Stainless Bezel
  // =========================================================================
  {
    const g = new THREE.Group();
    const bezel = new THREE.Mesh(
      extrudeCentered(createFrameShape(9.4, 3.8, 1.4, 8.2, 2.7, 0.9), 1.4, 0.08, 0.08, 12),
      mats.stainlessMachined
    );
    bezel.rotation.y = Math.PI / 2;
    const plugBody = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(8.0, 2.5, 0.9), 1.6, 0.1, 0.1, 10),
      mats.epdmGasket
    );
    plugBody.rotation.y = Math.PI / 2;
    plugBody.position.x = 0.55;
    const tether = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 3.6, 1.4),
      mats.antiVibRubber
    );
    tether.position.set(0.35, -3.0, 0);
    g.add(bezel, plugBody, tether);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-usbc-silicone-dustplug',
        33,
        '#64748b',
        g,
        new THREE.Vector3(18.6, 12.0, 0),
        new THREE.Vector3(98, 42, 46),
        cp
      )
    );
  }

  // =========================================================================
  // P34. Laser-Etched Lot Code & 2D DataMatrix Traceability Stamp
  // =========================================================================
  {
    const g = new THREE.Group();
    const basePlate = new THREE.Mesh(
      new THREE.BoxGeometry(22.0, 7.6, 0.18),
      mats.matteBlackAnodized
    );
    // 2D DataMatrix finder L-frame & micro data modules
    const dmBg = new THREE.Mesh(
      new THREE.BoxGeometry(5.6, 5.6, 0.24),
      mats.silverElectrode
    );
    dmBg.position.set(-7.0, 0, -0.04);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if ((r + c) % 2 === 0 || r === 0 || c === 0) {
          const dot = new THREE.Mesh(
            new THREE.BoxGeometry(0.95, 0.95, 0.28),
            mats.matteBlackAnodized
          );
          dot.position.set(-8.6 + c * 1.1, -1.6 + r * 1.1, -0.06);
          g.add(dot);
        }
      }
    }
    // Lot text laser bars
    for (let i = 0; i < 3; i++) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(11.5 - i * 1.6, 0.75, 0.24),
        mats.silverElectrode
      );
      bar.position.set(3.2 - i * 0.8, 1.8 - i * 1.7, -0.04);
      g.add(bar);
    }
    g.add(basePlate, dmBg);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-laser-datamatrix-lot',
        34,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -14.5, -10.75),
        new THREE.Vector3(-26, -34, -76),
        cp
      )
    );
  }

  // =========================================================================
  // P35. PORON Shock-Absorbing Urethane Foam Bumper & Swelling Cushion
  // =========================================================================
  {
    const g = new THREE.Group();
    const bottomPad = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.5, 16.5, 3.0), 1.3, 0.12, 0.12, 12),
      mats.lensFoamSeal
    );
    bottomPad.rotation.x = Math.PI / 2;
    // Side compression strips flanking both cells
    for (const sx of [-18.0, 18.0]) {
      const sidePad = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 26.0, 8.0),
        mats.lensFoamSeal
      );
      sidePad.position.set(sx, 14.0, 0);
      g.add(sidePad);
    }
    g.add(bottomPad);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-swelling-foam-bumper',
        35,
        '#475569',
        g,
        new THREE.Vector3(0, -24.1, 0),
        new THREE.Vector3(-24, -64, 24),
        cp
      )
    );
  }

  // =========================================================================
  // P36. Independent Hardware Secondary OVP Protection IC (TI BQ2920x / S-8209)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pkg = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.85, 2.6), mats.icEpoxy);
    const mark = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.12, 0.7), mats.mountRedIndexDot);
    mark.position.set(-0.7, 0.45, 0.6);
    for (let i = -1; i <= 1; i++) {
      for (const dz of [-1.4, 1.4]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.3, 0.45), mats.solderBallSilver);
        leg.position.set(i * 0.95, -0.25, dz);
        g.add(leg);
      }
    }
    g.add(pkg, mark);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-secondary-ovp-ic',
        36,
        '#dc2626',
        g,
        new THREE.Vector3(-12.6, 21.5, 2.2),
        new THREE.Vector3(-62, 74, 34),
        cp
      )
    );
  }

  // =========================================================================
  // P37. Terminal ±15 kV ESD / TVS Surge Protection Diode Array
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const dx of [-4.2, -1.4, 1.4, 4.2]) {
      const diode = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.62, 0.85), mats.icEpoxy);
      diode.position.set(dx, 0, 0);
      const cathodeStripe = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.66, 0.88),
        mats.varistorRingBlue
      );
      cathodeStripe.position.set(dx + 0.42, 0, 0);
      const endA = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.58, 0.86), mats.solderBallSilver);
      endA.position.set(dx - 0.62, 0, 0);
      g.add(diode, cathodeStripe, endA);
    }
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-esd-tvs-diode-pack',
        37,
        '#2563eb',
        g,
        new THREE.Vector3(0, 21.5, 3.8),
        new THREE.Vector3(0, 74, 48),
        cp
      )
    );
  }

  // =========================================================================
  // P38. Ultra-Low-Iq LDO Regulator & Bandgap Reference
  // =========================================================================
  {
    const g = new THREE.Group();
    const ldo = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.8, 2.0), mats.icEpoxy);
    const refCap = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.55, 0.7), mats.smdCeramic);
    refCap.position.set(2.3, -0.1, 0);
    const pad = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 1.8), mats.goldPlating);
    pad.position.y = -0.45;
    g.add(ldo, refCap, pad);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-ldo-reference-vreg',
        38,
        '#0891b2',
        g,
        new THREE.Vector3(12.4, 21.5, 2.2),
        new THREE.Vector3(62, 74, 34),
        cp
      )
    );
  }

  // =========================================================================
  // P39. Non-Volatile DataFlash / EEPROM Calibration & Cycle-Log Memory
  // =========================================================================
  {
    const g = new THREE.Group();
    const chip = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.78, 2.8), mats.icEpoxy);
    const label = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 1.2), mats.thermalPadBlue);
    label.position.y = 0.42;
    for (let i = 0; i < 4; i++) {
      for (const dz of [-1.45, 1.45]) {
        const pin = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.4), mats.solderBallSilver);
        pin.position.set(-1.15 + i * 0.76, -0.22, dz);
        g.add(pin);
      }
    }
    g.add(chip, label);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-eeprom-cal-memory',
        39,
        '#7c3aed',
        g,
        new THREE.Vector3(-6.4, 21.5, -4.0),
        new THREE.Vector3(-34, 74, -38),
        cp
      )
    );
  }

  // =========================================================================
  // P40. Pre-Charge Trickle & Factory Ship-Mode Cutoff MOSFET Stage
  // =========================================================================
  {
    const g = new THREE.Group();
    const fet = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.75, 2.2), mats.icEpoxy);
    const res = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.48, 0.9), mats.copperHeatSpreader);
    res.position.set(2.4, -0.1, 0);
    const tab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 0.7), mats.solderBallSilver);
    tab.position.set(0, -0.25, -1.25);
    g.add(fet, res, tab);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-precharge-shipmode-fet',
        40,
        '#059669',
        g,
        new THREE.Vector3(6.4, 21.5, -4.0),
        new THREE.Vector3(34, 74, -38),
        cp
      )
    );
  }

  // =========================================================================
  // P41. USB-C PD CC Protocol Controller & Shielded Boost Power Inductor
  // =========================================================================
  {
    const g = new THREE.Group();
    const inductor = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(4.4, 4.4, 0.6), 2.0, 0.12, 0.12, 8),
      mats.ferriteInductor
    );
    inductor.rotation.x = Math.PI / 2;
    const ccIc = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.75, 2.6), mats.icEpoxy);
    ccIc.position.set(-4.2, -0.3, 0);
    const caps = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 1.0), mats.tantalumCapYellow);
    caps.position.set(0, -0.35, 3.0);
    g.add(inductor, ccIc, caps);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-usbc-pd-cc-inductor',
        41,
        '#d97706',
        g,
        new THREE.Vector3(13.2, 18.2, 2.2),
        new THREE.Vector3(86, 62, 32),
        cp
      )
    );
  }

  // =========================================================================
  // P42. InfoLITHIUM Communication RC Noise Filter & EMI Ferrite Beads
  // =========================================================================
  {
    const g = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const bead = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 0.6), mats.ferriteInductor);
      bead.position.set(-2.4 + i * 1.6, 0, -0.5);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.45, 0.55), mats.smdCeramic);
      cap.position.set(-2.4 + i * 1.6, 0, 0.55);
      g.add(bead, cap);
    }
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-comm-pullup-rc-filter',
        42,
        '#6366f1',
        g,
        new THREE.Vector3(-2.0, 21.4, -0.4),
        new THREE.Vector3(-18, 76, -12),
        cp
      )
    );
  }

  // =========================================================================
  // P43. Factory Automated Bed-of-Nails Gold Calibration Test Pads
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrier = new THREE.Mesh(new THREE.BoxGeometry(18.0, 0.16, 2.4), mats.sensorPcb);
    g.add(carrier);
    for (let i = 0; i < 8; i++) {
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(0.62, 0.62, 0.24, 14),
        mats.goldPlating
      );
      pad.position.set(-7.7 + i * 2.2, -0.08, (i % 2 === 0 ? -0.45 : 0.45));
      g.add(pad);
    }
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-bms-test-calib-pads',
        43,
        '#eab308',
        g,
        new THREE.Vector3(0, 19.75, 0.4),
        new THREE.Vector3(22, 76, -12),
        cp
      )
    );
  }

  // =========================================================================
  // P44. Secondary PCB-Mounted SMD NTC Thermistor (MOSFET Thermal Guard)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ntc = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.65, 0.8), mats.copperHeatSpreader);
    for (const dx of [-0.65, 0.65]) {
      const term = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.68, 0.84), mats.solderBallSilver);
      term.position.x = dx;
      g.add(term);
    }
    const copperPour = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 1.8), mats.goldPlating);
    copperPour.position.y = -0.35;
    g.add(ntc, copperPour);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-second-ntc-pcb-sensor',
        44,
        '#f97316',
        g,
        new THREE.Vector3(-11.4, 21.5, -0.5),
        new THREE.Vector3(-78, 60, -10),
        cp
      )
    );
  }

  // =========================================================================
  // P45. Next-Gen 13.56 MHz NFC Contactless Health Telemetry Tag & Spiral Coil
  // =========================================================================
  {
    const g = new THREE.Group();
    const ferriteSheet = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(20.0, 15.0, 2.0), 0.22, 0.03, 0.03, 10),
      mats.pyroGraphite
    );
    // Concentric etched copper spiral antenna turns
    for (let t = 0; t < 4; t++) {
      const w = 18.2 - t * 2.0;
      const h = 13.2 - t * 2.0;
      const loop = new THREE.Mesh(
        extrudeCentered(createFrameShape(w, h, 1.4, w - 0.8, h - 0.8, 1.0), 0.14, 0.02, 0.02, 8),
        mats.copperCoil
      );
      loop.position.z = -0.18;
      g.add(loop);
    }
    const nfcIc = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 0.35), mats.icEpoxy);
    nfcIc.position.set(0, 0, -0.22);
    g.add(ferriteSheet, nfcIc);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-nfc-health-telemetry',
        45,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 4.0, -10.1),
        new THREE.Vector3(28, 18, -76),
        cp
      )
    );
  }

  // =========================================================================
  // P46. Silica Aerogel & Phlogopite Mica Inter-Cell Thermal Runaway Barrier
  // =========================================================================
  {
    const g = new THREE.Group();
    const aerogelCore = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(16.5, 42.5, 1.6), 0.7, 0.06, 0.06, 10),
      mats.ceramicAlumina
    );
    aerogelCore.rotation.y = Math.PI / 2;
    // Phlogopite mica flame-jet shields flanking both faces of the aerogel core
    for (const dx of [-0.45, 0.45]) {
      const mica = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 41.5, 15.5),
        mats.invarScaleBar
      );
      mica.position.x = dx;
      g.add(mica);
    }
    g.add(aerogelCore);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-aerogel-mica-barrier',
        46,
        '#f59e0b',
        g,
        new THREE.Vector3(0, -2.5, 0),
        new THREE.Vector3(0, -68, -4),
        cp
      )
    );
  }

  // =========================================================================
  // P47. Cold-Weather Self-Heating Polyimide Core-Heater Film (-20°C)
  // =========================================================================
  {
    const g = new THREE.Group();
    const kaptonWrap = new THREE.Mesh(
      new THREE.CylinderGeometry(9.26, 9.26, 28.0, 28, 1, true, -Math.PI * 0.65, Math.PI * 1.3),
      mats.polyimideFpc
    );
    // Serpentine heating trace rings around the polyimide sleeve
    for (let i = -3; i <= 3; i++) {
      const trace = new THREE.Mesh(
        new THREE.TorusGeometry(9.32, 0.14, 6, 24, Math.PI * 1.2),
        mats.copperHeatSpreader
      );
      trace.rotation.x = Math.PI / 2;
      trace.rotation.z = -Math.PI * 0.1;
      trace.position.y = i * 3.8;
      g.add(trace);
    }
    g.add(kaptonWrap);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-cold-polyimide-heater',
        47,
        '#f97316',
        g,
        new THREE.Vector3(-9.5, -2.5, 0),
        new THREE.Vector3(-84, 18, 36),
        cp
      )
    );
  }

  // =========================================================================
  // P48. Liquid Contact Indicator (LCI) & ePTFE Pressure-Equalizing Breather Vent
  // =========================================================================
  {
    const g = new THREE.Group();
    const breatherRing = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 0.35, 20),
      mats.matteBlackAnodized
    );
    breatherRing.rotation.z = Math.PI / 2;
    const eptfeMembrane = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 1.9, 0.42, 20),
      mats.ceramicAlumina
    );
    eptfeMembrane.rotation.z = Math.PI / 2;
    // White-to-red LCI water sensor sticker below the vent
    const lciPatch = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 4.2, 4.2),
      mats.ceramicAlumina
    );
    lciPatch.position.set(0, -5.2, 0);
    const lciDot = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 1.6, 1.6),
      mats.bodyRecRed
    );
    lciDot.position.set(-0.04, -5.2, 0);
    g.add(breatherRing, eptfeMembrane, lciPatch, lciDot);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-moisture-lci-breather',
        48,
        '#ef4444',
        g,
        new THREE.Vector3(-18.2, 10.5, -2.2),
        new THREE.Vector3(-86, 36, -34),
        cp
      )
    );
  }

  // =========================================================================
  // P49. BMS PCB Hydrophobic Conformal Coating (Anti-Condensation Shield)
  // =========================================================================
  {
    const g = new THREE.Group();
    const coatFilm = new THREE.Mesh(
      extrudeCentered(createRoundedRectShape(34.0, 9.8, 1.4), 0.32, 0.04, 0.04, 10),
      mats.fluorineCoatCyan
    );
    coatFilm.rotation.x = Math.PI / 2;
    g.add(coatFilm);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-conformal-pcb-coat',
        49,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 21.8, 0),
        new THREE.Vector3(0, 56, 62),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // P50. Cylindrical Cell Top Insulator Washer & Positive Barley-Paper Donut Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 8.6, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 5.0, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    // Exterior green/cyan highland barley-paper adhesive donut ring
    const outerDonut = new THREE.Mesh(
      extrudeCentered(shape, 0.32, 0.03, 0.03, 28),
      mats.sensorPcb
    );
    outerDonut.rotation.x = Math.PI / 2;
    outerDonut.position.y = 0.55;

    // Internal PBT top insulator washer seated above the jelly roll
    const innerWasher = new THREE.Mesh(
      extrudeCentered(shape, 0.45, 0.04, 0.04, 28),
      mats.mountPpsInsulator
    );
    innerWasher.rotation.x = Math.PI / 2;
    innerWasher.position.y = -2.2;
    g.add(outerDonut, innerWasher);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-cell-top-insulator-ring',
        50,
        '#16a34a',
        g,
        new THREE.Vector3(-9.5, 17.9, 0),
        new THREE.Vector3(-74, 48, 16),
        cp
      )
    );
  }

  // =========================================================================
  // P51. Cylindrical Cell Bottom Insulator Disc (Jelly-Roll Base Isolation)
  // =========================================================================
  {
    const g = new THREE.Group();
    const discShape = new THREE.Shape();
    discShape.absarc(0, 0, 8.4, 0, Math.PI * 2, false);
    const centerWeldHole = new THREE.Path();
    centerWeldHole.absarc(0, 0, 2.3, 0, Math.PI * 2, true);
    discShape.holes.push(centerWeldHole);
    const disc = new THREE.Mesh(
      extrudeCentered(discShape, 0.42, 0.04, 0.04, 28),
      mats.ceramicAlumina
    );
    disc.rotation.x = Math.PI / 2;
    g.add(disc);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-cell-bottom-insulator',
        51,
        '#e2e8f0',
        g,
        new THREE.Vector3(9.5, -23.3, 0),
        new THREE.Vector3(44, -66, 16),
        cp
      )
    );
  }

  // =========================================================================
  // P52. Steel Can Necking Bead Groove & Hermetic Roll-Crimp Seal
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rolled-in waist bead groove ring
    const grooveRing = new THREE.Mesh(
      new THREE.TorusGeometry(8.75, 0.55, 12, 32),
      mats.stainlessMachined
    );
    grooveRing.rotation.x = Math.PI / 2;
    // Top rolled-over hermetic double-crimp lip
    const crimpLip = new THREE.Mesh(
      new THREE.TorusGeometry(8.55, 0.42, 10, 32),
      mats.titaniumRivet
    );
    crimpLip.rotation.x = Math.PI / 2;
    crimpLip.position.y = 2.4;
    g.add(grooveRing, crimpLip);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-cell-crimp-bead-groove',
        52,
        '#94a3b8',
        g,
        new THREE.Vector3(-9.5, 15.6, 0),
        new THREE.Vector3(-92, 16, -6),
        cp
      )
    );
  }

  // =========================================================================
  // P53. Positive Terminal Top Cap Button with 4 Radial Exhaust Vent Holes
  // =========================================================================
  {
    const g = new THREE.Group();
    const flange = new THREE.Mesh(
      new THREE.CylinderGeometry(7.2, 7.6, 0.5, 28),
      mats.stainlessMachined
    );
    const domeTop = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 5.2, 1.25, 24),
      mats.solderBallSilver
    );
    domeTop.position.y = 0.8;
    // 4 radial gas exhaust vent cutouts around the skirt
    for (let k = 0; k < 4; k++) {
      const ang = (k * Math.PI) / 2;
      const vent = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.55, 0.6), mats.matteBlackAnodized);
      vent.position.set(Math.cos(ang) * 4.85, 0.52, Math.sin(ang) * 4.85);
      vent.rotation.y = -ang + Math.PI / 2;
      g.add(vent);
    }
    g.add(flange, domeTop);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-positive-cap-button',
        53,
        '#cbd5e1',
        g,
        new THREE.Vector3(9.5, 18.6, 0),
        new THREE.Vector3(88, 66, -24),
        cp
      )
    );
  }

  // =========================================================================
  // P54. Cell Bottom Negative Tab Resistance Spot-Weld Fusion Nugget
  // =========================================================================
  {
    const g = new THREE.Group();
    const negStrip = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.25, 8.6),
      mats.stainlessMachined
    );
    negStrip.position.z = 2.2;
    // Twin resistance spot-weld fusion nuggets at center of can bottom
    for (const dz of [-0.9, 0.9]) {
      const nugget = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.85, 0.42, 14),
        mats.goldPlating
      );
      nugget.position.set(0, -0.05, dz);
      g.add(nugget);
    }
    g.add(negStrip);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-bottom-neg-spotweld',
        54,
        '#facc15',
        g,
        new THREE.Vector3(9.5, -23.9, 0),
        new THREE.Vector3(24, -70, -34),
        cp
      )
    );
  }

  // =========================================================================
  // P55. Jelly-Roll Termination PP Tape & Tab-Edge Burr Protection Tape
  // =========================================================================
  {
    const g = new THREE.Group();
    // Electrolyte-proof green PP termination wrap band around outer jelly roll
    const endTape = new THREE.Mesh(
      new THREE.CylinderGeometry(8.42, 8.42, 34.0, 24, 1, true, 0.15, Math.PI * 0.42),
      mats.cfaGreen
    );
    // Vertical amber burr-guard tape strips covering tab weld edges
    const tabTape = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 12.0, 0.28),
      mats.polyimideFpc
    );
    tabTape.position.set(4.5, 9.5, 6.8);
    tabTape.rotation.y = 0.55;
    g.add(endTape, tabTape);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-jellyroll-end-tape',
        55,
        '#22c55e',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(114, 16, 20),
        cp
      )
    );
  }

  // =========================================================================
  // P56. Next-Gen 2025–2026 Tabless (All-Tab) Flower Collector Disc
  // =========================================================================
  {
    const g = new THREE.Group();
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(7.9, 7.9, 0.45, 28),
      mats.copperHeatSpreader
    );
    // 8 radial laser-welded flower petals + electrolyte wetting slots
    for (let k = 0; k < 8; k++) {
      const ang = (k * Math.PI) / 4;
      const petal = new THREE.Mesh(
        new THREE.BoxGeometry(5.8, 0.24, 1.25),
        mats.sinteredSilver
      );
      petal.position.set(Math.cos(ang) * 4.2, 0.3, Math.sin(ang) * 4.2);
      petal.rotation.y = -ang;
      g.add(petal);
    }
    const weldRing = new THREE.Mesh(
      new THREE.TorusGeometry(6.4, 0.16, 8, 28),
      mats.goldPlating
    );
    weldRing.rotation.x = Math.PI / 2;
    weldRing.position.y = 0.38;
    g.add(disc, weldRing);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-tabless-collector-disc',
        56,
        '#f59e0b',
        g,
        new THREE.Vector3(9.5, 14.8, 0),
        new THREE.Vector3(96, 36, -34),
        cp
      )
    );
  }

  // =========================================================================
  // P57. 12 μm High-Purity Al Cathode Foil & 6 μm Copper Anode Foil
  // =========================================================================
  {
    const g = new THREE.Group();
    // 12 um bare aluminum cathode foil cutaway arc
    const alFoil = new THREE.Mesh(
      new THREE.CylinderGeometry(7.75, 7.75, 36.5, 24, 1, true, -Math.PI * 0.4, Math.PI * 0.85),
      mats.silverElectrode
    );
    // 6 um bare copper anode foil cutaway arc slightly inside
    const cuFoil = new THREE.Mesh(
      new THREE.CylinderGeometry(6.85, 6.85, 37.5, 24, 1, true, -Math.PI * 0.35, Math.PI * 0.78),
      mats.copperCoil
    );
    g.add(alFoil, cuFoil);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-al-cu-current-foils',
        57,
        '#d97706',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(116, -30, 18),
        cp
      )
    );
  }

  // =========================================================================
  // P58. Electrode Binders (PVDF / SBR+CMC) & SWCNT Conductive Nanotube Web
  // =========================================================================
  {
    const g = new THREE.Group();
    // Cutaway active-material micro-matrix block with conductive SWCNT web ribs
    const matrixArc = new THREE.Mesh(
      new THREE.CylinderGeometry(6.15, 6.15, 34.0, 20, 1, true, -Math.PI * 0.28, Math.PI * 0.56),
      mats.pyroGraphite
    );
    // Spiderweb-like SWCNT nanotube filaments bridging electrode particles
    for (let i = -4; i <= 4; i++) {
      const strand = new THREE.Mesh(
        new THREE.TorusGeometry(6.22, 0.1, 6, 18, Math.PI * 0.54),
        mats.siliconSensorDie
      );
      strand.rotation.x = Math.PI / 2;
      strand.rotation.z = -Math.PI * 0.27;
      strand.position.y = i * 3.6;
      g.add(strand);
    }
    g.add(matrixArc);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-binder-conductive-cnt',
        58,
        '#0f766e',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(112, -46, -12),
        cp
      )
    );
  }

  // =========================================================================
  // P59. Next-Gen 2026 Semi-Solid-State Gel Polymer Electrolyte Matrix
  // =========================================================================
  {
    const g = new THREE.Group();
    const gelShell = new THREE.Mesh(
      new THREE.CylinderGeometry(5.15, 5.15, 35.0, 24, 1, true, -Math.PI * 0.45, Math.PI * 0.9),
      mats.vcWorkingFluidCyan
    );
    // Ceramic oxide LLZO/LATP stabilizing rings embedded in the gel network
    for (let i = -2; i <= 2; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(5.2, 0.14, 6, 20, Math.PI * 0.86),
        mats.aluminaHighKFilm
      );
      ring.rotation.x = Math.PI / 2;
      ring.rotation.z = -Math.PI * 0.43;
      ring.position.y = i * 6.8;
      g.add(ring);
    }
    g.add(gelShell);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-semisolid-gel-matrix',
        59,
        '#06b6d4',
        g,
        new THREE.Vector3(9.5, -2.8, 0),
        new THREE.Vector3(72, -32, 46),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // P60. Cell Can-Bottom Secondary Pressure-Relief Score & Laser Cell ID
  // =========================================================================
  {
    const g = new THREE.Group();
    const bottomCap = new THREE.Mesh(
      new THREE.CylinderGeometry(8.5, 8.3, 0.45, 28),
      mats.stainlessMachined
    );
    // C-shaped secondary safety burst score groove stamped into steel bottom
    const scoreRing = new THREE.Mesh(
      new THREE.TorusGeometry(5.8, 0.2, 8, 24, Math.PI * 1.65),
      mats.mountRedIndexDot
    );
    scoreRing.rotation.x = Math.PI / 2;
    scoreRing.position.y = -0.24;
    // Laser-etched grade stamp bar
    const idBar = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.14, 1.4),
      mats.matteBlackAnodized
    );
    idBar.position.y = -0.26;
    g.add(bottomCap, scoreRing, idBar);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-can-bottom-vent-valve',
        60,
        '#be123c',
        g,
        new THREE.Vector3(-9.5, -24.2, 0),
        new THREE.Vector3(-64, -64, -46),
        cp
      )
    );
  }

  return parts;
}
