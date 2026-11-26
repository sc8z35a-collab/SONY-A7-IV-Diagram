import * as THREE from 'three';
import { CadPart } from '../types';
import { MaterialLibrary } from '../../engine/Materials';
import {
  attachCadEdges,
  createRoundedRectShape,
  tagPartMeshes,
} from '../../engine/CadHelpers';
import {
  applyPlanarUVs,
  extrudeHiRes,
  hiResCyl,
  hiResTorus,
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

/**
 * Shared lean CAD geometry & sculpting primitives for Sensor Fab Vol.5
 * (Phase 4 Pixel Wafer BEOL — 210 Steps / 13 Masks, 38 Parts F5-01–F5-38).
 */
export function createVol5BoxGeo(
  w: number,
  h: number,
  d: number,
  cornerR = 0.22,
  bevel = 0.08,
  uvAxis: 'x' | 'y' | 'z' = 'y'
): THREE.BufferGeometry {
  const rw = uvAxis === 'x' ? d : w;
  const rh = uvAxis === 'y' ? d : h;
  const thick = uvAxis === 'y' ? h : uvAxis === 'x' ? w : d;
  const plane: 'xy' | 'xz' = uvAxis === 'y' ? 'xz' : 'xy';
  if (Math.min(rw, rh) < 2.0 || thick < 0.28) {
    const box = new THREE.BoxGeometry(w, h, d);
    applyPlanarUVs(box, rw, rh, plane);
    return box;
  }
  const shape = createRoundedRectShape(rw, rh, Math.min(cornerR, rw * 0.22, rh * 0.22));
  const effBevel = Math.min(bevel, thick * 0.35, rw * 0.15, rh * 0.15);
  const geo = extrudeHiRes(shape, thick, effBevel, effBevel, 1, 5);
  if (uvAxis === 'y') {
    geo.rotateX(-Math.PI / 2);
    applyPlanarUVs(geo, rw, rh, 'xz');
  } else if (uvAxis === 'x') {
    applyPlanarUVs(geo, rw, rh, 'xy');
    geo.rotateY(Math.PI / 2);
  } else {
    applyPlanarUVs(geo, rw, rh, 'xy');
  }
  return geo;
}

export function finalizeVol5Part(
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
  const { meshes, edges } = attachCadEdges(group, clippingPlanes, 28, edgeOpacity);
  return {
    id,
    subsystem: 'sensor_fab',
    fabVolume: 5,
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

/** Crisp cleanroom plinth with colored status trim ring */
export function makeVol5Plinth(
  w: number,
  d: number,
  h: number,
  mats: MaterialLibrary,
  trimMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(createVol5BoxGeo(w, h, d, 0.35, 0.08, 'y'), mats.stainlessMachined);
  base.position.y = -h / 2;
  const trim = new THREE.Mesh(createVol5BoxGeo(w * 0.94, 0.18, d * 0.94, 0.25, 0.03, 'y'), trimMat);
  trim.position.y = 0.09;
  trim.userData.noEdges = true;
  g.add(base, trim);
  return g;
}

/** Compact glowing optical / copper-ion / plasma beam */
export function makeVol5Beam(
  rTop: number,
  rBot: number,
  h: number,
  mat: THREE.Material
): THREE.Mesh {
  const m = new THREE.Mesh(hiResCyl(rTop, rBot, h, 14), mat);
  m.userData.noEdges = true;
  return m;
}

/** Sculpted CMP Rotary Polishing Head hovering over a copper or dielectric wafer */
export function makeCmpHead(
  padRadius: number,
  mats: MaterialLibrary,
  accentMat: THREE.Material,
  yPos = 4.3
): THREE.Group {
  const g = new THREE.Group();
  const platter = new THREE.Mesh(hiResCyl(padRadius, padRadius * 1.03, 0.65, 24), mats.matteBlackAnodized);
  const ring = new THREE.Mesh(hiResTorus(padRadius * 0.92, 0.12, 8, 28), accentMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -0.32;
  ring.userData.noEdges = true;
  const shaft = new THREE.Mesh(hiResCyl(padRadius * 0.26, padRadius * 0.32, 1.35, 16), mats.stainlessMachined);
  shaft.position.y = 0.95;
  g.add(platter, ring, shaft);
  g.position.y = yPos;
  return g;
}

/** Sculpted Cu Electroplating (ECD) Bath Tank with copper anode ring */
export function makeEcdTank(
  w: number,
  d: number,
  h: number,
  mats: MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const bath = new THREE.Mesh(createVol5BoxGeo(w, h, d, 0.28, 0.06, 'y'), mats.vcWorkingFluidCyan);
  bath.position.y = h / 2 + 0.18;
  bath.userData.noEdges = true;
  const anode = new THREE.Mesh(hiResTorus(Math.min(w, d) * 0.36, 0.22, 8, 28), mats.copperCoil);
  anode.rotation.x = Math.PI / 2;
  anode.position.y = h + 0.32;
  g.add(bath, anode);
  return g;
}
