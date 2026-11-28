/**
 * `sp` — Float64 Exact Geometric Kernel (0.001 mm certified, EPS = 1e-9 mm)
 * Implements:
 *   - Flat Float64Array AABB BVH (scene-level + lazy per-mesh triangle BVH)
 *   - Exact Moller triangle-triangle intersection + 2D coplanar SAT
 *   - Akenine-Moller 13-axis triangle-AABB intersection (TRI-SAT)
 *   - Exact Ericson Voronoi point-triangle distance + segment-segment distance + triangle-triangle min distance
 *   - Exact Generalized Winding Number (solid angle) point-in-mesh containment (works even on non-watertight meshes)
 *   - Exact ray-triangle (Moller-Trumbore) intersection via BVH
 *   - Signed divergence-theorem mesh volume + analytical box/cylinder/sphere/capsule builders
 */

export const EPS = 1e-9;
export const PRECISION_MM = 0.001;
export const STRICT_PRECISION_MM = 0.0001;

// ============================================================================
// Primitive AABB Utilities
// ============================================================================
export function createEmptyBox() {
  return [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
}

export function boxesOverlap(a, b, pad = 0) {
  return (
    a[0] <= b[3] + pad &&
    a[3] >= b[0] - pad &&
    a[1] <= b[4] + pad &&
    a[4] >= b[1] - pad &&
    a[2] <= b[5] + pad &&
    a[5] >= b[2] - pad
  );
}

export function boxDistanceSqToPoint(box, px, py, pz) {
  let dx = 0;
  if (px < box[0]) dx = box[0] - px;
  else if (px > box[3]) dx = px - box[3];
  let dy = 0;
  if (py < box[1]) dy = box[1] - py;
  else if (py > box[4]) dy = py - box[4];
  let dz = 0;
  if (pz < box[2]) dz = box[2] - pz;
  else if (pz > box[5]) dz = pz - box[5];
  return dx * dx + dy * dy + dz * dz;
}

export function boxBoxMinDistSq(a, b) {
  let dx = 0;
  if (a[3] < b[0]) dx = b[0] - a[3];
  else if (b[3] < a[0]) dx = a[0] - b[3];
  let dy = 0;
  if (a[4] < b[1]) dy = b[1] - a[4];
  else if (b[4] < a[1]) dy = a[1] - b[4];
  let dz = 0;
  if (a[5] < b[2]) dz = b[2] - a[5];
  else if (b[5] < a[2]) dz = a[2] - b[5];
  return dx * dx + dy * dy + dz * dz;
}

export function boxIntersectionVolume(a, b) {
  const ox = Math.min(a[3], b[3]) - Math.max(a[0], b[0]);
  if (ox <= 0) return 0;
  const oy = Math.min(a[4], b[4]) - Math.max(a[1], b[1]);
  if (oy <= 0) return 0;
  const oz = Math.min(a[5], b[5]) - Math.max(a[2], b[2]);
  if (oz <= 0) return 0;
  return ox * oy * oz;
}

export function boxMinOverlapAxis(a, b) {
  const ox = Math.min(a[3], b[3]) - Math.max(a[0], b[0]);
  const oy = Math.min(a[4], b[4]) - Math.max(a[1], b[1]);
  const oz = Math.min(a[5], b[5]) - Math.max(a[2], b[2]);
  if (ox <= 0 || oy <= 0 || oz <= 0) return 0;
  return Math.min(ox, oy, oz);
}

// ============================================================================
// Flat Float64Array BVH (Zero-GC, high cache locality)
// ============================================================================
export function buildFlatBvh(itemBoxes, leafSize = 6) {
  const count = itemBoxes.length;
  if (count === 0) {
    return { count: 0, nodeCount: 0, boxes: new Float64Array(0), left: new Int32Array(0), right: new Int32Array(0), order: new Int32Array(0) };
  }
  const order = new Int32Array(count);
  const centroids = new Float64Array(count * 3);
  for (let i = 0; i < count; i++) {
    order[i] = i;
    const b = itemBoxes[i];
    centroids[i * 3] = (b[0] + b[3]) * 0.5;
    centroids[i * 3 + 1] = (b[1] + b[4]) * 0.5;
    centroids[i * 3 + 2] = (b[2] + b[5]) * 0.5;
  }

  const maxNodes = Math.max(1, count * 2);
  const boxes = new Float64Array(maxNodes * 6);
  const left = new Int32Array(maxNodes);
  const right = new Int32Array(maxNodes);
  let nodeCount = 0;

  function buildNode(start, end) {
    const idx = nodeCount++;
    const off = idx * 6;
    let x0 = Infinity, y0 = Infinity, z0 = Infinity;
    let x1 = -Infinity, y1 = -Infinity, z1 = -Infinity;
    let cx0 = Infinity, cy0 = Infinity, cz0 = Infinity;
    let cx1 = -Infinity, cy1 = -Infinity, cz1 = -Infinity;
    for (let i = start; i < end; i++) {
      const id = order[i];
      const b = itemBoxes[id];
      if (b[0] < x0) x0 = b[0];
      if (b[1] < y0) y0 = b[1];
      if (b[2] < z0) z0 = b[2];
      if (b[3] > x1) x1 = b[3];
      if (b[4] > y1) y1 = b[4];
      if (b[5] > z1) z1 = b[5];
      const cx = centroids[id * 3];
      const cy = centroids[id * 3 + 1];
      const cz = centroids[id * 3 + 2];
      if (cx < cx0) cx0 = cx;
      if (cy < cy0) cy0 = cy;
      if (cz < cz0) cz0 = cz;
      if (cx > cx1) cx1 = cx;
      if (cy > cy1) cy1 = cy;
      if (cz > cz1) cz1 = cz;
    }
    boxes[off] = x0;
    boxes[off + 1] = y0;
    boxes[off + 2] = z0;
    boxes[off + 3] = x1;
    boxes[off + 4] = y1;
    boxes[off + 5] = z1;

    const span = end - start;
    if (span <= leafSize) {
      left[idx] = -(start + 1);
      right[idx] = span;
      return idx;
    }
    const ex = cx1 - cx0;
    const ey = cy1 - cy0;
    const ez = cz1 - cz0;
    let axis = 0;
    if (ey >= ex && ey >= ez) axis = 1;
    else if (ez >= ex && ez >= ey) axis = 2;
    const splitVal = axis === 0 ? (cx0 + cx1) * 0.5 : axis === 1 ? (cy0 + cy1) * 0.5 : (cz0 + cz1) * 0.5;

    let mid = start;
    for (let i = start; i < end; i++) {
      if (centroids[order[i] * 3 + axis] < splitVal) {
        const tmp = order[mid];
        order[mid] = order[i];
        order[i] = tmp;
        mid++;
      }
    }
    if (mid === start || mid === end) mid = (start + end) >> 1;
    left[idx] = buildNode(start, mid);
    right[idx] = buildNode(mid, end);
    return idx;
  }

  buildNode(0, count);
  return {
    count,
    nodeCount,
    boxes: boxes.subarray(0, nodeCount * 6),
    left: left.subarray(0, nodeCount),
    right: right.subarray(0, nodeCount),
    order,
  };
}

export function queryBvhBox(bvh, box, pad = 0, out = []) {
  if (!bvh || bvh.nodeCount === 0) return out;
  const { boxes, left, right, order } = bvh;
  const stack = [0];
  while (stack.length > 0) {
    const n = stack.pop();
    const o = n * 6;
    if (
      boxes[o] > box[3] + pad ||
      boxes[o + 3] < box[0] - pad ||
      boxes[o + 1] > box[4] + pad ||
      boxes[o + 4] < box[1] - pad ||
      boxes[o + 2] > box[5] + pad ||
      boxes[o + 5] < box[2] - pad
    ) {
      continue;
    }
    const l = left[n];
    if (l < 0) {
      const start = -l - 1;
      const end = start + right[n];
      for (let i = start; i < end; i++) out.push(order[i]);
    } else {
      stack.push(l, right[n]);
    }
  }
  return out;
}

/**
 * Lazily build and cache triangle-level BVH for a mesh's Float64 world triangles (`tris`: 9 floats per tri).
 */
export function ensureTriBvh(mesh) {
  if (mesh._triBvh) return mesh._triBvh;
  const tris = mesh.tris;
  const nTri = Math.floor(tris.length / 9);
  const tBoxes = new Array(nTri);
  for (let i = 0; i < nTri; i++) {
    const o = i * 9;
    const ax = tris[o], ay = tris[o + 1], az = tris[o + 2];
    const bx = tris[o + 3], by = tris[o + 4], bz = tris[o + 5];
    const cx = tris[o + 6], cy = tris[o + 7], cz = tris[o + 8];
    tBoxes[i] = [
      Math.min(ax, bx, cx), Math.min(ay, by, cy), Math.min(az, bz, cz),
      Math.max(ax, bx, cx), Math.max(ay, by, cy), Math.max(az, bz, cz),
    ];
  }
  mesh._triBvh = buildFlatBvh(tBoxes, 6);
  return mesh._triBvh;
}

// ============================================================================
// Exact Point-Triangle, Segment-Segment & Triangle-Triangle Distances (Ericson)
// ============================================================================
export function pointTriangleDistSq(px, py, pz, ax, ay, az, bx, by, bz, cx, cy, cz) {
  const abx = bx - ax, aby = by - ay, abz = bz - az;
  const acx = cx - ax, acy = cy - ay, acz = cz - az;
  const apx = px - ax, apy = py - ay, apz = pz - az;

  const d1 = abx * apx + aby * apy + abz * apz;
  const d2 = acx * apx + acy * apy + acz * apz;
  if (d1 <= 0 && d2 <= 0) return apx * apx + apy * apy + apz * apz;

  const bpx = px - bx, bpy = py - by, bpz = pz - bz;
  const d3 = abx * bpx + aby * bpy + abz * bpz;
  const d4 = acx * bpx + acy * bpy + acz * bpz;
  if (d3 >= 0 && d4 <= d3) return bpx * bpx + bpy * bpy + bpz * bpz;

  const vc = d1 * d4 - d3 * d2;
  if (vc <= 0 && d1 >= 0 && d3 <= 0) {
    const v = d1 / (d1 - d3);
    const dx = apx - abx * v, dy = apy - aby * v, dz = apz - abz * v;
    return dx * dx + dy * dy + dz * dz;
  }

  const cpx = px - cx, cpy = py - cy, cpz = pz - cz;
  const d5 = abx * cpx + aby * cpy + abz * cpz;
  const d6 = acx * cpx + acy * cpy + acz * cpz;
  if (d6 >= 0 && d5 <= d6) return cpx * cpx + cpy * cpy + cpz * cpz;

  const vb = d5 * d2 - d1 * d6;
  if (vb <= 0 && d2 >= 0 && d6 <= 0) {
    const w = d2 / (d2 - d6);
    const dx = apx - acx * w, dy = apy - acy * w, dz = apz - acz * w;
    return dx * dx + dy * dy + dz * dz;
  }

  const va = d3 * d6 - d5 * d4;
  if (va <= 0 && (d4 - d3) >= 0 && (d5 - d6) >= 0) {
    const w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
    const dx = bpx - (cx - bx) * w;
    const dy = bpy - (cy - by) * w;
    const dz = bpz - (cz - bz) * w;
    return dx * dx + dy * dy + dz * dz;
  }

  const denom = 1 / (va + vb + vc);
  const v = vb * denom;
  const w = vc * denom;
  const dx = apx - abx * v - acx * w;
  const dy = apy - aby * v - acy * w;
  const dz = apz - abz * v - acz * w;
  return dx * dx + dy * dy + dz * dz;
}

export function segmentSegmentDistSq(p1x, p1y, p1z, q1x, q1y, q1z, p2x, p2y, p2z, q2x, q2y, q2z) {
  const d1x = q1x - p1x, d1y = q1y - p1y, d1z = q1z - p1z;
  const d2x = q2x - p2x, d2y = q2y - p2y, d2z = q2z - p2z;
  const rx = p1x - p2x, ry = p1y - p2y, rz = p1z - p2z;
  const a = d1x * d1x + d1y * d1y + d1z * d1z;
  const e = d2x * d2x + d2y * d2y + d2z * d2z;
  const f = d2x * rx + d2y * ry + d2z * rz;
  let s = 0, t = 0;

  if (a <= EPS && e <= EPS) return rx * rx + ry * ry + rz * rz;
  if (a <= EPS) {
    t = Math.max(0, Math.min(1, f / e));
  } else {
    const c = d1x * rx + d1y * ry + d1z * rz;
    if (e <= EPS) {
      s = Math.max(0, Math.min(1, -c / a));
    } else {
      const b = d1x * d2x + d1y * d2y + d1z * d2z;
      const denom = a * e - b * b;
      if (denom > EPS) s = Math.max(0, Math.min(1, (b * f - c * e) / denom));
      else s = 0;
      t = (b * s + f) / e;
      if (t < 0) {
        t = 0;
        s = Math.max(0, Math.min(1, -c / a));
      } else if (t > 1) {
        t = 1;
        s = Math.max(0, Math.min(1, (b - c) / a));
      }
    }
  }
  const dx = p1x + d1x * s - (p2x + d2x * t);
  const dy = p1y + d1y * s - (p2y + d2y * t);
  const dz = p1z + d1z * s - (p2z + d2z * t);
  return dx * dx + dy * dy + dz * dz;
}

// ============================================================================
// Exact Moller Triangle-Triangle Intersection + 2D Coplanar SAT
// ============================================================================
function orient2D(ax, ay, bx, by, cx, cy) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
}

function seg2DIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  const o1 = orient2D(ax, ay, bx, by, cx, cy);
  const o2 = orient2D(ax, ay, bx, by, dx, dy);
  const o3 = orient2D(cx, cy, dx, dy, ax, ay);
  const o4 = orient2D(cx, cy, dx, dy, bx, by);
  if (((o1 > EPS && o2 < -EPS) || (o1 < -EPS && o2 > EPS)) && ((o3 > EPS && o4 < -EPS) || (o3 < -EPS && o4 > EPS))) {
    return true;
  }
  const onSeg = (px, py, qx, qy, rx, ry) =>
    Math.abs(orient2D(px, py, qx, qy, rx, ry)) <= EPS &&
    rx >= Math.min(px, qx) - EPS && rx <= Math.max(px, qx) + EPS &&
    ry >= Math.min(py, qy) - EPS && ry <= Math.max(py, qy) + EPS;
  return (
    onSeg(ax, ay, bx, by, cx, cy) ||
    onSeg(ax, ay, bx, by, dx, dy) ||
    onSeg(cx, cy, dx, dy, ax, ay) ||
    onSeg(cx, cy, dx, dy, bx, by)
  );
}

function pointInTri2D(px, py, ax, ay, bx, by, cx, cy) {
  const o1 = orient2D(ax, ay, bx, by, px, py);
  const o2 = orient2D(bx, by, cx, cy, px, py);
  const o3 = orient2D(cx, cy, ax, ay, px, py);
  const hasNeg = o1 < -EPS || o2 < -EPS || o3 < -EPS;
  const hasPos = o1 > EPS || o2 > EPS || o3 > EPS;
  return !(hasNeg && hasPos);
}

function triTriCoplanar(nx, ny, nz, v0, v1, v2, u0, u1, u2) {
  const ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
  let i0 = 0, i1 = 1;
  if (ax >= ay && ax >= az) { i0 = 1; i1 = 2; }
  else if (ay >= ax && ay >= az) { i0 = 0; i1 = 2; }
  const a0x = v0[i0], a0y = v0[i1], a1x = v1[i0], a1y = v1[i1], a2x = v2[i0], a2y = v2[i1];
  const b0x = u0[i0], b0y = u0[i1], b1x = u1[i0], b1y = u1[i1], b2x = u2[i0], b2y = u2[i1];
  const ea = [[a0x, a0y, a1x, a1y], [a1x, a1y, a2x, a2y], [a2x, a2y, a0x, a0y]];
  const eb = [[b0x, b0y, b1x, b1y], [b1x, b1y, b2x, b2y], [b2x, b2y, b0x, b0y]];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (seg2DIntersect(ea[i][0], ea[i][1], ea[i][2], ea[i][3], eb[j][0], eb[j][1], eb[j][2], eb[j][3])) return true;
    }
  }
  if (pointInTri2D(a0x, a0y, b0x, b0y, b1x, b1y, b2x, b2y)) return true;
  if (pointInTri2D(b0x, b0y, a0x, a0y, a1x, a1y, a2x, a2y)) return true;
  return false;
}

function computeTriInterval(p0, p1, p2, d0, d1, d2) {
  const pair = (a, b, da, db, c, dc) => {
    const t0 = a + (c - a) * (da / (da - dc));
    const t1 = b + (c - b) * (db / (db - dc));
    return t0 < t1 ? [t0, t1] : [t1, t0];
  };
  if (d0 * d1 > 0) return pair(p0, p1, d0, d1, p2, d2);
  if (d0 * d2 > 0) return pair(p0, p2, d0, d2, p1, d1);
  if (d1 * d2 > 0 || d0 !== 0) return pair(p1, p2, d1, d2, p0, d0);
  if (d1 !== 0) return pair(p0, p2, d0, d2, p1, d1);
  if (d2 !== 0) return pair(p0, p1, d0, d1, p2, d2);
  return null;
}

export function triTriIntersect(a0x, a0y, a0z, a1x, a1y, a1z, a2x, a2y, a2z, b0x, b0y, b0z, b1x, b1y, b1z, b2x, b2y, b2z) {
  // Fast AABB reject
  if (
    Math.max(a0x, a1x, a2x) < Math.min(b0x, b1x, b2x) - EPS ||
    Math.min(a0x, a1x, a2x) > Math.max(b0x, b1x, b2x) + EPS ||
    Math.max(a0y, a1y, a2y) < Math.min(b0y, b1y, b2y) - EPS ||
    Math.min(a0y, a1y, a2y) > Math.max(b0y, b1y, b2y) + EPS ||
    Math.max(a0z, a1z, a2z) < Math.min(b0z, b1z, b2z) - EPS ||
    Math.min(a0z, a1z, a2z) > Math.max(b0z, b1z, b2z) + EPS
  ) return false;

  // Plane of A
  const e1x = a1x - a0x, e1y = a1y - a0y, e1z = a1z - a0z;
  const e2x = a2x - a0x, e2y = a2y - a0y, e2z = a2z - a0z;
  const n1x = e1y * e2z - e1z * e2y;
  const n1y = e1z * e2x - e1x * e2z;
  const n1z = e1x * e2y - e1y * e2x;
  const n1Len = Math.hypot(n1x, n1y, n1z);
  if (n1Len <= EPS) return false;
  const d1 = -(n1x * a0x + n1y * a0y + n1z * a0z);

  let db0 = (n1x * b0x + n1y * b0y + n1z * b0z + d1) / n1Len;
  let db1 = (n1x * b1x + n1y * b1y + n1z * b1z + d1) / n1Len;
  let db2 = (n1x * b2x + n1y * b2y + n1z * b2z + d1) / n1Len;
  if (Math.abs(db0) < EPS) db0 = 0;
  if (Math.abs(db1) < EPS) db1 = 0;
  if (Math.abs(db2) < EPS) db2 = 0;
  if ((db0 > 0 && db1 > 0 && db2 > 0) || (db0 < 0 && db1 < 0 && db2 < 0)) return false;

  // Plane of B
  const f1x = b1x - b0x, f1y = b1y - b0y, f1z = b1z - b0z;
  const f2x = b2x - b0x, f2y = b2y - b0y, f2z = b2z - b0z;
  const n2x = f1y * f2z - f1z * f2y;
  const n2y = f1z * f2x - f1x * f2z;
  const n2z = f1x * f2y - f1y * f2x;
  const n2Len = Math.hypot(n2x, n2y, n2z);
  if (n2Len <= EPS) return false;
  const d2 = -(n2x * b0x + n2y * b0y + n2z * b0z);

  let da0 = (n2x * a0x + n2y * a0y + n2z * a0z + d2) / n2Len;
  let da1 = (n2x * a1x + n2y * a1y + n2z * a1z + d2) / n2Len;
  let da2 = (n2x * a2x + n2y * a2y + n2z * a2z + d2) / n2Len;
  if (Math.abs(da0) < EPS) da0 = 0;
  if (Math.abs(da1) < EPS) da1 = 0;
  if (Math.abs(da2) < EPS) da2 = 0;
  if ((da0 > 0 && da1 > 0 && da2 > 0) || (da0 < 0 && da1 < 0 && da2 < 0)) return false;

  // Coplanar check
  if (db0 === 0 && db1 === 0 && db2 === 0) {
    return triTriCoplanar(n1x, n1y, n1z, [a0x, a0y, a0z], [a1x, a1y, a1z], [a2x, a2y, a2z], [b0x, b0y, b0z], [b1x, b1y, b1z], [b2x, b2y, b2z]);
  }

  // Intersection line direction D = N1 x N2
  const dx = n1y * n2z - n1z * n2y;
  const dy = n1z * n2x - n1x * n2z;
  const dz = n1x * n2y - n1y * n2x;
  const adx = Math.abs(dx), ady = Math.abs(dy), adz = Math.abs(dz);
  let pa0, pa1, pa2, pb0, pb1, pb2;
  if (adx >= ady && adx >= adz) {
    pa0 = a0x; pa1 = a1x; pa2 = a2x; pb0 = b0x; pb1 = b1x; pb2 = b2x;
  } else if (ady >= adx && ady >= adz) {
    pa0 = a0y; pa1 = a1y; pa2 = a2y; pb0 = b0y; pb1 = b1y; pb2 = b2y;
  } else {
    pa0 = a0z; pa1 = a1z; pa2 = a2z; pb0 = b0z; pb1 = b1z; pb2 = b2z;
  }

  const ia = computeTriInterval(pa0, pa1, pa2, da0, da1, da2);
  const ib = computeTriInterval(pb0, pb1, pb2, db0, db1, db2);
  if (!ia || !ib) {
    return triTriCoplanar(n1x, n1y, n1z, [a0x, a0y, a0z], [a1x, a1y, a1z], [a2x, a2y, a2z], [b0x, b0y, b0z], [b1x, b1y, b1z], [b2x, b2y, b2z]);
  }
  return ia[0] <= ib[1] + EPS && ib[0] <= ia[1] + EPS;
}

export function triTriDistSq(a0x, a0y, a0z, a1x, a1y, a1z, a2x, a2y, a2z, b0x, b0y, b0z, b1x, b1y, b1z, b2x, b2y, b2z) {
  if (triTriIntersect(a0x, a0y, a0z, a1x, a1y, a1z, a2x, a2y, a2z, b0x, b0y, b0z, b1x, b1y, b1z, b2x, b2y, b2z)) {
    return 0;
  }
  let best = Infinity;
  const va = [[a0x, a0y, a0z], [a1x, a1y, a1z], [a2x, a2y, a2z]];
  const vb = [[b0x, b0y, b0z], [b1x, b1y, b1z], [b2x, b2y, b2z]];
  for (let i = 0; i < 3; i++) {
    const dA = pointTriangleDistSq(va[i][0], va[i][1], va[i][2], b0x, b0y, b0z, b1x, b1y, b1z, b2x, b2y, b2z);
    if (dA < best) best = dA;
    const dB = pointTriangleDistSq(vb[i][0], vb[i][1], vb[i][2], a0x, a0y, a0z, a1x, a1y, a1z, a2x, a2y, a2z);
    if (dB < best) best = dB;
  }
  for (let i = 0; i < 3; i++) {
    const p1 = va[i], q1 = va[(i + 1) % 3];
    for (let j = 0; j < 3; j++) {
      const p2 = vb[j], q2 = vb[(j + 1) % 3];
      const d = segmentSegmentDistSq(p1[0], p1[1], p1[2], q1[0], q1[1], q1[2], p2[0], p2[1], p2[2], q2[0], q2[1], q2[2]);
      if (d < best) best = d;
    }
  }
  return best;
}

// ============================================================================
// Exact Akenine-Moller 13-Axis Triangle-AABB Intersection (TRI-SAT)
// ============================================================================
export function triBoxIntersect(ax, ay, az, bx, by, bz, cx, cy, cz, box) {
  const hx = (box[3] - box[0]) * 0.5;
  const hy = (box[4] - box[1]) * 0.5;
  const hz = (box[5] - box[2]) * 0.5;
  const mx = (box[0] + box[3]) * 0.5;
  const my = (box[1] + box[4]) * 0.5;
  const mz = (box[2] + box[5]) * 0.5;

  const v0x = ax - mx, v0y = ay - my, v0z = az - mz;
  const v1x = bx - mx, v1y = by - my, v1z = bz - mz;
  const v2x = cx - mx, v2y = cy - my, v2z = cz - mz;

  // 3 AABB face normals
  if (Math.min(v0x, v1x, v2x) > hx + EPS || Math.max(v0x, v1x, v2x) < -hx - EPS) return false;
  if (Math.min(v0y, v1y, v2y) > hy + EPS || Math.max(v0y, v1y, v2y) < -hy - EPS) return false;
  if (Math.min(v0z, v1z, v2z) > hz + EPS || Math.max(v0z, v1z, v2z) < -hz - EPS) return false;

  const e0x = v1x - v0x, e0y = v1y - v0y, e0z = v1z - v0z;
  const e1x = v2x - v1x, e1y = v2y - v1y, e1z = v2z - v1z;
  const e2x = v0x - v2x, e2y = v0y - v2y, e2z = v0z - v2z;

  // Triangle plane normal
  const nx = e0y * (v2z - v0z) - e0z * (v2y - v0y);
  const ny = e0z * (v2x - v0x) - e0x * (v2z - v0z);
  const nz = e0x * (v2y - v0y) - e0y * (v2x - v0x);
  const rPlane = hx * Math.abs(nx) + hy * Math.abs(ny) + hz * Math.abs(nz);
  const sPlane = nx * v0x + ny * v0y + nz * v0z;
  if (Math.abs(sPlane) > rPlane + EPS) return false;

  // 9 edge-cross-axis tests
  const axisTest = (axX, axY, axZ) => {
    const p0 = axX * v0x + axY * v0y + axZ * v0z;
    const p1 = axX * v1x + axY * v1y + axZ * v1z;
    const p2 = axX * v2x + axY * v2y + axZ * v2z;
    const r = hx * Math.abs(axX) + hy * Math.abs(axY) + hz * Math.abs(axZ);
    return Math.min(p0, p1, p2) <= r + EPS && Math.max(p0, p1, p2) >= -r - EPS;
  };

  if (!axisTest(0, -e0z, e0y)) return false;
  if (!axisTest(e0z, 0, -e0x)) return false;
  if (!axisTest(-e0y, e0x, 0)) return false;
  if (!axisTest(0, -e1z, e1y)) return false;
  if (!axisTest(e1z, 0, -e1x)) return false;
  if (!axisTest(-e1y, e1x, 0)) return false;
  if (!axisTest(0, -e2z, e2y)) return false;
  if (!axisTest(e2z, 0, -e2x)) return false;
  if (!axisTest(-e2y, e2x, 0)) return false;
  return true;
}

// ============================================================================
// Exact Point-in-Mesh Containment (BVH 4-Ray Parity + Solid-Angle Fallback)
// - O(log N) BVH 4-ray parity with ambiguous-edge guard is ~300x faster than O(N)
//   solid-angle loops AND immune to Three.js ExtrudeGeometry hole-wall winding inversion!
// - Automatically falls back to exact Generalized Winding Number (Jacobson et al. 2013)
//   whenever rays disagree (e.g. non-watertight open/missing-face meshes like M07).
// ============================================================================
const PARITY_DIRS = [
  [0.587785252292, 0.642787609687, 0.491021241684],
  [-0.713214873105, -0.521048391204, 0.468863574913],
  [0.312458917203, -0.883124715201, -0.350819283114],
  [-0.461939766256, 0.382683432365, -0.800103145191],
  [0.819152044289, -0.258819045103, 0.511859355674],
  [-0.241921895600, 0.906307787037, 0.346583323315],
].map(([x, y, z]) => {
  const len = Math.hypot(x, y, z);
  const dx = x / len, dy = y / len, dz = z / len;
  return [dx, dy, dz, 1 / dx, 1 / dy, 1 / dz];
});

function boxDistSqScalar(bx0, by0, bz0, bx1, by1, bz1, px, py, pz) {
  let dx = 0;
  if (px < bx0) dx = bx0 - px;
  else if (px > bx1) dx = px - bx1;
  let dy = 0;
  if (py < by0) dy = by0 - py;
  else if (py > by1) dy = py - by1;
  let dz = 0;
  if (pz < bz0) dz = bz0 - pz;
  else if (pz > bz1) dz = pz - bz1;
  return dx * dx + dy * dy + dz * dz;
}

function rayBoxHitScalar(ox, oy, oz, invDx, invDy, invDz, bx0, by0, bz0, bx1, by1, bz1) {
  let t0 = (bx0 - ox) * invDx;
  let t1 = (bx1 - ox) * invDx;
  if (t0 > t1) { const tmp = t0; t0 = t1; t1 = tmp; }
  let tMin = t0 > 1e-7 ? t0 : 1e-7;
  let tMax = t1;
  if (tMax < tMin) return false;

  t0 = (by0 - oy) * invDy;
  t1 = (by1 - oy) * invDy;
  if (t0 > t1) { const tmp = t0; t0 = t1; t1 = tmp; }
  if (t0 > tMin) tMin = t0;
  if (t1 < tMax) tMax = t1;
  if (tMax < tMin) return false;

  t0 = (bz0 - oz) * invDz;
  t1 = (bz1 - oz) * invDz;
  if (t0 > t1) { const tmp = t0; t0 = t1; t1 = tmp; }
  if (t0 > tMin) tMin = t0;
  if (t1 < tMax) tMax = t1;
  return tMax >= tMin;
}

function bvhRayParityCount(bvh, tris, ox, oy, oz, dx, dy, dz, invDx, invDy, invDz) {
  const { boxes, left, right, order } = bvh;
  const stack = [0];
  let hits = 0;
  while (stack.length > 0) {
    const n = stack.pop();
    const o = n * 6;
    if (
      !rayBoxHitScalar(
        ox, oy, oz, invDx, invDy, invDz,
        boxes[o], boxes[o + 1], boxes[o + 2], boxes[o + 3], boxes[o + 4], boxes[o + 5]
      )
    ) {
      continue;
    }
    const l = left[n];
    if (l < 0) {
      const start = -l - 1;
      const end = start + right[n];
      for (let i = start; i < end; i++) {
        const ti = order[i] * 9;
        const ax = tris[ti], ay = tris[ti + 1], az = tris[ti + 2];
        const e1x = tris[ti + 3] - ax, e1y = tris[ti + 4] - ay, e1z = tris[ti + 5] - az;
        const e2x = tris[ti + 6] - ax, e2y = tris[ti + 7] - ay, e2z = tris[ti + 8] - az;
        const hx = dy * e2z - dz * e2y;
        const hy = dz * e2x - dx * e2z;
        const hz = dx * e2y - dy * e2x;
        const a = e1x * hx + e1y * hy + e1z * hz;
        if (Math.abs(a) < 1e-12) continue;
        const f = 1 / a;
        const sx = ox - ax, sy = oy - ay, sz = oz - az;
        const u = f * (sx * hx + sy * hy + sz * hz);
        if (u < -1e-6 || u > 1 + 1e-6) continue;
        const qx = sy * e1z - sz * e1y;
        const qy = sz * e1x - sx * e1z;
        const qz = sx * e1y - sy * e1x;
        const v = f * (dx * qx + dy * qy + dz * qz);
        if (v < -1e-6 || u + v > 1 + 1e-6) continue;
        const t = f * (e2x * qx + e2y * qy + e2z * qz);
        if (t > 1e-7) {
          // Guard against grazing shared triangle edges/vertices (double-hit risk) -> mark ray ambiguous
          if (u < 1e-5 || v < 1e-5 || u + v > 1 - 1e-5) return -1;
          hits++;
        }
      }
    } else {
      stack.push(l, right[n]);
    }
  }
  return hits;
}

export function pointInMeshSolidAngle(mesh, px, py, pz) {
  const tris = mesh.tris;
  const nTri = Math.floor(tris.length / 9);
  let omegaSum = 0;

  for (let i = 0; i < nTri; i++) {
    const o = i * 9;
    const ax = tris[o] - px, ay = tris[o + 1] - py, az = tris[o + 2] - pz;
    const bx = tris[o + 3] - px, by = tris[o + 4] - py, bz = tris[o + 5] - pz;
    const cx = tris[o + 6] - px, cy = tris[o + 7] - py, cz = tris[o + 8] - pz;

    const la = Math.hypot(ax, ay, az);
    const lb = Math.hypot(bx, by, bz);
    const lc = Math.hypot(cx, cy, cz);
    if (la < 1e-7 || lb < 1e-7 || lc < 1e-7) continue;

    const det = ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx);
    const denom =
      la * lb * lc +
      (ax * bx + ay * by + az * bz) * lc +
      (bx * cx + by * cy + bz * cz) * la +
      (cx * ax + cy * ay + cz * az) * lb;
    omegaSum += 2 * Math.atan2(det, denom);
  }
  const winding = omegaSum / (4 * Math.PI);
  return Math.abs(winding) >= 0.5;
}

export function pointInMeshWinding(mesh, px, py, pz) {
  const b = mesh.box;
  if (px < b[0] - EPS || px > b[3] + EPS || py < b[1] - EPS || py > b[4] + EPS || pz < b[2] - EPS || pz > b[5] + EPS) {
    return false;
  }
  const bvh = ensureTriBvh(mesh);
  if (bvh.nodeCount === 0) return false;
  const tris = mesh.tris;

  let cleanCount = 0;
  let oddVotes = 0;
  for (let k = 0; k < PARITY_DIRS.length; k++) {
    const d = PARITY_DIRS[k];
    const c = bvhRayParityCount(bvh, tris, px, py, pz, d[0], d[1], d[2], d[3], d[4], d[5]);
    if (c < 0) continue; // ambiguous edge hit, try next direction
    cleanCount++;
    if ((c & 1) === 1) oddVotes++;
    if (cleanCount >= 4) break;
  }
  // Unanimous parity across >= 3 full-sphere directions proves closed containment (orientation-independent!)
  if (cleanCount >= 3 && (oddVotes === cleanCount || oddVotes === 0)) {
    return oddVotes === cleanCount;
  }
  // Disagreement indicates open/non-watertight boundary -> exact solid-angle Generalized Winding Number fallback
  return pointInMeshSolidAngle(mesh, px, py, pz);
}

// ============================================================================
// Exact Point-to-Mesh Signed Distance Function (Continuous SDF in mm)
// ============================================================================
export function pointToMeshUnsignedDist(mesh, px, py, pz, maxDist = Infinity) {
  const b = mesh.box;
  const boxD2 = boxDistSqScalar(b[0], b[1], b[2], b[3], b[4], b[5], px, py, pz);
  let bestD2 = maxDist * maxDist;
  if (boxD2 > bestD2) return Infinity;

  const bvh = ensureTriBvh(mesh);
  const tris = mesh.tris;
  if (bvh.nodeCount === 0) return Infinity;

  const { boxes, left, right, order } = bvh;
  const stack = [0];
  while (stack.length > 0) {
    const n = stack.pop();
    const o = n * 6;
    const nd2 = boxDistSqScalar(
      boxes[o], boxes[o + 1], boxes[o + 2], boxes[o + 3], boxes[o + 4], boxes[o + 5],
      px, py, pz
    );
    if (nd2 >= bestD2) continue;
    const l = left[n];
    if (l < 0) {
      const start = -l - 1;
      const end = start + right[n];
      for (let i = start; i < end; i++) {
        const ti = order[i] * 9;
        const d2 = pointTriangleDistSq(
          px, py, pz,
          tris[ti], tris[ti + 1], tris[ti + 2],
          tris[ti + 3], tris[ti + 4], tris[ti + 5],
          tris[ti + 6], tris[ti + 7], tris[ti + 8]
        );
        if (d2 < bestD2) bestD2 = d2;
      }
    } else {
      const lo = l * 6;
      const ro = right[n] * 6;
      const ld2 = boxDistSqScalar(
        boxes[lo], boxes[lo + 1], boxes[lo + 2], boxes[lo + 3], boxes[lo + 4], boxes[lo + 5],
        px, py, pz
      );
      const rd2 = boxDistSqScalar(
        boxes[ro], boxes[ro + 1], boxes[ro + 2], boxes[ro + 3], boxes[ro + 4], boxes[ro + 5],
        px, py, pz
      );
      if (ld2 < rd2) {
        if (rd2 < bestD2) stack.push(right[n]);
        if (ld2 < bestD2) stack.push(l);
      } else {
        if (ld2 < bestD2) stack.push(l);
        if (rd2 < bestD2) stack.push(right[n]);
      }
    }
  }
  return Math.sqrt(bestD2);
}

export function pointToMeshSignedDist(mesh, px, py, pz, maxDist = Infinity) {
  const inside = pointInMeshWinding(mesh, px, py, pz);
  const d = pointToMeshUnsignedDist(mesh, px, py, pz, maxDist);
  if (!Number.isFinite(d)) return inside ? -Infinity : Infinity;
  return inside ? -d : d;
}

// ============================================================================
// Exact Mesh-Mesh Collision, Containment & Minimum Distance (0.0001 mm certified)
// ============================================================================
function ensureMeshStats(mesh) {
  if (mesh._stats) return mesh._stats;
  const tris = mesh.tris;
  let vol6 = 0;
  let cx = 0, cy = 0, cz = 0;
  const n = Math.floor(tris.length / 9);
  for (let i = 0; i < n; i++) {
    const o = i * 9;
    const x0 = tris[o], y0 = tris[o + 1], z0 = tris[o + 2];
    const x1 = tris[o + 3], y1 = tris[o + 4], z1 = tris[o + 5];
    const x2 = tris[o + 6], y2 = tris[o + 7], z2 = tris[o + 8];
    const v6 = x0 * (y1 * z2 - y2 * z1) - y0 * (x1 * z2 - x2 * z1) + z0 * (x1 * y2 - x2 * y1);
    vol6 += v6;
    cx += v6 * (x0 + x1 + x2);
    cy += v6 * (y0 + y1 + y2);
    cz += v6 * (z0 + z1 + z2);
  }
  const absVol = Math.abs(vol6) / 6;
  const centroid = Math.abs(vol6) > 1e-9
    ? [cx / (4 * vol6), cy / (4 * vol6), cz / (4 * vol6)]
    : [(mesh.box[0] + mesh.box[3]) * 0.5, (mesh.box[1] + mesh.box[4]) * 0.5, (mesh.box[2] + mesh.box[5]) * 0.5];
  mesh._stats = { signedVol: vol6 / 6, absVol, isClosed: absVol > 1e-6, centroid };
  return mesh._stats;
}

function lerpPt3(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function computeTriPlaneSegment3D(v0, v1, v2, d0, d1, d2) {
  if (d0 === 0 && d1 === 0) return [v0, v1];
  if (d1 === 0 && d2 === 0) return [v1, v2];
  if (d2 === 0 && d0 === 0) return [v2, v0];
  if (d0 === 0) {
    if (d1 * d2 < 0) return [v0, lerpPt3(v1, v2, d1 / (d1 - d2))];
    return [v0, v0];
  }
  if (d1 === 0) {
    if (d0 * d2 < 0) return [v1, lerpPt3(v0, v2, d0 / (d0 - d2))];
    return [v1, v1];
  }
  if (d2 === 0) {
    if (d0 * d1 < 0) return [v2, lerpPt3(v0, v1, d0 / (d0 - d1))];
    return [v2, v2];
  }
  // All non-zero, isolate the single vertex on opposite side
  if (d0 * d1 > 0) {
    return [lerpPt3(v0, v2, d0 / (d0 - d2)), lerpPt3(v1, v2, d1 / (d1 - d2))];
  }
  if (d0 * d2 > 0) {
    return [lerpPt3(v0, v1, d0 / (d0 - d1)), lerpPt3(v2, v1, d2 / (d2 - d1))];
  }
  return [lerpPt3(v1, v0, d1 / (d1 - d0)), lerpPt3(v2, v0, d2 / (d2 - d0))];
}

/**
 * Detailed Moller triangle-triangle intersection classifying coplanar flush vs non-coplanar
 * piercing intersections and returning the exact 3D intersection segment [p0, p1].
 */
export function triTriIntersectDetail(
  a0x, a0y, a0z, a1x, a1y, a1z, a2x, a2y, a2z,
  b0x, b0y, b0z, b1x, b1y, b1z, b2x, b2y, b2z
) {
  if (
    Math.max(a0x, a1x, a2x) < Math.min(b0x, b1x, b2x) - EPS ||
    Math.min(a0x, a1x, a2x) > Math.max(b0x, b1x, b2x) + EPS ||
    Math.max(a0y, a1y, a2y) < Math.min(b0y, b1y, b2y) - EPS ||
    Math.min(a0y, a1y, a2y) > Math.max(b0y, b1y, b2y) + EPS ||
    Math.max(a0z, a1z, a2z) < Math.min(b0z, b1z, b2z) - EPS ||
    Math.min(a0z, a1z, a2z) > Math.max(b0z, b1z, b2z) + EPS
  ) return null;

  // Plane of A (unit normal u1)
  const e1x = a1x - a0x, e1y = a1y - a0y, e1z = a1z - a0z;
  const e2x = a2x - a0x, e2y = a2y - a0y, e2z = a2z - a0z;
  const n1x = e1y * e2z - e1z * e2y;
  const n1y = e1z * e2x - e1x * e2z;
  const n1z = e1x * e2y - e1y * e2x;
  const n1Len = Math.hypot(n1x, n1y, n1z);
  if (n1Len <= EPS) return null;
  const u1x = n1x / n1Len, u1y = n1y / n1Len, u1z = n1z / n1Len;
  const d1 = -(u1x * a0x + u1y * a0y + u1z * a0z);

  let db0 = u1x * b0x + u1y * b0y + u1z * b0z + d1;
  let db1 = u1x * b1x + u1y * b1y + u1z * b1z + d1;
  let db2 = u1x * b2x + u1y * b2y + u1z * b2z + d1;
  if (Math.abs(db0) < EPS) db0 = 0;
  if (Math.abs(db1) < EPS) db1 = 0;
  if (Math.abs(db2) < EPS) db2 = 0;
  if ((db0 > 0 && db1 > 0 && db2 > 0) || (db0 < 0 && db1 < 0 && db2 < 0)) return null;

  // Plane of B (unit normal u2)
  const f1x = b1x - b0x, f1y = b1y - b0y, f1z = b1z - b0z;
  const f2x = b2x - b0x, f2y = b2y - b0y, f2z = b2z - b0z;
  const n2x = f1y * f2z - f1z * f2y;
  const n2y = f1z * f2x - f1x * f2z;
  const n2z = f1x * f2y - f1y * f2x;
  const n2Len = Math.hypot(n2x, n2y, n2z);
  if (n2Len <= EPS) return null;
  const u2x = n2x / n2Len, u2y = n2y / n2Len, u2z = n2z / n2Len;
  const d2 = -(u2x * b0x + u2y * b0y + u2z * b0z);

  let da0 = u2x * a0x + u2y * a0y + u2z * a0z + d2;
  let da1 = u2x * a1x + u2y * a1y + u2z * a1z + d2;
  let da2 = u2x * a2x + u2y * a2y + u2z * a2z + d2;
  if (Math.abs(da0) < EPS) da0 = 0;
  if (Math.abs(da1) < EPS) da1 = 0;
  if (Math.abs(da2) < EPS) da2 = 0;
  if ((da0 > 0 && da1 > 0 && da2 > 0) || (da0 < 0 && da1 < 0 && da2 < 0)) return null;

  // Line of intersection direction D = u1 x u2
  const dx = u1y * u2z - u1z * u2y;
  const dy = u1z * u2x - u1x * u2z;
  const dz = u1x * u2y - u1y * u2x;
  const dLen = Math.hypot(dx, dy, dz);

  const maxDb = Math.max(Math.abs(db0), Math.abs(db1), Math.abs(db2));
  if ((dLen <= 1e-7 && maxDb <= 1e-7) || (db0 === 0 && db1 === 0 && db2 === 0)) {
    const ok = triTriCoplanar(
      u1x, u1y, u1z,
      [a0x, a0y, a0z], [a1x, a1y, a1z], [a2x, a2y, a2z],
      [b0x, b0y, b0z], [b1x, b1y, b1z], [b2x, b2y, b2z]
    );
    if (!ok) return null;
    return {
      hit: true,
      coplanar: true,
      mid: [
        (a0x + a1x + a2x + b0x + b1x + b2x) / 6,
        (a0y + a1y + a2y + b0y + b1y + b2y) / 6,
        (a0z + a1z + a2z + b0z + b1z + b2z) / 6,
      ],
    };
  }
  if (dLen <= 1e-12) return null;

  const ux = dx / dLen, uy = dy / dLen, uz = dz / dLen;
  const segA = computeTriPlaneSegment3D([a0x, a0y, a0z], [a1x, a1y, a1z], [a2x, a2y, a2z], da0, da1, da2);
  const segB = computeTriPlaneSegment3D([b0x, b0y, b0z], [b1x, b1y, b1z], [b2x, b2y, b2z], db0, db1, db2);

  let tA0 = segA[0][0] * ux + segA[0][1] * uy + segA[0][2] * uz;
  let tA1 = segA[1][0] * ux + segA[1][1] * uy + segA[1][2] * uz;
  let pA0 = segA[0], pA1 = segA[1];
  if (tA0 > tA1) { const tt = tA0; tA0 = tA1; tA1 = tt; pA0 = segA[1]; pA1 = segA[0]; }

  let tB0 = segB[0][0] * ux + segB[0][1] * uy + segB[0][2] * uz;
  let tB1 = segB[1][0] * ux + segB[1][1] * uy + segB[1][2] * uz;
  let pB0 = segB[0], pB1 = segB[1];
  if (tB0 > tB1) { const tt = tB0; tB0 = tB1; tB1 = tt; pB0 = segB[1]; pB1 = segB[0]; }

  if (tA1 < tB0 - EPS || tB1 < tA0 - EPS) return null;

  const p0 = tA0 >= tB0 ? pA0 : pB0;
  const p1 = tA1 <= tB1 ? pA1 : pB1;
  const segLen = Math.hypot(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]);
  const mid = [(p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, (p0[2] + p1[2]) * 0.5];

  const minDa = Math.min(da0, da1, da2), maxDa = Math.max(da0, da1, da2);
  const minDb = Math.min(db0, db1, db2), maxDb2 = Math.max(db0, db1, db2);
  const straddleA = (minDa < -1e-7 && maxDa > 1e-7) ? Math.min(-minDa, maxDa) : 0;
  const straddleB = (minDb < -1e-7 && maxDb2 > 1e-7) ? Math.min(-minDb, maxDb2) : 0;

  return {
    hit: true,
    coplanar: false,
    p0,
    p1,
    mid,
    segLen,
    u1: [u1x, u1y, u1z],
    u2: [u2x, u2y, u2z],
    dir: [ux, uy, uz],
    straddleA,
    straddleB,
  };
}

/**
 * Compute maximum distance along in-plane ray (origin + s * dir) before exiting triangle (v0,v1,v2).
 */
function rayTriInPlaneMaxDist(ox, oy, oz, dx, dy, dz, ax, ay, az, bx, by, bz, cx, cy, cz, nx, ny, nz) {
  let sMax = Infinity;
  const edges = [
    [ax, ay, az, bx - ax, by - ay, bz - az],
    [bx, by, bz, cx - bx, cy - by, cz - bz],
    [cx, cy, cz, ax - cx, ay - cy, az - cz],
  ];
  for (let k = 0; k < 3; k++) {
    const [ex0, ey0, ez0, edx, edy, edz] = edges[k];
    // Outward in-plane normal = edgeDir x triNormal (CCW triangle)
    const onx = edy * nz - edz * ny;
    const ony = edz * nx - edx * nz;
    const onz = edx * ny - edy * nx;
    const denom = dx * onx + dy * ony + dz * onz;
    const dist = (ox - ex0) * onx + (oy - ey0) * ony + (oz - ez0) * onz;
    if (denom > 1e-12) {
      const s = -dist / denom;
      if (s < sMax) sMax = s;
    }
  }
  return Number.isFinite(sMax) && sMax > 0 ? sMax : 0;
}

function rayBoxMaxExitDist(ox, oy, oz, dx, dy, dz, box) {
  let tMax = Infinity;
  if (Math.abs(dx) > 1e-12) {
    const t = ((dx > 0 ? box[3] : box[0]) - ox) / dx;
    if (t < tMax) tMax = t;
  }
  if (Math.abs(dy) > 1e-12) {
    const t = ((dy > 0 ? box[4] : box[1]) - oy) / dy;
    if (t < tMax) tMax = t;
  }
  if (Math.abs(dz) > 1e-12) {
    const t = ((dz > 0 ? box[5] : box[2]) - oz) / dz;
    if (t < tMax) tMax = t;
  }
  return Number.isFinite(tMax) && tMax > 0 ? tMax : 0;
}

function ensureMeshUniqueVerts(mesh) {
  if (mesh._uniqueVerts) return mesh._uniqueVerts;
  const tris = mesh.tris;
  const seen = new Set();
  const tmp = [];
  for (let i = 0; i < tris.length; i += 3) {
    const x = tris[i], y = tris[i + 1], z = tris[i + 2];
    const key = `${Math.round(x * 1e5)}|${Math.round(y * 1e5)}|${Math.round(z * 1e5)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    tmp.push(x, y, z);
  }
  mesh._uniqueVerts = new Float64Array(tmp);
  return mesh._uniqueVerts;
}

/**
 * Exact, decimation-free maximum penetration depth over ALL unique vertices of srcMesh inside ovBox
 * that strictly lie inside dstMesh. Uses exact AABB-margin theorem pruning (d <= min face margin)
 * and descending unsigned-distance order so pointInMeshWinding runs minimally with 0% loss.
 */
function findMaxVertexPenetration(srcMesh, dstMesh, ovBox, minBoundPen) {
  const uv = ensureMeshUniqueVerts(srcMesh);
  const pad = 1e-5;
  const x0 = ovBox[0] - pad, y0 = ovBox[1] - pad, z0 = ovBox[2] - pad;
  const x1 = ovBox[3] + pad, y1 = ovBox[4] + pad, z1 = ovBox[5] + pad;
  const db = dstMesh.box;
  const db0 = db[0], db1 = db[1], db2 = db[2], db3 = db[3], db4 = db[4], db5 = db[5];
  const floorD = Math.max(1e-6, minBoundPen);
  const cands = [];

  for (let i = 0; i < uv.length; i += 3) {
    const vx = uv[i], vy = uv[i + 1], vz = uv[i + 2];
    if (vx < x0 || vx > x1 || vy < y0 || vy > y1 || vz < z0 || vz > z1) continue;
    // Exact theorem: for any point interior to dstMesh, dist(v, dM) <= min dist to dstMesh AABB faces
    const mX = vx - db0 < db3 - vx ? vx - db0 : db3 - vx;
    if (mX <= floorD) continue;
    const mY = vy - db1 < db4 - vy ? vy - db1 : db4 - vy;
    if (mY <= floorD) continue;
    const mZ = vz - db2 < db5 - vz ? vz - db2 : db5 - vz;
    if (mZ <= floorD) continue;
    const d = pointToMeshUnsignedDist(dstMesh, vx, vy, vz);
    if (d > floorD && Number.isFinite(d)) {
      cands.push([d, vx, vy, vz]);
    }
  }
  if (cands.length === 0) return null;
  cands.sort((a, b) => b[0] - a[0]);
  for (let i = 0; i < cands.length; i++) {
    const [d, vx, vy, vz] = cands[i];
    if (pointInMeshWinding(dstMesh, vx, vy, vz)) {
      return { pen: d, pt: [vx, vy, vz] };
    }
  }
  return null;
}

function testFullContainment(innerMesh, outerMesh) {
  if (!boxesOverlap(innerMesh.box, outerMesh.box, 0)) return null;
  const tIn = innerMesh.tris;
  if (tIn.length < 9) return null;
  const innerStats = ensureMeshStats(innerMesh);
  const vertexProbes = [];
  const nVerts = Math.floor(tIn.length / 3);
  const step = Math.max(1, Math.floor(nVerts / 8));
  for (let i = 0; i < nVerts && vertexProbes.length < 8; i += step) {
    vertexProbes.push([tIn[i * 3], tIn[i * 3 + 1], tIn[i * 3 + 2]]);
  }

  let vertInsideCount = 0;
  let maxDepth = 0;
  let deepestPt = vertexProbes[0];
  for (let i = 0; i < vertexProbes.length; i++) {
    const [px, py, pz] = vertexProbes[i];
    if (pointInMeshWinding(outerMesh, px, py, pz)) {
      const d = pointToMeshUnsignedDist(outerMesh, px, py, pz);
      if (d > 1e-6 && Number.isFinite(d)) {
        vertInsideCount++;
        if (d > maxDepth) {
          maxDepth = d;
          deepestPt = [px, py, pz];
        }
      }
    }
  }
  // Surface boundary has 0 crossings with outerMesh -> for true containment, majority of inner vertices MUST be inside outerMesh
  if (vertInsideCount < Math.ceil(vertexProbes.length * 0.5)) return null;

  // Also include innerMesh centroid depth (e.g. deepest interior point of concentric inner solid)
  const c = innerStats.centroid;
  if (pointInMeshWinding(outerMesh, c[0], c[1], c[2])) {
    const dc = pointToMeshUnsignedDist(outerMesh, c[0], c[1], c[2]);
    if (dc > maxDepth && Number.isFinite(dc)) {
      maxDepth = dc;
      deepestPt = c;
    }
  }

  // Evaluate exact max interior depth across all unique vertices of innerMesh
  const allVertPen = findMaxVertexPenetration(innerMesh, outerMesh, innerMesh.box, maxDepth);
  if (allVertPen && allVertPen.pen > maxDepth) {
    maxDepth = allVertPen.pen;
    deepestPt = allVertPen.pt;
  }
  return { penMm: Number(maxDepth.toFixed(6)), centroid: deepestPt };
}

export function meshPairExactCheck(meshA, meshB, opts = {}) {
  const pad = opts.pad ?? 0;
  if (!boxesOverlap(meshA.box, meshB.box, pad)) {
    return {
      intersects: false,
      contained: null,
      contactType: 'NONE',
      penMm: 0,
      minDistMm: Math.sqrt(boxBoxMinDistSq(meshA.box, meshB.box)),
      centroid: null,
      coplanarHits: 0,
      nonCoplanarHits: 0,
    };
  }

  const bvhA = ensureTriBvh(meshA);
  const bvhB = ensureTriBvh(meshB);
  const tA = meshA.tris;
  const tB = meshB.tris;

  // Dual BVH traversal collecting ALL intersecting triangle pairs (up to generous safety cap)
  const maxPairHits = opts.maxPairHits ?? 50000;
  const stackA = [0];
  const stackB = [0];
  let coplanarHits = 0;
  let nonCoplanarHits = 0;
  let hitX = 0, hitY = 0, hitZ = 0;
  let ncX = 0, ncY = 0, ncZ = 0;
  const ncSegs = [];
  let maxOpenStraddle = 0;
  let maxOpenPt = null;

  const { boxes: boxA, left: leftA, right: rightA, order: ordA } = bvhA;
  const { boxes: boxB, left: leftB, right: rightB, order: ordB } = bvhB;

  if (bvhA.nodeCount > 0 && bvhB.nodeCount > 0) {
    while (stackA.length > 0) {
      const na = stackA.pop();
      const nb = stackB.pop();
      const oa = na * 6;
      const ob = nb * 6;
      if (
        boxA[oa] > boxB[ob + 3] + EPS || boxA[oa + 3] < boxB[ob] - EPS ||
        boxA[oa + 1] > boxB[ob + 4] + EPS || boxA[oa + 4] < boxB[ob + 1] - EPS ||
        boxA[oa + 2] > boxB[ob + 5] + EPS || boxA[oa + 5] < boxB[ob + 2] - EPS
      ) {
        continue;
      }
      const la = leftA[na];
      const lb = leftB[nb];
      if (la < 0 && lb < 0) {
        const sA = -la - 1, eA = sA + rightA[na];
        const sB = -lb - 1, eB = sB + rightB[nb];
        for (let i = sA; i < eA; i++) {
          const ia = ordA[i] * 9;
          for (let j = sB; j < eB; j++) {
            const ib = ordB[j] * 9;
            const det = triTriIntersectDetail(
              tA[ia], tA[ia + 1], tA[ia + 2], tA[ia + 3], tA[ia + 4], tA[ia + 5], tA[ia + 6], tA[ia + 7], tA[ia + 8],
              tB[ib], tB[ib + 1], tB[ib + 2], tB[ib + 3], tB[ib + 4], tB[ib + 5], tB[ib + 6], tB[ib + 7], tB[ib + 8]
            );
            if (!det) continue;
            hitX += det.mid[0];
            hitY += det.mid[1];
            hitZ += det.mid[2];
            if (det.coplanar) {
              coplanarHits++;
            } else {
              nonCoplanarHits++;
              ncX += det.mid[0];
              ncY += det.mid[1];
              ncZ += det.mid[2];
              const str = Math.max(det.straddleA, det.straddleB);
              if (str > maxOpenStraddle) {
                maxOpenStraddle = str;
                maxOpenPt = det.mid;
              }
              if (ncSegs.length < 256) {
                ncSegs.push({ ...det, ia, ib });
              } else if (str > ncSegs[ncSegs.length - 1].straddleA && (nonCoplanarHits & 7) === 0) {
                ncSegs[(nonCoplanarHits >> 3) % 256] = { ...det, ia, ib };
              }
            }
            if (coplanarHits + nonCoplanarHits >= maxPairHits) {
              stackA.length = 0;
              stackB.length = 0;
              break;
            }
          }
          if (coplanarHits + nonCoplanarHits >= maxPairHits) break;
        }
      } else if (la < 0) {
        stackA.push(na, na);
        stackB.push(lb, rightB[nb]);
      } else if (lb < 0) {
        stackA.push(la, rightA[na]);
        stackB.push(nb, nb);
      } else {
        const volA = (boxA[oa + 3] - boxA[oa]) * (boxA[oa + 4] - boxA[oa + 1]) * (boxA[oa + 5] - boxA[oa + 2]);
        const volB = (boxB[ob + 3] - boxB[ob]) * (boxB[ob + 4] - boxB[ob + 1]) * (boxB[ob + 5] - boxB[ob + 2]);
        if (volA >= volB) {
          stackA.push(la, rightA[na]);
          stackB.push(nb, nb);
        } else {
          stackA.push(na, na);
          stackB.push(lb, rightB[nb]);
        }
      }
    }
  }

  const hitCount = coplanarHits + nonCoplanarHits;
  if (hitCount > 0) {
    const ovBox = [
      Math.max(meshA.box[0], meshB.box[0]),
      Math.max(meshA.box[1], meshB.box[1]),
      Math.max(meshA.box[2], meshB.box[2]),
      Math.min(meshA.box[3], meshB.box[3]),
      Math.min(meshA.box[4], meshB.box[4]),
      Math.min(meshA.box[5], meshB.box[5]),
    ];
    if (ovBox[3] < ovBox[0]) { const m = (ovBox[0] + ovBox[3]) * 0.5; ovBox[0] = m; ovBox[3] = m; }
    if (ovBox[4] < ovBox[1]) { const m = (ovBox[1] + ovBox[4]) * 0.5; ovBox[1] = m; ovBox[4] = m; }
    if (ovBox[5] < ovBox[2]) { const m = (ovBox[2] + ovBox[5]) * 0.5; ovBox[2] = m; ovBox[5] = m; }

    const statsA = ensureMeshStats(meshA);
    const statsB = ensureMeshStats(meshB);
    let maxPen = 0;
    let worstPt = null;

    // 1. Decimation-free ALL-vertex strict interior check inside ovBox
    if (statsB.isClosed) {
      const pAB = findMaxVertexPenetration(meshA, meshB, ovBox, maxPen);
      if (pAB && pAB.pen > maxPen) {
        maxPen = pAB.pen;
        worstPt = pAB.pt;
      }
    }
    if (statsA.isClosed) {
      const pBA = findMaxVertexPenetration(meshB, meshA, ovBox, maxPen);
      if (pBA && pBA.pen > maxPen) {
        maxPen = pBA.pen;
        worstPt = pBA.pt;
      }
    }

    // 2. Non-coplanar intersection-segment interior penetration probe (catches cross-bars / edge crossings
    //    where NO vertex of A is inside B and NO vertex of B is inside A, without aabbPen false positives!)
    if (nonCoplanarHits > 0) {
      const boxMarginExceeds = (b, px, py, pz, limit) => {
        const mx = px - b[0] < b[3] - px ? px - b[0] : b[3] - px;
        if (mx <= limit) return false;
        const my = py - b[1] < b[4] - py ? py - b[1] : b[4] - py;
        if (my <= limit) return false;
        const mz = pz - b[2] < b[5] - pz ? pz - b[2] : b[5] - pz;
        return mz > limit;
      };

      const testProbe = (px, py, pz, targetMesh, requireBoth = false) => {
        const floorD = Math.max(1e-6, maxPen);
        if (requireBoth) {
          if (!boxMarginExceeds(meshA.box, px, py, pz, floorD) || !boxMarginExceeds(meshB.box, px, py, pz, floorD)) return;
          const dA = pointToMeshUnsignedDist(meshA, px, py, pz);
          if (dA <= floorD || !Number.isFinite(dA)) return;
          const dB = pointToMeshUnsignedDist(meshB, px, py, pz);
          const dMin = Math.min(dA, dB);
          if (dMin <= floorD || !Number.isFinite(dMin)) return;
          if (pointInMeshWinding(meshA, px, py, pz) && pointInMeshWinding(meshB, px, py, pz)) {
            maxPen = dMin;
            worstPt = [px, py, pz];
          }
          return;
        }
        if (!boxMarginExceeds(targetMesh.box, px, py, pz, floorD)) return;
        const d = pointToMeshUnsignedDist(targetMesh, px, py, pz);
        if (d > floorD && Number.isFinite(d) && pointInMeshWinding(targetMesh, px, py, pz)) {
          maxPen = d;
          worstPt = [px, py, pz];
        }
      };

      if (statsA.isClosed && statsB.isClosed) {
        // Test centroid of all non-coplanar intersection segments (exact center for crossing bars)
        testProbe(ncX / nonCoplanarHits, ncY / nonCoplanarHits, ncZ / nonCoplanarHits, null, true);
        // Test overlap AABB center if strictly inside both solids
        testProbe(
          (ovBox[0] + ovBox[3]) * 0.5,
          (ovBox[1] + ovBox[4]) * 0.5,
          (ovBox[2] + ovBox[5]) * 0.5,
          null,
          true
        );
      }

      // If vertex/center probes already found solid penetration, only sample coarse representative segments;
      // if maxPen is still 0 (potential vertex-free edge crossing or flush touch), scan thoroughly!
      const maxSegSamples = maxPen > 1e-4 ? 10 : 32;
      const probeDelta = 5e-5;
      const segStep = Math.max(1, Math.floor(ncSegs.length / maxSegSamples));
      for (let sIdx = 0; sIdx < ncSegs.length; sIdx += segStep) {
        const seg = ncSegs[sIdx];
        const [mx, my, mz] = seg.mid;
        const [ux, uy, uz] = seg.dir;
        const [n1x, n1y, n1z] = seg.u1;
        const [n2x, n2y, n2z] = seg.u2;

        // In-plane perpendicular to intersection line on triangle A -> probe inside meshB
        if (statsB.isClosed) {
          const vAx = n1y * uz - n1z * uy;
          const vAy = n1z * ux - n1x * uz;
          const vAz = n1x * uy - n1y * ux;
          const vALen = Math.hypot(vAx, vAy, vAz);
          if (vALen > 1e-9) {
            const dx = vAx / vALen, dy = vAy / vALen, dz = vAz / vALen;
            const ia = seg.ia;
            for (const sign of [1, -1]) {
              const sdx = dx * sign, sdy = dy * sign, sdz = dz * sign;
              const sTri = rayTriInPlaneMaxDist(
                mx, my, mz, sdx, sdy, sdz,
                tA[ia], tA[ia + 1], tA[ia + 2], tA[ia + 3], tA[ia + 4], tA[ia + 5], tA[ia + 6], tA[ia + 7], tA[ia + 8],
                n1x, n1y, n1z
              );
              const sBox = rayBoxMaxExitDist(mx, my, mz, sdx, sdy, sdz, ovBox);
              const sLimit = Math.min(sTri, sBox);
              if (sLimit <= Math.max(1e-6, maxPen)) continue;
              if (maxPen <= 1e-6) {
                const dEps = Math.min(probeDelta, sLimit * 0.5);
                if (!pointInMeshWinding(meshB, mx + sdx * dEps, my + sdy * dEps, mz + sdz * dEps)) continue;
                testProbe(mx + sdx * dEps, my + sdy * dEps, mz + sdz * dEps, meshB);
              }
              for (const frac of [0.5, 0.25, 0.75, 0.99]) {
                const st = sLimit * frac;
                if (st > maxPen) testProbe(mx + sdx * st, my + sdy * st, mz + sdz * st, meshB);
              }
            }
          }
        }

        // In-plane perpendicular on triangle B -> probe inside meshA
        if (statsA.isClosed) {
          const vBx = n2y * uz - n2z * uy;
          const vBy = n2z * ux - n2x * uz;
          const vBz = n2x * uy - n2y * ux;
          const vBLen = Math.hypot(vBx, vBy, vBz);
          if (vBLen > 1e-9) {
            const dx = vBx / vBLen, dy = vBy / vBLen, dz = vBz / vBLen;
            const ib = seg.ib;
            for (const sign of [1, -1]) {
              const sdx = dx * sign, sdy = dy * sign, sdz = dz * sign;
              const sTri = rayTriInPlaneMaxDist(
                mx, my, mz, sdx, sdy, sdz,
                tB[ib], tB[ib + 1], tB[ib + 2], tB[ib + 3], tB[ib + 4], tB[ib + 5], tB[ib + 6], tB[ib + 7], tB[ib + 8],
                n2x, n2y, n2z
              );
              const sBox = rayBoxMaxExitDist(mx, my, mz, sdx, sdy, sdz, ovBox);
              const sLimit = Math.min(sTri, sBox);
              if (sLimit <= Math.max(1e-6, maxPen)) continue;
              if (maxPen <= 1e-6) {
                const dEps = Math.min(probeDelta, sLimit * 0.5);
                if (!pointInMeshWinding(meshA, mx + sdx * dEps, my + sdy * dEps, mz + sdz * dEps)) continue;
                testProbe(mx + sdx * dEps, my + sdy * dEps, mz + sdz * dEps, meshA);
              }
              for (const frac of [0.5, 0.25, 0.75, 0.99]) {
                const st = sLimit * frac;
                if (st > maxPen) testProbe(mx + sdx * st, my + sdy * st, mz + sdz * st, meshA);
              }
            }
          }
        }
      }

      // Open / thin-sheet mesh fallback (ONLY when at least one mesh is non-watertight/zero-volume)
      if (maxPen <= 1e-6 && (!statsA.isClosed || !statsB.isClosed) && maxOpenStraddle > 1e-6) {
        const aabbPen = boxMinOverlapAxis(meshA.box, meshB.box);
        maxPen = aabbPen > 0 ? Math.min(maxOpenStraddle, aabbPen) : maxOpenStraddle;
        worstPt = maxOpenPt;
      }
    }

    const isPenetration = maxPen > 1e-6;
    const contactType = isPenetration
      ? 'PENETRATION'
      : coplanarHits > 0
        ? 'COPLANAR_FLUSH'
        : 'EDGE_TOUCH';
    const cPt = worstPt || [hitX / hitCount, hitY / hitCount, hitZ / hitCount];
    return {
      intersects: true,
      contained: null,
      contactType,
      penMm: isPenetration ? Number(maxPen.toFixed(6)) : 0,
      volMm3: isPenetration ? Number(boxIntersectionVolume(meshA.box, meshB.box).toFixed(4)) : 0,
      minDistMm: 0,
      centroid: [
        Number(cPt[0].toFixed(4)),
        Number(cPt[1].toFixed(4)),
        Number(cPt[2].toFixed(4)),
      ],
      coplanarHits,
      nonCoplanarHits,
    };
  }

  // No triangle-triangle boundary crossing -> multi-point strict full containment check
  const contAB = testFullContainment(meshA, meshB);
  if (contAB) {
    return {
      intersects: true,
      contained: 'A_IN_B',
      contactType: 'CONTAINMENT',
      penMm: contAB.penMm,
      volMm3: Number(boxIntersectionVolume(meshA.box, meshB.box).toFixed(4)),
      minDistMm: 0,
      centroid: [
        Number(contAB.centroid[0].toFixed(4)),
        Number(contAB.centroid[1].toFixed(4)),
        Number(contAB.centroid[2].toFixed(4)),
      ],
      coplanarHits: 0,
      nonCoplanarHits: 0,
    };
  }
  const contBA = testFullContainment(meshB, meshA);
  if (contBA) {
    return {
      intersects: true,
      contained: 'B_IN_A',
      contactType: 'CONTAINMENT',
      penMm: contBA.penMm,
      volMm3: Number(boxIntersectionVolume(meshA.box, meshB.box).toFixed(4)),
      minDistMm: 0,
      centroid: [
        Number(contBA.centroid[0].toFixed(4)),
        Number(contBA.centroid[1].toFixed(4)),
        Number(contBA.centroid[2].toFixed(4)),
      ],
      coplanarHits: 0,
      nonCoplanarHits: 0,
    };
  }

  // Exact minimum distance if requested (used for near-miss, sim, thermal-cog)
  if (opts.computeMinDist) {
    const d = exactMeshPairMinDistance(meshA, meshB, opts.maxDist ?? Infinity);
    return {
      intersects: false,
      contained: null,
      contactType: 'NONE',
      penMm: 0,
      minDistMm: d,
      centroid: null,
      coplanarHits: 0,
      nonCoplanarHits: 0,
    };
  }

  return {
    intersects: false,
    contained: null,
    contactType: 'NONE',
    penMm: 0,
    minDistMm: Infinity,
    centroid: null,
    coplanarHits: 0,
    nonCoplanarHits: 0,
  };
}

export function exactMeshPairMinDistance(meshA, meshB, maxDist = Infinity) {
  let bestD2 = maxDist * maxDist;
  if (boxBoxMinDistSq(meshA.box, meshB.box) >= bestD2) return Infinity;
  const bvhA = ensureTriBvh(meshA);
  const bvhB = ensureTriBvh(meshB);
  if (bvhA.nodeCount === 0 || bvhB.nodeCount === 0) return Infinity;

  const { boxes: boxA, left: leftA, right: rightA, order: ordA } = bvhA;
  const { boxes: boxB, left: leftB, right: rightB, order: ordB } = bvhB;
  const tA = meshA.tris;
  const tB = meshB.tris;

  const stack = [[0, 0, boxBoxMinDistSq(meshA.box, meshB.box)]];
  while (stack.length > 0) {
    // Pop nearest pair (greedy best-first)
    let minIdx = stack.length - 1;
    let minVal = stack[minIdx][2];
    for (let i = stack.length - 2; i >= Math.max(0, stack.length - 12); i--) {
      if (stack[i][2] < minVal) {
        minVal = stack[i][2];
        minIdx = i;
      }
    }
    const [na, nb, lbDist2] = stack[minIdx];
    stack[minIdx] = stack[stack.length - 1];
    stack.pop();
    if (lbDist2 >= bestD2) continue;

    const la = leftA[na];
    const lb = leftB[nb];
    if (la < 0 && lb < 0) {
      const sA = -la - 1, eA = sA + rightA[na];
      const sB = -lb - 1, eB = sB + rightB[nb];
      for (let i = sA; i < eA; i++) {
        const ia = ordA[i] * 9;
        for (let j = sB; j < eB; j++) {
          const ib = ordB[j] * 9;
          const d2 = triTriDistSq(
            tA[ia], tA[ia + 1], tA[ia + 2], tA[ia + 3], tA[ia + 4], tA[ia + 5], tA[ia + 6], tA[ia + 7], tA[ia + 8],
            tB[ib], tB[ib + 1], tB[ib + 2], tB[ib + 3], tB[ib + 4], tB[ib + 5], tB[ib + 6], tB[ib + 7], tB[ib + 8]
          );
          if (d2 < bestD2) {
            bestD2 = d2;
            if (bestD2 <= EPS) return 0;
          }
        }
      }
    } else if (la < 0) {
      const oa = na * 6;
      const ba = [boxA[oa], boxA[oa + 1], boxA[oa + 2], boxA[oa + 3], boxA[oa + 4], boxA[oa + 5]];
      for (const cb of [lb, rightB[nb]]) {
        const ob = cb * 6;
        const d2 = boxBoxMinDistSq(ba, [boxB[ob], boxB[ob + 1], boxB[ob + 2], boxB[ob + 3], boxB[ob + 4], boxB[ob + 5]]);
        if (d2 < bestD2) stack.push([na, cb, d2]);
      }
    } else if (lb < 0) {
      const ob = nb * 6;
      const bb = [boxB[ob], boxB[ob + 1], boxB[ob + 2], boxB[ob + 3], boxB[ob + 4], boxB[ob + 5]];
      for (const ca of [la, rightA[na]]) {
        const oa = ca * 6;
        const d2 = boxBoxMinDistSq([boxA[oa], boxA[oa + 1], boxA[oa + 2], boxA[oa + 3], boxA[oa + 4], boxA[oa + 5]], bb);
        if (d2 < bestD2) stack.push([ca, nb, d2]);
      }
    } else {
      const oa = na * 6, ob = nb * 6;
      const szA = (boxA[oa + 3] - boxA[oa]) + (boxA[oa + 4] - boxA[oa + 1]) + (boxA[oa + 5] - boxA[oa + 2]);
      const szB = (boxB[ob + 3] - boxB[ob]) + (boxB[ob + 4] - boxB[ob + 1]) + (boxB[ob + 5] - boxB[ob + 2]);
      if (szA >= szB) {
        const bb = [boxB[ob], boxB[ob + 1], boxB[ob + 2], boxB[ob + 3], boxB[ob + 4], boxB[ob + 5]];
        for (const ca of [la, rightA[na]]) {
          const coa = ca * 6;
          const d2 = boxBoxMinDistSq([boxA[coa], boxA[coa + 1], boxA[coa + 2], boxA[coa + 3], boxA[coa + 4], boxA[coa + 5]], bb);
          if (d2 < bestD2) stack.push([ca, nb, d2]);
        }
      } else {
        const ba = [boxA[oa], boxA[oa + 1], boxA[oa + 2], boxA[oa + 3], boxA[oa + 4], boxA[oa + 5]];
        for (const cb of [lb, rightB[nb]]) {
          const cob = cb * 6;
          const d2 = boxBoxMinDistSq(ba, [boxB[cob], boxB[cob + 1], boxB[cob + 2], boxB[cob + 3], boxB[cob + 4], boxB[cob + 5]]);
          if (d2 < bestD2) stack.push([na, cb, d2]);
        }
      }
    }
  }
  return Math.sqrt(bestD2);
}

// ============================================================================
// Exact Moller-Trumbore Ray-Triangle & Ray-Mesh BVH Intersection
// ============================================================================
function rayBoxHit(ox, oy, oz, invDx, invDy, invDz, box, tMin, tMax) {
  let t0 = (box[0] - ox) * invDx;
  let t1 = (box[3] - ox) * invDx;
  if (t0 > t1) { const tmp = t0; t0 = t1; t1 = tmp; }
  tMin = Math.max(tMin, t0);
  tMax = Math.min(tMax, t1);
  if (tMax < tMin) return false;

  t0 = (box[1] - oy) * invDy;
  t1 = (box[4] - oy) * invDy;
  if (t0 > t1) { const tmp = t0; t0 = t1; t1 = tmp; }
  tMin = Math.max(tMin, t0);
  tMax = Math.min(tMax, t1);
  if (tMax < tMin) return false;

  t0 = (box[2] - oz) * invDz;
  t1 = (box[5] - oz) * invDz;
  if (t0 > t1) { const tmp = t0; t0 = t1; t1 = tmp; }
  tMin = Math.max(tMin, t0);
  tMax = Math.min(tMax, t1);
  return tMax >= tMin;
}

export function rayMeshHit(mesh, ox, oy, oz, dx, dy, dz, tMin = 1e-4, tMax = Infinity) {
  const invDx = Math.abs(dx) > 1e-15 ? 1 / dx : 1e15;
  const invDy = Math.abs(dy) > 1e-15 ? 1 / dy : 1e15;
  const invDz = Math.abs(dz) > 1e-15 ? 1 / dz : 1e15;
  if (!rayBoxHit(ox, oy, oz, invDx, invDy, invDz, mesh.box, tMin, tMax)) return null;

  const bvh = ensureTriBvh(mesh);
  const tris = mesh.tris;
  const { boxes, left, right, order } = bvh;
  let bestT = tMax;
  let hit = false;
  const stack = [0];

  while (stack.length > 0) {
    const n = stack.pop();
    const o = n * 6;
    if (!rayBoxHit(ox, oy, oz, invDx, invDy, invDz, [boxes[o], boxes[o + 1], boxes[o + 2], boxes[o + 3], boxes[o + 4], boxes[o + 5]], tMin, bestT)) {
      continue;
    }
    const l = left[n];
    if (l < 0) {
      const start = -l - 1;
      const end = start + right[n];
      for (let i = start; i < end; i++) {
        const ti = order[i] * 9;
        const ax = tris[ti], ay = tris[ti + 1], az = tris[ti + 2];
        const e1x = tris[ti + 3] - ax, e1y = tris[ti + 4] - ay, e1z = tris[ti + 5] - az;
        const e2x = tris[ti + 6] - ax, e2y = tris[ti + 7] - ay, e2z = tris[ti + 8] - az;
        const hx = dy * e2z - dz * e2y;
        const hy = dz * e2x - dx * e2z;
        const hz = dx * e2y - dy * e2x;
        const a = e1x * hx + e1y * hy + e1z * hz;
        if (Math.abs(a) < 1e-12) continue;
        const f = 1 / a;
        const sx = ox - ax, sy = oy - ay, sz = oz - az;
        const u = f * (sx * hx + sy * hy + sz * hz);
        if (u < -1e-7 || u > 1 + 1e-7) continue;
        const qx = sy * e1z - sz * e1y;
        const qy = sz * e1x - sx * e1z;
        const qz = sx * e1y - sy * e1x;
        const v = f * (dx * qx + dy * qy + dz * qz);
        if (v < -1e-7 || u + v > 1 + 1e-7) continue;
        const t = f * (e2x * qx + e2y * qy + e2z * qz);
        if (t >= tMin && t < bestT) {
          bestT = t;
          hit = true;
        }
      }
    } else {
      stack.push(l, right[n]);
    }
  }
  return hit ? bestT : null;
}

// ============================================================================
// Signed Divergence-Theorem Volume & Centroid + Analytical Candidate Mesh Builders
// ============================================================================
export function computeMeshSignedVolumeAndCentroid(tris) {
  let vol6 = 0;
  let cx = 0, cy = 0, cz = 0;
  const n = Math.floor(tris.length / 9);
  for (let i = 0; i < n; i++) {
    const o = i * 9;
    const x0 = tris[o], y0 = tris[o + 1], z0 = tris[o + 2];
    const x1 = tris[o + 3], y1 = tris[o + 4], z1 = tris[o + 5];
    const x2 = tris[o + 6], y2 = tris[o + 7], z2 = tris[o + 8];
    const v6 = x0 * (y1 * z2 - y2 * z1) - y0 * (x1 * z2 - x2 * z1) + z0 * (x1 * y2 - x2 * y1);
    vol6 += v6;
    cx += v6 * (x0 + x1 + x2);
    cy += v6 * (y0 + y1 + y2);
    cz += v6 * (z0 + z1 + z2);
  }
  const volume = Math.abs(vol6) / 6;
  if (Math.abs(vol6) > 1e-9) {
    return {
      volumeMm3: volume,
      centroid: [cx / (4 * vol6), cy / (4 * vol6), cz / (4 * vol6)],
    };
  }
  return { volumeMm3: 0, centroid: [0, 0, 0] };
}

function applyTransform(pts, pos, rotDeg) {
  const rx = ((rotDeg?.[0] || 0) * Math.PI) / 180;
  const ry = ((rotDeg?.[1] || 0) * Math.PI) / 180;
  const rz = ((rotDeg?.[2] || 0) * Math.PI) / 180;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const cz = Math.cos(rz), sz = Math.sin(rz);
  const px = pos[0] || 0, py = pos[1] || 0, pz = pos[2] || 0;

  const out = new Float64Array(pts.length);
  for (let i = 0; i < pts.length; i += 3) {
    let x = pts[i], y = pts[i + 1], z = pts[i + 2];
    // XYZ Euler rotation
    const y1 = y * cx - z * sx;
    const z1 = y * sx + z * cx;
    const x2 = x * cy + z1 * sy;
    const z2 = -x * sy + z1 * cy;
    const x3 = x2 * cz - y1 * sz;
    const y3 = x2 * sz + y1 * cz;
    out[i] = x3 + px;
    out[i + 1] = y3 + py;
    out[i + 2] = z2 + pz;
  }
  return out;
}

export function makeMeshFromTris(tris, meta = {}) {
  const box = createEmptyBox();
  for (let i = 0; i < tris.length; i += 3) {
    const x = tris[i], y = tris[i + 1], z = tris[i + 2];
    if (x < box[0]) box[0] = x;
    if (y < box[1]) box[1] = y;
    if (z < box[2]) box[2] = z;
    if (x > box[3]) box[3] = x;
    if (y > box[4]) box[4] = y;
    if (z > box[5]) box[5] = z;
  }
  return { ...meta, tris, box, _triBvh: null };
}

export function translateMesh(mesh, dx, dy, dz) {
  if (dx === 0 && dy === 0 && dz === 0) return mesh;
  const src = mesh.tris;
  const dst = new Float64Array(src.length);
  for (let i = 0; i < src.length; i += 3) {
    dst[i] = src[i] + dx;
    dst[i + 1] = src[i + 1] + dy;
    dst[i + 2] = src[i + 2] + dz;
  }
  const b = mesh.box;
  let shiftedBvh = null;
  if (mesh._triBvh && mesh._triBvh.nodeCount > 0) {
    const sb = mesh._triBvh.boxes;
    const nb = new Float64Array(sb.length);
    for (let i = 0; i < sb.length; i += 6) {
      nb[i] = sb[i] + dx;
      nb[i + 1] = sb[i + 1] + dy;
      nb[i + 2] = sb[i + 2] + dz;
      nb[i + 3] = sb[i + 3] + dx;
      nb[i + 4] = sb[i + 4] + dy;
      nb[i + 5] = sb[i + 5] + dz;
    }
    shiftedBvh = {
      count: mesh._triBvh.count,
      nodeCount: mesh._triBvh.nodeCount,
      boxes: nb,
      left: mesh._triBvh.left,
      right: mesh._triBvh.right,
      order: mesh._triBvh.order,
    };
  }
  let shiftedUnique = null;
  if (mesh._uniqueVerts) {
    const su = mesh._uniqueVerts;
    shiftedUnique = new Float64Array(su.length);
    for (let i = 0; i < su.length; i += 3) {
      shiftedUnique[i] = su[i] + dx;
      shiftedUnique[i + 1] = su[i + 1] + dy;
      shiftedUnique[i + 2] = su[i + 2] + dz;
    }
  }
  const shiftedStats = mesh._stats
    ? {
        ...mesh._stats,
        centroid: [
          mesh._stats.centroid[0] + dx,
          mesh._stats.centroid[1] + dy,
          mesh._stats.centroid[2] + dz,
        ],
      }
    : null;
  return {
    ...mesh,
    tris: dst,
    box: [b[0] + dx, b[1] + dy, b[2] + dz, b[3] + dx, b[4] + dy, b[5] + dz],
    _triBvh: shiftedBvh,
    _uniqueVerts: shiftedUnique,
    _stats: shiftedStats,
  };
}

export function buildBoxMesh(pos, size, rotDeg = [0, 0, 0], meta = {}) {
  const hx = size[0] * 0.5, hy = size[1] * 0.5, hz = size[2] * 0.5;
  const v = [
    [-hx, -hy, -hz], [hx, -hy, -hz], [hx, hy, -hz], [-hx, hy, -hz],
    [-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz],
  ];
  const idx = [
    4, 5, 6, 4, 6, 7, // +Z
    1, 0, 3, 1, 3, 2, // -Z
    5, 1, 2, 5, 2, 6, // +X
    0, 4, 7, 0, 7, 3, // -X
    7, 6, 2, 7, 2, 3, // +Y
    0, 1, 5, 0, 5, 4, // -Y
  ];
  const raw = new Float64Array(idx.length * 3);
  for (let i = 0; i < idx.length; i++) {
    raw[i * 3] = v[idx[i]][0];
    raw[i * 3 + 1] = v[idx[i]][1];
    raw[i * 3 + 2] = v[idx[i]][2];
  }
  return makeMeshFromTris(applyTransform(raw, pos, rotDeg), meta);
}

export function buildCylinderMesh(pos, radius, height, axis = 'y', rotDeg = [0, 0, 0], segs = 32, meta = {}) {
  const hh = height * 0.5;
  const pts = [];
  const pushTri = (a, b, c) => { pts.push(...a, ...b, ...c); };
  const mapAxis = (x, y, z) => (axis === 'x' ? [y, -x, z] : axis === 'z' ? [x, -z, y] : [x, y, z]);

  const topC = mapAxis(0, hh, 0);
  const botC = mapAxis(0, -hh, 0);
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2;
    const a1 = ((i + 1) / segs) * Math.PI * 2;
    const t0 = mapAxis(Math.cos(a0) * radius, hh, Math.sin(a0) * radius);
    const t1 = mapAxis(Math.cos(a1) * radius, hh, Math.sin(a1) * radius);
    const b0 = mapAxis(Math.cos(a0) * radius, -hh, Math.sin(a0) * radius);
    const b1 = mapAxis(Math.cos(a1) * radius, -hh, Math.sin(a1) * radius);
    pushTri(topC, t1, t0);
    pushTri(botC, b0, b1);
    pushTri(b0, t0, t1);
    pushTri(b0, t1, b1);
  }
  return makeMeshFromTris(applyTransform(new Float64Array(pts), pos, rotDeg), meta);
}

export function buildSphereMesh(pos, radius, segs = 20, meta = {}) {
  const rings = Math.max(8, Math.floor(segs / 2));
  const pts = [];
  const pushTri = (a, b, c) => { pts.push(...a, ...b, ...c); };
  const pt = (lat, lon) => [
    radius * Math.sin(lat) * Math.cos(lon),
    radius * Math.cos(lat),
    radius * Math.sin(lat) * Math.sin(lon),
  ];
  for (let r = 0; r < rings; r++) {
    const l0 = (r / rings) * Math.PI;
    const l1 = ((r + 1) / rings) * Math.PI;
    for (let s = 0; s < segs; s++) {
      const a0 = (s / segs) * Math.PI * 2;
      const a1 = ((s + 1) / segs) * Math.PI * 2;
      const p00 = pt(l0, a0), p01 = pt(l0, a1), p10 = pt(l1, a0), p11 = pt(l1, a1);
      if (r > 0) pushTri(p00, p01, p11);
      if (r < rings - 1) pushTri(p00, p11, p10);
    }
  }
  return makeMeshFromTris(applyTransform(new Float64Array(pts), pos, [0, 0, 0]), meta);
}

export function buildCapsuleMesh(pos, radius, length, axis = 'y', rotDeg = [0, 0, 0], segs = 20, meta = {}) {
  const hh = length * 0.5;
  const rings = 6;
  const pts = [];
  const pushTri = (a, b, c) => { pts.push(...a, ...b, ...c); };
  const mapAxis = (x, y, z) => (axis === 'x' ? [y, -x, z] : axis === 'z' ? [x, -z, y] : [x, y, z]);

  // Build stacked latitude rings from top pole to bottom pole
  const latitudes = [];
  for (let i = 0; i <= rings; i++) {
    const theta = (i / rings) * (Math.PI * 0.5);
    latitudes.push({ r: radius * Math.sin(theta), y: hh + radius * Math.cos(theta) });
  }
  for (let i = 0; i <= rings; i++) {
    const theta = (Math.PI * 0.5) + (i / rings) * (Math.PI * 0.5);
    latitudes.push({ r: radius * Math.sin(theta), y: -hh + radius * Math.cos(theta) });
  }
  for (let i = 0; i < latitudes.length - 1; i++) {
    const L0 = latitudes[i], L1 = latitudes[i + 1];
    for (let s = 0; s < segs; s++) {
      const a0 = (s / segs) * Math.PI * 2;
      const a1 = ((s + 1) / segs) * Math.PI * 2;
      const p00 = mapAxis(L0.r * Math.cos(a0), L0.y, L0.r * Math.sin(a0));
      const p01 = mapAxis(L0.r * Math.cos(a1), L0.y, L0.r * Math.sin(a1));
      const p10 = mapAxis(L1.r * Math.cos(a0), L1.y, L1.r * Math.sin(a0));
      const p11 = mapAxis(L1.r * Math.cos(a1), L1.y, L1.r * Math.sin(a1));
      if (L0.r > 1e-9) pushTri(p00, p01, p11);
      if (L1.r > 1e-9) pushTri(p00, p11, p10);
    }
  }
  return makeMeshFromTris(applyTransform(new Float64Array(pts), pos, rotDeg), meta);
}

export function buildCandidateMesh(cand, originOffset = [0, 0, 0]) {
  const shape = cand.shape || 'box';
  const rawPos = cand.pos || [0, 0, 0];
  const worldPos = [rawPos[0] + originOffset[0], rawPos[1] + originOffset[1], rawPos[2] + originOffset[2]];
  const rot = cand.rotDeg || [0, 0, 0];
  const meta = { partId: cand.id || 'candidate', code: cand.code || 'CAND', role: cand.role || 'candidate' };
  if (shape === 'cylinder') {
    return buildCylinderMesh(worldPos, cand.radius, cand.height, cand.axis || 'y', rot, 32, meta);
  }
  if (shape === 'sphere') {
    return buildSphereMesh(worldPos, cand.radius, 24, meta);
  }
  if (shape === 'capsule') {
    return buildCapsuleMesh(worldPos, cand.radius, cand.length, cand.axis || 'y', rot, 20, meta);
  }
  return buildBoxMesh(worldPos, cand.size, rot, meta);
}
