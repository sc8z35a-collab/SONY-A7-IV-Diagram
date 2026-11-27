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
  buildGoldWirebondLoop,
  buildPhillipsScrew,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  makeHiResHorizPlate,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';
import { GPU_PROFILE } from '../../engine/GpuOptimizer';
import { getActiveBuildQuality } from '../../core/geometry_quality';
import { buildMicUltra30Parts } from './micUltra30Parts';
import { buildMicUltra31Parts } from './micUltra31Parts';
import { buildMicUltra36Parts } from './micUltra36Parts';

function finalizeMicPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  edgeOpacity = 0.22
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 32, edgeOpacity);

  return {
    id,
    subsystem: 'mic',
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
 * Helper to create a high-res horizontal plate (thickness along Y) with exact upright planar XZ UVs.
 */
function makeTexturedHorizPlate(
  shape: THREE.Shape,
  width: number,
  depth: number,
  thickness: number,
  mat: THREE.Material,
  bevel = 0.08,
  curveSegs = 24
): THREE.Mesh {
  const geo = extrudeHiRes(shape, thickness, bevel, bevel, 2, curveSegs);
  geo.rotateX(-Math.PI / 2);
  applyPlanarUVs(geo, width, depth, 'xz');
  return new THREE.Mesh(geo, mat);
}

/**
 * Helper to create a circular perforated disc with true drilled through-holes (thickness along Y).
 */
function makePerforatedDisc(
  outerR: number,
  holeCoords: Array<[number, number]>,
  holeR: number,
  thickness: number,
  mat: THREE.Material,
  bevel = 0.03
): THREE.Mesh {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  for (const [hx, hz] of holeCoords) {
    const hole = new THREE.Path();
    // Shape Y maps to -Z after rotateX(-PI/2)
    hole.absarc(hx, -hz, holeR, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const geo = extrudeHiRes(shape, thickness, bevel, bevel, 2, 32);
  geo.rotateX(-Math.PI / 2);
  applyPlanarUVs(geo, outerR * 2, outerR * 2, 'xz');
  return new THREE.Mesh(geo, mat);
}

/**
 * Build all 42 sculpted ultra-HD 3D CAD sub-assemblies of the Sony Internal Stereo / 3-Capsule
 * Silicon MEMS + Electret Condenser (ECM) Microphone Ultra-Dissection (MC01–MC42).
 *
 * Magnified ~2.8:1 cutaway CAD scale, centered at (0, 0, 0):
 *  - Top (+Y): Plush ZV-E1 Windscreen, Stereo L/R Magnesium Top-Deck Grille (true holes & L/R silkscreen),
 *    Top-Deck EPDM Weather Seal, Woven 304 Stainless Micro-Mesh, Hydrophobic Gore-Tex ePTFE Vent,
 *    Offset Drain Labyrinth, Helmholtz Front Chamber, Dual-Lip Silicone Acoustic Coupling Gaskets
 *  - Mid-Housing: Sony OEM RUBBER (885) charcoal shock boot, MIC HOLDER (89100), BTITE 1.4x5.0mm Phillips screw,
 *    TAPE 631S #25 woven light-trap tape, Poron Anechoic Absorber, Copper-Braid Vibration-Decoupling Leads
 *  - Left Channel (-X): 8-Part Infineon XENSIV IM73A135 Silicon MEMS / SDM Cutaway (MC13–MC20)
 *  - Right Channel (+X): 5-Part Cylindrical Electret Condenser (ECM) Cutaway + 2SK596 JFET (MC21–MC25)
 *  - Rear Center (-Z): 3rd Dedicated Beamforming / Rear Voice-Memo Capsule (MC26) + Back-Cavity Chamber (MC36)
 *  - External I/O & Bottom Signal Stack: 3.5mm Red Mic Jack (MC34), 3.5mm Green Headphone Amp Jack (MC37),
 *    MI-Shoe Digital Bridge (MC35), 10-Pin ZIF (MC33), MICBIAS LDO (MC38), ESD Guard (MC39), IBIS Notch Bus (MC40),
 *    SH-1035 Flex, RF Filter, 24-bit Codec/PGA, Wind-Cut HPF, Beamforming DSP, BIONZ XR2 AI Noise Cut!
 * Strictly visible ONLY in standalone 'mic' mode.
 */
export function buildMicParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const u = mats.ultra;

  const LX = -14.2; // Left channel (Silicon MEMS / SDM cutaway)
  const RX = 14.2;  // Right channel (Electret Condenser ECM cutaway)
  const FZ = 4.2;   // Front stereo L/R line

  // =========================================================================
  // MC01. Detachable Acoustic Fur Windscreen ("Deadcat" / Sony ZV-E1 504179701)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision satin-charcoal molded windscreen collar + brushed silver Sony trim bezel
    const baseGeo = extrudeHiRes(createRoundedRectShape(45.2, 19.4, 6.2), 1.15, 0.16, 0.16, 2, 28);
    baseGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(baseGeo, 14.0);
    const basePlate = new THREE.Mesh(baseGeo, u.micOemHolderResin);

    // Molded elastomeric underside gasket skirt sealing windscreen collar cleanly against top deck
    const collarSkirt = makeHiResHorizPlate(
      createFrameShape(44.4, 18.6, 5.9, 41.2, 15.4, 4.7),
      0.32,
      u.micRubberBootBlack,
      0.06,
      1,
      24
    );
    collarSkirt.position.y = -0.58;
    collarSkirt.userData.noEdges = true;

    const silverTrim = makeHiResHorizPlate(
      createFrameShape(44.0, 18.2, 5.8, 41.6, 15.8, 4.8),
      0.34,
      mats.stainlessMachined,
      0.06,
      2,
      24
    );
    silverTrim.position.y = 0.62;
    silverTrim.userData.noEdges = true;

    // Front alignment index chevron & twin lateral windscreen snap-lock ribs
    const frontIndex = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.24, 0.9, 0.14, 0.04, 'y'),
      mats.titaniumRivet
    );
    frontIndex.position.set(0, 0.72, 8.85);
    frontIndex.userData.noEdges = true;

    // Soft sculpted deep-obsidian acoustic fleece core + inner perforated acoustic support ribs
    const domeGeo = hiResSphere(15.2, 44, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const domeCore = new THREE.Mesh(domeGeo, u.micAcousticFelt);
    domeCore.scale.set(1.34, 0.48, 0.58);
    domeCore.position.y = 0.48;
    domeCore.userData.noEdges = true;

    // Inner molded acoustic skeleton frame rings visible from underside inspection
    for (const [rx, rz] of [
      [18.8, 7.6],
      [13.4, 5.4],
    ]) {
      const cageRing = new THREE.Mesh(hiResTorus(1.0, 0.032, 8, 28), mats.matteBlackAnodized);
      cageRing.rotation.x = Math.PI / 2;
      cageRing.scale.set(rx, rz, 1.0);
      cageRing.position.y = 0.24;
      cageRing.userData.noEdges = true;
      g.add(cageRing);
    }

    // Multi-filament 4-strand wispy plush fur cluster geometry (1 instance = 4 silky curved synthetic hairs!)
    const tuftPos: number[] = [];
    const tuftNorm: number[] = [];
    const tuftUv: number[] = [];
    const tuftIdx: number[] = [];
    const strandSpecs = [
      { ox: 0.0, oz: 0.0, len: 2.85, rad: 0.145, bendZ: 1.55, bendX: 0.12, splayX: 0.0, splayZ: 0.0 },
      { ox: -0.22, oz: 0.08, len: 2.55, rad: 0.130, bendZ: 1.38, bendX: -0.42, splayX: -0.24, splayZ: 0.10 },
      { ox: 0.22, oz: 0.05, len: 2.62, rad: 0.130, bendZ: 1.44, bendX: 0.46, splayX: 0.26, splayZ: 0.08 },
      { ox: 0.04, oz: -0.18, len: 2.38, rad: 0.122, bendZ: 1.18, bendX: -0.18, splayX: -0.08, splayZ: -0.20 },
    ];
    const isMobFur = GPU_PROFILE.isMobile;
    const qFur = getActiveBuildQuality();
    const radialSegs = qFur === 'standard_lite' || qFur === 'standard' ? 3 : isMobFur ? 3 : 4;
    const heightSegs =
      qFur === 'standard_lite' ? 1 : qFur === 'standard' ? 2 : qFur === 'high' ? 3 : isMobFur ? 3 : 4;
    const mobRadBoost =
      qFur === 'standard_lite' ? 1.62 : qFur === 'standard' ? 1.38 : isMobFur ? 1.24 : 1.0;
    const furCountScale =
      (qFur === 'standard_lite' ? 0.14 : qFur === 'standard' ? 0.28 : qFur === 'high' ? 0.62 : 1.0) *
      (isMobFur ? 0.45 : 1.0);
    let vBase = 0;
    for (const sp of strandSpecs) {
      for (let iy = 0; iy <= heightSegs; iy++) {
        const t = iy / heightSegs;
        const r = sp.rad * mobRadBoost * (1.0 - t * 0.90) * (1.0 + Math.sin(t * Math.PI) * 0.28);
        const cx = sp.ox + t * sp.splayX + Math.sin(t * Math.PI * 0.9) * sp.bendX * 0.65;
        const cy = t * sp.len * (1.0 - t * 0.18);
        const cz = sp.oz + t * sp.splayZ + t * t * sp.bendZ;
        for (let ir = 0; ir < radialSegs; ir++) {
          const a = (ir / radialSegs) * Math.PI * 2;
          const nx = Math.cos(a);
          const nz = Math.sin(a);
          tuftPos.push(cx + nx * r, cy, cz + nz * r * 0.78);
          tuftNorm.push(nx, 0.25, nz);
          tuftUv.push(ir / radialSegs, t);
        }
      }
      for (let iy = 0; iy < heightSegs; iy++) {
        for (let ir = 0; ir < radialSegs; ir++) {
          const irNext = (ir + 1) % radialSegs;
          const a = vBase + iy * radialSegs + ir;
          const b = vBase + iy * radialSegs + irNext;
          const c = vBase + (iy + 1) * radialSegs + irNext;
          const d = vBase + (iy + 1) * radialSegs + ir;
          // Outward CCW winding around +Y so fur tufts render cleanly under FrontSide culling
          tuftIdx.push(a, c, b, a, d, c);
        }
      }
      vBase += (heightSegs + 1) * radialSegs;
    }
    const lockGeo = markHiRes(new THREE.BufferGeometry());
    lockGeo.setAttribute('position', new THREE.Float32BufferAttribute(tuftPos, 3));
    lockGeo.setAttribute('normal', new THREE.Float32BufferAttribute(tuftNorm, 3));
    lockGeo.setAttribute('uv', new THREE.Float32BufferAttribute(tuftUv, 2));
    lockGeo.setIndex(tuftIdx);
    lockGeo.computeVertexNormals();

    const furRng = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const makePlushFurLayer = (
      rawCount: number,
      mat: THREE.Material,
      lenScale: number,
      rSpread: number,
      seedOffset: number,
      yBias: number,
      rimBandOnly = false
    ) => {
      const count = Math.max(48, Math.round(rawCount * furCountScale));
      const inst = new THREE.InstancedMesh(lockGeo, mat, count);
      const dm = new THREE.Object3D();
      dm.rotation.order = 'YXZ';
      for (let i = 0; i < count; i++) {
        const phi = rimBandOnly
          ? ((i / count) * Math.PI * 2 + (furRng(i + seedOffset) - 0.5) * 0.08)
          : ((i + seedOffset * 0.37) * 2.3999632) % (Math.PI * 2);
        const rNorm = rimBandOnly
          ? (0.86 + furRng(i * 5 + seedOffset) * 0.145)
          : Math.sqrt((i + 0.25 + furRng(i + seedOffset) * 0.55) / count);
        const clampedR = Math.min(0.995, rNorm);
        const ux = Math.cos(phi) * clampedR * 20.5 * rSpread;
        const uz = Math.sin(phi) * clampedR * 8.85 * rSpread;
        const domeH = Math.sqrt(Math.max(0.008, 1 - clampedR * clampedR));
        const uy = Math.max(0.46, 0.44 + domeH * 7.25 + yBias);
        dm.position.set(ux, uy, uz);
        const swirl = (furRng(i * 3 + seedOffset) - 0.5) * 0.52;
        const tilt = rimBandOnly
          ? (0.88 + furRng(i * 7 + seedOffset) * 0.26)
          : (0.48 + clampedR * 0.54 + (furRng(i * 7 + seedOffset) - 0.5) * 0.20);
        const yaw = Math.atan2(ux / 20.5, uz / 8.85) + swirl;
        const sc = (0.78 + furRng(i * 11 + seedOffset) * 0.44) * lenScale;
        dm.rotation.set(tilt, yaw, (furRng(i * 13 + seedOffset) - 0.5) * 0.28);
        dm.scale.set(sc * 1.04, sc * 0.96, sc * 1.04);
        dm.updateMatrix();
        inst.setMatrixAt(i, dm.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;
      inst.userData.noEdges = true;
      return inst;
    };

    const furUndercoat = makePlushFurLayer(640, u.micAcousticFelt, 0.94, 0.99, 17, -0.10, false);
    const furMidcoat = makePlushFurLayer(660, u.micDeadcatFur, 1.04, 1.00, 83, 0.04, false);
    const furSilverTips = makePlushFurLayer(330, mats.lensFoamSeal, 1.06, 1.01, 211, 0.14, false);
    const furRimFringe = makePlushFurLayer(220, u.micDeadcatFur, 0.92, 1.00, 389, -0.06, true);
    g.add(furUndercoat, furMidcoat, furSilverTips, furRimFringe);

    // Authentic Sony ZV-E1 Multi-Interface (MI) Shoe locking adapter foot with stepped guide rails,
    // front contact-protector skirt, spring retention leaf & brass grounding contact dimple!
    const shoeStem = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 1.35, 9.2, 0.8, 0.14, 'y'),
      mats.mountPpsInsulator
    );
    shoeStem.position.set(0, -1.1, -3.2);
    const shoeFlange = new THREE.Mesh(
      createChamferedBoxGeo(15.0, 0.68, 11.6, 0.7, 0.1, 'y'),
      mats.mountPpsInsulator
    );
    shoeFlange.position.set(0, -1.95, -3.2);
    // Stepped lateral MI-shoe rail guide ribs + anti-rattle elastomer pads
    for (const sx of [-6.95, 6.95]) {
      const railLip = new THREE.Mesh(
        createChamferedBoxGeo(0.9, 0.34, 10.6, 0.2, 0.05, 'y'),
        mats.matteBlackAnodized
      );
      railLip.position.set(sx, -1.65, -3.2);
      railLip.userData.noEdges = true;
      const antiRattle = new THREE.Mesh(
        createChamferedBoxGeo(0.55, 0.22, 6.8, 0.12, 0.03, 'y'),
        u.micRubberBootBlack
      );
      antiRattle.position.set(sx * 0.86, -2.30, -3.2);
      antiRattle.userData.noEdges = true;
      g.add(railLip, antiRattle);
    }
    // Front protective shroud lip preventing dust ingress onto the 21 MI-shoe pins
    const frontDustLip = new THREE.Mesh(
      createChamferedBoxGeo(13.6, 0.42, 1.15, 0.25, 0.05, 'y'),
      u.micRubberBootBlack
    );
    frontDustLip.position.set(0, -1.78, 2.15);
    frontDustLip.userData.noEdges = true;
    // Spring-steel detent retention leaf + raised locking dimple + brass ground lug
    const shoeLatch = new THREE.Mesh(
      createChamferedBoxGeo(3.4, 0.24, 5.2, 0.25, 0.04, 'y'),
      mats.stainlessMachined
    );
    shoeLatch.position.set(0, -2.32, -3.4);
    shoeLatch.userData.noEdges = true;
    const latchDimple = new THREE.Mesh(hiResSphere(0.45, 12, 8), mats.goldPlating);
    latchDimple.scale.set(1.2, 0.45, 1.5);
    latchDimple.position.set(0, -2.44, -4.6);
    latchDimple.userData.noEdges = true;
    const shoeScrewL = buildPhillipsScrew(0.55, 0.22, 0.22, 0.6, u.micOemScrewSteel, mats.matteBlackAnodized, mats.stainlessMachined);
    shoeScrewL.rotation.x = Math.PI;
    shoeScrewL.position.set(-4.2, -2.28, -3.2);
    const shoeScrewR = shoeScrewL.clone();
    shoeScrewR.position.x = 4.2;
    g.add(basePlate, collarSkirt, silverTrim, frontIndex, domeCore, shoeStem, shoeFlange, frontDustLip, shoeLatch, latchDimple, shoeScrewL, shoeScrewR);

    parts.push(
      finalizeMicPart(
        'mc-deadcat-windscreen',
        1,
        '#475569',
        g,
        new THREE.Vector3(0, 16.2, FZ),
        new THREE.Vector3(0, 42.5, 2.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // MC02. Top-Deck Stereo L/R Micro-Perforated Acoustic Port Grille & Mg Enclosure
  // =========================================================================
  {
    const g = new THREE.Group();
    const deckW = 54.0;
    const deckD = 34.0;
    // Note: MC02 sits at assembledPos.z = -1.5, so world FZ=4.2 is local z=+5.7 and world z=-12.5 is local z=-11.0
    const localFZ = FZ + 1.5;
    const localRZ = -12.5 + 1.5;

    const topDeckShape = createRoundedRectShape(deckW, deckD, 4.4);
    const holePositions: Array<[number, number]> = [];
    for (const cx of [LX, RX]) {
      for (let ix = -1; ix <= 1; ix++) {
        for (let iz = -1; iz <= 1; iz++) {
          holePositions.push([cx + ix * 2.1, localFZ + iz * 2.1]);
        }
      }
    }
    // Rear 3rd Voice-Memo / Beamforming grille cluster (5 true circular holes)
    for (const [dx, dz] of [
      [0, 0],
      [-2.05, 0],
      [2.05, 0],
      [0, -2.05],
      [0, 2.05],
    ]) {
      holePositions.push([dx, localRZ + dz]);
    }
    for (const [hx, hz] of holePositions) {
      const hPath = new THREE.Path();
      hPath.absarc(hx, -hz, 0.72, 0, Math.PI * 2, true);
      topDeckShape.holes.push(hPath);
    }

    const topDeck = makeTexturedHorizPlate(topDeckShape, deckW, deckD, 1.55, u.micTopDeckMg, 0.18, 28);

    // Sculpted Sony α7 IV die-cast magnesium top-deck perimeter housing shroud walls!
    const shroudGeo = extrudeHiRes(
      createFrameShape(deckW - 0.6, deckD - 0.6, 4.1, deckW - 4.4, deckD - 4.4, 2.9),
      15.2,
      0.22,
      0.20,
      2,
      26
    );
    shroudGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(shroudGeo, 16.0);
    const shroudWalls = new THREE.Mesh(shroudGeo, u.micMgBeadBlast);
    shroudWalls.position.y = -8.25;

    // Machined brushed-titanium shoulder trim belt seated below topDeck chamfer
    const beltRim = makeHiResHorizPlate(
      createFrameShape(deckW + 0.36, deckD + 0.36, 4.45, deckW - 1.0, deckD - 1.0, 3.8),
      0.66,
      mats.titaniumRivet,
      0.08,
      2,
      26
    );
    beltRim.position.y = -1.72;
    beltRim.userData.noEdges = true;

    // Sculpted Sony α7 IV magnesium side-apron contour step rib around mid-chassis waist
    const waistRibGeo = extrudeHiRes(
      createFrameShape(deckW + 0.18, deckD + 0.18, 4.35, deckW - 1.2, deckD - 1.2, 3.8),
      1.15,
      0.10,
      0.10,
      2,
      24
    );
    waistRibGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(waistRibGeo, 14.0);
    const waistRib = new THREE.Mesh(waistRibGeo, mats.matteBlackAnodized);
    waistRib.position.y = -11.4;
    waistRib.userData.noEdges = true;

    // Lower magnesium chassis mounting flange lip + die-cast aluminum EMI bottom pan rim
    const baseFlange = makeHiResHorizPlate(
      createFrameShape(deckW + 0.5, deckD + 0.5, 4.45, deckW - 6.8, deckD - 6.8, 2.8),
      1.25,
      mats.magnesiumCast,
      0.12,
      2,
      24
    );
    baseFlange.position.y = -15.75;
    baseFlange.userData.noEdges = true;

    // Front-wall sculpted Sony acoustic module recessed badge plate + cinnabar Alpha accent line
    const frontAccent = new THREE.Mesh(
      createChamferedBoxGeo(26.0, 3.6, 0.55, 0.55, 0.08, 'z'),
      mats.matteBlackAnodized
    );
    frontAccent.position.set(0, -6.8, deckD * 0.5 - 0.15);
    const frontTrimBar = new THREE.Mesh(
      createChamferedBoxGeo(24.4, 0.36, 0.62, 0.12, 0.04, 'z'),
      mats.titaniumRivet
    );
    frontTrimBar.position.set(0, -4.85, deckD * 0.5 - 0.12);
    frontTrimBar.userData.noEdges = true;
    const frontTrimBot = new THREE.Mesh(
      createChamferedBoxGeo(24.4, 0.28, 0.62, 0.12, 0.04, 'z'),
      mats.cinnabarAnodized
    );
    frontTrimBot.position.set(0, -8.72, deckD * 0.5 - 0.12);
    frontTrimBot.userData.noEdges = true;
    // Twin subtle front cooling/acoustic equalization micro-slots flanking badge
    for (const fx of [-10.2, 10.2]) {
      const slot = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 0.52, 0.42, 0.18, 0.04, 'z'),
        mats.stainlessMachined
      );
      slot.position.set(fx, -6.8, deckD * 0.5 - 0.06);
      slot.userData.noEdges = true;
      g.add(slot);
    }
    g.add(frontAccent, frontTrimBar, frontTrimBot);

    // Countersunk M1.4 Phillips titanium chassis screws on Front (+Z) & Rear (-Z) magnesium flanks
    for (const sx of [-18.5, 18.5]) {
      for (const [sz, rotX] of [
        [deckD * 0.5 - 0.12, -Math.PI / 2],
        [-deckD * 0.5 + 0.12, Math.PI / 2],
      ]) {
        const scr = buildPhillipsScrew(0.95, 0.42, 0.42, 1.3, u.micOemScrewSteel, mats.matteBlackAnodized, mats.stainlessMachined);
        scr.rotation.x = rotX;
        scr.position.set(sx, -6.8, sz);
        g.add(scr);
      }
    }

    // Left-flank (-X) sculpted Dual 3.5mm Audio I/O Port Escutcheon Bezel framing MC34 (Red Mic) & MC37 (Green HP)
    const ioEscutcheon = new THREE.Mesh(
      createChamferedBoxGeo(1.15, 7.6, 15.8, 0.35, 0.12, 'y'),
      mats.matteBlackAnodized
    );
    ioEscutcheon.position.set(-deckW * 0.5 + 0.05, -8.4, 0.4);
    const ioSilverFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.2, 6.8, 1.1, 14.0, 5.6, 0.85), 0.35, 0.05, 0.05, 1, 18),
      mats.titaniumRivet
    );
    ioSilverFrame.rotation.y = -Math.PI / 2;
    ioSilverFrame.position.set(-deckW * 0.5 - 0.42, -8.4, 0.4);
    ioSilverFrame.userData.noEdges = true;
    // Color-coded Sony MIC (Red) & Headphone (Emerald) tactile stripe indicators on left I/O escutcheon
    const micMarkBar = new THREE.Mesh(
      createChamferedBoxGeo(0.28, 0.46, 4.4, 0.1, 0.02, 'y'),
      mats.bodyRecRed
    );
    micMarkBar.position.set(-deckW * 0.5 - 0.56, -5.65, 4.3);
    micMarkBar.userData.noEdges = true;
    const hpMarkBar = new THREE.Mesh(
      createChamferedBoxGeo(0.28, 0.46, 4.4, 0.1, 0.02, 'y'),
      u.micGreenJackCollar
    );
    hpMarkBar.position.set(-deckW * 0.5 - 0.56, -5.65, -3.5);
    hpMarkBar.userData.noEdges = true;
    for (const sz of [-6.8, 7.4]) {
      const lScr = buildPhillipsScrew(0.78, 0.38, 0.35, 1.1, u.micOemScrewSteel, mats.matteBlackAnodized, mats.titaniumRivet);
      lScr.rotation.z = -Math.PI / 2;
      lScr.position.set(-deckW * 0.5 - 0.25, -13.4, sz);
      g.add(lScr);
    }
    g.add(ioEscutcheon, ioSilverFrame, micMarkBar, hpMarkBar);

    // Right-flank (+X) CNC-machined MI-Shoe Digital Flex Strain-Relief Clamp Plate with twin titanium Phillips screws
    const rightClamp = new THREE.Mesh(
      createChamferedBoxGeo(1.15, 5.2, 18.6, 0.35, 0.12, 'y'),
      mats.magnesiumCast
    );
    rightClamp.position.set(deckW * 0.5 - 0.05, -12.6, -1.5);
    for (const sz of [-8.2, 5.2]) {
      const rScr = buildPhillipsScrew(0.82, 0.4, 0.38, 1.1, u.micOemScrewSteel, mats.matteBlackAnodized, mats.stainlessMachined);
      rScr.rotation.z = Math.PI / 2;
      rScr.position.set(deckW * 0.5 + 0.35, -12.6, sz);
      g.add(rScr);
    }
    g.add(rightClamp);

    // Authentic Sony Brushed-Stainless Multi-Interface (MI) Shoe Hot-Shoe Rail + Dual Spring Blades + 21-Pin Gold Comb!
    const miZ = localFZ - 3.2;
    const miShoeBase = makeHiResHorizPlate(
      createFrameShape(16.8, 14.2, 1.2, 12.6, 10.6, 0.6),
      0.55,
      mats.stainlessMachined,
      0.06,
      2,
      18
    );
    miShoeBase.position.set(0, 0.96, miZ);
    miShoeBase.userData.noEdges = true;
    // Dual arched spring-steel MI-shoe accessory tension leaf blades
    for (const sx of [-4.6, 4.6]) {
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(1.5, 0.24, 9.2, 0.25, 0.04, 'y'),
        u.sensorSusSpringSteel
      );
      blade.position.set(sx, 0.98, miZ);
      blade.userData.noEdges = true;
      g.add(blade);
    }
    // Central ISO hot-shoe sync contact button + recessed 21-pin MIS-2006 digital audio gold finger comb
    const syncPad = new THREE.Mesh(hiResCyl(1.15, 1.15, 0.18, 18), mats.goldPlating);
    syncPad.position.set(0, 0.88, miZ - 0.5);
    syncPad.userData.noEdges = true;
    const pinGeo = createChamferedBoxGeo(0.28, 0.22, 1.15, 0.04, 0.02, 'y');
    const pinComb = new THREE.InstancedMesh(pinGeo, mats.goldPlating, 21);
    const dmPin = new THREE.Object3D();
    for (let i = 0; i < 21; i++) {
      dmPin.position.set(-5.0 + i * 0.5, 0.96, miZ + 4.45);
      dmPin.updateMatrix();
      pinComb.setMatrixAt(i, dmPin.matrix);
    }
    pinComb.instanceMatrix.needsUpdate = true;
    pinComb.userData.noEdges = true;
    // 4 tiny countersunk stainless shoe rail mounting screws
    for (const [sx, sz] of [
      [-6.8, miZ - 5.2],
      [6.8, miZ - 5.2],
      [-6.8, miZ + 5.2],
      [6.8, miZ + 5.2],
    ]) {
      const sScr = buildPhillipsScrew(0.42, 0.18, 0.16, 0.5, u.micOemScrewSteel, mats.matteBlackAnodized, mats.stainlessMachined);
      sScr.position.set(sx, 1.24, sz);
      g.add(sScr);
    }
    g.add(miShoeBase, syncPad, pinComb);

    // Countersunk dark bores + gleaming CNC silver chamfer rings lining all 23 precision-drilled holes!
    const sleeveGeo = hiResCyl(0.76, 0.68, 0.34, 14, true);
    const sleeveInst = new THREE.InstancedMesh(sleeveGeo, mats.matteBlackAnodized, holePositions.length);
    const ringGeo = hiResTorus(0.78, 0.07, 8, 16);
    ringGeo.rotateX(Math.PI / 2);
    const ringInst = new THREE.InstancedMesh(ringGeo, mats.stainlessMachined, holePositions.length);
    const dm = new THREE.Object3D();
    holePositions.forEach(([hx, hz], idx) => {
      dm.position.set(hx, 0.64, hz);
      dm.updateMatrix();
      sleeveInst.setMatrixAt(idx, dm.matrix);
      dm.position.set(hx, 0.80, hz);
      dm.updateMatrix();
      ringInst.setMatrixAt(idx, dm.matrix);
    });
    sleeveInst.instanceMatrix.needsUpdate = true;
    sleeveInst.userData.noEdges = true;
    ringInst.instanceMatrix.needsUpdate = true;
    ringInst.userData.noEdges = true;

    // 4 machined underside cast-magnesium screw fastener bosses with knurled brass thread inserts
    for (const [bx, bz] of [
      [-23.2, -13.2],
      [23.2, -13.2],
      [-23.2, 13.2],
      [23.2, 13.2],
    ]) {
      const boss = new THREE.Mesh(hiResCyl(1.35, 1.55, 1.45, 16), mats.magnesiumCast);
      boss.position.set(bx, -1.25, bz);
      const thread = new THREE.Mesh(hiResCyl(0.72, 0.72, 1.54, 14), mats.brassGear);
      thread.position.set(bx, -1.25, bz);
      thread.userData.noEdges = true;
      const bore = new THREE.Mesh(hiResCyl(0.45, 0.45, 1.60, 12), mats.matteBlackAnodized);
      bore.position.set(bx, -1.25, bz);
      bore.userData.noEdges = true;
      g.add(boss, thread, bore);
    }

    // CNC-beveled brushed titanium trim bezels framing the L, R, and Rear grilles + micro-chamfer accent rims
    for (const cx of [LX, RX]) {
      const bezel = makeHiResHorizPlate(
        createFrameShape(9.4, 9.4, 1.9, 7.1, 7.1, 1.2),
        0.34,
        mats.titaniumRivet,
        0.06,
        2,
        20
      );
      bezel.position.set(cx, 0.82, localFZ);
      const innerStep = makeHiResHorizPlate(
        createFrameShape(7.4, 7.4, 1.3, 6.7, 6.7, 1.0),
        0.18,
        mats.stainlessMachined,
        0.03,
        1,
        18
      );
      innerStep.position.set(cx, 0.94, localFZ);
      innerStep.userData.noEdges = true;
      g.add(bezel, innerStep);
    }
    const rearBezel = makeHiResHorizPlate(
      createFrameShape(7.8, 7.8, 1.8, 5.9, 5.9, 1.2),
      0.32,
      mats.titaniumRivet,
      0.06,
      2,
      20
    );
    rearBezel.position.set(0, 0.82, localRZ);
    g.add(topDeck, shroudWalls, beltRim, waistRib, baseFlange, sleeveInst, ringInst, rearBezel);

    parts.push(
      finalizeMicPart(
        'mc-top-grille-holes',
        2,
        '#272b33',
        g,
        new THREE.Vector3(0, 13.0, -1.5),
        new THREE.Vector3(0, 32.0, 0),
        cp,
        0.2
      )
    );
  }

  // =========================================================================
  // MC03. Ultra-Fine Stainless Steel Acoustic Micro-Mesh Debris Screen
  // =========================================================================
  {
    const g = new THREE.Group();
    const buildMeshPatch = (cx: number, cz: number, w: number) => {
      // Stamped 304 stainless steel stepped retaining frame with perimeter mounting ears
      const rim = makeHiResHorizPlate(
        createFrameShape(w, w, 1.4, w - 1.7, w - 1.7, 0.8),
        0.38,
        mats.stainlessMachined,
        0.05,
        2,
        20
      );
      rim.position.set(cx, 0, cz);

      // Stepped inner clamping lip locking the woven 2x2 Dutch-twill micro-mesh under tension
      const innerLip = makeHiResHorizPlate(
        createFrameShape(w - 1.25, w - 1.25, 1.0, w - 1.95, w - 1.95, 0.7),
        0.24,
        mats.titaniumRivet,
        0.03,
        1,
        18
      );
      innerLip.position.set(cx, 0.14, cz);
      innerLip.userData.noEdges = true;

      // Photorealistic 2x2 Dutch-twill woven 304 stainless acoustic micro-mesh screen
      const meshPlate = makeTexturedHorizPlate(
        createRoundedRectShape(w - 1.35, w - 1.35, 0.6),
        w - 1.35,
        w - 1.35,
        0.16,
        u.micStainlessWovenMesh,
        0.02,
        14
      );
      meshPlate.position.set(cx, 0.02, cz);
      meshPlate.userData.noEdges = true;

      // Subtle underside anti-oil-canning stainless micro-support crossbars
      for (const rotY of [0, Math.PI / 2]) {
        const rib = new THREE.Mesh(
          createChamferedBoxGeo(w - 1.9, 0.08, 0.24, 0.04, 0.01, 'y'),
          mats.stainlessMachined
        );
        rib.rotation.y = rotY;
        rib.position.set(cx, -0.10, cz);
        rib.userData.noEdges = true;
        g.add(rib);
      }

      // 8 precision perimeter laser spot-weld tack dimples (4 corners + 4 mid-edge) + locating notch tab
      for (const [ox, oz] of [
        [-0.43, -0.43],
        [0.43, -0.43],
        [-0.43, 0.43],
        [0.43, 0.43],
        [0, -0.44],
        [0, 0.44],
        [-0.44, 0],
        [0.44, 0],
      ]) {
        const tack = new THREE.Mesh(hiResCyl(0.28, 0.32, 0.44, 10), mats.silverElectrode);
        tack.position.set(cx + ox * w, 0.04, cz + oz * w);
        tack.userData.noEdges = true;
        g.add(tack);
      }
      const keyEar = new THREE.Mesh(
        createChamferedBoxGeo(1.1, 0.24, 1.35, 0.2, 0.03, 'y'),
        mats.stainlessMachined
      );
      keyEar.position.set(cx + (cx < 0 ? -w * 0.52 : w * 0.52), 0, cz);
      keyEar.userData.noEdges = true;
      g.add(rim, innerLip, meshPlate, keyEar);
    };
    buildMeshPatch(LX, FZ, 9.4);
    buildMeshPatch(RX, FZ, 9.4);
    buildMeshPatch(0, -12.5, 7.8);

    parts.push(
      finalizeMicPart(
        'mc-stainless-micro-mesh',
        3,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 11.4, 0),
        new THREE.Vector3(0, 16.5, 0),
        cp,
        0.22
      )
    );
  }

  // =========================================================================
  // MC04. Hydrophobic Microporous ePTFE Waterproof Acoustic Vent (GORE® GAW333)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [cx, cz, r] of [
      [LX, FZ, 4.45],
      [RX, FZ, 4.45],
      [0, -12.5, 3.65],
    ] as Array<[number, number, number]>) {
      // Die-cut matte-black 3M 467MP pressure-sensitive adhesive (PSA) sealing ring with woven carrier
      const psaShape = new THREE.Shape();
      psaShape.absarc(0, 0, r + 0.58, 0, Math.PI * 2, false);
      const psaHole = new THREE.Path();
      psaHole.absarc(0, 0, r - 0.56, 0, Math.PI * 2, true);
      psaShape.holes.push(psaHole);
      const psaGeo = extrudeHiRes(psaShape, 0.34, 0.04, 0.04, 1, 32);
      psaGeo.rotateX(-Math.PI / 2);
      applyBoxUVs(psaGeo, 6.0);
      const psa = new THREE.Mesh(psaGeo, u.micTeraoka631sTape);
      psa.position.set(cx, 0, cz);

      // Raised ultrasonic thermal-weld lamination ring locking ePTFE membrane onto PSA ring
      const weldRing = new THREE.Mesh(hiResTorus(r - 0.32, 0.12, 10, 32), mats.ceramicAlumina);
      weldRing.rotation.x = Math.PI / 2;
      weldRing.position.set(cx, 0.16, cz);
      weldRing.userData.noEdges = true;

      // Secondary translucent 3M acrylic adhesive peel-edge bead on underside
      const psaUnder = new THREE.Mesh(hiResTorus(r + 0.15, 0.09, 8, 30), mats.opticalCementClear);
      psaUnder.rotation.x = Math.PI / 2;
      psaUnder.position.set(cx, -0.18, cz);
      psaUnder.userData.noEdges = true;

      // Factory alignment pull-tab extending radially with punched locator hole
      const tabShape = createRoundedRectShape(1.9, 1.5, 0.42);
      const tabHole = new THREE.Path();
      tabHole.absarc(0.28, 0, 0.32, 0, Math.PI * 2, true);
      tabShape.holes.push(tabHole);
      const tab = makeHiResHorizPlate(tabShape, 0.24, u.micTeraoka631sTape, 0.03, 1, 14);
      tab.position.set(cx + (cx < 0 ? -(r + 0.88) : r + 0.88), 0, cz);
      if (cx < 0) tab.rotation.y = Math.PI;
      tab.userData.noEdges = true;

      // Crisp fibrous white hydrophobic W.L. Gore GAW333 node-and-fibril ePTFE acoustic vent disc
      const memGeo = hiResCyl(r - 0.28, r - 0.28, 0.22, 32);
      applyPlanarUVs(memGeo, r * 2, r * 2, 'xz');
      const membrane = new THREE.Mesh(memGeo, u.micEptfeMembrane);
      membrane.position.set(cx, 0.05, cz);
      membrane.userData.noEdges = true;
      g.add(psa, weldRing, psaUnder, tab, membrane);
    }

    parts.push(
      finalizeMicPart(
        'mc-eptfe-waterproof-membrane',
        4,
        '#f8fafc',
        g,
        new THREE.Vector3(0, 10.3, 0),
        new THREE.Vector3(0, 13.8, 0),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC05. Offset Acoustic Water-Drain Labyrinth & >1 mm Recessed Channel
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const cx of [LX, RX]) {
      // Die-cast magnesium stepped offset housing block with true acoustic feed bore
      const blockShape = createRoundedRectShape(13.4, 11.6, 1.8);
      const bore = new THREE.Path();
      bore.absarc(0, 0, 2.35, 0, Math.PI * 2, true);
      blockShape.holes.push(bore);
      const blockGeo = extrudeHiRes(blockShape, 1.78, 0.12, 0.12, 2, 24);
      blockGeo.rotateX(-Math.PI / 2);
      applyBoxUVs(blockGeo, 10.0);
      const block = new THREE.Mesh(blockGeo, u.micMgBeadBlast);
      block.position.set(cx, 0, FZ);

      // Machined stainless acoustic throat collar & molded O-ring perimeter groove around bore
      const boreCollar = new THREE.Mesh(hiResTorus(2.42, 0.18, 10, 28), mats.stainlessMachined);
      boreCollar.rotation.x = Math.PI / 2;
      boreCollar.position.set(cx, 0.90, FZ);
      boreCollar.userData.noEdges = true;
      const oGroove = new THREE.Mesh(hiResTorus(3.15, 0.12, 8, 28), u.micRubberBootBlack);
      oGroove.rotation.x = Math.PI / 2;
      oGroove.position.set(cx, 0.91, FZ);
      oGroove.userData.noEdges = true;

      // Triple-stepped capillary rainwater diversion spillway trough with weir ribs & water-runoff film
      const outerSign = cx < 0 ? -1 : 1;
      const drainWall = new THREE.Mesh(
        createChamferedBoxGeo(2.85, 0.98, 9.8, 0.45, 0.08, 'y'),
        mats.stainlessMachined
      );
      drainWall.position.set(cx + outerSign * 4.45, 0.56, FZ);
      const drainWaterFilm = new THREE.Mesh(
        createChamferedBoxGeo(1.85, 0.42, 8.6, 0.3, 0.04, 'y'),
        mats.vcWorkingFluidCyan
      );
      drainWaterFilm.position.set(cx + outerSign * 4.45, 0.94, FZ);
      drainWaterFilm.userData.noEdges = true;
      // 3 micro capillary weir baffle ribs slowing droplet momentum along spillway
      for (const wz of [-2.8, 0, 2.8]) {
        const weir = new THREE.Mesh(
          createChamferedBoxGeo(1.9, 0.24, 0.28, 0.06, 0.02, 'y'),
          mats.titaniumRivet
        );
        weir.position.set(cx + outerSign * 4.45, 1.08, FZ + wz);
        weir.userData.noEdges = true;
        g.add(weir);
      }

      // Internal 90-degree acoustic redirect crank baffle shielding capsule from straight droplet strike
      const baffle = new THREE.Mesh(
        createChamferedBoxGeo(5.8, 1.24, 1.38, 0.25, 0.06, 'y'),
        u.micOemHolderResin
      );
      baffle.position.set(cx, 0.38, FZ + 1.45);
      const baffleLip = new THREE.Mesh(
        createChamferedBoxGeo(5.4, 0.22, 0.42, 0.08, 0.02, 'y'),
        mats.goldPlating
      );
      baffleLip.position.set(cx, 1.04, FZ + 1.45);
      baffleLip.userData.noEdges = true;

      // Twin precision stainless alignment dowel pins + brass bushing collars
      for (const dz of [-4.0, 4.0]) {
        const dowel = new THREE.Mesh(hiResCyl(0.54, 0.54, 1.45, 14), u.micOemScrewSteel);
        dowel.position.set(cx - outerSign * 4.9, 0.45, FZ + dz);
        dowel.userData.noEdges = true;
        const bush = new THREE.Mesh(hiResTorus(0.66, 0.1, 8, 16), mats.brassGear);
        bush.rotation.x = Math.PI / 2;
        bush.position.set(cx - outerSign * 4.9, 0.92, FZ + dz);
        bush.userData.noEdges = true;
        g.add(dowel, bush);
      }
      g.add(block, boreCollar, oGroove, drainWall, drainWaterFilm, baffle, baffleLip);
    }
    // Ribbed magnesium structural cross-tie linking left & right acoustic labyrinths with weight-relief pockets
    const tieGeo = extrudeHiRes(createRoundedRectShape(16.6, 3.6, 0.8), 0.92, 0.08, 0.08, 2, 16);
    tieGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(tieGeo, 10.0);
    const tie = new THREE.Mesh(tieGeo, u.micMgBeadBlast);
    tie.position.set(0, 0, FZ);
    const tieRib = new THREE.Mesh(
      createChamferedBoxGeo(14.4, 0.44, 0.58, 0.14, 0.04, 'y'),
      mats.stainlessMachined
    );
    tieRib.position.set(0, 0.58, FZ);
    tieRib.userData.noEdges = true;
    const datumBoss = new THREE.Mesh(hiResCyl(0.75, 0.85, 0.65, 16), mats.brassGear);
    datumBoss.position.set(0, 0.52, FZ);
    datumBoss.userData.noEdges = true;
    g.add(tie, tieRib, datumBoss);

    parts.push(
      finalizeMicPart(
        'mc-acoustic-drain-labyrinth',
        5,
        '#0284c7',
        g,
        new THREE.Vector3(0, 8.8, 0),
        new THREE.Vector3(0, 11.2, 2.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC06. Helmholtz Front-Port Acoustic Resonance Chamber (Vocal Clarity)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [cx, cz, r] of [
      [LX, FZ, 4.6],
      [RX, FZ, 4.6],
      [0, -12.5, 3.8],
    ] as Array<[number, number, number]>) {
      // Smooth Lathe-turned acoustic Helmholtz trumpet chamber (open front cutaway on +Z)
      const prof: THREE.Vector2[] = [
        new THREE.Vector2(r * 0.82, -0.92),
        new THREE.Vector2(r * 1.04, -0.92),
        new THREE.Vector2(r * 1.06, -0.68),
        new THREE.Vector2(r * 1.00, -0.60),
        new THREE.Vector2(r * 1.02, -0.22),
        new THREE.Vector2(r * 0.94, 0.55),
        new THREE.Vector2(r * 0.68, 0.92),
        new THREE.Vector2(r * 0.52, 0.92),
        new THREE.Vector2(r * 0.58, 0.45),
        new THREE.Vector2(r * 0.80, -0.15),
        new THREE.Vector2(r * 0.82, -0.92),
      ];
      const chamberGeo = markHiRes(new THREE.LatheGeometry(prof, 38, Math.PI * 0.28, Math.PI * 1.44));
      chamberGeo.computeVertexNormals();
      const chamber = new THREE.Mesh(chamberGeo, u.micEcmSpunAluminum);
      chamber.position.set(cx, 0, cz);

      // Precision CNC-turned dual-step acoustic neck tuning collar ring
      const neckRing = new THREE.Mesh(hiResTorus(r * 0.58, 0.34, 14, 34), mats.stainlessMachined);
      neckRing.rotation.x = Math.PI / 2;
      neckRing.position.set(cx, 0.88, cz);

      // Machined gold acoustic throat calibration ring & inner chamfered acoustic orifice
      const throatRing = new THREE.Mesh(hiResTorus(r * 0.47, 0.13, 10, 30), mats.goldPlating);
      throatRing.rotation.x = Math.PI / 2;
      throatRing.position.set(cx, 0.98, cz);
      throatRing.userData.noEdges = true;

      // 4 internal radial quarter-wave acoustic damping ribs visible inside cutaway cavity
      for (const ang of [-Math.PI * 0.62, -Math.PI * 0.30, Math.PI * 0.30, Math.PI * 0.62]) {
        const vane = new THREE.Mesh(
          createChamferedBoxGeo(0.22, 1.15, r * 0.28, 0.04, 0.02, 'y'),
          mats.titaniumRivet
        );
        vane.position.set(cx + Math.sin(ang) * r * 0.78, -0.1, cz - Math.cos(ang) * r * 0.78);
        vane.rotation.y = -ang;
        vane.userData.noEdges = true;
        g.add(vane);
      }

      // Lower elastomeric acoustic seating flange ring
      const seatGasket = new THREE.Mesh(
        hiResTorus(r * 0.94, 0.16, 10, 32, Math.PI * 1.44),
        u.micRubberBootBlack
      );
      seatGasket.rotation.x = Math.PI / 2;
      seatGasket.rotation.z = Math.PI * 0.78;
      seatGasket.position.set(cx, -0.94, cz);
      seatGasket.userData.noEdges = true;

      g.add(chamber, neckRing, throatRing, seatGasket);
    }

    parts.push(
      finalizeMicPart(
        'mc-helmholtz-front-chamber',
        6,
        '#3b82f6',
        g,
        new THREE.Vector3(0, 7.1, 0),
        new THREE.Vector3(0, 8.6, 4.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC07. Elastomeric Acoustic Coupling Gaskets (Zero Internal Noise Leak)
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [cx, cz, r] of [
      [LX, FZ, 4.5],
      [RX, FZ, 4.5],
      [0, -12.5, 3.7],
    ] as Array<[number, number, number]>) {
      // Sculpted dual-lip compressible Shore-35A elastomeric acoustic sealing rings
      const upperLip = new THREE.Mesh(hiResTorus(r, 0.52, 16, 36), mats.damperElastomer);
      upperLip.rotation.x = Math.PI / 2;
      upperLip.position.set(cx, 0.38, cz);

      const midBellows = new THREE.Mesh(hiResTorus(r * 0.93, 0.24, 10, 34), u.micRubberBootBlack);
      midBellows.rotation.x = Math.PI / 2;
      midBellows.position.set(cx, 0.02, cz);
      midBellows.userData.noEdges = true;

      const lowerLip = new THREE.Mesh(hiResTorus(r * 0.97, 0.46, 16, 36), mats.damperElastomer);
      lowerLip.rotation.x = Math.PI / 2;
      lowerLip.position.set(cx, -0.36, cz);

      // Inner tubular compression wall sealing top port to capsule roof + dual internal micro-beads
      const innerWall = new THREE.Mesh(
        hiResCyl(r * 0.78, r * 0.82, 1.42, 32, true),
        u.micRubberBootBlack
      );
      innerWall.position.set(cx, -0.02, cz);

      const topBead = new THREE.Mesh(hiResTorus(r * 0.78, 0.16, 10, 30), u.micRubberBootBlack);
      topBead.rotation.x = Math.PI / 2;
      topBead.position.set(cx, 0.66, cz);
      topBead.userData.noEdges = true;

      const botBead = new THREE.Mesh(hiResTorus(r * 0.81, 0.14, 10, 30), u.micRubberBootBlack);
      botBead.rotation.x = Math.PI / 2;
      botBead.position.set(cx, -0.66, cz);
      botBead.userData.noEdges = true;

      // Opposed molded anti-rotation assembly keying tabs
      for (const side of [-1, 1]) {
        const keyTab = new THREE.Mesh(
          createChamferedBoxGeo(1.05, 0.44, 0.85, 0.18, 0.05, 'y'),
          mats.damperElastomer
        );
        keyTab.position.set(cx + side * (r + 0.55), 0.02, cz);
        keyTab.userData.noEdges = true;
        g.add(keyTab);
      }

      g.add(upperLip, midBellows, lowerLip, innerWall, topBead, botBead);
    }

    parts.push(
      finalizeMicPart(
        'mc-silicone-acoustic-gasket',
        7,
        '#f43f5e',
        g,
        new THREE.Vector3(0, 5.6, 0),
        new THREE.Vector3(0, 6.2, 5.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC08. Sony OEM Shock-Isolating Microphone Rubber Boot (Ref.304 / 502687801)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic Sony OEM RUBBER (885) 502687801: matte charcoal Shore-40A shock-isolation elastomer
    for (const [cx, isRect] of [
      [LX, true],
      [RX, false],
    ] as Array<[number, boolean]>) {
      if (isRect) {
        const sleeveGeo = extrudeHiRes(
          createFrameShape(13.8, 11.4, 2.2, 10.7, 8.3, 1.3),
          5.8,
          0.22,
          0.22,
          2,
          24
        );
        sleeveGeo.rotateX(-Math.PI / 2);
        applyBoxUVs(sleeveGeo, 8.0);
        const sleeve = new THREE.Mesh(sleeveGeo, u.micRubberBootBlack);
        sleeve.position.set(cx, 0, FZ);
        // 4 deep molded shock-absorbing accordion isolation ribs minimizing chassis contact
        for (const ry of [-2.0, -0.68, 0.68, 2.0]) {
          const rib = makeHiResHorizPlate(
            createFrameShape(15.0, 12.6, 2.5, 13.4, 11.0, 2.0),
            0.46,
            mats.butylDamperRubber,
            0.12,
            2,
            24
          );
          rib.position.set(cx, ry, FZ);
          rib.userData.noEdges = true;
          g.add(rib);
        }
        // Molded top acoustic lip flange + 4 corner decoupling bumper feet + rear lead exit grommet
        const topCollar = makeHiResHorizPlate(
          createFrameShape(13.0, 10.6, 2.0, 9.6, 7.2, 1.2),
          0.46,
          u.micRubberBootBlack,
          0.1,
          2,
          20
        );
        topCollar.position.set(cx, 3.06, FZ);
        for (const [bx, bz] of [
          [-5.6, -4.4],
          [5.6, -4.4],
          [-5.6, 4.4],
          [5.6, 4.4],
        ]) {
          const foot = new THREE.Mesh(hiResSphere(0.75, 12, 10), mats.butylDamperRubber);
          foot.scale.set(1.0, 0.62, 1.0);
          foot.position.set(cx + bx, -3.02, FZ + bz);
          foot.userData.noEdges = true;
          g.add(foot);
        }
        const strainNotch = new THREE.Mesh(
          createChamferedBoxGeo(3.6, 1.45, 1.15, 0.3, 0.08, 'y'),
          u.micRubberBootBlack
        );
        strainNotch.position.set(cx, -2.15, FZ - 5.95);
        strainNotch.userData.noEdges = true;
        g.add(sleeve, topCollar, strainNotch);
      } else {
        // Right ECM cylindrical 240° cutaway rubber boot with thick lathe wall & molded bellows ribs
        const prof: THREE.Vector2[] = [
          new THREE.Vector2(5.7, -3.15),
          new THREE.Vector2(6.55, -3.15),
          new THREE.Vector2(6.68, -2.5),
          new THREE.Vector2(6.68, 2.5),
          new THREE.Vector2(6.55, 3.15),
          new THREE.Vector2(5.7, 3.15),
          new THREE.Vector2(5.62, 2.4),
          new THREE.Vector2(5.62, -2.4),
          new THREE.Vector2(5.7, -3.15),
        ];
        const cylGeo = markHiRes(new THREE.LatheGeometry(prof, 38, Math.PI * 0.28, Math.PI * 1.44));
        cylGeo.computeVertexNormals();
        applyBoxUVs(cylGeo, 8.0);
        const cylSleeve = new THREE.Mesh(cylGeo, u.micRubberBootBlack);
        cylSleeve.position.set(cx, 0, FZ);

        for (const ry of [-2.0, -0.68, 0.68, 2.0]) {
          const ring = new THREE.Mesh(
            hiResTorus(6.80, 0.31, 12, 34, Math.PI * 1.44),
            mats.butylDamperRubber
          );
          ring.rotation.x = Math.PI / 2;
          ring.rotation.z = Math.PI * 0.78;
          ring.position.set(cx, ry, FZ);
          ring.userData.noEdges = true;
          g.add(ring);
        }
        // Molded top compression acoustic rim + 3 decoupling base bumper pads + rear strain boss
        const topRim = new THREE.Mesh(
          hiResTorus(6.1, 0.24, 10, 32, Math.PI * 1.44),
          u.micRubberBootBlack
        );
        topRim.rotation.x = Math.PI / 2;
        topRim.rotation.z = Math.PI * 0.78;
        topRim.position.set(cx, 3.18, FZ);
        topRim.userData.noEdges = true;
        for (const ang of [-Math.PI * 0.6, 0, Math.PI * 0.6]) {
          const nub = new THREE.Mesh(hiResSphere(0.68, 12, 10), mats.butylDamperRubber);
          nub.scale.set(1.0, 0.58, 1.0);
          nub.position.set(cx + Math.sin(ang) * 6.0, -3.22, FZ - Math.cos(ang) * 6.0);
          nub.userData.noEdges = true;
          g.add(nub);
        }
        g.add(cylSleeve, topRim);
      }
    }

    parts.push(
      finalizeMicPart(
        'mc-oem-rubber-boot',
        8,
        '#272b32',
        g,
        new THREE.Vector3(0, 1.5, 0),
        new THREE.Vector3(0, 4.5, 11.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC09. Sony OEM MIC HOLDER (89100) Bracket (Ref.308 / 502790401)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded >PC-GF30< twin-cradle carrier displaying authentic SONY 89100 / 502790401 cavity legend!
    const bridge = makeTexturedHorizPlate(
      createRoundedRectShape(43.4, 6.6, 1.8),
      43.4,
      6.6,
      1.55,
      u.micOemHolderResin,
      0.14,
      24
    );
    bridge.position.set(0, -1.6, FZ - 4.8);

    // 6 tapered injection-molded stiffening gusset ribs + rear cable-routing retention hooks
    for (const rx of [-7.8, -5.0, -2.4, 2.4, 5.0, 7.8]) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(0.58, 1.85, 5.4, 0.12, 0.04, 'y'),
        mats.mountPpsInsulator
      );
      rib.position.set(rx, -0.65, FZ - 4.8);
      rib.userData.noEdges = true;
      g.add(rib);
    }
    for (const hx of [-6.4, 6.4]) {
      const hook = new THREE.Mesh(
        createChamferedBoxGeo(2.4, 0.72, 1.15, 0.18, 0.05, 'y'),
        mats.mountPpsInsulator
      );
      hook.position.set(hx, -1.25, FZ - 8.2);
      hook.userData.noEdges = true;
      g.add(hook);
    }

    // Two contoured cradle retention yokes with side cheek flanges & snap-retention detent pawls
    for (const cx of [LX, RX]) {
      const yokeBack = new THREE.Mesh(
        createChamferedBoxGeo(15.4, 7.0, 1.65, 0.8, 0.14, 'z'),
        mats.mountPpsInsulator
      );
      yokeBack.position.set(cx, 0.85, FZ - 6.85);
      const yokeBottom = new THREE.Mesh(
        createChamferedBoxGeo(15.4, 1.25, 10.8, 0.9, 0.12, 'y'),
        mats.mountPpsInsulator
      );
      yokeBottom.position.set(cx, -2.85, FZ - 1.8);
      const outerSign = cx < 0 ? -1 : 1;
      const cheek = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 5.2, 7.2, 0.5, 0.1, 'y'),
        mats.mountPpsInsulator
      );
      cheek.position.set(cx + outerSign * 7.65, -0.3, FZ - 3.6);
      // Molded snap-fit retention pawl tab gripping top edge of rubber boot
      const pawl = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.78, 1.45, 0.2, 0.06, 'y'),
        mats.matteBlackAnodized
      );
      pawl.position.set(cx, 4.18, FZ - 6.2);
      pawl.userData.noEdges = true;
      // Molded ejector-pin witness boss on cradle floor
      const ejPin = new THREE.Mesh(hiResTorus(1.1, 0.09, 8, 18), mats.titaniumRivet);
      ejPin.rotation.x = Math.PI / 2;
      ejPin.position.set(cx, -2.2, FZ - 1.5);
      ejPin.userData.noEdges = true;
      g.add(yokeBack, yokeBottom, cheek, pawl, ejPin);
    }

    // Central mounting boss tab with heat-staked diamond-knurled brass threaded insert for Ref.309 BTITE screw
    const bossTab = new THREE.Mesh(hiResCyl(3.3, 3.68, 2.28, 26), mats.mountPpsInsulator);
    bossTab.position.set(0, -1.4, FZ - 1.0);
    const brassInsert = new THREE.Mesh(hiResCyl(1.62, 1.62, 2.40, 22), mats.brassGear);
    brassInsert.position.set(0, -1.4, FZ - 1.0);
    brassInsert.userData.noEdges = true;
    // Chamfered knurl collar ring on brass insert
    const knurlRing = new THREE.Mesh(hiResTorus(1.56, 0.16, 8, 24), mats.goldPlating);
    knurlRing.rotation.x = Math.PI / 2;
    knurlRing.position.set(0, -0.22, FZ - 1.0);
    knurlRing.userData.noEdges = true;
    const screwHole = new THREE.Mesh(hiResCyl(1.05, 1.05, 2.48, 16), mats.matteBlackAnodized);
    screwHole.position.set(0, -1.4, FZ - 1.0);
    screwHole.userData.noEdges = true;
    g.add(bridge, bossTab, brassInsert, knurlRing, screwHole);

    parts.push(
      finalizeMicPart(
        'mc-oem-mic-holder',
        9,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(0, -2.5, -13.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC10. Sony OEM BTITE 1.4×5.0 mm Precision Screw (Ref.309 / 430010611)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Watchmaker Lathe-turned camera-head (CH) Phillips #0 self-tapping BTITE screw!
    const screw = buildPhillipsScrew(
      2.18,
      1.08,
      0.92,
      8.1,
      u.micOemScrewSteel,
      mats.matteBlackAnodized,
      mats.stainlessMachined
    );
    // Captive serrated conical spring lock-washer flange under head (12 anti-vibration teeth!)
    const washer = new THREE.Mesh(hiResTorus(1.48, 0.2, 10, 28), mats.stainlessMachined);
    washer.rotation.x = Math.PI / 2;
    washer.position.y = 0.16;
    washer.userData.noEdges = true;
    const toothGeo = createChamferedBoxGeo(0.28, 0.12, 0.44, 0.04, 0.01, 'y');
    const teeth = new THREE.InstancedMesh(toothGeo, u.micOemScrewSteel, 12);
    const dmT = new THREE.Object3D();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      dmT.position.set(Math.cos(a) * 1.48, 0.02, Math.sin(a) * 1.48);
      dmT.rotation.set(0, -a + 0.25, 0);
      dmT.updateMatrix();
      teeth.setMatrixAt(i, dmT.matrix);
    }
    teeth.instanceMatrix.needsUpdate = true;
    teeth.userData.noEdges = true;
    // 8 crisp self-tapping trilobular B-Tite thread pitch ridges along shank + tapered pilot nose
    const thrGeo = hiResTorus(0.98, 0.11, 8, 22);
    thrGeo.rotateX(Math.PI / 2);
    const threads = new THREE.InstancedMesh(thrGeo, u.micOemScrewSteel, 8);
    for (let i = 0; i < 8; i++) {
      dmT.position.set(0, -1.15 - i * 0.78, 0);
      dmT.rotation.set(0.08, i * 0.4, 0);
      dmT.updateMatrix();
      threads.setMatrixAt(i, dmT.matrix);
    }
    threads.instanceMatrix.needsUpdate = true;
    threads.userData.noEdges = true;
    const pilotTip = new THREE.Mesh(hiResCyl(0.84, 0.34, 0.9, 18), u.micOemScrewSteel);
    pilotTip.position.y = -7.8;
    pilotTip.userData.noEdges = true;
    g.add(screw, washer, teeth, threads, pilotTip);

    parts.push(
      finalizeMicPart(
        'mc-oem-btite-screw',
        10,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, -2.4, FZ - 1.0),
        new THREE.Vector3(0, -9.5, -15.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC11. Sony OEM TAPE (631S #25) Acoustic / Light / EMI Black Sealing Tape
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic Teraoka 631S #25 matte woven black acetate/polyester cloth tape with L-folded light-trap flaps
    const stripGeo = extrudeHiRes(createRoundedRectShape(38.4, 6.4, 0.6), 0.24, 0.03, 0.03, 1, 14);
    stripGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(stripGeo, 8.0);
    const strip1 = new THREE.Mesh(stripGeo, u.micTeraoka631sTape);
    strip1.position.set(0, 0, FZ - 8.2);

    // Subtle die-cut pressure-crease alignment score lines across top surface of tape
    for (const sx of [-12.5, 0, 12.5]) {
      const crease = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 6.0), mats.matteBlackAnodized);
      crease.position.set(sx, 0.14, FZ - 8.2);
      crease.userData.noEdges = true;
      g.add(crease);
    }

    // Folded vertical rear flaps sealing the cable routing notch with smooth hinge radius & pull corners
    for (const fx of [-7.4, 7.4]) {
      const flapGeo = createChamferedBoxGeo(10.2, 4.9, 0.24, 0.4, 0.03, 'z');
      applyBoxUVs(flapGeo, 8.0);
      const flap = new THREE.Mesh(flapGeo, u.micTeraoka631sTape);
      flap.position.set(fx, -2.35, FZ - 11.25);
      const hinge = new THREE.Mesh(hiResCyl(0.28, 0.28, 10.0, 12), u.micTeraoka631sTape);
      hinge.rotation.z = Math.PI / 2;
      hinge.position.set(fx, -0.05, FZ - 11.2);
      hinge.userData.noEdges = true;
      const psaLip = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.35, 0.08), mats.opticalCementClear);
      psaLip.position.set(fx, -4.65, FZ - 11.10);
      psaLip.userData.noEdges = true;
      g.add(flap, hinge, psaLip);
    }
    // Thin conductive aluminum-backing EMI foil seam peek + translucent acrylic PSA adhesive edge
    const foilBack = new THREE.Mesh(new THREE.BoxGeometry(37.6, 0.09, 5.8), mats.emiShieldFilm);
    foilBack.position.set(0, -0.15, FZ - 8.2);
    foilBack.userData.noEdges = true;
    const psaEdge = new THREE.Mesh(new THREE.BoxGeometry(38.1, 0.06, 6.2), mats.opticalCementClear);
    psaEdge.position.set(0, -0.20, FZ - 8.2);
    psaEdge.userData.noEdges = true;
    g.add(strip1, foilBack, psaEdge);

    parts.push(
      finalizeMicPart(
        'mc-oem-631s-sealing-tape',
        11,
        '#14171d',
        g,
        new THREE.Vector3(0, 3.8, 0),
        new THREE.Vector3(0, 7.5, -18.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // MC12. High-Damping Poron 4790-79 / LE-20 Micro-Cellular Urethane Vibration Pad
  // =========================================================================
  {
    const g = new THREE.Group();
    const padGeo = extrudeHiRes(createFrameShape(44.2, 24.2, 2.6, 14.0, 6.2, 1.4), 1.35, 0.14, 0.14, 2, 22);
    padGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(padGeo, 12.0);
    const padMain = new THREE.Mesh(padGeo, u.micAcousticFelt);

    // Laminated glossy PET dimensional-stability backing carrier sheet on top of Poron foam
    const petCarrier = makeHiResHorizPlate(
      createFrameShape(43.2, 23.2, 2.3, 14.6, 6.8, 1.4),
      0.12,
      u.micTeraoka631sTape,
      0.02,
      1,
      20
    );
    petCarrier.position.y = 0.72;
    petCarrier.userData.noEdges = true;

    // Molded anechoic triangular prism acoustic damping ridges on underside
    const wedgeShape = new THREE.Shape();
    wedgeShape.moveTo(-1.15, 0);
    wedgeShape.lineTo(1.15, 0);
    wedgeShape.lineTo(0, -0.78);
    wedgeShape.closePath();
    const wedgeGeo = extrudeHiRes(wedgeShape, 19.2, 0.04, 0.04, 1, 6);
    const wedgeInst = new THREE.InstancedMesh(wedgeGeo, mats.velvetFlockTrap, 11);
    const dm = new THREE.Object3D();
    for (let i = -5; i <= 5; i++) {
      dm.position.set(i * 3.6, -0.66, 0);
      dm.updateMatrix();
      wedgeInst.setMatrixAt(i + 5, dm.matrix);
    }
    wedgeInst.instanceMatrix.needsUpdate = true;
    wedgeInst.userData.noEdges = true;

    // 4 dual-stage elastomeric corner isolation bumpers with stainless compression-limiter sleeves
    for (const sx of [-19.0, 19.0]) {
      for (const sz of [-9.2, 9.2]) {
        const boss = new THREE.Mesh(hiResCyl(1.78, 1.96, 0.52, 18), u.micRubberBootBlack);
        boss.position.set(sx, 0.88, sz);
        boss.userData.noEdges = true;
        const limiter = new THREE.Mesh(hiResCyl(0.86, 0.86, 0.62, 14), mats.stainlessMachined);
        limiter.position.set(sx, 0.90, sz);
        limiter.userData.noEdges = true;
        const hole = new THREE.Mesh(hiResCyl(0.52, 0.52, 0.68, 12), mats.matteBlackAnodized);
        hole.position.set(sx, 0.90, sz);
        hole.userData.noEdges = true;
        g.add(boss, limiter, hole);
      }
    }
    g.add(padMain, petCarrier, wedgeInst);

    parts.push(
      finalizeMicPart(
        'mc-chassis-vib-absorber',
        12,
        '#475569',
        g,
        new THREE.Vector3(0, -4.4, -1.5),
        new THREE.Vector3(0, -8.5, -5.0),
        cp,
        0.16
      )
    );
  }

  // =========================================================================
  // LEFT CHANNEL CUTAWAY (x = -14.2): SILICON MEMS + SDM (MC13–MC20)
  // =========================================================================

  // MC13. MEMS Faraday-Cage Metal Shield Lid & Top Acoustic Port (Cutaway!)
  {
    const g = new THREE.Group();
    const W = 10.4;
    const D = 8.0;
    const H = 4.6;

    // Top brushed nickel-silver Faraday roof with true circular top acoustic port hole + IM73A135V01 laser markings!
    const roofShape = createRoundedRectShape(W, D, 0.75);
    const portHole = new THREE.Path();
    portHole.absarc(-1.8, 0, 1.55, 0, Math.PI * 2, true);
    roofShape.holes.push(portHole);
    const roof = makeTexturedHorizPlate(roofShape, W, D, 0.52, u.micMemsFaradayLid, 0.06, 28);
    roof.position.y = H * 0.5;

    // Rolled gold acoustic port bezel collar + inner chamfered acoustic impedance funnel sleeve
    const portCollar = new THREE.Mesh(hiResTorus(1.64, 0.15, 10, 30), mats.goldPlating);
    portCollar.rotation.x = Math.PI / 2;
    portCollar.position.set(-1.8, H * 0.5 + 0.25, 0);
    portCollar.userData.noEdges = true;
    const portFunnel = new THREE.Mesh(hiResCyl(1.48, 1.32, 0.78, 26, true), mats.brassGear);
    portFunnel.position.set(-1.8, H * 0.5 - 0.14, 0);
    portFunnel.userData.noEdges = true;
    const outerPortRing = new THREE.Mesh(hiResTorus(2.02, 0.06, 8, 28), mats.stainlessMachined);
    outerPortRing.rotation.x = Math.PI / 2;
    outerPortRing.position.set(-1.8, H * 0.5 + 0.27, 0);
    outerPortRing.userData.noEdges = true;

    // Precision stamped 3-sided Faraday cutaway walls (+Z front left open for macro cutaway view!)
    const backWall = new THREE.Mesh(
      createChamferedBoxGeo(W, H, 0.52, 0.12, 0.05, 'z'),
      mats.emiShieldCan
    );
    backWall.position.set(0, 0, -D * 0.5 + 0.26);
    const leftWall = new THREE.Mesh(
      createChamferedBoxGeo(0.52, H, D, 0.12, 0.05, 'y'),
      mats.emiShieldCan
    );
    leftWall.position.set(-W * 0.5 + 0.26, 0, 0);
    const rightWall = new THREE.Mesh(
      createChamferedBoxGeo(0.52, H, D, 0.12, 0.05, 'y'),
      mats.emiShieldCan
    );
    rightWall.position.set(W * 0.5 - 0.26, 0, 0);

    // Internal corner stiffening gussets & stamped EMI grounding dimples along back/side walls
    for (const gx of [-W * 0.5 + 0.62, W * 0.5 - 0.62]) {
      const gusset = new THREE.Mesh(hiResCyl(0.28, 0.28, H - 0.55, 12), mats.stainlessMachined);
      gusset.position.set(gx, 0, -D * 0.5 + 0.62);
      gusset.userData.noEdges = true;
      g.add(gusset);
    }
    for (const dx of [-2.4, 2.4]) {
      const dimple = new THREE.Mesh(hiResSphere(0.28, 10, 8), mats.stainlessMachined);
      dimple.scale.set(1.4, 0.85, 0.55);
      dimple.position.set(dx, -0.65, -D * 0.5 - 0.02);
      dimple.userData.noEdges = true;
      g.add(dimple);
    }
    for (const sx of [-1, 1]) {
      const sideDimple = new THREE.Mesh(hiResSphere(0.26, 10, 8), mats.stainlessMachined);
      sideDimple.scale.set(0.55, 0.85, 1.4);
      sideDimple.position.set(sx * (W * 0.5 + 0.02), -0.65, -0.5);
      sideDimple.userData.noEdges = true;
      g.add(sideDimple);
    }

    // ENIG gold perimeter grounding solder flange + continuous reflowed SAC305 silver solder fillet + Pin-1 lug
    const gndRim = makeHiResHorizPlate(
      createFrameShape(W, D, 0.75, W - 1.05, D - 1.05, 0.45),
      0.26,
      mats.goldPlating,
      0.03,
      1,
      20
    );
    gndRim.position.y = -H * 0.5;
    const solderFillet = makeHiResHorizPlate(
      createFrameShape(W + 0.24, D + 0.24, 0.82, W - 0.18, D - 0.18, 0.68),
      0.16,
      mats.solderBallSilver,
      0.04,
      1,
      20
    );
    solderFillet.position.y = -H * 0.5 - 0.04;
    solderFillet.userData.noEdges = true;
    const pin1Lug = new THREE.Mesh(
      createChamferedBoxGeo(0.72, 0.22, 0.72, 0.08, 0.02, 'y'),
      mats.goldPlating
    );
    pin1Lug.position.set(-W * 0.5 + 0.65, H * 0.5 + 0.22, D * 0.5 - 0.65);
    pin1Lug.userData.noEdges = true;
    g.add(roof, portCollar, portFunnel, outerPortRing, backWall, leftWall, rightWall, gndRim, solderFillet, pin1Lug);

    parts.push(
      finalizeMicPart(
        'mc-mems-faraday-lid',
        13,
        '#94a3b8',
        g,
        new THREE.Vector3(LX, 2.0, FZ),
        new THREE.Vector3(-12.5, 9.2, 5.5),
        cp
      )
    );
  }

  // MC14. 0.8 μm Corrugated Polysilicon MEMS Diaphragm
  {
    const g = new THREE.Group();
    const memGeo = hiResCyl(2.68, 2.68, 0.2, 36);
    applyPlanarUVs(memGeo, 5.36, 5.36, 'xz');
    const membrane = new THREE.Mesh(memGeo, u.micMemsSiliconDiaphragm);

    // 4 alternating crest/trough 3D sinusoidal stress-relief corrugation wave rings!
    for (const [r, tube, dy, mat] of [
      [0.86, 0.085, 0.09, mats.siliconPhotodiode],
      [1.32, 0.095, -0.04, mats.gatePolysilicon],
      [1.78, 0.11, 0.09, mats.siliconPhotodiode],
      [2.26, 0.115, -0.04, mats.gatePolysilicon],
    ] as Array<[number, number, number, THREE.Material]>) {
      const corr = new THREE.Mesh(hiResTorus(r, tube, 12, 36), mat);
      corr.rotation.x = Math.PI / 2;
      corr.position.y = dy;
      corr.userData.noEdges = true;
      g.add(corr);
    }

    // Central gold capacitive sensing electrode disc + micro-contact hub
    const centerDisc = new THREE.Mesh(hiResCyl(0.56, 0.56, 0.08, 24), mats.goldPlating);
    centerDisc.position.y = 0.11;
    centerDisc.userData.noEdges = true;
    const centerHub = new THREE.Mesh(hiResTorus(0.56, 0.045, 8, 24), mats.copperCoil);
    centerHub.rotation.x = Math.PI / 2;
    centerHub.position.y = 0.12;
    centerHub.userData.noEdges = true;

    // 8 radial S-flexure anchor beams + 8 interleaved Knowles-style perimeter edge-stiffening fingers
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const flexPts = [
        new THREE.Vector3(Math.cos(a) * 2.28, 0.08, Math.sin(a) * 2.28),
        new THREE.Vector3(Math.cos(a + 0.09) * 2.48, 0.1, Math.sin(a + 0.09) * 2.48),
        new THREE.Vector3(Math.cos(a - 0.08) * 2.66, 0.08, Math.sin(a - 0.08) * 2.66),
        new THREE.Vector3(Math.cos(a) * 2.78, 0.06, Math.sin(a) * 2.78),
      ];
      const flex = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(flexPts), 14, 0.065, 6, false)),
        mats.goldPlating
      );
      flex.userData.noEdges = true;
      // Interleaved Knowles edge-stiffening polysilicon rib finger
      const sa = a + Math.PI / 8;
      const stiffener = new THREE.Mesh(
        createChamferedBoxGeo(0.54, 0.12, 0.14, 0.03, 0.01, 'y'),
        mats.siliconSensorDie
      );
      stiffener.position.set(Math.cos(sa) * 2.46, 0.08, Math.sin(sa) * 2.46);
      stiffener.rotation.y = -sa;
      stiffener.userData.noEdges = true;
      g.add(flex, stiffener);
    }
    // Stepped notched gold clamping anchor ring
    const anchorRim = new THREE.Mesh(hiResTorus(2.78, 0.21, 12, 36), mats.goldPlating);
    anchorRim.rotation.x = Math.PI / 2;
    const clampLip = new THREE.Mesh(hiResTorus(2.64, 0.08, 8, 36), mats.copperCoil);
    clampLip.rotation.x = Math.PI / 2;
    clampLip.position.y = 0.15;
    clampLip.userData.noEdges = true;
    g.add(membrane, centerDisc, centerHub, anchorRim, clampLip);

    parts.push(
      finalizeMicPart(
        'mc-mems-si-diaphragm',
        14,
        '#0ea5e9',
        g,
        new THREE.Vector3(LX - 1.8, 3.05, FZ),
        new THREE.Vector3(-15.5, 6.4, 8.5),
        cp,
        0.16
      )
    );
  }

  // MC15. ~2 μm Capacitor Air-Gap & Si₃N₄ Anti-Stiction Micro-Dimples
  {
    const g = new THREE.Group();
    // Optical-clear dielectric perimeter spacer ring defining the 2 μm capacitive sense gap
    const gapRing = new THREE.Mesh(hiResTorus(2.65, 0.2, 12, 36), mats.opticalCementClear);
    gapRing.rotation.x = Math.PI / 2;
    // Driven gold electrostatic guard-ring trace + 4 radial gap-calibration gauge tabs
    const guardTrace = new THREE.Mesh(hiResTorus(2.38, 0.065, 8, 36), mats.goldPlating);
    guardTrace.rotation.x = Math.PI / 2;
    guardTrace.position.y = 0.09;
    guardTrace.userData.noEdges = true;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(0.42, 0.14, 0.26, 0.04, 0.01, 'y'),
        mats.goldPlating
      );
      tab.position.set(Math.cos(a) * 2.74, 0.02, Math.sin(a) * 2.74);
      tab.rotation.y = -a;
      tab.userData.noEdges = true;
      g.add(tab);
    }

    // 36 spherical Si3N4 anti-stiction micro-dimple bumps in 3 concentric rings + stress-relief polysilicon bosses!
    const dimpleGeo = hiResSphere(0.125, 12, 10);
    const bossGeo = hiResCyl(0.18, 0.2, 0.07, 12);
    const dimpleInst = new THREE.InstancedMesh(dimpleGeo, mats.siliconNitrideBall, 36);
    const bossInst = new THREE.InstancedMesh(bossGeo, mats.gatePolysilicon, 36);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (const [count, rad, phase] of [
      [6, 0.72, 0],
      [12, 1.42, Math.PI / 12],
      [18, 2.08, Math.PI / 18],
    ]) {
      for (let i = 0; i < count; i++) {
        const ang = (i / count) * Math.PI * 2 + phase;
        const px = Math.cos(ang) * rad;
        const pz = Math.sin(ang) * rad;
        dm.position.set(px, 0.04, pz);
        dm.updateMatrix();
        dimpleInst.setMatrixAt(idx, dm.matrix);
        dm.position.set(px, -0.06, pz);
        dm.updateMatrix();
        bossInst.setMatrixAt(idx, dm.matrix);
        idx++;
      }
    }
    dimpleInst.instanceMatrix.needsUpdate = true;
    dimpleInst.userData.noEdges = true;
    bossInst.instanceMatrix.needsUpdate = true;
    bossInst.userData.noEdges = true;
    g.add(gapRing, guardTrace, dimpleInst, bossInst);

    parts.push(
      finalizeMicPart(
        'mc-mems-antistiction-gap',
        15,
        '#38bdf8',
        g,
        new THREE.Vector3(LX - 1.8, 2.55, FZ),
        new THREE.Vector3(-17.0, 4.0, 10.5),
        cp,
        0.15
      )
    );
  }

  // MC16. Perforated Rigid Silicon Backplate Fixed Electrode
  {
    const g = new THREE.Group();
    // True 19-hole hexagonal honeycomb acoustic ventilation perforations with bespoke DRIE silicon texture!
    const holeCoords: Array<[number, number]> = [[0, 0]];
    for (let ring = 1; ring <= 2; ring++) {
      const n = ring * 6;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        holeCoords.push([Math.cos(a) * ring * 0.9, Math.sin(a) * ring * 0.9]);
      }
    }
    const plate = makePerforatedDisc(2.74, holeCoords, 0.24, 0.42, u.micDrieSiliconBackplate, 0.03);

    // 19 instanced chamfered gold/polysilicon acoustic vent rim collars
    const rimGeo = hiResTorus(0.26, 0.038, 8, 16);
    rimGeo.rotateX(Math.PI / 2);
    const rimInst = new THREE.InstancedMesh(rimGeo, mats.goldPlating, holeCoords.length);
    const dm = new THREE.Object3D();
    for (let i = 0; i < holeCoords.length; i++) {
      dm.position.set(holeCoords[i][0], 0.22, holeCoords[i][1]);
      dm.updateMatrix();
      rimInst.setMatrixAt(i, dm.matrix);
    }
    rimInst.instanceMatrix.needsUpdate = true;
    rimInst.userData.noEdges = true;

    // Dual concentric gold bias electrode rings + 6 radial current-collection spokes + SiO2 moat trench
    const biasRing = new THREE.Mesh(hiResTorus(2.62, 0.11, 10, 34), mats.goldPlating);
    biasRing.rotation.x = Math.PI / 2;
    biasRing.position.y = 0.22;
    biasRing.userData.noEdges = true;
    const innerBiasRing = new THREE.Mesh(hiResTorus(1.36, 0.055, 8, 30), mats.goldPlating);
    innerBiasRing.rotation.x = Math.PI / 2;
    innerBiasRing.position.y = 0.23;
    innerBiasRing.userData.noEdges = true;
    const isoTrench = new THREE.Mesh(hiResTorus(2.38, 0.045, 8, 32), mats.siliconDramLayer);
    isoTrench.rotation.x = Math.PI / 2;
    isoTrench.position.y = 0.22;
    isoTrench.userData.noEdges = true;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.05, 0.08), mats.goldPlating);
      spoke.position.set(Math.cos(a) * 1.98, 0.23, Math.sin(a) * 1.98);
      spoke.rotation.y = -a;
      spoke.userData.noEdges = true;
      g.add(spoke);
    }

    // Elevated ENIG gold wirebond lead-out pad crowned with sculpted gold ball-stud bump
    const bondPad = new THREE.Mesh(
      createChamferedBoxGeo(0.68, 0.16, 0.68, 0.08, 0.02, 'y'),
      mats.goldPlating
    );
    bondPad.position.set(2.55, 0.24, 0);
    bondPad.userData.noEdges = true;
    const studBump = new THREE.Mesh(hiResSphere(0.14, 10, 8), mats.goldPlating);
    studBump.scale.set(1.0, 0.72, 1.0);
    studBump.position.set(2.55, 0.36, 0);
    studBump.userData.noEdges = true;
    g.add(plate, rimInst, biasRing, innerBiasRing, isoTrench, bondPad, studBump);

    parts.push(
      finalizeMicPart(
        'mc-mems-perforated-backplate',
        16,
        '#eab308',
        g,
        new THREE.Vector3(LX - 1.8, 2.0, FZ),
        new THREE.Vector3(-17.5, 1.5, 10.0),
        cp,
        0.18
      )
    );
  }

  // MC17. Next-Gen Sealed-Dual-Membrane (SDM) Low-Pressure Vacuum Cell (73 dBA SNR!)
  {
    const g = new THREE.Group();
    // Translucent cyan low-pressure sealed vacuum chamber + Infineon inclined dual-etch clamping bezel!
    const vacRing = new THREE.Mesh(hiResCyl(2.44, 2.44, 0.62, 34), mats.vcWorkingFluidCyan);
    const anchorProf: THREE.Vector2[] = [
      new THREE.Vector2(2.42, -0.34),
      new THREE.Vector2(2.74, -0.34),
      new THREE.Vector2(2.68, 0.04),
      new THREE.Vector2(2.52, 0.34),
      new THREE.Vector2(2.38, 0.34),
      new THREE.Vector2(2.42, -0.34),
    ];
    const anchorGeo = markHiRes(new THREE.LatheGeometry(anchorProf, 36));
    anchorGeo.computeVertexNormals();
    const inclinedAnchor = new THREE.Mesh(anchorGeo, mats.siliconBulk);
    const sealBand = new THREE.Mesh(hiResTorus(2.52, 0.12, 10, 34), mats.goldPlating);
    sealBand.rotation.x = Math.PI / 2;
    sealBand.position.y = 0.32;
    sealBand.userData.noEdges = true;
    const botSeal = new THREE.Mesh(hiResTorus(2.68, 0.1, 10, 34), mats.copperCoil);
    botSeal.rotation.x = Math.PI / 2;
    botSeal.position.y = -0.34;
    botSeal.userData.noEdges = true;

    // Lower push-pull corrugated polysilicon diaphragm + underside twin corrugations
    const lowerGeo = hiResCyl(2.68, 2.68, 0.22, 34);
    applyPlanarUVs(lowerGeo, 5.36, 5.36, 'xz');
    const lowerDiaph = new THREE.Mesh(lowerGeo, u.micMemsSiliconDiaphragm);
    lowerDiaph.position.y = -0.44;
    for (const r of [1.15, 1.92]) {
      const cRing = new THREE.Mesh(hiResTorus(r, 0.08, 8, 30), mats.siliconPhotodiode);
      cRing.rotation.x = Math.PI / 2;
      cRing.position.y = -0.54;
      cRing.userData.noEdges = true;
      g.add(cRing);
    }

    // Infineon SDM 3-zone graded radial coupling pillars (inner 30%, mid 65%, outer 86% radius!)
    const pilGeo = hiResCyl(0.11, 0.11, 1.08, 10);
    const pilZones: Array<[number, number, number]> = [
      [6, 0.78, 1.25],
      [8, 1.56, 1.0],
      [12, 2.18, 0.74],
    ];
    const totalPil = 6 + 8 + 12;
    const pilInst = new THREE.InstancedMesh(pilGeo, mats.goldPlating, totalPil);
    const dm = new THREE.Object3D();
    let pIdx = 0;
    for (const [cnt, rad, rScale] of pilZones) {
      for (let i = 0; i < cnt; i++) {
        const a = (i / cnt) * Math.PI * 2 + (cnt === 8 ? Math.PI / 8 : 0);
        dm.position.set(Math.cos(a) * rad, 0.08, Math.sin(a) * rad);
        dm.scale.set(rScale, 1.0, rScale);
        dm.updateMatrix();
        pilInst.setMatrixAt(pIdx++, dm.matrix);
      }
    }
    pilInst.instanceMatrix.needsUpdate = true;
    pilInst.userData.noEdges = true;
    g.add(vacRing, inclinedAnchor, sealBand, botSeal, lowerDiaph, pilInst);

    parts.push(
      finalizeMicPart(
        'mc-mems-sdm-vacuum-cell',
        17,
        '#06b6d4',
        g,
        new THREE.Vector3(LX - 1.8, 1.25, FZ),
        new THREE.Vector3(-16.5, -1.2, 9.0),
        cp,
        0.16
      )
    );
  }

  // MC18. DRIE Deep-Etched Silicon Acoustic Back-Volume Cavity
  {
    const g = new THREE.Group();
    // Bulk monocrystalline silicon MEMS die with true cylindrical Bosch-DRIE cavity + DRIE patterned top!
    const dieShape = createRoundedRectShape(5.85, 5.85, 0.35);
    const cavityHole = new THREE.Path();
    cavityHole.absarc(0, 0, 2.1, 0, Math.PI * 2, true);
    dieShape.holes.push(cavityHole);
    const dieBlock = makeTexturedHorizPlate(
      dieShape,
      5.85,
      5.85,
      1.56,
      u.micDrieSiliconBackplate,
      0.06,
      28
    );

    // Polished Bosch-DRIE scalloped vertical silicon cavity liner cutaway textured with SF6/C4F8 scallop bands!
    const linerGeo = hiResCyl(2.06, 2.06, 1.48, 32, true, Math.PI * 0.25, Math.PI * 1.5);
    const cavityLiner = new THREE.Mesh(linerGeo, u.micBoschScallopSi);
    for (let i = 0; i < 6; i++) {
      const sy = -0.62 + i * 0.248;
      const scallop = new THREE.Mesh(
        hiResTorus(2.03, 0.048, 8, 28, Math.PI * 1.5),
        i % 2 === 0 ? mats.siliconPhotodiode : mats.siliconDramLayer
      );
      scallop.rotation.x = Math.PI / 2;
      scallop.rotation.z = -Math.PI * 0.25;
      scallop.position.y = sy;
      scallop.userData.noEdges = true;
      g.add(scallop);
    }

    // Gold perimeter eutectic seal-ring + 4 corner wafer dicing-street fiducial crosses
    const sealRing = makeHiResHorizPlate(
      createFrameShape(5.5, 5.5, 0.25, 5.1, 5.1, 0.2),
      0.09,
      mats.goldPlating,
      0.01,
      1,
      12
    );
    sealRing.position.y = 0.81;
    sealRing.userData.noEdges = true;
    for (const [fx, fz] of [
      [-2.42, -2.42],
      [2.42, -2.42],
      [-2.42, 2.42],
      [2.42, 2.42],
    ]) {
      const barH = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.05, 0.08), mats.goldPlating);
      barH.position.set(fx, 0.82, fz);
      barH.userData.noEdges = true;
      const barV = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.36), mats.goldPlating);
      barV.position.set(fx, 0.82, fz);
      barV.userData.noEdges = true;
      g.add(barH, barV);
    }
    // Stepped bottom acoustic port solder collar ring
    const botFlange = new THREE.Mesh(hiResTorus(2.18, 0.14, 10, 30), mats.goldPlating);
    botFlange.rotation.x = Math.PI / 2;
    botFlange.position.y = -0.8;
    botFlange.userData.noEdges = true;
    g.add(dieBlock, cavityLiner, sealRing, botFlange);

    parts.push(
      finalizeMicPart(
        'mc-mems-drie-back-volume',
        18,
        '#334155',
        g,
        new THREE.Vector3(LX - 1.8, 0.15, FZ),
        new THREE.Vector3(-14.5, -4.0, 6.0),
        cp
      )
    );
  }

  // MC19. Co-Packaged 12 V Charge-Pump & 4th-Order ΔΣ PDM Readout ASIC Die
  {
    const g = new THREE.Group();
    // Bespoke photolithographic MEMS Readout ASIC bare silicon die with beveled edges
    const asicGeo = createChamferedBoxGeo(3.25, 1.15, 4.45, 0.14, 0.05, 'y');
    applyPlanarUVs(asicGeo, 3.25, 4.45, 'xz');
    const asicDie = new THREE.Mesh(asicGeo, u.micMemsAsicDie);

    // 6-stage MIM Dickson 12V Charge-Pump micro-cap ladder at rear (-Z)
    for (let i = 0; i < 6; i++) {
      const stage = new THREE.Mesh(
        createChamferedBoxGeo(0.34, 0.16 + i * 0.025, 0.96, 0.04, 0.01, 'y'),
        i % 2 === 0 ? mats.goldPlating : mats.copperCoil
      );
      stage.position.set(-0.98 + i * 0.39, 0.64 + i * 0.012, -1.48);
      stage.userData.noEdges = true;
      g.add(stage);
    }
    // Chopper-stabilized LNA differential core + 4th-order Continuous-Time ΔΣ Modulator + Bandgap/LDO block
    const preamp = new THREE.Mesh(createChamferedBoxGeo(2.35, 0.19, 0.98, 0.08, 0.02, 'y'), mats.vcWorkingFluidCyan);
    preamp.position.set(0, 0.65, -0.22);
    const dsm = new THREE.Mesh(createChamferedBoxGeo(1.48, 0.19, 1.02, 0.08, 0.02, 'y'), mats.ispSiliconDie);
    dsm.position.set(-0.46, 0.65, 1.08);
    const ldoBlk = new THREE.Mesh(createChamferedBoxGeo(0.76, 0.17, 1.02, 0.06, 0.02, 'y'), mats.copperCoil);
    ldoBlk.position.set(0.78, 0.64, 1.08);

    // Copper power & ground busbars along die inner spine
    for (const bx of [-1.18, 1.18]) {
      const bus = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.06, 3.85), mats.copperCoil);
      bus.position.set(bx, 0.60, 0);
      bus.userData.noEdges = true;
      g.add(bus);
    }

    // 12 ENIG gold perimeter wirebond landing pads crowned with sculpted gold stud bumps!
    const padGeo = new THREE.BoxGeometry(0.24, 0.08, 0.24);
    const bumpGeo = hiResSphere(0.085, 8, 6);
    const pads = new THREE.InstancedMesh(padGeo, mats.goldPlating, 12);
    const bumps = new THREE.InstancedMesh(bumpGeo, mats.goldPlating, 12);
    const dm = new THREE.Object3D();
    let bIdx = 0;
    for (const pz of [-1.68, -1.02, -0.34, 0.34, 1.02, 1.68]) {
      for (const px of [-1.42, 1.42]) {
        dm.position.set(px, 0.60, pz);
        dm.scale.set(1, 1, 1);
        dm.updateMatrix();
        pads.setMatrixAt(bIdx, dm.matrix);
        dm.position.set(px, 0.68, pz);
        dm.scale.set(1, 0.72, 1);
        dm.updateMatrix();
        bumps.setMatrixAt(bIdx, dm.matrix);
        bIdx++;
      }
    }
    pads.instanceMatrix.needsUpdate = true;
    pads.userData.noEdges = true;
    bumps.instanceMatrix.needsUpdate = true;
    bumps.userData.noEdges = true;
    g.add(asicDie, preamp, dsm, ldoBlk, pads, bumps);

    parts.push(
      finalizeMicPart(
        'mc-mems-readout-asic',
        19,
        '#8b5cf6',
        g,
        new THREE.Vector3(LX + 2.6, 0.55, FZ),
        new THREE.Vector3(-6.5, 2.2, 10.5),
        cp
      )
    );
  }

  // MC20. φ20 μm Gold Wirebonds & Multi-Layer Ceramic LGA Substrate
  {
    const g = new THREE.Group();
    // Bespoke multi-layer ceramic LGA substrate hosting MEMS & ASIC dies!
    const sub = makeTexturedHorizPlate(
      createRoundedRectShape(10.6, 8.2, 0.65),
      10.6,
      8.2,
      0.74,
      u.micCeramicLgaSubstrate,
      0.06,
      20
    );
    sub.position.y = -0.36;

    // 5 chamfered ENIG gold bottom LGA contact lands (VDD / GND / OUT / CLK / LR) + acoustic seal ring!
    for (let i = -2; i <= 2; i++) {
      const pad = new THREE.Mesh(
        createChamferedBoxGeo(1.42, 0.18, 1.85, 0.18, 0.02, 'y'),
        mats.goldPlating
      );
      pad.position.set(i * 1.9, -0.78, 2.45);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    const gndPadBack = new THREE.Mesh(
      createChamferedBoxGeo(8.8, 0.16, 1.4, 0.2, 0.02, 'y'),
      mats.goldPlating
    );
    gndPadBack.position.set(0, -0.77, -2.55);
    gndPadBack.userData.noEdges = true;
    const acousticPortRing = new THREE.Mesh(hiResTorus(1.45, 0.16, 8, 26), mats.goldPlating);
    acousticPortRing.rotation.x = Math.PI / 2;
    acousticPortRing.position.set(-1.8, -0.76, 0);
    acousticPortRing.userData.noEdges = true;

    // Silver-epoxy die-attach fillets beneath MEMS & ASIC footprints
    const memsFillet = makeHiResHorizPlate(
      createFrameShape(6.15, 6.15, 0.4, 5.55, 5.55, 0.25),
      0.14,
      mats.solderBallSilver,
      0.03,
      1,
      14
    );
    memsFillet.position.set(-1.8, 0.06, 0);
    memsFillet.userData.noEdges = true;
    const asicFillet = makeHiResHorizPlate(
      createFrameShape(3.55, 4.75, 0.2, 3.05, 4.25, 0.12),
      0.14,
      mats.solderBallSilver,
      0.03,
      1,
      12
    );
    asicFillet.position.set(2.6, 0.06, 0);
    asicFillet.userData.noEdges = true;

    // 14 stitched perimeter gold thermal ground vias + 12 top ENIG bond fingers
    const viaGeo = hiResCyl(0.14, 0.14, 0.78, 10);
    const viaCoords: Array<[number, number]> = [
      [-4.65, -3.4], [-2.2, -3.4], [0.2, -3.4], [2.6, -3.4], [4.65, -3.4],
      [-4.65, 3.4], [-2.2, 3.4], [0.2, 3.4], [2.6, 3.4], [4.65, 3.4],
      [-4.65, -1.2], [-4.65, 1.2], [4.65, -1.2], [4.65, 1.2],
    ];
    const viaInst = new THREE.InstancedMesh(viaGeo, mats.goldPlating, viaCoords.length);
    const dm = new THREE.Object3D();
    for (let i = 0; i < viaCoords.length; i++) {
      dm.position.set(viaCoords[i][0], -0.36, viaCoords[i][1]);
      dm.updateMatrix();
      viaInst.setMatrixAt(i, dm.matrix);
    }
    viaInst.instanceMatrix.needsUpdate = true;
    viaInst.userData.noEdges = true;

    // 9 gleaming ball-to-wedge φ20 μm gold wirebond arches + gold ball bumps!
    const wireSpecs: Array<[THREE.Vector3, THREE.Vector3, number]> = [
      [new THREE.Vector3(-0.35, 1.75, -1.45), new THREE.Vector3(1.22, 1.18, -1.45), 1.32],
      [new THREE.Vector3(-0.35, 1.75, -0.45), new THREE.Vector3(1.22, 1.18, -0.45), 1.42],
      [new THREE.Vector3(-0.35, 1.75, 0.55), new THREE.Vector3(1.22, 1.18, 0.55), 1.42],
      [new THREE.Vector3(-0.35, 1.75, 1.45), new THREE.Vector3(1.22, 1.18, 1.45), 1.32],
      [new THREE.Vector3(3.85, 1.18, -1.68), new THREE.Vector3(4.65, 0.04, -2.75), 0.92],
      [new THREE.Vector3(3.85, 1.18, -0.68), new THREE.Vector3(4.65, 0.04, -1.1), 1.02],
      [new THREE.Vector3(3.85, 1.18, 0.32), new THREE.Vector3(4.65, 0.04, 0.55), 1.02],
      [new THREE.Vector3(3.85, 1.18, 1.32), new THREE.Vector3(4.65, 0.04, 2.2), 0.95],
      [new THREE.Vector3(-4.15, 0.95, 0.0), new THREE.Vector3(-4.65, 0.04, 0.0), 0.62],
    ];
    for (const [p0, p1, arch] of wireSpecs) {
      g.add(buildGoldWirebondLoop(p0, p1, arch, 0.072, mats.goldPlating));
      const ball = new THREE.Mesh(hiResSphere(0.11, 8, 6), mats.goldPlating);
      ball.position.copy(p0);
      ball.userData.noEdges = true;
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.07, 0.34), mats.goldPlating);
      finger.position.set(p1.x, 0.04, p1.z);
      finger.userData.noEdges = true;
      g.add(ball, finger);
    }
    g.add(sub, gndPadBack, acousticPortRing, memsFillet, asicFillet, viaInst);

    parts.push(
      finalizeMicPart(
        'mc-mems-gold-wirebonds',
        20,
        '#f59e0b',
        g,
        new THREE.Vector3(LX, -0.65, FZ),
        new THREE.Vector3(-12.0, -5.8, 4.5),
        cp
      )
    );
  }

  // =========================================================================
  // RIGHT CHANNEL CUTAWAY (x = +14.2): ELECTRET CONDENSER (ECM) (MC21–MC25)
  // =========================================================================

  // MC21. Crimped Aluminum Faraday Shield Case (240° Cutaway Cylinder!)
  {
    const g = new THREE.Group();
    const R = 5.42;
    const H = 5.25;
    // Lathe-turned spun-aluminum 240° cutaway can with bespoke radial spun-metal grain, inner step & hermetic crimp!
    const prof: THREE.Vector2[] = [
      new THREE.Vector2(R - 0.86, -H * 0.5),
      new THREE.Vector2(R - 0.24, -H * 0.5),
      new THREE.Vector2(R, -H * 0.5 + 0.36),
      new THREE.Vector2(R, H * 0.5 - 0.54),
      new THREE.Vector2(R - 0.34, H * 0.5),
      new THREE.Vector2(2.65, H * 0.5),
      new THREE.Vector2(2.65, H * 0.5 - 0.38),
      new THREE.Vector2(R - 0.52, H * 0.5 - 0.4),
      new THREE.Vector2(R - 0.42, H * 0.5 - 0.95),
      new THREE.Vector2(R - 0.38, -H * 0.5 + 0.32),
      new THREE.Vector2(R - 0.86, -H * 0.5 + 0.32),
    ];
    const canGeo = markHiRes(new THREE.LatheGeometry(prof, 44, Math.PI * 0.28, Math.PI * 1.44));
    canGeo.computeVertexNormals();
    applyBoxUVs(canGeo, 7.5);
    const canMesh = new THREE.Mesh(canGeo, u.micEcmSpunAluminum);

    // Outer chamfered gold/stainless acoustic port bezel + matte woven Teraoka acoustic dust-cloth inside top port!
    const portBezel = new THREE.Mesh(hiResTorus(2.74, 0.16, 10, 34), mats.stainlessMachined);
    portBezel.rotation.x = Math.PI / 2;
    portBezel.position.y = H * 0.5 + 0.04;
    portBezel.userData.noEdges = true;
    const feltGeo = hiResCyl(3.38, 3.38, 0.24, 32);
    applyBoxUVs(feltGeo, 5.5);
    const felt = new THREE.Mesh(feltGeo, u.micTeraoka631sTape);
    felt.position.y = H * 0.5 - 0.26;
    felt.userData.noEdges = true;

    // 4 internal vertical centering guide flutes inside the cutaway cylindrical wall
    for (let i = 0; i < 4; i++) {
      const a = Math.PI * 0.92 + i * 0.72;
      const flute = new THREE.Mesh(
        createChamferedBoxGeo(0.18, H - 1.2, 0.22, 0.04, 0.02, 'y'),
        mats.silverElectrode
      );
      flute.position.set(Math.cos(a) * (R - 0.46), -0.08, Math.sin(a) * (R - 0.46));
      flute.rotation.y = -a;
      flute.userData.noEdges = true;
      g.add(flute);
    }

    // Crimped bottom stainless roll lip + upper shoulder burnish ring
    const crimpLip = new THREE.Mesh(
      hiResTorus(R - 0.3, 0.26, 10, 36, Math.PI * 1.44),
      mats.stainlessMachined
    );
    crimpLip.rotation.x = Math.PI / 2;
    crimpLip.rotation.z = Math.PI * 0.78;
    crimpLip.position.y = -H * 0.5;
    const shoulderRing = new THREE.Mesh(
      hiResTorus(R - 0.22, 0.09, 8, 36, Math.PI * 1.44),
      mats.silverElectrode
    );
    shoulderRing.rotation.x = Math.PI / 2;
    shoulderRing.rotation.z = Math.PI * 0.78;
    shoulderRing.position.y = H * 0.5 - 0.14;
    shoulderRing.userData.noEdges = true;
    g.add(canMesh, portBezel, felt, crimpLip, shoulderRing);

    parts.push(
      finalizeMicPart(
        'mc-ecm-aluminum-case',
        21,
        '#cbd5e1',
        g,
        new THREE.Vector3(RX, 1.8, FZ),
        new THREE.Vector3(12.5, 8.8, 5.5),
        cp
      )
    );
  }

  // MC22. Gold-Sputtered PET/FEP Permanently Polarized Electret Diaphragm
  {
    const g = new THREE.Group();
    // CNC-turned stepped C3604 brass tensioning ring with 24 instanced outer micro-knurl grip ridges!
    const brassRing = new THREE.Mesh(hiResTorus(4.65, 0.42, 14, 38), mats.brassGear);
    brassRing.rotation.x = Math.PI / 2;
    const knurlGeo = createChamferedBoxGeo(0.16, 0.52, 0.22, 0.03, 0.01, 'y');
    const knurls = new THREE.InstancedMesh(knurlGeo, mats.brassGear, 24);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      dm.position.set(Math.cos(a) * 5.04, 0, Math.sin(a) * 5.04);
      dm.rotation.set(0, -a, 0);
      dm.updateMatrix();
      knurls.setMatrixAt(i, dm.matrix);
    }
    knurls.instanceMatrix.needsUpdate = true;
    knurls.userData.noEdges = true;

    const innerShoulder = new THREE.Mesh(hiResTorus(4.32, 0.16, 10, 36), mats.copperCoil);
    innerShoulder.rotation.x = Math.PI / 2;
    innerShoulder.position.y = 0.18;
    innerShoulder.userData.noEdges = true;

    // Taut gold-sputtered PET/FEP mirror disc + concentric harmonic tension rings + 12 perimeter weld beads
    const goldFilm = new THREE.Mesh(hiResCyl(4.52, 4.52, 0.16, 38), mats.goldPlating);
    for (const r of [1.85, 3.25]) {
      const hRing = new THREE.Mesh(hiResTorus(r, 0.035, 8, 34), mats.copperCoil);
      hRing.rotation.x = Math.PI / 2;
      hRing.position.y = 0.09;
      hRing.userData.noEdges = true;
      g.add(hRing);
    }
    const weldGeo = hiResSphere(0.14, 8, 6);
    const welds = new THREE.InstancedMesh(weldGeo, mats.stainlessMachined, 12);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      dm.position.set(Math.cos(a) * 4.56, 0.36, Math.sin(a) * 4.56);
      dm.rotation.set(0, 0, 0);
      dm.updateMatrix();
      welds.setMatrixAt(i, dm.matrix);
    }
    welds.instanceMatrix.needsUpdate = true;
    welds.userData.noEdges = true;
    g.add(brassRing, knurls, innerShoulder, goldFilm, welds);

    parts.push(
      finalizeMicPart(
        'mc-ecm-electret-diaphragm',
        22,
        '#eab308',
        g,
        new THREE.Vector3(RX, 3.35, FZ),
        new THREE.Vector3(16.0, 5.6, 8.5),
        cp,
        0.16
      )
    );
  }

  // MC23. 25 μm White PTFE Spacer Ring & Perforated Brass Backplate
  {
    const g = new THREE.Group();
    // Crisp white 25 μm stepped PTFE dielectric spacer ring with 3 registration indexing lugs
    const ptfeSpacer = new THREE.Mesh(hiResTorus(4.55, 0.32, 12, 36), mats.ceramicAlumina);
    ptfeSpacer.rotation.x = Math.PI / 2;
    ptfeSpacer.position.y = 0.4;
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const lug = new THREE.Mesh(
        createChamferedBoxGeo(0.55, 0.24, 0.36, 0.06, 0.02, 'y'),
        mats.ceramicAlumina
      );
      lug.position.set(Math.cos(a) * 4.84, 0.4, Math.sin(a) * 4.84);
      lug.rotation.y = -a;
      lug.userData.noEdges = true;
      g.add(lug);
    }

    // True 7-hole perforated CNC-machined C3604 brass backplate textured with bespoke lathe-turned grain!
    const hCoords: Array<[number, number]> = [[0, 0]];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      hCoords.push([Math.cos(a) * 2.25, Math.sin(a) * 2.25]);
    }
    const backplate = makePerforatedDisc(4.52, hCoords, 0.5, 0.54, u.micEcmBrassBackplate, 0.04);

    // 7 chamfered brass vent hole collars + corona-charged amber FEP electret charge coating on top face
    for (const [hx, hz] of hCoords) {
      const hRim = new THREE.Mesh(hiResTorus(0.54, 0.06, 8, 18), mats.goldPlating);
      hRim.rotation.x = Math.PI / 2;
      hRim.position.set(hx, 0.28, hz);
      hRim.userData.noEdges = true;
      g.add(hRim);
    }
    const fepCoating = makePerforatedDisc(4.22, hCoords, 0.52, 0.08, mats.polyimideFpc, 0.01);
    fepCoating.position.y = 0.30;
    fepCoating.userData.noEdges = true;
    g.add(ptfeSpacer, backplate, fepCoating);

    parts.push(
      finalizeMicPart(
        'mc-ecm-ptfe-spacer-backplate',
        23,
        '#d97706',
        g,
        new THREE.Vector3(RX, 2.2, FZ),
        new THREE.Vector3(17.2, 2.0, 10.0),
        cp
      )
    );
  }

  // MC24. Insulating Plastic Chamber Cup & Copper Electrode Contact Ring
  {
    const g = new THREE.Group();
    // High-insulation Lathe-turned ivory POM cup separating backplate from outer aluminum Faraday can
    const cupProf: THREE.Vector2[] = [
      new THREE.Vector2(4.16, -0.78),
      new THREE.Vector2(4.84, -0.78),
      new THREE.Vector2(4.84, 0.78),
      new THREE.Vector2(4.36, 0.78),
      new THREE.Vector2(4.36, -0.34),
      new THREE.Vector2(4.16, -0.34),
      new THREE.Vector2(4.16, -0.78),
    ];
    const cupGeo = markHiRes(new THREE.LatheGeometry(cupProf, 36, Math.PI * 0.28, Math.PI * 1.44));
    cupGeo.computeVertexNormals();
    const insCup = new THREE.Mesh(cupGeo, mats.zifIvoryPlastic);
    // 4 internal molded alignment ribs inside POM insulator cup
    for (let i = 0; i < 4; i++) {
      const a = Math.PI * 0.92 + i * 0.72;
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.12, 0.24), mats.zifIvoryPlastic);
      rib.position.set(Math.cos(a) * 4.28, 0.14, Math.sin(a) * 4.28);
      rib.rotation.y = -a;
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Formed OFC copper compression contact ring + 6 curved spring-tension wipe fingers with gold contact dimples!
    const cuRing = new THREE.Mesh(hiResTorus(3.45, 0.36, 12, 36), mats.copperCoil);
    cuRing.rotation.x = Math.PI / 2;
    cuRing.position.y = -0.25;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const leafCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(a) * 3.45, -0.1, Math.sin(a) * 3.45),
        new THREE.Vector3(Math.cos(a + 0.14) * 3.12, 0.2, Math.sin(a + 0.14) * 3.12),
        new THREE.Vector3(Math.cos(a + 0.26) * 2.86, 0.34, Math.sin(a + 0.26) * 2.86),
      ]);
      const leaf = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(leafCurve, 12, 0.11, 6, false)),
        mats.copperCoil
      );
      leaf.userData.noEdges = true;
      const tipDimple = new THREE.Mesh(hiResSphere(0.15, 8, 6), mats.goldPlating);
      tipDimple.position.set(Math.cos(a + 0.26) * 2.86, 0.42, Math.sin(a + 0.26) * 2.86);
      tipDimple.userData.noEdges = true;
      g.add(leaf, tipDimple);
    }
    g.add(insCup, cuRing);

    parts.push(
      finalizeMicPart(
        'mc-ecm-insulator-cu-ring',
        24,
        '#ea580c',
        g,
        new THREE.Vector3(RX, 0.85, FZ),
        new THREE.Vector3(16.2, -1.8, 8.8),
        cp
      )
    );
  }

  // MC25. Internal Low-Noise JFET Impedance-Converter PCB (GΩ -> 2 kΩ!)
  {
    const g = new THREE.Group();
    // Circular emerald-green ECM PCB textured with concentric gold traces & 2SK596-B legend
    const pcbGeo = hiResCyl(4.95, 4.95, 0.72, 38);
    applyPlanarUVs(pcbGeo, 9.9, 9.9, 'xz');
    const roundPcb = new THREE.Mesh(pcbGeo, u.micEcmJfetPcb);

    // Authentic 3-lead SOT-23 ultra-low-noise JFET transistor (2SK596-B class) with bespoke QFN/SOT laser body!
    const jfet = buildChipPackage({
      w: 2.35,
      d: 1.55,
      h: 0.92,
      style: 'sot23',
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    jfet.position.set(0, 0.82, -0.15);

    // Two realistic 0402 RF bypass MLCC capacitors (10 pF & 33 pF) + 1 G-ohm high-Z bias resistor!
    for (const [cx, cMat] of [
      [-2.45, mats.smdCeramic],
      [2.45, mats.ceramicAlumina],
    ] as Array<[number, THREE.Material]>) {
      const cap = buildSmdPassive(1.28, 0.72, 0.62, cMat, mats.silverElectrode, 'y');
      cap.position.set(cx, 0.68, 0.65);
      g.add(cap);
    }
    const biasRes = buildSmdPassive(1.48, 0.78, 0.56, mats.matteBlackAnodized, mats.goldPlating, 'y');
    biasRes.position.set(0, 0.66, 2.15);
    g.add(biasRes);

    // 8 plated gold through-hole perimeter ground vias + solder fillet beads
    const viaGeo = hiResCyl(0.18, 0.18, 0.78, 12);
    const vias = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 8);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      dm.position.set(Math.cos(a) * 4.18, 0, Math.sin(a) * 4.18);
      dm.updateMatrix();
      vias.setMatrixAt(i, dm.matrix);
    }
    vias.instanceMatrix.needsUpdate = true;
    vias.userData.noEdges = true;

    // Bottom concentric ENIG gold solder pads (+Signal center / GND outer ring + isolation bevel)
    const padOuter = new THREE.Mesh(hiResTorus(3.7, 0.52, 10, 34), mats.goldPlating);
    padOuter.rotation.x = Math.PI / 2;
    padOuter.position.y = -0.38;
    padOuter.userData.noEdges = true;
    const padCenter = new THREE.Mesh(hiResCyl(1.55, 1.55, 0.18, 24), mats.goldPlating);
    padCenter.position.y = -0.4;
    padCenter.userData.noEdges = true;
    const solderRing = new THREE.Mesh(hiResTorus(2.45, 0.08, 8, 28), mats.copperCoil);
    solderRing.rotation.x = Math.PI / 2;
    solderRing.position.y = -0.38;
    solderRing.userData.noEdges = true;
    g.add(roundPcb, jfet, vias, padOuter, padCenter, solderRing);

    parts.push(
      finalizeMicPart(
        'mc-ecm-jfet-pcb',
        25,
        '#15803d',
        g,
        new THREE.Vector3(RX, -0.55, FZ),
        new THREE.Vector3(12.5, -5.8, 4.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC26. 3rd Capsule: ZV-E1 3-Capsule Directional / α1 II Rear Voice-Memo Mic
  // =========================================================================
  {
    const g = new THREE.Group();
    // Matte charcoal shock-isolation collar with 4 decoupling ribs & molded orientation key boss!
    const rubberRing = new THREE.Mesh(hiResCyl(5.65, 5.65, 4.15, 36), u.micRubberBootBlack);
    for (const ry of [-1.42, -0.48, 0.48, 1.42]) {
      const rib = new THREE.Mesh(hiResTorus(5.74, 0.22, 10, 36), mats.butylDamperRubber);
      rib.rotation.x = Math.PI / 2;
      rib.position.y = ry;
      rib.userData.noEdges = true;
      g.add(rib);
    }
    const keyBoss = new THREE.Mesh(
      createChamferedBoxGeo(1.15, 3.6, 0.72, 0.22, 0.05, 'y'),
      u.micRubberBootBlack
    );
    keyBoss.position.set(0, 0, -5.88);
    keyBoss.userData.noEdges = true;

    // Spun-aluminum directional capsule Faraday body
    const canGeo = hiResCyl(4.42, 4.42, 4.55, 36);
    applyBoxUVs(canGeo, 7.5);
    const capsuleCan = new THREE.Mesh(canGeo, u.micEcmSpunAluminum);
    capsuleCan.position.y = 0.25;

    // Woven stainless top acoustic grille framed by stepped gold & stainless bezel rings
    const topMeshGeo = hiResCyl(3.45, 3.45, 0.22, 32);
    applyBoxUVs(topMeshGeo, 4.5);
    const topMesh = new THREE.Mesh(topMeshGeo, u.micStainlessWovenMesh);
    topMesh.position.y = 2.55;
    topMesh.userData.noEdges = true;
    const goldBezel = new THREE.Mesh(hiResTorus(3.65, 0.26, 12, 34), mats.goldPlating);
    goldBezel.rotation.x = Math.PI / 2;
    goldBezel.position.y = 2.55;
    const innerRim = new THREE.Mesh(hiResTorus(3.32, 0.09, 8, 30), mats.stainlessMachined);
    innerRim.rotation.x = Math.PI / 2;
    innerRim.position.y = 2.66;
    innerRim.userData.noEdges = true;

    // Directional cardioid rear phase-cancellation acoustic slot ports (8 sculpted slots over 350-Rayl silk delay band!)
    const phaseBand = new THREE.Mesh(hiResCyl(4.46, 4.46, 0.86, 34, true), u.micAcousticDelayCloth);
    phaseBand.position.y = 1.1;
    phaseBand.userData.noEdges = true;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const slotFrame = new THREE.Mesh(
        createChamferedBoxGeo(0.18, 0.62, 0.96, 0.08, 0.02, 'y'),
        mats.matteBlackAnodized
      );
      slotFrame.position.set(Math.cos(a) * 4.48, 1.1, Math.sin(a) * 4.48);
      slotFrame.rotation.y = -a;
      slotFrame.userData.noEdges = true;
      g.add(slotFrame);
    }
    const phaseRing = new THREE.Mesh(hiResTorus(4.54, 0.14, 10, 34), mats.vcWorkingFluidCyan);
    phaseRing.rotation.x = Math.PI / 2;
    phaseRing.position.y = 1.62;
    phaseRing.userData.noEdges = true;

    // Underside dual gold capsule terminal solder pads (+SIG / GND)
    for (const [tx, rad] of [
      [-1.15, 0.88],
      [1.15, 0.88],
    ]) {
      const term = new THREE.Mesh(hiResCyl(rad, rad, 0.18, 16), mats.goldPlating);
      term.position.set(tx, -2.08, 0);
      term.userData.noEdges = true;
      g.add(term);
    }
    g.add(rubberRing, keyBoss, capsuleCan, topMesh, goldBezel, innerRim, phaseBand, phaseRing);

    parts.push(
      finalizeMicPart(
        'mc-rear-3rd-voicememo-capsule',
        26,
        '#334155',
        g,
        new THREE.Vector3(0, 1.6, -12.5),
        new THREE.Vector3(0, 4.0, -21.0),
        cp
      )
    );
  }

  // =========================================================================
  // BOTTOM SIGNAL & 2025–2026 AI AUDIO PROCESSING STACK (MC27–MC32)
  // =========================================================================

  // MC27. Sony OEM SH-1035 Shielded Differential Top-Deck Flex (Ref.307 / A5033450A)
  {
    const g = new THREE.Group();
    // Main Y-shaped Sony OEM amber polyimide flex displaying crisp SONY SH-1035 / A-5033-450-A silkscreen!
    const crossbar = makeTexturedHorizPlate(
      createRoundedRectShape(37.4, 5.8, 1.5),
      37.4,
      5.8,
      0.38,
      u.micSh1035Flex,
      0.04,
      20
    );
    crossbar.position.set(0, 0, FZ);

    // Embossed copper differential signal-pair trace ribs routing L/R signals into central ZIF drop leg
    for (const tz of [-0.75, 0.75]) {
      const diffTrace = new THREE.Mesh(new THREE.BoxGeometry(28.0, 0.07, 0.24), mats.copperCoil);
      diffTrace.position.set(0, 0.22, FZ + tz);
      diffTrace.userData.noEdges = true;
      g.add(diffTrace);
    }

    const stemRear = makeHiResHorizPlate(
      createRoundedRectShape(6.2, 18.2, 1.1),
      0.36,
      mats.polyimideFpc,
      0.03,
      1,
      16
    );
    stemRear.position.set(0, -0.02, -4.5);

    // Silver-ink hatched conductive EMI shield film over rear stem + 12 ground-stitch micro-vias
    const rearShield = makeHiResHorizPlate(
      createRoundedRectShape(4.4, 14.0, 0.6),
      0.12,
      mats.emiShieldFilm,
      0.01,
      1,
      10
    );
    rearShield.position.set(0, 0.21, -5.0);
    rearShield.userData.noEdges = true;
    const stitchGeo = hiResCyl(0.14, 0.14, 0.44, 10);
    const stitches = new THREE.InstancedMesh(stitchGeo, mats.goldPlating, 12);
    const dm = new THREE.Object3D();
    let sIdx = 0;
    for (let i = 0; i < 6; i++) {
      for (const sx of [-2.45, 2.45]) {
        dm.position.set(sx, 0.04, -10.8 + i * 2.35);
        dm.updateMatrix();
        stitches.setMatrixAt(sIdx++, dm.matrix);
      }
    }
    stitches.instanceMatrix.needsUpdate = true;
    stitches.userData.noEdges = true;

    // Gold circular solder test-pads & capsule contact land rings with center signal discs on L, R, and Rear termini
    for (const [tx, tz] of [
      [LX, FZ],
      [RX, FZ],
      [0, -12.5],
    ]) {
      const land = new THREE.Mesh(hiResTorus(2.0, 0.34, 8, 26), mats.goldPlating);
      land.rotation.x = Math.PI / 2;
      land.position.set(tx, 0.24, tz);
      land.userData.noEdges = true;
      const centerPad = new THREE.Mesh(hiResCyl(0.82, 0.82, 0.12, 18), mats.goldPlating);
      centerPad.position.set(tx, 0.22, tz);
      centerPad.userData.noEdges = true;
      g.add(land, centerPad);
    }

    // Natural smooth 90-degree bent ribbon drop leg into mainboard ZIF audio header + 10 gold ZIF fingers!
    const bendGeo = hiResCyl(0.75, 0.75, 8.6, 16, false, 0, Math.PI * 0.5);
    bendGeo.rotateZ(Math.PI / 2);
    const bend = new THREE.Mesh(bendGeo, mats.polyimideFpc);
    bend.position.set(0, -0.58, FZ + 2.4);
    bend.userData.noEdges = true;

    const dropLeg = new THREE.Mesh(
      createChamferedBoxGeo(8.6, 5.4, 0.38, 0.35, 0.03, 'z'),
      mats.polyimideFpc
    );
    dropLeg.position.set(0, -3.0, FZ + 3.05);

    // Matte-blue PI stiffener backing plate with twin lateral ZIF retention ears + gold Pin-1 index triangle
    const stiffener = new THREE.Mesh(
      createChamferedBoxGeo(8.5, 1.95, 0.24, 0.16, 0.03, 'z'),
      mats.mountShimBlue
    );
    stiffener.position.set(0, -4.75, FZ + 2.75);
    stiffener.userData.noEdges = true;
    for (const ex of [-4.55, 4.55]) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.72, 0.34), mats.mountShimBlue);
      ear.position.set(ex, -4.15, FZ + 2.95);
      ear.userData.noEdges = true;
      g.add(ear);
    }

    // 10 crisp ENIG gold 0.4 mm-pitch ZIF contact fingers + Pin-1 marker dot
    for (let i = 0; i < 10; i++) {
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.46, 1.52, 0.09), mats.goldPlating);
      finger.position.set(-3.42 + i * 0.76, -4.92, FZ + 3.28);
      finger.userData.noEdges = true;
      g.add(finger);
    }
    const pin1Mark = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.1, 3), mats.goldPlating);
    pin1Mark.rotation.x = Math.PI / 2;
    pin1Mark.position.set(-3.42, -3.85, FZ + 3.28);
    pin1Mark.userData.noEdges = true;
    g.add(crossbar, stemRear, rearShield, stitches, bend, dropLeg, stiffener, pin1Mark);

    parts.push(
      finalizeMicPart(
        'mc-sh1035-diff-flex',
        27,
        '#d97706',
        g,
        new THREE.Vector3(0, -6.2, 0),
        new THREE.Vector3(0, -12.0, 0),
        cp
      )
    );
  }

  // MC28. RF Ferrite Bead EMI Chokes & Audio-Grade C0G/ESD Filter Network
  {
    const g = new THREE.Group();
    const subPcb = makeTexturedHorizPlate(
      createRoundedRectShape(17.6, 11.2, 1.1),
      17.6,
      11.2,
      0.8,
      u.micAudioMainPcb,
      0.06,
      18
    );

    // 4 realistic Murata BLM15HD GHz-band ferrite EMI bead chokes + 4 C0G/NP0 audio caps + gold Pi-filter trace lanes!
    for (let i = 0; i < 4; i++) {
      const fx = -5.25 + i * 3.5;
      const bead = buildSmdPassive(2.65, 1.55, 1.25, mats.ferriteInductor, mats.silverElectrode, 'y');
      bead.position.set(fx, 1.0, 2.3);
      const cap = buildSmdPassive(2.15, 1.32, 0.88, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(fx, 0.82, -1.9);
      // Gold differential Pi-filter bridge trace connecting ferrite bead to C0G shunt capacitor
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.07, 2.8), mats.goldPlating);
      bridge.position.set(fx, 0.44, 0.2);
      bridge.userData.noEdges = true;
      // Silver solder fillet anchors
      for (const fz of [3.12, 1.48, -1.24, -2.56]) {
        const fillet = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.14, 0.28), mats.solderBallSilver);
        fillet.position.set(fx, 0.46, fz);
        fillet.userData.noEdges = true;
        g.add(fillet);
      }
      g.add(bead, cap, bridge);
    }

    // 2 SOT-23 ESD TVS surge protection diodes + 2 gold signal test-point pads + 10 stitched perimeter ground vias
    for (const ex of [-4.2, 4.2]) {
      const esd = buildChipPackage({
        w: 2.0,
        d: 1.3,
        h: 0.72,
        style: 'sot23',
        bodyMat: u.micCodecQfnPackage,
        leadMat: mats.silverElectrode,
        pin1Mat: mats.goldPlating,
        axis: 'y',
      });
      esd.position.set(ex, 0.76, -4.1);
      const tp = new THREE.Mesh(hiResCyl(0.55, 0.55, 0.12, 16), mats.goldPlating);
      tp.position.set(ex * 1.65, 0.46, 0.2);
      tp.userData.noEdges = true;
      g.add(esd, tp);
    }
    const viaGeo = hiResCyl(0.18, 0.18, 0.86, 10);
    const vias = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 10);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 5; i++) {
      const vx = -7.0 + i * 3.5;
      dm.position.set(vx, 0, 4.7);
      dm.updateMatrix();
      vias.setMatrixAt(i, dm.matrix);
      dm.position.set(vx, 0, -4.7);
      dm.updateMatrix();
      vias.setMatrixAt(i + 5, dm.matrix);
    }
    vias.instanceMatrix.needsUpdate = true;
    vias.userData.noEdges = true;
    g.add(subPcb, vias);

    parts.push(
      finalizeMicPart(
        'mc-rf-ferrite-esd-filter',
        28,
        '#475569',
        g,
        new THREE.Vector3(-12.2, -9.2, 4.2),
        new THREE.Vector3(-14.5, -17.0, 6.5),
        cp
      )
    );
  }

  // MC29. 24-bit / 48 kHz LPCM Stereo Audio Codec, Low-Noise PGA & ΔΣ ADC
  {
    const g = new THREE.Group();
    const subPcb = makeTexturedHorizPlate(
      createRoundedRectShape(17.6, 11.2, 1.1),
      17.6,
      11.2,
      0.8,
      u.micAudioMainPcb,
      0.06,
      18
    );

    // Flagship QFN-32 24-bit Audio Codec IC (AK5704VN / Sony custom silicon) with bespoke laser QFN package!
    const codecIc = buildChipPackage({
      w: 6.8,
      d: 6.8,
      h: 1.32,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      topAccentMat: u.micAudioDsp32Float,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    codecIc.position.set(-2.0, 1.06, 0);

    // Authentic 4-castellation seam-welded 24.576 MHz NDK NX3225GA audio master crystal oscillator!
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(3.65, 0.46, 2.65, 0.25, 0.04, 'y'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(4.85, 0.62, 2.2);
    const xtalLidGeo = createChamferedBoxGeo(3.28, 0.48, 2.28, 0.22, 0.05, 'y');
    applyPlanarUVs(xtalLidGeo, 3.28, 2.28, 'xz');
    const xtalLid = new THREE.Mesh(xtalLidGeo, u.micQuartzTcxoLid);
    xtalLid.position.set(4.85, 1.06, 2.2);
    for (const [cx, cz] of [
      [-1.65, -1.15],
      [1.65, -1.15],
      [-1.65, 1.15],
      [1.65, 1.15],
    ]) {
      const cast = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.52, 10), mats.goldPlating);
      cast.position.set(4.85 + cx, 0.64, 2.2 + cz);
      cast.userData.noEdges = true;
      g.add(cast);
    }

    // Ultra-low-noise MICBIAS LDO regulator (DFN-8) + 6 surrounding C0G ceramic decoupling MLCCs + I2S bus traces!
    const ldo = buildChipPackage({
      w: 2.9,
      d: 2.3,
      h: 0.88,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    ldo.position.set(4.85, 0.84, -2.25);

    const capPositions: Array<[number, number]> = [
      [-7.1, -2.8], [-7.1, 0], [-7.1, 2.8],
      [2.1, -3.8], [2.1, 3.8], [7.2, 0],
    ];
    for (const [cx, cz] of capPositions) {
      const dec = buildSmdPassive(1.32, 0.7, 0.54, mats.smdCeramic, mats.silverElectrode, 'y');
      dec.position.set(cx, 0.67, cz);
      g.add(dec);
    }
    for (const tz of [-0.55, 0, 0.55]) {
      const i2sTrace = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.06, 0.16), mats.goldPlating);
      i2sTrace.position.set(2.45, 0.44, tz);
      i2sTrace.userData.noEdges = true;
      g.add(i2sTrace);
    }
    g.add(subPcb, codecIc, xtalBase, xtalLid, ldo);

    parts.push(
      finalizeMicPart(
        'mc-audio-codec-adc-pga',
        29,
        '#0284c7',
        g,
        new THREE.Vector3(12.2, -9.2, 4.2),
        new THREE.Vector3(14.5, -17.0, 6.5),
        cp
      )
    );
  }

  // MC30. Real-Time Wind-Cut Digital High-Pass Filter (HPF / Coherence Detector)
  {
    const g = new THREE.Group();
    const subPcb = makeTexturedHorizPlate(
      createRoundedRectShape(16.6, 10.6, 1.1),
      16.6,
      10.6,
      0.8,
      u.micAudioMainPcb,
      0.06,
      18
    );
    const hpfIc = buildChipPackage({
      w: 6.4,
      d: 5.6,
      h: 1.25,
      style: 'qfn',
      pinsPerSide: 7,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      topAccentMat: u.micAiNpuDie,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    hpfIc.position.set(0, 1.02, 0);

    // 6 sculpted stepped acoustic high-pass filter roll-off slope telemetry bars (120Hz -> 4kHz passband!)
    for (let i = 0; i < 6; i++) {
      const hBar = 0.24 + i * 0.22;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.68, hBar, 3.1, 0.1, 0.03, 'y'),
        i < 2 ? mats.cinnabarAnodized : i < 4 ? mats.vcWorkingFluidCyan : mats.goldPlating
      );
      bar.position.set(-2.35 + i * 0.94, 1.68 + hBar * 0.5, 0);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    // 6 precision 0402 thin-film resistors + 2 C0G bypass MLCCs + 4 corner gold ground vias
    for (const sx of [-5.8, 5.8]) {
      for (const sz of [-2.8, 0, 2.8]) {
        const res = buildSmdPassive(1.3, 0.68, 0.52, mats.matteBlackAnodized, mats.goldPlating, 'y');
        res.position.set(sx, 0.66, sz);
        g.add(res);
      }
    }
    for (const sz of [-3.9, 3.9]) {
      const cap = buildSmdPassive(1.42, 0.76, 0.56, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(0, 0.68, sz);
      g.add(cap);
    }
    for (const [vx, vz] of [
      [-7.2, -4.2], [7.2, -4.2], [-7.2, 4.2], [7.2, 4.2],
    ]) {
      const via = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.86, 12), mats.goldPlating);
      via.position.set(vx, 0, vz);
      via.userData.noEdges = true;
      g.add(via);
    }
    g.add(subPcb, hpfIc);

    parts.push(
      finalizeMicPart(
        'mc-windcut-hpf-circuit',
        30,
        '#2563eb',
        g,
        new THREE.Vector3(-12.2, -9.2, -9.5),
        new THREE.Vector3(-14.5, -20.5, -10.5),
        cp
      )
    );
  }

  // MC31. Multi-Capsule Phase-Delay Beamforming & Face-Tracking Directivity DSP
  {
    const g = new THREE.Group();
    const subPcb = makeTexturedHorizPlate(
      createRoundedRectShape(16.6, 10.6, 1.1),
      16.6,
      10.6,
      0.8,
      u.micAudioMainPcb,
      0.06,
      18
    );
    const dspIc = buildChipPackage({
      w: 6.8,
      d: 6.0,
      h: 1.3,
      style: 'qfn',
      pinsPerSide: 7,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      topAccentMat: u.micAiNpuDie,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    dspIc.position.set(0, 1.05, 0);

    // Sculpted metallic front super-cardioid & rear dipole directional lobes + gold polar reticle ring!
    const frontLobe = new THREE.Mesh(hiResCyl(0.18, 1.52, 2.85, 24), mats.goldPlating);
    frontLobe.rotation.x = Math.PI / 2;
    frontLobe.position.set(0, 2.15, 1.4);
    const rearLobe = new THREE.Mesh(hiResCyl(0.16, 1.08, 2.05, 24), u.micGreenJackCollar);
    rearLobe.rotation.x = -Math.PI / 2;
    rearLobe.position.set(0, 2.15, -1.25);
    const polarReticle = new THREE.Mesh(hiResTorus(2.55, 0.08, 8, 32), mats.vcWorkingFluidCyan);
    polarReticle.rotation.x = Math.PI / 2;
    polarReticle.position.set(0, 1.82, 0);
    polarReticle.userData.noEdges = true;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const tick = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 0.12), mats.goldPlating);
      tick.position.set(Math.cos(a) * 2.55, 1.88, Math.sin(a) * 2.55);
      tick.rotation.y = -a;
      tick.userData.noEdges = true;
      g.add(tick);
    }

    // 4 flanking phase-delay tap C0G caps + 5-pin Eye-AF subject-tracking serial metadata header
    for (const sx of [-5.8, 5.8]) {
      for (const sz of [-1.8, 1.8]) {
        const cap = buildSmdPassive(1.5, 0.85, 0.62, mats.smdCeramic, mats.silverElectrode, 'y');
        cap.position.set(sx, 0.7, sz);
        g.add(cap);
      }
    }
    for (let i = 0; i < 5; i++) {
      const hPin = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 1.1), mats.goldPlating);
      hPin.position.set(-2.0 + i * 1.0, 0.52, -4.3);
      hPin.userData.noEdges = true;
      g.add(hPin);
    }
    g.add(subPcb, dspIc, frontLobe, rearLobe, polarReticle);

    parts.push(
      finalizeMicPart(
        'mc-beamforming-phase-dsp',
        31,
        '#06b6d4',
        g,
        new THREE.Vector3(12.2, -9.2, -9.5),
        new THREE.Vector3(14.5, -20.5, -10.5),
        cp
      )
    );
  }

  // MC32. 2025–2026 BIONZ XR2 In-Camera AI Audio Noise Cut & Smart AGC Engine
  {
    const g = new THREE.Group();
    // Flagship multi-layer ceramic/ABF audio NPU carrier substrate
    const carrier = makeTexturedHorizPlate(
      createRoundedRectShape(26.2, 14.2, 1.7),
      26.2,
      14.2,
      1.08,
      u.micCeramicLgaSubstrate,
      0.08,
      24
    );

    // Dark epoxy underfill fillet collar + bespoke photolithographic bare silicon AI Audio NPU die!
    const underfill = makeHiResHorizPlate(
      createRoundedRectShape(13.0, 9.4, 0.42),
      0.24,
      mats.matteBlackAnodized,
      0.06,
      1,
      16
    );
    underfill.position.set(0, 0.66, 0);
    underfill.userData.noEdges = true;
    const dieGeo = createChamferedBoxGeo(12.2, 1.58, 8.6, 0.25, 0.08, 'y');
    applyPlanarUVs(dieGeo, 12.2, 8.6, 'xz');
    const aiCore = new THREE.Mesh(dieGeo, u.micAiNpuDie);
    aiCore.position.set(0, 1.32, 0);

    // 3×3 beveled gold-framed systolic neural audio separation tiles + copper inter-tile busbar grid!
    const tileGeo = createChamferedBoxGeo(2.65, 0.28, 1.92, 0.14, 0.04, 'y');
    const tileInst = new THREE.InstancedMesh(tileGeo, mats.goldPlating, 9);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        dm.position.set(ix * 3.35, 2.22, iz * 2.38);
        dm.updateMatrix();
        tileInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    tileInst.instanceMatrix.needsUpdate = true;
    tileInst.userData.noEdges = true;
    for (const bx of [-1.68, 1.68]) {
      const busZ = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 7.2), mats.copperCoil);
      busZ.position.set(bx, 2.16, 0);
      busZ.userData.noEdges = true;
      g.add(busZ);
    }

    // 12 surrounding land-side 01005 decoupling MLCCs flanking the AI NPU die
    for (const sx of [-9.4, 9.4]) {
      for (const sz of [-4.2, -1.4, 1.4, 4.2]) {
        const mlcc = buildSmdPassive(1.5, 0.78, 0.56, mats.smdCeramic, mats.silverElectrode, 'y');
        mlcc.position.set(sx, 0.82, sz);
        g.add(mlcc);
      }
    }
    for (const sz of [-5.6, 5.6]) {
      for (const sx of [-3.2, 3.2]) {
        const mlcc = buildSmdPassive(1.4, 0.74, 0.52, mats.smdCeramic, mats.goldPlating, 'y');
        mlcc.position.set(sx, 0.80, sz);
        g.add(mlcc);
      }
    }

    // Gold perimeter BGA contact rim + underside 5×9 instanced SAC305 BGA solder ball array!
    const goldRim = makeHiResHorizPlate(
      createFrameShape(24.2, 12.4, 1.3, 22.0, 10.2, 0.9),
      0.24,
      mats.goldPlating,
      0.03,
      1,
      20
    );
    goldRim.position.y = -0.62;
    const bgaGeo = hiResSphere(0.32, 10, 8);
    const bgaBalls = new THREE.InstancedMesh(bgaGeo, mats.solderBallSilver, 45);
    let bIdx = 0;
    for (let ix = -4; ix <= 4; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        dm.position.set(ix * 2.2, -0.78, iz * 2.0);
        dm.updateMatrix();
        bgaBalls.setMatrixAt(bIdx++, dm.matrix);
      }
    }
    bgaBalls.instanceMatrix.needsUpdate = true;
    bgaBalls.userData.noEdges = true;
    g.add(carrier, underfill, aiCore, tileInst, goldRim, bgaBalls);

    parts.push(
      finalizeMicPart(
        'mc-ai-noise-cut-agc',
        32,
        '#7c3aed',
        g,
        new THREE.Vector3(0, -12.2, -2.5),
        new THREE.Vector3(0, -26.5, -3.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC33. Mainboard 10-Pin 0.4 mm-Pitch Flip-Lock FPC ZIF Receptacle (Hirose FH34S)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Slotted molded ivory LCP zero-insertion-force connector housing with front FPC entry mouth!
    const lcpBody = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 2.35, 4.2, 0.35, 0.08, 'y'),
      mats.zifIvoryPlastic
    );
    const fpcSlot = new THREE.Mesh(
      createChamferedBoxGeo(9.2, 0.72, 1.2, 0.12, 0.03, 'y'),
      mats.matteBlackAnodized
    );
    fpcSlot.position.set(0, 0.12, 1.62);
    fpcSlot.userData.noEdges = true;

    // Hinged matte-charcoal flip-lock actuator bail with 8 molded grip serrations & twin pivot bosses!
    const actuatorBail = new THREE.Mesh(
      createChamferedBoxGeo(10.6, 0.72, 2.2, 0.22, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    actuatorBail.position.set(0, 1.38, -0.75);
    actuatorBail.rotation.x = -0.22;
    for (let i = 0; i < 8; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 1.65), mats.titaniumRivet);
      rib.position.set(-3.5 + i * 1.0, 1.76, -0.78);
      rib.rotation.x = -0.22;
      rib.userData.noEdges = true;
      g.add(rib);
    }
    for (const px of [-5.25, 5.25]) {
      const pivot = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.72, 12), mats.stainlessMachined);
      pivot.rotation.z = Math.PI / 2;
      pivot.position.set(px, 1.12, -1.25);
      pivot.userData.noEdges = true;
      g.add(pivot);
    }

    // 10 gleaming gold gull-wing PCB solder leads + 10 internal cantilever gold spring wipe beams!
    for (let i = 0; i < 10; i++) {
      const lx = -3.42 + i * 0.76;
      const lead = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.32, 1.42), mats.goldPlating);
      lead.position.set(lx, -1.08, i % 2 === 0 ? 2.45 : -2.45);
      lead.userData.noEdges = true;
      const wipe = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.2, 1.15), mats.goldPlating);
      wipe.position.set(lx, 0.28, 1.48);
      wipe.rotation.x = 0.16;
      wipe.userData.noEdges = true;
      g.add(lead, wipe);
    }
    // Twin stamped stainless mechanical hold-down anchor ears with silver solder tabs
    for (const sx of [-5.85, 5.85]) {
      const anchor = new THREE.Mesh(
        createChamferedBoxGeo(1.05, 1.52, 2.45, 0.14, 0.04, 'y'),
        mats.stainlessMachined
      );
      anchor.position.set(sx, -0.42, 0);
      const tab = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.2, 2.1), mats.solderBallSilver);
      tab.position.set(sx * 1.04, -1.12, 0);
      tab.userData.noEdges = true;
      g.add(anchor, tab);
    }
    g.add(lcpBody, fpcSlot, actuatorBail);

    parts.push(
      finalizeMicPart(
        'mc-zif-10pin-connector',
        33,
        '#e2e8f0',
        g,
        new THREE.Vector3(0, -11.4, FZ + 3.05),
        new THREE.Vector3(0, -19.0, 15.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC34. Dedicated 3.5 mm Stereo Plug-In-Power (PIP) External Mic Jack (SJ-3524)
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-temp PA10T matte-black housing with top cutaway inspection recess revealing T/R/S leaf springs!
    const jackBody = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 5.2, 5.8, 0.5, 0.1, 'y'),
      mats.mountPpsInsulator
    );
    const windowRecess = new THREE.Mesh(
      createChamferedBoxGeo(5.8, 0.22, 4.4, 0.24, 0.03, 'y'),
      mats.matteBlackAnodized
    );
    windowRecess.position.set(0, 2.55, 0);
    windowRecess.userData.noEdges = true;

    // Iconic Sony anodized RED metallic bezel collar ring + CNC steel chamfered lip + dark bore!
    const collar = new THREE.Mesh(hiResCyl(2.45, 2.55, 1.95, 34), mats.bodyRecRed);
    collar.rotation.z = Math.PI / 2;
    collar.position.set(-4.55, 0, 0);
    const silverLip = new THREE.Mesh(hiResTorus(2.05, 0.19, 10, 30), u.micOemScrewSteel);
    silverLip.rotation.y = Math.PI / 2;
    silverLip.position.set(-5.48, 0, 0);
    silverLip.userData.noEdges = true;
    const innerRing = new THREE.Mesh(hiResTorus(1.8, 0.07, 8, 26), mats.goldPlating);
    innerRing.rotation.y = Math.PI / 2;
    innerRing.position.set(-5.36, 0, 0);
    innerRing.userData.noEdges = true;
    const bore = new THREE.Mesh(hiResCyl(1.72, 1.72, 2.15, 24), mats.matteBlackAnodized);
    bore.rotation.z = Math.PI / 2;
    bore.position.set(-4.62, 0, 0);
    bore.userData.noEdges = true;

    // 3 curved phosphor-bronze Tip / Ring / Sleeve contact leaf springs + gold rivets + red tip-break switch cam!
    for (let i = 0; i < 3; i++) {
      const lx = -1.9 + i * 1.9;
      const spring = new THREE.Mesh(
        createChamferedBoxGeo(0.95, 0.3, 5.2, 0.12, 0.03, 'y'),
        mats.beCuSpring
      );
      spring.position.set(lx, 2.74, 0);
      spring.userData.noEdges = true;
      const rivet = new THREE.Mesh(hiResSphere(0.24, 10, 8), mats.goldPlating);
      rivet.scale.set(1.0, 0.55, 1.0);
      rivet.position.set(lx, 2.92, i === 1 ? -1.1 : 1.1);
      rivet.userData.noEdges = true;
      g.add(spring, rivet);
    }
    const switchCam = new THREE.Mesh(
      createChamferedBoxGeo(0.72, 0.42, 1.45, 0.12, 0.03, 'y'),
      mats.cinnabarAnodized
    );
    switchCam.position.set(2.5, 2.76, -1.6);
    switchCam.userData.noEdges = true;

    // 5 gold PCB solder pins + 2 molded PA10T bottom locating boss pegs
    for (let i = 0; i < 5; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.25, 0.42), mats.goldPlating);
      pin.position.set(-2.6 + i * 1.3, -2.95, i % 2 === 0 ? -1.7 : 1.7);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    for (const px of [-2.0, 2.0]) {
      const peg = new THREE.Mesh(hiResCyl(0.45, 0.38, 0.95, 14), mats.mountPpsInsulator);
      peg.position.set(px, -2.9, 0);
      peg.userData.noEdges = true;
      g.add(peg);
    }
    g.add(jackBody, windowRecess, collar, silverLip, innerRing, bore, switchCam);

    parts.push(
      finalizeMicPart(
        'mc-35mm-trs-mic-jack',
        34,
        '#dc2626',
        g,
        new THREE.Vector3(-23.2, 4.6, 2.8),
        new THREE.Vector3(-36.0, 2.0, 8.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC35. Multi-Interface (MI) Shoe 24-bit Digital Audio Interface Bypass Bus (21-Pin MIS-2006)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Bespoke MI-Shoe 21-pin digital audio flex bridge routing I2S/TDM & +3.1V REG directly to DSP!
    const bridgeBody = makeTexturedHorizPlate(
      createRoundedRectShape(11.0, 22.0, 1.2),
      11.0,
      22.0,
      0.34,
      u.micMiShoeDigitalFlex,
      0.04,
      18
    );
    const emiFoil = makeHiResHorizPlate(
      createRoundedRectShape(8.4, 15.2, 0.8),
      0.13,
      mats.emiShieldFilm,
      0.02,
      1,
      12
    );
    emiFoil.position.set(0, 0.22, -0.6);
    emiFoil.userData.noEdges = true;

    // 4 embossed differential micro-coax shield traces running down flex spine
    for (let i = 0; i < 4; i++) {
      const tr = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 16.0), mats.copperCoil);
      tr.position.set(-2.4 + i * 1.6, 0.30, -0.5);
      tr.userData.noEdges = true;
      g.add(tr);
    }

    // Authentic 21 ENIG gold Sony Multi-Interface Shoe pickup contact fingers + blue PI stiffener!
    const fingerGeo = new THREE.BoxGeometry(0.28, 0.12, 2.35);
    const fingers = new THREE.InstancedMesh(fingerGeo, mats.goldPlating, 21);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 21; i++) {
      dm.position.set(-4.5 + i * 0.45, 0.24, 9.25);
      dm.updateMatrix();
      fingers.setMatrixAt(i, dm.matrix);
    }
    fingers.instanceMatrix.needsUpdate = true;
    fingers.userData.noEdges = true;
    const blueBacking = new THREE.Mesh(
      createChamferedBoxGeo(10.2, 0.22, 3.0, 0.2, 0.03, 'y'),
      mats.mountShimBlue
    );
    blueBacking.position.set(0, -0.26, 9.25);
    blueBacking.userData.noEdges = true;

    // Board-to-board mezzanine plug header at rear (-Z) with twin rows of gold mezzanine contacts
    const headerBlock = new THREE.Mesh(
      createChamferedBoxGeo(10.2, 1.4, 2.8, 0.3, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    headerBlock.position.set(0, -0.82, -9.2);
    for (let i = 0; i < 10; i++) {
      for (const hz of [-0.72, 0.72]) {
        const mPin = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.34), mats.goldPlating);
        mPin.position.set(-3.6 + i * 0.8, -1.48, -9.2 + hz);
        mPin.userData.noEdges = true;
        g.add(mPin);
      }
    }
    g.add(bridgeBody, emiFoil, fingers, blueBacking, headerBlock);

    parts.push(
      finalizeMicPart(
        'mc-mi-shoe-digital-bridge',
        35,
        '#eab308',
        g,
        new THREE.Vector3(24.8, -4.8, -3.0),
        new THREE.Vector3(34.0, -4.5, -10.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC36. Rear Acoustic Back-Cavity Tuning Chamber & Brass EMI Grounding Clip
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded >PC-GF30< rear Helmholtz acoustic back-volume tuning chamber with internal divider baffles!
    const chamber = makeHiResHorizPlate(
      createFrameShape(13.6, 10.4, 1.8, 10.6, 7.4, 1.2),
      3.6,
      mats.mountPpsInsulator,
      0.14,
      2,
      20
    );
    // Planar top collar showcasing OEM resin grain + calibrated rear Helmholtz acoustic relief slot
    const topCap = makeTexturedHorizPlate(
      createFrameShape(13.4, 10.2, 1.7, 10.8, 7.6, 1.2),
      13.4,
      10.2,
      0.24,
      u.micOemHolderResin,
      0.04,
      18
    );
    topCap.position.y = 1.86;
    topCap.userData.noEdges = true;
    const ventSlot = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 0.65, 1.85, 0.14, 0.03, 'y'),
      mats.matteBlackAnodized
    );
    ventSlot.position.set(0, -0.35, -4.6);
    ventSlot.userData.noEdges = true;

    // Internal acoustic damping Poron felt block + twin tuned baffle ribs
    const foamGeo = extrudeHiRes(createRoundedRectShape(10.2, 7.0, 1.0), 2.6, 0.1, 0.1, 1, 16);
    foamGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(foamGeo, 6.0);
    const foamFill = new THREE.Mesh(foamGeo, u.micAcousticFelt);
    foamFill.userData.noEdges = true;
    for (const bx of [-2.8, 2.8]) {
      const baffle = new THREE.Mesh(
        createChamferedBoxGeo(0.45, 2.8, 6.8, 0.08, 0.03, 'y'),
        mats.mountPpsInsulator
      );
      baffle.position.set(bx, 0, 0);
      baffle.userData.noEdges = true;
      g.add(baffle);
    }

    // Multi-bend spring-loaded phosphor-bronze / gold EMI chassis grounding leaf clip + rivet + contact dimple!
    const clipBase = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 0.45, 2.4, 0.2, 0.04, 'y'),
      mats.beCuSpring
    );
    clipBase.position.set(0, 2.15, 3.8);
    const clipCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 2.35, 3.8),
      new THREE.Vector3(-0.6, 3.45, 3.8),
      new THREE.Vector3(0.8, 3.55, 3.8),
      new THREE.Vector3(1.9, 2.55, 3.8),
    ]);
    const clipLeaf = new THREE.Mesh(
      markHiRes(new THREE.TubeGeometry(clipCurve, 22, 0.34, 8, false)),
      mats.goldPlating
    );
    const contactDimple = new THREE.Mesh(hiResSphere(0.42, 12, 10), mats.goldPlating);
    contactDimple.scale.set(1.2, 0.65, 1.0);
    contactDimple.position.set(0.15, 3.72, 3.8);
    contactDimple.userData.noEdges = true;
    const rivet = new THREE.Mesh(hiResCyl(0.42, 0.42, 0.68, 14), u.micOemScrewSteel);
    rivet.position.set(-1.65, 2.18, 3.8);
    rivet.userData.noEdges = true;
    g.add(chamber, topCap, ventSlot, foamFill, clipBase, clipLeaf, contactDimple, rivet);

    parts.push(
      finalizeMicPart(
        'mc-rear-helmholtz-baffle',
        36,
        '#d97706',
        g,
        new THREE.Vector3(0, -1.6, -12.5),
        new THREE.Vector3(0, -10.0, -28.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC37. 3.5 mm Zero-Latency Headphone Monitor Amp IC & Green-Ring TRS Jack
  // =========================================================================
  {
    const g = new THREE.Group();
    // Side-paired 3.5 mm stereo headphone jack right beside Sony's Red Mic Jack (MC34)!
    const jackBody = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 5.2, 5.8, 0.5, 0.1, 'y'),
      mats.mountPpsInsulator
    );
    // Iconic Sony anodized EMERALD-GREEN metallic bezel collar ring + CNC steel chamfered lip + dark bore!
    const collar = new THREE.Mesh(hiResCyl(2.45, 2.55, 1.95, 34), u.micGreenJackCollar);
    collar.rotation.z = Math.PI / 2;
    collar.position.set(-4.55, 0, 0);
    const silverLip = new THREE.Mesh(hiResTorus(2.05, 0.19, 10, 30), u.micOemScrewSteel);
    silverLip.rotation.y = Math.PI / 2;
    silverLip.position.set(-5.48, 0, 0);
    silverLip.userData.noEdges = true;
    const innerRing = new THREE.Mesh(hiResTorus(1.8, 0.07, 8, 26), mats.goldPlating);
    innerRing.rotation.y = Math.PI / 2;
    innerRing.position.set(-5.36, 0, 0);
    innerRing.userData.noEdges = true;
    const bore = new THREE.Mesh(hiResCyl(1.72, 1.72, 2.15, 24), mats.matteBlackAnodized);
    bore.rotation.z = Math.PI / 2;
    bore.position.set(-4.62, 0, 0);
    bore.userData.noEdges = true;

    // Dedicated clickless Class-AB/G headphone driver QFN-20 amp + 4 output coupling MLCCs atop sub-carrier!
    const hpAmp = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.78,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    hpAmp.position.set(1.0, 2.95, 0);
    for (const [cx, cz] of [
      [-2.1, -1.45],
      [-2.1, 1.45],
      [-2.1, -0.48],
      [-2.1, 0.48],
    ]) {
      const cap = buildSmdPassive(1.1, 0.56, 0.48, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(cx, 2.86, cz);
      g.add(cap);
    }

    // 5 gold PCB solder pins + 2 bottom locating boss pegs
    for (let i = 0; i < 5; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.25, 0.42), mats.goldPlating);
      pin.position.set(-2.6 + i * 1.3, -2.95, i % 2 === 0 ? -1.7 : 1.7);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    for (const px of [-2.0, 2.0]) {
      const peg = new THREE.Mesh(hiResCyl(0.45, 0.38, 0.95, 14), mats.mountPpsInsulator);
      peg.position.set(px, -2.9, 0);
      peg.userData.noEdges = true;
      g.add(peg);
    }
    g.add(jackBody, collar, silverLip, innerRing, bore, hpAmp);

    parts.push(
      finalizeMicPart(
        'mc-headphone-monitor-amp',
        37,
        '#10b981',
        g,
        new THREE.Vector3(-23.2, 4.6, -5.0),
        new THREE.Vector3(-36.0, -3.5, -10.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC38. Ultra-Low-Noise 2.8 V MICBIAS Reference LDO & RC Pi-Filter Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    const subPcb = makeTexturedHorizPlate(
      createRoundedRectShape(6.2, 10.6, 0.8),
      6.2,
      10.6,
      0.78,
      u.micAudioMainPcb,
      0.05,
      14
    );
    // Ultra-low-noise (<6 uVrms) 2.8V MICBIAS LDO regulator (DFN-8)
    const ldoIc = buildChipPackage({
      w: 2.9,
      d: 2.4,
      h: 0.82,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    ldoIc.position.set(0, 0.8, 0);
    // L/R independent RC Pi-filter: yellow tantalum bulk caps (with anode stripe!) + 0402 C0G bypass + 2.2 kOhm 0.1% resistors
    for (const sz of [-3.1, 3.1]) {
      const cap = buildSmdPassive(2.2, 1.15, 0.78, mats.tantalumCapYellow, mats.silverElectrode, 'y');
      cap.position.set(-0.9, 0.78, sz);
      const anodeBar = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 1.12), mats.cinnabarAnodized);
      anodeBar.position.set(-1.62, 1.19, sz);
      anodeBar.userData.noEdges = true;
      const res = buildSmdPassive(1.5, 0.8, 0.54, mats.matteBlackAnodized, mats.goldPlating, 'y');
      res.position.set(1.55, 0.66, sz);
      const c0g = buildSmdPassive(1.05, 0.54, 0.44, mats.smdCeramic, mats.silverElectrode, 'y');
      c0g.position.set(1.55, 0.61, sz * 1.42);
      g.add(cap, anodeBar, res, c0g);
    }
    // Gold star distribution bus + 8 stitched perimeter guard vias
    const bus = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.07, 8.2), mats.goldPlating);
    bus.position.set(-2.35, 0.43, 0);
    bus.userData.noEdges = true;
    const viaGeo = hiResCyl(0.16, 0.16, 0.84, 10);
    const vias = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 8);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 4; i++) {
      const vz = -4.2 + i * 2.8;
      dm.position.set(-2.6, 0, vz);
      dm.updateMatrix();
      vias.setMatrixAt(i, dm.matrix);
      dm.position.set(2.6, 0, vz);
      dm.updateMatrix();
      vias.setMatrixAt(i + 4, dm.matrix);
    }
    vias.instanceMatrix.needsUpdate = true;
    vias.userData.noEdges = true;
    g.add(subPcb, ldoIc, bus, vias);

    parts.push(
      finalizeMicPart(
        'mc-micbias-lownoise-ldo',
        38,
        '#f59e0b',
        g,
        new THREE.Vector3(0, -9.2, 4.2),
        new THREE.Vector3(0, -17.5, 11.5),
        cp
      )
    );
  }

  // =========================================================================
  // MC39. 5-Channel Audio Input ±15 kV ESD / TVS Surge Clamp Diode Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const esdPcb = makeTexturedHorizPlate(
      createRoundedRectShape(5.6, 8.8, 0.75),
      5.6,
      8.8,
      0.72,
      u.micAudioMainPcb,
      0.05,
      14
    );
    // DFN-10 5-channel bidirectional ±15 kV TVS diode clamp IC + crimson cathode polarity bar!
    const tvs = buildChipPackage({
      w: 3.2,
      d: 2.2,
      h: 0.76,
      style: 'dfn',
      pinsPerSide: 5,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.goldPlating,
      pin1Mat: mats.bodyRecRed,
      axis: 'y',
    });
    tvs.position.set(0, 0.76, 0.45);
    const cathodeBar = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.08, 0.24), mats.bodyRecRed);
    cathodeBar.position.set(0, 1.16, -0.35);
    cathodeBar.userData.noEdges = true;

    // 5 parallel gold surge-clamped audio trace lanes + heavy copper ESD chassis bleed busbar + 8 stitched ground vias!
    for (let i = 0; i < 5; i++) {
      const tx = -1.6 + i * 0.8;
      const lane = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 4.2), mats.goldPlating);
      lane.position.set(tx, 0.40, 1.6);
      lane.userData.noEdges = true;
      g.add(lane);
    }
    const gndBus = new THREE.Mesh(
      createChamferedBoxGeo(4.5, 0.26, 1.45, 0.16, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    gndBus.position.set(0, 0.46, -2.85);
    const viaGeo = hiResCyl(0.22, 0.22, 0.86, 12);
    const vias = new THREE.InstancedMesh(viaGeo, mats.goldPlating, 8);
    const dm = new THREE.Object3D();
    for (let i = 0; i < 4; i++) {
      const vx = -1.65 + i * 1.1;
      dm.position.set(vx, 0.08, -2.5);
      dm.updateMatrix();
      vias.setMatrixAt(i, dm.matrix);
      dm.position.set(vx, 0.08, -3.22);
      dm.updateMatrix();
      vias.setMatrixAt(i + 4, dm.matrix);
    }
    vias.instanceMatrix.needsUpdate = true;
    vias.userData.noEdges = true;
    g.add(esdPcb, tvs, cathodeBar, gndBus, vias);

    parts.push(
      finalizeMicPart(
        'mc-esd-tvs-rail-guard',
        39,
        '#e11d48',
        g,
        new THREE.Vector3(-24.2, -9.2, 4.2),
        new THREE.Vector3(-32.0, -18.5, 11.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC40. IBIS 5-Axis VCM & Lens AF-Motor Synchronous Noise-Reference Telemetry Bus
  // =========================================================================
  {
    const g = new THREE.Group();
    const refPcb = makeTexturedHorizPlate(
      createRoundedRectShape(8.4, 10.2, 0.8),
      8.4,
      10.2,
      0.76,
      u.micAudioMainPcb,
      0.05,
      14
    );
    const refIc = buildChipPackage({
      w: 4.1,
      d: 4.1,
      h: 0.88,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.micCodecQfnPackage,
      leadMat: mats.silverElectrode,
      topAccentMat: u.micAiNpuDie,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    refIc.position.set(0, 0.84, -1.35);

    // 4 RC anti-aliasing filter passives flanking adaptive-notch IC
    for (const sx of [-2.85, 2.85]) {
      for (const sz of [-2.4, -0.3]) {
        const pass = buildSmdPassive(1.1, 0.56, 0.44, mats.smdCeramic, mats.goldPlating, 'y');
        pass.position.set(sx, 0.60, sz);
        g.add(pass);
      }
    }

    // 3-wire braided twisted differential PWM telemetry harness (VCM_X / VCM_Y / AF_STEP) anchored to gold pads!
    const wireDefs: Array<[number, THREE.Material, number]> = [
      [0, mats.goldPlating, 2.35],
      [(Math.PI * 2) / 3, mats.vcWorkingFluidCyan, 2.95],
      [(Math.PI * 4) / 3, mats.cinnabarAnodized, 3.55],
    ];
    for (const [phase, mat, padZ] of wireDefs) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 18; i++) {
        const t = i / 18;
        const a = phase + t * Math.PI * 4.2;
        pts.push(new THREE.Vector3(-3.3 + t * 6.6, 0.68 + Math.sin(a) * 0.24, 2.95 + Math.cos(a) * 0.42));
      }
      const wire = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 26, 0.125, 7, false)),
        mat
      );
      wire.userData.noEdges = true;
      // Gold PCB termination pads + silver solder domes at left/right anchor ends
      for (const ex of [-3.35, 3.35]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.1, 0.42), mats.goldPlating);
        pad.position.set(ex, 0.42, padZ);
        pad.userData.noEdges = true;
        const solder = new THREE.Mesh(hiResSphere(0.18, 8, 6), mats.solderBallSilver);
        solder.scale.set(1.2, 0.65, 1.0);
        solder.position.set(ex, 0.52, padZ);
        solder.userData.noEdges = true;
        g.add(pad, solder);
      }
      g.add(wire);
    }
    g.add(refPcb, refIc);

    parts.push(
      finalizeMicPart(
        'mc-ibis-motor-notch-ref',
        40,
        '#0ea5e9',
        g,
        new THREE.Vector3(25.2, -9.2, -9.5),
        new THREE.Vector3(34.0, -21.5, -14.0),
        cp
      )
    );
  }

  // =========================================================================
  // MC41. Flexible Copper-Braid Acoustic Decoupling Micro-Lead Bridge & Grommet
  // =========================================================================
  {
    const g = new THREE.Group();
    // Supple S-curved twin-helix braided 36-AWG copper/gold Litz acoustic decoupling leads stopping PCB vibration!
    for (const side of [-1, 1]) {
      const sx = side * 14.2;
      for (const pol of [-0.65, 0.65]) {
        const baseCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(sx + pol, 1.55, 0),
          new THREE.Vector3(sx + pol * 1.4, 0.55, 1.45),
          new THREE.Vector3(sx + pol * 0.8, -0.55, -0.85),
          new THREE.Vector3(sx + pol, -1.65, 0.1),
        ]);
        // Two counter-twisted micro-strands forming realistic braided Litz conductor!
        for (const hPhase of [0, Math.PI]) {
          const pts: THREE.Vector3[] = [];
          for (let k = 0; k <= 22; k++) {
            const t = k / 22;
            const p = baseCurve.getPoint(t);
            const ang = hPhase + t * Math.PI * 10;
            const rad = 0.08 * Math.sin(t * Math.PI);
            pts.push(new THREE.Vector3(p.x + Math.cos(ang) * rad, p.y, p.z + Math.sin(ang) * rad));
          }
          const strand = new THREE.Mesh(
            markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.095, 6, false)),
            pol < 0
              ? hPhase === 0
                ? mats.copperCoil
                : mats.brassGear
              : hPhase === 0
                ? mats.goldPlating
                : mats.copperCoil
          );
          strand.userData.noEdges = true;
          g.add(strand);
        }
        // Silver-tin solder termination boots + brass capsule terminal pins at top & bottom ends
        for (const [ty, tz] of [
          [1.58, 0],
          [-1.68, 0.1],
        ]) {
          const boot = new THREE.Mesh(hiResCyl(0.22, 0.18, 0.42, 12), mats.solderBallSilver);
          boot.position.set(sx + pol, ty, tz);
          boot.userData.noEdges = true;
          g.add(boot);
        }
        const termPin = new THREE.Mesh(hiResCyl(0.14, 0.14, 0.52, 10), mats.brassGear);
        termPin.position.set(sx + pol, 1.88, 0);
        termPin.userData.noEdges = true;
        g.add(termPin);
      }

      // Ribbed dual-lip silicone acoustic strain-relief grommet collar at base of each floating capsule
      const grommet = new THREE.Mesh(hiResTorus(1.48, 0.36, 12, 26), u.micRubberBootBlack);
      grommet.rotation.x = Math.PI / 2;
      grommet.position.set(sx, -1.32, 0.1);
      const grommetBot = new THREE.Mesh(hiResTorus(1.56, 0.28, 10, 26), mats.damperElastomer);
      grommetBot.rotation.x = Math.PI / 2;
      grommetBot.position.set(sx, -1.72, 0.1);
      grommetBot.userData.noEdges = true;
      g.add(grommet, grommetBot);
    }

    parts.push(
      finalizeMicPart(
        'mc-cap-solder-strain-relief',
        41,
        '#d97706',
        g,
        new THREE.Vector3(0, -4.3, FZ),
        new THREE.Vector3(0, -8.5, 12.5),
        cp,
        0.18
      )
    );
  }

  // =========================================================================
  // MC42. Top-Deck Magnesium Grille-to-Chassis Molded EPDM Weather-Seal Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    // Continuous dual-lip molded EPDM perimeter weather-seal ring sealing MC02 top deck to body!
    const outerGeo = extrudeHiRes(
      createFrameShape(52.4, 32.4, 4.0, 48.2, 28.2, 3.1),
      0.72,
      0.12,
      0.12,
      2,
      26
    );
    outerGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(outerGeo, 10.0);
    const outerSeal = new THREE.Mesh(outerGeo, u.micRubberBootBlack);

    // Twin concentric raised labyrinth compression sealing beads on top + bottom compression ridge!
    const outerBead = makeHiResHorizPlate(
      createFrameShape(51.6, 31.6, 3.7, 50.6, 30.6, 3.45),
      0.34,
      mats.butylDamperRubber,
      0.06,
      1,
      24
    );
    outerBead.position.y = 0.42;
    outerBead.userData.noEdges = true;
    const innerBead = makeHiResHorizPlate(
      createFrameShape(49.6, 29.6, 3.3, 48.7, 28.7, 3.15),
      0.30,
      mats.butylDamperRubber,
      0.05,
      1,
      24
    );
    innerBead.position.y = 0.40;
    innerBead.userData.noEdges = true;
    const botBead = makeHiResHorizPlate(
      createFrameShape(50.8, 30.8, 3.5, 49.6, 29.6, 3.3),
      0.24,
      mats.damperElastomer,
      0.04,
      1,
      22
    );
    botBead.position.y = -0.38;
    botBead.userData.noEdges = true;

    // 4 molded corner alignment dowel ears fitted with CNC brass locator bushings + 6 lateral retention nubs
    for (const [ex, ez] of [
      [-23.5, -13.5],
      [23.5, -13.5],
      [-23.5, 13.5],
      [23.5, 13.5],
    ]) {
      const ear = new THREE.Mesh(hiResCyl(1.18, 1.24, 0.86, 18), u.micRubberBootBlack);
      ear.position.set(ex, 0, ez);
      ear.userData.noEdges = true;
      const bushing = new THREE.Mesh(hiResCyl(0.56, 0.56, 0.94, 14), mats.brassGear);
      bushing.position.set(ex, 0, ez);
      bushing.userData.noEdges = true;
      const hole = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.98, 12), mats.matteBlackAnodized);
      hole.position.set(ex, 0, ez);
      hole.userData.noEdges = true;
      g.add(ear, bushing, hole);
    }
    for (const nx of [-14.0, 0, 14.0]) {
      for (const nz of [-14.3, 14.3]) {
        const nub = new THREE.Mesh(createChamferedBoxGeo(1.8, 0.56, 0.52, 0.1, 0.03, 'y'), mats.butylDamperRubber);
        nub.position.set(nx, 0, nz);
        nub.userData.noEdges = true;
        g.add(nub);
      }
    }
    g.add(outerSeal, outerBead, innerBead, botBead);

    parts.push(
      finalizeMicPart(
        'mc-topdeck-waterproof-o-ring',
        42,
        '#1e293b',
        g,
        new THREE.Vector3(0, 12.05, -1.5),
        new THREE.Vector3(0, 18.2, -3.5),
        cp,
        0.18
      )
    );
  }

  parts.push(...buildMicUltra30Parts(mats));
  parts.push(...buildMicUltra31Parts(mats));
  parts.push(...buildMicUltra36Parts(mats));

  return parts;
}
