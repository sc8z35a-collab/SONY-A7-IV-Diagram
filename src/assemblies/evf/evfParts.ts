//@FLOW_MAP|file=src/assemblies/evf/evfParts.ts|unit=evf|lines=3673|exports=EVF_OPTICAL_Y,EvfDynamicRig,buildEvfParts,buildEvfStandaloneParts
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
import {
  enrichE01Eyecup,
  enrichE02Latch,
  enrichE03AntifogWindow,
  enrichE04EyeSensor,
  enrichE05IrLeds,
  enrichE06DichroicMirror,
  enrichE07GazeCamera,
  enrichE08RearLens,
  enrichE09EdDoublet,
  enrichE10DiopterRails,
  enrichE11Helicoid,
  enrichE12Diopter,
  enrichE13FieldLens,
  enrichE14OledPanel,
  enrichE15OledAlign,
  enrichE16TconPcb,
  enrichE17Heatsink,
  enrichE18Housing,
  enrichE19BlindShutter,
  enrichE20GazeIrOptics,
  enrichE21DiopterLock,
  enrichE22PolarizerQwp,
  enrichE23MlaStack,
  enrichE24TconEmiShield,
  enrichE25BaffleSealKit,
  enrichE26CavityClamp,
  enrichE27EyecupSubframe,
  enrichE28EyeAfShims,
  enrichE29DesiccantBreather,
  enrichE30AmbientPd,
  enrichE31DiopterDetent,
} from './evfMacroDetailEnricher';

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
  const b = Math.min(0.05, Math.max(0.015, (outerR - innerR) * 0.22));
  const body = new THREE.Mesh(extrudeHiRes(shape, depth, b, b, 2, 36), mat);
  grp.add(body);

  // Concentric internal anti-reflection light-trap thread grooves lining the lens bore
  if (baffleMat && grooveCount > 0) {
    const span = depth * 0.68;
    for (let i = 0; i < grooveCount; i++) {
      const z = -span * 0.5 + (grooveCount === 1 ? 0 : (i / (grooveCount - 1)) * span);
      const ridge = new THREE.Mesh(hiResTorus(innerR + 0.05, 0.045, 6, 36), baffleMat);
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
    const baseGeo = applyBoxUVs(extrudeHiRes(baseShape, 1.55, 0.16, 0.16, 2, 28), 18);
    const baseMesh = new THREE.Mesh(baseGeo, mats.ultra.evfFinderCoverMold);
    baseMesh.position.z = 1.02;
    eyecupGroup.add(baseMesh);

    // Lower eye-sensor clearance bridge cutout accent
    const lowerNotch = new THREE.Mesh(
      createChamferedBoxGeo(14.8, 2.0, 1.15, 0.4, 0.1, 'z'),
      mats.matteBlackAnodized
    );
    lowerNotch.position.set(0, -11.4, 1.18);
    eyecupGroup.add(lowerNotch);

    // Quick-release bayonet slide channels, stainless reinforcement guides & tactile side thumb-release tabs
    for (const sx of [-1, 1]) {
      const rail = new THREE.Mesh(
        createChamferedBoxGeo(1.6, 15.2, 1.05, 0.22, 0.08, 'z'),
        mats.stainlessMachined
      );
      rail.position.set(sx * 14.4, 0.2, 1.32);
      eyecupGroup.add(rail);

      // Undercut locking detent tooth engaging E02 stainless spring claw
      const hook = new THREE.Mesh(new THREE.BoxGeometry(1.05, 2.2, 0.85), mats.stainlessMachined);
      hook.position.set(sx * 13.7, -4.4, 1.44);
      hook.userData.noEdges = true;
      eyecupGroup.add(hook);

      // Textured side release grip button tab (3 fine horizontal grip ridges)
      const lockTab = new THREE.Mesh(
        createChamferedBoxGeo(2.1, 4.2, 1.2, 0.32, 0.1, 'z'),
        mats.matteBlackAnodized
      );
      lockTab.position.set(sx * 15.8, -4.4, 0.92);
      eyecupGroup.add(lockTab);
      for (const gy of [-1.1, 0, 1.1]) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.95), mats.evfHousingMg);
        rib.position.set(sx * 16.9, -4.4 + gy, 0.92);
        rib.userData.noEdges = true;
        eyecupGroup.add(rib);
      }
    }

    // Stepped flexible fluorosilicone accordion bellows neck
    const neckShape = createFrameShape(32.6, 26.0, 6.6, 23.8, 18.4, 4.2);
    const neckMesh = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(neckShape, 2.1, 0.28, 0.28, 2, 32), 14),
      mats.evfEyecupRubber
    );
    neckMesh.position.z = -0.65;
    eyecupGroup.add(neckMesh);

    // Mid ergonomic sculpted silicone shade shroud flaring rearward toward photographer's eye
    const midShade = createFrameShape(34.6, 27.8, 7.8, 24.8, 19.2, 4.8);
    const midMesh = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(midShade, 2.8, 0.4, 0.4, 2, 32), 14),
      mats.evfEyecupRubber
    );
    midMesh.position.z = -2.45;
    eyecupGroup.add(midMesh);

    // Deep rear cushioned asymmetrical eye-brow & temple wrap cushion lip
    const lipShade = createFrameShape(37.4, 30.2, 9.6, 25.8, 20.0, 5.6);
    const lipMesh = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(lipShade, 3.0, 0.85, 0.85, 3, 32), 14),
      mats.ultra.micRubberBootBlack
    );
    lipMesh.position.z = -4.65;
    eyecupGroup.add(lipMesh);

    // Sculpted upper anti-glare sun-brow hood visor (FDA-EP21 / ER-iE signature sun shield!)
    const browShape = new THREE.Shape();
    browShape.moveTo(-14.6, -1.6);
    browShape.quadraticCurveTo(0, 3.6, 14.6, -1.6);
    browShape.lineTo(13.2, -3.4);
    browShape.quadraticCurveTo(0, 1.0, -13.2, -3.4);
    browShape.closePath();
    const brow = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(browShape, 2.4, 0.38, 0.38, 2, 24), 12),
      mats.ultra.micRubberBootBlack
    );
    brow.position.set(0, 13.8, -5.6);
    brow.rotation.x = 0.24;
    eyecupGroup.add(brow);

    // Stepped open-bottom fluorosilicone dust-skirt U-shroud telescoping cleanly over E27/E02 top & sides
    // (leaves lower eye-sensor & E27 release catch unobstructed, eliminates exposed rear accordion slits!)
    const uSkirt = new THREE.Shape();
    const ox = 18.0, oy = 14.5, ocr = 5.6;
    const ix = 16.95, iy = 13.45, icr = 4.6;
    uSkirt.moveTo(-ox, -10.8);
    uSkirt.lineTo(-ox, oy - ocr);
    uSkirt.absarc(-ox + ocr, oy - ocr, ocr, Math.PI, Math.PI / 2, true);
    uSkirt.lineTo(ox - ocr, oy);
    uSkirt.absarc(ox - ocr, oy - ocr, ocr, Math.PI / 2, 0, true);
    uSkirt.lineTo(ox, -10.8);
    uSkirt.lineTo(ix, -10.8);
    uSkirt.lineTo(ix, iy - icr);
    uSkirt.absarc(ix - icr, iy - icr, icr, 0, Math.PI / 2, false);
    uSkirt.lineTo(-ix + icr, iy);
    uSkirt.absarc(-ix + icr, iy - icr, icr, Math.PI / 2, Math.PI, false);
    uSkirt.lineTo(-ix, -10.8);
    uSkirt.closePath();
    const dustSkirt = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(uSkirt, 5.5, 0.14, 0.14, 2, 28), 16),
      mats.evfEyecupRubber
    );
    dustSkirt.position.set(0, 0.2, 3.22);
    eyecupGroup.add(dustSkirt);

    // 3 interior stepped matte anti-glare micro-baffle ribs trapping oblique sunlight inside eyecup bore!
    for (let i = 0; i < 3; i++) {
      const bz = -0.25 - i * 1.35;
      const bFrame = createFrameShape(
        24.6 + i * 0.6,
        19.0 + i * 0.5,
        4.4 + i * 0.3,
        23.4 + i * 0.6,
        17.8 + i * 0.5,
        3.9 + i * 0.3
      );
      const baffleRib = new THREE.Mesh(extrudeHiRes(bFrame, 0.32, 0.04, 0.04, 1, 24), mats.velvetFlockTrap);
      baffleRib.position.z = bz;
      baffleRib.userData.noEdges = true;
      eyecupGroup.add(baffleRib);
    }
    enrichE01Eyecup(eyecupGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyecup',
      1,
      '#2c313a',
      eyecupGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -39.46),
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
      extrudeHiRes(carrierShape, 0.72, 0.06, 0.06, 2, 28),
      mats.mountStainlessFlange
    );
    eyecupLatchGroup.add(carrier);

    // Rear perimeter dust-labyrinth raised lip step
    const labLip = new THREE.Mesh(
      extrudeHiRes(createFrameShape(26.6, 20.6, 3.8, 25.0, 19.0, 3.4), 0.24, 0.03, 0.03, 1, 24),
      mats.stainlessMachined
    );
    labLip.position.z = 0.44;
    eyecupLatchGroup.add(labLip);

    // Left & right L-profile beveled dovetail rails + pivoting spring-lock claws + guide pins + return springs
    for (const sx of [-1, 1]) {
      // Main dovetail slide rail with upper end-stop shoulder
      const dovetail = new THREE.Mesh(
        createChamferedBoxGeo(1.5, 16.0, 0.92, 0.18, 0.06, 'z'),
        mats.stainlessMachined
      );
      dovetail.position.set(sx * 13.4, 0.4, -0.14);
      eyecupLatchGroup.add(dovetail);

      const railFlange = new THREE.Mesh(new THREE.BoxGeometry(0.82, 15.4, 0.28), mats.mountStainlessFlange);
      railFlange.position.set(sx * 12.6, 0.4, -0.48);
      eyecupLatchGroup.add(railFlange);

      const topStop = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.15, 0.95), mats.stainlessMachined);
      topStop.position.set(sx * 13.4, 8.6, -0.14);
      eyecupLatchGroup.add(topStop);

      // Sculpted pivoting spring-steel locking claw with chamfered wedge catch tooth & pivot pin
      const clawShape = new THREE.Shape();
      clawShape.moveTo(-1.05, -2.1);
      clawShape.lineTo(1.15, -2.1);
      clawShape.lineTo(1.4, 0.6);
      clawShape.lineTo(0.4, 2.1);
      clawShape.lineTo(-1.05, 2.1);
      clawShape.closePath();
      const claw = new THREE.Mesh(extrudeHiRes(clawShape, 0.72, 0.05, 0.05, 1, 12), mats.mountSpringSteel);
      claw.scale.x = sx;
      claw.position.set(sx * 14.8, -4.4, -0.14);
      eyecupLatchGroup.add(claw);

      const pivotPin = new THREE.Mesh(
        hiResCyl(0.38, 0.38, 0.98, 14).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      pivotPin.position.set(sx * 14.2, -2.8, -0.12);
      pivotPin.userData.noEdges = true;
      eyecupLatchGroup.add(pivotPin);

      // Helical phosphor-bronze preload compression spring + internal stainless spring guide mandrel
      const spring = new THREE.Mesh(
        markHiRes(createHelicalSpringGeometry(0.42, 3.0, 7, 0.11).rotateY(Math.PI / 2)),
        mats.brassGear
      );
      spring.position.set(sx * 13.0, -4.4, 0.08);
      spring.userData.noEdges = true;
      eyecupLatchGroup.add(spring);

      const mandrel = new THREE.Mesh(
        hiResCyl(0.22, 0.22, 3.2, 10).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      mandrel.position.set(sx * 13.0, -4.4, 0.08);
      mandrel.userData.noEdges = true;
      eyecupLatchGroup.add(mandrel);

      // Top & bottom Phillips M1.2 mounting screws anchoring latch frame to EVF magnesium collar
      for (const sy of [-8.8, 8.8]) {
        const scr = buildPhillipsScrew(
          0.68,
          0.26,
          0.38,
          0.82,
          mats.stainlessMachined,
          mats.matteBlackAnodized,
          mats.titaniumRivet
        );
        scr.rotation.x = Math.PI / 2;
        scr.position.set(sx * 11.4, sy, -0.34);
        eyecupLatchGroup.add(scr);
      }
    }
    enrichE02Latch(eyecupLatchGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyecup-latch',
      2,
      '#94a3b8',
      eyecupLatchGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -35.34),
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
    // CNC machined chamfered matte-black anodized aluminum bezel frame (fits cleanly inside E18 rearCollar aperture!)
    const bezelShape = createFrameShape(24.6, 18.6, 3.4, 21.2, 15.8, 2.8);
    const bezel = new THREE.Mesh(
      extrudeHiRes(bezelShape, 1.82, 0.06, 0.06, 2, 32),
      mats.matteBlackAnodized
    );
    antifogGroup.add(bezel);

    // Molded perimeter dual-rib EPDM Airtight Sealing O-Ring gasket seated cleanly ahead of E18 rearCollar (-31.74)!
    const sealShape = createFrameShape(25.2, 19.0, 3.6, 24.4, 18.2, 3.3);
    const seal = new THREE.Mesh(
      extrudeHiRes(sealShape, 0.48, 0.04, 0.04, 2, 32),
      mats.epdmGasket
    );
    seal.position.z = 0.44;
    antifogGroup.add(seal);

    // Inner laser-welded stainless thermal air-gap spacer ring creating the dry-air chamber
    const spacerShape = createFrameShape(22.2, 17.2, 3.0, 20.8, 15.8, 2.6);
    const spacer = new THREE.Mesh(
      extrudeHiRes(spacerShape, 0.92, 0.04, 0.04, 1, 28),
      mats.stainlessMachined
    );
    antifogGroup.add(spacer);

    // Micro-perforated desiccant-breather pinholes along top/bottom inner spacer edge (authentic insulated glazing!)
    for (let i = -4; i <= 4; i++) {
      for (const sy of [-8.0, 8.0]) {
        const holeDot = new THREE.Mesh(
          hiResCyl(0.2, 0.2, 0.28, 8),
          mats.velvetFlockTrap
        );
        holeDot.position.set(i * 1.8, sy, 0);
        holeDot.userData.noEdges = true;
        antifogGroup.add(holeDot);
      }
    }

    // Hermetic butyl primary perimeter edge-seal bead bonding both glass panes to the thermal spacer
    const butylSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(22.6, 17.6, 3.1, 22.0, 17.0, 2.9), 1.48, 0.04, 0.04, 1, 24),
      mats.butylDamperRubber
    );
    antifogGroup.add(butylSeal);

    // Outer Fluorine-Coated Protective Glass Pane (-Z side facing eye, ultra-clean AR bevel)
    const outerGlassGeo = extrudeHiRes(createRoundedRectShape(21.4, 16.4, 2.7), 0.42, 0.04, 0.04, 2, 28);
    const outerGlass = new THREE.Mesh(outerGlassGeo, mats.evfAntiFogGlass);
    outerGlass.position.z = -0.68;
    outerGlass.userData.edgeOpacity = 0.38;
    antifogGroup.add(outerGlass);

    // Inner Sealed Anti-Fog Optical Glass Pane (+Z side facing EVF optics)
    const innerGlass = new THREE.Mesh(outerGlassGeo.clone(), mats.evfAntiFogGlass);
    innerGlass.position.z = 0.68;
    innerGlass.userData.edgeOpacity = 0.38;
    antifogGroup.add(innerGlass);

    // Crisp ground-glass chamfer edge highlight strips along both sealed panes
    const rimShape = createFrameShape(21.65, 16.65, 2.8, 21.0, 16.0, 2.6);
    const rimFront = new THREE.Mesh(extrudeHiRes(rimShape, 0.38, 0.03, 0.03, 1, 28), mats.evfGlassEdgeRim);
    rimFront.position.z = -0.68;
    const rimBack = new THREE.Mesh(extrudeHiRes(rimShape, 0.38, 0.03, 0.03, 1, 28), mats.evfGlassEdgeRim);
    rimBack.position.z = 0.68;
    antifogGroup.add(rimFront, rimBack);
    enrichE03AntifogWindow(antifogGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-antifog-window',
      3,
      '#38bdf8',
      antifogGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -31.8),
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
    // Molded dark dual-chamber optical shroud directly beneath rear eyepiece window (aligned to E32 pocket Y=27.30)
    const housingShape = createRoundedRectShape(14.8, 3.9, 1.1);
    const housing = new THREE.Mesh(
      extrudeHiRes(housingShape, 1.85, 0.1, 0.1, 2, 20),
      mats.matteBlackAnodized
    );
    eyeSensorGroup.add(housing);

    // Internal opaque crosstalk baffle rib separating 940nm VCSEL emitter & SPAD receiver chambers
    const baffleWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.2, 1.3), mats.velvetFlockTrap);
    baffleWall.position.set(-1.4, 0, -0.58);
    eyeSensorGroup.add(baffleWall);

    // Emerald HDI sensor carrier PCB mapped cleanly with bespoke PCB texture
    const pcbGeo = applyPlanarUVs(createChamferedBoxGeo(15.4, 3.8, 0.68, 0.5, 0.05, 'z'), 15.4, 3.8, 'xy');
    const pcb = new THREE.Mesh(pcbGeo, mats.ultra.evfTconPcb);
    pcb.position.z = 1.18;
    eyeSensorGroup.add(pcb);

    // Miniature 0402 bypass MLCCs & VCSEL driver IC on PCB back (+Z, world Z_max=-28.26 clearing E18 irPortRing -28.00!)
    const drvIc = buildChipPackage({
      w: 2.6,
      d: 2.0,
      h: 0.36,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      axis: 'z',
    });
    drvIc.position.set(-1.2, 0, 1.56);
    eyeSensorGroup.add(drvIc);
    for (const cx of [-4.2, 2.6, 4.4]) {
      const cap = buildSmdPassive(0.88, 0.48, 0.32, mats.smdCeramic, mats.silverElectrode, 'z');
      cap.position.set(cx, 0.65, 1.56);
      eyeSensorGroup.add(cap);
    }

    // Twin optical barrels facing -Z: 940nm VCSEL IR emitter (-3.4) + SPAD ToF receiver (+0.6)
    for (const sx of [-3.4, 0.6]) {
      const bezel = new THREE.Mesh(hiResCyl(1.42, 1.52, 0.72, 24).rotateX(Math.PI / 2), mats.goldPlating);
      bezel.position.set(sx, 0, -0.82);
      eyeSensorGroup.add(bezel);

      const innerCollar = new THREE.Mesh(
        hiResTorus(1.22, 0.14, 8, 24),
        mats.matteBlackAnodized
      );
      innerCollar.position.set(sx, 0, -1.16);
      innerCollar.userData.noEdges = true;
      eyeSensorGroup.add(innerCollar);

      if (sx < 0) {
        // 940nm VCSEL emitter cavity + ruby collimating micro-lens dome
        const vcselDie = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.22), mats.goldPlating);
        vcselDie.position.set(sx, 0, -0.92);
        vcselDie.userData.noEdges = true;
        const lens = new THREE.Mesh(hiResSphere(1.04, 18, 12), mats.irLedLens);
        lens.scale.set(1, 1, 0.44);
        lens.position.set(sx, 0, -1.04);
        lens.userData.noEdges = true;
        eyeSensorGroup.add(vcselDie, lens);
      } else {
        // SPAD ToF receiver silicon die mapped with bespoke NIR photodiode die texture + clear window
        const spadGeo = applyPlanarUVs(new THREE.PlaneGeometry(1.8, 1.8), 1.8, 1.8, 'xy-back');
        const spad = new THREE.Mesh(spadGeo, mats.ultra.evfGazeNirDie);
        spad.rotation.y = Math.PI;
        spad.position.set(sx, 0, -0.96);
        spad.userData.noEdges = true;
        const lens = new THREE.Mesh(hiResSphere(1.04, 18, 12), mats.evfAntiFogGlass);
        lens.scale.set(1, 1, 0.4);
        lens.position.set(sx, 0, -1.08);
        lens.userData.noEdges = true;
        eyeSensorGroup.add(spad, lens);
      }
    }

    // Rightmost V(lambda) Ambient Brightness Photodiode window showing 4-quadrant RGB/Clear sensor die!
    const ambFrame = new THREE.Mesh(
      createChamferedBoxGeo(2.5, 2.5, 0.65, 0.26, 0.06, 'z'),
      mats.silverElectrode
    );
    ambFrame.position.set(4.8, 0, -0.84);
    const ambDieGeo = applyPlanarUVs(new THREE.PlaneGeometry(1.7, 1.7), 1.7, 1.7, 'xy-back');
    const ambDie = new THREE.Mesh(ambDieGeo, mats.ultra.evfAmbientRgbDie);
    ambDie.rotation.y = Math.PI;
    ambDie.position.set(4.8, 0, -1.18);
    ambDie.userData.noEdges = true;
    const ambGlass = new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.85, 0.18), mats.evfLensAspheric);
    ambGlass.position.set(4.8, 0, -1.26);
    ambGlass.userData.noEdges = true;
    eyeSensorGroup.add(ambFrame, ambDie, ambGlass);

    // Contoured amber Kapton FPC tail routing laterally along -X below optical barrel (clear of E03/E19/E05!)
    const fpcGeo = applyPlanarUVs(new THREE.BoxGeometry(3.8, 1.8, 0.2), 3.8, 1.8, 'xy');
    const fpc = new THREE.Mesh(fpcGeo, mats.ultra.evfOemFlexRibbon);
    fpc.position.set(-9.2, 0.2, 1.42);
    const fpcGold = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.6, 0.24), mats.goldPlating);
    fpcGold.position.set(-10.8, 0.2, 1.42);
    fpcGold.userData.noEdges = true;
    eyeSensorGroup.add(fpc, fpcGold);

    // Two detailed Phillips M1.2 mounting screws (world Z_max = -28.26, clear of E18!)
    for (const sx of [-6.5, 6.5]) {
      const scr = buildPhillipsScrew(
        0.64,
        0.3,
        0.36,
        0.9,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.rotation.x = -Math.PI / 2;
      scr.position.set(sx, 0, 1.44);
      eyeSensorGroup.add(scr);
    }
    enrichE04EyeSensor(eyeSensorGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-eye-sensor',
      4,
      '#0ea5e9',
      eyeSensorGroup,
      new THREE.Vector3(0, 27.3, -30.0),
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
    const ringShape = createFrameShape(24.6, 19.6, 6.4, 19.2, 14.6, 4.6);
    const ringGeo = applyPlanarUVs(extrudeHiRes(ringShape, 0.72, 0.06, 0.06, 2, 32), 24.6, 19.6, 'xy-back');
    const ringBoard = new THREE.Mesh(ringGeo, mats.ultra.evfTconPcb);
    irLedsGroup.add(ringBoard);

    // Dual concentric ENIG gold power & pulse-sync distribution trace rings
    const goldOuter = new THREE.Mesh(
      extrudeHiRes(createFrameShape(23.6, 18.6, 6.0, 22.9, 17.9, 5.6), 0.1, 0, 0, 1, 32),
      mats.goldPlating
    );
    goldOuter.position.z = -0.38;
    const goldInner = new THREE.Mesh(
      extrudeHiRes(createFrameShape(20.4, 15.8, 5.0, 19.9, 15.3, 4.8), 0.1, 0, 0, 1, 32),
      mats.goldPlating
    );
    goldInner.position.z = -0.38;
    irLedsGroup.add(goldOuter, goldInner);

    // 8 High-Efficiency 850nm GaAlAs IR LED Emitters arrayed coaxially behind E74 micro-collimator domes!
    const ledSpecs: Array<[number, number, boolean]> = [
      [-9.6, 5.8, true],
      [-3.8, 8.4, false],
      [3.8, 8.4, false],
      [9.6, 5.8, true],
      [9.6, -5.8, true],
      [3.8, -8.4, false],
      [-3.8, -8.4, false],
      [-9.6, -5.8, true],
    ];

    for (const [lx, ly, isGlassesWide] of ledSpecs) {
      const ledUnit = new THREE.Group();
      ledUnit.position.set(lx, ly, -0.5);
      // Slight inward optical convergence angle toward photographer's cornea!
      ledUnit.rotation.y = (lx / 14) * (isGlassesWide ? 0.14 : 0.09);
      ledUnit.rotation.x = -(ly / 12) * (isGlassesWide ? 0.14 : 0.09);

      // Chamfered white Al2O3 ceramic SMD emitter substrate + solder side castellations
      const pkg = new THREE.Mesh(
        createChamferedBoxGeo(1.95, 1.7, 0.46, 0.2, 0.05, 'z'),
        mats.ceramicAlumina
      );
      ledUnit.add(pkg);

      // Gold parabolic micro-reflector cup + cathode polarity chamfer tab
      const cup = new THREE.Mesh(
        hiResCyl(0.68, 0.78, 0.26, 20).rotateX(Math.PI / 2),
        mats.goldPlating
      );
      cup.position.z = -0.24;
      ledUnit.add(cup);

      const cathodePad = new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.55, 0.16), mats.goldPlating);
      cathodePad.position.set(-0.92, 0, 0.16);
      cathodePad.userData.noEdges = true;
      const anodePad = new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.55, 0.16), mats.goldPlating);
      anodePad.position.set(0.92, 0, 0.16);
      anodePad.userData.noEdges = true;
      ledUnit.add(cathodePad, anodePad);

      // Ruby optical emitter dome (pulsed live during physics simulation via irLedMeshes!)
      const dome = new THREE.Mesh(
        hiResSphere(0.58, 12, 8),
        new THREE.MeshBasicMaterial({
          color: 0xc81440,
          clippingPlanes: cp,
        })
      );
      dome.scale.set(1, 1, 0.65);
      dome.position.z = -0.34;
      dome.userData.noEdges = true;
      dome.userData.dynamicGlow = true;
      ledUnit.add(dome);
      irLedMeshes.push(dome);

      irLedsGroup.add(ledUnit);

      // Paired 0402 pulse-current-limiting SMD resistor next to each IR LED
      const res = buildSmdPassive(0.92, 0.46, 0.3, mats.icEpoxy, mats.silverElectrode, 'z');
      const ang = Math.atan2(ly, lx);
      res.position.set(lx + Math.cos(ang) * 1.55, ly + Math.sin(ang) * 1.1, -0.52);
      res.rotation.z = ang + Math.PI / 2;
      irLedsGroup.add(res);
    }

    // Compact amber polyimide driver flex tail tucked cleanly inside +X lower corner of barrel
    const flexGeo = applyPlanarUVs(new THREE.BoxGeometry(2.6, 4.6, 0.2), 2.6, 4.6, 'xy');
    const flexTail = new THREE.Mesh(flexGeo, mats.ultra.evfOemFlexRibbon);
    flexTail.position.set(11.1, -7.2, 0.24);
    const flexGold = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, 0.24), mats.goldPlating);
    flexGold.position.set(11.1, -9.2, 0.24);
    flexGold.userData.noEdges = true;
    irLedsGroup.add(flexTail, flexGold);
    enrichE05IrLeds(irLedsGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-ir-leds',
      5,
      '#e11d48',
      irLedsGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -27.55),
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
    // Compact optical aperture 16.4 x 7.4 mm inside 18.6 x 8.8 mm frame -> exact Z span [-27.00, -20.20] at posZ=-23.60!
    const mirrorTilt = new THREE.Group();
    mirrorTilt.rotation.x = -Math.PI / 4;

    // Precision CNC machined anodized aluminum 45° mirror bezel with stepped optical shelf
    const frameShape = createFrameShape(18.6, 8.8, 1.1, 16.0, 6.8, 0.65);
    const frame = new THREE.Mesh(
      extrudeHiRes(frameShape, 0.82, 0.08, 0.08, 2, 20),
      mats.matteBlackAnodized
    );
    mirrorTilt.add(frame);

    // Inner matte-black velvet light-trap ledge framing the 0.50mm dichroic glass
    const innerStep = new THREE.Mesh(
      extrudeHiRes(createFrameShape(17.0, 7.6, 0.7, 15.8, 6.6, 0.55), 0.34, 0.03, 0.03, 1, 16),
      mats.velvetFlockTrap
    );
    innerStep.position.z = 0.24;
    mirrorTilt.add(innerStep);

    // 4 precision formed phosphor-bronze leaf spring retention clips + micro M1.0 brass anchor screws
    for (const [cx, cy, sx] of [
      [-8.4, 2.5, -1],
      [8.4, 2.5, 1],
      [-8.4, -2.5, -1],
      [8.4, -2.5, 1],
    ] as Array<[number, number, number]>) {
      const clipRib = new THREE.Mesh(
        buildFlatRibbonExtrude(
          [
            [sx * 0.9, 0.1],
            [sx * 0.15, 0.18],
            [-sx * 0.7, -0.12],
          ],
          0.2,
          2.0,
          'xz'
        ),
        mats.beCuSpring
      );
      clipRib.position.set(cx, cy, -0.44);
      mirrorTilt.add(clipRib);

      const mScr = createPrecisionScrew(0.36, 0.18, 0.48, mats.brassGear);
      mScr.rotation.x = Math.PI;
      mScr.position.set(cx + sx * 0.45, cy, -0.5);
      mirrorTilt.add(mScr);
    }

    // Ultra-thin multi-layer dielectric Dichroic Hot Mirror glass plate (magenta-gold 850nm reflection sheen!)
    const plate = new THREE.Mesh(
      createChamferedBoxGeo(16.4, 7.2, 0.48, 0.25, 0.04, 'z'),
      mats.evfDichroicMirror
    );
    plate.userData.edgeOpacity = 0.48;
    mirrorTilt.add(plate);

    // Subtle secondary broadband AR rear surface highlight film on +Z face
    const rearAr = new THREE.Mesh(
      new THREE.PlaneGeometry(15.8, 6.6),
      mats.evfAntiFogGlass
    );
    rearAr.position.z = 0.26;
    rearAr.userData.noEdges = true;
    mirrorTilt.add(rearAr);

    // Polished ground-glass dielectric edge rim
    const edgeRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.6, 7.4, 0.4, 16.0, 6.8, 0.3), 0.52, 0.03, 0.03, 1, 16),
      mats.evfGlassEdgeRim
    );
    mirrorTilt.add(edgeRim);

    dichroicGroup.add(mirrorTilt);

    // Left & right precision alignment pivot trunnions with D-flat angle keyways & stainless thrust washers
    for (const sx of [-1, 1]) {
      const collar = new THREE.Mesh(
        hiResCyl(1.4, 1.4, 0.55, 20).rotateZ(Math.PI / 2),
        mats.brassGear
      );
      collar.position.set(sx * 9.55, 0, 0);
      const trunnion = new THREE.Mesh(
        hiResCyl(0.95, 0.95, 2.2, 20).rotateZ(Math.PI / 2),
        mats.stainlessMachined
      );
      trunnion.position.set(sx * 10.6, 0, 0);
      // Keyed angular alignment flat on trunnion tip locking exact 45.0° ±0.05° orientation
      const keyFlat = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.15, 0.52), mats.titaniumRivet);
      keyFlat.position.set(sx * 11.75, 0, 0);
      keyFlat.userData.noEdges = true;
      dichroicGroup.add(collar, trunnion, keyFlat);
    }
    enrichE06DichroicMirror(dichroicGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-dichroic-mirror',
      6,
      '#db2777',
      dichroicGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -23.6),
      new THREE.Vector3(0, 0, -16),
      new THREE.Vector3(0, 34, -6),
      cp,
      0.28
    )
  );

  // =========================================================================
  // E07: Eye-Control AF 307K-Pixel (640×480) NIR Gaze Camera
  //      (Mounted straight below E06 at Z=-23.60 inside Mainboard top-center EVF notch!)
  // =========================================================================
  const gazeCamGroup = new THREE.Group();
  {
    // Emerald mini HDI camera carrier PCB facing +Y (3 holes match E28 alignment studs cleanly, strictly interior!)
    const camPcbShape = createRoundedRectShape(14.8, 8.4, 1.2);
    addCircleHoles(camPcbShape, [
      [-4.6, -3.1, 0.72],
      [4.6, -3.1, 0.72],
      [0.0, 3.25, 0.72],
    ]);
    const camPcbGeo = applyPlanarUVs(
      extrudeHiRes(camPcbShape, 0.85, 0.06, 0.06, 2, 20).rotateX(Math.PI / 2),
      14.8,
      8.4,
      'xz'
    );
    const camPcb = new THREE.Mesh(camPcbGeo, mats.ultra.evfTconPcb);
    camPcb.position.y = -2.0;
    gazeCamGroup.add(camPcb);

    // White HTCC alumina ceramic CLCC sensor package with gold castellation solder fillets (world Z_max=-21.22, clears E28 stud!)
    const pkg = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 0.92, 4.6, 0.45, 0.08, 'y'),
      mats.ceramicAlumina
    );
    pkg.position.y = -1.06;
    gazeCamGroup.add(pkg);

    // Castellated ENIG gold leads along all 4 sides of the CLCC package
    for (let i = -3; i <= 3; i++) {
      for (const sz of [-2.32, 2.32]) {
        const cast = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.62, 0.18), mats.goldPlating);
        cast.position.set(i * 0.98, -1.18, sz);
        cast.userData.noEdges = true;
        gazeCamGroup.add(cast);
      }
    }

    // Gleaming 307K-pixel (640×480) 850nm NIR Line-of-Sight CMOS silicon sensor die looking straight +Y!
    const nirDieGeo = applyPlanarUVs(new THREE.BoxGeometry(5.2, 0.3, 3.2), 5.2, 3.2, 'xz');
    const nirDie = new THREE.Mesh(nirDieGeo, mats.ultra.evfGazeNirDie);
    nirDie.position.y = -0.52;
    gazeCamGroup.add(nirDie);

    // Stepped gold perimeter wire-bond shelf ring + 14 authentic ball-to-stitch gold wirebond loops!
    const padRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(6.8, 4.2, 0.38, 5.4, 3.3, 0.22), 0.14, 0.02, 0.02, 1, 12).rotateX(
        Math.PI / 2
      ),
      mats.goldPlating
    );
    padRing.position.y = -0.54;
    gazeCamGroup.add(padRing);

    for (let i = -3; i <= 3; i++) {
      for (const sz of [-1, 1]) {
        const wb = buildGoldWirebondLoop(
          new THREE.Vector3(i * 0.72, -0.36, sz * 1.5),
          new THREE.Vector3(i * 0.72, -0.46, sz * 1.98),
          0.26,
          0.04,
          mats.goldPlating
        );
        gazeCamGroup.add(wb);
      }
    }

    // Miniature companion LDO voltage regulator & 0402 bypass MLCC array flanking the CLCC package
    const ldo = buildChipPackage({
      w: 1.9,
      d: 1.5,
      h: 0.48,
      style: 'dfn',
      pinsPerSide: 3,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      axis: 'y',
    });
    ldo.position.set(5.8, -1.32, 0.4);
    gazeCamGroup.add(ldo);
    for (const cz of [-1.5, -0.5, 0.5, 1.5]) {
      const cap = buildSmdPassive(0.84, 0.46, 0.34, mats.smdCeramic, mats.silverElectrode, 'y');
      cap.position.set(-5.8, -1.38, cz);
      gazeCamGroup.add(cap);
    }

    // Micro B2B mezzanine gold connector & shielded orange Sony OEM FPC tail routing +Z under barrel (clears +3.25 stud!)
    const b2b = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 0.68, 1.5, 0.2, 0.05, 'y'),
      mats.zifIvoryPlastic
    );
    b2b.position.set(0, -2.76, 1.15);
    const fpcGeo = applyPlanarUVs(new THREE.BoxGeometry(4.8, 0.2, 4.4), 4.8, 4.4, 'xz');
    const fpc = new THREE.Mesh(fpcGeo, mats.ultra.evfOemFlexRibbon);
    fpc.position.set(0, -2.88, 3.6);
    const fpcGold = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.24, 1.0), mats.goldPlating);
    fpcGold.position.set(0, -2.88, 5.6);
    fpcGold.userData.noEdges = true;
    gazeCamGroup.add(b2b, fpc, fpcGold);

    // 4 Corner Phillips M1.2 mounting screws (clear of E28 alignment studs at (±4.6, -3.1)!)
    for (const [sx, sz] of [
      [-6.35, -3.2],
      [6.35, -3.2],
      [-6.35, 3.2],
      [6.35, 3.2],
    ]) {
      const scr = buildPhillipsScrew(
        0.44,
        0.24,
        0.28,
        0.88,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.rotation.x = Math.PI;
      scr.position.set(sx, -1.52, sz);
      gazeCamGroup.add(scr);
    }
    enrichE07GazeCamera(gazeCamGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-gaze-camera',
      7,
      '#9333ea',
      gazeCamGroup,
      new THREE.Vector3(0, 25.05, -23.6),
      new THREE.Vector3(0, -18, -16),
      new THREE.Vector3(0, 12, -6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E08: Rear Large-Aperture Double-Sided Aspheric Eyepiece Lens (G4)
  //      (φ20.0mm GMo glass-molded double aspheric, ZEISS T* multi-layer AR)
  // =========================================================================
  const lensRearGroup = new THREE.Group();
  {
    // High-res curved double-convex glass-molded (GMo) aspheric eyepiece lens (φ20.0 mm)
    // Edge z in [-0.75, +0.75], -Z apex at -1.90 (world -17.30), +Z apex at +1.80 (world -13.60)
    const glassGeo = markHiRes(createOpticalLensGeometry(10.0, 1.5, 1.05, 1.15, -0.22, 0.18, 26, 52));
    const glass = new THREE.Mesh(glassGeo, mats.evfLensAspheric);
    glass.userData.edgeOpacity = 0.34;
    lensRearGroup.add(glass);

    // Frosted ground-glass outer edge chamfer rings tucked inside R=10.00 (clears E50 Sumi-Nuri at R=10.06!)
    for (const rz of [-0.62, 0.62]) {
      const rim = new THREE.Mesh(hiResTorus(9.88, 0.08, 10, 48), mats.evfGlassEdgeRim);
      rim.position.z = rz;
      rim.userData.noEdges = true;
      lensRearGroup.add(rim);
    }

    // CNC stepped matte-black anodized aluminum lens mounting cell (innerR=10.22 clears E50 edge blackening!)
    const cell = createSteppedLensCell(10.22, 11.72, 2.32, mats.matteBlackAnodized, mats.velvetFlockTrap, 3);
    lensRearGroup.add(cell);

    // Outer stepped alignment shoulder ring seating cleanly inside E18 inner bore (outerR=11.84 clears floor!)
    const stepShoulder = new THREE.Mesh(
      extrudeHiRes(
        (() => {
          const s = new THREE.Shape();
          s.absarc(0, 0, 11.84, 0, Math.PI * 2, false);
          const h = new THREE.Path();
          h.absarc(0, 0, 11.74, 0, Math.PI * 2, true);
          s.holes.push(h);
          return s;
        })(),
        0.72,
        0.03,
        0.03,
        1,
        36
      ),
      mats.evfHousingMg
    );
    stepShoulder.position.z = 0.56;
    lensRearGroup.add(stepShoulder);

    // Rear elastomeric thermal-expansion cushion O-ring cushioning G4 glass against cell shoulder
    const cushionO = new THREE.Mesh(hiResTorus(10.08, 0.12, 8, 40), mats.epdmGasket);
    cushionO.position.z = 0.96;
    cushionO.userData.noEdges = true;
    lensRearGroup.add(cushionO);
    enrichE08RearLens(lensRearGroup, mats);
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
    // +Z cemented face: z(u) = -0.325 + 1.40*(1 - u^2) — matches E68 UV cement & G2 flint to 0.000mm!
    const edCrownGeo = markHiRes(createOpticalLensGeometry(9.0, 1.25, 1.4, 1.1, 0.0, 0.12, 24, 52));
    const edCrown = new THREE.Mesh(edCrownGeo, mats.evfLensEd);
    edCrown.position.z = -0.95;
    edCrown.userData.edgeOpacity = 0.34;
    lensEdGroup.add(edCrown);

    // Element G2 (front/+Z side): High-Index Lanthanum Negative Concave Flint (S-TIH cobalt tint)
    // -Z cemented face: z(u) = -0.165 + 1.40*(1 - u^2) — exact 0.16mm envelope housing 0.055mm E68 UV cement!
    const flintGeo = markHiRes(createOpticalLensGeometry(9.0, 2.3, -0.45, -1.4, 0.08, 0.0, 24, 52));
    const flint = new THREE.Mesh(flintGeo, mats.evfLensField);
    flint.position.z = 0.985;
    flint.userData.edgeOpacity = 0.34;
    lensEdGroup.add(flint);

    // CNC Machined Magnesium Sliding Diopter Focus Carriage (innerR=9.24 clears E50, outerR=10.42 clears E11!)
    const carriage = createSteppedLensCell(9.24, 10.42, 3.76, mats.magnesiumCast, mats.velvetFlockTrap, 3);
    carriage.position.z = 0.3;
    lensEdGroup.add(carriage);

    // Rear brass threaded spanner retaining ring locking G2/G3 doublet into magnesium carriage
    const edRetain = createSpannerRetainerRing(
      8.82,
      9.95,
      0.42,
      mats.brassGear,
      mats.matteBlackAnodized,
      4,
      -1
    );
    edRetain.position.z = -1.94;
    lensEdGroup.add(edRetain);

    // Right-side (-X, photographer's right!) CNC lead-screw drive lug arm + HOLLOW C-collar yoke cradling E53 nut!
    const driveArm = new THREE.Mesh(
      createChamferedBoxGeo(2.2, 2.6, 2.1, 0.35, 0.08, 'z'),
      mats.magnesiumCast
    );
    driveArm.position.set(-11.45, 0, 0.15);
    lensEdGroup.add(driveArm);

    const nutYoke = createSteppedLensCell(2.04, 2.45, 2.2, mats.brassGear, undefined, 0);
    nutYoke.position.set(-14.8, 0, 0.15);
    lensEdGroup.add(nutYoke);

    // TRUE KINEMATIC 2-AXIS SUPPORT (HOLLOW RUNNING-FIT BORES clearing E10 Ø1.24mm rods by 0.065mm!):
    // 1. Upper-right (-11.4, +6.8): Closed precision stainless sleeve + pressed HOLLOW PTFE inner bushing!
    const mainGusset = new THREE.Mesh(
      createChamferedBoxGeo(1.75, 2.0, 2.4, 0.25, 0.06, 'z'),
      mats.magnesiumCast
    );
    mainGusset.position.set(-10.05, 5.95, 0.15);
    mainGusset.rotation.z = -0.54;
    const mainSleeve = createSteppedLensCell(0.82, 1.24, 3.3, mats.stainlessMachined, undefined, 0);
    mainSleeve.position.set(-11.4, 6.8, 0.15);
    const ptfeLiner = createSteppedLensCell(0.7, 0.8, 3.6, mats.lcdDiffuserMatte, undefined, 0);
    ptfeLiner.position.set(-11.4, 6.8, 0.15);
    lensEdGroup.add(mainGusset, mainSleeve, ptfeLiner);

    // 2. Lower-left (+11.4, -6.8): Open U-fork anti-rotation kinematic guide saddle (zero thermal binding!)
    const uForkShape = new THREE.Shape();
    uForkShape.moveTo(2.0, -1.38);
    uForkShape.lineTo(2.0, -0.78);
    uForkShape.lineTo(0.22, -0.78);
    uForkShape.absarc(0, 0, 0.78, -Math.PI * 0.5, Math.PI * 0.5, true);
    uForkShape.lineTo(2.0, 0.78);
    uForkShape.lineTo(2.0, 1.38);
    uForkShape.lineTo(-1.45, 1.38);
    uForkShape.lineTo(-1.45, -1.38);
    uForkShape.closePath();
    const uFork = new THREE.Mesh(
      extrudeHiRes(uForkShape, 3.2, 0.06, 0.06, 1, 16),
      mats.stainlessMachined
    );
    uFork.position.set(11.4, -6.8, 0.15);
    uFork.rotation.z = -0.52;
    lensEdGroup.add(uFork);
    enrichE09EdDoublet(lensEdGroup, mats);
  }
  const edLensPart = finalizeEvfPart(
    'evf-lens-ed-doublet',
    9,
    '#10b981',
    lensEdGroup,
    new THREE.Vector3(0, EVF_OPTICAL_Y, -9.4),
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
      [-11.4, 6.8],
      [11.4, -6.8],
    ];
    for (const [rx, ry] of rodCoords) {
      // Centerless-ground mirror-lapped SUS420J2 hardened linear guide shaft (spans exact diopter travel Z=[-13.6,-4.2]!)
      const shaft = new THREE.Mesh(
        hiResCyl(0.62, 0.62, 9.2, 22).rotateX(Math.PI / 2),
        mats.mountStainlessFlange
      );
      shaft.position.set(rx, ry, 0);
      diopterRailsGroup.add(shaft);

      // Chamfered tapered assembly lead-in tips on both ends of shaft
      for (const sz of [-4.78, 4.78]) {
        const tip = new THREE.Mesh(
          hiResCyl(sz > 0 ? 0.44 : 0.62, sz > 0 ? 0.62 : 0.44, 0.36, 18).rotateX(Math.PI / 2),
          mats.stainlessMachined
        );
        tip.position.set(rx, ry, sz);
        tip.userData.noEdges = true;
        diopterRailsGroup.add(tip);
      }

      // Anti-backlash phosphor-bronze helical preload compression spring seated cleanly between E09 & front end-mount!
      const preloadSpring = new THREE.Mesh(
        markHiRes(createHelicalSpringGeometry(0.92, 2.0, 6, 0.14)),
        mats.brassGear
      );
      preloadSpring.position.set(rx, ry, 2.75);
      preloadSpring.userData.noEdges = true;
      diopterRailsGroup.add(preloadSpring);

      for (const wz of [1.62, 3.88]) {
        const sWash = createSteppedLensCell(0.68, 1.12, 0.18, mats.stainlessMachined, undefined, 0);
        sWash.position.set(rx, ry, wz);
        diopterRailsGroup.add(sWash);
      }

      // Front & rear self-lubricating white PTFE flanged end-mount bushings + authentic E-clips!
      for (const sz of [-4.25, 4.45]) {
        const endMount = createSteppedLensCell(0.68, 1.12, 0.72, mats.pomGear, undefined, 0);
        endMount.position.set(rx, ry, sz);
        const flange = createSteppedLensCell(0.7, 1.42, 0.24, mats.lcdDiffuserMatte, undefined, 0);
        flange.position.set(rx, ry, sz + (sz > 0 ? -0.32 : 0.32));
        diopterRailsGroup.add(endMount, flange);

        const eClip = buildEClip(0.64, 1.08, 0.18, mats.mountSpringSteel);
        eClip.position.set(rx, ry, sz + (sz > 0 ? -0.56 : 0.56));
        diopterRailsGroup.add(eClip);
      }
    }
    enrichE10DiopterRails(diopterRailsGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-rails',
      10,
      '#64748b',
      diopterRailsGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -9.0),
      new THREE.Vector3(28, -14, 12),
      new THREE.Vector3(26, 20, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E11: Helical Spiral-Cam Diopter Barrel Sleeve & Brass Sector Pinion
  // =========================================================================
  const helicoidGroup = new THREE.Group();
  {
    // Concentric CNC-machined SLOTTED helicoid cam barrel encircling E09 carriage (innerR=10.62, outerR=11.20)
    // 2 real machined arc wall segments leaving clean radial cutouts for -X drive arm (180°) & guide gussets (+149°, -31°)!
    const arcSpans: Array<[number, number]> = [
      [-0.06, 2.38],  // Upper/left quadrant (-3° .. +136°)
      [3.54, 5.42],   // Lower quadrant (+203° .. +311°)
    ];
    for (const [aStart, aEnd] of arcSpans) {
      const segShape = new THREE.Shape();
      segShape.absarc(0, 0, 11.2, aStart, aEnd, false);
      segShape.absarc(0, 0, 10.62, aEnd, aStart, true);
      segShape.closePath();
      const segWall = new THREE.Mesh(
        extrudeHiRes(segShape, 5.1, 0.04, 0.04, 2, 28),
        mats.matteBlackAnodized
      );
      helicoidSleeveGroup.add(segWall);
    }

    // Front & rear continuous hardened stainless thrust-bearing race rings tying the slotted helicoid together!
    for (const sz of [-2.85, 2.85]) {
      const ring = createSpannerRetainerRing(
        10.62,
        11.25,
        0.42,
        mats.mountStainlessFlange,
        mats.matteBlackAnodized,
        4,
        sz > 0 ? 1 : -1
      );
      ring.position.z = sz;
      helicoidSleeveGroup.add(ring);
    }

    // 3x recessed helical spiral cam-slot tracks placed on clean wall arcs (85°, 228°, 290° — exact match to E71 rollers!)
    const camAngles = [1.48, 3.98, 5.06];
    for (const angle of camAngles) {
      const slotTrack = new THREE.Group();
      slotTrack.rotation.z = angle;

      // Twin parallel beveled C3604 brass cam-guide rails defining the spiral slot channel (clear gap ±0.66mm for E71 rollers!)
      for (const offsetY of [-0.86, 0.86]) {
        const rail = new THREE.Mesh(
          createChamferedBoxGeo(0.38, 0.28, 4.4, 0.05, 0.02, 'z'),
          mats.brassGear
        );
        rail.position.set(11.42, offsetY, 0);
        rail.rotation.x = 0.24;
        slotTrack.add(rail);
      }

      // Dark recessed spiral slot floor between brass guide rails (maxR=11.24, 0.09mm clear beneath E71 roller 11.33!)
      const slotFloor = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.32, 4.2), mats.velvetFlockTrap);
      slotFloor.position.set(11.19, 0, 0);
      slotFloor.rotation.x = 0.24;
      slotFloor.userData.noEdges = true;
      slotTrack.add(slotFloor);

      helicoidSleeveGroup.add(slotTrack);
    }

    // Precision-hobbed C3604 brass radial involute sector gear arc on lower-right (-X) flank (+192°..+212°, clear of E12!)
    const webArc = new THREE.Mesh(
      hiResTorus(11.35, 0.24, 8, 18, 0.56),
      mats.brassGear
    );
    webArc.rotation.z = Math.PI + 0.12;
    webArc.position.z = -2.85;
    webArc.userData.noEdges = true;
    helicoidSleeveGroup.add(webArc);

    for (let t = -3; t <= 3; t++) {
      const a = Math.PI + 0.4 + t * 0.082;
      const tooth = new THREE.Mesh(
        createChamferedBoxGeo(0.72, 0.34, 0.56, 0.04, 0.02, 'z'),
        mats.brassGear
      );
      tooth.position.set(Math.cos(a) * 11.72, Math.sin(a) * 11.72, -2.85);
      tooth.rotation.z = a;
      tooth.userData.noEdges = true;
      helicoidSleeveGroup.add(tooth);
    }

    helicoidGroup.add(helicoidSleeveGroup);
    enrichE11Helicoid(helicoidSleeveGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-helicoid',
      11,
      '#ca8a04',
      helicoidGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -9.4),
      new THREE.Vector3(-30, 8, 12),
      new THREE.Vector3(-28, 46, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E12: Precision Helical Diopter Dial & Brass Lead Screw Mechanism
  //      (True Sony α7 IV RIGHT-side -X mounting coaxial at (-19.20, 39.50, -15.60)!)
  // =========================================================================
  const diopterGroup = new THREE.Group();
  const diopterDialGroup = new THREE.Group();
  const leadScrewGroup = new THREE.Group();
  {
    // Compact anodized support spine tie-bar seated cleanly below E09 nutYoke & E53 inside E18 -X right diopter bay!
    // Part origin is coaxial with diopterDialGroup at world (-19.20, 39.50, -15.60) so V2 compiled animatedNodes has (0,0,0) offset!
    const bracket = new THREE.Mesh(
      createChamferedBoxGeo(1.05, 0.58, 10.2, 0.16, 0.04, 'z'),
      mats.matteBlackAnodized
    );
    bracket.position.set(4.2, -2.95, 6.9);
    diopterGroup.add(bracket);

    // Front & rear CNC magnesium bearing pillow blocks with HOLLOW pressed-in sintered bronze sleeve bearings!
    // Block centered at world X=-14.90, width 3.25 -> world minX=-16.585 (0.20mm clear of E54 eClip at -16.78!)
    for (const sz of [-4.4, 5.8]) {
      const blkShape = createRoundedRectShape(3.25, 4.0, 0.55);
      addCircleHoles(blkShape, [[0.1, 0, 1.38]]);
      const block = new THREE.Mesh(
        extrudeHiRes(blkShape, 1.25, 0.06, 0.06, 2, 18),
        mats.magnesiumCast
      );
      block.position.set(4.3, 0, sz + 6.2);
      const oilite = createSteppedLensCell(0.84, 1.35, 1.48, mats.brassGear, undefined, 0);
      oilite.position.set(4.4, 0, sz + 6.2);
      diopterGroup.add(block, oilite);

      // Anchor screw on pillow block ear
      const bScr = createPrecisionScrew(0.46, 0.22, 0.72, mats.stainlessMachined);
      bScr.position.set(3.08, 1.35, sz + 6.2 + (sz > 0 ? 0.68 : -0.68));
      if (sz < 0) bScr.rotation.x = Math.PI;
      diopterGroup.add(bScr);
    }

    // Gleaming Turned C3604 Brass Acme/Trapezoidal Helical Lead Screw (world X=-14.80, Z=-9.40, R=0.76 clears E53 bore R=1.08!)
    const screwCore = new THREE.Mesh(
      hiResCyl(0.76, 0.76, 13.4, 22).rotateX(Math.PI / 2),
      mats.brassGear
    );
    screwCore.position.z = 0.2;
    leadScrewGroup.add(screwCore);

    // Continuous trapezoidal helical thread ridges along brass lead screw (outer R = 0.94 < E53 innerR 1.08)
    const threadHelix = new THREE.Mesh(
      markHiRes(createHelicalSpringGeometry(0.84, 8.8, 12, 0.11)),
      mats.brassGear
    );
    threadHelix.position.z = 0.7;
    threadHelix.userData.noEdges = true;
    leadScrewGroup.add(threadHelix);

    // Retaining E-clip on front journal shoulder
    const leadClip = buildEClip(0.72, 1.18, 0.2, mats.mountSpringSteel);
    leadClip.position.z = 6.72;
    leadScrewGroup.add(leadClip);

    // Rear 16-tooth brass involute spur drive pinion driven by pull-out diopter dial (world Z = -15.60)
    const screwGear = new THREE.Mesh(
      markHiRes(createSpurGearGeometry(16, 1.72, 1.12, 0.68)),
      mats.brassGear
    );
    screwGear.position.z = -6.2;
    leadScrewGroup.add(screwGear);
    leadScrewGroup.position.set(4.4, 0, 6.2);
    diopterGroup.add(leadScrewGroup);

    // External Knurled Push-Lock Diopter Adjustment Dial (zero local offset -> exact coaxial world (-19.20, 39.50, -15.60)!)
    diopterDialGroup.position.set(0, 0, 0);
    const dialShaft = new THREE.Mesh(
      hiResCyl(0.92, 0.92, 5.4, 22).rotateZ(Math.PI / 2),
      mats.stainlessMachined
    );
    dialShaft.position.x = 0.45;
    diopterDialGroup.add(dialShaft);

    // Mating 14-tooth POM bevel/spur gear on dial shaft (world X = -16.35, clear of E54 at -16.78!)
    const dialGear = new THREE.Mesh(
      markHiRes(createSpurGearGeometry(14, 1.55, 1.1, 0.54).rotateY(Math.PI / 2)),
      mats.pomGear
    );
    dialGear.position.x = 2.85;
    diopterDialGroup.add(dialGear);

    // Lathe-turned chamfered anodized thumbwheel drum facing -X (world X in [-23.18, -21.18], clear of E21 & E37 cap!)
    const drumPts: THREE.Vector2[] = [
      new THREE.Vector2(0.96, -1.0),
      new THREE.Vector2(3.85, -1.0),
      new THREE.Vector2(4.2, -0.7),
      new THREE.Vector2(4.2, 0.78),
      new THREE.Vector2(3.85, 1.0),
      new THREE.Vector2(0.02, 1.0),
    ];
    const drumGeo = markHiRes(new THREE.LatheGeometry(drumPts, 36));
    drumGeo.rotateZ(Math.PI / 2);
    drumGeo.computeVertexNormals();
    const drum = new THREE.Mesh(drumGeo, mats.matteBlackAnodized);
    drum.position.x = -2.98;
    diopterDialGroup.add(drum);

    // 28 crisp tactile machined diamond-flute knurling ribs around thumbwheel rim
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const flute = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.3, 0.3), mats.evfHousingMg);
      flute.position.set(-2.98, Math.cos(a) * 4.22, Math.sin(a) * 4.22);
      flute.rotation.x = a;
      flute.userData.noEdges = true;
      diopterDialGroup.add(flute);
    }

    diopterGroup.add(diopterDialGroup);
    enrichE12Diopter(diopterGroup, leadScrewGroup, diopterDialGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-mech',
      12,
      '#d97706',
      diopterGroup,
      new THREE.Vector3(-19.2, EVF_OPTICAL_Y, -15.6),
      new THREE.Vector3(-16, -24, 12),
      new THREE.Vector3(-24, 24, 14),
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
    // posZ = -2.42: edge z in [-0.675, +0.675], +Z apex at +1.455 (world -0.965, E49 coating apex -0.886!)
    const fieldGlassGeo = markHiRes(createOpticalLensGeometry(8.8, 1.35, 0.78, -0.35, -0.22, 0.1, 24, 52));
    const fieldGlass = new THREE.Mesh(fieldGlassGeo, mats.evfLensField);
    fieldGlass.userData.edgeOpacity = 0.34;
    lensFieldGroup.add(fieldGlass);

    // Ground-glass edge bevel rings tucked inside R=8.80 (clears E50 Sumi-Nuri at R=8.87!)
    for (const rz of [-0.52, 0.52]) {
      const rim = new THREE.Mesh(hiResTorus(8.68, 0.08, 10, 44), mats.evfGlassEdgeRim);
      rim.position.z = rz;
      rim.userData.noEdges = true;
      lensFieldGroup.add(rim);
    }

    // CNC stepped anodized lens cell (innerR=9.02 clears E50 edge blackening, outerR=10.45 clears E69 collar!)
    const cell = createSteppedLensCell(9.02, 10.45, 1.78, mats.matteBlackAnodized, mats.velvetFlockTrap, 3);
    lensFieldGroup.add(cell);

    // 4-slot blackened brass retaining ring on front face
    const g1Retain = createSpannerRetainerRing(
      8.58,
      9.68,
      0.34,
      mats.brassGear,
      mats.matteBlackAnodized,
      4,
      -1
    );
    g1Retain.position.z = -1.14;
    lensFieldGroup.add(g1Retain);

    // Integrated anodized optical field-stop flange with precision 4:3 OLED aperture mask & 4 datum holes
    // World Z in [-0.80, -0.52] -> 0.086mm clear ahead of E49 G1 coating (-0.886) and clear behind E22 (-0.35)!
    const maskShape = createFrameShape(21.2, 18.2, 2.6, 14.4, 11.0, 0.6);
    addCircleHoles(maskShape, [
      [-9.0, 7.2, 0.65],
      [9.0, 7.2, 0.65],
      [-9.0, -7.2, 0.65],
      [9.0, -7.2, 0.65],
    ]);
    const mask = new THREE.Mesh(
      extrudeHiRes(maskShape, 0.24, 0.02, 0.02, 2, 24),
      mats.matteBlackAnodized
    );
    mask.position.z = 1.76;
    lensFieldGroup.add(mask);

    // Inner velvety stray-light aperture frame lip on +Z OLED side (world Z in [-0.56, -0.46])
    const innerLip = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.6, 12.2, 0.7, 14.2, 10.8, 0.4), 0.08, 0.01, 0.01, 1, 16),
      mats.velvetFlockTrap
    );
    innerLip.position.z = 1.91;
    lensFieldGroup.add(innerLip);
    enrichE13FieldLens(lensFieldGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-lens-field',
      13,
      '#4f46e5',
      lensFieldGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -2.42),
      new THREE.Vector3(0, 0, 26),
      new THREE.Vector3(0, 34, 24),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E14: 0.64-inch 9.44M-Dot Quad-XGA 2-Stack Tandem Micro-OLED (OLEDoS)
  //      (Sony Semiconductor ECX337AA-1 / ECX345F — Kovar Hermetic Carrier & Emissive Plane!)
  // =========================================================================
  const oledGroup = new THREE.Group();
  let oledScreenMesh!: THREE.Mesh;
  {
    // Precision Kovar outer hermetic rear baseplate (world Z in [+4.54, +5.02], flush 0.08mm behind E60 carrier!)
    const backShape = createRoundedRectShape(23.8, 18.8, 1.5);
    const backPlate = new THREE.Mesh(
      extrudeHiRes(backShape, 0.42, 0.05, 0.05, 2, 22),
      mats.ceramicAlumina
    );
    backPlate.position.z = 0.02;
    oledGroup.add(backPlate);

    // Hollow outer Kovar perimeter pocket wall cleanly cradling E60 (21.6x16.6) with 0.25mm radial clearance!
    const wallShape = createFrameShape(23.8, 18.8, 1.5, 22.1, 17.1, 1.1);
    const wallBezel = new THREE.Mesh(
      extrudeHiRes(wallShape, 0.92, 0.06, 0.06, 2, 22),
      mats.kovarSeal
    );
    wallBezel.position.z = -0.72;
    oledGroup.add(wallBezel);

    // Rear (+Z) Sony LCD902 Factory 2D DataMatrix/QR Calibration Backplate + Gold Thermal Die-Attach Pad!
    const qrBackGeo = applyPlanarUVs(new THREE.PlaneGeometry(21.4, 16.8), 21.4, 16.8, 'xy');
    const qrBack = new THREE.Mesh(qrBackGeo, mats.ultra.evfOledBackplaneQr);
    qrBack.position.z = 0.29;
    qrBack.userData.noEdges = true;
    oledGroup.add(qrBack);

    // Active 0.64-inch (13.6 × 10.2 mm) 9.44M-Dot Quad-XGA Tandem Micro-OLED Emissive Display
    // Faces -Z at exact optical emissive plane world Z = +2.10 (0.06mm clear of E57 OCCF & E46 Tandem Cavity!)
    oledScreenMesh = new THREE.Mesh(markHiRes(new THREE.PlaneGeometry(13.6, 10.2)), mats.evfOledActive);
    oledScreenMesh.position.z = -2.66;
    oledScreenMesh.rotation.y = Math.PI;
    oledScreenMesh.userData.noEdges = true;
    oledGroup.add(oledScreenMesh);

    // Left & right compact Kovar optical registration mounting ears (tucked cleanly inside E18 inner wall!)
    for (const sx of [-1, 1]) {
      const earShape = createRoundedRectShape(1.8, 5.6, 0.72);
      addCircleHoles(earShape, [[sx * 0.1, 0, 0.5]]);
      const ear = new THREE.Mesh(extrudeHiRes(earShape, 0.44, 0.05, 0.05, 2, 16), mats.kovarSeal);
      ear.position.set(sx * 12.4, 0, 0.02);
      oledGroup.add(ear);

      // Gold plating ground pad ring around datum hole
      const gPad = new THREE.Mesh(hiResTorus(0.64, 0.11, 6, 18), mats.goldPlating);
      gPad.position.set(sx * 12.5, 0, -0.22);
      gPad.userData.noEdges = true;
      oledGroup.add(gPad);
    }

    // Bottom 60-pin FPC solder-pad bar emerging from carrier lower edge (mating cleanly above E48 FPC!)
    const fpcBar = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.82, 0.36), mats.goldPlating);
    fpcBar.position.set(0, -9.55, 0.08);
    fpcBar.userData.noEdges = true;
    oledGroup.add(fpcBar);
    enrichE14OledPanel(oledGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-oled-panel',
      14,
      '#2563eb',
      oledGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 4.76),
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
    // Low-CTE Kovar skeletonized kinematic leveling frame (world Z in [+5.14, +6.36], 0.09mm clear of E14 & E61-E65!)
    const kovarFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(24.0, 19.0, 2.0, 17.6, 13.6, 1.1), 0.56, 0.05, 0.05, 2, 22),
      mats.kovarSeal
    );
    oledAlignGroup.add(kovarFrame);

    // Raised perimeter stiffening wall along top & bottom edges
    for (const sy of [-8.8, 8.8]) {
      const stiff = new THREE.Mesh(
        createChamferedBoxGeo(15.6, 0.9, 0.3, 0.2, 0.04, 'z'),
        mats.kovarSeal
      );
      stiff.position.set(0, sy, 0.28);
      oledAlignGroup.add(stiff);
    }

    // 3 triangular kinematic leveling stations (Z-height, pitch & roll independent micron tuning!)
    const triPts: Array<[number, number]> = [
      [0, 8.2],
      [-10.0, -7.4],
      [10.0, -7.4],
    ];
    for (const [tx, ty] of triPts) {
      // Hexagonal threaded C3604 brass leveling collar boss
      const collar = new THREE.Mesh(
        hiResCyl(1.42, 1.42, 0.72, 6).rotateX(Math.PI / 2),
        mats.brassGear
      );
      collar.position.set(tx, ty, 0.02);
      oledAlignGroup.add(collar);

      // Ultra-fine-pitch M1.4×P0.20 slotted brass calibration screw
      const calScrew = buildPhillipsScrew(
        0.88,
        0.26,
        0.44,
        0.66,
        mats.brassGear,
        mats.matteBlackAnodized,
        mats.beCuSpring
      );
      calScrew.rotation.x = -Math.PI / 2;
      calScrew.position.set(tx, ty, 0.24);
      oledAlignGroup.add(calScrew);

      // Conical stainless V-cup seat + mirror-lapped white alumina ceramic spherical pivot ball
      const vCup = new THREE.Mesh(
        hiResCyl(0.88, 0.62, 0.24, 18).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      vCup.position.set(tx, ty, -0.32);
      const ball = new THREE.Mesh(hiResSphere(0.26, 14, 10), mats.ceramicAlumina);
      ball.position.set(tx, ty, -0.44);
      ball.userData.noEdges = true;
      oledAlignGroup.add(vCup, ball);

      // Translucent amber UV-cure optical-lock adhesive fillet bead sealing final factory calibration!
      const uvBead = new THREE.Mesh(hiResSphere(0.32, 10, 8), mats.opticalCementClear);
      uvBead.position.set(tx + (tx === 0 ? 1.25 : Math.sign(tx) * -1.25), ty, 0.22);
      uvBead.userData.noEdges = true;
      oledAlignGroup.add(uvBead);

      // Curved tempered SUS301 spring-steel preload leaf clip
      const clipAng = Math.atan2(-ty, -tx);
      const clip = new THREE.Mesh(
        buildFlatRibbonExtrude(
          [
            [-1.4, 0.0],
            [0.0, 0.18],
            [1.4, -0.04],
          ],
          0.16,
          1.15,
          'xz'
        ),
        mats.mountSpringSteel
      );
      clip.position.set(tx * 0.82, ty * 0.82, -0.36);
      clip.rotation.z = clipAng;
      oledAlignGroup.add(clip);
    }
    enrichE15OledAlign(oledAlignGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-oled-alignment',
      15,
      '#b45309',
      oledAlignGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 5.84),
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
    // 8-layer emerald HDI TCON PCB (world Z in [+7.36, +8.48]; Side-B -Z carries E61-E65, Side-A +Z carries TCON/PMIC/ZIF!)
    const pcbGeo = applyPlanarUVs(
      extrudeHiRes(createRoundedRectShape(24.4, 19.0, 1.6), 1.0, 0.06, 0.06, 2, 20),
      24.4,
      19.0,
      'xy'
    );
    const pcb = new THREE.Mesh(pcbGeo, mats.ultra.evfTconPcb);
    tconGroup.add(pcb);

    // Main 240Hz VESA DSC 1.2a Timing Controller QFN-64 ASIC with laser-marked top & silver leads!
    const tconIc = buildChipPackage({
      w: 7.4,
      d: 7.4,
      h: 0.92,
      style: 'qfn',
      pinsPerSide: 10,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      topAccentMat: mats.ultra.icEpoxyLaser,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    tconIc.position.set(-2.2, 1.2, 1.02);
    tconGroup.add(tconIc);

    // OLED Asymmetric Dual-Rail PMIC (ELVDD +7.5V / ELVSS -5.5V) QFN-32 IC
    const pmic = buildChipPackage({
      w: 4.4,
      d: 4.4,
      h: 0.84,
      style: 'qfn',
      pinsPerSide: 6,
      bodyMat: mats.icEpoxy,
      leadMat: mats.solderBallSilver,
      topAccentMat: mats.ultra.icEpoxyLaser,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    pmic.position.set(6.0, 3.0, 0.96);
    tconGroup.add(pmic);

    // 2x Molded metal-composite shielded SMD boost/inverting power inductors (ELVDD / ELVSS)
    for (const [ix, iy] of [
      [4.8, -2.9],
      [8.0, -2.9],
    ]) {
      const ind = buildShieldedInductor(
        2.25,
        1.04,
        mats.ferriteInductor,
        mats.silverElectrode,
        mats.stainlessMachined,
        'z'
      );
      ind.position.set(ix, iy, 1.08);
      tconGroup.add(ind);
    }

    // 4x Molded yellow tantalum filter capacitors with anode (+) polarity bars & silver J-leads!
    for (const [cx, cy] of [
      [-8.4, 4.4],
      [-8.4, 1.5],
      [-8.4, -1.5],
      [-8.4, -4.4],
    ]) {
      const cap = buildTantalumCap(
        2.0,
        1.2,
        0.86,
        mats.tantalumCapYellow,
        mats.copperHeatSpreader,
        mats.silverElectrode,
        'z'
      );
      cap.position.set(cx, cy, 0.98);
      tconGroup.add(cap);
    }

    // 8x Miniature 0402 ceramic MLCC power decoupling capacitors flanking TCON & PMIC
    for (const [mx, my] of [
      [-2.2, 6.0],
      [0.0, 6.0],
      [2.2, 6.0],
      [6.0, 6.0],
      [2.6, 1.6],
      [2.6, -0.4],
      [-5.4, -5.5],
      [1.4, -5.3],
    ]) {
      const mlcc = buildSmdPassive(1.0, 0.52, 0.42, mats.smdCeramic, mats.silverElectrode, 'z');
      mlcc.position.set(mx, my, 0.77);
      tconGroup.add(mlcc);
    }

    // 27.000 MHz Metal-Lid SMD Quartz Crystal Oscillator with 4 chamfered solder pads
    const xtalBase = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.0, 0.4, 0.22, 0.04, 'z'),
      mats.ceramicAlumina
    );
    xtalBase.position.set(-2.4, -5.2, 0.76);
    const xtalLid = new THREE.Mesh(
      createChamferedBoxGeo(2.45, 1.65, 0.32, 0.18, 0.04, 'z'),
      mats.mountStainlessFlange
    );
    xtalLid.position.set(-2.4, -5.2, 1.04);
    tconGroup.add(xtalBase, xtalLid);

    // 60-Pin Locking Flip-Actuator Ivory-and-Black ZIF FPC Connector (CN901 — clears E24 inner wall by 0.48mm!)
    const zifBody = new THREE.Mesh(
      createChamferedBoxGeo(11.2, 1.8, 0.9, 0.2, 0.05, 'z'),
      mats.zifIvoryPlastic
    );
    zifBody.position.set(0, -7.12, 1.02);
    const zifBail = new THREE.Mesh(new THREE.BoxGeometry(10.4, 0.58, 0.28), mats.icEpoxy);
    zifBail.position.set(0, -6.68, 1.52);
    tconGroup.add(zifBody, zifBail);
    for (let i = -8; i <= 8; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.56, 0.2), mats.goldPlating);
      pin.position.set(i * 0.6, -6.12, 0.66);
      pin.userData.noEdges = true;
      tconGroup.add(pin);
    }

    // Descending amber polyimide dual-stream FPC ribbon routed at local z=+0.18 (world Z=+8.10, clear of E24 & E55!)
    const fpcDropGeo = applyPlanarUVs(new THREE.BoxGeometry(9.6, 11.4, 0.22), 9.6, 11.4, 'xy');
    const fpcDrop = new THREE.Mesh(fpcDropGeo, mats.ultra.evfOemFlexRibbon);
    fpcDrop.position.set(0, -15.2, 0.18);
    tconGroup.add(fpcDrop);

    const fpcEmiGeo = applyPlanarUVs(new THREE.BoxGeometry(8.6, 8.2, 0.28), 8.6, 8.2, 'xy');
    const fpcEmiOverlay = new THREE.Mesh(fpcEmiGeo, mats.ultra.evfMipiShieldMesh);
    fpcEmiOverlay.position.set(0, -14.6, 0.2);
    tconGroup.add(fpcEmiOverlay);

    // Distal SUS stiffener + individual gold ZIF contact fingers
    const stiffBack = new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.0, 0.2), mats.stainlessMachined);
    stiffBack.position.set(0, -19.9, 0.08);
    const goldFingers = new THREE.Mesh(new THREE.BoxGeometry(9.2, 1.65, 0.28), mats.goldPlating);
    goldFingers.position.set(0, -20.1, 0.2);
    tconGroup.add(stiffBack, goldFingers);
    enrichE16TconPcb(tconGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-tcon-pcb',
      16,
      '#059669',
      tconGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 7.92),
      new THREE.Vector3(0, 0, 58),
      new THREE.Vector3(0, 34, 46),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E17: Micro-OLED Rear Copper/Aluminum Thermal Sink & High-k Silicone TIM
  //      Tightened to Z=+11.62 (0.06mm off E85 & bolted directly onto E18 front bosses!)
  // =========================================================================
  const heatsinkGroup = new THREE.Group();
  {
    // High-k 8.0 W/m·K sky-blue silicone TIM thermal interface pad (world Z in [+10.56, +11.02], 0.06mm off E85!)
    const timGeo = applyPlanarUVs(
      createChamferedBoxGeo(17.6, 13.2, 0.42, 0.7, 0.04, 'z'),
      17.6,
      13.2,
      'xy-back'
    );
    const tim = new THREE.Mesh(timGeo, mats.ultra.evfVfRadiationSheet);
    tim.position.z = -0.82;
    heatsinkGroup.add(tim);

    // Oxygen-free C1020 Pure Copper Base Heat Spreader Plate with brushed copper texture!
    const cuBaseGeo = applyPlanarUVs(
      extrudeHiRes(createRoundedRectShape(25.0, 19.4, 1.8), 0.92, 0.09, 0.09, 2, 22),
      25.0,
      19.4,
      'xy'
    );
    const cuBase = new THREE.Mesh(cuBaseGeo, mats.ultra.cfeCopperThermal);
    cuBase.position.z = -0.18;
    heatsinkGroup.add(cuBase);

    // Built-in precision NTC temperature-compensation thermistor bead + twin micro-leads potted in copper shoulder
    const ntcBead = new THREE.Mesh(hiResSphere(0.54, 12, 10), mats.icEpoxy);
    ntcBead.position.set(9.6, -7.0, -0.5);
    ntcBead.userData.noEdges = true;
    const ntcLead = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.32, 0.16), mats.polyimideFpc);
    ntcLead.position.set(11.0, -7.0, -0.5);
    ntcLead.userData.noEdges = true;
    heatsinkGroup.add(ntcBead, ntcLead);

    // CNC Black-Anodized Extruded Aluminum Finned Backing Plate
    const finBack = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(23.8, 18.2, 1.5), 0.56, 0.08, 0.08, 2, 20),
      mats.matteBlackAnodized
    );
    finBack.position.z = 0.62;
    heatsinkGroup.add(finBack);

    // 9 tapered chamfered CNC cooling fins with central horizontal cross-cut airflow channel!
    // Front face ends cleanly at local z = +2.42 (world Z = +14.04, 0.06mm flush behind E35 radiation sheet!)
    for (let i = -4; i <= 4; i++) {
      for (const fy of [-4.4, 4.4]) {
        const fin = new THREE.Mesh(
          createChamferedBoxGeo(1.1, 7.5, 1.48, 0.16, 0.08, 'z'),
          mats.matteBlackAnodized
        );
        fin.position.set(i * 2.52, fy, 1.62);
        heatsinkGroup.add(fin);
      }
    }

    // Left & right C1020 copper thermal-bridge mounting ears + Phillips stainless screws & spring washers
    for (const sx of [-1, 1]) {
      const earShape = createRoundedRectShape(4.2, 7.4, 1.4);
      addCircleHoles(earShape, [[sx * 0.2, 0, 0.92]]);
      const ear = new THREE.Mesh(
        applyPlanarUVs(extrudeHiRes(earShape, 0.92, 0.08, 0.08, 2, 16), 4.2, 7.4, 'xy'),
        mats.ultra.cfeCopperThermal
      );
      ear.position.set(sx * 14.1, 0, -0.18);
      heatsinkGroup.add(ear);

      const washer = new THREE.Mesh(
        hiResTorus(1.26, 0.16, 8, 20),
        mats.stainlessMachined
      );
      washer.position.set(sx * 14.3, 0, 0.42);
      washer.userData.noEdges = true;
      heatsinkGroup.add(washer);

      const scr = buildPhillipsScrew(
        0.96,
        0.44,
        0.5,
        1.55,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.rotation.x = -Math.PI / 2;
      scr.position.set(sx * 14.3, 0, 0.52);
      heatsinkGroup.add(scr);
    }
    enrichE17Heatsink(heatsinkGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-thermal-sink',
      17,
      '#c25e28',
      heatsinkGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 11.62),
      new THREE.Vector3(0, 0, 72),
      new THREE.Vector3(0, 34, 58),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E18: Weather-Sealed AZ91D Magnesium-Aluminum EVF Optical Barrel & Baffles
  //      (True Sony α7 IV Chirality: Solid Right Wall + Sleek -X Diopter Blister,
  //       Open +X Optical Cutaway, Integral L/R Stereo Mic Plinths & Front Heatsink Bosses!)
  // =========================================================================
  const housingGroup = new THREE.Group();
  {
    // World Z spans [-32.92, +10.20] -> local z in [-20.42, +22.70] (len = 43.12, center = +1.14)
    const zRear = -20.42;
    const zFront = 22.7;
    const barrelLen = zFront - zRear;
    const zMid = (zRear + zFront) * 0.5;

    // 1. Sculpted AZ91D Thixomolded Pentaprism Upper Arch Roof (solid -X right side, open +X cutaway, outer Y=53.80)
    const roofArch = new THREE.Shape();
    roofArch.moveTo(8.5, 13.0);
    roofArch.lineTo(4.5, 14.3);
    roofArch.lineTo(-4.5, 14.3);
    roofArch.lineTo(-13.8, 12.1);
    roofArch.lineTo(-15.0, 9.6);
    roofArch.lineTo(-15.0, 3.8);
    roofArch.lineTo(-13.6, 3.8);
    roofArch.lineTo(-13.6, 9.0);
    roofArch.lineTo(-12.4, 11.0);
    roofArch.lineTo(-3.8, 13.0);
    roofArch.lineTo(3.8, 13.0);
    roofArch.lineTo(8.5, 11.4);
    roofArch.closePath();

    const roofGeo = applyBoxUVs(extrudeHiRes(roofArch, barrelLen, 0.16, 0.16, 2, 20), 22);
    const roofShell = new THREE.Mesh(roofGeo, mats.ultra.micTopDeckMg);
    roofShell.position.z = zMid;
    housingGroup.add(roofShell);

    // Integral flat front-right roof electronics terrace supporting E103 (SH-1035 top flex, world Z in [+0.2, +9.8])
    const flexTerrace = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 1.35, 9.6, 0.4, 0.08, 'y'),
      mats.ultra.micTopDeckMg
    );
    flexTerrace.position.set(-8.6, 13.55, 17.4);
    housingGroup.add(flexTerrace);

    // Integral flat upper-rear -X brow sensor shelf cradling horizontal E30 ambient photodiode + E92 light-pipe plinth!
    // World X in [-14.0, -9.6], Y_top = 52.79, Z in [-30.7, -25.3] (100% inside E18 silhouette!)
    const browShelf = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 0.96, 5.4, 0.35, 0.06, 'y'),
      mats.ultra.micTopDeckMg
    );
    browShelf.position.set(-11.8, 12.75, -15.5);
    // Low-profile rear optical brow fairing boss supporting E92 light-pipe flush behind E30 (Z in [-32.2, -30.4])
    const browLightPlinth = new THREE.Mesh(
      createChamferedBoxGeo(3.2, 2.32, 1.72, 0.28, 0.06, 'y'),
      mats.ultra.micTopDeckMg
    );
    browLightPlinth.position.set(-11.8, 14.04, -18.85);
    housingGroup.add(browShelf, browLightPlinth);

    // 2. Sleek Contoured -X Right-Flank Magnesium Wall & Compact Streamlined Diopter Blister
    //    Rear (-20.42..-7.80) & Front (+11.50..+22.70) stay flush at X=-15.0 (supports E38 JK-1028 flush!);
    //    Only the actual diopter bay (-7.80..+11.50) contours smoothly outward to X=-18.0!
    const flushWallShape = new THREE.Shape();
    flushWallShape.moveTo(-13.6, 3.8);
    flushWallShape.lineTo(-15.0, 3.8);
    flushWallShape.lineTo(-15.0, -11.0);
    flushWallShape.lineTo(-13.6, -11.0);
    flushWallShape.closePath();

    const rearWallLen = 12.62; // local z in [-20.42, -7.80]
    const rearWall = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(flushWallShape, rearWallLen, 0.08, 0.08, 2, 14), 18),
      mats.ultra.micTopDeckMg
    );
    rearWall.position.z = -20.42 + rearWallLen * 0.5;
    housingGroup.add(rearWall);

    const frontWallLen = 11.2; // local z in [+11.50, +22.70]
    const frontWall = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(flushWallShape, frontWallLen, 0.08, 0.08, 2, 14), 18),
      mats.ultra.micTopDeckMg
    );
    frontWall.position.z = 11.5 + frontWallLen * 0.5;
    housingGroup.add(frontWall);

    // Smoothly chamfered C-pocket diopter blister profile (inner cavity X=-17.35 clears E09 nutYoke -17.25!)
    const blisterShape = new THREE.Shape();
    blisterShape.moveTo(-13.6, 3.8);
    blisterShape.lineTo(-15.0, 3.8);
    blisterShape.lineTo(-18.1, 3.2);
    blisterShape.lineTo(-18.1, -3.9);
    blisterShape.lineTo(-15.0, -4.5);
    blisterShape.lineTo(-15.0, -11.0);
    blisterShape.lineTo(-13.6, -11.0);
    blisterShape.lineTo(-13.6, -3.5);
    blisterShape.lineTo(-17.36, -3.5);
    blisterShape.lineTo(-17.36, 2.8);
    blisterShape.lineTo(-13.6, 2.8);
    blisterShape.closePath();

    // Rear blister shoulder: local z in [-7.80, -6.30]
    const blisterRear = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(blisterShape, 1.5, 0.08, 0.08, 2, 14), 18),
      mats.ultra.micTopDeckMg
    );
    blisterRear.position.z = -7.05;
    housingGroup.add(blisterRear);

    // Front blister housing: local z in [+0.10, +11.50]
    const blisterFront = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(blisterShape, 11.4, 0.08, 0.08, 2, 16), 18),
      mats.ultra.micTopDeckMg
    );
    blisterFront.position.z = 5.8;
    housingGroup.add(blisterFront);

    // Solid cast magnesium rear (-7.85) & front (+11.45) blister closure end-caps (seals open blister cave!)
    const blisterCapGeo = createChamferedBoxGeo(3.4, 7.6, 0.48, 0.16, 0.04, 'z');
    for (const capZ of [-7.82, 11.44]) {
      const bCap = new THREE.Mesh(blisterCapGeo, mats.ultra.micTopDeckMg);
      bCap.position.set(-16.4, -0.35, capZ);
      housingGroup.add(bCap);
    }

    // Lower -X wall bridge beneath diopter shaft port (local z in [-6.30, +0.10], y in [-11.0, -4.5])
    const bayLowBridge = new THREE.Mesh(
      createChamferedBoxGeo(1.4, 6.5, 6.4, 0.15, 0.06, 'z'),
      mats.ultra.micTopDeckMg
    );
    bayLowBridge.position.set(-14.3, -7.75, -3.1);
    housingGroup.add(bayLowBridge);

    // Seamless upper/lower blister shroud cheeks framing the circular Diopter Shaft Gland Port (z in [-6.30, +0.10])
    const portPlateShape = createRoundedRectShape(6.4, 7.6, 0.55);
    addCircleHoles(portPlateShape, [[0, 0.3, 2.98]]);
    const portPlate = new THREE.Mesh(
      extrudeHiRes(portPlateShape, 0.85, 0.05, 0.05, 2, 24).rotateY(Math.PI / 2),
      mats.evfHousingMg
    );
    portPlate.position.set(-17.7, -0.3, -3.1);
    housingGroup.add(portPlate);

    // Sculpted 251° cast magnesium Diopter Turret Protective Collar (wraps E37 WP sheet, E31 detent & E21 lock clutch!)
    // X in [-21.08, -18.12], innerR=4.42 (clears E37/E21/E31), outerR=4.78 (clears E72!), open +Z front-bottom for E31 leaf spring!
    {
      const rIn = 4.42;
      const rOut = 4.78;
      const a0 = -2.03;
      const a1 = 2.35;
      const turShape = new THREE.Shape();
      turShape.absarc(0, 0, rOut, a0, a1, false);
      turShape.absarc(0, 0, rIn, a1, a0, true);
      turShape.closePath();
      const turGeo = extrudeHiRes(turShape, 2.86, 0.04, 0.04, 2, 32).rotateY(Math.PI / 2);
      const diopterTurret = new THREE.Mesh(turGeo, mats.ultra.micTopDeckMg);
      diopterTurret.position.set(-19.6, 0, -3.1);
      housingGroup.add(diopterTurret);
    }

    // Seamless top & bottom closure decks bridging portPlate to inner wall (eliminates open blister chasm!)
    for (const [cy, ch] of [
      [3.3, 0.65],
      [-3.95, 0.72],
    ] as Array<[number, number]>) {
      const cheek = new THREE.Mesh(
        createChamferedBoxGeo(4.2, ch, 6.4, 0.12, 0.04, 'z'),
        mats.ultra.micTopDeckMg
      );
      cheek.position.set(-15.7, cy, -3.1);
      housingGroup.add(cheek);
    }

    // Integral Cast Magnesium L/R Top-Front Stereo Microphone Support Plinths with central FPC pass-through slots!
    // Positioned at |X|=19.20, Z=+5.00 (local y=8.92 -> world Y in [47.88, 48.96], cradling E43/E44 flush!)
    const micPlinthGeo = extrudeHiRes(
      createFrameShape(6.8, 8.6, 0.85, 3.2, 2.4, 0.35),
      0.96,
      0.06,
      0.06,
      2,
      16
    ).rotateX(Math.PI / 2);
    for (const sx of [-1, 1]) {
      const micPlinth = new THREE.Mesh(micPlinthGeo, mats.ultra.micTopDeckMg);
      micPlinth.position.set(sx * 19.2, 8.92, 17.5);
      housingGroup.add(micPlinth);

      if (sx < 0) {
        // Direct cast gusset welding -X mic plinth seamlessly into E18 solid -X magnesium flank
        const gusset = new THREE.Mesh(
          createChamferedBoxGeo(1.8, 0.96, 7.8, 0.2, 0.06, 'y'),
          mats.ultra.micTopDeckMg
        );
        gusset.position.set(-15.35, 8.92, 17.5);
        housingGroup.add(gusset);
      } else {
        // Stepped L-arm cast bracket tying +X mic plinth around cutaway bay cleanly into E18 +X roof arch!
        const lowTongue = new THREE.Mesh(
          createChamferedBoxGeo(2.0, 0.96, 7.6, 0.2, 0.06, 'y'),
          mats.ultra.micTopDeckMg
        );
        lowTongue.position.set(15.2, 8.92, 17.5);
        const vertRise = new THREE.Mesh(
          createChamferedBoxGeo(0.92, 3.0, 7.0, 0.2, 0.06, 'y'),
          mats.ultra.micTopDeckMg
        );
        vertRise.position.set(14.75, 10.22, 17.5);
        const roofBeam = new THREE.Mesh(
          createChamferedBoxGeo(7.2, 0.96, 7.0, 0.3, 0.06, 'y'),
          mats.ultra.micTopDeckMg
        );
        roofBeam.position.set(11.6, 11.65, 17.5);
        roofBeam.rotation.z = -0.14;
        housingGroup.add(lowTongue, vertRise, roofBeam);
      }
    }

    // Exterior cast magnesium stiffening ribs along upper -X flank (clear of E72/E29/E91/E30/E105)
    for (const rz of [-17.8, 16.5]) {
      const extRib = new THREE.Mesh(
        createChamferedBoxGeo(0.45, 5.2, 1.05, 0.18, 0.06, 'z'),
        mats.evfHousingMg
      );
      extRib.position.set(-15.2, 6.8, rz);
      housingGroup.add(extRib);
    }

    // 3. Bottom Floor Plate (centered at X=0.0, world Y in [26.44, 27.52], Z in [-28.08, +10.21]!)
    // Clears E04 (-28.26), E08 shoulder (27.66), E25 bosses (±14.6), E20 gaze optics (R=3.78), & E48/E16/E55 FPC!
    // rotateX(+PI/2) maps shapeX -> +X, shapeY -> +Z; slab centered at local z = +3.565 (world Z = -8.935), len = 38.17!
    const floorShape = createRoundedRectShape(27.0, 38.17, 1.2);
    // True circular IR-gaze exit portal at world (0.0, Z=-23.60) -> shapeY = (-11.10 - 3.565) = -14.665 (0.37mm strictly interior!)
    const gazeHole = new THREE.Path();
    gazeHole.absarc(0, -14.665, 4.05, 0, Math.PI * 2, true);
    floorShape.holes.push(gazeHole);
    // True rectangular bottom FPC pass-through slot for E48, E16 flex & E55 (world X in [-7.8, +7.8], Z in [+4.1, +9.8])
    const fpcHole = new THREE.Path();
    fpcHole.moveTo(-7.8, 13.035);
    fpcHole.lineTo(7.8, 13.035);
    fpcHole.lineTo(7.8, 18.735);
    fpcHole.lineTo(-7.8, 18.735);
    fpcHole.closePath();
    floorShape.holes.push(fpcHole);

    const floorMesh = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(floorShape, 0.96, 0.06, 0.06, 2, 24).rotateX(Math.PI / 2), 20),
      mats.ultra.micTopDeckMg
    );
    floorMesh.position.set(0.0, -12.52, 3.565);
    housingGroup.add(floorMesh);

    // Cut-open rear optical IR-gaze exit portal collar on bottom floor (world Z=-23.60, outer R=4.40 clears E04, inner R=3.96 clears E20!)
    const irPortRing = new THREE.Mesh(
      hiResTorus(4.18, 0.22, 12, 36).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    irPortRing.position.set(0, -11.96, -11.1);
    const irVelvet = new THREE.Mesh(
      hiResCyl(4.02, 4.02, 0.96, 32, true),
      mats.velvetFlockTrap
    );
    irVelvet.position.set(0, -12.52, -11.1);
    housingGroup.add(irPortRing, irVelvet);

    // 4. Top-deck MI Hot-Shoe Structural Mounting Terrace (world Y=52.64..52.92, seated flush inside roof slope below E36!)
    for (const [bx, bz] of [
      [-6.8, -2.0],
      [6.8, -2.0],
      [-6.8, 9.4],
      [6.8, 9.4],
    ]) {
      const boss = createSteppedLensCell(0.62, 1.32, 0.28, mats.stainlessMachined, undefined, 0);
      boss.rotation.x = Math.PI / 2;
      boss.position.set(bx, 13.28, bz);
      housingGroup.add(boss);
    }

    // 5. 5 Upper-Ceiling Knife-Edge Matte-Black Internal Anti-Reflection Baffle Fins (clear of all lenses!)
    const topKnifeShape = new THREE.Shape();
    topKnifeShape.moveTo(0, 0);
    topKnifeShape.lineTo(0.62, 0);
    topKnifeShape.lineTo(0.14, -0.72);
    topKnifeShape.lineTo(-0.1, -0.72);
    topKnifeShape.closePath();
    const topKnifeGeo = extrudeHiRes(topKnifeShape, 14.4, 0, 0, 0, 8);
    topKnifeGeo.rotateY(Math.PI / 2);

    for (let i = 0; i < 5; i++) {
      const bz = -15.5 + i * 6.8;
      const topRib = new THREE.Mesh(topKnifeGeo, mats.velvetFlockTrap);
      topRib.position.set(-2.0, 12.92, bz);
      housingGroup.add(topRib);
    }

    // 6. Front (+Z) & Rear (-Z) Machined Structural Collars + Integral Front Heatsink Mounting Bosses!
    // rearCollar: outer Y in [29.39, 51.31] (clears E34/E04!), inner Y in [29.96, 49.94] (clears E03 bezel [30.14, 48.86]!)
    const rearCollarShape = createFrameShape(30.0, 21.8, 4.2, 26.0, 20.1, 3.4, 0, -0.4);
    const rearCollar = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(rearCollarShape, 1.0, 0.06, 0.06, 2, 28), 18),
      mats.evfHousingMg
    );
    rearCollar.position.set(0, 0.85, zRear + 0.62);
    housingGroup.add(rearCollar);

    // frontCollar: outer Y in [28.69, 50.41] (clears E55 28.25!), inner Y in [29.61, 49.49] & |X|<=12.84 (clears E24 clips!)
    const frontCollar = new THREE.Mesh(
      applyBoxUVs(extrudeHiRes(createFrameShape(28.4, 21.6, 3.4, 25.8, 20.0, 2.2), 1.05, 0.06, 0.06, 2, 24), 18),
      mats.evfHousingMg
    );
    frontCollar.position.set(0, 0.05, zFront - 0.62);
    housingGroup.add(frontCollar);

    // Twin front lateral threaded bosses reaching flush to E17 copper ears (world Z in [+9.20, +10.82], clear of E25 seal!)
    for (const sx of [-1, 1]) {
      const hsBoss = createSteppedLensCell(0.64, 1.5, 1.62, mats.evfHousingMg, undefined, 0);
      hsBoss.position.set(sx * 14.3, 0, zFront - 0.19);
      housingGroup.add(hsBoss);
    }

    // 7. 4 Hollow Lower Cast Magnesium Chassis Mounting Bosses (innerR=0.88 accepts E25 M1.7 anchor bolts!)
    for (const [mx, mz] of [
      [-14.6, -15.0],
      [14.6, -15.0],
      [-14.6, 15.0],
      [14.6, 15.0],
    ]) {
      const boss = createSteppedLensCell(0.88, 2.05, 2.1, mats.evfHousingMg, undefined, 0);
      boss.rotation.x = Math.PI / 2;
      boss.position.set(mx, -11.9, mz);
      const gusset = new THREE.Mesh(
        createChamferedBoxGeo(1.4, 1.7, 1.1, 0.18, 0.05, 'z'),
        mats.evfHousingMg
      );
      gusset.position.set(mx - Math.sign(mx) * 2.1, -11.85, mz);
      housingGroup.add(boss, gusset);
    }
    enrichE18Housing(housingGroup, mats);
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
  //      (Manual shutter lever on +X photographer's LEFT opposite the -X diopter!)
  // =========================================================================
  const eyeShutterGroup = new THREE.Group();
  {
    // Stepped matte-black anodized shutter chassis frame (world Z in [-30.64, -29.66], 0.25mm clear of E03 & 0.08mm clear of E74!)
    const frame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(24.6, 19.2, 3.0, 20.6, 15.6, 2.2), 0.72, 0.06, 0.06, 2, 24),
      mats.matteBlackAnodized
    );
    eyeShutterGroup.add(frame);

    // Upper & lower recessed stainless blade guide tracks
    for (const sy of [-8.2, 8.2]) {
      const track = new THREE.Mesh(new THREE.BoxGeometry(19.6, 0.56, 0.24), mats.stainlessMachined);
      track.position.set(0, sy, 0.34);
      track.userData.noEdges = true;
      eyeShutterGroup.add(track);
    }

    // Partially open twin overlapping ultra-thin woven carbon-fiber shutter blades with pivot pins & drive slots
    for (const sx of [-1, 1]) {
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(5.2, 15.4, 0.2, 0.22, 0.02, 'z'),
        mats.carbonFiberBlade
      );
      blade.position.set(sx * 8.4, 0, sx * 0.12);
      eyeShutterGroup.add(blade);

      // Interlocking light-tight overlap lip along inner blade meeting edge
      const lip = new THREE.Mesh(new THREE.BoxGeometry(0.58, 15.2, 0.12), mats.velvetFlockTrap);
      lip.position.set(sx * 6.05, 0, sx * 0.22);
      lip.userData.noEdges = true;
      eyeShutterGroup.add(lip);

      // Miniature brass guide-pin rollers tracking in upper & lower rails
      for (const py of [-6.8, 6.8]) {
        const pin = new THREE.Mesh(hiResCyl(0.38, 0.38, 0.44, 12).rotateX(Math.PI / 2), mats.brassGear);
        pin.position.set(sx * 9.0, py, 0.16);
        pin.userData.noEdges = true;
        eyeShutterGroup.add(pin);
      }
    }

    // Left-flank (+X, photographer's LEFT!) ergonomic knurled mechanical slide lever (world Y in [40.7, 46.8])
    const leverBase = new THREE.Mesh(
      hiResCyl(0.46, 0.46, 1.5, 22).rotateZ(Math.PI / 2),
      mats.mountStainlessFlange
    );
    leverBase.position.set(13.1, 3.0, 0);
    const leverArm = new THREE.Mesh(
      createChamferedBoxGeo(2.0, 5.2, 0.82, 0.38, 0.06, 'z'),
      mats.evfHousingMg
    );
    leverArm.position.set(14.6, 4.2, 0);
    eyeShutterGroup.add(leverBase, leverArm);

    // 5 crisp tactile horizontal thumb-grip ridges on lever knob + red closed-state indicator dot
    for (let r = -2; r <= 2; r++) {
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.32, 0.72), mats.matteBlackAnodized);
      grip.position.set(15.72, 4.2 + r * 0.8, 0);
      grip.userData.noEdges = true;
      eyeShutterGroup.add(grip);
    }
    const stateDot = new THREE.Mesh(hiResSphere(0.3, 10, 8), mats.mountRedIndexDot);
    stateDot.position.set(14.6, 6.85, -0.15);
    stateDot.userData.noEdges = true;
    eyeShutterGroup.add(stateDot);
    enrichE19BlindShutter(eyeShutterGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyepiece-shutter',
      19,
      '#1e293b',
      eyeShutterGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -30.15),
      new THREE.Vector3(26, 8, -38),
      new THREE.Vector3(26, 42, -22),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E20: Eye-Control AF 850nm Narrow-Bandpass Filter & Aspheric IR Relay Barrel
  // =========================================================================
  const irOpticsGroup = new THREE.Group();
  {
    // CNC stepped matte-black optical lens barrel (outerR=3.78 fits cleanly inside E18 R=4.25 portal at Z=-23.60!)
    const barrelPts: THREE.Vector2[] = [
      new THREE.Vector2(3.05, -1.55),
      new THREE.Vector2(3.78, -1.55),
      new THREE.Vector2(3.78, 0.1),
      new THREE.Vector2(3.62, 0.25),
      new THREE.Vector2(3.62, 1.5),
      new THREE.Vector2(3.15, 1.5),
      new THREE.Vector2(3.15, -1.55),
    ];
    const barrelGeo = markHiRes(new THREE.LatheGeometry(barrelPts, 36));
    barrelGeo.computeVertexNormals();
    const barrelOuter = new THREE.Mesh(barrelGeo, mats.matteBlackAnodized);
    irOpticsGroup.add(barrelOuter);

    // Top threaded stainless retaining bezel with 4 precision spanner-wrench slots
    const bezel = createSpannerRetainerRing(
      2.95,
      3.58,
      0.42,
      mats.mountStainlessFlange,
      mats.matteBlackAnodized,
      4,
      1
    );
    bezel.rotation.x = -Math.PI / 2;
    bezel.position.y = 1.62;
    irOpticsGroup.add(bezel);

    // 850nm ±18nm Ruby Narrow-Bandpass Dielectric Filter (OD4+ visible cut!) + brass seating ring
    const bpfSeat = new THREE.Mesh(hiResTorus(3.04, 0.16, 8, 32).rotateX(Math.PI / 2), mats.brassGear);
    bpfSeat.position.y = 0.24;
    bpfSeat.userData.noEdges = true;
    const bpf = new THREE.Mesh(hiResCyl(3.0, 3.0, 0.38, 32), mats.evfDichroicMirror);
    bpf.position.y = 0.46;
    const bpfRim = new THREE.Mesh(hiResTorus(3.0, 0.12, 8, 32).rotateX(Math.PI / 2), mats.evfGlassEdgeRim);
    bpfRim.position.y = 0.46;
    bpfRim.userData.noEdges = true;
    irOpticsGroup.add(bpfSeat, bpf, bpfRim);

    // Top Molded Aspheric IR Relay Lens dome capturing 90°-reflected eyeball image
    const relayLens = new THREE.Mesh(
      markHiRes(createOpticalLensGeometry(3.05, 0.68, 0.85, 0.34, -0.16, 0, 22, 40).rotateX(-Math.PI / 2)),
      mats.evfLensAspheric
    );
    relayLens.position.y = 1.48;
    irOpticsGroup.add(relayLens);

    // Internal sharp knife-edge velvet aperture stop diaphragm
    const irStop = buildConicalBaffleRing(2.35, 3.12, 0.52, mats.velvetFlockTrap);
    irStop.rotation.x = Math.PI / 2;
    irStop.position.y = -0.68;
    irOpticsGroup.add(irStop);
    enrichE20GazeIrOptics(irOpticsGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-gaze-ir-optics',
      20,
      '#ec4899',
      irOpticsGroup,
      new THREE.Vector3(0, 27.4, -23.6),
      new THREE.Vector3(18, -16, -16),
      new THREE.Vector3(18, 16, -6),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E21: Push-Pull Anti-Accidental Diopter Dial Lock Clutch & Ball Detents
  //      Mirrored cleanly onto true Sony -X (right) diopter shaft at (-20.42, 39.50, -15.60)!
  // =========================================================================
  const diopterLockGroup = new THREE.Group();
  const diopterLockClutchGroup = new THREE.Group();
  {
    // 24-tooth CNC hardened stainless star ratchet lock clutch wheel (boreR=1.24 clears E12 R=0.92 shaft!)
    const ratchet = new THREE.Mesh(
      markHiRes(createSpurGearGeometry(24, 2.85, 0.54, 1.24).rotateY(Math.PI / 2)),
      mats.mountStainlessFlange
    );
    ratchet.position.x = 0.32;
    diopterLockClutchGroup.add(ratchet);

    // Hollow splined drive hub clearing E12 dialShaft (R=0.92) by 0.09mm!
    const splineHub = createSteppedLensCell(1.06, 1.48, 1.18, mats.stainlessMachined, undefined, 0);
    splineHub.rotation.y = Math.PI / 2;
    splineHub.position.x = 0.0;
    diopterLockClutchGroup.add(splineHub);

    // Axial CuBe2 push-pull pop-out return spring + flat brass retaining washer
    const popSpring = new THREE.Mesh(
      markHiRes(createHelicalSpringGeometry(1.62, 0.56, 4, 0.13).rotateY(Math.PI / 2)),
      mats.beCuSpring
    );
    popSpring.position.x = 0.3;
    popSpring.userData.noEdges = true;
    const sprWasher = createSteppedLensCell(1.08, 1.92, 0.14, mats.brassGear, undefined, 0);
    sprWasher.rotation.y = Math.PI / 2;
    sprWasher.position.x = 0.56;
    diopterLockClutchGroup.add(popSpring, sprWasher);
    diopterLockGroup.add(diopterLockClutchGroup);

    // Stationary machined C3604 brass ball-detent pocket collar with radial spring-plunger housings!
    const detentCollar = createSteppedLensCell(2.05, 3.25, 0.64, mats.brassGear, undefined, 0);
    detentCollar.rotation.y = Math.PI / 2;
    detentCollar.position.x = -0.28;
    diopterLockGroup.add(detentCollar);

    // Twin opposed hardened steel click balls + miniature CuBe2 backup springs + threaded hex preload plugs
    for (const sy of [-1, 1]) {
      const clickBall = new THREE.Mesh(hiResSphere(0.46, 14, 10), mats.mountStainlessFlange);
      clickBall.position.set(-0.28, sy * 2.65, 0);
      clickBall.userData.noEdges = true;

      const plungerSpr = new THREE.Mesh(
        markHiRes(createHelicalSpringGeometry(0.32, 0.95, 4, 0.08).rotateX(Math.PI / 2)),
        mats.beCuSpring
      );
      plungerSpr.position.set(-0.28, sy * 3.25, 0);
      plungerSpr.userData.noEdges = true;

      const grubPlug = new THREE.Mesh(hiResCyl(0.44, 0.44, 0.36, 6), mats.titaniumRivet);
      grubPlug.position.set(-0.28, sy * 3.85, 0);
      grubPlug.userData.noEdges = true;

      diopterLockGroup.add(clickBall, plungerSpr, grubPlug);
    }
    enrichE21DiopterLock(diopterLockGroup, diopterLockClutchGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-lock-clutch',
      21,
      '#f59e0b',
      diopterLockGroup,
      new THREE.Vector3(-20.42, EVF_OPTICAL_Y, -15.6),
      new THREE.Vector3(-34, -24, 12),
      new THREE.Vector3(-42, 24, 14),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E22: Linear Polarizer + λ/4 Quarter-Wave Anti-Glare Stack
  // =========================================================================
  const polQwpGroup = new THREE.Group();
  {
    // Stepped CNC matte-black anodized optical retaining ring (world Z in [-0.35, +0.55], 0.10mm clear of E13 & E52!)
    const polRing = createSpannerRetainerRing(
      8.6,
      10.35,
      0.74,
      mats.matteBlackAnodized,
      mats.evfHousingMg,
      4,
      -1
    );
    polQwpGroup.add(polRing);

    // Linear Polarizer film facing -Z (eyepiece side) with subtle polished edge bevel
    const linPol = new THREE.Mesh(
      hiResCyl(8.7, 8.7, 0.22, 44).rotateX(Math.PI / 2),
      mats.lcdPolarizerFilm
    );
    linPol.position.z = -0.2;
    linPol.userData.edgeOpacity = 0.34;
    polQwpGroup.add(linPol);

    // Ultra-thin blackened-brass inter-film air/adhesive spacer ring between Polarizer and λ/4 QWP
    const interRing = new THREE.Mesh(hiResTorus(8.56, 0.08, 8, 40), mats.brassGear);
    interRing.userData.noEdges = true;
    polQwpGroup.add(interRing);

    // Wideband Achromatic Zero-Order λ/4 Quarter-Wave Retarder Plate facing +Z (OLED side)
    const qwp = new THREE.Mesh(
      hiResCyl(8.7, 8.7, 0.22, 44).rotateX(Math.PI / 2),
      mats.evfDichroicMirror
    );
    qwp.position.z = 0.2;
    qwp.userData.edgeOpacity = 0.34;
    polQwpGroup.add(qwp);

    // 45° fast-axis gold alignment keyway tab on rim + laser-axis index rib & opposite locating pin
    const tab = new THREE.Mesh(
      createChamferedBoxGeo(1.6, 1.6, 0.72, 0.2, 0.05, 'z'),
      mats.goldPlating
    );
    tab.position.set(7.45, 7.45, 0);
    tab.rotation.z = Math.PI / 4;
    const axisMark = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.22, 0.78), mats.matteBlackAnodized);
    axisMark.position.set(7.45, 7.45, 0);
    axisMark.rotation.z = Math.PI / 4;
    axisMark.userData.noEdges = true;
    const oppKey = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.05, 0.7), mats.stainlessMachined);
    oppKey.position.set(-7.35, -7.35, 0);
    oppKey.rotation.z = Math.PI / 4;
    polQwpGroup.add(tab, axisMark, oppKey);
    enrichE22PolarizerQwp(polQwpGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-polarizer-qwp',
      22,
      '#8b5cf6',
      polQwpGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 0.1),
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
    // ALD Thin-Film Encapsulation (TFE: SiNx / Al2O3) hermetic rim seal bezel (world Z in [+1.42, +1.78]!)
    const tfeBezel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(16.8, 13.0, 0.65, 14.2, 10.6, 0.3), 0.28, 0.03, 0.03, 1, 16),
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
      const fid = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.62, 0.32), mats.goldPlating);
      fid.position.set(fx, fy, 0);
      fid.userData.noEdges = true;
      mlaCapGroup.add(fid);
    }

    // Upgraded Hexagonal Close-Packed On-Chip Micro-Lens Array (MLA) optical extraction cap!
    const mlaPlateGeo = applyPlanarUVs(
      createChamferedBoxGeo(14.8, 11.2, 0.24, 0.18, 0.03, 'z'),
      14.8,
      11.2,
      'xy-back'
    );
    const mlaPlate = new THREE.Mesh(mlaPlateGeo, mats.evfMlaGlass);
    mlaPlate.position.z = -0.04;
    mlaPlate.userData.edgeOpacity = 0.38;
    mlaCapGroup.add(mlaPlate);

    // Crisp ground-glass perimeter optical edge rim
    const mlaRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.0, 11.4, 0.3, 14.55, 10.95, 0.25), 0.26, 0.02, 0.02, 1, 12),
      mats.evfGlassEdgeRim
    );
    mlaRim.position.z = -0.04;
    mlaCapGroup.add(mlaRim);

    // Distinct stepped On-Chip Color Filter (OCCF) coupling rim along +Z underside
    const rgbEdge = new THREE.Mesh(
      extrudeHiRes(createFrameShape(15.3, 11.7, 0.4, 14.4, 10.8, 0.3), 0.1, 0, 0, 1, 12),
      mats.evfDichroicMirror
    );
    rgbEdge.position.z = 0.13;
    mlaCapGroup.add(rgbEdge);
    enrichE23MlaStack(mlaCapGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-oled-mla-stack',
      23,
      '#06b6d4',
      mlaCapGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 1.6),
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
    // Stamped nickel-silver (Cu-Ni-Zn) RF Faraday shield lid (world Z in [+8.54, +10.22], 0.06mm flush off E16 PCB!)
    const canShape = createFrameShape(23.8, 18.2, 1.6, 10.4, 8.6, 0.9);
    // Micro ventilation & solder-reflow inspection pinholes along flanking walls
    addCircleHoles(canShape, [
      [-8.4, 6.0, 0.56],
      [8.4, 6.0, 0.56],
      [-8.4, -6.0, 0.56],
      [8.4, -6.0, 0.56],
    ]);
    const canTopGeo = applyPlanarUVs(extrudeHiRes(canShape, 0.36, 0.04, 0.04, 1, 18), 23.8, 18.2, 'xy');
    const canTop = new THREE.Mesh(canTopGeo, mats.ultra.evfTconEmiCan);
    canTop.position.z = 0.64;
    tconShieldGroup.add(canTop);

    // Upturned flanged EMI collar lip around central TIM thermal cutout window
    const winCollar = new THREE.Mesh(
      extrudeHiRes(createFrameShape(11.1, 9.3, 0.95, 10.3, 8.5, 0.8), 0.38, 0.03, 0.03, 1, 14),
      mats.emiShieldCan
    );
    winCollar.position.z = 0.72;
    tconShieldGroup.add(winCollar);

    // Stamped perimeter Faraday shield walls with clean clearance around CN901 ZIF connector!
    const wallShape = createFrameShape(24.0, 18.4, 1.6, 22.8, 17.2, 1.15);
    const walls = new THREE.Mesh(
      extrudeHiRes(wallShape, 1.32, 0.05, 0.05, 1, 18),
      mats.emiShieldCan
    );
    tconShieldGroup.add(walls);

    // 8 realistically curved CuBe2 snap-in EMI grounding spring fingers around outer flange!
    for (const [cx, cy, rz] of [
      [-6.5, 9.25, 0],
      [6.5, 9.25, 0],
      [-7.8, -9.25, Math.PI],
      [7.8, -9.25, Math.PI],
      [-12.05, 4.5, Math.PI / 2],
      [-12.05, -4.5, Math.PI / 2],
      [12.05, 4.5, -Math.PI / 2],
      [12.05, -4.5, -Math.PI / 2],
    ] as Array<[number, number, number]>) {
      const clip = new THREE.Mesh(
        buildFlatRibbonExtrude(
          [
            [-0.45, 0.0],
            [0.0, 0.32],
            [0.45, 0.05],
          ],
          0.2,
          2.8,
          'yz'
        ),
        mats.beCuSpring
      );
      clip.position.set(cx, cy, 0.0);
      clip.rotation.z = rz;
      tconShieldGroup.add(clip);
    }
    enrichE24TconEmiShield(tconShieldGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-tcon-emi-shield',
      24,
      '#94a3b8',
      tconShieldGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, 9.28),
      new THREE.Vector3(26, 16, 62),
      new THREE.Vector3(26, 48, 50),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E25: Sealed Anti-Fog Chamber O-Ring Kit, Velvet Baffles & 4x Anchor Screws
  // =========================================================================
  const baffleSealGroup = new THREE.Group();
  {
    // 3 true conical knife-edge inter-lens ultra-black micro-flocked velvet stray-light baffle rings!
    // Seated cleanly in exact inter-group air chambers (world Z = -19.62, -12.68, -6.00; clear of E20 & E70!)
    for (const [bz, rIn, rOut, d] of [
      [-7.12, 9.6, 11.2, 0.22],
      [-0.18, 9.6, 10.55, 0.22],
      [6.5, 8.95, 10.45, 0.32],
    ] as Array<[number, number, number, number]>) {
      const ring = buildConicalBaffleRing(rIn, rOut, d, mats.velvetFlockTrap);
      ring.position.z = bz;
      baffleSealGroup.add(ring);

      // Thin outer anodized locating flange ring
      const outerRim = new THREE.Mesh(hiResTorus(rOut, 0.08, 8, 40), mats.matteBlackAnodized);
      outerRim.position.z = bz;
      outerRim.userData.noEdges = true;
      baffleSealGroup.add(outerRim);
    }

    // Dual front (+10.36) & rear (-33.08) dry-nitrogen optical-chamber EPDM flange sealing gaskets!
    // rearSeal shifted +0.90mm in Y matching E18 rearCollar to clear E33 eye-sensor window completely!
    const rearSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(29.8, 21.4, 4.2, 28.4, 20.0, 3.7), 0.2, 0.03, 0.03, 2, 28),
      mats.epdmGasket
    );
    rearSeal.position.set(0, 0.9, -20.58); // world Z in [-33.21, -32.95] flush between E32 & E18!
    const frontSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(25.4, 22.2, 3.2, 24.0, 20.8, 2.8), 0.2, 0.03, 0.03, 2, 24),
      mats.epdmGasket
    );
    frontSeal.position.z = 22.86; // world Z in [+10.23, +10.49] between E18 & E17 (clears hsBoss at |X|=14.3!)
    baffleSealGroup.add(rearSeal, frontSeal);

    // 4 high-tensile stainless EVF chassis anchor bolts threading up through E105 grommets -> E45 -> E18 R=0.88 bosses!
    for (const [mx, mz] of [
      [-14.6, -15.0],
      [14.6, -15.0],
      [-14.6, 15.0],
      [14.6, 15.0],
    ] as Array<[number, number]>) {
      const bolt = buildPhillipsScrew(
        1.04,
        0.44,
        0.5,
        2.75,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      bolt.position.set(mx, -15.64, mz);
      baffleSealGroup.add(bolt);

      // Captive stainless seating washer under pan head (world Y = 24.00, flush beneath raised E105 grommet 24.23!)
      const wash = createSteppedLensCell(0.58, 1.24, 0.14, mats.mountStainlessFlange, undefined, 0);
      wash.rotation.x = Math.PI / 2;
      wash.position.set(mx, -15.5, mz);
      baffleSealGroup.add(wash);

      // Authentic cobalt-blue micro-encapsulated Loctite thread-lock coating band on upper threads
      const blueLock = new THREE.Mesh(hiResCyl(0.54, 0.52, 0.85, 16), mats.mountThreadLockBlue);
      blueLock.position.set(mx, -12.85, mz);
      blueLock.userData.noEdges = true;
      baffleSealGroup.add(blueLock);
    }
    enrichE25BaffleSealKit(baffleSealGroup, mats);
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
  //      Raised snug to Y=24.30 directly under lower FPC routing bay!
  // =========================================================================
  const cavityClampGroup = new THREE.Group();
  {
    // Stamped & formed SUS304 retaining bracket bridging cleanly between E48 (+5.80) & E16 flex (+8.05)!
    const plateShape = createRoundedRectShape(23.6, 1.75, 0.55);
    addCircleHoles(plateShape, [
      [-9.6, 0, 0.65],
      [9.6, 0, 0.65],
    ]);
    const plate = new THREE.Mesh(
      extrudeHiRes(plateShape, 0.52, 0.05, 0.05, 2, 16).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    cavityClampGroup.add(plate);

    // Twin stamped longitudinal stiffening ribs along front & rear clamp borders
    for (const sz of [-0.62, 0.62]) {
      const rib = new THREE.Mesh(
        createChamferedBoxGeo(15.8, 0.32, 0.36, 0.12, 0.04, 'y'),
        mats.stainlessMachined
      );
      rib.position.set(0, -0.34, sz);
      cavityClampGroup.add(rib);
    }

    // Low-rebound PORON urethane compression pad cushioning 240Hz MIPI-DSI & OLED FPC routing bay
    const cushion = new THREE.Mesh(
      createChamferedBoxGeo(16.8, 0.56, 1.45, 0.35, 0.06, 'y'),
      mats.butylDamperRubber
    );
    cushion.position.y = 0.58;
    cavityClampGroup.add(cushion);

    // Dual curved arched CuBe2 chassis EMI grounding spring fingers with contact dimples
    for (const sx of [-1, 1]) {
      const gndFinger = new THREE.Mesh(
        buildFlatRibbonExtrude(
          [
            [sx * 10.8, 0.0],
            [sx * 12.1, 0.48],
            [sx * 13.4, 0.12],
          ],
          0.22,
          1.45,
          'xy'
        ),
        mats.beCuSpring
      );
      gndFinger.position.y = 0.22;
      const dimple = new THREE.Mesh(hiResSphere(0.32, 10, 8), mats.goldPlating);
      dimple.position.set(sx * 12.1, 0.72, 0);
      dimple.userData.noEdges = true;
      cavityClampGroup.add(gndFinger, dimple);
    }

    // 2x M1.4 stainless Phillips retention screws
    for (const sx of [-9.6, 9.6]) {
      const scr = buildPhillipsScrew(
        0.85,
        0.36,
        0.46,
        1.35,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.position.set(sx, -0.3, 0);
      cavityClampGroup.add(scr);
    }
    enrichE26CavityClamp(cavityClampGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-cavity-clamp',
      26,
      '#94a3b8',
      cavityClampGroup,
      new THREE.Vector3(0, 24.3, 6.9),
      new THREE.Vector3(0, -28, 36),
      new THREE.Vector3(0, 12, 34),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E27: Deep-Eyecup 4-Screw Stainless Slide-Rail Subframe & Positive Lock Catch
  //      Tightened flush at Z=-36.52 (nested seamlessly inside E01 FDA-EP19 dust-skirt!)
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
      extrudeHiRes(subShape, 0.82, 0.08, 0.08, 2, 24),
      mats.mountStainlessFlange
    );
    eyecupSubGroup.add(subFrame);

    // Left & right true L-profile beveled dovetail deep-eyecup slide rails with upper stops & spring dimples
    for (const sx of [-1, 1]) {
      const railStem = new THREE.Mesh(
        createChamferedBoxGeo(1.55, 19.0, 1.15, 0.22, 0.08, 'z'),
        mats.stainlessMachined
      );
      railStem.position.set(sx * 15.2, 0, -0.18);
      const railLip = new THREE.Mesh(new THREE.BoxGeometry(1.0, 18.4, 0.34), mats.mountStainlessFlange);
      railLip.position.set(sx * 14.3, 0, -0.66);
      const upperStop = new THREE.Mesh(new THREE.BoxGeometry(2.15, 1.25, 1.2), mats.stainlessMachined);
      upperStop.position.set(sx * 14.9, 9.6, -0.18);
      eyecupSubGroup.add(railStem, railLip, upperStop);
    }

    // Bottom positive-lock spring release lever tab with tactile grip grooves, pivot pin & CuBe2 coil spring!
    const catchTab = new THREE.Mesh(
      createChamferedBoxGeo(8.2, 2.2, 1.1, 0.38, 0.1, 'z'),
      mats.matteBlackAnodized
    );
    catchTab.position.set(0, -12.6, -0.22);
    eyecupSubGroup.add(catchTab);
    for (let g = -2; g <= 2; g++) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.65, 0.24), mats.evfHousingMg);
      ridge.position.set(g * 1.3, -12.6, -0.82);
      ridge.userData.noEdges = true;
      eyecupSubGroup.add(ridge);
    }
    const lockTooth = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.95, 0.72), mats.stainlessMachined);
    lockTooth.position.set(0, -10.9, -0.45);
    const catchSpr = new THREE.Mesh(
      markHiRes(createHelicalSpringGeometry(0.44, 1.8, 5, 0.11).rotateX(Math.PI / 2)),
      mats.beCuSpring
    );
    catchSpr.position.set(0, -10.8, 0.0);
    catchSpr.userData.noEdges = true;
    eyecupSubGroup.add(lockTooth, catchSpr);

    // 4 perimeter countersunk M1.4 stainless Phillips mounting screws (flush within local z in [-0.72, +0.44])
    for (const [sx, sy] of [
      [-13.4, 10.6],
      [13.4, 10.6],
      [-13.4, -10.6],
      [13.4, -10.6],
    ] as Array<[number, number]>) {
      const scr = buildPhillipsScrew(
        0.92,
        0.3,
        0.46,
        0.92,
        mats.stainlessMachined,
        mats.matteBlackAnodized,
        mats.titaniumRivet
      );
      scr.rotation.x = Math.PI / 2;
      scr.position.set(sx, sy, -0.46);
      eyecupSubGroup.add(scr);
    }
    enrichE27EyecupSubframe(eyecupSubGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyecup-subframe',
      27,
      '#cbd5e1',
      eyecupSubGroup,
      new THREE.Vector3(0, EVF_OPTICAL_Y, -36.52),
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
    // Stacked chemical photo-etched calibration shims (coaxial at Z=-23.60, strictly interior R=0.68 holes matching E07!)
    const brassShimShape = createFrameShape(14.6, 8.6, 1.2, 8.2, 4.6, 0.8);
    addCircleHoles(brassShimShape, [
      [-4.6, -3.1, 0.68],
      [4.6, -3.1, 0.68],
      [0.0, 3.25, 0.68],
    ]);
    const brassGeo = applyPlanarUVs(
      extrudeHiRes(brassShimShape, 0.2, 0.02, 0.02, 1, 18).rotateX(Math.PI / 2),
      14.6,
      8.6,
      'xz'
    );
    const shimPlate = new THREE.Mesh(brassGeo, mats.ultra.evfShimEtchedBrass);

    const steelShimShape = createFrameShape(14.4, 8.4, 1.2, 8.4, 4.8, 0.8);
    const steelShim = new THREE.Mesh(
      extrudeHiRes(steelShimShape, 0.16, 0.015, 0.015, 1, 18).rotateX(Math.PI / 2),
      mats.mountStainlessFlange
    );
    steelShim.position.y = -0.22;

    const ultraThinShim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(14.2, 8.2, 1.2, 8.6, 5.0, 0.8), 0.12, 0.015, 0.015, 1, 16).rotateX(
        Math.PI / 2
      ),
      mats.beCuSpring
    );
    ultraThinShim.position.y = -0.4;
    eyeAfShimGroup.add(shimPlate, steelShim, ultraThinShim);

    // Authentic thickness-code identification tabs protruding from +X shim edge (10 / 20 / 50 μm)
    const tabSpecs: Array<[number, number, THREE.Material]> = [
      [0.0, -2.2, mats.ultra.evfShimEtchedBrass],
      [-0.22, 0.0, mats.mountStainlessFlange],
      [-0.4, 2.2, mats.beCuSpring],
    ];
    for (const [ty, tz, tMat] of tabSpecs) {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.14, 1.6), tMat);
      tab.position.set(7.9, ty, tz);
      tab.userData.noEdges = true;
      eyeAfShimGroup.add(tab);
    }

    // 3 CNC-turned tapered titanium alignment studs (R=0.56 shank clears E07 pkg by 0.31mm & passes into R=0.72 PCB holes!)
    const studPts: THREE.Vector2[] = [
      new THREE.Vector2(0.01, -2.15),
      new THREE.Vector2(0.42, -2.15),
      new THREE.Vector2(0.56, -1.85),
      new THREE.Vector2(0.56, -0.3),
      new THREE.Vector2(0.88, -0.25),
      new THREE.Vector2(0.88, 0.08),
      new THREE.Vector2(0.01, 0.08),
    ];
    const studGeo = markHiRes(new THREE.LatheGeometry(studPts, 20));
    studGeo.computeVertexNormals();
    for (const [sx, sz] of [
      [-4.6, -3.1],
      [4.6, -3.1],
      [0.0, 3.25],
    ] as Array<[number, number]>) {
      const stud = new THREE.Mesh(studGeo, mats.titaniumRivet);
      stud.position.set(sx, 0.04, sz);
      eyeAfShimGroup.add(stud);
    }
    enrichE28EyeAfShims(eyeAfShimGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-eyeaf-shims',
      28,
      '#eab308',
      eyeAfShimGroup,
      new THREE.Vector3(0, 25.6, -23.6),
      new THREE.Vector3(24, -30, -24),
      new THREE.Vector3(26, 8, -32),
      cp,
      0.26
    )
  );

  // =========================================================================
  // E29: Optical-Chamber Molecular-Sieve Desiccant Cartridge & Breather Port
  //      Compact low-profile cartridge mounted FLUSH on solid -X E18 wall!
  // =========================================================================
  const desiccantGroup = new THREE.Group();
  {
    // Compact CNC SUS304 micro-cartridge mounted flush on E18 exterior -X upper flank (inner face -15.10!)
    const housing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(2.6, 4.8, 0.72, 1.8, 3.6, 0.4), 2.1, 0.06, 0.06, 2, 18),
      mats.mountStainlessFlange
    );
    const backCap = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(2.45, 4.6, 0.62), 0.32, 0.04, 0.04, 1, 14),
      mats.stainlessMachined
    );
    backCap.position.z = 0.96;
    desiccantGroup.add(housing, backCap);

    // Top & bottom mounting screw tabs
    for (const sy of [-2.72, 2.72]) {
      const tab = new THREE.Mesh(
        createChamferedBoxGeo(2.0, 0.82, 0.42, 0.22, 0.04, 'z'),
        mats.stainlessMachined
      );
      tab.position.set(0, sy, 0.88);
      desiccantGroup.add(tab);
    }

    // Packed bed of 3A Synthetic Zeolite Molecular-Sieve Spherical Desiccant Beads!
    const zeoCoreGeo = applyPlanarUVs(new THREE.BoxGeometry(1.72, 3.5, 1.3), 1.72, 3.5, 'xy-back');
    const zeoCore = new THREE.Mesh(zeoCoreGeo, mats.ultra.evfZeoliteBeadBed);
    zeoCore.position.z = -0.06;
    desiccantGroup.add(zeoCore);

    // Subtle 3D ceramic zeolite spherical micro-beads pressed right behind the woven mesh window!
    for (let r = -1; r <= 1; r++) {
      for (let c = -0.5; c <= 0.5; c += 1) {
        const bead = new THREE.Mesh(hiResSphere(0.32, 8, 6), mats.ceramicAlumina);
        bead.position.set(c * 0.72, r * 0.9, -0.76);
        bead.userData.noEdges = true;
        desiccantGroup.add(bead);
      }
    }

    // Laser-welded fine stainless woven micro-mesh breathable retention screen + frame rim!
    const meshWinGeo = applyPlanarUVs(new THREE.PlaneGeometry(1.82, 3.6), 1.82, 3.6, 'xy-back');
    const meshWin = new THREE.Mesh(meshWinGeo, mats.ultra.micStainlessWovenMesh);
    meshWin.rotation.y = Math.PI;
    meshWin.position.z = -1.1;
    meshWin.userData.noEdges = true;
    const meshFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(2.35, 4.2, 0.5, 1.75, 3.5, 0.35), 0.2, 0.025, 0.025, 1, 14),
      mats.emiShieldCan
    );
    meshFrame.position.z = -1.06;
    desiccantGroup.add(meshWin, meshFrame);

    // Outward (-X) barometric pressure-equalizing breather boss with hex flats, EPDM O-ring & W.L. Gore ePTFE disk!
    const ventHex = new THREE.Mesh(
      hiResCyl(1.18, 1.18, 0.78, 6).rotateZ(Math.PI / 2),
      mats.matteBlackAnodized
    );
    ventHex.position.set(-1.68, 0.7, 0);
    const ventO = new THREE.Mesh(
      hiResTorus(1.1, 0.14, 8, 22).rotateY(Math.PI / 2),
      mats.epdmGasket
    );
    ventO.position.set(-1.36, 0.7, 0);
    ventO.userData.noEdges = true;
    const ventPtfeGeo = markHiRes(new THREE.CircleGeometry(0.84, 24));
    ventPtfeGeo.rotateY(-Math.PI / 2);
    const ventPtfe = new THREE.Mesh(ventPtfeGeo, mats.ultra.sensorEptfeVent);
    ventPtfe.position.set(-2.1, 0.7, 0);
    ventPtfe.userData.noEdges = true;
    desiccantGroup.add(ventHex, ventO, ventPtfe);
    enrichE29DesiccantBreather(desiccantGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-desiccant-breather',
      29,
      '#06b6d4',
      desiccantGroup,
      new THREE.Vector3(-16.57, 46.6, -4.4),
      new THREE.Vector3(-38, 22, 8),
      new THREE.Vector3(-42, 54, 10),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E30: EVF Auto-Brightness & Color-Temperature Ambient RGB Photodiode
  //      Seated FLAT horizontally on E18 rear brow shelf (-11.8, 52.62, -28.2), facing +Y into E92 TIR exit!
  // =========================================================================
  const ambientPdGroup = new THREE.Group();
  {
    const horizWrap = new THREE.Group();
    horizWrap.rotation.x = Math.PI / 2;
    ambientPdGroup.add(horizWrap);

    // Miniature chamfered emerald HDI sub-PCB (3.6 x 4.0 mm) seated flush on E18 -X rear brow shelf!
    const subPcbGeo = applyPlanarUVs(
      createChamferedBoxGeo(3.6, 4.0, 0.56, 0.42, 0.04, 'z'),
      3.6,
      4.0,
      'xy-back'
    );
    const subPcb = new THREE.Mesh(subPcbGeo, mats.ultra.evfTconPcb);
    horizWrap.add(subPcb);

    // 2x 0201 I2C pull-up resistors flanking the ALS IC cleanly within 3.6mm PCB width
    for (const sx of [-1.2, 1.2]) {
      const pass = buildSmdPassive(0.62, 0.36, 0.26, mats.smdCeramic, mats.silverElectrode, 'z');
      pass.position.set(sx, 1.32, -0.4);
      horizWrap.add(pass);
    }

    // Clear-molded V(lambda) RGB+ALS 16-bit Photodiode IC facing UP (+Y) directly under E92 TIR light-pipe!
    const alsPkg = new THREE.Mesh(
      createChamferedBoxGeo(2.25, 1.85, 0.36, 0.2, 0.03, 'z'),
      mats.icEpoxy
    );
    alsPkg.position.set(0, 0, -0.46);
    const rgbDieGeo = applyPlanarUVs(new THREE.PlaneGeometry(1.65, 1.4), 1.65, 1.4, 'xy-back');
    const rgbDie = new THREE.Mesh(rgbDieGeo, mats.ultra.evfAmbientRgbDie);
    rgbDie.rotation.y = Math.PI;
    rgbDie.position.set(0, 0, -0.66);
    rgbDie.userData.noEdges = true;

    // Gold side solder castellations on ALS package
    for (const sx of [-1.18, 1.18]) {
      for (const sy of [-0.46, 0.46]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.32, 0.32), mats.goldPlating);
        leg.position.set(sx, sy, -0.46);
        leg.userData.noEdges = true;
        horizWrap.add(leg);
      }
    }

    // Smooth low-profile hemispherical optical condenser micro-lens dome facing +Y into E92 exit seal!
    const microLens = new THREE.Mesh(
      hiResSphere(0.56, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.5).rotateX(-Math.PI / 2),
      mats.evfLensAspheric
    );
    microLens.position.set(0, 0, -0.67);
    microLens.userData.noEdges = true;
    horizWrap.add(alsPkg, rgbDie, microLens);

    // Compact shielded amber polyimide I2C flex tongue routing cleanly forward (+Z) toward E36 seam
    const fpcGeo = applyPlanarUVs(new THREE.BoxGeometry(2.1, 1.4, 0.16), 2.1, 1.4, 'xy');
    const fpc = new THREE.Mesh(fpcGeo, mats.ultra.evfOemFlexRibbon);
    fpc.position.set(0.0, 2.25, 0.12);
    const zifGold = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.64, 0.2), mats.goldPlating);
    zifGold.position.set(0.0, 2.62, 0.12);
    zifGold.userData.noEdges = true;
    horizWrap.add(fpc, zifGold);
    enrichE30AmbientPd(horizWrap, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-ambient-photodiode',
      30,
      '#10b981',
      ambientPdGroup,
      new THREE.Vector3(-11.8, 53.2, -28.2),
      new THREE.Vector3(-34, 34, -36),
      new THREE.Vector3(-36, 68, -46),
      cp,
      0.24
    )
  );

  // =========================================================================
  // E31: Diopter-Wheel Tactile Click Detent Leaf Spring & Zero-Stop Index Cam
  //      Coaxial on true Sony -X (right) diopter shaft at (-19.20, 39.50, -15.60)!
  // =========================================================================
  const diopterDetentGroup = new THREE.Group();
  {
    // 36-step precision-hobbed C3604 brass click ratchet wheel (COAXIAL on -X diopter shaft!)
    const ratchetWheel = new THREE.Mesh(
      createDiopterRatchetWheelGeo(36, 3.25, 0.68, 1.06).rotateY(Math.PI / 2),
      mats.brassGear
    );
    ratchetWheel.position.x = 0.02;
    diopterDetentGroup.add(ratchetWheel);

    // Central HOLLOW keyed stainless drive bushing clearing E12 dialShaft (R=0.92) & E37 brassThrust!
    const hub = createSteppedLensCell(1.06, 1.48, 0.78, mats.stainlessMachined, undefined, 0);
    hub.rotation.y = Math.PI / 2;
    diopterDetentGroup.add(hub);

    // Formed curved CuBe2 cantilever click detent leaf spring running vertically tangent to +Z ratchet rim!
    const leafSpring = new THREE.Mesh(
      buildFlatRibbonExtrude(
        [
          [0.35, -3.8],
          [0.15, -2.0],
          [-0.15, 0.0],
          [0.18, 1.8],
          [0.35, 2.8],
        ],
        0.26,
        0.72,
        'yz'
      ),
      mats.beCuSpring
    );
    leafSpring.position.set(0, 0, 3.8);
    diopterDetentGroup.add(leafSpring);

    // Mounting anchor rivet pad at lower base of leaf spring
    const anchorBlock = new THREE.Mesh(
      createChamferedBoxGeo(0.84, 1.5, 0.96, 0.14, 0.04, 'z'),
      mats.matteBlackAnodized
    );
    anchorBlock.position.set(0, -4.1, 4.12);
    const rivet = new THREE.Mesh(hiResCyl(0.36, 0.36, 0.92, 12).rotateX(Math.PI / 2), mats.titaniumRivet);
    rivet.position.set(0, -4.1, 4.12);
    rivet.userData.noEdges = true;
    diopterDetentGroup.add(anchorBlock, rivet);

    // Hardened titanium V-nose detent cam follower engaging the brass ratchet teeth
    const tipShape = new THREE.Shape();
    tipShape.moveTo(0, -0.56);
    tipShape.lineTo(-0.72, 0);
    tipShape.lineTo(0, 0.56);
    tipShape.lineTo(0.34, 0.42);
    tipShape.lineTo(0.34, -0.42);
    tipShape.closePath();
    const detentTip = new THREE.Mesh(
      extrudeHiRes(tipShape, 0.68, 0.04, 0.04, 1, 10).rotateY(Math.PI / 2),
      mats.titaniumRivet
    );
    detentTip.position.set(0, 0, 3.48);
    diopterDetentGroup.add(detentTip);

    // Stainless zero-diopter reference index cam collar with crisp chamfered datum lug!
    const zeroCam = new THREE.Mesh(
      hiResTorus(2.48, 0.2, 10, 28).rotateY(Math.PI / 2),
      mats.mountStainlessFlange
    );
    zeroCam.position.x = -0.28;
    const zeroLug = new THREE.Mesh(
      createChamferedBoxGeo(0.42, 0.85, 0.72, 0.12, 0.04, 'z'),
      mats.mountRedIndexDot
    );
    zeroLug.position.set(-0.28, 2.82, 0);
    zeroLug.userData.noEdges = true;
    diopterDetentGroup.add(zeroCam, zeroLug);
    enrichE31DiopterDetent(diopterDetentGroup, mats);
  }
  parts.push(
    finalizeEvfPart(
      'evf-diopter-detent',
      31,
      '#d97706',
      diopterDetentGroup,
      new THREE.Vector3(-19.2, EVF_OPTICAL_Y, -15.6),
      new THREE.Vector3(-44, -8, -16),
      new THREE.Vector3(-46, 26, -24),
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
    const zShift = diopterWave * 1.2;

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
  // Phase 16B / Phase 31 / Precision + Ultra Expansion: 74 standalone-only EVF micro-parts (E32–E55, E56–E75, E76–E105)
  const [mMicro, mPrecision, mUltra] = await Promise.all([
    import('./evfMicroParts'),
    import('./evfPrecisionParts'),
    import('./evfUltraParts'),
  ]);
  return [
    ...mMicro.buildEvfMicroParts(mats),
    ...mPrecision.buildEvfPrecisionParts(mats),
    ...mUltra.buildEvfUltraParts(mats),
  ];
}
