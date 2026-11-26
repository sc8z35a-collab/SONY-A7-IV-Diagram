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
import { buildCfexpressUltra27Parts } from './cfexpressUltra27Parts';
import { buildCfexpressUltra28Parts } from './cfexpressUltra28Parts';
import { buildCfexpressUltra29Parts } from './cfexpressUltra29Parts';

function finalizeCfexpressPart(
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

function addInstancedBalls(
  parent: THREE.Group,
  cols: number,
  rows: number,
  pitchX: number,
  pitchY: number,
  offsetX: number,
  offsetY: number,
  z: number,
  radius: number,
  mat: THREE.Material
): void {
  const count = cols * rows;
  const geo = hiResSphere(radius, 8, 6);
  const inst = new THREE.InstancedMesh(geo, mat, count);
  const dm = new THREE.Object3D();
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dm.position.set(
        offsetX + (c - (cols - 1) * 0.5) * pitchX,
        offsetY + (r - (rows - 1) * 0.5) * pitchY,
        z
      );
      dm.updateMatrix();
      inst.setMatrixAt(idx++, dm.matrix);
    }
  }
  inst.instanceMatrix.needsUpdate = true;
  inst.userData.noEdges = true;
  parent.add(inst);
}

/**
 * Add an authentic JEDEC depopulated BGA SAC305 solder-ball + copper NSMD land-pad array
 * (supports BGA-152 dual-wing NAND, FBGA-200 dual-channel LPDDR4X, and FCBGA perimeter+thermal moat).
 */
function addPatternedBgaBalls(
  parent: THREE.Group,
  cols: number,
  rows: number,
  pitchX: number,
  pitchY: number,
  zBall: number,
  zPad: number,
  radius: number,
  ballMat: THREE.Material,
  padMat: THREE.Material,
  predicate: (c: number, r: number) => boolean
): void {
  const coords: Array<[number, number]> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!predicate(c, r)) continue;
      coords.push([(c - (cols - 1) * 0.5) * pitchX, (r - (rows - 1) * 0.5) * pitchY]);
    }
  }
  if (coords.length === 0) return;
  const ballGeo = hiResSphere(radius, 10, 8);
  const padGeo = hiResCyl(radius * 1.18, radius * 1.18, 0.06, 12).rotateX(Math.PI / 2);
  const ballInst = new THREE.InstancedMesh(ballGeo, ballMat, coords.length);
  const padInst = new THREE.InstancedMesh(padGeo, padMat, coords.length);
  const dm = new THREE.Object3D();
  for (let i = 0; i < coords.length; i++) {
    const [bx, by] = coords[i];
    dm.position.set(bx, by, zBall);
    dm.updateMatrix();
    ballInst.setMatrixAt(i, dm.matrix);
    dm.position.set(bx, by, zPad);
    dm.updateMatrix();
    padInst.setMatrixAt(i, dm.matrix);
  }
  ballInst.instanceMatrix.needsUpdate = true;
  padInst.instanceMatrix.needsUpdate = true;
  ballInst.userData.noEdges = true;
  padInst.userData.noEdges = true;
  parent.add(padInst, ballInst);
}

/**
 * Phase 26B / 27 / 28 / 29 / 34 — Standalone CFexpress 4.0 Card Ultra-Dissection (Sony CEA-G1920T Type A TOUGH / PCIe Gen4 NVMe 2.4 / BiCS10 332L / Quantum & SerDes: 130 Parts C01–C130).
 * Rendered at crisp 2.0× macro inspection scale (40.0 × 56.0 × 5.6 mm for real 20 × 28 × 2.8 mm Type A card), centered at (0, 0, 0).
 * Card stands upright along Y (verified 21-pin staggered PCIe Gold Edge Connector at bottom y ≈ -26.5, Non-Slip Pull-Tab at top y ≈ +26.5).
 */
export function buildCfexpressParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  // =========================================================================
  // C01. Top Metal Armor Shell (TOUGH 150N Bend / 7.5m Drop)
  // =========================================================================
  {
    const g = new THREE.Group();
    // CNC-chamfered PVD brushed gunmetal-titanium Sony CEA-G1920T TOUGH armor plate (exact 576×768 aspect!)
    const armorW = 38.6;
    const armorH = 51.4;
    const armorGeo = extrudeHiRes(createRoundedRectShape(armorW, armorH, 2.3), 0.78, 0.14, 0.14, 3, 28);
    applyPlanarUVs(armorGeo, armorW, armorH, 'xy');
    const topArmor = new THREE.Mesh(armorGeo, u.cfeTopArmorShell);

    // Dual-step diamond-cut CNC titanium micro-bevel trim & recessed shadow collar framing front label cleanly
    const bezelRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(armorW + 0.36, armorH + 0.36, 2.5, armorW - 1.08, armorH - 1.08, 2.0), 0.28, 0.05, 0.05, 2, 24),
      mats.titaniumRivet
    );
    bezelRim.position.z = 0.24;
    bezelRim.userData.noEdges = true;

    const innerShadowCollar = new THREE.Mesh(
      extrudeHiRes(createFrameShape(armorW - 1.08, armorH - 1.08, 2.0, armorW - 1.62, armorH - 1.62, 1.85), 0.14, 0.02, 0.02, 1, 22),
      mats.matteBlackAnodized
    );
    innerShadowCollar.position.z = 0.33;
    innerShadowCollar.userData.noEdges = true;

    // Dedicated CNC-milled inner (-Z) titanium pocket face with trochoidal end-mill toolpaths (zero mirrored front label!)
    const innerCncGeo = extrudeHiRes(createRoundedRectShape(armorW - 0.9, armorH - 0.9, 1.95), 0.20, 0.03, 0.03, 1, 22);
    applyPlanarUVs(innerCncGeo, armorW - 0.9, armorH - 0.9, 'xy-back');
    const innerCncPlate = new THREE.Mesh(innerCncGeo, u.cfeInnerArmorCnc);
    innerCncPlate.position.z = -0.32;
    innerCncPlate.userData.noEdges = true;

    // Inner (-Z) CNC-machined perimeter stiffening flange + 150N anti-bend waffle grid + 3 milled IC thermal bosses!
    const innerFlange = new THREE.Mesh(
      extrudeHiRes(createFrameShape(armorW - 1.1, armorH - 1.1, 1.9, armorW - 3.6, armorH - 3.6, 1.5), 0.16, 0.03, 0.03, 1, 20),
      mats.stainlessMachined
    );
    innerFlange.position.z = -0.44;
    innerFlange.userData.noEdges = true;

    // Milled thermal-contact press bosses over Controller SoC, LPDDR4 DRAM & Primary 16DP NAND
    const socPressBoss = new THREE.Mesh(createChamferedBoxGeo(13.0, 13.0, 0.14, 0.55, 0.03, 'z'), mats.titaniumRivet);
    socPressBoss.position.set(-6.2, -10.4, -0.45);
    socPressBoss.userData.noEdges = true;
    const dramPressBoss = new THREE.Mesh(createChamferedBoxGeo(9.2, 10.8, 0.12, 0.45, 0.03, 'z'), mats.titaniumRivet);
    dramPressBoss.position.set(9.4, -9.9, -0.44);
    dramPressBoss.userData.noEdges = true;
    const nandPressBoss = new THREE.Mesh(createChamferedBoxGeo(24.0, 16.0, 0.14, 0.65, 0.03, 'z'), mats.titaniumRivet);
    nandPressBoss.position.set(0, 11.2, -0.45);
    nandPressBoss.userData.noEdges = true;

    // Longitudinal & transverse CNC anti-bend waffle stiffening ribs (150N TOUGH spec!)
    const longRibGeo = new THREE.BoxGeometry(0.46, 44.6, 0.11);
    for (const rx of [-15.0, -13.2, 13.2, 15.0]) {
      const rib = new THREE.Mesh(longRibGeo, mats.stainlessMachined);
      rib.position.set(rx, 0, -0.46);
      rib.userData.noEdges = true;
      g.add(rib);
    }
    const crossRibGeo = new THREE.BoxGeometry(31.2, 0.44, 0.10);
    for (const ry of [-20.4, 0.2, 21.8]) {
      const cRib = new THREE.Mesh(crossRibGeo, mats.stainlessMachined);
      cRib.position.set(0, ry, -0.46);
      cRib.userData.noEdges = true;
      g.add(cRib);
    }

    // 4 inner corner laser-locating gold datum pins + 6 perimeter micro-laser-weld landing pads
    const pinGeo = hiResCyl(0.44, 0.44, 0.24, 14).rotateX(Math.PI / 2);
    for (const [px, py] of [
      [-16.4, 22.8],
      [16.4, 22.8],
      [-16.4, -22.8],
      [16.4, -22.8],
    ]) {
      const pin = new THREE.Mesh(pinGeo, mats.goldPlating);
      pin.position.set(px, py, -0.46);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    const weldPadGeo = new THREE.BoxGeometry(0.55, 2.2, 0.08);
    for (const wx of [-17.7, 17.7]) {
      for (const wy of [-14.0, 0, 14.0]) {
        const wp = new THREE.Mesh(weldPadGeo, mats.copperHeatSpreader);
        wp.position.set(wx, wy, -0.48);
        wp.userData.noEdges = true;
        g.add(wp);
      }
    }
    g.add(topArmor, bezelRim, innerShadowCollar, innerCncPlate, innerFlange, socPressBoss, dramPressBoss, nandPressBoss);

    parts.push(
      finalizeCfexpressPart(
        'cfe-top-metal-armor',
        1,
        '#272d38',
        g,
        new THREE.Vector3(0, 1.4, 2.48),
        new THREE.Vector3(0, 0, 68),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C02. Bottom Metal Dissipation Backplate & VPG800 Laser Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    const plateW = 38.6;
    const plateH = 50.4;
    const botGeo = extrudeHiRes(createRoundedRectShape(plateW, plateH, 2.2), 0.66, 0.12, 0.12, 3, 28);
    applyPlanarUVs(botGeo, plateW, plateH, 'xy-back');
    const botPlate = new THREE.Mesh(botGeo, u.cfeBackplateLaser);

    // Outer (-Z) machined stainless perimeter clinch bevel trim framing the MOPA laser backplate cleanly
    const outerBevel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(plateW + 0.28, plateH + 0.28, 2.35, plateW - 1.0, plateH - 1.0, 1.9), 0.22, 0.04, 0.04, 2, 24),
      mats.titaniumRivet
    );
    outerBevel.position.z = -0.22;
    outerBevel.userData.noEdges = true;

    // Solid CNC-milled inner thermal-contact face (+Z) with trochoidal toolpaths so exploded view NEVER shows mirrored rear text!
    const innerThermalGeo = extrudeHiRes(createRoundedRectShape(plateW - 0.8, plateH - 0.8, 1.9), 0.22, 0.04, 0.04, 1, 22);
    applyPlanarUVs(innerThermalGeo, plateW - 0.8, plateH - 0.8, 'xy');
    const innerThermalFace = new THREE.Mesh(innerThermalGeo, u.cfeInnerArmorCnc);
    innerThermalFace.position.z = 0.30;
    innerThermalFace.userData.noEdges = true;

    // Inner (+Z) laser-clinch perimeter flange + precision copper/titanium thermal pedestals over Controller, PMIC & Secondary NAND!
    const clinchRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(plateW - 1.0, plateH - 1.0, 1.85, plateW - 3.2, plateH - 3.2, 1.45), 0.14, 0.03, 0.03, 1, 20),
      mats.titaniumRivet
    );
    clinchRim.position.z = 0.43;
    clinchRim.userData.noEdges = true;

    const rearSocPad = new THREE.Mesh(createChamferedBoxGeo(11.8, 11.8, 0.14, 0.48, 0.03, 'z'), mats.copperHeatSpreader);
    rearSocPad.position.set(-6.2, -10.6, 0.44);
    rearSocPad.userData.noEdges = true;

    const rearPmicPad = new THREE.Mesh(createChamferedBoxGeo(7.6, 7.6, 0.12, 0.35, 0.03, 'z'), mats.copperCoil);
    rearPmicPad.position.set(9.6, -10.8, 0.43);
    rearPmicPad.userData.noEdges = true;

    const rearNandPad = new THREE.Mesh(createChamferedBoxGeo(24.0, 16.0, 0.12, 0.58, 0.02, 'z'), mats.titaniumRivet);
    rearNandPad.position.set(0, 11.0, 0.43);
    rearNandPad.userData.noEdges = true;

    // 6 perimeter stainless interlocking weld-clinch tabs + 4 corner gold datum pins + 4 transverse heat-equalization ribs
    const tabGeo = createChamferedBoxGeo(0.70, 2.35, 0.18, 0.12, 0.03, 'z');
    for (const sx of [-17.85, 17.85]) {
      for (const sy of [-15.5, 0, 15.5]) {
        const tab = new THREE.Mesh(tabGeo, mats.stainlessMachined);
        tab.position.set(sx, sy, 0.46);
        tab.userData.noEdges = true;
        g.add(tab);
      }
    }
    const datumGeo = hiResCyl(0.40, 0.40, 0.22, 12).rotateX(Math.PI / 2);
    for (const [dx, dy] of [
      [-16.2, 22.0],
      [16.2, 22.0],
      [-16.2, -22.0],
      [16.2, -22.0],
    ]) {
      const pin = new THREE.Mesh(datumGeo, mats.goldPlating);
      pin.position.set(dx, dy, 0.46);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    const grooveGeo = new THREE.BoxGeometry(31.2, 0.34, 0.07);
    for (const gy of [-19.6, -2.4, 2.0, 21.4]) {
      const groove = new THREE.Mesh(grooveGeo, mats.matteBlackAnodized);
      groove.position.set(0, gy, 0.43);
      groove.userData.noEdges = true;
      g.add(groove);
    }
    g.add(botPlate, outerBevel, innerThermalFace, clinchRim, rearSocPad, rearPmicPad, rearNandPad);

    parts.push(
      finalizeCfexpressPart(
        'cfe-bottom-metal-shell',
        2,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 1.6, -2.48),
        new THREE.Vector3(0, 0, -62),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // C03. Sony TOUGH Monolithic High-Strength Molded Resin Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    // Full-depth 5.42 mm Sony TOUGH monolithic PPS-GF40 VDI-24 matte glass-fiber resin body!
    const monoGeo = extrudeHiRes(createFrameShape(40.4, 55.8, 3.0, 35.2, 48.8, 1.9), 5.42, 0.24, 0.22, 3, 28);
    applyBoxUVs(monoGeo, 12.0);
    const monoFrame = new THREE.Mesh(monoGeo, u.cfeToughResinMold);

    // Internal stepped front/rear armor-seating ledges + subtle mid-plane injection mold parting bead
    const innerSeatGeo = extrudeHiRes(createFrameShape(37.7, 51.5, 2.1, 35.0, 48.6, 1.8), 1.48, 0.05, 0.05, 1, 22);
    const innerSeat = new THREE.Mesh(innerSeatGeo, mats.matteBlackAnodized);
    innerSeat.userData.noEdges = true;

    const partingBead = new THREE.Mesh(
      extrudeHiRes(createFrameShape(40.54, 55.94, 3.04, 40.26, 55.66, 2.96), 0.14, 0.02, 0.02, 1, 26),
      mats.matteBlackAnodized
    );
    partingBead.userData.noEdges = true;

    // 4 precision knurled titanium corner structural reinforcement bushings (outer collar + recessed core!)
    const cornerOuterGeo = hiResCyl(0.84, 0.84, 4.15, 16).rotateX(Math.PI / 2);
    const cornerInnerGeo = hiResCyl(0.46, 0.46, 4.28, 14).rotateX(Math.PI / 2);
    const gussetGeo = createChamferedBoxGeo(2.2, 0.48, 2.4, 0.1, 0.03, 'z');
    for (const [bx, by, rot] of [
      [-18.2, 24.4, -Math.PI / 4],
      [18.2, 24.4, Math.PI / 4],
      [-18.2, -24.0, Math.PI / 4],
      [18.2, -24.0, -Math.PI / 4],
    ]) {
      const boss = new THREE.Mesh(cornerOuterGeo, mats.titaniumRivet);
      boss.position.set(bx, by, 0);
      boss.userData.noEdges = true;
      const bore = new THREE.Mesh(cornerInnerGeo, mats.matteBlackAnodized);
      bore.position.set(bx, by, 0);
      bore.userData.noEdges = true;
      const gusset = new THREE.Mesh(gussetGeo, u.cfeToughResinMold);
      gusset.position.set(bx * 0.92, by * 0.94, 0);
      gusset.rotation.z = rot;
      gusset.userData.noEdges = true;
      g.add(boss, bore, gusset);
    }

    // Asymmetric Type-A poka-yoke left guide rail with stepped sliding channel & chamfered lead-in nose ramp
    const sideRailGeo = createChamferedBoxGeo(1.48, 35.2, 2.82, 0.35, 0.14, 'z');
    applyBoxUVs(sideRailGeo, 10.0);
    const sideRail = new THREE.Mesh(sideRailGeo, u.cfeToughResinMold);
    sideRail.position.set(-20.1, 2.0, 0);

    const railChannel = new THREE.Mesh(createChamferedBoxGeo(0.32, 31.6, 1.35, 0.12, 0.04, 'z'), mats.matteBlackAnodized);
    railChannel.position.set(-20.72, 2.2, 0);
    railChannel.userData.noEdges = true;

    const leadRamp = new THREE.Mesh(createChamferedBoxGeo(1.12, 2.4, 2.2, 0.25, 0.10, 'z'), mats.titaniumRivet);
    leadRamp.position.set(-20.02, -16.2, 0);
    leadRamp.userData.noEdges = true;

    // Right-side solid stepped flange & sculpted push-push heart-cam lock detent pocket with stainless wear lips!
    const rightFlangeGeo = createChamferedBoxGeo(1.06, 48.0, 5.15, 0.25, 0.12, 'z');
    applyBoxUVs(rightFlangeGeo, 10.0);
    const rightFlange = new THREE.Mesh(rightFlangeGeo, u.cfeToughResinMold);
    rightFlange.position.set(19.75, 1.2, 0);
    rightFlange.userData.noEdges = true;

    const detentPocket = new THREE.Mesh(createChamferedBoxGeo(0.46, 5.0, 2.6, 0.16, 0.05, 'z'), mats.matteBlackAnodized);
    detentPocket.position.set(20.18, -2.0, 0);
    detentPocket.userData.noEdges = true;

    for (const wy of [-4.55, 0.55]) {
      const wearLip = new THREE.Mesh(createChamferedBoxGeo(0.62, 0.38, 2.72, 0.08, 0.03, 'z'), mats.stainlessMachined);
      wearLip.position.set(20.12, wy, 0);
      wearLip.userData.noEdges = true;
      g.add(wearLip);
    }

    // 5 Authentic Sony CFexpress TOUGH top-edge horizontal non-slip tactile finger-pull grip ridges (+Y)
    for (const rz of [-1.52, -0.76, 0, 0.76, 1.52]) {
      const pullRib = new THREE.Mesh(
        createChamferedBoxGeo(27.2, 0.34, 0.40, 0.14, 0.05, 'y'),
        mats.matteBlackAnodized
      );
      pullRib.position.set(0, 27.92, rz);
      pullRib.userData.noEdges = true;
      g.add(pullRib);
    }

    // 6 Molded upper-left & upper-right side extraction grip flutes
    const fluteGeo = createChamferedBoxGeo(0.22, 0.68, 3.7, 0.08, 0.03, 'z');
    for (const sx of [-20.2, 20.2]) {
      for (let i = 0; i < 6; i++) {
        const flute = new THREE.Mesh(fluteGeo, mats.matteBlackAnodized);
        flute.position.set(sx, 17.6 + i * 1.38, 0);
        flute.userData.noEdges = true;
        g.add(flute);
      }
    }

    // Internal PCB centering alignment stanchions with elastomer shock-buffer pads + molded ejector witness rings
    const stanchionGeo = new THREE.BoxGeometry(0.58, 2.7, 2.25);
    const padTipGeo = new THREE.BoxGeometry(0.22, 2.1, 1.55);
    for (const sx of [-17.4, 17.4]) {
      for (const sy of [-14.0, 3.0, 18.0]) {
        const st = new THREE.Mesh(stanchionGeo, mats.matteBlackAnodized);
        st.position.set(sx, sy, 0);
        st.userData.noEdges = true;
        const pad = new THREE.Mesh(padTipGeo, mats.epdmGasket);
        pad.position.set(sx + (sx < 0 ? 0.32 : -0.32), sy, 0);
        pad.userData.noEdges = true;
        g.add(st, pad);
      }
    }

    g.add(monoFrame, innerSeat, partingBead, sideRail, railChannel, leadRamp, rightFlange, detentPocket);

    parts.push(
      finalizeCfexpressPart(
        'cfe-monolithic-resin',
        3,
        '#1e2128',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-64, 0, 12),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C04. IP57 Dustproof / Waterproof Seamless Perimeter Seal & Conformal Coat
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual-lobe fluorocarbon FKM/EPDM IP57 O-ring gasket seated STRICTLY INSIDE the monolithic armor channel
    const ip57Seal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.8, 49.6, 2.1, 35.3, 48.1, 1.65), 0.56, 0.10, 0.10, 2, 24),
      mats.epdmGasket
    );
    ip57Seal.position.set(0, 1.3, 1.55);

    // Dual-stage inner + outer raised hydrostatic water-sealing labyrinth compression lips (front & rear!)
    const innerLipF = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.05, 48.85, 1.85, 35.55, 48.35, 1.70), 0.22, 0.05, 0.05, 2, 22),
      mats.fluorineCoatCyan
    );
    innerLipF.position.set(0, 1.3, 1.85);
    innerLipF.userData.noEdges = true;

    const outerLipF = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.75, 49.55, 2.08, 36.32, 49.12, 1.94), 0.18, 0.04, 0.04, 1, 22),
      u.micRubberBootBlack
    );
    outerLipF.position.set(0, 1.3, 1.83);
    outerLipF.userData.noEdges = true;

    const ip57Back = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.8, 49.6, 2.1, 35.3, 48.1, 1.65), 0.56, 0.10, 0.10, 2, 24),
      u.micRubberBootBlack
    );
    ip57Back.position.set(0, 1.3, -1.55);

    const innerLipB = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.05, 48.85, 1.85, 35.55, 48.35, 1.70), 0.22, 0.05, 0.05, 2, 22),
      mats.fluorineCoatCyan
    );
    innerLipB.position.set(0, 1.3, -1.85);
    innerLipB.userData.noEdges = true;

    const outerLipB = new THREE.Mesh(
      extrudeHiRes(createFrameShape(36.75, 49.55, 2.08, 36.32, 49.12, 1.94), 0.18, 0.04, 0.04, 1, 22),
      mats.epdmGasket
    );
    outerLipB.position.set(0, 1.3, -1.83);
    outerLipB.userData.noEdges = true;

    // 12 vulcanized elastomer tie-columns with molded retention collar rings locking front & rear IP57 seals!
    const tieGeo = hiResCyl(0.36, 0.36, 3.12, 12).rotateX(Math.PI / 2);
    const collarGeo = hiResTorus(0.42, 0.09, 6, 14);
    for (const [tx, ty] of [
      [-17.8, 24.0],
      [17.8, 24.0],
      [-17.8, -21.4],
      [17.8, -21.4],
      [-18.0, 11.5],
      [18.0, 11.5],
      [-18.0, 1.3],
      [18.0, 1.3],
      [-18.0, -9.5],
      [18.0, -9.5],
      [0, 25.4],
      [0, -22.8],
    ]) {
      const tie = new THREE.Mesh(tieGeo, mats.epdmGasket);
      tie.position.set(tx, ty, 0);
      tie.userData.noEdges = true;
      const ring = new THREE.Mesh(collarGeo, mats.fluorineCoatCyan);
      ring.position.set(tx, ty, 0);
      ring.userData.noEdges = true;
      g.add(tie, ring);
    }

    // 4 molded corner elastomer locator bosses ensuring zero gasket twist during high-pressure 150N armor assembly
    const bossGeo = hiResCyl(0.68, 0.68, 0.32, 14).rotateX(Math.PI / 2);
    for (const [bx, by] of [
      [-17.5, 24.1],
      [17.5, 24.1],
      [-17.5, -21.5],
      [17.5, -21.5],
    ]) {
      const bF = new THREE.Mesh(bossGeo, mats.epdmGasket);
      bF.position.set(bx, by, 1.72);
      bF.userData.noEdges = true;
      g.add(bF);
    }

    g.add(ip57Seal, innerLipF, outerLipF, ip57Back, innerLipB, outerLipB);

    parts.push(
      finalizeCfexpressPart(
        'cfe-ip57-seal-perimeter',
        4,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(64, 0, 22),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C05. 21-Pin Hard Gold-Plated PCIe High-Speed Edge Connector Fingers
  // =========================================================================
  {
    const g = new THREE.Group();
    const fingerBar = new THREE.Mesh(
      createChamferedBoxGeo(33.4, 6.2, 1.04, 0.35, 0.08, 'z'),
      u.cfeHdiPcb
    );
    g.add(fingerBar);

    // Authentic 30-degree stepped lower PCB mating chamfer nose exposing cream-amber fiberglass Megtron-7 core!
    const noseStep1 = new THREE.Mesh(createChamferedBoxGeo(32.8, 0.34, 0.86, 0.14, 0.08, 'z'), mats.pcbEdgeLaminate);
    noseStep1.position.set(0, -3.02, 0);
    noseStep1.userData.noEdges = true;
    const noseStep2 = new THREE.Mesh(createChamferedBoxGeo(32.0, 0.30, 0.56, 0.12, 0.09, 'z'), mats.ceramicAlumina);
    noseStep2.position.set(0, -3.22, 0);
    noseStep2.userData.noEdges = true;
    g.add(noseStep1, noseStep2);

    // Verified exact CFA CFexpress Type A 21-pin staggered cobalt-hardened gold contact array:
    // First-make extended GND/+3V3 pins: 1, 4, 10, 15, 18, 21; Last-make recessed INS# detect: pin 12!
    const firstMakePins = new Set([1, 4, 10, 15, 18, 21]);
    const viaGeo = hiResCyl(0.31, 0.31, 1.20, 14).rotateX(Math.PI / 2);
    const viaPlugGeo = hiResCyl(0.14, 0.14, 1.24, 10).rotateX(Math.PI / 2);
    const viaRingGeo = hiResCyl(0.48, 0.48, 1.08, 14).rotateX(Math.PI / 2);
    const neckGeo = new THREE.BoxGeometry(0.26, 1.50, 0.09);
    const tearGeo = hiResCyl(0.28, 0.16, 0.09, 10).rotateX(Math.PI / 2);
    const tipDomeGeo = hiResSphere(0.22, 8, 6);

    for (let pin = 1; pin <= 21; pin++) {
      const fx = -15.0 + (pin - 1) * 1.5;
      const isLong = firstMakePins.has(pin);
      const isIns = pin === 12;
      const len = isLong ? 5.62 : isIns ? 3.82 : 4.78;
      const yShift = isLong ? -0.42 : isIns ? 0.45 : -0.05;

      // Primary lower contact face (-Z) & top mirror contact face (+Z) with 150 μin bright-Ni barrier & 30 μin hard-gold wiper tracks!
      for (const sz of [-0.58, 0.58]) {
        const niStep = new THREE.Mesh(
          createChamferedBoxGeo(1.08, len + 0.20, 0.12, 0.26, 0.02, 'z'),
          mats.stainlessMachined
        );
        niStep.position.set(fx, yShift, sz * 0.90);
        niStep.userData.noEdges = true;

        const fingerGeo = createChamferedBoxGeo(0.95, len, 0.19, 0.24, 0.045, 'z');
        applyPlanarUVs(fingerGeo, 0.95, len, sz > 0 ? 'xy' : 'xy-back');
        const finger = new THREE.Mesh(fingerGeo, u.cfeHardGoldFingers);
        finger.position.set(fx, yShift, sz);
        finger.userData.noEdges = true;

        // Rounded anti-snag domed lead-in chamfer bead at mating entry tip of each gold finger
        const tipDome = new THREE.Mesh(tipDomeGeo, mats.goldPlating);
        tipDome.scale.set(1.65, 0.65, 0.42);
        tipDome.position.set(fx, yShift - len * 0.5 + 0.12, sz * 1.03);
        tipDome.userData.noEdges = true;

        // Teardrop impedance-matched neck trace rising cleanly into staggered escape VIPPO micro-via
        const neck = new THREE.Mesh(neckGeo, mats.copperCoil);
        neck.position.set(fx, 2.34, sz * 0.92);
        neck.userData.noEdges = true;
        const tear = new THREE.Mesh(tearGeo, mats.goldPlating);
        tear.position.set(fx, yShift + len * 0.5 + 0.05, sz * 0.93);
        tear.userData.noEdges = true;
        g.add(niStep, finger, tipDome, neck, tear);
      }

      // Staggered dual-row escape VIPPO micro-vias with copper collar, gold barrel & dark resin-plugged center!
      const viaY = pin % 2 === 0 ? 2.66 : 2.98;
      const viaRing = new THREE.Mesh(viaRingGeo, mats.copperHybridBond);
      viaRing.position.set(fx, viaY, 0);
      viaRing.userData.noEdges = true;
      const via = new THREE.Mesh(viaGeo, mats.goldPlating);
      via.position.set(fx, viaY, 0);
      via.userData.noEdges = true;
      const plug = new THREE.Mesh(viaPlugGeo, mats.matteBlackAnodized);
      plug.position.set(fx, viaY, 0);
      plug.userData.noEdges = true;
      g.add(viaRing, via, plug);
    }

    // Gold Pin-1, Pin-10 (+3V3), and Pin-21 silkscreen triangular index ticks
    const triGeo = hiResCyl(0.28, 0.28, 0.08, 3).rotateX(Math.PI / 2);
    for (const pinIdx of [1, 10, 21]) {
      const tx = -15.0 + (pinIdx - 1) * 1.5;
      const tick = new THREE.Mesh(triGeo, mats.goldPlating);
      tick.position.set(tx, 2.48, 0.56);
      tick.userData.noEdges = true;
      g.add(tick);
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-21pin-gold-fingers',
        5,
        '#eab308',
        g,
        new THREE.Vector3(0, -24.6, 0),
        new THREE.Vector3(0, -56, 16),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C06. Polarized Keying Notch & Impact-Resistant Connector Shroud
  // =========================================================================
  {
    const g = new THREE.Group();
    // VDI-24 matte PPS-GF40 glass-fiber reinforced top & bottom connector shroud housings
    const shroudTopGeo = createChamferedBoxGeo(39.6, 6.4, 1.15, 0.42, 0.12, 'z');
    applyBoxUVs(shroudTopGeo, 10.0);
    const shroudTop = new THREE.Mesh(shroudTopGeo, u.cfeToughResinMold);
    shroudTop.position.z = 1.65;
    const shroudBotGeo = createChamferedBoxGeo(39.6, 6.4, 1.15, 0.42, 0.12, 'z');
    applyBoxUVs(shroudBotGeo, 10.0);
    const shroudBot = new THREE.Mesh(shroudBotGeo, u.cfeToughResinMold);
    shroudBot.position.z = -1.65;

    // Fine chamfered entry-lip wear bezel framing the bottom insertion mouth
    for (const sz of [-1.65, 1.65]) {
      const mouthLip = new THREE.Mesh(createChamferedBoxGeo(34.6, 0.48, 0.52, 0.16, 0.06, 'z'), mats.matteBlackAnodized);
      mouthLip.position.set(0, -3.12, sz * 0.84);
      mouthLip.userData.noEdges = true;
      g.add(mouthLip);
    }

    // Authentic CFA Type-A polarized asymmetric keying right cheek (wider) & left cheek
    const keyTabGeo = createChamferedBoxGeo(3.45, 6.65, 4.42, 0.45, 0.12, 'z');
    applyBoxUVs(keyTabGeo, 10.0);
    const keyTab = new THREE.Mesh(keyTabGeo, u.cfeToughResinMold);
    keyTab.position.set(18.2, 0, 0);

    const leftCheekGeo = createChamferedBoxGeo(2.65, 6.65, 4.42, 0.45, 0.12, 'z');
    applyBoxUVs(leftCheekGeo, 10.0);
    const leftCheek = new THREE.Mesh(leftCheekGeo, u.cfeToughResinMold);
    leftCheek.position.set(-18.6, 0, 0);

    // Molded stepped keying groove on right cheek + hardened stainless anti-wear entry guide ramps on both cheeks
    const keyGroove = new THREE.Mesh(createChamferedBoxGeo(0.55, 6.4, 1.85, 0.14, 0.04, 'z'), mats.matteBlackAnodized);
    keyGroove.position.set(19.72, 0, 0.72);
    keyGroove.userData.noEdges = true;

    const rampGeo = createChamferedBoxGeo(1.15, 1.55, 3.68, 0.22, 0.08, 'z');
    for (const rx of [-17.4, 16.8]) {
      const ramp = new THREE.Mesh(rampGeo, mats.stainlessMachined);
      ramp.position.set(rx, -2.55, 0);
      ramp.userData.noEdges = true;
      g.add(ramp);
    }

    // 6 upper dovetail interlock lugs + snap-fit titanium retaining ribs locking into C03 monolithic frame
    const lugGeo = createChamferedBoxGeo(3.25, 0.88, 0.74, 0.16, 0.04, 'z');
    const snapGeo = new THREE.BoxGeometry(2.4, 0.22, 0.16);
    for (const lx of [-11.5, 0, 11.5]) {
      for (const lz of [-1.6, 1.6]) {
        const lug = new THREE.Mesh(lugGeo, mats.matteBlackAnodized);
        lug.position.set(lx, 3.16, lz);
        lug.userData.noEdges = true;
        const snap = new THREE.Mesh(snapGeo, mats.titaniumRivet);
        snap.position.set(lx, 3.45, lz * 1.18);
        snap.userData.noEdges = true;
        g.add(lug, snap);
      }
    }

    // 20×2 razor-thin precision molded dielectric inter-pin anti-short separator comb fins + base fillets + tapered lead-in tips!
    const combGeo = createChamferedBoxGeo(0.26, 5.48, 0.58, 0.08, 0.04, 'z');
    const rootGeo = createChamferedBoxGeo(0.42, 0.85, 0.68, 0.10, 0.03, 'z');
    const combInst = new THREE.InstancedMesh(combGeo, mats.matteBlackAnodized, 40);
    const rootInst = new THREE.InstancedMesh(rootGeo, u.cfeToughResinMold, 40);
    const dm = new THREE.Object3D();
    let ci = 0;
    for (let k = 0; k < 20; k++) {
      const cx = -14.25 + k * 1.5;
      for (const cz of [-0.95, 0.95]) {
        dm.position.set(cx, -0.32, cz);
        dm.updateMatrix();
        combInst.setMatrixAt(ci, dm.matrix);
        dm.position.set(cx, 2.38, cz);
        dm.updateMatrix();
        rootInst.setMatrixAt(ci, dm.matrix);
        ci++;
      }
    }
    combInst.instanceMatrix.needsUpdate = true;
    rootInst.instanceMatrix.needsUpdate = true;
    combInst.userData.noEdges = true;
    rootInst.userData.noEdges = true;
    g.add(shroudTop, shroudBot, keyTab, leftCheek, keyGroove, combInst, rootInst);

    parts.push(
      finalizeCfexpressPart(
        'cfe-connector-shroud',
        6,
        '#334155',
        g,
        new THREE.Vector3(0, -24.8, 0),
        new THREE.Vector3(0, -76, -14),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C07. Ultra-Thin 8-Layer High-Density Interconnect (HDI) Impedance PCB
  // =========================================================================
  {
    const g = new THREE.Group();
    const pcbW = 34.0;
    const pcbH = 46.8;
    // Front (+Z) ultra-HD 8-layer Megtron-7 HDI PCB core mapped at exact 558×768 aspect!
    const pcbGeo = extrudeHiRes(createRoundedRectShape(pcbW, pcbH, 1.5), 0.92, 0.07, 0.07, 2, 24);
    applyPlanarUVs(pcbGeo, pcbW, pcbH, 'xy');
    const pcbCore = new THREE.Mesh(pcbGeo, u.cfeHdiPcb);

    // Dedicated Rear (-Z) PCB solder-mask & circuit layer mapped with bespoke cfeHdiPcbRear (authentic dual-sided PCB!)
    const rearFaceGeo = extrudeHiRes(createRoundedRectShape(pcbW - 0.16, pcbH - 0.16, 1.44), 0.10, 0.015, 0.015, 1, 22);
    applyPlanarUVs(rearFaceGeo, pcbW - 0.16, pcbH - 0.16, 'xy-back');
    const rearFace = new THREE.Mesh(rearFaceGeo, u.cfeHdiPcbRear);
    rearFace.position.z = -0.43;
    rearFace.userData.noEdges = true;

    // Visible 8-layer alternating copper foil & amber-green Megtron-7 prepreg micro-strata along ALL 4 cut edges!
    for (let layer = 0; layer < 8; layer++) {
      const zL = -0.36 + layer * 0.102;
      const isCu = layer % 2 === 0;
      const foilEdge = new THREE.Mesh(
        extrudeHiRes(createFrameShape(pcbW + 0.06, pcbH + 0.06, 1.52, pcbW - 0.28, pcbH - 0.28, 1.34), 0.042, 0.008, 0.008, 1, 18),
        isCu ? (layer === 0 || layer === 6 ? mats.goldPlating : mats.copperCoil) : mats.pcbEdgeLaminate
      );
      foilEdge.position.z = zL;
      foilEdge.userData.noEdges = true;
      g.add(foilEdge);
    }

    // 4 plated corner SMT tooling datum holes with concentric gold annular rings, copper barrel sleeves & dark bores!
    const ringGeo = hiResCyl(0.92, 0.92, 1.04, 18).rotateX(Math.PI / 2);
    const barrelGeo = hiResCyl(0.56, 0.56, 1.08, 16).rotateX(Math.PI / 2);
    const holeGeo = hiResCyl(0.42, 0.42, 1.14, 14).rotateX(Math.PI / 2);
    for (const [hx, hy] of [
      [-15.2, 21.4],
      [15.2, 21.4],
      [-15.2, -21.4],
      [15.2, -21.4],
    ]) {
      const ring = new THREE.Mesh(ringGeo, mats.goldPlating);
      ring.position.set(hx, hy, 0);
      ring.userData.noEdges = true;
      const barrel = new THREE.Mesh(barrelGeo, mats.copperCoil);
      barrel.position.set(hx, hy, 0);
      barrel.userData.noEdges = true;
      const hole = new THREE.Mesh(holeGeo, mats.matteBlackAnodized);
      hole.position.set(hx, hy, 0);
      hole.userData.noEdges = true;
      g.add(ring, barrel, hole);
    }

    // Scalloped gold-plated side-edge ground castellation contact pads linking PCB GND plane to shell EMI clips
    const castGeo = createChamferedBoxGeo(0.52, 2.75, 1.04, 0.14, 0.03, 'z');
    const scallopGeo = hiResCyl(0.24, 0.24, 1.08, 10).rotateX(Math.PI / 2);
    for (const sx of [-16.86, 16.86]) {
      for (const sy of [-15.5, 0.8, 17.0]) {
        const cast = new THREE.Mesh(castGeo, mats.goldPlating);
        cast.position.set(sx, sy, 0);
        cast.userData.noEdges = true;
        const sc = new THREE.Mesh(scallopGeo, mats.copperHybridBond);
        sc.position.set(sx + (sx < 0 ? -0.18 : 0.18), sy, 0);
        sc.userData.noEdges = true;
        g.add(cast, sc);
      }
    }

    // Raised physical gold JTAG/UART test pads (8) & dual SMT optical alignment fiducial bullseyes on front face!
    const jtagGeo = hiResCyl(0.44, 0.44, 0.08, 14).rotateX(Math.PI / 2);
    for (let i = 0; i < 8; i++) {
      const pad = new THREE.Mesh(jtagGeo, mats.goldPlating);
      pad.position.set(14.2, 15.2 - i * 1.72, 0.48);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    const fidRingGeo = hiResTorus(0.56, 0.08, 6, 16);
    const fidDotGeo = hiResCyl(0.28, 0.28, 0.07, 14).rotateX(Math.PI / 2);
    for (const [fx, fy] of [
      [-13.7, 2.4],
      [13.7, -14.6],
    ]) {
      const fRing = new THREE.Mesh(fidRingGeo, mats.matteBlackAnodized);
      fRing.position.set(fx, fy, 0.48);
      fRing.userData.noEdges = true;
      const fDot = new THREE.Mesh(fidDotGeo, mats.goldPlating);
      fDot.position.set(fx, fy, 0.49);
      fDot.userData.noEdges = true;
      g.add(fRing, fDot);
    }

    // Instanced perimeter λ/20 micro-via gold stitching array (64 vias framing all 4 edges!)
    const svGeo = hiResCyl(0.18, 0.18, 1.02, 8).rotateX(Math.PI / 2);
    const svCoords: Array<[number, number]> = [];
    for (let i = -6; i <= 6; i++) {
      svCoords.push([i * 2.25, 22.1], [i * 2.25, -22.1]);
    }
    for (let j = -9; j <= 9; j++) {
      svCoords.push([-15.9, j * 2.18], [15.9, j * 2.18]);
    }
    const svInst = new THREE.InstancedMesh(svGeo, mats.goldPlating, svCoords.length);
    const dm = new THREE.Object3D();
    svCoords.forEach(([vx, vy], i) => {
      dm.position.set(vx, vy, 0);
      dm.updateMatrix();
      svInst.setMatrixAt(i, dm.matrix);
    });
    svInst.instanceMatrix.needsUpdate = true;
    svInst.userData.noEdges = true;

    g.add(pcbCore, rearFace, svInst);

    parts.push(
      finalizeCfexpressPart(
        'cfe-hdi-8layer-pcb',
        7,
        '#0f3c30',
        g,
        new THREE.Vector3(0, 0.5, 0),
        new THREE.Vector3(0, 0, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C08. Next-Gen 6nm/7nm PCIe Gen4 NVMe 2.0 Main Controller SoC
  // =========================================================================
  {
    const g = new THREE.Group();
    // 6-layer AT&S ABF carrier substrate with visible perimeter copper build-up strata & gold corner fiducials!
    const subGeo = createChamferedBoxGeo(14.2, 14.2, 0.44, 0.42, 0.05, 'z');
    applyPlanarUVs(subGeo, 14.2, 14.2, 'xy');
    const substrate = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);

    for (const sz of [-0.11, 0.0, 0.11]) {
      const abfStrata = new THREE.Mesh(
        extrudeHiRes(createFrameShape(14.26, 14.26, 0.43, 13.98, 13.98, 0.38), 0.04, 0.008, 0.008, 1, 14),
        mats.copperCoil
      );
      abfStrata.position.z = sz;
      abfStrata.userData.noEdges = true;
      g.add(abfStrata);
    }

    // Laser-marked Sony / Phison PS5027-E27T PCIe Gen4 NVMe 2.4 FCBGA controller package!
    const socGeo = createChamferedBoxGeo(13.2, 13.2, 0.96, 0.36, 0.11, 'z');
    applyPlanarUVs(socGeo, 13.2, 13.2, 'xy');
    const socBody = new THREE.Mesh(socGeo, u.cfeControllerPkg);
    socBody.position.z = 0.64;

    // Stepped perimeter mold-parting line collar around package mid-height
    const moldSeam = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.30, 13.30, 0.38, 13.06, 13.06, 0.34), 0.12, 0.02, 0.02, 1, 14),
      mats.matteBlackAnodized
    );
    moldSeam.position.z = 0.56;
    moldSeam.userData.noEdges = true;

    // Sculpted Pin-1 corner gold chamfer triangle + recessed Pin-1 crater + twin circular ejector-pin rings
    const pin1 = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.06, 3).rotateX(Math.PI / 2), mats.goldPlating);
    pin1.position.set(-5.25, -5.25, 1.14);
    pin1.userData.noEdges = true;
    for (const [ex, ey] of [
      [5.1, 5.1],
      [-5.1, 5.1],
    ]) {
      const ejector = new THREE.Mesh(hiResTorus(0.46, 0.075, 6, 16), mats.matteBlackAnodized);
      ejector.position.set(ex, ey, 1.13);
      ejector.userData.noEdges = true;
      g.add(ejector);
    }

    // 16 ultra-miniature 0201 decoupling MLCCs flanking ALL 4 sides of the controller on individual ENIG solder pads!
    const capPadGeo = new THREE.BoxGeometry(1.30, 0.68, 0.06);
    for (let i = 0; i < 4; i++) {
      for (const sy of [-6.92, 6.92]) {
        const cx = -4.2 + i * 2.8;
        const cap = buildSmdPassive(1.12, 0.56, 0.40, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.position.set(cx, sy, 0.38);
        const pad = new THREE.Mesh(capPadGeo, mats.goldPlating);
        pad.position.set(cx, sy, 0.22);
        pad.userData.noEdges = true;
        g.add(cap, pad);
      }
    }
    for (let j = 0; j < 4; j++) {
      for (const sx of [-6.92, 6.92]) {
        const cy = -4.2 + j * 2.8;
        const cap = buildSmdPassive(1.12, 0.56, 0.40, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.rotation.z = Math.PI / 2;
        cap.position.set(sx, cy, 0.38);
        const pad = new THREE.Mesh(capPadGeo, mats.goldPlating);
        pad.rotation.z = Math.PI / 2;
        pad.position.set(sx, cy, 0.22);
        pad.userData.noEdges = true;
        g.add(cap, pad);
      }
    }

    // Authentic Phison FCBGA bottom SAC305 solder-ball grid: 10×10 2-row perimeter signal ring + 4×4 central thermal GND island (with depopulated routing moat!)
    addPatternedBgaBalls(
      g,
      10,
      10,
      1.26,
      1.26,
      -0.36,
      -0.23,
      0.22,
      mats.solderBallSilver,
      mats.copperHybridBond,
      (c, r) => r < 2 || r > 7 || c < 2 || c > 7 || (r >= 3 && r <= 6 && c >= 3 && c <= 6)
    );

    g.add(substrate, socBody, moldSeam, pin1);

    parts.push(
      finalizeCfexpressPart(
        'cfe-pcie4-controller-soc',
        8,
        '#2563eb',
        g,
        new THREE.Vector3(-6.2, -9.0, 0.65),
        new THREE.Vector3(-42, -26, 26),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C09. Embedded Multi-Core ARM CPU & FTL Wear-Leveling Brain (Die Core Block)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Monolithic 6nm bare-silicon interposer plate anchoring the dual ARM Cortex-R5/R8 cores & FTL crossbar
    const dieSubGeo = createChamferedBoxGeo(9.6, 7.6, 0.16, 0.22, 0.03, 'z');
    applyPlanarUVs(dieSubGeo, 9.6, 7.6, 'xy');
    const dieSub = new THREE.Mesh(dieSubGeo, mats.siliconBulk);
    dieSub.position.set(0, 0.65, -0.14);
    g.add(dieSub);

    // Dual symmetric ARM Cortex-R5/R8 core tiles with micro-etched L1 I/D-cache SRAM banks & ALU strips
    for (const cx of [-2.35, 2.35]) {
      const coreGeo = createChamferedBoxGeo(4.2, 4.2, 0.34, 0.16, 0.04, 'z');
      applyPlanarUVs(coreGeo, 4.2, 4.2, 'xy');
      const core = new THREE.Mesh(coreGeo, u.bionzDieFloorplan);
      core.position.set(cx, 2.2, 0.04);

      const frame = new THREE.Mesh(
        extrudeHiRes(createFrameShape(4.3, 4.3, 0.18, 3.85, 3.85, 0.12), 0.1, 0.02, 0.02, 1, 10),
        mats.goldPlating
      );
      frame.position.set(cx, 2.2, 0.24);
      frame.userData.noEdges = true;

      // L1 Instruction & Data Cache SRAM sub-blocks + ALU execution core inside each CPU tile
      for (const sx of [-0.95, 0.95]) {
        const l1 = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.35, 0.09), mats.siliconTsvDram);
        l1.position.set(cx + sx, 3.05, 0.24);
        l1.userData.noEdges = true;
        g.add(l1);
      }
      const alu = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.15, 0.09), mats.copperHybridBond);
      alu.position.set(cx, 1.28, 0.24);
      alu.userData.noEdges = true;
      g.add(core, frame, alu);
    }

    // Shared L2 Cache & AXI4 Golden Crossbar Interconnect Bus + FTL Address-Translation CAM Lookup Table
    const ftlBus = new THREE.Mesh(createChamferedBoxGeo(8.9, 1.35, 0.32, 0.16, 0.04, 'z'), mats.goldPlating);
    ftlBus.position.set(0, -1.05, 0.04);

    for (let i = 0; i < 6; i++) {
      const camCell = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.72, 0.12), mats.vcWorkingFluidCyan);
      camCell.position.set(-3.4 + i * 1.36, -2.35, 0.14);
      camCell.userData.noEdges = true;
      g.add(camCell);
    }
    // Vertical AXI bus bridges connecting both cores down to FTL bus
    for (const bx of [-3.1, -1.6, 1.6, 3.1]) {
      const br = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.95, 0.12), mats.copperCoil);
      br.position.set(bx, -0.1, 0.22);
      br.userData.noEdges = true;
      g.add(br);
    }
    g.add(ftlBus);

    parts.push(
      finalizeCfexpressPart(
        'cfe-arm-dualcore-engine',
        9,
        '#7c3aed',
        g,
        new THREE.Vector3(-6.2, -9.0, 1.3),
        new THREE.Vector3(-62, -16, 42),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C10. Hardware 4K LDPC Error-Correction (ECC) & End-to-End CRC Engine
  // =========================================================================
  {
    const g = new THREE.Group();
    const ldpcGeo = createChamferedBoxGeo(5.9, 3.9, 0.36, 0.16, 0.04, 'z');
    applyPlanarUVs(ldpcGeo, 5.9, 3.9, 'xy');
    const ldpcMatrix = new THREE.Mesh(ldpcGeo, u.bionzCetusDie);

    // 5×3 quasi-cyclic LDPC parity-check H-matrix sub-blocks sculpted across top die face
    const cellGeo = new THREE.BoxGeometry(0.74, 0.56, 0.12);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const active = (r + c) % 2 === 0;
        const blk = new THREE.Mesh(cellGeo, active ? mats.cfaGreen : mats.siliconLogicLayer);
        blk.position.set(-2.0 + c * 1.0, 0.12 + r * 0.72, 0.22);
        blk.userData.noEdges = true;
        g.add(blk);
      }
    }

    // 4-stage pipelined copper barrel-shifter & gold CRC-32C syndrome accumulator rail
    for (let i = 0; i < 4; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.52, 0.18), mats.copperHybridBond);
      bar.position.set(-1.95 + i * 1.3, -1.22, 0.22);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    const crcRail = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.22, 0.14), mats.goldPlating);
    crcRail.position.set(0, -0.58, 0.24);
    crcRail.userData.noEdges = true;
    g.add(ldpcMatrix, crcRail);

    parts.push(
      finalizeCfexpressPart(
        'cfe-ldpc-ecc-engine',
        10,
        '#10b981',
        g,
        new THREE.Vector3(-6.2, -11.8, 1.3),
        new THREE.Vector3(-62, -40, 42),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C11. Hardware AES-256 Encryption & Secure-Boot Anti-Tamper Core
  // =========================================================================
  {
    const g = new THREE.Group();
    const aesVault = new THREE.Mesh(
      createChamferedBoxGeo(4.65, 4.05, 0.40, 0.25, 0.06, 'z'),
      mats.goldPlating
    );
    const lockShield = new THREE.Mesh(
      createChamferedBoxGeo(3.65, 3.05, 0.48, 0.2, 0.05, 'z'),
      u.icEpoxyLaser
    );

    // 4×4 AES-XTS-256 SubBytes S-box substitution grid + central hardware key-schedule torus
    const sboxGeo = new THREE.BoxGeometry(0.46, 0.36, 0.12);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const sb = new THREE.Mesh(sboxGeo, (r + c) % 2 === 0 ? mats.goldPlating : mats.copperHybridBond);
        sb.position.set(-1.05 + c * 0.70, -0.84 + r * 0.56, 0.28);
        sb.userData.noEdges = true;
        g.add(sb);
      }
    }
    const keyRing = new THREE.Mesh(hiResTorus(0.62, 0.11, 8, 20), mats.vcWorkingFluidCyan);
    keyRing.position.z = 0.34;
    keyRing.userData.noEdges = true;

    // Dual active anti-tamper serpentine gold guard rails framing the vault perimeter
    for (const sy of [-1.72, 1.72]) {
      const meshWire = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.12, 0.1), mats.rfGoldCoax);
      meshWire.position.set(0, sy, 0.24);
      meshWire.userData.noEdges = true;
      g.add(meshWire);
    }
    g.add(aesVault, lockShield, keyRing);

    parts.push(
      finalizeCfexpressPart(
        'cfe-aes256-crypto-core',
        11,
        '#f59e0b',
        g,
        new THREE.Vector3(-10.2, -10.8, 1.3),
        new THREE.Vector3(-82, -28, 32),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C12. Primary High-Density 3D TLC NAND Flash Package (218–332 Layer 16DP BGA)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4-layer BT/ABF NAND package substrate with visible perimeter copper build-up strata & corner optical fiducials!
    const subGeo = createChamferedBoxGeo(25.8, 17.8, 0.44, 0.45, 0.05, 'z');
    applyPlanarUVs(subGeo, 25.8, 17.8, 'xy');
    const bgaBase = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);

    for (const sz of [-0.11, 0.0, 0.11]) {
      const btStrata = new THREE.Mesh(
        extrudeHiRes(createFrameShape(25.86, 17.86, 0.46, 25.56, 17.56, 0.40), 0.04, 0.008, 0.008, 1, 14),
        mats.copperCoil
      );
      btStrata.position.z = sz;
      btStrata.userData.noEdges = true;
      g.add(btStrata);
    }

    const fidGeo = hiResCyl(0.28, 0.28, 0.06, 12).rotateX(Math.PI / 2);
    for (const [fx, fy] of [
      [-12.25, 8.25],
      [12.25, 8.25],
      [-12.25, -8.25],
      [12.25, -8.25],
    ]) {
      const fid = new THREE.Mesh(fidGeo, mats.goldPlating);
      fid.position.set(fx, fy, 0.23);
      fid.userData.noEdges = true;
      g.add(fid);
    }

    // Aspect-matched (768×520) Kioxia BiCS10 332L 16DP EMC mold cap + stepped mold-parting groove + side injection-gate vestige!
    const moldGeo = createChamferedBoxGeo(24.9, 16.9, 1.08, 0.4, 0.12, 'z');
    applyPlanarUVs(moldGeo, 24.9, 16.9, 'xy');
    const bgaMold = new THREE.Mesh(moldGeo, u.cfeNandPkg);
    bgaMold.position.z = 0.68;

    const moldParting = new THREE.Mesh(
      extrudeHiRes(createFrameShape(25.02, 17.02, 0.42, 24.76, 16.76, 0.36), 0.12, 0.02, 0.02, 1, 16),
      mats.matteBlackAnodized
    );
    moldParting.position.z = 0.56;
    moldParting.userData.noEdges = true;

    const gateVestige = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 1.85, 0.38, 0.06, 0.03, 'z'),
      mats.matteBlackAnodized
    );
    gateVestige.position.set(12.52, 0, 0.48);
    gateVestige.userData.noEdges = true;

    // Sculpted Pin-1 corner gold triangle + circular Pin-1 crater + twin recessed ejector-pin rings
    const pin1Tri = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.06, 3).rotateX(Math.PI / 2), mats.goldPlating);
    pin1Tri.position.set(-10.85, -6.85, 1.24);
    pin1Tri.userData.noEdges = true;
    const pin1Crater = new THREE.Mesh(hiResTorus(0.42, 0.07, 6, 16), mats.goldPlating);
    pin1Crater.position.set(-10.85, -5.65, 1.23);
    pin1Crater.userData.noEdges = true;
    for (const [ex, ey] of [
      [10.65, 6.65],
      [-10.65, 6.65],
    ]) {
      const ejector = new THREE.Mesh(hiResTorus(0.50, 0.075, 6, 16), mats.matteBlackAnodized);
      ejector.position.set(ex, ey, 1.23);
      ejector.userData.noEdges = true;
      g.add(ejector);
    }

    // 10 miniature 0201 VCCQ/VCC decoupling MLCCs seated cleanly on individual ENIG gold pads along substrate flanks!
    const capPadGeo = new THREE.BoxGeometry(1.34, 0.72, 0.06);
    for (let i = 0; i < 4; i++) {
      for (const sy of [-9.28, 9.28]) {
        const cx = -9.0 + i * 6.0;
        const cap = buildSmdPassive(1.16, 0.60, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.position.set(cx, sy, 0.36);
        const pad = new THREE.Mesh(capPadGeo, mats.goldPlating);
        pad.position.set(cx, sy, 0.21);
        pad.userData.noEdges = true;
        g.add(cap, pad);
      }
    }
    for (const sx of [-13.28, 13.28]) {
      const cap = buildSmdPassive(1.16, 0.60, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.rotation.z = Math.PI / 2;
      cap.position.set(sx, 0, 0.36);
      const pad = new THREE.Mesh(capPadGeo, mats.goldPlating);
      pad.rotation.z = Math.PI / 2;
      pad.position.set(sx, 0, 0.21);
      pad.userData.noEdges = true;
      g.add(cap, pad);
    }

    // Authentic JEDEC BGA-152 dual-wing SAC305 solder-ball grid (4 left + 4 right columns, depopulated center + 4 anchor balls!)
    addPatternedBgaBalls(
      g,
      13,
      10,
      1.82,
      1.56,
      -0.34,
      -0.22,
      0.24,
      mats.solderBallSilver,
      mats.copperHybridBond,
      (c, r) => c <= 3 || c >= 9 || ((c === 4 || c === 8) && (r === 0 || r === 9))
    );

    g.add(bgaBase, bgaMold, moldParting, gateVestige, pin1Tri, pin1Crater);

    parts.push(
      finalizeCfexpressPart(
        'cfe-3d-nand-pkg-primary',
        12,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 12.6, 0.7),
        new THREE.Vector3(-34, 38, 28),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C13. Secondary Interleaved 3D NAND Package (Rear Side Parallel Speed!)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Rear-mounted 4-layer BT/ABF substrate with copper build-up strata & 4 gold corner optical fiducials
    const subGeo = createChamferedBoxGeo(25.8, 17.8, 0.44, 0.45, 0.05, 'z');
    applyPlanarUVs(subGeo, 25.8, 17.8, 'xy-back');
    const bgaBase = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);

    for (const sz of [-0.11, 0.0, 0.11]) {
      const btStrata = new THREE.Mesh(
        extrudeHiRes(createFrameShape(25.86, 17.86, 0.46, 25.56, 17.56, 0.40), 0.04, 0.008, 0.008, 1, 14),
        mats.copperCoil
      );
      btStrata.position.z = sz;
      btStrata.userData.noEdges = true;
      g.add(btStrata);
    }

    const fidGeo = hiResCyl(0.28, 0.28, 0.06, 12).rotateX(Math.PI / 2);
    for (const [fx, fy] of [
      [-12.25, 8.25],
      [12.25, 8.25],
      [-12.25, -8.25],
      [12.25, -8.25],
    ]) {
      const fid = new THREE.Mesh(fidGeo, mats.goldPlating);
      fid.position.set(fx, fy, -0.23);
      fid.userData.noEdges = true;
      g.add(fid);
    }

    // Mirror-crafted rear EMC mold body with aspect-matched u.cfeNandPkg ('xy-back'), parting groove & gate vestige!
    const moldGeo = createChamferedBoxGeo(24.9, 16.9, 1.08, 0.4, 0.12, 'z');
    applyPlanarUVs(moldGeo, 24.9, 16.9, 'xy-back');
    const bgaMold = new THREE.Mesh(moldGeo, u.cfeNandPkg);
    bgaMold.position.z = -0.68;

    const moldParting = new THREE.Mesh(
      extrudeHiRes(createFrameShape(25.02, 17.02, 0.42, 24.76, 16.76, 0.36), 0.12, 0.02, 0.02, 1, 16),
      mats.matteBlackAnodized
    );
    moldParting.position.z = -0.56;
    moldParting.userData.noEdges = true;

    const gateVestige = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 1.85, 0.38, 0.06, 0.03, 'z'),
      mats.matteBlackAnodized
    );
    gateVestige.position.set(-12.52, 0, -0.48);
    gateVestige.userData.noEdges = true;

    const pin1Tri = new THREE.Mesh(hiResCyl(0.46, 0.46, 0.06, 3).rotateX(Math.PI / 2), mats.goldPlating);
    pin1Tri.position.set(10.85, -6.85, -1.24);
    pin1Tri.userData.noEdges = true;
    const pin1Crater = new THREE.Mesh(hiResTorus(0.42, 0.07, 6, 16), mats.goldPlating);
    pin1Crater.position.set(10.85, -5.65, -1.23);
    pin1Crater.userData.noEdges = true;
    for (const [ex, ey] of [
      [-10.65, 6.65],
      [10.65, 6.65],
    ]) {
      const ejector = new THREE.Mesh(hiResTorus(0.50, 0.075, 6, 16), mats.matteBlackAnodized);
      ejector.position.set(ex, ey, -1.23);
      ejector.userData.noEdges = true;
      g.add(ejector);
    }

    // 8 miniature rear-side 0201 VCCQ/VCC decoupling MLCCs on individual ENIG gold pads along top & bottom edges
    const capPadGeo = new THREE.BoxGeometry(1.34, 0.72, 0.06);
    for (let i = 0; i < 4; i++) {
      for (const sy of [-9.28, 9.28]) {
        const cx = -9.0 + i * 6.0;
        const cap = buildSmdPassive(1.16, 0.60, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.rotation.y = Math.PI;
        cap.position.set(cx, sy, -0.36);
        const pad = new THREE.Mesh(capPadGeo, mats.goldPlating);
        pad.position.set(cx, sy, -0.21);
        pad.userData.noEdges = true;
        g.add(cap, pad);
      }
    }

    // Authentic JEDEC BGA-152 dual-wing SAC305 solder-ball grid on the PCB-facing (+Z) side of Secondary NAND!
    addPatternedBgaBalls(
      g,
      13,
      10,
      1.82,
      1.56,
      0.34,
      0.22,
      0.24,
      mats.solderBallSilver,
      mats.copperHybridBond,
      (c, r) => c <= 3 || c >= 9 || ((c === 4 || c === 8) && (r === 0 || r === 9))
    );

    g.add(bgaBase, bgaMold, moldParting, gateVestige, pin1Tri, pin1Crater);

    parts.push(
      finalizeCfexpressPart(
        'cfe-3d-nand-pkg-secondary',
        13,
        '#0284c7',
        g,
        new THREE.Vector3(0, 12.6, -0.7),
        new THREE.Vector3(34, 38, -28),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C14. Dynamic / Native pSLC High-Speed Write Cache Zone (VPG400/VPG800)
  // =========================================================================
  {
    const g = new THREE.Group();
    const pslcTile = new THREE.Mesh(
      createChamferedBoxGeo(20.4, 5.4, 0.34, 0.3, 0.05, 'z'),
      mats.cinnabarAnodized
    );
    // 8 parallel high-speed pSLC interleaved plane stripes with micro-bitline sub-ribs & latch pads
    const laneGeo = createChamferedBoxGeo(1.75, 3.1, 0.14, 0.1, 0.02, 'z');
    const padGeo = new THREE.BoxGeometry(1.5, 0.42, 0.12);
    for (let i = 0; i < 8; i++) {
      const lx = -7.8 + i * 2.22;
      const lane = new THREE.Mesh(laneGeo, i % 2 === 0 ? mats.goldPlating : mats.tantalumCapYellow);
      lane.position.set(lx, 0.18, 0.22);
      lane.userData.noEdges = true;
      const latch = new THREE.Mesh(padGeo, mats.vcWorkingFluidCyan);
      latch.position.set(lx, -1.85, 0.22);
      latch.userData.noEdges = true;
      g.add(lane, latch);
    }
    // Dual golden high-current turbo write-bus collector rails along top & bottom
    const busBar = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.34, 0.16), mats.copperHeatSpreader);
    busBar.position.set(0, 2.08, 0.24);
    busBar.userData.noEdges = true;
    g.add(pslcTile, busBar);

    parts.push(
      finalizeCfexpressPart(
        'cfe-pslc-write-cache',
        14,
        '#f97316',
        g,
        new THREE.Vector3(0, 7.6, 1.45),
        new THREE.Vector3(44, 24, 36),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C15. 3D NAND Vertical Charge-Trap (CTF) Memory Pillar Cutaway Stack
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bottom Common Source Line (CSL) copper diffusion base plate
    const cslPlate = new THREE.Mesh(createChamferedBoxGeo(11.2, 6.8, 0.10, 0.2, 0.02, 'z'), mats.copperHeatSpreader);
    cslPlate.position.z = -0.64;
    g.add(cslPlate);

    // 11 alternating Barrierless Molybdenum/Tungsten wordline & oxide dielectric decks!
    const wlGeo = createChamferedBoxGeo(10.6, 6.4, 0.065, 0.18, 0.012, 'z');
    for (let k = 0; k < 11; k++) {
      const wl = new THREE.Mesh(
        wlGeo,
        k % 2 === 0 ? u.cfeMolyWordlineMetal : mats.interlayerDielectric
      );
      wl.position.z = -0.52 + k * 0.102;
      g.add(wl);
    }

    // 4×2 concentric cylindrical Macaroni CTF pillars: outer ONO sleeve -> poly-Si channel -> quartz SiO2 core!
    const onoGeo = hiResCyl(0.52, 0.52, 1.12, 16).rotateX(Math.PI / 2);
    const polyGeo = hiResCyl(0.36, 0.36, 1.20, 14).rotateX(Math.PI / 2);
    const coreGeo = hiResCyl(0.18, 0.18, 1.26, 12).rotateX(Math.PI / 2);
    const studGeo = hiResCyl(0.22, 0.22, 0.16, 12).rotateX(Math.PI / 2);

    for (const px of [-3.6, -1.2, 1.2, 3.6]) {
      for (const py of [-1.55, 1.55]) {
        const ono = new THREE.Mesh(onoGeo, mats.loficDielectric);
        ono.position.set(px, py, 0);
        ono.userData.noEdges = true;
        const poly = new THREE.Mesh(polyGeo, mats.siliconPhotodiode);
        poly.position.set(px, py, 0.01);
        poly.userData.noEdges = true;
        const core = new THREE.Mesh(coreGeo, mats.quartzOlpf);
        core.position.set(px, py, 0.02);
        core.userData.noEdges = true;
        const blStud = new THREE.Mesh(studGeo, mats.goldPlating);
        blStud.position.set(px, py, 0.58);
        blStud.userData.noEdges = true;
        g.add(ono, poly, core, blStud);
      }
    }

    // Top copper Bitline (BL) crossbars tying each row of vertical memory strings together!
    const blGeo = new THREE.BoxGeometry(10.2, 0.24, 0.08);
    for (const py of [-1.55, 1.55]) {
      const bl = new THREE.Mesh(blGeo, mats.copperCoil);
      bl.position.set(0, py, 0.64);
      bl.userData.noEdges = true;
      g.add(bl);
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-3d-nand-vertical-pillar',
        15,
        '#a855f7',
        g,
        new THREE.Vector3(0, 15.8, 1.38),
        new THREE.Vector3(-24, 62, 54),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C16. High-Speed LPDDR4 DRAM Cache IC (FTL Mapping Table Accelerator)
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4-layer BT/ABF substrate with exposed copper perimeter strata & 4 gold corner optical fiducials!
    const subGeo = createChamferedBoxGeo(9.6, 11.4, 0.34, 0.38, 0.04, 'z');
    applyPlanarUVs(subGeo, 9.6, 11.4, 'xy');
    const subBase = new THREE.Mesh(subGeo, u.bionzAbfSubstrate);

    for (const sz of [-0.08, 0.06]) {
      const strata = new THREE.Mesh(
        extrudeHiRes(createFrameShape(9.66, 11.46, 0.39, 9.42, 11.22, 0.34), 0.035, 0.008, 0.008, 1, 14),
        mats.copperCoil
      );
      strata.position.z = sz;
      strata.userData.noEdges = true;
      g.add(strata);
    }

    const fidGeo = hiResCyl(0.20, 0.20, 0.05, 10).rotateX(Math.PI / 2);
    for (const [fx, fy] of [
      [-4.45, 5.35],
      [4.45, 5.35],
      [-4.45, -5.35],
      [4.45, -5.35],
    ]) {
      const fid = new THREE.Mesh(fidGeo, mats.goldPlating);
      fid.position.set(fx, fy, 0.18);
      fid.userData.noEdges = true;
      g.add(fid);
    }

    // Aspect-matched (646×768) SK hynix H9HCNNN8GUMUXR LPDDR4X-4266 200-ball TFBGA molded package!
    const moldGeo = createChamferedBoxGeo(9.0, 10.7, 0.72, 0.32, 0.09, 'z');
    applyPlanarUVs(moldGeo, 9.0, 10.7, 'xy');
    const dramMold = new THREE.Mesh(moldGeo, u.cfeLpddr4Pkg);
    dramMold.position.z = 0.44;

    // Stepped mid-height mold-parting line + Pin-1 laser index dot + twin circular ejector dimples
    const partingRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(9.08, 10.78, 0.34, 8.86, 10.56, 0.28), 0.10, 0.015, 0.015, 1, 14),
      mats.matteBlackAnodized
    );
    partingRim.position.z = 0.36;
    partingRim.userData.noEdges = true;

    const pin1Dot = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.05, 12).rotateX(Math.PI / 2), mats.goldPlating);
    pin1Dot.position.set(-3.52, 4.35, 0.81);
    pin1Dot.userData.noEdges = true;
    for (const [ex, ey] of [
      [3.52, 4.35],
      [-3.52, -4.35],
    ]) {
      const ej = new THREE.Mesh(hiResTorus(0.34, 0.055, 6, 14), mats.matteBlackAnodized);
      ej.position.set(ex, ey, 0.80);
      ej.userData.noEdges = true;
      g.add(ej);
    }

    // Authentic JEDEC 200-ball FBGA dual-channel split SAC305 ball grid (Channel A c<=3, Channel B c>=6, depopulated central spine!)
    addPatternedBgaBalls(
      g,
      10,
      10,
      0.86,
      0.98,
      -0.34,
      -0.19,
      0.19,
      mats.solderBallSilver,
      mats.copperHybridBond,
      (c) => c <= 3 || c >= 6
    );

    // 8 flanking 0201 VDD1/VDD2/VDDQ decoupling MLCCs seated on individual ENIG gold pads!
    const capPadGeo = new THREE.BoxGeometry(1.18, 0.66, 0.06);
    for (const sy of [-3.9, -1.3, 1.3, 3.9]) {
      for (const sx of [-5.42, 5.42]) {
        const cap = buildSmdPassive(1.02, 0.54, 0.38, mats.smdCeramic, mats.silverElectrode, 'z');
        cap.rotation.z = Math.PI / 2;
        cap.position.set(sx, sy, -0.02);
        const pad = new THREE.Mesh(capPadGeo, mats.goldPlating);
        pad.rotation.z = Math.PI / 2;
        pad.position.set(sx, sy, -0.17);
        pad.userData.noEdges = true;
        g.add(cap, pad);
      }
    }

    // 8 matched-length copper DQ/DQS/CA fanout trace ribbons with teardrop breakout vias exiting lower edge!
    const dqTraceGeo = new THREE.BoxGeometry(0.16, 2.35, 0.07);
    const viaGeo = hiResCyl(0.16, 0.16, 0.14, 10).rotateX(Math.PI / 2);
    for (let k = 0; k < 8; k++) {
      const tx = -3.5 + k * 1.0;
      const tr = new THREE.Mesh(dqTraceGeo, k === 3 || k === 4 ? mats.goldPlating : mats.copperCoil);
      tr.position.set(tx, -6.55, -0.18);
      tr.userData.noEdges = true;
      const via = new THREE.Mesh(viaGeo, mats.goldPlating);
      via.position.set(tx, -7.75, -0.18);
      via.userData.noEdges = true;
      g.add(tr, via);
    }

    g.add(subBase, dramMold, partingRim, pin1Dot);

    parts.push(
      finalizeCfexpressPart(
        'cfe-lpddr4-dram-cache',
        16,
        '#6366f1',
        g,
        new THREE.Vector3(9.4, -8.5, 0.85),
        new THREE.Vector3(56, -24, 24),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C17. On-Card Multi-Channel PMIC Power-Management IC
  // =========================================================================
  {
    const g = new THREE.Group();
    const pmic = buildChipPackage({
      w: 6.9,
      d: 6.9,
      h: 0.86,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    pmic.rotation.y = Math.PI;

    // Exposed central pure-copper QFN thermal ground slug on PCB-facing (+Z) side!
    const epad = new THREE.Mesh(createChamferedBoxGeo(4.2, 4.2, 0.12, 0.25, 0.02, 'z'), mats.copperHeatSpreader);
    epad.position.z = 0.44;
    epad.userData.noEdges = true;

    // 4 surrounding bootstrap 0201 capacitors & feedback divider resistors
    for (const [cx, cy] of [
      [-4.25, -2.0],
      [-4.25, 2.0],
      [4.25, -2.0],
      [4.25, 2.0],
    ]) {
      const bs = buildSmdPassive(1.05, 0.54, 0.36, mats.smdCeramic, mats.silverElectrode, 'z');
      bs.rotation.y = Math.PI;
      bs.position.set(cx, cy, 0.14);
      g.add(bs);
    }
    g.add(pmic, epad);

    parts.push(
      finalizeCfexpressPart(
        'cfe-pmic-buck-regulator',
        17,
        '#ef4444',
        g,
        new THREE.Vector3(9.6, -9.2, -0.85),
        new THREE.Vector3(56, -22, -26),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C18. Ultra-Thin Shielded Power Inductors & High-Density 0201 MLCC Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 genuine ultra-low-profile molded shielded metal-alloy power inductors (1R0 / 2R2) on rear side
    for (let i = 0; i < 3; i++) {
      const ix = 4.5 + i * 3.85;
      const ind = buildShieldedInductor(
        3.25,
        0.92,
        mats.ferriteInductor,
        mats.silverElectrode,
        mats.silverElectrode,
        'z'
      );
      ind.rotation.y = Math.PI;
      ind.position.set(ix, -1.6, -0.86);

      // Visible internal flat-wire copper coil edge peeking cleanly inside side chamfer slot
      const coilHint = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.36, 0.14), mats.copperCoil);
      coilHint.position.set(ix, -1.6, -1.34);
      coilHint.userData.noEdges = true;

      // Twin solder-fillet landing pads beneath each power inductor
      for (const sx of [-1.45, 1.45]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.68, 2.5, 0.08), mats.goldPlating);
        pad.position.set(ix + sx, -1.6, -0.44);
        pad.userData.noEdges = true;
        g.add(pad);
      }
      g.add(ind, coilHint);
    }

    // Local 2-oz copper buck power-distribution bus bar linking the 3 inductors
    const pwrBus = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.55, 0.08), mats.copperHeatSpreader);
    pwrBus.position.set(8.35, -3.55, -0.48);
    pwrBus.userData.noEdges = true;
    g.add(pwrBus);

    // 10 realistic 0201 ceramic decoupling MLCC capacitors with wrapped Ni-Sn end-caps & solder pads!
    const mlccPadGeo = new THREE.BoxGeometry(1.42, 0.78, 0.06);
    for (let i = 0; i < 10; i++) {
      const mx = -12.6 + i * 1.95;
      const mlcc = buildSmdPassive(1.18, 0.66, 0.54, mats.smdCeramic, mats.silverElectrode, 'z');
      mlcc.position.set(mx, 1.25, 0.72);
      const pad = new THREE.Mesh(mlccPadGeo, mats.goldPlating);
      pad.position.set(mx, 1.25, 0.45);
      pad.userData.noEdges = true;
      g.add(mlcc, pad);
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-power-inductors-mlcc',
        18,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(54, 4, -36),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C19. Power-Loss Protection (PLP) Tantalum / Polymer Hold-Up Capacitors
  // =========================================================================
  {
    const g = new THREE.Group();
    // 2 authentic molded yellow tantalum PLP hold-up capacitors with anode polarity bar, J-leads & solder pads!
    for (const cy of [-2.45, 2.45]) {
      const tant = buildTantalumCap(
        7.0,
        3.65,
        1.02,
        mats.tantalumCapYellow,
        mats.cinnabarAnodized,
        mats.silverElectrode,
        'z'
      );
      tant.rotation.y = Math.PI;
      tant.position.y = cy;

      // Twin gold PCB solder-fillet pads + anode (+) copper charge rail
      for (const sx of [-3.35, 3.35]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.85, 0.10), mats.goldPlating);
        pad.position.set(sx, cy, 0.48);
        pad.userData.noEdges = true;
        g.add(pad);
      }
      g.add(tant);
    }
    // Charge-limiting current-sense shunt resistor & twin parallel copper tie rails bridging both PLP caps
    const shunt = buildSmdPassive(2.1, 0.95, 0.46, mats.matteBlackAnodized, mats.silverElectrode, 'z');
    shunt.rotation.y = Math.PI;
    shunt.position.set(0, 0, 0.18);
    const busPos = new THREE.Mesh(new THREE.BoxGeometry(0.42, 5.8, 0.08), mats.copperHeatSpreader);
    busPos.position.set(-3.35, 0, 0.50);
    busPos.userData.noEdges = true;
    const busGnd = new THREE.Mesh(new THREE.BoxGeometry(0.42, 5.8, 0.08), mats.copperCoil);
    busGnd.position.set(3.35, 0, 0.50);
    busGnd.userData.noEdges = true;
    g.add(shunt, busPos, busGnd);

    parts.push(
      finalizeCfexpressPart(
        'cfe-plp-hold-caps',
        19,
        '#eab308',
        g,
        new THREE.Vector3(-10.2, -10.5, -0.9),
        new THREE.Vector3(-56, -24, -30),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C20. PCIe Gen4 Differential AC-Coupling Capacitors & Controlled Traces
  // =========================================================================
  {
    const g = new THREE.Group();
    const traceGeo = new THREE.BoxGeometry(0.32, 4.8, 0.08);
    const viaGeo = hiResCyl(0.22, 0.22, 0.45, 10).rotateX(Math.PI / 2);

    for (let i = 0; i < 4; i++) {
      const cx = -4.5 + i * 3.0;
      const cap = buildSmdPassive(2.45, 1.38, 0.58, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.rotation.z = Math.PI / 2;
      cap.position.x = cx;

      // Precision 85-ohm differential gold-over-copper microstrip entering & exiting each AC cap
      const trace = new THREE.Mesh(traceGeo, i % 2 === 0 ? mats.goldPlating : mats.copperCoil);
      trace.position.set(cx, 0, -0.26);
      trace.userData.noEdges = true;

      // Twin SMT teardrop solder-fillet pads
      for (const py of [-1.2, 1.2]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.72, 0.09), mats.solderBallSilver);
        pad.position.set(cx, py, -0.24);
        pad.userData.noEdges = true;
        g.add(pad);
      }
      g.add(cap, trace);
    }

    // 5 flanking GND return stitching vias separating differential pairs cleanly
    for (let v = 0; v < 5; v++) {
      const vx = -6.0 + v * 3.0;
      for (const vy of [-2.0, 2.0]) {
        const via = new THREE.Mesh(viaGeo, mats.goldPlating);
        via.position.set(vx, vy, -0.22);
        via.userData.noEdges = true;
        g.add(via);
      }
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-pcie-ac-coupling',
        20,
        '#14b8a6',
        g,
        new THREE.Vector3(-2.0, -18.5, 0.72),
        new THREE.Vector3(-34, -52, 34),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C21. Ultra-Low-Capacitance TVS ESD Protection Diode Array (±15 kV)
  // =========================================================================
  {
    const g = new THREE.Group();
    const laneGeo = new THREE.BoxGeometry(0.24, 3.6, 0.08);
    const viaGeo = hiResCyl(0.22, 0.22, 0.36, 10).rotateX(Math.PI / 2);

    for (const sx of [-6.0, 6.0]) {
      const tvs = buildChipPackage({
        w: 5.6,
        d: 2.25,
        h: 0.66,
        style: 'dfn',
        pinsPerSide: 5,
        bodyMat: u.icEpoxyLaser,
        leadMat: mats.goldPlating,
        pin1Mat: mats.silverElectrode,
        axis: 'z',
      });
      tvs.rotation.y = Math.PI;
      tvs.position.x = sx;
      g.add(tvs);

      // Authentic zero-stub straight flow-through PCIe differential rails + center low-inductance GND shunt bar!
      for (let p = -2; p <= 2; p++) {
        const lane = new THREE.Mesh(laneGeo, p === 0 ? mats.copperHeatSpreader : mats.goldPlating);
        lane.position.set(sx + p * 0.96, 0, 0.32);
        lane.userData.noEdges = true;
        g.add(lane);
      }
      for (const vy of [-1.55, 1.55]) {
        const gVia = new THREE.Mesh(viaGeo, mats.goldPlating);
        gVia.position.set(sx, vy, 0.26);
        gVia.userData.noEdges = true;
        g.add(gVia);
      }
    }

    parts.push(
      finalizeCfexpressPart(
        'cfe-esd-tvs-diode-array',
        21,
        '#e11d48',
        g,
        new THREE.Vector3(0, -20.8, -0.75),
        new THREE.Vector3(34, -52, -34),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C22. Ultra-Miniature Crystal Oscillator & PCIe 100 MHz REFCLK Buffer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ceramic base + chamfered gold-seam-welded 2520 crystal oscillator lid + 4 castellated gold pads!
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(3.9, 2.9, 0.38, 0.25, 0.04, 'z'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(-2.4, 0, -0.15);
    const xtalLid = new THREE.Mesh(
      createChamferedBoxGeo(3.45, 2.45, 0.45, 0.22, 0.05, 'z'),
      mats.goldPlating
    );
    xtalLid.position.set(-2.4, 0, 0.22);

    // 4 castellated corner solder fillets on the 2520 quartz package
    const castGeo = new THREE.BoxGeometry(0.72, 0.56, 0.32);
    for (const [cx, cy] of [
      [-4.1, -1.25],
      [-0.7, -1.25],
      [-4.1, 1.25],
      [-0.7, 1.25],
    ]) {
      const cPad = new THREE.Mesh(castGeo, mats.solderBallSilver);
      cPad.position.set(cx, cy, -0.18);
      cPad.userData.noEdges = true;
      g.add(cPad);
    }

    // Twin 0201 NP0/C0G load capacitors (C_L1, C_L2) flanking the quartz crystal
    for (const ly of [-2.15, 2.15]) {
      const loadCap = buildSmdPassive(1.12, 0.58, 0.38, mats.smdCeramic, mats.silverElectrode, 'z');
      loadCap.position.set(-2.4, ly, -0.12);
      g.add(loadCap);
    }

    const pllBuf = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.66,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    pllBuf.position.x = 2.4;

    // Matched gold clock-pair traces linking XTAL output to HCSL buffer input
    for (const ty of [-0.45, 0.45]) {
      const clkLink = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.18, 0.08), mats.goldPlating);
      clkLink.position.set(0.05, ty, -0.26);
      clkLink.userData.noEdges = true;
      g.add(clkLink);
    }
    g.add(xtalBase, xtalLid, pllBuf);

    parts.push(
      finalizeCfexpressPart(
        'cfe-xtal-clock-gen',
        22,
        '#facc15',
        g,
        new THREE.Vector3(8.5, -17.5, 0.75),
        new THREE.Vector3(46, -46, 30),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C23. Dedicated Serial SPI NOR Flash Firmware & Factory Bad-Block ROM
  // =========================================================================
  {
    const g = new THREE.Group();
    const norIc = buildChipPackage({
      w: 5.8,
      d: 4.6,
      h: 0.85,
      style: 'soic',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    norIc.rotation.y = Math.PI;

    // 8 gold PCB landing pads beneath gull-wing leads + decoupling cap & WP#/HOLD# pull-up resistor!
    const padGeo = new THREE.BoxGeometry(0.58, 0.95, 0.08);
    for (let i = 0; i < 4; i++) {
      const px = -2.08 + i * 1.38;
      for (const py of [-2.85, 2.85]) {
        const pad = new THREE.Mesh(padGeo, mats.goldPlating);
        pad.position.set(px, py, 0.40);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }
    const decCap = buildSmdPassive(1.18, 0.62, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
    decCap.rotation.y = Math.PI;
    decCap.position.set(3.85, -1.1, 0.16);
    const wpRes = buildSmdPassive(1.12, 0.56, 0.38, mats.matteBlackAnodized, mats.silverElectrode, 'z');
    wpRes.rotation.y = Math.PI;
    wpRes.position.set(3.85, 1.1, 0.16);
    g.add(norIc, decCap, wpRes);

    parts.push(
      finalizeCfexpressPart(
        'cfe-spi-nor-firmware',
        23,
        '#8b5cf6',
        g,
        new THREE.Vector3(-11.2, 0.2, -0.82),
        new THREE.Vector3(-60, 8, -32),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C24. High-Precision Digital Thermal Sensor & Adaptive Throttling Logic
  // =========================================================================
  {
    const g = new THREE.Group();
    const sensorIc = buildChipPackage({
      w: 3.8,
      d: 3.8,
      h: 0.72,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.cinnabarAnodized,
      leadMat: mats.goldPlating,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    const sensePad = new THREE.Mesh(
      createChamferedBoxGeo(4.65, 4.65, 0.16, 0.3, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    sensePad.position.z = -0.32;
    sensePad.userData.noEdges = true;

    // 4 thermal-coupling copper micro-vias + Kelvin 2-wire differential remote-diode sense traces!
    const viaGeo = hiResCyl(0.24, 0.24, 0.32, 10).rotateX(Math.PI / 2);
    for (const [vx, vy] of [
      [-1.55, -1.55],
      [1.55, -1.55],
      [-1.55, 1.55],
      [1.55, 1.55],
    ]) {
      const via = new THREE.Mesh(viaGeo, mats.goldPlating);
      via.position.set(vx, vy, -0.28);
      via.userData.noEdges = true;
      g.add(via);
    }
    for (const ky of [-0.45, 0.45]) {
      const kTrace = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 0.08), mats.goldPlating);
      kTrace.position.set(-3.3, ky, -0.28);
      kTrace.userData.noEdges = true;
      g.add(kTrace);
    }
    const i2cPull = buildSmdPassive(1.05, 0.54, 0.36, mats.matteBlackAnodized, mats.silverElectrode, 'z');
    i2cPull.position.set(3.2, 0, -0.14);
    g.add(sensorIc, sensePad, i2cPull);

    parts.push(
      finalizeCfexpressPart(
        'cfe-thermal-sensor-diode',
        24,
        '#f43f5e',
        g,
        new THREE.Vector3(-0.2, -2.0, 0.75),
        new THREE.Vector3(-42, 4, 42),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // C25. Sony Proprietary Pure Copper Internal Heat Spreader Plate
  // =========================================================================
  {
    const g = new THREE.Group();
    // Exact 604×768 aspect-matched Sony C11000 cold-rolled pure copper heat spreader plate!
    const cuGeo = extrudeHiRes(createRoundedRectShape(34.6, 44.0, 1.8), 0.36, 0.05, 0.05, 2, 22);
    applyPlanarUVs(cuGeo, 34.6, 44.0, 'xy');
    const cuPlate = new THREE.Mesh(cuGeo, u.cfeCopperSpreaderHero);

    // Stamped raised perimeter stiffening flange rim (prevents micro-warpage during 150N bend tests!)
    const stiffFlange = new THREE.Mesh(
      extrudeHiRes(createFrameShape(34.7, 44.1, 1.85, 32.7, 42.1, 1.48), 0.14, 0.025, 0.025, 1, 20),
      mats.copperHeatSpreader
    );
    stiffFlange.position.z = 0.20;
    stiffFlange.userData.noEdges = true;

    // Multi-step deep-drawn stamped thermal contact pedestals with beveled draft skirts over SoC, DRAM & Primary NAND!
    const bossSocSkirt = new THREE.Mesh(createChamferedBoxGeo(14.4, 14.4, 0.24, 0.72, 0.08, 'z'), mats.copperCoil);
    bossSocSkirt.position.set(-6.2, -9.0, -0.14);
    bossSocSkirt.userData.noEdges = true;
    const bossSoc = new THREE.Mesh(createChamferedBoxGeo(13.4, 13.4, 0.44, 0.55, 0.08, 'z'), mats.copperHeatSpreader);
    bossSoc.position.set(-6.2, -9.0, -0.24);

    const bossDramSkirt = new THREE.Mesh(createChamferedBoxGeo(10.1, 11.9, 0.20, 0.58, 0.06, 'z'), mats.copperCoil);
    bossDramSkirt.position.set(9.4, -10.5, -0.12);
    bossDramSkirt.userData.noEdges = true;
    const bossDram = new THREE.Mesh(createChamferedBoxGeo(9.2, 11.0, 0.34, 0.48, 0.06, 'z'), mats.copperHeatSpreader);
    bossDram.position.set(9.4, -10.5, -0.19);

    const bossNandSkirt = new THREE.Mesh(createChamferedBoxGeo(24.8, 16.8, 0.18, 0.88, 0.06, 'z'), mats.copperCoil);
    bossNandSkirt.position.set(0, 12.6, -0.10);
    bossNandSkirt.userData.noEdges = true;
    const bossNand = new THREE.Mesh(createChamferedBoxGeo(23.8, 15.8, 0.30, 0.75, 0.06, 'z'), mats.copperHeatSpreader);
    bossNand.position.set(0, 12.6, -0.17);

    // 9 embossed heat-dispersion channeling beads across central thermal deck + 4 slotted thermal-expansion stress-relief cutouts!
    const grooveGeo = createChamferedBoxGeo(28.0, 0.28, 0.08, 0.08, 0.02, 'z');
    for (let i = -4; i <= 4; i++) {
      const gr = new THREE.Mesh(grooveGeo, mats.copperCoil);
      gr.position.set(0, i * 4.2, 0.21);
      gr.userData.noEdges = true;
      g.add(gr);
    }
    const slotGeo = createChamferedBoxGeo(3.6, 0.62, 0.42, 0.26, 0.03, 'z');
    for (const [sx, sy] of [
      [-11.8, 1.6],
      [11.8, 1.6],
      [-4.2, 1.6],
      [4.2, 1.6],
    ]) {
      const slot = new THREE.Mesh(slotGeo, mats.matteBlackAnodized);
      slot.position.set(sx, sy, 0.02);
      slot.userData.noEdges = true;
      g.add(slot);
    }

    // 4 gold-plated hemispherical EMI grounding spring dimples inside stamped circular cups + 4 corner alignment notches!
    const cupGeo = hiResTorus(0.68, 0.10, 6, 16);
    const domeGeo = hiResSphere(0.46, 10, 8);
    const notchGeo = createChamferedBoxGeo(1.15, 1.15, 0.44, 0.15, 0.03, 'z');
    for (const [dx, dy] of [
      [-15.0, 19.6],
      [15.0, 19.6],
      [-15.0, -19.6],
      [15.0, -19.6],
    ]) {
      const cup = new THREE.Mesh(cupGeo, mats.copperCoil);
      cup.position.set(dx, dy, 0.21);
      cup.userData.noEdges = true;
      const dome = new THREE.Mesh(domeGeo, mats.goldPlating);
      dome.scale.set(1, 1, 0.42);
      dome.position.set(dx, dy, 0.22);
      dome.userData.noEdges = true;
      const notch = new THREE.Mesh(notchGeo, mats.matteBlackAnodized);
      notch.position.set(dx < 0 ? -17.05 : 17.05, dy < 0 ? -21.65 : 21.65, 0);
      notch.userData.noEdges = true;
      g.add(cup, dome, notch);
    }

    g.add(cuPlate, stiffFlange, bossSocSkirt, bossSoc, bossDramSkirt, bossDram, bossNandSkirt, bossNand);

    parts.push(
      finalizeCfexpressPart(
        'cfe-copper-heat-spreader',
        25,
        '#ea580c',
        g,
        new THREE.Vector3(0, 2.2, 1.78),
        new THREE.Vector3(0, 0, 44),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C26. Ultra-Thin Silicone Thermal Pad (TIM) & High-Orientation Graphene Sheet
  // =========================================================================
  {
    const g = new THREE.Group();
    // Fujipoly / Bergquist fiberglass-reinforced 45° diamond-waffle pink Controller TIM + beveled compression skirt!
    const timSocGeo = createChamferedBoxGeo(13.2, 13.2, 0.38, 0.65, 0.08, 'z');
    applyBoxUVs(timSocGeo, 6.0);
    const timSoc = new THREE.Mesh(timSocGeo, u.cfeTimSiliconeWaffle);
    timSoc.position.set(-6.2, -9.0, 0.15);

    const socSkirt = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.55, 13.55, 0.72, 12.6, 12.6, 0.55), 0.14, 0.03, 0.03, 1, 16),
      mats.thermalPuttyPink
    );
    socSkirt.position.set(-6.2, -9.0, 0.06);
    socSkirt.userData.noEdges = true;

    // 45° criss-cross silicone compliance air-bleed waffle ribs on pink Controller TIM
    const socRibGeo = new THREE.BoxGeometry(11.4, 0.16, 0.055);
    for (let i = -2; i <= 2; i++) {
      for (const ang of [Math.PI / 4, -Math.PI / 4]) {
        const rib = new THREE.Mesh(socRibGeo, mats.thermalPuttyPink);
        rib.rotation.z = ang;
        rib.position.set(-6.2 + i * 1.45 * (ang > 0 ? -1 : 1), -9.0 + i * 1.45, 0.36);
        rib.scale.x = Math.max(0.38, 1 - Math.abs(i) * 0.22);
        rib.userData.noEdges = true;
        g.add(rib);
      }
    }

    // Blue Primary NAND TIM & LPDDR4 DRAM TIM with sculpted 45° diamond compliance waffle lattice!
    const timNand = new THREE.Mesh(
      createChamferedBoxGeo(24.2, 16.4, 0.34, 0.75, 0.07, 'z'),
      mats.thermalPadBlue
    );
    timNand.position.set(0, 12.6, 0.15);

    const nandRibGeo = new THREE.BoxGeometry(13.8, 0.15, 0.05);
    for (let i = -3; i <= 3; i++) {
      for (const ang of [Math.PI / 4, -Math.PI / 4]) {
        const wf = new THREE.Mesh(nandRibGeo, mats.vcWorkingFluidCyan);
        wf.rotation.z = ang;
        wf.position.set(i * 2.45, 12.6, 0.34);
        wf.userData.noEdges = true;
        g.add(wf);
      }
    }

    const timDram = new THREE.Mesh(
      createChamferedBoxGeo(9.0, 10.6, 0.34, 0.55, 0.06, 'z'),
      mats.thermalPadBlue
    );
    timDram.position.set(9.4, -8.5, 0.15);

    const dramRibGeo = new THREE.BoxGeometry(7.2, 0.15, 0.05);
    for (let i = -1; i <= 1; i++) {
      for (const ang of [Math.PI / 4, -Math.PI / 4]) {
        const wf = new THREE.Mesh(dramRibGeo, mats.vcWorkingFluidCyan);
        wf.rotation.z = ang;
        wf.position.set(9.4, -8.5 + i * 2.2, 0.34);
        wf.userData.noEdges = true;
        g.add(wf);
      }
    }

    // Massive rear Panasonic PGS Pyrolytic Graphite Sheet (EYGS 25μm, 1950 W/m·K) with crystalline hex-flake texture on BOTH faces!
    const pgsGeo = extrudeHiRes(createRoundedRectShape(33.8, 43.0, 1.6), 0.24, 0.04, 0.04, 1, 22);
    applyPlanarUVs(pgsGeo, 33.8, 43.0, 'xy-back');
    const grapheneBack = new THREE.Mesh(pgsGeo, u.cfePyroGraphiteSheet);
    grapheneBack.position.set(0, 2.2, -3.15);

    const pgsFrontGeo = extrudeHiRes(createRoundedRectShape(33.2, 42.4, 1.5), 0.06, 0.01, 0.01, 1, 20);
    applyPlanarUVs(pgsFrontGeo, 33.2, 42.4, 'xy');
    const grapheneFront = new THREE.Mesh(pgsFrontGeo, u.cfePyroGraphiteSheet);
    grapheneFront.position.set(0, 2.2, -3.02);
    grapheneFront.userData.noEdges = true;

    // Amber Kapton / Polyimide PET perimeter insulation frame + 2 corner peel-tab notches + 8 micro air-bleed vent pinholes!
    const petBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(34.4, 43.6, 1.75, 32.6, 41.8, 1.45), 0.16, 0.025, 0.025, 1, 20),
      mats.polyimideFpc
    );
    petBorder.position.set(0, 2.2, -3.15);
    petBorder.userData.noEdges = true;

    const peelTabGeo = createChamferedBoxGeo(2.8, 1.35, 0.14, 0.25, 0.02, 'z');
    for (const [px, py] of [
      [-15.2, 24.4],
      [15.2, -20.0],
    ]) {
      const tab = new THREE.Mesh(peelTabGeo, mats.polyimideFpc);
      tab.position.set(px, py, -3.15);
      tab.userData.noEdges = true;
      g.add(tab);
    }

    const ventGeo = hiResCyl(0.24, 0.24, 0.24, 10).rotateX(Math.PI / 2);
    for (let v = -3; v <= 3; v += 2) {
      for (const vx of [-16.65, 16.65]) {
        const vent = new THREE.Mesh(ventGeo, mats.matteBlackAnodized);
        vent.position.set(vx, 2.2 + v * 5.2, -3.15);
        vent.userData.noEdges = true;
        g.add(vent);
      }
    }

    g.add(timSoc, socSkirt, timNand, timDram, grapheneBack, grapheneFront, petBorder);

    parts.push(
      finalizeCfexpressPart(
        'cfe-graphene-tim-pad',
        26,
        '#ec4899',
        g,
        new THREE.Vector3(0, 0, 1.38),
        new THREE.Vector3(0, 0, -42),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // C27. Ultra-Thin Permalloy / Nickel-Silver EMI Electromagnetic Shield Frame
  // =========================================================================
  {
    const g = new THREE.Group();
    // Progressive-die stamped C7521 Nickel-Silver EMI shield fence collar + perforated top RF bridge flange!
    const collarGeo = extrudeHiRes(createFrameShape(17.4, 17.4, 1.3, 14.4, 14.4, 0.9), 1.25, 0.06, 0.06, 2, 22);
    applyPlanarUVs(collarGeo, 17.4, 17.4, 'xy');
    const emiCollar = new THREE.Mesh(collarGeo, u.cfeEmiShieldCan);

    // 4 authentic progressive-die circular corner bend-relief cutouts!
    const reliefGeo = hiResCyl(0.56, 0.56, 1.36, 14).rotateX(Math.PI / 2);
    for (const [rx, ry] of [
      [-8.15, 8.15],
      [8.15, 8.15],
      [-8.15, -8.15],
      [8.15, -8.15],
    ]) {
      const relief = new THREE.Mesh(reliefGeo, mats.matteBlackAnodized);
      relief.position.set(rx, ry, 0.04);
      relief.userData.noEdges = true;
      g.add(relief);
    }

    // 20 perimeter solder-castellation feet with SAC305 solder-wicking fillets anchoring EMI fence to PCB GND!
    const footGeo = createChamferedBoxGeo(1.45, 0.42, 0.30, 0.08, 0.03, 'z');
    const filletGeo = createChamferedBoxGeo(1.62, 0.26, 0.14, 0.06, 0.02, 'z');
    for (let i = -2; i <= 2; i++) {
      for (const sy of [-8.72, 8.72]) {
        const ft = new THREE.Mesh(footGeo, mats.solderBallSilver);
        ft.position.set(i * 2.9, sy, -0.52);
        ft.userData.noEdges = true;
        const fil = new THREE.Mesh(filletGeo, mats.goldPlating);
        fil.position.set(i * 2.9, sy + (sy > 0 ? 0.18 : -0.18), -0.60);
        fil.userData.noEdges = true;
        g.add(ft, fil);
      }
      for (const sx of [-8.72, 8.72]) {
        const ft = new THREE.Mesh(footGeo, mats.solderBallSilver);
        ft.rotation.z = Math.PI / 2;
        ft.position.set(sx, i * 2.9, -0.52);
        ft.userData.noEdges = true;
        const fil = new THREE.Mesh(filletGeo, mats.goldPlating);
        fil.rotation.z = Math.PI / 2;
        fil.position.set(sx + (sx > 0 ? 0.18 : -0.18), i * 2.9, -0.60);
        fil.userData.noEdges = true;
        g.add(ft, fil);
      }
    }

    // 12 stamped snap-lock lid-retention spring dimples ringing all 4 rails!
    const dimpleGeo = hiResCyl(0.42, 0.32, 0.26, 12).rotateX(Math.PI / 2);
    for (const pos of [-5.2, 0, 5.2]) {
      for (const sy of [-7.95, 7.95]) {
        const d1 = new THREE.Mesh(dimpleGeo, mats.silverElectrode);
        d1.position.set(pos, sy, 0.68);
        d1.userData.noEdges = true;
        g.add(d1);
      }
      for (const sx of [-7.95, 7.95]) {
        const d2 = new THREE.Mesh(dimpleGeo, mats.silverElectrode);
        d2.position.set(sx, pos, 0.68);
        d2.userData.noEdges = true;
        g.add(d2);
      }
    }

    // Perforated top-bridge RF shield flange mapped with u.cfeEmiShieldCan + instanced sub-λ/20 circular micro-vent holes!
    const bridgeGeo = extrudeHiRes(createFrameShape(16.2, 16.2, 1.0, 12.2, 12.2, 0.68), 0.15, 0.025, 0.025, 1, 18);
    applyPlanarUVs(bridgeGeo, 16.2, 16.2, 'xy');
    const bridgeRim = new THREE.Mesh(bridgeGeo, u.cfeEmiShieldCan);
    bridgeRim.position.z = 0.62;
    bridgeRim.userData.noEdges = true;

    const ventHoleGeo = hiResCyl(0.28, 0.28, 0.20, 10).rotateX(Math.PI / 2);
    const ventCoords: Array<[number, number]> = [];
    for (let i = -2; i <= 2; i++) {
      ventCoords.push([i * 2.4, 7.05], [i * 2.4, -7.05], [-7.05, i * 2.4], [7.05, i * 2.4]);
    }
    const ventInst = new THREE.InstancedMesh(ventHoleGeo, mats.matteBlackAnodized, ventCoords.length);
    const dm = new THREE.Object3D();
    ventCoords.forEach(([vx, vy], idx) => {
      dm.position.set(vx, vy, 0.65);
      dm.updateMatrix();
      ventInst.setMatrixAt(idx, dm.matrix);
    });
    ventInst.instanceMatrix.needsUpdate = true;
    ventInst.userData.noEdges = true;

    // Internal stepped RF cross-cavity isolation baffle rib separating PCIe SerDes analog zone from digital core
    const baffleRib = new THREE.Mesh(
      createChamferedBoxGeo(14.5, 0.36, 0.42, 0.08, 0.03, 'z'),
      mats.lensPermalloyShield
    );
    baffleRib.position.set(0, -3.85, 0.48);
    baffleRib.userData.noEdges = true;

    g.add(emiCollar, bridgeRim, ventInst, baffleRib);

    parts.push(
      finalizeCfexpressPart(
        'cfe-emi-shield-frame',
        27,
        '#cbd5e1',
        g,
        new THREE.Vector3(-6.2, -9.0, 1.0),
        new THREE.Vector3(-74, -46, 14),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C28. BGA Solder-Ball Protective Underfill Epoxy Resin (7.5m Drop Armor)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sloped meniscus perimeter capillary underfill fillets framing Controller, Primary NAND & LPDDR4 BGAs!
    const underfillSoc = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.0, 15.0, 0.7, 13.0, 13.0, 0.4), 0.34, 0.09, 0.09, 2, 16),
      mats.makeupSealViolet
    );
    underfillSoc.position.set(-6.2, -9.0, 0);

    const underfillNand = new THREE.Mesh(
      extrudeHiRes(createFrameShape(26.4, 18.4, 0.8, 24.2, 16.2, 0.5), 0.34, 0.09, 0.09, 2, 16),
      mats.makeupSealViolet
    );
    underfillNand.position.set(0, 12.6, 0);

    const underfillDram = new THREE.Mesh(
      extrudeHiRes(createFrameShape(10.6, 12.4, 0.6, 9.0, 10.8, 0.4), 0.30, 0.08, 0.08, 2, 14),
      mats.makeupSealViolet
    );
    underfillDram.position.set(9.4, -8.5, 0);

    // Dual capillary dispense corner meniscus fillets (L-pattern jet-dispense bead trace!)
    const dispenseBeadGeo = createChamferedBoxGeo(14.8, 0.52, 0.24, 0.2, 0.05, 'z');
    const dispSoc = new THREE.Mesh(dispenseBeadGeo, mats.makeupSealViolet);
    dispSoc.position.set(-6.2, -16.55, 0.08);
    dispSoc.userData.noEdges = true;

    g.add(underfillSoc, underfillNand, underfillDram, dispSoc);

    // Smooth spherical SAC305 BGA solder-ball arrays locked inside the epoxy matrix (NAND 7×5 + Controller 5×5!)
    addInstancedBalls(g, 7, 5, 3.0, 3.0, 0, 12.6, -0.1, 0.32, mats.solderBallSilver);
    addInstancedBalls(g, 5, 5, 2.35, 2.35, -6.2, -9.0, -0.1, 0.26, mats.solderBallSilver);

    parts.push(
      finalizeCfexpressPart(
        'cfe-bga-underfill-epoxy',
        28,
        '#9333ea',
        g,
        new THREE.Vector3(0, 0, 0.54),
        new THREE.Vector3(-56, 36, -18),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C29. S.M.A.R.T. Health Diagnostics & Media Scan Utility Wear-Monitor Logic
  // =========================================================================
  {
    const g = new THREE.Group();
    const smartBlock = buildChipPackage({
      w: 8.2,
      d: 5.2,
      h: 0.56,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.batBmsPcb,
      leadMat: mats.goldPlating,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });

    // 5 stepped health-telemetry gauge bars (PE-cycles / Bad-blocks / Temp / ECC-margin / Spare%)
    const barMats = [mats.cfaGreen, mats.cfaGreen, mats.vcWorkingFluidCyan, mats.goldPlating, mats.tantalumCapYellow];
    for (let i = 0; i < 5; i++) {
      const h = 1.65 + (4 - i) * 0.35;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.86, h, 0.18, 0.10, 0.03, 'z'),
        barMats[i]
      );
      bar.position.set(-2.95 + i * 1.15, -1.65 + h * 0.5, 0.34);
      bar.userData.noEdges = true;
      g.add(bar);
    }
    // NVM circular telemetry log ring-buffer on right flank
    const ringLog = new THREE.Mesh(hiResTorus(0.85, 0.14, 8, 22), mats.goldPlating);
    ringLog.position.set(2.8, 0.15, 0.36);
    ringLog.userData.noEdges = true;
    g.add(smartBlock, ringLog);

    parts.push(
      finalizeCfexpressPart(
        'cfe-smart-health-monitor',
        29,
        '#22c55e',
        g,
        new THREE.Vector3(9.8, 0.5, 0.8),
        new THREE.Vector3(60, 14, 42),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // C30. Ergonomic Non-Slip Pull-Tab Rib & Anti-X-Ray / Anti-UV Label Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ergonomic Sony TOUGH PPS-GF40 glass-fiber molded pull-tab crown with VDI-24 matte stipple!
    const pullBaseGeo = createChamferedBoxGeo(36.8, 3.8, 2.8, 0.75, 0.16, 'z');
    applyBoxUVs(pullBaseGeo, 10.0);
    const pullBase = new THREE.Mesh(pullBaseGeo, u.cfeToughResinMold);
    pullBase.position.set(0, 26.35, 0);
    g.add(pullBase);

    // Contoured recessed center thumb-grip extraction lip collar on top edge
    const thumbScallop = new THREE.Mesh(
      createChamferedBoxGeo(22.4, 2.55, 3.04, 0.55, 0.10, 'z'),
      u.cfeToughResinMold
    );
    thumbScallop.position.set(0, 26.42, 0);
    thumbScallop.userData.noEdges = true;
    g.add(thumbScallop);

    // 7 micro-serrated non-slip extraction ribs with alternating matte-anodized & chamfered titanium ridges!
    for (let i = 0; i < 7; i++) {
      const wRib = i === 0 || i === 6 ? 31.8 : 33.4;
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(wRib, 0.24, 3.24, 0.10, 0.045, 'z'),
        i % 2 === 0 ? mats.matteBlackAnodized : mats.titaniumRivet
      );
      rib.position.set(0, 24.92 + i * 0.46, 0);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // 22×2 instanced micro-serrated tactile thumb-grip pips along central extraction pad (+Z & -Z!)
    const pipGeo = createChamferedBoxGeo(0.46, 0.26, 0.14, 0.05, 0.02, 'z');
    const pipInst = new THREE.InstancedMesh(pipGeo, mats.matteBlackAnodized, 44);
    const dm = new THREE.Object3D();
    let pIdx = 0;
    for (const sz of [-1.62, 1.62]) {
      for (let c = 0; c < 11; c++) {
        for (const ry of [25.84, 26.76]) {
          dm.position.set(-9.5 + c * 1.9, ry, sz);
          dm.updateMatrix();
          pipInst.setMatrixAt(pIdx++, dm.matrix);
        }
      }
    }
    pipInst.instanceMatrix.needsUpdate = true;
    pipInst.userData.noEdges = true;
    g.add(pipInst);

    // Dual machined stainless structural reinforcement tie bars with knurled anchor bosses linking pull-tab to TOUGH armor!
    const tieGeo = createChamferedBoxGeo(1.15, 2.85, 1.24, 0.16, 0.04, 'z');
    const bossGeo = hiResCyl(0.54, 0.54, 1.48, 12).rotateX(Math.PI / 2);
    for (const tx of [-15.4, 15.4]) {
      const tie = new THREE.Mesh(tieGeo, mats.stainlessMachined);
      tie.position.set(tx, 25.2, 0);
      tie.userData.noEdges = true;
      for (const by of [24.25, 26.15]) {
        const boss = new THREE.Mesh(bossGeo, mats.titaniumRivet);
        boss.position.set(tx, by, 0);
        boss.userData.noEdges = true;
        g.add(boss);
      }
      g.add(tie);
    }

    // Concealed dual-layer metallic anti-X-ray (Ag-Sn) & anti-UV (Permalloy) laminated foil strips with micro-rivet pins (strictly concealed — zero bleed on C01/C02!)
    const xrayInlay = new THREE.Mesh(
      createChamferedBoxGeo(32.0, 1.4, 0.14, 0.2, 0.02, 'z'),
      mats.silverElectrode
    );
    xrayInlay.position.set(0, 25.2, 1.72);
    xrayInlay.userData.noEdges = true;
    const uvSubStrip = new THREE.Mesh(
      createChamferedBoxGeo(30.8, 0.92, 0.12, 0.14, 0.02, 'z'),
      mats.lensPermalloyShield
    );
    uvSubStrip.position.set(0, 25.2, -1.72);
    uvSubStrip.userData.noEdges = true;

    const rivetGeo = hiResCyl(0.24, 0.24, 0.20, 10).rotateX(Math.PI / 2);
    for (const rx of [-14.2, -7.1, 0, 7.1, 14.2]) {
      for (const rz of [1.74, -1.74]) {
        const rv = new THREE.Mesh(rivetGeo, mats.goldPlating);
        rv.position.set(rx, 25.2, rz);
        rv.userData.noEdges = true;
        g.add(rv);
      }
    }
    g.add(xrayInlay, uvSubStrip);

    parts.push(
      finalizeCfexpressPart(
        'cfe-grip-pull-tab-rib',
        30,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(22, 48, 34),
        cp,
        0.18
      )
    );
  }

  parts.push(...buildCfexpressUltra27Parts(mats));
  parts.push(...buildCfexpressUltra28Parts(mats));
  parts.push(...buildCfexpressUltra29Parts(mats));
  return parts;
}
