import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  addCircleHoles,
  attachCadEdges,
  createFrameShape,
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

function finalizeSensorNextGenPart(
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
 * Helper: Build a TRUE 2D spherically-concave retinal dish patch (curved in BOTH X and Y,
 * matching Sony VLSI 2014 / Goto 2025 R≈120mm curved full-frame CMOS silicon!).
 * Front face (+Z) is concave, with exact [0,1]x[0,1] planar UVs for the CMOS wafer floorplan.
 */
function buildSphericalDishPatch(
  width: number,
  height: number,
  thickness: number,
  sphereRadius: number,
  segsX = 24,
  segsY = 16,
  flatRear = false,
  rearZFlat = -1.65
): THREE.BufferGeometry {
  const hw = width * 0.5;
  const hh = height * 0.5;
  const sagAt = (x: number, y: number): number => {
    const r2 = x * x + y * y;
    const R2 = sphereRadius * sphereRadius;
    // Concave dish: center dips to z=0, corners curve forward (+Z) like a human retina!
    return sphereRadius - Math.sqrt(Math.max(1e-3, R2 - Math.min(r2, R2 * 0.85)));
  };

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const gridStride = (segsX + 1) * (segsY + 1);

  // Top (+Z concave active face) vertices: [0 .. gridStride - 1]
  for (let iy = 0; iy <= segsY; iy++) {
    const fy = iy / segsY;
    const y = -hh + fy * height;
    for (let ix = 0; ix <= segsX; ix++) {
      const fx = ix / segsX;
      const x = -hw + fx * width;
      const z = sagAt(x, y);
      positions.push(x, y, z);
      uvs.push(fx, fy);
    }
  }

  // Bottom (-Z rear face) vertices: [gridStride .. 2*gridStride - 1]
  for (let iy = 0; iy <= segsY; iy++) {
    const fy = iy / segsY;
    const y = -hh + fy * height;
    for (let ix = 0; ix <= segsX; ix++) {
      const fx = ix / segsX;
      const x = -hw + fx * width;
      const z = flatRear ? rearZFlat : sagAt(x, y) - thickness;
      positions.push(x, y, z);
      uvs.push(fx, fy);
    }
  }

  const topIdx = (ix: number, iy: number) => iy * (segsX + 1) + ix;
  const botIdx = (ix: number, iy: number) => gridStride + iy * (segsX + 1) + ix;

  // Front concave (+Z) triangles
  for (let iy = 0; iy < segsY; iy++) {
    for (let ix = 0; ix < segsX; ix++) {
      const a = topIdx(ix, iy);
      const b = topIdx(ix + 1, iy);
      const c = topIdx(ix + 1, iy + 1);
      const d = topIdx(ix, iy + 1);
      indices.push(a, b, c, a, c, d);
    }
  }

  // Rear (-Z) triangles (reversed winding)
  for (let iy = 0; iy < segsY; iy++) {
    for (let ix = 0; ix < segsX; ix++) {
      const a = botIdx(ix, iy);
      const b = botIdx(ix + 1, iy);
      const c = botIdx(ix + 1, iy + 1);
      const d = botIdx(ix, iy + 1);
      indices.push(a, c, b, a, d, c);
    }
  }

  // Perimeter stitched side walls (bottom/top/left/right)
  for (let ix = 0; ix < segsX; ix++) {
    // Bottom edge (iy = 0)
    const t0 = topIdx(ix, 0), t1 = topIdx(ix + 1, 0);
    const b0 = botIdx(ix, 0), b1 = botIdx(ix + 1, 0);
    indices.push(t0, b0, b1, t0, b1, t1);
    // Top edge (iy = segsY)
    const tt0 = topIdx(ix, segsY), tt1 = topIdx(ix + 1, segsY);
    const bb0 = botIdx(ix, segsY), bb1 = botIdx(ix + 1, segsY);
    indices.push(tt0, tt1, bb1, tt0, bb1, bb0);
  }
  for (let iy = 0; iy < segsY; iy++) {
    // Left edge (ix = 0)
    const t0 = topIdx(0, iy), t1 = topIdx(0, iy + 1);
    const b0 = botIdx(0, iy), b1 = botIdx(0, iy + 1);
    indices.push(t0, t1, b1, t0, b1, b0);
    // Right edge (ix = segsX)
    const rt0 = topIdx(segsX, iy), rt1 = topIdx(segsX, iy + 1);
    const rb0 = botIdx(segsX, iy), rb1 = botIdx(segsX, iy + 1);
    indices.push(rt0, rb0, rb1, rt0, rb1, rt1);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return markHiRes(geo);
}

/**
 * Phase 25A — 20 Standalone-Only Next-Gen Full-Frame Sensor, Optical Stack & 5-Axis IBIS Parts (S71–S90 -> 90 total).
 * Rendered ONLY in standalone 'sensor' mode; omitted completely in whole-camera views (0 startup overhead).
 */
export function buildSensorNextGenParts(mats: MaterialLibrary): CadPart[] {
  const parts: CadPart[] = [];
  const cp = mats.clippingPlanes;
  const dummy = new THREE.Object3D();

  // =========================================================================
  // S71. Liquid-Crystal Electronic Variable ND Filter (e-ND: 1/4–1/128)
  // =========================================================================
  {
    const g = new THREE.Group();
    // Precision matte-black anodized e-ND cell frame with mounting datum bores
    const outerShape = createFrameShape(44.2, 32.0, 2.0, 38.0, 26.0, 0.9);
    addCircleHoles(outerShape, [
      [-20.4, 14.2, 0.65],
      [20.4, 14.2, 0.65],
      [-20.4, -14.2, 0.65],
      [20.4, -14.2, 0.65],
    ]);
    const outerFrame = new THREE.Mesh(
      extrudeHiRes(outerShape, 1.05, 0.07, 0.07, 2, 22),
      mats.matteBlackAnodized
    );

    // Guest-Host Liquid-Crystal active cell sandwiched between dual optical glass substrates
    const lcCellPane = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(38.4, 26.4, 0.8), 0.36, 0.03, 0.03, 1, 16),
      mats.lcdPolarizerFilm
    );
    const lcGlassFront = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(38.0, 26.0, 0.7), 0.12, 0.01, 0.01, 1, 14),
      mats.coverGlass
    );
    lcGlassFront.position.z = 0.25;
    lcGlassFront.userData.noEdges = true;

    // Upper & lower gold-plated ITO transparent electrode busbars + ACF anisotropic conductive bond pads
    for (const sy of [-13.6, 13.6]) {
      const bus = new THREE.Mesh(
        createChamferedBoxGeo(36.0, 0.75, 0.56, 0.14, 0.04, 'z'),
        mats.goldPlating
      );
      bus.position.set(0, sy, 0.16);
      g.add(bus);
    }

    // Sony Nov 2026 e-ND patent feature: LC injection port, UV end-seal plug & asymmetric inflow baffle wall!
    const injPort = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 1.4, 0.78, 0.2, 0.05, 'z'),
      mats.opticalCementClear
    );
    injPort.position.set(-14.5, 15.85, 0);
    const baffleWall = new THREE.Mesh(
      createChamferedBoxGeo(4.8, 0.45, 0.46, 0.08, 0.02, 'z'),
      mats.epdmGasket
    );
    baffleWall.position.set(-14.5, 14.3, 0);
    baffleWall.userData.noEdges = true;

    // Curved polyimide variable-ND voltage drive flex ribbon with copper traces & 4-pin ZIF gold tail
    const driveFlex = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 9.6, 0.22, 0.4, 0.03, 'z'),
      mats.polyimideFpc
    );
    driveFlex.position.set(24.0, -7.5, -0.15);
    const zifStiff = new THREE.Mesh(
      createChamferedBoxGeo(5.2, 2.4, 0.24, 0.2, 0.03, 'z'),
      mats.zifIvoryPlastic
    );
    zifStiff.position.set(24.0, -11.4, -0.34);
    for (let k = 0; k < 4; k++) {
      const tr = new THREE.Mesh(new THREE.BoxGeometry(0.55, 8.4, 0.08), mats.goldPlating);
      tr.position.set(22.5 + k * 1.0, -7.8, -0.02);
      tr.userData.noEdges = true;
      g.add(tr);
    }

    g.add(outerFrame, lcCellPane, lcGlassFront, injPort, baffleWall, driveFlex, zifStiff);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-electronic-vnd',
        71,
        '#4f46e5',
        g,
        new THREE.Vector3(0, 0, 8.8),
        new THREE.Vector3(0, 56, 114),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S72. Partially-Stacked Top/Bottom High-Speed Readout Strips & DGO Output
  // =========================================================================
  {
    const g = new THREE.Group();
    // Authentic Sony a7 V / Z6 III partially-stacked top & bottom logic strips with 4nm ADC lithography!
    for (const sy of [-1, 1]) {
      const stripGeo = createChamferedBoxGeo(37.6, 4.0, 0.48, 0.3, 0.05, 'z');
      applyPlanarUVs(stripGeo, 37.6, 4.0, 'xy');
      const stripDie = new THREE.Mesh(stripGeo, mats.ultra.sensorLogicAdcDie);
      stripDie.position.set(0, sy * 14.3, 0);

      // Inner Cu-Cu hybrid micro-interconnect bridge facing pixel array edge
      const dgoBus = new THREE.Mesh(
        createChamferedBoxGeo(35.8, 0.95, 0.56, 0.14, 0.03, 'z'),
        mats.copperHybridBond
      );
      dgoBus.position.set(0, sy * 12.7, 0.10);
      g.add(stripDie, dgoBus);

      // 7 Dual-Gain-Output (DGO) 16-bit column comparator macro tiles + outer wire-bond pad row
      for (let i = -3; i <= 3; i++) {
        const adcTile = new THREE.Mesh(
          createChamferedBoxGeo(3.9, 1.75, 0.22, 0.14, 0.03, 'z'),
          mats.goldPlating
        );
        adcTile.position.set(i * 4.8, sy * 14.5, 0.28);
        g.add(adcTile);
      }
      for (let p = -14; p <= 14; p++) {
        const bondPad = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.10), mats.goldPlating);
        bondPad.position.set(p * 1.2, sy * 15.9, 0.26);
        bondPad.userData.noEdges = true;
        g.add(bondPad);
      }
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-partially-stacked-strips',
        72,
        '#10b981',
        g,
        new THREE.Vector3(0, 0, -0.35),
        new THREE.Vector3(76, 46, 18),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S73. Curved Full-Frame CMOS Silicon Substrate & Concave Forming Carrier
  // =========================================================================
  {
    const g = new THREE.Group();
    // TRUE 2D SPHERICAL CONCAVE RETINAL CMOS DISH (curved in BOTH X and Y, R=120mm, Sony VLSI/Goto 2025!)
    const sphereR = 115.0;
    const curvedDieGeo = buildSphericalDishPatch(36.4, 24.4, 0.36, sphereR, 26, 18, false);
    const curvedDie = new THREE.Mesh(curvedDieGeo, mats.siliconSensorDie);
    curvedDie.position.z = 0.0;

    // Matching 2D Spherically-Concave CNC-Ground HTCC Alumina Ceramic Forming Carrier Bed
    const bedGeo = buildSphericalDishPatch(40.2, 28.0, 0.85, sphereR, 26, 18, true, -1.75);
    applyBoxUVs(bedGeo, 16.0);
    const ceramicBed = new THREE.Mesh(bedGeo, mats.ultra.sensorHtccCeramic);
    ceramicBed.position.z = -0.38;

    // Perimeter stepped golden curved wire-bond landing shelf markers around concave bed rim
    for (let i = -8; i <= 8; i++) {
      const px = i * 2.1;
      for (const py of [-13.1, 13.1]) {
        const sagZ = sphereR - Math.sqrt(sphereR * sphereR - (px * px + py * py)) - 0.36;
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.95, 0.10), mats.goldPlating);
        pad.position.set(px, py, sagZ);
        pad.userData.noEdges = true;
        g.add(pad);
      }
    }

    g.add(curvedDie, ceramicBed);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-curved-substrate',
        73,
        '#06b6d4',
        g,
        new THREE.Vector3(0, 0, -0.95),
        new THREE.Vector3(-82, 46, 12),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S74. Sony OEM Flange-Back Selection Shim Washers (IM ADJUST WASHER D, Ref.456)
  // =========================================================================
  {
    const g = new THREE.Group();
    const bossCoords: Array<[number, number]> = [
      [-31.5, 22.0],
      [31.5, 22.0],
      [0.0, -24.5],
    ];
    // 3 color-coded thickness shims per tripod boss + stamped numeric marking face ("25 / IM-D / 0.25 / 456") on rear-facing outer shim!
    const shimMats = [mats.ultra.sensorWasherMarking, mats.brassGear, mats.mountShimBlue];
    const tabAngles = [-0.45, 0.0, 0.45];

    const washerGeo = extrudeHiRes(createFrameShape(8.0, 8.0, 4.0, 4.1, 4.1, 2.05), 0.26, 0.03, 0.03, 2, 22);
    const markedWasherGeo = washerGeo.clone();
    applyPlanarUVs(markedWasherGeo, 8.0, 8.0, 'xy-back');

    for (const [bx, by] of bossCoords) {
      for (let k = 0; k < 3; k++) {
        const wMesh = new THREE.Mesh(k === 0 ? markedWasherGeo : washerGeo, shimMats[k]);
        wMesh.position.set(bx, by, (k - 1) * 0.34);
        g.add(wMesh);

        // Authentic Sony fanned thickness-identification orientation tabs protruding from each shim!
        const ang = tabAngles[k];
        const tab = new THREE.Mesh(
          createChamferedBoxGeo(2.8, 1.35, 0.24, 0.25, 0.03, 'z'),
          k === 0 ? mats.stainlessMachined : shimMats[k]
        );
        tab.position.set(bx + Math.cos(ang) * 4.55, by + Math.sin(ang) * 4.55, (k - 1) * 0.34);
        tab.rotation.z = ang;
        g.add(tab);
      }
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-im-adjust-washers',
        74,
        '#2563eb',
        g,
        new THREE.Vector3(0, 0, -8.9),
        new THREE.Vector3(-88, -32, -158),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S75. Dedicated Mechanical Sensor-Protect Dust Shield Curtain
  // =========================================================================
  {
    const g = new THREE.Group();
    // Stamped matte-black shield chassis with side vertical guide rails & light-seal overlap ledges
    const shieldFrame = new THREE.Mesh(
      extrudeHiRes(createFrameShape(47.0, 34.4, 2.2, 38.6, 26.2, 0.8), 1.15, 0.08, 0.08, 2, 18),
      mats.shutterChassis
    );

    // 3 Overlapping ribbed matte carbon-composite interlocking dust-shield blades (Nikon Z8/Z9 style!)
    const bladeSpecs: Array<[number, number, THREE.Material]> = [
      [8.8, 0.22, mats.carbonFiberBlade],
      [2.2, 0.0, mats.shutterShieldBlade],
      [-7.8, -0.22, mats.carbonFiberBlade],
    ];
    for (const [by, bz, mat] of bladeSpecs) {
      const blade = new THREE.Mesh(
        createChamferedBoxGeo(38.2, 6.8, 0.24, 0.25, 0.03, 'z'),
        mat
      );
      blade.position.set(0, by, bz);
      // Horizontal anti-warping stiffening micro-rib along blade center
      const rib = new THREE.Mesh(new THREE.BoxGeometry(36.8, 0.48, 0.14), mats.matteBlackAnodized);
      rib.position.set(0, by, bz + 0.14);
      rib.userData.noEdges = true;
      // Right-side titanium linkage pivot rivets
      const rivet = new THREE.Mesh(
        hiResCyl(0.45, 0.45, 0.56, 12).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      rivet.position.set(19.6, by, bz + 0.12);
      rivet.userData.noEdges = true;
      g.add(blade, rib, rivet);
    }

    // Twin vertical stainless scissor-linkage drive arms + copper-wound micro-solenoid drive actuator
    const actuatorBobbin = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 17.2, 2.4, 0.4, 0.08, 'z'),
      mats.matteBlackAnodized
    );
    actuatorBobbin.position.set(22.2, 0, -0.2);
    const actuatorCoil = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 14.2, 2.55, 0.3, 0.06, 'z'),
      mats.copperCoil
    );
    actuatorCoil.position.set(22.2, 0, -0.2);
    for (const lx of [19.6, 20.6]) {
      const linkBar = new THREE.Mesh(
        createChamferedBoxGeo(0.85, 22.0, 0.36, 0.2, 0.03, 'z'),
        mats.stainlessMachined
      );
      linkBar.position.set(lx, 0, 0.42);
      g.add(linkBar);
    }

    g.add(shieldFrame, actuatorBobbin, actuatorCoil);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-mechanical-dust-shield',
        75,
        '#334155',
        g,
        new THREE.Vector3(0, 0, 10.2),
        new THREE.Vector3(0, -58, 128),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S76. 2× Wide-Stroke Roll IBIS & Halbach Dual-Polarity VCM Magnet Array
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3 authentic 5-segment Halbach flux-focusing N52 NdFeB arrays with laser-etched flux vector arrows!
    const positions: Array<{ x: number; y: number; rotZ: number }> = [
      { x: -33.2, y: 0, rotZ: Math.PI / 2 },
      { x: 33.2, y: 0, rotZ: Math.PI / 2 },
      { x: 0, y: -23.8, rotZ: 0 },
    ];
    for (const p of positions) {
      const sub = new THREE.Group();
      sub.position.set(p.x, p.y, 0);
      sub.rotation.z = p.rotZ;

      // 5 discrete chamfered N52 Halbach segments separated by crisp non-magnetic dielectric spacers
      for (let s = 0; s < 5; s++) {
        const sx = -9.2 + s * 4.6;
        const isHoriz = s === 1 || s === 3;
        const block = new THREE.Mesh(
          createChamferedBoxGeo(4.35, 5.2, 2.0, 0.25, 0.08, 'z'),
          isHoriz ? mats.cinnabarAnodized : mats.neodymiumMagnet
        );
        block.position.set(sx, 0, 0);
        sub.add(block);
      }

      // High-DPI laser-etched Halbach flux-vector face plate (↑ → ↓ ← ↑) on front (+Z)
      const faceGeo = markHiRes(new THREE.PlaneGeometry(22.6, 4.9));
      applyPlanarUVs(faceGeo, 22.6, 4.9, 'xy');
      const faceOverlay = new THREE.Mesh(faceGeo, mats.ultra.sensorHalbachMagnet);
      faceOverlay.position.set(0, 0, 1.03);
      faceOverlay.userData.noEdges = true;

      // Stepped soft-iron flux-return yoke backing plate with end retaining cheeks
      const backPlate = new THREE.Mesh(
        createChamferedBoxGeo(24.0, 5.9, 0.72, 0.5, 0.08, 'z'),
        mats.softIronYoke
      );
      backPlate.position.z = -1.28;
      for (const cx of [-11.8, 11.8]) {
        const cheek = new THREE.Mesh(
          createChamferedBoxGeo(0.55, 5.6, 2.2, 0.15, 0.04, 'z'),
          mats.softIronYoke
        );
        cheek.position.set(cx, 0, -0.35);
        sub.add(cheek);
      }

      sub.add(faceOverlay, backPlate);
      g.add(sub);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-double-roll-halbach',
        76,
        '#ea580c',
        g,
        new THREE.Vector3(0, 0, -7.2),
        new THREE.Vector3(92, -36, -112),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S77. Pixel-Shift Multi-Shot Sub-Micron Optical Linear Scale (0.5-Pixel)
  // =========================================================================
  {
    const g = new THREE.Group();
    // X-axis Invar-36 / Quartz optical linear encoder scale with bespoke chrome grating & absolute barcode!
    const xScaleGeo = createChamferedBoxGeo(26.4, 2.8, 0.56, 0.25, 0.05, 'z');
    applyPlanarUVs(xScaleGeo, 26.4, 2.8, 'xy');
    const xScale = new THREE.Mesh(xScaleGeo, mats.ultra.sensorOpticalScale);
    xScale.position.set(0, 21.8, 0);

    // X optical scanning readhead with chamfered housing, IR collimating lens window & flex tail
    const xRead = new THREE.Mesh(
      createChamferedBoxGeo(4.6, 3.6, 1.45, 0.35, 0.08, 'z'),
      mats.ultra.icEpoxyLaser
    );
    xRead.position.set(4.0, 21.8, 0.92);
    const xLens = new THREE.Mesh(
      hiResCyl(0.72, 0.72, 0.26, 14).rotateX(Math.PI / 2),
      mats.irLedLens
    );
    xLens.position.set(4.0, 21.8, 0.24);
    xLens.userData.noEdges = true;
    const xTail = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 4.4, 0.22, 0.2, 0.02, 'z'),
      mats.polyimideFpc
    );
    xTail.position.set(4.0, 25.0, 0.92);

    // Y-axis Invar-36 / Quartz optical linear encoder scale (rotated 90° so grating lines run vertically)
    const yScaleGeo = createChamferedBoxGeo(20.4, 2.8, 0.56, 0.25, 0.05, 'z');
    applyPlanarUVs(yScaleGeo, 20.4, 2.8, 'xy');
    const yScale = new THREE.Mesh(yScaleGeo, mats.ultra.sensorOpticalScale);
    yScale.rotation.z = Math.PI / 2;
    yScale.position.set(-28.6, 0, 0);

    const yRead = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 4.6, 1.45, 0.35, 0.08, 'z'),
      mats.ultra.icEpoxyLaser
    );
    yRead.position.set(-28.6, 3.0, 0.92);
    const yLens = new THREE.Mesh(
      hiResCyl(0.72, 0.72, 0.26, 14).rotateX(Math.PI / 2),
      mats.irLedLens
    );
    yLens.position.set(-28.6, 3.0, 0.24);
    yLens.userData.noEdges = true;
    const yTail = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 2.8, 0.22, 0.2, 0.02, 'z'),
      mats.polyimideFpc
    );
    yTail.position.set(-31.8, 3.0, 0.92);

    g.add(xScale, xRead, xLens, xTail, yScale, yRead, yLens, yTail);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-pixelshift-submicron-scale',
        77,
        '#0ea5e9',
        g,
        new THREE.Vector3(0, 0, -5.6),
        new THREE.Vector3(-90, 56, -72),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S78. Optical Filter Edge Blackening (Sumi-nuri) & 45° Bevel Stray-Light Trap
  // =========================================================================
  {
    const g = new THREE.Group();
    // Outer matte carbon Sumi-nuri light-absorbing glass-edge coating collar
    const sumiRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(39.4, 27.4, 0.9, 37.6, 25.6, 0.7), 1.9, 0.16, 0.16, 2, 18),
      mats.velvetFlockTrap
    );
    // 3 concentric micro-ribbed 45-deg stepped stray-light sawtooth trap collars
    const trapSteps: Array<[number, number, number, number, number]> = [
      [38.6, 26.6, 37.4, 25.4, 0.92],
      [38.0, 26.0, 36.9, 24.9, 0.62],
      [37.4, 25.4, 36.4, 24.4, 0.30],
    ];
    for (const [ow, oh, iw, ih, tz] of trapSteps) {
      const step = new THREE.Mesh(
        extrudeHiRes(createFrameShape(ow, oh, 0.8, iw, ih, 0.6), 0.24, 0.05, 0.05, 1, 14),
        mats.matteBlackAnodized
      );
      step.position.z = tz;
      g.add(step);
    }
    g.add(sumiRim);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-filter-edge-sumi',
        78,
        '#1f2937',
        g,
        new THREE.Vector3(0, 0, 3.55),
        new THREE.Vector3(-84, -46, 56),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S79. SSWF Outermost Super-Hydrophobic Fluorine + Anti-Static Multi-AR Coat
  // =========================================================================
  {
    const g = new THREE.Group();
    // Super-hydrophobic fluorine molecular monolayer + iridescent multi-AR optical pane
    const fluorinePane = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(39.2, 27.2, 0.9), 0.16, 0.02, 0.02, 1, 16),
      mats.fluorineCoatCyan
    );
    const arStratum = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(38.8, 26.8, 0.85), 0.06, 0.01, 0.01, 1, 14),
      mats.nanoArIridescent
    );
    arStratum.position.z = -0.10;
    arStratum.userData.noEdges = true;

    // Perimeter transparent-conductor Ag/ITO anti-static grounding bus + 4 corner gold ESD bridge pads
    const esdBorder = new THREE.Mesh(
      extrudeHiRes(createFrameShape(40.2, 28.2, 1.0, 38.6, 26.6, 0.8), 0.24, 0.03, 0.03, 1, 16),
      mats.silverElectrode
    );
    for (const [cx, cy] of [
      [-19.6, 13.6],
      [19.6, 13.6],
      [-19.6, -13.6],
      [19.6, -13.6],
    ] as Array<[number, number]>) {
      const pad = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 1.8, 0.30, 0.25, 0.03, 'z'),
        mats.goldPlating
      );
      pad.position.set(cx, cy, 0.02);
      g.add(pad);
    }
    g.add(fluorinePane, arStratum, esdBorder);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-sswf-fluorine-ar',
        79,
        '#22d3ee',
        g,
        new THREE.Vector3(0, 0, 7.35),
        new THREE.Vector3(82, 46, 98),
        cp,
        { ibisMovable: true, ultrasonicElement: true, edgeOpacity: 0.22 }
      )
    );
  }

  // =========================================================================
  // S80. Wire-Bond Black Epoxy Dam-and-Fill Encapsulation & Stepped Light-Baffle
  // =========================================================================
  {
    const g = new THREE.Group();
    // Step 1: Outer raised high-viscosity thixotropic black epoxy "Dam" containment wall
    const outerDam = new THREE.Mesh(
      extrudeHiRes(createFrameShape(43.8, 31.8, 1.4, 41.4, 29.4, 1.1), 1.24, 0.14, 0.14, 2, 18),
      mats.icEpoxy
    );
    // Step 2: Inner lower-viscosity self-leveling "Fill" potting resin encapsulating gold wire loops
    const innerFill = new THREE.Mesh(
      extrudeHiRes(createFrameShape(41.8, 29.8, 1.1, 37.2, 25.2, 0.6), 0.92, 0.10, 0.10, 2, 16),
      mats.matteBlackAnodized
    );
    innerFill.position.z = -0.08;
    // Step 3: Inner 45-deg stepped velvet-black knife-edge anti-flare baffle lip
    const innerBevel = new THREE.Mesh(
      extrudeHiRes(createFrameShape(38.0, 26.0, 0.7, 36.4, 24.4, 0.5), 0.45, 0.08, 0.08, 2, 16),
      mats.velvetFlockTrap
    );
    innerBevel.position.z = 0.45;
    g.add(outerDam, innerFill, innerBevel);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-wirebond-dam-baffle',
        80,
        '#475569',
        g,
        new THREE.Vector3(0, 0, 0.55),
        new THREE.Vector3(-82, 10, 34),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S81. On-Sensor Low-Jitter TCXO Crystal Oscillator & Genlock Clock Tree
  // =========================================================================
  {
    const g = new THREE.Group();
    // Chamfered high-frequency Rogers/FR-4 clock sub-PCB
    const subPcb = new THREE.Mesh(
      createChamferedBoxGeo(12.2, 5.8, 0.55, 0.5, 0.05, 'z'),
      mats.hdiMainboardPcb
    );

    // Authentic 2520/3225 ceramic-base + seam-welded brushed gold-lidded SMD TCXO oscillator + 4 castellated pads
    const tcxoCer = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 3.4, 0.52, 0.25, 0.05, 'z'),
      mats.ceramicAlumina
    );
    tcxoCer.position.set(-2.9, 0, -0.52);
    const tcxoLid = new THREE.Mesh(
      createChamferedBoxGeo(4.0, 3.0, 0.58, 0.25, 0.08, 'z'),
      mats.goldPlating
    );
    tcxoLid.position.set(-2.9, 0, -1.04);
    for (const [px, py] of [
      [-4.9, 1.4],
      [-0.9, 1.4],
      [-4.9, -1.4],
      [-0.9, -1.4],
    ] as Array<[number, number]>) {
      const fillet = new THREE.Mesh(hiResSphere(0.32, 8, 6), mats.solderBallSilver);
      fillet.position.set(px, py, -0.40);
      fillet.userData.noEdges = true;
      g.add(fillet);
    }

    // Ultra-low-jitter QFN PLL Genlock Clock Fanout Buffer IC
    const pllIc = buildChipPackage({
      w: 3.4,
      d: 3.4,
      h: 0.72,
      style: 'qfn',
      pinsPerSide: 5,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    pllIc.rotation.y = Math.PI;
    pllIc.position.set(2.8, 0, -0.62);

    // Length-matched differential copper clock trace pair + twin 0402 Vdd decoupling MLCCs
    for (const cy of [-0.55, 0.55]) {
      const tr = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.28, 0.12), mats.copperHeatSpreader);
      tr.position.set(0.0, cy, -0.32);
      tr.userData.noEdges = true;
      g.add(tr);
    }
    for (const cy of [-1.9, 1.9]) {
      const cap = buildSmdPassive(1.1, 0.6, 0.45, mats.smdCeramic, mats.solderBallSilver, 'z');
      cap.rotation.y = Math.PI;
      cap.position.set(0.0, cy, -0.46);
      g.add(cap);
    }

    g.add(subPcb, tcxoCer, tcxoLid, pllIc);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-tcxo-clock-tree',
        81,
        '#eab308',
        g,
        new THREE.Vector3(-12.5, 16.2, -3.35),
        new THREE.Vector3(-64, 72, -34),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S82. Cross-Roller & Parallel-Flexure High-Rigidity IBIS Linear Guide Unit
  // =========================================================================
  {
    const g = new THREE.Group();
    // True machined 90° V-groove stainless linear rails + alternating ±45° crossed Si3N4 rollers + brass cage + notched CuBe2 flexures!
    const vRailShape = new THREE.Shape();
    vRailShape.moveTo(-1.25, -0.95);
    vRailShape.lineTo(1.25, -0.95);
    vRailShape.lineTo(1.25, 0.95);
    vRailShape.lineTo(0.45, 0.95);
    vRailShape.lineTo(0.0, 0.22); // Precision ground 90-degree V-groove channel!
    vRailShape.lineTo(-0.45, 0.95);
    vRailShape.lineTo(-1.25, 0.95);
    vRailShape.closePath();

    const vRailGeo = extrudeHiRes(vRailShape, 36.0, 0.06, 0.06, 1, 8);
    vRailGeo.rotateY(Math.PI / 2);

    for (const sy of [-1, 1]) {
      const rail = new THREE.Mesh(vRailGeo, mats.stainlessMachined);
      rail.position.set(0, sy * 25.2, 0);
      g.add(rail);

      // Slotted brass roller retainer cage strip cradling alternating ±45° cylindrical Si3N4 rollers
      const cage = new THREE.Mesh(
        createChamferedBoxGeo(31.0, 0.34, 1.25, 0.1, 0.02, 'z'),
        mats.brassGear
      );
      cage.position.set(0, sy * 25.2, 0.56);
      cage.userData.noEdges = true;
      g.add(cage);

      for (let i = -4; i <= 4; i++) {
        const roller = new THREE.Mesh(
          hiResCyl(0.56, 0.56, 1.28, 14),
          mats.siliconNitrideBall
        );
        roller.rotation.x = i % 2 === 0 ? Math.PI / 4 : -Math.PI / 4;
        roller.position.set(i * 3.4, sy * 25.2, 0.58);
        roller.userData.noEdges = true;
        g.add(roller);
      }

      // Etched CuBe2 parallel-flexure leaf beam with twin flexural hinge waist cutouts & end anchor blocks
      const flexCenter = new THREE.Mesh(
        createChamferedBoxGeo(22.0, 1.35, 0.28, 0.2, 0.02, 'z'),
        mats.beCuSpring
      );
      flexCenter.position.set(0, sy * 23.0, -0.55);
      for (const sx of [-13.2, 13.2]) {
        // Narrow elastic hinge neck + mounting boss ear
        const neck = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.52, 0.26), mats.beCuSpring);
        neck.position.set(sx * 0.91, sy * 23.0, -0.55);
        const boss = new THREE.Mesh(
          createChamferedBoxGeo(3.2, 2.0, 0.58, 0.4, 0.05, 'z'),
          mats.beCuSpring
        );
        boss.position.set(sx + Math.sign(sx) * 1.4, sy * 23.0, -0.55);
        g.add(neck, boss);
      }
      g.add(flexCenter);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-cross-roller-guide',
        82,
        '#94a3b8',
        g,
        new THREE.Vector3(0, 0, -6.0),
        new THREE.Vector3(88, 60, -86),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S83. Peltier Thermoelectric Cooler (TEC) & Anti-Dew Cold-Finger Module
  // =========================================================================
  {
    const g = new THREE.Group();
    // Dual chamfered high-conductivity crisp white Al2O3 ceramic heat-exchange substrates (Cold +Z / Hot -Z)
    const coldPlate = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(28.0, 20.0, 1.2), 0.52, 0.05, 0.05, 2, 16),
      mats.zifIvoryPlastic
    );
    coldPlate.position.z = 1.25;
    const hotPlate = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(28.0, 20.0, 1.2), 0.52, 0.05, 0.05, 2, 16),
      mats.zifIvoryPlastic
    );
    hotPlate.position.z = -1.25;

    // 63 Alternating P-type & N-type Bi2Te3 Thermoelectric Semiconductor Pellets (InstancedMesh)
    const pillarGeo = createChamferedBoxGeo(1.42, 1.42, 1.72, 0.14, 0.04, 'z');
    const pPellets = new THREE.InstancedMesh(pillarGeo, mats.siliconLogicLayer, 32);
    const nPellets = new THREE.InstancedMesh(pillarGeo, mats.copperHeatSpreader, 31);
    let pi = 0;
    let ni = 0;
    for (let ix = -4; ix <= 4; ix++) {
      for (let iy = -3; iy <= 3; iy++) {
        dummy.position.set(ix * 2.8, iy * 2.6, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        if ((ix + iy) % 2 === 0) pPellets.setMatrixAt(pi++, dummy.matrix);
        else nPellets.setMatrixAt(ni++, dummy.matrix);
      }
    }
    pPellets.instanceMatrix.needsUpdate = true;
    nPellets.instanceMatrix.needsUpdate = true;
    pPellets.userData.noEdges = true;
    nPellets.userData.noEdges = true;

    // Authentic serpentine copper-metallized interconnect bridge straps linking P/N pairs on top & bottom inner faces!
    const bridgeGeo = new THREE.BoxGeometry(4.2, 1.55, 0.16);
    const bridges = new THREE.InstancedMesh(bridgeGeo, mats.goldPlating, 56);
    let bi = 0;
    for (let iy = -3; iy <= 3; iy++) {
      // Cold-side (+Z) bridges connect even-to-odd pairs
      for (let ix = -4; ix <= 2; ix += 2) {
        dummy.position.set((ix + 0.5) * 2.8, iy * 2.6, 0.90);
        dummy.updateMatrix();
        bridges.setMatrixAt(bi++, dummy.matrix);
      }
      // Hot-side (-Z) bridges connect staggered odd-to-even pairs
      for (let ix = -3; ix <= 3; ix += 2) {
        dummy.position.set((ix + 0.5) * 2.8, iy * 2.6, -0.90);
        dummy.updateMatrix();
        bridges.setMatrixAt(bi++, dummy.matrix);
      }
    }
    bridges.instanceMatrix.needsUpdate = true;
    bridges.userData.noEdges = true;

    // Translucent perimeter RTV silicone moisture-seal fillet (leaves side-view of Bi2Te3 pellets & Cu bridges visible!)
    const moistureSeal = new THREE.Mesh(
      extrudeHiRes(createFrameShape(27.8, 19.8, 1.1, 26.8, 18.8, 0.8), 1.88, 0.06, 0.06, 1, 14),
      mats.opticalCementClear
    );
    moistureSeal.userData.noEdges = true;

    // Anti-dew perimeter polyimide heater trace ring on front cold-side border
    const antiDewRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(26.6, 18.6, 0.9, 25.0, 17.0, 0.7), 0.14, 0.02, 0.02, 1, 14),
      mats.polyimideFpc
    );
    antiDewRing.position.z = 1.58;

    // Copper vapor-chamber cold-finger heat-rejection bar + twin red/black DC Peltier power leads
    const coldFinger = new THREE.Mesh(
      createChamferedBoxGeo(10.0, 28.0, 0.78, 1.2, 0.10, 'z'),
      mats.vaporChamberCopper
    );
    coldFinger.position.set(16.0, 0, -1.7);

    const leadPos = new THREE.Mesh(
      hiResCyl(0.45, 0.45, 9.6, 10),
      mats.mountRedIndexDot
    );
    leadPos.position.set(-15.0, -6.2, -0.55);
    const leadNeg = new THREE.Mesh(
      hiResCyl(0.45, 0.45, 9.6, 10),
      mats.matteBlackAnodized
    );
    leadNeg.position.set(-16.4, -6.2, -0.55);
    leadPos.userData.noEdges = true;
    leadNeg.userData.noEdges = true;

    g.add(coldPlate, hotPlate, pPellets, nPellets, bridges, moistureSeal, antiDewRing, coldFinger, leadPos, leadNeg);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-peltier-tec-cooler',
        83,
        '#38bdf8',
        g,
        new THREE.Vector3(0, 0, -12.2),
        new THREE.Vector3(0, -68, -182),
        cp,
        { ibisMovable: false, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S84. Wafer-Edge Optical Fiducial Marks & 6-Axis Laser Alignment Targets
  // =========================================================================
  {
    const g = new THREE.Group();
    const corners: Array<[number, number]> = [
      [-19.2, 13.2],
      [19.2, 13.2],
      [-19.2, -13.2],
      [19.2, -13.2],
    ];
    for (const [cx, cy] of corners) {
      // Dark silicon fiducial island + nested gold Vernier crosshair + concentric laser-interferometer mirror rings + L-brackets!
      const pad = new THREE.Mesh(
        createChamferedBoxGeo(3.4, 3.4, 0.24, 0.25, 0.04, 'z'),
        mats.matteBlackAnodized
      );
      pad.position.set(cx, cy, 0);
      const crossH = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.34, 0.34), mats.goldPlating);
      crossH.position.set(cx, cy, 0.08);
      const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.34, 2.6, 0.34), mats.goldPlating);
      crossV.position.set(cx, cy, 0.08);
      const ringOuter = new THREE.Mesh(hiResTorus(1.22, 0.13, 8, 22), mats.silverElectrode);
      ringOuter.position.set(cx, cy, 0.12);
      ringOuter.userData.noEdges = true;
      const ringInner = new THREE.Mesh(hiResTorus(0.62, 0.09, 6, 18), mats.goldPlating);
      ringInner.position.set(cx, cy, 0.15);
      ringInner.userData.noEdges = true;

      // Corner Vernier quadrant squares
      for (const [qx, qy] of [
        [-0.95, 0.95],
        [0.95, -0.95],
      ] as Array<[number, number]>) {
        const sq = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.28), mats.goldPlating);
        sq.position.set(cx + qx, cy + qy, 0.10);
        sq.userData.noEdges = true;
        g.add(sq);
      }

      g.add(pad, crossH, crossV, ringOuter, ringInner);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-die-fiducial-targets',
        84,
        '#facc15',
        g,
        new THREE.Vector3(0, 0, 0.18),
        new THREE.Vector3(82, -14, 24),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S85. IBIS-Carrier-Mounted Ultra-Compact MEMS/Piezo Accelerometer
  // =========================================================================
  {
    const g = new THREE.Group();
    const carrierPcb = new THREE.Mesh(
      createChamferedBoxGeo(9.6, 6.4, 0.55, 0.5, 0.05, 'z'),
      mats.sensorPcb
    );

    // Metallic-lidded 3-axis LGA MEMS Accelerometer with ceramic base + brushed Ni-Ag Faraday lid + Pin-1 dot
    const memsBase = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 3.6, 0.48, 0.2, 0.04, 'z'),
      mats.ceramicAlumina
    );
    memsBase.position.set(-1.6, 0, -0.52);
    const memsLid = new THREE.Mesh(
      createChamferedBoxGeo(3.35, 3.35, 0.65, 0.22, 0.08, 'z'),
      mats.silverElectrode
    );
    memsLid.position.set(-1.6, 0, -1.04);
    const pin1Dot = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.08, 10).rotateX(Math.PI / 2), mats.goldPlating);
    pin1Dot.position.set(-2.6, 1.0, -1.38);
    pin1Dot.userData.noEdges = true;

    // Low-noise QFN instrumentation conditioner amp + 3 0402 RC anti-aliasing filter passives
    const ampIc = buildChipPackage({
      w: 2.8,
      d: 2.8,
      h: 0.65,
      style: 'qfn',
      pinsPerSide: 4,
      bodyMat: mats.ultra.icEpoxyLaser,
      leadMat: mats.solderBallSilver,
      pin1Mat: mats.goldPlating,
      axis: 'z',
    });
    ampIc.rotation.y = Math.PI;
    ampIc.position.set(2.4, 0.5, -0.56);

    for (let k = 0; k < 3; k++) {
      const rc = buildSmdPassive(0.95, 0.52, 0.42, mats.smdCeramic, mats.solderBallSilver, 'z');
      rc.rotation.y = Math.PI;
      rc.position.set(1.2 + k * 1.15, -1.9, -0.45);
      g.add(rc);
    }

    // Flexible polyimide tail + 6 ENIG gold ZIF contact fingers
    const flexTail = new THREE.Mesh(
      createChamferedBoxGeo(3.4, 7.2, 0.22, 0.25, 0.02, 'z'),
      mats.polyimideFpc
    );
    flexTail.position.set(0, -6.2, -0.2);
    for (let k = 0; k < 6; k++) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.8, 0.10), mats.goldPlating);
      f.position.set(-1.1 + k * 0.44, -8.8, -0.06);
      f.userData.noEdges = true;
      g.add(f);
    }

    g.add(carrierPcb, memsBase, memsLid, pin1Dot, ampIc, flexTail);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-carrier-piezo-accel',
        85,
        '#f43f5e',
        g,
        new THREE.Vector3(19.5, 14.8, -4.9),
        new THREE.Vector3(74, 64, -56),
        cp,
        { ibisMovable: true, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S86. Dual-Edge 16-Lane SLVS-EC v3.0 Interposer & Common-Mode Choke Array
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const side of [-1, 1]) {
      const strip = new THREE.Mesh(
        createChamferedBoxGeo(4.6, 25.0, 0.65, 0.4, 0.05, 'z'),
        mats.hdiMainboardPcb
      );
      strip.position.set(side * 25.6, 0, 0);
      g.add(strip);

      // 16 discrete ENIG gold differential pair landing fingers along inner interposer edge
      for (let p = 0; p < 16; p++) {
        const py = -10.5 + p * 1.4;
        const pad = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.68, 0.78), mats.goldPlating);
        pad.position.set(side * 24.3, py, 0.06);
        pad.userData.noEdges = true;
        g.add(pad);
      }

      // 8 detailed 0605 Ferrite Common-Mode Choke Coils (ferrite drum + twin copper windings + 4 silver corner pads!)
      for (let i = 0; i < 8; i++) {
        const cy = -9.8 + i * 2.8;
        const core = new THREE.Mesh(
          createChamferedBoxGeo(1.75, 1.55, 0.82, 0.16, 0.06, 'z'),
          mats.ferriteInductor
        );
        core.position.set(side * 26.5, cy, -0.52);
        const windingBand = new THREE.Mesh(
          new THREE.BoxGeometry(1.15, 1.62, 0.56),
          mats.copperCoil
        );
        windingBand.position.set(side * 26.5, cy, -0.52);
        windingBand.userData.noEdges = true;
        g.add(core, windingBand);

        // 4 corner tinned solder terminations
        for (const [tx, ty] of [
          [-0.72, -0.62],
          [0.72, -0.62],
          [-0.72, 0.62],
          [0.72, 0.62],
        ] as Array<[number, number]>) {
          const term = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.34, 0.36), mats.solderBallSilver);
          term.position.set(side * 26.5 + tx, cy + ty, -0.44);
          term.userData.noEdges = true;
          g.add(term);
        }
      }

      // Upper & lower DFN high-speed ESD TVS protection diode arrays
      for (const ey of [-11.4, 11.4]) {
        const tvs = buildChipPackage({
          w: 2.2,
          d: 1.2,
          h: 0.48,
          style: 'dfn',
          pinsPerSide: 3,
          bodyMat: mats.ultra.icEpoxyLaser,
          leadMat: mats.solderBallSilver,
          pin1Mat: mats.goldPlating,
          axis: 'z',
        });
        tvs.rotation.y = Math.PI;
        tvs.position.set(side * 26.2, ey, -0.46);
        g.add(tvs);
      }
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-dual-edge-slvs16',
        86,
        '#14b8a6',
        g,
        new THREE.Vector3(0, 0, -2.85),
        new THREE.Vector3(96, 12, -32),
        cp,
        { ibisMovable: true, edgeOpacity: 0.26 }
      )
    );
  }

  // =========================================================================
  // S87. Ceramic Substrate Copper Thermal-Via Array & Nano-Silver Die-Attach
  // =========================================================================
  {
    const g = new THREE.Group();
    // Pressure-sintered porous nano-silver die-attach sheet with chamfered edges
    const nanoSilverLayer = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(36.8, 24.8, 0.6), 0.26, 0.03, 0.03, 2, 14),
      mats.sinteredSilver
    );
    nanoSilverLayer.position.z = 0.55;

    // 61 Solid Copper-Filled Thermal Vias + Top/Bottom ENIG Annular Capture Rings (InstancedMesh!)
    const viaCoords: Array<[number, number]> = [];
    for (let ix = -6; ix <= 6; ix++) {
      for (let iy = -4; iy <= 4; iy++) {
        if ((ix + iy) % 2 !== 0) continue;
        viaCoords.push([ix * 2.6, iy * 2.6]);
      }
    }
    const viaGeo = hiResCyl(0.45, 0.45, 1.32, 12).rotateX(Math.PI / 2);
    const ringGeo = hiResTorus(0.58, 0.14, 6, 12);
    const vias = new THREE.InstancedMesh(viaGeo, mats.copperHeatSpreader, viaCoords.length);
    const rings = new THREE.InstancedMesh(ringGeo, mats.goldPlating, viaCoords.length * 2);
    viaCoords.forEach(([vx, vy], i) => {
      dummy.position.set(vx, vy, -0.15);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      vias.setMatrixAt(i, dummy.matrix);

      dummy.position.set(vx, vy, 0.42);
      dummy.updateMatrix();
      rings.setMatrixAt(i * 2, dummy.matrix);

      dummy.position.set(vx, vy, -0.76);
      dummy.updateMatrix();
      rings.setMatrixAt(i * 2 + 1, dummy.matrix);
    });
    vias.instanceMatrix.needsUpdate = true;
    rings.instanceMatrix.needsUpdate = true;
    vias.userData.noEdges = true;
    rings.userData.noEdges = true;

    const baseRing = new THREE.Mesh(
      extrudeHiRes(createFrameShape(38.0, 26.0, 0.8, 35.6, 23.6, 0.5), 0.46, 0.04, 0.04, 2, 16),
      mats.copperHeatSpreader
    );
    baseRing.position.z = -0.58;
    g.add(nanoSilverLayer, vias, rings, baseRing);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-thermal-via-dieattach',
        87,
        '#d97706',
        g,
        new THREE.Vector3(0, 0, -1.35),
        new THREE.Vector3(-92, -16, -24),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S88. Power-Off Magnetic Detent & Freefall Emergency Electromagnetic Brake
  // =========================================================================
  {
    const g = new THREE.Group();
    for (const side of [-1, 1]) {
      // Copper-wound emergency brake solenoid coil on dual-flanged LCP bobbin
      const brakeCoil = new THREE.Mesh(
        createChamferedBoxGeo(5.4, 7.8, 2.4, 0.4, 0.1, 'z'),
        mats.copperCoil
      );
      brakeCoil.position.set(side * 36.2, -12.5, 0);
      for (const fy of [-16.6, -8.4]) {
        const fl = new THREE.Mesh(
          createChamferedBoxGeo(6.0, 0.55, 2.8, 0.2, 0.05, 'z'),
          mats.matteBlackAnodized
        );
        fl.position.set(side * 36.2, fy, 0);
        g.add(fl);
      }

      // Pivoted pure-iron armature hook + stainless pivot pin + CuBe2 return leaf spring
      const ironHook = new THREE.Mesh(
        createChamferedBoxGeo(4.6, 3.2, 1.9, 0.4, 0.08, 'z'),
        mats.pureIronArmature
      );
      ironHook.position.set(side * 33.4, -12.5, 0.6);
      const pivot = new THREE.Mesh(
        hiResCyl(0.68, 0.68, 2.6, 14).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      pivot.position.set(side * 34.8, -12.5, 0.6);
      pivot.userData.noEdges = true;
      const leafSpr = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 6.4, 1.2, 0.08, 0.02, 'z'),
        mats.beCuSpring
      );
      leafSpr.position.set(side * 34.4, -15.6, 0.6);

      // High-damping butyl rubber brake shoe with 5 interlocking serrated friction teeth!
      const shoeBase = new THREE.Mesh(
        createChamferedBoxGeo(1.4, 5.6, 2.2, 0.25, 0.06, 'z'),
        mats.butylDamperRubber
      );
      shoeBase.position.set(side * 31.4, -12.5, 0.8);
      for (let t = -2; t <= 2; t++) {
        const tooth = new THREE.Mesh(
          createChamferedBoxGeo(0.75, 0.62, 2.1, 0.08, 0.04, 'z'),
          mats.damperElastomer
        );
        tooth.position.set(side * 30.65, -12.5 + t * 1.05, 0.8);
        tooth.userData.noEdges = true;
        g.add(tooth);
      }

      g.add(brakeCoil, ironHook, pivot, leafSpr, shoeBase);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-freefall-ibis-brake',
        88,
        '#e11d48',
        g,
        new THREE.Vector3(0, 0, -7.9),
        new THREE.Vector3(-96, -54, -120),
        cp,
        { ibisMovable: false, edgeOpacity: 0.28 }
      )
    );
  }

  // =========================================================================
  // S89. Ultra-Low-Alpha (ULA) Cover Glass & Soft-Error Ceramic Shield Collar
  // =========================================================================
  {
    const g = new THREE.Group();
    // Ultra-low-alpha (<0.001 cph/cm²) synthetic fused silica optical window with 45° beveled perimeter
    const ulaGlass = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(38.4, 26.4, 0.7), 0.34, 0.05, 0.05, 2, 16),
      mats.coverGlass
    );
    // High-purity sintered Al2O3 alpha-particle radiation shield collar + inner gold wetting bezel
    const aluminaCollar = new THREE.Mesh(
      extrudeHiRes(createFrameShape(42.2, 30.2, 1.2, 38.4, 26.4, 0.7), 1.05, 0.07, 0.07, 2, 18),
      mats.ceramicAlumina
    );
    aluminaCollar.position.z = -0.15;
    const goldWet = new THREE.Mesh(
      extrudeHiRes(createFrameShape(39.4, 27.4, 0.8, 38.0, 26.0, 0.65), 0.16, 0.02, 0.02, 1, 16),
      mats.goldPlating
    );
    goldWet.position.z = 0.38;
    goldWet.userData.noEdges = true;

    // Corner stress-relief bevel notches
    for (const [nx, ny] of [
      [-20.6, 14.6],
      [20.6, 14.6],
      [-20.6, -14.6],
      [20.6, -14.6],
    ] as Array<[number, number]>) {
      const notch = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.12), mats.matteBlackAnodized);
      notch.position.set(nx, ny, -0.15);
      notch.rotation.z = Math.PI / 4;
      notch.userData.noEdges = true;
      g.add(notch);
    }

    g.add(ulaGlass, aluminaCollar, goldWet);

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-low-alpha-mold',
        89,
        '#a855f7',
        g,
        new THREE.Vector3(0, 0, 1.75),
        new THREE.Vector3(88, -42, 42),
        cp,
        { ibisMovable: true, edgeOpacity: 0.24 }
      )
    );
  }

  // =========================================================================
  // S90. Imaging-Chamber Velvet-Flocked Labyrinth Frame & Silicone Isolators
  // =========================================================================
  {
    const g = new THREE.Group();
    // 3-step terraced labyrinth dust-trap & stray-light baffle chamber frame (matte electrostatic velvet flock)
    const outerLabyrinth = new THREE.Mesh(
      extrudeHiRes(createFrameShape(49.4, 36.8, 2.6, 39.2, 27.0, 1.0), 1.45, 0.10, 0.10, 2, 22),
      mats.velvetFlockTrap
    );
    const midStep = new THREE.Mesh(
      extrudeHiRes(createFrameShape(44.2, 31.8, 1.8, 38.6, 26.4, 0.9), 0.72, 0.06, 0.06, 2, 18),
      mats.mountVelvetBaffle
    );
    midStep.position.z = -0.35;
    const innerStep = new THREE.Mesh(
      extrudeHiRes(createFrameShape(41.4, 29.2, 1.3, 37.8, 25.6, 0.75), 0.56, 0.05, 0.05, 2, 18),
      mats.velvetFlockTrap
    );
    innerStep.position.z = -0.78;
    g.add(outerLabyrinth, midStep, innerStep);

    // 4 corner flanged cinnabar silicone vibration-isolator grommets with stainless inner compression sleeves!
    for (const [gx, gy] of [
      [-21.8, 15.6],
      [21.8, 15.6],
      [-21.8, -15.6],
      [21.8, -15.6],
    ] as Array<[number, number]>) {
      const grommetFront = new THREE.Mesh(hiResTorus(1.9, 0.58, 10, 22), mats.cinnabarAnodized);
      grommetFront.position.set(gx, gy, -0.05);
      const grommetRear = new THREE.Mesh(hiResTorus(1.9, 0.58, 10, 22), mats.cinnabarAnodized);
      grommetRear.position.set(gx, gy, -0.75);
      const innerSleeve = new THREE.Mesh(
        hiResCyl(1.18, 1.18, 1.45, 16).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      innerSleeve.position.set(gx, gy, -0.4);
      const sleeveBore = new THREE.Mesh(
        hiResCyl(0.72, 0.72, 1.52, 12).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      sleeveBore.position.set(gx, gy, -0.4);
      sleeveBore.userData.noEdges = true;
      g.add(grommetFront, grommetRear, innerSleeve, sleeveBore);
    }

    parts.push(
      finalizeSensorNextGenPart(
        'sensor-chamber-labyrinth-felt',
        90,
        '#f97316',
        g,
        new THREE.Vector3(0, 0, 9.4),
        new THREE.Vector3(-76, 62, 118),
        cp,
        { ibisMovable: false, edgeOpacity: 0.26 }
      )
    );
  }

  return parts;
}
