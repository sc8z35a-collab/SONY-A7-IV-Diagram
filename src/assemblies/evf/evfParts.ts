import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createHelicalSpringGeometry,
  createOpticalLensGeometry,
  createPrecisionScrew,
  createRoundedRectShape,
  createSpurGearGeometry,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildGoldWirebondLoop,
  buildPhillipsScrew,
  buildShieldedInductor,
  buildSmdPassive,
  buildTantalumCap,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

/** Shared EVF optical axis vertical elevation (sits cleanly atop Shutter/Sensor/Mainboard) */
export const EVF_OPTICAL_Y = 39.5;

export interface EvfDynamicRig {
  edLensPart: CadPart;
  diopterDialGroup: THREE.Group;
  leadScrewGroup: THREE.Group;
  irLedMeshes: THREE.Mesh[];
  oledScreenMesh: THREE.Mesh;
  applyDynamics: (elapsed: number, physicsActive: boolean, explodeFactor: number, integrated: boolean) => void;
}

function finalizeEvfPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  integratedExplodeOffset: THREE.Vector3,
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
    integratedExplodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
  };
}

/**
 * Helper: CNC stepped anodized lens retaining cell with internal stray-light baffle micro-grooves.
 */
function createSteppedLensCell(
  innerR: number,
  outerR: number,
  depth: number,
  mat: THREE.Material,
  baffleMat?: THREE.Material,
  grooveCount = 3
): THREE.Group {
  const grp = new THREE.Group();
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const body = new THREE.Mesh(extrudeHiRes(shape, depth, 0.14, 0.14, 2, 36), mat);
  grp.add(body);

  // Concentric internal anti-reflection light-trap thread grooves lining the lens bore
  if (baffleMat && grooveCount > 0) {
    const span = depth * 0.68;
    for (let i = 0; i < grooveCount; i++) {
      const z = -span * 0.5 + (grooveCount === 1 ? 0 : (i / (grooveCount - 1)) * span);
      const ridge = new THREE.Mesh(hiResTorus(innerR + 0.04, 0.09, 6, 36), baffleMat);
      ridge.position.z = z;
      ridge.userData.noEdges = true;
      grp.add(ridge);
    }
  }
  return grp;
}

/**
 * Helper: Precision threaded optical retaining ring with spanner-wrench slots & optical datum pip.
 */
function createSpannerRetainerRing(
  innerR: number,
  outerR: number,
  depth: number,
  ringMat: THREE.Material,
  notchMat: THREE.Material,
  notchCount = 4,
  zFaceSign: -1 | 1 = -1
): THREE.Group {
  const grp = new THREE.Group();
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  grp.add(new THREE.Mesh(extrudeHiRes(shape, depth, 0.08, 0.08, 1, 36), ringMat));

  const rMid = (innerR + outerR) * 0.5;
  const radSpan = Math.max(0.7, (outerR - innerR) * 0.72);
  for (let i = 0; i < notchCount; i++) {
    const a = (i * Math.PI * 2) / notchCount + Math.PI / 4;
    const notch = new THREE.Mesh(new THREE.BoxGeometry(radSpan, 0.52, 0.28), notchMat);
    notch.position.set(Math.cos(a) * rMid, Math.sin(a) * rMid, zFaceSign * (depth * 0.52));
    notch.rotation.z = a;
    notch.userData.noEdges = true;
    grp.add(notch);
  }
  return grp;
}

/**
 * Helper: Smooth flat-ribbon extrusion along a 2D spline curve (for curved FPCs & formed BeCu leaf springs).
 */
function buildFlatRibbonExtrude(
  points2D: Array<[number, number]>,
  thickness: number,
  width: number,
  plane: 'xz' | 'yz' | 'xy'
): THREE.ExtrudeGeometry {
  const curve = new THREE.SplineCurve(points2D.map(([a, b]) => new THREE.Vector2(a, b)));
  const samples = curve.getPoints(28);
  const upper: THREE.Vector2[] = [];
  const lower: THREE.Vector2[] = [];
  for (let i = 0; i < samples.length; i++) {
    const prev = samples[Math.max(0, i - 1)];
    const next = samples[Math.min(samples.length - 1, i + 1)];
    const tang = new THREE.Vector2().subVectors(next, prev).normalize();
    const norm = new THREE.Vector2(-tang.y, tang.x);
    upper.push(samples[i].clone().addScaledVector(norm, thickness * 0.5));
    lower.push(samples[i].clone().addScaledVector(norm, -thickness * 0.5));
  }
  const shape = new THREE.Shape();
  shape.moveTo(upper[0].x, upper[0].y);
  for (let i = 1; i < upper.length; i++) shape.lineTo(upper[i].x, upper[i].y);
  for (let i = lower.length - 1; i >= 0; i--) shape.lineTo(lower[i].x, lower[i].y);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false, steps: 1 });
  geo.translate(0, 0, -width * 0.5);
  if (plane === 'xz') {
    geo.rotateX(Math.PI / 2);
  } else if (plane === 'yz') {
    geo.rotateY(-Math.PI / 2);
  }
  geo.computeVertexNormals();
  return markHiRes(geo);
}

/**
 * Helper: DIN 6799 E-type retaining circlip with authentic open C-gap & 3 inward locking prongs.
 */
function buildEClip(innerR: number, outerR: number, thickness: number, mat: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const arcSpan = Math.PI * 1.56;
  const cArc = new THREE.Mesh(
    hiResTorus((innerR + outerR) * 0.5, (outerR - innerR) * 0.45, 6, 20, arcSpan),
    mat
  );
  cArc.rotation.z = Math.PI * 0.22;
  cArc.userData.noEdges = true;
  g.add(cArc);

  for (const ang of [Math.PI * 0.36, Math.PI, Math.PI * 1.64]) {
    const prong = new THREE.Mesh(
      new THREE.BoxGeometry((outerR - innerR) * 0.72, (outerR - innerR) * 0.58, thickness),
      mat
    );
    prong.position.set(Math.cos(ang) * innerR * 1.04, Math.sin(ang) * innerR * 1.04, 0);
    prong.rotation.z = ang;
    prong.userData.noEdges = true;
    g.add(prong);
  }
  return g;
}

/**
 * Helper: True conical knife-edge optical stray-light baffle ring (LatheGeometry).
 */
function buildConicalBaffleRing(
  innerR: number,
  outerR: number,
  depth: number,
  mat: THREE.Material
): THREE.Mesh {
  const halfD = depth * 0.5;
  const pts: THREE.Vector2[] = [
    new THREE.Vector2(outerR, -halfD),
    new THREE.Vector2(outerR, halfD),
    new THREE.Vector2(innerR + 0.48, halfD),
    new THREE.Vector2(innerR, 0.08),
    new THREE.Vector2(innerR, -0.08),
    new THREE.Vector2(innerR + 0.48, -halfD),
    new THREE.Vector2(outerR, -halfD),
  ];
  const geo = markHiRes(new THREE.LatheGeometry(pts, 40));
  geo.rotateX(Math.PI / 2);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, mat);
}

/**
 * Helper: Custom hobbed brass click ratchet wheel with deeper zero-diopter (-1.0 dpt) reference valley.
 */
function createDiopterRatchetWheelGeo(
  teeth: number,
  pitchR: number,
  thickness: number,
  boreR: number
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  const add = 0.28;
  const ded = 0.34;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const isZeroIndex = i === 0;
    const rValley = isZeroIndex ? pitchR - ded * 2.15 : pitchR - ded;
    const rPeak = pitchR + add;
    const a1 = a0 + step * 0.22;
    const a2 = a0 + step * 0.50;
    const a3 = a0 + step * 0.78;
    const px0 = Math.cos(a0) * rValley;
    const py0 = Math.sin(a0) * rValley;
    if (i === 0) shape.moveTo(px0, py0);
    else shape.lineTo(px0, py0);
    shape.lineTo(Math.cos(a1) * rPeak, Math.sin(a1) * rPeak);
    shape.lineTo(Math.cos(a2) * rPeak, Math.sin(a2) * rPeak);
    shape.lineTo(Math.cos(a3) * rValley, Math.sin(a3) * rValley);
  }
  shape.closePath();
  const bore = new THREE.Path();
  bore.absarc(0, 0, boreR, 0, Math.PI * 2, true);
  shape.holes.push(bore);
  return extrudeHiRes(shape, thickness, 0.05, 0.05, 1, 16);
}

/**
 * Build all 31 macro CAD sub-assemblies (E01–E31) of the 2024–2026 Flagship Mirrorless
 * Electronic Viewfinder (EVF) & Eye-Control AF optical + precision mechanical module
 * positioned directly atop the Shutter / Sensor / Mainboard optical core
 * (optical axis x = 0, y = 39.5 mm).
 *
 * +Z = camera front (OLED thermal sink & TCON), -Z = camera rear (photographer's eye).
 * Strictly preserves 31/31 macro parts (E01–E31); E32–E55 are lazy-hydrated in evfMicroParts.ts.
 */
export function buildEvfParts(
  mats: MaterialLibrary,
  _includeStandalone = true
): { parts: CadPart[]; rig: EvfDynamicRig } {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const irLedMeshes: THREE.Mesh[] = [];
  const helicoidSleeveGroup = new THREE.Group();

  // =========================================================================
  // E01: Ergonomic Deep Anti-Glare Silicone Eyecup & Quick-Release Bayonet
  //      (Sony FDA-EP21 / Canon ER-iE deep light-blocking fluorosilicone shell)
  // =========================================================================
  const eyecupGroup = new THREE.Group();
  {
    // Rigid PC+ABS inner bayonet mounting collar (textured with Sony mold finish)
    const baseShape = createFrameShape(31.2, 24.6, 5.2, 22.8, 17.6, 3.6);
    const baseGeo = applyBoxUVs(extrudeHiRes(baseShape, 2.3, 0.22, 0.22, 2, 28), 18);
    const baseMesh = new THREE.Mesh(baseGeo, mats.ultra.evfFinderCoverMold);
    baseMesh.position.z = 2.05;
    eyecupGroup.add(baseMesh);

    // Lower eye-sensor clearance bridge cutout accent
    const lowerNotch = new THREE.Mesh(
      createChamferedBoxGeo(14.8, 2.2, 1.4, 0.4, 0.12, 'z'),
      mats.matteBlackAnodized
    );
    lowerNotch.position.set(0, -11.4, 2.2);
    eyecupGroup.add(lowerNotch);

    // Quick-release bayonet slide channels, stainless reinforcement guides & tactile side thumb-release tabs
    for (const sx of [-1, 1]) {
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(1.7, 15.6, 1.55, 0.25, 0.1, 'z'),
        mats.stainlessMachined
      );
      rail.position.set(sx * 14.4, 0.2, 2.85);
      eyecupGroup.add(rail);

      // Undercut locking detent tooth engaging E02 stainless spring claw
      const hook = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.4, 1.2), mats.stainlessMachined);
      hook.position.set(sx * 13.7, -4.4, 2.95);
      hook.userData.noEdges = true;
      eyecupGroup.add(hook);

      // Textured side release grip button tab (3 fine horizontal grip ridges)
      const lockTab = new THREE.Mesh(
        createChamferedBoxGeo(2.2, 4.4, 1.5, 0.35, 0.12, 'z'),
        mats.matteBlackAnodized
      );
      lockTab.position.set(sx * 15.8, -4.4, 1.85);
      eyecupGroup.add(lockTab);
      for (const gy of [-1.1, 0, 1.1]) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.38, 1.1), mats.evfHousingMg);
        rib.position.set(sx * 16.9, -4.4 + gy, 1.85);
        rib.userData.noEdges = true;
        eyecupGroup.add(rib);
      }
    }

    // Stepped flexible fluorosilicone accordion bellows neck
    const neckShape = createFrameShape(32.6, 26.0, 6.6, 23.8, 18.4, 4.2);
    const neckMesh = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(neckShape, 2.4, 0.32, 0.32, 2, 32), 14),
      mats.evfEyecupRubber
    );
    neckMesh.position.z = 0.05;
    eyecupGroup.add(neckMesh);

    // Mid ergonomic sculpted silicone shade shroud flaring rearward toward photographer's eye
    const midShade = createFrameShape(34.6, 27.8, 7.8, 24.8, 19.2, 4.8);
    const midMesh = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(midShade, 3.0, 0.45, 0.45, 2, 32), 14),
      mats.evfEyecupRubber
    );
    midMesh.position.z = -1.95;
    eyecupGroup.add(midMesh);

    // Deep rear cushioned asymmetrical eye-brow & temple wrap cushion lip
    const lipShade = createFrameShape(37.4, 30.2, 9.6, 25.8, 20.0, 5.6);
    const lipMesh = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(lipShade, 3.2, 0.92, 0.92, 3, 32), 14),
      mats.ultra.micRubberBootBlack
    );
    lipMesh.position.z = -4.35;
    eyecupGroup.add(lipMesh);

    // Sculpted upper anti-glare sun-brow hood visor (FDA-EP21 / ER-iE signature sun shield!)
    const browShape = new THREE.Shape();
    browShape.moveTo(-14.6, -1.6);
    browShape.quadraticCurveTo(0, 3.6, 14.6, -1.6);
    browShape.lineTo(13.2, -3.4);
    browShape.quadraticCurveTo(0, 1.0, -13.2, -3.4);
    browShape.closePath();
    const brow = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(browShape, 2.6, 0.42, 0.42, 2, 24), 12),
      mats.ultra.micRubberBootBlack
    );
    brow.position.set(0, 13.8, -5.4);
    brow.rotation.x = 0.24;
    eyecupGroup.add(brow);

    // 3 interior stepped matte anti-glare micro-baffle ribs trapping oblique sunlight inside eyecup bore!
    for (let i = 0; i < 3; i++) {
      const bz = 0.6 - i * 1.45;
      const bFrame = createFrameShape(
        24.6 + i * 0.6,
        19.0 + i * 0.5,
        4.4 + i * 0.3,
        23.4 + i * 0.6,
        17.8 + i * 0.5,
        3.9 + i * 0.3
      );
      const baffleRib = new THREE.Mesh(extrudeHiRes(bFrame, 0.34, 0.04, 0.04, 1, 24), mats.velvetFlockTrap);
      baffleRib.position.z = bz;
      baffleRib.userData.noEdges = true;
      eyecupGroup.add(baffleRib);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyecup',
      1,
      '#2c313a',
      eyecupGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -37.2),
      new THREE.Vector3(0, 0, -56),
      new THREE.Vector3(0, 34, -36),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E02: Quick-Release Stainless Eyecup Slide-Lock Rails & Spring Latches
  // =========================================================================
  const eyecupLatchGroup = new THREE.Group();
  {
    // Stamped SUS304 stainless bayonet carrier frame with labyrinth step flange
    const carrierShape = createFrameShape(30.0, 23.6, 4.6, 24.4, 18.6, 3.4);
    addCircleHoles(carrierShape, [
      [-11.4, 8.8, 0.65],
      [11.4, 8.8, 0.65],
      [-11.4, -8.8, 0.65],
      [11.4, -8.8, 0.65],
    ]);
    const carrier = new THREE.Mesh(
      extrudeHiRes(carrierShape, 1.15, 0.1, 0.1, 2, 28),
      mats.mountStainlessFlange
    );
    eyecupLatchGroup.add(carrier);

    // Rear perimeter dust-labyrinth raised lip step
    const labLip = new THREE.Mesh(
      extrudeHiRes(createFrameShape(26.6, 20.6, 3.8, 25.0, 19.0, 3.4), 0.55, 0.05, 0.05, 1, 24),
      mats.stainlessMachined
    );
    labLip.position.z = 0.65;
    eyecupLatchGroup.add(labLip);

    // Left & right L-profile beveled dovetail rails + pivoting spring-lock claws + guide pins + return springs
    for (const sx of [-1, 1]) {
      // Main dovetail slide rail with upper end-stop shoulder
      const dovetail = new THREE.Mesh(
        createChamferedBoxGeo(1.6, 16.4, 1.65, 0.2, 0.1, 'z'),
        mats.stainlessMachined
      );
      dovetail.position.set(sx * 13.4, 0.4, -0.4);
      eyecupLatchGroup.add(dovetail);

      const railFlange = new THREE.Mesh(new THREE.BoxGeometry(0.85, 15.8, 0.52), mats.mountStainlessFlange);
      railFlange.position.set(sx * 12.6, 0.4, -1.05);
      eyecupLatchGroup.add(railFlange);

      const topStop = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.2, 1.7), mats.stainlessMachined);
      topStop.position.set(sx * 13.4, 8.6, -0.4);
      eyecupLatchGroup.add(topStop);

      // Sculpted pivoting spring-steel locking claw with chamfered wedge catch tooth & pivot pin
      const clawShape = new THREE.Shape();
      clawShape.moveTo(-1.1, -2.2);
      clawShape.lineTo(1.2, -2.2);
      clawShape.lineTo(1.45, 0.6);
      clawShape.lineTo(0.4, 2.2);
      clawShape.lineTo(-1.1, 2.2);
      clawShape.closePath();
      const claw = new THREE.Mesh(extrudeHiRes(clawShape, 1.18, 0.08, 0.08, 1, 12), mats.mountSpringSteel);
      claw.scale.x = sx;
      claw.position.set(sx * 14.8, -4.4, -0.42);
      eyecupLatchGroup.add(claw);

      const pivotPin = new THREE.Mesh(
        hiResCyl(0.42, 0.42, 1.7, 14).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      pivotPin.position.set(sx * 14.2, -2.8, -0.35);
      pivotPin.userData.noEdges = true;
      eyecupLatchGroup.add(pivotPin);

      // Helical phosphor-bronze preload compression spring + internal stainless spring guide mandrel
      const spring = new THREE.Mesh(
        markHiRes(createHelicalSpringGeometry(0.68, 3.2, 7, 0.15).rotateY(Math.PI / 2)),
        mats.brassGear
      );
      spring.position.set(sx * 13.0, -4.4, 0.35);
      spring.userData.noEdges = true;
      eyecupLatchGroup.add(spring);

      const mandrel = new THREE.Mesh(
        hiResCyl(0.28, 0.28, 3.4, 10).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      mandrel.position.set(sx * 13.0, -4.4, 0.35);
      mandrel.userData.noEdges = true;
      eyecupLatchGroup.add(mandrel);

      // Top & bottom Phillips M1.2 mounting screws anchoring latch frame to EVF magnesium collar
      for (const sy of [-8.8, 8.8]) {
        const scr = buildPhillipsScrew(
          0.72,
          0.36,
          0.42,
          1.4,
          mats.stainlessMachined,
          mats.matteBlackAnodized,
          mats.titaniumRivet
        );
        scr.rotation.x = Math.PI / 2;
        scr.position.set(sx * 11.4, sy, -0.62);
        eyecupLatchGroup.add(scr);
      }
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyecup-latch',
      2,
      '#94a3b8',
      eyecupLatchGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -34.6),
      new THREE.Vector3(-6, -24, -48),
      new THREE.Vector3(-26, 22, -32),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E03: Anti-Fog Airtight Double-Pane Fluorine-Coated Eyepiece Glass Window
  //      (Canon EOS R1 / Sony a1 II sealed dry-air thermal insulating doublet)
  // =========================================================================
  const antifogGroup = new THREE.Group();
  {
    // CNC machined chamfered matte-black anodized aluminum bezel frame
    const bezelShape = createFrameShape(28.4, 22.6, 4.3, 22.8, 17.4, 3.2);
    const bezel = new THREE.Mesh(
      extrudeHiRes(bezelShape, 3.5, 0.24, 0.22, 2, 32),
      mats.matteBlackAnodized
    );
    antifogGroup.add(bezel);

    // Molded perimeter dual-rib EPDM Airtight Sealing O-Ring gasket (blocks moist air ingress!)
    const sealShape = createFrameShape(29.3, 23.5, 4.7, 27.6, 21.8, 3.9);
    const seal = new THREE.Mesh(
      extrudeHiRes(sealShape, 1.15, 0.18, 0.18, 2, 32),
      mats.epdmGasket
    );
    seal.position.z = 0.65;
    antifogGroup.add(seal);

    // Inner laser-welded stainless thermal air-gap spacer ring creating the 1.6mm dry-air chamber
    const spacerShape = createFrameShape(24.2, 18.8, 3.4, 22.4, 17.0, 3.0);
    const spacer = new THREE.Mesh(
      extrudeHiRes(spacerShape, 1.55, 0.06, 0.06, 1, 28),
      mats.stainlessMachined
    );
    antifogGroup.add(spacer);

    // Micro-perforated desiccant-breather pinholes along top/bottom inner spacer edge (authentic insulated glazing!)
    for (let i = -4; i <= 4; i++) {
      for (const sy of [-8.6, 8.6]) {
        const holeDot = new THREE.Mesh(
          hiResCyl(0.22, 0.22, 0.35, 8),
          mats.velvetFlockTrap
        );
        holeDot.position.set(i * 1.9, sy, 0);
        holeDot.userData.noEdges = true;
        antifogGroup.add(holeDot);
      }
    }

    // Hermetic butyl primary perimeter edge-seal bead bonding both glass panes to the thermal spacer
    const butylSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(24.6, 19.2, 3.5, 23.8, 18.4, 3.3), 2.5, 0.05, 0.05, 1, 24),
      mats.butylDamperRubber
    );
    antifogGroup.add(butylSeal);

    // Outer Fluorine-Coated Protective Glass Pane (-Z side facing eye, ultra-clean AR bevel)
    const outerGlassGeo = extrudeHiRes(createRoundedRectShape(23.2, 17.8, 3.0), 0.78, 0.06, 0.06, 2, 28);
    const outerGlass = new THREE.Mesh(outerGlassGeo, mats.evfAntiFogGlass);
    outerGlass.position.z = -1.16;
    outerGlass.userData.edgeOpacity = 0.38;
    antifogGroup.add(outerGlass);

    // Inner Sealed Anti-Fog Optical Glass Pane (+Z side facing EVF optics)
    const innerGlass = new THREE.Mesh(outerGlassGeo.clone(), mats.evfAntiFogGlass);
    innerGlass.position.z = 1.16;
    innerGlass.userData.edgeOpacity = 0.38;
    antifogGroup.add(innerGlass);

    // Crisp ground-glass chamfer edge highlight strips along both sealed panes
    const rimShape = createFrameShape(23.45, 18.05, 3.1, 22.65, 17.25, 2.9);
    const rimFront = new THREE.Mesh(extrudeHiRes(rimShape, 0.72, 0.04, 0.04, 1, 28), mats.evfGlassEdgeRim);
    rimFront.position.z = -1.16;
    const rimBack = new THREE.Mesh(extrudeHiRes(rimShape, 0.72, 0.04, 0.04, 1, 28), mats.evfGlassEdgeRim);
    rimBack.position.z = 1.16;
    antifogGroup.add(rimFront, rimBack);
  }
  parts.push(
    finalizeEvfPart(
      'evf-antifog-window',
      3,
      '#38bdf8',
      antifogGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -32.2),
      new THREE.Vector3(0, 0, -44),
      new THREE.Vector3(0, 34, -26),
      cp,
      0.26
    )
  );

  // =========================================================================
  // E04: ToF IR Proximity Eye Sensor & Ambient EVF Brightness Sensor
  // =========================================================================
  const eyeSensorGroup = new THREE.Group();
  {
    // Molded dark dual-chamber optical shroud directly beneath rear eyepiece window
    const housingShape = createRoundedRectShape(15.6, 5.4, 1.4);
    const housing = new THREE.Mesh(
      extrudeHiRes(housingShape, 2.4, 0.16, 0.16, 2, 20),
      mats.matteBlackAnodized
    );
    eyeSensorGroup.add(housing);

    // Internal opaque crosstalk baffle rib separating 940nm VCSEL emitter & SPAD receiver chambers
    const baffleWall = new THREE.Mesh(new THREE.BoxGeometry(0.65, 4.2, 1.6), mats.velvetFlockTrap);
    baffleWall.position.set(-1.4, 0, -0.8);
    eyeSensorGroup.add(baffleWall);

    // Emerald HDI sensor carrier PCB mapped cleanly with bespoke PCB texture
    const pcbGeo = applyPlanarUVs(createChamferedBoxGeo(16.6, 4.6, 0.85, 0.6, 0.06, 'z'), 16.6, 4.6, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, mats.ultra.evfTconPcb);
    pcb.position.z = 1.42;
    eyeSensorGroup.add(pcb);

    // Miniature 0402 bypass MLCCs & VCSEL driver IC on PCB back (+Z)
    const drvIc = buildChipPackage({
      w: 2.8,
      d: 2.2,
      h: 0.55,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      axis: 'z',
    });
    drvIc.position.set(-1.2, 0, 2.02);
    eyeSensorGroup.add(drvIc);
    for (const cx of [-4.2, 2.6, 4.4]) {
      const cap = buildSmdPassive(0.95, 0.52, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.position.set(cx, 0.8, 1.98);
      eyeSensorGroup.add(cap);
    }

    // Twin optical barrels facing -Z: 940nm VCSEL IR emitter (-3.4) + SPAD ToF receiver (+0.6)
    for (const sx of [-3.4, 0.6]) {
      const bezel = new THREE.Mesh(hiResCyl(1.62, 1.72, 0.88, 24).rotateX(Math.PI / 2), mats.goldPlating);
      bezel.position.set(sx, 0, -1.06);
      eyeSensorGroup.add(bezel);

      const innerCollar = new THREE.Mesh(
        hiResTorus(1.38, 0.16, 8, 24),
        mats.matteBlackAnodized
      );
      innerCollar.position.set(sx, 0, -1.48);
      innerCollar.userData.noEdges = true;
      eyeSensorGroup.add(innerCollar);

      if (sx < 0) {
        // 940nm VCSEL emitter cavity + ruby collimating micro-lens dome
        const vcselDie = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.25), mats.goldPlating);
        vcselDie.position.set(sx, 0, -1.18);
        vcselDie.userData.noEdges = true;
        const lens = new THREE.Mesh(hiResSphere(1.18, 18, 12), mats.irLedLens);
        lens.scale.set(1, 1, 0.48);
        lens.position.set(sx, 0, -1.32);
        lens.userData.noEdges = true;
        eyeSensorGroup.add(vcselDie, lens);
      } else {
        // SPAD ToF receiver silicon die mapped with bespoke NIR photodiode die texture + clear window
        const spadGeo = applyPlanarUVs(new THREE.PlaneGeometry(2.0, 2.0), 2.0, 2.0, 'xy-back');
        const spad = new THREE.Mesh(spadGeo, mats.ultra.evfGazeNirDie);
        spad.rotation.y = Math.PI;
        spad.position.set(sx, 0, -1.24);
        spad.userData.noEdges = true;
        const lens = new THREE.Mesh(hiResSphere(1.18, 18, 12), mats.evfAntiFogGlass);
        lens.scale.set(1, 1, 0.42);
        lens.position.set(sx, 0, -1.36);
        lens.userData.noEdges = true;
        eyeSensorGroup.add(spad, lens);
      }
    }

    // Rightmost V(lambda) Ambient Brightness Photodiode window showing 4-quadrant RGB/Clear sensor die!
    const ambFrame = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.8, 0.78, 0.3, 0.08, 'z'),
      mats.silverElectrode
    );
    ambFrame.position.set(4.9, 0, -1.08);
    const ambDieGeo = applyPlanarUVs(new THREE.PlaneGeometry(1.9, 1.9), 1.9, 1.9, 'xy-back');
    const ambDie = new THREE.Mesh(ambDieGeo, mats.ultra.evfAmbientRgbDie);
    ambDie.rotation.y = Math.PI;
    ambDie.position.set(4.9, 0, -1.49);
    ambDie.userData.noEdges = true;
    const ambGlass = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.1, 0.22), mats.evfLensAspheric);
    ambGlass.position.set(4.9, 0, -1.58);
    ambGlass.userData.noEdges = true;
    eyeSensorGroup.add(ambFrame, ambDie, ambGlass);

    // Contoured amber Kapton FPC tail routing upward with Sony flex texture & gold ZIF pad strip
    const fpcGeo = applyPlanarUVs(new THREE.BoxGeometry(4.6, 5.8, 0.22), 4.6, 5.8, 'xy');
    const fpc = new THREE.Mesh(fpcGeo, mats.ultra.evfOemFlexRibbon);
    fpc.position.set(0, 4.4, 1.72);
    const fpcGold = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.1, 0.26), mats.goldPlating);
    fpcGold.position.set(0, 6.9, 1.72);
    fpcGold.userData.noEdges = true;
    eyeSensorGroup.add(fpc, fpcGold);

    // Two detailed Phillips M1.2 mounting screws
    for (const sx of [-6.9, 6.9]) {
      const scr = buildPhillipsScrew(
        0.72,
        0.36,
        0.4,
        1.4,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.rotation.x = -Math.PI / 2;
      scr.position.set(sx, 0, 1.85);
      eyeSensorGroup.add(scr);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-eye-sensor',
      4,
      '#0ea5e9',
      eyeSensorGroup,
      new THREE.Vector3(0, 28.4, -30.6),
      new THREE.Vector3(0, -15, -34),
      new THREE.Vector3(0, 22, -22),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E05: Eye-Control AF 850nm Infrared Illumination Ring LED Array (×8)
  //      (Canon EOS R1 / EOS R5 Mark II dual-angle bare-eye & glasses IR ring!)
  // =========================================================================
  const irLedsGroup = new THREE.Group();
  {
    // Precision annular emerald HDI rigid-flex LED carrier board surrounding optical aperture
    const ringShape = createFrameShape(28.0, 23.0, 7.6, 21.6, 16.8, 5.4);
    const ringGeo = applyPlanarUVs(extrudeHiRes(ringShape, 1.15, 0.1, 0.1, 2, 32), 28.0, 23.0, 'xy-back');
    const ringBoard = new THREE.Mesh(ringGeo, mats.ultra.evfTconPcb);
    irLedsGroup.add(ringBoard);

    // Dual concentric ENIG gold power & pulse-sync distribution trace rings
    const goldOuter = new THREE.Mesh(
      extrudeHiRes(createFrameShape(26.6, 21.6, 7.1, 25.8, 20.8, 6.7), 0.14, 0, 0, 1, 32),
      mats.goldPlating
    );
    goldOuter.position.z = -0.6;
    const goldInner = new THREE.Mesh(
      extrudeHiRes(createFrameShape(23.0, 18.2, 5.9, 22.4, 17.6, 5.6), 0.14, 0, 0, 1, 32),
      mats.goldPlating
    );
    goldInner.position.z = -0.6;
    irLedsGroup.add(goldOuter, goldInner);

    // 8 High-Efficiency 850nm GaAlAs IR LED Emitters arrayed around eye-box:
    // 4 inner bare-eye emitters + 4 outer wide-angle glasses-compatible emitters (Canon EOS R1/R3!)
    const ledSpecs: Array<[number, number, boolean]> = [
      [-10.8, 6.8, true],
      [-4.2, 9.8, false],
      [4.2, 9.8, false],
      [10.8, 6.8, true],
      [10.8, -6.8, true],
      [4.2, -9.8, false],
      [-4.2, -9.8, false],
      [-10.8, -6.8, true],
    ];

    for (const [lx, ly, isGlassesWide] of ledSpecs) {
      const ledUnit = new THREE.Group();
      ledUnit.position.set(lx, ly, -0.78);
      // Slight inward optical convergence angle toward photographer's cornea!
      ledUnit.rotation.y = (lx / 14) * (isGlassesWide ? 0.16 : 0.10);
      ledUnit.rotation.x = -(ly / 12) * (isGlassesWide ? 0.16 : 0.10);

      // Chamfered white Al2O3 ceramic SMD emitter substrate + solder side castellations
      const pkg = new THREE.Mesh(
        createChamferedBoxGeo(2.35, 2.0, 0.82, 0.25, 0.08, 'z'),
        mats.ceramicAlumina
      );
      ledUnit.add(pkg);

      // Gold parabolic micro-reflector cup + cathode polarity chamfer tab
      const cup = new THREE.Mesh(
        hiResCyl(0.84, 0.96, 0.38, 20).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      cup.position.z = -0.44;
      ledUnit.add(cup);

      const cathodePad = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.85, 0.22), mats.goldPlating);
      cathodePad.position.set(-1.12, 0, 0.28);
      cathodePad.userData.noEdges = true;
      const anodePad = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.85, 0.22), mats.goldPlating);
      anodePad.position.set(1.12, 0, 0.28);
      anodePad.userData.noEdges = true;
      ledUnit.add(cathodePad, anodePad);

      // Ruby optical emitter dome (pulsed live during physics simulation via irLedMeshes!)
      const dome = new THREE.Mesh(
        hiResSphere(0.78, 12, 8),
        new THREE.MeshBasicMaterial({
          color: 0xc81440,
          clippingPlanes: cp,
        })
      );
      dome.scale.set(1, 1, 0.78);
      dome.position.z = -0.58;
      dome.userData.noEdges = true;
      dome.userData.dynamicGlow = true;
      ledUnit.add(dome);
      irLedMeshes.push(dome);

      irLedsGroup.add(ledUnit);

      // Paired 0402 pulse-current-limiting SMD resistor next to each IR LED
      const res = buildSmdPassive(1.1, 0.56, 0.42, mats.icEpoxy, mats.silverElectrode, 'z');
      const ang = Math.atan2(ly, lx);
      res.position.set(lx + Math.cos(ang) * 2.05, ly + Math.sin(ang) * 1.45, -0.74);
      res.rotation.z = ang + Math.PI / 2;
      irLedsGroup.add(res);
    }

    // Side amber polyimide driver flex tail connecting down to Eye-Control camera board
    const flexGeo = applyPlanarUVs(new THREE.BoxGeometry(3.8, 10.2, 0.24), 3.8, 10.2, 'xy');
    const flexTail = new THREE.Mesh(flexGeo, mats.ultra.evfOemFlexRibbon);
    flexTail.position.set(12.2, -9.0, 0.48);
    const flexGold = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.5, 0.28), mats.goldPlating);
    flexGold.position.set(12.2, -13.6, 0.48);
    flexGold.userData.noEdges = true;
    irLedsGroup.add(flexTail, flexGold);
  }
  parts.push(
    finalizeEvfPart(
      'evf-ir-leds',
      5,
      '#e11d48',
      irLedsGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -28.0),
      new THREE.Vector3(0, 0, -30),
      new THREE.Vector3(0, 34, -16),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E06: 45° Dichroic Hot-Mirror Optical Beam Splitter
  //      (40+ layer TiO2/SiO2 ion-assisted dielectric plate + stress-free clips)
  // =========================================================================
  const dichroicGroup = new THREE.Group();
  {
    // Tilted holder sub-assembly at EXACTLY -45° around X so eye IR (+Z) reflects straight DOWN (-Y)!
    const mirrorTilt = new THREE.Group();
    mirrorTilt.rotation.x = -Math.PI / 4;

    // Precision CNC machined anodized aluminum 45° mirror bezel with stepped optical shelf
    const frameShape = createFrameShape(23.8, 25.8, 2.0, 19.6, 21.6, 1.2);
    const frame = new THREE.Mesh(
      extrudeHiRes(frameShape, 1.65, 0.16, 0.16, 2, 20),
      mats.matteBlackAnodized
    );
    mirrorTilt.add(frame);

    // Inner matte-black velvet light-trap ledge framing the 0.65mm dichroic glass
    const innerStep = new THREE.Mesh(
      extrudeHiRes(createFrameShape(21.2, 23.2, 1.0, 19.4, 21.4, 0.8), 0.55, 0.04, 0.04, 1, 16),
      mats.velvetFlockTrap
    );
    innerStep.position.z = 0.52;
    mirrorTilt.add(innerStep);

    // 4 precision formed phosphor-bronze leaf spring retention clips + micro M1.0 brass anchor screws
    for (const [cx, cy, sx] of [
      [-10.9, 7.6, -1],
      [10.9, 7.6, 1],
      [-10.9, -7.6, -1],
      [10.9, -7.6, 1],
    ] as Array<[number, number, number]>) {
      const clipRib = new THREE.Mesh(
        buildFlatRibbonExtrude(
          [
            [sx * 1.1, 0.15],
            [sx * 0.2, 0.25],
            [-sx * 0.85, -0.18],
          ],
          0.26,
          3.2,
          'xz'
        ),
        mats.beCuSpring
      );
      clipRib.position.set(cx, cy, -0.84);
      mirrorTilt.add(clipRib);

      const mScr = createPrecisionScrew(0.46, 0.24, 0.7, mats.brassGear);
      mScr.rotation.x = Math.PI;
      mScr.position.set(cx + sx * 0.6, cy, -0.96);
      mirrorTilt.add(mScr);
    }

    // Ultra-thin multi-layer dielectric Dichroic Hot Mirror glass plate (magenta-gold 850nm reflection sheen!)
    const plate = new THREE.Mesh(
      createChamferedBoxGeo(20.4, 22.4, 0.68, 0.35, 0.05, 'z'),
      mats.evfDichroicMirror
    );
    plate.userData.edgeOpacity = 0.48;
    mirrorTilt.add(plate);

    // Subtle secondary broadband AR rear surface highlight film on +Z face
    const rearAr = new THREE.Mesh(
      new THREE.PlaneGeometry(19.6, 21.6),
      mats.evfAntiFogGlass
    );
    rearAr.position.z = 0.37;
    rearAr.userData.noEdges = true;
    mirrorTilt.add(rearAr);

    // Polished ground-glass dielectric edge rim
    const edgeRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(20.6, 22.6, 0.6, 19.8, 21.8, 0.4), 0.74, 0.04, 0.04, 1, 16),
      mats.evfGlassEdgeRim
    );
    mirrorTilt.add(edgeRim);

    dichroicGroup.add(mirrorTilt);

    // Left & right precision alignment pivot trunnions with D-flat angle keyways & stainless thrust washers
    for (const sx of [-1, 1]) {
      const collar = new THREE.Mesh(
        hiResCyl(1.7, 1.7, 0.65, 20).rotateZ(Math.PI / 2),
        mats.brassGear
      );
      collar.position.set(sx * 11.95, 0, 0);
      const trunnion = new THREE.Mesh(
        hiResCyl(1.12, 1.12, 2.4, 20).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      trunnion.position.set(sx * 13.0, 0, 0);
      // Keyed angular alignment flat on trunnion tip locking exact 45.0° ±0.05° orientation
      const keyFlat = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.35, 0.6), mats.titaniumRivet);
      keyFlat.position.set(sx * 14.0, 0, 0);
      keyFlat.userData.noEdges = true;
      dichroicGroup.add(collar, trunnion, keyFlat);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-dichroic-mirror',
      6,
      '#db2777',
      dichroicGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -22.2),
      new THREE.Vector3(0, 0, -16),
      new THREE.Vector3(0, 34, -6),
      cp,
      0.28
    )
  );

  // =========================================================================
  // E07: Eye-Control AF 307K-Pixel (640×480) NIR Gaze Camera
  //      (Mounted straight below E06 inside Mainboard top-center EVF notch!)
  // =========================================================================
  const gazeCamGroup = new THREE.Group();
  {
    // Emerald mini HDI camera carrier PCB facing +Y (looking straight UP into 45° Dichroic Mirror!)
    const camPcbGeo = applyPlanarUVs(
      extrudeHiRes(createRoundedRectShape(16.8, 13.0, 1.6), 1.05, 0.09, 0.09, 2, 20).rotateX(Math.PI / 2),
      16.8,
      13.0,
      'xz'
    );
    const camPcb = new THREE.Mesh(camPcbGeo, mats.ultra.evfTconPcb);
    camPcb.position.y = -2.2;
    gazeCamGroup.add(camPcb);

    // White HTCC alumina ceramic CLCC sensor package with gold castellation solder fillets
    const pkg = new THREE.Mesh(
      createChamferedBoxGeo(10.0, 1.12, 8.6, 0.5, 0.1, 'y'),
      mats.ceramicAlumina
    );
    pkg.position.y = -1.16;
    gazeCamGroup.add(pkg);

    // Castellated ENIG gold leads along all 4 sides of the CLCC package
    for (let i = -3; i <= 3; i++) {
      for (const sz of [-4.32, 4.32]) {
        const cast = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.72, 0.24), mats.goldPlating);
        cast.position.set(i * 1.15, -1.32, sz);
        cast.userData.noEdges = true;
        gazeCamGroup.add(cast);
      }
    }

    // Gleaming 307K-pixel (640×480) 850nm NIR Line-of-Sight CMOS silicon sensor die looking straight +Y!
    const nirDieGeo = applyPlanarUVs(new THREE.BoxGeometry(6.6, 0.36, 5.2), 6.6, 5.2, 'xz');
    const nirDie = new THREE.Mesh(nirDieGeo, mats.ultra.evfGazeNirDie);
    nirDie.position.y = -0.56;
    gazeCamGroup.add(nirDie);

    // Stepped gold perimeter wire-bond shelf ring + 16 authentic ball-to-stitch gold wirebond loops!
    const padRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(8.4, 7.0, 0.45, 6.8, 5.4, 0.25), 0.18, 0.02, 0.02, 1, 12).rotateX(
        Math.PI / 2
      ),
      mats.goldPlating
    );
    padRing.position.y = -0.58;
    gazeCamGroup.add(padRing);

    for (let i = -3; i <= 3; i++) {
      for (const sz of [-1, 1]) {
        const wb = buildGoldWirebondLoop(
          new THREE.Vector3(i * 0.88, -0.38, sz * 2.45),
          new THREE.Vector3(i * 0.88, -0.50, sz * 3.25),
          0.36,
          0.045,
          mats.goldPlating
        );
        gazeCamGroup.add(wb);
      }
    }

    // Miniature companion LDO voltage regulator & 0402 bypass MLCC array flanking the CLCC package
    const ldo = buildChipPackage({
      w: 2.2,
      d: 1.8,
      h: 0.58,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      axis: 'y',
    });
    ldo.position.set(6.4, -1.42, 0.4);
    gazeCamGroup.add(ldo);
    for (const cz of [-2.8, -1.2, 1.2, 2.8]) {
      const cap = buildSmdPassive(0.95, 0.52, 0.42, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(-6.4, -1.48, cz);
      gazeCamGroup.add(cap);
    }

    // Micro B2B mezzanine gold connector & shielded orange Sony OEM FPC tail feeding AI Accelerator
    const b2b = new THREE.Mesh(
      createChamferedBoxGeo(6.6, 0.92, 2.3, 0.25, 0.08, 'y'),
      mats.zifIvoryPlastic
    );
    b2b.position.set(0, -3.02, -3.8);
    const fpcGeo = applyPlanarUVs(new THREE.BoxGeometry(5.6, 0.24, 5.8), 5.6, 5.8, 'xz');
    const fpc = new THREE.Mesh(fpcGeo, mats.ultra.evfOemFlexRibbon);
    fpc.position.set(0, -3.14, -6.6);
    const fpcGold = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.28, 1.2), mats.goldPlating);
    fpcGold.position.set(0, -3.14, -9.1);
    fpcGold.userData.noEdges = true;
    gazeCamGroup.add(b2b, fpc, fpcGold);

    // 4 Corner Phillips M1.2 mounting screws with brass washers
    for (const [sx, sz] of [
      [-6.8, -4.8],
      [6.8, -4.8],
      [-6.8, 4.8],
      [6.8, 4.8],
    ]) {
      const scr = buildPhillipsScrew(
        0.65,
        0.34,
        0.36,
        1.2,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.rotation.x = Math.PI;
      scr.position.set(sx, -1.55, sz);
      gazeCamGroup.add(scr);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-gaze-camera',
      7,
      '#9333ea',
      gazeCamGroup,
      new THREE.Vector3(0, 25.4, -22.2),
      new THREE.Vector3(0, -18, -16),
      new THREE.Vector3(0, 12, -6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E08: Rear Large-Aperture Double-Sided Aspheric Eyepiece Lens (G4)
  //      (φ23.0mm GMo glass-molded double aspheric, ZEISS T* multi-layer AR)
  // =========================================================================
  const lensRearGroup = new THREE.Group();
  {
    // High-res curved double-convex glass-molded (GMo) aspheric eyepiece lens (φ22.8 mm)
    const glassGeo = markHiRes(createOpticalLensGeometry(11.4, 2.0, 2.55, 2.15, -0.62, 0.42, 26, 52));
    const glass = new THREE.Mesh(glassGeo, mats.evfLensAspheric);
    glass.userData.edgeOpacity = 0.34;
    lensRearGroup.add(glass);

    // Frosted ground-glass outer edge chamfer rings for razor-sharp optical definition
    for (const rz of [-0.72, 0.72]) {
      const rim = new THREE.Mesh(hiResTorus(11.36, 0.24, 10, 48), mats.evfGlassEdgeRim);
      rim.position.z = rz;
      rim.userData.noEdges = true;
      lensRearGroup.add(rim);
    }

    // CNC stepped matte-black anodized aluminum lens mounting cell with internal light-trap grooves!
    const cell = createSteppedLensCell(11.2, 13.15, 4.0, mats.matteBlackAnodized, mats.velvetFlockTrap, 4);
    lensRearGroup.add(cell);

    // Outer stepped alignment shoulder ring & optical registration index dot
    const stepShoulder = new THREE.Mesh(
      extrudeHiRes(
        (() => {
          const s = new THREE.Shape();
          s.absarc(0, 0, 13.55, 0, Math.PI * 2, false);
          const h = new THREE.Path();
          h.absarc(0, 0, 13.0, 0, Math.PI * 2, true);
          s.holes.push(h);
          return s;
        })(),
        1.1,
        0.1,
        0.1,
        1,
        36
      ),
      mats.evfHousingMg
    );
    stepShoulder.position.z = 1.1;
    lensRearGroup.add(stepShoulder);

    // Threaded brass optical retaining ring with 4 precision spanner-wrench assembly slots
    const retainRing = createSpannerRetainerRing(
      10.75,
      12.15,
      0.78,
      mats.brassGear,
      mats.matteBlackAnodized,
      4,
      -1
    );
    retainRing.position.z = -2.02;
    lensRearGroup.add(retainRing);

    // Rear elastomeric thermal-expansion cushion O-ring cushioning G4 glass against cell shoulder
    const cushionO = new THREE.Mesh(hiResTorus(11.15, 0.26, 8, 40), mats.epdmGasket);
    cushionO.position.z = 1.65;
    cushionO.userData.noEdges = true;
    lensRearGroup.add(cushionO);
  }
  parts.push(
    finalizeEvfPart(
      'evf-lens-rear',
      8,
      '#0284c7',
      lensRearGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -15.4),
      new THREE.Vector3(0, 0, -2),
      new THREE.Vector3(0, 34, 4),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E09: Movable Diopter Focus Group — ED + High-Index Lanthanum Cemented Doublet (G2/G3)
  // =========================================================================
  const lensEdGroup = new THREE.Group();
  {
    // Element G3 (rear/-Z side): Positive biconvex ED Low-Dispersion Crown glass (FCD emerald sheen!)
    const edCrownGeo = markHiRes(createOpticalLensGeometry(10.2, 1.6, 2.35, 1.85, -0.32, 0.25, 24, 52));
    const edCrown = new THREE.Mesh(edCrownGeo, mats.evfLensEd);
    edCrown.position.z = -1.1;
    edCrown.userData.edgeOpacity = 0.34;
    lensEdGroup.add(edCrown);

    // UV Optical Cement interface seam ring visibly marking the achromatic cemented doublet junction!
    const cementSeam = new THREE.Mesh(hiResTorus(10.16, 0.16, 8, 44), mats.opticalCementClear);
    cementSeam.position.z = -0.05;
    cementSeam.userData.noEdges = true;
    lensEdGroup.add(cementSeam);

    // Element G2 (front/+Z side): High-Index Lanthanum Negative Concave Flint (S-TIH cobalt tint)
    const flintGeo = markHiRes(createOpticalLensGeometry(10.2, 2.8, -0.4, -2.15, 0.12, 0.28, 24, 52));
    const flint = new THREE.Mesh(flintGeo, mats.evfLensField);
    flint.position.z = 1.45;
    flint.userData.edgeOpacity = 0.34;
    lensEdGroup.add(flint);

    // Cemented doublet ground-glass perimeter band + chamfers
    const glassBand = new THREE.Mesh(
      hiResCyl(10.28, 10.28, 4.4, 48, true).rotateX(Math.PI / 2),
      mats.evfGlassEdgeRim
    );
    glassBand.position.z = 0.2;
    glassBand.userData.noEdges = true;
    lensEdGroup.add(glassBand);

    // CNC Machined Magnesium Sliding Diopter Focus Carriage encircling the cemented doublet
    const carriage = createSteppedLensCell(10.1, 12.0, 5.3, mats.magnesiumCast, mats.velvetFlockTrap, 3);
    carriage.position.z = 0.2;
    lensEdGroup.add(carriage);

    // Rear brass threaded spanner retaining ring locking G2/G3 doublet into magnesium carriage
    const edRetain = createSpannerRetainerRing(
      9.85,
      11.2,
      0.62,
      mats.brassGear,
      mats.matteBlackAnodized,
      4,
      -1
    );
    edRetain.position.z = -2.55;
    lensEdGroup.add(edRetain);

    // Right-side CNC lead-screw drive lug arm with lightening fillet + flanged C3604 brass nut boss
    const driveArm = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 4.6, 4.0, 0.65, 0.16, 'z'),
      mats.magnesiumCast
    );
    driveArm.position.set(13.2, 0, 0.2);
    lensEdGroup.add(driveArm);

    const leadNut = new THREE.Mesh(
      hiResCyl(1.82, 1.82, 4.6, 24).rotateX(Math.PI / 2),
      mats.brassGear
    );
    leadNut.position.set(14.8, 0, 0.2);
    lensEdGroup.add(leadNut);
    const nutFlange = new THREE.Mesh(
      hiResCyl(2.25, 2.25, 0.65, 24).rotateX(Math.PI / 2),
      mats.brassGear
    );
    nutFlange.position.set(14.8, 0, -1.85);
    lensEdGroup.add(nutFlange);

    // TRUE KINEMATIC 2-AXIS SUPPORT:
    // 1. Upper-right (+11.8, +7.6): Closed long precision stainless sleeve + pressed PTFE inner bushing!
    const mainGusset = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 3.2, 5.4, 0.5, 0.14, 'z'),
      mats.magnesiumCast
    );
    mainGusset.position.set(10.8, 6.8, 0.2);
    mainGusset.rotation.z = 0.56;
    const mainSleeve = new THREE.Mesh(
      hiResCyl(1.42, 1.42, 6.2, 22).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    mainSleeve.position.set(11.8, 7.6, 0.2);
    const ptfeLiner = new THREE.Mesh(
      hiResCyl(1.06, 1.06, 6.45, 20).rotateX(Math.PI / 2),
      mats.lcdDiffuserMatte
    );
    ptfeLiner.position.set(11.8, 7.6, 0.2);
    ptfeLiner.userData.noEdges = true;
    lensEdGroup.add(mainGusset, mainSleeve, ptfeLiner);

    // 2. Lower-left (-11.8, -6.8): Open U-fork anti-rotation kinematic guide saddle (zero thermal binding!)
    const uForkShape = new THREE.Shape();
    uForkShape.moveTo(-2.4, -1.65);
    uForkShape.lineTo(1.8, -1.65);
    uForkShape.lineTo(1.8, 1.65);
    uForkShape.lineTo(-2.4, 1.65);
    uForkShape.lineTo(-2.4, 0.85);
    uForkShape.lineTo(-0.3, 0.85);
    uForkShape.absarc(0, 0, 0.85, Math.PI * 0.5, -Math.PI * 0.5, true);
    uForkShape.lineTo(-2.4, -0.85);
    uForkShape.closePath();
    const uFork = new THREE.Mesh(
      extrudeHiRes(uForkShape, 5.4, 0.12, 0.12, 1, 16),
      mats.stainlessMachined
    );
    uFork.position.set(-11.8, -6.8, 0.2);
    uFork.rotation.z = 0.52;
    lensEdGroup.add(uFork);
  }
  const edLensPart = finalizeEvfPart(
    'evf-lens-ed-doublet',
    9,
    '#10b981',
    lensEdGroup,
    new THREE.Vector3(0, EVF_OPTICAL_Y, -9.2),
    new THREE.Vector3(0, 0, 12),
    new THREE.Vector3(0, 34, 14),
    cp,
    0.24
  );
  parts.push(edLensPart);

  // =========================================================================
  // E10: Centerless-Ground Twin Stainless Diopter Guide Rods & Preload Springs
  // =========================================================================
  const diopterRailsGroup = new THREE.Group();
  {
    const rodCoords: Array<[number, number]> = [
      [11.8, 7.6],
      [-11.8, -6.8],
    ];
    for (const [rx, ry] of rodCoords) {
      // Centerless-ground mirror-lapped SUS420J2 hardened linear guide shaft
      const shaft = new THREE.Mesh(
        hiResCyl(0.75, 0.75, 20.6, 22).rotateX(Math.PI / 2),
        mats.mountStainlessFlange
      );
      shaft.position.set(rx, ry, 0);
      diopterRailsGroup.add(shaft);

      // Chamfered tapered assembly lead-in tips on both ends of shaft
      for (const sz of [-10.55, 10.55]) {
        const tip = new THREE.Mesh(
          hiResCyl(sz > 0 ? 0.52 : 0.75, sz > 0 ? 0.75 : 0.52, 0.5, 18).rotateX(Math.PI / 2),
          mats.stainlessMachined
        );
        tip.position.set(rx, ry, sz);
        tip.userData.noEdges = true;
        diopterRailsGroup.add(tip);
      }

      // Anti-backlash phosphor-bronze helical preload compression spring seated with flat thrust washers
      const preloadSpring = new THREE.Mesh(
        markHiRes(createHelicalSpringGeometry(1.24, 5.8, 8, 0.19)),
        mats.brassGear
      );
      preloadSpring.position.set(rx, ry, 5.2);
      preloadSpring.userData.noEdges = true;
      diopterRailsGroup.add(preloadSpring);

      for (const wz of [2.15, 8.25]) {
        const sWash = new THREE.Mesh(
          hiResCyl(1.48, 1.48, 0.25, 18).rotateX(Math.PI / 2),
          mats.stainlessMachined
        );
        sWash.position.set(rx, ry, wz);
        sWash.userData.noEdges = true;
        diopterRailsGroup.add(sWash);
      }

      // Front & rear self-lubricating white PTFE flanged end-mount bushings + authentic E-clips!
      for (const sz of [-9.8, 9.8]) {
        const endMount = new THREE.Mesh(
          hiResCyl(1.5, 1.5, 1.35, 22).rotateX(Math.PI / 2),
          mats.pomGear
        );
        endMount.position.set(rx, ry, sz);
        const flange = new THREE.Mesh(
          hiResCyl(1.95, 1.95, 0.42, 22).rotateX(Math.PI / 2),
          mats.lcdDiffuserMatte
        );
        flange.position.set(rx, ry, sz + (sz > 0 ? -0.45 : 0.45));
        diopterRailsGroup.add(endMount, flange);

        const eClip = buildEClip(0.76, 1.35, 0.24, mats.mountSpringSteel);
        eClip.position.set(rx, ry, sz + (sz > 0 ? -0.88 : 0.88));
        diopterRailsGroup.add(eClip);
      }
    }

    // CNC blackened front & rear cross-tie alignment bridge frames with datum pinholes
    for (const sz of [-9.8, 9.8]) {
      const bridgeShape = createFrameShape(26.8, 18.8, 3.8, 23.0, 15.0, 2.8);
      addCircleHoles(bridgeShape, [
        [-11.8, 7.6, 0.65],
        [11.8, -6.8, 0.65],
      ]);
      const bridge = new THREE.Mesh(
        extrudeHiRes(bridgeShape, 0.92, 0.08, 0.08, 2, 24),
        mats.matteBlackAnodized
      );
      bridge.position.z = sz;
      diopterRailsGroup.add(bridge);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-rails',
      10,
      '#64748b',
      diopterRailsGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -9.2),
      new THREE.Vector3(-28, -14, 12),
      new THREE.Vector3(-26, 20, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E11: Helical Spiral-Cam Diopter Barrel Sleeve & Brass Sector Pinion
  // =========================================================================
  const helicoidGroup = new THREE.Group();
  {
    // Concentric CNC-machined helicoid cam barrel encircling the movable ED doublet
    const barrelShell = createSteppedLensCell(12.0, 13.15, 10.6, mats.matteBlackAnodized, mats.velvetFlockTrap, 3);
    helicoidSleeveGroup.add(barrelShell);

    // Front & rear gleaming hardened stainless thrust-bearing race rings
    for (const sz of [-5.2, 5.2]) {
      const ring = createSpannerRetainerRing(
        11.95,
        13.45,
        0.85,
        mats.mountStainlessFlange,
        mats.matteBlackAnodized,
        4,
        sz > 0 ? 1 : -1
      );
      ring.position.z = sz;
      helicoidSleeveGroup.add(ring);
    }

    // 3x 120°-spaced recessed helical spiral cam-slot tracks & stepped stainless roller cam-followers
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3 + 0.35;
      const slotTrack = new THREE.Group();
      slotTrack.rotation.z = angle;

      // Twin parallel beveled C3604 brass cam-guide rails defining the spiral slot channel
      for (const offsetY of [-0.72, 0.72]) {
        const rail = new THREE.Mesh(
          createChamferedBoxGeo(0.82, 0.42, 7.8, 0.1, 0.05, 'z'),
          mats.brassGear
        );
        rail.position.set(13.28, offsetY, 0);
        rail.rotation.x = 0.28; // Authentic β = 6.8°–16° self-locking helical lead angle!
        slotTrack.add(rail);
      }

      // Dark recessed spiral slot floor between brass guide rails
      const slotFloor = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.05, 7.6), mats.velvetFlockTrap);
      slotFloor.position.set(13.1, 0, 0);
      slotFloor.rotation.x = 0.28;
      slotFloor.userData.noEdges = true;
      slotTrack.add(slotFloor);

      // Stepped stainless roller-bearing cam-follower pin with POM low-friction sleeve & retaining head
      const followerPin = new THREE.Mesh(
        hiResCyl(0.54, 0.54, 2.4, 16).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      followerPin.position.set(12.6, 0, 0);
      const rollerSleeve = new THREE.Mesh(
        hiResCyl(0.76, 0.76, 0.95, 16).rotateZ(Math.PI / 2),
        mats.pomGear
      );
      rollerSleeve.position.set(13.22, 0, 0);
      const pinCap = new THREE.Mesh(
        hiResCyl(0.92, 0.92, 0.32, 16).rotateZ(Math.PI / 2),
        mats.titaniumRivet
      );
      pinCap.position.set(13.82, 0, 0);
      pinCap.userData.noEdges = true;
      slotTrack.add(followerPin, rollerSleeve, pinCap);

      helicoidSleeveGroup.add(slotTrack);
    }

    // Precision-hobbed C3604 brass radial involute sector gear arc + curved stiffening web on +X flank
    const webArc = new THREE.Mesh(
      hiResTorus(13.25, 0.45, 8, 22, 0.92),
      mats.brassGear
    );
    webArc.rotation.z = -0.46;
    webArc.position.z = -3.4;
    webArc.userData.noEdges = true;
    helicoidSleeveGroup.add(webArc);

    for (let t = -5; t <= 5; t++) {
      const a = t * 0.082;
      const tooth = new THREE.Mesh(
        createChamferedBoxGeo(1.45, 0.48, 2.25, 0.08, 0.05, 'z'),
        mats.brassGear
      );
      tooth.position.set(Math.cos(a) * 13.72, Math.sin(a) * 13.72, -3.4);
      tooth.rotation.z = a;
      tooth.userData.noEdges = true;
      helicoidSleeveGroup.add(tooth);
    }

    helicoidGroup.add(helicoidSleeveGroup);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-helicoid',
      11,
      '#ca8a04',
      helicoidGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -9.2),
      new THREE.Vector3(30, 8, 12),
      new THREE.Vector3(28, 46, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E12: Precision Helical Diopter Dial & Brass Lead Screw Mechanism
  // =========================================================================
  const diopterGroup = new THREE.Group();
  const diopterDialGroup = new THREE.Group();
  const leadScrewGroup = new THREE.Group();
  {
    // Sculpted anodized support spine bracket with triangular stiffening ribs
    const bracket = new THREE.Mesh(
      createChamferedBoxGeo(1.5, 4.0, 18.2, 0.35, 0.1, 'z'),
      mats.matteBlackAnodized
    );
    bracket.position.set(2.8, 8.2, 0);
    diopterGroup.add(bracket);

    // Front & rear CNC magnesium bearing pillow blocks fitted with pressed-in sintered bronze sleeve bearings
    for (const sz of [-8.2, 8.2]) {
      const block = new THREE.Mesh(
        createChamferedBoxGeo(4.6, 5.4, 1.75, 0.6, 0.14, 'z'),
        mats.magnesiumCast
      );
      block.position.set(0.2, 0, sz);
      const oilite = new THREE.Mesh(
        hiResCyl(1.42, 1.42, 1.98, 20).rotateX(Math.PI / 2),
        mats.brassGear
      );
      oilite.position.set(-0.2, 0, sz);
      diopterGroup.add(block, oilite);

      // Anchor screw on pillow block ear
      const bScr = createPrecisionScrew(0.55, 0.28, 1.0, mats.stainlessMachined);
      bScr.position.set(1.6, 1.8, sz + (sz > 0 ? 0.9 : -0.9));
      if (sz < 0) bScr.rotation.x = Math.PI;
      diopterGroup.add(bScr);
    }

    // Gleaming Turned C3604 Brass Acme/Trapezoidal Helical Lead Screw (live-animated!)
    const screwCore = new THREE.Mesh(
      hiResCyl(0.95, 0.95, 18.2, 22).rotateX(Math.PI / 2),
      mats.brassGear
    );
    leadScrewGroup.add(screwCore);

    // Continuous trapezoidal helical thread ridges along brass lead screw
    const threadHelix = new THREE.Mesh(
      markHiRes(createHelicalSpringGeometry(1.14, 14.4, 15, 0.16)),
      mats.brassGear
    );
    threadHelix.userData.noEdges = true;
    leadScrewGroup.add(threadHelix);

    // Retaining E-clip on front journal shoulder
    const leadClip = buildEClip(0.88, 1.42, 0.24, mats.mountSpringSteel);
    leadClip.position.z = 9.2;
    leadScrewGroup.add(leadClip);

    // Rear 16-tooth brass involute spur drive pinion driven by pull-out diopter dial
    const screwGear = new THREE.Mesh(
      markHiRes(createSpurGearGeometry(16, 2.35, 1.45, 0.85)),
      mats.brassGear
    );
    screwGear.position.z = -6.4;
    leadScrewGroup.add(screwGear);
    leadScrewGroup.position.set(-0.2, 0, 0);
    diopterGroup.add(leadScrewGroup);

    // External Knurled Push-Lock Diopter Adjustment Dial (protruding right at +X for thumb control!)
    diopterDialGroup.position.set(4.6, 0, -6.4);
    const dialShaft = new THREE.Mesh(
      hiResCyl(1.12, 1.12, 4.4, 22).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    dialShaft.position.x = -1.6;
    diopterDialGroup.add(dialShaft);

    // Mating 14-tooth POM bevel/spur gear on dial shaft
    const dialGear = new THREE.Mesh(
      markHiRes(createSpurGearGeometry(14, 2.15, 1.45, 0.72).rotateY(Math.PI / 2)),
      mats.pomGear
    );
    dialGear.position.x = -2.2;
    diopterDialGroup.add(dialGear);

    // Double EPDM weather-seal O-rings seated in shaft grooves
    for (const ox of [-0.6, 0.0]) {
      const oRing = new THREE.Mesh(
        hiResTorus(1.36, 0.26, 10, 24).rotateY(Math.PI / 2),
        mats.epdmGasket
      );
      oRing.position.x = ox;
      oRing.userData.noEdges = true;
      diopterDialGroup.add(oRing);
    }

    // Lathe-turned chamfered anodized thumbwheel drum
    const drumPts: THREE.Vector2[] = [
      new THREE.Vector2(1.1, -1.85),
      new THREE.Vector2(4.05, -1.85),
      new THREE.Vector2(4.42, -1.45),
      new THREE.Vector2(4.42, 1.45),
      new THREE.Vector2(4.05, 1.85),
      new THREE.Vector2(0.02, 1.85),
    ];
    const drumGeo = markHiRes(new THREE.LatheGeometry(drumPts, 36));
    drumGeo.rotateZ(-Math.PI / 2);
    drumGeo.computeVertexNormals();
    const drum = new THREE.Mesh(drumGeo, mats.matteBlackAnodized);
    drum.position.x = 1.65;
    diopterDialGroup.add(drum);

    // 28 crisp tactile machined diamond-flute knurling ribs around thumbwheel rim
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const flute = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.34, 0.34), mats.evfHousingMg);
      flute.position.set(1.65, Math.cos(a) * 4.44, Math.sin(a) * 4.44);
      flute.rotation.x = a;
      flute.userData.noEdges = true;
      diopterDialGroup.add(flute);
    }

    // Bespoke circular laser-engraved - / 0 / + Sony CV DIOPTER ADJUST DIAL face cap!
    const dialCapGeo = markHiRes(new THREE.CircleGeometry(3.85, 36));
    dialCapGeo.rotateY(Math.PI / 2);
    const dialCap = new THREE.Mesh(dialCapGeo, mats.ultra.evfDiopterDialCap);
    dialCap.position.x = 3.53;
    dialCap.userData.noEdges = true;
    diopterDialGroup.add(dialCap);

    // Polished stainless outer bezel trim ring + central recessed service screw head
    const capRing = new THREE.Mesh(
      hiResTorus(3.88, 0.24, 10, 32).rotateY(Math.PI / 2),
      mats.mountStainlessFlange
    );
    capRing.position.x = 3.50;
    diopterDialGroup.add(capRing);

    const centerScr = buildPhillipsScrew(
      0.85,
      0.34,
      0.45,
      0.6,
      mats.stainlessMachined,
      mats.matteBlackAnodized,
      mats.titaniumRivet
    );
    centerScr.rotation.z = -Math.PI / 2;
    centerScr.position.x = 3.44;
    diopterDialGroup.add(centerScr);

    diopterGroup.add(diopterDialGroup);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-mech',
      12,
      '#d97706',
      diopterGroup,
      new THREE.Vector3(15.0, EVF_OPTICAL_Y, -9.2),
      new THREE.Vector3(16, -24, 12),
      new THREE.Vector3(24, 24, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E13: Front Aspheric Field-Flattener Condenser Lens (G1)
  // =========================================================================
  const lensFieldGroup = new THREE.Group();
  {
    // High-res positive meniscus GMo aspheric condenser lens facing OLED
    const fieldGlassGeo = markHiRes(createOpticalLensGeometry(9.6, 1.7, -0.45, 2.25, 0.14, -0.38, 24, 52));
    const fieldGlass = new THREE.Mesh(fieldGlassGeo, mats.evfLensField);
    fieldGlass.userData.edgeOpacity = 0.34;
    lensFieldGroup.add(fieldGlass);

    // Ground-glass edge bevel rings
    for (const rz of [-0.52, 0.52]) {
      const rim = new THREE.Mesh(hiResTorus(9.58, 0.22, 10, 44), mats.evfGlassEdgeRim);
      rim.position.z = rz;
      rim.userData.noEdges = true;
      lensFieldGroup.add(rim);
    }

    // CNC stepped anodized lens cell with internal anti-reflection micro-baffle grooves
    const cell = createSteppedLensCell(9.45, 11.2, 2.55, mats.matteBlackAnodized, mats.velvetFlockTrap, 3);
    lensFieldGroup.add(cell);

    // 4-slot blackened brass retaining ring on front face
    const g1Retain = createSpannerRetainerRing(
      9.15,
      10.45,
      0.52,
      mats.brassGear,
      mats.matteBlackAnodized,
      4,
      -1
    );
    g1Retain.position.z = -1.32;
    lensFieldGroup.add(g1Retain);

    // Integrated anodized optical field-stop flange with precision 4:3 OLED aperture mask & 4 datum holes
    const maskShape = createFrameShape(23.4, 19.8, 3.0, 14.4, 11.0, 0.6);
    addCircleHoles(maskShape, [
      [-9.6, 7.8, 0.72],
      [9.6, 7.8, 0.72],
      [-9.6, -7.8, 0.72],
      [9.6, -7.8, 0.72],
    ]);
    const mask = new THREE.Mesh(
      extrudeHiRes(maskShape, 1.45, 0.14, 0.14, 2, 24),
      mats.matteBlackAnodized
    );
    mask.position.z = 1.15;
    lensFieldGroup.add(mask);

    // Inner velvety stray-light aperture frame lip on +Z OLED side
    const innerLip = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.6, 12.2, 0.7, 14.2, 10.8, 0.4), 0.35, 0.04, 0.04, 1, 16),
      mats.velvetFlockTrap
    );
    innerLip.position.z = 1.92;
    lensFieldGroup.add(innerLip);
  }
  parts.push(
    finalizeEvfPart(
      'evf-lens-field',
      13,
      '#4f46e5',
      lensFieldGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -2.4),
      new THREE.Vector3(0, 0, 26),
      new THREE.Vector3(0, 34, 24),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E14: 0.64-inch 9.44M-Dot Quad-XGA 2-Stack Tandem Micro-OLED (OLEDoS)
  //      (Sony Semiconductor ECX337AA-1 / ECX343E — EVF Hero Centerpiece!)
  // =========================================================================
  const oledGroup = new THREE.Group();
  let oledScreenMesh!: THREE.Mesh;
  {
    // Precision chamfered HTCC Alumina Ceramic / Kovar Microdisplay Carrier Package
    const carrierShape = createRoundedRectShape(23.2, 19.0, 1.8);
    const carrier = new THREE.Mesh(
      extrudeHiRes(carrierShape, 1.65, 0.16, 0.16, 2, 22),
      mats.ceramicAlumina
    );
    carrier.position.z = 0.55;
    oledGroup.add(carrier);

    // Rear (+Z) Sony LCD902 Factory 2D DataMatrix/QR Calibration Backplate + Gold Thermal Die-Attach Pad!
    const qrBackGeo = applyPlanarUVs(new THREE.PlaneGeometry(21.4, 17.4), 21.4, 17.4, 'xy');
    const qrBack = new THREE.Mesh(qrBackGeo, mats.ultra.evfOledBackplaneQr);
    qrBack.position.z = 1.41;
    qrBack.userData.noEdges = true;
    oledGroup.add(qrBack);

    // Front (-Z) Monocrystalline CMOS Silicon Backplane Substrate (4P-2C pixel compensation + 240fps scan drivers!)
    const siFrontGeo = applyPlanarUVs(
      createChamferedBoxGeo(19.0, 14.8, 0.92, 0.35, 0.06, 'z'),
      19.0,
      14.8,
      'xy-back'
    );
    const siBackplane = new THREE.Mesh(siFrontGeo, mats.ultra.evfOledSiliconFront);
    siBackplane.position.z = -0.22;
    oledGroup.add(siBackplane);

    // Hermetic Gold-Plated Kovar Perimeter Seal Ring & Wire-Bond Frame surrounding the 0.64" OLED active area
    const sealRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(17.8, 13.8, 0.65, 14.3, 10.7, 0.3), 0.36, 0.05, 0.05, 1, 16),
      mats.goldPlating
    );
    sealRing.position.z = -0.68;
    oledGroup.add(sealRing);

    // Matte-black micro-bevel light-seal surround directly framing active emissive screen
    const screenFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.5, 11.0, 0.35, 13.82, 10.42, 0.2), 0.18, 0.02, 0.02, 1, 12),
      mats.velvetFlockTrap
    );
    screenFrame.position.z = -0.78;
    oledGroup.add(screenFrame);

    // Active 0.64-inch (13.8 × 10.4 mm) 9.44M-Dot Quad-XGA Tandem Micro-OLED Emissive Display
    // Faces -Z (directly toward EVF lens train & photographer's eye!)
    oledScreenMesh = new THREE.Mesh(markHiRes(new THREE.PlaneGeometry(13.8, 10.4)), mats.evfOledActive);
    oledScreenMesh.position.z = -0.82;
    oledScreenMesh.rotation.y = Math.PI;
    oledScreenMesh.userData.noEdges = true;
    oledGroup.add(oledScreenMesh);

    // Left & right precision Kovar optical registration mounting ears with circular & slotted datum holes!
    for (const sx of [-1, 1]) {
      const earShape = createRoundedRectShape(3.8, 6.6, 1.3);
      addCircleHoles(earShape, [[sx * 0.55, 0, 0.88]]);
      const ear = new THREE.Mesh(extrudeHiRes(earShape, 1.25, 0.1, 0.1, 2, 16), mats.kovarSeal);
      ear.position.set(sx * 12.7, 0, 0.55);
      oledGroup.add(ear);

      // Gold plating ground pad ring around datum hole
      const gPad = new THREE.Mesh(hiResTorus(1.15, 0.2, 6, 18), mats.goldPlating);
      gPad.position.set(sx * 13.25, 0, -0.09);
      gPad.userData.noEdges = true;
      oledGroup.add(gPad);
    }

    // Bottom 60-pin FPC solder-pad bar emerging from carrier lower edge
    const fpcBar = new THREE.Mesh(new THREE.BoxGeometry(12.2, 1.2, 0.52), mats.goldPlating);
    fpcBar.position.set(0, -9.6, 0.72);
    fpcBar.userData.noEdges = true;
    oledGroup.add(fpcBar);
  }
  parts.push(
    finalizeEvfPart(
      'evf-oled-panel',
      14,
      '#2563eb',
      oledGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 3.6),
      new THREE.Vector3(0, 0, 44),
      new THREE.Vector3(0, 34, 36),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E15: Micro-OLED 3-Point Micron Optical Tilt & Centering Calibration Chassis
  // =========================================================================
  const oledAlignGroup = new THREE.Group();
  {
    // Low-CTE Kovar skeletonized kinematic leveling frame with chamfered window & perimeter flange
    const kovarFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(25.4, 20.4, 2.3, 17.8, 13.8, 1.2), 1.25, 0.12, 0.12, 2, 22),
      mats.kovarSeal
    );
    oledAlignGroup.add(kovarFrame);

    // Raised perimeter stiffening wall along top & bottom edges
    for (const sy of [-9.4, 9.4]) {
      const stiff = new THREE.Mesh(
        createChamferedBoxGeo(16.0, 1.1, 0.75, 0.25, 0.08, 'z'),
        mats.kovarSeal
      );
      stiff.position.set(0, sy, 0.78);
      oledAlignGroup.add(stiff);
    }

    // 3 triangular kinematic leveling stations (Z-height, pitch & roll independent micron tuning!)
    const triPts: Array<[number, number]> = [
      [0, 8.6],
      [-10.4, -7.8],
      [10.4, -7.8],
    ];
    for (const [tx, ty] of triPts) {
      // Hexagonal threaded C3604 brass leveling collar boss
      const collar = new THREE.Mesh(
        hiResCyl(1.85, 1.85, 1.85, 6).rotateX(Math.PI / 2),
        mats.brassGear
      );
      collar.position.set(tx, ty, 0.22);
      oledAlignGroup.add(collar);

      // Ultra-fine-pitch M1.4×P0.20 slotted brass calibration screw with helical threads
      const calScrew = buildPhillipsScrew(
        1.12,
        0.52,
        0.62,
        2.5,
        mats.brassGear,
        mats.matteBlackAnodized,
        mats.beCuSpring
      );
      calScrew.rotation.x = -Math.PI / 2;
      calScrew.position.set(tx, ty, 1.05);
      oledAlignGroup.add(calScrew);

      // Conical stainless V-cup seat + mirror-lapped white alumina ceramic spherical pivot ball
      const vCup = new THREE.Mesh(
        hiResCyl(1.15, 0.78, 0.55, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      vCup.position.set(tx, ty, -0.55);
      const ball = new THREE.Mesh(hiResSphere(0.68, 14, 10), mats.ceramicAlumina);
      ball.position.set(tx, ty, -0.92);
      ball.userData.noEdges = true;
      oledAlignGroup.add(vCup, ball);

      // Translucent amber UV-cure optical-lock adhesive fillet bead sealing final factory calibration!
      const uvBead = new THREE.Mesh(hiResSphere(0.55, 10, 8), mats.opticalCementClear);
      uvBead.position.set(tx + (tx === 0 ? 1.45 : Math.sign(tx) * -1.45), ty, 0.92);
      uvBead.userData.noEdges = true;
      oledAlignGroup.add(uvBead);

      // Curved tempered SUS301 spring-steel preload leaf clip + stainless mounting rivet
      const clipAng = Math.atan2(-ty, -tx);
      const clip = new THREE.Mesh(
        buildFlatRibbonExtrude(
          [
            [-1.7, 0.0],
            [0.0, 0.42],
            [1.7, -0.05],
          ],
          0.26,
          1.45,
          'xz'
        ),
        mats.mountSpringSteel
      );
      clip.position.set(tx * 0.82, ty * 0.82, -0.82);
      clip.rotation.z = clipAng;
      oledAlignGroup.add(clip);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-oled-alignment',
      15,
      '#b45309',
      oledAlignGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 5.2),
      new THREE.Vector3(28, 0, 50),
      new THREE.Vector3(26, 34, 41),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E16: 240Hz MIPI-DSI Display Driver / TCON PCB & Shielded Dual-Stream FPC
  // =========================================================================
  const tconGroup = new THREE.Group();
  {
    // 8-layer emerald HDI TCON PCB mapped with bespoke MIPI-DSI meander differential traces & silkscreen!
    const pcbGeo = applyPlanarUVs(
      extrudeHiRes(createRoundedRectShape(24.8, 19.4, 1.8), 1.12, 0.09, 0.09, 2, 20),
      24.8,
      19.4,
      'xy'
    );
    const pcb = new THREE.Mesh(pcbGeo, mats.ultra.evfTconPcb);
    tconGroup.add(pcb);

    // Main 240Hz VESA DSC 1.2a Timing Controller QFN-64 ASIC with laser-marked top & silver leads!
    const tconIc = buildChipPackage({
      w: 7.6,
      d: 7.6,
      h: 0.98,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      topAccentMat: mats.ultra.icEpoxyLaser,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    tconIc.position.set(-2.2, 1.2, 1.04);
    tconGroup.add(tconIc);

    // OLED Asymmetric Dual-Rail PMIC (ELVDD +7.5V / ELVSS -5.5V) QFN-32 IC
    const pmic = buildChipPackage({
      w: 4.5,
      d: 4.5,
      h: 0.88,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      topAccentMat: mats.ultra.icEpoxyLaser,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    pmic.position.set(6.2, 3.0, 0.98);
    tconGroup.add(pmic);

    // 2x Molded metal-composite shielded SMD boost/inverting power inductors (ELVDD / ELVSS)
    for (const [ix, iy] of [
      [5.0, -3.1],
      [8.3, -3.1],
    ]) {
      const ind = buildShieldedInductor(
        2.35,
        1.12,
        mats.ferriteInductor,
        mats.silverElectrode,
        mats.stainlessMachined,
        'z'
      );
      ind.position.set(ix, iy, 1.12);
      tconGroup.add(ind);
    }

    // 4x Molded yellow tantalum filter capacitors with anode (+) polarity bars & silver J-leads!
    for (const [cx, cy] of [
      [-8.6, 4.6],
      [-8.6, 1.6],
      [-8.6, -1.6],
      [-8.6, -4.6],
    ]) {
      const cap = buildTantalumCap(
        2.1,
        1.25,
        0.92,
        mats.tantalumCapYellow,
        mats.copperHeatSpreader,
        mats.silverElectrode,
        'z'
      );
      cap.position.set(cx, cy, 1.0);
      tconGroup.add(cap);
    }

    // 8x Miniature 0402 ceramic MLCC power decoupling capacitors flanking TCON & PMIC
    for (const [mx, my] of [
      [-2.2, 6.2],
      [0.0, 6.2],
      [2.2, 6.2],
      [6.2, 6.2],
      [2.8, 1.6],
      [2.8, -0.4],
      [-5.6, -5.8],
      [1.4, -5.6],
    ]) {
      const mlcc = buildSmdPassive(1.05, 0.55, 0.44, mats.smdCeramic, mats.silverElectrode, 'z');
      mlcc.position.set(mx, my, 0.78);
      tconGroup.add(mlcc);
    }

    // 27.000 MHz Metal-Lid SMD Quartz Crystal Oscillator with 4 chamfered solder pads
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(2.9, 2.1, 0.42, 0.25, 0.05, 'z'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(-2.4, -5.7, 0.76);
    const xtalLid = new THREE.Mesh(
      createChamferedBoxGeo(2.55, 1.75, 0.34, 0.2, 0.05, 'z'),
      mats.mountStainlessFlange
    );
    xtalLid.position.set(-2.4, -5.7, 1.05);
    tconGroup.add(xtalBase, xtalLid);

    // 60-Pin Locking Flip-Actuator Ivory-and-Black ZIF FPC Connector (CN901)
    const zifBody = new THREE.Mesh(
      createChamferedBoxGeo(11.8, 2.5, 1.1, 0.25, 0.08, 'z'),
      mats.zifIvoryPlastic
    );
    zifBody.position.set(0, -7.8, 1.08);
    const zifBail = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.75, 0.35), mats.icEpoxy);
    zifBail.position.set(0, -7.2, 1.66);
    tconGroup.add(zifBody, zifBail);
    for (let i = -8; i <= 8; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.72, 0.25), mats.goldPlating);
      pin.position.set(i * 0.62, -6.5, 0.68);
      pin.userData.noEdges = true;
      tconGroup.add(pin);
    }

    // Descending amber polyimide dual-stream FPC ribbon + silver-hatched EMI shield overlay + gold fingers!
    const fpcDropGeo = applyPlanarUVs(new THREE.BoxGeometry(9.8, 12.8, 0.26), 9.8, 12.8, 'xy');
    const fpcDrop = new THREE.Mesh(fpcDropGeo, mats.ultra.evfOemFlexRibbon);
    fpcDrop.position.set(0, -14.3, 0.55);
    tconGroup.add(fpcDrop);

    const fpcEmiGeo = applyPlanarUVs(new THREE.BoxGeometry(8.8, 9.2, 0.32), 8.8, 9.2, 'xy');
    const fpcEmiOverlay = new THREE.Mesh(fpcEmiGeo, mats.ultra.evfMipiShieldMesh);
    fpcEmiOverlay.position.set(0, -13.6, 0.58);
    tconGroup.add(fpcEmiOverlay);

    // Distal SUS stiffener + individual gold ZIF contact fingers
    const stiffBack = new THREE.Mesh(new THREE.BoxGeometry(9.8, 2.2, 0.24), mats.stainlessMachined);
    stiffBack.position.set(0, -19.8, 0.42);
    const goldFingers = new THREE.Mesh(new THREE.BoxGeometry(9.4, 1.8, 0.32), mats.goldPlating);
    goldFingers.position.set(0, -20.0, 0.58);
    tconGroup.add(stiffBack, goldFingers);
  }
  parts.push(
    finalizeEvfPart(
      'evf-tcon-pcb',
      16,
      '#059669',
      tconGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 6.8),
      new THREE.Vector3(0, 0, 58),
      new THREE.Vector3(0, 34, 46),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E17: Micro-OLED Rear Copper/Aluminum Thermal Sink & High-k Silicone TIM
  // =========================================================================
  const heatsinkGroup = new THREE.Group();
  {
    // High-k 8.0 W/m·K sky-blue silicone TIM thermal interface pad mapped with micro-embossed texture
    const timGeo = applyPlanarUVs(
      createChamferedBoxGeo(18.0, 13.6, 0.82, 0.8, 0.08, 'z'),
      18.0,
      13.6,
      'xy-back'
    );
    const tim = new THREE.Mesh(timGeo, mats.ultra.evfVfRadiationSheet);
    tim.position.z = -1.12;
    heatsinkGroup.add(tim);

    // Oxygen-free C1020 Pure Copper Base Heat Spreader Plate with brushed copper texture!
    const cuBaseGeo = applyPlanarUVs(
      extrudeHiRes(createRoundedRectShape(25.4, 19.8, 2.0), 1.15, 0.12, 0.12, 2, 22),
      25.4,
      19.8,
      'xy'
    );
    const cuBase = new THREE.Mesh(cuBaseGeo, mats.ultra.cfeCopperThermal);
    cuBase.position.z = -0.15;
    heatsinkGroup.add(cuBase);

    // Built-in precision NTC temperature-compensation thermistor bead + twin micro-leads potted in copper shoulder
    const ntcBead = new THREE.Mesh(hiResSphere(0.72, 12, 10), mats.icEpoxy);
    ntcBead.position.set(9.8, -7.2, -0.68);
    ntcBead.userData.noEdges = true;
    const ntcLead = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 0.18), mats.polyimideFpc);
    ntcLead.position.set(11.2, -7.2, -0.68);
    ntcLead.userData.noEdges = true;
    heatsinkGroup.add(ntcBead, ntcLead);

    // CNC Black-Anodized Extruded Aluminum Finned Backing Plate
    const finBack = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(24.0, 18.4, 1.6), 0.72, 0.1, 0.1, 2, 20),
      mats.matteBlackAnodized
    );
    finBack.position.z = 0.74;
    heatsinkGroup.add(finBack);

    // 9 tapered chamfered CNC cooling fins with central horizontal cross-cut airflow channel!
    for (let i = -4; i <= 4; i++) {
      for (const fy of [-4.4, 4.4]) {
        const fin = new THREE.Mesh(
          createChamferedBoxGeo(1.12, 7.6, 2.35, 0.18, 0.12, 'z'),
          mats.matteBlackAnodized
        );
        fin.position.set(i * 2.55, fy, 2.02);
        heatsinkGroup.add(fin);
      }
    }

    // Left & right C1020 copper thermal-bridge mounting ears + Phillips stainless screws & spring washers
    for (const sx of [-1, 1]) {
      const earShape = createRoundedRectShape(4.6, 7.8, 1.5);
      addCircleHoles(earShape, [[sx * 0.25, 0, 1.0]]);
      const ear = new THREE.Mesh(
        applyPlanarUVs(extrudeHiRes(earShape, 1.15, 0.1, 0.1, 2, 16), 4.6, 7.8, 'xy'),
        mats.ultra.cfeCopperThermal
      );
      ear.position.set(sx * 14.3, 0, -0.15);
      heatsinkGroup.add(ear);

      const washer = new THREE.Mesh(
        hiResTorus(1.38, 0.18, 8, 20),
        mats.stainlessMachined
      );
      washer.position.set(sx * 14.5, 0, 0.52);
      washer.userData.noEdges = true;
      heatsinkGroup.add(washer);

      const scr = buildPhillipsScrew(
        1.05,
        0.52,
        0.55,
        2.3,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.rotation.x = -Math.PI / 2;
      scr.position.set(sx * 14.5, 0, 0.65);
      heatsinkGroup.add(scr);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-thermal-sink',
      17,
      '#c25e28',
      heatsinkGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 10.2),
      new THREE.Vector3(0, 0, 72),
      new THREE.Vector3(0, 34, 58),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E18: Weather-Sealed AZ91D Magnesium-Aluminum EVF Optical Barrel & Baffles
  //      (Authentic architectural -X CAD cutaway window revealing internal optics!)
  // =========================================================================
  const housingGroup = new THREE.Group();
  {
    const barrelLen = 44.6; // local z = -22.3 .. +22.3 -> world z = -34.8 .. +9.8

    // Sculpted AZ91D Thixomolded Pentaprism Upper Arch Roof (C-section CAD cutaway)
    const roofProfile = new THREE.Shape();
    roofProfile.moveTo(-8.5, 13.0);
    roofProfile.lineTo(-4.0, 15.6);
    roofProfile.lineTo(4.0, 15.6);
    roofProfile.lineTo(13.8, 12.2);
    roofProfile.lineTo(15.2, 9.6);
    roofProfile.lineTo(15.2, -10.8);
    roofProfile.lineTo(12.2, -12.8);
    roofProfile.lineTo(-10.5, -12.8);
    roofProfile.lineTo(-12.2, -10.8);
    roofProfile.lineTo(-12.2, -8.8);
    roofProfile.lineTo(-9.4, -10.6);
    roofProfile.lineTo(11.4, -10.6);
    roofProfile.lineTo(13.0, -9.2);
    roofProfile.lineTo(13.0, 8.8);
    roofProfile.lineTo(11.6, 10.6);
    roofProfile.lineTo(3.4, 13.4);
    roofProfile.lineTo(-3.4, 13.4);
    roofProfile.lineTo(-8.5, 10.8);
    roofProfile.closePath();

    const shellGeo = applyBoxUVs(extrudeHiRes(roofProfile, barrelLen, 0.30, 0.30, 2, 20), 22);
    const shell = new THREE.Mesh(shellGeo, mats.ultra.micTopDeckMg);
    housingGroup.add(shell);

    // Exterior cast magnesium stiffening ribs along +X flank (authentic thixomolded camera pentaprism detail!)
    for (const rz of [-12.0, -2.5, 7.0, 15.5]) {
      const extRib = new THREE.Mesh(
        createChamferedBoxGeo(0.75, 17.5, 1.35, 0.25, 0.1, 'z'),
        mats.evfHousingMg
      );
      extRib.position.set(15.45, -0.5, rz);
      housingGroup.add(extRib);
    }

    // Cut-open rear optical IR-gaze exit portal on bottom floor (world z = -22.2) with velvet collar + 4 screws
    const irPortRing = new THREE.Mesh(
      hiResTorus(6.6, 0.58, 12, 36).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    irPortRing.position.set(0, -11.9, -9.7);
    const irVelvet = new THREE.Mesh(
      hiResCyl(5.95, 5.95, 1.4, 32, true),
      mats.velvetFlockTrap
    );
    irVelvet.position.set(0, -11.7, -9.7);
    housingGroup.add(irPortRing, irVelvet);
    for (let k = 0; k < 4; k++) {
      const a = (k * Math.PI) / 2 + Math.PI / 4;
      const pScr = createPrecisionScrew(0.45, 0.22, 0.8, mats.stainlessMachined);
      pScr.rotation.x = Math.PI / 2;
      pScr.position.set(Math.cos(a) * 6.6, -12.45, -9.7 + Math.sin(a) * 6.6);
      housingGroup.add(pScr);
    }

    // Top-deck MI Hot-Shoe Structural Mounting Deck + 4 extruded stainless threaded standoff bosses
    const shoeDeck = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(19.0, 19.8, 1.6), 1.45, 0.16, 0.16, 2, 18).rotateX(Math.PI / 2),
      mats.matteBlackAnodized
    );
    shoeDeck.position.set(0, 16.0, 4.2);
    housingGroup.add(shoeDeck);

    // Front recessed MI-shoe FPC wiring pass-through slot on roof deck
    const shoeSlot = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.5, 3.2), mats.velvetFlockTrap);
    shoeSlot.position.set(0, 16.65, 11.4);
    shoeSlot.userData.noEdges = true;
    housingGroup.add(shoeSlot);

    for (const sx of [-7.6, 7.6]) {
      const shoeRail = new THREE.Mesh(
        createChamferedBoxGeo(2.2, 1.25, 16.6, 0.25, 0.08, 'y'),
        mats.mountStainlessFlange
      );
      shoeRail.position.set(sx, 17.05, 4.2);
      housingGroup.add(shoeRail);
    }
    for (const [bx, bz] of [
      [-6.8, -2.0],
      [6.8, -2.0],
      [-6.8, 9.4],
      [6.8, 9.4],
    ]) {
      const boss = new THREE.Mesh(hiResCyl(1.35, 1.5, 0.9, 16), mats.stainlessMachined);
      boss.position.set(bx, 16.9, bz);
      boss.userData.noEdges = true;
      housingGroup.add(boss);
    }

    // 7 True Angled Sawtooth Knife-Edge Matte-Black Internal Anti-Reflection Baffle Fins!
    const topKnifeShape = new THREE.Shape();
    topKnifeShape.moveTo(0, 0);
    topKnifeShape.lineTo(0.85, 0);
    topKnifeShape.lineTo(0.18, -1.55);
    topKnifeShape.lineTo(-0.15, -1.55);
    topKnifeShape.closePath();
    const topKnifeGeo = extrudeHiRes(topKnifeShape, 16.8, 0, 0, 0, 8);
    topKnifeGeo.rotateY(Math.PI / 2);

    const sideKnifeShape = new THREE.Shape();
    sideKnifeShape.moveTo(0, 0);
    sideKnifeShape.lineTo(0.85, 0);
    sideKnifeShape.lineTo(0.18, -1.55);
    sideKnifeShape.lineTo(-0.15, -1.55);
    sideKnifeShape.closePath();
    const sideKnifeGeo = extrudeHiRes(sideKnifeShape, 18.2, 0, 0, 0, 8);
    sideKnifeGeo.rotateX(Math.PI / 2);
    sideKnifeGeo.rotateZ(-Math.PI / 2);

    for (let i = 0; i < 7; i++) {
      const bz = -17.0 + i * 5.2;
      const topRib = new THREE.Mesh(topKnifeGeo, mats.velvetFlockTrap);
      topRib.position.set(2.2, 12.1, bz);
      housingGroup.add(topRib);

      const sideRib = new THREE.Mesh(sideKnifeGeo, mats.velvetFlockTrap);
      sideRib.position.set(12.8, -0.4, bz);
      housingGroup.add(sideRib);
    }

    // Front (+Z) & Rear (-Z) Weather-Seal EPDM Flange Gaskets & Machined Sealing Collars
    const collarShape = createFrameShape(30.6, 24.6, 4.8, 25.0, 19.2, 3.6);
    const rearCollar = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(collarShape, 1.9, 0.2, 0.2, 2, 28), 18),
      mats.evfHousingMg
    );
    rearCollar.position.z = -barrelLen * 0.5 + 0.9;
    housingGroup.add(rearCollar);

    const rearSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(31.4, 25.4, 5.1, 29.8, 23.8, 4.4), 0.78, 0.1, 0.1, 2, 28),
      mats.epdmGasket
    );
    rearSeal.position.z = -barrelLen * 0.5 - 0.15;
    housingGroup.add(rearSeal);

    const frontCollar = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(createFrameShape(28.6, 23.0, 3.6, 23.6, 18.2, 2.2), 1.9, 0.18, 0.18, 2, 24), 18),
      mats.evfHousingMg
    );
    frontCollar.position.z = barrelLen * 0.5 - 0.9;
    housingGroup.add(frontCollar);

    const frontSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(29.2, 23.6, 3.9, 27.8, 22.2, 3.4), 0.65, 0.08, 0.08, 1, 24),
      mats.epdmGasket
    );
    frontSeal.position.z = barrelLen * 0.5 + 0.1;
    housingGroup.add(frontSeal);

    // 4 Lower Cast Magnesium Chassis Mounting Bosses + Triangular Gussets + Flanged Phillips Bolts
    for (const [mx, mz] of [
      [-13.6, -15.5],
      [16.4, -15.5],
      [-13.6, 14.5],
      [16.4, 14.5],
    ]) {
      const boss = new THREE.Mesh(hiResCyl(2.15, 2.55, 2.9, 22), mats.evfHousingMg);
      boss.position.set(mx, -11.4, mz);
      const gusset = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 2.4, 1.4, 0.25, 0.08, 'z'),
        mats.evfHousingMg
      );
      gusset.position.set(mx - Math.sign(mx) * 1.6, -10.8, mz);
      housingGroup.add(boss, gusset);

      const bolt = buildPhillipsScrew(
        1.1,
        0.52,
        0.56,
        2.0,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      bolt.rotation.x = Math.PI;
      bolt.position.set(mx, -9.85, mz);
      housingGroup.add(bolt);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-magnesium-housing',
      18,
      '#4b5563',
      housingGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -12.5),
      new THREE.Vector3(0, 29, 4),
      new THREE.Vector3(0, 62, 6),
      cp,
      0.26
    )
  );

  // =========================================================================
  // E19: Built-In Mechanical Long-Exposure Eyepiece Blind Curtain
  // =========================================================================
  const eyeShutterGroup = new THREE.Group();
  {
    // Stepped matte-black anodized shutter chassis frame with precision light-trap inner step
    const frame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(26.8, 20.8, 3.2, 21.8, 16.4, 2.4), 0.96, 0.1, 0.1, 2, 24),
      mats.matteBlackAnodized
    );
    eyeShutterGroup.add(frame);

    // Upper & lower recessed stainless blade guide tracks
    for (const sy of [-8.8, 8.8]) {
      const track = new THREE.Mesh(new THREE.BoxGeometry(20.6, 0.65, 0.36), mats.stainlessMachined);
      track.position.set(0, sy, 0.52);
      track.userData.noEdges = true;
      eyeShutterGroup.add(track);
    }

    // Partially open twin overlapping ultra-thin woven carbon-fiber shutter blades with pivot pins & drive slots
    for (const sx of [-1, 1]) {
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(5.6, 16.2, 0.24, 0.25, 0.03, 'z'),
        mats.carbonFiberBlade
      );
      blade.position.set(sx * 9.0, 0, sx * 0.15);
      eyeShutterGroup.add(blade);

      // Interlocking light-tight overlap lip along inner blade meeting edge
      const lip = new THREE.Mesh(new THREE.BoxGeometry(0.65, 16.0, 0.14), mats.velvetFlockTrap);
      lip.position.set(sx * 6.45, 0, sx * 0.28);
      lip.userData.noEdges = true;
      eyeShutterGroup.add(lip);

      // Miniature brass guide-pin rollers tracking in upper & lower rails
      for (const py of [-7.2, 7.2]) {
        const pin = new THREE.Mesh(hiResCyl(0.45, 0.45, 0.65, 12).rotateX(Math.PI / 2), mats.brassGear);
        pin.position.set(sx * 9.6, py, 0.25);
        pin.userData.noEdges = true;
        eyeShutterGroup.add(pin);
      }
    }

    // Left-flank ergonomic knurled mechanical slide lever + stainless pivot barrel + red/white position pip
    const leverBase = new THREE.Mesh(
      hiResCyl(1.85, 1.85, 1.75, 22).rotateZ(Math.PI / 2),
      mats.mountStainlessFlange
    );
    leverBase.position.set(-14.2, 2.8, 0);
    const leverArm = new THREE.Mesh(
      createChamferedBoxGeo(2.3, 5.8, 1.55, 0.45, 0.12, 'z'),
      mats.evfHousingMg
    );
    leverArm.position.set(-15.6, 4.4, 0);
    eyeShutterGroup.add(leverBase, leverArm);

    // 5 crisp tactile horizontal thumb-grip ridges on lever knob + red closed-state indicator dot
    for (let r = -2; r <= 2; r++) {
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 1.35), mats.matteBlackAnodized);
      grip.position.set(-16.82, 4.4 + r * 0.85, 0);
      grip.userData.noEdges = true;
      eyeShutterGroup.add(grip);
    }
    const stateDot = new THREE.Mesh(hiResSphere(0.38, 10, 8), mats.mountRedIndexDot);
    stateDot.position.set(-15.6, 7.35, -0.45);
    stateDot.userData.noEdges = true;
    eyeShutterGroup.add(stateDot);
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyepiece-shutter',
      19,
      '#1e293b',
      eyeShutterGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -30.0),
      new THREE.Vector3(-26, 8, -38),
      new THREE.Vector3(-26, 42, -22),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E20: Eye-Control AF 850nm Narrow-Bandpass Filter & Aspheric IR Relay Barrel
  // =========================================================================
  const irOpticsGroup = new THREE.Group();
  {
    // CNC stepped matte-black optical lens barrel (Lathe profile with mounting flange & grip grooves)
    const barrelPts: THREE.Vector2[] = [
      new THREE.Vector2(4.2, -1.9),
      new THREE.Vector2(5.9, -1.9),
      new THREE.Vector2(5.9, -1.2),
      new THREE.Vector2(5.55, -1.1),
      new THREE.Vector2(5.55, 0.1),
      new THREE.Vector2(5.25, 0.25),
      new THREE.Vector2(5.25, 1.85),
      new THREE.Vector2(4.35, 1.85),
      new THREE.Vector2(4.35, -1.9),
    ];
    const barrelGeo = markHiRes(new THREE.LatheGeometry(barrelPts, 36));
    barrelGeo.computeVertexNormals();
    const barrelOuter = new THREE.Mesh(barrelGeo, mats.matteBlackAnodized);
    irOpticsGroup.add(barrelOuter);

    // Top threaded stainless retaining bezel with 4 precision spanner-wrench slots
    const bezel = createSpannerRetainerRing(
      4.05,
      5.1,
      0.55,
      mats.mountStainlessFlange,
      mats.matteBlackAnodized,
      4,
      1
    );
    bezel.rotation.x = -Math.PI / 2;
    bezel.position.y = 1.98;
    irOpticsGroup.add(bezel);

    // 850nm ±18nm Ruby Narrow-Bandpass Dielectric Filter (OD4+ visible cut!) + brass seating ring
    const bpfSeat = new THREE.Mesh(hiResTorus(4.18, 0.22, 8, 32).rotateX(Math.PI / 2), mats.brassGear);
    bpfSeat.position.y = 0.28;
    bpfSeat.userData.noEdges = true;
    const bpf = new THREE.Mesh(hiResCyl(4.12, 4.12, 0.48, 32), mats.evfDichroicMirror);
    bpf.position.y = 0.56;
    const bpfRim = new THREE.Mesh(hiResTorus(4.12, 0.14, 8, 32).rotateX(Math.PI / 2), mats.evfGlassEdgeRim);
    bpfRim.position.y = 0.56;
    bpfRim.userData.noEdges = true;
    irOpticsGroup.add(bpfSeat, bpf, bpfRim);

    // Top Molded Aspheric IR Relay Lens dome capturing 90°-reflected eyeball image
    const relayLens = new THREE.Mesh(
      markHiRes(createOpticalLensGeometry(4.2, 0.9, 1.18, 0.45, -0.22, 0, 22, 40).rotateX(-Math.PI / 2)),
      mats.evfLensAspheric
    );
    relayLens.position.y = 1.82;
    irOpticsGroup.add(relayLens);

    // Internal sharp knife-edge velvet aperture stop diaphragm
    const irStop = buildConicalBaffleRing(3.15, 4.3, 0.65, mats.velvetFlockTrap);
    irStop.rotation.x = Math.PI / 2;
    irStop.position.y = -0.82;
    irOpticsGroup.add(irStop);
  }
  parts.push(
    finalizeEvfPart(
      'evf-gaze-ir-optics',
      20,
      '#ec4899',
      irOpticsGroup,
      new THREE.Vector3(0, 26.5, -22.2),
      new THREE.Vector3(18, -16, -16),
      new THREE.Vector3(18, 16, -6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E21: Push-Pull Anti-Accidental Diopter Dial Lock Clutch & Ball Detents
  // =========================================================================
  const diopterLockGroup = new THREE.Group();
  const diopterLockClutchGroup = new THREE.Group();
  {
    // 24-tooth CNC hardened stainless star ratchet lock clutch wheel + internal splined drive hub!
    const ratchet = new THREE.Mesh(
      markHiRes(createSpurGearGeometry(24, 3.25, 1.28, 1.15).rotateY(Math.PI / 2)),
      mats.mountStainlessFlange
    );
    diopterLockClutchGroup.add(ratchet);

    const splineHub = new THREE.Mesh(
      hiResCyl(1.55, 1.55, 2.2, 12).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    splineHub.position.x = -0.5;
    diopterLockClutchGroup.add(splineHub);

    // Axial CuBe2 push-pull pop-out return spring + flat brass retaining washer
    const popSpring = new THREE.Mesh(
      markHiRes(createHelicalSpringGeometry(1.78, 3.4, 6, 0.23).rotateY(Math.PI / 2)),
      mats.beCuSpring
    );
    popSpring.position.x = -1.65;
    popSpring.userData.noEdges = true;
    const sprWasher = new THREE.Mesh(
      hiResCyl(2.25, 2.25, 0.28, 22).rotateZ(Math.PI / 2),
      mats.brassGear
    );
    sprWasher.position.x = -3.35;
    sprWasher.userData.noEdges = true;
    diopterLockClutchGroup.add(popSpring, sprWasher);
    diopterLockGroup.add(diopterLockClutchGroup);

    // Stationary machined C3604 brass ball-detent pocket collar with radial spring-plunger housings!
    const detentCollar = createSteppedLensCell(2.55, 3.85, 1.35, mats.brassGear);
    detentCollar.rotation.y = Math.PI / 2;
    detentCollar.position.x = 1.05;
    diopterLockGroup.add(detentCollar);

    // Twin opposed hardened steel click balls + miniature CuBe2 backup springs + threaded hex preload plugs
    for (const sy of [-1, 1]) {
      const clickBall = new THREE.Mesh(hiResSphere(0.58, 14, 10), mats.mountStainlessFlange);
      clickBall.position.set(0.52, sy * 3.12, 0);
      clickBall.userData.noEdges = true;

      const plungerSpr = new THREE.Mesh(
        markHiRes(createHelicalSpringGeometry(0.42, 1.3, 4, 0.1).rotateX(Math.PI / 2)),
        mats.beCuSpring
      );
      plungerSpr.position.set(1.05, sy * 3.72, 0);
      plungerSpr.userData.noEdges = true;

      const grubPlug = new THREE.Mesh(hiResCyl(0.55, 0.55, 0.45, 6), mats.titaniumRivet);
      grubPlug.position.set(1.05, sy * 4.42, 0);
      grubPlug.userData.noEdges = true;

      diopterLockGroup.add(clickBall, plungerSpr, grubPlug);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-lock-clutch',
      21,
      '#f59e0b',
      diopterLockGroup,
      new THREE.Vector3(19.6, EVF_OPTICAL_Y, -15.6),
      new THREE.Vector3(34, -24, 12),
      new THREE.Vector3(42, 24, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E22: Linear Polarizer + λ/4 Quarter-Wave Anti-Glare Stack
  // =========================================================================
  const polQwpGroup = new THREE.Group();
  {
    // Stepped CNC matte-black anodized optical retaining ring with 4 spanner slots
    const polRing = createSpannerRetainerRing(
      8.8,
      10.65,
      1.35,
      mats.matteBlackAnodized,
      mats.evfHousingMg,
      4,
      -1
    );
    polQwpGroup.add(polRing);

    // Linear Polarizer film facing -Z (eyepiece side) with subtle polished edge bevel
    const linPol = new THREE.Mesh(
      hiResCyl(8.92, 8.92, 0.28, 44).rotateX(Math.PI / 2),
      mats.lcdPolarizerFilm
    );
    linPol.position.z = -0.32;
    linPol.userData.edgeOpacity = 0.34;
    polQwpGroup.add(linPol);

    // Ultra-thin blackened-brass inter-film air/adhesive spacer ring between Polarizer and λ/4 QWP
    const interRing = new THREE.Mesh(hiResTorus(8.75, 0.14, 8, 40), mats.brassGear);
    interRing.userData.noEdges = true;
    polQwpGroup.add(interRing);

    // Wideband Achromatic Zero-Order λ/4 Quarter-Wave Retarder Plate facing +Z (OLED side)
    const qwp = new THREE.Mesh(
      hiResCyl(8.92, 8.92, 0.28, 44).rotateX(Math.PI / 2),
      mats.evfDichroicMirror
    );
    qwp.position.z = 0.32;
    qwp.userData.edgeOpacity = 0.34;
    polQwpGroup.add(qwp);

    // 45° fast-axis gold alignment keyway tab on rim + laser-axis index rib & opposite locating pin
    const tab = new THREE.Mesh(
      createChamferedBoxGeo(1.85, 1.85, 1.2, 0.25, 0.08, 'z'),
      mats.goldPlating
    );
    tab.position.set(7.7, 7.7, 0);
    tab.rotation.z = Math.PI / 4;
    const axisMark = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.24, 1.32), mats.matteBlackAnodized);
    axisMark.position.set(7.7, 7.7, 0);
    axisMark.rotation.z = Math.PI / 4;
    axisMark.userData.noEdges = true;
    const oppKey = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.15), mats.stainlessMachined);
    oppKey.position.set(-7.55, -7.55, 0);
    oppKey.rotation.z = Math.PI / 4;
    polQwpGroup.add(tab, axisMark, oppKey);
  }
  parts.push(
    finalizeEvfPart(
      'evf-polarizer-qwp',
      22,
      '#8b5cf6',
      polQwpGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 0.65),
      new THREE.Vector3(0, 0, 35),
      new THREE.Vector3(0, 34, 30),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E23: Micro-OLED Hexagonal MLA, TFE Encapsulation & RGB CF Cap
  //      (Sony Semiconductor in-pixel hexagonal MLA achieving 2.2× luminance!)
  // =========================================================================
  const mlaCapGroup = new THREE.Group();
  {
    // ALD Thin-Film Encapsulation (TFE: SiNx / Al2O3) hermetic rim seal bezel with corner fiducials
    const tfeBezel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.8, 13.0, 0.65, 14.2, 10.6, 0.3), 0.46, 0.04, 0.04, 1, 16),
      mats.sinteredSilver
    );
    mlaCapGroup.add(tfeBezel);

    // 4-corner gold ALD alignment fiducial squares
    for (const [fx, fy] of [
      [-7.6, 5.6],
      [7.6, 5.6],
      [-7.6, -5.6],
      [7.6, -5.6],
    ]) {
      const fid = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.52), mats.goldPlating);
      fid.position.set(fx, fy, 0);
      fid.userData.noEdges = true;
      mlaCapGroup.add(fid);
    }

    // Upgraded Hexagonal Close-Packed On-Chip Micro-Lens Array (MLA) optical extraction cap!
    const mlaPlateGeo = applyPlanarUVs(
      createChamferedBoxGeo(14.8, 11.2, 0.38, 0.2, 0.04, 'z'),
      14.8,
      11.2,
      'xy-back'
    );
    const mlaPlate = new THREE.Mesh(mlaPlateGeo, mats.evfMlaGlass);
    mlaPlate.position.z = -0.16;
    mlaPlate.userData.edgeOpacity = 0.38;
    mlaCapGroup.add(mlaPlate);

    // Crisp ground-glass perimeter optical edge rim
    const mlaRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.0, 11.4, 0.3, 14.55, 10.95, 0.25), 0.40, 0.02, 0.02, 1, 12),
      mats.evfGlassEdgeRim
    );
    mlaRim.position.z = -0.16;
    mlaCapGroup.add(mlaRim);

    // Distinct stepped On-Chip Color Filter (OCCF) RGB sub-layer rim along +Z underside
    const rgbEdge = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.3, 11.7, 0.4, 14.4, 10.8, 0.3), 0.16, 0, 0, 1, 12),
      mats.evfDichroicMirror
    );
    rgbEdge.position.z = 0.22;
    mlaCapGroup.add(rgbEdge);
  }
  parts.push(
    finalizeEvfPart(
      'evf-oled-mla-stack',
      23,
      '#06b6d4',
      mlaCapGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 2.55),
      new THREE.Vector3(-24, 0, 41),
      new THREE.Vector3(-24, 34, 33),
      cp,
      0.26
    )
  );

  // =========================================================================
  // E24: 240Hz MIPI-DSI TCON RF EMI Shield Can & CuBe2 Ground Clips
  // =========================================================================
  const tconShieldGroup = new THREE.Group();
  {
    // Stamped nickel-silver (Cu-Ni-Zn) RF Faraday shield lid mapped with bespoke brushed/stamped texture!
    const canShape = createFrameShape(24.0, 18.4, 1.7, 10.6, 8.8, 0.9);
    // Micro ventilation & solder-reflow inspection pinholes along flanking walls
    addCircleHoles(canShape, [
      [-8.6, 6.2, 0.6],
      [8.6, 6.2, 0.6],
      [-8.6, -6.2, 0.6],
      [8.6, -6.2, 0.6],
    ]);
    const canTopGeo = applyPlanarUVs(extrudeHiRes(canShape, 0.44, 0.05, 0.05, 1, 18), 24.0, 18.4, 'xy');
    const canTop = new THREE.Mesh(canTopGeo, mats.ultra.evfTconEmiCan);
    canTop.position.z = 0.72;
    tconShieldGroup.add(canTop);

    // Upturned flanged EMI collar lip around central TIM thermal cutout window
    const winCollar = new THREE.Mesh(
      extrudeHiRes(createFrameShape(11.3, 9.5, 1.0, 10.5, 8.7, 0.85), 0.55, 0.04, 0.04, 1, 14),
      mats.emiShieldCan
    );
    winCollar.position.z = 0.88;
    tconShieldGroup.add(winCollar);

    // Stamped perimeter Faraday shield walls dropping cleanly onto TCON PCB GND frame
    const wallShape = createFrameShape(24.0, 18.4, 1.7, 22.5, 16.9, 1.2);
    const walls = new THREE.Mesh(
      extrudeHiRes(wallShape, 1.42, 0.06, 0.06, 1, 18),
      mats.emiShieldCan
    );
    tconShieldGroup.add(walls);

    // 8 realistically curved CuBe2 snap-in EMI grounding spring fingers around outer flange!
    for (const [cx, cy, rz] of [
      [-6.5, 9.25, 0],
      [6.5, 9.25, 0],
      [-6.5, -9.25, Math.PI],
      [6.5, -9.25, Math.PI],
      [-12.05, 4.5, Math.PI / 2],
      [-12.05, -4.5, Math.PI / 2],
      [12.05, 4.5, -Math.PI / 2],
      [12.05, -4.5, -Math.PI / 2],
    ] as Array<[number, number, number]>) {
      const clip = new THREE.Mesh(
        buildFlatRibbonExtrude(
          [
            [-0.55, 0.0],
            [0.0, 0.42],
            [0.55, 0.05],
          ],
          0.22,
          3.2,
          'yz'
        ),
        mats.beCuSpring
      );
      clip.position.set(cx, cy, -0.05);
      clip.rotation.z = rz;
      tconShieldGroup.add(clip);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-tcon-emi-shield',
      24,
      '#94a3b8',
      tconShieldGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 8.2),
      new THREE.Vector3(26, 16, 62),
      new THREE.Vector3(26, 48, 50),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E25: Sealed Anti-Fog Chamber O-Ring Kit, Velvet Baffles & 5x Anchor Screws
  // =========================================================================
  const baffleSealGroup = new THREE.Group();
  {
    // 3 true conical knife-edge inter-lens ultra-black micro-flocked velvet stray-light baffle rings!
    for (const [bz, rIn] of [
      [-6.5, 10.55],
      [0.8, 9.75],
      [7.4, 9.15],
    ] as Array<[number, number]>) {
      const ring = buildConicalBaffleRing(rIn, rIn + 1.65, 1.05, mats.velvetFlockTrap);
      ring.position.z = bz;
      baffleSealGroup.add(ring);

      // Thin outer anodized locating flange ring
      const outerRim = new THREE.Mesh(hiResTorus(rIn + 1.62, 0.16, 8, 40), mats.matteBlackAnodized);
      outerRim.position.z = bz;
      outerRim.userData.noEdges = true;
      baffleSealGroup.add(outerRim);
    }

    // Dual front & rear dry-nitrogen optical-chamber EPDM sealing O-rings (high-res smooth tori!)
    for (const oz of [-18.2, 16.5]) {
      const oRing = new THREE.Mesh(hiResTorus(13.65, 0.58, 12, 48), mats.epdmGasket);
      oRing.position.z = oz;
      oRing.userData.noEdges = true;
      baffleSealGroup.add(oRing);
    }

    // 5 high-tensile stainless EVF chassis anchor screws with helical threads + blue Loctite thread-lock bands!
    for (const [mx, mz] of [
      [-13.6, -15.5],
      [16.4, -15.5],
      [-13.6, 14.5],
      [16.4, 14.5],
      [1.4, 16.2],
    ] as Array<[number, number]>) {
      const bolt = buildPhillipsScrew(
        1.22,
        0.58,
        0.62,
        3.4,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      bolt.rotation.x = Math.PI;
      bolt.position.set(mx, -12.3, mz);
      baffleSealGroup.add(bolt);

      // Captive stainless seating washer under pan head
      const wash = new THREE.Mesh(
        hiResTorus(1.42, 0.18, 8, 18).rotateX(Math.PI / 2),
        mats.mountStainlessFlange
      );
      wash.position.set(mx, -12.45, mz);
      wash.userData.noEdges = true;
      baffleSealGroup.add(wash);

      // Authentic cobalt-blue micro-encapsulated Loctite thread-lock coating band on lower threads!
      const blueLock = new THREE.Mesh(hiResCyl(0.70, 0.68, 1.35, 16), mats.mountThreadLockBlue);
      blueLock.position.set(mx, -14.2, mz);
      blueLock.userData.noEdges = true;
      baffleSealGroup.add(blueLock);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-baffle-seal-kit',
      25,
      '#0f172a',
      baffleSealGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -12.5),
      new THREE.Vector3(-28, 22, -6),
      new THREE.Vector3(-28, 56, 2),
      cp,
      0.26
    )
  );

  // =========================================================================
  // E26: EVF Cavity Under-Barrel FPC Retention Stainless Clamp & Ground Bridge
  // =========================================================================
  const cavityClampGroup = new THREE.Group();
  {
    // Stamped & formed SUS304 retaining bracket with stepped cable bridge arch & embossed stiffening beads
    const plateShape = createRoundedRectShape(24.4, 7.8, 1.5);
    addCircleHoles(plateShape, [
      [-9.8, 0, 0.9],
      [9.8, 0, 0.9],
    ]);
    const plate = new THREE.Mesh(
      extrudeHiRes(plateShape, 0.62, 0.06, 0.06, 2, 16).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    cavityClampGroup.add(plate);

    // Twin stamped longitudinal stiffening ribs along front & rear clamp borders
    for (const sz of [-2.8, 2.8]) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(16.2, 0.45, 0.72, 0.2, 0.06, 'y'),
        mats.stainlessMachined
      );
      rib.position.set(0, -0.36, sz);
      cavityClampGroup.add(rib);
    }

    // Low-rebound PORON urethane compression pad cushioning 240Hz MIPI-DSI & Eye-AF FPC connectors
    const cushion = new THREE.Mesh(
      createChamferedBoxGeo(17.6, 0.72, 5.4, 0.5, 0.08, 'y'),
      mats.butylDamperRubber
    );
    cushion.position.y = 0.64;
    cavityClampGroup.add(cushion);

    // Dual curved arched CuBe2 chassis EMI grounding spring fingers with contact dimples
    for (const sx of [-1, 1]) {
      const gndFinger = new THREE.Mesh(
        buildFlatRibbonExtrude(
          [
            [sx * 11.2, 0.0],
            [sx * 12.6, 0.58],
            [sx * 14.0, 0.15],
          ],
          0.26,
          2.4,
          'xy'
        ),
        mats.beCuSpring
      );
      gndFinger.position.y = 0.24;
      const dimple = new THREE.Mesh(hiResSphere(0.38, 10, 8), mats.goldPlating);
      dimple.position.set(sx * 12.6, 0.85, 0);
      dimple.userData.noEdges = true;
      cavityClampGroup.add(gndFinger, dimple);
    }

    // 2x M1.4 stainless Phillips retention screws
    for (const sx of [-9.8, 9.8]) {
      const scr = buildPhillipsScrew(
        1.0,
        0.42,
        0.52,
        1.8,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.position.set(sx, -0.32, 0);
      cavityClampGroup.add(scr);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-cavity-clamp',
      26,
      '#94a3b8',
      cavityClampGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y - 13.6, 5.5),
      new THREE.Vector3(0, -28, 36),
      new THREE.Vector3(0, 12, 34),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E27: Deep-Eyecup 4-Screw Stainless Slide-Rail Subframe & Positive Lock Catch
  //      (Sony FDA-EP21 / Canon ER-iE high-durability 4-screw slide subframe!)
  // =========================================================================
  const eyecupSubGroup = new THREE.Group();
  {
    const subShape = createFrameShape(32.0, 26.0, 4.6, 25.6, 19.6, 3.4);
    addCircleHoles(subShape, [
      [-13.4, 10.6, 0.82],
      [13.4, 10.6, 0.82],
      [-13.4, -10.6, 0.82],
      [13.4, -10.6, 0.82],
    ]);
    const subFrame = new THREE.Mesh(
      extrudeHiRes(subShape, 1.45, 0.14, 0.14, 2, 24),
      mats.mountStainlessFlange
    );
    eyecupSubGroup.add(subFrame);

    // Left & right true L-profile beveled dovetail deep-eyecup slide rails with upper stops & spring dimples
    for (const sx of [-1, 1]) {
      const railStem = new THREE.Mesh(
        createChamferedBoxGeo(1.65, 19.4, 2.45, 0.25, 0.1, 'z'),
        mats.stainlessMachined
      );
      railStem.position.set(sx * 15.2, 0, -0.95);
      const railLip = new THREE.Mesh(new THREE.BoxGeometry(1.1, 18.8, 0.62), mats.mountStainlessFlange);
      railLip.position.set(sx * 14.3, 0, -1.92);
      const upperStop = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.35, 2.5), mats.stainlessMachined);
      upperStop.position.set(sx * 14.9, 9.8, -0.95);
      eyecupSubGroup.add(railStem, railLip, upperStop);
    }

    // Bottom positive-lock spring release lever tab with tactile grip grooves, pivot pin & CuBe2 coil spring!
    const catchTab = new THREE.Mesh(
      createChamferedBoxGeo(8.6, 2.6, 2.35, 0.45, 0.14, 'z'),
      mats.matteBlackAnodized
    );
    catchTab.position.set(0, -12.6, -1.05);
    eyecupSubGroup.add(catchTab);
    for (let g = -2; g <= 2; g++) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.85, 0.35), mats.evfHousingMg);
      ridge.position.set(g * 1.35, -12.6, -2.28);
      ridge.userData.noEdges = true;
      eyecupSubGroup.add(ridge);
    }
    const lockTooth = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.1, 1.15), mats.stainlessMachined);
    lockTooth.position.set(0, -10.9, -1.35);
    const catchSpr = new THREE.Mesh(
      markHiRes(createHelicalSpringGeometry(0.68, 2.6, 5, 0.15).rotateX(Math.PI / 2)),
      mats.beCuSpring
    );
    catchSpr.position.set(0, -10.8, -0.55);
    catchSpr.userData.noEdges = true;
    eyecupSubGroup.add(lockTooth, catchSpr);

    // 4 perimeter countersunk M1.4 stainless Phillips mounting screws
    for (const [sx, sy] of [
      [-13.4, 10.6],
      [13.4, 10.6],
      [-13.4, -10.6],
      [13.4, -10.6],
    ] as Array<[number, number]>) {
      const scr = buildPhillipsScrew(
        1.02,
        0.4,
        0.52,
        1.7,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.rotation.x = Math.PI / 2;
      scr.position.set(sx, sy, -0.82);
      eyecupSubGroup.add(scr);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyecup-subframe',
      27,
      '#cbd5e1',
      eyecupSubGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -35.8),
      new THREE.Vector3(0, 0, -68),
      new THREE.Vector3(0, 34, -84),
      cp,
      0.26
    )
  );

  // =========================================================================
  // E28: Eye-Control IR Gaze-Sensor Micro-Calibration Shims & 3-Point Studs
  // =========================================================================
  const eyeAfShimGroup = new THREE.Group();
  {
    // Stacked chemical photo-etched calibration shims (0.05mm C2680 brass + 0.02mm & 0.01mm SUS304)
    const brassShimShape = createFrameShape(16.6, 14.6, 2.0, 10.2, 8.2, 1.2);
    addCircleHoles(brassShimShape, [
      [-6.2, -5.2, 1.1],
      [6.2, -5.2, 1.1],
      [0.0, 5.4, 1.1],
    ]);
    const brassGeo = applyPlanarUVs(
      extrudeHiRes(brassShimShape, 0.36, 0.03, 0.03, 1, 18).rotateX(Math.PI / 2),
      16.6,
      14.6,
      'xz'
    );
    const shimPlate = new THREE.Mesh(brassGeo, mats.ultra.evfShimEtchedBrass);

    const steelShimShape = createFrameShape(16.4, 14.4, 2.0, 10.4, 8.4, 1.2);
    const steelShim = new THREE.Mesh(
      extrudeHiRes(steelShimShape, 0.24, 0.02, 0.02, 1, 18).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    steelShim.position.y = -0.36;

    const ultraThinShim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.2, 14.2, 2.0, 10.6, 8.6, 1.2), 0.16, 0.02, 0.02, 1, 16).rotateX(
        Math.PI / 2
      ),
      mats.beCuSpring
    );
    ultraThinShim.position.y = -0.62;
    eyeAfShimGroup.add(shimPlate, steelShim, ultraThinShim);

    // Authentic thickness-code identification tabs protruding from +X shim edge (10 / 20 / 50 μm)
    const tabSpecs: Array<[number, number, THREE.Material]> = [
      [0.0, -3.2, mats.ultra.evfShimEtchedBrass],
      [-0.36, 0.0, mats.mountStainlessFlange],
      [-0.62, 3.2, mats.beCuSpring],
    ];
    for (const [ty, tz, tMat] of tabSpecs) {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.22, 2.0), tMat);
      tab.position.set(8.8, ty, tz);
      tab.userData.noEdges = true;
      eyeAfShimGroup.add(tab);
    }

    // 3 CNC-turned tapered titanium alignment studs (Lathe profile: seating collar -> undercut -> tapered tip!)
    const studPts: THREE.Vector2[] = [
      new THREE.Vector2(0.01, -1.65),
      new THREE.Vector2(0.68, -1.65),
      new THREE.Vector2(1.02, -1.15),
      new THREE.Vector2(1.02, 0.45),
      new THREE.Vector2(0.86, 0.6),
      new THREE.Vector2(1.52, 0.68),
      new THREE.Vector2(1.52, 1.25),
      new THREE.Vector2(1.18, 1.55),
      new THREE.Vector2(0.01, 1.55),
    ];
    const studGeo = markHiRes(new THREE.LatheGeometry(studPts, 20));
    studGeo.computeVertexNormals();
    for (const [sx, sz] of [
      [-6.2, -5.2],
      [6.2, -5.2],
      [0.0, 5.4],
    ] as Array<[number, number]>) {
      const stud = new THREE.Mesh(studGeo, mats.titaniumRivet);
      stud.position.set(sx, -1.35, sz);
      eyeAfShimGroup.add(stud);
    }
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyeaf-shims',
      28,
      '#eab308',
      eyeAfShimGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y - 12.6, -22.2),
      new THREE.Vector3(24, -30, -24),
      new THREE.Vector3(26, 8, -32),
      cp,
      0.26
    )
  );

  // =========================================================================
  // E29: Optical-Chamber Molecular-Sieve Desiccant Cartridge & Breather Port
  // =========================================================================
  const desiccantGroup = new THREE.Group();
  {
    // CNC SUS304 micro-cartridge housing with recessed window pocket & top/bottom mounting tabs
    const housing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(6.4, 11.6, 1.2, 4.4, 8.8, 0.6), 3.4, 0.14, 0.14, 2, 18),
      mats.mountStainlessFlange
    );
    const backCap = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(6.2, 11.4, 1.1), 0.55, 0.08, 0.08, 1, 14),
      mats.stainlessMachined
    );
    backCap.position.z = 1.48;
    desiccantGroup.add(housing, backCap);

    // Top & bottom mounting screw tabs
    for (const sy of [-6.4, 6.4]) {
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(4.0, 1.4, 0.65, 0.35, 0.06, 'z'),
        mats.stainlessMachined
      );
      tab.position.set(0, sy, 1.38);
      desiccantGroup.add(tab);
    }

    // Packed bed of 3A Synthetic Zeolite Molecular-Sieve Spherical Desiccant Beads!
    const zeoCoreGeo = applyPlanarUVs(new THREE.BoxGeometry(4.3, 8.6, 2.3), 4.3, 8.6, 'xy-back');
    const zeoCore = new THREE.Mesh(zeoCoreGeo, mats.ultra.evfZeoliteBeadBed);
    zeoCore.position.z = -0.1;
    desiccantGroup.add(zeoCore);

    // Subtle 3D ceramic zeolite spherical micro-beads pressed right behind the woven mesh window!
    for (let r = -3; r <= 3; r++) {
      for (let c = -1; c <= 1; c++) {
        const bead = new THREE.Mesh(hiResSphere(0.54, 8, 6), mats.ceramicAlumina);
        bead.position.set(c * 1.18 + (r % 2 === 0 ? 0.18 : -0.18), r * 1.12, -1.28);
        bead.userData.noEdges = true;
        desiccantGroup.add(bead);
      }
    }

    // Laser-welded fine stainless woven micro-mesh breathable retention screen + frame rim!
    const meshWinGeo = applyPlanarUVs(new THREE.PlaneGeometry(4.4, 8.8), 4.4, 8.8, 'xy-back');
    const meshWin = new THREE.Mesh(meshWinGeo, mats.ultra.micStainlessWovenMesh);
    meshWin.rotation.y = Math.PI;
    meshWin.position.z = -1.76;
    meshWin.userData.noEdges = true;
    const meshFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(5.2, 9.6, 0.8, 4.3, 8.7, 0.5), 0.32, 0.04, 0.04, 1, 14),
      mats.emiShieldCan
    );
    meshFrame.position.z = -1.72;
    desiccantGroup.add(meshWin, meshFrame);

    // Side-mounted barometric pressure-equalizing breather boss with hex flats, EPDM O-ring & W.L. Gore ePTFE disk!
    const ventHex = new THREE.Mesh(
      hiResCyl(2.25, 2.25, 1.35, 6).rotateZ(Math.PI / 2),
      mats.matteBlackAnodized
    );
    ventHex.position.set(3.75, 2.4, 0);
    const ventO = new THREE.Mesh(
      hiResTorus(2.05, 0.25, 8, 22).rotateY(Math.PI / 2),
      mats.epdmGasket
    );
    ventO.position.set(3.2, 2.4, 0);
    ventO.userData.noEdges = true;
    const ventPtfeGeo = markHiRes(new THREE.CircleGeometry(1.52, 24));
    ventPtfeGeo.rotateY(Math.PI / 2);
    const ventPtfe = new THREE.Mesh(ventPtfeGeo, mats.ultra.sensorEptfeVent);
    ventPtfe.position.set(4.46, 2.4, 0);
    ventPtfe.userData.noEdges = true;
    desiccantGroup.add(ventHex, ventO, ventPtfe);
  }
  parts.push(
    finalizeEvfPart(
      'evf-desiccant-breather',
      29,
      '#06b6d4',
      desiccantGroup,
      new THREE.Vector3(14.8, EVF_OPTICAL_Y + 6.2, -5.5),
      new THREE.Vector3(38, 22, 8),
      new THREE.Vector3(42, 54, 10),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E30: EVF Auto-Brightness & Color-Temperature Ambient RGB Photodiode
  // =========================================================================
  const ambientPdGroup = new THREE.Group();
  {
    // Miniature chamfered emerald HDI sub-PCB mapped cleanly with PCB traces
    const subPcbGeo = applyPlanarUVs(
      createChamferedBoxGeo(7.4, 5.6, 0.78, 0.65, 0.06, 'z'),
      7.4,
      5.6,
      'xy-back'
    );
    const subPcb = new THREE.Mesh(subPcbGeo, mats.ultra.evfTconPcb);
    ambientPdGroup.add(subPcb);

    // 2x 0201 I2C pull-up resistors & 1x bypass MLCC flanking the ALS IC
    for (const sx of [-2.4, 2.4]) {
      const pass = buildSmdPassive(1.0, 0.52, 0.4, mats.smdCeramic, mats.silverElectrode, 'z');
      pass.position.set(sx, 1.35, -0.58);
      ambientPdGroup.add(pass);
    }

    // Clear-molded V(lambda) RGB+ALS 16-bit Photodiode IC showing 4 unmistakable R/G/B/Clear quadrants!
    const alsPkg = new THREE.Mesh(
      createChamferedBoxGeo(3.1, 2.5, 0.68, 0.25, 0.06, 'z'),
      mats.icEpoxy
    );
    alsPkg.position.set(0, 0, -0.68);
    const rgbDieGeo = applyPlanarUVs(new THREE.PlaneGeometry(2.15, 1.9), 2.15, 1.9, 'xy-back');
    const rgbDie = new THREE.Mesh(rgbDieGeo, mats.ultra.evfAmbientRgbDie);
    rgbDie.rotation.y = Math.PI;
    rgbDie.position.set(0, 0, -1.04);
    rgbDie.userData.noEdges = true;

    // Gold side solder castellations on ALS package
    for (const sx of [-1.6, 1.6]) {
      for (const sy of [-0.65, 0.65]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.55), mats.goldPlating);
        leg.position.set(sx, sy, -0.68);
        leg.userData.noEdges = true;
        ambientPdGroup.add(leg);
      }
    }

    // Smooth hemispherical optical condenser micro-lens dome over the 4-quadrant RGB photodiode
    const microLens = new THREE.Mesh(
      hiResSphere(1.12, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.5).rotateX(-Math.PI / 2),
      mats.evfLensAspheric
    );
    microLens.position.set(0, 0, -1.06);
    microLens.userData.noEdges = true;
    ambientPdGroup.add(alsPkg, rgbDie, microLens);

    // Shielded amber polyimide I2C flex tail + SUS stiffener + gold ZIF fingers
    const fpcGeo = applyPlanarUVs(new THREE.BoxGeometry(3.2, 9.4, 0.22), 3.2, 9.4, 'xy');
    const fpc = new THREE.Mesh(fpcGeo, mats.ultra.evfOemFlexRibbon);
    fpc.position.set(0, -6.3, 0.22);
    const zifGold = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.4, 0.28), mats.goldPlating);
    zifGold.position.set(0, -10.5, 0.22);
    zifGold.userData.noEdges = true;
    ambientPdGroup.add(fpc, zifGold);
  }
  parts.push(
    finalizeEvfPart(
      'evf-ambient-photodiode',
      30,
      '#10b981',
      ambientPdGroup,
      new THREE.Vector3(-12.5, EVF_OPTICAL_Y + 11.4, -26.5),
      new THREE.Vector3(-34, 34, -36),
      new THREE.Vector3(-36, 68, -46),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E31: Diopter-Wheel Tactile Click Detent Leaf Spring & Zero-Stop Index Cam
  // =========================================================================
  const diopterDetentGroup = new THREE.Group();
  {
    // 42-step precision-hobbed C3604 brass click ratchet wheel with deeper -1.0 dpt zero-reference valley!
    const ratchetWheel = new THREE.Mesh(
      createDiopterRatchetWheelGeo(36, 4.35, 1.38, 1.45).rotateY(Math.PI / 2),
      mats.brassGear
    );
    diopterDetentGroup.add(ratchetWheel);

    // Central keyed stainless drive bushing
    const hub = new THREE.Mesh(
      hiResCyl(1.75, 1.75, 1.85, 18).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    diopterDetentGroup.add(hub);

    // Formed curved CuBe2 cantilever click detent leaf spring + riveted anchor foot!
    const leafSpring = new THREE.Mesh(
      buildFlatRibbonExtrude(
        [
          [-5.2, 0.45],
          [-2.8, 0.12],
          [0.0, -0.32],
          [2.4, 0.25],
          [3.6, 0.55],
        ],
        0.34,
        1.5,
        'yz'
      ),
      mats.beCuSpring
    );
    leafSpring.position.set(0, -0.8, 4.9);
    diopterDetentGroup.add(leafSpring);

    // Mounting anchor rivet pad at lower base of leaf spring
    const anchorBlock = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 2.0, 1.2, 0.2, 0.06, 'z'),
      mats.matteBlackAnodized
    );
    anchorBlock.position.set(0, -5.6, 5.45);
    const rivet = new THREE.Mesh(hiResCyl(0.48, 0.48, 1.5, 12).rotateX(Math.PI / 2), mats.titaniumRivet);
    rivet.position.set(0, -5.6, 5.45);
    rivet.userData.noEdges = true;
    diopterDetentGroup.add(anchorBlock, rivet);

    // Hardened titanium V-nose detent cam follower engaging the brass ratchet teeth
    const tipShape = new THREE.Shape();
    tipShape.moveTo(0, -0.75);
    tipShape.lineTo(-0.95, 0);
    tipShape.lineTo(0, 0.75);
    tipShape.lineTo(0.45, 0.55);
    tipShape.lineTo(0.45, -0.55);
    tipShape.closePath();
    const detentTip = new THREE.Mesh(
      extrudeHiRes(tipShape, 1.28, 0.05, 0.05, 1, 10).rotateY(Math.PI / 2),
      mats.titaniumRivet
    );
    detentTip.position.set(0, 0, 4.55);
    diopterDetentGroup.add(detentTip);

    // Stainless zero-diopter reference index cam collar with crisp chamfered datum lug!
    const zeroCam = new THREE.Mesh(
      hiResTorus(3.25, 0.36, 10, 28).rotateY(Math.PI / 2),
      mats.mountStainlessFlange
    );
    zeroCam.position.x = 1.08;
    const zeroLug = new THREE.Mesh(
      createChamferedBoxGeo(0.82, 1.15, 0.95, 0.15, 0.05, 'z'),
      mats.mountRedIndexDot
    );
    zeroLug.position.set(1.08, 3.65, 0);
    zeroLug.userData.noEdges = true;
    diopterDetentGroup.add(zeroCam, zeroLug);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-detent',
      31,
      '#d97706',
      diopterDetentGroup,
      new THREE.Vector3(16.2, EVF_OPTICAL_Y - 1.5, -18.5),
      new THREE.Vector3(44, -8, -16),
      new THREE.Vector3(46, 26, -24),
      cp,
      0.26
    )
  );

  // =========================================================================
  // Live Kinematic Rig: Smooth Diopter Focus Drive + Helicoid + Lock Clutch + 850nm IR Pulse
  // =========================================================================
  // Tag rigid kinematic bone nodes for GPU SubPartRigidBoneMegaBatcher!
  diopterDialGroup.userData.kinematicBone = true;
  diopterLockClutchGroup.userData.kinematicBone = true;
  leadScrewGroup.userData.kinematicBone = true;
  helicoidSleeveGroup.userData.kinematicBone = true;

  const applyDynamics = (
    elapsed: number,
    physicsActive: boolean,
    explodeFactor: number,
    integrated: boolean
  ) => {
    const offset =
      integrated && edLensPart.integratedExplodeOffset
        ? edLensPart.integratedExplodeOffset
        : edLensPart.explodeOffset;

    if (!physicsActive) {
      diopterDialGroup.rotation.x = 0;
      diopterLockClutchGroup.rotation.x = 0;
      leadScrewGroup.rotation.z = 0;
      helicoidSleeveGroup.rotation.z = 0;
      for (const led of irLedMeshes) {
        (led.material as THREE.MeshBasicMaterial).color.setRGB(0.62, 0.08, 0.22);
      }
      return;
    }

    const diopterWave = Math.sin(elapsed * 1.45);
    const zShift = diopterWave * 2.0;

    edLensPart.group.position.set(
      edLensPart.assembledPos.x + offset.x * explodeFactor,
      edLensPart.assembledPos.y + offset.y * explodeFactor,
      edLensPart.assembledPos.z + offset.z * explodeFactor + zShift
    );

    diopterDialGroup.rotation.x = diopterWave * 2.6;
    diopterLockClutchGroup.rotation.x = diopterWave * 2.6;
    leadScrewGroup.rotation.z = diopterWave * 5.2;
    helicoidSleeveGroup.rotation.z = diopterWave * 0.42;

    irLedMeshes.forEach((led, idx) => {
      const pulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(elapsed * 6.5 - idx * (Math.PI / 4)));
      (led.material as THREE.MeshBasicMaterial).color.setRGB(pulse, 0.1 * pulse, 0.26 * pulse);
    });
  };

  return {
    parts,
    rig: {
      edLensPart,
      diopterDialGroup,
      leadScrewGroup,
      irLedMeshes,
      oledScreenMesh,
      applyDynamics,
    },
  };
}

export async function buildEvfStandaloneParts(mats: MaterialLibrary): Promise<CadPart[]> {
  // Phase 16B / Phase 31: 24 standalone-only EVF & viewfinder surroundings micro-parts (E32–E55)
  const mMicro = await import('./evfMicroParts');
  return mMicro.buildEvfMicroParts(mats);
}
