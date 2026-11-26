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
  // S71. Liquid-Crystal Electronic Variable ND Filter (e-ND: 1/4–1/128, Sony US 2026/0358663 A1)
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

    // Dual-stacked Guest-Host Liquid-Crystal active cell (Sony US 2026/0358663 A1: 3 glass plates + twin LC cavities!)
    const lcPaneGeo = extrudeHiRes(createRoundedRectShape(38.4, 26.4, 0.8), 0.24, 0.02, 0.02, 1, 16);
    applyPlanarUVs(lcPaneGeo, 38.4, 26.4, 'xy');
    const lcCellFront = new THREE.Mesh(lcPaneGeo, mats.ultra.sensorEndLiquidCrystal);
    lcCellFront.position.z = 0.14;

    const lcCellRear = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(38.2, 26.2, 0.78), 0.18, 0.02, 0.02, 1, 14),
      mats.lcdPolarizerFilm
    );
    lcCellRear.position.z = -0.16;
    lcCellRear.userData.noEdges = true;

    // 3 ultra-flat optical glass plates (front, middle shared ITO substrate, rear)
    for (const gz of [-0.34, 0.0, 0.34]) {
      const glassPlate = new THREE.Mesh(
        extrudeHiRes(createRoundedRectShape(38.0, 26.0, 0.7), 0.07, 0.01, 0.01, 1, 14),
        mats.coverGlass
      );
      glassPlate.position.z = gz;
      glassPlate.userData.noEdges = true;
      g.add(glassPlate);
    }

    // Perimeter UV-cured black epoxy seal rim + upper/lower gold ITO transparent electrode busbars & ACF bond pads
    const uvSealRim = new THREE.Mesh(
      extrudeHiRes(createFrameShape(38.6, 26.6, 0.82, 37.5, 25.5, 0.68), 0.62, 0.03, 0.03, 1, 16),
      mats.epdmGasket
    );
    uvSealRim.userData.noEdges = true;
    g.add(uvSealRim);

    for (const sy of [-13.6, 13.6]) {
      const bus = new THREE.Mesh(
        createChamferedBoxGeo(36.0, 0.75, 0.56, 0.14, 0.04, 'z'),
        mats.goldPlating
      );
      bus.position.set(0, sy, 0.16);
      g.add(bus);
    }

    // Sony Nov 12, 2026 Patent US 2026/0358663 A1: Diagonal corner LC injection ports + cyan UV end-seal plugs
    // + 3D stepped asymmetric flow-dividing barrier walls (short inner center baffle + angled outer edge flow guide)!
    for (const [sx, sy] of [
      [-1, 1],
      [1, -1],
    ] as Array<[number, number]>) {
      // Corner LC injection port sleeve & UV-cured sealant plug stopper
      const portSleeve = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 1.35, 0.80, 0.2, 0.05, 'z'),
        mats.titaniumRivet
      );
      portSleeve.position.set(sx * 15.6, sy * 15.85, 0);
      const uvPlug = new THREE.Mesh(
        createChamferedBoxGeo(1.75, 0.92, 0.86, 0.15, 0.04, 'z'),
        mats.fluorineCoatCyan
      );
      uvPlug.position.set(sx * 15.6, sy * 16.05, 0);
      uvPlug.userData.noEdges = true;

      // Stepped asymmetric LC flow-dividing barrier wall #1 (shorter high-resistance center path deflector)
      const barrierShort = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.42, 0.52, 0.08, 0.02, 'z'),
        mats.goldPlating
      );
      barrierShort.position.set(sx * 15.0, sy * 11.7, 0.06);
      barrierShort.rotation.z = sx * sy * -0.45;
      barrierShort.userData.noEdges = true;

      // Stepped asymmetric LC flow-dividing barrier wall #2 (longer outer perimeter guide wall balancing fill velocity!)
      const barrierLong = new THREE.Mesh(
        createChamferedBoxGeo(5.8, 0.36, 0.52, 0.08, 0.02, 'z'),
        mats.epdmGasket
      );
      barrierLong.position.set(sx * 12.6, sy * 12.45, 0.06);
      barrierLong.rotation.z = sx * sy * -0.18;
      barrierLong.userData.noEdges = true;

      g.add(portSleeve, uvPlug, barrierShort, barrierLong);
    }

    // Curved polyimide variable-ND voltage drive flex ribbon with copper traces & 4-pin ZIF gold tail
    const driveFlex = new THREE.Mesh(
      createChamferedBoxGeo(5.6, 9.6, 0.22, 0.4, 0.03, 'z'),
      mats.polyimideFpc
    );
    driveFlex.position.set(24.0, -7.5, -0.15);
    const zifStiff = new THREE.Mesh(
      createChamferedBoxGeo(6.0, 2.4, 0.24, 0.2, 0.03, 'z'),
      mats.zifIvoryPlastic
    );
    zifStiff.position.set(24.0, -11.4, -0.34);
    for (let k = 0; k < 4; k++) {
      const tr = new THREE.Mesh(new THREE.BoxGeometry(0.55, 8.4, 0.08), mats.goldPlating);
      tr.position.set(22.5 + k * 1.0, -7.8, -0.02);
      tr.userData.noEdges = true;
      g.add(tr);
    }

    g.add(outerFrame, lcCellFront, lcCellRear, driveFlex, zifStiff);

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
    // Instanced 60 Cu-Cu hybrid stitch micro-pillars bonding top & bottom 4nm readout strips to pixel wafer!
    const stitchGeo = hiResCyl(0.24, 0.24, 0.34, 8).rotateX(Math.PI / 2);
    const stitchInst = new THREE.InstancedMesh(stitchGeo, mats.copperHybridBond, 60);
    let si = 0;

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

      for (let m = 0; m < 30; m++) {
        dummy.position.set(-16.8 + (m / 29) * 33.6, sy * 12.7, 0.42);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        stitchInst.setMatrixAt(si++, dummy.matrix);
      }

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
    stitchInst.instanceMatrix.needsUpdate = true;
    stitchInst.userData.noEdges = true;
    g.add(stitchInst);

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
    // TRUE 2D SPHERICAL CONCAVE RETINAL CMOS DISH (curved in BOTH X and Y, R=115mm, Sony US 2026/0267115 A1!)
    const sphereR = 115.0;
    const sagAt = (x: number, y: number) =>
      sphereR - Math.sqrt(sphereR * sphereR - (x * x + y * y));

    const curvedDieGeo = buildSphericalDishPatch(36.4, 24.4, 0.36, sphereR, 26, 18, false);
    const curvedDie = new THREE.Mesh(curvedDieGeo, mats.siliconSensorDie);
    curvedDie.position.z = 0.0;

    // Matching 2D Spherically-Concave CNC-Ground HTCC Alumina Ceramic Forming Carrier Bed
    const bedGeo = buildSphericalDishPatch(40.2, 28.0, 0.85, sphereR, 26, 18, true, -1.75);
    applyBoxUVs(bedGeo, 16.0);
    const ceramicBed = new THREE.Mesh(bedGeo, mats.ultra.sensorHtccCeramic);
    ceramicBed.position.z = -0.38;

    // Curved 4-edge golden wire-bond landing shelf markers + 4 corner titanium tension clamping clips!
    const curvedPads: Array<[number, number, boolean]> = [];
    for (let i = -8; i <= 8; i++) {
      curvedPads.push([i * 2.1, -13.1, false], [i * 2.1, 13.1, false]);
    }
    for (let j = -5; j <= 5; j++) {
      curvedPads.push([-19.1, j * 2.2, true], [19.1, j * 2.2, true]);
    }
    const cPadGeo = new THREE.BoxGeometry(0.65, 0.95, 0.10);
    const cPadInst = new THREE.InstancedMesh(cPadGeo, mats.goldPlating, curvedPads.length);
    curvedPads.forEach(([px, py, rot90], idx) => {
      dummy.position.set(px, py, sagAt(px, py) - 0.36);
      dummy.rotation.set(0, 0, rot90 ? Math.PI / 2 : 0);
      dummy.updateMatrix();
      cPadInst.setMatrixAt(idx, dummy.matrix);
    });
    cPadInst.instanceMatrix.needsUpdate = true;
    cPadInst.userData.noEdges = true;
    g.add(cPadInst);

    // 4 Corner titanium spherical-forming tension clamp brackets & radial strain-relief kerf notches
    for (const [cx, cy] of [
      [-19.2, 13.0],
      [19.2, 13.0],
      [-19.2, -13.0],
      [19.2, -13.0],
    ] as Array<[number, number]>) {
      const sz = sagAt(cx, cy) - 0.16;
      const clip = new THREE.Mesh(
        createChamferedBoxGeo(2.8, 2.2, 0.42, 0.25, 0.04, 'z'),
        mats.titaniumRivet
      );
      clip.position.set(cx, cy, sz);
      clip.rotation.z = Math.atan2(cy, cx);
      const pin = new THREE.Mesh(
        hiResCyl(0.42, 0.42, 0.56, 10).rotateX(Math.PI / 2),
        mats.stainlessMachined
      );
      pin.position.set(cx, cy, sz + 0.08);
      pin.userData.noEdges = true;
      g.add(clip, pin);
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
    // 3 color-coded thickness shims per tripod boss + stamped numeric marking face ("25 / IM-D / 250u / 456") on rear-facing outer shim!
    const shimMats = [mats.ultra.sensorWasherMarking, mats.brassGear, mats.mountShimBlue];
    const tabAngles = [-0.45, 0.0, 0.45];

    const washerGeo = extrudeHiRes(createFrameShape(8.0, 8.0, 4.0, 4.1, 4.1, 2.05), 0.26, 0.03, 0.03, 2, 22);
    applyBoxUVs(washerGeo, 8.0);
    const markedWasherGeo = washerGeo.clone();
    applyPlanarUVs(markedWasherGeo, 8.0, 8.0, 'xy-back');

    for (const [bx, by] of bossCoords) {
      for (let k = 0; k < 3; k++) {
        const wMesh = new THREE.Mesh(k === 0 ? markedWasherGeo : washerGeo, shimMats[k]);
        wMesh.position.set(bx, by, (k - 1) * 0.34);
        g.add(wMesh);

        // Authentic Sony fanned thickness-identification orientation tabs with brushed SUS grain & index pip
        const ang = tabAngles[k];
        const tabGeo = createChamferedBoxGeo(2.8, 1.35, 0.24, 0.25, 0.03, 'z');
        applyBoxUVs(tabGeo, 6.0);
        const tab = new THREE.Mesh(
          tabGeo,
          k === 0 ? mats.ultra.sensorSusSpringSteel : shimMats[k]
        );
        tab.position.set(bx + Math.cos(ang) * 4.55, by + Math.sin(ang) * 4.55, (k - 1) * 0.34);
        tab.rotation.z = ang;
        const pip = new THREE.Mesh(hiResCyl(0.24, 0.24, 0.28, 8).rotateX(Math.PI / 2), mats.goldPlating);
        pip.position.set(bx + Math.cos(ang) * 5.25, by + Math.sin(ang) * 5.25, (k - 1) * 0.34);
        pip.userData.noEdges = true;
        g.add(tab, pip);
      }

      // Precision chamfered inner bore sleeve indexing all 3 stacked adjustment shims
      const boreRim = new THREE.Mesh(hiResTorus(2.05, 0.14, 6, 18), mats.stainlessMachined);
      boreRim.position.set(bx, by, -0.45);
      boreRim.userData.noEdges = true;
      g.add(boreRim);
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

    // 3 Overlapping 0.04mm 2x2 twill CFRP composite interlocking dust-shield blades + overlap light-seal hems + titanium rivets!
    const bladeSpecs: Array<[number, number]> = [
      [8.8, 0.22],
      [2.2, 0.0],
      [-7.8, -0.22],
    ];
    for (const [by, bz] of bladeSpecs) {
      const bladeGeo = createChamferedBoxGeo(38.2, 6.8, 0.24, 0.25, 0.03, 'z');
      applyBoxUVs(bladeGeo, 14.0);
      const blade = new THREE.Mesh(bladeGeo, mats.ultra.sensorCarbonCurtainWeave);
      blade.position.set(0, by, bz);

      // Horizontal anti-warping stiffening micro-rib & stepped overlap light-seal hem lip
      const rib = new THREE.Mesh(new THREE.BoxGeometry(36.8, 0.48, 0.14), mats.matteBlackAnodized);
      rib.position.set(0, by, bz + 0.14);
      rib.userData.noEdges = true;
      const hemLip = new THREE.Mesh(new THREE.BoxGeometry(37.6, 0.42, 0.18), mats.ultra.sensorVelvetBaffle);
      hemLip.position.set(0, by - 3.25, bz + 0.06);
      hemLip.userData.noEdges = true;

      // Twin titanium linkage pivot rivets (left guide slide + right pantograph drive)
      for (const rx of [-19.4, 19.6]) {
        const rivet = new THREE.Mesh(
          hiResCyl(0.45, 0.45, 0.56, 12).rotateX(Math.PI / 2),
          mats.titaniumRivet
        );
        rivet.position.set(rx, by, bz + 0.12);
        rivet.userData.noEdges = true;
        g.add(rivet);
      }
      g.add(blade, rib, hemLip);
    }

    // Twin vertical brushed-SUS scissor-linkage pantograph drive arms + orthocyclic copper-wound drive actuator coil
    const actuatorBobbin = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 17.2, 2.4, 0.4, 0.08, 'z'),
      mats.matteBlackAnodized
    );
    actuatorBobbin.position.set(22.2, 0, -0.2);
    const coilGeo = createChamferedBoxGeo(3.6, 14.2, 2.55, 0.3, 0.06, 'z');
    applyBoxUVs(coilGeo, 8.0);
    const actuatorCoil = new THREE.Mesh(coilGeo, mats.ultra.sensorVcmCopperWinding);
    actuatorCoil.position.set(22.2, 0, -0.2);

    for (const lx of [19.6, 20.6]) {
      const linkGeo = createChamferedBoxGeo(0.85, 22.0, 0.36, 0.2, 0.03, 'z');
      applyBoxUVs(linkGeo, 10.0);
      const linkBar = new THREE.Mesh(linkGeo, mats.ultra.sensorSusSpringSteel);
      linkBar.position.set(lx, 0, 0.42);
      g.add(linkBar);
    }
    // Diagonal articulated pantograph cross-links coupling curtain blades to solenoid drive crank
    for (const [py, ang] of [
      [5.5, 0.36],
      [-5.5, -0.36],
    ] as Array<[number, number]>) {
      const pArm = new THREE.Mesh(
        createChamferedBoxGeo(3.6, 0.65, 0.26, 0.12, 0.02, 'z'),
        mats.ultra.sensorSusSpringSteel
      );
      pArm.position.set(20.1, py, 0.62);
      pArm.rotation.z = ang;
      pArm.userData.noEdges = true;
      g.add(pArm);
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
    // 3 authentic 5-segment Halbach flux-focusing N52 NdFeB arrays with laser-etched flux vector arrows & brass spacers!
    const positions: Array<{ x: number; y: number; rotZ: number }> = [
      { x: -33.2, y: 0, rotZ: Math.PI / 2 },
      { x: 33.2, y: 0, rotZ: Math.PI / 2 },
      { x: 0, y: -23.8, rotZ: 0 },
    ];
    for (const p of positions) {
      const sub = new THREE.Group();
      sub.position.set(p.x, p.y, 0);
      sub.rotation.z = p.rotZ;

      // 5 discrete chamfered N52 Halbach segments separated by crisp non-magnetic brass dielectric spacers
      for (let s = 0; s < 5; s++) {
        const sx = -9.2 + s * 4.6;
        const isHoriz = s === 1 || s === 3;
        const block = new THREE.Mesh(
          createChamferedBoxGeo(4.35, 5.2, 2.0, 0.25, 0.08, 'z'),
          isHoriz ? mats.cinnabarAnodized : mats.neodymiumMagnet
        );
        block.position.set(sx, 0, 0);
        sub.add(block);
        if (s < 4) {
          const spacer = new THREE.Mesh(new THREE.BoxGeometry(0.24, 5.1, 1.96), mats.brassGear);
          spacer.position.set(sx + 2.3, 0, 0);
          spacer.userData.noEdges = true;
          sub.add(spacer);
        }
      }

      // High-DPI laser-etched Halbach flux-vector face plate (↑ → ↓ ← ↑) on front (+Z)
      const faceGeo = markHiRes(new THREE.PlaneGeometry(22.6, 4.9));
      applyPlanarUVs(faceGeo, 22.6, 4.9, 'xy');
      const faceOverlay = new THREE.Mesh(faceGeo, mats.ultra.sensorHalbachMagnet);
      faceOverlay.position.set(0, 0, 1.03);
      faceOverlay.userData.noEdges = true;

      // Stepped brushed soft-iron flux-return yoke backing plate with end retaining cheeks & corner clamp clips
      const backGeo = createChamferedBoxGeo(24.0, 5.9, 0.72, 0.5, 0.08, 'z');
      applyBoxUVs(backGeo, 14.0);
      const backPlate = new THREE.Mesh(backGeo, mats.ultra.sensorSoftIronYoke);
      backPlate.position.z = -1.28;
      for (const cx of [-11.8, 11.8]) {
        const cheekGeo = createChamferedBoxGeo(0.55, 5.6, 2.2, 0.15, 0.04, 'z');
        applyBoxUVs(cheekGeo, 10.0);
        const cheek = new THREE.Mesh(cheekGeo, mats.ultra.sensorSoftIronYoke);
        cheek.position.set(cx, 0, -0.35);
        const endScrew = new THREE.Mesh(
          hiResCyl(0.48, 0.48, 0.42, 10).rotateX(Math.PI / 2),
          mats.stainlessMachined
        );
        endScrew.position.set(cx, 0, 0.82);
        endScrew.userData.noEdges = true;
        sub.add(cheek, endScrew);
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
    // X-axis Invar-36 / Quartz optical linear encoder scale with bespoke chrome grating & end clamp brackets!
    const xScaleGeo = createChamferedBoxGeo(26.4, 2.8, 0.56, 0.25, 0.05, 'z');
    applyPlanarUVs(xScaleGeo, 26.4, 2.8, 'xy');
    const xScale = new THREE.Mesh(xScaleGeo, mats.ultra.sensorOpticalScale);
    xScale.position.set(0, 21.8, 0);

    for (const ex of [-13.2, 13.2]) {
      const clamp = new THREE.Mesh(
        createChamferedBoxGeo(1.8, 3.4, 0.78, 0.2, 0.04, 'z'),
        mats.ultra.sensorSusSpringSteel
      );
      clamp.position.set(ex, 21.8, 0.04);
      const pin = new THREE.Mesh(hiResCyl(0.36, 0.36, 0.92, 10).rotateX(Math.PI / 2), mats.titaniumRivet);
      pin.position.set(ex, 21.8, 0.08);
      pin.userData.noEdges = true;
      g.add(clamp, pin);
    }

    // X optical scanning readhead with chamfered ASIC housing, dual IR collimating lenses & gold-fingered flex tail
    const xRead = new THREE.Mesh(
      createChamferedBoxGeo(4.6, 3.6, 1.45, 0.35, 0.08, 'z'),
      mats.ultra.icEpoxyLaser
    );
    xRead.position.set(4.0, 21.8, 0.92);
    for (const lx of [3.2, 4.8]) {
      const xLens = new THREE.Mesh(
        hiResCyl(0.55, 0.55, 0.26, 14).rotateX(Math.PI / 2),
        lx < 4 ? mats.irLedLens : mats.evfIrWindowBlack
      );
      xLens.position.set(lx, 21.8, 0.24);
      xLens.userData.noEdges = true;
      g.add(xLens);
    }
    const xTail = new THREE.Mesh(
      createChamferedBoxGeo(2.8, 4.4, 0.22, 0.2, 0.02, 'z'),
      mats.polyimideFpc
    );
    xTail.position.set(4.0, 25.0, 0.92);
    for (let k = 0; k < 4; k++) {
      const fg = new THREE.Mesh(new THREE.BoxGeometry(0.34, 1.4, 0.08), mats.goldPlating);
      fg.position.set(3.25 + k * 0.5, 26.4, 1.05);
      fg.userData.noEdges = true;
      g.add(fg);
    }

    // Y-axis Invar-36 / Quartz optical linear encoder scale (rotated 90° so grating lines run vertically)
    const yScaleGeo = createChamferedBoxGeo(20.4, 2.8, 0.56, 0.25, 0.05, 'z');
    applyPlanarUVs(yScaleGeo, 20.4, 2.8, 'xy');
    const yScale = new THREE.Mesh(yScaleGeo, mats.ultra.sensorOpticalScale);
    yScale.rotation.z = Math.PI / 2;
    yScale.position.set(-28.6, 0, 0);

    for (const ey of [-10.2, 10.2]) {
      const clamp = new THREE.Mesh(
        createChamferedBoxGeo(3.4, 1.8, 0.78, 0.2, 0.04, 'z'),
        mats.ultra.sensorSusSpringSteel
      );
      clamp.position.set(-28.6, ey, 0.04);
      const pin = new THREE.Mesh(hiResCyl(0.36, 0.36, 0.92, 10).rotateX(Math.PI / 2), mats.titaniumRivet);
      pin.position.set(-28.6, ey, 0.08);
      pin.userData.noEdges = true;
      g.add(clamp, pin);
    }

    const yRead = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 4.6, 1.45, 0.35, 0.08, 'z'),
      mats.ultra.icEpoxyLaser
    );
    yRead.position.set(-28.6, 3.0, 0.92);
    for (const ly of [2.2, 3.8]) {
      const yLens = new THREE.Mesh(
        hiResCyl(0.55, 0.55, 0.26, 14).rotateX(Math.PI / 2),
        ly < 3 ? mats.irLedLens : mats.evfIrWindowBlack
      );
      yLens.position.set(-28.6, ly, 0.24);
      yLens.userData.noEdges = true;
      g.add(yLens);
    }
    const yTail = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 2.8, 0.22, 0.2, 0.02, 'z'),
      mats.polyimideFpc
    );
    yTail.position.set(-31.8, 3.0, 0.92);
    for (let k = 0; k < 4; k++) {
      const fg = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.34, 0.08), mats.goldPlating);
      fg.position.set(-33.2, 2.25 + k * 0.5, 1.05);
      fg.userData.noEdges = true;
      g.add(fg);
    }

    g.add(xScale, xRead, xTail, yScale, yRead, yTail);

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
    // Outer micro-flocked matte carbon Sumi-nuri light-absorbing glass-edge coating collar
    const sumiGeo = extrudeHiRes(createFrameShape(39.4, 27.4, 0.9, 37.6, 25.6, 0.7), 1.9, 0.16, 0.16, 2, 18);
    applyBoxUVs(sumiGeo, 14.0);
    const sumiRim = new THREE.Mesh(sumiGeo, mats.ultra.sensorVelvetBaffle);
    // 3 concentric micro-ribbed 45-deg stepped stray-light sawtooth trap collars
    const trapSteps: Array<[number, number, number, number, number]> = [
      [38.6, 26.6, 37.4, 25.4, 0.92],
      [38.0, 26.0, 36.9, 24.9, 0.62],
      [37.4, 25.4, 36.4, 24.4, 0.30],
    ];
    for (const [ow, oh, iw, ih, tz] of trapSteps) {
      const stepGeo = extrudeHiRes(createFrameShape(ow, oh, 0.8, iw, ih, 0.6), 0.24, 0.05, 0.05, 1, 14);
      applyBoxUVs(stepGeo, 14.0);
      const step = new THREE.Mesh(stepGeo, mats.ultra.sensorVelvetBaffle);
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
    // Super-hydrophobic fluorine molecular monolayer + bespoke AR optical coating reticle lamina
    const fluorGeo = extrudeHiRes(createRoundedRectShape(39.2, 27.2, 0.9), 0.16, 0.02, 0.02, 1, 16);
    applyPlanarUVs(fluorGeo, 39.2, 27.2, 'xy');
    const fluorinePane = new THREE.Mesh(fluorGeo, mats.ultra.sensorOpticalFilterCoating);
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
      const bridge = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 2.2, 0.14),
        mats.goldPlating
      );
      bridge.position.set(cx - Math.sign(cx) * 0.9, cy - Math.sign(cy) * 0.6, 0.12);
      bridge.rotation.z = Math.sign(cx * cy) * 0.78;
      bridge.userData.noEdges = true;
      g.add(pad, bridge);
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
    // Step 3: Inner 45-deg stepped micro-flocked velvet-black knife-edge anti-flare baffle lip
    const bevelGeo = extrudeHiRes(createFrameShape(38.0, 26.0, 0.7, 36.4, 24.4, 0.5), 0.45, 0.08, 0.08, 2, 16);
    applyBoxUVs(bevelGeo, 14.0);
    const innerBevel = new THREE.Mesh(bevelGeo, mats.ultra.sensorVelvetBaffle);
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
    // Chamfered high-frequency Rogers/FR-4 clock sub-PCB with silkscreen & gold trace pattern
    const subPcbGeo = createChamferedBoxGeo(12.2, 5.8, 0.55, 0.5, 0.05, 'z');
    applyBoxUVs(subPcbGeo, 10.0);
    const subPcb = new THREE.Mesh(subPcbGeo, mats.ultra.sensorHallSubPcb);

    // Authentic 2520/3225 ceramic-base + seam-welded laser-etched gold-lidded 72.000MHz TCXO + 4 castellated pads
    const tcxoCer = new THREE.Mesh(
      createChamferedBoxGeo(4.4, 3.4, 0.52, 0.25, 0.05, 'z'),
      mats.ceramicAlumina
    );
    tcxoCer.position.set(-2.9, 0, -0.52);
    const tcxoLidGeo = createChamferedBoxGeo(4.0, 3.0, 0.58, 0.25, 0.08, 'z');
    applyPlanarUVs(tcxoLidGeo, 4.0, 3.0, 'xy-back');
    const tcxoLid = new THREE.Mesh(tcxoLidGeo, mats.ultra.sensorMemsTcxoLid);
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

    // Length-matched differential copper clock trace pair + gold coaxial TP domes + twin 0402 Vdd decoupling MLCCs
    for (const cy of [-0.55, 0.55]) {
      const tr = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.28, 0.12), mats.copperHeatSpreader);
      tr.position.set(0.0, cy, -0.32);
      tr.userData.noEdges = true;
      const tp = new THREE.Mesh(hiResCyl(0.30, 0.30, 0.14, 10).rotateX(Math.PI / 2), mats.goldPlating);
      tp.position.set(5.3, cy * 2.2, -0.34);
      tp.userData.noEdges = true;
      g.add(tr, tp);
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
    // True machined 90° V-groove hardened SUS440C rails + alternating ±45° crossed Si3N4 rollers + brass cage + end-stop screws!
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
    applyBoxUVs(vRailGeo, 14.0);

    for (const sy of [-1, 1]) {
      const rail = new THREE.Mesh(vRailGeo, mats.ultra.sensorSusSpringSteel);
      rail.position.set(0, sy * 25.2, 0);
      g.add(rail);

      // End-stop stainless socket cap screws preventing brass roller cage creep/overtravel
      for (const ex of [-17.4, 17.4]) {
        const stopScr = createPrecisionScrew(0.75, 0.42, 0.95, mats.stainlessMachined);
        stopScr.position.set(ex, sy * 25.2, 1.02);
        g.add(stopScr);
      }

      // Slotted photo-etched brass roller retainer cage strip cradling alternating ±45° cylindrical Si3N4 rollers
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

      // Wire-EDM notched CuBe2 parallel-flexure leaf beam with flexural hinge waists & end anchor bolts
      const flexCenter = new THREE.Mesh(
        createChamferedBoxGeo(22.0, 1.35, 0.28, 0.2, 0.02, 'z'),
        mats.beCuSpring
      );
      flexCenter.position.set(0, sy * 23.0, -0.55);
      for (const sx of [-13.2, 13.2]) {
        // Narrow elastic hinge neck + mounting boss ear + M1.2 anchor screw
        const neck = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.52, 0.26), mats.beCuSpring);
        neck.position.set(sx * 0.91, sy * 23.0, -0.55);
        const boss = new THREE.Mesh(
          createChamferedBoxGeo(3.2, 2.0, 0.58, 0.4, 0.05, 'z'),
          mats.beCuSpring
        );
        boss.position.set(sx + Math.sign(sx) * 1.4, sy * 23.0, -0.55);
        const fScr = createPrecisionScrew(0.68, 0.30, 0.72, mats.stainlessMachined);
        fScr.position.set(sx + Math.sign(sx) * 1.4, sy * 23.0, -0.20);
        g.add(neck, boss, fScr);
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
    // Dual chamfered white 96% Al2O3 ceramic heat-exchange plates with laser-marked TEC1-FF63 spec & internal bridge shadow!
    const coldGeo = extrudeHiRes(createRoundedRectShape(28.0, 20.0, 1.2), 0.52, 0.05, 0.05, 2, 16);
    applyPlanarUVs(coldGeo, 28.0, 20.0, 'xy');
    const coldPlate = new THREE.Mesh(coldGeo, mats.ultra.sensorPeltierCeramic);
    coldPlate.position.z = 1.25;

    const hotGeo = extrudeHiRes(createRoundedRectShape(28.0, 20.0, 1.2), 0.52, 0.05, 0.05, 2, 16);
    applyPlanarUVs(hotGeo, 28.0, 20.0, 'xy-back');
    const hotPlate = new THREE.Mesh(hotGeo, mats.ultra.sensorPeltierCeramic);
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

    // Translucent perimeter RTV silicone moisture-seal fillet (leaves side-view of Bi2Te3 pellets & Cu bridges clearly visible!)
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

    // Copper vapor-chamber cold-finger heat-rejection bar with skived micro-channels & dual M1.4 mounting ears!
    const coldFinger = new THREE.Mesh(
      createChamferedBoxGeo(10.0, 28.0, 0.78, 1.2, 0.10, 'z'),
      mats.vaporChamberCopper
    );
    coldFinger.position.set(16.0, 0, -1.7);

    // 5 Longitudinal skived micro-channel ribs on rear face (-Z) of cold-finger
    for (let k = -2; k <= 2; k++) {
      const chRib = new THREE.Mesh(
        createChamferedBoxGeo(0.75, 22.0, 0.32, 0.1, 0.03, 'z'),
        mats.copperHeatSpreader
      );
      chRib.position.set(16.0 + k * 1.65, 0, -2.18);
      chRib.userData.noEdges = true;
      g.add(chRib);
    }

    // Dual machined mounting flange ears + counterbored stainless M1.4 clamping screws on cold-finger
    for (const ey of [-12.2, 12.2]) {
      const ear = new THREE.Mesh(
        createChamferedBoxGeo(6.4, 3.6, 0.65, 0.6, 0.06, 'z'),
        mats.copperHeatSpreader
      );
      ear.position.set(16.0, ey, -1.7);
      const sc = createPrecisionScrew(1.05, 0.36, 1.15, mats.stainlessMachined);
      sc.position.set(16.0, ey, -2.08);
      sc.rotation.y = Math.PI;
      g.add(ear, sc);
    }

    // Properly anchored gold ceramic solder tabs + SAC305 fillets + black heat-shrink strain-relief boots + curved silicone DC leads + 2-pin white JST-ZH plug!
    const leadSpecs: Array<{ yTab: number; xPlug: number; mat: THREE.Material }> = [
      { yTab: -1.8, xPlug: -16.6, mat: mats.mountRedIndexDot },
      { yTab: -4.6, xPlug: -18.2, mat: mats.matteBlackAnodized },
    ];
    for (const ls of leadSpecs) {
      // Gold metallized ceramic solder terminal pad anchored directly onto left rim of hot Al2O3 plate
      const solderTab = new THREE.Mesh(
        createChamferedBoxGeo(2.4, 1.5, 0.42, 0.16, 0.04, 'z'),
        mats.goldPlating
      );
      solderTab.position.set(-13.8, ls.yTab, -1.02);

      // Glossy SAC305 solder fillet mound securing conductor to gold tab
      const fillet = new THREE.Mesh(hiResSphere(0.45, 10, 8), mats.solderBallSilver);
      fillet.scale.set(1.3, 0.9, 0.65);
      fillet.position.set(-14.2, ls.yTab, -1.16);
      fillet.userData.noEdges = true;

      // Molded black heat-shrink strain-relief boot emerging from solder tab
      const boot = new THREE.Mesh(
        hiResCyl(0.56, 0.48, 2.0, 12).rotateZ(Math.PI / 2),
        mats.epdmGasket
      );
      boot.position.set(-15.3, ls.yTab, -1.05);
      boot.userData.noEdges = true;

      // Smooth curved silicone-insulated DC lead routing from boot into 2-pin white JST micro-header plug!
      const wireCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-15.8, ls.yTab, -1.05),
        new THREE.Vector3(ls.xPlug, ls.yTab - 0.5, -1.05),
        new THREE.Vector3(ls.xPlug, ls.yTab - 3.6, -1.02),
        new THREE.Vector3(ls.xPlug, -10.8, -1.02),
      ]);
      const wireMesh = new THREE.Mesh(
        markHiRes(new THREE.TubeGeometry(wireCurve, 20, 0.36, 10, false)),
        ls.mat
      );
      wireMesh.userData.noEdges = true;

      g.add(solderTab, fillet, boot, wireMesh);
    }

    // Sculpted 2-pin white JST-ZH micro-header connector plug housing + dual gold crimp sockets
    const jstPlug = new THREE.Mesh(
      createChamferedBoxGeo(4.2, 3.6, 2.1, 0.35, 0.06, 'z'),
      mats.zifIvoryPlastic
    );
    jstPlug.position.set(-17.4, -12.4, -1.02);
    const jstLatch = new THREE.Mesh(
      createChamferedBoxGeo(1.8, 1.4, 0.45, 0.12, 0.03, 'z'),
      mats.zifIvoryPlastic
    );
    jstLatch.position.set(-17.4, -12.2, -2.14);
    jstLatch.userData.noEdges = true;
    for (const px of [-16.6, -18.2]) {
      const crimpPin = new THREE.Mesh(
        createChamferedBoxGeo(0.52, 1.2, 0.52, 0.06, 0.02, 'z'),
        mats.goldPlating
      );
      crimpPin.position.set(px, -13.9, -1.02);
      crimpPin.userData.noEdges = true;
      g.add(crimpPin);
    }

    g.add(coldPlate, hotPlate, pPellets, nPellets, bridges, moistureSeal, antiDewRing, coldFinger, jstPlug, jstLatch);

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
    const padGeo = createChamferedBoxGeo(3.4, 3.4, 0.24, 0.25, 0.04, 'z');
    applyPlanarUVs(padGeo, 3.4, 3.4, 'xy');
    for (const [cx, cy] of corners) {
      // ASML box-in-box textured fiducial island + sculpted 3D gold Vernier crosshair + laser interferometer rings + corner-cube prism!
      const pad = new THREE.Mesh(padGeo, mats.ultra.sensorFiducialTarget);
      pad.position.set(cx, cy, 0);
      const crossH = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.30, 0.34), mats.goldPlating);
      crossH.position.set(cx, cy, 0.08);
      const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.30, 2.6, 0.34), mats.goldPlating);
      crossV.position.set(cx, cy, 0.08);
      const ringOuter = new THREE.Mesh(hiResTorus(1.22, 0.13, 8, 22), mats.silverElectrode);
      ringOuter.position.set(cx, cy, 0.12);
      ringOuter.userData.noEdges = true;
      const ringInner = new THREE.Mesh(hiResTorus(0.62, 0.09, 6, 18), mats.goldPlating);
      ringInner.position.set(cx, cy, 0.15);
      ringInner.userData.noEdges = true;

      // Miniature optical retro-reflector micro-prism dome for 6-axis laser-interferometer pitch/yaw/roll alignment
      const retroPrism = new THREE.Mesh(hiResSphere(0.36, 10, 8), mats.coverGlass);
      retroPrism.position.set(cx, cy, 0.26);
      retroPrism.userData.noEdges = true;

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

      g.add(pad, crossH, crossV, ringOuter, ringInner, retroPrism);
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
    // Stress-isolated emerald mini sub-PCB with routed U-shaped mechanical thermal-strain isolation slots around MEMS!
    const pcbShape = createRoundedRectShape(9.6, 6.4, 0.55);
    // Routed mechanical isolation slots flanking top & bottom of MEMS IMU footprint (-1.6, 0)
    for (const sy of [-2.45, 2.45]) {
      const slot = new THREE.Path();
      slot.moveTo(-3.9, sy - 0.22);
      slot.lineTo(0.4, sy - 0.22);
      slot.lineTo(0.4, sy + 0.22);
      slot.lineTo(-3.9, sy + 0.22);
      slot.closePath();
      pcbShape.holes.push(slot);
    }
    const carrierGeo = extrudeHiRes(pcbShape, 0.55, 0.04, 0.04, 2, 16);
    applyBoxUVs(carrierGeo, 10.0);
    const carrierPcb = new THREE.Mesh(carrierGeo, mats.ultra.sensorHallSubPcb);

    // Metallic-lidded 6-axis LGA MEMS Accelerometer with ceramic base + laser-etched Faraday lid + Pin-1 dot
    const memsBase = new THREE.Mesh(
      createChamferedBoxGeo(3.6, 3.6, 0.48, 0.2, 0.04, 'z'),
      mats.ceramicAlumina
    );
    memsBase.position.set(-1.6, 0, -0.52);
    const memsLidGeo = createChamferedBoxGeo(3.35, 3.35, 0.65, 0.22, 0.08, 'z');
    applyPlanarUVs(memsLidGeo, 3.35, 3.35, 'xy-back');
    const memsLid = new THREE.Mesh(memsLidGeo, mats.ultra.sensorMemsTcxoLid);
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
    const stripGeo = createChamferedBoxGeo(4.6, 25.0, 0.65, 0.4, 0.05, 'z');
    applyBoxUVs(stripGeo, 12.0);
    const chokeWrapGeo = new THREE.BoxGeometry(1.15, 1.62, 0.56);
    applyBoxUVs(chokeWrapGeo, 6.0);

    for (const side of [-1, 1]) {
      const strip = new THREE.Mesh(stripGeo, mats.ultra.sensorHallSubPcb);
      strip.position.set(side * 25.6, 0, 0);
      g.add(strip);

      // Molded LCP B2B micro-header socket shroud framing outer interposer lanes
      const b2bShroud = new THREE.Mesh(
        createChamferedBoxGeo(0.75, 22.8, 0.85, 0.15, 0.04, 'z'),
        mats.matteBlackAnodized
      );
      b2bShroud.position.set(side * 23.6, 0, 0.15);
      b2bShroud.userData.noEdges = true;
      g.add(b2bShroud);

      // 16 discrete ENIG gold differential pair landing fingers along inner interposer edge
      for (let p = 0; p < 16; p++) {
        const py = -10.5 + p * 1.4;
        const pad = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.68, 0.78), mats.goldPlating);
        pad.position.set(side * 24.3, py, 0.06);
        pad.userData.noEdges = true;
        g.add(pad);
      }

      // 8 detailed Murata DLM0Q 0605 Ferrite Common-Mode Choke Coils (ferrite drum + textured bifilar copper windings + 4 silver pads!)
      for (let i = 0; i < 8; i++) {
        const cy = -9.8 + i * 2.8;
        const core = new THREE.Mesh(
          createChamferedBoxGeo(1.75, 1.55, 0.82, 0.16, 0.06, 'z'),
          mats.ferriteInductor
        );
        core.position.set(side * 26.5, cy, -0.52);
        const windingBand = new THREE.Mesh(chokeWrapGeo, mats.ultra.sensorVcmCopperWinding);
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
    // Pressure-sintered porous nano-silver die-attach sheet with bespoke sintered metallic grain & micro-channels
    const nanoGeo = extrudeHiRes(createRoundedRectShape(36.8, 24.8, 0.6), 0.26, 0.03, 0.03, 2, 14);
    applyPlanarUVs(nanoGeo, 36.8, 24.8, 'xy');
    const nanoSilverLayer = new THREE.Mesh(nanoGeo, mats.ultra.sensorCuWAlloySinter);
    nanoSilverLayer.position.z = 0.55;

    // Recessed dark-alumina HTCC ceramic dielectric carrier plate anchoring the 61 copper thermal vias
    const viaCarrierGeo = extrudeHiRes(createRoundedRectShape(37.6, 25.6, 0.7), 0.42, 0.03, 0.03, 1, 14);
    applyPlanarUVs(viaCarrierGeo, 37.6, 25.6, 'xy');
    const viaCarrier = new THREE.Mesh(viaCarrierGeo, mats.ultra.sensorLgaBallGrid);
    viaCarrier.position.z = -0.15;
    viaCarrier.userData.noEdges = true;

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
    g.add(nanoSilverLayer, viaCarrier, vias, rings, baseRing);

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
    const brakeCoilGeo = createChamferedBoxGeo(5.4, 7.8, 2.4, 0.4, 0.1, 'z');
    applyBoxUVs(brakeCoilGeo, 8.0);
    const ironHookGeo = createChamferedBoxGeo(4.6, 3.2, 1.9, 0.4, 0.08, 'z');
    applyBoxUVs(ironHookGeo, 10.0);

    for (const side of [-1, 1]) {
      // Orthocyclically copper-wound emergency brake solenoid coil on dual-flanged LCP bobbin
      const brakeCoil = new THREE.Mesh(brakeCoilGeo, mats.ultra.sensorVcmCopperWinding);
      brakeCoil.position.set(side * 36.2, -12.5, 0);
      for (const fy of [-16.6, -8.4]) {
        const fl = new THREE.Mesh(
          createChamferedBoxGeo(6.0, 0.55, 2.8, 0.2, 0.05, 'z'),
          mats.matteBlackAnodized
        );
        fl.position.set(side * 36.2, fy, 0);
        g.add(fl);
      }
      // Twin gold coil solder terminal pins
      for (const dy of [-1.2, 1.2]) {
        const pin = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 1.4), mats.goldPlating);
        pin.position.set(side * 38.8, -12.5 + dy, -0.6);
        pin.userData.noEdges = true;
        g.add(pin);
      }

      // Pivoted brushed soft-iron armature hook + stainless pivot pin + brushed SUS return leaf spring
      const ironHook = new THREE.Mesh(ironHookGeo, mats.ultra.sensorSoftIronYoke);
      ironHook.position.set(side * 33.4, -12.5, 0.6);
      const pivot = new THREE.Mesh(
        hiResCyl(0.68, 0.68, 2.6, 14).rotateX(Math.PI / 2),
        mats.titaniumRivet
      );
      pivot.position.set(side * 34.8, -12.5, 0.6);
      pivot.userData.noEdges = true;
      const leafSpr = new THREE.Mesh(
        createChamferedBoxGeo(0.28, 6.4, 1.2, 0.08, 0.02, 'z'),
        mats.ultra.sensorSusSpringSteel
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
    // Ultra-low-alpha (<0.001 cph/cm²) synthetic fused silica optical window + subtle AR coating lamina
    const ulaGlass = new THREE.Mesh(
      extrudeHiRes(createRoundedRectShape(38.4, 26.4, 0.7), 0.34, 0.05, 0.05, 2, 16),
      mats.coverGlass
    );
    const ulaCoatGeo = markHiRes(new THREE.PlaneGeometry(37.8, 25.8));
    applyPlanarUVs(ulaCoatGeo, 37.8, 25.8, 'xy');
    const ulaCoat = new THREE.Mesh(ulaCoatGeo, mats.ultra.sensorOpticalFilterCoating);
    ulaCoat.position.z = 0.20;
    ulaCoat.userData.noEdges = true;

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

    // 4 Corner stress-relief bevel notches + stepped titanium micro-alignment clips gripping Al2O3 collar
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
      const tiClip = new THREE.Mesh(
        createChamferedBoxGeo(2.2, 1.1, 0.34, 0.15, 0.03, 'z'),
        mats.titaniumRivet
      );
      tiClip.position.set(nx - Math.sign(nx) * 0.4, ny - Math.sign(ny) * 0.4, 0.46);
      tiClip.rotation.z = Math.atan2(ny, nx);
      tiClip.userData.noEdges = true;
      g.add(notch, tiClip);
    }

    g.add(ulaGlass, ulaCoat, aluminaCollar, goldWet);

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
    // 3-step terraced labyrinth dust-trap & stray-light baffle chamber frame (ultra-matte electrostatic velvet micro-flock!)
    const outerGeo = extrudeHiRes(createFrameShape(49.4, 36.8, 2.6, 39.2, 27.0, 1.0), 1.45, 0.10, 0.10, 2, 22);
    applyBoxUVs(outerGeo, 14.0);
    const outerLabyrinth = new THREE.Mesh(outerGeo, mats.ultra.sensorVelvetBaffle);

    const midGeo = extrudeHiRes(createFrameShape(44.2, 31.8, 1.8, 38.6, 26.4, 0.9), 0.72, 0.06, 0.06, 2, 18);
    applyBoxUVs(midGeo, 14.0);
    const midStep = new THREE.Mesh(midGeo, mats.ultra.sensorVelvetBaffle);
    midStep.position.z = -0.35;

    const innerGeo = extrudeHiRes(createFrameShape(41.4, 29.2, 1.3, 37.8, 25.6, 0.75), 0.56, 0.05, 0.05, 2, 18);
    applyBoxUVs(innerGeo, 14.0);
    const innerStep = new THREE.Mesh(innerGeo, mats.ultra.sensorVelvetBaffle);
    innerStep.position.z = -0.78;
    g.add(outerLabyrinth, midStep, innerStep);

    // 4 corner flanged cinnabar silicone vibration-isolator grommets with machined brass anti-crush flanged sleeves!
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
        hiResCyl(1.18, 1.18, 1.48, 16).rotateX(Math.PI / 2),
        mats.brassGear
      );
      innerSleeve.position.set(gx, gy, -0.4);
      const sleeveFlange = new THREE.Mesh(hiResTorus(1.38, 0.16, 6, 16), mats.brassGear);
      sleeveFlange.position.set(gx, gy, 0.34);
      sleeveFlange.userData.noEdges = true;
      const sleeveBore = new THREE.Mesh(
        hiResCyl(0.72, 0.72, 1.54, 12).rotateX(Math.PI / 2),
        mats.matteBlackAnodized
      );
      sleeveBore.position.set(gx, gy, -0.4);
      sleeveBore.userData.noEdges = true;
      g.add(grommetFront, grommetRear, innerSleeve, sleeveFlange, sleeveBore);
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
