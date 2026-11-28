//@FLOW_MAP|file=src/core/cad_primitives.ts|unit=core|role=AI_NATIVE_PARAMETRIC_PRIMITIVES
/**
 * FLOW V1 OS — Layer M Reusable V2-Clean Parametric Mechanical Primitives
 * Zero raw materials (`V2MaterialLibrary` buckets ONLY), 4-tier quality LOD aware,
 * deterministic local origin (0,0,0) for 0-token AI CAD construction & refactoring.
 */

import * as THREE from 'three';
import { scaleRadialSegmentsForQuality as qSeg } from './geometry_quality';
import type { V2MaterialLibrary } from './v2_material_catalog';

export interface HexBoltSpec {
  readonly headRadius: number;
  readonly headHeight: number;
  readonly shankRadius: number;
  readonly shankLength: number;
  readonly matKey?: keyof V2MaterialLibrary;
}

export function buildFlowHexBolt(spec: HexBoltSpec, mats: V2MaterialLibrary): THREE.Group {
  const g = new THREE.Group();
  const mat = mats[spec.matKey ?? 'stainlessMachined'];
  const seg = Math.max(8, qSeg(16, 8));
  const head = new THREE.Mesh(new THREE.CylinderGeometry(spec.headRadius, spec.headRadius, spec.headHeight, seg), mat);
  head.position.y = spec.headHeight * 0.5;
  const socket = new THREE.Mesh(
    new THREE.CylinderGeometry(spec.headRadius * 0.52, spec.headRadius * 0.52, spec.headHeight * 0.45, 6),
    mats.matteBlackAnodized
  );
  socket.position.y = spec.headHeight * 0.8;
  const shank = new THREE.Mesh(new THREE.CylinderGeometry(spec.shankRadius, spec.shankRadius, spec.shankLength, seg), mat);
  shank.position.y = -spec.shankLength * 0.5;
  g.add(head, socket, shank);
  return g;
}

export function buildFlowWasher(outerR: number, innerR: number, thickness: number, mats: V2MaterialLibrary, matKey: keyof V2MaterialLibrary = 'brassPrecision'): THREE.Group {
  const g = new THREE.Group();
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, Math.max(0.05, Math.min(innerR, outerR * 0.9)), 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: false,
    curveSegments: Math.max(8, qSeg(20, 8)),
  });
  geo.rotateX(-Math.PI * 0.5);
  geo.translate(0, -thickness * 0.5, 0);
  g.add(new THREE.Mesh(geo, mats[matKey]));
  return g;
}

export function buildFlowORing(majorR: number, tubeR: number, mats: V2MaterialLibrary, matKey: keyof V2MaterialLibrary = 'elastomerRubber'): THREE.Group {
  const g = new THREE.Group();
  const rSeg = Math.max(6, qSeg(12, 6));
  const tSeg = Math.max(12, qSeg(32, 12));
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(majorR, tubeR, rSeg, tSeg), mats[matKey]);
  mesh.rotation.x = Math.PI * 0.5;
  g.add(mesh);
  return g;
}

export function buildFlowQfnIc(width: number, height: number, depth: number, mats: V2MaterialLibrary): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), mats.icEpoxyDark);
  body.position.y = height * 0.5;
  const pad = new THREE.Mesh(new THREE.BoxGeometry(width * 0.72, Math.min(0.08, height * 0.2), depth * 0.72), mats.goldPlating);
  pad.position.y = Math.min(0.04, height * 0.1);
  g.add(body, pad);
  return g;
}

export function buildFlowSmdChip(length: number, width: number, height: number, mats: V2MaterialLibrary, bodyKey: keyof V2MaterialLibrary = 'ceramicAlumina'): THREE.Group {
  const g = new THREE.Group();
  const capW = length * 0.24;
  const body = new THREE.Mesh(new THREE.BoxGeometry(length - capW * 1.6, height, width), mats[bodyKey]);
  body.position.y = height * 0.5;
  const endGeo = new THREE.BoxGeometry(capW, height * 1.02, width * 1.02);
  const left = new THREE.Mesh(endGeo, mats.solderSilver);
  left.position.set(-(length - capW) * 0.5, height * 0.5, 0);
  const right = new THREE.Mesh(endGeo, mats.solderSilver);
  right.position.set((length - capW) * 0.5, height * 0.5, 0);
  g.add(body, left, right);
  return g;
}

export function buildFlowPogoPin(barrelR: number, barrelH: number, plungerH: number, mats: V2MaterialLibrary): THREE.Group {
  const g = new THREE.Group();
  const seg = Math.max(8, qSeg(14, 8));
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(barrelR, barrelR, barrelH, seg), mats.brassPrecision);
  barrel.position.y = barrelH * 0.5;
  const tip = new THREE.Mesh(new THREE.CylinderGeometry(barrelR * 0.55, barrelR * 0.65, plungerH, seg), mats.goldPlating);
  tip.position.y = barrelH + plungerH * 0.5;
  g.add(barrel, tip);
  return g;
}

export function buildFlowEmiCan(w: number, h: number, d: number, wall: number, mats: V2MaterialLibrary): THREE.Group {
  const g = new THREE.Group();
  const mat = mats.midPlateSteel;
  const top = new THREE.Mesh(new THREE.BoxGeometry(w, wall, d), mat);
  top.position.y = h - wall * 0.5;
  const sideX = new THREE.BoxGeometry(wall, h, d);
  const lx = new THREE.Mesh(sideX, mat); lx.position.set(-w * 0.5 + wall * 0.5, h * 0.5, 0);
  const rx = new THREE.Mesh(sideX, mat); rx.position.set(w * 0.5 - wall * 0.5, h * 0.5, 0);
  const sideZ = new THREE.BoxGeometry(w - wall * 2, h, wall);
  const fz = new THREE.Mesh(sideZ, mat); fz.position.set(0, h * 0.5, d * 0.5 - wall * 0.5);
  const bz = new THREE.Mesh(sideZ, mat); bz.position.set(0, h * 0.5, -d * 0.5 + wall * 0.5);
  g.add(top, lx, rx, fz, bz);
  return g;
}
