import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { createFrameShape } from '../../engine/CadHelpers';
import {
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import {
  addMetrologyPedestal,
  addVectorArrow,
  createHexShape,
  createTrapezoidShape,
  finalizeWave3Part,
  makeBondStrut,
} from './bionzV2Wave3PartsA';

/** Helper for a single triangular boiling petal of the LPBF Hexagonal Porous Copper Wick (X2-105) */
function createTriPetalShape(rIn: number, rOut: number, halfAngle: number): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(Math.cos(-halfAngle) * rIn, Math.sin(-halfAngle) * rIn);
  s.lineTo(Math.cos(-halfAngle) * rOut, Math.sin(-halfAngle) * rOut);
  s.lineTo(Math.cos(halfAngle) * rOut, Math.sin(halfAngle) * rOut);
  s.lineTo(Math.cos(halfAngle) * rIn, Math.sin(halfAngle) * rIn);
  s.closePath();
  return s;
}

/**
 * Wave-3 Ultra-High-Detail 3D CAD Micro-Architectures — Group B (X2-96 – X2-105).
 * Every part is engineered as a multi-layered TEM/SEM cutaway micro-sculpture grounded in
 * 2025–2026 OFC / ISSCC / IEDM / ECTC / ASME JEP / IEEE ITherm / Stanford / Sony literature,
 * using exclusively shared MaterialLibrary materials & hoisted geometries for Tier-1 InstancedMesh batching.
 */
export function buildBionzV2Wave3PartsB(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // X2-96. OFC 2026 400G/512G TFLN 60°-Slanted Ridge-Waveguide CL-TWE Pockels MZM
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconBulk, mats);

    // 4.7um Thermal SiO2 Buried Oxide (BOX) + X-Cut Thin-Film LiNbO3 (TFLN) Optical Crystal Slab
    const boxOx = new THREE.Mesh(
      createChamferedBoxGeo(4.06, 0.14, 3.12, 0.03, 0.015, 'y'),
      mats.loficDielectric
    );
    boxOx.position.y = -0.63;
    const tflnSlab = new THREE.Mesh(
      createChamferedBoxGeo(3.96, 0.16, 2.98, 0.03, 0.015, 'y'),
      mats.quartzOlpf
    );
    tflnSlab.position.y = -0.48;
    g.add(boxOx, tflnSlab);

    // True 60°-slanted etched trapezoidal TFLN ridge waveguides (1um x 200nm) for both MZI Push-Pull Arms
    const ridgeArmGeo = extrudeHiRes(createTrapezoidShape(0.11, 0.24, 0.15), 2.16, 0.008, 0.008, 1, 4);
    ridgeArmGeo.rotateY(Math.PI / 2); // Extrudes along +X from 0..2.16
    for (const az of [-0.54, 0.54]) {
      const arm = new THREE.Mesh(ridgeArmGeo, mats.vcWorkingFluidCyan);
      arm.position.set(-1.08, -0.33, az);
      g.add(arm);
    }

    // Input 1x2 MMI Splitter + Polarization Splitter-Rotator (PSR) on left; Output 2x2 MMI Combiner on right
    const mmiGeo = createChamferedBoxGeo(0.46, 0.16, 0.44, 0.02, 0.01, 'y');
    const mmiIn = new THREE.Mesh(mmiGeo, mats.evfDichroicMirror);
    mmiIn.position.set(-1.54, -0.33, 0);
    const mmiOut = new THREE.Mesh(mmiGeo, mats.evfDichroicMirror);
    mmiOut.position.set(1.54, -0.33, 0);
    g.add(mmiIn, mmiOut);

    // S-bend slanted waveguides linking MMIs to the dual Pockels arms
    for (const az of [-0.54, 0.54]) {
      g.add(
        makeBondStrut(
          new THREE.Vector3(-1.32, -0.33, az * 0.28),
          new THREE.Vector3(-1.06, -0.33, az),
          0.055,
          mats.vcWorkingFluidCyan,
          8
        ),
        makeBondStrut(
          new THREE.Vector3(1.06, -0.33, az),
          new THREE.Vector3(1.32, -0.33, az * 0.28),
          0.055,
          mats.vcWorkingFluidCyan,
          8
        )
      );
    }

    // Left & Right Lensed Edge-Coupled Single-Mode Fiber Spot-Size Converters
    const fiberCladGeo = hiResCyl(0.11, 0.11, 0.46, 12);
    fiberCladGeo.rotateZ(Math.PI / 2);
    const fiberCoreGeo = hiResCyl(0.042, 0.042, 0.5, 8);
    fiberCoreGeo.rotateZ(Math.PI / 2);
    for (const fx of [-1.96, 1.96]) {
      const fc = new THREE.Mesh(fiberCladGeo, mats.lensXaGlass);
      fc.position.set(fx, -0.33, 0);
      fc.userData.noEdges = true;
      const core = new THREE.Mesh(fiberCoreGeo, mats.bodyRecRed);
      core.position.set(fx, -0.33, 0);
      core.userData.noEdges = true;
      g.add(fc, core);
    }

    // Cutaway 600nm SiO2 upper optical cladding frame (leaving center MZI electro-optic region exposed)
    const cladFrameGeo = extrudeHiRes(
      createFrameShape(3.86, 2.86, 0.08, 3.38, 2.38, 0.06),
      0.1,
      0.015,
      0.015,
      1,
      6
    );
    cladFrameGeo.rotateX(Math.PI / 2);
    const cladFrame = new THREE.Mesh(cladFrameGeo, mats.lensXaGlass);
    cladFrame.position.y = -0.26;
    cladFrame.userData.noEdges = true;
    g.add(cladFrame);

    // 1.4um Electroplated Au GSG Capacitively-Loaded Traveling-Wave Electrodes (CL-TWE, 0.77 dB @ 110 GHz)
    const gndRailGeo = createChamferedBoxGeo(2.44, 0.2, 0.34, 0.025, 0.012, 'y');
    const sigRailGeo = createChamferedBoxGeo(2.44, 0.22, 0.3, 0.025, 0.012, 'y');
    for (const gz of [-1.08, 1.08]) {
      const gr = new THREE.Mesh(gndRailGeo, mats.goldPlating);
      gr.position.set(0, -0.06, gz);
      g.add(gr);
    }
    const sigRail = new THREE.Mesh(sigRailGeo, mats.goldPlating);
    sigRail.position.set(0, -0.05, 0);
    g.add(sigRail);

    // 12x2 = 24 Periodic Sub-Wavelength Capacitive T-Rail Micro-Stubs flanking BOTH Pockels arms (G = 5-6um)
    const tStemGeo = createChamferedBoxGeo(0.055, 0.14, 0.34, 0.008, 0.004, 'y');
    const tCapGeo = createChamferedBoxGeo(0.14, 0.14, 0.075, 0.008, 0.004, 'y');
    for (let i = 0; i < 11; i++) {
      const tx = -1.0 + i * 0.2;
      for (const side of [-1, 1]) {
        // Inner T-stub extending from center Signal rail toward optical arm
        const stemIn = new THREE.Mesh(tStemGeo, mats.copperHybridBond);
        stemIn.position.set(tx, -0.06, side * 0.26);
        stemIn.userData.noEdges = true;
        const capIn = new THREE.Mesh(tCapGeo, mats.goldPlating);
        capIn.position.set(tx, -0.06, side * 0.42);
        capIn.userData.noEdges = true;
        // Outer T-stub extending from Ground rail toward opposite side of optical arm
        const stemOut = new THREE.Mesh(tStemGeo, mats.copperHybridBond);
        stemOut.position.set(tx, -0.06, side * 0.82);
        stemOut.userData.noEdges = true;
        const capOut = new THREE.Mesh(tCapGeo, mats.goldPlating);
        capOut.position.set(tx, -0.06, side * 0.66);
        capOut.userData.noEdges = true;
        g.add(stemIn, capIn, stemOut, capOut);
      }
    }

    // Left GSG CPW 110GHz RF Launch Probe Pads + Right 50-Ohm TaN Traveling-Wave Load Termination Block
    const rfPadGeo = createChamferedBoxGeo(0.28, 0.18, 0.24, 0.02, 0.01, 'y');
    for (const pz of [-0.96, 0, 0.96]) {
      const lp = new THREE.Mesh(rfPadGeo, mats.sinteredSilver);
      lp.position.set(-1.42, -0.05, pz);
      lp.userData.noEdges = true;
      g.add(lp);
    }
    const termRes = new THREE.Mesh(
      createChamferedBoxGeo(0.26, 0.2, 2.08, 0.025, 0.012, 'y'),
      mats.cinnabarAnodized
    );
    termRes.position.set(1.42, -0.05, 0);
    g.add(termRes);

    // Elevated Flip-Chip 400G/512G PAM4 Driver + EO Equalizer IC suspended on Cu micro-pillars (offset rear so CL-TWE stays visible!)
    const bumpGeo = hiResCyl(0.055, 0.055, 0.28, 8);
    for (const bx of [-0.42, 0, 0.42]) {
      for (const bz of [-0.88, -0.44, 0, 0.44, 0.88]) {
        const bp = new THREE.Mesh(bumpGeo, mats.copperHybridBond);
        bp.position.set(bx, 0.2, bz);
        bp.userData.noEdges = true;
        g.add(bp);
      }
    }
    const drvDie = new THREE.Mesh(
      createChamferedBoxGeo(1.16, 0.26, 1.98, 0.04, 0.02, 'y'),
      mats.npuSiliconDie
    );
    drvDie.position.set(0, 0.46, 0);
    const drvLid = new THREE.Mesh(
      createChamferedBoxGeo(0.92, 0.1, 1.72, 0.03, 0.015, 'y'),
      mats.copperHeatSpreader
    );
    drvLid.position.set(0, 0.64, 0);
    // Optical wave propagation vector arrow above output
    addVectorArrow(
      g,
      new THREE.Vector3(1.12, 0.34, 0.88),
      new THREE.Vector3(1.92, 0.34, 0.88),
      0.032,
      0.08,
      0.18,
      mats.vcWorkingFluidCyan
    );
    g.add(drvDie, drvLid);

    parts.push(
      finalizeWave3Part(
        'xv2-tfln-400g-pockels-modulator',
        96,
        '#0ea5e9',
        g,
        new THREE.Vector3(-4.8, -14.621, 13),
        new THREE.Vector3(0, 56, 58),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-97. OFC 2026 Heterogeneous InP-on-Si CW-DFB Laser-Integrated PIC & 400G DD-EML
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconBulk, mats);

    // SOI Buried Oxide + Silicon Photonics Waveguide Layer
    const soiBox = new THREE.Mesh(
      createChamferedBoxGeo(4.06, 0.14, 3.12, 0.03, 0.015, 'y'),
      mats.loficDielectric
    );
    soiBox.position.y = -0.63;
    const soiSi = new THREE.Mesh(
      createChamferedBoxGeo(3.98, 0.14, 3.02, 0.03, 0.015, 'y'),
      mats.siliconLogicLayer
    );
    soiSi.position.y = -0.49;
    g.add(soiBox, soiSi);

    // Shared geometries for 4-Channel Direct-Bonded InP/AlGaInAs MQW DFB Lasers + DD-EMLs + V-Grooves
    const siWgGeo = createChamferedBoxGeo(3.64, 0.08, 0.12, 0.01, 0.005, 'y');
    const gratRibGeo = createChamferedBoxGeo(0.055, 0.1, 0.24, 0.008, 0.004, 'y');
    const nInpSlabGeo = createChamferedBoxGeo(1.76, 0.1, 0.48, 0.015, 0.008, 'y');
    const mqwCoreGeo = createChamferedBoxGeo(1.72, 0.09, 0.3, 0.012, 0.006, 'y');
    const pInpRibGeo = createChamferedBoxGeo(1.66, 0.16, 0.2, 0.015, 0.008, 'y');
    const anodeGeo = createChamferedBoxGeo(1.56, 0.1, 0.14, 0.012, 0.006, 'y');
    const nPadGeo = createChamferedBoxGeo(1.48, 0.07, 0.08, 0.01, 0.005, 'y');
    const taperGeo = hiResCyl(0.025, 0.11, 0.42, 8);
    taperGeo.rotateZ(-Math.PI / 2);
    const beamGeo = hiResCyl(0.045, 0.045, 1.62, 10);
    beamGeo.rotateZ(Math.PI / 2);
    const waveRingGeo = hiResTorus(0.085, 0.018, 6, 14);
    waveRingGeo.rotateY(Math.PI / 2);
    const emlElectrodeGeo = createChamferedBoxGeo(0.76, 0.16, 0.12, 0.015, 0.008, 'y');
    const vGrooveWallGeo = createChamferedBoxGeo(0.62, 0.18, 0.1, 0.012, 0.006, 'y');
    const outFiberGeo = hiResCyl(0.075, 0.075, 0.68, 10);
    outFiberGeo.rotateZ(Math.PI / 2);

    for (let ch = 0; ch < 4; ch++) {
      const cz = -1.08 + ch * 0.72;

      // Silicon bus waveguide spanning entire die
      const swg = new THREE.Mesh(siWgGeo, mats.vcWorkingFluidCyan);
      swg.position.set(0, -0.39, cz);
      swg.userData.noEdges = true;
      g.add(swg);

      // Etched Si λ/4 phase-shifted DFB Bragg grating ribs (two halves split around λ/4 gap at x=-0.96!)
      for (let gIdx = 0; gIdx < 10; gIdx++) {
        const shift = gIdx >= 5 ? 0.06 : -0.06;
        const rib = new THREE.Mesh(gratRibGeo, mats.sinteredSilver);
        rib.position.set(-1.62 + gIdx * 0.14 + shift, -0.37, cz);
        rib.userData.noEdges = true;
        g.add(rib);
      }

      // Direct-bonded 350nm AlGaInAs/InGaAsP MQW PIN Mesa Stack: n-InP -> MQW Active -> p-InP Rib -> Au p-Anode
      const nSlab = new THREE.Mesh(nInpSlabGeo, mats.ispSiliconDie);
      nSlab.position.set(-0.96, -0.26, cz);
      const mqw = new THREE.Mesh(mqwCoreGeo, mats.bodyRecRed);
      mqw.position.set(-0.96, -0.17, cz);
      mqw.userData.noEdges = true;
      const pRib = new THREE.Mesh(pInpRibGeo, mats.cinnabarAnodized);
      pRib.position.set(-0.96, -0.04, cz);
      const anode = new THREE.Mesh(anodeGeo, mats.goldPlating);
      anode.position.set(-0.96, 0.09, cz);
      anode.userData.noEdges = true;
      // Lateral Ti/Pt/Au n-contact rails flanking the p-rib (H+ proton-implanted confinement)
      const nPad = new THREE.Mesh(nPadGeo, mats.copperHybridBond);
      nPad.position.set(-0.96, -0.17, cz + 0.19);
      nPad.userData.noEdges = true;
      g.add(nSlab, mqw, pRib, anode, nPad);

      // Adiabatic III-V-to-Si inverted taper horn for 98% evanescent mode transfer
      const taper = new THREE.Mesh(taperGeo, mats.cinnabarAnodized);
      taper.position.set(0.08, -0.24, cz);
      taper.userData.noEdges = true;
      g.add(taper);

      // Evanescently coupled 1310nm O-band CW laser beam + optical phase-front rings
      const beam = new THREE.Mesh(beamGeo, mats.bodyRecRed);
      beam.position.set(0.98, -0.26, cz);
      beam.userData.noEdges = true;
      g.add(beam);
      for (const rx of [0.36, 0.72, 1.08]) {
        const ring = new THREE.Mesh(waveRingGeo, mats.goldPlating);
        ring.position.set(rx, -0.26, cz);
        ring.userData.noEdges = true;
        g.add(ring);
      }

      // Downstream 400G Differential-Drive EML (DD-EML, 99 GHz, 0.75 Vpp/arm) twin differential RF rails
      for (const dz of [-0.14, 0.14]) {
        const el = new THREE.Mesh(emlElectrodeGeo, mats.goldPlating);
        el.position.set(0.72, -0.12, cz + dz);
        el.userData.noEdges = true;
        g.add(el);
      }

      // Right Output: Anisotropically Etched Si V-Groove Passive Fiber Alignment Array
      for (const vz of [-0.13, 0.13]) {
        const vw = new THREE.Mesh(vGrooveWallGeo, mats.stainlessMachined);
        vw.position.set(1.66, -0.28, cz + vz);
        vw.userData.noEdges = true;
        g.add(vw);
      }
      const ofib = new THREE.Mesh(outFiberGeo, mats.lensXaGlass);
      ofib.position.set(1.72, -0.22, cz);
      ofib.userData.noEdges = true;
      g.add(ofib);
    }

    // Rear Monitor Photodiode (MPD) Power-Tap Bar + Overhead Differential EML Bridge Canopy (cutaway front!)
    const mpdBar = new THREE.Mesh(
      createChamferedBoxGeo(0.28, 0.34, 2.76, 0.03, 0.015, 'y'),
      mats.siliconPhotodiode
    );
    mpdBar.position.set(-1.94, -0.18, 0);
    // Overhead Machined Titanium Differential-Drive EML RF Probe Bridge (open-frame so all 4 beams & rings shine!)
    const emlBridgeFrame = extrudeHiRes(
      createFrameShape(0.88, 2.84, 0.06, 0.56, 2.52, 0.04),
      0.16,
      0.015,
      0.015,
      1,
      6
    );
    emlBridgeFrame.rotateX(Math.PI / 2);
    const emlHood = new THREE.Mesh(emlBridgeFrame, mats.stainlessMachined);
    emlHood.position.set(0.72, 0.48, 0);
    const emlGlassWin = new THREE.Mesh(
      createChamferedBoxGeo(0.58, 0.06, 2.54, 0.02, 0.01, 'y'),
      mats.lensXaGlass
    );
    emlGlassWin.position.set(0.72, 0.42, 0);
    // Vertical bias/RF micro-vias connecting EML bridge down to DD-EML rails
    const rfViaGeo = hiResCyl(0.042, 0.042, 0.46, 8);
    for (let ch = 0; ch < 4; ch++) {
      const cz = -1.08 + ch * 0.72;
      const rv = new THREE.Mesh(rfViaGeo, mats.copperHybridBond);
      rv.position.set(0.72, 0.14, cz);
      rv.userData.noEdges = true;
      g.add(rv);
    }
    g.add(emlGlassWin);
    // Common DC Laser Current-Injection Bus Rail over the 4 InP anodes
    const dcBus = new THREE.Mesh(
      createChamferedBoxGeo(0.24, 0.14, 2.66, 0.02, 0.01, 'y'),
      mats.goldPlating
    );
    dcBus.position.set(-1.28, 0.46, 0);
    for (let ch = 0; ch < 4; ch++) {
      const cz = -1.08 + ch * 0.72;
      const lv = new THREE.Mesh(rfViaGeo, mats.goldPlating);
      lv.position.set(-1.28, 0.24, cz);
      lv.userData.noEdges = true;
      g.add(lv);
    }
    g.add(mpdBar, emlHood, dcBus);

    parts.push(
      finalizeWave3Part(
        'xv2-inp-on-si-cwdfb-laser-pic',
        97,
        '#ef4444',
        g,
        new THREE.Vector3(-14.2, -14.621, 13),
        new THREE.Vector3(21, 56, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-98. ISSCC / IEDM 2026 4F^2 Vertical-Channel Transistor (VCT) & CoP 3D DRAM
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bottom Tier: Wafer-Bonded Cell-on-Peripheral (CoP) CMOS Sense-Amp & Sub-Wordline Driver Die
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.ispSiliconDie, mats);

    // Visible Peripheral CMOS Sense-Amp Logic Blocks + BEOL Cu Interconnect Tracks
    const saBlockGeo = createChamferedBoxGeo(0.56, 0.12, 0.46, 0.02, 0.01, 'y');
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const sa = new THREE.Mesh(saBlockGeo, (r + c) % 2 === 0 ? mats.npuSiliconDie : mats.siliconLogicLayer);
        sa.position.set(-1.32 + c * 0.88, -0.64, -0.78 + r * 0.78);
        sa.userData.noEdges = true;
        g.add(sa);
      }
    }

    // Mid Tier: SiCN Dielectric + 5x5 Cu-Cu Direct Wafer-Bonding Hybrid Interface Plane
    const sicnBondFrameGeo = extrudeHiRes(
      createFrameShape(4.06, 3.16, 0.08, 3.74, 2.84, 0.05),
      0.12,
      0.015,
      0.015,
      1,
      6
    );
    sicnBondFrameGeo.rotateX(Math.PI / 2);
    const sicnBondFrame = new THREE.Mesh(sicnBondFrameGeo, mats.aluminaHighKFilm);
    sicnBondFrame.position.y = -0.44;
    g.add(sicnBondFrame);

    const cuPadGeo = hiResCyl(0.11, 0.11, 0.14, 10);
    const blGeo = createChamferedBoxGeo(3.68, 0.08, 0.1, 0.012, 0.006, 'y');
    const shieldGeo = createChamferedBoxGeo(3.68, 0.13, 0.06, 0.01, 0.005, 'y');
    const wlGeo = createChamferedBoxGeo(0.11, 0.12, 2.88, 0.012, 0.006, 'y');
    const pillarGeo = hiResCyl(0.082, 0.082, 0.76, 10);
    const dgCollarGeo = createChamferedBoxGeo(0.24, 0.18, 0.22, 0.02, 0.01, 'y');
    const underlapGeo = hiResCyl(0.11, 0.11, 0.09, 10);
    const capOuterGeo = hiResCyl(0.14, 0.14, 0.44, 12);
    const capInnerGeo = hiResCyl(0.075, 0.075, 0.48, 10);

    // 5x5 4F^2 Vertical-Channel Transistor (VCT) Array (41 x 47.3 nm pitch) + Shielded Bitlines + Cylindrical MIM Caps
    for (let r = 0; r < 5; r++) {
      const pz = -1.16 + r * 0.58;

      // Buried Bitline along X
      const bl = new THREE.Mesh(blGeo, mats.sinteredSilver);
      bl.position.set(0, -0.34, pz);
      bl.userData.noEdges = true;
      g.add(bl);

      // Samsung ISSCC 2026 Shielded Bitline Crosstalk-Isolation Wall between adjacent Bitlines
      if (r < 4) {
        const sh = new THREE.Mesh(shieldGeo, mats.titaniumRivet);
        sh.position.set(0, -0.31, pz + 0.29);
        sh.userData.noEdges = true;
        g.add(sh);
      }

      for (let c = 0; c < 5; c++) {
        const px = -1.44 + c * 0.72;

        // Cu-Cu wafer-bond pad directly linking Sense-Amp die to Bitline/Array
        const pad = new THREE.Mesh(cuPadGeo, mats.copperHybridBond);
        pad.position.set(px, -0.49, pz);
        pad.userData.noEdges = true;
        g.add(pad);

        // Single-crystal vertical Si channel pillar
        const pil = new THREE.Mesh(pillarGeo, mats.siliconPhotodiode);
        pil.position.set(px, 0.04, pz);
        pil.userData.noEdges = true;
        g.add(pil);

        // Asymmetric Double-Gate / Back-Gate Oxide Collar + GIDL-suppressing underlap collar
        const collar = new THREE.Mesh(dgCollarGeo, mats.goldPlating);
        collar.position.set(px, -0.02, pz);
        collar.userData.noEdges = true;
        const underlap = new THREE.Mesh(underlapGeo, mats.aluminaHighKFilm);
        underlap.position.set(px, 0.16, pz);
        underlap.userData.noEdges = true;
        g.add(collar, underlap);

        // High-Aspect-Ratio Cylindrical TiN/ZrO2/TiN Storage Capacitor (front row cutaway exposing inner electrode!)
        if (r === 4) {
          const capIn = new THREE.Mesh(capInnerGeo, mats.goldPlating);
          capIn.position.set(px, 0.54, pz);
          capIn.userData.noEdges = true;
          const capRim = new THREE.Mesh(hiResTorus(0.135, 0.025, 6, 14), mats.vcWorkingFluidCyan);
          capRim.rotation.x = Math.PI / 2;
          capRim.position.set(px, 0.36, pz);
          capRim.userData.noEdges = true;
          g.add(capIn, capRim);
        } else {
          const capOut = new THREE.Mesh(capOuterGeo, mats.vcWorkingFluidCyan);
          capOut.position.set(px, 0.54, pz);
          capOut.userData.noEdges = true;
          const capCore = new THREE.Mesh(capInnerGeo, mats.goldPlating);
          capCore.position.set(px, 0.55, pz);
          capCore.userData.noEdges = true;
          g.add(capOut, capCore);
        }
      }
    }

    // Orthogonal Wordline Rails along Z connecting each column's Asymmetric Double-Gate Collars
    for (let c = 0; c < 5; c++) {
      const px = -1.44 + c * 0.72;
      const wl = new THREE.Mesh(wlGeo, u.cfeMolyWordlineMetal);
      wl.position.set(px, -0.02, 0);
      wl.userData.noEdges = true;
      g.add(wl);
    }

    // Half-Cutaway Common Top-Plate Electrode (covers rear 3 rows, exposing front 2 rows of TiN/ZrO2 cylinders!)
    const topPlate = new THREE.Mesh(
      createChamferedBoxGeo(3.68, 0.12, 1.62, 0.03, 0.015, 'y'),
      mats.aluminaHighKFilm
    );
    topPlate.position.set(0, 0.86, -0.62);
    const plateBus = new THREE.Mesh(
      createChamferedBoxGeo(3.52, 0.08, 0.26, 0.02, 0.01, 'y'),
      mats.copperHybridBond
    );
    plateBus.position.set(0, 0.96, -0.96);
    g.add(topPlate, plateBus);

    parts.push(
      finalizeWave3Part(
        'xv2-4f2-vct-cop-3d-dram',
        98,
        '#a855f7',
        g,
        new THREE.Vector3(-8, -14.621, -13),
        new THREE.Vector3(42, 56, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-99. ECTC 2026 Void-Free CoW Bonding-Front Angle-D Wave & Plasma-Diced Hybrid Bonding
  // East Wall Stratum 1 open slot: (+20.0, 14.8, -6.9) -> footprint 3.72 x 4.52 (X x Z)
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 3.72, 4.52, -0.88, mats.siliconBulk, mats);

    // Host Wafer SiCN/TEOS Planarized Dielectric Floor + Plasma-Diced Bosch Kerf Trench Perimeter
    const sicnFloor = new THREE.Mesh(
      createChamferedBoxGeo(3.24, 0.14, 4.02, 0.03, 0.015, 'y'),
      mats.aluminaHighKFilm
    );
    sicnFloor.position.y = -0.62;
    g.add(sicnFloor);

    // Bosch Plasma-Diced Smooth Vertical Kerf Frame (zero mechanical saw chipping vs laser groove)
    const kerfFrameGeo = extrudeHiRes(
      createFrameShape(3.38, 4.16, 0.06, 3.18, 3.96, 0.04),
      0.08,
      0.01,
      0.01,
      1,
      6
    );
    kerfFrameGeo.rotateX(Math.PI / 2);
    const kerfFrame = new THREE.Mesh(kerfFrameGeo, mats.siliconLogicLayer);
    kerfFrame.position.y = -0.5;
    g.add(kerfFrame);

    // 5x6 Precision 3um Dished Cu Hybrid-Bonding Pad Array on 6um pitch (95-99% CSAM yield)
    const padOuterGeo = hiResCyl(0.115, 0.115, 0.09, 10);
    const padDishGeo = hiResCyl(0.075, 0.075, 0.03, 10);
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 5; c++) {
        const px = -1.12 + c * 0.56;
        const pz = -1.5 + r * 0.6;
        const p = new THREE.Mesh(padOuterGeo, mats.copperHybridBond);
        p.position.set(px, -0.52, pz);
        p.userData.noEdges = true;
        const d = new THREE.Mesh(padDishGeo, mats.goldPlating);
        d.position.set(px, -0.475, pz);
        d.userData.noEdges = true;
        g.add(p, d);
      }
    }

    // Dynamic Center-to-Edge Gas-Expulsion Bonding-Front Wave Ripples (Angle D -> 2.8% to 99% yield!)
    for (let w = 0; w < 4; w++) {
      const wave = new THREE.Mesh(
        hiResTorus(0.32 + w * 0.34, 0.034, 8, 28),
        w % 2 === 0 ? mats.vcWorkingFluidCyan : mats.fluorineCoatCyan
      );
      wave.rotation.x = Math.PI / 2;
      wave.position.set(0, -0.38 + w * 0.025, 0);
      wave.userData.noEdges = true;
      g.add(wave);
    }
    // 6 Radial Outward Air-Expulsion Vector Arrows showing zero-void gas evacuation across gap
    for (let k = 0; k < 6; k++) {
      const ang = (Math.PI / 3) * k + Math.PI / 6;
      addVectorArrow(
        g,
        new THREE.Vector3(Math.cos(ang) * 0.56, -0.32, Math.sin(ang) * 0.7),
        new THREE.Vector3(Math.cos(ang) * 1.48, -0.22, Math.sin(ang) * 1.78),
        0.028,
        0.072,
        0.16,
        mats.goldPlating
      );
    }

    // Ultra-Thin Plasma-Diced Top Die (0.03-0.05mm, 102.4um warp compensated) tilted at Bonding-Front Angle D!
    const topDieGrp = new THREE.Group();
    topDieGrp.position.set(0, 0.24, 0);
    topDieGrp.rotation.x = 0.16; // Controlled Angle-D center-to-edge bonding initiation!

    // Translucent-cutaway top die rim + sleek inner die so bonding-front wave underneath stays visible!
    const dieCore = new THREE.Mesh(
      createChamferedBoxGeo(2.28, 0.1, 2.88, 0.03, 0.015, 'y'),
      mats.lensXaGlass
    );
    const dieTopRimGeo = extrudeHiRes(
      createFrameShape(2.32, 2.92, 0.05, 1.84, 2.44, 0.03),
      0.08,
      0.012,
      0.012,
      1,
      6
    );
    dieTopRimGeo.rotateX(Math.PI / 2);
    const dieTopFilm = new THREE.Mesh(dieTopRimGeo, mats.ispSiliconDie);
    dieTopFilm.position.y = 0.08;
    topDieGrp.add(dieCore, dieTopFilm);

    const underPadGeo = hiResCyl(0.085, 0.085, 0.06, 8);
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 4; c++) {
        const up = new THREE.Mesh(underPadGeo, mats.copperHybridBond);
        up.position.set(-0.84 + c * 0.56, -0.08, -1.2 + r * 0.6);
        up.userData.noEdges = true;
        topDieGrp.add(up);
      }
    }

    // Shibaura TFC-6500 Precision Gimbaled Vacuum Bond-Head Collet (1um 3-sigma) + Central Initiator Plunger
    const colletBase = new THREE.Mesh(
      createChamferedBoxGeo(1.76, 0.18, 2.24, 0.04, 0.02, 'y'),
      mats.stainlessMachined
    );
    colletBase.position.y = 0.34;
    const plunger = new THREE.Mesh(hiResCyl(0.22, 0.32, 0.44, 14), mats.titaniumRivet);
    plunger.position.set(0, 0.28, 0);
    const plungerRing = new THREE.Mesh(hiResTorus(0.38, 0.04, 8, 20), mats.goldPlating);
    plungerRing.rotation.x = Math.PI / 2;
    plungerRing.position.set(0, 0.48, 0);
    topDieGrp.add(colletBase, plunger, plungerRing);

    // 4 Corner Vacuum-Chuck Suction Ports on the Bond-Head Collet
    const vacGeo = hiResCyl(0.11, 0.11, 0.24, 10);
    for (const vx of [-0.62, 0.62]) {
      for (const vz of [-0.82, 0.82]) {
        const vp = new THREE.Mesh(vacGeo, mats.cinnabarAnodized);
        vp.position.set(vx, 0.26, vz);
        vp.userData.noEdges = true;
        topDieGrp.add(vp);
      }
    }
    g.add(topDieGrp);

    parts.push(
      finalizeWave3Part(
        'xv2-ectc26-cow-angle-d-hb-wave',
        99,
        '#f97316',
        g,
        new THREE.Vector3(-16.6, 13.748, 7.2),
        new THREE.Vector3(56, 56, -21),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-100. Post-Quantum Cryptography (ML-KEM / ML-DSA Unified NTT) & 38.1 fJ/bit C-Latch TRNG
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconLogicLayer, mats);

    // --- LEFT ZONE: True 3D 3x3x3 Module-LWE Cryptographic Lattice Cage + SVP Shortest Vector ---
    const latNodeGeo = hiResSphere(0.068, 8, 6);
    const latPts: THREE.Vector3[][][] = [];
    for (let x = 0; x < 3; x++) {
      latPts[x] = [];
      for (let y = 0; y < 3; y++) {
        latPts[x][y] = [];
        for (let z = 0; z < 3; z++) {
          const pt = new THREE.Vector3(-1.82 + x * 0.46, -0.46 + y * 0.46, -0.78 + z * 0.78);
          latPts[x][y][z] = pt;
          const node = new THREE.Mesh(
            latNodeGeo,
            (x + y + z) % 2 === 0 ? mats.goldPlating : mats.vcWorkingFluidCyan
          );
          node.position.copy(pt);
          node.userData.noEdges = true;
          g.add(node);
        }
      }
    }
    // Orthogonal 3D Lattice Basis Rods connecting adjacent lattice points
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const p0 = latPts[x][y][z];
          if (x < 2) g.add(makeBondStrut(p0, latPts[x + 1][y][z], 0.018, mats.sinteredSilver, 6));
          if (y < 2) g.add(makeBondStrut(p0, latPts[x][y + 1][z], 0.018, mats.sinteredSilver, 6));
          if (z < 2) g.add(makeBondStrut(p0, latPts[x][y][z + 1], 0.018, mats.sinteredSilver, 6));
        }
      }
    }
    // Glowing Crimson Shortest-Vector Problem (SVP / Module-LWE secret vector) + Error-Noise Halo
    addVectorArrow(
      g,
      latPts[0][0][0],
      latPts[2][2][2],
      0.044,
      0.1,
      0.22,
      mats.bodyRecRed
    );
    const errRing = new THREE.Mesh(hiResTorus(0.18, 0.024, 6, 16), mats.cinnabarAnodized);
    errRing.position.copy(latPts[2][2][2]);
    errRing.userData.noEdges = true;
    g.add(errRing);

    // --- CENTER ZONE: Mixed-Radix-4/2 Cooley-Tukey / Gentleman-Sande Butterfly NTT Crossbar + Keccak-f[1600] ---
    const aluGeo = createChamferedBoxGeo(0.24, 0.72, 0.24, 0.02, 0.01, 'y');
    const colX = [-0.42, 0.28];
    const rowZ = [-0.96, -0.32, 0.32, 0.96];
    for (let c = 0; c < 2; c++) {
      for (let r = 0; r < 4; r++) {
        const alu = new THREE.Mesh(aluGeo, c === 0 ? mats.goldPlating : mats.copperHybridBond);
        alu.position.set(colX[c], -0.22, rowZ[r]);
        g.add(alu);
      }
    }
    // Crossed Diagonal Butterfly Twiddle-Factor Struts (Radix-4 / Radix-2 CT/GS Butterflies!)
    const pairs: [number, number][] = [
      [0, 1],
      [1, 0],
      [2, 3],
      [3, 2],
      [0, 2],
      [2, 0],
      [1, 3],
      [3, 1],
    ];
    for (let k = 0; k < pairs.length; k++) {
      const [r0, r1] = pairs[k];
      const yOff = k < 4 ? -0.02 : 0.18;
      g.add(
        makeBondStrut(
          new THREE.Vector3(colX[0], yOff, rowZ[r0]),
          new THREE.Vector3(colX[1], yOff, rowZ[r1]),
          0.024,
          k % 2 === 0 ? mats.vcWorkingFluidCyan : mats.goldPlating,
          6
        )
      );
    }
    // Overhead 5x5 Keccak-f[1600] SHAKE-256 Sponge State-Cube Array (FIPS 202/203/204)
    const keccakDeck = new THREE.Mesh(
      createChamferedBoxGeo(0.96, 0.1, 1.06, 0.02, 0.01, 'y'),
      mats.npuSiliconDie
    );
    keccakDeck.position.set(-0.07, 0.34, 0);
    g.add(keccakDeck);
    const laneGeo = createChamferedBoxGeo(0.11, 0.26, 0.11, 0.01, 0.005, 'y');
    for (let kx = 0; kx < 5; kx++) {
      for (let kz = 0; kz < 5; kz++) {
        const hScale = 0.65 + (((kx * 3 + kz * 7) % 5) * 0.16);
        const ln = new THREE.Mesh(laneGeo, (kx + kz) % 2 === 0 ? mats.goldPlating : mats.evfDichroicMirror);
        ln.scale.y = hScale;
        ln.position.set(-0.43 + kx * 0.18, 0.44 + hScale * 0.1, -0.36 + kz * 0.18);
        ln.userData.noEdges = true;
        g.add(ln);
      }
    }

    // --- RIGHT ZONE: 4 Differential Coupling-Cap Auto-Zeroing C-Latch TRNG Cells (38.1 fJ/bit @ 0.4V) ---
    const invPillarGeo = createChamferedBoxGeo(0.16, 0.46, 0.14, 0.015, 0.008, 'y');
    const trimCapGeo = hiResCyl(0.12, 0.12, 0.34, 10);
    const tailSwGeo = createChamferedBoxGeo(0.48, 0.1, 0.22, 0.015, 0.008, 'y');
    for (let i = 0; i < 4; i++) {
      const tz = -1.02 + i * 0.68;
      // Tail clock-gating transistor block
      const sw = new THREE.Mesh(tailSwGeo, mats.stainlessMachined);
      sw.position.set(1.42, -0.62, tz);
      sw.userData.noEdges = true;
      // Cross-coupled inverter pair + twin MIM auto-zeroing trim capacitors
      const invL = new THREE.Mesh(invPillarGeo, mats.ispSiliconDie);
      invL.position.set(1.16, -0.32, tz);
      const invR = new THREE.Mesh(invPillarGeo, mats.ispSiliconDie);
      invR.position.set(1.68, -0.32, tz);
      const capL = new THREE.Mesh(trimCapGeo, mats.mofEmerald);
      capL.position.set(1.32, -0.26, tz - 0.13);
      capL.userData.noEdges = true;
      const capR = new THREE.Mesh(trimCapGeo, mats.mofEmerald);
      capR.position.set(1.52, -0.26, tz + 0.13);
      capR.userData.noEdges = true;
      g.add(sw, invL, invR, capL, capR);
      // Cross-coupled feedback links
      g.add(
        makeBondStrut(
          new THREE.Vector3(1.16, -0.18, tz - 0.05),
          new THREE.Vector3(1.68, -0.38, tz + 0.05),
          0.02,
          mats.goldPlating,
          6
        ),
        makeBondStrut(
          new THREE.Vector3(1.16, -0.38, tz + 0.05),
          new THREE.Vector3(1.68, -0.18, tz - 0.05),
          0.02,
          mats.vcWorkingFluidCyan,
          6
        )
      );
    }
    // Overhead von Neumann Debiaser + NIST SP 800-90B Health-Test Bus Bar
    const vnBar = new THREE.Mesh(
      createChamferedBoxGeo(0.84, 0.2, 2.52, 0.03, 0.015, 'y'),
      mats.npuSiliconDie
    );
    vnBar.position.set(1.42, 0.24, 0);
    const bitGeo = createChamferedBoxGeo(0.14, 0.16, 0.18, 0.015, 0.008, 'y');
    for (let b = 0; b < 8; b++) {
      const bit = new THREE.Mesh(bitGeo, b % 3 === 0 ? mats.mofEmerald : mats.goldPlating);
      bit.position.set(1.42, 0.44, -0.98 + b * 0.28);
      bit.userData.noEdges = true;
      g.add(bit);
    }
    g.add(vnBar);

    parts.push(
      finalizeWave3Part(
        'xv2-pqc-mlkem-mldsa-clatch-trng',
        100,
        '#eab308',
        g,
        new THREE.Vector3(7.781, 2.438, 14.5),
        new THREE.Vector3(-22, -36, -56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-101. Optical Laser Fault-Injection (LFI) 286 F^2/Cell BBICS Bulk-Current Mesh & Secure Flush
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconBulk, mats);

    // Translucent-Cutaway Silicon Substrate Body (front-cutaway revealing substrate bounce ripples!)
    const subSlab = new THREE.Mesh(
      createChamferedBoxGeo(3.92, 0.22, 2.98, 0.04, 0.02, 'y'),
      mats.quartzOlpf
    );
    subSlab.position.y = -0.58;
    g.add(subSlab);

    // 5x5 Distributed Twin-Well BBICS Bulk-Current Sensor Array (286 F^2/cell) + Well-Tap Bridges
    const cellGeo = createChamferedBoxGeo(0.58, 0.14, 0.44, 0.02, 0.01, 'y');
    const tapGeo = createChamferedBoxGeo(0.18, 0.08, 0.14, 0.01, 0.005, 'y');
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const cx = -1.48 + c * 0.74;
        const cz = -1.08 + r * 0.54;
        const isHit = (r === 1 || r === 2) && (c === 2 || c === 3);
        const cell = new THREE.Mesh(
          cellGeo,
          isHit ? mats.bodyRecRed : (r + c) % 2 === 0 ? mats.stainlessMachined : mats.siliconLogicLayer
        );
        cell.position.set(cx, -0.36, cz);
        cell.userData.noEdges = true;
        const tap = new THREE.Mesh(tapGeo, isHit ? mats.goldPlating : mats.vcWorkingFluidCyan);
        tap.position.set(cx, -0.25, cz);
        tap.userData.noEdges = true;
        g.add(cell, tap);
      }
    }

    // Concentric Substrate-Bounce Photocurrent Ripple Rings radiating from laser impact zone
    for (let k = 0; k < 3; k++) {
      const rip = new THREE.Mesh(hiResTorus(0.32 + k * 0.34, 0.028, 6, 24), mats.cinnabarAnodized);
      rip.rotation.x = Math.PI / 2;
      rip.position.set(0.36, -0.22, -0.27);
      rip.userData.noEdges = true;
      g.add(rip);
    }

    // 1064nm NIR LFI Attack Micro-Objective Lens + Glowing Gaussian Laser Cone + Vertical e-/h+ Plasma Column
    const lensBarrel = new THREE.Mesh(hiResCyl(0.42, 0.34, 0.24, 16), mats.matteBlackAnodized);
    lensBarrel.position.set(0.36, 0.78, -0.27);
    const lensGlass = new THREE.Mesh(hiResCyl(0.3, 0.3, 0.08, 16), mats.lensXaGlass);
    lensGlass.position.set(0.36, 0.64, -0.27);
    const laserCone = new THREE.Mesh(hiResCyl(0.24, 0.045, 0.88, 14), mats.bodyRecRed);
    laserCone.position.set(0.36, 0.2, -0.27);
    laserCone.userData.noEdges = true;
    const plasmaCol = new THREE.Mesh(hiResCyl(0.09, 0.16, 0.36, 12), mats.cinnabarAnodized);
    plasmaCol.position.set(0.36, -0.38, -0.27);
    plasmaCol.userData.noEdges = true;
    g.add(lensBarrel, lensGlass, laserCone, plasmaCol);

    // Overhead Serpentine Active Anti-Probe Top-Metal Shield Mesh (left & rear half cutaway!)
    const meshBarX = createChamferedBoxGeo(3.84, 0.055, 0.075, 0.01, 0.005, 'y');
    const meshBarZ = createChamferedBoxGeo(0.075, 0.055, 1.38, 0.01, 0.005, 'y');
    for (let i = 0; i < 6; i++) {
      const mx = new THREE.Mesh(meshBarX, mats.copperHybridBond);
      mx.position.set(0, 0.08, -1.24 + i * 0.22);
      mx.userData.noEdges = true;
      g.add(mx);
    }
    for (let j = 0; j < 8; j++) {
      const mz = new THREE.Mesh(meshBarZ, mats.goldPlating);
      mz.position.set(-1.76 + j * 0.5, 0.14, -0.64);
      mz.userData.noEdges = true;
      g.add(mz);
    }

    // Left Corner: C2PA Hardware Root-of-Trust Key Vault + Golden Secure-Flush Zeroizer Ring & Wipe Vectors
    const vault = new THREE.Mesh(
      createChamferedBoxGeo(1.06, 0.52, 1.06, 0.05, 0.025, 'y'),
      mats.npuSiliconDie
    );
    vault.position.set(-1.32, 0.22, 0.72);
    const vaultCrest = new THREE.Mesh(
      createChamferedBoxGeo(0.68, 0.14, 0.68, 0.03, 0.015, 'y'),
      mats.goldPlating
    );
    vaultCrest.position.set(-1.32, 0.54, 0.72);
    const flushRing = new THREE.Mesh(hiResTorus(0.76, 0.06, 8, 24), mats.goldPlating);
    flushRing.rotation.x = Math.PI / 2;
    flushRing.position.set(0.36, 0.42, -0.27);
    g.add(vault, vaultCrest, flushRing);

    // High-speed <1ns Secure-Flush Trip Signal Arrow from triggered BBICS cells straight into C2PA Key Vault!
    addVectorArrow(
      g,
      new THREE.Vector3(-0.08, 0.36, 0.08),
      new THREE.Vector3(-0.88, 0.36, 0.54),
      0.038,
      0.095,
      0.2,
      mats.goldPlating
    );

    parts.push(
      finalizeWave3Part(
        'xv2-lfi-optical-bulk-current-mesh',
        101,
        '#dc2626',
        g,
        new THREE.Vector3(12.808, 2.438, 14.5),
        new THREE.Vector3(22, -36, -56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-102. Sony BIONZ XR2 Dynamic Active (+30% EIS) Optical-Flow & AI Auto Framing / Framing Stabilizer
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.ispSiliconDie, mats);

    // 7K Full-Width Overscan Sensor Pixel Tile Bed (6x4 micro-pixel readout grid inside chamfered 7K bezel)
    const pixGeo = createChamferedBoxGeo(0.48, 0.08, 0.48, 0.015, 0.008, 'y');
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 6; c++) {
        const px = -1.45 + c * 0.58;
        const pz = -0.87 + r * 0.58;
        const p = new THREE.Mesh(
          pixGeo,
          (r + c) % 2 === 0 ? mats.siliconPhotodiode : mats.siliconLogicLayer
        );
        p.position.set(px, -0.64, pz);
        p.userData.noEdges = true;
        g.add(p);
      }
    }
    const outerFrameGeo = extrudeHiRes(
      createFrameShape(3.96, 2.86, 0.08, 3.58, 2.48, 0.06),
      0.14,
      0.02,
      0.02,
      1,
      8
    );
    outerFrameGeo.rotateX(Math.PI / 2);
    const outerFrame = new THREE.Mesh(outerFrameGeo, mats.stainlessMachined);
    outerFrame.position.y = -0.48;
    g.add(outerFrame);

    // Mid Warp Layer: Curved Rolling-Shutter Warped Perspective Ribs flattening into Stabilized 4K Crop Frame
    const ribGeo = createChamferedBoxGeo(3.16, 0.04, 0.06, 0.008, 0.004, 'y');
    for (let i = 0; i < 6; i++) {
      const rz = -0.95 + i * 0.38;
      const skew = Math.sin((i - 2.5) * 0.55) * 0.18;
      const rib = new THREE.Mesh(ribGeo, mats.sinteredSilver);
      rib.position.set(skew, -0.26, rz);
      rib.rotation.y = 0.09 * Math.cos(i);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // 12 Dense 3D Golden Optical-Flow Motion Vectors (counter-warping hand-shake from 7K bed into 4K crop!)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const bx = -1.08 + c * 0.72;
        const bz = -0.68 + r * 0.68;
        addVectorArrow(
          g,
          new THREE.Vector3(bx - 0.14, -0.42, bz + 0.1),
          new THREE.Vector3(bx + 0.18, 0.04, bz - 0.08),
          0.022,
          0.056,
          0.13,
          mats.goldPlating
        );
      }
    }

    // Floating Stabilized 4K Dynamic Active Crop Frame (dead-level after quaternion + optical-flow compensation)
    const cropFrameGeo = extrudeHiRes(
      createFrameShape(2.38, 1.72, 0.06, 2.08, 1.42, 0.04),
      0.16,
      0.015,
      0.015,
      1,
      8
    );
    cropFrameGeo.rotateX(Math.PI / 2);
    const cropFrame = new THREE.Mesh(cropFrameGeo, mats.vcWorkingFluidCyan);
    cropFrame.position.set(0.24, 0.24, -0.06);
    g.add(cropFrame);

    // Center AI Auto-Framing & Framing-Stabilizer: Articulated 3D Human Pose Skeleton inside Crimson Reticle!
    const sx = 0.24;
    const sz = -0.06;
    const head = new THREE.Mesh(hiResSphere(0.15, 12, 10), mats.cinnabarAnodized);
    head.position.set(sx, 0.74, sz);
    const neckPt = new THREE.Vector3(sx, 0.56, sz);
    const hipPt = new THREE.Vector3(sx, 0.18, sz);
    const shL = new THREE.Vector3(sx - 0.26, 0.52, sz);
    const shR = new THREE.Vector3(sx + 0.26, 0.52, sz);
    const handL = new THREE.Vector3(sx - 0.42, 0.32, sz + 0.12);
    const handR = new THREE.Vector3(sx + 0.44, 0.44, sz - 0.1);
    const footL = new THREE.Vector3(sx - 0.16, -0.1, sz);
    const footR = new THREE.Vector3(sx + 0.18, -0.1, sz);
    const jointGeo = hiResSphere(0.052, 8, 6);
    for (const pt of [neckPt, hipPt, shL, shR, handL, handR, footL, footR]) {
      const jt = new THREE.Mesh(jointGeo, mats.goldPlating);
      jt.position.copy(pt);
      jt.userData.noEdges = true;
      g.add(jt);
    }
    g.add(
      head,
      makeBondStrut(neckPt, hipPt, 0.042, mats.cinnabarAnodized, 8),
      makeBondStrut(shL, shR, 0.036, mats.cinnabarAnodized, 8),
      makeBondStrut(shL, handL, 0.032, mats.bodyRecRed, 8),
      makeBondStrut(shR, handR, 0.032, mats.bodyRecRed, 8),
      makeBondStrut(hipPt, footL, 0.034, mats.bodyRecRed, 8),
      makeBondStrut(hipPt, footR, 0.034, mats.bodyRecRed, 8)
    );
    // Framing-Stabilizer 4-Corner Crimson Target Reticle Brackets locking head/torso position
    const retGeo = createChamferedBoxGeo(0.24, 0.045, 0.045, 0.008, 0.004, 'y');
    for (const rx of [-0.52, 0.52]) {
      for (const rz of [-0.38, 0.38]) {
        const rb = new THREE.Mesh(retGeo, mats.bodyRecRed);
        rb.position.set(sx + rx, 0.52, sz + rz);
        rb.userData.noEdges = true;
        g.add(rb);
      }
    }

    // Left Corner: 3-Ring Orthogonal 6-Axis MEMS Gyro Quaternion Gimbal + NPU Fusion Bar
    const gCenter = new THREE.Vector3(-1.46, 0.36, 0.86);
    const gRing1 = new THREE.Mesh(hiResTorus(0.42, 0.036, 8, 22), mats.goldPlating);
    gRing1.position.copy(gCenter);
    const gRing2 = new THREE.Mesh(hiResTorus(0.32, 0.032, 8, 20), mats.vcWorkingFluidCyan);
    gRing2.rotation.x = Math.PI / 2;
    gRing2.position.copy(gCenter);
    const gRing3 = new THREE.Mesh(hiResTorus(0.22, 0.028, 8, 18), mats.copperHybridBond);
    gRing3.rotation.y = Math.PI / 2;
    gRing3.position.copy(gCenter);
    const gMass = new THREE.Mesh(hiResSphere(0.11, 10, 8), mats.npuSiliconDie);
    gMass.position.copy(gCenter);
    g.add(gRing1, gRing2, gRing3, gMass);

    parts.push(
      finalizeWave3Part(
        'xv2-xr2-dynamic-active-framing-eis',
        102,
        '#0284c7',
        g,
        new THREE.Vector3(-17.9, 2.438, -2.6),
        new THREE.Vector3(-22, -36, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-103. Sony BIONZ XR2 Variable Shutter (1/100.3s) & Lossless RAW / 10-bit HEIF + Pixel-Shift
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.ispSiliconDie, mats);

    // --- LEFT ZONE: High-Frequency LED PWM Flicker Pulse Wall + Synchronized Rolling-Shutter Slits + 0.1-Step Vernier Dial ---
    const pwmBarGeo = createChamferedBoxGeo(0.14, 0.62, 0.18, 0.015, 0.008, 'y');
    for (let i = 0; i < 8; i++) {
      const high = i % 2 === 0;
      const bar = new THREE.Mesh(pwmBarGeo, high ? mats.goldPlating : mats.matteBlackAnodized);
      bar.scale.y = high ? 1.0 : 0.34;
      bar.position.set(-1.86 + i * 0.22, -0.66 + (high ? 0.31 : 0.11), -1.16);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    // 6 Diagonal Synchronized Electronic Rolling-Shutter Slit Curtains locked to PWM integer period (1/100.3s)
    const slitGeo = createChamferedBoxGeo(1.52, 0.1, 0.18, 0.015, 0.008, 'y');
    for (let s = 0; s < 6; s++) {
      const slit = new THREE.Mesh(slitGeo, s % 2 === 0 ? mats.goldPlating : mats.cinnabarAnodized);
      slit.position.set(-1.08, -0.5 + s * 0.19, -0.78 + s * 0.34);
      g.add(slit);
    }

    // Precision 0.1-Step Vernier Phase-Lock Timing Dial with Toothed Escapement Ring & Lock Needle
    const dialBase = new THREE.Mesh(hiResCyl(0.46, 0.48, 0.14, 20), mats.stainlessMachined);
    dialBase.position.set(-1.12, 0.66, -0.18);
    const dialRim = new THREE.Mesh(hiResTorus(0.46, 0.036, 8, 24), mats.goldPlating);
    dialRim.rotation.x = Math.PI / 2;
    dialRim.position.set(-1.12, 0.74, -0.18);
    const tickGeo = createChamferedBoxGeo(0.05, 0.06, 0.12, 0.006, 0.004, 'y');
    for (let t = 0; t < 10; t++) {
      const ang = (Math.PI * 2 * t) / 10;
      const tk = new THREE.Mesh(tickGeo, t === 3 ? mats.bodyRecRed : mats.copperHybridBond);
      tk.position.set(-1.12 + Math.cos(ang) * 0.34, 0.76, -0.18 + Math.sin(ang) * 0.34);
      tk.rotation.y = -ang;
      tk.userData.noEdges = true;
      g.add(tk);
    }
    addVectorArrow(
      g,
      new THREE.Vector3(-1.12, 0.79, -0.18),
      new THREE.Vector3(-0.82, 0.79, -0.02),
      0.024,
      0.058,
      0.12,
      mats.bodyRecRed
    );
    g.add(dialBase, dialRim);

    // --- RIGHT ZONE: Centered 6x6 RGGB Micro-Bayer Mosaic -> 3-Tier Golomb-Rice/CABAC Lossless RAW Pyramid ---
    const bayerTileGeo = createChamferedBoxGeo(0.22, 0.12, 0.22, 0.014, 0.008, 'y');
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        const mat =
          r % 2 === 0 && c % 2 === 0
            ? mats.bodyRecRed
            : r % 2 === 1 && c % 2 === 1
              ? mats.vcWorkingFluidCyan
              : mats.mofEmerald;
        const bt = new THREE.Mesh(bayerTileGeo, mat);
        bt.position.set(0.26 + c * 0.26, -0.62, -0.65 + r * 0.26);
        bt.userData.noEdges = true;
        g.add(bt);
      }
    }

    // 3-Tier Stepped Lossless Entropy Compression Pyramid (2D Predictor -> Golomb-Rice -> Bitstream Packer)
    const tier1 = new THREE.Mesh(
      createChamferedBoxGeo(1.18, 0.22, 1.18, 0.03, 0.015, 'y'),
      mats.copperHybridBond
    );
    tier1.position.set(0.91, -0.24, 0.0);
    const tier2 = new THREE.Mesh(
      createChamferedBoxGeo(0.86, 0.22, 0.86, 0.03, 0.015, 'y'),
      mats.goldPlating
    );
    tier2.position.set(0.91, 0.06, 0.0);
    const tier3 = new THREE.Mesh(
      createChamferedBoxGeo(0.56, 0.24, 0.56, 0.03, 0.015, 'y'),
      mats.npuSiliconDie
    );
    tier3.position.set(0.91, 0.36, 0.0);
    g.add(tier1, tier2, tier3);

    // Dual Output Bitstream Chutes: Gold 14-bit Lossless RAW (L/M/S) & Cyan 10-bit 4:2:2 HEIF
    addVectorArrow(
      g,
      new THREE.Vector3(1.0, 0.62, -0.14),
      new THREE.Vector3(1.88, 0.72, -0.58),
      0.034,
      0.082,
      0.18,
      mats.goldPlating
    );
    addVectorArrow(
      g,
      new THREE.Vector3(1.0, 0.62, 0.14),
      new THREE.Vector3(1.88, 0.72, 0.58),
      0.034,
      0.082,
      0.18,
      mats.vcWorkingFluidCyan
    );

    // Front-Left Balanced Quadrant: 0.5px 16-Shot Pixel-Shift Multi-Shooting IBIS Piezo Actuator Stage
    const psStageBase = new THREE.Mesh(
      createChamferedBoxGeo(0.88, 0.1, 0.78, 0.02, 0.01, 'y'),
      mats.stainlessMachined
    );
    psStageBase.position.set(-1.12, -0.64, 1.02);
    g.add(psStageBase);
    const psQuadGeo = createChamferedBoxGeo(0.24, 0.14, 0.22, 0.015, 0.008, 'y');
    for (const qx of [-0.17, 0.17]) {
      for (const qz of [-0.15, 0.15]) {
        const q = new THREE.Mesh(
          psQuadGeo,
          qx < 0 && qz < 0
            ? mats.bodyRecRed
            : qx > 0 && qz > 0
              ? mats.vcWorkingFluidCyan
              : mats.mofEmerald
        );
        q.position.set(-1.12 + qx, -0.52, 1.02 + qz);
        q.userData.noEdges = true;
        g.add(q);
      }
    }
    const piezoDotGeo = hiResCyl(0.05, 0.05, 0.16, 8);
    for (const [ax, az] of [
      [-1.5, 1.02],
      [-0.74, 1.02],
      [-1.12, 0.68],
      [-1.12, 1.36],
    ]) {
      const act = new THREE.Mesh(piezoDotGeo, mats.goldPlating);
      act.position.set(ax, -0.56, az);
      act.userData.noEdges = true;
      g.add(act);
    }

    // Precision Sync Clock Bridge linking Variable-Shutter Sequencer to RAW/HEIF Pipeline
    const syncBridge = new THREE.Mesh(
      createChamferedBoxGeo(1.48, 0.12, 0.22, 0.02, 0.01, 'y'),
      mats.sinteredSilver
    );
    syncBridge.position.set(-0.08, 0.66, -0.08);
    g.add(syncBridge);

    parts.push(
      finalizeWave3Part(
        'xv2-xr2-var-shutter-lossless-raw',
        103,
        '#22c55e',
        g,
        new THREE.Vector3(-7.825, 2.438, -14.5),
        new THREE.Vector3(22, -36, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-104. Stanford AFM 2025 / IEDM 2025 [0001] c-Axis (0002) AlN Phonon Thermal ILD (92-150 W/m·K)
  // =========================================================================
  {
    const g = new THREE.Group();
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.siliconBulk, mats);

    // Active FEOL GAA Nanosheet Hotspot Stripes + 14nm Amorphous SiO2 Interface Layer (TBC 150-300 MW/m^2K)
    const heatStripeGeo = createChamferedBoxGeo(3.86, 0.12, 0.42, 0.02, 0.01, 'y');
    for (let i = 0; i < 4; i++) {
      const hs = new THREE.Mesh(heatStripeGeo, i % 2 === 0 ? mats.bodyRecRed : mats.cinnabarAnodized);
      hs.position.set(0, -0.62, -1.05 + i * 0.7);
      hs.userData.noEdges = true;
      g.add(hs);
    }
    const sio2Inter = new THREE.Mesh(
      createChamferedBoxGeo(3.96, 0.08, 3.04, 0.02, 0.01, 'y'),
      mats.loficDielectric
    );
    sio2Inter.position.y = -0.5;
    g.add(sio2Inter);

    // --- LEFT 68%: Dense 5x4 Honeycomb Forest of 20-30nm Columnar [0001] c-Axis Wurtzite AlN Hex Crystal Grains ---
    // Front 2 rows stand completely OPEN in crisp architectural cutaway; rear 2 rows mate directly into CVD Diamond Cap!
    const alnColGeo = extrudeHiRes(createHexShape(0.2), 0.86, 0.015, 0.015, 1, 6);
    alnColGeo.rotateX(Math.PI / 2);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        const ax = -1.72 + c * 0.52 + (r % 2) * 0.2;
        const az = -1.04 + r * 0.68;
        const hVar = 0.86 + (((r * 3 + c * 5) % 4) * 0.05);
        const col = new THREE.Mesh(
          alnColGeo,
          (r + c) % 3 === 0
            ? mats.aluminaHighKFilm
            : (r + c) % 3 === 1
              ? mats.fluorineCoatCyan
              : mats.vcWorkingFluidCyan
        );
        col.scale.y = hVar;
        col.position.set(ax, -0.46 + 0.86 * hVar, az);
        col.userData.noEdges = true;
        g.add(col);
      }
    }

    // 8 Upward Ballistic Phonon-Flux Vector Needles racing openly along the [0001] c-axis hex columns!
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const px = -1.52 + c * 0.58;
        const pz = r === 0 ? 0.14 : 0.82;
        addVectorArrow(
          g,
          new THREE.Vector3(px, -0.34, pz),
          new THREE.Vector3(px, 0.68, pz),
          0.028,
          0.072,
          0.16,
          mats.goldPlating
        );
      }
    }

    // --- RIGHT 32% OPEN CUTAWAY COMPARISON: Conventional Amorphous SiO2 Thermal-Trap Pocket (1.4 W/m·K) ---
    // Open-front glass cradle so all trapped crimson phonon spheres & chaotic zigzag scatter paths shine unmistakably!
    const oxBase = new THREE.Mesh(
      createChamferedBoxGeo(0.96, 0.22, 2.74, 0.03, 0.015, 'y'),
      mats.lensXaGlass
    );
    oxBase.position.set(1.44, -0.34, 0);
    const oxBackWall = new THREE.Mesh(
      createChamferedBoxGeo(0.96, 0.72, 0.34, 0.03, 0.015, 'y'),
      mats.lensXaGlass
    );
    oxBackWall.position.set(1.44, 0.12, -1.2);
    const oxSideWall = new THREE.Mesh(
      createChamferedBoxGeo(0.18, 0.72, 2.4, 0.02, 0.01, 'y'),
      mats.lensXaGlass
    );
    oxSideWall.position.set(1.83, 0.12, 0.16);
    g.add(oxBase, oxBackWall, oxSideWall);

    // 14 Vivid Glowing Crimson/Orange Trapped Phonon Spheres + Chaotic Zigzag Scatter Struts in Open Pocket!
    const trapBeadGeo = hiResSphere(0.092, 8, 6);
    const trapPts: THREE.Vector3[] = [];
    for (let k = 0; k < 12; k++) {
      const pt = new THREE.Vector3(
        1.14 + ((k * 37) % 4) * 0.16,
        -0.14 + ((k * 19) % 3) * 0.24,
        -0.88 + k * 0.19
      );
      trapPts.push(pt);
      const tb = new THREE.Mesh(trapBeadGeo, k % 2 === 0 ? mats.bodyRecRed : mats.cinnabarAnodized);
      tb.position.copy(pt);
      tb.userData.noEdges = true;
      g.add(tb);
      if (k > 0) {
        g.add(makeBondStrut(trapPts[k - 1], pt, 0.024, mats.cinnabarAnodized, 6));
      }
    }

    // Rear-Half Architectural Cutaway: Faceted CVD Diamond Phonon Spreader Cap + Hollow Copper Clamp Frame
    const diamCap = new THREE.Mesh(
      createChamferedBoxGeo(2.74, 0.18, 1.48, 0.05, 0.025, 'y'),
      mats.lensXaGlass
    );
    diamCap.position.set(-0.52, 0.45, -0.74);
    const cuClampGeo = extrudeHiRes(
      createFrameShape(2.84, 1.56, 0.06, 2.44, 1.18, 0.04),
      0.12,
      0.015,
      0.015,
      1,
      6
    );
    cuClampGeo.rotateX(Math.PI / 2);
    const cuClamp = new THREE.Mesh(cuClampGeo, mats.copperHeatSpreader);
    cuClamp.position.set(-0.52, 0.62, -0.74);
    g.add(diamCap, cuClamp);

    // Rear-Right Picosecond TDTR (Time-Domain Thermoreflectance) Pump/Probe Laser Cone
    const tdtrLens = new THREE.Mesh(hiResCyl(0.24, 0.18, 0.16, 12), mats.matteBlackAnodized);
    tdtrLens.position.set(0.32, 0.78, -0.74);
    const tdtrBeam = new THREE.Mesh(hiResCyl(0.11, 0.028, 0.38, 10), mats.goldPlating);
    tdtrBeam.position.set(0.32, 0.54, -0.74);
    tdtrBeam.userData.noEdges = true;
    g.add(tdtrLens, tdtrBeam);

    parts.push(
      finalizeWave3Part(
        'xv2-aln-phonon-thermal-dielectric',
        104,
        '#06b6d4',
        g,
        new THREE.Vector3(16.6, 13.748, -5),
        new THREE.Vector3(-32, -55, 56),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // X2-105. ASME JEP 2025/2026 & IEEE ITherm 2025 Direct-on-Si Hexagonal LPBF Copper Wick
  //         + 3-Path SLM 316L Phase-Separating Jet-Impingement Evaporator
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bottom High-Flux Direct-on-Silicon Heater Base (ZERO TIM! Direct LPBF Copper Wick on Si!)
    addMetrologyPedestal(g, 4.52, 3.72, -0.88, mats.copperHeatSpreader, mats);

    // Active Silicon Thermal Test Chip Slab with glowing underside heat-flux bus bars
    const siHeater = new THREE.Mesh(
      createChamferedBoxGeo(3.98, 0.14, 3.12, 0.03, 0.015, 'y'),
      mats.siliconBulk
    );
    siHeater.position.y = -0.62;
    const heatFluxPlate = new THREE.Mesh(
      createChamferedBoxGeo(3.84, 0.06, 2.96, 0.02, 0.01, 'y'),
      mats.cinnabarAnodized
    );
    heatFluxPlate.position.y = -0.52;
    g.add(siHeater, heatFluxPlate);

    // --- 2x2 ARRAY OF TRUE HEXAGONAL LPBF POROUS COPPER WICK UNIT CELLS (6 Triangular Boiling Petals + 6 Radial Liquid-Feed Grooves!) ---
    const petalGeo = extrudeHiRes(createTriPetalShape(0.14, 0.72, 0.36), 0.34, 0.012, 0.012, 1, 4);
    petalGeo.rotateX(Math.PI / 2);
    const granuleGeo = hiResSphere(0.052, 6, 6);
    const jetStreamGeo = hiResCyl(0.065, 0.11, 0.56, 10);
    const vapBubGeo = hiResSphere(0.072, 8, 6);
    const ligGeo = createChamferedBoxGeo(0.68, 0.08, 0.11, 0.012, 0.006, 'y');
    const periphPortGeo = hiResCyl(0.075, 0.075, 0.32, 8);
    const inletNozGeo = hiResCyl(0.15, 0.09, 0.28, 12);

    const hexCenters: [number, number][] = [
      [-0.98, -0.74],
      [0.98, -0.74],
      [-0.98, 0.74],
      [0.98, 0.74],
    ];

    for (let hIdx = 0; hIdx < hexCenters.length; hIdx++) {
      const [hx, hz] = hexCenters[hIdx];
      const isRear = hz < 0;

      // Central sintered-copper jet stagnation hub
      const hub = new THREE.Mesh(hiResCyl(0.14, 0.16, 0.14, 12), mats.sinteredSilver);
      hub.position.set(hx, -0.44, hz);
      hub.userData.noEdges = true;
      g.add(hub);

      // 6 Triangular LPBF Porous Copper Boiling Petals separated by 6 open Radial Liquid-Feed Grooves
      for (let p = 0; p < 6; p++) {
        const ang = (Math.PI / 3) * p;
        const petal = new THREE.Mesh(petalGeo, p % 2 === 0 ? mats.copperHybridBond : mats.copperHeatSpreader);
        petal.position.set(hx, -0.15, hz);
        petal.rotation.y = ang;
        petal.userData.noEdges = true;
        g.add(petal);

        // Porous LPBF sintered copper micro-granules on petal surface + rising dielectric R1233zd(E) vapor bubbles!
        const gAng = ang;
        const gx = hx + Math.cos(gAng) * 0.44;
        const gz = hz - Math.sin(gAng) * 0.44;
        const gran = new THREE.Mesh(granuleGeo, mats.sinteredSilver);
        gran.position.set(gx, -0.12, gz);
        gran.userData.noEdges = true;
        g.add(gran);

        if (p % 2 === 0 || !isRear) {
          const bub = new THREE.Mesh(vapBubGeo, mats.vcWorkingFluidCyan);
          bub.position.set(gx, 0.06 + (p % 3) * 0.1, gz);
          bub.userData.noEdges = true;
          g.add(bub);
        }

        // SLM 316L Phase-Separating Radial Ligament Cover Plates sitting ONLY over the radial grooves (between petals!)
        // Leaving the triangular petals exposed so vapor escapes directly upward into the separate vapor plenum!
        const grooveAng = ang + Math.PI / 6;
        if (isRear || p % 2 === 0) {
          const lig = new THREE.Mesh(ligGeo, mats.stainlessMachined);
          lig.position.set(
            hx + Math.cos(grooveAng) * 0.42,
            0.04,
            hz - Math.sin(grooveAng) * 0.42
          );
          lig.rotation.y = grooveAng;
          lig.userData.noEdges = true;
          g.add(lig);
        }

        // 6 Peripheral Saturated-Liquid Outlet Return Nozzles around each hex unit cell perimeter
        if (isRear || p === 0 || p === 3) {
          const port = new THREE.Mesh(periphPortGeo, mats.titaniumRivet);
          port.position.set(
            hx + Math.cos(grooveAng) * 0.74,
            0.22,
            hz - Math.sin(grooveAng) * 0.74
          );
          port.userData.noEdges = true;
          g.add(port);
        }
      }

      // Path 1: Central Downward Impinging Liquid Jet Stream + Convergent SLM 316L Inlet Nozzle
      const jet = new THREE.Mesh(jetStreamGeo, mats.fluorineCoatCyan);
      jet.position.set(hx, -0.08, hz);
      jet.userData.noEdges = true;
      const inNoz = new THREE.Mesh(inletNozGeo, mats.titaniumRivet);
      inNoz.position.set(hx, 0.28, hz);
      g.add(jet, inNoz);
    }

    // --- CUTAWAY TOP 3-PATH SLM 316L STAINLESS PHASE-SEPARATING MANIFOLD (Rear half closed, Front half cutaway!) ---
    // Path 1 Liquid Inlet Distribution Manifold Deck (Rear Half)
    const manifoldRear = new THREE.Mesh(
      createChamferedBoxGeo(4.06, 0.2, 1.54, 0.04, 0.02, 'y'),
      mats.stainlessMachined
    );
    manifoldRear.position.set(0, 0.52, -0.78);
    g.add(manifoldRear);

    // Path 3 Raised Vapor-Outlet Exhaust Plenum Frame & Chimneys (in-situ liquid-vapor separation, -23 to -29% R_th!)
    const plenumFrameGeo = extrudeHiRes(
      createFrameShape(4.02, 1.46, 0.06, 3.48, 0.96, 0.04),
      0.24,
      0.02,
      0.02,
      1,
      6
    );
    plenumFrameGeo.rotateX(Math.PI / 2);
    const plenumFrame = new THREE.Mesh(plenumFrameGeo, mats.matteBlackAnodized);
    plenumFrame.position.set(0, 0.88, -0.78);
    g.add(plenumFrame);

    // Top Liquid-Inlet Header Pipe (Blue/Cyan) + Side Vapor-Exhaust Header Pipe (Gold) across rear manifold
    const headerGeo = hiResCyl(0.11, 0.11, 3.68, 12);
    headerGeo.rotateZ(Math.PI / 2);
    const liqHeader = new THREE.Mesh(headerGeo, mats.vcWorkingFluidCyan);
    liqHeader.position.set(0, 0.78, -0.78);
    const frontBridge = new THREE.Mesh(
      createChamferedBoxGeo(0.28, 0.14, 1.54, 0.02, 0.01, 'y'),
      mats.stainlessMachined
    );
    frontBridge.position.set(-0.98, 0.48, 0.0);
    const frontBridgeR = new THREE.Mesh(
      createChamferedBoxGeo(0.28, 0.14, 1.54, 0.02, 0.01, 'y'),
      mats.stainlessMachined
    );
    frontBridgeR.position.set(0.98, 0.48, 0.0);
    g.add(liqHeader, frontBridge, frontBridgeR);

    // Front Cutaway Flow Physics Vectors: Downward Liquid Jet (Cyan) + Upward Vapor Escape (Gold)
    addVectorArrow(
      g,
      new THREE.Vector3(-0.98, 0.88, 0.74),
      new THREE.Vector3(-0.98, 0.44, 0.74),
      0.032,
      0.08,
      0.16,
      mats.vcWorkingFluidCyan
    );
    addVectorArrow(
      g,
      new THREE.Vector3(0.98, 0.46, 0.74),
      new THREE.Vector3(0.98, 0.96, 0.74),
      0.032,
      0.08,
      0.16,
      mats.goldPlating
    );

    parts.push(
      finalizeWave3Part(
        'xv2-twophase-evaporative-pinfin-jet',
        105,
        '#3b82f6',
        g,
        new THREE.Vector3(16.6, 13.748, 5),
        new THREE.Vector3(32, -55, 56),
        cp,
        0.22
      )
    );
  }

  return parts;
}
