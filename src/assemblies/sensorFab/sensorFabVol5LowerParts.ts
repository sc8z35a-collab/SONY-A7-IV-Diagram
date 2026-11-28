//@FLOW_MAP|file=src/assemblies/sensorFab/sensorFabVol5LowerParts.ts|unit=sensorFab|lines=194|exports=buildSensorFabVol5LowerParts
import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import { hiResCyl, hiResSphere, hiResTorus } from '../../engine/UltraDetailBuilders';
import {
  createVol5BoxGeo,
  finalizeVol5Part,
  makeCmpHead,
  makeVol5Beam,
  makeVol5Plinth,
} from './sensorFabVol5Shared';

/**
 * Builds Parts F5-33 through F5-38 of Sensor Fab Vol.5 on the Forward-Stepped Lower Cleanroom Terrace:
 * - Lower Row 4 (Block 4-E, Z = +29.0, Y = -8.8, 6 Monumental Hybrid-Bonding Finale Stations):
 *   F5-33: Hybrid Bonding SiO2 / SiCN Hydrogen-Bonding Dielectric
 *   F5-34: Mask #37 Hybrid Bonding Via (HB-Via, 1-6µm pitch)
 *   F5-35: Mask #38 Hybrid Bonding Cu Pads (HB-Pad — 0.5-3.0µm / 50.4M Pads!)
 *   F5-36: CROWN JEWEL Hybrid Bonding Ultra-Flat CMP (Ra < 0.3nm & Intentional 2-5nm Cu Recess!)
 *   F5-37: Pre-Bond AFM Atomic-Needle Scanner + KLA Surfscan Zero-Dust Laser
 *   F5-38: 700-Step Pixel Wafer Completion Portal -> Vol.6 Logic Wafer (720 Steps) & Partial vs Full Stacking!
 *
 * Notice explodeOffset.y = -10 so all 6 lower stations stay cleanly ~16mm ABOVE the lowered terrace deck (dy = -26)!
 */
export function buildSensorFabVol5LowerParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  const matCopper = mats.copperCoil;
  const matGold = mats.goldPlating;
  const matSteel = mats.stainlessMachined;
  const matDark = mats.matteBlackAnodized;
  const matBlue = mats.vcWorkingFluidCyan;
  const matCyan = mats.irCutGlass;
  const matViolet = mats.evfDichroicMirror;
  const matGreen = mats.cfaGreen;
  const matRed = mats.cfaRed;

  const row4X = (idx: number) => -48.0 + idx * 19.2;

  // F5-33 (P04-179~181): Hybrid Bonding Dedicated SiO2 / SiCN Hydrogen-Bonding Dielectric
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(15.6, 10.6, 1.2, mats, matBlue));
    const sub = new THREE.Mesh(createVol5BoxGeo(12.6, 1.5, 7.2, 0.16, 0.04, 'y'), matDark);
    sub.position.set(0, 0.95, 0);
    // Gleaming ultra-uniform SiCN / TEOS-SiO2 hydrophilic dielectric layer!
    const sicn = new THREE.Mesh(createVol5BoxGeo(12.6, 1.35, 7.2, 0.16, 0.04, 'y'), matBlue);
    sicn.position.set(0, 2.38, 0);
    // Floating -OH Hydrogen-Bonding Glow Nodes hovering cleanly across the top face
    for (let ix = -2; ix <= 2; ix++) {
      const oh = new THREE.Mesh(hiResSphere(0.36, 12, 10), matCyan);
      oh.position.set(ix * 2.2, 3.55, 0);
      oh.userData.noEdges = true;
      g.add(oh);
    }
    g.add(sub, sicn);
    parts.push(
      finalizeVol5Part('fab5-p179-hb-sicn-dielectric', 33, '#06b6d4', g, new THREE.Vector3(row4X(0), -8.8, 29.0), new THREE.Vector3(-22, -10, 14), cp)
    );
  }

  // F5-34 (P04-182~193) [Mask #37]: Hybrid Bonding Via (HB-Via, 1–6µm Pitch)
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(15.6, 10.6, 1.2, mats, matViolet));
    const m5Base = new THREE.Mesh(createVol5BoxGeo(12.6, 1.1, 7.2, 0.14, 0.04, 'y'), matCopper);
    m5Base.position.set(0, 0.75, 0);
    const dielec = new THREE.Mesh(createVol5BoxGeo(12.6, 2.4, 7.2, 0.16, 0.04, 'y'), mats.sswfGlass);
    dielec.position.set(0, 2.5, 0);
    dielec.userData.noEdges = true;
    // Dense array of precision HB-Vias bridging M5 upward to the rooftop bonding plane
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const via = new THREE.Mesh(hiResCyl(0.34, 0.3, 2.55, 12), matCopper);
        via.position.set(ix * 2.2, 2.55, iz * 2.0);
        g.add(via);
      }
    }
    g.add(m5Base, dielec);
    parts.push(
      finalizeVol5Part('fab5-m37-hb-via-pattern', 34, '#7c3aed', g, new THREE.Vector3(row4X(1), -8.8, 29.0), new THREE.Vector3(-13, -10, 14), cp)
    );
  }

  // F5-35 (P04-194~205) [CROWN JEWEL Mask #38]: Hybrid Bonding Cu Pads (HB-Pad — 0.5–3.0µm / 50.4M Pads!)
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(15.6, 10.6, 1.2, mats, matCopper));
    // Textured 50.4M Cu-Cu Hybrid Pad Mirror Bed
    const padSlab = new THREE.Mesh(
      createVol5BoxGeo(12.8, 1.6, 7.4, 0.16, 0.04, 'y'),
      mats.ultra.fab5HbCuPadArray50m
    );
    padSlab.position.set(0, 1.0, 0);
    // 3D Sculpted Uniform Cu-Cu Pads + Peripheral Dummy Pads!
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const isDummy = Math.abs(ix) === 2;
        const pad = new THREE.Mesh(
          createVol5BoxGeo(1.45, 0.72, 1.45, 0.1, 0.03, 'y'),
          isDummy ? matGold : matCopper
        );
        pad.position.set(ix * 2.25, 2.15, iz * 2.15);
        g.add(pad);
      }
    }
    g.add(padSlab);
    parts.push(
      finalizeVol5Part('fab5-m38-hb-cu-pad-50m', 35, '#ea580c', g, new THREE.Vector3(row4X(2), -8.8, 29.0), new THREE.Vector3(-4, -10, 14), cp)
    );
  }

  // F5-36 (P04-206~208) [CROWN JEWEL OF ALL STACKED CIS]: Hybrid Bonding Ultra-Flat CMP (Ra<0.3nm & 2–5nm Cu Recess!)
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(16.0, 10.8, 1.2, mats, matRed));
    // Giant Cutaway Cross-Section: Left & Right Mirror SiCN Shoulders + Center Copper Pad Recessed by 2–5nm!
    const leftSicn = new THREE.Mesh(createVol5BoxGeo(4.0, 2.6, 7.0, 0.12, 0.04, 'y'), matBlue);
    leftSicn.position.set(-4.2, 1.5, 0.3);
    const rightSicn = new THREE.Mesh(createVol5BoxGeo(4.0, 2.6, 7.0, 0.12, 0.04, 'y'), matBlue);
    rightSicn.position.set(4.2, 1.5, 0.3);
    // Intentionally recessed Copper Pad (visibly seated slightly below the SiCN top plane!)
    const cuRecess = new THREE.Mesh(createVol5BoxGeo(4.4, 2.05, 6.8, 0.12, 0.04, 'y'), matCopper);
    cuRecess.position.set(0, 1.22, 0.3);
    // Precision Ultra-Flat CMP Platter + AFM Recess Window Plaque!
    const cmp = makeCmpHead(3.4, mats, matGreen, 4.75);
    cmp.position.z = 1.4;
    const screen = new THREE.Mesh(
      createVol5BoxGeo(7.6, 3.8, 0.28, 0.12, 0.04, 'z'),
      mats.ultra.fab5CuRecessWindowMap
    );
    screen.position.set(0, 4.65, -2.5);
    g.add(leftSicn, rightSicn, cuRecess, cmp, screen);
    parts.push(
      finalizeVol5Part('fab5-p206-hb-recess-cmp', 36, '#e11d48', g, new THREE.Vector3(row4X(3), -8.8, 29.0), new THREE.Vector3(4, -10, 14), cp)
    );
  }

  // F5-37 (P04-209~210): Pre-Bond AFM Atomic-Needle Recess Scan + KLA Surfscan Zero-Particle Gate
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(15.6, 10.6, 1.2, mats, matGreen));
    const wafer = new THREE.Mesh(hiResCyl(4.4, 4.4, 0.55, 32), matBlue);
    wafer.position.set(0, 0.8, 0);
    // Sculpted AFM Cantilever Arm & Razor-Sharp Atomic Tip probing Cu recess!
    const armStand = new THREE.Mesh(createVol5BoxGeo(1.8, 3.8, 2.2, 0.14, 0.04, 'y'), matDark);
    armStand.position.set(-4.4, 2.1, 0);
    const cantilever = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.32, 0.72), matGold);
    cantilever.position.set(-1.6, 3.2, 0);
    cantilever.rotation.z = -0.18;
    const tip = new THREE.Mesh(hiResCyl(0.05, 0.42, 1.55, 10), matSteel);
    tip.position.set(0.8, 1.9, 0);
    tip.rotation.x = Math.PI;
    // KLA Surfscan Zero-Dust Laser Beam sweeping across right half
    const laserBeam = makeVol5Beam(0.14, 0.78, 3.2, matGreen);
    laserBeam.position.set(2.4, 2.6, 0);
    laserBeam.rotation.z = 0.25;
    g.add(wafer, armStand, cantilever, tip, laserBeam);
    parts.push(
      finalizeVol5Part('fab5-p209-afm-surfscan-zero', 37, '#10b981', g, new THREE.Vector3(row4X(4), -8.8, 29.0), new THREE.Vector3(13, -10, 14), cp)
    );
  }

  // F5-38 (Cumulative 700 Steps): Pixel Wafer Complete Portal -> Vol.6 Logic Wafer (720 Steps) & Partial vs Full Stack!
  {
    const g = new THREE.Group();
    g.add(makeVol5Plinth(16.0, 10.8, 1.2, mats, matGold));
    // Monumental Golden Portal Ring framing the Completed Pixel Wafer + Upcoming Logic Wafer Pair!
    const portal = new THREE.Mesh(hiResTorus(4.4, 0.42, 12, 48), matGold);
    portal.position.set(0, 4.7, 0);
    // Upper Flipped Pixel Wafer (Copper BEOL face down, ready to bond!)
    const pixelWafer = new THREE.Mesh(hiResCyl(3.3, 3.3, 0.55, 28), matCopper);
    pixelWafer.position.set(0, 5.4, 0);
    // Lower Upcoming Logic Wafer (Vol.6 Phase 5 — 720 Steps!)
    const logicWafer = new THREE.Mesh(hiResCyl(3.3, 3.3, 0.55, 28), matBlue);
    logicWafer.position.set(0, 3.4, 0);
    // Vertical Cu-Cu Bonding Spark Pillars linking the two wafers!
    for (let i = -2; i <= 2; i++) {
      const spark = makeVol5Beam(0.16, 0.16, 1.5, matGold);
      spark.position.set(i * 1.15, 4.4, 0);
      g.add(spark);
    }
    const podium = new THREE.Mesh(createVol5BoxGeo(11.6, 1.2, 6.2, 0.16, 0.04, 'y'), matDark);
    podium.position.set(0, 0.8, 0);
    g.add(portal, pixelWafer, logicWafer, podium);
    parts.push(
      finalizeVol5Part('fab5-beol-700-to-vol6-logic', 38, '#f59e0b', g, new THREE.Vector3(row4X(5), -8.8, 29.0), new THREE.Vector3(22, -10, 14), cp)
    );
  }

  return parts;
}
