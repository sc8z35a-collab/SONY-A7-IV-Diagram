import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createRoundedRectShape,
  createTorsionSpringGeometry,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyPlanarUVs,
  buildChipPackage,
  buildShieldedInductor,
  buildSpotWeldNuggets,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { EVF_OPTICAL_Y } from './evfParts';
import { lazyExplanationStub } from '../lazyExplanations';
import {
  addCopperTraceRuns,
  addEnigViaArray,
  addFlushPhillipsCapHead,
  addOpticalFiducial,
  addRichHdiBackside,
  addSilkscreenCourtyard,
  addSmdPassiveWithFillets,
  createDin6799EClipGeo,
  createKnurledCollarGeo,
  createThreadedRingLatheGeo,
  createTrueWaveSpringGeo,
} from './evfDetailHelpers';

function finalizeStandaloneEvfPrecisionPart(
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
    subsystem: 'evf',
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

function createPrecisionRingGeo(
  innerR: number,
  outerR: number,
  depth: number,
  bevel = 0.04,
  segs = 44
): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const h = new THREE.Path();
  h.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  s.holes.push(h);
  return extrudeHiRes(s, depth, bevel, bevel, 2, segs);
}

function createPrecisionRing(
  innerR: number,
  outerR: number,
  depth: number,
  mat: THREE.Material,
  bevel = 0.04,
  segs = 44
): THREE.Mesh {
  return new THREE.Mesh(createPrecisionRingGeo(innerR, outerR, depth, bevel, segs), mat);
}

/**
 * Build 20 museum-grade ultra-detailed standalone-only EVF precision micro-parts (E56–E75):
 *   - E56–E60: Sony ECX337A/ECX345F Micro-OLED silicon backplane, OCCF, ALD TFE,
 *              Ag-alloy anode / ITO cathode bus ring & AlN ceramic thermal carrier
 *   - E61–E65: EVF dual-rail ±5V/-6.6V OLED PMIC, NTC thermistor & Demura SPI-EEPROM,
 *              0.3mm 61-pin back-flip ZIF connector, 48MHz MEMS clock & IEC-62471 IR-LED safety driver
 *   - E66–E70: Outer PFPE fluorine coating, CNC M26×0.5 retaining spanner ring,
 *              ED doublet n=1.56 UV optical cement, 6-DOF active-alignment UV pockets & internal knife-edge baffles
 *   - E71–E75: Diopter 3×120° glass-filled POM cam followers, -4.0/+3.0 m⁻¹ end-stop & -1.0 dpt index,
 *              eyepiece shutter Hall sensor & torsion spring, 850nm IR collimator ring & h6 dowel + BeCu EMI ground
 */
export function buildEvfPrecisionParts(mats: MaterialLibrary): CadPart[] {
  const cp = mats.clippingPlanes;
  const parts: CadPart[] = [];

  // =========================================================================
  // E56. Micro-OLED Monocrystalline Silicon CMOS Backplane (4T2C & 240Hz Scan)
  //      World Z in [+2.94, +3.36] (pos z=3.20 -> local z in [-0.26, +0.16])
  //      Size 16.4×12.6 clears E47 inner 17.0×13.2 by 0.28mm!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Monocrystalline diced silicon wafer substrate with chamfered scribe edge
    const waferGeo = createChamferedBoxGeo(16.4, 12.6, 0.24, 0.22, 0.02, 'z');
    applyPlanarUVs(waferGeo, 16.4, 12.6, 'xy');
    const wafer = new THREE.Mesh(waferGeo, mats.siliconBulk);
    g.add(wafer);

    // Bright bevel-diced wafer scribe-street seal ring around die periphery
    const scribeRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.32, 12.52, 0.2, 15.96, 12.16, 0.16), 0.05, 0.008, 0.008, 1, 12),
      mats.sinteredSilver
    );
    scribeRing.position.z = -0.145;
    scribeRing.userData.noEdges = true;
    g.add(scribeRing);

    // Active pixel matrix CMOS circuit zone (2048×RGB×1536 @ 6.3µm pitch, 4T2C compensation cells)
    const activeMat = new THREE.Mesh(
      createChamferedBoxGeo(12.9, 9.5, 0.09, 0.1, 0.014, 'z'),
      mats.siliconLogicLayer
    );
    activeMat.position.z = -0.155;
    g.add(activeMat);

    // Dense 12×8 4T2C pixel sub-bank circuit tiles (hoisted shared geo -> auto-instanced!)
    const cellTileGeo = new THREE.BoxGeometry(0.92, 0.98, 0.036);
    for (let ix = 0; ix < 12; ix++) {
      for (let iy = 0; iy < 8; iy++) {
        const tile = new THREE.Mesh(cellTileGeo, mats.siliconPhotodiode);
        tile.position.set(-5.72 + ix * 1.04, -3.99 + iy * 1.14, -0.215);
        tile.userData.noEdges = true;
        g.add(tile);
      }
    }

    // Fine M6 gold/copper horizontal gate scan buses & vertical data buses bisecting pixel banks
    const hBusGeo = new THREE.BoxGeometry(12.7, 0.045, 0.028);
    for (let iy = -3; iy <= 3; iy++) {
      const hb = new THREE.Mesh(hBusGeo, mats.copperHybridBond);
      hb.position.set(0, iy * 1.14, -0.228);
      hb.userData.noEdges = true;
      g.add(hb);
    }
    const vBusGeo = new THREE.BoxGeometry(0.045, 9.3, 0.028);
    for (let ix = -5; ix <= 5; ix++) {
      const vb = new THREE.Mesh(vBusGeo, mats.goldPlating);
      vb.position.set(ix * 1.04, 0, -0.224);
      vb.userData.noEdges = true;
      g.add(vb);
    }

    // Left & right vertical dual-line 240Hz shift-register gate driver strips + 14 micro-taps each
    const vScanGeo = createChamferedBoxGeo(0.84, 9.5, 0.075, 0.06, 0.012, 'z');
    const scanTapGeo = new THREE.BoxGeometry(0.36, 0.16, 0.032);
    for (const sx of [-7.12, 7.12]) {
      const strip = new THREE.Mesh(vScanGeo, mats.gatePolysilicon);
      strip.position.set(sx, 0, -0.17);
      g.add(strip);
      for (let j = 0; j < 14; j++) {
        const tap = new THREE.Mesh(scanTapGeo, mats.sinteredSilver);
        tap.position.set(sx * 0.94, -4.22 + j * 0.65, -0.215);
        tap.userData.noEdges = true;
        g.add(tap);
      }
    }

    // Bottom horizontal 8-bit column DAC & gamma R-2R resistor-ladder bank (18 discrete DAC slices)
    const hDac = new THREE.Mesh(
      createChamferedBoxGeo(12.9, 0.88, 0.08, 0.06, 0.012, 'z'),
      mats.gatePolysilicon
    );
    hDac.position.set(0, -5.36, -0.17);
    g.add(hDac);
    const dacSliceGeo = new THREE.BoxGeometry(0.46, 0.56, 0.032);
    for (let i = 0; i < 18; i++) {
      const sl = new THREE.Mesh(dacSliceGeo, i % 3 === 0 ? mats.goldPlating : mats.copperHybridBond);
      sl.position.set(-5.95 + i * 0.7, -5.36, -0.215);
      sl.userData.noEdges = true;
      g.add(sl);
    }

    // Top integrated TCON timing logic, Demura SRAM macro & MIPI SerDes PHY strips
    const topLogic = new THREE.Mesh(
      createChamferedBoxGeo(12.4, 0.72, 0.08, 0.06, 0.012, 'z'),
      mats.copperHybridBond
    );
    topLogic.position.set(0, 5.34, -0.17);
    g.add(topLogic);
    const sramBlockGeo = new THREE.BoxGeometry(1.42, 0.44, 0.032);
    for (let i = 0; i < 6; i++) {
      const blk = new THREE.Mesh(sramBlockGeo, mats.siliconPhotodiode);
      blk.position.set(-4.75 + i * 1.9, 5.34, -0.215);
      blk.userData.noEdges = true;
      g.add(blk);
    }

    // Perimeter Cu-metallization M6 power-distribution guard ring
    const metalRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.72, 11.92, 0.22, 15.22, 11.42, 0.16), 0.05, 0.008, 0.008, 1, 12),
      mats.copperHybridBond
    );
    metalRing.position.z = -0.185;
    metalRing.userData.noEdges = true;
    g.add(metalRing);

    // 72x perimeter Al/Au wire-bond I/O pad array along all 4 die edges
    const hPadGeo = new THREE.BoxGeometry(0.28, 0.36, 0.036);
    const vPadGeo = new THREE.BoxGeometry(0.36, 0.28, 0.036);
    for (let i = 0; i < 22; i++) {
      const px = -6.72 + i * 0.64;
      for (const sy of [-5.88, 5.88]) {
        const pad = new THREE.Mesh(hPadGeo, mats.goldPlating);
        pad.position.set(px, sy, -0.21);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }
    for (let i = 0; i < 14; i++) {
      const py = -4.55 + i * 0.7;
      for (const sx of [-7.78, 7.78]) {
        const pad = new THREE.Mesh(vPadGeo, mats.goldPlating);
        pad.position.set(sx, py, -0.21);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }

    // 4 corner stepper photolithography alignment fiducials
    for (const [fx, fy] of [
      [-7.18, 5.26],
      [7.18, 5.26],
      [-7.18, -5.26],
      [7.18, -5.26],
    ] as Array<[number, number]>) {
      addOpticalFiducial(g, fx, fy, -0.218, 0.22, 0.025, mats.goldPlating);
    }

    // Rear (+Z) Ti/Ni/Ag eutectic back-grind metallization & wafer laser batch-code bars
    const backMetal = new THREE.Mesh(
      createChamferedBoxGeo(15.2, 11.4, 0.032, 0.2, 0.008, 'z'),
      mats.sinteredSilver
    );
    backMetal.position.z = 0.132;
    backMetal.userData.noEdges = true;
    g.add(backMetal);

    const lotBarGeo = new THREE.BoxGeometry(0.28, 1.15, 0.02);
    for (let i = 0; i < 8; i++) {
      const b = new THREE.Mesh(lotBarGeo, mats.siliconBulk);
      b.position.set(-2.4 + i * 0.68, 3.6, 0.145);
      b.userData.noEdges = true;
      g.add(b);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-oled-cmos-backplane',
        56,
        '#2563eb',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 3.2),
        new THREE.Vector3(-28, -14, 48),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E57. Micro-OLED On-Chip Color Filter (OCCF) Symmetrical RGB Array & Black Matrix
  //      World Z in [+1.855, +2.025] (pos z=1.94 -> local z in [-0.085, +0.085])
  // =========================================================================
  {
    const g = new THREE.Group();

    // Opaque photolithographic carbon-black matrix perimeter frame
    const bmFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.5, 11.1, 0.22, 13.0, 9.6, 0.12), 0.12, 0.014, 0.014, 1, 16),
      mats.velvetFlockTrap
    );
    g.add(bmFrame);

    // Stepped inner optical bevel bezel separating black matrix from active RGB filter zone
    const innerBevel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.28, 9.88, 0.14, 12.92, 9.52, 0.1), 0.04, 0.008, 0.008, 1, 12),
      mats.matteBlackAnodized
    );
    innerBevel.position.z = -0.055;
    innerBevel.userData.noEdges = true;
    g.add(innerBevel);

    // Planarized transparent optical spacer substrate on silicon frontplane
    const baseFilm = new THREE.Mesh(
      createChamferedBoxGeo(13.05, 9.65, 0.055, 0.08, 0.008, 'z'),
      mats.opticalCementClear
    );
    baseFilm.position.z = 0.025;
    baseFilm.userData.noEdges = true;
    g.add(baseFilm);

    // Ultra-fine 40-column symmetrical RGBG On-Chip Color Filter (OCCF) subpixel stripes + razor black-matrix walls
    const colCount = 40;
    const spanX = 12.56;
    const pitchX = spanX / colCount;
    const stripeGeo = new THREE.BoxGeometry(pitchX * 0.72, 9.34, 0.058);
    const bmWallGeo = new THREE.BoxGeometry(pitchX * 0.24, 9.34, 0.072);
    const cfMats = [mats.cfaRed, mats.cfaGreen, mats.cfaBlue, mats.cfaGreen];
    for (let i = 0; i < colCount; i++) {
      const x = -spanX * 0.5 + (i + 0.5) * pitchX;
      const stripe = new THREE.Mesh(stripeGeo, cfMats[i % 4]);
      stripe.position.set(x, 0, -0.024);
      stripe.userData.noEdges = true;
      g.add(stripe);

      if (i < colCount - 1) {
        const wall = new THREE.Mesh(bmWallGeo, mats.velvetFlockTrap);
        wall.position.set(x + pitchX * 0.5, 0, -0.03);
        wall.userData.noEdges = true;
        g.add(wall);
      }
    }

    // 13x fine horizontal black-matrix row-isolation micro-ribs
    const hRibGeo = new THREE.BoxGeometry(12.82, 0.072, 0.074);
    for (let j = -6; j <= 6; j++) {
      const hRib = new THREE.Mesh(hRibGeo, mats.velvetFlockTrap);
      hRib.position.set(0, j * 0.74, -0.032);
      hRib.userData.noEdges = true;
      g.add(hRib);
    }

    // Photolithography corner alignment crosshairs + Vernier scale calibration ticks on black matrix rim
    for (const [fx, fy] of [
      [-6.86, 5.15],
      [6.86, 5.15],
      [-6.86, -5.15],
      [6.86, -5.15],
    ] as Array<[number, number]>) {
      addOpticalFiducial(g, fx, fy, -0.068, 0.16, 0.018, mats.goldPlating);
    }

    const vernierGeo = new THREE.BoxGeometry(0.06, 0.26, 0.018);
    for (let i = -8; i <= 8; i++) {
      const tick = new THREE.Mesh(vernierGeo, i % 4 === 0 ? mats.goldPlating : mats.sinteredSilver);
      tick.position.set(i * 0.65, 5.16, -0.068);
      tick.scale.y = i % 4 === 0 ? 1.35 : 0.85;
      tick.userData.noEdges = true;
      g.add(tick);

      const bTick = new THREE.Mesh(vernierGeo, i % 4 === 0 ? mats.goldPlating : mats.sinteredSilver);
      bTick.position.set(i * 0.65, -5.16, -0.068);
      bTick.scale.y = i % 4 === 0 ? 1.35 : 0.85;
      bTick.userData.noEdges = true;
      g.add(bTick);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-oled-occf-array',
        57,
        '#10b981',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 1.94),
        new THREE.Vector3(26, 22, 42),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // E58. Micro-OLED ALD Thin-Film Encapsulation (TFE) & Frit-Sealed Cover Glass
  //      World Z in [+0.99, +1.34] (pos z=1.16 -> local z in [-0.17, +0.18])
  // =========================================================================
  {
    const g = new THREE.Group();

    // Layer 1 (rear): ALD Al2O3 / SiNx alternating inorganic-organic multi-layer TFE nano-barrier
    const tfeFilm = new THREE.Mesh(
      createChamferedBoxGeo(15.6, 12.0, 0.065, 0.22, 0.01, 'z'),
      mats.aluminaHighKFilm
    );
    tfeFilm.position.z = 0.132;
    tfeFilm.userData.noEdges = true;
    g.add(tfeFilm);

    // Layer 2: Stepped inorganic SiNx passivation perimeter dam ring visible through cover glass
    const aldStepRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.55, 11.95, 0.24, 14.7, 11.1, 0.18), 0.06, 0.01, 0.01, 1, 16),
      mats.evfGlassEdgeRim
    );
    aldStepRing.position.z = 0.085;
    aldStepRing.userData.noEdges = true;
    g.add(aldStepRing);

    // Layer 3 (front): Low-CTE borosilicate optical sealing cover glass with crisp AR edge bevel
    const coverGlass = new THREE.Mesh(
      createChamferedBoxGeo(16.8, 13.2, 0.17, 0.35, 0.02, 'z'),
      mats.evfMlaGlass
    );
    coverGlass.position.z = -0.055;
    g.add(coverGlass);

    // Optical anti-reflection perimeter ground-glass edge chamfer bezel
    const edgeBevel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.78, 13.18, 0.34, 16.36, 12.76, 0.28), 0.18, 0.015, 0.015, 1, 16),
      mats.evfGlassEdgeRim
    );
    edgeBevel.position.z = -0.05;
    g.add(edgeBevel);

    // Perimeter laser-sintered glass-frit hermetic moisture dam frame (WVTR < 1e-6 g/m²·day)
    const fritDam = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.45, 12.85, 0.3, 15.1, 11.5, 0.22), 0.18, 0.018, 0.018, 1, 16),
      mats.ceramicAlumina
    );
    fritDam.position.z = 0.04;
    g.add(fritDam);

    // Pulsed laser-frit weld seam ripples around all 4 sides (both front optical visibility & rear bond)
    const weldDotGeo = hiResCyl(0.18, 0.2, 0.036, 10).rotateX(Math.PI / 2);
    for (let i = -6; i <= 6; i++) {
      for (const sy of [-6.08, 6.08]) {
        const w = new THREE.Mesh(weldDotGeo, mats.sinteredSilver);
        w.position.set(i * 1.18, sy, -0.145);
        w.userData.noEdges = true;
        g.add(w);
      }
    }
    for (let j = -4; j <= 4; j++) {
      for (const sx of [-7.88, 7.88]) {
        const w = new THREE.Mesh(weldDotGeo, mats.sinteredSilver);
        w.position.set(sx, j * 1.24, -0.145);
        w.userData.noEdges = true;
        g.add(w);
      }
    }

    // Thin-film CaO/BaO desiccant getter perimeter ring + segmented micro-absorption strips
    const getterRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.0, 11.4, 0.2, 14.3, 10.7, 0.16), 0.06, 0.01, 0.01, 1, 14),
      mats.sinteredSilver
    );
    getterRim.position.z = 0.115;
    getterRim.userData.noEdges = true;
    g.add(getterRim);

    const getterBarGeo = new THREE.BoxGeometry(1.15, 0.24, 0.028);
    for (let i = -4; i <= 4; i++) {
      for (const sy of [-5.52, 5.52]) {
        const gb = new THREE.Mesh(getterBarGeo, mats.titaniumRivet);
        gb.position.set(i * 1.48, sy, -0.144);
        gb.userData.noEdges = true;
        g.add(gb);
      }
    }

    // Dark laser-sintered borosilicate frit hermetic seal contrast border visible on front face
    const darkFritBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.22, 12.62, 0.28, 15.26, 11.66, 0.22), 0.04, 0.008, 0.008, 1, 16),
      mats.matteBlackAnodized
    );
    darkFritBorder.position.z = -0.142;
    darkFritBorder.userData.noEdges = true;
    g.add(darkFritBorder);

    // Architectural 3-layer ALD TFE stepped corner cutaway stairs (SiNx / Acrylate / Al2O3) at bottom-right
    const aldCutColors: Array<[number, number, THREE.Material]> = [
      [1.85, -0.144, mats.copperHybridBond],
      [1.35, -0.146, mats.goldPlating],
      [0.85, -0.148, mats.sinteredSilver],
    ];
    for (const [sz, cz, cMat] of aldCutColors) {
      const stepSq = new THREE.Mesh(createChamferedBoxGeo(sz, sz * 0.72, 0.022, 0.08, 0.005, 'z'), cMat);
      stepSq.position.set(7.4 - sz * 0.5, -5.65 + sz * 0.36, cz);
      stepSq.userData.noEdges = true;
      g.add(stepSq);
    }

    // 4 corner optical lamination alignment crosshairs + laser glass lot-code bars
    for (const [fx, fy] of [
      [-7.45, 5.65],
      [7.45, 5.65],
      [-7.45, -5.65],
      [7.45, -5.65],
    ] as Array<[number, number]>) {
      addOpticalFiducial(g, fx, fy, -0.15, 0.22, 0.02, mats.goldPlating);
    }

    const codeTickGeo = new THREE.BoxGeometry(0.14, 0.36, 0.018);
    for (let i = 0; i < 6; i++) {
      const t = new THREE.Mesh(codeTickGeo, mats.invarScaleBar);
      t.position.set(4.5 + i * 0.34, 6.08, -0.148);
      t.userData.noEdges = true;
      g.add(t);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-oled-tfe-coverglass',
        58,
        '#7c3aed',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 1.16),
        new THREE.Vector3(-30, 18, 39),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // E59. Micro-OLED High-Reflectivity Ag-Alloy Anode & Perimeter ITO Cathode Bus Ring
  //      World Z in [+2.60, +2.84] (pos z=2.74 -> local z in [-0.14, +0.10])
  // =========================================================================
  {
    const g = new THREE.Group();

    // High-reflectivity silver-alloy (APC: Ag-Pd-Cu) optical micro-cavity bottom mirror plane
    const anodeMirror = new THREE.Mesh(
      createChamferedBoxGeo(13.2, 9.9, 0.075, 0.14, 0.01, 'z'),
      mats.sinteredSilver
    );
    anodeMirror.position.z = 0.038;
    g.add(anodeMirror);

    // Fine micro-etched ITO transparent-electrode current-spreading bus grid across mirror plane
    const hGridGeo = new THREE.BoxGeometry(12.9, 0.045, 0.018);
    const vGridGeo = new THREE.BoxGeometry(0.045, 9.6, 0.018);
    for (let j = -4; j <= 4; j++) {
      const hg = new THREE.Mesh(hGridGeo, mats.stainlessMachined);
      hg.position.set(0, j * 1.08, -0.008);
      hg.userData.noEdges = true;
      g.add(hg);
    }
    for (let i = -5; i <= 5; i++) {
      const vg = new THREE.Mesh(vGridGeo, mats.stainlessMachined);
      vg.position.set(i * 1.18, 0, -0.008);
      vg.userData.noEdges = true;
      g.add(vg);
    }

    // Inner stepped dielectric anode-to-cathode isolation dam framing active mirror aperture
    const isoDam = new THREE.Mesh(
      extrudeHiRes(createFrameShape(13.78, 10.38, 0.2, 13.14, 9.74, 0.14), 0.08, 0.012, 0.012, 1, 14),
      mats.velvetFlockTrap
    );
    isoDam.position.z = -0.025;
    g.add(isoDam);

    // Low-sheet-resistance gold/copper perimeter cathode power bus ring eliminating IR-drop vignetting
    const cathodeBus = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.2, 12.4, 0.32, 13.7, 10.3, 0.18), 0.15, 0.018, 0.018, 2, 16),
      mats.goldPlating
    );
    g.add(cathodeBus);

    // Dual-layer heavy copper current-equalizing feeder bars along top/bottom & left/right cathode edges
    const hFeedGeo = createChamferedBoxGeo(14.8, 0.54, 0.068, 0.08, 0.01, 'z');
    for (const sy of [-5.58, 5.58]) {
      const bar = new THREE.Mesh(hFeedGeo, mats.copperHybridBond);
      bar.position.set(0, sy, -0.095);
      g.add(bar);
    }
    const vFeedGeo = createChamferedBoxGeo(0.56, 9.4, 0.068, 0.08, 0.01, 'z');
    for (const sx of [-7.46, 7.46]) {
      const ear = new THREE.Mesh(vFeedGeo, mats.copperHybridBond);
      ear.position.set(sx, 0, -0.095);
      g.add(ear);
    }

    // 44x perimeter cathode-via micro-contact studs bridging transparent Mg:Ag/ITO cathode to Si Vss
    const viaCoords: Array<[number, number]> = [];
    for (let i = -6; i <= 6; i++) {
      viaCoords.push([i * 1.12, 5.58]);
      viaCoords.push([i * 1.12, -5.58]);
    }
    for (let j = -4; j <= 4; j++) {
      viaCoords.push([-7.46, j * 1.02]);
      viaCoords.push([7.46, j * 1.02]);
    }
    addEnigViaArray(g, viaCoords, -0.098, 0.065, 0.17, 0.075, mats.goldPlating, mats.velvetFlockTrap);

    // 16x laser-trimmed radial cathode equalization bridge fingers stepping across the isolation dam
    const bridgeGeo = new THREE.BoxGeometry(0.18, 0.48, 0.036);
    for (let i = -3; i <= 3; i++) {
      for (const sy of [-5.08, 5.08]) {
        const br = new THREE.Mesh(bridgeGeo, mats.goldPlating);
        br.position.set(i * 1.9, sy, -0.085);
        br.userData.noEdges = true;
        g.add(br);
      }
    }

    // 4 corner gold Kelvin Vss sense pads + alignment crosshairs
    for (const [fx, fy] of [
      [-7.46, 5.58],
      [7.46, 5.58],
      [-7.46, -5.58],
      [7.46, -5.58],
    ] as Array<[number, number]>) {
      addOpticalFiducial(g, fx, fy, -0.105, 0.24, 0.024, mats.sinteredSilver);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-oled-anode-cathode-bus',
        59,
        '#d97706',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 2.74),
        new THREE.Vector3(36, 4, 46),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E60. Micro-OLED AlN Ceramic Thermal Carrier & AuSn Eutectic Brazing
  //      Cradled cleanly inside E14 Kovar pocket (inner 22.1×17.1) & world Z in [+3.50, +4.45]!
  //      pos z=3.98 -> local z in [-0.48, +0.47]
  // =========================================================================
  {
    const g = new THREE.Group();

    const holeCoords: Array<[number, number]> = [
      [-9.2, 6.6],
      [9.2, 6.6],
      [-9.2, -6.6],
      [9.2, -6.6],
    ];
    const baseShape = createRoundedRectShape(21.4, 16.4, 1.0);
    addCircleHoles(
      baseShape,
      holeCoords.map(([x, y]) => [x, y, 0.7] as [number, number, number])
    );
    const ceramicBase = new THREE.Mesh(
      extrudeHiRes(baseShape, 0.34, 0.03, 0.03, 2, 16),
      mats.ceramicAlumina
    );
    g.add(ceramicBase);

    // 4x precision gold-plated press-fit alignment bushing rings inside corner holes (visible front & back!)
    const collarGeo = createPrecisionRingGeo(0.68, 1.08, 0.56, 0.02, 20);
    for (const [hx, hy] of holeCoords) {
      const collar = new THREE.Mesh(collarGeo, mats.goldPlating);
      collar.position.set(hx, hy, -0.14);
      g.add(collar);
    }

    // Recessed die-cavity stepped perimeter AlN ledge (facing -Z toward CMOS backplane) with matching 4 corner holes
    const ledgeShape = createFrameShape(21.1, 16.1, 0.85, 17.3, 13.3, 0.42);
    addCircleHoles(
      ledgeShape,
      holeCoords.map(([x, y]) => [x, y, 0.72] as [number, number, number])
    );
    const ledge = new THREE.Mesh(
      extrudeHiRes(ledgeShape, 0.22, 0.02, 0.02, 2, 16),
      mats.ceramicAlumina
    );
    ledge.position.z = -0.3;
    g.add(ledge);

    // Bright Au80Sn20 eutectic brazing seal collar ringing the cavity rim
    const ausnSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(17.42, 13.42, 0.42, 16.58, 12.68, 0.32), 0.08, 0.014, 0.014, 1, 16),
      mats.goldPlating
    );
    ausnSeal.position.z = -0.38;
    g.add(ausnSeal);

    // Low-modulus Ag-filled conductive thermal die-attach bed inside cavity + cross-hatch adhesive bleed channels
    const agBed = new THREE.Mesh(
      createChamferedBoxGeo(16.4, 12.6, 0.11, 0.22, 0.018, 'z'),
      mats.sinteredSilver
    );
    agBed.position.z = -0.25;
    g.add(agBed);

    const bleedHGeo = new THREE.BoxGeometry(15.6, 0.1, 0.024);
    const bleedVGeo = new THREE.BoxGeometry(0.1, 11.8, 0.024);
    for (let j = -2; j <= 2; j++) {
      const bh = new THREE.Mesh(bleedHGeo, mats.tungstenCopper);
      bh.position.set(0, j * 2.2, -0.312);
      bh.userData.noEdges = true;
      g.add(bh);
    }
    for (let i = -3; i <= 3; i++) {
      const bv = new THREE.Mesh(bleedVGeo, mats.tungstenCopper);
      bv.position.set(i * 2.2, 0, -0.312);
      bv.userData.noEdges = true;
      g.add(bv);
    }

    // 24x filled tungsten-copper thermal vias bridging front die-attach cavity to rear W-Cu heat slug
    const thVias: Array<[number, number]> = [];
    for (let ix = -2; ix <= 2; ix++) {
      for (let iy = -1; iy <= 1; iy++) {
        thVias.push([ix * 2.6, iy * 3.1]);
      }
    }
    addEnigViaArray(g, thVias, -0.315, 0.04, 0.26, 0.11, mats.goldPlating, mats.copperHeatSpreader);

    // 48x gold-plated wire-bond shelf fingers (24 bottom, 12 top, 6 left, 6 right)
    const hPadGeo = new THREE.BoxGeometry(0.28, 0.86, 0.045);
    const vPadGeo = new THREE.BoxGeometry(0.86, 0.28, 0.045);
    for (let i = 0; i < 24; i++) {
      const px = -7.82 + i * 0.68;
      const bPad = new THREE.Mesh(hPadGeo, mats.goldPlating);
      bPad.position.set(px, -7.28, -0.43);
      bPad.userData.noEdges = true;
      g.add(bPad);
      if (i % 2 === 0) {
        const tPad = new THREE.Mesh(hPadGeo, mats.goldPlating);
        tPad.position.set(px, 7.28, -0.43);
        tPad.userData.noEdges = true;
        g.add(tPad);
      }
    }
    for (let j = 0; j < 6; j++) {
      const py = -4.25 + j * 1.7;
      for (const sx of [-9.55, 9.55]) {
        const sPad = new THREE.Mesh(vPadGeo, mats.goldPlating);
        sPad.position.set(sx, py, -0.43);
        sPad.userData.noEdges = true;
        g.add(sPad);
      }
    }

    // Metallized gold outer edge castellations (12 top/bottom, 8 left/right)
    const castGeo = hiResCyl(0.22, 0.22, 0.56, 10).rotateX(Math.PI / 2);
    for (let i = -5; i <= 5; i++) {
      for (const sy of [-8.12, 8.12]) {
        const c = new THREE.Mesh(castGeo, mats.goldPlating);
        c.position.set(i * 1.48, sy, -0.1);
        c.userData.noEdges = true;
        g.add(c);
      }
    }

    // Rear (+Z) brazed Tungsten-Copper (W-Cu) thermal spreader slug + Au-Ni perimeter brazing meniscus
    const wcuRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.0, 12.2, 0.42, 15.0, 11.2, 0.34), 0.14, 0.018, 0.018, 1, 16),
      mats.goldPlating
    );
    wcuRim.position.z = 0.24;
    g.add(wcuRim);

    const wcuSlug = new THREE.Mesh(
      createChamferedBoxGeo(15.2, 11.4, 0.21, 0.35, 0.02, 'z'),
      mats.tungstenCopper
    );
    wcuSlug.position.z = 0.335;
    g.add(wcuSlug);

    // Rear thermal-via bosses & laser lot-ID stencil bars on W-Cu spreader
    addEnigViaArray(g, thVias, 0.435, 0.03, 0.24, 0.1, mats.goldPlating, mats.copperHeatSpreader);
    const idBarGeo = new THREE.BoxGeometry(0.26, 1.05, 0.02);
    for (let i = 0; i < 7; i++) {
      const bar = new THREE.Mesh(idBarGeo, mats.invarScaleBar);
      bar.position.set(-2.1 + i * 0.7, 4.65, 0.445);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-oled-ceramic-carrier',
        60,
        '#94a3b8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, 3.98),
        new THREE.Vector3(34, -22, 52),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E61. Micro-OLED Dual-Rail Analog PMIC (+5V ELVDD / -6.6V ELVSS & Inductors)
  //      Populated flush on E16 TCON PCB Side-B -Z face: world Z in [+6.48, +7.37]!
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = new THREE.Group();
    sub.rotation.y = Math.PI;
    g.add(sub);

    const island = new THREE.Mesh(
      createChamferedBoxGeo(7.2, 5.6, 0.14, 0.3, 0.02, 'z'),
      mats.sensorPcb
    );
    sub.add(island);
    addRichHdiBackside(sub, 7.2, 5.6, mats, 0);

    // Heavy routed copper ELVDD / ELVSS / SW1 / SW2 power planes & traces on front face
    addCopperTraceRuns(
      sub,
      [
        [-1.3, 0.4, 1.85, 1.35],
        [-1.3, 0.4, 1.85, -1.1],
        [-1.3, -1.0, -1.95, -1.85],
        [-0.2, -1.0, 0.05, -1.85],
        [1.85, -1.1, 0.05, -1.85],
        [-2.3, 2.2, 0.4, 2.2],
        [-2.85, 1.8, -2.85, -1.8],
        [3.15, 2.1, 3.15, -2.1],
      ],
      0.16,
      0.026,
      0.082,
      mats.copperHeatSpreader
    );

    // ENIG ground-stitching via fence + 4 gold ELVDD/ELVSS/VREF/PG test pads
    const pmicVias: Array<[number, number]> = [
      [-3.15, 2.25],
      [-3.15, 0.85],
      [-3.15, -0.55],
      [-3.15, -2.15],
      [3.15, 2.25],
      [3.15, 0.15],
      [3.15, -2.25],
      [-0.6, 2.42],
      [1.2, 2.42],
      [2.1, -2.35],
    ];
    addEnigViaArray(sub, pmicVias, 0.085, 0.036, 0.14, 0.06, mats.goldPlating, mats.velvetFlockTrap);

    // Dedicated QFN-28 Dual-Rail OLED PMIC IC + silkscreen courtyard + laser package markings
    addSilkscreenCourtyard(sub, -1.3, 0.4, 3.28, 3.28, 0.084, 0.05, mats.invarScaleBar, 'tl');
    const pmic = buildChipPackage({
      w: 2.9,
      d: 2.9,
      h: 0.56,
      style: 'qfn',
      pinsPerSide: 7,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    pmic.position.set(-1.3, 0.4, 0.35);
    sub.add(pmic);
    const markThinGeo = new THREE.BoxGeometry(1.15, 0.055, 0.016);
    const markShortGeo = new THREE.BoxGeometry(0.75, 0.05, 0.016);
    const mk1 = new THREE.Mesh(markThinGeo, mats.invarScaleBar);
    mk1.position.set(-1.15, 0.68, 0.636);
    const mk2 = new THREE.Mesh(markShortGeo, mats.invarScaleBar);
    mk2.position.set(-1.35, 0.44, 0.636);
    const mk3 = new THREE.Mesh(markThinGeo, mats.invarScaleBar);
    mk3.position.set(-1.15, 0.2, 0.636);
    const dmGeo = new THREE.BoxGeometry(0.42, 0.42, 0.016);
    const dm = new THREE.Mesh(dmGeo, mats.titaniumRivet);
    dm.position.set(-2.12, -0.35, 0.636);
    mk1.userData.noEdges = mk2.userData.noEdges = mk3.userData.noEdges = dm.userData.noEdges = true;
    sub.add(mk1, mk2, mk3, dm);

    // 2x miniature molded metal-composite shielded buck-boost / inverting power inductors (2R2) + solder fillets
    const indFilletGeo = createChamferedBoxGeo(0.28, 1.55, 0.24, 0.05, 0.015, 'z');
    for (const [lx, ly] of [
      [1.85, 1.35],
      [1.85, -1.1],
    ] as Array<[number, number]>) {
      addSilkscreenCourtyard(sub, lx, ly, 2.25, 2.15, 0.084, 0.045, mats.invarScaleBar, 'tr');
      const ind = buildShieldedInductor(
        1.9,
        0.64,
        mats.ferriteInductor,
        mats.silverElectrode,
        mats.sinteredSilver,
        'z'
      );
      ind.position.set(lx, ly, 0.39);
      sub.add(ind);
      for (const sx of [-1.02, 1.02]) {
        const fl = new THREE.Mesh(indFilletGeo, mats.solderBallSilver);
        fl.position.set(lx + sx, ly, 0.16);
        fl.userData.noEdges = true;
        sub.add(fl);
      }
    }

    // 2x low-ESR yellow tantalum bulk output capacitors (ELVDD & ELVSS rails) + solder fillets
    for (const cx of [-1.95, 0.05]) {
      const cap = buildTantalumCap(
        1.65,
        0.96,
        0.54,
        mats.tantalumCapYellow,
        mats.copperHeatSpreader,
        mats.silverElectrode,
        'z'
      );
      cap.position.set(cx, -1.85, 0.34);
      sub.add(cap);
    }

    // 6x 0201 ceramic output ripple-filter & bootstrap MLCCs with solder fillets
    for (let i = 0; i < 4; i++) {
      addSmdPassiveWithFillets(
        sub,
        0.66,
        0.34,
        0.28,
        -2.35 + i * 0.9,
        2.22,
        0.21,
        mats.smdCeramic,
        mats.silverElectrode,
        mats.solderBallSilver
      );
    }
    addSmdPassiveWithFillets(
      sub,
      0.58,
      0.32,
      0.26,
      1.95,
      -2.38,
      0.2,
      mats.icEpoxy,
      mats.silverElectrode,
      mats.solderBallSilver
    );
    addSmdPassiveWithFillets(
      sub,
      0.58,
      0.32,
      0.26,
      -3.1,
      0.15,
      0.2,
      mats.smdCeramic,
      mats.silverElectrode,
      mats.solderBallSilver,
      Math.PI / 2
    );

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-oled-pmic-regulator',
        61,
        '#eab308',
        g,
        new THREE.Vector3(7.2, EVF_OPTICAL_Y - 2.2, 7.22),
        new THREE.Vector3(42, -16, 62),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E62. Micro-OLED NTC Temperature Sensor & Factory Demura / DCI-P3 SPI-EEPROM
  //      Populated flush on E16 TCON PCB Side-B -Z upper-left quadrant!
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = new THREE.Group();
    sub.rotation.y = Math.PI;
    g.add(sub);

    const subPad = new THREE.Mesh(
      createChamferedBoxGeo(6.6, 5.0, 0.14, 0.3, 0.02, 'z'),
      mats.sensorPcb
    );
    sub.add(subPad);
    addRichHdiBackside(sub, 6.6, 5.0, mats, 1);

    // Routed 4-wire SPI bus (CS/CLK/MOSI/MISO) & NTC Kelvin bridge traces
    addCopperTraceRuns(
      sub,
      [
        [-2.3, 0.6, -2.85, 0.6],
        [-2.85, 0.6, -2.85, 2.05],
        [-1.1, 1.65, -1.1, 2.1],
        [-1.1, -0.45, -2.25, -1.45],
        [-0.4, -0.45, -1.25, -1.45],
        [0.2, -0.45, -0.25, -1.45],
        [0.45, 0.9, 1.85, 0.9],
        [0.75, -1.45, 1.85, -1.45],
      ],
      0.11,
      0.024,
      0.082,
      mats.copperHeatSpreader
    );

    // 8-pin WSON SPI-EEPROM storing per-panel Demura uniformity & DCI-P3 3D-LUT tables
    addSilkscreenCourtyard(sub, -1.1, 0.6, 3.05, 2.45, 0.084, 0.045, mats.invarScaleBar, 'tl');
    const eeprom = buildChipPackage({
      w: 2.7,
      d: 2.1,
      h: 0.52,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.goldPlating,
      pin1Mat: mats.sinteredSilver,
      axis: 'z',
    });
    eeprom.position.set(-1.1, 0.6, 0.33);
    sub.add(eeprom);
    const eepMark = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.14, 0.02), mats.invarScaleBar);
    eepMark.position.set(-1.1, 0.6, 0.598);
    eepMark.userData.noEdges = true;
    sub.add(eepMark);

    // Precision 0402 blue-banded NTC thermistor with bright fillets
    addSmdPassiveWithFillets(
      sub,
      1.1,
      0.58,
      0.44,
      1.85,
      0.95,
      0.29,
      mats.ferriteInductor,
      mats.silverElectrode,
      mats.solderBallSilver,
      0,
      mats.mountThreadLockBlue
    );

    // Sculpted copper thermal-coupling sense tongue with 6 filled thermal vias bridging NTC to OLED thermal path
    const senseFinger = new THREE.Mesh(
      createChamferedBoxGeo(1.38, 3.25, 0.13, 0.22, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    senseFinger.position.set(1.92, -0.72, 0.135);
    sub.add(senseFinger);
    const senseVias: Array<[number, number]> = [
      [1.62, -0.05],
      [2.22, -0.05],
      [1.62, -0.82],
      [2.22, -0.82],
      [1.62, -1.58],
      [2.22, -1.58],
    ];
    addEnigViaArray(sub, senseVias, 0.198, 0.04, 0.14, 0.06, mats.goldPlating, mats.velvetFlockTrap);

    // 5x gold factory Demura SPI programming pogo-pin pads along top edge
    const pogoGeo = hiResCyl(0.24, 0.24, 0.036, 12).rotateX(Math.PI / 2);
    for (let i = 0; i < 5; i++) {
      const pp = new THREE.Mesh(pogoGeo, mats.goldPlating);
      pp.position.set(-2.3 + i * 0.88, 2.08, 0.088);
      pp.userData.noEdges = true;
      sub.add(pp);
    }

    // Precision 0.1% thin-film reference bridge resistors & SPI pull-up/bypass passives with fillets
    for (let i = 0; i < 4; i++) {
      addSmdPassiveWithFillets(
        sub,
        0.72,
        0.38,
        0.28,
        -2.25 + i * 0.98,
        -1.52,
        0.21,
        i === 3 ? mats.smdCeramic : mats.icEpoxy,
        mats.silverElectrode,
        mats.solderBallSilver
      );
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-oled-ntc-eeprom',
        62,
        '#06b6d4',
        g,
        new THREE.Vector3(-7.2, EVF_OPTICAL_Y + 5.0, 7.22),
        new THREE.Vector3(-42, 22, 62),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E63. EVF TCON 0.3mm-Pitch 61-Pin Back-Flip ZIF Connector & SUS Lock Actuator
  //      Mounted flush on E16 TCON PCB Side-B -Z bottom edge: world Z in [+6.46, +7.34]!
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = new THREE.Group();
    sub.rotation.y = Math.PI;
    g.add(sub);

    // High-temp UL94V-0 ivory LCP low-profile connector housing (0.62mm height, 18.6mm span)
    const housing = new THREE.Mesh(
      createChamferedBoxGeo(18.6, 2.45, 0.58, 0.16, 0.035, 'z'),
      mats.zifIvoryPlastic
    );
    sub.add(housing);

    // Left & right stepped FPC guide cheeks framing the cable lead-in funnel
    const cheekGeo = createChamferedBoxGeo(0.75, 2.48, 0.66, 0.08, 0.025, 'z');
    for (const sx of [-9.02, 9.02]) {
      const ck = new THREE.Mesh(cheekGeo, mats.zifIvoryPlastic);
      ck.position.set(sx, 0, 0.04);
      sub.add(ck);
    }

    // Front recessed FPC cable entry slot bevel (matte dark interior)
    const entrySlot = new THREE.Mesh(
      new THREE.BoxGeometry(17.3, 0.52, 0.34),
      mats.velvetFlockTrap
    );
    entrySlot.position.set(0, -1.06, 0.06);
    entrySlot.userData.noEdges = true;
    sub.add(entrySlot);

    // 30x internal gold-plated BeCu cantilevered spring-contact beams gleaming inside entry slot!
    const innerBeamGeo = new THREE.BoxGeometry(0.14, 0.42, 0.12);
    const pinGeo = new THREE.BoxGeometry(0.16, 0.54, 0.11);
    const filletGeo = new THREE.BoxGeometry(0.2, 0.24, 0.08);
    for (let i = 0; i < 30; i++) {
      const px = -8.4 + i * 0.58;
      // Internal spring contact nose visible inside cable slot
      const beam = new THREE.Mesh(innerBeamGeo, mats.goldPlating);
      beam.position.set(px + 0.14, -1.04, 0.14);
      beam.userData.noEdges = true;
      sub.add(beam);

      // Staggered dual-row 0.3mm-pitch external SMT solder tails + bright reflow solder fillets
      const topPin = new THREE.Mesh(pinGeo, mats.goldPlating);
      topPin.position.set(px, 1.32, -0.23);
      topPin.userData.noEdges = true;
      const topFillet = new THREE.Mesh(filletGeo, mats.solderBallSilver);
      topFillet.position.set(px, 1.54, -0.26);
      topFillet.userData.noEdges = true;

      const botPin = new THREE.Mesh(pinGeo, mats.goldPlating);
      botPin.position.set(px + 0.29, -1.32, -0.23);
      botPin.userData.noEdges = true;
      const botFillet = new THREE.Mesh(filletGeo, mats.solderBallSilver);
      botFillet.position.set(px + 0.29, -1.54, -0.26);
      botFillet.userData.noEdges = true;

      sub.add(topPin, topFillet, botPin, botFillet);
    }

    // Hinged black PPS back-flip locking actuator lever bar with pivot ears & tactile grip ribs
    const flipLever = new THREE.Mesh(
      createChamferedBoxGeo(17.5, 0.96, 0.2, 0.1, 0.025, 'z'),
      mats.icEpoxy
    );
    flipLever.position.set(0, 0.52, 0.36);
    sub.add(flipLever);

    // Center molded tactile lift ridge & 7 anti-slip serrations on back-flip actuator
    const liftRidge = new THREE.Mesh(
      createChamferedBoxGeo(6.4, 0.24, 0.09, 0.04, 0.015, 'z'),
      mats.matteBlackAnodized
    );
    liftRidge.position.set(0, 0.86, 0.45);
    sub.add(liftRidge);

    const serGeo = new THREE.BoxGeometry(0.18, 0.58, 0.036);
    for (let i = -5; i <= 5; i++) {
      const s = new THREE.Mesh(serGeo, mats.titaniumRivet);
      s.position.set(i * 0.46, 0.5, 0.468);
      s.userData.noEdges = true;
      sub.add(s);
    }

    // Twin stainless trunnion hinge pins coupling back-flip bar to left/right cheeks + Pin-1 triangle
    const hingePinGeo = hiResCyl(0.11, 0.11, 0.72, 10).rotateZ(Math.PI / 2);
    for (const sx of [-8.86, 8.86]) {
      const hp = new THREE.Mesh(hingePinGeo, mats.stainlessMachined);
      hp.position.set(sx, 0.18, 0.34);
      hp.userData.noEdges = true;
      sub.add(hp);
    }
    const pin1Mark = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 0.03), mats.goldPlating);
    pin1Mark.position.set(-8.35, -0.42, 0.31);
    pin1Mark.userData.noEdges = true;
    sub.add(pin1Mark);

    // Left & right stepped stainless steel SMT solder retention hold-down brackets + solder fillets
    const tabGeo = createChamferedBoxGeo(0.98, 2.28, 0.62, 0.09, 0.025, 'z');
    const tabFootGeo = createChamferedBoxGeo(1.18, 0.85, 0.14, 0.06, 0.015, 'z');
    for (const sx of [-9.72, 9.72]) {
      const tab = new THREE.Mesh(tabGeo, mats.stainlessMachined);
      tab.position.set(sx, 0, -0.02);
      const foot = new THREE.Mesh(tabFootGeo, mats.solderBallSilver);
      foot.position.set(sx, 0, -0.27);
      foot.userData.noEdges = true;
      sub.add(tab, foot);
    }

    // Backside (-Z) LCP inspection ribs & dual molded PCB locating bosses (z >= -0.34)
    const ribBackGeo = new THREE.BoxGeometry(16.8, 0.24, 0.04);
    for (const sy of [-0.55, 0.55]) {
      const rb = new THREE.Mesh(ribBackGeo, mats.sinteredSilver);
      rb.position.set(0, sy, -0.305);
      rb.userData.noEdges = true;
      sub.add(rb);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-tcon-zif-connector',
        63,
        '#f59e0b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y - 7.9, 6.98),
        new THREE.Vector3(-16, -38, 60),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E64. 240Hz EVF Ultra-Low-Jitter 48MHz Quartz/MEMS Oscillator & SSC PLL Filter
  //      Populated flush on E16 TCON PCB Side-B -Z lower-left quadrant!
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = new THREE.Group();
    sub.rotation.y = Math.PI;
    g.add(sub);

    // Ground-guard copper fence ring isolating clock oscillator from MIPI/PMIC noise
    const guardFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(6.6, 5.2, 0.3, 5.56, 4.16, 0.18), 0.14, 0.02, 0.02, 1, 12),
      mats.copperHeatSpreader
    );
    sub.add(guardFrame);

    const oscBoard = new THREE.Mesh(
      createChamferedBoxGeo(6.16, 4.76, 0.12, 0.22, 0.02, 'z'),
      mats.sensorPcb
    );
    oscBoard.position.z = -0.03;
    sub.add(oscBoard);
    addRichHdiBackside(sub, 6.2, 4.8, mats, 2);

    // 22x ENIG perimeter Faraday stitching vias punched directly through the copper guard ring!
    const guardVias: Array<[number, number]> = [];
    for (let i = -3; i <= 3; i++) {
      guardVias.push([i * 0.92, 2.34]);
      guardVias.push([i * 0.92, -2.34]);
    }
    for (let j = -1; j <= 1; j++) {
      guardVias.push([-3.04, j * 1.15]);
      guardVias.push([3.04, j * 1.15]);
    }
    addEnigViaArray(sub, guardVias, 0.088, 0.036, 0.13, 0.055, mats.goldPlating, mats.velvetFlockTrap);

    // Differential clock output trace pair & PLL loop-filter copper runs
    addCopperTraceRuns(
      sub,
      [
        [0.45, 0.72, 1.68, 0.72],
        [0.45, 0.22, 1.68, 0.22],
        [1.68, 0.72, 1.68, -1.3],
        [-1.3, -1.3, 1.68, -1.3],
        [-0.85, -0.68, -0.85, -1.3],
      ],
      0.11,
      0.024,
      0.055,
      mats.copperHeatSpreader
    );

    // 2016 hermetic seam-welded ceramic/Kovar 48MHz low-jitter MEMS oscillator (<1ps RMS)
    addSilkscreenCourtyard(sub, -0.85, 0.42, 3.12, 2.52, 0.055, 0.045, mats.invarScaleBar, 'bl');
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.2, 0.42, 0.14, 0.025, 'z'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(-0.85, 0.42, 0.26);
    // Gold AuSn seam-weld sealing ring sandwiched between ceramic body and Kovar lid
    const seamRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(2.74, 2.14, 0.12, 2.42, 1.82, 0.08), 0.07, 0.01, 0.01, 1, 10),
      mats.goldPlating
    );
    seamRing.position.set(-0.85, 0.42, 0.48);
    const xtalLid = new THREE.Mesh(
      createChamferedBoxGeo(2.54, 1.94, 0.17, 0.1, 0.02, 'z'),
      mats.stainlessMachined
    );
    xtalLid.position.set(-0.85, 0.42, 0.57);
    // Laser frequency stencil bars & pin-1 chamfer dot on lid
    const lidMark = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.14, 0.02), mats.matteBlackAnodized);
    lidMark.position.set(-0.85, 0.56, 0.662);
    lidMark.userData.noEdges = true;
    const lidMark2 = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.1, 0.02), mats.matteBlackAnodized);
    lidMark2.position.set(-0.85, 0.26, 0.662);
    lidMark2.userData.noEdges = true;
    const pin1Dot = new THREE.Mesh(hiResCyl(0.11, 0.11, 0.024, 10).rotateX(Math.PI / 2), mats.goldPlating);
    pin1Dot.position.set(-1.82, -0.25, 0.662);
    pin1Dot.userData.noEdges = true;
    sub.add(xtalBase, seamRing, xtalLid, lidMark, lidMark2, pin1Dot);

    // 4x corner gold castellated terminals + reflowed solder fillets
    const cPadGeo = new THREE.BoxGeometry(0.52, 0.44, 0.42);
    const cFilGeo = new THREE.BoxGeometry(0.64, 0.54, 0.14);
    for (const [px, py] of [
      [-1.12, -0.86],
      [1.12, -0.86],
      [-1.12, 0.86],
      [1.12, 0.86],
    ] as Array<[number, number]>) {
      const cpMesh = new THREE.Mesh(cPadGeo, mats.goldPlating);
      cpMesh.position.set(-0.85 + px, 0.42 + py, 0.24);
      cpMesh.userData.noEdges = true;
      const cfMesh = new THREE.Mesh(cFilGeo, mats.solderBallSilver);
      cfMesh.position.set(-0.85 + px * 1.06, 0.42 + py * 1.06, 0.1);
      cfMesh.userData.noEdges = true;
      sub.add(cpMesh, cfMesh);
    }

    // Spread-spectrum PLL loop filter (ferrite choke + 3x NP0/C0G capacitors + series damping R) with fillets
    addSmdPassiveWithFillets(
      sub,
      1.2,
      0.66,
      0.46,
      1.68,
      0.78,
      0.28,
      mats.ferriteInductor,
      mats.silverElectrode,
      mats.solderBallSilver
    );
    addSmdPassiveWithFillets(
      sub,
      0.72,
      0.38,
      0.28,
      1.68,
      -0.22,
      0.2,
      mats.icEpoxy,
      mats.silverElectrode,
      mats.solderBallSilver
    );
    for (let i = 0; i < 3; i++) {
      addSmdPassiveWithFillets(
        sub,
        0.78,
        0.42,
        0.32,
        -1.35 + i * 1.38,
        -1.32,
        0.21,
        mats.smdCeramic,
        mats.silverElectrode,
        mats.solderBallSilver
      );
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-tcon-mems-clock',
        64,
        '#8b5cf6',
        g,
        new THREE.Vector3(-7.2, EVF_OPTICAL_Y - 2.2, 7.22),
        new THREE.Vector3(-42, -16, 62),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E65. Eye-Control AF 850nm IR-LED Pulsed Driver IC & IEC-62471 Eye-Safety Watchdog
  //      Populated flush on E16 TCON PCB Side-B -Z upper-right quadrant!
  // =========================================================================
  {
    const g = new THREE.Group();
    const sub = new THREE.Group();
    sub.rotation.y = Math.PI;
    g.add(sub);

    const drvBoard = new THREE.Mesh(
      createChamferedBoxGeo(6.8, 5.2, 0.14, 0.3, 0.02, 'z'),
      mats.sensorPcb
    );
    sub.add(drvBoard);
    addRichHdiBackside(sub, 6.8, 5.2, mats, 3);

    // Routed 8-channel IR-LED output fan-out traces + Kelvin current-sense traces
    const irTraces: Array<[number, number, number, number]> = [
      [0.0, 0.6, 1.68, 1.05],
      [1.68, 1.05, 1.68, -0.7],
      [1.68, -0.7, -1.5, -1.6],
      [-1.35, -0.7, -1.5, -1.6],
    ];
    for (let i = 0; i < 8; i++) {
      const tx = -2.35 + i * 0.67;
      irTraces.push([tx, 2.15, Math.min(0.1, Math.max(-2.4, tx)), 1.55]);
    }
    addCopperTraceRuns(sub, irTraces, 0.09, 0.024, 0.082, mats.copperHeatSpreader);

    // 8-channel synchronized µs-pulsed constant-current IR-LED driver IC (QFN-20) + courtyard
    addSilkscreenCourtyard(sub, -1.35, 0.55, 3.0, 3.0, 0.084, 0.045, mats.invarScaleBar, 'tl');
    const driverIc = buildChipPackage({
      w: 2.65,
      d: 2.65,
      h: 0.54,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.evfIrEmitter,
      axis: 'z',
    });
    driverIc.position.set(-1.35, 0.55, 0.34);
    sub.add(driverIc);
    const drvMark = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.13, 0.02), mats.invarScaleBar);
    drvMark.position.set(-1.35, 0.55, 0.618);
    drvMark.userData.noEdges = true;
    sub.add(drvMark);

    // Independent IEC-62471 hardware retinal safety watchdog supervisor & cutoff FET
    addSilkscreenCourtyard(sub, 1.68, 1.05, 2.05, 1.65, 0.084, 0.04, mats.invarScaleBar, 'tr');
    const safetyIc = buildChipPackage({
      w: 1.75,
      d: 1.4,
      h: 0.46,
      style: 'sot23',
      pinsPerSide: 3,
      bodyMat: mats.icEpoxy,
      leadMat: mats.silverElectrode,
      axis: 'z',
    });
    safetyIc.position.set(1.68, 1.05, 0.3);
    sub.add(safetyIc);

    // Precision 0.1Ω thick-film Kelvin current-sense shunt resistor + fillets
    addSmdPassiveWithFillets(
      sub,
      1.55,
      0.8,
      0.4,
      1.68,
      -0.68,
      0.27,
      mats.matteBlackAnodized,
      mats.silverElectrode,
      mats.solderBallSilver,
      0,
      mats.goldPlating
    );

    // Pulse-energy reservoir tantalum capacitor + 3x 0201 timing/bypass passives with fillets
    const pulseCap = buildTantalumCap(
      1.85,
      1.05,
      0.56,
      mats.tantalumCapYellow,
      mats.evfIrEmitter,
      mats.silverElectrode,
      'z'
    );
    pulseCap.position.set(-1.5, -1.62, 0.35);
    sub.add(pulseCap);

    for (let i = 0; i < 3; i++) {
      addSmdPassiveWithFillets(
        sub,
        0.66,
        0.36,
        0.26,
        0.55 + i * 0.9,
        -1.78,
        0.2,
        i === 0 ? mats.smdCeramic : mats.icEpoxy,
        mats.silverElectrode,
        mats.solderBallSilver
      );
    }

    // 8x micro IR-LED channel output calibration vias (gold annular ring + crimson IR-channel core)
    const chanCoords: Array<[number, number]> = [];
    for (let i = 0; i < 8; i++) {
      chanCoords.push([-2.35 + i * 0.67, 2.15]);
    }
    addEnigViaArray(sub, chanCoords, 0.095, 0.055, 0.21, 0.11, mats.goldPlating, mats.evfIrEmitter);

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-ir-led-driver-safety',
        65,
        '#e11d48',
        g,
        new THREE.Vector3(7.2, EVF_OPTICAL_Y + 5.0, 7.22),
        new THREE.Vector3(42, 22, 62),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E66. Outer Eyepiece PFPE Fluorine Hydrophobic/Oleophobic & Anti-Static Nanocoating
  //      Flush 0.10mm off E03 (-32.71), inside E32 aperture! pos z=-32.88 -> local z in [-0.26, +0.10]
  // =========================================================================
  {
    const g = new THREE.Group();

    // Ultra-thin molecular PFPE fluorosilane optical coating membrane
    const coatGeo = extrudeHiRes(createRoundedRectShape(21.0, 16.0, 2.2), 0.075, 0.014, 0.014, 1, 22);
    applyPlanarUVs(coatGeo, 21.0, 16.0, 'xy');
    const coatFilm = new THREE.Mesh(coatGeo, mats.fluorineCoatCyan);
    g.add(coatFilm);

    // Stepped vapor-deposited perimeter optical seal halo bevel + high-contrast optical mask edge
    const bevelHalo = new THREE.Mesh(
      extrudeHiRes(createFrameShape(21.8, 16.8, 2.4, 20.68, 15.68, 2.0), 0.1, 0.016, 0.016, 1, 22),
      mats.evfGlassEdgeRim
    );
    const outerMaskEdge = new THREE.Mesh(
      extrudeHiRes(createFrameShape(21.75, 16.75, 2.38, 21.35, 16.35, 2.2), 0.04, 0.008, 0.008, 1, 22),
      mats.matteBlackAnodized
    );
    outerMaskEdge.position.z = -0.055;
    outerMaskEdge.userData.noEdges = true;
    g.add(bevelHalo, outerMaskEdge);

    // Anti-static SnO2 transparent-conductive perimeter grounding trace + 4 gold edge contact tabs
    const esdTrace = new THREE.Mesh(
      extrudeHiRes(createFrameShape(20.52, 15.52, 1.92, 20.16, 15.16, 1.78), 0.04, 0.008, 0.008, 1, 20),
      mats.copperHybridBond
    );
    esdTrace.position.z = -0.042;
    esdTrace.userData.noEdges = true;
    g.add(esdTrace);

    const tabGeo = createChamferedBoxGeo(1.4, 0.36, 0.05, 0.05, 0.01, 'z');
    for (const [tx, ty, rz] of [
      [0, 7.68, 0],
      [0, -7.68, 0],
      [-10.18, 0, Math.PI / 2],
      [10.18, 0, Math.PI / 2],
    ] as Array<[number, number, number]>) {
      const tb = new THREE.Mesh(tabGeo, mats.goldPlating);
      tb.position.set(tx, ty, -0.052);
      tb.rotation.z = rz;
      tb.userData.noEdges = true;
      g.add(tb);
    }

    // 4x vacuum-deposition corner optical alignment crosshairs + clear-aperture hairline border
    for (const [fx, fy] of [
      [-9.3, 6.8],
      [9.3, 6.8],
      [-9.3, -6.8],
      [9.3, -6.8],
    ] as Array<[number, number]>) {
      addOpticalFiducial(g, fx, fy, -0.054, 0.28, 0.022, mats.goldPlating);
    }

    const innerRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(18.9, 13.9, 1.5, 18.72, 13.72, 1.44), 0.028, 0.005, 0.005, 1, 18),
      mats.sinteredSilver
    );
    innerRim.position.z = -0.048;
    innerRim.userData.noEdges = true;
    g.add(innerRim);

    // High-contact-angle (>110°) hydrophobic micro-droplet clusters with base contact meniscus rings
    const dropGeo = hiResSphere(0.34, 16, 12);
    const meniscusGeo = hiResTorus(0.28, 0.032, 8, 18);
    const dropData: Array<[number, number, number, number]> = [
      [-7.9, 5.55, -0.17, 1.05],
      [-6.55, 6.08, -0.15, 0.78],
      [-7.25, 4.68, -0.13, 0.56],
      [7.8, -5.35, -0.17, 1.05],
      [6.45, -5.92, -0.15, 0.78],
      [7.15, -4.48, -0.13, 0.56],
    ];
    for (const [dx, dy, dz, sc] of dropData) {
      const drop = new THREE.Mesh(dropGeo, mats.opticalCementClear);
      drop.scale.set(sc, sc, sc * 0.62);
      drop.position.set(dx, dy, dz);
      drop.userData.noEdges = true;
      const men = new THREE.Mesh(meniscusGeo, mats.evfGlassEdgeRim);
      men.scale.set(sc, sc, 0.7);
      men.position.set(dx, dy, -0.056);
      men.userData.noEdges = true;
      g.add(drop, men);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-eyepiece-fluorine-coat',
        66,
        '#38bdf8',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -32.85),
        new THREE.Vector3(0, 22, -52),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // E67. Rear Eyepiece CNC Threaded Retaining Spanner Ring (M26×0.5) & Locking Lacquer
  //      World Z in [-17.81, -16.76] (pos z=-17.30 -> local z in [-0.51, +0.54])
  //      innerR=10.18 clears E08 glass, outerR<=11.72 clears E18!
  // =========================================================================
  {
    const g = new THREE.Group();

    // True CNC lathe-turned 5-turn external ISO M26×0.5 fine-pitch threaded anodized ring!
    const threadedRing = new THREE.Mesh(
      createThreadedRingLatheGeo(10.18, 11.54, 11.71, 0.76, 5, 52),
      mats.matteBlackAnodized
    );
    g.add(threadedRing);

    // Bright precision machined front/rear chamfer witness rings highlighting thread shoulder
    const innerChamfer = new THREE.Mesh(hiResTorus(10.22, 0.045, 8, 48), mats.titaniumRivet);
    innerChamfer.position.z = -0.37;
    innerChamfer.userData.noEdges = true;
    const outerChamfer = new THREE.Mesh(hiResTorus(11.46, 0.045, 8, 48), mats.titaniumRivet);
    outerChamfer.position.z = -0.37;
    outerChamfer.userData.noEdges = true;
    g.add(innerChamfer, outerChamfer);

    // Fine internal anti-glare black flocked bevel bore
    const flockLip = createPrecisionRing(10.18, 10.48, 0.66, mats.velvetFlockTrap, 0.015, 44);
    flockLip.position.z = 0.02;
    flockLip.userData.noEdges = true;
    g.add(flockLip);

    // 4x Thorlabs/Edmund CNC spanner-wrench drive notches (0°/90°/180°/270°) with recessed pockets & bright machined cheek lips
    const slotPocketGeo = createChamferedBoxGeo(0.76, 1.24, 0.32, 0.06, 0.015, 'z');
    const slotLipGeo = new THREE.BoxGeometry(0.11, 1.22, 0.16);
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const slotGrp = new THREE.Group();
      slotGrp.rotation.z = a;

      const pocket = new THREE.Mesh(slotPocketGeo, mats.velvetFlockTrap);
      pocket.position.set(0, 10.88, -0.26);
      slotGrp.add(pocket);

      for (const sx of [-0.41, 0.41]) {
        const lip = new THREE.Mesh(slotLipGeo, mats.stainlessMachined);
        lip.position.set(sx, 10.88, -0.34);
        lip.userData.noEdges = true;
        slotGrp.add(lip);
      }
      g.add(slotGrp);
    }

    // 12x engraved white/silver radial focal-torque index ticks around front anodized face
    const tickGeo = new THREE.BoxGeometry(0.12, 0.48, 0.03);
    for (let i = 0; i < 12; i++) {
      if (i % 3 === 0) continue; // skip spanner slot angles
      const a = (i * Math.PI) / 6;
      const tk = new THREE.Mesh(tickGeo, mats.invarScaleBar);
      tk.position.set(Math.cos(a) * 10.88, Math.sin(a) * 10.88, -0.39);
      tk.rotation.z = a + Math.PI / 2;
      tk.userData.noEdges = true;
      g.add(tk);
    }

    // True 3D sinusoidal 6-crest Smalley stainless axial wave-spring washer seated cleanly on +Z lens side (z=+0.45)!
    const waveSpring = new THREE.Mesh(
      createTrueWaveSpringGeo(10.72, 0.86, 0.065, 0.048, 6, 60),
      mats.stainlessMachined
    );
    waveSpring.position.z = 0.445;
    waveSpring.userData.noEdges = true;
    g.add(waveSpring);

    // 4x vivid crimson factory tamper-evident anti-loosening locking-lacquer beads bridging outer thread at 45° diagonals
    const lacquerGeo = hiResSphere(0.3, 14, 10);
    const tailGeo = createChamferedBoxGeo(0.24, 0.62, 0.14, 0.05, 0.015, 'z');
    for (let i = 0; i < 4; i++) {
      const a = Math.PI / 4 + (i * Math.PI) / 2;
      const bead = new THREE.Mesh(lacquerGeo, mats.mountRedIndexDot);
      bead.scale.set(1.1, 0.72, 0.5);
      bead.position.set(Math.cos(a) * 11.3, Math.sin(a) * 11.3, -0.37);
      bead.rotation.z = a;
      bead.userData.noEdges = true;

      const tail = new THREE.Mesh(tailGeo, mats.mountRedIndexDot);
      tail.position.set(Math.cos(a) * 11.02, Math.sin(a) * 11.02, -0.38);
      tail.rotation.z = a + Math.PI / 2;
      tail.userData.noEdges = true;
      g.add(bead, tail);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-lens-retaining-spanner',
        67,
        '#64748b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -17.3),
        new THREE.Vector3(-36, -24, -10),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E68. Movable ED Doublet Index-Matched UV Optical Cement Layer (n_d = 1.56)
  //      EXACT curvature-matched inside E09's 0.16mm G3/G2 doublet seam!
  //      z(u) = -0.245 + 1.40*(1 - u^2), thickness <= 0.06mm -> uniform 0.05mm clearance!
  // =========================================================================
  {
    const g = new THREE.Group();

    const lensR = 9.0;
    const maxR = 8.85;
    const steps = 18;
    const thick = 0.034;
    const zCurve = (r: number): number => {
      const u = r / lensR;
      return -0.245 + 1.4 * (1 - u * u);
    };

    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= steps; i++) {
      const r = (i / steps) * maxR;
      const zc = zCurve(r);
      pts.push(new THREE.Vector2(Math.max(0.01, r), zc - thick * 0.5));
    }
    for (let i = steps; i >= 0; i--) {
      const r = (i / steps) * maxR;
      const zc = zCurve(r);
      pts.push(new THREE.Vector2(Math.max(0.01, r), zc + thick * 0.5));
    }
    const cementGeo = markHiRes(new THREE.LatheGeometry(pts, 48));
    cementGeo.rotateX(Math.PI / 2);
    cementGeo.computeVertexNormals();
    const cementShell = new THREE.Mesh(cementGeo, mats.opticalCementClear);
    g.add(cementShell);

    // Concentric optical Newton-ring / index-matching calibration fringes riding exact zCurve(r)
    for (const [frR, mat] of [
      [3.1, mats.fluorineCoatCyan],
      [5.75, mats.evfGlassEdgeRim],
      [7.85, mats.fluorineCoatCyan],
    ] as Array<[number, THREE.Material]>) {
      const fringe = new THREE.Mesh(hiResTorus(frR, 0.014, 8, 48), mat);
      fringe.position.z = zCurve(frR);
      fringe.userData.noEdges = true;
      g.add(fringe);
    }

    // Perimeter void-free optical meniscus edge fillet collar (R=8.87 < 9.00 glass rim!)
    const rimZ = zCurve(maxR);
    const fillet = new THREE.Mesh(hiResTorus(maxR + 0.01, 0.014, 10, 48), mats.evfGlassEdgeRim);
    fillet.position.z = rimZ;
    fillet.userData.noEdges = true;
    const innerEdge = new THREE.Mesh(hiResTorus(8.46, 0.014, 8, 48), mats.fluorineCoatCyan);
    innerEdge.position.z = zCurve(8.46);
    innerEdge.userData.noEdges = true;
    g.add(fillet, innerEdge);

    // 12x radial perimeter UV-cure polymerization witness dots + 4 optical centering datum ticks along R=8.42
    const witnessGeo = hiResSphere(0.016, 8, 8);
    const tickGeo = new THREE.BoxGeometry(0.08, 0.36, 0.014);
    const rWitness = 8.42;
    const zWitness = zCurve(rWitness);
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      const wDot = new THREE.Mesh(witnessGeo, i % 3 === 0 ? mats.goldPlating : mats.fluorineCoatCyan);
      wDot.scale.set(3.2, 3.2, 0.85);
      wDot.position.set(Math.cos(a) * rWitness, Math.sin(a) * rWitness, zWitness);
      wDot.userData.noEdges = true;
      g.add(wDot);

      if (i % 3 === 0) {
        const dt = new THREE.Mesh(tickGeo, mats.goldPlating);
        dt.position.set(Math.cos(a) * 8.64, Math.sin(a) * 8.64, zCurve(8.64));
        dt.rotation.z = a + Math.PI / 2;
        dt.userData.noEdges = true;
        g.add(dt);
      }
    }

    // Central optical vertex interferometry crosshair seated right at apex zCurve(0)
    const apexZ = zCurve(0);
    const apexArmGeo = new THREE.BoxGeometry(0.95, 0.04, 0.024);
    for (const rz of [0, Math.PI / 2]) {
      const arm = new THREE.Mesh(apexArmGeo, mats.evfGlassEdgeRim);
      arm.position.set(0, 0, apexZ);
      arm.rotation.z = rz;
      arm.userData.noEdges = true;
      g.add(arm);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-doublet-uv-cement',
        68,
        '#22d3ee',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -9.4),
        new THREE.Vector3(0, -32, 12),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // E69. Eyepiece 6-DOF Active-Alignment UV-Cure Bonding Pockets & Elastomer Seats
  //      World Z in [-3.14, -1.56] (pos z=-2.42 -> local z in [-0.72, +0.86])
  //      innerR=10.58 > E13 10.50, outerR<=11.44 < E18!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Multi-stepped blackened CNC active-alignment collar with machined front/rear witness chamfers
    const collar = createPrecisionRing(10.58, 11.42, 1.48, mats.matteBlackAnodized, 0.04, 48);
    g.add(collar);

    const rimBevelGeo = hiResTorus(10.64, 0.038, 8, 48);
    for (const sz of [-0.72, 0.72]) {
      const rb = new THREE.Mesh(rimBevelGeo, mats.titaniumRivet);
      rb.position.z = sz;
      rb.userData.noEdges = true;
      g.add(rb);
    }

    // Shared geometries for the 3 UV-cure bonding stations + 3 alternating ribbed butyl elastomer seats
    const pocketFrameGeo = createChamferedBoxGeo(2.35, 0.66, 1.38, 0.12, 0.03, 'z');
    const pocketResinGeo = createChamferedBoxGeo(1.85, 0.54, 1.18, 0.1, 0.025, 'z');
    const cureBeadGeo = hiResSphere(0.38, 14, 10);
    const nozzlePortGeo = hiResCyl(0.16, 0.16, 0.44, 12).rotateX(Math.PI / 2);
    const fidPinGeo = hiResCyl(0.14, 0.14, 1.56, 12).rotateX(Math.PI / 2);
    const padBaseGeo = createChamferedBoxGeo(1.85, 0.56, 1.18, 0.09, 0.025, 'z');
    const padRibGeo = new THREE.BoxGeometry(0.18, 0.12, 1.06);

    for (let i = 0; i < 3; i++) {
      const angle = (i * 2 * Math.PI) / 3 + Math.PI / 6;

      // Station group rotated around optical Z axis
      const uvGrp = new THREE.Group();
      uvGrp.rotation.z = angle;

      // Machined stainless UV-window bezel pocket framing cured cobalt-blue low-shrinkage epoxy
      const pFrame = new THREE.Mesh(pocketFrameGeo, mats.stainlessMachined);
      pFrame.position.set(11.12, 0, 0);
      pFrame.rotation.z = Math.PI / 2;
      uvGrp.add(pFrame);

      const resin = new THREE.Mesh(pocketResinGeo, mats.mountThreadLockBlue);
      resin.position.set(11.18, 0, 0);
      resin.rotation.z = Math.PI / 2;
      uvGrp.add(resin);

      // Twin cured translucent optical UV-epoxy dome menisci + top/bottom dispensing port bosses
      for (const sz of [-0.3, 0.3]) {
        const bead = new THREE.Mesh(cureBeadGeo, mats.opticalCementClear);
        bead.scale.set(0.55, 1.08, 0.85);
        bead.position.set(11.24, 0, sz);
        bead.userData.noEdges = true;
        uvGrp.add(bead);
      }
      for (const sy of [-0.62, 0.62]) {
        const port = new THREE.Mesh(nozzlePortGeo, mats.brassGear);
        port.position.set(11.1, sy, -0.58);
        port.userData.noEdges = true;
        uvGrp.add(port);
      }

      // Twin 6-DOF active-alignment laser target gold datum pins flanking each UV station
      for (const da of [-0.17, 0.17]) {
        const fp = new THREE.Mesh(fidPinGeo, mats.goldPlating);
        fp.position.set(Math.cos(da) * 11.0, Math.sin(da) * 11.0, 0);
        fp.userData.noEdges = true;
        uvGrp.add(fp);
      }
      g.add(uvGrp);

      // Alternating (+60°) ribbed butyl stress-relief elastomer damper seat
      const seatGrp = new THREE.Group();
      seatGrp.rotation.z = angle + Math.PI / 3;
      const pad = new THREE.Mesh(padBaseGeo, mats.butylDamperRubber);
      pad.position.set(11.08, 0, 0);
      pad.rotation.z = Math.PI / 2;
      seatGrp.add(pad);

      // 5x molded elastomer compression ribs along each damper pad
      for (let r = -2; r <= 2; r++) {
        const rib = new THREE.Mesh(padRibGeo, mats.epdmGasket);
        rib.position.set(11.34, r * 0.34, 0);
        rib.rotation.z = Math.PI / 2;
        rib.userData.noEdges = true;
        seatGrp.add(rib);
      }
      g.add(seatGrp);
    }

    // 12x radial optical alignment degree tick marks around -Z collar face
    const degTickGeo = new THREE.BoxGeometry(0.45, 0.09, 0.025);
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      const tk = new THREE.Mesh(degTickGeo, mats.invarScaleBar);
      tk.position.set(Math.cos(a) * 11.0, Math.sin(a) * 11.0, -0.755);
      tk.rotation.z = a;
      tk.userData.noEdges = true;
      g.add(tk);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-lens-active-uv-pockets',
        69,
        '#6366f1',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -2.42),
        new THREE.Vector3(36, 16, 26),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E70. EVF Inner Barrel Stepped Knife-Edge Stray-Light Baffles & Carbon Flocking
  //      World Z in [-19.40, -17.96] (pos z=-18.68 -> local z in [-0.72, +0.72])
  //      innerR=9.95, outerR<=11.82 (horizontal keyways <=12.10 clear of floor!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // 7-fin lathe-turned 35° sawtooth grazing-angle knife-edge light-trap baffle sleeve
    const outerR = 11.66;
    const innerR = 9.95;
    const depth = 1.42;
    const halfD = depth * 0.5;
    const finCount = 7;
    const pts: THREE.Vector2[] = [
      new THREE.Vector2(outerR - 0.1, -halfD),
      new THREE.Vector2(outerR, -halfD + 0.08),
      new THREE.Vector2(outerR, halfD - 0.08),
      new THREE.Vector2(outerR - 0.1, halfD),
      new THREE.Vector2(innerR + 0.22, halfD),
    ];
    const step = (depth - 0.2) / finCount;
    for (let i = 0; i < finCount; i++) {
      const yTop = halfD - 0.1 - i * step;
      const yMid = yTop - step * 0.34;
      const yBot = yTop - step;
      pts.push(new THREE.Vector2(innerR, yTop));
      pts.push(new THREE.Vector2(innerR + 0.68, yMid));
      pts.push(new THREE.Vector2(innerR + 0.07, yBot));
    }
    pts.push(new THREE.Vector2(innerR + 0.22, -halfD));
    pts.push(new THREE.Vector2(outerR - 0.1, -halfD));

    const baffleGeo = markHiRes(new THREE.LatheGeometry(pts, 56));
    baffleGeo.rotateX(Math.PI / 2);
    baffleGeo.computeVertexNormals();
    const baffleSleeve = new THREE.Mesh(baffleGeo, mats.velvetFlockTrap);
    g.add(baffleSleeve);

    // Contrasting micro-chamfered knife-edge baffle crest rings so concentric light-trap steps read crisply!
    const crestGeo = hiResTorus(innerR + 0.03, 0.022, 6, 56);
    for (let i = 0; i < finCount; i++) {
      const zc = -halfD + 0.1 + i * step;
      const crest = new THREE.Mesh(crestGeo, mats.matteBlackAnodized);
      crest.position.z = zc;
      crest.userData.noEdges = true;
      g.add(crest);
    }

    // Front (-Z) & rear (+Z) stepped CNC anodized locating collars with bright machined bevel rims
    const frontLocRing = createPrecisionRing(11.35, 11.62, 0.28, mats.matteBlackAnodized, 0.02, 48);
    frontLocRing.position.z = -0.42;
    const rearLocRing = createPrecisionRing(11.35, 11.78, 0.32, mats.matteBlackAnodized, 0.02, 48);
    rearLocRing.position.z = 0.52;
    g.add(frontLocRing, rearLocRing);
    const frontChamfer = new THREE.Mesh(hiResTorus(11.42, 0.04, 8, 48), mats.titaniumRivet);
    frontChamfer.position.z = -0.69;
    frontChamfer.userData.noEdges = true;
    const innerFrontLip = new THREE.Mesh(hiResTorus(10.22, 0.038, 8, 48), mats.titaniumRivet);
    innerFrontLip.position.z = -0.7;
    innerFrontLip.userData.noEdges = true;
    g.add(frontChamfer, innerFrontLip);

    // 2x horizontal anti-rotation axial keyway lugs + press-fit brass index dowel pins (clear of floor!)
    const keyGeo = createChamferedBoxGeo(0.48, 1.05, 0.54, 0.05, 0.02, 'z');
    const pinGeo = hiResCyl(0.18, 0.18, 0.66, 14).rotateX(Math.PI / 2);
    for (const sx of [-1, 1]) {
      const key = new THREE.Mesh(keyGeo, mats.matteBlackAnodized);
      key.position.set(sx * 11.86, 0, 0.34);
      const pin = new THREE.Mesh(pinGeo, mats.brassGear);
      pin.position.set(sx * 11.88, 0, 0.34);
      pin.userData.noEdges = true;
      g.add(key, pin);
    }

    // 3x anodized alignment notch collars & 8x optical axis calibration ticks on -Z face
    const notchGeo = createChamferedBoxGeo(0.45, 0.32, 0.14, 0.04, 0.015, 'z');
    for (const ang of [Math.PI / 2, (7 * Math.PI) / 6, (11 * Math.PI) / 6]) {
      const n = new THREE.Mesh(notchGeo, mats.brassGear);
      n.position.set(Math.cos(ang) * 11.15, Math.sin(ang) * 11.15, -0.68);
      n.rotation.z = ang;
      g.add(n);
    }
    const tickGeo = new THREE.BoxGeometry(0.48, 0.09, 0.022);
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      const tk = new THREE.Mesh(tickGeo, mats.invarScaleBar);
      tk.position.set(Math.cos(a) * 10.82, Math.sin(a) * 10.82, -0.718);
      tk.rotation.z = a;
      tk.userData.noEdges = true;
      g.add(tk);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-barrel-internal-baffles',
        70,
        '#1e293b',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -18.68),
        new THREE.Vector3(38, 24, -18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E71. Diopter Helicoid 3×120° Glass-Filled POM Cam-Follower Rollers & Guide Pins
  //      Matches E11 arcSpans & camAngles=[1.66, 4.36, -0.84], clears E09 driveArm & E18 floor!
  // =========================================================================
  {
    const g = new THREE.Group();

    // Stepped slotted carrier hoop matching mirrored E11 exact arcSpans + bright anodized reinforcing ribs
    const arcSpans: Array<[number, number]> = [
      [-0.06, 2.38],
      [3.54, 5.42],
    ];
    for (const [aStart, aEnd] of arcSpans) {
      const segShape = new THREE.Shape();
      segShape.absarc(0, 0, 11.94, aStart, aEnd, false);
      segShape.absarc(0, 0, 11.74, aEnd, aStart, true);
      segShape.closePath();
      const seg = new THREE.Mesh(
        extrudeHiRes(segShape, 0.62, 0.022, 0.022, 2, 32),
        mats.matteBlackAnodized
      );
      g.add(seg);

      // Outer low-friction brass trim & guide reinforcement band along carrier perimeter (clears E11 inner rails!)
      const wearShape = new THREE.Shape();
      wearShape.absarc(0, 0, 11.98, aStart + 0.08, aEnd - 0.08, false);
      wearShape.absarc(0, 0, 11.91, aEnd - 0.08, aStart + 0.08, true);
      wearShape.closePath();
      const wear = new THREE.Mesh(
        extrudeHiRes(wearShape, 0.36, 0.012, 0.012, 1, 28),
        mats.brassGear
      );
      wear.userData.noEdges = true;
      g.add(wear);
    }

    // Lathe-turned tapered conical glass-filled POM cam-follower roller (stepped flange + chamfered cone!)
    const rollerPts: THREE.Vector2[] = [
      new THREE.Vector2(0.19, -0.18),
      new THREE.Vector2(0.39, -0.18),
      new THREE.Vector2(0.42, -0.1),
      new THREE.Vector2(0.38, 0.12),
      new THREE.Vector2(0.31, 0.18),
      new THREE.Vector2(0.19, 0.18),
    ];
    const rollerGeo = markHiRes(new THREE.LatheGeometry(rollerPts, 24)).rotateZ(-Math.PI / 2);
    rollerGeo.computeVertexNormals();

    const pinGeo = hiResCyl(0.19, 0.19, 0.66, 18).rotateZ(-Math.PI / 2);
    const hexHeadGeo = hiResCyl(0.28, 0.28, 0.14, 6).rotateZ(-Math.PI / 2);
    const bushGeo = createPrecisionRingGeo(0.21, 0.44, 0.12, 0.015, 20).rotateY(Math.PI / 2);
    const bossGeo = createChamferedBoxGeo(0.24, 1.38, 0.86, 0.12, 0.02, 'z');
    const biasLeafGeo = createChamferedBoxGeo(0.08, 1.85, 0.42, 0.03, 0.01, 'z');
    const eClipGeo = createDin6799EClipGeo(0.17, 0.34, 0.07).rotateY(Math.PI / 2);
    const rivetGeo = hiResCyl(0.12, 0.12, 0.28, 12).rotateZ(Math.PI / 2);

    const camAngles = [1.48, 3.98, 5.06];
    for (const angle of camAngles) {
      const rad = new THREE.Group();
      rad.rotation.z = angle;

      // Machined thickened carrier boss pad supporting the eccentric follower pin
      const boss = new THREE.Mesh(bossGeo, mats.titaniumRivet);
      boss.position.set(11.86, 0, 0);
      rad.add(boss);

      // Tapered conical POM cam-follower roller riding cleanly inside E11 helical cam track (R=11.33..11.67)
      const roller = new THREE.Mesh(rollerGeo, mats.pomGear);
      roller.position.x = 11.49;

      // Hardened stainless eccentric follower axle pin + outer hex calibration adjustment head
      const axle = new THREE.Mesh(pinGeo, mats.stainlessMachined);
      axle.position.x = 11.68;
      const hexHead = new THREE.Mesh(hexHeadGeo, mats.titaniumRivet);
      hexHead.position.x = 12.06;

      // Phosphor-bronze thrust shoulder bushing isolating POM roller from carrier arc
      const bush = new THREE.Mesh(bushGeo, mats.brassGear);
      bush.position.x = 11.71;
      bush.userData.noEdges = true;

      // Cantilevered CuBe2 anti-play preload bias leaf spring (per US5210644A) anchored by micro-rivet
      const leaf = new THREE.Mesh(biasLeafGeo, mats.beCuSpring);
      leaf.position.set(12.01, 0.56, 0);
      leaf.rotation.z = -0.06;
      const rivet = new THREE.Mesh(rivetGeo, mats.brassGear);
      rivet.position.set(11.96, 1.32, 0);
      rivet.userData.noEdges = true;

      // True DIN 6799 3-prong horseshoe E-clip snapped onto eccentric pin groove
      const eClip = new THREE.Mesh(eClipGeo, mats.mountSpringSteel);
      eClip.position.x = 11.98;
      eClip.userData.noEdges = true;

      rad.add(roller, axle, hexHead, bush, leaf, rivet, eClip);
      g.add(rad);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-diopter-cam-followers',
        71,
        '#f8fafc',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -9.4),
        new THREE.Vector3(-44, 6, 18),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E72. Diopter Travel End-Stop Pins (-4.0 / +3.0 m⁻¹) & -1.0 dpt Standard Index
  //      Mounted horizontally directly at 12-o'clock above the -X Sony diopter wheel (Z=-15.60)!
  //      World X in [-17.4, -15.1], Y in [43.5, 45.6], Z in [-18.2, -13.0]
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision CNC-machined stainless horizontal arc-limit plate seated flush on -X E18 wall right above diopter blister!
    const plateShape = createRoundedRectShape(5.2, 2.0, 0.62);
    addCircleHoles(plateShape, [
      [-1.85, 0, 0.42],
      [1.85, 0, 0.42],
    ]);
    const stopPlate = new THREE.Mesh(
      extrudeHiRes(plateShape, 0.62, 0.045, 0.045, 2, 18).rotateY(Math.PI / 2),
      mats.stainlessMachined
    );
    g.add(stopPlate);

    // Recessed milled travel-slot pocket on outward -X face
    const slotRecess = new THREE.Mesh(
      createChamferedBoxGeo(2.7, 1.32, 0.14, 0.25, 0.02, 'z').rotateY(Math.PI / 2),
      mats.titaniumRivet
    );
    slotRecess.position.set(-0.28, 0, 0);
    g.add(slotRecess);

    // 2x properly oriented countersunk M1.4 Phillips mounting screws seated inside z=±1.85 holes (heads face OUTWARD -X!)
    for (const sz of [-1.85, 1.85]) {
      const collar = new THREE.Mesh(
        createPrecisionRingGeo(0.42, 0.68, 0.14, 0.02, 18).rotateY(Math.PI / 2),
        mats.brassGear
      );
      collar.position.set(-0.32, 0, sz);
      g.add(collar);
      addFlushPhillipsCapHead(
        g,
        [-0.24, 0, sz],
        '-x',
        0.48,
        0.22,
        mats.titaniumRivet,
        mats.velvetFlockTrap,
        mats.stainlessMachined
      );
    }

    // Two hardened titanium cylindrical hard end-stop dowel pins (-4.0 & +3.0 m⁻¹ limits) projecting inward (+X)
    const pinGeo = hiResCyl(0.36, 0.36, 1.16, 18).rotateZ(Math.PI / 2);
    const sleeveGeo = createPrecisionRingGeo(0.36, 0.56, 0.32, 0.02, 18).rotateY(Math.PI / 2);
    const bumperGeo = hiResCyl(0.52, 0.52, 0.44, 18).rotateZ(Math.PI / 2);
    const ribRingGeo = hiResTorus(0.52, 0.045, 8, 18).rotateY(Math.PI / 2);
    for (const sz of [-1.25, 1.25]) {
      const pin = new THREE.Mesh(pinGeo, mats.titaniumRivet);
      pin.position.set(0.45, 0, sz);
      const sleeve = new THREE.Mesh(sleeveGeo, mats.brassGear);
      sleeve.position.set(0.32, 0, sz);
      const bumper = new THREE.Mesh(bumperGeo, mats.butylDamperRubber);
      bumper.position.set(0.74, 0, sz);
      bumper.userData.noEdges = true;
      for (const rx of [0.88, 0.62]) {
        const rr = new THREE.Mesh(ribRingGeo, mats.epdmGasket);
        rr.position.set(rx, 0, sz);
        rr.userData.noEdges = true;
        g.add(rr);
      }
      g.add(pin, sleeve, bumper);
    }

    // Tactile -1.0 m⁻¹ standard eyesight reference index block directly at 12-o'clock above diopter wheel (Z=-15.60)!
    const indexBlock = new THREE.Mesh(
      createChamferedBoxGeo(0.86, 1.56, 2.2, 0.14, 0.03, 'z'),
      mats.matteBlackAnodized
    );
    indexBlock.position.set(-0.55, 0, 0);
    g.add(indexBlock);

    // 7x engraved white/silver diopter scale calibration ticks along outward -X face
    const scaleTickGeo = new THREE.BoxGeometry(0.14, 0.62, 0.08);
    for (let i = -3; i <= 3; i++) {
      const tk = new THREE.Mesh(scaleTickGeo, i === 0 ? mats.goldPlating : mats.invarScaleBar);
      tk.scale.y = i === 0 ? 1.45 : i % 2 === 0 ? 1.05 : 0.72;
      tk.position.set(-0.96, 0.18, i * 0.28);
      tk.userData.noEdges = true;
      g.add(tk);
    }

    // Tactile crimson 0/-1D reference index dome seated in machined brass bezel collar pointing down at diopter wheel!
    const dotBezel = new THREE.Mesh(
      createPrecisionRingGeo(0.22, 0.34, 0.14, 0.018, 16).rotateY(Math.PI / 2),
      mats.brassGear
    );
    dotBezel.position.set(-0.95, -0.52, 0);
    const redDot = new THREE.Mesh(hiResSphere(0.23, 14, 12), mats.mountRedIndexDot);
    redDot.position.set(-1.01, -0.52, 0);
    redDot.userData.noEdges = true;
    g.add(dotBezel, redDot);

    for (const ch of g.children) ch.position.x -= 0.06;
    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-diopter-endstop-index',
        72,
        '#ef4444',
        g,
        new THREE.Vector3(-16.15, EVF_OPTICAL_Y + 5.85, -15.6),
        new THREE.Vector3(-48, 22, -6),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E73. Eyepiece Shutter Magnetic Hall Position Sensor & Torsion Return Spring
  //      Mounted cleanly below mirrored E19 lever on +X (left) flank (Z in [-30.9, -29.3]!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Contoured CNC anodized vertical pivot carrier bracket with recessed spring bay
    const brkShape = createRoundedRectShape(2.72, 6.65, 0.65);
    addCircleHoles(brkShape, [[0, 1.75, 0.56]]);
    const bracket = new THREE.Mesh(
      extrudeHiRes(brkShape, 0.66, 0.04, 0.04, 2, 16),
      mats.matteBlackAnodized
    );
    g.add(bracket);

    // Machined front perimeter chamfer border + 2x countersunk M1.2 mounting screw heads (facing -Z)
    const rimPlate = new THREE.Mesh(
      extrudeHiRes(createFrameShape(2.58, 6.45, 0.56, 2.08, 5.9, 0.36), 0.1, 0.015, 0.015, 1, 14),
      mats.titaniumRivet
    );
    rimPlate.position.z = -0.34;
    g.add(rimPlate);

    for (const [sx, sy] of [
      [0.78, 2.68],
      [0.78, -2.68],
    ] as Array<[number, number]>) {
      addFlushPhillipsCapHead(
        g,
        [sx, sy, -0.34],
        '-z',
        0.34,
        0.16,
        mats.stainlessMachined,
        mats.velvetFlockTrap
      );
    }

    // Brass pivot axle stud + flanged bronze journal bushing + true DIN 6799 3-prong E-clip!
    const pivotStud = new THREE.Mesh(
      hiResCyl(0.46, 0.46, 1.24, 20).rotateX(Math.PI / 2),
      mats.brassGear
    );
    pivotStud.position.set(0, 1.75, -0.18);
    const bushing = new THREE.Mesh(
      createPrecisionRingGeo(0.47, 0.72, 0.24, 0.02, 20),
      mats.copperHeatSpreader
    );
    bushing.position.set(0, 1.75, -0.38);
    const eClip = new THREE.Mesh(createDin6799EClipGeo(0.42, 0.74, 0.09), mats.mountSpringSteel);
    eClip.position.set(0, 1.75, -0.74);
    eClip.userData.noEdges = true;
    g.add(pivotStud, bushing, eClip);

    // Multi-coil stainless torsion return spring + anchored spring-leg stop pin (legs tucked strictly inside bracket!)
    const torsionSpring = new THREE.Mesh(
      markHiRes(createTorsionSpringGeometry(0.68, 0.92, 3.0, 0.1, 1.02)),
      mats.stainlessMachined
    );
    torsionSpring.position.set(0, 1.75, -0.44);
    torsionSpring.rotation.z = -0.68;
    torsionSpring.userData.noEdges = true;
    const stopPost = new THREE.Mesh(
      hiResCyl(0.18, 0.18, 0.56, 12).rotateX(Math.PI / 2),
      mats.brassGear
    );
    stopPost.position.set(0.82, 1.15, -0.45);
    g.add(torsionSpring, stopPost);

    // Swinging stamped stainless link arm with machined weight-relief slot, micro-rivets & N/S magnet pocket
    const linkArm = new THREE.Mesh(
      createChamferedBoxGeo(0.88, 3.15, 0.24, 0.2, 0.03, 'z'),
      mats.stainlessMachined
    );
    linkArm.position.set(-0.25, 0.2, -0.58);
    linkArm.rotation.z = -0.15;
    const armSlot = new THREE.Mesh(
      createChamferedBoxGeo(0.32, 1.45, 0.28, 0.12, 0.015, 'z'),
      mats.velvetFlockTrap
    );
    armSlot.position.set(-0.25, 0.25, -0.58);
    armSlot.rotation.z = -0.15;
    armSlot.userData.noEdges = true;

    // Gold-plated magnet retention cradle holding N/S polarized neodymium trigger micro-magnet
    const magPocket = new THREE.Mesh(
      extrudeHiRes(createFrameShape(1.24, 1.06, 0.14, 0.96, 0.78, 0.08), 0.34, 0.02, 0.02, 1, 10),
      mats.goldPlating
    );
    magPocket.position.set(-0.48, -1.25, -0.6);
    const magnet = new THREE.Mesh(
      createChamferedBoxGeo(0.98, 0.82, 0.36, 0.08, 0.025, 'z'),
      mats.neodymiumMagnet
    );
    magnet.position.set(-0.48, -1.25, -0.62);
    // Crimson N-pole orientation stripe on magnet face
    const nPoleStripe = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.24, 0.03), mats.mountRedIndexDot);
    nPoleStripe.position.set(-0.48, -1.0, -0.81);
    nPoleStripe.userData.noEdges = true;
    g.add(linkArm, armSlot, magPocket, magnet, nPoleStripe);

    // Rear (+Z) amber polyimide flex circuit with 3 copper traces, SOT-23 Hall IC, 0201 passives & gold ZIF fingers
    const flexTail = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 3.45, 0.14, 0.25, 0.02, 'z'),
      mats.polyimideFpc
    );
    flexTail.position.set(0.15, -2.15, 0.44);
    g.add(flexTail);

    addCopperTraceRuns(
      g,
      [
        [-0.35, -1.45, -0.35, -3.55],
        [0.05, -1.45, 0.05, -3.55],
        [0.45, -1.45, 0.45, -3.55],
      ],
      0.1,
      0.024,
      0.52,
      mats.copperHeatSpreader
    );

    const hallIc = buildChipPackage({
      w: 1.25,
      d: 1.0,
      h: 0.34,
      style: 'sot23',
      pinsPerSide: 3,
      bodyMat: mats.icEpoxy,
      leadMat: mats.silverElectrode,
      axis: 'z',
    });
    hallIc.position.set(-0.05, -1.35, 0.63);
    g.add(hallIc);

    addSmdPassiveWithFillets(
      g,
      0.62,
      0.34,
      0.24,
      0.15,
      -2.42,
      0.59,
      mats.smdCeramic,
      mats.silverElectrode,
      mats.solderBallSilver
    );

    const zifFingerGeo = new THREE.BoxGeometry(0.24, 0.65, 0.036);
    for (let i = 0; i < 4; i++) {
      const f = new THREE.Mesh(zifFingerGeo, mats.goldPlating);
      f.position.set(-0.48 + i * 0.42, -3.48, 0.525);
      f.userData.noEdges = true;
      g.add(f);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-shutter-hall-actuator',
        73,
        '#f97316',
        g,
        new THREE.Vector3(14.7, EVF_OPTICAL_Y - 3.3, -30.15),
        new THREE.Vector3(44, 14, -40),
        cp,
        0.26
      )
    );
  }

  // =========================================================================
  // E74. Eye-Control AF 850nm IR-LED Micro-Collimator Dome Ring & Glare Louver Hood
  //      World Z in [-29.58, -29.01] (pos z=-29.22 -> local z in [-0.36, +0.21])
  // =========================================================================
  {
    const g = new THREE.Group();

    // Multi-stepped molded matte-black IR-blocking optical collimator frame
    const ringShape = createFrameShape(24.6, 19.6, 6.4, 19.2, 14.6, 4.6);
    const frameMesh = new THREE.Mesh(
      extrudeHiRes(ringShape, 0.34, 0.03, 0.03, 2, 26),
      mats.matteBlackAnodized
    );
    g.add(frameMesh);

    // Stepped inner anti-glare knife-edge aperture bezel catching subtle oblique rim light
    const innerStep = new THREE.Mesh(
      extrudeHiRes(createFrameShape(20.1, 15.5, 4.9, 19.25, 14.65, 4.6), 0.14, 0.015, 0.015, 1, 24),
      mats.velvetFlockTrap
    );
    innerStep.position.z = -0.14;
    g.add(innerStep);

    // Outer metallic precision optical alignment witness rim
    const outerRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(24.3, 19.3, 6.2, 23.85, 18.85, 6.0), 0.06, 0.01, 0.01, 1, 24),
      mats.titaniumRivet
    );
    outerRim.position.z = -0.175;
    outerRim.userData.noEdges = true;
    g.add(outerRim);

    // 8x micro-collimating optical cups coaxial with E05's exact 8 IR LED coordinates!
    const hoodGeo = hiResCyl(0.92, 1.14, 0.36, 20).rotateX(Math.PI / 2);
    const reflectorRingGeo = createPrecisionRingGeo(0.7, 0.96, 0.14, 0.015, 20);
    const domeGeo = hiResSphere(0.68, 16, 12);
    const crownGeo = hiResSphere(0.46, 14, 10);
    const louverGeo = createChamferedBoxGeo(1.85, 0.16, 0.32, 0.035, 0.015, 'z');

    const coaxialLeds: Array<[number, number]> = [
      [-9.6, 5.8],
      [-3.8, 8.4],
      [3.8, 8.4],
      [9.6, 5.8],
      [9.6, -5.8],
      [3.8, -8.4],
      [-3.8, -8.4],
      [-9.6, -5.8],
    ];

    for (const [cx, cy] of coaxialLeds) {
      const a = Math.atan2(cy, cx);

      const hood = new THREE.Mesh(hoodGeo, mats.velvetFlockTrap);
      hood.position.set(cx, cy, -0.13);

      // Gleaming internal brass parabolic collimator reflector cup rim!
      const reflector = new THREE.Mesh(reflectorRingGeo, mats.brassGear);
      reflector.position.set(cx, cy, -0.24);
      reflector.userData.noEdges = true;

      const dome = new THREE.Mesh(domeGeo, mats.evfIrWindowBlack);
      dome.scale.set(1.0, 1.0, 0.26);
      dome.position.set(cx, cy, -0.18);
      dome.userData.noEdges = true;

      const crown = new THREE.Mesh(crownGeo, mats.opticalCementClear);
      crown.scale.set(1.0, 1.0, 0.22);
      crown.position.set(cx, cy, -0.25);
      crown.userData.noEdges = true;

      // Dual angled razor-thin stray-light baffle louvers shielding eyeglasses from off-axis IR glare
      for (const radScale of [0.855, 0.905]) {
        const louver = new THREE.Mesh(louverGeo, mats.velvetFlockTrap);
        louver.position.set(cx * radScale, cy * radScale, -0.14);
        louver.rotation.z = a + Math.PI / 2;
        louver.userData.noEdges = true;
        g.add(louver);
      }

      g.add(hood, reflector, dome, crown);
    }

    // 4x brass alignment dowel bushings + 4x gold EMI grounding contact tabs on outer rim
    const bushGeo = createPrecisionRingGeo(0.32, 0.56, 0.36, 0.02, 16);
    for (const [bx, by] of [
      [-11.05, 0],
      [11.05, 0],
      [0, 8.6],
      [0, -8.6],
    ] as Array<[number, number]>) {
      const bush = new THREE.Mesh(bushGeo, mats.brassGear);
      bush.position.set(bx, by, -0.04);
      g.add(bush);
    }

    const gndPadGeo = createChamferedBoxGeo(1.15, 0.42, 0.08, 0.04, 0.01, 'z');
    for (const [gx, gy] of [
      [-7.4, 7.65],
      [7.4, 7.65],
      [-7.4, -7.65],
      [7.4, -7.65],
    ] as Array<[number, number]>) {
      const gp = new THREE.Mesh(gndPadGeo, mats.goldPlating);
      gp.position.set(gx, gy, -0.185);
      gp.userData.noEdges = true;
      g.add(gp);
    }

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-ir-led-collimator-ring',
        74,
        '#be123c',
        g,
        new THREE.Vector3(0, EVF_OPTICAL_Y, -29.22),
        new THREE.Vector3(32, 10, -28),
        cp,
        0.24
      )
    );
  }

  // =========================================================================
  // E75. VF-Block Main-Chassis h6 Hardened Dowel Pins & Multi-Point Gold-BeCu EMI Ground
  //      Seated cleanly 0.08mm beneath raised E45 (world Y=25.38, compact 2.45mm locating dowels!)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Slim left/right CNC stainless datum tie rails with top stiffening ribs & weight-relief slots
    const railGeo = createChamferedBoxGeo(2.05, 0.46, 26.2, 0.35, 0.04, 'y');
    const stiffRibGeo = createChamferedBoxGeo(0.42, 0.12, 23.6, 0.12, 0.015, 'y');
    const slotRecGeo = createChamferedBoxGeo(0.76, 0.14, 2.2, 0.18, 0.015, 'y');
    for (const sx of [-16.5, 16.5]) {
      const rail = new THREE.Mesh(railGeo, mats.stainlessMachined);
      rail.position.set(sx, 0, -1.0);
      g.add(rail);

      // Twin chamfered top-edge stiffening rails (max local y = +0.26 -> world Y = 25.64 < E45!)
      for (const dx of [-0.66, 0.66]) {
        const rib = new THREE.Mesh(stiffRibGeo, mats.titaniumRivet);
        rib.position.set(sx + dx, 0.2, -1.0);
        rib.userData.noEdges = true;
        g.add(rib);
      }
      // 4x CNC lightening/alignment slots along rail spine
      for (const sz of [-8.2, -1.8, 3.8, 10.6]) {
        const sl = new THREE.Mesh(slotRecGeo, mats.matteBlackAnodized);
        sl.position.set(sx, 0.19, sz);
        sl.userData.noEdges = true;
        g.add(sl);
      }
    }

    // 2x centerless-ground Ø1.5mm h6 hardened titanium locating dowel pins (compact realistic 2.45mm engagement length!)
    const dowelGeo = hiResCyl(0.72, 0.72, 2.45, 22);
    const tipGeo = hiResCyl(0.44, 0.72, 0.46, 22);
    const knurlGeo = createKnurledCollarGeo(0.68, 0.72, 0.79, 0.68, 20).rotateX(Math.PI / 2);
    const grooveGeo = hiResTorus(0.7, 0.05, 8, 22).rotateX(Math.PI / 2);
    const bushGeo = createPrecisionRingGeo(0.74, 1.42, 0.44, 0.03, 24).rotateX(Math.PI / 2);

    for (const [dx, dz] of [
      [-16.5, -11.0],
      [16.5, 9.0],
    ] as Array<[number, number]>) {
      const pin = new THREE.Mesh(dowelGeo, mats.titaniumRivet);
      pin.position.set(dx, -1.28, dz);
      const knurl = new THREE.Mesh(knurlGeo, mats.stainlessMachined);
      knurl.position.set(dx, -0.78, dz);
      knurl.userData.noEdges = true;
      const groove = new THREE.Mesh(grooveGeo, mats.velvetFlockTrap);
      groove.position.set(dx, -1.22, dz);
      groove.userData.noEdges = true;
      const leadTip = new THREE.Mesh(tipGeo, mats.stainlessMachined);
      leadTip.position.set(dx, -2.72, dz);
      leadTip.userData.noEdges = true;
      const bush = new THREE.Mesh(bushGeo, mats.brassGear);
      bush.position.set(dx, -0.24, dz);
      g.add(pin, knurl, groove, leadTip, bush);
    }

    // 8x arched gold-plated Beryllium-Copper (BeCu) multi-point EMI grounding spring fingers (4 per rail!)
    const fingerBaseGeo = createChamferedBoxGeo(1.92, 0.18, 3.3, 0.16, 0.02, 'y');
    const fingerArchGeo = createChamferedBoxGeo(1.42, 0.16, 2.75, 0.14, 0.018, 'y');
    const fingerTipGeo = createChamferedBoxGeo(1.32, 0.14, 0.88, 0.12, 0.015, 'y');
    const dimpleGeo = hiResSphere(0.3, 12, 10);

    const fingerCoords: Array<[number, number]> = [
      [-16.5, -6.2],
      [-16.5, -0.8],
      [-16.5, 4.6],
      [-16.5, 9.8],
      [16.5, -10.8],
      [16.5, -5.4],
      [16.5, 0.2],
      [16.5, 5.4],
    ];
    const weldPts: Array<[number, number, number]> = [];
    for (const [fx, fz] of fingerCoords) {
      const fBase = new THREE.Mesh(fingerBaseGeo, mats.beCuSpring);
      fBase.position.set(fx, -0.34, fz);

      // Arched spring beam angling cleanly downward toward magnesium chassis contact land
      const arch = new THREE.Mesh(fingerArchGeo, mats.goldPlating);
      arch.position.set(fx, -0.86, fz + 0.28);
      arch.rotation.x = 0.24;

      // Rolled tip curling gently back up so insertion never snags!
      const tip = new THREE.Mesh(fingerTipGeo, mats.goldPlating);
      tip.position.set(fx, -1.14, fz + 1.56);
      tip.rotation.x = -0.3;

      // Embossed hemispherical gold contact dimple at spring crown
      const dimple = new THREE.Mesh(dimpleGeo, mats.goldPlating);
      dimple.scale.set(1.12, 0.62, 1.12);
      dimple.position.set(fx, -1.28, fz + 1.18);
      dimple.userData.noEdges = true;

      g.add(fBase, arch, tip, dimple);
      weldPts.push([fx - 0.45, -0.45, fz - 1.1], [fx + 0.45, -0.45, fz - 1.1]);
    }

    // 16x laser spot-weld nuggets anchoring BeCu fingers onto stainless datum rails
    const welds = buildSpotWeldNuggets(weldPts, 0.22, 'y', mats.beCuSpring, mats.goldPlating);
    g.add(welds);

    parts.push(
      finalizeStandaloneEvfPrecisionPart(
        'evf-chassis-dowel-emi-ground',
        75,
        '#d4a948',
        g,
        new THREE.Vector3(0, 25.44, -11.4),
        new THREE.Vector3(0, -48, -14),
        cp,
        0.26
      )
    );
  }

  return parts;
}
