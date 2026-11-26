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
} from '../../engine/UltraDetailBuilders';
import { lazyExplanationStub } from '../lazyExplanations';

/**
 * Lean CNC-chamfered rectangular block tailored for the 52-station Vol.3 diorama:
 * - Micro-bars / reticles / brackets (< 2.0mm min side or thin < 0.28mm) use crisp 12-tri BoxGeometry with planar UVs
 * - Major pedestals, vacuum chambers, reticle frames & EDA consoles use 1-bevel / 5-curve-seg beveled extrusions
 */
export function createVol3BoxGeo(
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

export function finalizeVol3Part(
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
    fabVolume: 3,
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

/** Machined cleanroom / EDA workstation pedestal sitting flush on deck surface (local y = -h) */
export function makeVol3Plinth(
  w: number,
  d: number,
  h: number,
  mats: MaterialLibrary,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    createVol3BoxGeo(w, h, d, 0.36, 0.09, 'y'),
    mats.stainlessMachined
  );
  body.position.y = -h * 0.5;
  g.add(body);

  const trim = new THREE.Mesh(
    createVol3BoxGeo(w * 0.92, 0.16, d * 0.92, 0.26, 0.04, 'y'),
    accentMat
  );
  trim.position.y = 0.08;
  trim.userData.noEdges = true;
  g.add(trim);

  const footGeo = hiResCyl(0.20, 0.26, 0.18, 8);
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

/** Angled dual/single EDA simulation workstation console with holographic/textured screen */
export function makeEdaConsole(
  w: number,
  h: number,
  screenMat: THREE.Material,
  accentMat: THREE.Material,
  mats: MaterialLibrary
): THREE.Group {
  const g = new THREE.Group();
  const stand = new THREE.Mesh(
    createVol3BoxGeo(w * 0.42, 0.85, 1.0, 0.12, 0.04, 'y'),
    mats.matteBlackAnodized
  );
  stand.position.set(0, 0.48, -1.6);
  g.add(stand);

  const bezel = new THREE.Mesh(
    createVol3BoxGeo(w, h, 0.32, 0.18, 0.05, 'z'),
    mats.matteBlackAnodized
  );
  bezel.position.set(0, 0.95 + h * 0.5, -1.85);
  bezel.rotation.x = 0.16;
  g.add(bezel);

  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.90, h * 0.84, 0.08),
    screenMat
  );
  applyPlanarUVs(screen.geometry, w * 0.90, h * 0.84, 'xy');
  screen.position.set(0, 0.95 + h * 0.5, -1.66);
  screen.rotation.x = 0.16;
  screen.userData.noEdges = true;
  g.add(screen);

  const bar = new THREE.Mesh(new THREE.BoxGeometry(w * 0.86, 0.14, 0.12), accentMat);
  bar.position.set(0, 0.95 + h + 0.06, -1.80);
  bar.rotation.x = 0.16;
  bar.userData.noEdges = true;
  g.add(bar);

  return g;
}

/** Precision 6-inch (152.4 x 152.4 x 6.35mm scaled) synthetic quartz photomask plate with Cr border */
export function makeSixInchReticlePlate(
  size: number,
  thick: number,
  patternMat: THREE.Material,
  mats: MaterialLibrary,
  withPellicle = false
): THREE.Group {
  const g = new THREE.Group();
  // Synthetic quartz glass body
  const qz = new THREE.Mesh(
    createVol3BoxGeo(size, thick, size, 0.16, 0.04, 'y'),
    mats.quartzOlpf
  );
  g.add(qz);

  // Outer Cr light-shield border frame (4 strips)
  const bw = size * 0.11;
  const bh = 0.06;
  const yTop = thick * 0.5 + bh * 0.5;
  const hStrip = new THREE.BoxGeometry(size * 0.98, bh, bw);
  const vStrip = new THREE.BoxGeometry(bw, bh, size * 0.78);
  for (const sz of [-1, 1]) {
    const m = new THREE.Mesh(hStrip, mats.matteBlackAnodized);
    m.position.set(0, yTop, sz * (size * 0.435));
    m.userData.noEdges = true;
    g.add(m);
  }
  for (const sx of [-1, 1]) {
    const m = new THREE.Mesh(vStrip, mats.matteBlackAnodized);
    m.position.set(sx * (size * 0.435), yTop, 0);
    m.userData.noEdges = true;
    g.add(m);
  }

  // Central active pattern layer (MoSi / Cr textured)
  const pat = new THREE.Mesh(
    new THREE.BoxGeometry(size * 0.76, 0.05, size * 0.76),
    patternMat
  );
  applyPlanarUVs(pat.geometry, size * 0.76, size * 0.76, 'xz');
  pat.position.y = yTop + 0.01;
  pat.userData.noEdges = true;
  g.add(pat);

  // Corner fiducial crosses (gold/cyan dots)
  const fidGeo = new THREE.BoxGeometry(size * 0.045, 0.04, size * 0.045);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const fid = new THREE.Mesh(fidGeo, mats.goldPlating);
      fid.position.set(sx * size * 0.43, yTop + 0.03, sz * size * 0.43);
      fid.userData.noEdges = true;
      g.add(fid);
    }
  }

  // Optional 6mm standoff aluminum pellicle frame + 0.8µm ultra-thin transparent fluoropolymer membrane
  if (withPellicle) {
    const pSize = size * 0.82;
    const pH = size * 0.14;
    const wallT = size * 0.032;
    const hWall = new THREE.BoxGeometry(pSize, pH, wallT);
    const vWall = new THREE.BoxGeometry(wallT, pH, pSize - wallT * 2);
    for (const sz of [-1, 1]) {
      const wall = new THREE.Mesh(hWall, mats.stainlessMachined);
      wall.position.set(0, yTop + pH * 0.5, sz * (pSize * 0.5 - wallT * 0.5));
      g.add(wall);
    }
    for (const sx of [-1, 1]) {
      const wall = new THREE.Mesh(vWall, mats.stainlessMachined);
      wall.position.set(sx * (pSize * 0.5 - wallT * 0.5), yTop + pH * 0.5, 0);
      g.add(wall);
    }
    const film = new THREE.Mesh(
      new THREE.BoxGeometry(pSize - wallT, 0.035, pSize - wallT),
      mats.sswfGlass
    );
    film.position.y = yTop + pH + 0.015;
    film.userData.noEdges = true;
    g.add(film);
  }

  return g;
}

/** High-precision metrology / EB / inspection gantry bridge over a precision XY air-bearing stage */
export function makePrecisionGantry(
  spanW: number,
  height: number,
  mats: MaterialLibrary,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();
  const colGeo = createVol3BoxGeo(0.85, height, 1.0, 0.14, 0.04, 'y');
  for (const sx of [-1, 1]) {
    const col = new THREE.Mesh(colGeo, mats.stainlessMachined);
    col.position.set(sx * (spanW * 0.5), height * 0.5 + 0.16, -0.3);
    g.add(col);
  }
  const bridge = new THREE.Mesh(
    createVol3BoxGeo(spanW + 1.0, 0.95, 1.35, 0.18, 0.05, 'y'),
    mats.matteBlackAnodized
  );
  bridge.position.set(0, height + 0.55, -0.3);
  g.add(bridge);

  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(spanW * 0.88, 0.16, 1.42),
    accentMat
  );
  stripe.position.set(0, height + 0.85, -0.3);
  stripe.userData.noEdges = true;
  g.add(stripe);

  return g;
}

/** Glowing vertical energy / optical / electron beam cylinder */
export function makeBeamCone(
  rTop: number,
  rBot: number,
  h: number,
  mat: THREE.Material
): THREE.Mesh {
  const m = new THREE.Mesh(hiResCyl(rTop, rBot, h, 14), mat);
  m.userData.noEdges = true;
  return m;
}
