//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol4LowerParts.ts|unit=sensorFab|lines=330|exports=buildSensorFabVol4LowerParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { hiResCyl, hiResSphere, hiResTorus, applyPlanarUVs } from '../../engine/UltraDetailBuilders';
import {
  createVol4BoxGeo,
  finalizeVol4Part,
  makeIonImplantCannon,
  makeVol4Beam,
  makeVol4Plinth,
} from './sensorFabVol4Shared';

/**
 * Builds Parts F4-34 through F4-45 of Sensor Fab Vol.4 on the Forward-Stepped Lower Cleanroom Terrace:
 * - Row 4 (Block 3-E, Z = +24.5, Y = -8.8, 7 spacious stations): Offset Spacer, Masks #20–#24 (including Crown Jewel Mask #22 Surface P+ Pinning Lid!)
 * - Row 5 (Block 3-F, Z = +42.5, Y = -8.8, 5 monumental finale stations): 1,000°C Spike RTA Flash, Crown Jewel Mask #25 Salicide Block (SAB), CoSi2/NiSi Silicide, 400°C H2 Sintering, and Vol.5 BEOL 210-Step Portal!
 */
export function buildSensorFabVol4LowerParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const matViolet = mats.evfDichroicMirror;
  const matBlue = mats.vcWorkingFluidCyan;
  const matCyan = mats.irCutGlass;
  const matAmber = mats.goldPlating;
  const matCopper = mats.copperCoil;
  const matGreen = mats.cfaGreen;
  const matRed = mats.cfaRed;
  const matDark = mats.matteBlackAnodized;
  const matSteel = mats.stainlessMachined;

  // =========================================================================
  // LOWER ROW 1 (Z = +24.5, Y = -8.8, 7 Spacious Stations F4-34–F4-40: Block 3-E, pitch 16.5mm)
  // =========================================================================
  const row4X = (idx: number) => -49.5 + idx * 16.5;

  // F4-34 (P03-297~298): 10nm ALD/LPCVD Offset Spacer
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(13.2, 9.2, 1.2, mats, matCyan));
    const si = new THREE.Mesh(createVol4BoxGeo(10.6, 1.6, 6.0, 0.14, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.0, 0.2);
    const gate = new THREE.Mesh(createVol4BoxGeo(3.2, 2.4, 5.4, 0.12, 0.04, 'y'), matDark);
    gate.position.set(0, 3.0, 0.2);
    // Crisp 10nm ALD offset spacer shell hugging both sides of gate!
    for (const dx of [-1.82, 1.82]) {
      const off = new THREE.Mesh(new THREE.BoxGeometry(0.42, 2.45, 5.5), matCyan);
      off.position.set(dx, 3.0, 0.2);
      g.add(off);
    }
    g.add(si, gate);
    parts.push(
      finalizeVol4Part('fab4-p297-offset-spacer', 34, '#06b6d4', g, new THREE.Vector3(row4X(0), -8.8, 24.5), new THREE.Vector3(-22, -9, 10), cp)
    );
  }

  // F4-35 (P03-299~310) [Mask #20]: Pixel Low-Leak NLDD & Floating Diffusion (FD) Soft Phosphorus Implant
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(13.2, 9.2, 1.2, mats, matBlue));
    const si = new THREE.Mesh(createVol4BoxGeo(10.6, 1.8, 6.0, 0.14, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.1, 0.2);
    const tg = new THREE.Mesh(createVol4BoxGeo(2.8, 2.1, 5.4, 0.1, 0.04, 'y'), matDark);
    tg.position.set(-1.5, 3.05, 0.2);
    // Gentle light-doped FD cup next to TG minimizing starry-sky dark leak!
    const fdLdd = new THREE.Mesh(createVol4BoxGeo(3.4, 0.9, 5.2, 0.12, 0.03, 'y'), matBlue);
    fdLdd.position.set(2.2, 1.75, 0.2);
    const cannon = makeIonImplantCannon(matBlue, mats, 0, 5.2);
    cannon.position.x = 2.2;
    g.add(si, tg, fdLdd, cannon);
    parts.push(
      finalizeVol4Part('fab4-m20-pixel-nldd-fd', 35, '#3b82f6', g, new THREE.Vector3(row4X(1), -8.8, 24.5), new THREE.Vector3(-15, -9, 10), cp)
    );
  }

  // F4-36 (P03-311~322) [Mask #21]: Periphery Circuit NLDD / PLDD (As / BF2) Endurance Implant
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(13.2, 9.2, 1.2, mats, matViolet));
    const si = new THREE.Mesh(createVol4BoxGeo(10.6, 1.8, 6.0, 0.14, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.1, 0.2);
    const gate = new THREE.Mesh(createVol4BoxGeo(2.4, 2.2, 5.4, 0.1, 0.04, 'y'), matDark);
    gate.position.set(0, 3.1, 0.2);
    for (const sx of [-2.4, 2.4]) {
      const ldd = new THREE.Mesh(createVol4BoxGeo(2.2, 0.72, 5.2, 0.1, 0.03, 'y'), sx < 0 ? matCyan : matViolet);
      ldd.position.set(sx, 1.8, 0.2);
      g.add(ldd);
    }
    g.add(si, gate, makeIonImplantCannon(matViolet, mats, 0, 5.2));
    parts.push(
      finalizeVol4Part('fab4-m21-periph-ldd', 36, '#6366f1', g, new THREE.Vector3(row4X(2), -8.8, 24.5), new THREE.Vector3(-8, -9, 10), cp)
    );
  }

  // F4-37 (P03-323~328, 6 non-litho steps): Self-Aligned Sidewall "Shoulder-Pad" Spacer (40-80nm)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(13.2, 9.2, 1.2, mats, matAmber));
    const si = new THREE.Mesh(createVol4BoxGeo(10.6, 1.7, 6.0, 0.14, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.05, 0.2);
    const gate = new THREE.Mesh(createVol4BoxGeo(2.8, 2.6, 5.4, 0.12, 0.04, 'y'), matDark);
    gate.position.set(0, 3.2, 0.2);
    // Chunky sculpted dual-layer SiO2/SiN "Shoulder Pads" flanking the gate!
    for (const sx of [-1, 1]) {
      const innerOx = new THREE.Mesh(new THREE.BoxGeometry(0.45, 2.45, 5.45), matCyan);
      innerOx.position.set(sx * 1.65, 3.1, 0.2);
      const outerSin = new THREE.Mesh(new THREE.BoxGeometry(0.85, 2.05, 5.45), matAmber);
      outerSin.position.set(sx * 2.28, 2.9, 0.2);
      g.add(innerOx, outerSin);
    }
    parts.push(
      finalizeVol4Part('fab4-p323-sidewall-spacer', 37, '#f59e0b', g, new THREE.Vector3(row4X(3), -8.8, 24.5), new THREE.Vector3(0, -9, 10), cp)
    );
  }

  // F4-38 (P03-329~340) [Mask #22 — CROWN JEWEL OF ALL CIS!!]: Surface P+ Pinning Lid (PPD 1/1,000 Dark Current!)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(13.6, 9.6, 1.2, mats, matRed));
    // Monumental Cutaway showing Buried N-PD + Crimson-Gold P+ Pinning Surface Lid sealing dark current!
    const ppdBlock = new THREE.Mesh(
      createVol4BoxGeo(11.2, 3.1, 6.2, 0.16, 0.05, 'y'),
      mats.ultra.fab4PpdPinningBarrier
    );
    ppdBlock.position.set(0, 1.75, 0.2);
    g.add(ppdBlock);
    // Glowing Crimson Surface P+ Pinning Lid Slab capping the PD!
    const lid = new THREE.Mesh(createVol4BoxGeo(8.2, 0.56, 6.3, 0.12, 0.04, 'y'), matRed);
    lid.position.set(-1.3, 3.6, 0.2);
    g.add(lid);
    // Flanking Transfer Gate roof showing self-alignment right up to the gate edge!
    const tg = new THREE.Mesh(createVol4BoxGeo(2.2, 2.1, 5.6, 0.1, 0.04, 'y'), matDark);
    tg.position.set(3.9, 4.35, 0.2);
    g.add(tg);
    // Low-energy Boron/BF2 ion shower sealing the surface
    const cannon = makeIonImplantCannon(matRed, mats, 0, 6.6);
    cannon.position.x = -1.3;
    g.add(cannon);

    parts.push(
      finalizeVol4Part('fab4-m22-surface-pinning-ppd', 38, '#e11d48', g, new THREE.Vector3(row4X(4), -8.8, 24.5), new THREE.Vector3(8, -10, 12), cp)
    );
  }

  // F4-39 (P03-341~352) [Mask #23]: High-Dose N+ Source/Drain & FD Contact Implant (10^15 /cm^2)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(13.2, 9.2, 1.2, mats, matBlue));
    const si = new THREE.Mesh(createVol4BoxGeo(10.6, 1.8, 6.0, 0.14, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.1, 0.2);
    const gate = new THREE.Mesh(createVol4BoxGeo(2.6, 2.3, 5.4, 0.1, 0.04, 'y'), matDark);
    gate.position.set(0, 3.15, 0.2);
    for (const sx of [-3.3, 3.3]) {
      const nPlus = new THREE.Mesh(createVol4BoxGeo(2.8, 1.1, 5.2, 0.1, 0.03, 'y'), matBlue);
      nPlus.position.set(sx, 1.75, 0.2);
      g.add(nPlus);
    }
    g.add(si, gate, makeIonImplantCannon(matBlue, mats, 0, 5.4));
    parts.push(
      finalizeVol4Part('fab4-m23-nplus-sd-contact', 39, '#0284c7', g, new THREE.Vector3(row4X(5), -8.8, 24.5), new THREE.Vector3(15, -9, 10), cp)
    );
  }

  // F4-40 (P03-353~364) [Mask #24]: High-Dose P+ Source/Drain & 0V Substrate Well-Tap Implant
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(13.2, 9.2, 1.2, mats, matViolet));
    const si = new THREE.Mesh(createVol4BoxGeo(10.6, 1.8, 6.0, 0.14, 0.04, 'y'), mats.siliconBulk);
    si.position.set(0, 1.1, 0.2);
    const gate = new THREE.Mesh(createVol4BoxGeo(2.6, 2.3, 5.4, 0.1, 0.04, 'y'), matDark);
    gate.position.set(0, 3.15, 0.2);
    for (const sx of [-3.3, 3.3]) {
      const pPlus = new THREE.Mesh(createVol4BoxGeo(2.8, 1.1, 5.2, 0.1, 0.03, 'y'), matViolet);
      pPlus.position.set(sx, 1.75, 0.2);
      g.add(pPlus);
    }
    g.add(si, gate, makeIonImplantCannon(matViolet, mats, 0, 5.4));
    parts.push(
      finalizeVol4Part('fab4-m24-pplus-sd-welltap', 40, '#8b5cf6', g, new THREE.Vector3(row4X(6), -8.8, 24.5), new THREE.Vector3(22, -9, 10), cp)
    );
  }

  // =========================================================================
  // LOWER ROW 2 (Z = +42.5, Y = -8.8, 5 Monumental Finale Stations F4-41–F4-45: Block 3-F, pitch 22.5mm)
  // =========================================================================
  const row5X = (idx: number) => -45.0 + idx * 22.5;

  // F4-41 (P03-365~366): 1,000–1,050°C <1s Spike RTA Flash Activation (AMAT / SCREEN)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(18.0, 9.6, 1.2, mats, matRed));
    // Wafer on quartz pins bathed in an array of 5 glowing Halogen/Laser Spike RTA Flash Lamps!
    const wafer = new THREE.Mesh(hiResCyl(4.4, 4.4, 0.42, 28), mats.siliconSensorDie);
    wafer.position.set(0, 1.2, 0.3);
    g.add(wafer);
    const hood = new THREE.Mesh(createVol4BoxGeo(13.6, 1.2, 6.8, 0.25, 0.06, 'y'), matDark);
    hood.position.set(0, 6.2, 0.3);
    g.add(hood);
    for (let i = -2; i <= 2; i++) {
      const lamp = new THREE.Mesh(hiResCyl(0.45, 0.45, 5.8, 12), i % 2 === 0 ? matAmber : matRed);
      lamp.rotation.x = Math.PI / 2;
      lamp.position.set(i * 2.4, 5.2, 0.3);
      lamp.userData.noEdges = true;
      g.add(lamp);
      const flash = makeVol4Beam(0.75, 1.15, 3.4, matAmber);
      flash.position.set(i * 2.4, 3.2, 0.3);
      g.add(flash);
    }
    parts.push(
      finalizeVol4Part('fab4-p365-spike-rta-flash', 41, '#ef4444', g, new THREE.Vector3(row5X(0), -8.8, 42.5), new THREE.Vector3(-22, -12, 20), cp)
    );
  }

  // F4-42 (P03-367~378) [Mask #25 — CROWN JEWEL CIS SECRET!!]: Salicide Block (SAB 30-50nm) Pixel Shield!
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(18.0, 9.6, 1.2, mats, matGreen));
    // Giant Side-by-Side Split Display (`fab4SalicideBlockSplit`) + 3D Emerald SAB Dome Shielding Left Pixel while Opening Right Periphery!
    const base = new THREE.Mesh(
      createVol4BoxGeo(14.8, 1.8, 6.8, 0.16, 0.05, 'y'),
      mats.ultra.fab4SalicideBlockSplit
    );
    base.position.set(0, 1.1, 0.3);
    g.add(base);
    // Left: Emerald SAB Protective Canopy Cap covering the Pixel Area completely!
    const sabCanopy = new THREE.Mesh(createVol4BoxGeo(6.8, 0.85, 6.2, 0.16, 0.04, 'y'), matGreen);
    sabCanopy.position.set(-3.6, 2.75, 0.3);
    g.add(sabCanopy);
    // Right: Exposed Periphery Transistors ready for metallic silicidation!
    for (const dx of [2.1, 4.9]) {
      const tr = new THREE.Mesh(createVol4BoxGeo(1.8, 1.8, 5.2, 0.1, 0.04, 'y'), matDark);
      tr.position.set(dx, 2.9, 0.3);
      g.add(tr);
    }
    // Floating vertical info screen behind
    const screen = new THREE.Mesh(new THREE.BoxGeometry(10.8, 3.4, 0.24), mats.ultra.fab4SalicideBlockSplit);
    applyPlanarUVs(screen.geometry, 10.8, 3.4, 'xy');
    screen.position.set(0, 5.6, -2.5);
    g.add(screen);

    parts.push(
      finalizeVol4Part('fab4-m25-salicide-block-sab', 42, '#10b981', g, new THREE.Vector3(row5X(1), -8.8, 42.5), new THREE.Vector3(-11, -13, 22), cp)
    );
  }

  // F4-43 (P03-379): Self-Aligned Silicide (CoSi2 / NiSi) Formation & Unreacted Metal Strip (AMAT / ULVAC)
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(18.0, 9.6, 1.2, mats, matAmber));
    // Left Pixel stays pure emerald-protected zero-metal; Right Periphery turns shiny golden-silver NiSi/CoSi2!
    const pixSide = new THREE.Mesh(createVol4BoxGeo(6.8, 2.0, 6.2, 0.14, 0.04, 'y'), matBlue);
    pixSide.position.set(-3.7, 1.2, 0.3);
    const sabCap = new THREE.Mesh(createVol4BoxGeo(7.0, 0.55, 6.3, 0.1, 0.03, 'y'), matGreen);
    sabCap.position.set(-3.7, 2.55, 0.3);
    const periphSide = new THREE.Mesh(createVol4BoxGeo(6.8, 2.0, 6.2, 0.14, 0.04, 'y'), matDark);
    periphSide.position.set(3.7, 1.2, 0.3);
    // Gleaming Gold/Silver CoSi2 / NiSi metallic contacts formed ONLY on periphery!
    for (const dx of [1.8, 3.7, 5.6]) {
      const silicide = new THREE.Mesh(createVol4BoxGeo(1.3, 0.72, 5.6, 0.08, 0.03, 'y'), matAmber);
      silicide.position.set(dx, 2.58, 0.3);
      g.add(silicide);
    }
    // Overhead Co/Ni Sputter Target Disc
    const target = new THREE.Mesh(hiResCyl(3.4, 3.6, 0.75, 22), matSteel);
    target.position.set(0, 5.6, 0.3);
    g.add(pixSide, sabCap, periphSide, target);
    parts.push(
      finalizeVol4Part('fab4-p379-salicide-cosi-nisi', 43, '#f59e0b', g, new THREE.Vector3(row5X(2), -8.8, 42.5), new THREE.Vector3(0, -12, 20), cp)
    );
  }

  // F4-44 (P03-380): 400°C N2/H2 Forming-Gas Hydrogen Sintering & Pre-BEOL WAT Inspection
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(18.0, 9.6, 1.2, mats, matCyan));
    // Silicon/Oxide interface with glowing Cyan Hydrogen (H2) atoms snapping onto dangling bonds!
    const si = new THREE.Mesh(createVol4BoxGeo(13.8, 1.9, 6.2, 0.16, 0.05, 'y'), mats.siliconBulk);
    si.position.set(0, 1.15, 0.3);
    const ox = new THREE.Mesh(createVol4BoxGeo(13.8, 0.9, 6.2, 0.14, 0.04, 'y'), mats.quartzOlpf);
    ox.position.set(0, 2.65, 0.3);
    g.add(si, ox);
    // Row of luminous Hydrogen passivating atoms healing interface traps
    for (let i = -3; i <= 3; i++) {
      const hAtom = new THREE.Mesh(hiResSphere(0.55, 12, 10), matCyan);
      hAtom.position.set(i * 1.85, 3.65, 0.3);
      hAtom.userData.noEdges = true;
      g.add(hAtom);
    }
    const dome = new THREE.Mesh(hiResTorus(4.6, 0.24, 10, 32), matGreen);
    dome.rotation.x = Math.PI / 2;
    dome.position.set(0, 5.1, 0.3);
    g.add(dome);
    parts.push(
      finalizeVol4Part('fab4-p380-h2-sinter-feol-wat', 44, '#06b6d4', g, new THREE.Vector3(row5X(3), -8.8, 42.5), new THREE.Vector3(11, -12, 20), cp)
    );
  }

  // F4-45 (FEOL Complete 490/2,110 -> Vol.5 BEOL 210-Step Portal): Unconnected Pixel Islands awaiting 5-Story Copper Highway!
  {
    const g = new THREE.Group();
    g.add(makeVol4Plinth(18.2, 9.6, 1.2, mats, matAmber));
    // 4 Completed 4T-PPD Pixel Islands gleaming below, with translucent 5-story Copper BEOL Highway Arch rising above!
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const island = new THREE.Mesh(createVol4BoxGeo(2.6, 1.8, 2.4, 0.12, 0.04, 'y'), (r + c) % 2 === 0 ? matBlue : matGreen);
        island.position.set(-4.8 + c * 3.2, 1.1, -1.2 + r * 3.0);
        const cap = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.32, 2.2), matRed);
        cap.position.set(-4.8 + c * 3.2, 2.18, -1.2 + r * 3.0);
        g.add(island, cap);
      }
    }
    // Glowing Golden Vol.5 BEOL 210-Step 5-Story Copper Highway Portal Arch!
    const arch = new THREE.Mesh(hiResTorus(5.6, 0.38, 12, 36), matAmber);
    arch.position.set(0, 5.8, 0.3);
    g.add(arch);
    for (let ly = 0; ly < 3; ly++) {
      const cuBar = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.28, 0.45), matCopper);
      cuBar.position.set(0, 3.9 + ly * 0.95, 0.3);
      cuBar.userData.noEdges = true;
      g.add(cuBar);
    }

    parts.push(
      finalizeVol4Part('fab4-feol-380-to-vol5-beol', 45, '#f59e0b', g, new THREE.Vector3(row5X(4), -8.8, 42.5), new THREE.Vector3(22, -13, 22), cp)
    );
  }

  return parts;
}
