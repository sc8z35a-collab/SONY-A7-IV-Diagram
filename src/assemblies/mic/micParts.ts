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
  // MC01. Detachable Acoustic Fur Windscreen ("Deadcat" / ZV-Series)
  // =========================================================================
  {
    const g = new THREE.Group();

    // Precision satin-charcoal molded windscreen collar + brushed silver Sony trim bezel
    const baseGeo = extrudeHiRes(createRoundedRectShape(45.2, 19.4, 6.2), 1.15, 0.16, 0.16, 2, 28);
    baseGeo.rotateX(-Math.PI / 2);
    applyBoxUVs(baseGeo, 14.0);
    const basePlate = new THREE.Mesh(baseGeo, u.batPolycarbonateShell);

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

    // Soft sculpted deep-obsidian acoustic fleece core tucked inside the multi-filament fur canopy
    const domeGeo = hiResSphere(15.2, 44, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const domeCore = new THREE.Mesh(domeGeo, u.micAcousticFelt);
    domeCore.scale.set(1.34, 0.48, 0.58);
    domeCore.position.y = 0.48;
    domeCore.userData.noEdges = true;

    // Multi-filament 4-strand wispy plush fur cluster geometry (1 instance = 4 silky curved synthetic hairs!)
    // Eliminates stubby triangular scales AND gives 7,400+ soft overlapping acoustic fleece hairs!
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
    const radialSegs = 4;
    const heightSegs = 4;
    let vBase = 0;
    for (const sp of strandSpecs) {
      for (let iy = 0; iy <= heightSegs; iy++) {
        const t = iy / heightSegs;
        const r = sp.rad * (1.0 - t * 0.90) * (1.0 + Math.sin(t * Math.PI) * 0.28);
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
          tuftIdx.push(a, b, c, a, c, d);
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

    // Deterministic seeded helper for organic 360-degree woolly faux-fur parting
    const furRng = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const makePlushFurLayer = (
      count: number,
      mat: THREE.Material,
      lenScale: number,
      rSpread: number,
      seedOffset: number,
      yBias: number,
      rimBandOnly = false
    ) => {
      const inst = new THREE.InstancedMesh(lockGeo, mat, count);
      const dm = new THREE.Object3D();
      // CRITICAL: 'YXZ' Euler order applies azimuthal yaw around world Y FIRST, then radial outward tilt!
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
        // Plush natural combing: soft lofty crown tapering to collar-hugging fleece around the base rim!
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

    // 1,850 multi-filament clusters (= 7,400 individual silky overlapping faux-fur hairs!) covering 100% of dome + collar rim!
    const furUndercoat = makePlushFurLayer(640, u.micAcousticFelt, 0.94, 0.99, 17, -0.10, false);
    const furMidcoat = makePlushFurLayer(660, u.micDeadcatFur, 1.04, 1.00, 83, 0.04, false);
    const furSilverTips = makePlushFurLayer(330, mats.lensFoamSeal, 1.06, 1.01, 211, 0.14, false);
    const furRimFringe = makePlushFurLayer(220, u.micDeadcatFur, 0.92, 1.00, 389, -0.06, true);
    g.add(furUndercoat, furMidcoat, furSilverTips, furRimFringe);

    // Authentic Sony Multi-Interface (MI) Shoe locking adapter foot underneath
    const shoeStem = new THREE.Mesh(
      createChamferedBoxGeo(11.6, 1.35, 9.2, 0.8, 0.14, 'y'),
      u.batPolycarbonateShell
    );
    shoeStem.position.set(0, -1.1, -3.2);
    const shoeFlange = new THREE.Mesh(
      createChamferedBoxGeo(14.8, 0.65, 11.4, 0.7, 0.1, 'y'),
      u.batPolycarbonateShell
    );
    shoeFlange.position.set(0, -1.95, -3.2);
    // Spring retention leaf & brass ground contact on MI shoe foot
    const shoeLatch = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.28, 4.6), mats.stainlessMachined);
    shoeLatch.position.set(0, -2.3, -3.2);
    shoeLatch.userData.noEdges = true;
    g.add(basePlate, silverTrim, domeCore, shoeStem, shoeFlange, shoeLatch);

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
    // Drill TRUE circular holes right through the powder-coated magnesium top deck!
    for (const [hx, hz] of holePositions) {
      const hPath = new THREE.Path();
      hPath.absarc(hx, -hz, 0.72, 0, Math.PI * 2, true);
      topDeckShape.holes.push(hPath);
    }

    const topDeck = makeTexturedHorizPlate(topDeckShape, deckW, deckD, 1.55, u.micTopDeckMg, 0.18, 28);

    // Sculpted Sony α7 IV die-cast magnesium top-deck perimeter housing shroud walls!
    // Completely encloses the upper camera microphone bay on all 4 sides when assembled (ZERO floating lid / open sides!)
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
    const shroudWalls = new THREE.Mesh(shroudGeo, u.batPolycarbonateShell);
    shroudWalls.position.y = -8.25;

    // Cleanly separated machined brushed-titanium shoulder trim belt seated BELOW topDeck chamfer (ZERO Z-fighting!)
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

    // Lower magnesium chassis mounting flange lip + die-cast aluminum EMI bottom pan rim framing the ZIF bay!
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

    // Front-wall sculpted Sony acoustic module recessed badge plate + twin countersunk M1.4 titanium Phillips screws!
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
    g.add(frontAccent, frontTrimBar, frontTrimBot);

    // Countersunk M1.4 Phillips titanium chassis screws on Front (+Z) & Rear (-Z) magnesium flanks (heads facing OUTWARD!)
    for (const sx of [-18.5, 18.5]) {
      for (const [sz, rotX] of [
        [deckD * 0.5 - 0.12, -Math.PI / 2],
        [-deckD * 0.5 + 0.12, Math.PI / 2],
      ]) {
        const scr = buildPhillipsScrew(0.95, 0.42, 0.42, 1.3, mats.titaniumRivet, mats.matteBlackAnodized, mats.stainlessMachined);
        scr.rotation.x = rotX;
        scr.position.set(sx, -6.8, sz);
        g.add(scr);
      }
    }

    // Left-flank (-X) sculpted Dual 3.5mm Audio I/O Port Escutcheon Bezel framing MC34 (Red Mic) & MC37 (Green Headphone)!
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
    // Left-wall Phillips chassis retainer screws (domed heads facing OUTWARD along -X!)
    for (const sz of [-6.8, 7.4]) {
      const lScr = buildPhillipsScrew(0.78, 0.38, 0.35, 1.1, mats.stainlessMachined, mats.matteBlackAnodized, mats.titaniumRivet);
      lScr.rotation.z = -Math.PI / 2;
      lScr.position.set(-deckW * 0.5 - 0.25, -13.4, sz);
      g.add(lScr);
    }
    g.add(ioEscutcheon, ioSilverFrame);

    // Right-flank (+X) CNC-machined MI-Shoe Digital Flex Strain-Relief Clamp Plate with twin titanium Phillips screws!
    const rightClamp = new THREE.Mesh(
      createChamferedBoxGeo(1.15, 5.2, 18.6, 0.35, 0.12, 'y'),
      mats.magnesiumCast
    );
    rightClamp.position.set(deckW * 0.5 - 0.05, -12.6, -1.5);
    for (const sz of [-8.2, 5.2]) {
      const rScr = buildPhillipsScrew(0.82, 0.4, 0.38, 1.1, mats.titaniumRivet, mats.matteBlackAnodized, mats.stainlessMachined);
      rScr.rotation.z = Math.PI / 2;
      rScr.position.set(deckW * 0.5 + 0.35, -12.6, sz);
      g.add(rScr);
    }
    g.add(rightClamp);

    // Authentic Sony Brushed-Stainless Multi-Interface (MI) Shoe Hot-Shoe Rail seated behind deadcat on top deck!
    const miShoeBase = makeHiResHorizPlate(
      createFrameShape(16.8, 14.2, 1.2, 12.6, 10.6, 0.6),
      0.55,
      mats.stainlessMachined,
      0.06,
      2,
      18
    );
    miShoeBase.position.set(0, 0.96, localFZ - 3.2);
    miShoeBase.userData.noEdges = true;
    g.add(miShoeBase);

    // Subtle dark countersunk chamfers + gleaming CNC silver chamfer rings lining all 23 precision-drilled holes!
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

    // 4 machined underside cast-magnesium screw fastener bosses with brass thread inserts
    for (const [bx, bz] of [
      [-23.2, -13.2],
      [23.2, -13.2],
      [-23.2, 13.2],
      [23.2, 13.2],
    ]) {
      const boss = new THREE.Mesh(hiResCyl(1.35, 1.5, 1.45, 16), mats.magnesiumCast);
      boss.position.set(bx, -1.25, bz);
      const thread = new THREE.Mesh(hiResCyl(0.72, 0.72, 1.52, 14), mats.brassGear);
      thread.position.set(bx, -1.25, bz);
      thread.userData.noEdges = true;
      g.add(boss, thread);
    }

    // CNC-beveled brushed magnesium trim bezels framing the L, R, and Rear grilles
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
      g.add(bezel);
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
      // Stamped 304 stainless steel frame with perimeter mounting ears
      const rim = makeHiResHorizPlate(
        createFrameShape(w, w, 1.4, w - 1.7, w - 1.7, 0.8),
        0.38,
        mats.stainlessMachined,
        0.05,
        2,
        20
      );
      rim.position.set(cx, 0, cz);

      // Photorealistic woven 304 stainless twill micro-mesh screen
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

      // 4 subtle laser-welded corner tack tabs on frame
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          const tack = new THREE.Mesh(hiResCyl(0.32, 0.32, 0.42, 10), mats.silverElectrode);
          tack.position.set(cx + sx * (w * 0.43), 0.04, cz + sz * (w * 0.43));
          tack.userData.noEdges = true;
          g.add(tack);
        }
      }
      g.add(rim, meshPlate);
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
  // MC04. Hydrophobic Microporous ePTFE Waterproof Acoustic Vent Membrane
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const [cx, cz, r] of [
      [LX, FZ, 4.45],
      [RX, FZ, 4.45],
      [0, -12.5, 3.65],
    ] as Array<[number, number, number]>) {
      // Die-cut matte-black 3M pressure-sensitive adhesive (PSA) sealing ring with installation pull-ear
      const psaShape = new THREE.Shape();
      psaShape.absarc(0, 0, r + 0.55, 0, Math.PI * 2, false);
      const psaHole = new THREE.Path();
      psaHole.absarc(0, 0, r - 0.55, 0, Math.PI * 2, true);
      psaShape.holes.push(psaHole);
      const psa = makeHiResHorizPlate(psaShape, 0.32, u.micRubberBootBlack, 0.04, 1, 32);
      psa.position.set(cx, 0, cz);

      // Small factory alignment pull-tab extending radially
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(1.7, 0.22, 1.35, 0.35, 0.03, 'y'),
        u.micRubberBootBlack
      );
      tab.position.set(cx + (cx < 0 ? -(r + 0.85) : r + 0.85), 0, cz);
      tab.userData.noEdges = true;

      // Crisp fibrous white hydrophobic Gore-Tex ePTFE acoustic vent disc
      const memGeo = hiResCyl(r - 0.28, r - 0.28, 0.22, 32);
      applyPlanarUVs(memGeo, r * 2, r * 2, 'xz');
      const membrane = new THREE.Mesh(memGeo, u.micEptfeMembrane);
      membrane.position.set(cx, 0.05, cz);
      membrane.userData.noEdges = true;
      g.add(psa, tab, membrane);
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
      const block = makeHiResHorizPlate(blockShape, 1.78, mats.magnesiumCast, 0.12, 2, 24);
      block.position.set(cx, 0, FZ);

      // Machined outer capillary rainwater diversion spillway trough
      const outerSign = cx < 0 ? -1 : 1;
      const drainWall = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 0.95, 9.6, 0.45, 0.08, 'y'),
        mats.stainlessMachined
      );
      drainWall.position.set(cx + outerSign * 4.45, 0.56, FZ);
      const drainWaterFilm = new THREE.Mesh(
        createChamferedBoxGeo(1.85, 0.42, 8.6, 0.3, 0.04, 'y'),
        mats.vcWorkingFluidCyan
      );
      drainWaterFilm.position.set(cx + outerSign * 4.45, 0.92, FZ);
      drainWaterFilm.userData.noEdges = true;

      // Internal 90-degree acoustic redirect crank baffle shielding capsule from straight droplet strike
      const baffle = new THREE.Mesh(
        createChamferedBoxGeo(5.8, 1.22, 1.35, 0.25, 0.06, 'y'),
        u.batPolycarbonateShell
      );
      baffle.position.set(cx, 0.38, FZ + 1.45);
      // Alignment dowel pin boss
      const dowel = new THREE.Mesh(hiResCyl(0.55, 0.55, 1.4, 14), mats.stainlessMachined);
      dowel.position.set(cx - outerSign * 4.9, 0.45, FZ - 4.0);
      dowel.userData.noEdges = true;
      g.add(block, drainWall, drainWaterFilm, baffle, dowel);
    }
    // Ribbed magnesium structural cross-tie linking left & right acoustic labyrinths
    const tie = makeHiResHorizPlate(
      createRoundedRectShape(16.6, 3.4, 0.8),
      0.88,
      mats.magnesiumCast,
      0.08,
      2,
      16
    );
    tie.position.set(0, 0, FZ);
    const tieRib = new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.42, 0.55), mats.stainlessMachined);
    tieRib.position.set(0, 0.55, FZ);
    tieRib.userData.noEdges = true;
    g.add(tie, tieRib);

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
        new THREE.Vector2(r * 1.0, -0.92),
        new THREE.Vector2(r * 1.02, -0.25),
        new THREE.Vector2(r * 0.94, 0.55),
        new THREE.Vector2(r * 0.68, 0.92),
        new THREE.Vector2(r * 0.52, 0.92),
        new THREE.Vector2(r * 0.58, 0.45),
        new THREE.Vector2(r * 0.80, -0.15),
        new THREE.Vector2(r * 0.82, -0.92),
      ];
      const chamberGeo = markHiRes(new THREE.LatheGeometry(prof, 34, Math.PI * 0.28, Math.PI * 1.44));
      chamberGeo.computeVertexNormals();
      const chamber = new THREE.Mesh(chamberGeo, mats.titaniumRivet);
      chamber.position.set(cx, 0, cz);

      // Precision CNC-turned acoustic neck tuning collar ring
      const neckRing = new THREE.Mesh(hiResTorus(r * 0.58, 0.34, 14, 32), mats.stainlessMachined);
      neckRing.rotation.x = Math.PI / 2;
      neckRing.position.set(cx, 0.88, cz);

      // Subtle machined gold acoustic throat calibration ring
      const throatRing = new THREE.Mesh(hiResTorus(r * 0.48, 0.12, 10, 28), mats.goldPlating);
      throatRing.rotation.x = Math.PI / 2;
      throatRing.position.set(cx, 0.95, cz);
      throatRing.userData.noEdges = true;
      g.add(chamber, neckRing, throatRing);
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
      // Sculpted dual-lip compressible elastomeric acoustic sealing ring
      const upperLip = new THREE.Mesh(hiResTorus(r, 0.52, 14, 34), mats.damperElastomer);
      upperLip.rotation.x = Math.PI / 2;
      upperLip.position.set(cx, 0.36, cz);

      const lowerLip = new THREE.Mesh(hiResTorus(r * 0.97, 0.46, 14, 34), mats.damperElastomer);
      lowerLip.rotation.x = Math.PI / 2;
      lowerLip.position.set(cx, -0.34, cz);

      // Inner tubular compression wall sealing top port to capsule roof
      const innerWall = new THREE.Mesh(
        hiResCyl(r * 0.78, r * 0.82, 1.38, 30, true),
        u.micRubberBootBlack
      );
      innerWall.position.set(cx, -0.02, cz);

      const topBead = new THREE.Mesh(hiResTorus(r * 0.78, 0.16, 10, 28), u.micRubberBootBlack);
      topBead.rotation.x = Math.PI / 2;
      topBead.position.set(cx, 0.65, cz);
      topBead.userData.noEdges = true;

      g.add(upperLip, lowerLip, innerWall, topBead);
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
    // Authentic Sony OEM RUBBER (885): matte charcoal-black shock-isolation elastomer (never blue!)
    for (const [cx, isRect] of [
      [LX, true],
      [RX, false],
    ] as Array<[number, boolean]>) {
      if (isRect) {
        // Left MEMS rectangular shock-isolation boot with open front inspection cutaway & bellows ribs
        const sleeve = makeHiResHorizPlate(
          createFrameShape(13.8, 11.4, 2.2, 10.7, 8.3, 1.3),
          5.8,
          u.micRubberBootBlack,
          0.22,
          2,
          24
        );
        sleeve.position.set(cx, 0, FZ);
        // Molded shock-absorbing accordion isolation ribs minimizing chassis contact
        for (const ry of [-2.0, -0.68, 0.68, 2.0]) {
          const rib = makeHiResHorizPlate(
            createFrameShape(14.9, 12.5, 2.5, 13.4, 11.0, 2.0),
            0.44,
            mats.butylDamperRubber,
            0.12,
            2,
            24
          );
          rib.position.set(cx, ry, FZ);
          rib.userData.noEdges = true;
          g.add(rib);
        }
        // Molded top acoustic lip flange + corner decoupling bumpers
        const topCollar = makeHiResHorizPlate(
          createFrameShape(13.0, 10.6, 2.0, 9.6, 7.2, 1.2),
          0.45,
          u.micRubberBootBlack,
          0.1,
          2,
          20
        );
        topCollar.position.set(cx, 3.05, FZ);
        g.add(sleeve, topCollar);
      } else {
        // Right ECM cylindrical 240° cutaway rubber boot with thick lathe wall & molded bellows ribs
        const prof: THREE.Vector2[] = [
          new THREE.Vector2(5.7, -3.15),
          new THREE.Vector2(6.55, -3.15),
          new THREE.Vector2(6.65, -2.5),
          new THREE.Vector2(6.65, 2.5),
          new THREE.Vector2(6.55, 3.15),
          new THREE.Vector2(5.7, 3.15),
          new THREE.Vector2(5.65, 2.4),
          new THREE.Vector2(5.65, -2.4),
          new THREE.Vector2(5.7, -3.15),
        ];
        const cylGeo = markHiRes(new THREE.LatheGeometry(prof, 34, Math.PI * 0.28, Math.PI * 1.44));
        cylGeo.computeVertexNormals();
        const cylSleeve = new THREE.Mesh(cylGeo, u.micRubberBootBlack);
        cylSleeve.position.set(cx, 0, FZ);

        for (const ry of [-2.0, -0.68, 0.68, 2.0]) {
          const ring = new THREE.Mesh(
            hiResTorus(6.78, 0.3, 10, 30, Math.PI * 1.44),
            mats.butylDamperRubber
          );
          ring.rotation.x = Math.PI / 2;
          ring.rotation.z = Math.PI * 0.78;
          ring.position.set(cx, ry, FZ);
          ring.userData.noEdges = true;
          g.add(ring);
        }
        g.add(cylSleeve);
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
    // Molded glass-filled polycarbonate twin-cradle carrier spanning both L & R shock boots
    const bridge = makeHiResHorizPlate(
      createRoundedRectShape(43.4, 6.6, 1.8),
      1.55,
      u.batPolycarbonateShell,
      0.14,
      2,
      24
    );
    bridge.position.set(0, -1.6, FZ - 4.8);

    // Structural injection-molded stiffening ribs along bridge
    for (const rx of [-6.0, -3.0, 3.0, 6.0]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.8, 5.4), u.batPolycarbonateShell);
      rib.position.set(rx, -0.65, FZ - 4.8);
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Two contoured cradle retention yokes with side cheek flanges embracing L & R rubber boots
    for (const cx of [LX, RX]) {
      const yokeBack = new THREE.Mesh(
        createChamferedBoxGeo(15.4, 7.0, 1.65, 0.8, 0.14, 'z'),
        u.batPolycarbonateShell
      );
      yokeBack.position.set(cx, 0.85, FZ - 6.85);
      const yokeBottom = new THREE.Mesh(
        createChamferedBoxGeo(15.4, 1.25, 10.8, 0.9, 0.12, 'y'),
        u.batPolycarbonateShell
      );
      yokeBottom.position.set(cx, -2.85, FZ - 1.8);
      // Outer protective side cheek ear
      const outerSign = cx < 0 ? -1 : 1;
      const cheek = new THREE.Mesh(
        createChamferedBoxGeo(1.15, 5.2, 7.2, 0.5, 0.1, 'y'),
        u.batPolycarbonateShell
      );
      cheek.position.set(cx + outerSign * 7.65, -0.3, FZ - 3.6);
      g.add(yokeBack, yokeBottom, cheek);
    }

    // Central mounting boss tab with heat-staked knurled brass threaded insert for Ref.309 BTITE screw
    const bossTab = new THREE.Mesh(hiResCyl(3.3, 3.65, 2.25, 24), mats.mountPpsInsulator);
    bossTab.position.set(0, -1.4, FZ - 1.0);
    const brassInsert = new THREE.Mesh(hiResCyl(1.55, 1.55, 2.38, 18), mats.brassGear);
    brassInsert.position.set(0, -1.4, FZ - 1.0);
    brassInsert.userData.noEdges = true;
    const screwHole = new THREE.Mesh(hiResCyl(1.05, 1.05, 2.46, 16), mats.matteBlackAnodized);
    screwHole.position.set(0, -1.4, FZ - 1.0);
    screwHole.userData.noEdges = true;
    g.add(bridge, bossTab, brassInsert, screwHole);

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
    // Watchmaker Lathe-turned domed pan-head Phillips #0 self-tapping BTITE screw!
    const screw = buildPhillipsScrew(
      2.15,
      1.05,
      0.92,
      8.1,
      mats.silverElectrode,
      mats.matteBlackAnodized,
      mats.stainlessMachined
    );
    // Built-in captive spring lock-washer flange under head
    const washer = new THREE.Mesh(hiResTorus(1.45, 0.18, 10, 24), mats.stainlessMachined);
    washer.rotation.x = Math.PI / 2;
    washer.position.y = 0.16;
    washer.userData.noEdges = true;
    g.add(screw, washer);

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
    // Authentic matte woven polyester-cloth Sony 631S #25 sealing tape with L-folded light-trap tabs
    const strip1 = makeTexturedHorizPlate(
      createRoundedRectShape(38.4, 6.4, 0.6),
      38.4,
      6.4,
      0.24,
      u.micAcousticFelt,
      0.03,
      14
    );
    strip1.position.set(0, 0, FZ - 8.2);

    // Folded vertical rear flaps sealing the cable routing notch
    for (const fx of [-7.4, 7.4]) {
      const flapGeo = createChamferedBoxGeo(10.2, 4.9, 0.24, 0.4, 0.03, 'z');
      const flap = new THREE.Mesh(flapGeo, u.micAcousticFelt);
      flap.position.set(fx, -2.35, FZ - 11.25);
      // Curved fold hinge fillet
      const hinge = new THREE.Mesh(hiResCyl(0.28, 0.28, 10.0, 10), u.micAcousticFelt);
      hinge.rotation.z = Math.PI / 2;
      hinge.position.set(fx, -0.05, FZ - 11.2);
      hinge.userData.noEdges = true;
      g.add(flap, hinge);
    }
    // Thin conductive aluminum-backing edge seam peek
    const foilBack = new THREE.Mesh(new THREE.BoxGeometry(37.6, 0.08, 5.8), mats.emiShieldFilm);
    foilBack.position.set(0, -0.14, FZ - 8.2);
    foilBack.userData.noEdges = true;
    g.add(strip1, foilBack);

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
  // MC12. High-Damping Poron Micro-Cellular Urethane Vibration Absorber Pad
  // =========================================================================
  {
    const g = new THREE.Group();
    const padMain = makeTexturedHorizPlate(
      createFrameShape(44.2, 24.2, 2.6, 14.0, 6.2, 1.4),
      44.2,
      24.2,
      1.35,
      u.micAcousticFelt,
      0.14,
      22
    );

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

    // 4 raised elastomeric corner isolation mounting pads
    for (const sx of [-19.0, 19.0]) {
      for (const sz of [-9.2, 9.2]) {
        const boss = new THREE.Mesh(hiResCyl(1.75, 1.9, 0.48, 16), u.micRubberBootBlack);
        boss.position.set(sx, 0.85, sz);
        boss.userData.noEdges = true;
        g.add(boss);
      }
    }
    g.add(padMain, wedgeInst);

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

    // Top brushed nickel-silver Faraday roof with true circular top acoustic port hole + IM73A135 laser markings!
    const roofShape = createRoundedRectShape(W, D, 0.75);
    const portHole = new THREE.Path();
    portHole.absarc(-1.8, 0, 1.55, 0, Math.PI * 2, true);
    roofShape.holes.push(portHole);
    const roof = makeTexturedHorizPlate(roofShape, W, D, 0.52, u.micMemsFaradayLid, 0.06, 28);
    roof.position.y = H * 0.5;

    // Rolled gold acoustic port bezel collar matching laser ring
    const portCollar = new THREE.Mesh(hiResTorus(1.62, 0.14, 10, 28), mats.goldPlating);
    portCollar.rotation.x = Math.PI / 2;
    portCollar.position.set(-1.8, H * 0.5 + 0.24, 0);
    portCollar.userData.noEdges = true;

    // Precision stamped 3-sided Faraday cutaway walls (+Z front left open for macro cutaway view!)
    const backWall = new THREE.Mesh(
      createChamferedBoxGeo(W, H, 0.5, 0.12, 0.05, 'z'),
      mats.emiShieldCan
    );
    backWall.position.set(0, 0, -D * 0.5 + 0.25);
    const leftWall = new THREE.Mesh(
      createChamferedBoxGeo(0.5, H, D, 0.12, 0.05, 'y'),
      mats.emiShieldCan
    );
    leftWall.position.set(-W * 0.5 + 0.25, 0, 0);
    const rightWall = new THREE.Mesh(
      createChamferedBoxGeo(0.5, H, D, 0.12, 0.05, 'y'),
      mats.emiShieldCan
    );
    rightWall.position.set(W * 0.5 - 0.25, 0, 0);

    // ENIG gold perimeter grounding solder flange
    const gndRim = makeHiResHorizPlate(
      createFrameShape(W, D, 0.75, W - 1.05, D - 1.05, 0.45),
      0.26,
      mats.goldPlating,
      0.03,
      1,
      20
    );
    gndRim.position.y = -H * 0.5;
    g.add(roof, portCollar, backWall, leftWall, rightWall, gndRim);

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

    // 3 concentric sinusoidal stress-relief corrugation wave rings
    for (const [r, tube] of [
      [1.18, 0.11],
      [1.78, 0.12],
      [2.32, 0.13],
    ]) {
      const corr = new THREE.Mesh(hiResTorus(r, tube, 12, 36), mats.siliconPhotodiode);
      corr.rotation.x = Math.PI / 2;
      corr.position.y = 0.07;
      corr.userData.noEdges = true;
      g.add(corr);
    }

    // 8 radial gold spring-flexure anchor fingers around perimeter
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const flex = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.16), mats.goldPlating);
      flex.position.set(Math.cos(a) * 2.58, 0.06, Math.sin(a) * 2.58);
      flex.rotation.y = -a;
      flex.userData.noEdges = true;
      g.add(flex);
    }
    const anchorRim = new THREE.Mesh(hiResTorus(2.76, 0.22, 12, 36), mats.goldPlating);
    anchorRim.rotation.x = Math.PI / 2;
    g.add(membrane, anchorRim);

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

    // 24 smooth spherical Si3N4 anti-stiction micro-dimple bumps (preserved hi-res spheres!)
    const dimpleGeo = hiResSphere(0.15, 12, 10);
    const dimpleInst = new THREE.InstancedMesh(dimpleGeo, mats.siliconNitrideBall, 24);
    const dm = new THREE.Object3D();
    let idx = 0;
    for (const [count, rad] of [
      [8, 1.05],
      [16, 1.98],
    ]) {
      for (let i = 0; i < count; i++) {
        const ang = (i / count) * Math.PI * 2 + (count === 8 ? 0 : Math.PI / 16);
        dm.position.set(Math.cos(ang) * rad, 0, Math.sin(ang) * rad);
        dm.updateMatrix();
        dimpleInst.setMatrixAt(idx++, dm.matrix);
      }
    }
    dimpleInst.instanceMatrix.needsUpdate = true;
    dimpleInst.userData.noEdges = true;
    g.add(gapRing, dimpleInst);

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
    // True 19-hole hexagonal honeycomb acoustic ventilation perforations drilled right through!
    const holeCoords: Array<[number, number]> = [[0, 0]];
    for (let ring = 1; ring <= 2; ring++) {
      const n = ring * 6;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        holeCoords.push([Math.cos(a) * ring * 0.9, Math.sin(a) * ring * 0.9]);
      }
    }
    const plate = makePerforatedDisc(2.74, holeCoords, 0.24, 0.42, mats.gatePolysilicon, 0.03);
    // Gold bias electrode contact ring & lead-out pad
    const biasRing = new THREE.Mesh(hiResTorus(2.62, 0.12, 10, 34), mats.goldPlating);
    biasRing.rotation.x = Math.PI / 2;
    biasRing.position.y = 0.22;
    biasRing.userData.noEdges = true;
    const bondPad = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.16, 0.62), mats.goldPlating);
    bondPad.position.set(2.55, 0.24, 0);
    bondPad.userData.noEdges = true;
    g.add(plate, biasRing, bondPad);

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

  // MC17. Next-Gen Sealed-Dual-Membrane (SDM) Low-Pressure Vacuum Cell (72 dB SNR!)
  {
    const g = new THREE.Group();
    // Translucent cyan low-pressure sealed vacuum chamber ring + hermetic perimeter seal
    const vacRing = new THREE.Mesh(hiResCyl(2.58, 2.58, 0.62, 34), mats.vcWorkingFluidCyan);
    const sealBand = new THREE.Mesh(hiResTorus(2.62, 0.14, 10, 34), mats.goldPlating);
    sealBand.rotation.x = Math.PI / 2;
    sealBand.position.y = 0.24;
    sealBand.userData.noEdges = true;

    // Lower push-pull corrugated polysilicon diaphragm
    const lowerGeo = hiResCyl(2.68, 2.68, 0.22, 34);
    applyPlanarUVs(lowerGeo, 5.36, 5.36, 'xz');
    const lowerDiaph = new THREE.Mesh(lowerGeo, u.micMemsSiliconDiaphragm);
    lowerDiaph.position.y = -0.4;

    // 8 precision mechanical gold push-pull coupling pillars locking upper & lower SDM membranes
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const pil = new THREE.Mesh(hiResCyl(0.14, 0.14, 1.08, 12), mats.goldPlating);
      pil.position.set(Math.cos(a) * 1.48, 0.1, Math.sin(a) * 1.48);
      pil.userData.noEdges = true;
      g.add(pil);
    }
    g.add(vacRing, sealBand, lowerDiaph);

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
    // Bulk monocrystalline silicon MEMS die with true cylindrical Bosch-DRIE cavity
    const dieShape = createRoundedRectShape(5.85, 5.85, 0.35);
    const cavityHole = new THREE.Path();
    cavityHole.absarc(0, 0, 2.1, 0, Math.PI * 2, true);
    dieShape.holes.push(cavityHole);
    const dieBlock = makeHiResHorizPlate(dieShape, 1.56, mats.siliconBulk, 0.06, 2, 28);

    // Polished Bosch-DRIE scalloped vertical silicon cavity liner cutaway (3 stacked micro-scallop ribs!)
    const cavityLiner = new THREE.Mesh(
      hiResCyl(2.06, 2.06, 1.48, 30, true, Math.PI * 0.25, Math.PI * 1.5),
      mats.siliconDramLayer
    );
    for (const sy of [-0.45, 0, 0.45]) {
      const scallop = new THREE.Mesh(
        hiResTorus(2.04, 0.06, 8, 28, Math.PI * 1.5),
        mats.siliconPhotodiode
      );
      scallop.rotation.x = Math.PI / 2;
      scallop.rotation.z = -Math.PI * 0.25;
      scallop.position.y = sy;
      scallop.userData.noEdges = true;
      g.add(scallop);
    }
    // Gold perimeter seal-ring around silicon die edge
    const sealRing = makeHiResHorizPlate(
      createFrameShape(5.5, 5.5, 0.25, 5.1, 5.1, 0.2),
      0.08,
      mats.goldPlating,
      0.01,
      1,
      12
    );
    sealRing.position.y = 0.8;
    sealRing.userData.noEdges = true;
    g.add(dieBlock, cavityLiner, sealRing);

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
    // Photolithographic bare silicon ASIC die with beveled edges
    const asicGeo = createChamferedBoxGeo(3.25, 1.15, 4.45, 0.14, 0.05, 'y');
    applyPlanarUVs(asicGeo, 3.25, 4.45, 'xz');
    const asicDie = new THREE.Mesh(asicGeo, u.bionzDieFloorplan);

    // Sculpted on-die analog/mixed-signal micro-blocks: 12V Charge Pump, LNA Preamp, 4th-Order ΔΣ PDM
    const pump = new THREE.Mesh(createChamferedBoxGeo(2.5, 0.18, 1.05, 0.08, 0.02, 'y'), mats.goldPlating);
    pump.position.set(0, 0.64, -1.35);
    const preamp = new THREE.Mesh(createChamferedBoxGeo(2.5, 0.18, 1.05, 0.08, 0.02, 'y'), mats.vcWorkingFluidCyan);
    preamp.position.set(0, 0.64, 0.0);
    const dsm = new THREE.Mesh(createChamferedBoxGeo(2.5, 0.18, 1.05, 0.08, 0.02, 'y'), mats.ispSiliconDie);
    dsm.position.set(0, 0.64, 1.35);

    // Micro gold wirebond landing pads along left & right die perimeter
    for (const pz of [-1.4, -0.45, 0.45, 1.4]) {
      for (const px of [-1.36, 1.36]) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 0.26), mats.goldPlating);
        pad.position.set(px, 0.6, pz);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }
    g.add(asicDie, pump, preamp, dsm);

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
    // High-density multi-layer ceramic/ABF LGA substrate hosting MEMS & ASIC dies
    const sub = makeTexturedHorizPlate(
      createRoundedRectShape(10.6, 8.2, 0.65),
      10.6,
      8.2,
      0.74,
      u.bionzAbfSubstrate,
      0.06,
      20
    );
    sub.position.y = -0.36;

    // 5 ENIG gold bottom LGA contact lands (VDD / GND / OUT / CLK / LR) + perimeter ground ring
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
    g.add(gndPadBack);

    // 7 gleaming ball-to-stitch φ20 μm gold wirebond loops linking MEMS <-> ASIC <-> LGA bond fingers!
    g.add(
      buildGoldWirebondLoop(new THREE.Vector3(-0.35, 1.75, -1.2), new THREE.Vector3(1.25, 1.18, -1.2), 1.35, 0.075, mats.goldPlating),
      buildGoldWirebondLoop(new THREE.Vector3(-0.35, 1.75, 0.0), new THREE.Vector3(1.25, 1.18, 0.0), 1.42, 0.075, mats.goldPlating),
      buildGoldWirebondLoop(new THREE.Vector3(-0.35, 1.75, 1.2), new THREE.Vector3(1.25, 1.18, 1.2), 1.35, 0.075, mats.goldPlating),
      buildGoldWirebondLoop(new THREE.Vector3(3.85, 1.18, -1.45), new THREE.Vector3(4.65, 0.04, -2.6), 0.95, 0.075, mats.goldPlating),
      buildGoldWirebondLoop(new THREE.Vector3(3.85, 1.18, -0.45), new THREE.Vector3(4.65, 0.04, -0.85), 1.0, 0.075, mats.goldPlating),
      buildGoldWirebondLoop(new THREE.Vector3(3.85, 1.18, 0.45), new THREE.Vector3(4.65, 0.04, 0.85), 1.0, 0.075, mats.goldPlating),
      buildGoldWirebondLoop(new THREE.Vector3(3.85, 1.18, 1.45), new THREE.Vector3(4.65, 0.04, 2.6), 0.95, 0.075, mats.goldPlating)
    );
    g.add(sub);

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
    // Lathe-turned spun-aluminum 240° cutaway can with smooth rolled top shoulder & bottom hermetic crimp!
    const prof: THREE.Vector2[] = [
      new THREE.Vector2(R - 0.82, -H * 0.5),
      new THREE.Vector2(R - 0.25, -H * 0.5),
      new THREE.Vector2(R, -H * 0.5 + 0.35),
      new THREE.Vector2(R, H * 0.5 - 0.52),
      new THREE.Vector2(R - 0.35, H * 0.5),
      new THREE.Vector2(2.65, H * 0.5),
      new THREE.Vector2(2.65, H * 0.5 - 0.36),
      new THREE.Vector2(R - 0.42, H * 0.5 - 0.38),
      new THREE.Vector2(R - 0.38, -H * 0.5 + 0.32),
      new THREE.Vector2(R - 0.82, -H * 0.5 + 0.32),
    ];
    const canGeo = markHiRes(new THREE.LatheGeometry(prof, 40, Math.PI * 0.28, Math.PI * 1.44));
    canGeo.computeVertexNormals();
    const canMesh = new THREE.Mesh(canGeo, mats.silverElectrode);

    // Matte black acoustic dust-cloth felt bonded directly inside the top acoustic port
    const feltGeo = hiResCyl(3.35, 3.35, 0.24, 30);
    applyPlanarUVs(feltGeo, 6.7, 6.7, 'xz');
    const felt = new THREE.Mesh(feltGeo, u.micAcousticFelt);
    felt.position.y = H * 0.5 - 0.24;
    felt.userData.noEdges = true;

    // Crimped bottom stainless roll lip
    const crimpLip = new THREE.Mesh(
      hiResTorus(R - 0.3, 0.26, 10, 34, Math.PI * 1.44),
      mats.stainlessMachined
    );
    crimpLip.rotation.x = Math.PI / 2;
    crimpLip.rotation.z = Math.PI * 0.78;
    crimpLip.position.y = -H * 0.5;
    g.add(canMesh, felt, crimpLip);

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
    // CNC-turned stepped brass tensioning ring holding taut gold-sputtered FEP diaphragm
    const brassRing = new THREE.Mesh(hiResTorus(4.65, 0.42, 14, 36), mats.brassGear);
    brassRing.rotation.x = Math.PI / 2;
    const innerShoulder = new THREE.Mesh(hiResTorus(4.32, 0.16, 10, 34), mats.copperCoil);
    innerShoulder.rotation.x = Math.PI / 2;
    innerShoulder.position.y = 0.18;
    innerShoulder.userData.noEdges = true;

    const goldFilm = new THREE.Mesh(hiResCyl(4.52, 4.52, 0.16, 36), mats.goldPlating);
    g.add(brassRing, innerShoulder, goldFilm);

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
    // Crisp white 25 μm PTFE dielectric spacer ring
    const ptfeSpacer = new THREE.Mesh(hiResTorus(4.55, 0.32, 12, 36), mats.ceramicAlumina);
    ptfeSpacer.rotation.x = Math.PI / 2;
    ptfeSpacer.position.y = 0.4;

    // True 7-hole perforated CNC-machined brass backplate electrode!
    const hCoords: Array<[number, number]> = [[0, 0]];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      hCoords.push([Math.cos(a) * 2.25, Math.sin(a) * 2.25]);
    }
    const backplate = makePerforatedDisc(4.52, hCoords, 0.5, 0.54, mats.brassGear, 0.04);
    g.add(ptfeSpacer, backplate);

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
      new THREE.Vector2(4.22, -0.78),
      new THREE.Vector2(4.82, -0.78),
      new THREE.Vector2(4.82, 0.78),
      new THREE.Vector2(4.36, 0.78),
      new THREE.Vector2(4.36, -0.36),
      new THREE.Vector2(4.22, -0.36),
      new THREE.Vector2(4.22, -0.78),
    ];
    const cupGeo = markHiRes(new THREE.LatheGeometry(cupProf, 34, Math.PI * 0.28, Math.PI * 1.44));
    cupGeo.computeVertexNormals();
    const insCup = new THREE.Mesh(cupGeo, mats.zifIvoryPlastic);

    // Formed OFC copper compression contact ring + 4 radial spring contact leaves
    const cuRing = new THREE.Mesh(hiResTorus(3.45, 0.36, 12, 34), mats.copperCoil);
    cuRing.rotation.x = Math.PI / 2;
    cuRing.position.y = -0.25;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI * 0.25;
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.14, 0.42), mats.copperCoil);
      leaf.position.set(Math.cos(a) * 3.1, 0.12, Math.sin(a) * 3.1);
      leaf.rotation.set(0, -a, 0.25);
      leaf.userData.noEdges = true;
      g.add(leaf);
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
    // Circular emerald-green ECM PCB textured with concentric gold traces & 2SK596 legend
    const pcbGeo = hiResCyl(4.95, 4.95, 0.72, 36);
    applyPlanarUVs(pcbGeo, 9.9, 9.9, 'xz');
    const roundPcb = new THREE.Mesh(pcbGeo, u.micEcmJfetPcb);

    // Authentic 3-lead SOT-23 ultra-low-noise JFET transistor (2SK596 class)!
    const jfet = buildChipPackage({
      w: 2.35,
      d: 1.55,
      h: 0.92,
      style: 'sot23',
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.silverElectrode,
      axis: 'y',
    });
    jfet.position.set(0, 0.82, -0.15);

    // Two realistic 0402 RF bypass MLCC capacitors (10 pF & 33 pF) + 1 G-ohm high-Z bias resistor!
    for (const cx of [-2.45, 2.45]) {
      const cap = buildSmdPassive(1.25, 0.72, 0.62, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(cx, 0.68, 0.65);
      g.add(cap);
    }
    const biasRes = buildSmdPassive(1.45, 0.78, 0.56, mats.matteBlackAnodized, mats.goldPlating, 'y');
    biasRes.position.set(0, 0.66, 2.15);
    g.add(biasRes);

    // Bottom concentric ENIG gold solder pads (+Signal center / GND outer ring)
    const padOuter = new THREE.Mesh(hiResTorus(3.7, 0.52, 10, 32), mats.goldPlating);
    padOuter.rotation.x = Math.PI / 2;
    padOuter.position.y = -0.38;
    padOuter.userData.noEdges = true;
    const padCenter = new THREE.Mesh(hiResCyl(1.55, 1.55, 0.16, 22), mats.goldPlating);
    padCenter.position.y = -0.4;
    padCenter.userData.noEdges = true;
    g.add(roundPcb, jfet, padOuter, padCenter);

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
    // Matte charcoal shock-isolation collar (replaces old blue rubber!)
    const rubberRing = new THREE.Mesh(hiResCyl(5.65, 5.65, 4.15, 34), u.micRubberBootBlack);
    for (const ry of [-1.25, 0, 1.25]) {
      const rib = new THREE.Mesh(hiResTorus(5.72, 0.24, 10, 34), mats.butylDamperRubber);
      rib.rotation.x = Math.PI / 2;
      rib.position.y = ry;
      rib.userData.noEdges = true;
      g.add(rib);
    }

    // Brushed nickel-silver directional capsule Faraday body
    const capsuleCan = new THREE.Mesh(hiResCyl(4.42, 4.42, 4.55, 34), mats.emiShieldCan);
    capsuleCan.position.y = 0.25;

    // Woven stainless top acoustic grille framed by gold ring
    const topMeshGeo = hiResCyl(3.45, 3.45, 0.22, 30);
    applyPlanarUVs(topMeshGeo, 6.9, 6.9, 'xz');
    const topMesh = new THREE.Mesh(topMeshGeo, u.micStainlessWovenMesh);
    topMesh.position.y = 2.55;
    topMesh.userData.noEdges = true;
    const goldBezel = new THREE.Mesh(hiResTorus(3.65, 0.26, 12, 32), mats.goldPlating);
    goldBezel.rotation.x = Math.PI / 2;
    goldBezel.position.y = 2.55;

    // Directional cardioid rear phase-cancellation acoustic slot ports (8 radial ports + acoustic felt band)
    const phaseBand = new THREE.Mesh(hiResCyl(4.48, 4.48, 0.72, 32, true), u.micAcousticFelt);
    phaseBand.position.y = 1.1;
    phaseBand.userData.noEdges = true;
    const phaseRing = new THREE.Mesh(hiResTorus(4.52, 0.16, 10, 32), mats.vcWorkingFluidCyan);
    phaseRing.rotation.x = Math.PI / 2;
    phaseRing.position.y = 1.52;
    phaseRing.userData.noEdges = true;
    g.add(rubberRing, capsuleCan, topMesh, goldBezel, phaseBand, phaseRing);

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

    const stemRear = makeHiResHorizPlate(
      createRoundedRectShape(6.2, 18.2, 1.1),
      0.36,
      mats.polyimideFpc,
      0.03,
      1,
      16
    );
    stemRear.position.set(0, -0.02, -4.5);

    // Silver-ink hatched conductive EMI shield film over rear stem
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

    // Gold circular solder test-pads & capsule contact land rings on L, R, and Rear termini
    for (const [tx, tz] of [
      [LX, FZ],
      [RX, FZ],
      [0, -12.5],
    ]) {
      const land = new THREE.Mesh(hiResTorus(2.0, 0.34, 8, 24), mats.goldPlating);
      land.rotation.x = Math.PI / 2;
      land.position.set(tx, 0.24, tz);
      land.userData.noEdges = true;
      g.add(land);
    }

    // Natural smooth 90-degree bent ribbon drop leg into mainboard ZIF audio header + 10 gold ZIF fingers!
    const bendGeo = hiResCyl(0.75, 0.75, 8.6, 14, false, 0, Math.PI * 0.5);
    bendGeo.rotateZ(Math.PI / 2);
    const bend = new THREE.Mesh(bendGeo, mats.polyimideFpc);
    bend.position.set(0, -0.58, FZ + 2.4);
    bend.userData.noEdges = true;

    const dropLeg = new THREE.Mesh(
      createChamferedBoxGeo(8.6, 5.4, 0.38, 0.35, 0.03, 'z'),
      mats.polyimideFpc
    );
    dropLeg.position.set(0, -3.0, FZ + 3.05);

    // Matte-blue PI stiffener backing plate on ZIF connector tail
    const stiffener = new THREE.Mesh(new THREE.BoxGeometry(8.4, 1.85, 0.22), mats.mountShimBlue);
    stiffener.position.set(0, -4.75, FZ + 2.75);
    stiffener.userData.noEdges = true;

    // 10 crisp ENIG gold ZIF contact fingers on bottom edge of drop tail
    for (let i = 0; i < 10; i++) {
      const finger = new THREE.Mesh(new THREE.BoxGeometry(0.46, 1.45, 0.09), mats.goldPlating);
      finger.position.set(-3.42 + i * 0.76, -4.92, FZ + 3.28);
      finger.userData.noEdges = true;
      g.add(finger);
    }
    g.add(crossbar, stemRear, rearShield, bend, dropLeg, stiffener);

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
      u.batBmsPcb,
      0.06,
      18
    );

    // 4 realistic GHz-band ferrite EMI bead chokes (Murata BLM series) with wrapped Ni-Sn end-caps
    for (let i = 0; i < 4; i++) {
      const bead = buildSmdPassive(2.65, 1.55, 1.25, mats.ferriteInductor, mats.silverElectrode, 'y');
      bead.position.set(-5.25 + i * 3.5, 1.0, 2.3);
      g.add(bead);
    }

    // 4 zero-microphonic C0G/NP0 ceramic audio filter caps + 2 SOT-23 ESD TVS surge diodes
    for (let i = 0; i < 4; i++) {
      const cap = buildSmdPassive(2.15, 1.32, 0.88, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(-5.25 + i * 3.5, 0.82, -1.9);
      g.add(cap);
    }
    for (const ex of [-4.2, 4.2]) {
      const esd = buildChipPackage({
        w: 2.0,
        d: 1.3,
        h: 0.72,
        style: 'sot23',
        bodyMat: u.icEpoxyLaser,
        leadMat: mats.silverElectrode,
        axis: 'y',
      });
      esd.position.set(ex, 0.76, -4.1);
      g.add(esd);
    }
    g.add(subPcb);

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
      u.batBmsPcb,
      0.06,
      18
    );

    // Flagship QFN-32 24-bit Audio Codec IC (AKM / Sony custom silicon) with perimeter leadframe pins!
    const codecIc = buildChipPackage({
      w: 6.8,
      d: 6.8,
      h: 1.32,
      style: 'qfn',
      pinsPerSide: 8,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    codecIc.position.set(-2.0, 1.06, 0);

    // Authentic 4-pad gold-seam-lid 24.576 MHz audio master crystal oscillator (NX3225GA style)
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 0.45, 2.6, 0.25, 0.04, 'y'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(4.85, 0.62, 2.2);
    const xtalLid = new THREE.Mesh(
      createChamferedBoxGeo(3.25, 0.48, 2.25, 0.22, 0.05, 'y'),
      mats.goldPlating
    );
    xtalLid.position.set(4.85, 1.06, 2.2);

    // Ultra-low-noise MICBIAS LDO regulator (SOIC-8 / DFN) + 2 ceramic decoupling caps
    const ldo = buildChipPackage({
      w: 2.9,
      d: 2.3,
      h: 0.88,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      axis: 'y',
    });
    ldo.position.set(4.85, 0.84, -2.25);

    for (const cy of [-3.6, 3.6]) {
      const dec = buildSmdPassive(1.35, 0.72, 0.56, mats.smdCeramic, mats.silverElectrode, 'y');
      dec.position.set(-7.1, 0.68, cy * 0.65);
      g.add(dec);
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
      u.batBmsPcb,
      0.06,
      18
    );
    const hpfIc = buildChipPackage({
      w: 6.4,
      d: 5.6,
      h: 1.25,
      style: 'qfn',
      pinsPerSide: 7,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzDieFloorplan,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    hpfIc.position.set(0, 1.02, 0);

    // Sculpted stepped acoustic high-pass filter slope telemetry bars above package
    for (let i = 0; i < 4; i++) {
      const hBar = 0.34 + i * 0.28;
      const bar = new THREE.Mesh(
        createChamferedBoxGeo(0.95, hBar, 3.2, 0.14, 0.04, 'y'),
        mats.vcWorkingFluidCyan
      );
      bar.position.set(-2.05 + i * 1.38, 1.68 + hBar * 0.5, 0);
      bar.userData.noEdges = true;
      g.add(bar);
    }

    // Perimeter 0402 precision resistors
    for (const sx of [-5.8, 5.8]) {
      for (const sz of [-2.4, 2.4]) {
        const res = buildSmdPassive(1.3, 0.7, 0.54, mats.matteBlackAnodized, mats.silverElectrode, 'y');
        res.position.set(sx, 0.66, sz);
        g.add(res);
      }
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
      u.batBmsPcb,
      0.06,
      18
    );
    const dspIc = buildChipPackage({
      w: 6.8,
      d: 6.0,
      h: 1.3,
      style: 'qfn',
      pinsPerSide: 7,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzCetusDie,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    dspIc.position.set(0, 1.05, 0);

    // Sculpted metallic front & rear cardioid directional phase-array acoustic lobes
    const frontLobe = new THREE.Mesh(hiResCyl(0.18, 1.48, 2.75, 22), mats.goldPlating);
    frontLobe.rotation.x = Math.PI / 2;
    frontLobe.position.set(0, 2.15, 1.35);
    const rearLobe = new THREE.Mesh(hiResCyl(0.16, 1.08, 2.05, 22), u.micGreenJackCollar);
    rearLobe.rotation.x = -Math.PI / 2;
    rearLobe.position.set(0, 2.15, -1.25);

    for (const sx of [-5.8, 5.8]) {
      const cap = buildSmdPassive(1.5, 0.85, 0.62, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(sx, 0.7, 0);
      g.add(cap);
    }
    g.add(subPcb, dspIc, frontLobe, rearLobe);

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
    // Flagship AT&S ABF carrier substrate
    const carrier = makeTexturedHorizPlate(
      createRoundedRectShape(26.2, 14.2, 1.7),
      26.2,
      14.2,
      1.08,
      u.bionzAbfSubstrate,
      0.08,
      24
    );

    // Photolithographic bare silicon BIONZ XR2 neural audio separation die
    const dieGeo = createChamferedBoxGeo(12.2, 1.58, 8.6, 0.25, 0.08, 'y');
    applyPlanarUVs(dieGeo, 12.2, 8.6, 'xz');
    const aiCore = new THREE.Mesh(dieGeo, u.bionzDieFloorplan);
    aiCore.position.set(0, 1.32, 0);

    // 3×3 beveled gold-framed systolic neural audio separation tiles on die surface
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

    // 8 surrounding land-side 01005 decoupling MLCCs flanking the AI NPU die
    for (const sx of [-9.4, 9.4]) {
      for (const sz of [-3.6, -1.2, 1.2, 3.6]) {
        const mlcc = buildSmdPassive(1.5, 0.78, 0.56, mats.smdCeramic, mats.silverElectrode, 'y');
        mlcc.position.set(sx, 0.82, sz);
        g.add(mlcc);
      }
    }

    // Gold perimeter BGA contact rim + underside smooth solder balls
    const goldRim = makeHiResHorizPlate(
      createFrameShape(24.2, 12.4, 1.3, 22.0, 10.2, 0.9),
      0.24,
      mats.goldPlating,
      0.03,
      1,
      20
    );
    goldRim.position.y = -0.62;
    g.add(carrier, aiCore, tileInst, goldRim);

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
  // MC33. Mainboard 10-Pin 0.4 mm-Pitch Flip-Lock FPC ZIF Receptacle
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded ivory LCP zero-insertion-force connector housing receiving the SH-1035 gold flex tail!
    const lcpBody = new THREE.Mesh(
      createChamferedBoxGeo(11.4, 2.35, 4.2, 0.35, 0.08, 'y'),
      mats.zifIvoryPlastic
    );
    // Hinged matte-charcoal flip-lock actuator bail clamping down the flex cable
    const actuatorBail = new THREE.Mesh(
      createChamferedBoxGeo(10.6, 0.72, 2.2, 0.22, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    actuatorBail.position.set(0, 1.38, -0.75);
    actuatorBail.rotation.x = -0.22;

    // 10 gleaming gold gull-wing PCB solder leads + 2 stainless mechanical anchor ears
    for (let i = 0; i < 10; i++) {
      const lx = -3.42 + i * 0.76;
      const lead = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.32, 1.35), mats.goldPlating);
      lead.position.set(lx, -1.08, 2.45);
      lead.userData.noEdges = true;
      g.add(lead);
    }
    for (const sx of [-5.85, 5.85]) {
      const anchor = new THREE.Mesh(
        createChamferedBoxGeo(1.05, 1.45, 2.4, 0.14, 0.04, 'y'),
        mats.stainlessMachined
      );
      anchor.position.set(sx, -0.42, 0);
      g.add(anchor);
    }
    g.add(lcpBody, actuatorBail);

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
  // MC34. Dedicated 3.5 mm Stereo Plug-In-Power (PIP) External Mic Jack
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded matte-black body seated cleanly inside MC02 left magnesium bay!
    const jackBody = new THREE.Mesh(
      createChamferedBoxGeo(7.4, 5.2, 5.8, 0.5, 0.1, 'y'),
      u.batPolycarbonateShell
    );
    // Iconic Sony anodized RED metallic bezel collar ring emerging flush through the left-flank I/O port bezel!
    const collar = new THREE.Mesh(hiResCyl(2.45, 2.55, 1.95, 32), mats.bodyRecRed);
    collar.rotation.z = Math.PI / 2;
    collar.position.set(-4.55, 0, 0);
    const silverLip = new THREE.Mesh(hiResTorus(2.05, 0.18, 10, 28), mats.stainlessMachined);
    silverLip.rotation.y = Math.PI / 2;
    silverLip.position.set(-5.48, 0, 0);
    silverLip.userData.noEdges = true;
    const bore = new THREE.Mesh(hiResCyl(1.72, 1.72, 2.15, 24), mats.matteBlackAnodized);
    bore.rotation.z = Math.PI / 2;
    bore.position.set(-4.62, 0, 0);
    bore.userData.noEdges = true;

    // Internal phosphor-bronze Tip / Ring / Sleeve contact leaf springs + mechanical auto-mute switch!
    for (let i = 0; i < 3; i++) {
      const spring = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.34, 5.4), mats.beCuSpring);
      spring.position.set(-1.9 + i * 1.9, 2.72, 0);
      spring.userData.noEdges = true;
      g.add(spring);
    }
    // 5 gold PCB solder pins protruding beneath jack body
    for (let i = 0; i < 5; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.2, 0.42), mats.goldPlating);
      pin.position.set(-2.6 + i * 1.3, -2.95, i % 2 === 0 ? -1.7 : 1.7);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    g.add(jackBody, collar, silverLip, bore);

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
  // MC35. Multi-Interface (MI) Shoe 24-bit Digital Audio Interface Bypass Bus
  // =========================================================================
  {
    const g = new THREE.Group();
    // Shielded micro-flex digital audio bridge routing MI-Shoe pins 8-12 (ECM-B1M digital shotgun) straight to DSP!
    const bridgeBody = makeHiResHorizPlate(
      createRoundedRectShape(11.0, 22.0, 1.2),
      0.34,
      mats.polyimideFpc,
      0.04,
      1,
      16
    );
    const emiFoil = makeHiResHorizPlate(
      createRoundedRectShape(8.4, 18.0, 0.8),
      0.14,
      mats.emiShieldFilm,
      0.02,
      1,
      12
    );
    emiFoil.position.y = 0.22;
    emiFoil.userData.noEdges = true;

    // 5 gold digital I2S/PDM contact fingers at front MI-shoe pickup header + 4 micro-coax shield traces
    for (let i = 0; i < 5; i++) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.14, 2.2), mats.goldPlating);
      pad.position.set(-3.0 + i * 1.5, 0.24, 9.2);
      pad.userData.noEdges = true;
      g.add(pad);
    }
    const headerBlock = new THREE.Mesh(
      createChamferedBoxGeo(10.2, 1.4, 2.8, 0.3, 0.06, 'y'),
      mats.matteBlackAnodized
    );
    headerBlock.position.set(0, -0.82, -9.2);
    g.add(bridgeBody, emiFoil, headerBlock);

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
    // Molded ABS/PC rear Helmholtz acoustic back-volume tuning box behind the 3rd capsule
    const chamber = makeHiResHorizPlate(
      createFrameShape(13.6, 10.4, 1.8, 10.6, 7.4, 1.2),
      3.6,
      u.batPolycarbonateShell,
      0.14,
      2,
      20
    );
    const foamFill = makeHiResHorizPlate(
      createRoundedRectShape(10.2, 7.0, 1.0),
      2.6,
      u.micAcousticFelt,
      0.1,
      1,
      16
    );
    foamFill.userData.noEdges = true;

    // Spring-loaded phosphor-bronze / brass EMI chassis grounding leaf clip touching the Mg top deck!
    const clipBase = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 0.45, 2.4, 0.2, 0.04, 'y'),
      mats.beCuSpring
    );
    clipBase.position.set(0, 2.05, 3.8);
    const clipArch = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 1.65, 1.6, 0.25, 0.06, 'y'),
      mats.goldPlating
    );
    clipArch.position.set(0, 2.85, 3.8);
    clipArch.rotation.x = 0.24;
    g.add(chamber, foamFill, clipBase, clipArch);

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
      u.batPolycarbonateShell
    );
    // Iconic Sony anodized EMERALD-GREEN metallic bezel collar ring identifying the headphone monitor jack!
    const collar = new THREE.Mesh(hiResCyl(2.45, 2.55, 1.95, 32), u.micGreenJackCollar);
    collar.rotation.z = Math.PI / 2;
    collar.position.set(-4.55, 0, 0);
    const silverLip = new THREE.Mesh(hiResTorus(2.05, 0.18, 10, 28), mats.stainlessMachined);
    silverLip.rotation.y = Math.PI / 2;
    silverLip.position.set(-5.48, 0, 0);
    silverLip.userData.noEdges = true;
    const bore = new THREE.Mesh(hiResCyl(1.72, 1.72, 2.15, 24), mats.matteBlackAnodized);
    bore.rotation.z = Math.PI / 2;
    bore.position.set(-4.62, 0, 0);
    bore.userData.noEdges = true;

    // Dedicated clickless Class-AB/G headphone driver QFN amp mounted right atop the jack sub-carrier
    const hpAmp = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.78,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    hpAmp.position.set(1.0, 2.95, 0);
    // 5 gold PCB solder pins beneath jack
    for (let i = 0; i < 5; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.2, 0.42), mats.goldPlating);
      pin.position.set(-2.6 + i * 1.3, -2.95, i % 2 === 0 ? -1.7 : 1.7);
      pin.userData.noEdges = true;
      g.add(pin);
    }
    g.add(jackBody, collar, silverLip, bore, hpAmp);

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
      u.batBmsPcb,
      0.05,
      14
    );
    // Ultra-low-noise (<6 uVrms) 2.8V MICBIAS LDO regulator
    const ldoIc = buildChipPackage({
      w: 2.9,
      d: 2.4,
      h: 0.82,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      pin1Mat: mats.goldPlating,
      axis: 'y',
    });
    ldoIc.position.set(0, 0.8, 0);
    // L/R independent RC Pi-filter C0G capacitors & precision bias resistors
    for (const sz of [-3.1, 3.1]) {
      const cap = buildSmdPassive(2.2, 1.15, 0.78, mats.tantalumCapYellow, mats.silverElectrode, 'y');
      cap.position.set(-0.9, 0.78, sz);
      const res = buildSmdPassive(1.5, 0.8, 0.54, mats.matteBlackAnodized, mats.goldPlating, 'y');
      res.position.set(1.55, 0.66, sz);
      g.add(cap, res);
    }
    g.add(subPcb, ldoIc);

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
      u.batBmsPcb,
      0.05,
      14
    );
    // DFN-6 5-channel bidirectional ±15 kV TVS diode clamp IC
    const tvs = buildChipPackage({
      w: 3.1,
      d: 2.1,
      h: 0.76,
      style: 'dfn',
      pinsPerSide: 4,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.goldPlating,
      pin1Mat: mats.bodyRecRed,
      axis: 'y',
    });
    tvs.position.set(0, 0.76, 0.4);
    // Low-inductance copper ESD chassis bleed bus + 4 stitched ground vias
    const gndBus = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.24, 1.35, 0.16, 0.03, 'y'),
      mats.copperHeatSpreader
    );
    gndBus.position.set(0, 0.46, -2.85);
    for (let i = 0; i < 4; i++) {
      const via = new THREE.Mesh(hiResCyl(0.28, 0.28, 0.9, 12), mats.goldPlating);
      via.position.set(-1.5 + i * 1.0, 0.1, -2.85);
      via.userData.noEdges = true;
      g.add(via);
    }
    g.add(esdPcb, tvs, gndBus);

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
      u.batBmsPcb,
      0.05,
      14
    );
    const refIc = buildChipPackage({
      w: 4.1,
      d: 4.1,
      h: 0.88,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: u.icEpoxyLaser,
      leadMat: mats.silverElectrode,
      topAccentMat: u.bionzCetusDie,
      pin1Mat: mats.vcWorkingFluidCyan,
      axis: 'y',
    });
    refIc.position.set(0, 0.84, -1.2);
    // Twisted differential PWM noise-reference telemetry ribbon pair exiting right edge
    for (const [phase, mat] of [
      [0, mats.goldPlating],
      [Math.PI, mats.vcWorkingFluidCyan],
    ] as Array<[number, THREE.Material]>) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 14; i++) {
        const t = i / 14;
        const a = phase + t * Math.PI * 3.5;
        pts.push(new THREE.Vector3(-3.2 + t * 6.4, 0.65 + Math.sin(a) * 0.22, 2.85 + Math.cos(a) * 0.35));
      }
      const wire = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 22, 0.14, 6, false)),
        mat
      );
      wire.userData.noEdges = true;
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
    // Supple S-curved braided copper micro-litze acoustic decoupling leads stopping PCB vibrations!
    for (const side of [-1, 1]) {
      const sx = side * 14.2;
      for (const pol of [-0.65, 0.65]) {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(sx + pol, 1.55, 0),
          new THREE.Vector3(sx + pol * 1.4, 0.55, 1.45),
          new THREE.Vector3(sx + pol * 0.8, -0.55, -0.85),
          new THREE.Vector3(sx + pol, -1.65, 0.1),
        ]);
        const lead = new THREE.Mesh(
          markHiRes(new THREE.TubeGeometry(curve, 18, 0.16, 7, false)),
          pol < 0 ? mats.copperCoil : mats.goldPlating
        );
        lead.userData.noEdges = true;
        g.add(lead);
      }
      // Soft silicone acoustic strain-relief grommet collar at base of each floating capsule
      const grommet = new THREE.Mesh(hiResTorus(1.45, 0.42, 10, 24), mats.damperElastomer);
      grommet.rotation.x = Math.PI / 2;
      grommet.position.set(sx, -1.45, 0.1);
      g.add(grommet);
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
    const outerSeal = makeHiResHorizPlate(
      createFrameShape(52.4, 32.4, 4.0, 48.2, 28.2, 3.1),
      0.72,
      u.micRubberBootBlack,
      0.12,
      2,
      26
    );
    // Raised dual-lip compression sealing bead
    const lipBead = makeHiResHorizPlate(
      createFrameShape(51.2, 31.2, 3.6, 49.8, 29.8, 3.3),
      0.34,
      mats.butylDamperRubber,
      0.06,
      1,
      24
    );
    lipBead.position.y = 0.42;
    lipBead.userData.noEdges = true;
    // 4 molded corner alignment dowel ears
    for (const [ex, ez] of [
      [-23.5, -13.5],
      [23.5, -13.5],
      [-23.5, 13.5],
      [23.5, 13.5],
    ]) {
      const ear = new THREE.Mesh(hiResCyl(1.1, 1.1, 0.82, 16), u.micRubberBootBlack);
      ear.position.set(ex, 0, ez);
      ear.userData.noEdges = true;
      g.add(ear);
    }
    g.add(outerSeal, lipBead);

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

  return parts;
}
