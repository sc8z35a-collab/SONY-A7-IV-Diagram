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
 * Lean CNC-chamfered rectangular block tailored for the 45-station Vol.4 FEOL diorama.
 */
export function createVol4BoxGeo(
  w: number,
  h: number,
  d: number,
  cornerR = 0.14,
  bevel = 0.08,
  axis: 'y' | 'z' = 'y'
): THREE.BufferGeometry {
  const rw = w;
  const rh = axis === 'y' ? d : h;
  const thick = axis === 'y' ? h : d;
  if (Math.min(rw, rh) < 2.0 || thick < 0.28) {
    const box = new THREE.BoxGeometry(w, h, d);
    applyPlanarUVs(box, rw, rh, axis === 'y' ? 'xz' : 'xy');
    return box;
  }
  const shape = createRoundedRectShape(rw, rh, Math.min(cornerR, rw * 0.22, rh * 0.22));
  const effBevel = Math.min(bevel, thick * 0.35, rw * 0.15, rh * 0.15);
  const geo = extrudeHiRes(shape, thick, effBevel, effBevel, 1, 5);
  if (axis === 'y') {
    geo.rotateX(-Math.PI / 2);
    applyPlanarUVs(geo, rw, rh, 'xz');
  } else {
    applyPlanarUVs(geo, rw, rh, 'xy');
  }
  return geo;
}

export function finalizeVol4Part(
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
    fabVolume: 4,
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

/** Machined cleanroom FEOL station pedestal sitting flush on deck top (local y = -h) */
export function makeVol4Plinth(
  w: number,
  d: number,
  h: number,
  mats: MaterialLibrary,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    createVol4BoxGeo(w, h, d, 0.34, 0.08, 'y'),
    mats.stainlessMachined
  );
  body.position.y = -h * 0.5;
  g.add(body);

  const trim = new THREE.Mesh(
    createVol4BoxGeo(w * 0.92, 0.16, d * 0.92, 0.24, 0.04, 'y'),
    accentMat
  );
  trim.position.y = 0.08;
  trim.userData.noEdges = true;
  g.add(trim);

  const footGeo = hiResCyl(0.18, 0.24, 0.18, 8);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeo, mats.matteBlackAnodized);
      foot.position.set(sx * (w * 0.39), -h - 0.08, sz * (d * 0.39));
      foot.userData.noEdges = true;
      g.add(foot);
    }
  }
  return g;
}

/** Overhead Ion Implantation Accelerator Cannon ("Atomic Machine-Gun") shooting colored ion beam into silicon */
export function makeIonImplantCannon(
  beamMat: THREE.Material,
  mats: MaterialLibrary,
  tiltZ = 0,
  height = 4.6
): THREE.Group {
  const g = new THREE.Group();
  // High-voltage accelerator barrel + cooling rings
  const barrel = new THREE.Mesh(hiResCyl(0.75, 0.52, 1.85, 14), mats.matteBlackAnodized);
  barrel.position.set(0, height, 0);
  barrel.rotation.z = tiltZ;
  g.add(barrel);

  const ring = new THREE.Mesh(hiResTorus(0.76, 0.14, 8, 20), mats.goldPlating);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, height - 0.35, 0);
  ring.userData.noEdges = true;
  g.add(ring);

  // Glowing focused ion beam stream plunging into silicon substrate
  const beam = new THREE.Mesh(hiResCyl(0.24, 0.72, height - 2.0, 12), beamMat);
  beam.position.set(Math.sin(tiltZ) * 0.5, (height - 0.7) * 0.5 + 0.65, 0);
  beam.rotation.z = tiltZ;
  beam.userData.noEdges = true;
  g.add(beam);

  return g;
}

/** Vertical Thermal Oxidation / LPCVD Furnace Tower (KOKUSAI ELECTRIC style) with glowing quartz heater coils */
export function makeFurnaceTower(
  radius: number,
  height: number,
  glowMat: THREE.Material,
  mats: MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const shell = new THREE.Mesh(hiResCyl(radius, radius * 1.06, height, 20), mats.stainlessMachined);
  shell.position.y = height * 0.5 + 0.2;
  g.add(shell);

  for (let i = 0; i < 3; i++) {
    const coil = new THREE.Mesh(hiResTorus(radius * 1.04, 0.14, 8, 24), glowMat);
    coil.rotation.x = Math.PI / 2;
    coil.position.y = 1.0 + i * (height * 0.28);
    coil.userData.noEdges = true;
    g.add(coil);
  }

  const cap = new THREE.Mesh(hiResCyl(radius * 0.75, radius * 0.95, 0.55, 16), mats.matteBlackAnodized);
  cap.position.y = height + 0.45;
  g.add(cap);
  return g;
}

/** Glowing beam cone utility */
export function makeVol4Beam(
  rTop: number,
  rBot: number,
  h: number,
  mat: THREE.Material
): THREE.Mesh {
  const m = new THREE.Mesh(hiResCyl(rTop, rBot, h, 12), mat);
  m.userData.noEdges = true;
  return m;
}
