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
  buildShieldedInductor,
  buildSmdPassive,
  buildSpotWeldNuggets,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeBatteryUltra27Part(
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
 * Phase 27A — Standalone Camera Battery Pack Ultra-Deep Expansion (+30 Parts P31–P60 -> 60 Total).
 * Anatomically seated inside the true 1:1 mm NP-FZ100 envelope (38.7 × 51.7 × 22.7 mm),
 * with watchmaker-grade SMD IC packages, genuine rear laser traceability plate, and non-overlapping 6-way explodes.
 */
export function buildBatteryUltra27Parts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // P31. Phosphor-Bronze Bifurcated Twin-Wipe Contact Springs (4-Pin Internal Clips)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pinXs = [-6.0, -2.0, 2.0, 6.0];
    for (const px of pinXs) {
      // Twin U-shaped curved phosphor-bronze spring clips gripping the camera terminal blade
      for (const dz of [-0.52, 0.52]) {
        for (const dx of [-0.28, 0.28]) {
          const finger = new THREE.Mesh(
            createChamferedBoxGeo(0.4, 3.05, 0.22, 0.08, 0.03, 'z'),
            mats.beCuSpring
          );
          finger.position.set(px + dx, 0, dz);
          finger.rotation.x = dz > 0 ? 0.16 : -0.16;
          // Curved entry wipe dimple tip
          const tip = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.4, 10), mats.goldPlating);
          tip.rotation.z = Math.PI / 2;
          tip.position.set(px + dx, 1.32, dz * 0.72);
          tip.userData.noEdges = true;
          g.add(finger, tip);
        }
      }
      const bridge = new THREE.Mesh(
        createChamferedBoxGeo(1.52, 0.46, 1.36, 0.14, 0.04, 'y'),
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
      extrudeHiRes(createRoundedRectShape(3.0, 10.6, 0.7), 4.2, 0.14, 0.14, 2, 16),
      u.batPolycarbonateShell
    );
    const pocket = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 3.8, 3.2, 0.25, 0.06, 'z'),
      mats.matteBlackAnodized
    );
    pocket.position.set(-0.7, 1.8, 0);
    // Molded ergonomic glove-extraction knurl ridges (authentic Sony subtle charcoal grip ribs)
    for (let i = 0; i < 5; i++) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(0.44, 0.48, 3.7, 0.12, 0.04, 'z'),
        mats.cinnabarAnodized
      );
      rib.position.set(-1.35, -4.4 + i * 0.95, 0);
      rib.userData.noEdges = true;
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
      extrudeHiRes(createFrameShape(9.5, 3.9, 1.5, 8.2, 2.7, 0.95), 1.4, 0.12, 0.12, 2, 22),
      mats.stainlessMachined
    );
    bezel.rotation.y = Math.PI / 2;

    // Matte charcoal IP54 elastomeric silicone sealing plug + flush pull-nail lip (replaces bright blue tether!)
    const plugBody = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(8.05, 2.55, 0.95), 1.65, 0.14, 0.14, 2, 20),
      u.micRubberBootBlack
    );
    plugBody.rotation.y = Math.PI / 2;
    plugBody.position.x = 0.55;

    const tether = new THREE.Mesh(
      createChamferedBoxGeo(0.55, 3.6, 1.4, 0.35, 0.08, 'z'),
      u.micRubberBootBlack
    );
    tether.position.set(0.35, -3.0, 0);
    g.add(bezel, plugBody, tether);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-usbc-silicone-dustplug',
        33,
        '#475569',
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
    // Genuine laser-etched rear traceability recess plate (20250918 / LOT Z25J-04 / 2INR19/51 83g / ▲ INSERT + T S -)
    const plateW = 26.8;
    const plateH = 16.4;
    const plateGeo = extrudeHiRes(createRoundedRectShape(plateW, plateH, 1.4), 0.24, 0.04, 0.04, 1, 18);
    applyPlanarUVs(plateGeo, plateW, plateH, 'xy-back');
    const basePlate = new THREE.Mesh(plateGeo, u.batRearLaser);

    // Subtle molded dark recess border frame around laser-etched window
    const border = new THREE.Mesh(
      extrudeHiRes(createFrameShape(plateW + 0.8, plateH + 0.8, 1.6, plateW - 0.1, plateH - 0.1, 1.3), 0.18, 0.03, 0.03, 1, 16),
      mats.matteBlackAnodized
    );
    border.position.z = 0.04;
    border.userData.noEdges = true;
    g.add(basePlate, border);

    parts.push(
      finalizeBatteryUltra27Part(
        'bat-laser-datamatrix-lot',
        34,
        '#94a3b8',
        g,
        new THREE.Vector3(0, -10.5, -11.46),
        new THREE.Vector3(-26, -34, -76),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P35. PORON Shock-Absorbing Urethane Foam Bumper & Swelling Cushion
  // =========================================================================
  {
    const g = new THREE.Group();
    const bottomPad = makeHiResHorizPlate(
      createRoundedRectShape(34.6, 16.6, 3.2),
      1.32,
      u.micAcousticFelt,
      0.16,
      2,
      20
    );
    // Side elastomeric cell-swelling cushion strips flanking both 18500 barrels
    for (const sx of [-18.0, 18.0]) {
      const sidePad = new THREE.Mesh(
        createChamferedBoxGeo(0.92, 26.0, 8.2, 0.45, 0.1, 'y'),
        u.micAcousticFelt
      );
      sidePad.position.set(sx, 14.0, 0);
      g.add(sidePad);
    }
    g.add(bottomPad);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-swelling-foam-bumper',
        35,
        '#334155',
        g,
        new THREE.Vector3(0, -24.1, 0),
        new THREE.Vector3(-24, -64, 24),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P36. Independent Hardware Secondary OVP Protection IC (TI BQ2920x / S-8209)
  // =========================================================================
  {
    const g = new THREE.Group();
    const ovp = buildChipPackage({
      w: 3.3,
      d: 2.6,
      h: 0.85,
      style: 'soic',
      pinsPerSide: 3,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.mountRedIndexDot,
      axis: 'y',
    });
    g.add(ovp);
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
      const diode = buildSmdPassive(
        1.55,
        0.88,
        0.64,
        u.icEpoxyLaser,
        mats.silverElectrode,
        'y',
        mats.varistorRingBlue
      );
      diode.position.set(dx, 0, 0);
      g.add(diode);
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
    const ldo = buildChipPackage({
      w: 2.85,
      d: 2.05,
      h: 0.8,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    const refCap = buildSmdPassive(1.3, 0.72, 0.56, mats.smdCeramic, mats.silverElectrode, 'y');
    refCap.position.set(2.4, -0.1, 0);
    g.add(ldo, refCap);
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
    const eeprom = buildChipPackage({
      w: 3.5,
      d: 2.85,
      h: 0.78,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    g.add(eeprom);
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
    const fet = buildChipPackage({
      w: 2.65,
      d: 2.2,
      h: 0.76,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      axis: 'y',
    });
    const res = buildSmdPassive(1.7, 0.92, 0.52, mats.matteBlackAnodized, mats.copperHeatSpreader, 'y');
    res.position.set(2.55, -0.1, 0);
    g.add(fet, res);
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
    const inductor = buildShieldedInductor(
      4.4,
      2.05,
      mats.ferriteInductor,
      mats.silverElectrode,
      mats.silverElectrode,
      'y'
    );
    const ccIc = buildChipPackage({
      w: 2.7,
      d: 2.7,
      h: 0.78,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    ccIc.position.set(-4.35, -0.35, 0);

    const tantCap = buildTantalumCap(
      2.0,
      1.25,
      0.88,
      mats.tantalumCapYellow,
      mats.cinnabarAnodized,
      mats.silverElectrode,
      'y'
    );
    tantCap.position.set(0, -0.45, 3.25);
    g.add(inductor, ccIc, tantCap);
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
      const bead = buildSmdPassive(1.18, 0.62, 0.56, mats.ferriteInductor, mats.silverElectrode, 'y');
      bead.position.set(-2.4 + i * 1.6, 0, -0.55);
      const cap = buildSmdPassive(0.98, 0.56, 0.46, mats.smdCeramic, mats.silverElectrode, 'y');
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
    const carrier = new THREE.Mesh(
      createChamferedBoxGeo(18.2, 0.16, 2.5, 0.35, 0.02, 'y'),
      u.batBmsPcb
    );
    g.add(carrier);
    for (let i = 0; i < 8; i++) {
      const pad = new THREE.Mesh(hiResCyl(0.64, 0.64, 0.24, 20), mats.goldPlating);
      pad.position.set(-7.7 + i * 2.2, -0.08, i % 2 === 0 ? -0.45 : 0.45);
      pad.userData.noEdges = true;
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
    const ntc = buildSmdPassive(1.55, 0.85, 0.68, mats.copperHeatSpreader, mats.silverElectrode, 'y');
    const copperPour = new THREE.Mesh(
      createChamferedBoxGeo(2.7, 0.12, 1.85, 0.25, 0.02, 'y'),
      mats.goldPlating
    );
    copperPour.position.y = -0.36;
    copperPour.userData.noEdges = true;
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
      extrudeHiRes(createRoundedRectShape(20.2, 15.2, 2.2), 0.24, 0.04, 0.04, 1, 18),
      mats.pyroGraphite
    );
    // 5-turn etched precision copper spiral antenna loops
    for (let t = 0; t < 5; t++) {
      const w = 18.6 - t * 1.75;
      const h = 13.6 - t * 1.75;
      const loop = new THREE.Mesh(
        extrudeHiRes(createFrameShape(w, h, 1.5, w - 0.68, h - 0.68, 1.15), 0.14, 0.02, 0.02, 1, 16),
        mats.copperCoil
      );
      loop.position.z = -0.18;
      loop.userData.noEdges = true;
      g.add(loop);
    }
    const nfcIc = buildChipPackage({
      w: 2.6,
      d: 2.6,
      h: 0.36,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      axis: 'z',
    });
    nfcIc.position.set(0, 0, -0.26);
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
      extrudeHiRes(createRoundedRectShape(16.6, 42.6, 1.8), 0.72, 0.08, 0.08, 2, 16),
      u.micEptfeMembrane
    );
    aerogelCore.rotation.y = Math.PI / 2;
    // Phlogopite mica flame-jet shields flanking both faces of the silica aerogel mat
    for (const dx of [-0.46, 0.46]) {
      const mica = new THREE.Mesh(
        createChamferedBoxGeo(0.16, 41.6, 15.6, 0.8, 0.03, 'y'),
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
      hiResCyl(9.26, 9.26, 28.0, 36, true, -Math.PI * 0.65, Math.PI * 1.3),
      mats.polyimideFpc
    );
    // Etched serpentine copper resistive heater traces laminated inside Kapton wrap
    for (let i = -3; i <= 3; i++) {
      const trace = new THREE.Mesh(
        hiResTorus(9.32, 0.13, 8, 32, Math.PI * 1.2),
        mats.copperHeatSpreader
      );
      trace.rotation.x = Math.PI / 2;
      trace.rotation.z = -Math.PI * 0.1;
      trace.position.y = i * 3.8;
      trace.userData.noEdges = true;
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
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P48. Liquid Contact Indicator (LCI) & ePTFE Pressure-Equalizing Breather Vent
  // =========================================================================
  {
    const g = new THREE.Group();
    const breatherRing = new THREE.Mesh(hiResCyl(2.65, 2.65, 0.34, 28), u.micRubberBootBlack);
    breatherRing.rotation.z = Math.PI / 2;

    const eptfeGeo = hiResCyl(1.92, 1.92, 0.42, 28);
    const eptfeMembrane = new THREE.Mesh(eptfeGeo, u.micEptfeMembrane);
    eptfeMembrane.rotation.z = Math.PI / 2;
    eptfeMembrane.userData.noEdges = true;

    // White-to-red LCI water-ingress sensor sticker below breather vent
    const lciPatch = new THREE.Mesh(
      createChamferedBoxGeo(0.22, 4.3, 4.3, 0.45, 0.03, 'y'),
      mats.ceramicAlumina
    );
    lciPatch.position.set(0, -5.2, 0);
    const lciDot = new THREE.Mesh(hiResCyl(0.92, 0.92, 0.28, 20), mats.bodyRecRed);
    lciDot.rotation.z = Math.PI / 2;
    lciDot.position.set(-0.04, -5.2, 0);
    lciDot.userData.noEdges = true;
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
    // Crisp hydrophobic acrylic conformal coat perimeter seal (keeps BMS PCB markings sharp & clear!)
    const coatRim = makeHiResHorizPlate(
      createFrameShape(34.0, 10.6, 1.4, 31.8, 8.4, 1.0),
      0.24,
      mats.fluorineCoatCyan,
      0.04,
      1,
      20
    );
    const coatFilm = makeHiResHorizPlate(
      createRoundedRectShape(32.0, 8.6, 1.0),
      0.08,
      mats.opticalCementClear,
      0.02,
      1,
      16
    );
    coatFilm.userData.noEdges = true;
    g.add(coatRim, coatFilm);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-conformal-pcb-coat',
        49,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 21.8, 0),
        new THREE.Vector3(0, 56, 62),
        cp,
        0.14
      )
    );
  }

  // =========================================================================
  // P50. Cylindrical Cell Top Insulator Washer & Positive Barley-Paper Donut Ring
  // =========================================================================
  {
    const g = new THREE.Group();
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 8.62, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 5.0, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    // Exterior green highland barley-paper adhesive donut ring
    const outerDonut = makeHiResHorizPlate(shape, 0.34, mats.sensorPcb, 0.04, 1, 34);
    outerDonut.position.y = 0.55;

    // Internal PBT top insulator washer seated above the jelly roll
    const innerWasher = makeHiResHorizPlate(shape, 0.45, mats.mountPpsInsulator, 0.05, 1, 34);
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
    discShape.absarc(0, 0, 8.42, 0, Math.PI * 2, false);
    const centerWeldHole = new THREE.Path();
    centerWeldHole.absarc(0, 0, 2.32, 0, Math.PI * 2, true);
    discShape.holes.push(centerWeldHole);
    const disc = makeHiResHorizPlate(discShape, 0.42, mats.ceramicAlumina, 0.05, 1, 34);
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
    const grooveRing = new THREE.Mesh(hiResTorus(8.75, 0.52, 14, 40), mats.stainlessMachined);
    grooveRing.rotation.x = Math.PI / 2;
    // Top rolled-over hermetic double-crimp lip
    const crimpLip = new THREE.Mesh(hiResTorus(8.55, 0.42, 12, 40), mats.titaniumRivet);
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
    const prof: THREE.Vector2[] = [
      new THREE.Vector2(0.01, 1.45),
      new THREE.Vector2(4.2, 1.45),
      new THREE.Vector2(4.55, 1.15),
      new THREE.Vector2(5.15, 0.25),
      new THREE.Vector2(7.55, 0.22),
      new THREE.Vector2(7.55, -0.25),
      new THREE.Vector2(0.01, -0.25),
    ];
    const capGeo = markHiRes(new THREE.LatheGeometry(prof, 38));
    capGeo.computeVertexNormals();
    const capMesh = new THREE.Mesh(capGeo, mats.silverElectrode);

    // 4 recessed radial gas exhaust vent ports around cap skirt
    for (let k = 0; k < 4; k++) {
      const ang = (k * Math.PI) / 2;
      const vent = new THREE.Mesh(
        createChamferedBoxGeo(1.45, 0.56, 0.62, 0.14, 0.03, 'y'),
        mats.matteBlackAnodized
      );
      vent.position.set(Math.cos(ang) * 4.88, 0.56, Math.sin(ang) * 4.88);
      vent.rotation.y = -ang + Math.PI / 2;
      g.add(vent);
    }
    g.add(capMesh);
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
      createChamferedBoxGeo(3.25, 0.26, 8.8, 0.45, 0.04, 'y'),
      mats.stainlessMachined
    );
    negStrip.position.z = 2.2;
    const welds = buildSpotWeldNuggets(
      [
        [0, -0.1, -0.95],
        [0, -0.1, 0.95],
      ],
      0.72,
      'y',
      mats.brassGear,
      mats.goldPlating
    );
    g.add(negStrip, welds);
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
    const endTape = new THREE.Mesh(
      hiResCyl(8.42, 8.42, 34.0, 34, true, 0.15, Math.PI * 0.42),
      mats.cfaGreen
    );
    const tabTape = new THREE.Mesh(
      createChamferedBoxGeo(2.6, 12.2, 0.26, 0.25, 0.03, 'z'),
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
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P56. Next-Gen 2025–2026 Tabless (All-Tab) Flower Collector Disc
  // =========================================================================
  {
    const g = new THREE.Group();
    const discShape = new THREE.Shape();
    discShape.absarc(0, 0, 7.95, 0, Math.PI * 2, false);
    const centerHole = new THREE.Path();
    centerHole.absarc(0, 0, 1.85, 0, Math.PI * 2, true);
    discShape.holes.push(centerHole);
    const disc = makeHiResHorizPlate(discShape, 0.44, mats.copperHeatSpreader, 0.05, 1, 36);

    // 8 radial laser-welded flower collector petals + electrolyte wetting channels
    for (let k = 0; k < 8; k++) {
      const ang = (k * Math.PI) / 4;
      const petal = new THREE.Mesh(
        createChamferedBoxGeo(5.6, 0.26, 1.32, 0.22, 0.04, 'y'),
        mats.sinteredSilver
      );
      petal.position.set(Math.cos(ang) * 4.45, 0.3, Math.sin(ang) * 4.45);
      petal.rotation.y = -ang;
      g.add(petal);
    }
    const weldRing = new THREE.Mesh(hiResTorus(6.45, 0.16, 10, 36), mats.goldPlating);
    weldRing.rotation.x = Math.PI / 2;
    weldRing.position.y = 0.4;
    weldRing.userData.noEdges = true;
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
    const alFoil = new THREE.Mesh(
      hiResCyl(7.75, 7.75, 36.5, 32, true, -Math.PI * 0.4, Math.PI * 0.85),
      mats.silverElectrode
    );
    const cuFoil = new THREE.Mesh(
      hiResCyl(6.85, 6.85, 37.5, 32, true, -Math.PI * 0.35, Math.PI * 0.78),
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
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P58. Electrode Binders (PVDF / SBR+CMC) & SWCNT Conductive Nanotube Web
  // =========================================================================
  {
    const g = new THREE.Group();
    const matrixArc = new THREE.Mesh(
      hiResCyl(6.15, 6.15, 34.0, 28, true, -Math.PI * 0.28, Math.PI * 0.56),
      u.batElectrodeCoating
    );
    for (let i = -4; i <= 4; i++) {
      const strand = new THREE.Mesh(
        hiResTorus(6.22, 0.1, 8, 24, Math.PI * 0.54),
        mats.siliconSensorDie
      );
      strand.rotation.x = Math.PI / 2;
      strand.rotation.z = -Math.PI * 0.27;
      strand.position.y = i * 3.6;
      strand.userData.noEdges = true;
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
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P59. Next-Gen 2026 Semi-Solid-State Gel Polymer Electrolyte Matrix
  // =========================================================================
  {
    const g = new THREE.Group();
    const gelShell = new THREE.Mesh(
      hiResCyl(5.15, 5.15, 35.0, 32, true, -Math.PI * 0.45, Math.PI * 0.9),
      mats.vcWorkingFluidCyan
    );
    for (let i = -2; i <= 2; i++) {
      const ring = new THREE.Mesh(
        hiResTorus(5.2, 0.14, 8, 28, Math.PI * 0.86),
        mats.aluminaHighKFilm
      );
      ring.rotation.x = Math.PI / 2;
      ring.rotation.z = -Math.PI * 0.43;
      ring.position.y = i * 6.8;
      ring.userData.noEdges = true;
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
        0.15
      )
    );
  }

  // =========================================================================
  // P60. Cell Can-Bottom Secondary Pressure-Relief Score & Laser Cell ID
  // =========================================================================
  {
    const g = new THREE.Group();
    const bottomCap = new THREE.Mesh(hiResCyl(8.52, 8.32, 0.45, 38), mats.stainlessMachined);
    // C-shaped stamped safety pressure-relief score groove in steel bottom
    const scoreRing = new THREE.Mesh(
      hiResTorus(5.8, 0.2, 10, 32, Math.PI * 1.65),
      mats.mountRedIndexDot
    );
    scoreRing.rotation.x = Math.PI / 2;
    scoreRing.position.y = -0.24;
    scoreRing.userData.noEdges = true;
    const idBar = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 0.14, 1.45, 0.2, 0.02, 'y'),
      mats.matteBlackAnodized
    );
    idBar.position.y = -0.26;
    idBar.userData.noEdges = true;
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

  // =========================================================================
  // P61. Ultrasonic-Welded Bi-Metal Nickel-Clad-Aluminum (Al-Ni) Transition Strip
  // =========================================================================
  {
    const g = new THREE.Group();
    // Half pure aluminum (cathode side) + half pure nickel (busbar side) clad bi-metal transition strip
    const alHalf = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 0.34, 4.4, 0.35, 0.04, 'y'),
      mats.silverElectrode
    );
    alHalf.position.x = -2.5;
    const niHalf = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 0.34, 4.4, 0.35, 0.04, 'y'),
      mats.stainlessMachined
    );
    niHalf.position.x = 2.5;
    // Roll-bonded cold-clad fusion seam line + twin ultrasonic weld dimples
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.38, 4.35), mats.goldPlating);
    seam.userData.noEdges = true;
    const welds = buildSpotWeldNuggets(
      [
        [-2.8, 0.2, -1.0],
        [-2.8, 0.2, 1.0],
        [2.8, 0.2, -1.0],
        [2.8, 0.2, 1.0],
      ],
      0.42,
      'y',
      mats.brassGear,
      mats.silverElectrode
    );
    g.add(alHalf, niHalf, seam, welds);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-bimetal-al-ni-strip',
        61,
        '#94a3b8',
        g,
        new THREE.Vector3(9.5, 19.25, 0),
        new THREE.Vector3(62, 68, 22),
        cp
      )
    );
  }

  // =========================================================================
  // P62. 3-oz Heavy Stamped Copper BMS High-Current Bus & 4-Wire Kelvin Bridge
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heavy 3-oz stamped pure copper current busbar carrying 8A peak shutter/IBIS bursts across BMS
    const mainBus = new THREE.Mesh(
      createChamferedBoxGeo(26.4, 0.42, 2.2, 0.4, 0.05, 'y'),
      mats.copperHeatSpreader
    );
    // 4-wire Kelvin differential micro-sense bridge tabs tapping the R005 shunt cleanly
    for (const sx of [-3.4, 3.4]) {
      const kelvin = new THREE.Mesh(
        createChamferedBoxGeo(0.55, 0.18, 4.2, 0.1, 0.02, 'y'),
        mats.goldPlating
      );
      kelvin.position.set(sx, 0.22, -2.4);
      kelvin.userData.noEdges = true;
      g.add(kelvin);
    }
    for (const sx of [-12.2, 12.2]) {
      const lug = new THREE.Mesh(hiResCyl(1.15, 1.15, 0.48, 20), mats.goldPlating);
      lug.position.set(sx, 0, 0);
      lug.userData.noEdges = true;
      g.add(lug);
    }
    g.add(mainBus);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-bms-copper-shunt-bus',
        62,
        '#ea580c',
        g,
        new THREE.Vector3(0, 20.1, -1.6),
        new THREE.Vector3(0, 82, -24),
        cp
      )
    );
  }

  // =========================================================================
  // P63. Ultrasonic Shear-Joint Splash Seal & Terminal Header Silicone Bead
  // =========================================================================
  {
    const g = new THREE.Group();
    // Perimeter interlocking tongue-and-groove ultrasonic shear-joint ring along shell mid-seam
    const shearRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(38.1, 51.1, 4.0, 36.7, 49.7, 3.4), 0.72, 0.08, 0.08, 2, 24),
      u.micRubberBootBlack
    );
    // Opaque elastomer moisture-barrier collar bead isolating the 4-pin top terminal header pocket
    const topBead = makeHiResHorizPlate(
      createFrameShape(23.2, 6.8, 1.0, 21.4, 5.0, 0.65),
      0.48,
      mats.epdmGasket,
      0.06,
      2,
      18
    );
    topBead.position.set(0, 23.6, 0);
    g.add(shearRing, topBead);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-ultrasonic-seal-gasket',
        63,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-48, 12, 54),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // P64. Hermetic Laser-Welded Stainless Electrolyte-Injection Sealing Ball Plug
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision machined stainless vacuum electrolyte-injection port boss
    const portCollar = new THREE.Mesh(hiResTorus(1.42, 0.34, 12, 28), mats.stainlessMachined);
    portCollar.rotation.x = Math.PI / 2;
    // Hermetic press-fit & laser-welded stainless sealing ball plug + heat-affected weld ring
    const steelBall = new THREE.Mesh(hiResSphere(1.15, 22, 16), mats.silverElectrode);
    steelBall.position.y = 0.25;
    const weldHalo = new THREE.Mesh(hiResTorus(1.18, 0.14, 10, 26), mats.goldPlating);
    weldHalo.rotation.x = Math.PI / 2;
    weldHalo.position.y = 0.28;
    weldHalo.userData.noEdges = true;
    g.add(portCollar, steelBall, weldHalo);
    parts.push(
      finalizeBatteryUltra27Part(
        'bat-cell-electrolyte-fill-ball',
        64,
        '#cbd5e1',
        g,
        new THREE.Vector3(-9.5, 18.7, 3.2),
        new THREE.Vector3(-56, 72, 34),
        cp
      )
    );
  }

  // =========================================================================
  // P65. Camera-Side Battery Chamber 4-Blade Gold Terminal Header & Ejector Plunger
  // =========================================================================
  {
    const g = new THREE.Group();
    // Low-profile precision cutaway of the α7 IV battery chamber terminal header engaged cleanly into P04/P05!
    const headerBar = new THREE.Mesh(
      createChamferedBoxGeo(23.2, 1.45, 5.2, 0.45, 0.1, 'y'),
      mats.mountPpsInsulator
    );
    headerBar.position.y = 0.72;
    // 4 precision hard-gold-plated camera-side contact blades seated cleanly inside the 4 bifurcated slots (+/T/S/-)
    for (const px of [-7.5, -2.5, 2.5, 7.5]) {
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(0.56, 3.1, 2.6, 0.12, 0.04, 'z'),
        mats.goldPlating
      );
      blade.position.set(px, -0.95, 0);
      g.add(blade);
    }
    // Compact spring-loaded POM ejector bumper flush beside the header bar with neat dark guide cap
    const plunger = new THREE.Mesh(hiResCyl(0.82, 0.88, 1.15, 18), mats.matteBlackAnodized);
    plunger.position.set(13.2, 0.05, 0);
    const plungerCap = new THREE.Mesh(hiResCyl(1.02, 1.02, 0.32, 18), mats.titaniumRivet);
    plungerCap.position.set(13.2, 0.68, 0);
    plungerCap.userData.noEdges = true;
    for (let i = 0; i < 2; i++) {
      const coil = new THREE.Mesh(hiResTorus(0.95, 0.11, 8, 18), mats.stainlessMachined);
      coil.rotation.x = Math.PI / 2;
      coil.position.set(13.2, 0.12 + i * 0.32, 0);
      coil.userData.noEdges = true;
      g.add(coil);
    }
    g.add(headerBar, plunger, plungerCap);

    parts.push(
      finalizeBatteryUltra27Part(
        'bat-camera-pogo-mating-pins',
        65,
        '#eab308',
        g,
        new THREE.Vector3(0, 26.15, 0),
        new THREE.Vector3(0, 86, 18),
        cp
      )
    );
  }

  // =========================================================================
  // P66. 2S Midpoint Voltage-Sense (BM) Protective Series Resistor & RC Filter
  // =========================================================================
  {
    const g = new THREE.Group();
    // Flame-proof 100-ohm 0805 current-limiting sense resistor protecting the 2S BM balance tap
    const senseRes = buildSmdPassive(3.1, 1.55, 0.78, mats.matteBlackAnodized, mats.silverElectrode, 'y');
    senseRes.position.set(-1.7, 0, 0);
    // Low-ESR X7R 0603 anti-aliasing RC filter capacitor smoothing midpoint voltage measurement
    const filterCap = buildSmdPassive(2.15, 1.2, 0.72, mats.smdCeramic, mats.silverElectrode, 'y');
    filterCap.position.set(1.75, 0, 0);
    // Gold micro-trace bus linking resistor to capacitor
    const link = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.14, 0.7), mats.goldPlating);
    link.position.set(0.05, -0.34, 0);
    link.userData.noEdges = true;
    g.add(senseRes, filterCap, link);

    parts.push(
      finalizeBatteryUltra27Part(
        'bat-cell-matching-divider',
        66,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 21.45, -5.2),
        new THREE.Vector3(24, 72, -52),
        cp
      )
    );
  }

  // =========================================================================
  // P67. High-Temp Molded Nomex Aramid Bottom-Cell Dielectric Cup & Anti-Arc Barrier
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision die-cut cream-white Nomex 410 aramid bottom insulating cradle shielding busbar from steel cans!
    const basePlate = makeHiResHorizPlate(
      createRoundedRectShape(35.4, 17.6, 4.4),
      0.46,
      mats.ceramicAlumina,
      0.06,
      2,
      24
    );
    // Central raised anti-arc barrier fin separating left & right cell bottom rims
    const arcFin = new THREE.Mesh(
      createChamferedBoxGeo(0.75, 4.4, 15.8, 0.25, 0.05, 'y'),
      mats.ceramicAlumina
    );
    arcFin.position.y = 2.3;
    // Dual perimeter dielectric rim cuffs hugging the base of both 18500 cells
    for (const cx of [-9.5, 9.5]) {
      const cuff = new THREE.Mesh(hiResTorus(8.95, 0.36, 10, 34), mats.lcdDiffuserMatte);
      cuff.rotation.x = Math.PI / 2;
      cuff.position.set(cx, 0.45, 0);
      cuff.userData.noEdges = true;
      g.add(cuff);
    }
    g.add(basePlate, arcFin);

    parts.push(
      finalizeBatteryUltra27Part(
        'bat-cell-insulation-collar',
        67,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, -23.15, 0),
        new THREE.Vector3(-24, -76, 18),
        cp
      )
    );
  }

  // =========================================================================
  // P68. 32.768 kHz Ultra-Low-Power RTC Watch Crystal (InfoLITHIUM Calendar Aging Timer)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Miniature 2012 ceramic SMD tuning-fork 32.768 kHz watch crystal + seam-welded gold lid
    const cerBase = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 0.42, 1.75, 0.2, 0.04, 'y'),
      mats.ceramicAlumina
    );
    const goldLid = new THREE.Mesh(
      createChamferedBoxGeo(2.85, 0.46, 1.4, 0.16, 0.05, 'y'),
      mats.goldPlating
    );
    goldLid.position.y = 0.38;
    // Twin 12 pF C0G load capacitors flanking the watch crystal
    for (const sx of [-1.2, 1.2]) {
      const cl = buildSmdPassive(1.15, 0.62, 0.46, mats.smdCeramic, mats.silverElectrode, 'y');
      cl.position.set(sx, 0.04, 1.55);
      g.add(cl);
    }
    g.add(cerBase, goldLid);

    parts.push(
      finalizeBatteryUltra27Part(
        'bat-bms-crystal-osc',
        68,
        '#facc15',
        g,
        new THREE.Vector3(-10.6, 21.45, 2.2),
        new THREE.Vector3(-52, 74, 44),
        cp
      )
    );
  }

  // =========================================================================
  // P69. Hardware Ultra-Fast Microsecond Short-Circuit Comparator (SCD < 250 us Latch)
  // =========================================================================
  {
    const g = new THREE.Group();
    const scdIc = buildChipPackage({
      w: 3.2,
      d: 2.35,
      h: 0.86,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.bodyRecRed,
      axis: 'y',
    });
    // Precision 0.1% thin-film SCD trip-threshold voltage divider resistors
    for (const sx of [-1.1, 1.1]) {
      const rThin = buildSmdPassive(1.3, 0.68, 0.46, mats.mountShimBlue, mats.silverElectrode, 'y');
      rThin.position.set(sx, -0.18, 2.05);
      g.add(rThin);
    }
    g.add(scdIc);

    parts.push(
      finalizeBatteryUltra27Part(
        'bat-bms-current-comparator',
        69,
        '#dc2626',
        g,
        new THREE.Vector3(-4.6, 21.45, -3.2),
        new THREE.Vector3(-32, 76, -48),
        cp
      )
    );
  }

  // =========================================================================
  // P70. Internal Structural Crush-Rib Lattice & Cell-Alignment Bosses
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded UL94 V-0 honeycomb crush-absorbing side ribs & curved twin-barrel cell-locating gussets
    for (const sx of [-17.8, 17.8]) {
      const spine = new THREE.Mesh(
        createChamferedBoxGeo(0.72, 39.2, 8.2, 0.24, 0.06, 'y'),
        u.batPolycarbonateShell
      );
      spine.position.set(sx, 0, 0);
      g.add(spine);
      for (let i = -3; i <= 3; i++) {
        const gusset = new THREE.Mesh(
          createChamferedBoxGeo(1.65, 0.62, 7.6, 0.16, 0.04, 'y'),
          mats.matteBlackAnodized
        );
        gusset.position.set(sx - Math.sign(sx) * 0.72, i * 5.2, 0);
        gusset.userData.noEdges = true;
        g.add(gusset);
      }
    }
    // Central vertical hourglass crush-brace spine cradling both 18500 cylinders
    for (const sz of [-8.4, 8.4]) {
      const centerRib = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 37.0, 0.85, 0.25, 0.06, 'z'),
        u.batPolycarbonateShell
      );
      centerRib.position.set(0, 0, sz);
      g.add(centerRib);
    }

    parts.push(
      finalizeBatteryUltra27Part(
        'bat-pc-flame-retardant-ribs',
        70,
        '#475569',
        g,
        new THREE.Vector3(0, -2.2, 0),
        new THREE.Vector3(56, -24, 58),
        cp,
        0.18
      )
    );
  }

  return parts;
}
