import * as THREE from 'three';
import { smoothCreaseNormals } from './FastCadGeometry';
import { GPU_PROFILE } from './GpuOptimizer';
import {
  getActiveGeometryScale,
  scaleBevelSegmentsForQuality,
  scaleCurveSegmentsForQuality,
  scaleRadialSegmentsForQuality,
} from '../core/geometry_quality';

/**
 * Mark a BufferGeometry to preserve its full watchmaker tessellation during GpuMegaBatch compilation.
 */
export function markHiRes<T extends THREE.BufferGeometry>(geo: T): T {
  geo.userData.__preserveHiRes = true;
  return geo;
}

/**
 * High-resolution CNC-chamfered extrusion centered on Z ([-depth/2, +depth/2]).
 * Unlike the low-poly macro `extrudeCentered`, this keeps silky rounded fillets and true multi-step
 * specular-catching chamfers for the standalone macro-inspection subsystems.
 */
export function extrudeHiRes(
  shape: THREE.Shape,
  depth: number,
  bevelSize = 0.14,
  bevelThickness = 0.14,
  bevelSegments = 2,
  curveSegments = 24
): THREE.ExtrudeGeometry {
  const qScale = getActiveGeometryScale();
  const effCurve = qScale
    ? scaleCurveSegmentsForQuality(curveSegments, 4)
    : GPU_PROFILE.isMobile
      ? Math.max(8, Math.round(curveSegments * 0.5))
      : curveSegments;
  const effBevelSegs =
    bevelSize > 0.005 && bevelThickness > 0.005
      ? qScale
        ? scaleBevelSegmentsForQuality(bevelSegments)
        : GPU_PROFILE.isMobile
          ? Math.max(1, bevelSegments - 1)
          : bevelSegments
      : 0;
  const hasBevel = effBevelSegs > 0;
  const bodyDepth = hasBevel ? Math.max(0.02, depth - bevelThickness * 2) : depth;

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: bodyDepth,
    bevelEnabled: hasBevel,
    bevelSegments: effBevelSegs,
    steps: 1,
    bevelSize,
    bevelThickness,
    curveSegments: effCurve,
  });
  geo.translate(0, 0, -bodyDepth * 0.5);
  smoothCreaseNormals(geo, 36);
  return markHiRes(geo);
}

/**
 * High-resolution horizontal extruded plate (thickness along Y).
 */
export function makeHiResHorizPlate(
  shape: THREE.Shape,
  thickness: number,
  mat: THREE.Material,
  bevel = 0.12,
  bevelSegs = 2,
  curveSegs = 24
): THREE.Mesh {
  const geo = extrudeHiRes(shape, thickness, bevel, bevel, bevelSegs, curveSegs);
  geo.rotateX(-Math.PI / 2);
  return new THREE.Mesh(geo, mat);
}

/**
 * Apply exact normalized [0, 1] x [0, 1] planar UVs onto any geometry so high-DPI procedural
 * CanvasTextures (labels, silkscreens, laser markings, die floorplans) align edge-to-edge cleanly.
 *
 * Axes:
 *  - 'xy':  Front (+Z) facing upright: u = (x / width + 0.5), v = (y / height + 0.5)
 *  - 'xy-back': Rear (-Z) facing upright: u = (-x / width + 0.5), v = (y / height + 0.5)
 *  - 'xz':  Top (+Y) facing upright (-Z = top of art, +Z = bottom): u = (x / width + 0.5), v = (-z / height + 0.5)
 *  - 'xz-bottom': Bottom (-Y) facing upright: u = (x / width + 0.5), v = (z / height + 0.5)
 */
export function applyPlanarUVs(
  geo: THREE.BufferGeometry,
  width: number,
  height: number,
  axis: 'xy' | 'xy-back' | 'xz' | 'xz-bottom' = 'xy',
  centerX = 0,
  centerY = 0
): THREE.BufferGeometry {
  const pos = geo.getAttribute('position');
  if (!pos) return geo;
  const count = pos.count;
  const uvs = new Float32Array(count * 2);
  const invW = 1 / Math.max(1e-5, width);
  const invH = 1 / Math.max(1e-5, height);

  for (let i = 0; i < count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    let u = 0.5;
    let v = 0.5;
    if (axis === 'xy') {
      u = (x - centerX) * invW + 0.5;
      v = (y - centerY) * invH + 0.5;
    } else if (axis === 'xy-back') {
      u = -(x - centerX) * invW + 0.5;
      v = (y - centerY) * invH + 0.5;
    } else if (axis === 'xz') {
      u = (x - centerX) * invW + 0.5;
      v = -(z - centerY) * invH + 0.5;
    } else {
      u = (x - centerX) * invW + 0.5;
      v = (z - centerY) * invH + 0.5;
    }
    uvs[i * 2] = Math.max(0.001, Math.min(0.999, u));
    uvs[i * 2 + 1] = Math.max(0.001, Math.min(0.999, v));
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  return geo;
}

/**
 * Apply seamless triplanar box UVs based on vertex normal dominant axis so extruded 3D housings
 * (battery shells, CFexpress frames, mic top decks) never show stretched stripe artifacts on side walls!
 */
export function applyBoxUVs(
  geo: THREE.BufferGeometry,
  tileWorldSize = 18.0
): THREE.BufferGeometry {
  if (!geo.getAttribute('normal')) {
    geo.computeVertexNormals();
  }
  const pos = geo.getAttribute('position');
  const norm = geo.getAttribute('normal');
  if (!pos || !norm) return geo;
  const count = pos.count;
  const uvs = new Float32Array(count * 2);
  const inv = 1 / Math.max(1e-4, tileWorldSize);

  const projectVertex = (i: number, axis: 0 | 1 | 2) => {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (axis === 2) {
      uvs[i * 2] = x * inv;
      uvs[i * 2 + 1] = y * inv;
    } else if (axis === 0) {
      uvs[i * 2] = z * inv;
      uvs[i * 2 + 1] = y * inv;
    } else {
      uvs[i * 2] = x * inv;
      uvs[i * 2 + 1] = z * inv;
    }
  };

  if (!geo.index && count % 3 === 0) {
    // Non-indexed triangle soup (ExtrudeGeometry, chamfered shells): choose ONE consistent
    // dominant projection axis per triangle face normal so curved bevels have ZERO UV seam jumps!
    for (let i = 0; i < count; i += 3) {
      const ax0 = pos.getX(i), ay0 = pos.getY(i), az0 = pos.getZ(i);
      const e1x = pos.getX(i + 1) - ax0, e1y = pos.getY(i + 1) - ay0, e1z = pos.getZ(i + 1) - az0;
      const e2x = pos.getX(i + 2) - ax0, e2y = pos.getY(i + 2) - ay0, e2z = pos.getZ(i + 2) - az0;
      const nx = Math.abs(e1y * e2z - e1z * e2y);
      const ny = Math.abs(e1z * e2x - e1x * e2z);
      const nz = Math.abs(e1x * e2y - e1y * e2x);
      const axis: 0 | 1 | 2 = nz >= nx && nz >= ny ? 2 : nx >= ny && nx >= nz ? 0 : 1;
      projectVertex(i, axis);
      projectVertex(i + 1, axis);
      projectVertex(i + 2, axis);
    }
  } else {
    for (let i = 0; i < count; i++) {
      const ax = Math.abs(norm.getX(i));
      const ay = Math.abs(norm.getY(i));
      const az = Math.abs(norm.getZ(i));
      const axis: 0 | 1 | 2 = az >= ax && az >= ay ? 2 : ax >= ay && ax >= az ? 0 : 1;
      projectVertex(i, axis);
    }
  }

  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  return geo;
}

/**
 * Create a high-resolution preserved CylinderGeometry.
 */
export function hiResCyl(
  rTop: number,
  rBot: number,
  height: number,
  radialSegments = 28,
  openEnded = false,
  thetaStart = 0,
  thetaLength = Math.PI * 2
): THREE.CylinderGeometry {
  const qScale = getActiveGeometryScale();
  const segs = qScale
    ? scaleRadialSegmentsForQuality(radialSegments, 6)
    : GPU_PROFILE.isMobile
      ? Math.max(8, Math.round(radialSegments * 0.5))
      : radialSegments;
  return markHiRes(new THREE.CylinderGeometry(rTop, rBot, height, segs, 1, openEnded, thetaStart, thetaLength));
}

/**
 * Create a high-resolution preserved SphereGeometry (never downgraded to octahedron!).
 */
export function hiResSphere(
  radius: number,
  wSegs = 16,
  hSegs = 12,
  phiStart = 0,
  phiLen = Math.PI * 2,
  thetaStart = 0,
  thetaLen = Math.PI
): THREE.SphereGeometry {
  const qScale = getActiveGeometryScale();
  const ew = qScale
    ? scaleRadialSegmentsForQuality(wSegs, 6)
    : GPU_PROFILE.isMobile
      ? Math.max(6, Math.round(wSegs * 0.5))
      : wSegs;
  const eh = qScale
    ? scaleRadialSegmentsForQuality(hSegs, 5)
    : GPU_PROFILE.isMobile
      ? Math.max(5, Math.round(hSegs * 0.5))
      : hSegs;
  return markHiRes(new THREE.SphereGeometry(radius, ew, eh, phiStart, phiLen, thetaStart, thetaLen));
}

/**
 * Create a high-resolution preserved TorusGeometry.
 */
export function hiResTorus(
  radius: number,
  tube: number,
  radSegs = 12,
  tubSegs = 32,
  arc = Math.PI * 2
): THREE.TorusGeometry {
  const qScale = getActiveGeometryScale();
  const er = qScale
    ? scaleRadialSegmentsForQuality(radSegs, 5)
    : GPU_PROFILE.isMobile
      ? Math.max(5, Math.round(radSegs * 0.52))
      : radSegs;
  const et = qScale
    ? scaleRadialSegmentsForQuality(tubSegs, 8)
    : GPU_PROFILE.isMobile
      ? Math.max(10, Math.round(tubSegs * 0.5))
      : tubSegs;
  return markHiRes(new THREE.TorusGeometry(radius, tube, er, et, arc));
}

/**
 * Create a chamfered rectangular 3D block (box with precision molded/machined bevels) along Y or Z.
 */
export function createChamferedBoxGeo(
  w: number,
  h: number,
  d: number,
  cornerR = 0.12,
  bevel = 0.08,
  axis: 'y' | 'z' = 'y'
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const rw = axis === 'y' ? w : w;
  const rh = axis === 'y' ? d : h;
  const thick = axis === 'y' ? h : d;
  const hw = rw * 0.5;
  const hh = rh * 0.5;
  const r = Math.min(cornerR, hw * 0.45, hh * 0.45);
  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.absarc(hw - r, -hh + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(hw, hh - r);
  shape.absarc(hw - r, hh - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-hw + r, hh);
  shape.absarc(-hw + r, hh - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-hw, -hh + r);
  shape.absarc(-hw + r, -hh + r, r, Math.PI, Math.PI * 1.5, false);
  const effBevel = Math.min(bevel, thick * 0.35, rw * 0.15, rh * 0.15);
  const geo = extrudeHiRes(shape, thick, effBevel, effBevel, 2, 12);
  if (axis === 'y') {
    geo.rotateX(-Math.PI / 2);
    applyPlanarUVs(geo, rw, rh, 'xz');
  } else {
    applyPlanarUVs(geo, rw, rh, 'xy');
  }
  return geo;
}

/**
 * Build an ultra-realistic SMD IC package (QFN, SOIC, TSSOP, SOT-23, DFN, or BGA)
 * with chamfered epoxy molding body, Pin-1 laser alignment dimple, metallic leadframe pins or
 * curved gull-wing legs with solder fillets, and optional top laser-marked die/plate.
 *
 * Orientation:
 *  - 'y': sits flat on XZ plane, top face points +Y (used in BIONZ, Mic, Battery BMS)
 *  - 'z': sits flat on XY plane, top face points +Z (used in CFexpress upright card)
 */
export interface ChipPackageOptions {
  w: number;
  d: number;
  h: number;
  style: 'qfn' | 'soic' | 'sot23' | 'bga' | 'dfn';
  pinsPerSide?: number;
  bodyMat: THREE.Material;
  leadMat: THREE.Material;
  topAccentMat?: THREE.Material;
  pin1Mat?: THREE.Material;
  substrateMat?: THREE.Material;
  axis?: 'y' | 'z';
}

export function buildChipPackage(opts: ChipPackageOptions): THREE.Group {
  const {
    w,
    d,
    h,
    style,
    pinsPerSide = style === 'sot23' ? 3 : style === 'dfn' ? 4 : 6,
    bodyMat,
    leadMat,
    topAccentMat,
    pin1Mat,
    substrateMat,
    axis = 'y',
  } = opts;

  const root = new THREE.Group();
  const g = new THREE.Group();

  // Molded chamfered epoxy package body (built in Y-up local coordinates, rotated to Z if requested)
  const bodyH = style === 'bga' ? h * 0.72 : h;
  const bodyGeo = createChamferedBoxGeo(w, bodyH, d, Math.min(w, d) * 0.08, Math.min(bodyH * 0.22, 0.12), 'y');
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = style === 'bga' ? h * 0.14 : 0;
  g.add(body);

  // Optional ABF/BT substrate beneath BGA packages
  if (style === 'bga' && substrateMat) {
    const subGeo = createChamferedBoxGeo(w * 1.05, h * 0.28, d * 1.05, Math.min(w, d) * 0.06, 0.04, 'y');
    const sub = new THREE.Mesh(subGeo, substrateMat);
    sub.position.y = -h * 0.36;
    g.add(sub);
  }

  // Optional recessed laser-marked top plate or silicon die inlay
  if (topAccentMat) {
    const topPlate = new THREE.Mesh(
      markHiRes(new THREE.PlaneGeometry(w * 0.88, d * 0.88)),
      topAccentMat
    );
    topPlate.rotation.x = -Math.PI / 2;
    topPlate.position.y = body.position.y + bodyH * 0.5 + 0.025;
    topPlate.userData.noEdges = true;
    g.add(topPlate);
  }

  // Pin-1 laser-etched index dimple on top corner + opposite mold ejector pin recess ring
  const pin1R = Math.max(0.14, Math.min(w, d) * 0.062);
  const pin1 = new THREE.Mesh(hiResCyl(pin1R, pin1R, 0.05, 14), pin1Mat ?? leadMat);
  pin1.position.set(-w * 0.33, body.position.y + bodyH * 0.5 + 0.018, -d * 0.33);
  pin1.userData.noEdges = true;
  g.add(pin1);

  if (Math.min(w, d) >= 3.0) {
    const ejR = Math.max(0.16, Math.min(w, d) * 0.075);
    const ejector = new THREE.Mesh(
      hiResTorus(ejR, ejR * 0.16, 6, 16).rotateX(Math.PI / 2),
      bodyMat
    );
    ejector.position.set(w * 0.31, body.position.y + bodyH * 0.5 + 0.015, d * 0.31);
    ejector.userData.noEdges = true;
    g.add(ejector);
  }

  // Leads / pins according to package style
  if (style === 'qfn') {
    const padW = Math.min(0.32, (w * 0.68) / Math.max(2, pinsPerSide * 1.8));
    const padH = Math.min(0.28, h * 0.34);
    const padD = Math.min(0.35, Math.min(w, d) * 0.11);
    const spanX = w * 0.7;
    const spanZ = d * 0.7;
    const stepX = pinsPerSide > 1 ? spanX / (pinsPerSide - 1) : 0;
    const stepZ = pinsPerSide > 1 ? spanZ / (pinsPerSide - 1) : 0;

    for (let i = 0; i < pinsPerSide; i++) {
      const px = pinsPerSide > 1 ? -spanX * 0.5 + i * stepX : 0;
      const pz = pinsPerSide > 1 ? -spanZ * 0.5 + i * stepZ : 0;
      for (const s of [-1, 1]) {
        const p1 = new THREE.Mesh(new THREE.BoxGeometry(padW, padH, padD), leadMat);
        p1.position.set(px, -h * 0.34, s * (d * 0.5 + padD * 0.18));
        p1.userData.noEdges = true;
        g.add(p1);

        const p2 = new THREE.Mesh(new THREE.BoxGeometry(padD, padH, padW), leadMat);
        p2.position.set(s * (w * 0.5 + padD * 0.18), -h * 0.34, pz);
        p2.userData.noEdges = true;
        g.add(p2);
      }
    }
  } else if (style === 'soic' || style === 'dfn') {
    const spanX = w * 0.72;
    const stepX = pinsPerSide > 1 ? spanX / (pinsPerSide - 1) : 0;
    const legW = Math.min(0.32, (w * 0.6) / Math.max(2, pinsPerSide * 1.7));
    const legOut = style === 'soic' ? Math.min(0.55, d * 0.22) : Math.min(0.24, d * 0.08);
    for (let i = 0; i < pinsPerSide; i++) {
      const px = pinsPerSide > 1 ? -spanX * 0.5 + i * stepX : 0;
      for (const s of [-1, 1]) {
        if (style === 'soic') {
          // Gull-wing upper shoulder + angled leg + solder foot
          const foot = new THREE.Mesh(new THREE.BoxGeometry(legW, h * 0.18, legOut), leadMat);
          foot.position.set(px, -h * 0.42, s * (d * 0.5 + legOut * 0.48));
          foot.userData.noEdges = true;
          const knee = new THREE.Mesh(new THREE.BoxGeometry(legW, h * 0.44, legOut * 0.36), leadMat);
          knee.position.set(px, -h * 0.18, s * (d * 0.5 + legOut * 0.14));
          knee.rotation.x = s * 0.28;
          knee.userData.noEdges = true;
          g.add(foot, knee);
        } else {
          const tab = new THREE.Mesh(new THREE.BoxGeometry(legW, h * 0.34, legOut), leadMat);
          tab.position.set(px, -h * 0.34, s * (d * 0.5 + legOut * 0.22));
          tab.userData.noEdges = true;
          g.add(tab);
        }
      }
    }
  } else if (style === 'sot23') {
    // Authentic 3-pin SOT-23 (2 pins on -Z side, 1 center pin on +Z side)
    const legW = w * 0.18;
    const legOut = d * 0.32;
    for (const px of [-w * 0.28, w * 0.28]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(legW, h * 0.24, legOut), leadMat);
      leg.position.set(px, -h * 0.38, -d * 0.5 - legOut * 0.35);
      leg.userData.noEdges = true;
      g.add(leg);
    }
    const legC = new THREE.Mesh(new THREE.BoxGeometry(legW, h * 0.24, legOut), leadMat);
    legC.position.set(0, -h * 0.38, d * 0.5 + legOut * 0.35);
    legC.userData.noEdges = true;
    g.add(legC);
  }

  if (axis === 'z') {
    g.rotation.x = Math.PI / 2;
  }
  root.add(g);
  return root;
}

/**
 * Build an ultra-realistic SMD passive component (MLCC ceramic capacitor, chip resistor,
 * ferrite bead, or shunt resistor) with chamfered ceramic/alloy body and wrapped metallic Ni-Sn end-caps.
 */
export function buildSmdPassive(
  length: number,
  width: number,
  height: number,
  bodyMat: THREE.Material,
  termMat: THREE.Material,
  axis: 'y' | 'z' = 'y',
  stripeMat?: THREE.Material
): THREE.Group {
  const root = new THREE.Group();
  const g = new THREE.Group();

  const capLen = Math.min(length * 0.24, width * 0.55);
  const bodyLen = Math.max(0.1, length - capLen * 1.45);
  const body = new THREE.Mesh(
    createChamferedBoxGeo(bodyLen, height * 0.94, width * 0.94, width * 0.08, Math.min(height * 0.15, 0.06), 'y'),
    bodyMat
  );
  body.userData.noEdges = true;
  g.add(body);

  for (const s of [-1, 1]) {
    const cap = new THREE.Mesh(
      createChamferedBoxGeo(capLen, height, width, width * 0.12, Math.min(height * 0.18, 0.08), 'y'),
      termMat
    );
    cap.position.x = s * (length * 0.5 - capLen * 0.5);
    cap.userData.noEdges = true;
    g.add(cap);
  }

  if (stripeMat) {
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(bodyLen * 0.26, 0.06, width * 0.88),
      stripeMat
    );
    stripe.position.set(bodyLen * 0.22, height * 0.48, 0);
    stripe.userData.noEdges = true;
    g.add(stripe);
  }

  if (axis === 'z') {
    g.rotation.x = Math.PI / 2;
  }
  root.add(g);
  return root;
}

/**
 * Build an authentic molded metal-composite shielded SMD power inductor (e.g. 2R2 / 1R0)
 * with rounded ferrite alloy housing, recessed chamfered top face, and side wrap-around tinned terminals.
 */
export function buildShieldedInductor(
  size: number,
  height: number,
  coreMat: THREE.Material,
  termMat: THREE.Material,
  markMat: THREE.Material,
  axis: 'y' | 'z' = 'y'
): THREE.Group {
  const root = new THREE.Group();
  const g = new THREE.Group();

  const body = new THREE.Mesh(
    createChamferedBoxGeo(size, height, size, size * 0.16, Math.min(height * 0.22, 0.14), 'y'),
    coreMat
  );
  g.add(body);

  // Side wrap-around solderable terminals
  for (const s of [-1, 1]) {
    const term = new THREE.Mesh(
      new THREE.BoxGeometry(size * 0.14, height * 0.58, size * 0.58),
      termMat
    );
    term.position.set(s * (size * 0.46), -height * 0.18, 0);
    term.userData.noEdges = true;
    g.add(term);
  }

  // Subtle metallic laser marking bar on top
  const bar1 = new THREE.Mesh(new THREE.BoxGeometry(size * 0.46, 0.04, size * 0.14), markMat);
  bar1.position.set(0, height * 0.5 + 0.015, -size * 0.12);
  bar1.userData.noEdges = true;
  const bar2 = new THREE.Mesh(new THREE.BoxGeometry(size * 0.32, 0.04, size * 0.1), markMat);
  bar2.position.set(0, height * 0.5 + 0.015, size * 0.12);
  bar2.userData.noEdges = true;
  g.add(bar1, bar2);

  if (axis === 'z') g.rotation.x = Math.PI / 2;
  root.add(g);
  return root;
}

/**
 * Build an authentic molded yellow/amber tantalum or polymer PLP capacitor
 * with trapezoidal chamfered resin housing, anode polarity bar, and folded J-lead silver terminals.
 */
export function buildTantalumCap(
  length: number,
  width: number,
  height: number,
  bodyMat: THREE.Material,
  polarityMat: THREE.Material,
  leadMat: THREE.Material,
  axis: 'y' | 'z' = 'z'
): THREE.Group {
  const root = new THREE.Group();
  const g = new THREE.Group();

  // Chamfered main molded resin body
  const body = new THREE.Mesh(
    createChamferedBoxGeo(length * 0.92, height, width, width * 0.12, Math.min(height * 0.24, 0.14), 'y'),
    bodyMat
  );
  g.add(body);

  // Bold anode (+) polarity bar & chamfer notch at +X end
  const polBar = new THREE.Mesh(
    new THREE.BoxGeometry(length * 0.18, height * 0.12, width * 0.94),
    polarityMat
  );
  polBar.position.set(length * 0.30, height * 0.5 + 0.01, 0);
  polBar.userData.noEdges = true;
  g.add(polBar);

  // Folded silver J-lead terminals wrapping both ends
  for (const s of [-1, 1]) {
    const endLead = new THREE.Mesh(
      new THREE.BoxGeometry(length * 0.11, height * 0.62, width * 0.66),
      leadMat
    );
    endLead.position.set(s * (length * 0.46), -height * 0.18, 0);
    endLead.userData.noEdges = true;
    g.add(endLead);
  }

  if (axis === 'z') g.rotation.x = Math.PI / 2;
  root.add(g);
  return root;
}

/**
 * Build a true multi-turn Archimedean spiral cylindrical jelly-roll sheet (with real thickness,
 * top/bottom caps, smooth outward/inward normals, and clean UVs) for 18500 battery cell cutaways!
 */
export function buildSpiralJellyRollGeometry(
  rStart: number,
  rEnd: number,
  turns: number,
  height: number,
  wallThick = 0.16,
  thetaOffset = 0,
  cutoutFraction = 0.34
): THREE.BufferGeometry {
  const stepsPerTurn = GPU_PROFILE.isMobile ? 22 : 34;
  const effectiveTurns = Math.max(0.5, turns - cutoutFraction);
  const totalSteps = Math.max(18, Math.round(effectiveTurns * stepsPerTurn));
  const halfH = height * 0.5;
  const halfT = wallThick * 0.5;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const pushQuad = (
    p0: [number, number, number],
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number],
    n0: [number, number, number],
    n1: [number, number, number],
    u0: number,
    u1: number
  ) => {
    const base = positions.length / 3;
    positions.push(...p0, ...p1, ...p2, ...p3);
    normals.push(...n0, ...n1, ...n1, ...n0);
    uvs.push(u0, 0, u1, 0, u1, 1, u0, 1);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };

  for (let i = 0; i < totalSteps; i++) {
    const f0 = i / totalSteps;
    const f1 = (i + 1) / totalSteps;
    const a0 = thetaOffset + f0 * effectiveTurns * Math.PI * 2;
    const a1 = thetaOffset + f1 * effectiveTurns * Math.PI * 2;
    const r0 = rStart + (rEnd - rStart) * f0;
    const r1 = rStart + (rEnd - rStart) * f1;

    const c0 = Math.cos(a0), s0 = Math.sin(a0);
    const c1 = Math.cos(a1), s1 = Math.sin(a1);

    const o0x = c0 * (r0 + halfT), o0z = s0 * (r0 + halfT);
    const o1x = c1 * (r1 + halfT), o1z = s1 * (r1 + halfT);
    const i0x = c0 * (r0 - halfT), i0z = s0 * (r0 - halfT);
    const i1x = c1 * (r1 - halfT), i1z = s1 * (r1 - halfT);

    // Outer spiral surface
    pushQuad(
      [o0x, -halfH, o0z],
      [o1x, -halfH, o1z],
      [o1x, halfH, o1z],
      [o0x, halfH, o0z],
      [c0, 0, s0],
      [c1, 0, s1],
      f0 * turns,
      f1 * turns
    );
    // Inner spiral surface
    pushQuad(
      [i1x, -halfH, i1z],
      [i0x, -halfH, i0z],
      [i0x, halfH, i0z],
      [i1x, halfH, i1z],
      [-c1, 0, -s1],
      [-c0, 0, -s0],
      f1 * turns,
      f0 * turns
    );
    // Top ribbon edge (gives crisp concentric spiral rings when seen from above!)
    pushQuad(
      [i0x, halfH, i0z],
      [o0x, halfH, o0z],
      [o1x, halfH, o1z],
      [i1x, halfH, i1z],
      [0, 1, 0],
      [0, 1, 0],
      f0,
      f1
    );
    // Bottom ribbon edge
    pushQuad(
      [o0x, -halfH, o0z],
      [i0x, -halfH, i0z],
      [i1x, -halfH, i1z],
      [o1x, -halfH, o1z],
      [0, -1, 0],
      [0, -1, 0],
      f0,
      f1
    );
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return markHiRes(geo);
}

/**
 * Build a precision Lathe-turned 18500 cylindrical steel battery can with authentic
 * rolled-in upper necking bead groove, rounded base fillet, and double-rolled top crimp rim.
 */
export function buildCrimpedSteelCanGeometry(
  radius: number,
  height: number,
  phiStart = 0,
  phiLength = Math.PI * 2,
  radialSegments = 40
): THREE.LatheGeometry {
  const halfH = height * 0.5;
  const grooveY = halfH - 4.0;
  const pts: THREE.Vector2[] = [
    new THREE.Vector2(0.01, -halfH),
    new THREE.Vector2(radius - 0.85, -halfH),
    new THREE.Vector2(radius - 0.25, -halfH + 0.18),
    new THREE.Vector2(radius, -halfH + 0.72),
    new THREE.Vector2(radius, grooveY - 0.9),
    // Authentic rolled-in upper waist necking bead groove
    new THREE.Vector2(radius - 0.52, grooveY - 0.22),
    new THREE.Vector2(radius - 0.56, grooveY + 0.18),
    new THREE.Vector2(radius, grooveY + 0.85),
    new THREE.Vector2(radius, halfH - 0.65),
    // Top double-rolled hermetic crimp lip
    new THREE.Vector2(radius - 0.35, halfH),
    new THREE.Vector2(radius - 1.15, halfH - 0.08),
    new THREE.Vector2(radius - 1.35, halfH - 0.52),
  ];
  const segs = GPU_PROFILE.isMobile ? Math.max(18, Math.round(radialSegments * 0.6)) : radialSegments;
  const geo = new THREE.LatheGeometry(pts, segs, phiStart, phiLength);
  geo.computeVertexNormals();
  return markHiRes(geo);
}

/**
 * Build a realistic Phillips precision screw (e.g. Sony OEM BTITE 1.4x5.0 mm)
 * aligned along Y (head at -Y or +Y, threaded shank extending along +Y).
 */
export function buildPhillipsScrew(
  headR: number,
  headH: number,
  shankR: number,
  shankL: number,
  headMat: THREE.Material,
  slotMat: THREE.Material,
  threadMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();

  // Domed pan head turned via LatheGeometry
  const headPts: THREE.Vector2[] = [
    new THREE.Vector2(shankR, 0),
    new THREE.Vector2(headR * 1.04, 0),
    new THREE.Vector2(headR * 1.04, -headH * 0.22),
    new THREE.Vector2(headR * 0.96, -headH * 0.65),
    new THREE.Vector2(headR * 0.72, -headH * 0.94),
    new THREE.Vector2(0.02, -headH),
  ];
  const headGeo = markHiRes(new THREE.LatheGeometry(headPts, 24));
  headGeo.computeVertexNormals();
  const head = new THREE.Mesh(headGeo, headMat);
  g.add(head);

  // Recessed Phillips #0 cross drive slot on underside of head (-Y)
  for (const rotY of [0, Math.PI / 2]) {
    const slot = new THREE.Mesh(new THREE.BoxGeometry(headR * 1.15, headH * 0.28, headR * 0.26), slotMat);
    slot.position.y = -headH * 0.92;
    slot.rotation.y = rotY;
    slot.userData.noEdges = true;
    g.add(slot);
  }

  // Tapered self-tapping shank
  const shank = new THREE.Mesh(hiResCyl(shankR * 0.84, shankR, shankL, 18), headMat);
  shank.position.y = shankL * 0.5;
  g.add(shank);

  // Continuous helical thread ridge spiraling up the shank
  const turns = Math.max(6, Math.round(shankL * 1.1));
  const steps = turns * 10;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = t * turns * Math.PI * 2;
    const y = 0.55 + t * (shankL - 1.1);
    const r = shankR * (1.03 - t * 0.14);
    pts.push(new THREE.Vector3(Math.cos(ang) * r, y, Math.sin(ang) * r));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const threadGeo = markHiRes(new THREE.TubeGeometry(curve, Math.min(steps, 72), shankR * 0.16, 5, false));
  const threadMesh = new THREE.Mesh(threadGeo, threadMat);
  threadMesh.userData.noEdges = true;
  g.add(threadMesh);

  return g;
}

/**
 * Build a realistic ball-to-stitch semiconductor gold wirebond loop
 * (gold ball-bond pedestal on die -> crisp NEC reverse kink -> graceful arc -> wedge stitch pad).
 */
export function buildGoldWirebondLoop(
  start: THREE.Vector3,
  end: THREE.Vector3,
  apexHeight: number,
  radius: number,
  mat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();

  // Ball-bond bump at die pad
  const ball = new THREE.Mesh(hiResSphere(radius * 2.0, 8, 6), mat);
  ball.position.copy(start);
  ball.userData.noEdges = true;
  g.add(ball);

  // Realistic semiconductor wirebond trajectory (vertical rise -> sharp kink -> sweeping descent)
  const rise = new THREE.Vector3(
    THREE.MathUtils.lerp(start.x, end.x, 0.08),
    start.y + apexHeight,
    THREE.MathUtils.lerp(start.z, end.z, 0.08)
  );
  const crown = new THREE.Vector3(
    THREE.MathUtils.lerp(start.x, end.x, 0.36),
    Math.max(start.y, end.y) + apexHeight * 0.96,
    THREE.MathUtils.lerp(start.z, end.z, 0.36)
  );
  const shoulder = new THREE.Vector3(
    THREE.MathUtils.lerp(start.x, end.x, 0.78),
    THREE.MathUtils.lerp(Math.max(start.y, end.y) + apexHeight * 0.45, end.y + apexHeight * 0.25, 0.5),
    THREE.MathUtils.lerp(start.z, end.z, 0.78)
  );
  const curve = new THREE.CatmullRomCurve3([start, rise, crown, shoulder, end]);
  const tube = new THREE.Mesh(markHiRes(new THREE.TubeGeometry(curve, 14, radius, 6, false)), mat);
  tube.userData.noEdges = true;
  g.add(tube);

  // Wedge stitch foot at substrate finger
  const stitch = new THREE.Mesh(hiResCyl(radius * 1.8, radius * 2.1, radius * 1.1, 8), mat);
  stitch.position.copy(end);
  stitch.userData.noEdges = true;
  g.add(stitch);

  return g;
}

/**
 * Build realistic twin resistance spot-weld fusion dimples (outer heat-affected halo + shiny nugget core).
 */
export function buildSpotWeldNuggets(
  positions: Array<[number, number, number]>,
  radius: number,
  axis: 'x' | 'y' | 'z',
  haloMat: THREE.Material,
  coreMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  for (const [x, y, z] of positions) {
    const halo = new THREE.Mesh(hiResCyl(radius * 1.35, radius * 1.35, 0.08, 14), haloMat);
    const core = new THREE.Mesh(hiResCyl(radius * 0.72, radius * 0.55, 0.14, 12), coreMat);
    if (axis === 'z') {
      halo.rotation.x = Math.PI / 2;
      core.rotation.x = Math.PI / 2;
    } else if (axis === 'x') {
      halo.rotation.z = Math.PI / 2;
      core.rotation.z = Math.PI / 2;
    }
    halo.position.set(x, y, z);
    core.position.set(x, y, z);
    halo.userData.noEdges = true;
    core.userData.noEdges = true;
    g.add(halo, core);
  }
  return g;
}
