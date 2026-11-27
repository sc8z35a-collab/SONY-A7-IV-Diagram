import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
  createPrecisionScrew,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyBoxUVs,
  applyPlanarUVs,
  buildChipPackage,
  buildSmdPassive,
  createChamferedBoxGeo,
  extrudeHiRes,
  hiResCyl,
  hiResSphere,
  hiResTorus,
  markHiRes,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

function finalizeSensorUltraPart(
  id: string,
  order: number,
  swatchColor: string,
  group: THREE.Group,
  assembledPos: THREE.Vector3,
  explodeOffset: THREE.Vector3,
  clippingPlanes: THREE.Plane[],
  options?: { ibisMovable?: boolean; ultrasonicElement?: boolean; edgeOpacity?: number }
): CadPart {
  group.position.copy(assembledPos);
  tagPartMeshes(group, id);
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 26, options?.edgeOpacity ?? 0.24);

  return {
    id,
    subsystem: 'sensor',
    order,
    swatchColor,
    group,
    assembledPos,
    explodeOffset,
    interactiveMeshes: meshes,
    edgeLines: edges,
    explanation: lazyExplanationStub(id),
    ibisMovable: options?.ibisMovable ?? false,
    ultrasonicElement: options?.ultrasonicElement ?? false,
    standaloneOnly: true,
  };
}

/**
 * Helper: build a clean InstancedMesh from a list of transforms (matrixAutoUpdate=false, zero-GC build helper).
 * CompiledV2Unit ingests InstancedMesh directly into Tier-1 instanced pools with minimal draw calls.
 */
function makeInstanced(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  transforms: ReadonlyArray<{
    pos: readonly [number, number, number];
    rot?: readonly [number, number, number];
    scale?: readonly [number, number, number];
  }>
): THREE.InstancedMesh {
  const inst = new THREE.InstancedMesh(geo, mat, transforms.length);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < transforms.length; i++) {
    const t = transforms[i];
    dummy.position.set(t.pos[0], t.pos[1], t.pos[2]);
    if (t.rot) dummy.rotation.set(t.rot[0], t.rot[1], t.rot[2]);
    else dummy.rotation.set(0, 0, 0);
    if (t.scale) dummy.scale.set(t.scale[0], t.scale[1], t.scale[2]);
    else dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  inst.instanceMatrix.needsUpdate = true;
  inst.matrixAutoUpdate = false;
  inst.updateMatrix();
  return inst;
}

/**
 * Helper: build an extruded smooth flat ribbon strip in XY/YZ/XZ plane for S-loop leads & folded graphite straps.
 */
function buildRibbonExtrude(
  points2D: ReadonlyArray<readonly [number, number]>,
  thickness: number,
  width: number,
  plane: 'xy' | 'xz' | 'yz'
): THREE.ExtrudeGeometry {
  const curve = new THREE.SplineCurve(points2D.map(([a, b]) => new THREE.Vector2(a, b)));
  const samples = curve.getPoints(24);
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
  if (plane === 'xz') geo.rotateX(Math.PI / 2);
  else if (plane === 'yz') geo.rotateY(-Math.PI / 2);
  geo.computeVertexNormals();
  return markHiRes(geo);
}

/**
 * Real-Machine Precision Expansion — 30 Standalone-Only Full-Frame Sensor & 5-Axis IBIS Parts (S91–S120 -> 120 total).
 * Grounded in Sony ILCE-7M4 / ILCE-7RM5 service manual OEM assemblies (OFB-01-187, TEX-5810, MB CUSHION SHEET 5400,
 * AS HEAT PLT SPACER TOP 5510, MB GRAPHITE SHEET TOP A 5800), Kyocera/NGK HTCC ceramic CIS package architecture,
 * and Sony full-frame IMX sensor + 5-axis IBIS teardown engineering.
 */
export function buildSensorUltraPrecisionParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;

  // =========================================================================
  // S91. Optical Filter Block Precision Molded LCP Frame (OFB-01-187) & Datum Ribs
  // =========================================================================
  {
    const g = new THREE.Group();
    // Main precision-molded black glass-filled LCP perimeter housing surrounding OLPF/QWP/IR-cut
    const outerFrameGeo = extrudeHiRes(
      createFrameShape(45.6, 33.4, 1.4, 41.2, 29.4, 0.7),
      2.65,
      0.08,
      0.08,
      2,
      14
    );
    applyBoxUVs(outerFrameGeo, 14.0);
    const outerFrame = new THREE.Mesh(outerFrameGeo, mats.mountPpsInsulator);
    g.add(outerFrame);

    // Internal stepped filter-seating datum shelf (locates quartz OLPF/IR-cut without edge contact stress)
    const innerLedgeGeo = extrudeHiRes(
      createFrameShape(41.5, 29.7, 0.7, 39.2, 27.2, 0.5),
      0.42,
      0.03,
      0.03,
      1,
      12
    );
    const innerLedge = new THREE.Mesh(innerLedgeGeo, mats.matteBlackAnodized);
    innerLedge.position.z = -1.05;
    g.add(innerLedge);

    // 4 molded corner glass-alignment datum bosses + retainer clip latch lugs
    const cornerBossGeo = createChamferedBoxGeo(2.8, 2.8, 2.9, 0.35, 0.05, 'z');
    const latchLugGeo = createChamferedBoxGeo(3.4, 1.3, 0.65, 0.2, 0.04, 'z');
    const bosses: Array<{ pos: [number, number, number] }> = [];
    const lugs: Array<{ pos: [number, number, number] }> = [];
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        bosses.push({ pos: [sx * 21.6, sy * 15.6, 0.05] });
        lugs.push({ pos: [sx * 14.5, sy * 17.15, 0.95] });
      }
    }
    g.add(makeInstanced(cornerBossGeo, mats.mountPpsInsulator, bosses));
    g.add(makeInstanced(latchLugGeo, mats.matteBlackAnodized, lugs));

    // Bottom PZT clearance reinforcement bridge & side anti-reflection micro-ribs
    const ribGeo = new THREE.BoxGeometry(0.32, 2.2, 2.3);
    const ribTfs: Array<{ pos: [number, number, number] }> = [];
    for (let i = -5; i <= 5; i++) {
      ribTfs.push({ pos: [i * 3.2, 15.85, 0.0] });
      ribTfs.push({ pos: [i * 3.2, -15.85, 0.0] });
    }
    g.add(makeInstanced(ribGeo, mats.ultra.sensorVelvetBaffle, ribTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-ofb-frame-housing',
        91,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 5.15),
        new THREE.Vector3(64, -26, 76),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S92. SSWF Ultrasonic Flexural Nodal Silicone Support Pads & Corner Bumpers
  // =========================================================================
  {
    const g = new THREE.Group();
    // Free-free first bending mode nodal lines sit at x = ±0.224 * L (±9.85 mm for L = 44 mm)
    const nodalPadGeo = createChamferedBoxGeo(3.6, 1.35, 0.72, 0.28, 0.06, 'z');
    const nodalPads: Array<{ pos: [number, number, number] }> = [
      { pos: [-9.85, 14.85, 0] },
      { pos: [9.85, 14.85, 0] },
      { pos: [-9.85, -14.85, 0] },
      { pos: [9.85, -14.85, 0] },
    ];
    g.add(makeInstanced(nodalPadGeo, mats.damperElastomer, nodalPads));

    // Acoustic isolation micro-grooves & nodal index brass clips on the 4 nodal seats
    const nodalClipGeo = new THREE.BoxGeometry(4.1, 0.35, 0.24);
    const clips: Array<{ pos: [number, number, number] }> = [
      { pos: [-9.85, 15.65, 0.22] },
      { pos: [9.85, 15.65, 0.22] },
      { pos: [-9.85, -15.65, 0.22] },
      { pos: [9.85, -15.65, 0.22] },
    ];
    g.add(makeInstanced(nodalClipGeo, mats.brassGear, clips));

    // 4 soft Shore-A30 silicone L-shaped anti-slip corner cushions (zero flexural clamping)
    const cornerGeo = createChamferedBoxGeo(2.1, 2.1, 0.86, 0.35, 0.08, 'z');
    const corners: Array<{ pos: [number, number, number] }> = [];
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        corners.push({ pos: [sx * 21.4, sy * 15.1, 0.05] });
      }
    }
    g.add(makeInstanced(cornerGeo, mats.butylDamperRubber, corners));

    // Ultra-thin perimeter silicone decoupling frame connecting nodal mounts
    const tieFrameGeo = extrudeHiRes(
      createFrameShape(44.4, 31.8, 1.0, 43.3, 30.6, 0.8),
      0.24,
      0.02,
      0.02,
      1,
      10
    );
    const tieFrame = new THREE.Mesh(tieFrameGeo, mats.epdmGasket);
    tieFrame.position.z = -0.26;
    g.add(tieFrame);

    parts.push(
      finalizeSensorUltraPart(
        'sensor-sswf-nodal-dampers',
        92,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0, 5.95),
        new THREE.Vector3(-68, 28, 86),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S93. Ultrasonic PZT Backing High-Density Brass Counter-Mass Bar & Acoustic Matching Layer
  // =========================================================================
  {
    const g = new THREE.Group();
    // High-density C3604 brass inertial reaction counter-mass bar reflecting backward acoustic waves into SSWF glass
    const massBarGeo = createChamferedBoxGeo(41.8, 3.6, 0.88, 0.38, 0.08, 'z');
    applyBoxUVs(massBarGeo, 14.0);
    const massBar = new THREE.Mesh(massBarGeo, mats.brassGear);
    massBar.position.z = 0.22;
    g.add(massBar);

    // Silver-loaded acoustic impedance matching epoxy bond lamina (Z_match = sqrt(Z_pzt * Z_brass))
    const matchLayerGeo = createChamferedBoxGeo(41.2, 3.25, 0.16, 0.25, 0.02, 'z');
    const matchLayer = new THREE.Mesh(matchLayerGeo, mats.sinteredSilver);
    matchLayer.position.z = -0.28;
    matchLayer.userData.noEdges = true;
    g.add(matchLayer);

    // Machined standing-wave harmonic relief slots along the brass bar (suppresses parasitic transverse modes)
    const slotGeo = new THREE.BoxGeometry(0.65, 2.5, 0.26);
    const slots: Array<{ pos: [number, number, number] }> = [];
    for (const sx of [-15.2, -9.85, 0, 9.85, 15.2]) {
      slots.push({ pos: [sx, 0, 0.62] });
    }
    g.add(makeInstanced(slotGeo, mats.matteBlackAnodized, slots));

    // Twin precision locating dowel bosses at ends of counter-mass bar
    const pinGeo = hiResCyl(0.55, 0.55, 1.15, 12).rotateX(Math.PI / 2);
    g.add(
      makeInstanced(pinGeo, mats.stainlessMachined, [
        { pos: [-19.4, 0, 0.1] },
        { pos: [19.4, 0, 0.1] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-pzt-countermass-bar',
        93,
        '#d97706',
        g,
        new THREE.Vector3(0, -14.1, 7.62),
        new THREE.Vector3(44, -56, 94),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S94. Optical Filter Retainer Low-Profile M1.2 Black-Nickel Micro-Screws & PTFE Stress Washers
  // =========================================================================
  {
    const g = new THREE.Group();
    const screwCoords: ReadonlyArray<readonly [number, number]> = [
      [-21.2, 15.2],
      [21.2, 15.2],
      [-21.2, -15.2],
      [21.2, -15.2],
    ];
    // Translucent PTFE / polyimide stress-relief washers (prevent quartz OLPF stress birefringence)
    const washerGeo = hiResCyl(1.72, 1.72, 0.18, 16).rotateX(Math.PI / 2);
    const collarGeo = hiResTorus(1.18, 0.14, 6, 16);
    const washerTfs: Array<{ pos: [number, number, number] }> = [];
    const collarTfs: Array<{ pos: [number, number, number] }> = [];

    for (const [sx, sy] of screwCoords) {
      washerTfs.push({ pos: [sx, sy, -0.24] });
      collarTfs.push({ pos: [sx, sy, -0.05] });
      const microScrew = createPrecisionScrew(1.05, 0.36, 1.55, mats.matteBlackAnodized);
      microScrew.position.set(sx, sy, 0.15);
      g.add(microScrew);
    }
    g.add(makeInstanced(washerGeo, mats.zifIvoryPlastic, washerTfs));
    g.add(makeInstanced(collarGeo, mats.stainlessMachined, collarTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-ofb-clip-screws',
        94,
        '#64748b',
        g,
        new THREE.Vector3(0, 0, 7.05),
        new THREE.Vector3(56, 68, 110),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S95. Long-Exposure IR-Leak-Blocking Carbon-Black Micro-Cellular Foam Perimeter Seal
  // =========================================================================
  {
    const g = new THREE.Group();
    // Closed-cell PORON LE-20 carbon-black polyurethane gasket blocking 850–940 nm near-IR lateral stray light
    const mainSealGeo = extrudeHiRes(
      createFrameShape(45.0, 32.8, 1.2, 41.6, 29.6, 0.7),
      2.4,
      0.08,
      0.08,
      2,
      14
    );
    applyBoxUVs(mainSealGeo, 12.0);
    const mainSeal = new THREE.Mesh(mainSealGeo, mats.ultra.sensorVelvetBaffle);
    g.add(mainSeal);

    // Front & rear twin compressible light-trap labyrinth lip rings
    const frontLipGeo = extrudeHiRes(
      createFrameShape(44.2, 32.0, 1.0, 42.4, 30.2, 0.7),
      0.34,
      0.04,
      0.04,
      1,
      12
    );
    const frontLip = new THREE.Mesh(frontLipGeo, mats.epdmGasket);
    frontLip.position.z = 1.32;
    const rearLip = new THREE.Mesh(frontLipGeo, mats.epdmGasket);
    rearLip.position.z = -1.32;
    g.add(frontLip, rearLip);

    // Interlocking dovetail corner light-seal tabs (eliminate corner butt-joint IR pinholes)
    const tabGeo = createChamferedBoxGeo(2.6, 2.6, 2.7, 0.3, 0.04, 'z');
    const tabTfs: Array<{ pos: [number, number, number] }> = [];
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        tabTfs.push({ pos: [sx * 22.0, sy * 15.9, 0] });
      }
    }
    g.add(makeInstanced(tabGeo, mats.butylDamperRubber, tabTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-ir-leak-light-seal',
        95,
        '#1e293b',
        g,
        new THREE.Vector3(0, 0, 3.65),
        new THREE.Vector3(-68, -28, 64),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S96. HTCC Ceramic Package 2-Tier Stepped Wire-Bond Shelf & Ni/Au Bond Fingers
  // =========================================================================
  {
    const g = new THREE.Group();
    // Lower inner alumina wire-bond tier (short low-inductance path for 5+ Gbps SLVS-EC differential pairs)
    const lowerShelfGeo = extrudeHiRes(
      createFrameShape(44.2, 33.0, 0.6, 40.9, 29.1, 0.4),
      0.42,
      0.03,
      0.03,
      1,
      12
    );
    applyBoxUVs(lowerShelfGeo, 14.0);
    const lowerShelf = new THREE.Mesh(lowerShelfGeo, mats.ultra.sensorHtccCeramic);
    lowerShelf.position.z = -0.18;

    // Upper outer alumina wire-bond tier (power/ground & control buses staggered outward)
    const upperShelfGeo = extrudeHiRes(
      createFrameShape(46.2, 35.0, 0.7, 43.4, 32.2, 0.5),
      0.42,
      0.03,
      0.03,
      1,
      12
    );
    applyBoxUVs(upperShelfGeo, 14.0);
    const upperShelf = new THREE.Mesh(upperShelfGeo, mats.ceramicAlumina);
    upperShelf.position.z = 0.22;
    g.add(lowerShelf, upperShelf);

    // 136 instanced electrolytic Ni/Au-plated tungsten bond fingers across inner & outer stepped shelves
    const fingerGeo = new THREE.BoxGeometry(0.42, 1.15, 0.08);
    const fingerTfs: Array<{ pos: [number, number, number]; rot?: [number, number, number] }> = [];
    // Top & bottom edges (inner tier + staggered outer tier)
    for (let i = -18; i <= 18; i++) {
      const x = i * 1.05;
      fingerTfs.push({ pos: [x, 15.45, 0.06] });
      fingerTfs.push({ pos: [x, -15.45, 0.06] });
      if (i % 2 === 0) {
        fingerTfs.push({ pos: [x + 0.52, 16.85, 0.46] });
        fingerTfs.push({ pos: [x + 0.52, -16.85, 0.46] });
      }
    }
    // Left & right edges (inner tier)
    for (let j = -11; j <= 11; j++) {
      const y = j * 1.2;
      fingerTfs.push({ pos: [-21.35, y, 0.06], rot: [0, 0, Math.PI / 2] });
      fingerTfs.push({ pos: [21.35, y, 0.06], rot: [0, 0, Math.PI / 2] });
    }
    g.add(makeInstanced(fingerGeo, mats.goldPlating, fingerTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-ceramic-bond-shelf',
        96,
        '#f59e0b',
        g,
        new THREE.Vector3(0, 0, 0.28),
        new THREE.Vector3(80, 26, 20),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S97. Ceramic Package Top Kovar Low-CTE Metallized Seal Ring & Au-Sn Braze Preform
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stamped Fe-29Ni-17Co Kovar seal ring matched to alumina & quartz glass CTE (~5.5 ppm/K)
    const kovarGeo = extrudeHiRes(
      createFrameShape(47.6, 36.8, 0.9, 43.4, 32.6, 0.6),
      0.38,
      0.04,
      0.04,
      2,
      14
    );
    applyBoxUVs(kovarGeo, 14.0);
    const kovarRing = new THREE.Mesh(kovarGeo, mats.kovarSeal);
    g.add(kovarRing);

    // Continuous Au80-Sn20 eutectic solder preform bead along upper seam-weld perimeter
    const brazeGeo = extrudeHiRes(
      createFrameShape(46.7, 35.9, 0.8, 44.3, 33.5, 0.65),
      0.14,
      0.02,
      0.02,
      1,
      12
    );
    const brazeBead = new THREE.Mesh(brazeGeo, mats.goldPlating);
    brazeBead.position.z = 0.24;
    brazeBead.userData.noEdges = true;
    g.add(brazeBead);

    // Underside Ag-Cu eutectic metallized braze interface pad frame
    const agCuGeo = extrudeHiRes(
      createFrameShape(47.3, 36.5, 0.85, 43.7, 32.9, 0.6),
      0.1,
      0.01,
      0.01,
      1,
      10
    );
    const agCuPad = new THREE.Mesh(agCuGeo, mats.silverElectrode);
    agCuPad.position.z = -0.22;
    agCuPad.userData.noEdges = true;
    g.add(agCuPad);

    // 4 corner laser parallel-seam-weld witness beads
    const weldGeo = hiResCyl(0.65, 0.65, 0.16, 10).rotateX(Math.PI / 2);
    g.add(
      makeInstanced(weldGeo, mats.solderBallSilver, [
        { pos: [-22.6, 17.2, 0.26] },
        { pos: [22.6, 17.2, 0.26] },
        { pos: [-22.6, -17.2, 0.26] },
        { pos: [22.6, -17.2, 0.26] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-kovar-seal-ring',
        97,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, 1.32),
        new THREE.Vector3(-68, 36, 28),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S98. In-Package Perimeter 0201 / Si-Cap Ultra-Low-ESL Bypass Capacitors
  // =========================================================================
  {
    const g = new THREE.Group();
    // Recessed ceramic perimeter decoupling rail pads (connects directly to die power planes <1 mm away)
    const busFrameGeo = extrudeHiRes(
      createFrameShape(46.8, 35.8, 0.6, 44.6, 33.6, 0.5),
      0.1,
      0.01,
      0.01,
      1,
      10
    );
    const busFrame = new THREE.Mesh(busFrameGeo, mats.goldPlating);
    busFrame.position.z = -0.14;
    busFrame.userData.noEdges = true;
    g.add(busFrame);

    // 32 instanced 0201 ultra-low-profile MLCC bodies + 64 end-cap silver/tin terminations
    const capBodyGeo = new THREE.BoxGeometry(0.95, 0.52, 0.34);
    const capEndGeo = new THREE.BoxGeometry(0.24, 0.56, 0.38);
    const bodyTfs: Array<{ pos: [number, number, number]; rot?: [number, number, number] }> = [];
    const endTfs: Array<{ pos: [number, number, number]; rot?: [number, number, number] }> = [];

    // 10 along top edge, 10 along bottom edge
    for (let i = 0; i < 10; i++) {
      const x = -18.0 + i * 4.0;
      for (const y of [17.35, -17.35]) {
        bodyTfs.push({ pos: [x, y, 0.08] });
        endTfs.push({ pos: [x - 0.44, y, 0.08] });
        endTfs.push({ pos: [x + 0.44, y, 0.08] });
      }
    }
    // 6 along left edge, 6 along right edge
    for (let j = 0; j < 6; j++) {
      const y = -11.5 + j * 4.6;
      for (const x of [-22.85, 22.85]) {
        bodyTfs.push({ pos: [x, y, 0.08], rot: [0, 0, Math.PI / 2] });
        endTfs.push({ pos: [x, y - 0.44, 0.08], rot: [0, 0, Math.PI / 2] });
        endTfs.push({ pos: [x, y + 0.44, 0.08], rot: [0, 0, Math.PI / 2] });
      }
    }
    g.add(makeInstanced(capBodyGeo, mats.smdCeramic, bodyTfs));
    g.add(makeInstanced(capEndGeo, mats.solderBallSilver, endTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-pkg-cavity-mlcc',
        98,
        '#ca8a04',
        g,
        new THREE.Vector3(0, 0, 0.82),
        new THREE.Vector3(86, -42, 8),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S99. Low-Alpha Cover Glass Precision C0.15 Bevel Chamfer, 14-Layer IAD-AR & CrOx Aperture Mask
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision diamond-ground C0.15 45-degree chamfered glass perimeter bezel (prevents micro-chipping particles)
    const bevelRimGeo = extrudeHiRes(
      createFrameShape(47.2, 36.6, 0.7, 45.2, 34.6, 0.5),
      0.52,
      0.14,
      0.14,
      2,
      14
    );
    const bevelRim = new THREE.Mesh(bevelRimGeo, mats.quartzEdge);
    g.add(bevelRim);

    // Double-sided 14-layer Ion-Assisted Deposition broadband AR coating lamina (R < 0.25% @ 400–700 nm)
    const arSheetGeo = markHiRes(new THREE.PlaneGeometry(44.8, 34.2));
    applyPlanarUVs(arSheetGeo, 44.8, 34.2, 'xy');
    const arFront = new THREE.Mesh(arSheetGeo, mats.ultra.sensorOpticalFilterCoating);
    arFront.position.z = 0.3;
    arFront.userData.noEdges = true;
    const arRear = new THREE.Mesh(arSheetGeo, mats.nanoArIridescent);
    arRear.position.z = -0.3;
    arRear.rotation.y = Math.PI;
    arRear.userData.noEdges = true;
    g.add(arFront, arRear);

    // Underside sputtered opaque chrome-oxide (Cr/CrOx) stray-light aperture border mask framing active sensor
    const crMaskGeo = extrudeHiRes(
      createFrameShape(45.4, 34.8, 0.5, 40.4, 28.4, 0.35),
      0.06,
      0.01,
      0.01,
      1,
      10
    );
    const crMask = new THREE.Mesh(crMaskGeo, mats.matteBlackAnodized);
    crMask.position.z = -0.28;
    g.add(crMask);

    parts.push(
      finalizeSensorUltraPart(
        'sensor-coverglass-chamfer-ar',
        99,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, 2.32),
        new THREE.Vector3(-62, -36, 42),
        cp,
        { ibisMovable: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S100. Ceramic Package Sidewall Castellated Half-Vias & Optical V-Datum Notches
  // =========================================================================
  {
    const g = new THREE.Group();
    // 64 instanced gold-plated semicircular castellated half-via electrodes on ceramic package outer walls
    const castGeo = hiResCyl(0.32, 0.32, 2.55, 10, false, 0, Math.PI).rotateX(Math.PI / 2);
    const castTfs: Array<{ pos: [number, number, number]; rot: [number, number, number] }> = [];
    // Top & bottom sidewalls (20 each)
    for (let i = 0; i < 20; i++) {
      const x = -20.9 + i * 2.2;
      castTfs.push({ pos: [x, 19.62, 0], rot: [0, 0, Math.PI] });
      castTfs.push({ pos: [x, -19.62, 0], rot: [0, 0, 0] });
    }
    // Left & right sidewalls (12 each)
    for (let j = 0; j < 12; j++) {
      const y = -13.75 + j * 2.5;
      castTfs.push({ pos: [-24.88, y, 0], rot: [0, 0, -Math.PI / 2] });
      castTfs.push({ pos: [24.88, y, 0], rot: [0, 0, Math.PI / 2] });
    }
    g.add(makeInstanced(castGeo, mats.goldPlating, castTfs));

    // Precision CNC-ground ceramic optical datum V-notch frames on left/right/bottom + 45° Pin-1 index corner bevel
    const notchShape = new THREE.Shape();
    notchShape.moveTo(-1.1, -0.7);
    notchShape.lineTo(1.1, -0.7);
    notchShape.lineTo(1.1, 0.7);
    notchShape.lineTo(0.45, 0.7);
    notchShape.lineTo(0, 0.05);
    notchShape.lineTo(-0.45, 0.7);
    notchShape.lineTo(-1.1, 0.7);
    notchShape.closePath();
    const notchGeo = extrudeHiRes(notchShape, 2.7, 0.04, 0.04, 1, 8);
    const notchL = new THREE.Mesh(notchGeo, mats.ultra.sensorHtccCeramic);
    notchL.rotation.z = -Math.PI / 2;
    notchL.position.set(-24.6, 0, 0);
    const notchR = new THREE.Mesh(notchGeo, mats.ultra.sensorHtccCeramic);
    notchR.rotation.z = Math.PI / 2;
    notchR.position.set(24.6, 0, 0);
    const pin1Index = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 2.8, 2.65, 0.25, 0.06, 'z'),
      mats.goldPlating
    );
    pin1Index.rotation.z = Math.PI / 4;
    pin1Index.position.set(-23.8, 18.5, 0);
    g.add(notchL, notchR, pin1Index);

    parts.push(
      finalizeSensorUltraPart(
        'sensor-ceramic-castellations',
        100,
        '#eab308',
        g,
        new THREE.Vector3(0, 0, -0.52),
        new THREE.Vector3(-72, -12, -10),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S101. Sensor PCB 0.2mm-Pitch High-Speed SLVS-EC B2B Mezzanine Connector
  // =========================================================================
  {
    const g = new THREE.Group();
    // Molded dark LCP narrow-pitch mezzanine receptacle housing with central polarization island
    const bodyOuterGeo = extrudeHiRes(
      createFrameShape(21.6, 4.1, 0.35, 19.6, 2.2, 0.2),
      1.02,
      0.05,
      0.05,
      2,
      10
    );
    const bodyOuter = new THREE.Mesh(bodyOuterGeo, mats.mountPpsInsulator);
    const centerIsland = new THREE.Mesh(
      createChamferedBoxGeo(18.6, 0.85, 0.92, 0.14, 0.04, 'z'),
      mats.icEpoxy
    );
    centerIsland.position.z = -0.04;
    g.add(bodyOuter, centerIsland);

    // 64 instanced 0.3mm-pitch dual-wipe gold-plated phosphor-bronze high-speed differential contacts (32 per row)
    const pinGeo = new THREE.BoxGeometry(0.18, 0.95, 0.72);
    const pinTfs: Array<{ pos: [number, number, number] }> = [];
    for (let i = 0; i < 32; i++) {
      const x = -8.835 + i * 0.57;
      pinTfs.push({ pos: [x, 1.38, -0.14] });
      pinTfs.push({ pos: [x, -1.38, -0.14] });
    }
    g.add(makeInstanced(pinGeo, mats.goldPlating, pinTfs));

    // Full-armor stainless steel EMI end-shell hold-down latches (absorb B2B mating force & ground shield)
    const armorGeo = createChamferedBoxGeo(1.45, 4.35, 1.08, 0.16, 0.04, 'z');
    g.add(
      makeInstanced(armorGeo, mats.stainlessMachined, [
        { pos: [-10.55, 0, 0] },
        { pos: [10.55, 0, 0] },
      ])
    );

    // Solder fillet anchor pads along end-armor ground tabs
    const filletGeo = new THREE.BoxGeometry(1.6, 0.65, 0.24);
    g.add(
      makeInstanced(filletGeo, mats.solderBallSilver, [
        { pos: [-10.55, 2.25, 0.38] },
        { pos: [-10.55, -2.25, 0.38] },
        { pos: [10.55, 2.25, 0.38] },
        { pos: [10.55, -2.25, 0.38] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-b2b-mezzanine-conn',
        101,
        '#f97316',
        g,
        new THREE.Vector3(0, -14.8, -3.45),
        new THREE.Vector3(68, -46, -42),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S102. On-Sensor-PCB Factory Calibration Serial EEPROM IC (DPM / PRNU / DRA Memory)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Isolated low-noise copper-guarded sub-island on rear of sensor PCB
    const padIslandGeo = createChamferedBoxGeo(8.2, 5.4, 0.36, 0.35, 0.04, 'z');
    applyBoxUVs(padIslandGeo, 10.0);
    const padIsland = new THREE.Mesh(padIslandGeo, mats.ultra.sensorHallSubPcb);
    g.add(padIsland);

    // 256-Kbit USON-8 / QFN-8 SPI/I2C Non-Volatile Calibration EEPROM IC
    const eepromIc = buildChipPackage({
      w: 3.4,
      d: 2.8,
      h: 0.62,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    eepromIc.rotation.y = Math.PI;
    eepromIc.position.set(-1.1, 0, -0.46);
    g.add(eepromIc);

    // Write-protect pull-up 0402 resistor + 100 nF Vcc decoupling MLCC
    const wpRes = buildSmdPassive(1.15, 0.58, 0.42, mats.matteBlackAnodized, mats.solderBallSilver, 'z');
    wpRes.rotation.y = Math.PI;
    wpRes.position.set(2.2, 1.15, -0.38);
    const vccCap = buildSmdPassive(1.15, 0.58, 0.42, mats.smdCeramic, mats.solderBallSilver, 'z');
    vccCap.rotation.y = Math.PI;
    vccCap.position.set(2.2, -1.15, -0.38);
    g.add(wpRes, vccCap);

    // 4 gold SPI bus programming micro-vias (CS, SCK, MOSI, MISO)
    const viaGeo = hiResCyl(0.28, 0.28, 0.14, 10).rotateX(Math.PI / 2);
    g.add(
      makeInstanced(viaGeo, mats.goldPlating, [
        { pos: [3.35, 1.6, -0.22] },
        { pos: [3.35, 0.55, -0.22] },
        { pos: [3.35, -0.55, -0.22] },
        { pos: [3.35, -1.6, -0.22] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-calib-eeprom-ic',
        102,
        '#a855f7',
        g,
        new THREE.Vector3(14.5, 16.0, -3.28),
        new THREE.Vector3(74, 48, -30),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S103. Analog/Digital Power-Rail Isolation Ferrite Beads & Shielded Inductor Pi-Filter Bank
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dedicated split-plane LC power filter strip isolating VANA 2.8V from VDIG 1.2V ADC switching ripple
    const carrierGeo = createChamferedBoxGeo(32.0, 5.2, 0.34, 0.4, 0.04, 'z');
    applyBoxUVs(carrierGeo, 12.0);
    const carrier = new THREE.Mesh(carrierGeo, mats.sensorPcb);
    g.add(carrier);

    // 4 shielded molded metal-alloy 1.0uH power inductors (Murata 1277AS class) for VANA/VDIG/VIF/VSL rails
    const indBodyGeo = createChamferedBoxGeo(2.8, 2.8, 1.05, 0.28, 0.08, 'z');
    const indLeadGeo = new THREE.BoxGeometry(0.55, 2.4, 0.25);
    const indTfs: Array<{ pos: [number, number, number] }> = [];
    const leadTfs: Array<{ pos: [number, number, number] }> = [];
    for (const ix of [-11.5, -3.8, 3.8, 11.5]) {
      indTfs.push({ pos: [ix, 0.65, -0.68] });
      leadTfs.push({ pos: [ix - 1.32, 0.65, -0.26] });
      leadTfs.push({ pos: [ix + 1.32, 0.65, -0.26] });
    }
    g.add(makeInstanced(indBodyGeo, mats.ferriteInductor, indTfs));
    g.add(makeInstanced(indLeadGeo, mats.solderBallSilver, leadTfs));

    // 12 instanced 0402 multilayer GHz-band ferrite beads + 8 low-ESR pi-filter decoupling MLCCs
    const fbGeo = new THREE.BoxGeometry(1.1, 0.58, 0.48);
    const capGeo = new THREE.BoxGeometry(1.25, 0.65, 0.52);
    const fbTfs: Array<{ pos: [number, number, number] }> = [];
    const capTfs: Array<{ pos: [number, number, number] }> = [];
    for (let i = 0; i < 12; i++) {
      fbTfs.push({ pos: [-13.75 + i * 2.5, -1.55, -0.4] });
    }
    for (let i = 0; i < 8; i++) {
      capTfs.push({ pos: [-14.0 + i * 4.0, 2.05, -0.42] });
    }
    g.add(makeInstanced(fbGeo, mats.icEpoxy, fbTfs));
    g.add(makeInstanced(capGeo, mats.tantalumCapYellow, capTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-power-ferrite-pi',
        103,
        '#22c55e',
        g,
        new THREE.Vector3(0, -10.5, -3.25),
        new THREE.Vector3(-92, 46, -48),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S104. SLVS-EC Control & Sync Line 0.2pF Ultra-Low-Capacitance ESD TVS Diode Array
  // =========================================================================
  {
    const g = new THREE.Group();
    const baseGeo = createChamferedBoxGeo(11.4, 4.8, 0.34, 0.32, 0.04, 'z');
    applyBoxUVs(baseGeo, 10.0);
    const base = new THREE.Mesh(baseGeo, mats.ultra.sensorHallSubPcb);
    g.add(base);

    // Twin DFN-10 straight-through 4-ch 0.2pF TVS surge suppressor arrays (±15kV IEC 61000-4-2 protection)
    for (const tx of [-2.8, 2.8]) {
      const tvs = buildChipPackage({
        w: 3.4,
        d: 1.5,
        h: 0.52,
        style: 'qfn',
        pinsPerSide: 5,
        bodyMat: mats.ultra.icEpoxyLaser,
        leadMat: mats.solderBallSilver,
        pin1Mat: mats.goldPlating,
        axis: 'z',
      });
      tvs.rotation.y = Math.PI;
      tvs.position.set(tx, 0, -0.42);
      g.add(tvs);
    }

    // Straight flow-through 100-ohm matched differential copper traces + low-inductance GND stitching vias
    const trGeo = new THREE.BoxGeometry(0.24, 3.8, 0.08);
    const viaGeo = hiResCyl(0.22, 0.22, 0.14, 8).rotateX(Math.PI / 2);
    const trTfs: Array<{ pos: [number, number, number] }> = [];
    const viaTfs: Array<{ pos: [number, number, number] }> = [];
    for (const tx of [-2.8, 2.8]) {
      for (const dx of [-1.05, -0.35, 0.35, 1.05]) {
        trTfs.push({ pos: [tx + dx, 0, -0.2] });
      }
      for (const dy of [-1.75, 1.75]) {
        viaTfs.push({ pos: [tx - 1.9, dy, -0.22] });
        viaTfs.push({ pos: [tx + 1.9, dy, -0.22] });
      }
    }
    g.add(makeInstanced(trGeo, mats.copperHeatSpreader, trTfs));
    g.add(makeInstanced(viaGeo, mats.goldPlating, viaTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-esd-tvs-diode-array',
        104,
        '#06b6d4',
        g,
        new THREE.Vector3(-18.5, -13.5, -3.25),
        new THREE.Vector3(-78, -36, -38),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S105. Sensor PCB Rear Factory ICT Gold Micro-Test-Pad Matrix & XVS/XHS Sync Probes
  // =========================================================================
  {
    const g = new THREE.Group();
    // Black solder-mask-defined ICT probe array strip across upper rear sensor PCB
    const maskStripGeo = createChamferedBoxGeo(26.4, 5.4, 0.26, 0.4, 0.03, 'z');
    const maskStrip = new THREE.Mesh(maskStripGeo, mats.icEpoxy);
    g.add(maskStrip);

    // 36 instanced ENIG gold-plated 0.65 mm circular ICT pogo-pin test pads (3 rows x 12 cols)
    const padGeo = hiResCyl(0.36, 0.36, 0.14, 12).rotateX(Math.PI / 2);
    const ringGeo = hiResTorus(0.46, 0.06, 6, 12);
    const padTfs: Array<{ pos: [number, number, number] }> = [];
    const ringTfs: Array<{ pos: [number, number, number] }> = [];
    for (let r = 0; r < 3; r++) {
      const py = -1.6 + r * 1.6;
      for (let c = 0; c < 12; c++) {
        const px = -11.0 + c * 2.0;
        padTfs.push({ pos: [px, py, -0.18] });
        if (r === 1 && (c === 0 || c === 11)) {
          ringTfs.push({ pos: [px, py, -0.22] });
        }
      }
    }
    g.add(makeInstanced(padGeo, mats.goldPlating, padTfs));
    g.add(makeInstanced(ringGeo, mats.copperHeatSpreader, ringTfs));

    // Twin optical vision-alignment fiducial targets for automated ICT bed-of-nails fixture
    const fidGeo = hiResCyl(0.6, 0.6, 0.12, 14).rotateX(Math.PI / 2);
    g.add(
      makeInstanced(fidGeo, mats.silverElectrode, [
        { pos: [-12.35, 1.9, -0.16] },
        { pos: [12.35, -1.9, -0.16] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-pcb-test-pads',
        105,
        '#facc15',
        g,
        new THREE.Vector3(0, 11.2, -3.28),
        new THREE.Vector3(58, 66, -44),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S106. SLVS-EC / ISL / ISD FPC SUS304 Stainless Stiffener Plates & Fatigue Tear-Stops
  // =========================================================================
  {
    const g = new THREE.Group();
    // 1) Bottom SLVS-EC B2B termination SUS304 laser-cut 0.15 mm backing stiffener plate
    const slvsStiffGeo = createChamferedBoxGeo(24.2, 5.2, 0.24, 0.45, 0.03, 'z');
    applyBoxUVs(slvsStiffGeo, 12.0);
    const slvsStiff = new THREE.Mesh(slvsStiffGeo, mats.stainlessMachined);
    slvsStiff.position.set(0, -15.4, -0.45);

    // 2) Left ISL Hall-sensor FPC stiffener + 3) Right ISD VCM-power FPC stiffener
    const sideStiffGeo = createChamferedBoxGeo(5.6, 15.2, 0.22, 0.4, 0.03, 'z');
    applyBoxUVs(sideStiffGeo, 10.0);
    const islStiff = new THREE.Mesh(sideStiffGeo, mats.stainlessMachined);
    islStiff.position.set(-22.5, 2.0, -0.2);
    const isdStiff = new THREE.Mesh(sideStiffGeo, mats.stainlessMachined);
    isdStiff.position.set(22.8, -2.0, -0.2);
    g.add(slvsStiff, islStiff, isdStiff);

    // Teardrop copper tear-stop tabs & flexible silicone bend-radius stress-relief fillets along flex exits
    const tearStopGeo = hiResCyl(0.75, 0.75, 0.28, 12).rotateX(Math.PI / 2);
    const reliefBeadGeo = new THREE.BoxGeometry(23.2, 0.65, 0.34);
    const reliefSlvs = new THREE.Mesh(reliefBeadGeo, mats.damperElastomer);
    reliefSlvs.position.set(0, -12.6, -0.38);
    g.add(reliefSlvs);

    g.add(
      makeInstanced(tearStopGeo, mats.copperHeatSpreader, [
        { pos: [-11.5, -12.7, -0.34] },
        { pos: [11.5, -12.7, -0.34] },
        { pos: [-19.8, 9.2, -0.14] },
        { pos: [-19.8, -5.2, -0.14] },
        { pos: [20.1, 5.2, -0.14] },
        { pos: [20.1, -9.2, -0.14] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-fpc-stiffener-reinforce',
        106,
        '#cbd5e1',
        g,
        new THREE.Vector3(0, 0, -3.65),
        new THREE.Vector3(104, -14, -56),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S107. IBIS 3-Channel High-Current Bipolar VCM H-Bridge Driver IC & Manganin Shunts
  // =========================================================================
  {
    const g = new THREE.Group();
    // Heavy-copper 2oz power-driver sub-PCB mounted beside ISD flex feed
    const drvPcbGeo = createChamferedBoxGeo(13.6, 10.4, 0.62, 0.55, 0.06, 'z');
    applyBoxUVs(drvPcbGeo, 12.0);
    const drvPcb = new THREE.Mesh(drvPcbGeo, mats.ultra.sensorHallSubPcb);
    g.add(drvPcb);

    // 3-Ch Bidirectional H-Bridge VCM Driver QFN-36 IC (±1.5A per coil, >50kHz silent PWM / linear mode)
    const vcmIc = buildChipPackage({
      w: 5.8,
      d: 5.8,
      h: 0.88,
      style: 'qfn',
      pinsPerSide: 9,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    vcmIc.position.set(-2.2, 0.6, 0.68);
    g.add(vcmIc);

    // 3 precision 50 mOhm low-TCR (25 ppm/C) manganin alloy 4-terminal Kelvin current-sense shunt resistors
    const shuntBodyGeo = createChamferedBoxGeo(2.8, 1.5, 0.48, 0.14, 0.04, 'z');
    const shuntTermGeo = new THREE.BoxGeometry(0.55, 1.58, 0.52);
    const sBodyTfs: Array<{ pos: [number, number, number] }> = [];
    const sTermTfs: Array<{ pos: [number, number, number] }> = [];
    for (const sy of [-2.8, 0.0, 2.8]) {
      sBodyTfs.push({ pos: [3.6, sy, 0.54] });
      sTermTfs.push({ pos: [2.35, sy, 0.54] });
      sTermTfs.push({ pos: [4.85, sy, 0.54] });
    }
    g.add(makeInstanced(shuntBodyGeo, mats.copperHybridBond, sBodyTfs));
    g.add(makeInstanced(shuntTermGeo, mats.solderBallSilver, sTermTfs));

    // 3 high-ripple-current bootstrap & Vmotor bulk MLCC capacitors along bottom edge
    for (const bx of [-4.5, -1.8, 0.9]) {
      const bCap = buildSmdPassive(1.8, 0.95, 0.68, mats.smdCeramic, mats.solderBallSilver, 'z');
      bCap.position.set(bx, -3.65, 0.64);
      g.add(bCap);
    }

    parts.push(
      finalizeSensorUltraPart(
        'sensor-vcm-driver-ic',
        107,
        '#ef4444',
        g,
        new THREE.Vector3(25.5, -15.0, -5.2),
        new THREE.Vector3(92, -52, -74),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S108. 3-Axis Hall-Sensor uV Instrumentation Op-Amp & 16-Bit Position Delta-Sigma ADC
  // =========================================================================
  {
    const g = new THREE.Group();
    // Shielded analog-sensing sub-PCB directly interfacing with ISL-2009 Hall flex
    const afePcbGeo = createChamferedBoxGeo(13.2, 9.6, 0.58, 0.5, 0.05, 'z');
    applyBoxUVs(afePcbGeo, 12.0);
    const afePcb = new THREE.Mesh(afePcbGeo, mats.ultra.sensorHallSubPcb);
    g.add(afePcb);

    // 16-Bit Low-Noise SAR / Delta-Sigma Position ADC IC (AD7682 class, QFN-20)
    const adcIc = buildChipPackage({
      w: 4.2,
      d: 4.2,
      h: 0.78,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    adcIc.position.set(2.6, 0.4, 0.64);
    g.add(adcIc);

    // Dual 10MHz Low-Broadband-Noise Rail-to-Rail Hall Instrumentation Op-Amps (TLV6742 class, DFN-8)
    for (const ay of [-2.0, 2.0]) {
      const opamp = buildChipPackage({
        w: 2.6,
        d: 2.6,
        h: 0.65,
        style: 'qfn',
        pinsPerSide: 4,
        bodyMat: mats.icEpoxy,
        leadMat: mats.solderBallSilver,
        pin1Mat: mats.goldPlating,
        axis: 'z',
      });
      opamp.position.set(-2.9, ay, 0.58);
      g.add(opamp);
    }

    // 6 instanced 0.1% thin-film precision gain-setting resistors + gold analog guard ring
    const resGeo = new THREE.BoxGeometry(0.95, 0.48, 0.34);
    const resTfs: Array<{ pos: [number, number, number] }> = [];
    for (let i = 0; i < 6; i++) {
      resTfs.push({ pos: [-5.1 + (i % 2) * 1.3, -3.2 + Math.floor(i / 2) * 3.1, 0.46] });
    }
    g.add(makeInstanced(resGeo, mats.mountShimBlue, resTfs));

    const guardRingGeo = extrudeHiRes(
      createFrameShape(12.2, 8.6, 0.4, 11.4, 7.8, 0.35),
      0.08,
      0.01,
      0.01,
      1,
      10
    );
    const guardRing = new THREE.Mesh(guardRingGeo, mats.goldPlating);
    guardRing.position.z = 0.32;
    guardRing.userData.noEdges = true;
    g.add(guardRing);

    parts.push(
      finalizeSensorUltraPart(
        'sensor-hall-amp-adc-ic',
        108,
        '#3b82f6',
        g,
        new THREE.Vector3(-25.5, 13.5, -5.2),
        new THREE.Vector3(-94, 42, -72),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S109. Voice-Coil Stress-Relief S-Loop Magnet-Wire Leads & LCP Solder Terminal Posts
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 VCM coil stations (top X-coil, bottom-left Y1-coil, bottom-right Y2-coil), 2 polarity posts each = 6 poles
    const stations: ReadonlyArray<{ x: number; y: number; rotZ: number }> = [
      { x: 0, y: 20.6, rotZ: 0 },
      { x: -24.2, y: -15.4, rotZ: Math.PI / 2 },
      { x: 24.2, y: -15.4, rotZ: -Math.PI / 2 },
    ];
    const postBlockGeo = createChamferedBoxGeo(5.6, 2.2, 1.35, 0.26, 0.05, 'z');
    const pinGeo = hiResCyl(0.32, 0.32, 1.55, 10).rotateX(Math.PI / 2);
    const potDropGeo = hiResSphere(0.68, 10, 8);
    const sLeadGeo = buildRibbonExtrude(
      [
        [-1.8, 0.0],
        [-0.9, 0.85],
        [0.0, 0.1],
        [0.9, -0.75],
        [1.8, 0.0],
      ],
      0.22,
      0.26,
      'xy'
    );

    const blockTfs: Array<{ pos: [number, number, number]; rot: [number, number, number] }> = [];
    const pinTfs: Array<{ pos: [number, number, number] }> = [];
    const potTfs: Array<{ pos: [number, number, number] }> = [];

    for (const st of stations) {
      blockTfs.push({ pos: [st.x, st.y, 0], rot: [0, 0, st.rotZ] });
      const cos = Math.cos(st.rotZ);
      const sin = Math.sin(st.rotZ);
      for (const localX of [-1.55, 1.55]) {
        const wx = st.x + localX * cos;
        const wy = st.y + localX * sin;
        pinTfs.push({ pos: [wx, wy, -0.25] });
        potTfs.push({ pos: [wx, wy, 0.62] });
      }
      // Stress-relief S-loop enameled copper lead bridge
      const sLead = new THREE.Mesh(sLeadGeo, mats.ultra.sensorVcmCopperWinding);
      sLead.position.set(st.x, st.y, 0.72);
      sLead.rotation.z = st.rotZ;
      g.add(sLead);
    }
    g.add(makeInstanced(postBlockGeo, mats.mountPpsInsulator, blockTfs));
    g.add(makeInstanced(pinGeo, mats.beCuSpring, pinTfs));
    g.add(makeInstanced(potDropGeo, mats.opticalCementClear, potTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-coil-lead-terminals',
        109,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -5.18),
        new THREE.Vector3(76, 32, -78),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S110. Closed Magnetic-Circuit Non-Magnetic Air-Gap Spacer Pillars & PPS Magnet Retainers
  // =========================================================================
  {
    const g = new THREE.Group();
    // 6 precision-ground non-magnetic SUS304/brass spacer pillars holding exact 2.20 +/- 0.02 mm yoke air gap against >15N pull
    const pillarGeo = hiResCyl(1.48, 1.48, 2.35, 16).rotateX(Math.PI / 2);
    const flangeGeo = hiResCyl(2.15, 2.15, 0.36, 16).rotateX(Math.PI / 2);
    const pillarCoords: ReadonlyArray<readonly [number, number]> = [
      [-32.4, 21.8],
      [32.4, 21.8],
      [-32.4, -21.8],
      [32.4, -21.8],
      [-32.4, 0],
      [32.4, 0],
    ];
    const pTfs: Array<{ pos: [number, number, number] }> = [];
    const fTfs: Array<{ pos: [number, number, number] }> = [];
    for (const [px, py] of pillarCoords) {
      pTfs.push({ pos: [px, py, 0] });
      fTfs.push({ pos: [px, py, 1.05] });
      fTfs.push({ pos: [px, py, -1.05] });
    }
    g.add(makeInstanced(pillarGeo, mats.brassGear, pTfs));
    g.add(makeInstanced(flangeGeo, mats.stainlessMachined, fTfs));

    // 3 glass-filled PPS perimeter magnet-pocket frames immobilizing the 3 N52 magnet pairs against drop shock
    const topPocketGeo = extrudeHiRes(
      createFrameShape(25.2, 9.6, 0.6, 22.8, 7.4, 0.4),
      1.65,
      0.04,
      0.04,
      1,
      10
    );
    const topPocket = new THREE.Mesh(topPocketGeo, mats.mountPpsInsulator);
    topPocket.position.set(0, 21.0, -0.85);
    g.add(topPocket);

    const sidePocketGeo = extrudeHiRes(
      createFrameShape(11.4, 21.4, 0.6, 9.2, 19.2, 0.4),
      1.65,
      0.04,
      0.04,
      1,
      10
    );
    for (const sx of [-26.2, 26.2]) {
      const sp = new THREE.Mesh(sidePocketGeo, mats.mountPpsInsulator);
      sp.position.set(sx, -10.5, -0.85);
      g.add(sp);
    }

    parts.push(
      finalizeSensorUltraPart(
        'sensor-magnet-yoke-spacers',
        110,
        '#b45309',
        g,
        new THREE.Vector3(0, 0, -5.05),
        new THREE.Vector3(-84, -18, -76),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S111. Hall & N52 Magnet Thermal-Flux Drift Compensation Precision NTC Thermistor
  // =========================================================================
  {
    const g = new THREE.Group();
    // Copper-backed polyimide thermal-sensing finger bonded adjacent to N52 magnet & Hall element
    const flexTabGeo = createChamferedBoxGeo(7.6, 4.2, 0.28, 0.4, 0.03, 'z');
    const flexTab = new THREE.Mesh(flexTabGeo, mats.polyimideFpc);
    const cuSensePad = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 2.8, 0.14, 0.25, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    cuSensePad.position.set(-1.2, 0, 0.18);
    cuSensePad.userData.noEdges = true;
    g.add(flexTab, cuSensePad);

    // 0402 high-accuracy (+/-0.5%) glass-passivated NTC thermistor sensing -0.11%/C NdFeB flux drift
    const ntcChip = buildSmdPassive(1.5, 0.85, 0.62, mats.mountRedIndexDot, mats.solderBallSilver, 'z');
    ntcChip.position.set(-1.2, 0, 0.5);
    g.add(ntcChip);

    // Silver thermal-coupling epoxy dome + twin gold Kelvin sense traces to ISL bus
    const epoxyDome = new THREE.Mesh(hiResSphere(0.72, 10, 8), mats.sinteredSilver);
    epoxyDome.scale.set(1.2, 0.8, 0.42);
    epoxyDome.position.set(-1.2, 0, 0.24);
    epoxyDome.userData.noEdges = true;
    g.add(epoxyDome);

    const traceGeo = new THREE.BoxGeometry(3.8, 0.34, 0.08);
    g.add(
      makeInstanced(traceGeo, mats.goldPlating, [
        { pos: [1.6, 0.62, 0.18] },
        { pos: [1.6, -0.62, 0.18] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-hall-temp-comp-thermistor',
        111,
        '#f43f5e',
        g,
        new THREE.Vector3(16.5, -21.5, -5.35),
        new THREE.Vector3(68, -62, -88),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S112. Ultra-Low-Vapor-Pressure PFPE Fluoropolymer Ball-Race Grease & Micro-Reservoir Dimples
  // =========================================================================
  {
    const g = new THREE.Group();
    const ballStations: ReadonlyArray<readonly [number, number]> = [
      [-26.0, 20.0],
      [26.0, 20.0],
      [0.0, -24.0],
    ];
    // Translucent metered PFPE vacuum-grade grease meniscus cushions + hydrophobic PTFE containment rings
    const filmGeo = hiResCyl(3.15, 3.35, 0.22, 18).rotateX(Math.PI / 2);
    const damGeo = hiResTorus(3.48, 0.18, 6, 20);
    const dimpleGeo = hiResCyl(0.28, 0.22, 0.12, 8).rotateX(Math.PI / 2);

    const filmTfs: Array<{ pos: [number, number, number] }> = [];
    const damTfs: Array<{ pos: [number, number, number] }> = [];
    const dimpleTfs: Array<{ pos: [number, number, number] }> = [];

    for (const [bx, by] of ballStations) {
      filmTfs.push({ pos: [bx, by, 0.38] });
      filmTfs.push({ pos: [bx, by, -0.38] });
      damTfs.push({ pos: [bx, by, 0.42] });
      damTfs.push({ pos: [bx, by, -0.42] });
      // 12 laser-textured micro oil-retention dimples arranged in an annular ring around each ball race
      for (let k = 0; k < 12; k++) {
        const ang = (k / 12) * Math.PI * 2;
        dimpleTfs.push({
          pos: [bx + Math.cos(ang) * 2.1, by + Math.sin(ang) * 2.1, -0.45],
        });
      }
    }
    g.add(makeInstanced(filmGeo, mats.fluorineCoatCyan, filmTfs));
    g.add(makeInstanced(damGeo, mats.zifIvoryPlastic, damTfs));
    g.add(makeInstanced(dimpleGeo, mats.titaniumRivet, dimpleTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-pfpe-ball-grease-film',
        112,
        '#2dd4bf',
        g,
        new THREE.Vector3(0, 0, -5.72),
        new THREE.Vector3(82, -8, -100),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S113. 3-Point Glass-Fiber PPS Sensor-to-IBIS Thermal-Isolation Mount Lugs & Brass Inserts
  // =========================================================================
  {
    const g = new THREE.Group();
    // Directly models Sony's 3-point glass-filled PPS mounting ears connecting sensor carrier to IBIS stage
    const lugStations: ReadonlyArray<{ x: number; y: number; rotZ: number }> = [
      { x: -29.5, y: 22.0, rotZ: Math.PI * 0.25 },
      { x: 29.5, y: 22.0, rotZ: -Math.PI * 0.25 },
      { x: 0.0, y: -26.0, rotZ: Math.PI },
    ];
    const lugShape = createRoundedRectShape(11.6, 7.6, 2.2);
    addCircleHoles(lugShape, [[0, 0, 2.1]]);
    const lugGeo = extrudeHiRes(lugShape, 1.55, 0.12, 0.12, 2, 14);
    applyBoxUVs(lugGeo, 10.0);

    const insertGeo = hiResCyl(2.05, 2.05, 1.72, 16).rotateX(Math.PI / 2);
    const knurlGeo = hiResTorus(2.12, 0.14, 6, 16);
    const grooveGeo = new THREE.BoxGeometry(0.45, 7.2, 0.32);

    const lugTfs: Array<{ pos: [number, number, number]; rot: [number, number, number] }> = [];
    const insTfs: Array<{ pos: [number, number, number] }> = [];
    const knurlTfs: Array<{ pos: [number, number, number] }> = [];
    const grvTfs: Array<{ pos: [number, number, number]; rot: [number, number, number] }> = [];

    for (const st of lugStations) {
      lugTfs.push({ pos: [st.x, st.y, 0], rot: [0, 0, st.rotZ] });
      insTfs.push({ pos: [st.x, st.y, 0] });
      knurlTfs.push({ pos: [st.x, st.y, 0.5] });
      knurlTfs.push({ pos: [st.x, st.y, -0.5] });
      grvTfs.push({
        pos: [st.x - Math.cos(st.rotZ) * 3.6, st.y - Math.sin(st.rotZ) * 3.6, 0.72],
        rot: [0, 0, st.rotZ],
      });
    }
    g.add(makeInstanced(lugGeo, mats.mountPpsInsulator, lugTfs));
    g.add(makeInstanced(insertGeo, mats.brassGear, insTfs));
    g.add(makeInstanced(knurlGeo, mats.goldPlating, knurlTfs));
    g.add(makeInstanced(grooveGeo, mats.matteBlackAnodized, grvTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-pps-mount-ears',
        113,
        '#78716c',
        g,
        new THREE.Vector3(0, 0, -3.55),
        new THREE.Vector3(-104, 14, -64),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S114. Optical X/Y/Roll Datum Hardened Dowel Pins & Round/Slotted Kinematic Bushings
  // =========================================================================
  {
    const g = new THREE.Group();
    // Station 1 (bottom-left): Primary ROUND reamed bushing + hardened SUS440C Ø2.000 mm dowel pin (fixes X & Y)
    const roundBushShape = createRoundedRectShape(6.8, 6.8, 3.4);
    addCircleHoles(roundBushShape, [[0, 0, 1.1]]);
    const roundBush = new THREE.Mesh(
      extrudeHiRes(roundBushShape, 1.45, 0.1, 0.1, 2, 16),
      mats.ultra.sensorSusSpringSteel
    );
    roundBush.position.set(-36.5, -19.5, 0);

    const pin1 = new THREE.Mesh(
      hiResCyl(1.02, 1.02, 4.6, 16).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    pin1.position.set(-36.5, -19.5, 0.45);
    const pin1Tip = new THREE.Mesh(
      hiResCyl(0.72, 1.02, 0.55, 16).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    pin1Tip.position.set(-36.5, -19.5, 3.0);
    g.add(roundBush, pin1, pin1Tip);

    // Station 2 (top-right): Secondary SLOTTED (diamond-clearance) guide bushing + pin (fixes Roll without over-constraint)
    const slotBushShape = createRoundedRectShape(9.4, 6.6, 2.8);
    const slotHole = new THREE.Path();
    slotHole.absarc(-1.15, 0, 1.08, Math.PI / 2, (Math.PI * 3) / 2, false);
    slotHole.absarc(1.15, 0, 1.08, -Math.PI / 2, Math.PI / 2, false);
    slotHole.closePath();
    slotBushShape.holes.push(slotHole);
    const slotBush = new THREE.Mesh(
      extrudeHiRes(slotBushShape, 1.45, 0.1, 0.1, 2, 16),
      mats.ultra.sensorSusSpringSteel
    );
    slotBush.position.set(36.5, 19.5, 0);

    const pin2 = new THREE.Mesh(
      hiResCyl(1.02, 1.02, 4.6, 16).rotateX(Math.PI / 2),
      mats.stainlessMachined
    );
    pin2.position.set(36.5, 19.5, 0.45);
    const pin2Tip = new THREE.Mesh(
      hiResCyl(0.72, 1.02, 0.55, 16).rotateX(Math.PI / 2),
      mats.titaniumRivet
    );
    pin2Tip.position.set(36.5, 19.5, 3.0);
    g.add(slotBush, pin2, pin2Tip);

    // Press-fit brass retaining collars around both datum seats
    const collarGeo = hiResTorus(3.45, 0.28, 8, 20);
    g.add(
      makeInstanced(collarGeo, mats.brassGear, [
        { pos: [-36.5, -19.5, -0.68] },
        { pos: [36.5, 19.5, -0.68] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-datum-dowel-bushings',
        114,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -7.55),
        new THREE.Vector3(-104, -22, -116),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S115. 3-Point Flange-Back Calibration UV Anaerobic Threadlock & Tamper Witness Paint
  // =========================================================================
  {
    const g = new THREE.Group();
    const calPts: ReadonlyArray<readonly [number, number]> = [
      [-34.5, 25.5],
      [34.5, 25.5],
      [0.0, -29.0],
    ];
    // Cobalt-blue anaerobic UV-cured resin threadlock collars sealing each calibrated Torx flange-back screw
    const lockRingGeo = hiResTorus(2.25, 0.42, 8, 20);
    const lockDropGeo = hiResSphere(1.15, 10, 8);
    // Crimson factory witness lacquer stripe bridging screw flange to fixed chassis
    const witnessGeo = createChamferedBoxGeo(4.8, 1.1, 0.46, 0.35, 0.08, 'z');

    const ringTfs: Array<{ pos: [number, number, number] }> = [];
    const dropTfs: Array<{ pos: [number, number, number]; scale: [number, number, number] }> = [];
    const witTfs: Array<{ pos: [number, number, number]; rot: [number, number, number] }> = [];

    for (let i = 0; i < calPts.length; i++) {
      const [cx, cy] = calPts[i];
      ringTfs.push({ pos: [cx, cy, 0] });
      dropTfs.push({ pos: [cx + 1.85, cy - 0.65, -0.18], scale: [1.15, 0.85, 0.62] });
      witTfs.push({ pos: [cx + 2.1, cy + 0.55, -0.22], rot: [0, 0, i === 2 ? Math.PI / 2 : -0.35] });
    }
    g.add(makeInstanced(lockRingGeo, mats.mountThreadLockBlue, ringTfs));
    g.add(makeInstanced(lockDropGeo, mats.mountThreadLockBlue, dropTfs));
    g.add(makeInstanced(witnessGeo, mats.mountRedIndexDot, witTfs));

    parts.push(
      finalizeSensorUltraPart(
        'sensor-screw-lock-adhesive',
        115,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, -8.55),
        new THREE.Vector3(82, 48, -124),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S116. Shutter-to-IBIS Vibration Isolation Urethane Cushion Sheet — MB CUSHION SHEET (5400)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sony OEM 472900201 MB CUSHION SHEET (5400) die-cut urethane shock-damping frame between AFE-3360 shutter & IBIS
    const sheetShape = createFrameShape(54.2, 43.4, 2.2, 42.6, 31.0, 1.2);
    const sheetGeo = extrudeHiRes(sheetShape, 0.68, 0.06, 0.06, 2, 14);
    applyBoxUVs(sheetGeo, 16.0);
    const sheetMesh = new THREE.Mesh(sheetGeo, mats.butylDamperRubber);
    g.add(sheetMesh);

    // 4 raised acoustic-damping corner isolation lobes absorbing 1–5 kHz shutter-curtain rebound impact
    const lobeGeo = createChamferedBoxGeo(5.8, 4.6, 0.92, 1.1, 0.08, 'z');
    const lobeTfs: Array<{ pos: [number, number, number] }> = [];
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        lobeTfs.push({ pos: [sx * 24.4, sy * 19.2, 0.06] });
      }
    }
    g.add(makeInstanced(lobeGeo, mats.damperElastomer, lobeTfs));

    // Rear acrylic PSA mounting film & twin alignment guide eyelets
    const psaGeo = extrudeHiRes(
      createFrameShape(53.4, 42.6, 2.0, 43.2, 31.6, 1.1),
      0.1,
      0.01,
      0.01,
      1,
      10
    );
    const psa = new THREE.Mesh(psaGeo, mats.mylarInsulatorFilm);
    psa.position.z = -0.38;
    psa.userData.noEdges = true;
    g.add(psa);

    parts.push(
      finalizeSensorUltraPart(
        'sensor-mb-cushion-sheet',
        116,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 8.35),
        new THREE.Vector3(-54, 78, 122),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S117. Top IBIS Thermal Compression Spacer — AS HEAT PLT SPACER TOP (5510)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sony OEM 503058201 AS HEAT PLT SPACER TOP (5510) nesting right beneath AS HEAT PLATE TOP (5800) (S60)
    const coreGeo = createChamferedBoxGeo(43.2, 2.1, 5.4, 0.45, 0.08, 'z');
    applyBoxUVs(coreGeo, 14.0);
    const coreBar = new THREE.Mesh(coreGeo, mats.stainlessMachined);
    g.add(coreBar);

    // Upper soft silicone gap-pad strip controlling thermal contact pressure without binding IBIS travel
    const topPad = new THREE.Mesh(
      createChamferedBoxGeo(41.6, 0.65, 4.6, 0.25, 0.05, 'z'),
      mats.thermalPadBlue
    );
    topPad.position.set(0, 1.32, 0);

    // Lower ultra-low-friction PTFE/mylar glide strip facing moving IBIS top perimeter
    const glideStrip = new THREE.Mesh(
      createChamferedBoxGeo(41.6, 0.32, 4.6, 0.2, 0.03, 'z'),
      mats.zifIvoryPlastic
    );
    glideStrip.position.set(0, -1.16, 0);
    glideStrip.userData.noEdges = true;
    g.add(topPad, glideStrip);

    // Twin precision standoff alignment bosses & M1.4 locating pins
    const bossGeo = hiResCyl(1.15, 1.15, 2.45, 12);
    g.add(
      makeInstanced(bossGeo, mats.brassGear, [
        { pos: [-18.2, 0, 0] },
        { pos: [18.2, 0, 0] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-as-heat-plt-spacer-top',
        117,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 23.6, -6.15),
        new THREE.Vector3(42, 74, -116),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S118. Top IBIS-to-Chassis Multi-Layer Pyrolytic Graphite Thermal Bridge — MB GRAPHITE SHEET TOP A (5800)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Sony OEM 500490202 MB GRAPHITE SHEET TOP A (5800): L-wrapped anisotropic pyrolytic graphite strap (k_xy ~1500 W/mK)
    const strapProfile = buildRibbonExtrude(
      [
        [-3.4, -0.2],
        [-1.0, 0.1],
        [1.4, 0.2],
        [3.0, 0.9],
        [3.6, 2.4],
        [3.7, 4.2],
      ],
      0.32,
      47.6,
      'yz'
    );
    // Rotate so width spans X (±23.8 mm), thickness along Y/Z forming an authentic top-to-front chassis thermal wrap
    strapProfile.rotateZ(Math.PI / 2);
    applyBoxUVs(strapProfile, 16.0);
    const graphiteStrap = new THREE.Mesh(strapProfile, mats.ultra.sensorPyroGraphite);
    g.add(graphiteStrap);

    // Copper foil heat-pickup collector strip bonded on the underside contact face
    const cuCollector = new THREE.Mesh(
      createChamferedBoxGeo(44.0, 0.18, 5.2, 0.3, 0.02, 'z'),
      mats.copperHeatSpreader
    );
    cuCollector.position.set(0, -0.35, -0.6);
    cuCollector.userData.noEdges = true;
    g.add(cuCollector);

    // Left & right PET protective dielectric lamination edge tabs (prevent graphite flaking/shorts)
    const tabGeo = createChamferedBoxGeo(2.8, 0.38, 6.2, 0.25, 0.03, 'z');
    g.add(
      makeInstanced(tabGeo, mats.mylarInsulatorFilm, [
        { pos: [-23.4, -0.1, -0.2] },
        { pos: [23.4, -0.1, -0.2] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-top-graphite-bridge',
        118,
        '#6366f1',
        g,
        new THREE.Vector3(0, 27.6, -5.85),
        new THREE.Vector3(-44, 78, -128),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S119. IBIS Rear Local High-Permeability 78%Ni-Fe Permalloy Magnetic Flux Shield Sheet
  // =========================================================================
  {
    const g = new THREE.Group();
    // 0.15 mm annealed PC-78 Permalloy high-mu magnetic shunt plate blocking rear N52 stray flux (>400 mT)
    const shieldShape = createRoundedRectShape(64.2, 46.8, 2.4);
    addCircleHoles(shieldShape, [
      [-27.5, 19.0, 2.2],
      [27.5, 19.0, 2.2],
      [0, -19.5, 2.4],
    ]);
    const shieldGeo = extrudeHiRes(shieldShape, 0.26, 0.04, 0.04, 1, 14);
    applyBoxUVs(shieldGeo, 18.0);
    const shieldPlate = new THREE.Mesh(shieldGeo, mats.ultra.sensorEmiShieldNickel);
    g.add(shieldPlate);

    // Front PET dielectric isolation backing lamina (prevents shorting solder joints on rear IBIS stator)
    const petGeo = extrudeHiRes(createRoundedRectShape(65.0, 47.6, 2.6), 0.09, 0.01, 0.01, 1, 12);
    const petFilm = new THREE.Mesh(petGeo, mats.mylarInsulatorFilm);
    petFilm.position.z = 0.2;
    petFilm.userData.noEdges = true;
    g.add(petFilm);

    // 4 embossed flux-concentration ribs + 3 copper-beryllium chassis grounding spring ears
    const ribGeo = createChamferedBoxGeo(18.0, 1.6, 0.22, 0.3, 0.04, 'z');
    g.add(
      makeInstanced(ribGeo, mats.pureIronArmature, [
        { pos: [-16.0, 11.0, -0.2] },
        { pos: [16.0, 11.0, -0.2] },
        { pos: [-16.0, -11.0, -0.2] },
        { pos: [16.0, -11.0, -0.2] },
      ])
    );

    const earGeo = createChamferedBoxGeo(4.4, 2.4, 0.28, 0.25, 0.03, 'z');
    g.add(
      makeInstanced(earGeo, mats.beCuSpring, [
        { pos: [-33.6, 0, -0.05] },
        { pos: [33.6, 0, -0.05] },
        { pos: [0, 24.4, -0.05] },
      ])
    );

    parts.push(
      finalizeSensorUltraPart(
        'sensor-ibis-permalloy-shield',
        119,
        '#9ca3af',
        g,
        new THREE.Vector3(0, 0, -9.95),
        new THREE.Vector3(-76, -54, -144),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S120. Sensor Module Perimeter Conductive Ni/Cu Fabric-Over-Foam (F-o-F) RF EMI Gasket
  // =========================================================================
  {
    const g = new THREE.Group();
    // 4-sided compressible urethane core wrapped in Ni/Cu-plated woven conductive ripstop fabric (<0.05 Ohm RF ground)
    const gasketFrameGeo = extrudeHiRes(
      createFrameShape(58.8, 44.6, 1.8, 53.2, 39.0, 1.2),
      1.65,
      0.16,
      0.16,
      2,
      14
    );
    applyBoxUVs(gasketFrameGeo, 14.0);
    const gasketFrame = new THREE.Mesh(gasketFrameGeo, mats.conductiveNiCuFoam);
    g.add(gasketFrame);

    // 28 instanced diagonal woven conductive fabric compression ribs along all 4 sides
    const ribGeo = new THREE.BoxGeometry(0.45, 2.9, 1.78);
    const ribTfs: Array<{ pos: [number, number, number]; rot: [number, number, number] }> = [];
    for (let i = -4; i <= 4; i++) {
      ribTfs.push({ pos: [i * 5.8, 20.9, 0], rot: [0, 0, 0.35] });
      ribTfs.push({ pos: [i * 5.8, -20.9, 0], rot: [0, 0, -0.35] });
    }
    for (let j = -2; j <= 2; j++) {
      ribTfs.push({ pos: [-28.0, j * 7.2, 0], rot: [0, 0, Math.PI / 2 + 0.35] });
      ribTfs.push({ pos: [28.0, j * 7.2, 0], rot: [0, 0, Math.PI / 2 - 0.35] });
    }
    g.add(makeInstanced(ribGeo, mats.ultra.sensorEmiShieldNickel, ribTfs));

    // Rear conductive acrylic PSA bonding tape ring interfacing cleanly with camera magnesium frame
    const psaRingGeo = extrudeHiRes(
      createFrameShape(58.0, 43.8, 1.6, 54.0, 39.8, 1.1),
      0.14,
      0.02,
      0.02,
      1,
      10
    );
    const psaRing = new THREE.Mesh(psaRingGeo, mats.copperHeatSpreader);
    psaRing.position.z = -0.88;
    psaRing.userData.noEdges = true;
    g.add(psaRing);

    parts.push(
      finalizeSensorUltraPart(
        'sensor-chassis-emi-gasket',
        120,
        '#a3e635',
        g,
        new THREE.Vector3(0, 0, -10.35),
        new THREE.Vector3(86, -58, -176),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  return parts;
}
